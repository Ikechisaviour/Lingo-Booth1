const mongoose = require('mongoose');

const SHELF_LIFE_MS = 365 * 24 * 60 * 60 * 1000;
const SEAT_BATCH_SOURCES = ['stripe', 'manual', 'lead_accept', 'auto_renew', 'initial'];

const seatBatchSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
    index: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  consumedCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  expiredUnusedCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  pricePerSeatCents: { type: Number, default: null, min: 0 },
  totalCents: { type: Number, default: null, min: 0 },
  source: {
    type: String,
    enum: SEAT_BATCH_SOURCES,
    required: true,
  },
  purchasedAt: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  shelfExpiresAt: {
    type: Date,
    required: true,
    index: true,
  },
  expiredAt: { type: Date, default: null },
  billingEventId: { type: mongoose.Schema.Types.ObjectId, ref: 'BillingEvent', default: null },
  addedByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  note: { type: String, maxlength: 500, default: '' },
}, {
  timestamps: true,
});

seatBatchSchema.index({ organizationId: 1, shelfExpiresAt: 1, purchasedAt: 1 });

module.exports = mongoose.model('SeatBatch', seatBatchSchema);
module.exports.SHELF_LIFE_MS = SHELF_LIFE_MS;
module.exports.SEAT_BATCH_SOURCES = SEAT_BATCH_SOURCES;
