const mongoose = require('mongoose');

const completionCertificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true,
    index: true,
    maxlength: 64,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  userName: {
    type: String,
    required: true,
    maxlength: 160,
  },
  userEmail: {
    type: String,
    maxlength: 180,
    default: '',
  },
  classLessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    default: null,
    index: true,
  },
  classLessonTitle: {
    type: String,
    default: '',
    maxlength: 240,
  },
  level: {
    type: Number,
    enum: [1, 2, 3, 4],
    default: null,
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
  organizationName: {
    type: String,
    maxlength: 180,
    default: '',
  },
  institutionMembershipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrganizationMembership',
    default: null,
  },
  testAttemptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LevelTestAttempt',
    default: null,
  },
  targetLanguage: {
    type: String,
    required: true,
    maxlength: 20,
  },
  nativeLanguage: {
    type: String,
    required: true,
    maxlength: 20,
  },
  completedItemCount: {
    type: Number,
    required: true,
    min: 0,
  },
  totalItemCount: {
    type: Number,
    required: true,
    min: 1,
  },
  completionPercent: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 100,
  },
  certificateType: {
    type: String,
    enum: [
      'class_lesson_completion',
      'level_completion',
      'level_proficiency',
      'institution_completion',
      'institution_proficiency',
    ],
    default: 'class_lesson_completion',
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    default: null,
  },
  skillScores: [{
    skill: String,
    score: Number,
    correct: Number,
    total: Number,
  }],
  readiness: {
    type: String,
    enum: ['ready', 'review_recommended', 'not_ready', 'complete'],
    default: 'complete',
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  paymentStatus: {
    type: String,
    enum: ['included', 'paid', 'waived'],
    default: 'included',
  },
  planTier: {
    type: String,
    maxlength: 30,
    default: 'free',
  },
  billingSource: {
    type: String,
    maxlength: 40,
    default: 'default',
  },
  issuedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  expiresAt: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ['active', 'revoked'],
    default: 'active',
    index: true,
  },
  revokedAt: {
    type: Date,
    default: null,
  },
  revokedReason: {
    type: String,
    maxlength: 500,
    default: '',
  },
}, {
  timestamps: true,
});

completionCertificateSchema.index(
  { userId: 1, classLessonId: 1, nativeLanguage: 1, targetLanguage: 1 },
  {
    unique: true,
    partialFilterExpression: { certificateType: 'class_lesson_completion' },
    name: 'class_lesson_certificate_unique',
  },
);
completionCertificateSchema.index({
  userId: 1,
  certificateType: 1,
  contextType: 1,
  organizationId: 1,
  targetLanguage: 1,
  nativeLanguage: 1,
  level: 1,
}, { name: 'certificate_level_context_lookup' });

module.exports = mongoose.model('CompletionCertificate', completionCertificateSchema);
