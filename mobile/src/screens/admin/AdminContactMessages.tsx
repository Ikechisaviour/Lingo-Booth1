import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAppColors, type AppColors } from '../../config/theme';

type SenderFilter = 'all' | 'registered' | 'guest';

type Props = {
  messages: any;
  loading: boolean;
  clearing: boolean;
  senderFilter: SenderFilter;
  onRefresh: () => void;
  onClearAll: () => void;
  onAcknowledge: (messageId: string) => void;
  onPageChange: (page: number) => void;
  onSenderFilterChange: (filter: SenderFilter) => void;
};

const formatDate = (value?: string) => (
  value ? new Date(value).toLocaleString() : '-'
);

const AdminContactMessages: React.FC<Props> = ({
  messages,
  loading,
  clearing,
  senderFilter,
  onRefresh,
  onClearAll,
  onAcknowledge,
  onPageChange,
  onSenderFilterChange,
}) => {
  const { t } = useTranslation();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const items = messages?.messages || [];
  const openCount = messages?.openCount || 0;

  return (
    <View style={styles.stack}>
      <Card style={styles.card}>
        <Card.Content style={styles.toolbar}>
          <View style={styles.toolbarCopy}>
            <Text style={styles.title}>{t('admin.contactMessages', 'Contact messages')}</Text>
            <Text style={styles.meta}>
              {t('admin.unreadMessages', { count: openCount, defaultValue: '{{count}} unread messages' })}
            </Text>
          </View>
          <View style={styles.actions}>
            <Button mode="outlined" onPress={onRefresh} disabled={loading || clearing}>
              {t('common.refresh', 'Refresh')}
            </Button>
            <Button mode="contained" buttonColor={colors.error} onPress={onClearAll} disabled={loading || clearing || openCount === 0}>
              {clearing ? t('admin.clearing', 'Clearing...') : t('common.clearAll', 'Clear All')}
            </Button>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.filterRow}>
        {([
          { id: 'all', count: openCount, label: t('admin.allMessages', 'All messages') },
          { id: 'registered', count: messages?.registeredCount || 0, label: t('admin.registeredUsers', 'Registered users') },
          { id: 'guest', count: messages?.guestCount || 0, label: t('admin.guestUsers', 'Guest users') },
        ] as const).map((filter) => (
          <Chip
            key={filter.id}
            selected={senderFilter === filter.id}
            onPress={() => onSenderFilterChange(filter.id)}
          >
            {filter.label} ({filter.count})
          </Chip>
        ))}
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.meta}>{t('admin.loadingMessages', 'Loading messages...')}</Text>
        </View>
      ) : items.length === 0 ? (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.emptyTitle}>{t('admin.noUnreadMessages', 'No unread contact messages.')}</Text>
          </Card.Content>
        </Card>
      ) : (
        items.map((message: any) => {
          const senderIsGuest = message.session?.isGuest === true;
          const senderLabel = senderIsGuest
            ? t('admin.guestUser', 'Guest user')
            : t('admin.registeredUser', 'Registered user');
          return (
            <Card key={message._id} style={[styles.card, styles.messageCard, senderIsGuest && styles.guestCard]}>
              <Card.Content style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <View style={styles.messageHeaderCopy}>
                    <Text style={styles.sender}>{senderLabel}</Text>
                    <Text style={styles.subject}>{message.subject || t('admin.contactMessage', 'Contact message')}</Text>
                    <Text style={styles.meta}>
                      {formatDate(message.createdAt)} · {message.source || 'mobile'} · {message.name || message.email || t('admin.unknownUser', 'Unknown user')}
                    </Text>
                  </View>
                  <Button mode="outlined" compact onPress={() => onAcknowledge(message._id)}>
                    {t('admin.markRead', 'Mark read')}
                  </Button>
                </View>

                <View style={styles.detailGrid}>
                  <Text style={styles.detailText}>{t('admin.name', 'Name')}: {message.name || t('admin.unknown', 'Unknown')}</Text>
                  <Text style={styles.detailText}>{t('admin.email', 'Email')}: {message.email || t('admin.unknown', 'Unknown')}</Text>
                  <Text style={styles.detailText}>
                    {t('admin.accountTier', 'Account Tier')}: {message.session?.subscriptionTier || message.userSnapshot?.subscriptionTier || 'free'}
                  </Text>
                  <Text style={styles.detailText}>
                    {t('admin.languagePair', 'Language Pair')}: {message.session?.nativeLanguage || '?'} → {message.session?.targetLanguage || '?'}
                  </Text>
                  <Text style={styles.detailText}>{t('admin.page', 'Page')}: {message.page || t('admin.unknown', 'Unknown')}</Text>
                </View>

                <Text style={styles.body}>{message.message}</Text>
              </Card.Content>
            </Card>
          );
        })
      )}

      {(messages?.totalPages || 1) > 1 && (
        <View style={styles.pagination}>
          <Button mode="outlined" disabled={messages.page <= 1 || loading} onPress={() => onPageChange(messages.page - 1)}>
            {t('classLesson.previous', 'Previous')}
          </Button>
          <Text style={styles.meta}>
            {t('admin.pageOf', { page: messages.page, total: messages.totalPages, defaultValue: 'Page {{page}} of {{total}}' })}
          </Text>
          <Button mode="outlined" disabled={messages.page >= messages.totalPages || loading} onPress={() => onPageChange(messages.page + 1)}>
            {t('classLesson.next', 'Next')}
          </Button>
        </View>
      )}
    </View>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  stack: { gap: 12 },
  card: { backgroundColor: colors.surface, borderRadius: 14 },
  toolbar: { gap: 12 },
  toolbarCopy: { gap: 3 },
  title: { color: colors.textPrimary, fontSize: 18, fontWeight: '800' },
  meta: { color: colors.textSecondary, lineHeight: 19 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  loading: { alignItems: 'center', gap: 8, paddingVertical: 18 },
  emptyTitle: { color: colors.textSecondary, fontWeight: '700' },
  messageCard: { borderLeftWidth: 4, borderLeftColor: colors.primary },
  guestCard: { borderLeftColor: colors.warning },
  messageContent: { gap: 12 },
  messageHeader: { gap: 10 },
  messageHeaderCopy: { gap: 4 },
  sender: { color: colors.primary, fontSize: 11, fontWeight: '900', textTransform: 'uppercase' },
  subject: { color: colors.textPrimary, fontWeight: '800', lineHeight: 20 },
  detailGrid: { gap: 5 },
  detailText: { color: colors.textSecondary, lineHeight: 18 },
  body: {
    color: colors.textPrimary,
    lineHeight: 21,
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 12,
  },
  pagination: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
});

export default AdminContactMessages;
