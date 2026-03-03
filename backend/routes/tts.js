const express = require('express');
const router = express.Router();

// Dynamic import for ESM msedge-tts package
let msEdgeTTS = null;
async function loadTTS() {
  if (!msEdgeTTS) {
    msEdgeTTS = await import('msedge-tts');
  }
  return msEdgeTTS;
}

// Default voice for each supported language
const DEFAULT_VOICES = {
  'ko-KR': 'ko-KR-SunHiNeural',
  'en-US': 'en-US-JennyNeural',
  'ja-JP': 'ja-JP-NanamiNeural',
  'zh-CN': 'zh-CN-XiaoxiaoNeural',
  'ar-SA': 'ar-SA-ZariyahNeural',
  'hi-IN': 'hi-IN-SwaraNeural',
  'th-TH': 'th-TH-PremwadeeNeural',
  'ru-RU': 'ru-RU-SvetlanaNeural',
  'bn-BD': 'bn-BD-NabanitaNeural',
  'ta-IN': 'ta-IN-PallaviNeural',
  'te-IN': 'te-IN-ShrutiNeural',
  'ml-IN': 'ml-IN-SobhanaNeural',
  'ka-GE': 'ka-GE-EkaNeural',
  'he-IL': 'he-IL-HilaNeural',
  'fr-FR': 'fr-FR-DeniseNeural',
  'de-DE': 'de-DE-KatjaNeural',
  'es-ES': 'es-ES-ElviraNeural',
  'pt-BR': 'pt-BR-FranciscaNeural',
  'it-IT': 'it-IT-ElsaNeural',
  'vi-VN': 'vi-VN-HoaiMyNeural',
  'id-ID': 'id-ID-GadisNeural',
  'ms-MY': 'ms-MY-YasminNeural',
  'nl-NL': 'nl-NL-ColetteNeural',
  'tr-TR': 'tr-TR-EmelNeural',
  'fil-PH': 'fil-PH-BlessicaNeural',
  'km-KH': 'km-KH-SreymomNeural',
  'my-MM': 'my-MM-NilarNeural',
  'pa-IN': 'pa-IN-OjasNeural',
};

// Fallback voice used when the primary voice fails (e.g. transient service error)
const FALLBACK_VOICES = {
  'ar-SA': 'ar-SA-HamedNeural',
  'he-IL': 'he-IL-AvriNeural',
  'bn-BD': 'bn-BD-PradeepNeural',
  'fil-PH': 'fil-PH-AngeloNeural',
  'ko-KR': 'ko-KR-InJoonNeural',
  'en-US': 'en-US-GuyNeural',
  'ja-JP': 'ja-JP-KeitaNeural',
  'zh-CN': 'zh-CN-YunxiNeural',
  'hi-IN': 'hi-IN-MadhurNeural',
  'ru-RU': 'ru-RU-DmitryNeural',
  'fr-FR': 'fr-FR-HenriNeural',
  'de-DE': 'de-DE-ConradNeural',
  'es-ES': 'es-ES-AlvaroNeural',
  'pt-BR': 'pt-BR-AntonioNeural',
  'it-IT': 'it-IT-DiegoNeural',
  'id-ID': 'id-ID-ArdiNeural',
  'ms-MY': 'ms-MY-OsmanNeural',
  'nl-NL': 'nl-NL-MaartenNeural',
  'tr-TR': 'tr-TR-AhmetNeural',
  'ta-IN': 'ta-IN-ValluvarNeural',
};

// How long (ms) to wait for the TTS audio stream before giving up
const STREAM_TIMEOUT_MS = 30_000;

// Escape XML special characters to prevent SSML injection
function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Attempt TTS synthesis with a specific voice.
 * Returns the audio Buffer on success, throws on failure.
 */
async function attemptSynth(MsEdgeTTS, OUTPUT_FORMAT, voiceName, voiceLocale, escapedText, rate) {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, voiceLocale);

  const options = {};
  if (rate) options.rate = rate;

  const { audioStream } = tts.toStream(escapedText, options);

  const chunks = [];
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error(`Audio stream timeout after ${STREAM_TIMEOUT_MS / 1000}s`)),
      STREAM_TIMEOUT_MS
    );
    audioStream.on('data', (chunk) => chunks.push(chunk));
    audioStream.on('end', () => { clearTimeout(timeout); resolve(); });
    audioStream.on('error', (err) => { clearTimeout(timeout); reject(err); });
  });

  const buf = Buffer.concat(chunks);
  if (buf.length === 0) throw new Error('Empty audio response from TTS service');
  return buf;
}

// Shared synthesis logic used by both GET and POST routes
async function synthesize(text, lang, voice, rate, res) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ message: 'Text is required' });
  }

  if (text.length > 2000) {
    return res.status(400).json({ message: 'Text too long (max 2000 characters)' });
  }

  const { MsEdgeTTS, OUTPUT_FORMAT } = await loadTTS();

  // Determine voice: explicit voice > default for lang > English fallback
  const primaryVoice = voice || DEFAULT_VOICES[lang] || DEFAULT_VOICES['en-US'];
  // Extract locale from voice name (e.g. 'ko-KR-SunHiNeural' → 'ko-KR')
  const voiceLocale = lang || primaryVoice.split('-').slice(0, 2).join('-');
  const escapedText = escapeXml(text.trim());

  // Build list of voices to try: primary first, then fallback if different
  const fallbackVoice = FALLBACK_VOICES[lang];
  const voicesToTry = [primaryVoice];
  if (fallbackVoice && fallbackVoice !== primaryVoice) voicesToTry.push(fallbackVoice);

  for (const voiceName of voicesToTry) {
    try {
      const audioBuffer = await attemptSynth(MsEdgeTTS, OUTPUT_FORMAT, voiceName, voiceLocale, escapedText, rate);
      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length,
        'Cache-Control': 'public, max-age=86400',
      });
      return res.send(audioBuffer);
    } catch (err) {
      console.error(`TTS failed [lang=${lang || 'auto'} voice=${voiceName} textLen=${text.length}]: ${err.message}`);
    }
  }

  res.status(500).json({ message: 'Text-to-speech synthesis failed' });
}

// GET /api/tts?text=...&lang=...&voice=... — mobile-friendly route.
// The frontend sets audio.src to this URL directly so audio.play() is called
// synchronously within the user gesture, satisfying iOS Safari's policy.
router.get('/', async (req, res) => {
  try {
    const { text, lang, voice, rate } = req.query;
    await synthesize(text, lang, voice, rate, res);
  } catch (err) {
    console.error(`TTS route error [GET lang=${req.query.lang}]:`, err.message || err);
    if (!res.headersSent) res.status(500).json({ message: 'Text-to-speech synthesis failed' });
  }
});

// POST /api/tts — kept for any existing direct callers
router.post('/', async (req, res) => {
  try {
    const { text, lang, voice, rate } = req.body;
    await synthesize(text, lang, voice, rate, res);
  } catch (err) {
    console.error(`TTS route error [POST lang=${req.body?.lang}]:`, err.message || err);
    if (!res.headersSent) res.status(500).json({ message: 'Text-to-speech synthesis failed' });
  }
});

// GET /api/tts/voices — list available Edge TTS voices
router.get('/voices', async (req, res) => {
  try {
    const { MsEdgeTTS } = await loadTTS();
    const tts = new MsEdgeTTS();
    const voices = await tts.getVoices();

    // Optional filter by language prefix
    const { lang } = req.query;
    if (lang) {
      const filtered = voices.filter(v => v.Locale.startsWith(lang));
      return res.json(filtered);
    }

    res.json(voices);
  } catch (err) {
    console.error('Voice list error:', err.message || err);
    res.status(500).json({ message: 'Failed to fetch voice list' });
  }
});

module.exports = router;
