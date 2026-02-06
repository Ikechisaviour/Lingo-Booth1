const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');

// Get flashcards for user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const flashcards = await Flashcard.find({ userId });
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create flashcard
router.post('/', async (req, res) => {
  try {
    const { userId, korean, english, romanization, audioUrl, category } = req.body;

    const flashcard = new Flashcard({
      userId,
      korean,
      english,
      romanization,
      audioUrl,
      category,
    });

    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update flashcard (mark correct/incorrect)
router.put('/:id', async (req, res) => {
  try {
    const { isCorrect } = req.body;
    const flashcard = await Flashcard.findById(req.params.id);

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    if (isCorrect) {
      flashcard.correctCount += 1;
      flashcard.masteryLevel = Math.min(flashcard.masteryLevel + 1, 5);
    } else {
      flashcard.incorrectCount += 1;
      flashcard.masteryLevel = Math.max(flashcard.masteryLevel - 1, 0);
    }

    flashcard.lastReviewedAt = new Date();
    await flashcard.save();

    res.json(flashcard);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete flashcard
router.delete('/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findByIdAndDelete(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    res.json({ message: 'Flashcard deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
