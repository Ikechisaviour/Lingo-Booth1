import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiChevronLeft, FiChevronRight, FiSkipForward } from 'react-icons/fi';
import { curriculumV2Service } from '../../services/api';
import PlayableKorean from '../../components/PlayableKorean';
import './HangulOnboardingPage.css';

function HangulOnboardingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refresherMode = searchParams.get('mode') === 'refresher';

  const [groups, setGroups] = useState([]);
  const [progress, setProgress] = useState({ completedGroups: [], onboardingCompletedAt: null });
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skipping, setSkipping] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([curriculumV2Service.getHangulGroups(), curriculumV2Service.getHangulProgress()])
      .then(([groupsRes, progressRes]) => {
        if (!active) return;
        setGroups(groupsRes.data?.groups || []);
        const initialProgress = progressRes.data || { completedGroups: [], onboardingCompletedAt: null };
        setProgress(initialProgress);
        // Resume at the first incomplete group, or stay at 0 for refresher mode.
        if (!refresherMode && initialProgress.completedGroups?.length) {
          const sortedGroups = (groupsRes.data?.groups || []).slice().sort((a, b) => a.order - b.order);
          const firstIncomplete = sortedGroups.findIndex((g) => !initialProgress.completedGroups.includes(g.id));
          if (firstIncomplete >= 0) setActiveIdx(firstIncomplete);
        }
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.message || t('hangul.loadFailed', 'Could not load Hangul lessons.'));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [refresherMode, t]);

  const sortedGroups = useMemo(
    () => groups.slice().sort((a, b) => a.order - b.order),
    [groups],
  );
  const activeGroup = sortedGroups[activeIdx] || null;
  const isCompletedGroup = (id) => (progress.completedGroups || []).includes(id);

  const handleSkip = useCallback(async () => {
    const ok = window.confirm(
      t(
        'hangul.skipConfirm',
        'Skip Hangul onboarding? You can come back any time from the session header.',
      ),
    );
    if (!ok) return;
    setSkipping(true);
    setError('');
    try {
      await curriculumV2Service.skipHangul();
      navigate('/learn/v2');
    } catch (err) {
      setError(err.response?.data?.message || t('hangul.saveFailed', 'Could not save progress.'));
      setSkipping(false);
    }
  }, [navigate, t]);

  const completeAndAdvance = useCallback(async () => {
    if (!activeGroup) return;
    setSaving(true);
    setError('');
    try {
      const res = await curriculumV2Service.completeHangulGroup(activeGroup.id);
      setProgress({
        completedGroups: res.data?.completedGroups || [],
        onboardingCompletedAt: res.data?.onboardingCompletedAt || null,
      });
      if (activeIdx < sortedGroups.length - 1) {
        setActiveIdx(activeIdx + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (res.data?.onboardingComplete && !refresherMode) {
        // Finished the final group — go straight into A1 grammar.
        navigate('/learn/v2');
      }
    } catch (err) {
      setError(err.response?.data?.message || t('hangul.saveFailed', 'Could not save progress.'));
    } finally {
      setSaving(false);
    }
  }, [activeGroup, activeIdx, sortedGroups.length, navigate, refresherMode, t]);

  if (loading) {
    return <div className="hangul-page"><div className="hangul-loading">{t('common.loading', 'Loading…')}</div></div>;
  }

  if (!sortedGroups.length) {
    return (
      <div className="hangul-page">
        <p className="hangul-error">{error || t('hangul.empty', 'No Hangul content available.')}</p>
      </div>
    );
  }

  return (
    <main className="hangul-page">
      <header className="hangul-header">
        <button type="button" className="hangul-link" onClick={() => navigate('/learn/v2')}>
          <FiChevronLeft /> {t('hangul.backToLearn', 'Back to Learn')}
        </button>
        <p className="hangul-kicker">
          {refresherMode ? t('hangul.refresherKicker', 'Hangul refresher') : t('hangul.onboardingKicker', 'Hangul onboarding')}
        </p>
        <h1>{t('hangul.title', 'Read Korean')}</h1>
        <p className="hangul-subtitle">
          {t('hangul.subtitle', 'Eight short lessons. Hear every letter, learn how blocks build syllables, then read real words.')}
        </p>
        {!refresherMode && !progress.onboardingCompletedAt && (
          <button
            type="button"
            className="hangul-skip"
            onClick={handleSkip}
            disabled={skipping || saving}
          >
            <FiSkipForward /> {skipping
              ? t('common.saving', 'Saving…')
              : t('hangul.alreadyKnow', 'I already read Hangul — skip')}
          </button>
        )}
      </header>

      <nav className="hangul-progress-track" aria-label={t('hangul.progressLabel', 'Progress')}>
        {sortedGroups.map((g, idx) => (
          <button
            key={g.id}
            type="button"
            className={`hangul-progress-step ${idx === activeIdx ? 'active' : ''} ${isCompletedGroup(g.id) ? 'done' : ''}`}
            onClick={() => setActiveIdx(idx)}
            title={g.title}
          >
            {isCompletedGroup(g.id) ? <FiCheckCircle /> : g.order}
          </button>
        ))}
      </nav>

      {error && <div className="hangul-error">{error}</div>}

      {activeGroup && (
        <article className="hangul-card">
          <header className="hangul-card-head">
            <span className="hangul-card-tag">{t('hangul.stepN', 'Step {{step}} of {{total}}', { step: activeIdx + 1, total: sortedGroups.length })}</span>
            <h2>{activeGroup.title}</h2>
            <p className="hangul-card-subtitle">{activeGroup.subtitle}</p>
          </header>

          {(activeGroup.kind === 'vowels' || activeGroup.kind === 'consonants') && (
            <div className="hangul-jamo-grid">
              {(activeGroup.jamo || []).map((j) => (
                <div key={j.jamo} className="hangul-jamo-card">
                  <div className="hangul-jamo-letter">
                    <PlayableKorean text={j.examples?.[0]?.word || j.jamo} ariaLabel={t('hangul.play', 'Play')} />
                    <strong>{j.jamo}</strong>
                    <small>{j.romanization}</small>
                  </div>
                  <p className="hangul-jamo-sound">{j.sound}</p>
                  {Array.isArray(j.examples) && j.examples.length > 0 && (
                    <ul className="hangul-jamo-examples">
                      {j.examples.map((ex) => (
                        <li key={ex.word}>
                          <PlayableKorean text={ex.word} ariaLabel={t('hangul.play', 'Play')} />
                          <strong>{ex.word}</strong>
                          <span>{ex.native}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {j.tips && <p className="hangul-jamo-tips">{j.tips}</p>}
                </div>
              ))}
            </div>
          )}

          {activeGroup.kind === 'structure' && (
            <div className="hangul-structure">
              <ol className="hangul-structure-notes">
                {(activeGroup.structureNotes || []).map((note, i) => <li key={i}>{note}</li>)}
              </ol>
              <div className="hangul-structure-examples">
                {(activeGroup.examples || []).map((ex) => (
                  <div key={ex.syllable} className="hangul-structure-example">
                    <PlayableKorean text={ex.syllable} ariaLabel={t('hangul.play', 'Play')} />
                    <strong>{ex.syllable}</strong>
                    <small>{ex.sound}</small>
                    <p>{ex.breakdown}</p>
                    <em>{ex.meaning}</em>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeGroup.kind === 'practice' && (
            <div className="hangul-practice">
              <p className="hangul-practice-instructions">
                {t('hangul.practiceInstructions', 'Read each word aloud before peeking. Tap the speaker to compare.')}
              </p>
              {[1, 2, 3, 4].map((tier) => (
                <div key={tier} className="hangul-practice-tier">
                  <h3>{t('hangul.tier', 'Tier {{tier}}', { tier })}</h3>
                  <ul>
                    {(activeGroup.practice || []).filter((p) => p.tier === tier).map((p) => (
                      <li key={p.word}>
                        <PlayableKorean text={p.word} ariaLabel={t('hangul.play', 'Play')} />
                        <strong>{p.word}</strong>
                        <details>
                          <summary>{t('hangul.reveal', 'Reveal')}</summary>
                          <span>{p.romanization} · {p.gloss}</span>
                        </details>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <footer className="hangul-card-foot">
            <button
              type="button"
              className="hangul-secondary"
              onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
              disabled={activeIdx === 0 || saving}
            >
              <FiChevronLeft /> {t('common.previous', 'Previous')}
            </button>
            <button
              type="button"
              className="hangul-primary"
              onClick={completeAndAdvance}
              disabled={saving}
            >
              {saving
                ? t('common.saving', 'Saving…')
                : (activeIdx === sortedGroups.length - 1
                  ? (refresherMode ? t('hangul.done', 'Done') : t('hangul.finishAndLearn', 'Start A1 grammar'))
                  : t('hangul.next', 'Next'))}
              <FiChevronRight />
            </button>
          </footer>
        </article>
      )}
    </main>
  );
}

export default HangulOnboardingPage;
