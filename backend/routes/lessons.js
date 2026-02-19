const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const { verifyToken, optionalAuth, isAdmin } = require('../middleware/auth');

const VALID_CATEGORIES = ['daily-life', 'business', 'travel', 'greetings', 'food', 'shopping', 'healthcare'];
const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced', 'sentences'];

// Get all lessons (public — guests and authenticated users)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let filter = {};

    if (category && VALID_CATEGORIES.includes(category)) {
      filter.category = category;
    }
    if (difficulty && VALID_DIFFICULTIES.includes(difficulty)) {
      filter.difficulty = difficulty;
    }

    const lessons = await Lesson.find(filter);
    res.json(lessons);
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single lesson (public — guests and authenticated users)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create lesson (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, category, difficulty, content } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({ message: 'Title, category, and content are required' });
    }

    const lesson = new Lesson({
      title,
      category,
      difficulty,
      content,
    });

    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
