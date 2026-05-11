// Voice assignments by locale.
//
// Three concerns are balanced here:
//   1. Person A vs Person B in a dialogue must sound clearly different.
//   2. The tutor (single-voice narrator) must NOT match Person A — if both share
//      the same voice, learners hear the tutor and the first dialogue speaker
//      as the same person, which collapses the conversation illusion.
//   3. When the tutor speaks the target language followed by the native-language
//      gloss, the two languages should use *opposite-gender* voices so the
//      switch is audible even when the listener isn't looking at the screen.
//
// `tutor` is the narrator voice for that locale's target language.
// `nativePair` maps native-language locales to a contrasting-gender voice; key
// is the native locale, value is the voice to use when the tutor is reading
// the gloss in that native language alongside this target locale.
const VOICE_PROFILES = {
  'ar-SA': {
    personA: 'ar-SA-ZariyahNeural',     // F
    personB: 'ar-SA-HamedNeural',       // M
    tutor:   'ar-SA-HamedNeural',       // M (contrasts with default en-US female gloss)
  },
  'bn-BD': {
    personA: 'bn-BD-NabanitaNeural',
    personB: 'bn-BD-PradeepNeural',
    tutor:   'bn-BD-PradeepNeural',
  },
  'de-DE': {
    personA: 'de-DE-KatjaNeural',
    personB: 'de-DE-ConradNeural',
    tutor:   'de-DE-ConradNeural',
  },
  'en-US': {
    personA: 'en-US-JennyNeural',
    personB: 'en-US-GuyNeural',
    tutor:   'en-US-AriaNeural',        // distinct female so tutor != Person A
  },
  'es-ES': {
    personA: 'es-ES-ElviraNeural',
    personB: 'es-ES-AlvaroNeural',
    tutor:   'es-ES-AlvaroNeural',
  },
  'fil-PH': {
    personA: 'fil-PH-BlessicaNeural',
    personB: 'fil-PH-AngeloNeural',
    tutor:   'fil-PH-AngeloNeural',
  },
  'fr-FR': {
    personA: 'fr-FR-DeniseNeural',
    personB: 'fr-FR-HenriNeural',
    tutor:   'fr-FR-HenriNeural',
  },
  'he-IL': {
    personA: 'he-IL-HilaNeural',
    personB: 'he-IL-AvriNeural',
    tutor:   'he-IL-AvriNeural',
  },
  'hi-IN': {
    personA: 'hi-IN-SwaraNeural',
    personB: 'hi-IN-MadhurNeural',
    tutor:   'hi-IN-MadhurNeural',
  },
  'id-ID': {
    personA: 'id-ID-GadisNeural',
    personB: 'id-ID-ArdiNeural',
    tutor:   'id-ID-ArdiNeural',
  },
  'it-IT': {
    personA: 'it-IT-ElsaNeural',
    personB: 'it-IT-DiegoNeural',
    tutor:   'it-IT-DiegoNeural',
  },
  'ja-JP': {
    personA: 'ja-JP-NanamiNeural',
    personB: 'ja-JP-KeitaNeural',
    tutor:   'ja-JP-KeitaNeural',
  },
  'ko-KR': {
    personA: 'ko-KR-SunHiNeural',       // F
    personB: 'ko-KR-InJoonNeural',      // M
    tutor:   'ko-KR-InJoonNeural',      // M — distinct from Person A, contrasts with en-US gloss
  },
  'ms-MY': {
    personA: 'ms-MY-YasminNeural',
    personB: 'ms-MY-OsmanNeural',
    tutor:   'ms-MY-OsmanNeural',
  },
  'nl-NL': {
    personA: 'nl-NL-ColetteNeural',
    personB: 'nl-NL-MaartenNeural',
    tutor:   'nl-NL-MaartenNeural',
  },
  'pt-BR': {
    personA: 'pt-BR-FranciscaNeural',
    personB: 'pt-BR-AntonioNeural',
    tutor:   'pt-BR-AntonioNeural',
  },
  'ru-RU': {
    personA: 'ru-RU-SvetlanaNeural',
    personB: 'ru-RU-DmitryNeural',
    tutor:   'ru-RU-DmitryNeural',
  },
  'ta-IN': {
    personA: 'ta-IN-PallaviNeural',
    personB: 'ta-IN-ValluvarNeural',
    tutor:   'ta-IN-ValluvarNeural',
  },
  'tr-TR': {
    personA: 'tr-TR-EmelNeural',
    personB: 'tr-TR-AhmetNeural',
    tutor:   'tr-TR-AhmetNeural',
  },
  'zh-CN': {
    personA: 'zh-CN-XiaoxiaoNeural',
    personB: 'zh-CN-YunxiNeural',
    tutor:   'zh-CN-YunxiNeural',
  },
};

// Per-locale gender map for voices we ship. Used to pick a contrasting-gender
// gloss voice when the user's native language differs from the target.
const VOICE_GENDER = {
  'ar-SA-ZariyahNeural': 'F', 'ar-SA-HamedNeural': 'M',
  'bn-BD-NabanitaNeural': 'F', 'bn-BD-PradeepNeural': 'M',
  'de-DE-KatjaNeural': 'F', 'de-DE-ConradNeural': 'M',
  'en-US-JennyNeural': 'F', 'en-US-AriaNeural': 'F', 'en-US-GuyNeural': 'M', 'en-US-AndrewNeural': 'M',
  'es-ES-ElviraNeural': 'F', 'es-ES-AlvaroNeural': 'M',
  'fil-PH-BlessicaNeural': 'F', 'fil-PH-AngeloNeural': 'M',
  'fr-FR-DeniseNeural': 'F', 'fr-FR-HenriNeural': 'M',
  'he-IL-HilaNeural': 'F', 'he-IL-AvriNeural': 'M',
  'hi-IN-SwaraNeural': 'F', 'hi-IN-MadhurNeural': 'M',
  'id-ID-GadisNeural': 'F', 'id-ID-ArdiNeural': 'M',
  'it-IT-ElsaNeural': 'F', 'it-IT-DiegoNeural': 'M',
  'ja-JP-NanamiNeural': 'F', 'ja-JP-KeitaNeural': 'M',
  'ko-KR-SunHiNeural': 'F', 'ko-KR-InJoonNeural': 'M',
  'ms-MY-YasminNeural': 'F', 'ms-MY-OsmanNeural': 'M',
  'nl-NL-ColetteNeural': 'F', 'nl-NL-MaartenNeural': 'M',
  'pt-BR-FranciscaNeural': 'F', 'pt-BR-AntonioNeural': 'M',
  'ru-RU-SvetlanaNeural': 'F', 'ru-RU-DmitryNeural': 'M',
  'ta-IN-PallaviNeural': 'F', 'ta-IN-ValluvarNeural': 'M',
  'tr-TR-EmelNeural': 'F', 'tr-TR-AhmetNeural': 'M',
  'zh-CN-XiaoxiaoNeural': 'F', 'zh-CN-YunxiNeural': 'M',
};

export function roleVoiceForLocale(locale, speaker) {
  const normalizedLocale = String(locale || '').trim();
  const normalizedSpeaker = String(speaker || '').trim();
  const profile = VOICE_PROFILES[normalizedLocale];
  if (!profile) return '';
  if (normalizedSpeaker === 'Person A') return profile.personA;
  if (normalizedSpeaker === 'Person B') return profile.personB;
  return '';
}

export function tutorVoiceForLocale(locale) {
  return VOICE_PROFILES[String(locale || '').trim()]?.tutor || '';
}

export function voiceGender(voiceName) {
  return VOICE_GENDER[String(voiceName || '').trim()] || '';
}

// Given the locale being spoken and the tutor's voice for the *other* language
// in the pair, return a contrasting-gender voice for the current locale.
// Used when speaking the native gloss right after target text so the two reads
// don't blur into a single voice.
export function contrastingVoiceForLocale(locale, contrastWithVoice) {
  const profile = VOICE_PROFILES[String(locale || '').trim()];
  if (!profile) return '';
  const otherGender = voiceGender(contrastWithVoice);
  if (!otherGender) return profile.tutor || profile.personA || '';
  if (voiceGender(profile.tutor) && voiceGender(profile.tutor) !== otherGender) return profile.tutor;
  if (voiceGender(profile.personA) !== otherGender) return profile.personA;
  if (voiceGender(profile.personB) !== otherGender) return profile.personB;
  return profile.tutor || '';
}
