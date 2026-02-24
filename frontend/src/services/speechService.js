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

    // Voice preference (Edge TTS voice name, e.g. 'ko-KR-SunHiNeural')
    this.preferredVoice = localStorage.getItem('preferredVoice') || null;
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
   * Uses fetch + blob for reliable cross-browser playback (fixes Chrome
   * desktop autoplay issues). Falls back to direct URL on fetch failure.
   */
  async _playAudio(url) {
    // Fetch audio as blob — gives proper HTTP error handling and avoids
    // cross-origin media loading quirks on desktop Chrome
    let audioSrc = url;
    let blobUrl = null;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const blob = await response.blob();
        blobUrl = URL.createObjectURL(blob);
        audioSrc = blobUrl;
      }
    } catch {
      // Network error — fall back to direct URL (works for iOS Safari gesture context)
    }

    return new Promise((resolve, reject) => {
      this.audio = new Audio(audioSrc);
      const cleanup = () => { if (blobUrl) URL.revokeObjectURL(blobUrl); };
      this.audio.onended = () => { cleanup(); resolve(); };
      this.audio.onerror = (e) => {
        cleanup();
        console.error('Audio playback error:', e);
        reject(e);
      };
      this.audio.play().catch((err) => { cleanup(); reject(err); });
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
    if (!voiceName) {
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
