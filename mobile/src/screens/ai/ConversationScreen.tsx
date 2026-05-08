import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { Button, Card, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { aiService } from '../../services/api';
import speechService from '../../services/speechService';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { useAppColors, type AppColors } from '../../config/theme';
import LANGUAGES from '../../config/languages';

const SESSION_ID = 'learner-conversation';

const scenarios = [
  {
    id: 'cafe',
    title: 'Ordering at a cafe',
    shortLabel: 'Cafe',
    partner: 'Cafe staff',
    goal: 'Order, change details, and confirm what will be prepared.',
    starters: [
      'Please start the cafe roleplay.',
      'What do you recommend today?',
      'I want to order a drink.',
    ],
    followUps: [
      'Please ask me the next question.',
      'Can you say that more naturally?',
      'Please remind me what I ordered.',
    ],
  },
  {
    id: 'directions',
    title: 'Asking for directions',
    shortLabel: 'Directions',
    partner: 'Local guide',
    goal: 'Ask where to go, understand landmarks, and confirm the route.',
    starters: [
      'Please start a directions roleplay.',
      'I need help finding the station.',
      'Can you ask where I want to go?',
    ],
    followUps: [
      'Please give me one direction at a time.',
      'Can you explain that in easier words?',
      'How long will it take?',
    ],
  },
  {
    id: 'introductions',
    title: 'Meeting someone new',
    shortLabel: 'Meet',
    partner: 'New acquaintance',
    goal: 'Greet, exchange basic details, and keep a friendly conversation moving.',
    starters: [
      'Please start a first-meeting roleplay.',
      'Ask me about myself.',
      'Help me introduce myself naturally.',
    ],
    followUps: [
      'Please ask a follow-up question.',
      'Can you make my answer more natural?',
      'What should I ask next?',
    ],
  },
  {
    id: 'hotel',
    title: 'Checking into a hotel',
    shortLabel: 'Hotel',
    partner: 'Hotel front desk',
    goal: 'Check in, handle questions, and confirm room details.',
    starters: [
      'Please start a hotel check-in roleplay.',
      'I want to check in.',
      'Ask me for my booking details.',
    ],
    followUps: [
      'Please ask for one detail at a time.',
      'Can you repeat that more simply?',
      'What room details have we confirmed?',
    ],
  },
];

const supportLevels = [
  { value: 'guided', label: 'Guided', difficulty: 'friendly beginner with brief native-language support' },
  { value: 'balanced', label: 'Balanced', difficulty: 'balanced natural conversation' },
  { value: 'natural', label: 'Natural', difficulty: 'natural conversation with minimal coaching' },
];

const conversationUiLabels: Record<string, {
  learner: string;
  partner: string;
  goal: string;
  partners: Record<string, string>;
}> = {
  en: {
    learner: 'You',
    partner: 'Partner',
    goal: 'Goal',
    partners: {
      cafe: 'Cafe staff',
      directions: 'Local guide',
      introductions: 'New acquaintance',
      hotel: 'Hotel front desk',
    },
  },
  fil: {
    learner: 'Ikaw',
    partner: 'Kapareha',
    goal: 'Layunin',
    partners: {
      cafe: 'Staff sa cafe',
      directions: 'Lokal na gabay',
      introductions: 'Bagong kakilala',
      hotel: 'Front desk ng hotel',
    },
  },
  es: {
    learner: 'Tu',
    partner: 'Companero',
    goal: 'Meta',
    partners: {
      cafe: 'Personal del cafe',
      directions: 'Guia local',
      introductions: 'Nueva persona',
      hotel: 'Recepcion del hotel',
    },
  },
  de: {
    learner: 'Du',
    partner: 'Partner',
    goal: 'Ziel',
    partners: {
      cafe: 'Cafe-Personal',
      directions: 'Lokaler Guide',
      introductions: 'Neue Bekanntschaft',
      hotel: 'Hotelrezeption',
    },
  },
  id: {
    learner: 'Anda',
    partner: 'Mitra',
    goal: 'Tujuan',
    partners: {
      cafe: 'Staf kafe',
      directions: 'Pemandu lokal',
      introductions: 'Kenalan baru',
      hotel: 'Resepsionis hotel',
    },
  },
  ms: {
    learner: 'Anda',
    partner: 'Rakan',
    goal: 'Matlamat',
    partners: {
      cafe: 'Staf kafe',
      directions: 'Pemandu tempatan',
      introductions: 'Kenalan baru',
      hotel: 'Kaunter hotel',
    },
  },
};

function labelsFor(nativeLanguage: string | undefined, scenarioId: string) {
  const labels = conversationUiLabels[nativeLanguage || ''] || conversationUiLabels.en;
  return {
    ...labels,
    activePartner: labels.partners[scenarioId] || conversationUiLabels.en.partners[scenarioId] || 'Conversation partner',
  };
}

type Turn = {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  language?: string;
  coachingTip?: string;
  nextSuggestedIntent?: string;
  speechParts?: Array<{ language?: string; text: string }>;
  error?: boolean;
};

type StoredConversation = {
  summary?: string;
  memory?: Record<string, unknown>;
  history?: Turn[];
};

function languagePairKey(nativeLanguage?: string, targetLanguage?: string) {
  return `${nativeLanguage || 'native'}-${targetLanguage || 'target'}`
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-');
}

function storageKeyFor(scenarioId: string, nativeLanguage?: string, targetLanguage?: string) {
  return `lingoConversation:${SESSION_ID}:${languagePairKey(nativeLanguage, targetLanguage)}:${scenarioId || 'cafe'}`;
}

function sessionIdFor(scenarioId: string, nativeLanguage?: string, targetLanguage?: string) {
  return `${SESSION_ID}:${languagePairKey(nativeLanguage, targetLanguage)}:${scenarioId || 'cafe'}`;
}

function normalizeEntitlements(entitlements: ReturnType<typeof useAuthStore.getState>['aiEntitlements'], userRole?: string | null) {
  if (userRole === 'admin') {
    return {
      ...(entitlements || {}),
      subscriptionTier: 'pro' as const,
      canUseAI: true,
      canSyncAIMemory: true,
      aiMemoryScope: 'cloud' as const,
    };
  }
  return entitlements;
}

function turnId(role: Turn['role']) {
  return `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeVoiceCommand(value = '') {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .trim();
}

function formatResetAt(resetAt?: string) {
  if (!resetAt) return 'the next daily reset';
  const date = new Date(resetAt);
  if (Number.isNaN(date.getTime())) return 'the next daily reset';
  return date.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

const stopCommands = new Set([
  'stop',
  'pause',
  'end',
  'finish',
  'stop listening',
  'pause listening',
  'hands free off',
  'turn off hands free',
  '멈춰',
  '멈춰줘',
  '정지',
  '중지',
  '그만',
  '그만해',
  'para',
  'parar',
  'detente',
]);

const repeatCommands = new Set([
  'repeat',
  'say that again',
  'again',
  'one more time',
  '다시',
  '다시 말해줘',
  '한번 더',
  'otra vez',
  'repite',
  'repítelo',
]);

const slowerCommands = new Set([
  'slower',
  'say it slower',
  'speak slower',
  'repeat slower',
  '천천히',
  '천천히 말해줘',
  'más despacio',
  'mas despacio',
  'habla más despacio',
  'habla mas despacio',
]);

const ConversationScreen: React.FC = () => {
  const colors = useAppColors();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const scrollRef = useRef<ScrollView>(null);
  const handsFreeRef = useRef(false);
  const listeningAutoRef = useRef(false);
  const heardSpeechRef = useRef(false);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastAssistantRef = useRef<Turn | null>(null);

  const { subscriptionTier, aiEntitlements, userRole } = useAuthStore();
  const { nativeLanguage, targetLanguage } = useSettingsStore();
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const [supportLevel, setSupportLevel] = useState(supportLevels[0].value);
  const [turn, setTurn] = useState('');
  const [history, setHistory] = useState<Turn[]>([]);
  const [status, setStatus] = useState('Ready');
  const [loading, setLoading] = useState(false);
  const [entitlements, setEntitlements] = useState(() => normalizeEntitlements(aiEntitlements, userRole));
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [listening, setListening] = useState(false);
  const [handsFreeActive, setHandsFreeActive] = useState(false);

  const scenario = useMemo(
    () => scenarios.find((item) => item.id === scenarioId) || scenarios[0],
    [scenarioId],
  );
  const support = useMemo(
    () => supportLevels.find((item) => item.value === supportLevel) || supportLevels[0],
    [supportLevel],
  );
  const uiLabels = useMemo(
    () => labelsFor(nativeLanguage, scenarioId),
    [nativeLanguage, scenarioId],
  );
  const tier = userRole === 'admin' ? 'pro' : entitlements?.subscriptionTier || subscriptionTier || 'free';
  const canUseAI = entitlements?.canUseAI !== false;
  const memoryScope = entitlements?.aiMemoryScope || (tier === 'pro' || entitlements?.canSyncAIMemory ? 'cloud' : canUseAI ? 'device' : 'none');
  const tokenUsage = entitlements?.tokenUsage || null;
  const quotaExceeded = Boolean(tokenUsage?.quotaExceeded || entitlements?.canSendAI === false);
  const languageLabel = `${LANGUAGES[nativeLanguage]?.name || nativeLanguage || 'Native'} -> ${LANGUAGES[targetLanguage]?.name || targetLanguage || 'Target'}`;

  const quickTurns = useMemo(() => {
    if (!canUseAI || quotaExceeded) return [];
    const latestAssistant = [...history].reverse().find((message) => message.role === 'assistant' && !message.error);
    if (latestAssistant?.nextSuggestedIntent) {
      return [latestAssistant.nextSuggestedIntent, ...scenario.followUps].slice(0, 3);
    }
    return (history.length ? scenario.followUps : scenario.starters).slice(0, 3);
  }, [canUseAI, quotaExceeded, history, scenario]);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(storageKeyFor(scenarioId, nativeLanguage, targetLanguage));
        const stored: StoredConversation = raw ? JSON.parse(raw) : {};
        const loadedHistory = Array.isArray(stored.history)
          ? stored.history.slice(-12).map((item, index) => ({
            ...item,
            id: `${item.role}-${index}-${Date.now()}`,
          }))
          : [];
        setHistory(loadedHistory);
        lastAssistantRef.current = [...loadedHistory].reverse().find((message) => message.role === 'assistant' && !message.error) || null;
      } catch {
        setHistory([]);
        lastAssistantRef.current = null;
      }
      setTurn('');
      setStatus('Ready');
    };
    load();
  }, [scenarioId, nativeLanguage, targetLanguage]);

  useEffect(() => {
    aiService.getEntitlements()
      .then((res) => setEntitlements(normalizeEntitlements(res.data, userRole)))
      .catch(() => setStatus('Using saved access settings.'));
  }, [userRole]);

  useEffect(() => (
    () => {
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }
      ExpoSpeechRecognitionModule.abort();
      speechService.cancel().catch(() => {});
    }
  ), []);

  useEffect(() => {
    handsFreeRef.current = handsFreeActive;
  }, [handsFreeActive]);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  }, [history, loading]);

  const loadMemory = async (): Promise<StoredConversation> => {
    try {
      const raw = await AsyncStorage.getItem(storageKeyFor(scenarioId, nativeLanguage, targetLanguage));
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const saveMemory = async (data: StoredConversation) => {
    await AsyncStorage.setItem(storageKeyFor(scenarioId, nativeLanguage, targetLanguage), JSON.stringify({
      summary: data.summary || '',
      memory: data.memory || {},
      history: Array.isArray(data.history) ? data.history.slice(-12) : [],
    }));
  };

  const resetConversation = async () => {
    await AsyncStorage.removeItem(storageKeyFor(scenarioId, nativeLanguage, targetLanguage));
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    ExpoSpeechRecognitionModule.abort();
    handsFreeRef.current = false;
    listeningAutoRef.current = false;
    heardSpeechRef.current = false;
    lastAssistantRef.current = null;
    setListening(false);
    setHandsFreeActive(false);
    setHistory([]);
    setTurn('');
    setStatus('Conversation reset.');
    await speechService.cancel();
  };

  const ttsLocaleFor = (languageCode?: string, fallbackCode?: string) => (
    (languageCode && LANGUAGES[languageCode]?.ttsLocale)
    || (fallbackCode && LANGUAGES[fallbackCode]?.ttsLocale)
    || 'en-US'
  );

  const speakMessage = async (message: Turn, options: { rate?: string } = {}) => {
    try {
      const parts = Array.isArray(message.speechParts) ? message.speechParts : [];
      if (parts.length) {
        for (const part of parts) {
          if (part.text) {
            await speechService.speakAsync(part.text, {
              lang: ttsLocaleFor(part.language, targetLanguage || 'ko'),
              rate: options.rate || '0.9',
            });
          }
        }
        return;
      }
      await speechService.speakAsync(message.content, {
        lang: ttsLocaleFor(message.language, targetLanguage || 'ko'),
        rate: options.rate || '0.9',
      });
    } catch {
      setStatus('Audio playback was interrupted.');
    }
  };

  const appendAssistantFallback = (content: string, coachingTip = '') => {
    setHistory((prev) => [
      ...prev.slice(-11),
      {
        id: turnId('assistant'),
        role: 'assistant',
        content,
        coachingTip,
        error: true,
      },
    ]);
  };

  const quotaResetMessage = (usage = tokenUsage) => (
    `Daily AI limit reached. You can continue after ${formatResetAt(usage?.resetAt)}.`
  );

  const stopHandsFree = () => {
    handsFreeRef.current = false;
    listeningAutoRef.current = false;
    heardSpeechRef.current = false;
    setHandsFreeActive(false);
    setListening(false);
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    ExpoSpeechRecognitionModule.abort();
    speechService.cancel().catch(() => {});
    setStatus('Hands-free mode stopped.');
  };

  const scheduleHandsFreeListening = () => {
    if (!handsFreeRef.current) return;
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
    }
    restartTimerRef.current = setTimeout(() => {
      startListening({ autoContinue: true }).catch(() => {});
    }, 750);
  };

  const handleHandsFreeCommand = async (transcript: string) => {
    const command = normalizeVoiceCommand(transcript);

    if (stopCommands.has(command)) {
      stopHandsFree();
      await speechService.speakAsync('Hands-free mode stopped.', {
        lang: 'en-US',
        rate: '0.9',
      });
      return true;
    }

    if (repeatCommands.has(command)) {
      if (lastAssistantRef.current) {
        await speakMessage(lastAssistantRef.current);
      }
      scheduleHandsFreeListening();
      return true;
    }

    if (slowerCommands.has(command)) {
      if (lastAssistantRef.current) {
        await speakMessage(lastAssistantRef.current, { rate: '0.72' });
      }
      scheduleHandsFreeListening();
      return true;
    }

    return false;
  };

  const startListening = async (options: { autoContinue?: boolean } = {}) => {
    const autoContinue = !!options.autoContinue;
    if (loading || !canUseAI || quotaExceeded) return;

    try {
      const available = ExpoSpeechRecognitionModule.isRecognitionAvailable();
      if (!available) {
        setStatus('Speech input is not available on this device.');
        if (autoContinue) {
          handsFreeRef.current = false;
          setHandsFreeActive(false);
        }
        return;
      }

      const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!permission.granted) {
        setStatus('Microphone or speech recognition permission is blocked.');
        if (autoContinue) {
          handsFreeRef.current = false;
          setHandsFreeActive(false);
        }
        return;
      }

      await speechService.cancel();
      heardSpeechRef.current = false;
      listeningAutoRef.current = autoContinue;
      ExpoSpeechRecognitionModule.start({
        lang: ttsLocaleFor(targetLanguage || 'ko', targetLanguage || 'ko'),
        interimResults: false,
        continuous: false,
        maxAlternatives: 1,
      });
    } catch {
      setStatus('Could not start speech input. Please try again.');
      if (autoContinue) {
        handsFreeRef.current = false;
        setHandsFreeActive(false);
      }
    }
  };

  const stopListening = () => {
    listeningAutoRef.current = false;
    ExpoSpeechRecognitionModule.stop();
    setListening(false);
    setStatus('Speech input stopped.');
  };

  const startHandsFree = async () => {
    if (!canUseAI || quotaExceeded || loading) return;

    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }

    ExpoSpeechRecognitionModule.abort();
    handsFreeRef.current = true;
    listeningAutoRef.current = true;
    setHandsFreeActive(true);
    setSpeechEnabled(true);
    setStatus('Starting hands-free mode...');

    await speechService.speakAsync('Hands-free mode started. I will listen after each reply. Say stop to end.', {
      lang: 'en-US',
      rate: '0.9',
    });

    if (handsFreeRef.current) {
      await startListening({ autoContinue: true });
    }
  };

  const sendTurn = async (textOverride?: string, options: { autoContinue?: boolean } = {}) => {
    const autoContinue = !!options.autoContinue;
    const text = String(textOverride ?? turn).trim();
    if (!text || loading) return;
    if (!canUseAI) {
      setStatus('AI Practice is not available on this plan.');
      return;
    }
    if (quotaExceeded) {
      setStatus(quotaResetMessage());
      return;
    }

    const stored = await loadMemory();
    const requestHistory = history.map(({ role, content }) => ({ role, content })).slice(-12);
    const userTurn: Turn = {
      id: turnId('user'),
      role: 'user',
      content: text,
      language: targetLanguage || 'target',
    };

    setTurn('');
    setLoading(true);
    setStatus('Practice partner is thinking...');
    setHistory((prev) => [...prev.slice(-11), userTurn]);

    try {
      const response = await aiService.sendConversationTurn({
        sessionId: sessionIdFor(scenarioId, nativeLanguage || 'en', targetLanguage || 'ko'),
        scenario: scenario.title,
        targetLanguage: targetLanguage || 'ko',
        nativeLanguage: nativeLanguage || 'en',
        inputLanguage: targetLanguage || 'ko',
        difficulty: support.difficulty,
        transcript: text,
        history: requestHistory,
        summary: stored.summary || '',
        memory: stored.memory || {},
      });
      const data = response.data || {};
      setEntitlements(normalizeEntitlements(data.entitlements || entitlements, userRole));

      if (data.aiEnabled === false) {
        if (autoContinue) {
          handsFreeRef.current = false;
          setHandsFreeActive(false);
        }
        appendAssistantFallback(
          'The practice partner is temporarily unavailable. Please try again shortly.',
          'Your message was kept on this device.',
        );
        setStatus('Practice partner is temporarily unavailable.');
        return;
      }

      const assistantTurn: Turn = {
        id: turnId('assistant'),
        role: 'assistant',
        content: data.reply || 'Let me try that again. What would you like to say next?',
        language: data.expectedLanguage || targetLanguage || 'target',
        coachingTip: data.coachingTip || '',
        nextSuggestedIntent: data.nextSuggestedIntent || '',
        speechParts: Array.isArray(data.speechParts) ? data.speechParts : [],
      };
      lastAssistantRef.current = assistantTurn;
      setHistory((prev) => {
        const updated = [...prev.slice(-11), assistantTurn];
        saveMemory({
          summary: data.summary || stored.summary || '',
          memory: data.memory || stored.memory || {},
          history: (data.history || updated).map(({ role, content }: Turn) => ({ role, content })),
        }).catch(() => {});
        return updated;
      });
      setStatus('Practice partner replied.');
      if (speechEnabled || autoContinue) {
        if (autoContinue) {
          await speakMessage(assistantTurn);
        } else {
          speakMessage(assistantTurn).catch(() => {});
        }
      }
      if (autoContinue && handsFreeRef.current) {
        scheduleHandsFreeListening();
      }
    } catch (error: any) {
      const planDenied = error.response?.status === 403;
      const quotaDenied = error.response?.status === 429;
      if (error.response?.data?.entitlements) {
        setEntitlements(normalizeEntitlements(error.response.data.entitlements, userRole));
      }
      const resetMessage = quotaDenied
        ? quotaResetMessage(error.response?.data?.tokenUsage)
        : '';
      appendAssistantFallback(
        quotaDenied
          ? resetMessage
          : planDenied
          ? 'AI Practice is not available on this plan.'
          : 'The practice partner had trouble replying. Please try again.',
        quotaDenied
          ? 'Your daily AI access resets automatically.'
          : planDenied
            ? 'Your plan settings were refreshed.'
            : 'Your message was not sent again.',
      );
      setStatus(quotaDenied ? resetMessage : (error.response?.data?.message || 'Connection issue. Try again in a moment.'));
      if (autoContinue) {
        handsFreeRef.current = false;
        setHandsFreeActive(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useSpeechRecognitionEvent('start', () => {
    setListening(true);
    setStatus(listeningAutoRef.current ? 'Hands-free is listening...' : 'Listening...');
  });

  useSpeechRecognitionEvent('result', (event) => {
    if (event.isFinal === false) return;
    const transcript = event.results?.[0]?.transcript || '';
    heardSpeechRef.current = Boolean(transcript.trim());
    if (!transcript.trim()) return;

    setTurn(transcript);
    if (listeningAutoRef.current && handsFreeRef.current) {
      handleHandsFreeCommand(transcript)
        .then((handled) => {
          if (!handled) {
            sendTurn(transcript, { autoContinue: true }).catch(() => {});
          }
        })
        .catch(() => {
          setStatus('Could not process voice command.');
        });
      return;
    }

    sendTurn(transcript).catch(() => {});
  });

  useSpeechRecognitionEvent('error', (event) => {
    setListening(false);
    if (listeningAutoRef.current && handsFreeRef.current && event.error === 'no-speech') {
      setStatus('Still listening...');
      scheduleHandsFreeListening();
      return;
    }

    const permissionError = event.error === 'not-allowed' || event.error === 'service-not-allowed';
    setStatus(permissionError ? 'Microphone or speech recognition permission is blocked.' : 'Could not capture speech. Please try again.');
    if (listeningAutoRef.current) {
      handsFreeRef.current = false;
      setHandsFreeActive(false);
      listeningAutoRef.current = false;
    }
  });

  useSpeechRecognitionEvent('end', () => {
    setListening(false);
    if (listeningAutoRef.current && handsFreeRef.current && !heardSpeechRef.current) {
      scheduleHandsFreeListening();
      return;
    }
    if (!loading) {
      setStatus((currentStatus) => (currentStatus === 'Listening...' || currentStatus === 'Hands-free is listening...' ? 'Ready' : currentStatus));
    }
  });

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { paddingTop: insets.top + 14 }]}>
        <View style={styles.headerText}>
          <Text style={styles.kicker}>AI Practice</Text>
          <Text variant="headlineSmall" style={styles.title}>{scenario.title}</Text>
          <Text style={styles.subtitle}>{languageLabel}</Text>
        </View>
        <View style={[styles.planBadge, memoryScope === 'cloud' && styles.planBadgeCloud, memoryScope === 'none' && styles.planBadgeBlocked]}>
          <Text style={[styles.planText, memoryScope === 'cloud' && styles.planTextCloud, memoryScope === 'none' && styles.planTextBlocked]}>
            {tier.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Text style={styles.label}>Scenario</Text>
        <SegmentedButtons
          value={scenarioId}
          onValueChange={setScenarioId}
          buttons={scenarios.map((item) => ({ value: item.id, label: item.shortLabel }))}
          style={styles.segmented}
        />
        <Text style={styles.label}>Support</Text>
        <SegmentedButtons
          value={supportLevel}
          onValueChange={setSupportLevel}
          buttons={supportLevels.map(({ value, label }) => ({ value, label }))}
          style={styles.segmented}
        />
        <View style={styles.brief}>
          <Text style={styles.briefLabel}>{uiLabels.partner}</Text>
          <Text style={styles.briefText}>{uiLabels.activePartner}</Text>
          <Text style={styles.briefLabel}>{uiLabels.goal}</Text>
          <Text style={styles.briefText}>{scenario.goal}</Text>
          <Text style={styles.memoryText}>
            {memoryScope === 'cloud' ? 'Synced memory' : memoryScope === 'device' ? 'Device memory' : 'No AI memory'}
          </Text>
        </View>
        <Button
          mode={speechEnabled ? 'contained-tonal' : 'outlined'}
          icon={speechEnabled ? 'volume-high' : 'volume-off'}
          onPress={() => setSpeechEnabled((enabled) => !enabled)}
          style={styles.speechToggle}
        >
          {speechEnabled ? 'Spoken replies on' : 'Spoken replies off'}
        </Button>
        <Button
          mode={handsFreeActive ? 'contained-tonal' : 'outlined'}
          icon={handsFreeActive ? 'microphone-off' : 'microphone'}
          onPress={handsFreeActive ? stopHandsFree : () => startHandsFree().catch(() => setStatus('Could not start hands-free mode.'))}
          disabled={!canUseAI || quotaExceeded || loading}
          style={styles.speechToggle}
        >
          {handsFreeActive ? 'Stop hands-free' : 'Start hands-free'}
        </Button>
        <Text style={styles.handsFreeNote}>
          {handsFreeActive
            ? 'Listening resumes after each reply. Say "stop", "repeat", or "slower".'
            : 'Hands-free lets you continue the roleplay while your hands are busy.'}
        </Text>
        {quickTurns.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.starters}>
            {quickTurns.map((starter) => (
              <Button
                key={starter}
                mode="outlined"
                compact
                onPress={() => sendTurn(starter)}
                disabled={loading}
                style={styles.starterButton}
                labelStyle={styles.starterLabel}
              >
                {starter}
              </Button>
            ))}
          </ScrollView>
        )}
      </View>

      <ScrollView ref={scrollRef} style={styles.thread} contentContainerStyle={styles.threadContent}>
        {!canUseAI && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>AI Practice is not available on this plan.</Text>
            <Text style={styles.emptyText}>Daily AI practice is available on Free, Plus, and Pro.</Text>
          </View>
        )}
        {canUseAI && quotaExceeded && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Daily AI limit reached.</Text>
            <Text style={styles.emptyText}>You can continue after {formatResetAt(tokenUsage?.resetAt)}.</Text>
          </View>
        )}
        {canUseAI && !quotaExceeded && history.length === 0 && !loading && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Begin {scenario.title.toLowerCase()}</Text>
            <Text style={styles.emptyText}>{uiLabels.activePartner} is ready.</Text>
          </View>
        )}
        {history.map((message) => (
          <Card
            key={message.id}
            style={[
              styles.message,
              message.role === 'user' && styles.userMessage,
              message.error && styles.errorMessage,
            ]}
          >
            <Card.Content>
              <View style={styles.messageHeader}>
                <Text style={styles.messageLabel}>{message.role === 'user' ? uiLabels.learner : uiLabels.activePartner}</Text>
                <View style={styles.messageTools}>
                  {message.role === 'assistant' && !message.error && (
                    <Button
                      mode="text"
                      compact
                      icon="volume-high"
                      onPress={() => speakMessage(message)}
                      labelStyle={styles.replayLabel}
                    >
                      Play
                    </Button>
                  )}
                  {!!message.language && <Text style={styles.languageTag}>{message.language}</Text>}
                </View>
              </View>
              <Text style={styles.messageBody}>{message.content}</Text>
              {!!message.coachingTip && <Text style={styles.messageTip}>{message.coachingTip}</Text>}
            </Card.Content>
          </Card>
        ))}
        {loading && (
          <Card style={styles.message}>
            <Card.Content>
              <Text style={styles.messageLabel}>{uiLabels.activePartner}</Text>
              <Text style={styles.messageBody}>Thinking...</Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>

      <View style={[styles.composer, { paddingBottom: insets.bottom + 10 }]}>
        <TextInput
          mode="outlined"
          value={turn}
          onChangeText={setTurn}
          placeholder={canUseAI ? 'Type your turn...' : 'AI Practice is not available on this plan.'}
          multiline
          disabled={!canUseAI || quotaExceeded}
          style={styles.input}
        />
        <View style={styles.actions}>
          <Button mode="outlined" onPress={resetConversation} style={styles.actionButton}>
            Reset
          </Button>
          <Button
            mode="outlined"
            icon={listening ? 'microphone-off' : 'microphone'}
            onPress={listening ? stopListening : () => startListening().catch(() => setStatus('Could not start speech input.'))}
            disabled={!canUseAI || quotaExceeded || loading || handsFreeActive}
            style={styles.actionButton}
          >
            {listening ? 'Stop' : 'Speak'}
          </Button>
          <Button mode="contained" onPress={() => sendTurn()} disabled={!turn.trim() || loading || !canUseAI || quotaExceeded} loading={loading} style={styles.actionButton}>
            Send
          </Button>
        </View>
        <Text style={styles.status}>{status}</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerText: { flex: 1 },
  kicker: { color: colors.primary, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  title: { color: colors.textPrimary, fontWeight: '800', marginTop: 2 },
  subtitle: { color: colors.textSecondary, marginTop: 2 },
  planBadge: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  planBadgeCloud: { backgroundColor: 'rgba(88, 204, 2, 0.1)', borderColor: 'rgba(88, 204, 2, 0.28)' },
  planBadgeBlocked: { backgroundColor: 'rgba(255, 75, 75, 0.09)', borderColor: 'rgba(255, 75, 75, 0.25)' },
  planText: { color: colors.textSecondary, fontWeight: '800', fontSize: 11 },
  planTextCloud: { color: colors.accentGreen },
  planTextBlocked: { color: colors.accentRed },
  controls: { padding: 16, paddingBottom: 10, backgroundColor: colors.surface },
  label: { color: colors.textSecondary, fontSize: 12, fontWeight: '800', marginBottom: 6, marginTop: 8 },
  segmented: { marginBottom: 4 },
  brief: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  briefLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '800', textTransform: 'uppercase', marginTop: 4 },
  briefText: { color: colors.textPrimary, fontWeight: '700', marginTop: 2, lineHeight: 19 },
  memoryText: { color: colors.textSecondary, marginTop: 10, fontSize: 12, fontWeight: '700' },
  speechToggle: { marginTop: 10, borderRadius: 8 },
  handsFreeNote: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 7 },
  starters: { gap: 8, paddingTop: 10, paddingRight: 16 },
  starterButton: { borderRadius: 8, maxWidth: 250 },
  starterLabel: { fontSize: 12 },
  thread: { flex: 1 },
  threadContent: { padding: 16, paddingBottom: 24 },
  empty: { minHeight: 250, justifyContent: 'center', alignItems: 'center', gap: 6, paddingHorizontal: 20 },
  emptyTitle: { color: colors.textPrimary, fontWeight: '800', fontSize: 16, textAlign: 'center' },
  emptyText: { color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  message: { maxWidth: '90%', marginBottom: 10, backgroundColor: colors.surface, borderRadius: 8 },
  userMessage: { alignSelf: 'flex-end', backgroundColor: 'rgba(28, 176, 246, 0.1)' },
  errorMessage: { borderWidth: 1, borderColor: colors.error },
  messageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  messageLabel: { color: colors.textSecondary, fontSize: 11, fontWeight: '800', textTransform: 'uppercase', marginBottom: 5 },
  messageTools: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  replayLabel: { fontSize: 11, marginHorizontal: 0 },
  languageTag: { color: colors.primary, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  messageBody: { color: colors.textPrimary, lineHeight: 20 },
  messageTip: { color: colors.textSecondary, marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.border, lineHeight: 18 },
  composer: { paddingHorizontal: 16, paddingTop: 10, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  input: { backgroundColor: colors.surface, maxHeight: 112 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 8 },
  actionButton: { flex: 1, borderRadius: 8 },
  status: { color: colors.textSecondary, fontSize: 12, marginTop: 8 },
});

export default ConversationScreen;
