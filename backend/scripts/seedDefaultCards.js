/**
 * seedDefaultCards.js
 * Inserts all default flashcards into MongoDB — Korean (from flashcardData.js)
 * plus all per-language files in flashcardData/*.js.
 * Safe to re-run — deletes existing defaults first (idempotent).
 *
 * Usage: node scripts/seedDefaultCards.js
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Flashcard = require('../models/Flashcard');
const koreanCards = require('../flashcardData');
require('dotenv').config();

async function seedDefaultCards() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Remove existing default cards for idempotent re-runs
    const deleted = await Flashcard.deleteMany({ isDefault: true });
    console.log(`Cleared ${deleted.deletedCount} existing default cards`);

    // --- Korean cards (from flashcardData.js) ---
    const CORE_FIELDS = ['korean', 'english', 'romanization', 'category'];
    const koDocs = koreanCards.map((card, i) => ({
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

    // --- Per-language cards (from flashcardData/*.js) ---
    const langDir = path.join(__dirname, '..', 'flashcardData');
    const langDocs = [];

    if (fs.existsSync(langDir)) {
      const files = fs.readdirSync(langDir).filter(f => f.endsWith('.js'));
      for (const file of files) {
        const lang = path.basename(file, '.js');
        const cards = require(path.join(langDir, file));
        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          const targetLang = card.targetLang || lang;
          langDocs.push({
            korean: card.korean,        // legacy field — also store in lang-specific field below
            english: card.english,
            romanization: card.romanization || '',
            category: Array.isArray(card.category) ? card.category : [card.category || 'uncategorized'],
            isDefault: true,
            defaultIndex: i,
            targetLang,
            nativeLang: 'en',
            masteryLevel: 3,
            correctCount: 0,
            incorrectCount: 0,
            // Store target text in the language-specific field so frontend getLangField() finds it
            [targetLang]: card.korean,
          });
        }
        console.log(`Loaded ${cards.length} ${lang} cards`);
      }
    }

    const allDocs = [...koDocs, ...langDocs];

    // Batch insert
    const batchSize = 500;
    let inserted = 0;
    for (let i = 0; i < allDocs.length; i += batchSize) {
      await Flashcard.insertMany(allDocs.slice(i, i + batchSize));
      inserted += Math.min(batchSize, allDocs.length - i);
      console.log(`Progress: ${inserted}/${allDocs.length}`);
    }

    console.log(`\nSeeded ${inserted} default flashcards (${koDocs.length} ko + ${langDocs.length} other languages)`);

    // Verify per language
    const langs = ['ko', ...new Set(langDocs.map(d => d.targetLang))];
    for (const lang of langs) {
      const count = await Flashcard.countDocuments({ isDefault: true, targetLang: lang });
      console.log(`  ${lang}: ${count} cards`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedDefaultCards();
