/**
 * seedLevel1Foundation.js
 * Idempotent upsert of Level 1's foundation Hangul lesson.
 * Matches by { title, targetLang } so re-runs replace in place.
 *
 * Usage: node scripts/seedLevel1Foundation.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const level1Foundation = require('../textbookLessons/level1Foundation');
require('dotenv').config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const filter = { title: level1Foundation.title, targetLang: level1Foundation.targetLang };
    const result = await Lesson.findOneAndReplace(
      filter,
      level1Foundation,
      { upsert: true, new: true },
    );

    console.log(
      `Upserted lesson "${result.title}" (${result.content.length} items, lessonType=${result.lessonType}, activities=${result.activities.length})`,
    );
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
