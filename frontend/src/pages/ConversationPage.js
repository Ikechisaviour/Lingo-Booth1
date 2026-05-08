import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiMic, FiRefreshCw, FiSend, FiShield, FiVolume2, FiVolumeX, FiWifiOff } from 'react-icons/fi';
import { aiService } from '../services/api';
import speechService from '../services/speechService';
import LANGUAGES from '../config/languages';
import './ConversationPage.css';

const SESSION_ID = 'learner-conversation';
const LEGACY_STORAGE_KEY = `lingoConversation:${SESSION_ID}`;

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
];

const SUPPORT_LEVELS = [
  { id: 'guided', label: 'Guided', difficulty: 'friendly beginner with brief native-language support' },
  { id: 'balanced', label: 'Balanced', difficulty: 'balanced natural conversation' },
  { id: 'natural', label: 'Natural', difficulty: 'natural conversation with minimal coaching' },
];

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

function labelsFor(nativeLanguage, scenarioId) {
  const labels = CONVERSATION_UI_LABELS[nativeLanguage] || CONVERSATION_UI_LABELS.en;
  return {
    ...labels,
    activePartner: labels.partners?.[scenarioId] || CONVERSATION_UI_LABELS.en.partners[scenarioId] || 'Conversation partner',
  };
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

function formatResetAt(resetAt) {
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
  const threadRef = useRef(null);
  const recognitionRef = useRef(null);
  const handsFreeRef = useRef(false);
  const restartTimerRef = useRef(null);
  const lastAssistantRef = useRef(null);

  const scenario = useMemo(
    () => SCENARIOS.find(item => item.id === scenarioId) || SCENARIOS[0],
    [scenarioId],
  );
  const support = useMemo(
    () => SUPPORT_LEVELS.find(item => item.id === supportLevel) || SUPPORT_LEVELS[0],
    [supportLevel],
  );

  const nativeLanguage = localStorage.getItem('nativeLanguage') || 'en';
  const targetLanguage = localStorage.getItem('targetLanguage') || 'ko';
  const uiLabels = useMemo(
    () => labelsFor(nativeLanguage, scenarioId),
    [nativeLanguage, scenarioId],
  );
  const tier = tierFromEntitlements(entitlements);
  const memoryScope = memoryScopeFor(entitlements);
  const canUseAI = entitlements.canUseAI !== false;
  const tokenUsage = entitlements.tokenUsage || null;
  const quotaExceeded = Boolean(tokenUsage?.quotaExceeded || entitlements.canSendAI === false);
  const speechSupported = !!getSpeechRecognition();

  const languageLabel = useMemo(() => {
    const target = LANGUAGES[targetLanguage]?.name || targetLanguage;
    const native = LANGUAGES[nativeLanguage]?.name || nativeLanguage;
    return `${native} -> ${target}`;
  }, [nativeLanguage, targetLanguage]);

  const quickTurns = useMemo(() => {
    if (!canUseAI || quotaExceeded) return [];
    const latestAssistant = [...history].reverse().find(message => message.role === 'assistant' && !message.error);
    const suggested = latestAssistant?.nextSuggestedIntent;
    if (suggested) return [suggested, ...scenario.followUps].slice(0, 3);
    return (history.length ? scenario.followUps : scenario.starters).slice(0, 3);
  }, [canUseAI, quotaExceeded, history, scenario]);

  useEffect(() => {
    const loadedHistory = loadHistory(scenarioId, nativeLanguage, targetLanguage);
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
    setHistory([]);
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
    `Daily AI limit reached. You can continue after ${formatResetAt(usage?.resetAt)}.`
  );

  const sendTurn = async (textOverride, options = {}) => {
    const { autoContinue = false } = options;
    const text = String(textOverride ?? turn).trim();
    if (!text || loading) return;
    if (!canUseAI) {
      setStatus('AI Practice is not available on this plan.');
      setStatusTone('error');
      return;
    }
    if (quotaExceeded) {
      setStatus(quotaResetMessage());
      setStatusTone('error');
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
        sessionId: sessionIdFor(scenarioId, nativeLanguage, targetLanguage),
        scenario: scenario.title,
        targetLanguage,
        nativeLanguage,
        inputLanguage: targetLanguage,
        difficulty: support.difficulty,
        transcript: text,
        history: requestHistory,
        summary: stored.summary || '',
        memory: stored.memory || {},
      });

      const data = response.data || {};
      updateEntitlements(data.entitlements || entitlements);

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
        ? 'AI Practice is not available on this plan.'
        : quotaDenied
          ? resetMessage
        : 'The practice partner had trouble replying. Please try again.';
      appendAssistantFallback(
        message,
        planDenied
          ? 'Your plan settings were refreshed.'
          : quotaDenied
            ? 'Your daily AI access resets automatically.'
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
            <p className="conversation-kicker">AI Practice</p>
            <h1>{scenario.title}</h1>
            <p>{languageLabel}</p>
          </div>
          <div className="conversation-badges" aria-label="Plan and memory status">
            <span className={`conversation-plan ${tier} ${memoryScope}`}>{tier.toUpperCase()}</span>
            <span className={`conversation-memory ${memoryScope}`}>
              <FiShield aria-hidden="true" />
              {memoryScope === 'cloud' ? 'Synced memory' : memoryScope === 'device' ? 'Device memory' : 'No AI memory'}
            </span>
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
                Scenario
                <select value={scenarioId} onChange={(event) => setScenarioId(event.target.value)}>
                  {SCENARIOS.map((item) => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                  ))}
                </select>
              </label>

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
                  <strong>{scenario.goal}</strong>
                </div>
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
              <button
                type="button"
                className={`conversation-reset conversation-handsfree-button ${handsFreeActive ? 'active' : ''}`}
                onClick={handsFreeActive ? stopHandsFree : startHandsFree}
                disabled={!canUseAI || quotaExceeded || !speechSupported || loading}
                title={speechSupported ? 'Start hands-free conversation' : 'Speech input is not available in this browser'}
              >
                <FiMic aria-hidden="true" />
                {handsFreeActive ? 'Stop hands-free' : 'Start hands-free'}
              </button>
              <p className="conversation-handsfree-note">
                {handsFreeActive
                  ? 'Listening resumes after each reply. Use the stop button anytime.'
                  : 'Hands-free keeps the roleplay moving while your hands are busy.'}
              </p>
            </div>
          </aside>

          <main className="conversation-main">
            <div className="conversation-thread-main" ref={threadRef}>
              {!canUseAI && (
                <div className="conversation-locked">
                  <FiWifiOff aria-hidden="true" />
                <strong>AI Practice is not available on this plan.</strong>
                  <span>Daily AI practice is available on Free, Plus, and Pro.</span>
                </div>
              )}

              {canUseAI && quotaExceeded && (
                <div className="conversation-locked">
                  <FiWifiOff aria-hidden="true" />
                  <strong>Daily AI limit reached.</strong>
                  <span>You can continue after {formatResetAt(tokenUsage?.resetAt)}.</span>
                </div>
              )}

              {canUseAI && !quotaExceeded && history.length === 0 && !loading && (
                <div className="conversation-empty-main">
                  <strong>Begin {scenario.title.toLowerCase()}</strong>
                  <span>{uiLabels.activePartner} is ready.</span>
                </div>
              )}

              {history.map((message) => (
                <div key={message.id} className={`conversation-message ${message.role} ${message.error ? 'error' : ''}`}>
                  <div className="message-label">
                    <span>{message.role === 'user' ? uiLabels.learner : uiLabels.activePartner}</span>
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
                placeholder={canUseAI ? 'Type your turn...' : 'AI Practice is not available on this plan.'}
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
