/**
 * seedDefaultCards.js
 * Inserts default flashcards into MongoDB.
 *
 * Default cards keep only the target-language text plus an English concept gloss.
 * Native-language meanings are translated on demand by the API and cached as
 * needed, so adding a new native language does not require rebuilding every
 * possible language pair.
 *
 * Usage: node scripts/seedDefaultCards.js
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Flashcard = require('../models/Flashcard');
const koreanCards = require('../flashcardData');
const { prepareDefaultFlashcardsForSeed } = require('../utils/languageConcepts');
require('dotenv').config();

async function seedDefaultCards() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const deleted = await Flashcard.deleteMany({ isDefault: true });
    console.log(`Cleared ${deleted.deletedCount} existing default cards`);

    const koDocs = prepareDefaultFlashcardsForSeed(koreanCards, 'ko', 0);
    console.log(`Loaded ${koreanCards.length} ko cards -> ${koDocs.length} normalized cards`);

    const langDir = path.join(__dirname, '..', 'flashcardData');
    const langDocs = [];

    if (fs.existsSync(langDir)) {
      const files = fs.readdirSync(langDir).filter(file => file.endsWith('.js'));
      for (const file of files) {
        const lang = path.basename(file, '.js');
        const cards = require(path.join(langDir, file));
        const docs = prepareDefaultFlashcardsForSeed(cards, lang, 0);
        langDocs.push(...docs);
        console.log(`Loaded ${cards.length} ${lang} cards -> ${docs.length} normalized cards`);
      }
    }

    const allDocs = [...koDocs, ...langDocs];
    const batchSize = 500;
    let inserted = 0;

    for (let i = 0; i < allDocs.length; i += batchSize) {
      await Flashcard.insertMany(allDocs.slice(i, i + batchSize));
      inserted += Math.min(batchSize, allDocs.length - i);
      console.log(`Progress: ${inserted}/${allDocs.length}`);
    }

    console.log(`\nSeeded ${inserted} default flashcards (${koDocs.length} ko + ${langDocs.length} other languages)`);

    const langs = ['ko', ...new Set(langDocs.map(doc => doc.targetLang))];
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
