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
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Button, Card, Menu, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { aiService, learningHubService, practiceContextService, userService } from '../../services/api';
import speechService from '../../services/speechService';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { useAppColors, type AppColors } from '../../config/theme';
import LANGUAGES, { getLanguageDisplayName } from '../../config/languages';
import {
  displayPartsForMessage,
  languageLabel as segmentLanguageLabel,
  languageRole,
  spokenPartsForMessage,
} from '../../utils/languageSegments';
import {
  CONVERSATION_REPEAT_COMMANDS,
  CONVERSATION_SLOWER_COMMANDS,
  CONVERSATION_STOP_COMMANDS,
  conversationVoiceForLocale,
  handsFreeCopy,
} from '../../utils/conversationSpeech';
import { normalizeLanguageCode } from '../../utils/languagePairPolicy';

const SESSION_ID = 'learner-conversation';
const CUSTOM_SCENARIO_ID = 'custom';
const CUSTOM_SETUP_STEPS = ['learnerRole', 'partnerRole', 'situation', 'goal'] as const;

type CustomSetupStep = typeof CUSTOM_SETUP_STEPS[number];
type CustomRoleplay = Partial<Record<CustomSetupStep | 'id' | 'title', string>>;
type PracticeRecommendation = {
  title?: string;
  text?: string;
  prompt?: string;
};
type PracticeRecommendations = {
  hasContext?: boolean;
  roleplays?: PracticeRecommendation[];
  reviewDrills?: PracticeRecommendation[];
};
type RoleplayRecap = {
  title: string;
  partner: string;
  goal: string;
  summary: string;
  usefulPhrases?: string[];
  coachingTips?: string[];
};

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

const scenarioCopyMap: Record<string, Record<string, {
  title: string;
  shortLabel: string;
  partner: string;
  goal: string;
  starters: string[];
  followUps: string[];
}>> = {
  en: Object.fromEntries(scenarios.map((item) => [item.id, {
    title: item.title,
    shortLabel: item.shortLabel,
    partner: item.partner,
    goal: item.goal,
    starters: item.starters,
    followUps: item.followUps,
  }])),
  ko: {
    cafe: {
      title: '카페에서 주문하기',
      shortLabel: '카페',
      partner: '카페 직원',
      goal: '주문하고, 세부 사항을 바꾸고, 준비될 내용을 확인합니다.',
      starters: ['카페 역할극을 시작해 주세요.', '오늘 무엇을 추천하시나요?', '음료를 주문하고 싶어요.'],
      followUps: ['다음 질문을 해 주세요.', '더 자연스럽게 말하려면 어떻게 하나요?', '제가 무엇을 주문했는지 알려 주세요.'],
    },
    directions: {
      title: '길 묻기',
      shortLabel: '길 찾기',
      partner: '현지 안내자',
      goal: '목적지를 묻고, 주요 지점을 이해하고, 가는 길을 확인합니다.',
      starters: ['길 묻기 역할극을 시작해 주세요.', '역을 찾는 데 도움이 필요해요.', '제가 어디에 가고 싶은지 물어봐 주세요.'],
      followUps: ['한 번에 한 방향씩 알려 주세요.', '더 쉬운 말로 설명해 주세요.', '얼마나 걸리나요?'],
    },
    introductions: {
      title: '처음 만난 사람과 대화하기',
      shortLabel: '첫 만남',
      partner: '처음 만난 사람',
      goal: '인사하고, 기본 정보를 주고받고, 자연스럽게 대화를 이어 갑니다.',
      starters: ['첫 만남 역할극을 시작해 주세요.', '저에 대해 질문해 주세요.', '자연스럽게 자기소개하도록 도와주세요.'],
      followUps: ['후속 질문을 해 주세요.', '제 대답을 더 자연스럽게 바꿔 주세요.', '다음에는 무엇을 물어보면 좋을까요?'],
    },
    hotel: {
      title: '호텔 체크인하기',
      shortLabel: '호텔',
      partner: '호텔 프런트 직원',
      goal: '체크인하고, 질문에 답하고, 객실 정보를 확인합니다.',
      starters: ['호텔 체크인 역할극을 시작해 주세요.', '체크인하고 싶어요.', '예약 정보를 물어봐 주세요.'],
      followUps: ['한 번에 한 가지 정보씩 물어봐 주세요.', '더 쉽게 다시 말해 주세요.', '지금까지 어떤 객실 정보를 확인했나요?'],
    },
    custom: {
      title: '맞춤 역할극',
      shortLabel: '맞춤',
      partner: '대화 상대',
      goal: '역할, 상황, 목표를 정해서 나만의 역할극을 만듭니다.',
      starters: [],
      followUps: ['역할극을 시작해 주세요.', '첫 번째 질문을 해 주세요.', '새 맞춤 역할극을 시작해 주세요.'],
    },
  },
};

const supportLevelLabels: Record<string, Record<string, string>> = {
  en: { guided: 'Guided', balanced: 'Balanced', natural: 'Natural' },
  ko: { guided: '안내형', balanced: '균형형', natural: '자연형' },
};

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

function conversationCopyLanguage(nativeLanguage?: string) {
  const normalized = normalizeLanguageCode(nativeLanguage) || 'en';
  return scenarioCopyMap[normalized] ? normalized : 'en';
}

function scenarioCopyFor(nativeLanguage: string | undefined, scenarioId: string) {
  const language = conversationCopyLanguage(nativeLanguage);
  return scenarioCopyMap[language][scenarioId] || scenarioCopyMap.en[scenarioId] || scenarioCopyMap.en.cafe;
}

function supportLabelFor(nativeLanguage: string | undefined, supportId: string) {
  const language = conversationCopyLanguage(nativeLanguage);
  return supportLevelLabels[language]?.[supportId] || supportLevelLabels.en[supportId] || supportId;
}

function labelsFor(nativeLanguage: string | undefined, scenarioId: string, roleState?: ConversationRoleState | null) {
  const language = conversationCopyLanguage(nativeLanguage);
  const labels = conversationUiLabels[language] || conversationUiLabels.en;
  const fallbackPartner = labels.partners[scenarioId] || scenarioCopyFor(nativeLanguage, scenarioId).partner || 'Conversation partner';
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
  const language = conversationCopyLanguage(nativeLanguage);
  const baseLabels = conversationUiLabels[language] || conversationUiLabels.en;
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
  speechParts?: Array<{ language?: string; text: string; speaker?: string }>;
  displayParts?: Array<{ type?: string; language?: string; text: string; speak?: boolean; speaker?: string }>;
  error?: boolean;
  setup?: boolean;
};

type StoredConversation = {
  summary?: string;
  memory?: Record<string, unknown>;
  history?: Turn[];
};

function customSetupCopy(nativeLanguage?: string) {
  const language = normalizeLanguageCode(nativeLanguage) || 'en';
  return customSetupCopyMap[language] || customSetupCopyMap.en;
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
      canUsePracticeContext: true,
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

function isProOrUltraTier(tier?: string) {
  return ['pro', 'ultra'].includes(String(tier || '').toLowerCase());
}

function quotaLimitCopy(tier = 'free', resetAt?: string, now = Date.now()) {
  const normalizedTier = String(tier || 'free').toLowerCase();
  const countdown = formatResetCountdown(resetAt, now);
  const resetText = countdown
    ? `You can continue in ${countdown}.`
    : 'You can continue when your daily conversation allowance resets.';

  if (isProOrUltraTier(normalizedTier)) {
    return {
      title: "You've practiced a lot today.",
      body: countdown
        ? `Take a short break to protect your focus and avoid burnout. You can continue in ${countdown}.`
        : 'Take a short break to protect your focus and avoid burnout. You can continue after the daily reset.',
      status: countdown
        ? `You've practiced a lot today. You can continue in ${countdown}.`
        : "You've practiced a lot today. You can continue after the daily reset.",
      tip: 'A short rest helps the practice stick.',
    };
  }

  if (normalizedTier === 'plus') {
    return {
      title: 'Daily Plus account conversation limit reached.',
      body: `${resetText} Upgrade to Pro for a higher daily conversation allowance.`,
      status: `Daily Plus account conversation limit reached. ${resetText}`,
      tip: 'Upgrade to Pro for a higher daily conversation allowance.',
    };
  }

  return {
    title: 'Daily Free account conversation limit reached.',
    body: `${resetText} Upgrade to Plus to keep practicing today.`,
    status: `Daily Free account conversation limit reached. ${resetText}`,
    tip: 'Upgrade to Plus to keep practicing today.',
  };
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

const localizedStopCommands = new Set(CONVERSATION_STOP_COMMANDS.map(normalizeVoiceCommand));
const localizedRepeatCommands = new Set(CONVERSATION_REPEAT_COMMANDS.map(normalizeVoiceCommand));
const localizedSlowerCommands = new Set(CONVERSATION_SLOWER_COMMANDS.map(normalizeVoiceCommand));
const scenarioIds = new Set(scenarios.map((item) => item.id));

const ConversationScreen: React.FC = () => {
  const route = useRoute<any>();
  const { t } = useTranslation();
  const lessonId = typeof route.params?.lessonId === 'string' ? route.params.lessonId : '';
  const starterParam = typeof route.params?.starter === 'string'
    ? route.params.starter
    : typeof route.params?.prompt === 'string'
      ? route.params.prompt
      : '';
  const incomingScenarioId = typeof route.params?.scenarioId === 'string' && scenarioIds.has(route.params.scenarioId)
    ? route.params.scenarioId
    : scenarios[0].id;
  const incomingCustomRoleplay = route.params?.customRoleplay && typeof route.params.customRoleplay === 'object'
    ? route.params.customRoleplay as CustomRoleplay
    : null;
  const colors = useAppColors();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const scrollRef = useRef<ScrollView>(null);
  const handsFreeRef = useRef(false);
  const listeningAutoRef = useRef(false);
  const heardSpeechRef = useRef(false);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastAssistantRef = useRef<Turn | null>(null);
  const pendingSpeechTurnRef = useRef(false);

  const { userId, subscriptionTier, aiEntitlements, userRole } = useAuthStore();
  const { nativeLanguage, targetLanguage } = useSettingsStore();
  const [scenarioId, setScenarioId] = useState(incomingScenarioId);
  const [supportLevel, setSupportLevel] = useState(supportLevels[0].value);
  const [turn, setTurn] = useState('');
  const [history, setHistory] = useState<Turn[]>([]);
  const [status, setStatus] = useState(() => t('conversation.status.ready', { defaultValue: 'Ready' }));
  const [loading, setLoading] = useState(false);
  const [entitlements, setEntitlements] = useState(() => normalizeEntitlements(aiEntitlements, userRole));
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [listening, setListening] = useState(false);
  const [handsFreeActive, setHandsFreeActive] = useState(false);
  const [roleState, setRoleState] = useState<ConversationRoleState | null>(null);
  const [customRoleplay, setCustomRoleplay] = useState<CustomRoleplay>({});
  const [scenarioMenuOpen, setScenarioMenuOpen] = useState(false);
  const [contextRecommendations, setContextRecommendations] = useState<PracticeRecommendations | null>(null);
  const [countdownNow, setCountdownNow] = useState(Date.now());
  const [roleplayRecap, setRoleplayRecap] = useState<RoleplayRecap | null>(null);

  useEffect(() => {
    if (!lessonId) return;
    setHistory([]);
    setStatus('Class lesson ready.');
  }, [lessonId]);

  useEffect(() => {
    if (incomingScenarioId !== scenarioId) {
      setScenarioId(incomingScenarioId);
    }
  }, [incomingScenarioId, scenarioId]);

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
  const supportIndex = supportLevels.findIndex((item) => item.value === supportLevel);
  const shiftSupportLevel = (direction: number) => {
    const nextIndex = Math.max(0, Math.min(supportLevels.length - 1, supportIndex + direction));
    setSupportLevel(supportLevels[nextIndex].value);
  };
  const uiLabels = useMemo(
    () => displayLabelsFor(nativeLanguage, scenarioId, roleState),
    [nativeLanguage, scenarioId, roleState],
  );
  const localizedScenario = useMemo(
    () => scenarioCopyFor(nativeLanguage, scenarioId),
    [nativeLanguage, scenarioId],
  );
  const readyStatus = t('conversation.status.ready', { defaultValue: 'Ready' });
  const listeningStatus = t('conversation.status.listening', { defaultValue: 'Listening...' });
  const tier = userRole === 'admin' ? 'pro' : entitlements?.subscriptionTier || subscriptionTier || 'free';
  const canUseAI = entitlements?.canUseAI !== false;
  const canUsePracticeContextFeature = Boolean(
    entitlements?.canUsePracticeContext
    || isProOrUltraTier(tier)
    || isProOrUltraTier(subscriptionTier),
  );
  const memoryScope = (
    isProOrUltraTier(tier) || isProOrUltraTier(subscriptionTier) || entitlements?.canSyncAIMemory
      ? 'cloud'
      : entitlements?.aiMemoryScope || (canUseAI ? 'device' : 'none')
  );
  const tokenUsage = entitlements?.tokenUsage || null;
  const quotaExceeded = Boolean(tokenUsage?.quotaExceeded || entitlements?.canSendAI === false);
  const quotaCopy = quotaLimitCopy(tier, tokenUsage?.resetAt, countdownNow);
  const languageLabel = `${getLanguageDisplayName(nativeLanguage, t) || nativeLanguage || 'Native'} -> ${getLanguageDisplayName(targetLanguage, t) || targetLanguage || 'Target'}`;
  const activeScenarioTitle = isCustomScenario && customIsReady ? customRoleplayTitle(customRoleplay) : localizedScenario.title;
  const activeScenarioGoal = isCustomScenario ? (customRoleplay.goal || localizedScenario.goal) : localizedScenario.goal;

  const quickTurns = useMemo(() => {
    if (!canUseAI || quotaExceeded) return [];
    if (isCustomScenario && !customIsReady) return [];
    if (isCustomScenario && customIsReady) {
      const latestAssistant = [...history].reverse().find((message) => message.role === 'assistant' && !message.error);
      if (latestAssistant?.nextSuggestedIntent) {
        return [latestAssistant.nextSuggestedIntent, ...localizedScenario.followUps].slice(0, 3);
      }
      return (history.length ? localizedScenario.followUps : localizedScenario.followUps.slice(0, 1)).slice(0, 3);
    }
    const latestAssistant = [...history].reverse().find((message) => message.role === 'assistant' && !message.error);
    if (latestAssistant?.nextSuggestedIntent) {
      return [latestAssistant.nextSuggestedIntent, ...localizedScenario.followUps].slice(0, 3);
    }
    return (history.length ? localizedScenario.followUps : localizedScenario.starters).slice(0, 3);
  }, [canUseAI, quotaExceeded, history, localizedScenario, isCustomScenario, customIsReady]);

  const contextPracticeActions = useMemo(() => {
    if (!canUsePracticeContextFeature || !contextRecommendations?.hasContext) return [];
    const roleplays = (contextRecommendations.roleplays || []).slice(0, 2).map((item) => ({
      key: `roleplay-${item.prompt}`,
      label: item.title || (nativeLanguage === 'ko' ? '역할극 연습' : 'Practice roleplay'),
      prompt: item.prompt,
    }));
    const drills = (contextRecommendations.reviewDrills || []).slice(0, 2).map((item) => ({
      key: `drill-${item.prompt}`,
      label: item.text || (nativeLanguage === 'ko' ? '복습 연습' : 'Review drill'),
      prompt: item.prompt,
    }));
    return [...roleplays, ...drills].filter((item) => item.prompt);
  }, [canUsePracticeContextFeature, contextRecommendations, nativeLanguage]);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(storageKeyFor(scenarioId, nativeLanguage, targetLanguage));
        const stored: StoredConversation = raw ? JSON.parse(raw) : {};
        const storedCustom = customRoleplayFromMemory(stored.memory);
        const seededCustom = scenarioId === CUSTOM_SCENARIO_ID && completeCustomRoleplay(incomingCustomRoleplay || {})
          ? incomingCustomRoleplay as CustomRoleplay
          : storedCustom;
        let nextRoleState = roleStateForMemory(stored.memory);
        let loadedHistory: Turn[] = Array.isArray(stored.history)
          ? stored.history.slice(-12).map((item, index) => ({
            ...item,
            id: `${item.role}-${index}-${Date.now()}`,
          }))
          : [];

        if (scenarioId === CUSTOM_SCENARIO_ID) {
          setCustomRoleplay(seededCustom);
          nextRoleState = customRoleState(seededCustom) || nextRoleState;
          if (completeCustomRoleplay(seededCustom) && seededCustom !== storedCustom) {
            await saveMemory({
              summary: '',
              memory: {
                customRoleplay: seededCustom,
                roleState: nextRoleState || undefined,
              },
              history: [],
            });
          }
          if (!completeCustomRoleplay(seededCustom) && loadedHistory.length === 0) {
            const copy = customSetupCopy(nativeLanguage);
            const nextStep = nextCustomSetupStep(seededCustom) || 'learnerRole';
            const setupTurn = setupAssistantTurn(copy[nextStep], nativeLanguage || 'en');
            loadedHistory = [setupTurn];
            await saveMemory({
              summary: stored.summary || '',
              memory: { ...(stored.memory || {}), customRoleplay: seededCustom },
              history: [{ role: setupTurn.role, content: setupTurn.content }],
            });
          }
        } else {
          setCustomRoleplay({});
        }

        setRoleState(nextRoleState);
        setHistory(loadedHistory);
        setRoleplayRecap(null);
        lastAssistantRef.current = [...loadedHistory].reverse().find((message) => message.role === 'assistant' && !message.error) || null;
      } catch {
        setCustomRoleplay({});
        setRoleState(null);
        setHistory([]);
        setRoleplayRecap(null);
        lastAssistantRef.current = null;
      }
      setTurn('');
      setStatus(readyStatus);
    };
    load();
  }, [incomingCustomRoleplay, scenarioId, nativeLanguage, targetLanguage, readyStatus]);

  useEffect(() => {
    if (!starterParam) return;
    setTurn(starterParam);
    setStatus('Personalized starter ready.');
  }, [starterParam]);

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
        if (!cancelled) setContextRecommendations((res.data || null) as PracticeRecommendations | null);
      })
      .catch(() => {
        if (!cancelled) setContextRecommendations(null);
      });
    return () => {
      cancelled = true;
    };
  }, [canUsePracticeContextFeature, targetLanguage]);

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
    pendingSpeechTurnRef.current = false;
    lastAssistantRef.current = null;
    setRoleState(null);
    setRoleplayRecap(null);
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
      const parts = spokenPartsForMessage(message, targetLanguage || 'ko', nativeLanguage || 'en');
      if (parts.length) {
        for (const part of parts) {
          if (part.text) {
            const lang = ttsLocaleFor(part.language, targetLanguage || 'ko');
            await speechService.speakAsync(part.text, {
              lang,
              voice: message.role === 'assistant' ? conversationVoiceForLocale(lang, part.speaker) : undefined,
              rate: options.rate || '0.9',
            });
          }
        }
        return;
      }
      const lang = ttsLocaleFor(message.language, targetLanguage || 'ko');
      await speechService.speakAsync(message.content, {
        lang,
        voice: message.role === 'assistant' ? conversationVoiceForLocale(lang) : undefined,
        rate: options.rate || '0.9',
      });
    } catch {
      setStatus(handsFreeCopy(nativeLanguage).audioInterrupted);
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
    quotaLimitCopy(tier, usage?.resetAt).status
  );

  const saveAssistantTurn = async (message: Turn) => {
    if (!userId || message.role !== 'assistant' || message.error) return;
    try {
      await learningHubService.saveItem({
        itemType: 'phrase',
        targetText: message.content,
        nativeText: message.coachingTip || '',
        sourceType: 'conversation',
        sourceRef: scenarioId,
        sourceLabel: activeScenarioTitle,
        reason: t('conversation.savedReplyReason', 'Saved from conversation practice.'),
        metadata: { route: '/conversation', scenarioId },
      });
      setStatus(t('conversation.savedReply', 'Reply saved for review.'));
    } catch {
      setStatus(t('conversation.saveReplyFailed', 'Could not save this reply right now.'));
    }
  };

  const saveRoleplayRecap = async () => {
    if (!userId || !roleplayRecap) return;
    try {
      await learningHubService.saveItem({
        itemType: 'roleplay',
        targetText: roleplayRecap.title,
        nativeText: roleplayRecap.summary || roleplayRecap.goal,
        sourceType: 'conversation',
        sourceRef: scenarioId,
        sourceLabel: roleplayRecap.partner,
        reason: t('conversation.savedRoleplayReason', 'Completed roleplay saved for later practice.'),
        metadata: {
          route: '/conversation',
          scenarioId,
          summary: roleplayRecap.summary,
          goal: roleplayRecap.goal,
          customRoleplay: isCustomScenario ? customRoleplay : undefined,
        },
      });
      setStatus(t('conversation.roleplaySaved', 'Roleplay saved for review.'));
    } catch {
      setStatus(t('conversation.saveRoleplayFailed', 'Could not save this roleplay right now.'));
    }
  };

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
    setStatus(handsFreeCopy(nativeLanguage).stoppedStatus);
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

    if (localizedStopCommands.has(command) || stopCommands.has(command)) {
      const copy = handsFreeCopy(nativeLanguage);
      stopHandsFree();
      await speechService.speakAsync(copy.stoppedSpoken, {
        lang: ttsLocaleFor(nativeLanguage || 'en', 'en'),
        rate: '0.9',
      });
      return true;
    }

    if (localizedRepeatCommands.has(command) || repeatCommands.has(command)) {
      if (lastAssistantRef.current) {
        await speakMessage(lastAssistantRef.current);
      }
      scheduleHandsFreeListening();
      return true;
    }

    if (localizedSlowerCommands.has(command) || slowerCommands.has(command)) {
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
        setStatus(handsFreeCopy(nativeLanguage).unavailable);
        if (autoContinue) {
          handsFreeRef.current = false;
          setHandsFreeActive(false);
        }
        return;
      }

      const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!permission.granted) {
        setStatus(speechErrorMessage({ error: 'permissions' }));
        if (autoContinue) {
          handsFreeRef.current = false;
          setHandsFreeActive(false);
        }
        return;
      }

      await speechService.cancel();
      heardSpeechRef.current = false;
      listeningAutoRef.current = autoContinue;
      finalTranscriptRef.current = '';
      interimTranscriptRef.current = '';
      // Live partial captions in the input box. Auto-stop on pause is kept for
      // hands-free turn-taking — `continuous: true` would block the AI from
      // ever replying.
      ExpoSpeechRecognitionModule.start({
        lang: ttsLocaleFor(targetLanguage || 'ko', targetLanguage || 'ko'),
        interimResults: true,
        continuous: false,
        maxAlternatives: 1,
      });
    } catch {
      setStatus(speechErrorMessage({ error: 'aborted' }));
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
  };

  // Map terse error codes from the speech-recognition module to actionable text.
  const speechErrorMessage = (event: { error?: string } = {}) => {
    const copy = handsFreeCopy(nativeLanguage);
    if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'permissions') return copy.permission;
    if (event.error === 'no-speech') return copy.noSpeech;
    if (event.error === 'audio-capture') return copy.audioCapture;
    if (event.error === 'network') return copy.network;
    if (event.error === 'aborted') return copy.aborted;
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
        return copy.captureFailed;
    }
  };

  const finalTranscriptRef = useRef('');
  const interimTranscriptRef = useRef('');

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
    const copy = handsFreeCopy(nativeLanguage);
    setStatus(copy.starting);

    await speechService.speakAsync(copy.startedSpoken, {
      lang: ttsLocaleFor(nativeLanguage || 'en', 'en'),
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
    setStatus(t('conversation.status.partnerThinking', { defaultValue: 'Practice partner is thinking...' }));
    setHistory((prev) => [...prev.slice(-11), userTurn]);

    try {
      const sessionId = aiSessionIdFor(scenarioId, nativeLanguage || 'en', targetLanguage || 'ko', customRoleplay);
      const response = await aiService.sendConversationTurn({
        sessionId,
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
        lessonId: lessonId || undefined,
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
          t('conversation.status.partnerUnavailableLong', { defaultValue: 'The practice partner is temporarily unavailable. Please try again shortly.' }),
          t('conversation.status.messageKept', { defaultValue: 'Your message was kept on this device.' }),
        );
        setStatus(t('conversation.status.partnerUnavailable', { defaultValue: 'Practice partner is temporarily unavailable.' }));
        return;
      }

      const assistantTurn: Turn = {
        id: turnId('assistant'),
        role: 'assistant',
        content: data.reply || t('conversation.status.tryAgainPrompt', { defaultValue: 'Let me try that again. What would you like to say next?' }),
        language: data.expectedLanguage || targetLanguage || 'target',
        coachingTip: data.coachingTip || '',
        nextSuggestedIntent: data.nextSuggestedIntent || '',
        speechParts: Array.isArray(data.speechParts) ? data.speechParts : [],
        displayParts: Array.isArray(data.displayParts) ? data.displayParts : [],
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
      setStatus(t('conversation.status.partnerReplied', { defaultValue: 'Practice partner replied.' }));
      const roleplayJustCompleted = stored.memory?.roleplayComplete !== true && data.memory?.roleplayComplete === true;
      if (roleplayJustCompleted) {
        const recentAssistantMessages = [
          ...history.filter((message) => message.role === 'assistant' && !message.error),
          assistantTurn,
        ].slice(-3);
        setRoleplayRecap({
          title: activeScenarioTitle,
          partner: uiLabels.activePartner,
          goal: activeScenarioGoal,
          summary: data.summary || '',
          usefulPhrases: recentAssistantMessages.map((message) => message.content).filter(Boolean),
          coachingTips: [
            ...history.map((message) => message.coachingTip).filter(Boolean),
            assistantTurn.coachingTip,
          ].filter((tip): tip is string => Boolean(tip)).slice(-3),
        });
      }
      if (userId) {
        const turnMode = autoContinue ? 'hands_free' : pendingSpeechTurnRef.current ? 'spoken' : 'typed';
        userService.recordLearningEvent(userId, {
          eventType: 'conversation_turn',
          sessionId,
          turnId: userTurn.id,
          mode: turnMode,
          source: scenarioId,
          transcript: text,
          partnerReply: assistantTurn.content,
          targetText: text,
        }).catch(() => {});
        if (roleplayJustCompleted) {
          userService.recordLearningEvent(userId, {
            eventType: 'roleplay_complete',
            sessionId,
            roleplayId: isCustomScenario ? (customRoleplay.id || 'custom') : scenarioId,
            mode: autoContinue ? 'hands_free' : 'typed',
          }).catch(() => {});
        }
      }
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
      pendingSpeechTurnRef.current = false;
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
          ? t('conversation.status.planUnavailable', { defaultValue: 'Conversation practice is not available on this plan.' })
          : t('conversation.status.partnerTrouble', { defaultValue: 'The practice partner had trouble replying. Please try again.' }),
        quotaDenied
          ? quotaLimitCopy(tier, error.response?.data?.tokenUsage?.resetAt).tip
          : planDenied
            ? t('conversation.status.planRefreshed', { defaultValue: 'Your plan settings were refreshed.' })
            : t('conversation.status.messageNotResent', { defaultValue: 'Your message was not sent again.' }),
      );
      setStatus(quotaDenied ? resetMessage : (error.response?.data?.message || t('conversation.status.connectionIssue', { defaultValue: 'Connection issue. Try again in a moment.' })));
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
    setStatus(listeningAutoRef.current ? handsFreeCopy(nativeLanguage).listening : listeningStatus);
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
    if (preview) {
      heardSpeechRef.current = true;
      setTurn(preview);
    }
  });

  useSpeechRecognitionEvent('error', (event) => {
    setListening(false);
    if (listeningAutoRef.current && handsFreeRef.current && event.error === 'no-speech') {
      setStatus(handsFreeCopy(nativeLanguage).stillListening);
      scheduleHandsFreeListening();
      return;
    }

    setStatus(speechErrorMessage(event));
    if (listeningAutoRef.current) {
      handsFreeRef.current = false;
      setHandsFreeActive(false);
      listeningAutoRef.current = false;
    }
  });

  useSpeechRecognitionEvent('end', () => {
    setListening(false);
    const captured = (finalTranscriptRef.current || interimTranscriptRef.current).trim();
    finalTranscriptRef.current = '';
    interimTranscriptRef.current = '';

    // Hands-free: auto-send the captured transcript so the back-and-forth flow
    // keeps going. If nothing was heard, restart listening so the mic stays
    // open between thinking pauses.
    if (listeningAutoRef.current && handsFreeRef.current) {
      if (!captured) {
        scheduleHandsFreeListening();
        return;
      }
      handleHandsFreeCommand(captured)
        .then((handled) => {
          if (!handled) sendTurn(captured, { autoContinue: true }).catch(() => {});
        })
        .catch(() => setStatus(handsFreeCopy(nativeLanguage).commandFailed));
      return;
    }

    // Push-to-talk: leave the transcript in the input for review/edit before
    // sending. Misrecognitions shouldn't be auto-submitted to the AI.
    if (captured) {
      pendingSpeechTurnRef.current = true;
      setTurn(captured);
      setStatus(handsFreeCopy(nativeLanguage).captured);
      return;
    }
    if (!loading) {
      const copy = handsFreeCopy(nativeLanguage);
      setStatus((currentStatus) => (currentStatus === listeningStatus || currentStatus === copy.listening ? readyStatus : currentStatus));
    }
  });

  const renderMessageBody = (message: Turn) => {
    const parts = displayPartsForMessage(message, targetLanguage || 'ko', nativeLanguage || 'en');
    if (parts.length <= 1) {
      return <Text style={styles.messageBody}>{message.content}</Text>;
    }

    return (
      <View style={styles.languageSegments}>
        {parts.map((part, index) => {
          const role = languageRole(part, targetLanguage || 'ko', nativeLanguage || 'en');
          return (
            <View key={`${part.language || 'part'}-${index}`} style={[styles.languageSegment, styles[`${role}LanguageSegment` as const]]}>
              <Text style={styles.languageSegmentLabel}>{segmentLanguageLabel(part)}</Text>
              <Text style={styles.messageBody}>{part.text}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { paddingTop: insets.top + 14 }]}>
        <View style={styles.headerText}>
          <Text style={styles.kicker}>{t('conversation.kicker', 'Conversation Practice')}</Text>
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
                {localizedScenario.shortLabel}
              </Button>
            )}
          >
            {scenarios.map((item) => (
              <Menu.Item
                key={item.id}
                title={scenarioCopyFor(nativeLanguage, item.id).title}
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
        <View style={styles.supportHeader}>
          <Text style={styles.label}>{t('conversation.support', 'Support')}</Text>
          <Text style={styles.memoryText}>
            {memoryScope === 'cloud' ? t('conversation.syncedMemory', 'Synced memory') : memoryScope === 'device' ? t('conversation.deviceMemory', 'Device memory') : t('conversation.noSavedMemory', 'No saved memory')}
          </Text>
        </View>
        <SegmentedButtons
          value={supportLevel}
          onValueChange={setSupportLevel}
          buttons={supportLevels.map(({ value }) => ({ value, label: supportLabelFor(nativeLanguage, value) }))}
          style={styles.segmented}
        />
        <View style={styles.supportAdjustRow}>
          <Button mode="outlined" compact disabled={supportIndex <= 0} onPress={() => shiftSupportLevel(-1)}>
            {t('conversation.easier', 'Easier')}
          </Button>
          <Button mode="outlined" compact disabled={supportIndex >= supportLevels.length - 1} onPress={() => shiftSupportLevel(1)}>
            {t('conversation.harder', 'Harder')}
          </Button>
        </View>
        <View style={styles.brief}>
          <View style={styles.briefRow}>
            <View style={styles.briefColumn}>
              <Text style={styles.briefLabel}>{uiLabels.partner}</Text>
              <Text style={styles.briefText}>{uiLabels.activePartner}</Text>
            </View>
            <View style={styles.briefAccent} />
          </View>
          <Text style={styles.briefLabel}>{uiLabels.goal}</Text>
          <Text style={styles.briefText}>{activeScenarioGoal}</Text>
          {isCustomScenario && !!customRoleplay.situation && (
            <>
              <Text style={styles.briefLabel}>{customSetupCopy(nativeLanguage).situationLabel}</Text>
              <Text style={styles.briefText}>{customRoleplay.situation}</Text>
            </>
          )}
        </View>
        <View style={styles.modeActions}>
          <Button
            mode={speechEnabled ? 'contained-tonal' : 'outlined'}
            compact
            icon={speechEnabled ? 'volume-high' : 'volume-off'}
            onPress={() => setSpeechEnabled((enabled) => !enabled)}
            style={styles.modeButton}
            labelStyle={styles.modeButtonLabel}
          >
            {speechEnabled ? t('conversation.spokenRepliesOn', 'Spoken replies on') : t('conversation.spokenRepliesOff', 'Spoken replies off')}
          </Button>
          <Button
            mode={handsFreeActive ? 'contained-tonal' : 'outlined'}
            compact
            icon={handsFreeActive ? 'microphone-off' : 'microphone'}
            onPress={handsFreeActive ? stopHandsFree : () => startHandsFree().catch(() => setStatus(handsFreeCopy(nativeLanguage).captureFailed))}
            disabled={!canUseAI || quotaExceeded || loading}
            style={styles.modeButton}
            labelStyle={styles.modeButtonLabel}
          >
            {handsFreeActive ? t('conversation.stopHandsFree', 'Stop hands-free') : t('conversation.handsFree', 'Hands-free')}
          </Button>
        </View>
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
        {contextPracticeActions.length > 0 && (
          <>
            <Text style={styles.contextStarterHeader}>{t('conversation.personalizedForYou', 'Personalized for you')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contextStarters}>
              {contextPracticeActions.map((item) => (
                <Button
                  key={item.key}
                  mode="contained-tonal"
                  compact
                  onPress={() => sendTurn(item.prompt || '')}
                  disabled={loading || !canUseAI || quotaExceeded}
                  style={styles.contextStarterButton}
                  labelStyle={styles.starterLabel}
                >
                  {item.label}
                </Button>
              ))}
            </ScrollView>
          </>
        )}
      </View>

      <View style={styles.threadShell}>
        <View style={styles.threadHeader}>
          <View>
            <Text style={styles.threadKicker}>{t('conversation.practiceThread', 'Practice thread')}</Text>
            <Text style={styles.threadTitle}>{uiLabels.activePartner}</Text>
          </View>
          <View style={[styles.liveDot, (listening || handsFreeActive || loading) && styles.liveDotActive]} />
        </View>
        <ScrollView ref={scrollRef} style={styles.thread} contentContainerStyle={styles.threadContent}>
          {!canUseAI && (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>{t('conversation.notAvailableTitle', 'Conversation Practice is not available on this plan.')}</Text>
              <Text style={styles.emptyText}>{t('conversation.notAvailableBody', 'Daily conversation practice is available on Free, Plus, and Pro.')}</Text>
            </View>
          )}
          {canUseAI && quotaExceeded && (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>{quotaCopy.title}</Text>
              <Text style={styles.emptyText}>{quotaCopy.body}</Text>
            </View>
          )}
          {canUseAI && !quotaExceeded && history.length === 0 && !loading && (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>{t('conversation.beginScenario', { scenario: activeScenarioTitle.toLowerCase(), defaultValue: 'Begin {{scenario}}' })}</Text>
              <Text style={styles.emptyText}>{t('conversation.partnerReady', { partner: uiLabels.activePartner, defaultValue: '{{partner}} is ready.' })}</Text>
            </View>
          )}
          {roleplayRecap && (
            <View style={styles.recapCard}>
              <View style={styles.recapText}>
                <Text style={styles.recapTitle}>{t('conversation.recapTitle', 'Roleplay complete')}</Text>
                <Text style={styles.recapBody}>{roleplayRecap.summary || roleplayRecap.goal}</Text>
                <View style={styles.recapGrid}>
                  <View style={styles.recapMiniCard}>
                    <Text style={styles.recapMiniLabel}>{t('conversation.recapWentWell', 'What went well')}</Text>
                    <Text style={styles.recapBody}>{roleplayRecap.goal}</Text>
                  </View>
                  <View style={styles.recapMiniCard}>
                    <Text style={styles.recapMiniLabel}>{t('conversation.recapUsefulPhrases', 'Useful phrases')}</Text>
                    <Text style={styles.recapBody}>{roleplayRecap.usefulPhrases?.[0] || roleplayRecap.summary}</Text>
                  </View>
                  <View style={styles.recapMiniCard}>
                    <Text style={styles.recapMiniLabel}>{t('conversation.recapReview', 'Review next')}</Text>
                    <Text style={styles.recapBody}>{roleplayRecap.coachingTips?.[0] || t('conversation.recapReviewFallback', 'Save one phrase and reuse it in another practice mode.')}</Text>
                  </View>
                </View>
              </View>
              {!!userId && (
                <Button mode="outlined" compact icon="bookmark-outline" onPress={saveRoleplayRecap}>
                  {t('conversation.saveRoleplay', 'Save roleplay')}
                </Button>
              )}
            </View>
          )}
          {history.map((message) => (
            <Card
              key={message.id}
              style={[
                styles.message,
                message.role === 'assistant' && styles.assistantMessage,
                message.role === 'user' && styles.userMessage,
                message.error && styles.errorMessage,
              ]}
            >
              <Card.Content style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.messageLabel}>{message.role === 'user' ? uiLabels.activeLearner : uiLabels.activePartner}</Text>
                  <View style={styles.messageTools}>
                    {!!userId && message.role === 'assistant' && !message.error && (
                      <Button
                        mode="text"
                        compact
                        icon="bookmark-outline"
                        onPress={() => saveAssistantTurn(message)}
                        labelStyle={styles.replayLabel}
                      >
                        {t('conversation.saveReply', 'Save')}
                      </Button>
                    )}
                    {message.role === 'assistant' && !message.error && (
                      <Button
                        mode="text"
                        compact
                        icon="volume-high"
                        onPress={() => speakMessage(message)}
                        labelStyle={styles.replayLabel}
                      >
                        {t('conversation.play', 'Play')}
                      </Button>
                    )}
                    {!!message.language && <Text style={styles.languageTag}>{message.language}</Text>}
                  </View>
                </View>
                {renderMessageBody(message)}
                {!!message.coachingTip && <Text style={styles.messageTip}>{message.coachingTip}</Text>}
              </Card.Content>
            </Card>
          ))}
          {loading && (
            <Card style={[styles.message, styles.assistantMessage]}>
              <Card.Content style={styles.messageContent}>
                <Text style={styles.messageLabel}>{uiLabels.activePartner}</Text>
                <Text style={styles.messageBody}>{t('conversation.thinking', 'Thinking...')}</Text>
              </Card.Content>
            </Card>
          )}
        </ScrollView>
      </View>

      <View style={[styles.composer, { paddingBottom: insets.bottom + 10 }]}>
        <TextInput
          mode="outlined"
          value={turn}
          onChangeText={(value) => {
            pendingSpeechTurnRef.current = false;
            setTurn(value);
          }}
          placeholder={canUseAI ? t('conversation.typeYourTurn', 'Type your turn...') : t('conversation.notAvailableTitle', 'Conversation Practice is not available on this plan.')}
          multiline
          disabled={!canUseAI || quotaExceeded}
          style={styles.input}
        />
        <View style={styles.actions}>
          <Button mode="outlined" onPress={resetConversation} style={styles.actionButton}>
            {t('conversation.reset', 'Reset')}
          </Button>
          <Button
            mode="outlined"
            icon={listening ? 'microphone-off' : 'microphone'}
            onPress={listening ? stopListening : () => startListening().catch(() => setStatus(t('conversation.couldNotStartSpeech', 'Could not start speech input.')))}
            disabled={!canUseAI || quotaExceeded || loading || handsFreeActive}
            style={styles.actionButton}
          >
            {listening ? t('conversation.stop', 'Stop') : t('conversation.speak', 'Speak')}
          </Button>
          <Button mode="contained" onPress={() => sendTurn()} disabled={!turn.trim() || loading || !canUseAI || quotaExceeded} loading={loading} style={styles.actionButton}>
            {t('conversation.send', 'Send')}
          </Button>
        </View>
        <Text style={styles.status}>{status}</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f6f3ee' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 14,
    paddingHorizontal: 18,
    paddingBottom: 14,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerText: { flex: 1 },
  kicker: { color: colors.primary, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  title: { color: colors.textPrimary, fontSize: 26, lineHeight: 31, fontWeight: '800', marginTop: 2 },
  subtitle: { color: colors.textSecondary, marginTop: 3, fontSize: 14 },
  headerActions: { alignItems: 'flex-end', gap: 8, minWidth: 88 },
  scenarioMenuButton: {
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  scenarioMenuLabel: { fontSize: 12, fontWeight: '800', marginHorizontal: 2 },
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
  controls: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 7,
  },
  label: { color: colors.textSecondary, fontSize: 12, fontWeight: '800' },
  segmented: { marginBottom: 2 },
  supportAdjustRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  brief: {
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fffaf5',
    borderWidth: 1,
    borderColor: '#eadfce',
  },
  briefRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  briefColumn: { flex: 1 },
  briefAccent: {
    width: 34,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.primary,
    opacity: 0.55,
  },
  briefLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '800', textTransform: 'uppercase', marginTop: 4 },
  briefText: { color: colors.textPrimary, fontWeight: '700', marginTop: 2, lineHeight: 19 },
  memoryText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  modeActions: { flexDirection: 'row', gap: 8, marginTop: 10 },
  modeButton: { flex: 1, borderRadius: 8 },
  modeButtonLabel: { fontSize: 12, fontWeight: '800', marginHorizontal: 0 },
  speechToggle: { marginTop: 10, borderRadius: 8 },
  handsFreeNote: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 7 },
  starters: { gap: 8, paddingTop: 10, paddingRight: 16 },
  starterButton: {
    borderRadius: 999,
    borderColor: 'rgba(255, 107, 53, 0.22)',
    backgroundColor: '#fffdf9',
  },
  contextStarterHeader: {
    color: colors.accentBlue,
    fontSize: 10,
    fontWeight: '900',
    marginTop: 10,
    textTransform: 'uppercase',
  },
  contextStarters: { gap: 8, paddingTop: 7, paddingRight: 16 },
  contextStarterButton: {
    borderRadius: 999,
    backgroundColor: 'rgba(28, 176, 246, 0.1)',
  },
  starterLabel: { fontSize: 12, fontWeight: '800', marginHorizontal: 4 },
  threadShell: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#dce8f3',
    backgroundColor: colors.surface,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  threadHeader: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e6edf5',
    backgroundColor: '#fbfdff',
  },
  threadKicker: { color: colors.accentBlue, fontSize: 10, fontWeight: '900', textTransform: 'uppercase' },
  threadTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '800', marginTop: 1 },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.textMuted,
    opacity: 0.45,
  },
  liveDotActive: { backgroundColor: colors.accentGreen, opacity: 1 },
  thread: { flex: 1, backgroundColor: '#f8fbff' },
  threadContent: { padding: 12, paddingBottom: 18 },
  recapCard: {
    gap: 10,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(88, 204, 2, 0.28)',
    backgroundColor: 'rgba(88, 204, 2, 0.08)',
  },
  recapText: { gap: 3 },
  recapTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '900' },
  recapBody: { color: colors.textSecondary, lineHeight: 20 },
  recapGrid: { gap: 8, marginTop: 8 },
  recapMiniCard: { gap: 2, padding: 10, borderRadius: 10, backgroundColor: colors.surface },
  recapMiniLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '800' },
  empty: { minHeight: 220, justifyContent: 'center', alignItems: 'center', gap: 6, paddingHorizontal: 20 },
  emptyTitle: { color: colors.textPrimary, fontWeight: '800', fontSize: 16, textAlign: 'center' },
  emptyText: { color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  message: {
    maxWidth: '92%',
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: colors.surface,
    elevation: 1,
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    borderTopLeftRadius: 5,
    backgroundColor: '#fff8ef',
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderTopRightRadius: 5,
    backgroundColor: '#e9f7ff',
    borderWidth: 1,
    borderColor: 'rgba(28, 176, 246, 0.22)',
  },
  errorMessage: { borderWidth: 1, borderColor: colors.error, backgroundColor: '#fff1f1' },
  messageContent: { paddingHorizontal: 12, paddingVertical: 11 },
  messageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  messageLabel: { color: colors.textSecondary, fontSize: 10, fontWeight: '900', textTransform: 'uppercase', marginBottom: 6 },
  messageTools: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  replayLabel: { fontSize: 11, marginHorizontal: 0 },
  languageTag: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: '#fff0e8',
    overflow: 'hidden',
  },
  messageBody: { color: colors.textPrimary, fontSize: 15, lineHeight: 22 },
  languageSegments: { gap: 8 },
  languageSegment: {
    borderWidth: 1,
    borderLeftWidth: 4,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 9,
    backgroundColor: colors.surface,
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
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  messageTip: {
    color: colors.textSecondary,
    marginTop: 9,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.64)',
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.12)',
    lineHeight: 18,
  },
  composer: {
    paddingHorizontal: 12,
    paddingTop: 10,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  input: { backgroundColor: colors.surface, maxHeight: 104, minHeight: 54 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 8 },
  actionButton: { flex: 1, borderRadius: 8 },
  status: { color: colors.textSecondary, fontSize: 12, marginTop: 8 },
});

export default ConversationScreen;
