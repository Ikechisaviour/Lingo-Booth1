// Text-to-Speech service using Edge TTS (server-side neural voices)
// Maintains the same public API as the previous Web Speech API implementation

import { ttsService } from './api';

// Script-to-language mapping using Unicode ranges
const SCRIPT_LANG_MAP = [
  { pattern: /[\uAC00-\uD7AF\u3130-\u318F]/, lang: 'ko-KR' },      // Korean (Hangul)
  { pattern: /[\u3040-\u309F\u30A0-\u30FF]/, lang: 'ja-JP' },        // Japanese (Hiragana/Katakana)
  { pattern: /[\u4E00-\u9FFF\u3400-\u4DBF]/, lang: 'zh-CN' },        // Chinese (CJK ideographs)
  { pattern: /[\u0600-\u06FF\u0750-\u077F]/, lang: 'ar-SA' },        // Arabic
  { pattern: /[\u0900-\u097F]/, lang: 'hi-IN' },                      // Hindi (Devanagari)
  { pattern: /[\u0E00-\u0E7F]/, lang: 'th-TH' },                     // Thai
  { pattern: /[\u0400-\u04FF]/, lang: 'ru-RU' },                      // Russian (Cyrillic)
  { pattern: /[\u0980-\u09FF]/, lang: 'bn-BD' },                      // Bengali
  { pattern: /[\u0A00-\u0A7F]/, lang: 'pa-IN' },                      // Punjabi (Gurmukhi)
  { pattern: /[\u0B80-\u0BFF]/, lang: 'ta-IN' },                      // Tamil
  { pattern: /[\u0C00-\u0C7F]/, lang: 'te-IN' },                      // Telugu
  { pattern: /[\u1000-\u109F]/, lang: 'my-MM' },                      // Burmese (Myanmar)
  { pattern: /[\u1780-\u17FF]/, lang: 'km-KH' },                      // Khmer
  { pattern: /[\u0D00-\u0D7F]/, lang: 'ml-IN' },                      // Malayalam
  { pattern: /[\u10A0-\u10FF]/, lang: 'ka-GE' },                      // Georgian
  { pattern: /[\u0590-\u05FF]/, lang: 'he-IL' },                      // Hebrew
  { pattern: /[\u00C0-\u00FF]/, lang: 'fr-FR' },                      // Latin extended (French/Spanish/German fallback)
];

/**
 * Build a blob URL for a 1-second silent WAV file with real audio samples.
 * Chrome Android won't keep a media session alive for a WAV with 0 data bytes,
 * so we generate 8000 zero-value PCM samples (8kHz, 16-bit mono, 1 second).
 */
function createSilentWavUrl() {
  const sampleRate = 8000;
  const numSamples = 8000; // 1 second
  const bitsPerSample = 16;
  const numChannels = 1;
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const headerSize = 44;
  const buffer = new ArrayBuffer(headerSize + dataSize);
  const view = new DataView(buffer);

  function writeStr(offset, str) {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  }

  writeStr(0, 'RIFF');
  view.setUint32(4, headerSize + dataSize - 8, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);          // fmt chunk size
  view.setUint16(20, 1, true);           // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeStr(36, 'data');
  view.setUint32(40, dataSize, true);
  // Audio samples are all zero (silence) — ArrayBuffer is zero-initialized.

  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

// Generate the silent WAV blob URL once at module load.
const SILENT_WAV_URL = createSilentWavUrl();

class SpeechService {
  constructor() {
    this.audio = null;
    this.isInitialized = true;
    this._pendingTimers = [];
    this._abortController = null;
    this._audioCache = new Map();
    this._maxCacheSize = 50;
    this._audioUnlocked = false;
    this._bridgeActive = false; // whether we're in "keep-alive" mode

    // Single persistent audio element — used for BOTH real TTS playback and
    // silent keep-alive loops.  Chrome Android tracks one media session per
    // element, so using a single element for everything means the session
    // stays alive when the screen is locked.
    this._persistentAudio = new Audio();
    this._persistentAudio.preload = 'auto';

    // Voice preference (Edge TTS voice name, e.g. 'ko-KR-SunHiNeural')
    const storedVoice = localStorage.getItem('preferredVoice') || null;
    if (storedVoice && !this._isValidEdgeVoice(storedVoice)) {
      // Clear legacy Google Web Speech API voice names (e.g. "Google 한국의")
      localStorage.removeItem('preferredVoice');
      this.preferredVoice = null;
    } else {
      this.preferredVoice = storedVoice;
    }

    // Chrome desktop blocks audio until user interacts with the page.
    // Listen for the first click/tap/key to unlock audio playback.
    this._setupAudioUnlock();
  }

  /**
   * Check if a voice name is a valid Edge TTS voice (e.g. 'ko-KR-SunHiNeural')
   * Edge TTS voices always end with 'Neural' and follow xx-XX-NameNeural pattern
   */
  _isValidEdgeVoice(voiceName) {
    return typeof voiceName === 'string' && /Neural$/i.test(voiceName);
  }

  /**
   * Register a one-time listener that "unlocks" audio on Chrome desktop.
   * Playing the silent WAV on the persistent element on first user gesture
   * satisfies Chrome's autoplay gate for subsequent plays.
   */
  _setupAudioUnlock() {
    const unlock = () => {
      if (this._audioUnlocked) return;
      this._audioUnlocked = true;
      const audio = this._persistentAudio;
      audio.src = SILENT_WAV_URL;
      audio.volume = 0.01;
      const p = audio.play();
      if (p) p.then(() => {
        audio.pause();
        audio.removeAttribute('src');
        audio.volume = 1;
      }).catch(() => {});
      document.removeEventListener('click', unlock, true);
      document.removeEventListener('touchstart', unlock, true);
      document.removeEventListener('keydown', unlock, true);
    };
    document.addEventListener('click', unlock, true);
    document.addEventListener('touchstart', unlock, true);
    document.addEventListener('keydown', unlock, true);
  }

  /**
   * Detect language from text content using Unicode script ranges
   */
  detectLanguage(text) {
    for (const { pattern, lang } of SCRIPT_LANG_MAP) {
      if (pattern.test(text)) return lang;
    }
    return 'en-US';
  }

  /**
   * Split text into segments at parentheses
   * "Hi (informal)" -> [{text:"Hi"}, {text:"informal", isContext:true}]
   */
  _parseSegments(text) {
    const segments = [];
    const regex = /\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const before = text.substring(lastIndex, match.index).trim();
      if (before) segments.push({ text: before, isContext: false });
      segments.push({ text: match[1].trim(), isContext: true });
      lastIndex = regex.lastIndex;
    }

    const rest = text.substring(lastIndex).trim();
    if (rest) segments.push({ text: rest, isContext: false });
    if (segments.length === 0) segments.push({ text: text, isContext: false });

    return segments;
  }

  /**
   * Build the backend TTS GET URL synchronously.
   * No network request is made here — the browser fetches the audio when
   * audio.src is set, so audio.play() stays within the user gesture call
   * stack on iOS Safari.
   */
  _buildAudioUrl(text, lang, voice) {
    const cacheKey = `${voice || lang}:${text}`;
    if (this._audioCache.has(cacheKey)) {
      return this._audioCache.get(cacheKey);
    }

    const url = ttsService.buildSpeakUrl(text, lang, voice);

    // Manage cache size (evict oldest entry)
    if (this._audioCache.size >= this._maxCacheSize) {
      const firstKey = this._audioCache.keys().next().value;
      this._audioCache.delete(firstKey);
    }
    this._audioCache.set(cacheKey, url);

    return url;
  }

  // ─── Silent bridge (keep-alive) ─────────────────────────────────
  // Uses the SAME persistent audio element to loop a 1-second silent WAV
  // during gaps between TTS clips.  Because it's the same element, Chrome
  // Android keeps the media session alive and doesn't suspend the tab.

  /**
   * Start looping silence on the persistent element to keep the media
   * session alive during gaps (think time, pauses, etc.).
   */
  startSilentBridge() {
    if (this._bridgeActive) return;
    this._bridgeActive = true;
    this._playSilence();
  }

  /**
   * Set the persistent element to loop silence.
   */
  _playSilence() {
    if (!this._bridgeActive) return;
    const audio = this._persistentAudio;
    audio.onended = null;
    audio.onerror = null;
    audio.loop = true;
    audio.volume = 0.01;
    audio.src = SILENT_WAV_URL;
    audio.play().catch(() => {});
  }

  /**
   * Stop the silent bridge entirely.
   */
  stopSilentBridge() {
    this._bridgeActive = false;
  }

  /**
   * Wait for the given duration while keeping the media session alive
   * via the silent bridge.  Use this instead of raw setTimeout in autoplay.
   */
  waitAsync(ms) {
    // Ensure the bridge is running during the wait
    if (this._bridgeActive) {
      this._playSilence();
    }
    return new Promise(resolve => {
      const t = setTimeout(resolve, ms);
      this._pendingTimers.push(t);
    });
  }

  // ─── Audio playback ─────────────────────────────────────────────

  /**
   * Stop current speech but PRESERVE the bridge state.
   * Used by speak/speakAsync/speakRepeat before starting new speech,
   * so the silent bridge stays alive between TTS clips during autoplay.
   */
  _stopCurrent() {
    this._clearPending();
    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
    }
    const audio = this._persistentAudio;
    if (audio) {
      audio.pause();
      audio.onended = null;
      audio.onerror = null;
    }
    this.audio = null;
    // NOTE: does NOT touch _bridgeActive — that's the key difference from cancel()
  }

  /**
   * Play an audio URL and return a promise that resolves when done.
   * Swaps the persistent element from silence → real audio → silence.
   */
  async _playAudio(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`TTS request failed: ${response.status}`);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
      const audio = this._persistentAudio;
      this.audio = audio;

      let settled = false;
      const settle = (fn, arg) => {
        if (settled) return;
        settled = true;
        URL.revokeObjectURL(blobUrl);
        // Switch back to silent loop if bridge is active
        if (this._bridgeActive) {
          this._playSilence();
        }
        fn(arg);
      };

      // Stop any current playback (silence or previous clip)
      audio.pause();
      audio.onended = () => settle(resolve);
      audio.onerror = () => settle(reject, new Error('Audio failed to load'));
      audio.loop = false;
      audio.volume = 1;
      audio.src = blobUrl;

      audio.play().catch((err) => {
        if (err.name === 'NotAllowedError' || err.name === 'AbortError') {
          settle(resolve);
        } else {
          settle(reject, err);
        }
      });
    });
  }

  /**
   * Speak segments sequentially with pauses before context (bracket) segments
   */
  async _speakSegments(segments, lang, voice) {
    for (let i = 0; i < segments.length; i++) {
      // Check if cancelled
      if (this._abortController?.signal.aborted) return;

      const seg = segments[i];

      // Pause before context segments
      if (seg.isContext && i > 0) {
        await new Promise(resolve => {
          const timer = setTimeout(resolve, 500);
          this._pendingTimers.push(timer);
        });
        if (this._abortController?.signal.aborted) return;
      }

      try {
        const url = this._buildAudioUrl(seg.text, lang, voice);
        if (this._abortController?.signal.aborted) return;
        await this._playAudio(url);
      } catch (err) {
        if (this._abortController?.signal.aborted) return;
        console.error('TTS segment error:', err);
      }

      // Small pause between non-context segments
      if (i < segments.length - 1 && !segments[i + 1].isContext) {
        await new Promise(resolve => {
          const timer = setTimeout(resolve, 100);
          this._pendingTimers.push(timer);
        });
      }
    }
  }

  /**
   * Speak text with automatic language detection
   * Handles bracket pauses via segment splitting
   */
  speak(text, options = {}) {
    this._stopCurrent(); // preserve bridge

    if (!text) {
      console.warn('No text provided to speak');
      return;
    }

    this._abortController = new AbortController();

    const segments = this._parseSegments(text);
    const langCode = this.detectLanguage(text);

    // Use preferred voice only for Korean (user can set it in Profile)
    // Other languages use their default Edge TTS voice
    const voice = langCode === 'ko-KR' ? this.preferredVoice : null;

    this._speakSegments(segments, langCode, voice).catch(err => {
      if (!this._abortController?.signal.aborted) {
        console.error('Speech error:', err);
      }
    });
  }

  /**
   * Speak text and return a promise that resolves when finished
   */
  speakAsync(text, options = {}) {
    this._stopCurrent(); // preserve bridge

    if (!text) return Promise.resolve();

    this._abortController = new AbortController();

    const segments = this._parseSegments(text);
    const langCode = this.detectLanguage(text);
    const voice = langCode === 'ko-KR' ? this.preferredVoice : null;

    return this._speakSegments(segments, langCode, voice).catch(err => {
      if (!this._abortController?.signal.aborted) {
        console.error('Speech error:', err);
      }
    });
  }

  /**
   * Speak text multiple times with a pause between repeats
   */
  speakRepeat(text, times = 2, options = {}) {
    this._stopCurrent(); // preserve bridge

    if (!text || times < 1) return;

    this._abortController = new AbortController();

    const segments = this._parseSegments(text);
    const langCode = this.detectLanguage(text);
    const voice = langCode === 'ko-KR' ? this.preferredVoice : null;

    const playAll = async () => {
      for (let t = 0; t < times; t++) {
        if (this._abortController?.signal.aborted) return;
        if (t > 0) {
          await new Promise(resolve => {
            const timer = setTimeout(resolve, 800);
            this._pendingTimers.push(timer);
          });
          if (this._abortController?.signal.aborted) return;
        }
        await this._speakSegments(segments, langCode, voice);
      }
    };

    playAll().catch(err => {
      if (!this._abortController?.signal.aborted) {
        console.error('Speech error:', err);
      }
    });
  }

  /**
   * Set the preferred voice by name (Edge TTS voice name)
   */
  setVoice(voiceName) {
    if (!voiceName || !this._isValidEdgeVoice(voiceName)) {
      localStorage.removeItem('preferredVoice');
      this.preferredVoice = null;
      return;
    }
    this.preferredVoice = voiceName;
    localStorage.setItem('preferredVoice', voiceName);
  }

  /**
   * Get the currently selected voice name
   */
  getSelectedVoiceName() {
    return this.preferredVoice;
  }

  // ─── Media Session API ────────────────────────────────────────────

  /**
   * Set lock-screen / notification media session metadata and controls.
   */
  setMediaSession({ title, artist, album, artwork, onPlay, onPause, onPrevTrack, onNextTrack }) {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title || 'Lingo Booth',
      artist: artist || 'Flashcards',
      album: album || 'Lingo Booth',
      artwork: artwork || [
        { src: '/images/logo.png', sizes: '512x512', type: 'image/png' },
      ],
    });
    navigator.mediaSession.setActionHandler('play', onPlay || null);
    navigator.mediaSession.setActionHandler('pause', onPause || null);
    navigator.mediaSession.setActionHandler('previoustrack', onPrevTrack || null);
    navigator.mediaSession.setActionHandler('nexttrack', onNextTrack || null);
  }

  /**
   * Clear media session metadata and action handlers.
   */
  clearMediaSession() {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = null;
    try {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
    } catch (_) { /* some browsers throw if handler was never set */ }
  }

  // ─────────────────────────────────────────────────────────────────

  /**
   * Clear all pending timers
   */
  _clearPending() {
    this._pendingTimers.forEach(t => clearTimeout(t));
    this._pendingTimers = [];
  }

  /**
   * Cancel ongoing speech and pending operations.
   * This is the FULL stop — kills the bridge too.
   * Called when the user explicitly stops autoplay.
   */
  cancel() {
    this._clearPending();
    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
    }
    this._bridgeActive = false;
    const audio = this._persistentAudio;
    if (audio) {
      audio.pause();
      audio.onended = null;
      audio.onerror = null;
      audio.loop = false;
      audio.removeAttribute('src');
      audio.load();
    }
    this.audio = null;
  }

  /**
   * Pause ongoing speech
   */
  pause() {
    if (this._persistentAudio && !this._persistentAudio.paused) {
      this._persistentAudio.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume() {
    if (this._persistentAudio && this._persistentAudio.paused && this._persistentAudio.src) {
      this._persistentAudio.play().catch(() => {});
    }
  }

  /**
   * Check if speech synthesis is supported (always true with server-side TTS)
   */
  isSupported() {
    return true;
  }

  /**
   * Get available voices for a specific language from Edge TTS
   * Returns a promise unlike the old sync method
   */
  async getVoicesForLang(langPrefix) {
    try {
      const response = await ttsService.getVoices(langPrefix);
      return response.data.map(v => ({
        name: v.ShortName,
        displayName: v.FriendlyName || v.ShortName,
        lang: v.Locale,
        gender: v.Gender,
      }));
    } catch (err) {
      console.error('Failed to fetch voices:', err);
      return [];
    }
  }

  /**
   * Get available Korean voices (convenience method)
   */
  async getKoreanVoices() {
    return this.getVoicesForLang('ko');
  }

  /**
   * Check if currently speaking
   */
  isSpeaking() {
    const a = this._persistentAudio;
    if (!a || a.paused || a.ended) return false;
    // Don't count silent bridge as "speaking"
    return !!a.src && !a.src.startsWith('blob:') === false && a.volume > 0.01;
  }
}

// Create singleton instance
const speechService = new SpeechService();

export default speechService;
