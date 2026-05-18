import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FiVolume2 } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { aiService, certificateService, classLessonService, learningHubService, practiceContextService, userService } from '../services/api';
import speechService from '../services/speechService';
import LANGUAGES from '../config/languages';
import {
  getLanguageDisplayName,
  getNativeLangCode,
  getTargetLangCode,
} from '../config/languages';
import {
  displayPartsForMessage,
  languageLabel,
  languageRole,
  speechChunksForPart,
  spokenPartsForMessage,
} from '../utils/languageSegments';
import { looksLikeRawEnglishForNative } from '../utils/languagePairPolicy';
import PronunciationGuide from '../components/PronunciationGuide';
import VoicePickerModal from '../components/VoicePickerModal';
import { contrastingVoiceForLocale, roleVoiceForLocale, tutorVoiceForLocale } from '../utils/roleVoices';
import './ClassLessonPage.css';

const FORMATTING_FALLBACK_REPLY = 'I had trouble formatting that reply. Please try again naturally.';
const firstText = (...values) => values.find((value) => String(value || '').trim()) || '';
function classSetupText(t) {
  return t(
    'classLesson.setupReady',
    'I am ready to guide this lesson. Choose a lesson action, or type your own question.'
  );
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

function defaultActivityPlan(t) {
  return [
    {
      id: 'preview',
      section: t('classLesson.defaultActivities.preview.section', 'Preview'),
      title: t('classLesson.defaultActivities.preview.title', 'Lesson overview'),
      goals: [t('classLesson.defaultActivities.preview.goal', 'Preview the lesson and set a learning goal.')],
      task: t('classLesson.defaultActivities.preview.task', 'Tell the tutor what you want to understand first.'),
    },
    {
      id: 'learn',
      section: t('classLesson.defaultActivities.learn.section', 'Learn'),
      title: t('classLesson.defaultActivities.learn.title', 'Guided explanation'),
      goals: [t('classLesson.defaultActivities.learn.goal', 'Study the selected lesson item with the tutor.')],
      task: t('classLesson.defaultActivities.learn.task', 'Ask for a simple explanation or example.'),
    },
    {
      id: 'practice',
      section: t('classLesson.defaultActivities.practice.section', 'Practice'),
      title: t('classLesson.defaultActivities.practice.title', 'Active practice'),
      goals: [t('classLesson.defaultActivities.practice.goal', 'Use the target language in a short answer.')],
      task: t('classLesson.defaultActivities.practice.task', 'Write or say one original answer using the lesson material.'),
    },
    {
      id: 'review',
      section: t('classLesson.defaultActivities.review.section', 'Review'),
      title: t('classLesson.defaultActivities.review.title', 'Check understanding'),
      goals: [t('classLesson.defaultActivities.review.goal', 'Review mistakes and summarize what you learned.')],
      task: t('classLesson.defaultActivities.review.task', 'Summarize one thing you learned and one thing that is still unclear.'),
    },
  ];
}

const itemTarget = (item = {}) => firstText(item.targetText, item.korean);
const itemNative = (item = {}) => firstText(item.nativeText, item.english);
const normalizeStudyText = (value = '') => String(value || '').trim().toLowerCase();
const itemExampleTarget = (item = {}) => {
  const example = firstText(item.exampleTarget, item.example);
  return normalizeStudyText(example) === normalizeStudyText(itemTarget(item)) ? '' : example;
};
const itemExampleNative = (item = {}) => firstText(item.exampleNative, item.exampleEnglish);

function itemSection(item = {}) {
  if (item.type === 'word') return 'vocabulary';
  if (item.type === 'sentence') return 'grammar';
  if (item.type === 'conversation') return 'dialogue';
  return 'practice';
}

function sectionLabel(section, t) {
  const key = String(section || 'practice').toLowerCase();
  return t(`classLesson.section.${key}`, key);
}

function nativeScaffoldText(value, nativeLanguage, t, fallbackKey = 'classLesson.translationPending') {
  const text = String(value || '').trim();
  if (!text) return '';
  if (looksLikeRawEnglishForNative(text, nativeLanguage)) {
    return t(fallbackKey, 'Translation is being prepared.');
  }
  return text;
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

function normalizeTutorTurns(turns = [], nativeLanguage = 'en', t) {
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
    : [makeTutorSetupTurn(classSetupText(t), nativeLanguage)];
}

function normalizeProgressRecord(record = {}, nativeLanguage = 'en', t) {
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
      ? normalizeTutorTurns(record.tutorTurns, nativeLanguage, t)
      : [makeTutorSetupTurn(classSetupText(t), nativeLanguage)],
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

function activitySkills(activity = {}) {
  const section = String(activity?.section || '').toLowerCase();
  const skills = [];
  if (section.includes('reading')) skills.push('reading');
  if (section.includes('listening')) skills.push('listening');
  if (section.includes('speaking')) skills.push('speaking');
  if (section.includes('writing')) skills.push('writing');
  if (section.includes('pronunciation')) skills.push('listening', 'speaking');
  return Array.from(new Set(skills));
}

const CLASS_ITEM_WINDOW_SIZE = 8;

function lessonContentFromShell(shell = {}, detailedItems = []) {
  const content = Array.isArray(shell.contentIndex)
    ? shell.contentIndex.map((item) => ({
      type: item?.type || '',
      activityIds: Array.isArray(item?.activityIds) ? item.activityIds : [],
      _windowPlaceholder: true,
    }))
    : [];
  return mergeDetailedItems({ ...shell, content }, detailedItems);
}

function mergeDetailedItems(lesson = {}, detailedItems = []) {
  if (!lesson || !Array.isArray(lesson.content) || !Array.isArray(detailedItems) || detailedItems.length === 0) {
    return lesson;
  }
  const content = [...lesson.content];
  detailedItems.forEach((item) => {
    if (!Number.isInteger(item?.index)) return;
    const { index, ...detail } = item;
    content[index] = {
      ...(content[index] || {}),
      ...detail,
      _windowPlaceholder: false,
    };
  });
  return { ...lesson, content };
}

function isDetailedLessonItem(item = {}) {
  return !!item && item._windowPlaceholder !== true;
}

function lessonActionFallback(item, activity, targetLanguage = 'ko', nativeLanguage = 'en', t) {
  const target = itemTarget(item);
  const native = itemNative(item);
  const romanization = item?.romanization || item?.pronunciation || '';
  const exampleTarget = itemExampleTarget(item);
  const exampleNative = itemExampleNative(item);
  const title = activity?.title || activity?.section || t('classLesson.fallback.thisItem', 'this item');
  const task = activity?.task || t('classLesson.fallback.shortAnswer', 'Try one short answer using this lesson item.');
  const lines = [t('classLesson.fallback.practiceLead', {
    title,
    defaultValue: "Let's practice {{title}}.",
  })];
  const targetLine = [target, romanization ? `(${romanization})` : ''].filter(Boolean).join(' ');

  if (targetLine && native) lines.push(`${targetLine} - ${native}`);
  else if (targetLine || native) lines.push(targetLine || native);

  if (exampleTarget && exampleNative) {
    lines.push(`${t('classLesson.examplePrefix', 'Example:')} ${exampleTarget} - ${exampleNative}`);
  } else if (exampleTarget || exampleNative) {
    lines.push(`${t('classLesson.examplePrefix', 'Example:')} ${exampleTarget || exampleNative}`);
  }

  lines.push(task);

  return lines.join('\n').trim() || t('classLesson.fallback.continue', 'Let us continue with the next part of the lesson.');
}

function activityPlanForLesson(lesson, t) {
  if (Array.isArray(lesson?.activities) && lesson.activities.length > 0) {
    return lesson.activities;
  }
  return defaultActivityPlan(t);
}

// Group an activity's item indices into consecutive runs of the same item type.
// Preserves the original sequence (no reshuffling) and inserts a subheading
// label before each group when the activity mixes types. When all items share
// one type (typical for Vocabulary, Grammar, Pronunciation, Culture Note), the
// caller can render a single ungrouped strip — see classMixedActivity below.
function groupActivityItemsBySection(items, indices) {
  const labelFor = (type) => {
    if (type === 'word') return 'vocabulary';
    if (type === 'sentence') return 'grammar';
    if (type === 'conversation') return 'dialogue';
    return 'practice';
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

function exampleCueFor(_language, group, t) {
  const speakers = new Set((group.parts || []).map((part) => part.speaker).filter(Boolean));
  const isDialogue = speakers.size >= 2;
  const topic = exampleTopicFromGroup(group);
  if (isDialogue) {
    return topic
      ? t('classLesson.exampleCue.dialogueWithTopic', {
        topic,
        defaultValue: 'Example conversation about {{topic}}. Listen to Person A and Person B.',
      })
      : t('classLesson.exampleCue.dialogue', 'Example conversation. Listen to Person A and Person B.');
  }
  return topic
    ? t('classLesson.exampleCue.exampleWithTopic', { topic, defaultValue: 'Example: {{topic}}.' })
    : t('classLesson.exampleCue.example', 'Example.');
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
  const { t } = useTranslation();
  const threadRef = useRef(null);
  const recognitionRef = useRef(null);
  const tutorRequestInFlightRef = useRef(false);
  const pendingWindowCentersRef = useRef(new Set());
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
  const [status, setStatus] = useState(() => t('classLesson.status.ready', 'Ready'));
  const [audioUnlocked, setAudioUnlocked] = useState(() => speechService.isAudioUnlocked());
  const [showVoicePicker, setShowVoicePicker] = useState(false);
  const [agendaOpen, setAgendaOpen] = useState(false);
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
  const [certificateStatus, setCertificateStatus] = useState(null);
  const [certificateLoading, setCertificateLoading] = useState(false);
  const [certificateIssuing, setCertificateIssuing] = useState(false);
  const [itemWindowLoading, setItemWindowLoading] = useState(false);
  const lessonIdLoaded = lesson?._id || '';

  const targetLanguage = getTargetLangCode();
  const nativeLanguage = getNativeLangCode();
  const targetName = getLanguageDisplayName(targetLanguage, t);
  const nativeName = getLanguageDisplayName(nativeLanguage, t);
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
        const applyProgress = (record) => {
          const progress = normalizeProgressRecord(record, nativeLanguage, t);
          setSelectedIndex(progress.selectedIndex);
          setSelectedActivityIndex(progress.selectedActivityIndex);
          setCompleted(progress.completed);
          setSummary(progress.summary);
          setMemory(progress.memory);
          setTutorTurns(progress.tutorTurns);
          return progress;
        };

        let localProgress = normalizeProgressRecord({}, nativeLanguage, t);
        try {
          const stored = JSON.parse(localStorage.getItem(classStorageKey(classLessonId)) || '{}');
          localProgress = applyProgress(stored);
        } catch {
          setTutorTurns([makeTutorSetupTurn(classSetupText(t), nativeLanguage)]);
        }

        const response = await classLessonService.getClassLessonBootstrap(classLessonId, {
          center: localProgress.selectedIndex,
          windowSize: CLASS_ITEM_WINDOW_SIZE,
        });
        if (cancelled) return;
        const payload = response.data || {};
        setLesson(lessonContentFromShell(payload.lesson, payload.items));
        if (payload.canSync && payload.progress) {
          applyProgress(payload.progress);
          setProgressSyncState('synced');
        } else {
          setProgressSyncState(payload.canSync ? 'synced' : 'local');
        }
      } catch (err) {
        if (!cancelled) setError(t('classLesson.loadError', 'Could not load this class lesson.'));
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
  }, [classLessonId, nativeLanguage, t]);

  useEffect(() => {
    if (!lessonIdLoaded || !progressLoaded) return undefined;
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
  }, [classLessonId, completed, lessonIdLoaded, memory, progressLoaded, selectedActivityIndex, selectedIndex, summary, tutorTurns]);

  useEffect(() => {
    setTutorTurns((prev) => (
      prev.some(isFormattingFallbackTurn)
        ? normalizeTutorTurns(prev, nativeLanguage, t)
        : prev
    ));
  }, [nativeLanguage, t]);

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
    setStatus(t('classLesson.status.personalizedPromptReady', 'Personalized class prompt ready.'));
  }, [canUsePracticeContextFeature, t]);

  useEffect(() => (
    () => {
      recognitionRef.current?.abort?.();
      recognitionRef.current = null;
      speechService.cancel();
    }
  ), []);

  const items = useMemo(() => lesson?.content || [], [lesson]);
  const selectedItem = useMemo(() => items[selectedIndex] || {}, [items, selectedIndex]);
  const selectedItemReady = isDetailedLessonItem(selectedItem);
  const activityPlan = useMemo(() => activityPlanForLesson(lesson, t), [lesson, t]);
  const selectedActivity = activityPlan[selectedActivityIndex] || activityPlan[0];
  const displayActivityPlan = useMemo(() => activityPlan.map((activity) => ({
    ...activity,
    section: nativeScaffoldText(activity?.section, nativeLanguage, t, 'classLesson.section.practice'),
    title: nativeScaffoldText(activity?.title, nativeLanguage, t, 'classLesson.lessonFallback'),
    task: nativeScaffoldText(activity?.task, nativeLanguage, t),
    goals: Array.isArray(activity?.goals)
      ? activity.goals.map((goal) => nativeScaffoldText(goal, nativeLanguage, t)).filter(Boolean)
      : [],
  })), [activityPlan, nativeLanguage, t]);
  const displaySelectedActivity = displayActivityPlan[selectedActivityIndex] || displayActivityPlan[0] || selectedActivity;
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
  const isAuthenticated = !!localStorage.getItem('token') && localStorage.getItem('guestMode') !== 'true';
  const userId = localStorage.getItem('userId');
  const certificate = certificateStatus?.certificate || null;
  const certificateVerifyPath = certificate?.certificateId
    ? `/certificates/verify/${encodeURIComponent(certificate.certificateId)}`
    : '';

  const loadLessonWindow = useCallback(async (center, { foreground = false } = {}) => {
    if (!classLessonId || !lessonIdLoaded) return;
    const safeCenter = Math.max(0, Math.min(Number(center) || 0, Math.max(items.length - 1, 0)));
    if (pendingWindowCentersRef.current.has(safeCenter)) return;
    pendingWindowCentersRef.current.add(safeCenter);
    if (foreground) setItemWindowLoading(true);
    try {
      const response = await classLessonService.getClassLessonItems(classLessonId, {
        center: safeCenter,
        windowSize: CLASS_ITEM_WINDOW_SIZE,
      });
      setLesson((current) => mergeDetailedItems(current, response.data?.items || []));
    } catch {
      // Keep the current material visible. A later navigation or retry can request the same window again.
    } finally {
      pendingWindowCentersRef.current.delete(safeCenter);
      if (foreground) setItemWindowLoading(false);
    }
  }, [classLessonId, items.length, lessonIdLoaded]);

  useEffect(() => {
    if (!lessonIdLoaded || items.length === 0) return;
    if (!isDetailedLessonItem(items[selectedIndex])) {
      loadLessonWindow(selectedIndex, { foreground: true });
      return;
    }

    const nextCenter = Math.min(items.length - 1, selectedIndex + Math.floor(CLASS_ITEM_WINDOW_SIZE / 2));
    if (nextCenter > selectedIndex && !isDetailedLessonItem(items[nextCenter])) {
      loadLessonWindow(nextCenter);
    }
  }, [items, lessonIdLoaded, loadLessonWindow, selectedIndex]);

  useEffect(() => {
    if (!selectedItemReady) return;
    const targetText = itemTarget(selectedItem);
    if (targetText) {
      speechService.prefetch(targetText, ttsLocaleFor(targetLanguage, targetLanguage)).catch(() => {});
    }
    const nextItem = items[selectedIndex + 1];
    const nextText = isDetailedLessonItem(nextItem) ? itemTarget(nextItem) : '';
    if (nextText) {
      speechService.prefetch(nextText, ttsLocaleFor(targetLanguage, targetLanguage)).catch(() => {});
    }
  }, [items, selectedIndex, selectedItem, selectedItemReady, targetLanguage]);

  useEffect(() => {
    let cancelled = false;
    if (!lesson || progressPercent < 100 || !isAuthenticated) {
      setCertificateStatus(null);
      return () => {
        cancelled = true;
      };
    }

    setCertificateLoading(true);
    certificateService.getClassLessonStatus(classLessonId)
      .then((res) => {
        if (!cancelled) setCertificateStatus(res.data || null);
      })
      .catch(() => {
        if (!cancelled) setCertificateStatus(null);
      })
      .finally(() => {
        if (!cancelled) setCertificateLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [classLessonId, isAuthenticated, lesson, progressPercent]);

  const issueCertificate = async () => {
    if (!lesson || progressPercent < 100) return;
    const payload = buildProgressRecord({
      selectedIndex,
      selectedActivityIndex,
      completed,
      summary,
      memory,
      tutorTurns,
    });

    try {
      setCertificateIssuing(true);
      await classLessonService.saveProgress(classLessonId, payload).catch(() => {});
      const res = await certificateService.issueClassLessonCertificate(classLessonId, {
        completedItems: Array.from(completed),
      });
      if (res.status === 402) {
        setCertificateStatus(res.data || null);
        setStatus(t('certificates.paymentRequiredShort'));
        return;
      }
      setCertificateStatus((current) => ({
        ...(current || {}),
        certificate: res.data?.certificate,
        canIssue: false,
        access: res.data?.access || current?.access,
      }));
      setStatus(t('certificates.issuedSuccess'));
    } catch (err) {
      if (err.response?.status === 402) {
        setCertificateStatus(err.response.data || null);
        setStatus(t('certificates.paymentRequiredShort'));
        return;
      }
      setStatus(err.response?.data?.message || t('certificates.issueFailed'));
    } finally {
      setCertificateIssuing(false);
    }
  };

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
          ? [{ language: nativeLanguage, text: exampleCueFor(nativeLanguage, group, t), speaker: '' }]
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
      setStatus(t('classLesson.status.audioInterrupted', 'Audio playback was interrupted.'));
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
      setStatus(t('classLesson.status.playingSelectedLine', 'Playing selected line.'));
    } catch (_) {
      setStatus(t('classLesson.status.audioInterrupted', 'Audio playback was interrupted.'));
    }
  };

  const stopSpeech = () => {
    speechService.cancel();
    setStatus(t('classLesson.status.speechStopped', 'Speech stopped.'));
  };

  const selectedPracticeParams = () => new URLSearchParams({
    savedText: itemTarget(selectedItem),
    nativeText: looksLikeRawEnglishForNative(itemNative(selectedItem), nativeLanguage) ? '' : itemNative(selectedItem),
  });

  const openSelectedPracticeSurface = (surface) => {
    if (!selectedItemReady) return;
    if (surface === 'conversation') {
      const prompt = t('learningHub.askTutorPrompt', {
        text: itemTarget(selectedItem),
        defaultValue: 'Help me practice "{{text}}".',
      });
      navigate(`/conversation?prompt=${encodeURIComponent(prompt)}`);
      return;
    }
    if (surface === 'writing') {
      navigate(`/writing?${selectedPracticeParams().toString()}`);
      return;
    }
    if (surface === 'flashcard') {
      navigate(`/flashcards?${selectedPracticeParams().toString()}`);
    }
  };

  const selfTestSelectedItem = async () => {
    if (!userId || !selectedItemReady) {
      setStatus(t('classLesson.status.signInToSave', 'Sign in to save study items across devices.'));
      return;
    }
    try {
      const response = await learningHubService.saveItem({
        itemType: selectedItem.type === 'word' ? 'word' : 'phrase',
        targetText: itemTarget(selectedItem),
        nativeText: looksLikeRawEnglishForNative(itemNative(selectedItem), nativeLanguage) ? '' : itemNative(selectedItem),
        romanization: selectedItem.officialPronunciation || selectedItem.romanization || selectedItem.pronunciation || '',
        sourceType: 'class',
        sourceRef: classLessonId,
        sourceLabel: lesson?.title || '',
        reason: t('classLesson.selfTestReason', 'Saved from class for a quick self-test.'),
        metadata: {
          route: `/class/${classLessonId}`,
          itemIndex: selectedIndex,
          activityId: selectedActivity?.id || '',
        },
      });
      navigate('/review', { state: { quickQuizItem: response.data } });
    } catch (_) {
      setStatus(t('classLesson.status.saveFailed', 'Could not save this item right now.'));
    }
  };

  const listenToSelectedItem = async () => {
    if (!selectedItemReady || !itemTarget(selectedItem)) return;
    try {
      await speechService.cancel();
      const lang = ttsLocaleFor(targetLanguage, targetLanguage);
      await speechService.speakAsync(itemTarget(selectedItem), {
        lang,
        voice: resolveVoice(lang, ''),
        rate: '-10%',
      });
      setStatus(t('classLesson.status.playingSelectedItem', 'Playing selected item.'));
    } catch (_) {
      setStatus(t('classLesson.status.audioInterrupted', 'Audio playback was interrupted.'));
    }
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
    setStatus(t('classLesson.status.preparingNextStep', 'Tutor is preparing your next step...'));

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
        ? lessonActionFallback(selectedItem, selectedActivity, targetLanguage, nativeLanguage, t)
        : rawReply || t('classLesson.fallback.continue', 'Let us continue with the next part of the lesson.');
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

      setStatus(t('classLesson.status.tutorReplied', 'Tutor replied.'));
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
      setStatus(t('classLesson.status.tutorTrouble', 'Tutor had trouble replying.'));
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
    if (!selectedItemReady) return;
    sendTutorTurn(
      `Teach ${selectedActivity?.section || 'activity'}: item ${selectedIndex + 1}`,
      buildClassAction('teach_selected_item', lesson, selectedItem, selectedIndex, selectedActivity),
    );
  };

  const practiceSelected = () => {
    if (!selectedItemReady) return;
    sendTutorTurn(
      `Practice ${selectedActivity?.section || 'activity'}: item ${selectedIndex + 1}`,
      buildClassAction('practice_selected_item', lesson, selectedItem, selectedIndex, selectedActivity),
    );
  };

  const explainSelected = () => {
    if (!selectedItemReady) return;
    sendTutorTurn(
      `Explain ${selectedActivity?.section || 'activity'}: item ${selectedIndex + 1}`,
      buildClassAction('explain_selected_item', lesson, selectedItem, selectedIndex, selectedActivity),
    );
  };

  // Drill a specific Expression Practice goal (workbook 표현 연습 column).
  // Sends a class action with expressionPracticeId set; the AI tutor uses it
  // as a Speaking sub-mode focused on that one functional goal.
  const practiceExpression = (expressionPractice) => {
    if (!expressionPractice || !selectedItemReady) return;
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
    const nextCompleted = new Set([...completed, selectedIndex]);
    setCompleted(nextCompleted);
    if (userId) {
      userService.recordLearningEvent(userId, {
        eventType: 'class_item_complete',
        classLessonId,
        itemIndex: selectedIndex,
        activitySection: selectedActivity?.section || '',
        activityTitle: selectedActivity?.title || '',
        targetText: itemTarget(selectedItem),
        nativeText: itemNative(selectedItem),
        skills: activitySkills(selectedActivity),
      }).catch(() => {});

      if (
        selectedActivity?.id
        && activityItemIndices.length > 0
        && activityItemIndices.every((index) => nextCompleted.has(index))
      ) {
        userService.recordLearningEvent(userId, {
          eventType: 'class_activity_complete',
          classLessonId,
          activityId: selectedActivity.id,
          activitySection: selectedActivity?.section || '',
          activityTitle: selectedActivity?.title || '',
          skills: activitySkills(selectedActivity),
        }).catch(() => {});
      }

      if (items.length > 0 && nextCompleted.size >= items.length) {
        userService.recordLearningEvent(userId, {
          eventType: 'class_lesson_complete',
          classLessonId,
        }).catch(() => {});
      }
    }
    const nextPos = positionInActivity + 1;
    if (positionInActivity >= 0 && nextPos < activityItemIndices.length) {
      setSelectedIndex(activityItemIndices[nextPos]);
      setStatus(t('classLesson.status.markedCompleteNext', 'Marked complete. Moving to the next item.'));
    } else {
      setStatus(t('classLesson.status.markedComplete', 'Marked complete.'));
    }
  };

  const saveSelectedForReview = async () => {
    if (!userId || !selectedItemReady) {
      setStatus(t('classLesson.status.signInToSave', 'Sign in to save study items across devices.'));
      return;
    }
    try {
      await learningHubService.saveItem({
        itemType: selectedItem.type === 'word' ? 'word' : 'phrase',
        targetText: itemTarget(selectedItem),
        nativeText: itemNative(selectedItem),
        romanization: selectedItem.officialPronunciation || selectedItem.romanization || selectedItem.pronunciation || '',
        sourceType: 'class',
        sourceRef: classLessonId,
        sourceLabel: lesson?.title || '',
        reason: t('classLesson.savedReason', 'Saved from class for later practice.'),
        metadata: {
          route: `/class/${classLessonId}`,
          itemIndex: selectedIndex,
          activityId: selectedActivity?.id || '',
        },
      });
      setStatus(t('classLesson.status.savedForReview', 'Saved for review.'));
    } catch (_) {
      setStatus(t('classLesson.status.saveFailed', 'Could not save this item right now.'));
    }
  };

  const saveSelectedExampleForReview = async () => {
    if (!userId || !selectedItemReady || !itemExampleTarget(selectedItem)) {
      setStatus(t('classLesson.status.signInToSave', 'Sign in to save study items across devices.'));
      return;
    }
    try {
      await learningHubService.saveItem({
        itemType: 'sentence',
        targetText: itemExampleTarget(selectedItem),
        nativeText: looksLikeRawEnglishForNative(itemExampleNative(selectedItem), nativeLanguage) ? '' : itemExampleNative(selectedItem),
        romanization: selectedItem.officialPronunciation || selectedItem.romanization || selectedItem.pronunciation || '',
        sourceType: 'class',
        sourceRef: classLessonId,
        sourceLabel: lesson?.title || '',
        reason: t('classLesson.savedExampleReason', 'Saved class example for later practice.'),
        metadata: {
          route: `/class/${classLessonId}`,
          itemIndex: selectedIndex,
          activityId: selectedActivity?.id || '',
          kind: 'example',
        },
      });
      setStatus(t('classLesson.status.exampleSaved', 'Example saved for review.'));
    } catch (_) {
      setStatus(t('classLesson.status.saveFailed', 'Could not save this item right now.'));
    }
  };

  const studyTextsForTutorTurn = (message) => {
    const parts = displayPartsForMessage(message, targetLanguage, nativeLanguage);
    const targetText = parts
      .filter((part) => languageRole(part, targetLanguage, nativeLanguage) === 'target' && !['meta', 'romanization'].includes(part.type))
      .map((part) => String(part.text || '').trim())
      .filter(Boolean)
      .join('\n');
    const nativeText = parts
      .filter((part) => languageRole(part, targetLanguage, nativeLanguage) === 'native' && !['meta', 'romanization'].includes(part.type))
      .map((part) => String(part.text || '').trim())
      .filter(Boolean)
      .join('\n');
    return {
      targetText: targetText || (message.language === targetLanguage ? String(message.content || '').trim() : ''),
      nativeText,
    };
  };

  const saveTutorTurnForReview = async (message) => {
    const studyText = studyTextsForTutorTurn(message);
    if (!userId || !studyText.targetText) {
      setStatus(t('classLesson.status.signInToSave', 'Sign in to save study items across devices.'));
      return;
    }
    try {
      await learningHubService.saveItem({
        itemType: 'phrase',
        targetText: studyText.targetText,
        nativeText: looksLikeRawEnglishForNative(studyText.nativeText, nativeLanguage) ? '' : studyText.nativeText,
        sourceType: 'class',
        sourceRef: classLessonId,
        sourceLabel: lesson?.title || '',
        reason: t('classLesson.savedTutorReplyReason', 'Saved from a tutor reply for later practice.'),
        metadata: {
          route: `/class/${classLessonId}`,
          itemIndex: selectedIndex,
          activityId: selectedActivity?.id || '',
          kind: 'tutorReply',
        },
      });
      setStatus(t('classLesson.status.tutorReplySaved', 'Tutor reply saved for review.'));
    } catch (_) {
      setStatus(t('classLesson.status.saveFailed', 'Could not save this item right now.'));
    }
  };

  const bookmarkSelectedItem = async () => {
    if (!userId || !selectedItemReady) {
      setStatus(t('classLesson.status.signInToSave', 'Sign in to save study items across devices.'));
      return;
    }
    try {
      await learningHubService.saveItem({
        itemType: 'bookmark',
        targetText: itemTarget(selectedItem),
        nativeText: itemNative(selectedItem),
        romanization: selectedItem.officialPronunciation || selectedItem.romanization || selectedItem.pronunciation || '',
        sourceType: 'class',
        sourceRef: classLessonId,
        sourceLabel: lesson?.title || '',
        reason: t('classLesson.bookmarkedReason', 'Bookmarked from class.'),
        metadata: {
          route: `/class/${classLessonId}`,
          itemIndex: selectedIndex,
          activityId: selectedActivity?.id || '',
        },
      });
      setStatus(t('classLesson.status.bookmarked', 'Bookmarked.'));
    } catch (_) {
      setStatus(t('classLesson.status.bookmarkFailed', 'Could not bookmark this item right now.'));
    }
  };

  const goToItem = (index, teach = false) => {
    const nextIndex = Math.max(0, Math.min(index, items.length - 1));
    setSelectedIndex(nextIndex);
    if (teach) {
      const nextItem = items[nextIndex];
      if (!isDetailedLessonItem(nextItem)) return;
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
        return t('classLesson.speechErrors.permissionBlocked', 'Microphone permission is blocked. Open your browser site settings, allow the microphone, then reload this page.');
      case 'no-speech':
        return t('classLesson.speechErrors.noSpeech', 'No speech was heard. Try again - speak after the listening indicator appears.');
      case 'audio-capture':
        return t('classLesson.speechErrors.noMicrophone', 'No microphone detected. Plug in or enable a microphone, then try again.');
      case 'network':
        return t('classLesson.speechErrors.network', 'Network error during speech recognition. Check your connection and try again.');
      case 'aborted':
        return t('classLesson.speechErrors.cancelled', 'Speech input was cancelled.');
      default:
        return t('classLesson.speechErrors.captureFailed', 'Could not capture speech. Please try again.');
    }
  };

  const startListening = () => {
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setStatus(t('classLesson.status.voiceUnavailable', 'Voice input is unavailable in this browser. You can type in the box below instead - Chrome or Edge on a laptop supports speaking.'));
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
      setStatus(t('classLesson.status.listeningPrompt', 'Listening... tap the mic again when you finish.'));
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
        setStatus(t('classLesson.status.speechCaptured', 'Speech captured. Edit if needed, then press send.'));
      } else {
        setStatus(t('classLesson.status.noSpeechCaptured', 'No speech captured. Try again.'));
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
                        aria-label={t('classLesson.playLanguageLine', {
                          label: `${part.speaker ? `${part.speaker} ` : ''}${languageLabel(part)}`,
                          defaultValue: 'Play {{label}} line',
                        })}
                        title={t('classLesson.playLine', 'Play this line')}
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
    return <div className="class-lesson-loading">{t('classLesson.loading', 'Loading class lesson...')}</div>;
  }

  if (error || !lesson) {
    return (
      <div className="class-lesson-loading">
        <strong>{error || t('classLesson.notFound', 'Lesson not found.')}</strong>
        <button type="button" onClick={() => navigate('/class')}>{t('classLesson.backToClass', 'Back to Class')}</button>
      </div>
    );
  }

  return (
    <div className={`class-lesson-page ${progressPercent >= 100 ? 'has-certificate-banner' : ''}`}>
      <VoicePickerModal
        open={showVoicePicker}
        targetLangCode={targetLanguage}
        targetLangName={targetName}
        ttsLocale={ttsLocaleFor(targetLanguage, targetLanguage)}
        onClose={() => setShowVoicePicker(false)}
        onPicked={() => {
          localStorage.setItem('classVoicePickerSeen', '1');
          setShowVoicePicker(false);
          setStatus(t('classLesson.status.voiceUpdated', 'Voice updated. Click any line to hear it.'));
        }}
      />
      {!audioUnlocked && speechEnabled && (
        <button
          type="button"
          className="class-audio-unlock"
          onClick={() => setAudioUnlocked(speechService.isAudioUnlocked() || true)}
        >
          {t('classLesson.tapToEnableAudio', 'Tap anywhere to enable spoken tutor replies on this device.')}
        </button>
      )}
      <header className="class-lesson-header">
        <button type="button" className="class-back" onClick={() => navigate('/class')}>{t('classLesson.backToClass', 'Back to Class')}</button>
        <div>
          <p className="class-kicker">{t('classLesson.kicker', 'Class')}</p>
          <h1>{lesson.title}</h1>
          <p>{nativeName} -> {targetName}</p>
        </div>
        <div className="class-header-tools">
          <button
            type="button"
            className="class-outline-toggle"
            onClick={() => setAgendaOpen((open) => !open)}
            aria-expanded={agendaOpen}
          >
            {agendaOpen
              ? t('classLesson.hideOutline', 'Hide outline')
              : t('classLesson.showOutline', 'Show outline')}
          </button>
          <div className="class-progress">
            <strong>{progressPercent}%</strong>
            <span>{t('classLesson.complete', 'complete')}</span>
          </div>
        </div>
      </header>

      {progressPercent >= 100 && (
        <section className="class-certificate-banner" aria-label={t('certificates.classBannerLabel')}>
          <div>
            <p className="class-kicker">{t('certificates.kicker')}</p>
            <h2>{certificate ? t('certificates.issuedTitle') : t('certificates.readyTitle')}</h2>
            <p>
              {certificate
                ? t('certificates.issuedBody')
                : isAuthenticated
                  ? certificateStatus?.access?.requiresPayment
                    ? t('certificates.paymentRequiredBody')
                    : t('certificates.readyBody')
                  : t('certificates.signInBody')}
            </p>
          </div>
          <div className="class-certificate-actions">
            {certificate ? (
              <button type="button" className="class-action-primary" onClick={() => navigate(certificateVerifyPath)}>
                {t('certificates.viewCertificate')}
              </button>
            ) : isAuthenticated && certificateStatus?.access?.requiresPayment ? (
              <button type="button" className="class-action-primary" onClick={() => navigate('/pricing')}>
                {t('certificates.viewPlans')}
              </button>
            ) : isAuthenticated ? (
              <button
                type="button"
                className="class-action-primary"
                onClick={issueCertificate}
                disabled={certificateLoading || certificateIssuing}
              >
                {certificateIssuing ? t('common.saving') : t('certificates.issueCertificate')}
              </button>
            ) : (
              <button type="button" className="class-action-primary" onClick={() => navigate('/login')}>
                {t('certificates.signIn')}
              </button>
            )}
          </div>
        </section>
      )}

      {progressPercent >= 100 && (
        <section className="class-wrap-up" aria-label={t('classLesson.wrapUpAria', 'Lesson wrap-up')}>
          <div>
            <p className="class-kicker">{t('classLesson.wrapUpKicker', 'Next step')}</p>
            <h2>{t('classLesson.wrapUpTitle', 'Keep the lesson alive')}</h2>
            <p>{t('classLesson.wrapUpBody', 'Review saved items, use them in conversation, or write them from memory while the lesson is still fresh.')}</p>
            <div className="class-wrap-up-stats">
              <span>{t('classLesson.itemsCompleted', { count: completed.size, defaultValue: '{{count}} items completed' })}</span>
              <span>{t('classLesson.lessonItemsTotal', { count: items.length, defaultValue: '{{count}} lesson items' })}</span>
            </div>
          </div>
          <div className="class-wrap-up-actions">
            <button type="button" onClick={() => navigate('/review')}>{t('classLesson.wrapUpReview', 'Review')}</button>
            <button type="button" onClick={() => navigate('/conversation')}>{t('classLesson.wrapUpConversation', 'Conversation')}</button>
            <button type="button" onClick={() => navigate('/writing')}>{t('classLesson.wrapUpWriting', 'Writing')}</button>
          </div>
        </section>
      )}

      <main className={`class-lesson-shell ${agendaOpen ? 'agenda-open' : 'agenda-closed'}`}>
        <aside className={`class-agenda ${agendaOpen ? 'open' : 'collapsed'}`} aria-label={t('classLesson.agendaAriaLabel', 'Lesson agenda')}>
          <div className="class-agenda-summary">
            <span>{t('classLesson.textbookActivities', { count: activityPlan.length, defaultValue: '{{count}} textbook activities' })}</span>
            <span>{t('classLesson.unitSequence', 'Unit sequence')}</span>
            {Object.entries(sectionCounts).map(([section, count]) => (
              <span key={section}>{sectionLabel(section, t)}: {count}</span>
            ))}
          </div>
          <div className="class-agenda-list">
            {displayActivityPlan.map((activity, index) => (
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

        <section className="class-focus" aria-label={t('classLesson.selectedItemAriaLabel', 'Selected lesson item')}>
          <div className="class-focus-card">
            <div className="class-focus-topline">
              <span>{displaySelectedActivity?.section}</span>
              <span>{t('classLesson.activityXOfY', { current: selectedActivityIndex + 1, total: activityPlan.length, defaultValue: 'Activity {{current}} of {{total}}' })}</span>
            </div>
            <h2>{displaySelectedActivity?.title}</h2>
            <div className="class-activity-goals">
              {(displaySelectedActivity?.goals || []).map((goal) => <p key={goal}>{goal}</p>)}
            </div>
            {displaySelectedActivity?.task && (
              <div className="class-activity-task">
                <span>{t('classLesson.learnerTask', 'Learner task')}</span>
                <p>{displaySelectedActivity.task}</p>
              </div>
            )}

            {contextClassPrompts.length > 0 && (
              <div className="class-context-prompts">
                <span>{t('classLesson.personalizedForYou', 'Personalized for you')}</span>
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
                <span className="class-expression-label">{t('classLesson.expressionPractice', 'Expression practice')}</span>
                <div className="class-expression-chips">
                  {lesson.expressionPractice.map((expression) => (
                    <button
                      type="button"
                      key={expression.id}
                      className="class-expression-chip"
                      onClick={() => practiceExpression(expression)}
                      disabled={tutorLoading}
                      title={nativeScaffoldText(expression.goal || expression.label, nativeLanguage, t)}
                    >
                      {nativeScaffoldText(expression.label, nativeLanguage, t) || expression.id}
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
              <div className="class-item-strip" aria-label={t('classLesson.lessonMaterialAriaLabel', 'Lesson material')}>
                <p className="class-item-strip-empty">
                  {t('classLesson.noItemsTagged', 'Nothing in this section yet. Try another activity to keep going.')}
                </p>
              </div>
            ) : (() => {
              const groups = groupActivityItemsBySection(items, activityItemIndices);
              const showHeadings = groups.length > 1;
              return (
                <div className="class-item-groups" aria-label={t('classLesson.lessonMaterialAriaLabel', 'Lesson material')}>
                  {groups.map((group, groupIndex) => (
                    <div key={`${group.label}-${groupIndex}`} className="class-item-group">
                      {showHeadings && (
                        <span className="class-item-group-label">
                          {sectionLabel(group.label, t)} ({group.indices.length})
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
                              title={t('classLesson.itemXOfYInActivity', {
                                current: positionInActivity + 1,
                                total: activityItemIndices.length,
                                section: selectedActivity?.section || t('classLesson.section.practice', 'Practice'),
                                defaultValue: 'Item {{current}} of {{total}} in {{section}}',
                              })}
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
                <span>{sectionLabel(itemSection(selectedItem), t)}</span>
                <span>
                  {activityItemIndices.length > 0 && positionInActivity >= 0
                    ? t('classLesson.itemXOfYInActivity', {
                      current: positionInActivity + 1,
                      total: activityItemIndices.length,
                      section: selectedActivity?.section || t('classLesson.section.practice', 'Practice'),
                      defaultValue: 'Item {{current}} of {{total}} in {{section}}',
                    })
                    : t('classLesson.itemXOfY', {
                      current: selectedIndex + 1,
                      total: items.length,
                      defaultValue: 'Item {{current}} of {{total}}',
                    })}
                  </span>
                </div>
              {selectedItemReady ? (
                <>
                  <h3>{itemTarget(selectedItem)}</h3>
                  <PronunciationGuide
                    item={selectedItem}
                    targetText={itemTarget(selectedItem)}
                    className="pronunciation-guide--inline"
                  />
                  <p className="class-meaning">
                    {looksLikeRawEnglishForNative(itemNative(selectedItem), nativeLanguage)
                      ? t('classLesson.translationPending', 'Translation is being prepared for your language.')
                      : (itemNative(selectedItem) || (selectedItem._translationPending ? t('classLesson.translationPending', 'Translation is being prepared for your language.') : ''))}
                  </p>

                  {(itemExampleTarget(selectedItem) || itemExampleNative(selectedItem)) && (
                    <div className="class-example">
                      {itemExampleTarget(selectedItem) && <p><strong>{t('classLesson.examplePrefix', 'Example:')}</strong> {itemExampleTarget(selectedItem)}</p>}
                      {itemExampleNative(selectedItem) && !looksLikeRawEnglishForNative(itemExampleNative(selectedItem), nativeLanguage) && <p>{itemExampleNative(selectedItem)}</p>}
                      {itemExampleTarget(selectedItem) && (
                        <button type="button" onClick={saveSelectedExampleForReview}>
                          {t('classLesson.saveExample', 'Save example')}
                        </button>
                      )}
                    </div>
                  )}

                  {Array.isArray(selectedItem.breakdown) && selectedItem.breakdown.length > 0 && (
                    <div className="class-breakdown">
                      <h3>{t('classLesson.breakdown', 'Breakdown')}</h3>
                      {selectedItem.breakdown.map((part, index) => (
                        <div key={`${part.target || part.korean}-${index}`} className="class-breakdown-row">
                          <strong>{firstText(part.target, part.korean)}</strong>
                          <span>
                            {looksLikeRawEnglishForNative(firstText(part.native, part.english), nativeLanguage)
                              ? t('classLesson.translationPending', 'Translation is being prepared for your language.')
                              : firstText(part.native, part.english)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="class-meaning">{t('classLesson.loading', 'Loading class lesson...')}</p>
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
                {t('classLesson.nextItem', 'Next item')}
              </button>
            ) : (
              <button
                type="button"
                className="class-action-primary"
                onClick={teachSelected}
                disabled={tutorLoading || !selectedItemReady}
              >
                {t('classLesson.teachThis', 'Teach this')}
              </button>
            )}
            <button type="button" className="class-action-secondary" onClick={practiceSelected} disabled={tutorLoading || !selectedItemReady}>{t('classLesson.practice', 'Practice')}</button>
            <button type="button" className="class-action-secondary" onClick={explainSelected} disabled={tutorLoading || !selectedItemReady}>{t('classLesson.explain', 'Explain')}</button>
            <button type="button" className="class-action-secondary" onClick={saveSelectedForReview} disabled={!selectedItemReady}>{t('classLesson.saveForReview', 'Save for review')}</button>
            <button type="button" className="class-action-secondary" onClick={bookmarkSelectedItem} disabled={!selectedItemReady}>{t('learningHub.bookmark', 'Bookmark')}</button>
            <button
              type="button"
              className="class-action-ghost"
              onClick={markComplete}
              disabled={completed.has(selectedIndex) || !selectedItemReady || itemWindowLoading}
            >
              {completed.has(selectedIndex) ? t('classLesson.markedComplete', '✓ Marked complete') : t('classLesson.markComplete', 'Mark complete')}
            </button>
          </div>
          <div className="class-practice-links" aria-label={t('classLesson.practiceEverywhereAria', 'Practice this item elsewhere')}>
            <span>{t('classLesson.practiceEverywhere', 'Practice this everywhere')}</span>
            <button type="button" onClick={listenToSelectedItem} disabled={!selectedItemReady}>{t('learningHub.listen', 'Listen')}</button>
            <button type="button" onClick={() => openSelectedPracticeSurface('conversation')} disabled={!selectedItemReady}>{t('conversation.practiceLabel', 'Conversation practice')}</button>
            <button type="button" onClick={() => openSelectedPracticeSurface('writing')} disabled={!selectedItemReady}>{t('learningHub.practiceWriting', 'Write')}</button>
            <button type="button" onClick={() => openSelectedPracticeSurface('flashcard')} disabled={!selectedItemReady}>{t('learningHub.practiceFlashcard', 'Flashcard')}</button>
            <button type="button" onClick={selfTestSelectedItem} disabled={!selectedItemReady}>{t('learningHub.practiceQuiz', 'Self-test')}</button>
          </div>
        </section>

        <section className="class-tutor" aria-label={t('classLesson.tutorAriaLabel', 'Lesson tutor')}>
          <div className="class-tutor-header">
            <div>
              <p className="class-kicker">{t('classLesson.tutorKicker', 'Tutor')}</p>
              <h2>{t('classLesson.guidedLesson', 'Guided lesson')}</h2>
            </div>
            <div className="class-tutor-status">
              <span>{status}</span>
              <div className="class-speech-controls" aria-label={t('classLesson.tutorSpeechControlsAriaLabel', 'Tutor speech controls')}>
                <button
                  type="button"
                  className={speechEnabled ? 'active' : ''}
                  onClick={() => {
                    if (speechEnabled) stopSpeech();
                    setSpeechEnabled((enabled) => !enabled);
                  }}
                >
                  {speechEnabled
                    ? t('classLesson.spokenRepliesOn', 'Spoken replies on')
                    : t('classLesson.spokenRepliesOff', 'Spoken replies off')}
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
                  title={t('classLesson.nativeGlossToggleHint', {
                    native: nativeName,
                    target: targetName,
                    defaultValue: 'Read {{native}} aloud after each {{target}} line. Click any line individually to hear it regardless.',
                  })}
                >
                  {speakNativeGloss
                    ? t('classLesson.speakLanguage', { lang: nativeName, defaultValue: 'Speak {{lang}}' })
                    : t('classLesson.languageSilent', { lang: nativeName, defaultValue: '{{lang}} silent' })}
                </button>
                <button
                  type="button"
                  className={speechInputMode === 'target' ? 'active' : ''}
                  onClick={() => setSpeechInputMode('target')}
                  title={t('classLesson.listenForLang', { lang: targetName, defaultValue: 'Listen for {{lang}}' })}
                >
                  {t('classLesson.languageMic', { lang: targetName, defaultValue: '{{lang}} mic' })}
                </button>
                <button
                  type="button"
                  className={speechInputMode === 'native' ? 'active' : ''}
                  onClick={() => setSpeechInputMode('native')}
                  title={t('classLesson.listenForLang', { lang: nativeName, defaultValue: 'Listen for {{lang}}' })}
                >
                  {t('classLesson.languageMic', { lang: nativeName, defaultValue: '{{lang}} mic' })}
                </button>
                <button
                  type="button"
                  onClick={listening ? stopListening : startListening}
                  disabled={!speechSupported || tutorLoading}
                  title={speechSupported ? t('classLesson.speakYourAnswer', 'Speak your answer') : t('classLesson.speechUnavailable', 'Speech input is not available in this browser')}
                >
                  {listening ? t('classLesson.stopMic', 'Stop mic') : t('classLesson.speak', 'Speak')}
                </button>
              </div>
            </div>
          </div>

          <div className="class-tutor-thread" ref={threadRef}>
            {tutorTurns.map((message) => (
              <div key={message.id} className={`class-tutor-message ${message.role} ${message.error ? 'error' : ''}`}>
                <strong>{message.role === 'user' ? t('classLesson.you', 'You') : t('classLesson.tutorKicker', 'Tutor')}</strong>
                {renderTutorMessageBody(message)}
                {message.coachingTip && <small>{message.coachingTip}</small>}
                {message.role === 'assistant' && !message.error && (
                  <div className="class-message-actions">
                    <button
                      type="button"
                      className="class-replay"
                      onClick={() => speakTutorTurn(message)}
                    >
                      {t('classLesson.replay', 'Replay')}
                    </button>
                    {studyTextsForTutorTurn(message).targetText && (
                      <button
                        type="button"
                        className="class-replay"
                        onClick={() => saveTutorTurnForReview(message)}
                      >
                        {t('classLesson.saveReply', 'Save reply')}
                      </button>
                    )}
                  </div>
                )}
                {message.role === 'assistant' && message.error && message.retryInstructionText && (
                  <button
                    type="button"
                    className="class-retry"
                    onClick={() => retryTutorTurn(message)}
                    disabled={tutorLoading}
                  >
                    {t('classLesson.retry', 'Retry')}
                  </button>
                )}
              </div>
            ))}
            {tutorLoading && (
              <div className="class-tutor-message assistant">
                <strong>{t('classLesson.tutorKicker', 'Tutor')}</strong>
                <p>{t('classLesson.preparingExplanation', 'Preparing a helpful explanation...')}</p>
              </div>
            )}
          </div>

          <div className="class-tutor-input">
            <div className="class-sync-note">
              {progressSyncState === 'synced' ? t('classLesson.progressSynced', 'Progress synced.') : t('classLesson.progressLocal', 'Progress saved on this device.')}
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
              placeholder={t('classLesson.inputPlaceholder', 'Ask a question or type your answer...')}
              rows={3}
            />
            <div className="class-input-actions">
              <button
                type="button"
                className="class-mic-button"
                onClick={listening ? stopListening : startListening}
                disabled={!speechSupported || tutorLoading}
                title={speechSupported ? t('classLesson.speakYourAnswer', 'Speak your answer') : t('classLesson.speechUnavailable', 'Speech input is not available in this browser')}
              >
                {listening ? t('classLesson.stop', 'Stop') : t('classLesson.speak', 'Speak')}
              </button>
              <button type="button" onClick={sendFreeTurn} disabled={!turn.trim() || tutorLoading}>{t('classLesson.send', 'Send')}</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ClassLessonPage;
