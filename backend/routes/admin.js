const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Flashcard = require('../models/Flashcard');
const Progress = require('../models/Progress');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(verifyToken);
router.use(isAdmin);

// Get comprehensive dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    // Basic counts
    const [totalUsers, totalLessons, totalFlashcards, totalProgress] = await Promise.all([
      User.countDocuments(),
      Lesson.countDocuments(),
      Flashcard.countDocuments(),
      Progress.countDocuments(),
    ]);

    // User status counts
    const [activeUsers, suspendedUsers, adminCount] = await Promise.all([
      User.countDocuments({ status: 'active' }),
      User.countDocuments({ status: 'suspended' }),
      User.countDocuments({ role: 'admin' }),
    ]);

    // Time-based stats
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [newUsersLastWeek, newUsersLastMonth, activeUsersToday, activeUsersThisWeek] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: lastWeek } }),
      User.countDocuments({ createdAt: { $gte: lastMonth } }),
      User.countDocuments({ lastActive: { $gte: last24Hours } }),
      User.countDocuments({ lastActive: { $gte: lastWeek } }),
    ]);

    // Use aggregation for time/login stats instead of loading all users
    const [timeStats] = await User.aggregate([
      { $match: { totalTimeSpent: { $gt: 0 } } },
      { $group: { _id: null, totalTime: { $sum: '$totalTimeSpent' }, count: { $sum: 1 } } },
    ]);
    const avgTimeSpent = timeStats ? Math.round(timeStats.totalTime / timeStats.count) : 0;

    const [loginStats] = await User.aggregate([
      { $group: { _id: null, totalLogins: { $sum: '$loginCount' } } },
    ]);
    const totalLogins = loginStats ? loginStats.totalLogins : 0;

    // User growth data (last 7 days)
    const userGrowth = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date(now);
      dayStart.setDate(dayStart.getDate() - i);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const count = await User.countDocuments({
        createdAt: { $gte: dayStart, $lte: dayEnd }
      });

      userGrowth.push({
        date: dayStart.toISOString().split('T')[0],
        count
      });
    }

    // Recent activity (last 10 users who were active)
    const recentActiveUsers = await User.find({ lastActive: { $exists: true } })
      .select('username email lastActive totalTimeSpent')
      .sort({ lastActive: -1 })
      .limit(10);

    res.json({
      overview: {
        totalUsers,
        activeUsers,
        suspendedUsers,
        adminCount,
        totalLessons,
        totalFlashcards,
        totalProgress,
        totalLogins,
      },
      activity: {
        activeUsersToday,
        activeUsersThisWeek,
        avgTimeSpent, // in minutes
        newUsersLastWeek,
        newUsersLastMonth,
      },
      userGrowth,
      recentActiveUsers,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users with detailed info
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Admin get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single user details
router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's progress stats
    const [progressCount, flashcardCount] = await Promise.all([
      Progress.countDocuments({ userId: req.params.userId }),
      Flashcard.countDocuments({ userId: req.params.userId }),
    ]);

    res.json({
      user,
      stats: {
        progressCount,
        flashcardCount,
      }
    });
  } catch (error) {
    console.error('Admin get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Suspend a user
router.put('/users/:userId/suspend', async (req, res) => {
  try {
    const { reason } = req.body;

    // Sanitize reason (strip HTML tags)
    const sanitizedReason = reason
      ? String(reason).replace(/<[^>]*>/g, '').substring(0, 500)
      : 'Suspended by administrator';

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent suspending self
    if (user._id.toString() === req.userId) {
      return res.status(400).json({ message: 'Cannot suspend your own account' });
    }

    // Prevent suspending other admins
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot suspend an admin account' });
    }

    user.status = 'suspended';
    user.suspendedAt = new Date();
    user.suspendReason = sanitizedReason;
    await user.save();

    res.json({
      message: `User ${user.username} has been suspended`,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        status: user.status,
        suspendedAt: user.suspendedAt,
        suspendReason: user.suspendReason,
      }
    });
  } catch (error) {
    console.error('Admin suspend user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unsuspend a user
router.put('/users/:userId/unsuspend', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = 'active';
    user.suspendedAt = null;
    user.suspendReason = null;
    await user.save();

    res.json({
      message: `User ${user.username} has been reactivated`,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        status: user.status,
      }
    });
  } catch (error) {
    console.error('Admin unsuspend user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user role
router.put('/users/:userId/role', async (req, res) => {
  try {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Prevent demoting self
    if (req.params.userId === req.userId && role !== 'admin') {
      return res.status(400).json({ message: 'Cannot demote your own account' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: `User ${user.username} role updated to ${role}`,
      user
    });
  } catch (error) {
    console.error('Admin update role error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a user (with transaction for data consistency)
router.delete('/users/:userId', async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent deleting self
    if (user._id.toString() === req.userId) {
      return res.status(400).json({ message: 'Cannot delete your own account from admin panel' });
    }

    // Prevent deleting other admins
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot delete an admin account' });
    }

    await session.withTransaction(async () => {
      await Progress.deleteMany({ userId: req.params.userId }, { session });
      await Flashcard.deleteMany({ userId: req.params.userId }, { session });
      await User.findByIdAndDelete(req.params.userId, { session });
    });

    res.json({ message: `User ${user.username} and all associated data deleted successfully` });
  } catch (error) {
    console.error('Admin delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    session.endSession();
  }
});

module.exports = router;
