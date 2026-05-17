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
const { verifyToken, optionalAuth, isAdmin } = require('../middleware/auth');
const { getClientIp } = require('../utils/geo');
const {
  getAiEntitlements,
  getSubscriptionSummary,
  isActiveStatus,
  normalizeTier,
} = require('../utils/subscription');
const {
  BILLING_SOURCES,
  INDIVIDUAL_PLANS,
  INSTITUTIONAL_PLANS,
  getIndividualPlan,
  getInstitutionalPlan,
  providerPriceFor,
  priceCentsFor,
  applyPlanOverride,
  publicPlan,
} = require('../utils/billingPlans');

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ORG_TYPES = ['school', 'company', 'church', 'language_center', 'nonprofit', 'government', 'other'];
const ORG_STATUSES = ['lead', 'trialing', 'active', 'past_due', 'cancelled', 'suspended'];
const ORG_ROLES = ['owner', 'admin', 'teacher', 'learner'];
const ORG_MANAGER_ROLES = ['owner', 'admin'];
const ORG_OVERSIGHT_ROLES = ['owner', 'admin', 'teacher'];
const DISCOUNT_TYPES = ['percent', 'fixed'];
const DISCOUNT_AUDIENCES = ['all', 'individual', 'institution'];
const DISCOUNT_APPLICATION_MODES = ['code', 'automatic'];

function cleanText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function cleanLine(value, maxLength) {
  return cleanText(value, maxLength).replace(/[\r\n]+/g, ' ');
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
  });
  await Organization.findByIdAndUpdate(organizationId, { $set: { seatsUsed } });
  return seatsUsed;
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

  return User.findByIdAndUpdate(userId, { $set: update }, { new: true }).select('-password');
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
    await Organization.findByIdAndUpdate(ownerId, {
      $set: {
        planId: plan.id,
        effectiveTier: plan.tier,
        status: isActiveStatus(status) ? status : 'past_due',
        seatsPurchased: seats,
        billingSource: source,
        subscriptionId: record._id,
        expiresAt: currentPeriodEnd,
      },
    });
  }

  return record;
}

async function createStripeCheckoutSession({ user, plan, interval, successUrl, cancelUrl, discount = null }) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const priceId = providerPriceFor(plan, interval, BILLING_SOURCES.WEB);
  const amountCents = priceCentsFor(plan, interval);
  const canUseDynamicPrice = Number.isFinite(amountCents) && amountCents > 0;
  const overridePriceId = interval === 'annual' ? plan.stripeAnnualPriceId : plan.stripeMonthlyPriceId;
  const discountHasStripeLink = !!(discount?.stripePromotionCodeId || discount?.stripeCouponId);
  const shouldUseDynamicPrice = canUseDynamicPrice && (
    !priceId
    || (plan.pricingOverrideActive && !overridePriceId)
    || (discount && !discountHasStripeLink)
  );

  if (!secret || (!priceId && !shouldUseDynamicPrice)) {
    return {
      requiresSetup: true,
      missing: [
        !secret ? 'STRIPE_SECRET_KEY' : null,
        !priceId && !shouldUseDynamicPrice ? plan.providerKeys?.[interval === 'annual' ? 'stripeAnnual' : 'stripeMonthly'] : null,
      ].filter(Boolean),
    };
  }

  const body = new URLSearchParams();
  body.set('mode', 'subscription');
  body.set('success_url', successUrl || frontendUrl('/billing?checkout=success'));
  body.set('cancel_url', cancelUrl || frontendUrl('/pricing?checkout=cancelled'));
  body.set('client_reference_id', String(user._id));
  body.set('customer_email', user.email);
  if (shouldUseDynamicPrice) {
    body.set('line_items[0][price_data][currency]', 'usd');
    body.set('line_items[0][price_data][unit_amount]', String(discountedAmountCents(amountCents, discount)));
    body.set('line_items[0][price_data][recurring][interval]', interval === 'annual' ? 'year' : 'month');
    body.set('line_items[0][price_data][product_data][name]', plan.name);
  } else {
    body.set('line_items[0][price]', priceId);
    if (discount?.stripePromotionCodeId) {
      body.set('discounts[0][promotion_code]', discount.stripePromotionCodeId);
    } else if (discount?.stripeCouponId) {
      body.set('discounts[0][coupon]', discount.stripeCouponId);
    }
  }
  body.set('line_items[0][quantity]', '1');
  body.set('metadata[userId]', String(user._id));
  body.set('metadata[planId]', plan.id);
  body.set('metadata[tier]', plan.tier);
  body.set('metadata[interval]', interval);
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
  const plan = getIndividualPlan(metadata.planId || metadata.tier);
  const userId = metadata.userId;

  if (type === 'checkout.session.completed' && plan && userId) {
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
    const existingPlan = existing ? getIndividualPlan(existing.planId) : null;
    const nextPlan = getIndividualPlan(metadata.planId || existing?.planId) || existingPlan;
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
      return 'processed';
    }
  }

  return 'ignored';
}

router.get('/plans', async (req, res) => {
  try {
    res.json(await publicPlansWithOverrides());
  } catch (error) {
    console.error('Plans load error:', error);
    res.status(500).json({ message: 'Could not load plans' });
  }
});

router.post('/discounts/validate', async (req, res) => {
  try {
    const plan = getIndividualPlan(req.body?.planId) || getInstitutionalPlan(req.body?.planId);
    if (!plan) return res.status(400).json({ message: 'Choose a valid plan' });
    const discount = await validateDiscountForPlan(req.body?.discountCode, plan);
    if (!discount) return res.status(404).json({ message: 'Discount code is not available' });
    res.json({ discount: publicDiscount(discount) });
  } catch (error) {
    res.status(500).json({ message: 'Could not validate discount code' });
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
    res.status(500).json({ message: 'Could not process billing webhook' });
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

    if (!organizationName) return res.status(400).json({ message: 'Organization name is required' });
    if (!contactName) return res.status(400).json({ message: 'Contact name is required' });
    if (!EMAIL_REGEX.test(email)) return res.status(400).json({ message: 'A valid email address is required' });

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
    console.error('Institutional inquiry error:', error);
    res.status(500).json({ message: 'Could not save institutional request' });
  }
});

router.use(verifyToken);

router.get('/me', async (req, res) => {
  const subscriptions = await SubscriptionRecord.find({ ownerType: 'user', ownerId: req.userId })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();
  const memberships = await OrganizationMembership.find({ userId: req.userId, status: { $ne: 'removed' } })
    .populate('organizationId')
    .lean();
  res.json({
    entitlements: getAiEntitlements(req.user),
    subscription: getSubscriptionSummary(req.user),
    subscriptions,
    memberships,
  });
});

router.post('/checkout-session', async (req, res) => {
  try {
    const { planId, interval = 'monthly', successUrl, cancelUrl, discountCode } = req.body || {};
    const plan = await effectiveIndividualPlan(planId);
    if (!plan || plan.id === 'free') {
      return res.status(400).json({ message: 'Choose a paid individual plan' });
    }
    const checkoutInterval = interval === 'annual' ? 'annual' : 'monthly';
    const requestedDiscountCode = discountCodeValue(discountCode);
    const discount = requestedDiscountCode
      ? await validateDiscountForPlan(requestedDiscountCode, plan)
      : await validateAutomaticDiscountForPlan(plan, checkoutInterval);
    if (requestedDiscountCode && !discount) {
      return res.status(400).json({ message: 'Discount code is not available' });
    }

    const session = await createStripeCheckoutSession({
      user: req.user,
      plan,
      interval: checkoutInterval,
      successUrl,
      cancelUrl,
      discount,
    });

    if (session.requiresSetup) {
      await BillingEvent.create({
        provider: 'stripe',
        type: 'checkout.setup_required',
        status: 'setup_required',
        userId: req.userId,
        message: `Missing setup for ${plan.id}`,
        payload: {
          planId: plan.id,
          interval: checkoutInterval,
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
        discountCode: discount?.applicationMode === 'automatic' ? '' : discount?.code || '',
        automaticDiscountId: discount?.applicationMode === 'automatic' ? String(discount._id) : '',
      },
    });

    res.json({ checkoutUrl: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ message: 'Could not start checkout' });
  }
});

router.post('/customer-portal', async (req, res) => {
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
    console.error('Billing portal error:', error);
    res.status(500).json({ message: 'Could not open billing portal' });
  }
});

router.post('/mobile/verify', async (req, res) => {
  try {
    const platform = String(req.body?.platform || '').toLowerCase();
    const plan = getIndividualPlan(req.body?.planId);
    if (!['ios', 'android'].includes(platform)) {
      return res.status(400).json({ message: 'Mobile platform must be ios or android' });
    }
    if (!plan || plan.id === 'free') {
      return res.status(400).json({ message: 'Choose a paid individual plan' });
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
    res.status(500).json({ message: 'Could not verify mobile purchase' });
  }
});

router.get('/institution/dashboard', async (req, res) => {
  try {
    const memberships = await OrganizationMembership.find({
      userId: req.userId,
      status: 'active',
      role: { $in: ORG_OVERSIGHT_ROLES },
    })
      .populate('organizationId')
      .sort({ updatedAt: -1 })
      .lean();

    const availableMemberships = memberships.filter((membership) => (
      membership.organizationId && ORG_STATUSES.includes(membership.organizationId.status)
    ));

    if (availableMemberships.length === 0) {
      return res.status(403).json({ message: 'No institution manager access found' });
    }

    const requestedOrgId = req.query?.organizationId;
    const activeMembership = availableMemberships.find((membership) => (
      requestedOrgId && String(membership.organizationId._id) === String(requestedOrgId)
    )) || availableMemberships[0];
    const organization = activeMembership.organizationId;

    const [members, subscriptions] = await Promise.all([
      OrganizationMembership.find({ organizationId: organization._id, status: { $ne: 'removed' } })
        .sort({ role: 1, email: 1 })
        .populate('userId', 'username email totalXP lastActive lastLogin nativeLanguage targetLanguage subscriptionTier xpDecayEnabled')
        .lean(),
      SubscriptionRecord.find({ ownerType: 'organization', ownerId: organization._id })
        .sort({ createdAt: -1 })
        .limit(10)
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

    const enrichedMembers = members.map((member) => {
      const sanitized = sanitizeMembership(member);
      const userId = sanitized.user?._id ? String(sanitized.user._id) : '';
      const progress = progressByUser.get(userId) || {};
      const classProgress = classByUser.get(userId) || {};
      return {
        ...sanitized,
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
      currentMembership: {
        _id: activeMembership._id,
        role: activeMembership.role,
        status: activeMembership.status,
        canManage: membershipCanManage(activeMembership),
      },
      seatUsage: {
        purchased: organization.seatsPurchased || 0,
        used: organization.seatsUsed || (activeMembers.length + invitedMembers.length),
        active: activeMembers.length,
        invited: invitedMembers.length,
        remaining: Math.max((organization.seatsPurchased || 0) - (organization.seatsUsed || activeMembers.length + invitedMembers.length), 0),
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
    });
  } catch (error) {
    console.error('Institution dashboard error:', error);
    res.status(500).json({ message: 'Could not load institution dashboard' });
  }
});

router.put('/institution/organizations/:organizationId', async (req, res) => {
  try {
    const membership = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!membership) return res.status(403).json({ message: 'Institution manager access is required' });

    const org = membership.organizationId;
    if (req.body?.name) org.name = cleanLine(req.body.name, 180);
    if (req.body?.type && ORG_TYPES.includes(req.body.type)) org.type = req.body.type;
    if (req.body?.billingEmail !== undefined) org.billingEmail = cleanLine(req.body.billingEmail, 254).toLowerCase();
    if (req.body?.notes !== undefined) org.notes = cleanText(req.body.notes, 3000);
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
    res.status(500).json({ message: 'Could not update institution profile' });
  }
});

router.post('/institution/organizations/:organizationId/members', async (req, res) => {
  try {
    const membership = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!membership) return res.status(403).json({ message: 'Institution manager access is required' });

    const org = membership.organizationId;
    const email = cleanLine(req.body?.email, 254).toLowerCase();
    if (!EMAIL_REGEX.test(email)) return res.status(400).json({ message: 'A valid email address is required' });

    const existing = await OrganizationMembership.findOne({ organizationId: org._id, email });
    const occupiesNewSeat = !existing || existing.status === 'removed';
    const currentSeats = await OrganizationMembership.countDocuments({ organizationId: org._id, status: { $in: ['active', 'invited'] } });
    if (occupiesNewSeat && currentSeats >= org.seatsPurchased) {
      return res.status(400).json({ message: 'No seats available' });
    }

    const user = await User.findOne({ email });
    const role = ORG_ROLES.includes(req.body?.role) ? req.body.role : 'learner';
    const member = await OrganizationMembership.findOneAndUpdate(
      { organizationId: org._id, email },
      {
        $set: {
          userId: user?._id || null,
          role,
          status: user ? 'active' : 'invited',
          invitedBy: req.userId,
          joinedAt: user ? new Date() : null,
        },
      },
      { new: true, upsert: true },
    ).populate('userId', 'username email totalXP lastActive lastLogin nativeLanguage targetLanguage subscriptionTier xpDecayEnabled');

    if (user) await setUserInstitutionalAccess(user._id, org, member);
    org.seatsUsed = await updateOrganizationSeatCount(org._id);

    await BillingEvent.create({
      provider: 'manual',
      type: 'institution.member.added',
      status: 'processed',
      organizationId: org._id,
      userId: user?._id || null,
      payload: { email, role, invitedBy: req.userId },
    });

    res.status(201).json({ membership: sanitizeMembership(member), seatsUsed: org.seatsUsed });
  } catch (error) {
    console.error('Institution member add error:', error);
    res.status(500).json({ message: 'Could not add institution member' });
  }
});

router.put('/institution/organizations/:organizationId/members/:membershipId', async (req, res) => {
  try {
    const managerMembership = await findInstitutionMembership(req.userId, req.params.organizationId, { requireManager: true });
    if (!managerMembership) return res.status(403).json({ message: 'Institution manager access is required' });

    const org = managerMembership.organizationId;
    const member = await OrganizationMembership.findOne({
      _id: req.params.membershipId,
      organizationId: org._id,
    }).populate('userId', 'username email totalXP lastActive lastLogin nativeLanguage targetLanguage subscriptionTier xpDecayEnabled');

    if (!member) return res.status(404).json({ message: 'Member not found' });

    const nextRole = ORG_ROLES.includes(req.body?.role) ? req.body.role : member.role;
    const nextStatus = ['invited', 'active', 'removed'].includes(req.body?.status) ? req.body.status : member.status;
    const removingSelf = String(member.userId?._id || member.userId) === String(req.userId) && nextStatus === 'removed';

    if (removingSelf) {
      const otherManagers = await OrganizationMembership.countDocuments({
        organizationId: org._id,
        userId: { $ne: req.userId },
        role: { $in: ORG_MANAGER_ROLES },
        status: 'active',
      });
      if (otherManagers === 0) {
        return res.status(400).json({ message: 'Add another manager before removing yourself' });
      }
    }

    member.role = nextRole;
    member.status = nextStatus;
    if (nextStatus === 'active' && !member.joinedAt) member.joinedAt = new Date();
    await member.save();

    if (member.userId) {
      if (nextStatus === 'active') await setUserInstitutionalAccess(member.userId._id || member.userId, org, member);
      if (nextStatus === 'removed') await clearUserInstitutionalAccess(member.userId._id || member.userId, org._id);
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

    res.json({ membership: sanitizeMembership(member), seatsUsed: org.seatsUsed });
  } catch (error) {
    console.error('Institution member update error:', error);
    res.status(500).json({ message: 'Could not update institution member' });
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
    res.status(500).json({ message: 'Could not load pricing settings' });
  }
});

router.put('/admin/plan-overrides/:planId', async (req, res) => {
  try {
    const basePlan = getIndividualPlan(req.params.planId) || getInstitutionalPlan(req.params.planId);
    if (!basePlan) return res.status(404).json({ message: 'Plan not found' });
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
      update.seatPriceMonthlyCents = cleanCents(body.seatPriceMonthlyCents);
      update.seatPriceAnnualCents = cleanCents(body.seatPriceAnnualCents);
      update.minimumSeats = cleanPositiveInt(body.minimumSeats, null);
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
    console.error('Plan override update error:', error);
    res.status(500).json({ message: 'Could not update plan pricing' });
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
      return res.status(400).json({ message: 'Discount code is required' });
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
    if (error.code === 11000) return res.status(409).json({ message: 'Discount code already exists' });
    console.error('Discount create error:', error);
    res.status(500).json({ message: 'Could not create discount' });
  }
});

router.put('/admin/discounts/:discountId', async (req, res) => {
  try {
    const discount = await DiscountCode.findByIdAndUpdate(
      req.params.discountId,
      { $set: discountPayload(req.body || {}, req.userId, false) },
      { new: true },
    );
    if (!discount) return res.status(404).json({ message: 'Discount not found' });
    await BillingEvent.create({
      provider: 'manual',
      type: 'pricing.discount.updated',
      status: 'processed',
      userId: req.userId,
      payload: { code: discount.code },
    });
    res.json({ discount: publicDiscount(discount) });
  } catch (error) {
    res.status(500).json({ message: 'Could not update discount' });
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
    res.status(500).json({ message: 'Could not load subscriptions' });
  }
});

router.post('/admin/manual-plan', async (req, res) => {
  try {
    const plan = getIndividualPlan(req.body?.planId || req.body?.tier);
    const status = ['active', 'trialing', 'cancelled'].includes(req.body?.status) ? req.body.status : 'active';
    const userLookup = cleanLine(req.body?.userIdOrEmail || req.body?.email || req.body?.userId, 254);

    if (!plan) return res.status(400).json({ message: 'Invalid individual plan' });
    if (!userLookup) return res.status(400).json({ message: 'User email or id is required' });

    const user = mongoose.isValidObjectId(userLookup)
      ? await User.findById(userLookup)
      : await User.findOne({ email: userLookup.toLowerCase() });

    if (!user) return res.status(404).json({ message: 'User not found' });

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
    res.status(500).json({ message: 'Could not update manual plan' });
  }
});

router.post('/admin/users/:userId/manual-plan', async (req, res) => {
  try {
    const plan = getIndividualPlan(req.body?.planId || req.body?.tier);
    const status = ['active', 'trialing', 'cancelled'].includes(req.body?.status) ? req.body.status : 'active';
    if (!plan) return res.status(400).json({ message: 'Invalid individual plan' });

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

    if (!user) return res.status(404).json({ message: 'User not found' });

    await BillingEvent.create({
      provider: 'manual',
      type: 'manual.plan.updated',
      status: 'processed',
      userId: user._id,
      payload: { planId: plan.id, status, updatedBy: req.userId },
    });

    res.json({ message: 'Plan updated', user, entitlements: getAiEntitlements(user) });
  } catch (error) {
    res.status(500).json({ message: 'Could not update manual plan' });
  }
});

router.get('/admin/organizations', async (req, res) => {
  try {
    const organizations = await Organization.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    res.json({ organizations });
  } catch (error) {
    res.status(500).json({ message: 'Could not load organizations' });
  }
});

router.post('/admin/organizations', async (req, res) => {
  try {
    const body = req.body || {};
    const plan = await effectiveInstitutionalPlan(body.planId, 'institution_basic');
    const name = cleanLine(body.name, 180);
    if (!name) return res.status(400).json({ message: 'Organization name is required' });

    const org = await Organization.create({
      name,
      slug: `${slugify(name)}-${Date.now().toString(36)}`,
      type: ['school', 'company', 'church', 'language_center', 'nonprofit', 'government', 'other'].includes(body.type) ? body.type : 'other',
      planId: plan.id,
      effectiveTier: plan.tier,
      status: ['lead', 'trialing', 'active', 'past_due', 'cancelled', 'suspended'].includes(body.status) ? body.status : 'active',
      seatsPurchased: Math.max(parseInt(body.seatsPurchased, 10) || plan.minimumSeats || 10, 1),
      billingSource: 'manual',
      billingEmail: cleanLine(body.billingEmail, 254).toLowerCase(),
      notes: cleanText(body.notes, 3000),
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
    res.status(500).json({ message: 'Could not create organization' });
  }
});

router.put('/admin/organizations/:organizationId', async (req, res) => {
  try {
    const body = req.body || {};
    const org = await Organization.findById(req.params.organizationId);
    if (!org) return res.status(404).json({ message: 'Organization not found' });

    const plan = body.planId ? await effectiveInstitutionalPlan(body.planId, 'institution_basic') : null;
    if (body.name) org.name = cleanLine(body.name, 180);
    if (body.type && ['school', 'company', 'church', 'language_center', 'nonprofit', 'government', 'other'].includes(body.type)) {
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

    res.json({ organization: org });
  } catch (error) {
    res.status(500).json({ message: 'Could not update organization' });
  }
});

router.post('/admin/organizations/:organizationId/members', async (req, res) => {
  try {
    const org = await Organization.findById(req.params.organizationId);
    if (!org) return res.status(404).json({ message: 'Organization not found' });
    if (org.seatsUsed >= org.seatsPurchased) {
      return res.status(400).json({ message: 'No seats available' });
    }

    const email = cleanLine(req.body?.email, 254).toLowerCase();
    if (!EMAIL_REGEX.test(email)) return res.status(400).json({ message: 'A valid email address is required' });

    const user = await User.findOne({ email });
    const membership = await OrganizationMembership.findOneAndUpdate(
      { organizationId: org._id, email },
      {
        $set: {
          userId: user?._id || null,
          role: ['owner', 'admin', 'teacher', 'learner'].includes(req.body?.role) ? req.body.role : 'learner',
          status: user ? 'active' : 'invited',
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

    org.seatsUsed = await OrganizationMembership.countDocuments({ organizationId: org._id, status: { $in: ['active', 'invited'] } });
    await org.save();

    res.status(201).json({ membership });
  } catch (error) {
    res.status(500).json({ message: 'Could not add organization member' });
  }
});

router.get('/admin/institutional-leads', async (req, res) => {
  try {
    const status = ['open', 'contacted', 'converted', 'closed'].includes(req.query?.status) ? req.query.status : undefined;
    const filter = status ? { status } : {};
    const leads = await InstitutionalLead.find(filter)
      .sort({ createdAt: -1 })
      .limit(200)
      .populate('userId', 'username email role')
      .lean();
    res.json({ leads });
  } catch (error) {
    res.status(500).json({ message: 'Could not load institutional leads' });
  }
});

router.put('/admin/institutional-leads/:leadId/status', async (req, res) => {
  try {
    const status = ['open', 'contacted', 'converted', 'closed'].includes(req.body?.status) ? req.body.status : 'contacted';
    const lead = await InstitutionalLead.findByIdAndUpdate(
      req.params.leadId,
      { $set: { status } },
      { new: true }
    );
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json({ lead });
  } catch (error) {
    res.status(500).json({ message: 'Could not update lead' });
  }
});

module.exports = router;
