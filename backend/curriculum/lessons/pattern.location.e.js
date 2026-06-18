/**
 * Location / destination — 에
 *
 * Concept: pattern.location.e
 *
 * 에 is the workhorse location particle. It attaches to a noun and marks
 * either WHERE something exists ("학교에 있어요" — is at school) or WHERE
 * something moves TO ("학교에 가요" — go to school). It is NOT used for
 * the place where an action HAPPENS — that's 에서 (taught later). The
 * second use of 에 is TIME: 7시에 (at 7 o'clock), 월요일에 (on Monday).
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.location.e';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: [],
  function: FUNCTIONS.LOCATION,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.location.e.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 5,
  l1Pattern: 'English uses different prepositions for static location vs movement: "at school", "to school", "in the bag", "into the bag". Many small words.',
  l2Pattern: 'Korean uses ONE particle — 에 — for both "at" and "to", attached AFTER the noun: 학교에. The verb tells you whether you\'re sitting or moving.',
  explanation:
    'Attach 에 to any place or time noun. The verb decides the meaning: ' +
    '학교에 있어요 = "I AM at school" (static, 있다 = exist), ' +
    '학교에 가요 = "I GO to school" (movement, 가다 = go). ' +
    'No batchim rule applies to 에 — it\'s the same after every noun. ' +
    'Caution: 에 is for EXISTENCE-AT and MOVEMENT-TO. For the place where you actively DO something ' +
    '("I study AT a café"), Korean uses a different particle 에서. Beginners overuse 에 — when in doubt, ' +
    'ask yourself: is this static location, or is action happening here? If action, you\'ll later switch to 에서.',
  commonMistakes: [
    'WRONG: "학교에서 가요" (using -에서 for destination). RIGHT: "학교에 가요". -에서 means "from" or "the place where an action happens", not "to".',
    'WRONG: "학교에서 있어요" (using -에서 for static location). RIGHT: "학교에 있어요". 있다/없다 take -에, never -에서.',
    'WRONG: "월요일에서 가요". RIGHT: "월요일에 가요" — time uses 에, same as location.',
    'WRONG: "집에 가요" said when you are leaving from home. RIGHT: "집에 가요" only means "I go (TO) home". To say "I come FROM home", you need 집에서 (with movement verbs other than 가다, 오다).',
  ],
  culturalNote: {
    text:
      'Native speakers often drop "에" in fast colloquial speech: "어디 가요?" instead of "어디에 가요?" ("Where are you going?"). In writing and careful speech, keep it in. For the learner, leave it in until you have heard hundreds of dropped examples — overusing the dropped form sounds sloppy from a non-native.',
  },
};

const pattern = {
  ...COMMON,
  id: 'pattern.location.e.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 8,
  patternTarget: '{filler}에 …',
  patternGloss: 'at / to {filler}',
  anchors: [
    {
      target: '학교에 가요.',
      romanization: 'hakgyo-e gayo.',
      native: 'I go to school.',
      gloss: '학교(school)+에(LOC) | 가요(go)',
    },
    {
      target: '집에 있어요.',
      romanization: 'jib-e isseoyo.',
      native: 'I am at home.',
      gloss: '집(home)+에 | 있어요(exist / am present)',
    },
    {
      target: '카페에 가요.',
      romanization: 'kape-e gayo.',
      native: 'I go to the café.',
      gloss: '카페(café)+에 | 가요',
    },
    {
      target: '도서관에 책이 있어요.',
      romanization: 'doseogwan-e chaeg-i isseoyo.',
      native: 'There is a book in the library.',
      gloss: '도서관(library)+에 | 책(book)+이(SUBJ) | 있어요',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.PLACE,
      fillerConceptIds: ['lexeme.school', 'lexeme.home', 'lexeme.company', 'lexeme.cafe'],
      promptTemplate: 'Say "I go to {filler}." Use 가요.',
    },
    {
      slot: SLOT_CATEGORIES.PLACE,
      fillerConceptIds: ['lexeme.library', 'lexeme.restaurant', 'lexeme.park', 'lexeme.market'],
      promptTemplate: 'Say "I am at {filler}." Use 있어요.',
    },
    {
      slot: SLOT_CATEGORIES.PLACE,
      fillerConceptIds: ['lexeme.school', 'lexeme.cafe', 'lexeme.library'],
      promptTemplate: 'Say "There is a book at {filler}." Use 책이 + 있어요.',
    },
    {
      slot: SLOT_CATEGORIES.TIME,
      fillerConceptIds: ['lexeme.today', 'lexeme.tomorrow', 'lexeme.weekend', 'lexeme.morning'],
      promptTemplate: 'Say "On {filler}, I go to school." Pattern: {filler}에 학교에 가요.',
    },
    {
      slot: SLOT_CATEGORIES.OBJECT,
      fillerConceptIds: ['lexeme.book', 'lexeme.phone', 'lexeme.water'],
      promptTemplate: 'Say "The {filler} is in the bag." Pattern: {filler}이/가 가방에 있어요.',
    },
  ],
  productionTask:
    'I will give you a place in English plus an action (go / be / there is a book). ' +
    'Produce the Korean sentence: PLACE + 에 + verb. Remember: 에 never changes for batchim, ' +
    'and 있다/가다/오다 all take 에 (never 에서 — yet).',
};

const cloze = {
  ...COMMON,
  id: 'cloze.location.e.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 5,
  items: [
    {
      target: '학교___ 가요.',
      native: 'I go to school.',
      answer: '에',
      hint: 'Destination of movement.',
      distractors: ['에서', '는', '가'],
    },
    {
      target: '집___ 있어요.',
      native: 'I am at home.',
      answer: '에',
      hint: 'Static location with 있다.',
      distractors: ['에서', '는', '을'],
    },
    {
      target: '카페에 ___.',
      native: 'I go to the café.',
      answer: '가요',
      hint: 'The verb "to go" in polite form.',
      distractors: ['가서', '갔어요', '간다'],
    },
    {
      target: '도서관에 책___ 있어요.',
      native: 'There is a book in the library.',
      answer: '이',
      hint: 'Subject marker — 책 ends in ㄱ batchim.',
      distractors: ['가', '에', '은'],
    },
    {
      target: '7시___ 만나요.',
      native: 'Let\'s meet at 7 o\'clock.',
      answer: '에',
      hint: 'Time uses the same particle as location.',
      distractors: ['에서', '에는', '가'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.location.e.where-are-you.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 6,
  mode: 'dialogue',
  title: 'Where are you?',
  turns: [
    {
      speaker: '민호',
      target: '사라 씨, 지금 어디에 있어요?',
      romanization: 'sara-ssi, jigeum eodi-e isseoyo?',
      native: 'Sarah, where are you right now?',
      glosses: [
        { target: '지금', native: 'now' },
        { target: '어디에', native: 'at where (location 에)' },
      ],
    },
    {
      speaker: '사라',
      target: '카페에 있어요. 친구가 와요.',
      romanization: 'kape-e isseoyo. chinguga wayo.',
      native: 'I\'m at the café. My friend is coming.',
      glosses: [
        { target: '친구가', native: 'friend (SUBJ)' },
        { target: '와요', native: '(is) coming' },
      ],
    },
    {
      speaker: '민호',
      target: '저도 카페에 가요. 어느 카페예요?',
      romanization: 'jeo-do kape-e gayo. eoneu kape-yeyo?',
      native: 'I\'m going to a café too. Which café is it?',
      glosses: [
        { target: '저도', native: 'me too' },
        { target: '어느', native: 'which' },
      ],
    },
    {
      speaker: '사라',
      target: '학교 옆에 있어요. 도서관 근처예요.',
      romanization: 'hakgyo yeop-e isseoyo. doseogwan geuncheo-yeyo.',
      native: 'It\'s next to the school. Near the library.',
      glosses: [
        { target: '옆에', native: 'next to (옆 + 에)' },
        { target: '근처', native: 'nearby / vicinity' },
      ],
    },
    {
      speaker: '민호',
      target: '알았어요. 곧 가요!',
      romanization: 'arasseoyo. got gayo!',
      native: 'Got it. I\'ll be there soon!',
      glosses: [
        { target: '알았어요', native: '(I) understood / got it' },
        { target: '곧', native: 'soon' },
      ],
    },
  ],
  comprehensionQuestions: [
    'Where is Sarah?',
    'Where is the café?',
    'Why does Minho use 카페에 가요 and Sarah use 카페에 있어요? What\'s the difference in meaning of 에 here?',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.location.e.places.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 5,
  fillerConceptIds: [
    'lexeme.school', 'lexeme.home', 'lexeme.company', 'lexeme.cafe',
    'lexeme.library', 'lexeme.restaurant', 'lexeme.park', 'lexeme.market',
    'lexeme.jeju', 'lexeme.busan', 'lexeme.seoul',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.location.e.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '학교에 가요',
      romanization: 'hakgyo-e gayo',
      native: 'I go to school',
      focusSounds: [
        '학교에: ㄱ batchim before another ㄱ → tense /haek-kkyo/, then /e/',
        '가요: soft /ga-yo/, not /ka-yo/',
      ],
    },
    {
      target: '집에 있어요',
      romanization: 'jib-e isseoyo',
      native: 'I am at home',
      focusSounds: [
        '집에: ㅂ batchim links into 에 → /ji-be/, NOT "jip-e"',
        '있어요: tense ㅆ, smooth /i-sseo-yo/',
      ],
    },
    {
      target: '도서관에 책이 있어요',
      romanization: 'doseogwan-e chaeg-i isseoyo',
      native: 'There is a book in the library',
      focusSounds: [
        '도서관에: ㄴ batchim + 에 → /gwa-ne/, smooth',
        '책이: ㄱ batchim + 이 → /chae-gi/',
      ],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.location.e.vs-eseo.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 4,
  pairs: [
    {
      a: '학교에 있어요',
      b: '학교에서 있어요',
      contrast: 'Static location: only 에 works with 있다. -에서 is ungrammatical here.',
    },
    {
      a: '학교에 가요',
      b: '학교에서 가요',
      contrast: 'Destination: 에 = "TO school". 에서 = "FROM school". Both grammatical, opposite meaning.',
    },
    {
      a: '집에',
      b: '지베',
      contrast: 'Pronunciation only — 집에 is read as /ji-be/ because of batchim linking. The romanization 지베 captures the actual sound; the spelling 집에 preserves the morphemes.',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
