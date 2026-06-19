const mongoose = require('mongoose');

// A learner-submitted testimonial. Captured from the public landing page and
// held as `pending` until a platform admin approves it. Only `approved` reviews
// are ever served to the public landing page. Kept lightweight and close to the
// SemesterInterest lead shape so moderation feels consistent in the admin UI.
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 80,
    trim: true,
  },
  comment: {
    type: String,
    required: true,
    maxlength: 600,
    trim: true,
  },
  // Language the learner is studying. Stored as a short code (e.g. "ko") when it
  // maps to a supported language, otherwise free text. Rendered as "Learning X".
  targetLanguage: {
    type: String,
    maxlength: 40,
    trim: true,
  },
  email: {
    type: String,
    maxlength: 254,
    lowercase: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    index: true,
  },
  source: {
    type: String,
    enum: ['web', 'mobile', 'admin'],
    default: 'web',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  userSnapshot: {
    username: { type: String, maxlength: 120 },
    email: { type: String, maxlength: 254 },
  },
  deviceId: {
    type: String,
    maxlength: 160,
  },
  page: {
    type: String,
    maxlength: 500,
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewedAt: Date,
  request: {
    ip: { type: String, maxlength: 80 },
    origin: { type: String, maxlength: 500 },
  },
}, {
  timestamps: true,
});

reviewSchema.index({ status: 1, createdAt: -1 });
// Public landing query: approved reviews, newest approved first.
reviewSchema.index({ status: 1, reviewedAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
