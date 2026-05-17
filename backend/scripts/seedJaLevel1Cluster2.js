/**
 * seedJaLevel1Cluster2.js
 * Idempotent upsert of the first Japanese Level 1 review band (Units 1-6).
 *
 * Usage: node scripts/seedJaLevel1Cluster2.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/ja/level1Unit01Greetings'),
  require('../textbookLessons/ja/level1Unit02Classroom'),
  require('../textbookLessons/ja/level1Unit03Locations'),
  require('../textbookLessons/ja/level1Unit04DailyRoutines'),
  require('../textbookLessons/ja/level1Unit05LifeInJapan'),
  require('../textbookLessons/ja/level1Unit06DatesCalendar'),
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

    console.log(`\nUpserted ${upserted} Japanese lessons.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
