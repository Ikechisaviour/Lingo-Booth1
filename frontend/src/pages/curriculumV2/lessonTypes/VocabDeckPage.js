import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PlayableKorean from '../../../components/PlayableKorean';
import { curriculumV2Service } from '../../../services/api';
import { useLessonAudio, prepForSpeech, LessonAudioButton } from '../../../utils/v2Audio';

// Per-card SRS flow:
//   1. Prompt — show target text, learner mentally recalls the native gloss.
//   2. Reveal — show native, learner self-assesses with 4-button rating.
//   3. Each rating posts an SRS review for that specific filler concept;
//      moves to next card.
// Cards display in lesson order. Per-card dueAt ordering can come later
// when the planner can pre-hydrate SRS state per filler.
export default function VocabDeckPage({ lesson, onComplete, onBack, sessionId }) {
  const { t } = useTranslation();
  const audio = useLessonAudio(lesson.targetLang || 'ko');
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [submittingFor, setSubmittingFor] = useState(null);

  const fillers = Array.isArray(lesson.fillers) && lesson.fillers.length
    ? lesson.fillers
    : (lesson.fillerConceptIds || []).map((id) => ({ id, target: null, native: null }));

  const card = fillers[idx];
  const isLast = idx === fillers.length - 1;

  async function handleRate(outcome) {
    if (submittingFor || !card) return;
    setSubmittingFor(outcome);
    await Promise.allSettled([
      curriculumV2Service.recordSrsReview({
        conceptId: card.id,
        conceptKind: 'vocab',
        skill: 'recognition',
        outcome,
        targetLang: lesson.targetLang,
      }),
      curriculumV2Service.recordEvent({
        conceptId: card.id,
        lessonId: lesson.id,
        lessonType: 'VocabDeck',
        outcome: outcome === 'again' ? 'incorrect' : outcome === 'hard' ? 'partial' : 'correct',
        sessionId,
        targetLang: lesson.targetLang,
      }),
    ]);
    setSubmittingFor(null);
    if (isLast) {
      onComplete();
      return;
    }
    setIdx((i) => i + 1);
    setRevealed(false);
  }

  const ratingButtons = [
    { outcome: 'again', label: t('curriculumV2.srs.again', 'Again'), color: '#dc2626' },
    { outcome: 'hard',  label: t('curriculumV2.srs.hard',  'Hard'),  color: '#d97706' },
    { outcome: 'good',  label: t('curriculumV2.srs.good',  'Good'),  color: '#2563eb' },
    { outcome: 'easy',  label: t('curriculumV2.srs.easy',  'Easy'),  color: '#16a34a' },
  ];

  if (!card) {
    // Empty deck — nothing to review. Mark complete and move on.
    return (
      <div className="v2-card">
        <div className="v2-shell__meta">{t('curriculumV2.vocabDeck.meta', 'Vocab deck')}</div>
        <p>{t('curriculumV2.vocabDeck.empty', 'This deck has no cards to review.')}</p>
        <div className="v2-footer">
          {onBack && (
            <button className="v2-btn v2-btn--secondary" onClick={onBack}>
              ← {t('curriculumV2.back', 'Back')}
            </button>
          )}
          <button className="v2-btn v2-btn--primary" onClick={onComplete}>
            {t('curriculumV2.continue', 'Continue')}
          </button>
        </div>
      </div>
    );
  }

  const metaLine = t('curriculumV2.vocabDeck.progress', 'Vocab card {{current}} / {{total}}', {
    current: idx + 1,
    total: fillers.length,
  });

  // Page script: meta + target word; if revealed, also read the native gloss.
  // Recall prompt is read up-front so the learner knows to retrieve before
  // tapping Reveal.
  const pageScript = (() => {
    const lines = [metaLine + '.'];
    if (card.target) lines.push(card.target);
    if (revealed) {
      if (card.native) lines.push(prepForSpeech(card.native));
    } else {
      lines.push(t('curriculumV2.vocabDeck.recallPrompt', 'Recall the meaning, then reveal.'));
    }
    return lines;
  })();

  return (
    <div className="v2-card">
      <div className="v2-shell__meta v2-contrast__topbar">
        <span>{metaLine}</span>
        <LessonAudioButton
          audio={audio}
          scope="page"
          items={pageScript}
          variant="primary"
          label={t('curriculumV2.playPage', 'Play whole lesson')}
        />
      </div>

      <div style={{ padding: '24px 0', textAlign: 'center' }}>
        <div className="v2-target" style={{ fontSize: 32, minHeight: 40, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          {card.target || (
            <em style={{ color: '#9ca3af', fontSize: 18 }}>
              {t('curriculumV2.vocabDeck.missingTarget', '(no target text)')}
            </em>
          )}
          {card.target && <PlayableKorean key={card.id} text={card.target} primary ariaLabel={t('curriculumV2.playCard', 'Play card')} />}
        </div>
        <div className="v2-native" style={{ marginTop: 12, minHeight: 22 }}>
          {revealed
            ? (card.native || <em style={{ color: '#9ca3af' }}>—</em>)
            : <span style={{ color: '#9ca3af' }}>•••</span>}
        </div>
      </div>

      {!revealed && (
        <div className="v2-footer">
          {onBack && (
            <button className="v2-btn v2-btn--secondary" onClick={onBack}>
              ← {t('curriculumV2.back', 'Back')}
            </button>
          )}
          <span className="v2-shell__meta">
            {t('curriculumV2.vocabDeck.recallPrompt', 'Recall the meaning, then reveal.')}
          </span>
          <button className="v2-btn v2-btn--primary" onClick={() => setRevealed(true)}>
            {t('curriculumV2.vocabDeck.reveal', 'Reveal')}
          </button>
        </div>
      )}

      {revealed && (
        <div style={{ marginTop: 16 }}>
          <div className="v2-shell__meta">
            {t('curriculumV2.srs.prompt', 'How well did you know it?')}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 8 }}>
            {ratingButtons.map((b) => (
              <button
                key={b.outcome}
                onClick={() => handleRate(b.outcome)}
                disabled={submittingFor !== null}
                style={{
                  appearance: 'none',
                  background: 'white',
                  border: `2px solid ${submittingFor === b.outcome ? b.color : '#e5e7eb'}`,
                  color: b.color,
                  borderRadius: 10,
                  padding: '10px 8px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: submittingFor ? 'default' : 'pointer',
                  opacity: submittingFor && submittingFor !== b.outcome ? 0.4 : 1,
                }}
              >
                {submittingFor === b.outcome ? '…' : b.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
