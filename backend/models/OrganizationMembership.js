const mongoose = require('mongoose');

const organizationMembershipSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    maxlength: 254,
    index: true,
  },
  role: {
    type: String,
    enum: ['owner', 'admin', 'teacher', 'learner'],
    default: 'learner',
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InstitutionGroup',
    default: null,
    index: true,
  },
  allowedTargetLanguages: {
    type: [String],
    default: [],
  },
  consumesSeat: {
    type: Boolean,
    default: false,
    index: true,
  },
  status: {
    type: String,
    enum: ['invited', 'active', 'suspended', 'removed'],
    default: 'invited',
    index: true,
  },
  suspensionReason: {
    type: String,
    enum: ['admin', 'pool_empty', null],
    default: null,
  },
  suspendedAt: { type: Date, default: null },
  suspendedByUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  suspensionRequest: {
    note: { type: String, maxlength: 1000, default: '' },
    requestedAt: { type: Date, default: null },
    requestedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    handledAt: { type: Date, default: null },
    handledByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    handledOutcome: {
      type: String,
      enum: ['suspended', 'declined', null],
      default: null,
    },
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  joinedAt: Date,
}, {
  timestamps: true,
});

organizationMembershipSchema.index({ organizationId: 1, email: 1 }, { unique: true });
organizationMembershipSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('OrganizationMembership', organizationMembershipSchema);
