/**
 * Seed a target-language textbook curriculum module.
 * Usage: node scripts/seedTargetCurriculum.js es
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const targetLang = process.argv[2];
if (!targetLang) {
  console.error('Usage: node scripts/seedTargetCurriculum.js <targetLang>');
  process.exit(1);
}

async function seed() {
  try {
    const curriculum = require(`../textbookLessons/${targetLang}/curriculum`);
    const lessons = Object.values(curriculum);
    await mongoose.connect(process.env.MONGODB_URI);
    let upserted = 0;
    for (const lesson of lessons) {
      await Lesson.findOneAndReplace(
        { title: lesson.title, targetLang: lesson.targetLang },
        lesson,
        { upsert: true, new: true },
      );
      upserted += 1;
    }
    console.log(`Upserted ${upserted} ${targetLang} textbook lessons.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
