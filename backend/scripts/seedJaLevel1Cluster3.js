/**
 * Idempotent upsert of Japanese Level 1 Units 7-14.
 * Usage: node scripts/seedJaLevel1Cluster3.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const ja = require('../textbookLessons/ja/curriculum');
require('dotenv').config();

const cluster = [
  ja.level1Unit07GoingPlaces,
  ja.level1Unit08Shopping,
  ja.level1Unit09OrderingFood,
  ja.level1Unit10WeatherPreferences,
  ja.level1Unit11Scheduling,
  ja.level1Unit12PastActivities,
  ja.level1Unit13Transportation,
  ja.level1Unit14Ability,
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
