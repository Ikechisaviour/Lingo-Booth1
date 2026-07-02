const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../models/User');
const Organization = require('../models/Organization');
const OrganizationMembership = require('../models/OrganizationMembership');
const SubscriptionRecord = require('../models/SubscriptionRecord');
const BillingEvent = require('../models/BillingEvent');
const InstitutionalLead = require('../models/InstitutionalLead');
const BillingPlanOverride = require('../models/BillingPlanOverride');
const DiscountCode = require('../models/DiscountCode');
const Progress = require('../models/Progress');
const ClassLessonProgress = require('../models/ClassLessonProgress');
const InstitutionGroup = require('../models/InstitutionGroup');
const LevelTestAttempt = require('../models/LevelTestAttempt');
const LevelTestCredit = require('../models/LevelTestCredit');
const CompletionCertificate = require('../models/CompletionCertificate');
const ReferralLink = require('../models/ReferralLink');
const { verifyToken, optionalAuth, isAdmin, requireRecentAuth } = require('../middleware/auth');
const { getClientIp } = require('../utils/geo');
const { ALL_TARGET_LANGUAGES, cleanLanguageList } = require('../utils/learningContext');
const { setSubscriptionContextForUser, syncInstitutionAccessForUser } = require('../utils/institutionAccess');
const { sendServerError, sendClientError } = require('../utils/sendError');
const {
  getAiEntitlements,
  getSubscriptionSummary,
  isActiveStatus,
  normalizeTier,
  PROFICIENCY_TEST_PRICE_CENTS,
} = require('../utils/subscription');
const seats = require('../utils/seats');
const {
  createNotification,
  notifyInstitutionAccess,
  notifyInstitutionAccessRemoved,
  notifyInstitutionRequestStatus,
  notifyInstitutionStatusChanged,
  notifyOrganizationManagers,
  notifySeatThresholdIfNeeded,
} = require('../utils/notifications');
const {
  BILLING_SOURCES,
  INDIVIDUAL_PLANS,
  INSTITUTIONAL_PLANS,
  getIndividualPlan,
  getInstitutionalPlan,
  getSeatPackPrice,
  providerPriceFor,
  priceCentsFor,
  applyPlanOverride,
  publicPlan,
} = require('../utils/billingPlans');

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ORG_TYPES = ['school', 'company', 'religious', 'church', 'language_center', 'nonprofit', 'government', 'other'];
const ORG_STATUSES = ['lead', 'trialing', 'active', 'past_due', 'cancelled', 'suspended'];
const ORG_ROLES = ['owner', 'admin', 'teacher', 'learner'];
const ORG_MANAGER_ROLES = ['owner', 'admin'];
const ORG_OVERSIGHT_ROLES = ['owner', 'admin', 'teacher'];
const DISCOUNT_TYPES = ['percent', 'fixed'];
const DISCOUNT_AUDIENCES = ['all', 'individual', 'institution'];
const DISCOUNT_APPLICATION_MODES = ['code', 'automatic'];
const CERTIFICATE_LOGO_MAX_BYTES = 600 * 1024;
const CERTIFICATE_LOGO_URL_MAX_LENGTH = 1200;
const CERTIFICATE_LOGO_DATA_URL_MAX_LENGTH = 900000;
const CERTIFICATE_LOGO_MIME_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']);
const CERTIFICATE_LOGO_MIME_ALIASES = {
  'image/x-png': 'image/png',
  'image/pjpeg': 'image/jpeg',
};

function cleanText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function cleanLine(value, maxLength) {
  return cleanText(value, maxLength).replace(/[\r\n]+/g, ' ');
}

function certificateBrandingPayload(body = {}, userId) {
  if (body.removeLogo === true) {
    return {
      logoUrl: '',
      logoOriginalName: '',
      logoMimeType: '',
      logoUploadedAt: null,
      logoUpdatedBy: userId,
    };
  }

  const rawLogo = String(body.logoDataUrl || body.logoUrl || '').trim();
  if (!rawLogo) {
    const error = new Error('Choose a certificate logo before saving');
    error.statusCode = 400;
    throw error;
  }

  const dataUrlMatch = rawLogo.match(/^data:(image\/png|image\/x-png|image\/jpeg|image\/pjpeg|image\/webp|image\/gif|image\/svg\+xml);base64,([A-Za-z0-9+/=\s]+)$/);
  if (dataUrlMatch) {
    const mimeType = CERTIFICATE_LOGO_MIME_ALIASES[dataUrlMatch[1]] || dataUrlMatch[1];
    const base64 = dataUrlMatch[2].replace(/\s+/g, '');
    const byteLength = Buffer.byteLength(base64, 'base64');
    if (!CERTIFICATE_LOGO_MIME_TYPES.has(mimeType) || byteLength > CERTIFICATE_LOGO_MAX_BYTES) {
      const error = new Error('Certificate logo must be a PNG, JPG, WebP, GIF, or SVG image under 600 KB');
      error.statusCode = 400;
      throw error;
    }
    const logoUrl = `data:${mimeType};base64,${base64}`;
    if (logoUrl.length > CERTIFICATE_LOGO_DATA_URL_MAX_LENGTH) {
      const error = new Error('Certificate logo is too large');
      error.statusCode = 400;
      throw error;
    }
    return {
      logoUrl,
      logoOriginalName: cleanLine(body.logoOriginalName || body.fileName, 180),
      logoMimeType: mimeType,
      logoUploadedAt: new Date(),
      logoUpdatedBy: userId,
    };
  }

  if (/^https:\/\/[^\s]+$/i.test(rawLogo) && rawLogo.length <= CERTIFICATE_LOGO_URL_MAX_LENGTH) {
    return {
      logoUrl: rawLogo,
      logoOriginalName: cleanLine(body.logoOriginalName || 'Remote logo', 180),
      logoMimeType: 'image/remote',
      logoUploadedAt: new Date(),
      logoUpdatedBy: userId,
    };
  }

  const error = new Error('Certificate logo must be an HTTPS image URL or a PNG, JPG, WebP, GIF, or SVG data image');
  error.statusCode = 400;
  throw error;
}

function slugify(value) {
  const slug = String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return slug || `org-${Date.now()}`;
}

function setupMissingResponse(res, message, missing = []) {
  if (missing.length) {
    console.warn('Billing setup is incomplete:', missing.join(', '));
  }
  return res.status(202).json({
    requiresSetup: true,
    message,
  });
}

function cleanCents(value, { allowNull = true } = {}) {
  if (value === undefined || value === null || value === '') return allowNull ? null : 0;
  const cents = Math.round(Number(value));
  if (!Number.isFinite(cents) || cents < 0) return allowNull ? null : 0;
  return cents;
}

function cleanPositiveInt(value, fallback = null) {
  if (value === undefined || value === null || value === '') return fallback;
  const num = Math.round(Number(value));
  return Number.isFinite(num) && num > 0 ? num : fallback;
}

function cleanDateOrNull(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function discountCodeValue(value) {
  return cleanLine(value, 40).toUpperCase().replace(/[^A-Z0-9_-]/g, '');
}

async function planOverridesById() {
  const overrides = await BillingPlanOverride.find({ active: true }).lean();
  return new Map(overrides.map((override) => [override.planId, override]));
}

async function activeAutomaticDiscounts() {
  return DiscountCode.find({
    active: true,
    applicationMode: 'automatic',
  }).sort({ createdAt: -1 }).lean();
}

async function publicPlansWithOverrides() {
  const [overrides, automaticDiscounts] = await Promise.all([
    planOverridesById(),
    activeAutomaticDiscounts(),
  ]);
  return {
    individual: INDIVIDUAL_PLANS.map((plan) => publicPlanWithAutomaticDiscounts(applyPlanOverride(plan, overrides.get(plan.id)), automaticDiscounts)),
    institutional: INSTITUTIONAL_PLANS.map((plan) => publicPlanWithAutomaticDiscounts(applyPlanOverride(plan, overrides.get(plan.id)), automaticDiscounts)),
  };
}

async function effectiveIndividualPlan(planId) {
  const basePlan = getIndividualPlan(planId);
  if (!basePlan) return null;
  const override = await BillingPlanOverride.findOne({ planId: basePlan.id, active: true }).lean();
  return applyPlanOverride(basePlan, override);
}

async function effectiveInstitutionalPlan(planId, fallback = 'institution_basic') {
  const basePlan = getInstitutionalPlan(planId) || getInstitutionalPlan(fallback);
  if (!basePlan) return null;
  const override = await BillingPlanOverride.findOne({ planId: basePlan.id, active: true }).lean();
  return applyPlanOverride(basePlan, override);
}

function discountIsAvailable(discount, plan) {
  if (!discount?.active || !plan) return false;
  const now = Date.now();
  if (discount.startsAt && new Date(discount.startsAt).getTime() > now) return false;
  if (discount.expiresAt && new Date(discount.expiresAt).getTime() < now) return false;
  if (discount.maxRedemptions && discount.redemptions >= discount.maxRedemptions) return false;
  if (discount.appliesToAudience !== 'all' && discount.appliesToAudience !== plan.audience) return false;
  if (Array.isArray(discount.appliesToPlanIds) && discount.appliesToPlanIds.length > 0) {
    return discount.appliesToPlanIds.includes(plan.id);
  }
  return true;
}

async function validateDiscountForPlan(code, plan) {
  const normalizedCode = discountCodeValue(code);
  if (!normalizedCode) return null;
  const discount = await DiscountCode.findOne({
    code: normalizedCode,
    applicationMode: { $ne: 'automatic' },
  }).lean();
  if (!discount || !discountIsAvailable(discount, plan)) return null;
  return discount;
}

function discountedAmountCents(amountCents, discount) {
  if (!discount || !Number.isFinite(amountCents)) return amountCents;
  if (discount.discountType === 'percent') {
    const percent = Math.min(Math.max(Number(discount.percentOff || 0), 0), 100);
    return Math.max(Math.round(amountCents * (1 - percent / 100)), 0);
  }
  return Math.max(amountCents - Math.round(Number(discount.amountOffCents || 0)), 0);
}

function discountSavingsCents(amountCents, discount) {
  if (!discount || !Number.isFinite(amountCents)) return 0;
  return Math.max(amountCents - discountedAmountCents(amountCents, discount), 0);
}

function bestAutomaticDiscountForPlan(discounts, plan, interval = 'monthly') {
  const amountCents = priceCentsFor(plan, interval);
  if (!Number.isFinite(amountCents) || amountCents <= 0) return null;
  const eligible = (discounts || [])
    .filter((discount) => discount?.applicationMode === 'automatic' && discountIsAvailable(discount, plan))
    .map((discount) => ({
      discount,
      savings: discountSavingsCents(amountCents, discount),
      createdAt: discount.createdAt ? new Date(discount.createdAt).getTime() : 0,
    }))
    .filter((entry) => entry.savings > 0)
    .sort((a, b) => (b.savings - a.savings) || (b.createdAt - a.createdAt));
  return eligible[0]?.discount || null;
}

async function validateAutomaticDiscountForPlan(plan, interval = 'monthly') {
  const discounts = await activeAutomaticDiscounts();
  return bestAutomaticDiscountForPlan(discounts, plan, interval);
}

function publicDiscount(discount) {
  if (!discount) return null;
  return {
    _id: discount._id,
    code: discount.code,
    applicationMode: discount.applicationMode || 'code',
    requiresCode: (discount.applicationMode || 'code') !== 'automatic',
    active: !!discount.active,
    description: discount.description || '',
    discountType: discount.discountType,
    percentOff: discount.percentOff || null,
    amountOffCents: discount.amountOffCents || null,
    currency: discount.currency || 'usd',
    appliesToAudience: discount.appliesToAudience || 'all',
    appliesToPlanIds: discount.appliesToPlanIds || [],
    startsAt: discount.startsAt || null,
    expiresAt: discount.expiresAt || null,
    maxRedemptions: discount.maxRedemptions || null,
    redemptions: discount.redemptions || 0,
    stripePromotionCodeId: discount.stripePromotionCodeId || '',
    stripeCouponId: discount.stripeCouponId || '',
    notes: discount.notes || '',
    createdAt: discount.createdAt,
    updatedAt: discount.updatedAt,
  };
}

function publicAutomaticDiscount(discount) {
  const value = publicDiscount(discount);
  if (!value) return null;
  return {
    ...value,
    code: null,
  };
}

function publicPlanWithAutomaticDiscounts(plan, automaticDiscounts = []) {
  const value = publicPlan(plan);
  const monthlyDiscount = bestAutomaticDiscountForPlan(automaticDiscounts, plan, 'monthly');
  const annualDiscount = bestAutomaticDiscountForPlan(automaticDiscounts, plan, 'annual');

  if (monthlyDiscount) {
    value.automaticDiscountMonthly = publicAutomaticDiscount(monthlyDiscount);
    value.monthlyPriceCentsBeforeDiscount = value.monthlyPriceCents;
    value.discountedMonthlyPriceCents = discountedAmountCents(value.monthlyPriceCents, monthlyDiscount);
  }

  if (annualDiscount) {
    value.automaticDiscountAnnual = publicAutomaticDiscount(annualDiscount);
    value.annualPriceCentsBeforeDiscount = value.annualPriceCents;
    value.discountedAnnualPriceCents = discountedAmountCents(value.annualPriceCents, annualDiscount);
  }

  return value;
}

function frontendUrl(pathname) {
  const origin = process.env.FRONTEND_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:3000';
  return `${origin.replace(/\/$/, '')}${pathname}`;
}

function dateFromUnixSeconds(value) {
  return value ? new Date(Number(value) * 1000) : null;
}

function normalizeSubscriptionStatus(status) {
  const normalized = String(status || '').toLowerCase();
  if (['active', 'trialing', 'past_due', 'cancelled', 'incomplete', 'setup_required'].includes(normalized)) {
    return normalized;
  }
  if (normalized === 'canceled' || normalized === 'incomplete_expired') return 'cancelled';
  if (normalized === 'unpaid' || normalized === 'paused') return 'past_due';
  return 'incomplete';
}

function membershipCanManage(membership) {
  return membership?.status === 'active' && ORG_MANAGER_ROLES.includes(membership.role);
}

function membershipCanViewOrg(membership) {
  return membership?.status === 'active' && ORG_OVERSIGHT_ROLES.includes(membership.role);
}

function sanitizeMembership(membership) {
  const plain = typeof membership.toObject === 'function' ? membership.toObject() : membership;
  const user = plain.userId;
  return {
    ...plain,
    user: user && typeof user === 'object'
      ? {
        _id: user._id,
        username: user.username,
        email: user.email,
        totalXP: user.totalXP || 0,
        lastActive: user.lastActive || null,
        lastLogin: user.lastLogin || null,
        nativeLanguage: user.nativeLanguage || null,
        targetLanguage: user.targetLanguage || null,
        subscriptionTier: user.subscriptionTier || null,
        xpDecayEnabled: !!user.xpDecayEnabled,
      }
      : null,
    userId: user && typeof user === 'object' ? user._id : user,
  };
}

async function updateOrganizationSeatCount(organizationId) {
  const seatsUsed = await OrganizationMembership.countDocuments({
    organizationId,
    status: { $in: ['active', 'invited'] },
    $or: [
      { consumesSeat: true },
      { role: 'learner' },
    ],
  });
  await Organization.findByIdAndUpdate(organizationId, { $set: { seatsUsed } });
  return seatsUsed;
}

async function repairOwnerLearnerMemberships(userId = null, organizations = []) {
  const orgList = organizations.filter((org) => org?._id && org.ownerUserId);
  const ownedOrgIds = orgList
    .filter((org) => !userId || String(org.ownerUserId) === String(userId))
    .map((org) => org._id);
  if (ownedOrgIds.length === 0) return;

  const memberships = await OrganizationMembership.find({
    organizationId: { $in: ownedOrgIds },
    ...(userId ? { userId } : {}),
    role: 'learner',
    status: 'active',
  });

  await Promise.all(memberships.map(async (membership) => {
    const org = orgList.find((candidate) => String(candidate._id) === String(membership.organizationId));
    if (!org || String(org.ownerUserId) !== String(membership.userId)) return;
    membership.role = 'admin';
    membership.consumesSeat = false;
    await membership.save();
    await updateOrganizationSeatCount(org._id);
    await setUserInstitutionalAccess(membership.userId, org, membership);
  }));
}

async function syncActiveOrganizationMembers(org) {
  if (!org?._id) return;
  const activeMemberships = await OrganizationMembership.find({ organizationId: org._id, status: 'active' });
  await Promise.all(activeMemberships.map((membership) => (
    membership.userId
      ? setUserInstitutionalAccess(membership.userId, org, membership)
      : Promise.resolve()
  )));
}

async function setUserInstitutionalAccess(userId, org, membership) {
  if (!userId || !org || !membership) return;
  await User.findByIdAndUpdate(userId, {
    $set: {
      institutionalAccess: {
        organizationId: org._id,
        organizationName: org.name,
        planId: org.planId,
        effectiveTier: org.effectiveTier,
        role: membership.role,
        status: org.status,
        expiresAt: org.expiresAt || null,
        updatedAt: new Date(),
      },
    },
  });
}

async function clearUserInstitutionalAccess(userId, organizationId) {
  if (!userId || !organizationId) return;
  await User.updateOne(
    { _id: userId, 'institutionalAccess.organizationId': organizationId },
    {
      $set: {
        institutionalAccess: {
          organizationId: null,
          organizationName: null,
          planId: null,
          effectiveTier: null,
          role: null,
          status: null,
          expiresAt: null,
          updatedAt: new Date(),
        },
      },
    },
  );
}

async function upsertInstitutionAdminMembership({ org, user, role = 'admin', actorId = null }) {
  const email = String(user.email || '').toLowerCase();
  const membership = await OrganizationMembership.findOneAndUpdate(
    { organizationId: org._id, email },
    {
      $set: {
        userId: user._id,
        role,
        status: 'active',
        invitedBy: actorId || user._id,
        consumesSeat: false,
        joinedAt: new Date(),
      },
    },
    { new: true, upsert: true }
  );

  org.seatsUsed = await updateOrganizationSeatCount(org._id);
  await setUserInstitutionalAccess(user._id, org, membership);
  return membership;
}

async function createOrganizationForInstitution({
  name,
  type = 'other',
  plan,
  seats,
  billingEmail = '',
  ownerUserId = null,
  status = 'active',
  billingSource = 'manual',
  notes = '',
}) {
  const orgName = cleanLine(name, 180);
  if (!orgName) {
    const error = new Error('Organization name is required');
    error.statusCode = 400;
    throw error;
  }
  const seatCount = Math.max(parseInt(seats, 10) || plan.minimumSeats || 1, plan.minimumSeats || 1);
  return Organization.create({
    name: orgName,
    slug: `${slugify(orgName)}-${Date.now().toString(36)}`,
    type: ORG_TYPES.includes(type) ? type : 'other',
    planId: plan.id,
    effectiveTier: plan.tier,
    status,
    seatsPurchased: seatCount,
    billingSource,
    billingEmail: cleanLine(billingEmail, 254).toLowerCase(),
    ownerUserId,
    notes: cleanText(notes, 3000),
  });
}

async function acceptInstitutionalLead(lead, actorId) {
  const plan = await effectiveInstitutionalPlan(lead.planId, 'institution_pro');
  const user = lead.userId
    ? await User.findById(lead.userId)
    : await User.findOne({ email: lead.email });
  if (!user) {
    const error = new Error('The requester must create an account before this request can be accepted');
    error.statusCode = 400;
    throw error;
  }

  let org = lead.organizationId ? await Organization.findById(lead.organizationId) : null;
  if (!org) {
    org = await createOrganizationForInstitution({
      name: lead.organizationName,
      type: lead.organizationType,
      plan,
      seats: 0, // Seats land in the wallet via topUpSeats below, not at org creation.
      billingEmail: lead.email,
      ownerUserId: user._id,
      status: 'active',
      billingSource: 'manual',
      notes: lead.message,
    });
    // Reset seatsPurchased: createOrganizationForInstitution still applies
    // plan.minimumSeats as a floor; in the pack model the wallet starts at 0.
    await Organization.findByIdAndUpdate(org._id, { $set: { seatsPurchased: 0 } });
    org = await Organization.findById(org._id);
  } else {
    org.status = 'active';
    org.planId = plan.id;
    org.effectiveTier = plan.tier;
    org.ownerUserId = org.ownerUserId || user._id;
    await org.save();
  }

  // Grant the requested seat pack as a one-time manual top-up (recorded in history + BillingEvent).
  const requested = Math.max(parseInt(lead.seatsRequested, 10) || plan.minimumSeats || 1, 1);
  await seats.topUpSeats({
    orgId: org._id,
    quantity: requested,
    addedByUserId: actorId || user._id,
    source: 'lead_accept',
    note: `Granted on lead accept (${lead._id})`,
  });

  const membership = await upsertInstitutionAdminMembership({ org, user, role: 'admin', actorId });
  lead.status = 'accepted';
  lead.organizationId = org._id;
  lead.userId = user._id;
  lead.reviewedBy = actorId;
  lead.reviewedAt = new Date();
  await lead.save();
  return { org, user, membership };
}

async function findInstitutionMembership(userId, organizationId, { requireManager = false } = {}) {
  const membership = await OrganizationMembership.findOne({
    organizationId,
    userId,
    status: 'active',
  }).populate('organizationId');

  if (!membership || !membership.organizationId) return null;
  if (requireManager && !membershipCanManage(membership)) return null;
  if (!requireManager && !membershipCanViewOrg(membership)) return null;
  return membership;
}

async function applySubscriptionRecordToUser(userId, record) {
  if (!userId || !record || record.ownerType !== 'user') return null;
  const active = isActiveStatus(record.status);
  const update = {
    personalSubscription: {
      tier: record.tier,
      status: record.status,
      source: record.source,
      provider: record.provider,
      subscriptionId: record.providerSubscriptionId || String(record._id),
      customerId: record.providerCustomerId || null,
      currentPeriodEnd: record.currentPeriodEnd || null,
      cancelAtPeriodEnd: !!record.cancelAtPeriodEnd,
      updatedAt: new Date(),
    },
  };

  if (active) {
    update.subscriptionTier = record.tier;
  } else {
    update.subscriptionTier = 'plus';
  }

  const updated = await User.findByIdAndUpdate(userId, { $set: update }, { new: true }).select('-password');

  // Referral attribution: the first time a referred user becomes a paying
  // customer, credit their originating campaign link. Guarded by
  // referralPayingCounted so renewals / re-activations never double-count.
  if (active && updated?.referralCode && !updated.referralPayingCounted) {
    try {
      await ReferralLink.updateOne({ code: updated.referralCode }, { $inc: { payingCustomers: 1 } });
      await User.updateOne({ _id: updated._id }, { $set: { referralPayingCounted: true } });
      updated.referralPayingCounted = true;
    } catch (err) {
      console.error('Referral paying attribution failed:', err.message);
    }
  }

  return updated;
}

async function upsertSubscriptionRecord({
  ownerType,
  ownerId,
  plan,
  source,
  provider,
  status,
  interval = 'monthly',
  seats = 1,
  providerCustomerId = '',
  providerSubscriptionId = '',
  providerPriceId = '',
  providerProductId = '',
  currentPeriodStart = null,
  currentPeriodEnd = null,
  cancelAtPeriodEnd = false,
  metadata = {},
  lastProviderPayload = {},
}) {
  const ownerModel = ownerType === 'organization' ? 'Organization' : 'User';
  const filter = providerSubscriptionId
    ? { provider, providerSubscriptionId }
    : { ownerType, ownerId, provider, planId: plan.id };

  const record = await SubscriptionRecord.findOneAndUpdate(
    filter,
    {
      $set: {
        ownerType,
        ownerId,
        ownerModel,
        planId: plan.id,
        tier: plan.tier,
        audience: plan.audience,
        source,
        provider,
        status: normalizeSubscriptionStatus(status),
        interval,
        seats,
        providerCustomerId,
        providerSubscriptionId,
        providerPriceId,
        providerProductId,
        currentPeriodStart,
        currentPeriodEnd,
        cancelAtPeriodEnd,
        metadata,
        lastProviderPayload,
      },
    },
    { new: true, upsert: true }
  );

  if (ownerType === 'user') {
    await applySubscriptionRecordToUser(ownerId, record);
  }

  if (ownerType === 'organization') {
    // For one-time seat-pack receipts, do NOT overwrite seatsPurchased or
    // expiresAt — the seat top-up flow has already incremented the wallet
    // counter via $inc and orgs no longer have a recurring billing period.
    const orgUpdate = {
      planId: plan.id,
      effectiveTier: plan.tier,
      status: isActiveStatus(status) ? status : 'past_due',
      billingSource: source,
      subscriptionId: record._id,
    };
    if (interval !== 'one_time') {
      orgUpdate.seatsPurchased = seats;
      orgUpdate.expiresAt = currentPeriodEnd;
    }
    await Organization.findByIdAndUpdate(ownerId, { $set: orgUpdate });
  }

  return record;
}

async function createStripeCheckoutSession({
  user,
  plan,
  interval,
  successUrl,
  cancelUrl,
  discount = null,
  seats = 1,
  organization = null,
}) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const isInstitution = plan.audience === 'institution';
  const seatQty = isInstitution ? Math.max(parseInt(seats, 10) || 1, 1) : 1;
  const seatPackPrice = isInstitution ? getSeatPackPrice(plan, seatQty) : null;

  let unitAmountCents;
  let priceId = '';
  if (isInstitution) {
    unitAmountCents = seatPackPrice?.pricePerSeatCents;
    priceId = ''; // Seat packs are always priced dynamically (bulk-discount tiered).
  } else {
    priceId = providerPriceFor(plan, interval, BILLING_SOURCES.WEB);
    unitAmountCents = priceCentsFor(plan, interval);
  }
  const canUseDynamicPrice = Number.isFinite(unitAmountCents) && unitAmountCents > 0;
  const overridePriceId = !isInstitution
    ? (interval === 'annual' ? plan.stripeAnnualPriceId : plan.stripeMonthlyPriceId)
    : '';
  const discountHasStripeLink = !!(discount?.stripePromotionCodeId || discount?.stripeCouponId);
  const shouldUseDynamicPrice = isInstitution
    || (canUseDynamicPrice && (
      !priceId
      || (plan.pricingOverrideActive && !overridePriceId)
      || (discount && !discountHasStripeLink)
    ));

  if (!secret || (!priceId && !shouldUseDynamicPrice)) {
    return {
      requiresSetup: true,
      missing: [
        !secret ? 'STRIPE_SECRET_KEY' : null,
        !priceId && !shouldUseDynamicPrice && !isInstitution
          ? plan.providerKeys?.[interval === 'annual' ? 'stripeAnnual' : 'stripeMonthly']
          : null,
        isInstitution && !canUseDynamicPrice ? 'pricePerSeatCents' : null,
      ].filter(Boolean),
    };
  }

  const body = new URLSearchParams();
  // Institutions buy one-time seat packs. Individuals buy recurring subscriptions.
  body.set('mode', isInstitution ? 'payment' : 'subscription');
  body.set('success_url', successUrl || frontendUrl(isInstitution ? '/institution?checkout=success' : '/billing?checkout=success'));
  body.set('cancel_url', cancelUrl || frontendUrl('/pricing?checkout=cancelled'));
  body.set('client_reference_id', String(user._id));
  body.set('customer_email', user.email);
  if (isInstitution) {
    // Save the card to a Stripe Customer so auto-renew can off-session it later.
    // Card data never touches our DB — we only retain the Stripe customer + payment_method IDs.
    body.set('customer_creation', 'always');
    body.set('payment_intent_data[setup_future_usage]', 'off_session');
  }
  if (shouldUseDynamicPrice) {
    body.set('line_items[0][price_data][currency]', 'usd');
    body.set('line_items[0][price_data][unit_amount]', String(discountedAmountCents(unitAmountCents, discount)));
    if (!isInstitution) {
      body.set('line_items[0][price_data][recurring][interval]', interval === 'annual' ? 'year' : 'month');
    }
    body.set('line_items[0][price_data][product_data][name]', isInstitution ? `${plan.name} — ${seatQty}-seat pack` : plan.name);
  } else {
    body.set('line_items[0][price]', priceId);
    if (discount?.stripePromotionCodeId) {
      body.set('discounts[0][promotion_code]', discount.stripePromotionCodeId);
    } else if (discount?.stripeCouponId) {
      body.set('discounts[0][coupon]', discount.stripeCouponId);
    }
  }
  body.set('line_items[0][quantity]', String(seatQty));
  body.set('metadata[userId]', String(user._id));
  body.set('metadata[planId]', plan.id);
  body.set('metadata[tier]', plan.tier);
  body.set('metadata[interval]', isInstitution ? 'one_time' : interval);
  body.set('metadata[audience]', plan.audience);
  body.set('metadata[seats]', String(seatQty));
  if (isInstitution && seatPackPrice) {
    body.set('metadata[unitAmountCents]', String(seatPackPrice.pricePerSeatCents));
    body.set('metadata[bulkTierMinSeats]', String(seatPackPrice.tierApplied || 1));
  }
  if (organization?._id) body.set('metadata[organizationId]', String(organization._id));
  if (discount?.code) body.set('metadata[discountCode]', discount.code);
  if (discount?._id) body.set('metadata[discountId]', String(discount._id));
  if (discount?.applicationMode) body.set('metadata[discountApplicationMode]', discount.applicationMode);

  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  const data = await response.json();
  if (!response.ok) {
    const detail = data?.error?.message || 'Stripe checkout setup failed';
    throw new Error(detail);
  }

  return data;
}

async function createStripeProficiencyCheckoutSession({
  user,
  successUrl,
  cancelUrl,
}) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return {
      requiresSetup: true,
      missing: ['STRIPE_SECRET_KEY'],
    };
  }

  const body = new URLSearchParams();
  body.set('mode', 'payment');
  body.set('success_url', successUrl || frontendUrl('/level-tests?checkout=success'));
  body.set('cancel_url', cancelUrl || frontendUrl('/level-tests?checkout=cancelled'));
  body.set('client_reference_id', String(user._id));
  body.set('customer_email', user.email);
  body.set('line_items[0][price_data][currency]', 'usd');
  body.set('line_items[0][price_data][unit_amount]', String(PROFICIENCY_TEST_PRICE_CENTS));
  body.set('line_items[0][price_data][product_data][name]', 'Lingo Booth proficiency check');
  body.set('line_items[0][quantity]', '1');
  body.set('metadata[purchaseType]', 'proficiency_test_credit');
  body.set('metadata[testType]', 'proficiency');
  body.set('metadata[userId]', String(user._id));
  body.set('metadata[priceCents]', String(PROFICIENCY_TEST_PRICE_CENTS));

  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  const data = await response.json();
  if (!response.ok) {
    const detail = data?.error?.message || 'Stripe checkout setup failed';
    throw new Error(detail);
  }

  return data;
}

function verifyStripeSignature(rawBody, signatureHeader, secret) {
  if (!rawBody || !signatureHeader || !secret) return false;
  const timestamp = signatureHeader.match(/t=([^,]+)/)?.[1];
  const signatures = signatureHeader
    .split(',')
    .filter(part => part.startsWith('v1='))
    .map(part => part.slice(3));
  if (!timestamp || signatures.length === 0) return false;

  const payload = `${timestamp}.${Buffer.isBuffer(rawBody) ? rawBody.toString('utf8') : String(rawBody)}`;
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return signatures.some(sig => {
    try {
      return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    } catch (_) {
      return false;
    }
  });
}

async function handleStripeEvent(event) {
  const type = event?.type || '';
  const object = event?.data?.object || {};
  const metadata = object.metadata || {};
  const plan = getIndividualPlan(metadata.planId || metadata.tier) || getInstitutionalPlan(metadata.planId);
  const userId = metadata.userId;

  if (type === 'checkout.session.completed' && metadata.purchaseType === 'proficiency_test_credit' && userId) {
    if (!mongoose.isValidObjectId(userId)) return 'ignored';
    const user = await User.findById(userId).select('_id').lean();
    if (!user) return 'ignored';
    const providerSessionId = cleanLine(object.id, 200);
    const providerPaymentId = cleanLine(object.payment_intent, 200);
    await LevelTestCredit.findOneAndUpdate({
      provider: 'stripe',
      providerSessionId,
    }, {
      $setOnInsert: {
        userId: user._id,
        creditType: 'proficiency',
        status: 'available',
        source: 'stripe',
        priceCents: cleanCents(metadata.priceCents, { allowNull: false }) || PROFICIENCY_TEST_PRICE_CENTS,
        currency: cleanLine(object.currency || 'usd', 10).toLowerCase() || 'usd',
        provider: 'stripe',
        providerSessionId,
        providerPaymentId,
        purchasedAt: new Date(),
      },
    }, {
      upsert: true,
      new: true,
    });
    return 'processed';
  }

  if (type === 'checkout.session.completed' && plan && userId) {
    if (plan.audience === 'institution') {
      const org = metadata.organizationId && mongoose.isValidObjectId(metadata.organizationId)
        ? await Organization.findById(metadata.organizationId)
        : null;
      const user = await User.findById(userId);
      if (!org || !user) return 'ignored';

      // Seat packs are one-time payments. Top up the wallet rather than overwrite it.
      const qty = Math.max(parseInt(metadata.seats, 10) || plan.minimumSeats || 1, 1);
      const unitAmountCents = parseInt(metadata.unitAmountCents, 10);
      await seats.topUpSeats({
        orgId: org._id,
        quantity: qty,
        addedByUserId: user._id,
        source: 'stripe',
        note: `Stripe checkout ${object.id || ''}`.trim(),
        pricePerSeatCents: Number.isFinite(unitAmountCents) ? unitAmountCents : null,
        totalCents: Number.isFinite(unitAmountCents) ? unitAmountCents * qty : null,
      });

      // Pull the PaymentIntent to recover the payment_method id — Stripe attaches
      // it to the Customer automatically when setup_future_usage=off_session was
      // set on the Checkout Session. We store these tokens (not card data) so
      // auto-renew can off-session charge later.
      const stripeCustomerId = object.customer || null;
      let paymentMethodId = null;
      if (object.payment_intent && process.env.STRIPE_SECRET_KEY) {
        try {
          const pi = await fetch(`https://api.stripe.com/v1/payment_intents/${object.payment_intent}`, {
            headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
          }).then((r) => r.json());
          paymentMethodId = pi?.payment_method || null;
        } catch (err) {
          console.error('Failed to fetch payment_intent for autoRenew capture:', err);
        }
      }

      // If this was the org's first purchase, flip it to active and link its
      // plan + tier. Subsequent top-ups don't change plan-level settings.
      const refreshed = await Organization.findById(org._id);
      const orgUpdate = {
        planId: plan.id,
        effectiveTier: plan.tier,
        billingSource: BILLING_SOURCES.WEB,
      };
      if (!['active', 'trialing'].includes(refreshed.status)) orgUpdate.status = 'active';
      // Capture the Stripe tokens for future off-session charges. We do NOT
      // auto-enable auto-renew — admin opts in via PUT /auto-renew.
      if (stripeCustomerId) orgUpdate['autoRenew.stripeCustomerId'] = stripeCustomerId;
      if (paymentMethodId) orgUpdate['autoRenew.paymentMethodId'] = paymentMethodId;
      await Organization.findByIdAndUpdate(org._id, { $set: orgUpdate });

      // Receipt-style SubscriptionRecord for audit (interval = one_time).
      const record = await upsertSubscriptionRecord({
        ownerType: 'organization',
        ownerId: org._id,
        plan,
        source: BILLING_SOURCES.WEB,
        provider: 'stripe',
        status: 'active',
        interval: 'one_time',
        seats: qty,
        providerCustomerId: object.customer || '',
        providerSubscriptionId: object.payment_intent || object.id || '',
        providerPriceId: object.display_items?.[0]?.price?.id || '',
        metadata,
        lastProviderPayload: object,
      });

      const activatedOrg = await Organization.findById(org._id);
      const membership = await upsertInstitutionAdminMembership({ org: activatedOrg || org, user, role: 'admin', actorId: user._id });
      await notifyInstitutionAccess({
        userId: user._id,
        organization: activatedOrg || org,
        membership,
        actorUserId: user._id,
        source: 'paid_institution_purchase',
      });
      await notifyOrganizationManagers(org._id, {
        category: 'institution',
        severity: 'success',
        type: 'institution.seats.purchased',
        titleKey: 'notifications.institutionPurchaseTitle',
        bodyKey: 'notifications.institutionPurchaseBody',
        params: { organizationName: (activatedOrg || org).name, quantity: qty },
        action: { labelKey: 'notifications.openInstitutionAction', route: '/institution' },
        actorUserId: user._id,
      });
      if (metadata.discountId && mongoose.isValidObjectId(metadata.discountId)) {
        await DiscountCode.updateOne({ _id: metadata.discountId }, { $inc: { redemptions: 1 } });
      } else if (metadata.discountCode) {
        await DiscountCode.updateOne({ code: discountCodeValue(metadata.discountCode) }, { $inc: { redemptions: 1 } });
      }
      return record ? 'processed' : 'ignored';
    }

    const record = await upsertSubscriptionRecord({
      ownerType: 'user',
      ownerId: userId,
      plan,
      source: BILLING_SOURCES.WEB,
      provider: 'stripe',
      status: object.subscription ? 'active' : 'incomplete',
      interval: metadata.interval || 'monthly',
      providerCustomerId: object.customer || '',
      providerSubscriptionId: object.subscription || '',
      providerPriceId: object.display_items?.[0]?.price?.id || '',
      metadata,
      lastProviderPayload: object,
    });
    await applySubscriptionRecordToUser(userId, record);
    if (metadata.discountId && mongoose.isValidObjectId(metadata.discountId)) {
      await DiscountCode.updateOne(
        { _id: metadata.discountId },
        { $inc: { redemptions: 1 } },
      );
    } else if (metadata.discountCode) {
      await DiscountCode.updateOne(
        { code: discountCodeValue(metadata.discountCode) },
        { $inc: { redemptions: 1 } },
      );
    }
    return 'processed';
  }

  if ((type === 'customer.subscription.updated' || type === 'customer.subscription.deleted') && object.id) {
    const existing = await SubscriptionRecord.findOne({ provider: 'stripe', providerSubscriptionId: object.id });
    const existingPlan = existing ? (getIndividualPlan(existing.planId) || getInstitutionalPlan(existing.planId)) : null;
    const nextPlan = getIndividualPlan(metadata.planId || existing?.planId) || getInstitutionalPlan(metadata.planId || existing?.planId) || existingPlan;
    if (existing && nextPlan) {
      const status = type === 'customer.subscription.deleted' ? 'cancelled' : (object.status || 'incomplete');
      const record = await upsertSubscriptionRecord({
        ownerType: existing.ownerType,
        ownerId: existing.ownerId,
        plan: nextPlan,
        source: existing.source,
        provider: 'stripe',
        status: normalizeSubscriptionStatus(status),
        interval: existing.interval,
        seats: existing.seats,
        providerCustomerId: object.customer || existing.providerCustomerId,
        providerSubscriptionId: object.id,
        providerPriceId: object.items?.data?.[0]?.price?.id || existing.providerPriceId,
        providerProductId: object.items?.data?.[0]?.price?.product || existing.providerProductId,
        currentPeriodStart: dateFromUnixSeconds(object.current_period_start),
        currentPeriodEnd: dateFromUnixSeconds(object.current_period_end),
        cancelAtPeriodEnd: !!object.cancel_at_period_end,
        metadata: { ...existing.metadata, ...metadata },
        lastProviderPayload: object,
      });
      if (record.ownerType === 'user') await applySubscriptionRecordToUser(record.ownerId, record);
      if (record.ownerType === 'organization') {
        const org = await Organization.findById(record.ownerId);
        if (org) await syncActiveOrganizationMembers(org);
      }
      return 'processed';
    }
  }

  return 'ignored';
}

router.get('/plans', async (req, res) => {
  try {
    res.json(await publicPlansWithOverrides());
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_PLANS_LOAD_FAILED', { clientMessage: 'Could not load plans' });
  }
});

router.post('/discounts/validate', async (req, res) => {
  try {
    const plan = getIndividualPlan(req.body?.planId) || getInstitutionalPlan(req.body?.planId);
    if (!plan) return sendClientError(res, 400, 'BILLING_DISCOUNT_VALIDATE_PLAN_INVALID', 'Choose a valid plan');
    const discount = await validateDiscountForPlan(req.body?.discountCode, plan);
    if (!discount) return sendClientError(res, 404, 'BILLING_DISCOUNT_VALIDATE_NOT_AVAILABLE', 'Discount code is not available');
    res.json({ discount: publicDiscount(discount) });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_DISCOUNT_VALIDATE_FAILED', { clientMessage: 'Could not validate discount code' });
  }
});

router.post('/webhook', async (req, res) => {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(JSON.stringify(req.body || {}));
  let event;

  try {
    if (secret) {
      const ok = verifyStripeSignature(rawBody, req.get('stripe-signature'), secret);
      if (!ok) return res.status(400).json({ message: 'Invalid Stripe signature' });
    }
    event = JSON.parse(rawBody.toString('utf8'));
    const status = await handleStripeEvent(event);
    await BillingEvent.create({
      provider: 'stripe',
      type: event.type || 'unknown',
      status,
      providerEventId: event.id,
      payload: event,
    });
    res.json({ received: true });
  } catch (error) {
    await BillingEvent.create({
      provider: 'stripe',
      type: event?.type || 'unknown',
      status: 'failed',
      providerEventId: event?.id,
      message: error.message,
      payload: event || {},
    }).catch(() => {});
    return sendServerError(req, res, error, 'BILLING_WEBHOOK_PROCESS_FAILED', {
      clientMessage: 'Could not process billing webhook',
      metadata: { eventType: event?.type || 'unknown', providerEventId: event?.id },
    });
  }
});

router.post('/institutional-inquiry', optionalAuth, async (req, res) => {
  try {
    const body = req.body || {};
    const organizationName = cleanLine(body.organizationName, 180);
    const contactName = req.user?.username || cleanLine(body.contactName, 120);
    const email = (req.user?.email || cleanLine(body.email, 254)).toLowerCase();
    const seatsRequested = Math.max(parseInt(body.seatsRequested, 10) || 25, 1);
    const plan = getInstitutionalPlan(body.planId) || getInstitutionalPlan('institution_pro');

    if (!organizationName) return sendClientError(res, 400, 'BILLING_INSTITUTIONAL_INQUIRY_ORG_NAME_REQUIRED', 'Organization name is required');
    if (!contactName) return sendClientError(res, 400, 'BILLING_INSTITUTIONAL_INQUIRY_CONTACT_NAME_REQUIRED', 'Contact name is required');
    if (!EMAIL_REGEX.test(email)) return sendClientError(res, 400, 'BILLING_INSTITUTIONAL_INQUIRY_EMAIL_INVALID', 'A valid email address is required');

    const lead = await InstitutionalLead.create({
      organizationName,
      organizationType: ['school', 'company', 'church', 'language_center', 'nonprofit', 'government', 'other'].includes(body.organizationType)
        ? body.organizationType
        : 'other',
      contactName,
      email,
      phone: cleanLine(body.phone, 80),
      planId: plan.id,
      seatsRequested,
      message: cleanText(body.message, 5000),
      source: ['web', 'mobile'].includes(body.source) ? body.source : 'web',
      userId: req.user?._id,
      deviceId: cleanLine(req.get('x-lingo-device-id'), 160),
      page: cleanLine(body.page, 500),
      request: {
        ip: getClientIp(req),
        origin: cleanLine(req.get('origin'), 500),
      },
    });

    res.status(201).json({ message: 'Institutional request received', leadId: lead._id });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_INSTITUTIONAL_INQUIRY_FAILED', { clientMessage: 'Could not save institutional request' });
  }
});

router.use(verifyToken);

router.get('/me', async (req, res) => {
  await syncInstitutionAccessForUser(req.user);
  const subscriptions = await SubscriptionRecord.find({ ownerType: 'user', ownerId: req.userId })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();
  const memberships = await OrganizationMembership.find({ userId: req.userId, status: { $ne: 'removed' } })
    .populate('organizationId')
    .lean();

  let currentSeat = null;
  const orgId = req.user?.institutionalAccess?.organizationId;
  if (orgId) {
    const seat = await seats.currentSeat(req.userId, orgId);
    if (seat) {
      currentSeat = {
        _id: seat._id,
        state: seat.state,
        activatedAt: seat.activatedAt,
        expiresAt: seat.expiresAt,
        daysRemaining: Math.max(0, Math.ceil((seat.expiresAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000))),
      };
    }
    // Refresh the user-cache so getAiEntitlements/activeInstitutionTier on this very response are coherent.
    await seats.syncUserSeatCache(req.userId, orgId);
    req.user.institutionalAccess.seatStatus = seat ? seat.state : 'none';
    req.user.institutionalAccess.seatExpiresAt = seat ? seat.expiresAt : null;
  }

  res.json({
    entitlements: getAiEntitlements(req.user),
    subscription: getSubscriptionSummary(req.user),
    subscriptionContext: req.user.subscriptionContext || { type: 'institution', organizationId: req.user.institutionalAccess?.organizationId || null },
    subscriptions,
    memberships,
    currentSeat,
  });
});

router.post('/subscription-context', async (req, res) => {
  try {
    const contextType = req.body?.contextType === 'institution' ? 'institution' : 'personal';
    const user = await setSubscriptionContextForUser(req.user, {
      contextType,
      organizationId: req.body?.organizationId || '',
    });
    res.json({
      entitlements: getAiEntitlements(user),
      subscription: getSubscriptionSummary(user),
      subscriptionContext: user.subscriptionContext || { type: contextType, organizationId: null },
    });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_SUBSCRIPTION_CONTEXT_FAILED', {
      httpStatus: error.statusCode || 500,
      clientMessage: error.message || 'Could not switch subscription access',
    });
  }
});

router.post('/level-test-checkout-session', requireRecentAuth(15), async (req, res) => {
  try {
    const { successUrl, cancelUrl } = req.body || {};
    const session = await createStripeProficiencyCheckoutSession({
      user: req.user,
      successUrl,
      cancelUrl,
    });

    if (session.requiresSetup) {
      await BillingEvent.create({
        provider: 'stripe',
        type: 'level_test_checkout.setup_required',
        status: 'setup_required',
        userId: req.userId,
        message: 'Missing setup for proficiency check checkout',
        payload: {
          purchaseType: 'proficiency_test_credit',
          priceCents: PROFICIENCY_TEST_PRICE_CENTS,
          missing: session.missing,
        },
      });
      return setupMissingResponse(
        res,
        'Paid proficiency checks are ready in the app, but payment provider settings are not configured yet.',
        session.missing,
      );
    }

    await BillingEvent.create({
      provider: 'stripe',
      type: 'level_test_checkout.session.created',
      status: 'processed',
      userId: req.userId,
      payload: {
        id: session.id,
        purchaseType: 'proficiency_test_credit',
        priceCents: PROFICIENCY_TEST_PRICE_CENTS,
      },
    });

    res.json({ checkoutUrl: session.url, sessionId: session.id });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_LEVEL_TEST_CHECKOUT_FAILED', {
      clientMessage: 'Could not start proficiency check checkout',
      metadata: { userId: req.userId },
    });
  }
});

router.post('/checkout-session', requireRecentAuth(15), async (req, res) => {
  try {
    const { planId, interval = 'monthly', successUrl, cancelUrl, discountCode } = req.body || {};
    const individualPlan = await effectiveIndividualPlan(planId);
    const institutionalPlan = individualPlan ? null : await effectiveInstitutionalPlan(planId, '');
    const plan = individualPlan || institutionalPlan;
    if (!plan || plan.id === 'free' || (plan.audience === 'institution' && priceCentsFor(plan) == null)) {
      return sendClientError(res, 400, 'BILLING_CHECKOUT_PLAN_INVALID', 'Choose a paid plan');
    }
    const isInstitution = plan.audience === 'institution';
    const checkoutInterval = isInstitution ? 'one_time' : (interval === 'annual' ? 'annual' : 'monthly');
    // Seat packs are sized by `quantity` (preferred) but accept `seats` / `seatsRequested` for back-compat.
    const requestedQty = req.body?.quantity ?? req.body?.seats ?? req.body?.seatsRequested;
    const seatQty = isInstitution
      ? Math.max(parseInt(requestedQty, 10) || plan.minimumSeats || 1, plan.minimumSeats || 1)
      : 1;
    const seatPackPrice = isInstitution ? getSeatPackPrice(plan, seatQty) : null;
    const requestedDiscountCode = discountCodeValue(discountCode);
    const discount = requestedDiscountCode
      ? await validateDiscountForPlan(requestedDiscountCode, plan)
      : await validateAutomaticDiscountForPlan(plan, checkoutInterval);
    if (requestedDiscountCode && !discount) {
      return sendClientError(res, 400, 'BILLING_CHECKOUT_DISCOUNT_NOT_AVAILABLE', 'Discount code is not available');
    }

    let organization = null;
    if (isInstitution) {
      // If the user already owns an active org, reuse it (top-up) rather than spawning a new one.
      organization = await Organization.findOne({ ownerUserId: req.user._id, status: { $in: ['active', 'trialing', 'lead'] } }).sort({ createdAt: -1 });
      if (!organization) {
        organization = await createOrganizationForInstitution({
          name: req.body?.organizationName,
          type: req.body?.organizationType,
          plan,
          seats: seatQty,
          billingEmail: req.user.email,
          ownerUserId: req.user._id,
          status: 'lead',
          billingSource: BILLING_SOURCES.WEB,
          notes: 'Created from institution checkout before payment confirmation.',
        });
        // Pack-model: seats only enter the wallet on payment success, not at org creation.
        await Organization.findByIdAndUpdate(organization._id, { $set: { seatsPurchased: 0 } });
      }
    }

    const session = await createStripeCheckoutSession({
      user: req.user,
      plan,
      interval: checkoutInterval,
      successUrl,
      cancelUrl,
      discount,
      seats: seatQty,
      organization,
    });

    if (session.requiresSetup) {
      if (organization?._id && organization.status === 'lead' && (organization.seatsPurchased || 0) === 0) {
        await Organization.findByIdAndDelete(organization._id).catch(() => {});
      }
      await BillingEvent.create({
        provider: 'stripe',
        type: 'checkout.setup_required',
        status: 'setup_required',
        userId: req.userId,
        message: `Missing setup for ${plan.id}`,
        payload: {
          planId: plan.id,
          interval: checkoutInterval,
          seats: seatQty,
          organizationId: organization?._id ? String(organization._id) : '',
          discountCode: discount?.applicationMode === 'automatic' ? '' : discount?.code || '',
          automaticDiscountId: discount?.applicationMode === 'automatic' ? String(discount._id) : '',
          missing: session.missing,
        },
      });
      return setupMissingResponse(
        res,
        'Web checkout is ready in the app, but payment provider settings are not configured yet.',
        session.missing,
      );
    }

    await BillingEvent.create({
      provider: 'stripe',
      type: 'checkout.session.created',
      status: 'processed',
      userId: req.userId,
      payload: {
        id: session.id,
        planId: plan.id,
        interval: checkoutInterval,
        seats: seatQty,
        unitAmountCents: seatPackPrice?.pricePerSeatCents ?? null,
        bulkTierMinSeats: seatPackPrice?.tierApplied ?? null,
        organizationId: organization?._id ? String(organization._id) : '',
        discountCode: discount?.applicationMode === 'automatic' ? '' : discount?.code || '',
        automaticDiscountId: discount?.applicationMode === 'automatic' ? String(discount._id) : '',
      },
    });

    res.json({ checkoutUrl: session.url, sessionId: session.id });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_CHECKOUT_SESSION_FAILED', {
      clientMessage: 'Could not start checkout',
      metadata: { userId: req.userId },
    });
  }
});

router.post('/customer-portal', requireRecentAuth(15), async (req, res) => {
  try {
    const customerId = req.user.personalSubscription?.customerId;
    if (!process.env.STRIPE_SECRET_KEY || !customerId) {
      return setupMissingResponse(
        res,
        'Billing portal will be available after Stripe customer records are connected.',
        [!process.env.STRIPE_SECRET_KEY ? 'STRIPE_SECRET_KEY' : null, !customerId ? 'Stripe customer id' : null].filter(Boolean),
      );
    }

    const body = new URLSearchParams();
    body.set('customer', customerId);
    body.set('return_url', req.body?.returnUrl || frontendUrl('/billing'));
    const response = await fetch('https://api.stripe.com/v1/billing_portal/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || 'Could not open billing portal');
    res.json({ portalUrl: data.url });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_CUSTOMER_PORTAL_FAILED', {
      clientMessage: 'Could not open billing portal',
      metadata: { userId: req.userId },
    });
  }
});

router.post('/mobile/verify', async (req, res) => {
  try {
    const platform = String(req.body?.platform || '').toLowerCase();
    const plan = getIndividualPlan(req.body?.planId);
    if (!['ios', 'android'].includes(platform)) {
      return sendClientError(res, 400, 'BILLING_MOBILE_VERIFY_PLATFORM_INVALID', 'Mobile platform must be ios or android');
    }
    if (!plan || plan.id === 'free') {
      return sendClientError(res, 400, 'BILLING_MOBILE_VERIFY_PLAN_INVALID', 'Choose a paid individual plan');
    }

    await BillingEvent.create({
      provider: platform === 'ios' ? 'apple' : 'google',
      type: 'mobile.receipt.received',
      status: 'setup_required',
      userId: req.userId,
      payload: {
        platform,
        planId: plan.id,
        productId: cleanLine(req.body?.productId, 200),
        transactionId: cleanLine(req.body?.transactionId, 200),
      },
    });

    return setupMissingResponse(
      res,
      'Mobile purchase verification endpoint is ready, but store credentials and receipt validation are not configured yet.',
      platform === 'ios'
        ? ['IOS_SHARED_SECRET', 'App Store Server API credentials']
        : ['ANDROID_PACKAGE_NAME', 'Google Play service account credentials'],
    );
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_MOBILE_VERIFY_FAILED', {
      clientMessage: 'Could not verify mobile purchase',
      metadata: { userId: req.userId },
    });
  }
});

router.get('/institution/dashboard', async (req, res) => {
  try {
    const ownedOrganizations = await Organization.find({
      ownerUserId: req.userId,
      status: { $in: ['active', 'trialing'] },
    });
    await repairOwnerLearnerMemberships(req.userId, ownedOrganizations);

    const memberships = await OrganizationMembership.find({
      userId: req.userId,
      status: 'active',
      role: { $in: ORG_OVERSIGHT_ROLES },
    })
      .populate('organizationId')
      .sort({ updatedAt: -1 })
      .lean();

    const availableMemberships = memberships.filter((membership) => (
      membership.organizationId && ['active', 'trialing'].includes(membership.organizationId.status)
    ));

    if (availableMemberships.length === 0) {
      return sendClientError(res, 403, 'BILLING_INSTITUTION_DASHBOARD_NO_MANAGER_ACCESS', 'No institution manager access found');
    }

    const requestedOrgId = req.query?.organizationId;
    const activeMembership = availableMemberships.find((membership) => (
      requestedOrgId && String(membership.organizationId._id) === String(requestedOrgId)
    )) || availableMemberships[0];
    const organization = activeMembership.organizationId;
    const currentSeatUsage = await updateOrganizationSeatCount(organization._id);
    organization.seatsUsed = currentSeatUsage;

    const [members, subscriptions, groups, testAttempts, certificates] = await Promise.all([
      OrganizationMembership.find({ organizationId: organization._id, status: { $ne: 'removed' } })
        .sort({ role: 1, email: 1 })
        .populate('userId', 'username email totalXP lastActive lastLogin nativeLanguage targetLanguage subscriptionTier xpDecayEnabled')
        .populate('groupId')
        .lean(),
      SubscriptionRecord.find({ ownerType: 'organization', ownerId: organization._id })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(),
      InstitutionGroup.find({ organizationId: organization._id, status: 'active' })
        .sort({ name: 1 })
        .lean(),
      LevelTestAttempt.find({ organizationId: organization._id, status: 'submitted' })
        .sort({ submittedAt: -1 })
        .limit(50)
        .populate('userId', 'username email')
        .lean(),
      CompletionCertificate.find({ organizationId: organization._id, status: 'active' })
        .sort({ issuedAt: -1 })
        .limit(50)
        .populate('userId', 'username email')
        .lean(),
    ]);

    const memberUserIds = members
      .map((member) => member.userId?._id || member.userId)
      .filter(Boolean)
      .map((id) => new mongoose.Types.ObjectId(String(id)));

    const [progressStats, classStats] = memberUserIds.length > 0
      ? await Promise.all([
        Progress.aggregate([
          { $match: { userId: { $in: memberUserIds } } },
          {
            $group: {
              _id: '$userId',
              averageScore: { $avg: '$score' },
              progressRecords: { $sum: 1 },
              attempts: { $sum: '$attemptCount' },
              mastered: { $sum: { $cond: [{ $eq: ['$masteryStatus', 'mastered'] }, 1, 0] } },
              comfortable: { $sum: { $cond: [{ $eq: ['$masteryStatus', 'comfortable'] }, 1, 0] } },
              learning: { $sum: { $cond: [{ $eq: ['$masteryStatus', 'learning'] }, 1, 0] } },
              struggling: { $sum: { $cond: [{ $eq: ['$masteryStatus', 'struggling'] }, 1, 0] } },
            },
          },
        ]),
        ClassLessonProgress.aggregate([
          { $match: { userId: { $in: memberUserIds } } },
          {
            $group: {
              _id: '$userId',
              classLessonsStarted: { $sum: 1 },
              completedClassItems: { $sum: { $size: { $ifNull: ['$completedItems', []] } } },
              lastStudiedAt: { $max: '$lastStudiedAt' },
            },
          },
        ]),
      ])
      : [[], []];

    const progressByUser = new Map(progressStats.map((record) => [String(record._id), record]));
    const classByUser = new Map(classStats.map((record) => [String(record._id), record]));

    // Resolve each member's current seat (lazy-expires any past-due rows along the way).
    const seatByMember = new Map();
    await Promise.all(
      members
        .filter((member) => member.userId && member.role === 'learner')
        .map(async (member) => {
          const userIdRaw = member.userId?._id || member.userId;
          const seat = await seats.currentSeat(userIdRaw, organization._id);
          if (seat) {
            seatByMember.set(String(member._id), {
              _id: seat._id,
              state: seat.state,
              activatedAt: seat.activatedAt,
              expiresAt: seat.expiresAt,
              suspendedAt: seat.suspendedAt,
            });
          }
        }),
    );

    const enrichedMembers = members.map((member) => {
      const sanitized = sanitizeMembership(member);
      const userId = sanitized.user?._id ? String(sanitized.user._id) : '';
      const progress = progressByUser.get(userId) || {};
      const classProgress = classByUser.get(userId) || {};
      return {
        ...sanitized,
        currentSeat: seatByMember.get(String(member._id)) || null,
        suspensionReason: member.suspensionReason || null,
        suspensionRequest: member.suspensionRequest || null,
        learnerSummary: {
          totalXP: sanitized.user?.totalXP || 0,
          averageScore: progress.averageScore != null ? Math.round(progress.averageScore) : null,
          progressRecords: progress.progressRecords || 0,
          attempts: progress.attempts || 0,
          mastered: progress.mastered || 0,
          comfortable: progress.comfortable || 0,
          learning: progress.learning || 0,
          struggling: progress.struggling || 0,
          classLessonsStarted: classProgress.classLessonsStarted || 0,
          completedClassItems: classProgress.completedClassItems || 0,
          lastStudiedAt: classProgress.lastStudiedAt || sanitized.user?.lastActive || null,
        },
      };
    });

    const activeMembers = enrichedMembers.filter((member) => member.status === 'active');
    const invitedMembers = enrichedMembers.filter((member) => member.status === 'invited');
    const learners = enrichedMembers.filter((member) => member.role === 'learner' && member.status === 'active');
    const learnerAverage = learners
      .map((member) => member.learnerSummary.averageScore)
      .filter((score) => Number.isFinite(score));
    const staleCutoff = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const needsHelpLearners = learners
      .map((member) => {
        const summary = member.learnerSummary || {};
        const lastStudy = summary.lastStudiedAt || member.user?.lastActive || null;
        const reasons = [];
        if (Number.isFinite(summary.averageScore) && summary.averageScore < 70) reasons.push('low_score');
        if ((summary.struggling || 0) > 0) reasons.push('struggling_items');
        if (!lastStudy || new Date(lastStudy).getTime() < staleCutoff) reasons.push('inactive');
        return {
          ...member,
          learnerSnapshot: {
            reasons,
            lastStudy,
          },
        };
      })
      .filter((member) => member.learnerSnapshot.reasons.length > 0)
      .sort((a, b) => (
        (b.learnerSnapshot.reasons.length - a.learnerSnapshot.reasons.length)
        || ((a.learnerSummary.averageScore ?? 101) - (b.learnerSummary.averageScore ?? 101))
        || (new Date(a.learnerSnapshot.lastStudy || 0) - new Date(b.learnerSnapshot.lastStudy || 0))
      ))
      .slice(0, 8);

    res.json({
      organizations: availableMemberships.map((membership) => ({
        organization: membership.organizationId,
        membership: {
          _id: membership._id,
          role: membership.role,
          status: membership.status,
        },
      })),
      organization,
      languagePolicy: {
        allowedTargetLanguages: cleanLanguageList(organization.allowedTargetLanguages).length
          ? cleanLanguageList(organization.allowedTargetLanguages)
          : ALL_TARGET_LANGUAGES,
        defaultTargetLanguage: organization.defaultTargetLanguage || '',
        allowLanguageRequests: organization.allowLanguageRequests !== false,
      },
      currentMembership: {
        _id: activeMembership._id,
        role: activeMembership.role,
        status: activeMembership.status,
        canManage: membershipCanManage(activeMembership),
      },
      seatUsage: {
        purchased: organization.seatsPurchased || 0,
        used: currentSeatUsage,
        active: activeMembers.length,
        invited: invitedMembers.length,
        remaining: Math.max((organization.seatsPurchased || 0) - currentSeatUsage, 0),
        available: await seats.getSeatsAvailable(organization._id),
      },
      counts: {
        owners: activeMembers.filter((member) => member.role === 'owner').length,
        admins: activeMembers.filter((member) => member.role === 'admin').length,
        teachers: activeMembers.filter((member) => member.role === 'teacher').length,
        learners: learners.length,
      },
      learningSummary: {
        averageScore: learnerAverage.length
          ? Math.round(learnerAverage.reduce((sum, score) => sum + score, 0) / learnerAverage.length)
          : null,
        totalXP: activeMembers.reduce((sum, member) => sum + (member.learnerSummary.totalXP || 0), 0),
        progressRecords: activeMembers.reduce((sum, member) => sum + (member.learnerSummary.progressRecords || 0), 0),
        completedClassItems: activeMembers.reduce((sum, member) => sum + (member.learnerSummary.completedClassItems || 0), 0),
      },
      members: enrichedMembers,
      recentLearners: activeMembers
        .filter((member) => member.user)
        .sort((a, b) => new Date(b.user.lastActive || 0) - new Date(a.user.lastActive || 0))
        .slice(0, 8),
      needsHelpLearners,
      subscriptions,
      groups,
      testing: {
        attempts: testAttempts.map((attempt) => ({
          _id: attempt._id,
          user: attempt.userId,
          level: attempt.level,
          mode: attempt.mode,
          targetLanguage: attempt.targetLanguage,
          nativeLanguage: attempt.nativeLanguage,
          score: attempt.score,
          passed: attempt.passed,
          readiness: attempt.readiness,
          weakSkills: attempt.weakSkills || [],
          submittedAt: attempt.submittedAt,
        })),
        certificates: certificates.map((certificate) => ({
          _id: certificate._id,
          certificateId: certificate.certificateId,
          certificateType: certificate.certificateType,
          user: certificate.userId,
          level: certificate.level,
          targetLanguage: certificate.targetLanguage,
          nativeLanguage: certificate.nativeLanguage,
          score: certificate.score,
          readiness: certificate.readiness,
          issuedAt: certificate.issuedAt,
        })),
      },
    });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_INSTITUTION_DASHBOARD_FAILED', {
      clientMessage: 'Could not load institution dashboard',
      metadata: { userId: req.userId },
    });
  }
});

router.put('/institution/organizations/:organizationId', async (req, res) => {
  try {
    const membership = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!membership) return sendClientError(res, 403, 'BILLING_INSTITUTION_ORG_UPDATE_MANAGER_REQUIRED', 'Institution manager access is required');

    const org = membership.organizationId;
    if (req.body?.name) org.name = cleanLine(req.body.name, 180);
    if (req.body?.type && ORG_TYPES.includes(req.body.type)) org.type = req.body.type;
    if (req.body?.billingEmail !== undefined) org.billingEmail = cleanLine(req.body.billingEmail, 254).toLowerCase();
    if (req.body?.notes !== undefined) org.notes = cleanText(req.body.notes, 3000);
    if (req.body?.allowedTargetLanguages !== undefined) {
      org.allowedTargetLanguages = cleanLanguageList(req.body.allowedTargetLanguages);
    }
    if (req.body?.defaultTargetLanguage !== undefined) {
      const normalizedDefault = cleanLanguageList([req.body.defaultTargetLanguage])[0] || '';
      org.defaultTargetLanguage = normalizedDefault;
      if (normalizedDefault && org.allowedTargetLanguages.length && !org.allowedTargetLanguages.includes(normalizedDefault)) {
        org.allowedTargetLanguages.push(normalizedDefault);
      }
    }
    if (req.body?.allowLanguageRequests !== undefined) {
      org.allowLanguageRequests = req.body.allowLanguageRequests !== false;
    }
    await org.save();

    await BillingEvent.create({
      provider: 'manual',
      type: 'institution.profile.updated',
      status: 'processed',
      organizationId: org._id,
      userId: req.userId,
      payload: { updatedBy: req.userId },
    });

    res.json({ organization: org });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_INSTITUTION_ORG_UPDATE_FAILED', {
      clientMessage: 'Could not update institution profile',
      metadata: { userId: req.userId, organizationId: req.params.organizationId },
    });
  }
});

router.put('/institution/organizations/:organizationId/certificate-branding', async (req, res) => {
  try {
    const membership = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!membership) return sendClientError(res, 403, 'BILLING_INSTITUTION_CERTIFICATE_BRANDING_MANAGER_REQUIRED', 'Institution manager access is required');

    const org = membership.organizationId;
    org.certificateBranding = certificateBrandingPayload(req.body, req.userId);
    await org.save();

    await BillingEvent.create({
      provider: 'manual',
      type: 'institution.certificate_branding.updated',
      status: 'processed',
      organizationId: org._id,
      userId: req.userId,
      payload: {
        updatedBy: req.userId,
        hasLogo: !!org.certificateBranding?.logoUrl,
        logoMimeType: org.certificateBranding?.logoMimeType || '',
      },
    });

    res.json({
      organization: org,
      certificateBranding: org.certificateBranding,
    });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_INSTITUTION_CERTIFICATE_BRANDING_UPDATE_FAILED', {
      httpStatus: error.statusCode || 500,
      clientMessage: error.message || 'Could not update certificate branding',
      metadata: { userId: req.userId, organizationId: req.params.organizationId },
    });
  }
});

router.post('/institution/organizations/:organizationId/groups', async (req, res) => {
  try {
    const membership = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!membership) return sendClientError(res, 403, 'BILLING_INSTITUTION_GROUP_CREATE_MANAGER_REQUIRED', 'Institution manager access is required');

    const org = membership.organizationId;
    const name = cleanLine(req.body?.name, 120);
    if (!name) return sendClientError(res, 400, 'BILLING_INSTITUTION_GROUP_CREATE_NAME_REQUIRED', 'Group name is required');
    const allowedTargetLanguages = cleanLanguageList(req.body?.allowedTargetLanguages);
    const defaultTargetLanguage = cleanLanguageList([req.body?.defaultTargetLanguage])[0]
      || allowedTargetLanguages[0]
      || org.defaultTargetLanguage
      || '';

    const group = await InstitutionGroup.findOneAndUpdate(
      { organizationId: org._id, name },
      {
        $set: {
          description: cleanText(req.body?.description, 1000),
          allowedTargetLanguages,
          defaultTargetLanguage,
          status: ['active', 'archived'].includes(req.body?.status) ? req.body.status : 'active',
          createdBy: req.userId,
        },
      },
      { upsert: true, new: true },
    );

    res.status(201).json({ group });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_INSTITUTION_GROUP_CREATE_FAILED', {
      clientMessage: 'Could not save institution group',
      metadata: { userId: req.userId, organizationId: req.params.organizationId },
    });
  }
});

router.put('/institution/organizations/:organizationId/groups/:groupId', async (req, res) => {
  try {
    const membership = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!membership) return sendClientError(res, 403, 'BILLING_INSTITUTION_GROUP_UPDATE_MANAGER_REQUIRED', 'Institution manager access is required');

    const group = await InstitutionGroup.findOne({
      _id: req.params.groupId,
      organizationId: membership.organizationId._id,
    });
    if (!group) return sendClientError(res, 404, 'BILLING_INSTITUTION_GROUP_UPDATE_NOT_FOUND', 'Group not found');

    if (req.body?.name) group.name = cleanLine(req.body.name, 120);
    if (req.body?.description !== undefined) group.description = cleanText(req.body.description, 1000);
    if (req.body?.allowedTargetLanguages !== undefined) group.allowedTargetLanguages = cleanLanguageList(req.body.allowedTargetLanguages);
    if (req.body?.defaultTargetLanguage !== undefined) group.defaultTargetLanguage = cleanLanguageList([req.body.defaultTargetLanguage])[0] || '';
    if (req.body?.status && ['active', 'archived'].includes(req.body.status)) group.status = req.body.status;
    await group.save();

    res.json({ group });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_INSTITUTION_GROUP_UPDATE_FAILED', {
      clientMessage: 'Could not update institution group',
      metadata: { userId: req.userId, organizationId: req.params.organizationId, groupId: req.params.groupId },
    });
  }
});

router.post('/institution/organizations/:organizationId/members', async (req, res) => {
  try {
    const membership = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!membership) return sendClientError(res, 403, 'BILLING_INSTITUTION_MEMBER_ADD_MANAGER_REQUIRED', 'Institution manager access is required');

    const org = membership.organizationId;
    const email = cleanLine(req.body?.email, 254).toLowerCase();
    if (!EMAIL_REGEX.test(email)) return sendClientError(res, 400, 'BILLING_INSTITUTION_MEMBER_ADD_EMAIL_INVALID', 'A valid email address is required');

    const existing = await OrganizationMembership.findOne({ organizationId: org._id, email });
    const role = ORG_ROLES.includes(req.body?.role) ? req.body.role : 'learner';
    const consumesSeat = role === 'learner';
    const existingHasLiveSeat = existing && existing.userId
      ? !!(await seats.currentSeat(existing.userId, org._id))
      : false;
    const needsFreshSeat = consumesSeat && !existingHasLiveSeat;
    if (needsFreshSeat) {
      const available = await seats.getSeatsAvailable(org._id);
      if (available <= 0) {
        return res.status(400).json({ message: 'No seats available', code: 'BILLING_INSTITUTION_MEMBER_ADD_NO_SEATS', seatsAvailable: 0 });
      }
    }

    const user = await User.findOne({ email });
    const groupId = req.body?.groupId && mongoose.Types.ObjectId.isValid(String(req.body.groupId))
      ? req.body.groupId
      : null;
    const allowedTargetLanguages = cleanLanguageList(req.body?.allowedTargetLanguages);
    const member = await OrganizationMembership.findOneAndUpdate(
      { organizationId: org._id, email },
      {
        $set: {
          userId: user?._id || null,
          role,
          status: user ? 'active' : 'invited',
          consumesSeat,
          groupId,
          allowedTargetLanguages,
          invitedBy: req.userId,
          joinedAt: user ? new Date() : null,
        },
      },
      { new: true, upsert: true },
    )
      .populate('userId', 'username email totalXP lastActive lastLogin nativeLanguage targetLanguage subscriptionTier xpDecayEnabled')
      .populate('groupId');

    if (user) await setUserInstitutionalAccess(user._id, org, member);

    let allocatedSeat = null;
    if (user && consumesSeat && member.status === 'active') {
      allocatedSeat = await seats.tryAllocateSeat({
        userId: user._id,
        orgId: org._id,
        membershipId: member._id,
        trigger: 'admin_add',
        triggeredByUserId: req.userId,
      });
    }

    org.seatsUsed = await updateOrganizationSeatCount(org._id);
    const seatsAvailable = await seats.getSeatsAvailable(org._id);

    await BillingEvent.create({
      provider: 'manual',
      type: 'institution.member.added',
      status: 'processed',
      organizationId: org._id,
      userId: user?._id || null,
      payload: { email, role, invitedBy: req.userId, seatAllocated: !!allocatedSeat },
    });
    if (user) {
      await notifyInstitutionAccess({
        userId: user._id,
        organization: org,
        membership: member,
        actorUserId: req.userId,
        source: member.role === 'learner' ? 'learner_added' : 'member_added',
      });
    }
    await notifySeatThresholdIfNeeded(org._id, seatsAvailable, org.seatsPurchased || 0, req.userId);
    res.status(201).json({
      membership: sanitizeMembership(member),
      seatsUsed: org.seatsUsed,
      seatsAvailable,
      currentSeat: allocatedSeat
        ? {
          _id: allocatedSeat._id,
          state: allocatedSeat.state,
          activatedAt: allocatedSeat.activatedAt,
          expiresAt: allocatedSeat.expiresAt,
        }
        : null,
    });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_INSTITUTION_MEMBER_ADD_FAILED', {
      clientMessage: 'Could not add institution member',
      metadata: { userId: req.userId, organizationId: req.params.organizationId },
    });
  }
});

router.put('/institution/organizations/:organizationId/members/:membershipId', async (req, res) => {
  try {
    const managerMembership = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!managerMembership) return sendClientError(res, 403, 'BILLING_INSTITUTION_MEMBER_UPDATE_MANAGER_REQUIRED', 'Institution manager access is required');

    const org = managerMembership.organizationId;
    const member = await OrganizationMembership.findOne({
      _id: req.params.membershipId,
      organizationId: org._id,
    })
      .populate('userId', 'username email totalXP lastActive lastLogin nativeLanguage targetLanguage subscriptionTier xpDecayEnabled')
      .populate('groupId');

    if (!member) return sendClientError(res, 404, 'BILLING_INSTITUTION_MEMBER_UPDATE_NOT_FOUND', 'Member not found');

    const requestedRole = ORG_ROLES.includes(req.body?.role) ? req.body.role : member.role;
    const nextRole = ORG_MANAGER_ROLES.includes(member.role) && requestedRole === 'learner'
      ? member.role
      : requestedRole;
    const nextStatus = ['invited', 'active', 'removed'].includes(req.body?.status) ? req.body.status : member.status;
    const nextConsumesSeat = nextRole === 'learner';
    const removingSelf = String(member.userId?._id || member.userId) === String(req.userId) && nextStatus === 'removed';

    if (removingSelf) {
      const otherManagers = await OrganizationMembership.countDocuments({
        organizationId: org._id,
        userId: { $ne: req.userId },
        role: { $in: ORG_MANAGER_ROLES },
        status: 'active',
      });
      if (otherManagers === 0) {
        return sendClientError(res, 400, 'BILLING_INSTITUTION_MEMBER_UPDATE_LAST_MANAGER', 'Add another manager before removing yourself');
      }
    }

    const memberUserId = member.userId?._id || member.userId || null;
    const liveSeat = memberUserId ? await seats.currentSeat(memberUserId, org._id) : null;
    const willActivateLearner = nextStatus !== 'removed'
      && nextConsumesSeat
      && !liveSeat
      && memberUserId
      && (member.status === 'removed' || (member.role !== 'learner' && !member.consumesSeat) || nextStatus === 'active');
    if (willActivateLearner) {
      const available = await seats.getSeatsAvailable(org._id);
      if (available <= 0) {
        return res.status(400).json({ message: 'No seats available', code: 'BILLING_INSTITUTION_MEMBER_UPDATE_NO_SEATS', seatsAvailable: 0 });
      }
    }

    const wasLearner = member.role === 'learner';
    member.role = nextRole;
    member.status = nextStatus;
    member.consumesSeat = nextConsumesSeat;
    if (req.body?.groupId !== undefined) {
      member.groupId = req.body.groupId && mongoose.Types.ObjectId.isValid(String(req.body.groupId)) ? req.body.groupId : null;
    }
    if (req.body?.allowedTargetLanguages !== undefined) {
      member.allowedTargetLanguages = cleanLanguageList(req.body.allowedTargetLanguages);
    }
    if (nextStatus === 'active' && !member.joinedAt) member.joinedAt = new Date();
    await member.save();

    if (member.userId) {
      if (nextStatus === 'active') await setUserInstitutionalAccess(member.userId._id || member.userId, org, member);
      if (nextStatus === 'removed') await clearUserInstitutionalAccess(member.userId._id || member.userId, org._id);
    }

    if (nextStatus === 'removed') {
      await seats.endLiveSeatForMembership(member, 'removed', req.userId);
    } else if (wasLearner && !nextConsumesSeat) {
      await seats.endLiveSeatForMembership(member, 'role_changed', req.userId);
    } else if (willActivateLearner) {
      await seats.tryAllocateSeat({
        userId: memberUserId,
        orgId: org._id,
        membershipId: member._id,
        trigger: 'admin_role_change',
        triggeredByUserId: req.userId,
      });
    }

    org.seatsUsed = await updateOrganizationSeatCount(org._id);

    await BillingEvent.create({
      provider: 'manual',
      type: 'institution.member.updated',
      status: 'processed',
      organizationId: org._id,
      userId: member.userId?._id || member.userId || null,
      payload: { role: member.role, memberStatus: member.status, updatedBy: req.userId },
    });

    if (memberUserId && nextStatus === 'removed') {
      await notifyInstitutionAccessRemoved({ userId: memberUserId, organization: org, actorUserId: req.userId });
    } else if (memberUserId && willActivateLearner) {
      await notifyInstitutionAccess({
        userId: memberUserId,
        organization: org,
        membership: member,
        actorUserId: req.userId,
        source: 'learner_added',
      });
    }
    await notifySeatThresholdIfNeeded(org._id, seatsAvailable, org.seatsPurchased || 0, req.userId);

    res.json({ membership: sanitizeMembership(member), seatsUsed: org.seatsUsed });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_INSTITUTION_MEMBER_UPDATE_FAILED', {
      clientMessage: 'Could not update institution member',
      metadata: { userId: req.userId, organizationId: req.params.organizationId, membershipId: req.params.membershipId },
    });
  }
});

router.post('/institution/organizations/:organizationId/seats', async (req, res) => {
  try {
    const membership = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!membership) return sendClientError(res, 403, 'BILLING_SEAT_TOPUP_MANAGER_REQUIRED', 'Institution manager access is required');

    const quantity = Math.max(1, Math.floor(Number(req.body?.quantity) || 0));
    if (!quantity || quantity > 10000) {
      return sendClientError(res, 400, 'BILLING_SEAT_TOPUP_QUANTITY_INVALID', 'quantity must be a positive integer (max 10000)');
    }
    const note = cleanText(req.body?.note, 500);
    const result = await seats.topUpSeats({
      orgId: membership.organizationId._id,
      quantity,
      addedByUserId: req.userId,
      source: 'manual',
      note,
    });

    const available = await seats.getSeatsAvailable(membership.organizationId._id);
    await notifyOrganizationManagers(membership.organizationId._id, {
      category: 'institution',
      severity: 'success',
      type: 'institution.seats.topup',
      titleKey: 'notifications.seatsAddedTitle',
      bodyKey: 'notifications.seatsAddedBody',
      params: { quantity: result.quantity, remaining: available },
      action: { labelKey: 'notifications.manageSeatsAction', route: '/institution' },
      actorUserId: req.userId,
    });
    res.status(201).json({
      seatsPurchased: result.organization.seatsPurchased,
      seatsAvailable: available,
      quantityAdded: result.quantity,
    });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_SEAT_TOPUP_FAILED', {
      clientMessage: 'Could not top up seats',
      metadata: { userId: req.userId, organizationId: req.params.organizationId },
    });
  }
});

router.post('/institution/organizations/:organizationId/members/:membershipId/suspend', async (req, res) => {
  try {
    const manager = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!manager) return sendClientError(res, 403, 'BILLING_MEMBERSHIP_SUSPEND_MANAGER_REQUIRED', 'Institution manager access is required');

    const member = await OrganizationMembership.findOne({
      _id: req.params.membershipId,
      organizationId: manager.organizationId._id,
    });
    if (!member) return sendClientError(res, 404, 'BILLING_MEMBERSHIP_SUSPEND_NOT_FOUND', 'Member not found');
    if (String(member.userId || '') === String(req.userId)) {
      return sendClientError(res, 400, 'BILLING_MEMBERSHIP_SUSPEND_SELF', 'Cannot suspend yourself');
    }

    const fromRequest = !!(member.suspensionRequest && member.suspensionRequest.requestedAt && !member.suspensionRequest.handledAt);
    const result = await seats.suspendMembershipSeat({
      membershipId: member._id,
      suspendedByUserId: req.userId,
      source: fromRequest ? 'learner_request_then_admin' : 'admin',
    });
    if (!result.ok) return sendClientError(res, 400, 'BILLING_MEMBERSHIP_SUSPEND_REJECTED', result.error);

    const seatsAvailable = await seats.getSeatsAvailable(manager.organizationId._id);
    if (member.userId) {
      await createNotification({
        userId: member.userId,
        category: 'institution',
        severity: 'warning',
        type: 'institution.member.suspended',
        titleKey: 'notifications.institutionSeatSuspendedTitle',
        bodyKey: 'notifications.institutionSeatSuspendedBody',
        params: { organizationName: manager.organizationId.name },
        action: { labelKey: 'notifications.viewProfileAction', route: '/profile/account' },
        organizationId: manager.organizationId._id,
        actorUserId: req.userId,
      });
    }
    res.json({
      membership: sanitizeMembership(await result.membership.populate('userId', 'username email')),
      seat: result.seat
        ? { _id: result.seat._id, state: result.seat.state, activatedAt: result.seat.activatedAt, expiresAt: result.seat.expiresAt }
        : null,
      seatsAvailable,
    });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_MEMBERSHIP_SUSPEND_FAILED', {
      clientMessage: 'Could not suspend membership',
      metadata: { userId: req.userId, organizationId: req.params.organizationId, membershipId: req.params.membershipId },
    });
  }
});

router.post('/institution/organizations/:organizationId/members/:membershipId/unsuspend', async (req, res) => {
  try {
    const manager = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!manager) return sendClientError(res, 403, 'BILLING_MEMBERSHIP_UNSUSPEND_MANAGER_REQUIRED', 'Institution manager access is required');

    const member = await OrganizationMembership.findOne({
      _id: req.params.membershipId,
      organizationId: manager.organizationId._id,
    });
    if (!member) return sendClientError(res, 404, 'BILLING_MEMBERSHIP_UNSUSPEND_NOT_FOUND', 'Member not found');

    const result = await seats.unsuspendMembershipSeat({
      membershipId: member._id,
      adminUserId: req.userId,
    });
    if (!result.ok) {
      if (result.error === 'pool_empty') {
        return res.status(409).json({ message: 'No seats available — buy more before unsuspending', code: 'BILLING_MEMBERSHIP_UNSUSPEND_NO_SEATS', seatsAvailable: 0 });
      }
      return sendClientError(res, 400, 'BILLING_MEMBERSHIP_UNSUSPEND_REJECTED', result.error);
    }

    const seatsAvailable = await seats.getSeatsAvailable(manager.organizationId._id);
    if (member.userId) {
      await createNotification({
        userId: member.userId,
        category: 'institution',
        severity: 'success',
        type: 'institution.member.unsuspended',
        titleKey: 'notifications.institutionSeatRestoredTitle',
        bodyKey: 'notifications.institutionSeatRestoredBody',
        params: { organizationName: manager.organizationId.name },
        action: { labelKey: 'notifications.viewProfileAction', route: '/profile/account' },
        organizationId: manager.organizationId._id,
        actorUserId: req.userId,
      });
    }
    res.json({
      membership: sanitizeMembership(await result.membership.populate('userId', 'username email')),
      seat: result.seat
        ? { _id: result.seat._id, state: result.seat.state, activatedAt: result.seat.activatedAt, expiresAt: result.seat.expiresAt }
        : null,
      seatsAvailable,
    });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_MEMBERSHIP_UNSUSPEND_FAILED', {
      clientMessage: 'Could not unsuspend membership',
      metadata: { userId: req.userId, organizationId: req.params.organizationId, membershipId: req.params.membershipId },
    });
  }
});

router.post('/institution/organizations/:organizationId/members/:membershipId/request-suspension', async (req, res) => {
  try {
    const member = await OrganizationMembership.findOne({
      _id: req.params.membershipId,
      organizationId: req.params.organizationId,
    });
    if (!member) return sendClientError(res, 404, 'BILLING_SUSPENSION_REQUEST_MEMBER_NOT_FOUND', 'Member not found');
    if (String(member.userId || '') !== String(req.userId)) {
      return sendClientError(res, 403, 'BILLING_SUSPENSION_REQUEST_NOT_OWN_MEMBERSHIP', 'You can only request suspension on your own membership');
    }

    const note = cleanText(req.body?.note, 1000);
    const result = await seats.recordSuspensionRequest({
      membershipId: member._id,
      requestedByUserId: req.userId,
      note,
    });
    if (!result.ok) return sendClientError(res, 400, 'BILLING_SUSPENSION_REQUEST_REJECTED', result.error);

    await notifyOrganizationManagers(req.params.organizationId, {
      category: 'institution',
      severity: 'warning',
      type: 'institution.member.suspension_requested',
      titleKey: 'notifications.suspensionRequestedTitle',
      bodyKey: 'notifications.suspensionRequestedBody',
      params: { email: member.email },
      action: { labelKey: 'notifications.openInstitutionAction', route: '/institution' },
      actorUserId: req.userId,
    });

    res.status(201).json({ suspensionRequest: result.membership.suspensionRequest });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_MEMBERSHIP_SUSPENSION_REQUEST_FAILED', {
      clientMessage: 'Could not record suspension request',
      metadata: { userId: req.userId, organizationId: req.params.organizationId, membershipId: req.params.membershipId },
    });
  }
});

router.get('/institution/organizations/:organizationId/seat-wallet', async (req, res) => {
  try {
    const manager = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!manager) return sendClientError(res, 403, 'BILLING_SEAT_WALLET_MANAGER_REQUIRED', 'Institution manager access is required');
    const wallet = await seats.getSeatWallet(manager.organizationId._id);
    res.json(wallet);
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_SEAT_WALLET_FAILED', {
      clientMessage: 'Could not load seat wallet',
      metadata: { userId: req.userId, organizationId: req.params.organizationId },
    });
  }
});

router.put('/institution/organizations/:organizationId/auto-renew', async (req, res) => {
  try {
    const manager = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!manager) return sendClientError(res, 403, 'BILLING_AUTO_RENEW_CONFIGURE_MANAGER_REQUIRED', 'Institution manager access is required');

    const body = req.body || {};
    const autoRenew = await seats.configureAutoRenew({
      orgId: manager.organizationId._id,
      enabled: body.enabled,
      threshold: body.threshold,
      refillQuantity: body.refillQuantity,
      planId: typeof body.planId === 'string' ? body.planId : undefined,
      paymentMethodId: typeof body.paymentMethodId === 'string' ? body.paymentMethodId : undefined,
      stripeCustomerId: typeof body.stripeCustomerId === 'string' ? body.stripeCustomerId : undefined,
      updatedByUserId: req.userId,
    });

    await BillingEvent.create({
      provider: 'manual',
      type: 'seats.auto_renew_configured',
      status: 'processed',
      organizationId: manager.organizationId._id,
      userId: req.userId,
      payload: {
        enabled: autoRenew?.enabled,
        threshold: autoRenew?.threshold,
        refillQuantity: autoRenew?.refillQuantity,
        planId: autoRenew?.planId,
        hasPaymentMethod: !!autoRenew?.paymentMethodId,
      },
    }).catch(() => null);

    res.json({ autoRenew });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_AUTO_RENEW_CONFIGURE_FAILED', {
      clientMessage: 'Could not save auto-renew settings',
      metadata: { userId: req.userId, organizationId: req.params.organizationId },
    });
  }
});

router.get('/institution/organizations/:organizationId/seat-projection', async (req, res) => {
  try {
    const manager = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!manager) return sendClientError(res, 403, 'BILLING_SEAT_PROJECTION_MANAGER_REQUIRED', 'Institution manager access is required');
    const horizonDays = Math.min(60, Math.max(1, parseInt(req.query?.horizonDays, 10) || 7));
    const projection = await seats.getSeatProjection(manager.organizationId._id, horizonDays);
    res.json(projection);
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_SEAT_PROJECTION_FAILED', {
      clientMessage: 'Could not compute seat projection',
      metadata: { userId: req.userId, organizationId: req.params.organizationId },
    });
  }
});

router.get('/institution/organizations/:organizationId/members/:membershipId/seat-history', async (req, res) => {
  try {
    const member = await OrganizationMembership.findOne({
      _id: req.params.membershipId,
      organizationId: req.params.organizationId,
    });
    if (!member) return sendClientError(res, 404, 'BILLING_SEAT_HISTORY_MEMBER_NOT_FOUND', 'Member not found');

    const isOwnHistory = String(member.userId || '') === String(req.userId);
    if (!isOwnHistory) {
      const manager = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
      if (!manager) return sendClientError(res, 403, 'BILLING_SEAT_HISTORY_MANAGER_REQUIRED', 'Institution manager access is required');
    }
    const limit = Math.min(200, Math.max(1, parseInt(req.query?.limit, 10) || 50));
    const history = await seats.getMembershipSeatHistory(member._id, limit);
    res.json({ seatAssignments: history });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_SEAT_HISTORY_FAILED', {
      clientMessage: 'Could not load seat history',
      metadata: { userId: req.userId, organizationId: req.params.organizationId, membershipId: req.params.membershipId },
    });
  }
});

router.use('/admin', isAdmin);

router.get('/admin/overview', async (req, res) => {
  const [subscriptions, organizations, leads, recentEvents, planOverrides, discounts, plans] = await Promise.all([
    SubscriptionRecord.find().sort({ createdAt: -1 }).limit(30).populate('ownerId').lean(),
    Organization.find().sort({ createdAt: -1 }).limit(30).lean(),
    InstitutionalLead.find({ status: 'open' }).sort({ createdAt: -1 }).limit(30).lean(),
    BillingEvent.find().sort({ createdAt: -1 }).limit(20).lean(),
    BillingPlanOverride.find().sort({ planId: 1 }).lean(),
    DiscountCode.find().sort({ createdAt: -1 }).limit(100).lean(),
    publicPlansWithOverrides(),
  ]);

  const [activeIndividual, activeInstitutional, openInstitutionLeads] = await Promise.all([
    SubscriptionRecord.countDocuments({ ownerType: 'user', status: { $in: ['active', 'trialing'] } }),
    Organization.countDocuments({ status: { $in: ['active', 'trialing'] } }),
    InstitutionalLead.countDocuments({ status: 'open' }),
  ]);

  res.json({
    counts: { activeIndividual, activeInstitutional, openInstitutionLeads },
    subscriptions,
    organizations,
    leads,
    recentEvents,
    plans,
    planOverrides,
    discounts: discounts.map(publicDiscount),
  });
});

router.get('/admin/pricing', async (req, res) => {
  try {
    const [plans, planOverrides, discounts] = await Promise.all([
      publicPlansWithOverrides(),
      BillingPlanOverride.find().sort({ planId: 1 }).lean(),
      DiscountCode.find().sort({ createdAt: -1 }).limit(200).lean(),
    ]);
    res.json({ plans, planOverrides, discounts: discounts.map(publicDiscount) });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_PRICING_LOAD_FAILED', { clientMessage: 'Could not load pricing settings' });
  }
});

router.put('/admin/plan-overrides/:planId', async (req, res) => {
  try {
    const basePlan = getIndividualPlan(req.params.planId) || getInstitutionalPlan(req.params.planId);
    if (!basePlan) return sendClientError(res, 404, 'BILLING_ADMIN_PLAN_OVERRIDE_PLAN_NOT_FOUND', 'Plan not found');
    const body = req.body || {};
    const update = {
      planId: basePlan.id,
      audience: basePlan.audience,
      active: body.active !== false,
      name: cleanLine(body.name, 120),
      tagline: cleanLine(body.tagline, 260),
      notes: cleanText(body.notes, 2000),
      updatedBy: req.userId,
    };

    if (basePlan.audience === 'individual') {
      update.monthlyPriceCents = cleanCents(body.monthlyPriceCents);
      update.annualPriceCents = cleanCents(body.annualPriceCents);
      update.stripeMonthlyPriceId = cleanLine(body.stripeMonthlyPriceId, 200);
      update.stripeAnnualPriceId = cleanLine(body.stripeAnnualPriceId, 200);
    } else {
      update.pricePerSeatCents = cleanCents(body.pricePerSeatCents);
      update.minimumSeats = cleanPositiveInt(body.minimumSeats, null);
      update.stripeSeatPackPriceId = cleanLine(body.stripeSeatPackPriceId, 200);
      if (Array.isArray(body.bulkPricing)) {
        update.bulkPricing = body.bulkPricing
          .map((tier) => ({
            minSeats: cleanPositiveInt(tier?.minSeats, 1),
            pricePerSeatCents: cleanCents(tier?.pricePerSeatCents),
          }))
          .filter((tier) => tier.minSeats > 0 && Number.isFinite(tier.pricePerSeatCents) && tier.pricePerSeatCents >= 0)
          .sort((a, b) => a.minSeats - b.minSeats);
      }
    }

    const override = await BillingPlanOverride.findOneAndUpdate(
      { planId: basePlan.id },
      { $set: update },
      { new: true, upsert: true },
    ).lean();

    await BillingEvent.create({
      provider: 'manual',
      type: 'pricing.plan_override.updated',
      status: 'processed',
      userId: req.userId,
      payload: { planId: basePlan.id, active: override.active },
    });

    res.json({ override, plans: await publicPlansWithOverrides() });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_PLAN_OVERRIDE_UPDATE_FAILED', {
      clientMessage: 'Could not update plan pricing',
      metadata: { userId: req.userId, planId: req.params.planId },
    });
  }
});

function discountPayload(body, userId, isCreate = false) {
  const type = DISCOUNT_TYPES.includes(body.discountType) ? body.discountType : 'percent';
  const applicationMode = DISCOUNT_APPLICATION_MODES.includes(body.applicationMode) ? body.applicationMode : 'code';
  const payload = {
    active: body.active !== false,
    applicationMode,
    description: cleanLine(body.description, 220),
    discountType: type,
    percentOff: type === 'percent' ? cleanPositiveInt(body.percentOff, 1) : null,
    amountOffCents: type === 'fixed' ? cleanPositiveInt(body.amountOffCents, 1) : null,
    currency: cleanLine(body.currency || 'usd', 10).toLowerCase(),
    appliesToAudience: DISCOUNT_AUDIENCES.includes(body.appliesToAudience) ? body.appliesToAudience : 'all',
    appliesToPlanIds: Array.isArray(body.appliesToPlanIds)
      ? body.appliesToPlanIds.map((planId) => cleanLine(planId, 80).toLowerCase()).filter(Boolean)
      : [],
    startsAt: cleanDateOrNull(body.startsAt),
    expiresAt: cleanDateOrNull(body.expiresAt),
    maxRedemptions: cleanPositiveInt(body.maxRedemptions, null),
    stripePromotionCodeId: cleanLine(body.stripePromotionCodeId, 200),
    stripeCouponId: cleanLine(body.stripeCouponId, 200),
    notes: cleanText(body.notes, 2000),
    updatedBy: userId,
  };
  if (isCreate) {
    const providedCode = discountCodeValue(body.code);
    payload.code = applicationMode === 'automatic'
      ? providedCode || `AUTO-${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`.toUpperCase()
      : providedCode;
    payload.createdBy = userId;
    payload.redemptions = 0;
  }
  if (payload.percentOff) payload.percentOff = Math.min(payload.percentOff, 100);
  return payload;
}

router.post('/admin/discounts', async (req, res) => {
  try {
    const payload = discountPayload(req.body || {}, req.userId, true);
    if (payload.applicationMode !== 'automatic' && !payload.code) {
      return sendClientError(res, 400, 'BILLING_ADMIN_DISCOUNT_CODE_REQUIRED', 'Discount code is required');
    }
    const discount = await DiscountCode.create(payload);
    await BillingEvent.create({
      provider: 'manual',
      type: 'pricing.discount.created',
      status: 'processed',
      userId: req.userId,
      payload: { code: discount.code },
    });
    res.status(201).json({ discount: publicDiscount(discount) });
  } catch (error) {
    if (error.code === 11000) return sendClientError(res, 409, 'BILLING_ADMIN_DISCOUNT_DUPLICATE', 'Discount code already exists');
    return sendServerError(req, res, error, 'BILLING_ADMIN_DISCOUNT_CREATE_FAILED', {
      clientMessage: 'Could not create discount',
      metadata: { userId: req.userId },
    });
  }
});

router.put('/admin/discounts/:discountId', async (req, res) => {
  try {
    const discount = await DiscountCode.findByIdAndUpdate(
      req.params.discountId,
      { $set: discountPayload(req.body || {}, req.userId, false) },
      { new: true },
    );
    if (!discount) return sendClientError(res, 404, 'BILLING_ADMIN_DISCOUNT_NOT_FOUND', 'Discount not found');
    await BillingEvent.create({
      provider: 'manual',
      type: 'pricing.discount.updated',
      status: 'processed',
      userId: req.userId,
      payload: { code: discount.code },
    });
    res.json({ discount: publicDiscount(discount) });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_DISCOUNT_UPDATE_FAILED', {
      clientMessage: 'Could not update discount',
      metadata: { userId: req.userId, discountId: req.params.discountId },
    });
  }
});

router.get('/admin/subscriptions', async (req, res) => {
  try {
    const subscriptions = await SubscriptionRecord.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .populate('ownerId')
      .lean();
    res.json({ subscriptions });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_SUBSCRIPTIONS_LOAD_FAILED', { clientMessage: 'Could not load subscriptions' });
  }
});

router.post('/admin/manual-plan', async (req, res) => {
  try {
    const plan = getIndividualPlan(req.body?.planId || req.body?.tier);
    const status = ['active', 'trialing', 'cancelled'].includes(req.body?.status) ? req.body.status : 'active';
    const userLookup = cleanLine(req.body?.userIdOrEmail || req.body?.email || req.body?.userId, 254);

    if (!plan) return sendClientError(res, 400, 'BILLING_ADMIN_MANUAL_PLAN_PLAN_INVALID', 'Invalid individual plan');
    if (!userLookup) return sendClientError(res, 400, 'BILLING_ADMIN_MANUAL_PLAN_USER_REQUIRED', 'User email or id is required');

    const user = mongoose.isValidObjectId(userLookup)
      ? await User.findById(userLookup)
      : await User.findOne({ email: userLookup.toLowerCase() });

    if (!user) return sendClientError(res, 404, 'BILLING_ADMIN_MANUAL_PLAN_USER_NOT_FOUND', 'User not found');

    user.subscriptionTier = plan.tier;
    user.billingOverride = {
      tier: plan.tier,
      status,
      reason: cleanText(req.body?.reason, 500),
      expiresAt: req.body?.expiresAt ? new Date(req.body.expiresAt) : null,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };
    await user.save();

    await upsertSubscriptionRecord({
      ownerType: 'user',
      ownerId: user._id,
      plan,
      source: BILLING_SOURCES.MANUAL,
      provider: 'manual',
      status,
      interval: 'custom',
      providerSubscriptionId: `manual-${user._id}-${plan.id}`,
      currentPeriodEnd: user.billingOverride.expiresAt || null,
      metadata: {
        reason: user.billingOverride.reason,
        updatedBy: String(req.userId),
      },
    });

    await BillingEvent.create({
      provider: 'manual',
      type: 'manual.plan.updated',
      status: 'processed',
      userId: user._id,
      payload: { planId: plan.id, status, updatedBy: req.userId },
    });

    const sanitized = await User.findById(user._id).select('-password');
    res.json({ message: 'Plan updated', user: sanitized, entitlements: getAiEntitlements(sanitized) });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_MANUAL_PLAN_FAILED', {
      clientMessage: 'Could not update manual plan',
      metadata: { userId: req.userId },
    });
  }
});

router.post('/admin/users/:userId/manual-plan', async (req, res) => {
  try {
    const plan = getIndividualPlan(req.body?.planId || req.body?.tier);
    const status = ['active', 'trialing', 'cancelled'].includes(req.body?.status) ? req.body.status : 'active';
    if (!plan) return sendClientError(res, 400, 'BILLING_ADMIN_USER_MANUAL_PLAN_PLAN_INVALID', 'Invalid individual plan');

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          subscriptionTier: plan.tier,
          billingOverride: {
            tier: plan.tier,
            status,
            reason: cleanText(req.body?.reason, 500),
            expiresAt: req.body?.expiresAt ? new Date(req.body.expiresAt) : null,
            updatedBy: req.userId,
            updatedAt: new Date(),
          },
        },
      },
      { new: true }
    ).select('-password');

    if (!user) return sendClientError(res, 404, 'BILLING_ADMIN_USER_MANUAL_PLAN_USER_NOT_FOUND', 'User not found');

    await BillingEvent.create({
      provider: 'manual',
      type: 'manual.plan.updated',
      status: 'processed',
      userId: user._id,
      payload: { planId: plan.id, status, updatedBy: req.userId },
    });

    res.json({ message: 'Plan updated', user, entitlements: getAiEntitlements(user) });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_USER_MANUAL_PLAN_FAILED', {
      clientMessage: 'Could not update manual plan',
      metadata: { userId: req.params.userId, actorId: req.userId },
    });
  }
});

router.get('/admin/organizations', async (req, res) => {
  try {
    const organizations = await Organization.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    await repairOwnerLearnerMemberships(null, organizations);
    const memberships = await OrganizationMembership.find({
      organizationId: { $in: organizations.map((org) => org._id) },
      role: { $in: ORG_MANAGER_ROLES },
      status: 'active',
    })
      .populate('userId', 'username email')
      .lean();
    const managersByOrg = memberships.reduce((acc, membership) => {
      const key = String(membership.organizationId);
      if (!acc[key]) acc[key] = [];
      acc[key].push(sanitizeMembership(membership));
      return acc;
    }, {});
    organizations.forEach((org) => {
      org.managers = managersByOrg[String(org._id)] || [];
    });
    res.json({ organizations });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_ORGANIZATIONS_LOAD_FAILED', { clientMessage: 'Could not load organizations' });
  }
});

router.post('/admin/organizations', async (req, res) => {
  try {
    const body = req.body || {};
    const plan = await effectiveInstitutionalPlan(body.planId, 'institution_basic');
    const name = cleanLine(body.name, 180);
    if (!name) return sendClientError(res, 400, 'BILLING_ADMIN_ORGANIZATION_CREATE_NAME_REQUIRED', 'Organization name is required');

    const org = await Organization.create({
      name,
      slug: `${slugify(name)}-${Date.now().toString(36)}`,
      type: ORG_TYPES.includes(body.type) ? body.type : 'other',
      planId: plan.id,
      effectiveTier: plan.tier,
      status: ['lead', 'trialing', 'active', 'past_due', 'cancelled', 'suspended'].includes(body.status) ? body.status : 'active',
      seatsPurchased: Math.max(parseInt(body.seatsPurchased, 10) || plan.minimumSeats || 10, 1),
      billingSource: 'manual',
      billingEmail: cleanLine(body.billingEmail, 254).toLowerCase(),
      notes: cleanText(body.notes, 3000),
      allowedTargetLanguages: cleanLanguageList(body.allowedTargetLanguages),
      defaultTargetLanguage: cleanLanguageList([body.defaultTargetLanguage])[0] || '',
      allowLanguageRequests: body.allowLanguageRequests !== false,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
    });

    await BillingEvent.create({
      provider: 'manual',
      type: 'organization.created',
      status: 'processed',
      organizationId: org._id,
      payload: { planId: plan.id, createdBy: req.userId },
    });

    res.status(201).json({ organization: org });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_ORGANIZATION_CREATE_FAILED', {
      clientMessage: 'Could not create organization',
      metadata: { userId: req.userId },
    });
  }
});

router.put('/admin/organizations/:organizationId', async (req, res) => {
  try {
    const body = req.body || {};
    const org = await Organization.findById(req.params.organizationId);
    if (!org) return sendClientError(res, 404, 'BILLING_ADMIN_ORGANIZATION_UPDATE_NOT_FOUND', 'Organization not found');
    const previousStatus = org.status;

    const plan = body.planId ? await effectiveInstitutionalPlan(body.planId, 'institution_basic') : null;
    if (body.name) org.name = cleanLine(body.name, 180);
    if (body.type && ORG_TYPES.includes(body.type)) {
      org.type = body.type;
    }
    if (plan) {
      org.planId = plan.id;
      org.effectiveTier = plan.tier;
    }
    if (body.status && ['lead', 'trialing', 'active', 'past_due', 'cancelled', 'suspended'].includes(body.status)) {
      org.status = body.status;
    }
    if (body.seatsPurchased !== undefined) org.seatsPurchased = Math.max(parseInt(body.seatsPurchased, 10) || org.seatsPurchased, 1);
    if (body.billingEmail !== undefined) org.billingEmail = cleanLine(body.billingEmail, 254).toLowerCase();
    if (body.notes !== undefined) org.notes = cleanText(body.notes, 3000);
    if (body.allowedTargetLanguages !== undefined) org.allowedTargetLanguages = cleanLanguageList(body.allowedTargetLanguages);
    if (body.defaultTargetLanguage !== undefined) {
      const normalizedDefault = cleanLanguageList([body.defaultTargetLanguage])[0] || '';
      org.defaultTargetLanguage = normalizedDefault;
      if (normalizedDefault && org.allowedTargetLanguages.length && !org.allowedTargetLanguages.includes(normalizedDefault)) {
        org.allowedTargetLanguages.push(normalizedDefault);
      }
    }
    if (body.allowLanguageRequests !== undefined) org.allowLanguageRequests = body.allowLanguageRequests !== false;
    if (body.expiresAt !== undefined) org.expiresAt = body.expiresAt ? new Date(body.expiresAt) : null;
    await org.save();

    const activeMemberships = await OrganizationMembership.find({ organizationId: org._id, status: 'active' });
    await Promise.all(activeMemberships.map((membership) => (
      membership.userId
        ? User.findByIdAndUpdate(membership.userId, {
          $set: {
            institutionalAccess: {
              organizationId: org._id,
              organizationName: org.name,
              planId: org.planId,
              effectiveTier: org.effectiveTier,
              role: membership.role,
              status: org.status,
              expiresAt: org.expiresAt || null,
              updatedAt: new Date(),
            },
          },
        })
        : Promise.resolve()
    )));

    await BillingEvent.create({
      provider: 'manual',
      type: 'organization.updated',
      status: 'processed',
      organizationId: org._id,
      payload: { updatedBy: req.userId },
    });

    if (previousStatus !== org.status && ['suspended', 'active', 'trialing'].includes(org.status)) {
      await notifyInstitutionStatusChanged({
        organization: org,
        status: org.status === 'suspended' ? 'suspended' : 'reactivated',
        actorUserId: req.userId,
      });
    }

    res.json({ organization: org });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_ORGANIZATION_UPDATE_FAILED', {
      clientMessage: 'Could not update organization',
      metadata: { userId: req.userId, organizationId: req.params.organizationId },
    });
  }
});

router.post('/admin/organizations/:organizationId/members', async (req, res) => {
  try {
    const org = await Organization.findById(req.params.organizationId);
    if (!org) return sendClientError(res, 404, 'BILLING_ADMIN_ORGANIZATION_MEMBER_ADD_ORG_NOT_FOUND', 'Organization not found');

    const email = cleanLine(req.body?.email, 254).toLowerCase();
    if (!EMAIL_REGEX.test(email)) return sendClientError(res, 400, 'BILLING_ADMIN_ORGANIZATION_MEMBER_ADD_EMAIL_INVALID', 'A valid email address is required');

    const user = await User.findOne({ email });
    const role = ['owner', 'admin', 'teacher', 'learner'].includes(req.body?.role) ? req.body.role : 'learner';
    const consumesSeat = role === 'learner';
    const existing = await OrganizationMembership.findOne({ organizationId: org._id, email });
    const existingHasLiveSeat = existing && existing.userId
      ? !!(await seats.currentSeat(existing.userId, org._id))
      : false;
    const needsFreshSeat = consumesSeat && !existingHasLiveSeat;
    if (needsFreshSeat) {
      const available = await seats.getSeatsAvailable(org._id);
      if (available <= 0) {
        return res.status(400).json({ message: 'No seats available', code: 'BILLING_ADMIN_ORGANIZATION_MEMBER_ADD_NO_SEATS', seatsAvailable: 0 });
      }
    }

    const membership = await OrganizationMembership.findOneAndUpdate(
      { organizationId: org._id, email },
      {
        $set: {
          userId: user?._id || null,
          role,
          status: user ? 'active' : 'invited',
          consumesSeat,
          invitedBy: req.userId,
          joinedAt: user ? new Date() : null,
        },
      },
      { new: true, upsert: true }
    );

    if (user) {
      await User.findByIdAndUpdate(user._id, {
        $set: {
          institutionalAccess: {
            organizationId: org._id,
            organizationName: org.name,
            planId: org.planId,
            effectiveTier: org.effectiveTier,
            role: membership.role,
            status: org.status,
            expiresAt: org.expiresAt || null,
            updatedAt: new Date(),
          },
        },
      });
    }

    let allocatedSeat = null;
    if (user && consumesSeat && membership.status === 'active') {
      allocatedSeat = await seats.tryAllocateSeat({
        userId: user._id,
        orgId: org._id,
        membershipId: membership._id,
        trigger: 'admin_add',
        triggeredByUserId: req.userId,
      });
    }

    org.seatsUsed = await updateOrganizationSeatCount(org._id);
    const seatsAvailable = await seats.getSeatsAvailable(org._id);
    if (user) {
      await notifyInstitutionAccess({
        userId: user._id,
        organization: org,
        membership,
        actorUserId: req.userId,
        source: membership.role === 'learner' ? 'learner_added' : 'member_added',
      });
    }
    await notifySeatThresholdIfNeeded(org._id, seatsAvailable, org.seatsPurchased || 0, req.userId);

    res.status(201).json({
      membership,
      seatsAvailable,
      currentSeat: allocatedSeat
        ? { _id: allocatedSeat._id, state: allocatedSeat.state, activatedAt: allocatedSeat.activatedAt, expiresAt: allocatedSeat.expiresAt }
        : null,
    });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_ORGANIZATION_MEMBER_ADD_FAILED', {
      clientMessage: 'Could not add organization member',
      metadata: { userId: req.userId, organizationId: req.params.organizationId },
    });
  }
});

router.post('/admin/organizations/:organizationId/institution-admin', async (req, res) => {
  try {
    const org = await Organization.findById(req.params.organizationId);
    if (!org) return sendClientError(res, 404, 'BILLING_ADMIN_INSTITUTION_ADMIN_ASSIGN_ORG_NOT_FOUND', 'Organization not found');

    const email = cleanLine(req.body?.email, 254).toLowerCase();
    if (!EMAIL_REGEX.test(email)) return sendClientError(res, 400, 'BILLING_ADMIN_INSTITUTION_ADMIN_ASSIGN_EMAIL_INVALID', 'A valid email address is required');

    const user = await User.findOne({ email });
    if (!user) return sendClientError(res, 404, 'BILLING_ADMIN_INSTITUTION_ADMIN_ASSIGN_USER_NOT_FOUND', 'User not found');

    const membership = await OrganizationMembership.findOneAndUpdate(
      { organizationId: org._id, email },
      {
        $set: {
          userId: user._id,
          role: 'admin',
          status: 'active',
          consumesSeat: false,
          invitedBy: req.userId,
          joinedAt: new Date(),
        },
      },
      { new: true, upsert: true }
    );

    await setUserInstitutionalAccess(user._id, org, membership);

    org.seatsUsed = await updateOrganizationSeatCount(org._id);

    await BillingEvent.create({
      provider: 'manual',
      type: 'organization.institution_admin.assigned',
      status: 'processed',
      organizationId: org._id,
      userId: user._id,
      payload: { assignedBy: req.userId, email },
    });

    await notifyInstitutionAccess({
      userId: user._id,
      organization: org,
      membership,
      actorUserId: req.userId,
      source: 'admin_assigned',
    });

    const sanitized = await User.findById(user._id).select('-password');
    res.status(200).json({
      membership,
      user: sanitized,
      entitlements: getAiEntitlements(sanitized),
    });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_INSTITUTION_ADMIN_ASSIGN_FAILED', {
      clientMessage: 'Could not assign institution admin',
      metadata: { userId: req.userId, organizationId: req.params.organizationId },
    });
  }
});

router.delete('/admin/organizations/:organizationId/institution-admins/:membershipId', async (req, res) => {
  try {
    const org = await Organization.findById(req.params.organizationId);
    if (!org) return sendClientError(res, 404, 'BILLING_ADMIN_INSTITUTION_ADMIN_REMOVE_ORG_NOT_FOUND', 'Organization not found');
    const membership = await OrganizationMembership.findOne({
      _id: req.params.membershipId,
      organizationId: org._id,
      role: { $in: ORG_MANAGER_ROLES },
    });
    if (!membership) return sendClientError(res, 404, 'BILLING_ADMIN_INSTITUTION_ADMIN_REMOVE_NOT_FOUND', 'Institution admin not found');

    membership.status = 'removed';
    await membership.save();
    if (membership.userId) {
      await clearUserInstitutionalAccess(membership.userId, org._id);
    }
    org.seatsUsed = await updateOrganizationSeatCount(org._id);

    await BillingEvent.create({
      provider: 'manual',
      type: 'organization.institution_admin.removed',
      status: 'processed',
      organizationId: org._id,
      userId: membership.userId || null,
      payload: { removedBy: req.userId, email: membership.email },
    });

    if (membership.userId) {
      await notifyInstitutionAccessRemoved({ userId: membership.userId, organization: org, actorUserId: req.userId });
    }

    res.json({ message: 'Institution admin removed', seatsUsed: org.seatsUsed });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_INSTITUTION_ADMIN_REMOVE_FAILED', {
      clientMessage: 'Could not remove institution admin',
      metadata: { userId: req.userId, organizationId: req.params.organizationId, membershipId: req.params.membershipId },
    });
  }
});

router.get('/admin/institutional-leads', async (req, res) => {
  try {
    const status = ['open', 'contacted', 'accepted', 'declined', 'converted', 'closed'].includes(req.query?.status) ? req.query.status : undefined;
    const filter = status ? { status } : {};
    const leads = await InstitutionalLead.find(filter)
      .sort({ createdAt: -1 })
      .limit(200)
      .populate('userId', 'username email role')
      .populate('organizationId', 'name status planId seatsPurchased')
      .lean();
    res.json({ leads });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_INSTITUTIONAL_LEADS_LOAD_FAILED', { clientMessage: 'Could not load institutional leads' });
  }
});

router.put('/admin/institutional-leads/:leadId/status', async (req, res) => {
  try {
    const status = ['open', 'contacted', 'accepted', 'declined', 'converted', 'closed'].includes(req.body?.status) ? req.body.status : 'contacted';
    const lead = await InstitutionalLead.findById(req.params.leadId);
    if (!lead) return sendClientError(res, 404, 'BILLING_ADMIN_INSTITUTIONAL_LEAD_NOT_FOUND', 'Lead not found');

    if (status === 'accepted' || status === 'converted') {
      const result = await acceptInstitutionalLead(lead, req.userId);
      await BillingEvent.create({
        provider: 'manual',
        type: 'institution.lead.accepted',
        status: 'processed',
        organizationId: result.org._id,
        userId: result.user._id,
        payload: { leadId: lead._id, acceptedBy: req.userId },
      });
      await notifyInstitutionRequestStatus({
        userId: result.user._id,
        organization: result.org,
        status: 'accepted',
        actorUserId: req.userId,
      });
      return res.json({ lead, organization: result.org, membership: result.membership });
    }

    lead.status = status === 'closed' ? 'declined' : status;
    if (lead.status === 'declined') {
      lead.reviewedBy = req.userId;
      lead.reviewedAt = new Date();
    }
    await lead.save();
    if (lead.status === 'declined' && lead.userId && lead.organizationId) {
      const organization = await Organization.findById(lead.organizationId).select('name').lean();
      if (organization) {
        await notifyInstitutionRequestStatus({
          userId: lead.userId,
          organization,
          status: 'declined',
          actorUserId: req.userId,
        });
      }
    }
    res.json({ lead });
  } catch (error) {
    return sendServerError(req, res, error, 'BILLING_ADMIN_INSTITUTIONAL_LEAD_STATUS_FAILED', {
      httpStatus: error.statusCode || 500,
      clientMessage: error.message || 'Could not update lead',
      metadata: { userId: req.userId, leadId: req.params.leadId },
    });
  }
});

module.exports = router;
