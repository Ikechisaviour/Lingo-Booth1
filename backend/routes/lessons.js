const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const { verifyToken, optionalAuth, isAdmin } = require('../middleware/auth');
const { getOrCreateTranslation, applyTranslation, batchTranslateRaw } = require('../utils/translationService');

const VALID_CATEGORIES = ['daily-life', 'business', 'travel', 'greetings', 'food', 'shopping', 'healthcare'];
const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced', 'sentences'];

// Get all lessons (public — guests and authenticated users)
// Pass ?nativeLang=hi to get translated titles
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { category, difficulty, targetLang, nativeLang } = req.query;
    let filter = {};

    if (category && VALID_CATEGORIES.includes(category)) {
      filter.category = category;
    }
    if (difficulty && VALID_DIFFICULTIES.includes(difficulty)) {
      filter.difficulty = difficulty;
    }
    // Always filter by target language (default to 'ko' for backward compatibility)
    filter.targetLang = targetLang || 'ko';

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

    res.json(lessonsJson);
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single lesson (public — guests and authenticated users)
// Pass ?nativeLang=de to get native-side fields translated to German, etc.
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const { nativeLang } = req.query;
    const lessonObj = lesson.toJSON();
    const targetLang = lesson.targetLang || 'ko';

    // Snapshot original nativeText values (English seed data) before translation overlay
    const originalNativeTexts = nativeLang && nativeLang !== 'en' && lessonObj.content
      ? lessonObj.content.map(c => c.nativeText || '')
      : null;

    // Translate native-side fields and/or generate romanization
    try {
      const translation = await getOrCreateTranslation(lesson, nativeLang || 'en', targetLang);
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
