const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');
const UserCardPreference = require('../models/UserCardPreference');
const flashcardData = require('../flashcardData');
const { verifyToken, isOwner } = require('../middleware/auth');

// Normalize category: handles old string format and new array format
const normalizeCategory = (cat) => {
  if (Array.isArray(cat)) return cat.length > 0 ? cat : ['uncategorized'];
  if (typeof cat === 'string' && cat.trim()) return [cat.trim()];
  return ['uncategorized'];
};

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

// Get flashcards for user — default deck (visible to all) + user's own cards
router.get('/user/:userId', isOwner('userId'), async (req, res) => {
  try {
    const { userId } = req.params;

    // Default vocabulary deck — available to every authenticated user
    const defaultCards = flashcardData.map((card, i) => ({
      _id: `default-${i}`,
      korean: card.korean,
      english: card.english,
      romanization: card.romanization,
      category: card.category,
      masteryLevel: 3,
      correctCount: 0,
      incorrectCount: 0,
      isDefault: true,
    }));

    // User's own private flashcards (normalize category for old string-format docs)
    const userFlashcards = await Flashcard.find({ userId });
    const normalizedUserCards = userFlashcards.map(fc => {
      const obj = fc.toObject();
      obj.category = normalizeCategory(obj.category);
      return obj;
    });

    // Merge persisted masteryLevel preferences into default cards
    const preferences = await UserCardPreference.find({ userId });
    const prefMap = new Map(preferences.map(p => [p.cardId, p.masteryLevel]));
    const defaultCardsWithPrefs = defaultCards.map(card =>
      prefMap.has(card._id) ? { ...card, masteryLevel: prefMap.get(card._id) } : card
    );

    res.json([...defaultCardsWithPrefs, ...normalizedUserCards]);
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
      category: normalizeCategory(category),
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
  const { isCorrect } = req.body;

  // Default cards — persist masteryLevel in UserCardPreference
  if (req.params.id.startsWith('default-')) {
    try {
      const existing = await UserCardPreference.findOne({
        userId: req.userId,
        cardId: req.params.id,
      });
      const currentLevel = existing ? existing.masteryLevel : 3;
      const newLevel = isCorrect
        ? Math.min(currentLevel + 1, 5)
        : Math.max(currentLevel - 1, 1);

      await UserCardPreference.findOneAndUpdate(
        { userId: req.userId, cardId: req.params.id },
        { masteryLevel: newLevel, updatedAt: new Date() },
        { upsert: true, new: true }
      );

      return res.json({ masteryLevel: newLevel });
    } catch (error) {
      console.error('Update default card preference error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  try {
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
