/**
 * The seven Curriculum v2 lesson types as a discriminated union on
 * `lessonType`. Each shape is described as a JSDoc typedef; the runtime
 * validator (../validator/validate.js) enforces these structurally.
 *
 * Every lesson MUST have:
 *   - id            unique across the whole curriculum, dotted notation
 *   - lessonType    one of LESSON_TYPES
 *   - conceptId     references CONCEPTS in ./concepts.js
 *   - targetLang    'ko' | 'en' | 'ja' | ... (ISO 639-1)
 *   - nativeLang    learner's L1, defaults to 'en' for now
 *   - difficulty    'beginner' | 'intermediate' | 'advanced'
 *   - prerequisites string[] of concept IDs
 *   - estimatedMinutes  rough completion time, used by the session planner
 */

const LESSON_TYPES = Object.freeze({
  PATTERN: 'PatternLesson',
  CLOZE: 'ClozeLesson',
  STORY: 'StoryLesson',
  CONTRAST: 'ContrastNote',
  VOCAB: 'VocabDeck',
  PRONUNCIATION: 'PronunciationTask',
  MINIMAL_PAIR: 'MinimalPairTask',
});

const LESSON_TYPE_VALUES = Object.freeze(Object.values(LESSON_TYPES));

const DIFFICULTIES = Object.freeze(['beginner', 'intermediate', 'advanced']);

/**
 * Base fields shared by every lesson.
 *
 * @typedef {Object} BaseLesson
 * @property {string} id
 * @property {string} lessonType
 * @property {string} conceptId
 * @property {string} targetLang
 * @property {string} nativeLang
 * @property {'beginner'|'intermediate'|'advanced'} difficulty
 * @property {string[]} prerequisites
 * @property {number} estimatedMinutes
 * @property {string} [function]        // from FUNCTIONS
 * @property {string} [register]        // from REGISTER
 */

// ============================================================================
// PatternLesson — anchors + drill slots + production task
// ============================================================================
/**
 * @typedef {BaseLesson} PatternLesson
 * @property {'PatternLesson'} lessonType
 * @property {string} patternTarget       The pattern in the target language
 *                                        with slot markers, e.g.
 *                                        "{action}-아/어 본 적이 있어요?"
 * @property {string} patternGloss        English description of the pattern.
 * @property {Anchor[]} anchors           ≥ 2 anchor examples.
 * @property {DrillSlot[]} drills         ≥ 3 drill slots across different
 *                                        slot categories.
 * @property {string} productionTask      What the learner is asked to do at
 *                                        the end. Free text.
 */
/**
 * @typedef {Object} Anchor
 * @property {string} target              Full target-language sentence.
 * @property {string} native              Full native-language translation.
 * @property {string} [gloss]             Word-by-word or morpheme breakdown.
 */
/**
 * @typedef {Object} DrillSlot
 * @property {string} slot                Slot category from SLOT_CATEGORIES.
 * @property {string[]} fillerConceptIds  Concept IDs of fillers to drill.
 * @property {string} promptTemplate      e.g. "Ask if I have ever been to {filler}."
 */

// ============================================================================
// ClozeLesson — sentence with a blank
// ============================================================================
/**
 * @typedef {BaseLesson} ClozeLesson
 * @property {'ClozeLesson'} lessonType
 * @property {ClozeItem[]} items          ≥ 3 items.
 */
/**
 * @typedef {Object} ClozeItem
 * @property {string} target              Sentence with `___` marking the blank.
 * @property {string} native              English translation of the full
 *                                        intended sentence.
 * @property {string} answer              The text that fills the blank.
 * @property {string[]} [distractors]     Optional multiple-choice distractors.
 * @property {string} [hint]              Hint shown on demand.
 */

// ============================================================================
// StoryLesson — graded reader / dialogue
// ============================================================================
/**
 * @typedef {BaseLesson} StoryLesson
 * @property {'StoryLesson'} lessonType
 * @property {'monologue'|'dialogue'} mode
 * @property {string} title
 * @property {StoryTurn[]} turns
 * @property {string[]} comprehensionQuestions
 */
/**
 * @typedef {Object} StoryTurn
 * @property {string} [speaker]           Speaker label, for dialogues.
 * @property {string} target              Target-language line.
 * @property {string} native              Translation. Hidden by default.
 * @property {GlossEntry[]} [glosses]     Per-word/-phrase glosses.
 */
/**
 * @typedef {Object} GlossEntry
 * @property {string} target
 * @property {string} native
 * @property {string} [note]
 */

// ============================================================================
// ContrastNote — Korean-vs-English explainer
// ============================================================================
/**
 * @typedef {BaseLesson} ContrastNote
 * @property {'ContrastNote'} lessonType
 * @property {string} l1Pattern           How the learner's L1 expresses this.
 * @property {string} l2Pattern           How the target language expresses it.
 * @property {string} explanation         Plain-English explanation of the
 *                                        difference.
 * @property {string[]} commonMistakes    Concrete wrong sentences English
 *                                        speakers produce, each followed by
 *                                        the correct version.
 * @property {CulturalNote} [culturalNote] Optional culture/context callout —
 *                                         e.g. age counting, family vocab by
 *                                         relationship, bowing triggers. Kept
 *                                         on ContrastNote rather than its own
 *                                         lesson type to keep the type union
 *                                         finite.
 */
/**
 * @typedef {Object} CulturalNote
 * @property {string} text                Short paragraph of context.
 * @property {string} [example]           One illustrative example.
 */

// ============================================================================
// VocabDeck — SRS-scheduled cards (wires into the existing Flashcard model)
// ============================================================================
/**
 * @typedef {BaseLesson} VocabDeck
 * @property {'VocabDeck'} lessonType
 * @property {string[]} fillerConceptIds  Concept IDs of items in this deck.
 *                                        Cards themselves live in the
 *                                        Flashcard collection; this lesson
 *                                        just groups them.
 */

// ============================================================================
// PronunciationTask — record + compare
// ============================================================================
/**
 * @typedef {BaseLesson} PronunciationTask
 * @property {'PronunciationTask'} lessonType
 * @property {PronunciationItem[]} items
 */
/**
 * @typedef {Object} PronunciationItem
 * @property {string} target              Target-language phrase to produce.
 * @property {string} native              Translation.
 * @property {string} [referenceAudioUrl} URL of native-speaker reference.
 * @property {string[]} [focusSounds]     Specific sounds to attend to.
 */

// ============================================================================
// MinimalPairTask — listening discrimination
// ============================================================================
/**
 * @typedef {BaseLesson} MinimalPairTask
 * @property {'MinimalPairTask'} lessonType
 * @property {MinimalPair[]} pairs
 */
/**
 * @typedef {Object} MinimalPair
 * @property {string} a                   First member (e.g. 가)
 * @property {string} b                   Second member (e.g. 카)
 * @property {string} contrast            What's being contrasted, e.g.
 *                                        "lax vs aspirated stops".
 * @property {string} [aAudioUrl]
 * @property {string} [bAudioUrl]
 */

module.exports = {
  LESSON_TYPES,
  LESSON_TYPE_VALUES,
  DIFFICULTIES,
};
