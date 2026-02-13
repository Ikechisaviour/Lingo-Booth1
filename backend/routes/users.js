const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { verifyToken, isOwner } = require('../middleware/auth');

// All user routes require authentication + ownership check
router.use(verifyToken);

// Get user profile (only own profile or admin)
router.get('/:userId', isOwner('userId'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile (only own profile or admin)
router.put('/:userId', isOwner('userId'), async (req, res) => {
  try {
    const { username, preferredVoice } = req.body;

    // Check if username is already taken by another user
    if (username) {
      const existingUser = await User.findOne({
        username,
        _id: { $ne: req.params.userId }
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (preferredVoice !== undefined) updateData.preferredVoice = preferredVoice;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Change password (only own account)
router.put('/:userId/password', isOwner('userId'), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save activity state (only own state)
router.put('/:userId/activity-state', isOwner('userId'), async (req, res) => {
  try {
    const { activityType, lessonId, lessonIndex, flashcardIndex } = req.body;
    const update = {
      lastActivityType: activityType,
      lastLessonId: activityType === 'lesson' ? lessonId : null,
      lastLessonIndex: lessonIndex || 0,
      lastFlashcardIndex: flashcardIndex || 0,
    };
    const user = await User.findByIdAndUpdate(req.params.userId, update, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Save activity state error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get activity state (only own state)
router.get('/:userId/activity-state', isOwner('userId'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('lastActivityType lastLessonId lastLessonIndex lastFlashcardIndex')
      .populate('lastLessonId', 'title category');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      activityType: user.lastActivityType,
      lesson: user.lastLessonId,
      lessonIndex: user.lastLessonIndex,
      flashcardIndex: user.lastFlashcardIndex,
    });
  } catch (error) {
    console.error('Get activity state error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user account (only own account or admin)
router.delete('/:userId', isOwner('userId'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
