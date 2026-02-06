const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');

// Get all lessons
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const lessons = await Lesson.find(filter);
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single lesson
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create lesson (admin only)
router.post('/', async (req, res) => {
  try {
    const { title, category, difficulty, content } = req.body;

    const lesson = new Lesson({
      title,
      category,
      difficulty,
      content,
    });

    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
