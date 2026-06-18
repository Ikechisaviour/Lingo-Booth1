/**
 * Existence / possession — 있다 / 없다
 *
 * Concept: pattern.existence.iss_eobs
 *
 * 있다 / 없다 is the all-purpose existence pair. It does the work of English
 * "there is / there isn't", "has / doesn't have", and "is present / is
 * absent". Korean treats EXISTENCE and POSSESSION as the same idea: "I have
 * money" is literally "There is money (to/for me)". Polite forms are
 * 있어요 / 없어요. The subject of these sentences takes 이/가 by default
 * (and that's the most reliable rule for choosing 이/가 vs 은/는 at A1).
 */

const { LESSON_TYPES } = require('../schema/lessonTypes');
const { SLOT_CATEGORIES } = require('../schema/slotCategories');
const { REGISTER } = require('../schema/register');
const { FUNCTIONS } = require('../schema/functions');

const CONCEPT_ID = 'pattern.existence.iss_eobs';
const COMMON = {
  conceptId: CONCEPT_ID,
  targetLang: 'ko',
  nativeLang: 'en',
  difficulty: 'beginner',
  prerequisites: ['pattern.subject.i_ga'],
  function: FUNCTIONS.EXISTENCE,
  register: REGISTER.POLITE,
};

const contrast = {
  ...COMMON,
  id: 'contrast.existence.iss_eobs.ko-en',
  lessonType: LESSON_TYPES.CONTRAST,
  estimatedMinutes: 5,
  l1Pattern: 'English splits "there is/isn\'t" (existence) from "have/don\'t have" (possession) into two grammars. "There is a book." vs "I have a book."',
  l2Pattern: 'Korean does both with ONE pair of verbs: 있다 (exist / have) and 없다 (not exist / not have). 책이 있어요 = "there is a book" / "I have a book". Context tells you which.',
  explanation:
    'In Korean, possession is rephrased as existence: "money exists (to me)" → "I have money". The subject (what exists) takes 이/가. ' +
    'If you want to say WHO has it, add that person + 은/는 at the front: "저는 돈이 있어요" = "as for me, there is money" = "I have money". ' +
    'Negation flips 있다 ↔ 없다. There is no "don\'t" auxiliary added — they are two separate verbs. ' +
    '있어요 / 없어요 are also the verb used to say WHERE something is, paired with 에: "책이 가방에 있어요" = "the book is in the bag".',
  commonMistakes: [
    'WRONG: "저는 책을 있어요" (using object marker 을 with 있다). RIGHT: "저는 책이 있어요". 있다 takes a SUBJECT (the thing that exists), not an OBJECT.',
    'WRONG: "저는 책 있어요" (dropping the subject particle). RIGHT: "저는 책이 있어요". Beginners can sometimes drop particles in fast speech, but write/say it with 이/가 in lesson exercises.',
    'WRONG: "책이 안 있어요" (negating 있다 with 안). RIGHT: "책이 없어요". 있다\'s negation is the separate verb 없다, not 안 + 있다.',
    'WRONG: "물이 있다 카페에" (placing the location after the verb). RIGHT: "카페에 물이 있어요". Korean is verb-final: location goes BEFORE the verb.',
    'WRONG: "시간있어요?" with no particle. RIGHT: "시간 있어요?" (no particle in fast colloquial use is okay) OR "시간이 있어요?" (full form). Either form is heard; don\'t pile both 이 and zero into one sentence.',
  ],
  culturalNote: {
    text:
      'Asking "시간 있어요?" ("do you have time?") is the standard way Koreans propose meeting up. It\'s direct but polite. The answer is rarely a flat "no" — even when busy, native speakers soften: "지금은 좀 바빠요" ("As for now, I\'m a bit busy"), using 은 for contrastive softening. Beginners who answer "없어요." flat sound abrupt.',
    example: 'A: 시간 있어요?  B: 네, 있어요. / 지금은 좀 바빠요.',
  },
};

const pattern = {
  ...COMMON,
  id: 'pattern.existence.iss_eobs.ko',
  lessonType: LESSON_TYPES.PATTERN,
  estimatedMinutes: 9,
  patternTarget: '{filler}이 / {filler}가 있어요 (없어요)',
  patternGloss: 'There is {filler} / I have {filler} (negation: there is no {filler})',
  anchors: [
    {
      target: '책이 있어요.',
      romanization: 'chaeg-i isseoyo.',
      native: 'There is a book. / I have a book.',
      gloss: '책+이(SUBJ) | 있어요(exists)',
    },
    {
      target: '시간이 없어요.',
      romanization: 'shigan-i eopseoyo.',
      native: 'I don\'t have time.',
      gloss: '시간(time)+이 | 없어요(does not exist)',
    },
    {
      target: '저는 친구가 있어요.',
      romanization: 'jeoneun chinguga isseoyo.',
      native: 'I have a friend.',
      gloss: '저+는(TOPIC, "as for me") | 친구(friend)+가(SUBJ) | 있어요',
    },
    {
      target: '가방에 책이 있어요.',
      romanization: 'gabang-e chaeg-i isseoyo.',
      native: 'The book is in the bag.',
      gloss: '가방(bag)+에(LOC) | 책+이 | 있어요',
    },
    {
      target: '집에 고양이가 없어요.',
      romanization: 'jib-e goyangiga eopseoyo.',
      native: 'There\'s no cat at home.',
      gloss: '집+에 | 고양이(cat)+가 | 없어요',
    },
  ],
  drills: [
    {
      slot: SLOT_CATEGORIES.OBJECT,
      fillerConceptIds: ['lexeme.book', 'lexeme.water', 'lexeme.money', 'lexeme.phone', 'lexeme.bag'],
      promptTemplate: 'Say "I have {filler}." Use 저는 … 있어요.',
    },
    {
      slot: SLOT_CATEGORIES.OBJECT,
      fillerConceptIds: ['lexeme.money', 'lexeme.time', 'lexeme.water'],
      promptTemplate: 'Say "I don\'t have {filler}." Use 저는 … 없어요.',
    },
    {
      slot: SLOT_CATEGORIES.PLACE,
      fillerConceptIds: ['lexeme.cafe', 'lexeme.library', 'lexeme.park', 'lexeme.home'],
      promptTemplate: 'Say "There is water at {filler}." Use 물 + 에 location.',
    },
    {
      slot: SLOT_CATEGORIES.PERSON,
      fillerConceptIds: ['lexeme.friend', 'lexeme.name_sarah', 'lexeme.name_minho'],
      promptTemplate: 'Ask "Is {filler} at school?" — use 학교에 + subject marker + 있어요?',
    },
  ],
  productionTask:
    'I will ask you "X 있어요?" — "Do you have X?" or "Is there X at Y?". ' +
    'Answer with the noun + 이/가 + 있어요 or 없어요. If you need to add a place, ' +
    'put PLACE + 에 BEFORE the subject. If you need to specify "for me", start with 저는.',
};

const cloze = {
  ...COMMON,
  id: 'cloze.existence.iss_eobs.ko',
  lessonType: LESSON_TYPES.CLOZE,
  estimatedMinutes: 6,
  items: [
    {
      target: '저는 친구___ 있어요.',
      native: 'I have a friend.',
      answer: '가',
      hint: '친구 ends in a vowel. Subject marker.',
      distractors: ['이', '을', '는'],
    },
    {
      target: '시간___ 없어요.',
      native: 'I don\'t have time.',
      answer: '이',
      hint: '시간 ends in ㄴ batchim.',
      distractors: ['가', '을', '는'],
    },
    {
      target: '가방___ 책이 있어요.',
      native: 'There is a book in the bag.',
      answer: '에',
      hint: 'Location particle.',
      distractors: ['가', '에서', '을'],
    },
    {
      target: '돈이 ___.',
      native: 'I don\'t have money.',
      answer: '없어요',
      hint: 'Negation of existence is a separate verb.',
      distractors: ['있어요', '안 있어요', '못 있어요'],
    },
    {
      target: 'Q: 시간 있어요? A: 네, ___.',
      native: 'Q: Do you have time? A: Yes, I do.',
      answer: '있어요',
      hint: 'Mirror the question verb.',
      distractors: ['없어요', '돼요', '그래요'],
    },
  ],
};

const story = {
  ...COMMON,
  id: 'story.existence.iss_eobs.coffee-shop.ko',
  lessonType: LESSON_TYPES.STORY,
  estimatedMinutes: 6,
  mode: 'dialogue',
  title: 'At the coffee shop',
  turns: [
    {
      speaker: '직원',
      target: '안녕하세요. 자리 있어요?',
      romanization: 'annyeong-haseyo. jari isseoyo?',
      native: 'Hello. Do you have a seat? (i.e., Do you have a reservation / a seat to sit at?)',
      glosses: [
        { target: '직원', native: 'staff / employee' },
        { target: '자리', native: 'seat / spot' },
      ],
    },
    {
      speaker: '사라',
      target: '아니요, 없어요. 자리 있어요?',
      romanization: 'aniyo, eopseoyo. jari isseoyo?',
      native: 'No, I don\'t. Are there seats available?',
      glosses: [
        { target: '아니요', native: 'no' },
      ],
    },
    {
      speaker: '직원',
      target: '네, 창가에 자리가 있어요.',
      romanization: 'ne, changga-e jariga isseoyo.',
      native: 'Yes, there\'s a seat by the window.',
      glosses: [
        { target: '창가', native: 'window-side' },
        { target: '창가에', native: 'at the window-side' },
      ],
    },
    {
      speaker: '사라',
      target: '좋아요. 메뉴 있어요?',
      romanization: 'joayo. menyu isseoyo?',
      native: 'Great. Do you have a menu?',
      glosses: [
        { target: '메뉴', native: 'menu' },
      ],
    },
    {
      speaker: '직원',
      target: '여기 있어요. 시간 충분히 있어요. 천천히 보세요.',
      romanization: 'yeogi isseoyo. shigan chungbunhi isseoyo. cheoncheonhi boseyo.',
      native: 'Here you go. You have plenty of time. Take your time.',
      glosses: [
        { target: '여기 있어요', native: 'here it is (lit. "is here")' },
        { target: '충분히', native: 'enough / plenty' },
        { target: '천천히 보세요', native: 'look slowly / take your time' },
      ],
    },
  ],
  comprehensionQuestions: [
    'How does the staff ask whether Sarah has a seat?',
    'Where in the café is the available seat?',
    'How does the staff say "here you go" when handing over the menu?',
    'Find the sentence where 있어요 means "there is plenty / you have plenty". What is the subject?',
  ],
};

const vocab = {
  ...COMMON,
  id: 'vocab.existence.iss_eobs.daily-things.ko',
  lessonType: LESSON_TYPES.VOCAB,
  estimatedMinutes: 5,
  fillerConceptIds: [
    'lexeme.book', 'lexeme.water', 'lexeme.money', 'lexeme.phone', 'lexeme.bag',
    'lexeme.time', 'lexeme.car', 'lexeme.dog', 'lexeme.cat',
    'lexeme.friend', 'lexeme.cafe', 'lexeme.library', 'lexeme.home',
  ],
};

const pronunciation = {
  ...COMMON,
  id: 'pronunciation.existence.iss_eobs.ko',
  lessonType: LESSON_TYPES.PRONUNCIATION,
  estimatedMinutes: 4,
  items: [
    {
      target: '있어요',
      romanization: 'isseoyo',
      native: '(it) exists / I have',
      focusSounds: [
        'Tense ㅆ — hold the s a beat longer than in English /s/',
        '있어요 links → /i-sseo-yo/, three crisp syllables',
      ],
    },
    {
      target: '없어요',
      romanization: 'eopseoyo',
      native: '(it) does not exist / I don\'t have',
      focusSounds: [
        '없 has the two-letter batchim ㅄ — only ㅂ is voiced in the syllable, then ㅅ links to 어',
        'reads as /eop-seo-yo/ — sounds like "up-suh-yo" with rounded ㅓ',
      ],
    },
    {
      target: '가방에 책이 있어요',
      romanization: 'gabang-e chaeg-i isseoyo',
      native: 'There is a book in the bag',
      focusSounds: [
        '가방에: ㅇ batchim + 에 → smooth /ba-nge/',
        '책이: ㄱ batchim + 이 → /chae-gi/',
        'whole sentence: keep a slight pause after 에, smooth after that',
      ],
    },
    {
      target: '시간이 없어요',
      romanization: 'shigan-i eopseoyo',
      native: 'I don\'t have time',
      focusSounds: [
        '시간이: ㄴ batchim + 이 → /shi-ga-ni/',
        'common chunk in conversation — practice it as a unit, not three separate words',
      ],
    },
  ],
};

const minimalPair = {
  ...COMMON,
  id: 'minimal-pair.existence.iss_eobs.lax-tense.ko',
  lessonType: LESSON_TYPES.MINIMAL_PAIR,
  estimatedMinutes: 4,
  pairs: [
    {
      a: '있어요',
      b: '이서요',
      contrast: 'Tense ㅆ vs lax ㅅ. Only 있어요 is a real word. The second tests whether you hear the gemination — the held quality of the tense sibilant.',
    },
    {
      a: '있어요',
      b: '없어요',
      contrast: 'Existence vs non-existence — the most important verb-pair contrast in beginner Korean. Listen for /i/ vs /eo/ in the first vowel.',
    },
    {
      a: '책이 있어요',
      b: '책이 없어요',
      contrast: 'Same sentence frame, opposite meaning. Learners who lose the first vowel of the final verb miss the entire claim.',
    },
  ],
};

module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];
