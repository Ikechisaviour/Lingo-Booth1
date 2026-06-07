const express = require('express');
const Notification = require('../models/Notification');
const { verifyToken, isAdmin } = require('../middleware/auth');
const {
  notifyUsers,
  resolveAdminBroadcastRecipients,
} = require('../utils/notifications');

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
    createdAt: notification.createdAt,
  };
}

router.get('/', async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 30, 1), 100);
    const unreadOnly = req.query.unread === 'true';
    const filter = {
      userId: req.userId,
      archivedAt: null,
    };
    if (unreadOnly) filter.readAt = null;
    const [notifications, unreadCount] = await Promise.all([
      Notification.find(filter).sort({ createdAt: -1 }).limit(limit).lean(),
      Notification.countDocuments({ userId: req.userId, archivedAt: null, readAt: null }),
    ]);
    res.json({ notifications: notifications.map(serialize), unreadCount });
  } catch (error) {
    res.status(500).json({ message: 'Could not load notifications' });
  }
});

router.get('/unread-count', async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({ userId: req.userId, archivedAt: null, readAt: null });
    res.json({ unreadCount });
  } catch (error) {
    res.status(500).json({ message: 'Could not load notification count' });
  }
});

router.put('/:notificationId/read', async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.notificationId, userId: req.userId },
      { $set: { readAt: new Date() } },
      { new: true },
    ).lean();
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json({ notification: serialize(notification) });
  } catch (error) {
    res.status(500).json({ message: 'Could not update notification' });
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
    res.status(500).json({ message: 'Could not update notifications' });
  }
});

router.delete('/:notificationId', async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.notificationId, userId: req.userId },
      { $set: { archivedAt: new Date(), readAt: new Date() } },
      { new: true },
    ).lean();
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: 'Could not archive notification' });
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
    if (!recipientIds.length) return res.status(404).json({ message: 'No notification recipients found' });

    await notifyUsers(recipientIds, {
      category: 'system',
      severity: ['info', 'success', 'warning', 'critical'].includes(req.body?.severity) ? req.body.severity : 'info',
      type: 'admin.broadcast',
      titleKey: 'notifications.adminBroadcastTitle',
      bodyKey: 'notifications.adminBroadcastBody',
      params: {
        title: String(req.body?.title || '').trim().slice(0, 120) || 'Lingo Booth',
        message: String(req.body?.message || '').trim().slice(0, 600),
      },
      action: {
        labelKey: req.body?.actionRoute ? 'notifications.openAction' : '',
        route: String(req.body?.actionRoute || '').trim().slice(0, 300),
      },
      actorUserId: req.userId,
    });

    res.status(201).json({ sent: recipientIds.length });
  } catch (error) {
    res.status(500).json({ message: 'Could not send notification' });
  }
});

module.exports = router;
