const mongoose = require('mongoose');

// A trackable campaign link. An admin/marketer creates one per post/channel
// (e.g. "Instagram bio – July"). Visitors arriving with ?ref=<code> are counted
// against it, and downstream signups / paying conversions are attributed too.
const referralLinkSchema = new mongoose.Schema({
  // Short slug used in the URL as ?ref=<code>. Unique, url-safe, lowercase.
  code: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  // Human-friendly name shown in the admin table.
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120,
  },
  // Where the link drops the visitor. A path on the site (e.g. '/', '/pricing').
  destination: {
    type: String,
    default: '/',
    trim: true,
    maxlength: 512,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  // Denormalised counters kept in sync as events happen, so the admin table
  // renders without an aggregation on every load. ReferralVisit holds the
  // per-hit rows used for the time series.
  totalVisits: { type: Number, default: 0 },
  uniqueVisits: { type: Number, default: 0 },
  signups: { type: Number, default: 0 },
  payingCustomers: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('ReferralLink', referralLinkSchema);
