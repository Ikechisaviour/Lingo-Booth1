import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiMic, FiRefreshCw, FiSend, FiShield, FiVolume2, FiVolumeX, FiWifiOff } from 'react-icons/fi';
import { aiService } from '../services/api';
import speechService from '../services/speechService';
import LANGUAGES from '../config/languages';
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
  { id: 'guided', label: 'Guided', difficulty: 'friendly beginner with brief native-language support' },
  { id: 'balanced', label: 'Balanced', difficulty: 'balanced natural conversation' },
  { id: 'natural', label: 'Natural', difficulty: 'natural conversation with minimal coaching' },
];

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

const CONVERSATION_UI_LABELS = {
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

function roleStateForMemory(memory = {}) {
  return memory?.roleState && typeof memory.roleState === 'object' ? memory.roleState : null;
}

function labelsFor(nativeLanguage, scenarioId, roleState = null) {
  const labels = CONVERSATION_UI_LABELS[nativeLanguage] || CONVERSATION_UI_LABELS.en;
  const fallbackPartner = labels.partners?.[scenarioId] || CONVERSATION_UI_LABELS.en.partners[scenarioId] || 'Conversation partner';
  const roleLabel = (roleKey, rawRole) => labels.roles?.[roleKey] || CONVERSATION_UI_LABELS.en.roles[roleKey] || rawRole || roleKey;
  const learnerRole = roleState?.learnerRoleKey ? roleLabel(roleState.learnerRoleKey, roleState.learnerRole) : '';
  const partnerRole = roleState?.partnerRoleKey ? roleLabel(roleState.partnerRoleKey, roleState.partnerRole) : fallbackPartner;

  return {
    ...labels,
    activeLearner: learnerRole && learnerRole !== labels.learner ? `${labels.learner} · ${learnerRole}` : labels.learner,
    activePartner: partnerRole,
  };
}

function displayLabelsFor(nativeLanguage, scenarioId, roleState = null) {
  const labels = labelsFor(nativeLanguage, scenarioId, roleState);
  if (!roleState?.learnerRoleKey) return labels;
  const baseLabels = CONVERSATION_UI_LABELS[nativeLanguage] || CONVERSATION_UI_LABELS.en;
  const roleLabel = baseLabels.roles?.[roleState.learnerRoleKey]
    || CONVERSATION_UI_LABELS.en.roles[roleState.learnerRoleKey]
    || roleState.learnerRole
    || roleState.learnerRoleKey;

  return {
    ...labels,
    activeLearner: roleLabel && roleLabel !== baseLabels.learner ? `${baseLabels.learner} - ${roleLabel}` : baseLabels.learner,
  };
}

function customSetupCopy(nativeLanguage) {
  if (nativeLanguage === 'ko') return KOREAN_CUSTOM_SETUP_COPY;
  return CUSTOM_SETUP_COPY[nativeLanguage] || CUSTOM_SETUP_COPY.en;
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

function memoryScopeFor(entitlements = {}) {
  const tier = tierFromEntitlements(entitlements);
  if (entitlements.aiMemoryScope) return entitlements.aiMemoryScope;
  if (entitlements.canSyncAIMemory || tier === 'pro') return 'cloud';
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

  if (normalizedTier === 'pro') {
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

function ConversationPage() {
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [supportLevel, setSupportLevel] = useState(SUPPORT_LEVELS[0].id);
  const [turn, setTurn] = useState('');
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState('Ready');
  const [statusTone, setStatusTone] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [entitlements, setEntitlements] = useState(getStoredEntitlements);
  const [listening, setListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [handsFreeActive, setHandsFreeActive] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);
  const [roleState, setRoleState] = useState(null);
  const [customRoleplay, setCustomRoleplay] = useState({});
  const [countdownNow, setCountdownNow] = useState(Date.now());
  const threadRef = useRef(null);
  const recognitionRef = useRef(null);
  const handsFreeRef = useRef(false);
  const restartTimerRef = useRef(null);
  const lastAssistantRef = useRef(null);

  const scenario = useMemo(
    () => SCENARIOS.find(item => item.id === scenarioId) || SCENARIOS[0],
    [scenarioId],
  );
  const isCustomScenario = scenarioId === CUSTOM_SCENARIO_ID;
  const customIsReady = isCustomScenario && completeCustomRoleplay(customRoleplay);
  const support = useMemo(
    () => SUPPORT_LEVELS.find(item => item.id === supportLevel) || SUPPORT_LEVELS[0],
    [supportLevel],
  );

  const nativeLanguage = localStorage.getItem('nativeLanguage') || 'en';
  const targetLanguage = localStorage.getItem('targetLanguage') || 'ko';
  const uiLabels = useMemo(
    () => displayLabelsFor(nativeLanguage, scenarioId, roleState),
    [nativeLanguage, scenarioId, roleState],
  );
  const tier = tierFromEntitlements(entitlements);
  const memoryScope = memoryScopeFor(entitlements);
  const canUseAI = entitlements.canUseAI !== false;
  const tokenUsage = entitlements.tokenUsage || null;
  const quotaExceeded = Boolean(tokenUsage?.quotaExceeded || entitlements.canSendAI === false);
  const quotaCopy = quotaLimitCopy(tier, tokenUsage?.resetAt, countdownNow);
  const speechSupported = !!getSpeechRecognition();

  const languageLabel = useMemo(() => {
    const target = LANGUAGES[targetLanguage]?.name || targetLanguage;
    const native = LANGUAGES[nativeLanguage]?.name || nativeLanguage;
    return `${native} -> ${target}`;
  }, [nativeLanguage, targetLanguage]);

  const activeScenarioTitle = isCustomScenario && customIsReady
    ? customRoleplayTitle(customRoleplay)
    : scenario.title;

  const activeScenarioGoal = isCustomScenario
    ? (customRoleplay.goal || scenario.goal)
    : scenario.goal;

  const quickTurns = useMemo(() => {
    if (!canUseAI || quotaExceeded) return [];
    if (isCustomScenario && !customIsReady) return [];
    if (isCustomScenario && customIsReady) {
      const latestAssistant = [...history].reverse().find(message => message.role === 'assistant' && !message.error);
      if (latestAssistant?.nextSuggestedIntent) return [latestAssistant.nextSuggestedIntent, ...scenario.followUps].slice(0, 3);
      return (history.length ? scenario.followUps : ['Start the roleplay.']).slice(0, 3);
    }
    const latestAssistant = [...history].reverse().find(message => message.role === 'assistant' && !message.error);
    const suggested = latestAssistant?.nextSuggestedIntent;
    if (suggested) return [suggested, ...scenario.followUps].slice(0, 3);
    return (history.length ? scenario.followUps : scenario.starters).slice(0, 3);
  }, [canUseAI, quotaExceeded, history, scenario, isCustomScenario, customIsReady]);

  useEffect(() => {
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
    setStatus('Ready');
    setStatusTone('idle');
  }, [scenarioId, nativeLanguage, targetLanguage]);

  useEffect(() => {
    aiService.getEntitlements()
      .then((res) => {
        const nextEntitlements = normalizeEntitlements(res.data);
        setEntitlements(nextEntitlements);
        localStorage.setItem('aiEntitlements', JSON.stringify(nextEntitlements));
        localStorage.setItem('subscriptionTier', nextEntitlements.subscriptionTier || tierFromEntitlements(nextEntitlements));
      })
      .catch(() => {
        setStatus('Using saved access settings.');
        setStatusTone('idle');
      });
  }, []);

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
    const speechParts = Array.isArray(message?.speechParts) ? message.speechParts : [];
    try {
      if (speechParts.length) {
        for (const part of speechParts) {
          if (part?.text) {
            await speechService.speakAsync(part.text, {
              lang: ttsLocaleFor(part.language, targetLanguage),
              rate: options.rate || '0.9',
            });
          }
        }
        return;
      }
      await speechService.speakAsync(message?.content || '', {
        lang: ttsLocaleFor(message?.language || targetLanguage, targetLanguage),
        rate: options.rate || '0.9',
      });
    } catch (_) {
      setStatus('Audio playback was interrupted.');
      setStatusTone('error');
    }
  };

  const stopSpeech = () => {
    speechService.cancel();
    setStatus('Speech stopped.');
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
    setStatus('Conversation reset.');
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
      setStatus('Custom roleplay is ready.');
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
      setStatus('Conversation Practice is not available on this plan.');
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
    setStatus('Practice partner is thinking...');
    setStatusTone('loading');
    setHistory(prev => [...prev.slice(-11), userTurn]);

    try {
      const response = await aiService.sendConversationTurn({
        sessionId: aiSessionIdFor(scenarioId, nativeLanguage, targetLanguage, customRoleplay),
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
          'The practice partner is temporarily unavailable. Please try again shortly.',
          'Your message was kept on this device.',
        );
        setStatus('Practice partner is temporarily unavailable.');
        setStatusTone('error');
        return;
      }

      const assistantTurn = {
        id: turnId('assistant'),
        role: 'assistant',
        content: data.reply || 'Let me try that again. What would you like to say next?',
        language: data.expectedLanguage || targetLanguage,
        coachingTip: data.coachingTip || '',
        nextSuggestedIntent: data.nextSuggestedIntent || '',
        speechParts: Array.isArray(data.speechParts) ? data.speechParts : [],
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
      setStatus('Practice partner replied.');
      setStatusTone('success');
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
        ? 'Conversation Practice is not available on this plan.'
        : quotaDenied
          ? resetMessage
        : 'The practice partner had trouble replying. Please try again.';
      appendAssistantFallback(
        message,
        planDenied
          ? 'Your plan settings were refreshed.'
          : quotaDenied
            ? quotaLimitCopy(tier, error.response?.data?.tokenUsage?.resetAt).tip
            : 'Your message was not sent again.',
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
    setStatus('Hands-free mode stopped.');
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

    if (STOP_COMMANDS.has(command)) {
      stopHandsFree();
      await speechService.speakAsync('Hands-free mode stopped.', {
        lang: ttsLocaleFor('en', 'en'),
        rate: '0.9',
      });
      return true;
    }

    if (REPEAT_COMMANDS.has(command)) {
      if (lastAssistantRef.current) {
        await speakMessage(lastAssistantRef.current);
      }
      scheduleHandsFreeListening();
      return true;
    }

    if (SLOWER_COMMANDS.has(command)) {
      if (lastAssistantRef.current) {
        await speakMessage(lastAssistantRef.current, { rate: '0.72' });
      }
      scheduleHandsFreeListening();
      return true;
    }

    return false;
  };

  const startListening = (options = {}) => {
    const { autoContinue = false } = options;
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setStatus('Speech input is not available in this browser.');
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
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;
    recognitionRef.current = recognition;
    let heardSpeech = false;
    let restartOnEnd = false;

    recognition.onstart = () => {
      setListening(true);
      setStatus(autoContinue ? 'Hands-free is listening...' : 'Listening...');
      setStatusTone('loading');
    };
    recognition.onerror = (event) => {
      if (autoContinue && handsFreeRef.current && event.error === 'no-speech') {
        restartOnEnd = true;
        setStatus('Still listening...');
        setStatusTone('loading');
        return;
      }
      setListening(false);
      setStatus(event.error === 'not-allowed'
        ? 'Microphone permission is blocked.'
        : 'Could not capture speech. Please try again.');
      setStatusTone('error');
      if (autoContinue) {
        handsFreeRef.current = false;
        setHandsFreeActive(false);
      }
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
      if (autoContinue && handsFreeRef.current && (restartOnEnd || !heardSpeech)) {
        scheduleHandsFreeListening();
        return;
      }
      if (!loading) {
        setStatus((currentStatus) => (currentStatus === 'Listening...' || currentStatus === 'Hands-free is listening...' ? 'Ready' : currentStatus));
        setStatusTone((currentTone) => (currentTone === 'loading' ? 'idle' : currentTone));
      }
    };
    recognition.onresult = async (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || '';
      heardSpeech = Boolean(transcript.trim());
      if (transcript.trim()) {
        setTurn(transcript);
        if (autoContinue && handsFreeRef.current) {
          const handled = await handleHandsFreeCommand(transcript);
          if (handled) return;
        }
        sendTurn(transcript, { autoContinue });
      }
    };

    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop?.();
    recognitionRef.current = null;
    setListening(false);
  };

  const startHandsFree = async () => {
    if (!canUseAI || quotaExceeded || loading) return;
    if (!speechSupported) {
      setStatus('Hands-free mode needs a browser with speech input support.');
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
    setStatus('Starting hands-free mode...');
    setStatusTone('loading');

    try {
      await speechService.speakAsync('Hands-free mode started. I will listen after each reply. Say stop to end.', {
        lang: ttsLocaleFor('en', 'en'),
        rate: '0.9',
      });
    } catch (_) {
      setStatus('Audio playback was interrupted.');
      setStatusTone('error');
    }

    if (handsFreeRef.current) {
      startListening({ autoContinue: true });
    }
  };

  return (
    <div className="conversation-page">
      <section className="conversation-shell" aria-label="AI conversation practice">
        <header className="conversation-header">
          <div>
            <p className="conversation-kicker">Conversation Practice</p>
            <div className="conversation-scenario-row">
              <label className="conversation-header-scenario">
                <span>Scenario</span>
                <select value={scenarioId} onChange={(event) => setScenarioId(event.target.value)}>
                  {SCENARIOS.map((item) => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className={`conversation-header-handsfree ${handsFreeActive ? 'active' : ''}`}
                onClick={handsFreeActive ? stopHandsFree : startHandsFree}
                disabled={!canUseAI || quotaExceeded || !speechSupported || loading}
                title={speechSupported ? 'Start hands-free conversation' : 'Speech input is not available in this browser'}
              >
                <FiMic aria-hidden="true" />
                {handsFreeActive ? 'Stop hands-free' : 'Hands-free'}
              </button>
            </div>
          </div>
          <div className="conversation-badges" aria-label="Plan and memory status">
            <span className={`conversation-plan ${tier} ${memoryScope}`}>{tier.toUpperCase()}</span>
            <span className={`conversation-memory ${memoryScope}`}>
              <FiShield aria-hidden="true" />
              {memoryScope === 'cloud' ? 'Synced memory' : memoryScope === 'device' ? 'Device memory' : 'No AI memory'}
            </span>
            <span className="conversation-language-badge">{languageLabel}</span>
          </div>
        </header>

        <div className="conversation-body">
          <aside className={`conversation-side ${setupOpen ? 'open' : ''}`} aria-label="Practice setup">
            <button
              type="button"
              className="conversation-setup-toggle"
              onClick={() => setSetupOpen((open) => !open)}
              aria-expanded={setupOpen}
            >
              <span>Practice setup</span>
              <strong>{scenario.title} · {support.label}</strong>
            </button>

            <div className="conversation-side-content">
              <label className="conversation-field">
                Support
                <select value={supportLevel} onChange={(event) => setSupportLevel(event.target.value)}>
                  {SUPPORT_LEVELS.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </select>
              </label>

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

              <button type="button" className="conversation-reset" onClick={resetConversation}>
                <FiRefreshCw aria-hidden="true" />
                Reset roleplay
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
                {speechEnabled ? 'Spoken replies on' : 'Spoken replies off'}
              </button>
            </div>
          </aside>

          <main className="conversation-main">
            <div className="conversation-thread-main" ref={threadRef}>
              {!canUseAI && (
                <div className="conversation-locked">
                  <FiWifiOff aria-hidden="true" />
                <strong>Conversation Practice is not available on this plan.</strong>
                  <span>Daily AI practice is available on Free, Plus, and Pro.</span>
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
                  <strong>Begin {activeScenarioTitle.toLowerCase()}</strong>
                  <span>{uiLabels.activePartner} is ready.</span>
                </div>
              )}

              {history.map((message) => (
                <div key={message.id} className={`conversation-message ${message.role} ${message.error ? 'error' : ''}`}>
                  <div className="message-label">
                    <span>{message.role === 'user' ? uiLabels.activeLearner : uiLabels.activePartner}</span>
                    <span className="message-tools">
                      {message.role === 'assistant' && !message.error && (
                        <button type="button" onClick={() => speakMessage(message)} title="Play reply">
                          <FiVolume2 aria-hidden="true" />
                        </button>
                      )}
                      {message.language && <small>{message.language}</small>}
                    </span>
                  </div>
                  <div className="message-body">{message.content}</div>
                  {message.coachingTip && <div className="message-tip">{message.coachingTip}</div>}
                </div>
              ))}

              {loading && (
                <div className="conversation-message assistant pending">
                  <div className="message-label">{uiLabels.activePartner}</div>
                  <div className="typing-dots" aria-label="Practice partner is typing">
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
                onChange={(event) => setTurn(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    sendTurn();
                  }
                }}
                placeholder={canUseAI ? 'Type your turn...' : 'Conversation Practice is not available on this plan.'}
                rows={3}
                disabled={!canUseAI || quotaExceeded}
              />
              <div className="composer-buttons">
                <button
                  type="button"
                  className={`mic-button ${listening ? 'listening' : ''}`}
                  onClick={listening ? stopListening : startListening}
                  disabled={!speechSupported || loading || !canUseAI || quotaExceeded || handsFreeActive}
                  title={speechSupported ? 'Speak your turn' : 'Speech input is not available in this browser'}
                >
                  <FiMic aria-hidden="true" />
                  {listening ? 'Stop' : 'Speak'}
                </button>
                <button type="button" onClick={() => sendTurn()} disabled={!turn.trim() || loading || !canUseAI || quotaExceeded}>
                  <FiSend aria-hidden="true" />
                  Send
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
