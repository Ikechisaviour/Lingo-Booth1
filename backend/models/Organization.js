const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 180,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['school', 'company', 'church', 'language_center', 'nonprofit', 'government', 'other'],
    default: 'other',
  },
  planId: {
    type: String,
    default: 'institution_basic',
    index: true,
  },
  effectiveTier: {
    type: String,
    enum: ['plus', 'pro', 'ultra'],
    default: 'plus',
  },
  status: {
    type: String,
    enum: ['lead', 'trialing', 'active', 'past_due', 'cancelled', 'suspended'],
    default: 'lead',
    index: true,
  },
  seatsPurchased: {
    type: Number,
    default: 10,
    min: 1,
  },
  seatsUsed: {
    type: Number,
    default: 0,
    min: 0,
  },
  billingSource: {
    type: String,
    enum: ['web', 'manual', 'institution'],
    default: 'manual',
  },
  billingEmail: {
    type: String,
    maxlength: 254,
    trim: true,
    lowercase: true,
  },
  ownerUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubscriptionRecord',
  },
  expiresAt: Date,
  notes: {
    type: String,
    maxlength: 3000,
  },
}, {
  timestamps: true,
});

organizationSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Organization', organizationSchema);
