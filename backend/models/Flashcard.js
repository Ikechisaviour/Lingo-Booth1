const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  defaultIndex: {
    type: Number,
  },
  korean: String,
  romanization: String,
  officialPronunciation: String,
  learnerPronunciation: String,
  pronunciationConfidence: {
    type: String,
    enum: ['strong', 'approximate', 'audioFirst'],
  },
  officialPronunciationSource: String,
  learnerPronunciationSource: String,
  english: String,
  audioUrl: String,
  conceptId: String,
  senseId: String,
  conceptGloss: String,
  learningLevel: {
    type: Number,
    enum: [1, 2, 3, 4],
  },
  firstIntroducedLevel: {
    type: Number,
    enum: [1, 2, 3, 4],
  },
  activeLevels: [{
    type: Number,
    enum: [1, 2, 3, 4],
  }],
  levelTrack: String,
  supportLevel: String,
  skillStrands: [String],
  lessonRole: String,
  coreRequired: Boolean,
  requiredForProgress: Boolean,
  certificateEligible: Boolean,
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
  objective: String,
  sourceClassLessonKey: String,
  sourceClassLessonKeys: [String],
  levelUses: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  usage: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  // Translations of the 'english' field into each supported native language
  es: String,  // Spanish
  fr: String,  // French
  de: String,  // German
  zh: String,  // Chinese
  ja: String,  // Japanese
  hi: String,  // Hindi
  ar: String,  // Arabic
  he: String,  // Hebrew
  pt: String,  // Portuguese
  it: String,  // Italian
  nl: String,  // Dutch
  ru: String,  // Russian
  id: String,  // Indonesian
  ms: String,  // Malay
  fil: String, // Filipino
  tr: String,  // Turkish
  bn: String,  // Bengali
  ta: String,  // Tamil
  th: String,  // Thai
  category: {
    type: [String],
    default: ['uncategorized'],
  },
  targetLang: {
    type: String,
    default: 'ko',
  },
  nativeLang: {
    type: String,
    default: 'en',
  },
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
  lastReviewedAt: Date,
  nextReviewAt: Date,
  reviewCount: {
    type: Number,
    default: 0,
  },
  ease: {
    type: Number,
    default: 2.5,
  },
  lastReviewResult: {
    type: String,
    enum: ['correct', 'incorrect', 'manual'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

flashcardSchema.index({ isDefault: 1, defaultIndex: 1 });
flashcardSchema.index({ targetLang: 1, conceptId: 1 });
flashcardSchema.index({ targetLang: 1, senseId: 1 });
flashcardSchema.index({ userId: 1, nextReviewAt: 1 });

module.exports = mongoose.model('Flashcard', flashcardSchema);
