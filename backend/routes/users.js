const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/:userId', async (req, res) => {
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Change password
router.put('/:userId/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Save activity state (for cross-device resume)
router.put('/:userId/activity-state', async (req, res) => {
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get activity state
router.get('/:userId/activity-state', async (req, res) => {
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user account
router.delete('/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
