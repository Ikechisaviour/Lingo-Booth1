import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { lessonService, progressService } from '../services/api';
import './LessonsPage.css';

function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ category: '', difficulty: '' });
  const [progressMap, setProgressMap] = useState({});

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // Fetch user progress to build lessonId → score map
  useEffect(() => {
    if (!userId) return;
    progressService.getProgress(userId).then(res => {
      const map = {};
      res.data.forEach(p => {
        const lid = p.lessonId?._id || p.lessonId;
        if (lid) {
          if (!map[lid]) map[lid] = [];
          map[lid].push(p.score || 0);
        }
      });
      // Average scores per lesson
      const avgMap = {};
      Object.keys(map).forEach(lid => {
        const scores = map[lid];
        avgMap[lid] = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      });
      setProgressMap(avgMap);
    }).catch(() => {});
  }, [userId]);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const response = await lessonService.getLessons(filter.category, filter.difficulty);
      setLessons(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load lessons');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'daily-life', label: 'Daily Life', icon: '🏠' },
    { value: 'business', label: 'Business', icon: '💼' },
    { value: 'travel', label: 'Travel', icon: '✈️' },
    { value: 'greetings', label: 'Greetings', icon: '👋' },
    { value: 'food', label: 'Food', icon: '🍜' },
    { value: 'shopping', label: 'Shopping', icon: '🛒' },
    { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner', color: '#58cc02' },
    { value: 'intermediate', label: 'Intermediate', color: '#1cb0f6' },
    { value: 'advanced', label: 'Advanced', color: '#a560e8' },
    { value: 'sentences', label: 'Sentences', color: '#ff6b35' },
  ];

  const getCategoryIcon = (categoryValue) => {
    const cat = categories.find(c => c.value === categoryValue);
    return cat ? cat.icon : '📚';
  };

  const getDifficultyColor = (difficultyValue) => {
    const diff = difficulties.find(d => d.value === difficultyValue);
    return diff ? diff.color : '#58cc02';
  };

  return (
    <div className="lessons-container">
      <div className="container">
        {/* Header */}
        <div className="lessons-header">
          <div className="header-content">
            <h1>Korean <span className="text-accent">Lessons</span></h1>
            <p>Learn practical skills you can apply right away</p>
          </div>
          <div className="header-stats">
            <div className="stat-badge">
              <span className="stat-icon">📚</span>
              <span className="stat-text">{lessons.length} lessons available</span>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          <button
            className={`category-pill ${filter.category === '' ? 'active' : ''}`}
            onClick={() => setFilter({ ...filter, category: '' })}
          >
            <span className="pill-icon">🌐</span>
            <span>All</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`category-pill ${filter.category === cat.value ? 'active' : ''}`}
              onClick={() => setFilter({ ...filter, category: cat.value })}
            >
              <span className="pill-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="difficulty-filter">
          <span className="filter-label">Level:</span>
          <div className="difficulty-options">
            <button
              className={`difficulty-btn ${filter.difficulty === '' ? 'active' : ''}`}
              onClick={() => setFilter({ ...filter, difficulty: '' })}
            >
              All Levels
            </button>
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                className={`difficulty-btn ${filter.difficulty === diff.value ? 'active' : ''}`}
                onClick={() => setFilter({ ...filter, difficulty: diff.value })}
                style={{ '--diff-color': diff.color }}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="loading">Loading lessons...</div>
        ) : lessons.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h3>No lessons found</h3>
            <p>Try adjusting your filters or check back soon for new content!</p>
            <button
              className="btn btn-primary"
              onClick={() => setFilter({ category: '', difficulty: '' })}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="lessons-grid">
            {lessons.map((lesson, index) => (
              <Link to={`/lessons/${lesson._id}`} key={lesson._id} className="lesson-card">
                <div className="card-header-row">
                  <div
                    className="lesson-icon"
                    style={{ background: `${getDifficultyColor(lesson.difficulty)}20` }}
                  >
                    <span>{getCategoryIcon(lesson.category)}</span>
                  </div>
                  <span
                    className="difficulty-badge"
                    style={{ background: getDifficultyColor(lesson.difficulty) }}
                  >
                    {lesson.difficulty}
                  </span>
                </div>
                <h3>{lesson.title}</h3>
                <p className="lesson-category">
                  {lesson.category.charAt(0).toUpperCase() + lesson.category.slice(1).replace('-', ' ')}
                </p>
                <div className="lesson-footer">
                  <div className="lesson-meta">
                    <span className="meta-icon">📝</span>
                    <span>{lesson.content.length} items</span>
                  </div>
                  <div className="lesson-progress">
                    <div className="progress-ring">
                      <svg viewBox="0 0 36 36">
                        <path
                          className="progress-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="progress-fill"
                          strokeDasharray={`${progressMap[lesson._id] || 0}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          style={{ stroke: getDifficultyColor(lesson.difficulty) }}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="card-hover-arrow">→</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LessonsPage;
