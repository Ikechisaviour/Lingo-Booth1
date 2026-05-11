/**
 * seedLevel2Cluster8.js — Level 2 Track-Adult Units 1-4.
 * Usage: node scripts/seedLevel2Cluster8.js
 */
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/level2AdultUnit01Greetings'),
  require('../textbookLessons/level2AdultUnit02WorkSchedule'),
  require('../textbookLessons/level2AdultUnit03Food'),
  require('../textbookLessons/level2AdultUnit04Commute'),
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    let upserted = 0;
    for (const lesson of cluster) {
      const result = await Lesson.findOneAndReplace(
        { title: lesson.title, targetLang: lesson.targetLang },
        lesson,
        { upsert: true, new: true },
      );
      upserted += 1;
      console.log(`  ${result.title}: ${result.content.length} items`);
    }
    console.log(`\nUpserted ${upserted} lessons.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
})();
