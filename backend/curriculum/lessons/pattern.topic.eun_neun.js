/**
 * Topic marker — 은 / 는 ("as for X")
 *
 * Concept: pattern.topic.eun_neun
 *
 * 은/는 is the most-asked-about particle in beginner Korean. It marks the
 * TOPIC of a sentence — the thing the speaker is talking ABOUT. It's not a
 * subject marker (that's 이/가) and not an object marker (that's 을/를). It
 * carries a comparative or contrastive flavor: "AS FOR me, I'm a student
 * (other people might be teachers)". Choice between 은 and 는 follows the
 * same batchim rule as the copula: consonant → 은, vowel → 는.
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.topic.eun_neun';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: ['pattern.identification.be'],
  function: FUNCTIONS.DESCRIPTION,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.topic.eun_neun.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 5,
  l1Pattern: 'English has no grammatical "topic" marker — word order and intonation do that work ("As for me, I…", or just emphasis: "I am a student.").',
  l2Pattern: 'Korean uses 은 / 는 as a topic particle attached AFTER the noun: 저는, 학생은, 사라는.',
  explanation:
    'Korean asks: "what is this sentence ABOUT?" That noun gets 은 (after a consonant) or 는 (after a vowel). Once a topic is set, you can drop it from later sentences until the topic changes. ' +
    '은/는 carries a flavor of contrast or "speaking of…". "저는 학생이에요" implies "I (as for me) am a student" — perhaps inviting comparison ("…and what about you?"). ' +
    'Crucially: 은/는 is NOT the subject. Korean has a separate subject marker 이/가, which you learn next. The two overlap a lot in introductions but diverge fast in real sentences.',
  commonMistakes: [
    'WRONG: "저은 학생이에요" (using -은 after a vowel). RIGHT: "저는 학생이에요". 저 ends in a vowel, so it takes -는.',
    'WRONG: "학생는 책이에요" (using -는 after a consonant). RIGHT: "학생은 책이에요". 학생 ends in ㅇ (a batchim), so it takes -은.',
    'WRONG: Treating every English subject as a topic. RIGHT: 은/는 marks what the conversation is ABOUT, not just "whoever does the action". You\'ll often introduce yourself with 저는 once, then drop it for the next several sentences.',
    'WRONG: "저는 책은 읽어요" with no special meaning intended. RIGHT: Either "저는 책을 읽어요" (book is the object) or "저는 책은 읽어요" only if you mean "as for books, I read them (but not magazines)". Stacking topics carries contrast — don\'t do it accidentally.',
  ],
  culturalNote: {
    text:
      'When you introduce yourself in Korean, you almost always start with 저는 ("as for me"). Skipping it sounds blunt. But once you\'ve set yourself as the topic, you don\'t need to repeat it — Korean omits the subject until the topic changes. This is why a beginner who keeps saying "저는… 저는… 저는…" sounds odd to native speakers.',
    example: '"저는 사라예요. 학생이에요. 미국 사람이에요." (Not "저는 사라예요. 저는 학생이에요. 저는 미국 사람이에요.")',
  },
};

const pattern = {
  ...COMMON,
  id: 'pattern.topic.eun_neun.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 8,
  patternTarget: '{filler}은 / {filler}는 …',
  patternGloss: 'As for {filler}, …',
  anchors: [
    {
      target: '저는 학생이에요.',
      romanization: 'jeoneun haksaeng-ieyo.',
      native: 'I am a student. (vowel + 는)',
      gloss: '저(I)+는(TOPIC) | 학생이에요',
    },
    {
      target: '민호는 의사예요.',
      romanization: 'minho-neun uisa-yeyo.',
      native: 'Minho is a doctor. (vowel + 는)',
      gloss: '민호(Minho)+는 | 의사예요(is a doctor)',
    },
    {
      target: '책은 가방에 있어요.',
      romanization: 'chaeg-eun gabang-e isseoyo.',
      native: 'The book is in the bag. (consonant + 은)',
      gloss: '책(book)+은 | 가방에(in the bag) 있어요',
    },
    {
      target: '한국 사람은 친절해요.',
      romanization: 'hanguk saram-eun chinjeolhaeyo.',
      native: 'Koreans are kind. (consonant + 은)',
      gloss: '한국 사람(Korean person)+은 | 친절하다(to be kind)',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.PERSON,
      fillerConceptIds: ['lexeme.name_sarah', 'lexeme.name_minho', 'lexeme.friend', 'lexeme.teacher'],
      promptTemplate: 'Say "{filler} is a student." Use the correct topic marker after {filler}.',
    },
    {
      slot: SLOT_CATEGORIES.OBJECT,
      fillerConceptIds: ['lexeme.book', 'lexeme.bag', 'lexeme.phone', 'lexeme.water'],
      promptTemplate: 'Say "The {filler} is in the bag." Mark {filler} as the topic.',
    },
    {
      slot: SLOT_CATEGORIES.PLACE,
      fillerConceptIds: ['lexeme.school', 'lexeme.home', 'lexeme.cafe', 'lexeme.library'],
      promptTemplate: 'Say "{filler} is nearby." (가깝다 = to be close) — mark {filler} as the topic.',
    },
  ],
  productionTask:
    'I will give you a person, a thing, or a place in English. Make a Korean sentence with the noun as the TOPIC, ' +
    'using -은 after a consonant or -는 after a vowel. Then say something simple ABOUT it ' +
    '(it\'s tall / nearby / kind / mine — whatever you can manage in polite -요 form).',
};

const cloze = {
  ...COMMON,
  id: 'cloze.topic.eun_neun.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 5,
  items: [
    {
      target: '저___ 한국 사람이에요.',
      native: 'I am Korean.',
      answer: '는',
      hint: '저 ends in a vowel ㅓ.',
      distractors: ['은', '이', '가'],
    },
    {
      target: '학생___ 도서관에 있어요.',
      native: 'The student is in the library.',
      answer: '은',
      hint: '학생 ends in ㅇ batchim.',
      distractors: ['는', '이', '가'],
    },
    {
      target: '사라___ 미국 사람이에요.',
      native: 'Sarah is American.',
      answer: '는',
      hint: '사라 ends in ㅏ.',
      distractors: ['은', '이', '가'],
    },
    {
      target: '책___ 가방에 있어요.',
      native: 'The book is in the bag.',
      answer: '은',
      hint: '책 ends in ㄱ batchim.',
      distractors: ['는', '를', '에'],
    },
    {
      target: '___은 학생이에요.',
      native: 'Minho is a student.',
      answer: '민호',
      hint: 'The name introduced earlier. Note: 민호 actually ends in a vowel — so this trap item has the WRONG particle and you should reject "민호은". Use the version that fits ㄴ-final names if you see one. (If 민호 looks right, that means you read past the batchim — try again.)',
      distractors: ['민호는', '민호가', '저는'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.topic.eun_neun.about-my-family.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 6,
  mode: 'monologue',
  title: 'About my family',
  turns: [
    {
      target: '저는 사라예요. 미국 사람이에요.',
      romanization: 'jeoneun sara-yeyo. miguk saram-ieyo.',
      native: 'I am Sarah. I am American.',
      glosses: [
        { target: '저는', native: 'as for me' },
        { target: '미국 사람', native: 'American person' },
      ],
    },
    {
      target: '아버지는 의사예요. 어머니는 선생님이에요.',
      romanization: 'abeoji-neun uisa-yeyo. eomeoni-neun seonsaengnim-ieyo.',
      native: 'My father is a doctor. My mother is a teacher.',
      glosses: [
        { target: '아버지', native: 'father (more formal than 아빠)' },
        { target: '어머니', native: 'mother (more formal than 엄마)' },
        { target: '선생님', native: 'teacher (with honorific 님)' },
      ],
    },
    {
      target: '동생은 학생이에요. 학교에 가요.',
      romanization: 'dongsaeng-eun haksaeng-ieyo. hakgyo-e gayo.',
      native: 'My younger sibling is a student. They go to school.',
      glosses: [
        { target: '동생', native: 'younger sibling (no gender)' },
        { target: '학교에 가요', native: 'goes to school (location particle 에)' },
      ],
    },
    {
      target: '저는 한국어를 공부해요. 어렵지만 재미있어요.',
      romanization: 'jeoneun hangug-eo-reul gongbuhaeyo. eoryeopjiman jaemiisseoyo.',
      native: 'I study Korean. It\'s hard, but it\'s fun.',
      glosses: [
        { target: '한국어를', native: 'Korean language (OBJECT)' },
        { target: '어렵지만', native: 'although (it\'s) hard' },
        { target: '재미있어요', native: 'is fun / interesting' },
      ],
    },
  ],
  comprehensionQuestions: [
    'How does Sarah introduce her father?',
    'What does Sarah\'s younger sibling do?',
    'In "동생은 학생이에요", why is it 은 and not 는?',
    'Sarah only uses 저는 ONCE in this monologue. Why is that natural in Korean?',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.topic.eun_neun.family-and-roles.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 5,
  fillerConceptIds: [
    'lexeme.student', 'lexeme.teacher', 'lexeme.doctor', 'lexeme.friend',
    'lexeme.korean_person', 'lexeme.american_person',
    'lexeme.name_sarah', 'lexeme.name_minho',
    'lexeme.book', 'lexeme.bag', 'lexeme.phone',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.topic.eun_neun.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '저는',
      romanization: 'jeoneun',
      native: 'as for me',
      focusSounds: [
        '저는 is two syllables, smooth and unstressed: /jeo-neun/',
        'The ㅡ vowel in 는 is the flat-smile vowel — do not round it like English "u" in "but"',
      ],
    },
    {
      target: '학생은 도서관에 있어요',
      romanization: 'haksaeng-eun doseogwan-e isseoyo',
      native: 'The student is in the library',
      focusSounds: [
        '학생은: ㅇ batchim links into 은 → /haek-sae-ngeun/, the ㅇ and the following ㅇ blend',
        '도서관에: ㄴ batchim of 관 + 에 → /gwa-ne/, smooth',
        '있어요: ㅆ batchim is tense; link into 어요 → /i-sseo-yo/',
      ],
    },
    {
      target: '사라는 미국 사람이에요',
      romanization: 'sara-neun miguk saram-ieyo',
      native: 'Sarah is American',
      focusSounds: [
        '사라는: smooth /sa-ra-neun/, no break between 라 and 는',
      ],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.topic.eun_neun.batchim.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 3,
  pairs: [
    {
      a: '저는',
      b: '저은',
      contrast: '저 ends in a vowel — correct: 저는. 저은 is the over-application error from learners who memorize "은" first.',
    },
    {
      a: '학생은',
      b: '학생는',
      contrast: '학생 ends in ㅇ batchim — correct: 학생은. 학생는 is the parallel error from learners who default to "는".',
    },
    {
      a: '책은',
      b: '책이',
      contrast: 'Topic marker (은) vs subject marker (이). 책은 = "as for the book…"; 책이 = "the book (as the subject of an action)". Both grammatical, different meaning.',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
