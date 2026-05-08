const TIERS = Object.freeze({
  FREE: 'free',
  PLUS: 'plus',
  PRO: 'pro',
});

const DAILY_AI_TOKEN_LIMITS = Object.freeze({
  [TIERS.FREE]: 5_000,
  [TIERS.PLUS]: 100_000,
  [TIERS.PRO]: 1_000_000,
});

function getEffectiveSubscriptionTier(user) {
  if (!user) return TIERS.FREE;
  if (user.role === 'admin') return TIERS.PRO;
  return user.subscriptionTier || TIERS.PLUS;
}

function getDailyAiTokenLimit(tier) {
  return DAILY_AI_TOKEN_LIMITS[tier] || DAILY_AI_TOKEN_LIMITS[TIERS.FREE];
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
  const entitlements = {
    subscriptionTier,
    canUseAI: true,
    canSyncAIMemory: subscriptionTier === TIERS.PRO,
    aiMemoryScope: subscriptionTier === TIERS.PRO ? 'cloud' : subscriptionTier === TIERS.PLUS ? 'device' : 'none',
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
  getEffectiveSubscriptionTier,
  getAiEntitlements,
  getDailyAiTokenLimit,
  getPublicTokenUsage,
};
