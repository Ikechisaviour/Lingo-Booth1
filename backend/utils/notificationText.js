// Server-side text for native push notifications.
//
// The in-app notification center stores i18n keys (titleKey/bodyKey) and
// resolves them on the client. A native push must carry already-resolved text,
// so we resolve to English here — a sensible default for push, mirroring the
// English strings in frontend/src/locales/en/translation.json. Keys not present
// resolve to an empty string, which callers treat as "don't push".

const STRINGS = {
  'notifications.adminBroadcastTitle': '{{title}}',
  'notifications.adminBroadcastBody': '{{message}}',
  'notifications.institutionAccessTitle': 'Institution access updated',
  'notifications.institutionLearnerAddedBody': 'You have been added to {{organizationName}} as a learner.',
  'notifications.institutionAdminAddedBody': 'You can now manage {{organizationName}} from your institution dashboard.',
  'notifications.institutionAccessRemovedTitle': 'Institution access removed',
  'notifications.institutionAccessRemovedBody': 'Your access to {{organizationName}} was removed.',
  'notifications.lowSeatsTitle': 'Institution seats are running low',
  'notifications.lowSeatsBody': '{{organizationName}} has {{remaining}} of {{purchased}} seats remaining.',
  'notifications.noSeatsTitle': 'No institution seats remaining',
  'notifications.noSeatsBody': '{{organizationName}} has no seats remaining.',
  'notifications.seatsAddedTitle': 'Institution seats added',
  'notifications.seatsAddedBody': '{{quantity}} seats were added. {{remaining}} seats are now available.',
  'notifications.institutionPurchaseTitle': 'Institution subscription activated',
  'notifications.institutionPurchaseBody': '{{organizationName}} now has {{quantity}} institution seats.',
  'notifications.institutionSeatSuspendedTitle': 'Institution seat suspended',
  'notifications.institutionSeatSuspendedBody': 'Your seat for {{organizationName}} was suspended.',
  'notifications.institutionSeatRestoredTitle': 'Institution seat restored',
  'notifications.institutionSeatRestoredBody': 'Your seat for {{organizationName}} is active again.',
  'notifications.suspensionRequestedTitle': 'Learner requested suspension',
  'notifications.suspensionRequestedBody': '{{email}} requested an institution seat suspension.',
  'notifications.institutionRequestAcceptedTitle': 'Institution request accepted',
  'notifications.institutionRequestAcceptedBody': 'Your request for {{organizationName}} was accepted.',
  'notifications.institutionRequestDeclinedTitle': 'Institution request declined',
  'notifications.institutionRequestDeclinedBody': 'Your institution request for {{organizationName}} was declined.',
  'notifications.institutionSuspendedTitle': 'Institution suspended',
  'notifications.institutionSuspendedBody': '{{organizationName}} has been suspended.',
  'notifications.institutionReactivatedTitle': 'Institution reactivated',
  'notifications.institutionReactivatedBody': '{{organizationName}} is active again.',
  'notifications.xpDecayTitle': 'Practice streak needs attention',
  'notifications.xpDecayBody': '{{penalty}} XP was reduced after inactivity. Your current total is {{totalXP}} XP.',
};

function interpolate(template, params = {}) {
  return String(template).replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
    const value = params[key];
    return value === undefined || value === null ? '' : String(value);
  });
}

// Resolve a notification titleKey/bodyKey to display text. Returns '' for
// unknown keys so callers can skip pushing rather than sending a raw key.
function resolveNotificationText(key, params = {}) {
  if (!key || !STRINGS[key]) return '';
  return interpolate(STRINGS[key], params).trim();
}

module.exports = { resolveNotificationText };
