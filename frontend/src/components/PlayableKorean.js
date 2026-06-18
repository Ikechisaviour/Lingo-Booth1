import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiPause, FiVolume2 } from 'react-icons/fi';
import './PlayableKorean.css';

/**
 * Play a Korean string aloud via the browser SpeechSynthesis API.
 *
 * The same component is used in two visual modes:
 *   variant="button"  — a pill ("▶ Listen") next to a header.
 *   variant="icon"    — a tight speaker icon inline with text. Default.
 *
 * The `text` prop is what gets spoken. If the lesson schema provides a
 * `referenceAudioUrl` (e.g. on PronunciationItem), pass it as `audioUrl` and
 * the component plays that file instead of TTS — TTS is the fallback.
 *
 * Auto-play: when `autoPlay` is true and SpeechSynthesis is available, the
 * component triggers speak() once on mount. SessionShell's "Listen mode" flips
 * this for the currently-mounted lesson card.
 */

let activeUtterance = null;
let activeAudio = null;

function cancelActive() {
  try {
    if (activeUtterance && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  } catch (_) { /* noop */ }
  activeUtterance = null;
  if (activeAudio) {
    try { activeAudio.pause(); } catch (_) { /* noop */ }
    activeAudio = null;
  }
}

export function pickKoreanVoice() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  // Prefer a Korean-locale voice; some browsers list it as 'ko-KR', others 'ko'.
  return (
    voices.find((v) => /^ko(-KR)?$/i.test(v.lang))
    || voices.find((v) => /korean/i.test(v.name))
    || null
  );
}

function PlayableKorean({
  text,
  audioUrl = null,
  rate = 0.9,
  variant = 'icon',
  label = null,
  autoPlay = false,
  className = '',
  ariaLabel = 'Play',
  stopAriaLabel = 'Stop',
}) {
  const [playing, setPlaying] = useState(false);
  const elementRef = useRef(null);

  const stop = useCallback(() => {
    cancelActive();
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (typeof window === 'undefined') return;
    cancelActive();
    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        activeAudio = audio;
        audio.addEventListener('ended', () => { if (activeAudio === audio) { activeAudio = null; setPlaying(false); } });
        audio.addEventListener('error', () => { if (activeAudio === audio) { activeAudio = null; setPlaying(false); } });
        audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        return;
      } catch (_) {
        // Fall through to TTS if file playback errors out.
      }
    }
    if (!window.speechSynthesis || !text) return;
    try {
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = rate;
      const voice = pickKoreanVoice();
      if (voice) utterance.voice = voice;
      utterance.addEventListener('end', () => { if (activeUtterance === utterance) { activeUtterance = null; setPlaying(false); } });
      utterance.addEventListener('error', () => { if (activeUtterance === utterance) { activeUtterance = null; setPlaying(false); } });
      activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      setPlaying(true);
    } catch (_) {
      setPlaying(false);
    }
  }, [text, audioUrl, rate]);

  // Auto-play once on mount when requested. Skips silently if the API isn't
  // available so the lesson still renders.
  useEffect(() => {
    if (!autoPlay) return undefined;
    // Defer so the page paints first; some browsers race the speak call
    // before voices have loaded.
    const t = setTimeout(() => {
      if (typeof window !== 'undefined' && (window.speechSynthesis?.getVoices?.()?.length || audioUrl)) {
        play();
      } else if (typeof window !== 'undefined' && window.speechSynthesis) {
        // Voices haven't loaded yet — wait once and retry.
        const handler = () => { play(); window.speechSynthesis.removeEventListener('voiceschanged', handler); };
        window.speechSynthesis.addEventListener('voiceschanged', handler);
      }
    }, 80);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  // Always cancel speech on unmount.
  useEffect(() => () => { if (activeUtterance || activeAudio) cancelActive(); }, []);

  const handleClick = (event) => {
    event.stopPropagation();
    if (playing) stop();
    else play();
  };

  const ariaState = playing ? stopAriaLabel : ariaLabel;

  if (variant === 'button') {
    return (
      <button
        ref={elementRef}
        type="button"
        className={`playable-korean playable-korean--button ${playing ? 'is-playing' : ''} ${className}`.trim()}
        onClick={handleClick}
        aria-label={ariaState}
      >
        {playing ? <FiPause /> : <FiVolume2 />}
        <span>{label || ariaState}</span>
      </button>
    );
  }

  return (
    <button
      ref={elementRef}
      type="button"
      className={`playable-korean playable-korean--icon ${playing ? 'is-playing' : ''} ${className}`.trim()}
      onClick={handleClick}
      aria-label={ariaState}
    >
      {playing ? <FiPause /> : <FiVolume2 />}
    </button>
  );
}

export default PlayableKorean;
