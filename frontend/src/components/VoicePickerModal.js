import React, { useEffect, useMemo, useState } from 'react';
import speechService from '../services/speechService';
import './VoicePickerModal.css';

const SAMPLE_PHRASES = {
  ko: '안녕하세요. 만나서 반갑습니다.',
  en: 'Hi there. It is nice to meet you.',
  es: 'Hola. Encantado de conocerte.',
  fr: 'Bonjour. Ravi de vous rencontrer.',
  de: 'Hallo. Schön, dich kennenzulernen.',
  ja: 'こんにちは。お会いできて嬉しいです。',
  zh: '你好。很高兴见到你。',
  hi: 'नमस्ते। आपसे मिलकर खुशी हुई।',
  ar: 'مرحبًا. سعيد بلقائك.',
  pt: 'Olá. Prazer em conhecê-lo.',
  it: 'Ciao. Piacere di conoscerti.',
  ru: 'Здравствуйте. Приятно познакомиться.',
  id: 'Halo. Senang berkenalan.',
  ms: 'Helo. Senang berkenalan dengan anda.',
  tr: 'Merhaba. Tanıştığımıza memnun oldum.',
  he: 'שלום. נעים להכיר.',
  nl: 'Hallo. Leuk je te ontmoeten.',
  fil: 'Kumusta. Ikinagagalak kitang makilala.',
  bn: 'নমস্কার। আপনার সাথে পরিচয় হয়ে ভালো লাগল।',
  ta: 'வணக்கம். உங்களைச் சந்தித்ததில் மகிழ்ச்சி.',
};

const FALLBACK_PHRASE = 'Hello. Nice to meet you.';

function samplePhraseFor(targetLangCode) {
  return SAMPLE_PHRASES[String(targetLangCode || '').toLowerCase()] || FALLBACK_PHRASE;
}

function VoicePickerModal({
  open,
  targetLangCode,
  targetLangName,
  ttsLocale,
  onClose,
  onPicked,
}) {
  const [voices, setVoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewingVoice, setPreviewingVoice] = useState('');
  const phrase = useMemo(() => samplePhraseFor(targetLangCode), [targetLangCode]);

  useEffect(() => {
    if (!open) return undefined;
    let cancelled = false;
    setLoading(true);
    setError('');
    setVoices([]);
    const localePrefix = String(ttsLocale || '').split('-')[0];
    speechService.getVoicesForLang(localePrefix)
      .then((list) => {
        if (cancelled) return;
        // Keep one voice per (locale + gender) to avoid 10+ near-duplicates.
        const seen = new Set();
        const filtered = (list || []).filter((voice) => {
          const key = `${voice.lang}|${voice.gender || ''}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        }).slice(0, 6);
        setVoices(filtered);
      })
      .catch(() => {
        if (!cancelled) setError('Could not load voice options. The default voice will be used.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
      speechService.cancel();
    };
  }, [open, ttsLocale]);

  const preview = (voice) => {
    setPreviewingVoice(voice.name);
    speechService.speakAsync(phrase, { lang: voice.lang || ttsLocale, voice: voice.name, rate: '-5%' })
      .finally(() => setPreviewingVoice((current) => (current === voice.name ? '' : current)));
  };

  const choose = (voice) => {
    speechService.cancel();
    speechService.setVoice(voice.name, targetLangCode);
    if (onPicked) onPicked(voice.name);
  };

  const skip = () => {
    speechService.cancel();
    // Stamp the storage key so we don't keep prompting on every page load.
    localStorage.setItem('classVoicePickerSeen', '1');
    if (onClose) onClose();
  };

  if (!open) return null;

  return (
    <div className="voice-picker-backdrop" role="dialog" aria-modal="true" aria-label="Pick a tutor voice">
      <div className="voice-picker-modal">
        <h2>Pick a voice for {targetLangName || 'your target language'}</h2>
        <p>Tap a voice to hear a sample sentence, then choose the one you want for class.</p>

        {loading && <p className="voice-picker-status">Loading voices…</p>}
        {error && <p className="voice-picker-error">{error}</p>}

        <ul className="voice-picker-list">
          {voices.map((voice) => (
            <li key={voice.name}>
              <div className="voice-picker-info">
                <strong>{voice.displayName || voice.name}</strong>
                <span>{voice.lang} · {voice.gender || 'unspecified'}</span>
              </div>
              <div className="voice-picker-actions">
                <button
                  type="button"
                  className="voice-picker-preview"
                  onClick={() => preview(voice)}
                  disabled={previewingVoice === voice.name}
                >
                  {previewingVoice === voice.name ? 'Playing…' : 'Listen'}
                </button>
                <button
                  type="button"
                  className="voice-picker-choose"
                  onClick={() => choose(voice)}
                >
                  Use this voice
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="voice-picker-footer">
          <button type="button" onClick={skip}>Use the default voice for now</button>
        </div>
      </div>
    </div>
  );
}

export default VoicePickerModal;
