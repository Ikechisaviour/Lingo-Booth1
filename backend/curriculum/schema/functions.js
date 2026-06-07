/**
 * Communicative function tags. Lessons are organized by function (what the
 * learner can DO with the language) in addition to grammar.
 *
 * Add new functions sparingly. Functions are meant to be coarse-grained.
 */

const FUNCTIONS = Object.freeze({
  GREETING: 'greeting',
  INTRODUCTION: 'introduction',
  EXPERIENCE: 'experience',           // have you ever, I've been to
  PREFERENCE: 'preference',           // I like, I prefer
  ABILITY: 'ability',                 // can / cannot
  PERMISSION: 'permission',           // may I, you can
  OBLIGATION: 'obligation',           // must, have to
  INTENTION: 'intention',             // going to, will
  REQUEST: 'request',                 // please, would you
  SUGGESTION: 'suggestion',           // let's, how about
  OPINION: 'opinion',                 // I think, in my opinion
  REASON: 'reason',                   // because, so
  CONDITION: 'condition',             // if, when
  COMPARISON: 'comparison',           // more than, less than
  DESCRIPTION: 'description',         // it is, looks like
  NARRATION_PAST: 'narration_past',   // recounting past events
  PLANNING_FUTURE: 'planning_future', // future plans
  QUANTITY: 'quantity',               // how many, some, all
  TIME_REFERENCE: 'time_reference',   // when something happens
  LOCATION: 'location',               // where something is
});

const FUNCTION_VALUES = Object.freeze(Object.values(FUNCTIONS));

function isValidFunction(value) {
  return FUNCTION_VALUES.includes(value);
}

module.exports = {
  FUNCTIONS,
  FUNCTION_VALUES,
  isValidFunction,
};
