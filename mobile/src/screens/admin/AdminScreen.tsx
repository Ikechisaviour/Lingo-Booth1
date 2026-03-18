import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, Button, Card, TextInput, Searchbar, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { adminService } from '../../services/api';
import { useAppColors, type AppColors } from '../../config/theme';

type Tab = 'dashboard' | 'users' | 'guests';

const AdminScreen: React.FC = () => {
  const { t } = useTranslation();
  const colors = useAppColors();

  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [guests, setGuests] = useState<any>(null);
  const [guestsPage, setGuestsPage] = useState(1);
  const [loadingGuests, setLoadingGuests] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [suspendModal, setSuspendModal] = useState<{ userId: string; username: string } | null>(null);
  const [suspendReason, setSuspendReason] = useState('');

  // User detail modal
  const [userDetail, setUserDetail] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await adminService.getStats();
      setStats(res.data);
    } catch {}
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await adminService.getUsers();
      setUsers(res.data);
    } catch {}
  }, []);

  const fetchGuests = useCallback(async (page = 1) => {
    try {
      setLoadingGuests(true);
      const res = await adminService.getGuests(page);
      setGuests(res.data);
      setGuestsPage(page);
    } catch {} finally {
      setLoadingGuests(false);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchStats(), fetchUsers()]);
    setLoading(false);
  }, [fetchStats, fetchUsers]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Fetch guests when tab selected
  useEffect(() => {
    if (activeTab === 'guests' && !guests) {
      fetchGuests(1);
    }
  }, [activeTab]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAll();
    if (activeTab === 'guests') await fetchGuests(1);
    setRefreshing(false);
  };

  const handleViewUserDetail = async (userId: string) => {
    setShowUserDetail(true);
    setLoadingDetail(true);
    try {
      const res = await adminService.getUser(userId);
      setUserDetail(res.data);
    } catch {
      setUserDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleSuspend = async () => {
    if (!suspendModal) return;
    try {
      await adminService.suspendUser(suspendModal.userId, suspendReason);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === suspendModal.userId ? { ...u, status: 'suspended', suspendReason } : u,
        ),
      );
      setSuspendModal(null);
      setSuspendReason('');
    } catch {}
  };

  const handleUnsuspend = async (userId: string) => {
    try {
      await adminService.unsuspendUser(userId);
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, status: 'active' } : u)));
    } catch {}
  };

  const handlePromote = (userId: string, username: string) => {
    Alert.alert(
      'Promote to Admin',
      `Make ${username} an admin?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Promote',
          onPress: async () => {
            try {
              await adminService.updateUserRole(userId, 'admin');
              setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: 'admin' } : u)));
            } catch {}
          },
        },
      ],
    );
  };

  const handleDelete = (userId: string, username: string) => {
    Alert.alert('Delete User', `Permanently delete ${username}? This cannot be undone.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await adminService.deleteUser(userId);
            setUsers((prev) => prev.filter((u) => u._id !== userId));
          } catch {}
        },
      },
    ]);
  };

  const filteredUsers = users
    .filter((u) => {
      if (statusFilter === 'active') return u.status === 'active';
      if (statusFilter === 'suspended') return u.status === 'suspended';
      if (statusFilter === 'admin') return u.role === 'admin';
      return true;
    })
    .filter((u) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return u.username?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
    });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.headerTitle}>
          ⚙️ {t('admin.title', 'Admin Dashboard')}
        </Text>
      </View>

      {/* Tab switcher */}
      <View style={styles.tabRow}>
        <Chip selected={activeTab === 'dashboard'} onPress={() => setActiveTab('dashboard')} style={styles.tabChip}>
          {t('admin.dashboard', 'Dashboard')}
        </Chip>
        <Chip selected={activeTab === 'users'} onPress={() => setActiveTab('users')} style={styles.tabChip}>
          {t('admin.users', 'Users')} ({users.length})
        </Chip>
        <Chip selected={activeTab === 'guests'} onPress={() => setActiveTab('guests')} style={styles.tabChip}>
          👤 {t('admin.guests', 'Guests')}
        </Chip>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
      >
        {/* ── Dashboard tab ── */}
        {activeTab === 'dashboard' && stats && (
          <>
            {/* Overview stats */}
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <Text style={styles.statNumber}>{stats.overview?.totalUsers || 0}</Text>
                  <Text style={styles.statLabel}>{t('admin.totalUsers', 'Total Users')}</Text>
                </Card.Content>
              </Card>
              <Card style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <Text style={styles.statNumber}>{stats.overview?.activeUsers || 0}</Text>
                  <Text style={styles.statLabel}>{t('admin.activeUsers', 'Active (7d)')}</Text>
                </Card.Content>
              </Card>
              <Card style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <Text style={styles.statNumber}>{stats.overview?.suspendedUsers || 0}</Text>
                  <Text style={styles.statLabel}>{t('admin.suspended', 'Suspended')}</Text>
                </Card.Content>
              </Card>
              <Card style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <Text style={styles.statNumber}>{stats.overview?.avgTimeSpent || 0}m</Text>
                  <Text style={styles.statLabel}>{t('admin.avgTime', 'Avg Time')}</Text>
                </Card.Content>
              </Card>
              <Card style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <Text style={styles.statNumber}>{stats.overview?.activeToday || 0}</Text>
                  <Text style={styles.statLabel}>{t('admin.activeToday', 'Active Today')}</Text>
                </Card.Content>
              </Card>
              <Card style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <Text style={styles.statNumber}>{stats.overview?.newUsersThisWeek || 0}</Text>
                  <Text style={styles.statLabel}>{t('admin.newThisWeek', 'New This Week')}</Text>
                </Card.Content>
              </Card>
            </View>

            {/* Content stats */}
            {stats.contentOverview && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.cardTitle}>{t('admin.contentOverview', 'Content')}</Text>
                  {[
                    { label: t('admin.lessons', 'Lessons'), value: stats.contentOverview.lessons },
                    { label: t('admin.flashcards', 'Flashcards'), value: stats.contentOverview.flashcards },
                    { label: t('admin.progressRecords', 'Progress Records'), value: stats.contentOverview.progressRecords },
                    { label: t('admin.totalLogins', 'Total Logins'), value: stats.contentOverview.totalLogins },
                    { label: t('admin.admins', 'Admins'), value: stats.contentOverview.admins },
                  ].map((item) => (
                    <View key={item.label} style={styles.contentRow}>
                      <Text style={styles.contentLabel}>{item.label}</Text>
                      <Text style={styles.contentValue}>{item.value}</Text>
                    </View>
                  ))}
                </Card.Content>
              </Card>
            )}

            {/* Recent active users */}
            {stats.recentActiveUsers?.length > 0 && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.cardTitle}>{t('admin.recentActive', 'Recently Active')}</Text>
                  {stats.recentActiveUsers.slice(0, 5).map((u: any) => (
                    <View key={u._id || u.username} style={styles.recentUserRow}>
                      <Text style={styles.recentUsername}>{u.username}</Text>
                      <Text style={styles.recentMeta}>⚡ {u.totalXP || 0} XP · {u.xpDecayEnabled ? '🔥' : '🌿'}</Text>
                    </View>
                  ))}
                </Card.Content>
              </Card>
            )}

            {/* Mode breakdown */}
            {stats.modeBreakdown && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.cardTitle}>{t('admin.modeBreakdown', 'Study Mode')}</Text>
                  <View style={styles.modeRow}>
                    <View style={styles.modeItem}>
                      <Text style={styles.modeIcon}>🔥</Text>
                      <Text style={styles.modeCount}>{stats.modeBreakdown.challenge || 0}</Text>
                      <Text style={styles.modeLabel}>{t('admin.challenge', 'Challenge')}</Text>
                    </View>
                    <View style={styles.modeItem}>
                      <Text style={styles.modeIcon}>🌿</Text>
                      <Text style={styles.modeCount}>{stats.modeBreakdown.relaxed || 0}</Text>
                      <Text style={styles.modeLabel}>{t('admin.relaxed', 'Relaxed')}</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            )}
          </>
        )}

        {/* ── Users tab ── */}
        {activeTab === 'users' && (
          <>
            <Searchbar
              placeholder={t('admin.searchUsers', 'Search users...')}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchbar}
            />
            <View style={styles.filterRow}>
              {['all', 'active', 'suspended', 'admin'].map((f) => (
                <Chip key={f} selected={statusFilter === f} onPress={() => setStatusFilter(f)} style={styles.filterChip}>
                  {f === 'all' ? t('admin.all', 'All') : f.charAt(0).toUpperCase() + f.slice(1)}
                </Chip>
              ))}
            </View>

            {filteredUsers.map((user) => (
              <TouchableOpacity
                key={user._id}
                onPress={() => handleViewUserDetail(user._id)}
                activeOpacity={0.7}
              >
                <Card style={[styles.userCard, user.status === 'suspended' && styles.userCardSuspended]}>
                  <Card.Content>
                    <View style={styles.userHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.userName}>{user.username}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                      </View>
                      <View style={[styles.statusBadge, user.status === 'suspended' ? styles.badgeSuspended : styles.badgeActive]}>
                        <Text style={styles.statusText}>{user.status}</Text>
                      </View>
                    </View>
                    <View style={styles.userMeta}>
                      <Text style={styles.metaItem}>⚡ {user.totalXP || 0} XP</Text>
                      <Text style={styles.metaItem}>{user.role === 'admin' ? '👑 Admin' : '👤 User'}</Text>
                      <Text style={styles.metaItem}>{user.xpDecayEnabled ? '🔥' : '🌿'}</Text>
                    </View>
                    {user.role !== 'admin' && (
                      <View style={styles.userActions}>
                        {user.status === 'active' ? (
                          <Button
                            mode="outlined"
                            compact
                            textColor={colors.error}
                            onPress={(e) => { e.stopPropagation?.(); setSuspendModal({ userId: user._id, username: user.username }); }}
                          >
                            Suspend
                          </Button>
                        ) : (
                          <Button mode="outlined" compact textColor={colors.accentGreen} onPress={() => handleUnsuspend(user._id)}>
                            Unsuspend
                          </Button>
                        )}
                        <Button mode="outlined" compact onPress={() => handlePromote(user._id, user.username)}>
                          Promote
                        </Button>
                        <Button mode="outlined" compact textColor={colors.error} onPress={() => handleDelete(user._id, user.username)}>
                          Delete
                        </Button>
                      </View>
                    )}
                    <Text style={styles.tapHint}>Tap for details →</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* ── Guests tab ── */}
        {activeTab === 'guests' && (
          <>
            {loadingGuests && !guests ? (
              <View style={styles.centered}>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            ) : guests ? (
              <>
                {/* Guest stats overview */}
                {guests.stats && (
                  <>
                    <View style={styles.statsGrid}>
                      <Card style={styles.statCard}>
                        <Card.Content style={styles.statContent}>
                          <Text style={styles.statNumber}>{guests.stats.activeToday || 0}</Text>
                          <Text style={styles.statLabel}>Active Today</Text>
                        </Card.Content>
                      </Card>
                      <Card style={styles.statCard}>
                        <Card.Content style={styles.statContent}>
                          <Text style={styles.statNumber}>{guests.stats.activeWeek || 0}</Text>
                          <Text style={styles.statLabel}>Active 7d</Text>
                        </Card.Content>
                      </Card>
                      <Card style={styles.statCard}>
                        <Card.Content style={styles.statContent}>
                          <Text style={styles.statNumber}>{guests.stats.uniqueCountries || 0}</Text>
                          <Text style={styles.statLabel}>Countries</Text>
                        </Card.Content>
                      </Card>
                      <Card style={styles.statCard}>
                        <Card.Content style={styles.statContent}>
                          <Text style={[styles.statNumber, { fontSize: 20 }]}>{guests.stats.conversionRate != null ? `${guests.stats.conversionRate}%` : '—'}</Text>
                          <Text style={styles.statLabel}>Conversion</Text>
                        </Card.Content>
                      </Card>
                    </View>

                    {/* Aggregate metrics */}
                    <Card style={styles.card}>
                      <Card.Content>
                        <Text variant="titleMedium" style={styles.cardTitle}>Engagement</Text>
                        {[
                          { label: 'Avg Time Spent', value: `${guests.stats.avgTimeSpent || 0}m` },
                          { label: 'Total Cards Studied', value: guests.stats.totalCardsStudied || 0 },
                          { label: 'Total Audio Plays', value: guests.stats.totalAudioPlays || 0 },
                          { label: 'Lessons Viewed', value: guests.stats.totalLessonsViewed || 0 },
                        ].map((item) => (
                          <View key={item.label} style={styles.contentRow}>
                            <Text style={styles.contentLabel}>{item.label}</Text>
                            <Text style={styles.contentValue}>{item.value}</Text>
                          </View>
                        ))}
                      </Card.Content>
                    </Card>

                    {/* Top language pairs */}
                    {guests.stats.topLanguagePairs?.length > 0 && (
                      <Card style={styles.card}>
                        <Card.Content>
                          <Text variant="titleMedium" style={styles.cardTitle}>Top Language Pairs</Text>
                          {guests.stats.topLanguagePairs.slice(0, 5).map((pair: any, i: number) => (
                            <View key={i} style={styles.contentRow}>
                              <Text style={styles.contentLabel}>
                                {pair._id?.nativeLang || '?'} → {pair._id?.targetLang || '?'}
                              </Text>
                              <Text style={styles.contentValue}>{pair.count} sessions</Text>
                            </View>
                          ))}
                        </Card.Content>
                      </Card>
                    )}

                    {/* Device breakdown */}
                    {guests.stats.deviceBreakdown && (
                      <Card style={styles.card}>
                        <Card.Content>
                          <Text variant="titleMedium" style={styles.cardTitle}>Device Breakdown</Text>
                          {Object.entries(guests.stats.deviceBreakdown).map(([device, count]) => (
                            <View key={device} style={styles.contentRow}>
                              <Text style={styles.contentLabel}>{device}</Text>
                              <Text style={styles.contentValue}>{count as number}</Text>
                            </View>
                          ))}
                        </Card.Content>
                      </Card>
                    )}
                  </>
                )}

                {/* Sessions list */}
                {guests.sessions?.length > 0 && (
                  <Card style={styles.card}>
                    <Card.Content>
                      <Text variant="titleMedium" style={styles.cardTitle}>
                        Recent Sessions ({guests.total || guests.sessions.length})
                      </Text>
                      {guests.sessions.map((session: any, i: number) => (
                        <View key={session._id || i} style={styles.sessionRow}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.sessionId} numberOfLines={1}>
                              {session.sessionId?.slice(0, 12) || '—'}…
                            </Text>
                            <Text style={styles.sessionMeta}>
                              {session.nativeLang || '?'} → {session.targetLang || '?'}
                              {session.country ? ` · ${session.country}` : ''}
                            </Text>
                          </View>
                          <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.sessionStat}>📝 {session.cardsStudied || 0} cards</Text>
                            <Text style={styles.sessionStat}>⏱ {session.timeSpent || 0}m</Text>
                          </View>
                        </View>
                      ))}
                    </Card.Content>
                  </Card>
                )}

                {/* Pagination */}
                {guests.total > (guests.sessions?.length || 0) && (
                  <View style={styles.paginationRow}>
                    <Button
                      mode="outlined"
                      onPress={() => fetchGuests(guestsPage - 1)}
                      disabled={guestsPage <= 1}
                      compact
                    >
                      ← Prev
                    </Button>
                    <Text style={styles.pageText}>Page {guestsPage}</Text>
                    <Button
                      mode="outlined"
                      onPress={() => fetchGuests(guestsPage + 1)}
                      disabled={!guests.sessions || guests.sessions.length < 20}
                      compact
                    >
                      Next →
                    </Button>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.centered}>
                <Text style={styles.emptyText}>No guest data available</Text>
                <Button mode="contained" onPress={() => fetchGuests(1)} style={{ marginTop: 12 }}>
                  Load Data
                </Button>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Suspend modal */}
      <Modal visible={!!suspendModal} transparent animationType="fade" onRequestClose={() => setSuspendModal(null)}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.modalContent}>
            <Text variant="titleMedium" style={styles.modalTitle}>
              Suspend {suspendModal?.username}?
            </Text>
            <TextInput
              label="Reason (optional)"
              value={suspendReason}
              onChangeText={setSuspendReason}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />
            <View style={styles.modalActions}>
              <Button onPress={() => { setSuspendModal(null); setSuspendReason(''); }}>Cancel</Button>
              <Button mode="contained" buttonColor={colors.error} onPress={handleSuspend}>
                Suspend
              </Button>
            </View>
          </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* User detail modal */}
      <Modal visible={showUserDetail} transparent animationType="slide" onRequestClose={() => setShowUserDetail(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '80%' }]}>
            <View style={styles.detailHeader}>
              <Text variant="titleMedium" style={styles.modalTitle}>User Details</Text>
              <Button mode="text" compact onPress={() => setShowUserDetail(false)}>✕</Button>
            </View>
            {loadingDetail ? (
              <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 24 }} />
            ) : userDetail ? (
              <ScrollView>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Username</Text>
                  <Text style={styles.detailValue}>{userDetail.username}</Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Email</Text>
                  <Text style={styles.detailValue}>{userDetail.email}</Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Role</Text>
                  <Text style={styles.detailValue}>{userDetail.role === 'admin' ? '👑 Admin' : '👤 User'}</Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Status</Text>
                  <Text style={[styles.detailValue, { color: userDetail.status === 'active' ? colors.accentGreen : colors.error }]}>
                    {userDetail.status}
                  </Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Total XP</Text>
                  <Text style={styles.detailValue}>⚡ {userDetail.totalXP || 0}</Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Study Mode</Text>
                  <Text style={styles.detailValue}>{userDetail.xpDecayEnabled ? '🔥 Challenge' : '🌿 Relaxed'}</Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Languages</Text>
                  <Text style={styles.detailValue}>
                    {userDetail.nativeLanguage || '?'} → {userDetail.targetLanguage || '?'}
                  </Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Login Count</Text>
                  <Text style={styles.detailValue}>{userDetail.loginCount || 0}</Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Member Since</Text>
                  <Text style={styles.detailValue}>
                    {userDetail.createdAt ? new Date(userDetail.createdAt).toLocaleDateString() : '—'}
                  </Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Last Active</Text>
                  <Text style={styles.detailValue}>
                    {userDetail.lastActiveAt ? new Date(userDetail.lastActiveAt).toLocaleDateString() : '—'}
                  </Text>
                </View>
                {userDetail.status === 'suspended' && userDetail.suspendReason && (
                  <View style={[styles.detailSection, { backgroundColor: '#fef2f2', borderRadius: 8, padding: 12 }]}>
                    <Text style={[styles.detailLabel, { color: colors.error }]}>Suspend Reason</Text>
                    <Text style={[styles.detailValue, { color: colors.error }]}>{userDetail.suspendReason}</Text>
                  </View>
                )}
              </ScrollView>
            ) : (
              <Text style={styles.emptyText}>Could not load user details</Text>
            )}
            <Button mode="contained" onPress={() => setShowUserDetail(false)} style={{ marginTop: 16 }}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  header: { paddingTop: 48, paddingHorizontal: 16, paddingBottom: 8, backgroundColor: colors.surface },
  headerTitle: { fontWeight: '700', color: colors.textPrimary },
  tabRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: colors.surface },
  tabChip: {},
  content: { padding: 16, paddingBottom: 32 },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 },
  statCard: { width: '48%', marginBottom: 12, borderRadius: 12 },
  statContent: { alignItems: 'center', paddingVertical: 16 },
  statNumber: { fontSize: 28, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 4, textAlign: 'center' },

  card: { backgroundColor: colors.surface, borderRadius: 14, marginBottom: 12, elevation: 1 },
  cardTitle: { fontWeight: '700', marginBottom: 12 },
  contentRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  contentLabel: { fontSize: 14, color: colors.textSecondary },
  contentValue: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },

  recentUserRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  recentUsername: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  recentMeta: { fontSize: 13, color: colors.textSecondary },

  modeRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12 },
  modeItem: { alignItems: 'center' },
  modeIcon: { fontSize: 28 },
  modeCount: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, marginTop: 4 },
  modeLabel: { fontSize: 12, color: colors.textMuted },

  searchbar: { marginBottom: 8, elevation: 0, backgroundColor: colors.surface },
  filterRow: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  filterChip: {},

  userCard: { backgroundColor: colors.surface, borderRadius: 12, marginBottom: 8, elevation: 1 },
  userCardSuspended: { borderLeftWidth: 4, borderLeftColor: colors.error },
  userHeader: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  userEmail: { fontSize: 13, color: colors.textMuted },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeActive: { backgroundColor: '#d1fae5' },
  badgeSuspended: { backgroundColor: '#fef2f2' },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  userMeta: { flexDirection: 'row', gap: 16, marginTop: 8 },
  metaItem: { fontSize: 13, color: colors.textSecondary },
  userActions: { flexDirection: 'row', gap: 8, marginTop: 12 },
  tapHint: { fontSize: 11, color: colors.textMuted, marginTop: 8, textAlign: 'right' },

  // Guest sessions
  sessionRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  sessionId: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  sessionMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  sessionStat: { fontSize: 12, color: colors.textMuted },

  paginationRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  pageText: { fontSize: 14, color: colors.textSecondary, fontWeight: '600' },

  emptyText: { color: colors.textMuted, fontSize: 15 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  modalContent: { backgroundColor: colors.surface, borderRadius: 16, padding: 24 },
  modalTitle: { fontWeight: '700', marginBottom: 16 },
  input: { marginBottom: 12, backgroundColor: colors.surface },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },

  // User detail modal
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  detailSection: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  detailLabel: { fontSize: 14, color: colors.textSecondary },
  detailValue: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, maxWidth: '60%', textAlign: 'right' },
});

export default AdminScreen;
