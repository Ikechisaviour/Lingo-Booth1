const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const ClassLessonProgress = require('../models/ClassLessonProgress');
const {
  applyLearningArchitecture,
  inferLearningArchitecture,
  sortByLearningArchitecture,
} = require('../utils/learningArchitecture');
const { verifyToken, optionalAuth, isAdmin } = require('../middleware/auth');
const { getAiEntitlements } = require('../utils/subscription');
const {
  getOrCreateTranslation,
  applyTranslation,
  batchTranslateRaw,
  batchTranslatePreservingTargetScript,
  preservesTargetScriptSegments,
  translationSourceFingerprint,
} = require('../utils/translationService');
const { normalizeLessonForLanguagePair } = require('../utils/languageConcepts');
const { enrichLessonWithPronunciation } = require('../utils/pronunciationService');
const {
  NON_LATIN_TARGET_LANGS,
  containsTargetScript,
  normalizeTargetLayerForDisplay,
} = require('../utils/targetLayerPolicy');
const { sendServerError, sendClientError } = require('../utils/sendError');

const { LESSON_CATEGORIES } = Lesson;
const VALID_CATEGORIES = LESSON_CATEGORIES;
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
  if (!text || targetLang === 'en' || !NON_LATIN_TARGET_LANGS.has(targetLang)) {
    return text;
  }
  let cleaned = String(text)
    .replace(/\s*\(([^)]*)\)/g, (match, inner) => (
      /[A-Za-z]{3,}/.test(inner) && !containsTargetScript(inner, targetLang)
        ? ''
        : match
    ))
    .replace(/\s+vs\s+/gi, ' / ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();

  if (targetLang === 'zh') {
    cleaned = cleaned
      // Target examples such as "mā 妈 mother" should display as "mā 妈".
      .replace(/([A-Za-zÀ-žĀ-žǍǎǏǐǑǒǓǔǕ-ǜüÜ\s'-]+[\u3400-\u9FFF]+)\s+[A-Za-z][A-Za-z\s'"-]*(?=(\s*(?:[·,;/]|$)))/g, '$1')
      // Reverse-order examples such as "妈 mā mother" should display as "妈 mā".
      .replace(/([\u3400-\u9FFF]+(?:\s+[A-Za-zÀ-žĀ-žǍǎǏǐǑǒǓǔǕ-ǜüÜ'-]+)+)\s+[A-Za-z][A-Za-z\s'"-]*(?=(\s*(?:[·,;/]|$)))/g, '$1')
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
        lessonRole: entry.lessonRole,
        branchType: entry.branchType,
        lessonWeight: entry.lessonWeight,
        checkpointType: entry.checkpointType,
        repairFocus: entry.repairFocus,
        longActivityTypes: entry.longActivityTypes,
        manifestSource: entry.manifestSource,
        programLevelNameKey: entry.programLevelNameKey,
        programLevelDescriptionKey: entry.programLevelDescriptionKey,
        unitOrder: entry.unitOrder,
        sequenceOrder: entry.sequenceOrder,
        requiredForProgress: entry.requiredForProgress,
        skillFocus: entry.skillFocus,
        prerequisiteConcepts: entry.prerequisiteConcepts,
        teachesConcepts: entry.teachesConcepts,
        reviewsConcepts: entry.reviewsConcepts,
        certificateEligible: entry.certificateEligible,
      });
    });
  });

  lessonsJson.forEach((lesson) => {
    const course = orderMap.get(String(lesson._id));
    const inferredCourse = course || inferCourseOrderingMetadata(lesson);
    applyLearningArchitecture(lesson, inferredCourse);
    lesson.course = {
      ...inferredCourse,
      sourceLevel: inferredCourse.level,
      sourceTrack: inferredCourse.track,
      level: lesson.learning.level,
      track: lesson.learning.levelTrack,
      supportLevel: lesson.learning.supportLevel,
      quizOptionMode: lesson.learning.quizOptionMode,
      writingMode: lesson.learning.writingMode,
      lessonRole: lesson.learning.lessonRole,
      coreRequired: lesson.learning.coreRequired,
      requiredForProgress: lesson.learning.requiredForProgress,
      certificateEligible: lesson.learning.certificateEligible,
      branchType: lesson.learning.branchType,
      lessonWeight: lesson.learning.lessonWeight,
      weightReason: lesson.learning.weightReason,
      checkpointType: lesson.learning.checkpointType,
      repairFocus: lesson.learning.repairFocus,
      longActivityTypes: lesson.learning.longActivityTypes,
      manifestSource: lesson.learning.manifestSource,
      programLevelNameKey: lesson.learning.programLevelNameKey,
      programLevelDescriptionKey: lesson.learning.programLevelDescriptionKey,
      unitOrder: lesson.learning.unitOrder,
      sequenceOrder: lesson.learning.sequenceOrder,
      skillFocus: lesson.learning.skillFocus,
      prerequisiteConcepts: lesson.learning.prerequisiteConcepts,
      teachesConcepts: lesson.learning.teachesConcepts,
      reviewsConcepts: lesson.learning.reviewsConcepts,
    };
  });

  lessonsJson.sort(sortByLearningArchitecture);

  return lessonsJson;
}

function inferCourseOrderingMetadata(lesson = {}) {
  const curriculumKey = String(lesson.curriculumKey || '').trim();
  const title = String(lesson.title || '').trim();
  const difficulty = String(lesson.difficulty || '').trim().toLowerCase();
  const lessonType = String(lesson.lessonType || '').trim().toLowerCase();

  const matchPosition = (pattern) => {
    const match = curriculumKey.match(pattern);
    return match ? Number(match[1]) : null;
  };

  const fallbackPosition = () => {
    if (/foundation|입문/i.test(title)) return 0;
    const reviewMatch = title.match(/(?:review|복습)\s*(\d+)/i);
    if (reviewMatch) return Number(reviewMatch[1]) * 3 + 0.5;
    const unitMatch = title.match(/(?:unit|unidad|unité|unidade|einheit|unità|ünite|lesson|lektion|lección|leçon|урок|단원)\s*(\d+)/i);
    if (unitMatch) return Number(unitMatch[1]);
    const koreanUnitMatch = title.match(/(\d+)\s*과/);
    if (koreanUnitMatch) return Number(koreanUnitMatch[1]);
    const clusterMatch = title.match(/cluster\s*(\d+)/i);
    if (clusterMatch) return Number(clusterMatch[1]);
    return 999;
  };

  if (curriculumKey === 'level1Foundation' || lessonType === 'foundation') {
    return { level: 1, track: 'foundation', position: 0, kind: 'foundation' };
  }

  const level1UnitPosition = matchPosition(/^level1Unit(\d+)/i);
  if (level1UnitPosition != null) {
    return {
      level: 1,
      track: level1UnitPosition <= 9 ? 'survival' : 'everyday',
      position: level1UnitPosition,
      kind: 'unit',
    };
  }

  const adultPosition = matchPosition(/^level2AdultUnit(\d+)/i);
  if (adultPosition != null || lessonType === 'workplace') {
    return { level: 3, track: 'professional', position: adultPosition ?? fallbackPosition(), kind: 'unit' };
  }

  const reviewPosition = matchPosition(/^level2Review(\d+)/i);
  if (reviewPosition != null || lessonType === 'review') {
    return { level: 2, track: 'bridge', position: reviewPosition != null ? reviewPosition * 3 + 0.5 : fallbackPosition(), kind: 'review' };
  }

  const level2UnitPosition = matchPosition(/^level2Unit(\d+)/i);
  if (level2UnitPosition != null || difficulty === 'intermediate') {
    return { level: 2, track: 'thematic', position: level2UnitPosition ?? fallbackPosition(), kind: 'unit' };
  }

  const grammarPosition = matchPosition(/^level3Cluster(\d+)/i);
  if (grammarPosition != null || lessonType === 'grammar' || difficulty === 'advanced') {
    return { level: 4, track: 'advanced', position: grammarPosition ?? fallbackPosition(), kind: 'unit' };
  }

  if (difficulty === 'beginner') {
    return { level: 1, track: 'everyday', position: fallbackPosition(), kind: 'unit' };
  }

  return { level: 9, track: 'other', position: fallbackPosition(), kind: 'unit' };
}

async function sortLessonsByCourseOrder(lessons, targetLang) {
  if (!Array.isArray(lessons) || lessons.length === 0 || !targetLang) return lessons;

  const orderedJson = lessons.map((lesson) => lesson.toJSON());
  await addCourseOrderingMetadata(orderedJson, targetLang);
  const rank = new Map(orderedJson.map((lesson, index) => [String(lesson._id), index]));

  return [...lessons].sort((a, b) => (
    (rank.get(String(a._id)) ?? Number.MAX_SAFE_INTEGER)
    - (rank.get(String(b._id)) ?? Number.MAX_SAFE_INTEGER)
  ));
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

function slugForLearningId(value) {
  const text = String(value || '').trim().toLowerCase();
  const ascii = text
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 72);
  if (ascii) return ascii;
  return text ? `u_${Buffer.from(text, 'utf8').toString('hex').slice(0, 72)}` : 'item';
}

function uniqueLearningLevels(values) {
  return Array.from(new Set(values.map(Number).filter(level => [1, 2, 3, 4].includes(level)))).sort((a, b) => a - b);
}

function lessonItemTargetText(item = {}) {
  return String(item.targetText || item.korean || item.exampleTarget || item.example || '').trim();
}

function lessonItemNativeText(item = {}) {
  return String(item.nativeText || item.english || item.exampleNative || item.exampleEnglish || '').trim();
}

function classLessonItemIdentity(item = {}, lesson = {}, index = 0) {
  const level = Number(item.learningLevel || lesson.learningLevel || 2);
  const targetLang = normalizeLang(lesson.targetLang || item.targetLang || 'ko', 'ko');
  const targetText = lessonItemTargetText(item) || `${lesson.curriculumKey || 'lesson'}-${index}`;
  const nativeText = lessonItemNativeText(item) || targetText;
  const conceptId = item.conceptId || `lexeme.${targetLang}.${slugForLearningId(targetText)}`;
  const senseId = item.senseId || `${conceptId}.sense.${slugForLearningId(nativeText)}`;
  const activeLevels = uniqueLearningLevels([...(Array.isArray(item.activeLevels) ? item.activeLevels : []), level]);
  const sourceClassLessonKey = item.sourceClassLessonKey || lesson.curriculumKey || '';
  const levelUses = {
    ...(item.levelUses && typeof item.levelUses === 'object' && !Array.isArray(item.levelUses) ? item.levelUses : {}),
    [level]: {
      meaning: nativeText,
      objective: item.objective || lesson.title || '',
      sourceClassLessonKey,
      levelTrack: item.levelTrack || lesson.levelTrack || '',
      lessonRole: item.lessonRole || lesson.lessonRole || '',
      branchType: item.branchType || lesson.branchType || '',
      lessonWeight: item.lessonWeight || lesson.lessonWeight,
      checkpointType: item.checkpointType || lesson.checkpointType || '',
      repairFocus: item.repairFocus || lesson.repairFocus || [],
      longActivityTypes: item.longActivityTypes || lesson.longActivityTypes || [],
      manifestSource: item.manifestSource || lesson.manifestSource || '',
      programLevelNameKey: item.programLevelNameKey || lesson.programLevelNameKey || '',
      programLevelDescriptionKey: item.programLevelDescriptionKey || lesson.programLevelDescriptionKey || '',
      unitOrder: item.unitOrder || lesson.unitOrder,
      sequenceOrder: item.sequenceOrder || lesson.sequenceOrder,
      skillFocus: item.skillFocus || lesson.skillFocus || [],
      prerequisiteConcepts: item.prerequisiteConcepts || lesson.prerequisiteConcepts || [],
      teachesConcepts: item.teachesConcepts || lesson.teachesConcepts || [],
      reviewsConcepts: item.reviewsConcepts || lesson.reviewsConcepts || [],
    },
  };

  return {
    conceptId,
    senseId,
    firstIntroducedLevel: Number(item.firstIntroducedLevel || activeLevels[0] || level),
    activeLevels,
    sourceClassLessonKey,
    sourceClassLessonKeys: Array.from(new Set([
      ...(Array.isArray(item.sourceClassLessonKeys) ? item.sourceClassLessonKeys : []),
      sourceClassLessonKey,
    ].filter(Boolean))),
    levelUses,
    lessonRole: item.lessonRole || lesson.lessonRole || '',
    branchType: item.branchType || lesson.branchType || '',
    lessonWeight: item.lessonWeight || lesson.lessonWeight,
    checkpointType: item.checkpointType || lesson.checkpointType || '',
    repairFocus: item.repairFocus || lesson.repairFocus || [],
    longActivityTypes: item.longActivityTypes || lesson.longActivityTypes || [],
    manifestSource: item.manifestSource || lesson.manifestSource || '',
    programLevelNameKey: item.programLevelNameKey || lesson.programLevelNameKey || '',
    programLevelDescriptionKey: item.programLevelDescriptionKey || lesson.programLevelDescriptionKey || '',
    unitOrder: item.unitOrder || lesson.unitOrder,
    sequenceOrder: item.sequenceOrder || lesson.sequenceOrder,
    skillFocus: item.skillFocus || lesson.skillFocus || [],
    prerequisiteConcepts: item.prerequisiteConcepts || lesson.prerequisiteConcepts || [],
    teachesConcepts: item.teachesConcepts || lesson.teachesConcepts || [],
    reviewsConcepts: item.reviewsConcepts || lesson.reviewsConcepts || [],
  };
}

function classLessonSummary(lesson = {}) {
  applyLearningArchitecture(lesson, lesson.course);
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
    learning: lesson.learning,
    learningLevel: lesson.learningLevel,
    levelTrack: lesson.levelTrack,
    supportLevel: lesson.supportLevel,
    quizOptionMode: lesson.quizOptionMode,
    writingMode: lesson.writingMode,
    skillStrands: lesson.skillStrands,
    lessonRole: lesson.lessonRole,
    coreRequired: lesson.coreRequired,
    requiredForProgress: lesson.requiredForProgress,
    certificateEligible: lesson.certificateEligible,
    branchType: lesson.branchType,
    lessonWeight: lesson.lessonWeight,
    weightReason: lesson.weightReason,
    checkpointType: lesson.checkpointType,
    repairFocus: lesson.repairFocus,
    longActivityTypes: lesson.longActivityTypes,
    manifestSource: lesson.manifestSource,
    programLevelNameKey: lesson.programLevelNameKey,
    programLevelDescriptionKey: lesson.programLevelDescriptionKey,
    unitOrder: lesson.unitOrder,
    sequenceOrder: lesson.sequenceOrder,
    skillFocus: lesson.skillFocus,
    prerequisiteConcepts: lesson.prerequisiteConcepts,
    teachesConcepts: lesson.teachesConcepts,
    reviewsConcepts: lesson.reviewsConcepts,
    stats,
  };
}

function classLessonShell(lesson = {}) {
  applyLearningArchitecture(lesson, lesson.course);
  const stats = classLessonStats(lesson.content);
  return {
    ...lesson,
    content: undefined,
    contentTotal: stats.total,
    contentStats: stats,
    contentIndex: (Array.isArray(lesson.content) ? lesson.content : []).map((item, index) => ({
      ...classLessonItemIdentity(item, lesson, index),
      index,
      type: item?.type || '',
      activityIds: Array.isArray(item?.activityIds) ? item.activityIds : [],
      learningLevel: item?.learningLevel || lesson.learningLevel,
      levelTrack: item?.levelTrack || lesson.levelTrack,
      supportLevel: item?.supportLevel || lesson.supportLevel,
      quizOptionMode: item?.quizOptionMode || lesson.quizOptionMode,
      writingMode: item?.writingMode || lesson.writingMode,
      skillStrands: Array.isArray(item?.skillStrands) ? item.skillStrands : lesson.skillStrands,
      lessonRole: item?.lessonRole || lesson.lessonRole,
      branchType: item?.branchType || lesson.branchType,
      lessonWeight: item?.lessonWeight || lesson.lessonWeight,
      checkpointType: item?.checkpointType || lesson.checkpointType,
      repairFocus: Array.isArray(item?.repairFocus) && item.repairFocus.length ? item.repairFocus : lesson.repairFocus,
      longActivityTypes: Array.isArray(item?.longActivityTypes) && item.longActivityTypes.length ? item.longActivityTypes : lesson.longActivityTypes,
      manifestSource: item?.manifestSource || lesson.manifestSource,
      programLevelNameKey: item?.programLevelNameKey || lesson.programLevelNameKey,
      programLevelDescriptionKey: item?.programLevelDescriptionKey || lesson.programLevelDescriptionKey,
      unitOrder: item?.unitOrder || lesson.unitOrder,
      sequenceOrder: item?.sequenceOrder || lesson.sequenceOrder,
      skillFocus: Array.isArray(item?.skillFocus) && item.skillFocus.length ? item.skillFocus : lesson.skillFocus,
      prerequisiteConcepts: Array.isArray(item?.prerequisiteConcepts) ? item.prerequisiteConcepts : lesson.prerequisiteConcepts,
      teachesConcepts: Array.isArray(item?.teachesConcepts) ? item.teachesConcepts : lesson.teachesConcepts,
      reviewsConcepts: Array.isArray(item?.reviewsConcepts) ? item.reviewsConcepts : lesson.reviewsConcepts,
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
  applyLearningArchitecture(lesson, lesson.course);
  const items = Array.isArray(lesson.content) ? lesson.content : [];
  const total = items.length;
  const safeLimit = Math.max(1, Math.min(Number(limit) || 8, 24));
  const start = clampWindowStart(Number(center) || 0, total, safeLimit);
  const end = Math.min(total, start + safeLimit);
  return {
    items: items.slice(start, end).map((item, offset) => ({
      ...item,
      ...classLessonItemIdentity(item, lesson, start + offset),
      learningLevel: item?.learningLevel || lesson.learningLevel,
      levelTrack: item?.levelTrack || lesson.levelTrack,
      supportLevel: item?.supportLevel || lesson.supportLevel,
      quizOptionMode: item?.quizOptionMode || lesson.quizOptionMode,
      writingMode: item?.writingMode || lesson.writingMode,
      skillStrands: Array.isArray(item?.skillStrands) && item.skillStrands.length ? item.skillStrands : lesson.skillStrands,
      lessonRole: item?.lessonRole || lesson.lessonRole,
      branchType: item?.branchType || lesson.branchType,
      lessonWeight: item?.lessonWeight || lesson.lessonWeight,
      checkpointType: item?.checkpointType || lesson.checkpointType,
      repairFocus: Array.isArray(item?.repairFocus) && item.repairFocus.length ? item.repairFocus : lesson.repairFocus,
      longActivityTypes: Array.isArray(item?.longActivityTypes) && item.longActivityTypes.length ? item.longActivityTypes : lesson.longActivityTypes,
      manifestSource: item?.manifestSource || lesson.manifestSource,
      programLevelNameKey: item?.programLevelNameKey || lesson.programLevelNameKey,
      programLevelDescriptionKey: item?.programLevelDescriptionKey || lesson.programLevelDescriptionKey,
      unitOrder: item?.unitOrder || lesson.unitOrder,
      sequenceOrder: item?.sequenceOrder || lesson.sequenceOrder,
      skillFocus: Array.isArray(item?.skillFocus) && item.skillFocus.length ? item.skillFocus : lesson.skillFocus,
      prerequisiteConcepts: Array.isArray(item?.prerequisiteConcepts) ? item.prerequisiteConcepts : lesson.prerequisiteConcepts,
      teachesConcepts: Array.isArray(item?.teachesConcepts) ? item.teachesConcepts : lesson.teachesConcepts,
      reviewsConcepts: Array.isArray(item?.reviewsConcepts) ? item.reviewsConcepts : lesson.reviewsConcepts,
      sourceClassLessonKey: item?.sourceClassLessonKey || lesson.curriculumKey,
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
  applyLearningArchitecture(lessonObj, lessonObj.course);
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
  const lessons = await sortLessonsByCourseOrder(await Lesson.find({
    track: CLASS_LESSON_TRACK,
    targetLang: normalizedTargetLang,
    curriculumStatus: { $ne: 'archived' },
  }), normalizedTargetLang);

  if (!lessons.length) return;

  if (normalizedNativeLang !== 'en') {
    const Translation = require('../models/Translation');
    try {
      const cachedTitles = await Translation.find({
        lessonId: { $in: lessons.map((lesson) => lesson._id) },
        lang: normalizedNativeLang,
        title: { $ne: '' },
      }).select('lessonId title').lean();
      const lessonTitleById = new Map(lessons.map((lesson) => [String(lesson._id), lesson.title]));
      const cachedTitleIds = new Set(cachedTitles
        .filter((row) => preservesTargetScriptSegments(
          lessonTitleById.get(String(row.lessonId)) || '',
          row.title,
          normalizedTargetLang,
        ))
        .map((row) => String(row.lessonId)));
      const uncached = lessons.filter((lesson) => lesson.title && !cachedTitleIds.has(String(lesson._id)));
      const translatedTitles = await batchTranslatePreservingTargetScript(
        uncached.map((lesson) => lesson.title),
        'en',
        normalizedNativeLang,
        normalizedTargetLang,
      );
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
      filter.curriculumStatus = { $ne: 'archived' };
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
      return sendClientError(res, 400, 'LESSONS_LIST_TARGET_LANG_REQUIRED', 'targetLang query parameter is required');
    }
    const normalizedTargetLang = normalizeLang(targetLang);
    const normalizedNativeLang = normalizeLang(nativeLang || req.user?.nativeLanguage || 'en');
    filter.targetLang = normalizedTargetLang;

    const summaryView = contentKind === 'classLesson' && req.query.view === 'summary';
    const lessonQuery = Lesson.find(filter);
    if (summaryView) {
      lessonQuery.select('_id title category difficulty track lessonType targetLang nativeLang curriculumKey course content.type');
    }
    const lessons = await lessonQuery;
    const lessonsJson = lessons.map(l => l.toJSON());

    if (contentKind === 'classLesson') {
      // Preserve source-title ordering before title translation rewrites the
      // visible label into the learner's native language. Some locales cannot
      // be parsed back into unit numbers reliably after that transformation.
      await addCourseOrderingMetadata(lessonsJson, normalizedTargetLang);
    }

    // Translate lesson titles for non-English native speakers
    if (normalizedNativeLang !== 'en') {
      const Translation = require('../models/Translation');
      const lessonIds = lessonsJson.map(l => l._id);
      const translations = await Translation.find({
        lessonId: { $in: lessonIds },
        lang: normalizedNativeLang,
      }).select('lessonId title').lean();

      const titleMap = {};
      const sourceTitleById = new Map(lessonsJson.map((lesson) => [String(lesson._id), lesson.title]));
      translations.forEach(t => {
        const sourceTitle = sourceTitleById.get(t.lessonId.toString()) || '';
        if (t.title && preservesTargetScriptSegments(sourceTitle, t.title, normalizedTargetLang)) {
          titleMap[t.lessonId.toString()] = t.title;
        }
      });

      // Find lessons without cached title translations
      const uncached = lessonsJson.filter(l => !titleMap[l._id.toString()] && l.title);
      if (uncached.length > 0) {
        const titles = uncached.map(l => l.title);
        const results = await batchTranslatePreservingTargetScript(titles, 'en', normalizedNativeLang, normalizedTargetLang);
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
    }

    if (summaryView) {
      return res.json(lessonsJson.map(classLessonSummary));
    }

    res.json(lessonsJson);
  } catch (error) {
    return sendServerError(req, res, error, 'LESSONS_LIST_FAILED');
  }
});

// Fire-and-forget pair warming: prepare the first likely class lessons after a
// learner picks a language pair, so first entry into class feels immediate.
router.post('/prepare-pair', optionalAuth, async (req, res) => {
  try {
    if (routeContentKind(req) !== 'classLesson') {
      return sendClientError(res, 404, 'LESSONS_PREPARE_PAIR_NOT_FOUND', 'Class lesson pair preparation not found');
    }
    const targetLang = normalizeLang(req.body?.targetLang || req.query.targetLang || req.user?.targetLanguage || 'ko');
    const nativeLang = normalizeLang(req.body?.nativeLang || req.query.nativeLang || req.user?.nativeLanguage || 'en');
    if (!targetLang || !nativeLang || targetLang === nativeLang) {
      return sendClientError(res, 400, 'LESSONS_PREPARE_PAIR_INVALID_LANGS', 'A distinct nativeLang and targetLang are required');
    }

    setImmediate(() => {
      warmClassLessonPair(targetLang, nativeLang, req.userId).catch((error) => {
        console.error(`Prepare class lesson pair failed [${nativeLang}->${targetLang}]`, error.message || error);
      });
    });

    res.status(202).json({ queued: true, targetLang, nativeLang });
  } catch (error) {
    return sendServerError(req, res, error, 'LESSONS_PREPARE_PAIR_FAILED');
  }
});

// Resume-aware initial payload. The shell contains stable lesson metadata plus
// a compact item index; detailed content is only the nearby window needed first.
router.get('/:id/bootstrap', optionalAuth, async (req, res) => {
  try {
    if (routeContentKind(req) !== 'classLesson') {
      return sendClientError(res, 404, 'LESSONS_BOOTSTRAP_NOT_CLASS_LESSON', 'Class lesson bootstrap not found');
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendClientError(res, 404, 'LESSONS_BOOTSTRAP_INVALID_ID', 'Class lesson not found');
    }

    const lesson = await Lesson.findById(req.params.id);
    if (!lesson || lesson.track !== CLASS_LESSON_TRACK) {
      return sendClientError(res, 404, 'LESSONS_BOOTSTRAP_NOT_FOUND', 'Class lesson not found');
    }

    const nativeLanguage = normalizeLang(req.query.nativeLang, req.user?.nativeLanguage || 'en');
    const targetLanguage = normalizeLang(req.query.targetLang, req.user?.targetLanguage || lesson.targetLang || 'ko');
    if (normalizeLang(lesson.targetLang || 'ko') !== targetLanguage) {
      return sendClientError(res, 404, 'LESSONS_BOOTSTRAP_LANGUAGE_PAIR_MISMATCH', 'Class lesson not found for this language pair');
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
    return sendServerError(req, res, error, 'LESSONS_BOOTSTRAP_FAILED', { metadata: { lessonId: req.params.id } });
  }
});

router.get('/:id/items', optionalAuth, async (req, res) => {
  try {
    if (routeContentKind(req) !== 'classLesson') {
      return sendClientError(res, 404, 'LESSONS_ITEMS_NOT_CLASS_LESSON', 'Class lesson items not found');
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendClientError(res, 404, 'LESSONS_ITEMS_INVALID_ID', 'Class lesson not found');
    }

    const lesson = await Lesson.findById(req.params.id);
    if (!lesson || lesson.track !== CLASS_LESSON_TRACK) {
      return sendClientError(res, 404, 'LESSONS_ITEMS_NOT_FOUND', 'Class lesson not found');
    }

    const nativeLanguage = normalizeLang(req.query.nativeLang, req.user?.nativeLanguage || 'en');
    const targetLanguage = normalizeLang(req.query.targetLang, req.user?.targetLanguage || lesson.targetLang || 'ko');
    if (normalizeLang(lesson.targetLang || 'ko') !== targetLanguage) {
      return sendClientError(res, 404, 'LESSONS_ITEMS_LANGUAGE_PAIR_MISMATCH', 'Class lesson not found for this language pair');
    }

    const center = sanitizeIndex(req.query.center, 0);
    const windowSize = Math.max(4, Math.min(24, sanitizeIndex(req.query.windowSize, 8) || 8));
    const lessonObj = await localizeLessonForPair(lesson, 'classLesson', nativeLanguage);
    res.json(classLessonWindow(lessonObj, center, windowSize));
  } catch (error) {
    return sendServerError(req, res, error, 'LESSONS_ITEMS_FAILED', { metadata: { lessonId: req.params.id } });
  }
});

// Get single lesson (public — guests and authenticated users)
// Pass ?nativeLang=de to get native-side fields translated to German, etc.
// Get synced class lesson progress for Pro/Ultra/admin users.
router.get('/:id/progress', optionalAuth, async (req, res) => {
  try {
    if (routeContentKind(req) !== 'classLesson') {
      return sendClientError(res, 404, 'LESSONS_GET_PROGRESS_NOT_CLASS_LESSON', 'Class lesson progress not found');
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendClientError(res, 404, 'LESSONS_GET_PROGRESS_INVALID_ID', 'Class lesson not found');
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
    return sendServerError(req, res, error, 'LESSONS_GET_PROGRESS_FAILED', { metadata: { lessonId: req.params.id } });
  }
});

// Save synced class lesson progress for Pro/Ultra/admin users.
router.put('/:id/progress', optionalAuth, async (req, res) => {
  try {
    if (routeContentKind(req) !== 'classLesson') {
      return sendClientError(res, 404, 'LESSONS_SAVE_PROGRESS_NOT_CLASS_LESSON', 'Class lesson progress not found');
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendClientError(res, 404, 'LESSONS_SAVE_PROGRESS_INVALID_ID', 'Class lesson not found');
    }

    const nativeLanguage = normalizeLang(req.body?.nativeLanguage || req.query.nativeLang, req.user?.nativeLanguage || 'en');
    const targetLanguage = normalizeLang(req.body?.targetLanguage || req.query.targetLang, req.user?.targetLanguage || 'ko');
    const canSync = canSyncClassProgress(req);
    if (!canSync) {
      return res.json({ canSync: false, progress: null });
    }

    const lesson = await Lesson.findById(req.params.id).select('track targetLang').lean();
    if (!lesson || lesson.track !== CLASS_LESSON_TRACK || lesson.targetLang !== targetLanguage) {
      return sendClientError(res, 404, 'LESSONS_SAVE_PROGRESS_NOT_FOUND', 'Class lesson not found');
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
    return sendServerError(req, res, error, 'LESSONS_SAVE_PROGRESS_FAILED', { metadata: { lessonId: req.params.id } });
  }
});

router.get('/:id', optionalAuth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendClientError(res, 404, 'LESSONS_GET_INVALID_ID', `${notFoundLabel(req)} not found`);
    }
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return sendClientError(res, 404, 'LESSONS_GET_NOT_FOUND', `${notFoundLabel(req)} not found`);
    }

    const contentKind = routeContentKind(req);
    if (contentKind === 'classLesson' && lesson.track !== CLASS_LESSON_TRACK) {
      return sendClientError(res, 404, 'LESSONS_GET_CLASS_LESSON_NOT_FOUND', 'Class lesson not found');
    }
    if (contentKind === 'quiz' && lesson.track === CLASS_LESSON_TRACK) {
      return sendClientError(res, 404, 'LESSONS_GET_QUIZ_NOT_FOUND', 'Quiz not found');
    }

    const { nativeLang, targetLang: requestedTargetLang } = req.query;
    const targetLang = normalizeLang(lesson.targetLang || 'ko');
    const normalizedNativeLang = normalizeLang(nativeLang || req.user?.nativeLanguage || 'en');
    const normalizedRequestedTargetLang = requestedTargetLang ? normalizeLang(requestedTargetLang) : '';
    if (normalizedRequestedTargetLang && targetLang !== normalizedRequestedTargetLang) {
      return sendClientError(res, 404, 'LESSONS_GET_LANGUAGE_PAIR_MISMATCH', `${notFoundLabel(req)} not found for this language pair`);
    }
    const lessonObj = await localizeLessonForPair(lesson, contentKind, normalizedNativeLang);
    res.json(lessonObj);
  } catch (error) {
    return sendServerError(req, res, error, 'LESSONS_GET_FAILED', { metadata: { lessonId: req.params.id } });
  }
});

// Create lesson (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, category, difficulty, content, targetLang, nativeLang } = req.body;

    if (!title || !category || !content || !targetLang) {
      return sendClientError(res, 400, 'LESSONS_CREATE_MISSING_FIELDS', 'Title, category, content, and targetLang are required');
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
    return sendServerError(req, res, error, 'LESSONS_CREATE_FAILED');
  }
});

module.exports = router;
