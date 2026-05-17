import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { billingService } from '../../services/api';
import { shadows, type AppColors, useAppColors } from '../../config/theme';

const roleOptions = ['learner', 'teacher', 'admin', 'owner'];
const statusOptions = ['active', 'invited', 'removed'];

const formatDate = (value: string | null | undefined, fallback: string) => {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleDateString();
};

const asPercent = (value: number | null | undefined, fallback: string) => (
  Number.isFinite(value) ? `${value}%` : fallback
);

const roleLabel = (t: any, role: string) => t(`institution.roles.${role}`, role);
const statusLabel = (t: any, status: string) => t(`institution.statuses.${status}`, status);

const InstitutionDashboardScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [noAccess, setNoAccess] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [dashboard, setDashboard] = useState<any>(null);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('learner');

  const organization = dashboard?.organization;
  const members = dashboard?.members || [];
  const canManage = !!dashboard?.currentMembership?.canManage;

  const loadDashboard = useCallback(async (organizationId = selectedOrganizationId) => {
    setError('');
    setNoAccess(false);
    try {
      const res = await billingService.getInstitutionDashboard(organizationId);
      setDashboard(res.data);
      const nextOrgId = res.data?.organization?._id;
      if (nextOrgId) setSelectedOrganizationId(String(nextOrgId));
    } catch (err: any) {
      if (err.response?.status === 403) {
        setNoAccess(true);
        setDashboard(null);
        setError(t('institution.noAccessBody'));
      } else {
        setError(t('institution.loadFailed'));
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedOrganizationId, t]);

  useEffect(() => {
    loadDashboard('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboard(selectedOrganizationId);
  };

  const addMember = async () => {
    if (!organization?._id || !inviteEmail.trim()) return;
    setSaving(true);
    setError('');
    setNotice('');
    try {
      await billingService.addInstitutionMember(organization._id, {
        email: inviteEmail.trim(),
        role: inviteRole,
      });
      setInviteEmail('');
      setInviteRole('learner');
      setNotice(t('institution.memberAdded'));
      await loadDashboard(organization._id);
    } catch {
      Alert.alert(t('common.error'), t('institution.memberAddFailed'));
    } finally {
      setSaving(false);
    }
  };

  const updateMember = async (member: any, changes: Record<string, string>) => {
    if (!organization?._id || !member?._id) return;
    setSaving(true);
    setError('');
    setNotice('');
    try {
      await billingService.updateInstitutionMember(organization._id, member._id, changes);
      setNotice(t('institution.memberUpdated'));
      await loadDashboard(organization._id);
    } catch (err: any) {
      Alert.alert(t('common.error'), t('institution.memberUpdateFailed'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (noAccess || !dashboard) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <Card style={styles.heroCard}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.kicker}>{t('institution.kicker')}</Text>
            <Text style={styles.title}>{t('institution.noAccessTitle')}</Text>
            <Text style={styles.muted}>{error || t('institution.noAccessBody')}</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Billing')}>
              {t('billing.viewPlans')}
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
      keyboardShouldPersistTaps="handled"
    >
      <Card style={styles.heroCard}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.kicker}>{t('institution.kicker')}</Text>
          <Text style={styles.title}>{organization?.name || t('institution.title')}</Text>
          <Text style={styles.muted}>{t('institution.subtitle')}</Text>

          {(dashboard.organizations || []).length > 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.orgSwitchRow}>
              {(dashboard.organizations || []).map((entry: any) => {
                const org = entry.organization;
                const active = String(org._id) === selectedOrganizationId;
                return (
                  <TouchableOpacity
                    key={org._id}
                    style={[styles.orgChip, active && styles.orgChipActive]}
                    onPress={() => loadDashboard(org._id)}
                    activeOpacity={0.75}
                  >
                    <Text style={[styles.orgChipText, active && styles.orgChipTextActive]}>{org.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          {(notice || error) && (
            <Text style={[styles.notice, error && styles.errorText]}>{error || notice}</Text>
          )}
        </Card.Content>
      </Card>

      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statLabel}>{t('institution.seatsUsed')}</Text>
            <Text style={styles.statValue}>
              {dashboard.seatUsage.used}/{dashboard.seatUsage.purchased}
            </Text>
            <Text style={styles.statHint}>{t('institution.remainingSeats', { count: dashboard.seatUsage.remaining })}</Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statLabel}>{t('institution.learners')}</Text>
            <Text style={styles.statValue}>{dashboard.counts.learners}</Text>
            <Text style={styles.statHint}>{t('institution.invitedCount', { count: dashboard.seatUsage.invited })}</Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statLabel}>{t('institution.averageScore')}</Text>
            <Text style={styles.statValue}>
              {asPercent(dashboard.learningSummary.averageScore, t('institution.noScore'))}
            </Text>
            <Text style={styles.statHint}>{t('institution.progressRecords', { count: dashboard.learningSummary.progressRecords })}</Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statLabel}>{t('institution.classItems')}</Text>
            <Text style={styles.statValue}>{dashboard.learningSummary.completedClassItems}</Text>
            <Text style={styles.statHint}>{t('institution.totalXp', { count: dashboard.learningSummary.totalXP })}</Text>
          </Card.Content>
        </Card>
      </View>

      {canManage && (
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.kicker}>{t('institution.people')}</Text>
            <Text style={styles.sectionTitle}>{t('institution.addMember')}</Text>
            <TextInput
              value={inviteEmail}
              onChangeText={setInviteEmail}
              label={t('pricing.email')}
              placeholder={t('institution.memberEmailPlaceholder')}
              keyboardType="email-address"
              autoCapitalize="none"
              mode="outlined"
            />
            <View style={styles.chipRow}>
              {roleOptions.map((role) => (
                <TouchableOpacity
                  key={role}
                  style={[styles.choiceChip, inviteRole === role && styles.choiceChipActive]}
                  onPress={() => setInviteRole(role)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.choiceChipText, inviteRole === role && styles.choiceChipTextActive]}>
                    {roleLabel(t, role)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button mode="contained" onPress={addMember} loading={saving} disabled={saving || !inviteEmail.trim()}>
              {t('institution.addMember')}
            </Button>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.cardHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.kicker}>{t('institution.people')}</Text>
              <Text style={styles.sectionTitle}>{t('institution.membersTitle')}</Text>
            </View>
            <Text style={styles.pill}>{t('institution.activeLearners', { count: dashboard.counts.learners })}</Text>
          </View>

          {members.map((member: any) => {
            const displayName = member.user?.username || member.email;
            const email = member.user?.email || member.email;
            return (
              <View key={member._id} style={styles.memberCard}>
                <View style={styles.memberTopRow}>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.memberName}>{displayName}</Text>
                    <Text style={styles.memberEmail}>{email}</Text>
                  </View>
                  <Text style={styles.memberStatus}>{statusLabel(t, member.status)}</Text>
                </View>
                <View style={styles.memberSummary}>
                  <Text style={styles.summaryText}>{roleLabel(t, member.role)}</Text>
                  <Text style={styles.summaryText}>
                    {asPercent(member.learnerSummary?.averageScore, t('institution.noScore'))}
                  </Text>
                  <Text style={styles.summaryText}>
                    {formatDate(member.user?.lastActive || member.learnerSummary?.lastStudiedAt, t('profilePage.unknown'))}
                  </Text>
                </View>
                <Text style={styles.memberProgress}>
                  {t('institution.completedItemsShort', { count: member.learnerSummary?.completedClassItems || 0 })}
                </Text>

                {canManage && (
                  <>
                    <View style={styles.chipRow}>
                      {roleOptions.map((role) => (
                        <TouchableOpacity
                          key={role}
                          style={[styles.smallChip, member.role === role && styles.choiceChipActive]}
                          onPress={() => updateMember(member, { role })}
                          disabled={saving}
                          activeOpacity={0.75}
                        >
                          <Text style={[styles.smallChipText, member.role === role && styles.choiceChipTextActive]}>
                            {roleLabel(t, role)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    <View style={styles.chipRow}>
                      {statusOptions.map((status) => (
                        <TouchableOpacity
                          key={status}
                          style={[styles.smallChip, member.status === status && styles.choiceChipActive]}
                          onPress={() => updateMember(member, { status })}
                          disabled={saving}
                          activeOpacity={0.75}
                        >
                          <Text style={[styles.smallChipText, member.status === status && styles.choiceChipTextActive]}>
                            {statusLabel(t, status)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}
              </View>
            );
          })}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.kicker}>{t('institution.snapshotsKicker', 'Learner snapshots')}</Text>
          <Text style={styles.sectionTitle}>{t('institution.needsHelpTitle', 'Needs attention')}</Text>
          {(dashboard.needsHelpLearners || []).length ? (
            (dashboard.needsHelpLearners || []).map((member: any) => (
              <View key={`needs-${member._id}`} style={styles.memberCard}>
                <Text style={styles.memberName}>{member.user?.username || member.email}</Text>
                <Text style={styles.memberProgress}>
                  {(member.learnerSnapshot?.reasons || []).map((reason: string) => t(`institution.snapshotReasons.${reason}`, reason)).join(' · ')}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.muted}>{t('institution.noNeedsHelpLearners', 'No learners currently need extra attention.')}</Text>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.kicker}>{t('billing.kicker')}</Text>
          <Text style={styles.sectionTitle}>{t('institution.planTitle')}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('billing.currentPlan')}</Text>
            <Text style={styles.detailValue}>
              {String(t(`pricing.planNames.${organization.planId}`, organization.planId))}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('institution.status')}</Text>
            <Text style={styles.detailValue}>
              {String(t(`institution.orgStatuses.${organization.status}`, organization.status))}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('billing.sources.institution')}</Text>
            <Text style={styles.detailValue}>{String(organization.effectiveTier || '').toUpperCase()}</Text>
          </View>
          <Button mode="outlined" onPress={() => navigation.navigate('Billing')}>
            {t('billing.viewPlans')}
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 14,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    ...shadows.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    ...shadows.sm,
  },
  cardContent: {
    gap: 12,
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '900',
  },
  muted: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  notice: {
    color: colors.success,
    fontWeight: '800',
  },
  errorText: {
    color: colors.error,
  },
  orgSwitchRow: {
    gap: 8,
    paddingVertical: 2,
  },
  orgChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  orgChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '14',
  },
  orgChipText: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  orgChipTextActive: {
    color: colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: '46%',
    backgroundColor: colors.surface,
    borderRadius: 14,
    ...shadows.sm,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 4,
  },
  statHint: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  pill: {
    color: colors.primary,
    backgroundColor: colors.primary + '16',
    borderRadius: 999,
    overflow: 'hidden',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 11,
    fontWeight: '900',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  choiceChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  choiceChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  choiceChipText: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  choiceChipTextActive: {
    color: colors.surface,
  },
  smallChip: {
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  smallChipText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '800',
  },
  memberCard: {
    gap: 9,
    padding: 13,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  memberTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  memberName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '900',
  },
  memberEmail: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  memberStatus: {
    color: colors.primary,
    fontWeight: '900',
    fontSize: 12,
  },
  memberSummary: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  summaryText: {
    color: colors.textSecondary,
    backgroundColor: colors.surface,
    borderRadius: 999,
    overflow: 'hidden',
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: '800',
  },
  memberProgress: {
    color: colors.textMuted,
    fontSize: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    color: colors.textSecondary,
    flex: 1,
  },
  detailValue: {
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'right',
    fontWeight: '900',
  },
});

export default InstitutionDashboardScreen;
