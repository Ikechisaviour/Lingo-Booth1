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
  status: {
    type: String,
    enum: ['invited', 'active', 'removed'],
    default: 'invited',
    index: true,
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
