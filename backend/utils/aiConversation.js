const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

const SCRIPT_LANGUAGE_PATTERNS = [
  { language: 'ko', pattern: /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/g },
  { language: 'ja', pattern: /[\u3040-\u30ff]/g },
  { language: 'zh', pattern: /[\u3400-\u9fff]/g },
  { language: 'ar', pattern: /[\u0600-\u06ff]/g },
  { language: 'he', pattern: /[\u0590-\u05ff]/g },
  { language: 'hi', pattern: /[\u0900-\u097f]/g },
  { language: 'bn', pattern: /[\u0980-\u09ff]/g },
  { language: 'ta', pattern: /[\u0b80-\u0bff]/g },
  { language: 'ru', pattern: /[\u0400-\u04ff]/g },
];

const LATIN_LANGUAGE_CODES = new Set(['en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'id', 'ms', 'fil', 'tr']);

const LANGUAGE_NAMES = {
  en: 'English',
  ko: 'Korean',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  zh: 'Chinese',
  ja: 'Japanese',
  hi: 'Hindi',
  ar: 'Arabic',
  he: 'Hebrew',
  pt: 'Portuguese',
  it: 'Italian',
  nl: 'Dutch',
  ru: 'Russian',
  id: 'Indonesian',
  ms: 'Malay',
  fil: 'Filipino',
  tr: 'Turkish',
  bn: 'Bengali',
  ta: 'Tamil',
};

const LANGUAGE_NAMES_BY_UI = {
  fil: {
    en: 'Ingles',
    ko: 'Koreano',
    es: 'Espanyol',
    fr: 'Pranses',
    de: 'Aleman',
    zh: 'Tsino',
    ja: 'Hapon',
    hi: 'Hindi',
    ar: 'Arabe',
    he: 'Hebreo',
    pt: 'Portuges',
    it: 'Italyano',
    nl: 'Olandes',
    ru: 'Ruso',
    id: 'Indonesyo',
    ms: 'Malay',
    fil: 'Filipino',
    tr: 'Turko',
    bn: 'Bengali',
    ta: 'Tamil',
  },
};

const LANGUAGE_PAIR_REDIRECT_COPY = {
  en: {
    reply: ({ nativeName, targetName, outsideName }) => `Let's keep this practice in ${nativeName} or ${targetName}. I noticed ${outsideName}, which is outside this language pair. Please continue in ${nativeName} or ${targetName}.`,
    tip: ({ outsideName }) => `To practice ${outsideName}, change your language pair first.`,
    intent: ({ nativeName, targetName }) => `Continue in ${nativeName} or ${targetName}.`,
  },
  fil: {
    reply: ({ nativeName, targetName, outsideName }) => `Panatilihin natin ang practice sa ${nativeName} o ${targetName}. Napansin ko ang ${outsideName}, na wala sa language pair na ito. Pakituloy sa ${nativeName} o ${targetName}.`,
    tip: ({ outsideName }) => `Para mag-practice ng ${outsideName}, palitan muna ang language pair.`,
    intent: ({ nativeName, targetName }) => `Magpatuloy sa ${nativeName} o ${targetName}.`,
  },
  es: {
    reply: ({ nativeName, targetName, outsideName }) => `Mantengamos esta practica en ${nativeName} o ${targetName}. Note ${outsideName}, que esta fuera de este par de idiomas. Continua en ${nativeName} o ${targetName}.`,
    tip: ({ outsideName }) => `Para practicar ${outsideName}, cambia primero tu par de idiomas.`,
    intent: ({ nativeName, targetName }) => `Continua en ${nativeName} o ${targetName}.`,
  },
  fr: {
    reply: ({ nativeName, targetName, outsideName }) => `Gardons cette pratique en ${nativeName} ou ${targetName}. J'ai remarque du ${outsideName}, qui n'est pas dans cette paire de langues. Continue en ${nativeName} ou ${targetName}.`,
    tip: ({ outsideName }) => `Pour pratiquer le ${outsideName}, change d'abord ta paire de langues.`,
    intent: ({ nativeName, targetName }) => `Continue en ${nativeName} ou ${targetName}.`,
  },
  de: {
    reply: ({ nativeName, targetName, outsideName }) => `Lass uns diese Uebung auf ${nativeName} oder ${targetName} halten. Ich habe ${outsideName} bemerkt, das nicht zu diesem Sprachpaar gehoert. Bitte fahre auf ${nativeName} oder ${targetName} fort.`,
    tip: ({ outsideName }) => `Um ${outsideName} zu ueben, aendere zuerst dein Sprachpaar.`,
    intent: ({ nativeName, targetName }) => `Weiter auf ${nativeName} oder ${targetName}.`,
  },
  id: {
    reply: ({ nativeName, targetName, outsideName }) => `Mari tetap berlatih dalam ${nativeName} atau ${targetName}. Saya melihat ${outsideName}, yang bukan bagian dari pasangan bahasa ini. Lanjutkan dalam ${nativeName} atau ${targetName}.`,
    tip: ({ outsideName }) => `Untuk berlatih ${outsideName}, ubah pasangan bahasa terlebih dahulu.`,
    intent: ({ nativeName, targetName }) => `Lanjutkan dalam ${nativeName} atau ${targetName}.`,
  },
  ms: {
    reply: ({ nativeName, targetName, outsideName }) => `Mari kekalkan latihan ini dalam ${nativeName} atau ${targetName}. Saya perasan ${outsideName}, yang bukan sebahagian daripada pasangan bahasa ini. Sila teruskan dalam ${nativeName} atau ${targetName}.`,
    tip: ({ outsideName }) => `Untuk berlatih ${outsideName}, tukar pasangan bahasa dahulu.`,
    intent: ({ nativeName, targetName }) => `Teruskan dalam ${nativeName} atau ${targetName}.`,
  },
  tr: {
    reply: ({ nativeName, targetName, outsideName }) => `Bu alistirmayi ${nativeName} veya ${targetName} dilinde tutalim. ${outsideName} fark ettim; bu secilen dil ciftinin disinda. Lutfen ${nativeName} veya ${targetName} ile devam et.`,
    tip: ({ outsideName }) => `${outsideName} calismak icin once dil ciftini degistir.`,
    intent: ({ nativeName, targetName }) => `${nativeName} veya ${targetName} ile devam et.`,
  },
};

const SCENARIO_ROLE_CONFIGS = {
  cafe: {
    defaultLearnerRoleKey: 'customer',
    defaultPartnerRoleKey: 'cafeStaff',
    roles: {
      customer: 'customer',
      cafeStaff: 'cafe staff',
    },
    learnerRoleRequests: [
      {
        roleKey: 'cafeStaff',
        patterns: [
          /\b(i want|i would like|i'd like|let me|can i|may i|i will|i'll)\b.{0,50}\b(be|play|act as|take the role of)\b.{0,50}\b(barista|cafe staff|staff|server|waiter|cashier)\b/,
          /\b(make me|switch me|change me)\b.{0,50}\b(barista|cafe staff|staff|server|waiter|cashier)\b/,
          /\b(barista|cafe staff|staff|server|waiter|cashier)\b.{0,30}\b(role)\b/,
        ],
      },
      {
        roleKey: 'customer',
        patterns: [
          /\b(i want|i would like|i'd like|let me|can i|may i|i will|i'll)\b.{0,50}\b(be|play|act as|take the role of)\b.{0,50}\b(customer|buyer|guest)\b/,
          /\b(make me|switch me|change me)\b.{0,50}\b(customer|buyer|guest)\b/,
        ],
      },
    ],
  },
  directions: {
    defaultLearnerRoleKey: 'traveler',
    defaultPartnerRoleKey: 'localGuide',
    roles: {
      traveler: 'traveler',
      localGuide: 'local guide',
    },
  },
  introductions: {
    defaultLearnerRoleKey: 'learnerSelf',
    defaultPartnerRoleKey: 'newAcquaintance',
    roles: {
      learnerSelf: 'conversation starter',
      newAcquaintance: 'new acquaintance',
    },
  },
  hotel: {
    defaultLearnerRoleKey: 'guest',
    defaultPartnerRoleKey: 'frontDesk',
    roles: {
      guest: 'hotel guest',
      frontDesk: 'hotel front desk staff',
    },
  },
};

const LATIN_LANGUAGE_MARKERS = {
  en: {
    strong: ['hello', 'hi', 'thanks', 'thank', 'please', 'goodbye', 'yes', 'no'],
    words: ['i', 'me', 'my', 'you', 'your', 'what', 'where', 'when', 'how', 'why', 'want', 'need', 'order', 'coffee', 'today', 'remind', 'did', 'do', 'can', 'could', 'would', 'the', 'a', 'an', 'is', 'are'],
    phrases: ['how are you', 'thank you', 'good morning', 'good evening'],
  },
  es: {
    strong: ['hola', 'gracias', 'adios', 'buenos', 'buenas'],
    words: ['como', 'estas', 'estoy', 'hoy', 'quiero', 'quisiera', 'necesito', 'por', 'favor', 'que', 'donde', 'cuando', 'cuanto', 'cuanta', 'si', 'no', 'usted', 'tu', 'para', 'con', 'sin', 'tienes', 'quieres', 'tamano'],
    phrases: ['como estas', 'buenos dias', 'buenas tardes', 'buenas noches', 'por favor'],
  },
  fr: {
    strong: ['bonjour', 'merci', 'salut', 'bonsoir', 'oui', 'non'],
    words: ['je', 'veux', 'voudrais', 'besoin', 'comment', 'allez', 'vas', 'aujourd', 'hui', 'quoi', 'ou', 'quand', 'combien', 'avec', 'sans', 'vous', 'tu', 'pour'],
    phrases: ['comment ca va', 's il vous plait', 'je voudrais'],
  },
  de: {
    strong: ['hallo', 'danke', 'tschuss', 'guten'],
    words: ['ich', 'mochte', 'will', 'brauche', 'wie', 'geht', 'dir', 'ihnen', 'was', 'wo', 'wann', 'warum', 'bitte', 'ja', 'nein', 'mit', 'ohne', 'heute'],
    phrases: ['guten tag', 'guten morgen', 'wie geht es', 'ich mochte'],
  },
  pt: {
    strong: ['ola', 'obrigado', 'obrigada', 'tchau', 'sim', 'nao'],
    words: ['quero', 'gostaria', 'preciso', 'como', 'esta', 'hoje', 'por', 'favor', 'onde', 'quando', 'quanto', 'com', 'sem', 'voce'],
    phrases: ['como vai', 'por favor', 'bom dia', 'boa noite'],
  },
  it: {
    strong: ['ciao', 'grazie', 'buongiorno', 'buonasera', 'si', 'no'],
    words: ['voglio', 'vorrei', 'bisogno', 'come', 'stai', 'oggi', 'cosa', 'dove', 'quando', 'quanto', 'con', 'senza', 'per', 'favore'],
    phrases: ['come stai', 'per favore', 'buon giorno'],
  },
  nl: {
    strong: ['hallo', 'bedankt', 'dank', 'ja', 'nee'],
    words: ['ik', 'wil', 'graag', 'nodig', 'hoe', 'gaat', 'waar', 'wanneer', 'waarom', 'met', 'zonder', 'vandaag', 'alstublieft'],
    phrases: ['hoe gaat het', 'goedemorgen', 'goedenavond'],
  },
  id: {
    strong: ['halo', 'terima', 'makasih', 'selamat'],
    words: ['saya', 'mau', 'ingin', 'perlu', 'apa', 'di', 'mana', 'kapan', 'berapa', 'dengan', 'tanpa', 'hari', 'ini', 'tolong'],
    phrases: ['terima kasih', 'selamat pagi', 'apa kabar'],
  },
  ms: {
    strong: ['halo', 'terima', 'selamat'],
    words: ['saya', 'mahu', 'ingin', 'perlu', 'apa', 'mana', 'bila', 'berapa', 'dengan', 'tanpa', 'hari', 'ini', 'tolong'],
    phrases: ['terima kasih', 'selamat pagi', 'apa khabar'],
  },
  fil: {
    strong: ['kamusta', 'salamat', 'mabuhay', 'oo', 'hindi'],
    words: ['ako', 'gusto', 'kailangan', 'ano', 'saan', 'kailan', 'magkano', 'ngayon', 'paki', 'para', 'mayroon'],
    phrases: ['kumusta ka', 'maraming salamat'],
  },
  tr: {
    strong: ['merhaba', 'tesekkurler', 'tesekkur', 'evet', 'hayir'],
    words: ['ben', 'istiyorum', 'isterim', 'ihtiyacim', 'nasil', 'bugun', 'ne', 'nerede', 'ne zaman', 'kac', 'ile', 'siz', 'sen', 'lutfen'],
    phrases: ['nasilsin', 'tesekkur ederim', 'gunaydin', 'iyi aksamlar'],
  },
};

function normalizeLanguageCode(language) {
  const value = String(language || '').trim().toLowerCase();
  if (!value || value === 'auto') return '';
  return value.split('-')[0];
}

function detectScriptLanguage(text) {
  const value = String(text || '');
  let winner = { language: '', count: 0 };

  for (const entry of SCRIPT_LANGUAGE_PATTERNS) {
    const count = (value.match(entry.pattern) || []).length;
    if (count > winner.count) {
      winner = { language: entry.language, count };
    }
  }

  return winner.count > 0 ? winner.language : '';
}

function normalizeLatinText(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function detectLatinLanguage(text) {
  const normalized = normalizeLatinText(text);
  if (!normalized) return '';

  const tokens = normalized.match(/[a-z']+/g) || [];
  if (tokens.length === 0) return '';
  const tokenSet = new Set(tokens);
  const paddedText = ` ${normalized} `;
  const scores = [];

  for (const [language, markers] of Object.entries(LATIN_LANGUAGE_MARKERS)) {
    let score = 0;
    let strongHit = false;

    for (const word of markers.strong || []) {
      if (tokenSet.has(word)) {
        score += 2;
        strongHit = true;
      }
    }

    for (const word of markers.words || []) {
      if (tokenSet.has(word)) score += 1;
    }

    for (const phrase of markers.phrases || []) {
      if (paddedText.includes(` ${phrase} `)) {
        score += 3;
        strongHit = true;
      }
    }

    if (score > 0) scores.push({ language, score, strongHit });
  }

  if (scores.length === 0) return '';
  scores.sort((a, b) => b.score - a.score);
  const [best, second = { score: 0 }] = scores;

  if (best.score >= 3 && best.score >= second.score + 1) return best.language;
  if (best.strongHit && best.score >= 2 && best.score >= second.score + 1) return best.language;
  return '';
}

function detectDominantLanguage(text, targetLanguage = 'ko', nativeLanguage = 'en', selectedInputLanguage = '') {
  const value = String(text || '');
  const target = normalizeLanguageCode(targetLanguage) || 'ko';
  const native = normalizeLanguageCode(nativeLanguage) || 'en';
  const selected = normalizeLanguageCode(selectedInputLanguage);
  const scriptLanguage = detectScriptLanguage(value);

  if (scriptLanguage) return scriptLanguage;

  const latinCount = (value.match(/[A-Za-z]/g) || []).length;
  if (latinCount > 0) {
    const latinLanguage = detectLatinLanguage(value);
    if (latinLanguage) return latinLanguage;
    if (LATIN_LANGUAGE_CODES.has(selected)) return selected;
    if (LATIN_LANGUAGE_CODES.has(native)) return native;
    if (LATIN_LANGUAGE_CODES.has(target)) return target;
    return native;
  }

  return selected || target || native;
}

function getLanguageName(language, uiLanguage = '') {
  const code = normalizeLanguageCode(language);
  const ui = normalizeLanguageCode(uiLanguage);
  if (LANGUAGE_NAMES_BY_UI[ui]?.[code]) return LANGUAGE_NAMES_BY_UI[ui][code];
  return LANGUAGE_NAMES[code] || code || 'the selected language';
}

function detectScenarioKey(scenario = '') {
  const value = normalizeLatinText(scenario);
  if (value.includes('cafe') || value.includes('coffee') || value.includes('barista')) return 'cafe';
  if (value.includes('direction') || value.includes('station') || value.includes('route')) return 'directions';
  if (value.includes('meeting') || value.includes('introduc')) return 'introductions';
  if (value.includes('hotel') || value.includes('check in')) return 'hotel';
  return 'cafe';
}

function normalizeRoleState(roleState = {}, scenario = '') {
  const scenarioKey = detectScenarioKey(roleState.scenarioKey || scenario);
  const config = SCENARIO_ROLE_CONFIGS[scenarioKey] || SCENARIO_ROLE_CONFIGS.cafe;
  const learnerRoleKey = config.roles[roleState.learnerRoleKey]
    ? roleState.learnerRoleKey
    : config.defaultLearnerRoleKey;
  const partnerRoleKey = config.roles[roleState.partnerRoleKey]
    ? roleState.partnerRoleKey
    : config.defaultPartnerRoleKey;

  return {
    scenarioKey,
    learnerRoleKey,
    partnerRoleKey,
    learnerRole: config.roles[learnerRoleKey],
    partnerRole: config.roles[partnerRoleKey],
  };
}

function requestedLearnerRoleKey(transcript = '', scenario = '') {
  const scenarioKey = detectScenarioKey(scenario);
  const config = SCENARIO_ROLE_CONFIGS[scenarioKey];
  if (!config?.learnerRoleRequests) return '';

  const normalized = normalizeLatinText(transcript);
  if (!normalized) return '';

  const request = config.learnerRoleRequests.find(item => (
    item.patterns.some(pattern => pattern.test(normalized))
  ));

  return request?.roleKey || '';
}

function resolveConversationRoleState({ scenario = '', memory = {}, transcript = '' } = {}) {
  const scenarioKey = detectScenarioKey(scenario);
  const config = SCENARIO_ROLE_CONFIGS[scenarioKey] || SCENARIO_ROLE_CONFIGS.cafe;
  const current = normalizeRoleState(memory?.roleState || {}, scenario);
  const requestedRoleKey = requestedLearnerRoleKey(transcript, scenario);

  if (!requestedRoleKey || !config.roles[requestedRoleKey]) {
    return {
      ...current,
      roleSwitchRequested: false,
    };
  }

  const partnerRoleKey = Object.keys(config.roles).find(key => key !== requestedRoleKey)
    || config.defaultPartnerRoleKey;

  return {
    ...normalizeRoleState({ scenarioKey, learnerRoleKey: requestedRoleKey, partnerRoleKey }, scenario),
    roleSwitchRequested: true,
  };
}

function detectOutOfPairLanguage({
  transcript,
  targetLanguage = 'ko',
  nativeLanguage = 'en',
}) {
  const target = normalizeLanguageCode(targetLanguage) || 'ko';
  const native = normalizeLanguageCode(nativeLanguage) || 'en';
  const scriptLanguage = detectScriptLanguage(transcript);
  const likelyLanguage = scriptLanguage || detectLatinLanguage(transcript);

  if (!likelyLanguage || likelyLanguage === target || likelyLanguage === native) {
    return null;
  }

  return {
    language: likelyLanguage,
    languageName: getLanguageName(likelyLanguage, native),
    targetLanguage: target,
    nativeLanguage: native,
    targetLanguageName: getLanguageName(target, native),
    nativeLanguageName: getLanguageName(native, native),
  };
}

function buildLanguagePairRedirect(outOfPair) {
  const nativeName = outOfPair?.nativeLanguageName || 'your native language';
  const targetName = outOfPair?.targetLanguageName || 'your target language';
  const outsideName = outOfPair?.languageName || 'another language';
  const copy = LANGUAGE_PAIR_REDIRECT_COPY[outOfPair?.nativeLanguage] || LANGUAGE_PAIR_REDIRECT_COPY.en;
  const values = { nativeName, targetName, outsideName };
  const reply = copy.reply(values);

  return {
    aiEnabled: true,
    reply,
    coachingTip: copy.tip(values),
    expectedLanguage: outOfPair?.nativeLanguage || 'en',
    nextSuggestedIntent: copy.intent(values),
    speechParts: [
      {
        language: outOfPair?.nativeLanguage || 'en',
        text: reply,
      },
    ],
    languageOutOfPair: true,
  };
}

function safeConversationHistory(history = []) {
  if (!Array.isArray(history)) return [];
  return history
    .slice(-10)
    .filter(turn => turn && ['user', 'assistant'].includes(turn.role) && typeof turn.content === 'string')
    .map(turn => ({
      role: turn.role,
      content: turn.content.slice(0, 800),
    }));
}

function sanitizeMemory(memory) {
  if (!memory || typeof memory !== 'object' || Array.isArray(memory)) return {};
  try {
    const serialized = JSON.stringify(memory);
    if (serialized.length > 6000) return {};
    return JSON.parse(serialized);
  } catch (_) {
    return {};
  }
}

function sanitizeSummary(summary) {
  return String(summary || '').slice(0, 2500);
}

function sanitizeCustomRoleplay(customRoleplay) {
  if (!customRoleplay || typeof customRoleplay !== 'object' || Array.isArray(customRoleplay)) return null;
  const learnerRole = String(customRoleplay.learnerRole || '').trim().slice(0, 80);
  const partnerRole = String(customRoleplay.partnerRole || '').trim().slice(0, 80);
  const situation = String(customRoleplay.situation || '').trim().slice(0, 300);
  const goal = String(customRoleplay.goal || '').trim().slice(0, 300);
  const title = String(customRoleplay.title || `${learnerRole} and ${partnerRole}`).trim().slice(0, 120);

  if (!learnerRole || !partnerRole || !situation || !goal) return null;

  return {
    id: String(customRoleplay.id || 'custom-roleplay').trim().slice(0, 120),
    title,
    learnerRole,
    partnerRole,
    situation,
    goal,
  };
}

function estimateTextTokens(value) {
  const text = typeof value === 'string' ? value : JSON.stringify(value || '');
  const trimmed = String(text || '').trim();
  if (!trimmed) return 0;
  const wordLike = (trimmed.match(/[\p{L}\p{N}_]+/gu) || []).length;
  const charEstimate = Math.ceil(trimmed.length / 4);
  return Math.max(charEstimate, wordLike);
}

function extractRequestedPhrase(text = '') {
  const value = String(text || '').trim();
  const quoted = value.match(/["'“‘]([^"'”’]+)["'”’]/);
  if (quoted?.[1]) return quoted[1].trim().slice(0, 120);

  const meaningMatch = value.match(/(?:what does|what is|explain|meaning of)\s+(.+?)\s+(?:mean|means|in english|in korean|\?)/i);
  if (meaningMatch?.[1]) return meaningMatch[1].trim().slice(0, 120);

  const targetScriptMatch = value.match(/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3][\u3131-\u314e\u314f-\u3163\uac00-\ud7a3\s]*/);
  return targetScriptMatch?.[0]?.trim().slice(0, 120) || '';
}

function stripJsonCodeFence(value) {
  return String(value || '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
}

function extractBalancedJsonObject(value) {
  const text = String(value || '');
  const start = text.indexOf('{');
  if (start < 0) return '';

  let depth = 0;
  let inString = false;
  let escaping = false;

  for (let index = start; index < text.length; index += 1) {
    const char = text[index];

    if (inString) {
      if (escaping) {
        escaping = false;
      } else if (char === '\\') {
        escaping = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
    } else if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) return text.slice(start, index + 1);
    }
  }

  return '';
}

function tryParseJson(value) {
  if (typeof value !== 'string') return null;
  const cleaned = stripJsonCodeFence(value);
  if (!cleaned) return null;

  try {
    return JSON.parse(cleaned);
  } catch (_) {
    const objectText = extractBalancedJsonObject(cleaned);
    if (!objectText || objectText === cleaned) return null;
    try {
      return JSON.parse(objectText);
    } catch (__) {
      return null;
    }
  }
}

function looksLikeJsonPayload(value) {
  const text = stripJsonCodeFence(value);
  return (
    text.startsWith('{')
    || text.includes('"reply"')
    || text.includes('"speechParts"')
    || text.includes('"expectedLanguage"')
  );
}

function extractJsonStringField(value, field) {
  const pattern = new RegExp(`"${field}"\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"`, 's');
  const match = String(value || '').match(pattern);
  if (!match?.[1]) return '';

  try {
    return JSON.parse(`"${match[1]}"`);
  } catch (_) {
    return match[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .trim();
  }
}

function normalizeParsedAIContent(parsed, fallbackContent = '') {
  if (!parsed) {
    const extractedReply = extractJsonStringField(fallbackContent, 'reply');
    if (extractedReply) return { reply: extractedReply };

    return looksLikeJsonPayload(fallbackContent)
      ? { reply: 'I had trouble formatting that reply. Please try again naturally.' }
      : { reply: String(fallbackContent || '') };
  }

  if (typeof parsed === 'string') {
    const nested = tryParseJson(parsed);
    if (nested) return normalizeParsedAIContent(nested, parsed);
    return normalizeParsedAIContent(null, parsed);
  }

  if (typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { reply: String(parsed || '') };
  }

  if (typeof parsed.reply === 'string') {
    const nestedReply = tryParseJson(parsed.reply);
    if (nestedReply && typeof nestedReply === 'object' && !Array.isArray(nestedReply)) {
      return { ...parsed, ...nestedReply };
    }
  } else if (parsed.reply && typeof parsed.reply === 'object' && !Array.isArray(parsed.reply)) {
    return { ...parsed, ...parsed.reply };
  }

  if (!parsed.reply && typeof parsed.response === 'string') {
    return { ...parsed, reply: parsed.response };
  }

  return parsed;
}

function parseAIJsonContent(content) {
  return normalizeParsedAIContent(tryParseJson(content), content);
}

function sanitizeAIReply(reply) {
  const text = String(reply || '').trim();
  if (!text || looksLikeJsonPayload(text)) {
    return 'I had trouble formatting that reply. Please try again naturally.';
  }
  return text.slice(0, 800);
}

function orderSpeechPartsForPair(parts = [], targetLanguage = 'ko', nativeLanguage = 'en') {
  const target = normalizeLanguageCode(targetLanguage) || 'ko';
  const native = normalizeLanguageCode(nativeLanguage) || 'en';

  return [...parts].sort((a, b) => {
    const aLanguage = normalizeLanguageCode(a?.language);
    const bLanguage = normalizeLanguageCode(b?.language);
    const rank = (language) => {
      if (language === target) return 0;
      if (language === native) return 1;
      return 2;
    };

    return rank(aLanguage) - rank(bLanguage);
  });
}

function languageOrderAliases(language, uiLanguage = '') {
  const code = normalizeLanguageCode(language);
  const aliases = new Set([
    code,
    getLanguageName(code, 'en'),
    getLanguageName(code, uiLanguage),
  ]);

  if (code === 'fil') aliases.add('tagalog');
  if (code === 'en') aliases.add('english');
  aliases.delete('');

  return [...aliases]
    .map(alias => normalizeLatinText(alias))
    .filter(Boolean);
}

function learnerRequestedNativeFirstOrder(text, targetLanguage = 'ko', nativeLanguage = 'en') {
  const normalized = normalizeLatinText(text);
  if (!normalized) return false;

  const native = normalizeLanguageCode(nativeLanguage) || 'en';
  const target = normalizeLanguageCode(targetLanguage) || 'ko';
  const nativeAliases = languageOrderAliases(native, native);
  const targetAliases = languageOrderAliases(target, native);
  const hasTargetMention = targetAliases.some(alias => normalized.includes(alias));

  if (
    /\b(native|my language|mother tongue)\s+(first|muna|before)\b/.test(normalized)
    || /\b(first|muna)\s+(in\s+)?(native|my language|mother tongue)\b/.test(normalized)
  ) {
    return true;
  }

  return nativeAliases.some((alias) => {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const nativeFirstPatterns = [
      new RegExp(`\\b${escaped}\\s+(first|muna|before)\\b`),
      new RegExp(`\\b(first|muna)\\s+(in\\s+)?${escaped}\\b`),
      new RegExp(`\\b${escaped}\\s+(then|pagkatapos|bago|before)\\b`),
    ];

    return nativeFirstPatterns.some(pattern => pattern.test(normalized))
      && (hasTargetMention || normalized.includes('target') || normalized.includes('then'));
  });
}

async function callAIConversation({
  scenario,
  targetLanguage,
  nativeLanguage,
  inputLanguage,
  transcript,
  history,
  difficulty,
  summary,
  memory,
  productContext = 'Lingo Booth language-learning app',
  maxCompletionTokens,
  customRoleplay,
}) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const safeTargetLanguage = normalizeLanguageCode(targetLanguage) || 'ko';
  const safeNativeLanguage = normalizeLanguageCode(nativeLanguage) || 'en';

  if (!apiKey) {
    return {
      aiEnabled: false,
      reply: '',
      expectedLanguage: safeTargetLanguage,
      coachingTip: '',
      summary: sanitizeSummary(summary),
      memory: sanitizeMemory(memory),
      speechParts: [],
    };
  }

  const selectedInputLanguage = normalizeLanguageCode(inputLanguage);
  const detectedScriptLanguage = detectScriptLanguage(transcript);
  const learnerLanguage = detectDominantLanguage(transcript, safeTargetLanguage, safeNativeLanguage, inputLanguage);
  const learnerUsedNativeLanguage = learnerLanguage === safeNativeLanguage;
  const learnerUsedTargetLanguage = learnerLanguage === safeTargetLanguage;
  const learnerRequestedNativeFirst = learnerRequestedNativeFirstOrder(transcript, safeTargetLanguage, safeNativeLanguage);
  const requestedPhrase = extractRequestedPhrase(transcript);
  const model = process.env.DEEPSEEK_CONVERSATION_MODEL || process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash';
  const safeCustomRoleplay = sanitizeCustomRoleplay(customRoleplay || memory?.customRoleplay);
  const roleState = safeCustomRoleplay
    ? {
      scenarioKey: 'custom',
      learnerRoleKey: 'customLearner',
      partnerRoleKey: 'customPartner',
      learnerRole: safeCustomRoleplay.learnerRole,
      partnerRole: safeCustomRoleplay.partnerRole,
      roleSwitchRequested: false,
    }
    : resolveConversationRoleState({ scenario, memory, transcript });
  const roleMemory = sanitizeMemory({
    ...sanitizeMemory(memory),
    ...(safeCustomRoleplay ? { customRoleplay: safeCustomRoleplay } : {}),
    roleState: {
      scenarioKey: roleState.scenarioKey,
      learnerRoleKey: roleState.learnerRoleKey,
      partnerRoleKey: roleState.partnerRoleKey,
      learnerRole: roleState.learnerRole,
      partnerRole: roleState.partnerRole,
    },
  });

  const systemPrompt = [
    `You are the speaking conversation partner for ${productContext}.`,
    'Run a live language-learning roleplay, not a fixed database exercise.',
    'Act like a flexible conversation partner or friend, not a pronunciation drill coach.',
    'Stay inside the named scenario and follow the assigned learnerRole and conversationPartnerRole.',
    'For custom roleplays, use customRoleplay.title, customRoleplay.situation, and customRoleplay.goal as the scenario source of truth.',
    'You are always the conversationPartnerRole. The learner is always learnerRole.',
    'If the learner asks to switch to a valid role in the scenario, accept the role switch, update memory.roleState, and continue as the new conversationPartnerRole.',
    'Do not say "repeat after me", do not ask the learner to repeat a phrase, and do not loop the same prompt.',
    'Each reply must advance the discussion with one natural, short response or question.',
    'Remember concrete facts from conversationMemory and conversationSummary, such as orders, sizes, destinations, names, prices, and waiting times.',
    'If the learner asks what they ordered or what was already decided, answer from conversationMemory and conversationSummary.',
    'The selected language pair is nativeLanguage and targetLanguage only. If the learner uses a different language, politely ask them to continue in the selected pair and do not answer the off-pair content.',
    'When a reply uses both languages in the selected pair, use target language first, then native-language support, unless the learner explicitly asks for a different arrangement.',
    'If the learner uses their native language, first respond with a natural target-language line, then add a brief native-language explanation or confirmation.',
    'For native-language turns, return speechParts with one target-language part first and one native-language part second, unless the learner explicitly asks for another order.',
    'If latestLearnerTranscript contains the target-language script, treat it as target-language learner speech even when the microphone selector was wrong.',
    'If the learner speaks Korean Hangul and targetLanguage is ko, respond to the Korean meaning naturally; do not pretend the learner asked an English meta-question.',
    'If the learner asks what a word or phrase means, explain the exact word or phrase they asked about; do not substitute a different word.',
    'If requestedPhrase is provided, your explanation must be about requestedPhrase exactly.',
    'If the learner switches topic, follow the new topic naturally while preserving important memory.',
    'Keep replies short enough to be spoken aloud safely in hands-free mode.',
    'Do not mention APIs, backend logs, model names, environment variables, or provider configuration to the learner.',
    'Return strict JSON with keys: reply, coachingTip, expectedLanguage, nextSuggestedIntent, speechParts, summary, memory.',
    'The reply value must be plain user-visible conversation text only. Never put JSON, object keys, braces, markdown fences, or escaped JSON inside reply.',
    'summary must be a compact running summary of durable facts and unresolved tasks, maximum 120 words.',
    'memory must be a compact JSON object of durable facts, such as order, destination, learnerPreferences, pendingQuestion, or scenarioState.',
    'Use short language codes such as ko, en, es, fr, de, ja, zh, hi, ar, he, pt, it, nl, ru, id, ms, fil, tr, bn, or ta for expectedLanguage and speechParts[].language.',
  ].join(' ');

  const messages = [
    { role: 'system', content: systemPrompt },
    ...safeConversationHistory(history),
    {
      role: 'user',
      content: JSON.stringify({
        scenario: scenario || 'Casual conversation practice',
        customRoleplay: safeCustomRoleplay,
        targetLanguage: safeTargetLanguage,
        nativeLanguage: safeNativeLanguage,
        inputLanguage: inputLanguage || '',
        selectedInputLanguage,
        detectedScriptLanguage,
        difficulty: difficulty || 'friendly beginner',
        learnerLanguage,
        learnerUsedNativeLanguage,
        learnerUsedTargetLanguage,
        learnerRequestedNativeFirst,
        learnerRole: roleState.learnerRole,
        conversationPartnerRole: roleState.partnerRole,
        roleState,
        roleSwitchRequested: roleState.roleSwitchRequested,
        requestedPhrase,
        conversationSummary: sanitizeSummary(summary),
        conversationMemory: roleMemory,
        latestLearnerTranscript: transcript,
        instruction: [
          'Continue naturally as a conversation partner.',
          'Use conversationSummary and conversationMemory as authoritative context unless the learner corrects it.',
          `You are playing the scenario role: ${roleState.partnerRole}. The learner is playing: ${roleState.learnerRole}.`,
          roleState.roleSwitchRequested
            ? `The learner asked to switch roles. Confirm briefly, then continue immediately as ${roleState.partnerRole}.`
            : '',
          'If the learner asks a memory question, answer it directly before continuing.',
          'If the learner appears to be using a language other than nativeLanguage or targetLanguage, redirect them back to the selected language pair.',
          learnerRequestedNativeFirst
            ? 'The learner explicitly asked for native-language first ordering. Respect that requested arrangement for both reply text and speechParts.'
            : 'If your reply uses both selected languages, put the target-language part first and native-language support second.',
          learnerUsedNativeLanguage
            ? 'The learner used their native language. Unless they requested a different language order, reply in two parts: first a natural target-language roleplay answer, then a short native-language explanation or confirmation. Put both parts in reply in that order, and provide speechParts in the same target-first order.'
            : 'The learner used the target language or another non-native language. Continue mostly in the target language. If native-language support is useful, use the requested order when specified; otherwise put the target-language line first and native-language support second.',
          learnerUsedTargetLanguage
            ? 'The learner used the target language. Respond to what they actually said and continue the roleplay naturally; do not switch into a translation lesson unless they ask for one.'
            : '',
          requestedPhrase ? `The exact requested phrase is: ${requestedPhrase}. Explain this phrase, not any other phrase.` : '',
          'Never expose operational errors, API details, backend logs, environment variables, or model/provider names.',
        ].join(' '),
      }),
    },
  ];

  const requestBody = {
    model,
    temperature: 0.7,
    response_format: { type: 'json_object' },
    messages,
  };

  const cappedMaxTokens = Number(maxCompletionTokens);
  if (Number.isFinite(cappedMaxTokens) && cappedMaxTokens > 0) {
    requestBody.max_tokens = Math.max(1, Math.min(900, Math.floor(cappedMaxTokens)));
  } else {
    requestBody.max_tokens = 700;
  }

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`AI provider request failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  const data = await response.json();
  const promptEstimate = messages.reduce((sum, message) => sum + estimateTextTokens(message.content), 0);
  const content = data.choices?.[0]?.message?.content || '{}';
  const parsed = parseAIJsonContent(content);

  const reply = sanitizeAIReply(parsed.reply);
  const fallbackLanguage = detectDominantLanguage(reply, safeTargetLanguage, safeNativeLanguage);
  const parsedLanguage = normalizeLanguageCode(String(parsed.expectedLanguage || '').slice(0, 20));
  const parsedSpeechParts = Array.isArray(parsed.speechParts)
    ? parsed.speechParts
      .filter(part => part && typeof part.text === 'string')
      .slice(0, 3)
      .map(part => ({
        language: normalizeLanguageCode(part.language) || detectDominantLanguage(part.text, safeTargetLanguage, safeNativeLanguage),
        text: part.text.slice(0, 500),
      }))
    : [];
  const speechParts = learnerRequestedNativeFirst
    ? parsedSpeechParts
    : orderSpeechPartsForPair(parsedSpeechParts, safeTargetLanguage, safeNativeLanguage);
  const providerUsage = data.usage || {};
  const promptTokens = Number(providerUsage.prompt_tokens) || promptEstimate;
  const completionTokens = Number(providerUsage.completion_tokens) || estimateTextTokens(reply);
  const totalTokens = Number(providerUsage.total_tokens) || (promptTokens + completionTokens);

  return {
    aiEnabled: true,
    reply,
    coachingTip: String(parsed.coachingTip || '').slice(0, 400),
    expectedLanguage: parsedLanguage || fallbackLanguage,
    nextSuggestedIntent: String(parsed.nextSuggestedIntent || '').slice(0, 200),
    speechParts,
    summary: sanitizeSummary(parsed.summary || summary),
    memory: sanitizeMemory({
      ...sanitizeMemory(parsed.memory || roleMemory),
      ...(safeCustomRoleplay ? { customRoleplay: safeCustomRoleplay } : {}),
      roleState: {
        scenarioKey: roleState.scenarioKey,
        learnerRoleKey: roleState.learnerRoleKey,
        partnerRoleKey: roleState.partnerRoleKey,
        learnerRole: roleState.learnerRole,
        partnerRole: roleState.partnerRole,
      },
    }),
    roleState: {
      scenarioKey: roleState.scenarioKey,
      learnerRoleKey: roleState.learnerRoleKey,
      partnerRoleKey: roleState.partnerRoleKey,
      learnerRole: roleState.learnerRole,
      partnerRole: roleState.partnerRole,
      roleSwitchRequested: roleState.roleSwitchRequested,
    },
    usage: {
      promptTokens,
      completionTokens,
      totalTokens,
    },
    model,
  };
}

module.exports = {
  callAIConversation,
  buildLanguagePairRedirect,
  detectDominantLanguage,
  detectLatinLanguage,
  detectOutOfPairLanguage,
  learnerRequestedNativeFirstOrder,
  normalizeLanguageCode,
  orderSpeechPartsForPair,
  parseAIJsonContent,
  resolveConversationRoleState,
  safeConversationHistory,
  sanitizeCustomRoleplay,
  sanitizeMemory,
  sanitizeSummary,
};
