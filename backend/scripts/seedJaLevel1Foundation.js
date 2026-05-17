/**
 * seedJaLevel1Foundation.js
 * Idempotent upsert of the Japanese Level 1 Foundation lesson.
 *
 * Usage: node scripts/seedJaLevel1Foundation.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const level1Foundation = require('../textbookLessons/ja/level1Foundation');
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
