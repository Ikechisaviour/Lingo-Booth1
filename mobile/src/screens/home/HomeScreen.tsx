import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Modal } from 'react-native';
import { Text, Button, Card, ProgressBar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { userService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { getLangName } from '../../config/languages';
import { colors } from '../../config/theme';

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { userId, username, userRole, isGuest, challengeMode, guestXP } = useAuthStore();
  const { targetLanguage } = useSettingsStore();
  const isAdmin = userRole === 'admin';

  const [xpStats, setXpStats] = useState<any>(null);
  const [gamification, setGamification] = useState<any>(null);
  const [lastActivity, setLastActivity] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [claimingQuest, setClaimingQuest] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!userId) return;
    try {
      const [xpRes, gamRes] = await Promise.all([
        userService.getXpStats(userId),
        userService.getGamificationStats(userId),
      ]);
      setXpStats(xpRes.data);
      setGamification(gamRes.data);
    } catch {}

    try {
      const actRes = await userService.getActivityState(userId);
      const state = actRes.data;
      if (state.activityType === 'lesson' && state.lesson) {
        setLastActivity({
          type: 'lesson',
          title: state.lesson.title || 'Untitled Lesson',
          lessonId: state.lesson._id,
        });
      } else if (state.activityType === 'flashcard' && state.flashcardIndex > 0) {
        setLastActivity({ type: 'flashcard', index: state.flashcardIndex });
      }
    } catch {}
  }, [userId]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleClaimQuest = async (questId: string) => {
    if (!userId || claimingQuest) return;
    setClaimingQuest(questId);
    try {
      await userService.claimQuestReward(userId, questId);
      await fetchData();
    } catch {}
    setClaimingQuest(null);
  };

  const handleViewLeaderboard = async () => {
    if (!userId) return;
    try {
      const res = await userService.getLeaderboard(userId);
      setLeaderboard(res.data);
      setShowLeaderboard(true);
    } catch {}
  };

  const formatTimeAgo = (dateStr: string | null) => {
    if (!dateStr) return t('home.never');
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return t('home.dAgo', { d: days, h: hours % 24 });
    if (hours > 0) return t('home.hAgo', { h: hours });
    const mins = Math.floor(diff / (1000 * 60));
    return t('home.mAgo', { m: mins });
  };

  const isReturningUser = !!userId && (!!lastActivity || !!xpStats);
  const questIcons: Record<string, string> = { xp: '⚡', lessons: '🎯', time: '⏱️' };
  const leagueBadges: Record<string, string> = { bronze: '🥉', silver: '🥈', gold: '🥇', diamond: '💎' };

  const handleContinue = () => {
    if (!lastActivity) return;
    if (lastActivity.type === 'flashcard') {
      navigation.navigate('Flashcards');
    } else if (lastActivity.lessonId) {
      navigation.navigate('Lessons', {
        screen: 'LessonDetail',
        params: { lessonId: lastActivity.lessonId },
      });
    } else {
      navigation.navigate('Lessons');
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
    >
      {/* Hero Section */}
      <View style={styles.heroSection}>
        {isReturningUser ? (
          <>
            <Text variant="headlineSmall" style={styles.heroTitle}>
              {username ? t('home.welcomeBack', { username }) : t('home.welcomeBackNoName')}
            </Text>
            <Text style={styles.heroSubtitle}>
              {lastActivity
                ? lastActivity.type === 'lesson'
                  ? t('home.studyingLesson', { title: lastActivity.title })
                  : t('home.studyingFlashcards')
                : t('home.readyForSession')}
            </Text>
            {lastActivity && (
              <Button mode="contained" onPress={handleContinue} style={styles.heroButton} labelStyle={styles.heroButtonLabel}>
                {lastActivity.type === 'lesson' ? t('home.continueLesson') : t('home.continueFlashcards')} →
              </Button>
            )}
          </>
        ) : (
          <>
            <Text variant="headlineSmall" style={styles.heroTitle}>
              {t('home.learnLanguage', { language: getLangName(targetLanguage) })}
            </Text>
            <Text style={styles.heroSubtitle}>{t('home.heroSubtitle')}</Text>
            {isGuest && (
              <View style={styles.guestXpBadge}>
                <Text style={styles.guestXpText}>⚡ {guestXP} {t('common.xp')}</Text>
              </View>
            )}
            <Button mode="contained" onPress={() => navigation.navigate('Lessons')} style={styles.heroButton} labelStyle={styles.heroButtonLabel}>
              {isGuest ? t('home.startLearning') : t('home.getStartedFree')}
            </Button>
          </>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('Lessons')} activeOpacity={0.7}>
          <Text style={styles.quickIcon}>📚</Text>
          <View style={styles.quickTextCol}>
            <Text style={styles.quickTitle}>{t('home.lessonsAction')}</Text>
            <Text style={styles.quickDesc}>{t('home.lessonsDesc')}</Text>
          </View>
          <Text style={styles.quickArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('Flashcards')} activeOpacity={0.7}>
          <Text style={styles.quickIcon}>🎴</Text>
          <View style={styles.quickTextCol}>
            <Text style={styles.quickTitle}>{t('home.flashcardsAction')}</Text>
            <Text style={styles.quickDesc}>{t('home.flashcardsDesc')}</Text>
          </View>
          <Text style={styles.quickArrow}>→</Text>
        </TouchableOpacity>

        {!isGuest && (
          <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('Progress')} activeOpacity={0.7}>
            <Text style={styles.quickIcon}>📊</Text>
            <View style={styles.quickTextCol}>
              <Text style={styles.quickTitle}>{t('home.progressAction')}</Text>
              <Text style={styles.quickDesc}>{t('home.progressDesc')}</Text>
            </View>
            <Text style={styles.quickArrow}>→</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Gamification Cards — Challenge Mode */}
      {gamification?.challengeMode && (
        <>
          {/* Streak Card */}
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>🔥</Text>
                <Text style={styles.cardTitle}>{t('home.dayStreak')}</Text>
              </View>
              <View style={styles.streakDisplay}>
                <Text style={styles.streakNumber}>{gamification.streak.current}</Text>
                <Text style={styles.streakLabel}>
                  {gamification.streak.current !== 1 ? t('home.days') : t('home.day')}
                </Text>
              </View>
              <View style={styles.streakCalendar}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <View key={i} style={[styles.calDay, gamification.streak.history[i] && styles.calDayActive]}>
                    <Text style={styles.calDayText}>
                      {gamification.streak.history[i] ? '🔥' : day}
                    </Text>
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Daily Quests */}
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>🎯</Text>
                <Text style={styles.cardTitle}>{t('home.dailyQuests')}</Text>
              </View>
              {gamification.quests.map((quest: any) => (
                <View key={quest.id} style={styles.questItem}>
                  <Text style={styles.questIcon}>{questIcons[quest.id] || '⭐'}</Text>
                  <View style={styles.questInfo}>
                    <Text style={styles.questTask}>{quest.task}</Text>
                    <ProgressBar
                      progress={quest.total > 0 ? quest.progress / quest.total : 0}
                      color={quest.completed ? colors.accentGreen : colors.primary}
                      style={styles.questProgress}
                    />
                  </View>
                  {quest.claimed ? (
                    <Text style={styles.questClaimed}>✓</Text>
                  ) : quest.completed ? (
                    <TouchableOpacity
                      style={styles.claimButton}
                      onPress={() => handleClaimQuest(quest.id)}
                      disabled={claimingQuest === quest.id}
                    >
                      <Text style={styles.claimButtonText}>+{quest.bonusXP} {t('common.xp')}</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.questCount}>{quest.progress}/{quest.total}</Text>
                  )}
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* League Card */}
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>🏆</Text>
                <Text style={styles.cardTitle}>
                  {t('home.league', { name: gamification.league.name })}
                </Text>
              </View>
              <View style={styles.leagueRow}>
                <View style={styles.leagueRank}>
                  <Text style={styles.leagueBadge}>{leagueBadges[gamification.league.badge] || '🏅'}</Text>
                  <Text style={styles.leaguePosition}>#{gamification.league.rank}</Text>
                  <Text style={styles.leagueLabel}>{t('home.yourRank')}</Text>
                </View>
                <View style={styles.leagueXp}>
                  <Text style={styles.leagueXpValue}>{gamification.league.weeklyXP} {t('common.xp')}</Text>
                  <Text style={styles.leagueLabel}>{t('home.thisWeek')}</Text>
                </View>
              </View>
              <Button mode="outlined" onPress={handleViewLeaderboard} style={styles.leaderboardBtn}>
                {t('home.viewLeague')}
              </Button>
            </Card.Content>
          </Card>
        </>
      )}

      {/* Teaser for Relaxed Mode users */}
      {gamification && !gamification.challengeMode && !!userId && (
        <Card style={[styles.card, styles.teaserCard]}>
          <Card.Content style={styles.teaserContent}>
            <Text style={styles.teaserLock}>🔒</Text>
            <Text style={styles.teaserTitle}>{t('home.unlockTitle')}</Text>
            <Text style={styles.teaserDesc}>{t('home.unlockDesc')}</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Profile')} style={styles.teaserBtn}>
              {t('home.enableChallengeMode')}
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* XP Tracker */}
      {xpStats && (
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>
                {xpStats.status === 'off' ? '🌿' : xpStats.status === 'decaying' ? '📉' : xpStats.status === 'grace' ? '⏳' : '✨'}
              </Text>
              <Text style={styles.cardTitle}>{t('home.xpTracker')}</Text>
              <View style={[styles.xpStatusBadge, styles[`badge_${xpStats.status}`] || styles.badge_safe]}>
                <Text style={[styles.xpStatusText, styles[`badgeText_${xpStats.status}`] || styles.badgeText_safe]}>
                  {xpStats.status === 'off' ? t('home.relaxed') : t('home.intense')}
                </Text>
              </View>
            </View>
            <View style={styles.xpTotal}>
              <Text style={styles.xpNumber}>{xpStats.totalXP}</Text>
              <Text style={styles.xpLabel}>{t('home.totalXP')}</Text>
            </View>
            <View style={styles.xpDetails}>
              <View style={styles.xpDetailRow}>
                <Text style={styles.xpDetailLabel}>{t('home.lastAnswered')}</Text>
                <Text style={styles.xpDetailValue}>{formatTimeAgo(xpStats.lastAnsweredAt)}</Text>
              </View>
              {xpStats.status !== 'safe' && xpStats.status !== 'off' && (
                <>
                  <View style={styles.xpDetailRow}>
                    <Text style={styles.xpDetailLabel}>
                      {xpStats.status === 'grace' ? t('home.decayStartsIn') : t('home.nextDecayIn')}
                    </Text>
                    <Text style={styles.xpDetailValue}>
                      {xpStats.hoursUntilDecay != null ? `${xpStats.hoursUntilDecay}h` : '—'}
                    </Text>
                  </View>
                  <View style={styles.xpDetailRow}>
                    <Text style={styles.xpDetailLabel}>{t('home.dailyLossRate')}</Text>
                    <Text style={styles.xpDetailValue}>{xpStats.decayRate}%</Text>
                  </View>
                </>
              )}
            </View>
            {xpStats.status === 'decaying' && (
              <Text style={styles.decayWarning}>{t('home.stopDecayWarning')}</Text>
            )}
          </Card.Content>
        </Card>
      )}

      {/* Admin Card */}
      {isAdmin && (
        <Card style={[styles.card, styles.adminCard]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>⚙️</Text>
              <Text style={[styles.cardTitle, { color: '#fff' }]}>{t('home.adminDashboard')}</Text>
            </View>
            <Text style={styles.adminDesc}>{t('home.adminDesc')}</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Profile', { screen: 'Admin' })} buttonColor="#fff" textColor="#764ba2" style={styles.adminBtn}>
              {t('home.openDashboard')}
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* Leaderboard Modal */}
      <Modal visible={showLeaderboard} transparent animationType="fade" onRequestClose={() => setShowLeaderboard(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowLeaderboard(false)}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text variant="headlineSmall" style={styles.modalTitle}>{t('home.weeklyLeaderboard')}</Text>
            <Text style={styles.modalSubtitle}>{t('home.leaderboardSubtitle')}</Text>
            {leaderboard.length === 0 ? (
              <Text style={styles.leaderboardEmpty}>{t('home.leaderboardEmpty')}</Text>
            ) : (
              leaderboard.map((entry: any) => (
                <View key={entry.rank} style={[styles.lbEntry, entry.isCurrentUser && styles.lbCurrentUser]}>
                  <Text style={styles.lbRank}>
                    {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                  </Text>
                  <Text style={styles.lbUsername} numberOfLines={1}>
                    {entry.username}{entry.isCurrentUser ? ` ${t('home.you')}` : ''}
                  </Text>
                  <Text style={styles.lbXp}>{entry.weeklyXP} {t('common.xp')}</Text>
                </View>
              ))
            )}
            <Button mode="contained" onPress={() => setShowLeaderboard(false)} style={{ marginTop: 16 }}>
              {t('common.close', 'Close')}
            </Button>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1, backgroundColor: colors.background },
  container: { padding: 16, paddingBottom: 32 },

  // Hero
  heroSection: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  heroTitle: { fontWeight: '700', color: colors.textPrimary, marginBottom: 8 },
  heroSubtitle: { color: colors.textSecondary, fontSize: 15, marginBottom: 16 },
  heroButton: { borderRadius: 8, backgroundColor: colors.primary },
  heroButtonLabel: { fontSize: 16, fontWeight: '600', paddingVertical: 2 },
  guestXpBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff5f0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  guestXpText: { color: colors.primary, fontWeight: '600', fontSize: 14 },

  // Quick Actions
  quickActions: { marginBottom: 16, gap: 8 },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  quickIcon: { fontSize: 28, marginRight: 14 },
  quickTextCol: { flex: 1 },
  quickTitle: { fontWeight: '700', fontSize: 15, color: colors.textPrimary },
  quickDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  quickArrow: { fontSize: 20, color: colors.textMuted, marginLeft: 8 },

  // Card
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 1,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardIcon: { fontSize: 22, marginRight: 8 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, flex: 1 },

  // Streak
  streakDisplay: { alignItems: 'center', marginVertical: 8 },
  streakNumber: { fontSize: 40, fontWeight: '800', color: colors.primary },
  streakLabel: { fontSize: 14, color: colors.textSecondary },
  streakCalendar: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  calDay: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calDayActive: { backgroundColor: '#fff5f0' },
  calDayText: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },

  // Quests
  questItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  questIcon: { fontSize: 20, marginRight: 10, width: 28 },
  questInfo: { flex: 1 },
  questTask: { fontSize: 14, color: colors.textPrimary, marginBottom: 4 },
  questProgress: { height: 6, borderRadius: 3 },
  questClaimed: { fontSize: 18, color: colors.accentGreen, fontWeight: '700', marginLeft: 8 },
  claimButton: {
    backgroundColor: colors.accentGreen,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  claimButtonText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  questCount: { color: colors.textMuted, fontSize: 13, marginLeft: 8 },

  // League
  leagueRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 },
  leagueRank: { alignItems: 'center' },
  leagueBadge: { fontSize: 32 },
  leaguePosition: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  leagueLabel: { fontSize: 12, color: colors.textMuted },
  leagueXp: { alignItems: 'center' },
  leagueXpValue: { fontSize: 22, fontWeight: '800', color: colors.primary },
  leaderboardBtn: { borderRadius: 8, marginTop: 4 },

  // Teaser
  teaserCard: { backgroundColor: '#f0f4ff' },
  teaserContent: { alignItems: 'center' },
  teaserLock: { fontSize: 36, marginBottom: 8 },
  teaserTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  teaserDesc: { textAlign: 'center', color: colors.textSecondary, marginBottom: 12 },
  teaserBtn: { borderRadius: 8, backgroundColor: colors.primary },

  // XP Tracker
  xpStatusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badge_off: { backgroundColor: 'rgba(88, 204, 2, 0.1)' },
  badge_safe: { backgroundColor: 'rgba(88, 204, 2, 0.15)' },
  badge_grace: { backgroundColor: 'rgba(255, 200, 0, 0.15)' },
  badge_decaying: { backgroundColor: 'rgba(255, 75, 75, 0.15)' },
  badgeText_off: { color: '#58cc02' },
  badgeText_safe: { color: '#58cc02' },
  badgeText_grace: { color: '#e6a800' },
  badgeText_decaying: { color: '#ff4b4b' },
  xpStatusText: { fontSize: 11, fontWeight: '600' },
  xpTotal: { alignItems: 'center', marginVertical: 8 },
  xpNumber: { fontSize: 36, fontWeight: '800', color: colors.primary },
  xpLabel: { fontSize: 13, color: colors.textSecondary },
  xpDetails: { gap: 6 },
  xpDetailRow: { flexDirection: 'row', justifyContent: 'space-between' },
  xpDetailLabel: { fontSize: 13, color: colors.textSecondary },
  xpDetailValue: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  decayWarning: {
    marginTop: 8,
    backgroundColor: '#fef2f2',
    color: colors.error,
    padding: 8,
    borderRadius: 6,
    fontSize: 13,
    textAlign: 'center',
  },

  // Admin
  adminCard: { backgroundColor: '#764ba2' },
  adminDesc: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginBottom: 12 },
  adminBtn: { borderRadius: 8 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: { textAlign: 'center', fontWeight: '700', color: colors.textPrimary },
  modalSubtitle: { textAlign: 'center', color: colors.textSecondary, marginBottom: 16 },
  leaderboardEmpty: { textAlign: 'center', color: colors.textMuted, paddingVertical: 20 },
  lbEntry: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  lbCurrentUser: { backgroundColor: '#fff5f0' },
  lbRank: { width: 40, fontSize: 16, fontWeight: '700' },
  lbUsername: { flex: 1, fontSize: 15, color: colors.textPrimary },
  lbXp: { fontSize: 14, fontWeight: '600', color: colors.primary },
});

export default HomeScreen;
