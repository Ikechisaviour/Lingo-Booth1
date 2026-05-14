const mongoose = require('mongoose');

const billingEventSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ['stripe', 'apple', 'google', 'manual', 'system'],
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
    maxlength: 160,
    index: true,
  },
  status: {
    type: String,
    enum: ['received', 'processed', 'ignored', 'failed', 'setup_required'],
    default: 'received',
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    index: true,
  },
  providerEventId: {
    type: String,
    maxlength: 200,
    index: true,
  },
  providerSubscriptionId: {
    type: String,
    maxlength: 200,
    index: true,
  },
  message: {
    type: String,
    maxlength: 1000,
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

billingEventSchema.index({ provider: 1, providerEventId: 1 }, { sparse: true });

module.exports = mongoose.model('BillingEvent', billingEventSchema);
