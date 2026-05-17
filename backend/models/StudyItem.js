const mongoose = require('mongoose');

const studyItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  targetLanguage: {
    type: String,
    required: true,
    maxlength: 20,
    index: true,
  },
  nativeLanguage: {
    type: String,
    required: true,
    maxlength: 20,
    index: true,
  },
  itemType: {
    type: String,
    enum: ['word', 'phrase', 'sentence', 'correction', 'roleplay', 'bookmark'],
    default: 'phrase',
    index: true,
  },
  targetText: {
    type: String,
    required: true,
    maxlength: 600,
  },
  nativeText: {
    type: String,
    default: '',
    maxlength: 600,
  },
  romanization: {
    type: String,
    default: '',
    maxlength: 240,
  },
  sourceType: {
    type: String,
    enum: ['class', 'conversation', 'flashcard', 'writing', 'quiz', 'context', 'manual'],
    default: 'manual',
    index: true,
  },
  sourceRef: {
    type: String,
    default: '',
    maxlength: 160,
  },
  sourceLabel: {
    type: String,
    default: '',
    maxlength: 180,
  },
  reason: {
    type: String,
    default: '',
    maxlength: 240,
  },
  tags: {
    type: [String],
    default: [],
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  ease: {
    type: Number,
    default: 2.5,
    min: 1.3,
    max: 3.2,
  },
  lastReviewedAt: {
    type: Date,
    default: null,
  },
  nextReviewAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
}, {
  timestamps: true,
});

studyItemSchema.index({
  userId: 1,
  targetLanguage: 1,
  nativeLanguage: 1,
  targetText: 1,
  itemType: 1,
}, {
  unique: true,
});

module.exports = mongoose.model('StudyItem', studyItemSchema);
