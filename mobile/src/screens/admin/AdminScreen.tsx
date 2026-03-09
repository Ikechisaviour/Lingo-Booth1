import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import { Text, Button, Card, TextInput, Searchbar, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { adminService } from '../../services/api';
import { colors } from '../../config/theme';

const AdminScreen: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users'>('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [suspendModal, setSuspendModal] = useState<{ userId: string; username: string } | null>(null);
  const [suspendReason, setSuspendReason] = useState('');

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

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchStats(), fetchUsers()]);
    setLoading(false);
  }, [fetchStats, fetchUsers]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAll();
    setRefreshing(false);
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
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
      >
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
              <Card key={user._id} style={[styles.userCard, user.status === 'suspended' && styles.userCardSuspended]}>
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
                          onPress={() => setSuspendModal({ userId: user._id, username: user.username })}
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
                </Card.Content>
              </Card>
            ))}
          </>
        )}
      </ScrollView>

      {/* Suspend modal */}
      <Modal visible={!!suspendModal} transparent animationType="fade" onRequestClose={() => setSuspendModal(null)}>
        <View style={styles.modalOverlay}>
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
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { paddingTop: 48, paddingHorizontal: 16, paddingBottom: 8, backgroundColor: colors.surface },
  headerTitle: { fontWeight: '700', color: colors.textPrimary },
  tabRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: colors.surface },
  tabChip: {},
  content: { padding: 16, paddingBottom: 32 },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 },
  statCard: { width: '48%', marginBottom: 12, borderRadius: 12 },
  statContent: { alignItems: 'center', paddingVertical: 16 },
  statNumber: { fontSize: 28, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },

  card: { backgroundColor: colors.surface, borderRadius: 14, marginBottom: 12, elevation: 1 },
  cardTitle: { fontWeight: '700', marginBottom: 12 },
  contentRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  contentLabel: { fontSize: 14, color: colors.textSecondary },
  contentValue: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },

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

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  modalContent: { backgroundColor: colors.surface, borderRadius: 16, padding: 24 },
  modalTitle: { fontWeight: '700', marginBottom: 16 },
  input: { marginBottom: 12, backgroundColor: colors.surface },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
});

export default AdminScreen;
