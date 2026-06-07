const { TIERS, DAILY_AI_TOKEN_LIMITS } = require('./subscription');
const { getTestingEntitlements } = require('./subscription');

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
    name: 'Premium',
    tagline: 'Everything in Pro, ready for premium learning tools.',
    monthlyPriceCents: 4999,
    annualPriceCents: 49990,
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

// Institutional plans are NOT subscriptions. Each "seat" is a single-use
// 30-day learner voucher; once allocated to a learner it counts down for
// 30 days then expires permanently. Institutions buy packs of seats up
// front and top up whenever the wallet runs low. `pricePerSeatCents` is
// the base per-seat price; `bulkPricing` is the discount ladder by pack
// size. Pricing falls back to the base when no bulk tier applies.
//
// Seat pricing is DERIVED from the matching individual monthly plan, not
// hand-set, via `buildInstitutionalLadder`:
//   - 2-digit seat counts (10-99) cost the individual monthly price less
//     10% (the "2-digit base").
//   - Each additional seat-count digit compounds another 5% reduction off
//     the PREVIOUS tier's per-seat price (×0.95 per digit, not additive).
//   - The per-seat price is floored at 80% of the 2-digit base, so the
//     deepest discount is 20% below that base no matter how large the pack.
const INSTITUTIONAL_TWO_DIGIT_DISCOUNT = 0.10; // 10% off the individual monthly price at 10-99 seats
const INSTITUTIONAL_PER_DIGIT_DISCOUNT = 0.05; // compounding reduction per extra seat-count digit
const INSTITUTIONAL_MAX_DISCOUNT_FROM_BASE = 0.20; // floor: never more than 20% below the 2-digit base

function individualMonthlyCentsForTier(tier) {
  const plan = INDIVIDUAL_PLANS.find(p => p.tier === tier);
  return plan ? plan.monthlyPriceCents : null;
}

// Build the per-seat discount ladder for an institutional plan from the
// matching individual monthly price. Returns tiers keyed by `minSeats` at
// each digit boundary (10, 100, 1000, …) until the discount floor is hit.
function buildInstitutionalLadder(baseMonthlyCents) {
  if (!baseMonthlyCents) return [];
  const twoDigitBase = baseMonthlyCents * (1 - INSTITUTIONAL_TWO_DIGIT_DISCOUNT);
  const floorCents = twoDigitBase * (1 - INSTITUTIONAL_MAX_DISCOUNT_FROM_BASE);
  const ladder = [];
  for (let digits = 2; digits <= 12; digits += 1) {
    const raw = twoDigitBase * Math.pow(1 - INSTITUTIONAL_PER_DIGIT_DISCOUNT, digits - 2);
    const capped = Math.max(raw, floorCents);
    ladder.push({ minSeats: 10 ** (digits - 1), pricePerSeatCents: Math.round(capped) });
    if (capped <= floorCents) break; // floor reached; deeper tiers are identical
  }
  return ladder;
}

function buildInstitutionalPlan(plan) {
  const ladder = buildInstitutionalLadder(individualMonthlyCentsForTier(plan.tier));
  return {
    ...plan,
    pricePerSeatCents: ladder.length > 0 ? ladder[0].pricePerSeatCents : null,
    bulkPricing: ladder,
  };
}

const INSTITUTIONAL_PLANS = Object.freeze([
  buildInstitutionalPlan({
    id: 'institution_basic',
    tier: TIERS.PLUS,
    audience: 'institution',
    name: 'Institution Plus',
    tagline: 'Seat packs for groups that need guided learning and practice.',
    minimumSeats: 10,
    features: [
      PLAN_FEATURES.organizationSeats,
      PLAN_FEATURES.classLessons,
      PLAN_FEATURES.conversation,
      PLAN_FEATURES.deviceMemory,
      PLAN_FEATURES.manualInvoice,
    ],
  }),
  buildInstitutionalPlan({
    id: 'institution_pro',
    tier: TIERS.PRO,
    audience: 'institution',
    name: 'Institution Pro',
    tagline: 'Seat packs with synced learner memory, reports, and class tools.',
    minimumSeats: 10,
    features: [
      PLAN_FEATURES.organizationSeats,
      PLAN_FEATURES.classroomTools,
      PLAN_FEATURES.progressReports,
      PLAN_FEATURES.syncedMemory,
      PLAN_FEATURES.learningPersonalization,
      PLAN_FEATURES.manualInvoice,
    ],
  }),
  buildInstitutionalPlan({
    id: 'institution_enterprise',
    tier: TIERS.ULTRA,
    audience: 'institution',
    name: 'Institution Premium',
    tagline: 'Custom seat packs with premium onboarding and commercial terms.',
    minimumSeats: 10,
    features: [
      PLAN_FEATURES.organizationSeats,
      PLAN_FEATURES.classroomTools,
      PLAN_FEATURES.progressReports,
      PLAN_FEATURES.learningPersonalization,
      PLAN_FEATURES.prioritySupport,
      PLAN_FEATURES.customOnboarding,
      PLAN_FEATURES.manualInvoice,
    ],
  }),
]);

function getSeatPackPrice(plan, quantity) {
  if (!plan || plan.audience !== 'institution') return null;
  const qty = Math.max(1, Math.floor(Number(quantity) || 0));
  if (!qty) return null;
  if (plan.pricePerSeatCents == null) {
    return { quantity: qty, pricePerSeatCents: null, totalCents: null, tierApplied: null };
  }
  const ladder = Array.isArray(plan.bulkPricing) && plan.bulkPricing.length > 0
    ? [...plan.bulkPricing].sort((a, b) => (a.minSeats || 0) - (b.minSeats || 0))
    : [{ minSeats: 1, pricePerSeatCents: plan.pricePerSeatCents }];
  let tier = ladder[0];
  for (const step of ladder) {
    if (qty >= (step.minSeats || 0)) tier = step;
  }
  const pricePerSeatCents = tier?.pricePerSeatCents ?? plan.pricePerSeatCents;
  return {
    quantity: qty,
    pricePerSeatCents,
    totalCents: pricePerSeatCents * qty,
    tierApplied: tier?.minSeats || 1,
  };
}

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
    // Institutions purchase one-time seat packs; price is per-seat.
    return plan.pricePerSeatCents;
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
    'pricePerSeatCents',
    'bulkPricing',
    'minimumSeats',
    'stripeMonthlyPriceId',
    'stripeAnnualPriceId',
    'stripeSeatPackPriceId',
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
    pricePerSeatCents: plan.pricePerSeatCents,
    bulkPricing: Array.isArray(plan.bulkPricing) ? plan.bulkPricing : [],
    minimumSeats: plan.minimumSeats,
    dailyConversationTokens: plan.dailyConversationTokens,
    entitlements: getTestingEntitlements(plan.tier),
    features: plan.features,
    pricingOverrideActive: !!plan.pricingOverrideActive,
    webConfigured: plan.audience === 'individual'
      ? Boolean(providerPriceFor(plan, 'monthly', BILLING_SOURCES.WEB) || plan.monthlyPriceCents === 0)
      : Boolean(plan.pricePerSeatCents),
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
  getSeatPackPrice,
  providerPriceFor,
  priceCentsFor,
  applyPlanOverride,
  publicPlan,
};
