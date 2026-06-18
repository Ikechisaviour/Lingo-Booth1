/**
 * Registry of stable concept IDs. A Concept is anything with an identity
 * that lessons can reference: a grammar pattern, a lexeme, a discourse
 * function. Concept IDs are the link between lessons, prerequisites, and
 * the existing Flashcard.conceptId field.
 *
 * Naming convention:
 *   pattern.<function>.<short_name>     for grammar patterns
 *   lexeme.<canonical_english>          for vocabulary items
 *   function.<name>                     for pure communicative functions
 *
 * The list starts small and grows as lessons are added. The validator
 * refuses lessons that reference undefined concept IDs.
 */

const { FUNCTIONS } = require('./functions');

/**
 * @typedef {Object} Concept
 * @property {string} id              Stable kebab/dot ID. Permanent.
 * @property {'pattern'|'lexeme'|'function'} kind
 * @property {string} gloss           Short English description.
 * @property {string} [function]      Communicative function (from FUNCTIONS).
 * @property {string[]} [prerequisites]  Other concept IDs this depends on.
 * @property {'A1'|'A2'|'B1'|'B2'|'C1'|'C2'} [cefr]   CEFR level tag.
 * @property {1|2|3|4|5|6} [topik]                    TOPIK level tag.
 * @property {string[]} [requiresConjugation]         Conjugation classes this
 *                                                    pattern surfaces (e.g.
 *                                                    'ㅂ-irregular'). Future
 *                                                    ConjugationDrill lessons
 *                                                    will harvest patterns
 *                                                    by these tags.
 */

const CONCEPTS = [
  // ---- Patterns ----
  {
    id: 'pattern.experience.have_you_ever',
    kind: 'pattern',
    gloss: 'Have you ever V-ed?',
    function: FUNCTIONS.EXPERIENCE,
    prerequisites: [],
    cefr: 'A2',
    topik: 2,
    requiresConjugation: ['아/어-stem'],
  },
  {
    id: 'pattern.preference.want_to',
    kind: 'pattern',
    gloss: 'I want to V',
    function: FUNCTIONS.PREFERENCE,
    prerequisites: [],
    cefr: 'A1',
    topik: 1,
  },
  {
    id: 'pattern.intention.going_to',
    kind: 'pattern',
    gloss: 'I will / am going to V',
    function: FUNCTIONS.INTENTION,
    prerequisites: [],
    cefr: 'A1',
    topik: 1,
    requiresConjugation: ['(으)ㄹ-stem'],
  },
  {
    id: 'pattern.ability.can_cannot',
    kind: 'pattern',
    gloss: 'I can / cannot V',
    function: FUNCTIONS.ABILITY,
    prerequisites: [],
    cefr: 'A1',
    topik: 1,
    requiresConjugation: ['(으)ㄹ-stem'],
  },
  {
    id: 'pattern.reason.because',
    kind: 'pattern',
    gloss: 'Because V/A, ...',
    function: FUNCTIONS.REASON,
    prerequisites: [],
    cefr: 'A2',
    topik: 2,
    requiresConjugation: ['아/어-stem'],
  },
  {
    id: 'pattern.condition.if',
    kind: 'pattern',
    gloss: 'If V/A, ...',
    function: FUNCTIONS.CONDITION,
    prerequisites: [],
    cefr: 'A2',
    topik: 2,
    requiresConjugation: ['(으)면'],
  },

  // ─── A1 core (first authoring batch — identification + topic + subject + location + existence) ───
  {
    id: 'pattern.identification.be',
    kind: 'pattern',
    gloss: 'I am X / This is X — copula 이에요 / 예요',
    function: FUNCTIONS.IDENTIFICATION,
    prerequisites: [],
    cefr: 'A1',
    topik: 1,
    requiresConjugation: ['copula-batchim-rule'],
  },
  {
    id: 'pattern.topic.eun_neun',
    kind: 'pattern',
    gloss: 'Topic marker 은 / 는 ("as for X")',
    function: FUNCTIONS.DESCRIPTION,
    prerequisites: ['pattern.identification.be'],
    cefr: 'A1',
    topik: 1,
    requiresConjugation: ['particle-batchim-rule'],
  },
  {
    id: 'pattern.subject.i_ga',
    kind: 'pattern',
    gloss: 'Subject marker 이 / 가',
    function: FUNCTIONS.DESCRIPTION,
    prerequisites: ['pattern.identification.be'],
    cefr: 'A1',
    topik: 1,
    requiresConjugation: ['particle-batchim-rule'],
  },
  {
    id: 'pattern.location.e',
    kind: 'pattern',
    gloss: 'Location / destination particle 에 — at / to a place',
    function: FUNCTIONS.LOCATION,
    prerequisites: [],
    cefr: 'A1',
    topik: 1,
  },
  {
    id: 'pattern.existence.iss_eobs',
    kind: 'pattern',
    gloss: 'Existence / possession — 있어요 / 없어요',
    function: FUNCTIONS.EXISTENCE,
    prerequisites: ['pattern.subject.i_ga'],
    cefr: 'A1',
    topik: 1,
  },

  // ─── A1 batch 2 — questions + negation ───
  {
    id: 'pattern.question.what',
    kind: 'pattern',
    gloss: 'Asking "what?" — 뭐 / 무엇',
    function: FUNCTIONS.INTERROGATIVE,
    prerequisites: ['pattern.identification.be'],
    cefr: 'A1',
    topik: 1,
  },
  {
    id: 'pattern.question.who',
    kind: 'pattern',
    gloss: 'Asking "who?" — 누구 / 누가',
    function: FUNCTIONS.INTERROGATIVE,
    prerequisites: ['pattern.subject.i_ga'],
    cefr: 'A1',
    topik: 1,
  },
  {
    id: 'pattern.negation.an',
    kind: 'pattern',
    gloss: 'Short negation — 안 + V/A',
    function: FUNCTIONS.NEGATION,
    prerequisites: [],
    cefr: 'A1',
    topik: 1,
  },
  {
    id: 'pattern.negation.mot',
    kind: 'pattern',
    gloss: 'Impossibility — 못 + V ("cannot do")',
    function: FUNCTIONS.NEGATION,
    prerequisites: ['pattern.negation.an'],
    cefr: 'A1',
    topik: 1,
  },

  // ─── Lexemes used by the A1 core batch ───
  // People & roles
  { id: 'lexeme.student',  kind: 'lexeme', gloss: 'student',          target: '학생',     native: 'student' },
  { id: 'lexeme.teacher',  kind: 'lexeme', gloss: 'teacher',          target: '선생님',   native: 'teacher' },
  { id: 'lexeme.doctor',   kind: 'lexeme', gloss: 'doctor',           target: '의사',     native: 'doctor' },
  { id: 'lexeme.friend',   kind: 'lexeme', gloss: 'friend',           target: '친구',     native: 'friend' },
  { id: 'lexeme.korean_person', kind: 'lexeme', gloss: 'Korean person', target: '한국 사람', native: 'Korean (person)' },
  { id: 'lexeme.american_person', kind: 'lexeme', gloss: 'American person', target: '미국 사람', native: 'American (person)' },
  // Names (treated as concepts so drills can substitute them; "Sarah" + "Minho" feel realistic for ko-en learners)
  { id: 'lexeme.name_sarah', kind: 'lexeme', gloss: 'Sarah (name)',   target: '사라',     native: 'Sarah' },
  { id: 'lexeme.name_minho', kind: 'lexeme', gloss: 'Minho (name)',   target: '민호',     native: 'Minho' },

  // Places (school, home, work, common destinations)
  { id: 'lexeme.school',   kind: 'lexeme', gloss: 'school',           target: '학교',     native: 'school' },
  { id: 'lexeme.home',     kind: 'lexeme', gloss: 'home / house',     target: '집',       native: 'home / house' },
  { id: 'lexeme.company',  kind: 'lexeme', gloss: 'company / office', target: '회사',     native: 'company / office' },
  { id: 'lexeme.cafe',     kind: 'lexeme', gloss: 'café',             target: '카페',     native: 'café' },
  { id: 'lexeme.library',  kind: 'lexeme', gloss: 'library',          target: '도서관',   native: 'library' },
  { id: 'lexeme.restaurant', kind: 'lexeme', gloss: 'restaurant',     target: '식당',     native: 'restaurant' },
  { id: 'lexeme.park',     kind: 'lexeme', gloss: 'park',             target: '공원',     native: 'park' },
  { id: 'lexeme.market',   kind: 'lexeme', gloss: 'market',           target: '시장',     native: 'market' },

  // Things — used in 있다/없다 and 이/가
  { id: 'lexeme.book',     kind: 'lexeme', gloss: 'book',             target: '책',       native: 'book' },
  { id: 'lexeme.water',    kind: 'lexeme', gloss: 'water',            target: '물',       native: 'water' },
  { id: 'lexeme.bag',      kind: 'lexeme', gloss: 'bag',              target: '가방',     native: 'bag' },
  { id: 'lexeme.phone',    kind: 'lexeme', gloss: 'phone',            target: '핸드폰',   native: 'phone' },
  { id: 'lexeme.money',    kind: 'lexeme', gloss: 'money',            target: '돈',       native: 'money' },
  { id: 'lexeme.dog',      kind: 'lexeme', gloss: 'dog',              target: '개',       native: 'dog' },
  { id: 'lexeme.cat',      kind: 'lexeme', gloss: 'cat',              target: '고양이',   native: 'cat' },
  { id: 'lexeme.car',      kind: 'lexeme', gloss: 'car',              target: '차',       native: 'car' },
  { id: 'lexeme.time',     kind: 'lexeme', gloss: 'time',             target: '시간',     native: 'time' },

  // Time-of-day / day-of-week (slot category TIME)
  { id: 'lexeme.today',    kind: 'lexeme', gloss: 'today',            target: '오늘',     native: 'today' },
  { id: 'lexeme.tomorrow', kind: 'lexeme', gloss: 'tomorrow',         target: '내일',     native: 'tomorrow' },
  { id: 'lexeme.weekend',  kind: 'lexeme', gloss: 'weekend',          target: '주말',     native: 'weekend' },
  { id: 'lexeme.monday',   kind: 'lexeme', gloss: 'Monday',           target: '월요일',   native: 'Monday' },
  { id: 'lexeme.morning',  kind: 'lexeme', gloss: 'morning',          target: '아침',     native: 'morning' },
  // ---- Lexemes used as slot fillers in the "have you ever" slice ----
  // (these are also present in v1 Flashcards; we re-declare them here as
  //  concepts so the validator can verify references and so the API can
  //  hydrate VocabDeck lessons without an extra round-trip.)
  //
  // `target` is the Korean string. Add a `targets: { ja: '…', zh: '…' }`
  // map later for multi-target support; the API hydrator already looks for it.
  { id: 'lexeme.jeju',         kind: 'lexeme', gloss: 'Jeju (island)',         target: '제주도',         native: 'Jeju (island)' },
  { id: 'lexeme.busan',        kind: 'lexeme', gloss: 'Busan',                 target: '부산',           native: 'Busan' },
  { id: 'lexeme.seoul',        kind: 'lexeme', gloss: 'Seoul',                 target: '서울',           native: 'Seoul' },
  { id: 'lexeme.usa',          kind: 'lexeme', gloss: 'United States',         target: '미국',           native: 'United States' },
  { id: 'lexeme.japan',        kind: 'lexeme', gloss: 'Japan',                 target: '일본',           native: 'Japan' },
  { id: 'lexeme.kimchi',       kind: 'lexeme', gloss: 'kimchi',                target: '김치',           native: 'kimchi' },
  { id: 'lexeme.bibimbap',     kind: 'lexeme', gloss: 'bibimbap',              target: '비빔밥',         native: 'bibimbap (mixed rice bowl)' },
  { id: 'lexeme.tteokbokki',   kind: 'lexeme', gloss: 'tteokbokki',            target: '떡볶이',         native: 'tteokbokki (spicy rice cakes)' },
  { id: 'lexeme.samgyeopsal',  kind: 'lexeme', gloss: 'samgyeopsal',           target: '삼겹살',         native: 'samgyeopsal (pork belly)' },
  { id: 'lexeme.drive',        kind: 'lexeme', gloss: 'to drive',              target: '운전하다',       native: 'to drive' },
  { id: 'lexeme.sing',         kind: 'lexeme', gloss: 'to sing',               target: '노래하다',       native: 'to sing' },
  { id: 'lexeme.watch_kmovie', kind: 'lexeme', gloss: 'to watch a Korean movie', target: '한국 영화 보다', native: 'to watch a Korean movie' },

  // ---- Action verbs used as slot fillers in the next 5 patterns ----
  { id: 'lexeme.eat',      kind: 'lexeme', gloss: 'to eat',      target: '먹다',     native: 'to eat' },
  { id: 'lexeme.drink',    kind: 'lexeme', gloss: 'to drink',    target: '마시다',   native: 'to drink' },
  { id: 'lexeme.go',       kind: 'lexeme', gloss: 'to go',       target: '가다',     native: 'to go' },
  { id: 'lexeme.see',      kind: 'lexeme', gloss: 'to see / watch', target: '보다',   native: 'to see / watch' },
  { id: 'lexeme.learn',    kind: 'lexeme', gloss: 'to learn',    target: '배우다',   native: 'to learn' },
  { id: 'lexeme.sleep',    kind: 'lexeme', gloss: 'to sleep',    target: '자다',     native: 'to sleep' },
  { id: 'lexeme.study',    kind: 'lexeme', gloss: 'to study',    target: '공부하다', native: 'to study' },
  { id: 'lexeme.buy',      kind: 'lexeme', gloss: 'to buy',      target: '사다',     native: 'to buy' },
  { id: 'lexeme.read',     kind: 'lexeme', gloss: 'to read',     target: '읽다',     native: 'to read' },
  { id: 'lexeme.write',    kind: 'lexeme', gloss: 'to write',    target: '쓰다',     native: 'to write' },
  { id: 'lexeme.come',     kind: 'lexeme', gloss: 'to come',     target: '오다',     native: 'to come' },
  { id: 'lexeme.work',     kind: 'lexeme', gloss: 'to work',     target: '일하다',   native: 'to work' },
  { id: 'lexeme.swim',     kind: 'lexeme', gloss: 'to swim',     target: '수영하다', native: 'to swim' },
  { id: 'lexeme.travel',   kind: 'lexeme', gloss: 'to travel',   target: '여행하다', native: 'to travel' },
  { id: 'lexeme.cook',     kind: 'lexeme', gloss: 'to cook',     target: '요리하다', native: 'to cook' },
  { id: 'lexeme.exercise', kind: 'lexeme', gloss: 'to exercise', target: '운동하다', native: 'to exercise' },
  { id: 'lexeme.rest',     kind: 'lexeme', gloss: 'to rest',     target: '쉬다',     native: 'to rest' },

  // ---- States (used in "because" + "if") ----
  { id: 'lexeme.tired',  kind: 'lexeme', gloss: 'tired',  target: '피곤하다', native: 'to be tired' },
  { id: 'lexeme.hungry', kind: 'lexeme', gloss: 'hungry', target: '배고프다', native: 'to be hungry' },
  { id: 'lexeme.busy',   kind: 'lexeme', gloss: 'busy',   target: '바쁘다',   native: 'to be busy' },
  { id: 'lexeme.sick',   kind: 'lexeme', gloss: 'sick',   target: '아프다',   native: 'to be sick / hurt' },
  { id: 'lexeme.happy',  kind: 'lexeme', gloss: 'happy',  target: '행복하다', native: 'to be happy' },

  // ---- Weather (used in "if") ----
  { id: 'lexeme.rain', kind: 'lexeme', gloss: 'rain', target: '비가 오다', native: 'it rains' },
  { id: 'lexeme.snow', kind: 'lexeme', gloss: 'snow', target: '눈이 오다', native: 'it snows' },
];

const CONCEPT_INDEX = Object.freeze(
  CONCEPTS.reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {}),
);

function getConcept(id) {
  return CONCEPT_INDEX[id] || null;
}

function isValidConceptId(id) {
  return Object.prototype.hasOwnProperty.call(CONCEPT_INDEX, id);
}

module.exports = {
  CONCEPTS,
  CONCEPT_INDEX,
  getConcept,
  isValidConceptId,
};
