/**
 * Impossibility — 못 + V
 *
 * Concept: pattern.negation.mot
 *
 * 못 marks IMPOSSIBILITY — "I can't" because of an external block, lack of
 * skill, or lack of permission. Same placement as 안 (immediately before the
 * verb, splits 하다 compounds). The split between 안 and 못 is conceptual,
 * not grammatical: 안 = "don't / won't" (choice or habit); 못 = "can't"
 * (something prevents you). Korean uses 못 far more freely than English
 * uses "can't" — even simple inability (no time, no money, can't reach)
 * triggers 못 rather than 안.
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.negation.mot';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: ['pattern.negation.an'],
  function: FUNCTIONS.NEGATION,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.negation.mot.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 5,
  l1Pattern: 'English splits two negations across very different words: "don\'t / won\'t" (choice) vs "can\'t" (inability).',
  l2Pattern: 'Korean uses two SHORT particles with parallel placement: 안 (don\'t / won\'t) vs 못 (can\'t). Both sit right before the verb.',
  explanation:
    '못 means an external block stops you from doing the verb. Use it when ' +
    '(a) you lack the skill ("저는 수영 못 해요" — "I can\'t swim"), ' +
    '(b) something prevents you ("바빠서 못 가요" — "I can\'t go because I\'m busy"), ' +
    '(c) you\'re not allowed ("미성년자는 술을 못 마셔요" — "minors can\'t drink alcohol"). ' +
    '안 means you choose not to OR it\'s a habit. ' +
    'Same placement rules as 안: 못 hugs the verb, 하다 compounds split (운동 못 해요). ' +
    'There\'s also a long form V-지 못하다 ("운동하지 못해요") that\'s more formal/written — you\'ll meet it at A2.',
  commonMistakes: [
    'WRONG: "저는 안 수영해요" when you mean you don\'t know how. RIGHT: "저는 수영 못 해요" — inability calls for 못, not 안. (Plus split: 수영하다 → 수영 + 못 + 해요.)',
    'WRONG: "못 안 가요" or "안 못 가요" (stacking). RIGHT: pick one — they\'re alternatives, not modifiers.',
    'WRONG: "저는 안 있어요" (using 안 with 있다). 못 도 안 됨. RIGHT: "저는 없어요" — 있다\'s negation is always 없다, never 안 / 못.',
    'WRONG: Reaching for 못 every time something fails in English. RIGHT: "I didn\'t do it (forgot)" is "안 했어요" (I didn\'t do it / I didn\'t bother); "I couldn\'t do it (was prevented)" is "못 했어요".',
  ],
  culturalNote: {
    text:
      'Saying "오늘은 못 가요" ("I can\'t go today, sorry") is a more polite, face-saving way to decline than "안 가요". 못 implies "circumstances prevent me", which the listener can\'t reasonably push back on; 안 sounds more like a personal choice and invites "why?". Beginners who default to 안 can come across as standoffish; defaulting to 못 with a soft tone is the safer social move.',
    example: 'Invitation: 같이 갈래요?  Polite decline: 죄송해요, 오늘은 못 가요. (vs the abrupt 안 가요.)',
  },
};

const pattern = {
  ...COMMON,
  id: 'pattern.negation.mot.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 7,
  patternTarget: '… 못 {verb}요',
  patternGloss: 'I/you/we can\'t {verb}',
  anchors: [
    {
      target: '저는 수영 못 해요.',
      romanization: 'jeoneun suyeong mot haeyo.',
      native: 'I can\'t swim.',
      gloss: '저는 | 수영(swimming) + 못 + 해요 — split 하다 compound, inability',
    },
    {
      target: '오늘은 못 가요.',
      romanization: 'oneur-eun mot gayo.',
      native: 'I can\'t go today.',
      gloss: '오늘+은(TOPIC) | 못(impossibility) + 가요',
    },
    {
      target: '한국어를 잘 못 해요.',
      romanization: 'hangug-eo-reul jal mot haeyo.',
      native: 'I can\'t do Korean well. (= My Korean isn\'t good.)',
      gloss: '한국어(Korean)+를(OBJ) | 잘(well) | 못 + 해요 — common self-deprecating phrase',
    },
    {
      target: '돈이 없어서 못 사요.',
      romanization: 'don-i eopseoseo mot sayo.',
      native: 'I can\'t buy it because I have no money.',
      gloss: '돈이 없어서(because no money) | 못 + 사요(buy)',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.ACTION,
      fillerConceptIds: ['lexeme.swim', 'lexeme.cook', 'lexeme.drive', 'lexeme.sing'],
      promptTemplate: 'Say "I can\'t {filler}." Most of these are 하다 compounds — split for 못: NOUN + 못 + 해요.',
    },
    {
      slot: SLOT_CATEGORIES.ACTION,
      fillerConceptIds: ['lexeme.go', 'lexeme.come', 'lexeme.see', 'lexeme.read', 'lexeme.eat'],
      promptTemplate: 'Say "I can\'t {filler} today." Pattern: 오늘은 못 + verb-요.',
    },
    {
      slot: SLOT_CATEGORIES.PLACE,
      fillerConceptIds: ['lexeme.school', 'lexeme.cafe', 'lexeme.library', 'lexeme.park'],
      promptTemplate: 'Say "I can\'t go to {filler}." Pattern: {filler}에 못 가요.',
    },
    {
      slot: SLOT_CATEGORIES.FOOD,
      fillerConceptIds: ['lexeme.kimchi', 'lexeme.bibimbap', 'lexeme.tteokbokki'],
      promptTemplate: 'Say "I can\'t eat {filler}." Pattern: 저는 {filler}을/를 못 먹어요. (Useful for allergies or spice tolerance.)',
    },
  ],
  productionTask:
    'I will name a skill you don\'t have, a place you can\'t reach today, or a thing you can\'t do. ' +
    'Respond in polite -요 form using 못. Use 안 ONLY if the meaning is "I choose not to" — otherwise default to 못.',
};

const cloze = {
  ...COMMON,
  id: 'cloze.negation.mot.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 5,
  items: [
    {
      target: '저는 수영 ___ 해요.',
      native: 'I can\'t swim.',
      answer: '못',
      hint: 'Inability — split 하다 compound.',
      distractors: ['안', '아니', '없'],
    },
    {
      target: '오늘은 ___ 가요. 좀 바빠요.',
      native: 'I can\'t go today. I\'m a bit busy.',
      answer: '못',
      hint: 'Something is preventing you (busy).',
      distractors: ['안', '아니', '없어요'],
    },
    {
      target: '돈이 없어서 ___ 사요.',
      native: 'I can\'t buy it because I have no money.',
      answer: '못',
      hint: 'An external block (no money).',
      distractors: ['안', '아니', '없'],
    },
    {
      target: '저는 운동 ___ 해요. 시간이 없어요.',
      native: 'I can\'t exercise. I don\'t have time.',
      answer: '못',
      hint: 'Same lesson: split + 못.',
      distractors: ['안', '못 해', '못 안'],
    },
    {
      target: '저는 김치를 ___ 먹어요. 안 좋아해요.',
      native: 'I don\'t eat kimchi. I don\'t like it.',
      answer: '안',
      hint: 'Choice / preference, not inability.',
      distractors: ['못', '못 해', '없어요'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.negation.mot.cant-make-it.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 5,
  mode: 'dialogue',
  title: "Can't make it",
  turns: [
    {
      speaker: '민호',
      target: '주말에 시간 있어요? 같이 영화 봐요.',
      romanization: 'jumar-e shigan isseoyo? gachi yeonghwa bwayo.',
      native: 'Do you have time on the weekend? Let\'s watch a movie together.',
      glosses: [
        { target: '주말에', native: 'on the weekend' },
        { target: '같이', native: 'together' },
        { target: '영화 봐요', native: 'watch a movie' },
      ],
    },
    {
      speaker: '사라',
      target: '아, 죄송해요. 주말에는 못 가요.',
      romanization: 'a, joesong-haeyo. jumar-e-neun mot gayo.',
      native: 'Oh, I\'m sorry. I can\'t go on the weekend.',
      glosses: [
        { target: '죄송해요', native: 'sorry (more formal than 미안해요)' },
        { target: '주말에는', native: 'on the weekend (with contrastive 는)' },
      ],
    },
    {
      speaker: '민호',
      target: '왜요? 일해요?',
      romanization: 'wae-yo? ir-haeyo?',
      native: 'Why? Are you working?',
      glosses: [
        { target: '왜요?', native: 'why (with the polite tag 요)' },
        { target: '일해요?', native: 'do you work / are you working?' },
      ],
    },
    {
      speaker: '사라',
      target: '네, 토요일은 일해요. 그리고 일요일에 친구가 와요.',
      romanization: 'ne, toyoir-eun ir-haeyo. geurigo iryoir-e chinguga wayo.',
      native: 'Yes, Saturday I work. And on Sunday a friend is coming.',
      glosses: [
        { target: '토요일', native: 'Saturday' },
        { target: '일요일', native: 'Sunday' },
      ],
    },
    {
      speaker: '민호',
      target: '아 그래요? 그럼 다음 주는 어때요?',
      romanization: 'a geuraeyo? geureom daeum ju-neun eottaeyo?',
      native: 'Oh, is that so? Then how about next week?',
      glosses: [
        { target: '그래요?', native: 'is that so?' },
        { target: '다음 주', native: 'next week' },
        { target: '어때요?', native: 'how is it / how about?' },
      ],
    },
    {
      speaker: '사라',
      target: '네! 다음 주에는 시간 있어요!',
      romanization: 'ne! daeum ju-e-neun shigan isseoyo!',
      native: 'Yes! Next week I have time!',
      glosses: [],
    },
  ],
  comprehensionQuestions: [
    'Why does Sarah say "못 가요" instead of "안 가요"?',
    'What two things prevent Sarah from going?',
    'When does Sarah say she\'ll be free?',
    'Translate "I can\'t come on Saturday."',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.negation.mot.inability.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 4,
  fillerConceptIds: [
    'lexeme.swim', 'lexeme.cook', 'lexeme.drive', 'lexeme.sing',
    'lexeme.go', 'lexeme.come', 'lexeme.see', 'lexeme.read', 'lexeme.eat',
    'lexeme.school', 'lexeme.cafe', 'lexeme.library',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.negation.mot.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '못 가요',
      romanization: 'mot gayo',
      native: 'can\'t go',
      focusSounds: [
        '못: the final ㅅ is pronounced as a held ㄷ (no release) → /mot̚/',
        'before a soft consonant (ㄱ in 가), the held ㄷ becomes a tense /tk/ blend → sounds almost like /mot-kka-yo/',
      ],
    },
    {
      target: '못 먹어요',
      romanization: 'mot meogeoyo',
      native: 'can\'t eat',
      focusSounds: [
        '못 먹: ㅅ batchim assimilates with following ㅁ → /mon-meo/, NOT /mot-meo/',
        'this assimilation is automatic — listen for it in fast speech',
      ],
    },
    {
      target: '수영 못 해요',
      romanization: 'suyeong mot haeyo',
      native: 'can\'t swim',
      focusSounds: [
        '수영: smooth /su-yeong/, ㅇ batchim is the nasal /ng/',
        '못 해요: ㅅ batchim + ㅎ → tense /t-h/ → reads as /mo-tae-yo/ in fast speech',
      ],
    },
    {
      target: '한국어를 잘 못 해요',
      romanization: "hangugeo-reul jal mot haeyo",
      native: "I can't do Korean well",
      focusSounds: [
        'a common chunk — practice as one unit',
        '잘 못 해요: smooth flow, slight pause is fine after 잘',
      ],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.negation.mot.an-vs-mot.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 3,
  pairs: [
    {
      a: '안 가요',
      b: '못 가요',
      contrast: 'Choice (won\'t / don\'t) vs inability (can\'t). Same grammar, different meaning. The most important A1 negation distinction.',
    },
    {
      a: '못 해요',
      b: '안 해요',
      contrast: '"Can\'t do it" vs "don\'t do it / won\'t do it". Same lesson at the verb level.',
    },
    {
      a: '수영 못 해요',
      b: '수영 안 해요',
      contrast: '"I can\'t swim (don\'t know how)" vs "I don\'t swim (choice / habit)". Choose by intent.',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
