const TIERS = Object.freeze({
  FREE: 'free',
  PLUS: 'plus',
  PRO: 'pro',
  ULTRA: 'ultra',
});

const DAILY_AI_TOKEN_LIMITS = Object.freeze({
  [TIERS.FREE]: 5_000,
  [TIERS.PLUS]: 100_000,
  [TIERS.PRO]: 1_000_000,
  [TIERS.ULTRA]: 10_000_000,
});

const PLACEMENT_TEST_LIMITS = Object.freeze({
  [TIERS.FREE]: { limit: 1, period: 'lifetime' },
  [TIERS.PLUS]: { limit: 2, period: 'month' },
  [TIERS.PRO]: { limit: 5, period: 'month' },
  [TIERS.ULTRA]: { limit: 10, period: 'month' },
});

const PROFICIENCY_TEST_INCLUDED_LIMITS = Object.freeze({
  [TIERS.FREE]: 0,
  [TIERS.PLUS]: 0,
  [TIERS.PRO]: 1,
  [TIERS.ULTRA]: 5,
});

const PROFICIENCY_TEST_PRICE_CENTS = 1000;

const TIER_RANK = Object.freeze({
  [TIERS.FREE]: 0,
  [TIERS.PLUS]: 1,
  [TIERS.PRO]: 2,
  [TIERS.ULTRA]: 3,
});

const ACTIVE_SUBSCRIPTION_STATUSES = new Set(['active', 'trialing']);

function isProOrUltraTier(tier) {
  const normalizedTier = String(tier || '').toLowerCase();
  return normalizedTier === TIERS.PRO || normalizedTier === TIERS.ULTRA;
}

function normalizeTier(tier, fallback = TIERS.FREE) {
  const normalized = String(tier || '').toLowerCase();
  return Object.values(TIERS).includes(normalized) ? normalized : fallback;
}

function isFutureDate(value) {
  if (!value) return true;
  const date = value instanceof Date ? value : new Date(value);
  return !Number.isNaN(date.getTime()) && date.getTime() > Date.now();
}

function isActiveStatus(status) {
  return ACTIVE_SUBSCRIPTION_STATUSES.has(String(status || '').toLowerCase());
}

function bestTier(...tiers) {
  return tiers
    .map(tier => normalizeTier(tier, TIERS.FREE))
    .sort((a, b) => (TIER_RANK[b] || 0) - (TIER_RANK[a] || 0))[0] || TIERS.FREE;
}

function activePersonalTier(user) {
  const sub = user?.personalSubscription || {};
  if (!sub.tier || !isActiveStatus(sub.status) || !isFutureDate(sub.currentPeriodEnd)) return null;
  return normalizeTier(sub.tier, null);
}

function activeInstitutionTier(user) {
  const access = user?.institutionalAccess || {};
  // Orgs no longer have a recurring billing period; access.expiresAt may be
  // null. The org's active/cancelled state is captured by access.status,
  // which mirrors Organization.status.
  if (!access.effectiveTier || !isActiveStatus(access.status)) return null;
  // Learners must additionally have a live seat. Managers (owner/admin/teacher)
  // are not seat-gated.
  if (access.role === 'learner') {
    const seatLive = (access.seatStatus === 'active' || access.seatStatus === 'suspended')
      && isFutureDate(access.seatExpiresAt);
    if (!seatLive) return null;
  }
  return normalizeTier(access.effectiveTier, null);
}

function activeOverrideTier(user) {
  const override = user?.billingOverride || {};
  if (!override.tier || !isActiveStatus(override.status) || !isFutureDate(override.expiresAt)) return null;
  return normalizeTier(override.tier, null);
}

function getEffectiveSubscriptionTier(user) {
  if (!user) return TIERS.FREE;
  if (user.role === 'admin') return TIERS.PRO;
  return bestTier(
    activeOverrideTier(user),
    activeInstitutionTier(user),
    activePersonalTier(user),
    user.subscriptionTier || TIERS.PLUS,
  );
}

function getBillingSource(user) {
  if (!user) return 'none';
  if (user.role === 'admin') return 'admin';
  if (activeOverrideTier(user)) return 'manual';
  if (activeInstitutionTier(user)) return 'institution';
  if (activePersonalTier(user)) return user.personalSubscription?.source || 'web';
  return 'default';
}

function getSubscriptionSummary(user) {
  const subscriptionTier = getEffectiveSubscriptionTier(user);
  return {
    subscriptionTier,
    billingSource: getBillingSource(user),
    personalSubscription: user?.personalSubscription || null,
    institutionalAccess: user?.institutionalAccess || null,
    billingOverride: user?.billingOverride || null,
  };
}

function getDailyAiTokenLimit(tier) {
  const normalizedTier = String(tier || TIERS.FREE).toLowerCase();
  return DAILY_AI_TOKEN_LIMITS[normalizedTier] || DAILY_AI_TOKEN_LIMITS[TIERS.FREE];
}

function getPlacementTestLimit(tier) {
  const normalizedTier = normalizeTier(tier, TIERS.FREE);
  return PLACEMENT_TEST_LIMITS[normalizedTier] || PLACEMENT_TEST_LIMITS[TIERS.FREE];
}

function getProficiencyTestIncludedLimit(tier) {
  const normalizedTier = normalizeTier(tier, TIERS.FREE);
  return PROFICIENCY_TEST_INCLUDED_LIMITS[normalizedTier] ?? PROFICIENCY_TEST_INCLUDED_LIMITS[TIERS.FREE];
}

function getTestingEntitlements(tier) {
  const normalizedTier = normalizeTier(tier, TIERS.FREE);
  const placement = getPlacementTestLimit(normalizedTier);
  return {
    subscriptionTier: normalizedTier,
    placementTests: {
      limit: placement.limit,
      period: placement.period,
    },
    proficiencyTests: {
      included: getProficiencyTestIncludedLimit(normalizedTier),
      period: 'month',
      paidPriceCents: PROFICIENCY_TEST_PRICE_CENTS,
    },
    dailyConversationTokens: getDailyAiTokenLimit(normalizedTier),
  };
}

function getPublicTokenUsage(tokenUsage = {}) {
  if (!tokenUsage) return null;
  return {
    quotaExceeded: Boolean(tokenUsage.quotaExceeded),
    resetAt: tokenUsage.resetAt,
    resetInMs: tokenUsage.resetInMs,
    dateKey: tokenUsage.dateKey,
  };
}

function getAiEntitlements(user, tokenUsage = null) {
  const subscriptionTier = getEffectiveSubscriptionTier(user);
  const subscriptionSummary = getSubscriptionSummary(user);
  const hasCloudFeatures = isProOrUltraTier(subscriptionTier);
  const entitlements = {
    subscriptionTier,
    billingSource: subscriptionSummary.billingSource,
    canUseAI: true,
    canSyncAIMemory: hasCloudFeatures,
    canUsePracticeContext: hasCloudFeatures,
    canUseClassLessons: true,
    canUseWritingPractice: true,
    canUseConversation: true,
    canManageOrganization: ['institution', 'manual'].includes(subscriptionSummary.billingSource)
      && ['owner', 'admin', 'teacher'].includes(String(user?.institutionalAccess?.role || '')),
    aiMemoryScope: hasCloudFeatures ? 'cloud' : subscriptionTier === TIERS.PLUS ? 'device' : 'none',
    testing: getTestingEntitlements(subscriptionTier),
    subscription: subscriptionSummary,
  };

  if (tokenUsage) {
    entitlements.tokenUsage = getPublicTokenUsage(tokenUsage);
    entitlements.canSendAI = !tokenUsage.quotaExceeded;
  }

  return entitlements;
}

module.exports = {
  TIERS,
  DAILY_AI_TOKEN_LIMITS,
  PLACEMENT_TEST_LIMITS,
  PROFICIENCY_TEST_INCLUDED_LIMITS,
  PROFICIENCY_TEST_PRICE_CENTS,
  TIER_RANK,
  ACTIVE_SUBSCRIPTION_STATUSES,
  isProOrUltraTier,
  normalizeTier,
  isActiveStatus,
  bestTier,
  getEffectiveSubscriptionTier,
  getBillingSource,
  getSubscriptionSummary,
  getAiEntitlements,
  getDailyAiTokenLimit,
  getPlacementTestLimit,
  getProficiencyTestIncludedLimit,
  getTestingEntitlements,
  getPublicTokenUsage,
};
