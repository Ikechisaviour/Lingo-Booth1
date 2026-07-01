const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const User = require('../models/User');
const LearningEvent = require('../models/LearningEvent');
const { getTodayUTC } = require('../utils/dateHelpers');
const { verifyToken, isOwner } = require('../middleware/auth');
const { checkInactivityPenalty } = require('../middleware/xpPenalty');
const { ensureResetsApplied } = require('../utils/gamificationReset');
const { sendServerError } = require('../utils/sendError');

// All progress routes require authentication
router.use(verifyToken);

async function lessonIdsForTarget(targetLang) {
  if (!targetLang) return null;
  const Lesson = require('../models/Lesson');
  return Lesson.find({ targetLang: String(targetLang).toLowerCase() }).distinct('_id');
}

async function progressFilterForUser(userId, targetLang) {
  const lessonIds = await lessonIdsForTarget(targetLang);
  return lessonIds ? { userId, lessonId: { $in: lessonIds } } : { userId };
}

// Get progress for user (only own progress or admin)
router.get('/user/:userId', isOwner('userId'), checkInactivityPenalty(), async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Progress.find(await progressFilterForUser(userId, req.query.targetLang));
    res.json(progress);
  } catch (error) {
    return sendServerError(req, res, error, 'PROGRESS_GET_PROGRESS_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// Get progress summary (only own summary or admin)
router.get('/summary/:userId', isOwner('userId'), checkInactivityPenalty(), async (req, res) => {
  try {
    const { userId } = req.params;

    const progressFilter = await progressFilterForUser(userId, req.query.targetLang);

    // Get all progress records for the active target language when provided.
    const allProgress = await Progress.find(progressFilter);

    const struggling = await Progress.find({
      ...progressFilter,
      masteryStatus: 'struggling',
    }).populate('lessonId', 'title category difficulty');

    const learning = await Progress.find({
      ...progressFilter,
      masteryStatus: 'learning',
    }).populate('lessonId', 'title category difficulty');

    const comfortable = await Progress.find({
      ...progressFilter,
      masteryStatus: 'comfortable',
    }).populate('lessonId', 'title category difficulty');

    const mastered = await Progress.find({
      ...progressFilter,
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

    const user = await User.findById(userId).select('totalXP');

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
      totalXP: user?.totalXP || 0,
    });
  } catch (error) {
    return sendServerError(req, res, error, 'PROGRESS_GET_SUMMARY_FAILED', {
      metadata: { userId: req.params.userId },
    });
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
      targetLanguage,
      nativeLanguage,
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

    // Count a lesson once per day for Challenge Mode quests, even if the learner retries it.
    if (score >= 80 && userId) {
      const today = getTodayUTC();
      const user = await User.findById(userId);
      if (user?.xpDecayEnabled) {
        const changed = ensureResetsApplied(user);
        let countedToday = false;
        try {
          await LearningEvent.create({
            userId,
            eventType: 'quiz_high_score',
            dedupeKey: `daily:${today}:quiz-high-score:${lessonId}`,
            dayKey: today,
            pointsAwarded: 0,
            metadata: {
              lessonId,
              score,
              targetLanguage: String(targetLanguage || '').toLowerCase(),
              nativeLanguage: String(nativeLanguage || '').toLowerCase(),
            },
          });
          countedToday = true;
        } catch (error) {
          if (error.code !== 11000) throw error;
        }
        if (countedToday) {
          user.dailyHighScoreLessons = (user.dailyHighScoreLessons || 0) + 1;
        }
        if (changed || countedToday) await user.save();
      }
    }

    res.status(201).json(progress);
  } catch (error) {
    return sendServerError(req, res, error, 'PROGRESS_RECORD_FAILED', {
      metadata: { userId: req.userId },
    });
  }
});

module.exports = router;
