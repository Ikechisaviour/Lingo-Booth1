/**
 * seedEnLevel1Cluster4.js
 * Idempotent upsert of English Level 1 cluster 4 (Units 15-21).
 * Each lesson is matched by { title, targetLang } and replaced in place.
 *
 * Usage: node scripts/seedEnLevel1Cluster4.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/en/level1Unit15PhoneMessages'),
  require('../textbookLessons/en/level1Unit16ClubsLeisure'),
  require('../textbookLessons/en/level1Unit17PostOffice'),
  require('../textbookLessons/en/level1Unit18Health'),
  require('../textbookLessons/en/level1Unit19CulturalHolidays'),
  require('../textbookLessons/en/level1Unit20Suggestions'),
  require('../textbookLessons/en/level1Unit21HopesDreams'),
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

    console.log(`\nUpserted ${upserted} English lessons.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
