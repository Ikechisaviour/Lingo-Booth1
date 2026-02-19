const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AnsweredQuestion = require('../models/AnsweredQuestion');
const PeekCooldown = require('../models/PeekCooldown');
const { verifyToken, isOwner } = require('../middleware/auth');
const { checkInactivityPenalty } = require('../middleware/xpPenalty');
const { getTodayUTC, getCurrentMondayUTC, getDayIndex } = require('../utils/dateHelpers');
const { ensureResetsApplied } = require('../utils/gamificationReset');

// All user routes require authentication + ownership check
router.use(verifyToken);

// Get user profile (only own profile or admin)
router.get('/:userId', isOwner('userId'), checkInactivityPenalty(), async (req, res) => {
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
router.get('/:userId/activity-state', isOwner('userId'), checkInactivityPenalty(), async (req, res) => {
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

// Add XP points (only own account)
router.post('/:userId/xp', isOwner('userId'), checkInactivityPenalty(), async (req, res) => {
  try {
    const { points } = req.body;
    if (!points || typeof points !== 'number' || points <= 0) {
      return res.status(400).json({ message: 'Valid positive points value required' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $inc: { totalXP: points, dailyXpEarned: points, weeklyXP: points } },
      { new: true }
    ).select('totalXP');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ totalXP: user.totalXP });
  } catch (error) {
    console.error('Add XP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Record translation peek - starts a 24-hour cooldown for XP on this question
router.post('/:userId/peek', isOwner('userId'), async (req, res) => {
  try {
    const { lessonId, contentIndex } = req.body;
    if (!lessonId || contentIndex === undefined) {
      return res.status(400).json({ message: 'lessonId and contentIndex are required' });
    }
    // Upsert: refresh the cooldown timer if already peeked
    await PeekCooldown.findOneAndUpdate(
      { userId: req.params.userId, lessonId, contentIndex },
      { peekedAt: new Date() },
      { upsert: true }
    );
    res.json({ message: 'Peek recorded', cooldownHours: 24 });
  } catch (error) {
    console.error('Record peek error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Award XP with repeat-answer detection and peek cooldown check (only own account)
// If peeked within last 24 hours → 0 XP
// If the question was answered correctly before → 1 point
// Otherwise → full points
router.post('/:userId/award-xp', isOwner('userId'), checkInactivityPenalty(), async (req, res) => {
  try {
    const { lessonId, contentIndex, flashcardId, basePoints } = req.body;
    if (!basePoints || typeof basePoints !== 'number' || basePoints <= 0) {
      return res.status(400).json({ message: 'Valid positive basePoints value required' });
    }

    // Build the query to check if this question was already answered
    const query = { userId: req.params.userId };
    if (lessonId !== undefined && contentIndex !== undefined) {
      query.lessonId = lessonId;
      query.contentIndex = contentIndex;
    } else if (flashcardId) {
      query.flashcardId = flashcardId;
    } else {
      return res.status(400).json({ message: 'Must provide lessonId+contentIndex or flashcardId' });
    }

    // Check for active peek cooldown (lesson questions only)
    if (lessonId !== undefined && contentIndex !== undefined) {
      const cooldown = await PeekCooldown.findOne({
        userId: req.params.userId,
        lessonId,
        contentIndex,
        peekedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      });
      if (cooldown) {
        return res.json({ totalXP: null, xpAwarded: 0, cooldownActive: true });
      }
    }

    // Check if already answered correctly before
    const existing = await AnsweredQuestion.findOne(query);
    const xpToAward = existing ? 1 : basePoints;

    // Record as answered if first time
    if (!existing) {
      await AnsweredQuestion.create(query);
    }

    // Inactivity penalty is already applied by checkInactivityPenalty middleware
    const xpPenalty = req.xpPenalty || 0;

    // Award XP, reset idle timer and penalty counter, track gamification
    const today = getTodayUTC();
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $inc: { totalXP: xpToAward, dailyXpEarned: xpToAward, weeklyXP: xpToAward },
        $set: { lastAnsweredAt: new Date(), penaltyIntervalsApplied: 0 },
      },
      { new: true }
    ).select('totalXP currentStreak longestStreak lastStudyDate streakHistory streakWeekStart xpDecayEnabled');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update streak if challenge mode is on and haven't studied today yet
    if (user.xpDecayEnabled && user.lastStudyDate !== today) {
      const yesterday = new Date();
      yesterday.setUTCDate(yesterday.getUTCDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (user.lastStudyDate === yesterdayStr) {
        user.currentStreak += 1;
      } else if (user.lastStudyDate !== today) {
        user.currentStreak = 1;
      }
      if (user.currentStreak > user.longestStreak) {
        user.longestStreak = user.currentStreak;
      }
      user.lastStudyDate = today;

      // Update streak history calendar
      const dayIdx = getDayIndex(today);
      if (Array.isArray(user.streakHistory) && dayIdx >= 0 && dayIdx < 7) {
        user.streakHistory[dayIdx] = true;
        user.markModified('streakHistory');
      }
      await user.save();
    }

    res.json({ totalXP: user.totalXP, xpAwarded: xpToAward, xpPenalty, alreadyAnswered: !!existing });
  } catch (error) {
    // Handle duplicate key errors gracefully (race condition - two concurrent answers)
    if (error.code === 11000) {
      // Already recorded, award 1 point
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $inc: { totalXP: 1, dailyXpEarned: 1, weeklyXP: 1 } },
        { new: true }
      ).select('totalXP');
      return res.json({ totalXP: user?.totalXP || 0, xpAwarded: 1, alreadyAnswered: true });
    }
    console.error('Award XP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle XP decay mode (only own account)
router.put('/:userId/xp-decay-mode', isOwner('userId'), async (req, res) => {
  try {
    const { enabled } = req.body;
    if (typeof enabled !== 'boolean') {
      return res.status(400).json({ message: 'enabled must be a boolean' });
    }

    const user = await User.findById(req.params.userId).select('xpDecayEnabled totalXP');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.xpDecayEnabled === enabled) {
      return res.json({ totalXP: user.totalXP, xpDecayEnabled: user.xpDecayEnabled });
    }

    if (enabled) {
      // OFF → ON: wipe XP, reset decay + gamification counters
      const updated = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            xpDecayEnabled: true,
            totalXP: 0,
            penaltyIntervalsApplied: 0,
            lastAnsweredAt: null,
            // Reset gamification
            weeklyXP: 0,
            dailyXpEarned: 0,
            dailyHighScoreLessons: 0,
            dailyTimeSpent: 0,
            dailyQuestXpClaimed: [],
            currentStreak: 0,
            longestStreak: 0,
            lastStudyDate: null,
            streakHistory: [false, false, false, false, false, false, false],
            streakWeekStart: null,
            questResetDate: null,
            weekResetDate: null,
          },
        },
        { new: true }
      ).select('totalXP xpDecayEnabled');
      return res.json({ totalXP: updated.totalXP, xpDecayEnabled: updated.xpDecayEnabled });
    } else {
      // ON → OFF: preserve XP, just disable decay
      const updated = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: { xpDecayEnabled: false } },
        { new: true }
      ).select('totalXP xpDecayEnabled');
      return res.json({ totalXP: updated.totalXP, xpDecayEnabled: updated.xpDecayEnabled });
    }
  } catch (error) {
    console.error('Toggle XP decay mode error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get XP stats with decay info (only own account)
router.get('/:userId/xp-stats', isOwner('userId'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('totalXP lastAnsweredAt penaltyIntervalsApplied xpDecayEnabled');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const stats = {
      totalXP: user.totalXP,
      lastAnsweredAt: user.lastAnsweredAt,
      xpDecayEnabled: !!user.xpDecayEnabled,
      status: 'off',
    };

    if (!user.xpDecayEnabled) {
      return res.json(stats);
    }

    const GRACE_PERIOD_MS = 48 * 60 * 60 * 1000;
    const INTERVAL_MS = 24 * 60 * 60 * 1000;

    stats.decayRate = 15;
    stats.gracePeriodHours = 48;
    stats.intervalHours = 24;
    stats.status = 'safe';
    stats.graceEndsAt = null;
    stats.nextDecayAt = null;
    stats.hoursUntilDecay = null;

    if (!user.lastAnsweredAt || user.totalXP <= 0) {
      return res.json(stats);
    }

    const idleMs = Date.now() - new Date(user.lastAnsweredAt).getTime();

    if (idleMs <= GRACE_PERIOD_MS) {
      stats.status = 'grace';
      stats.graceEndsAt = new Date(new Date(user.lastAnsweredAt).getTime() + GRACE_PERIOD_MS);
      const msUntilGraceEnd = GRACE_PERIOD_MS - idleMs;
      stats.hoursUntilDecay = Math.ceil(msUntilGraceEnd / (60 * 60 * 1000));
      stats.nextDecayAt = new Date(stats.graceEndsAt.getTime() + INTERVAL_MS);
    } else {
      stats.status = 'decaying';
      const msAfterGrace = idleMs - GRACE_PERIOD_MS;
      const totalIntervals = Math.floor(msAfterGrace / INTERVAL_MS);
      const msIntoCurrentInterval = msAfterGrace - (totalIntervals * INTERVAL_MS);
      const msUntilNext = INTERVAL_MS - msIntoCurrentInterval;
      stats.hoursUntilDecay = Math.ceil(msUntilNext / (60 * 60 * 1000));
      stats.nextDecayAt = new Date(Date.now() + msUntilNext);
    }

    res.json(stats);
  } catch (error) {
    console.error('Get XP stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset XP and answered-question history (only own account)
router.post('/:userId/reset-xp', isOwner('userId'), async (req, res) => {
  try {
    // Clear all answered-question records for this user
    await AnsweredQuestion.deleteMany({ userId: req.params.userId });
    // Clear all peek cooldowns for this user
    await PeekCooldown.deleteMany({ userId: req.params.userId });
    // Reset totalXP to 0
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { totalXP: 0 },
      { new: true }
    ).select('totalXP');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'XP and answer history reset', totalXP: 0 });
  } catch (error) {
    console.error('Reset XP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get gamification stats: streak, daily quests, league (Challenge Mode only)
router.get('/:userId/gamification-stats', isOwner('userId'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.xpDecayEnabled) {
      return res.json({ challengeMode: false });
    }

    // Apply lazy resets if date/week changed
    const changed = ensureResetsApplied(user);
    if (changed) await user.save();

    // Streak
    const streak = {
      current: user.currentStreak,
      longest: user.longestStreak,
      history: user.streakHistory,
    };

    // Daily quests
    const quests = [
      {
        id: 'xp',
        task: 'Earn 20 XP',
        progress: Math.min(user.dailyXpEarned, 20),
        total: 20,
        completed: user.dailyXpEarned >= 20,
        claimed: user.dailyQuestXpClaimed.includes('xp'),
        bonusXP: 5,
      },
      {
        id: 'lessons',
        task: 'Score 80%+ in 2 lessons',
        progress: Math.min(user.dailyHighScoreLessons, 2),
        total: 2,
        completed: user.dailyHighScoreLessons >= 2,
        claimed: user.dailyQuestXpClaimed.includes('lessons'),
        bonusXP: 10,
      },
      {
        id: 'time',
        task: 'Study for 15 minutes',
        progress: Math.min(user.dailyTimeSpent, 15),
        total: 15,
        completed: user.dailyTimeSpent >= 15,
        claimed: user.dailyQuestXpClaimed.includes('time'),
        bonusXP: 5,
      },
    ];

    // League tier
    const weeklyXP = user.weeklyXP;
    let leagueName, leagueBadge;
    if (weeklyXP >= 500) { leagueName = 'Diamond'; leagueBadge = 'diamond'; }
    else if (weeklyXP >= 200) { leagueName = 'Gold'; leagueBadge = 'gold'; }
    else if (weeklyXP >= 50) { leagueName = 'Silver'; leagueBadge = 'silver'; }
    else { leagueName = 'Bronze'; leagueBadge = 'bronze'; }

    // Compute rank among challenge-mode users this week
    const currentMonday = getCurrentMondayUTC();
    const higherCount = await User.countDocuments({
      xpDecayEnabled: true,
      weekResetDate: currentMonday,
      weeklyXP: { $gt: weeklyXP },
    });
    const rank = higherCount + 1;

    const league = { name: leagueName, badge: leagueBadge, rank, weeklyXP };

    res.json({ challengeMode: true, streak, quests, league });
  } catch (error) {
    console.error('Get gamification stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Claim a daily quest reward (Challenge Mode only)
router.post('/:userId/claim-quest-reward', isOwner('userId'), async (req, res) => {
  try {
    const { questId } = req.body;
    if (!['xp', 'lessons', 'time'].includes(questId)) {
      return res.status(400).json({ message: 'Invalid questId' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.xpDecayEnabled) {
      return res.status(403).json({ message: 'Challenge Mode is not enabled' });
    }

    // Apply lazy resets
    const changed = ensureResetsApplied(user);

    // Check already claimed
    if (user.dailyQuestXpClaimed.includes(questId)) {
      return res.status(400).json({ message: 'Quest reward already claimed' });
    }

    // Check quest is completed
    const completionChecks = {
      xp: user.dailyXpEarned >= 20,
      lessons: user.dailyHighScoreLessons >= 2,
      time: user.dailyTimeSpent >= 15,
    };
    if (!completionChecks[questId]) {
      return res.status(400).json({ message: 'Quest not yet completed' });
    }

    const bonusMap = { xp: 5, lessons: 10, time: 5 };
    const bonusXP = bonusMap[questId];

    user.dailyQuestXpClaimed.push(questId);
    user.totalXP += bonusXP;
    user.weeklyXP += bonusXP;
    user.dailyXpEarned += bonusXP;
    await user.save();

    res.json({ totalXP: user.totalXP, weeklyXP: user.weeklyXP, bonusXP });
  } catch (error) {
    console.error('Claim quest reward error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get weekly leaderboard (top 10 Challenge Mode users)
router.get('/:userId/leaderboard', isOwner('userId'), async (req, res) => {
  try {
    const currentMonday = getCurrentMondayUTC();
    const topUsers = await User.find({
      xpDecayEnabled: true,
      weekResetDate: currentMonday,
      weeklyXP: { $gt: 0 },
    })
      .sort({ weeklyXP: -1 })
      .limit(10)
      .select('username weeklyXP');

    const leaderboard = topUsers.map((u, i) => ({
      rank: i + 1,
      username: u.username,
      weeklyXP: u.weeklyXP,
      isCurrentUser: u._id.toString() === req.params.userId,
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Get leaderboard error:', error);
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
