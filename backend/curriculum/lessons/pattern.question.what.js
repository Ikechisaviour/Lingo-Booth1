/**
 * Asking "what?" — 뭐 / 무엇
 *
 * Concept: pattern.question.what
 *
 * 뭐 is the everyday spoken form ("뭐 먹어요?" — "What are you eating?").
 * 무엇 is the formal/written form, common in news, surveys, and careful
 * speech. For beginners both forms point at the same role: substitute the
 * thing you don't know with 뭐 / 무엇 and add the question intonation. No
 * particle is required when the verb is 이에요 / 예요 ("뭐예요?"), but
 * 뭐 can also act as a subject (뭐가) or object (뭐를) — context decides.
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.question.what';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: ['pattern.identification.be'],
  function: FUNCTIONS.INTERROGATIVE,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.question.what.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 4,
  l1Pattern: 'English: "What" is the first word of the question — "What is this?", "What do you eat?"',
  l2Pattern: 'Korean: 뭐 / 무엇 sits where the answer would go — "이건 뭐예요?" / "뭐 먹어요?"',
  explanation:
    'Korean question words occupy the SAME position the answer would. "What is this?" is literally "this thing is WHAT?" — 이건 뭐예요? You don\'t flip the sentence; you swap the unknown for 뭐. ' +
    '뭐 is the spoken form everyone uses in conversation. 무엇 is the careful, formal cousin you\'ll see in writing, news headlines, and survey questions. Both work the same way grammatically. Add the question intonation by raising the pitch on the last syllable; no question mark particle is needed.',
  commonMistakes: [
    'WRONG: "뭐 이건이에요?" (fronting 뭐 like English "what"). RIGHT: "이건 뭐예요?" — leave the order alone; just swap the unknown for 뭐.',
    'WRONG: "뭐 가요?" without context (ambiguous between subject and object). RIGHT: depending on what you mean — "뭐 먹어요?" ("what do you eat?", 뭐 is object) or "뭐가 있어요?" ("what is there?", 뭐가 is subject).',
    'WRONG: Using 무엇 in casual conversation ("무엇 먹어요?"). RIGHT: "뭐 먹어요?" — 무엇 sounds stiff and bookish among friends; use 뭐.',
    'WRONG: "이건 뭐이에요?" (adding the consonant copula -이에요 after the vowel-final 뭐). RIGHT: "이건 뭐예요?" — 뭐 ends in a vowel, so the copula is -예요.',
  ],
  culturalNote: {
    text:
      'Don\'t worry about choosing between 뭐 and 무엇 as a beginner — 뭐 is correct in 95% of A1 situations. You\'ll meet 무엇 in printed quizzes, restaurant signs ("오늘의 메뉴: 무엇을 드시겠어요?"), and formal interviews. Listening for 무엇 is more important than speaking it.',
    example: '"뭐예요?" (everyday, between friends) vs "무엇입니까?" (formal: news anchor, written survey).',
  },
};

const pattern = {
  ...COMMON,
  id: 'pattern.question.what.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 7,
  patternTarget: '… 뭐 / 뭐가 / 뭐를 …요?',
  patternGloss: 'What is / what does / what …?',
  anchors: [
    {
      target: '이건 뭐예요?',
      romanization: 'igeon mwo-yeyo?',
      native: 'What is this?',
      gloss: '이건(this, contracted from 이것은) | 뭐(what)+예요(is, vowel-ending copula)',
    },
    {
      target: '뭐 먹어요?',
      romanization: 'mwo meogeoyo?',
      native: 'What are you eating? / What do you eat?',
      gloss: '뭐(what, object) | 먹어요(eat) — particle 를 dropped in casual speech',
    },
    {
      target: '뭐가 있어요?',
      romanization: 'mwoga isseoyo?',
      native: 'What is there?',
      gloss: '뭐(what)+가(SUBJ) | 있어요(exists)',
    },
    {
      target: '이름이 뭐예요?',
      romanization: 'ireum-i mwo-yeyo?',
      native: 'What is your name?',
      gloss: '이름(name)+이(SUBJ) | 뭐예요(is what)',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.OBJECT,
      fillerConceptIds: ['lexeme.book', 'lexeme.water', 'lexeme.bag', 'lexeme.phone'],
      promptTemplate: 'Point at a {filler} and ask "What is this?" Answer with "이건 {filler}이에요/예요."',
    },
    {
      slot: SLOT_CATEGORIES.FOOD,
      fillerConceptIds: ['lexeme.kimchi', 'lexeme.bibimbap', 'lexeme.tteokbokki'],
      promptTemplate: 'Ask "What are you eating?" then answer with "(저는) {filler}을/를 먹어요." Use the object marker that fits the filler\'s batchim.',
    },
    {
      slot: SLOT_CATEGORIES.PLACE,
      fillerConceptIds: ['lexeme.cafe', 'lexeme.library', 'lexeme.park'],
      promptTemplate: 'Ask "What is at the {filler}?" Frame: "{filler}에 뭐가 있어요?" Then answer with one thing.',
    },
  ],
  productionTask:
    'I will hold up a thing, mention a place, or describe a vague situation. ' +
    'Ask the matching "what" question in polite -요 form. Use 뭐예요? for identity, ' +
    '뭐 + verb for actions, 뭐가 + 있어요 for existence. Stop second-guessing 뭐 vs 무엇 — 뭐 is correct here.',
};

const cloze = {
  ...COMMON,
  id: 'cloze.question.what.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 5,
  items: [
    {
      target: '이건 ___?',
      native: 'What is this?',
      answer: '뭐예요',
      hint: '뭐 + the right copula. Does 뭐 end in a vowel or a consonant?',
      distractors: ['뭐이에요', '무엇이에요', '뭐가'],
    },
    {
      target: '___ 먹어요?',
      native: 'What are you eating?',
      answer: '뭐',
      hint: 'No particle in fast colloquial use.',
      distractors: ['뭐가', '뭐를', '무엇은'],
    },
    {
      target: '가방에 ___ 있어요?',
      native: 'What is in the bag?',
      answer: '뭐가',
      hint: '뭐 as the SUBJECT of 있어요 — pick the right marker.',
      distractors: ['뭐를', '뭐예요', '뭐는'],
    },
    {
      target: '이름___ 뭐예요?',
      native: 'What is (your) name?',
      answer: '이',
      hint: '이름 ends in ㅁ — consonant. Subject marker.',
      distractors: ['가', '은', '를'],
    },
    {
      target: 'Q: 뭐가 있어요?  A: ___ 있어요.',
      native: 'Q: What is there? A: There is a book.',
      answer: '책이',
      hint: 'Subject marker after 책 — ㄱ batchim.',
      distractors: ['책은', '책을', '책가'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.question.what.cafe-order.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 5,
  mode: 'dialogue',
  title: 'Cafe order',
  turns: [
    {
      speaker: '직원',
      target: '안녕하세요. 뭐 드릴까요?',
      romanization: 'annyeong-haseyo. mwo deurilkkayo?',
      native: 'Hello. What may I get you?',
      glosses: [
        { target: '뭐 드릴까요?', native: 'literally "what shall (I) give?" — polite waiter\'s phrase' },
      ],
    },
    {
      speaker: '사라',
      target: '음… 메뉴가 뭐 있어요?',
      romanization: 'eum… menyu-ga mwo isseoyo?',
      native: 'Hmm… what\'s on the menu? (Lit. "what is there in the menu?")',
      glosses: [
        { target: '음…', native: 'um… (hesitation)' },
        { target: '메뉴가', native: 'menu (subject)' },
      ],
    },
    {
      speaker: '직원',
      target: '커피, 차, 그리고 주스가 있어요.',
      romanization: 'keopi, cha, geurigo juseu-ga isseoyo.',
      native: 'We have coffee, tea, and juice.',
      glosses: [
        { target: '커피', native: 'coffee' },
        { target: '차', native: 'tea' },
        { target: '주스', native: 'juice' },
      ],
    },
    {
      speaker: '사라',
      target: '커피가 뭐예요?',
      romanization: 'keopi-ga mwo-yeyo?',
      native: 'What (kind of) coffee is it? (asking which coffees they have)',
      glosses: [
        { target: '커피가 뭐예요?', native: 'subject + 뭐예요 — asking which/what one' },
      ],
    },
    {
      speaker: '직원',
      target: '아메리카노, 라떼, 카푸치노가 있어요.',
      romanization: 'amerikano, latte, kapuchino-ga isseoyo.',
      native: 'We have Americano, latte, and cappuccino.',
      glosses: [
        { target: '아메리카노', native: 'Americano' },
      ],
    },
    {
      speaker: '사라',
      target: '아메리카노 주세요!',
      romanization: 'amerikano juseyo!',
      native: 'Americano, please!',
      glosses: [
        { target: '주세요', native: 'please give (me)' },
      ],
    },
  ],
  comprehensionQuestions: [
    'What does the staff say first to ask what Sarah wants?',
    'How does Sarah ask what\'s on the menu?',
    'What three options does the staff offer?',
    'What does Sarah end up ordering?',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.question.what.things.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 4,
  fillerConceptIds: [
    'lexeme.book', 'lexeme.water', 'lexeme.bag', 'lexeme.phone', 'lexeme.money',
    'lexeme.kimchi', 'lexeme.bibimbap', 'lexeme.tteokbokki',
    'lexeme.cafe', 'lexeme.library',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.question.what.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '뭐예요?',
      romanization: 'mwo-yeyo?',
      native: 'What is it?',
      focusSounds: [
        '뭐: ㅝ is a single glide /wo/ — like "wuh", not two syllables',
        'rising intonation on the final syllable signals the question',
      ],
    },
    {
      target: '이건 뭐예요?',
      romanization: 'igeon mwo-yeyo?',
      native: 'What is this?',
      focusSounds: [
        '이건: ㄴ batchim links into 뭐 → /i-geon-mwo/ with a soft transition',
        'overall melody: high-high-mid-high? — final 요 rises',
      ],
    },
    {
      target: '뭐 먹어요?',
      romanization: 'mwo meogeoyo?',
      native: 'What are you eating?',
      focusSounds: [
        '뭐 + 먹어요: brief pause between 뭐 and 먹 — both stay light',
        '먹어요: ㄱ batchim links → /meo-geo-yo/',
      ],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.question.what.mwo-mu.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 3,
  pairs: [
    {
      a: '뭐예요?',
      b: '뭐이에요?',
      contrast: 'Correct vs wrong copula. 뭐 ends in a vowel → -예요 is correct. -이에요 is the over-applied beginner error.',
    },
    {
      a: '뭐',
      b: '무엇',
      contrast: 'Casual vs formal "what". Same meaning, different register. 뭐 is conversation; 무엇 is news anchor.',
    },
    {
      a: '뭐 먹어요?',
      b: '뭐가 먹어요?',
      contrast: 'Object what vs subject what. "What do you eat?" vs "What is eating?" (eerie second meaning — only used when an animal/agent is doing the eating).',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
