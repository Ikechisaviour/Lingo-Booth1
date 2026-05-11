import { roleVoiceForLocale, tutorVoiceForLocale } from './roleVoices';

export const CONVERSATION_STOP_COMMANDS = [
  'stop', 'pause', 'end', 'finish', 'stop listening', 'pause listening', 'hands free off', 'turn off hands free',
  '멈춰', '멈춰줘', '정지', '중지', '그만', '그만해',
  'para', 'parar', 'detente', 'deténte', 'terminar',
  'arrête', 'arrete', 'stop',
  'stopp', 'halte',
  '停止', '停', '结束',
  'ストップ', '止めて', '終了',
  'रुको', 'रुकें', 'बंद करो',
  'توقف', 'إيقاف', 'انهاء', 'إنهاء',
  'עצור', 'הפסק',
  'pare',
  'ferma',
  'stoppen',
  'стоп', 'остановись', 'хватит',
  'berhenti',
  'tamat',
  'hinto', 'tigil',
  'dur', 'durdur', 'bitir',
  'থামুন', 'থামো', 'বন্ধ',
  'நிறுத்து', 'நிறுத்துங்கள்',
];

export const CONVERSATION_REPEAT_COMMANDS = [
  'repeat', 'say that again', 'again', 'one more time',
  '다시', '다시 말해줘', '한번 더',
  'otra vez', 'repite', 'repítelo', 'repitelo',
  'répète', 'repete', 'encore une fois',
  'wiederholen', 'noch einmal',
  '再说一遍', '重复',
  'もう一度', '繰り返して',
  'दोहराएं', 'फिर से',
  'أعد', 'كرر',
  'חזור', 'שוב',
  'repetir', 'de novo',
  'ripeti', 'ancora',
  'herhaal', 'nog een keer',
  'повтори', 'еще раз', 'ещё раз',
  'ulangi', 'sekali lagi',
  'ulang',
  'ulitin', 'muli',
  'tekrar', 'yeniden',
  'আবার বলুন', 'পুনরাবৃত্তি',
  'மீண்டும் சொல்லுங்கள்', 'மீண்டும்',
];

export const CONVERSATION_SLOWER_COMMANDS = [
  'slower', 'say it slower', 'speak slower', 'repeat slower',
  '천천히', '천천히 말해줘',
  'más despacio', 'mas despacio', 'habla más despacio', 'habla mas despacio',
  'plus lentement', 'parle plus lentement',
  'langsamer', 'sprich langsamer',
  '慢一点', '说慢一点',
  'ゆっくり', 'もっとゆっくり',
  'धीरे', 'धीरे बोलें',
  'ببطء', 'تكلم ببطء',
  'לאט', 'דבר לאט',
  'mais devagar', 'fale mais devagar',
  'più lentamente', 'piu lentamente', 'parla più lentamente', 'parla piu lentamente',
  'langzamer', 'spreek langzamer',
  'медленнее', 'говори медленнее',
  'lebih pelan', 'bicara lebih pelan',
  'lebih perlahan', 'cakap perlahan',
  'dahan-dahan', 'mas mabagal',
  'daha yavaş', 'daha yavas', 'yavaş konuş', 'yavas konus',
  'ধীরে', 'আরও ধীরে বলুন',
  'மெதுவாக', 'மெதுவாக பேசுங்கள்',
];

type HandsFreeCopy = {
  unavailable: string;
  starting: string;
  startedStatus: string;
  startedSpoken: string;
  stoppedStatus: string;
  stoppedSpoken: string;
  listening: string;
  stillListening: string;
  captured: string;
  commandFailed: string;
  audioInterrupted: string;
  permission: string;
  noSpeech: string;
  audioCapture: string;
  network: string;
  aborted: string;
  captureFailed: string;
};

const HANDS_FREE_COPY: Record<string, HandsFreeCopy> = {
  en: {
    unavailable: 'Voice input is unavailable on this device. You can type below instead.',
    starting: 'Starting hands-free mode...',
    startedStatus: 'Hands-free mode started.',
    startedSpoken: 'Hands-free mode started. I will listen after each reply. Say stop to end.',
    stoppedStatus: 'Hands-free mode stopped.',
    stoppedSpoken: 'Hands-free mode stopped.',
    listening: 'Hands-free is listening...',
    stillListening: 'Still listening...',
    captured: 'Speech captured. Edit if needed, then press send.',
    commandFailed: 'Could not process voice command.',
    audioInterrupted: 'Audio playback was interrupted.',
    permission: 'Microphone or speech recognition permission is blocked. Open Settings, allow the mic for this app, then try again.',
    noSpeech: 'No speech was heard. Tap the mic and speak after the listening indicator.',
    audioCapture: 'No microphone detected. Plug in headphones with a mic or enable the device microphone.',
    network: 'Network error during speech recognition. Check your connection and try again.',
    aborted: 'Speech input was cancelled.',
    captureFailed: 'Could not capture speech. Please try again.',
  },
  ko: {
    unavailable: '이 기기에서는 음성 입력을 사용할 수 없어요. 아래에 입력해 주세요.',
    starting: '핸즈프리 모드를 시작하고 있어요...',
    startedStatus: '핸즈프리 모드가 시작됐어요.',
    startedSpoken: '핸즈프리 모드가 시작됐어요. 답변 후 다시 들을게요. 끝내려면 그만이라고 말하세요.',
    stoppedStatus: '핸즈프리 모드가 종료됐어요.',
    stoppedSpoken: '핸즈프리 모드가 종료됐어요.',
    listening: '핸즈프리로 듣고 있어요...',
    stillListening: '계속 듣고 있어요...',
    captured: '음성을 들었어요. 필요하면 수정한 뒤 보내세요.',
    commandFailed: '음성 명령을 처리하지 못했어요.',
    audioInterrupted: '음성 재생이 중단됐어요.',
    permission: '마이크 또는 음성 인식 권한이 차단되어 있어요. 설정에서 마이크를 허용한 뒤 다시 시도하세요.',
    noSpeech: '음성이 들리지 않았어요. 듣기 표시가 나온 뒤 말해 주세요.',
    audioCapture: '마이크를 찾을 수 없어요. 기기 마이크를 켜거나 마이크가 있는 이어폰을 연결해 주세요.',
    network: '음성 인식 중 네트워크 문제가 발생했어요. 연결을 확인하고 다시 시도하세요.',
    aborted: '음성 입력이 취소됐어요.',
    captureFailed: '음성을 인식하지 못했어요. 다시 시도해 주세요.',
  },
  es: {
    unavailable: 'La entrada de voz no está disponible en este dispositivo. Puedes escribir abajo.',
    starting: 'Iniciando el modo manos libres...',
    startedStatus: 'Modo manos libres iniciado.',
    startedSpoken: 'Modo manos libres iniciado. Escucharé después de cada respuesta. Di parar para terminar.',
    stoppedStatus: 'Modo manos libres detenido.',
    stoppedSpoken: 'Modo manos libres detenido.',
    listening: 'Manos libres está escuchando...',
    stillListening: 'Sigo escuchando...',
    captured: 'Voz capturada. Edita si hace falta y luego envía.',
    commandFailed: 'No pude procesar el comando de voz.',
    audioInterrupted: 'La reproducción de audio se interrumpió.',
    permission: 'El permiso del micrófono o del reconocimiento de voz está bloqueado. Permítelo en Ajustes e inténtalo de nuevo.',
    noSpeech: 'No se escuchó voz. Toca el micrófono y habla después del indicador de escucha.',
    audioCapture: 'No se detectó ningún micrófono. Activa el micrófono del dispositivo o conecta uno.',
    network: 'Error de red durante el reconocimiento de voz. Revisa tu conexión e inténtalo de nuevo.',
    aborted: 'La entrada de voz se canceló.',
    captureFailed: 'No pude capturar la voz. Inténtalo de nuevo.',
  },
  fr: {
    unavailable: 'La saisie vocale n’est pas disponible sur cet appareil. Vous pouvez écrire ci-dessous.',
    starting: 'Démarrage du mode mains libres...',
    startedStatus: 'Mode mains libres démarré.',
    startedSpoken: 'Mode mains libres démarré. Je réécouterai après chaque réponse. Dites arrête pour terminer.',
    stoppedStatus: 'Mode mains libres arrêté.',
    stoppedSpoken: 'Mode mains libres arrêté.',
    listening: 'Le mode mains libres écoute...',
    stillListening: 'J’écoute encore...',
    captured: 'Voix capturée. Modifiez si besoin, puis envoyez.',
    commandFailed: 'Impossible de traiter la commande vocale.',
    audioInterrupted: 'La lecture audio a été interrompue.',
    permission: 'L’autorisation du micro ou de la reconnaissance vocale est bloquée. Autorisez-la dans les réglages, puis réessayez.',
    noSpeech: 'Aucune voix détectée. Appuyez sur le micro et parlez après l’indicateur d’écoute.',
    audioCapture: 'Aucun microphone détecté. Activez le micro de l’appareil ou branchez-en un.',
    network: 'Erreur réseau pendant la reconnaissance vocale. Vérifiez la connexion et réessayez.',
    aborted: 'La saisie vocale a été annulée.',
    captureFailed: 'Impossible de capturer la voix. Réessayez.',
  },
  de: {
    unavailable: 'Spracheingabe ist auf diesem Gerät nicht verfügbar. Du kannst unten schreiben.',
    starting: 'Freisprechmodus wird gestartet...',
    startedStatus: 'Freisprechmodus gestartet.',
    startedSpoken: 'Freisprechmodus gestartet. Ich höre nach jeder Antwort wieder zu. Sag stopp, um zu beenden.',
    stoppedStatus: 'Freisprechmodus beendet.',
    stoppedSpoken: 'Freisprechmodus beendet.',
    listening: 'Freisprechmodus hört zu...',
    stillListening: 'Ich höre weiter zu...',
    captured: 'Sprache erfasst. Bei Bedarf bearbeiten und dann senden.',
    commandFailed: 'Der Sprachbefehl konnte nicht verarbeitet werden.',
    audioInterrupted: 'Die Audiowiedergabe wurde unterbrochen.',
    permission: 'Die Mikrofon- oder Spracherkennungsberechtigung ist blockiert. Erlaube sie in den Einstellungen und versuche es erneut.',
    noSpeech: 'Keine Sprache erkannt. Tippe auf das Mikrofon und sprich nach der Höranzeige.',
    audioCapture: 'Kein Mikrofon erkannt. Aktiviere das Gerätemikrofon oder schließe ein Mikrofon an.',
    network: 'Netzwerkfehler bei der Spracherkennung. Verbindung prüfen und erneut versuchen.',
    aborted: 'Spracheingabe wurde abgebrochen.',
    captureFailed: 'Sprache konnte nicht erfasst werden. Bitte erneut versuchen.',
  },
};

const FALLBACK_COPY_BY_LANGUAGE: Record<string, Partial<HandsFreeCopy>> = {
  zh: {
    startedSpoken: '免提模式已开始。每次回复后我会继续听。说停止即可结束。',
    stoppedSpoken: '免提模式已停止。',
  },
  ja: {
    startedSpoken: 'ハンズフリーモードを開始しました。返答のあとにまた聞きます。終了するにはストップと言ってください。',
    stoppedSpoken: 'ハンズフリーモードを終了しました。',
  },
  hi: {
    startedSpoken: 'हैंड्स-फ्री मोड शुरू हो गया है। हर जवाब के बाद मैं फिर सुनूंगा। बंद करने के लिए रुकें कहें।',
    stoppedSpoken: 'हैंड्स-फ्री मोड बंद हो गया है।',
  },
  ar: {
    startedSpoken: 'تم تشغيل وضع التحدث دون استخدام اليدين. سأستمع بعد كل رد. قل توقف للإنهاء.',
    stoppedSpoken: 'تم إيقاف وضع التحدث دون استخدام اليدين.',
  },
  he: {
    startedSpoken: 'מצב דיבור ללא ידיים התחיל. אקשיב שוב אחרי כל תשובה. אמור עצור כדי לסיים.',
    stoppedSpoken: 'מצב דיבור ללא ידיים הופסק.',
  },
  pt: {
    startedSpoken: 'Modo mãos livres iniciado. Vou ouvir depois de cada resposta. Diga parar para terminar.',
    stoppedSpoken: 'Modo mãos livres parado.',
  },
  it: {
    startedSpoken: 'Modalità a mani libere avviata. Ascolterò dopo ogni risposta. Di stop per terminare.',
    stoppedSpoken: 'Modalità a mani libere fermata.',
  },
  nl: {
    startedSpoken: 'Handsfree-modus gestart. Ik luister na elk antwoord. Zeg stop om te stoppen.',
    stoppedSpoken: 'Handsfree-modus gestopt.',
  },
  id: {
    startedSpoken: 'Mode bebas tangan dimulai. Saya akan mendengarkan setelah setiap balasan. Ucapkan berhenti untuk mengakhiri.',
    stoppedSpoken: 'Mode bebas tangan dihentikan.',
  },
  ms: {
    startedSpoken: 'Mod bebas tangan bermula. Saya akan mendengar selepas setiap balasan. Sebut berhenti untuk tamat.',
    stoppedSpoken: 'Mod bebas tangan dihentikan.',
  },
  fil: {
    startedSpoken: 'Nagsimula ang hands-free mode. Makikinig ako pagkatapos ng bawat sagot. Sabihin ang hinto para tapusin.',
    stoppedSpoken: 'Natigil ang hands-free mode.',
  },
  tr: {
    startedSpoken: 'Eller serbest modu başladı. Her yanıttan sonra dinleyeceğim. Bitirmek için dur deyin.',
    stoppedSpoken: 'Eller serbest modu durdu.',
  },
  ru: {
    startedSpoken: 'Режим громкой связи включен. Я буду слушать после каждого ответа. Скажите стоп, чтобы закончить.',
    stoppedSpoken: 'Режим громкой связи остановлен.',
  },
  bn: {
    startedSpoken: 'হ্যান্ডস-ফ্রি মোড শুরু হয়েছে। প্রতিটি উত্তরের পরে আমি আবার শুনব। শেষ করতে থামুন বলুন।',
    stoppedSpoken: 'হ্যান্ডস-ফ্রি মোড বন্ধ হয়েছে।',
  },
  ta: {
    startedSpoken: 'ஹேண்ட்ஸ்-ஃப்ரீ முறை தொடங்கியது. ஒவ்வொரு பதிலுக்குப் பிறகும் நான் மீண்டும் கேட்பேன். முடிக்க நிறுத்து என்று சொல்லுங்கள்.',
    stoppedSpoken: 'ஹேண்ட்ஸ்-ஃப்ரீ முறை நிறுத்தப்பட்டது.',
  },
};

export function handsFreeCopy(languageCode?: string): HandsFreeCopy {
  const code = String(languageCode || '').trim().toLowerCase().split('-')[0];
  if (HANDS_FREE_COPY[code]) return HANDS_FREE_COPY[code];
  if (FALLBACK_COPY_BY_LANGUAGE[code]) {
    const partial = FALLBACK_COPY_BY_LANGUAGE[code];
    return {
      ...HANDS_FREE_COPY.en,
      ...partial,
      startedStatus: partial.startedSpoken || HANDS_FREE_COPY.en.startedStatus,
      stoppedStatus: partial.stoppedSpoken || HANDS_FREE_COPY.en.stoppedStatus,
    };
  }
  return HANDS_FREE_COPY.en;
}

export function conversationVoiceForLocale(locale?: string, speaker = ''): string | undefined {
  return roleVoiceForLocale(locale, speaker)
    || roleVoiceForLocale(locale, 'Person B')
    || tutorVoiceForLocale(locale);
}
