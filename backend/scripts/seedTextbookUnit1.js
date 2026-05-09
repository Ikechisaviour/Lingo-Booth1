/**
 * seedTextbookUnit1.js
 * Inserts (or updates) the Korean intermediate textbook Unit 1 lesson.
 * Idempotent: matches by { title, targetLang } and replaces in place.
 *
 * Usage: node scripts/seedTextbookUnit1.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const unit1 = require('../textbookLessons/unit1');
require('dotenv').config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const filter = { title: unit1.title, targetLang: unit1.targetLang };
    const result = await Lesson.findOneAndReplace(filter, unit1, { upsert: true, new: true });

    console.log(`Upserted lesson "${result.title}" (${result.content.length} items, category=${result.category})`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
