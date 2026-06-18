/**
 * "I want to V" — -고 싶다
 *
 * Concept: pattern.preference.want_to
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.preference.want_to';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: [],
  function: FUNCTIONS.PREFERENCE,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.preference.want_to.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 3,
  l1Pattern: 'English: "I want to V" — auxiliary "want" + bare verb',
  l2Pattern: 'Korean: "V-고 싶어요" — the verb itself carries the wanting',
  explanation:
    'English uses an auxiliary ("want to") and the main verb stays bare ("eat"). Korean ' +
    'has no separate "want" verb in this construction — you take the verb stem and attach ' +
    '"-고 싶어요" directly. Word order flips: in English "want" comes first; in Korean the ' +
    'verb comes first, with the wanting tail at the end. The object marker -을/를 stays on ' +
    'the object as usual.',
  commonMistakes: [
    'WRONG: "저는 원해요 김치 먹다" (translating "want" as a separate verb). ' +
      'RIGHT: "김치를 먹고 싶어요" — the wanting is built into the verb form.',
    'WRONG: "먹어 고 싶어요" (using the -아/어 form instead of the bare stem). ' +
      'RIGHT: "먹고 싶어요" — attach 고 to the bare stem 먹-, not to the conjugated form.',
    'WRONG: "한국에서 가고 싶어요" (using -에서 for destination). ' +
      'RIGHT: "한국에 가고 싶어요" — destination takes -에, not -에서.',
  ],
};

const pattern = {
  ...COMMON,
  id: 'pattern.preference.want_to.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 8,
  patternTarget: '{filler}-고 싶어요',
  patternGloss: 'I want to V',
  anchors: [
    {
      target: '김치를 먹고 싶어요.',
      native: 'I want to eat kimchi.',
      gloss: '김치(kimchi)+를(OBJ) | 먹(eat)+고 싶어요(want-to)',
    },
    {
      target: '한국에 가고 싶어요.',
      native: 'I want to go to Korea.',
      gloss: '한국(Korea)+에(to) | 가(go)+고 싶어요',
    },
    {
      target: '한국어를 배우고 싶어요.',
      native: 'I want to learn Korean.',
      gloss: '한국어(Korean)+를(OBJ) | 배우(learn)+고 싶어요',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.ACTION,
      fillerConceptIds: ['lexeme.eat', 'lexeme.drink', 'lexeme.sleep', 'lexeme.study'],
      promptTemplate: 'Tell me you want to {filler}.',
    },
    {
      slot: SLOT_CATEGORIES.PLACE,
      fillerConceptIds: ['lexeme.jeju', 'lexeme.busan', 'lexeme.seoul'],
      promptTemplate: 'Tell me you want to go to {filler}.',
    },
    {
      slot: SLOT_CATEGORIES.FOOD,
      fillerConceptIds: ['lexeme.kimchi', 'lexeme.bibimbap', 'lexeme.tteokbokki'],
      promptTemplate: 'Tell me you want to eat {filler}.',
    },
  ],
  productionTask:
    'I will say a verb, a place, or a food. Tell me, in Korean polite form, that you ' +
    'want to do that thing / go there / eat it. Use "-고 싶어요".',
};

const cloze = {
  ...COMMON,
  id: 'cloze.preference.want_to.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 5,
  items: [
    {
      target: '김치를 먹___ 싶어요.',
      native: 'I want to eat kimchi.',
      answer: '고',
      hint: 'The "want-to" pattern is verb stem + 고 싶어요.',
      distractors: ['아', '어', '을'],
    },
    {
      target: '한국에 ___ 싶어요.',
      native: 'I want to go to Korea.',
      answer: '가고',
      hint: 'The verb is 가다 (to go). Attach 고 to the stem.',
      distractors: ['가서', '가는', '갈'],
    },
    {
      target: '영화를 보고 ___.',
      native: 'I want to watch a movie.',
      answer: '싶어요',
      hint: 'The wanting tail.',
      distractors: ['있어요', '돼요', '봐요'],
    },
    {
      target: '한국어를 ___ 싶어요.',
      native: 'I want to learn Korean.',
      answer: '배우고',
      hint: 'The verb is 배우다 (to learn).',
      distractors: ['배워서', '배운', '배웠'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.preference.want_to.travel-plans.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 5,
  mode: 'dialogue',
  title: 'Travel plans',
  turns: [
    {
      speaker: '수진',
      target: '여행 가고 싶어요?',
      native: 'Do you want to travel?',
      glosses: [
        { target: '여행', native: 'travel / trip' },
        { target: '가고 싶어요?', native: 'do you want to go?' },
      ],
    },
    {
      speaker: 'Alex',
      target: '네, 한국에 가고 싶어요. 한국어도 배우고 싶어요.',
      native: 'Yes, I want to go to Korea. I also want to learn Korean.',
      glosses: [
        { target: '한국에', native: 'to Korea' },
        { target: '도', native: 'also', note: 'attached to 한국어' },
      ],
    },
    {
      speaker: '수진',
      target: '뭐 먹고 싶어요?',
      native: 'What do you want to eat?',
      glosses: [
        { target: '뭐', native: 'what' },
        { target: '먹고 싶어요?', native: 'do you want to eat?' },
      ],
    },
    {
      speaker: 'Alex',
      target: '삼겹살을 먹고 싶어요. 막걸리도 마시고 싶어요!',
      native: 'I want to eat samgyeopsal. I also want to drink makgeolli!',
      glosses: [
        { target: '막걸리', native: 'makgeolli (rice wine)' },
        { target: '마시고 싶어요', native: 'want to drink' },
      ],
    },
  ],
  comprehensionQuestions: [
    'Where does Alex want to go?',
    'What does Alex want to learn?',
    'Name two things Alex wants to eat or drink.',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.preference.want_to.slots.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 4,
  fillerConceptIds: [
    'lexeme.eat', 'lexeme.drink', 'lexeme.go', 'lexeme.see',
    'lexeme.learn', 'lexeme.sleep', 'lexeme.study', 'lexeme.buy',
    'lexeme.travel', 'lexeme.rest',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.preference.want_to.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '먹고 싶어요',
      native: 'I want to eat',
      focusSounds: ['먹고: the ㄱ in 먹 assimilates with ㄱ in 고 → tense /kk/', '싶어요: 싶 ends in ㅍ, links to 어요 → /sipeoyo/'],
    },
    {
      target: '가고 싶어요',
      native: 'I want to go',
      focusSounds: ['가고: smooth /gago/ — no break between 가 and 고'],
    },
    {
      target: '배우고 싶어요',
      native: 'I want to learn',
      focusSounds: ['배우: diphthong, glides /bae-u/'],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.preference.want_to.s-series.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 3,
  pairs: [
    {
      a: '싶다',
      b: '십다',
      contrast: 'ㅅ vs ㅆ — only 싶다 (to want) is a real word; 십다 tests if you hear the lax/tense distinction.',
    },
    {
      a: '가다',
      b: '카다',
      contrast: 'lax ㄱ (g) vs aspirated ㅋ (k) — 가다 means "to go"; the second is not a verb.',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
