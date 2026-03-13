const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const { verifyToken, optionalAuth, isAdmin } = require('../middleware/auth');
const { getOrCreateTranslation, applyTranslation } = require('../utils/translationService');

const VALID_CATEGORIES = ['daily-life', 'business', 'travel', 'greetings', 'food', 'shopping', 'healthcare'];
const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced', 'sentences'];

// Get all lessons (public — guests and authenticated users)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { category, difficulty, targetLang } = req.query;
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
    res.json(lessons);
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

    // If nativeLang is not English, translate native-side fields
    if (nativeLang && nativeLang !== 'en') {
      try {
        const translation = await getOrCreateTranslation(lesson, nativeLang);
        applyTranslation(lessonObj, translation);
      } catch (err) {
        console.error('Translation overlay failed, serving English fallback:', err.message);
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
