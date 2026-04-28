import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { adminService, ttsService } from '../services/api';
import './AdminSpeakingDemo.css';

const DEMO_PROMPTS = {
  repeat: [
    '안녕하세요',
    '감사합니다',
    '화장실이 어디예요?',
  ],
  read: [
    '오늘 날씨가 정말 좋아요.',
    '저는 한국어를 매일 조금씩 공부해요.',
    '길을 건너기 전에 좌우를 잘 살펴보세요.',
  ],
  conversation: [
    '카페에서 커피를 주문하는 상황',
    '택시 기사에게 목적지를 말하는 상황',
    '처음 만난 사람과 자기소개하는 상황',
  ],
  handsfree: [
    '안녕하세요. 만나서 반갑습니다.',
    '천천히 다시 말해 주세요.',
    '저는 지금 한국어를 연습하고 있어요.',
  ],
};

const MODE_LABELS = {
  repeat: 'Repeat',
  read: 'Read aloud',
  conversation: 'Conversation',
  handsfree: 'Hands-free',
};

const COMMANDS = new Set(['repeat', 'again', 'next', 'pause', 'stop', 'slower']);

const LANGUAGE_OPTIONS = [
  { id: 'ko', label: 'Korean', speech: 'ko-KR' },
  { id: 'en', label: 'English', speech: 'en-US' },
  { id: 'es', label: 'Spanish', speech: 'es-ES' },
  { id: 'fr', label: 'French', speech: 'fr-FR' },
  { id: 'de', label: 'German', speech: 'de-DE' },
  { id: 'zh', label: 'Chinese', speech: 'zh-CN' },
  { id: 'ja', label: 'Japanese', speech: 'ja-JP' },
  { id: 'hi', label: 'Hindi', speech: 'hi-IN' },
  { id: 'ar', label: 'Arabic', speech: 'ar-SA' },
  { id: 'he', label: 'Hebrew', speech: 'he-IL' },
  { id: 'pt', label: 'Portuguese', speech: 'pt-BR' },
  { id: 'it', label: 'Italian', speech: 'it-IT' },
  { id: 'nl', label: 'Dutch', speech: 'nl-NL' },
  { id: 'ru', label: 'Russian', speech: 'ru-RU' },
  { id: 'id', label: 'Indonesian', speech: 'id-ID' },
  { id: 'ms', label: 'Malay', speech: 'ms-MY' },
  { id: 'fil', label: 'Filipino', speech: 'fil-PH' },
  { id: 'tr', label: 'Turkish', speech: 'tr-TR' },
  { id: 'bn', label: 'Bengali', speech: 'bn-BD' },
  { id: 'ta', label: 'Tamil', speech: 'ta-IN' },
];

const DIFFICULTY_OPTIONS = ['casual beginner', 'balanced', 'more natural', 'challenge me'];

function normalize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[.,!?;:'"()[\]{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a, b) {
  const rows = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j += 1) rows[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      rows[i][j] = Math.min(
        rows[i - 1][j] + 1,
        rows[i][j - 1] + 1,
        rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return rows[a.length][b.length];
}

function scoreTranscript(expected, transcript) {
  const target = normalize(expected);
  const spoken = normalize(transcript);
  if (!spoken) {
    return { score: 0, feedback: 'No speech was captured yet.', quality: 'idle' };
  }
  const maxLen = Math.max(target.length, spoken.length, 1);
  const distance = levenshtein(target, spoken);
  const similarity = Math.max(0, Math.round((1 - distance / maxLen) * 100));
  const targetWords = target.split(' ').filter(Boolean);
  const spokenWords = new Set(spoken.split(' ').filter(Boolean));
  const covered = targetWords.length
    ? targetWords.filter(word => spokenWords.has(word)).length / targetWords.length
    : similarity / 100;
  const score = Math.round((similarity * 0.75) + (covered * 100 * 0.25));

  if (score >= 85) return { score, feedback: 'Strong match. This is ready for a polished demo.', quality: 'strong' };
  if (score >= 70) return { score, feedback: 'Good enough to pass. A retry can improve fluency.', quality: 'good' };
  if (score >= 45) return { score, feedback: 'Partial match. Useful for testing retry prompts.', quality: 'partial' };
  return { score, feedback: 'Low match. The demo should ask the learner to repeat.', quality: 'low' };
}

function getSpeechRecognition() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function AdminSpeakingDemo({ demoBypass = false }) {
  const [mode, setMode] = useState('repeat');
  const [promptIndex, setPromptIndex] = useState(0);
  const [customPrompt, setCustomPrompt] = useState('');
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('Ready');
  const [listening, setListening] = useState(false);
  const [handsFreeActive, setHandsFreeActive] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [aiReply, setAiReply] = useState('');
  const [aiTip, setAiTip] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState('ko');
  const [nativeLanguage, setNativeLanguage] = useState('en');
  const [inputLanguage, setInputLanguage] = useState('ko');
  const [conversationDifficulty, setConversationDifficulty] = useState('casual beginner');
  const [typedTurn, setTypedTurn] = useState('');
  const recognitionRef = useRef(null);
  const handsFreeRef = useRef(false);
  const suppressPromptReplayRef = useRef(false);
  const audioRef = useRef(null);

  const recognitionSupported = !!getSpeechRecognition();
  const currentPrompt = customPrompt || DEMO_PROMPTS[mode][promptIndex % DEMO_PROMPTS[mode].length];
  const result = useMemo(() => scoreTranscript(currentPrompt, transcript), [currentPrompt, transcript]);
  const isAiConversation = mode === 'conversation';

  useEffect(() => {
    handsFreeRef.current = handsFreeActive;
  }, [handsFreeActive]);

  const stopSpeech = useCallback(() => {
    audioRef.current?.pause?.();
    audioRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort?.();
      stopSpeech();
    };
  }, [stopSpeech]);

  const movePrompt = (direction) => {
    setTranscript('');
    setAiReply('');
    setAiTip('');
    setConversationHistory([]);
    setPromptIndex(prev => {
      const prompts = DEMO_PROMPTS[mode];
      return (prev + direction + prompts.length) % prompts.length;
    });
  };

  const stopListening = () => {
    recognitionRef.current?.stop?.();
    setListening(false);
  };

  const stopHandsFree = () => {
    handsFreeRef.current = false;
    setHandsFreeActive(false);
    setListening(false);
    setStatus('Hands-free stopped.');
    recognitionRef.current?.abort?.();
    stopSpeech();
  };

  const speechLangFor = (languageId) => (
    LANGUAGE_OPTIONS.find(language => language.id === languageId)?.speech
    || LANGUAGE_OPTIONS.find(language => language.id === targetLanguage)?.speech
    || 'ko-KR'
  );

  const preferredVoiceFor = (lang) => {
    const preferredVoice = localStorage.getItem('preferredVoice');
    return lang === speechLangFor(targetLanguage) ? preferredVoice || undefined : undefined;
  };

  const speak = (text, options = {}) => {
    if (!text) return Promise.resolve();
    stopSpeech();
    const lang = options.lang || speechLangFor(targetLanguage);
    const voice = options.voice || preferredVoiceFor(lang);
    const audio = new Audio(ttsService.buildSpeakUrl(text, lang, voice, options.rate || 0.92));
    audioRef.current = audio;
    return new Promise(resolve => {
      const finish = () => {
        if (audioRef.current === audio) audioRef.current = null;
        resolve();
      };
      audio.onended = finish;
      audio.onerror = finish;
      audio.play().catch(finish);
    });
  };

  const handleCommand = async (command) => {
    setLastCommand(command);
    if (command === 'stop' || command === 'pause') {
      stopHandsFree();
      return true;
    }
    if (command === 'next') {
      movePrompt(1);
      return true;
    }
    if (command === 'repeat' || command === 'again' || command === 'slower') {
      const textToReplay = isAiConversation ? (aiReply || currentPrompt) : currentPrompt;
      await speak(textToReplay, { rate: command === 'slower' ? 0.72 : 0.92 });
      return true;
    }
    return false;
  };

  const startListening = ({ autoContinue = false } = {}) => {
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setStatus('Speech recognition is not available in this browser.');
      return;
    }

    recognitionRef.current?.abort?.();
    stopSpeech();
    const recognition = new Recognition();
    const listeningLanguage = LANGUAGE_OPTIONS.find(language => language.id === inputLanguage) || LANGUAGE_OPTIONS[0];
    recognition.lang = isAiConversation ? listeningLanguage.speech : 'ko-KR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setListening(true);
      setStatus('Listening...');
    };
    recognition.onerror = (event) => {
      setListening(false);
      suppressPromptReplayRef.current = false;
      setStatus(`Could not capture speech: ${event.error || 'unknown error'}`);
    };
    recognition.onend = () => {
      setListening(false);
      if (isAiConversation) return;
      if (suppressPromptReplayRef.current) {
        suppressPromptReplayRef.current = false;
        return;
      }
      if (!autoContinue || !handsFreeRef.current) return;
      setTimeout(() => {
        if (handsFreeRef.current) runHandsFreeTurn();
      }, 900);
    };
    recognition.onresult = async (event) => {
      const text = event.results?.[0]?.[0]?.transcript || '';
      const normalized = normalize(text);
      if (COMMANDS.has(normalized)) {
        const handled = await handleCommand(normalized);
        if (handled) return;
      }

      setTranscript(text);
      if (isAiConversation) {
        suppressPromptReplayRef.current = true;
        await sendAiConversationTurn(text, { autoContinue });
        return;
      }
      const scored = scoreTranscript(currentPrompt, text);
      setStatus(scored.feedback);

      if (autoContinue && handsFreeRef.current) {
        const spokenFeedback = scored.score >= 70
          ? `Good. Score ${scored.score}. Next.`
          : `Score ${scored.score}. Try that one again.`;
        await speak(spokenFeedback, { lang: 'en-US' });
        if (scored.score >= 70) movePrompt(1);
      }
    };
    recognition.start();
  };

  const sendAiConversationTurn = async (text, { autoContinue = false } = {}) => {
    setAiLoading(true);
    setStatus('Asking AI conversation coach...');
    try {
      const payload = {
        scenario: currentPrompt,
        targetLanguage,
        nativeLanguage,
        inputLanguage,
        difficulty: conversationDifficulty,
        transcript: text,
        history: conversationHistory,
      };
      const response = demoBypass
        ? await adminService.sendLocalSpeakingDemoTurn(payload)
        : await adminService.sendSpeakingDemoTurn(payload);
      const data = response.data || {};
      setAiEnabled(!!data.aiEnabled);
      setAiReply(data.reply || '');
      setAiTip(data.coachingTip || '');
      setConversationHistory(prev => [
        ...prev.slice(-6),
        { role: 'user', content: text },
        { role: 'assistant', content: data.reply || '' },
      ]);
      setStatus(data.aiEnabled ? 'AI replied with the next conversation turn.' : 'AI fallback active.');
      if (data.reply) {
        const speechParts = Array.isArray(data.speechParts) ? data.speechParts : [];
        if (data.aiEnabled && speechParts.length) {
          for (const part of speechParts) {
            if (part?.text) {
              await speak(part.text, { lang: speechLangFor(part.language) });
            }
          }
        } else {
          const spokenLanguage = data.expectedLanguage === nativeLanguage
            ? speechLangFor(nativeLanguage)
            : speechLangFor(targetLanguage);
          await speak(data.reply, { lang: data.aiEnabled ? spokenLanguage : 'en-US' });
        }
      }
      if (autoContinue && handsFreeRef.current && data.aiEnabled) {
        setTimeout(() => startListening({ autoContinue: true }), 800);
      }
    } catch (error) {
      setStatus(error.response?.data?.message || 'AI conversation failed.');
      setAiTip(error.response?.data?.detail || 'Check backend logs and OPENAI_API_KEY.');
    } finally {
      setAiLoading(false);
    }
  };

  const runHandsFreeTurn = async () => {
    if (!handsFreeRef.current) return;
    if (isAiConversation) {
      setStatus('Hands-free conversation listening...');
      if (!conversationHistory.length && !aiReply) {
        await speak('Conversation mode. Speak naturally. You can interrupt me or ask a question.', { lang: 'en-US' });
      }
    } else {
      setStatus('Hands-free prompt playing...');
      await speak('Listen, then answer.', { lang: 'en-US' });
      await speak(currentPrompt);
    }
    if (!handsFreeRef.current) return;
    startListening({ autoContinue: true });
  };

  const startHandsFree = () => {
    setHandsFreeActive(true);
    handsFreeRef.current = true;
    setTranscript('');
    setStatus('Hands-free starting...');
    runHandsFreeTurn();
  };

  const submitTypedTurn = async () => {
    const text = typedTurn.trim();
    if (!text) return;
    setTypedTurn('');
    setTranscript(text);
    if (isAiConversation) {
      await sendAiConversationTurn(text);
    }
  };

  return (
    <div className="speaking-demo">
      <div className="speaking-demo-header">
        <div>
          <p className="demo-kicker">Admin demo lab</p>
          <h2>Speaking Prototype</h2>
          <p>
            This is isolated from learner routes and does not save audio or progress.
            Use it to test repeat, read-aloud, conversation, and hands-free flows before release.
          </p>
          {demoBypass && (
            <p className="demo-bypass-note">
              Local preview mode: no admin login is required on this machine. This route is hidden from normal users.
            </p>
          )}
        </div>
        <div className={`demo-support ${recognitionSupported ? 'supported' : 'blocked'}`}>
          {recognitionSupported ? 'Mic recognition available' : 'Speech recognition unavailable'}
        </div>
      </div>

      <div className="demo-mode-grid">
        {Object.entries(MODE_LABELS).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`demo-mode ${mode === id ? 'active' : ''}`}
            onClick={() => {
              setMode(id);
              setPromptIndex(0);
              setTranscript('');
              setCustomPrompt('');
              setAiReply('');
              setAiTip('');
              setConversationHistory([]);
              setAiEnabled(null);
              stopHandsFree();
            }}
          >
            <span>{label}</span>
            <small>
              {id === 'repeat' && 'Few words and short phrases'}
              {id === 'read' && 'Full sentence reading checks'}
              {id === 'conversation' && 'Live AI roleplay turns'}
              {id === 'handsfree' && 'Audio-led practice for road use'}
            </small>
          </button>
        ))}
      </div>

      <div className="demo-workspace">
        <section className="demo-panel prompt-panel">
          <div className="panel-heading">
            <h3>Prompt</h3>
            <div className="prompt-controls">
              <button type="button" onClick={() => movePrompt(-1)}>Previous</button>
              <button type="button" onClick={() => movePrompt(1)}>Next</button>
            </div>
          </div>
          <div className="target-phrase">
            {isAiConversation ? `AI scenario: ${currentPrompt}` : currentPrompt}
          </div>
          {isAiConversation && (
            <div className="conversation-controls">
              <label>
                Learning
                <select value={targetLanguage} onChange={(event) => setTargetLanguage(event.target.value)}>
                  {LANGUAGE_OPTIONS.map(language => (
                    <option key={language.id} value={language.id}>{language.label}</option>
                  ))}
                </select>
              </label>
              <label>
                Native
                <select value={nativeLanguage} onChange={(event) => setNativeLanguage(event.target.value)}>
                  {LANGUAGE_OPTIONS.map(language => (
                    <option key={language.id} value={language.id}>{language.label}</option>
                  ))}
                </select>
              </label>
              <label>
                Listen for
                <select value={inputLanguage} onChange={(event) => setInputLanguage(event.target.value)}>
                  {LANGUAGE_OPTIONS.map(language => (
                    <option key={language.id} value={language.id}>{language.label}</option>
                  ))}
                </select>
              </label>
              <label>
                Difficulty
                <select value={conversationDifficulty} onChange={(event) => setConversationDifficulty(event.target.value)}>
                  {DIFFICULTY_OPTIONS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </label>
            </div>
          )}
          <textarea
            value={customPrompt}
            onChange={(event) => {
              setCustomPrompt(event.target.value);
              setTranscript('');
            }}
            placeholder={isAiConversation ? 'Optional custom AI roleplay scenario...' : 'Optional custom target phrase for this demo...'}
            rows={3}
          />
          {isAiConversation && (
            <div className="typed-turn">
              <textarea
                value={typedTurn}
                onChange={(event) => setTypedTurn(event.target.value)}
                placeholder="Type a test turn here if speech capture is unreliable..."
                rows={2}
              />
              <button type="button" onClick={submitTypedTurn} disabled={!typedTurn.trim() || aiLoading}>
                Send typed turn
              </button>
            </div>
          )}
          <div className="demo-actions">
            <button type="button" onClick={() => speak(currentPrompt)} disabled={!currentPrompt}>
              {isAiConversation ? 'Play scenario' : 'Play prompt'}
            </button>
            <button type="button" onClick={() => startListening()} disabled={!recognitionSupported || listening}>
              {listening ? 'Listening...' : isAiConversation ? 'Interrupt / Speak' : 'Record answer'}
            </button>
            <button type="button" onClick={stopListening} disabled={!listening}>
              Stop mic
            </button>
          </div>
        </section>

        <section className="demo-panel result-panel">
          <div className="panel-heading">
            <h3>Feedback</h3>
            <span className={`score-badge ${result.quality}`}>{result.score}</span>
          </div>
          <label>Transcript</label>
          <div className="transcript-box">{transcript || 'No transcript yet.'}</div>
          <label>Status</label>
          <div className="status-box">{status}</div>
          {isAiConversation && (
            <>
              <label>AI response {aiEnabled === false ? '(fallback)' : ''}</label>
              <div className="transcript-box ai-reply">
                {aiLoading ? 'Thinking...' : aiReply || 'Speak to the AI to start the roleplay.'}
              </div>
              <label>Coach note</label>
              <div className="status-box">{aiTip || 'No coaching note yet.'}</div>
            </>
          )}
          <div className="score-meter">
            <span style={{ width: `${result.score}%` }} />
          </div>
        </section>
      </div>

      <section className="demo-panel handsfree-panel">
        <div>
          <h3>Hands-free controller</h3>
          <p>
            {isAiConversation
              ? 'Starts a hands-free conversation loop. You can interrupt, ask in your native language, change topic, or ask for easier wording.'
              : 'Starts an audio-led loop: prompt, listen, spoken feedback, then repeat or advance.'}
            {' '}Voice commands supported in English: repeat, again, slower, next, pause, stop.
          </p>
          {lastCommand && <p className="last-command">Last command: {lastCommand}</p>}
        </div>
        <div className="demo-actions">
          <button type="button" onClick={startHandsFree} disabled={!recognitionSupported || handsFreeActive}>
            Start hands-free
          </button>
          <button type="button" onClick={stopHandsFree} disabled={!handsFreeActive}>
            Stop hands-free
          </button>
        </div>
      </section>
    </div>
  );
}

export default AdminSpeakingDemo;
