const mongoose = require('mongoose');

// A prospective learner asking to be reminded when registration for the next
// semester cohort opens. Captured from the public "Join a semester" form and
// surfaced to platform admins. Intentionally lightweight — this is a lead, not
// an enrollment.
const semesterInterestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    maxlength: 120,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 254,
    lowercase: true,
    trim: true,
  },
  targetLanguage: {
    type: String,
    maxlength: 20,
    trim: true,
  },
  nativeLanguage: {
    type: String,
    maxlength: 20,
    trim: true,
  },
  currentLevel: {
    type: String,
    enum: ['unsure', 'beginner', 'elementary', 'intermediate', 'advanced'],
    default: 'unsure',
  },
  notes: {
    type: String,
    maxlength: 2000,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'reminded', 'enrolled', 'closed'],
    default: 'new',
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

semesterInterestSchema.index({ status: 1, createdAt: -1 });
semesterInterestSchema.index({ email: 1, createdAt: -1 });

module.exports = mongoose.model('SemesterInterest', semesterInterestSchema);
