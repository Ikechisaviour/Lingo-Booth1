const { TIERS, DAILY_AI_TOKEN_LIMITS } = require('./subscription');

const BILLING_SOURCES = Object.freeze({
  WEB: 'web',
  IOS: 'ios',
  ANDROID: 'android',
  MANUAL: 'manual',
  INSTITUTION: 'institution',
});

const SUBSCRIPTION_STATUSES = Object.freeze({
  ACTIVE: 'active',
  TRIALING: 'trialing',
  PAST_DUE: 'past_due',
  CANCELLED: 'cancelled',
  INCOMPLETE: 'incomplete',
  SETUP_REQUIRED: 'setup_required',
});

const PLAN_FEATURES = Object.freeze({
  conversation: 'conversation',
  deviceMemory: 'deviceMemory',
  syncedMemory: 'syncedMemory',
  learningPersonalization: 'learningPersonalization',
  classLessons: 'classLessons',
  writingPractice: 'writingPractice',
  familySeats: 'familySeats',
  organizationSeats: 'organizationSeats',
  classroomTools: 'classroomTools',
  progressReports: 'progressReports',
  manualInvoice: 'manualInvoice',
  prioritySupport: 'prioritySupport',
  customOnboarding: 'customOnboarding',
});

const INDIVIDUAL_PLANS = Object.freeze([
  {
    id: TIERS.FREE,
    tier: TIERS.FREE,
    audience: 'individual',
    name: 'Free',
    tagline: 'Try the learning loop with daily limits.',
    monthlyPriceCents: 0,
    annualPriceCents: 0,
    dailyConversationTokens: DAILY_AI_TOKEN_LIMITS[TIERS.FREE],
    features: [
      PLAN_FEATURES.conversation,
      PLAN_FEATURES.classLessons,
      PLAN_FEATURES.writingPractice,
    ],
    providerKeys: {
      stripeMonthly: 'STRIPE_PRICE_FREE_MONTHLY',
      stripeAnnual: 'STRIPE_PRICE_FREE_ANNUAL',
      appleMonthly: 'IOS_PRODUCT_FREE_MONTHLY',
      appleAnnual: 'IOS_PRODUCT_FREE_ANNUAL',
      googleMonthly: 'ANDROID_PRODUCT_FREE_MONTHLY',
      googleAnnual: 'ANDROID_PRODUCT_FREE_ANNUAL',
    },
  },
  {
    id: TIERS.PLUS,
    tier: TIERS.PLUS,
    audience: 'individual',
    name: 'Plus',
    tagline: 'More daily conversation and device memory.',
    monthlyPriceCents: 999,
    annualPriceCents: 9990,
    dailyConversationTokens: DAILY_AI_TOKEN_LIMITS[TIERS.PLUS],
    features: [
      PLAN_FEATURES.conversation,
      PLAN_FEATURES.deviceMemory,
      PLAN_FEATURES.classLessons,
      PLAN_FEATURES.writingPractice,
    ],
    providerKeys: {
      stripeMonthly: 'STRIPE_PRICE_PLUS_MONTHLY',
      stripeAnnual: 'STRIPE_PRICE_PLUS_ANNUAL',
      appleMonthly: 'IOS_PRODUCT_PLUS_MONTHLY',
      appleAnnual: 'IOS_PRODUCT_PLUS_ANNUAL',
      googleMonthly: 'ANDROID_PRODUCT_PLUS_MONTHLY',
      googleAnnual: 'ANDROID_PRODUCT_PLUS_ANNUAL',
    },
  },
  {
    id: TIERS.PRO,
    tier: TIERS.PRO,
    audience: 'individual',
    name: 'Pro',
    tagline: 'Synced memory and personalization for serious learners.',
    monthlyPriceCents: 1999,
    annualPriceCents: 19990,
    dailyConversationTokens: DAILY_AI_TOKEN_LIMITS[TIERS.PRO],
    features: [
      PLAN_FEATURES.conversation,
      PLAN_FEATURES.deviceMemory,
      PLAN_FEATURES.syncedMemory,
      PLAN_FEATURES.learningPersonalization,
      PLAN_FEATURES.classLessons,
      PLAN_FEATURES.writingPractice,
    ],
    providerKeys: {
      stripeMonthly: 'STRIPE_PRICE_PRO_MONTHLY',
      stripeAnnual: 'STRIPE_PRICE_PRO_ANNUAL',
      appleMonthly: 'IOS_PRODUCT_PRO_MONTHLY',
      appleAnnual: 'IOS_PRODUCT_PRO_ANNUAL',
      googleMonthly: 'ANDROID_PRODUCT_PRO_MONTHLY',
      googleAnnual: 'ANDROID_PRODUCT_PRO_ANNUAL',
    },
  },
  {
    id: TIERS.ULTRA,
    tier: TIERS.ULTRA,
    audience: 'individual',
    name: 'Ultra',
    tagline: 'Everything in Pro, ready for future premium learning tools.',
    monthlyPriceCents: 2999,
    annualPriceCents: 29990,
    dailyConversationTokens: DAILY_AI_TOKEN_LIMITS[TIERS.ULTRA],
    features: [
      PLAN_FEATURES.conversation,
      PLAN_FEATURES.deviceMemory,
      PLAN_FEATURES.syncedMemory,
      PLAN_FEATURES.learningPersonalization,
      PLAN_FEATURES.classLessons,
      PLAN_FEATURES.writingPractice,
      PLAN_FEATURES.prioritySupport,
    ],
    providerKeys: {
      stripeMonthly: 'STRIPE_PRICE_ULTRA_MONTHLY',
      stripeAnnual: 'STRIPE_PRICE_ULTRA_ANNUAL',
      appleMonthly: 'IOS_PRODUCT_ULTRA_MONTHLY',
      appleAnnual: 'IOS_PRODUCT_ULTRA_ANNUAL',
      googleMonthly: 'ANDROID_PRODUCT_ULTRA_MONTHLY',
      googleAnnual: 'ANDROID_PRODUCT_ULTRA_ANNUAL',
    },
  },
]);

const INSTITUTIONAL_PLANS = Object.freeze([
  {
    id: 'institution_basic',
    tier: TIERS.PLUS,
    audience: 'institution',
    name: 'Institution Basic',
    tagline: 'Seats for groups that need guided learning and practice.',
    minimumSeats: 10,
    seatPriceMonthlyCents: 799,
    seatPriceAnnualCents: 7990,
    features: [
      PLAN_FEATURES.organizationSeats,
      PLAN_FEATURES.classLessons,
      PLAN_FEATURES.conversation,
      PLAN_FEATURES.deviceMemory,
      PLAN_FEATURES.manualInvoice,
    ],
  },
  {
    id: 'institution_pro',
    tier: TIERS.PRO,
    audience: 'institution',
    name: 'Institution Pro',
    tagline: 'Synced learner memory, reports, and class management.',
    minimumSeats: 25,
    seatPriceMonthlyCents: 1299,
    seatPriceAnnualCents: 12990,
    features: [
      PLAN_FEATURES.organizationSeats,
      PLAN_FEATURES.classroomTools,
      PLAN_FEATURES.progressReports,
      PLAN_FEATURES.syncedMemory,
      PLAN_FEATURES.learningPersonalization,
      PLAN_FEATURES.manualInvoice,
    ],
  },
  {
    id: 'institution_enterprise',
    tier: TIERS.ULTRA,
    audience: 'institution',
    name: 'Institution Enterprise',
    tagline: 'Custom onboarding, reporting, and commercial terms.',
    minimumSeats: 100,
    seatPriceMonthlyCents: null,
    seatPriceAnnualCents: null,
    features: [
      PLAN_FEATURES.organizationSeats,
      PLAN_FEATURES.classroomTools,
      PLAN_FEATURES.progressReports,
      PLAN_FEATURES.learningPersonalization,
      PLAN_FEATURES.prioritySupport,
      PLAN_FEATURES.customOnboarding,
      PLAN_FEATURES.manualInvoice,
    ],
  },
]);

const ALL_PLANS = Object.freeze([...INDIVIDUAL_PLANS, ...INSTITUTIONAL_PLANS]);

function getPlan(planId) {
  const normalized = String(planId || '').toLowerCase();
  return ALL_PLANS.find(plan => plan.id === normalized || plan.tier === normalized) || null;
}

function getIndividualPlan(planId) {
  const plan = getPlan(planId);
  return plan?.audience === 'individual' ? plan : null;
}

function getInstitutionalPlan(planId) {
  const plan = getPlan(planId);
  return plan?.audience === 'institution' ? plan : null;
}

function providerPriceFor(plan, interval = 'monthly', provider = BILLING_SOURCES.WEB) {
  if (provider === BILLING_SOURCES.WEB) {
    const overridePriceId = interval === 'annual'
      ? plan.stripeAnnualPriceId
      : plan.stripeMonthlyPriceId;
    if (overridePriceId) return overridePriceId;
  }
  if (!plan?.providerKeys) return '';
  const cadence = interval === 'annual' ? 'Annual' : 'Monthly';
  const providerPrefix = provider === BILLING_SOURCES.IOS
    ? 'apple'
    : provider === BILLING_SOURCES.ANDROID
      ? 'google'
      : 'stripe';
  const key = plan.providerKeys[`${providerPrefix}${cadence}`];
  return key ? process.env[key] || '' : '';
}

function priceCentsFor(plan, interval = 'monthly') {
  if (!plan) return null;
  if (plan.audience === 'institution') {
    return interval === 'annual' ? plan.seatPriceAnnualCents : plan.seatPriceMonthlyCents;
  }
  return interval === 'annual' ? plan.annualPriceCents : plan.monthlyPriceCents;
}

function applyPlanOverride(plan, override = null) {
  if (!plan || !override?.active) return plan;
  const fields = [
    'name',
    'tagline',
    'monthlyPriceCents',
    'annualPriceCents',
    'seatPriceMonthlyCents',
    'seatPriceAnnualCents',
    'minimumSeats',
    'stripeMonthlyPriceId',
    'stripeAnnualPriceId',
  ];
  const merged = { ...plan, pricingOverrideActive: true };
  fields.forEach((field) => {
    if (override[field] !== undefined && override[field] !== null && override[field] !== '') {
      merged[field] = override[field];
    }
  });
  return merged;
}

function publicPlan(plan) {
  return {
    id: plan.id,
    tier: plan.tier,
    audience: plan.audience,
    name: plan.name,
    tagline: plan.tagline,
    monthlyPriceCents: plan.monthlyPriceCents,
    annualPriceCents: plan.annualPriceCents,
    seatPriceMonthlyCents: plan.seatPriceMonthlyCents,
    seatPriceAnnualCents: plan.seatPriceAnnualCents,
    minimumSeats: plan.minimumSeats,
    dailyConversationTokens: plan.dailyConversationTokens,
    features: plan.features,
    pricingOverrideActive: !!plan.pricingOverrideActive,
    webConfigured: plan.audience === 'individual'
      ? Boolean(providerPriceFor(plan, 'monthly', BILLING_SOURCES.WEB) || plan.monthlyPriceCents === 0)
      : false,
    mobileConfigured: plan.audience === 'individual'
      ? Boolean(
        providerPriceFor(plan, 'monthly', BILLING_SOURCES.IOS)
        || providerPriceFor(plan, 'monthly', BILLING_SOURCES.ANDROID)
        || plan.monthlyPriceCents === 0
      )
      : false,
  };
}

module.exports = {
  BILLING_SOURCES,
  SUBSCRIPTION_STATUSES,
  PLAN_FEATURES,
  INDIVIDUAL_PLANS,
  INSTITUTIONAL_PLANS,
  ALL_PLANS,
  getPlan,
  getIndividualPlan,
  getInstitutionalPlan,
  providerPriceFor,
  priceCentsFor,
  applyPlanOverride,
  publicPlan,
};
