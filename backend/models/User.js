const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  authProviders: [{
    provider: { type: String, enum: ['google', 'facebook', 'apple', 'microsoft'] },
    providerId: { type: String },
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['active', 'suspended'],
    default: 'active',
  },
  suspendedAt: {
    type: Date,
    default: null,
  },
  suspendReason: {
    type: String,
    default: null,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  totalTimeSpent: {
    type: Number, // in minutes
    default: 0,
  },
  loginCount: {
    type: Number,
    default: 0,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  lastActivityType: {
    type: String,
    enum: ['lesson', 'flashcard', null],
    default: null,
  },
  lastLessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    default: null,
  },
  lastLessonIndex: {
    type: Number,
    default: 0,
  },
  lastFlashcardIndex: {
    type: Number,
    default: 0,
  },
  preferredVoice: {
    type: String,
    default: null,
  },
  nativeLanguage: {
    type: String,
    default: null,
  },
  targetLanguage: {
    type: String,
    default: null,
  },
  languageSetupComplete: {
    type: Boolean,
    default: false,
  },
  totalXP: {
    type: Number,
    default: 0,
  },
  lastAnsweredAt: {
    type: Date,
    default: null,
  },
  penaltyIntervalsApplied: {
    type: Number,
    default: 0,
  },
  xpDecayEnabled: {
    type: Boolean,
    default: false,
  },
  // === Streak ===
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastStudyDate: { type: String, default: null },
  streakHistory: { type: [Boolean], default: [false, false, false, false, false, false, false] },
  streakWeekStart: { type: String, default: null },
  // === Daily Quests ===
  dailyXpEarned: { type: Number, default: 0 },
  dailyHighScoreLessons: { type: Number, default: 0 },
  dailyTimeSpent: { type: Number, default: 0 },
  questResetDate: { type: String, default: null },
  dailyQuestXpClaimed: { type: [String], default: [] },
  // === Weekly Leaderboard ===
  weeklyXP: { type: Number, default: 0 },
  weekResetDate: { type: String, default: null },
  rateLimitHits: {
    type: Number,
    default: 0,
  },
  lastRateLimited: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  lastVerificationSent: {
    type: Date,
    default: null,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  verificationTokenExpires: {
    type: Date,
    default: null,
  },
  passwordResetToken: {
    type: String,
    default: null,
  },
  passwordResetExpires: {
    type: Date,
    default: null,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  // Location (captured on login/register via geoip-lite)
  lastCountry:   { type: String, default: null },
  lastCity:      { type: String, default: null },
  lastIp:        { type: String, default: null },
});

// Index for leaderboard queries
userSchema.index({ xpDecayEnabled: 1, weekResetDate: 1, weeklyXP: -1 });

module.exports = mongoose.model('User', userSchema);
