const mongoose = require('mongoose');

// v2's own SRS state. Kept separate from Flashcard (v1) so the legacy
// SM-2 scheduling and FlashcardsPage stay untouched. One row per
// (userId, conceptId, skill) — a concept can have up to 4 rows if the
// learner is being tracked across recognition, production, listening,
// and pronunciation. See backend/utils/curriculumV2Srs.js for the
// scheduler that mutates this state.
const curriculumV2SrsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  targetLang: {
    type: String,
    required: true,
    maxlength: 20,
  },
  conceptId: {
    type: String,
    required: true,
  },
  conceptKind: {
    type: String,
    enum: ['vocab', 'pattern', 'contrast', 'story'],
    required: true,
  },
  skill: {
    type: String,
    enum: ['recognition', 'production', 'listening', 'pronunciation'],
    required: true,
  },

  // FSRS-lite state. stability = "days until retrievability drops to the
  // target retention rate." difficulty is persistent item difficulty
  // 0..10. retrievability is not stored; derived at query time from
  // (now - lastReviewedAt) / stability.
  stability: {
    type: Number,
    default: 0,
    min: 0,
  },
  difficulty: {
    type: Number,
    default: 5,
    min: 0,
    max: 10,
  },

  dueAt: {
    type: Date,
    required: true,
  },
  lastReviewedAt: Date,
  lastResult: {
    type: String,
    enum: ['again', 'hard', 'good', 'easy'],
  },

  reviewCount: {
    type: Number,
    default: 0,
  },
  lapses: {
    type: Number,
    default: 0,
  },

  introducedVia: {
    type: String,
    enum: ['planner', 'level-test', 'context-boost', 'backfill'],
    default: 'planner',
  },
  reinforcedByContextAt: {
    type: [Date],
    default: [],
  },
}, { timestamps: true });

curriculumV2SrsSchema.index(
  { userId: 1, conceptId: 1, skill: 1 },
  { unique: true },
);
curriculumV2SrsSchema.index({ userId: 1, targetLang: 1, dueAt: 1 });
curriculumV2SrsSchema.index({ userId: 1, conceptId: 1 });

module.exports = mongoose.model('CurriculumV2SRS', curriculumV2SrsSchema);
