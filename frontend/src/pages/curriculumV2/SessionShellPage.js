import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { curriculumV2Service } from '../../services/api';
import { isFeatureEnabled, FEATURE_FLAGS } from '../../config/featureFlags';
import { makeSessionId } from './sessionId';

import ContrastNotePage      from './lessonTypes/ContrastNotePage';
import PatternLessonPage     from './lessonTypes/PatternLessonPage';
import ClozeLessonPage       from './lessonTypes/ClozeLessonPage';
import StoryLessonPage       from './lessonTypes/StoryLessonPage';
import VocabDeckPage         from './lessonTypes/VocabDeckPage';
import PronunciationTaskPage from './lessonTypes/PronunciationTaskPage';
import MinimalPairTaskPage   from './lessonTypes/MinimalPairTaskPage';

import './curriculumV2.css';

const COMPONENT_MAP = {
  ContrastNote:      ContrastNotePage,
  PatternLesson:     PatternLessonPage,
  ClozeLesson:       ClozeLessonPage,
  StoryLesson:       StoryLessonPage,
  VocabDeck:         VocabDeckPage,
  PronunciationTask: PronunciationTaskPage,
  MinimalPairTask:   MinimalPairTaskPage,
};

export default function SessionShellPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const enabled = useMemo(() => isFeatureEnabled(FEATURE_FLAGS.CURRICULUM_V2), []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plan, setPlan] = useState({ sequence: [], totalMinutes: 0, reviewsSelected: 0, boostsApplied: [] });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [doneIds, setDoneIds] = useState(new Set());
  const [showRomanization, setShowRomanization] = useState(() => localStorage.getItem('showRomanization') === 'true');
  const sessionId = useMemo(() => makeSessionId(), []);

  // Hangul gate — Korean learners must finish onboarding before A1 grammar.
  // Once finished, the link stays available as a refresher.
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    (async () => {
      try {
        const { data } = await curriculumV2Service.getHangulProgress();
        if (!cancelled && !data?.onboardingCompletedAt) {
          navigate('/learn/v2/hangul', { replace: true });
        }
      } catch (_) {
        // If the check fails (no backend, no auth, etc.) we don't block
        // the learner — they can still try to load grammar.
      }
    })();
    return () => { cancelled = true; };
  }, [enabled, navigate]);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const { data } = await curriculumV2Service.getPlan({ targetMinutes: 30, targetLang: 'ko' });
        if (!cancelled) {
          setPlan(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || err.message);
          setLoading(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [enabled]);

  const toggleRomanization = useCallback(() => {
    setShowRomanization((prev) => {
      const next = !prev;
      localStorage.setItem('showRomanization', String(next));
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('show-romanization', next);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    document.documentElement.classList.toggle('show-romanization', showRomanization);
    return () => document.documentElement.classList.remove('show-romanization');
  }, [showRomanization]);

  const handleLessonComplete = useCallback(async () => {
    const lesson = plan.sequence[currentIdx];
    if (!lesson) return;
    try {
      await curriculumV2Service.markComplete(lesson.id);
    } catch (err) {
      console.warn('Failed to persist completion (will continue locally):', err);
    }
    setDoneIds((prev) => new Set(prev).add(lesson.id));
    setCurrentIdx((i) => i + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [plan.sequence, currentIdx]);

  if (!enabled) {
    return (
      <div className="v2-shell">
        <div className="v2-card">
          <h2>{t('curriculumV2.notEnabledTitle', "Curriculum v2 isn't enabled for your account.")}</h2>
          <p>{t('curriculumV2.notEnabledBody', 'This is a pilot feature. Pilot users opt in via:')}</p>
          <pre style={{ background: '#f3f4f6', padding: 12, borderRadius: 8, overflow: 'auto' }}>
{`localStorage.setItem('featureFlags', JSON.stringify({ curriculumV2: true }))`}
          </pre>
          <button className="v2-btn v2-btn--secondary" onClick={() => navigate('/')}>{t('curriculumV2.backHome', 'Back to home')}</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="v2-shell">
        <div className="v2-card"><p>{t('curriculumV2.loadingSession', 'Building your session...')}</p></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="v2-shell">
        <div className="v2-card">
          <h2>{t('curriculumV2.loadFailedTitle', "Couldn't load your session")}</h2>
          <p className="v2-native">{error}</p>
          <button className="v2-btn v2-btn--secondary" onClick={() => navigate('/')}>{t('curriculumV2.backHome', 'Back to home')}</button>
        </div>
      </div>
    );
  }

  if (plan.sequence.length === 0) {
    return (
      <div className="v2-shell">
        <div className="v2-card">
          <h2>{t('curriculumV2.noLessonsTitle', 'No lessons available.')}</h2>
          <p className="v2-native">{t('curriculumV2.noLessonsBody', "Curriculum v2 content hasn't been seeded for your target language yet.")}</p>
        </div>
      </div>
    );
  }

  const finished = currentIdx >= plan.sequence.length;

  if (finished) {
    return (
      <div className="v2-shell">
        <div className="v2-card">
          <h2>{t('curriculumV2.sessionCompleteTitle', 'Session complete')}</h2>
          <p>
            {t('curriculumV2.sessionCompleteBody', 'You finished {{count}} lessons in about {{minutes}} minutes.', {
              count: plan.sequence.length,
              minutes: plan.totalMinutes,
            })}
          </p>
          <div className="v2-footer">
            <button className="v2-btn v2-btn--secondary" onClick={() => navigate('/')}>{t('curriculumV2.home', 'Home')}</button>
            <button className="v2-btn v2-btn--primary" onClick={() => window.location.reload()}>{t('curriculumV2.startAnother', 'Start another session')}</button>
          </div>
        </div>
      </div>
    );
  }

  const lesson = plan.sequence[currentIdx];
  const Component = COMPONENT_MAP[lesson.lessonType];

  return (
    <div className="v2-shell">
      <div className="v2-shell__header-actions">
        <button
          type="button"
          className="v2-shell__action-btn"
          onClick={() => navigate('/learn/v2/hangul?mode=refresher')}
          aria-label={t('curriculumV2.hangulRefresher', 'Review Hangul')}
        >
          {t('curriculumV2.hangulRefresher', 'Review Hangul')}
        </button>
        <label className="v2-shell__toggle">
          <input
            type="checkbox"
            checked={showRomanization}
            onChange={toggleRomanization}
          />
          <span>{t('curriculumV2.showRomanization', 'Show romanization')}</span>
        </label>
      </div>
      <div className="v2-shell__progress">
        {plan.sequence.map((l, i) => {
          const cls = doneIds.has(l.id) ? 'is-done' : i === currentIdx ? 'is-current' : '';
          return <div key={l.id} className={`v2-shell__progress-cell ${cls}`} title={l.lessonType} />;
        })}
      </div>
      <div className="v2-shell__meta">
        {t('curriculumV2.stepMeta', 'Step {{current}} of {{total}} · {{type}}', {
          current: currentIdx + 1,
          total: plan.sequence.length,
          type: lesson.lessonType,
        })}
      </div>

      {currentIdx === 0 && (plan.reviewsSelected > 0 || (plan.boostsApplied && plan.boostsApplied.length > 0)) && (
        <div className="v2-banner" style={{ background: '#eff6ff', borderColor: '#bfdbfe', color: '#1e40af' }}>
          {plan.reviewsSelected > 0 && (
            <div>
              {t('curriculumV2.session.reviewsBanner', 'This session includes {{count}} review item(s) from your earlier sessions.', {
                count: plan.reviewsSelected,
              })}
            </div>
          )}
          {plan.boostsApplied && plan.boostsApplied.length > 0 && (
            <div style={{ marginTop: 4 }}>
              {t('curriculumV2.session.boostsBanner', '{{count}} concept(s) surfaced from your recent practice context.', {
                count: plan.boostsApplied.length,
              })}
            </div>
          )}
        </div>
      )}

      {Component
        ? <Component lesson={lesson} onComplete={handleLessonComplete} learnerLevel={plan.learnerLevel} sessionId={sessionId} />
        : <div className="v2-card">{t('curriculumV2.unknownLessonType', 'Unknown lesson type:')} <code>{lesson.lessonType}</code></div>}
    </div>
  );
}
