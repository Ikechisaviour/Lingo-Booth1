// Text-to-Speech service using Web Speech API for Korean pronunciation

class SpeechService {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.koreanVoice = null;
    this.isInitialized = false;

    // Initialize voices
    this.initializeVoices();

    // Some browsers load voices asynchronously
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.initializeVoices();
      };
    }
  }

  initializeVoices() {
    this.voices = this.synth.getVoices();

    // Find Korean voice (ko-KR)
    this.koreanVoice = this.voices.find(voice =>
      voice.lang === 'ko-KR' || voice.lang.startsWith('ko')
    );

    // If no Korean voice found, use default
    if (!this.koreanVoice && this.voices.length > 0) {
      console.warn('No Korean voice found. Using default voice.');
      this.koreanVoice = this.voices[0];
    }

    this.isInitialized = true;
  }

  /**
   * Speak Korean text
   * @param {string} text - The Korean text to speak
   * @param {object} options - Speech options (rate, pitch, volume)
   */
  speak(text, options = {}) {
    // Cancel any ongoing speech
    this.cancel();

    if (!text) {
      console.warn('No text provided to speak');
      return;
    }

    // Ensure voices are loaded
    if (!this.isInitialized || this.voices.length === 0) {
      this.initializeVoices();
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Set Korean language
    utterance.lang = 'ko-KR';

    // Use Korean voice if available
    if (this.koreanVoice) {
      utterance.voice = this.koreanVoice;
    }

    // Apply custom options
    utterance.rate = options.rate || 0.9; // Slightly slower for learning
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1.0;

    // Error handling
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
    };

    // Speak the text
    this.synth.speak(utterance);
  }

  /**
   * Cancel ongoing speech
   */
  cancel() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }

  /**
   * Pause ongoing speech
   */
  pause() {
    if (this.synth.speaking) {
      this.synth.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume() {
    if (this.synth.paused) {
      this.synth.resume();
    }
  }

  /**
   * Check if speech synthesis is supported
   */
  isSupported() {
    return 'speechSynthesis' in window;
  }

  /**
   * Get available Korean voices
   */
  getKoreanVoices() {
    if (!this.isInitialized || this.voices.length === 0) {
      this.initializeVoices();
    }
    return this.voices.filter(voice =>
      voice.lang === 'ko-KR' || voice.lang.startsWith('ko')
    );
  }

  /**
   * Check if currently speaking
   */
  isSpeaking() {
    return this.synth.speaking;
  }
}

// Create singleton instance
const speechService = new SpeechService();

export default speechService;
