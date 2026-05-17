/**
 * Idempotent upsert of Japanese adult-life units.
 * Usage: node scripts/seedJaLevel2Adult.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const ja = require('../textbookLessons/ja/curriculum');
require('dotenv').config();

const cluster = [
  ja.level2AdultUnit01Greetings,
  ja.level2AdultUnit02WorkSchedule,
  ja.level2AdultUnit03Food,
  ja.level2AdultUnit04Commute,
  ja.level2AdultUnit05Buying,
  ja.level2AdultUnit06DormLife,
  ja.level2AdultUnit07Safety,
  ja.level2AdultUnit08Medical,
  ja.level2AdultUnit09Weekend,
  ja.level2AdultUnit10Rules,
  ja.level2AdultUnit11JobHunting,
  ja.level2AdultUnit12Housing,
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
