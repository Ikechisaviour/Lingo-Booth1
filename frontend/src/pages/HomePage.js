import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { learningHubService, userService, quizService } from '../services/api';
import { getTargetLangName, getTargetLangCode } from '../config/languages';
import { useCurriculumVersion } from '../hooks/useCurriculumVersion';
import { FaAndroid } from 'react-icons/fa';
import { ANDROID_APK_URL, ANDROID_APK_FILENAME } from '../config/appDownload';
import './HomePage.css';

const ANDROID_BANNER_DISMISS_KEY = 'androidAppBannerDismissed';

function pairGoalOptions(t) {
  return [
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
}

function goalLabel(value, options, t) {
  return options.find((option) => option.value === value)?.label || t('common.notSet', 'Not set');
}

function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const isAdmin = userRole === 'admin';
  const isGuest = localStorage.getItem('guestMode') === 'true';
  const { isV2: onV2Curriculum } = useCurriculumVersion();
  const [xpStats, setXpStats] = useState(null);
  const [gamification, setGamification] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [claimingQuest, setClaimingQuest] = useState(null);
  const [lastActivity, setLastActivity] = useState(null);
  const [learningHub, setLearningHub] = useState(null);
  const [pairProfileForm, setPairProfileForm] = useState({ currentLevel: '', primaryGoal: '', pace: 'steady' });
  const [savingPairProfile, setSavingPairProfile] = useState(false);
  const [pairProfileNotice, setPairProfileNotice] = useState('');
  const [editingPairProfile, setEditingPairProfile] = useState(false);
  const [usingOfflinePack, setUsingOfflinePack] = useState(false);
  const [showAndroidBanner, setShowAndroidBanner] = useState(
    () => localStorage.getItem(ANDROID_BANNER_DISMISS_KEY) !== 'true'
  );
  const goalOptions = pairGoalOptions(t);

  const dismissAndroidBanner = () => {
    localStorage.setItem(ANDROID_BANNER_DISMISS_KEY, 'true');
    setShowAndroidBanner(false);
  };

  const fetchXpStats = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await userService.getXpStats(userId);
      setXpStats(res.data);
    } catch (err) {
      console.error('Failed to fetch XP stats:', err);
    }
  }, [userId]);

  const fetchGamification = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await userService.getGamificationStats(userId);
      setGamification(res.data);
    } catch (err) {
      console.error('Failed to fetch gamification stats:', err);
    }
  }, [userId]);

  const learningHubCacheKey = () => `learningHubOverview:${localStorage.getItem('nativeLanguage') || ''}:${localStorage.getItem('targetLanguage') || ''}`;

  const fetchLearningHub = useCallback(async () => {
    if (!userId || isGuest) return;
    try {
      const res = await learningHubService.getOverview();
      setLearningHub(res.data);
      setUsingOfflinePack(false);
      localStorage.setItem(learningHubCacheKey(), JSON.stringify(res.data));
      if (res.data?.pairProfile) {
        setPairProfileForm({
          currentLevel: res.data.pairProfile.currentLevel || '',
          primaryGoal: res.data.pairProfile.primaryGoal || '',
          pace: res.data.pairProfile.pace || '',
        });
      }
    } catch (_) {
      try {
        const cached = JSON.parse(localStorage.getItem(learningHubCacheKey()) || 'null');
        if (cached) {
          setLearningHub(cached);
          setUsingOfflinePack(true);
        }
      } catch (_) {}
    }
  }, [isGuest, userId]);

  useEffect(() => {
    fetchXpStats();
    fetchGamification();
    fetchLearningHub();
    if (userId) {
      userService.getActivityState(userId).then(res => {
        const state = res.data;
        const savedQuiz = state.quiz || state.lesson;
        if ((state.activityType === 'quiz' || state.activityType === 'lesson') && savedQuiz) {
          setLastActivity({
            type: 'quiz',
            title: savedQuiz.title || 'Untitled Quiz',
            quizId: savedQuiz._id,
            index: state.quizIndex ?? state.lessonIndex ?? 0,
          });
        } else if (state.activityType === 'flashcard' && state.flashcardIndex > 0) {
          setLastActivity({
            type: 'flashcard',
            index: state.flashcardIndex,
          });
        }
      }).catch(() => {});
    }
    const interval = setInterval(() => {
      fetchXpStats();
      fetchGamification();
      fetchLearningHub();
    }, 60000);
    return () => clearInterval(interval);
  }, [fetchXpStats, fetchGamification, fetchLearningHub, userId]);

  const handleClaimQuest = async (questId) => {
    if (!userId || claimingQuest) return;
    setClaimingQuest(questId);
    try {
      const res = await userService.claimQuestReward(userId, questId);
      window.dispatchEvent(new CustomEvent('xpUpdated', { detail: { totalXP: res.data.totalXP } }));
      await fetchGamification();
    } catch (err) {
      console.error('Failed to claim quest:', err);
    } finally {
      setClaimingQuest(null);
    }
  };

  const handleViewLeaderboard = async () => {
    if (!userId) return;
    try {
      const res = await userService.getLeaderboard(userId);
      setLeaderboard(res.data);
      setShowLeaderboard(true);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  const isReturningUser = userId && (learningHub?.nextAction || lastActivity || xpStats);
  const weekdayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  const questTaskLabel = (quest) => {
    if (!quest?.id) return quest?.task || '';
    const defaults = {
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

  const questIcons = { xp: '⚡', lessons: '🎯', time: '⏱️' };
  const leagueBadges = { bronze: '🥉', silver: '🥈', gold: '🥇', diamond: '💎' };

  const handleContinue = () => {
    if (onV2Curriculum) {
      navigate('/learn/v2');
      return;
    }
    if (learningHub?.nextAction?.route) {
      navigate(learningHub.nextAction.route);
      return;
    }
    if (!lastActivity) return;
    if (lastActivity.type === 'quiz') {
      navigate(`/quiz/${lastActivity.quizId}`);
    } else {
      navigate('/flashcards');
    }
  };

  const handleLearningAction = (action) => {
    if (onV2Curriculum) {
      navigate('/learn/v2');
      return;
    }
    if (action?.route) {
      navigate(action.route);
      return;
    }
    handleContinue();
  };

  const handleSavePairProfile = async (event) => {
    event.preventDefault();
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
      await fetchLearningHub();
    } finally {
      setSavingPairProfile(false);
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
  const primaryActionRoute = onV2Curriculum
    ? '/learn/v2'
    : (learningHub?.nextAction?.route
      || (lastActivity?.type === 'quiz' && lastActivity.quizId ? `/quiz/${lastActivity.quizId}` : '')
      || (lastActivity?.type === 'flashcard' ? '/flashcards' : '/class'));

  const dueReviewCount = learningHub?.reviewQueue?.dueSavedItems?.length || 0;
  const totalReviewCount = learningHub?.reviewQueue?.counts?.total || dueReviewCount;
  const weeklySummary = learningHub?.weeklySummary || {};
  const weeklyPoints = weeklySummary.points || 0;
  const weeklyActiveDays = weeklySummary.activeDays || 0;
  const weeklySessions = weeklySummary.sessions || 0;
  const weeklySpeakingTurns = weeklySummary.speakingTurns || 0;
  const weeklySavedItems = weeklySummary.newSavedItems || 0;
  const placement = learningHub?.placement || null;
  const recentWords = learningHub?.recentWords || [];
  const milestones = learningHub?.milestones || {};
  const firstThreeDays = learningHub?.firstThreeDays || null;
  const goalPath = learningHub?.goalPath || null;
  const repairPlan = learningHub?.repairPlan || null;
  const currentOnboardingStep = firstThreeDays?.steps?.find((step) => step.current) || firstThreeDays?.steps?.[0] || null;
  const dailyPlanSecondary = (learningHub?.dailyPlan || [])
    .filter((action) => action?.route && action.route !== primaryActionRoute)
    .slice(0, 3);
  const hasStudyHistory = (learningHub?.studyHistory || []).some((day) => Number(day.events || 0) > 0);
  const hasDailySpotlight = Boolean(learningHub?.dailySpotlight?.targetText);
  const hasMilestoneProgress = Boolean(
    (milestones.completedClassLessons || 0)
    || (milestones.savedItems || 0)
    || (milestones.certificates?.length || 0),
  );
  const goalPathActions = (goalPath?.actions || [])
    .filter((action) => action?.route && action.route !== primaryActionRoute)
    .slice(0, 3);
  const repairPlanActions = (repairPlan?.needed ? repairPlan.actions || [] : [])
    .filter((action) => action?.route && action.route !== primaryActionRoute)
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
  const placementReasonText = (reasonKey) => {
    const defaults = {
      'learningHub.placementFromSetup': 'Based on the level you selected for this language pair.',
      'learningHub.placementNeedsCheck': 'A short level check will help us place you more accurately.',
      'learningHub.placementFromActivity': 'Suggested from your recent activity in this language pair.',
    };
    return t(reasonKey, defaults[reasonKey] || t('learningHub.placementFallback', 'We will refine this as you practice.'));
  };
  const onboardingStepTitle = (titleKey) => {
    if (titleKey === 'learningHub.firstThreeDayReviewTitle') {
      return t('learningHub.firstThreeDayReviewTitle', 'Review what you met');
    }
    if (titleKey === 'learningHub.firstThreeDaySpeakTitle') {
      return t('learningHub.firstThreeDaySpeakTitle', 'Use it out loud');
    }
    return t('learningHub.firstThreeDayLearnTitle', 'Start one guided lesson');
  };
  const onboardingStepBody = (bodyKey) => {
    if (bodyKey === 'learningHub.firstThreeDayReviewBody') {
      return t('learningHub.firstThreeDayReviewBody', 'Return once to what you saw yesterday so the first items start to stick.');
    }
    if (bodyKey === 'learningHub.firstThreeDaySpeakBody') {
      return t('learningHub.firstThreeDaySpeakBody', 'Use a short speaking turn so the language leaves the page early.');
    }
    return t('learningHub.firstThreeDayLearnBody', 'Begin with one small guided lesson so the pair has a clear starting point.');
  };
  const homeSignalCards = [
    {
      key: 'review',
      label: t('learningHub.reviewDue', 'Review due'),
      value: totalReviewCount || t('learningHub.clearValue', 'Clear'),
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
      value: weeklyPoints,
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
      value: weeklySpeakingTurns,
      detail: weeklySpeakingTurns
        ? t('learningHub.savedItemsThisWeek', {
          count: weeklySavedItems,
          defaultValue: '{{count}} saved this week',
        })
        : t('learningHub.speakingTurnsEmpty', 'Try one short conversation when you are ready.'),
      route: '/conversation',
    },
  ];
  const informativeSignalCards = homeSignalCards.filter((signal) => {
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

  const handleStartLearning = async () => {
    try {
      const res = await quizService.getQuizzes();
      const quizzes = res.data;
      if (!quizzes.length) { navigate('/quiz'); return; }
      const diffOrder = ['beginner', 'intermediate', 'advanced', 'sentences'];
      const catOrder = ['daily-life', 'business', 'travel', 'greetings', 'food', 'shopping', 'healthcare'];
      const sorted = [...quizzes].sort((a, b) => {
        const dd = diffOrder.indexOf(a.difficulty) - diffOrder.indexOf(b.difficulty);
        if (dd !== 0) return dd;
        return catOrder.indexOf(a.category) - catOrder.indexOf(b.category);
      });
      const ids = sorted.map(q => q._id);
      sessionStorage.setItem('quizPlaylist', JSON.stringify({
        type: 'start-all',
        quizIds: ids,
        currentIndex: 0,
        totalCount: ids.length,
      }));
      navigate(`/quiz/${ids[0]}`);
    } catch {
      navigate('/quiz');
    }
  };

  // Show a slim decay-warning banner above the welcome card when the user is
  // about to lose XP or already is. Hidden in the safe / off states so the
  // page stays calm when nothing's wrong.
  //
  // The backend reports `grace` for the ENTIRE 48h grace window, and the study
  // heartbeat refreshes `lastAnsweredAt` every minute while the learner is
  // active — so an active user sits permanently near 48h. Showing the grace
  // banner for the whole window means it never clears no matter how much you
  // study, which contradicts its own "keep studying to prevent it" copy. So we
  // only surface the grace warning once decay is actually imminent (within the
  // final stretch of the window); recent studying pushes it back out of view.
  const DECAY_WARN_THRESHOLD_HOURS = 24;
  const graceImminent = xpStats?.status === 'grace'
    && (xpStats.hoursUntilDecay ?? Infinity) <= DECAY_WARN_THRESHOLD_HOURS;
  const showDecayBanner = !!xpStats && (xpStats.status === 'decaying' || graceImminent);

  return (
    <div className="home-container">
      <div className="container home-layout">
        {/* Main Content — single full-width column. The right rail was
            removed because Streak + XP moved into Learning Signals; the
            remaining cards (Quests, League, Teaser, Admin) render as a
            secondary strip near the bottom (see .home-secondary below). */}
        <main className="main-content">
          {showDecayBanner && (
            <button
              type="button"
              className={`xp-decay-banner ${xpStats.status}`}
              onClick={() => navigate('/profile')}
              title={t('home.xpTracker')}
            >
              <span className="xp-decay-icon">
                {xpStats.status === 'decaying' ? '📉' : '⏳'}
              </span>
              <span className="xp-decay-text">
                {xpStats.status === 'decaying'
                  ? t('home.decayBannerActive', { rate: xpStats.decayRate, defaultValue: 'XP is decaying — daily loss {{rate}}%. Answer a question to stop it.' })
                  : t('home.decayBannerGrace', { hours: xpStats.hoursUntilDecay ?? 0, rate: xpStats.decayRate, defaultValue: 'XP decay starts in {{hours}}h — daily loss {{rate}}%. Keep studying to prevent it.' })}
              </span>
              <span className="xp-decay-cta">{t('home.xpTracker')} →</span>
            </button>
          )}
          {showAndroidBanner && (
            <div className="android-app-banner" role="note">
              <span className="android-app-banner-icon" aria-hidden="true"><FaAndroid /></span>
              <div className="android-app-banner-text">
                <strong>{t('appDownload.homeTitle', 'Learn on the go')}</strong>
                <span>{t('appDownload.homeText', 'Get the Lingo Booth Android app.')}</span>
              </div>
              <a
                className="android-app-banner-btn"
                href={ANDROID_APK_URL}
                download={ANDROID_APK_FILENAME}
                aria-label={t('appDownload.androidAria', 'Download the Lingo Booth Android app (APK)')}
              >
                {t('appDownload.download', 'Download')}
              </a>
              <button
                type="button"
                className="android-app-banner-dismiss"
                onClick={dismissAndroidBanner}
                aria-label={t('common.dismiss', 'Dismiss')}
              >
                ×
              </button>
            </div>
          )}
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content">
              {isReturningUser ? (
                <>
                  <h1>
                    {username ? t('home.welcomeBack', { username }) : t('home.welcomeBackNoName')}
                  </h1>
                  <p className="hero-subtitle">
                    {learningHub?.nextAction
                      ? nextActionLabel
                      : lastActivity
                        ? lastActivity.type === 'quiz'
                          ? t('home.studyingLesson', { title: lastActivity.title })
                          : t('home.studyingFlashcards')
                        : t('home.readyForSession')}
                  </p>
                  <div className="hero-actions">
                    <button className="btn btn-primary btn-lg" onClick={() => handleLearningAction({ route: primaryActionRoute })}>
                      {primaryActionLabel} →
                    </button>
                    {onV2Curriculum && (
                      <button
                        className="btn btn-secondary btn-lg"
                        onClick={() => navigate('/learn/v2/catalog')}
                      >
                        {t('home.browseLessons', 'Browse lessons')}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h1>
                    <Trans i18nKey="home.learnLanguage" values={{ language: t(`languages.${getTargetLangCode()}`, getTargetLangName()) }}>
                      Learn <span className="text-accent">{t(`languages.${getTargetLangCode()}`, getTargetLangName())}</span> for real conversations
                    </Trans>
                  </h1>
                  <p className="hero-subtitle">
                    {t('home.heroSubtitle')}
                  </p>
                  <div className="hero-actions">
                    <button className="btn btn-primary btn-lg" onClick={isGuest ? handleStartLearning : () => navigate('/select-language?mode=register')}>
                      {isGuest ? t('home.startLearning') : t('home.getStartedFree')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="quick-actions">
            <div className="quick-action" onClick={() => navigate(onV2Curriculum ? '/learn/v2' : '/class')}>
              <span className="quick-action-icon">&#127979;</span>
              <div className="quick-action-text">
                <strong>{onV2Curriculum ? t('navbar.learn', 'Learn') : t('navbar.class', 'Class')}</strong>
                <span>{onV2Curriculum
                  ? t('home.learnDesc', 'Continue your curriculum session')
                  : t('home.classDesc', 'Guided tutor lessons')}</span>
              </div>
              <span className="quick-action-arrow">→</span>
            </div>
            <div className="quick-action" onClick={() => navigate(onV2Curriculum ? '/learn/v2/catalog' : '/exercise')}>
              <span className="quick-action-icon">&#9997;</span>
              <div className="quick-action-text">
                <strong>{onV2Curriculum ? t('home.browseLessons', 'Browse lessons') : t('navbar.exercise', 'Exercise')}</strong>
                <span>{onV2Curriculum
                  ? t('home.catalogDesc', 'Pick a specific concept to study')
                  : t('home.exerciseDesc', 'Quiz and flashcards')}</span>
              </div>
              <span className="quick-action-arrow">→</span>
            </div>
            <div className="quick-action" onClick={() => navigate('/progress')}>
              <span className="quick-action-icon">📊</span>
              <div className="quick-action-text">
                <strong>{t('home.progressAction')}</strong>
                <span>{t('home.progressDesc')}</span>
              </div>
              <span className="quick-action-arrow">→</span>
            </div>
          </section>

          {!isGuest && learningHub && showLearningAnalytics && (
            <section className="learning-analytics-panel" aria-label={t('learningHub.homeOverviewAria', 'Learning overview')}>
              <div className="learning-analytics-head">
                <div>
                  <span>{t('learningHub.analyticsKicker', 'Learning signals')}</span>
                  <h2>{t('learningHub.analyticsTitle', 'Your learning picture')}</h2>
                  <p>{t('learningHub.analyticsSubtitle', 'A quick read on what to do next, what needs review, and how your week is moving.')}</p>
                </div>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => navigate('/progress')}>
                  {t('learningHub.viewFullProgress', 'View full progress')}
                </button>
              </div>

              {(informativeSignalCards.length > 0 || gamification || xpStats) && (
              <div className="learning-analytics-main">
                <div className="learning-signal-grid">
                  {informativeSignalCards.map((signal) => (
                    <button type="button" key={signal.key} className="learning-signal-card" onClick={() => navigate(signal.route)}>
                      <span>{signal.label}</span>
                      <strong>{signal.value}</strong>
                      <small>{signal.detail}</small>
                    </button>
                  ))}
                  {/*
                    Day Streak and Total XP previously lived in a right rail.
                    Folded into Learning Signals so all dashboard telemetry
                    sits in one grouped card. Decay urgency is surfaced via
                    the slim banner above the hero, not buried here.
                  */}
                  {gamification && gamification.challengeMode && gamification.streak && (
                    <button
                      type="button"
                      key="streak"
                      className="learning-signal-card learning-signal-card--streak"
                      onClick={() => navigate('/profile')}
                    >
                      <span>{t('home.dayStreak')}</span>
                      <strong>{gamification.streak.current}</strong>
                      <small className="streak-mini-calendar" aria-hidden="false">
                        {weekdayKeys.map((dayKey, i) => (
                          <span key={dayKey} className={`streak-mini-day${gamification.streak.history?.[i] ? ' active' : ''}`}>
                            {gamification.streak.history?.[i] ? '🔥' : t(`home.weekdays.${dayKey}`, dayKey.slice(0, 1).toUpperCase())}
                          </span>
                        ))}
                      </small>
                    </button>
                  )}
                  {xpStats && (
                    <button
                      type="button"
                      key="totalXp"
                      className={`learning-signal-card learning-signal-card--xp ${xpStats.status}`}
                      onClick={() => navigate('/profile')}
                    >
                      <span>{t('home.totalXP')}</span>
                      <strong>{xpStats.totalXP}</strong>
                      <small>
                        {xpStats.status === 'off'
                          ? t('home.relaxed')
                          : t('home.intense')}
                      </small>
                    </button>
                  )}
                </div>
              </div>
              )}

              {(hasDailySpotlight || hasStudyHistory) && (
              <div className="learning-analytics-footer">
                {hasDailySpotlight && (
                <article className="learning-spotlight-card">
                  <span>{t('learningHub.wordOfDay', 'Word or phrase of the day')}</span>
                  <strong>{learningHub.dailySpotlight.targetText}</strong>
                  {learningHub.dailySpotlight.nativeText && <small>{learningHub.dailySpotlight.nativeText}</small>}
                </article>
                )}
                {hasStudyHistory && (
                <article className="learning-week-card">
                  <span>{t('learningHub.recentStudyTitle', 'Recent study')}</span>
                  <div className="study-history-strip">
                    {(learningHub.studyHistory || []).slice(-7).map((day) => (
                      <span key={day.day} title={`${day.day}: ${day.events}`}>
                        <strong>{day.events}</strong>
                        <small>{day.day.slice(5)}</small>
                      </span>
                    ))}
                  </div>
                </article>
                )}
              </div>
              )}
            </section>
          )}

          {!isGuest && learningHub && learningHub.pairProfile?.completedAt && !editingPairProfile && (
            <section className="pair-profile-card pair-profile-summary" aria-label={t('learningHub.pairSetupSummary', 'Learning setup')}>
              <div>
                <strong>{t('learningHub.pairSetupSummary', 'Learning setup')}</strong>
                <span>{learningSetupSummaryText}</span>
              </div>
              <div className="pair-profile-actions">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => navigate('/level-tests')}>
                  {t('levelTests.kicker', 'Level checks')}
                </button>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingPairProfile(true)}>
                  {t('learningHub.pairSetupEdit', 'Edit')}
                </button>
              </div>
            </section>
          )}

          {!isGuest && learningHub && (!learningHub.pairProfile?.completedAt || editingPairProfile) && (
            <section className="pair-profile-card" aria-label={t('learningHub.pairSetupTitle', 'Set up this language pair')}>
              <div>
                <strong>
                  {learningHub.pairProfile?.completedAt
                    ? t('learningHub.pairSetupUpdate', 'Update this language pair')
                    : t('learningHub.pairSetupTitle', 'Set up this language pair')}
                </strong>
                <span>{t('learningHub.pairSetupBody', 'Tell us your level and goal once so recommendations fit this target language.')}</span>
              </div>
              <form onSubmit={handleSavePairProfile}>
                <label>
                  {t('learningHub.level', 'Level')}
                  <select value={pairProfileForm.currentLevel} onChange={(event) => setPairProfileForm((current) => ({ ...current, currentLevel: event.target.value }))}>
                    <option value="">{t('common.select', 'Select')}</option>
                    {['new', 'beginner', 'intermediate', 'advanced', 'unsure'].map((value) => (
                      <option key={value} value={value}>{t(`learningHub.levels.${value}`, value)}</option>
                    ))}
                  </select>
                </label>
                <label>
                  {t('learningHub.goal', 'Goal')}
                  <select value={pairProfileForm.primaryGoal} onChange={(event) => setPairProfileForm((current) => ({ ...current, primaryGoal: event.target.value }))}>
                    <option value="">{t('common.select', 'Select')}</option>
                    {goalOptions.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </label>
                {learningHub.pairProfile?.completedAt && (
                  <label>
                    {t('learningHub.pace', 'Pace')}
                    <select value={pairProfileForm.pace} onChange={(event) => setPairProfileForm((current) => ({ ...current, pace: event.target.value }))}>
                      {['light', 'steady', 'intensive'].map((value) => (
                        <option key={value} value={value}>{t(`learningHub.paces.${value}`, value)}</option>
                      ))}
                    </select>
                  </label>
                )}
                <button type="submit" className="btn btn-primary" disabled={savingPairProfile}>
                  {savingPairProfile ? t('common.saving') : t('common.save')}
                </button>
                {learningHub.pairProfile?.completedAt && (
                  <button type="button" className="btn btn-outline" onClick={() => setEditingPairProfile(false)}>
                    {t('common.cancel', 'Cancel')}
                  </button>
                )}
              </form>
              {pairProfileNotice && <small>{pairProfileNotice}</small>}
            </section>
          )}

          {!isGuest && learningHub && showGuidancePanel && (
            <section className="learning-guidance-panel" aria-label={t('learningHub.insightsAria', 'Learning guidance')}>
              <div className="learning-section-head">
                <div>
                  <span>{t('learningHub.todaySection', 'Today')}</span>
                  <h2>{t('learningHub.guidanceTitle', 'Guidance')}</h2>
                </div>
                <p>{t('learningHub.guidanceSubtitle', 'Small suggestions that keep the next session clear without crowding the page.')}</p>
              </div>

              <div className="learning-guidance-grid">
                {dailyPlanSecondary.length > 0 && (
                <article className="learning-guidance-card primary">
                  <span>{t('learningHub.secondaryStepsTitle', 'After the main step')}</span>
                  <div className="learning-action-chips">
                    {dailyPlanSecondary.map((action, index) => (
                      <button type="button" key={`${action.type}-${index}`} onClick={() => handleLearningAction(action)}>
                        {t(action.titleKey, { count: action.count, defaultValue: action.label || action.type })}
                      </button>
                    ))}
                  </div>
                </article>
                )}

                {firstThreeDays && (
                  <details className="learning-guidance-card">
                    <summary>
                      <span>{t('learningHub.firstThreeDays', 'First three days')}</span>
                      <strong>{t('learningHub.dayNumber', { day: firstThreeDays.day, defaultValue: 'Day {{day}}' })}</strong>
                    </summary>
                    <p>{currentOnboardingStep ? onboardingStepBody(currentOnboardingStep.bodyKey) : t('learningHub.firstThreeDaysBody', 'Build one small win today before adding more choices.')}</p>
                    <div className="learning-step-list">
                      {(firstThreeDays.steps || []).map((step) => (
                        <button
                          type="button"
                          key={step.day}
                          className={`${step.completed ? 'done' : ''} ${step.current ? 'current' : ''}`}
                          onClick={() => handleLearningAction(step.action)}
                        >
                          <small>{t('learningHub.dayNumber', { day: step.day, defaultValue: 'Day {{day}}' })}</small>
                          <strong>{onboardingStepTitle(step.titleKey)}</strong>
                        </button>
                      ))}
                    </div>
                  </details>
                )}

                {goalPath && goalPathActions.length > 0 && (
                  <details className="learning-guidance-card">
                    <summary>
                      <span>{t('learningHub.goalPathTitle', 'Goal path')}</span>
                      <strong>{goalLabel(goalPath.goal, goalOptions, t)}</strong>
                    </summary>
                    <p>{t('learningHub.goalPathBody', 'Your plan is leaning toward the situations you said matter most.')}</p>
                    <div className="learning-action-chips">
                      {goalPathActions.map((action, index) => (
                        <button type="button" key={`${action.type}-${index}`} onClick={() => handleLearningAction(action)}>
                          {t(action.titleKey, { count: action.count, defaultValue: action.label || action.type })}
                        </button>
                      ))}
                    </div>
                  </details>
                )}

                {repairPlanActions.length > 0 && (
                  <details className="learning-guidance-card repair-focus" open>
                    <summary>
                      <span>{t('learningHub.repairPlanTitle', 'Repair focus')}</span>
                      <strong>{t('learningHub.repairPlanValue', 'Worth revisiting')}</strong>
                    </summary>
                    <p>{t('learningHub.repairPlanBody', 'A few weak or checkpoint items are ready for focused practice before you move too far ahead.')}</p>
                    <div className="learning-action-chips">
                      {repairPlanActions.map((action, index) => (
                        <button type="button" key={`${action.type}-${index}`} onClick={() => handleLearningAction(action)}>
                          {t(action.titleKey, { count: action.count, defaultValue: action.label || action.type })}
                        </button>
                      ))}
                    </div>
                  </details>
                )}

                {showPlacementPrompt && (
                  <details className="learning-guidance-card">
                    <summary>
                      <span>{t('learningHub.placementTitle', 'Placement')}</span>
                      <strong>{t(`learningHub.levels.${placement.level}`, placement.level)}</strong>
                    </summary>
                    <p>{placementReasonText(placement.reasonKey)}</p>
                    {placement.status === 'needs_check' && (
                      <button type="button" onClick={() => navigate('/level-check')}>
                        {t('learningHub.startLevelCheck', 'Start level check')}
                      </button>
                    )}
                  </details>
                )}

                {usingOfflinePack && (
                <details className="learning-guidance-card">
                  <summary>
                    <span>{t(usingOfflinePack ? 'learningHub.offlinePackInUseTitle' : 'learningHub.offlineReadyTitle', usingOfflinePack ? 'Recent pack in use' : 'Recent pack ready')}</span>
                    <strong>{t(usingOfflinePack ? 'learningHub.offlinePackInUseValue' : 'learningHub.offlineReadyValue', usingOfflinePack ? 'Offline' : 'Ready')}</strong>
                  </summary>
                  <p>{t(
                    usingOfflinePack ? 'learningHub.offlinePackInUseBody' : 'learningHub.offlineReadyBody',
                    usingOfflinePack
                      ? 'Showing recently prepared material until the connection comes back.'
                      : 'Recent useful material is kept nearby for a weaker connection.',
                  )}</p>
                </details>
                )}
              </div>
            </section>
          )}

          {!isGuest && learningHub && showLearningShelf && (
            <section className="learning-shelf-grid" aria-label={t('learningHub.learningShelfAria', 'Learning shelf')}>
              {recentWords.length > 0 && (
              <article className="learning-plan-card">
                <h2>{t('learningHub.recentWordsTitle', 'Recent words')}</h2>
                {recentWords.slice(0, 5).map((item) => (
                  <button type="button" key={`${item.targetText}-${item.occurredAt || ''}`} onClick={() => navigate('/review')}>
                    <strong>{item.targetText}</strong>
                    {item.nativeText && <span>{item.nativeText}</span>}
                  </button>
                ))}
              </article>
              )}
              {hasMilestoneProgress && (
              <article className="learning-plan-card">
                <h2>{t('learningHub.milestonesTitle', 'Milestones')}</h2>
                <div className="learning-summary-row">
                  <span>{t('learningHub.completedLessons', 'Completed lessons')}</span>
                  <strong>{milestones.completedClassLessons || 0}</strong>
                </div>
                <div className="learning-summary-row">
                  <span>{t('learningHub.savedItems', 'Saved items')}</span>
                  <strong>{milestones.savedItems || 0}</strong>
                </div>
                <div className="learning-summary-row">
                  <span>{t('learningHub.certificates', 'Certificates')}</span>
                  <strong>{milestones.certificates?.length || 0}</strong>
                  </div>
                <button type="button" onClick={() => navigate('/profile')}>{t('learningHub.viewMilestones', 'View milestones')}</button>
              </article>
              )}
            </section>
          )}

          <section className="home-support-grid" aria-label={t('home.supportAndPlans', 'Support and plans')}>
            <article className="home-support-card">
              <div>
                <strong>{t('contact.infoTitle')}</strong>
                <span>{t('contact.subtitle')}</span>
              </div>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => navigate('/contact')}>
                {t('contact.navLabel')}
              </button>
            </article>
            <article className="home-support-card">
              <div>
                <strong>{t('home.billingTitle')}</strong>
                <span>{t('home.billingDesc')}</span>
              </div>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/pricing')}>
                {t('home.billingAction')}
              </button>
            </article>
          </section>

          {/* Secondary cards — quests, league, teaser, admin. Previously
              lived in a right sidebar, but with Streak + XP moved into
              Learning Signals, the rail had no consistent content. Stacking
              them at the end of the main column avoids the dead-column
              dead-space bug and keeps the page a single full-width flow. */}
          {(
            (gamification && gamification.challengeMode)
            || (gamification && !gamification.challengeMode && userId)
            || isAdmin
          ) && (
          <section className="home-secondary" aria-label={t('home.dashboard', 'Dashboard')}>
            {gamification && gamification.challengeMode ? (
              <>
                {/* Daily Quests Card */}
                <div className="card sidebar-card quests-card">
                  <div className="card-header">
                    <span className="card-icon">🎯</span>
                    <h3>{t('home.dailyQuests')}</h3>
                  </div>
                  <ul className="quests-list">
                    {gamification.quests.map((quest) => (
                      <li key={quest.id} className={`quest-item ${quest.completed ? 'completed' : ''}`}>
                        <span className="quest-icon">{questIcons[quest.id]}</span>
                        <div className="quest-info">
                          <span className="quest-task">{questTaskLabel(quest)}</span>
                          <div className="quest-progress">
                            <div
                              className="quest-progress-fill"
                              style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        {quest.claimed ? (
                          <span className="quest-claimed">✓</span>
                        ) : quest.completed ? (
                          <button
                            className="btn-claim"
                            onClick={() => handleClaimQuest(quest.id)}
                            disabled={claimingQuest === quest.id}
                          >
                            +{quest.bonusXP} {t('common.xp')}
                          </button>
                        ) : (
                          <span className="quest-count">{quest.progress}/{quest.total}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* League Card — guarded against the case where league
                    payload hasn't loaded or is null (was crashing on
                    gamification.league.name when the API returned no
                    league data for this user). */}
                {gamification.league && (
                <div className="card sidebar-card league-card">
                  <div className="card-header">
                    <span className="card-icon">🏆</span>
                    <h3>{t('home.league', { name: gamification.league.name })}</h3>
                  </div>
                  <div className="league-info">
                    <div className="league-rank">
                      <span className="rank-badge">{leagueBadges[gamification.league.badge]}</span>
                      <div className="rank-details">
                        <span className="rank-position">#{gamification.league.rank}</span>
                        <span className="rank-label">{t('home.yourRank')}</span>
                      </div>
                    </div>
                    <div className="league-xp">
                      <span className="xp-value">{gamification.league.weeklyXP} {t('common.xp')}</span>
                      <span className="xp-label">{t('home.thisWeek')}</span>
                    </div>
                  </div>
                  <button className="btn btn-outline btn-sm" style={{ width: '100%' }} onClick={handleViewLeaderboard}>
                    {t('home.viewLeague')}
                  </button>
                </div>
                )}
              </>
            ) : gamification && !gamification.challengeMode && userId ? (
              /* Teaser Card — Relaxed Mode users */
              <div className="card sidebar-card teaser-card">
                <div className="teaser-lock">🔒</div>
                <h3>{t('home.unlockTitle')}</h3>
                <p>{t('home.unlockDesc')}</p>
                <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => navigate('/profile?tab=settings')}>
                  {t('home.enableChallengeMode')}
                </button>
              </div>
            ) : null}

            {/* Admin Card — only visible to admins */}
            {isAdmin && (
              <div className="card sidebar-card admin-card">
                <div className="card-header">
                  <span className="card-icon">⚙️</span>
                  <h3>{t('home.adminDashboard')}</h3>
                </div>
                <p>
                  {t('home.adminDesc')}
                </p>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => navigate('/admin')}
                >
                  {t('home.openDashboard')}
                </button>
              </div>
            )}
          </section>
          )}

        </main>
      </div>

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="leaderboard-overlay" onClick={() => setShowLeaderboard(false)}>
          <div className="leaderboard-modal" onClick={(e) => e.stopPropagation()}>
            <button className="leaderboard-close" onClick={() => setShowLeaderboard(false)}>&times;</button>
            <h2>{t('home.weeklyLeaderboard')}</h2>
            <p className="leaderboard-subtitle">{t('home.leaderboardSubtitle')}</p>
            {leaderboard.length === 0 ? (
              <p className="leaderboard-empty">{t('home.leaderboardEmpty')}</p>
            ) : (
              <div className="leaderboard-list">
                {leaderboard.map((entry) => (
                  <div key={entry.rank} className={`leaderboard-entry ${entry.isCurrentUser ? 'current-user' : ''}`}>
                    <span className="lb-rank">
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                    </span>
                    <span className="lb-username">{entry.username}{entry.isCurrentUser ? ` ${t('home.you')}` : ''}</span>
                    <span className="lb-xp">{entry.weeklyXP} {t('common.xp')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
