import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { lessonService, progressService } from '../services/api';
import { getTargetLangName } from '../config/languages';
import './LessonsPage.css';

function LessonsPage() {
  const { t } = useTranslation();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ category: '', difficulty: '' });
  const [progressMap, setProgressMap] = useState({});
  const [customizeMode, setCustomizeMode] = useState(false);
  const [selectedLessons, setSelectedLessons] = useState([]);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // Clear any active playlist when arriving on LessonsPage
  useEffect(() => {
    sessionStorage.removeItem('lessonPlaylist');
  }, []);

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
      setError(t('lessons.failedToLoad'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'daily-life', icon: '🏠' },
    { value: 'business', icon: '💼' },
    { value: 'travel', icon: '✈️' },
    { value: 'greetings', icon: '👋' },
    { value: 'food', icon: '🍜' },
    { value: 'shopping', icon: '🛒' },
    { value: 'healthcare', icon: '🏥' },
  ];

  const difficulties = [
    { value: 'beginner', color: '#58cc02' },
    { value: 'intermediate', color: '#1cb0f6' },
    { value: 'advanced', color: '#a560e8' },
    { value: 'sentences', color: '#ff6b35' },
  ];

  const getCategoryIcon = (categoryValue) => {
    const cat = categories.find(c => c.value === categoryValue);
    return cat ? cat.icon : '📚';
  };

  const getDifficultyColor = (difficultyValue) => {
    const diff = difficulties.find(d => d.value === difficultyValue);
    return diff ? diff.color : '#58cc02';
  };

  const difficultyOrder = ['beginner', 'intermediate', 'advanced', 'sentences'];
  const categoryOrder = ['daily-life', 'business', 'travel', 'greetings', 'food', 'shopping', 'healthcare'];

  const buildStartAllPlaylist = (lessonList) => {
    const sorted = [...lessonList].sort((a, b) => {
      const diffA = difficultyOrder.indexOf(a.difficulty);
      const diffB = difficultyOrder.indexOf(b.difficulty);
      if (diffA !== diffB) return diffA - diffB;
      const catA = categoryOrder.indexOf(a.category);
      const catB = categoryOrder.indexOf(b.category);
      return catA - catB;
    });
    return sorted.map(l => l._id);
  };

  const handleStartAll = () => {
    const ids = buildStartAllPlaylist(lessons);
    if (ids.length === 0) return;
    const playlist = {
      type: 'start-all',
      lessonIds: ids,
      currentIndex: 0,
      totalCount: ids.length,
    };
    sessionStorage.setItem('lessonPlaylist', JSON.stringify(playlist));
    navigate(`/lessons/${ids[0]}`);
  };

  const handleToggleCustomize = () => {
    if (customizeMode) {
      setSelectedLessons([]);
    }
    setCustomizeMode(!customizeMode);
  };

  const handleCardClick = (e, lessonId) => {
    if (!customizeMode) return;
    e.preventDefault();
    setSelectedLessons(prev => {
      if (prev.includes(lessonId)) {
        return prev.filter(id => id !== lessonId);
      }
      return [...prev, lessonId];
    });
  };

  const handleStartCustom = () => {
    if (selectedLessons.length === 0) return;
    const playlist = {
      type: 'custom',
      lessonIds: selectedLessons,
      currentIndex: 0,
      totalCount: selectedLessons.length,
    };
    sessionStorage.setItem('lessonPlaylist', JSON.stringify(playlist));
    navigate(`/lessons/${selectedLessons[0]}`);
  };

  return (
    <div className="lessons-container">
      <div className="container">
        {/* Header */}
        <div className="lessons-header">
          <div className="header-content">
            <h1>
              <Trans i18nKey="lessons.title" values={{ language: getTargetLangName() }}>
                {getTargetLangName()} <span className="text-accent">Lessons</span>
              </Trans>
            </h1>
            <p>{t('lessons.subtitle')}</p>
          </div>
          <div className="header-stats">
            <div className="stat-badge">
              <span className="stat-icon">📚</span>
              <span className="stat-text">{t('lessons.lessonsAvailable', { count: lessons.length })}</span>
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
            <span>{t('lessons.all')}</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`category-pill ${filter.category === cat.value ? 'active' : ''}`}
              onClick={() => setFilter({ ...filter, category: cat.value })}
            >
              <span className="pill-icon">{cat.icon}</span>
              <span>{t(`lessons.categories.${cat.value}`)}</span>
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="difficulty-filter">
          <span className="filter-label">{t('lessons.level')}</span>
          <div className="difficulty-options">
            <button
              className={`difficulty-btn ${filter.difficulty === '' ? 'active' : ''}`}
              onClick={() => setFilter({ ...filter, difficulty: '' })}
            >
              {t('lessons.allLevels')}
            </button>
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                className={`difficulty-btn ${filter.difficulty === diff.value ? 'active' : ''}`}
                onClick={() => setFilter({ ...filter, difficulty: diff.value })}
                style={{ '--diff-color': diff.color }}
              >
                {t(`lessons.difficulties.${diff.value}`)}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        {/* Start All Banner */}
        {!loading && lessons.length > 0 && filter.category === '' && filter.difficulty === '' && !customizeMode && (
          <div className="playlist-action-bar">
            <div className="playlist-action-info">
              <span className="playlist-action-icon">🎯</span>
              <div>
                <strong>{t('lessons.studyAll', { count: lessons.length })}</strong>
                <p>{t('lessons.studyAllDesc')}</p>
              </div>
            </div>
            <button className="btn btn-primary playlist-start-btn" onClick={handleStartAll}>
              {t('lessons.startAll')} →
            </button>
          </div>
        )}

        {/* Customize Path Toolbar */}
        {!loading && lessons.length > 0 && (
          <div className="customize-toolbar">
            <button
              className={`btn ${customizeMode ? 'btn-active' : 'btn-outline'} customize-toggle-btn`}
              onClick={handleToggleCustomize}
            >
              {customizeMode ? `✕ ${t('lessons.exitCustomize')}` : `✏️ ${t('lessons.customizePath')}`}
            </button>
            {customizeMode && (
              <>
                {selectedLessons.length > 0 && (
                  <button className="btn btn-primary playlist-start-btn" onClick={handleStartCustom}>
                    {t('lessons.startCustomPath', { count: selectedLessons.length })} →
                  </button>
                )}
                {selectedLessons.length > 0 && (
                  <button className="btn btn-outline" onClick={() => setSelectedLessons([])}>
                    {t('lessons.clearSelection')}
                  </button>
                )}
                {selectedLessons.length === 0 && (
                  <span className="customize-hint">{t('lessons.customizeHint')}</span>
                )}
              </>
            )}
          </div>
        )}

        {loading ? (
          <div className="loading">{t('lessons.loadingLessons')}</div>
        ) : lessons.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h3>{t('lessons.noLessons')}</h3>
            <p>{t('lessons.noLessonsHint')}</p>
            <button
              className="btn btn-primary"
              onClick={() => setFilter({ category: '', difficulty: '' })}
            >
              {t('lessons.clearFilters')}
            </button>
          </div>
        ) : (
          <div className="lessons-grid">
            {lessons.map((lesson, index) => {
              const selIdx = selectedLessons.indexOf(lesson._id);
              const isSelected = selIdx !== -1;
              return (
                <Link
                  to={`/lessons/${lesson._id}`}
                  key={lesson._id}
                  className={`lesson-card${customizeMode && isSelected ? ' selected' : ''}`}
                  onClick={(e) => handleCardClick(e, lesson._id)}
                >
                  {customizeMode && isSelected && (
                    <span className="selection-badge">{selIdx + 1}</span>
                  )}
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
                      {t(`lessons.difficulties.${lesson.difficulty}`)}
                    </span>
                  </div>
                  <h3>{lesson.title}</h3>
                  <p className="lesson-category">
                    {t(`lessons.categories.${lesson.category}`)}
                  </p>
                  <div className="lesson-footer">
                    <div className="lesson-meta">
                      <span className="meta-icon">📝</span>
                      <span>{t('lessons.items', { count: lesson.content.length })}</span>
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default LessonsPage;
