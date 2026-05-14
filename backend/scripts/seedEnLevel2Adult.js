/**
 * seedEnLevel2Adult.js
 * Idempotent upsert of English Level 2 Adult/Workplace units (Units 1-12).
 * Matched by { title, targetLang } and replaced in place.
 *
 * Usage: node scripts/seedEnLevel2Adult.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/en/level2AdultUnit01Greetings'),
  require('../textbookLessons/en/level2AdultUnit02WorkSchedule'),
  require('../textbookLessons/en/level2AdultUnit03Food'),
  require('../textbookLessons/en/level2AdultUnit04Commute'),
  require('../textbookLessons/en/level2AdultUnit05Buying'),
  require('../textbookLessons/en/level2AdultUnit06DormLife'),
  require('../textbookLessons/en/level2AdultUnit07Safety'),
  require('../textbookLessons/en/level2AdultUnit08Medical'),
  require('../textbookLessons/en/level2AdultUnit09Weekend'),
  require('../textbookLessons/en/level2AdultUnit10Rules'),
  require('../textbookLessons/en/level2AdultUnit11JobHunting'),
  require('../textbookLessons/en/level2AdultUnit12Housing'),
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

    console.log(`\nUpserted ${upserted} English Level 2 Adult lessons.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
