/**
 * Subject marker — 이 / 가
 *
 * Concept: pattern.subject.i_ga
 *
 * 이/가 marks the SUBJECT of a sentence — the thing that does the action,
 * exists, or has a quality. Same batchim rule as the copula and the topic
 * marker: consonant → 이, vowel → 가. The big confusion for English speakers
 * is when to use 이/가 vs 은/는. Short version: 이/가 introduces NEW
 * information ("THERE IS a book") or focuses the subject in answer to "who?"
 * / "what?"; 은/는 sets the topic of an ongoing conversation. The fight
 * between them is the most important particle distinction in beginner Korean.
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.subject.i_ga';
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
  id: 'contrast.subject.i_ga.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 6,
  l1Pattern: 'English: subject is identified by WORD ORDER ("The cat eats the fish"). No subject particle.',
  l2Pattern: 'Korean: subject is marked by the particle 이 / 가 attached to the noun: "고양이가 생선을 먹어요". Korean word order is flexible because particles do the work.',
  explanation:
    'Korean tells you WHO/WHAT is doing the action by tagging it with 이 (after a consonant) or 가 (after a vowel). Because the particle marks the role, word order can shift without losing meaning. ' +
    'The hard part for English speakers is choosing between 이/가 (subject) and 은/는 (topic). Both can sit next to a noun in introductions. The rule that helps most: ' +
    'use 이/가 when you are INTRODUCING new information into the conversation, ANSWERING a question with "who? / what?", or stating that something EXISTS / a state holds ("물이 있어요" — there is water). ' +
    'Use 은/는 when you are CONTINUING the conversation on a topic, or CONTRASTING two things. ' +
    'A practical rule: 있어요/없어요 sentences (existence) almost always pair with 이/가.',
  commonMistakes: [
    'WRONG: "물은 있어요?" when ordering water for the first time. RIGHT: "물이 있어요?" — you\'re introducing "water" into the conversation, not contrasting it with something else.',
    'WRONG: "사라가 학생이에요. 사라가 미국 사람이에요." (using 가 repeatedly). RIGHT: After introducing Sarah, drop her or switch to 는. "사라는 학생이에요. (사라는) 미국 사람이에요." 이/가 keeps re-introducing.',
    'WRONG: "내가는 사라예요" (stacking subject and topic markers). RIGHT: pick one — "저는 사라예요" (topic) or, in a contest like answering "누가 사라예요?" → "제가 사라예요" (subject).',
    'WRONG: "고양이은 작아요". RIGHT: "고양이는 작아요" (topic, vowel ending) OR "고양이가 작아요" (subject — focused on the cat being small). 고양이 ends in ㅣ — a vowel — so the consonant-form -은 is wrong either way.',
  ],
  culturalNote: {
    text:
      'A question containing 누가 ("who?") forces an answer with 이/가, not 은/는. "누가 사라예요?" — "Who is Sarah?" — must be answered "제가 사라예요" ("I am Sarah", subject-focused). Answering "저는 사라예요" sounds like a topic-shift, not an answer to the question. Beginner learners default to 저는 and end up answering wrong questions.',
    example: 'Q: 누가 학생이에요? ("Who is a student?")  A: 제가 학생이에요. ("I am.")',
  },
};

const pattern = {
  ...COMMON,
  id: 'pattern.subject.i_ga.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 9,
  patternTarget: '{filler}이 / {filler}가 …',
  patternGloss: '{filler} is / does / exists',
  anchors: [
    {
      target: '책이 있어요.',
      romanization: 'chaeg-i isseoyo.',
      native: 'There is a book. (consonant + 이; existence)',
      gloss: '책(book)+이(SUBJ) | 있어요(exists)',
    },
    {
      target: '물이 없어요.',
      romanization: 'mul-i eopseoyo.',
      native: 'There is no water. (consonant + 이; negation of existence)',
      gloss: '물(water)+이 | 없어요(does not exist)',
    },
    {
      target: '사라가 와요.',
      romanization: 'sara-ga wayo.',
      native: 'Sarah is coming. (vowel + 가; subject of an action)',
      gloss: '사라(Sarah)+가(SUBJ) | 와요(comes)',
    },
    {
      target: '날씨가 좋아요.',
      romanization: 'nalssi-ga joayo.',
      native: 'The weather is nice. (vowel + 가; subject of a quality)',
      gloss: '날씨(weather)+가 | 좋아요(is good)',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.OBJECT,
      fillerConceptIds: ['lexeme.book', 'lexeme.water', 'lexeme.bag', 'lexeme.phone', 'lexeme.money'],
      promptTemplate: 'Say "There is a {filler}." Use 있어요. Watch the batchim of {filler}.',
    },
    {
      slot: SLOT_CATEGORIES.OBJECT,
      fillerConceptIds: ['lexeme.book', 'lexeme.water', 'lexeme.money', 'lexeme.time'],
      promptTemplate: 'Say "There is no {filler}." Use 없어요.',
    },
    {
      slot: SLOT_CATEGORIES.PERSON,
      fillerConceptIds: ['lexeme.name_sarah', 'lexeme.name_minho', 'lexeme.friend', 'lexeme.teacher'],
      promptTemplate: 'Answer "Who is coming?" by saying "{filler} is coming." Use 와요.',
    },
    {
      slot: SLOT_CATEGORIES.TIME,
      fillerConceptIds: ['lexeme.today', 'lexeme.weekend', 'lexeme.morning'],
      promptTemplate: 'Say "{filler} is busy." (시간이 없어요 — "no time"). Build it as: TIME + 은/는 + 바빠요 if you want — but for THIS drill use the SUBJECT particle: "{filler}이/가 바빠요."',
    },
  ],
  productionTask:
    'I will ask you "누가 …?" ("who …?") or "뭐가 있어요?" ("what is there?"). ' +
    'Answer with NOUN + 이/가 + verb. Pick the particle by batchim, not by what feels natural in English.',
};

const cloze = {
  ...COMMON,
  id: 'cloze.subject.i_ga.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 6,
  items: [
    {
      target: '책___ 있어요.',
      native: 'There is a book.',
      answer: '이',
      hint: '책 ends in ㄱ batchim.',
      distractors: ['가', '은', '을'],
    },
    {
      target: '사라___ 와요.',
      native: 'Sarah is coming.',
      answer: '가',
      hint: '사라 ends in ㅏ — vowel.',
      distractors: ['이', '는', '을'],
    },
    {
      target: '날씨___ 좋아요.',
      native: 'The weather is nice.',
      answer: '가',
      hint: '날씨 ends in ㅣ — vowel.',
      distractors: ['이', '는', '도'],
    },
    {
      target: '돈___ 없어요.',
      native: 'I have no money.',
      answer: '이',
      hint: '돈 ends in ㄴ batchim.',
      distractors: ['가', '는', '을'],
    },
    {
      target: 'Q: 누가 학생이에요? A: ___ 학생이에요.',
      native: 'Q: Who is a student? A: I am a student.',
      answer: '제가',
      hint: 'Answering 누가 forces 이/가. The humble I 저 + subject 가 contracts to 제가.',
      distractors: ['저는', '제는', '저가'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.subject.i_ga.what-is-in-the-bag.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 6,
  mode: 'dialogue',
  title: 'What\'s in the bag?',
  turns: [
    {
      speaker: '민호',
      target: '가방에 뭐가 있어요?',
      romanization: 'gabang-e mwoga isseoyo?',
      native: 'What is in the bag?',
      glosses: [
        { target: '가방에', native: 'in the bag (location 에)' },
        { target: '뭐가', native: 'what (subject) — 뭐 + 가' },
      ],
    },
    {
      speaker: '사라',
      target: '책이 있어요. 그리고 물도 있어요.',
      romanization: 'chaeg-i isseoyo. geurigo mul-do isseoyo.',
      native: 'There is a book. And there is also water.',
      glosses: [
        { target: '그리고', native: 'and' },
        { target: '도', native: 'also / too — replaces 이/가 when used' },
      ],
    },
    {
      speaker: '민호',
      target: '핸드폰은요?',
      romanization: 'haendeupon-eun-yo?',
      native: 'And the phone? (Lit. "as for the phone?")',
      glosses: [
        { target: '핸드폰은요?', native: '"-은요?" is a short tag — "and what about ___?"' },
      ],
    },
    {
      speaker: '사라',
      target: '핸드폰은 없어요. 집에 있어요.',
      romanization: 'haendeupon-eun eopseoyo. jib-e isseoyo.',
      native: 'The phone, I don\'t have it. It\'s at home.',
      glosses: [
        { target: '핸드폰은 없어요', native: 'topic 은 — "AS FOR the phone, (I) don\'t have it"' },
        { target: '집에 있어요', native: '(it) is at home' },
      ],
    },
    {
      speaker: '민호',
      target: '돈이 있어요?',
      romanization: 'don-i isseoyo?',
      native: 'Do you have money?',
      glosses: [
        { target: '돈이 있어요?', native: 'literally "Is there money?" — Korean asks possession this way' },
      ],
    },
    {
      speaker: '사라',
      target: '네, 조금 있어요!',
      romanization: 'ne, jogeum isseoyo!',
      native: 'Yes, I have a little!',
      glosses: [
        { target: '조금', native: 'a little' },
      ],
    },
  ],
  comprehensionQuestions: [
    'Why does Sarah say "책이" but "핸드폰은"? What is the conversational signal that triggers each?',
    'Why doesn\'t Sarah say "돈이 있어요" — she uses just "조금 있어요"?',
    'Translate: "There is also money."',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.subject.i_ga.things-and-people.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 5,
  fillerConceptIds: [
    'lexeme.book', 'lexeme.water', 'lexeme.bag', 'lexeme.phone', 'lexeme.money',
    'lexeme.dog', 'lexeme.cat', 'lexeme.car', 'lexeme.time',
    'lexeme.name_sarah', 'lexeme.name_minho', 'lexeme.friend',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.subject.i_ga.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '책이 있어요',
      romanization: 'chaeg-i isseoyo',
      native: 'there is a book',
      focusSounds: [
        '책이: ㄱ batchim of 책 links into 이 → /chae-gi/, NOT "chaek-i"',
        '있어요: tense ㅆ — hold the s briefly before the 어 → /i-sseo-yo/',
      ],
    },
    {
      target: '돈이 없어요',
      romanization: 'don-i eopseoyo',
      native: 'I have no money',
      focusSounds: [
        '돈이: ㄴ batchim links → /do-ni/',
        '없어요: ㅄ batchim is silent ㅅ, voiced ㅂ → reads as /eop-seo-yo/',
      ],
    },
    {
      target: '사라가 와요',
      romanization: 'sara-ga wayo',
      native: 'Sarah is coming',
      focusSounds: [
        '사라가: smooth /sa-ra-ga/, the ㄱ in 가 is a soft "g"',
        '와요: diphthong /wa/ — like English "wah"',
      ],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.subject.i_ga.vs-topic.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 4,
  pairs: [
    {
      a: '책이 있어요',
      b: '책은 있어요',
      contrast: 'Subject-marked: "there is a book" (new info). Topic-marked: "as for the book, (we do) have it" (contrast — implies "but not other things"). Both grammatical, very different meaning.',
    },
    {
      a: '누가 와요?',
      b: '누구는 와요?',
      contrast: 'The 누 ("who") + 가 form is the natural Korean question for "who is coming?". The topic-marked version is ungrammatical in modern speech — interrogative pronouns refuse 은/는.',
    },
    {
      a: '제가 사라예요',
      b: '저는 사라예요',
      contrast: 'Both translate "I am Sarah". 제가 answers "WHO is Sarah?" (subject focus). 저는 introduces yourself in a fresh conversation (topic setup). Different conversational moves.',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
