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

class SpeechService {
  constructor() {
    this.audio = null;
    this.isInitialized = true;
    this._pendingTimers = [];
    this._abortController = null;
    this._audioCache = new Map();
    this._maxCacheSize = 50;
    this._audioUnlocked = false;

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
   * Playing a tiny silent WAV from a data-URI on the first user gesture
   * satisfies Chrome's autoplay gate for subsequent Audio element plays.
   */
  _setupAudioUnlock() {
    const unlock = () => {
      if (this._audioUnlocked) return;
      this._audioUnlocked = true;
      // 44-byte silent WAV
      const silentWav = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
      const a = new Audio(silentWav);
      a.volume = 0.01;
      const p = a.play();
      if (p) p.then(() => a.pause()).catch(() => {});
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

  /**
   * Play an audio URL and return a promise that resolves when done.
   * Fetches audio as a blob first so the Audio element loads from a
   * same-origin blob URL — Chrome desktop blocks cross-origin Audio loads.
   */
  async _playAudio(url) {
    // Fetch audio data (cross-origin handled by CORS headers)
    const response = await fetch(url);
    if (!response.ok) throw new Error(`TTS request failed: ${response.status}`);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
      const audio = new Audio(blobUrl);
      this.audio = audio;

      let settled = false;
      const settle = (fn, arg) => {
        if (settled) return;
        settled = true;
        URL.revokeObjectURL(blobUrl);
        fn(arg);
      };

      audio.onended = () => settle(resolve);
      audio.onerror = () => settle(reject, new Error('Audio failed to load'));

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
    this.cancel();

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
    this.cancel();

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
    this.cancel();

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

  /**
   * Clear all pending timers
   */
  _clearPending() {
    this._pendingTimers.forEach(t => clearTimeout(t));
    this._pendingTimers = [];
  }

  /**
   * Cancel ongoing speech and pending operations
   */
  cancel() {
    this._clearPending();
    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
    }
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
  }

  /**
   * Pause ongoing speech
   */
  pause() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume() {
    if (this.audio && this.audio.paused) {
      this.audio.play().catch(() => {});
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
    return this.audio ? !this.audio.paused && !this.audio.ended : false;
  }
}

// Create singleton instance
const speechService = new SpeechService();

export default speechService;
