const mongoose = require('mongoose');

const subscriptionRecordSchema = new mongoose.Schema({
  ownerType: {
    type: String,
    enum: ['user', 'organization'],
    required: true,
    index: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    refPath: 'ownerModel',
  },
  ownerModel: {
    type: String,
    required: true,
    enum: ['User', 'Organization'],
  },
  planId: {
    type: String,
    required: true,
    index: true,
  },
  tier: {
    type: String,
    enum: ['free', 'plus', 'pro', 'ultra'],
    required: true,
    index: true,
  },
  audience: {
    type: String,
    enum: ['individual', 'institution'],
    default: 'individual',
  },
  source: {
    type: String,
    enum: ['web', 'ios', 'android', 'manual', 'institution'],
    required: true,
    index: true,
  },
  provider: {
    type: String,
    enum: ['stripe', 'apple', 'google', 'manual', 'invoice'],
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['active', 'trialing', 'past_due', 'cancelled', 'incomplete', 'setup_required'],
    default: 'incomplete',
    index: true,
  },
  interval: {
    type: String,
    enum: ['monthly', 'annual', 'custom'],
    default: 'monthly',
  },
  seats: {
    type: Number,
    default: 1,
    min: 1,
  },
  providerCustomerId: {
    type: String,
    maxlength: 200,
    index: true,
  },
  providerSubscriptionId: {
    type: String,
    maxlength: 200,
    index: true,
  },
  providerPriceId: {
    type: String,
    maxlength: 200,
  },
  providerProductId: {
    type: String,
    maxlength: 200,
  },
  currentPeriodStart: Date,
  currentPeriodEnd: Date,
  cancelAtPeriodEnd: {
    type: Boolean,
    default: false,
  },
  trialEndsAt: Date,
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  lastProviderPayload: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

subscriptionRecordSchema.index({ ownerType: 1, ownerId: 1, status: 1 });
subscriptionRecordSchema.index({ provider: 1, providerSubscriptionId: 1 });

module.exports = mongoose.model('SubscriptionRecord', subscriptionRecordSchema);
