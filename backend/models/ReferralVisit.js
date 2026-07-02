const mongoose = require('mongoose');

// One row per visit to a referral link. Powers the visits-over-time chart and
// the unique-visitor calculation (a visit is "unique" when it's the first time
// a given device/visitor hits a given code). Rows expire after 180 days so the
// collection can't grow unbounded — the denormalised counters on ReferralLink
// retain the lifetime totals.
const referralVisitSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  link: { type: mongoose.Schema.Types.ObjectId, ref: 'ReferralLink', default: null, index: true },
  visitorId: { type: String, default: null },
  ip: { type: String, default: null },
  country: { type: String, default: null },
  userAgent: { type: String, default: null },
  // First visit for this (code, visitorId) pair → counts toward uniqueVisits.
  isUnique: { type: Boolean, default: false },
  // UTC calendar day (YYYY-MM-DD) for cheap day-bucketed aggregation.
  day: { type: String, default: null, index: true },
}, { timestamps: true });

referralVisitSchema.index({ code: 1, createdAt: -1 });
// TTL: drop raw visit rows after 180 days.
referralVisitSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 180 });

module.exports = mongoose.model('ReferralVisit', referralVisitSchema);
