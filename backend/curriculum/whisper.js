/**
 * Server-side Korean speech-to-text via Whisper.
 *
 * The frontend currently uses webkitSpeechRecognition for pronunciation
 * tasks — Chrome-only, unreliable, and impossible to QA across browsers.
 * This module replaces it with a single backend endpoint the frontend can
 * POST audio to.
 *
 * Three provider modes, selected by env:
 *   - openai          OpenAI Whisper API. Set OPENAI_API_KEY. Cheapest path
 *                     to "it works in production today".
 *   - selfhost        POST the audio to a self-hosted whisper.cpp / Whisper
 *                     Python server. Set WHISPER_SELFHOST_URL (and optionally
 *                     WHISPER_SELFHOST_TOKEN for auth). Use this for cost
 *                     control or data residency.
 *   - none            No backend ASR configured. The endpoint returns a
 *                     503 with a setup-required code so the frontend can
 *                     fall back to browser ASR or hide the speak button.
 *
 * Pick a mode by setting CURRICULUM_V2_ASR_PROVIDER. Default: none.
 */

const PROVIDER = String(process.env.CURRICULUM_V2_ASR_PROVIDER || 'none').toLowerCase();
const PROVIDER_TIMEOUT_MS = 30_000;

// Collapse locale-tagged codes ('zh-CN', 'pt-BR') to the ISO-639-1 form
// Whisper actually expects ('zh', 'pt'). Future curriculum files can carry
// extended codes without breaking the API.
function normalizeLanguageCode(code) {
  if (!code) return 'ko';
  const lower = String(code).toLowerCase().trim();
  const base = lower.split(/[-_]/)[0];
  return base || 'ko';
}

function isAsrAvailable() {
  if (PROVIDER === 'openai') return Boolean(process.env.OPENAI_API_KEY);
  if (PROVIDER === 'selfhost') return Boolean(process.env.WHISPER_SELFHOST_URL);
  return false;
}

function getAsrConfig() {
  return {
    provider: PROVIDER,
    available: isAsrAvailable(),
    missing: isAsrAvailable()
      ? []
      : PROVIDER === 'openai' ? ['OPENAI_API_KEY']
      : PROVIDER === 'selfhost' ? ['WHISPER_SELFHOST_URL']
      : ['CURRICULUM_V2_ASR_PROVIDER (set to "openai" or "selfhost")'],
  };
}

/**
 * Transcribe a piece of audio. Returns { transcript, durationMs, provider }
 * on success. Throws on failure — callers map to HTTP 502.
 *
 * @param {Object} args
 * @param {Buffer} args.audioBuffer    Audio bytes (webm, wav, mp3 — Whisper accepts).
 * @param {string} args.mimeType       e.g. 'audio/webm;codecs=opus'.
 * @param {string} [args.language]     Whisper language code; defaults to 'ko'.
 * @param {string} [args.targetPhrase] Expected utterance, used as Whisper's
 *                                     `prompt` field to bias recognition.
 *                                     Meaningfully improves accuracy on
 *                                     short pronunciation samples.
 */
async function transcribe({ audioBuffer, mimeType = 'audio/webm', language = 'ko', targetPhrase = '' }) {
  if (!isAsrAvailable()) {
    const err = new Error('ASR not configured');
    err.code = 'ASR_NOT_CONFIGURED';
    throw err;
  }
  if (!audioBuffer || !audioBuffer.length) {
    const err = new Error('No audio provided');
    err.code = 'NO_AUDIO';
    throw err;
  }
  const normalizedLanguage = normalizeLanguageCode(language);
  const trimmedPrompt = String(targetPhrase || '').slice(0, 480);

  if (PROVIDER === 'openai') {
    return transcribeOpenAi({ audioBuffer, mimeType, language: normalizedLanguage, prompt: trimmedPrompt });
  }
  if (PROVIDER === 'selfhost') {
    return transcribeSelfhost({ audioBuffer, mimeType, language: normalizedLanguage, prompt: trimmedPrompt });
  }
  // Unreachable given isAsrAvailable check above.
  throw new Error('Unsupported ASR provider');
}

async function transcribeOpenAi({ audioBuffer, mimeType, language, prompt }) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_WHISPER_MODEL || 'whisper-1';
  const form = new FormData();
  // The Blob constructor lets us hand FormData a typed blob without writing
  // to disk. The filename matters for some providers — Whisper uses the
  // extension to choose a decoder.
  const extension = mimeType.includes('webm') ? 'webm'
    : mimeType.includes('wav')  ? 'wav'
    : mimeType.includes('mp3')  ? 'mp3'
    : 'webm';
  form.append('file', new Blob([audioBuffer], { type: mimeType }), `audio.${extension}`);
  form.append('model', model);
  form.append('language', language);
  form.append('response_format', 'json');
  if (prompt) form.append('prompt', prompt);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);
  const t0 = Date.now();
  try {
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
      signal: controller.signal,
    });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`OpenAI Whisper ${response.status}: ${detail.slice(0, 200)}`);
    }
    const data = await response.json();
    return {
      transcript: String(data?.text || '').trim(),
      durationMs: Date.now() - t0,
      provider: 'openai',
    };
  } finally {
    clearTimeout(timer);
  }
}

async function transcribeSelfhost({ audioBuffer, mimeType, language, prompt }) {
  const url = process.env.WHISPER_SELFHOST_URL.replace(/\/$/, '');
  const token = process.env.WHISPER_SELFHOST_TOKEN || '';
  const form = new FormData();
  form.append('file', new Blob([audioBuffer], { type: mimeType }), 'audio.webm');
  form.append('language', language);
  if (prompt) form.append('prompt', prompt);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);
  const t0 = Date.now();
  try {
    const response = await fetch(`${url}/transcribe`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
      signal: controller.signal,
    });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Selfhost Whisper ${response.status}: ${detail.slice(0, 200)}`);
    }
    const data = await response.json();
    return {
      transcript: String(data?.text || data?.transcript || '').trim(),
      durationMs: Date.now() - t0,
      provider: 'selfhost',
    };
  } finally {
    clearTimeout(timer);
  }
}

module.exports = {
  transcribe,
  isAsrAvailable,
  getAsrConfig,
  normalizeLanguageCode,
};
