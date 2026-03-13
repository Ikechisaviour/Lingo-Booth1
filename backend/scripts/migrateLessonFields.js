/**
 * Migration script: Populate generic lesson fields from legacy Korean-English fields.
 *
 * For every existing lesson document this script:
 *   1. Sets targetLang = 'ko' if not already set
 *   2. Sets nativeLang = 'en' if not already set
 *   3. Copies content[].korean  -> content[].targetText
 *   4. Copies content[].english -> content[].nativeText
 *   5. Copies content[].example -> content[].exampleTarget
 *   6. Copies content[].exampleEnglish -> content[].exampleNative
 *   7. Copies content[].breakdown[].korean -> content[].breakdown[].target
 *   8. Copies content[].breakdown[].english -> content[].breakdown[].native
 *
 * Safe to run multiple times — skips documents already migrated.
 *
 * Usage:  node scripts/migrateLessonFields.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

const Lesson = require('../models/Lesson');

async function migrate() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error('No MONGODB_URI or MONGO_URI found in env');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  // Find lessons that still have legacy `korean` field in content but missing `targetText`
  const lessons = await Lesson.find({}).lean();
  let updated = 0;

  for (const lesson of lessons) {
    let needsUpdate = false;
    const contentUpdates = [];

    for (const item of lesson.content) {
      const patch = {};

      if (item.korean && !item.targetText) {
        patch['targetText'] = item.korean;
        needsUpdate = true;
      }
      if (item.english && !item.nativeText) {
        patch['nativeText'] = item.english;
        needsUpdate = true;
      }
      if (item.example && !item.exampleTarget) {
        patch['exampleTarget'] = item.example;
        needsUpdate = true;
      }
      if (item.exampleEnglish && !item.exampleNative) {
        patch['exampleNative'] = item.exampleEnglish;
        needsUpdate = true;
      }

      if (item.breakdown && item.breakdown.length > 0) {
        const newBreakdown = item.breakdown.map(b => {
          const bp = { ...b };
          if (b.korean && !b.target) {
            bp.target = b.korean;
            needsUpdate = true;
          }
          if (b.english && !b.native) {
            bp.native = b.english;
            needsUpdate = true;
          }
          return bp;
        });
        patch['breakdown'] = newBreakdown;
      }

      contentUpdates.push({ ...item, ...patch });
    }

    // Also ensure targetLang is explicitly set
    const langPatch = {};
    if (!lesson.targetLang) {
      langPatch.targetLang = 'ko';
      needsUpdate = true;
    }
    if (!lesson.nativeLang) {
      langPatch.nativeLang = 'en';
      needsUpdate = true;
    }

    if (needsUpdate) {
      await Lesson.updateOne(
        { _id: lesson._id },
        { $set: { content: contentUpdates, ...langPatch } }
      );
      updated++;
    }
  }

  console.log(`Migration complete: ${updated}/${lessons.length} lessons updated`);
  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
