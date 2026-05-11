/**
 * seedLevel2Cluster9.js — Level 2 Track-Adult Units 5-8.
 * Usage: node scripts/seedLevel2Cluster9.js
 */
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/level2AdultUnit05Buying'),
  require('../textbookLessons/level2AdultUnit06DormLife'),
  require('../textbookLessons/level2AdultUnit07Safety'),
  require('../textbookLessons/level2AdultUnit08Medical'),
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
