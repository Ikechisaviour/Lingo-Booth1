/**
 * Idempotent upsert of Japanese Level 1 Units 15-21.
 * Usage: node scripts/seedJaLevel1Cluster4.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const ja = require('../textbookLessons/ja/curriculum');
require('dotenv').config();

const cluster = [
  ja.level1Unit15PhoneMessages,
  ja.level1Unit16ClubsLeisure,
  ja.level1Unit17PostOffice,
  ja.level1Unit18Health,
  ja.level1Unit19CulturalHolidays,
  ja.level1Unit20Suggestions,
  ja.level1Unit21HopesDreams,
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
