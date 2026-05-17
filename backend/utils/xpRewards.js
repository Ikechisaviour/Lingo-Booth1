const AnsweredQuestion = require('../models/AnsweredQuestion');
const LearningEvent = require('../models/LearningEvent');
const PeekCooldown = require('../models/PeekCooldown');
const User = require('../models/User');
const { getTodayUTC, getDayIndex } = require('./dateHelpers');
const { ensureResetsApplied } = require('./gamificationReset');

const QUIZ_POINTS_BY_DIFFICULTY = {
  beginner: 3,
  intermediate: 4,
  advanced: 5,
  sentences: 6,
};

const DAILY_CONVERSATION_TURN_CAP = 20;

const ACTIVE_EVENT_TYPES = new Set([
  'quiz_correct',
  'flashcard_recall',
  'class_item_complete',
  'class_activity_complete',
  'class_lesson_complete',
  'conversation_turn',
  'roleplay_complete',
  'writing_complete',
  'speaking_practice_complete',
]);

function text(value, max = 120) {
  return String(value || '').trim().slice(0, max);
}

function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeSkills(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((skill) => text(skill, 24).toLowerCase())
    .filter((skill, index, list) => (
      ['listening', 'speaking', 'reading', 'writing'].includes(skill)
      && list.indexOf(skill) === index
    ));
}

function normalizeEvent(body = {}, today = getTodayUTC()) {
  const eventType = text(body.eventType, 60);
  const lessonId = text(body.lessonId, 80);
  const flashcardId = text(body.flashcardId, 80);
  const classLessonId = text(body.classLessonId, 80);
  const activityId = text(body.activityId, 120);
  const sessionId = text(body.sessionId, 160);
  const turnId = text(body.turnId, 160);
  const roleplayId = text(body.roleplayId, 160);
  const itemId = text(body.itemId, 160);
  const promptId = text(body.promptId, 160);
  const contentIndex = number(body.contentIndex);
  const itemIndex = number(body.itemIndex);
  const difficulty = text(body.difficulty, 40).toLowerCase();
  const writingMode = text(body.writingMode || body.mode, 40).toLowerCase();
  const mode = text(body.mode, 40).toLowerCase();
  const source = text(body.source, 40);
  const activitySection = text(body.activitySection, 120);
  const activityTitle = text(body.activityTitle, 180);
  const targetText = text(body.targetText, 240);
  const nativeText = text(body.nativeText, 240);
  const transcript = text(body.transcript, 320);
  const partnerReply = text(body.partnerReply, 320);
  const targetLanguage = text(body.targetLanguage, 20).toLowerCase();
  const nativeLanguage = text(body.nativeLanguage, 20).toLowerCase();
  const fromMemory = body.fromMemory === true;
  const skills = normalizeSkills(body.skills);
  const metadata = {
    mode,
    source,
    difficulty,
    writingMode,
    fromMemory,
    activitySection,
    activityTitle,
    targetText,
    nativeText,
    transcript,
    partnerReply,
    skills,
    targetLanguage,
    nativeLanguage,
  };

  switch (eventType) {
    case 'quiz_correct':
      if (!lessonId || contentIndex === null) throw new Error('lessonId and contentIndex are required');
      return {
        eventType,
        dedupeKey: `daily:${today}:quiz:${lessonId}:${contentIndex}`,
        dayKey: today,
        metadata: { ...metadata, lessonId, contentIndex },
        active: true,
        refs: { lessonId, contentIndex, difficulty },
      };
    case 'quiz_high_score':
      if (!lessonId) throw new Error('lessonId is required');
      return {
        eventType,
        dedupeKey: `daily:${today}:quiz-high-score:${lessonId}`,
        dayKey: today,
        metadata: { ...metadata, lessonId },
        active: false,
        refs: { lessonId },
      };
    case 'flashcard_recall':
      if (!flashcardId) throw new Error('flashcardId is required');
      return {
        eventType,
        dedupeKey: `daily:${today}:flashcard:${flashcardId}`,
        dayKey: today,
        metadata: { ...metadata, flashcardId },
        active: true,
        refs: { flashcardId },
      };
    case 'class_item_complete':
      if (!classLessonId || itemIndex === null) throw new Error('classLessonId and itemIndex are required');
      return {
        eventType,
        dedupeKey: `lifetime:class-item:${classLessonId}:${itemIndex}`,
        dayKey: null,
        metadata: { ...metadata, classLessonId, itemIndex },
        active: true,
        refs: { classLessonId, itemIndex },
      };
    case 'class_activity_complete':
      if (!classLessonId || !activityId) throw new Error('classLessonId and activityId are required');
      return {
        eventType,
        dedupeKey: `lifetime:class-activity:${classLessonId}:${activityId}`,
        dayKey: null,
        metadata: { ...metadata, classLessonId, activityId },
        active: true,
        refs: { classLessonId, activityId },
      };
    case 'class_lesson_complete':
      if (!classLessonId) throw new Error('classLessonId is required');
      return {
        eventType,
        dedupeKey: `lifetime:class-lesson:${classLessonId}`,
        dayKey: null,
        metadata: { ...metadata, classLessonId },
        active: true,
        refs: { classLessonId },
      };
    case 'conversation_turn':
      if (!sessionId || !turnId) throw new Error('sessionId and turnId are required');
      return {
        eventType,
        dedupeKey: `daily:${today}:conversation:${sessionId}:${turnId}`,
        dayKey: today,
        metadata: { ...metadata, sessionId, turnId },
        active: true,
        refs: { sessionId, turnId },
      };
    case 'roleplay_complete':
      if (!sessionId || !roleplayId) throw new Error('sessionId and roleplayId are required');
      return {
        eventType,
        dedupeKey: `daily:${today}:roleplay:${sessionId}:${roleplayId}`,
        dayKey: today,
        metadata: { ...metadata, sessionId, roleplayId },
        active: true,
        refs: { sessionId, roleplayId },
      };
    case 'writing_complete':
      if (!itemId || !writingMode) throw new Error('itemId and writingMode are required');
      return {
        eventType,
        dedupeKey: `daily:${today}:writing:${itemId}:${writingMode}:${fromMemory ? 'memory' : 'guided'}`,
        dayKey: today,
        metadata: { ...metadata, itemId },
        active: true,
        refs: { itemId, writingMode, fromMemory },
      };
    case 'speaking_practice_complete':
      if (!promptId) throw new Error('promptId is required');
      return {
        eventType,
        dedupeKey: `daily:${today}:speaking:${promptId}`,
        dayKey: today,
        metadata: { ...metadata, promptId },
        active: true,
        refs: { promptId },
      };
    default:
      throw new Error('Unsupported learning event type');
  }
}

async function pointsForEvent(userId, event) {
  switch (event.eventType) {
    case 'quiz_correct': {
      const { lessonId, contentIndex, difficulty } = event.refs;
      const cooldown = await PeekCooldown.findOne({
        userId,
        lessonId,
        contentIndex,
        peekedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      });
      if (cooldown) return { points: 0, cooldownActive: true, alreadyAnswered: false };

      const query = { userId, lessonId, contentIndex };
      const existing = await AnsweredQuestion.findOne(query);
      if (!existing) {
        await AnsweredQuestion.create(query);
      }
      return {
        points: existing ? 1 : (QUIZ_POINTS_BY_DIFFICULTY[difficulty] || QUIZ_POINTS_BY_DIFFICULTY.beginner),
        cooldownActive: false,
        alreadyAnswered: !!existing,
      };
    }
    case 'flashcard_recall':
      return { points: 1 };
    case 'class_item_complete':
      return { points: 2 };
    case 'class_activity_complete':
      return { points: 5 };
    case 'class_lesson_complete':
      return { points: 20 };
    case 'conversation_turn': {
      const count = await LearningEvent.countDocuments({
        userId,
        eventType: 'conversation_turn',
        dayKey: event.dayKey,
        pointsAwarded: { $gt: 0 },
      });
      return count >= DAILY_CONVERSATION_TURN_CAP
        ? { points: 0, capped: true }
        : { points: 1 };
    }
    case 'roleplay_complete':
      return { points: 10 };
    case 'writing_complete': {
      const { writingMode, fromMemory } = event.refs;
      if (fromMemory) return { points: 3 };
      if (['listen', 'meaning', 'stroke', 'review'].includes(writingMode)) return { points: 2 };
      return { points: 1 };
    }
    case 'speaking_practice_complete':
      return { points: 2 };
    case 'quiz_high_score':
    default:
      return { points: 0 };
  }
}

function markStudyActivity(user, today) {
  user.lastAnsweredAt = new Date();
  user.penaltyIntervalsApplied = 0;

  if (!user.xpDecayEnabled || user.lastStudyDate === today) return;

  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  user.currentStreak = user.lastStudyDate === yesterdayStr
    ? (user.currentStreak || 0) + 1
    : 1;
  user.longestStreak = Math.max(user.longestStreak || 0, user.currentStreak);
  user.lastStudyDate = today;

  const dayIdx = getDayIndex(today);
  if (Array.isArray(user.streakHistory) && dayIdx >= 0 && dayIdx < 7) {
    user.streakHistory[dayIdx] = true;
    user.markModified('streakHistory');
  }
}

async function saveDuplicateStudyActivity(user, event, today) {
  const changed = ensureResetsApplied(user);
  if (event.active) markStudyActivity(user, today);
  if (changed || event.active) await user.save();
}

async function recordLearningEvent(userId, body = {}) {
  const today = getTodayUTC();
  const event = normalizeEvent(body, today);
  const user = await User.findById(userId);
  if (!user) return null;

  const existingEvent = await LearningEvent.findOne({
    userId,
    eventType: event.eventType,
    dedupeKey: event.dedupeKey,
  });
  if (existingEvent) {
    const shouldBackfillPair = (
      (!existingEvent.metadata?.targetLanguage || !existingEvent.metadata?.nativeLanguage)
      && event.metadata?.targetLanguage
      && event.metadata?.nativeLanguage
    );
    if (shouldBackfillPair) {
      existingEvent.metadata = {
        ...(existingEvent.metadata || {}),
        targetLanguage: event.metadata.targetLanguage,
        nativeLanguage: event.metadata.nativeLanguage,
      };
      existingEvent.markModified('metadata');
      await existingEvent.save();
    }
    await saveDuplicateStudyActivity(user, event, today);
    return {
      totalXP: user.totalXP,
      xpAwarded: 0,
      duplicate: true,
      eventType: event.eventType,
    };
  }

  const resetsChanged = ensureResetsApplied(user);
  const award = await pointsForEvent(userId, event);
  const points = Math.max(0, Number(award.points || 0));

  try {
    await LearningEvent.create({
      userId,
      eventType: event.eventType,
      dedupeKey: event.dedupeKey,
      dayKey: event.dayKey,
      pointsAwarded: points,
      metadata: event.metadata,
    });
  } catch (error) {
    if (error.code === 11000) {
      await saveDuplicateStudyActivity(user, event, today);
      return {
        totalXP: user.totalXP,
        xpAwarded: 0,
        duplicate: true,
        eventType: event.eventType,
      };
    }
    throw error;
  }

  if (points > 0) {
    user.totalXP = (user.totalXP || 0) + points;
    user.dailyXpEarned = (user.dailyXpEarned || 0) + points;
    user.weeklyXP = (user.weeklyXP || 0) + points;
  }
  if (event.active) markStudyActivity(user, today);
  if (resetsChanged || points > 0 || event.active) await user.save();

  return {
    totalXP: user.totalXP,
    xpAwarded: points,
    duplicate: false,
    eventType: event.eventType,
    cooldownActive: !!award.cooldownActive,
    capped: !!award.capped,
    alreadyAnswered: !!award.alreadyAnswered,
  };
}

module.exports = {
  DAILY_CONVERSATION_TURN_CAP,
  QUIZ_POINTS_BY_DIFFICULTY,
  ACTIVE_EVENT_TYPES,
  recordLearningEvent,
};
