/**
 * Shared audio plumbing for Curriculum v2 lesson pages.
 *
 * Every v2 lesson page (ContrastNote, PatternLesson, Cloze, Story, etc.)
 * needs the same things: resolve a gender-matched target/native voice pair,
 * split mixed-script strings into per-language chunks, strip romanization
 * parentheticals before TTS, and run a cancellable sequence of utterances.
 *
 * This module owns all of that. Pages just import the helpers and the
 * `useLessonAudio` hook.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPause, FiVolume2 } from 'react-icons/fi';
import { ttsService } from '../services/api';
import speechService from '../services/speechService';
import { voiceGender } from './roleVoices';

// Gender-matched defaults — used when the user hasn't picked anything for
// the language or when the picked voice isn't usable.
const VOICE_DEFAULTS = {
  female: { ko: 'ko-KR-SunHiNeural',  en: 'en-US-JennyNeural' },
  male:   { ko: 'ko-KR-InJoonNeural', en: 'en-US-GuyNeural' },
};

// Module-level cache of the Edge TTS catalog (one fetch per session).
let voiceCatalogPromise = null;
function loadVoiceCatalog() {
  if (voiceCatalogPromise) return voiceCatalogPromise;
  voiceCatalogPromise = ttsService.getVoices()
    .then((res) => {
      const map = {};
      for (const v of (res.data || [])) {
        if (!v?.ShortName) continue;
        const g = v.Gender === 'Male' ? 'M' : v.Gender === 'Female' ? 'F' : '';
        if (g) map[v.ShortName] = g;
      }
      return map;
    })
    .catch(() => ({}));
  return voiceCatalogPromise;
}

function pickSameGenderVoice(catalog, langPrefix, gender) {
  for (const [name, g] of Object.entries(catalog)) {
    if (g === gender && name.startsWith(`${langPrefix}-`)) return name;
  }
  return gender === 'M' ? VOICE_DEFAULTS.male.en : VOICE_DEFAULTS.female.en;
}

/**
 * Resolve a gender-matched (target, native) voice pair.
 *
 * The user's preferred target voice wins. The native voice is then chosen
 * to match the target's gender — so one voice "feel" carries across both
 * languages on a lesson page rather than sounding like a duet.
 *
 * @param {string} targetLang Two-letter target language code (e.g. 'ko').
 * @returns {Promise<{ targetVoice, nativeVoice, targetGender }>}
 */
export async function resolveLessonVoicesAsync(targetLang = 'ko') {
  const catalog = await loadVoiceCatalog();
  const genderOf = (name) => voiceGender(name) || catalog[name] || '';

  const defaultTarget = VOICE_DEFAULTS.female[targetLang] || VOICE_DEFAULTS.female.ko;
  const userTarget = speechService.getSelectedVoiceName(targetLang) || defaultTarget;
  const targetGender = genderOf(userTarget) === 'M' ? 'M' : 'F';

  const userNative = speechService.getSelectedVoiceName('en');
  let nativeVoice;
  if (userNative && genderOf(userNative) === targetGender) {
    nativeVoice = userNative;
  } else {
    const wanted = targetGender === 'M' ? VOICE_DEFAULTS.male.en : VOICE_DEFAULTS.female.en;
    nativeVoice = catalog[wanted] === targetGender
      ? wanted
      : pickSameGenderVoice(catalog, 'en-US', targetGender);
  }
  return { targetVoice: userTarget, nativeVoice, targetGender };
}

/**
 * Strip "(romanization)"-style parentheticals from a string before sending
 * to TTS. Only ASCII-only parens (e.g. "(appa)", "(due to inability)")
 * count as romanization/aside; parens containing target-language script
 * (e.g. "(으)", "(있어요)") are LESSON CONTENT — the morpheme the page is
 * teaching — and must stay so the target-language voice reads them.
 *
 * Use this when a page genuinely has romanization noise (Hangul flashcards
 * "아빠 (appa) — father"). On contrast / pattern pages where parens carry
 * the morpheme being taught, use `prepForSpeech` instead.
 */
export function stripParentheticals(text) {
  return String(text || '')
    // Drop a paren ONLY if its content is pure ASCII (Latin letters,
    // digits, spaces, basic punctuation). Anything with non-ASCII (i.e.
    // target-language script) is kept verbatim.
    .replace(/\s*\(([^)]*)\)/g, (full, inner) => (/[-￿]/.test(inner) ? full : ''))
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Pre-process lesson text for TTS without destroying lesson content.
 *
 * Substitutes the V / N / A pattern-template placeholders ("V-(으)ㄹ 수
 * 있어요" means "any verb stem, with this ending"). Left unsubstituted,
 * Edge TTS reads them as letter names ("vee", "en", "ay"), which is
 * useless to a learner. Word-bounded so "Voice", "Note", "Adjective"
 * stay intact.
 *
 * Parentheticals are left in place — the script splitter will route
 * Korean-inside-parens to the Korean voice and English-inside-parens to
 * the English voice, which is what a tutor would do.
 */
export function prepForSpeech(text) {
  return String(text || '')
    .replace(/\bV\b/g, 'verb')
    .replace(/\bN\b/g, 'noun')
    .replace(/\bA\b/g, 'adjective')
    .trim();
}

/**
 * Split a possibly mixed-script string into ordered chunks tagged by
 * language. Each chunk can be sent to TTS with an explicit voice so the
 * English bits stay in the English voice and Korean stays in Korean.
 *
 * Currently Korean-aware; extend the script regex when adding new target
 * languages.
 */
export function splitByScript(text, targetLang = 'ko') {
  if (!text) return [];
  // Cover every Hangul block so lone jamo letters like ㄹ in "V-(으)ㄹ 수"
  // route to the Korean voice. Without all four ranges, jamo-only
  // chunks slip into the English chunk and the Korean voice never says
  // "rieul". Ranges:
  //   U+1100–U+11FF  Hangul Jamo
  //   U+3130–U+318F  Hangul Compatibility Jamo  (ㄱ ㄴ ㄷ ㅏ ㅓ ...)
  //   U+A960–U+A97F  Hangul Jamo Extended-A
  //   U+AC00–U+D7AF  Hangul Syllables           (가 나 다 ...)
  const SCRIPT_PATTERNS = {
    ko: /[ᄀ-ᇿ㄰-㆏ꥠ-꥿가-힯]+/g,
  };
  const targetCode = SCRIPT_LOCALE[targetLang] || 'ko-KR';
  const pattern = SCRIPT_PATTERNS[targetLang];
  if (!pattern) return [{ text: String(text).trim(), lang: 'en-US' }];

  const trim = (s) => s
    .replace(/^[\s\-—•·.,;:!?()'"]+|[\s\-—•·.,;:!?()'"]+$/g, '')
    .trim();

  const out = [];
  let lastIdx = 0;
  let m;
  // eslint-disable-next-line no-cond-assign
  while ((m = pattern.exec(text)) !== null) {
    const before = trim(text.slice(lastIdx, m.index));
    if (before) out.push({ text: before, lang: 'en-US' });
    out.push({ text: m[0], lang: targetCode });
    lastIdx = m.index + m[0].length;
  }
  const tail = trim(text.slice(lastIdx));
  if (tail) out.push({ text: tail, lang: 'en-US' });
  return out.length ? out : [{ text: String(text).trim(), lang: 'en-US' }];
}

const SCRIPT_LOCALE = {
  ko: 'ko-KR',
  ja: 'ja-JP',
  zh: 'zh-CN',
};

/**
 * Lesson-audio hook: returns { voices, playingScope, play, stop }.
 *
 * `play(scope, items)` walks an array of strings, splits each by script,
 * and speaks each chunk with an explicit voice. Cancellable mid-stream by
 * starting another `play()` or calling `stop()`. Only ONE sequence ever
 * runs at a time across the page.
 *
 * Usage:
 *   const audio = useLessonAudio('ko');
 *   audio.play('page', [title, description, ...examples]);
 */
export function useLessonAudio(targetLang = 'ko') {
  const [voices, setVoices] = useState(() => ({
    targetVoice: speechService.getSelectedVoiceName(targetLang) || VOICE_DEFAULTS.female[targetLang] || VOICE_DEFAULTS.female.ko,
    nativeVoice: VOICE_DEFAULTS.female.en,
    targetGender: 'F',
  }));
  const [playingScope, setPlayingScope] = useState(null);
  const sequenceRef = useRef({ cancelled: true });

  // Resolve gender-matched voices asynchronously after mount.
  useEffect(() => {
    let cancelled = false;
    resolveLessonVoicesAsync(targetLang).then((v) => { if (!cancelled) setVoices(v); });
    return () => { cancelled = true; };
  }, [targetLang]);

  const stop = useCallback(() => {
    sequenceRef.current.cancelled = true;
    speechService.cancel();
    setPlayingScope(null);
  }, []);

  const play = useCallback(async (scope, texts) => {
    const items = (Array.isArray(texts) ? texts : [texts])
      .map((t) => String(t || '').trim())
      .filter(Boolean);
    if (!items.length) return;
    sequenceRef.current.cancelled = true;
    speechService.cancel();
    const token = { cancelled: false };
    sequenceRef.current = token;
    setPlayingScope(scope);
    try {
      for (const text of items) {
        if (token.cancelled) break;
        const chunks = splitByScript(text, targetLang);
        for (const chunk of chunks) {
          if (token.cancelled) break;
          const voice = chunk.lang.startsWith('en') ? voices.nativeVoice : voices.targetVoice;
          await speechService.speakAsync(chunk.text, { lang: chunk.lang, voice });
          if (token.cancelled) break;
          await new Promise((resolve) => setTimeout(resolve, 80));
        }
        if (token.cancelled) break;
        await new Promise((resolve) => setTimeout(resolve, 220));
      }
    } finally {
      if (sequenceRef.current === token) setPlayingScope(null);
    }
  }, [voices, targetLang]);

  // Stop any in-flight playback when the page unmounts.
  useEffect(() => () => stop(), [stop]);

  return { voices, playingScope, play, stop };
}

/**
 * Shared play button used across every v2 lesson page.
 *
 * Pass the whole hook return as `audio`, a unique `scope` string, and the
 * `items` array of strings to read. The button derives its playing state
 * from `audio.playingScope === scope` and routes click → play/stop.
 *
 * variant='primary' renders an icon+label pill (used at page top).
 * variant='icon' renders a compact circular icon (used per row/section).
 */
export function LessonAudioButton({
  audio,
  scope,
  items,
  variant = 'icon',
  label,
  ariaLabel,
}) {
  const { t } = useTranslation();
  const playLabel = label || t('curriculumV2.audio.play', 'Play');
  const stopLabel = t('curriculumV2.audio.stop', 'Stop');
  const stopAria = t('curriculumV2.audio.stopPlayback', 'Stop playback');
  const playing = audio.playingScope === scope;
  const Icon = playing ? FiPause : FiVolume2;
  const handle = () => {
    if (playing) audio.stop();
    else audio.play(scope, items);
  };
  return (
    <button
      type="button"
      onClick={handle}
      className={`v2-play-btn ${variant === 'primary' ? 'v2-play-btn--primary' : ''} ${playing ? 'is-playing' : ''}`}
      aria-label={ariaLabel || (playing ? stopAria : playLabel)}
      title={playing ? stopAria : playLabel}
    >
      <Icon />
      {variant === 'primary' && <span>{playing ? stopLabel : playLabel}</span>}
    </button>
  );
}
