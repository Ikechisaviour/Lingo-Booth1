import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Modal, useWindowDimensions } from 'react-native';
import { Text, Button, Card, ProgressBar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { learningHubService, userService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { getLangName } from '../../config/languages';
import { useAppColors, type AppColors } from '../../config/theme';

const pairGoalOptions = (t: any) => [
  { value: 'travel', label: t('learningHub.goals.travel', 'Travel') },
  { value: 'work', label: t('learningHub.goals.work', 'Work') },
  { value: 'school', label: t('learningHub.goals.school', 'School') },
  { value: 'dailyLife', label: t('learningHub.goals.dailyLife', 'Daily life') },
  { value: 'conversation', label: t('learningHub.goals.conversation', 'Conversation') },
  { value: 'family', label: t('learningHub.goals.family', 'Family') },
  { value: 'religious', label: t('learningHub.goals.religious', 'Religious setting') },
  { value: 'health', label: t('learningHub.goals.health', 'Health') },
  { value: 'culture', label: t('learningHub.goals.culture', 'Culture') },
  { value: 'exam', label: t('learningHub.goals.exam', 'Exam') },
  { value: 'other', label: t('learningHub.goals.other', 'Other') },
];

const goalLabel = (value: string | undefined, options: Array<{ value: string; label: string }>, t: any) => (
  options.find((option) => option.value === value)?.label || t('common.notSet', 'Not set')
);

const HomeScreen: React.FC = () => {
  const colors = useAppColors();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { userId, username, userRole, isGuest, challengeMode, guestXP } = useAuthStore();
  const { nativeLanguage, targetLanguage } = useSettingsStore();
  const isAdmin = userRole === 'admin';

  const [xpStats, setXpStats] = useState<any>(null);
  const [gamification, setGamification] = useState<any>(null);
  const [lastActivity, setLastActivity] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [claimingQuest, setClaimingQuest] = useState<string | null>(null);
  const [learningHub, setLearningHub] = useState<any>(null);
  const [pairProfileForm, setPairProfileForm] = useState({ currentLevel: '', primaryGoal: '', pace: 'steady' });
  const [savingPairProfile, setSavingPairProfile] = useState(false);
  const [pairProfileNotice, setPairProfileNotice] = useState('');
  const [editingPairProfile, setEditingPairProfile] = useState(false);
  const [usingOfflinePack, setUsingOfflinePack] = useState(false);
  const goalOptions = useMemo(() => pairGoalOptions(t), [t]);

  const activeColor = colors.primary;
  const { height: winHeight, width: winWidth } = useWindowDimensions();
  const isCompact = winHeight < 450 || winWidth < 380;
  const styles = useMemo(() => createStyles(colors, isCompact), [colors, isCompact]);
  const xpBadgeStyles = useMemo(() => ({
    off: styles.badge_off,
    safe: styles.badge_safe,
    grace: styles.badge_grace,
    decaying: styles.badge_decaying,
  }), [styles]);
  const xpBadgeTextStyles = useMemo(() => ({
    off: styles.badgeText_off,
    safe: styles.badgeText_safe,
    grace: styles.badgeText_grace,
    decaying: styles.badgeText_decaying,
  }), [styles]);

  const hubCacheKey = `learningHubOverview:${nativeLanguage}:${targetLanguage}`;

  const fetchData = useCallback(async () => {
    if (!userId) return;
    try {
      const [xpRes, gamRes] = await Promise.all([
        userService.getXpStats(userId),
        userService.getGamificationStats(userId),
      ]);
      setXpStats(xpRes.data);
      setGamification(gamRes.data);
    } catch (err: any) {
      if (err?._forcedLogout) return;
    }

    try {
      const actRes = await userService.getActivityState(userId);
      const state = actRes.data;
      const savedQuiz = state.quiz || state.lesson;
      if ((state.activityType === 'quiz' || state.activityType === 'lesson') && savedQuiz) {
        setLastActivity({
          type: 'quiz',
          title: savedQuiz.title || 'Untitled Quiz',
          quizId: savedQuiz._id,
        });
      } else if (state.activityType === 'flashcard' && state.flashcardIndex > 0) {
        setLastActivity({ type: 'flashcard', index: state.flashcardIndex });
      }
    } catch (err: any) {
      if (err?._forcedLogout) return;
    }
    if (!isGuest) {
      try {
        const hubRes = await learningHubService.getOverview();
        setLearningHub(hubRes.data);
        setUsingOfflinePack(false);
        if (hubRes.data?.pairProfile) {
          setPairProfileForm({
            currentLevel: hubRes.data.pairProfile.currentLevel || '',
            primaryGoal: hubRes.data.pairProfile.primaryGoal || '',
            pace: hubRes.data.pairProfile.pace || 'steady',
          });
        }
        await AsyncStorage.setItem(hubCacheKey, JSON.stringify(hubRes.data));
      } catch {
        const cached = await AsyncStorage.getItem(hubCacheKey);
        if (cached) {
          setLearningHub(JSON.parse(cached));
          setUsingOfflinePack(true);
        }
      }
    }
  }, [hubCacheKey, isGuest, userId]);

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

  const isReturningUser = !!userId && (!!learningHub?.nextAction || !!lastActivity || !!xpStats);
  const xpStatus = ['off', 'safe', 'grace', 'decaying'].includes(xpStats?.status)
    ? xpStats.status as keyof typeof xpBadgeStyles
    : 'safe';
  const weekdayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const questTaskLabel = (quest: any) => {
    const defaults: Record<string, string> = {
      xp: 'Earn {{xp}} XP',
      lessons: 'Score {{score}}%+ in {{lessons}} lessons',
      time: 'Study for {{minutes}} minutes',
    };
    return t(`home.quests.${quest.id}`, {
      xp: quest.total || 20,
      score: 80,
      lessons: quest.total || 2,
      minutes: quest.total || 15,
      defaultValue: defaults[quest.id] || quest.task || '',
    });
  };
  const questIcons: Record<string, string> = { xp: '⚡', lessons: '🎯', time: '⏱️' };
  const leagueBadges: Record<string, string> = { bronze: '🥉', silver: '🥈', gold: '🥇', diamond: '💎' };

  const navigateLearningRoute = (routeValue: string | undefined) => {
    const route = String(routeValue || '');
    if (route.startsWith('/class/')) {
      navigation.navigate('Class', { screen: 'ClassLesson', params: { classLessonId: route.split('/').pop() } });
    } else if (route.startsWith('/quiz/')) {
      navigation.navigate('Exercise', {
        screen: 'Quiz',
        params: { screen: 'QuizDetail', params: { quizId: route.split('/').pop() } },
      });
    } else if (route === '/review') {
      navigation.navigate('Exercise', { screen: 'Review' });
    } else if (route === '/conversation') {
      navigation.navigate('Conversation');
    } else if (route === '/writing') {
      navigation.navigate('Exercise', { screen: 'Writing' });
    } else if (route === '/flashcards') {
      navigation.navigate('Exercise', { screen: 'Flashcards' });
    } else if (route === '/progress') {
      navigation.navigate('Progress');
    } else {
      navigation.navigate('Class');
    }
  };

  const nextActionLabel = learningHub?.nextAction
    ? t(learningHub.nextAction.titleKey, {
      count: learningHub.nextAction.count,
      defaultValue: learningHub.nextAction.label || t('learningHub.continueLearning', 'Continue learning'),
    })
    : '';
  const primaryActionLabel = nextActionLabel
    || (lastActivity?.type === 'quiz'
      ? t('home.continueLesson')
      : lastActivity?.type === 'flashcard'
        ? t('home.continueFlashcards')
        : t('learningHub.startGuidedClass', 'Start one guided class'));
  const primaryActionRoute = learningHub?.nextAction?.route
    || (lastActivity?.type === 'quiz' && lastActivity.quizId ? `/quiz/${lastActivity.quizId}` : '')
    || (lastActivity?.type === 'flashcard' ? '/flashcards' : '/class');
  const weeklySummary = learningHub?.weeklySummary || {};
  const weeklyPoints = weeklySummary.points || 0;
  const weeklyActiveDays = weeklySummary.activeDays || 0;
  const weeklySessions = weeklySummary.sessions || 0;
  const weeklySpeakingTurns = weeklySummary.speakingTurns || 0;
  const weeklySavedItems = weeklySummary.newSavedItems || 0;
  const totalReviewCount = learningHub?.reviewQueue?.counts?.total || learningHub?.reviewQueue?.dueSavedItems?.length || 0;
  const recentWords = learningHub?.recentWords || [];
  const firstThreeDays = learningHub?.firstThreeDays || null;
  const goalPath = learningHub?.goalPath || null;
  const repairPlan = learningHub?.repairPlan || null;
  const currentOnboardingStep = firstThreeDays?.steps?.find((step: any) => step.current) || firstThreeDays?.steps?.[0] || null;
  const placement = learningHub?.placement || null;
  const milestones = learningHub?.milestones || {};
  const dailyPlanSecondary = (learningHub?.dailyPlan || [])
    .filter((action: any) => action?.route && action.route !== primaryActionRoute)
    .slice(0, 3);
  const hasStudyHistory = (learningHub?.studyHistory || []).some((day: any) => Number(day.events || 0) > 0);
  const hasDailySpotlight = Boolean(learningHub?.dailySpotlight?.targetText);
  const hasMilestoneProgress = Boolean(
    (milestones.completedClassLessons || 0)
    || (milestones.savedItems || 0)
    || (milestones.certificates?.length || 0),
  );
  const goalPathActions = (goalPath?.actions || [])
    .filter((action: any) => action?.route && action.route !== primaryActionRoute)
    .slice(0, 3);
  const repairPlanActions = (repairPlan?.needed ? repairPlan.actions || [] : [])
    .filter((action: any) => action?.route && action.route !== primaryActionRoute)
    .slice(0, 3);
  const showPlacementPrompt = placement?.status === 'needs_check';
  const showGuidancePanel = Boolean(
    dailyPlanSecondary.length
    || firstThreeDays
    || goalPathActions.length
    || repairPlanActions.length
    || showPlacementPrompt
    || usingOfflinePack,
  );
  const showLearningShelf = recentWords.length > 0 || hasMilestoneProgress;
  const learningSetupSummaryText = t('learningHub.pairSetupFriendlySummary', {
    level: t(`learningHub.levels.${pairProfileForm.currentLevel}`, pairProfileForm.currentLevel || t('common.notSet', 'Not set')),
    goal: goalLabel(pairProfileForm.primaryGoal, goalOptions, t),
    pace: t(`learningHub.paces.${pairProfileForm.pace}`, pairProfileForm.pace || t('common.notSet', 'Not set')),
    defaultValue: '{{level}} level · {{goal}} goal · {{pace}} pace',
  });
  const placementReasonText = (reasonKey?: string) => {
    const defaults: Record<string, string> = {
      'learningHub.placementFromSetup': 'Based on the level you selected for this language pair.',
      'learningHub.placementNeedsCheck': 'A short level check will help place you more accurately.',
      'learningHub.placementFromActivity': 'Based on your recent activity in this language pair.',
    };
    return t(reasonKey || 'learningHub.placementFallback', defaults[reasonKey || ''] || 'Placement will become clearer as you practice.');
  };

  const handleSavePairProfile = async () => {
    if (!pairProfileForm.currentLevel || !pairProfileForm.primaryGoal) return;
    setSavingPairProfile(true);
    try {
      await learningHubService.savePairProfile({
        ...pairProfileForm,
        pace: pairProfileForm.pace || 'steady',
        completedAt: new Date().toISOString(),
      });
      setPairProfileNotice(t('learningHub.pairSetupSaved', 'Learning setup saved.'));
      setEditingPairProfile(false);
      await fetchData();
    } finally {
      setSavingPairProfile(false);
    }
  };

  const profileOptions = {
    currentLevel: ['new', 'beginner', 'intermediate', 'advanced', 'unsure'],
    primaryGoal: goalOptions.map((option) => option.value),
    pace: ['light', 'steady', 'intensive'],
  };

  const actionLabel = (action: any) => t(action.titleKey, {
    count: action.count,
    defaultValue: action.label || action.type,
  });
  const signalCards = [
    {
      key: 'review',
      label: t('learningHub.reviewDue', 'Review due'),
      value: totalReviewCount ? String(totalReviewCount) : t('learningHub.clearValue', 'Clear'),
      detail: totalReviewCount
        ? t('learningHub.reviewSignalDetail', {
          count: totalReviewCount,
          defaultValue: '{{count}} items worth revisiting',
        })
        : t('learningHub.reviewClearDetail', 'Nothing is due right now. Build the queue with one class or saved phrase.'),
      route: '/review',
    },
    {
      key: 'points',
      label: t('learningHub.weeklyPointsSignal', 'Weekly points'),
      value: String(weeklyPoints),
      detail: weeklyPoints
        ? t('learningHub.sessionsCount', {
          count: weeklySessions,
          defaultValue: '{{count}} sessions',
        })
        : t('learningHub.weeklyPointsEmpty', 'Start a short session to begin this week.'),
      route: '/progress',
    },
    {
      key: 'days',
      label: t('learningHub.activeDays', 'Active days'),
      value: `${weeklyActiveDays}/7`,
      detail: t('learningHub.activityThisWeek', 'Activity this week'),
      route: '/progress',
    },
    {
      key: 'voice',
      label: t('learningHub.speakingTurns', 'Speaking turns'),
      value: String(weeklySpeakingTurns),
      detail: weeklySpeakingTurns
        ? t('learningHub.savedItemsThisWeek', {
          count: weeklySavedItems,
          defaultValue: '{{count}} saved this week',
        })
        : t('learningHub.speakingTurnsEmpty', 'Try one short conversation when you are ready.'),
      route: '/conversation',
    },
  ];
  const informativeSignalCards = signalCards.filter((signal) => {
    if (signal.key === 'review') return totalReviewCount > 0;
    if (signal.key === 'points') return weeklyPoints > 0;
    if (signal.key === 'days') return weeklyActiveDays > 0;
    if (signal.key === 'voice') return weeklySpeakingTurns > 0;
    return false;
  });
  const showLearningAnalytics = Boolean(
    informativeSignalCards.length
    || hasDailySpotlight
    || hasStudyHistory,
  );
  const onboardingStepTitle = (titleKey?: string) => {
    if (titleKey === 'learningHub.firstThreeDayReviewTitle') {
      return t('learningHub.firstThreeDayReviewTitle', 'Review what you met');
    }
    if (titleKey === 'learningHub.firstThreeDaySpeakTitle') {
      return t('learningHub.firstThreeDaySpeakTitle', 'Use it out loud');
    }
    return t('learningHub.firstThreeDayLearnTitle', 'Start one guided lesson');
  };
  const onboardingStepBody = (bodyKey?: string) => {
    if (bodyKey === 'learningHub.firstThreeDayReviewBody') {
      return t('learningHub.firstThreeDayReviewBody', 'Return once to what you saw yesterday so the first items start to stick.');
    }
    if (bodyKey === 'learningHub.firstThreeDaySpeakBody') {
      return t('learningHub.firstThreeDaySpeakBody', 'Use a short speaking turn so the language leaves the page early.');
    }
    return t('learningHub.firstThreeDayLearnBody', 'Begin with one small guided lesson so the pair has a clear starting point.');
  };

  const showDecayBanner = !!xpStats && (xpStats.status === 'decaying' || xpStats.status === 'grace');

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: activeColor }]}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#fff']} tintColor="#fff" />
      }
    >
      {showDecayBanner && (
        <TouchableOpacity
          style={[styles.decayBanner, xpStats.status === 'decaying' && styles.decayBannerDanger]}
          onPress={() => navigation.navigate('Profile')}
          accessibilityLabel={t('home.xpTracker')}
        >
          <Text style={styles.decayBannerIcon}>{xpStats.status === 'decaying' ? '📉' : '⏳'}</Text>
          <Text style={styles.decayBannerText}>
            {xpStats.status === 'decaying'
              ? t('home.decayBannerActive', { rate: xpStats.decayRate, defaultValue: 'XP is decaying — daily loss {{rate}}%. Answer a question to stop it.' })
              : t('home.decayBannerGrace', { hours: xpStats.hoursUntilDecay ?? 0, rate: xpStats.decayRate, defaultValue: 'XP decay starts in {{hours}}h — daily loss {{rate}}%. Keep studying to prevent it.' })}
          </Text>
          <Text style={styles.decayBannerCta}>{t('home.xpTracker')} →</Text>
        </TouchableOpacity>
      )}
      {/* Hero Section — colored background */}
      <View style={[styles.heroSection, { paddingTop: insets.top + (isCompact ? 4 : 16) }]}>
        {isReturningUser ? (
          <>
            <Text variant="headlineSmall" style={styles.heroTitle}>
              {username ? t('home.welcomeBack', { username }) : t('home.welcomeBackNoName')}
            </Text>
            <Text style={styles.heroSubtitle}>
              {learningHub?.nextAction
                ? nextActionLabel
                : lastActivity
                  ? lastActivity.type === 'quiz'
                    ? t('home.studyingLesson', { title: lastActivity.title })
                    : t('home.studyingFlashcards')
                  : t('home.readyForSession')}
            </Text>
            <Button
              mode="contained"
              onPress={() => navigateLearningRoute(primaryActionRoute)}
              buttonColor="rgba(255,255,255,0.95)"
              textColor={activeColor}
              style={styles.heroButton}
              labelStyle={styles.heroButtonLabel}
            >
              {primaryActionLabel} →
            </Button>
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
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Exercise', { screen: 'Quiz' })}
              buttonColor="rgba(255,255,255,0.95)"
              textColor={activeColor}
              style={styles.heroButton}
              labelStyle={styles.heroButtonLabel}
            >
              {isGuest ? t('home.startLearning') : t('home.getStartedFree')}
            </Button>
          </>
        )}
      </View>

      {/* Main content area — rounded top sheet */}
      <View style={styles.mainContent}>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.quickAction, { borderLeftColor: colors.accentBlue }]}
            onPress={() => navigation.navigate('Class')}
            activeOpacity={0.7}
          >
            <Text style={styles.quickIcon}>🏫</Text>
            <View style={styles.quickTextCol}>
              <Text style={styles.quickTitle}>{t('navbar.class', 'Class')}</Text>
              <Text style={styles.quickDesc}>{t('home.classDesc', 'Guided tutor lessons')}</Text>
            </View>
            <Text style={styles.quickArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickAction, { borderLeftColor: colors.primary }]}
            onPress={() => navigation.navigate('Exercise')}
            activeOpacity={0.7}
          >
            <Text style={styles.quickIcon}>✍</Text>
            <View style={styles.quickTextCol}>
              <Text style={styles.quickTitle}>{t('navbar.exercise', 'Exercise')}</Text>
              <Text style={styles.quickDesc}>{t('home.exerciseDesc', 'Quiz and flashcards')}</Text>
            </View>
            <Text style={styles.quickArrow}>›</Text>
          </TouchableOpacity>

          {!isGuest && (
            <TouchableOpacity
              style={[styles.quickAction, { borderLeftColor: colors.accentGreen }]}
              onPress={() => navigation.navigate('Progress')}
              activeOpacity={0.7}
            >
              <Text style={styles.quickIcon}>📊</Text>
              <View style={styles.quickTextCol}>
                <Text style={styles.quickTitle}>{t('home.progressAction')}</Text>
                <Text style={styles.quickDesc}>{t('home.progressDesc')}</Text>
              </View>
              <Text style={styles.quickArrow}>›</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.quickAction, { borderLeftColor: colors.warning }]}
            onPress={() => navigation.navigate('Contact')}
            activeOpacity={0.7}
          >
            <Text style={styles.quickIcon}>💬</Text>
            <View style={styles.quickTextCol}>
              <Text style={styles.quickTitle}>{t('contact.navLabel', 'Contact')}</Text>
              <Text style={styles.quickDesc}>{t('home.contactDesc', 'Questions, feedback, or a problem to report')}</Text>
            </View>
            <Text style={styles.quickArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {!isGuest && learningHub && showLearningAnalytics && (
          <Card style={styles.analyticsPanel}>
            <Card.Content style={styles.analyticsContent}>
              <View style={styles.analyticsHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.analyticsKicker}>{t('learningHub.analyticsKicker', 'Learning signals')}</Text>
                  <Text style={styles.analyticsTitle}>{t('learningHub.analyticsTitle', 'Your learning picture')}</Text>
                  <Text style={styles.analyticsSubtitle}>
                    {t('learningHub.analyticsSubtitle', 'A quick read on what to do next, what needs review, and how your week is moving.')}
                  </Text>
                </View>
                <Button mode="outlined" compact onPress={() => navigation.navigate('Progress')}>
                  {t('learningHub.viewFullProgress', 'View full progress')}
                </Button>
              </View>

              {(informativeSignalCards.length > 0 || gamification || xpStats) && (
              <View style={styles.signalGrid}>
                {informativeSignalCards.map((signal) => (
                  <TouchableOpacity key={signal.key} style={styles.signalCard} onPress={() => navigateLearningRoute(signal.route)}>
                    <Text style={styles.learningLabel}>{signal.label}</Text>
                    <Text style={styles.signalValue}>{signal.value}</Text>
                    <Text style={styles.learningMeta}>{signal.detail}</Text>
                  </TouchableOpacity>
                ))}
                {/* Day Streak and Total XP previously lived in standalone
                    cards lower on the scroll. Merging them into Learning
                    Signals keeps all dashboard telemetry in one grouped
                    card and matches the web layout. */}
                {gamification?.challengeMode && gamification.streak && (
                  <TouchableOpacity
                    key="streak"
                    style={styles.signalCard}
                    onPress={() => navigation.navigate('Profile')}
                  >
                    <Text style={styles.learningLabel}>{t('home.dayStreak')}</Text>
                    <Text style={styles.signalValue}>{gamification.streak.current}</Text>
                    <View style={styles.streakMiniCalendar}>
                      {weekdayKeys.map((dayKey, i) => (
                        <View
                          key={dayKey}
                          style={[
                            styles.streakMiniDay,
                            gamification.streak.history?.[i] && styles.streakMiniDayActive,
                          ]}
                        >
                          <Text style={styles.streakMiniDayText}>
                            {gamification.streak.history?.[i]
                              ? '🔥'
                              : t(`home.weekdays.${dayKey}`, dayKey.slice(0, 1).toUpperCase())}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </TouchableOpacity>
                )}
                {xpStats && (
                  <TouchableOpacity
                    key="totalXp"
                    style={[
                      styles.signalCard,
                      xpStats.status === 'grace' && styles.signalCardWarn,
                      xpStats.status === 'decaying' && styles.signalCardDanger,
                    ]}
                    onPress={() => navigation.navigate('Profile')}
                  >
                    <Text style={styles.learningLabel}>{t('home.totalXP')}</Text>
                    <Text style={styles.signalValue}>{xpStats.totalXP}</Text>
                    <Text style={styles.learningMeta}>
                      {xpStats.status === 'off' ? t('home.relaxed') : t('home.intense')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              )}

              {hasDailySpotlight && (
              <View style={styles.spotlightCard}>
                <Text style={styles.learningLabel}>{t('learningHub.wordOfDay', 'Word or phrase of the day')}</Text>
                <Text style={styles.learningValue}>{learningHub.dailySpotlight.targetText}</Text>
                {!!learningHub.dailySpotlight.nativeText && <Text style={styles.learningMeta}>{learningHub.dailySpotlight.nativeText}</Text>}
              </View>
              )}

              {hasStudyHistory && (
              <View style={styles.spotlightCard}>
                <Text style={styles.learningLabel}>{t('learningHub.recentStudyTitle', 'Recent study')}</Text>
                <View style={styles.studyHistoryStrip}>
                  {(learningHub.studyHistory || []).slice(-7).map((day: any) => (
                    <View key={day.day} style={styles.studyDay}>
                      <Text style={styles.studyEvents}>{day.events}</Text>
                      <Text style={styles.studyDate}>{day.day.slice(5)}</Text>
                    </View>
                  ))}
                </View>
              </View>
              )}
            </Card.Content>
          </Card>
        )}

        {!isGuest && learningHub && learningHub.pairProfile?.completedAt && !editingPairProfile && (
          <Card style={styles.card}>
            <Card.Content style={styles.pairSummaryContent}>
              <View style={styles.pairSummaryText}>
                <Text style={styles.cardTitle}>{t('learningHub.pairSetupSummary', 'Learning setup')}</Text>
                <Text style={styles.pairSetupBody}>{learningSetupSummaryText}</Text>
              </View>
              <Button mode="outlined" compact onPress={() => setEditingPairProfile(true)}>
                {t('learningHub.pairSetupEdit', 'Edit')}
              </Button>
              <Button mode="outlined" compact onPress={() => navigation.navigate('LevelTests')}>
                {t('levelTests.kicker', 'Level checks')}
              </Button>
            </Card.Content>
          </Card>
        )}

        {!isGuest && learningHub && (!learningHub.pairProfile?.completedAt || editingPairProfile) && (
          <Card style={styles.card}>
            <Card.Content style={styles.pairSetupContent}>
              <Text style={styles.cardTitle}>
                {learningHub.pairProfile?.completedAt
                  ? t('learningHub.pairSetupUpdate', 'Update this language pair')
                  : t('learningHub.pairSetupTitle', 'Set up this language pair')}
              </Text>
              <Text style={styles.pairSetupBody}>{t('learningHub.pairSetupBody', 'Tell us your level and goal once so recommendations fit this target language.')}</Text>
              {([
                ['currentLevel', t('learningHub.level', 'Level'), 'learningHub.levels'],
                ['primaryGoal', t('learningHub.goal', 'Goal'), 'learningHub.goals'],
                ...(learningHub.pairProfile?.completedAt
                  ? [['pace', t('learningHub.pace', 'Pace'), 'learningHub.paces'] as const]
                  : []),
              ] as const).map(([field, label, keyRoot]) => (
                <View key={field} style={styles.optionGroup}>
                  <Text style={styles.optionLabel}>{label}</Text>
                  <View style={styles.optionRow}>
                    {profileOptions[field].map((value) => (
                      <TouchableOpacity
                        key={value}
                        style={[
                          styles.optionChip,
                          pairProfileForm[field] === value && styles.optionChipActive,
                        ]}
                        onPress={() => setPairProfileForm((current) => ({ ...current, [field]: value }))}
                      >
                        <Text style={[
                          styles.optionChipText,
                          pairProfileForm[field] === value && styles.optionChipTextActive,
                        ]}>
                          {field === 'primaryGoal'
                            ? goalLabel(value, goalOptions, t)
                            : t(`${keyRoot}.${value}`, value)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
              <Button mode="contained" onPress={handleSavePairProfile} disabled={savingPairProfile}>
                {savingPairProfile ? t('common.saving', 'Saving...') : t('common.save', 'Save')}
              </Button>
              {!!learningHub.pairProfile?.completedAt && (
                <Button mode="outlined" onPress={() => setEditingPairProfile(false)}>
                  {t('common.cancel', 'Cancel')}
                </Button>
              )}
              {!!pairProfileNotice && <Text style={styles.pairSetupNotice}>{pairProfileNotice}</Text>}
            </Card.Content>
          </Card>
        )}

        {!isGuest && learningHub && (
          <>
            {dailyPlanSecondary.length > 0 && (
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardIcon}>🧭</Text>
                  <Text style={styles.cardTitle}>{t('learningHub.secondaryStepsTitle', 'After the main step')}</Text>
                </View>
                <View style={styles.planList}>
                  {dailyPlanSecondary.length ? dailyPlanSecondary.map((action: any, index: number) => (
                    <TouchableOpacity
                      key={`${action.type}-${index}`}
                      style={styles.planRow}
                      onPress={() => navigateLearningRoute(action.route)}
                    >
                      <View style={styles.planText}>
                        <Text style={styles.planTitle}>{actionLabel(action)}</Text>
                        {!!action.label && <Text style={styles.planMeta}>{action.label}</Text>}
                      </View>
                      <Text style={styles.quickArrow}>›</Text>
                    </TouchableOpacity>
                  )) : (
                    <Text style={styles.learningMeta}>{t('learningHub.secondaryStepsEmpty', 'One focused action is enough for now. Finish it, then the next step will appear here.')}</Text>
                  )}
                </View>
              </Card.Content>
            </Card>
            )}

            {showGuidancePanel && (
            <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardIcon}>🧭</Text>
                    <Text style={styles.cardTitle}>{t('learningHub.guidanceTitle', 'Guidance')}</Text>
                  </View>
                  {!!firstThreeDays && (
                    <View style={styles.guidanceBlock}>
                      <View style={styles.guidanceRow}>
                        <Text style={styles.guidanceTitle}>{t('learningHub.firstThreeDays', 'First three days')}</Text>
                        <Text style={styles.guidanceMeta}>{t('learningHub.dayNumber', { day: firstThreeDays.day, defaultValue: 'Day {{day}}' })}</Text>
                      </View>
                      {!!currentOnboardingStep && (
                        <Text style={styles.guidanceMeta}>{onboardingStepBody(currentOnboardingStep.bodyKey)}</Text>
                      )}
                      <View style={styles.onboardingStepRow}>
                        {(firstThreeDays.steps || []).map((step: any) => (
                          <TouchableOpacity
                            key={step.day}
                            style={[
                              styles.onboardingStep,
                              step.current && styles.onboardingStepCurrent,
                              step.completed && styles.onboardingStepDone,
                            ]}
                            onPress={() => navigateLearningRoute(step.action?.route)}
                          >
                            <Text style={styles.onboardingStepDay}>{t('learningHub.dayNumber', { day: step.day, defaultValue: 'Day {{day}}' })}</Text>
                            <Text style={styles.onboardingStepTitle}>{onboardingStepTitle(step.titleKey)}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}
                  {!!goalPath && goalPathActions.length > 0 && (
                    <View style={styles.guidanceBlock}>
                      <View style={styles.guidanceRow}>
                        <Text style={styles.guidanceTitle}>{t('learningHub.goalPathTitle', 'Goal path')}</Text>
                        <Text style={styles.guidanceMeta}>{goalLabel(goalPath.goal, goalOptions, t)}</Text>
                      </View>
                      <View style={styles.goalActionRow}>
                        {goalPathActions.map((action: any, index: number) => (
                          <Button
                            key={`${action.type}-${index}`}
                            compact
                            mode="outlined"
                            onPress={() => navigateLearningRoute(action.route)}
                          >
                            {actionLabel(action)}
                          </Button>
                        ))}
                      </View>
                    </View>
                  )}
                  {repairPlanActions.length > 0 && (
                    <View style={[styles.guidanceBlock, styles.guidanceBlockPrimary]}>
                      <View style={styles.guidanceRowCompact}>
                        <Text style={styles.guidanceTitle}>{t('learningHub.repairPlanTitle', 'Repair focus')}</Text>
                        <Text style={styles.guidanceMeta}>{t('learningHub.repairPlanValue', 'Worth revisiting')}</Text>
                      </View>
                      <Text style={styles.guidanceMeta}>
                        {t('learningHub.repairPlanBody', 'A few weak or checkpoint items are ready for focused practice before you move too far ahead.')}
                      </Text>
                      <View style={styles.goalActionRow}>
                        {repairPlanActions.map((action: any, index: number) => (
                          <Button
                            key={`${action.type}-${index}`}
                            compact
                            mode="outlined"
                            onPress={() => navigateLearningRoute(action.route)}
                          >
                            {actionLabel(action)}
                          </Button>
                        ))}
                      </View>
                    </View>
                  )}
                  {showPlacementPrompt && (
                    <View style={styles.guidanceRow}>
                      <Text style={styles.guidanceTitle}>{t('learningHub.placementTitle', 'Placement')}</Text>
                      <Text style={styles.guidanceMeta}>{String(t(`learningHub.levels.${placement.level}`, placement.level))}</Text>
                      <Text style={styles.guidanceMeta}>{placementReasonText(placement.reasonKey)}</Text>
                      {placement.status === 'needs_check' && (
                        <Button mode="outlined" compact onPress={() => navigation.navigate('LevelCheck')}>
                          {t('learningHub.startLevelCheck', 'Start level check')}
                        </Button>
                      )}
                    </View>
                  )}
                  {usingOfflinePack && (
                  <View style={styles.guidanceRow}>
                    <Text style={styles.guidanceTitle}>
                      {t(usingOfflinePack ? 'learningHub.offlinePackInUseTitle' : 'learningHub.offlineReadyTitle', usingOfflinePack ? 'Recent pack in use' : 'Recent pack ready')}
                    </Text>
                    <Text style={styles.guidanceMeta}>
                      {t(
                        usingOfflinePack ? 'learningHub.offlinePackInUseBody' : 'learningHub.offlineReadyBody',
                        usingOfflinePack
                          ? 'Showing recently prepared material until the connection comes back.'
                          : 'Recent useful material is kept nearby for a weaker connection.',
                      )}
                    </Text>
                  </View>
                  )}
                </Card.Content>
              </Card>
            )}

            {showLearningShelf && recentWords.length > 0 && (
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardIcon}>🗂</Text>
                  <Text style={styles.cardTitle}>{t('learningHub.recentWordsTitle', 'Recent words')}</Text>
                </View>
                {recentWords.slice(0, 5).map((item: any) => (
                  <TouchableOpacity key={`${item.targetText}-${item.occurredAt || ''}`} style={styles.recentWordRow} onPress={() => navigation.navigate('Exercise', { screen: 'Review' })}>
                    <Text style={styles.planTitle}>{item.targetText}</Text>
                    {!!item.nativeText && <Text style={styles.planMeta}>{item.nativeText}</Text>}
                  </TouchableOpacity>
                ))}
              </Card.Content>
            </Card>
            )}

            {showLearningShelf && hasMilestoneProgress && (
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardIcon}>🏅</Text>
                  <Text style={styles.cardTitle}>{t('learningHub.milestonesTitle', 'Milestones')}</Text>
                </View>
                <View style={styles.milestoneRows}>
                  <View style={styles.xpDetailRow}>
                    <Text style={styles.xpDetailLabel}>{t('learningHub.completedLessons', 'Completed lessons')}</Text>
                    <Text style={styles.xpDetailValue}>{milestones.completedClassLessons || 0}</Text>
                  </View>
                  <View style={styles.xpDetailRow}>
                    <Text style={styles.xpDetailLabel}>{t('learningHub.savedItems', 'Saved items')}</Text>
                    <Text style={styles.xpDetailValue}>{milestones.savedItems || 0}</Text>
                  </View>
                  <View style={styles.xpDetailRow}>
                    <Text style={styles.xpDetailLabel}>{t('learningHub.certificates', 'Certificates')}</Text>
                    <Text style={styles.xpDetailValue}>{milestones.certificates?.length || 0}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
            )}

          </>
        )}

        {/* Gamification Cards — Challenge Mode */}
        {gamification?.challengeMode && (
          <>
            {/* Streak card moved into Learning Signals as a tile. */}

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
                      <Text style={styles.questTask}>{questTaskLabel(quest)}</Text>
                      <ProgressBar
                        progress={quest.total > 0 ? quest.progress / quest.total : 0}
                        color={quest.completed ? colors.accentGreen : activeColor}
                        style={styles.questProgress}
                      />
                    </View>
                    {quest.claimed ? (
                      <Text style={styles.questClaimed}>✓</Text>
                    ) : quest.completed ? (
                      <TouchableOpacity
                        style={[styles.claimButton, { backgroundColor: colors.accentGreen }]}
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
                    <Text style={[styles.leagueXpValue, { color: activeColor }]}>{gamification.league.weeklyXP} {t('common.xp')}</Text>
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
              <Button mode="contained" onPress={() => navigation.navigate('Profile')} style={[styles.teaserBtn, { backgroundColor: activeColor }]}>
                {t('home.enableChallengeMode')}
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* XP Tracker card moved into Learning Signals as a tile + a
            decay-warning banner above the welcome card. */}

        {/* Admin Card */}
        {false && isAdmin && (
          <Card style={[styles.card, styles.adminCard]}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>⚙️</Text>
                <Text style={styles.cardTitle}>{t('home.adminDashboard')}</Text>
              </View>
              <Text style={styles.adminDesc}>{t('home.adminDesc')}</Text>
              <Button mode="outlined" onPress={() => navigation.navigate('Profile', { screen: 'Admin' })} style={styles.adminBtn}>
                {t('home.openDashboard')}
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>

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
                  <Text style={[styles.lbXp, { color: activeColor }]}>{entry.weeklyXP} {t('common.xp')}</Text>
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

const createStyles = (colors: AppColors, isCompact = false) => StyleSheet.create({
  scrollView: { flex: 1 },
  container: { paddingBottom: isCompact ? 12 : 32 },

  // Hero
  heroSection: {
    paddingHorizontal: isCompact ? 12 : 20,
    paddingBottom: isCompact ? 12 : 28,
  },
  heroTitle: { fontWeight: '700', color: '#fff', marginBottom: 8 },
  heroSubtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 15, marginBottom: 16 },
  heroButton: { borderRadius: 10, alignSelf: 'flex-start' },
  heroButtonLabel: { fontSize: 15, fontWeight: '700', paddingVertical: 2 },
  guestXpBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  guestXpText: { color: '#fff', fontWeight: '600', fontSize: 14 },

  // Main content sheet
  mainContent: {
    backgroundColor: '#faf7f2',
    borderTopLeftRadius: isCompact ? 16 : 24,
    borderTopRightRadius: isCompact ? 16 : 24,
    padding: isCompact ? 10 : 16,
  },

  // Quick Actions
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12, gap: 10 },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: isCompact ? 12 : 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 0,
    flexGrow: 1,
    flexBasis: isCompact ? '100%' : '48%',
  },
  quickIcon: { fontSize: 22, marginRight: 12 },
  quickTextCol: { flex: 1 },
  quickTitle: { fontWeight: '700', fontSize: 15, color: colors.textPrimary },
  quickDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  quickArrow: { fontSize: 22, color: colors.textMuted, fontWeight: '300', marginLeft: 8 },
  analyticsPanel: {
    backgroundColor: colors.surface,
    borderRadius: isCompact ? 14 : 20,
    marginBottom: isCompact ? 8 : 12,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 1,
  },
  analyticsContent: { gap: isCompact ? 10 : 14 },
  analyticsHeader: {
    flexDirection: isCompact ? 'column' : 'row',
    alignItems: isCompact ? 'stretch' : 'flex-start',
    gap: 10,
  },
  analyticsKicker: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  analyticsTitle: {
    color: colors.textPrimary,
    fontSize: isCompact ? 18 : 20,
    fontWeight: '900',
    marginTop: 2,
  },
  analyticsSubtitle: {
    color: colors.textSecondary,
    lineHeight: isCompact ? 18 : 20,
    marginTop: 2,
  },
  focusCard: {
    gap: 6,
    padding: isCompact ? 12 : 14,
    borderRadius: isCompact ? 12 : 16,
    backgroundColor: colors.primary + '10',
    borderWidth: 1,
    borderColor: colors.primary + '26',
  },
  focusButton: { alignSelf: 'flex-start', marginTop: 4 },
  signalGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  signalCard: {
    flexGrow: 1,
    flexBasis: isCompact ? '100%' : '48%',
    minHeight: isCompact ? 82 : 96,
    gap: 5,
    padding: isCompact ? 10 : 12,
    borderRadius: isCompact ? 10 : 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
  },
  signalCardWarn: {
    borderColor: '#f59e0b',
  },
  signalCardDanger: {
    borderColor: '#ef4444',
  },
  signalValue: {
    color: colors.textPrimary,
    fontSize: isCompact ? 22 : 26,
    fontWeight: '900',
  },
  streakMiniCalendar: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 2,
  },
  streakMiniDay: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakMiniDayActive: {
    backgroundColor: 'transparent',
  },
  streakMiniDayText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
  },
  decayBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    margin: 12,
    marginBottom: 0,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f59e0b',
    backgroundColor: '#fff7ed',
  },
  decayBannerDanger: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  decayBannerIcon: {
    fontSize: 16,
  },
  decayBannerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  decayBannerCta: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  spotlightCard: {
    gap: 5,
    padding: isCompact ? 10 : 12,
    borderRadius: isCompact ? 10 : 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
  },
  inlineAction: { alignSelf: 'flex-start', marginTop: 4 },
  emptyActionBlock: { gap: 8 },
  learningOverview: { gap: 8, marginBottom: 12 },
  learningCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    elevation: 1,
  },
  learningLabel: { color: colors.textSecondary, fontSize: 12, fontWeight: '700' },
  learningValue: { color: colors.textPrimary, fontSize: 17, fontWeight: '800', marginTop: 4 },
  learningMeta: { color: colors.textMuted, marginTop: 4 },
  pairSetupContent: { gap: 12 },
  pairSummaryContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  pairSummaryText: { flex: 1, gap: 4 },
  pairSetupBody: { color: colors.textSecondary, lineHeight: 20 },
  optionGroup: { gap: 7 },
  optionLabel: { color: colors.textPrimary, fontWeight: '800' },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  optionChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '18',
  },
  optionChipText: { color: colors.textSecondary, fontWeight: '700' },
  optionChipTextActive: { color: colors.primary },
  pairSetupNotice: { color: colors.primary, fontWeight: '700' },
  planList: { gap: 8 },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  planText: { flex: 1 },
  planTitle: { color: colors.textPrimary, fontWeight: '800' },
  planMeta: { color: colors.textMuted, marginTop: 2 },
  learningSummaryGrid: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  summaryCard: { flex: 1, backgroundColor: '#fff', borderRadius: 14, elevation: 1 },
  summaryValue: { color: colors.textPrimary, fontSize: 24, fontWeight: '900', marginTop: 4 },
  guidanceRow: {
    gap: 2,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  guidanceRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  guidanceBlock: {
    gap: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  guidanceBlockPrimary: {
    padding: 12,
    borderTopWidth: 0,
    borderRadius: 12,
    backgroundColor: colors.primary + '12',
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  guidanceTitle: { color: colors.textPrimary, fontWeight: '800' },
  guidanceMeta: { color: colors.textSecondary },
  onboardingStepRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  onboardingStep: {
    minWidth: 118,
    flexGrow: 1,
    flexBasis: '30%',
    gap: 3,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  onboardingStepCurrent: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '16',
  },
  onboardingStepDone: {
    borderColor: colors.primary + '66',
  },
  onboardingStepDay: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  onboardingStepTitle: { color: colors.textPrimary, fontWeight: '800' },
  goalActionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  recentWordRow: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  studyHistoryStrip: { flexDirection: 'row', gap: 8 },
  studyDay: {
    flex: 1,
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  studyEvents: { color: colors.textPrimary, fontWeight: '900' },
  studyDate: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  milestoneRows: { gap: 8 },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardIcon: { fontSize: 22, marginRight: 8 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, flex: 1 },

  // Streak
  streakDisplay: { alignItems: 'center', marginVertical: 8 },
  streakNumber: { fontSize: isCompact ? 26 : 34, fontWeight: '800' },
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
  calDayText: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },

  // Quests
  questItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  questIcon: { fontSize: 20, marginRight: 10, width: 28 },
  questInfo: { flex: 1 },
  questTask: { fontSize: 14, color: colors.textPrimary, marginBottom: 4 },
  questProgress: { height: 6, borderRadius: 3 },
  questClaimed: { fontSize: 18, color: colors.accentGreen, fontWeight: '700', marginLeft: 8 },
  claimButton: {
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
  leagueXpValue: { fontSize: 22, fontWeight: '800' },
  leaderboardBtn: { borderRadius: 8, marginTop: 4 },

  // Teaser
  teaserCard: { backgroundColor: '#f0f4ff' },
  teaserContent: { alignItems: 'center' },
  teaserLock: { fontSize: 36, marginBottom: 8 },
  teaserTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  teaserDesc: { textAlign: 'center', color: colors.textSecondary, marginBottom: 12 },
  teaserBtn: { borderRadius: 8 },

  // XP Tracker
  xpStatusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badge_off: { backgroundColor: 'rgba(88, 204, 2, 0.1)' },
  badge_safe: { backgroundColor: 'rgba(88, 204, 2, 0.15)' },
  badge_grace: { backgroundColor: 'rgba(255, 200, 0, 0.15)' },
  badge_decaying: { backgroundColor: '#fff1f0' },
  badgeText_off: { color: colors.accentGreen, fontSize: 11, fontWeight: '600' },
  badgeText_safe: { color: colors.accentGreen, fontSize: 11, fontWeight: '600' },
  badgeText_grace: { color: '#e6a800', fontSize: 11, fontWeight: '600' },
  badgeText_decaying: { color: '#b42318', fontSize: 11, fontWeight: '600' },
  xpStatusText: { fontSize: 11, fontWeight: '600' },
  xpTotal: { alignItems: 'center', marginVertical: 8 },
  xpNumber: { fontSize: isCompact ? 24 : 32, fontWeight: '800' },
  xpLabel: { fontSize: 13, color: colors.textSecondary },
  xpDetails: { gap: 6 },
  xpDetailRow: { flexDirection: 'row', justifyContent: 'space-between' },
  xpDetailLabel: { fontSize: 13, color: colors.textSecondary },
  xpDetailValue: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  decayWarning: {
    marginTop: 8,
    backgroundColor: '#fff1f0',
    color: '#b42318',
    padding: 10,
    borderRadius: 8,
    fontSize: 13,
    textAlign: 'center',
  },

  // Admin
  adminCard: { backgroundColor: '#fff' },
  adminDesc: { color: colors.textSecondary, fontSize: 14, marginBottom: 12, lineHeight: 20 },
  adminBtn: { borderRadius: 8 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: { textAlign: 'center', fontWeight: '700', color: colors.textPrimary },
  modalSubtitle: { textAlign: 'center', color: colors.textSecondary, marginBottom: 16 },
  leaderboardEmpty: { textAlign: 'center', color: colors.textMuted, paddingVertical: 20 },
  lbEntry: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  lbCurrentUser: { backgroundColor: '#fff5f0', borderRadius: 8 },
  lbRank: { width: 40, fontSize: 16, fontWeight: '700' },
  lbUsername: { flex: 1, fontSize: 15, color: colors.textPrimary },
  lbXp: { fontSize: 14, fontWeight: '700' },
});

export default HomeScreen;
