/**
 * seedLevel2Cluster7.js — Level 2 Track-Thematic Units 7-9 + Review 3.
 * Finishes the Track-Thematic. Usage: node scripts/seedLevel2Cluster7.js
 */
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/level2Unit07RightWrong'),
  require('../textbookLessons/level2Unit08IntriguingWorld'),
  require('../textbookLessons/level2Unit09PopCulture'),
  require('../textbookLessons/level2Review03'),
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
    console.log(`\nUpserted ${upserted} lessons. Track-Thematic complete.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
})();
