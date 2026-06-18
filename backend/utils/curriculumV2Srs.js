// v2's SRS scheduler. FSRS-lite: separate stability and difficulty,
// target-retention is an explicit parameter, no external dependencies.
// All math is pure and exported individually for testing — the model
// I/O lives in updateAndPersist/getDueQueue/etc.

const CurriculumV2SRS = require('../models/CurriculumV2SRS');

const TARGET_RETENTION = 0.90;
// DECAY < 0 — used as exponent multiplier: R = exp(elapsed * DECAY / S).
// At elapsed = S, R = TARGET_RETENTION.
const DECAY = Math.log(TARGET_RETENTION);

const DAY_MS = 86_400_000;

const OUTCOMES = ['again', 'hard', 'good', 'easy'];

// Seed values when the item has never been reviewed.
const SEED_STABILITY = { again: 0.4, hard: 1.0, good: 2.5, easy: 5.0 };
const SEED_DIFFICULTY = 5;

// Per-outcome difficulty drift.
const DIFFICULTY_DELTA = { again: 1.2, hard: 0.3, good: -0.1, easy: -0.6 };

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function retrievability(stability, elapsedDays) {
  if (stability <= 0) return 0;
  return Math.exp((elapsedDays * DECAY) / stability);
}

// Returns the next-due offset in days for a given stability, such that
// retrievability at that offset equals TARGET_RETENTION. With our DECAY
// definition this simplifies to `stability` itself.
function dueOffsetDays(stability) {
  return Math.max(stability, 0.04); // ~1 hour floor for again/hard on new items
}

function nextStateFromReview(state, outcome, now = new Date()) {
  if (!OUTCOMES.includes(outcome)) {
    throw new Error(`Unknown SRS outcome: ${outcome}`);
  }

  const isFirstReview = !state.lastReviewedAt || state.reviewCount === 0;

  if (isFirstReview) {
    const stability = SEED_STABILITY[outcome];
    const difficulty = clamp(SEED_DIFFICULTY + DIFFICULTY_DELTA[outcome], 0, 10);
    const dueAt = new Date(now.getTime() + dueOffsetDays(stability) * DAY_MS);
    return {
      stability,
      difficulty,
      dueAt,
      lastReviewedAt: now,
      lastResult: outcome,
      reviewCount: 1,
      lapses: outcome === 'again' ? 1 : 0,
    };
  }

  const elapsedDays = (now.getTime() - new Date(state.lastReviewedAt).getTime()) / DAY_MS;
  const R = retrievability(state.stability, elapsedDays);

  const nextDifficulty = clamp(state.difficulty + DIFFICULTY_DELTA[outcome], 0, 10);

  let nextStability;
  let lapses = state.lapses;
  if (outcome === 'again') {
    // Failure: stability collapses. Difficulty mitigates the floor — hard
    // items lose more, easy items keep some progress.
    nextStability = Math.max(0.2, state.stability * 0.4 * (1 - nextDifficulty / 20));
    lapses += 1;
  } else {
    // Success: stability grows. The gain is larger when R was low at
    // review time (the brain just reconstructed a memory that had
    // partially faded — strong consolidation signal). Difficulty
    // dampens the gain.
    const baseGain = {
      hard: 1.1 + (1 - R) * 0.6,
      good: 1.5 + (1 - R) * 1.0,
      easy: 2.4 + (1 - R) * 1.6,
    }[outcome];
    const difficultyScale = 1 - nextDifficulty / 30;
    nextStability = state.stability * baseGain * difficultyScale;
  }

  const dueAt = new Date(now.getTime() + dueOffsetDays(nextStability) * DAY_MS);

  return {
    stability: nextStability,
    difficulty: nextDifficulty,
    dueAt,
    lastReviewedAt: now,
    lastResult: outcome,
    reviewCount: state.reviewCount + 1,
    lapses,
  };
}

// Partial-review nudge for "the learner heard this in their own daily
// conversation." Treats as a success with halved stability gain — the
// reinforcement is real but unverified, so we don't apply a full review.
// Caller is responsible for the matching logic; this function just
// shifts SRS state.
function nextStateFromContextReinforce(state, now = new Date()) {
  if (!state.lastReviewedAt || state.reviewCount === 0) {
    // Don't introduce items via context alone — that's the planner's job.
    // Reinforce-only no-ops for never-reviewed concepts.
    return null;
  }
  const elapsedDays = (now.getTime() - new Date(state.lastReviewedAt).getTime()) / DAY_MS;
  const R = retrievability(state.stability, elapsedDays);
  // Compute the multiplier a full 'good' review would apply, then take
  // half of its growth above 1. Floor at 1 so context never shrinks
  // stability — reinforcement is positive signal only.
  const goodGain = 1.5 + (1 - R) * 1.0;
  const goodMultiplier = Math.max(1, goodGain * (1 - state.difficulty / 30));
  const halfMultiplier = 1 + (goodMultiplier - 1) * 0.5;
  const nextStability = state.stability * halfMultiplier;
  const dueAt = new Date(now.getTime() + dueOffsetDays(nextStability) * DAY_MS);
  const reinforced = Array.isArray(state.reinforcedByContextAt)
    ? [...state.reinforcedByContextAt, now]
    : [now];
  return {
    stability: nextStability,
    dueAt,
    reinforcedByContextAt: reinforced,
  };
}

// Mastery score 0..1 for analytics and the planner's "is this mastered"
// query. Combines stability (interval) and difficulty (effort).
function getMastery(state) {
  if (!state || state.reviewCount === 0) return 0;
  const stabilityScore = Math.min(1, state.stability / 60);
  const difficultyScore = 1 - state.difficulty / 20;
  return clamp(stabilityScore * difficultyScore, 0, 1);
}

// ---- Persistence helpers --------------------------------------------------

async function reviewItem({ userId, targetLang, conceptId, conceptKind, skill, outcome }, now = new Date()) {
  const existing = await CurriculumV2SRS.findOne({ userId, conceptId, skill });
  const baseState = existing
    ? existing.toObject()
    : {
        userId,
        targetLang,
        conceptId,
        conceptKind,
        skill,
        stability: 0,
        difficulty: SEED_DIFFICULTY,
        reviewCount: 0,
        lapses: 0,
        reinforcedByContextAt: [],
      };
  const next = nextStateFromReview(baseState, outcome, now);
  const update = {
    ...next,
    userId,
    targetLang,
    conceptId,
    conceptKind,
    skill,
    introducedVia: existing?.introducedVia || 'planner',
  };
  return CurriculumV2SRS.findOneAndUpdate(
    { userId, conceptId, skill },
    { $set: update },
    { upsert: true, new: true },
  );
}

async function reinforceFromContext({ userId, conceptId, skill }, now = new Date()) {
  const existing = await CurriculumV2SRS.findOne({ userId, conceptId, skill });
  if (!existing) return null;
  const next = nextStateFromContextReinforce(existing.toObject(), now);
  if (!next) return null;
  return CurriculumV2SRS.findOneAndUpdate(
    { userId, conceptId, skill },
    { $set: next },
    { new: true },
  );
}

function getDueQueue({ userId, targetLang, limit = 50, now = new Date() }) {
  return CurriculumV2SRS.find({
    userId,
    targetLang,
    dueAt: { $lte: now },
  })
    .sort({ dueAt: 1 })
    .limit(limit)
    .lean();
}

// Returns the set of conceptIds for which every tracked skill has reached
// mastery (getMastery > threshold AND reviewCount >= minReviews). Used by
// the planner to skip already-mastered concepts when picking new content.
async function getMasteredConceptIds({ userId, targetLang, threshold = 0.7, minReviews = 3 }) {
  const rows = await CurriculumV2SRS.find({ userId, targetLang }).lean();
  const byConcept = new Map();
  for (const r of rows) {
    if (!byConcept.has(r.conceptId)) byConcept.set(r.conceptId, []);
    byConcept.get(r.conceptId).push(r);
  }
  const mastered = [];
  for (const [conceptId, skillRows] of byConcept) {
    const allMastered = skillRows.every(
      (s) => getMastery(s) > threshold && s.reviewCount >= minReviews,
    );
    if (allMastered) mastered.push(conceptId);
  }
  return mastered;
}

module.exports = {
  TARGET_RETENTION,
  DECAY,
  SEED_STABILITY,
  SEED_DIFFICULTY,
  OUTCOMES,
  retrievability,
  dueOffsetDays,
  nextStateFromReview,
  nextStateFromContextReinforce,
  getMastery,
  reviewItem,
  reinforceFromContext,
  getDueQueue,
  getMasteredConceptIds,
};
