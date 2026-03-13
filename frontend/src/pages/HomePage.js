import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { userService, lessonService } from '../services/api';
import { getTargetLangName, getTargetLangCode } from '../config/languages';
import './HomePage.css';

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

  useEffect(() => {
    fetchXpStats();
    fetchGamification();
    if (userId) {
      userService.getActivityState(userId).then(res => {
        const state = res.data;
        if (state.activityType === 'lesson' && state.lesson) {
          setLastActivity({
            type: 'lesson',
            title: state.lesson.title || 'Untitled Lesson',
            lessonId: state.lesson._id,
            index: state.lessonIndex || 0,
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
    }, 60000);
    return () => clearInterval(interval);
  }, [fetchXpStats, fetchGamification, userId]);

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

  const isReturningUser = userId && (lastActivity || xpStats);

  const questIcons = { xp: '⚡', lessons: '🎯', time: '⏱️' };
  const leagueBadges = { bronze: '🥉', silver: '🥈', gold: '🥇', diamond: '💎' };

  const handleContinue = () => {
    if (!lastActivity) return;
    if (lastActivity.type === 'lesson') {
      navigate(`/lessons/${lastActivity.lessonId}`);
    } else {
      navigate('/flashcards');
    }
  };

  const handleStartLearning = async () => {
    try {
      const res = await lessonService.getLessons();
      const lessons = res.data;
      if (!lessons.length) { navigate('/lessons'); return; }
      const diffOrder = ['beginner', 'intermediate', 'advanced', 'sentences'];
      const catOrder = ['daily-life', 'business', 'travel', 'greetings', 'food', 'shopping', 'healthcare'];
      const sorted = [...lessons].sort((a, b) => {
        const dd = diffOrder.indexOf(a.difficulty) - diffOrder.indexOf(b.difficulty);
        if (dd !== 0) return dd;
        return catOrder.indexOf(a.category) - catOrder.indexOf(b.category);
      });
      const ids = sorted.map(l => l._id);
      sessionStorage.setItem('lessonPlaylist', JSON.stringify({
        type: 'start-all',
        lessonIds: ids,
        currentIndex: 0,
        totalCount: ids.length,
      }));
      navigate(`/lessons/${ids[0]}`);
    } catch {
      navigate('/lessons');
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
                    {lastActivity
                      ? lastActivity.type === 'lesson'
                        ? t('home.studyingLesson', { title: lastActivity.title })
                        : t('home.studyingFlashcards')
                      : t('home.readyForSession')}
                  </p>
                  {lastActivity && (
                    <div className="hero-actions">
                      <button className="btn btn-primary btn-lg" onClick={handleContinue}>
                        {lastActivity.type === 'lesson' ? t('home.continueLesson') : t('home.continueFlashcards')} →
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
            <div className="quick-action" onClick={() => navigate('/lessons')}>
              <span className="quick-action-icon">📚</span>
              <div className="quick-action-text">
                <strong>{t('home.lessonsAction')}</strong>
                <span>{t('home.lessonsDesc')}</span>
              </div>
              <span className="quick-action-arrow">→</span>
            </div>
            <div className="quick-action" onClick={() => navigate('/flashcards')}>
              <span className="quick-action-icon">🎴</span>
              <div className="quick-action-text">
                <strong>{t('home.flashcardsAction')}</strong>
                <span>{t('home.flashcardsDesc')}</span>
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
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div key={i} className={`calendar-day ${gamification.streak.history[i] ? 'active' : ''}`}>
                      {gamification.streak.history[i] ? '🔥' : day}
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
                        <span className="quest-task">{quest.task}</span>
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
