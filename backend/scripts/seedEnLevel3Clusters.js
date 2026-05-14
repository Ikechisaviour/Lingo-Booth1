/**
 * seedEnLevel3Clusters.js
 * Idempotent upsert of English Level 3 cluster lessons (6 grammar clusters).
 * Matched by { title, targetLang } and replaced in place.
 *
 * Usage: node scripts/seedEnLevel3Clusters.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/en/level3Cluster1Connectors'),
  require('../textbookLessons/en/level3Cluster2Tense'),
  require('../textbookLessons/en/level3Cluster3Modality'),
  require('../textbookLessons/en/level3Cluster4Resemblance'),
  require('../textbookLessons/en/level3Cluster5Modifiers'),
  require('../textbookLessons/en/level3Cluster6PositionInversion'),
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

    console.log(`\nUpserted ${upserted} English Level 3 cluster lessons.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
