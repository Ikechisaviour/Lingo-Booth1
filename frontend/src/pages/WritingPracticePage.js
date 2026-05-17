import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classLessonService, learningHubService, practiceContextService, userService } from '../services/api';
import LANGUAGES, { getNativeLangCode, getTargetLangCode, getTargetLangName } from '../config/languages';
import speechService from '../services/speechService';
import { looksLikeRawEnglishForNative, strokeGuideFamilyForLanguage } from '../utils/languagePairPolicy';
import './WritingPracticePage.css';

const PERSONAL_NOTEBOOK_KEY = 'lingoWritingNotebook';
const ATTEMPT_KEY = 'lingoWritingAttempts';

const MODES = [
  { id: 'trace', label: 'Trace' },
  { id: 'copy', label: 'Copy' },
  { id: 'listen', label: 'Listen' },
  { id: 'meaning', label: 'Meaning' },
  { id: 'stroke', label: 'Stroke order' },
  { id: 'review', label: 'Self review' },
];

function isProOrUltraTier(tier) {
  return ['pro', 'ultra'].includes(String(tier || '').toLowerCase());
}

function canUsePracticeContext() {
  if (localStorage.getItem('userRole') === 'admin') return true;
  const storedTier = localStorage.getItem('subscriptionTier');
  try {
    const entitlements = JSON.parse(localStorage.getItem('aiEntitlements') || '{}');
    return Boolean(
      entitlements.canUsePracticeContext
      || isProOrUltraTier(entitlements.subscriptionTier)
      || isProOrUltraTier(storedTier),
    );
  } catch (_) {
    return isProOrUltraTier(storedTier);
  }
}

function compact(value, max = 120) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function targetText(item = {}) {
  return compact(item.targetText || item.korean || item.exampleTarget || item.example);
}

function nativeText(item = {}, nativeLanguage = 'en') {
  const value = compact(item.nativeText || item.english || item.exampleNative || item.exampleEnglish);
  return looksLikeRawEnglishForNative(value, nativeLanguage) ? '' : value;
}

function notebookItem({ target, native, source, sourceLabel, romanization = '', type = 'word' }) {
  const cleanTarget = compact(target, 180);
  if (!cleanTarget) return null;
  const hash = Array.from(`${source}:${cleanTarget}:${native || ''}`)
    .reduce((sum, char) => ((sum * 31) + char.charCodeAt(0)) >>> 0, 7)
    .toString(16);
  return {
    id: `${source}-${hash}`,
    target: cleanTarget,
    native: compact(native, 180),
    romanization: compact(romanization, 160),
    source,
    sourceLabel,
    type,
  };
}

function itemsFromLesson(lesson = {}, t, nativeLanguage = 'en') {
  const lessonTitle = lesson.title || t('writing.sourceLabels.classLesson', 'Class lesson');
  return (lesson.content || [])
    .flatMap((item, index) => {
      const entries = [];
      const target = targetText(item);
      if (target) {
        entries.push(notebookItem({
          target,
          native: nativeText(item, nativeLanguage),
          romanization: item.romanization || item.pronunciation,
          source: 'class',
          sourceLabel: lessonTitle,
          type: item.type || 'word',
        }));
      }
      const example = compact(item.exampleTarget || item.example);
      if (example && example !== target) {
        entries.push(notebookItem({
          target: example,
          native: looksLikeRawEnglishForNative(item.exampleNative || item.exampleEnglish, nativeLanguage) ? '' : (item.exampleNative || item.exampleEnglish),
          source: 'class',
          sourceLabel: t('writing.sourceLabels.classExample', {
            title: lessonTitle,
            number: index + 1,
            defaultValue: '{{title}} example {{number}}',
          }),
          type: 'sentence',
        }));
      }
      return entries.filter(Boolean);
    });
}

function itemsFromContext(context = {}, t) {
  const sourceLabel = context.summary || t('writing.sourceLabels.personalized', 'Personalized');
  return [
    ...(context.vocabulary || []),
    ...(context.phrases || []),
    ...(context.topics || []),
  ].map((item) => notebookItem({
    target: item.text,
    native: item.note || item.context,
    source: 'context',
    sourceLabel,
    type: 'context',
  })).filter(Boolean);
}

function loadJsonArray(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function loadConversationItems(nativeLanguage, targetLanguage, t) {
  const prefix = `lingoConversation:conversation:${nativeLanguage}-${targetLanguage}`;
  const items = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(prefix)) continue;
    try {
      const stored = JSON.parse(localStorage.getItem(key) || '{}');
      (stored.history || [])
        .filter((turn) => turn?.role === 'user')
        .slice(-4)
        .forEach((turn) => {
          const item = notebookItem({
            target: turn.content,
            native: t('writing.sourceLabels.conversationNative', 'From your conversation practice'),
            source: 'conversation',
            sourceLabel: t('writing.sourceLabels.conversationHistory', 'Conversation history'),
            type: 'sentence',
          });
          if (item) items.push(item);
        });
    } catch (_) {}
  }
  return items;
}

function uniqueItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.target.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function strokeGuideFor(text, targetLanguage, t) {
  const chars = Array.from(text || '').filter((char) => char.trim());
  if (!chars.length) {
    return [
      t('writing.strokeGuide.emptyMain', 'Write the main shape slowly.'),
      t('writing.strokeGuide.emptySpacing', 'Check spacing.'),
      t('writing.strokeGuide.emptyMemory', 'Write it once more without the guide.'),
    ];
  }
  const family = strokeGuideFamilyForLanguage(targetLanguage);
  if (family === 'hangul') {
    return chars.slice(0, 8).map((char, index) => t('writing.strokeGuide.hangul', {
      index: index + 1,
      char,
      defaultValue: '{{index}}. {{char}}: top to bottom, left to right, keep the syllable block balanced.',
    }));
  }
  if (family === 'cjk') {
    return chars.slice(0, 8).map((char, index) => t('writing.strokeGuide.cjk', {
      index: index + 1,
      char,
      defaultValue: '{{index}}. {{char}}: horizontal before vertical, top before bottom, outside before inside.',
    }));
  }
  return chars.slice(0, 8).map((char, index) => t('writing.strokeGuide.default', {
    index: index + 1,
    char,
    defaultValue: '{{index}}. {{char}}: copy the shape, then write it from memory.',
  }));
}

function DrawingPad({ ghostText, showGhost, resetKey, onStrokeCount }) {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const strokesRef = useRef([]);
  const currentRef = useRef([]);
  const [, forceRender] = useState(0);

  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== Math.round(rect.width * ratio) || canvas.height !== Math.round(rect.height * ratio)) {
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
    }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#171428';
    ctx.lineWidth = 5;
    [...strokesRef.current, currentRef.current].forEach((stroke) => {
      if (!stroke || stroke.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      stroke.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.stroke();
    });
  };

  useEffect(() => {
    strokesRef.current = [];
    currentRef.current = [];
    onStrokeCount?.(0);
    redraw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useEffect(() => {
    const handleResize = () => redraw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pointFor = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const start = (event) => {
    event.preventDefault();
    canvasRef.current.setPointerCapture?.(event.pointerId);
    drawingRef.current = true;
    currentRef.current = [pointFor(event)];
    redraw();
  };

  const move = (event) => {
    if (!drawingRef.current) return;
    event.preventDefault();
    currentRef.current = [...currentRef.current, pointFor(event)];
    redraw();
  };

  const end = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    if (currentRef.current.length > 1) {
      strokesRef.current = [...strokesRef.current, currentRef.current];
      onStrokeCount?.(strokesRef.current.length);
    }
    currentRef.current = [];
    redraw();
    forceRender((value) => value + 1);
  };

  const clear = () => {
    strokesRef.current = [];
    currentRef.current = [];
    onStrokeCount?.(0);
    redraw();
  };

  const undo = () => {
    strokesRef.current = strokesRef.current.slice(0, -1);
    onStrokeCount?.(strokesRef.current.length);
    redraw();
    forceRender((value) => value + 1);
  };

  return (
    <div className="writing-pad-shell">
      <div className="writing-canvas-wrap">
        {showGhost && <div className="writing-ghost">{ghostText}</div>}
        <canvas
          ref={canvasRef}
          className="writing-canvas"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
        />
      </div>
      <div className="writing-pad-actions">
        <button type="button" onClick={undo}>{t('writing.undo', 'Undo')}</button>
        <button type="button" onClick={clear}>{t('writing.clear', 'Clear')}</button>
      </div>
    </div>
  );
}

function WritingPracticePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = localStorage.getItem('userId');
  const targetLanguage = getTargetLangCode();
  const nativeLanguage = getNativeLangCode();
  const targetName = getTargetLangName();
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [mode, setMode] = useState('trace');
  const [status, setStatus] = useState(() => t('writing.status.loadingNotebook', 'Loading writing notebook...'));
  const [strokeCount, setStrokeCount] = useState(0);
  const [review, setReview] = useState({ shape: false, spacing: false, memory: false });
  const [customTarget, setCustomTarget] = useState('');
  const [customNative, setCustomNative] = useState('');
  const seededTarget = compact(searchParams.get('savedText'), 180);
  const seededNative = compact(searchParams.get('nativeText'), 180);

  useEffect(() => {
    let cancelled = false;
    async function loadNotebook() {
      setStatus(t('writing.status.buildingNotebook', 'Building your writing notebook...'));
      const personalItems = loadJsonArray(PERSONAL_NOTEBOOK_KEY);
      const conversationItems = loadConversationItems(nativeLanguage, targetLanguage, t);
      let lessonItems = [];
      let contextItems = [];

      try {
        const lessonRes = await classLessonService.getClassLessons();
        lessonItems = (Array.isArray(lessonRes.data) ? lessonRes.data : []).flatMap((lesson) => itemsFromLesson(lesson, t, nativeLanguage));
      } catch (_) {}

      if (canUsePracticeContext()) {
        try {
          const contextRes = await practiceContextService.list(targetLanguage);
          contextItems = (Array.isArray(contextRes.data) ? contextRes.data : []).flatMap((context) => itemsFromContext(context, t));
        } catch (_) {}
      }

      const seededItem = seededTarget
        ? notebookItem({
          target: seededTarget,
          native: seededNative,
          source: 'personal',
          sourceLabel: t('writing.sourceLabels.savedReview', 'Saved review item'),
          type: 'sentence',
        })
        : null;
      const nextItems = uniqueItems([
        ...(seededItem ? [seededItem] : []),
        ...personalItems,
        ...contextItems,
        ...lessonItems,
        ...conversationItems,
      ]).slice(0, 180);

      if (cancelled) return;
      setItems(nextItems);
      setSelectedId((current) => current || nextItems[0]?.id || '');
      setStatus(nextItems.length
        ? t('writing.status.ready', 'Ready')
        : t('writing.status.emptyNotebook', 'Add a word or open Class to fill your notebook.'));
    }
    loadNotebook();
    return () => {
      cancelled = true;
    };
  }, [nativeLanguage, seededNative, seededTarget, targetLanguage, t]);

  const filteredItems = useMemo(() => (
    sourceFilter === 'all' ? items : items.filter((item) => item.source === sourceFilter)
  ), [items, sourceFilter]);

  const selectedItem = useMemo(() => (
    filteredItems.find((item) => item.id === selectedId)
    || filteredItems[0]
    || items[0]
  ), [filteredItems, items, selectedId]);

  const resetKey = `${selectedItem?.id || 'empty'}:${mode}`;
  const modeConfig = MODES.find((item) => item.id === mode) || MODES[0];
  const sources = useMemo(() => ([
    ['all', t('writing.sources.all', 'All')],
    ['class', t('writing.sources.class', t('navbar.class'))],
    ['context', t('writing.sources.personalized', 'Personalized')],
    ['conversation', t('writing.sources.conversation', t('navbar.conversation'))],
    ['personal', t('writing.sources.personal', 'Personal')],
  ]), [t]);

  const selectNext = () => {
    const list = filteredItems.length ? filteredItems : items;
    if (!list.length) return;
    const index = Math.max(0, list.findIndex((item) => item.id === selectedItem?.id));
    setSelectedId(list[(index + 1) % list.length].id);
    setReview({ shape: false, spacing: false, memory: false });
  };

  const speakPrompt = async () => {
    if (!selectedItem?.target) return;
    setStatus(t('writing.status.playingTarget', 'Playing target text...'));
    try {
      await speechService.speakAsync(selectedItem.target, {
        lang: LANGUAGES[targetLanguage]?.ttsLocale || targetLanguage,
        rate: '0.9',
      });
      setStatus(t('writing.status.ready', 'Ready'));
    } catch (_) {
      setStatus(t('writing.status.audioInterrupted', 'Audio playback was interrupted.'));
    }
  };

  const saveAttempt = async (result) => {
    if (!selectedItem) return;
    const attempts = loadJsonArray(ATTEMPT_KEY);
    const next = [{
      id: `${Date.now()}-${selectedItem.id}`,
      itemId: selectedItem.id,
      target: selectedItem.target,
      native: selectedItem.native,
      mode,
      result,
      strokeCount,
      createdAt: new Date().toISOString(),
    }, ...attempts].slice(0, 120);
    localStorage.setItem(ATTEMPT_KEY, JSON.stringify(next));
    setStatus(result === 'complete'
      ? t('writing.status.savedComplete', 'Saved as complete. Moving to the next item.')
      : t('writing.status.savedReview', 'Saved for more practice.'));
    if (result === 'complete') {
      if (userId) {
        userService.recordLearningEvent(userId, {
          eventType: 'writing_complete',
          itemId: selectedItem.id,
          writingMode: mode,
          fromMemory: review.memory,
          source: selectedItem.source,
        }).catch(() => {});
      }
      selectNext();
    } else if (userId) {
      learningHubService.saveItem({
        itemType: selectedItem.type === 'word' ? 'word' : 'phrase',
        targetText: selectedItem.target,
        nativeText: selectedItem.native,
        romanization: selectedItem.romanization,
        sourceType: 'writing',
        sourceRef: selectedItem.id,
        sourceLabel: selectedItem.sourceLabel,
        reason: t('writing.savedReason', 'Saved from writing practice for another pass.'),
        metadata: { route: '/writing', writingMode: mode },
      }).catch(() => {});
    }
  };

  const addPersonalItem = () => {
    const item = notebookItem({
      target: customTarget,
      native: customNative,
      source: 'personal',
      sourceLabel: t('writing.sourceLabels.personalNotebook', 'Personal notebook'),
      type: 'custom',
    });
    if (!item) {
      setStatus(t('writing.status.addTargetFirst', 'Add target text first.'));
      return;
    }
    const personal = uniqueItems([item, ...loadJsonArray(PERSONAL_NOTEBOOK_KEY)]).slice(0, 80);
    localStorage.setItem(PERSONAL_NOTEBOOK_KEY, JSON.stringify(personal));
    setItems((current) => uniqueItems([item, ...current]));
    setSelectedId(item.id);
    setCustomTarget('');
    setCustomNative('');
    setStatus(t('writing.status.addedNotebook', 'Added to your writing notebook.'));
  };

  const askTutorAboutSelected = () => {
    if (!selectedItem?.target) return;
    const prompt = t('learningHub.askTutorPrompt', {
      text: selectedItem.target,
      defaultValue: 'Help me practice "{{text}}".',
    });
    navigate(`/conversation?prompt=${encodeURIComponent(prompt)}`);
  };

  const openFlashcardForSelected = () => {
    if (!selectedItem?.target) return;
    const params = new URLSearchParams({
      savedText: selectedItem.target || '',
      nativeText: selectedItem.native || '',
    });
    navigate(`/flashcards?${params.toString()}`);
  };

  const selfTestSelected = async () => {
    if (!userId || !selectedItem?.target) return;
    try {
      const response = await learningHubService.saveItem({
        itemType: selectedItem.type === 'word' ? 'word' : 'phrase',
        targetText: selectedItem.target,
        nativeText: selectedItem.native,
        romanization: selectedItem.romanization,
        sourceType: 'writing',
        sourceRef: selectedItem.id,
        sourceLabel: selectedItem.sourceLabel,
        reason: t('writing.selfTestReason', 'Saved from writing practice for a quick self-test.'),
        metadata: { route: '/writing', writingMode: mode },
      });
      navigate('/review', { state: { quickQuizItem: response.data } });
    } catch (_) {}
  };

  const instructionText = () => {
    if (!selectedItem) return t('writing.instructions.addToBegin', 'Add a word or sentence to begin.');
    if (mode === 'listen') return t('writing.instructions.listen', 'Press Play, write what you hear, then reveal the answer.');
    if (mode === 'meaning') return t('writing.instructions.meaning', 'Write the {{language}} for this meaning.', { language: targetName });
    if (mode === 'stroke') return t('writing.instructions.stroke', 'Follow the guide, then use the writing area to practice.');
    if (mode === 'review') return t('writing.instructions.review', 'Compare your writing with the answer and mark what was strong.');
    return t(`writing.instructions.${modeConfig.id}`, modeConfig.label);
  };

  return (
    <div className="writing-page">
      <section className="writing-header">
        <div>
          <p className="writing-kicker">{t('navbar.exercise')}</p>
          <h1>{t('writing.title', 'Writing practice')}</h1>
          <p>{t('writing.subtitle', 'Trace, copy, listen, recall by meaning, study stroke order, and keep a notebook from your lessons.')}</p>
        </div>
        <div className="writing-stat">
          <strong>{items.length}</strong>
          <span>{t('writing.notebookItems', 'notebook items')}</span>
        </div>
      </section>

      <section className="writing-layout">
        <aside className="writing-sidebar">
          <div className="writing-card">
            <h2>{t('writing.notebook', 'Notebook')}</h2>
            <div className="writing-source-tabs">
              {sources.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={sourceFilter === id ? 'active' : ''}
                  onClick={() => {
                    setSourceFilter(id);
                    setSelectedId('');
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="writing-list">
              {filteredItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={selectedItem?.id === item.id ? 'active' : ''}
                  onClick={() => setSelectedId(item.id)}
                >
                  <strong>{item.target}</strong>
                  <span>{item.native || item.sourceLabel}</span>
                </button>
              ))}
              {filteredItems.length === 0 && <p className="writing-empty">{t('writing.emptySource', 'No items in this source yet.')}</p>}
            </div>
          </div>

          <div className="writing-card">
            <h2>{t('writing.addYourOwn', 'Add your own')}</h2>
            <input value={customTarget} onChange={(event) => setCustomTarget(event.target.value)} placeholder={t('writing.targetPlaceholder', 'Target word or sentence')} />
            <input value={customNative} onChange={(event) => setCustomNative(event.target.value)} placeholder={t('writing.meaningPlaceholder', 'Meaning or note')} />
            <button type="button" className="writing-primary" onClick={addPersonalItem}>{t('writing.addToNotebook', 'Add to notebook')}</button>
          </div>
        </aside>

        <main className="writing-workspace">
          <div className="writing-mode-tabs" role="tablist" aria-label={t('writing.modesLabel', 'Writing modes')}>
            {MODES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={mode === item.id ? 'active' : ''}
                onClick={() => setMode(item.id)}
              >
                {t(`writing.modes.${item.id}`, item.label)}
              </button>
            ))}
          </div>

          <div className="writing-card writing-practice-card">
            <div className="writing-practice-head">
              <div>
                <p className="writing-kicker">{selectedItem?.sourceLabel || t('writing.notebook', 'Writing notebook')}</p>
                <h2>{t(`writing.modes.${modeConfig.id}`, modeConfig.label)}</h2>
              </div>
              <button type="button" onClick={speakPrompt} disabled={!selectedItem}>{t('writing.play', 'Play')}</button>
            </div>

            <p className="writing-instruction">{instructionText()}</p>

            {selectedItem && mode !== 'listen' && mode !== 'meaning' && (
              <div className="writing-answer-card">
                <span>{t('writing.targetLabel', 'Target')}</span>
                <strong>{selectedItem.target}</strong>
                {selectedItem.romanization && <small>{selectedItem.romanization}</small>}
                {selectedItem.native && <em>{selectedItem.native}</em>}
              </div>
            )}

            {selectedItem && mode === 'meaning' && (
              <div className="writing-answer-card">
                <span>{t('writing.meaningLabel', 'Meaning')}</span>
                <strong>{selectedItem.native || t('writing.recallTarget', 'Recall the target text from your notebook.')}</strong>
              </div>
            )}

            {selectedItem && mode === 'stroke' && (
              <div className="writing-stroke-guide">
                {strokeGuideFor(selectedItem.target, targetLanguage, t).map((line) => <div key={line}>{line}</div>)}
              </div>
            )}

            <DrawingPad
              ghostText={selectedItem?.target || ''}
              showGhost={mode === 'trace' && !!selectedItem}
              resetKey={resetKey}
              onStrokeCount={setStrokeCount}
            />

            {selectedItem && (mode === 'listen' || mode === 'meaning' || mode === 'review') && (
              <details className="writing-reveal">
                <summary>{t('writing.showAnswer', 'Show answer')}</summary>
                <strong>{selectedItem.target}</strong>
                {selectedItem.native && <span>{selectedItem.native}</span>}
              </details>
            )}

            <div className="writing-review">
              <label>
                <input type="checkbox" checked={review.shape} onChange={(event) => setReview({ ...review, shape: event.target.checked })} />
                {t('writing.review.shape', 'Shape matches')}
              </label>
              <label>
                <input type="checkbox" checked={review.spacing} onChange={(event) => setReview({ ...review, spacing: event.target.checked })} />
                {t('writing.review.spacing', 'Spacing is clear')}
              </label>
              <label>
                <input type="checkbox" checked={review.memory} onChange={(event) => setReview({ ...review, memory: event.target.checked })} />
                {t('writing.review.memory', 'I can write it from memory')}
              </label>
            </div>

            <div className="writing-actions">
              <button type="button" onClick={askTutorAboutSelected} disabled={!selectedItem}>
                {t('learningHub.askTutor', 'Ask tutor')}
              </button>
              <button type="button" onClick={openFlashcardForSelected} disabled={!selectedItem}>
                {t('learningHub.practiceFlashcard', 'Flashcard')}
              </button>
              <button type="button" onClick={selfTestSelected} disabled={!selectedItem}>
                {t('learningHub.practiceQuiz', 'Self-test')}
              </button>
              <button type="button" onClick={() => saveAttempt('needs-practice')} disabled={!selectedItem}>{t('writing.saveForReview', 'Save for review')}</button>
              <button type="button" className="writing-primary" onClick={() => saveAttempt('complete')} disabled={!selectedItem}>
                {t('writing.markCompleteNext', 'Mark complete and next')}
              </button>
            </div>

            <p className="writing-status">{status}</p>
          </div>
        </main>
      </section>
    </div>
  );
}

export default WritingPracticePage;
