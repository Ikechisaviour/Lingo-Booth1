import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { quizService, progressService } from '../services/api';
import { getTargetLangName, getTargetLangCode } from '../config/languages';
import './QuizPage.css';

function QuizPage() {
  const { t } = useTranslation();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ category: '', difficulty: '' });
  const [progressMap, setProgressMap] = useState({});
  const [customizeMode, setCustomizeMode] = useState(false);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // Clear any active playlist when arriving on QuizPage
  useEffect(() => {
    sessionStorage.removeItem('quizPlaylist');
  }, []);

  // Track target language to re-fetch when it changes
  const [targetLang, setTargetLang] = useState(localStorage.getItem('targetLanguage') || 'ko');

  useEffect(() => {
    const onStorage = () => {
      const lang = localStorage.getItem('targetLanguage') || 'ko';
      setTargetLang(prev => prev !== lang ? lang : prev);
    };
    window.addEventListener('storage', onStorage);
    // Also check on focus (same-tab changes)
    window.addEventListener('focus', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onStorage);
    };
  }, []);

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, targetLang]);

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

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await quizService.getQuizzes(filter.category, filter.difficulty);
      setQuizzes(response.data);
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

  const buildStartAllPlaylist = (quizList) => {
    const sorted = [...quizList].sort((a, b) => {
      const diffA = difficultyOrder.indexOf(a.difficulty);
      const diffB = difficultyOrder.indexOf(b.difficulty);
      if (diffA !== diffB) return diffA - diffB;
      const catA = categoryOrder.indexOf(a.category);
      const catB = categoryOrder.indexOf(b.category);
      return catA - catB;
    });
    return sorted.map(q => q._id);
  };

  const handleStartAll = () => {
    const ids = buildStartAllPlaylist(quizzes);
    if (ids.length === 0) return;
    const playlist = {
      type: 'start-all',
      quizIds: ids,
      currentIndex: 0,
      totalCount: ids.length,
    };
    sessionStorage.setItem('quizPlaylist', JSON.stringify(playlist));
    navigate(`/quiz/${ids[0]}`);
  };

  const handleToggleCustomize = () => {
    if (customizeMode) {
      setSelectedQuizzes([]);
    }
    setCustomizeMode(!customizeMode);
  };

  const handleCardClick = (e, quizId) => {
    if (!customizeMode) return;
    e.preventDefault();
    setSelectedQuizzes(prev => {
      if (prev.includes(quizId)) {
        return prev.filter(id => id !== quizId);
      }
      return [...prev, quizId];
    });
  };

  const handleStartCustom = () => {
    if (selectedQuizzes.length === 0) return;
    const playlist = {
      type: 'custom',
      quizIds: selectedQuizzes,
      currentIndex: 0,
      totalCount: selectedQuizzes.length,
    };
    sessionStorage.setItem('quizPlaylist', JSON.stringify(playlist));
    navigate(`/quiz/${selectedQuizzes[0]}`);
  };

  return (
    <div className="lessons-container">
      <div className="container">
        {/* Hero Header */}
        <div className="lessons-hero">
          <div className="hero-text">
            <h1>
              {t(`languages.${getTargetLangCode()}`, getTargetLangName())} <span className="text-accent">Quiz</span>
            </h1>
            <p>Choose a quiz and answer practice questions.</p>
            <span className="hero-stat">&#128221; {quizzes.length} quizzes available</span>
          </div>
          <div className="hero-actions">
            {!customizeMode && quizzes.length > 0 && filter.category === '' && filter.difficulty === '' && (
              <button className="btn btn-primary hero-start-btn" onClick={handleStartAll}>
                ▶ {t('lessons.startAll')}
              </button>
            )}
            {quizzes.length > 0 && (
              <button
                className={`btn ${customizeMode ? 'btn-active' : 'btn-outline'} hero-action-btn`}
                onClick={handleToggleCustomize}
              >
                {customizeMode ? `✕ ${t('lessons.exitCustomize')}` : `✏️ ${t('lessons.customizePath')}`}
              </button>
            )}
          </div>
        </div>

        {/* Customize bar — only when selecting */}
        {customizeMode && (
          <div className="customize-bar">
            {selectedQuizzes.length > 0 ? (
              <>
                <span className="customize-count">
                  {t('lessons.selectedCount', { count: selectedQuizzes.length })}
                </span>
                <button className="btn btn-primary" onClick={handleStartCustom}>
                  ▶ {t('lessons.startCustomPath', { count: selectedQuizzes.length })}
                </button>
                <button className="btn btn-outline" onClick={() => setSelectedQuizzes([])}>
                  {t('lessons.clearSelection')}
                </button>
              </>
            ) : (
              <span className="customize-hint">{t('lessons.customizeHint')}</span>
            )}
          </div>
        )}

        {/* Filters */}
        <div className="filter-bar">
          <div className="filter-group">
            <span className="filter-label">{t('lessons.category', 'Category')}</span>
            <div className="filter-pills">
              <button
                className={`filter-pill ${filter.category === '' ? 'active' : ''}`}
                onClick={() => setFilter({ ...filter, category: '' })}
              >
                <span className="pill-icon">🌐</span>
                <span>{t('lessons.all')}</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  className={`filter-pill ${filter.category === cat.value ? 'active' : ''}`}
                  onClick={() => setFilter({ ...filter, category: cat.value })}
                >
                  <span className="pill-icon">{cat.icon}</span>
                  <span>{t(`lessons.categories.${cat.value}`)}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="filter-label">{t('lessons.level', 'Level')}</span>
            <div className="filter-pills">
              {difficulties.map((diff) => (
                <button
                  key={diff.value}
                  className={`filter-pill diff-pill ${filter.difficulty === diff.value ? 'active' : ''}`}
                  onClick={() => setFilter({ ...filter, difficulty: filter.difficulty === diff.value ? '' : diff.value })}
                  style={{ '--pill-color': diff.color }}
                >
                  <span className="diff-dot" style={{ background: diff.color }} />
                  {t(`lessons.difficulties.${diff.value}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        {/* Content */}
        {loading ? (
          <div className="lessons-skeleton">
            {[...Array(6)].map((_, i) => (
              <div className="skeleton-card" key={i}>
                <div className="skeleton-bar" />
                <div className="skeleton-body">
                  <div className="skeleton-line wide" />
                  <div className="skeleton-line medium" />
                  <div className="skeleton-line narrow" />
                </div>
              </div>
            ))}
          </div>
        ) : quizzes.length === 0 ? (
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
            {quizzes.map((quiz, index) => {
              const selIdx = selectedQuizzes.indexOf(quiz._id);
              const isSelected = selIdx !== -1;
              const diffColor = getDifficultyColor(quiz.difficulty);
              const progress = progressMap[quiz._id] || 0;

              return (
                <Link
                  to={`/quiz/${quiz._id}`}
                  key={quiz._id}
                  className={`lesson-card${customizeMode && isSelected ? ' selected' : ''}`}
                  onClick={(e) => handleCardClick(e, quiz._id)}
                  style={{ '--card-accent': diffColor, animationDelay: `${index * 0.04}s` }}
                >
                  {customizeMode && isSelected && (
                    <span className="selection-badge">{selIdx + 1}</span>
                  )}

                  <div className="card-accent-bar" />

                  <div className="card-body">
                    <div className="card-top">
                      <div className="lesson-icon" style={{ background: `${diffColor}15` }}>
                        <span>{getCategoryIcon(quiz.category)}</span>
                      </div>
                      <span className="difficulty-tag" style={{ color: diffColor, background: `${diffColor}12` }}>
                        {t(`lessons.difficulties.${quiz.difficulty}`)}
                      </span>
                    </div>

                    <h3>{quiz.title}</h3>
                    <p className="lesson-category">
                      {t(`lessons.categories.${quiz.category}`)}
                    </p>

                    <div className="card-bottom">
                      <div className="lesson-meta">
                        <span>📝 {t('lessons.items', { count: quiz.content.length })}</span>
                      </div>
                      <div className="progress-section">
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{ width: `${progress}%`, background: diffColor }}
                          />
                        </div>
                        {progress > 0 && (
                          <span className="progress-pct" style={{ color: diffColor }}>{progress}%</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-hover-arrow">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
