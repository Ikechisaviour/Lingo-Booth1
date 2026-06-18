/**
 * Asking "who?" — 누구 / 누가
 *
 * Concept: pattern.question.who
 *
 * 누구 is the base "who" — used as object, copula complement, after most
 * particles. 누가 is the contracted SUBJECT form (literally 누구 + 가 with
 * 구 elided): "누가 학생이에요?" ("Who is a student?"). The crucial rule:
 * a question with 누가 forces an answer with 이/가 too — "제가 학생이에요"
 * ("I am"). Answering with 저는 changes the topic and reads as evasive.
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.question.who';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: ['pattern.subject.i_ga'],
  function: FUNCTIONS.INTERROGATIVE,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.question.who.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 5,
  l1Pattern: 'English has one "who" everywhere: "Who is that?", "Who do you like?", "With who?".',
  l2Pattern: 'Korean has two: 누구 (base) and 누가 (contracted subject — 누구+가). "누가 학생이에요?" but "누구를 만나요?".',
  explanation:
    '누구 is the everyday "who" — use it after particles (누구를, 누구에게) and as a copula complement ("저 사람은 누구예요?"). ' +
    '누가 is the special contracted form when "who" is the SUBJECT — literally 누구 + 가, with the middle dropped for ease. ' +
    'The most important pairing rule in beginner Korean: an answer to a 누가 question must use 이/가 on the answerer. ' +
    'Q: "누가 사라예요?" ("Who is Sarah?") A: "제가 사라예요" ("I am Sarah"). ' +
    'Answering "저는 사라예요" changes the topic from "who is Sarah" to "as for me, …" — it sounds like dodging the question.',
  commonMistakes: [
    'WRONG: "누구가 와요?" (using 누구 + 가 explicitly). RIGHT: "누가 와요?" — the contraction 누가 is mandatory when "who" is the subject.',
    'WRONG: Answering "누가 학생이에요?" with "저는 학생이에요". RIGHT: "제가 학생이에요" — the question used 누가 (subject), so the answer must use 가 too.',
    'WRONG: "누가 만나요?" when you mean "Who(m) do you meet?". RIGHT: "누구를 만나요?" — when "who" is the OBJECT, you need 누구 + 를, not the subject form.',
    'WRONG: "누가는 의사예요?" (stacking the subject 누가 with topic 는). RIGHT: "누가 의사예요?" — question words don\'t take 은/는.',
  ],
  culturalNote: {
    text:
      'Asking "누구세요?" ("Who is it?") is the standard polite phrase when answering the door or a phone call from an unknown number. The honorific suffix -세요 elevates the asker\'s respect for whoever\'s on the other end — useful even when you don\'t know who it is yet.',
    example: 'phone rings → 사라: 여보세요. → 모르는 사람: 안녕하세요. → 사라: 누구세요?',
  },
};

const pattern = {
  ...COMMON,
  id: 'pattern.question.who.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 7,
  patternTarget: '누가 …요? / … 누구 …요?',
  patternGloss: 'Who is / who does / whom …?',
  anchors: [
    {
      target: '누가 학생이에요?',
      romanization: 'nuga haksaeng-ieyo?',
      native: 'Who is a student?',
      gloss: '누가(who, SUBJ contraction) | 학생이에요',
    },
    {
      target: '누가 와요?',
      romanization: 'nuga wayo?',
      native: 'Who is coming?',
      gloss: '누가(who, SUBJ) | 와요(comes)',
    },
    {
      target: '저 사람은 누구예요?',
      romanization: 'jeo saram-eun nugu-yeyo?',
      native: 'Who is that person?',
      gloss: '저 사람(that person)+은(TOPIC) | 누구예요(is who)',
    },
    {
      target: '누구를 만나요?',
      romanization: 'nugureul mannayo?',
      native: 'Whom are you meeting?',
      gloss: '누구(who)+를(OBJ) | 만나요(meet)',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.PERSON,
      fillerConceptIds: ['lexeme.student', 'lexeme.teacher', 'lexeme.doctor', 'lexeme.friend'],
      promptTemplate: 'Ask "Who is a {filler}?" using 누가. Then answer with "제가 {filler}이에요/예요" if it\'s you.',
    },
    {
      slot: SLOT_CATEGORIES.PLACE,
      fillerConceptIds: ['lexeme.cafe', 'lexeme.library', 'lexeme.school'],
      promptTemplate: 'Ask "Who is at the {filler}?" Frame: "{filler}에 누가 있어요?"',
    },
    {
      slot: SLOT_CATEGORIES.TIME,
      fillerConceptIds: ['lexeme.today', 'lexeme.tomorrow', 'lexeme.weekend'],
      promptTemplate: 'Ask "Who is coming on {filler}?" Frame: "{filler}에 누가 와요?"',
    },
  ],
  productionTask:
    'I\'ll point at a scene or describe a situation. Ask the matching "who" question. ' +
    'Use 누가 + verb when "who" is the subject ("who is coming"). ' +
    'Use 누구예요 / 누구를 / 누구에게 when "who" is the copula complement, object, or in another role.',
};

const cloze = {
  ...COMMON,
  id: 'cloze.question.who.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 5,
  items: [
    {
      target: '___ 학생이에요?',
      native: 'Who is a student?',
      answer: '누가',
      hint: 'Subject contraction.',
      distractors: ['누구가', '누구는', '누구를'],
    },
    {
      target: '저 사람은 ___?',
      native: 'Who is that person?',
      answer: '누구예요',
      hint: 'Copula complement form; 누구 ends in a vowel.',
      distractors: ['누구이에요', '누가예요', '누가이에요'],
    },
    {
      target: '___ 만나요?',
      native: 'Whom are you meeting?',
      answer: '누구를',
      hint: 'Object marker.',
      distractors: ['누가', '누구가', '누구는'],
    },
    {
      target: 'Q: 누가 와요?  A: ___ 와요.',
      native: 'Q: Who is coming? A: Sarah is coming.',
      answer: '사라가',
      hint: 'Subject marker — 사라 ends in a vowel.',
      distractors: ['사라는', '사라이', '사라를'],
    },
    {
      target: 'Q: 누가 학생이에요?  A: ___ 학생이에요.',
      native: 'Q: Who is a student? A: I am a student.',
      answer: '제가',
      hint: '저 + subject 가 contracts to 제가.',
      distractors: ['저는', '저가', '제는'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.question.who.at-the-cafe.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 5,
  mode: 'dialogue',
  title: 'Who\'s at the café?',
  turns: [
    {
      speaker: '사라',
      target: '저기 사람이 있어요. 누구예요?',
      romanization: 'jeogi saram-i isseoyo. nugu-yeyo?',
      native: 'There\'s a person over there. Who is it?',
      glosses: [
        { target: '저기', native: 'over there' },
        { target: '사람이 있어요', native: 'there is a person' },
      ],
    },
    {
      speaker: '민호',
      target: '제 친구예요. 이름이 지수예요.',
      romanization: 'je chingu-yeyo. ireum-i jisu-yeyo.',
      native: 'It\'s my friend. Her name is Jisu.',
      glosses: [
        { target: '제 친구', native: 'my friend (제 = humble 저의)' },
        { target: '지수', native: 'Jisu (a name)' },
      ],
    },
    {
      speaker: '사라',
      target: '오, 옆 사람은 누구예요?',
      romanization: 'o, yeop saram-eun nugu-yeyo?',
      native: 'Oh, and who\'s the person next to her?',
      glosses: [
        { target: '옆 사람', native: 'the person next to (her)' },
      ],
    },
    {
      speaker: '민호',
      target: '지수 동생이에요. 학생이에요.',
      romanization: 'jisu dongsaeng-ieyo. haksaeng-ieyo.',
      native: 'That\'s Jisu\'s younger sibling. (They\'re) a student.',
      glosses: [
        { target: '지수 동생', native: 'Jisu\'s younger sibling (possession by juxtaposition)' },
      ],
    },
    {
      speaker: '사라',
      target: '누가 의사예요?',
      romanization: 'nuga uisa-yeyo?',
      native: 'Who is the doctor?',
      glosses: [
        { target: '누가 의사예요', native: 'subject-marked "who" + copula' },
      ],
    },
    {
      speaker: '민호',
      target: '지수가 의사예요!',
      romanization: 'jisu-ga uisa-yeyo!',
      native: 'Jisu is the doctor!',
      glosses: [
        { target: '지수가', native: 'Jisu (SUBJ) — answer must use 가 because the question used 누가' },
      ],
    },
  ],
  comprehensionQuestions: [
    'How does Sarah ask "who is that?" — note the form she uses.',
    'When Sarah asks "누가 의사예요?", why does Minho answer "지수가" and not "지수는"?',
    'Translate "Who is your friend?"',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.question.who.roles.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 4,
  fillerConceptIds: [
    'lexeme.student', 'lexeme.teacher', 'lexeme.doctor', 'lexeme.friend',
    'lexeme.korean_person', 'lexeme.american_person',
    'lexeme.name_sarah', 'lexeme.name_minho',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.question.who.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '누가 와요?',
      romanization: 'nuga wayo?',
      native: 'Who is coming?',
      focusSounds: [
        '누가: smooth /nu-ga/, the ㄱ is soft (not aspirated)',
        '와요: /wa-yo/, light glide on the ㅘ',
      ],
    },
    {
      target: '저 사람은 누구예요?',
      romanization: 'jeo saram-eun nugu-yeyo?',
      native: 'Who is that person?',
      focusSounds: [
        '사람은: ㅁ batchim links → /sa-ra-meun/',
        '누구예요: /nu-gu-ye-yo/, four light syllables — rising on the last',
      ],
    },
    {
      target: '누구를 만나요?',
      romanization: 'nugureul mannayo?',
      native: 'Whom are you meeting?',
      focusSounds: [
        '누구를: /nu-gu-reul/, the ㄹ tap is light',
        '만나요: double ㄴ — slight gemination — /man-na-yo/',
      ],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.question.who.nuga-nugu.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 3,
  pairs: [
    {
      a: '누가 와요?',
      b: '누구 와요?',
      contrast: '누가 is the correct subject form. 누구 (without 가) here sounds like the start of an unfinished sentence — beginner error.',
    },
    {
      a: '누가 학생이에요?',
      b: '누구는 학생이에요?',
      contrast: 'Subject question vs ungrammatical topic question. Question words refuse 은/는 in modern Korean — only 누가 is correct.',
    },
    {
      a: '제가 학생이에요',
      b: '저는 학생이에요',
      contrast: 'Answer with 제가 (subject) when the question used 누가; answer with 저는 (topic) when introducing yourself in fresh conversation. Different conversational moves.',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
