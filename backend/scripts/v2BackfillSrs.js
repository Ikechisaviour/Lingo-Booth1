/**
 * Seeds CurriculumV2SRS rows from existing CurriculumV2Progress
 * completedConceptIds. Run once when item #18 ships — idempotent, so
 * re-running is safe.
 *
 * For each completed concept, creates a recognition-skill row with a
 * mid-range stability and difficulty, due in ~3 days. This gives the
 * review-first planner (item #19) something to surface immediately
 * rather than waiting weeks for organic data to accumulate.
 *
 * Usage:
 *   node scripts/v2BackfillSrs.js          # apply changes
 *   node scripts/v2BackfillSrs.js --dry    # report what would change
 */

/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

const CurriculumV2Progress = require('../models/CurriculumV2Progress');
const CurriculumV2SRS = require('../models/CurriculumV2SRS');
const { CONCEPT_INDEX } = require('../curriculum/schema/concepts');

const SEED_STABILITY = 3;
const SEED_DIFFICULTY = 5;
const DAY_MS = 86_400_000;

function inferConceptKind(conceptId) {
  const concept = CONCEPT_INDEX[conceptId];
  if (!concept) return 'vocab';
  if (typeof conceptId === 'string') {
    if (conceptId.startsWith('pattern.')) return 'pattern';
    if (conceptId.startsWith('contrast.')) return 'contrast';
    if (conceptId.startsWith('story.')) return 'story';
  }
  return 'vocab';
}

async function main() {
  const dryRun = process.argv.includes('--dry');

  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to MongoDB (${dryRun ? 'DRY RUN' : 'APPLY'})`);

  const progressDocs = await CurriculumV2Progress.find({}).lean();
  console.log(`Found ${progressDocs.length} v2 progress doc(s)`);

  let upserts = 0;
  let skipped = 0;
  const now = new Date();
  const dueAt = new Date(now.getTime() + SEED_STABILITY * DAY_MS);

  for (const progress of progressDocs) {
    const conceptIds = progress.completedConceptIds || [];
    for (const conceptId of conceptIds) {
      const conceptKind = inferConceptKind(conceptId);
      const filter = { userId: progress.userId, conceptId, skill: 'recognition' };

      const existing = await CurriculumV2SRS.findOne(filter).lean();
      if (existing) {
        skipped += 1;
        continue;
      }

      if (dryRun) {
        upserts += 1;
        continue;
      }

      await CurriculumV2SRS.create({
        ...filter,
        targetLang: 'ko',
        conceptKind,
        stability: SEED_STABILITY,
        difficulty: SEED_DIFFICULTY,
        dueAt,
        lastReviewedAt: now,
        lastResult: 'good',
        reviewCount: 1,
        lapses: 0,
        introducedVia: 'backfill',
        reinforcedByContextAt: [],
      });
      upserts += 1;
    }
  }

  console.log(`${dryRun ? 'Would create' : 'Created'} ${upserts} SRS row(s); ${skipped} already existed`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
