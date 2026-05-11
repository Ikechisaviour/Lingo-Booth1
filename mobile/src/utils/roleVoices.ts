// Voice assignments by locale. Mirrors the web implementation so class lessons
// sound the same on both platforms.
//
// Three concerns:
//   1. Person A vs Person B in a dialogue must sound clearly different.
//   2. The tutor (single-voice narrator) must NOT match Person A — same-voice
//      collapses the conversation illusion when the tutor introduces an example.
//   3. The tutor's target-language reads and native-language gloss should use
//      opposite-gender voices so the switch is audible without looking.
interface VoiceProfile {
  personA: string;
  personB: string;
  tutor: string;
}

const VOICE_PROFILES: Record<string, VoiceProfile> = {
  'ar-SA': { personA: 'ar-SA-ZariyahNeural', personB: 'ar-SA-HamedNeural', tutor: 'ar-SA-HamedNeural' },
  'bn-BD': { personA: 'bn-BD-NabanitaNeural', personB: 'bn-BD-PradeepNeural', tutor: 'bn-BD-PradeepNeural' },
  'de-DE': { personA: 'de-DE-KatjaNeural', personB: 'de-DE-ConradNeural', tutor: 'de-DE-ConradNeural' },
  'en-US': { personA: 'en-US-JennyNeural', personB: 'en-US-GuyNeural', tutor: 'en-US-AriaNeural' },
  'es-ES': { personA: 'es-ES-ElviraNeural', personB: 'es-ES-AlvaroNeural', tutor: 'es-ES-AlvaroNeural' },
  'fil-PH': { personA: 'fil-PH-BlessicaNeural', personB: 'fil-PH-AngeloNeural', tutor: 'fil-PH-AngeloNeural' },
  'fr-FR': { personA: 'fr-FR-DeniseNeural', personB: 'fr-FR-HenriNeural', tutor: 'fr-FR-HenriNeural' },
  'he-IL': { personA: 'he-IL-HilaNeural', personB: 'he-IL-AvriNeural', tutor: 'he-IL-AvriNeural' },
  'hi-IN': { personA: 'hi-IN-SwaraNeural', personB: 'hi-IN-MadhurNeural', tutor: 'hi-IN-MadhurNeural' },
  'id-ID': { personA: 'id-ID-GadisNeural', personB: 'id-ID-ArdiNeural', tutor: 'id-ID-ArdiNeural' },
  'it-IT': { personA: 'it-IT-ElsaNeural', personB: 'it-IT-DiegoNeural', tutor: 'it-IT-DiegoNeural' },
  'ja-JP': { personA: 'ja-JP-NanamiNeural', personB: 'ja-JP-KeitaNeural', tutor: 'ja-JP-KeitaNeural' },
  'ko-KR': { personA: 'ko-KR-SunHiNeural', personB: 'ko-KR-InJoonNeural', tutor: 'ko-KR-InJoonNeural' },
  'ms-MY': { personA: 'ms-MY-YasminNeural', personB: 'ms-MY-OsmanNeural', tutor: 'ms-MY-OsmanNeural' },
  'nl-NL': { personA: 'nl-NL-ColetteNeural', personB: 'nl-NL-MaartenNeural', tutor: 'nl-NL-MaartenNeural' },
  'pt-BR': { personA: 'pt-BR-FranciscaNeural', personB: 'pt-BR-AntonioNeural', tutor: 'pt-BR-AntonioNeural' },
  'ru-RU': { personA: 'ru-RU-SvetlanaNeural', personB: 'ru-RU-DmitryNeural', tutor: 'ru-RU-DmitryNeural' },
  'ta-IN': { personA: 'ta-IN-PallaviNeural', personB: 'ta-IN-ValluvarNeural', tutor: 'ta-IN-ValluvarNeural' },
  'tr-TR': { personA: 'tr-TR-EmelNeural', personB: 'tr-TR-AhmetNeural', tutor: 'tr-TR-AhmetNeural' },
  'zh-CN': { personA: 'zh-CN-XiaoxiaoNeural', personB: 'zh-CN-YunxiNeural', tutor: 'zh-CN-YunxiNeural' },
};

const VOICE_GENDER: Record<string, 'F' | 'M'> = {
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

export function roleVoiceForLocale(locale?: string, speaker?: string): string | undefined {
  const normalizedLocale = String(locale || '').trim();
  const normalizedSpeaker = String(speaker || '').trim();
  const profile = VOICE_PROFILES[normalizedLocale];
  if (!profile) return undefined;
  if (normalizedSpeaker === 'Person A') return profile.personA;
  if (normalizedSpeaker === 'Person B') return profile.personB;
  return undefined;
}

export function tutorVoiceForLocale(locale?: string): string | undefined {
  return VOICE_PROFILES[String(locale || '').trim()]?.tutor;
}

export function voiceGender(voiceName?: string): 'F' | 'M' | '' {
  return VOICE_GENDER[String(voiceName || '').trim()] || '';
}

// Given a locale being spoken and the voice used for the *other* language in
// the pair, return a contrasting-gender voice for the current locale.
export function contrastingVoiceForLocale(locale?: string, contrastWithVoice?: string): string | undefined {
  const profile = VOICE_PROFILES[String(locale || '').trim()];
  if (!profile) return undefined;
  const otherGender = voiceGender(contrastWithVoice);
  if (!otherGender) return profile.tutor || profile.personA;
  const tutorGender = voiceGender(profile.tutor);
  if (tutorGender && tutorGender !== otherGender) return profile.tutor;
  if (voiceGender(profile.personA) !== otherGender) return profile.personA;
  if (voiceGender(profile.personB) !== otherGender) return profile.personB;
  return profile.tutor;
}
