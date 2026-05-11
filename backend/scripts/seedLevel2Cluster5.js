/**
 * seedLevel2Cluster5.js
 * Idempotent upsert of Level 2 Track-Thematic cluster 5 (Units 2-4 + Review 1).
 *
 * Usage: node scripts/seedLevel2Cluster5.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/level2Unit02HealthyLife'),
  require('../textbookLessons/level2Unit03Sports'),
  require('../textbookLessons/level2Unit04MenWomen'),
  require('../textbookLessons/level2Review01'),
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
