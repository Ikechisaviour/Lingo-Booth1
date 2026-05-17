const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const ClassLessonProgress = require('../models/ClassLessonProgress');
const { verifyToken, optionalAuth, isAdmin } = require('../middleware/auth');
const { getAiEntitlements } = require('../utils/subscription');
const {
  getOrCreateTranslation,
  applyTranslation,
  batchTranslateRaw,
  translationSourceFingerprint,
} = require('../utils/translationService');
const { normalizeLessonForLanguagePair } = require('../utils/languageConcepts');
const { enrichLessonWithPronunciation } = require('../utils/pronunciationService');
const {
  NON_LATIN_TARGET_LANGS,
  normalizeTargetLayerForDisplay,
} = require('../utils/targetLayerPolicy');

const VALID_CATEGORIES = ['daily-life', 'business', 'travel', 'greetings', 'food', 'shopping', 'healthcare', 'career'];
const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced', 'sentences'];
const VALID_TRACKS = ['textbook', 'practice'];
const CLASS_LESSON_TRACK = 'textbook';
const LOCALIZED_LESSON_CACHE_TTL_MS = 5 * 60 * 1000;
const localizedLessonCache = new Map();

function routeContentKind(req) {
  if (req.baseUrl.endsWith('/class-lessons')) return 'classLesson';
  if (req.baseUrl.endsWith('/quiz')) return 'quiz';
  return 'legacyQuiz';
}

function notFoundLabel(req) {
  const kind = routeContentKind(req);
  if (kind === 'classLesson') return 'Class lesson';
  if (kind === 'quiz') return 'Quiz';
  return 'Quiz';
}

function canSyncClassProgress(req) {
  if (!req.userId || !req.user) return false;
  return !!getAiEntitlements(req.user).canSyncAIMemory;
}

function normalizeLang(code, fallback = 'en') {
  const value = String(code || fallback).trim().toLowerCase().slice(0, 20);
  const aliases = {
    kr: 'ko',
    kor: 'ko',
    cn: 'zh',
    chn: 'zh',
    jp: 'ja',
    jpn: 'ja',
    iw: 'he',
    in: 'id',
    tl: 'fil',
  };
  if (aliases[value]) return aliases[value];
  if (value.startsWith('zh')) return 'zh';
  if (value.startsWith('pt')) return 'pt';
  const base = value.split(/[-_]/)[0];
  return aliases[base] || base || fallback;
}

function stripEnglishMeaningParentheticals(text, targetLang, nativeLang) {
  if (!text || nativeLang === 'en' || targetLang === 'en' || !NON_LATIN_TARGET_LANGS.has(targetLang)) {
    return text;
  }
  let cleaned = String(text)
    .replace(/\s*\(([A-Za-z][A-Za-z\s,'/-]{2,})\)/g, '')
    .replace(/\s+vs\s+/gi, ' / ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();

  if (targetLang === 'zh') {
    cleaned = cleaned
      // Target examples such as "mā 妈 mother" should display as "mā 妈".
      .replace(/([A-Za-zÀ-žĀ-žǍǎǏǐǑǒǓǔǕ-ǜüÜ\s'-]+[\u3400-\u9FFF]+)\s+[A-Za-z][A-Za-z\s'"-]*(?=(\s*(?:[·,;/]|$)))/g, '$1')
      // Target examples such as "国/國 (country)" should display as "国/國".
      .replace(/([\u3400-\u9FFF][\u3400-\u9FFF/／]*)\s*\([A-Za-z][^)]+\)/g, '$1')
      .replace(/\s+([·,;/])/g, ' $1')
      .replace(/([·,;/])\s+/g, '$1 ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  return cleaned;
}

function cleanTargetExamplesForNativeDisplay(lessonObj, targetLang, nativeLang) {
  if (!Array.isArray(lessonObj?.content)) return;
  lessonObj.content.forEach((item) => {
    const originalExample = item.exampleTarget || item.example || '';
    const cleanedExample = stripEnglishMeaningParentheticals(originalExample, targetLang, nativeLang);
    if (cleanedExample && cleanedExample !== originalExample) {
      item.exampleTarget = cleanedExample;
      item.example = cleanedExample;
    }
    if (Array.isArray(item.breakdown)) {
      item.breakdown.forEach((part) => {
        const originalTarget = part.target || part.korean || '';
        const cleanedTarget = stripEnglishMeaningParentheticals(originalTarget, targetLang, nativeLang);
        if (cleanedTarget && cleanedTarget !== originalTarget) {
          part.target = cleanedTarget;
          part.korean = cleanedTarget;
        }
      });
    }
  });
}

function sanitizeIndex(value, fallback = 0) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(0, Math.floor(number));
}

function sanitizeCompletedItems(items) {
  if (!Array.isArray(items)) return [];
  return Array.from(new Set(
    items
      .map(item => Number(item))
      .filter(item => Number.isInteger(item) && item >= 0)
      .slice(0, 500)
  ));
}

function sanitizeTutorPart(part = {}) {
  const text = String(part.text || '').trim().slice(0, 800);
  if (!text) return null;
  return {
    type: String(part.type || '').slice(0, 40),
    language: String(part.language || '').slice(0, 20),
    text,
    speak: part.speak !== false,
    speaker: String(part.speaker || '').slice(0, 80),
    section: String(part.section || '').slice(0, 80),
  };
}

function sanitizeTutorTurns(turns) {
  if (!Array.isArray(turns)) return [];
  return turns
    .filter(turn => turn && ['user', 'assistant'].includes(turn.role))
    .slice(-16)
    .map(turn => ({
      id: String(turn.id || '').slice(0, 120),
      role: turn.role,
      content: String(turn.content || '').trim().slice(0, 1600),
      language: String(turn.language || '').slice(0, 20),
      coachingTip: String(turn.coachingTip || '').slice(0, 800),
      speechParts: Array.isArray(turn.speechParts)
        ? turn.speechParts.map(sanitizeTutorPart).filter(Boolean).slice(0, 20)
        : [],
      displayParts: Array.isArray(turn.displayParts)
        ? turn.displayParts.map(sanitizeTutorPart).filter(Boolean).slice(0, 20)
        : [],
    }))
    .filter(turn => turn.content);
}

function sanitizeProgressPayload(body = {}) {
  return {
    selectedIndex: sanitizeIndex(body.selectedIndex),
    selectedActivityIndex: sanitizeIndex(body.selectedActivityIndex),
    completedItems: sanitizeCompletedItems(body.completedItems),
    summary: String(body.summary || '').slice(0, 1000),
    memory: body.memory && typeof body.memory === 'object' && !Array.isArray(body.memory)
      ? body.memory
      : {},
    tutorTurns: sanitizeTutorTurns(body.tutorTurns),
    source: ['web', 'mobile'].includes(body.source) ? body.source : 'unknown',
    lastStudiedAt: new Date(),
  };
}

async function addCourseOrderingMetadata(lessonsJson, targetLang) {
  if (!Array.isArray(lessonsJson) || lessonsJson.length === 0 || !targetLang) {
    return lessonsJson;
  }

  const courses = await Course.find({ targetLang }).lean();
  const orderMap = new Map();
  courses.forEach((course) => {
    const lessons = Array.isArray(course.lessons) ? course.lessons : [];
    lessons.forEach((entry) => {
      const lessonId = String(entry.lessonId || '');
      if (!lessonId) return;
      orderMap.set(lessonId, {
        level: course.level,
        track: course.track,
        title: course.title,
        description: course.description || '',
        position: entry.position,
        kind: entry.kind,
      });
    });
  });

  const trackOrder = { foundation: 1, thematic: 2, adult: 3, grammar: 4 };
  lessonsJson.forEach((lesson) => {
    const course = orderMap.get(String(lesson._id));
    if (course) lesson.course = course;
  });

  lessonsJson.sort((a, b) => {
    const ac = a.course || {};
    const bc = b.course || {};
    const aLevel = Number(ac.level || 99);
    const bLevel = Number(bc.level || 99);
    if (aLevel !== bLevel) return aLevel - bLevel;
    const aTrack = trackOrder[ac.track] || 99;
    const bTrack = trackOrder[bc.track] || 99;
    if (aTrack !== bTrack) return aTrack - bTrack;
    const aPosition = Number(ac.position || 999);
    const bPosition = Number(bc.position || 999);
    if (aPosition !== bPosition) return aPosition - bPosition;
    return String(a.title || '').localeCompare(String(b.title || ''), 'ko');
  });

  return lessonsJson;
}

function classLessonStats(content = []) {
  const items = Array.isArray(content) ? content : [];
  return items.reduce((stats, item) => {
    stats.total += 1;
    if (item?.type === 'word') stats.vocabulary += 1;
    if (item?.type === 'sentence') stats.grammar += 1;
    if (item?.type === 'conversation') stats.dialogues += 1;
    return stats;
  }, {
    total: 0,
    vocabulary: 0,
    grammar: 0,
    dialogues: 0,
  });
}

function classLessonSummary(lesson = {}) {
  const stats = classLessonStats(lesson.content);
  return {
    _id: lesson._id,
    title: lesson.title,
    category: lesson.category,
    difficulty: lesson.difficulty,
    track: lesson.track,
    lessonType: lesson.lessonType,
    targetLang: lesson.targetLang,
    nativeLang: lesson.nativeLang,
    course: lesson.course,
    stats,
  };
}

function classLessonShell(lesson = {}) {
  const stats = classLessonStats(lesson.content);
  return {
    ...lesson,
    content: undefined,
    contentTotal: stats.total,
    contentStats: stats,
    contentIndex: (Array.isArray(lesson.content) ? lesson.content : []).map((item, index) => ({
      index,
      type: item?.type || '',
      activityIds: Array.isArray(item?.activityIds) ? item.activityIds : [],
    })),
  };
}

function clampWindowStart(center, total, limit) {
  if (!total) return 0;
  const safeLimit = Math.max(1, Math.min(limit, total));
  const desired = Math.max(0, Math.floor(center) - Math.floor(safeLimit / 2));
  return Math.min(desired, Math.max(0, total - safeLimit));
}

function classLessonWindow(lesson = {}, center = 0, limit = 8) {
  const items = Array.isArray(lesson.content) ? lesson.content : [];
  const total = items.length;
  const safeLimit = Math.max(1, Math.min(Number(limit) || 8, 24));
  const start = clampWindowStart(Number(center) || 0, total, safeLimit);
  const end = Math.min(total, start + safeLimit);
  return {
    items: items.slice(start, end).map((item, offset) => ({
      ...item,
      index: start + offset,
    })),
    window: {
      start,
      end,
      total,
    },
  };
}

async function localizeLessonForPair(lesson, contentKind, normalizedNativeLang) {
  const sourceFingerprint = translationSourceFingerprint(lesson);
  const cacheKey = `${lesson._id}:${contentKind}:${normalizedNativeLang}:${sourceFingerprint}`;
  const cached = localizedLessonCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.lessonObj;
  }

  const lessonObj = lesson.toJSON();
  const targetLang = normalizeLang(lesson.targetLang || 'ko');

  if (contentKind !== 'classLesson') {
    normalizeLessonForLanguagePair(lessonObj, targetLang, normalizedNativeLang);
  }

  // Snapshot original English seed values before translation overlay so the
  // live-fallback below can detect untranslated fields.
  const isNonEnglishNative = normalizedNativeLang !== 'en';
  const originalNativeTexts = isNonEnglishNative && lessonObj.content
    ? lessonObj.content.map(c => c.nativeText || '')
    : null;
  const originalExampleNativeTexts = isNonEnglishNative && lessonObj.content
    ? lessonObj.content.map(c => c.exampleNative || c.exampleEnglish || '')
    : null;
  const originalBreakdownNativeTexts = isNonEnglishNative && lessonObj.content
    ? lessonObj.content.map(c => (
      Array.isArray(c.breakdown)
        ? c.breakdown.map(part => part?.native || part?.english || '')
        : []
    ))
    : null;
  const originalActivities = isNonEnglishNative && Array.isArray(lessonObj.activities)
    ? lessonObj.activities.map(a => ({
      section: a?.section || '',
      title: a?.title || '',
      task: a?.task || '',
      goals: Array.isArray(a?.goals) ? a.goals.slice() : [],
    }))
    : null;
  const originalExpressionPractice = isNonEnglishNative && Array.isArray(lessonObj.expressionPractice)
    ? lessonObj.expressionPractice.map(ep => ({
      label: ep?.label || '',
      goal: ep?.goal || '',
    }))
    : null;

  try {
    const translationNativeLang = contentKind === 'classLesson' ? normalizedNativeLang : 'en';
    const translation = await getOrCreateTranslation(lesson, translationNativeLang, targetLang);
    applyTranslation(lessonObj, translation);
  } catch (err) {
    console.error('Translation/romanization overlay failed:', err.message);
  }

  if (originalNativeTexts && lessonObj.content) {
    const missingIndices = [];
    const missingTexts = [];
    for (let i = 0; i < lessonObj.content.length; i++) {
      const c = lessonObj.content[i];
      if (c.nativeText && c.nativeText === originalNativeTexts[i]) {
        missingIndices.push(i);
        missingTexts.push(c.nativeText);
      }
    }
    if (missingTexts.length > 0) {
      try {
        const results = await batchTranslateRaw(missingTexts, 'en', normalizedNativeLang);
        for (let k = 0; k < results.length; k++) {
          const translated = results[k]?.failed ? '' : results[k]?.text;
          if (translated) {
            lessonObj.content[missingIndices[k]].nativeText = translated;
          } else {
            lessonObj.content[missingIndices[k]].nativeText = '';
            lessonObj.content[missingIndices[k]]._translationPending = true;
          }
        }
      } catch (err) {
        for (const idx of missingIndices) {
          lessonObj.content[idx].nativeText = '';
          lessonObj.content[idx]._translationPending = true;
        }
        console.error('Lesson nativeText translation failed:', err.message);
      }
    }
  }

  if (originalExampleNativeTexts && lessonObj.content) {
    const missingIndices = [];
    const missingTexts = [];
    for (let i = 0; i < lessonObj.content.length; i++) {
      const c = lessonObj.content[i];
      const current = c.exampleNative || c.exampleEnglish || '';
      const original = originalExampleNativeTexts[i];
      if (current && original && current === original) {
        missingIndices.push(i);
        missingTexts.push(current);
      }
    }
    if (missingTexts.length > 0) {
      try {
        const results = await batchTranslateRaw(missingTexts, 'en', normalizedNativeLang);
        for (let k = 0; k < results.length; k++) {
          const translated = results[k]?.failed ? '' : results[k]?.text;
          const targetIndex = missingIndices[k];
          if (translated) {
            lessonObj.content[targetIndex].exampleNative = translated;
            lessonObj.content[targetIndex].exampleEnglish = translated;
          } else {
            lessonObj.content[targetIndex].exampleNative = '';
            lessonObj.content[targetIndex].exampleEnglish = '';
            lessonObj.content[targetIndex]._translationPending = true;
          }
        }
      } catch (err) {
        for (const idx of missingIndices) {
          lessonObj.content[idx].exampleNative = '';
          lessonObj.content[idx].exampleEnglish = '';
          lessonObj.content[idx]._translationPending = true;
        }
        console.error('Lesson exampleNative translation failed:', err.message);
      }
    }
  }

  if (originalBreakdownNativeTexts && lessonObj.content) {
    const missing = [];
    lessonObj.content.forEach((item, itemIndex) => {
      if (!Array.isArray(item.breakdown)) return;
      item.breakdown.forEach((part, partIndex) => {
        const current = part?.native || part?.english || '';
        const original = originalBreakdownNativeTexts[itemIndex]?.[partIndex] || '';
        if (current && original && current === original) {
          missing.push({ itemIndex, partIndex, text: current });
        }
      });
    });

    if (missing.length > 0) {
      try {
        const results = await batchTranslateRaw(missing.map(m => m.text), 'en', normalizedNativeLang);
        for (let k = 0; k < results.length; k++) {
          const m = missing[k];
          const translated = results[k]?.failed ? '' : results[k]?.text;
          const dst = lessonObj.content[m.itemIndex]?.breakdown?.[m.partIndex];
          if (!dst) continue;
          if (translated) {
            dst.native = translated;
            dst.english = translated;
          } else {
            dst.native = '';
            dst.english = '';
            dst._translationPending = true;
            lessonObj.content[m.itemIndex]._translationPending = true;
          }
        }
      } catch (err) {
        for (const m of missing) {
          const dst = lessonObj.content[m.itemIndex]?.breakdown?.[m.partIndex];
          if (!dst) continue;
          dst.native = '';
          dst.english = '';
          dst._translationPending = true;
          lessonObj.content[m.itemIndex]._translationPending = true;
        }
        console.error('Lesson breakdown translation failed:', err.message);
      }
    }
  }

  if (originalActivities && Array.isArray(lessonObj.activities)) {
    const missing = [];
    lessonObj.activities.forEach((act, i) => {
      const orig = originalActivities[i];
      if (!orig || !act) return;
      ['section', 'title', 'task'].forEach((field) => {
        const value = act[field];
        if (value && value === orig[field]) {
          missing.push({ kind: 'activity', i, field, text: value });
        }
      });
      if (Array.isArray(act.goals) && Array.isArray(orig.goals)) {
        act.goals.forEach((g, gi) => {
          if (g && g === orig.goals[gi]) {
            missing.push({ kind: 'activity', i, field: 'goals', goalIndex: gi, text: g });
          }
        });
      }
    });
    if (missing.length > 0) {
      try {
        const results = await batchTranslateRaw(missing.map(m => m.text), 'en', normalizedNativeLang);
        for (let k = 0; k < results.length; k++) {
          const m = missing[k];
          const translated = results[k]?.failed ? '' : results[k]?.text;
          const dst = lessonObj.activities[m.i];
          if (!dst) continue;
          if (m.field === 'goals') {
            if (translated) dst.goals[m.goalIndex] = translated;
            else { dst.goals[m.goalIndex] = ''; dst._translationPending = true; }
          } else if (translated) {
            dst[m.field] = translated;
          } else {
            dst[m.field] = '';
            dst._translationPending = true;
          }
        }
      } catch (err) {
        for (const m of missing) {
          const dst = lessonObj.activities[m.i];
          if (!dst) continue;
          if (m.field === 'goals') dst.goals[m.goalIndex] = '';
          else dst[m.field] = '';
          dst._translationPending = true;
        }
        console.error('Lesson activities translation failed:', err.message);
      }
    }
  }

  if (originalExpressionPractice && Array.isArray(lessonObj.expressionPractice)) {
    const missing = [];
    lessonObj.expressionPractice.forEach((ep, i) => {
      const orig = originalExpressionPractice[i];
      if (!orig || !ep) return;
      ['label', 'goal'].forEach((field) => {
        const value = ep[field];
        if (value && value === orig[field]) {
          missing.push({ i, field, text: value });
        }
      });
    });
    if (missing.length > 0) {
      try {
        const results = await batchTranslateRaw(missing.map(m => m.text), 'en', normalizedNativeLang);
        for (let k = 0; k < results.length; k++) {
          const m = missing[k];
          const translated = results[k]?.failed ? '' : results[k]?.text;
          const dst = lessonObj.expressionPractice[m.i];
          if (!dst) continue;
          if (translated) dst[m.field] = translated;
          else { dst[m.field] = ''; dst._translationPending = true; }
        }
      } catch (err) {
        for (const m of missing) {
          const dst = lessonObj.expressionPractice[m.i];
          if (!dst) continue;
          dst[m.field] = '';
          dst._translationPending = true;
        }
        console.error('Lesson expressionPractice translation failed:', err.message);
      }
    }
  }

  cleanTargetExamplesForNativeDisplay(lessonObj, targetLang, normalizedNativeLang);
  normalizeTargetLayerForDisplay(lessonObj, targetLang);
  await enrichLessonWithPronunciation(lessonObj, targetLang, normalizedNativeLang);
  if (localizedLessonCache.size > 200) {
    const now = Date.now();
    for (const [key, value] of localizedLessonCache.entries()) {
      if (value.expiresAt <= now) localizedLessonCache.delete(key);
    }
    if (localizedLessonCache.size > 200) {
      const oldestKey = localizedLessonCache.keys().next().value;
      if (oldestKey) localizedLessonCache.delete(oldestKey);
    }
  }
  localizedLessonCache.set(cacheKey, {
    expiresAt: Date.now() + LOCALIZED_LESSON_CACHE_TTL_MS,
    lessonObj,
  });
  return lessonObj;
}

async function loadClassLessonProgress(req, classLessonId, nativeLanguage, targetLanguage) {
  const canSync = canSyncClassProgress(req);
  if (!canSync) return { canSync: false, progress: null };

  const progress = await ClassLessonProgress.findOne({
    userId: req.userId,
    classLessonId,
    nativeLanguage,
    targetLanguage,
  }).lean();

  return { canSync: true, progress };
}

async function warmClassLessonPair(targetLang, nativeLang, userId = '') {
  const normalizedTargetLang = normalizeLang(targetLang || 'ko');
  const normalizedNativeLang = normalizeLang(nativeLang || 'en');
  const lessons = await Lesson.find({
    track: CLASS_LESSON_TRACK,
    targetLang: normalizedTargetLang,
  }).sort({
    'course.level': 1,
    'course.track': 1,
    'course.position': 1,
  });

  if (!lessons.length) return;

  if (normalizedNativeLang !== 'en') {
    const Translation = require('../models/Translation');
    try {
      const cachedTitles = await Translation.find({
        lessonId: { $in: lessons.map((lesson) => lesson._id) },
        lang: normalizedNativeLang,
        title: { $ne: '' },
      }).select('lessonId title').lean();
      const cachedTitleIds = new Set(cachedTitles.map((row) => String(row.lessonId)));
      const uncached = lessons.filter((lesson) => lesson.title && !cachedTitleIds.has(String(lesson._id)));
      const translatedTitles = await batchTranslateRaw(uncached.map((lesson) => lesson.title), 'en', normalizedNativeLang);
      await Promise.all(uncached.map((lesson, index) => {
        const translated = translatedTitles[index]?.failed ? '' : (translatedTitles[index]?.text || '');
        if (!translated) return Promise.resolve();
        return Translation.updateOne(
          { lessonId: lesson._id, lang: normalizedNativeLang },
          { $set: { lessonId: lesson._id, lang: normalizedNativeLang, title: translated } },
          { upsert: true }
        );
      }));
    } catch (error) {
      console.error(`Warm class lesson titles failed [${normalizedNativeLang}->${normalizedTargetLang}]`, error.message || error);
    }
  }

  let likelyLessons = lessons.slice(0, 3);
  if (userId) {
    const resumed = await ClassLessonProgress.findOne({
      userId,
      nativeLanguage: normalizedNativeLang,
      targetLanguage: normalizedTargetLang,
    }).sort({ lastStudiedAt: -1 }).select('classLessonId').lean();
    const resumedLesson = resumed?.classLessonId
      ? lessons.find((lesson) => String(lesson._id) === String(resumed.classLessonId))
      : null;
    if (resumedLesson && !likelyLessons.some((lesson) => String(lesson._id) === String(resumedLesson._id))) {
      likelyLessons = [resumedLesson, ...likelyLessons].slice(0, 4);
    }
  }

  await Promise.allSettled(likelyLessons.map(async (lesson) => {
    try {
      await localizeLessonForPair(lesson, 'classLesson', normalizedNativeLang);
    } catch (error) {
      console.error(`Warm class lesson pair failed [${normalizedNativeLang}->${normalizedTargetLang}]`, error.message || error);
    }
  }));
}

// Get class lessons or quizzes (public - guests and authenticated users).
// Pass ?nativeLang=hi to get translated titles.
// /api/class-lessons returns textbook class lessons; /api/quiz returns quiz content.
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { category, difficulty, targetLang, nativeLang, track } = req.query;
    const contentKind = routeContentKind(req);
    let filter = {};

    if (category && VALID_CATEGORIES.includes(category)) {
      filter.category = category;
    }
    if (difficulty && VALID_DIFFICULTIES.includes(difficulty)) {
      filter.difficulty = difficulty;
    }
    if (contentKind === 'classLesson') {
      filter.track = CLASS_LESSON_TRACK;
    } else if (contentKind === 'quiz') {
      filter.track = { $ne: CLASS_LESSON_TRACK };
    } else if (track && VALID_TRACKS.includes(track)) {
      filter.track = track;
    } else {
      // Legacy route behavior: exclude textbook class lessons so
      // /lessons and /flashcards stay free of class-only content.
      // Use $ne to also match legacy docs that have no `track` field stored.
      filter.track = { $ne: CLASS_LESSON_TRACK };
    }
    if (!targetLang) {
      return res.status(400).json({ message: 'targetLang query parameter is required' });
    }
    const normalizedTargetLang = normalizeLang(targetLang);
    const normalizedNativeLang = normalizeLang(nativeLang || req.user?.nativeLanguage || 'en');
    filter.targetLang = normalizedTargetLang;

    const summaryView = contentKind === 'classLesson' && req.query.view === 'summary';
    const lessonQuery = Lesson.find(filter);
    if (summaryView) {
      lessonQuery.select('_id title category difficulty track lessonType targetLang nativeLang course content.type');
    }
    const lessons = await lessonQuery;
    const lessonsJson = lessons.map(l => l.toJSON());

    // Translate lesson titles for non-English native speakers
    if (normalizedNativeLang !== 'en') {
      const Translation = require('../models/Translation');
      const { batchTranslateRaw } = require('../utils/translationService');
      const lessonIds = lessonsJson.map(l => l._id);
      const translations = await Translation.find({
        lessonId: { $in: lessonIds },
        lang: normalizedNativeLang,
      }).select('lessonId title').lean();

      const titleMap = {};
      translations.forEach(t => {
        if (t.title) titleMap[t.lessonId.toString()] = t.title;
      });

      // Find lessons without cached title translations
      const uncached = lessonsJson.filter(l => !titleMap[l._id.toString()] && l.title);
      if (uncached.length > 0) {
        const titles = uncached.map(l => l.title);
        const results = await batchTranslateRaw(titles, 'en', normalizedNativeLang);
        for (let i = 0; i < uncached.length; i++) {
          const translated = results[i]?.failed ? '' : (results[i]?.text || '');
          if (!translated) continue;
          titleMap[uncached[i]._id.toString()] = translated;
          // Cache the translated title for future requests
          Translation.updateOne(
            { lessonId: uncached[i]._id, lang: normalizedNativeLang },
            { $set: { lessonId: uncached[i]._id, lang: normalizedNativeLang, title: translated } },
            { upsert: true }
          ).catch(() => {});
        }
      }

      lessonsJson.forEach(l => {
        if (titleMap[l._id.toString()]) {
          l.title = titleMap[l._id.toString()];
        }
      });
    }

    if (contentKind === 'classLesson') {
      if (!summaryView) {
        lessonsJson.forEach((lessonObj) => {
          cleanTargetExamplesForNativeDisplay(lessonObj, normalizedTargetLang, normalizedNativeLang);
          normalizeTargetLayerForDisplay(lessonObj, normalizedTargetLang);
        });
      }
      await addCourseOrderingMetadata(lessonsJson, normalizedTargetLang);
    }

    if (summaryView) {
      return res.json(lessonsJson.map(classLessonSummary));
    }

    res.json(lessonsJson);
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fire-and-forget pair warming: prepare the first likely class lessons after a
// learner picks a language pair, so first entry into class feels immediate.
router.post('/prepare-pair', optionalAuth, async (req, res) => {
  try {
    if (routeContentKind(req) !== 'classLesson') {
      return res.status(404).json({ message: 'Class lesson pair preparation not found' });
    }
    const targetLang = normalizeLang(req.body?.targetLang || req.query.targetLang || req.user?.targetLanguage || 'ko');
    const nativeLang = normalizeLang(req.body?.nativeLang || req.query.nativeLang || req.user?.nativeLanguage || 'en');
    if (!targetLang || !nativeLang || targetLang === nativeLang) {
      return res.status(400).json({ message: 'A distinct nativeLang and targetLang are required' });
    }

    setImmediate(() => {
      warmClassLessonPair(targetLang, nativeLang, req.userId).catch((error) => {
        console.error(`Prepare class lesson pair failed [${nativeLang}->${targetLang}]`, error.message || error);
      });
    });

    res.status(202).json({ queued: true, targetLang, nativeLang });
  } catch (error) {
    console.error('Prepare class lesson pair error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Resume-aware initial payload. The shell contains stable lesson metadata plus
// a compact item index; detailed content is only the nearby window needed first.
router.get('/:id/bootstrap', optionalAuth, async (req, res) => {
  try {
    if (routeContentKind(req) !== 'classLesson') {
      return res.status(404).json({ message: 'Class lesson bootstrap not found' });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Class lesson not found' });
    }

    const lesson = await Lesson.findById(req.params.id);
    if (!lesson || lesson.track !== CLASS_LESSON_TRACK) {
      return res.status(404).json({ message: 'Class lesson not found' });
    }

    const nativeLanguage = normalizeLang(req.query.nativeLang, req.user?.nativeLanguage || 'en');
    const targetLanguage = normalizeLang(req.query.targetLang, req.user?.targetLanguage || lesson.targetLang || 'ko');
    if (normalizeLang(lesson.targetLang || 'ko') !== targetLanguage) {
      return res.status(404).json({ message: 'Class lesson not found for this language pair' });
    }

    const progressPayload = await loadClassLessonProgress(req, req.params.id, nativeLanguage, targetLanguage);
    const requestedCenter = sanitizeIndex(req.query.center, 0);
    const progressCenter = sanitizeIndex(progressPayload.progress?.selectedIndex, requestedCenter);
    const windowSize = Math.max(4, Math.min(24, sanitizeIndex(req.query.windowSize, 8) || 8));
    const lessonObj = await localizeLessonForPair(lesson, 'classLesson', nativeLanguage);
    const windowPayload = classLessonWindow(lessonObj, progressCenter, windowSize);

    res.json({
      lesson: classLessonShell(lessonObj),
      ...windowPayload,
      canSync: progressPayload.canSync,
      progress: progressPayload.progress,
    });
  } catch (error) {
    console.error('Get class lesson bootstrap error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id/items', optionalAuth, async (req, res) => {
  try {
    if (routeContentKind(req) !== 'classLesson') {
      return res.status(404).json({ message: 'Class lesson items not found' });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Class lesson not found' });
    }

    const lesson = await Lesson.findById(req.params.id);
    if (!lesson || lesson.track !== CLASS_LESSON_TRACK) {
      return res.status(404).json({ message: 'Class lesson not found' });
    }

    const nativeLanguage = normalizeLang(req.query.nativeLang, req.user?.nativeLanguage || 'en');
    const targetLanguage = normalizeLang(req.query.targetLang, req.user?.targetLanguage || lesson.targetLang || 'ko');
    if (normalizeLang(lesson.targetLang || 'ko') !== targetLanguage) {
      return res.status(404).json({ message: 'Class lesson not found for this language pair' });
    }

    const center = sanitizeIndex(req.query.center, 0);
    const windowSize = Math.max(4, Math.min(24, sanitizeIndex(req.query.windowSize, 8) || 8));
    const lessonObj = await localizeLessonForPair(lesson, 'classLesson', nativeLanguage);
    res.json(classLessonWindow(lessonObj, center, windowSize));
  } catch (error) {
    console.error('Get class lesson items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single lesson (public — guests and authenticated users)
// Pass ?nativeLang=de to get native-side fields translated to German, etc.
// Get synced class lesson progress for Pro/Ultra/admin users.
router.get('/:id/progress', optionalAuth, async (req, res) => {
  try {
    if (routeContentKind(req) !== 'classLesson') {
      return res.status(404).json({ message: 'Class lesson progress not found' });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Class lesson not found' });
    }

    const nativeLanguage = normalizeLang(req.query.nativeLang, req.user?.nativeLanguage || 'en');
    const targetLanguage = normalizeLang(req.query.targetLang, req.user?.targetLanguage || 'ko');
    const canSync = canSyncClassProgress(req);
    if (!canSync) {
      return res.json({ canSync: false, progress: null });
    }

    const progress = await ClassLessonProgress.findOne({
      userId: req.userId,
      classLessonId: req.params.id,
      nativeLanguage,
      targetLanguage,
    }).lean();

    res.json({ canSync: true, progress });
  } catch (error) {
    console.error('Get class lesson progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save synced class lesson progress for Pro/Ultra/admin users.
router.put('/:id/progress', optionalAuth, async (req, res) => {
  try {
    if (routeContentKind(req) !== 'classLesson') {
      return res.status(404).json({ message: 'Class lesson progress not found' });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Class lesson not found' });
    }

    const nativeLanguage = normalizeLang(req.body?.nativeLanguage || req.query.nativeLang, req.user?.nativeLanguage || 'en');
    const targetLanguage = normalizeLang(req.body?.targetLanguage || req.query.targetLang, req.user?.targetLanguage || 'ko');
    const canSync = canSyncClassProgress(req);
    if (!canSync) {
      return res.json({ canSync: false, progress: null });
    }

    const lesson = await Lesson.findById(req.params.id).select('track targetLang').lean();
    if (!lesson || lesson.track !== CLASS_LESSON_TRACK || lesson.targetLang !== targetLanguage) {
      return res.status(404).json({ message: 'Class lesson not found' });
    }

    const payload = sanitizeProgressPayload(req.body || {});
    const progress = await ClassLessonProgress.findOneAndUpdate(
      {
        userId: req.userId,
        classLessonId: req.params.id,
        nativeLanguage,
        targetLanguage,
      },
      {
        $set: {
          ...payload,
          nativeLanguage,
          targetLanguage,
        },
        $setOnInsert: {
          userId: req.userId,
          classLessonId: req.params.id,
        },
      },
      { upsert: true, new: true },
    ).lean();

    res.json({ canSync: true, progress });
  } catch (error) {
    console.error('Save class lesson progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', optionalAuth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: `${notFoundLabel(req)} not found` });
    }
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: `${notFoundLabel(req)} not found` });
    }

    const contentKind = routeContentKind(req);
    if (contentKind === 'classLesson' && lesson.track !== CLASS_LESSON_TRACK) {
      return res.status(404).json({ message: 'Class lesson not found' });
    }
    if (contentKind === 'quiz' && lesson.track === CLASS_LESSON_TRACK) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const { nativeLang, targetLang: requestedTargetLang } = req.query;
    const targetLang = normalizeLang(lesson.targetLang || 'ko');
    const normalizedNativeLang = normalizeLang(nativeLang || req.user?.nativeLanguage || 'en');
    const normalizedRequestedTargetLang = requestedTargetLang ? normalizeLang(requestedTargetLang) : '';
    if (normalizedRequestedTargetLang && targetLang !== normalizedRequestedTargetLang) {
      return res.status(404).json({ message: `${notFoundLabel(req)} not found for this language pair` });
    }
    const lessonObj = await localizeLessonForPair(lesson, contentKind, normalizedNativeLang);
    res.json(lessonObj);
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create lesson (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, category, difficulty, content, targetLang, nativeLang } = req.body;

    if (!title || !category || !content || !targetLang) {
      return res.status(400).json({ message: 'Title, category, content, and targetLang are required' });
    }

    const lesson = new Lesson({
      title,
      category,
      difficulty,
      content,
      targetLang,
      nativeLang: nativeLang || 'en',
    });

    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
