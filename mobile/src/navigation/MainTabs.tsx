import React, { useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useAuthStore } from '../stores/authStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppColors, shadows, type AppColors } from '../config/theme';
import { aiService, classLessonService } from '../services/api';
import speechService from '../services/speechService';
import { useSettingsStore } from '../stores/settingsStore';
import LANGUAGES from '../config/languages';
import PronunciationGuide from '../components/PronunciationGuide';
import { displayPartsForMessage, languageLabel, languageRole, speechChunksForPart, spokenPartsForMessage } from '../utils/languageSegments';
import { contrastingVoiceForLocale, roleVoiceForLocale, tutorVoiceForLocale } from '../utils/roleVoices';
import VoicePickerModal from '../components/VoicePickerModal';

import HomeScreen from '../screens/home/HomeScreen';
import QuizListScreen from '../screens/quiz/QuizListScreen';
import QuizDetailScreen from '../screens/quiz/QuizDetailScreen';
import FlashcardsScreen from '../screens/flashcards/FlashcardsScreen';
import WritingPracticeScreen from '../screens/writing/WritingPracticeScreen';
import ConversationScreen from '../screens/ai/ConversationScreen';
import ContextPracticeScreen from '../screens/context/ContextPracticeScreen';
import ProgressScreen from '../screens/progress/ProgressScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AdminScreen from '../screens/admin/AdminScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ClassStack = createNativeStackNavigator();
const ExerciseStack = createNativeStackNavigator();
const QuizStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const FORMATTING_FALLBACK_REPLY = 'I had trouble formatting that reply. Please try again naturally.';
const CLASS_SETUP_TEXT: Record<string, string> = {
  en: 'I am ready to teach this class lesson. Choose Teach, Practice, or ask your own question.',
  ko: '이 수업을 안내할 준비가 됐어요. Teach나 Practice를 선택하거나 질문을 입력해 주세요.',
  es: 'Estoy listo para guiar esta clase. Elige Teach, Practice o escribe tu pregunta.',
  fr: 'Je suis prêt à guider cette leçon. Choisis Teach, Practice ou écris ta question.',
  de: 'Ich bin bereit, diese Lektion zu begleiten. Wähle Teach, Practice oder stelle deine Frage.',
  zh: '我已经准备好带你学习这一课。请选择 Teach、Practice，或输入你的问题。',
  ja: 'このレッスンを案内できます。Teach、Practiceを選ぶか、質問を入力してください。',
  hi: 'मैं यह पाठ सिखाने के लिए तैयार हूँ। Teach, Practice चुनें या अपना प्रश्न लिखें।',
  ar: 'أنا جاهز لإرشادك في هذا الدرس. اختر Teach أو Practice أو اكتب سؤالك.',
  he: 'אני מוכן להדריך אותך בשיעור הזה. בחר Teach, Practice או כתוב שאלה.',
  pt: 'Estou pronto para orientar esta aula. Escolha Teach, Practice ou digite sua pergunta.',
  it: 'Sono pronto a guidare questa lezione. Scegli Teach, Practice o scrivi una domanda.',
  nl: 'Ik ben klaar om deze les te begeleiden. Kies Teach, Practice of typ je vraag.',
  ru: 'Я готов провести этот урок. Выберите Teach, Practice или введите вопрос.',
  id: 'Saya siap memandu pelajaran ini. Pilih Teach, Practice, atau ketik pertanyaan Anda.',
  ms: 'Saya bersedia membimbing pelajaran ini. Pilih Teach, Practice, atau taip soalan anda.',
  fil: 'Handa na akong gabayan ang araling ito. Piliin ang Teach, Practice, o i-type ang tanong mo.',
  tr: 'Bu dersi anlatmaya hazırım. Teach, Practice seçin veya sorunuzu yazın.',
  bn: 'আমি এই পাঠ শেখাতে প্রস্তুত। Teach, Practice বেছে নিন, অথবা আপনার প্রশ্ন লিখুন।',
  ta: 'இந்த பாடத்தை வழிநடத்த நான் தயாராக இருக்கிறேன். Teach, Practice தேர்வு செய்யுங்கள், அல்லது உங்கள் கேள்வியை எழுதுங்கள்.',
};
const classSetupText = (language?: string) => CLASS_SETUP_TEXT[String(language || '').toLowerCase()] || CLASS_SETUP_TEXT.en;
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
  activities?: ClassActivity[];
  expressionPractice?: ClassExpressionPractice[];
  relatedPools?: string[];
  content?: ClassLessonItem[];
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

// Generic 4-step shell for lessons that ship without their own activity list.
// Textbook units are expected to provide `activities[]` on the document so each
// unit (1-9 and beyond) defines its own plan there, not in the mobile bundle.
const GENERIC_ACTIVITY_PLAN: ClassActivity[] = [
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
  </HomeStack.Navigator>
);

const firstText = (...values: Array<string | undefined>) =>
  values.find((value) => String(value || '').trim()) || '';

const itemTarget = (item?: ClassLessonItem) => firstText(item?.targetText, item?.korean);
const itemNative = (item?: ClassLessonItem) => firstText(item?.nativeText, item?.english);
const itemExampleTarget = (item?: ClassLessonItem) => firstText(item?.exampleTarget, item?.example);
const itemExampleNative = (item?: ClassLessonItem) => firstText(item?.exampleNative, item?.exampleEnglish);

const isFormattingFallbackMessage = (message: TutorMessage) => (
  message.role === 'assistant' && String(message.content || '').trim() === FORMATTING_FALLBACK_REPLY
);

function lessonActionFallback(
  item: ClassLessonItem | undefined,
  activity: ClassActivity | undefined,
  targetLanguage = 'ko',
  nativeLanguage = 'en',
) {
  const pairHasEnglish = targetLanguage.toLowerCase() === 'en' || nativeLanguage.toLowerCase() === 'en';
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

const ttsLocaleFor = (languageCode?: string, fallbackCode?: string) => (
  (languageCode && LANGUAGES[languageCode]?.ttsLocale)
  || (fallbackCode && LANGUAGES[fallbackCode]?.ttsLocale)
  || 'en-US'
);

const activityPlanForLesson = (lesson: ClassLesson | null): ClassActivity[] => {
  // Prefer the activities list shipped on the Lesson document. This matches
  // the web ClassLessonPage and the AI brief, so all three stay in sync per unit.
  if (Array.isArray(lesson?.activities) && lesson.activities.length > 0) {
    return lesson.activities;
  }
  return GENERIC_ACTIVITY_PLAN;
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

const normalizeTutorMessages = (turns: unknown, nativeLanguage = 'en'): TutorMessage[] => {
  if (!Array.isArray(turns)) {
    return [tutorSetupMessage(classSetupText(nativeLanguage), nativeLanguage)];
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
    : [tutorSetupMessage(classSetupText(nativeLanguage), nativeLanguage)];
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

function exampleCueFor(_language?: string, group?: { parts?: any[] }) {
  const speakers = new Set((group?.parts || []).map((part: any) => part.speaker).filter(Boolean));
  const isDialogue = speakers.size >= 2;
  const topic = exampleTopicFromGroup(group);
  if (isDialogue) {
    return topic
      ? `Example conversation about ${topic}. Listen to Person A and Person B.`
      : 'Example conversation. Listen to Person A and Person B.';
  }
  return topic ? `Example: ${topic}.` : 'Example.';
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
  const [classLessons, setClassLessons] = useState<ClassLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadClassLessons() {
      try {
        const response = await classLessonService.getClassLessons();
        if (cancelled) return;
        const list = (Array.isArray(response.data) ? [...response.data] : []) as ClassLesson[];
        const trackOrder: Record<string, number> = { foundation: 1, thematic: 2, adult: 3, grammar: 4 };
        list.sort((a, b) => {
          const ac: any = (a as any).course || {};
          const bc: any = (b as any).course || {};
          const aLevel = Number(ac.level || 99);
          const bLevel = Number(bc.level || 99);
          if (aLevel !== bLevel) return aLevel - bLevel;
          const aTrack = trackOrder[ac.track] || 99;
          const bTrack = trackOrder[bc.track] || 99;
          if (aTrack !== bTrack) return aTrack - bTrack;
          const aPosition = Number(ac.position || 999);
          const bPosition = Number(bc.position || 999);
          if (aPosition !== bPosition) return aPosition - bPosition;
          return (a.title || '').localeCompare(b.title || '', 'ko');
        });
        setClassLessons(list);
      } catch {
        if (!cancelled) setError('Could not load class lessons.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadClassLessons();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.panel}>
        <Text style={styles.kicker}>Class</Text>
        <Text variant="headlineSmall" style={styles.title}>Learn with your tutor</Text>
        <Text style={styles.subtitle}>Pick a unit and practice it in conversation.</Text>

        {loading && <Text style={styles.subtitle}>Loading lessons...</Text>}
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {!loading && !error && classLessons.length === 0 && (
          <View style={styles.comingSoonBox}>
            <Text style={styles.comingSoonTitle}>Coming soon</Text>
            <Text style={styles.comingSoonText}>Class lessons are being prepared for this language. Please check back soon.</Text>
          </View>
        )}

        {classLessons.map((lesson) => {
          const items = Array.isArray(lesson.content) ? lesson.content : [];
          const vocab = items.filter((item) => item.type === 'word').length;
          const sentences = items.filter((item) => item.type === 'sentence').length;
          const conversations = items.filter((item) => item.type === 'conversation').length;

          return (
            <TouchableOpacity
              key={lesson._id}
              style={styles.classLessonCard}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('ClassLesson', { classLessonId: lesson._id })}
            >
              <View style={styles.exerciseText}>
                <Text style={styles.exerciseTitle}>{lesson.title || 'Untitled lesson'}</Text>
                <Text style={styles.exerciseDesc}>
                  {vocab} vocabulary / {sentences} examples / {conversations} dialogues
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" color={colors.textMuted} size={24} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const ClassLessonScreen: React.FC<any> = ({ route }) => {
  const colors = useAppColors();
  const styles = createLocalStyles(colors);
  const { nativeLanguage, targetLanguage } = useSettingsStore();
  const classLessonId = String(route.params?.classLessonId || route.params?.lessonId || '');
  const listeningRef = useRef(false);
  const tutorThreadRef = useRef<ScrollView>(null);
  const [lesson, setLesson] = useState<ClassLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<TutorMessage[]>([
    tutorSetupMessage(
      classSetupText(nativeLanguage || 'en'),
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
  const [status, setStatus] = useState('Ready');
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [progressSyncState, setProgressSyncState] = useState<'local' | 'synced'>('local');
  const [showVoicePicker, setShowVoicePicker] = useState(false);
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
        const response = await classLessonService.getClassLesson(classLessonId);
        if (cancelled) return;
        setLesson(response.data);

        const applyProgress = (record: any) => {
          if (!record || typeof record !== 'object') return;
          setSelectedIndex(Number.isInteger(record.selectedIndex) ? record.selectedIndex : 0);
          setSelectedActivityIndex(Number.isInteger(record.selectedActivityIndex) ? record.selectedActivityIndex : 0);
          setCompletedItems(normalizeCompletedItems(record.completedItems || record.completed));
          setSummary(String(record.summary || ''));
          setMemory(record.memory && typeof record.memory === 'object' ? record.memory : {});
          setMessages(normalizeTutorMessages(record.tutorTurns, nativeLanguage || 'en'));
        };

        try {
          const raw = await AsyncStorage.getItem(classProgressKey(classLessonId, nativeLanguage, targetLanguage));
          if (raw && !cancelled) applyProgress(JSON.parse(raw));
        } catch {}

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
  }, [classLessonId, completedItems, lesson, memory, messages, nativeLanguage, progressLoaded, selectedActivityIndex, selectedIndex, summary, targetLanguage]);

  const items = lesson?.content || [];
  const selectedItem = items[selectedIndex];
  const activityPlan = useMemo(() => activityPlanForLesson(lesson), [lesson]);
  const selectedActivity = activityPlan[selectedActivityIndex] || activityPlan[0];
  // Indices of items that belong to the currently selected activity. The strip
  // renders these instead of all items, mirroring the web ClassLessonPage.
  const activityItemIndices = useMemo(
    () => itemIndicesForActivity(items, selectedActivity?.id),
    [items, selectedActivity?.id],
  );
  const progressPercent = items.length ? Math.round((completedItems.length / items.length) * 100) : 0;

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
            ? [{ language: nativeLanguage || 'en', text: exampleCueFor(nativeLanguage || 'en', group), speaker: '' }]
            : []),
          ...group.parts
            .filter((part: any) => shouldSpeakTutorPart(part, { speakNativeGloss }))
            .flatMap(part => speechChunksForPart(
              { ...part, language: part.language || language },
              targetLanguage || 'ko',
              nativeLanguage || 'en',
              language,
            )),
        ])
        : spokenPartsForMessage(message, targetLanguage || 'ko', nativeLanguage || 'en');
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
      setStatus('Audio playback was interrupted.');
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
      const chunks = speechChunksForPart(part, targetLanguage || 'ko', nativeLanguage || 'en', part?.language);
      for (const chunk of chunks) {
        if (!chunk.text) continue;
        const lang = ttsLocaleFor(chunk.language || part?.language || targetLanguage || 'ko', targetLanguage || 'ko');
        await speechService.speakAsync(chunk.text, {
          lang,
          voice: resolveVoice(lang, chunk.speaker || part?.speaker),
          rate: options.rate || '-10%',
        });
      }
      setStatus('Playing selected line.');
    } catch {
      setStatus('Audio playback was interrupted.');
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
    setStatus('Tutor is preparing your next step...');
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
        ? lessonActionFallback(selectedItem, selectedActivity, targetLanguage || 'ko', nativeLanguage || 'en')
        : rawReply || 'Let us continue.';
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

      setStatus('Tutor replied.');
      if (speechEnabled) await speakTutorMessage(assistantMessage);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev.filter(message => !message.error),
        tutorMessage('assistant', err?.response?.data?.message || 'The tutor could not reply this time. Please try again.', true, {
          language: nativeLanguage || 'en',
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

  const teachSelected = () => sendTutorTurn(
    `Teach ${selectedActivity?.section || 'activity'}: item ${selectedIndex + 1}`,
    buildClassAction('teach_selected_item', lesson, selectedItem, selectedIndex, selectedActivity),
  );

  const practiceSelected = () => sendTutorTurn(
    `Practice ${selectedActivity?.section || 'activity'}: item ${selectedIndex + 1}`,
    buildClassAction('practice_selected_item', lesson, selectedItem, selectedIndex, selectedActivity),
  );

  // Drill a specific Expression Practice goal (workbook 표현 연습 column).
  const practiceExpression = (expressionPractice: ClassExpressionPractice) => {
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
    setCompletedItems((current) => (
      current.includes(selectedIndex) ? current : [...current, selectedIndex]
    ));
    const position = activityItemIndices.indexOf(selectedIndex);
    const nextGlobal = position >= 0 && position < activityItemIndices.length - 1
      ? activityItemIndices[position + 1]
      : selectedIndex;
    if (nextGlobal !== selectedIndex) {
      setSelectedIndex(nextGlobal);
      setStatus('Saved as complete. Moving to the next item.');
    } else {
      setStatus('Saved as complete.');
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
        return 'Microphone or speech recognition permission is blocked. Open Settings, allow the mic for this app, then try again.';
      case 'no-speech':
        return 'No speech was heard. Tap the mic and speak after the "Listening…" indicator.';
      case 'audio-capture':
        return 'No microphone detected. Plug in headphones with a mic or enable the device microphone.';
      case 'network':
        return 'Network error during speech recognition. Check your connection and try again.';
      case 'aborted':
        return 'Speech input was cancelled.';
      default:
        return 'Could not capture speech. Please try again.';
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
        setStatus('Voice input is unavailable on this device. You can type in the box below instead.');
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
    setStatus('Listening… tap the mic again when you finish.');
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
      setStatus('Speech captured. Edit if needed, then press send.');
    } else if (!tutorLoading) {
      setStatus((currentStatus) => (currentStatus.startsWith('Listening') ? 'Ready' : currentStatus));
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
        <Text style={styles.subtitle}>Loading class lesson...</Text>
      </View>
    );
  }

  if (error || !lesson) {
    return (
      <View style={styles.screen}>
        <Text style={styles.errorText}>{error || 'Lesson not found.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.lessonScroll} contentContainerStyle={styles.lessonContent}>
      <VoicePickerModal
        visible={showVoicePicker}
        targetLangCode={targetLanguage || 'ko'}
        targetLangName={targetLanguage || 'target'}
        ttsLocale={ttsLocaleFor(targetLanguage || 'ko', targetLanguage || 'ko')}
        onClose={() => setShowVoicePicker(false)}
        onPicked={() => {
          setShowVoicePicker(false);
          setStatus('Voice updated. Tap a line to hear it.');
        }}
      />
      <Text style={styles.kicker}>Class</Text>
      <Text variant="headlineSmall" style={styles.title}>{lesson.title || 'Class lesson'}</Text>
      <Text style={styles.progressText}>{progressPercent}% complete</Text>
      <Text style={styles.subtitle}>{status}</Text>

      <View style={styles.speechRow}>
        <Button
          mode={speechEnabled ? 'contained-tonal' : 'outlined'}
          icon={speechEnabled ? 'volume-high' : 'volume-off'}
          onPress={() => {
            if (speechEnabled) speechService.cancel().catch(() => {});
            setSpeechEnabled((enabled) => !enabled);
          }}
          style={styles.speechButton}
        >
          {speechEnabled ? 'Spoken replies on' : 'Spoken replies off'}
        </Button>
        <Button
          mode={speakNativeGloss ? 'contained-tonal' : 'outlined'}
          onPress={() => {
            setSpeakNativeGloss((value) => {
              const next = !value;
              AsyncStorage.setItem('classSpeakNativeGloss', String(next)).catch(() => {});
              return next;
            });
          }}
          style={styles.speechButton}
        >
          {speakNativeGloss ? `Speak ${nativeLanguage || 'native'}` : `${nativeLanguage || 'Native'} silent`}
        </Button>
        <Button
          mode={speechInputMode === 'target' ? 'contained-tonal' : 'outlined'}
          onPress={() => setSpeechInputMode('target')}
          style={styles.speechButton}
        >
          Target mic
        </Button>
        <Button
          mode={speechInputMode === 'native' ? 'contained-tonal' : 'outlined'}
          onPress={() => setSpeechInputMode('native')}
          style={styles.speechButton}
        >
          Native mic
        </Button>
        <Button
          mode={listening ? 'contained' : 'outlined'}
          icon={listening ? 'microphone-off' : 'microphone'}
          onPress={listening ? stopListening : startListening}
          disabled={tutorLoading}
          style={styles.speechButton}
        >
          {listening ? 'Stop mic' : 'Speak'}
        </Button>
      </View>

      <View style={styles.tutorPanel}>
        <View style={styles.tutorPanelHeader}>
          <View>
            <Text style={styles.tutorPanelKicker}>Tutor thread</Text>
            <Text style={styles.tutorPanelTitle}>Guided class help</Text>
          </View>
          <View style={[styles.tutorStatusDot, (listening || tutorLoading) && styles.tutorStatusDotActive]} />
        </View>
        <ScrollView
          ref={tutorThreadRef}
          style={styles.tutorThread}
          contentContainerStyle={styles.tutorThreadContent}
          nestedScrollEnabled
        >
          {messages.map((message) => (
            <View key={message.id} style={[styles.tutorBubble, message.role === 'user' ? styles.tutorBubbleUser : styles.tutorBubbleAssistant]}>
              <Text style={styles.tutorLabel}>{message.role === 'user' ? 'You' : 'Tutor'}</Text>
              {renderTutorMessageBody(message)}
              {message.role === 'assistant' && !message.error && (
                <Button
                  mode="text"
                  icon="volume-high"
                  onPress={() => speakTutorMessage(message)}
                  compact
                  style={styles.replayButton}
                  labelStyle={styles.replayLabel}
                >
                  Replay
                </Button>
              )}
              {message.role === 'assistant' && message.error && !!message.retryInstructionText && (
                <Button
                  mode="outlined"
                  icon="refresh"
                  onPress={() => retryTutorMessage(message)}
                  compact
                  disabled={tutorLoading}
                  style={styles.replayButton}
                  labelStyle={styles.replayLabel}
                >
                  Retry
                </Button>
              )}
            </View>
          ))}
          {tutorLoading && (
            <View style={[styles.tutorBubble, styles.tutorBubbleAssistant]}>
              <Text style={styles.tutorLabel}>Tutor</Text>
              <Text style={styles.tutorText}>Preparing your next explanation...</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <View style={styles.mobileTutorInput}>
        <Text style={styles.syncNote}>
          {progressSyncState === 'synced' ? 'Progress synced.' : 'Progress saved on this device.'}
        </Text>
        <TextInput
          mode="outlined"
          value={input}
          onChangeText={setInput}
          placeholder="Ask a question or type your answer..."
          multiline
          style={styles.classTutorInput}
        />
        <View style={styles.sendRow}>
          <Button
            mode="outlined"
            icon={listening ? 'microphone-off' : 'microphone'}
            onPress={listening ? stopListening : startListening}
            disabled={tutorLoading}
            style={styles.sendButton}
          >
            {listening ? 'Stop' : 'Speak'}
          </Button>
          <Button mode="contained" onPress={sendInput} disabled={!input.trim() || tutorLoading} style={styles.sendButton}>Send</Button>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.activityStrip}>
        {activityPlan.map((activity, index) => (
          <TouchableOpacity
            key={activity.id}
            style={[styles.activityChip, selectedActivityIndex === index && styles.activityChipActive]}
            onPress={() => setSelectedActivityIndex(index)}
          >
            <Text style={[styles.activityChipSection, selectedActivityIndex === index && styles.activityChipSectionActive]}>
              {activity.section}
            </Text>
            <Text style={[styles.activityChipText, selectedActivityIndex === index && styles.activityChipTextActive]}>
              {activity.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/*
        Item picker: when the activity mixes types, split into per-section
        sub-strips with subheadings; otherwise render flat. Mirrors web.
      */}
      {(() => {
        const labelFor = (type?: string) => {
          if (type === 'word') return 'Vocabulary';
          if (type === 'sentence') return 'Grammar';
          if (type === 'conversation') return 'Dialogue';
          return 'Practice';
        };
        const groups: Array<{ label: string; indices: number[] }> = [];
        for (const idx of activityItemIndices) {
          const label = labelFor(items[idx]?.type);
          const last = groups[groups.length - 1];
          if (last && last.label === label) last.indices.push(idx);
          else groups.push({ label, indices: [idx] });
        }
        const showHeadings = groups.length > 1;
        return (
          <View style={styles.itemPickerGroups}>
            {groups.map((group) => (
              <View key={group.label} style={styles.itemPickerGroup}>
                {showHeadings && (
                  <Text style={styles.itemPickerGroupLabel}>
                    {group.label} ({group.indices.length})
                  </Text>
                )}
                <View style={styles.itemPicker}>
                  {group.indices.map((globalIndex) => {
                    const item = items[globalIndex];
                    if (!item) return null;
                    const positionInActivity = activityItemIndices.indexOf(globalIndex);
                    return (
                      <TouchableOpacity
                        key={`${item.type}-${globalIndex}`}
                        style={[
                          styles.itemChip,
                          completedItems.includes(globalIndex) && styles.itemChipDone,
                          selectedIndex === globalIndex && styles.itemChipActive,
                        ]}
                        onPress={() => setSelectedIndex(globalIndex)}
                      >
                        <Text style={[styles.itemChipText, selectedIndex === globalIndex && styles.itemChipTextActive]}>
                          {positionInActivity + 1}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        );
      })()}

      <View style={styles.lessonCard}>
        <Text style={styles.kicker}>{selectedActivity?.section || 'Activity'} {selectedActivityIndex + 1} / {activityPlan.length}</Text>
        <Text style={styles.activityTitle}>{selectedActivity?.title}</Text>
        {selectedActivity?.goals.map((goal) => (
          <Text key={goal} style={styles.activityGoal}>• {goal}</Text>
        ))}
        {!!selectedActivity?.task && (
          <View style={styles.activityTaskBox}>
            <Text style={styles.tutorLabel}>Learner task</Text>
            <Text style={styles.tutorText}>{selectedActivity.task}</Text>
          </View>
        )}
        {Array.isArray(lesson?.expressionPractice) && lesson.expressionPractice.length > 0 && (
          <View style={styles.expressionPracticeBox}>
            <Text style={styles.expressionPracticeLabel}>Expression practice</Text>
            <View style={styles.expressionPracticeChips}>
              {lesson.expressionPractice.map((expression) => (
                <TouchableOpacity
                  key={expression.id}
                  style={[styles.expressionPracticeChip, tutorLoading && styles.expressionPracticeChipDisabled]}
                  onPress={() => practiceExpression(expression)}
                  disabled={tutorLoading}
                >
                  <Text style={styles.expressionPracticeChipText}>{expression.label || expression.id}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        <Text style={styles.kicker}>{selectedItem?.type || 'Practice'} {selectedIndex + 1} / {items.length}</Text>
        <Text style={styles.lessonTarget}>{itemTarget(selectedItem)}</Text>
        <PronunciationGuide
          item={selectedItem}
          targetText={itemTarget(selectedItem)}
          style={styles.lessonPronunciationGuide}
        />
        <Text style={styles.lessonNative}>
          {itemNative(selectedItem) || (selectedItem?._translationPending ? 'Translation is being prepared for your language.' : '')}
        </Text>
        {!!itemExampleTarget(selectedItem) && <Text style={styles.lessonExample}>{itemExampleTarget(selectedItem)}</Text>}
        {!!itemExampleNative(selectedItem) && <Text style={styles.lessonNative}>{itemExampleNative(selectedItem)}</Text>}
      </View>

      <View style={styles.lessonActions}>
        <Button mode="contained" onPress={teachSelected} disabled={tutorLoading}>Teach</Button>
        <Button mode="outlined" onPress={practiceSelected} disabled={tutorLoading}>Practice</Button>
        <Button
          mode="outlined"
          onPress={markComplete}
          disabled={completedItems.includes(selectedIndex)}
        >
          {completedItems.includes(selectedIndex) ? 'Completed' : 'Mark complete'}
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
          Next
        </Button>
      </View>

    </ScrollView>
  );
};

const ClassStackScreen: React.FC = () => (
  <ClassStack.Navigator screenOptions={{ headerShown: false }}>
    <ClassStack.Screen name="ClassHome" component={ClassHomeScreen} />
    <ClassStack.Screen name="ClassLesson" component={ClassLessonScreen} />
  </ClassStack.Navigator>
);

const ExerciseHomeScreen: React.FC<any> = ({ navigation }) => {
  const colors = useAppColors();
  const styles = createLocalStyles(colors);

  return (
    <View style={styles.screen}>
      <View style={styles.panel}>
        <Text style={styles.kicker}>Exercise</Text>
        <Text variant="headlineSmall" style={styles.title}>Choose an exercise</Text>
        <Text style={styles.subtitle}>Practice with quizzes, flashcards, or handwriting drills.</Text>

        <TouchableOpacity
          style={styles.exerciseCard}
          activeOpacity={0.75}
          onPress={() => navigation.navigate('Quiz')}
        >
          <MaterialCommunityIcons name="clipboard-text-outline" color={colors.primary} size={28} />
          <View style={styles.exerciseText}>
            <Text style={styles.exerciseTitle}>Quiz</Text>
            <Text style={styles.exerciseDesc}>Work through lesson questions.</Text>
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
            <Text style={styles.exerciseTitle}>Flashcards</Text>
            <Text style={styles.exerciseDesc}>Review words and phrases.</Text>
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
            <Text style={styles.exerciseTitle}>Writing</Text>
            <Text style={styles.exerciseDesc}>Trace, copy, listen, and keep a writing notebook.</Text>
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
  </ExerciseStack.Navigator>
);

const ProfileStackScreen: React.FC = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
    <ProfileStack.Screen name="LearningPersonalization" component={ContextPracticeScreen} />
    <ProfileStack.Screen name="Admin" component={AdminScreen} />
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
          tabBarLabel: 'Conversation',
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
  errorText: {
    color: colors.error,
    lineHeight: 20,
  },
  lessonScroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  lessonContent: {
    padding: 18,
    gap: 14,
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
    borderColor: 'rgba(88, 204, 2, 0.45)',
    borderRadius: 8,
    backgroundColor: 'rgba(88, 204, 2, 0.08)',
    marginBottom: 8,
  },
  expressionPracticeLabel: {
    color: '#2c8c00',
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
    borderColor: 'rgba(88, 204, 2, 0.55)',
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
  lessonActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
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
    borderColor: 'rgba(88, 204, 2, 0.3)',
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
