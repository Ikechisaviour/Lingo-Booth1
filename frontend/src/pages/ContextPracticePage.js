import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { aiService, practiceContextService } from '../services/api';
import { getNativeLangCode, getTargetLangCode, getTargetLangName } from '../config/languages';
import './ContextPracticePage.css';

function getSpeechRecognition() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function selectableItems(analysis) {
  return [
    ...((analysis?.topics || []).map((item, index) => ({ ...item, group: 'topics', key: `topics-${index}` }))),
    ...((analysis?.vocabulary || []).map((item, index) => ({ ...item, group: 'vocabulary', key: `vocabulary-${index}` }))),
    ...((analysis?.phrases || []).map((item, index) => ({ ...item, group: 'phrases', key: `phrases-${index}` }))),
  ];
}

function groupSelected(items, selectedKeys) {
  return items.reduce((acc, item) => {
    if (!selectedKeys.has(item.key)) return acc;
    const { group, key, ...clean } = item;
    acc[group] = acc[group] || [];
    acc[group].push(clean);
    return acc;
  }, { topics: [], vocabulary: [], phrases: [] });
}

function isProOrUltraTier(tier) {
  return ['pro', 'ultra'].includes(String(tier || '').toLowerCase());
}

function contextAccessFromEntitlements(entitlements = {}) {
  const storedTier = localStorage.getItem('subscriptionTier');
  const tier = localStorage.getItem('userRole') === 'admin'
    ? 'pro'
    : (entitlements.subscriptionTier || storedTier || (localStorage.getItem('token') ? 'plus' : 'free'));

  return {
    tier,
    canUsePracticeContext: Boolean(
      entitlements.canUsePracticeContext
      || isProOrUltraTier(tier)
      || isProOrUltraTier(storedTier),
    ),
  };
}

function getStoredContextAccess() {
  if (localStorage.getItem('userRole') === 'admin') {
    return { tier: 'pro', canUsePracticeContext: true };
  }

  try {
    return contextAccessFromEntitlements(JSON.parse(localStorage.getItem('aiEntitlements') || '{}'));
  } catch (_) {
    return contextAccessFromEntitlements({});
  }
}

function ContextPracticePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const restartRef = useRef(false);
  const [supported] = useState(() => !!getSpeechRecognition());
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [savedContexts, setSavedContexts] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [status, setStatus] = useState('Ready');
  const [loading, setLoading] = useState(false);
  const [contextAccess, setContextAccess] = useState(getStoredContextAccess);
  const nativeLanguage = getNativeLangCode();
  const targetLanguage = getTargetLangCode();
  const targetName = getTargetLangName();
  const canUseContextPractice = contextAccess.canUsePracticeContext;

  const items = useMemo(() => selectableItems(analysis), [analysis]);

  useEffect(() => {
    let cancelled = false;
    aiService.getEntitlements()
      .then((res) => {
        const entitlements = res.data || {};
        const access = contextAccessFromEntitlements(entitlements);
        if (entitlements.subscriptionTier) {
          localStorage.setItem('subscriptionTier', entitlements.subscriptionTier);
        }
        localStorage.setItem('aiEntitlements', JSON.stringify(entitlements));
        if (!cancelled) setContextAccess(access);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const startConversationPractice = (prompt) => {
    if (!prompt) return;
    sessionStorage.setItem('lingoContextConversationStarter', prompt);
    navigate('/conversation');
  };

  const saveClassPrompt = (prompt) => {
    if (!prompt) return;
    sessionStorage.setItem('lingoContextClassPrompt', prompt);
    navigate('/class');
  };

  const loadSavedContext = async () => {
    if (!canUseContextPractice) {
      setSavedContexts([]);
      setRecommendations(null);
      return;
    }

    const [savedRes, recommendationRes] = await Promise.all([
      practiceContextService.list(targetLanguage),
      practiceContextService.recommendations(targetLanguage),
    ]);
    setSavedContexts(Array.isArray(savedRes.data) ? savedRes.data : []);
    setRecommendations(recommendationRes.data || null);
  };

  useEffect(() => {
    loadSavedContext().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canUseContextPractice, targetLanguage]);

  useEffect(() => () => {
    restartRef.current = false;
    recognitionRef.current?.abort?.();
  }, []);

  const startListening = () => {
    if (!canUseContextPractice) {
      setStatus(t('profilePage.personalizationTier', 'Pro or Premium'));
      return;
    }

    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setStatus('Speech recognition is not available in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = nativeLanguage || 'en-US';

    recognition.onstart = () => {
      restartRef.current = true;
      setListening(true);
      setStatus('Listening for useful learning moments...');
    };
    recognition.onresult = (event) => {
      let finalText = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          finalText += `${event.results[i][0].transcript} `;
        }
      }
      if (finalText.trim()) {
        setTranscript((current) => `${current} ${finalText}`.replace(/\s+/g, ' ').trim());
      }
    };
    recognition.onerror = () => {
      setStatus('Listening paused. You can start again when ready.');
    };
    recognition.onend = () => {
      setListening(false);
      if (restartRef.current) {
        try {
          recognition.start();
        } catch {
          restartRef.current = false;
        }
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    restartRef.current = false;
    recognitionRef.current?.stop?.();
    setListening(false);
    setStatus('Listening stopped. Review or analyze when ready.');
  };

  const analyze = async () => {
    if (!canUseContextPractice) {
      setStatus(t('profilePage.personalizationTier', 'Pro or Premium'));
      return;
    }

    const text = transcript.trim();
    if (!text) {
      setStatus('Add or capture some conversation first.');
      return;
    }
    setLoading(true);
    setStatus('Finding useful learning signals...');
    try {
      const res = await practiceContextService.analyze({
        transcript: text,
        nativeLanguage,
        targetLanguage,
      });
      setAnalysis(res.data);
      const nextKeys = new Set(selectableItems(res.data).map((item) => item.key));
      setSelectedKeys(nextKeys);
      setStatus('Review what should be saved.');
    } catch {
      setStatus('Could not analyze this session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (key) => {
    setSelectedKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const saveSelected = async () => {
    if (!canUseContextPractice) {
      setStatus(t('profilePage.personalizationTier', 'Pro or Premium'));
      return;
    }

    if (!analysis) return;
    const grouped = groupSelected(items, selectedKeys);
    setLoading(true);
    setStatus('Saving approved personalization items...');
    try {
      const payload = {
        source: 'web',
        nativeLanguage,
        targetLanguage,
        summary: analysis.summary,
        environmentTags: analysis.environmentTags || [],
        goals: analysis.goals || [],
        transcriptWordCount: analysis.transcriptWordCount || 0,
        ...grouped,
      };
      const res = await practiceContextService.save(payload);
      setSavedContexts((current) => [res.data, ...current]);
      practiceContextService.recommendations(targetLanguage)
        .then((recommendationRes) => setRecommendations(recommendationRes.data || null))
        .catch(() => {});
      setAnalysis(null);
      setTranscript('');
      setSelectedKeys(new Set());
      setStatus('Saved. Future practice can use these items.');
    } catch {
      setStatus('Could not save these items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteContext = async (contextId) => {
    if (!canUseContextPractice) return;

    try {
      await practiceContextService.delete(contextId);
      setSavedContexts((current) => current.filter((item) => item._id !== contextId));
      practiceContextService.recommendations(targetLanguage)
        .then((recommendationRes) => setRecommendations(recommendationRes.data || null))
        .catch(() => {});
    } catch {
      setStatus('Could not delete that saved item.');
    }
  };

  if (!canUseContextPractice) {
    return (
      <div className="context-page">
        <section className="context-hero">
          <div>
            <p className="context-kicker">{t('profilePage.personalizationTitle')}</p>
            <h1>{t('contextPractice.title', 'Lessons shaped around you')}</h1>
            <p>
              {t('contextPractice.lockedDesc', 'Pro and Premium can save approved words, phrases, and situations from real life so future practice feels more relevant. Free and Plus can continue using the regular lessons and conversation practice.')}
            </p>
          </div>
          <div className="context-status">
            <span>{String(contextAccess.tier || 'free').toUpperCase()}</span>
            <strong>{t('contextPractice.upgradeTitle', 'Upgrade to personalize practice')}</strong>
          </div>
        </section>
        <section className="context-panel">
          <div className="context-panel-head">
            <div>
              <p className="context-kicker">{t('contextPractice.availableNow', 'Available now')}</p>
              <h2>{t('contextPractice.keepLearning', 'Keep learning')}</h2>
            </div>
            <button type="button" onClick={() => navigate('/conversation')}>
              {t('contextPractice.openConversation', 'Open Conversation')}
            </button>
          </div>
          <div className="context-empty">
            {t('contextPractice.upgradeDesc', 'Upgrade when you want lessons, review prompts, and roleplays to adapt to the everyday language you approve.')}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="context-page">
      <section className="context-hero">
        <div>
          <p className="context-kicker">{t('profilePage.personalizationTitle')}</p>
          <h1>{t('contextPractice.title', 'Lessons shaped around you')}</h1>
          <p>
            {t('contextPractice.subtitle', 'Capture a visible practice session, review the useful words and situations, then save only what you approve. Saved items help {{language}} class and conversation practice feel more relevant.', { language: targetName })}
          </p>
        </div>
        <div className={`context-status ${listening ? 'active' : ''}`}>
          <span>{listening ? t('contextPractice.listening', 'Listening') : t('contextPractice.off', 'Off')}</span>
          <strong>{status}</strong>
        </div>
      </section>

      <section className="context-layout">
        <div className="context-panel">
          <div className="context-panel-head">
            <div>
              <p className="context-kicker">{t('contextPractice.session', 'Session')}</p>
              <h2>{t('contextPractice.liveCapture', 'Live capture')}</h2>
            </div>
            <div className="context-actions">
              <button type="button" onClick={listening ? stopListening : startListening} disabled={!supported || loading}>
                {listening ? t('contextPractice.stopListening', 'Stop listening') : t('contextPractice.startListening', 'Start listening')}
              </button>
              <button type="button" className="secondary" onClick={analyze} disabled={loading || !transcript.trim()}>
                {t('contextPractice.analyze', 'Analyze')}
              </button>
            </div>
          </div>
          {!supported && (
            <p className="context-warning">{t('contextPractice.unsupportedSpeech', 'This browser does not support speech recognition. You can paste notes below instead.')}</p>
          )}
          <textarea
            value={transcript}
            onChange={(event) => setTranscript(event.target.value)}
            placeholder={t('contextPractice.transcriptPlaceholder', 'Captured transcript or notes appear here. Raw transcript is not saved unless you copy it somewhere yourself.')}
          />
          <p className="context-privacy">{t('contextPractice.privacyNote', 'Raw audio is not stored. The transcript is used only for this analysis request.')}</p>
        </div>

        <div className="context-panel">
          <div className="context-panel-head">
            <div>
              <p className="context-kicker">{t('contextPractice.review', 'Review')}</p>
              <h2>{t('contextPractice.approveTitle', 'Approve what to save')}</h2>
            </div>
            <button type="button" onClick={saveSelected} disabled={loading || !analysis || selectedKeys.size === 0}>
              {t('contextPractice.saveSelected', 'Save selected')}
            </button>
          </div>
          {!analysis ? (
            <div className="context-empty">{t('contextPractice.emptyAnalysis', 'Analyze a session to see suggested topics, words, and phrases.')}</div>
          ) : (
            <>
              <p className="context-summary">{analysis.summary}</p>
              <div className="context-chip-row">
                {(analysis.environmentTags || []).map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="context-suggestions">
                {items.map((item) => (
                  <label key={item.key} className="context-suggestion">
                    <input
                      type="checkbox"
                      checked={selectedKeys.has(item.key)}
                      onChange={() => toggleItem(item.key)}
                    />
                    <span>
                      <strong>{item.text}</strong>
                      <small>{item.group} {item.note ? `- ${item.note}` : ''}</small>
                    </span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="context-panel">
        <div className="context-panel-head">
          <div>
            <p className="context-kicker">{t('contextPractice.practiceNext', 'Practice next')}</p>
            <h2>{t('contextPractice.personalizedActions', 'Personalized actions')}</h2>
          </div>
        </div>
        {!recommendations?.hasContext ? (
          <div className="context-empty">{t('contextPractice.emptyRecommendations', 'Save personalization items to unlock roleplays, review drills, and class prompts.')}</div>
        ) : (
          <div className="context-actions-grid">
            <div>
              <h3>{t('contextPractice.roleplays', 'Roleplays')}</h3>
              {(recommendations.roleplays || []).map((item) => (
                <div key={item.prompt} className="context-action-card">
                  <strong>{item.title}</strong>
                  <p>{item.prompt}</p>
                  <button type="button" onClick={() => startConversationPractice(item.prompt)}>{t('contextPractice.startInConversation', 'Start in Conversation')}</button>
                </div>
              ))}
            </div>
            <div>
              <h3>{t('contextPractice.reviewDrills', 'Review drills')}</h3>
              {(recommendations.reviewDrills || []).slice(0, 6).map((item) => (
                <div key={item.prompt} className="context-action-card">
                  <strong>{item.text}</strong>
                  <p>{item.prompt}</p>
                  <button type="button" onClick={() => startConversationPractice(item.prompt)}>{t('contextPractice.practiceThis', 'Practice this')}</button>
                </div>
              ))}
            </div>
            <div>
              <h3>{t('contextPractice.tutorPrompts', 'Tutor prompts')}</h3>
              {(recommendations.classPrompts || []).map((prompt) => (
                <div key={prompt} className="context-action-card">
                  <p>{prompt}</p>
                  <button type="button" onClick={() => saveClassPrompt(prompt)}>{t('contextPractice.useInClass', 'Use in Class')}</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="context-panel">
        <div className="context-panel-head">
          <div>
            <p className="context-kicker">{t('contextPractice.saved', 'Saved')}</p>
            <h2>{t('contextPractice.savedPersonalization', 'Saved personalization')}</h2>
          </div>
        </div>
        {savedContexts.length === 0 ? (
          <div className="context-empty">{t('contextPractice.emptySaved', 'No saved personalization items yet.')}</div>
        ) : (
          <div className="context-saved-grid">
            {savedContexts.map((context) => (
              <article key={context._id} className="context-saved-card">
                <p>{context.summary || t('contextPractice.savedItem', 'Saved personalization item')}</p>
                <div className="context-chip-row">
                  {(context.environmentTags || []).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <small>
                  {(context.vocabulary || []).slice(0, 5).map((item) => item.text).join(', ')}
                </small>
                <button type="button" className="danger" onClick={() => deleteContext(context._id)}>{t('common.delete')}</button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ContextPracticePage;
