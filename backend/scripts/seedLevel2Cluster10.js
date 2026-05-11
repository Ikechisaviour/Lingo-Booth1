/**
 * seedLevel2Cluster10.js — Level 2 Track-Adult Units 9-12. Finishes Level 2.
 * Usage: node scripts/seedLevel2Cluster10.js
 */
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/level2AdultUnit09Weekend'),
  require('../textbookLessons/level2AdultUnit10Rules'),
  require('../textbookLessons/level2AdultUnit11JobHunting'),
  require('../textbookLessons/level2AdultUnit12Housing'),
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
    console.log(`\nUpserted ${upserted} lessons. Level 2 complete.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
})();
