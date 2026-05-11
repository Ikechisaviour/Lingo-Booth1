const mongoose = require('mongoose');

const contextItemSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true, maxlength: 180 },
  language: { type: String, default: '', maxlength: 20 },
  note: { type: String, default: '', maxlength: 240 },
  context: { type: String, default: '', maxlength: 160 },
}, { _id: false });

const practiceContextSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true,
  },
  deviceId: {
    type: String,
    default: '',
    index: true,
  },
  source: {
    type: String,
    enum: ['web', 'mobile', 'unknown'],
    default: 'unknown',
  },
  nativeLanguage: {
    type: String,
    default: 'en',
    maxlength: 20,
  },
  targetLanguage: {
    type: String,
    default: 'ko',
    maxlength: 20,
  },
  summary: {
    type: String,
    default: '',
    maxlength: 800,
  },
  environmentTags: {
    type: [String],
    default: [],
  },
  topics: {
    type: [contextItemSchema],
    default: [],
  },
  vocabulary: {
    type: [contextItemSchema],
    default: [],
  },
  phrases: {
    type: [contextItemSchema],
    default: [],
  },
  goals: {
    type: [String],
    default: [],
  },
  transcriptWordCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

practiceContextSchema.index({ userId: 1, targetLanguage: 1, createdAt: -1 });
practiceContextSchema.index({ deviceId: 1, targetLanguage: 1, createdAt: -1 });

module.exports = mongoose.model('PracticeContext', practiceContextSchema);
