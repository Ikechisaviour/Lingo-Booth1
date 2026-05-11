/**
 * seedLevel2Cluster6.js — Level 2 Track-Thematic Units 5-6 + Review 2.
 * Usage: node scripts/seedLevel2Cluster6.js
 */
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/level2Unit05ProverbsIdioms'),
  require('../textbookLessons/level2Unit06Performances'),
  require('../textbookLessons/level2Review02'),
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
