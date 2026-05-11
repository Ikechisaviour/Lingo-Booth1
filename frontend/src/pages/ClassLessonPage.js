import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiVolume2 } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { aiService, classLessonService, practiceContextService } from '../services/api';
import speechService from '../services/speechService';
import LANGUAGES from '../config/languages';
import {
  getNativeLangCode,
  getNativeLangName,
  getTargetLangCode,
  getTargetLangName,
} from '../config/languages';
import {
  displayPartsForMessage,
  languageLabel,
  languageRole,
  speechChunksForPart,
  spokenPartsForMessage,
} from '../utils/languageSegments';
import PronunciationGuide from '../components/PronunciationGuide';
import VoicePickerModal from '../components/VoicePickerModal';
import { contrastingVoiceForLocale, roleVoiceForLocale, tutorVoiceForLocale } from '../utils/roleVoices';
import './ClassLessonPage.css';

const FORMATTING_FALLBACK_REPLY = 'I had trouble formatting that reply. Please try again naturally.';
const firstText = (...values) => values.find((value) => String(value || '').trim()) || '';
const CLASS_SETUP_TEXT = {
  en: 'I am ready to teach this lesson. Start with the first item, ask for an explanation, or type your own question.',
  ko: '이 수업을 안내할 준비가 됐어요. 첫 항목부터 시작하거나, 설명을 요청하거나, 질문을 입력해 주세요.',
  es: 'Estoy listo para guiar esta clase. Empieza con el primer punto, pide una explicación o escribe tu pregunta.',
  fr: 'Je suis prêt à guider cette leçon. Commence par le premier élément, demande une explication ou écris ta question.',
  de: 'Ich bin bereit, diese Lektion zu begleiten. Beginne mit dem ersten Punkt, bitte um eine Erklärung oder stelle deine Frage.',
  zh: '我已经准备好带你学习这一课。你可以从第一项开始，要求解释，或输入你的问题。',
  ja: 'このレッスンを案内できます。最初の項目から始めるか、説明を求めるか、質問を入力してください。',
  hi: 'मैं यह पाठ सिखाने के लिए तैयार हूँ। पहले भाग से शुरू करें, समझाने को कहें, या अपना प्रश्न लिखें।',
  ar: 'أنا جاهز لإرشادك في هذا الدرس. ابدأ بالعنصر الأول، أو اطلب شرحًا، أو اكتب سؤالك.',
  he: 'אני מוכן להדריך אותך בשיעור הזה. אפשר להתחיל מהפריט הראשון, לבקש הסבר או לכתוב שאלה.',
  pt: 'Estou pronto para orientar esta aula. Comece pelo primeiro item, peça uma explicação ou digite sua pergunta.',
  it: 'Sono pronto a guidare questa lezione. Inizia dal primo elemento, chiedi una spiegazione o scrivi una domanda.',
  nl: 'Ik ben klaar om deze les te begeleiden. Begin met het eerste onderdeel, vraag uitleg of typ je vraag.',
  ru: 'Я готов провести этот урок. Начните с первого пункта, попросите объяснение или введите свой вопрос.',
  id: 'Saya siap memandu pelajaran ini. Mulai dari bagian pertama, minta penjelasan, atau ketik pertanyaan Anda.',
  ms: 'Saya bersedia membimbing pelajaran ini. Mulakan dengan item pertama, minta penjelasan, atau taip soalan anda.',
  fil: 'Handa na akong gabayan ang araling ito. Magsimula sa unang item, humingi ng paliwanag, o i-type ang tanong mo.',
  tr: 'Bu dersi anlatmaya hazırım. İlk maddeden başlayın, açıklama isteyin veya sorunuzu yazın.',
  bn: 'আমি এই পাঠ শেখাতে প্রস্তুত। প্রথম আইটেম দিয়ে শুরু করুন, ব্যাখ্যা চান, অথবা আপনার প্রশ্ন লিখুন।',
  ta: 'இந்த பாடத்தை வழிநடத்த நான் தயாராக இருக்கிறேன். முதல் உருப்படியிலிருந்து தொடங்குங்கள், விளக்கம் கேளுங்கள், அல்லது உங்கள் கேள்வியை எழுதுங்கள்.',
};

function classSetupText(language = 'en') {
  return CLASS_SETUP_TEXT[String(language || '').toLowerCase()] || CLASS_SETUP_TEXT.en;
}

function getSpeechRecognition() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function ttsLocaleFor(languageCode, fallbackCode) {
  return LANGUAGES[languageCode]?.ttsLocale
    || LANGUAGES[fallbackCode]?.ttsLocale
    || 'en-US';
}

function isProOrUltraTier(tier) {
  return ['pro', 'ultra'].includes(String(tier || '').toLowerCase());
}

function getStoredPracticeContextAccess() {
  if (localStorage.getItem('userRole') === 'admin') return true;

  try {
    const entitlements = JSON.parse(localStorage.getItem('aiEntitlements') || '{}');
    if (entitlements.canUsePracticeContext) return true;
    if (isProOrUltraTier(entitlements.subscriptionTier)) return true;
  } catch (_) {
    // Ignore malformed local settings and fall back to the stored tier below.
  }

  return isProOrUltraTier(localStorage.getItem('subscriptionTier'));
}

// Default activity plan used when a Lesson document does not declare its own activities[].
// Real textbook units should ship their activities + per-item activityIds in the seed data
// (see backend/textbookLessons/unit1.js). This fallback covers legacy lessons only.
const DEFAULT_ACTIVITY_PLAN = [
  {
    id: 'preview',
    section: 'Preview',
    title: 'Lesson overview',
    goals: ['Preview the lesson and set a learning goal.'],
    task: 'Tell the tutor what you want to understand first.',
  },
  {
    id: 'learn',
    section: 'Learn',
    title: 'Guided explanation',
    goals: ['Study the selected lesson item with the tutor.'],
    task: 'Ask for a simple explanation or example.',
  },
  {
    id: 'practice',
    section: 'Practice',
    title: 'Active practice',
    goals: ['Use the target language in a short answer.'],
    task: 'Write or say one original answer using the lesson material.',
  },
  {
    id: 'review',
    section: 'Review',
    title: 'Check understanding',
    goals: ['Review mistakes and summarize what you learned.'],
    task: 'Summarize one thing you learned and one thing that is still unclear.',
  },
];

const itemTarget = (item = {}) => firstText(item.targetText, item.korean);
const itemNative = (item = {}) => firstText(item.nativeText, item.english);
const itemExampleTarget = (item = {}) => firstText(item.exampleTarget, item.example);
const itemExampleNative = (item = {}) => firstText(item.exampleNative, item.exampleEnglish);

function itemSection(item = {}) {
  if (item.type === 'word') return 'Vocabulary';
  if (item.type === 'sentence') return 'Grammar';
  if (item.type === 'conversation') return 'Dialogue';
  return 'Practice';
}

function classStorageKey(classLessonId) {
  const targetLanguage = getTargetLangCode();
  const nativeLanguage = getNativeLangCode();
  return `lingoClassLesson:${classLessonId}:${nativeLanguage}-${targetLanguage}`;
}

// Normalize a possibly-legacy lessonProgress object to the current schema.
// Old shape: { section, index, activitySection, activityTitle, activityIndex }
// New shape: { activityId, activitySection, activityTitle, itemIndex, itemType }
// Self-heals returning users so the very first request after upgrade carries
// a clean payload, instead of letting stale fields ride along until the AI
// overwrites them on its reply.
function migrateLessonProgress(progress) {
  if (!progress || typeof progress !== 'object') return progress;
  const next = {
    activityId: progress.activityId || '',
    activitySection: progress.activitySection || '',
    activityTitle: progress.activityTitle || '',
    itemIndex: typeof progress.itemIndex === 'number'
      ? progress.itemIndex
      : (typeof progress.index === 'number' ? progress.index : 0),
    itemType: progress.itemType
      || (['word', 'sentence', 'conversation'].includes(progress.section) ? progress.section : ''),
  };
  return next;
}

function migrateMemory(memory) {
  if (!memory || typeof memory !== 'object') return memory || {};
  if (!memory.lessonProgress) return memory;
  return { ...memory, lessonProgress: migrateLessonProgress(memory.lessonProgress) };
}

function makeTutorTurn(role, content, extra = {}) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    ...extra,
  };
}

function makeTutorSetupTurn(content, language = 'en') {
  return makeTutorTurn('assistant', content, {
    language,
    speechParts: [{ language, text: content }],
  });
}

function isFormattingFallbackTurn(turn = {}) {
  return turn.role === 'assistant'
    && String(turn.content || '').trim() === FORMATTING_FALLBACK_REPLY;
}

function normalizeTutorTurns(turns = [], nativeLanguage = 'en') {
  const cleaned = turns
    .filter(turn => turn && !isFormattingFallbackTurn(turn))
    .map(turn => ({
      ...turn,
      content: String(turn.content || '').trim(),
      speechParts: Array.isArray(turn.speechParts)
        ? turn.speechParts
          .map(part => ({
            ...part,
            text: String(part?.text || '').trim(),
          }))
          .filter(part => part.text)
        : [],
      displayParts: Array.isArray(turn.displayParts)
        ? turn.displayParts
          .map(part => ({
            ...part,
            text: String(part?.text || '').trim(),
          }))
          .filter(part => part.text)
        : [],
    }))
    .filter(turn => turn.content);

  return cleaned.length
    ? cleaned
    : [makeTutorSetupTurn(classSetupText(nativeLanguage), nativeLanguage)];
}

function normalizeProgressRecord(record = {}, nativeLanguage = 'en') {
  const completedItems = Array.isArray(record.completedItems)
    ? record.completedItems
    : (Array.isArray(record.completed) ? record.completed : []);
  return {
    selectedIndex: Number.isInteger(record.selectedIndex) ? record.selectedIndex : 0,
    selectedActivityIndex: Number.isInteger(record.selectedActivityIndex) ? record.selectedActivityIndex : 0,
    completed: new Set(completedItems.filter(Number.isInteger)),
    summary: record.summary || '',
    memory: migrateMemory(record.memory || {}),
    tutorTurns: Array.isArray(record.tutorTurns) && record.tutorTurns.length
      ? normalizeTutorTurns(record.tutorTurns, nativeLanguage)
      : [makeTutorSetupTurn(classSetupText(nativeLanguage), nativeLanguage)],
  };
}

function buildProgressRecord({
  selectedIndex,
  selectedActivityIndex,
  completed,
  summary,
  memory,
  tutorTurns,
}) {
  return {
    selectedIndex,
    selectedActivityIndex,
    completed: Array.from(completed),
    completedItems: Array.from(completed),
    summary,
    memory,
    tutorTurns: tutorTurns.filter(turn => !isFormattingFallbackTurn(turn) && !turn.error).slice(-16),
  };
}

function lessonActionFallback(item, activity, targetLanguage = 'ko', nativeLanguage = 'en') {
  const targetLanguageCode = String(targetLanguage || '').toLowerCase();
  const nativeLanguageCode = String(nativeLanguage || '').toLowerCase();
  const pairHasEnglish = targetLanguageCode === 'en' || nativeLanguageCode === 'en';
  const target = itemTarget(item);
  const native = itemNative(item);
  const romanization = item?.romanization || item?.pronunciation || '';
  const exampleTarget = itemExampleTarget(item);
  const exampleNative = itemExampleNative(item);
  const title = activity?.title || activity?.section || 'this item';
  const task = activity?.task || 'Try one short answer using this lesson item.';
  const lines = pairHasEnglish ? [`Let's practice ${title}.`] : [];
  const targetLine = [target, romanization ? `(${romanization})` : ''].filter(Boolean).join(' ');

  if (targetLine && native) lines.push(`${targetLine} - ${native}`);
  else if (targetLine || native) lines.push(targetLine || native);

  if (exampleTarget && exampleNative) {
    lines.push(pairHasEnglish ? `Example: ${exampleTarget} - ${exampleNative}` : `${exampleTarget} - ${exampleNative}`);
  } else if (exampleTarget || exampleNative) {
    lines.push(pairHasEnglish ? `Example: ${exampleTarget || exampleNative}` : (exampleTarget || exampleNative));
  }

  if (pairHasEnglish) lines.push(task);

  return lines.join('\n').trim() || 'Let us continue with the next part of the lesson.';
}

function activityPlanForLesson(lesson) {
  if (Array.isArray(lesson?.activities) && lesson.activities.length > 0) {
    return lesson.activities;
  }
  return DEFAULT_ACTIVITY_PLAN;
}

// Group an activity's item indices into consecutive runs of the same item type.
// Preserves the original sequence (no reshuffling) and inserts a subheading
// label before each group when the activity mixes types. When all items share
// one type (typical for Vocabulary, Grammar, Pronunciation, Culture Note), the
// caller can render a single ungrouped strip — see classMixedActivity below.
function groupActivityItemsBySection(items, indices) {
  const labelFor = (type) => {
    if (type === 'word') return 'Vocabulary';
    if (type === 'sentence') return 'Grammar';
    if (type === 'conversation') return 'Dialogue';
    return 'Practice';
  };
  const groups = [];
  for (const idx of indices) {
    const item = items[idx];
    const label = labelFor(item?.type);
    const last = groups[groups.length - 1];
    if (last && last.label === label) {
      last.indices.push(idx);
    } else {
      groups.push({ label, indices: [idx] });
    }
  }
  return groups;
}

// Returns the indices into lesson.content[] that belong to the given activity.
// Untagged items (no activityIds) appear in every activity, so legacy data still works.
function itemIndicesForActivity(items, activityId) {
  if (!activityId) return items.map((_, i) => i);
  return items.reduce((acc, item, index) => {
    const tags = Array.isArray(item?.activityIds) ? item.activityIds : [];
    if (tags.length === 0 || tags.includes(activityId)) acc.push(index);
    return acc;
  }, []);
}

// Build the structured class-action payload sent to the AI tutor. Replaces the
// legacy CLASS_LESSON_ACTION text prefix that used to ride inside the transcript
// field — now the action travels in its own `classAction` request field, and
// `transcript` carries the short user-visible message.
function buildClassAction(action, lesson, item, index, activity, expressionPractice) {
  return {
    action,
    activityId: activity?.id || '',
    activitySection: activity?.section || '',
    activityTitle: activity?.title || '',
    activityGoals: Array.isArray(activity?.goals) ? activity.goals : [],
    activityTask: activity?.task || '',
    itemIndex: index,
    itemType: item?.type || '',
    target: itemTarget(item),
    romanization: item?.officialPronunciation || item?.romanization || item?.pronunciation || '',
    officialPronunciation: item?.officialPronunciation || item?.romanization || item?.pronunciation || '',
    learnerPronunciation: item?.learnerPronunciation || '',
    native: itemNative(item),
    exampleTarget: itemExampleTarget(item),
    exampleNative: itemExampleNative(item),
    lessonTitle: lesson?.title || '',
    ...(expressionPractice ? {
      expressionPracticeId: expressionPractice.id || '',
      expressionPracticeLabel: expressionPractice.label || '',
      expressionPracticeGoal: expressionPractice.goal || '',
    } : {}),
  };
}

function groupDisplayParts(parts = []) {
  const groups = [];
  let current = null;

  const pushGroup = (group) => {
    if (current && current.parts.length) groups.push(current);
    current = group;
  };

  parts.forEach((part) => {
    const isExampleMarker = part.type === 'meta' && /^example$/i.test(String(part.text || '').trim());
    const isExample = part.section === 'example' || isExampleMarker;
    const continuesExampleDialogue = current?.kind === 'example' && !!part.speaker;

    if (isExample || continuesExampleDialogue) {
      if (!current || current.kind !== 'example') {
        pushGroup({ kind: 'example', title: 'Example', parts: [] });
      }
      if (!isExampleMarker) {
        current.parts.push(part);
      }
      return;
    }

    if (!current || current.kind !== 'main') {
      pushGroup({ kind: 'main', title: '', parts: [] });
    }
    current.parts.push(part);
  });

  if (current && current.parts.length) groups.push(current);
  // Promote single-speaker examples to "Example" and keep "Example conversation"
  // only when the example actually contains two or more speakers.
  groups.forEach((group) => {
    if (group.kind !== 'example') return;
    const speakers = new Set(
      (group.parts || []).map((part) => part.speaker).filter(Boolean),
    );
    group.title = speakers.size >= 2 ? 'Example conversation' : 'Example';
  });
  return groups;
}

function exampleTopicFromGroup(group = {}) {
  const text = (group.parts || []).map(part => part.text || '').join(' ');
  if (/Kumoh/i.test(text)) return 'life at Kumoh National Institute of Technology';
  return '';
}

function exampleCueFor(_language, group) {
  const speakers = new Set((group.parts || []).map((part) => part.speaker).filter(Boolean));
  const isDialogue = speakers.size >= 2;
  const topic = exampleTopicFromGroup(group);
  if (isDialogue) {
    return topic
      ? `Example conversation about ${topic}. Listen to Person A and Person B.`
      : 'Example conversation. Listen to Person A and Person B.';
  }
  return topic ? `Example: ${topic}.` : 'Example.';
}

function shouldSpeakTutorPart(part = {}, options = {}) {
  const text = String(part?.text || '').trim();
  const structuralMeta = part.type === 'meta'
    && /^(example|sample|note|tip)$/i.test(text);
  if (!text || part.speak === false || part.type === 'romanization' || structuralMeta) {
    return false;
  }
  // The native-language gloss is suppressed by default during auto-play so
  // each item doesn't drag through a full English read. Per-line replay
  // (speakTutorPart) always plays both languages, regardless.
  if (options.speakNativeGloss === false && part.type === 'native') {
    return false;
  }
  return true;
}

function ClassLessonPage() {
  const { classLessonId } = useParams();
  const navigate = useNavigate();
  const threadRef = useRef(null);
  const recognitionRef = useRef(null);
  const tutorRequestInFlightRef = useRef(false);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(0);
  const [completed, setCompleted] = useState(() => new Set());
  const [turn, setTurn] = useState('');
  const [tutorTurns, setTutorTurns] = useState([]);
  const [tutorLoading, setTutorLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [speakNativeGloss, setSpeakNativeGloss] = useState(() => (
    localStorage.getItem('classSpeakNativeGloss') === 'true'
  ));
  const [speechInputMode, setSpeechInputMode] = useState('target');
  const [status, setStatus] = useState('Ready');
  const [audioUnlocked, setAudioUnlocked] = useState(() => speechService.isAudioUnlocked());
  const [showVoicePicker, setShowVoicePicker] = useState(false);
  // Per-session set of example groups that have already played their intro cue.
  // Reset when the page mounts so the first example each visit still gets cued.
  const exampleCueShownRef = useRef(new Set());
  const shouldPlayExampleCue = (group) => {
    const key = (group?.parts || [])
      .map(part => String(part?.text || '').trim())
      .filter(Boolean)
      .join('|');
    if (!key) return true;
    if (exampleCueShownRef.current.has(key)) return false;
    exampleCueShownRef.current.add(key);
    return true;
  };
  const [summary, setSummary] = useState('');
  const [memory, setMemory] = useState({});
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [progressSyncState, setProgressSyncState] = useState('local');
  const [contextRecommendations, setContextRecommendations] = useState(null);
  const [pendingContextPrompt, setPendingContextPrompt] = useState('');

  const targetLanguage = getTargetLangCode();
  const nativeLanguage = getNativeLangCode();
  const targetName = getTargetLangName();
  const nativeName = getNativeLangName();
  const speechSupported = !!getSpeechRecognition();
  const canUsePracticeContextFeature = getStoredPracticeContextAccess();

  useEffect(() => {
    if (audioUnlocked) return undefined;
    return speechService.onAudioUnlocked(() => setAudioUnlocked(true));
  }, [audioUnlocked]);

  // First-run voice picker: prompt once per target language so learners aren't
  // stuck with the default voice if they dislike it. Honors a "seen" flag for
  // users who choose to skip.
  useEffect(() => {
    if (!targetLanguage) return;
    const alreadyPicked = !!speechService.getSelectedVoiceName(targetLanguage);
    const skipped = localStorage.getItem('classVoicePickerSeen') === '1';
    if (!alreadyPicked && !skipped) setShowVoicePicker(true);
  }, [targetLanguage]);

  useEffect(() => {
    let cancelled = false;

    if (!classLessonId) {
      setError('Could not load this class lesson.');
      setLoading(false);
      return undefined;
    }

    async function loadClassLesson() {
      try {
        setLoading(true);
        setProgressLoaded(false);
        const response = await classLessonService.getClassLesson(classLessonId);
        if (cancelled) return;
        setLesson(response.data);

        const applyProgress = (record) => {
          const progress = normalizeProgressRecord(record, nativeLanguage);
          setSelectedIndex(progress.selectedIndex);
          setSelectedActivityIndex(progress.selectedActivityIndex);
          setCompleted(progress.completed);
          setSummary(progress.summary);
          setMemory(progress.memory);
          setTutorTurns(progress.tutorTurns);
        };

        try {
          const stored = JSON.parse(localStorage.getItem(classStorageKey(classLessonId)) || '{}');
          applyProgress(stored);
        } catch {
          setTutorTurns([makeTutorSetupTurn(classSetupText(nativeLanguage), nativeLanguage)]);
        }

        try {
          const progressResponse = await classLessonService.getProgress(classLessonId);
          if (cancelled) return;
          if (progressResponse.data?.canSync && progressResponse.data?.progress) {
            applyProgress(progressResponse.data.progress);
            setProgressSyncState('synced');
          } else {
            setProgressSyncState(progressResponse.data?.canSync ? 'synced' : 'local');
          }
        } catch {
          if (!cancelled) setProgressSyncState('local');
        }
      } catch (err) {
        if (!cancelled) setError('Could not load this class lesson.');
      } finally {
        if (!cancelled) {
          setProgressLoaded(true);
          setLoading(false);
        }
      }
    }

    loadClassLesson();
    return () => {
      cancelled = true;
    };
  }, [classLessonId, nativeLanguage]);

  useEffect(() => {
    if (!lesson || !progressLoaded) return undefined;
    const payload = buildProgressRecord({
      selectedIndex,
      selectedActivityIndex,
      completed,
      summary,
      memory,
      tutorTurns,
    });
    localStorage.setItem(classStorageKey(classLessonId), JSON.stringify(payload));

    const timer = setTimeout(() => {
      classLessonService.saveProgress(classLessonId, payload)
        .then((res) => {
          if (res.data?.canSync) setProgressSyncState('synced');
          else setProgressSyncState('local');
        })
        .catch(() => setProgressSyncState('local'));
    }, 700);

    return () => clearTimeout(timer);
  }, [classLessonId, completed, lesson, memory, progressLoaded, selectedActivityIndex, selectedIndex, summary, tutorTurns]);

  useEffect(() => {
    setTutorTurns((prev) => (
      prev.some(isFormattingFallbackTurn)
        ? normalizeTutorTurns(prev, nativeLanguage)
        : prev
    ));
  }, [nativeLanguage]);

  useEffect(() => {
    if (!threadRef.current) return;
    threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [tutorTurns, tutorLoading]);

  useEffect(() => {
    let cancelled = false;
    if (!canUsePracticeContextFeature) {
      setContextRecommendations(null);
      return () => {
        cancelled = true;
      };
    }
    practiceContextService.recommendations(targetLanguage)
      .then((res) => {
        if (!cancelled) setContextRecommendations(res.data || null);
      })
      .catch(() => {
        if (!cancelled) setContextRecommendations(null);
      });
    return () => {
      cancelled = true;
    };
  }, [canUsePracticeContextFeature, targetLanguage]);

  useEffect(() => {
    if (!canUsePracticeContextFeature) {
      sessionStorage.removeItem('lingoContextClassPrompt');
      setPendingContextPrompt('');
      return;
    }
    const prompt = sessionStorage.getItem('lingoContextClassPrompt');
    if (!prompt) return;
    sessionStorage.removeItem('lingoContextClassPrompt');
    setPendingContextPrompt(prompt);
    setStatus('Personalized class prompt ready.');
  }, [canUsePracticeContextFeature]);

  useEffect(() => (
    () => {
      recognitionRef.current?.abort?.();
      recognitionRef.current = null;
      speechService.cancel();
    }
  ), []);

  const items = useMemo(() => lesson?.content || [], [lesson]);
  const selectedItem = items[selectedIndex] || {};
  const activityPlan = useMemo(() => activityPlanForLesson(lesson), [lesson]);
  const selectedActivity = activityPlan[selectedActivityIndex] || activityPlan[0];
  const activityItemIndices = useMemo(
    () => itemIndicesForActivity(items, selectedActivity?.id),
    [items, selectedActivity?.id],
  );
  const positionInActivity = activityItemIndices.indexOf(selectedIndex);
  const progressPercent = items.length ? Math.round((completed.size / items.length) * 100) : 0;
  const contextClassPrompts = useMemo(() => {
    if (!canUsePracticeContextFeature) return [];
    return Array.from(new Set([
      pendingContextPrompt,
      ...((contextRecommendations?.classPrompts || [])),
    ])).filter(Boolean).slice(0, 4);
  }, [canUsePracticeContextFeature, contextRecommendations, pendingContextPrompt]);

  // When the user picks a new activity, jump to its first item if the currently selected
  // item is not part of it. This keeps the focus card in sync with the activity rail.
  useEffect(() => {
    if (!activityItemIndices.length) return;
    if (!activityItemIndices.includes(selectedIndex)) {
      setSelectedIndex(activityItemIndices[0]);
    }
  }, [activityItemIndices, selectedIndex]);

  const sectionCounts = useMemo(() => {
    return items.reduce((counts, item) => {
      const section = itemSection(item);
      counts[section] = (counts[section] || 0) + 1;
      return counts;
    }, {});
  }, [items]);

  // Resolve the voice for a single spoken chunk.
  //   • Dialogue speakers (Person A / Person B) take their dedicated dialogue voices.
  //   • Otherwise the target-language locale uses the tutor voice (which is
  //     deliberately distinct from Person A), and the native-language gloss
  //     uses a contrasting-gender voice so the language switch is audible.
  const tutorTargetLocale = ttsLocaleFor(targetLanguage, targetLanguage);
  const tutorTargetVoice = tutorVoiceForLocale(tutorTargetLocale);
  const resolveVoice = (lang, speaker) => {
    const speakerVoice = roleVoiceForLocale(lang, speaker);
    if (speakerVoice) return speakerVoice;
    const tutorVoice = tutorVoiceForLocale(lang);
    if (tutorVoice && lang === tutorTargetLocale) return tutorVoice;
    if (tutorTargetVoice) return contrastingVoiceForLocale(lang, tutorTargetVoice);
    return tutorVoice || '';
  };

  const speakTutorTurn = async (message, options = {}) => {
    const displayParts = displayPartsForMessage(message, targetLanguage, nativeLanguage);
    const hasStructuredParts = Array.isArray(message?.displayParts) && message.displayParts.length > 0;
    const groups = groupDisplayParts(displayParts);
    const hasExampleGroup = groups.some(group => group.kind === 'example');
    const shouldUseVisibleOrder = hasStructuredParts || hasExampleGroup || displayParts.length > 1;
    const speechParts = shouldUseVisibleOrder
      ? groups.flatMap((group) => [
        ...(group.kind === 'example' && shouldPlayExampleCue(group)
          ? [{ language: nativeLanguage, text: exampleCueFor(nativeLanguage, group), speaker: '' }]
          : []),
        ...group.parts
          .filter(part => shouldSpeakTutorPart(part, { speakNativeGloss }))
          .flatMap(part => speechChunksForPart(
            { ...part, language: part.language || message?.language },
            targetLanguage,
            nativeLanguage,
            message?.language
          )),
      ])
      : spokenPartsForMessage(message, targetLanguage, nativeLanguage);
    try {
      if (speechParts.length) {
        for (const part of speechParts) {
          if (part.text) {
            const lang = ttsLocaleFor(part.language || message?.language, targetLanguage);
            await speechService.speakAsync(part.text, {
              lang,
              voice: resolveVoice(lang, part.speaker),
              rate: options.rate || '-10%',
            });
          }
        }
        return;
      }

      const text = String(message?.content || '').trim();
      if (!text) return;

      const lang = ttsLocaleFor(message?.language || targetLanguage, targetLanguage);
      await speechService.speakAsync(text, {
        lang,
        voice: resolveVoice(lang, ''),
        rate: options.rate || '-10%',
      });
    } catch (_) {
      setStatus('Audio playback was interrupted.');
    }
  };

  const speakTutorPart = async (part, options = {}) => {
    if (!shouldSpeakTutorPart(part, { speakNativeGloss: true })) return;

    try {
      await speechService.cancel();
      const chunks = speechChunksForPart(part, targetLanguage, nativeLanguage, part?.language);
      for (const chunk of chunks) {
        if (!chunk.text) continue;
        const lang = ttsLocaleFor(chunk.language || part?.language || targetLanguage, targetLanguage);
        await speechService.speakAsync(chunk.text, {
          lang,
          voice: resolveVoice(lang, chunk.speaker || part?.speaker),
          rate: options.rate || '-10%',
        });
      }
      setStatus('Playing selected line.');
    } catch (_) {
      setStatus('Audio playback was interrupted.');
    }
  };

  const stopSpeech = () => {
    speechService.cancel();
    setStatus('Speech stopped.');
  };

  const sendTutorTurn = async (displayText, classActionOrText, options = {}) => {
    if (!lesson || tutorLoading || tutorRequestInFlightRef.current) return;
    tutorRequestInFlightRef.current = true;

    // The second arg can be either a structured classAction object (preferred,
    // for tutor-control turns from button clicks) or a string instruction (free
    // typing / mic input). Free turns reuse displayText as the transcript.
    const classAction = classActionOrText && typeof classActionOrText === 'object'
      ? classActionOrText
      : null;
    const transcriptForTurn = classAction ? displayText : (classActionOrText || displayText);

    const userTurn = makeTutorTurn('user', displayText);
    const cleanedTurns = tutorTurns
      .filter(turn => !isFormattingFallbackTurn(turn) && !turn.error);
    const requestHistory = cleanedTurns
      .map(({ role, content }) => ({ role, content }))
      .slice(-10);
    setTutorTurns(options.skipUserTurn ? cleanedTurns : [...cleanedTurns, userTurn]);
    setTutorLoading(true);
    setStatus('Tutor is preparing your next step...');

    try {
      const response = await aiService.sendConversationTurn({
        sessionId: `class-lesson:${classLessonId}:${nativeLanguage}-${targetLanguage}`,
        scenario: `Class lesson: ${lesson.title}`,
        targetLanguage,
        nativeLanguage,
        inputLanguage: options.inputLanguage || nativeLanguage,
        difficulty: 'structured class lesson with active learner participation',
        transcript: transcriptForTurn,
        classAction: classAction || undefined,
        history: requestHistory,
        summary,
        memory: {
          ...memory,
          lessonProgress: {
            activityId: selectedActivity?.id || '',
            activitySection: selectedActivity?.section || '',
            activityTitle: selectedActivity?.title || '',
            itemIndex: selectedIndex,
            itemType: selectedItem?.type || '',
          },
        },
        classLessonId,
        activityId: selectedActivity?.id || undefined,
      });

      const data = response.data || {};
      const rawReply = String(data.reply || '').trim();
      const reply = rawReply === FORMATTING_FALLBACK_REPLY
        ? lessonActionFallback(selectedItem, selectedActivity, targetLanguage, nativeLanguage)
        : rawReply || 'Let us continue with the next part of the lesson.';
      const assistantTurn = makeTutorTurn('assistant', reply, {
        coachingTip: data.coachingTip || '',
        speechParts: Array.isArray(data.speechParts) ? data.speechParts : [],
        displayParts: Array.isArray(data.displayParts) ? data.displayParts : [],
        language: data.expectedLanguage || targetLanguage,
      });
      setSummary(data.summary || summary);
      setMemory(data.memory || memory);
      setTutorTurns((prev) => [...prev, assistantTurn]);

      // Bidirectional progress sync: when the AI advances the learner past the
      // current item (within the same activity, to a valid position), reflect
      // that in the UI so the strip and focus card stay aligned with the tutor.
      // Cross-activity hops are ignored — the user must click into a new
      // activity explicitly to avoid surprise jumps.
      const aiProgress = data?.memory?.lessonProgress;
      if (aiProgress
        && typeof aiProgress.itemIndex === 'number'
        && Number.isInteger(aiProgress.itemIndex)
        && aiProgress.itemIndex >= 0
        && aiProgress.itemIndex < items.length
        && aiProgress.itemIndex !== selectedIndex
        && (!aiProgress.activityId || aiProgress.activityId === selectedActivity?.id)
      ) {
        setSelectedIndex(aiProgress.itemIndex);
      }

      setStatus('Tutor replied.');
      if (speechEnabled) await speakTutorTurn(assistantTurn);
    } catch (err) {
      const quotaMessage = err?.response?.data?.message;
      setTutorTurns((prev) => [
        ...prev.filter(turn => !turn.error),
        makeTutorTurn('assistant', quotaMessage || 'The tutor could not reply this time. Please try again.', {
          error: true,
          language: nativeLanguage,
          retryDisplayText: displayText,
          retryClassAction: classAction || undefined,
          retryInstructionText: classAction ? undefined : transcriptForTurn,
        }),
      ]);
      setStatus('Tutor had trouble replying.');
    } finally {
      tutorRequestInFlightRef.current = false;
      setTutorLoading(false);
    }
  };

  const retryTutorTurn = (message) => {
    if (message?.retryClassAction) {
      sendTutorTurn(
        message.retryDisplayText || 'Retry tutor response',
        message.retryClassAction,
        { skipUserTurn: true },
      );
      return;
    }
    if (!message?.retryInstructionText) return;
    sendTutorTurn(
      message.retryDisplayText || 'Retry tutor response',
      message.retryInstructionText,
      { skipUserTurn: true },
    );
  };

  const teachSelected = () => {
    sendTutorTurn(
      `Teach ${selectedActivity?.section || 'activity'}: item ${selectedIndex + 1}`,
      buildClassAction('teach_selected_item', lesson, selectedItem, selectedIndex, selectedActivity),
    );
  };

  const practiceSelected = () => {
    sendTutorTurn(
      `Practice ${selectedActivity?.section || 'activity'}: item ${selectedIndex + 1}`,
      buildClassAction('practice_selected_item', lesson, selectedItem, selectedIndex, selectedActivity),
    );
  };

  const explainSelected = () => {
    sendTutorTurn(
      `Explain ${selectedActivity?.section || 'activity'}: item ${selectedIndex + 1}`,
      buildClassAction('explain_selected_item', lesson, selectedItem, selectedIndex, selectedActivity),
    );
  };

  // Drill a specific Expression Practice goal (workbook 표현 연습 column).
  // Sends a class action with expressionPracticeId set; the AI tutor uses it
  // as a Speaking sub-mode focused on that one functional goal.
  const practiceExpression = (expressionPractice) => {
    if (!expressionPractice) return;
    sendTutorTurn(
      `Practice expression: ${expressionPractice.label || expressionPractice.id}`,
      buildClassAction(
        'practice_expression',
        lesson,
        selectedItem,
        selectedIndex,
        selectedActivity,
        expressionPractice,
      ),
    );
  };

  const markComplete = () => {
    setCompleted((prev) => new Set([...prev, selectedIndex]));
    const nextPos = positionInActivity + 1;
    if (positionInActivity >= 0 && nextPos < activityItemIndices.length) {
      setSelectedIndex(activityItemIndices[nextPos]);
      setStatus('Marked complete. Moving to the next item.');
    } else {
      setStatus('Marked complete.');
    }
  };

  const goToItem = (index, teach = false) => {
    const nextIndex = Math.max(0, Math.min(index, items.length - 1));
    setSelectedIndex(nextIndex);
    if (teach) {
      const nextItem = items[nextIndex];
      sendTutorTurn(
        `Teach item ${nextIndex + 1}`,
        buildClassAction('teach_selected_item', lesson, nextItem, nextIndex, selectedActivity),
      );
    }
  };

  const sendFreeTurn = () => {
    const text = turn.trim();
    if (!text) return;
    setTurn('');
    sendTutorTurn(text, text);
  };

  // Map a SpeechRecognition error code to actionable, learner-friendly text.
  // The Web Speech API's terse error names ("not-allowed", "service-not-allowed")
  // mean nothing to most users — give them a next step.
  const speechErrorMessage = (event) => {
    switch (event?.error) {
      case 'not-allowed':
      case 'service-not-allowed':
        return 'Microphone permission is blocked. Open your browser site settings, allow the microphone, then reload this page.';
      case 'no-speech':
        return 'No speech was heard. Try again — speak after the "Listening…" indicator appears.';
      case 'audio-capture':
        return 'No microphone detected. Plug in or enable a microphone, then try again.';
      case 'network':
        return 'Network error during speech recognition. Check your connection and try again.';
      case 'aborted':
        return 'Speech input was cancelled.';
      default:
        return 'Could not capture speech. Please try again.';
    }
  };

  const startListening = () => {
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setStatus('Voice input is unavailable in this browser. You can type in the box below instead — Chrome or Edge on a laptop supports speaking.');
      return;
    }
    if (tutorLoading) return;

    recognitionRef.current?.abort?.();
    speechService.cancel();

    const recognition = new Recognition();
    recognition.lang = speechInputMode === 'native'
      ? ttsLocaleFor(nativeLanguage, nativeLanguage)
      : ttsLocaleFor(targetLanguage, targetLanguage);
    // Live captions + tolerant of mid-sentence pauses so beginners aren't
    // cut off when they hesitate over a Korean word. The user explicitly
    // stops via the mic button when they're done.
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;
    recognitionRef.current = recognition;

    let finalTranscript = '';
    recognition.onstart = () => {
      setListening(true);
      setStatus('Listening… tap the mic again when you finish.');
    };

    recognition.onerror = (event) => {
      setListening(false);
      setStatus(speechErrorMessage(event));
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
      const captured = (finalTranscript || turn || '').trim();
      if (captured) {
        // Hand the transcript to the user for review/edit before it's sent —
        // a misrecognized phrase shouldn't go straight to the tutor.
        setTurn(captured);
        setStatus('Speech captured. Edit if needed, then press send.');
      } else {
        setStatus('No speech captured. Try again.');
      }
    };

    recognition.onresult = (event) => {
      let interim = '';
      let finalChunk = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const text = result?.[0]?.transcript || '';
        if (result.isFinal) finalChunk += text;
        else interim += text;
      }
      if (finalChunk) finalTranscript = (finalTranscript + ' ' + finalChunk).trim();
      const preview = `${finalTranscript} ${interim}`.trim();
      if (preview) setTurn(preview);
    };

    try {
      recognition.start();
    } catch (err) {
      setListening(false);
      setStatus(speechErrorMessage({ error: 'aborted' }));
    }
  };

  const stopListening = () => {
    // stop() lets the engine emit any pending final result; abort() drops them.
    recognitionRef.current?.stop?.();
    setListening(false);
  };

  const renderTutorMessageBody = (message) => {
    const parts = displayPartsForMessage(message, targetLanguage, nativeLanguage);
    const hasDisplayParts = Array.isArray(message?.displayParts) && message.displayParts.length > 0;
    if (parts.length <= 1 && !hasDisplayParts) return <p>{message.content}</p>;
    const groups = groupDisplayParts(parts);

    return (
      <div className="class-language-segments">
        {groups.map((group, groupIndex) => (
          <div
            key={`${group.kind}-${groupIndex}`}
            className={group.kind === 'example' ? 'class-language-group example' : 'class-language-group'}
          >
            {group.title && <div className="class-language-group-title">{group.title}</div>}
            {group.parts.map((part, index) => {
              const role = languageRole(part, targetLanguage, nativeLanguage);
              const canSpeakPart = shouldSpeakTutorPart(part);
              return (
                <div key={`${part.language || 'part'}-${index}`} className={`class-language-segment ${role}`}>
                  <div className="class-language-segment-top">
                    <span className="class-language-label">
                      {part.speaker ? `${part.speaker} - ${languageLabel(part)}` : languageLabel(part)}
                    </span>
                    {canSpeakPart && (
                      <button
                        type="button"
                        className="class-segment-audio"
                        onClick={() => speakTutorPart(part)}
                        aria-label={`Play ${part.speaker ? `${part.speaker} ` : ''}${languageLabel(part)} line`}
                        title="Play this line"
                      >
                        <FiVolume2 aria-hidden="true" />
                      </button>
                    )}
                  </div>
                  <span className="class-language-text">{part.text}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };
  if (loading) {
    return <div className="class-lesson-loading">Loading class lesson...</div>;
  }

  if (error || !lesson) {
    return (
      <div className="class-lesson-loading">
        <strong>{error || 'Lesson not found.'}</strong>
        <button type="button" onClick={() => navigate('/class')}>Back to Class</button>
      </div>
    );
  }

  return (
    <div className="class-lesson-page">
      <VoicePickerModal
        open={showVoicePicker}
        targetLangCode={targetLanguage}
        targetLangName={targetName}
        ttsLocale={ttsLocaleFor(targetLanguage, targetLanguage)}
        onClose={() => setShowVoicePicker(false)}
        onPicked={() => {
          localStorage.setItem('classVoicePickerSeen', '1');
          setShowVoicePicker(false);
          setStatus('Voice updated. Click any line to hear it.');
        }}
      />
      {!audioUnlocked && speechEnabled && (
        <button
          type="button"
          className="class-audio-unlock"
          onClick={() => setAudioUnlocked(speechService.isAudioUnlocked() || true)}
        >
          Tap anywhere to enable spoken tutor replies on this device.
        </button>
      )}
      <header className="class-lesson-header">
        <button type="button" className="class-back" onClick={() => navigate('/class')}>Back to Class</button>
        <div>
          <p className="class-kicker">Class</p>
          <h1>{lesson.title}</h1>
          <p>{nativeName} -> {targetName}</p>
        </div>
        <div className="class-progress">
          <strong>{progressPercent}%</strong>
          <span>complete</span>
        </div>
      </header>

      <main className="class-lesson-shell">
        <aside className="class-agenda" aria-label="Lesson agenda">
          <div className="class-agenda-summary">
            <span>{activityPlan.length} textbook activities</span>
            <span>Unit sequence</span>
            {Object.entries(sectionCounts).map(([section, count]) => (
              <span key={section}>{section}: {count}</span>
            ))}
          </div>
          <div className="class-agenda-list">
            {activityPlan.map((activity, index) => (
              <button
                type="button"
                key={`${activity.section}-${index}`}
                className={`class-agenda-item ${index === selectedActivityIndex ? 'active' : ''}`}
                onClick={() => setSelectedActivityIndex(index)}
              >
                <span>{index + 1}</span>
                <strong>{activity.title}</strong>
                <small>{activity.section}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="class-focus" aria-label="Selected lesson item">
          <div className="class-focus-card">
            <div className="class-focus-topline">
              <span>{selectedActivity?.section}</span>
              <span>Activity {selectedActivityIndex + 1} of {activityPlan.length}</span>
            </div>
            <h2>{selectedActivity?.title}</h2>
            <div className="class-activity-goals">
              {(selectedActivity?.goals || []).map((goal) => <p key={goal}>{goal}</p>)}
            </div>
            {selectedActivity?.task && (
              <div className="class-activity-task">
                <span>Learner task</span>
                <p>{selectedActivity.task}</p>
              </div>
            )}

            {contextClassPrompts.length > 0 && (
              <div className="class-context-prompts">
                <span>Personalized for you</span>
                <div>
                  {contextClassPrompts.map((prompt) => (
                    <button
                      type="button"
                      key={prompt}
                      onClick={() => sendTutorTurn(prompt, prompt)}
                      disabled={tutorLoading}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/*
              Expression Practice (표현 연습): functional language goals from
              the workbook. Always visible when the lesson defines them so the
              learner can drill a specific function (e.g. "Seeking advice")
              independently of the current item. Tutor receives the chosen
              goal in the classAction payload.
            */}
            {Array.isArray(lesson?.expressionPractice) && lesson.expressionPractice.length > 0 && (
              <div className="class-expression-practice">
                <span className="class-expression-label">Expression practice</span>
                <div className="class-expression-chips">
                  {lesson.expressionPractice.map((expression) => (
                    <button
                      type="button"
                      key={expression.id}
                      className="class-expression-chip"
                      onClick={() => practiceExpression(expression)}
                      disabled={tutorLoading}
                      title={expression.goal || expression.label}
                    >
                      {expression.label || expression.id}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/*
              Item strip: when the activity mixes types (e.g. Speaking pulls in
              vocab + grammar + dialogue), the strip is split into per-section
              sub-groups with subheadings. When the activity is single-type
              (Vocabulary, Pronunciation, Culture Note...), the strip renders
              as one flat group without a redundant heading.
            */}
            {activityItemIndices.length === 0 ? (
              <div className="class-item-strip" aria-label="Lesson material">
                <p className="class-item-strip-empty">
                  No items are tagged for this activity yet. Pick another activity, or seed reading/listening/pronunciation/culture content for this section.
                </p>
              </div>
            ) : (() => {
              const groups = groupActivityItemsBySection(items, activityItemIndices);
              const showHeadings = groups.length > 1;
              return (
                <div className="class-item-groups" aria-label="Lesson material">
                  {groups.map((group, groupIndex) => (
                    <div key={`${group.label}-${groupIndex}`} className="class-item-group">
                      {showHeadings && (
                        <span className="class-item-group-label">
                          {group.label} ({group.indices.length})
                        </span>
                      )}
                      <div className="class-item-strip">
                        {group.indices.map((originalIndex) => {
                          const item = items[originalIndex];
                          if (!item) return null;
                          const positionInActivity = activityItemIndices.indexOf(originalIndex);
                          return (
                            <button
                              type="button"
                              key={`${item.type}-${originalIndex}`}
                              className={`${originalIndex === selectedIndex ? 'active' : ''} ${completed.has(originalIndex) ? 'done' : ''}`}
                              onClick={() => goToItem(originalIndex)}
                              title={`Item ${positionInActivity + 1} of ${activityItemIndices.length} in this activity`}
                            >
                              {positionInActivity + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            <div className="class-material-card">
              <div className="class-focus-topline">
                <span>{itemSection(selectedItem)}</span>
                <span>
                  {activityItemIndices.length > 0 && positionInActivity >= 0
                    ? `Item ${positionInActivity + 1} of ${activityItemIndices.length} in ${selectedActivity?.section || 'activity'}`
                    : `Item ${selectedIndex + 1} of ${items.length}`}
                </span>
              </div>
              <h3>{itemTarget(selectedItem)}</h3>
              <PronunciationGuide
                item={selectedItem}
                targetText={itemTarget(selectedItem)}
                className="pronunciation-guide--inline"
              />
              <p className="class-meaning">
                {itemNative(selectedItem) || (selectedItem._translationPending ? 'Translation is being prepared for your language.' : '')}
              </p>

              {(itemExampleTarget(selectedItem) || itemExampleNative(selectedItem)) && (
                <div className="class-example">
                  {itemExampleTarget(selectedItem) && <p><strong>Example:</strong> {itemExampleTarget(selectedItem)}</p>}
                  {itemExampleNative(selectedItem) && <p>{itemExampleNative(selectedItem)}</p>}
                </div>
              )}

              {Array.isArray(selectedItem.breakdown) && selectedItem.breakdown.length > 0 && (
                <div className="class-breakdown">
                  <h3>Breakdown</h3>
                  {selectedItem.breakdown.map((part, index) => (
                    <div key={`${part.target || part.korean}-${index}`} className="class-breakdown-row">
                      <strong>{firstText(part.target, part.korean)}</strong>
                      <span>{firstText(part.native, part.english)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/*
            Action hierarchy:
              - Primary: Teach this (when item not complete) OR Next item (when complete)
              - Outlined secondary: Practice, Explain
              - Demoted ghost link: Mark complete (small, secondary)
            This guides first-time learners to the natural Teach -> Practice -> Next flow
            instead of presenting five equal-weight buttons.
          */}
          <div className="class-actions">
            {completed.has(selectedIndex) ? (
              <button
                type="button"
                className="class-action-primary"
                onClick={() => {
                  const nextPos = positionInActivity + 1;
                  if (nextPos >= activityItemIndices.length) return;
                  // Always navigate. Auto-teach only when the tutor is idle —
                  // otherwise sendTutorTurn would silently drop the request and
                  // leave the new item with no fresh explanation.
                  goToItem(activityItemIndices[nextPos], !tutorLoading);
                }}
                disabled={
                  activityItemIndices.length === 0
                  || positionInActivity < 0
                  || positionInActivity >= activityItemIndices.length - 1
                }
              >
                Next item
              </button>
            ) : (
              <button
                type="button"
                className="class-action-primary"
                onClick={teachSelected}
                disabled={tutorLoading}
              >
                Teach this
              </button>
            )}
            <button type="button" className="class-action-secondary" onClick={practiceSelected} disabled={tutorLoading}>Practice</button>
            <button type="button" className="class-action-secondary" onClick={explainSelected} disabled={tutorLoading}>Explain</button>
            <button
              type="button"
              className="class-action-ghost"
              onClick={markComplete}
              disabled={completed.has(selectedIndex)}
            >
              {completed.has(selectedIndex) ? '✓ Marked complete' : 'Mark complete'}
            </button>
          </div>
        </section>

        <section className="class-tutor" aria-label="Lesson tutor">
          <div className="class-tutor-header">
            <div>
              <p className="class-kicker">Tutor</p>
              <h2>Guided lesson</h2>
            </div>
            <div className="class-tutor-status">
              <span>{status}</span>
              <div className="class-speech-controls" aria-label="Tutor speech controls">
                <button
                  type="button"
                  className={speechEnabled ? 'active' : ''}
                  onClick={() => {
                    if (speechEnabled) stopSpeech();
                    setSpeechEnabled((enabled) => !enabled);
                  }}
                >
                  {speechEnabled ? 'Spoken replies on' : 'Spoken replies off'}
                </button>
                <button
                  type="button"
                  className={speakNativeGloss ? 'active' : ''}
                  onClick={() => {
                    setSpeakNativeGloss((value) => {
                      const next = !value;
                      localStorage.setItem('classSpeakNativeGloss', String(next));
                      return next;
                    });
                  }}
                  title={`Read ${nativeName} aloud after each ${targetName} line. Click any line individually to hear it regardless.`}
                >
                  {speakNativeGloss ? `Speak ${nativeName}` : `${nativeName} silent`}
                </button>
                <button
                  type="button"
                  className={speechInputMode === 'target' ? 'active' : ''}
                  onClick={() => setSpeechInputMode('target')}
                  title={`Listen for ${targetName}`}
                >
                  Target mic
                </button>
                <button
                  type="button"
                  className={speechInputMode === 'native' ? 'active' : ''}
                  onClick={() => setSpeechInputMode('native')}
                  title={`Listen for ${nativeName}`}
                >
                  Native mic
                </button>
                <button
                  type="button"
                  onClick={listening ? stopListening : startListening}
                  disabled={!speechSupported || tutorLoading}
                  title={speechSupported ? 'Speak your answer' : 'Speech input is not available in this browser'}
                >
                  {listening ? 'Stop mic' : 'Speak'}
                </button>
              </div>
            </div>
          </div>

          <div className="class-tutor-thread" ref={threadRef}>
            {tutorTurns.map((message) => (
              <div key={message.id} className={`class-tutor-message ${message.role} ${message.error ? 'error' : ''}`}>
                <strong>{message.role === 'user' ? 'You' : 'Tutor'}</strong>
                {renderTutorMessageBody(message)}
                {message.coachingTip && <small>{message.coachingTip}</small>}
                {message.role === 'assistant' && !message.error && (
                  <button
                    type="button"
                    className="class-replay"
                    onClick={() => speakTutorTurn(message)}
                  >
                    Replay
                  </button>
                )}
                {message.role === 'assistant' && message.error && message.retryInstructionText && (
                  <button
                    type="button"
                    className="class-retry"
                    onClick={() => retryTutorTurn(message)}
                    disabled={tutorLoading}
                  >
                    Retry
                  </button>
                )}
              </div>
            ))}
            {tutorLoading && (
              <div className="class-tutor-message assistant">
                <strong>Tutor</strong>
                <p>Preparing a helpful explanation...</p>
              </div>
            )}
          </div>

          <div className="class-tutor-input">
            <div className="class-sync-note">
              {progressSyncState === 'synced' ? 'Progress synced.' : 'Progress saved on this device.'}
            </div>
            <textarea
              value={turn}
              onChange={(event) => setTurn(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  sendFreeTurn();
                }
              }}
              placeholder="Ask a question or type your answer..."
              rows={3}
            />
            <div className="class-input-actions">
              <button
                type="button"
                className="class-mic-button"
                onClick={listening ? stopListening : startListening}
                disabled={!speechSupported || tutorLoading}
                title={speechSupported ? 'Speak your answer' : 'Speech input is not available in this browser'}
              >
                {listening ? 'Stop' : 'Speak'}
              </button>
              <button type="button" onClick={sendFreeTurn} disabled={!turn.trim() || tutorLoading}>Send</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ClassLessonPage;
