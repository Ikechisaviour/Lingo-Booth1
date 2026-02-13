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

  const fetchXpStats = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await userService.getXpStats(userId);
      setXpStats(res.data);
    } catch (err) {
      console.error('Failed to fetch XP stats:', err);
    }
  }, [userId]);

  useEffect(() => {
    fetchXpStats();
    const interval = setInterval(fetchXpStats, 60000);
    return () => clearInterval(interval);
  }, [fetchXpStats]);

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

  const dailyQuests = [
    { icon: '⚡', task: 'Earn 20 XP', progress: 0, total: 20 },
    { icon: '🎯', task: 'Score 80%+ in 2 lessons', progress: 0, total: 2 },
    { icon: '⏱️', task: 'Study for 15 minutes', progress: 0, total: 15 },
  ];

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
          {/* Streak Card */}
          <div className="card sidebar-card streak-card">
            <div className="card-header">
              <span className="card-icon">🔥</span>
              <h3>Day Streak</h3>
            </div>
            <div className="streak-display">
              <span className="streak-number">6</span>
              <span className="streak-label">days</span>
            </div>
            <div className="streak-calendar">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className={`calendar-day ${i < 6 ? 'active' : ''}`}>
                  {i < 6 ? '🔥' : day}
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
              {dailyQuests.map((quest, index) => (
                <li key={index} className="quest-item">
                  <span className="quest-icon">{quest.icon}</span>
                  <div className="quest-info">
                    <span className="quest-task">{quest.task}</span>
                    <div className="quest-progress">
                      <div
                        className="quest-progress-fill"
                        style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="quest-count">{quest.progress}/{quest.total}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* League Card */}
          <div className="card sidebar-card league-card">
            <div className="card-header">
              <span className="card-icon">🏆</span>
              <h3>Gold League</h3>
            </div>
            <div className="league-info">
              <div className="league-rank">
                <span className="rank-badge">🥇</span>
                <div className="rank-details">
                  <span className="rank-position">#9</span>
                  <span className="rank-label">Your rank</span>
                </div>
              </div>
              <div className="league-xp">
                <span className="xp-value">127 XP</span>
                <span className="xp-label">this week</span>
              </div>
            </div>
            <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>
              View League
            </button>
          </div>

          {/* XP Tracker Card */}
          {xpStats && (
            <div className={`card sidebar-card xp-tracker-card ${xpStats.status}`}>
              <div className="card-header">
                <span className="card-icon">
                  {xpStats.status === 'decaying' ? '📉' : xpStats.status === 'grace' ? '⏳' : '✨'}
                </span>
                <h3>XP Tracker</h3>
                <span className={`xp-status-badge ${xpStats.status}`}>
                  {xpStats.status === 'decaying' ? 'Decaying' : xpStats.status === 'grace' ? 'Grace Period' : 'Safe'}
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
                {xpStats.status !== 'safe' && (
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

              {xpStats.projections.length > 0 && xpStats.status !== 'safe' && (
                <div className="xp-projection-chart">
                  <div className="xp-projection-header">
                    <span className="xp-projection-title">30-day projection</span>
                  </div>
                  <div className="xp-projection-bars">
                    {xpStats.projections
                      .filter((_, i) => i % 3 === 0 || i === 29)
                      .map((p) => {
                        const maxXP = xpStats.totalXP || 1;
                        const height = Math.max(2, (p.xp / maxXP) * 100);
                        return (
                          <div key={p.day} className="xp-bar-group">
                            <div className="xp-bar-container">
                              <div
                                className="xp-bar"
                                style={{ height: `${height}%` }}
                                title={`Day ${p.day}: ${p.xp} XP`}
                              ></div>
                            </div>
                            <span className="xp-bar-label">{p.day}d</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

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
    </div>
  );
}

export default HomePage;
