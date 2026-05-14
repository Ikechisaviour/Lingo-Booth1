/**
 * seedZhLevel1Foundation.js
 * Idempotent upsert of the Chinese (Mandarin) Level 1 Foundation
 * (Pinyin + tones + Hanzi basics) lesson.
 * Matches by { title, targetLang } so re-runs replace in place.
 *
 * Usage: node scripts/seedZhLevel1Foundation.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const level1Foundation = require('../textbookLessons/zh/level1Foundation');
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
