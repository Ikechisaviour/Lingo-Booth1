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
    required: true,
    index: true,
  },
  classLessonTitle: {
    type: String,
    required: true,
    maxlength: 240,
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
    enum: ['class_lesson_completion'],
    default: 'class_lesson_completion',
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
  { unique: true },
);

module.exports = mongoose.model('CompletionCertificate', completionCertificateSchema);
