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
  'km-KH': 'km-KH-SreymomNeural',
  'my-MM': 'my-MM-NilarNeural',
  'pa-IN': 'pa-IN-OjasNeural',
};

// Escape XML special characters to prevent SSML injection
function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
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
  const selectedVoice = voice || DEFAULT_VOICES[lang] || DEFAULT_VOICES['en-US'];

  const tts = new MsEdgeTTS();
  await tts.setMetadata(selectedVoice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);

  const options = {};
  if (rate) options.rate = rate;

  const escapedText = escapeXml(text.trim());
  const { audioStream } = tts.toStream(escapedText, options);

  // Collect stream into buffer
  const chunks = [];
  await new Promise((resolve, reject) => {
    audioStream.on('data', (chunk) => chunks.push(chunk));
    audioStream.on('end', resolve);
    audioStream.on('error', reject);
  });

  const audioBuffer = Buffer.concat(chunks);

  res.set({
    'Content-Type': 'audio/mpeg',
    'Content-Length': audioBuffer.length,
    'Cache-Control': 'public, max-age=86400',
  });
  res.send(audioBuffer);
}

// GET /api/tts?text=...&lang=...&voice=... — mobile-friendly route.
// The frontend sets audio.src to this URL directly so audio.play() is called
// synchronously within the user gesture, satisfying iOS Safari's policy.
router.get('/', async (req, res) => {
  try {
    const { text, lang, voice, rate } = req.query;
    await synthesize(text, lang, voice, rate, res);
  } catch (err) {
    console.error('TTS error:', err.message || err);
    res.status(500).json({ message: 'Text-to-speech synthesis failed' });
  }
});

// POST /api/tts — kept for any existing direct callers
router.post('/', async (req, res) => {
  try {
    const { text, lang, voice, rate } = req.body;
    await synthesize(text, lang, voice, rate, res);
  } catch (err) {
    console.error('TTS error:', err.message || err);
    res.status(500).json({ message: 'Text-to-speech synthesis failed' });
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
