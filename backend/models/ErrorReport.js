const mongoose = require('mongoose');

const errorReportSchema = new mongoose.Schema({
  source: {
    type: String,
    enum: ['web', 'mobile', 'admin-web', 'backend', 'unknown'],
    default: 'unknown',
    index: true,
  },
  kind: {
    type: String,
    enum: ['api', 'runtime', 'unhandled-rejection', 'error-boundary', 'server', 'manual'],
    default: 'manual',
    index: true,
  },
  severity: {
    type: String,
    enum: ['info', 'warning', 'error', 'critical'],
    default: 'error',
    index: true,
  },
  message: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  stack: {
    type: String,
    maxlength: 12000,
  },
  componentStack: {
    type: String,
    maxlength: 12000,
  },
  route: {
    type: String,
    maxlength: 1000,
    index: true,
  },
  screen: {
    type: String,
    maxlength: 500,
  },
  api: {
    method: { type: String, maxlength: 20 },
    url: { type: String, maxlength: 1200 },
    statusCode: Number,
    statusText: { type: String, maxlength: 200 },
    responseMessage: { type: String, maxlength: 2000 },
    requestId: { type: String, maxlength: 200 },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  reportedUserId: {
    type: String,
    maxlength: 120,
  },
  userSnapshot: {
    username: { type: String, maxlength: 120 },
    email: { type: String, maxlength: 250 },
    role: { type: String, maxlength: 50 },
    subscriptionTier: { type: String, maxlength: 50 },
  },
  deviceId: {
    type: String,
    maxlength: 160,
    index: true,
  },
  session: {
    isGuest: Boolean,
    nativeLanguage: { type: String, maxlength: 20 },
    targetLanguage: { type: String, maxlength: 20 },
    subscriptionTier: { type: String, maxlength: 50 },
  },
  client: {
    userAgent: { type: String, maxlength: 1200 },
    platform: { type: String, maxlength: 200 },
    appVersion: { type: String, maxlength: 100 },
    language: { type: String, maxlength: 80 },
    viewport: { type: String, maxlength: 80 },
  },
  request: {
    ip: { type: String, maxlength: 80 },
    origin: { type: String, maxlength: 500 },
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  acknowledged: {
    type: Boolean,
    default: false,
    index: true,
  },
  acknowledgedAt: Date,
  acknowledgedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

errorReportSchema.index({ createdAt: -1 });
errorReportSchema.index({ acknowledged: 1, createdAt: -1 });
errorReportSchema.index({ severity: 1, createdAt: -1 });

module.exports = mongoose.model('ErrorReport', errorReportSchema);
