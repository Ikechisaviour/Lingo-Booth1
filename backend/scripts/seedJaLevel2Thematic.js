/**
 * Idempotent upsert of Japanese Level 2 thematic units.
 * Usage: node scripts/seedJaLevel2Thematic.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const ja = require('../textbookLessons/ja/curriculum');
require('dotenv').config();

const cluster = [
  ja.level2Unit02HealthyLife,
  ja.level2Unit03Sports,
  ja.level2Unit04ModernRelationships,
  ja.level2Unit05ProverbsIdioms,
  ja.level2Unit06Performances,
  ja.level2Unit07RightWrong,
  ja.level2Unit08IntriguingWorld,
  ja.level2Unit09PopCulture,
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
