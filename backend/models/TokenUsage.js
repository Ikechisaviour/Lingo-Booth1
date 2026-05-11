const mongoose = require('mongoose');

const tokenUsageSchema = new mongoose.Schema({
  identityKey: {
    type: String,
    required: true,
  },
  identityType: {
    type: String,
    enum: ['user', 'device', 'fingerprint'],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  anonymousIdHash: {
    type: String,
    default: null,
  },
  dateKey: {
    type: String,
    required: true,
  },
  tier: {
    type: String,
    enum: ['free', 'plus', 'pro', 'ultra'],
    required: true,
  },
  dailyLimit: {
    type: Number,
    required: true,
  },
  usedTokens: {
    type: Number,
    default: 0,
  },
  promptTokens: {
    type: Number,
    default: 0,
  },
  completionTokens: {
    type: Number,
    default: 0,
  },
  requestCount: {
    type: Number,
    default: 0,
  },
  lastRequestAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

tokenUsageSchema.index({ identityKey: 1, dateKey: 1 }, { unique: true });
tokenUsageSchema.index({ userId: 1, dateKey: 1 });
tokenUsageSchema.index({ anonymousIdHash: 1, dateKey: 1 });

module.exports = mongoose.model('TokenUsage', tokenUsageSchema);
