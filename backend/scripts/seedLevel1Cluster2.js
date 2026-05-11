/**
 * seedLevel1Cluster2.js
 * Idempotent upsert of Level 1 cluster 2 (Units 1-6).
 * Each lesson is matched by { title, targetLang } and replaced in place.
 *
 * Usage: node scripts/seedLevel1Cluster2.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/level1Unit01Greetings'),
  require('../textbookLessons/level1Unit02Classroom'),
  require('../textbookLessons/level1Unit03Locations'),
  require('../textbookLessons/level1Unit04DailyRoutines'),
  require('../textbookLessons/level1Unit05LifeInKorea'),
  require('../textbookLessons/level1Unit06DatesCalendar'),
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

    console.log(`\nUpserted ${upserted} lessons.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
