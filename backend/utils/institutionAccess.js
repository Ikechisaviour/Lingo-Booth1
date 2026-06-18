const OrganizationMembership = require('../models/OrganizationMembership');
const seats = require('./seats');

async function syncInstitutionAccessForUser(user) {
  const email = String(user?.email || '').toLowerCase();
  if (!user?._id || !email) return user;

  const memberships = await OrganizationMembership.find({
    email,
    status: { $in: ['active', 'invited'] },
  })
    .populate('organizationId')
    .sort({ updatedAt: -1 });

  const activeMemberships = [];
  for (const membership of memberships) {
    const org = membership.organizationId;
    if (!org || !['active', 'trialing'].includes(org.status)) continue;
    const wasInvited = membership.status === 'invited';
    membership.userId = user._id;
    if (wasInvited) {
      membership.status = 'active';
      membership.joinedAt = membership.joinedAt || new Date();
    }
    await membership.save();
    activeMemberships.push(membership);

    if (wasInvited && membership.role === 'learner') {
      await seats.tryAllocateSeat({
        userId: user._id,
        orgId: org._id,
        membershipId: membership._id,
        trigger: 'admin_add',
        triggeredByUserId: membership.invitedBy || null,
      });
    }
  }

  const selectedContext = user.subscriptionContext || {};
  const selectedMembership = selectedContext.type === 'personal'
    ? null
    : activeMemberships.find((membership) => (
      selectedContext.type === 'institution'
      && selectedContext.organizationId
      && String(membership.organizationId?._id || membership.organizationId) === String(selectedContext.organizationId)
    )) || activeMemberships[0];

  if (selectedContext.type === 'personal') {
    user.institutionalAccess = {
      organizationId: null,
      organizationName: null,
      planId: null,
      effectiveTier: null,
      role: null,
      status: null,
      expiresAt: null,
      updatedAt: new Date(),
    };
    await user.save();
    return user;
  }

  if (selectedMembership?.organizationId) {
    const org = selectedMembership.organizationId;
    user.subscriptionContext = {
      type: 'institution',
      organizationId: org._id,
      updatedAt: user.subscriptionContext?.updatedAt || new Date(),
    };
    user.institutionalAccess = {
      organizationId: org._id,
      organizationName: org.name,
      planId: org.planId,
      effectiveTier: org.effectiveTier,
      role: selectedMembership.role,
      status: org.status,
      expiresAt: org.expiresAt || null,
      updatedAt: new Date(),
    };
    await user.save();
  }
  return user;
}

async function setSubscriptionContextForUser(user, { contextType = 'personal', organizationId = '' } = {}) {
  if (!user?._id) return user;

  if (contextType !== 'institution') {
    user.subscriptionContext = {
      type: 'personal',
      organizationId: null,
      updatedAt: new Date(),
    };
    return syncInstitutionAccessForUser(user);
  }

  const membership = await OrganizationMembership.findOne({
    userId: user._id,
    organizationId,
    status: 'active',
  }).populate('organizationId');

  if (!membership || !membership.organizationId || !['active', 'trialing'].includes(membership.organizationId.status)) {
    const error = new Error('Institution access is required');
    error.statusCode = 403;
    throw error;
  }

  user.subscriptionContext = {
    type: 'institution',
    organizationId: membership.organizationId._id,
    updatedAt: new Date(),
  };
  return syncInstitutionAccessForUser(user);
}

module.exports = {
  setSubscriptionContextForUser,
  syncInstitutionAccessForUser,
};
