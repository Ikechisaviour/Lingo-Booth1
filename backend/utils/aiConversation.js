const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const FORMATTING_FALLBACK_REPLY = 'I had trouble formatting that reply. Please try again naturally.';
const { batchTranslateRaw } = require('./translationService');
const PROVIDER_TIMEOUT_MS = Math.max(
  5000,
  Number(process.env.AI_PROVIDER_TIMEOUT_MS || 12000)
);

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
  const aliases = {
    kr: 'ko',
    kor: 'ko',
    cn: 'zh',
    chn: 'zh',
    jp: 'ja',
    jpn: 'ja',
    iw: 'he',
    in: 'id',
    tl: 'fil',
  };
  if (aliases[value]) return aliases[value];
  if (value.startsWith('zh')) return 'zh';
  if (value.startsWith('pt')) return 'pt';
  const base = value.split(/[-_]/)[0];
  return aliases[base] || base;
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

function normalizeStudyText(text) {
  return String(text || '')
    .normalize('NFKC')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
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
      ? { reply: FORMATTING_FALLBACK_REPLY }
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
  if (!text) {
    return FORMATTING_FALLBACK_REPLY;
  }

  if (looksLikeJsonPayload(text)) {
    const parsed = normalizeParsedAIContent(tryParseJson(text), text);
    const candidate = typeof parsed?.reply === 'string' ? parsed.reply.trim() : '';
    if (candidate && candidate !== text && !looksLikeJsonPayload(candidate)) {
      return candidate.slice(0, 800);
    }

    const extractedReply = extractJsonStringField(text, 'reply');
    if (extractedReply && !looksLikeJsonPayload(extractedReply)) {
      return extractedReply.slice(0, 800);
    }

    return FORMATTING_FALLBACK_REPLY;
  }

  return text.slice(0, 800);
}

function allowedScriptLanguagesForPair(targetLanguage = 'ko', nativeLanguage = 'en') {
  const target = normalizeLanguageCode(targetLanguage) || 'ko';
  const native = normalizeLanguageCode(nativeLanguage) || 'en';
  const allowed = new Set([target, native]);

  // Japanese commonly uses kanji, which lives in the same Unicode block that
  // our coarse detector labels as Chinese.
  if (allowed.has('ja')) allowed.add('zh');

  return allowed;
}

function stripDisallowedScripts(text, targetLanguage = 'ko', nativeLanguage = 'en') {
  let value = String(text || '');
  if (!value) return value;

  const allowed = allowedScriptLanguagesForPair(targetLanguage, nativeLanguage);
  for (const entry of SCRIPT_LANGUAGE_PATTERNS) {
    if (!allowed.has(entry.language)) {
      value = value.replace(entry.pattern, ' ');
    }
  }

  return value
    .replace(/\s+([.,!?;:])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .replace(/(?:\s+[\/|]\s+)+/g, ' / ')
    .trim();
}

function pairGuardFallbackReply(targetLanguage = 'ko', nativeLanguage = 'en') {
  const native = normalizeLanguageCode(nativeLanguage) || 'en';
  const targetName = getLanguageName(targetLanguage, native);
  const nativeName = getLanguageName(native, native);
  const copy = LANGUAGE_PAIR_REDIRECT_COPY[native] || LANGUAGE_PAIR_REDIRECT_COPY.en;
  return copy.reply({
    nativeName,
    targetName,
    outsideName: 'another language',
  });
}

function enforceTextLanguagePair(text, targetLanguage = 'ko', nativeLanguage = 'en', fallback) {
  const cleaned = stripDisallowedScripts(text, targetLanguage, nativeLanguage);
  if (cleaned) return cleaned;
  if (fallback !== undefined) return fallback;
  return pairGuardFallbackReply(targetLanguage, nativeLanguage);
}

function enforceValueLanguagePair(value, targetLanguage = 'ko', nativeLanguage = 'en', depth = 0) {
  if (depth > 5) return value;
  if (typeof value === 'string') return stripDisallowedScripts(value, targetLanguage, nativeLanguage);
  if (Array.isArray(value)) {
    return value.map(item => enforceValueLanguagePair(item, targetLanguage, nativeLanguage, depth + 1));
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [
      key,
      enforceValueLanguagePair(item, targetLanguage, nativeLanguage, depth + 1),
    ]));
  }
  return value;
}

function parseClassLessonAction(transcript = '') {
  const lines = String(transcript || '').split(/\r?\n/);
  if (lines[0]?.trim() !== 'CLASS_LESSON_ACTION') return null;

  return lines.slice(1).reduce((values, line) => {
    const index = line.indexOf('=');
    if (index <= 0) return values;
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    return key ? { ...values, [key]: value } : values;
  }, {});
}

function speakerLabelFromMarker(marker = '') {
  const normalized = String(marker || '').trim().toUpperCase();
  if (normalized === 'A') return 'Person A';
  if (normalized === 'B') return 'Person B';
  return '';
}

function normalizeSpeakerLabel(speaker = '') {
  const value = String(speaker || '').trim();
  if (!value) return '';
  const markerMatch = value.match(/^(?:person|speaker)?\s*([AB])\.?$/i);
  if (markerMatch?.[1]) return speakerLabelFromMarker(markerMatch[1]);
  return value.slice(0, 40);
}

function extractSpeakerPrefix(text = '') {
  const value = String(text || '').trim();
  const match = value.match(/^(?:(?:person|speaker)\s*)?([AB])\s*[:.)-]\s*(.+)$/i);
  if (!match?.[1] || !match?.[2]) {
    return { speaker: '', text: value };
  }
  return {
    speaker: speakerLabelFromMarker(match[1]),
    text: match[2].trim(),
  };
}

function stripExamplePrefix(text = '') {
  return String(text || '')
    .trim()
    .replace(/^(?:example|sample)\s*[:.)-]\s*/i, '')
    .trim();
}

function hasExamplePrefix(text = '') {
  return /^(?:example|sample)\s*[:.)-]\s*/i.test(String(text || '').trim());
}

function makeDisplayPart({ type, language, text, speak = true, speaker = '', section = '' }) {
  const examplePrefixed = hasExamplePrefix(text);
  const extracted = extractSpeakerPrefix(stripExamplePrefix(text));
  const normalizedSpeaker = extracted.speaker || normalizeSpeakerLabel(speaker);
  const part = {
    type,
    language,
    text: extracted.text,
    speak,
  };
  if (normalizedSpeaker) part.speaker = normalizedSpeaker;
  if (section || examplePrefixed) part.section = section || 'example';
  return part;
}

function buildClassLessonDisplayParts(transcript = '', targetLanguage = 'ko', nativeLanguage = 'en', classAction = null, phrases = FALLBACK_PHRASE_TEMPLATES) {
  const action = classAction || parseClassLessonAction(transcript);
  if (!action) return [];

  const targetLanguageCode = normalizeLanguageCode(targetLanguage) || 'ko';
  const nativeLanguageCode = normalizeLanguageCode(nativeLanguage) || 'en';
  const target = String(action.target || '').trim();
  const romanization = String(action.romanization || action.officialPronunciation || '').trim();
  const learnerPronunciation = String(action.learnerPronunciation || '').trim();
  const officialPronunciation = String(action.officialPronunciation || romanization).trim();
  const native = String(action.native || '').trim();
  const exampleTarget = String(action.exampleTarget || '').trim();
  const exampleNative = String(action.exampleNative || '').trim();
  const title = String(action.activityTitle || action.activitySection || 'this item').trim();
  const itemType = String(action.itemType || '').trim().toLowerCase();
  const verb = String(action.action || '').trim().toLowerCase();
  const hasDistinctExampleTarget = !!exampleTarget
    && normalizeStudyText(exampleTarget) !== normalizeStudyText(target);

  // Three actions, three shapes. Falls through to "teach" for unknown verbs so
  // older / unrecognized callers still get a sensible turn.
  const mode = verb.startsWith('practice') ? 'practice'
    : verb.startsWith('explain') ? 'explain'
    : 'teach';

  const parts = [];
  const pushMeta = (text, section = '') => {
    if (!text) return;
    parts.push(makeDisplayPart({
      type: 'meta',
      language: nativeLanguageCode,
      text,
      speak: false,
      ...(section ? { section } : {}),
    }));
  };
  const pushTarget = (text, { speaker = '', section = '' } = {}) => {
    if (!text) return null;
    const part = makeDisplayPart({
      type: 'target',
      language: targetLanguageCode,
      text,
      speak: true,
      ...(speaker ? { speaker } : {}),
      ...(section ? { section } : {}),
    });
    parts.push(part);
    return part;
  };
  const pushRomanization = (text, speaker = '', section = '') => {
    if (!text) return;
    parts.push(makeDisplayPart({
      type: 'romanization',
      language: targetLanguageCode,
      text,
      speak: false,
      ...(speaker ? { speaker } : {}),
      ...(section ? { section } : {}),
    }));
  };
  const pushPronunciationGuides = (speaker = '', section = '') => {
    const primary = learnerPronunciation || romanization;
    const secondary = officialPronunciation;
    pushRomanization(primary, speaker, section);
    if (secondary && normalizeLatinText(secondary) !== normalizeLatinText(primary)) {
      pushRomanization(secondary, speaker, section);
    }
  };
  const pushNative = (text, { speaker = '', section = '', speak = true } = {}) => {
    if (!text) return;
    parts.push(makeDisplayPart({
      type: 'native',
      language: nativeLanguageCode,
      text,
      speak,
      ...(speaker ? { speaker } : {}),
      ...(section ? { section } : {}),
    }));
  };

  if (mode === 'practice') {
    // Prompt the learner to produce — never reveal the answer up front.
    pushMeta(fillPhrase(phrases.practiceTitle, { title }));
    const targetPart = pushTarget(target);
    if (itemType === 'word') {
      pushPronunciationGuides(targetPart?.speaker);
    }
    const prompt = String(action.activityTask || '').trim()
      || (target
        ? (itemType === 'sentence' || itemType === 'conversation'
          ? phrases.practicePromptSentence
          : phrases.practicePromptWord)
        : phrases.practicePromptFallback);
    pushNative(prompt);
    return parts;
  }

  if (mode === 'explain') {
    pushMeta(target ? fillPhrase(phrases.breakingDown, { target }) : fillPhrase(phrases.explaining, { title }));
    const targetPart = pushTarget(target);
    pushPronunciationGuides(targetPart?.speaker);
    pushNative(native, { speaker: targetPart?.speaker });
    if (hasDistinctExampleTarget) {
      pushMeta(phrases.exampleHeader, 'example');
      const exampleTargetPart = pushTarget(exampleTarget, { section: 'example' });
      pushNative(exampleNative, { speaker: exampleTargetPart?.speaker, section: 'example' });
    }
    pushNative(phrases.explainCta);
    return parts;
  }

  // mode === 'teach'
  pushMeta(fillPhrase(phrases.letsLearn, { title }));
  const targetPart = pushTarget(target);
  if (itemType !== 'sentence' && itemType !== 'conversation') {
    pushPronunciationGuides(targetPart?.speaker);
  }
  pushNative(native, { speaker: targetPart?.speaker });
  if (hasDistinctExampleTarget) {
    pushMeta(phrases.exampleHeader, 'example');
    const exampleTargetPart = pushTarget(exampleTarget, { section: 'example' });
    pushNative(exampleNative, { speaker: exampleTargetPart?.speaker, section: 'example' });
  }
  pushNative(phrases.teachCta);
  return parts;
}

function displayPartsToReply(parts = []) {
  return parts
    .filter(part => part?.text)
    .map(part => {
      if (part.type === 'romanization') return `(${part.text})`;
      return part.speaker ? `${part.speaker}: ${part.text}` : part.text;
    })
    .join('\n')
    .slice(0, 800);
}

function speechPartsFromDisplayParts(parts = []) {
  return parts
    .filter(part => part?.speak !== false && part?.text && part?.language)
    .map(part => ({
      language: normalizeLanguageCode(part.language),
      text: String(part.text).slice(0, 500),
      ...(part.speaker ? { speaker: part.speaker } : {}),
    }))
    .slice(0, 8);
}

function buildClassLessonActionFallback(transcript = '', targetLanguage = 'ko', nativeLanguage = 'en', lessonBrief = null, classAction = null, phrases = FALLBACK_PHRASE_TEMPLATES) {
  // Prefer the structured classAction object when provided; fall back to parsing
  // the legacy CLASS_LESSON_ACTION text from the transcript for older callers.
  const action = classAction || parseClassLessonAction(transcript);
  if (!action) return '';

  const displayParts = buildClassLessonDisplayParts(transcript, targetLanguage, nativeLanguage, action, phrases);
  if (displayParts.length) return displayPartsToReply(displayParts);

  const targetLanguageCode = normalizeLanguageCode(targetLanguage) || 'ko';
  const nativeLanguageCode = normalizeLanguageCode(nativeLanguage) || 'en';
  const target = String(action.target || '').trim();
  const romanization = String(action.romanization || '').trim();
  const native = String(action.native || '').trim();
  const exampleTarget = String(action.exampleTarget || '').trim();
  const exampleNative = String(action.exampleNative || '').trim();
  const itemType = String(action.itemType || '').trim().toLowerCase();
  const verb = String(action.action || '').trim().toLowerCase();
  const mode = verb.startsWith('practice') ? 'practice'
    : verb.startsWith('explain') ? 'explain'
    : 'teach';

  // Prefer the brief's activeActivity (canonical) over the transcript-parsed metadata,
  // since the brief comes from the source-of-truth Lesson document.
  const activeActivity = lessonBrief?.activeActivity || null;
  const title = String(activeActivity?.title || action.activityTitle || action.activitySection || 'this item').trim();

  const lines = [];
  if (mode === 'practice') lines.push(fillPhrase(phrases.practiceTitle, { title }));
  else if (mode === 'explain') lines.push(target ? fillPhrase(phrases.breakingDown, { target }) : fillPhrase(phrases.explaining, { title }));
  else lines.push(fillPhrase(phrases.letsLearn, { title }));

  if (mode === 'practice') {
    // Show only the target; withhold the native answer so the learner produces.
    const targetLine = [target, romanization && itemType === 'word' ? `(${romanization})` : '']
      .filter(Boolean).join(' ');
    if (targetLine) lines.push(targetLine);
    lines.push(String(action.activityTask || '').trim() || (
      target
        ? (itemType === 'sentence' || itemType === 'conversation'
          ? phrases.practicePromptSentencePlain
          : phrases.practicePromptWordPlain)
        : phrases.practicePromptFallback
    ));
    return lines.join('\n').slice(0, 800);
  }

  // teach + explain both show target + gloss + example.
  const targetLine = [target, romanization ? `(${romanization})` : ''].filter(Boolean).join(' ');
  if (targetLine && native) lines.push(`${targetLine} - ${native}`);
  else if (targetLine || native) lines.push(targetLine || native);

  if (exampleTarget && exampleNative) {
    lines.push(phrases.examplePrefix ? `${phrases.examplePrefix} ${exampleTarget} - ${exampleNative}` : `${exampleTarget} - ${exampleNative}`);
  } else if (exampleTarget || exampleNative) {
    lines.push(phrases.examplePrefix ? `${phrases.examplePrefix} ${exampleTarget || exampleNative}` : (exampleTarget || exampleNative));
  }

  if (mode === 'explain') {
    lines.push(phrases.explainCta);
  } else {
    lines.push(phrases.teachCta);
  }

  return lines.join('\n').slice(0, 800);
}

// Canonical English templates for tutor fallback prose. These render to the
// learner ONLY when the AI provider failed and we hand off to the structured
// fallback path. Translated per-native via the cache below so a Spanish
// learner never sees "Try saying it back…" in English on the tutor pane.
// Keep these lines generic when possible. Morphology-heavy locales often make
// machine-translated placeholders sound clumsy, so the specific lesson item is
// carried by the structured target/native parts below instead of by prose.
const FALLBACK_PHRASE_TEMPLATES = Object.freeze({
  practiceTitle: 'Your turn to practice.',
  practicePromptSentence: "Read it aloud and tell me what it means. I'll check your answer.",
  practicePromptWord: "What does this mean? Say it aloud or type your answer — I'll confirm.",
  practicePromptFallback: 'Tell me what you remember about this item.',
  breakingDown: 'Let us break this down.',
  explaining: 'Here is a short explanation.',
  explainCta: 'Ask "why" or "when do I use this?" if you want me to go deeper, or say "next" to move on.',
  letsLearn: "Let's learn this item.",
  teachCta: 'Try saying it back, or tell me one thing that stands out — then we can practice it.',
  exampleHeader: 'Example',
  examplePrefix: 'Example:',
  practicePromptSentencePlain: 'Read it aloud and tell me what it means. I will confirm.',
  practicePromptWordPlain: 'What does this mean? Say it aloud or type your answer.',
});

const fallbackPhraseCache = new Map();
fallbackPhraseCache.set('en', { ...FALLBACK_PHRASE_TEMPLATES });

async function getLocalizedFallbackPhrases(nativeLanguage) {
  const code = normalizeLanguageCode(nativeLanguage) || 'en';
  if (fallbackPhraseCache.has(code)) return fallbackPhraseCache.get(code);

  const keys = Object.keys(FALLBACK_PHRASE_TEMPLATES);
  const texts = keys.map((k) => FALLBACK_PHRASE_TEMPLATES[k]);

  try {
    const results = await batchTranslateRaw(texts, 'en', code);
    const localized = {};
    keys.forEach((k, i) => {
      const translated = results?.[i]?.failed ? '' : results?.[i]?.text;
      localized[k] = translated && translated.trim() ? translated : '';
    });
    fallbackPhraseCache.set(code, localized);
    return localized;
  } catch (_) {
    // Translation failed - keep every learner-facing fallback phrase blank
    // instead of leaking English into a non-English turn. The next request can
    // try again because we deliberately do not cache this failure.
    return Object.fromEntries(Object.keys(FALLBACK_PHRASE_TEMPLATES).map((key) => [key, '']));
  }
}

function fillPhrase(template, vars = {}) {
  return String(template || '').replace(/\{\{(\w+)\}\}/g, (_, name) => (vars[name] != null ? String(vars[name]) : `{{${name}}}`));
}

async function buildClassLessonFallbackResult({
  transcript = '',
  targetLanguage = 'ko',
  nativeLanguage = 'en',
  summary = '',
  memory = {},
  lessonBrief = null,
  classAction = null,
} = {}) {
  const safeClassAction = sanitizeClassAction(classAction);
  const phrases = await getLocalizedFallbackPhrases(nativeLanguage);
  let displayParts = buildClassLessonDisplayParts(transcript, targetLanguage, nativeLanguage, safeClassAction, phrases);
  let reply = displayParts.length
    ? displayPartsToReply(displayParts)
    : buildClassLessonActionFallback(transcript, targetLanguage, nativeLanguage, lessonBrief, safeClassAction, phrases);

  if (!reply && lessonBrief?.items?.length) {
    const selectedIndex = Number(memory?.lessonProgress?.itemIndex);
    const currentItem = lessonBrief.items.find((item) => Number(item?.globalIndex) === selectedIndex)
      || lessonBrief.items[0];
    let localizedNative = currentItem?.native || '';
    let localizedExampleNative = currentItem?.exampleNative || '';

    if (currentItem && normalizeLanguageCode(nativeLanguage) !== 'en') {
      const sourceTexts = [localizedNative, localizedExampleNative].filter(Boolean);
      if (sourceTexts.length) {
        try {
          const translated = await batchTranslateRaw(sourceTexts, 'en', nativeLanguage);
          let cursor = 0;
          if (localizedNative) {
            localizedNative = translated[cursor]?.failed ? '' : (translated[cursor]?.text || '');
            cursor += 1;
          }
          if (localizedExampleNative) {
            localizedExampleNative = translated[cursor]?.failed ? '' : (translated[cursor]?.text || '');
          }
        } catch (_) {
          localizedNative = '';
          localizedExampleNative = '';
        }
      }
    }

    displayParts = buildClassLessonDisplayParts('', targetLanguage, nativeLanguage, {
      action: 'explain_selected_item',
      target: currentItem?.target || '',
      native: localizedNative,
      exampleTarget: currentItem?.exampleTarget || '',
      exampleNative: localizedExampleNative,
      romanization: currentItem?.romanization || '',
      officialPronunciation: currentItem?.officialPronunciation || '',
      learnerPronunciation: currentItem?.learnerPronunciation || '',
      itemType: currentItem?.type || '',
      activityTitle: lessonBrief?.activeActivity?.title || lessonBrief?.activeActivity?.section || lessonBrief?.title || '',
    }, phrases);
    reply = displayPartsToReply(displayParts);
  }

  if (!reply) return null;

  return {
    aiEnabled: true,
    providerFallback: true,
    reply,
    coachingTip: '',
    expectedLanguage: normalizeLanguageCode(targetLanguage) || 'ko',
    nextSuggestedIntent: '',
    displayParts,
    speechParts: speechPartsFromDisplayParts(displayParts),
    summary: sanitizeSummary(summary),
    memory: sanitizeMemory(memory),
    usage: {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
    },
  };
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

function scriptEntryForLanguage(language) {
  const code = normalizeLanguageCode(language);
  return SCRIPT_LANGUAGE_PATTERNS.find(entry => entry.language === code) || null;
}

function countLanguageScriptChars(text, language) {
  const entry = scriptEntryForLanguage(language);
  if (!entry) return 0;
  return (String(text || '').match(entry.pattern) || []).length;
}

function inferSpeechPartLanguage(text, targetLanguage = 'ko', nativeLanguage = 'en') {
  const value = String(text || '');
  const target = normalizeLanguageCode(targetLanguage) || 'ko';
  const native = normalizeLanguageCode(nativeLanguage) || 'en';
  const scriptLanguage = detectScriptLanguage(value);
  const latinCount = (value.match(/[A-Za-z]/g) || []).length;

  if (scriptLanguage && latinCount > 0) {
    const scriptCount = countLanguageScriptChars(value, scriptLanguage);
    const latinLanguage = detectLatinLanguage(value);
    if (latinLanguage && latinCount >= 12 && latinCount >= scriptCount * 2) {
      return latinLanguage;
    }
    return scriptLanguage;
  }

  return detectDominantLanguage(value, target, native);
}

function normalizePairSpeechLanguage(language, text, targetLanguage = 'ko', nativeLanguage = 'en') {
  const target = normalizeLanguageCode(targetLanguage) || 'ko';
  const native = normalizeLanguageCode(nativeLanguage) || 'en';
  const raw = normalizeLanguageCode(language);

  if (raw === target || raw === native) return raw;

  const inferred = inferSpeechPartLanguage(text, target, native);
  if (inferred === target || inferred === native) return inferred;
  if (inferred === 'zh' && target === 'ja') return target;
  if (inferred === 'zh' && native === 'ja') return native;

  const scriptLanguage = detectScriptLanguage(text);
  if (scriptLanguage === target || scriptLanguage === native) return scriptLanguage;
  if (scriptLanguage === 'zh' && target === 'ja') return target;
  if (scriptLanguage === 'zh' && native === 'ja') return native;

  if (/[A-Za-z]/.test(String(text || ''))) {
    if (LATIN_LANGUAGE_CODES.has(target)) return target;
    if (LATIN_LANGUAGE_CODES.has(native)) return native;
  }

  return target;
}

function normalizeExpectedLanguageForPair(language, fallbackLanguage, targetLanguage = 'ko', nativeLanguage = 'en') {
  const target = normalizeLanguageCode(targetLanguage) || 'ko';
  const native = normalizeLanguageCode(nativeLanguage) || 'en';
  const parsed = normalizeLanguageCode(language);
  const fallback = normalizeLanguageCode(fallbackLanguage);

  if (parsed === target || parsed === native) return parsed;
  if (fallback === target || fallback === native) return fallback;
  return target;
}

function splitSpeechCandidateSegments(text) {
  const value = String(text || '').replace(/\r\n/g, '\n').trim();
  if (!value) return [];

  const coarseParts = value
    .split(/\n+|\s+[\/|]\s+/u)
    .map(part => part.trim())
    .filter(Boolean);

  const segments = [];
  for (const part of coarseParts) {
    const sentenceMatches = part.match(/[^.!?。！？]+[.!?。！？]?/gu) || [part];
    for (const sentence of sentenceMatches) {
      const clean = sentence.trim();
      if (clean) segments.push(clean);
    }
  }

  return segments.length ? segments : [value];
}

function splitMixedScriptSegmentForSpeech(segment, targetLanguage = 'ko', nativeLanguage = 'en') {
  const text = String(segment || '').trim();
  if (!text) return [];

  const target = normalizeLanguageCode(targetLanguage) || 'ko';
  const native = normalizeLanguageCode(nativeLanguage) || 'en';
  const targetHasScript = !!scriptEntryForLanguage(target);
  const nativeHasScript = !!scriptEntryForLanguage(native);
  const latinLanguage = !targetHasScript && LATIN_LANGUAGE_CODES.has(target)
    ? target
    : !nativeHasScript && LATIN_LANGUAGE_CODES.has(native)
      ? native
      : '';
  const scriptLanguage = targetHasScript ? target : nativeHasScript ? native : '';

  if (!latinLanguage || !scriptLanguage || !countLanguageScriptChars(text, scriptLanguage) || !/[A-Za-z]/.test(text)) {
    return [text];
  }

  const pieces = [];
  const latinRun = /[A-Za-z][A-Za-z'’-]*(?:\s+[A-Za-z][A-Za-z'’-]*)*/g;
  let cursor = 0;
  let match;
  while ((match = latinRun.exec(text)) !== null) {
    const before = text.slice(cursor, match.index).trim();
    const latin = match[0].trim();
    if (before) pieces.push(before);
    if (latin) pieces.push(latin);
    cursor = match.index + match[0].length;
  }
  const after = text.slice(cursor).trim();
  if (after) pieces.push(after);

  return pieces.length > 1 ? pieces : [text];
}

function normalizeSpeechParts(parts = [], targetLanguage = 'ko', nativeLanguage = 'en') {
  return parts
    .filter(part => part && typeof part.text === 'string' && part.text.trim())
    .slice(0, 8)
    .map((part) => {
      const text = stripDisallowedScripts(part.text, targetLanguage, nativeLanguage).slice(0, 500);
      return {
        language: normalizePairSpeechLanguage(part.language, text, targetLanguage, nativeLanguage),
        text,
      };
    })
    .filter(part => part.text);
}

function buildFallbackSpeechParts(reply, targetLanguage = 'ko', nativeLanguage = 'en') {
  const segments = splitSpeechCandidateSegments(reply)
    .flatMap(segment => splitMixedScriptSegmentForSpeech(segment, targetLanguage, nativeLanguage));
  const parts = [];

  for (const segment of segments) {
    const language = normalizePairSpeechLanguage('', segment, targetLanguage, nativeLanguage);
    const previous = parts[parts.length - 1];
    if (previous && previous.language === language && previous.text.length + segment.length < 500) {
      previous.text = `${previous.text} ${segment}`.trim();
    } else {
      parts.push({ language, text: segment.slice(0, 500) });
    }
  }

  return parts.slice(0, 8);
}

function repairSpeechPartsForPair(parts = [], reply = '', targetLanguage = 'ko', nativeLanguage = 'en', nativeFirst = false) {
  const normalized = normalizeSpeechParts(parts, targetLanguage, nativeLanguage);
  const fallback = buildFallbackSpeechParts(reply, targetLanguage, nativeLanguage);
  const target = normalizeLanguageCode(targetLanguage) || 'ko';
  const native = normalizeLanguageCode(nativeLanguage) || 'en';
  const normalizedText = normalized.map(part => part.text).join(' ');
  const missingScriptedTarget = !!scriptEntryForLanguage(target)
    && countLanguageScriptChars(reply, target) > 0
    && countLanguageScriptChars(normalizedText, target) === 0;
  const missingScriptedNative = !!scriptEntryForLanguage(native)
    && countLanguageScriptChars(reply, native) > 0
    && countLanguageScriptChars(normalizedText, native) === 0;
  const useFallback = fallback.length > normalized.length
    || (normalized.length <= 1 && fallback.length > 1)
    || missingScriptedTarget
    || missingScriptedNative;
  const repaired = useFallback ? fallback : normalized;

  return nativeFirst
    ? repaired
    : orderSpeechPartsForPair(repaired, targetLanguage, nativeLanguage);
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

// Sanitize a classAction object received from the frontend. Returns null when
// the payload is malformed or missing required fields. The shape mirrors what
// ClassLessonPage / mobile MainTabs build per turn — a structured replacement
// for the legacy CLASS_LESSON_ACTION text prefix that used to ride inside the
// transcript field.
function sanitizeClassAction(classAction) {
  if (!classAction || typeof classAction !== 'object' || Array.isArray(classAction)) return null;
  const action = String(classAction.action || '').trim().slice(0, 80);
  if (!action) return null;
  const goalsRaw = Array.isArray(classAction.activityGoals) ? classAction.activityGoals : [];
  const expressionPracticeId = String(classAction.expressionPracticeId || '').trim().slice(0, 60);
  const expressionPracticeLabel = String(classAction.expressionPracticeLabel || '').trim().slice(0, 120);
  const expressionPracticeGoal = String(classAction.expressionPracticeGoal || '').trim().slice(0, 320);
  return {
    action,
    activityId: String(classAction.activityId || '').trim().slice(0, 80),
    activitySection: String(classAction.activitySection || '').trim().slice(0, 60),
    activityTitle: String(classAction.activityTitle || '').trim().slice(0, 200),
    activityGoals: goalsRaw.map(g => String(g || '').slice(0, 240)).filter(Boolean).slice(0, 8),
    activityTask: String(classAction.activityTask || '').trim().slice(0, 320),
    itemIndex: Number.isInteger(classAction.itemIndex) ? classAction.itemIndex : 0,
    itemType: String(classAction.itemType || '').trim().slice(0, 30),
    target: String(classAction.target || '').trim().slice(0, 240),
    romanization: String(classAction.romanization || '').trim().slice(0, 240),
    officialPronunciation: String(classAction.officialPronunciation || '').trim().slice(0, 240),
    learnerPronunciation: String(classAction.learnerPronunciation || '').trim().slice(0, 240),
    native: String(classAction.native || '').trim().slice(0, 320),
    exampleTarget: String(classAction.exampleTarget || '').trim().slice(0, 320),
    exampleNative: String(classAction.exampleNative || '').trim().slice(0, 320),
    lessonTitle: String(classAction.lessonTitle || '').trim().slice(0, 200),
    // Optional: drill a specific Expression Practice goal (id matches one of
    // lessonBrief.expressionPractice[].id). Empty when the action is item-based.
    ...(expressionPracticeId ? {
      expressionPracticeId,
      expressionPracticeLabel,
      expressionPracticeGoal,
    } : {}),
  };
}

// Maximum items the brief sends to the model. Lessons with more items get truncated
// so the prompt stays bounded. Filtered briefs (single activity) almost always fit.
const LESSON_BRIEF_MAX_ITEMS = 50;

function summarizeBriefItem(item, globalIndex) {
  const target = item.targetText || item.korean || '';
  const native = item.nativeText || item.english || '';
  if (!target || !native) return null;
  const breakdown = Array.isArray(item.breakdown)
    ? item.breakdown
      .map(b => ({
        target: String(b?.target || b?.korean || '').slice(0, 120),
        native: String(b?.native || b?.english || '').slice(0, 200),
      }))
      .filter(b => b.target && b.native)
      .slice(0, 6)
    : [];
  return {
    globalIndex,
    type: item.type || 'practice',
    target: String(target).slice(0, 200),
    romanization: String(item.romanization || item.pronunciation || '').slice(0, 200),
    officialPronunciation: String(item.officialPronunciation || item.romanization || item.pronunciation || '').slice(0, 200),
    learnerPronunciation: String(item.learnerPronunciation || '').slice(0, 200),
    native: String(native).slice(0, 240),
    example: String(item.exampleTarget || item.example || '').slice(0, 280),
    exampleNative: String(item.exampleNative || item.exampleEnglish || '').slice(0, 280),
    breakdown,
  };
}

function summarizeAvailableActivity(activity) {
  if (!activity || !activity.id) return null;
  return {
    id: String(activity.id).slice(0, 80),
    section: String(activity.section || '').slice(0, 60),
    title: String(activity.title || '').slice(0, 140),
  };
}

function summarizeActiveActivity(activity) {
  if (!activity || !activity.id) return null;
  return {
    id: String(activity.id).slice(0, 80),
    section: String(activity.section || '').slice(0, 60),
    title: String(activity.title || '').slice(0, 140),
    goals: Array.isArray(activity.goals)
      ? activity.goals.map(g => String(g || '').slice(0, 240)).filter(Boolean).slice(0, 6)
      : [],
    task: String(activity.task || '').slice(0, 320),
  };
}

// Build the curriculum payload sent to the AI tutor.
//   lesson      — the Lesson document (with optional `activities[]` and per-item `activityIds[]`)
//   activityId  — when present, filter `items` to those tagged with this activity. The
//                 untagged items (no `activityIds` array, or empty) stay visible so legacy
//                 lessons that predate activity tagging still teach normally.
function summarizeExpressionPractice(list = []) {
  if (!Array.isArray(list)) return [];
  return list
    .map(entry => {
      if (!entry || typeof entry !== 'object') return null;
      const id = String(entry.id || '').trim().slice(0, 60);
      if (!id) return null;
      return {
        id,
        label: String(entry.label || '').trim().slice(0, 120),
        goal: String(entry.goal || '').trim().slice(0, 320),
      };
    })
    .filter(Boolean)
    .slice(0, 8);
}

function summarizeRelatedPools(list = []) {
  if (!Array.isArray(list)) return [];
  return list
    .map(key => String(key || '').trim().slice(0, 80))
    .filter(Boolean)
    .slice(0, 12);
}

function buildLessonBrief(lesson, activityId = '') {
  if (!lesson || !Array.isArray(lesson.content)) return null;
  const safeActivityId = String(activityId || '').trim().slice(0, 80);

  const lessonActivities = Array.isArray(lesson.activities) ? lesson.activities : [];
  const activeActivityRaw = safeActivityId
    ? lessonActivities.find(activity => activity?.id === safeActivityId)
    : null;
  const activeActivity = summarizeActiveActivity(activeActivityRaw);
  const availableActivities = lessonActivities
    .map(summarizeAvailableActivity)
    .filter(Boolean);

  const items = [];
  let dropped = 0;
  lesson.content.forEach((item, globalIndex) => {
    const itemActivityIds = Array.isArray(item?.activityIds) ? item.activityIds : [];
    const matchesActivity = !safeActivityId
      || itemActivityIds.length === 0
      || itemActivityIds.includes(safeActivityId);
    if (!matchesActivity) return;
    const summary = summarizeBriefItem(item, globalIndex);
    if (!summary) return;
    if (items.length < LESSON_BRIEF_MAX_ITEMS) items.push(summary);
    else dropped += 1;
  });

  return {
    title: String(lesson.title || '').slice(0, 200),
    category: String(lesson.category || '').slice(0, 60),
    difficulty: String(lesson.difficulty || '').slice(0, 30),
    lessonType: String(lesson.lessonType || '').slice(0, 30),
    activeActivity,
    availableActivities,
    items,
    expressionPractice: summarizeExpressionPractice(lesson.expressionPractice),
    relatedPools: summarizeRelatedPools(lesson.relatedPools),
    truncated: dropped > 0,
    truncatedCount: dropped,
  };
}

// Per-activity teaching styles. Keyed by the activity's `section` label as it appears
// in the textbook scope (Speaking, Reading and Speaking, Pronunciation, etc.). When a
// lesson activity uses a section name not in this map, DEFAULT_ACTIVITY_DIRECTIVES runs.
const ACTIVITY_DIRECTIVES_BY_SECTION = Object.freeze({
  speaking: [
    'Speaking activity: have the learner produce one or two target-language sentences. Demonstrate one short model line, then ask the learner to give their own version. Give a one-line correction or compliment in the native language only when it helps.',
  ],
  'reading and speaking': [
    'Reading and Speaking activity: read the target-language text aloud first, then ask the learner to read along or paraphrase. Follow with one comprehension question they can answer in target language.',
  ],
  'listening and speaking': [
    'Listening and Speaking activity: speak the dialogue using displayParts with `speaker` set to "Person A" or "Person B" so each line is voiced separately. Ask the learner what they heard, then have them respond as one of the speakers.',
  ],
  'reading and writing': [
    'Reading and Writing activity: present the model passage briefly, then prompt the learner to write a short parallel response. Give writing-focused feedback (word choice, grammar pattern), not pronunciation feedback.',
  ],
  task: [
    'Task activity: set the scenario from activeActivity.task, take the partner role, and run the task to a clear conclusion. At the end, briefly tell the learner whether they met the task goal in one short native-language sentence.',
  ],
  vocabulary: [
    'Vocabulary activity: introduce the word with romanization and a one-line meaning, share the example sentence, then ask the learner to make their own sentence using the word. Move on after one attempt.',
  ],
  'grammar and expression': [
    'Grammar activity: name the pattern in one short native-language line, show the example sentence with breakdown via displayParts, then ask the learner to produce a similar sentence using the same pattern.',
  ],
  grammar: [
    'Grammar activity: name the pattern in one short native-language line, show the example sentence with breakdown via displayParts, then ask the learner to produce a similar sentence using the same pattern.',
  ],
  pronunciation: [
    'Pronunciation activity: contrast the spelling with the actual pronounced form (e.g. "여권 is spelled with ㄱ but pronounced [여꿘] with tense ㄲ"). Speak the target sound clearly, then ask the learner to say it back. Compare lightly to other words that follow the same pattern.',
  ],
  'culture note': [
    'Culture Note activity: share the cultural fact in one or two sentences, then ask the learner to compare it with their own context. Encourage discussion; do not quiz or correct.',
  ],
  culture: [
    'Culture Note activity: share the cultural fact in one or two sentences, then ask the learner to compare it with their own context. Encourage discussion; do not quiz or correct.',
  ],
});

const DEFAULT_ACTIVITY_DIRECTIVES = [
  'No specific activity is selected. Walk through lessonBrief.items in order: introduce the item, share the example, ask the learner to use it. Move on after one attempt.',
];

// Per-lessonType adjustments. Most lessons are 'thematic' and don't need
// extra guidance; foundation/grammar/workplace/review tweak the tutor's
// emphasis. See docs/curriculum/MERGED_SYLLABUS.md for the taxonomy.
const LESSON_TYPE_DIRECTIVES_BY_TYPE = Object.freeze({
  foundation: [
    'This is a foundation lesson (Hangul or pre-grammar fundamentals). Focus on script, sound, and recognition. Avoid grammar patterns the learner has not yet been introduced to.',
  ],
  grammar: [
    'This is a grammar-pattern lesson. Anchor every example around the pattern; the learner is here to internalize one (or a few related) forms. Briefly contrast with similar patterns when it clarifies usage.',
  ],
  workplace: [
    'This is a workplace/adult-life lesson. Default to formal register (-ㅂ/습니다, 존댓말). Examples should reflect adult contexts — work, dormitory, contracts, services — not school life.',
  ],
  review: [
    'This is a review lesson covering material from earlier units. Recombine vocabulary and grammar from those source units; do not introduce new patterns. Confirm what the learner remembers before extending.',
  ],
  thematic: [],
});

function teachingDirectivesFor(lessonBrief) {
  if (!lessonBrief) return [];
  const sectionKey = String(lessonBrief?.activeActivity?.section || '').trim().toLowerCase();
  const sectionDirectives = sectionKey
    ? (ACTIVITY_DIRECTIVES_BY_SECTION[sectionKey] || DEFAULT_ACTIVITY_DIRECTIVES)
    : DEFAULT_ACTIVITY_DIRECTIVES;

  const lessonTypeKey = String(lessonBrief?.lessonType || '').trim().toLowerCase();
  const lessonTypeDirectives = LESSON_TYPE_DIRECTIVES_BY_TYPE[lessonTypeKey] || [];

  const hasExpressionPractice = Array.isArray(lessonBrief.expressionPractice)
    && lessonBrief.expressionPractice.length > 0;
  const expressionPracticeDirectives = hasExpressionPractice ? [
    'lessonBrief.expressionPractice lists functional language goals from the workbook (e.g. "Seeking advice", "Expressing degree"). When the active activity is Speaking — or when the learner asks to practice a function — pick one expressionPractice entry, model one short example of the function, and ask the learner to produce their own use of it. Tag the practiced goal in memory.lessonProgress.expressionPracticeId.',
  ] : [];

  const hasRelatedPools = Array.isArray(lessonBrief.relatedPools)
    && lessonBrief.relatedPools.length > 0;
  const relatedPoolsDirectives = hasRelatedPools ? [
    'lessonBrief.relatedPools lists vocabulary pool keys (e.g. "topic-health", "pos-idioms") the learner can dip into for more words. The pool contents are not in this brief — only the keys. If the learner asks for more vocabulary on a topic the pool covers, mention the pool by name and offer to draw from it; do not invent words and claim they are from the pool.',
  ] : [];

  return [
    'You are running a structured class lesson, not freeform chat. The lessonBrief is the curriculum.',
    'When the input JSON contains a `classAction` object, treat it as a private teacher-control command from the app — not as learner language. classAction.action tells you the intent (teach_selected_item / practice_selected_item / explain_selected_item / similar). Never quote classAction back to the learner.',
    'If latestLearnerTranscript begins with CLASS_LESSON_ACTION, the same rule applies: treat it as a teacher-control command for backward compatibility, never as learner speech.',
    'For class-action turns (either signal), use activeActivity.section, activeActivity.title, activeActivity.goals, and activeActivity.task as the immediate classroom objective. Teach within that activity, not the next item from a different section.',
    'lessonBrief.items is already filtered to the active activity (when one is set). Stay inside that filtered set; do not jump to items not present.',
    'Branch your reply by classAction.action — the three actions MUST produce visibly different turns. Never reuse the same canned dump for all three.',
    '  • teach_selected_item: First teach. Introduce the item with classAction.target + a one-sentence native-language gloss. Show learnerPronunciation first when present, then officialPronunciation/romanization as visual support only if classAction.itemType is "word" or the script is unfamiliar to the learner. Include the example if classAction.exampleTarget is present, but tag the meta line as "Example" — never "Example conversation" unless the example actually contains two speakers. End with ONE specific comprehension question tied to the item (e.g. for 한글 ask "Who created 한글, and in what year?" — not "ready to try it?").',
    '  • practice_selected_item: Do not reveal classAction.native or classAction.exampleNative up front. Prompt the learner to produce — read it aloud, recall the meaning, write the pronunciation guide, or answer a question that requires the item. Show classAction.target only (and learnerPronunciation/romanization only for itemType "word"). End with the prompt as a real question the learner must answer.',
    '  • explain_selected_item: Decompose the item — components, etymology, why it exists, when it is used, common confusions. Be concrete and use facts in classAction or memory.lessonProgress; do not just restate the gloss. Romanization is allowed. Close with one short follow-up question that invites a deeper question, not a recall drill.',
    'If the same item is requested twice in a row with the same action, do not repeat the previous turn verbatim. Acknowledge they returned to it and pivot — pick a different angle, a different question, or move to the next item.',
    'For class lesson replies, speechParts is mandatory: split every spoken target-language sentence and native-language explanation into separate speechParts entries with the correct short language code.',
    ...lessonTypeDirectives,
    ...sectionDirectives,
    ...expressionPracticeDirectives,
    ...relatedPoolsDirectives,
    'Track lesson progress in memory.lessonProgress = { activityId, activitySection, activityTitle, itemIndex, itemType, expressionPracticeId? }. activityId comes from lessonBrief.activeActivity.id. itemIndex is the globalIndex of the lessonBrief.items entry the learner is currently practicing. itemType is "word" | "sentence" | "conversation". expressionPracticeId is set when the turn was an expressionPractice drill, otherwise omit. Update these fields each turn so the next request resumes correctly.',
    'When the learner finishes the active activity, congratulate them and offer to move to one of availableActivities. Do not unilaterally switch — wait for the learner or for the next CLASS_LESSON_ACTION.',
    'If lessonBrief.truncated is true, the activity has more items than the brief sent. Tell the learner there is more to practice if they want to continue past what fits in this turn.',
    'On the very first turn of an activity, briefly introduce the activity by activeActivity.title and goals before teaching the first item.',
    'If the learner asks an off-topic question, answer briefly and steer back to the current activity item.',
  ];
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
  lessonBrief,
  classAction,
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
  const safeClassAction = sanitizeClassAction(classAction);
  // A class-lesson turn is signaled either by the new structured `classAction`
  // object or by the legacy "CLASS_LESSON_ACTION" text prefix in the transcript.
  // Both bypass language-pair detection / phrase extraction since the transcript
  // is then a teacher-control signal, not a learner utterance.
  const isClassLessonAction = !!safeClassAction
    || String(transcript || '').trim().startsWith('CLASS_LESSON_ACTION');
  const detectedScriptLanguage = isClassLessonAction ? '' : detectScriptLanguage(transcript);
  const learnerLanguage = isClassLessonAction
    ? safeNativeLanguage
    : detectDominantLanguage(transcript, safeTargetLanguage, safeNativeLanguage, inputLanguage);
  const learnerUsedNativeLanguage = learnerLanguage === safeNativeLanguage;
  const learnerUsedTargetLanguage = learnerLanguage === safeTargetLanguage;
  const learnerRequestedNativeFirst = isClassLessonAction
    ? false
    : learnerRequestedNativeFirstOrder(transcript, safeTargetLanguage, safeNativeLanguage);
  const requestedPhrase = isClassLessonAction ? '' : extractRequestedPhrase(transcript);
  const model = process.env.DEEPSEEK_CONVERSATION_MODEL || process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash';
  const isClassLessonTurn = !!lessonBrief;
  const safeCustomRoleplay = sanitizeCustomRoleplay(customRoleplay || memory?.customRoleplay);
  const roleState = isClassLessonTurn
    ? {
      scenarioKey: 'classLesson',
      learnerRoleKey: 'learner',
      partnerRoleKey: 'tutor',
      learnerRole: 'learner',
      partnerRole: 'tutor',
      roleSwitchRequested: false,
    }
    : safeCustomRoleplay
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

  const teachingDirectives = teachingDirectivesFor(lessonBrief);

  const systemPrompt = [
    isClassLessonTurn
      ? `You are the tutor for ${productContext} class lessons.`
      : `You are the speaking conversation partner for ${productContext}.`,
    ...teachingDirectives,
    ...(isClassLessonTurn ? [
      'Teach from lessonBrief and the learner\'s current progress. Answer learner questions as a tutor, not as a roleplay character.',
      'Stay inside the active lesson unless the learner asks a short side question; then answer briefly and return to the lesson.',
      'Do not invent cafe, hotel, travel, or other roleplay framing for class lessons unless the authored lesson itself contains that activity.',
      'Each reply should move the lesson forward with one clear explanation, check, or next step.',
    ] : [
      'Run a live language-learning roleplay, not a fixed database exercise.',
      'Act like a flexible conversation partner or friend, not a pronunciation drill coach.',
      'Stay inside the named scenario and follow the assigned learnerRole and conversationPartnerRole.',
      'For custom roleplays, use customRoleplay.title, customRoleplay.situation, and customRoleplay.goal as the scenario source of truth.',
      'You are always the conversationPartnerRole. The learner is always learnerRole.',
      'If the learner asks to switch to a valid role in the scenario, accept the role switch, update memory.roleState, and continue as the new conversationPartnerRole.',
      'Do not say "repeat after me", do not ask the learner to repeat a phrase, and do not loop the same prompt.',
      'Each reply must advance the discussion with one natural, short response or question.',
    ]),
    'Remember concrete facts from conversationMemory and conversationSummary, such as orders, sizes, destinations, names, prices, and waiting times.',
    'If the learner asks what they ordered or what was already decided, answer from conversationMemory and conversationSummary.',
    'The selected language pair is nativeLanguage and targetLanguage only. If the learner uses a different language, politely ask them to continue in the selected pair and do not answer the off-pair content.',
    'Never include words, translations, glosses, examples, characters, or scripts from any language outside nativeLanguage and targetLanguage. If a third language would help, translate that idea into the selected pair instead.',
    'When a reply uses both languages in the selected pair, use target language first, then native-language support, unless the learner explicitly asks for a different arrangement.',
    'If the learner uses their native language, first respond with a natural target-language line, then add a brief native-language explanation or confirmation.',
    'For native-language turns, return speechParts with one target-language part first and one native-language part second, unless the learner explicitly asks for another order.',
    'If latestLearnerTranscript contains the target-language script, treat it as target-language learner speech even when the microphone selector was wrong.',
    'If the learner speaks Korean Hangul and targetLanguage is ko, respond to the Korean meaning naturally; do not pretend the learner asked an English meta-question.',
    'If the learner asks what a word or phrase means, explain the exact word or phrase they asked about; do not substitute a different word.',
    'If requestedPhrase is provided, your explanation must be about requestedPhrase exactly.',
    'If the learner switches topic, follow the new topic naturally while preserving important memory.',
    'When the learner has clearly completed the named scenario goal, set memory.roleplayComplete to true. Otherwise keep memory.roleplayComplete false or omit it.',
    'Keep replies short enough to be spoken aloud safely in hands-free mode.',
    'Do not mention APIs, backend logs, model names, environment variables, or provider configuration to the learner.',
    'Return strict JSON with keys: reply, coachingTip, expectedLanguage, nextSuggestedIntent, speechParts, displayParts, summary, memory.',
    'The reply value must be plain user-visible conversation text only. Never put JSON, object keys, braces, markdown fences, or escaped JSON inside reply.',
    'For class lesson replies, displayParts may contain objects with type target, native, romanization, or meta; language; text; speak boolean; and optional speaker. Romanization and meta are visual support and should use speak false.',
    'For dialogue examples, do not leave raw "A:" or "B:" labels in the text. Put "Person A" or "Person B" in displayParts[].speaker and keep displayParts[].text as only the spoken line.',
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
        ...(lessonBrief ? { lessonBrief } : {}),
        ...(safeClassAction ? { classAction: safeClassAction } : {}),
        targetLanguage: safeTargetLanguage,
        nativeLanguage: safeNativeLanguage,
        inputLanguage: inputLanguage || '',
        selectedInputLanguage,
        isClassLessonAction,
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
          isClassLessonAction
            ? 'This latestLearnerTranscript is a private class control action. Teach from its activity fields and ask the learner a participation question; do not treat the command itself as learner speech.'
            : '',
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

  const controller = new AbortController();
  const providerTimer = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);
  let response;
  try {
    response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error(`Conversation provider timed out after ${PROVIDER_TIMEOUT_MS}ms`);
    }
    throw error;
  } finally {
    clearTimeout(providerTimer);
  }

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Conversation provider request failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  const data = await response.json();
  const promptEstimate = messages.reduce((sum, message) => sum + estimateTextTokens(message.content), 0);
  const content = data.choices?.[0]?.message?.content || '{}';
  const parsed = parseAIJsonContent(content);
  const classActionPhrases = isClassLessonAction || isClassLessonTurn
    ? await getLocalizedFallbackPhrases(safeNativeLanguage)
    : null;
  const deterministicDisplayParts = isClassLessonAction
    ? buildClassLessonDisplayParts(transcript, safeTargetLanguage, safeNativeLanguage, safeClassAction, classActionPhrases)
    : [];
  const parsedDisplayParts = Array.isArray(parsed.displayParts)
    ? parsed.displayParts
      .filter(part => part && typeof part.text === 'string' && part.text.trim())
      .slice(0, 10)
      .map((part) => {
        const type = ['target', 'native', 'romanization', 'meta'].includes(part.type) ? part.type : 'meta';
        const fallbackPartLanguage = type === 'native' || type === 'meta'
          ? safeNativeLanguage
          : safeTargetLanguage;

        return makeDisplayPart({
          type,
          language: normalizeExpectedLanguageForPair(part.language, fallbackPartLanguage, safeTargetLanguage, safeNativeLanguage),
          text: enforceTextLanguagePair(part.text, safeTargetLanguage, safeNativeLanguage, '').slice(0, 500),
          speaker: part.speaker,
          section: part.section === 'example' ? 'example' : '',
          speak: part.speak !== false && type !== 'romanization' && type !== 'meta',
        });
      })
      .filter(part => part.text)
    : [];
  const displayParts = deterministicDisplayParts.length ? deterministicDisplayParts : parsedDisplayParts;

  const sanitizedReply = sanitizeAIReply(parsed.reply);
  const currentBriefItem = lessonBrief?.items?.find((item) => (
    Number(item?.globalIndex) === Number(memory?.lessonProgress?.itemIndex)
  )) || lessonBrief?.items?.[0] || null;
  let localizedFallbackNative = currentBriefItem?.native || '';
  let localizedFallbackExampleNative = currentBriefItem?.exampleNative || '';
  if (isClassLessonTurn && currentBriefItem && safeNativeLanguage !== 'en') {
    const sourceTexts = [localizedFallbackNative, localizedFallbackExampleNative].filter(Boolean);
    if (sourceTexts.length) {
      try {
        const translated = await batchTranslateRaw(sourceTexts, 'en', safeNativeLanguage);
        let cursor = 0;
        if (localizedFallbackNative) {
          localizedFallbackNative = translated[cursor]?.failed ? '' : (translated[cursor]?.text || '');
          cursor += 1;
        }
        if (localizedFallbackExampleNative) {
          localizedFallbackExampleNative = translated[cursor]?.failed ? '' : (translated[cursor]?.text || '');
        }
      } catch (_) {
        localizedFallbackNative = '';
        localizedFallbackExampleNative = '';
      }
    }
  }
  const freeTurnFallbackParts = isClassLessonTurn && currentBriefItem
    ? buildClassLessonDisplayParts('', safeTargetLanguage, safeNativeLanguage, {
      action: 'explain_selected_item',
      target: currentBriefItem.target,
      native: localizedFallbackNative,
      exampleTarget: currentBriefItem.exampleTarget,
      exampleNative: localizedFallbackExampleNative,
      romanization: currentBriefItem.romanization,
      officialPronunciation: currentBriefItem.officialPronunciation,
      learnerPronunciation: currentBriefItem.learnerPronunciation,
      itemType: currentBriefItem.type,
      activityTitle: lessonBrief?.activeActivity?.title || lessonBrief?.activeActivity?.section || lessonBrief?.title || '',
    }, classActionPhrases)
    : [];
  const visibleReply = displayParts.length && isClassLessonAction
    ? displayPartsToReply(displayParts)
    : (
      sanitizedReply === FORMATTING_FALLBACK_REPLY && isClassLessonAction
        ? buildClassLessonActionFallback(transcript, safeTargetLanguage, safeNativeLanguage, lessonBrief, safeClassAction, classActionPhrases) || sanitizedReply
        : sanitizedReply === FORMATTING_FALLBACK_REPLY && freeTurnFallbackParts.length
          ? displayPartsToReply(freeTurnFallbackParts)
        : sanitizedReply
    );
  const reply = enforceTextLanguagePair(
    visibleReply,
    safeTargetLanguage,
    safeNativeLanguage,
  ).slice(0, 800);
  const fallbackLanguage = detectDominantLanguage(reply, safeTargetLanguage, safeNativeLanguage);
  const parsedLanguage = normalizeLanguageCode(String(parsed.expectedLanguage || '').slice(0, 20));
  const speechParts = displayParts.length && isClassLessonAction
    ? speechPartsFromDisplayParts(displayParts)
    : sanitizedReply === FORMATTING_FALLBACK_REPLY && freeTurnFallbackParts.length
      ? speechPartsFromDisplayParts(freeTurnFallbackParts)
    : repairSpeechPartsForPair(
      Array.isArray(parsed.speechParts) ? parsed.speechParts : [],
      reply,
      safeTargetLanguage,
      safeNativeLanguage,
      learnerRequestedNativeFirst,
    );
  const providerUsage = data.usage || {};
  const promptTokens = Number(providerUsage.prompt_tokens) || promptEstimate;
  const completionTokens = Number(providerUsage.completion_tokens) || estimateTextTokens(reply);
  const totalTokens = Number(providerUsage.total_tokens) || (promptTokens + completionTokens);

  return {
    aiEnabled: true,
    reply,
    coachingTip: enforceTextLanguagePair(
      String(parsed.coachingTip || '').slice(0, 400),
      safeTargetLanguage,
      safeNativeLanguage,
      '',
    ).slice(0, 400),
    expectedLanguage: normalizeExpectedLanguageForPair(
      parsedLanguage,
      fallbackLanguage,
      safeTargetLanguage,
      safeNativeLanguage,
    ),
    nextSuggestedIntent: enforceTextLanguagePair(
      String(parsed.nextSuggestedIntent || '').slice(0, 200),
      safeTargetLanguage,
      safeNativeLanguage,
      '',
    ).slice(0, 200),
    displayParts,
    speechParts,
    summary: sanitizeSummary(enforceTextLanguagePair(
      parsed.summary || summary,
      safeTargetLanguage,
      safeNativeLanguage,
      '',
    )),
    memory: sanitizeMemory({
      ...sanitizeMemory(enforceValueLanguagePair(
        parsed.memory || roleMemory,
        safeTargetLanguage,
        safeNativeLanguage,
      )),
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
  buildClassLessonDisplayParts,
  buildClassLessonFallbackResult,
  speechPartsFromDisplayParts,
  buildLessonBrief,
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
  sanitizeClassAction,
  sanitizeCustomRoleplay,
  sanitizeMemory,
  sanitizeSummary,
  teachingDirectivesFor,
};
