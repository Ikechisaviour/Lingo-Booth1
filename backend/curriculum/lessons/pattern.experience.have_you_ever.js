/**
 * Vertical slice for the "have you ever" pattern: -아/어 본 적이 있어요?
 *
 * Demonstrates every Curriculum v2 lesson type for a single concept. This
 * file is the reference implementation other lessons should be copied from.
 *
 * Concept: pattern.experience.have_you_ever
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.experience.have_you_ever';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: [],
  function: FUNCTIONS.EXPERIENCE,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.experience.have_you_ever.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 3,
  l1Pattern: 'English: "Have you ever V-ed (object)?"',
  l2Pattern: 'Korean: "(object)-에/를 V-아/어 본 적이 있어요?"',
  explanation:
    'English bolts "have ever" onto an auxiliary verb. Korean instead changes the main ' +
    'verb itself: take the verb stem, attach -아/어, then add the fixed tail "본 적이 ' +
    '있어요?". The object comes BEFORE the verb (SOV order). Three things English ' +
    'speakers must remember: (1) the pattern is one tail you memorize as a chunk — ' +
    'don\'t parse it word by word; (2) the verb form changes, not an auxiliary; ' +
    '(3) for "have you been to X" the verb is 가다 → 가 본 적이 있어요? — same pattern.',
  commonMistakes: [
    'WRONG: "당신은 가지고 있어요 갔어요 제주도?" (literally translating "have you been to Jeju"). ' +
      'RIGHT: "제주도에 가 본 적이 있어요?"',
    'WRONG: "Have 먹어요 김치 ever?" (mixing English word order). ' +
      'RIGHT: "김치를 먹어 본 적이 있어요?"',
    'WRONG: forgetting the 본 — "제주도에 가 적이 있어요?" ' +
      'RIGHT: "제주도에 가 본 적이 있어요?" (the 본 is non-optional in this pattern).',
  ],
};

const pattern = {
  ...COMMON,
  id: 'pattern.experience.have_you_ever.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 8,
  patternTarget: '{filler} V-아/어 본 적이 있어요?',
  patternGloss: 'Have you ever V-ed (the filler)?',
  anchors: [
    {
      target: '제주도에 가 본 적이 있어요?',
      native: 'Have you ever been to Jeju?',
      gloss: '제주도(Jeju)+에(to) | 가(go)+ㅏ본(have-tried) | 적이 있어요?(ever?)',
    },
    {
      target: '김치를 먹어 본 적이 있어요?',
      native: 'Have you ever eaten kimchi?',
      gloss: '김치(kimchi)+를(OBJ) | 먹어(eat)+ㅓ본 | 적이 있어요?',
    },
    {
      target: '한국 영화를 본 적이 있어요?',
      native: 'Have you ever watched a Korean movie?',
      gloss: '한국 영화(Korean movie)+를(OBJ) | 본(watched) | 적이 있어요?',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.PLACE,
      fillerConceptIds: ['lexeme.jeju', 'lexeme.busan', 'lexeme.seoul', 'lexeme.usa', 'lexeme.japan'],
      promptTemplate: 'Ask if I have ever been to {filler}.',
    },
    {
      slot: SLOT_CATEGORIES.FOOD,
      fillerConceptIds: ['lexeme.kimchi', 'lexeme.bibimbap', 'lexeme.tteokbokki', 'lexeme.samgyeopsal'],
      promptTemplate: 'Ask if I have ever eaten {filler}.',
    },
    {
      slot: SLOT_CATEGORIES.ACTION,
      fillerConceptIds: ['lexeme.drive', 'lexeme.sing', 'lexeme.watch_kmovie'],
      promptTemplate: 'Ask if I have ever done: {filler}.',
    },
  ],
  productionTask:
    'I will say a place, food, or action. You ask me, in Korean, whether I have ' +
    'ever been there / eaten it / done it. Use the polite (-요) form.',
};

const cloze = {
  ...COMMON,
  id: 'cloze.experience.have_you_ever.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 5,
  items: [
    {
      target: '제주도에 가 ___ 적이 있어요?',
      native: 'Have you ever been to Jeju?',
      answer: '본',
      hint: 'The verb stem is 가-; add the past-experience marker.',
      distractors: ['간', '가서', '갈'],
    },
    {
      target: '김치를 ___ 본 적이 있어요?',
      native: 'Have you ever eaten kimchi?',
      answer: '먹어',
      hint: 'The verb is 먹다. Conjugate to -아/어 form.',
      distractors: ['먹는', '먹은', '먹고'],
    },
    {
      target: '한국 영화를 본 적이 ___?',
      native: 'Have you ever watched a Korean movie?',
      answer: '있어요',
      hint: 'The tail of this pattern is "(있/없)어요".',
      distractors: ['없어요', '돼요', '해요'],
    },
    {
      target: '운전 ___ 본 적이 있어요?',
      native: 'Have you ever driven?',
      answer: '해',
      hint: 'The verb is 운전하다. The -아/어 form of 하다 is 해.',
      distractors: ['한', '하고', '하는'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.experience.have_you_ever.cafe-chat.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 6,
  mode: 'dialogue',
  title: 'Cafe chat: weekend plans',
  turns: [
    {
      speaker: '민지',
      target: '주말에 뭐 할 거예요?',
      native: 'What are you doing this weekend?',
      glosses: [
        { target: '주말', native: 'weekend' },
        { target: '뭐', native: 'what' },
        { target: '할 거예요', native: 'will do' },
      ],
    },
    {
      speaker: 'Alex',
      target: '제주도에 가려고요. 가 본 적이 있어요?',
      native: "I'm planning to go to Jeju. Have you ever been?",
      glosses: [
        { target: '가려고요', native: "I'm planning to go" },
        { target: '가 본 적이 있어요?', native: 'have you ever been?' },
      ],
    },
    {
      speaker: '민지',
      target: '네, 두 번 가 봤어요! 흑돼지 먹어 본 적이 있어요?',
      native: "Yes, I've been twice! Have you ever eaten heuk-dwaeji (Jeju black pork)?",
      glosses: [
        { target: '두 번', native: 'twice' },
        { target: '흑돼지', native: 'Jeju black pork', note: 'a Jeju specialty' },
        { target: '먹어 본 적이 있어요?', native: 'have you ever eaten?' },
      ],
    },
    {
      speaker: 'Alex',
      target: '아니요, 아직 못 먹어 봤어요. 맛있어요?',
      native: "No, I haven't tried it yet. Is it tasty?",
      glosses: [
        { target: '아직', native: 'not yet' },
        { target: '못 먹어 봤어요', native: "haven't been able to try" },
      ],
    },
    {
      speaker: '민지',
      target: '정말 맛있어요. 꼭 먹어 보세요!',
      native: "Really delicious. You must try it!",
      glosses: [
        { target: '꼭', native: 'definitely / must' },
        { target: '먹어 보세요', native: 'try eating', note: '-아/어 보세요 = try V-ing' },
      ],
    },
  ],
  comprehensionQuestions: [
    'Where is Alex planning to go this weekend?',
    'How many times has 민지 been there?',
    'What food does 민지 recommend?',
    'Has Alex eaten it before?',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.experience.have_you_ever.slots.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 5,
  fillerConceptIds: [
    'lexeme.jeju',
    'lexeme.busan',
    'lexeme.seoul',
    'lexeme.usa',
    'lexeme.japan',
    'lexeme.kimchi',
    'lexeme.bibimbap',
    'lexeme.tteokbokki',
    'lexeme.samgyeopsal',
    'lexeme.drive',
    'lexeme.sing',
    'lexeme.watch_kmovie',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.experience.have_you_ever.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '가 본 적이 있어요?',
      native: 'Have you ever been (there)?',
      focusSounds: ['적 (jeok) — final ㄱ is unreleased', '있 (it) — final ㅆ becomes /t/ before pause'],
    },
    {
      target: '먹어 본 적이 있어요?',
      native: 'Have you ever eaten (it)?',
      focusSounds: ['먹어 — link 먹+어 as /meogeo/, do not insert a glottal break'],
    },
    {
      target: '한국 영화를 본 적이 있어요?',
      native: 'Have you ever watched a Korean movie?',
      focusSounds: ['영화 (yeonghwa) — careful with the ㅎ', '를 (reul) — flap r, not English /r/'],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.experience.have_you_ever.k-series.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 3,
  pairs: [
    {
      a: '가다',
      b: '카다',
      contrast: 'lax ㄱ (g) vs aspirated ㅋ (k) — only the first is a real verb (to go); the second tests perception.',
    },
    {
      a: '적',
      b: '책',
      contrast: 'lax ㅈ (j) vs aspirated ㅊ (ch) — both are real words; "적" is the marker in our pattern, "책" means "book".',
    },
    {
      a: '본',
      b: '뽄',
      contrast: 'lax ㅂ (b) vs tense ㅃ (pp) — only the first is a real word in this pattern.',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
