const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const User = require('../models/User');
const { getTodayUTC } = require('../utils/dateHelpers');
const { verifyToken, isOwner } = require('../middleware/auth');
const { checkInactivityPenalty } = require('../middleware/xpPenalty');

// All progress routes require authentication
router.use(verifyToken);

// Get progress for user (only own progress or admin)
router.get('/user/:userId', isOwner('userId'), checkInactivityPenalty(), async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Progress.find({ userId });
    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get progress summary (only own summary or admin)
router.get('/summary/:userId', isOwner('userId'), checkInactivityPenalty(), async (req, res) => {
  try {
    const { userId } = req.params;

    // Get all progress records for the user
    const allProgress = await Progress.find({ userId });

    const struggling = await Progress.find({
      userId,
      masteryStatus: 'struggling',
    }).populate('lessonId', 'title category difficulty');

    const learning = await Progress.find({
      userId,
      masteryStatus: 'learning',
    }).populate('lessonId', 'title category difficulty');

    const comfortable = await Progress.find({
      userId,
      masteryStatus: 'comfortable',
    }).populate('lessonId', 'title category difficulty');

    const mastered = await Progress.find({
      userId,
      masteryStatus: 'mastered',
    }).populate('lessonId', 'title category difficulty');

    const skillStats = {};
    ['listening', 'speaking', 'reading', 'writing'].forEach(skill => {
      const skillProgress = allProgress.filter(p => p.skillType === skill);
      skillStats[skill] = {
        averageScore: skillProgress.length > 0
          ? (skillProgress.reduce((sum, p) => sum + p.score, 0) / skillProgress.length).toFixed(2)
          : 0,
        count: skillProgress.length,
      };
    });

    res.json({
      struggling: struggling.length,
      learning: learning.length,
      comfortable: comfortable.length,
      mastered: mastered.length,
      strugglingAreas: struggling,
      learningAreas: learning,
      comfortableAreas: comfortable,
      masteredAreas: mastered,
      skillStats,
    });
  } catch (error) {
    console.error('Get progress summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Record progress (atomic upsert to prevent race conditions)
router.post('/', async (req, res) => {
  try {
    const {
      lessonId,
      skillType,
      category,
      score,
      isCorrect,
    } = req.body;

    const userId = req.userId;

    // Determine mastery status based on score
    let masteryStatus;
    if (score >= 90) {
      masteryStatus = 'mastered';
    } else if (score >= 70) {
      masteryStatus = 'comfortable';
    } else if (score >= 50) {
      masteryStatus = 'learning';
    } else {
      masteryStatus = 'struggling';
    }

    const progress = await Progress.findOneAndUpdate(
      { userId, lessonId, skillType, category },
      {
        $set: {
          score,
          masteryStatus,
          timestamp: new Date(),
        },
        $inc: {
          attemptCount: 1,
          ...(isCorrect ? { correctAttempts: 1 } : {}),
        },
        $setOnInsert: {
          userId,
          lessonId,
          skillType,
          category,
        },
      },
      { new: true, upsert: true }
    );

    // Increment daily high-score lessons quest counter for Challenge Mode users
    if (score >= 80 && userId) {
      const today = getTodayUTC();
      await User.updateOne(
        { _id: userId, xpDecayEnabled: true, questResetDate: today },
        { $inc: { dailyHighScoreLessons: 1 } }
      );
    }

    res.status(201).json(progress);
  } catch (error) {
    console.error('Record progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
