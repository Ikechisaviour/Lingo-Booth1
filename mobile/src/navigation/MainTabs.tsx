import React, { useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useAuthStore } from '../stores/authStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppColors, shadows, type AppColors } from '../config/theme';
import { aiService, certificateService, classLessonService, learningHubService, userService } from '../services/api';
import speechService from '../services/speechService';
import { useSettingsStore } from '../stores/settingsStore';
import LANGUAGES, { getLanguageDisplayName } from '../config/languages';
import PronunciationGuide from '../components/PronunciationGuide';
import { displayPartsForMessage, languageLabel, languageRole, speechChunksForPart, spokenPartsForMessage } from '../utils/languageSegments';
import { contrastingVoiceForLocale, roleVoiceForLocale, tutorVoiceForLocale } from '../utils/roleVoices';
import { looksLikeRawEnglishForNative } from '../utils/languagePairPolicy';
import VoicePickerModal from '../components/VoicePickerModal';
import {
  ClassLessonActivityStrip,
  ClassLessonItemPicker,
  ClassLessonSpeechControls,
  ClassLessonTutorThread,
  ClassLessonTutorComposer,
} from '../screens/classLesson/ClassLessonSections';

import HomeScreen from '../screens/home/HomeScreen';
import LevelCheckScreen from '../screens/home/LevelCheckScreen';
import LevelTestScreen from '../screens/levelTests/LevelTestScreen';
import QuizListScreen from '../screens/quiz/QuizListScreen';
import QuizDetailScreen from '../screens/quiz/QuizDetailScreen';
import FlashcardsScreen from '../screens/flashcards/FlashcardsScreen';
import WritingPracticeScreen from '../screens/writing/WritingPracticeScreen';
import ReviewScreen from '../screens/review/ReviewScreen';
import ConversationScreen from '../screens/ai/ConversationScreen';
import ContextPracticeScreen from '../screens/context/ContextPracticeScreen';
import ProgressScreen from '../screens/progress/ProgressScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import BillingScreen from '../screens/billing/BillingScreen';
import InstitutionDashboardScreen from '../screens/institution/InstitutionDashboardScreen';
import AdminScreen from '../screens/admin/AdminScreen';
import ContactScreen from '../screens/support/ContactScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ClassStack = createNativeStackNavigator();
const ExerciseStack = createNativeStackNavigator();
const QuizStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const FORMATTING_FALLBACK_REPLY = 'I had trouble formatting that reply. Please try again naturally.';
const classSetupText = (t: (key: string, options?: any) => string) => t(
  'classLesson.setupReady',
  {
    defaultValue: 'I am ready to guide this lesson. Choose a lesson action, or type your own question.',
  },
);
type ClassExpressionPractice = {
  id: string;
  label?: string;
  goal?: string;
};

type ClassLesson = {
  _id: string;
  title?: string;
  category?: string;
  difficulty?: string;
  track?: 'textbook' | 'practice' | string;
  lessonType?: 'foundation' | 'thematic' | 'workplace' | 'grammar' | 'review' | string;
  learning?: {
    level?: number;
    levelTrack?: string;
    supportLevel?: string;
    quizOptionMode?: string;
    writingMode?: string;
    lessonRole?: string;
    branchType?: string;
    lessonWeight?: number;
    longActivityTypes?: string[];
    manifestSource?: string;
    unitOrder?: number;
    sequenceOrder?: number;
  };
  learningLevel?: number;
  levelTrack?: string;
  supportLevel?: string;
  quizOptionMode?: string;
  writingMode?: string;
  skillStrands?: string[];
  lessonRole?: 'core' | 'branch' | 'checkpoint' | 'repair' | string;
  coreRequired?: boolean;
  requiredForProgress?: boolean;
  certificateEligible?: boolean;
  branchType?: string;
  lessonWeight?: number;
  manifestSource?: string;
  unitOrder?: number;
  sequenceOrder?: number;
  longActivityTypes?: string[];
  activities?: ClassActivity[];
  expressionPractice?: ClassExpressionPractice[];
  relatedPools?: string[];
  content?: ClassLessonItem[];
  contentIndex?: Array<{ index?: number; type?: string; activityIds?: string[] }>;
  contentTotal?: number;
  contentStats?: {
    total?: number;
    vocabulary?: number;
    grammar?: number;
    dialogues?: number;
  };
  stats?: {
    total?: number;
    vocabulary?: number;
    grammar?: number;
    dialogues?: number;
  };
};

type ClassLessonItem = {
  type?: string;
  activityIds?: string[];
  targetText?: string;
  nativeText?: string;
  korean?: string;
  english?: string;
  romanization?: string;
  pronunciation?: string;
  officialPronunciation?: string;
  learnerPronunciation?: string;
  pronunciationConfidence?: 'strong' | 'approximate' | 'audioFirst';
  pronunciationGuide?: {
    learner?: string;
    official?: string;
    confidence?: 'strong' | 'approximate' | 'audioFirst';
  };
  exampleTarget?: string;
  exampleNative?: string;
  example?: string;
  exampleEnglish?: string;
  _translationPending?: boolean;
  _windowPlaceholder?: boolean;
  learningLevel?: number;
  levelTrack?: string;
  supportLevel?: string;
  quizOptionMode?: string;
  writingMode?: string;
  skillStrands?: string[];
  lessonRole?: string;
  branchType?: string;
  lessonWeight?: number;
  longActivityTypes?: string[];
};

type TutorMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
  retryDisplayText?: string;
  retryInstructionText?: string;
  retryClassAction?: ClassActionPayload;
  speechParts?: Array<{ language?: string; text: string; speaker?: string }>;
  displayParts?: Array<{ type?: string; language?: string; text: string; speak?: boolean; speaker?: string }>;
  language?: string;
};

type ClassActivity = {
  id: string;
  section: string;
  title: string;
  goals: string[];
  task: string;
};

const defaultActivityPlan = (t: (key: string, options?: any) => string): ClassActivity[] => [
  {
    id: 'preview',
    section: t('classLesson.defaultActivities.preview.section', { defaultValue: 'Preview' }),
    title: t('classLesson.defaultActivities.preview.title', { defaultValue: 'Lesson overview' }),
    goals: [t('classLesson.defaultActivities.preview.goal', { defaultValue: 'Preview the lesson and set a learning goal.' })],
    task: t('classLesson.defaultActivities.preview.task', { defaultValue: 'Tell the tutor what you want to understand first.' }),
  },
  {
    id: 'learn',
    section: t('classLesson.defaultActivities.learn.section', { defaultValue: 'Learn' }),
    title: t('classLesson.defaultActivities.learn.title', { defaultValue: 'Guided explanation' }),
    goals: [t('classLesson.defaultActivities.learn.goal', { defaultValue: 'Study the selected lesson item with the tutor.' })],
    task: t('classLesson.defaultActivities.learn.task', { defaultValue: 'Ask for a simple explanation or example.' }),
  },
  {
    id: 'practice',
    section: t('classLesson.defaultActivities.practice.section', { defaultValue: 'Practice' }),
    title: t('classLesson.defaultActivities.practice.title', { defaultValue: 'Active practice' }),
    goals: [t('classLesson.defaultActivities.practice.goal', { defaultValue: 'Use the target language in a short answer.' })],
    task: t('classLesson.defaultActivities.practice.task', { defaultValue: 'Write or say one original answer using the lesson material.' }),
  },
  {
    id: 'review',
    section: t('classLesson.defaultActivities.review.section', { defaultValue: 'Review' }),
    title: t('classLesson.defaultActivities.review.title', { defaultValue: 'Check understanding' }),
    goals: [t('classLesson.defaultActivities.review.goal', { defaultValue: 'Review mistakes and summarize what you learned.' })],
    task: t('classLesson.defaultActivities.review.task', { defaultValue: 'Summarize one thing you learned and one thing that is still unclear.' }),
  },
];

const CLASS_TRACKS = [
  {
    level: 1,
    track: 'foundation',
    titleKey: 'classList.tracks.foundationTitle',
    fallbackTitle: 'Level {{level}} - Foundation',
  },
  {
    level: 1,
    track: 'survival',
    titleKey: 'classList.tracks.survivalTitle',
    fallbackTitle: 'Level {{level}} - Essential {{language}}',
  },
  {
    level: 1,
    track: 'everyday',
    titleKey: 'classList.tracks.everydayTitle',
    fallbackTitle: 'Level {{level}} - Everyday {{language}}',
  },
  {
    level: 2,
    track: 'bridge',
    titleKey: 'classList.tracks.bridgeTitle',
    fallbackTitle: 'Level {{level}} - Bridge',
  },
  {
    level: 2,
    track: 'thematic',
    titleKey: 'classList.tracks.topicTitle',
    fallbackTitle: 'Level {{level}} - Thematic {{language}}',
  },
  {
    level: 3,
    track: 'professional',
    titleKey: 'classList.tracks.professionalTitle',
    fallbackTitle: 'Level {{level}} - Professional {{language}}',
  },
  {
    level: 4,
    track: 'advanced',
    titleKey: 'classList.tracks.advancedTitle',
    fallbackTitle: 'Level {{level}} - Advanced {{language}}',
  },
];

const CLASS_PROGRAM_LEVELS = [
  {
    level: 1,
    titleKey: 'classList.programLevels.level1.title',
    subtitleKey: 'classList.programLevels.level1.description',
    fallbackTitle: 'Level {{level}} - Foundation',
    fallbackSubtitle: 'Build the sound system, first routines, and essential everyday control.',
  },
  {
    level: 2,
    titleKey: 'classList.programLevels.level2.title',
    subtitleKey: 'classList.programLevels.level2.description',
    fallbackTitle: 'Level {{level}} - Everyday Use',
    fallbackSubtitle: 'Use the language across daily topics with more reading, typing, listening, and review.',
  },
  {
    level: 3,
    titleKey: 'classList.programLevels.level3.title',
    subtitleKey: 'classList.programLevels.level3.description',
    fallbackTitle: 'Level {{level}} - Independent Use',
    fallbackSubtitle: 'Handle work, services, longer turns, and real-life problem solving with lighter support.',
  },
  {
    level: 4,
    titleKey: 'classList.programLevels.level4.title',
    subtitleKey: 'classList.programLevels.level4.description',
    fallbackTitle: 'Level {{level}} - Advanced Control',
    fallbackSubtitle: 'Refine advanced grammar, extended writing, storytelling, and target-first comprehension.',
  },
];

const CLASS_TRACK_ORDER: Record<string, number> = {
  foundation: 1,
  survival: 2,
  everyday: 3,
  bridge: 4,
  thematic: 5,
  professional: 6,
  advanced: 7,
};

function interpolateClassCopy(template: string, values: Record<string, string | number>) {
  return String(template || '').replace(/\{\{(\w+)\}\}/g, (_, key) => String(values[key] ?? ''));
}

function classifyClassLesson(lesson: ClassLesson) {
  const course: any = (lesson as any).course || {};
  const learning: any = lesson.learning || {};
  const level = Number(course.level || lesson.learningLevel || learning.level || 0);
  const track = course.track || lesson.levelTrack || learning.levelTrack || '';
  if (level && track) {
    return {
      level,
      track,
      position: Number((lesson as any).sequenceOrder || course.sequenceOrder || course.position || 999),
    };
  }
  if (lesson.lessonType === 'foundation') return { level: 1, track: 'foundation', position: 0 };
  if (lesson.lessonType === 'workplace') return { level: 3, track: 'professional', position: 999 };
  if (lesson.lessonType === 'grammar') return { level: 4, track: 'advanced', position: 999 };
  if (lesson.lessonType === 'review') return { level: 2, track: 'bridge', position: 999 };
  if (lesson.difficulty === 'beginner') return { level: 1, track: 'everyday', position: 999 };
  if (lesson.difficulty === 'intermediate') return { level: 2, track: 'thematic', position: 999 };
  if (lesson.difficulty === 'advanced') return { level: 4, track: 'advanced', position: 999 };
  return { level: 9, track: 'other', position: 999 };
}

function classTrackTitle(group: { level: number; track: string }, targetName: string, t: (key: string, options?: any) => string) {
  const info = CLASS_TRACKS.find((item) => item.level === group.level && item.track === group.track);
  if (!info) return t('classList.classFallback', 'Class');
  const values = { level: info.level, language: targetName };
  return t(info.titleKey, {
    ...values,
    defaultValue: interpolateClassCopy(info.fallbackTitle, values),
  });
}

function classProgramLevelCopy(levelInfo: typeof CLASS_PROGRAM_LEVELS[number], t: (key: string, options?: any) => string) {
  const values = { level: levelInfo.level };
  return {
    title: t(levelInfo.titleKey, {
      ...values,
      defaultValue: interpolateClassCopy(levelInfo.fallbackTitle, values),
    }),
    subtitle: t(levelInfo.subtitleKey, levelInfo.fallbackSubtitle),
  };
}

function classLevelAccent(level: number | undefined, colors: AppColors) {
  const normalized = Number(level || 1);
  if (normalized === 2) {
    return {
      accent: '#168fd2',
      strong: '#0b6fa8',
      soft: 'rgba(22, 143, 210, 0.11)',
      panel: 'rgba(239, 249, 255, 0.94)',
      border: 'rgba(22, 143, 210, 0.28)',
    };
  }
  if (normalized === 3) {
    return {
      accent: '#7857d6',
      strong: '#5f3ebf',
      soft: 'rgba(120, 87, 214, 0.12)',
      panel: 'rgba(247, 244, 255, 0.94)',
      border: 'rgba(120, 87, 214, 0.3)',
    };
  }
  if (normalized === 4) {
    return {
      accent: '#b7791f',
      strong: '#8a5a13',
      soft: 'rgba(183, 121, 31, 0.13)',
      panel: 'rgba(255, 249, 235, 0.94)',
      border: 'rgba(183, 121, 31, 0.3)',
    };
  }
  return {
    accent: colors.primary,
    strong: colors.primaryHover,
    soft: colors.primary + '12',
    panel: colors.primary + '08',
    border: colors.primary + '35',
  };
}

function classRoleCounts(lessons: ClassLesson[]) {
  return lessons.reduce((acc, lesson) => {
    const role = String(lesson.lessonRole || lesson.learning?.lessonRole || 'core').toLowerCase();
    if (role === 'branch') acc.branches += 1;
    else if (role === 'checkpoint') acc.checkpoints += 1;
    else if (role === 'repair') acc.repairs += 1;
    else acc.core += 1;
    return acc;
  }, { core: 0, branches: 0, checkpoints: 0, repairs: 0 });
}

function classLessonRoleLabel(role: string | undefined, t: (key: string, options?: any) => string) {
  const normalized = String(role || 'core').toLowerCase();
  if (normalized === 'branch') return t('classList.lessonRoles.branch', 'Goal branch');
  if (normalized === 'checkpoint') return t('classList.lessonRoles.checkpoint', 'Checkpoint');
  if (normalized === 'repair') return t('classList.lessonRoles.repair', 'Repair');
  return t('classList.lessonRoles.core', 'Core');
}

function classLessonWeightLabel(weight: number | undefined, t: (key: string, options?: any) => string) {
  const value = Number(weight || 2);
  if (value >= 3) return t('classList.lessonWeights.deep', 'Deep');
  if (value <= 1) return t('classList.lessonWeights.light', 'Light');
  return t('classList.lessonWeights.standard', 'Standard');
}

const CLASS_LEVEL_FALLBACKS: Record<number, string> = {
  1: 'Level {{level}} - Foundation',
  2: 'Level {{level}} - Everyday Use',
  3: 'Level {{level}} - Independent Use',
  4: 'Level {{level}} - Advanced Control',
};

function classLearningLevelLabel(level: number | undefined, t: (key: string, options?: any) => string) {
  const value = Number(level || 0);
  const fallback = CLASS_LEVEL_FALLBACKS[value]
    ? interpolateClassCopy(CLASS_LEVEL_FALLBACKS[value], { level: value })
    : t('classLesson.learningPlan.unplacedLevel', 'Learning level');
  return t(`classList.programLevels.level${value}.title`, fallback);
}

function classSupportLevelLabel(value: string | undefined, t: (key: string, options?: any) => string) {
  const normalized = String(value || '').toLowerCase();
  if (normalized === 'native-guided') return t('classLesson.supportLevels.nativeGuided', 'Strong native-language support');
  if (normalized === 'mixed-guided') return t('classLesson.supportLevels.mixedGuided', 'Balanced target and native support');
  if (normalized === 'target-first') return t('classLesson.supportLevels.targetFirst', 'Target language first');
  if (normalized === 'immersion-with-help') return t('classLesson.supportLevels.immersionWithHelp', 'Mostly target language with help available');
  return t('classLesson.supportLevels.standard', 'Guided support');
}

function classQuizModeLabel(value: string | undefined, t: (key: string, options?: any) => string) {
  const normalized = String(value || '').toLowerCase();
  if (normalized === 'native-assisted') return t('classLesson.quizModes.nativeAssisted', 'Meaning choices in your native language');
  if (normalized === 'target-with-native-hints') return t('classLesson.quizModes.targetWithNativeHints', 'Target-language choices with native hints');
  if (normalized === 'target-dominant') return t('classLesson.quizModes.targetDominant', 'Mostly target-language choices');
  if (normalized === 'target-first') return t('classLesson.quizModes.targetFirst', 'Target-first self-test');
  return t('classLesson.quizModes.standard', 'Guided self-test');
}

function classWritingModeLabel(value: string | undefined, t: (key: string, options?: any) => string) {
  const normalized = String(value || '').toLowerCase();
  if (normalized === 'handwriting-first') return t('classLesson.writingModes.handwritingFirst', 'Trace or copy first');
  if (normalized === 'type-with-write-option') return t('classLesson.writingModes.typeWithWriteOption', 'Type, with writing practice available');
  if (normalized === 'typed-production') return t('classLesson.writingModes.typedProduction', 'Typed answers from memory');
  if (normalized === 'extended-typed-production') return t('classLesson.writingModes.extendedTypedProduction', 'Longer typed responses');
  return t('classLesson.writingModes.standard', 'Write or type');
}

function classLongActivityLabel(value: string | undefined, t: (key: string, options?: any) => string) {
  const normalized = String(value || '').toLowerCase();
  const labels: Record<string, [string, string]> = {
    comprehension: ['classLesson.longActivities.comprehension', 'Comprehension'],
    'copy-or-trace': ['classLesson.longActivities.copyOrTrace', 'Copy or trace'],
    'typed-writing': ['classLesson.longActivities.typedWriting', 'Typed writing'],
    'extended-writing': ['classLesson.longActivities.extendedWriting', 'Extended writing'],
    storytelling: ['classLesson.longActivities.storytelling', 'Storytelling'],
    'story-hearing': ['classLesson.longActivities.storyHearing', 'Story listening'],
    'guided-dialogue': ['classLesson.longActivities.guidedDialogue', 'Guided dialogue'],
    'listen-and-repeat': ['classLesson.longActivities.listenAndRepeat', 'Listen and repeat'],
    'pronunciation-lab': ['classLesson.longActivities.pronunciationLab', 'Pronunciation lab'],
    'checkpoint-review': ['classLesson.longActivities.checkpointReview', 'Checkpoint review'],
    'repair-drill': ['classLesson.longActivities.repairDrill', 'Repair drill'],
  };
  const [key, fallback] = labels[normalized] || ['classLesson.longActivities.practice', 'Practice'];
  return t(key, fallback);
}

function classLearningPlanCues(lesson: ClassLesson | null, item: ClassLessonItem | undefined, t: (key: string, options?: any) => string) {
  const learning = lesson?.learning || {};
  const level = Number(item?.learningLevel || lesson?.learningLevel || learning.level || 0);
  const longActivities = Array.from(new Set([
    ...(Array.isArray(item?.longActivityTypes) ? item.longActivityTypes : []),
    ...(Array.isArray(lesson?.longActivityTypes) ? lesson.longActivityTypes : []),
    ...(Array.isArray(learning.longActivityTypes) ? learning.longActivityTypes : []),
  ])).filter(Boolean);
  const visibleActivities = longActivities.slice(0, 3).map((activity) => classLongActivityLabel(activity, t));
  const remainingActivities = Math.max(0, longActivities.length - visibleActivities.length);
  const activitySummary = remainingActivities
    ? t('classLesson.learningPlan.moreActivities', { count: remainingActivities, defaultValue: '{{count}} more' })
    : '';

  return [
    {
      key: 'level',
      label: t('classLesson.learningPlan.level', 'Level'),
      value: classLearningLevelLabel(level, t),
    },
    {
      key: 'support',
      label: t('classLesson.learningPlan.support', 'Support'),
      value: classSupportLevelLabel(item?.supportLevel || lesson?.supportLevel || learning.supportLevel, t),
    },
    {
      key: 'self-test',
      label: t('classLesson.learningPlan.selfTest', 'Self-test'),
      value: classQuizModeLabel((item as any)?.quizOptionMode || (lesson as any)?.quizOptionMode || (learning as any).quizOptionMode, t),
    },
    {
      key: 'writing',
      label: t('classLesson.learningPlan.writing', 'Writing'),
      value: classWritingModeLabel(item?.writingMode || lesson?.writingMode || learning.writingMode, t),
    },
    {
      key: 'activities',
      label: t('classLesson.learningPlan.activities', 'Long practice'),
      value: [...visibleActivities, activitySummary].filter(Boolean).join(', ') || t('classLesson.longActivities.practice', 'Practice'),
    },
  ];
}

function activitySkills(activity?: ClassActivity) {
  const section = String(activity?.section || '').toLowerCase();
  const skills: string[] = [];
  if (section.includes('reading')) skills.push('reading');
  if (section.includes('listening')) skills.push('listening');
  if (section.includes('speaking')) skills.push('speaking');
  if (section.includes('writing')) skills.push('writing');
  if (section.includes('pronunciation')) skills.push('listening', 'speaking');
  return Array.from(new Set(skills));
}

const QuizStackScreen: React.FC = () => (
  <QuizStack.Navigator screenOptions={{ headerShown: false }}>
    <QuizStack.Screen name="QuizList" component={QuizListScreen} />
    <QuizStack.Screen name="QuizDetail" component={QuizDetailScreen} />
  </QuizStack.Navigator>
);

const HomeStackScreen: React.FC = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    <HomeStack.Screen name="Progress" component={ProgressScreen} />
    <HomeStack.Screen name="LevelCheck" component={LevelCheckScreen} />
    <HomeStack.Screen name="LevelTests" component={LevelTestScreen} />
    <HomeStack.Screen name="Contact" component={ContactScreen} />
  </HomeStack.Navigator>
);

const firstText = (...values: Array<string | undefined>) =>
  values.find((value) => String(value || '').trim()) || '';

const itemTarget = (item?: ClassLessonItem) => firstText(item?.targetText, item?.korean);
const itemNative = (item?: ClassLessonItem) => firstText(item?.nativeText, item?.english);
const normalizeStudyText = (value = '') => String(value || '').trim().toLowerCase();
const itemExampleTarget = (item?: ClassLessonItem) => {
  const example = firstText(item?.exampleTarget, item?.example);
  return normalizeStudyText(example) === normalizeStudyText(itemTarget(item)) ? '' : example;
};
const itemExampleNative = (item?: ClassLessonItem) => firstText(item?.exampleNative, item?.exampleEnglish);
const CLASS_ITEM_WINDOW_SIZE = 8;

function lessonContentFromShell(shell: ClassLesson = {} as ClassLesson, detailedItems: Array<ClassLessonItem & { index?: number }> = []) {
  const content = Array.isArray(shell.contentIndex)
    ? shell.contentIndex.map((item) => ({
      type: item?.type || '',
      activityIds: Array.isArray(item?.activityIds) ? item.activityIds : [],
      _windowPlaceholder: true,
    }))
    : [];
  return mergeDetailedItems({ ...shell, content }, detailedItems);
}

function mergeDetailedItems(lesson: ClassLesson | null, detailedItems: Array<ClassLessonItem & { index?: number }> = []) {
  if (!lesson || !Array.isArray(lesson.content) || detailedItems.length === 0) return lesson;
  const content = [...lesson.content];
  detailedItems.forEach((item) => {
    if (!Number.isInteger(item?.index)) return;
    const { index, ...detail } = item;
    content[index as number] = {
      ...(content[index as number] || {}),
      ...detail,
      _windowPlaceholder: false,
    };
  });
  return { ...lesson, content };
}

function isDetailedLessonItem(item?: ClassLessonItem) {
  return !!item && item._windowPlaceholder !== true;
}

function localizedLessonTitle(title = '', t: (key: string, options?: any) => string) {
  const text = String(title || '').trim();
  const unitMatch = text.match(/^Level\s+(\d+)\s*[-·]\s*Unit\s+(\d+)\s*:\s*(.+)$/i);
  if (unitMatch) {
    return t('classList.titlePrefix.unit', {
      level: unitMatch[1],
      unit: unitMatch[2],
      title: unitMatch[3],
      defaultValue: 'Level {{level}} · Unit {{unit}}: {{title}}',
    });
  }
  return text;
}

function itemSectionKey(type?: string) {
  if (type === 'word') return 'vocabulary';
  if (type === 'sentence') return 'grammar';
  if (type === 'conversation') return 'dialogue';
  return 'practice';
}

const isFormattingFallbackMessage = (message: TutorMessage) => (
  message.role === 'assistant' && String(message.content || '').trim() === FORMATTING_FALLBACK_REPLY
);

function lessonActionFallback(
  item: ClassLessonItem | undefined,
  activity: ClassActivity | undefined,
  targetLanguage = 'ko',
  nativeLanguage = 'en',
  t: (key: string, options?: any) => string,
) {
  const target = itemTarget(item);
  const native = itemNative(item);
  const romanization = item?.romanization || item?.pronunciation || '';
  const exampleTarget = itemExampleTarget(item);
  const exampleNative = itemExampleNative(item);
  const title = activity?.title || activity?.section || t('classLesson.fallback.thisItem', { defaultValue: 'this item' });
  const task = activity?.task || t('classLesson.fallback.shortAnswer', { defaultValue: 'Try one short answer using this lesson item.' });
  const lines = [t('classLesson.fallback.practiceLead', {
    title,
    defaultValue: "Let's practice {{title}}.",
  })];
  const targetLine = [target, romanization ? `(${romanization})` : ''].filter(Boolean).join(' ');

  if (targetLine && native) lines.push(`${targetLine} - ${native}`);
  else if (targetLine || native) lines.push(targetLine || native);

  if (exampleTarget && exampleNative) {
    lines.push(`${t('classLesson.examplePrefix', { defaultValue: 'Example:' })} ${exampleTarget} - ${exampleNative}`);
  } else if (exampleTarget || exampleNative) {
    lines.push(`${t('classLesson.examplePrefix', { defaultValue: 'Example:' })} ${exampleTarget || exampleNative}`);
  }

  lines.push(task);

  return lines.join('\n').trim() || t('classLesson.fallback.continue', { defaultValue: 'Let us continue with the next part of the lesson.' });
}

const ttsLocaleFor = (languageCode?: string, fallbackCode?: string) => (
  (languageCode && LANGUAGES[languageCode]?.ttsLocale)
  || (fallbackCode && LANGUAGES[fallbackCode]?.ttsLocale)
  || 'en-US'
);

const localizedLanguageName = (code: string | undefined, t: any, fallback: string) => {
  if (!code) return fallback;
  return getLanguageDisplayName(code, t) || fallback;
};

const nativeScaffoldText = (
  value: string | undefined,
  nativeLanguage: string | undefined,
  t: (key: string, options?: any) => string,
  fallbackKey = 'classLesson.translationPending',
) => {
  const text = String(value || '').trim();
  if (!text) return '';
  if (looksLikeRawEnglishForNative(text, nativeLanguage)) {
    return t(fallbackKey, { defaultValue: 'Translation is being prepared.' });
  }
  return text;
};

const activityPlanForLesson = (lesson: ClassLesson | null, t: (key: string, options?: any) => string): ClassActivity[] => {
  // Prefer the activities list shipped on the Lesson document. This matches
  // the web ClassLessonPage and the AI brief, so all three stay in sync per unit.
  if (Array.isArray(lesson?.activities) && lesson.activities.length > 0) {
    return lesson.activities;
  }
  return defaultActivityPlan(t);
};

// Returns the indices into items[] that belong to the given activity.
// Untagged items (no activityIds, or empty array) appear in every activity so
// legacy data without explicit tagging still teaches. Mirrors the web helper.
const itemIndicesForActivity = (items: ClassLessonItem[], activityId?: string): number[] => {
  if (!activityId) return items.map((_, index) => index);
  return items.reduce<number[]>((acc, item, index) => {
    const tags = Array.isArray(item?.activityIds) ? item.activityIds : [];
    if (tags.length === 0 || tags.includes(activityId)) acc.push(index);
    return acc;
  }, []);
};

const tutorMessage = (
  role: 'user' | 'assistant',
  content: string,
  error = false,
  extra: Partial<TutorMessage> = {},
): TutorMessage => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
  error,
  ...extra,
});

const tutorSetupMessage = (content: string, language = 'en') =>
  tutorMessage('assistant', content, false, {
    language,
    speechParts: [{ language, text: content }],
  });

const classProgressKey = (classLessonId: string, nativeLanguage?: string, targetLanguage?: string) =>
  `lingoClassLesson:${classLessonId}:${nativeLanguage || 'en'}-${targetLanguage || 'ko'}`;

const normalizeCompletedItems = (items: unknown): number[] => {
  if (!Array.isArray(items)) return [];
  return Array.from(new Set(
    items
      .map((item) => Number(item))
      .filter((item) => Number.isInteger(item) && item >= 0),
  ));
};

const normalizeTutorMessages = (turns: unknown, nativeLanguage = 'en', t: (key: string, options?: any) => string): TutorMessage[] => {
  if (!Array.isArray(turns)) {
    return [tutorSetupMessage(classSetupText(t), nativeLanguage)];
  }
  const cleaned = turns
    .filter((turn: any) => turn && (turn.role === 'user' || turn.role === 'assistant') && String(turn.content || '').trim())
    .filter((turn: any) => !isFormattingFallbackMessage(turn))
    .slice(-16)
    .map((turn: any) => tutorMessage(turn.role, String(turn.content || ''), false, {
      language: turn.language,
      speechParts: Array.isArray(turn.speechParts) ? turn.speechParts : [],
      displayParts: Array.isArray(turn.displayParts) ? turn.displayParts : [],
    }));
  return cleaned.length
    ? cleaned
    : [tutorSetupMessage(classSetupText(t), nativeLanguage)];
};

const buildClassProgressPayload = (
  selectedIndex: number,
  selectedActivityIndex: number,
  completed: number[],
  summary: string,
  memory: Record<string, unknown>,
  messages: TutorMessage[],
) => ({
  selectedIndex,
  selectedActivityIndex,
  completed,
  completedItems: completed,
  summary,
  memory,
  tutorTurns: messages.filter(message => !message.error && !isFormattingFallbackMessage(message)).slice(-16),
});

// Structured class-action payload sent on tutor-control turns. Replaces the
// legacy CLASS_LESSON_ACTION text prefix that used to ride inside `transcript`.
type ClassActionPayload = {
  action: string;
  activityId: string;
  activitySection: string;
  activityTitle: string;
  activityGoals: string[];
  activityTask: string;
  itemIndex: number;
  itemType: string;
  target: string;
  romanization: string;
  officialPronunciation: string;
  learnerPronunciation: string;
  native: string;
  exampleTarget: string;
  exampleNative: string;
  lessonTitle: string;
};

const buildClassAction = (
  action: string,
  lesson: ClassLesson | null,
  item: ClassLessonItem | undefined,
  index: number,
  activity?: ClassActivity,
  expressionPractice?: ClassExpressionPractice,
): ClassActionPayload => ({
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
});

function groupDisplayParts(parts: any[] = []) {
  const groups: Array<{ kind: 'main' | 'example'; title: string; parts: any[] }> = [];

  const ensureGroup = (kind: 'main' | 'example', title = '') => {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup?.kind === kind) return lastGroup;
    const group = { kind, title: kind === 'example' ? 'Example' : title, parts: [] as any[] };
    groups.push(group);
    return group;
  };

  parts.forEach((part) => {
    const isExampleMarker = part.type === 'meta' && /^example$/i.test(String(part.text || '').trim());
    const isExample = part.section === 'example' || isExampleMarker;
    const continuesExampleDialogue = groups[groups.length - 1]?.kind === 'example' && !!part.speaker;

    if (isExample || continuesExampleDialogue) {
      const group = ensureGroup('example', 'Example');
      if (!isExampleMarker) {
        group.parts.push(part);
      }
      return;
    }

    ensureGroup('main').parts.push(part);
  });

  const finalGroups = groups.filter(group => group.parts.length);
  // Upgrade single-speaker examples to plain "Example"; reserve "Example
  // conversation" for multi-speaker dialogues.
  finalGroups.forEach((group) => {
    if (group.kind !== 'example') return;
    const speakers = new Set(
      (group.parts || []).map((part: any) => part.speaker).filter(Boolean),
    );
    group.title = speakers.size >= 2 ? 'Example conversation' : 'Example';
  });
  return finalGroups;
}

function exampleTopicFromGroup(group: { parts?: any[] } = {}) {
  const text = (group.parts || []).map(part => part.text || '').join(' ');
  if (/Kumoh/i.test(text)) return 'life at Kumoh National Institute of Technology';
  return '';
}

function exampleCueFor(_language: string | undefined, group: { parts?: any[] } | undefined, t: (key: string, options?: any) => string) {
  const speakers = new Set((group?.parts || []).map((part: any) => part.speaker).filter(Boolean));
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

function shouldSpeakTutorPart(
  part: { text?: string; speak?: boolean; type?: string } = {},
  options: { speakNativeGloss?: boolean } = {},
) {
  const text = String(part?.text || '').trim();
  const structuralMeta = part.type === 'meta'
    && /^(example|sample|note|tip)$/i.test(text);
  if (!text || part.speak === false || part.type === 'romanization' || structuralMeta) {
    return false;
  }
  // The native-language gloss is silent by default during auto-play so each
  // item doesn't drag through a full English read. Per-line replay always
  // plays both languages, regardless.
  if (options.speakNativeGloss === false && part.type === 'native') {
    return false;
  }
  return true;
}

const ClassHomeScreen: React.FC<any> = ({ navigation }) => {
  const colors = useAppColors();
  const styles = createLocalStyles(colors);
  const { t } = useTranslation();
  const { nativeLanguage, targetLanguage } = useSettingsStore();
  const [classLessons, setClassLessons] = useState<ClassLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadClassLessons() {
      setLoading(true);
      setError('');
      try {
        classLessonService.preparePair().catch(() => {});
        const response = await classLessonService.getClassLessonSummaries();
        if (cancelled) return;
        const list = (Array.isArray(response.data) ? [...response.data] : []) as ClassLesson[];
        list.sort((a, b) => {
          const ac = classifyClassLesson(a);
          const bc = classifyClassLesson(b);
          const aLevel = Number(ac.level || 99);
          const bLevel = Number(bc.level || 99);
          if (aLevel !== bLevel) return aLevel - bLevel;
          const aTrack = CLASS_TRACK_ORDER[ac.track] || 99;
          const bTrack = CLASS_TRACK_ORDER[bc.track] || 99;
          if (aTrack !== bTrack) return aTrack - bTrack;
          const aPosition = Number(ac.position || 999);
          const bPosition = Number(bc.position || 999);
          if (aPosition !== bPosition) return aPosition - bPosition;
          return (a.title || '').localeCompare(b.title || '', 'ko');
        });
        setClassLessons(list);
      } catch {
        if (!cancelled) setError(t('classList.loadError', "We couldn't load your lessons right now. Please check your connection and try again."));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadClassLessons();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const handleRetry = () => setReloadKey((n) => n + 1);
  const targetName = localizedLanguageName(targetLanguage, t, t('voicePicker.targetFallback', 'your target language'));
  const { width } = useWindowDimensions();
  const isWideClassList = width >= 720;
  const groupedLessons = useMemo(() => {
    const groups = new Map<string, { level: number; track: string; lessons: ClassLesson[] }>();
    classLessons.forEach((lesson) => {
      const classify = classifyClassLesson(lesson);
      const key = `${classify.level}:${classify.track}`;
      if (!groups.has(key)) groups.set(key, { level: classify.level, track: classify.track, lessons: [] });
      groups.get(key)?.lessons.push(lesson);
    });
    return Array.from(groups.values()).sort((a, b) => {
      if (a.level !== b.level) return a.level - b.level;
      return (CLASS_TRACK_ORDER[a.track] || 99) - (CLASS_TRACK_ORDER[b.track] || 99);
    });
  }, [classLessons]);

  const programLevelGroups = useMemo(() => CLASS_PROGRAM_LEVELS.map((levelInfo) => {
    const tracks = groupedLessons.filter((group) => group.level === levelInfo.level);
    const lessons = tracks.flatMap((group) => group.lessons);
    return { levelInfo, tracks, lessons, counts: classRoleCounts(lessons) };
  }).filter((group) => group.tracks.length > 0), [groupedLessons]);

  return (
    <View style={styles.screen}>
      <View style={styles.panel}>
        <Text style={styles.kicker}>{t('classList.kicker', 'Class')}</Text>
        <Text variant="headlineSmall" style={styles.title}>{t('classList.title', 'Learn with your tutor')}</Text>
        <Text style={styles.subtitle}>{t('classList.subtitleShort', 'Pick a unit and practice it in conversation.')}</Text>
        <Button mode="outlined" onPress={() => navigation.navigate('LevelTests')} style={styles.classLevelTestButton}>
          {t('levelTests.kicker', 'Level checks')}
        </Button>

        {loading && <Text style={styles.subtitle}>{t('classList.loading', 'Loading lessons...')}</Text>}
        {!!error && (
          <View style={styles.errorBlock}>
            <Text style={styles.errorText}>{error}</Text>
            <Button mode="outlined" onPress={handleRetry} style={styles.errorRetry}>
              {t('classList.retry', 'Try again')}
            </Button>
          </View>
        )}
        {!loading && !error && classLessons.length === 0 && (
          <View style={styles.comingSoonBox}>
            <Text style={styles.comingSoonTitle}>{t('classList.emptyTitle', 'Coming soon')}</Text>
            <Text style={styles.comingSoonText}>{t('classList.emptyBody', 'Class lessons are being prepared for this language. Please check back soon.')}</Text>
          </View>
        )}

        {programLevelGroups.map(({ levelInfo, tracks, counts }) => {
          const levelCopy = classProgramLevelCopy(levelInfo, t);
          const levelAccent = classLevelAccent(levelInfo.level, colors);
          return (
            <View
              key={levelInfo.level}
              style={[
                styles.classProgramLevelSection,
                {
                  borderColor: levelAccent.border,
                  borderTopWidth: 5,
                  borderTopColor: levelAccent.accent,
                  backgroundColor: levelAccent.panel,
                },
              ]}
            >
              <View style={styles.classProgramLevelHeader}>
                <Text style={[styles.kicker, { color: levelAccent.strong }]}>{t('classList.programLevels.kicker', 'Learning level')}</Text>
                <Text style={styles.classProgramLevelTitle}>{levelCopy.title}</Text>
                <Text style={styles.classProgramLevelSubtitle}>{levelCopy.subtitle}</Text>
                <View style={styles.classProgramLevelChips}>
                  <Text style={[styles.classPlanBadge, { backgroundColor: levelAccent.soft, color: levelAccent.strong }]}>{t('classList.programLevels.coreCount', { count: counts.core, defaultValue: '{{count}} core' })}</Text>
                  <Text style={[styles.classPlanBadge, { backgroundColor: levelAccent.soft, color: levelAccent.strong }]}>{t('classList.programLevels.branchCount', { count: counts.branches, defaultValue: '{{count}} branches' })}</Text>
                  <Text style={[styles.classPlanBadge, { backgroundColor: levelAccent.soft, color: levelAccent.strong }]}>{t('classList.programLevels.checkpointCount', { count: counts.checkpoints, defaultValue: '{{count}} checkpoints' })}</Text>
                </View>
              </View>
              {tracks.map((group) => (
                <View key={`${group.level}:${group.track}`} style={styles.classTrackSection}>
                  <View style={styles.classTrackHeader}>
                    <Text style={styles.classTrackTitle}>{classTrackTitle(group, targetName, t)}</Text>
                    <Text style={styles.classTrackCount}>{t('classList.lessonsCount', { count: group.lessons.length, defaultValue: '{{count}} lessons' })}</Text>
                  </View>
                  <View style={[styles.classTrackLessonList, group.lessons.length === 1 && isWideClassList ? styles.classTrackLessonListWide : null]}>
                    {group.lessons.map((lesson) => {
                      const items = Array.isArray(lesson.content) ? lesson.content : [];
                      const vocab = Number(lesson.stats?.vocabulary ?? items.filter((item) => item.type === 'word').length);
                      const sentences = Number(lesson.stats?.grammar ?? items.filter((item) => item.type === 'sentence').length);
                      const conversations = Number(lesson.stats?.dialogues ?? items.filter((item) => item.type === 'conversation').length);
                      const lessonAccent = classLevelAccent(classifyClassLesson(lesson).level || levelInfo.level, colors);

                      return (
                        <TouchableOpacity
                          key={lesson._id}
                          style={[
                            styles.classLessonCard,
                            group.lessons.length === 1 && isWideClassList ? styles.classLessonCardSingleWide : null,
                            {
                              borderColor: lessonAccent.border,
                              borderLeftWidth: 5,
                              borderLeftColor: lessonAccent.accent,
                              backgroundColor: lessonAccent.panel,
                            },
                          ]}
                          activeOpacity={0.75}
                          onPress={() => navigation.navigate('ClassLesson', { classLessonId: lesson._id })}
                        >
                          <View style={styles.exerciseText}>
                            <Text style={styles.exerciseTitle}>
                              {nativeScaffoldText(localizedLessonTitle(lesson.title || '', t), nativeLanguage, t, 'classList.untitled') || t('classList.untitled', 'Untitled lesson')}
                            </Text>
                            <Text style={styles.exerciseDesc}>
                              {t('classList.cardStats', { vocab, sentences, conversations, defaultValue: '{{vocab}} vocabulary / {{sentences}} examples / {{conversations}} dialogues' })}
                            </Text>
                            <View style={styles.classPlanBadges}>
                              <Text style={[styles.classPlanBadge, { backgroundColor: lessonAccent.soft, color: lessonAccent.strong }]}>{classLessonRoleLabel(lesson.lessonRole || lesson.learning?.lessonRole, t)}</Text>
                              <Text style={[styles.classPlanBadge, { backgroundColor: lessonAccent.soft, color: lessonAccent.strong }]}>{classLessonWeightLabel(lesson.lessonWeight || lesson.learning?.lessonWeight, t)}</Text>
                              {(lesson.requiredForProgress || lesson.coreRequired) ? (
                                <Text style={[styles.classPlanBadge, { backgroundColor: lessonAccent.soft, color: lessonAccent.strong }]}>{t('classList.requiredForProgress', 'Required')}</Text>
                              ) : null}
                            </View>
                          </View>
                          <MaterialCommunityIcons name="chevron-right" color={lessonAccent.strong} size={24} />
                        </TouchableOpacity>
                      );
                    })}
                    {group.lessons.length === 1 ? (
                      <View
                        style={[
                          styles.classTrackGuidance,
                          {
                            borderColor: levelAccent.border,
                            backgroundColor: levelAccent.soft,
                          },
                        ]}
                      >
                        <Text style={[styles.classTrackGuidanceKicker, { color: levelAccent.strong }]}>{t('classList.singleTrackGuidanceKicker', 'Why one class')}</Text>
                        <Text style={styles.classTrackGuidanceTitle}>{t('classList.singleTrackGuidanceTitle', 'Start focused, then branch out')}</Text>
                        <Text style={styles.classTrackGuidanceBody}>
                          {t(
                            'classList.singleTrackGuidanceBody',
                            'This track is intentionally compact so the first step feels clear. Finish the class here, then move into the next track for broader practice.',
                          )}
                        </Text>
                        <View style={styles.classTrackGuidanceSteps}>
                          <Text style={[styles.classPlanBadge, { backgroundColor: colors.surface, color: levelAccent.strong }]}>{t('classList.singleTrackGuidanceStep1', 'Build the base')}</Text>
                          <Text style={[styles.classPlanBadge, { backgroundColor: colors.surface, color: levelAccent.strong }]}>{t('classList.singleTrackGuidanceStep2', 'Continue into everyday use')}</Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const ClassLessonScreen: React.FC<any> = ({ route, navigation }) => {
  const colors = useAppColors();
  const styles = createLocalStyles(colors);
  const { t } = useTranslation();
  const { nativeLanguage, targetLanguage } = useSettingsStore();
  const targetName = localizedLanguageName(targetLanguage, t, t('voicePicker.targetFallback', 'your target language'));
  const nativeName = localizedLanguageName(nativeLanguage, t, t('classLesson.nativeLanguageFallback', 'your native language'));
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);
  const classLessonId = String(route.params?.classLessonId || route.params?.lessonId || '');
  const listeningRef = useRef(false);
  const tutorThreadRef = useRef<ScrollView>(null);
  const pendingWindowCentersRef = useRef<Set<number>>(new Set());
  const viewedItemKeysRef = useRef<Set<string>>(new Set());
  const [lesson, setLesson] = useState<ClassLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<TutorMessage[]>([
    tutorSetupMessage(
      classSetupText(t),
      nativeLanguage || 'en',
    ),
  ]);
  const [summary, setSummary] = useState('');
  const [memory, setMemory] = useState<Record<string, unknown>>({});
  const [tutorLoading, setTutorLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [speakNativeGloss, setSpeakNativeGloss] = useState(false);
  const [speechInputMode, setSpeechInputMode] = useState<'target' | 'native'>('target');
  const [status, setStatus] = useState(() => t('classLesson.status.ready', 'Ready'));
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [progressSyncState, setProgressSyncState] = useState<'local' | 'synced'>('local');
  const [showVoicePicker, setShowVoicePicker] = useState(false);
  const [certificateStatus, setCertificateStatus] = useState<any>(null);
  const [certificateLoading, setCertificateLoading] = useState(false);
  const [certificateIssuing, setCertificateIssuing] = useState(false);
  const [itemWindowLoading, setItemWindowLoading] = useState(false);
  const [lessonGuideOpen, setLessonGuideOpen] = useState(false);
  const tutorRequestInFlightRef = useRef(false);
  // Per-session set of example groups already cued. Stops the
  // "Example conversation. Listen to Person A and Person B." sentence from
  // playing before every dialogue item.
  const exampleCueShownRef = useRef<Set<string>>(new Set());
  const shouldPlayExampleCue = (group: { parts?: any[] }) => {
    const key = (group?.parts || [])
      .map((part: any) => String(part?.text || '').trim())
      .filter(Boolean)
      .join('|');
    if (!key) return true;
    if (exampleCueShownRef.current.has(key)) return false;
    exampleCueShownRef.current.add(key);
    return true;
  };

  // Hydrate the speakNativeGloss preference from storage; first-run voice
  // picker shows when no preferred voice is stored for this target language.
  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem('classSpeakNativeGloss').then((value) => {
      if (!cancelled && value === 'true') setSpeakNativeGloss(true);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!targetLanguage) return;
    const voiceMap = useSettingsStore.getState().preferredVoices || {};
    const alreadyPicked = !!voiceMap[targetLanguage] || !!useSettingsStore.getState().preferredVoice;
    AsyncStorage.getItem('classVoicePickerSeen').then((skipped) => {
      if (skipped !== '1' && !alreadyPicked) setShowVoicePicker(true);
    }).catch(() => {});
  }, [targetLanguage]);

  useEffect(() => {
    let cancelled = false;
    async function loadClassLesson() {
      try {
        setLoading(true);
        setProgressLoaded(false);
        const applyProgress = (record: any) => {
          if (!record || typeof record !== 'object') return;
          setSelectedIndex(Number.isInteger(record.selectedIndex) ? record.selectedIndex : 0);
          setSelectedActivityIndex(Number.isInteger(record.selectedActivityIndex) ? record.selectedActivityIndex : 0);
          setCompletedItems(normalizeCompletedItems(record.completedItems || record.completed));
          setSummary(String(record.summary || ''));
          setMemory(record.memory && typeof record.memory === 'object' ? record.memory : {});
          setMessages(normalizeTutorMessages(record.tutorTurns, nativeLanguage || 'en', t));
          return {
            selectedIndex: Number.isInteger(record.selectedIndex) ? record.selectedIndex : 0,
          };
        };

        let localSelectedIndex = 0;
        try {
          const raw = await AsyncStorage.getItem(classProgressKey(classLessonId, nativeLanguage, targetLanguage));
          if (raw && !cancelled) {
            const progress = applyProgress(JSON.parse(raw));
            localSelectedIndex = progress?.selectedIndex || 0;
          }
        } catch {}

        const response = await classLessonService.getClassLessonBootstrap(classLessonId, {
          center: localSelectedIndex,
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
      } catch {
        if (!cancelled) setError('Could not load this class lesson.');
      } finally {
        if (!cancelled) {
          setProgressLoaded(true);
          setLoading(false);
        }
      }
    }
    loadClassLesson();
    return () => { cancelled = true; };
  }, [classLessonId, nativeLanguage, targetLanguage]);

  useEffect(() => (
    () => {
      ExpoSpeechRecognitionModule.abort();
      speechService.cancel().catch(() => {});
    }
  ), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      tutorThreadRef.current?.scrollToEnd({ animated: true });
    }, 80);
    return () => clearTimeout(timer);
  }, [messages.length, tutorLoading]);

  useEffect(() => {
    if (!lesson || !progressLoaded) return undefined;
    const payload = buildClassProgressPayload(
      selectedIndex,
      selectedActivityIndex,
      completedItems,
      summary,
      memory,
      messages,
    );
    const key = classProgressKey(classLessonId, nativeLanguage, targetLanguage);
    AsyncStorage.setItem(key, JSON.stringify(payload)).catch(() => {});

    const timer = setTimeout(() => {
      classLessonService.saveProgress(classLessonId, payload)
        .then((res) => setProgressSyncState(res.data?.canSync ? 'synced' : 'local'))
        .catch(() => setProgressSyncState('local'));
    }, 800);

    return () => clearTimeout(timer);
  }, [classLessonId, completedItems, memory, messages, nativeLanguage, progressLoaded, selectedActivityIndex, selectedIndex, summary, targetLanguage]);

  const items = lesson?.content || [];
  const selectedItem = items[selectedIndex];
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
  // Indices of items that belong to the currently selected activity. The strip
  // renders these instead of all items, mirroring the web ClassLessonPage.
  const activityItemIndices = useMemo(
    () => itemIndicesForActivity(items, selectedActivity?.id),
    [items, selectedActivity?.id],
  );
  const activityItemGroups = useMemo(() => {
    const groups: Array<{ label: string; indices: number[] }> = [];
    activityItemIndices.forEach((idx) => {
      const label = itemSectionKey(items[idx]?.type);
      const last = groups[groups.length - 1];
      if (last && last.label === label) last.indices.push(idx);
      else groups.push({ label, indices: [idx] });
    });
    return groups;
  }, [activityItemIndices, items]);
  const progressPercent = items.length ? Math.round((completedItems.length / items.length) * 100) : 0;
  const certificate = certificateStatus?.certificate;
  const lessonPlanCues = useMemo(
    () => classLearningPlanCues(lesson, selectedItem, t),
    [lesson, selectedItem, t],
  );
  const lessonAccent = classLevelAccent(lesson?.learningLevel || lesson?.learning?.level || selectedItem?.learningLevel || 1, colors);

  const loadLessonWindow = async (center: number, { foreground = false } = {}) => {
    if (!classLessonId || !lesson) return;
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
      // Keep the current lesson material visible. Future navigation can retry the same window.
    } finally {
      pendingWindowCentersRef.current.delete(safeCenter);
      if (foreground) setItemWindowLoading(false);
    }
  };

  useEffect(() => {
    if (!lesson || items.length === 0) return;
    if (!isDetailedLessonItem(items[selectedIndex])) {
      loadLessonWindow(selectedIndex, { foreground: true });
      return;
    }

    const nextCenter = Math.min(items.length - 1, selectedIndex + Math.floor(CLASS_ITEM_WINDOW_SIZE / 2));
    if (nextCenter > selectedIndex && !isDetailedLessonItem(items[nextCenter])) {
      loadLessonWindow(nextCenter);
    }
  }, [classLessonId, items, lesson, selectedIndex]);

  useEffect(() => {
    if (!userId || !classLessonId || !selectedItemReady) return;
    const key = `${classLessonId}:${selectedIndex}`;
    if (viewedItemKeysRef.current.has(key)) return;
    viewedItemKeysRef.current.add(key);
    userService.recordLearningEvent(userId, {
      eventType: 'class_item_viewed',
      classLessonId,
      itemIndex: selectedIndex,
      activitySection: selectedActivity?.section || '',
      activityTitle: selectedActivity?.title || '',
      targetText: itemTarget(selectedItem),
      nativeText: itemNative(selectedItem),
      skills: activitySkills(selectedActivity),
    }).catch(() => {});
  }, [classLessonId, selectedActivity, selectedIndex, selectedItem, selectedItemReady, userId]);

  useEffect(() => {
    let cancelled = false;
    if (!lesson || progressPercent < 100 || !token) {
      setCertificateStatus(null);
      return () => { cancelled = true; };
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

    return () => { cancelled = true; };
  }, [classLessonId, lesson, progressPercent, token]);

  const issueCertificate = async () => {
    if (!lesson || progressPercent < 100) return;
    const payload = buildClassProgressPayload(
      selectedIndex,
      selectedActivityIndex,
      completedItems,
      summary,
      memory,
      messages,
    );

    try {
      setCertificateIssuing(true);
      await classLessonService.saveProgress(classLessonId, payload).catch(() => {});
      const res = await certificateService.issueClassLessonCertificate(classLessonId, {
        completedItems,
      });
      if (res.status === 402) {
        setCertificateStatus(res.data || null);
        setStatus(t('certificates.paymentRequiredShort', 'Certificate purchase or upgrade needed.'));
        return;
      }
      setCertificateStatus((current: any) => ({
        ...(current || {}),
        certificate: res.data?.certificate,
        canIssue: false,
        access: res.data?.access || current?.access,
      }));
      setStatus(t('certificates.issuedSuccess', 'Certificate issued.'));
    } catch (err: any) {
      if (err.response?.status === 402) {
        setCertificateStatus(err.response.data || null);
        setStatus(t('certificates.paymentRequiredShort', 'Certificate purchase or upgrade needed.'));
        return;
      }
      setStatus(err.response?.data?.message || t('certificates.issueFailed', 'Could not issue certificate.'));
    } finally {
      setCertificateIssuing(false);
    }
  };

  // When the selected activity changes and the previously-picked item no longer
  // belongs to it, snap to the first item of the new activity so the focus card
  // and tutor stay coherent.
  useEffect(() => {
    if (!activityItemIndices.length) return;
    if (!activityItemIndices.includes(selectedIndex)) {
      setSelectedIndex(activityItemIndices[0]);
    }
  }, [activityItemIndices, selectedIndex]);

  // Resolve the voice for a single spoken chunk.
  //   • Dialogue speakers (Person A / Person B) take their dedicated voices.
  //   • Otherwise the tutor's target-language locale uses the tutor voice; the
  //     native-language gloss uses an opposite-gender voice so the language
  //     switch is audible.
  const tutorTargetLocale = ttsLocaleFor(targetLanguage || 'ko', targetLanguage || 'ko');
  const tutorTargetVoice = tutorVoiceForLocale(tutorTargetLocale);
  const resolveVoice = (lang: string, speaker?: string): string | undefined => {
    const speakerVoice = roleVoiceForLocale(lang, speaker);
    if (speakerVoice) return speakerVoice;
    const tutorVoice = tutorVoiceForLocale(lang);
    if (tutorVoice && lang === tutorTargetLocale) return tutorVoice;
    if (tutorTargetVoice) return contrastingVoiceForLocale(lang, tutorTargetVoice);
    return tutorVoice;
  };

  const speakTutorMessage = async (message?: TutorMessage, options: { rate?: string } = {}) => {
    const fallbackText = String(message?.content || '').trim();
    if (!fallbackText) return;
    const language = message?.language;
    try {
      const displayParts = displayPartsForMessage(message, targetLanguage || 'ko', nativeLanguage || 'en');
      const hasStructuredParts = Array.isArray(message?.displayParts) && message.displayParts.length > 0;
      const groups = groupDisplayParts(displayParts);
      const hasExampleGroup = groups.some(group => group.kind === 'example');
      const shouldUseVisibleOrder = hasStructuredParts || hasExampleGroup || displayParts.length > 1;
      const parts = shouldUseVisibleOrder
        ? groups.flatMap((group) => [
          ...(group.kind === 'example' && shouldPlayExampleCue(group)
            ? [{ language: nativeLanguage || 'en', text: exampleCueFor(nativeLanguage || 'en', group, t), speaker: '' }]
            : []),
          ...group.parts
            .filter((part: any) => shouldSpeakTutorPart(part, { speakNativeGloss }))
            .flatMap(part => speechChunksForPart(
              { ...part, language: part.language || language },
              targetLanguage || 'ko',
              nativeLanguage || 'en',
              language,
              { singleVoice: true },
            )),
        ])
        : spokenPartsForMessage(message, targetLanguage || 'ko', nativeLanguage || 'en', { singleVoice: true });
      if (parts.length) {
        for (const part of parts) {
          if (part.text) {
            const lang = ttsLocaleFor(part.language || language, targetLanguage || 'ko');
            await speechService.speakAsync(part.text, {
              lang,
              voice: resolveVoice(lang, part.speaker),
              rate: options.rate || '-10%',
            });
          }
        }
        return;
      }
      const lang = ttsLocaleFor(language, targetLanguage || 'ko');
      await speechService.speakAsync(fallbackText, {
        lang,
        voice: resolveVoice(lang, undefined),
        rate: options.rate || '-10%',
      });
    } catch {
      setStatus(t('classLesson.status.audioInterrupted', 'Audio playback was interrupted.'));
    }
  };

  const speakTutorPart = async (
    part: { language?: string; text?: string; speak?: boolean; type?: string; speaker?: string },
    options: { rate?: string } = {},
  ) => {
    // Per-line replay always plays both target + native, regardless of the
    // session-wide native-gloss toggle.
    if (!shouldSpeakTutorPart(part, { speakNativeGloss: true })) return;

    try {
      await speechService.cancel();
      const chunks = speechChunksForPart(part, targetLanguage || 'ko', nativeLanguage || 'en', part?.language, { singleVoice: true });
      for (const chunk of chunks) {
        if (!chunk.text) continue;
        const lang = ttsLocaleFor(chunk.language || part?.language || targetLanguage || 'ko', targetLanguage || 'ko');
        await speechService.speakAsync(chunk.text, {
          lang,
          voice: resolveVoice(lang, chunk.speaker || part?.speaker),
          rate: options.rate || '-10%',
        });
      }
      setStatus(t('classLesson.status.playingSelectedLine', 'Playing selected line.'));
    } catch {
      setStatus(t('classLesson.status.audioInterrupted', 'Audio playback was interrupted.'));
    }
  };

  const sendTutorTurn = async (
    displayText: string,
    classActionOrText: ClassActionPayload | string = displayText,
    options: { skipUserTurn?: boolean; inputLanguage?: string } = {},
  ) => {
    if (!lesson || tutorLoading || tutorRequestInFlightRef.current) return;
    tutorRequestInFlightRef.current = true;
    // Either a structured classAction (button-driven) or a free-text instruction.
    const classAction = (classActionOrText && typeof classActionOrText === 'object')
      ? classActionOrText as ClassActionPayload
      : null;
    const transcriptForTurn = classAction ? displayText : (classActionOrText as string);
    const cleanedMessages = messages.filter(message => !isFormattingFallbackMessage(message) && !message.error);
    setMessages(options.skipUserTurn ? cleanedMessages : [...cleanedMessages, tutorMessage('user', displayText)]);
    setTutorLoading(true);
    setStatus(t('classLesson.status.preparingNextStep', 'Tutor is preparing your next step...'));
    try {
      const response = await aiService.sendConversationTurn({
        sessionId: `class-lesson:${classLessonId}:${nativeLanguage || 'en'}-${targetLanguage || 'ko'}`,
        scenario: `Class lesson: ${lesson.title || ''}`,
        targetLanguage: targetLanguage || 'ko',
        nativeLanguage: nativeLanguage || 'en',
        inputLanguage: options.inputLanguage || nativeLanguage || 'en',
        difficulty: 'structured class lesson with active learner participation',
        transcript: transcriptForTurn,
        classAction: classAction || undefined,
        history: cleanedMessages
          .map(({ role, content }) => ({ role, content }))
          .slice(-10),
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
      setSummary(data.summary || summary);
      setMemory(data.memory || memory);
      const rawReply = String(data.reply || '').trim();
      const reply = rawReply === FORMATTING_FALLBACK_REPLY
        ? lessonActionFallback(selectedItem, selectedActivity, targetLanguage || 'ko', nativeLanguage || 'en', t)
        : rawReply || t('classLesson.fallback.continue', { defaultValue: 'Let us continue with the next part of the lesson.' });
      const assistantMessage = tutorMessage('assistant', reply, false, {
        speechParts: Array.isArray(data.speechParts) ? data.speechParts : [],
        displayParts: Array.isArray(data.displayParts) ? data.displayParts : [],
        language: data.expectedLanguage || targetLanguage || 'ko',
      });
      setMessages((prev) => [...prev, assistantMessage]);

      // Bidirectional progress sync: apply the AI's itemIndex when it advances
      // the learner inside the current activity (mirror of the web behavior).
      const aiProgress = (data?.memory && (data.memory as any).lessonProgress) as
        | { itemIndex?: number; activityId?: string }
        | undefined;
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
      if (speechEnabled) await speakTutorMessage(assistantMessage);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev.filter(message => !message.error),
        tutorMessage('assistant', err?.response?.data?.message || t('classLesson.tutorCouldNotReply', 'The tutor could not reply this time. Please try again.'), true, {
          language: nativeLanguage || 'en',
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

  const retryTutorMessage = (message: TutorMessage) => {
    if (message.retryClassAction) {
      sendTutorTurn(
        message.retryDisplayText || 'Retry tutor response',
        message.retryClassAction,
        { skipUserTurn: true },
      ).catch(() => {});
      return;
    }
    if (!message.retryInstructionText) return;
    sendTutorTurn(
      message.retryDisplayText || 'Retry tutor response',
      message.retryInstructionText,
      { skipUserTurn: true },
    ).catch(() => {});
  };

  const teachSelected = () => {
    if (!selectedItemReady) return;
    sendTutorTurn(
      `Teach ${selectedActivity?.section || 'activity'}: item ${selectedIndex + 1}`,
      buildClassAction('teach_selected_item', lesson, selectedItem, selectedIndex, selectedActivity),
    );
  };

  const saveSelectedForReview = async () => {
    if (!userId || !selectedItemReady) return;
    const targetText = itemTarget(selectedItem);
    if (!targetText) return;
    try {
      await learningHubService.saveItem({
        itemType: selectedItem?.type === 'word' ? 'word' : selectedItem?.type === 'conversation' ? 'sentence' : 'phrase',
        targetText,
        nativeText: itemNative(selectedItem),
        romanization: selectedItem?.learnerPronunciation || selectedItem?.officialPronunciation || selectedItem?.romanization || '',
        sourceType: 'class',
        sourceRef: classLessonId,
        sourceLabel: lesson?.title || '',
        reason: t('classLesson.savedFromClassReason', 'Saved from class for review.'),
        metadata: {
          route: `/class/${classLessonId}`,
          itemIndex: selectedIndex,
          activityId: selectedActivity?.id || '',
        },
      });
      setStatus(t('classLesson.savedForReview', 'Saved for review.'));
    } catch {
      setStatus(t('classLesson.saveForReviewFailed', 'Could not save this item right now.'));
    }
  };

  const saveSelectedExampleForReview = async () => {
    if (!userId || !selectedItemReady || !itemExampleTarget(selectedItem)) return;
    try {
      await learningHubService.saveItem({
        itemType: 'sentence',
        targetText: itemExampleTarget(selectedItem),
        nativeText: looksLikeRawEnglishForNative(itemExampleNative(selectedItem), nativeLanguage || 'en') ? '' : itemExampleNative(selectedItem),
        romanization: selectedItem?.learnerPronunciation || selectedItem?.officialPronunciation || selectedItem?.romanization || '',
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
      setStatus(t('classLesson.exampleSaved', 'Example saved for review.'));
    } catch {
      setStatus(t('classLesson.saveForReviewFailed', 'Could not save this item right now.'));
    }
  };

  const studyTextsForTutorMessage = (message?: TutorMessage) => {
    const parts = displayPartsForMessage(message, targetLanguage || 'ko', nativeLanguage || 'en');
    const targetText = parts
      .filter((part) => languageRole(part, targetLanguage || 'ko', nativeLanguage || 'en') === 'target' && !['meta', 'romanization'].includes(part.type || ''))
      .map((part) => String(part.text || '').trim())
      .filter(Boolean)
      .join('\n');
    const nativeText = parts
      .filter((part) => languageRole(part, targetLanguage || 'ko', nativeLanguage || 'en') === 'native' && !['meta', 'romanization'].includes(part.type || ''))
      .map((part) => String(part.text || '').trim())
      .filter(Boolean)
      .join('\n');
    return {
      targetText: targetText || (message?.language === targetLanguage ? String(message?.content || '').trim() : ''),
      nativeText,
    };
  };

  const saveTutorMessageForReview = async (message?: TutorMessage) => {
    const studyText = studyTextsForTutorMessage(message);
    if (!userId || !studyText.targetText) return;
    try {
      await learningHubService.saveItem({
        itemType: 'phrase',
        targetText: studyText.targetText,
        nativeText: looksLikeRawEnglishForNative(studyText.nativeText, nativeLanguage || 'en') ? '' : studyText.nativeText,
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
      setStatus(t('classLesson.tutorReplySaved', 'Tutor reply saved for review.'));
    } catch {
      setStatus(t('classLesson.saveForReviewFailed', 'Could not save this item right now.'));
    }
  };

  const selectedPracticeParams = {
    savedText: itemTarget(selectedItem),
    nativeText: looksLikeRawEnglishForNative(itemNative(selectedItem), nativeLanguage || 'en') ? '' : itemNative(selectedItem),
    sourceClassLessonKey: (lesson as any)?.curriculumKey || classLessonId,
    classLessonId,
    level: String(selectedItem?.learningLevel || lesson?.learningLevel || lesson?.learning?.level || ''),
  };

  const followUpParams = () => {
    const learning = lesson?.learning || {};
    const writingMode = lesson?.writingMode || learning.writingMode || selectedItem?.writingMode || '';
    return {
      sourceClassLessonKey: (lesson as any)?.curriculumKey || classLessonId,
      classLessonId,
      level: String(lesson?.learningLevel || learning.level || selectedItem?.learningLevel || ''),
      mode: writingMode.includes('handwriting') ? 'trace' : 'type',
    };
  };

  const openSelectedPracticeSurface = (surface: 'conversation' | 'writing' | 'flashcard' | 'quiz') => {
    if (!selectedItemReady) return;
    if (surface === 'conversation') {
      navigation.navigate('Conversation', {
        starter: t('learningHub.askTutorPrompt', {
          text: itemTarget(selectedItem),
          defaultValue: 'Help me practice "{{text}}".',
        }),
      });
      return;
    }
    navigation.navigate('Exercise', {
      screen: surface === 'writing' ? 'Writing' : surface === 'quiz' ? 'Quiz' : 'Flashcards',
      params: selectedPracticeParams,
    });
  };

  const selfTestSelectedItem = async () => {
    if (!userId || !selectedItemReady) return;
    try {
      const response = await learningHubService.saveItem({
        itemType: selectedItem?.type === 'word' ? 'word' : selectedItem?.type === 'conversation' ? 'sentence' : 'phrase',
        targetText: itemTarget(selectedItem),
        nativeText: looksLikeRawEnglishForNative(itemNative(selectedItem), nativeLanguage || 'en') ? '' : itemNative(selectedItem),
        romanization: selectedItem?.learnerPronunciation || selectedItem?.officialPronunciation || selectedItem?.romanization || '',
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
      navigation.navigate('Exercise', { screen: 'Review', params: { quickQuizItem: response.data } });
    } catch {
      setStatus(t('classLesson.saveForReviewFailed', 'Could not save this item right now.'));
    }
  };

  const listenToSelectedItem = async () => {
    if (!selectedItemReady || !itemTarget(selectedItem)) return;
    try {
      await speechService.cancel();
      const lang = ttsLocaleFor(targetLanguage || 'ko', targetLanguage || 'ko');
      await speechService.speakAsync(itemTarget(selectedItem), {
        lang,
        voice: resolveVoice(lang),
        rate: '-10%',
      });
      setStatus(t('classLesson.playingSelectedItem', 'Playing selected item.'));
    } catch {
      setStatus(t('classLesson.status.audioInterrupted', 'Audio playback was interrupted.'));
    }
  };

  const bookmarkSelectedItem = async () => {
    if (!userId || !selectedItemReady) return;
    const targetText = itemTarget(selectedItem);
    if (!targetText) return;
    try {
      await learningHubService.saveItem({
        itemType: 'bookmark',
        targetText,
        nativeText: itemNative(selectedItem),
        romanization: selectedItem?.learnerPronunciation || selectedItem?.officialPronunciation || selectedItem?.romanization || '',
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
    } catch {
      setStatus(t('classLesson.status.bookmarkFailed', 'Could not bookmark this item right now.'));
    }
  };

  const practiceSelected = () => {
    if (!selectedItemReady) return;
    sendTutorTurn(
      `Practice ${selectedActivity?.section || 'activity'}: item ${selectedIndex + 1}`,
      buildClassAction('practice_selected_item', lesson, selectedItem, selectedIndex, selectedActivity),
    );
  };

  // Drill a specific Expression Practice goal (workbook 표현 연습 column).
  const practiceExpression = (expressionPractice: ClassExpressionPractice) => {
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
    if (!selectedItemReady) return;
    const nextCompleted = completedItems.includes(selectedIndex)
      ? completedItems
      : [...completedItems, selectedIndex];
    setCompletedItems(nextCompleted);
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
        && activityItemIndices.every((index) => nextCompleted.includes(index))
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

      if (items.length > 0 && nextCompleted.length >= items.length) {
        userService.recordLearningEvent(userId, {
          eventType: 'class_lesson_complete',
          classLessonId,
        }).catch(() => {});
      }
    }
    const position = activityItemIndices.indexOf(selectedIndex);
    const nextGlobal = position >= 0 && position < activityItemIndices.length - 1
      ? activityItemIndices[position + 1]
      : selectedIndex;
    if (nextGlobal !== selectedIndex) {
      setSelectedIndex(nextGlobal);
      setStatus(t('classLesson.status.markedCompleteNext', 'Saved as complete. Moving to the next item.'));
    } else {
      setStatus(t('classLesson.status.markedComplete', 'Saved as complete.'));
    }
  };

  const sendInput = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    sendTutorTurn(text);
  };

  // Map terse speech-recognition error codes to actionable guidance.
  const speechErrorMessage = (event: { error?: string } = {}) => {
    switch (event.error) {
      case 'not-allowed':
      case 'service-not-allowed':
      case 'permissions':
        return t('classLesson.speechErrors.permissionBlocked', 'Microphone or speech recognition permission is blocked. Open Settings, allow the mic for this app, then try again.');
      case 'no-speech':
        return t('classLesson.speechErrors.noSpeech', 'No speech was heard. Tap the mic and speak after the listening indicator.');
      case 'audio-capture':
        return t('classLesson.speechErrors.noMicrophone', 'No microphone detected. Plug in headphones with a mic or enable the device microphone.');
      case 'network':
        return t('classLesson.speechErrors.network', 'Network error during speech recognition. Check your connection and try again.');
      case 'aborted':
        return t('classLesson.speechErrors.cancelled', 'Speech input was cancelled.');
      default:
        return t('classLesson.speechErrors.captureFailed', 'Could not capture speech. Please try again.');
    }
  };

  // Accumulators reset on every startListening() so finals from a previous
  // session don't bleed into the next.
  const finalTranscriptRef = useRef('');
  const interimTranscriptRef = useRef('');

  const startListening = async () => {
    if (tutorLoading) return;
    try {
      const available = ExpoSpeechRecognitionModule.isRecognitionAvailable();
      if (!available) {
        setStatus(t('classLesson.status.voiceUnavailable', 'Voice input is unavailable on this device. You can type in the box below instead.'));
        return;
      }

      const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!permission.granted) {
        setStatus(speechErrorMessage({ error: 'permissions' }));
        return;
      }

      await speechService.cancel();
      finalTranscriptRef.current = '';
      interimTranscriptRef.current = '';
      listeningRef.current = true;
      // Live partial transcripts in the input box + tolerant of pauses so
      // beginners aren't cut off when they think mid-sentence.
      ExpoSpeechRecognitionModule.start({
        lang: speechInputMode === 'native'
          ? ttsLocaleFor(nativeLanguage || 'en', nativeLanguage || 'en')
          : ttsLocaleFor(targetLanguage || 'ko', targetLanguage || 'ko'),
        interimResults: true,
        maxAlternatives: 1,
        continuous: true,
      });
    } catch {
      listeningRef.current = false;
      setListening(false);
      setStatus(speechErrorMessage({ error: 'aborted' }));
    }
  };

  const stopListening = () => {
    listeningRef.current = false;
    ExpoSpeechRecognitionModule.stop();
    setListening(false);
  };

  useSpeechRecognitionEvent('start', () => {
    setListening(true);
    setStatus(t('classLesson.status.listeningPrompt', 'Listening... tap the mic again when you finish.'));
  });

  useSpeechRecognitionEvent('result', (event) => {
    const transcript = event.results?.[0]?.transcript || '';
    if (!transcript) return;
    if (event.isFinal) {
      finalTranscriptRef.current = (finalTranscriptRef.current + ' ' + transcript).trim();
      interimTranscriptRef.current = '';
    } else {
      interimTranscriptRef.current = transcript;
    }
    const preview = `${finalTranscriptRef.current} ${interimTranscriptRef.current}`.trim();
    if (preview) setInput(preview);
  });

  useSpeechRecognitionEvent('error', (event) => {
    listeningRef.current = false;
    setListening(false);
    setStatus(speechErrorMessage(event));
  });

  useSpeechRecognitionEvent('end', () => {
    setListening(false);
    listeningRef.current = false;
    const captured = (finalTranscriptRef.current || interimTranscriptRef.current).trim();
    if (captured) {
      // Hand the transcript to the user for review/edit before sending so
      // misrecognitions don't go straight to the tutor.
      setInput(captured);
      setStatus(t('classLesson.status.speechCaptured', 'Speech captured. Edit if needed, then press send.'));
    } else if (!tutorLoading) {
      setStatus((currentStatus) => (currentStatus.startsWith(t('classLesson.status.listeningPrefix', 'Listening')) ? t('classLesson.status.ready', 'Ready') : currentStatus));
    }
    finalTranscriptRef.current = '';
    interimTranscriptRef.current = '';
  });

  const renderTutorMessageBody = (message: TutorMessage) => {
    const parts = displayPartsForMessage(message, targetLanguage || 'ko', nativeLanguage || 'en');
    const hasDisplayParts = Array.isArray(message?.displayParts) && message.displayParts.length > 0;
    if (parts.length <= 1 && !hasDisplayParts) {
      return <Text style={message.error ? styles.errorText : styles.tutorText}>{message.content}</Text>;
    }
    const groups = groupDisplayParts(parts);

    return (
      <View style={styles.languageSegments}>
        {groups.map((group, groupIndex) => (
          <View
            key={`${group.kind}-${groupIndex}`}
            style={[styles.languageGroup, group.kind === 'example' && styles.exampleLanguageGroup]}
          >
            {!!group.title && <Text style={styles.languageGroupTitle}>{group.title}</Text>}
            {group.parts.map((part, index) => {
              const role = languageRole(part, targetLanguage || 'ko', nativeLanguage || 'en');
              const canSpeakPart = shouldSpeakTutorPart(part);
              return (
                <View key={`${part.language || 'part'}-${index}`} style={[styles.languageSegment, styles[`${role}LanguageSegment` as const]]}>
                  <View style={styles.languageSegmentTop}>
                    <Text style={styles.languageSegmentLabel}>
                      {part.speaker ? `${part.speaker} - ${languageLabel(part)}` : languageLabel(part)}
                    </Text>
                    {canSpeakPart && (
                      <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel={`Play ${part.speaker ? `${part.speaker} ` : ''}${languageLabel(part)} line`}
                        onPress={() => speakTutorPart(part)}
                        style={styles.segmentAudioButton}
                      >
                        <MaterialCommunityIcons
                          name="volume-high"
                          size={16}
                          color={colors.primary}
                          style={styles.segmentAudioIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text style={styles.tutorText}>{part.text}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    );
  };
  if (loading) {
    return (
      <View style={styles.screen}>
        <Text style={styles.subtitle}>{t('classLesson.loading', 'Loading class lesson...')}</Text>
      </View>
    );
  }

  if (error || !lesson) {
    return (
      <View style={styles.screen}>
        <Text style={styles.errorText}>{error || t('classLesson.notFound', 'Lesson not found.')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.lessonScroll} contentContainerStyle={styles.lessonContent}>
      <VoicePickerModal
        visible={showVoicePicker}
        targetLangCode={targetLanguage || 'ko'}
        targetLangName={targetName}
        ttsLocale={ttsLocaleFor(targetLanguage || 'ko', targetLanguage || 'ko')}
        onClose={() => setShowVoicePicker(false)}
        onPicked={() => {
          setShowVoicePicker(false);
          setStatus(t('classLesson.voiceUpdated', 'Voice updated. Tap a line to hear it.'));
        }}
      />
      <View style={[styles.lessonHeaderPanel, { borderColor: lessonAccent.border, borderTopColor: lessonAccent.accent, backgroundColor: lessonAccent.panel }]}>
        <Text style={[styles.kicker, { color: lessonAccent.strong }]}>{t('classLesson.kicker', 'Class')}</Text>
        <Text variant="headlineSmall" style={styles.title}>{lesson.title || t('classLesson.lessonFallback', 'Class lesson')}</Text>
        <Text style={styles.progressText}>{t('classLesson.percentComplete', { percent: progressPercent, defaultValue: '{{percent}}% complete' })}</Text>
        <Text style={styles.subtitle}>{status}</Text>
      </View>
      <View style={styles.lessonPlanCues} accessibilityLabel={t('classLesson.learningPlan.ariaLabel', 'Lesson learning plan')}>
        {lessonPlanCues.map((cue) => (
          <View key={cue.key} style={[styles.lessonPlanCue, { borderColor: lessonAccent.border, backgroundColor: lessonAccent.soft }]}>
            <Text style={[styles.lessonPlanCueLabel, { color: lessonAccent.strong }]}>{cue.label}</Text>
            <Text style={styles.lessonPlanCueValue} numberOfLines={2}>{cue.value}</Text>
          </View>
        ))}
      </View>

      {progressPercent >= 100 && (
        <View style={styles.certificatePanel}>
          <View style={styles.certificatePanelText}>
            <Text style={styles.kicker}>{t('certificates.kicker', 'Certificate')}</Text>
            <Text style={styles.certificateTitle}>
              {certificate ? t('certificates.issuedTitle', 'Certificate issued') : t('certificates.readyTitle', 'Completion certificate ready')}
            </Text>
            <Text style={styles.certificateBody}>
              {certificate
                ? t('certificates.mobileIssuedBody', { id: certificate.certificateId, defaultValue: 'Certificate ID: {{id}}' })
                : token
                  ? certificateStatus?.access?.requiresPayment
                    ? t('certificates.paymentRequiredBody', 'Completion certificates are available with a certificate purchase or plan upgrade.')
                    : t('certificates.readyBody', 'Issue your completion certificate for this class lesson.')
                  : t('certificates.signInBody', 'Sign in to save and receive your completion certificate.')}
            </Text>
          </View>
          {!certificate && !!token && !certificateStatus?.access?.requiresPayment && (
            <Button
              mode="contained"
              onPress={issueCertificate}
              disabled={certificateLoading || certificateIssuing}
              style={styles.certificateButton}
            >
              {certificateIssuing ? t('common.saving', 'Saving...') : t('certificates.issueCertificate', 'Issue certificate')}
            </Button>
          )}
        </View>
      )}

      {progressPercent >= 100 && (
        <View style={styles.wrapUpPanel}>
          <View style={styles.certificatePanelText}>
            <Text style={styles.kicker}>{t('classLesson.wrapUpKicker', 'Next step')}</Text>
            <Text style={styles.certificateTitle}>{t('classLesson.wrapUpTitle', 'Keep the lesson alive')}</Text>
            <Text style={styles.certificateBody}>
              {t('classLesson.wrapUpBody', 'Choose one focused practice that reinforces this class. The activity opens only when you choose it, so the class stays light and fast.')}
            </Text>
            <View style={styles.wrapUpStats}>
              <Text style={styles.wrapUpStat}>{t('classLesson.itemsCompleted', { count: completedItems.length, defaultValue: '{{count}} items completed' })}</Text>
              <Text style={styles.wrapUpStat}>{t('classLesson.lessonItemsTotal', { count: items.length, defaultValue: '{{count}} lesson items' })}</Text>
            </View>
          </View>
          <View style={styles.wrapUpActions}>
            <TouchableOpacity
              style={styles.wrapUpCard}
              onPress={() => navigation.navigate('Exercise', { screen: 'Review' })}
              activeOpacity={0.78}
            >
              <Text style={styles.wrapUpCardTitle}>{t('classLesson.wrapUpReview', 'Review')}</Text>
              <Text style={styles.wrapUpCardBody}>{t('classLesson.wrapUpReviewBody', 'Retry due or weak items from this class.')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrapUpCard}
              onPress={() => navigation.navigate('Exercise', { screen: 'Quiz', params: followUpParams() })}
              activeOpacity={0.78}
            >
              <Text style={styles.wrapUpCardTitle}>{t('learningHub.practiceQuiz', 'Self-test')}</Text>
              <Text style={styles.wrapUpCardBody}>{t('classLesson.wrapUpQuizBody', 'Check understanding without loading the quiz until you start.')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrapUpCard}
              onPress={() => navigation.navigate('Exercise', { screen: 'Writing', params: followUpParams() })}
              activeOpacity={0.78}
            >
              <Text style={styles.wrapUpCardTitle}>{t('classLesson.wrapUpWriting', 'Writing')}</Text>
              <Text style={styles.wrapUpCardBody}>{t('classLesson.wrapUpWritingBody', 'Use the level-appropriate write or type mode.')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrapUpCard}
              onPress={() => navigation.navigate('Conversation', {
                starter: t('classLesson.wrapUpConversationPrompt', 'Help me use what I just learned in a short conversation.'),
              })}
              activeOpacity={0.78}
            >
              <Text style={styles.wrapUpCardTitle}>{t('classLesson.wrapUpConversation', 'Conversation')}</Text>
              <Text style={styles.wrapUpCardBody}>{t('classLesson.wrapUpConversationBody', 'Turn the lesson into a short roleplay.')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ClassLessonSpeechControls
        styles={styles}
        t={t}
        speechEnabled={speechEnabled}
        speakNativeGloss={speakNativeGloss}
        speechInputMode={speechInputMode}
        listening={listening}
        tutorLoading={tutorLoading}
        nativeName={nativeName}
        targetName={targetName}
        onToggleSpeech={() => {
          if (speechEnabled) speechService.cancel().catch(() => {});
          setSpeechEnabled((enabled) => !enabled);
        }}
        onToggleNativeGloss={() => {
          setSpeakNativeGloss((value) => {
            const next = !value;
            AsyncStorage.setItem('classSpeakNativeGloss', String(next)).catch(() => {});
            return next;
          });
        }}
        onSelectSpeechInputMode={setSpeechInputMode}
        onToggleListening={listening ? stopListening : startListening}
      />

      <ClassLessonTutorThread
        styles={styles}
        t={t}
        tutorThreadRef={tutorThreadRef}
        messages={messages}
        listening={listening}
        tutorLoading={tutorLoading}
        renderMessageBody={renderTutorMessageBody}
        onReplayMessage={speakTutorMessage}
        canSaveMessageForReview={(message) => !!studyTextsForTutorMessage(message).targetText}
        onSaveMessageForReview={saveTutorMessageForReview}
        onRetryMessage={retryTutorMessage}
      />

      <ClassLessonTutorComposer
        styles={styles}
        t={t}
        progressSyncState={progressSyncState}
        input={input}
        listening={listening}
        tutorLoading={tutorLoading}
        onChangeInput={setInput}
        onToggleListening={listening ? stopListening : startListening}
        onSend={sendInput}
      />

      <TouchableOpacity
        style={styles.lessonGuideToggle}
        onPress={() => setLessonGuideOpen((open) => !open)}
        activeOpacity={0.8}
      >
        <View style={styles.lessonGuideSummary}>
          <Text style={styles.kicker}>{t('classLesson.lessonGuide', 'Lesson guide')}</Text>
          <Text style={styles.lessonGuideTitle} numberOfLines={1}>{displaySelectedActivity?.title}</Text>
          <Text style={styles.lessonGuideMeta}>
            {t('classLesson.activityXOfY', {
              current: selectedActivityIndex + 1,
              total: activityPlan.length,
              defaultValue: 'Activity {{current}} of {{total}}',
            })}
          </Text>
        </View>
        <MaterialCommunityIcons
          name={lessonGuideOpen ? 'chevron-up' : 'chevron-down'}
          size={22}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      {lessonGuideOpen && (
      <>
        <ClassLessonActivityStrip
          styles={styles}
          activities={displayActivityPlan}
          selectedActivityIndex={selectedActivityIndex}
          onSelectActivity={setSelectedActivityIndex}
        />

        <ClassLessonItemPicker
          styles={styles}
          t={t}
          groups={activityItemGroups}
          items={items}
          activityItemIndices={activityItemIndices}
          completedItems={completedItems}
          selectedIndex={selectedIndex}
          onSelectItem={setSelectedIndex}
        />

        <View style={styles.lessonCard}>
        <Text style={styles.kicker}>{displaySelectedActivity?.section || t('classLesson.section.practice', 'Practice')} {selectedActivityIndex + 1} / {activityPlan.length}</Text>
        <Text style={styles.activityTitle}>{displaySelectedActivity?.title}</Text>
        {displaySelectedActivity?.goals.map((goal) => (
          <Text key={goal} style={styles.activityGoal}>• {goal}</Text>
        ))}
        {!!displaySelectedActivity?.task && (
          <View style={styles.activityTaskBox}>
            <Text style={styles.tutorLabel}>{t('classLesson.learnerTask', 'Learner task')}</Text>
            <Text style={styles.tutorText}>{displaySelectedActivity.task}</Text>
          </View>
        )}
        {Array.isArray(lesson?.expressionPractice) && lesson.expressionPractice.length > 0 && (
          <View style={styles.expressionPracticeBox}>
            <Text style={styles.expressionPracticeLabel}>{t('classLesson.expressionPractice', 'Expression practice')}</Text>
            <View style={styles.expressionPracticeChips}>
              {lesson.expressionPractice.map((expression) => (
                <TouchableOpacity
                  key={expression.id}
                  style={[styles.expressionPracticeChip, tutorLoading && styles.expressionPracticeChipDisabled]}
                  onPress={() => practiceExpression(expression)}
                  disabled={tutorLoading}
                >
                  <Text style={styles.expressionPracticeChipText}>
                    {nativeScaffoldText(expression.label, nativeLanguage, t) || expression.id}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        <Text style={styles.kicker}>
          {t(`classLesson.section.${itemSectionKey(selectedItem?.type)}`, itemSectionKey(selectedItem?.type))} {selectedIndex + 1} / {items.length}
        </Text>
        {selectedItemReady ? (
          <>
            <Text style={styles.lessonTarget}>{itemTarget(selectedItem)}</Text>
            <PronunciationGuide
              item={selectedItem}
              targetText={itemTarget(selectedItem)}
              style={styles.lessonPronunciationGuide}
            />
            <Text style={styles.lessonNative}>
              {looksLikeRawEnglishForNative(itemNative(selectedItem), nativeLanguage)
                ? t('classLesson.translationPending', 'Translation is being prepared for your language.')
                : (itemNative(selectedItem) || (selectedItem?._translationPending ? t('classLesson.translationPending', 'Translation is being prepared for your language.') : ''))}
            </Text>
            {!!itemExampleTarget(selectedItem) && <Text style={styles.lessonExample}>{itemExampleTarget(selectedItem)}</Text>}
            {!!itemExampleNative(selectedItem) && !looksLikeRawEnglishForNative(itemExampleNative(selectedItem), nativeLanguage) && (
              <Text style={styles.lessonNative}>{itemExampleNative(selectedItem)}</Text>
            )}
            {!!itemExampleTarget(selectedItem) && (
              <Button mode="text" onPress={saveSelectedExampleForReview} compact style={styles.exampleSaveButton}>
                {t('classLesson.saveExample', 'Save example')}
              </Button>
            )}
          </>
        ) : (
          <Text style={styles.lessonNative}>{t('classLesson.loading', 'Loading class lesson...')}</Text>
        )}
        </View>

        <View style={styles.lessonActions}>
        <Button mode="contained" onPress={teachSelected} disabled={tutorLoading || !selectedItemReady}>{t('classLesson.teach', 'Teach')}</Button>
        <Button mode="outlined" onPress={practiceSelected} disabled={tutorLoading || !selectedItemReady}>{t('classLesson.practice', 'Practice')}</Button>
        <Button mode="outlined" onPress={saveSelectedForReview} disabled={!selectedItemReady}>
          {t('classLesson.saveForReview', 'Save for review')}
        </Button>
        <Button mode="outlined" onPress={bookmarkSelectedItem} disabled={!selectedItemReady}>
          {t('learningHub.bookmark', 'Bookmark')}
        </Button>
        <Button
          mode="outlined"
          onPress={markComplete}
          disabled={completedItems.includes(selectedIndex) || !selectedItemReady || itemWindowLoading}
        >
          {completedItems.includes(selectedIndex) ? t('classLesson.completed', 'Completed') : t('classLesson.markComplete', 'Mark complete')}
        </Button>
        <Button
          mode="outlined"
          onPress={() => {
            // Step to the next item within the current activity, not the next
            // global index. If we're already on the last activity item, do nothing.
            const position = activityItemIndices.indexOf(selectedIndex);
            const nextGlobal = position >= 0 && position < activityItemIndices.length - 1
              ? activityItemIndices[position + 1]
              : selectedIndex;
            if (nextGlobal !== selectedIndex) setSelectedIndex(nextGlobal);
          }}
          disabled={
            activityItemIndices.length === 0
            || activityItemIndices[activityItemIndices.length - 1] === selectedIndex
          }
        >
          {t('classLesson.next', 'Next')}
        </Button>
        </View>
        <View style={styles.practiceEverywhere}>
        <Text style={styles.practiceEverywhereLabel}>{t('classLesson.practiceEverywhere', 'Practice this everywhere')}</Text>
        <View style={styles.practiceEverywhereButtons}>
          <Button mode="outlined" compact onPress={listenToSelectedItem} disabled={!selectedItemReady}>{t('learningHub.listen', 'Listen')}</Button>
          <Button mode="outlined" compact onPress={() => openSelectedPracticeSurface('conversation')} disabled={!selectedItemReady}>{t('conversation.practiceLabel', 'Conversation practice')}</Button>
          <Button mode="outlined" compact onPress={() => openSelectedPracticeSurface('writing')} disabled={!selectedItemReady}>{t('learningHub.practiceWriting', 'Write')}</Button>
          <Button mode="outlined" compact onPress={() => openSelectedPracticeSurface('flashcard')} disabled={!selectedItemReady}>{t('learningHub.practiceFlashcard', 'Flashcard')}</Button>
          <Button mode="outlined" compact onPress={selfTestSelectedItem} disabled={!selectedItemReady}>{t('learningHub.practiceQuiz', 'Self-test')}</Button>
        </View>
        </View>
      </>
      )}

    </ScrollView>
  );
};

const ClassStackScreen: React.FC = () => (
  <ClassStack.Navigator screenOptions={{ headerShown: false }}>
    <ClassStack.Screen name="ClassHome" component={ClassHomeScreen} />
    <ClassStack.Screen name="ClassLesson" component={ClassLessonScreen} />
    <ClassStack.Screen name="LevelTests" component={LevelTestScreen} />
  </ClassStack.Navigator>
);

const ExerciseHomeScreen: React.FC<any> = ({ navigation }) => {
  const colors = useAppColors();
  const styles = createLocalStyles(colors);
  const { t } = useTranslation();

  return (
    <View style={styles.screen}>
      <View style={styles.panel}>
        <Text style={styles.kicker}>{t('exercise.kicker', 'Exercise')}</Text>
        <Text variant="headlineSmall" style={styles.title}>{t('exercise.title', 'Choose an exercise')}</Text>
        <Text style={styles.subtitle}>{t('exercise.subtitleMobile', 'Practice with quizzes, flashcards, or handwriting drills.')}</Text>

        <TouchableOpacity
          style={styles.exerciseCard}
          activeOpacity={0.75}
          onPress={() => navigation.navigate('Quiz')}
        >
          <MaterialCommunityIcons name="clipboard-text-outline" color={colors.primary} size={28} />
          <View style={styles.exerciseText}>
            <Text style={styles.exerciseTitle}>{t('exercise.quizTitle', 'Quiz')}</Text>
            <Text style={styles.exerciseDesc}>{t('exercise.quizDescMobile', 'Work through lesson questions.')}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" color={colors.textMuted} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exerciseCard}
          activeOpacity={0.75}
          onPress={() => navigation.navigate('Flashcards')}
        >
          <MaterialCommunityIcons name="cards-outline" color={colors.primary} size={28} />
          <View style={styles.exerciseText}>
            <Text style={styles.exerciseTitle}>{t('exercise.flashcardsTitle', 'Flashcards')}</Text>
            <Text style={styles.exerciseDesc}>{t('exercise.flashcardsDescMobile', 'Review words and phrases.')}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" color={colors.textMuted} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exerciseCard}
          activeOpacity={0.75}
          onPress={() => navigation.navigate('Writing')}
        >
          <MaterialCommunityIcons name="pencil-outline" color={colors.primary} size={28} />
          <View style={styles.exerciseText}>
            <Text style={styles.exerciseTitle}>{t('exercise.writingTitle', 'Writing')}</Text>
            <Text style={styles.exerciseDesc}>{t('exercise.writingDescMobile', 'Trace, copy, listen, and keep a writing notebook.')}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" color={colors.textMuted} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exerciseCard}
          activeOpacity={0.75}
          onPress={() => navigation.navigate('Review')}
        >
          <MaterialCommunityIcons name="history" color={colors.primary} size={28} />
          <View style={styles.exerciseText}>
            <Text style={styles.exerciseTitle}>{t('navbar.review', 'Review')}</Text>
            <Text style={styles.exerciseDesc}>{t('exercise.reviewDescMobile', 'Return to saved items and what is due today.')}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" color={colors.textMuted} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ExerciseStackScreen: React.FC = () => (
  <ExerciseStack.Navigator screenOptions={{ headerShown: false }}>
    <ExerciseStack.Screen name="ExerciseHome" component={ExerciseHomeScreen} />
    <ExerciseStack.Screen name="Quiz" component={QuizStackScreen} />
    <ExerciseStack.Screen name="Flashcards" component={FlashcardsScreen} />
    <ExerciseStack.Screen name="Writing" component={WritingPracticeScreen} />
    <ExerciseStack.Screen name="Review" component={ReviewScreen} />
  </ExerciseStack.Navigator>
);

const ProfileStackScreen: React.FC = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
    <ProfileStack.Screen name="Billing" component={BillingScreen} />
    <ProfileStack.Screen name="Institution" component={InstitutionDashboardScreen} />
    <ProfileStack.Screen name="LearningPersonalization" component={ContextPracticeScreen} />
    <ProfileStack.Screen name="Admin" component={AdminScreen} />
    <ProfileStack.Screen name="Contact" component={ContactScreen} />
  </ProfileStack.Navigator>
);

// Dummy screen - never actually rendered; the tab listener intercepts first.
const EmptyScreen: React.FC = () => null;

const MainTabs: React.FC = () => {
  const { t } = useTranslation();
  const colors = useAppColors();
  const { isGuest, logout } = useAuthStore();
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  const isCompact = winHeight < 450 || winWidth < 380;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          height: isCompact ? 44 : 64,
          paddingBottom: isCompact ? 4 : 10,
          paddingTop: isCompact ? 4 : 6,
          ...shadows.up,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarShowLabel: !isCompact,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: t('navbar.home', 'Home'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Class"
        component={ClassStackScreen}
        options={{
          tabBarLabel: t('navbar.class', 'Class'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="school-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Exercise"
        component={ExerciseStackScreen}
        options={{
          tabBarLabel: t('navbar.exercise', 'Exercise'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-text-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
          name="Conversation"
          component={ConversationScreen}
          options={{
          tabBarLabel: t('navbar.conversation', 'Conversation'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-text" color={color} size={size} />
          ),
        }}
      />
      {!isGuest && (
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: t('navbar.profile', 'Profile'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      )}
      {isGuest && (
        <Tab.Screen
          name="Login"
          component={EmptyScreen}
          options={{
            tabBarLabel: t('navbar.login', 'Login'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="login" color={color} size={size} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              Alert.alert(
                t('guest.loginTitle', 'Sign In'),
                t('guest.loginMessage', 'Create an account or sign in to save your progress and unlock all features.'),
                [
                  { text: t('guest.maybeLater', 'Maybe Later'), style: 'cancel' },
                  { text: t('guest.signIn', 'Sign In'), onPress: () => logout() },
                ],
              );
            },
          }}
        />
      )}
    </Tab.Navigator>
  );
};

const createLocalStyles = (colors: AppColors) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 18,
    justifyContent: 'center',
  },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 22,
    gap: 12,
    ...shadows.md,
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textPrimary,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  classLevelTestButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  comingSoonBox: {
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  comingSoonTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  comingSoonText: {
    color: colors.textSecondary,
    lineHeight: 20,
    textAlign: 'center',
  },
  speechRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  speechButton: {
    borderRadius: 8,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  exerciseText: {
    flex: 1,
    minWidth: 0,
  },
  exerciseTitle: {
    color: colors.textPrimary,
    fontWeight: '800',
    fontSize: 16,
  },
  exerciseDesc: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  classTrackSection: {
    marginTop: 18,
    gap: 10,
  },
  classProgramLevelSection: {
    marginTop: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.primary + '35',
    borderRadius: 8,
    backgroundColor: colors.primary + '08',
    gap: 12,
  },
  classProgramLevelHeader: {
    gap: 6,
  },
  classProgramLevelTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '900',
  },
  classProgramLevelSubtitle: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  classProgramLevelChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  classTrackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  classTrackTitle: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '900',
  },
  classTrackCount: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '800',
  },
  classTrackLessonList: {
    gap: 10,
  },
  classTrackLessonListWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  classLessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  classLessonCardSingleWide: {
    flex: 0,
    width: 360,
  },
  classTrackGuidance: {
    flex: 1,
    minHeight: 132,
    gap: 8,
    padding: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  classTrackGuidanceKicker: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  classTrackGuidanceTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '900',
  },
  classTrackGuidanceBody: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  classTrackGuidanceSteps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  classPlanBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  classPlanBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.primary + '12',
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '900',
  },
  errorText: {
    color: colors.error,
    lineHeight: 20,
  },
  errorBlock: {
    marginTop: 16,
    gap: 12,
    alignItems: 'flex-start',
  },
  errorRetry: {
    alignSelf: 'flex-start',
  },
  lessonScroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  lessonContent: {
    padding: 18,
    gap: 14,
  },
  lessonHeaderPanel: {
    gap: 5,
    padding: 14,
    borderWidth: 1,
    borderTopWidth: 5,
    borderRadius: 8,
  },
  lessonGuideToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  lessonGuideSummary: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  lessonGuideTitle: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  lessonGuideMeta: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  activityStrip: {
    gap: 8,
    paddingRight: 18,
  },
  activityChip: {
    width: 190,
    gap: 3,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  activityChipActive: {
    borderColor: colors.primary,
    backgroundColor: '#fff3ed',
  },
  activityChipSection: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  activityChipSectionActive: {
    color: colors.primary,
  },
  activityChipText: {
    color: colors.textPrimary,
    fontWeight: '800',
  },
  activityChipTextActive: {
    color: colors.textPrimary,
  },
  itemPickerGroups: {
    flexDirection: 'column',
    gap: 12,
  },
  itemPickerGroup: {
    flexDirection: 'column',
    gap: 6,
  },
  itemPickerGroupLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  itemPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  itemChip: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  itemChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  itemChipDone: {
    borderColor: colors.accentGreen,
    backgroundColor: 'rgba(88, 204, 2, 0.12)',
  },
  itemChipText: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  itemChipTextActive: {
    color: '#fff',
  },
  progressText: {
    color: colors.accentGreen,
    fontSize: 13,
    fontWeight: '900',
  },
  lessonPlanCues: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  lessonPlanCue: {
    flexGrow: 1,
    flexBasis: '30%',
    minWidth: 140,
    gap: 3,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  lessonPlanCueLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  lessonPlanCueValue: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 16,
  },
  certificatePanel: {
    gap: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(88, 204, 2, 0.35)',
    borderRadius: 8,
    backgroundColor: 'rgba(88, 204, 2, 0.08)',
  },
  certificatePanelText: {
    gap: 4,
  },
  certificateTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '900',
  },
  certificateBody: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  certificateButton: {
    borderRadius: 8,
  },
  wrapUpPanel: {
    gap: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(28, 176, 246, 0.28)',
    borderRadius: 8,
    backgroundColor: 'rgba(28, 176, 246, 0.08)',
  },
  wrapUpStats: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  wrapUpStat: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.surface,
    color: colors.textSecondary,
    fontWeight: '700',
    overflow: 'hidden',
  },
  wrapUpActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wrapUpCard: {
    flexGrow: 1,
    flexBasis: '48%',
    minWidth: 150,
    gap: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  wrapUpCardTitle: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  wrapUpCardBody: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  lessonCard: {
    gap: 8,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
    ...shadows.md,
  },
  activityTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
  },
  activityGoal: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  activityTaskBox: {
    gap: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: '#9bdcff',
    borderRadius: 8,
    backgroundColor: '#e8f6ff',
    marginBottom: 8,
  },
  expressionPracticeBox: {
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.primary + '66',
    borderRadius: 8,
    backgroundColor: colors.primary + '12',
    marginBottom: 8,
  },
  expressionPracticeLabel: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  expressionPracticeChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  expressionPracticeChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary + '88',
    backgroundColor: colors.surface,
  },
  expressionPracticeChipDisabled: {
    opacity: 0.55,
  },
  expressionPracticeChipText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
  },
  lessonTarget: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 32,
  },
  lessonRomanization: {
    color: colors.primary,
    fontWeight: '800',
  },
  lessonPronunciationGuide: {
    alignItems: 'flex-start',
    marginTop: 4,
  },
  lessonNative: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  lessonExample: {
    color: colors.textPrimary,
    lineHeight: 22,
    marginTop: 8,
  },
  exampleSaveButton: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  lessonActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  practiceEverywhere: {
    gap: 8,
  },
  practiceEverywhereLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '900',
  },
  practiceEverywhereButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tutorPanel: {
    height: 380,
    borderWidth: 1,
    borderColor: '#dce8f3',
    borderRadius: 14,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    ...shadows.md,
  },
  tutorPanelHeader: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e6edf5',
    backgroundColor: '#fbfdff',
  },
  tutorPanelKicker: {
    color: colors.accentBlue,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  tutorPanelTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 1,
  },
  tutorStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.textMuted,
    opacity: 0.45,
  },
  tutorStatusDotActive: {
    backgroundColor: colors.accentGreen,
    opacity: 1,
  },
  tutorThread: {
    flex: 1,
    backgroundColor: '#f8fbff',
  },
  tutorThreadContent: {
    gap: 10,
    padding: 12,
    paddingBottom: 18,
  },
  tutorBubble: {
    maxWidth: '92%',
    padding: 13,
    borderRadius: 16,
  },
  tutorBubbleAssistant: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff8ef',
    borderWidth: 1,
    borderColor: '#eadfce',
    borderTopLeftRadius: 5,
  },
  tutorBubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#e9f7ff',
    borderWidth: 1,
    borderColor: 'rgba(28, 176, 246, 0.28)',
    borderTopRightRadius: 5,
  },
  tutorLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  tutorText: {
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 22,
  },
  languageSegments: { gap: 8 },
  languageGroup: {
    gap: 8,
  },
  exampleLanguageGroup: {
    gap: 8,
    marginTop: 4,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(28, 176, 246, 0.18)',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  languageGroupTitle: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  languageSegment: {
    borderWidth: 1,
    borderLeftWidth: 4,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 9,
    backgroundColor: colors.surface,
  },
  languageSegmentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 4,
  },
  targetLanguageSegment: {
    borderLeftColor: '#1cb0f6',
    backgroundColor: 'rgba(28, 176, 246, 0.08)',
  },
  nativeLanguageSegment: {
    borderLeftColor: '#58cc02',
    backgroundColor: 'rgba(88, 204, 2, 0.08)',
  },
  romanizationLanguageSegment: {
    borderLeftColor: '#9ca3af',
    backgroundColor: 'rgba(156, 163, 175, 0.12)',
  },
  metaLanguageSegment: {
    borderLeftColor: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  otherLanguageSegment: {
    borderLeftColor: colors.textMuted,
  },
  languageSegmentLabel: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  segmentAudioButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.primary + '55',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  segmentAudioIcon: {
    width: 16,
    height: 16,
    lineHeight: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  replayButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  tutorMessageActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  replayLabel: {
    fontSize: 11,
    marginHorizontal: 0,
  },
  mobileTutorInput: {
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  syncNote: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  classTutorInput: {
    minHeight: 54,
    maxHeight: 110,
    backgroundColor: colors.surface,
  },
  sendRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sendButton: {
    flex: 1,
    borderRadius: 8,
  },
});

export default MainTabs;
