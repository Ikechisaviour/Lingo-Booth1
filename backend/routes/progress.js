const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// Get progress for user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Progress.find({ userId });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get progress summary (struggling areas)
router.get('/summary/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get all progress records for the user
    const allProgress = await Progress.find({ userId });

    const struggling = await Progress.find({
      userId,
      masteryStatus: 'struggling',
    });

    const learning = await Progress.find({
      userId,
      masteryStatus: 'learning',
    });

    const comfortable = await Progress.find({
      userId,
      masteryStatus: 'comfortable',
    });

    const mastered = await Progress.find({
      userId,
      masteryStatus: 'mastered',
    });

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
      skillStats,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Record progress
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      lessonId,
      skillType,
      category,
      score,
      isCorrect,
    } = req.body;

    let progress = await Progress.findOne({
      userId,
      lessonId,
      skillType,
      category,
    });

    if (!progress) {
      progress = new Progress({
        userId,
        lessonId,
        skillType,
        category,
        score,
      });
    } else {
      progress.score = score;
      progress.attemptCount += 1;
      if (isCorrect) {
        progress.correctAttempts += 1;
      }
    }

    // Determine mastery status based on score
    if (score >= 90) {
      progress.masteryStatus = 'mastered';
    } else if (score >= 70) {
      progress.masteryStatus = 'comfortable';
    } else if (score >= 50) {
      progress.masteryStatus = 'learning';
    } else {
      progress.masteryStatus = 'struggling';
    }

    progress.timestamp = new Date();
    await progress.save();

    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
