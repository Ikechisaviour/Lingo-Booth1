import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import speechService from '../../../services/speechService';
import { curriculumV2Service } from '../../../services/api';
import SrsRatingBar from '../SrsRatingBar';

function suggestPronunciationOutcome(evaluations) {
  if (!evaluations.length) return 'good';
  const counts = { high: 0, partial: 0, low: 0 };
  for (const ev of evaluations) {
    if (ev && counts[ev.accuracy] !== undefined) counts[ev.accuracy] += 1;
  }
  const total = counts.high + counts.partial + counts.low;
  if (!total) return 'good';
  if (counts.low > counts.high) return 'again';
  if (counts.partial >= counts.high) return 'hard';
  return 'good';
}

function getSpeechRecognition() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

const ACCURACY_STYLE = {
  high:    { bg: '#f0fdf4', border: '#bbf7d0', color: '#166534', label: 'Strong match' },
  partial: { bg: '#fffbeb', border: '#fde68a', color: '#92400e', label: 'Partial match' },
  low:     { bg: '#fef2f2', border: '#fecaca', color: '#7f1d1d', label: 'Far off — try again' },
};

export default function PronunciationTaskPage({ lesson, onComplete, sessionId }) {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);
  const [played, setPlayed] = useState(new Set());
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [evaluationHistory, setEvaluationHistory] = useState([]);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [error, setError] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const recognitionRef = useRef(null);

  const item = lesson.items[idx];
  const isLast = idx === lesson.items.length - 1;
  const SpeechRecognition = getSpeechRecognition();
  const asrSupported = Boolean(SpeechRecognition);

  // Reset state when item changes
  useEffect(() => {
    setTranscript('');
    setEvaluation(null);
    setError(null);
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
      recognitionRef.current = null;
    }
  }, [idx]);

  function speak() {
    try {
      if (speechService && typeof speechService.speak === 'function') {
        speechService.speak(item.target, { locale: 'ko-KR' });
      } else if (typeof window !== 'undefined' && window.speechSynthesis) {
        const utter = new window.SpeechSynthesisUtterance(item.target);
        utter.lang = 'ko-KR';
        window.speechSynthesis.speak(utter);
      }
      setPlayed((prev) => new Set(prev).add(idx));
    } catch (err) {
      console.warn('TTS failed:', err);
    }
  }

  function startRecording() {
    if (!asrSupported) {
      setError(t('curriculumV2.pronunciation.asrUnsupported', 'Speech recognition is not available in this browser. Use Chrome or Edge for pronunciation feedback.'));
      return;
    }
    if (recording) return;
    setError(null);
    setTranscript('');
    setEvaluation(null);

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const result = event.results[0]?.[0]?.transcript || '';
      setTranscript(result);
      submitForEvaluation(result);
    };
    recognition.onerror = (event) => {
      setRecording(false);
      const code = event.error || 'unknown';
      if (code === 'no-speech') {
        setError(t('curriculumV2.pronunciation.noSpeech', "I didn't catch that. Try again."));
      } else if (code === 'not-allowed') {
        setError(t('curriculumV2.pronunciation.micDenied', 'Microphone permission was denied.'));
      } else {
        setError(t('curriculumV2.pronunciation.asrError', 'Speech recognition error: {{code}}', { code }));
      }
    };
    recognition.onend = () => {
      setRecording(false);
    };

    recognitionRef.current = recognition;
    setRecording(true);
    try {
      recognition.start();
    } catch (err) {
      setRecording(false);
      setError(err.message || 'Could not start recording.');
    }
  }

  function stopRecording() {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
  }

  async function submitForEvaluation(asrTranscript) {
    setEvaluating(true);
    try {
      const { data } = await curriculumV2Service.evaluatePronunciation({
        target: item.target,
        transcript: asrTranscript,
      });
      setAiEnabled(data.aiEnabled !== false);
      setEvaluation(data.evaluation);
      if (data.evaluation) {
        setEvaluationHistory((prev) => [...prev, data.evaluation]);
        const outcomeByAccuracy = { high: 'correct', partial: 'partial', low: 'incorrect' };
        curriculumV2Service.recordEvent({
          conceptId: lesson.conceptId,
          lessonId: lesson.id,
          lessonType: 'PronunciationTask',
          outcome: outcomeByAccuracy[data.evaluation.accuracy] || 'partial',
          sessionId,
          targetLang: lesson.targetLang,
        }).catch((err) => console.warn('Event log failed:', err.message));
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Evaluation failed.');
    } finally {
      setEvaluating(false);
    }
  }

  function handleNext() {
    if (isLast) {
      setReviewed(true);
      return;
    }
    setIdx((i) => i + 1);
  }

  const canAdvance = played.has(idx) && (evaluation !== null || !asrSupported || !aiEnabled);

  return (
    <div className="v2-card">
      <div className="v2-shell__meta">
        {t('curriculumV2.pronunciation.progress', 'Pronunciation - {{current}} / {{total}}', {
          current: idx + 1,
          total: lesson.items.length,
        })}
      </div>
      <h2>{t('curriculumV2.pronunciation.title', 'Listen, then repeat aloud')}</h2>

      <div style={{ padding: '20px 0' }}>
        <div className="v2-target" style={{ fontSize: 26 }}>{item.target}</div>
        <div className="v2-native" style={{ marginTop: 6 }}>{item.native}</div>
      </div>

      {item.focusSounds && (
        <div className="v2-banner">
          <strong>{t('curriculumV2.pronunciation.focus', 'Focus:')}</strong>
          <ul style={{ margin: '4px 0 0 16px' }}>
            {item.focusSounds.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 16 }}>
        <button className="v2-btn v2-btn--secondary" onClick={speak}>
          ▶ {t('curriculumV2.pronunciation.listen', 'Listen')}
        </button>
        {asrSupported && (
          recording
            ? (
              <button
                className="v2-btn"
                onClick={stopRecording}
                style={{ background: '#dc2626', color: 'white' }}
              >
                ⏹ {t('curriculumV2.pronunciation.stopRecording', 'Stop')}
              </button>
            )
            : (
              <button
                className="v2-btn v2-btn--primary"
                onClick={startRecording}
                disabled={!played.has(idx) || evaluating}
              >
                🎤 {evaluating
                  ? t('curriculumV2.pronunciation.scoring', 'Scoring...')
                  : t('curriculumV2.pronunciation.record', 'Record')}
              </button>
            )
        )}
        {!asrSupported && (
          <span className="v2-shell__meta">
            {t('curriculumV2.pronunciation.asrFallbackHint', 'Mic unavailable — repeat aloud and judge yourself.')}
          </span>
        )}
      </div>

      {transcript && (
        <div style={{ marginTop: 12 }}>
          <div className="v2-shell__meta">{t('curriculumV2.pronunciation.heardAs', 'I heard you say:')}</div>
          <div className="v2-target" style={{ fontSize: 18 }}>{transcript}</div>
        </div>
      )}

      {evaluation && (() => {
        const style = ACCURACY_STYLE[evaluation.accuracy] || ACCURACY_STYLE.partial;
        return (
          <div
            className="v2-banner"
            style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.color, marginTop: 12 }}
          >
            <strong>{style.label}</strong>
            <div style={{ marginTop: 4 }}>{evaluation.feedback}</div>
          </div>
        );
      })()}

      {transcript && !evaluation && !evaluating && aiEnabled === false && (
        <div className="v2-banner" style={{ marginTop: 12 }}>
          {t('curriculumV2.pronunciation.aiUnavailable', 'Pronunciation scoring is not configured. Compare what you heard against the target above.')}
        </div>
      )}

      {error && (
        <div className="v2-banner" style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#7f1d1d', marginTop: 12 }}>
          {error}
        </div>
      )}

      <div className="v2-footer" style={{ marginTop: 16 }}>
        <span className="v2-shell__meta">
          {!played.has(idx)
            ? t('curriculumV2.pronunciation.listenFirst', 'Listen first, then record.')
            : !asrSupported
              ? t('curriculumV2.pronunciation.repeatThenContinue', 'Repeat aloud, then continue.')
              : evaluation
                ? t('curriculumV2.pronunciation.tryAgainOrContinue', 'Record again or continue.')
                : t('curriculumV2.pronunciation.recordWhenReady', 'Record when ready.')}
        </span>
        {!reviewed && (
          <button className="v2-btn v2-btn--primary" onClick={handleNext} disabled={!canAdvance}>
            {isLast ? t('curriculumV2.finish', 'Finish') : t('curriculumV2.next', 'Next')}
          </button>
        )}
      </div>

      {reviewed && (
        <SrsRatingBar
          conceptId={lesson.conceptId}
          conceptKind="vocab"
          skill="pronunciation"
          targetLang={lesson.targetLang}
          suggested={suggestPronunciationOutcome(evaluationHistory)}
          onRated={() => onComplete()}
        />
      )}
    </div>
  );
}
