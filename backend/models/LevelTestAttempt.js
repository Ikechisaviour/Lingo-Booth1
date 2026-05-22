const mongoose = require('mongoose');

const skillScoreSchema = new mongoose.Schema({
  skill: {
    type: String,
    enum: ['vocabulary', 'grammar', 'reading', 'listening', 'speaking', 'writing', 'real_life'],
    required: true,
  },
  correct: { type: Number, default: 0, min: 0 },
  total: { type: Number, default: 0, min: 0 },
  score: { type: Number, default: 0, min: 0, max: 100 },
}, { _id: false });

const levelTestQuestionSchema = new mongoose.Schema({
  questionId: { type: String, required: true, maxlength: 120 },
  skill: {
    type: String,
    enum: ['vocabulary', 'grammar', 'reading', 'listening', 'speaking', 'writing', 'real_life'],
    required: true,
  },
  taskType: {
    type: String,
    enum: ['choose_meaning', 'choose_target', 'listen_choose', 'type_target', 'short_response', 'roleplay_turn'],
    required: true,
  },
  prompt: { type: String, required: true, maxlength: 800 },
  targetText: { type: String, maxlength: 800, default: '' },
  nativeText: { type: String, maxlength: 1200, default: '' },
  options: [{
    optionId: { type: String, required: true, maxlength: 60 },
    text: { type: String, required: true, maxlength: 800 },
  }],
  answerOptionId: { type: String, maxlength: 60, default: '' },
  expectedText: { type: String, maxlength: 800, default: '' },
  sourceLessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  sourceItemIndex: { type: Number, default: 0, min: 0 },
}, { _id: false });

const levelTestAnswerSchema = new mongoose.Schema({
  questionId: { type: String, required: true, maxlength: 120 },
  selectedOptionId: { type: String, maxlength: 60, default: '' },
  text: { type: String, maxlength: 1200, default: '' },
  selfScore: { type: Number, min: 0, max: 1, default: null },
  correct: { type: Boolean, default: false },
  skill: { type: String, maxlength: 40, default: '' },
}, { _id: false });

const levelTestAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  contextType: {
    type: String,
    enum: ['personal', 'institution'],
    default: 'personal',
    index: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    default: null,
    index: true,
  },
  institutionMembershipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrganizationMembership',
    default: null,
  },
  targetLanguage: { type: String, required: true, maxlength: 20, index: true },
  nativeLanguage: { type: String, required: true, maxlength: 20 },
  level: { type: Number, enum: [1, 2, 3, 4], required: true, index: true },
  mode: {
    type: String,
    enum: ['completion', 'proficiency'],
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['in_progress', 'submitted', 'expired'],
    default: 'in_progress',
    index: true,
  },
  passThreshold: { type: Number, required: true, min: 0, max: 100 },
  questionCount: { type: Number, required: true, min: 1 },
  supportPolicy: {
    type: String,
    enum: ['native_guided', 'mixed', 'target_dominant', 'target_first'],
    default: 'native_guided',
  },
  questions: {
    type: [levelTestQuestionSchema],
    default: [],
  },
  answers: {
    type: [levelTestAnswerSchema],
    default: [],
  },
  skillScores: {
    type: [skillScoreSchema],
    default: [],
  },
  score: { type: Number, default: null, min: 0, max: 100 },
  passed: { type: Boolean, default: false, index: true },
  readiness: {
    type: String,
    enum: ['ready', 'review_recommended', 'not_ready'],
    default: 'not_ready',
  },
  weakSkills: [{ type: String, maxlength: 40 }],
  certificateId: {
    type: String,
    maxlength: 64,
    default: '',
    index: true,
  },
  sourceSummary: {
    lessonsUsed: { type: Number, default: 0 },
    itemsUsed: { type: Number, default: 0 },
  },
  startedAt: { type: Date, default: Date.now, index: true },
  submittedAt: { type: Date, default: null, index: true },
}, {
  timestamps: true,
});

levelTestAttemptSchema.index({ userId: 1, targetLanguage: 1, level: 1, mode: 1, submittedAt: -1 });
levelTestAttemptSchema.index({ organizationId: 1, targetLanguage: 1, level: 1, mode: 1, submittedAt: -1 });

module.exports = mongoose.model('LevelTestAttempt', levelTestAttemptSchema);
