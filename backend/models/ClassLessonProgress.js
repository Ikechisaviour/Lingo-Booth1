const mongoose = require('mongoose');

const tutorPartSchema = new mongoose.Schema({
  type: { type: String, maxlength: 40 },
  language: { type: String, maxlength: 20 },
  text: { type: String, maxlength: 800 },
  speak: Boolean,
  speaker: { type: String, maxlength: 80 },
  section: { type: String, maxlength: 80 },
}, { _id: false });

const tutorTurnSchema = new mongoose.Schema({
  id: { type: String, maxlength: 120 },
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  content: { type: String, maxlength: 1600 },
  language: { type: String, maxlength: 20 },
  coachingTip: { type: String, maxlength: 800 },
  speechParts: [tutorPartSchema],
  displayParts: [tutorPartSchema],
}, { _id: false });

const classLessonProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  classLessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
    index: true,
  },
  targetLanguage: {
    type: String,
    maxlength: 20,
    required: true,
  },
  nativeLanguage: {
    type: String,
    maxlength: 20,
    required: true,
  },
  selectedIndex: {
    type: Number,
    default: 0,
    min: 0,
  },
  selectedActivityIndex: {
    type: Number,
    default: 0,
    min: 0,
  },
  completedItems: {
    type: [Number],
    default: [],
  },
  summary: {
    type: String,
    maxlength: 1000,
    default: '',
  },
  memory: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  tutorTurns: {
    type: [tutorTurnSchema],
    default: [],
  },
  source: {
    type: String,
    enum: ['web', 'mobile', 'unknown'],
    default: 'unknown',
  },
  lastStudiedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

classLessonProgressSchema.index(
  { userId: 1, classLessonId: 1, nativeLanguage: 1, targetLanguage: 1 },
  { unique: true },
);

module.exports = mongoose.model('ClassLessonProgress', classLessonProgressSchema);
