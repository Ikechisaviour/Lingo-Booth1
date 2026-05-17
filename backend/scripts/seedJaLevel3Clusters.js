/**
 * Idempotent upsert of Japanese Level 3 grammar clusters.
 * Usage: node scripts/seedJaLevel3Clusters.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const ja = require('../textbookLessons/ja/curriculum');
require('dotenv').config();

const cluster = [
  ja.level3Cluster1Connectors,
  ja.level3Cluster2Tense,
  ja.level3Cluster3Modality,
  ja.level3Cluster4Resemblance,
  ja.level3Cluster5Modifiers,
  ja.level3Cluster6Honorifics,
];

async function seed() {
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
      console.log(`  ${result.title}`);
    }
    console.log(`Upserted ${upserted} Japanese lessons.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
