/**
 * Curriculum v2 lesson-drafting helper, Anthropic-backed.
 *
 * The lesson EVALUATORS in ai.js stay on DeepSeek (fast, cheap, fine for
 * structured grading). LESSON AUTHORING is a different problem — it requires
 * high-quality Korean output, careful adherence to a schema, and few-shot
 * pattern matching against the existing 6 lessons. Claude is the right tool.
 *
 * Used by `backend/scripts/draftCurriculumLesson.js` (the CLI). NOT called
 * from any HTTP route — drafting is an offline authoring tool, not a runtime
 * feature.
 */

const fs = require('fs');
const path = require('path');

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = process.env.ANTHROPIC_CURRICULUM_MODEL || 'claude-opus-4-7';
const ANTHROPIC_VERSION = '2023-06-01';
const PROVIDER_TIMEOUT_MS = 60_000;

const SCHEMA_DOC_PATH = path.join(__dirname, 'schema', 'lessonTypes.js');
const FEW_SHOT_LESSON_PATH = path.join(__dirname, 'lessons', 'pattern.preference.want_to.js');

function readFileSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch (_) { return ''; }
}

function isAiAuthorAvailable() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/**
 * Call Claude with a tightly-shaped prompt that demands valid JS module text.
 *
 * @param {Object} args
 * @param {string} args.system    System prompt.
 * @param {string} args.user      User prompt (the spec to draft against).
 * @param {number} [args.maxTokens]  Default 8192 — drafts are 200–400 lines.
 * @returns {Promise<string>}     Raw text from the model (expected to be a JS module).
 */
async function callClaude({ system, user, maxTokens = 8192, temperature = 0.4 }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    const err = new Error('ANTHROPIC_API_KEY is not set. Drafting requires an Anthropic API key.');
    err.code = 'AI_NOT_CONFIGURED';
    throw err;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        max_tokens: maxTokens,
        temperature,
        system,
        messages: [{ role: 'user', content: user }],
      }),
      signal: controller.signal,
    });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Anthropic ${response.status}: ${detail.slice(0, 400)}`);
    }
    const data = await response.json();
    const blocks = data?.content || [];
    return blocks.map((b) => b?.text || '').join('').trim();
  } finally {
    clearTimeout(timer);
  }
}

const SYSTEM_PROMPT = [
  'You are a senior Korean-language curriculum designer drafting CEFR A1–A2 lesson files for a learner-facing app.',
  '',
  'You will be given:',
  '  1. The lesson-type schema (a JS module with JSDoc typedefs).',
  '  2. ONE complete reference lesson file as a few-shot example.',
  '  3. A spec row describing a new concept to author.',
  '',
  'You must output a SINGLE JavaScript module file that:',
  '  - Has the same shape as the reference (require schema modules, define COMMON, export an array of 7 lessons).',
  '  - Generates ALL SEVEN lesson types for the new concept (ContrastNote, PatternLesson, ClozeLesson, StoryLesson, VocabDeck, PronunciationTask, MinimalPairTask).',
  '  - Uses ONLY concept IDs that already exist in concepts.js (the user will tell you which lexemes are available).',
  '  - Sets difficulty, function, register, cefr-implicit level appropriately for A1/A2.',
  '  - Korean text MUST be natural, accurate, polite (-요) form by default. Honorifics only where pedagogically warranted.',
  '  - Provide romanization for every Korean string by adding a `romanization` sibling field. Use Revised Romanization.',
  '  - Include a `culturalNote` on the ContrastNote when culturally relevant (age, family, honorifics, food etiquette).',
  '  - Common mistakes section MUST be drawn from real beginner errors, not generic "watch your particles".',
  '',
  'Output rules:',
  '  - Emit ONLY the JavaScript module text. No prose. No markdown fences.',
  '  - Start with: `/**` block-comment explaining the concept, then `const { LESSON_TYPES } = require(\'../schema/lessonTypes\');` etc.',
  '  - End with: `module.exports = [contrast, pattern, cloze, story, vocab, pronunciation, minimalPair];`',
].join('\n');

/**
 * Draft a single lesson file for one pattern concept.
 *
 * @param {Object} spec
 * @param {string} spec.conceptId         e.g. 'pattern.identification.be'
 * @param {string} spec.gloss             e.g. 'I am X' (copula 이에요/예요)
 * @param {string} spec.function          FUNCTIONS.* key, e.g. 'IDENTIFICATION'
 * @param {'A1'|'A2'} spec.cefr
 * @param {1|2} spec.topik
 * @param {string} spec.patternTarget     e.g. '{filler}이에요/예요'
 * @param {string} spec.patternGloss      e.g. 'I am {filler}'
 * @param {string[]} [spec.prerequisites] Other concept IDs to require first.
 * @param {string[]} [spec.requiresConjugation]
 * @param {string} spec.notes             Free-form authoring notes for Claude.
 * @param {string[]} spec.availableLexemes  Lexeme concept IDs Claude may use.
 * @returns {Promise<{ moduleText: string, raw: string }>}
 */
async function draftPatternLesson(spec) {
  if (!spec?.conceptId) throw new Error('spec.conceptId required');

  const schemaDoc = readFileSafe(SCHEMA_DOC_PATH);
  const fewShot = readFileSafe(FEW_SHOT_LESSON_PATH);

  const user = [
    '--- LESSON TYPE SCHEMA (read-only) ---',
    schemaDoc,
    '',
    '--- REFERENCE LESSON (few-shot — match its shape exactly) ---',
    fewShot,
    '',
    '--- SPEC FOR THE NEW LESSON ---',
    JSON.stringify(spec, null, 2),
    '',
    'Draft the new lesson file now. Output ONLY the module text.',
  ].join('\n');

  const moduleText = await callClaude({ system: SYSTEM_PROMPT, user });
  // Defensive: strip accidental markdown fences if the model emitted any.
  const cleaned = moduleText
    .replace(/^```(?:javascript|js)?\s*/i, '')
    .replace(/```\s*$/, '')
    .trim();
  return { moduleText: cleaned, raw: moduleText };
}

module.exports = {
  draftPatternLesson,
  isAiAuthorAvailable,
  DEFAULT_MODEL,
  SYSTEM_PROMPT, // exported for snapshot testing
};
