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
  [TIERS.ULTRA]: 1_000_000,
});

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
  if (!access.effectiveTier || !isActiveStatus(access.status) || !isFutureDate(access.expiresAt)) return null;
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
  getPublicTokenUsage,
};
