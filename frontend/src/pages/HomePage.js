import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/api';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');
  const isAdmin = userRole === 'admin';
  const [xpStats, setXpStats] = useState(null);
  const [gamification, setGamification] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [claimingQuest, setClaimingQuest] = useState(null);

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
    const interval = setInterval(() => {
      fetchXpStats();
      fetchGamification();
    }, 60000);
    return () => clearInterval(interval);
  }, [fetchXpStats, fetchGamification]);

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

  const features = [
    {
      icon: '📚',
      title: 'Lessons',
      description: 'Structured lessons with audio pronunciation for real conversations',
      color: '#58cc02',
      action: () => navigate('/lessons'),
    },
    {
      icon: '🎴',
      title: 'Flashcards',
      description: 'Master vocabulary with spaced repetition learning',
      color: '#1cb0f6',
      action: () => navigate('/flashcards'),
    },
    {
      icon: '📊',
      title: 'Progress',
      description: 'Track your skills in Listening, Speaking, Reading & Writing',
      color: '#a560e8',
      action: () => navigate('/progress'),
    },
  ];

  const questIcons = { xp: '⚡', lessons: '🎯', time: '⏱️' };
  const leagueBadges = { bronze: '🥉', silver: '🥈', gold: '🥇', diamond: '💎' };

  return (
    <div className="home-container">
      <div className="container home-layout">
        {/* Main Content */}
        <main className="main-content">
          {/* Hero Section - Babbel style */}
          <section className="hero-section">
            <div className="hero-content">
              <h1>
                Which <span className="text-accent">Korean</span> skill do you want to learn?
              </h1>
              <p className="hero-subtitle">
                Personalized lessons, interactive flashcards, and progress tracking — designed for real conversations.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary btn-lg" onClick={() => navigate('/lessons')}>
                  Start learning
                </button>
                <button className="btn btn-outline btn-lg" onClick={() => navigate('/flashcards')}>
                  Practice flashcards
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-card">
                <div className="hero-card-icon">🇰🇷</div>
                <span className="hero-card-text">한국어</span>
              </div>
            </div>
          </section>

          {/* Quick Stats Banner */}
          <section className="stats-banner">
            <div className="stat-pill">
              <span className="stat-icon">🎓</span>
              <span>Over <strong>50+ lessons</strong> available</span>
            </div>
          </section>

          {/* Features Grid - Babbel card style */}
          <section className="features-section">
            <h2>The effective way to learn <span className="text-accent">Korean</span> online</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card"
                  onClick={feature.action}
                  style={{ '--accent-color': feature.color }}
                >
                  <div className="feature-icon-wrapper">
                    <span className="feature-icon">{feature.icon}</span>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <span className="feature-arrow">→</span>
                </div>
              ))}
            </div>
          </section>

          {/* Learning Path Preview */}
          <section className="path-preview">
            <h2>Your learning <span className="text-accent">path</span></h2>
            <div className="path-container">
              <div className="path-node completed">
                <div className="node-circle">✓</div>
                <span className="node-label">Greetings</span>
              </div>
              <div className="path-line"></div>
              <div className="path-node current">
                <div className="node-circle pulse">📖</div>
                <span className="node-label">Daily Life</span>
              </div>
              <div className="path-line inactive"></div>
              <div className="path-node locked">
                <div className="node-circle">🔒</div>
                <span className="node-label">Travel</span>
              </div>
              <div className="path-line inactive"></div>
              <div className="path-node locked">
                <div className="node-circle">🔒</div>
                <span className="node-label">Business</span>
              </div>
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
                  {xpStats.status === 'off' ? 'Relaxed' : xpStats.status === 'decaying' ? 'Decaying' : xpStats.status === 'grace' ? 'Intense' : 'Safe'}
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

          {/* Pro Promo Card */}
          <div className="card sidebar-card promo-card">
            <div className="promo-badge">PRO</div>
            <h3>Try Lingo Booth Pro</h3>
            <p>No ads, unlimited practice, and personalized learning!</p>
            <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>
              Try 1 Week Free
            </button>
          </div>

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
