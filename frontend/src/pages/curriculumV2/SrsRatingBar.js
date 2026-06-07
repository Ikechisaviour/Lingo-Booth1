import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { curriculumV2Service } from '../../services/api';

// Four-button SRS rating bar shown after a learner-rateable item.
// Posts the rating to the backend and calls onRated() once the request
// resolves (success or failure — failures are logged but never block
// lesson progression, since the SRS is a learning aid not a gate).
//
// Props:
//   conceptId     string  — required
//   conceptKind   'vocab' | 'pattern' | 'contrast' | 'story'
//   skill         'recognition' | 'production' | 'listening' | 'pronunciation'
//   targetLang    string (default 'ko')
//   onRated       (outcome) => void — called after the request settles
//   suggested     optional outcome (e.g. 'again' or 'good') to pre-highlight
//                 when the lesson UI has signal about correctness
export default function SrsRatingBar({
  conceptId,
  conceptKind,
  skill,
  targetLang = 'ko',
  onRated,
  suggested,
}) {
  const { t } = useTranslation();
  const [submittingFor, setSubmittingFor] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const buttons = [
    { outcome: 'again', label: t('curriculumV2.srs.again', 'Again'), color: '#dc2626' },
    { outcome: 'hard',  label: t('curriculumV2.srs.hard',  'Hard'),  color: '#d97706' },
    { outcome: 'good',  label: t('curriculumV2.srs.good',  'Good'),  color: '#2563eb' },
    { outcome: 'easy',  label: t('curriculumV2.srs.easy',  'Easy'),  color: '#16a34a' },
  ];

  async function handleRate(outcome) {
    if (submitted || submittingFor) return;
    setSubmittingFor(outcome);
    try {
      await curriculumV2Service.recordSrsReview({
        conceptId,
        conceptKind,
        skill,
        outcome,
        targetLang,
      });
    } catch (err) {
      console.warn('SRS review failed (continuing locally):', err.response?.data?.message || err.message);
    } finally {
      setSubmittingFor(null);
      setSubmitted(true);
      onRated?.(outcome);
    }
  }

  if (!conceptId) return null;

  return (
    <div style={{ marginTop: 16 }}>
      <div className="v2-shell__meta">
        {t('curriculumV2.srs.prompt', 'How well did you know it?')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 8 }}>
        {buttons.map((b) => {
          const isSuggested = suggested === b.outcome;
          const isLoading = submittingFor === b.outcome;
          return (
            <button
              key={b.outcome}
              onClick={() => handleRate(b.outcome)}
              disabled={submitted || submittingFor !== null}
              style={{
                appearance: 'none',
                background: 'white',
                border: `2px solid ${isSuggested ? b.color : '#e5e7eb'}`,
                color: b.color,
                borderRadius: 10,
                padding: '10px 8px',
                fontSize: 14,
                fontWeight: 600,
                cursor: submitted ? 'default' : 'pointer',
                opacity: submitted && submittingFor !== b.outcome ? 0.4 : 1,
              }}
            >
              {isLoading ? '…' : b.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
