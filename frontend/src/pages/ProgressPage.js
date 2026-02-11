import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { progressService } from '../services/api';
import './ProgressPage.css';

function ProgressPage() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMastery, setSelectedMastery] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const response = await progressService.getSummary(userId);
      setProgress(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load progress');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading progress...</div>;
  }

  if (error || !progress) {
    return <div className="container error">{error}</div>;
  }

  const masteryStats = [
    { status: 'Mastered', key: 'mastered', count: progress.mastered, color: 'var(--mastered)', icon: '🏆', bgColor: 'rgba(88, 204, 2, 0.1)', areas: progress.masteredAreas || [] },
    { status: 'Comfortable', key: 'comfortable', count: progress.comfortable, color: 'var(--comfortable)', icon: '😊', bgColor: 'rgba(255, 200, 0, 0.1)', areas: progress.comfortableAreas || [] },
    { status: 'Learning', key: 'learning', count: progress.learning, color: 'var(--learning)', icon: '📚', bgColor: 'rgba(28, 176, 246, 0.1)', areas: progress.learningAreas || [] },
    { status: 'Struggling', key: 'struggling', count: progress.struggling, color: 'var(--struggling)', icon: '💪', bgColor: 'rgba(255, 75, 75, 0.1)', areas: progress.strugglingAreas || [] },
  ];

  const formatCategory = (cat) => {
    if (!cat) return 'General';
    return cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ');
  };

  const needsPractice = (status) => ['struggling', 'learning'].includes(status);

  const skillStats = progress.skillStats || {};
  const totalItems = progress.mastered + progress.comfortable + progress.learning + progress.struggling || 1;

  const skills = [
    { name: 'listening', icon: '👂', color: '#1cb0f6' },
    { name: 'speaking', icon: '🗣️', color: '#ff6b35' },
    { name: 'reading', icon: '📖', color: '#58cc02' },
    { name: 'writing', icon: '✍️', color: '#a560e8' },
  ];

  return (
    <div className="progress-container">
      <div className="container">
        {/* Header */}
        <div className="progress-header">
          <div className="header-content">
            <h1>Your <span className="text-accent">Progress</span></h1>
            <p>Track your Korean learning journey</p>
          </div>
          <button className="btn btn-outline" onClick={fetchProgress}>
            ↻ Refresh
          </button>
        </div>

        {/* Achievement Summary */}
        <div className="achievement-banner card">
          <div className="achievement-content">
            <div className="achievement-icon">🎯</div>
            <div className="achievement-text">
              <h3>Keep up the great work!</h3>
              <p>You've mastered <strong>{progress.mastered}</strong> items so far</p>
            </div>
          </div>
          <div className="achievement-xp">
            <span className="xp-amount">+{progress.mastered * 10}</span>
            <span className="xp-label">XP Earned</span>
          </div>
        </div>

        {/* Mastery Stats Grid */}
        <div className="stats-grid">
          {masteryStats.map((stat, idx) => (
            <div
              key={idx}
              className={`stat-card stat-card-clickable ${selectedMastery === stat.key ? 'stat-card-selected' : ''}`}
              style={{ '--stat-color': stat.color, '--stat-bg': stat.bgColor }}
              onClick={() => setSelectedMastery(selectedMastery === stat.key ? null : stat.key)}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <span className="stat-count">{stat.count}</span>
                <span className="stat-label">{stat.status}</span>
              </div>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${(stat.count / totalItems) * 100}%` }}
                ></div>
              </div>
              <span className="stat-expand-hint">
                {selectedMastery === stat.key ? 'Click to collapse' : 'Click to view'}
              </span>
            </div>
          ))}
        </div>

        {/* Mastery Detail Panel */}
        {selectedMastery && (
          <div className="mastery-detail-panel card">
            <div className="mastery-detail-header">
              <h2>
                {masteryStats.find(s => s.key === selectedMastery)?.icon}{' '}
                {masteryStats.find(s => s.key === selectedMastery)?.status} Activities
              </h2>
              <button className="btn-close-panel" onClick={() => setSelectedMastery(null)}>
                ✕
              </button>
            </div>
            {(() => {
              const areas = masteryStats.find(s => s.key === selectedMastery)?.areas || [];
              if (areas.length === 0) {
                return <p className="no-activities">No activities in this category yet.</p>;
              }
              return (
                <div className="mastery-detail-list">
                  {areas.map((area, idx) => (
                    <div key={idx} className="mastery-detail-item">
                      <div className="detail-item-info">
                        <div className="detail-item-title">
                          {area.lessonId?.title || formatCategory(area.category)}
                        </div>
                        <div className="detail-item-meta">
                          <span className="detail-category">{formatCategory(area.category)}</span>
                          {area.lessonId?.difficulty && (
                            <span className={`detail-difficulty detail-difficulty-${area.lessonId.difficulty}`}>
                              {area.lessonId.difficulty}
                            </span>
                          )}
                          <span className="detail-skill">{area.skillType}</span>
                        </div>
                      </div>
                      <div className="detail-item-stats">
                        <span className="detail-score">{area.score}%</span>
                        <span className="detail-attempts">{area.attemptCount} attempts</span>
                      </div>
                      {area.lessonId && needsPractice(selectedMastery) && (
                        <Link
                          to={`/lessons/${area.lessonId._id}`}
                          className="btn-practice"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Practice
                        </Link>
                      )}
                      {area.lessonId && !needsPractice(selectedMastery) && (
                        <Link
                          to={`/lessons/${area.lessonId._id}`}
                          className="btn-review"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Review
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {/* Mastery Breakdown */}
        <div className="card mastery-section">
          <div className="section-header">
            <h2>Mastery Breakdown</h2>
          </div>
          <div className="mastery-chart">
            {masteryStats.map((stat, idx) => (
              <div key={idx} className="chart-row">
                <div className="chart-label">
                  <span className="chart-dot" style={{ background: stat.color }}></span>
                  <span>{stat.status}</span>
                </div>
                <div className="chart-bar-container">
                  <div className="chart-bar">
                    <div
                      className="chart-bar-fill"
                      style={{
                        width: `${(stat.count / totalItems) * 100}%`,
                        background: stat.color,
                      }}
                    ></div>
                  </div>
                  <span className="chart-value">{stat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Performance */}
        <div className="skills-section">
          <h2>Skills Performance</h2>
          <div className="skills-grid">
            {skills.map((skill) => {
              const stats = skillStats[skill.name] || { averageScore: 0, count: 0 };
              return (
                <div
                  key={skill.name}
                  className="skill-card"
                  style={{ '--skill-color': skill.color }}
                >
                  <div className="skill-header">
                    <span className="skill-icon">{skill.icon}</span>
                    <h3>{skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}</h3>
                  </div>
                  <div className="skill-progress-ring">
                    <svg viewBox="0 0 100 100">
                      <circle className="ring-bg" cx="50" cy="50" r="40" />
                      <circle
                        className="ring-fill"
                        cx="50"
                        cy="50"
                        r="40"
                        strokeDasharray={`${stats.averageScore * 2.51}, 251`}
                        style={{ stroke: skill.color }}
                      />
                    </svg>
                    <div className="ring-text">
                      <span className="ring-percent">{stats.averageScore}%</span>
                    </div>
                  </div>
                  <p className="skill-activities">{stats.count} activities</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Areas Needing Attention */}
        <div className="struggling-section">
          <h2>Areas Needing Attention</h2>
          {progress.strugglingAreas.length === 0 ? (
            <div className="success-banner">
              <span className="success-icon">🎉</span>
              <div className="success-text">
                <h3>Great job!</h3>
                <p>You're not struggling with anything right now. Keep it up!</p>
              </div>
            </div>
          ) : (
            <div className="areas-grid">
              {progress.strugglingAreas.map((area, idx) => (
                <div key={idx} className="area-card">
                  <div className="area-header">
                    <h3>{area.category}</h3>
                    <span className="area-badge">{area.skillType}</span>
                  </div>
                  <div className="area-stats">
                    <div className="area-stat">
                      <span className="area-stat-value">{area.score}%</span>
                      <span className="area-stat-label">Score</span>
                    </div>
                    <div className="area-stat">
                      <span className="area-stat-value">{area.attemptCount}</span>
                      <span className="area-stat-label">Attempts</span>
                    </div>
                    <div className="area-stat">
                      <span className="area-stat-value">
                        {area.attemptCount > 0
                          ? ((area.correctAttempts / area.attemptCount) * 100).toFixed(0)
                          : 0}%
                      </span>
                      <span className="area-stat-label">Success</span>
                    </div>
                  </div>
                  <div className="area-tip">
                    <span className="tip-icon">💡</span>
                    <p>Review {area.skillType} skills with {area.category} content</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Learning Tips */}
        <div className="card tips-section">
          <h2>Learning Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-emoji">🔄</span>
              <h4>Spaced Repetition</h4>
              <p>Review flashcards regularly to improve retention</p>
            </div>
            <div className="tip-card">
              <span className="tip-emoji">🎯</span>
              <h4>Active Practice</h4>
              <p>Focus on struggling areas to improve faster</p>
            </div>
            <div className="tip-card">
              <span className="tip-emoji">📊</span>
              <h4>Diversify Learning</h4>
              <p>Practice all four skills evenly</p>
            </div>
            <div className="tip-card">
              <span className="tip-emoji">🔥</span>
              <h4>Stay Consistent</h4>
              <p>Study a little bit every day for best results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressPage;
