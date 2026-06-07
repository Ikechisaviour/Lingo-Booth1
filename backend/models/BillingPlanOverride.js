const mongoose = require('mongoose');

const billingPlanOverrideSchema = new mongoose.Schema({
  planId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  audience: {
    type: String,
    enum: ['individual', 'institution'],
    required: true,
    index: true,
  },
  active: {
    type: Boolean,
    default: true,
    index: true,
  },
  name: {
    type: String,
    maxlength: 120,
    trim: true,
  },
  tagline: {
    type: String,
    maxlength: 260,
    trim: true,
  },
  monthlyPriceCents: {
    type: Number,
    min: 0,
  },
  annualPriceCents: {
    type: Number,
    min: 0,
  },
  seatPriceMonthlyCents: {
    type: Number,
    min: 0,
  },
  seatPriceAnnualCents: {
    type: Number,
    min: 0,
  },
  pricePerSeatCents: {
    type: Number,
    min: 0,
  },
  bulkPricing: {
    type: [{
      minSeats: { type: Number, min: 1, required: true },
      pricePerSeatCents: { type: Number, min: 0, required: true },
    }],
    default: undefined,
  },
  stripeSeatPackPriceId: {
    type: String,
    maxlength: 200,
    trim: true,
  },
  minimumSeats: {
    type: Number,
    min: 1,
  },
  stripeMonthlyPriceId: {
    type: String,
    maxlength: 200,
    trim: true,
  },
  stripeAnnualPriceId: {
    type: String,
    maxlength: 200,
    trim: true,
  },
  notes: {
    type: String,
    maxlength: 2000,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('BillingPlanOverride', billingPlanOverrideSchema);
