import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SrsRatingBar from '../SrsRatingBar';
import speechService from '../../../services/speechService';
import { curriculumV2Service } from '../../../services/api';
import { useLessonAudio, prepForSpeech, LessonAudioButton } from '../../../utils/v2Audio';

// Two-stage flow per pair:
//   1. Listen — learner taps A and B to hear each sound. Both must be heard
//      before the ABX prompt unlocks.
//   2. ABX — page picks X = A or B at random, plays it once, learner picks
//      which of A/B it was. Correct/incorrect logged + scored.
function suggestOutcome(correct, total) {
  if (total === 0) return 'good';
  const ratio = correct / total;
  if (ratio < 0.5) return 'again';
  if (ratio < 0.8) return 'hard';
  return 'good';
}

export default function MinimalPairTaskPage({ lesson, onComplete, onBack, sessionId }) {
  const { t } = useTranslation();
  const audio = useLessonAudio(lesson.targetLang || 'ko');
  const [idx, setIdx] = useState(0);
  const [heard, setHeard] = useState({ a: false, b: false });
  const [xChoice, setXChoice] = useState(null); // 'a' | 'b' (what was just played)
  const [guessed, setGuessed] = useState(null); // learner's pick
  const [score, setScore] = useState(0);
  const [reviewed, setReviewed] = useState(false);
  const pair = lesson.pairs[idx];
  const isLast = idx === lesson.pairs.length - 1;
  const bothHeard = heard.a && heard.b;
  const inABX = bothHeard && xChoice !== null;
  const answered = guessed !== null;

  function speak(text) {
    try {
      // Route through speechService so the user's preferred Edge TTS voice
      // plays — the raw `window.speechSynthesis` path uses the browser's
      // built-in voices, which sound robotic on most platforms.
      speechService.speak(text, { lang: 'ko-KR' });
    } catch (err) {
      console.warn('TTS failed:', err);
    }
  }

  function play(which) {
    setHeard((prev) => ({ ...prev, [which]: true }));
    speak(pair[which]);
  }

  function startABX() {
    const pick = Math.random() < 0.5 ? 'a' : 'b';
    setXChoice(pick);
    setGuessed(null);
    speak(pair[pick]);
  }

  function pickAnswer(which) {
    if (!inABX || answered) return;
    setGuessed(which);
    const correct = which === xChoice;
    if (correct) setScore((s) => s + 1);
    curriculumV2Service.recordEvent({
      conceptId: lesson.conceptId,
      lessonId: lesson.id,
      lessonType: 'MinimalPairTask',
      outcome: correct ? 'correct' : 'incorrect',
      sessionId,
      targetLang: lesson.targetLang,
    }).catch((err) => console.warn('Event log failed:', err.message));
  }

  function handleNext() {
    if (isLast) {
      setReviewed(true);
      return;
    }
    setIdx((i) => i + 1);
    setHeard({ a: false, b: false });
    setXChoice(null);
    setGuessed(null);
  }

  const metaLine = t('curriculumV2.minimalPair.progress', 'Minimal pair - {{current}} / {{total}}', {
    current: idx + 1,
    total: lesson.pairs.length,
  });
  const pageScript = useMemo(() => ([
    `${metaLine}. ${t('curriculumV2.minimalPair.title', 'Hear the difference')}.`,
    prepForSpeech(pair.contrast || ''),
    `A.`, pair.a,
    `B.`, pair.b,
  ].filter(Boolean)), [pair, t, metaLine]);

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
      <h2>{t('curriculumV2.minimalPair.title', 'Hear the difference')}</h2>
      <p className="v2-native">{pair.contrast}</p>

      <div className="v2-pair-grid">
        <div
          className={`v2-pair-cell ${guessed === 'a' ? 'is-picked' : ''}`}
          onClick={() => (inABX ? pickAnswer('a') : play('a'))}
          style={{
            opacity: answered && xChoice !== 'a' && guessed === 'a' ? 0.6 : 1,
            borderColor: answered && xChoice === 'a' ? '#16a34a' : undefined,
          }}
        >
          {inABX ? 'A' : pair.a}
        </div>
        <div
          className={`v2-pair-cell ${guessed === 'b' ? 'is-picked' : ''}`}
          onClick={() => (inABX ? pickAnswer('b') : play('b'))}
          style={{
            opacity: answered && xChoice !== 'b' && guessed === 'b' ? 0.6 : 1,
            borderColor: answered && xChoice === 'b' ? '#16a34a' : undefined,
          }}
        >
          {inABX ? 'B' : pair.b}
        </div>
      </div>

      {!bothHeard && (
        <div className="v2-shell__meta" style={{ marginTop: 12 }}>
          {t('curriculumV2.minimalPair.listenInstructions', 'Tap each to hear it. After both, an ABX challenge starts.')}
        </div>
      )}

      {bothHeard && xChoice === null && (
        <div className="v2-footer" style={{ marginTop: 12 }}>
          {onBack && (
            <button className="v2-btn v2-btn--secondary" onClick={onBack}>
              ← {t('curriculumV2.back', 'Back')}
            </button>
          )}
          <span className="v2-shell__meta">
            {t('curriculumV2.minimalPair.abxReady', 'Ready when you are — listen and pick A or B.')}
          </span>
          <button className="v2-btn v2-btn--primary" onClick={startABX}>
            {t('curriculumV2.minimalPair.startAbx', 'Start challenge')}
          </button>
        </div>
      )}

      {inABX && !answered && (
        <div className="v2-shell__meta" style={{ marginTop: 12 }}>
          {t('curriculumV2.minimalPair.whichOne', 'Which one did you just hear: A or B?')}
          <button
            className="v2-btn v2-btn--ghost"
            onClick={() => speak(pair[xChoice])}
            style={{ marginLeft: 8 }}
          >
            ▶ {t('curriculumV2.minimalPair.replay', 'Replay')}
          </button>
        </div>
      )}

      {answered && (
        <div
          className="v2-banner"
          style={{
            background: guessed === xChoice ? '#f0fdf4' : '#fef2f2',
            borderColor: guessed === xChoice ? '#bbf7d0' : '#fecaca',
            color: guessed === xChoice ? '#166534' : '#7f1d1d',
            marginTop: 12,
          }}
        >
          <strong>
            {guessed === xChoice
              ? t('curriculumV2.minimalPair.correct', '✓ Correct — that was {{which}} ({{text}}).', {
                which: xChoice.toUpperCase(),
                text: pair[xChoice],
              })
              : t('curriculumV2.minimalPair.wrong', '✗ Actually {{which}} ({{text}}).', {
                which: xChoice.toUpperCase(),
                text: pair[xChoice],
              })}
          </strong>
        </div>
      )}

      {answered && !reviewed && (
        <div className="v2-footer">
          {onBack && (
            <button className="v2-btn v2-btn--secondary" onClick={onBack}>
              ← {t('curriculumV2.back', 'Back')}
            </button>
          )}
          <span className="v2-shell__meta">
            {t('curriculumV2.minimalPair.runningScore', 'Score so far: {{score}}', { score })}
          </span>
          <button className="v2-btn v2-btn--primary" onClick={handleNext}>
            {isLast ? t('curriculumV2.finish', 'Finish') : t('curriculumV2.next', 'Next')}
          </button>
        </div>
      )}

      {reviewed && (
        <SrsRatingBar
          conceptId={lesson.conceptId}
          conceptKind="vocab"
          skill="listening"
          targetLang={lesson.targetLang}
          suggested={suggestOutcome(score, lesson.pairs.length)}
          onRated={() => onComplete()}
        />
      )}
    </div>
  );
}
