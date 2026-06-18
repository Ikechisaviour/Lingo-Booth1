/**
 * "I will / am going to V" — -(으)ㄹ 거예요
 *
 * Concept: pattern.intention.going_to
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.intention.going_to';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: [],
  function: FUNCTIONS.INTENTION,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.intention.going_to.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 3,
  l1Pattern: 'English: "I will V" / "I am going to V"',
  l2Pattern: 'Korean: "V-(으)ㄹ 거예요"',
  explanation:
    'English splits future into "will" (intent) and "going to" (plan). Korean uses one ' +
    'pattern for both: attach "-(으)ㄹ 거예요" to the verb stem. The "(으)" appears only if the ' +
    'stem ends in a consonant — vowel-ending stems take just "-ㄹ 거예요". This is the ' +
    'most common neutral-future form; learn it before "-(으)ㄹ게요" which carries a promise nuance.',
  commonMistakes: [
    'WRONG: "먹ㄹ 거예요" (forgetting the 으 link after a consonant-final stem). ' +
      'RIGHT: "먹을 거예요" — consonant + 을 거예요.',
    'WRONG: "갈을 거예요" (adding 으 to a vowel-final stem). ' +
      'RIGHT: "갈 거예요" — vowel-ending stem 가- already glides into ㄹ.',
    'WRONG: "거에요" (using ㅔ where Korean writes ㅖ). ' +
      'RIGHT: "거예요" — note the ㅖ spelling.',
  ],
};

const pattern = {
  ...COMMON,
  id: 'pattern.intention.going_to.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 8,
  patternTarget: '{filler}-(으)ㄹ 거예요',
  patternGloss: 'I will / am going to V',
  anchors: [
    {
      target: '내일 한국에 갈 거예요.',
      native: 'Tomorrow I will go to Korea.',
      gloss: '내일(tomorrow) | 한국에(to Korea) | 갈 거예요(will-go)',
    },
    {
      target: '저녁에 한국어를 공부할 거예요.',
      native: "I'm going to study Korean in the evening.",
      gloss: '저녁에(in the evening) | 공부할 거예요(will-study)',
    },
    {
      target: '주말에 영화를 볼 거예요.',
      native: "I'll watch a movie on the weekend.",
      gloss: '주말에(on the weekend) | 볼 거예요(will-watch)',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.ACTION,
      fillerConceptIds: ['lexeme.eat', 'lexeme.go', 'lexeme.see', 'lexeme.study', 'lexeme.sleep', 'lexeme.work'],
      promptTemplate: 'Say what you will do later: {filler}.',
    },
    {
      slot: SLOT_CATEGORIES.TIME,
      fillerConceptIds: ['lexeme.jeju', 'lexeme.seoul', 'lexeme.busan'],
      promptTemplate: 'Say you will go to {filler} tomorrow.',
    },
    {
      slot: SLOT_CATEGORIES.FOOD,
      fillerConceptIds: ['lexeme.kimchi', 'lexeme.bibimbap', 'lexeme.samgyeopsal'],
      promptTemplate: 'Say you will eat {filler} for dinner.',
    },
  ],
  productionTask:
    'I will say a verb or destination. Make a full sentence with "-(으)ㄹ 거예요" stating ' +
    'what you will do or where you will go. Add a time word (내일 / 주말에 / 저녁에) if you can.',
};

const cloze = {
  ...COMMON,
  id: 'cloze.intention.going_to.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 5,
  items: [
    {
      target: '내일 한국에 ___ 거예요.',
      native: 'I will go to Korea tomorrow.',
      answer: '갈',
      hint: '가다 (vowel stem) + ㄹ.',
      distractors: ['가는', '간', '가서'],
    },
    {
      target: '저녁에 한국어를 공부___ 거예요.',
      native: "I'm going to study Korean in the evening.",
      answer: '할',
      hint: '공부하다 stem 공부하- + ㄹ.',
      distractors: ['하는', '한', '해서'],
    },
    {
      target: '주말에 영화를 볼 ___.',
      native: "I'll watch a movie on the weekend.",
      answer: '거예요',
      hint: 'The neutral-future tail.',
      distractors: ['거에요', '게요', '봐요'],
    },
    {
      target: '저는 김치를 ___ 거예요.',
      native: 'I will eat kimchi.',
      answer: '먹을',
      hint: 'consonant-final stem 먹- needs 으 link.',
      distractors: ['먹는', '먹어서', '먹어'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.intention.going_to.weekend-plans.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 5,
  mode: 'dialogue',
  title: 'Weekend plans',
  turns: [
    {
      speaker: '준호',
      target: '주말에 뭐 할 거예요?',
      native: 'What are you going to do this weekend?',
      glosses: [
        { target: '주말에', native: 'on the weekend' },
        { target: '뭐 할 거예요', native: 'what will you do' },
      ],
    },
    {
      speaker: 'Alex',
      target: '친구하고 부산에 갈 거예요.',
      native: "I'll go to Busan with a friend.",
      glosses: [
        { target: '친구하고', native: 'with a friend' },
        { target: '갈 거예요', native: 'will go' },
      ],
    },
    {
      speaker: '준호',
      target: '거기에서 뭐 먹을 거예요?',
      native: 'What will you eat there?',
      glosses: [
        { target: '거기에서', native: 'there (at that place)' },
        { target: '먹을 거예요', native: 'will eat' },
      ],
    },
    {
      speaker: 'Alex',
      target: '회를 먹을 거예요. 그리고 바다도 볼 거예요.',
      native: "I'll eat raw fish. And I'll also see the ocean.",
      glosses: [
        { target: '회', native: 'sashimi / raw fish' },
        { target: '바다', native: 'ocean' },
        { target: '그리고', native: 'and' },
      ],
    },
  ],
  comprehensionQuestions: [
    'Where will Alex go this weekend?',
    'Who is going with Alex?',
    'What two things will Alex do in Busan?',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.intention.going_to.slots.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 4,
  fillerConceptIds: [
    'lexeme.eat', 'lexeme.go', 'lexeme.see', 'lexeme.study',
    'lexeme.sleep', 'lexeme.work', 'lexeme.read', 'lexeme.write',
    'lexeme.travel', 'lexeme.cook',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.intention.going_to.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '갈 거예요',
      native: 'I will go',
      focusSounds: ['갈 거: ㄹ + ㄱ → ㄹ becomes silent-like, ㄱ becomes tense /kk/ → /gal-kkeoyo/'],
    },
    {
      target: '먹을 거예요',
      native: 'I will eat',
      focusSounds: ['먹을: ㄱ links to ㅡ → /meo-geul/', '거예요: /kkeoyeyo/ — note the tense onset after ㄹ'],
    },
    {
      target: '공부할 거예요',
      native: 'I will study',
      focusSounds: ['공부할: rolling, no break between 공부 and 할'],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.intention.going_to.r-final.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 3,
  pairs: [
    {
      a: '갈',
      b: '간',
      contrast: 'final ㄹ vs final ㄴ — 갈 is the future modifier of 가다; 간 is past modifier.',
    },
    {
      a: '먹을',
      b: '먹은',
      contrast: 'ㅡㄹ vs ㅡㄴ — future "will eat" vs past "ate" modifier.',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
