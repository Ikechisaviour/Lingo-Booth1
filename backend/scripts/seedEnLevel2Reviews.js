/**
 * seedEnLevel2Reviews.js
 * Idempotent upsert of English Level 2 review lessons (Reviews 1-3).
 * Matched by { title, targetLang } and replaced in place.
 *
 * Usage: node scripts/seedEnLevel2Reviews.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/en/level2Review01'),
  require('../textbookLessons/en/level2Review02'),
  require('../textbookLessons/en/level2Review03'),
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let upserted = 0;
    for (const lesson of cluster) {
      const result = await Lesson.findOneAndReplace(
        { title: lesson.title, targetLang: lesson.targetLang },
        lesson,
        { upsert: true, new: true },
      );
      upserted += 1;
      console.log(`  ${result.title}: ${result.content.length} items, ${result.activities.length} activities`);
    }

    console.log(`\nUpserted ${upserted} English Level 2 review lessons.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
