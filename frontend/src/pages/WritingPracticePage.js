import React, { useEffect, useMemo, useRef, useState } from 'react';
import { classLessonService, practiceContextService } from '../services/api';
import LANGUAGES, { getNativeLangCode, getTargetLangCode, getTargetLangName } from '../config/languages';
import speechService from '../services/speechService';
import './WritingPracticePage.css';

const PERSONAL_NOTEBOOK_KEY = 'lingoWritingNotebook';
const ATTEMPT_KEY = 'lingoWritingAttempts';

const MODES = [
  { id: 'trace', label: 'Trace', prompt: 'Trace over the guide, then write it again from memory.' },
  { id: 'copy', label: 'Copy', prompt: 'Look carefully, then copy the word or sentence.' },
  { id: 'listen', label: 'Listen', prompt: 'Listen first, then write what you heard.' },
  { id: 'meaning', label: 'Meaning', prompt: 'Use the meaning to recall and write the target text.' },
  { id: 'stroke', label: 'Stroke order', prompt: 'Practice the shape slowly, one visible part at a time.' },
  { id: 'review', label: 'Self review', prompt: 'Compare your writing with the answer and decide what to do next.' },
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

function nativeText(item = {}) {
  return compact(item.nativeText || item.english || item.exampleNative || item.exampleEnglish);
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

function itemsFromLesson(lesson = {}) {
  return (lesson.content || [])
    .flatMap((item, index) => {
      const entries = [];
      const target = targetText(item);
      if (target) {
        entries.push(notebookItem({
          target,
          native: nativeText(item),
          romanization: item.romanization || item.pronunciation,
          source: 'class',
          sourceLabel: lesson.title || 'Class lesson',
          type: item.type || 'word',
        }));
      }
      const example = compact(item.exampleTarget || item.example);
      if (example && example !== target) {
        entries.push(notebookItem({
          target: example,
          native: item.exampleNative || item.exampleEnglish,
          source: 'class',
          sourceLabel: `${lesson.title || 'Class lesson'} example ${index + 1}`,
          type: 'sentence',
        }));
      }
      return entries.filter(Boolean);
    });
}

function itemsFromContext(context = {}) {
  const sourceLabel = context.summary || 'Saved context';
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

function loadConversationItems(nativeLanguage, targetLanguage) {
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
            native: 'From your conversation practice',
            source: 'conversation',
            sourceLabel: 'Conversation history',
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

function strokeGuideFor(text, targetLanguage) {
  const chars = Array.from(text || '').filter((char) => char.trim());
  if (!chars.length) return ['Write the main shape slowly.', 'Check spacing.', 'Write it once more without the guide.'];
  if (targetLanguage === 'ko') {
    return chars.slice(0, 8).map((char, index) => `${index + 1}. ${char}: top to bottom, left to right, keep the syllable block balanced.`);
  }
  if (['zh', 'ja'].includes(targetLanguage)) {
    return chars.slice(0, 8).map((char, index) => `${index + 1}. ${char}: horizontal before vertical, top before bottom, outside before inside.`);
  }
  return chars.slice(0, 8).map((char, index) => `${index + 1}. ${char}: copy the shape, then write it from memory.`);
}

function DrawingPad({ ghostText, showGhost, resetKey, onStrokeCount }) {
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
        <button type="button" onClick={undo}>Undo</button>
        <button type="button" onClick={clear}>Clear</button>
      </div>
    </div>
  );
}

function WritingPracticePage() {
  const targetLanguage = getTargetLangCode();
  const nativeLanguage = getNativeLangCode();
  const targetName = getTargetLangName();
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [mode, setMode] = useState('trace');
  const [status, setStatus] = useState('Loading writing notebook...');
  const [strokeCount, setStrokeCount] = useState(0);
  const [review, setReview] = useState({ shape: false, spacing: false, memory: false });
  const [customTarget, setCustomTarget] = useState('');
  const [customNative, setCustomNative] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function loadNotebook() {
      setStatus('Building your writing notebook...');
      const personalItems = loadJsonArray(PERSONAL_NOTEBOOK_KEY);
      const conversationItems = loadConversationItems(nativeLanguage, targetLanguage);
      let lessonItems = [];
      let contextItems = [];

      try {
        const lessonRes = await classLessonService.getClassLessons();
        lessonItems = (Array.isArray(lessonRes.data) ? lessonRes.data : []).flatMap(itemsFromLesson);
      } catch (_) {}

      if (canUsePracticeContext()) {
        try {
          const contextRes = await practiceContextService.list(targetLanguage);
          contextItems = (Array.isArray(contextRes.data) ? contextRes.data : []).flatMap(itemsFromContext);
        } catch (_) {}
      }

      const nextItems = uniqueItems([
        ...personalItems,
        ...contextItems,
        ...lessonItems,
        ...conversationItems,
      ]).slice(0, 180);

      if (cancelled) return;
      setItems(nextItems);
      setSelectedId((current) => current || nextItems[0]?.id || '');
      setStatus(nextItems.length ? 'Ready' : 'Add a word or open Class to fill your notebook.');
    }
    loadNotebook();
    return () => {
      cancelled = true;
    };
  }, [nativeLanguage, targetLanguage]);

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
    ['all', 'All'],
    ['class', 'Class'],
    ['context', 'Context'],
    ['conversation', 'Conversation'],
    ['personal', 'Personal'],
  ]), []);

  const selectNext = () => {
    const list = filteredItems.length ? filteredItems : items;
    if (!list.length) return;
    const index = Math.max(0, list.findIndex((item) => item.id === selectedItem?.id));
    setSelectedId(list[(index + 1) % list.length].id);
    setReview({ shape: false, spacing: false, memory: false });
  };

  const speakPrompt = async () => {
    if (!selectedItem?.target) return;
    setStatus('Playing target text...');
    try {
      await speechService.speakAsync(selectedItem.target, {
        lang: LANGUAGES[targetLanguage]?.ttsLocale || targetLanguage,
        rate: '0.9',
      });
      setStatus('Ready');
    } catch (_) {
      setStatus('Audio playback was interrupted.');
    }
  };

  const saveAttempt = (result) => {
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
    setStatus(result === 'complete' ? 'Saved as complete. Moving to the next item.' : 'Saved for more practice.');
    if (result === 'complete') selectNext();
  };

  const addPersonalItem = () => {
    const item = notebookItem({
      target: customTarget,
      native: customNative,
      source: 'personal',
      sourceLabel: 'Personal notebook',
      type: 'custom',
    });
    if (!item) {
      setStatus('Add target text first.');
      return;
    }
    const personal = uniqueItems([item, ...loadJsonArray(PERSONAL_NOTEBOOK_KEY)]).slice(0, 80);
    localStorage.setItem(PERSONAL_NOTEBOOK_KEY, JSON.stringify(personal));
    setItems((current) => uniqueItems([item, ...current]));
    setSelectedId(item.id);
    setCustomTarget('');
    setCustomNative('');
    setStatus('Added to your writing notebook.');
  };

  const instructionText = () => {
    if (!selectedItem) return 'Add a word or sentence to begin.';
    if (mode === 'listen') return 'Press Play, write what you hear, then reveal the answer.';
    if (mode === 'meaning') return `Write the ${targetName} for this meaning.`;
    if (mode === 'stroke') return 'Follow the guide, then use the writing area to practice.';
    if (mode === 'review') return 'Compare your writing with the answer and mark what was strong.';
    return modeConfig.prompt;
  };

  return (
    <div className="writing-page">
      <section className="writing-header">
        <div>
          <p className="writing-kicker">Exercise</p>
          <h1>Writing practice</h1>
          <p>Trace, copy, listen, recall by meaning, study stroke order, and keep a notebook from your lessons.</p>
        </div>
        <div className="writing-stat">
          <strong>{items.length}</strong>
          <span>notebook items</span>
        </div>
      </section>

      <section className="writing-layout">
        <aside className="writing-sidebar">
          <div className="writing-card">
            <h2>Notebook</h2>
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
              {filteredItems.length === 0 && <p className="writing-empty">No items in this source yet.</p>}
            </div>
          </div>

          <div className="writing-card">
            <h2>Add your own</h2>
            <input value={customTarget} onChange={(event) => setCustomTarget(event.target.value)} placeholder="Target word or sentence" />
            <input value={customNative} onChange={(event) => setCustomNative(event.target.value)} placeholder="Meaning or note" />
            <button type="button" className="writing-primary" onClick={addPersonalItem}>Add to notebook</button>
          </div>
        </aside>

        <main className="writing-workspace">
          <div className="writing-mode-tabs" role="tablist" aria-label="Writing modes">
            {MODES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={mode === item.id ? 'active' : ''}
                onClick={() => setMode(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="writing-card writing-practice-card">
            <div className="writing-practice-head">
              <div>
                <p className="writing-kicker">{selectedItem?.sourceLabel || 'Writing notebook'}</p>
                <h2>{modeConfig.label}</h2>
              </div>
              <button type="button" onClick={speakPrompt} disabled={!selectedItem}>Play</button>
            </div>

            <p className="writing-instruction">{instructionText()}</p>

            {selectedItem && mode !== 'listen' && mode !== 'meaning' && (
              <div className="writing-answer-card">
                <span>Target</span>
                <strong>{selectedItem.target}</strong>
                {selectedItem.romanization && <small>{selectedItem.romanization}</small>}
                {selectedItem.native && <em>{selectedItem.native}</em>}
              </div>
            )}

            {selectedItem && mode === 'meaning' && (
              <div className="writing-answer-card">
                <span>Meaning</span>
                <strong>{selectedItem.native || 'Recall the target text from your notebook.'}</strong>
              </div>
            )}

            {selectedItem && mode === 'stroke' && (
              <div className="writing-stroke-guide">
                {strokeGuideFor(selectedItem.target, targetLanguage).map((line) => <div key={line}>{line}</div>)}
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
                <summary>Show answer</summary>
                <strong>{selectedItem.target}</strong>
                {selectedItem.native && <span>{selectedItem.native}</span>}
              </details>
            )}

            <div className="writing-review">
              <label>
                <input type="checkbox" checked={review.shape} onChange={(event) => setReview({ ...review, shape: event.target.checked })} />
                Shape matches
              </label>
              <label>
                <input type="checkbox" checked={review.spacing} onChange={(event) => setReview({ ...review, spacing: event.target.checked })} />
                Spacing is clear
              </label>
              <label>
                <input type="checkbox" checked={review.memory} onChange={(event) => setReview({ ...review, memory: event.target.checked })} />
                I can write it from memory
              </label>
            </div>

            <div className="writing-actions">
              <button type="button" onClick={() => saveAttempt('needs-practice')} disabled={!selectedItem}>Save for review</button>
              <button type="button" className="writing-primary" onClick={() => saveAttempt('complete')} disabled={!selectedItem}>
                Mark complete and next
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
