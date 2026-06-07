/**
 * "If V/A, ..." — -(으)면
 *
 * Concept: pattern.condition.if
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.condition.if';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: [],
  function: FUNCTIONS.CONDITION,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.condition.if.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 4,
  l1Pattern: 'English: "If [condition], [result]" or "When [condition], [result]"',
  l2Pattern: 'Korean: "[condition]-(으)면 [result]" — condition always comes first',
  explanation:
    'Korean does not put "if" / "when" in a separate word. Attach -(으)면 to the verb / ' +
    'adjective stem. Use -(으) only if the stem ends in a consonant; vowel-ending stems take ' +
    'just -면. Korean -(으)면 covers BOTH English "if" (hypothetical) and "when" (whenever) — ' +
    'context disambiguates. Unlike -아/어서, -(으)면 is fine before commands and suggestions ' +
    '("if it rains, take an umbrella" → "비가 오면 우산을 가져가세요").',
  commonMistakes: [
    'WRONG: "비가 오ㅁ" / "비가 옴면" (forgetting the 으 link). ' +
      'RIGHT: 오다 is vowel-final, so it is "비가 오면" — but consonant-final stems like 먹- need ' +
      '"먹으면".',
    'WRONG: Using -아/어서 for hypotheticals ("배고파서 먹으세요"). ' +
      'RIGHT: "배고프면 먹으세요" — -(으)면 for "if/when" + command.',
    'WRONG: "할면" instead of "하면". ' +
      'RIGHT: 하다 is vowel-final → "하면". Only consonant-final stems get the 으 link.',
  ],
};

const pattern = {
  ...COMMON,
  id: 'pattern.condition.if.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 9,
  patternTarget: '{filler}-(으)면, ...',
  patternGloss: 'If / when [condition], [result]',
  anchors: [
    {
      target: '시간이 있으면 같이 가요.',
      native: "If you have time, let's go together.",
      gloss: '시간(time)+이(SUBJ) | 있(have)+으면 | 같이(together) 가요(go)',
    },
    {
      target: '비가 오면 집에 있어요.',
      native: "When it rains, I stay home.",
      gloss: '비가 오(rain-come)+면 | 집에(at home) 있어요(am)',
    },
    {
      target: '한국에 가면 김밥을 꼭 먹어 보세요.',
      native: "If you go to Korea, definitely try kimbap.",
      gloss: '가(go)+면 | 꼭(definitely) 먹어 보세요(try eating)',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.WEATHER,
      fillerConceptIds: ['lexeme.rain', 'lexeme.snow'],
      promptTemplate: 'Make a sentence starting "{filler}-면" + a natural result.',
    },
    {
      slot: SLOT_CATEGORIES.EMOTION,
      fillerConceptIds: ['lexeme.tired', 'lexeme.hungry', 'lexeme.busy', 'lexeme.sick'],
      promptTemplate: 'If you are {filler}, what do you do? Use -(으)면.',
    },
    {
      slot: SLOT_CATEGORIES.ACTION,
      fillerConceptIds: ['lexeme.study', 'lexeme.exercise', 'lexeme.rest'],
      promptTemplate: 'If you {filler}, you feel better. Express that.',
    },
  ],
  productionTask:
    'I will give you a condition (a weather event, state, or verb). Produce a full sentence: ' +
    'condition + -(으)면 + a sensible consequence in polite form.',
};

const cloze = {
  ...COMMON,
  id: 'cloze.condition.if.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 5,
  items: [
    {
      target: '시간이 ___ 같이 가요.',
      native: "If you have time, let's go together.",
      answer: '있으면',
      hint: '있다 ends in ㅆ (consonant) → 있 + 으면.',
      distractors: ['있면', '있어서', '있고'],
    },
    {
      target: '비가 ___ 집에 있어요.',
      native: "When it rains, I stay home.",
      answer: '오면',
      hint: '오다 is vowel-final → just 면.',
      distractors: ['오으면', '와서', '온다'],
    },
    {
      target: '한국에 ___ 김밥을 꼭 드세요.',
      native: "If you go to Korea, please try kimbap.",
      answer: '가면',
      hint: '가다 → 가 + 면.',
      distractors: ['가아면', '갈면', '가서'],
    },
    {
      target: '피곤___ 좀 쉬세요.',
      native: "If you are tired, rest a bit.",
      answer: '하면',
      hint: '피곤하다 stem 피곤하- + 면.',
      distractors: ['해서', '한다면', '한'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.condition.if.umbrella.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 5,
  mode: 'dialogue',
  title: 'Maybe take an umbrella',
  turns: [
    {
      speaker: '엄마',
      target: '오늘 비가 오면 우산을 가져 가세요.',
      native: 'If it rains today, take an umbrella.',
      glosses: [
        { target: '비가 오면', native: 'if it rains' },
        { target: '우산', native: 'umbrella' },
        { target: '가져 가세요', native: 'please take', note: 'command — -(으)면 is fine before commands' },
      ],
    },
    {
      speaker: 'Alex',
      target: '네. 시간이 있으면 빵도 사 올까요?',
      native: 'Okay. If I have time, shall I also buy bread?',
      glosses: [
        { target: '있으면', native: 'if I have' },
        { target: '빵', native: 'bread' },
        { target: '사 올까요', native: 'shall I buy and come' },
      ],
    },
    {
      speaker: '엄마',
      target: '좋아요. 그리고 피곤하면 일찍 와요.',
      native: 'Good. And if you are tired, come home early.',
      glosses: [
        { target: '피곤하면', native: 'if (you are) tired' },
        { target: '일찍', native: 'early' },
      ],
    },
    {
      speaker: 'Alex',
      target: '네, 알겠어요. 다녀올게요!',
      native: "Okay, got it. I'll be back!",
      glosses: [
        { target: '알겠어요', native: 'understood' },
        { target: '다녀올게요', native: "I'll go and come back", note: 'standard phrase when leaving home' },
      ],
    },
  ],
  comprehensionQuestions: [
    'What should Alex take if it rains?',
    'What does Alex offer to buy if there is time?',
    'What should Alex do if tired?',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.condition.if.slots.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 4,
  fillerConceptIds: [
    'lexeme.rain', 'lexeme.snow', 'lexeme.tired', 'lexeme.hungry',
    'lexeme.busy', 'lexeme.sick', 'lexeme.study', 'lexeme.exercise', 'lexeme.rest',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.condition.if.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '비가 오면',
      native: 'if it rains',
      focusSounds: ['오면: /o-myeon/ — single fluid sound'],
    },
    {
      target: '있으면',
      native: 'if (you / there) have',
      focusSounds: ['있으: ㅆ + ㅡ → /i-sseu/', '있으면 → /isseumyeon/'],
    },
    {
      target: '피곤하면',
      native: 'if (you are) tired',
      focusSounds: ['하면: /ha-myeon/ — link smoothly'],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.condition.if.eu-link.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 3,
  pairs: [
    {
      a: '먹으면',
      b: '먹면',
      contrast: 'with 으 link vs without — only 먹으면 is correct after a consonant-final stem; 먹면 is ungrammatical.',
    },
    {
      a: '오면',
      b: '오으면',
      contrast: 'no 으 vs added 으 — only 오면 is correct after a vowel-final stem; 오으면 is ungrammatical.',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
