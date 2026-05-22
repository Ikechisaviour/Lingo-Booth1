const mongoose = require('mongoose');

const userCardPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cardId: {
    type: String,
    required: true,
  },
  targetLang: String,
  nativeLang: String,
  conceptId: String,
  senseId: String,
  firstIntroducedLevel: {
    type: Number,
    enum: [1, 2, 3, 4],
  },
  activeLevels: [{
    type: Number,
    enum: [1, 2, 3, 4],
  }],
  levelUses: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  lessonRole: String,
  requiredForProgress: Boolean,
  branchType: String,
  lessonWeight: {
    type: Number,
    enum: [1, 2, 3],
  },
  checkpointType: String,
  repairFocus: [String],
  longActivityTypes: [String],
  manifestSource: String,
  programLevelNameKey: String,
  programLevelDescriptionKey: String,
  unitOrder: Number,
  sequenceOrder: Number,
  skillFocus: [String],
  prerequisiteConcepts: [String],
  teachesConcepts: [String],
  reviewsConcepts: [String],
  masteryLevel: {
    type: Number,
    default: 3,
    min: 1,
    max: 5,
  },
  correctCount: {
    type: Number,
    default: 0,
  },
  incorrectCount: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  ease: {
    type: Number,
    default: 2.5,
  },
  lastReviewedAt: Date,
  nextReviewAt: Date,
  lastReviewResult: {
    type: String,
    enum: ['correct', 'incorrect', 'manual'],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userCardPreferenceSchema.index({ userId: 1, cardId: 1 }, { unique: true });
userCardPreferenceSchema.index({ userId: 1, targetLang: 1, nextReviewAt: 1 });
userCardPreferenceSchema.index({ userId: 1, conceptId: 1 });

module.exports = mongoose.model('UserCardPreference', userCardPreferenceSchema);
