const User = require('../models/User');

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';
const EXPO_TOKEN_PREFIX = 'ExponentPushToken[';
const EXPO_TOKEN_PREFIX_MODERN = 'ExpoPushToken[';

function isExpoPushToken(token = '') {
  return (
    typeof token === 'string'
    && (
      token.startsWith(EXPO_TOKEN_PREFIX)
      || token.startsWith(EXPO_TOKEN_PREFIX_MODERN)
    )
    && token.endsWith(']')
  );
}

function chunk(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

async function cleanupInvalidTokens(tokens = []) {
  const uniqueTokens = [...new Set(tokens.filter(Boolean))];
  if (!uniqueTokens.length) return;
  await User.updateMany(
    { 'pushTokens.token': { $in: uniqueTokens } },
    { $pull: { pushTokens: { token: { $in: uniqueTokens } } } },
  ).catch(() => null);
}

async function sendExpoPushMessages(messages = []) {
  const validMessages = messages.filter((message) => isExpoPushToken(message.to));
  if (!validMessages.length) return { sent: 0, invalid: 0 };
  if (typeof fetch !== 'function') return { sent: 0, invalid: validMessages.length };

  let sent = 0;
  const invalidTokens = [];

  for (const batch of chunk(validMessages, 100)) {
    try {
      const response = await fetch(EXPO_PUSH_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batch),
      });
      const payload = await response.json().catch(() => ({}));
      const tickets = Array.isArray(payload?.data) ? payload.data : [];
      tickets.forEach((ticket, index) => {
        if (ticket?.status === 'ok') {
          sent += 1;
          return;
        }
        if (ticket?.details?.error === 'DeviceNotRegistered') {
          invalidTokens.push(batch[index]?.to);
        }
      });
    } catch (_) {
      // Push delivery is best-effort; the in-app notification remains stored.
    }
  }

  await cleanupInvalidTokens(invalidTokens);
  return { sent, invalid: invalidTokens.length };
}

async function sendPushToUsers(userIds = [], { title = '', body = '', data = {} } = {}) {
  const ids = [...new Set(userIds.filter(Boolean).map((id) => String(id)))];
  if (!ids.length || !String(title || '').trim()) return { sent: 0, invalid: 0 };

  const users = await User.find({ _id: { $in: ids }, status: { $ne: 'suspended' } })
    .select('pushTokens')
    .lean();
  const messages = [];
  users.forEach((user) => {
    (user.pushTokens || []).forEach((entry) => {
      if (!isExpoPushToken(entry.token)) return;
      messages.push({
        to: entry.token,
        title: String(title).slice(0, 120),
        body: String(body || '').slice(0, 600),
        sound: 'default',
        priority: 'high',
        data,
      });
    });
  });

  return sendExpoPushMessages(messages);
}

module.exports = {
  isExpoPushToken,
  sendPushToUsers,
};
