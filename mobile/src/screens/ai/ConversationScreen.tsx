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
import { Button, Card, Menu, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { aiService } from '../../services/api';
import speechService from '../../services/speechService';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { useAppColors, type AppColors } from '../../config/theme';
import LANGUAGES from '../../config/languages';

const SESSION_ID = 'learner-conversation';
const CUSTOM_SCENARIO_ID = 'custom';
const CUSTOM_SETUP_STEPS = ['learnerRole', 'partnerRole', 'situation', 'goal'] as const;

type CustomSetupStep = typeof CUSTOM_SETUP_STEPS[number];
type CustomRoleplay = Partial<Record<CustomSetupStep | 'id' | 'title', string>>;

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
  {
    id: CUSTOM_SCENARIO_ID,
    title: 'Custom roleplay',
    shortLabel: 'Custom',
    partner: 'Conversation partner',
    goal: 'Build your own roleplay by choosing the roles, situation, and goal.',
    starters: [],
    followUps: [
      'Start the roleplay.',
      'Ask me the first question.',
      'Start a new custom roleplay.',
    ],
  },
];

const supportLevels = [
  { value: 'guided', label: 'Guided', difficulty: 'friendly beginner with brief native-language support' },
  { value: 'balanced', label: 'Balanced', difficulty: 'balanced natural conversation' },
  { value: 'natural', label: 'Natural', difficulty: 'natural conversation with minimal coaching' },
];

type CustomSetupCopy = Record<CustomSetupStep, string> & {
  setupLabel: string;
  ready: (roleplay: CustomRoleplay) => string;
  restart: string;
  newRoleplay: string;
  situationLabel: string;
};

const customSetupCopyMap: Record<string, CustomSetupCopy> = {
  en: {
    setupLabel: 'Custom setup',
    learnerRole: 'What role do you want to play?',
    partnerRole: 'Who else is involved? What role should I play?',
    situation: 'What is the situation or place for this roleplay?',
    goal: 'What is your goal in this conversation?',
    ready: ({ learnerRole, partnerRole }) => `Ready. You are the ${learnerRole}, and I will be the ${partnerRole}. Start whenever you are ready.`,
    restart: 'Sure. Let us set up a new custom roleplay. What role do you want to play?',
    newRoleplay: 'Start new custom roleplay',
    situationLabel: 'Situation',
  },
  fil: {
    setupLabel: 'Custom setup',
    learnerRole: 'Anong role ang gusto mong gampanan?',
    partnerRole: 'Sino pa ang kasama? Anong role ang gagampanan ko?',
    situation: 'Ano ang sitwasyon o lugar ng roleplay na ito?',
    goal: 'Ano ang goal mo sa pag-uusap na ito?',
    ready: ({ learnerRole, partnerRole }) => `Handa na. Ikaw ang ${learnerRole}, at ako ang ${partnerRole}. Magsimula ka kapag handa ka na.`,
    restart: 'Sige. Gumawa tayo ng bagong custom roleplay. Anong role ang gusto mong gampanan?',
    newRoleplay: 'Bagong custom roleplay',
    situationLabel: 'Sitwasyon',
  },
  es: {
    setupLabel: 'Configuracion personalizada',
    learnerRole: 'Que papel quieres interpretar?',
    partnerRole: 'Quien mas participa? Que papel debo interpretar yo?',
    situation: 'Cual es la situacion o el lugar de este roleplay?',
    goal: 'Cual es tu meta en esta conversacion?',
    ready: ({ learnerRole, partnerRole }) => `Listo. Tu eres ${learnerRole}, y yo sere ${partnerRole}. Empieza cuando quieras.`,
    restart: 'Claro. Configuremos un nuevo roleplay personalizado. Que papel quieres interpretar?',
    newRoleplay: 'Nuevo roleplay personalizado',
    situationLabel: 'Situacion',
  },
  de: {
    setupLabel: 'Eigene Einrichtung',
    learnerRole: 'Welche Rolle moechtest du spielen?',
    partnerRole: 'Wer ist noch beteiligt? Welche Rolle soll ich spielen?',
    situation: 'Was ist die Situation oder der Ort dieses Rollenspiels?',
    goal: 'Was ist dein Ziel in diesem Gespraech?',
    ready: ({ learnerRole, partnerRole }) => `Bereit. Du bist ${learnerRole}, und ich bin ${partnerRole}. Fang an, wenn du bereit bist.`,
    restart: 'Gerne. Richten wir ein neues eigenes Rollenspiel ein. Welche Rolle moechtest du spielen?',
    newRoleplay: 'Neues eigenes Rollenspiel',
    situationLabel: 'Situation',
  },
  ko: {
    setupLabel: '맞춤 설정',
    learnerRole: '어떤 역할을 하고 싶나요?',
    partnerRole: '누가 함께하나요? 저는 어떤 역할을 할까요?',
    situation: '이 역할극의 상황이나 장소는 무엇인가요?',
    goal: '이 대화에서 목표는 무엇인가요?',
    ready: ({ learnerRole, partnerRole }) => `준비됐어요. 당신은 ${learnerRole} 역할이고, 저는 ${partnerRole} 역할입니다. 준비되면 시작하세요.`,
    restart: '좋아요. 새 맞춤 역할극을 설정해 봅시다. 어떤 역할을 하고 싶나요?',
    newRoleplay: '새 맞춤 역할극',
    situationLabel: '상황',
  },
  id: {
    setupLabel: 'Pengaturan khusus',
    learnerRole: 'Peran apa yang ingin Anda mainkan?',
    partnerRole: 'Siapa lagi yang terlibat? Peran apa yang harus saya mainkan?',
    situation: 'Apa situasi atau tempat untuk roleplay ini?',
    goal: 'Apa tujuan Anda dalam percakapan ini?',
    ready: ({ learnerRole, partnerRole }) => `Siap. Anda adalah ${learnerRole}, dan saya akan menjadi ${partnerRole}. Mulai kapan saja Anda siap.`,
    restart: 'Baik. Mari buat roleplay khusus baru. Peran apa yang ingin Anda mainkan?',
    newRoleplay: 'Roleplay khusus baru',
    situationLabel: 'Situasi',
  },
  ms: {
    setupLabel: 'Tetapan khusus',
    learnerRole: 'Apakah peranan yang anda mahu mainkan?',
    partnerRole: 'Siapa lagi yang terlibat? Apakah peranan saya?',
    situation: 'Apakah situasi atau tempat untuk roleplay ini?',
    goal: 'Apakah matlamat anda dalam perbualan ini?',
    ready: ({ learnerRole, partnerRole }) => `Sedia. Anda ialah ${learnerRole}, dan saya akan menjadi ${partnerRole}. Mula apabila anda bersedia.`,
    restart: 'Baik. Mari tetapkan roleplay khusus yang baharu. Apakah peranan yang anda mahu mainkan?',
    newRoleplay: 'Roleplay khusus baharu',
    situationLabel: 'Situasi',
  },
};

const conversationUiLabels: Record<string, {
  learner: string;
  partner: string;
  goal: string;
  partners: Record<string, string>;
  roles: Record<string, string>;
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
    roles: {
      customer: 'Customer',
      cafeStaff: 'Cafe staff',
      traveler: 'Traveler',
      localGuide: 'Local guide',
      learnerSelf: 'You',
      newAcquaintance: 'New acquaintance',
      guest: 'Guest',
      frontDesk: 'Hotel front desk',
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
    roles: {
      customer: 'Customer',
      cafeStaff: 'Staff sa cafe',
      traveler: 'Traveler',
      localGuide: 'Lokal na gabay',
      learnerSelf: 'Ikaw',
      newAcquaintance: 'Bagong kakilala',
      guest: 'Guest',
      frontDesk: 'Front desk ng hotel',
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
    roles: {
      customer: 'Cliente',
      cafeStaff: 'Personal del cafe',
      traveler: 'Viajero',
      localGuide: 'Guia local',
      learnerSelf: 'Tu',
      newAcquaintance: 'Nueva persona',
      guest: 'Huesped',
      frontDesk: 'Recepcion del hotel',
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
    roles: {
      customer: 'Kunde',
      cafeStaff: 'Cafe-Personal',
      traveler: 'Reisender',
      localGuide: 'Lokaler Guide',
      learnerSelf: 'Du',
      newAcquaintance: 'Neue Bekanntschaft',
      guest: 'Gast',
      frontDesk: 'Hotelrezeption',
    },
  },
  ko: {
    learner: '나',
    partner: '대화 상대',
    goal: '목표',
    partners: {
      cafe: '카페 직원',
      directions: '지역 안내자',
      introductions: '새로 만난 사람',
      hotel: '호텔 프런트',
      custom: '대화 상대',
    },
    roles: {
      customer: '손님',
      cafeStaff: '카페 직원',
      traveler: '여행자',
      localGuide: '지역 안내자',
      learnerSelf: '나',
      newAcquaintance: '새로 만난 사람',
      guest: '투숙객',
      frontDesk: '호텔 프런트',
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
    roles: {
      customer: 'Pelanggan',
      cafeStaff: 'Staf kafe',
      traveler: 'Pelancong',
      localGuide: 'Pemandu lokal',
      learnerSelf: 'Anda',
      newAcquaintance: 'Kenalan baru',
      guest: 'Tamu',
      frontDesk: 'Resepsionis hotel',
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
    roles: {
      customer: 'Pelanggan',
      cafeStaff: 'Staf kafe',
      traveler: 'Pelancong',
      localGuide: 'Pemandu tempatan',
      learnerSelf: 'Anda',
      newAcquaintance: 'Kenalan baru',
      guest: 'Tetamu',
      frontDesk: 'Kaunter hotel',
    },
  },
};

type ConversationRoleState = {
  scenarioKey?: string;
  learnerRoleKey?: string;
  partnerRoleKey?: string;
  learnerRole?: string;
  partnerRole?: string;
};

function roleStateForMemory(memory?: Record<string, unknown>): ConversationRoleState | null {
  const roleState = memory?.roleState;
  return roleState && typeof roleState === 'object' && !Array.isArray(roleState)
    ? roleState as ConversationRoleState
    : null;
}

function labelsFor(nativeLanguage: string | undefined, scenarioId: string, roleState?: ConversationRoleState | null) {
  const labels = conversationUiLabels[nativeLanguage || ''] || conversationUiLabels.en;
  const fallbackPartner = labels.partners[scenarioId] || conversationUiLabels.en.partners[scenarioId] || 'Conversation partner';
  const roleLabel = (roleKey?: string, rawRole?: string) => (roleKey ? (labels.roles[roleKey] || conversationUiLabels.en.roles[roleKey] || rawRole || roleKey) : '');
  const learnerRole = roleLabel(roleState?.learnerRoleKey, roleState?.learnerRole);
  const partnerRole = roleLabel(roleState?.partnerRoleKey, roleState?.partnerRole) || fallbackPartner;
  return {
    ...labels,
    activeLearner: learnerRole && learnerRole !== labels.learner ? `${labels.learner} · ${learnerRole}` : labels.learner,
    activePartner: partnerRole,
  };
}

function displayLabelsFor(nativeLanguage: string | undefined, scenarioId: string, roleState?: ConversationRoleState | null) {
  const labels = labelsFor(nativeLanguage, scenarioId, roleState);
  if (!roleState?.learnerRoleKey) return labels;
  const baseLabels = conversationUiLabels[nativeLanguage || ''] || conversationUiLabels.en;
  const roleLabel = baseLabels.roles[roleState.learnerRoleKey]
    || conversationUiLabels.en.roles[roleState.learnerRoleKey]
    || roleState.learnerRole
    || roleState.learnerRoleKey;

  return {
    ...labels,
    activeLearner: roleLabel && roleLabel !== baseLabels.learner ? `${baseLabels.learner} - ${roleLabel}` : baseLabels.learner,
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
  setup?: boolean;
};

type StoredConversation = {
  summary?: string;
  memory?: Record<string, unknown>;
  history?: Turn[];
};

function customSetupCopy(nativeLanguage?: string) {
  return customSetupCopyMap[nativeLanguage || ''] || customSetupCopyMap.en;
}

function customRoleplayFromMemory(memory?: Record<string, unknown>): CustomRoleplay {
  const customRoleplay = memory?.customRoleplay;
  return customRoleplay && typeof customRoleplay === 'object' && !Array.isArray(customRoleplay)
    ? customRoleplay as CustomRoleplay
    : {};
}

function completeCustomRoleplay(customRoleplay: CustomRoleplay = {}) {
  return CUSTOM_SETUP_STEPS.every((step) => String(customRoleplay[step] || '').trim());
}

function nextCustomSetupStep(customRoleplay: CustomRoleplay = {}): CustomSetupStep | null {
  return CUSTOM_SETUP_STEPS.find((step) => !String(customRoleplay[step] || '').trim()) || null;
}

function customRoleplayTitle(customRoleplay: CustomRoleplay = {}) {
  if (customRoleplay.title) return customRoleplay.title;
  if (customRoleplay.learnerRole && customRoleplay.partnerRole) {
    return `${customRoleplay.learnerRole} and ${customRoleplay.partnerRole}`;
  }
  return 'Custom roleplay';
}

function customRoleState(customRoleplay: CustomRoleplay = {}): ConversationRoleState | null {
  if (!completeCustomRoleplay(customRoleplay)) return null;
  return {
    scenarioKey: 'custom',
    learnerRoleKey: 'customLearner',
    partnerRoleKey: 'customPartner',
    learnerRole: customRoleplay.learnerRole,
    partnerRole: customRoleplay.partnerRole,
  };
}

function setupAssistantTurn(content: string, nativeLanguage?: string): Turn {
  return {
    id: turnId('assistant'),
    role: 'assistant',
    content,
    language: nativeLanguage || 'en',
    setup: true,
    speechParts: [{ language: nativeLanguage || 'en', text: content }],
  };
}

function wantsNewCustomRoleplay(text = '') {
  const value = String(text || '').toLowerCase();
  return (
    /\b(new|another|different|restart|reset|stop|change)\b.{0,40}\b(roleplay|role play|scenario|conversation)\b/.test(value)
    || /\bstart over\b/.test(value)
    || (/(새|새로운|다른|다시|바꾸|변경|초기화)/.test(value) && /(역할극|상황|시나리오|대화)/.test(value))
    || /\b(nuevo|nueva|otra|otro|diferente|reiniciar|cambiar|empezar de nuevo)\b.{0,40}\b(roleplay|escenario|conversacion|conversación)\b/.test(value)
    || /\b(bago|bagong|iba|palitan|ulit|simulan muli)\b.{0,40}\b(roleplay|senaryo|usapan)\b/.test(value)
    || /\b(neu|neues|andere|anderes|aendern|andern|wechseln|neu starten)\b.{0,40}\b(rollenspiel|szenario|gespraech|gesprach)\b/.test(value)
    || /\b(baru|lain|ganti|ubah|mulai ulang)\b.{0,40}\b(roleplay|skenario|percakapan|perbualan)\b/.test(value)
  );
}

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

function aiSessionIdFor(scenarioId: string, nativeLanguage?: string, targetLanguage?: string, customRoleplay: CustomRoleplay = {}) {
  const baseSessionId = sessionIdFor(scenarioId, nativeLanguage, targetLanguage);
  if (scenarioId !== CUSTOM_SCENARIO_ID || !customRoleplay.id) return baseSessionId;
  const customId = String(customRoleplay.id)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .slice(0, 80);
  return `${baseSessionId}:${customId}`;
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

function formatResetCountdown(resetAt?: string, now = Date.now()) {
  if (!resetAt) return '';
  const date = new Date(resetAt);
  if (Number.isNaN(date.getTime())) return '';
  const remainingMs = date.getTime() - now;
  if (remainingMs <= 0) return 'less than 1 minute';

  const totalSeconds = Math.ceil(remainingMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function quotaResetText(resetAt?: string, now = Date.now()) {
  const countdown = formatResetCountdown(resetAt, now);
  return countdown
    ? `You can continue in ${countdown}.`
    : 'You can continue when the daily limit resets.';
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
  const [roleState, setRoleState] = useState<ConversationRoleState | null>(null);
  const [customRoleplay, setCustomRoleplay] = useState<CustomRoleplay>({});
  const [scenarioMenuOpen, setScenarioMenuOpen] = useState(false);
  const [countdownNow, setCountdownNow] = useState(Date.now());

  const scenario = useMemo(
    () => scenarios.find((item) => item.id === scenarioId) || scenarios[0],
    [scenarioId],
  );
  const isCustomScenario = scenarioId === CUSTOM_SCENARIO_ID;
  const customIsReady = isCustomScenario && completeCustomRoleplay(customRoleplay);
  const support = useMemo(
    () => supportLevels.find((item) => item.value === supportLevel) || supportLevels[0],
    [supportLevel],
  );
  const uiLabels = useMemo(
    () => displayLabelsFor(nativeLanguage, scenarioId, roleState),
    [nativeLanguage, scenarioId, roleState],
  );
  const tier = userRole === 'admin' ? 'pro' : entitlements?.subscriptionTier || subscriptionTier || 'free';
  const canUseAI = entitlements?.canUseAI !== false;
  const memoryScope = entitlements?.aiMemoryScope || (tier === 'pro' || entitlements?.canSyncAIMemory ? 'cloud' : canUseAI ? 'device' : 'none');
  const tokenUsage = entitlements?.tokenUsage || null;
  const quotaExceeded = Boolean(tokenUsage?.quotaExceeded || entitlements?.canSendAI === false);
  const quotaMessage = quotaResetText(tokenUsage?.resetAt, countdownNow);
  const languageLabel = `${LANGUAGES[nativeLanguage]?.name || nativeLanguage || 'Native'} -> ${LANGUAGES[targetLanguage]?.name || targetLanguage || 'Target'}`;
  const activeScenarioTitle = isCustomScenario && customIsReady ? customRoleplayTitle(customRoleplay) : scenario.title;
  const activeScenarioGoal = isCustomScenario ? (customRoleplay.goal || scenario.goal) : scenario.goal;

  const quickTurns = useMemo(() => {
    if (!canUseAI || quotaExceeded) return [];
    if (isCustomScenario && !customIsReady) return [];
    if (isCustomScenario && customIsReady) {
      const latestAssistant = [...history].reverse().find((message) => message.role === 'assistant' && !message.error);
      if (latestAssistant?.nextSuggestedIntent) {
        return [latestAssistant.nextSuggestedIntent, ...scenario.followUps].slice(0, 3);
      }
      return (history.length ? scenario.followUps : ['Start the roleplay.']).slice(0, 3);
    }
    const latestAssistant = [...history].reverse().find((message) => message.role === 'assistant' && !message.error);
    if (latestAssistant?.nextSuggestedIntent) {
      return [latestAssistant.nextSuggestedIntent, ...scenario.followUps].slice(0, 3);
    }
    return (history.length ? scenario.followUps : scenario.starters).slice(0, 3);
  }, [canUseAI, quotaExceeded, history, scenario, isCustomScenario, customIsReady]);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(storageKeyFor(scenarioId, nativeLanguage, targetLanguage));
        const stored: StoredConversation = raw ? JSON.parse(raw) : {};
        const storedCustom = customRoleplayFromMemory(stored.memory);
        let nextRoleState = roleStateForMemory(stored.memory);
        let loadedHistory: Turn[] = Array.isArray(stored.history)
          ? stored.history.slice(-12).map((item, index) => ({
            ...item,
            id: `${item.role}-${index}-${Date.now()}`,
          }))
          : [];

        if (scenarioId === CUSTOM_SCENARIO_ID) {
          setCustomRoleplay(storedCustom);
          nextRoleState = nextRoleState || customRoleState(storedCustom);
          if (!completeCustomRoleplay(storedCustom) && loadedHistory.length === 0) {
            const copy = customSetupCopy(nativeLanguage);
            const nextStep = nextCustomSetupStep(storedCustom) || 'learnerRole';
            const setupTurn = setupAssistantTurn(copy[nextStep], nativeLanguage || 'en');
            loadedHistory = [setupTurn];
            await saveMemory({
              summary: stored.summary || '',
              memory: { ...(stored.memory || {}), customRoleplay: storedCustom },
              history: [{ role: setupTurn.role, content: setupTurn.content }],
            });
          }
        } else {
          setCustomRoleplay({});
        }

        setRoleState(nextRoleState);
        setHistory(loadedHistory);
        lastAssistantRef.current = [...loadedHistory].reverse().find((message) => message.role === 'assistant' && !message.error) || null;
      } catch {
        setCustomRoleplay({});
        setRoleState(null);
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
    if (!quotaExceeded || !tokenUsage?.resetAt) return undefined;
    setCountdownNow(Date.now());
    const timer = setInterval(() => setCountdownNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [quotaExceeded, tokenUsage?.resetAt]);

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
    setRoleState(null);
    setListening(false);
    setHandsFreeActive(false);
    if (scenarioId === CUSTOM_SCENARIO_ID) {
      const copy = customSetupCopy(nativeLanguage);
      const setupTurn = setupAssistantTurn(copy.learnerRole, nativeLanguage || 'en');
      setCustomRoleplay({});
      setHistory([setupTurn]);
      await saveMemory({
        memory: { customRoleplay: {} },
        history: [{ role: setupTurn.role, content: setupTurn.content }],
      });
    } else {
      setCustomRoleplay({});
      setHistory([]);
    }
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
    `Daily AI limit reached. ${quotaResetText(usage?.resetAt)}`
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

  const handleCustomSetupTurn = async (text: string, options: { autoContinue?: boolean; restart?: boolean } = {}) => {
    const autoContinue = !!options.autoContinue;
    const restart = !!options.restart;
    const copy = customSetupCopy(nativeLanguage);
    const stored = await loadMemory();
    const currentCustom: CustomRoleplay = restart
      ? {}
      : { ...customRoleplayFromMemory(stored.memory), ...customRoleplay };
    const step = nextCustomSetupStep(currentCustom) || 'learnerRole';
    const userTurn: Turn = {
      id: turnId('user'),
      role: 'user',
      content: text,
      language: nativeLanguage || 'en',
    };

    const nextCustom: CustomRoleplay = restart ? {} : { ...currentCustom, [step]: text.trim() };
    if (completeCustomRoleplay(nextCustom)) {
      nextCustom.id = nextCustom.id || `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      nextCustom.title = customRoleplayTitle(nextCustom);
      const nextRoleState = customRoleState(nextCustom);
      const readyContent = copy.ready(nextCustom);
      const assistantTurn = setupAssistantTurn(readyContent, nativeLanguage || 'en');
      const updatedHistory = [
        ...history.filter((message) => !(message as Turn & { setup?: boolean }).setup).slice(-8),
        userTurn,
        assistantTurn,
      ];

      setCustomRoleplay(nextCustom);
      setRoleState(nextRoleState);
      setHistory(updatedHistory);
      lastAssistantRef.current = assistantTurn;
      await saveMemory({
        summary: '',
        memory: {
          ...(stored.memory || {}),
          customRoleplay: nextCustom,
          roleState: nextRoleState || undefined,
        },
        history: updatedHistory.map(({ role, content }) => ({ role, content })),
      });
      setStatus('Custom roleplay is ready.');
      setTurn('');
      if (speechEnabled || autoContinue) await speakMessage(assistantTurn);
      if (autoContinue && handsFreeRef.current) scheduleHandsFreeListening();
      return;
    }

    const nextStep = nextCustomSetupStep(nextCustom) || 'learnerRole';
    const assistantTurn = setupAssistantTurn(restart ? copy.restart : copy[nextStep], nativeLanguage || 'en');
    const updatedHistory = restart
      ? [assistantTurn]
      : [...history.slice(-10), userTurn, assistantTurn];

    setCustomRoleplay(nextCustom);
    setRoleState(null);
    setHistory(updatedHistory);
    lastAssistantRef.current = assistantTurn;
    await saveMemory({
      summary: '',
      memory: { customRoleplay: nextCustom },
      history: updatedHistory.map(({ role, content }) => ({ role, content })),
    });
    setStatus(copy.setupLabel);
    setTurn('');
    if (speechEnabled || autoContinue) await speakMessage(assistantTurn);
    if (autoContinue && handsFreeRef.current) scheduleHandsFreeListening();
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
      setStatus('Conversation Practice is not available on this plan.');
      return;
    }
    if (quotaExceeded) {
      setStatus(quotaResetMessage());
      return;
    }

    if (isCustomScenario && (wantsNewCustomRoleplay(text) || !completeCustomRoleplay(customRoleplay))) {
      await handleCustomSetupTurn(text, {
        autoContinue,
        restart: wantsNewCustomRoleplay(text),
      });
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
        sessionId: aiSessionIdFor(scenarioId, nativeLanguage || 'en', targetLanguage || 'ko', customRoleplay),
        scenario: activeScenarioTitle,
        targetLanguage: targetLanguage || 'ko',
        nativeLanguage: nativeLanguage || 'en',
        inputLanguage: targetLanguage || 'ko',
        difficulty: support.difficulty,
        transcript: text,
        history: requestHistory,
        summary: stored.summary || '',
        memory: stored.memory || {},
        customRoleplay: isCustomScenario ? customRoleplay : undefined,
      });
      const data = response.data || {};
      setEntitlements(normalizeEntitlements(data.entitlements || entitlements, userRole));
      const responseCustom = customRoleplayFromMemory(data.memory);
      if (isCustomScenario && completeCustomRoleplay(responseCustom)) {
        setCustomRoleplay(responseCustom);
      }
      const nextRoleState = data.roleState || roleStateForMemory(data.memory);
      if (nextRoleState) setRoleState(nextRoleState);

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
          ? 'Conversation Practice is not available on this plan.'
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
          <Text style={styles.kicker}>Conversation Practice</Text>
          <Text variant="headlineSmall" style={styles.title}>{activeScenarioTitle}</Text>
          <Text style={styles.subtitle}>{languageLabel}</Text>
        </View>
        <View style={styles.headerActions}>
          <Menu
            visible={scenarioMenuOpen}
            onDismiss={() => setScenarioMenuOpen(false)}
            anchor={(
              <Button
                mode="outlined"
                compact
                icon="chevron-down"
                onPress={() => setScenarioMenuOpen(true)}
                style={styles.scenarioMenuButton}
                labelStyle={styles.scenarioMenuLabel}
              >
                {scenario.shortLabel}
              </Button>
            )}
          >
            {scenarios.map((item) => (
              <Menu.Item
                key={item.id}
                title={item.title}
                onPress={() => {
                  setScenarioMenuOpen(false);
                  setScenarioId(item.id);
                }}
              />
            ))}
          </Menu>
          <View style={[styles.planBadge, memoryScope === 'cloud' && styles.planBadgeCloud, memoryScope === 'none' && styles.planBadgeBlocked]}>
            <Text style={[styles.planText, memoryScope === 'cloud' && styles.planTextCloud, memoryScope === 'none' && styles.planTextBlocked]}>
              {tier.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.controls}>
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
          <Text style={styles.briefText}>{activeScenarioGoal}</Text>
          {isCustomScenario && !!customRoleplay.situation && (
            <>
              <Text style={styles.briefLabel}>{customSetupCopy(nativeLanguage).situationLabel}</Text>
              <Text style={styles.briefText}>{customRoleplay.situation}</Text>
            </>
          )}
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
            ? 'Listening resumes after each reply. Use the stop button anytime.'
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
            <Text style={styles.emptyTitle}>Conversation Practice is not available on this plan.</Text>
            <Text style={styles.emptyText}>Daily AI practice is available on Free, Plus, and Pro.</Text>
          </View>
        )}
        {canUseAI && quotaExceeded && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Daily AI limit reached.</Text>
            <Text style={styles.emptyText}>{quotaMessage}</Text>
          </View>
        )}
        {canUseAI && !quotaExceeded && history.length === 0 && !loading && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Begin {activeScenarioTitle.toLowerCase()}</Text>
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
                <Text style={styles.messageLabel}>{message.role === 'user' ? uiLabels.activeLearner : uiLabels.activePartner}</Text>
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
          placeholder={canUseAI ? 'Type your turn...' : 'Conversation Practice is not available on this plan.'}
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
  headerActions: { alignItems: 'flex-end', gap: 8 },
  scenarioMenuButton: { borderRadius: 999 },
  scenarioMenuLabel: { fontSize: 12, fontWeight: '800' },
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
