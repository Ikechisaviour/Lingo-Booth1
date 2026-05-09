import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { displayPartsForMessage, languageLabel, languageRole, speechChunksForPart, spokenPartsForMessage } from '../utils/languageSegments';
import { roleVoiceForLocale } from '../utils/roleVoices';

import HomeScreen from '../screens/home/HomeScreen';
import QuizListScreen from '../screens/quiz/QuizListScreen';
import QuizDetailScreen from '../screens/quiz/QuizDetailScreen';
import FlashcardsScreen from '../screens/flashcards/FlashcardsScreen';
import ConversationScreen from '../screens/ai/ConversationScreen';
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
type ClassLesson = {
  _id: string;
  title?: string;
  category?: string;
  difficulty?: string;
  track?: 'textbook' | 'practice' | string;
  activities?: ClassActivity[];
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
  exampleTarget?: string;
  exampleNative?: string;
  example?: string;
  exampleEnglish?: string;
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
  romanization: item?.romanization || item?.pronunciation || '',
  native: itemNative(item),
  exampleTarget: itemExampleTarget(item),
  exampleNative: itemExampleNative(item),
  lessonTitle: lesson?.title || '',
});

function groupDisplayParts(parts: any[] = []) {
  const groups: Array<{ kind: 'main' | 'example'; title: string; parts: any[] }> = [];

  const ensureGroup = (kind: 'main' | 'example', title = '') => {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup?.kind === kind) return lastGroup;
    const group = { kind, title: kind === 'example' ? 'Example conversation' : title, parts: [] as any[] };
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

  return groups.filter(group => group.parts.length);
}

function exampleTopicFromGroup(group: { parts?: any[] } = {}) {
  const text = (group.parts || []).map(part => part.text || '').join(' ');
  if (/Kumoh/i.test(text)) return 'life at Kumoh National Institute of Technology';
  return '';
}

function exampleCueFor(_language?: string, group?: { parts?: any[] }) {
  const topic = exampleTopicFromGroup(group);
  return topic
    ? `Example conversation about ${topic}. Listen to Person A and Person B.`
    : 'Example conversation. Listen to Person A and Person B.';
}

function shouldSpeakTutorPart(part: { text?: string; speak?: boolean; type?: string } = {}) {
  const text = String(part?.text || '').trim();
  const structuralMeta = part.type === 'meta'
    && /^(example|sample|note|tip)$/i.test(text);
  return !!text && part.speak !== false && part.type !== 'romanization' && !structuralMeta;
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
        list.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'ko'));
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
          <Text style={styles.subtitle}>No class lessons are seeded yet.</Text>
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
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<TutorMessage[]>([
    tutorSetupMessage(
      'I am ready to teach this class lesson. Choose Teach, Practice, or ask your own question.',
      nativeLanguage || 'en',
    ),
  ]);
  const [summary, setSummary] = useState('');
  const [memory, setMemory] = useState<Record<string, unknown>>({});
  const [tutorLoading, setTutorLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [status, setStatus] = useState('Ready');
  const tutorRequestInFlightRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    async function loadClassLesson() {
      try {
        setLoading(true);
        const response = await classLessonService.getClassLesson(classLessonId);
        if (!cancelled) setLesson(response.data);
      } catch {
        if (!cancelled) setError('Could not load this class lesson.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadClassLesson();
    return () => { cancelled = true; };
  }, [classLessonId]);

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

  // When the selected activity changes and the previously-picked item no longer
  // belongs to it, snap to the first item of the new activity so the focus card
  // and tutor stay coherent.
  useEffect(() => {
    if (!activityItemIndices.length) return;
    if (!activityItemIndices.includes(selectedIndex)) {
      setSelectedIndex(activityItemIndices[0]);
    }
  }, [activityItemIndices, selectedIndex]);

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
          ...(group.kind === 'example'
            ? [{ language: nativeLanguage || 'en', text: exampleCueFor(nativeLanguage || 'en', group), speaker: '' }]
            : []),
          ...group.parts
            .filter(shouldSpeakTutorPart)
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
              voice: roleVoiceForLocale(lang, part.speaker),
              rate: options.rate || '0.9',
            });
          }
        }
        return;
      }
      await speechService.speakAsync(fallbackText, {
        lang: ttsLocaleFor(language, targetLanguage || 'ko'),
        rate: options.rate || '0.9',
      });
    } catch {
      setStatus('Audio playback was interrupted.');
    }
  };

  const speakTutorPart = async (
    part: { language?: string; text?: string; speak?: boolean; type?: string; speaker?: string },
    options: { rate?: string } = {},
  ) => {
    if (!shouldSpeakTutorPart(part)) return;

    try {
      await speechService.cancel();
      const chunks = speechChunksForPart(part, targetLanguage || 'ko', nativeLanguage || 'en', part?.language);
      for (const chunk of chunks) {
        if (!chunk.text) continue;
        const lang = ttsLocaleFor(chunk.language || part?.language || targetLanguage || 'ko', targetLanguage || 'ko');
        await speechService.speakAsync(chunk.text, {
          lang,
          voice: roleVoiceForLocale(lang, chunk.speaker || part?.speaker),
          rate: options.rate || '0.9',
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
    options: { skipUserTurn?: boolean } = {},
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
        inputLanguage: nativeLanguage || 'en',
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

  const sendInput = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    sendTutorTurn(text);
  };

  const startListening = async () => {
    if (tutorLoading) return;
    try {
      const available = ExpoSpeechRecognitionModule.isRecognitionAvailable();
      if (!available) {
        setStatus('Speech input is not available on this device.');
        return;
      }

      const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!permission.granted) {
        setStatus('Microphone or speech recognition permission is blocked.');
        return;
      }

      await speechService.cancel();
      listeningRef.current = true;
      ExpoSpeechRecognitionModule.start({
        lang: ttsLocaleFor(targetLanguage || 'ko', targetLanguage || 'ko'),
        interimResults: false,
        maxAlternatives: 1,
        continuous: false,
      });
    } catch {
      listeningRef.current = false;
      setListening(false);
      setStatus('Could not start speech input. Please try again.');
    }
  };

  const stopListening = () => {
    listeningRef.current = false;
    ExpoSpeechRecognitionModule.stop();
    setListening(false);
    setStatus('Speech input stopped.');
  };

  useSpeechRecognitionEvent('start', () => {
    setListening(true);
    setStatus('Listening...');
  });

  useSpeechRecognitionEvent('result', (event) => {
    if (event.isFinal === false) return;
    const transcript = event.results?.[0]?.transcript || '';
    if (!transcript.trim()) return;
    setInput('');
    listeningRef.current = false;
    sendTutorTurn(transcript).catch(() => {});
  });

  useSpeechRecognitionEvent('error', (event) => {
    listeningRef.current = false;
    setListening(false);
    const permissionError = event.error === 'not-allowed' || event.error === 'service-not-allowed';
    setStatus(permissionError ? 'Microphone or speech recognition permission is blocked.' : 'Could not capture speech. Please try again.');
  });

  useSpeechRecognitionEvent('end', () => {
    setListening(false);
    listeningRef.current = false;
    if (!tutorLoading) {
      setStatus((currentStatus) => (currentStatus === 'Listening...' ? 'Ready' : currentStatus));
    }
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
      <Text style={styles.kicker}>Class</Text>
      <Text variant="headlineSmall" style={styles.title}>{lesson.title || 'Class lesson'}</Text>
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
                        style={[styles.itemChip, selectedIndex === globalIndex && styles.itemChipActive]}
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
        <Text style={styles.kicker}>{selectedItem?.type || 'Practice'} {selectedIndex + 1} / {items.length}</Text>
        <Text style={styles.lessonTarget}>{itemTarget(selectedItem)}</Text>
        {!!selectedItem?.romanization && <Text style={styles.lessonRomanization}>{selectedItem.romanization}</Text>}
        <Text style={styles.lessonNative}>{itemNative(selectedItem)}</Text>
        {!!itemExampleTarget(selectedItem) && <Text style={styles.lessonExample}>{itemExampleTarget(selectedItem)}</Text>}
        {!!itemExampleNative(selectedItem) && <Text style={styles.lessonNative}>{itemExampleNative(selectedItem)}</Text>}
      </View>

      <View style={styles.lessonActions}>
        <Button mode="contained" onPress={teachSelected} disabled={tutorLoading}>Teach</Button>
        <Button mode="outlined" onPress={practiceSelected} disabled={tutorLoading}>Practice</Button>
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
        <Text style={styles.subtitle}>Practice with quizzes or review vocabulary with flashcards.</Text>

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
      </View>
    </View>
  );
};

const ExerciseStackScreen: React.FC = () => (
  <ExerciseStack.Navigator screenOptions={{ headerShown: false }}>
    <ExerciseStack.Screen name="ExerciseHome" component={ExerciseHomeScreen} />
    <ExerciseStack.Screen name="Quiz" component={QuizStackScreen} />
    <ExerciseStack.Screen name="Flashcards" component={FlashcardsScreen} />
  </ExerciseStack.Navigator>
);

const ProfileStackScreen: React.FC = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
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
  itemChipText: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  itemChipTextActive: {
    color: '#fff',
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
