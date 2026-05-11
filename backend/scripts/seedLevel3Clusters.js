/**
 * seedLevel3Clusters.js — Level 3 grammar clusters (TTMIK-derived).
 * 6 cluster lessons covering all 30 TTMIK Workbook L3 patterns.
 * Usage: node scripts/seedLevel3Clusters.js
 */
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/level3Cluster1Connectors'),
  require('../textbookLessons/level3Cluster2Tense'),
  require('../textbookLessons/level3Cluster3Modality'),
  require('../textbookLessons/level3Cluster4Resemblance'),
  require('../textbookLessons/level3Cluster5Modifiers'),
  require('../textbookLessons/level3Cluster6PositionEndingsHanja'),
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
    console.log(`\nUpserted ${upserted} lessons. Level 3 complete.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
})();
