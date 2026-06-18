import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { notificationService } from '../../services/api';
import { useAppColors } from '../../config/theme';

const fallbackText: Record<string, string> = {
  'notifications.title': 'Notifications',
  'notifications.empty': 'No notifications yet.',
  'notifications.markAllRead': 'Mark all read',
  'notifications.openAction': 'Open',
  'notifications.dismiss': 'Dismiss',
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

function textFor(t: any, key: string, params = {}) {
  const localizedFallbackText: Record<string, string> = {
    'notifications.title': t('notifications.title', 'Notifications'),
    'notifications.empty': t('notifications.empty', 'No notifications yet.'),
    'notifications.markAllRead': t('notifications.markAllRead', 'Mark all read'),
    'notifications.openAction': t('notifications.openAction', 'Open'),
    'notifications.dismiss': t('notifications.dismiss', 'Dismiss'),
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

const NotificationsScreen: React.FC = () => {
  const { t } = useTranslation();
  const colors = useAppColors();
  const navigation = useNavigation<any>();
  const [items, setItems] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await notificationService.list({ limit: 50 });
      setItems(res.data.notifications || []);
      setUnreadCount(res.data.unreadCount || 0);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const markRead = async (notification: any) => {
    if (!notification.readAt) {
      await notificationService.markRead(notification._id).catch(() => null);
      setItems((current) => current.map((item) => (
        item._id === notification._id ? { ...item, readAt: new Date().toISOString() } : item
      )));
      setUnreadCount((count) => Math.max(count - 1, 0));
    }
  };

  const openNotification = async (notification: any) => {
    await markRead(notification);
    const route = notification.action?.route || '';
    if (route.startsWith('/home')) navigation.navigate('Home');
    else if (route.startsWith('/institution')) navigation.navigate('Institution');
    else if (route.startsWith('/pricing')) navigation.navigate('Billing');
    else navigation.navigate('ProfileMain');
  };

  const markAllRead = async () => {
    await notificationService.markAllRead();
    setUnreadCount(0);
    setItems((current) => current.map((item) => ({ ...item, readAt: item.readAt || new Date().toISOString() })));
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Button mode="text" icon="arrow-left" onPress={() => navigation.goBack()}>
          {t('common.back', 'Back')}
        </Button>
        {unreadCount > 0 && (
          <Button mode="text" onPress={markAllRead}>
            {t('notifications.markAllRead', 'Mark all read')}
          </Button>
        )}
      </View>
      <Text variant="headlineMedium" style={styles.title}>{t('notifications.title', 'Notifications')}</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
        ListEmptyComponent={<Text style={styles.empty}>{t('notifications.empty', 'No notifications yet.')}</Text>}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={[styles.card, !item.readAt && styles.unread]}>
            <Card.Content>
              <Text variant="titleMedium">{textFor(t, item.titleKey, item.params)}</Text>
              <Text style={styles.body}>{textFor(t, item.bodyKey, item.params)}</Text>
              <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
              <View style={styles.actions}>
                <Button mode="text" onPress={() => openNotification(item)}>
                  {textFor(t, item.action?.labelKey || 'notifications.openAction', item.params)}
                </Button>
                <Button
                  mode="text"
                  onPress={async () => {
                    await notificationService.archive(item._id);
                    setItems((current) => current.filter((entry) => entry._id !== item._id));
                    if (!item.readAt) setUnreadCount((count) => Math.max(count - 1, 0));
                  }}
                >
                  {t('notifications.dismiss', 'Dismiss')}
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontWeight: '800', marginVertical: 12 },
  list: { paddingBottom: 32 },
  empty: { color: '#6b7280', marginTop: 24, textAlign: 'center' },
  card: { marginBottom: 12, borderRadius: 10 },
  unread: { backgroundColor: '#fff7ed' },
  body: { color: '#4b5563', marginTop: 6 },
  date: { color: '#9ca3af', fontSize: 12, marginTop: 8 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
});

export default NotificationsScreen;
