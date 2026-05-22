const mongoose = require('mongoose');

const SUBSCRIPTION_TIERS = ['free', 'plus', 'pro', 'ultra'];
const NULLABLE_SUBSCRIPTION_TIERS = [...SUBSCRIPTION_TIERS, null];
const NULLABLE_PERSONAL_STATUSES = ['active', 'trialing', 'past_due', 'cancelled', 'incomplete', 'setup_required', null];
const NULLABLE_INSTITUTION_STATUSES = ['active', 'trialing', 'past_due', 'cancelled', 'suspended', null];
const NULLABLE_OVERRIDE_STATUSES = ['active', 'trialing', 'cancelled', null];
const NULLABLE_PERSONAL_SOURCES = ['web', 'ios', 'android', 'manual', null];
const NULLABLE_PERSONAL_PROVIDERS = ['stripe', 'apple', 'google', 'manual', null];

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
  fullName: {
    type: String,
    trim: true,
    maxlength: 160,
    default: null,
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
  subscriptionTier: {
    type: String,
    enum: SUBSCRIPTION_TIERS,
    default: 'plus',
  },
  personalSubscription: {
    tier: {
      type: String,
      enum: NULLABLE_SUBSCRIPTION_TIERS,
      default: null,
    },
    status: {
      type: String,
      enum: NULLABLE_PERSONAL_STATUSES,
      default: null,
    },
    source: {
      type: String,
      enum: NULLABLE_PERSONAL_SOURCES,
      default: null,
    },
    provider: {
      type: String,
      enum: NULLABLE_PERSONAL_PROVIDERS,
      default: null,
    },
    subscriptionId: { type: String, default: null },
    customerId: { type: String, default: null },
    currentPeriodEnd: { type: Date, default: null },
    cancelAtPeriodEnd: { type: Boolean, default: false },
    updatedAt: { type: Date, default: null },
  },
  institutionalAccess: {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      default: null,
    },
    organizationName: { type: String, default: null },
    planId: { type: String, default: null },
    effectiveTier: {
      type: String,
      enum: ['plus', 'pro', 'ultra', null],
      default: null,
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'teacher', 'learner', null],
      default: null,
    },
    status: {
      type: String,
      enum: NULLABLE_INSTITUTION_STATUSES,
      default: null,
    },
    expiresAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
  },
  billingOverride: {
    tier: {
      type: String,
      enum: NULLABLE_SUBSCRIPTION_TIERS,
      default: null,
    },
    status: {
      type: String,
      enum: NULLABLE_OVERRIDE_STATUSES,
      default: null,
    },
    reason: { type: String, default: null },
    expiresAt: { type: Date, default: null },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    updatedAt: { type: Date, default: null },
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
    enum: ['quiz', 'lesson', 'flashcard', null],
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
  preferredVoices: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
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

function normalizeNullableEnum(value) {
  return value === undefined || value === '' ? null : value;
}

userSchema.pre('validate', function normalizeNullableSubscriptionFields(next) {
  if (this.personalSubscription) {
    this.personalSubscription.tier = normalizeNullableEnum(this.personalSubscription.tier);
    this.personalSubscription.status = normalizeNullableEnum(this.personalSubscription.status);
    this.personalSubscription.source = normalizeNullableEnum(this.personalSubscription.source);
    this.personalSubscription.provider = normalizeNullableEnum(this.personalSubscription.provider);
  }

  if (this.institutionalAccess) {
    this.institutionalAccess.effectiveTier = normalizeNullableEnum(this.institutionalAccess.effectiveTier);
    this.institutionalAccess.role = normalizeNullableEnum(this.institutionalAccess.role);
    this.institutionalAccess.status = normalizeNullableEnum(this.institutionalAccess.status);
  }

  if (this.billingOverride) {
    this.billingOverride.tier = normalizeNullableEnum(this.billingOverride.tier);
    this.billingOverride.status = normalizeNullableEnum(this.billingOverride.status);
  }

  next();
});

userSchema.pre('save', function syncAdminSubscriptionTier(next) {
  if (this.role === 'admin') {
    this.subscriptionTier = 'pro';
  } else if (!this.subscriptionTier) {
    this.subscriptionTier = 'plus';
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
