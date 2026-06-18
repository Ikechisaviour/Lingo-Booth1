/**
 * "Because V/A, ..." — -아/어서
 *
 * Concept: pattern.reason.because
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.reason.because';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: [],
  function: FUNCTIONS.REASON,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.reason.because.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 4,
  l1Pattern: 'English: "Because [reason], [result]"  (or "[result] because [reason]")',
  l2Pattern: 'Korean: "[reason]-아/어서 [result]" — reason always comes first',
  explanation:
    'Korean does not put "because" in a separate word. You take the reason verb / adjective, ' +
    'conjugate it to -아/어 form, and attach 서. The reason clause ALWAYS comes first. Critical ' +
    'rule: -아/어서 cannot take past or future tense on the reason clause. To say "because I ' +
    'WAS tired", the reason verb still goes in plain -아/어서 form — the tense lives on the ' +
    'main verb. Also: do not use -아/어서 with commands or suggestions — use -(으)니까 for those.',
  commonMistakes: [
    'WRONG: "어제 피곤했어서 못 갔어요" (past tense on the reason). ' +
      'RIGHT: "어제 피곤해서 못 갔어요" — past tense stays on the main verb only.',
    'WRONG: "비가 와서 우산을 가져 가세요!" (using -아/어서 with a command). ' +
      'RIGHT: "비가 오니까 우산을 가져 가세요!" — commands take -(으)니까.',
    'WRONG: "배고프어서" (mechanically adding 어서). ' +
      'RIGHT: "배고파서" — 배고프다 conjugates 으-deletion + 아 vowel harmony.',
  ],
};

const pattern = {
  ...COMMON,
  id: 'pattern.reason.because.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 9,
  patternTarget: '{filler}-아/어서, ...',
  patternGloss: 'Because [reason], [result]',
  anchors: [
    {
      target: '피곤해서 일찍 잤어요.',
      native: 'I went to bed early because I was tired.',
      gloss: '피곤하(tired)+아/어서 | 일찍(early) | 잤어요(slept)',
    },
    {
      target: '배가 고파서 김밥을 먹었어요.',
      native: 'I ate kimbap because I was hungry.',
      gloss: '배고프(hungry)+아서 | 김밥(kimbap)+을 | 먹었어요(ate)',
    },
    {
      target: '비가 와서 집에 있어요.',
      native: "It's raining, so I'm staying home.",
      gloss: '비가(rain) 오(come)+아서 | 집에(at home) | 있어요(am)',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.EMOTION,
      fillerConceptIds: ['lexeme.tired', 'lexeme.hungry', 'lexeme.busy', 'lexeme.sick', 'lexeme.happy'],
      promptTemplate: 'I will give you a state ({filler}). Give a reason-clause with -아/어서 and any natural result.',
    },
    {
      slot: SLOT_CATEGORIES.ACTION,
      fillerConceptIds: ['lexeme.work', 'lexeme.study', 'lexeme.exercise'],
      promptTemplate: 'Use {filler} as the reason; finish with any result.',
    },
    {
      slot: SLOT_CATEGORIES.WEATHER,
      fillerConceptIds: ['lexeme.rain', 'lexeme.snow'],
      promptTemplate: 'Start with "{filler}-아/어서…" then say a consequence.',
    },
  ],
  productionTask:
    'I will say a reason word (tired / hungry / rain / etc.). Make a "because" sentence: ' +
    'reason + 아/어서 + a natural result. Keep tense on the main verb, not the reason clause.',
};

const cloze = {
  ...COMMON,
  id: 'cloze.reason.because.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 5,
  items: [
    {
      target: '피곤___ 일찍 잤어요.',
      native: 'I went to bed early because I was tired.',
      answer: '해서',
      hint: '피곤하다 stem + 아/어서 → 해서 (하-irregular).',
      distractors: ['했어서', '하니까', '하고'],
    },
    {
      target: '배가 ___ 김밥을 먹었어요.',
      native: 'I was hungry, so I ate kimbap.',
      answer: '고파서',
      hint: '배고프다 → 으-deletion + 아 → 고파서.',
      distractors: ['고프어서', '고프니까', '고픈데'],
    },
    {
      target: '비가 ___ 집에 있어요.',
      native: "It's raining so I'm staying home.",
      answer: '와서',
      hint: '오다 → 와 + 서.',
      distractors: ['오아서', '왔어서', '오니까'],
    },
    {
      target: '바빠서 못 ___.',
      native: "I was busy, so I couldn't go.",
      answer: '갔어요',
      hint: 'Tense goes on the main verb only.',
      distractors: ['갔어서요', '가서요', '가요'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.reason.because.late-text.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 5,
  mode: 'dialogue',
  title: 'Sorry I am late',
  turns: [
    {
      speaker: '하늘',
      target: '왜 늦었어요?',
      native: 'Why are you late?',
      glosses: [
        { target: '왜', native: 'why' },
        { target: '늦었어요', native: 'were late' },
      ],
    },
    {
      speaker: 'Alex',
      target: '미안해요. 비가 너무 많이 와서 지하철이 늦었어요.',
      native: "Sorry. It was raining so heavily that the subway was late.",
      glosses: [
        { target: '너무 많이', native: 'too much / heavily' },
        { target: '와서', native: 'because it came / fell', note: '비가 오다 → 와서' },
        { target: '지하철', native: 'subway' },
      ],
    },
    {
      speaker: '하늘',
      target: '괜찮아요. 저도 어제 바빠서 못 왔어요.',
      native: "It's okay. I was busy yesterday so I couldn't come either.",
      glosses: [
        { target: '괜찮아요', native: "it's okay" },
        { target: '바빠서', native: 'because (I was) busy' },
      ],
    },
    {
      speaker: 'Alex',
      target: '아, 그래요? 그럼 오늘 같이 저녁 먹어요.',
      native: "Oh, really? Then let's eat dinner together today.",
      glosses: [
        { target: '같이', native: 'together' },
        { target: '저녁 먹어요', native: "let's eat dinner" },
      ],
    },
  ],
  comprehensionQuestions: [
    'Why was Alex late?',
    'Why was 하늘 busy yesterday?',
    'What does Alex suggest at the end?',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.reason.because.slots.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 4,
  fillerConceptIds: [
    'lexeme.tired', 'lexeme.hungry', 'lexeme.busy', 'lexeme.sick',
    'lexeme.happy', 'lexeme.rain', 'lexeme.snow', 'lexeme.work', 'lexeme.study',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.reason.because.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '피곤해서',
      native: 'because (I am) tired',
      focusSounds: ['피곤: /pi-gon/', '해서: /hae-seo/ — link 해 to 서'],
    },
    {
      target: '배가 고파서',
      native: 'because (I am) hungry',
      focusSounds: ['고파서: 으-irregular gives /go-pa-seo/'],
    },
    {
      target: '비가 와서',
      native: 'because it is raining',
      focusSounds: ['와서: /wa-seo/ — careful with the ㅘ glide'],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.reason.because.aspirated.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 3,
  pairs: [
    {
      a: '피곤',
      b: '비곤',
      contrast: 'aspirated ㅍ vs lax ㅂ — only 피곤 (tired) is a real word.',
    },
    {
      a: '바빠서',
      b: '바파서',
      contrast: 'tense ㅃ vs aspirated ㅍ in 바쁘다 (busy) → 바빠서.',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
