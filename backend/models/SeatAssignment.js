const mongoose = require('mongoose');

const SEAT_STATES = ['active', 'suspended', 'expired'];
const SEAT_END_REASONS = ['expired_natural', 'expired_on_suspend', 'removed', 'org_terminated', 'role_changed'];
const SEAT_TRIGGERS = ['admin_add', 'admin_unsuspend', 'learner_heartbeat', 'admin_role_change', 'backfill'];

const seatAssignmentSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  membershipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrganizationMembership',
    required: true,
    index: true,
  },
  seatBatchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SeatBatch',
    default: null,
    index: true,
  },
  state: {
    type: String,
    enum: SEAT_STATES,
    default: 'active',
    index: true,
  },
  activatedAt: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true,
  },
  endedAt: { type: Date, default: null },
  endReason: {
    type: String,
    enum: [...SEAT_END_REASONS, null],
    default: null,
  },
  triggeredBy: {
    type: String,
    enum: SEAT_TRIGGERS,
    required: true,
  },
  triggeredByUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  suspendedAt: { type: Date, default: null },
  suspendedByUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  suspensionReason: {
    type: String,
    enum: ['admin', 'pool_empty', 'learner_request_then_admin', null],
    default: null,
  },
  replacesAssignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SeatAssignment',
    default: null,
  },
}, {
  timestamps: true,
});

seatAssignmentSchema.index({ userId: 1, organizationId: 1, state: 1 });
seatAssignmentSchema.index({ organizationId: 1, expiresAt: 1, state: 1 });

// Prevent two simultaneously-live seats for the same user in the same org.
seatAssignmentSchema.index(
  { userId: 1, organizationId: 1 },
  {
    unique: true,
    partialFilterExpression: { state: { $in: ['active', 'suspended'] } },
  },
);

module.exports = mongoose.model('SeatAssignment', seatAssignmentSchema);
module.exports.SEAT_STATES = SEAT_STATES;
module.exports.SEAT_END_REASONS = SEAT_END_REASONS;
module.exports.SEAT_TRIGGERS = SEAT_TRIGGERS;
module.exports.SEAT_DURATION_MS = 30 * 24 * 60 * 60 * 1000;
