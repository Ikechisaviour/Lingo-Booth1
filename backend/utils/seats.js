const mongoose = require('mongoose');
const Organization = require('../models/Organization');
const OrganizationMembership = require('../models/OrganizationMembership');
const SeatAssignment = require('../models/SeatAssignment');
const SeatBatch = require('../models/SeatBatch');
const User = require('../models/User');
const BillingEvent = require('../models/BillingEvent');
const { getInstitutionalPlan, getSeatPackPrice } = require('./billingPlans');
const { notifySeatThresholdIfNeeded } = require('./notifications');

const SEAT_DURATION_MS = SeatAssignment.SEAT_DURATION_MS;
const SHELF_LIFE_MS = SeatBatch.SHELF_LIFE_MS;

function now() {
  return new Date();
}

function isLive(seat) {
  if (!seat) return false;
  if (seat.state !== 'active' && seat.state !== 'suspended') return false;
  if (!seat.expiresAt || seat.expiresAt.getTime() <= Date.now()) return false;
  return true;
}

async function flushExpiredBatches(orgId) {
  // Mark any batches whose 365-day shelf life has passed and that still have
  // unconsumed seats. Records an `expiredUnusedCount` and a BillingEvent per
  // batch. Idempotent.
  const expired = await SeatBatch.find({
    organizationId: orgId,
    shelfExpiresAt: { $lt: new Date() },
    expiredAt: null,
  });
  for (const batch of expired) {
    const unused = Math.max(0, batch.quantity - batch.consumedCount - batch.expiredUnusedCount);
    batch.expiredUnusedCount = batch.quantity - batch.consumedCount;
    batch.expiredAt = now();
    await batch.save();
    if (unused > 0) {
      await BillingEvent.create({
        provider: 'system',
        type: 'seats.shelf_expired',
        status: 'processed',
        organizationId: orgId,
        payload: {
          seatBatchId: batch._id,
          unused,
          purchasedAt: batch.purchasedAt,
          shelfExpiresAt: batch.shelfExpiresAt,
          source: batch.source,
        },
      }).catch(() => null);
    }
  }
  return expired.length;
}

async function getSeatsAvailable(orgId) {
  await flushExpiredBatches(orgId);
  const rows = await SeatBatch.aggregate([
    { $match: { organizationId: new mongoose.Types.ObjectId(String(orgId)), shelfExpiresAt: { $gt: new Date() } } },
    {
      $group: {
        _id: null,
        available: {
          $sum: { $subtract: ['$quantity', { $add: ['$consumedCount', '$expiredUnusedCount'] }] },
        },
      },
    },
  ]);
  return Math.max(0, rows[0]?.available || 0);
}

async function syncUserSeatCache(userId, orgId) {
  if (!userId || !orgId) return null;
  const seat = await currentSeat(userId, orgId);
  const update = seat
    ? {
      'institutionalAccess.seatStatus': seat.state,
      'institutionalAccess.seatExpiresAt': seat.expiresAt,
      'institutionalAccess.seatActivatedAt': seat.activatedAt,
      'institutionalAccess.updatedAt': now(),
    }
    : {
      'institutionalAccess.seatStatus': 'none',
      'institutionalAccess.seatExpiresAt': null,
      'institutionalAccess.seatActivatedAt': null,
      'institutionalAccess.updatedAt': now(),
    };
  await User.findByIdAndUpdate(userId, { $set: update });
  return seat;
}

async function expireIfDue(seat) {
  if (!seat) return null;
  if (seat.state === 'expired') return seat;
  if (!seat.expiresAt || seat.expiresAt.getTime() > Date.now()) return seat;

  const wasSuspended = seat.state === 'suspended';
  seat.state = 'expired';
  seat.endedAt = now();
  seat.endReason = wasSuspended ? 'expired_on_suspend' : 'expired_natural';
  await seat.save();

  await BillingEvent.create({
    provider: 'system',
    type: 'seat.expired',
    status: 'processed',
    organizationId: seat.organizationId,
    userId: seat.userId,
    payload: {
      seatAssignmentId: seat._id,
      seatBatchId: seat.seatBatchId,
      endReason: seat.endReason,
      activatedAt: seat.activatedAt,
      expiresAt: seat.expiresAt,
    },
  }).catch(() => null);

  return seat;
}

async function currentSeat(userId, orgId) {
  if (!userId || !orgId) return null;
  const seat = await SeatAssignment.findOne({
    userId,
    organizationId: orgId,
    state: { $in: ['active', 'suspended'] },
  }).sort({ activatedAt: -1 });
  if (!seat) return null;
  const fresh = await expireIfDue(seat);
  return isLive(fresh) ? fresh : null;
}

async function hasInstitutionalAccess(userId, orgId) {
  const seat = await currentSeat(userId, orgId);
  return !!seat;
}

// Atomically find the oldest non-shelf-expired batch with remaining capacity
// and decrement it. Returns the batch on success, null on pool empty.
async function reserveSeatInBatch(orgId) {
  await flushExpiredBatches(orgId);
  const batch = await SeatBatch.findOneAndUpdate(
    {
      organizationId: orgId,
      shelfExpiresAt: { $gt: new Date() },
      $expr: { $lt: [{ $add: ['$consumedCount', '$expiredUnusedCount'] }, '$quantity'] },
    },
    { $inc: { consumedCount: 1 } },
    { new: true, sort: { purchasedAt: 1, _id: 1 } },
  );
  return batch;
}

async function releaseSeatInBatch(batchId) {
  if (!batchId) return;
  await SeatBatch.findOneAndUpdate(
    { _id: batchId, consumedCount: { $gt: 0 } },
    { $inc: { consumedCount: -1 } },
  );
}

async function autoSuspendForPoolEmpty(membership, triggeredByUserId) {
  membership.status = 'suspended';
  membership.suspensionReason = 'pool_empty';
  membership.suspendedAt = now();
  membership.suspendedByUserId = triggeredByUserId || null;
  await membership.save();

  await BillingEvent.create({
    provider: 'system',
    type: 'seat.auto_suspended',
    status: 'processed',
    organizationId: membership.organizationId,
    userId: membership.userId || null,
    payload: { reason: 'pool_empty' },
  }).catch(() => null);

  if (membership.userId) await syncUserSeatCache(membership.userId, membership.organizationId);
}

async function tryAllocateSeat({
  userId,
  orgId,
  membershipId,
  trigger,
  triggeredByUserId = null,
  replacesAssignmentId = null,
}) {
  if (!userId || !orgId || !membershipId) return null;

  const existing = await currentSeat(userId, orgId);
  if (existing) return existing;

  const membership = await OrganizationMembership.findById(membershipId);
  if (!membership) return null;
  if (membership.role !== 'learner') return null;
  if (membership.status === 'removed') return null;

  const batch = await reserveSeatInBatch(orgId);
  if (!batch) {
    await autoSuspendForPoolEmpty(membership, triggeredByUserId);
    // Auto-renew is a refill attempt — even if it succeeds we don't retroactively
    // unsuspend (admin signal is required to bring a learner back) — but the
    // refilled wallet means the admin can unsuspend without buying more.
    triggerAutoRenewIfDue(orgId).catch((err) => console.error('auto-renew error:', err));
    return null;
  }

  const activatedAt = now();
  const expiresAt = new Date(activatedAt.getTime() + SEAT_DURATION_MS);

  let seat;
  try {
    seat = await SeatAssignment.create({
      organizationId: orgId,
      userId,
      membershipId,
      seatBatchId: batch._id,
      state: 'active',
      activatedAt,
      expiresAt,
      triggeredBy: trigger,
      triggeredByUserId,
      replacesAssignmentId,
    });
  } catch (err) {
    await releaseSeatInBatch(batch._id);
    if (err && err.code === 11000) {
      return currentSeat(userId, orgId);
    }
    throw err;
  }

  if (membership.status !== 'active') {
    membership.status = 'active';
    membership.suspensionReason = null;
    membership.suspendedAt = null;
    membership.suspendedByUserId = null;
    await membership.save();
  }

  await BillingEvent.create({
    provider: trigger === 'learner_heartbeat' ? 'system' : 'manual',
    type: 'seat.allocated',
    status: 'processed',
    organizationId: orgId,
    userId,
    payload: {
      seatAssignmentId: seat._id,
      seatBatchId: batch._id,
      trigger,
      activatedAt,
      expiresAt,
      replacesAssignmentId,
    },
  }).catch(() => null);

  await syncUserSeatCache(userId, orgId);

  // Fire auto-renew check after a successful allocation in case this draw
  // brought availability under the threshold.
  getSeatsAvailable(orgId)
    .then((available) => Organization.findById(orgId).select('seatsPurchased').lean().then((org) => (
      notifySeatThresholdIfNeeded(orgId, available, org?.seatsPurchased || 0, triggeredByUserId)
    )))
    .catch(() => null);
  triggerAutoRenewIfDue(orgId).catch((err) => console.error('auto-renew error:', err));

  return seat;
}

async function suspendMembershipSeat({ membershipId, suspendedByUserId, source = 'admin' }) {
  const membership = await OrganizationMembership.findById(membershipId);
  if (!membership) return { ok: false, error: 'not_found' };
  if (membership.status === 'removed') return { ok: false, error: 'removed' };

  const seat = membership.userId
    ? await currentSeat(membership.userId, membership.organizationId)
    : null;

  if (seat && seat.state === 'active') {
    seat.state = 'suspended';
    seat.suspendedAt = now();
    seat.suspendedByUserId = suspendedByUserId || null;
    seat.suspensionReason = source === 'learner_request_then_admin' ? 'learner_request_then_admin' : 'admin';
    await seat.save();
  }

  membership.status = 'suspended';
  membership.suspensionReason = 'admin';
  membership.suspendedAt = now();
  membership.suspendedByUserId = suspendedByUserId || null;
  if (membership.suspensionRequest && membership.suspensionRequest.requestedAt && !membership.suspensionRequest.handledAt) {
    membership.suspensionRequest.handledAt = now();
    membership.suspensionRequest.handledByUserId = suspendedByUserId || null;
    membership.suspensionRequest.handledOutcome = 'suspended';
  }
  await membership.save();

  await BillingEvent.create({
    provider: 'manual',
    type: 'seat.suspended',
    status: 'processed',
    organizationId: membership.organizationId,
    userId: membership.userId || null,
    payload: { seatAssignmentId: seat?._id || null, suspendedBy: suspendedByUserId },
  }).catch(() => null);

  if (membership.userId) await syncUserSeatCache(membership.userId, membership.organizationId);
  return { ok: true, membership, seat };
}

async function unsuspendMembershipSeat({ membershipId, adminUserId }) {
  const membership = await OrganizationMembership.findById(membershipId);
  if (!membership) return { ok: false, error: 'not_found' };
  if (membership.status === 'removed') return { ok: false, error: 'removed' };
  if (membership.status !== 'suspended') {
    return { ok: true, membership, seat: await currentSeat(membership.userId, membership.organizationId) };
  }

  const seat = membership.userId
    ? await currentSeat(membership.userId, membership.organizationId)
    : null;

  if (seat && seat.state === 'suspended') {
    seat.state = 'active';
    seat.suspendedAt = null;
    seat.suspendedByUserId = null;
    seat.suspensionReason = null;
    await seat.save();

    membership.status = 'active';
    membership.suspensionReason = null;
    membership.suspendedAt = null;
    membership.suspendedByUserId = null;
    await membership.save();

    await BillingEvent.create({
      provider: 'manual',
      type: 'seat.unsuspended',
      status: 'processed',
      organizationId: membership.organizationId,
      userId: membership.userId,
      payload: { seatAssignmentId: seat._id, mode: 'restore_grace', unsuspendedBy: adminUserId },
    }).catch(() => null);

    await syncUserSeatCache(membership.userId, membership.organizationId);
    return { ok: true, membership, seat };
  }

  if (!membership.userId) {
    membership.status = 'invited';
    membership.suspensionReason = null;
    membership.suspendedAt = null;
    membership.suspendedByUserId = null;
    await membership.save();
    return { ok: true, membership, seat: null };
  }

  const newSeat = await tryAllocateSeat({
    userId: membership.userId,
    orgId: membership.organizationId,
    membershipId: membership._id,
    trigger: 'admin_unsuspend',
    triggeredByUserId: adminUserId,
  });

  if (!newSeat) {
    return { ok: false, error: 'pool_empty', membership };
  }

  await BillingEvent.create({
    provider: 'manual',
    type: 'seat.unsuspended',
    status: 'processed',
    organizationId: membership.organizationId,
    userId: membership.userId,
    payload: { seatAssignmentId: newSeat._id, mode: 'allocate_new', unsuspendedBy: adminUserId },
  }).catch(() => null);

  return { ok: true, membership, seat: newSeat };
}

async function endLiveSeatForMembership(membership, endReason = 'removed', actorId = null) {
  if (!membership?.userId) return null;
  const seat = await SeatAssignment.findOne({
    userId: membership.userId,
    organizationId: membership.organizationId,
    state: { $in: ['active', 'suspended'] },
  });
  if (!seat) return null;
  seat.state = 'expired';
  seat.endedAt = now();
  seat.endReason = endReason;
  await seat.save();

  await BillingEvent.create({
    provider: 'manual',
    type: 'seat.expired',
    status: 'processed',
    organizationId: membership.organizationId,
    userId: membership.userId,
    payload: { seatAssignmentId: seat._id, endReason, endedBy: actorId },
  }).catch(() => null);

  await syncUserSeatCache(membership.userId, membership.organizationId);
  return seat;
}

async function topUpSeats({
  orgId,
  quantity,
  addedByUserId,
  source = 'manual',
  note = '',
  pricePerSeatCents = null,
  totalCents = null,
  shelfLifeMs = SHELF_LIFE_MS,
}) {
  const qty = Math.max(1, Math.floor(Number(quantity) || 0));
  if (!qty) return null;

  const purchasedAt = now();
  const shelfExpiresAt = new Date(purchasedAt.getTime() + shelfLifeMs);

  const event = await BillingEvent.create({
    provider: source === 'stripe' ? 'stripe' : (source === 'auto_renew' ? 'stripe' : 'manual'),
    type: 'seats.topup',
    status: 'processed',
    organizationId: orgId,
    userId: addedByUserId || null,
    payload: { quantity: qty, source, note, pricePerSeatCents, totalCents, shelfExpiresAt },
  });

  const batch = await SeatBatch.create({
    organizationId: orgId,
    quantity: qty,
    consumedCount: 0,
    expiredUnusedCount: 0,
    pricePerSeatCents,
    totalCents,
    source,
    purchasedAt,
    shelfExpiresAt,
    billingEventId: event._id,
    addedByUserId: addedByUserId || null,
    note,
  });

  const updated = await Organization.findByIdAndUpdate(
    orgId,
    {
      $inc: { seatsPurchased: qty },
      $push: {
        seatsPurchasedHistory: {
          quantity: qty,
          addedBy: addedByUserId || null,
          source,
          billingEventId: event._id,
          seatBatchId: batch._id,
          note,
          createdAt: purchasedAt,
        },
      },
    },
    { new: true },
  );

  return { organization: updated, event, batch, quantity: qty };
}

async function recordSuspensionRequest({ membershipId, requestedByUserId, note }) {
  const membership = await OrganizationMembership.findById(membershipId);
  if (!membership) return { ok: false, error: 'not_found' };
  if (String(membership.userId) !== String(requestedByUserId)) return { ok: false, error: 'forbidden' };

  membership.suspensionRequest = {
    note: String(note || '').slice(0, 1000),
    requestedAt: now(),
    requestedByUserId,
    handledAt: null,
    handledByUserId: null,
    handledOutcome: null,
  };
  await membership.save();

  await BillingEvent.create({
    provider: 'manual',
    type: 'seat.suspension_requested',
    status: 'processed',
    organizationId: membership.organizationId,
    userId: requestedByUserId,
    payload: { membershipId: membership._id, note: membership.suspensionRequest.note },
  }).catch(() => null);

  return { ok: true, membership };
}

async function getSeatProjection(orgId, horizonDays = 7) {
  await flushExpiredBatches(orgId);
  const horizonMs = Math.max(1, Math.floor(horizonDays)) * 24 * 60 * 60 * 1000;
  const cutoff = new Date(Date.now() + horizonMs);
  const [available, expiringSoon, activeLearners, suspendedLearners, expiringList, shelfExpiringSoon] = await Promise.all([
    getSeatsAvailable(orgId),
    SeatAssignment.countDocuments({
      organizationId: orgId,
      state: 'active',
      expiresAt: { $gt: new Date(), $lte: cutoff },
    }),
    SeatAssignment.countDocuments({ organizationId: orgId, state: 'active' }),
    OrganizationMembership.countDocuments({
      organizationId: orgId,
      role: 'learner',
      status: 'suspended',
    }),
    SeatAssignment.find({
      organizationId: orgId,
      state: 'active',
      expiresAt: { $gt: new Date(), $lte: cutoff },
    })
      .select('userId expiresAt')
      .sort({ expiresAt: 1 })
      .lean(),
    SeatBatch.aggregate([
      {
        $match: {
          organizationId: new mongoose.Types.ObjectId(String(orgId)),
          shelfExpiresAt: { $gt: new Date(), $lte: cutoff },
        },
      },
      {
        $group: {
          _id: null,
          unused: { $sum: { $subtract: ['$quantity', { $add: ['$consumedCount', '$expiredUnusedCount'] }] } },
        },
      },
    ]),
  ]);

  return {
    seatsAvailable: available,
    expiringInWindowDays: horizonDays,
    expiringInWindow: expiringSoon,
    shelfExpiringInWindow: shelfExpiringSoon[0]?.unused || 0,
    activeLearners,
    suspendedLearners,
    willAutoSuspendIfNoTopup: Math.max(0, expiringSoon - available),
    expiringSchedule: expiringList,
  };
}

async function getMembershipSeatHistory(membershipId, limit = 50) {
  const membership = await OrganizationMembership.findById(membershipId).lean();
  if (!membership) return [];
  return SeatAssignment.find({
    membershipId: membership._id,
  })
    .sort({ activatedAt: -1 })
    .limit(limit)
    .lean();
}

async function getSeatWallet(orgId) {
  await flushExpiredBatches(orgId);
  const batches = await SeatBatch.find({ organizationId: orgId })
    .sort({ purchasedAt: -1 })
    .lean();
  const active = [];
  const exhausted = [];
  const shelfExpired = [];
  let totalAvailable = 0;
  for (const b of batches) {
    const remaining = Math.max(0, b.quantity - b.consumedCount - b.expiredUnusedCount);
    const expanded = { ...b, remaining };
    if (b.shelfExpiresAt && b.shelfExpiresAt.getTime() <= Date.now()) {
      shelfExpired.push(expanded);
    } else if (remaining === 0) {
      exhausted.push(expanded);
    } else {
      active.push(expanded);
      totalAvailable += remaining;
    }
  }
  return { totalAvailable, active, exhausted, shelfExpired };
}

// --- Auto-renew ---------------------------------------------------------

async function triggerAutoRenewIfDue(orgId) {
  const org = await Organization.findById(orgId);
  if (!org?.autoRenew?.enabled) return { ok: false, reason: 'disabled' };
  if (org.status === 'cancelled' || org.status === 'suspended') return { ok: false, reason: 'org_inactive' };

  const cooldownMs = (org.autoRenew.cooldownSeconds || 600) * 1000;
  const lastFiredAt = org.autoRenew.lastTriggeredAt?.getTime?.() || 0;
  if (Date.now() - lastFiredAt < cooldownMs) return { ok: false, reason: 'cooldown' };

  const available = await getSeatsAvailable(orgId);
  if (available > (org.autoRenew.threshold || 0)) return { ok: false, reason: 'above_threshold' };

  const plan = getInstitutionalPlan(org.autoRenew.planId || org.planId);
  if (!plan) {
    await markAutoRenewError(orgId, 'plan_not_found');
    return { ok: false, reason: 'plan_not_found' };
  }
  const refillQty = Math.max(1, org.autoRenew.refillQuantity || plan.minimumSeats || 10);
  const packPrice = getSeatPackPrice(plan, refillQty);
  if (!packPrice || !packPrice.pricePerSeatCents) {
    await markAutoRenewError(orgId, 'no_price');
    return { ok: false, reason: 'no_price' };
  }

  // Stamp lastTriggeredAt now so concurrent fires don't double-charge.
  await Organization.findByIdAndUpdate(orgId, { $set: { 'autoRenew.lastTriggeredAt': now() } });

  const chargeResult = await chargeStripeOffSession({
    customerId: org.autoRenew.stripeCustomerId,
    paymentMethodId: org.autoRenew.paymentMethodId,
    amountCents: packPrice.totalCents,
    description: `Auto-renew: ${refillQty} seats on ${plan.name}`,
    organizationId: org._id,
    quantity: refillQty,
    planId: plan.id,
  });

  if (!chargeResult.ok) {
    await markAutoRenewError(orgId, chargeResult.error || 'charge_failed');
    return { ok: false, reason: chargeResult.error || 'charge_failed' };
  }

  await topUpSeats({
    orgId,
    quantity: refillQty,
    addedByUserId: org.autoRenew.updatedByUserId || null,
    source: 'auto_renew',
    pricePerSeatCents: packPrice.pricePerSeatCents,
    totalCents: packPrice.totalCents,
    note: chargeResult.paymentIntentId ? `Stripe payment_intent ${chargeResult.paymentIntentId}` : 'Auto-renew',
  });

  await Organization.findByIdAndUpdate(orgId, {
    $set: {
      'autoRenew.lastError': null,
      'autoRenew.lastErrorAt': null,
    },
  });

  return { ok: true, refillQty, paymentIntentId: chargeResult.paymentIntentId };
}

async function markAutoRenewError(orgId, error) {
  await Organization.findByIdAndUpdate(orgId, {
    $set: {
      'autoRenew.lastError': error,
      'autoRenew.lastErrorAt': now(),
    },
  });
  await BillingEvent.create({
    provider: 'system',
    type: 'seats.auto_renew_failed',
    status: 'failed',
    organizationId: orgId,
    message: error,
    payload: { error },
  }).catch(() => null);
}

async function chargeStripeOffSession({ customerId, paymentMethodId, amountCents, description, organizationId, quantity, planId }) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return { ok: false, error: 'stripe_not_configured' };
  if (!customerId || !paymentMethodId) return { ok: false, error: 'no_payment_method' };
  if (!Number.isFinite(amountCents) || amountCents <= 0) return { ok: false, error: 'invalid_amount' };

  const body = new URLSearchParams();
  body.set('amount', String(amountCents));
  body.set('currency', 'usd');
  body.set('customer', customerId);
  body.set('payment_method', paymentMethodId);
  body.set('off_session', 'true');
  body.set('confirm', 'true');
  body.set('description', description);
  body.set('metadata[organizationId]', String(organizationId));
  body.set('metadata[quantity]', String(quantity));
  body.set('metadata[planId]', planId);
  body.set('metadata[source]', 'auto_renew');

  try {
    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    const data = await response.json();
    if (!response.ok || data?.status !== 'succeeded') {
      return { ok: false, error: data?.error?.message || data?.last_payment_error?.code || `stripe_${data?.status || 'failed'}` };
    }
    return { ok: true, paymentIntentId: data.id };
  } catch (err) {
    return { ok: false, error: err.message || 'stripe_network_error' };
  }
}

async function configureAutoRenew({ orgId, enabled, threshold, refillQuantity, planId, paymentMethodId, stripeCustomerId, updatedByUserId }) {
  const set = {
    'autoRenew.updatedByUserId': updatedByUserId || null,
    'autoRenew.updatedAt': now(),
  };
  if (enabled !== undefined) set['autoRenew.enabled'] = !!enabled;
  if (threshold !== undefined) set['autoRenew.threshold'] = Math.max(0, Math.floor(Number(threshold) || 0));
  if (refillQuantity !== undefined) set['autoRenew.refillQuantity'] = Math.max(1, Math.floor(Number(refillQuantity) || 1));
  if (planId !== undefined) set['autoRenew.planId'] = planId || null;
  if (paymentMethodId !== undefined) set['autoRenew.paymentMethodId'] = paymentMethodId || null;
  if (stripeCustomerId !== undefined) set['autoRenew.stripeCustomerId'] = stripeCustomerId || null;
  const org = await Organization.findByIdAndUpdate(orgId, { $set: set }, { new: true });
  return org?.autoRenew || null;
}

module.exports = {
  SEAT_DURATION_MS,
  SHELF_LIFE_MS,
  getSeatsAvailable,
  currentSeat,
  hasInstitutionalAccess,
  expireIfDue,
  tryAllocateSeat,
  suspendMembershipSeat,
  unsuspendMembershipSeat,
  endLiveSeatForMembership,
  topUpSeats,
  recordSuspensionRequest,
  getSeatProjection,
  getMembershipSeatHistory,
  getSeatWallet,
  syncUserSeatCache,
  flushExpiredBatches,
  triggerAutoRenewIfDue,
  configureAutoRenew,
};
