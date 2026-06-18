import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SrsRatingBar from '../SrsRatingBar';
import PlayableKorean from '../../../components/PlayableKorean';
import { curriculumV2Service } from '../../../services/api';
import { useLessonAudio, prepForSpeech, LessonAudioButton } from '../../../utils/v2Audio';

function shuffled(items) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function suggestOutcome(score, total, hintUsed) {
  if (total === 0) return 'good';
  const ratio = score / total;
  if (ratio < 0.5) return 'again';
  if (ratio < 0.8 || hintUsed) return 'hard';
  return 'good';
}

export default function ClozeLessonPage({ lesson, onComplete, onBack, sessionId }) {
  const { t } = useTranslation();
  const audio = useLessonAudio(lesson.targetLang || 'ko');
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [hintEverUsed, setHintEverUsed] = useState(false);
  const [itemStartedAt, setItemStartedAt] = useState(() => Date.now());

  const item = lesson.items[idx];
  const choices = useMemo(() => {
    const pool = [item.answer, ...(item.distractors || [])];
    return shuffled(pool);
  }, [item.answer, item.distractors]);

  const isLast = idx === lesson.items.length - 1;
  const answered = picked !== null;
  const isCorrect = picked === item.answer;
  const metaLine = t('curriculumV2.cloze.progress', 'Fill the blank - {{current}} / {{total}}', {
    current: idx + 1,
    total: lesson.items.length,
  });

  // The TTS voice reads "____" as nothing useful, so substitute the
  // translated word "blank" in the spoken prompt. Once answered, read the
  // filled-in sentence instead.
  const blankWord = t('curriculumV2.cloze.blank', 'blank');
  const pageScript = useMemo(() => {
    const filled = answered
      ? item.target.replace('___', picked || item.answer)
      : item.target.replace('___', ` ${blankWord} `);
    const lines = [
      metaLine + '.',
      prepForSpeech(filled),
      item.native ? prepForSpeech(item.native) : '',
      t('curriculumV2.cloze.choices', 'Choices') + ': ' + choices.join(', ') + '.',
    ];
    if (answered && !isCorrect) {
      lines.push(t('curriculumV2.cloze.answer', 'Answer: {{answer}}', { answer: item.answer }) + '.');
    }
    if (answered && item.hint) {
      lines.push(prepForSpeech(item.hint));
    }
    return lines.filter(Boolean);
  }, [item, picked, answered, isCorrect, choices, t, metaLine, blankWord]);

  function handlePick(choice) {
    if (answered) return;
    setPicked(choice);
    const correct = choice === item.answer;
    if (correct) setScore((s) => s + 1);
    curriculumV2Service.recordEvent({
      conceptId: lesson.conceptId,
      lessonId: lesson.id,
      lessonType: 'ClozeLesson',
      outcome: correct ? 'correct' : 'incorrect',
      hintUsed: showHint,
      latencyMs: Date.now() - itemStartedAt,
      sessionId,
      targetLang: lesson.targetLang,
    }).catch((err) => console.warn('Event log failed:', err.message));
  }

  function handleNext() {
    if (isLast) {
      onComplete();
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
    setShowHint(false);
    setItemStartedAt(Date.now());
  }

  const [before, after] = item.target.split('___');

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

      <div className="v2-cloze-prompt">
        <span>{before}</span>
        <span className={`blank ${answered ? '' : 'empty'}`}>{answered ? picked : '____'}</span>
        <span>{after}</span>
        {answered && (
          <span style={{ marginLeft: 8 }}>
            <PlayableKorean
              text={item.target.replace('___', picked || item.answer)}
              ariaLabel={t('curriculumV2.playSentence', 'Play sentence')}
            />
          </span>
        )}
      </div>
      <div className="v2-native">{item.native}</div>

      <div className="v2-choices" style={{ marginTop: 24 }}>
        {choices.map((c) => {
          const status = answered
            ? c === item.answer ? 'is-correct' : c === picked ? 'is-wrong' : ''
            : '';
          return (
            <button key={c} className={`v2-choice ${status}`} onClick={() => handlePick(c)} disabled={answered}>
              {c}
            </button>
          );
        })}
      </div>

      {item.hint && !answered && (
        <button
          className="v2-btn v2-btn--ghost"
          onClick={() => { setShowHint(true); setHintEverUsed(true); }}
          style={{ marginTop: 12 }}
        >
          {showHint ? item.hint : t('curriculumV2.cloze.needHint', 'Need a hint?')}
        </button>
      )}

      {!answered && onBack && (
        <div className="v2-footer">
          <button className="v2-btn v2-btn--secondary" onClick={onBack}>
            ← {t('curriculumV2.back', 'Back')}
          </button>
        </div>
      )}

      {answered && (
        <div className="v2-footer">
          {onBack && (
            <button className="v2-btn v2-btn--secondary" onClick={onBack}>
              ← {t('curriculumV2.back', 'Back')}
            </button>
          )}
          <span className="v2-shell__meta">
            {isCorrect
              ? t('curriculumV2.cloze.correct', 'Correct')
              : t('curriculumV2.cloze.answer', 'Answer: {{answer}}', { answer: item.answer })}
          </span>
          {!isLast && (
            <button className="v2-btn v2-btn--primary" onClick={handleNext}>
              {t('curriculumV2.next', 'Next')}
            </button>
          )}
        </div>
      )}

      {answered && !isCorrect && item.hint && (
        <div className="v2-banner" style={{ background: '#fffbeb', borderColor: '#fde68a', color: '#92400e', marginTop: 12 }}>
          <strong>{t('curriculumV2.cloze.whyHint', 'Why:')}</strong> {item.hint}
        </div>
      )}

      {answered && isLast && (
        <SrsRatingBar
          conceptId={lesson.conceptId}
          conceptKind="pattern"
          skill="recognition"
          targetLang={lesson.targetLang}
          suggested={suggestOutcome(score, lesson.items.length, hintEverUsed)}
          onRated={() => onComplete()}
        />
      )}
    </div>
  );
}
