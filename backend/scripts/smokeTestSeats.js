#!/usr/bin/env node
/**
 * Seat lifecycle smoke test.
 *
 * Walks through: add learner → first seat consumed → simulate expiration
 * → heartbeat allocates next seat → suspend → unsuspend (grace) → pool empty
 * → top-up → unsuspend (new allocation) → remove → done.
 *
 * Run against a disposable database. Pass MONGO_URI as env var.
 *
 *   MONGO_URI=mongodb://localhost:27017/korean-seats-smoke \
 *   JWT_SECRET=anything \
 *   node scripts/smokeTestSeats.js
 *
 * Re-running drops the seed users/org and recreates them.
 */
const mongoose = require('mongoose');
const Organization = require('../models/Organization');
const OrganizationMembership = require('../models/OrganizationMembership');
const SeatAssignment = require('../models/SeatAssignment');
const User = require('../models/User');
const BillingEvent = require('../models/BillingEvent');
const seats = require('../utils/seats');

const ORG_SLUG = 'smoke-seats-org';
const LEARNER_EMAIL = 'learner.smoke@example.com';
const ADMIN_EMAIL = 'admin.smoke@example.com';

function log(...args) {
  console.log('•', ...args);
}

function assert(cond, msg) {
  if (!cond) {
    console.error('  ✗ FAIL:', msg);
    process.exit(1);
  }
  console.log('  ✓', msg);
}

async function reset() {
  const SeatBatch = require('../models/SeatBatch');
  const org = await Organization.findOne({ slug: ORG_SLUG });
  if (org) {
    await SeatAssignment.deleteMany({ organizationId: org._id });
    await SeatBatch.deleteMany({ organizationId: org._id });
    await OrganizationMembership.deleteMany({ organizationId: org._id });
    await BillingEvent.deleteMany({ organizationId: org._id });
    await Organization.deleteOne({ _id: org._id });
  }
  await User.deleteMany({ email: { $in: [LEARNER_EMAIL, ADMIN_EMAIL] } });
}

async function setup() {
  const learner = await User.create({
    username: 'learner_smoke',
    email: LEARNER_EMAIL,
    password: 'unused',
  });
  const admin = await User.create({
    username: 'admin_smoke',
    email: ADMIN_EMAIL,
    password: 'unused',
    role: 'admin',
  });
  const org = await Organization.create({
    name: 'Smoke Seats Org',
    slug: ORG_SLUG,
    type: 'company',
    planId: 'institution_basic',
    effectiveTier: 'plus',
    status: 'active',
    seatsPurchased: 0,
    ownerUserId: admin._id,
  });
  // Seed the wallet with 2 seats via the canonical top-up path so SeatBatch rows exist.
  await seats.topUpSeats({
    orgId: org._id,
    quantity: 2,
    addedByUserId: admin._id,
    source: 'initial',
    note: 'smoke seed',
  });
  const membership = await OrganizationMembership.create({
    organizationId: org._id,
    userId: learner._id,
    email: learner.email,
    role: 'learner',
    consumesSeat: true,
    status: 'active',
    joinedAt: new Date(),
  });
  return { org, learner, admin, membership };
}

async function main() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/korean-seats-smoke');
  log('connected to', mongoose.connection.name);

  await reset();
  const { org, learner, admin, membership } = await setup();
  log('seeded org', org._id.toString(), 'with 2 seats; 1 learner membership');

  // 1. First allocation
  const seat1 = await seats.tryAllocateSeat({
    userId: learner._id,
    orgId: org._id,
    membershipId: membership._id,
    trigger: 'admin_add',
    triggeredByUserId: admin._id,
  });
  assert(seat1 && seat1.state === 'active', 'first seat allocated (state=active)');
  assert((await seats.getSeatsAvailable(org._id)) === 1, 'seatsAvailable = 1 after first allocation');

  // 2. Force expiration
  seat1.expiresAt = new Date(Date.now() - 1000);
  await seat1.save();
  const seatAfterExpiry = await seats.currentSeat(learner._id, org._id);
  assert(seatAfterExpiry === null, 'expired seat is no longer current');
  const expiredRow = await SeatAssignment.findById(seat1._id);
  assert(expiredRow.state === 'expired', 'expired seat row flipped to state=expired');
  assert((await seats.getSeatsAvailable(org._id)) === 1, 'pool does NOT regenerate after expiration');

  // 3. Heartbeat-style re-allocation
  const seat2 = await seats.tryAllocateSeat({
    userId: learner._id,
    orgId: org._id,
    membershipId: membership._id,
    trigger: 'learner_heartbeat',
  });
  assert(seat2 && seat2.state === 'active', 'second seat allocated on heartbeat');
  assert((await seats.getSeatsAvailable(org._id)) === 0, 'pool exhausted (2/2 spent)');

  // 4. Admin suspends within grace
  const suspendRes = await seats.suspendMembershipSeat({
    membershipId: membership._id,
    suspendedByUserId: admin._id,
  });
  assert(suspendRes.ok, 'suspend succeeded');
  assert(suspendRes.seat.state === 'suspended', 'seat flipped to suspended');
  const stillLive = await seats.currentSeat(learner._id, org._id);
  assert(stillLive && stillLive.state === 'suspended', 'learner still has access during grace');

  // 5. Unsuspend within grace — no new pool draw
  const unsuspendRes = await seats.unsuspendMembershipSeat({
    membershipId: membership._id,
    adminUserId: admin._id,
  });
  assert(unsuspendRes.ok && unsuspendRes.seat.state === 'active', 'unsuspend restored seat without new allocation');
  assert((await seats.getSeatsAvailable(org._id)) === 0, 'pool unchanged after in-grace unsuspend');

  // 6. Force expiration on seat 2 + pool-empty heartbeat → auto-suspend
  seat2.expiresAt = new Date(Date.now() - 1000);
  await seat2.save();
  const seatAfterExpiry2 = await seats.currentSeat(learner._id, org._id);
  assert(seatAfterExpiry2 === null, 'second seat expired');

  const failed = await seats.tryAllocateSeat({
    userId: learner._id,
    orgId: org._id,
    membershipId: membership._id,
    trigger: 'learner_heartbeat',
  });
  assert(failed === null, 'allocation refused when pool empty');
  const reloadedMembership = await OrganizationMembership.findById(membership._id);
  assert(reloadedMembership.status === 'suspended', 'membership auto-suspended');
  assert(reloadedMembership.suspensionReason === 'pool_empty', 'suspension reason = pool_empty');

  // 7. Top-up
  const topup = await seats.topUpSeats({
    orgId: org._id,
    quantity: 3,
    addedByUserId: admin._id,
    source: 'manual',
  });
  assert(topup.quantity === 3, 'top-up added 3 seats');
  assert((await seats.getSeatsAvailable(org._id)) === 3, 'seatsAvailable = 3 after top-up');

  // 8. Admin unsuspend after pool-empty refill
  const unsuspendRes2 = await seats.unsuspendMembershipSeat({
    membershipId: membership._id,
    adminUserId: admin._id,
  });
  assert(unsuspendRes2.ok && unsuspendRes2.seat?.state === 'active', 'unsuspend allocated a new seat');
  assert((await seats.getSeatsAvailable(org._id)) === 2, 'pool drew 1 on unsuspend after pool-empty');

  // 9. Remove ends the live seat
  reloadedMembership.status = 'removed';
  await reloadedMembership.save();
  await seats.endLiveSeatForMembership(reloadedMembership, 'removed', admin._id);
  const afterRemove = await seats.currentSeat(learner._id, org._id);
  assert(afterRemove === null, 'no live seat after removal');
  assert((await seats.getSeatsAvailable(org._id)) === 2, 'pool unchanged on removal (seats not reclaimed)');

  // 10. Projection
  // Re-add membership + active seat 5 days from expiry so projection has a target.
  const newMembership = await OrganizationMembership.create({
    organizationId: org._id,
    userId: learner._id,
    email: 'projection.smoke@example.com',
    role: 'learner',
    consumesSeat: true,
    status: 'active',
    joinedAt: new Date(),
  });
  await seats.tryAllocateSeat({
    userId: learner._id,
    orgId: org._id,
    membershipId: newMembership._id,
    trigger: 'admin_add',
  });
  // Pull seat into 5-day window
  await SeatAssignment.updateOne(
    { membershipId: newMembership._id, state: 'active' },
    { $set: { expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) } },
  );
  const proj = await seats.getSeatProjection(org._id, 7);
  assert(proj.expiringInWindow === 1, 'projection counts the seat expiring in 7-day window');
  assert(proj.willAutoSuspendIfNoTopup === 0, 'no auto-suspend predicted (pool sufficient)');

  // 11. Pack pricing
  const billingPlans = require('../utils/billingPlans');
  const basic = billingPlans.INSTITUTIONAL_PLANS.find((p) => p.id === 'institution_basic');
  const small = billingPlans.getSeatPackPrice(basic, 10);
  const big = billingPlans.getSeatPackPrice(basic, 1500);
  assert(small.pricePerSeatCents === 799, 'small pack uses base tier ($7.99/seat)');
  assert(big.pricePerSeatCents === 499, 'large pack uses 1000+ tier ($4.99/seat)');
  assert(big.totalCents === 1500 * 499, 'large pack total matches qty * tier price');

  // 12. priceCentsFor ignores interval for institutions
  assert(billingPlans.priceCentsFor(basic, 'monthly') === basic.pricePerSeatCents, 'priceCentsFor returns base seat price (monthly arg ignored)');
  assert(billingPlans.priceCentsFor(basic, 'annual') === basic.pricePerSeatCents, 'priceCentsFor returns base seat price (annual arg ignored)');

  // 13. publicPlan shape exposes bulk tiers
  const pub = billingPlans.publicPlan(basic);
  assert(pub.pricePerSeatCents === 799, 'publicPlan exposes pricePerSeatCents');
  assert(Array.isArray(pub.bulkPricing) && pub.bulkPricing.length === 4, 'publicPlan exposes 4-step bulkPricing ladder');
  assert(pub.monthlyPriceCents === undefined, 'publicPlan no longer carries monthly seat price');

  // 13b. A seat drawn from a batch about to shelf-expire still gives the learner a full 30 days
  const aged = await Organization.create({
    name: 'Aged Batch Org',
    slug: ORG_SLUG + '-aged',
    type: 'company',
    planId: 'institution_basic',
    effectiveTier: 'plus',
    status: 'active',
    seatsPurchased: 0,
    ownerUserId: admin._id,
  });
  const SeatBatchAged = require('../models/SeatBatch');
  const agedTopup = await seats.topUpSeats({
    orgId: aged._id,
    quantity: 2,
    addedByUserId: admin._id,
    source: 'manual',
  });
  // Age the batch to 12 hours before its shelf-life ends (still active).
  const nearShelfExpiry = new Date(Date.now() + 12 * 60 * 60 * 1000);
  await SeatBatchAged.updateOne(
    { _id: agedTopup.batch._id },
    { $set: { shelfExpiresAt: nearShelfExpiry } },
  );
  const agedLearner = await User.create({ username: 'aged_learner', email: 'aged.smoke@example.com', password: 'unused' });
  const agedMembership = await OrganizationMembership.create({
    organizationId: aged._id,
    userId: agedLearner._id,
    email: agedLearner.email,
    role: 'learner',
    consumesSeat: true,
    status: 'active',
    joinedAt: new Date(),
  });
  const agedSeat = await seats.tryAllocateSeat({
    userId: agedLearner._id,
    orgId: aged._id,
    membershipId: agedMembership._id,
    trigger: 'admin_add',
  });
  const expectedSeatExpiry = agedSeat.activatedAt.getTime() + 30 * 24 * 60 * 60 * 1000;
  assert(Math.abs(agedSeat.expiresAt.getTime() - expectedSeatExpiry) < 5000, 'seat allocated from near-shelf-expiry batch still gets 30 days');
  assert(agedSeat.expiresAt.getTime() > nearShelfExpiry.getTime(), 'seat outlives the batch shelf window (30d > 12h)');

  // 14. Shelf life: unused seats expire 365 days after purchase
  const SeatBatch = require('../models/SeatBatch');
  const shelfOrg = await Organization.create({
    name: 'Shelf Smoke Org',
    slug: ORG_SLUG + '-shelf',
    type: 'company',
    planId: 'institution_basic',
    effectiveTier: 'plus',
    status: 'active',
    seatsPurchased: 0,
    ownerUserId: admin._id,
  });
  const shelfTopup = await seats.topUpSeats({
    orgId: shelfOrg._id,
    quantity: 5,
    addedByUserId: admin._id,
    source: 'manual',
    note: 'shelf test',
  });
  assert(shelfTopup.batch.quantity === 5, 'top-up created a SeatBatch with quantity=5');
  const shelfExpected = shelfTopup.batch.purchasedAt.getTime() + 365 * 24 * 60 * 60 * 1000;
  assert(Math.abs(shelfTopup.batch.shelfExpiresAt.getTime() - shelfExpected) < 1000, 'shelfExpiresAt = purchasedAt + 365d');
  assert((await seats.getSeatsAvailable(shelfOrg._id)) === 5, 'wallet shows 5 available before shelf expiry');

  // Move shelf expiry into the past — 3 of the 5 seats remain unused.
  await SeatBatch.updateOne(
    { _id: shelfTopup.batch._id },
    { $set: { shelfExpiresAt: new Date(Date.now() - 1000), consumedCount: 2 } },
  );
  const flushed = await seats.flushExpiredBatches(shelfOrg._id);
  assert(flushed === 1, 'flushExpiredBatches processed 1 batch');
  const flushedBatch = await SeatBatch.findById(shelfTopup.batch._id);
  assert(flushedBatch.expiredUnusedCount === 3, '3 unused seats marked expired after shelf life');
  assert(flushedBatch.expiredAt !== null, 'batch has expiredAt set');
  assert((await seats.getSeatsAvailable(shelfOrg._id)) === 0, 'shelf-expired batch contributes 0 to available');

  // 15. Auto-renew configuration + trigger (no payment method → graceful failure)
  const renewOrg = await Organization.create({
    name: 'Auto-Renew Smoke Org',
    slug: ORG_SLUG + '-renew',
    type: 'company',
    planId: 'institution_basic',
    effectiveTier: 'plus',
    status: 'active',
    seatsPurchased: 0,
    ownerUserId: admin._id,
  });
  await seats.topUpSeats({ orgId: renewOrg._id, quantity: 3, addedByUserId: admin._id, source: 'manual' });
  await seats.configureAutoRenew({
    orgId: renewOrg._id,
    enabled: true,
    threshold: 2,
    refillQuantity: 10,
    planId: 'institution_basic',
    updatedByUserId: admin._id,
  });
  const renewAttempt = await seats.triggerAutoRenewIfDue(renewOrg._id);
  // With seatsAvailable=3 and threshold=2, available > threshold → no trigger
  assert(renewAttempt.ok === false && renewAttempt.reason === 'above_threshold', 'auto-renew skipped when above threshold');

  // Force availability to threshold by manually setting consumedCount
  const renewBatch = await SeatBatch.findOne({ organizationId: renewOrg._id });
  await SeatBatch.updateOne({ _id: renewBatch._id }, { $set: { consumedCount: 2 } });
  assert((await seats.getSeatsAvailable(renewOrg._id)) === 1, 'available now 1 (≤ threshold)');

  const renewAttempt2 = await seats.triggerAutoRenewIfDue(renewOrg._id);
  assert(renewAttempt2.ok === false, 'auto-renew without Stripe config returns ok=false');
  assert(
    renewAttempt2.reason === 'stripe_not_configured' || renewAttempt2.reason === 'no_payment_method',
    `auto-renew failure reason indicates missing Stripe (got ${renewAttempt2.reason})`,
  );
  const refreshed = await Organization.findById(renewOrg._id);
  assert(refreshed.autoRenew.lastError, 'autoRenew.lastError populated on failed trigger');

  // 16. Auto-renew cooldown prevents back-to-back triggers
  const renewAttempt3 = await seats.triggerAutoRenewIfDue(renewOrg._id);
  assert(renewAttempt3.reason === 'cooldown', 'auto-renew honors cooldown after a recent trigger');

  // Disable auto-renew
  await seats.configureAutoRenew({ orgId: renewOrg._id, enabled: false });
  const renewAttempt4 = await seats.triggerAutoRenewIfDue(renewOrg._id);
  assert(renewAttempt4.reason === 'disabled', 'auto-renew can be disabled');

  // 16b. Captured Stripe tokens are read by the charge attempt. With customer + payment_method
  // populated, triggerAutoRenewIfDue passes the no_payment_method gate; without STRIPE_SECRET_KEY
  // it falls through to stripe_not_configured. (Saves us testing real Stripe in smoke.)
  await seats.configureAutoRenew({
    orgId: renewOrg._id,
    enabled: true,
    threshold: 2,
    refillQuantity: 5,
    planId: 'institution_basic',
    stripeCustomerId: 'cus_smoketest',
    paymentMethodId: 'pm_smoketest',
    updatedByUserId: admin._id,
  });
  // Clear cooldown so the trigger doesn't short-circuit.
  await Organization.findByIdAndUpdate(renewOrg._id, { $set: { 'autoRenew.lastTriggeredAt': null } });
  const renewAttempt5 = await seats.triggerAutoRenewIfDue(renewOrg._id);
  assert(
    renewAttempt5.reason !== 'no_payment_method' && renewAttempt5.reason !== 'disabled' && renewAttempt5.reason !== 'cooldown',
    `with tokens persisted, charge attempt clears the no_payment_method gate (reason: ${renewAttempt5.reason})`,
  );

  // 17. getSeatWallet snapshot
  const wallet = await seats.getSeatWallet(shelfOrg._id);
  assert(wallet.totalAvailable === 0, 'wallet snapshot reports 0 available for fully-expired org');
  assert(wallet.shelfExpired.length === 1, 'wallet snapshot lists 1 shelf-expired batch');

  // Cleanup
  await SeatAssignment.deleteMany({ organizationId: aged._id });
  await OrganizationMembership.deleteMany({ organizationId: aged._id });
  await User.deleteMany({ email: 'aged.smoke@example.com' });
  await SeatBatch.deleteMany({ organizationId: { $in: [shelfOrg._id, renewOrg._id, aged._id] } });
  await Organization.deleteMany({ _id: { $in: [shelfOrg._id, renewOrg._id, aged._id] } });
  await BillingEvent.deleteMany({ organizationId: { $in: [shelfOrg._id, renewOrg._id, aged._id] } });

  log('all assertions passed');
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error('smoke test crashed:', err);
  try { await mongoose.disconnect(); } catch (_) {}
  process.exit(1);
});
