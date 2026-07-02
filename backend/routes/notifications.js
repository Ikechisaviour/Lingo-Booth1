const express = require('express');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { verifyToken, isAdmin } = require('../middleware/auth');
const {
  notifyUsers,
  resolveAdminBroadcastRecipients,
} = require('../utils/notifications');
const { isExpoPushToken, sendPushToUsers } = require('../utils/pushNotifications');
const { sendServerError, sendClientError } = require('../utils/sendError');

const router = express.Router();

router.use(verifyToken);

function serialize(notification) {
  return {
    _id: notification._id,
    category: notification.category,
    severity: notification.severity,
    type: notification.type,
    titleKey: notification.titleKey,
    bodyKey: notification.bodyKey,
    params: notification.params || {},
    action: notification.action || {},
    organizationId: notification.organizationId || null,
    readAt: notification.readAt || null,
    archivedAt: notification.archivedAt || null,
    createdAt: notification.createdAt,
  };
}

router.get('/', async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 30, 1), 100);
    const unreadOnly = req.query.unread === 'true';
    const archivedOnly = req.query.archived === 'true';
    const filter = { userId: req.userId };
    if (archivedOnly) {
      // History view: dismissed notifications the user can come back to.
      filter.archivedAt = { $ne: null };
    } else {
      filter.archivedAt = null;
      if (unreadOnly) filter.readAt = null;
    }
    const [notifications, unreadCount] = await Promise.all([
      Notification.find(filter).sort({ createdAt: -1 }).limit(limit).lean(),
      Notification.countDocuments({ userId: req.userId, archivedAt: null, readAt: null }),
    ]);
    res.json({ notifications: notifications.map(serialize), unreadCount });
  } catch (error) {
    return sendServerError(req, res, error, 'NOTIFICATIONS_LIST_FAILED', { clientMessage: 'Could not load notifications' });
  }
});

router.get('/unread-count', async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({ userId: req.userId, archivedAt: null, readAt: null });
    res.json({ unreadCount });
  } catch (error) {
    return sendServerError(req, res, error, 'NOTIFICATIONS_UNREAD_COUNT_FAILED', { clientMessage: 'Could not load notification count' });
  }
});

router.post('/push-token', async (req, res) => {
  try {
    const token = String(req.body?.token || '').trim();
    const deviceId = String(req.body?.deviceId || '').trim().slice(0, 160);
    const platform = ['ios', 'android'].includes(req.body?.platform) ? req.body.platform : 'unknown';

    if (!isExpoPushToken(token)) {
      return sendClientError(res, 400, 'NOTIFICATIONS_PUSH_TOKEN_INVALID', 'Invalid push token');
    }

    await User.updateOne({ _id: req.userId }, { $pull: { pushTokens: { token } } });
    if (deviceId) {
      await User.updateOne({ _id: req.userId }, { $pull: { pushTokens: { deviceId } } });
    }
    await User.updateOne(
      { _id: req.userId },
      {
        $push: {
          pushTokens: {
            $each: [{ token, deviceId, platform, createdAt: new Date(), lastSeen: new Date() }],
            $slice: -10,
          },
        },
      },
    );

    res.json({ ok: true });
  } catch (error) {
    return sendServerError(req, res, error, 'NOTIFICATIONS_PUSH_TOKEN_REGISTER_FAILED', { clientMessage: 'Could not enable push notifications' });
  }
});

router.delete('/push-token', async (req, res) => {
  try {
    const token = String(req.body?.token || '').trim();
    const deviceId = String(req.body?.deviceId || '').trim().slice(0, 160);
    if (!token && !deviceId) return res.json({ ok: true });

    if (token) {
      await User.updateOne({ _id: req.userId }, { $pull: { pushTokens: { token } } });
    }
    if (deviceId) {
      await User.updateOne({ _id: req.userId }, { $pull: { pushTokens: { deviceId } } });
    }

    res.json({ ok: true });
  } catch (error) {
    return sendServerError(req, res, error, 'NOTIFICATIONS_PUSH_TOKEN_UNREGISTER_FAILED', { clientMessage: 'Could not disable push notifications' });
  }
});

router.put('/:notificationId/read', async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.notificationId, userId: req.userId },
      { $set: { readAt: new Date() } },
      { new: true },
    ).lean();
    if (!notification) return sendClientError(res, 404, 'NOTIFICATIONS_READ_NOT_FOUND', 'Notification not found');
    res.json({ notification: serialize(notification) });
  } catch (error) {
    return sendServerError(req, res, error, 'NOTIFICATIONS_MARK_READ_FAILED', { clientMessage: 'Could not update notification', metadata: { notificationId: req.params?.notificationId } });
  }
});

router.put('/:notificationId/restore', async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.notificationId, userId: req.userId },
      { $set: { archivedAt: null } },
      { new: true },
    ).lean();
    if (!notification) return sendClientError(res, 404, 'NOTIFICATIONS_RESTORE_NOT_FOUND', 'Notification not found');
    res.json({ notification: serialize(notification) });
  } catch (error) {
    return sendServerError(req, res, error, 'NOTIFICATIONS_RESTORE_FAILED', { clientMessage: 'Could not restore notification', metadata: { notificationId: req.params?.notificationId } });
  }
});

router.put('/read-all', async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.userId, archivedAt: null, readAt: null },
      { $set: { readAt: new Date() } },
    );
    res.json({ ok: true, unreadCount: 0 });
  } catch (error) {
    return sendServerError(req, res, error, 'NOTIFICATIONS_MARK_ALL_READ_FAILED', { clientMessage: 'Could not update notifications' });
  }
});

router.delete('/:notificationId', async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.notificationId, userId: req.userId },
      { $set: { archivedAt: new Date(), readAt: new Date() } },
      { new: true },
    ).lean();
    if (!notification) return sendClientError(res, 404, 'NOTIFICATIONS_ARCHIVE_NOT_FOUND', 'Notification not found');
    res.json({ ok: true });
  } catch (error) {
    return sendServerError(req, res, error, 'NOTIFICATIONS_ARCHIVE_FAILED', { clientMessage: 'Could not archive notification', metadata: { notificationId: req.params?.notificationId } });
  }
});

router.post('/admin/broadcast', isAdmin, async (req, res) => {
  try {
    const target = ['all', 'user', 'organization', 'institution_admins'].includes(req.body?.target)
      ? req.body.target
      : 'all';
    const recipientIds = await resolveAdminBroadcastRecipients({
      target,
      userEmail: req.body?.userEmail,
      organizationId: req.body?.organizationId,
      roles: Array.isArray(req.body?.roles) ? req.body.roles : [],
    });
    if (!recipientIds.length) return sendClientError(res, 404, 'NOTIFICATIONS_BROADCAST_NO_RECIPIENTS', 'No notification recipients found');

    const title = String(req.body?.title || '').trim().slice(0, 120) || 'Lingo Booth';
    const message = String(req.body?.message || '').trim().slice(0, 600);
    const actionRoute = String(req.body?.actionRoute || '').trim().slice(0, 300);

    await notifyUsers(recipientIds, {
      category: 'system',
      severity: ['info', 'success', 'warning', 'critical'].includes(req.body?.severity) ? req.body.severity : 'info',
      type: 'admin.broadcast',
      titleKey: 'notifications.adminBroadcastTitle',
      bodyKey: 'notifications.adminBroadcastBody',
      params: {
        title,
        message,
      },
      action: {
        labelKey: actionRoute ? 'notifications.openAction' : '',
        route: actionRoute,
      },
      actorUserId: req.userId,
    });
    const pushResult = await sendPushToUsers(recipientIds, {
      title,
      body: message,
      data: {
        kind: 'serverNotification',
        route: actionRoute,
        type: 'admin.broadcast',
      },
    });

    res.status(201).json({ sent: recipientIds.length, pushSent: pushResult.sent });
  } catch (error) {
    return sendServerError(req, res, error, 'NOTIFICATIONS_BROADCAST_FAILED', { clientMessage: 'Could not send notification', metadata: { target: req.body?.target } });
  }
});

module.exports = router;
