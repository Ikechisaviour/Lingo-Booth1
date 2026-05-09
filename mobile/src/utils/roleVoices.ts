const ROLE_VOICES: Record<string, Record<string, string>> = {
  'ar-SA': { 'Person A': 'ar-SA-ZariyahNeural', 'Person B': 'ar-SA-HamedNeural' },
  'bn-BD': { 'Person A': 'bn-BD-NabanitaNeural', 'Person B': 'bn-BD-PradeepNeural' },
  'de-DE': { 'Person A': 'de-DE-KatjaNeural', 'Person B': 'de-DE-ConradNeural' },
  'en-US': { 'Person A': 'en-US-JennyNeural', 'Person B': 'en-US-GuyNeural' },
  'es-ES': { 'Person A': 'es-ES-ElviraNeural', 'Person B': 'es-ES-AlvaroNeural' },
  'fil-PH': { 'Person A': 'fil-PH-BlessicaNeural', 'Person B': 'fil-PH-AngeloNeural' },
  'fr-FR': { 'Person A': 'fr-FR-DeniseNeural', 'Person B': 'fr-FR-HenriNeural' },
  'he-IL': { 'Person A': 'he-IL-HilaNeural', 'Person B': 'he-IL-AvriNeural' },
  'hi-IN': { 'Person A': 'hi-IN-SwaraNeural', 'Person B': 'hi-IN-MadhurNeural' },
  'id-ID': { 'Person A': 'id-ID-GadisNeural', 'Person B': 'id-ID-ArdiNeural' },
  'it-IT': { 'Person A': 'it-IT-ElsaNeural', 'Person B': 'it-IT-DiegoNeural' },
  'ja-JP': { 'Person A': 'ja-JP-NanamiNeural', 'Person B': 'ja-JP-KeitaNeural' },
  'ko-KR': { 'Person A': 'ko-KR-SunHiNeural', 'Person B': 'ko-KR-InJoonNeural' },
  'ms-MY': { 'Person A': 'ms-MY-YasminNeural', 'Person B': 'ms-MY-OsmanNeural' },
  'nl-NL': { 'Person A': 'nl-NL-ColetteNeural', 'Person B': 'nl-NL-MaartenNeural' },
  'pt-BR': { 'Person A': 'pt-BR-FranciscaNeural', 'Person B': 'pt-BR-AntonioNeural' },
  'ru-RU': { 'Person A': 'ru-RU-SvetlanaNeural', 'Person B': 'ru-RU-DmitryNeural' },
  'ta-IN': { 'Person A': 'ta-IN-PallaviNeural', 'Person B': 'ta-IN-ValluvarNeural' },
  'tr-TR': { 'Person A': 'tr-TR-EmelNeural', 'Person B': 'tr-TR-AhmetNeural' },
  'zh-CN': { 'Person A': 'zh-CN-XiaoxiaoNeural', 'Person B': 'zh-CN-YunxiNeural' },
};

export function roleVoiceForLocale(locale?: string, speaker?: string): string | undefined {
  const normalizedLocale = String(locale || '').trim();
  const normalizedSpeaker = String(speaker || '').trim();
  return ROLE_VOICES[normalizedLocale]?.[normalizedSpeaker] || undefined;
}
