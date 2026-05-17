const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const Progress = require('../models/Progress');
const LearningEvent = require('../models/LearningEvent');
const StudyItem = require('../models/StudyItem');
const ClassLessonProgress = require('../models/ClassLessonProgress');
const Flashcard = require('../models/Flashcard');
const CompletionCertificate = require('../models/CompletionCertificate');
const Translation = require('../models/Translation');
const { languageField } = require('./languageConcepts');

const DAY_MS = 24 * 60 * 60 * 1000;
const RECENT_ACTIVITY_WINDOW_MS = 3 * DAY_MS;
const SKILLS = ['listening', 'speaking', 'reading', 'writing'];
const GOAL_ACTIONS = {
  travel: 'conversation',
  work: 'conversation',
  dailyLife: 'conversation',
  family: 'conversation',
  religious: 'conversation',
  health: 'conversation',
  conversation: 'conversation',
  culture: 'class',
  school: 'class',
  exam: 'quiz',
};
const GOAL_ITEM_TYPES = {
  travel: ['roleplay', 'phrase', 'sentence'],
  work: ['roleplay', 'sentence', 'correction'],
  dailyLife: ['phrase', 'sentence', 'roleplay'],
  family: ['roleplay', 'phrase', 'sentence'],
  religious: ['roleplay', 'phrase', 'sentence'],
  health: ['roleplay', 'phrase', 'correction'],
  conversation: ['roleplay', 'correction', 'phrase', 'sentence'],
  culture: ['bookmark', 'phrase', 'word'],
  school: ['correction', 'bookmark', 'word'],
  exam: ['correction', 'word', 'phrase'],
};
const GOAL_ACTION_SEQUENCES = {
  travel: ['conversation', 'review', 'writing'],
  work: ['conversation', 'writing', 'review'],
  dailyLife: ['conversation', 'review', 'class'],
  family: ['conversation', 'review', 'class'],
  religious: ['conversation', 'review', 'class'],
  health: ['conversation', 'review', 'writing'],
  conversation: ['conversation', 'review', 'writing'],
  culture: ['class', 'conversation', 'review'],
  school: ['class', 'writing', 'review'],
  exam: ['quiz', 'review', 'writing'],
};
const PACE_SETTINGS = {
  light: { reviewThreshold: 4, planLength: 2 },
  steady: { reviewThreshold: 8, planLength: 3 },
  intensive: { reviewThreshold: 12, planLength: 4 },
};
const REAL_WORLD_AREAS = [
  { key: 'greetings', aliases: ['greetings', 'introduction'] },
  { key: 'food', aliases: ['food', 'cafe', 'restaurant', 'ordering'] },
  { key: 'travel', aliases: ['travel', 'directions', 'transportation'] },
  { key: 'shopping', aliases: ['shopping', 'buying'] },
  { key: 'work', aliases: ['business', 'work', 'workplace'] },
  { key: 'school', aliases: ['school', 'classroom', 'study'] },
  { key: 'health', aliases: ['health', 'healthcare'] },
];

function compact(value, max = 220) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function startOfUtcDay(date = new Date()) {
  const next = new Date(date);
  next.setUTCHours(0, 0, 0, 0);
  return next;
}

function dayKey(date = new Date()) {
  return startOfUtcDay(date).toISOString().slice(0, 10);
}

function startOfWeekUtc(date = new Date()) {
  const start = startOfUtcDay(date);
  const weekday = start.getUTCDay() || 7;
  start.setUTCDate(start.getUTCDate() - weekday + 1);
  return start;
}

function routeForActivity(activity = {}) {
  if (activity.type === 'class' && activity.classLessonId) return `/class/${activity.classLessonId}`;
  if (activity.type === 'quiz' && activity.quizId) return `/quiz/${activity.quizId}`;
  if (activity.type === 'flashcard') return '/flashcards';
  if (activity.type === 'conversation') return '/conversation';
  if (activity.type === 'writing') return '/writing';
  return '/class';
}

function sourceLabelForProgress(progress = {}) {
  return progress.lessonId?.title || progress.category || '';
}

function matchesLanguagePair(event = {}, targetLanguage, nativeLanguage) {
  const eventTarget = String(event.metadata?.targetLanguage || '').toLowerCase();
  const eventNative = String(event.metadata?.nativeLanguage || '').toLowerCase();
  if (!eventTarget || !eventNative) return false;
  return eventTarget === String(targetLanguage || '').toLowerCase()
    && eventNative === String(nativeLanguage || '').toLowerCase();
}

function pairEventQuery(userId, targetLanguage, nativeLanguage, extra = {}) {
  return {
    userId,
    'metadata.targetLanguage': String(targetLanguage || '').toLowerCase(),
    'metadata.nativeLanguage': String(nativeLanguage || '').toLowerCase(),
    ...extra,
  };
}

function reviewIntervalDays(reviewCount, result) {
  if (result === 'again') return 1;
  if (result === 'hard') return Math.max(1, Math.round(Math.max(1, reviewCount) * 1.5));
  if (result === 'easy') return Math.max(3, Math.round(Math.max(1, reviewCount + 1) * 2.8));
  return Math.max(2, Math.round(Math.max(1, reviewCount + 1) * 2.2));
}

function reviewEase(ease, result) {
  if (result === 'again') return Math.max(1.3, ease - 0.2);
  if (result === 'hard') return Math.max(1.3, ease - 0.08);
  if (result === 'easy') return Math.min(3.2, ease + 0.12);
  return ease;
}

function normalizePairProfile(profile = {}) {
  return {
    currentLevel: profile?.currentLevel || '',
    primaryGoal: profile?.primaryGoal || '',
    pace: profile?.pace || 'steady',
  };
}

function paceSettingsFor(profile = {}) {
  return PACE_SETTINGS[normalizePairProfile(profile).pace] || PACE_SETTINGS.steady;
}

function isFresh(date, windowMs = RECENT_ACTIVITY_WINDOW_MS) {
  if (!date) return false;
  return Date.now() - new Date(date).getTime() <= windowMs;
}

function overdueDays(item = {}, now = new Date()) {
  if (!item.nextReviewAt) return 0;
  return Math.max(0, Math.floor((now.getTime() - new Date(item.nextReviewAt).getTime()) / DAY_MS));
}

function eventSkills(event = {}) {
  const declaredSkills = Array.isArray(event.metadata?.skills)
    ? event.metadata.skills.filter((skill) => SKILLS.includes(skill))
    : [];
  if (declaredSkills.length) return declaredSkills;
  if (event.eventType.startsWith('conversation') || event.eventType === 'roleplay_complete') {
    return ['listening', 'speaking'];
  }
  if (event.eventType === 'speaking_practice_complete') return ['speaking'];
  if (event.eventType.startsWith('writing')) return ['writing'];
  if (event.eventType === 'flashcard_recall') return ['reading', 'listening'];
  if (event.eventType.startsWith('quiz_')) return ['reading'];
  if (event.eventType.startsWith('class_')) {
    const section = String(event.metadata?.activitySection || '').toLowerCase();
    const inferred = [];
    if (section.includes('reading')) inferred.push('reading');
    if (section.includes('listening')) inferred.push('listening');
    if (section.includes('speaking')) inferred.push('speaking');
    if (section.includes('writing')) inferred.push('writing');
    if (section.includes('pronunciation')) inferred.push('listening', 'speaking');
    return Array.from(new Set(inferred));
  }
  return [];
}

async function recentActivityFor(userId, targetLanguage, nativeLanguage) {
  const [classProgress, pairEvents, legacyQuizEvents, legacyConversationEvents] = await Promise.all([
    ClassLessonProgress.findOne({
      userId,
      targetLanguage,
      nativeLanguage,
    }).sort({ lastStudiedAt: -1 }).lean(),
    LearningEvent.find(pairEventQuery(userId, targetLanguage, nativeLanguage))
      .sort({ occurredAt: -1 })
      .limit(32)
      .lean(),
    LearningEvent.find({
      userId,
      eventType: { $in: ['quiz_correct', 'quiz_high_score'] },
      $or: [
        { 'metadata.targetLanguage': { $exists: false } },
        { 'metadata.targetLanguage': '' },
        { 'metadata.nativeLanguage': { $exists: false } },
        { 'metadata.nativeLanguage': '' },
      ],
    })
      .sort({ occurredAt: -1 })
      .limit(16)
      .lean(),
    LearningEvent.find({
      userId,
      eventType: { $in: ['conversation_turn', 'roleplay_complete'] },
      $or: [
        { 'metadata.targetLanguage': { $exists: false } },
        { 'metadata.targetLanguage': '' },
        { 'metadata.nativeLanguage': { $exists: false } },
        { 'metadata.nativeLanguage': '' },
      ],
    })
      .sort({ occurredAt: -1 })
      .limit(16)
      .lean(),
  ]);

  const candidates = [];
  const allEvents = [...pairEvents, ...legacyQuizEvents, ...legacyConversationEvents];
  const quizLessonIds = allEvents
    .filter((event) => event.eventType.startsWith('quiz_') && event.metadata?.lessonId)
    .map((event) => String(event.metadata.lessonId));
  const validQuizLessonIds = quizLessonIds.length
    ? new Set((await Lesson.find({
      _id: { $in: quizLessonIds },
      targetLang: targetLanguage,
    }).select('_id').lean()).map((lesson) => String(lesson._id)))
    : new Set();

  if (classProgress) {
    candidates.push({
      type: 'class',
      classLessonId: classProgress.classLessonId?.toString(),
      itemIndex: classProgress.selectedIndex || 0,
      occurredAt: classProgress.lastStudiedAt,
    });
  }

  for (const event of allEvents) {
    if (event.eventType.startsWith('quiz_') && event.metadata?.lessonId) {
      if (validQuizLessonIds.has(String(event.metadata.lessonId))) {
        candidates.push({
          type: 'quiz',
          quizId: event.metadata?.lessonId || '',
          occurredAt: event.occurredAt,
        });
      }
    }
    if (event.eventType === 'flashcard_recall') {
      if (!matchesLanguagePair(event, targetLanguage, nativeLanguage)) continue;
      candidates.push({ type: 'flashcard', occurredAt: event.occurredAt });
    }
    if (event.eventType.startsWith('conversation') || event.eventType === 'roleplay_complete') {
      const sessionId = String(event.metadata?.sessionId || '');
      if (
        matchesLanguagePair(event, targetLanguage, nativeLanguage)
        || sessionId.includes(`${nativeLanguage}-${targetLanguage}`)
      ) {
        candidates.push({ type: 'conversation', occurredAt: event.occurredAt });
      }
    }
    if (event.eventType.startsWith('writing')) {
      if (!matchesLanguagePair(event, targetLanguage, nativeLanguage)) continue;
      candidates.push({ type: 'writing', occurredAt: event.occurredAt });
    }
  }

  return candidates
    .filter((candidate) => candidate.occurredAt)
    .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())[0] || null;
}

async function buildWeeklySummary(userId, targetLanguage, nativeLanguage) {
  const weekStart = startOfWeekUtc();
  const [events, savedThisWeek] = await Promise.all([
    LearningEvent.find(pairEventQuery(userId, targetLanguage, nativeLanguage, {
      occurredAt: { $gte: weekStart },
    })).lean(),
    StudyItem.find({
      userId,
      targetLanguage,
      nativeLanguage,
      createdAt: { $gte: weekStart },
    }).lean(),
  ]);

  const byType = {};
  const activeDays = new Set();
  let points = 0;
  events.forEach((event) => {
    byType[event.eventType] = (byType[event.eventType] || 0) + 1;
    points += Number(event.pointsAwarded || 0);
    activeDays.add(dayKey(event.occurredAt));
  });

  return {
    points,
    activeDays: activeDays.size,
    sessions: events.length,
    byType,
    speakingTurns: byType.conversation_turn || 0,
    writingCompletions: byType.writing_complete || 0,
    newSavedItems: savedThisWeek.length,
  };
}

function buildAbilityProgress(events = [], progressRecords = []) {
  const metrics = Object.fromEntries(SKILLS.map((skill) => [skill, {
    score: null,
    level: 'learning',
    attempts: 0,
    recentPractice: 0,
    evidenceCount: 0,
    masteryBreakdown: {
      struggling: 0,
      learning: 0,
      comfortable: 0,
      mastered: 0,
    },
  }]));

  const weightedTotals = Object.fromEntries(SKILLS.map((skill) => [skill, 0]));

  progressRecords.forEach((record) => {
    const skill = record.skillType;
    if (!metrics[skill]) return;
    const attempts = Math.max(1, Number(record.attemptCount || 0));
    const latestScore = Number(record.score || 0);
    const accuracyScore = attempts > 0
      ? Math.round((Number(record.correctAttempts || 0) / attempts) * 100)
      : latestScore;
    // Progress stores the latest score plus cumulative attempts. Blend both so
    // one fresh result can move the estimate without rewriting the whole past.
    const blendedScore = Math.round(latestScore * 0.65 + accuracyScore * 0.35);
    metrics[skill].attempts += attempts;
    metrics[skill].evidenceCount += 1;
    weightedTotals[skill] += blendedScore * attempts;
    if (metrics[skill].masteryBreakdown[record.masteryStatus] !== undefined) {
      metrics[skill].masteryBreakdown[record.masteryStatus] += 1;
    }
  });

  events.forEach((event) => {
    eventSkills(event).forEach((skill) => {
      if (metrics[skill]) metrics[skill].recentPractice += 1;
    });
  });

  SKILLS.forEach((skill) => {
    const metric = metrics[skill];
    if (metric.attempts > 0) {
      metric.score = Math.round(weightedTotals[skill] / metric.attempts);
      if (metric.score >= 90 && metric.masteryBreakdown.mastered > 0) metric.level = 'mastered';
      else if (metric.score >= 70) metric.level = 'comfortable';
      else if (metric.score < 50 || metric.masteryBreakdown.struggling > metric.masteryBreakdown.comfortable + metric.masteryBreakdown.mastered) metric.level = 'struggling';
      else metric.level = 'learning';
    } else if (metric.recentPractice > 0) {
      metric.level = 'learning';
    }
  });

  return metrics;
}

async function buildStudyHistory(userId, targetLanguage, nativeLanguage, days = 14) {
  const start = startOfUtcDay();
  start.setUTCDate(start.getUTCDate() - (days - 1));
  const events = await LearningEvent.find(pairEventQuery(userId, targetLanguage, nativeLanguage, {
    occurredAt: { $gte: start },
  })).lean();

  const map = new Map();
  for (let offset = 0; offset < days; offset += 1) {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + offset);
    map.set(dayKey(date), { day: dayKey(date), events: 0, points: 0 });
  }
  events.forEach((event) => {
    const key = dayKey(event.occurredAt);
    if (!map.has(key)) return;
    const bucket = map.get(key);
    bucket.events += 1;
    bucket.points += Number(event.pointsAwarded || 0);
  });
  return Array.from(map.values());
}

function weakAreaScore(item = {}) {
  const score = Number(item.score || 0);
  const masteryPenalty = item.masteryStatus === 'struggling'
    ? 40
    : item.masteryStatus === 'learning'
      ? 20
      : 0;
  const attempts = Math.min(12, Number(item.attemptCount || 0));
  const ageDays = item.timestamp ? Math.min(14, Math.floor((Date.now() - new Date(item.timestamp).getTime()) / DAY_MS)) : 14;
  return masteryPenalty + Math.max(0, 100 - score) + attempts + ageDays;
}

function buildWeakAreas(progressRecords = []) {
  const ranked = new Map();
  progressRecords
    .filter((item) => ['struggling', 'learning'].includes(item.masteryStatus))
    .forEach((item) => {
      const key = `${item.lessonId?._id || item.lessonId || item.category}:${item.skillType}`;
      const normalized = {
        _id: item._id,
        lessonId: item.lessonId?._id || item.lessonId,
        title: sourceLabelForProgress(item),
        category: item.category,
        skillType: item.skillType,
        score: item.score,
        masteryStatus: item.masteryStatus,
        attemptCount: item.attemptCount || 0,
        attentionScore: weakAreaScore(item),
      };
      const existing = ranked.get(key);
      if (!existing || normalized.attentionScore > existing.attentionScore) ranked.set(key, normalized);
    });

  return Array.from(ranked.values())
    .sort((a, b) => b.attentionScore - a.attentionScore)
    .slice(0, 12);
}

function buildReviewQueue(dueSavedItems = [], progressRecords = []) {
  const weakAreas = buildWeakAreas(progressRecords);
  const savedBySource = dueSavedItems.reduce((acc, item) => {
    const key = item.sourceType || 'manual';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return {
    dueSavedItems,
    weakAreas,
    unifiedItems: [
      ...dueSavedItems.map((item) => ({
        kind: 'saved_item',
        item,
        priority: 100 + overdueDays(item) * 5,
      })),
      ...weakAreas.map((area) => ({
        kind: 'weak_area',
        area,
        priority: area.attentionScore,
      })),
    ].sort((a, b) => b.priority - a.priority),
    counts: {
      total: dueSavedItems.length + weakAreas.length,
      saved: dueSavedItems.length,
      weakAreas: weakAreas.length,
      corrections: dueSavedItems.filter((item) => item.itemType === 'correction').length,
      writing: savedBySource.writing || 0,
      flashcards: savedBySource.flashcard || 0,
      conversation: savedBySource.conversation || 0,
    },
  };
}

async function firstClassLesson(targetLanguage) {
  const trackOrder = { foundation: 1, thematic: 2, adult: 3, grammar: 4 };
  const courses = await Course.find({ targetLang: targetLanguage })
    .select('level track lessons')
    .lean();

  const firstCourseEntry = courses
    .flatMap((course) => (course.lessons || []).map((lesson) => ({
      lessonId: lesson.lessonId,
      level: Number(course.level || 99),
      trackRank: trackOrder[course.track] || 99,
      position: Number(lesson.position || 999),
    })))
    .sort((a, b) => (
      a.level - b.level
      || a.trackRank - b.trackRank
      || a.position - b.position
    ))[0];

  if (firstCourseEntry?.lessonId) {
    const orderedLesson = await Lesson.findOne({
      _id: firstCourseEntry.lessonId,
      track: 'textbook',
      targetLang: targetLanguage,
    }).select('_id title').lean();
    if (orderedLesson) return orderedLesson;
  }

  return Lesson.findOne({ track: 'textbook', targetLang: targetLanguage })
    .select('_id title')
    .sort({ createdAt: 1 })
    .lean();
}

function spotlightScore(item = {}, { profile, weakAreas, now }) {
  const normalizedProfile = normalizePairProfile(profile);
  const due = item.nextReviewAt && new Date(item.nextReviewAt) <= now;
  const goalTypes = GOAL_ITEM_TYPES[normalizedProfile.primaryGoal] || [];
  const weakSourceRefs = new Set(weakAreas.map((area) => String(area.lessonId || '')).filter(Boolean));
  const dueScore = due ? 100 + overdueDays(item, now) * 6 : 0;
  const easeScore = Math.max(0, Math.round((3.2 - Number(item.ease || 2.5)) * 20));
  const reviewScore = Math.max(0, 12 - Number(item.reviewCount || 0));
  const goalScore = goalTypes.includes(item.itemType) ? 24 - goalTypes.indexOf(item.itemType) * 4 : 0;
  const sourceScore = weakSourceRefs.has(String(item.sourceRef || '')) ? 18 : 0;
  const recentScore = item.updatedAt
    ? Math.max(0, 10 - Math.floor((now.getTime() - new Date(item.updatedAt).getTime()) / DAY_MS))
    : 0;
  return dueScore + easeScore + reviewScore + goalScore + sourceScore + recentScore;
}

function selectDailySpotlight(savedItems = [], dueSavedItems = [], profile = {}, weakAreas = []) {
  const now = new Date();
  const merged = new Map();
  [...dueSavedItems, ...savedItems].forEach((item) => {
    if (!item?._id) return;
    merged.set(String(item._id), item);
  });
  return Array.from(merged.values())
    .sort((a, b) => {
      const scoreDelta = spotlightScore(b, { profile, weakAreas, now }) - spotlightScore(a, { profile, weakAreas, now });
      if (scoreDelta !== 0) return scoreDelta;
      return String(a._id).localeCompare(String(b._id));
    })[0] || null;
}

function actionForType(type, { recentActivity, lesson, weakArea } = {}) {
  if (type === 'review') {
    return {
      type,
      route: '/review',
      titleKey: 'learningHub.reviewNow',
    };
  }
  if (type === 'class') {
    if (recentActivity?.type === 'class') {
      return {
        type,
        route: routeForActivity(recentActivity),
        activity: recentActivity,
        titleKey: 'learningHub.continueLearning',
      };
    }
    return lesson
      ? {
        type,
        route: `/class/${lesson._id}`,
        titleKey: 'classList.startClass',
        label: lesson.title,
      }
      : null;
  }
  if (type === 'quiz') {
    return weakArea?.lessonId
      ? {
        type,
        route: `/quiz/${weakArea.lessonId}`,
        titleKey: 'learningHub.practiceArea',
        label: weakArea.title,
      }
      : null;
  }
  if (type === 'writing') {
    return {
      type,
      route: '/writing',
      titleKey: 'writing.title',
    };
  }
  if (type === 'conversation') {
    return {
      type,
      route: '/conversation',
      titleKey: 'conversation.practiceLabel',
    };
  }
  if (type === 'flashcard') {
    return {
      type,
      route: '/flashcards',
      titleKey: 'home.continueFlashcards',
    };
  }
  return null;
}

function weakestSkill(abilityProgress = {}) {
  return SKILLS
    .map((skill) => ({
      skill,
      metric: abilityProgress[skill] || {},
    }))
    .sort((a, b) => {
      const aScore = a.metric.score ?? (a.metric.recentPractice ? 55 : 0);
      const bScore = b.metric.score ?? (b.metric.recentPractice ? 55 : 0);
      if (aScore !== bScore) return aScore - bScore;
      return (a.metric.recentPractice || 0) - (b.metric.recentPractice || 0);
    })[0] || null;
}

function buildPlacementSuggestion(profile = {}, abilityProgress = {}, progressRecords = []) {
  const normalizedProfile = normalizePairProfile(profile);
  if (normalizedProfile.currentLevel && normalizedProfile.currentLevel !== 'unsure') {
    return {
      status: 'set',
      level: normalizedProfile.currentLevel,
      reasonKey: 'learningHub.placementFromSetup',
    };
  }

  const attempted = progressRecords.length;
  if (!attempted) {
    return {
      status: 'needs_check',
      level: 'new',
      reasonKey: 'learningHub.placementNeedsCheck',
    };
  }

  const scoredSkills = Object.values(abilityProgress)
    .map((metric) => metric.score)
    .filter((score) => Number.isFinite(score));
  const average = scoredSkills.length
    ? Math.round(scoredSkills.reduce((sum, score) => sum + score, 0) / scoredSkills.length)
    : 0;
  const level = average >= 85
    ? 'advanced'
    : average >= 65
      ? 'intermediate'
      : 'beginner';
  return {
    status: 'suggested',
    level,
    average,
    reasonKey: 'learningHub.placementFromActivity',
  };
}

function buildRealWorldProgress(progressRecords = [], savedItems = []) {
  const buckets = Object.fromEntries(REAL_WORLD_AREAS.map((area) => [area.key, {
    score: null,
    evidenceCount: 0,
    savedItems: 0,
  }]));
  const weighted = Object.fromEntries(REAL_WORLD_AREAS.map((area) => [area.key, 0]));

  const matchingAreaKeys = (value = '') => {
    const normalized = String(value || '').toLowerCase();
    return REAL_WORLD_AREAS
      .filter((area) => area.aliases.some((alias) => normalized.includes(alias)))
      .map((area) => area.key);
  };

  progressRecords.forEach((record) => {
    matchingAreaKeys(`${record.category || ''} ${record.lessonId?.category || ''}`).forEach((key) => {
      const attempts = Math.max(1, Number(record.attemptCount || 1));
      buckets[key].evidenceCount += attempts;
      weighted[key] += Number(record.score || 0) * attempts;
    });
  });

  savedItems.forEach((item) => {
    matchingAreaKeys(`${item.sourceLabel || ''} ${(item.tags || []).join(' ')} ${item.metadata?.scenarioId || ''}`).forEach((key) => {
      buckets[key].savedItems += 1;
    });
  });

  Object.keys(buckets).forEach((key) => {
    if (buckets[key].evidenceCount > 0) {
      buckets[key].score = Math.round(weighted[key] / buckets[key].evidenceCount);
    }
  });
  return buckets;
}

function buildRecentWords(savedItems = [], recentEvents = []) {
  const seen = new Set();
  const rows = [];
  const push = (entry = {}) => {
    const targetText = compact(entry.targetText, 180);
    if (!targetText || seen.has(targetText)) return;
    seen.add(targetText);
    rows.push({
      targetText,
      nativeText: compact(entry.nativeText, 180),
      sourceType: entry.sourceType || '',
      sourceLabel: entry.sourceLabel || '',
      occurredAt: entry.occurredAt || entry.updatedAt || entry.createdAt || null,
    });
  };

  savedItems
    .filter((item) => ['word', 'phrase', 'sentence', 'correction'].includes(item.itemType))
    .forEach(push);
  recentEvents
    .filter((event) => event.metadata?.targetText)
    .forEach((event) => push({
      targetText: event.metadata.targetText,
      nativeText: event.metadata.nativeText,
      sourceType: event.eventType,
      occurredAt: event.occurredAt,
    }));

  return rows.slice(0, 12);
}

function buildFirstThreeDaysPlan(profile = {}, studyHistory = [], nextAction = null, firstLesson = null) {
  const completedAt = profile?.completedAt ? new Date(profile.completedAt) : null;
  if (!completedAt || Number.isNaN(completedAt.getTime())) return null;
  const activeDays = studyHistory.filter((day) => day.events > 0).length;
  if (activeDays >= 3) return null;
  const stepDefinitions = [
    {
      day: 1,
      titleKey: 'learningHub.firstThreeDayLearnTitle',
      bodyKey: 'learningHub.firstThreeDayLearnBody',
      action: actionForType('class', { lesson: firstLesson }) || nextAction,
    },
    {
      day: 2,
      titleKey: 'learningHub.firstThreeDayReviewTitle',
      bodyKey: 'learningHub.firstThreeDayReviewBody',
      action: actionForType('review'),
    },
    {
      day: 3,
      titleKey: 'learningHub.firstThreeDaySpeakTitle',
      bodyKey: 'learningHub.firstThreeDaySpeakBody',
      action: actionForType('conversation'),
    },
  ];
  return {
    day: Math.min(3, activeDays + 1),
    activeDays,
    nextAction,
    steps: stepDefinitions.map((step) => ({
      ...step,
      completed: activeDays >= step.day,
      current: activeDays + 1 === step.day,
    })),
  };
}

function buildGoalPath(profile = {}, nextAction = null, firstLesson = null, weakArea = null) {
  const normalizedProfile = normalizePairProfile(profile);
  if (!normalizedProfile.primaryGoal) return null;
  const actions = [];
  appendUniqueAction(actions, nextAction);
  (GOAL_ACTION_SEQUENCES[normalizedProfile.primaryGoal] || [GOAL_ACTIONS[normalizedProfile.primaryGoal]])
    .forEach((type) => appendUniqueAction(actions, actionForType(type, { lesson: firstLesson, weakArea })));
  return {
    goal: normalizedProfile.primaryGoal,
    primaryAction: GOAL_ACTIONS[normalizedProfile.primaryGoal] || nextAction?.type || 'class',
    actions: actions.slice(0, 3),
  };
}

function buildMiniSpeakingDrills(savedItems = [], reviewQueue = {}) {
  const candidates = [
    ...savedItems.filter((item) => item.itemType === 'correction'),
    ...savedItems.filter((item) => item.itemType === 'phrase'),
    ...savedItems.filter((item) => item.itemType === 'sentence'),
  ];
  const weakLabels = new Set((reviewQueue.weakAreas || []).map((area) => area.title).filter(Boolean));
  return candidates
    .sort((a, b) => {
      const aBoost = weakLabels.has(a.sourceLabel) ? 1 : 0;
      const bBoost = weakLabels.has(b.sourceLabel) ? 1 : 0;
      if (aBoost !== bBoost) return bBoost - aBoost;
      return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
    })
    .slice(0, 5);
}

async function buildMilestones(userId, targetLanguage, nativeLanguage, savedItems, weeklySummary, progressRecords) {
  const [certificates, completedClassLessons] = await Promise.all([
    CompletionCertificate.find({
      userId,
      targetLanguage,
      nativeLanguage,
      status: 'active',
    }).sort({ issuedAt: -1 }).lean(),
    LearningEvent.countDocuments(pairEventQuery(userId, targetLanguage, nativeLanguage, {
      eventType: 'class_lesson_complete',
    })),
  ]);

  return {
    certificates: certificates.slice(0, 6),
    completedClassLessons,
    savedItems: savedItems.length,
    activeDaysThisWeek: weeklySummary.activeDays,
    practicedSkills: Object.keys(buildAbilityProgress([], progressRecords))
      .filter((skill) => progressRecords.some((record) => record.skillType === skill)),
  };
}

function chooseNextAction({
  recentActivity,
  reviewQueue,
  firstLesson,
  profile,
  abilityProgress,
}) {
  const normalizedProfile = normalizePairProfile(profile);
  const settings = paceSettingsFor(profile);
  const topWeakArea = reviewQueue.weakAreas[0];
  const topWeakSkill = weakestSkill(abilityProgress);
  const reviewPressure = reviewQueue.dueSavedItems.length;
  const hasOverdueItems = reviewQueue.dueSavedItems.some((item) => overdueDays(item) >= 2);

  if (reviewPressure >= settings.reviewThreshold || hasOverdueItems) {
    return {
      ...actionForType('review'),
      count: reviewPressure,
    };
  }

  if (recentActivity && isFresh(recentActivity.occurredAt)) {
    return {
      ...actionForType(recentActivity.type, { recentActivity, weakArea: topWeakArea, lesson: firstLesson }),
      activity: recentActivity,
      titleKey: recentActivity.type === 'flashcard'
        ? 'home.continueFlashcards'
        : 'learningHub.continueLearning',
    };
  }

  if (['new', 'beginner', 'unsure'].includes(normalizedProfile.currentLevel) && firstLesson) {
    return actionForType('class', { lesson: firstLesson });
  }

  if (topWeakArea && Number(topWeakArea.score || 0) < 70) {
    return actionForType('quiz', { weakArea: topWeakArea });
  }

  if (topWeakSkill?.skill === 'writing' && (topWeakSkill.metric.score ?? 0) < 70) {
    return actionForType('writing');
  }

  if (['speaking', 'listening'].includes(topWeakSkill?.skill) && (topWeakSkill.metric.score ?? 0) < 70) {
    return actionForType('conversation');
  }

  const goalAction = GOAL_ACTIONS[normalizedProfile.primaryGoal];
  if (goalAction) {
    return actionForType(goalAction, { lesson: firstLesson, weakArea: topWeakArea });
  }

  return actionForType('class', { lesson: firstLesson }) || actionForType('conversation');
}

function appendUniqueAction(actions, action) {
  if (!action) return;
  const signature = `${action.type}:${action.route}`;
  if (actions.some((candidate) => `${candidate.type}:${candidate.route}` === signature)) return;
  actions.push(action);
}

function makeDailyPlan({
  nextAction,
  reviewQueue,
  profile,
  weakSkill,
  weakArea,
  firstLesson,
}) {
  const normalizedProfile = normalizePairProfile(profile);
  const settings = paceSettingsFor(profile);
  const actions = [];
  appendUniqueAction(actions, nextAction);

  if (reviewQueue.dueSavedItems.length) {
    appendUniqueAction(actions, {
      ...actionForType('review'),
      count: reviewQueue.dueSavedItems.length,
    });
  }

  if (weakArea?.lessonId) {
    appendUniqueAction(actions, actionForType('quiz', { weakArea }));
  }

  if (weakSkill?.skill === 'writing') appendUniqueAction(actions, actionForType('writing'));
  if (['speaking', 'listening'].includes(weakSkill?.skill)) appendUniqueAction(actions, actionForType('conversation'));

  const goalAction = GOAL_ACTIONS[normalizedProfile.primaryGoal];
  appendUniqueAction(actions, actionForType(goalAction, { lesson: firstLesson, weakArea }));

  if (!actions.some((action) => action.type === 'class')) {
    appendUniqueAction(actions, actionForType('class', { lesson: firstLesson }));
  }
  if (!actions.some((action) => action.type === 'conversation')) {
    appendUniqueAction(actions, actionForType('conversation'));
  }

  return actions.slice(0, settings.planLength);
}

async function buildLearningHubOverview(userId, targetLanguage, nativeLanguage, pairProfile = null) {
  const now = new Date();
  const [recentActivity, weeklySummary, studyHistory, savedItems, dueSavedItems, recentEvents, pairProgress, firstLesson] = await Promise.all([
    recentActivityFor(userId, targetLanguage, nativeLanguage),
    buildWeeklySummary(userId, targetLanguage, nativeLanguage),
    buildStudyHistory(userId, targetLanguage, nativeLanguage),
    StudyItem.find({ userId, targetLanguage, nativeLanguage })
      .sort({ updatedAt: -1 })
      .limit(40)
      .lean(),
    StudyItem.find({
      userId,
      targetLanguage,
      nativeLanguage,
      nextReviewAt: { $lte: now },
    })
      .sort({ nextReviewAt: 1, updatedAt: -1 })
      .limit(24)
      .lean(),
    LearningEvent.find(pairEventQuery(userId, targetLanguage, nativeLanguage))
      .sort({ occurredAt: -1 })
      .limit(48)
      .lean(),
    Lesson.find({ targetLang: targetLanguage }).distinct('_id')
      .then((lessonIds) => Progress.find({
        userId,
        lessonId: { $in: lessonIds },
      })
        .populate('lessonId', 'title category difficulty')
        .sort({ timestamp: -1 })
        .lean()),
    firstClassLesson(targetLanguage),
  ]);

  const pairEvents = recentEvents;
  const reviewQueue = buildReviewQueue(dueSavedItems, pairProgress);
  const abilityProgress = buildAbilityProgress(pairEvents, pairProgress);
  const weakSkill = weakestSkill(abilityProgress);
  const nextAction = chooseNextAction({
    recentActivity,
    reviewQueue,
    firstLesson,
    profile: pairProfile,
    abilityProgress,
  });
  const dailySpotlight = selectDailySpotlight(savedItems, dueSavedItems, pairProfile, reviewQueue.weakAreas);
  const placement = buildPlacementSuggestion(pairProfile, abilityProgress, pairProgress);
  const realWorldProgress = buildRealWorldProgress(pairProgress, savedItems);
  const recentWords = buildRecentWords(savedItems, pairEvents);
  const miniSpeakingDrills = buildMiniSpeakingDrills(savedItems, reviewQueue);
  const goalPath = buildGoalPath(pairProfile, nextAction, firstLesson, reviewQueue.weakAreas[0]);
  const firstThreeDays = buildFirstThreeDaysPlan(pairProfile, studyHistory, nextAction, firstLesson);
  const milestones = await buildMilestones(
    userId,
    targetLanguage,
    nativeLanguage,
    savedItems,
    weeklySummary,
    pairProgress,
  );
  const nextFocus = weakSkill?.skill || '';
  const reviewBeforeSleep = reviewQueue.unifiedItems.slice(0, 5);

  return {
    nextAction,
    reviewQueue,
    savedItems: savedItems.slice(0, 12),
    dailyPlan: makeDailyPlan({
      nextAction,
      reviewQueue,
      profile: pairProfile,
      weakSkill,
      weakArea: reviewQueue.weakAreas[0],
      firstLesson,
    }),
    weeklySummary,
    studyHistory,
    dailySpotlight,
    recentEvents: pairEvents,
    abilityProgress,
    placement,
    realWorldProgress,
    recentWords,
    miniSpeakingDrills,
    goalPath,
    firstThreeDays,
    milestones,
    reviewBeforeSleep,
    nextFocus,
    offlinePack: {
      generatedAt: now,
      nextAction,
      dailySpotlight,
      dailyPlan: makeDailyPlan({
        nextAction,
        reviewQueue,
        profile: pairProfile,
        weakSkill,
        weakArea: reviewQueue.weakAreas[0],
        firstLesson,
      }),
      reviewItems: reviewQueue.unifiedItems.slice(0, 8),
      recentWords: recentWords.slice(0, 8),
    },
  };
}

function buildSearchFilter(query, targetLanguage, nativeLanguage, userId) {
  const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  return {
    userId,
    targetLanguage,
    nativeLanguage,
    $or: [
      { targetText: regex },
      { nativeText: regex },
      { sourceLabel: regex },
      { reason: regex },
      { tags: regex },
      { 'metadata.note': regex },
    ],
  };
}

async function searchLearningItems(userId, targetLanguage, nativeLanguage, query) {
  const normalized = compact(query, 80);
  if (!normalized) return { savedItems: [], classLessons: [], quizzes: [], flashcards: [] };
  const regex = new RegExp(normalized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  const targetField = languageField(targetLanguage);
  const nativeField = languageField(nativeLanguage);
  const translatedClassLessonIds = nativeLanguage === 'en'
    ? []
    : await Translation.find({
      lang: nativeLanguage,
      $or: [
        { title: regex },
        { 'items.nativeText': regex },
        { 'items.exampleNative': regex },
        { 'items.breakdown.native': regex },
        { 'activities.section': regex },
        { 'activities.title': regex },
        { 'activities.goals': regex },
        { 'activities.task': regex },
        { 'expressionPractice.label': regex },
        { 'expressionPractice.goal': regex },
      ],
    }).distinct('lessonId');
  const classLessonSearchTerms = [
    { title: regex },
    { 'content.targetText': regex },
    { 'content.nativeText': regex },
    { 'content.exampleTarget': regex },
    { 'content.exampleNative': regex },
    { 'content.breakdown.target': regex },
    { 'content.breakdown.native': regex },
    { 'activities.title': regex },
    { 'activities.task': regex },
    { 'expressionPractice.label': regex },
    { 'expressionPractice.goal': regex },
  ];
  if (translatedClassLessonIds.length) {
    classLessonSearchTerms.push({ _id: { $in: translatedClassLessonIds } });
  }
  const [savedItems, classLessons, quizzes, flashcards] = await Promise.all([
    StudyItem.find(buildSearchFilter(normalized, targetLanguage, nativeLanguage, userId))
      .sort({ updatedAt: -1 })
      .limit(12)
      .lean(),
    Lesson.find({
      track: 'textbook',
      targetLang: targetLanguage,
      $or: classLessonSearchTerms,
    })
      .select('_id title category lessonType')
      .limit(8)
      .lean(),
    Lesson.find({
      track: { $ne: 'textbook' },
      targetLang: targetLanguage,
      nativeLang: nativeLanguage,
      $or: [
        { title: regex },
        { 'content.targetText': regex },
        { 'content.nativeText': regex },
        { 'content.exampleTarget': regex },
        { 'content.exampleNative': regex },
        { 'content.breakdown.target': regex },
        { 'content.breakdown.native': regex },
      ],
    })
      .select('_id title category difficulty')
      .limit(8)
      .lean(),
    Flashcard.find({
      targetLang: targetLanguage,
      nativeLang: nativeLanguage,
      $or: [
        { [targetField]: regex },
        { [nativeField]: regex },
        { conceptGloss: regex },
      ],
    })
      .select(`_id category ${targetField} ${nativeField}`)
      .limit(8)
      .lean(),
  ]);
  const classLessonTitleMap = nativeLanguage === 'en' || !classLessons.length
    ? new Map()
    : new Map((await Translation.find({
      lessonId: { $in: classLessons.map((lesson) => lesson._id) },
      lang: nativeLanguage,
    }).select('lessonId title').lean()).map((translation) => [
      String(translation.lessonId),
      translation.title,
    ]));
  return {
    savedItems,
    classLessons: classLessons.map((lesson) => ({
      ...lesson,
      title: classLessonTitleMap.get(String(lesson._id)) || lesson.title,
    })),
    quizzes,
    flashcards: flashcards.map((card) => ({
      ...card,
      targetText: card[targetField] || '',
      nativeText: card[nativeField] || '',
    })),
  };
}

module.exports = {
  buildLearningHubOverview,
  buildAbilityProgress,
  buildReviewQueue,
  buildSearchFilter,
  compact,
  reviewEase,
  reviewIntervalDays,
  searchLearningItems,
  selectDailySpotlight,
};
