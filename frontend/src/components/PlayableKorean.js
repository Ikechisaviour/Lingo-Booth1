import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiPause, FiVolume2 } from 'react-icons/fi';
import speechService from '../services/speechService';
import './PlayableKorean.css';

/**
 * Play a Korean (or other target-language) string aloud.
 *
 * Delegates to the app's `speechService` so the user's voice preference
 * (selected from Profile → Settings → Voice settings) is honored — the same
 * voice the rest of the app uses for class lessons, conversation replies,
 * and flashcards.
 *
 * Visual modes:
 *   variant="button"  — a pill ("▶ Listen") next to a header.
 *   variant="icon"    — a tight speaker icon inline with text. Default.
 *
 * If a lesson provides `audioUrl` (e.g. PronunciationItem.referenceAudioUrl),
 * the file plays directly via HTMLAudioElement; otherwise speechService
 * synthesizes the text. The user-picked voice applies to the TTS path; the
 * pre-recorded path bypasses voice selection by definition.
 *
 * Auto-play: when `autoPlay` is true OR `primary` is true and the session
 * has Listen mode enabled, the component speaks once on mount. SessionShell
 * uses the `primary` flag to flip autoplay across the right elements.
 */

let activeAudio = null;        // active <audio> for the pre-recorded path
let activeOwner = null;        // ref to whichever instance currently owns playback

function stopActive() {
  if (activeAudio) {
    try { activeAudio.pause(); } catch (_) { /* noop */ }
    activeAudio = null;
  }
  try { speechService.cancel(); } catch (_) { /* noop */ }
  activeOwner = null;
}

function readListenMode() {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem('listenMode') === 'true';
  } catch (_) {
    return false;
  }
}

function PlayableKorean({
  text,
  audioUrl = null,
  lang,                          // optional BCP-47 hint; speechService auto-detects when undefined
  voice = null,                  // optional explicit voice; bypasses lookup
  variant = 'icon',
  label = null,
  autoPlay = false,
  primary = false,
  className = '',
  ariaLabel = 'Play',
  stopAriaLabel = 'Stop',
}) {
  const [playing, setPlaying] = useState(false);
  const tokenRef = useRef(null);
  const elementRef = useRef(null);

  const stop = useCallback(() => {
    stopActive();
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (typeof window === 'undefined') return;
    stopActive();
    const token = {};
    tokenRef.current = token;
    activeOwner = token;

    // Pre-recorded audio file path. Bypasses voice selection.
    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        activeAudio = audio;
        const finish = () => {
          if (activeAudio === audio) activeAudio = null;
          if (tokenRef.current === token) setPlaying(false);
        };
        audio.addEventListener('ended', finish);
        audio.addEventListener('error', finish);
        audio.play().then(() => {
          if (tokenRef.current === token) setPlaying(true);
        }).catch(() => setPlaying(false));
        return;
      } catch (_) {
        // Fall through to TTS on any HTMLAudio failure.
      }
    }

    if (!text) return;
    try {
      const opts = {};
      if (lang) opts.lang = lang;
      if (voice) opts.voice = voice;
      const promise = speechService.speakAsync(text, opts);
      setPlaying(true);
      Promise.resolve(promise).finally(() => {
        // Only clear the local state if this instance is still the owner —
        // a later play() on a sibling component will have flipped activeOwner.
        if (tokenRef.current === token) setPlaying(false);
      });
    } catch (_) {
      setPlaying(false);
    }
  }, [text, audioUrl, lang, voice]);

  // Auto-play once on mount when requested. Skips silently if speech isn't
  // ready. When `primary` is set AND the session-level "Listen mode" is on,
  // behave as if `autoPlay` were true.
  const shouldAutoPlay = autoPlay || (primary && readListenMode());
  useEffect(() => {
    if (!shouldAutoPlay) return undefined;
    const t = setTimeout(() => play(), 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAutoPlay]);

  // Stop any in-flight speech owned by THIS instance when it unmounts.
  useEffect(() => () => {
    if (activeOwner === tokenRef.current) stopActive();
  }, []);

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
