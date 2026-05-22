const { SUPPORTED_LANGUAGES } = require('../config/languages');
const { loadTargetCurriculum } = require('./loadTargetCurriculum');
const { inferLearningArchitecture } = require('./learningArchitecture');

const MAX_CURRICULUM_FLASHCARDS_PER_LANGUAGE = 900;
const MAX_PRACTICE_ITEMS_PER_LESSON = 32;

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeLang(code) {
  const value = String(code || '').trim().toLowerCase();
  const aliases = { kr: 'ko', cn: 'zh', jp: 'ja', iw: 'he', in: 'id', tl: 'fil' };
  return aliases[value] || aliases[value.split(/[-_]/)[0]] || value;
}

function languageField(code) {
  const lang = normalizeLang(code);
  if (lang === 'ko') return 'korean';
  if (lang === 'en') return 'english';
  return lang;
}

function categoryList(value) {
  if (Array.isArray(value)) return value.map(cleanText).filter(Boolean);
  const text = cleanText(value);
  return text ? [text] : [];
}

function keyFor(text) {
  return cleanText(text).toLowerCase();
}

function slugFor(text) {
  const ascii = keyFor(text)
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 72);
  if (ascii) return ascii;
  const raw = keyFor(text);
  return raw ? `u_${Buffer.from(raw, 'utf8').toString('hex').slice(0, 72)}` : 'item';
}

function uniqueValues(values) {
  const seen = new Set();
  const result = [];
  values.forEach((value) => {
    const text = cleanText(value);
    if (!text) return;
    const key = keyFor(text);
    if (seen.has(key)) return;
    seen.add(key);
    result.push(text);
  });
  return result;
}

function uniqueNumbers(values) {
  return Array.from(new Set(values.map(Number).filter(value => [1, 2, 3, 4].includes(value)))).sort((a, b) => a - b);
}

function mergeObjects(first = {}, second = {}) {
  return {
    ...(first && typeof first === 'object' && !Array.isArray(first) ? first : {}),
    ...(second && typeof second === 'object' && !Array.isArray(second) ? second : {}),
  };
}

function cardTargetText(card) {
  return cleanText(card.korean || card[languageField(card.targetLang)] || '');
}

function cardMeaningText(card) {
  return cleanText(card.conceptGloss || card.english || card.nativeText || '');
}

function cardSense(card) {
  return {
    senseId: card.senseId,
    meaning: cardMeaningText(card),
    learningLevel: card.learningLevel,
    levelTrack: card.levelTrack,
    lessonRole: card.lessonRole,
    branchType: card.branchType,
    lessonWeight: card.lessonWeight,
    checkpointType: card.checkpointType,
    repairFocus: card.repairFocus,
    manifestSource: card.manifestSource,
    programLevelNameKey: card.programLevelNameKey,
    programLevelDescriptionKey: card.programLevelDescriptionKey,
    unitOrder: card.unitOrder,
    sequenceOrder: card.sequenceOrder,
    skillFocus: card.skillFocus,
    sourceClassLessonKey: card.sourceClassLessonKey || card.usage?.lessonKey || '',
    objective: card.objective || card.usage?.lessonTitle || '',
  };
}

function ensureCardLearningIdentity(card) {
  if (!card) return card;
  const lang = normalizeLang(card.targetLang);
  const target = cardTargetText(card);
  const meaning = cardMeaningText(card);
  const level = Number(card.learningLevel || card.usage?.learningLevel || 2);
  const sourceKey = cleanText(card.sourceClassLessonKey || card.usage?.lessonKey || '');
  const lessonRole = cleanText(card.lessonRole || card.usage?.lessonRole || 'core');
  const branchType = cleanText(card.branchType || card.usage?.branchType || 'general');
  const lessonWeight = Number(card.lessonWeight || card.usage?.lessonWeight || 2);
  const checkpointType = cleanText(card.checkpointType || card.usage?.checkpointType || (lessonRole === 'checkpoint' ? 'level-check' : ''));
  const repairFocus = Array.isArray(card.repairFocus) && card.repairFocus.length
    ? card.repairFocus
    : (Array.isArray(card.usage?.repairFocus) ? card.usage.repairFocus : []);
  const longActivityTypes = Array.isArray(card.longActivityTypes) && card.longActivityTypes.length
    ? card.longActivityTypes
    : (Array.isArray(card.usage?.longActivityTypes) ? card.usage.longActivityTypes : []);
  const manifestSource = cleanText(card.manifestSource || card.usage?.manifestSource || 'four-level-curriculum-plan');
  const programLevelNameKey = cleanText(card.programLevelNameKey || card.usage?.programLevelNameKey || `classList.programLevels.level${level}.title`);
  const programLevelDescriptionKey = cleanText(card.programLevelDescriptionKey || card.usage?.programLevelDescriptionKey || `classList.programLevels.level${level}.description`);
  const unitOrder = Number(card.unitOrder || card.usage?.unitOrder || level);
  const sequenceOrder = Number(card.sequenceOrder || card.usage?.sequenceOrder || ((level * 1000) + unitOrder));
  const skillFocus = Array.isArray(card.skillFocus) && card.skillFocus.length
    ? card.skillFocus
    : (Array.isArray(card.usage?.skillFocus) ? card.usage.skillFocus : []);
  const conceptId = cleanText(card.conceptId) || `lexeme.${lang}.${slugFor(target)}`;
  const senseId = cleanText(card.senseId) || `${conceptId}.sense.${slugFor(meaning || target)}`;
  const activeLevels = uniqueNumbers([...(card.activeLevels || []), level]);
  const firstIntroducedLevel = Number(card.firstIntroducedLevel || activeLevels[0] || level || 2);
  const sourceClassLessonKeys = uniqueValues([
    ...(Array.isArray(card.sourceClassLessonKeys) ? card.sourceClassLessonKeys : []),
    sourceKey,
  ]);
  const levelUses = mergeObjects(card.levelUses, {
    [level]: {
      meaning,
      objective: card.objective || card.usage?.lessonTitle || '',
      sourceClassLessonKey: sourceKey,
      levelTrack: card.levelTrack || card.usage?.levelTrack || '',
      lessonRole,
      branchType,
      lessonWeight,
      checkpointType,
      repairFocus,
      longActivityTypes,
      manifestSource,
      programLevelNameKey,
      programLevelDescriptionKey,
      unitOrder,
      sequenceOrder,
      skillFocus,
    },
  });

  card.conceptId = conceptId;
  card.senseId = senseId;
  card.firstIntroducedLevel = [1, 2, 3, 4].includes(firstIntroducedLevel) ? firstIntroducedLevel : level;
  card.activeLevels = activeLevels.length ? activeLevels : [level];
  card.sourceClassLessonKeys = sourceClassLessonKeys;
  card.levelUses = levelUses;
  card.lessonRole = lessonRole;
  card.branchType = branchType;
  card.lessonWeight = [1, 2, 3].includes(lessonWeight) ? lessonWeight : 2;
  card.checkpointType = checkpointType;
  card.repairFocus = repairFocus;
  card.longActivityTypes = longActivityTypes;
  card.coreRequired = card.coreRequired != null ? card.coreRequired : (lessonRole === 'core' || lessonRole === 'checkpoint');
  card.requiredForProgress = card.requiredForProgress != null ? card.requiredForProgress : card.coreRequired;
  card.certificateEligible = card.certificateEligible != null ? card.certificateEligible : card.coreRequired;
  card.manifestSource = manifestSource;
  card.programLevelNameKey = programLevelNameKey;
  card.programLevelDescriptionKey = programLevelDescriptionKey;
  card.unitOrder = Number.isFinite(unitOrder) ? unitOrder : level;
  card.sequenceOrder = Number.isFinite(sequenceOrder) ? sequenceOrder : ((level * 1000) + card.unitOrder);
  card.skillFocus = skillFocus;
  card.prerequisiteConcepts = Array.isArray(card.prerequisiteConcepts) ? card.prerequisiteConcepts : [];
  card.teachesConcepts = Array.isArray(card.teachesConcepts) ? card.teachesConcepts : [];
  card.reviewsConcepts = Array.isArray(card.reviewsConcepts) ? card.reviewsConcepts : [];
  card.usage = {
    ...(card.usage && typeof card.usage === 'object' && !Array.isArray(card.usage) ? card.usage : {}),
    conceptId,
    senseId,
    firstIntroducedLevel: card.firstIntroducedLevel,
    activeLevels: card.activeLevels,
    levelUses,
    lessonRole: card.lessonRole,
    branchType: card.branchType,
    lessonWeight: card.lessonWeight,
    checkpointType: card.checkpointType,
    repairFocus: card.repairFocus,
    longActivityTypes: card.longActivityTypes,
    manifestSource: card.manifestSource,
    programLevelNameKey: card.programLevelNameKey,
    programLevelDescriptionKey: card.programLevelDescriptionKey,
    unitOrder: card.unitOrder,
    sequenceOrder: card.sequenceOrder,
    skillFocus: card.skillFocus,
    prerequisiteConcepts: card.prerequisiteConcepts,
    teachesConcepts: card.teachesConcepts,
    reviewsConcepts: card.reviewsConcepts,
  };
  return card;
}

function authoredCard(targetLang, target, gloss, category, usage = {}, pronunciation = '') {
  const lang = normalizeLang(targetLang);
  const learning = inferLearningArchitecture({
    curriculumKey: usage.sourceClassLessonKey || 'level1Foundation',
    lessonType: usage.learningLevel && usage.learningLevel > 1 ? 'thematic' : 'foundation',
    difficulty: usage.learningLevel && usage.learningLevel > 2 ? 'intermediate' : 'beginner',
    title: usage.objective || cleanText(categoryList(category).join(' ')),
    content: [{ type: categoryList(category).includes('grammar') ? 'sentence' : 'word' }],
  });
  const targetText = cleanText(target);
  const english = cleanText(gloss);
  const field = languageField(lang);
  const sourceClassLessonKey = usage.sourceClassLessonKey || 'level1Foundation';
  const card = {
    korean: targetText,
    english,
    romanization: cleanText(pronunciation),
    officialPronunciation: cleanText(pronunciation),
    officialPronunciationSource: cleanText(pronunciation) ? 'target-authored' : '',
    category: categoryList(category),
    targetLang: lang,
    conceptGloss: english,
    learningLevel: usage.learningLevel || learning.level,
    levelTrack: usage.levelTrack || learning.levelTrack,
    supportLevel: usage.supportLevel || learning.supportLevel,
    skillStrands: usage.skillStrands || learning.skillStrands,
    lessonRole: usage.lessonRole || learning.lessonRole,
    coreRequired: usage.coreRequired != null ? usage.coreRequired : learning.coreRequired,
    requiredForProgress: usage.requiredForProgress != null ? usage.requiredForProgress : learning.requiredForProgress,
    certificateEligible: usage.certificateEligible != null ? usage.certificateEligible : learning.certificateEligible,
    branchType: usage.branchType || learning.branchType,
    lessonWeight: usage.lessonWeight || learning.lessonWeight,
    checkpointType: usage.checkpointType || learning.checkpointType,
    repairFocus: usage.repairFocus || learning.repairFocus,
    longActivityTypes: usage.longActivityTypes || learning.longActivityTypes,
    manifestSource: usage.manifestSource || learning.manifestSource,
    programLevelNameKey: usage.programLevelNameKey || learning.programLevelNameKey,
    programLevelDescriptionKey: usage.programLevelDescriptionKey || learning.programLevelDescriptionKey,
    unitOrder: usage.unitOrder || learning.unitOrder,
    sequenceOrder: usage.sequenceOrder || learning.sequenceOrder,
    skillFocus: usage.skillFocus || learning.skillFocus,
    prerequisiteConcepts: usage.prerequisiteConcepts || learning.prerequisiteConcepts,
    teachesConcepts: usage.teachesConcepts || learning.teachesConcepts,
    reviewsConcepts: usage.reviewsConcepts || learning.reviewsConcepts,
    objective: usage.objective || english,
    sourceClassLessonKey,
    usage: {
      source: 'target-profile',
      targetAuthored: true,
      sourceClassLessonKey,
      lessonRole: usage.lessonRole || learning.lessonRole,
      branchType: usage.branchType || learning.branchType,
      lessonWeight: usage.lessonWeight || learning.lessonWeight,
      checkpointType: usage.checkpointType || learning.checkpointType,
      repairFocus: usage.repairFocus || learning.repairFocus,
      longActivityTypes: usage.longActivityTypes || learning.longActivityTypes,
      manifestSource: usage.manifestSource || learning.manifestSource,
      programLevelNameKey: usage.programLevelNameKey || learning.programLevelNameKey,
      programLevelDescriptionKey: usage.programLevelDescriptionKey || learning.programLevelDescriptionKey,
      unitOrder: usage.unitOrder || learning.unitOrder,
      sequenceOrder: usage.sequenceOrder || learning.sequenceOrder,
      skillFocus: usage.skillFocus || learning.skillFocus,
      prerequisiteConcepts: usage.prerequisiteConcepts || learning.prerequisiteConcepts,
      teachesConcepts: usage.teachesConcepts || learning.teachesConcepts,
      reviewsConcepts: usage.reviewsConcepts || learning.reviewsConcepts,
      ...(cleanText(pronunciation) ? { pronunciationSource: 'target-authored' } : {}),
      ...usage,
    },
  };
  card[field] = targetText;
  return ensureCardLearningIdentity(card);
}

const TARGET_TEACHING_PROFILES = {
  en: {
    cards: [
      authoredCard('en', 'a / an / the', 'English articles show whether something is new, general, or already known.', ['grammar', 'articles'], { teachingFocus: 'articles' }),
      authoredCard('en', 'I am / you are / she is', 'The verb “be” changes by person and is essential for descriptions and identity.', ['grammar', 'be-verb'], { teachingFocus: 'be-verb' }),
      authoredCard('en', 'do / does / did', 'English often uses “do” to form questions and negatives, even when it does not translate as a separate meaning.', ['grammar', 'questions'], { teachingFocus: 'do-support' }),
      authoredCard('en', 'I would like...', 'A polite request frame for ordering, asking, and service situations.', ['service', 'politeness'], { teachingFocus: 'polite-request' }),
      authoredCard('en', 'since / for', 'Use “since” with a starting point and “for” with a length of time.', ['grammar', 'time'], { teachingFocus: 'time-contrast' }),
      authoredCard('en', 'look up / turn on / give back', 'Phrasal verbs combine a verb and particle; the full phrase often carries a new meaning.', ['grammar', 'phrasal-verbs'], { teachingFocus: 'phrasal-verbs' }),
    ],
  },
  ko: {
    cards: [
      authoredCard('ko', '안녕하세요', 'A safe polite greeting for most first meetings and service situations.', ['greetings', 'politeness'], { teachingFocus: 'polite-greeting' }, 'annyeonghaseyo'),
      authoredCard('ko', '은 / 는', 'Topic particles mark what the sentence is mainly about and often contrast with something else.', ['grammar', 'particles'], { teachingFocus: 'topic-particle' }, 'eun / neun'),
      authoredCard('ko', '이 / 가', 'Subject particles mark the new or focused subject of a clause.', ['grammar', 'particles'], { teachingFocus: 'subject-particle' }, 'i / ga'),
      authoredCard('ko', '을 / 를', 'Object particles mark what receives the action of the verb.', ['grammar', 'particles'], { teachingFocus: 'object-particle' }, 'eul / reul'),
      authoredCard('ko', '주세요', 'Attach this to ask for something or request an action politely.', ['service', 'requests'], { teachingFocus: 'polite-request' }, 'juseyo'),
      authoredCard('ko', '했어요 / 해요 / 할 거예요', 'Korean tense is usually carried by the verb ending, not by a separate helper word.', ['grammar', 'tense'], { teachingFocus: 'verb-endings' }, 'haesseoyo / haeyo / hal geoyeyo'),
    ],
  },
  de: {
    cards: [
      authoredCard('de', 'der / die / das', 'German nouns are learned with gendered articles; the article is part of the word knowledge.', ['grammar', 'articles'], { teachingFocus: 'noun-gender' }),
      authoredCard('de', 'ein / eine / einen', 'Indefinite articles change with gender and case, so small endings carry sentence roles.', ['grammar', 'cases'], { teachingFocus: 'case-endings' }),
      authoredCard('de', 'du / Sie', 'German separates familiar “du” from formal “Sie”; choosing the wrong one can sound socially off.', ['greetings', 'register'], { teachingFocus: 'formal-informal' }),
      authoredCard('de', 'nicht / kein', 'Use “nicht” to negate actions or adjectives and “kein” to negate nouns without an article.', ['grammar', 'negation'], { teachingFocus: 'negation-contrast' }),
      authoredCard('de', 'Ich stehe früh auf.', 'Separable-prefix verbs split in main clauses: the prefix often moves to the end.', ['grammar', 'verbs'], { teachingFocus: 'separable-verbs' }),
      authoredCard('de', 'weil ich Zeit habe', 'After “weil”, the conjugated verb moves to the end of the clause.', ['grammar', 'word-order'], { teachingFocus: 'verb-final' }),
      authoredCard('de', 'schon / schön', 'Umlauts can change meaning completely; vowel quality matters in German.', ['pronunciation', 'umlauts'], { teachingFocus: 'umlaut-contrast' }),
    ],
  },
  es: {
    cards: [
      authoredCard('es', 'el / la', 'Spanish nouns have grammatical gender, and the article usually travels with the noun.', ['grammar', 'articles'], { teachingFocus: 'noun-gender' }),
      authoredCard('es', 'ser / estar', 'Both can mean “to be,” but “ser” identifies and “estar” locates or describes states.', ['grammar', 'verbs'], { teachingFocus: 'ser-estar' }),
      authoredCard('es', 'tú / usted', 'Spanish marks informal and formal “you,” so social distance affects verb choice.', ['greetings', 'register'], { teachingFocus: 'formal-informal' }),
      authoredCard('es', '¿Dónde está...?', 'Spanish uses an opening question mark and places stress on the question word.', ['questions', 'punctuation'], { teachingFocus: 'question-form' }),
      authoredCard('es', 'quiero / quisiera', '“Quisiera” softens a request compared with direct “quiero.”', ['service', 'politeness'], { teachingFocus: 'polite-request' }),
      authoredCard('es', 'hablo / hablas / habla', 'Spanish verb endings show the person, so subject pronouns can often be omitted.', ['grammar', 'conjugation'], { teachingFocus: 'verb-endings' }),
    ],
  },
  fr: {
    cards: [
      authoredCard('fr', 'le / la / les', 'French articles mark gender and number, and they are part of how nouns are learned.', ['grammar', 'articles'], { teachingFocus: 'noun-gender' }),
      authoredCard('fr', 'tu / vous', 'French separates familiar and formal or plural “you”; the choice changes the verb form.', ['greetings', 'register'], { teachingFocus: 'formal-informal' }),
      authoredCard('fr', 'je voudrais...', 'A useful polite request frame for cafés, shops, and help desks.', ['service', 'politeness'], { teachingFocus: 'polite-request' }),
      authoredCard('fr', 'ne ... pas', 'French negation wraps around the verb in formal writing, even when speech often reduces it.', ['grammar', 'negation'], { teachingFocus: 'negation-frame' }),
      authoredCard('fr', 'un ami / une amie', 'Some final letters are silent but still show gender or spelling differences.', ['pronunciation', 'spelling'], { teachingFocus: 'silent-letters' }),
      authoredCard('fr', 'vous avez', 'Liaison can connect words in speech, so word boundaries may sound different from writing.', ['pronunciation', 'liaison'], { teachingFocus: 'liaison' }),
    ],
  },
  zh: {
    cards: [
      authoredCard('zh', '你好', 'A basic greeting; learn it together with tones, not as flat syllables.', ['greetings', 'tones'], { teachingFocus: 'tone-aware-greeting' }, 'nǐ hǎo'),
      authoredCard('zh', '吗', 'A question particle placed at the end of a statement to make a yes/no question.', ['grammar', 'particles'], { teachingFocus: 'question-particle' }, 'ma'),
      authoredCard('zh', '个', 'A very common measure word used between numbers and many nouns.', ['grammar', 'measure-words'], { teachingFocus: 'measure-word' }, 'gè'),
      authoredCard('zh', '了', 'A particle often used to mark a changed or completed situation.', ['grammar', 'particles'], { teachingFocus: 'aspect-particle' }, 'le'),
      authoredCard('zh', '妈妈 / 麻 / 马 / 骂', 'The same syllable with different tones can make completely different words.', ['pronunciation', 'tones'], { teachingFocus: 'tone-contrast' }, 'mā / má / mǎ / mà'),
      authoredCard('zh', '我想要...', 'A practical request frame for saying what you would like.', ['service', 'requests'], { teachingFocus: 'request-frame' }, 'wǒ xiǎng yào'),
    ],
  },
  ja: {
    cards: [
      authoredCard('ja', 'こんにちは', 'A standard daytime greeting; pronunciation follows the fixed greeting, not each kana literally.', ['greetings', 'pronunciation'], { teachingFocus: 'fixed-greeting' }, 'konnichiwa'),
      authoredCard('ja', 'は / が', 'Particles mark topic and subject; the contrast affects what information is being highlighted.', ['grammar', 'particles'], { teachingFocus: 'topic-subject' }, 'wa / ga'),
      authoredCard('ja', 'を', 'This particle marks the direct object and is pronounced “o.”', ['grammar', 'particles'], { teachingFocus: 'object-particle' }, 'o'),
      authoredCard('ja', 'です / ます', 'Polite endings help the sentence fit everyday respectful speech.', ['grammar', 'politeness'], { teachingFocus: 'polite-ending' }, 'desu / masu'),
      authoredCard('ja', 'ありません', 'A polite negative form; Japanese often expresses negation through the ending.', ['grammar', 'negation'], { teachingFocus: 'negative-ending' }, 'arimasen'),
      authoredCard('ja', '一つ / 二つ / 三つ', 'Counters change with what is being counted; general counters are only the beginning.', ['grammar', 'counters'], { teachingFocus: 'counters' }, 'hitotsu / futatsu / mittsu'),
    ],
  },
  hi: {
    cards: [
      authoredCard('hi', 'नमस्ते', 'A respectful greeting used widely across situations.', ['greetings', 'politeness'], { teachingFocus: 'polite-greeting' }, 'namaste'),
      authoredCard('hi', 'आप / तुम', 'Hindi separates respectful and familiar “you”; verb forms change with the choice.', ['greetings', 'register'], { teachingFocus: 'formal-informal' }, 'aap / tum'),
      authoredCard('hi', 'है / हैं', 'Forms of “to be” agree with number and respect level.', ['grammar', 'be-verb'], { teachingFocus: 'agreement' }, 'hai / hain'),
      authoredCard('hi', 'मुझे चाहिए', 'A useful frame for “I need/want” in everyday requests.', ['service', 'requests'], { teachingFocus: 'request-frame' }, 'mujhe chaahiye'),
      authoredCard('hi', 'में / से / को', 'Postpositions come after nouns and carry relationships such as in, from, and to.', ['grammar', 'postpositions'], { teachingFocus: 'postpositions' }, 'mein / se / ko'),
      authoredCard('hi', 'लड़का / लड़की', 'Noun gender matters because adjectives and verbs can agree with it.', ['grammar', 'gender'], { teachingFocus: 'gender-agreement' }, 'ladka / ladki'),
    ],
  },
  ar: {
    cards: [
      authoredCard('ar', 'مرحبا', 'A common greeting; Arabic script is read from right to left.', ['greetings', 'script'], { teachingFocus: 'rtl-script' }, 'marhaban'),
      authoredCard('ar', 'الـ', 'The definite article attaches to nouns and changes naturally with sun letters in speech.', ['grammar', 'articles'], { teachingFocus: 'definite-article' }, 'al'),
      authoredCard('ar', 'أنا / أنتَ / أنتِ', 'Arabic distinguishes speaker and listener forms, including masculine and feminine “you.”', ['grammar', 'pronouns'], { teachingFocus: 'gendered-you' }, 'ana / anta / anti'),
      authoredCard('ar', 'أريد...', 'A direct frame for saying “I want...” in service and travel situations.', ['service', 'requests'], { teachingFocus: 'request-frame' }, 'uriid'),
      authoredCard('ar', 'كتاب / كُتُب', 'Arabic plurals may change inside the word, not only by adding an ending.', ['grammar', 'plural'], { teachingFocus: 'broken-plural' }, 'kitaab / kutub'),
      authoredCard('ar', 'كتب', 'Roots connect families of meaning; the same consonants can support related words.', ['grammar', 'roots'], { teachingFocus: 'root-pattern' }, 'k-t-b'),
    ],
  },
  he: {
    cards: [
      authoredCard('he', 'שלום', 'A core greeting and farewell; Hebrew is read from right to left.', ['greetings', 'script'], { teachingFocus: 'rtl-script' }, 'shalom'),
      authoredCard('he', 'אני / אתה / את', 'Hebrew marks masculine and feminine forms for “you.”', ['grammar', 'pronouns'], { teachingFocus: 'gendered-you' }, 'ani / ata / at'),
      authoredCard('he', 'ה־', 'The definite article attaches to the noun as a prefix.', ['grammar', 'articles'], { teachingFocus: 'definite-article' }, 'ha'),
      authoredCard('he', 'אני רוצה...', 'A practical frame for saying what you want.', ['service', 'requests'], { teachingFocus: 'request-frame' }, 'ani rotze'),
      authoredCard('he', 'ספר / ספרים', 'Many masculine plurals use “-im,” but learners should still learn nouns with patterns.', ['grammar', 'plural'], { teachingFocus: 'plural-pattern' }, 'sefer / sfarim'),
      authoredCard('he', 'כתב', 'Hebrew roots organize related meanings across verbs and nouns.', ['grammar', 'roots'], { teachingFocus: 'root-pattern' }, 'k-t-v'),
    ],
  },
  pt: {
    cards: [
      authoredCard('pt', 'o / a', 'Portuguese nouns have gender, and articles help you learn it from the start.', ['grammar', 'articles'], { teachingFocus: 'noun-gender' }),
      authoredCard('pt', 'ser / estar', 'Both can mean “to be,” but identity and temporary state are usually separated.', ['grammar', 'verbs'], { teachingFocus: 'ser-estar' }),
      authoredCard('pt', 'você / tu', 'Portuguese address forms vary by region and relationship.', ['greetings', 'register'], { teachingFocus: 'address-forms' }),
      authoredCard('pt', 'eu gostaria de...', 'A polite frame for requesting something.', ['service', 'politeness'], { teachingFocus: 'polite-request' }),
      authoredCard('pt', 'ão / õe', 'Nasal vowels and diphthongs are a major Portuguese sound feature.', ['pronunciation', 'nasal-vowels'], { teachingFocus: 'nasal-vowels' }),
      authoredCard('pt', 'falo / fala / falamos', 'Verb endings carry person and number information.', ['grammar', 'conjugation'], { teachingFocus: 'verb-endings' }),
    ],
  },
  it: {
    cards: [
      authoredCard('it', 'il / la / lo', 'Italian articles change with gender and with the sound that starts the noun.', ['grammar', 'articles'], { teachingFocus: 'articles' }),
      authoredCard('it', 'essere / stare', 'Italian separates identity/existence from state or position in common patterns.', ['grammar', 'verbs'], { teachingFocus: 'be-verbs' }),
      authoredCard('it', 'tu / Lei', 'Italian distinguishes familiar and formal “you.”', ['greetings', 'register'], { teachingFocus: 'formal-informal' }),
      authoredCard('it', 'vorrei...', 'A polite and natural way to say “I would like...” when ordering or asking.', ['service', 'politeness'], { teachingFocus: 'polite-request' }),
      authoredCard('it', 'parlo / parli / parla', 'Italian verb endings show who is doing the action.', ['grammar', 'conjugation'], { teachingFocus: 'verb-endings' }),
      authoredCard('it', 'casa / cosa', 'Clear vowels matter because small sound differences can change common words.', ['pronunciation', 'vowels'], { teachingFocus: 'vowel-contrast' }),
    ],
  },
  nl: {
    cards: [
      authoredCard('nl', 'de / het', 'Dutch nouns are learned with their article because gender affects later grammar.', ['grammar', 'articles'], { teachingFocus: 'noun-gender' }),
      authoredCard('nl', 'jij / u', 'Dutch separates familiar and polite “you.”', ['greetings', 'register'], { teachingFocus: 'formal-informal' }),
      authoredCard('nl', 'ik wil graag...', 'A useful polite frame for saying what you would like.', ['service', 'requests'], { teachingFocus: 'request-frame' }),
      authoredCard('nl', 'niet / geen', 'Dutch uses different negation patterns depending on what is being negated.', ['grammar', 'negation'], { teachingFocus: 'negation-contrast' }),
      authoredCard('nl', 'Ik sta vroeg op.', 'Separable verbs can send part of the verb to the end.', ['grammar', 'verbs'], { teachingFocus: 'separable-verbs' }),
      authoredCard('nl', 'graag', 'This small word makes requests and preferences sound more natural.', ['usage', 'politeness'], { teachingFocus: 'naturalness-marker' }),
    ],
  },
  ru: {
    cards: [
      authoredCard('ru', 'Привет / Здравствуйте', 'Russian separates casual and formal greetings clearly.', ['greetings', 'register'], { teachingFocus: 'formal-informal' }, 'privet / zdravstvuyte'),
      authoredCard('ru', 'я / ты / вы', 'Russian distinguishes familiar and formal or plural “you.”', ['grammar', 'pronouns'], { teachingFocus: 'formal-informal' }, 'ya / ty / vy'),
      authoredCard('ru', 'стол / стола / столу', 'Case endings show a noun’s role in the sentence.', ['grammar', 'cases'], { teachingFocus: 'case-endings' }, 'stol / stola / stolu'),
      authoredCard('ru', 'я хочу...', 'A common frame for saying what you want.', ['service', 'requests'], { teachingFocus: 'request-frame' }, 'ya khochu'),
      authoredCard('ru', 'читать / прочитать', 'Aspect helps distinguish ongoing or repeated action from completed action.', ['grammar', 'aspect'], { teachingFocus: 'verb-aspect' }, 'chitat / prochitat'),
      authoredCard('ru', 'ы / и', 'These vowel sounds are distinct and often difficult for learners.', ['pronunciation', 'vowels'], { teachingFocus: 'vowel-contrast' }, 'y / i'),
    ],
  },
  id: {
    cards: [
      authoredCard('id', 'saya / aku', 'Indonesian offers more neutral and more familiar ways to say “I.”', ['grammar', 'register'], { teachingFocus: 'register' }),
      authoredCard('id', 'Anda / kamu', 'Address forms show politeness and familiarity more than verb endings do.', ['greetings', 'register'], { teachingFocus: 'formal-informal' }),
      authoredCard('id', 'saya mau...', 'A direct and useful frame for saying what you want.', ['service', 'requests'], { teachingFocus: 'request-frame' }),
      authoredCard('id', 'di / ke / dari', 'Prepositions carry location and movement relationships.', ['grammar', 'prepositions'], { teachingFocus: 'location-words' }),
      authoredCard('id', 'buku-buku', 'Reduplication can mark plurality or intensity depending on context.', ['grammar', 'reduplication'], { teachingFocus: 'reduplication' }),
      authoredCard('id', 'makan / memakan', 'Affixes can change how formal or transitive a verb feels.', ['grammar', 'affixes'], { teachingFocus: 'affixes' }),
    ],
  },
  ms: {
    cards: [
      authoredCard('ms', 'saya / aku', 'Malay separates neutral and familiar first-person forms.', ['grammar', 'register'], { teachingFocus: 'register' }),
      authoredCard('ms', 'awak / anda', 'Address choice carries politeness and relationship information.', ['greetings', 'register'], { teachingFocus: 'formal-informal' }),
      authoredCard('ms', 'saya mahu...', 'A practical frame for saying what you want.', ['service', 'requests'], { teachingFocus: 'request-frame' }),
      authoredCard('ms', 'di / ke / dari', 'These prepositions distinguish place, direction, and origin.', ['grammar', 'prepositions'], { teachingFocus: 'location-words' }),
      authoredCard('ms', 'buku-buku', 'Reduplication can show plurality or emphasis.', ['grammar', 'reduplication'], { teachingFocus: 'reduplication' }),
      authoredCard('ms', 'makan / memakan', 'Affixes help shape the role and style of verbs.', ['grammar', 'affixes'], { teachingFocus: 'affixes' }),
    ],
  },
  fil: {
    cards: [
      authoredCard('fil', 'ako / ikaw', 'Filipino pronouns are central because focus and role are expressed differently from English.', ['grammar', 'pronouns'], { teachingFocus: 'pronouns' }),
      authoredCard('fil', 'po / opo', 'Respect markers are small but important for polite Filipino speech.', ['greetings', 'politeness'], { teachingFocus: 'respect-markers' }),
      authoredCard('fil', 'gusto ko...', 'A useful frame for saying what you like or want.', ['service', 'requests'], { teachingFocus: 'request-frame' }),
      authoredCard('fil', 'kumain / kinakain / kakain', 'Verb forms carry aspect: completed, ongoing, or future action.', ['grammar', 'aspect'], { teachingFocus: 'verb-aspect' }),
      authoredCard('fil', 'ang / ng / sa', 'These markers show focus, possession/object role, and location or direction.', ['grammar', 'markers'], { teachingFocus: 'case-markers' }),
      authoredCard('fil', 'maganda / mabuti', 'Adjective choice depends on whether you mean beauty, quality, or goodness.', ['usage', 'adjectives'], { teachingFocus: 'adjective-contrast' }),
    ],
  },
  tr: {
    cards: [
      authoredCard('tr', 'merhaba', 'A flexible greeting used in many everyday situations.', ['greetings'], { teachingFocus: 'greeting' }),
      authoredCard('tr', 'ben / sen / siz', 'Turkish separates familiar and respectful or plural “you.”', ['grammar', 'pronouns'], { teachingFocus: 'formal-informal' }),
      authoredCard('tr', 'istiyorum', 'A compact way to say “I want”; person is carried by the verb ending.', ['service', 'requests'], { teachingFocus: 'verb-ending' }),
      authoredCard('tr', 'evde / eve / evden', 'Suffixes mark location, direction, and origin.', ['grammar', 'suffixes'], { teachingFocus: 'case-suffixes' }),
      authoredCard('tr', 'kitaplar', 'Plural is usually marked with a vowel-harmony suffix.', ['grammar', 'vowel-harmony'], { teachingFocus: 'vowel-harmony' }),
      authoredCard('tr', 'geliyorum / geldim / geleceğim', 'Verb endings carry tense and person information.', ['grammar', 'tense'], { teachingFocus: 'verb-endings' }),
    ],
  },
  bn: {
    cards: [
      authoredCard('bn', 'নমস্কার', 'A respectful greeting used in many Bengali-speaking contexts.', ['greetings', 'politeness'], { teachingFocus: 'polite-greeting' }, 'nomoskar'),
      authoredCard('bn', 'আমি / তুমি / আপনি', 'Bengali pronouns show social distance and respect.', ['grammar', 'pronouns'], { teachingFocus: 'formal-informal' }, 'ami / tumi / apni'),
      authoredCard('bn', 'চাই', 'A compact way to say want or need in many everyday requests.', ['service', 'requests'], { teachingFocus: 'request-frame' }, 'chai'),
      authoredCard('bn', 'তে / থেকে / কে', 'Postpositions and case markers attach around nouns to show relationships.', ['grammar', 'case-markers'], { teachingFocus: 'case-markers' }, 'te / theke / ke'),
      authoredCard('bn', 'করছি / করেছি / করব', 'Verb forms carry ongoing, completed, and future meaning.', ['grammar', 'tense'], { teachingFocus: 'verb-forms' }, 'korchi / korechi / korbo'),
      authoredCard('bn', 'টা / জন', 'Classifiers help count things and people naturally.', ['grammar', 'classifiers'], { teachingFocus: 'classifiers' }, 'ta / jon'),
    ],
  },
  ta: {
    cards: [
      authoredCard('ta', 'வணக்கம்', 'A respectful greeting that works across many situations.', ['greetings', 'politeness'], { teachingFocus: 'polite-greeting' }, 'vanakkam'),
      authoredCard('ta', 'நான் / நீங்கள்', 'Tamil pronouns carry respect and social distance.', ['grammar', 'pronouns'], { teachingFocus: 'formal-informal' }, 'naan / neengal'),
      authoredCard('ta', 'வேண்டும்', 'A common way to express want, need, or requirement.', ['service', 'requests'], { teachingFocus: 'request-frame' }, 'vendum'),
      authoredCard('ta', 'இல் / க்கு / இருந்து', 'Case markers show location, direction, and source.', ['grammar', 'case-markers'], { teachingFocus: 'case-markers' }, 'il / kku / irundhu'),
      authoredCard('ta', 'சாப்பிடுகிறேன் / சாப்பிட்டேன்', 'Verb endings carry tense and person information.', ['grammar', 'verb-endings'], { teachingFocus: 'verb-endings' }, 'saappidugiren / saappitten'),
      authoredCard('ta', 'க் / ங் / ஞ்', 'Tamil consonant sounds and clusters need careful script-aware practice.', ['pronunciation', 'script'], { teachingFocus: 'script-sounds' }, 'k / ng / ny'),
    ],
  },
};

function getTargetTeachingProfile(targetLang) {
  return TARGET_TEACHING_PROFILES[normalizeLang(targetLang)] || null;
}

function loadCurriculumSafely(targetLang) {
  try {
    return loadTargetCurriculum(normalizeLang(targetLang)).curriculum;
  } catch (_) {
    return null;
  }
}

const GENERIC_GLOSS_PATTERNS = [
  /^use the key language of\b/i,
  /^distinguish the nearby wording choices\b/i,
  /^contrast the main pattern\b/i,
  /^read core\b/i,
  /^read the connected model\b/i,
  /^follow a short exchange\b/i,
  /^write connected target-language\b/i,
  /^notice the register\b/i,
  /^complete the communicative goal\b/i,
  /^the whole lesson is built toward\b/i,
];

function looksUsefulGloss(text) {
  const value = cleanText(text);
  if (!value || value.length < 4) return false;
  return !GENERIC_GLOSS_PATTERNS.some(pattern => pattern.test(value));
}

function isReasonableTarget(text) {
  const value = cleanText(text);
  if (!value || value.length > 140) return false;
  if (/^(lernziel|lesemodell|dialogmodell|lautkontrolle|goal|target|model)$/i.test(value)) return false;
  return true;
}

function lessonActivityHint(item = {}) {
  const activityIds = Array.isArray(item.activityIds) ? item.activityIds.join(' ') : '';
  const type = cleanText(item.type);
  return `${activityIds} ${type}`.toLowerCase();
}

function sourceCardFromLessonItem(targetLang, lessonKey, lesson, item, index, variant = 'main') {
  const learning = inferLearningArchitecture({ ...lesson, curriculumKey: lessonKey });
  const hint = lessonActivityHint(item);
  const isPronunciation = hint.includes('pronunciation');
  const isGrammar = hint.includes('grammar') || item.type === 'grammar';
  const isVocabulary = hint.includes('vocabulary') || item.type === 'word';
  const isDialogue = item.type === 'conversation' || hint.includes('listening') || hint.includes('speaking');

  let target = cleanText(item.targetText || item.korean);
  let gloss = cleanText(item.conceptGloss || item.nativeText || item.english);
  let pronunciation = cleanText(item.officialPronunciation || item.romanization || item.pronunciation);

  if (variant === 'example') {
    target = cleanText(item.exampleTarget || item.example);
    gloss = cleanText(item.exampleNative || item.exampleEnglish);
  }

  if (!isReasonableTarget(target) || !looksUsefulGloss(gloss)) return null;
  if (keyFor(target) === keyFor(gloss)) return null;
  if (!(isVocabulary || isGrammar || isPronunciation || isDialogue || variant === 'example')) return null;

  const category = [
    lesson.category || 'vocabulary',
    isGrammar ? 'grammar-pattern' : null,
    isPronunciation ? 'pronunciation' : null,
    isDialogue ? 'dialogue-phrase' : null,
  ].filter(Boolean);

  const lang = normalizeLang(targetLang);
  const field = languageField(lang);
  const card = {
    korean: target,
    english: gloss,
    conceptGloss: gloss,
    learningLevel: learning.level,
    levelTrack: learning.levelTrack,
    supportLevel: learning.supportLevel,
    skillStrands: learning.skillStrands,
    lessonRole: learning.lessonRole,
    coreRequired: learning.coreRequired,
    requiredForProgress: learning.requiredForProgress,
    certificateEligible: learning.certificateEligible,
    branchType: learning.branchType,
    lessonWeight: learning.lessonWeight,
    checkpointType: learning.checkpointType,
    repairFocus: learning.repairFocus,
    longActivityTypes: learning.longActivityTypes,
    manifestSource: learning.manifestSource,
    programLevelNameKey: learning.programLevelNameKey,
    programLevelDescriptionKey: learning.programLevelDescriptionKey,
    unitOrder: learning.unitOrder,
    sequenceOrder: learning.sequenceOrder,
    skillFocus: learning.skillFocus,
    prerequisiteConcepts: learning.prerequisiteConcepts,
    teachesConcepts: learning.teachesConcepts,
    reviewsConcepts: learning.reviewsConcepts,
    objective: lesson.title || lessonKey,
    sourceClassLessonKey: lessonKey,
    romanization: pronunciation,
    officialPronunciation: pronunciation,
    officialPronunciationSource: pronunciation ? 'target-authored' : '',
    category,
    targetLang: lang,
    usage: {
      source: 'target-curriculum',
      targetAuthored: true,
      ...(pronunciation ? { pronunciationSource: 'target-authored' } : {}),
      lessonKey,
      learningLevel: learning.level,
      levelTrack: learning.levelTrack,
      supportLevel: learning.supportLevel,
      lessonRole: learning.lessonRole,
      branchType: learning.branchType,
      lessonWeight: learning.lessonWeight,
      checkpointType: learning.checkpointType,
      repairFocus: learning.repairFocus,
      longActivityTypes: learning.longActivityTypes,
      manifestSource: learning.manifestSource,
      programLevelNameKey: learning.programLevelNameKey,
      programLevelDescriptionKey: learning.programLevelDescriptionKey,
      unitOrder: learning.unitOrder,
      sequenceOrder: learning.sequenceOrder,
      skillFocus: learning.skillFocus,
      prerequisiteConcepts: learning.prerequisiteConcepts,
      teachesConcepts: learning.teachesConcepts,
      reviewsConcepts: learning.reviewsConcepts,
      quizOptionMode: learning.quizOptionMode,
      writingMode: learning.writingMode,
      lessonTitle: lesson.title,
      lessonType: lesson.lessonType || '',
      itemType: item.type || '',
      itemIndex: index,
      variant,
      teachingFocus: isGrammar ? 'grammar-in-context' : isPronunciation ? 'pronunciation-in-context' : isDialogue ? 'dialogue-in-context' : 'vocabulary-in-context',
    },
  };
  card[field] = target;
  return ensureCardLearningIdentity(card);
}

function uniqueCards(cards) {
  const seen = new Set();
  const unique = [];
  for (const card of cards) {
    const key = `${normalizeLang(card.targetLang)}|${keyFor(card.korean || card[languageField(card.targetLang)])}|${keyFor(card.english)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(card);
  }
  return unique;
}

function mergeCardsByTarget(cards) {
  const byTarget = new Map();
  const merged = [];

  for (const rawCard of cards) {
    const card = ensureCardLearningIdentity(rawCard);
    const lang = normalizeLang(card.targetLang);
    const target = cardTargetText(card);
    const key = `${lang}|${keyFor(target)}`;
    if (!byTarget.has(key)) {
      card.usage = {
        ...(card.usage || {}),
        senses: [cardSense(card)],
      };
      byTarget.set(key, card);
      merged.push(card);
      continue;
    }

    const existing = byTarget.get(key);
    const existingSenses = Array.isArray(existing.usage?.senses) ? existing.usage.senses : [cardSense(existing)];
    const senses = [...existingSenses, cardSense(card)].filter(sense => sense.meaning);
    const uniqueSenses = [];
    const seenSense = new Set();
    senses.forEach((sense) => {
      const senseKey = `${sense.senseId}|${keyFor(sense.meaning)}`;
      if (seenSense.has(senseKey)) return;
      seenSense.add(senseKey);
      uniqueSenses.push(sense);
    });

    const meanings = uniqueValues(uniqueSenses.map(sense => sense.meaning));
    const displayMeaning = meanings.join(' / ');
    if (displayMeaning) {
      existing.english = displayMeaning;
      existing.conceptGloss = displayMeaning;
    }
    existing.senseId = uniqueSenses.length > 1 ? `${existing.conceptId}.sense.multi` : (uniqueSenses[0]?.senseId || existing.senseId);
    existing.activeLevels = uniqueNumbers([...(existing.activeLevels || []), ...(card.activeLevels || []), card.learningLevel]);
    existing.firstIntroducedLevel = Math.min(...existing.activeLevels);
    existing.sourceClassLessonKeys = uniqueValues([
      ...(existing.sourceClassLessonKeys || []),
      ...(card.sourceClassLessonKeys || []),
      card.sourceClassLessonKey,
    ]);
    existing.category = uniqueValues([
      ...(Array.isArray(existing.category) ? existing.category : [existing.category]),
      ...(Array.isArray(card.category) ? card.category : [card.category]),
    ]);
    existing.levelUses = mergeObjects(existing.levelUses, card.levelUses);
    existing.lessonRole = existing.lessonRole || card.lessonRole;
    existing.branchType = existing.branchType || card.branchType;
    existing.lessonWeight = Math.min(3, Math.max(Number(existing.lessonWeight || 0), Number(card.lessonWeight || 0))) || card.lessonWeight;
    existing.checkpointType = existing.checkpointType || card.checkpointType;
    existing.repairFocus = uniqueValues([
      ...(Array.isArray(existing.repairFocus) ? existing.repairFocus : []),
      ...(Array.isArray(card.repairFocus) ? card.repairFocus : []),
    ]);
    existing.longActivityTypes = uniqueValues([
      ...(Array.isArray(existing.longActivityTypes) ? existing.longActivityTypes : []),
      ...(Array.isArray(card.longActivityTypes) ? card.longActivityTypes : []),
    ]);
    if (!existing.officialPronunciation && card.officialPronunciation) {
      existing.officialPronunciation = card.officialPronunciation;
      existing.romanization = existing.romanization || card.romanization;
    }
    existing.usage = {
      ...(existing.usage || {}),
      senses: uniqueSenses,
      multiMeaning: uniqueSenses.length > 1,
      activeLevels: existing.activeLevels,
      firstIntroducedLevel: existing.firstIntroducedLevel,
      levelUses: existing.levelUses,
      sourceClassLessonKeys: existing.sourceClassLessonKeys,
      lessonRole: existing.lessonRole,
      branchType: existing.branchType,
      lessonWeight: existing.lessonWeight,
      checkpointType: existing.checkpointType,
      repairFocus: existing.repairFocus,
      longActivityTypes: existing.longActivityTypes,
    };
  }

  return merged;
}

function buildCurriculumFlashcardsForLanguage(targetLang, options = {}) {
  const lang = normalizeLang(targetLang);
  const curriculum = loadCurriculumSafely(lang);
  if (!curriculum) return [];

  const limit = options.limit || MAX_CURRICULUM_FLASHCARDS_PER_LANGUAGE;
  const cards = [];
  for (const [lessonKey, lesson] of Object.entries(curriculum)) {
    const content = Array.isArray(lesson.content) ? lesson.content : [];
    content.forEach((item, index) => {
      const main = sourceCardFromLessonItem(lang, lessonKey, lesson, item, index, 'main');
      if (main) cards.push(main);
      const example = sourceCardFromLessonItem(lang, lessonKey, lesson, item, index, 'example');
      if (example) cards.push(example);
    });
  }

  return mergeCardsByTarget(uniqueCards(cards)).slice(0, limit);
}

function buildDefaultFlashcardSourceForLanguage(targetLang, legacyCards = []) {
  const lang = normalizeLang(targetLang);
  const profileCards = (getTargetTeachingProfile(lang)?.cards || []).map(card => ({ ...card, usage: { ...card.usage } }));
  const curriculumCards = buildCurriculumFlashcardsForLanguage(lang);

  if (profileCards.length || curriculumCards.length) {
    return mergeCardsByTarget(uniqueCards([...profileCards, ...curriculumCards]));
  }

  return legacyCards;
}

function buildPracticeLessonsForLanguage(targetLang) {
  const lang = normalizeLang(targetLang);
  const curriculum = loadCurriculumSafely(lang);
  if (!curriculum) return [];

  return Object.entries(curriculum)
    .map(([lessonKey, lesson]) => {
      const learning = inferLearningArchitecture({ ...lesson, curriculumKey: lessonKey });
      const content = [];
      const lessonContent = Array.isArray(lesson.content) ? lesson.content : [];

      lessonContent.forEach((item, index) => {
        if (content.length >= MAX_PRACTICE_ITEMS_PER_LESSON) return;
        const main = sourceCardFromLessonItem(lang, lessonKey, lesson, item, index, 'main');
        if (main) {
          content.push({
            type: item.type === 'grammar' ? 'grammar' : item.type === 'conversation' ? 'conversation' : 'word',
            targetText: main.korean,
            romanization: main.romanization || '',
            officialPronunciation: main.officialPronunciation || main.romanization || '',
            officialPronunciationSource: main.officialPronunciationSource || '',
            nativeText: main.english,
            pronunciation: main.officialPronunciation || main.romanization || '',
            exampleTarget: cleanText(item.exampleTarget || item.example || main.korean),
            exampleNative: cleanText(item.exampleNative || item.exampleEnglish || main.english),
            conceptId: main.conceptId,
            senseId: main.senseId,
            conceptGloss: main.conceptGloss,
            learningLevel: learning.level,
            firstIntroducedLevel: main.firstIntroducedLevel,
            activeLevels: main.activeLevels,
            levelTrack: learning.levelTrack,
            supportLevel: learning.supportLevel,
            quizOptionMode: learning.quizOptionMode,
            writingMode: learning.writingMode,
            skillStrands: learning.skillStrands,
            lessonRole: learning.lessonRole,
            coreRequired: learning.coreRequired,
            requiredForProgress: learning.requiredForProgress,
            certificateEligible: learning.certificateEligible,
            branchType: learning.branchType,
            lessonWeight: learning.lessonWeight,
            checkpointType: learning.checkpointType,
            repairFocus: learning.repairFocus,
            longActivityTypes: learning.longActivityTypes,
            manifestSource: learning.manifestSource,
            programLevelNameKey: learning.programLevelNameKey,
            programLevelDescriptionKey: learning.programLevelDescriptionKey,
            unitOrder: learning.unitOrder,
            sequenceOrder: learning.sequenceOrder,
            skillFocus: learning.skillFocus,
            prerequisiteConcepts: learning.prerequisiteConcepts,
            teachesConcepts: learning.teachesConcepts,
            reviewsConcepts: learning.reviewsConcepts,
            objective: lesson.title || lessonKey,
            sourceClassLessonKey: lessonKey,
            sourceClassLessonKeys: main.sourceClassLessonKeys,
            levelUses: main.levelUses,
            usage: main.usage,
            breakdown: Array.isArray(item.breakdown)
              ? item.breakdown.map(part => ({ target: part.target || part.korean || '', native: part.native || part.english || '' }))
              : [],
          });
        }
      });

      if (!content.length) return null;
      return {
        title: `${lesson.title} - Practice`,
        category: lesson.category || 'daily-life',
        difficulty: lesson.difficulty || 'beginner',
        targetLang: lang,
        nativeLang: 'en',
        track: 'practice',
        lessonType: lesson.lessonType || 'thematic',
        learningLevel: learning.level,
        levelTrack: learning.levelTrack,
        supportLevel: learning.supportLevel,
        quizOptionMode: learning.quizOptionMode,
        writingMode: learning.writingMode,
        skillStrands: learning.skillStrands,
        lessonRole: learning.lessonRole,
        coreRequired: learning.coreRequired,
        requiredForProgress: learning.requiredForProgress,
        certificateEligible: learning.certificateEligible,
        branchType: learning.branchType,
        lessonWeight: learning.lessonWeight,
        checkpointType: learning.checkpointType,
        repairFocus: learning.repairFocus,
        longActivityTypes: learning.longActivityTypes,
        manifestSource: learning.manifestSource,
        programLevelNameKey: learning.programLevelNameKey,
        programLevelDescriptionKey: learning.programLevelDescriptionKey,
        unitOrder: learning.unitOrder,
        sequenceOrder: learning.sequenceOrder,
        skillFocus: learning.skillFocus,
        prerequisiteConcepts: learning.prerequisiteConcepts,
        teachesConcepts: learning.teachesConcepts,
        reviewsConcepts: learning.reviewsConcepts,
        curriculumKey: `${lessonKey}Practice`,
        content,
      };
    })
    .filter(Boolean);
}

function buildPracticeLessonsForSupportedTargets(languages = SUPPORTED_LANGUAGES) {
  return languages.flatMap(lang => buildPracticeLessonsForLanguage(lang));
}

module.exports = {
  TARGET_TEACHING_PROFILES,
  buildCurriculumFlashcardsForLanguage,
  buildDefaultFlashcardSourceForLanguage,
  buildPracticeLessonsForLanguage,
  buildPracticeLessonsForSupportedTargets,
  getTargetTeachingProfile,
};
