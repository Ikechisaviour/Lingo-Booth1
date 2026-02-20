const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');
const flashcardData = require('../flashcardData');
const { verifyToken, isOwner } = require('../middleware/auth');

// --- Public routes (no auth required) ---

// Guest flashcards — returns default vocabulary set (read-only)
router.get('/guest', (req, res) => {
  const guestCards = flashcardData.map((card, i) => ({
    _id: `guest-${i}`,
    korean: card.korean,
    english: card.english,
    romanization: card.romanization,
    category: card.category,
    masteryLevel: 3,
    correctCount: 0,
    incorrectCount: 0,
  }));
  res.json(guestCards);
});

// --- Authenticated routes ---
router.use(verifyToken);

// Get flashcards for user (only own flashcards or admin)
router.get('/user/:userId', isOwner('userId'), async (req, res) => {
  try {
    const { userId } = req.params;
    const flashcards = await Flashcard.find({ userId });
    res.json(flashcards);
  } catch (error) {
    console.error('Get flashcards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create flashcard (uses authenticated user's ID)
router.post('/', async (req, res) => {
  try {
    const { korean, english, romanization, audioUrl, category } = req.body;

    if (!korean || !english) {
      return res.status(400).json({ message: 'Korean and English fields are required' });
    }

    const flashcard = new Flashcard({
      userId: req.userId,
      korean,
      english,
      romanization,
      audioUrl,
      category,
    });

    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (error) {
    console.error('Create flashcard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update flashcard (mark correct/incorrect) - verify ownership
router.put('/:id', async (req, res) => {
  try {
    const { isCorrect } = req.body;
    const flashcard = await Flashcard.findById(req.params.id);

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    // Verify ownership
    if (flashcard.userId.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (isCorrect) {
      flashcard.correctCount += 1;
      flashcard.masteryLevel = Math.min(flashcard.masteryLevel + 1, 5);
    } else {
      flashcard.incorrectCount += 1;
      flashcard.masteryLevel = Math.max(flashcard.masteryLevel - 1, 1);
    }

    flashcard.lastReviewedAt = new Date();
    await flashcard.save();

    res.json(flashcard);
  } catch (error) {
    console.error('Update flashcard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete flashcard - verify ownership
router.delete('/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    // Verify ownership
    if (flashcard.userId.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Flashcard.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flashcard deleted' });
  } catch (error) {
    console.error('Delete flashcard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
