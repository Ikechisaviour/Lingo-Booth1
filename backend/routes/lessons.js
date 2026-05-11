const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const ClassLessonProgress = require('../models/ClassLessonProgress');
const { verifyToken, optionalAuth, isAdmin } = require('../middleware/auth');
const { getAiEntitlements } = require('../utils/subscription');
const { getOrCreateTranslation, applyTranslation, batchTranslateRaw } = require('../utils/translationService');
const { normalizeLessonForLanguagePair } = require('../utils/languageConcepts');
const { enrichLessonWithPronunciation } = require('../utils/pronunciationService');

const VALID_CATEGORIES = ['daily-life', 'business', 'travel', 'greetings', 'food', 'shopping', 'healthcare', 'career'];
const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced', 'sentences'];
const VALID_TRACKS = ['textbook', 'practice'];
const CLASS_LESSON_TRACK = 'textbook';

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
  return String(code || fallback).trim().toLowerCase().slice(0, 20) || fallback;
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
    filter.targetLang = targetLang;

    const lessons = await Lesson.find(filter);
    const lessonsJson = lessons.map(l => l.toJSON());

    // Translate lesson titles for non-English native speakers
    if (nativeLang && nativeLang !== 'en') {
      const Translation = require('../models/Translation');
      const { batchTranslateRaw } = require('../utils/translationService');
      const lessonIds = lessonsJson.map(l => l._id);
      const translations = await Translation.find({
        lessonId: { $in: lessonIds },
        lang: nativeLang,
      }).select('lessonId title').lean();

      const titleMap = {};
      translations.forEach(t => {
        if (t.title) titleMap[t.lessonId.toString()] = t.title;
      });

      // Find lessons without cached title translations
      const uncached = lessonsJson.filter(l => !titleMap[l._id.toString()] && l.title);
      if (uncached.length > 0) {
        const titles = uncached.map(l => l.title);
        const results = await batchTranslateRaw(titles, 'en', nativeLang);
        for (let i = 0; i < uncached.length; i++) {
          const translated = results[i]?.text || uncached[i].title;
          titleMap[uncached[i]._id.toString()] = translated;
          // Cache the translated title for future requests
          Translation.updateOne(
            { lessonId: uncached[i]._id, lang: nativeLang },
            { $set: { title: translated } },
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
      await addCourseOrderingMetadata(lessonsJson, targetLang);
    }

    res.json(lessonsJson);
  } catch (error) {
    console.error('Get lessons error:', error);
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

    const lesson = await Lesson.findById(req.params.id).select('track').lean();
    if (!lesson || lesson.track !== CLASS_LESSON_TRACK) {
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

    const { nativeLang } = req.query;
    const lessonObj = lesson.toJSON();
    const targetLang = lesson.targetLang || 'ko';
    if (contentKind !== 'classLesson') {
      normalizeLessonForLanguagePair(lessonObj, targetLang, nativeLang || 'en');
    }

    // Snapshot original nativeText values (English seed data) before translation overlay
    const originalNativeTexts = nativeLang && nativeLang !== 'en' && lessonObj.content
      ? lessonObj.content.map(c => c.nativeText || '')
      : null;

    // Translate native-side fields and/or generate romanization
    try {
      const translationNativeLang = contentKind === 'classLesson' ? (nativeLang || 'en') : 'en';
      const translation = await getOrCreateTranslation(lesson, translationNativeLang, targetLang);
      applyTranslation(lessonObj, translation);
    } catch (err) {
      console.error('Translation/romanization overlay failed:', err.message);
    }

    // If nativeLang !== 'en', translate any nativeText that wasn't changed by applyTranslation
    // (still the English seed value). On failure, clear nativeText and mark as pending.
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
          const results = await batchTranslateRaw(missingTexts, 'en', nativeLang);
          for (let k = 0; k < results.length; k++) {
            const translated = results[k]?.text;
            if (translated) {
              lessonObj.content[missingIndices[k]].nativeText = translated;
            } else {
              // Translation returned empty — mark pending, clear English
              lessonObj.content[missingIndices[k]].nativeText = '';
              lessonObj.content[missingIndices[k]]._translationPending = true;
            }
          }
        } catch (err) {
          // Translation API failed — mark all untranslated items as pending
          for (const idx of missingIndices) {
            lessonObj.content[idx].nativeText = '';
            lessonObj.content[idx]._translationPending = true;
          }
          console.error('Lesson nativeText translation failed:', err.message);
        }
      }
    }

    await enrichLessonWithPronunciation(lessonObj, targetLang, nativeLang || 'en');

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
