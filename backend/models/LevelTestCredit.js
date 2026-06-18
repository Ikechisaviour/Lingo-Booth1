const mongoose = require('mongoose');

const levelTestCreditSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  creditType: {
    type: String,
    enum: ['proficiency'],
    default: 'proficiency',
    index: true,
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'consumed', 'refunded'],
    default: 'available',
    index: true,
  },
  source: {
    type: String,
    enum: ['stripe', 'manual'],
    default: 'stripe',
  },
  priceCents: { type: Number, default: 1000, min: 0 },
  currency: { type: String, default: 'usd', maxlength: 10 },
  provider: { type: String, default: 'stripe', maxlength: 40 },
  providerSessionId: { type: String, default: '', index: true },
  providerPaymentId: { type: String, default: '', index: true },
  reservedAt: { type: Date, default: null },
  consumedAt: { type: Date, default: null },
  consumedAttemptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LevelTestAttempt',
    default: null,
  },
  purchasedAt: { type: Date, default: Date.now, index: true },
}, {
  timestamps: true,
});

levelTestCreditSchema.index({ userId: 1, creditType: 1, status: 1, purchasedAt: 1 });
levelTestCreditSchema.index(
  { provider: 1, providerSessionId: 1 },
  {
    unique: true,
    partialFilterExpression: { providerSessionId: { $type: 'string', $gt: '' } },
  },
);
levelTestCreditSchema.index(
  { provider: 1, providerPaymentId: 1 },
  {
    unique: true,
    partialFilterExpression: { providerPaymentId: { $type: 'string', $gt: '' } },
  },
);

module.exports = mongoose.model('LevelTestCredit', levelTestCreditSchema);
