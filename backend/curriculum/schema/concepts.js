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
 */

const CONCEPTS = [
  // ---- Patterns ----
  {
    id: 'pattern.experience.have_you_ever',
    kind: 'pattern',
    gloss: 'Have you ever V-ed?',
    function: FUNCTIONS.EXPERIENCE,
    prerequisites: [],
  },
  {
    id: 'pattern.preference.want_to',
    kind: 'pattern',
    gloss: 'I want to V',
    function: FUNCTIONS.PREFERENCE,
    prerequisites: [],
  },
  {
    id: 'pattern.intention.going_to',
    kind: 'pattern',
    gloss: 'I will / am going to V',
    function: FUNCTIONS.INTENTION,
    prerequisites: [],
  },
  {
    id: 'pattern.ability.can_cannot',
    kind: 'pattern',
    gloss: 'I can / cannot V',
    function: FUNCTIONS.ABILITY,
    prerequisites: [],
  },
  {
    id: 'pattern.reason.because',
    kind: 'pattern',
    gloss: 'Because V/A, ...',
    function: FUNCTIONS.REASON,
    prerequisites: [],
  },
  {
    id: 'pattern.condition.if',
    kind: 'pattern',
    gloss: 'If V/A, ...',
    function: FUNCTIONS.CONDITION,
    prerequisites: [],
  },
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
