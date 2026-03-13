const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Flashcard = require('../models/Flashcard');
const Progress = require('../models/Progress');
const GuestSession = require('../models/GuestSession');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(verifyToken);
router.use(isAdmin);

// Get comprehensive dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    // Basic counts
    const [totalUsers, totalLessons, totalFlashcards, totalProgress, totalGuestSessions] = await Promise.all([
      User.countDocuments(),
      Lesson.countDocuments(),
      Flashcard.countDocuments({ isDefault: { $ne: true } }),
      Progress.countDocuments(),
      GuestSession.countDocuments(),
    ]);

    // User status counts
    const [activeUsers, suspendedUsers, adminCount, challengeModeUsers, relaxedModeUsers] = await Promise.all([
      User.countDocuments({ status: 'active' }),
      User.countDocuments({ status: 'suspended' }),
      User.countDocuments({ role: 'admin' }),
      User.countDocuments({ xpDecayEnabled: true }),
      User.countDocuments({ xpDecayEnabled: { $ne: true } }),
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

    // Rate limit stats
    const [rateLimitStats] = await User.aggregate([
      { $match: { rateLimitHits: { $gt: 0 } } },
      {
        $group: {
          _id: null,
          totalRateLimitHits: { $sum: '$rateLimitHits' },
          usersRateLimited: { $sum: 1 },
        },
      },
    ]);
    const totalRateLimitHits = rateLimitStats ? rateLimitStats.totalRateLimitHits : 0;
    const usersRateLimited = rateLimitStats ? rateLimitStats.usersRateLimited : 0;

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
      .select('username email lastActive totalTimeSpent xpDecayEnabled lastActivityType')
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
        totalRateLimitHits,
        usersRateLimited,
        challengeModeUsers,
        relaxedModeUsers,
        totalGuestSessions,
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

// Get single user details (enhanced)
router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const [progressCount, flashcardCount, progressBreakdown, recentProgress] = await Promise.all([
      Progress.countDocuments({ userId: req.params.userId }),
      Flashcard.countDocuments({ userId: req.params.userId }),
      Progress.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(req.params.userId) } },
        { $group: { _id: '$masteryStatus', count: { $sum: 1 } } },
      ]),
      Progress.find({ userId: req.params.userId })
        .sort({ timestamp: -1 })
        .limit(5)
        .select('category skillType score masteryStatus timestamp'),
    ]);

    const breakdown = {};
    progressBreakdown.forEach(p => { breakdown[p._id || 'unknown'] = p.count; });

    res.json({
      user,
      stats: {
        progressCount,
        flashcardCount,
        progressBreakdown: breakdown,
        recentProgress,
      },
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

// Reset a user's rate limit counter
router.put('/users/:userId/reset-rate-limit', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { rateLimitHits: 0, lastRateLimited: null } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: `Rate limit counter reset for ${user.username}`,
      user,
    });
  } catch (error) {
    console.error('Admin reset rate limit error:', error);
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

// Get all user-created flashcards (admin only)
router.get('/flashcards', async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ userId: { $exists: true } })
      .populate('userId', 'username email')
      .sort({ createdAt: -1 });
    res.json(flashcards);
  } catch (error) {
    console.error('Admin get flashcards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a user-created flashcard (admin only)
router.delete('/flashcards/:flashcardId', async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.flashcardId);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    await Flashcard.findByIdAndDelete(req.params.flashcardId);
    res.json({ message: 'Flashcard deleted' });
  } catch (error) {
    console.error('Admin delete flashcard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get guest sessions (paginated) with comprehensive engagement stats
router.get('/guests', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = 50;
    const skip = (page - 1) * limit;

    const now = new Date();
    const today = new Date(now); today.setHours(0, 0, 0, 0);
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      sessions, total, todayCount, weekCount,
      uniqueCountries, topLanguagePairs,
      engagementStats, deviceStats, conversions,
    ] = await Promise.all([
      GuestSession.find().sort({ lastSeen: -1 }).skip(skip).limit(limit),
      GuestSession.countDocuments(),
      GuestSession.countDocuments({ lastSeen: { $gte: today } }),
      GuestSession.countDocuments({ lastSeen: { $gte: lastWeek } }),
      GuestSession.distinct('country'),
      GuestSession.aggregate([
        { $group: { _id: { native: '$nativeLanguage', target: '$targetLanguage' }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      // Engagement averages / totals across all sessions
      GuestSession.aggregate([
        {
          $group: {
            _id: null,
            avgTimeSpent:    { $avg: '$timeSpent' },
            avgCardsStudied: { $avg: '$cardsStudied' },
            totalCardsStudied:  { $sum: '$cardsStudied' },
            totalAudioPlays:    { $sum: '$audioPlays' },
            totalLessonsViewed: { $sum: '$lessonsViewed' },
            engagedSessions: {
              $sum: { $cond: [{ $gt: ['$cardsStudied', 0] }, 1, 0] },
            },
          },
        },
      ]),
      // Device breakdown
      GuestSession.aggregate([
        { $group: { _id: '$deviceType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      // Conversions (sessions where the guest signed up)
      GuestSession.countDocuments({ convertedToUser: true }),
    ]);

    const eng = engagementStats[0] || {};

    res.json({
      sessions,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: {
        todayCount,
        weekCount,
        uniqueCountries: uniqueCountries.filter(c => c && c !== 'Unknown').length,
        topLanguagePairs,
        // Engagement
        avgTimeSpent:       eng.avgTimeSpent    ? Math.round(eng.avgTimeSpent)        : 0, // seconds
        avgCardsStudied:    eng.avgCardsStudied ? Math.round(eng.avgCardsStudied * 10) / 10 : 0,
        totalCardsStudied:  eng.totalCardsStudied  || 0,
        totalAudioPlays:    eng.totalAudioPlays    || 0,
        totalLessonsViewed: eng.totalLessonsViewed || 0,
        engagedSessions:    eng.engagedSessions    || 0, // sessions where ≥1 card was studied
        // Conversion
        conversions,
        conversionRate: total > 0 ? Math.round((conversions / total) * 100) : 0,
        // Device
        deviceBreakdown: deviceStats,
      },
    });
  } catch (error) {
    console.error('Admin guests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Migrate existing lessons (add targetLang) + seed multi-language lessons
router.post('/seed-lessons', async (req, res) => {
  try {
    // Step 1: Migrate existing lessons — add targetLang: 'ko' where missing
    const existing = await Lesson.find({ targetLang: { $exists: false } });
    let migrated = 0;
    for (const lesson of existing) {
      await Lesson.updateOne({ _id: lesson._id }, { $set: { targetLang: 'ko', nativeLang: 'en' } });
      migrated++;
    }

    // Also backfill generic content fields from legacy fields
    const allLessons = await Lesson.find({}).lean();
    let contentMigrated = 0;
    for (const lesson of allLessons) {
      let needsUpdate = false;
      const contentUpdates = [];
      for (const item of lesson.content) {
        const patch = {};
        if (item.korean && !item.targetText) { patch.targetText = item.korean; needsUpdate = true; }
        if (item.english && !item.nativeText) { patch.nativeText = item.english; needsUpdate = true; }
        if (item.example && !item.exampleTarget) { patch.exampleTarget = item.example; needsUpdate = true; }
        if (item.exampleEnglish && !item.exampleNative) { patch.exampleNative = item.exampleEnglish; needsUpdate = true; }
        if (item.breakdown && item.breakdown.length > 0) {
          patch.breakdown = item.breakdown.map(b => {
            const bp = { ...b };
            if (b.korean && !b.target) { bp.target = b.korean; needsUpdate = true; }
            if (b.english && !b.native) { bp.native = b.english; needsUpdate = true; }
            return bp;
          });
        }
        contentUpdates.push({ ...item, ...patch });
      }
      if (needsUpdate) {
        await Lesson.updateOne({ _id: lesson._id }, { $set: { content: contentUpdates } });
        contentMigrated++;
      }
    }

    // Step 2: Seed new multi-language lessons (skip languages already in DB)
    const existingLangs = await Lesson.distinct('targetLang');
    const langDataMap = {
      es: require('../lessonData/es'),
      fr: require('../lessonData/fr'),
      de: require('../lessonData/de'),
      zh: require('../lessonData/zh'),
      ja: require('../lessonData/ja'),
      hi: require('../lessonData/hi'),
      ar: require('../lessonData/ar'),
      he: require('../lessonData/he'),
      pt: require('../lessonData/pt'),
      it: require('../lessonData/it'),
      nl: require('../lessonData/nl'),
      ru: require('../lessonData/ru'),
      id: require('../lessonData/id'),
      ms: require('../lessonData/ms'),
      fil: require('../lessonData/fil'),
      tr: require('../lessonData/tr'),
      bn: require('../lessonData/bn'),
      ta: require('../lessonData/ta'),
    };

    const newLessons = [];
    for (const [lang, data] of Object.entries(langDataMap)) {
      if (existingLangs.includes(lang)) continue; // skip if already seeded
      const categories = [data.greetings, data.dailyLife, data.food, data.travel, data.shopping, data.business, data.healthcare].filter(Boolean);
      newLessons.push(...categories);
    }

    let inserted = 0;
    if (newLessons.length > 0) {
      const result = await Lesson.insertMany(newLessons);
      inserted = result.length;
    }

    res.json({
      message: 'Lesson migration and seeding complete',
      migrated,
      contentMigrated,
      inserted,
      existingLangs,
    });
  } catch (error) {
    console.error('Admin seed-lessons error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
