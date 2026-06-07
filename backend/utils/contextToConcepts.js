// Maps approved PracticeContext entries to curriculum v2 concept IDs.
// Strictly read-only against PracticeContext — never mutates the
// capture/analysis pipeline. Currently matches by exact surface form
// against vocab concepts' target text. Phrase→pattern matching and
// environment-tag→topic matching are deferred until we have a
// reliable signal.

const PracticeContext = require('../models/PracticeContext');
const { CONCEPTS } = require('../curriculum/schema/concepts');

const CONTEXT_WINDOW_LIMIT = 12;

function normalize(text) {
  if (!text) return '';
  return String(text).trim();
}

// Index concepts by target surface form per targetLang for O(1) lookup.
// Built once at require time — the concept catalog is static.
const CONCEPT_INDEX_BY_TARGET = (() => {
  const byLang = new Map();
  for (const c of CONCEPTS) {
    const langs = c.targets ? Object.keys(c.targets) : [];
    if (c.target) langs.push('ko'); // legacy single-target field defaults to ko
    for (const lang of langs) {
      const text = (c.targets && c.targets[lang]) || c.target;
      if (!text) continue;
      const key = normalize(text);
      if (!key) continue;
      if (!byLang.has(lang)) byLang.set(lang, new Map());
      const langMap = byLang.get(lang);
      if (!langMap.has(key)) langMap.set(key, c.id);
    }
  }
  return byLang;
})();

function matchVocabToConceptId(text, targetLang) {
  const key = normalize(text);
  if (!key) return null;
  const langMap = CONCEPT_INDEX_BY_TARGET.get(targetLang);
  if (!langMap) return null;
  return langMap.get(key) || null;
}

// Returns Map<conceptId, { source, contextId, signalType }> for the most
// recent contexts. Caller decides how to use it (planner boost weight,
// reinforce-from-context, etc.).
async function getContextBoosts({ userId, targetLang, limit = CONTEXT_WINDOW_LIMIT }) {
  if (!userId) return new Map();
  const contexts = await PracticeContext.find({ userId, targetLanguage: targetLang })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  const matched = new Map();
  for (const ctx of contexts) {
    matchContextItems(ctx, targetLang, matched);
  }
  return matched;
}

// Synchronous variant that maps a single PracticeContext doc — used in
// the post-save reinforcement hook so we don't re-query the doc we just
// wrote.
function matchSingleContext(ctx, targetLang) {
  const matched = new Map();
  matchContextItems(ctx, targetLang, matched);
  return matched;
}

function matchContextItems(ctx, targetLang, matched) {
  if (!ctx) return;
  const items = ctx.vocabulary || [];
  for (const v of items) {
    if (v.language && v.language !== targetLang) continue;
    const conceptId = matchVocabToConceptId(v.text, targetLang);
    if (!conceptId) continue;
    if (matched.has(conceptId)) continue;
    matched.set(conceptId, {
      source: 'practice-context',
      contextId: ctx._id,
      signalType: 'vocab',
    });
  }
}

module.exports = {
  getContextBoosts,
  matchSingleContext,
  matchVocabToConceptId,
  CONTEXT_WINDOW_LIMIT,
};
