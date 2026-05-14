const mongoose = require('mongoose');

const discountCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    maxlength: 40,
    index: true,
  },
  active: {
    type: Boolean,
    default: true,
    index: true,
  },
  description: {
    type: String,
    maxlength: 220,
    trim: true,
  },
  discountType: {
    type: String,
    enum: ['percent', 'fixed'],
    default: 'percent',
  },
  percentOff: {
    type: Number,
    min: 1,
    max: 100,
  },
  amountOffCents: {
    type: Number,
    min: 1,
  },
  currency: {
    type: String,
    default: 'usd',
    lowercase: true,
    trim: true,
    maxlength: 10,
  },
  appliesToAudience: {
    type: String,
    enum: ['all', 'individual', 'institution'],
    default: 'all',
    index: true,
  },
  appliesToPlanIds: [{
    type: String,
    lowercase: true,
    trim: true,
  }],
  startsAt: Date,
  expiresAt: Date,
  maxRedemptions: {
    type: Number,
    min: 1,
  },
  redemptions: {
    type: Number,
    default: 0,
    min: 0,
  },
  stripePromotionCodeId: {
    type: String,
    maxlength: 200,
    trim: true,
  },
  stripeCouponId: {
    type: String,
    maxlength: 200,
    trim: true,
  },
  notes: {
    type: String,
    maxlength: 2000,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

discountCodeSchema.index({ active: 1, expiresAt: 1 });

module.exports = mongoose.model('DiscountCode', discountCodeSchema);
