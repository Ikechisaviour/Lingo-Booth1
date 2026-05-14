/**
 * seedEnLevel2Thematic.js
 * Idempotent upsert of English Level 2 thematic units (Units 2-9).
 * Matched by { title, targetLang } and replaced in place.
 *
 * Usage: node scripts/seedEnLevel2Thematic.js
 */

const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const cluster = [
  require('../textbookLessons/en/level2Unit02HealthyLife'),
  require('../textbookLessons/en/level2Unit03Sports'),
  require('../textbookLessons/en/level2Unit04ModernRelationships'),
  require('../textbookLessons/en/level2Unit05ProverbsIdioms'),
  require('../textbookLessons/en/level2Unit06Performances'),
  require('../textbookLessons/en/level2Unit07RightWrong'),
  require('../textbookLessons/en/level2Unit08IntriguingWorld'),
  require('../textbookLessons/en/level2Unit09PopCulture'),
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

    console.log(`\nUpserted ${upserted} English Level 2 lessons.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
