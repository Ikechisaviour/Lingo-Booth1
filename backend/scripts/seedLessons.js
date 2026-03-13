/**
 * seedLessons.js
 * Re-seeds all non-Korean lessons from lessonData/*.js files.
 * Deletes existing non-Korean lessons first (idempotent).
 * Korean lessons are seeded separately via seed.js.
 *
 * Usage: node scripts/seedLessons.js
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const LANGS = ['es','fr','de','zh','ja','hi','ar','he','pt','it','nl','ru','id','tr','bn','ta','ms','fil'];

async function seedLessons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing non-Korean lessons
    const deleted = await Lesson.deleteMany({ targetLang: { $in: LANGS } });
    console.log(`Cleared ${deleted.deletedCount} existing non-Korean lessons`);

    const allLessons = [];

    for (const lang of LANGS) {
      const dataPath = path.join(__dirname, '..', 'lessonData', `${lang}.js`);
      if (!fs.existsSync(dataPath)) {
        console.log(`Skipping ${lang} — no data file`);
        continue;
      }

      const data = require(dataPath);
      const lessons = Object.values(data).filter(Boolean);
      allLessons.push(...lessons);
      console.log(`Loaded ${lessons.length} lessons for ${lang}`);
    }

    // Batch insert
    const batchSize = 50;
    let inserted = 0;
    for (let i = 0; i < allLessons.length; i += batchSize) {
      await Lesson.insertMany(allLessons.slice(i, i + batchSize));
      inserted += Math.min(batchSize, allLessons.length - i);
      console.log(`Progress: ${inserted}/${allLessons.length}`);
    }

    console.log(`\nSeeded ${inserted} lessons across ${LANGS.length} languages`);

    // Verify
    for (const lang of LANGS) {
      const count = await Lesson.countDocuments({ targetLang: lang });
      const totalItems = await Lesson.aggregate([
        { $match: { targetLang: lang } },
        { $project: { itemCount: { $size: { $objectToArray: '$content' } } } },
        { $group: { _id: null, total: { $sum: '$itemCount' } } },
      ]);
      console.log(`  ${lang}: ${count} lessons, ${totalItems[0]?.total || 0} total items`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedLessons();
