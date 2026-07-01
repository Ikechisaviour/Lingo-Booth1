import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAppColors, type AppColors } from '../../config/theme';

type Props = {
  reports: any;
  loading: boolean;
  clearing: boolean;
  onRefresh: () => void;
  onClearAll: () => void;
  onAcknowledge: (reportId: string) => void;
  onPageChange: (page: number) => void;
};

const formatDate = (value?: string) => (
  value ? new Date(value).toLocaleString() : '-'
);

const reportUserLabel = (report: any, t: any) => (
  report?.userSnapshot?.username
  || report?.userSnapshot?.email
  || report?.session?.username
  || (report?.session?.isGuest ? t('admin.guestUser', 'Guest user') : t('admin.unknownUser', 'Unknown user'))
);

const AdminFailureQueue: React.FC<Props> = ({
  reports,
  loading,
  clearing,
  onRefresh,
  onClearAll,
  onAcknowledge,
  onPageChange,
}) => {
  const { t } = useTranslation();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const openCount = reports?.openCount || 0;
  const criticalCount = reports?.criticalOpenCount || 0;
  const items = reports?.reports || [];

  return (
    <View style={styles.stack}>
      <Card style={styles.card}>
        <Card.Content style={styles.toolbar}>
          <View style={styles.toolbarCopy}>
            <Text style={styles.title}>{t('admin.userFailures', 'User-side failures')}</Text>
            <Text style={styles.meta}>
              {t('admin.openFailures', { count: openCount, defaultValue: '{{count}} open failures' })}
              {criticalCount > 0 ? ` · ${t('admin.criticalFailures', { count: criticalCount, defaultValue: '{{count}} critical' })}` : ''}
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

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.meta}>{t('admin.loadingFailures', 'Loading failures...')}</Text>
        </View>
      ) : items.length === 0 ? (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.emptyTitle}>{t('admin.noOpenFailures', 'No open user-side failures.')}</Text>
          </Card.Content>
        </Card>
      ) : (
        items.map((report: any) => (
          <Card key={report._id} style={[styles.card, styles.failureCard, report.severity === 'critical' && styles.criticalCard]}>
            <Card.Content style={styles.failureContent}>
              <View style={styles.failureHeader}>
                <View style={styles.failureHeaderCopy}>
                  <Text style={styles.severity}>{String(report.severity || 'error').toUpperCase()}</Text>
                  <Text style={styles.failureTitle}>{report.message}</Text>
                  <Text style={styles.meta}>
                    {formatDate(report.createdAt)} · {report.source || '-'} · {report.kind || '-'} · {reportUserLabel(report, t)}
                  </Text>
                </View>
                <Button mode="outlined" compact onPress={() => onAcknowledge(report._id)}>
                  {t('admin.acknowledge', 'Acknowledge')}
                </Button>
              </View>

              <View style={styles.detailGrid}>
                {!!report.code && (
                  <Text style={styles.detailText}>
                    {t('admin.code', 'Code')}: {report.code}{report.ref ? ` · ${t('admin.ref', 'Ref')} ${report.ref}` : ''}
                  </Text>
                )}
                <Text style={styles.detailText}>
                  {t('admin.page', 'Page')}: {report.route || report.screen || t('admin.unknown', 'Unknown')}
                </Text>
                <Text style={styles.detailText}>
                  {t('admin.device', 'Device')}: {report.deviceId || t('admin.unknown', 'Unknown')}
                </Text>
                <Text style={styles.detailText}>
                  {t('admin.languagePair', 'Language Pair')}: {report.session?.nativeLanguage || '?'} → {report.session?.targetLanguage || '?'}
                </Text>
                <Text style={styles.detailText}>
                  {t('admin.status', 'Status')}: {report.api?.statusCode || t('admin.clientStatus', 'Client')}
                </Text>
              </View>

              {!!report.api?.url && (
                <Text style={styles.codeLine}>{report.api.method || 'GET'} {report.api.url}</Text>
              )}
              {!!report.api?.responseMessage && report.api.responseMessage !== report.message && (
                <Text style={styles.responseText}>{report.api.responseMessage}</Text>
              )}
              {!!report.stack && (
                <Text style={styles.stackText} numberOfLines={8}>{report.stack}</Text>
              )}
            </Card.Content>
          </Card>
        ))
      )}

      {(reports?.totalPages || 1) > 1 && (
        <View style={styles.pagination}>
          <Button mode="outlined" disabled={reports.page <= 1 || loading} onPress={() => onPageChange(reports.page - 1)}>
            {t('classLesson.previous', 'Previous')}
          </Button>
          <Text style={styles.meta}>
            {t('admin.pageOf', { page: reports.page, total: reports.totalPages, defaultValue: 'Page {{page}} of {{total}}' })}
          </Text>
          <Button mode="outlined" disabled={reports.page >= reports.totalPages || loading} onPress={() => onPageChange(reports.page + 1)}>
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
  loading: { alignItems: 'center', gap: 8, paddingVertical: 18 },
  emptyTitle: { color: colors.textSecondary, fontWeight: '700' },
  failureCard: { borderLeftWidth: 4, borderLeftColor: colors.error },
  criticalCard: { borderLeftColor: '#b91c1c' },
  failureContent: { gap: 12 },
  failureHeader: { gap: 10 },
  failureHeaderCopy: { gap: 4 },
  severity: { color: colors.error, fontSize: 11, fontWeight: '900' },
  failureTitle: { color: colors.textPrimary, fontWeight: '800', lineHeight: 20 },
  detailGrid: { gap: 5 },
  detailText: { color: colors.textSecondary, lineHeight: 18 },
  codeLine: {
    color: colors.textPrimary,
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 10,
    fontFamily: 'monospace',
  },
  responseText: { color: colors.textPrimary, lineHeight: 20 },
  stackText: {
    color: colors.textSecondary,
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 10,
    fontFamily: 'monospace',
  },
  pagination: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
});

export default AdminFailureQueue;
