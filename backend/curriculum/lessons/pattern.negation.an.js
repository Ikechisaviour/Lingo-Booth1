/**
 * Short negation — 안 + V/A
 *
 * Concept: pattern.negation.an
 *
 * 안 is the everyday "not" — placed IMMEDIATELY before the verb/adjective:
 * "저는 안 가요" ("I don't go"). It's the conversational default. There's
 * also a long-form negation -지 않다 ("저는 가지 않아요") that's more
 * formal/written; learners meet it at A2. For A1, 안 covers ~95% of needs.
 * Two gotchas: compound 하다-verbs split ("공부 안 해요", not "안 공부해요"),
 * and the descriptive verb 있다 has its own negative form 없다 (don't say
 * "안 있다").
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.negation.an';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: [],
  function: FUNCTIONS.NEGATION,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.negation.an.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 4,
  l1Pattern: 'English uses an auxiliary "do/does/did + not" — "I don\'t eat", "She doesn\'t come". The negation lives in the auxiliary.',
  l2Pattern: 'Korean drops a single word 안 in front of the verb: "저는 안 먹어요", "사라는 안 와요". No auxiliary.',
  explanation:
    'Place 안 right before the verb or adjective. Order matters: 안 hugs the verb. Subject + object + 안 + verb. ' +
    'Two important wrinkles: ' +
    '(1) Compound verbs built on 하다 — like 공부하다 (to study), 운동하다 (to exercise) — SPLIT for negation. Put 안 between the noun part and 하다: "공부 안 해요", not "안 공부해요". ' +
    '(2) The existence verb 있다 has its own negative form: 없다. Say "물이 없어요", never "물이 안 있어요" (the latter is ungrammatical).',
  commonMistakes: [
    'WRONG: "안 공부해요" (treating 공부하다 as a single unit). RIGHT: "공부 안 해요" — split the 하다 compound.',
    'WRONG: "물이 안 있어요" (using 안 with 있다). RIGHT: "물이 없어요" — 있다 has its own negative 없다.',
    'WRONG: "저는 먹어요 안" (placing 안 after the verb). RIGHT: "저는 안 먹어요" — 안 always comes BEFORE the verb.',
    'WRONG: "저는 안 학생이에요" (using 안 with the copula). RIGHT: "저는 학생이 아니에요" — the copula 이에요/예요 has a separate negative form 아니에요. Don\'t use 안 with it.',
  ],
  culturalNote: {
    text:
      'A flat "안 가요" ("I\'m not going") can sound abrupt in Korean — like a curt refusal. In real conversation, soften with a connector: "오늘은 안 가요" ("I\'m not going TODAY", using 은 for contrast) or add a reason ("좀 바빠서 안 가요" — "I\'m a bit busy so I\'m not going"). Beginners who just say "안 가요" can come across as cold.',
    example: 'A: 같이 갈래요?  B (abrupt): 안 가요.  B (softer): 오늘은 좀 바빠서요.',
  },
};

const pattern = {
  ...COMMON,
  id: 'pattern.negation.an.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 7,
  patternTarget: '… 안 {verb}요',
  patternGloss: 'I/you/we don\'t {verb}',
  anchors: [
    {
      target: '저는 안 가요.',
      romanization: 'jeoneun an gayo.',
      native: 'I don\'t go.',
      gloss: '저는(TOPIC) | 안(NEG) + 가요(go)',
    },
    {
      target: '오늘은 안 먹어요.',
      romanization: 'oneur-eun an meogeoyo.',
      native: 'Today I\'m not eating.',
      gloss: '오늘(today)+은(TOPIC, contrast) | 안 + 먹어요',
    },
    {
      target: '저는 공부 안 해요.',
      romanization: 'jeoneun gongbu an haeyo.',
      native: 'I don\'t study.',
      gloss: '저는 | 공부(study) + 안 + 해요 — split 하다 compound',
    },
    {
      target: '사라는 안 와요.',
      romanization: 'sara-neun an wayo.',
      native: 'Sarah isn\'t coming.',
      gloss: '사라(Sarah)+는 | 안 + 와요(comes)',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.ACTION,
      fillerConceptIds: ['lexeme.eat', 'lexeme.drink', 'lexeme.go', 'lexeme.see', 'lexeme.sleep'],
      promptTemplate: 'Say "I don\'t {filler}." Pattern: 저는 안 + the polite -요 form of {filler}. Use the regular (non-compound) form.',
    },
    {
      slot: SLOT_CATEGORIES.ACTION,
      fillerConceptIds: ['lexeme.study', 'lexeme.work', 'lexeme.exercise', 'lexeme.travel'],
      promptTemplate: 'Say "I don\'t {filler}." These are 하다 compound verbs — split the 안: NOUN + 안 + 해요.',
    },
    {
      slot: SLOT_CATEGORIES.TIME,
      fillerConceptIds: ['lexeme.today', 'lexeme.tomorrow', 'lexeme.weekend', 'lexeme.morning'],
      promptTemplate: 'Say "On {filler}, I don\'t go." Pattern: {filler}에는 안 가요. Note the topic 은 for contrastive flavor.',
    },
    {
      slot: SLOT_CATEGORIES.FOOD,
      fillerConceptIds: ['lexeme.kimchi', 'lexeme.bibimbap', 'lexeme.tteokbokki'],
      promptTemplate: 'Say "I don\'t eat {filler}." Pattern: 저는 {filler}을/를 안 먹어요. Pick the object marker by batchim.',
    },
  ],
  productionTask:
    'I will give you a verb (or a noun + 하다 verb) in English plus an optional time. ' +
    'Produce a negative sentence in polite -요 form. ' +
    'Remember: 안 hugs the verb; 하다 compounds split; 있다 → 없다, never 안 있다.',
};

const cloze = {
  ...COMMON,
  id: 'cloze.negation.an.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 5,
  items: [
    {
      target: '저는 ___ 가요.',
      native: 'I don\'t go.',
      answer: '안',
      hint: 'Negation particle placed before the verb.',
      distractors: ['못', '아니', '없'],
    },
    {
      target: '저는 공부 ___ 해요.',
      native: 'I don\'t study.',
      answer: '안',
      hint: 'Split 하다 compound; 안 goes between the noun and 해요.',
      distractors: ['못', '안 해', '아니'],
    },
    {
      target: '물이 ___.',
      native: 'There is no water.',
      answer: '없어요',
      hint: 'Not 안 있어요 — 있다\'s own negative.',
      distractors: ['안 있어요', '못 있어요', '아니예요'],
    },
    {
      target: '저는 학생이 ___.',
      native: 'I am not a student.',
      answer: '아니에요',
      hint: 'Copula negation — not 안.',
      distractors: ['안 이에요', '없어요', '안 학생이에요'],
    },
    {
      target: '오늘은 ___ 운동해요.',
      native: 'I\'m not exercising today.',
      answer: '운동 안',
      hint: '운동하다 splits for negation.',
      distractors: ['안 운동', '안', '못 운동'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.negation.an.busy-day.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 5,
  mode: 'dialogue',
  title: 'Busy day',
  turns: [
    {
      speaker: '민호',
      target: '오늘 카페에 가요?',
      romanization: 'oneul kape-e gayo?',
      native: 'Are you going to the café today?',
      glosses: [
        { target: '오늘', native: 'today' },
        { target: '카페에 가요', native: 'go to the café' },
      ],
    },
    {
      speaker: '사라',
      target: '아니요, 안 가요. 좀 바빠요.',
      romanization: 'aniyo, an gayo. jom bappayo.',
      native: 'No, I\'m not going. I\'m a bit busy.',
      glosses: [
        { target: '좀', native: 'a bit' },
        { target: '바빠요', native: 'is busy' },
      ],
    },
    {
      speaker: '민호',
      target: '내일은요? 운동해요?',
      romanization: 'naeireun-yo? undong-haeyo?',
      native: 'How about tomorrow? Are you exercising?',
      glosses: [
        { target: '내일', native: 'tomorrow' },
        { target: '은요?', native: '"and what about?" — tag for follow-up questions' },
      ],
    },
    {
      speaker: '사라',
      target: '내일도 운동 안 해요. 친구가 와요.',
      romanization: 'naeil-do undong an haeyo. chinguga wayo.',
      native: 'I\'m not exercising tomorrow either. A friend is coming.',
      glosses: [
        { target: '도', native: 'also / either' },
        { target: '운동 안 해요', native: 'don\'t exercise — split 하다 compound' },
      ],
    },
    {
      speaker: '민호',
      target: '아, 시간이 없어요?',
      romanization: 'a, shigan-i eopseoyo?',
      native: 'Ah, you have no time?',
      glosses: [
        { target: '시간이 없어요', native: 'there is no time — 없다, not 안 있다' },
      ],
    },
    {
      speaker: '사라',
      target: '네, 이번 주는 시간이 없어요!',
      romanization: 'ne, ibeon ju-neun shigan-i eopseoyo!',
      native: 'Yeah, this week I have no time!',
      glosses: [
        { target: '이번 주', native: 'this week' },
      ],
    },
  ],
  comprehensionQuestions: [
    'Why does Sarah split "운동 안 해요" instead of saying "안 운동해요"?',
    'When Minho asks if Sarah has no time, why does Sarah say "시간이 없어요" instead of "시간이 안 있어요"?',
    'Translate "I don\'t go to the café today."',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.negation.an.actions.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 4,
  fillerConceptIds: [
    'lexeme.eat', 'lexeme.drink', 'lexeme.go', 'lexeme.see', 'lexeme.sleep',
    'lexeme.study', 'lexeme.work', 'lexeme.exercise', 'lexeme.travel',
    'lexeme.today', 'lexeme.tomorrow', 'lexeme.weekend',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.negation.an.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '안 가요',
      romanization: 'an gayo',
      native: 'don\'t go',
      focusSounds: [
        '안: short /an/, ㄴ batchim is clipped — do NOT blend into 가',
        '가요: light /ga-yo/',
      ],
    },
    {
      target: '안 먹어요',
      romanization: 'an meogeoyo',
      native: 'don\'t eat',
      focusSounds: [
        '안 먹: ㄴ batchim links into ㅁ → /an-meo/, slight nasal blend',
        '먹어요: ㄱ batchim of 먹 links into 어 → /meo-geo-yo/',
      ],
    },
    {
      target: '공부 안 해요',
      romanization: 'gongbu an haeyo',
      native: "don't study",
      focusSounds: [
        '공부: smooth /gong-bu/, both syllables light',
        'pause before 안 — slight separation when splitting a 하다 compound',
        '해요: ㅎ is light, almost /ae-yo/ in fast speech',
      ],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.negation.an.placement.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 3,
  pairs: [
    {
      a: '안 가요',
      b: '못 가요',
      contrast: 'Won\'t go (choice / habit) vs can\'t go (impossibility / external block). Both grammatical, different meaning.',
    },
    {
      a: '공부 안 해요',
      b: '안 공부해요',
      contrast: 'Correct split vs wrong placement. 공부하다 must split for negation — the second form is what beginners produce by analogy with English.',
    },
    {
      a: '없어요',
      b: '안 있어요',
      contrast: '있다\'s real negative form vs the ungrammatical analogy. Only 없어요 is correct.',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
