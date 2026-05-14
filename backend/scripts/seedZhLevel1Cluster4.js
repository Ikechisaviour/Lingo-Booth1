/**
 * seedZhLevel1Cluster4.js
 * Idempotent upsert of Chinese (Mandarin) Level 1 cluster 4 (Units 15-21). Finishes Level 1.
 *
 * Usage: node scripts/seedZhLevel1Cluster4.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/zh/level1Unit15PhoneMessages'),
  require('../textbookLessons/zh/level1Unit16ClubsLeisure'),
  require('../textbookLessons/zh/level1Unit17PostOffice'),
  require('../textbookLessons/zh/level1Unit18Health'),
  require('../textbookLessons/zh/level1Unit19ChineseHolidays'),
  require('../textbookLessons/zh/level1Unit20Suggestions'),
  require('../textbookLessons/zh/level1Unit21HopesDreams'),
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

    console.log(`\nUpserted ${upserted} Chinese lessons. Level 1 complete.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
