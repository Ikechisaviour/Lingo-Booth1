/**
 * seedVocabPools.js
 * Idempotent upsert of the VocabPool collection. Safe to re-run; each pool
 * is matched by `key` and replaced in place. Pools are reference material
 * only — they don't appear in the class area, but the AI tutor can dip
 * into them when a learner needs more vocabulary on a topic the lesson
 * doesn't fully cover.
 *
 * Usage: node scripts/seedVocabPools.js
 */

const mongoose = require('mongoose');
const VocabPool = require('../models/VocabPool');
const { pools } = require('../vocabPools');
require('dotenv').config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let upserted = 0;
    for (const pool of pools) {
      await VocabPool.findOneAndReplace(
        { key: pool.key },
        pool,
        { upsert: true, new: true },
      );
      upserted += 1;
      console.log(`  ${pool.key}: ${pool.items.length} items`);
    }

    console.log(`\nUpserted ${upserted} vocabulary pools.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
