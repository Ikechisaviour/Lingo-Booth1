import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiBookmark, FiClock, FiMessageCircle, FiSearch, FiTrash2 } from 'react-icons/fi';
import { learningHubService } from '../services/api';
import speechService from '../services/speechService';
import { getTargetTtsLocale } from '../config/languages';
import './ReviewPage.css';

const REVIEW_RESULTS = ['again', 'hard', 'good', 'easy'];

const classResultMeta = (lesson, t) => {
  if (lesson?.category) return lesson.category;
  if (lesson?.lessonType) return t(`classList.tracks.${lesson.lessonType}`, lesson.lessonType);
  return '';
};

const sourceRouteFor = (item) => {
  if (item?.metadata?.route) return item.metadata.route;
  if (item?.sourceType === 'class' && item.sourceRef) return `/class/${item.sourceRef}`;
  if (item?.sourceType === 'quiz' && item.sourceRef) return `/quiz/${item.sourceRef}`;
  if (item?.sourceType === 'flashcard') return '/flashcards';
  if (item?.sourceType === 'writing') return '/writing';
  if (item?.sourceType === 'conversation') return '/conversation';
  return '';
};

const reviewCacheKey = () =>
  `learningHubReview:${localStorage.getItem('nativeLanguage') || ''}:${localStorage.getItem('targetLanguage') || ''}`;

function ReviewPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [overview, setOverview] = useState(null);
  const [libraryItems, setLibraryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyItemId, setBusyItemId] = useState('');
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [notice, setNotice] = useState('');
  const [usingOfflinePack, setUsingOfflinePack] = useState(false);
  const [quickQuizItem, setQuickQuizItem] = useState(null);
  const [quickQuizRevealed, setQuickQuizRevealed] = useState(false);
  const [libraryFilter, setLibraryFilter] = useState('all');

  const loadOverview = useCallback(async () => {
    setLoading(true);
    try {
      const [overviewRes, savedItemsRes] = await Promise.all([
        learningHubService.getOverview(),
        learningHubService.getSavedItems(),
      ]);
      setOverview(overviewRes.data);
      setLibraryItems(savedItemsRes.data || []);
      setUsingOfflinePack(false);
      localStorage.setItem(reviewCacheKey(), JSON.stringify({
        overview: overviewRes.data,
        savedItems: savedItemsRes.data || [],
      }));
    } catch (_) {
      try {
        const cached = JSON.parse(localStorage.getItem(reviewCacheKey()) || 'null');
        if (cached) {
          setOverview(cached.overview || cached);
          setLibraryItems(cached.savedItems || cached.overview?.savedItems || []);
          setUsingOfflinePack(true);
        }
      } catch (_) {}
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOverview().catch(() => {});
  }, [loadOverview]);

  useEffect(() => {
    if (!location.state?.quickQuizItem) return;
    setQuickQuizItem(location.state.quickQuizItem);
    setQuickQuizRevealed(false);
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  const savedItems = libraryItems;
  const dueItems = overview?.reviewQueue?.dueSavedItems || [];
  const unifiedItems = overview?.reviewQueue?.unifiedItems || dueItems.map((item) => ({ kind: 'saved_item', item }));
  const weakAreas = overview?.reviewQueue?.weakAreas || [];
  const corrections = savedItems.filter((item) => item.itemType === 'correction');
  const roleplays = savedItems.filter((item) => item.itemType === 'roleplay');
  const bookmarks = savedItems.filter((item) => item.itemType === 'bookmark');
  const filteredLibraryItems = libraryFilter === 'all'
    ? savedItems
    : savedItems.filter((item) => item.itemType === libraryFilter);
  const reviewBeforeSleep = overview?.reviewBeforeSleep || [];
  const miniSpeakingDrills = overview?.miniSpeakingDrills || [];
  const recentWords = overview?.recentWords || [];
  const studyHistory = overview?.studyHistory || [];
  const hasReviewBeforeSleep = new Date().getHours() >= 18 && reviewBeforeSleep.length > 0;

  const reviewItem = async (itemId, result) => {
    setBusyItemId(itemId);
    try {
      await learningHubService.reviewItem(itemId, result);
      setNotice(t('learningHub.reviewSaved', 'Review saved.'));
      await loadOverview();
    } finally {
      setBusyItemId('');
    }
  };

  const deleteItem = async (itemId) => {
    setBusyItemId(itemId);
    try {
      await learningHubService.deleteItem(itemId);
      setNotice(t('learningHub.itemRemoved', 'Removed from saved study.'));
      await loadOverview();
    } finally {
      setBusyItemId('');
    }
  };

  const runSearch = async (event) => {
    event.preventDefault();
    const nextQuery = query.trim();
    if (!nextQuery) {
      setSearchResult(null);
      return;
    }
    setSearching(true);
    try {
      const res = await learningHubService.search(nextQuery);
      setSearchResult(res.data);
    } finally {
      setSearching(false);
    }
  };

  const askTutor = (item) => {
    const prompt = t('learningHub.askTutorPrompt', {
      text: item.targetText,
      defaultValue: 'Help me practice "{{text}}".',
    });
    navigate(`/conversation?prompt=${encodeURIComponent(prompt)}`);
  };

  const hearTarget = (item) => {
    if (!item?.targetText) return;
    speechService.speak(item.targetText, { lang: getTargetTtsLocale() });
  };

  const skillRows = useMemo(() => Object.entries(overview?.abilityProgress || {}), [overview?.abilityProgress]);

  const openPracticeSurface = (item, surface) => {
    const params = new URLSearchParams({
      savedText: item.targetText || '',
      nativeText: item.nativeText || '',
    });
    if (surface === 'conversation') {
      navigate(`/conversation?prompt=${encodeURIComponent(t('learningHub.askTutorPrompt', {
        text: item.targetText,
        defaultValue: 'Help me practice "{{text}}".',
      }))}`);
      return;
    }
    if (surface === 'writing') {
      navigate(`/writing?${params.toString()}`);
      return;
    }
    if (surface === 'flashcard') {
      navigate(`/flashcards?${params.toString()}`);
      return;
    }
    const route = sourceRouteFor(item);
    navigate(route || '/review');
  };

  const reuseRoleplay = (item) => {
    const params = new URLSearchParams();
    const savedScenario = item?.metadata?.scenarioId || item?.sourceRef || '';
    if (savedScenario) params.set('scenario', savedScenario);
    if (item?.metadata?.customRoleplay) {
      sessionStorage.setItem('lingoSavedRoleplay', JSON.stringify({
        scenarioId: savedScenario || 'custom',
        customRoleplay: item.metadata.customRoleplay,
      }));
    }
    navigate(`/conversation${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const openQuickQuiz = (item) => {
    setQuickQuizItem(item);
    setQuickQuizRevealed(false);
  };

  const renderSavedItem = (item, { reviewable = false } = {}) => {
    const route = sourceRouteFor(item);
    return (
      <article key={item._id} className="review-item-card">
        <div className="review-item-main">
          <strong>{item.targetText}</strong>
          {item.nativeText && <span>{item.nativeText}</span>}
          <small>
            {item.reason || item.sourceLabel || t('learningHub.savedForPractice', 'Saved for later practice')}
          </small>
        </div>
        <div className="review-item-actions">
          {reviewable && REVIEW_RESULTS.map((result) => (
            <button
              type="button"
              key={result}
              onClick={() => reviewItem(item._id, result)}
              disabled={busyItemId === item._id}
            >
              {t(`learningHub.reviewResults.${result}`, result)}
            </button>
          ))}
          <button type="button" onClick={() => askTutor(item)}>
            <FiMessageCircle aria-hidden="true" />
            {t('learningHub.askTutor', 'Ask tutor')}
          </button>
          <button type="button" onClick={() => hearTarget(item)}>
            {t('learningHub.practicePronunciation', 'Listen')}
          </button>
          <button type="button" onClick={() => openPracticeSurface(item, 'writing')}>
            {t('learningHub.practiceWriting', 'Write')}
          </button>
          <button type="button" onClick={() => openPracticeSurface(item, 'flashcard')}>
            {t('learningHub.practiceFlashcard', 'Flashcard')}
          </button>
          <button type="button" onClick={() => openQuickQuiz(item)}>
            {t('learningHub.practiceQuiz', 'Self-test')}
          </button>
          {item.itemType === 'roleplay' && (
            <button type="button" onClick={() => reuseRoleplay(item)}>
              {t('learningHub.useRoleplayAgain', 'Use again')}
            </button>
          )}
          {route && (
            <button type="button" onClick={() => navigate(route)}>
              {t('learningHub.openSource', 'Open source')}
            </button>
          )}
          <button type="button" onClick={() => deleteItem(item._id)} disabled={busyItemId === item._id}>
            <FiTrash2 aria-hidden="true" />
            {t('common.delete')}
          </button>
        </div>
      </article>
    );
  };

  const renderUnifiedItem = (entry) => {
    if (entry.kind === 'saved_item') {
      return renderSavedItem(entry.item, { reviewable: true });
    }
    const area = entry.area;
    return (
      <article key={`weak-${area._id}`} className="review-item-card weak">
        <div className="review-item-main">
          <strong>{area.title || t('learningHub.practiceArea', 'Practice area')}</strong>
          <span>{t(`progress.${area.masteryStatus}`, area.masteryStatus)}</span>
          <small>{t('learningHub.whyWeakArea', 'You are seeing this because this area still needs reinforcement.')}</small>
        </div>
        <div className="review-item-actions">
          {area.lessonId && (
            <button type="button" onClick={() => navigate(`/quiz/${area.lessonId}`)}>
              {t('progress.practice', 'Practice')}
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate(`/conversation?prompt=${encodeURIComponent(t('learningHub.askWeakAreaPrompt', {
              area: area.title || t('learningHub.practiceArea', 'Practice area'),
              defaultValue: 'Help me practice {{area}}.',
            }))}`)}
          >
            <FiMessageCircle aria-hidden="true" />
            {t('learningHub.askTutor', 'Ask tutor')}
          </button>
        </div>
      </article>
    );
  };

  return (
    <main className="review-page">
      <section className="review-hero">
        <div>
          <p>{t('learningHub.kicker', 'Review')}</p>
          <h1>{t('learningHub.title', 'Keep useful learning close')}</h1>
          <span>{t('learningHub.subtitle', 'Review what needs another pass, return to saved items, and continue from one place.')}</span>
        </div>
        <div className="review-count">
          <strong>{dueItems.length}</strong>
          <span>{t('learningHub.dueToday', 'due today')}</span>
        </div>
      </section>

      {notice && <div className="review-notice">{notice}</div>}
      {usingOfflinePack && (
        <div className="review-notice">
          {t('learningHub.offlinePackInUse', 'Showing your recent pack while the connection is weak.')}
        </div>
      )}

      {quickQuizItem && (
        <section className="review-panel review-quick-quiz" aria-label={t('learningHub.quickQuizTitle', 'Quick self-test')}>
          <div>
            <p>{t('learningHub.quickQuizKicker', 'Self-test')}</p>
            <h2>{t('learningHub.quickQuizTitle', 'Quick self-test')}</h2>
          </div>
          <strong>{quickQuizItem.targetText}</strong>
          {quickQuizRevealed ? (
            <>
              <span>{quickQuizItem.nativeText || t('learningHub.quickQuizNoAnswer', 'Recall the meaning, then grade yourself honestly.')}</span>
              <div className="review-item-actions">
                {REVIEW_RESULTS.map((result) => (
                  <button
                    type="button"
                    key={`quick-${result}`}
                    onClick={() => {
                      reviewItem(quickQuizItem._id, result);
                      setQuickQuizItem(null);
                    }}
                    disabled={busyItemId === quickQuizItem._id}
                  >
                    {t(`learningHub.reviewResults.${result}`, result)}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <button type="button" onClick={() => setQuickQuizRevealed(true)}>
              {t('learningHub.revealAnswer', 'Reveal answer')}
            </button>
          )}
          <button type="button" className="review-quick-quiz-close" onClick={() => setQuickQuizItem(null)}>
            {t('common.close', 'Close')}
          </button>
        </section>
      )}

      <section className="review-grid">
        <article className="review-panel">
          <div className="review-panel-head">
            <FiClock aria-hidden="true" />
            <div>
              <h2>{t('learningHub.queueTitle', 'Today\'s review queue')}</h2>
              <p>{t('learningHub.queueWhy', 'These items are here because they are due or were marked for another pass.')}</p>
            </div>
          </div>
          {hasReviewBeforeSleep && (
            <div className="review-before-sleep">
              {t('learningHub.reviewBeforeSleep', 'A short review now will leave tomorrow lighter.')}
            </div>
          )}
          {loading ? (
            <p>{t('common.loading')}</p>
          ) : unifiedItems.length ? (
            <div className="review-item-list">{unifiedItems.map((entry) => renderUnifiedItem(entry))}</div>
          ) : (
            <div className="review-empty">
              <strong>{t('learningHub.queueEmptyTitle', 'Nothing is due right now.')}</strong>
              <span>{t('learningHub.queueEmptyBody', 'Save words, phrases, corrections, or roleplays and they will return here when useful.')}</span>
            </div>
          )}
        </article>

        <aside className="review-side">
          <article className="review-panel compact">
            <h2>{t('learningHub.weakAreasTitle', 'Recent weak areas')}</h2>
            {weakAreas.length ? weakAreas.map((area) => (
              <button
                type="button"
                key={area._id}
                className="review-weak-row"
                onClick={() => navigate(area.lessonId ? `/quiz/${area.lessonId}` : '/review')}
              >
                <strong>{area.title || t('learningHub.practiceArea', 'Practice area')}</strong>
                <span>{t(`progress.${area.masteryStatus}`, area.masteryStatus)}</span>
              </button>
            )) : (
              <p>{t('learningHub.weakAreasEmpty', 'No weak areas have been identified yet.')}</p>
            )}
          </article>

          <article className="review-panel compact">
            <h2>{t('learningHub.abilityTitle', 'Real-world ability progress')}</h2>
            {skillRows.map(([skill, metric]) => (
              <div key={skill} className="review-skill-row">
                <div>
                  <span>{t(`learningHub.skills.${skill}`, skill)}</span>
                  <small>{t(`progress.${metric.level}`, metric.level)}</small>
                  {metric.attempts > 0 && (
                    <small>{t('progress.attempts', { count: metric.attempts })}</small>
                  )}
                </div>
                <strong>{metric.score == null ? metric.recentPractice : `${metric.score}%`}</strong>
              </div>
            ))}
          </article>

          <article className="review-panel compact">
            <h2>{t('learningHub.reviewBeforeSleepTitle', 'Review before sleep')}</h2>
            {reviewBeforeSleep.length ? reviewBeforeSleep.map((entry) => (
              <div key={`${entry.kind}-${entry.item?._id || entry.area?._id}`} className="review-bank-row">
                <span>{entry.item?.targetText || entry.area?.title}</span>
                <strong>{entry.kind === 'saved_item' ? t('learningHub.savedItem', 'Saved') : t('learningHub.weakArea', 'Weak')}</strong>
              </div>
            )) : (
              <p>{t('learningHub.reviewBeforeSleepEmpty', 'Nothing urgent is waiting tonight.')}</p>
            )}
          </article>
        </aside>
      </section>

      <section className="review-panel review-search">
        <form onSubmit={runSearch}>
          <label htmlFor="review-search-input">{t('learningHub.searchLabel', 'Search your learning')}</label>
          <div>
            <FiSearch aria-hidden="true" />
            <input
              id="review-search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('learningHub.searchPlaceholder', 'Search saved items or class lessons')}
            />
            <button type="submit" disabled={searching}>{searching ? t('common.loading') : t('common.search', 'Search')}</button>
          </div>
        </form>
        {searchResult && (
          <div className="review-search-results">
            <div>
              <h3>{t('learningHub.savedResults', 'Saved items')}</h3>
              {(searchResult.savedItems || []).length
                ? searchResult.savedItems.map((item) => renderSavedItem(item))
                : <p>{t('learningHub.noSavedResults', 'No saved items matched.')}</p>}
            </div>
            <div>
              <h3>{t('learningHub.classResults', 'Class lessons')}</h3>
              {(searchResult.classLessons || []).length
                ? searchResult.classLessons.map((lesson) => (
                  <button type="button" key={lesson._id} className="review-search-class" onClick={() => navigate(`/class/${lesson._id}`)}>
                    <strong>{lesson.title}</strong>
                    {classResultMeta(lesson, t) && <span>{classResultMeta(lesson, t)}</span>}
                  </button>
                ))
                : <p>{t('learningHub.noClassResults', 'No class lessons matched.')}</p>}
            </div>
            <div>
              <h3>{t('learningHub.quizResults', 'Quizzes')}</h3>
              {(searchResult.quizzes || []).length
                ? searchResult.quizzes.map((quiz) => (
                  <button type="button" key={quiz._id} className="review-search-class" onClick={() => navigate(`/quiz/${quiz._id}`)}>
                    <strong>{quiz.title}</strong>
                    {quiz.category && <span>{quiz.category}</span>}
                  </button>
                ))
                : <p>{t('learningHub.noQuizResults', 'No quizzes matched.')}</p>}
            </div>
            <div>
              <h3>{t('learningHub.flashcardResults', 'Flashcards')}</h3>
              {(searchResult.flashcards || []).length
                ? searchResult.flashcards.map((card) => (
                  <button
                    type="button"
                    key={card._id}
                    className="review-search-class"
                    onClick={() => openPracticeSurface({
                      targetText: card.targetText,
                      nativeText: card.nativeText,
                    }, 'flashcard')}
                  >
                    <strong>{card.targetText}</strong>
                    {card.nativeText && <span>{card.nativeText}</span>}
                  </button>
                ))
                : <p>{t('learningHub.noFlashcardResults', 'No flashcards matched.')}</p>}
            </div>
          </div>
        )}
      </section>

      <section className="review-library-grid">
        <article className="review-panel">
          <div className="review-library-title">
            <FiBookmark aria-hidden="true" />
            <h2>{t('learningHub.savedLibraryTitle', 'Saved study library')}</h2>
          </div>
          <div className="review-library-filters" role="tablist" aria-label={t('learningHub.savedBanksTitle', 'Saved banks')}>
            {[
              { id: 'all', count: savedItems.length, label: t('common.all', 'All') },
              { id: 'correction', count: corrections.length, label: t('learningHub.correctionsBank', 'Corrections') },
              { id: 'bookmark', count: bookmarks.length, label: t('learningHub.bookmarksBank', 'Bookmarks') },
              { id: 'roleplay', count: roleplays.length, label: t('learningHub.roleplaysBank', 'Roleplays') },
            ].map((filter) => (
              <button
                type="button"
                key={filter.id}
                className={libraryFilter === filter.id ? 'active' : ''}
                onClick={() => setLibraryFilter(filter.id)}
              >
                <span>{filter.label}</span>
                <strong>{filter.count}</strong>
              </button>
            ))}
          </div>
          {filteredLibraryItems.length ? (
            <div className="review-item-list">{filteredLibraryItems.map((item) => renderSavedItem(item))}</div>
          ) : (
            <div className="review-empty">
              <strong>{libraryFilter === 'all'
                ? t('learningHub.savedEmptyTitle', 'Nothing saved yet.')
                : t('learningHub.savedBankEmptyTitle', 'Nothing in this bank yet.')}</strong>
              <span>{libraryFilter === 'all'
                ? t('learningHub.savedEmptyBody', 'Save useful words from class, flashcards, writing, or conversation to build your own study shelf.')
                : t('learningHub.savedBankEmptyBody', 'Items you save for this purpose will gather here.')}</span>
            </div>
          )}
        </article>

        <article className="review-panel compact">
          <h2>{t('learningHub.savedBanksTitle', 'Saved banks')}</h2>
          <div className="review-bank-row"><span>{t('learningHub.correctionsBank', 'Corrections')}</span><strong>{corrections.length}</strong></div>
          <div className="review-bank-row"><span>{t('learningHub.roleplaysBank', 'Roleplays')}</span><strong>{roleplays.length}</strong></div>
          <div className="review-bank-row"><span>{t('learningHub.bookmarksBank', 'Bookmarks')}</span><strong>{bookmarks.length}</strong></div>
        </article>
      </section>

      <section className="review-panel">
        <h2>{t('learningHub.recentMistakesTitle', 'Recent mistakes')}</h2>
        <p>{t('learningHub.recentMistakesBody', 'These are recent missed items worth retrying while the correction is still fresh.')}</p>
        {corrections.length ? (
          <div className="review-item-list">
            {corrections.slice(0, 6).map((item) => renderSavedItem(item, { reviewable: true }))}
          </div>
        ) : (
          <div className="review-empty">
            <strong>{t('learningHub.recentMistakesEmptyTitle', 'No recent mistakes saved.')}</strong>
            <span>{t('learningHub.recentMistakesEmptyBody', 'Missed quiz items will appear here so you can retry them quickly.')}</span>
          </div>
        )}
      </section>

      <section className="review-panel">
        <h2>{t('learningHub.studyHistoryTitle', 'Study history')}</h2>
        {studyHistory.length ? (
          <div className="review-study-history">
            {studyHistory.map((day) => (
              <div key={day.day}>
                <strong>{day.events}</strong>
                <span>{day.day.slice(5)}</span>
                <small>{t('learningHub.pointsCount', { count: day.points, defaultValue: '{{count}} points' })}</small>
              </div>
            ))}
          </div>
        ) : (
          <p>{t('learningHub.studyHistoryEmpty', 'Your study days will gather here as you practice.')}</p>
        )}
      </section>

      <section className="review-library-grid">
        <article className="review-panel">
          <h2>{t('learningHub.miniSpeakingTitle', 'Mini speaking drills')}</h2>
          {miniSpeakingDrills.length ? (
            <div className="review-item-list">
              {miniSpeakingDrills.map((item) => (
                <article key={`drill-${item._id}`} className="review-item-card">
                  <div className="review-item-main">
                    <strong>{item.targetText}</strong>
                    {item.nativeText && <span>{item.nativeText}</span>}
                    <small>{t('learningHub.miniSpeakingReason', 'Short speaking practice from a saved phrase or correction.')}</small>
                  </div>
                  <div className="review-item-actions">
                    <button type="button" onClick={() => openPracticeSurface(item, 'conversation')}>
                      {t('learningHub.practiceSpeaking', 'Speak')}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>{t('learningHub.miniSpeakingEmpty', 'Corrections and saved phrases will become quick speaking drills here.')}</p>
          )}
        </article>

        <article className="review-panel compact">
          <h2>{t('learningHub.recentWordsTitle', 'Recent words')}</h2>
          {recentWords.length ? recentWords.map((item) => (
            <div key={`${item.targetText}-${item.occurredAt || ''}`} className="review-bank-row">
              <span>{item.targetText}</span>
              <strong>{item.nativeText || item.sourceLabel || ''}</strong>
            </div>
          )) : (
            <p>{t('learningHub.recentWordsEmpty', 'New words from class and conversation will gather here.')}</p>
          )}
        </article>
      </section>

      <section className="review-library-grid">
        <article className="review-panel">
          <h2>{t('learningHub.correctionsBank', 'Corrections')}</h2>
          {corrections.length ? <div className="review-item-list">{corrections.map((item) => renderSavedItem(item))}</div> : <p>{t('learningHub.correctionsEmpty', 'Saved corrections will collect here for quick retry.')}</p>}
        </article>
        <article className="review-panel">
          <h2>{t('learningHub.roleplaysBank', 'Roleplays')}</h2>
          {roleplays.length ? <div className="review-item-list">{roleplays.map((item) => renderSavedItem(item))}</div> : <p>{t('learningHub.roleplaysEmpty', 'Saved roleplays will appear here when you want to reuse them.')}</p>}
        </article>
      </section>
    </main>
  );
}

export default ReviewPage;
