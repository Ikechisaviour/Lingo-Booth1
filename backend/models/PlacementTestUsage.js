const mongoose = require('mongoose');

const placementTestUsageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  targetLanguage: { type: String, required: true, maxlength: 20 },
  nativeLanguage: { type: String, required: true, maxlength: 20 },
  tier: {
    type: String,
    enum: ['free', 'plus', 'pro', 'ultra'],
    required: true,
    index: true,
  },
  period: {
    type: String,
    enum: ['lifetime', 'month'],
    required: true,
    index: true,
  },
  periodKey: {
    type: String,
    required: true,
    index: true,
    maxlength: 20,
  },
  startedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
}, {
  timestamps: true,
});

placementTestUsageSchema.index({ userId: 1, period: 1, periodKey: 1, startedAt: -1 });

module.exports = mongoose.model('PlacementTestUsage', placementTestUsageSchema);
