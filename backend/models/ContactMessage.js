const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 120,
  },
  email: {
    type: String,
    required: true,
    maxlength: 254,
    lowercase: true,
    trim: true,
  },
  subject: {
    type: String,
    maxlength: 160,
    default: 'Contact message',
  },
  message: {
    type: String,
    required: true,
    maxlength: 5000,
  },
  source: {
    type: String,
    enum: ['web', 'mobile', 'unknown'],
    default: 'web',
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  userSnapshot: {
    username: { type: String, maxlength: 120 },
    email: { type: String, maxlength: 254 },
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
    language: { type: String, maxlength: 80 },
  },
  page: {
    type: String,
    maxlength: 500,
  },
  request: {
    ip: { type: String, maxlength: 80 },
    origin: { type: String, maxlength: 500 },
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

contactMessageSchema.index({ acknowledged: 1, createdAt: -1 });
contactMessageSchema.index({ email: 1, createdAt: -1 });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
