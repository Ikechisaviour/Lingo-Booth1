import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiBookmark, FiMic, FiRefreshCw, FiSend, FiShield, FiVolume2, FiVolumeX, FiWifiOff } from 'react-icons/fi';
import { aiService, learningHubService, practiceContextService, userService } from '../services/api';
import speechService from '../services/speechService';
import LANGUAGES, { getLanguageDisplayName } from '../config/languages';
import {
  displayPartsForMessage,
  languageLabel as segmentLanguageLabel,
  languageRole,
  spokenPartsForMessage,
} from '../utils/languageSegments';
import {
  CONVERSATION_REPEAT_COMMANDS,
  CONVERSATION_SLOWER_COMMANDS,
  CONVERSATION_STOP_COMMANDS,
  conversationVoiceForLocale,
  handsFreeCopy,
} from '../utils/conversationSpeech';
import { normalizeLanguageCode } from '../utils/languagePairPolicy';
import './ConversationPage.css';

const SESSION_ID = 'learner-conversation';
const LEGACY_STORAGE_KEY = `lingoConversation:${SESSION_ID}`;
const CUSTOM_SCENARIO_ID = 'custom';
const CUSTOM_SETUP_STEPS = ['learnerRole', 'partnerRole', 'situation', 'goal'];

const SCENARIOS = [
  {
    id: 'cafe',
    title: 'Ordering at a cafe',
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

const SUPPORT_LEVELS = [
  { id: 'guided', difficulty: 'friendly beginner with brief native-language support' },
  { id: 'balanced', difficulty: 'balanced natural conversation' },
  { id: 'natural', difficulty: 'natural conversation with minimal coaching' },
];

const CONVERSATION_COPY = {
  en: {
    supportLevels: {
      guided: 'Guided',
      balanced: 'Balanced',
      natural: 'Natural',
    },
    labels: {
      learner: 'You',
      partner: 'Partner',
      goal: 'Goal',
      conversationPartner: 'Conversation partner',
      practiceRoleplay: 'Practice roleplay',
      reviewDrill: 'Review drill',
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
    scenarios: {
      cafe: {
        title: 'Ordering at a cafe',
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
      directions: {
        title: 'Asking for directions',
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
      introductions: {
        title: 'Meeting someone new',
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
      hotel: {
        title: 'Checking into a hotel',
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
      custom: {
        title: 'Custom roleplay',
        partner: 'Conversation partner',
        goal: 'Build your own roleplay by choosing the roles, situation, and goal.',
        starters: [],
        followUps: [
          'Start the roleplay.',
          'Ask me the first question.',
          'Start a new custom roleplay.',
        ],
      },
    },
    status: {
      ready: 'Ready',
      personalizedStarterReady: 'Personalized starter ready. Press Send to begin.',
      savedAccessSettings: 'Using saved access settings.',
      speechStopped: 'Speech stopped.',
      conversationReset: 'Conversation reset.',
      customRoleplayReady: 'Custom roleplay is ready.',
      planUnavailable: 'Conversation practice is not available on this plan.',
      partnerThinking: 'Practice partner is thinking...',
      partnerUnavailable: 'Practice partner is temporarily unavailable.',
      partnerReplied: 'Practice partner replied.',
      connectionIssue: 'Connection issue. Try again in a moment.',
      listening: 'Listening...',
      microphoneBlocked: 'Microphone permission is blocked. Open your browser site settings, allow the microphone, then reload this page.',
      noSpeech: 'No speech was heard. Try again after the listening indicator appears.',
      noMicrophone: 'No microphone detected. Plug in or enable a microphone, then try again.',
      speechNetwork: 'Network error during speech recognition. Check your connection and try again.',
      speechCancelled: 'Speech input was cancelled.',
    },
  },
  ko: {
    supportLevels: {
      guided: '안내형',
      balanced: '균형형',
      natural: '자연형',
    },
    labels: {
      learner: '나',
      partner: '상대',
      goal: '목표',
      conversationPartner: '대화 상대',
      practiceRoleplay: '역할극 연습',
      reviewDrill: '복습 연습',
    },
    roles: {
      customer: '손님',
      cafeStaff: '카페 직원',
      traveler: '여행자',
      localGuide: '현지 안내자',
      learnerSelf: '나',
      newAcquaintance: '처음 만난 사람',
      guest: '투숙객',
      frontDesk: '호텔 프런트 직원',
    },
    scenarios: {
      cafe: {
        title: '카페에서 주문하기',
        partner: '카페 직원',
        goal: '주문하고, 세부 사항을 바꾸고, 준비될 내용을 확인합니다.',
        starters: [
          '카페 역할극을 시작해 주세요.',
          '오늘 무엇을 추천하시나요?',
          '음료를 주문하고 싶어요.',
        ],
        followUps: [
          '다음 질문을 해 주세요.',
          '더 자연스럽게 말하려면 어떻게 하나요?',
          '제가 무엇을 주문했는지 알려 주세요.',
        ],
      },
      directions: {
        title: '길 묻기',
        partner: '현지 안내자',
        goal: '목적지를 묻고, 주요 지점을 이해하고, 가는 길을 확인합니다.',
        starters: [
          '길 묻기 역할극을 시작해 주세요.',
          '역을 찾는 데 도움이 필요해요.',
          '제가 어디에 가고 싶은지 물어봐 주세요.',
        ],
        followUps: [
          '한 번에 한 방향씩 알려 주세요.',
          '더 쉬운 말로 설명해 주세요.',
          '얼마나 걸리나요?',
        ],
      },
      introductions: {
        title: '처음 만난 사람과 대화하기',
        partner: '처음 만난 사람',
        goal: '인사하고, 기본 정보를 주고받고, 자연스럽게 대화를 이어 갑니다.',
        starters: [
          '첫 만남 역할극을 시작해 주세요.',
          '저에 대해 질문해 주세요.',
          '자연스럽게 자기소개하도록 도와주세요.',
        ],
        followUps: [
          '후속 질문을 해 주세요.',
          '제 대답을 더 자연스럽게 바꿔 주세요.',
          '다음에는 무엇을 물어보면 좋을까요?',
        ],
      },
      hotel: {
        title: '호텔 체크인하기',
        partner: '호텔 프런트 직원',
        goal: '체크인하고, 질문에 답하고, 객실 정보를 확인합니다.',
        starters: [
          '호텔 체크인 역할극을 시작해 주세요.',
          '체크인하고 싶어요.',
          '예약 정보를 물어봐 주세요.',
        ],
        followUps: [
          '한 번에 한 가지 정보씩 물어봐 주세요.',
          '더 쉽게 다시 말해 주세요.',
          '지금까지 어떤 객실 정보를 확인했나요?',
        ],
      },
      custom: {
        title: '맞춤 역할극',
        partner: '대화 상대',
        goal: '역할, 상황, 목표를 정해서 나만의 역할극을 만듭니다.',
        starters: [],
        followUps: [
          '역할극을 시작해 주세요.',
          '첫 번째 질문을 해 주세요.',
          '새 맞춤 역할극을 시작해 주세요.',
        ],
      },
    },
    status: {
      ready: '준비됨',
      personalizedStarterReady: '맞춤 시작 문장이 준비되었습니다. 보내기를 눌러 시작하세요.',
      savedAccessSettings: '저장된 이용 설정을 사용합니다.',
      speechStopped: '음성이 중지되었습니다.',
      conversationReset: '대화가 초기화되었습니다.',
      customRoleplayReady: '맞춤 역할극이 준비되었습니다.',
      planUnavailable: '이 플랜에서는 회화 연습을 사용할 수 없습니다.',
      partnerThinking: '연습 파트너가 생각 중입니다...',
      partnerUnavailable: '연습 파트너가 잠시 응답할 수 없습니다.',
      partnerReplied: '연습 파트너가 응답했습니다.',
      connectionIssue: '연결 문제가 있습니다. 잠시 후 다시 시도해 주세요.',
      listening: '듣고 있습니다...',
      microphoneBlocked: '마이크 권한이 차단되어 있습니다. 브라우저 사이트 설정에서 마이크를 허용한 뒤 페이지를 새로고침하세요.',
      noSpeech: '음성이 들리지 않았습니다. 듣기 표시가 나타난 뒤 다시 말해 주세요.',
      noMicrophone: '마이크를 감지하지 못했습니다. 마이크를 연결하거나 활성화한 뒤 다시 시도해 주세요.',
      speechNetwork: '음성 인식 중 네트워크 오류가 발생했습니다. 연결을 확인하고 다시 시도해 주세요.',
      speechCancelled: '음성 입력이 취소되었습니다.',
    },
  },
};

const CUSTOM_SETUP_COPY = {
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

const KOREAN_CUSTOM_SETUP_COPY = {
  setupLabel: '맞춤 설정',
  learnerRole: '어떤 역할을 하고 싶나요?',
  partnerRole: '누가 함께하나요? 저는 어떤 역할을 할까요?',
  situation: '이 역할극의 상황이나 장소는 무엇인가요?',
  goal: '이 대화에서 목표는 무엇인가요?',
  ready: ({ learnerRole, partnerRole }) => `준비됐어요. 당신은 ${learnerRole} 역할이고, 저는 ${partnerRole} 역할입니다. 준비되면 시작하세요.`,
  restart: '좋아요. 새 맞춤 역할극을 설정해 봅시다. 어떤 역할을 하고 싶나요?',
  newRoleplay: '새 맞춤 역할극',
  situationLabel: '상황',
};

function roleStateForMemory(memory = {}) {
  return memory?.roleState && typeof memory.roleState === 'object' ? memory.roleState : null;
}

function conversationCopyFor(nativeLanguage) {
  const language = normalizeLanguageCode(nativeLanguage);
  return CONVERSATION_COPY[language] || CONVERSATION_COPY.en;
}

function scenarioCopyFor(nativeLanguage, scenarioId) {
  const copy = conversationCopyFor(nativeLanguage);
  return copy.scenarios[scenarioId] || CONVERSATION_COPY.en.scenarios[scenarioId] || CONVERSATION_COPY.en.scenarios.cafe;
}

function supportLabelFor(nativeLanguage, supportId) {
  const copy = conversationCopyFor(nativeLanguage);
  return copy.supportLevels[supportId] || CONVERSATION_COPY.en.supportLevels[supportId] || supportId;
}

function labelsFor(nativeLanguage, scenarioId, roleState = null) {
  const copy = conversationCopyFor(nativeLanguage);
  const fallbackPartner = scenarioCopyFor(nativeLanguage, scenarioId).partner || copy.labels.conversationPartner;
  const roleLabel = (roleKey, rawRole) => copy.roles?.[roleKey] || CONVERSATION_COPY.en.roles[roleKey] || rawRole || roleKey;
  const learnerRole = roleState?.learnerRoleKey ? roleLabel(roleState.learnerRoleKey, roleState.learnerRole) : '';
  const partnerRole = roleState?.partnerRoleKey ? roleLabel(roleState.partnerRoleKey, roleState.partnerRole) : fallbackPartner;

  return {
    ...copy.labels,
    activeLearner: learnerRole && learnerRole !== copy.labels.learner ? `${copy.labels.learner} · ${learnerRole}` : copy.labels.learner,
    activePartner: partnerRole,
  };
}

function displayLabelsFor(nativeLanguage, scenarioId, roleState = null) {
  const labels = labelsFor(nativeLanguage, scenarioId, roleState);
  if (!roleState?.learnerRoleKey) return labels;
  const copy = conversationCopyFor(nativeLanguage);
  const roleLabel = copy.roles?.[roleState.learnerRoleKey]
    || CONVERSATION_COPY.en.roles[roleState.learnerRoleKey]
    || roleState.learnerRole
    || roleState.learnerRoleKey;

  return {
    ...labels,
    activeLearner: roleLabel && roleLabel !== copy.labels.learner ? `${copy.labels.learner} - ${roleLabel}` : copy.labels.learner,
  };
}

function customSetupCopy(nativeLanguage) {
  const language = normalizeLanguageCode(nativeLanguage);
  if (language === 'ko') return KOREAN_CUSTOM_SETUP_COPY;
  return CUSTOM_SETUP_COPY[language] || CUSTOM_SETUP_COPY.en;
}

function customRoleplayFromMemory(memory = {}) {
  const customRoleplay = memory?.customRoleplay;
  return customRoleplay && typeof customRoleplay === 'object' && !Array.isArray(customRoleplay)
    ? customRoleplay
    : {};
}

function completeCustomRoleplay(customRoleplay = {}) {
  return CUSTOM_SETUP_STEPS.every(step => String(customRoleplay[step] || '').trim());
}

function nextCustomSetupStep(customRoleplay = {}) {
  return CUSTOM_SETUP_STEPS.find(step => !String(customRoleplay[step] || '').trim()) || null;
}

function customRoleplayTitle(customRoleplay = {}) {
  if (customRoleplay.title) return customRoleplay.title;
  if (customRoleplay.learnerRole && customRoleplay.partnerRole) {
    return `${customRoleplay.learnerRole} and ${customRoleplay.partnerRole}`;
  }
  return 'Custom roleplay';
}

function customRoleState(customRoleplay = {}) {
  if (!completeCustomRoleplay(customRoleplay)) return null;
  return {
    scenarioKey: 'custom',
    learnerRoleKey: 'customLearner',
    partnerRoleKey: 'customPartner',
    learnerRole: customRoleplay.learnerRole,
    partnerRole: customRoleplay.partnerRole,
  };
}

function setupAssistantTurn(content, nativeLanguage) {
  return {
    id: turnId('assistant'),
    role: 'assistant',
    content,
    language: nativeLanguage,
    setup: true,
    speechParts: [{ language: nativeLanguage, text: content }],
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

function languagePairKey(nativeLanguage, targetLanguage) {
  return `${nativeLanguage || 'native'}-${targetLanguage || 'target'}`
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-');
}

function storageKeyFor(scenarioId, nativeLanguage, targetLanguage) {
  return `lingoConversation:${SESSION_ID}:${languagePairKey(nativeLanguage, targetLanguage)}:${scenarioId || 'cafe'}`;
}

function sessionIdFor(scenarioId, nativeLanguage, targetLanguage) {
  return `${SESSION_ID}:${languagePairKey(nativeLanguage, targetLanguage)}:${scenarioId || 'cafe'}`;
}

function aiSessionIdFor(scenarioId, nativeLanguage, targetLanguage, customRoleplay = {}) {
  const baseSessionId = sessionIdFor(scenarioId, nativeLanguage, targetLanguage);
  if (scenarioId !== CUSTOM_SCENARIO_ID || !customRoleplay?.id) return baseSessionId;
  const customId = String(customRoleplay.id)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .slice(0, 80);
  return `${baseSessionId}:${customId}`;
}

function normalizeEntitlements(entitlements = {}) {
  if (localStorage.getItem('userRole') === 'admin') {
    return {
      ...entitlements,
      subscriptionTier: 'pro',
      canUseAI: true,
      canSyncAIMemory: true,
      canUsePracticeContext: true,
      aiMemoryScope: 'cloud',
    };
  }
  return entitlements;
}

function getStoredEntitlements() {
  try {
    return normalizeEntitlements(JSON.parse(localStorage.getItem('aiEntitlements') || '{}'));
  } catch (_) {
    return normalizeEntitlements({});
  }
}

function tierFromEntitlements(entitlements = {}) {
  if (localStorage.getItem('userRole') === 'admin') return 'pro';
  if (entitlements.subscriptionTier) return entitlements.subscriptionTier;
  const storedTier = localStorage.getItem('subscriptionTier');
  return localStorage.getItem('token') ? (storedTier || 'plus') : 'free';
}

function isProOrUltraTier(tier) {
  return ['pro', 'ultra'].includes(String(tier || '').toLowerCase());
}

function canUsePracticeContext(entitlements = {}) {
  return Boolean(
    entitlements.canUsePracticeContext
    || isProOrUltraTier(tierFromEntitlements(entitlements))
    || isProOrUltraTier(localStorage.getItem('subscriptionTier')),
  );
}

function memoryScopeFor(entitlements = {}) {
  const tier = tierFromEntitlements(entitlements);
  const storedTier = localStorage.getItem('subscriptionTier');
  if (entitlements.canSyncAIMemory || isProOrUltraTier(tier) || isProOrUltraTier(storedTier)) return 'cloud';
  if (entitlements.aiMemoryScope) return entitlements.aiMemoryScope;
  if (entitlements.canUseAI === false || tier === 'free') return 'none';
  return 'device';
}

function loadMemory(scenarioId, nativeLanguage, targetLanguage) {
  try {
    const raw = localStorage.getItem(storageKeyFor(scenarioId, nativeLanguage, targetLanguage));
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
}

function saveMemory(scenarioId, nativeLanguage, targetLanguage, data = {}) {
  localStorage.setItem(storageKeyFor(scenarioId, nativeLanguage, targetLanguage), JSON.stringify({
    summary: data.summary || '',
    memory: data.memory || {},
    history: Array.isArray(data.history) ? data.history.slice(-12) : [],
  }));
}

function loadHistory(scenarioId, nativeLanguage, targetLanguage) {
  const stored = loadMemory(scenarioId, nativeLanguage, targetLanguage);
  if (!Array.isArray(stored.history)) return [];
  return stored.history
    .filter(turn => turn && ['user', 'assistant'].includes(turn.role) && turn.content)
    .slice(-12)
    .map((turn, index) => ({ ...turn, id: `${turn.role}-${index}-${Date.now()}` }));
}

function turnId(role) {
  return `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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

function formatResetCountdown(resetAt, now = Date.now()) {
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

function quotaLimitCopy(tier = 'free', resetAt, now = Date.now()) {
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

function normalizeVoiceCommand(value = '') {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .trim();
}

const STOP_COMMANDS = new Set([
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

const REPEAT_COMMANDS = new Set([
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

const SLOWER_COMMANDS = new Set([
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

const LOCALIZED_STOP_COMMANDS = new Set(CONVERSATION_STOP_COMMANDS.map(normalizeVoiceCommand));
const LOCALIZED_REPEAT_COMMANDS = new Set(CONVERSATION_REPEAT_COMMANDS.map(normalizeVoiceCommand));
const LOCALIZED_SLOWER_COMMANDS = new Set(CONVERSATION_SLOWER_COMMANDS.map(normalizeVoiceCommand));
const scenarioIds = new Set(SCENARIOS.map((item) => item.id));

function ConversationPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const userId = localStorage.getItem('userId');
  const lessonId = searchParams.get('lessonId') || '';
  const requestedScenarioId = searchParams.get('scenario') || '';
  const [scenarioId, setScenarioId] = useState(() => (
    scenarioIds.has(requestedScenarioId) ? requestedScenarioId : SCENARIOS[0].id
  ));
  const [supportLevel, setSupportLevel] = useState(SUPPORT_LEVELS[0].id);
  const [turn, setTurn] = useState('');
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState(() => conversationCopyFor(normalizeLanguageCode(localStorage.getItem('nativeLanguage')) || 'en').status.ready);
  const [statusTone, setStatusTone] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [entitlements, setEntitlements] = useState(getStoredEntitlements);
  const [listening, setListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [handsFreeActive, setHandsFreeActive] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);
  const [roleState, setRoleState] = useState(null);
  const [customRoleplay, setCustomRoleplay] = useState({});
  const [contextRecommendations, setContextRecommendations] = useState(null);
  const [countdownNow, setCountdownNow] = useState(Date.now());
  const [roleplayRecap, setRoleplayRecap] = useState(null);
  const threadRef = useRef(null);
  const recognitionRef = useRef(null);
  const handsFreeRef = useRef(false);
  const restartTimerRef = useRef(null);
  const lastAssistantRef = useRef(null);
  const pendingSpeechTurnRef = useRef(false);

  const isCustomScenario = scenarioId === CUSTOM_SCENARIO_ID;
  const customIsReady = isCustomScenario && completeCustomRoleplay(customRoleplay);
  const support = useMemo(
    () => SUPPORT_LEVELS.find(item => item.id === supportLevel) || SUPPORT_LEVELS[0],
    [supportLevel],
  );
  const supportIndex = SUPPORT_LEVELS.findIndex((item) => item.id === supportLevel);
  const shiftSupportLevel = (direction) => {
    const nextIndex = Math.max(0, Math.min(SUPPORT_LEVELS.length - 1, supportIndex + direction));
    setSupportLevel(SUPPORT_LEVELS[nextIndex].id);
  };

  const nativeLanguage = normalizeLanguageCode(localStorage.getItem('nativeLanguage')) || 'en';
  const targetLanguage = normalizeLanguageCode(localStorage.getItem('targetLanguage')) || 'ko';
  const conversationCopy = useMemo(() => conversationCopyFor(nativeLanguage), [nativeLanguage]);
  const statusCopy = conversationCopy.status;
  const promptFromReview = searchParams.get('prompt') || '';

  useEffect(() => {
    if (promptFromReview && !turn) {
      setTurn(promptFromReview);
    }
  }, [promptFromReview, turn]);
  const localizedScenario = useMemo(
    () => scenarioCopyFor(nativeLanguage, scenarioId),
    [nativeLanguage, scenarioId],
  );
  const supportLabel = useMemo(
    () => supportLabelFor(nativeLanguage, supportLevel),
    [nativeLanguage, supportLevel],
  );
  const uiLabels = useMemo(
    () => displayLabelsFor(nativeLanguage, scenarioId, roleState),
    [nativeLanguage, scenarioId, roleState],
  );
  const tier = tierFromEntitlements(entitlements);
  const memoryScope = memoryScopeFor(entitlements);
  const canUseAI = entitlements.canUseAI !== false;
  const canUsePracticeContextFeature = canUsePracticeContext(entitlements);
  const tokenUsage = entitlements.tokenUsage || null;
  const quotaExceeded = Boolean(tokenUsage?.quotaExceeded || entitlements.canSendAI === false);
  const quotaCopy = quotaLimitCopy(tier, tokenUsage?.resetAt, countdownNow);
  const speechSupported = !!getSpeechRecognition();

  const languageLabel = useMemo(() => {
    const target = getLanguageDisplayName(targetLanguage, t) || targetLanguage;
    const native = getLanguageDisplayName(nativeLanguage, t) || nativeLanguage;
    return `${native} -> ${target}`;
  }, [nativeLanguage, targetLanguage, t]);

  const activeScenarioTitle = isCustomScenario && customIsReady
    ? customRoleplayTitle(customRoleplay)
    : localizedScenario.title;

  useEffect(() => {
    const storedNative = localStorage.getItem('nativeLanguage');
    const storedTarget = localStorage.getItem('targetLanguage');
    if (storedNative && storedNative !== nativeLanguage) localStorage.setItem('nativeLanguage', nativeLanguage);
    if (storedTarget && storedTarget !== targetLanguage) localStorage.setItem('targetLanguage', targetLanguage);
  }, [nativeLanguage, targetLanguage]);

  useEffect(() => {
    if (!scenarioIds.has(requestedScenarioId) || requestedScenarioId === scenarioId) return;
    setScenarioId(requestedScenarioId);
  }, [requestedScenarioId, scenarioId]);

  const activeScenarioGoal = isCustomScenario
    ? (customRoleplay.goal || localizedScenario.goal)
    : localizedScenario.goal;

  const quickTurns = useMemo(() => {
    if (!canUseAI || quotaExceeded) return [];
    if (isCustomScenario && !customIsReady) return [];
    if (isCustomScenario && customIsReady) {
      const latestAssistant = [...history].reverse().find(message => message.role === 'assistant' && !message.error);
      if (latestAssistant?.nextSuggestedIntent) return [latestAssistant.nextSuggestedIntent, ...localizedScenario.followUps].slice(0, 3);
      return (history.length ? localizedScenario.followUps : localizedScenario.followUps.slice(0, 1)).slice(0, 3);
    }
    const latestAssistant = [...history].reverse().find(message => message.role === 'assistant' && !message.error);
    const suggested = latestAssistant?.nextSuggestedIntent;
    if (suggested) return [suggested, ...localizedScenario.followUps].slice(0, 3);
    return (history.length ? localizedScenario.followUps : localizedScenario.starters).slice(0, 3);
  }, [canUseAI, quotaExceeded, history, localizedScenario, isCustomScenario, customIsReady]);

  const contextPracticeActions = useMemo(() => {
    if (!canUsePracticeContextFeature || !contextRecommendations?.hasContext) return [];
    const roleplays = (contextRecommendations.roleplays || []).slice(0, 2).map((item) => ({
      key: `roleplay-${item.prompt}`,
      label: item.title || conversationCopy.labels.practiceRoleplay,
      prompt: item.prompt,
    }));
    const drills = (contextRecommendations.reviewDrills || []).slice(0, 2).map((item) => ({
      key: `drill-${item.prompt}`,
      label: item.text || conversationCopy.labels.reviewDrill,
      prompt: item.prompt,
    }));
    return [...roleplays, ...drills].filter(item => item.prompt);
  }, [canUsePracticeContextFeature, contextRecommendations, conversationCopy]);

  useEffect(() => {
    let savedRoleplay = null;
    try {
      savedRoleplay = JSON.parse(sessionStorage.getItem('lingoSavedRoleplay') || 'null');
    } catch (_) {}
    if (savedRoleplay?.scenarioId === scenarioId && completeCustomRoleplay(savedRoleplay.customRoleplay)) {
      sessionStorage.removeItem('lingoSavedRoleplay');
      const savedCustom = savedRoleplay.customRoleplay;
      const nextRoleState = customRoleState(savedCustom);
      saveMemory(scenarioId, nativeLanguage, targetLanguage, {
        summary: '',
        memory: {
          customRoleplay: savedCustom,
          roleState: nextRoleState,
        },
        history: [],
      });
    }
    const stored = loadMemory(scenarioId, nativeLanguage, targetLanguage);
    const storedCustom = customRoleplayFromMemory(stored.memory);
    let loadedHistory = loadHistory(scenarioId, nativeLanguage, targetLanguage);
    let nextRoleState = roleStateForMemory(stored.memory);

    if (scenarioId === CUSTOM_SCENARIO_ID) {
      setCustomRoleplay(storedCustom);
      nextRoleState = nextRoleState || customRoleState(storedCustom);
      if (!completeCustomRoleplay(storedCustom) && loadedHistory.length === 0) {
        const copy = customSetupCopy(nativeLanguage);
        loadedHistory = [setupAssistantTurn(copy[nextCustomSetupStep(storedCustom)], nativeLanguage)];
        saveMemory(scenarioId, nativeLanguage, targetLanguage, {
          summary: stored.summary || '',
          memory: { ...(stored.memory || {}), customRoleplay: storedCustom },
          history: loadedHistory.map(({ role, content }) => ({ role, content })),
        });
      }
    } else {
      setCustomRoleplay({});
    }

    setRoleState(nextRoleState);
    setHistory(loadedHistory);
    lastAssistantRef.current = [...loadedHistory].reverse().find(message => message.role === 'assistant' && !message.error) || null;
    setTurn('');
    setStatus(statusCopy.ready);
    setStatusTone('idle');
  }, [scenarioId, nativeLanguage, targetLanguage, statusCopy.ready]);

  useEffect(() => {
    const starter = sessionStorage.getItem('lingoContextConversationStarter');
    if (!starter) return;
    sessionStorage.removeItem('lingoContextConversationStarter');
    setTurn(starter);
    setStatus(statusCopy.personalizedStarterReady);
    setStatusTone('idle');
  }, [statusCopy.personalizedStarterReady]);

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
    aiService.getEntitlements()
      .then((res) => {
        const nextEntitlements = normalizeEntitlements(res.data);
        setEntitlements(nextEntitlements);
        localStorage.setItem('aiEntitlements', JSON.stringify(nextEntitlements));
        localStorage.setItem('subscriptionTier', nextEntitlements.subscriptionTier || tierFromEntitlements(nextEntitlements));
      })
      .catch(() => {
        setStatus(statusCopy.savedAccessSettings);
        setStatusTone('idle');
      });
  }, [statusCopy.savedAccessSettings]);

  useEffect(() => {
    if (!threadRef.current) return;
    threadRef.current.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' });
  }, [history, loading]);

  useEffect(() => (
    () => {
      recognitionRef.current?.abort?.();
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }
      speechService.cancel();
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

  const speakMessage = async (message, options = {}) => {
    const speechParts = spokenPartsForMessage(message, targetLanguage, nativeLanguage);
    try {
      if (speechParts.length) {
        for (const part of speechParts) {
          if (part?.text) {
            const lang = ttsLocaleFor(part.language, targetLanguage);
            await speechService.speakAsync(part.text, {
              lang,
              voice: message?.role === 'assistant' ? conversationVoiceForLocale(lang, part.speaker) : undefined,
              rate: options.rate || '0.9',
            });
          }
        }
        return;
      }
      const lang = ttsLocaleFor(message?.language || targetLanguage, targetLanguage);
      await speechService.speakAsync(message?.content || '', {
        lang,
        voice: message?.role === 'assistant' ? conversationVoiceForLocale(lang) : undefined,
        rate: options.rate || '0.9',
      });
    } catch (_) {
      setStatus(handsFreeCopy(nativeLanguage).audioInterrupted);
      setStatusTone('error');
    }
  };

  const stopSpeech = () => {
    speechService.cancel();
    setStatus(statusCopy.speechStopped);
    setStatusTone('idle');
  };

  const resetConversation = () => {
    localStorage.removeItem(storageKeyFor(scenarioId, nativeLanguage, targetLanguage));
    if (scenarioId === 'cafe') localStorage.removeItem(LEGACY_STORAGE_KEY);
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    recognitionRef.current?.abort?.();
    recognitionRef.current = null;
    handsFreeRef.current = false;
    setHandsFreeActive(false);
    setListening(false);
    pendingSpeechTurnRef.current = false;
    lastAssistantRef.current = null;
    setRoleState(null);
    if (scenarioId === CUSTOM_SCENARIO_ID) {
      const copy = customSetupCopy(nativeLanguage);
      const setupTurn = setupAssistantTurn(copy.learnerRole, nativeLanguage);
      setCustomRoleplay({});
      setHistory([setupTurn]);
      saveMemory(scenarioId, nativeLanguage, targetLanguage, {
        memory: { customRoleplay: {} },
        history: [{ role: setupTurn.role, content: setupTurn.content }],
      });
    } else {
      setHistory([]);
    }
    setTurn('');
    setStatus(statusCopy.conversationReset);
    setStatusTone('idle');
    speechService.cancel();
  };

  const updateEntitlements = (next = entitlements) => {
    const normalized = normalizeEntitlements(next);
    setEntitlements(normalized);
    localStorage.setItem('aiEntitlements', JSON.stringify(normalized));
    localStorage.setItem('subscriptionTier', normalized.subscriptionTier || tierFromEntitlements(normalized));
  };

  const appendAssistantFallback = (message, coachingTip = '') => {
    setHistory(prev => [
      ...prev.slice(-11),
      {
        id: turnId('assistant'),
        role: 'assistant',
        content: message,
        coachingTip,
        error: true,
      },
    ]);
  };

  const quotaResetMessage = (usage = tokenUsage) => (
    quotaLimitCopy(tier, usage?.resetAt).status
  );

  const handleCustomSetupTurn = async (text, options = {}) => {
    const { autoContinue = false, restart = false } = options;
    const copy = customSetupCopy(nativeLanguage);
    const stored = loadMemory(scenarioId, nativeLanguage, targetLanguage);
    const currentCustom = restart ? {} : { ...customRoleplayFromMemory(stored.memory), ...customRoleplay };
    const step = nextCustomSetupStep(currentCustom) || 'learnerRole';
    const userTurn = {
      id: turnId('user'),
      role: 'user',
      content: text,
      language: nativeLanguage,
    };

    const nextCustom = restart ? {} : { ...currentCustom, [step]: text.trim() };
    if (completeCustomRoleplay(nextCustom)) {
      nextCustom.id = nextCustom.id || `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      nextCustom.title = customRoleplayTitle(nextCustom);
      const nextRoleState = customRoleState(nextCustom);
      const readyContent = copy.ready(nextCustom);
      const assistantTurn = setupAssistantTurn(readyContent, nativeLanguage);
      const updatedHistory = [
        ...history.filter(message => !message.setup).slice(-8),
        userTurn,
        assistantTurn,
      ];

      setCustomRoleplay(nextCustom);
      setRoleState(nextRoleState);
      setHistory(updatedHistory);
      lastAssistantRef.current = assistantTurn;
      saveMemory(scenarioId, nativeLanguage, targetLanguage, {
        summary: '',
        memory: {
          ...(stored.memory || {}),
          customRoleplay: nextCustom,
          roleState: nextRoleState,
        },
        history: updatedHistory.map(({ role, content }) => ({ role, content })),
      });
      setStatus(statusCopy.customRoleplayReady);
      setStatusTone('success');
      setTurn('');
      if (speechEnabled || autoContinue) await speakMessage(assistantTurn);
      if (autoContinue && handsFreeRef.current) scheduleHandsFreeListening();
      return;
    }

    const nextStep = nextCustomSetupStep(nextCustom);
    const assistantTurn = setupAssistantTurn(restart ? copy.restart : copy[nextStep], nativeLanguage);
    const updatedHistory = restart
      ? [assistantTurn]
      : [...history.slice(-10), userTurn, assistantTurn];

    setCustomRoleplay(nextCustom);
    setRoleState(null);
    setHistory(updatedHistory);
    lastAssistantRef.current = assistantTurn;
    saveMemory(scenarioId, nativeLanguage, targetLanguage, {
      summary: '',
      memory: { customRoleplay: nextCustom },
      history: updatedHistory.map(({ role, content }) => ({ role, content })),
    });
    setStatus(copy.setupLabel);
    setStatusTone('idle');
    setTurn('');
    if (speechEnabled || autoContinue) await speakMessage(assistantTurn);
    if (autoContinue && handsFreeRef.current) scheduleHandsFreeListening();
  };

  const sendTurn = async (textOverride, options = {}) => {
    const { autoContinue = false } = options;
    const text = String(textOverride ?? turn).trim();
    if (!text || loading) return;
    if (!canUseAI) {
      setStatus(statusCopy.planUnavailable);
      setStatusTone('error');
      return;
    }
    if (quotaExceeded) {
      setStatus(quotaResetMessage());
      setStatusTone('error');
      return;
    }

    if (isCustomScenario && (wantsNewCustomRoleplay(text) || !completeCustomRoleplay(customRoleplay))) {
      await handleCustomSetupTurn(text, {
        autoContinue,
        restart: wantsNewCustomRoleplay(text),
      });
      return;
    }

    const stored = loadMemory(scenarioId, nativeLanguage, targetLanguage);
    const requestHistory = history.map(({ role, content }) => ({ role, content })).slice(-12);
    const userTurn = {
      id: turnId('user'),
      role: 'user',
      content: text,
      language: targetLanguage,
    };

    setTurn('');
    setLoading(true);
    setStatus(statusCopy.partnerThinking);
    setStatusTone('loading');
    setHistory(prev => [...prev.slice(-11), userTurn]);

    try {
      const sessionId = aiSessionIdFor(scenarioId, nativeLanguage, targetLanguage, customRoleplay);
      const response = await aiService.sendConversationTurn({
        sessionId,
        scenario: activeScenarioTitle,
        targetLanguage,
        nativeLanguage,
        inputLanguage: targetLanguage,
        difficulty: support.difficulty,
        transcript: text,
        history: requestHistory,
        summary: stored.summary || '',
        memory: stored.memory || {},
        customRoleplay: isCustomScenario ? customRoleplay : undefined,
        lessonId: lessonId || undefined,
      });

      const data = response.data || {};
      updateEntitlements(data.entitlements || entitlements);
      const responseCustom = customRoleplayFromMemory(data.memory);
      if (isCustomScenario && completeCustomRoleplay(responseCustom)) {
        setCustomRoleplay(responseCustom);
      }
      const nextRoleState = data.roleState || roleStateForMemory(data.memory);
      if (nextRoleState) setRoleState(nextRoleState);

      if (data.aiEnabled === false) {
        handsFreeRef.current = false;
        setHandsFreeActive(false);
        appendAssistantFallback(
          statusCopy.partnerUnavailable,
          statusCopy.savedAccessSettings,
        );
        setStatus(statusCopy.partnerUnavailable);
        setStatusTone('error');
        return;
      }

      const assistantTurn = {
        id: turnId('assistant'),
        role: 'assistant',
        content: data.reply || localizedScenario.followUps[0] || statusCopy.connectionIssue,
        language: data.expectedLanguage || targetLanguage,
        coachingTip: data.coachingTip || '',
        nextSuggestedIntent: data.nextSuggestedIntent || '',
        speechParts: Array.isArray(data.speechParts) ? data.speechParts : [],
        displayParts: Array.isArray(data.displayParts) ? data.displayParts : [],
      };
      lastAssistantRef.current = assistantTurn;

      setHistory(prev => {
        const updated = [...prev.slice(-11), assistantTurn];
        saveMemory(scenarioId, nativeLanguage, targetLanguage, {
          summary: data.summary || stored.summary || '',
          memory: data.memory || stored.memory || {},
          history: (data.history || updated).map(({ role, content }) => ({ role, content })),
        });
        return updated;
      });
      setStatus(statusCopy.partnerReplied);
      setStatusTone('success');
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
        if (stored.memory?.roleplayComplete !== true && data.memory?.roleplayComplete === true) {
          const recentAssistantMessages = [
            ...history.filter((message) => message.role === 'assistant' && !message.error),
            assistantTurn,
          ].slice(-3);
          userService.recordLearningEvent(userId, {
            eventType: 'roleplay_complete',
            sessionId,
            roleplayId: isCustomScenario ? (customRoleplay.id || 'custom') : scenarioId,
            mode: autoContinue ? 'hands_free' : 'typed',
          }).catch(() => {});
          setRoleplayRecap({
            title: activeScenarioTitle,
            summary: data.summary || '',
            reply: data.reply || '',
            partner: uiLabels.activePartner,
            goal: activeScenarioGoal,
            usefulPhrases: recentAssistantMessages.map((message) => message.content).filter(Boolean),
            coachingTips: [
              ...history.map((message) => message.coachingTip).filter(Boolean),
              assistantTurn.coachingTip,
            ].filter(Boolean).slice(-3),
          });
        }
      }
      pendingSpeechTurnRef.current = false;
      if (speechEnabled || autoContinue) {
        if (autoContinue) {
          await speakMessage(assistantTurn);
        } else {
          speakMessage(assistantTurn);
        }
      }
      if (autoContinue && handsFreeRef.current) {
        if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
        restartTimerRef.current = setTimeout(() => startListening({ autoContinue: true }), 700);
      }
    } catch (error) {
      const planDenied = error.response?.status === 403;
      const quotaDenied = error.response?.status === 429;
      if (error.response?.data?.entitlements) {
        updateEntitlements(error.response.data.entitlements);
      }
      const resetMessage = quotaDenied
        ? quotaResetMessage(error.response?.data?.tokenUsage)
        : '';
      const message = planDenied
        ? statusCopy.planUnavailable
        : quotaDenied
          ? resetMessage
        : statusCopy.connectionIssue;
      appendAssistantFallback(
        message,
        planDenied
          ? statusCopy.savedAccessSettings
          : quotaDenied
            ? quotaLimitCopy(tier, error.response?.data?.tokenUsage?.resetAt).tip
            : statusCopy.connectionIssue,
      );
      setStatus(quotaDenied ? resetMessage : (error.response?.data?.message || message));
      setStatusTone('error');
      if (autoContinue) {
        handsFreeRef.current = false;
        setHandsFreeActive(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const stopHandsFree = () => {
    handsFreeRef.current = false;
    setHandsFreeActive(false);
    setListening(false);
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    recognitionRef.current?.abort?.();
    recognitionRef.current = null;
    speechService.cancel();
    setStatus(handsFreeCopy(nativeLanguage).stoppedStatus);
    setStatusTone('idle');
  };

  const scheduleHandsFreeListening = () => {
    if (!handsFreeRef.current) return;
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
    }
    restartTimerRef.current = setTimeout(() => startListening({ autoContinue: true }), 750);
  };

  const handleHandsFreeCommand = async (transcript) => {
    const command = normalizeVoiceCommand(transcript);

    if (LOCALIZED_STOP_COMMANDS.has(command) || STOP_COMMANDS.has(command)) {
      const copy = handsFreeCopy(nativeLanguage);
      stopHandsFree();
      await speechService.speakAsync(copy.stoppedSpoken, {
        lang: ttsLocaleFor(nativeLanguage, 'en'),
        rate: '0.9',
      });
      return true;
    }

    if (LOCALIZED_REPEAT_COMMANDS.has(command) || REPEAT_COMMANDS.has(command)) {
      if (lastAssistantRef.current) {
        await speakMessage(lastAssistantRef.current);
      }
      scheduleHandsFreeListening();
      return true;
    }

    if (LOCALIZED_SLOWER_COMMANDS.has(command) || SLOWER_COMMANDS.has(command)) {
      if (lastAssistantRef.current) {
        await speakMessage(lastAssistantRef.current, { rate: '0.72' });
      }
      scheduleHandsFreeListening();
      return true;
    }

    return false;
  };

  // Map terse Web Speech error codes to actionable guidance for the learner.
  const speechErrorMessage = (event) => {
    const copy = handsFreeCopy(nativeLanguage);
    if (event?.error === 'not-allowed' || event?.error === 'service-not-allowed') return copy.permission;
    if (event?.error === 'no-speech') return copy.noSpeech;
    if (event?.error === 'audio-capture') return copy.audioCapture;
    if (event?.error === 'network') return copy.network;
    if (event?.error === 'aborted') return copy.aborted;
    switch (event?.error) {
      case 'not-allowed':
      case 'service-not-allowed':
        return statusCopy.microphoneBlocked;
      case 'no-speech':
        return statusCopy.noSpeech;
      case 'audio-capture':
        return statusCopy.noMicrophone;
      case 'network':
        return statusCopy.speechNetwork;
      case 'aborted':
        return statusCopy.speechCancelled;
      default:
        return copy.captureFailed;
    }
  };

  const startListening = (options = {}) => {
    const { autoContinue = false } = options;
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setStatus(handsFreeCopy(nativeLanguage).unavailable);
      setStatusTone('error');
      if (autoContinue) {
        handsFreeRef.current = false;
        setHandsFreeActive(false);
      }
      return;
    }
    if (loading || !canUseAI || quotaExceeded) return;

    recognitionRef.current?.abort?.();
    speechService.cancel();

    const recognition = new Recognition();
    recognition.lang = ttsLocaleFor(targetLanguage, targetLanguage);
    // Live captions in the input field so the learner can see (and trust) what
    // the recognizer is hearing as they speak. Auto-stop after the pause is
    // preserved so hands-free turn-taking still works.
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;
    recognitionRef.current = recognition;
    const copy = handsFreeCopy(nativeLanguage);
    let heardSpeech = false;
    let restartOnEnd = false;
    let finalTranscript = '';

    recognition.onstart = () => {
      setListening(true);
      setStatus(autoContinue ? copy.listening : statusCopy.listening);
      setStatusTone('loading');
    };
    recognition.onerror = (event) => {
      if (autoContinue && handsFreeRef.current && event.error === 'no-speech') {
        restartOnEnd = true;
        setStatus(copy.stillListening);
        setStatusTone('loading');
        return;
      }
      setListening(false);
      setStatus(speechErrorMessage(event));
      setStatusTone('error');
      if (autoContinue) {
        handsFreeRef.current = false;
        setHandsFreeActive(false);
      }
    };
    recognition.onend = async () => {
      setListening(false);
      recognitionRef.current = null;
      if (autoContinue && handsFreeRef.current && (restartOnEnd || !heardSpeech)) {
        scheduleHandsFreeListening();
        return;
      }
      const captured = finalTranscript.trim();
      if (captured) {
        pendingSpeechTurnRef.current = true;
        setTurn(captured);
        if (autoContinue && handsFreeRef.current) {
          const handled = await handleHandsFreeCommand(captured);
          if (handled) return;
          sendTurn(captured, { autoContinue });
          return;
        }
        // Push-to-talk: leave the transcript in the input box so the learner
        // can correct misrecognitions before sending. Avoids "wrong words go
        // straight to the AI" surprise.
        setStatus(copy.captured);
        setStatusTone('idle');
        return;
      }
      if (!loading) {
        setStatus((currentStatus) => (currentStatus === statusCopy.listening || currentStatus === copy.listening ? statusCopy.ready : currentStatus));
        setStatusTone((currentTone) => (currentTone === 'loading' ? 'idle' : currentTone));
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
      if (preview) {
        heardSpeech = true;
        setTurn(preview);
      }
    };

    try {
      recognition.start();
    } catch (err) {
      setListening(false);
      setStatus(speechErrorMessage({ error: 'aborted' }));
      setStatusTone('error');
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop?.();
    recognitionRef.current = null;
    setListening(false);
  };

  const startHandsFree = async () => {
    if (!canUseAI || quotaExceeded || loading) return;
    const copy = handsFreeCopy(nativeLanguage);
    if (!speechSupported) {
      setStatus(copy.unavailable);
      setStatusTone('error');
      return;
    }

    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    recognitionRef.current?.abort?.();
    handsFreeRef.current = true;
    setHandsFreeActive(true);
    setSpeechEnabled(true);
    setStatus(copy.starting);
    setStatusTone('loading');

    try {
      await speechService.speakAsync(copy.startedSpoken, {
        lang: ttsLocaleFor(nativeLanguage, 'en'),
        rate: '0.9',
      });
    } catch (_) {
      setStatus(copy.audioInterrupted);
      setStatusTone('error');
    }

    if (handsFreeRef.current) {
      startListening({ autoContinue: true });
    }
  };

  const renderMessageBody = (message) => {
    const parts = displayPartsForMessage(message, targetLanguage, nativeLanguage);
    if (parts.length <= 1) return <div className="message-body">{message.content}</div>;

    return (
      <div className="message-body language-segments">
        {parts.map((part, index) => {
          const role = languageRole(part, targetLanguage, nativeLanguage);
          return (
            <span key={`${part.language || 'part'}-${index}`} className={`language-segment ${role}`}>
              <span className="language-segment-label">{segmentLanguageLabel(part)}</span>
              <span>{part.text}</span>
            </span>
          );
        })}
      </div>
    );
  };

  const saveAssistantTurn = async (message) => {
    if (!userId || !message?.content) return;
    try {
      await learningHubService.saveItem({
        itemType: 'phrase',
        targetText: message.content,
        sourceType: 'conversation',
        sourceLabel: activeScenarioTitle,
        reason: t('conversation.savedReplyReason', 'Saved from conversation for later practice.'),
        metadata: { scenarioId, route: '/conversation' },
      });
      setStatus(t('conversation.savedReply', 'Saved for review.'));
      setStatusTone('success');
    } catch (_) {
      setStatus(t('conversation.saveReplyFailed', 'Could not save this reply right now.'));
      setStatusTone('error');
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
          scenarioId,
          route: '/conversation',
          summary: roleplayRecap.summary,
          goal: roleplayRecap.goal,
          customRoleplay: isCustomScenario ? customRoleplay : undefined,
        },
      });
      setStatus(t('conversation.savedRoleplay', 'Roleplay saved.'));
      setStatusTone('success');
    } catch (_) {
      setStatus(t('conversation.saveRoleplayFailed', 'Could not save this roleplay right now.'));
      setStatusTone('error');
    }
  };

  return (
    <div className="conversation-page">
      <section className="conversation-shell" aria-label={t('conversation.practiceLabel', 'Conversation practice')}>
        <header className="conversation-header">
          <div>
            <p className="conversation-kicker">{t('conversation.practiceLabel', 'Conversation Practice')}</p>
            <div className="conversation-scenario-row">
              <label className="conversation-header-scenario">
                <span>{t('conversation.scenario', 'Scenario')}</span>
                <select value={scenarioId} onChange={(event) => setScenarioId(event.target.value)}>
                  {SCENARIOS.map((item) => (
                    <option key={item.id} value={item.id}>{scenarioCopyFor(nativeLanguage, item.id).title}</option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className={`conversation-header-handsfree ${handsFreeActive ? 'active' : ''}`}
                onClick={handsFreeActive ? stopHandsFree : startHandsFree}
                disabled={!canUseAI || quotaExceeded || !speechSupported || loading}
                title={speechSupported ? t('conversation.startHandsFreeTitle', 'Start hands-free conversation') : t('conversation.speechUnavailableTitle', 'Speech input is not available in this browser')}
              >
                <FiMic aria-hidden="true" />
                {handsFreeActive ? t('conversation.stopHandsFree', 'Stop hands-free') : t('conversation.handsFree', 'Hands-free')}
              </button>
            </div>
          </div>
          <div className="conversation-badges" aria-label={t('conversation.planMemoryStatus', 'Plan and memory status')}>
            <span className={`conversation-plan ${tier} ${memoryScope}`}>{tier.toUpperCase()}</span>
            <span className={`conversation-memory ${memoryScope}`}>
              <FiShield aria-hidden="true" />
              {memoryScope === 'cloud'
                ? t('conversation.syncedMemory', 'Synced memory')
                : memoryScope === 'device'
                  ? t('conversation.deviceMemory', 'Device memory')
                  : t('conversation.noSavedMemory', 'No saved memory')}
            </span>
            <span className="conversation-language-badge">{languageLabel}</span>
          </div>
        </header>

        <div className="conversation-body">
          <aside className={`conversation-side ${setupOpen ? 'open' : ''}`} aria-label={t('conversation.practiceSetup', 'Practice setup')}>
            <button
              type="button"
              className="conversation-setup-toggle"
              onClick={() => setSetupOpen((open) => !open)}
              aria-expanded={setupOpen}
            >
              <span>{t('conversation.practiceSetup', 'Practice setup')}</span>
              <strong>{localizedScenario.title} · {supportLabel}</strong>
            </button>

            <div className="conversation-side-content">
              <label className="conversation-field">
                {t('conversation.support', 'Support')}
                <select value={supportLevel} onChange={(event) => setSupportLevel(event.target.value)}>
                  {SUPPORT_LEVELS.map((item) => (
                    <option key={item.id} value={item.id}>{supportLabelFor(nativeLanguage, item.id)}</option>
                  ))}
                </select>
              </label>
              <div className="conversation-support-buttons" aria-label={t('conversation.adjustSupport', 'Adjust support')}>
                <button type="button" onClick={() => shiftSupportLevel(-1)} disabled={supportIndex <= 0}>
                  {t('conversation.easier', 'Easier')}
                </button>
                <button type="button" onClick={() => shiftSupportLevel(1)} disabled={supportIndex >= SUPPORT_LEVELS.length - 1}>
                  {t('conversation.harder', 'Harder')}
                </button>
              </div>

              <div className="conversation-brief">
                <div>
                  <span>{uiLabels.partner}</span>
                  <strong>{uiLabels.activePartner}</strong>
                </div>
                <div>
                  <span>{uiLabels.goal}</span>
                  <strong>{activeScenarioGoal}</strong>
                </div>
                {isCustomScenario && customRoleplay.situation && (
                  <div>
                    <span>{customSetupCopy(nativeLanguage).situationLabel}</span>
                    <strong>{customRoleplay.situation}</strong>
                  </div>
                )}
              </div>

              {quickTurns.length > 0 && (
                <div className="conversation-starters">
                  {quickTurns.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      onClick={() => sendTurn(starter)}
                      disabled={loading}
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              )}

              {contextPracticeActions.length > 0 && (
                <div className="conversation-context-actions">
                  <span>{t('conversation.personalizedForYou', 'Personalized for you')}</span>
                  {contextPracticeActions.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => sendTurn(item.prompt)}
                      disabled={loading || !canUseAI || quotaExceeded}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}

              <button type="button" className="conversation-reset" onClick={resetConversation}>
                <FiRefreshCw aria-hidden="true" />
                {t('conversation.resetRoleplay', 'Reset roleplay')}
              </button>
              <button
                type="button"
                className={`conversation-reset ${speechEnabled ? 'active' : ''}`}
                onClick={() => {
                  if (speechEnabled) stopSpeech();
                  setSpeechEnabled((enabled) => !enabled);
                }}
              >
                {speechEnabled ? <FiVolume2 aria-hidden="true" /> : <FiVolumeX aria-hidden="true" />}
                {speechEnabled ? t('conversation.spokenRepliesOn', 'Spoken replies on') : t('conversation.spokenRepliesOff', 'Spoken replies off')}
              </button>
            </div>
          </aside>

          <main className="conversation-main">
            <div className="conversation-thread-main" ref={threadRef}>
              {!canUseAI && (
                <div className="conversation-locked">
                  <FiWifiOff aria-hidden="true" />
                  <strong>{t('conversation.notAvailableTitle', 'Conversation Practice is not available on this plan.')}</strong>
                  <span>{t('conversation.notAvailableBody', 'Daily conversation practice is available on Free, Plus, and Pro.')}</span>
                </div>
              )}

              {canUseAI && quotaExceeded && (
                <div className="conversation-locked">
                  <FiWifiOff aria-hidden="true" />
                  <strong>{quotaCopy.title}</strong>
                  <span>{quotaCopy.body}</span>
                </div>
              )}

              {canUseAI && !quotaExceeded && history.length === 0 && !loading && (
                <div className="conversation-empty-main">
                  <strong>{t('conversation.beginScenario', 'Begin {{scenario}}', { scenario: activeScenarioTitle.toLowerCase() })}</strong>
                  <span>{t('conversation.partnerReady', '{{partner}} is ready.', { partner: uiLabels.activePartner })}</span>
                </div>
              )}

              {roleplayRecap && (
                <section className="conversation-recap" aria-label={t('conversation.recapAria', 'Roleplay recap')}>
                  <div>
                    <strong>{t('conversation.recapTitle', 'Roleplay complete')}</strong>
                    <span>{roleplayRecap.summary || roleplayRecap.goal}</span>
                  </div>
                  <div className="conversation-recap-grid">
                    <div>
                      <small>{t('conversation.recapWentWell', 'What went well')}</small>
                      <span>{roleplayRecap.goal}</span>
                    </div>
                    <div>
                      <small>{t('conversation.recapUsefulPhrases', 'Useful phrases')}</small>
                      <span>{roleplayRecap.usefulPhrases?.[0] || roleplayRecap.reply}</span>
                    </div>
                    <div>
                      <small>{t('conversation.recapReview', 'Review next')}</small>
                      <span>{roleplayRecap.coachingTips?.[0] || t('conversation.recapReviewFallback', 'Save one phrase and reuse it in another practice mode.')}</span>
                    </div>
                  </div>
                  <button type="button" onClick={saveRoleplayRecap}>
                    <FiBookmark aria-hidden="true" />
                    {t('conversation.saveRoleplay', 'Save roleplay')}
                  </button>
                </section>
              )}

              {history.map((message) => (
                <div key={message.id} className={`conversation-message ${message.role} ${message.error ? 'error' : ''}`}>
                  <div className="message-label">
                    <span>{message.role === 'user' ? uiLabels.activeLearner : uiLabels.activePartner}</span>
                    <span className="message-tools">
                      {message.role === 'assistant' && !message.error && (
                        <>
                          <button type="button" onClick={() => saveAssistantTurn(message)} title={t('conversation.saveReply', 'Save reply')}>
                            <FiBookmark aria-hidden="true" />
                          </button>
                          <button type="button" onClick={() => speakMessage(message)} title={t('conversation.playReply', 'Play reply')}>
                            <FiVolume2 aria-hidden="true" />
                          </button>
                        </>
                      )}
                      {message.language && <small>{message.language}</small>}
                    </span>
                  </div>
                  {renderMessageBody(message)}
                  {message.coachingTip && <div className="message-tip">{message.coachingTip}</div>}
                </div>
              ))}

              {loading && (
                <div className="conversation-message assistant pending">
                  <div className="message-label">{uiLabels.activePartner}</div>
                  <div className="typing-dots" aria-label={t('conversation.partnerTyping', 'Practice partner is typing')}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>

            <div className="conversation-composer-main">
              <textarea
                value={turn}
                onChange={(event) => {
                  pendingSpeechTurnRef.current = false;
                  setTurn(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    sendTurn();
                  }
                }}
                placeholder={canUseAI ? t('conversation.typeYourTurn', 'Type your turn...') : t('conversation.notAvailableTitle', 'Conversation Practice is not available on this plan.')}
                rows={3}
                disabled={!canUseAI || quotaExceeded}
              />
              <div className="composer-buttons">
                <button
                  type="button"
                  className={`mic-button ${listening ? 'listening' : ''}`}
                  onClick={listening ? stopListening : startListening}
                  disabled={!speechSupported || loading || !canUseAI || quotaExceeded || handsFreeActive}
                  title={speechSupported ? t('conversation.speakYourTurn', 'Speak your turn') : t('conversation.speechUnavailableTitle', 'Speech input is not available in this browser')}
                >
                  <FiMic aria-hidden="true" />
                  {listening ? t('conversation.stop', 'Stop') : t('conversation.speak', 'Speak')}
                </button>
                <button type="button" onClick={() => sendTurn()} disabled={!turn.trim() || loading || !canUseAI || quotaExceeded}>
                  <FiSend aria-hidden="true" />
                  {t('conversation.send', 'Send')}
                </button>
              </div>
            </div>
            <div className={`conversation-status-main ${statusTone}`}>
              <span className="status-dot" />
              {status}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

export default ConversationPage;
