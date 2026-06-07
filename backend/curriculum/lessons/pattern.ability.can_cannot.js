/**
 * "I can / cannot V" — -(으)ㄹ 수 있다 / -(으)ㄹ 수 없다
 *
 * Concept: pattern.ability.can_cannot
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.ability.can_cannot';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: [],
  function: FUNCTIONS.ABILITY,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.ability.can_cannot.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 3,
  l1Pattern: 'English: "I can V" / "I cannot V"',
  l2Pattern: 'Korean: "V-(으)ㄹ 수 있어요" / "V-(으)ㄹ 수 없어요"',
  explanation:
    'Korean expresses ability with a noun phrase: "(으)ㄹ 수" literally means "the possibility ' +
    'of V-ing". You then say "exists" (있어요) for can, or "does not exist" (없어요) for cannot. ' +
    'The "(으)" links a consonant-final stem to ㄹ. Note also "못" — a short negative adverb ' +
    'that means "cannot (due to inability)". 못 가요 ≈ 갈 수 없어요, but 못 is more colloquial.',
  commonMistakes: [
    'WRONG: "갈 수 안 있어요" (using 안 to negate). ' +
      'RIGHT: "갈 수 없어요" — the negative is built into 없어요, not 안.',
    'WRONG: "할 수 있다요" (mixing dictionary form with polite ending). ' +
      'RIGHT: "할 수 있어요" — conjugate 있다 → 있어요.',
    'WRONG: "수영을 할 수 있어요" with the verb 하다 marked as object. ' +
      'RIGHT: Either "수영할 수 있어요" (verb as one unit) or "수영을 잘 해요" — keep 하다 as a verb.',
  ],
};

const pattern = {
  ...COMMON,
  id: 'pattern.ability.can_cannot.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 8,
  patternTarget: '{filler}-(으)ㄹ 수 있어요 / 없어요',
  patternGloss: 'I can V / I cannot V',
  anchors: [
    {
      target: '한국어를 할 수 있어요.',
      native: 'I can speak Korean.',
      gloss: '한국어(Korean)+를 | 할 수(possibility-to-do) 있어요(exists)',
    },
    {
      target: '매운 음식을 먹을 수 있어요.',
      native: 'I can eat spicy food.',
      gloss: '매운 음식(spicy food)+을 | 먹을 수 있어요',
    },
    {
      target: '내일은 갈 수 없어요.',
      native: "I can't go tomorrow.",
      gloss: '내일은(as for tomorrow) | 갈 수 없어요(cannot-go)',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.ACTION,
      fillerConceptIds: ['lexeme.swim', 'lexeme.cook', 'lexeme.drive', 'lexeme.sing', 'lexeme.read'],
      promptTemplate: 'Say whether you can {filler}.',
    },
    {
      slot: SLOT_CATEGORIES.FOOD,
      fillerConceptIds: ['lexeme.kimchi', 'lexeme.tteokbokki', 'lexeme.samgyeopsal'],
      promptTemplate: 'Say you can / cannot eat {filler}.',
    },
    {
      slot: SLOT_CATEGORIES.PLACE,
      fillerConceptIds: ['lexeme.jeju', 'lexeme.seoul', 'lexeme.busan'],
      promptTemplate: 'Say you can / cannot go to {filler} today.',
    },
  ],
  productionTask:
    'I will say a verb, a food, or a place. State whether you can do it / eat it / go ' +
    'there. Use 있어요 for can, 없어요 for cannot.',
};

const cloze = {
  ...COMMON,
  id: 'cloze.ability.can_cannot.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 5,
  items: [
    {
      target: '한국어를 ___ 수 있어요.',
      native: 'I can speak Korean.',
      answer: '할',
      hint: '하다 (vowel stem) → 할.',
      distractors: ['하는', '한', '해서'],
    },
    {
      target: '매운 음식을 ___ 수 있어요.',
      native: 'I can eat spicy food.',
      answer: '먹을',
      hint: 'consonant-final 먹- + 을.',
      distractors: ['먹는', '먹은', '먹어서'],
    },
    {
      target: '내일은 갈 수 ___.',
      native: "I can't go tomorrow.",
      answer: '없어요',
      hint: 'The "cannot" tail.',
      distractors: ['있어요', '안 돼요', '못 해요'],
    },
    {
      target: '저는 수영___ 수 있어요.',
      native: 'I can swim.',
      answer: '할',
      hint: '수영하다 stem 수영하- → 할.',
      distractors: ['하는', '하서', '해'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.ability.can_cannot.spicy-food.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 5,
  mode: 'dialogue',
  title: 'Can you handle spicy?',
  turns: [
    {
      speaker: '민지',
      target: '매운 음식 먹을 수 있어요?',
      native: 'Can you eat spicy food?',
      glosses: [
        { target: '매운', native: 'spicy' },
        { target: '먹을 수 있어요?', native: 'can you eat?' },
      ],
    },
    {
      speaker: 'Alex',
      target: '네, 먹을 수 있어요. 그런데 너무 매운 건 못 먹어요.',
      native: "Yes, I can. But I can't eat things that are too spicy.",
      glosses: [
        { target: '그런데', native: 'but / however' },
        { target: '너무', native: 'too / very' },
        { target: '못', native: "can't", note: 'short negative — same meaning as ~ㄹ 수 없다' },
      ],
    },
    {
      speaker: '민지',
      target: '떡볶이는요?',
      native: 'What about tteokbokki?',
      glosses: [
        { target: '는요?', native: '… and what about ___?', note: 'topic + polite question particle' },
      ],
    },
    {
      speaker: 'Alex',
      target: '떡볶이는 먹을 수 있어요. 좋아해요!',
      native: 'I can eat tteokbokki. I like it!',
      glosses: [
        { target: '좋아해요', native: 'I like (it)' },
      ],
    },
  ],
  comprehensionQuestions: [
    'Can Alex eat spicy food in general?',
    'What can Alex NOT eat?',
    'How does Alex feel about tteokbokki?',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.ability.can_cannot.slots.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 4,
  fillerConceptIds: [
    'lexeme.swim', 'lexeme.cook', 'lexeme.drive', 'lexeme.sing',
    'lexeme.read', 'lexeme.write', 'lexeme.eat', 'lexeme.go', 'lexeme.exercise',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.ability.can_cannot.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '할 수 있어요',
      native: 'I can do (it)',
      focusSounds: ['할 수: ㄹ + ㅅ → /hal-ssu/ — ㅅ tenses', '있어요: ㅆ links → /isseoyo/'],
    },
    {
      target: '갈 수 없어요',
      native: "I can't go",
      focusSounds: ['없어요: silent ㅂ link to 어 → /eopseoyo/'],
    },
    {
      target: '수영할 수 있어요',
      native: 'I can swim',
      focusSounds: ['수영할: smooth flow, careful with the ㅇ codas (silent)'],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.ability.can_cannot.s-tense.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 3,
  pairs: [
    {
      a: '수',
      b: '쑤',
      contrast: 'lax ㅅ vs tense ㅆ — "수" is the noun used in this pattern; "쑤" tests perception of the tense onset.',
    },
    {
      a: '있어요',
      b: '잇어요',
      contrast: 'ㅆ vs ㅅ at the patchim — "있어요" (to exist) is the real form.',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
