const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AnsweredQuestion = require('../models/AnsweredQuestion');
const PeekCooldown = require('../models/PeekCooldown');
const LearningEvent = require('../models/LearningEvent');
const { verifyToken, isOwner } = require('../middleware/auth');
const { checkInactivityPenalty } = require('../middleware/xpPenalty');
const { getCurrentMondayUTC } = require('../utils/dateHelpers');
const { ensureResetsApplied } = require('../utils/gamificationReset');
const { getAiEntitlements } = require('../utils/subscription');
const { recordLearningEvent } = require('../utils/xpRewards');
const { sendServerError, sendClientError } = require('../utils/sendError');
const { fullNameValidation } = require('../utils/fullName');
const { syncInstitutionAccessForUser } = require('../utils/institutionAccess');
const {
  V2_AVAILABLE_TARGETS,
  isV2AvailableForTarget,
  normalizeLang,
} = require('../curriculum/v2Availability');

function serializeCurriculumPreferences(user) {
  const prefs = user?.curriculumPreferences;
  if (!prefs) return {};
  if (typeof prefs.entries === 'function') {
    return Object.fromEntries(prefs.entries());
  }
  return { ...prefs };
}

// All user routes require authentication + ownership check
router.use(verifyToken);

// Get user profile (only own profile or admin)
router.get('/:userId', isOwner('userId'), checkInactivityPenalty(), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await syncInstitutionAccessForUser(user);
    const userObj = user.toObject();
    userObj.hasPassword = !!user.password;
    userObj.aiEntitlements = getAiEntitlements(user);
    userObj.subscriptionTier = userObj.aiEntitlements.subscriptionTier;
    userObj.curriculumPreferences = serializeCurriculumPreferences(user);
    userObj.curriculumV2 = {
      availableTargets: V2_AVAILABLE_TARGETS,
      preferences: userObj.curriculumPreferences,
      currentTarget: user.targetLanguage || null,
      currentVersion: user.targetLanguage
        ? (userObj.curriculumPreferences[normalizeLang(user.targetLanguage)] || null)
        : null,
      isV2AvailableForCurrentTarget: isV2AvailableForTarget(user.targetLanguage),
    };
    delete userObj.password;
    res.json(userObj);
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_GET_PROFILE_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// Update user profile (only own profile or admin)
router.put('/:userId', isOwner('userId'), async (req, res) => {
  try {
    const { username, fullName, preferredVoice, preferredVoices, nativeLanguage, targetLanguage } = req.body;

    // Check if username is already taken by another user
    if (username) {
      const existingUser = await User.findOne({
        username,
        _id: { $ne: req.params.userId }
      });
      if (existingUser) {
        return sendClientError(res, 400, 'USERS_USERNAME_TAKEN', 'Username already taken');
      }
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (fullName !== undefined) {
      const fullNameCheck = fullNameValidation(fullName);
      if (!fullNameCheck.valid) {
        return res.status(400).json({
          code: fullNameCheck.code,
          message: 'Please enter a valid full name',
        });
      }
      updateData.fullName = fullNameCheck.fullName || null;
    }
    if (preferredVoice !== undefined) updateData.preferredVoice = preferredVoice;
    if (preferredVoices !== undefined && preferredVoices && typeof preferredVoices === 'object' && !Array.isArray(preferredVoices)) {
      updateData.preferredVoices = Object.fromEntries(
        Object.entries(preferredVoices)
          .filter(([language]) => /^[a-z]{2,3}$/i.test(language))
          .map(([language, voice]) => [
            language.toLowerCase(),
            typeof voice === 'string' && voice.trim() ? voice.trim() : null,
          ])
      );
    }
    if (nativeLanguage !== undefined) updateData.nativeLanguage = nativeLanguage;
    if (targetLanguage !== undefined) updateData.targetLanguage = targetLanguage;
    if (nativeLanguage !== undefined || targetLanguage !== undefined) {
      updateData.languageSetupComplete = true;
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
    }

    res.json(user);
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_UPDATE_PROFILE_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// Set/update the learner's curriculum-version preference for one target language.
// Body: { targetLanguage: 'ko', version: 'v1' | 'v2' }
router.put('/:userId/curriculum-preference', isOwner('userId'), async (req, res) => {
  try {
    const target = normalizeLang(req.body?.targetLanguage);
    const version = String(req.body?.version || '').toLowerCase();
    if (!target) return sendClientError(res, 400, 'USERS_CURRICULUM_PREF_TARGET_REQUIRED', 'targetLanguage is required');
    if (!['v1', 'v2'].includes(version)) {
      return sendClientError(res, 400, 'USERS_CURRICULUM_PREF_INVALID_VERSION', "version must be 'v1' or 'v2'");
    }
    if (version === 'v2' && !isV2AvailableForTarget(target)) {
      return sendClientError(res, 400, 'USERS_CURRICULUM_PREF_V2_UNAVAILABLE', 'Curriculum v2 is not available for that language yet.');
    }

    const user = await User.findById(req.params.userId);
    if (!user) return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
    if (!user.curriculumPreferences) user.curriculumPreferences = new Map();
    user.curriculumPreferences.set(target, version);
    await user.save();

    res.json({
      curriculumPreferences: serializeCurriculumPreferences(user),
      curriculumV2: {
        availableTargets: V2_AVAILABLE_TARGETS,
        preferences: serializeCurriculumPreferences(user),
        currentTarget: user.targetLanguage || null,
        currentVersion: user.targetLanguage
          ? (serializeCurriculumPreferences(user)[normalizeLang(user.targetLanguage)] || null)
          : null,
        isV2AvailableForCurrentTarget: isV2AvailableForTarget(user.targetLanguage),
      },
    });
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_CURRICULUM_PREF_SAVE_FAILED', {
      clientMessage: 'Could not save curriculum preference',
      metadata: { userId: req.params.userId },
    });
  }
});

// Change password (only own account)
// Google-only users (no password set) can omit currentPassword to set one for the first time.
router.put('/:userId/password', isOwner('userId'), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!newPassword) {
      return sendClientError(res, 400, 'USERS_PASSWORD_NEW_REQUIRED', 'New password is required');
    }

    if (newPassword.length < 6) {
      return sendClientError(res, 400, 'USERS_PASSWORD_TOO_SHORT', 'New password must be at least 6 characters');
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
    }

    // If user already has a password, verify the current one
    if (user.password) {
      if (!currentPassword) {
        return sendClientError(res, 400, 'USERS_PASSWORD_CURRENT_REQUIRED', 'Current password is required');
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return sendClientError(res, 400, 'USERS_PASSWORD_CURRENT_INCORRECT', 'Current password is incorrect');
      }
    }
    // else: Google-only user setting password for the first time — no currentPassword needed

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_CHANGE_PASSWORD_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// Save activity state (only own state)
router.put('/:userId/activity-state', isOwner('userId'), async (req, res) => {
  try {
    const { activityType, lessonId, lessonIndex, quizId, quizIndex, flashcardIndex } = req.body;
    const normalizedActivityType = activityType === 'lesson' ? 'quiz' : activityType;
    const quizActivity = normalizedActivityType === 'quiz';
    const update = {
      lastActivityType: normalizedActivityType,
      lastLessonId: quizActivity ? (quizId || lessonId) : null,
      lastLessonIndex: quizActivity ? (quizIndex ?? lessonIndex ?? 0) : 0,
      lastFlashcardIndex: flashcardIndex || 0,
    };
    const user = await User.findByIdAndUpdate(req.params.userId, update, { new: true }).select('-password');
    if (!user) {
      return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
    }
    res.json(user);
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_SAVE_ACTIVITY_STATE_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// Get activity state (only own state)
router.get('/:userId/activity-state', isOwner('userId'), checkInactivityPenalty(), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('lastActivityType lastLessonId lastLessonIndex lastFlashcardIndex')
      .populate('lastLessonId', 'title category');
    if (!user) {
      return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
    }
    const normalizedActivityType = user.lastActivityType === 'lesson' ? 'quiz' : user.lastActivityType;
    res.json({
      activityType: normalizedActivityType,
      quiz: user.lastLessonId,
      quizIndex: user.lastLessonIndex,
      // Legacy aliases keep older clients working while new clients use quiz names.
      lesson: user.lastLessonId,
      lessonIndex: user.lastLessonIndex,
      flashcardIndex: user.lastFlashcardIndex,
    });
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_GET_ACTIVITY_STATE_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// --- Flashcard shuffle seed (stable for 12h, shared across devices) ---
const FLASHCARD_SEED_TTL_MS = 12 * 60 * 60 * 1000;

function newShuffleSeed() {
  // 1..2147483647 — never 0 (a 0 seed degenerates the client/server PRNG).
  return Math.floor(Math.random() * 2147483646) + 1;
}

// GET resolves the current seed: reuse it if the 12h window is still open,
// otherwise mint a fresh one and persist it. (Write-on-read is intentional.)
router.get('/:userId/flashcard-seed', isOwner('userId'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('flashcardShuffleSeed flashcardShuffleSeedAt');
    if (!user) return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');

    const seededAt = user.flashcardShuffleSeedAt ? new Date(user.flashcardShuffleSeedAt).getTime() : 0;
    const valid = user.flashcardShuffleSeed != null && (Date.now() - seededAt) < FLASHCARD_SEED_TTL_MS;
    if (valid) {
      return res.json({ seed: user.flashcardShuffleSeed, regenerated: false });
    }
    const seed = newShuffleSeed();
    await User.findByIdAndUpdate(req.params.userId, {
      flashcardShuffleSeed: seed,
      flashcardShuffleSeedAt: new Date(),
    });
    return res.json({ seed, regenerated: true });
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_RESOLVE_FLASHCARD_SEED_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// POST forces a fresh seed and restarts the 12h window (manual reshuffle).
router.post('/:userId/flashcard-seed', isOwner('userId'), async (req, res) => {
  try {
    const seed = newShuffleSeed();
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { flashcardShuffleSeed: seed, flashcardShuffleSeedAt: new Date() },
      { new: true }
    ).select('flashcardShuffleSeed');
    if (!user) return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
    res.json({ seed: user.flashcardShuffleSeed });
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_REFRESH_FLASHCARD_SEED_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// --- Flashcard deck selection + study settings (shared across devices) ---
// Whitelist and clamp incoming prefs so we never persist arbitrary payloads.
function sanitizeFlashcardPrefs(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const pick = (val, allowed, fallback) => (allowed.includes(val) ? val : fallback);
  const strArray = (val, cap) =>
    (Array.isArray(val) ? val.filter(x => typeof x === 'string' && x).slice(0, cap) : []);
  return {
    deckScope: pick(raw.deckScope, ['all', 'mine', 'focus'], 'all'),
    selectedCategories: strArray(raw.selectedCategories, 500),
    selectedCardIds: strArray(raw.selectedCardIds, 2000),
    randomCount: Math.max(1, Math.min(Math.floor(Number(raw.randomCount) || 10), 2000)),
    displayMode: pick(raw.displayMode, ['target', 'native', 'random'], 'target'),
    studyStyle: pick(raw.studyStyle, ['both', 'text', 'audio'], 'both'),
    isShuffled: raw.isShuffled !== false,
  };
}

// GET returns the saved prefs (or null if the learner has never saved any).
router.get('/:userId/flashcard-prefs', isOwner('userId'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('flashcardPrefs');
    if (!user) return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
    return res.json({ prefs: user.flashcardPrefs || null });
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_GET_FLASHCARD_PREFS_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// PUT replaces the saved prefs (client sends the full current selection).
router.put('/:userId/flashcard-prefs', isOwner('userId'), async (req, res) => {
  try {
    const prefs = sanitizeFlashcardPrefs(req.body?.prefs);
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { flashcardPrefs: prefs },
      { new: true }
    ).select('flashcardPrefs');
    if (!user) return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
    return res.json({ prefs: user.flashcardPrefs || null });
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_SAVE_FLASHCARD_PREFS_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// Add XP points (only own account)
router.post('/:userId/xp', isOwner('userId'), checkInactivityPenalty(), async (req, res) => {
  try {
    const { points } = req.body;
    if (!points || typeof points !== 'number' || points <= 0) {
      return sendClientError(res, 400, 'USERS_ADD_XP_INVALID_POINTS', 'Valid positive points value required');
    }
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $inc: { totalXP: points, dailyXpEarned: points, weeklyXP: points } },
      { new: true }
    ).select('totalXP');
    if (!user) {
      return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
    }
    res.json({ totalXP: user.totalXP });
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_ADD_XP_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// Record a real learning action and let the backend decide XP, dedupe, and caps.
router.post('/:userId/learning-events', isOwner('userId'), checkInactivityPenalty(), async (req, res) => {
  try {
    const result = await recordLearningEvent(req.params.userId, req.body);
    if (!result) {
      return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
    }
    res.json({ ...result, xpPenalty: req.xpPenalty || 0 });
  } catch (error) {
    // normalizeEvent throws coded AppErrors (<500) for validation/unsupported
    // types — surface those as coded client errors, not opaque 500s.
    if (error?.httpStatus && error.httpStatus < 500) {
      return sendClientError(res, error.httpStatus, error.code, error.message);
    }
    return sendServerError(req, res, error, 'USERS_LEARNING_EVENT_RECORD_FAILED', {
      metadata: { eventType: req.body?.eventType },
    });
  }
});

// Record translation peek - starts a 24-hour cooldown for XP on this question
router.post('/:userId/peek', isOwner('userId'), async (req, res) => {
  try {
    const { lessonId, contentIndex } = req.body;
    if (!lessonId || contentIndex === undefined) {
      return sendClientError(res, 400, 'USERS_PEEK_MISSING_FIELDS', 'lessonId and contentIndex are required');
    }
    // Upsert: refresh the cooldown timer if already peeked
    await PeekCooldown.findOneAndUpdate(
      { userId: req.params.userId, lessonId, contentIndex },
      { peekedAt: new Date() },
      { upsert: true }
    );
    res.json({ message: 'Peek recorded', cooldownHours: 24 });
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_RECORD_PEEK_FAILED', {
      metadata: { userId: req.params.userId },
    });
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
      return sendClientError(res, 400, 'USERS_AWARD_XP_INVALID_BASE_POINTS', 'Valid positive basePoints value required');
    }

    if (lessonId !== undefined && contentIndex !== undefined) {
      const result = await recordLearningEvent(req.params.userId, {
        eventType: 'quiz_correct',
        lessonId,
        contentIndex,
        difficulty: basePoints >= 5 ? 'sentences' : basePoints >= 4 ? 'advanced' : basePoints >= 3 ? 'intermediate' : 'beginner',
        targetLanguage: req.body.targetLanguage,
        nativeLanguage: req.body.nativeLanguage,
      });
      return res.json({ ...result, xpPenalty: req.xpPenalty || 0 });
    }

    if (flashcardId) {
      const result = await recordLearningEvent(req.params.userId, {
        eventType: 'flashcard_recall',
        flashcardId,
        targetLanguage: req.body.targetLanguage,
        nativeLanguage: req.body.nativeLanguage,
      });
      return res.json({ ...result, xpPenalty: req.xpPenalty || 0 });
    }

    {
      return sendClientError(res, 400, 'USERS_AWARD_XP_MISSING_TARGET', 'Must provide lessonId+contentIndex or flashcardId');
    }
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_AWARD_XP_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// Toggle XP decay mode (only own account)
router.put('/:userId/xp-decay-mode', isOwner('userId'), async (req, res) => {
  try {
    const { enabled } = req.body;
    if (typeof enabled !== 'boolean') {
      return sendClientError(res, 400, 'USERS_XP_DECAY_MODE_INVALID_ENABLED', 'enabled must be a boolean');
    }

    const user = await User.findById(req.params.userId).select('xpDecayEnabled totalXP');
    if (!user) {
      return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
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
    return sendServerError(req, res, error, 'USERS_TOGGLE_XP_DECAY_MODE_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// Get XP stats with decay info (only own account)
router.get('/:userId/xp-stats', isOwner('userId'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('totalXP lastAnsweredAt penaltyIntervalsApplied xpDecayEnabled');
    if (!user) {
      return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
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
    return sendServerError(req, res, error, 'USERS_GET_XP_STATS_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// Reset XP and answered-question history (only own account)
router.post('/:userId/reset-xp', isOwner('userId'), async (req, res) => {
  try {
    // Clear all answered-question records for this user
    await AnsweredQuestion.deleteMany({ userId: req.params.userId });
    // Clear all peek cooldowns for this user
    await PeekCooldown.deleteMany({ userId: req.params.userId });
    await LearningEvent.deleteMany({ userId: req.params.userId });
    // Reset totalXP to 0
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { totalXP: 0 },
      { new: true }
    ).select('totalXP');
    if (!user) {
      return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
    }
    res.json({ message: 'XP and answer history reset', totalXP: 0 });
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_RESET_XP_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// Get gamification stats: streak, daily quests, league (Challenge Mode only)
router.get('/:userId/gamification-stats', isOwner('userId'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
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
    return sendServerError(req, res, error, 'USERS_GET_GAMIFICATION_STATS_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// Claim a daily quest reward (Challenge Mode only)
router.post('/:userId/claim-quest-reward', isOwner('userId'), async (req, res) => {
  try {
    const { questId } = req.body;
    if (!['xp', 'lessons', 'time'].includes(questId)) {
      return sendClientError(res, 400, 'USERS_CLAIM_QUEST_INVALID_QUEST_ID', 'Invalid questId');
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
    }
    if (!user.xpDecayEnabled) {
      return sendClientError(res, 403, 'USERS_CLAIM_QUEST_CHALLENGE_MODE_DISABLED', 'Challenge Mode is not enabled');
    }

    // Apply lazy resets
    const changed = ensureResetsApplied(user);

    // Check already claimed
    if (user.dailyQuestXpClaimed.includes(questId)) {
      return sendClientError(res, 400, 'USERS_CLAIM_QUEST_ALREADY_CLAIMED', 'Quest reward already claimed');
    }

    // Check quest is completed
    const completionChecks = {
      xp: user.dailyXpEarned >= 20,
      lessons: user.dailyHighScoreLessons >= 2,
      time: user.dailyTimeSpent >= 15,
    };
    if (!completionChecks[questId]) {
      return sendClientError(res, 400, 'USERS_CLAIM_QUEST_NOT_COMPLETED', 'Quest not yet completed');
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
    return sendServerError(req, res, error, 'USERS_CLAIM_QUEST_REWARD_FAILED', {
      metadata: { userId: req.params.userId },
    });
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
    return sendServerError(req, res, error, 'USERS_GET_LEADERBOARD_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

// Delete user account (only own account or admin)
router.delete('/:userId', isOwner('userId'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return sendClientError(res, 404, 'USERS_USER_NOT_FOUND', 'User not found');
    }
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    return sendServerError(req, res, error, 'USERS_DELETE_ACCOUNT_FAILED', {
      metadata: { userId: req.params.userId },
    });
  }
});

module.exports = router;
