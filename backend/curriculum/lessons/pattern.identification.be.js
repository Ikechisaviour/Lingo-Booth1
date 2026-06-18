/**
 * "I am X / This is X" — 이에요 / 예요 (copula)
 *
 * Concept: pattern.identification.be
 *
 * The single most useful sentence in beginner Korean: "X이에요" / "X예요" =
 * "It is X". One of the first grammar facts a learner must internalize is
 * Korean's batchim-driven allomorphy: a noun ending in a CONSONANT takes
 * -이에요; a noun ending in a VOWEL takes -예요. This pattern is the gateway
 * to topic marking (은/는), subject marking (이/가), and every later sentence
 * built on a noun + descriptor.
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.identification.be';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: [],
  function: FUNCTIONS.IDENTIFICATION,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.identification.be.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 4,
  l1Pattern: 'English: "I am a student" — separate "to be" verb (am/is/are), agreeing with the subject.',
  l2Pattern: 'Korean: "저는 학생이에요" — the copula attaches to the noun. No separate "be" verb floating between them.',
  explanation:
    'English uses a free-standing "be" verb that agrees with the subject (I am, you are, she is). Korean attaches the copula directly to the noun as a suffix: 학생이에요. There is one rule that decides which form: does the noun end in a CONSONANT (a batchim) or a VOWEL? Consonant → -이에요. Vowel → -예요. ' +
    'In conversation the subject is often dropped — "학생이에요" alone can mean "I am a student" or "She is a student" or "It is a student" depending on context. You add 저는 ("as for me") when you need to specify yourself.',
  commonMistakes: [
    'WRONG: "저는 학생예요" (using -예요 after the consonant ending 학생). RIGHT: "저는 학생이에요". The noun 학생 ends in ㅇ (a batchim), so it takes -이에요.',
    'WRONG: "저는 사라이에요" (using -이에요 after the vowel ending 사라). RIGHT: "저는 사라예요". 사라 ends in ㅏ (a vowel), so it takes -예요.',
    'WRONG: "저 학생이에요" (dropping the topic marker entirely). RIGHT: "저는 학생이에요". When you introduce yourself, the marker 는 attaches to 저 ("I/me", humble form).',
    'WRONG: "I am 학생이에요" / "저는 am 학생". RIGHT: "저는 학생이에요". Resist the urge to add an English-style "am". The wanting/being is built into 이에요.',
  ],
  culturalNote: {
    text:
      'In Korean introductions, your role often comes before your name: "회사원이에요. 사라예요." ("I am an office worker. I am Sarah.") This reflects how identity in Korean conversations often anchors on what you do or where you belong before personal details.',
    example: '"안녕하세요. 회사원이에요. 사라예요." — "Hello. I am an office worker. I am Sarah."',
  },
};

const pattern = {
  ...COMMON,
  id: 'pattern.identification.be.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 8,
  patternTarget: '{filler}이에요 / {filler}예요',
  patternGloss: '(I/it/this) am/is {filler}',
  anchors: [
    {
      target: '저는 학생이에요.',
      romanization: 'jeoneun haksaeng-ieyo.',
      native: 'I am a student.',
      gloss: '저(I, humble)+는(TOPIC) | 학생(student)+이에요(am, consonant ending)',
    },
    {
      target: '저는 사라예요.',
      romanization: 'jeoneun sara-yeyo.',
      native: 'I am Sarah.',
      gloss: '저+는 | 사라(Sarah)+예요(am, vowel ending)',
    },
    {
      target: '이건 책이에요.',
      romanization: 'igeon chaeg-ieyo.',
      native: 'This is a book.',
      gloss: '이건(this, contracted from 이것은) | 책(book)+이에요',
    },
    {
      target: '저는 한국 사람이에요.',
      romanization: 'jeoneun hanguk saram-ieyo.',
      native: 'I am Korean / a Korean person.',
      gloss: '한국(Korea) | 사람(person)+이에요',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.PERSON,
      fillerConceptIds: ['lexeme.student', 'lexeme.teacher', 'lexeme.doctor', 'lexeme.friend'],
      promptTemplate: 'Say "I am a {filler}."',
    },
    {
      slot: SLOT_CATEGORIES.PERSON,
      fillerConceptIds: ['lexeme.name_sarah', 'lexeme.name_minho'],
      promptTemplate: 'Say "I am {filler}." (Watch the batchim rule: 사라 ends in a vowel, 민호 ends in a vowel — both take 예요.)',
    },
    {
      slot: SLOT_CATEGORIES.OBJECT,
      fillerConceptIds: ['lexeme.book', 'lexeme.phone', 'lexeme.bag', 'lexeme.water'],
      promptTemplate: 'Point at the item and say "This is {filler}." Use 이건.',
    },
    {
      slot: SLOT_CATEGORIES.PLACE,
      fillerConceptIds: ['lexeme.school', 'lexeme.cafe', 'lexeme.library', 'lexeme.restaurant'],
      promptTemplate: 'Point at the building and say "This is {filler}." Use 이건.',
    },
  ],
  productionTask:
    'I will say a noun in English (a person or a thing). Reply in Korean polite form: ' +
    '"저는 X이에요/예요" for a person ("I am X") or "이건 X이에요/예요" for a thing ("This is X"). ' +
    'Pick the right -이에요/-예요 based on whether the noun ends in a consonant or a vowel.',
};

const cloze = {
  ...COMMON,
  id: 'cloze.identification.be.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 5,
  items: [
    {
      target: '저는 학생___.',
      native: 'I am a student.',
      answer: '이에요',
      hint: '학생 ends in ㅇ — a consonant batchim. Which copula form follows a consonant?',
      distractors: ['예요', '에요', '이요'],
    },
    {
      target: '저는 사라___.',
      native: 'I am Sarah.',
      answer: '예요',
      hint: '사라 ends in ㅏ — a vowel. Which copula form follows a vowel?',
      distractors: ['이에요', '에요', '이예요'],
    },
    {
      target: '이건 책___.',
      native: 'This is a book.',
      answer: '이에요',
      hint: '책 ends in ㄱ — consonant.',
      distractors: ['예요', '에요', '이요'],
    },
    {
      target: '저___ 한국 사람이에요.',
      native: 'I am Korean.',
      answer: '는',
      hint: 'The topic marker for 저 — what follows a vowel-final noun?',
      distractors: ['은', '이', '가'],
    },
    {
      target: '이건 ___예요.',
      native: 'This is a café.',
      answer: '카페',
      hint: 'A place that serves coffee. 카페 already ends in a vowel — that\'s why we use -예요.',
      distractors: ['카페가', '카페는', '카페이에요'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.identification.be.first-meeting.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 6,
  mode: 'dialogue',
  title: 'First meeting',
  turns: [
    {
      speaker: '민호',
      target: '안녕하세요. 저는 민호예요.',
      romanization: 'annyeong-haseyo. jeoneun minho-yeyo.',
      native: 'Hello. I am Minho.',
      glosses: [
        { target: '안녕하세요', native: 'hello (polite)' },
        { target: '저는', native: 'as for me (humble I + topic)' },
        { target: '민호예요', native: 'am Minho (vowel ending → 예요)' },
      ],
    },
    {
      speaker: '사라',
      target: '안녕하세요. 저는 사라예요. 만나서 반가워요.',
      romanization: 'annyeong-haseyo. jeoneun sara-yeyo. mannaseo bangawoyo.',
      native: 'Hello. I am Sarah. Nice to meet you.',
      glosses: [
        { target: '만나서 반가워요', native: 'nice to meet you (lit. "meeting, glad")' },
      ],
    },
    {
      speaker: '민호',
      target: '사라 씨, 학생이에요?',
      romanization: 'sara-ssi, haksaeng-ieyo?',
      native: 'Sarah, are you a student?',
      glosses: [
        { target: '씨', native: 'a polite suffix after a name — like Mr./Ms.' },
        { target: '학생이에요?', native: '(are you) a student? — consonant ending → 이에요' },
      ],
    },
    {
      speaker: '사라',
      target: '네, 학생이에요. 민호 씨도 학생이에요?',
      romanization: 'ne, haksaeng-ieyo. minho-ssi-do haksaeng-ieyo?',
      native: 'Yes, I am a student. Are you also a student, Minho?',
      glosses: [
        { target: '네', native: 'yes' },
        { target: '도', native: 'also / too — attaches after the noun + 씨' },
      ],
    },
    {
      speaker: '민호',
      target: '아니요, 저는 회사원이에요.',
      romanization: 'aniyo, jeoneun hoesa-won-ieyo.',
      native: 'No, I am an office worker.',
      glosses: [
        { target: '아니요', native: 'no' },
        { target: '회사원', native: 'office worker / company employee' },
      ],
    },
  ],
  comprehensionQuestions: [
    'What does Sarah say her job is?',
    'What does Minho say his job is?',
    'Which suffix (-이에요 or -예요) attaches to 회사원? Why?',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.identification.be.people-and-things.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 5,
  fillerConceptIds: [
    'lexeme.student', 'lexeme.teacher', 'lexeme.doctor', 'lexeme.friend',
    'lexeme.korean_person', 'lexeme.american_person',
    'lexeme.book', 'lexeme.phone', 'lexeme.bag', 'lexeme.water',
    'lexeme.name_sarah', 'lexeme.name_minho',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.identification.be.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '학생이에요',
      romanization: 'haksaeng-ieyo',
      native: 'am / is a student',
      focusSounds: [
        '학생: the ㄱ batchim before ㅅ — keep the ㄱ as a quick stop, do NOT release it as "k"',
        '생이에요: ㅇ batchim + 이 — the link sounds like /saeng-ieyo/, smooth, no break',
      ],
    },
    {
      target: '사라예요',
      romanization: 'sara-yeyo',
      native: 'am Sarah',
      focusSounds: [
        '예요: a single syllable /ye-yo/, light and short — not "yay-yo"',
      ],
    },
    {
      target: '한국 사람이에요',
      romanization: 'hanguk saram-ieyo',
      native: 'am Korean',
      focusSounds: [
        '한국: ㄴ batchim → /han/; ㄱ batchim → light /guk/, no aspiration',
        '사람이에요: link 람 + 이 → /sa-ra-mi-e-yo/, the ㅁ batchim flows into 이',
      ],
    },
    {
      target: '아니요, 회사원이에요',
      romanization: 'aniyo, hoesa-won-ieyo',
      native: 'no, I am an office worker',
      focusSounds: [
        '회사원: ㅚ pronounced like /we/ in modern Seoul Korean',
        '원이에요: link 원 + 이 → /wo-ni-e-yo/, smooth',
      ],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.identification.be.copula.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 3,
  pairs: [
    {
      a: '학생이에요',
      b: '학생예요',
      contrast: 'Correct vs incorrect copula attachment. 학생 ends in a consonant, so only 이에요 is valid; 예요 is what a beginner who skipped the batchim rule produces.',
    },
    {
      a: '사라예요',
      b: '사라이에요',
      contrast: 'Same lesson in reverse. 사라 ends in a vowel; 예요 is correct, 이에요 is the common over-application error.',
    },
    {
      a: '학생이에요',
      b: '학생이세요',
      contrast: 'Plain copula (-이에요) vs honorific copula (-이세요). Use 이에요 for yourself; 이세요 elevates the subject ("You/elder ARE a student").',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
