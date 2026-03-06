/**
 * seedDefaultCards.js
 * Inserts all default flashcards from flashcardData.js into MongoDB.
 * Safe to re-run — deletes existing defaults first (idempotent).
 *
 * Usage: node scripts/seedDefaultCards.js
 */

const mongoose = require('mongoose');
const Flashcard = require('../models/Flashcard');
const flashcardData = require('../flashcardData');
require('dotenv').config();

async function seedDefaultCards() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Remove existing default cards for idempotent re-runs
    const deleted = await Flashcard.deleteMany({ isDefault: true });
    console.log(`Cleared ${deleted.deletedCount} existing default cards`);

    // Build documents from flashcardData.js
    const CORE_FIELDS = ['korean', 'english', 'romanization', 'category'];
    const docs = flashcardData.map((card, i) => ({
      korean: card.korean,
      english: card.english,
      romanization: card.romanization || '',
      category: Array.isArray(card.category) ? card.category : [card.category || 'uncategorized'],
      isDefault: true,
      defaultIndex: i,
      targetLang: 'ko',
      nativeLang: 'en',
      masteryLevel: 3,
      correctCount: 0,
      incorrectCount: 0,
      // Spread all translation fields (es, fr, de, zh, etc.)
      ...Object.fromEntries(
        Object.entries(card).filter(([k]) => !CORE_FIELDS.includes(k))
      ),
    }));

    // Batch insert
    const batchSize = 500;
    let inserted = 0;
    for (let i = 0; i < docs.length; i += batchSize) {
      await Flashcard.insertMany(docs.slice(i, i + batchSize));
      inserted += Math.min(batchSize, docs.length - i);
      console.log(`Progress: ${inserted}/${docs.length}`);
    }

    console.log(`\nSeeded ${inserted} default flashcards`);

    // Verify
    const count = await Flashcard.countDocuments({ isDefault: true });
    console.log(`Verification: ${count} default cards in database`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedDefaultCards();
