/**
 * seedZhLevel1Cluster3.js
 * Idempotent upsert of Chinese (Mandarin) Level 1 cluster 3 (Units 7–14).
 * Each lesson is matched by { title, targetLang } and replaced in place.
 *
 * Usage: node scripts/seedZhLevel1Cluster3.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/zh/level1Unit07GoingPlaces'),
  require('../textbookLessons/zh/level1Unit08Shopping'),
  require('../textbookLessons/zh/level1Unit09OrderingFood'),
  require('../textbookLessons/zh/level1Unit10WeatherPreferences'),
  require('../textbookLessons/zh/level1Unit11Scheduling'),
  require('../textbookLessons/zh/level1Unit12PastActivities'),
  require('../textbookLessons/zh/level1Unit13Transportation'),
  require('../textbookLessons/zh/level1Unit14Ability'),
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

    console.log(`\nUpserted ${upserted} Chinese lessons.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
