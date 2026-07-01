import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { notificationService } from '../services/api';
import './NotificationCenter.css';

const fallbackText = {
  'notifications.title': 'Notifications',
  'notifications.empty': 'No notifications yet.',
  'notifications.markAllRead': 'Mark all read',
  'notifications.openAction': 'Open',
  'notifications.dismiss': 'Dismiss',
  'notifications.unreadCount': '{{count}} unread',
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
  'notifications.viewProfileAction': 'View profile',
  'notifications.openInstitutionAction': 'Open institution',
  'notifications.manageSeatsAction': 'Manage seats',
  'notifications.viewPlansAction': 'View plans',
  'notifications.resumePracticeAction': 'Resume practice',
};

function notificationText(t, key, params = {}) {
  const localizedFallbackText = {
    'notifications.title': t('notifications.title', 'Notifications'),
    'notifications.empty': t('notifications.empty', 'No notifications yet.'),
    'notifications.markAllRead': t('notifications.markAllRead', 'Mark all read'),
    'notifications.openAction': t('notifications.openAction', 'Open'),
    'notifications.dismiss': t('notifications.dismiss', 'Dismiss'),
    'notifications.unreadCount': t('notifications.unreadCount', '{{count}} unread'),
    'notifications.adminBroadcastTitle': t('notifications.adminBroadcastTitle', '{{title}}'),
    'notifications.adminBroadcastBody': t('notifications.adminBroadcastBody', '{{message}}'),
    'notifications.institutionAccessTitle': t('notifications.institutionAccessTitle', 'Institution access updated'),
    'notifications.institutionLearnerAddedBody': t('notifications.institutionLearnerAddedBody', 'You have been added to {{organizationName}} as a learner.'),
    'notifications.institutionAdminAddedBody': t('notifications.institutionAdminAddedBody', 'You can now manage {{organizationName}} from your institution dashboard.'),
    'notifications.institutionAccessRemovedTitle': t('notifications.institutionAccessRemovedTitle', 'Institution access removed'),
    'notifications.institutionAccessRemovedBody': t('notifications.institutionAccessRemovedBody', 'Your access to {{organizationName}} was removed.'),
    'notifications.lowSeatsTitle': t('notifications.lowSeatsTitle', 'Institution seats are running low'),
    'notifications.lowSeatsBody': t('notifications.lowSeatsBody', '{{organizationName}} has {{remaining}} of {{purchased}} seats remaining.'),
    'notifications.noSeatsTitle': t('notifications.noSeatsTitle', 'No institution seats remaining'),
    'notifications.noSeatsBody': t('notifications.noSeatsBody', '{{organizationName}} has no seats remaining.'),
    'notifications.seatsAddedTitle': t('notifications.seatsAddedTitle', 'Institution seats added'),
    'notifications.seatsAddedBody': t('notifications.seatsAddedBody', '{{quantity}} seats were added. {{remaining}} seats are now available.'),
    'notifications.institutionPurchaseTitle': t('notifications.institutionPurchaseTitle', 'Institution subscription activated'),
    'notifications.institutionPurchaseBody': t('notifications.institutionPurchaseBody', '{{organizationName}} now has {{quantity}} institution seats.'),
    'notifications.institutionSeatSuspendedTitle': t('notifications.institutionSeatSuspendedTitle', 'Institution seat suspended'),
    'notifications.institutionSeatSuspendedBody': t('notifications.institutionSeatSuspendedBody', 'Your seat for {{organizationName}} was suspended.'),
    'notifications.institutionSeatRestoredTitle': t('notifications.institutionSeatRestoredTitle', 'Institution seat restored'),
    'notifications.institutionSeatRestoredBody': t('notifications.institutionSeatRestoredBody', 'Your seat for {{organizationName}} is active again.'),
    'notifications.suspensionRequestedTitle': t('notifications.suspensionRequestedTitle', 'Learner requested suspension'),
    'notifications.suspensionRequestedBody': t('notifications.suspensionRequestedBody', '{{email}} requested an institution seat suspension.'),
    'notifications.institutionRequestAcceptedTitle': t('notifications.institutionRequestAcceptedTitle', 'Institution request accepted'),
    'notifications.institutionRequestAcceptedBody': t('notifications.institutionRequestAcceptedBody', 'Your request for {{organizationName}} was accepted.'),
    'notifications.institutionRequestDeclinedTitle': t('notifications.institutionRequestDeclinedTitle', 'Institution request declined'),
    'notifications.institutionRequestDeclinedBody': t('notifications.institutionRequestDeclinedBody', 'Your institution request for {{organizationName}} was declined.'),
    'notifications.institutionSuspendedTitle': t('notifications.institutionSuspendedTitle', 'Institution suspended'),
    'notifications.institutionSuspendedBody': t('notifications.institutionSuspendedBody', '{{organizationName}} has been suspended.'),
    'notifications.institutionReactivatedTitle': t('notifications.institutionReactivatedTitle', 'Institution reactivated'),
    'notifications.institutionReactivatedBody': t('notifications.institutionReactivatedBody', '{{organizationName}} is active again.'),
    'notifications.xpDecayTitle': t('notifications.xpDecayTitle', 'Practice streak needs attention'),
    'notifications.xpDecayBody': t('notifications.xpDecayBody', '{{penalty}} XP was reduced after inactivity. Your current total is {{totalXP}} XP.'),
    'notifications.viewProfileAction': t('notifications.viewProfileAction', 'View profile'),
    'notifications.openInstitutionAction': t('notifications.openInstitutionAction', 'Open institution'),
    'notifications.manageSeatsAction': t('notifications.manageSeatsAction', 'Manage seats'),
    'notifications.viewPlansAction': t('notifications.viewPlansAction', 'View plans'),
    'notifications.resumePracticeAction': t('notifications.resumePracticeAction', 'Resume practice'),
  };
  return t(key, localizedFallbackText[key] || fallbackText[key] || key, params);
}

function NotificationCenter({ isGuest }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [view, setView] = useState('inbox');

  const canLoad = !isGuest && !!localStorage.getItem('token');

  const loadNotifications = useCallback(async ({ list = false, view: listView = 'inbox' } = {}) => {
    if (!canLoad) return;
    try {
      if (list) setLoading(true);
      const res = list
        ? await notificationService.list(listView === 'archived' ? { limit: 30, archived: true } : { limit: 30 })
        : await notificationService.unreadCount();
      if (list) setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.unreadCount || 0);
    } catch {
      if (list) setNotifications([]);
    } finally {
      if (list) setLoading(false);
    }
  }, [canLoad]);

  useEffect(() => {
    loadNotifications();
    const id = window.setInterval(() => loadNotifications(), 60000);
    return () => window.clearInterval(id);
  }, [loadNotifications]);

  useEffect(() => {
    if (open) loadNotifications({ list: true, view });
  }, [open, view, loadNotifications]);

  const label = useMemo(() => (
    unreadCount > 0
      ? t('notifications.unreadCount', '{{count}} unread', { count: unreadCount })
      : t('notifications.title', 'Notifications')
  ), [t, unreadCount]);

  if (!canLoad) return null;

  const markRead = async (notification) => {
    if (!notification.readAt) {
      await notificationService.markRead(notification._id).catch(() => null);
      setNotifications((items) => items.map((item) => (
        item._id === notification._id ? { ...item, readAt: new Date().toISOString() } : item
      )));
      setUnreadCount((count) => Math.max(count - 1, 0));
    }
  };

  const handleOpenAction = async (notification) => {
    await markRead(notification);
    setOpen(false);
    if (notification.action?.route) navigate(notification.action.route);
  };

  const handleMarkAll = async () => {
    await notificationService.markAllRead();
    setNotifications((items) => items.map((item) => ({ ...item, readAt: item.readAt || new Date().toISOString() })));
    setUnreadCount(0);
  };

  const handleDismiss = async (notification) => {
    await notificationService.archive(notification._id).catch(() => null);
    setNotifications((items) => items.filter((item) => item._id !== notification._id));
    if (!notification.readAt) setUnreadCount((count) => Math.max(count - 1, 0));
  };

  const handleRestore = async (notification) => {
    await notificationService.restore(notification._id).catch(() => null);
    setNotifications((items) => items.filter((item) => item._id !== notification._id));
  };

  return (
    <div className="notification-center">
      <button
        type="button"
        className={`notification-bell ${unreadCount > 0 ? 'has-unread' : ''}`}
        onClick={() => setOpen((value) => {
          if (value) setView('inbox');
          return !value;
        })}
        aria-label={label}
      >
        <span aria-hidden="true">&#128276;</span>
        {unreadCount > 0 && <strong>{unreadCount > 9 ? '9+' : unreadCount}</strong>}
      </button>
      {open && (
        <div className="notification-panel">
          <div className="notification-panel-head">
            <h2>{t('notifications.title', 'Notifications')}</h2>
            {view === 'inbox' && unreadCount > 0 && (
              <button type="button" onClick={handleMarkAll}>{t('notifications.markAllRead', 'Mark all read')}</button>
            )}
          </div>
          <div className="notification-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={view === 'inbox'}
              className={view === 'inbox' ? 'is-active' : ''}
              onClick={() => setView('inbox')}
            >
              {t('notifications.inboxTab', 'Inbox')}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === 'archived'}
              className={view === 'archived' ? 'is-active' : ''}
              onClick={() => setView('archived')}
            >
              {t('notifications.archivedTab', 'Archived')}
            </button>
          </div>
          {loading && <p className="notification-empty">{t('common.loading', 'Loading...')}</p>}
          {!loading && notifications.length === 0 && (
            <p className="notification-empty">
              {view === 'archived'
                ? t('notifications.emptyArchived', 'No archived notifications.')
                : t('notifications.empty', 'No notifications yet.')}
            </p>
          )}
          {!loading && notifications.map((notification) => (
            <article key={notification._id} className={`notification-item ${notification.readAt ? '' : 'is-unread'} ${notification.severity || 'info'}`}>
              <button type="button" onClick={() => markRead(notification)} className="notification-copy">
                <strong>{notificationText(t, notification.titleKey, notification.params)}</strong>
                <span>{notificationText(t, notification.bodyKey, notification.params)}</span>
                <small>{new Date(notification.createdAt).toLocaleString()}</small>
              </button>
              <div className="notification-actions">
                {notification.action?.route && (
                  <button type="button" onClick={() => handleOpenAction(notification)}>
                    {notificationText(t, notification.action.labelKey || 'notifications.openAction', notification.params)}
                  </button>
                )}
                {view === 'archived' ? (
                  <button type="button" onClick={() => handleRestore(notification)}>
                    {t('notifications.restore', 'Restore')}
                  </button>
                ) : (
                  <button type="button" onClick={() => handleDismiss(notification)}>
                    {t('notifications.dismiss', 'Dismiss')}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationCenter;
