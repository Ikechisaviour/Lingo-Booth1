/**
 * seedLevel1Cluster4.js
 * Idempotent upsert of Level 1 cluster 4 (Units 15-21). Finishes Level 1.
 *
 * Usage: node scripts/seedLevel1Cluster4.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/level1Unit15PhoneMessages'),
  require('../textbookLessons/level1Unit16ClubsLeisure'),
  require('../textbookLessons/level1Unit17PostOffice'),
  require('../textbookLessons/level1Unit18Health'),
  require('../textbookLessons/level1Unit19KoreanHolidays'),
  require('../textbookLessons/level1Unit20Suggestions'),
  require('../textbookLessons/level1Unit21HopesDreams'),
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

    console.log(`\nUpserted ${upserted} lessons. Level 1 complete.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
