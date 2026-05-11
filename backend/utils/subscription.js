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

function isProOrUltraTier(tier) {
  const normalizedTier = String(tier || '').toLowerCase();
  return normalizedTier === TIERS.PRO || normalizedTier === TIERS.ULTRA;
}

function getEffectiveSubscriptionTier(user) {
  if (!user) return TIERS.FREE;
  if (user.role === 'admin') return TIERS.PRO;
  return user.subscriptionTier || TIERS.PLUS;
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
  const hasCloudFeatures = isProOrUltraTier(subscriptionTier);
  const entitlements = {
    subscriptionTier,
    canUseAI: true,
    canSyncAIMemory: hasCloudFeatures,
    canUsePracticeContext: hasCloudFeatures,
    aiMemoryScope: hasCloudFeatures ? 'cloud' : subscriptionTier === TIERS.PLUS ? 'device' : 'none',
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
  isProOrUltraTier,
  getEffectiveSubscriptionTier,
  getAiEntitlements,
  getDailyAiTokenLimit,
  getPublicTokenUsage,
};
