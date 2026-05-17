import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { learningHubService, userService, quizService } from '../services/api';
import { getTargetLangName, getTargetLangCode } from '../config/languages';
import './HomePage.css';

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
  const goalOptions = pairGoalOptions(t);

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

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return t('home.never');
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return t('home.dAgo', { d: days, h: hours % 24 });
    if (hours > 0) return t('home.hAgo', { h: hours });
    const mins = Math.floor(diff / (1000 * 60));
    return t('home.mAgo', { m: mins });
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

  const dueReviewCount = learningHub?.reviewQueue?.dueSavedItems?.length || 0;
  const totalReviewCount = learningHub?.reviewQueue?.counts?.total || dueReviewCount;
  const weeklySummary = learningHub?.weeklySummary || {};
  const placement = learningHub?.placement || null;
  const recentWords = learningHub?.recentWords || [];
  const milestones = learningHub?.milestones || {};
  const firstThreeDays = learningHub?.firstThreeDays || null;
  const goalPath = learningHub?.goalPath || null;
  const currentOnboardingStep = firstThreeDays?.steps?.find((step) => step.current) || firstThreeDays?.steps?.[0] || null;
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

  return (
    <div className="home-container">
      <div className="container home-layout">
        {/* Main Content */}
        <main className="main-content">
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
                  {(learningHub?.nextAction || lastActivity) && (
                    <div className="hero-actions">
                      <button className="btn btn-primary btn-lg" onClick={handleContinue}>
                        {learningHub?.nextAction
                          ? nextActionLabel
                          : lastActivity.type === 'quiz'
                            ? t('home.continueLesson')
                            : t('home.continueFlashcards')} →
                      </button>
                    </div>
                  )}
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
            <div className="quick-action" onClick={() => navigate('/class')}>
              <span className="quick-action-icon">&#127979;</span>
              <div className="quick-action-text">
                <strong>{t('navbar.class', 'Class')}</strong>
                <span>{t('home.classDesc', 'Guided tutor lessons')}</span>
              </div>
              <span className="quick-action-arrow">→</span>
            </div>
            <div className="quick-action" onClick={() => navigate('/exercise')}>
              <span className="quick-action-icon">&#9997;</span>
              <div className="quick-action-text">
                <strong>{t('navbar.exercise', 'Exercise')}</strong>
                <span>{t('home.exerciseDesc', 'Quiz and flashcards')}</span>
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

          {!isGuest && learningHub && (
            <section className="learning-hub-overview" aria-label={t('learningHub.homeOverviewAria', 'Learning overview')}>
              <article className="learning-hub-card next">
                <span>{t('learningHub.nextBestAction', 'Next best action')}</span>
                <strong>{nextActionLabel}</strong>
                <button type="button" onClick={() => navigate(learningHub.nextAction?.route || '/class')}>
                  {t('learningHub.open', 'Open')}
                </button>
              </article>
              <article className="learning-hub-card">
                <span>{t('learningHub.reviewDue', 'Review due')}</span>
                <strong>{totalReviewCount}</strong>
                <button type="button" onClick={() => navigate('/review')}>
                  {t('learningHub.reviewNow', 'Review now')}
                </button>
              </article>
              <article className="learning-hub-card">
                <span>{t('learningHub.wordOfDay', 'Word or phrase of the day')}</span>
                <strong>{learningHub.dailySpotlight?.targetText || t('learningHub.noSpotlightYet', 'Save something useful to begin')}</strong>
                <small>{learningHub.dailySpotlight?.nativeText || t('learningHub.spotlightHint', 'Your saved items become daily spotlights.')}</small>
              </article>
            </section>
          )}

          {!isGuest && learningHub && learningHub.pairProfile?.completedAt && !editingPairProfile && (
            <section className="pair-profile-card pair-profile-summary" aria-label={t('learningHub.pairSetupSummary', 'Learning setup')}>
              <div>
                <strong>{t('learningHub.pairSetupSummary', 'Learning setup')}</strong>
                <span>
                  {t(`learningHub.levels.${pairProfileForm.currentLevel}`, pairProfileForm.currentLevel || t('common.notSet', 'Not set'))}
                  {' · '}
                  {goalLabel(pairProfileForm.primaryGoal, goalOptions, t)}
                  {' · '}
                  {t(`learningHub.paces.${pairProfileForm.pace}`, pairProfileForm.pace || t('common.notSet', 'Not set'))}
                </span>
              </div>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingPairProfile(true)}>
                {t('learningHub.pairSetupEdit', 'Edit')}
              </button>
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

          {!isGuest && learningHub && (
            <section className="learning-plan-grid">
              <article className="learning-plan-card">
                <h2>{t('learningHub.dailyPlanTitle', 'Today\'s plan')}</h2>
                {(learningHub.dailyPlan || []).map((action, index) => (
                  <button type="button" key={`${action.type}-${index}`} onClick={() => navigate(action.route)}>
                    <strong>{t(action.titleKey, { count: action.count, defaultValue: action.label || action.type })}</strong>
                    {action.label && <span>{action.label}</span>}
                  </button>
                ))}
              </article>
              <article className="learning-plan-card">
                <h2>{t('learningHub.weeklySummaryTitle', 'This week')}</h2>
                <div className="learning-summary-row">
                  <span>{t('learningHub.points', 'Points')}</span>
                  <strong>{weeklySummary.points || 0}</strong>
                </div>
                <div className="learning-summary-row">
                  <span>{t('learningHub.activeDays', 'Active days')}</span>
                  <strong>{weeklySummary.activeDays || 0}</strong>
                </div>
                <div className="learning-summary-row">
                  <span>{t('learningHub.sessions', 'Sessions')}</span>
                  <strong>{weeklySummary.sessions || 0}</strong>
                </div>
                <div className="learning-summary-row">
                  <span>{t('learningHub.speakingTurns', 'Speaking turns')}</span>
                  <strong>{weeklySummary.speakingTurns || 0}</strong>
                </div>
                <div className="learning-summary-row">
                  <span>{t('learningHub.newSavedItems', 'New saved items')}</span>
                  <strong>{weeklySummary.newSavedItems || 0}</strong>
                </div>
              </article>
              <article className="learning-plan-card">
                <h2>{t('learningHub.recentStudyTitle', 'Recent study')}</h2>
                <div className="study-history-strip">
                  {(learningHub.studyHistory || []).slice(-7).map((day) => (
                    <span key={day.day} title={`${day.day}: ${day.events}`}>
                      <strong>{day.events}</strong>
                      <small>{day.day.slice(5)}</small>
                    </span>
                  ))}
                </div>
              </article>
            </section>
          )}

          {!isGuest && learningHub && (
            <section className="learning-insight-grid" aria-label={t('learningHub.insightsAria', 'Learning guidance')}>
              {firstThreeDays && (
                <article className="learning-insight-card onboarding">
                  <span>{t('learningHub.firstThreeDays', 'First three days')}</span>
                  <strong>{t('learningHub.dayNumber', { day: firstThreeDays.day, defaultValue: 'Day {{day}}' })}</strong>
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
                </article>
              )}
              {goalPath && (
                <article className="learning-insight-card">
                  <span>{t('learningHub.goalPathTitle', 'Goal path')}</span>
                  <strong>{goalLabel(goalPath.goal, goalOptions, t)}</strong>
                  <p>{t('learningHub.goalPathBody', 'Your plan is leaning toward the situations you said matter most.')}</p>
                  <div className="learning-action-chips">
                    {(goalPath.actions || []).map((action, index) => (
                      <button type="button" key={`${action.type}-${index}`} onClick={() => handleLearningAction(action)}>
                        {t(action.titleKey, { count: action.count, defaultValue: action.label || action.type })}
                      </button>
                    ))}
                  </div>
                </article>
              )}
              {placement && (
                <article className="learning-insight-card">
                  <span>{t('learningHub.placementTitle', 'Placement')}</span>
                  <strong>{t(`learningHub.levels.${placement.level}`, placement.level)}</strong>
                  <p>{placementReasonText(placement.reasonKey)}</p>
                  {placement.status === 'needs_check' && (
                    <button type="button" onClick={() => navigate('/level-check')}>
                      {t('learningHub.startLevelCheck', 'Start level check')}
                    </button>
                  )}
                </article>
              )}
              <article className="learning-insight-card">
                <span>{t(usingOfflinePack ? 'learningHub.offlinePackInUseTitle' : 'learningHub.offlineReadyTitle', usingOfflinePack ? 'Recent pack in use' : 'Recent pack ready')}</span>
                <strong>{t(usingOfflinePack ? 'learningHub.offlinePackInUseValue' : 'learningHub.offlineReadyValue', usingOfflinePack ? 'Offline' : 'Ready')}</strong>
                <p>{t(
                  usingOfflinePack ? 'learningHub.offlinePackInUseBody' : 'learningHub.offlineReadyBody',
                  usingOfflinePack
                    ? 'Showing recently prepared material until the connection comes back.'
                    : 'Recent useful material is kept nearby for a weaker connection.',
                )}</p>
              </article>
            </section>
          )}

          {!isGuest && learningHub && (
            <section className="learning-shelf-grid" aria-label={t('learningHub.learningShelfAria', 'Learning shelf')}>
              <article className="learning-plan-card">
                <h2>{t('learningHub.recentWordsTitle', 'Recent words')}</h2>
                {recentWords.length ? recentWords.slice(0, 5).map((item) => (
                  <button type="button" key={`${item.targetText}-${item.occurredAt || ''}`} onClick={() => navigate('/review')}>
                    <strong>{item.targetText}</strong>
                    {item.nativeText && <span>{item.nativeText}</span>}
                  </button>
                )) : (
                  <p>{t('learningHub.recentWordsEmpty', 'New words from class and conversation will gather here.')}</p>
                )}
              </article>
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
            </section>
          )}

          <section className="home-contact-strip">
            <div>
              <strong>{t('contact.infoTitle')}</strong>
              <span>{t('contact.subtitle')}</span>
            </div>
            <button type="button" className="btn btn-outline btn-sm" onClick={() => navigate('/contact')}>
              {t('contact.navLabel')}
            </button>
          </section>

          <section className="home-billing-strip">
            <div>
              <strong>{t('home.billingTitle')}</strong>
              <span>{t('home.billingDesc')}</span>
            </div>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/pricing')}>
              {t('home.billingAction')}
            </button>
          </section>

        </main>

        {/* Sidebar - Duolingo style gamification */}
        <aside className="sidebar">
          {/* Gamification Cards — Challenge Mode only */}
          {gamification && gamification.challengeMode ? (
            <>
              {/* Streak Card */}
              <div className="card sidebar-card streak-card">
                <div className="card-header">
                  <span className="card-icon">🔥</span>
                  <h3>{t('home.dayStreak')}</h3>
                </div>
                <div className="streak-display">
                  <span className="streak-number">{gamification.streak.current}</span>
                  <span className="streak-label">{gamification.streak.current !== 1 ? t('home.days') : t('home.day')}</span>
                </div>
                <div className="streak-calendar">
                  {weekdayKeys.map((dayKey, i) => (
                    <div key={i} className={`calendar-day ${gamification.streak.history[i] ? 'active' : ''}`}>
                      {gamification.streak.history[i] ? '🔥' : t(`home.weekdays.${dayKey}`, dayKey.slice(0, 1).toUpperCase())}
                    </div>
                  ))}
                </div>
              </div>

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

              {/* League Card */}
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

          {/* XP Tracker Card */}
          {xpStats && (
            <div className={`card sidebar-card xp-tracker-card ${xpStats.status}`}>
              <div className="card-header">
                <span className="card-icon">
                  {xpStats.status === 'off' ? '🌿' : xpStats.status === 'decaying' ? '📉' : xpStats.status === 'grace' ? '⏳' : '✨'}
                </span>
                <h3>{t('home.xpTracker')}</h3>
                <span className={`xp-status-badge ${xpStats.status}`}>
                  {xpStats.status === 'off' ? t('home.relaxed') : t('home.intense')}
                </span>
              </div>

              <div className="xp-tracker-total">
                <span className="xp-tracker-number">{xpStats.totalXP}</span>
                <span className="xp-tracker-label">{t('home.totalXP')}</span>
              </div>

              <div className="xp-tracker-details">
                <div className="xp-detail-row">
                  <span className="xp-detail-label">{t('home.lastAnswered')}</span>
                  <span className="xp-detail-value">{formatTimeAgo(xpStats.lastAnsweredAt)}</span>
                </div>
                {xpStats.status !== 'safe' && xpStats.status !== 'off' && (
                  <>
                    <div className="xp-detail-row">
                      <span className="xp-detail-label">
                        {xpStats.status === 'grace' ? t('home.decayStartsIn') : t('home.nextDecayIn')}
                      </span>
                      <span className="xp-detail-value">
                        {xpStats.hoursUntilDecay != null ? `${xpStats.hoursUntilDecay}h` : '—'}
                      </span>
                    </div>
                    <div className="xp-detail-row">
                      <span className="xp-detail-label">{t('home.dailyLossRate')}</span>
                      <span className="xp-detail-value">{xpStats.decayRate}%</span>
                    </div>
                  </>
                )}
              </div>

              {xpStats.status === 'decaying' && (
                <div className="xp-tracker-warning">
                  {t('home.stopDecayWarning')}
                </div>
              )}
            </div>
          )}

          {/* Admin Card - Only visible to admins */}
          {isAdmin && (
            <div className="card sidebar-card admin-card" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}>
              <div className="card-header" style={{ borderBottom: 'none' }}>
                <span className="card-icon">⚙️</span>
                <h3 style={{ color: 'white' }}>{t('home.adminDashboard')}</h3>
              </div>
              <p style={{ opacity: 0.9, fontSize: '0.9rem', marginBottom: '1rem' }}>
                {t('home.adminDesc')}
              </p>
              <button
                className="btn btn-sm"
                style={{
                  width: '100%',
                  background: 'white',
                  color: '#764ba2',
                  fontWeight: '600'
                }}
                onClick={() => navigate('/admin')}
              >
                {t('home.openDashboard')}
              </button>
            </div>
          )}
        </aside>
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
