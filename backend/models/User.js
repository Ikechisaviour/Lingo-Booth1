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
    // 'marketing' can manage referral/campaign links (and nothing else in the
    // admin panel); 'admin' can do everything, including assigning roles.
    type: String,
    enum: ['user', 'admin', 'marketing'],
    default: 'user',
  },
  // Referral/campaign attribution: which link (?ref=<code>) this user arrived
  // through, and whether their paying conversion has already been counted so we
  // never double-count it on subscription renewals.
  referralCode: { type: String, default: null },
  referralAttributedAt: { type: Date, default: null },
  referralPayingCounted: { type: Boolean, default: false },
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
    seatStatus: {
      type: String,
      enum: ['active', 'suspended', 'expired', 'none', null],
      default: null,
    },
    seatExpiresAt: { type: Date, default: null },
    seatActivatedAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
  },
  subscriptionContext: {
    type: {
      type: String,
      enum: ['personal', 'institution'],
      default: 'institution',
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      default: null,
    },
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
  // Flashcard shuffle order is held stable for a 12h window so a learner can
  // resume from lastFlashcardIndex after a break or on another device. The
  // seed only changes when the window expires or the user reshuffles manually.
  flashcardShuffleSeed: {
    type: Number,
    default: null,
  },
  flashcardShuffleSeedAt: {
    type: Date,
    default: null,
  },
  // Persisted flashcard deck selection + study settings so a learner's chosen
  // deck (scope / categories / hand-picked or random subset) and study mode
  // follow them across sessions and devices. Shape is validated on write in
  // routes/users.js (sanitizeFlashcardPrefs). null = never saved.
  flashcardPrefs: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
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
  // Per-target-language curriculum version preference. Keys are lowercase
  // language codes (e.g. 'ko'); values are 'v1' or 'v2'. Empty/missing means
  // the learner hasn't chosen yet — UI will prompt with the version modal.
  curriculumPreferences: {
    type: Map,
    of: { type: String, enum: ['v1', 'v2'] },
    default: () => new Map(),
  },
  // Korean Hangul onboarding progress. Tracks completion per jamo group so a
  // learner can return to refresh any time, but the gate that blocks A1
  // patterns on the v2 entry only consults `onboardingCompletedAt`. Set when
  // the learner finishes the final reading-practice step at least once.
  hangulProgress: {
    completedGroups: { type: [String], default: [] },
    onboardingCompletedAt: { type: Date, default: null },
    lastVisitedAt: { type: Date, default: null },
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
  // Devices this account has signed in from (used to detect new-device logins
  // and send a security email). Keyed by the client's X-Lingo-Device-Id.
  knownDevices: [{
    deviceId:  { type: String },
    userAgent: { type: String, default: null },
    ip:        { type: String, default: null },
    country:   { type: String, default: null },
    city:      { type: String, default: null },
    firstSeen: { type: Date, default: Date.now },
    lastSeen:  { type: Date, default: Date.now },
  }],
  pushTokens: [{
    token:     { type: String, required: true },
    deviceId:  { type: String, default: '' },
    platform:  { type: String, enum: ['ios', 'android', 'unknown'], default: 'unknown' },
    createdAt: { type: Date, default: Date.now },
    lastSeen:  { type: Date, default: Date.now },
  }],
  // When the last "welcome back" login-notification email was sent. Throttled
  // to at most once per 30 days; other email types are not affected.
  lastLoginNotificationAt: { type: Date, default: null },
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

  if (this.subscriptionContext?.type === 'personal') {
    this.subscriptionContext.organizationId = null;
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
