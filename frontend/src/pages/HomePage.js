import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService, lessonService } from '../services/api';
import './HomePage.css';

function HomePage() {
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
    if (!dateStr) return 'Never';
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ${hours % 24}h ago`;
    if (hours > 0) return `${hours}h ago`;
    const mins = Math.floor(diff / (1000 * 60));
    return `${mins}m ago`;
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
                    Welcome back{username ? `, ${username}` : ''}
                  </h1>
                  <p className="hero-subtitle">
                    {lastActivity
                      ? lastActivity.type === 'lesson'
                        ? `You were studying "${lastActivity.title}".`
                        : 'You were practicing flashcards.'
                      : 'Ready for your next session?'}
                  </p>
                  {lastActivity && (
                    <div className="hero-actions">
                      <button className="btn btn-primary btn-lg" onClick={handleContinue}>
                        Continue {lastActivity.type === 'lesson' ? 'Lesson' : 'Flashcards'} →
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h1>
                    Learn <span className="text-accent">Korean</span> for real conversations
                  </h1>
                  <p className="hero-subtitle">
                    Structured lessons, interactive flashcards, and progress tracking — all with native audio.
                  </p>
                  <div className="hero-actions">
                    <button className="btn btn-primary btn-lg" onClick={isGuest ? handleStartLearning : () => navigate('/register')}>
                      {isGuest ? 'Start learning' : 'Get started free'}
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
                <strong>Lessons</strong>
                <span>Audio-based conversations</span>
              </div>
              <span className="quick-action-arrow">→</span>
            </div>
            <div className="quick-action" onClick={() => navigate('/flashcards')}>
              <span className="quick-action-icon">🎴</span>
              <div className="quick-action-text">
                <strong>Flashcards</strong>
                <span>Vocabulary practice</span>
              </div>
              <span className="quick-action-arrow">→</span>
            </div>
            <div className="quick-action" onClick={() => navigate('/progress')}>
              <span className="quick-action-icon">📊</span>
              <div className="quick-action-text">
                <strong>Progress</strong>
                <span>Track your skills</span>
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
                  <h3>Day Streak</h3>
                </div>
                <div className="streak-display">
                  <span className="streak-number">{gamification.streak.current}</span>
                  <span className="streak-label">day{gamification.streak.current !== 1 ? 's' : ''}</span>
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
                  <h3>Daily Quests</h3>
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
                          +{quest.bonusXP} XP
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
                  <h3>{gamification.league.name} League</h3>
                </div>
                <div className="league-info">
                  <div className="league-rank">
                    <span className="rank-badge">{leagueBadges[gamification.league.badge]}</span>
                    <div className="rank-details">
                      <span className="rank-position">#{gamification.league.rank}</span>
                      <span className="rank-label">Your rank</span>
                    </div>
                  </div>
                  <div className="league-xp">
                    <span className="xp-value">{gamification.league.weeklyXP} XP</span>
                    <span className="xp-label">this week</span>
                  </div>
                </div>
                <button className="btn btn-outline btn-sm" style={{ width: '100%' }} onClick={handleViewLeaderboard}>
                  View League
                </button>
              </div>
            </>
          ) : gamification && !gamification.challengeMode && userId ? (
            /* Teaser Card — Relaxed Mode users */
            <div className="card sidebar-card teaser-card">
              <div className="teaser-lock">🔒</div>
              <h3>Unlock Streaks, Quests & Leagues</h3>
              <p>Enable Challenge Mode to track your streak, complete daily quests, and compete on the leaderboard!</p>
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => navigate('/profile?tab=settings')}>
                Enable Challenge Mode
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
                <h3>XP Tracker</h3>
                <span className={`xp-status-badge ${xpStats.status}`}>
                  {xpStats.status === 'off' ? 'RELAXED' : 'INTENSE'}
                </span>
              </div>

              <div className="xp-tracker-total">
                <span className="xp-tracker-number">{xpStats.totalXP}</span>
                <span className="xp-tracker-label">Total XP</span>
              </div>

              <div className="xp-tracker-details">
                <div className="xp-detail-row">
                  <span className="xp-detail-label">Last answered</span>
                  <span className="xp-detail-value">{formatTimeAgo(xpStats.lastAnsweredAt)}</span>
                </div>
                {xpStats.status !== 'safe' && xpStats.status !== 'off' && (
                  <>
                    <div className="xp-detail-row">
                      <span className="xp-detail-label">
                        {xpStats.status === 'grace' ? 'Decay starts in' : 'Next decay in'}
                      </span>
                      <span className="xp-detail-value">
                        {xpStats.hoursUntilDecay != null ? `${xpStats.hoursUntilDecay}h` : '—'}
                      </span>
                    </div>
                    <div className="xp-detail-row">
                      <span className="xp-detail-label">Daily loss rate</span>
                      <span className="xp-detail-value">{xpStats.decayRate}%</span>
                    </div>
                  </>
                )}
              </div>

              {xpStats.status === 'decaying' && (
                <div className="xp-tracker-warning">
                  Answer a question to stop the decay!
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
                <h3 style={{ color: 'white' }}>Admin Dashboard</h3>
              </div>
              <p style={{ opacity: 0.9, fontSize: '0.9rem', marginBottom: '1rem' }}>
                Manage users, view analytics, and monitor site activity.
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
                Open Dashboard
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
            <h2>Weekly Leaderboard</h2>
            <p className="leaderboard-subtitle">Top Challenge Mode learners this week</p>
            {leaderboard.length === 0 ? (
              <p className="leaderboard-empty">No activity this week yet. Be the first!</p>
            ) : (
              <div className="leaderboard-list">
                {leaderboard.map((entry) => (
                  <div key={entry.rank} className={`leaderboard-entry ${entry.isCurrentUser ? 'current-user' : ''}`}>
                    <span className="lb-rank">
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                    </span>
                    <span className="lb-username">{entry.username}{entry.isCurrentUser ? ' (You)' : ''}</span>
                    <span className="lb-xp">{entry.weeklyXP} XP</span>
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
