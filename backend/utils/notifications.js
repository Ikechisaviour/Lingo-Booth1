const Notification = require('../models/Notification');
const User = require('../models/User');
const Organization = require('../models/Organization');
const OrganizationMembership = require('../models/OrganizationMembership');
const { sendPushToUsers } = require('./pushNotifications');
const { resolveNotificationText } = require('./notificationText');

const SEAT_WARNING_THRESHOLDS = [0, 5, 10, 20];

function cleanParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params || {}).map(([key, value]) => [
      key,
      value === undefined || value === null ? '' : value,
    ]),
  );
}

// Fire a native push (best-effort, non-blocking) for a freshly created
// notification. In-app text is localized on the client from titleKey/bodyKey,
// so we resolve display text server-side here. Unknown keys resolve to '' and
// are skipped rather than pushing a raw i18n key.
function pushForNotification({ userId, type, titleKey, bodyKey, params, action }) {
  const title = resolveNotificationText(titleKey, params);
  if (!title) return;
  const body = resolveNotificationText(bodyKey, params);
  sendPushToUsers([userId], {
    title,
    body,
    data: {
      kind: 'serverNotification',
      route: action?.route || '',
      type,
    },
  }).catch(() => null);
}

async function createNotification({
  userId,
  category = 'system',
  severity = 'info',
  type,
  titleKey,
  bodyKey,
  params = {},
  action = {},
  organizationId = null,
  actorUserId = null,
  dedupeKey = '',
  // Bulk callers (e.g. admin broadcast) push once in a single batched call, so
  // they pass sendPush: false to avoid a per-recipient push here.
  sendPush = true,
}) {
  if (!userId || !type || !titleKey || !bodyKey) return null;
  const payload = {
    userId,
    category,
    severity,
    type,
    titleKey,
    bodyKey,
    params: cleanParams(params),
    action: {
      labelKey: action.labelKey || '',
      route: action.route || '',
    },
    organizationId,
    actorUserId,
    dedupeKey,
  };

  let notification;
  let isNew;
  if (dedupeKey) {
    const result = await Notification.findOneAndUpdate(
      { userId, dedupeKey },
      { $setOnInsert: payload },
      { new: true, upsert: true, includeResultMetadata: true },
    ).catch(() => null);
    notification = result?.value || null;
    // Only a first-time upsert should push; a matched existing doc must not.
    isNew = !!result && result.lastErrorObject?.updatedExisting === false;
  } else {
    notification = await Notification.create(payload).catch(() => null);
    isNew = !!notification;
  }

  if (notification && isNew && sendPush) {
    pushForNotification({ userId, type, titleKey, bodyKey, params: payload.params, action: payload.action });
  }

  return notification;
}

async function notifyUsers(userIds = [], payload = {}) {
  const uniqueIds = [...new Set(userIds.filter(Boolean).map((id) => String(id)))];
  return Promise.all(uniqueIds.map((userId) => createNotification({ ...payload, userId })));
}

async function organizationManagerUserIds(organizationId) {
  const memberships = await OrganizationMembership.find({
    organizationId,
    role: { $in: ['owner', 'admin'] },
    status: 'active',
    userId: { $ne: null },
  }).select('userId').lean();
  return memberships.map((membership) => membership.userId);
}

async function notifyOrganizationManagers(organizationId, payload = {}) {
  const userIds = await organizationManagerUserIds(organizationId);
  return notifyUsers(userIds, { ...payload, organizationId });
}

async function notifyOrganizationMembers(organizationId, payload = {}, { roles = [] } = {}) {
  const filter = {
    organizationId,
    status: 'active',
    userId: { $ne: null },
  };
  if (roles.length) filter.role = { $in: roles };
  const memberships = await OrganizationMembership.find(filter).select('userId').lean();
  return notifyUsers(memberships.map((membership) => membership.userId), { ...payload, organizationId });
}

async function notifyInstitutionAccess({ userId, organization, membership, actorUserId = null, source = 'added' }) {
  if (!userId || !organization) return null;
  const role = membership?.role || 'learner';
  return createNotification({
    userId,
    category: 'institution',
    severity: 'success',
    type: `institution.${source}`,
    titleKey: 'notifications.institutionAccessTitle',
    bodyKey: role === 'learner'
      ? 'notifications.institutionLearnerAddedBody'
      : 'notifications.institutionAdminAddedBody',
    params: {
      organizationName: organization.name,
      role,
    },
    action: {
      labelKey: role === 'learner' ? 'notifications.viewProfileAction' : 'notifications.openInstitutionAction',
      route: role === 'learner' ? '/profile/account' : '/institution',
    },
    organizationId: organization._id,
    actorUserId,
    dedupeKey: `institution-access:${organization._id}:${source}:${role}`,
  });
}

async function notifyInstitutionAccessRemoved({ userId, organization, actorUserId = null }) {
  if (!userId || !organization) return null;
  return createNotification({
    userId,
    category: 'institution',
    severity: 'warning',
    type: 'institution.removed',
    titleKey: 'notifications.institutionAccessRemovedTitle',
    bodyKey: 'notifications.institutionAccessRemovedBody',
    params: { organizationName: organization.name },
    action: { labelKey: 'notifications.viewProfileAction', route: '/profile/account' },
    organizationId: organization._id,
    actorUserId,
  });
}

async function notifySeatThresholdIfNeeded(organizationId, seatsAvailable, seatsPurchased, actorUserId = null) {
  const purchased = Math.max(Number(seatsPurchased) || 0, 0);
  if (!organizationId || purchased <= 0) return null;
  const remaining = Math.max(Number(seatsAvailable) || 0, 0);
  const percentRemaining = Math.round((remaining / purchased) * 100);
  const threshold = SEAT_WARNING_THRESHOLDS.find((value) => percentRemaining <= value);
  if (threshold === undefined) return null;

  const organization = await Organization.findById(organizationId).select('name').lean();
  if (!organization) return null;

  return notifyOrganizationManagers(organizationId, {
    category: 'institution',
    severity: threshold === 0 ? 'critical' : 'warning',
    type: 'institution.seat_threshold',
    titleKey: threshold === 0 ? 'notifications.noSeatsTitle' : 'notifications.lowSeatsTitle',
    bodyKey: threshold === 0 ? 'notifications.noSeatsBody' : 'notifications.lowSeatsBody',
    params: {
      organizationName: organization.name,
      remaining,
      purchased,
      percent: percentRemaining,
    },
    action: { labelKey: 'notifications.manageSeatsAction', route: '/institution' },
    actorUserId,
    dedupeKey: `seat-threshold:${organizationId}:${threshold}:${purchased}`,
  });
}

async function notifyInstitutionRequestStatus({ userId, organization, status, actorUserId = null }) {
  if (!userId || !organization) return null;
  const accepted = status === 'accepted';
  return createNotification({
    userId,
    category: 'institution',
    severity: accepted ? 'success' : 'warning',
    type: `institution.request.${status}`,
    titleKey: accepted ? 'notifications.institutionRequestAcceptedTitle' : 'notifications.institutionRequestDeclinedTitle',
    bodyKey: accepted ? 'notifications.institutionRequestAcceptedBody' : 'notifications.institutionRequestDeclinedBody',
    params: { organizationName: organization.name },
    action: { labelKey: accepted ? 'notifications.openInstitutionAction' : 'notifications.viewPlansAction', route: accepted ? '/institution' : '/pricing' },
    organizationId: organization._id,
    actorUserId,
  });
}

async function notifyInstitutionStatusChanged({ organization, status, actorUserId = null }) {
  if (!organization) return null;
  const suspended = status === 'suspended';
  return notifyOrganizationMembers(organization._id, {
    category: 'institution',
    severity: suspended ? 'critical' : 'success',
    type: `institution.status.${status}`,
    titleKey: suspended ? 'notifications.institutionSuspendedTitle' : 'notifications.institutionReactivatedTitle',
    bodyKey: suspended ? 'notifications.institutionSuspendedBody' : 'notifications.institutionReactivatedBody',
    params: { organizationName: organization.name },
    action: { labelKey: 'notifications.viewProfileAction', route: '/profile/account' },
    actorUserId,
  });
}

async function resolveAdminBroadcastRecipients({ target = 'all', userEmail = '', organizationId = '', roles = [] } = {}) {
  if (target === 'user') {
    const user = await User.findOne({ email: String(userEmail || '').toLowerCase().trim() }).select('_id').lean();
    return user ? [user._id] : [];
  }
  if (target === 'organization' || target === 'institution_admins') {
    const roleFilter = target === 'institution_admins' ? ['owner', 'admin'] : roles;
    const memberships = await OrganizationMembership.find({
      organizationId,
      status: 'active',
      userId: { $ne: null },
      ...(roleFilter?.length ? { role: { $in: roleFilter } } : {}),
    }).select('userId').lean();
    return memberships.map((membership) => membership.userId);
  }
  const users = await User.find({ status: { $ne: 'suspended' } }).select('_id').lean();
  return users.map((user) => user._id);
}

module.exports = {
  createNotification,
  notifyUsers,
  notifyOrganizationManagers,
  notifyOrganizationMembers,
  notifyInstitutionAccess,
  notifyInstitutionAccessRemoved,
  notifySeatThresholdIfNeeded,
  notifyInstitutionRequestStatus,
  notifyInstitutionStatusChanged,
  resolveAdminBroadcastRecipients,
};
