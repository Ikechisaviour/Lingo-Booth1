/**
 * generateLangFiles.js
 * Generates per-language flashcard files from the master flashcardData.js.
 *
 * The generated files keep target-language text plus a neutral concept gloss.
 * They do not carry every possible native-language translation pair.
 *
 * Language-preparation rule:
 * - target text fields must contain only the language being taught.
 * - do not embed English meanings in target strings, e.g. "mā 妈 (mother)".
 * - keep meanings in neutral concept gloss / canonical English explanation
 *   fields so runtime translation can serve each learner's native language.
 * - generated files must be written as UTF-8 and must not contain mojibake
 *   placeholders such as "????" in non-Latin content.
 *
 * Usage: node scripts/generateLangFiles.js
 */

const fs = require('fs');
const path = require('path');
const cards = require('../flashcardData');
const { prepareDefaultFlashcardForSeed, languageField } = require('../utils/languageConcepts');

const langs = ['en', 'ko', 'es', 'fr', 'de', 'zh', 'ja', 'hi', 'ar', 'he', 'pt', 'it', 'nl', 'ru', 'id', 'tr', 'bn', 'ta', 'ms', 'fil'];

const catOrder = [];
const cardsByCat = {};
cards.forEach((card) => {
  const cat = Array.isArray(card.category) ? card.category[0] : (card.category || 'uncategorized');
  if (!cardsByCat[cat]) {
    cardsByCat[cat] = [];
    catOrder.push(cat);
  }
  cardsByCat[cat].push(card);
});

function escapeStr(value) {
  if (!value) return '';
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function jsValue(value) {
  return JSON.stringify(value || null);
}

function hasEnglishMeaningParenthetical(value) {
  return /\([A-Za-z][A-Za-z\s,'/-]{2,}\)/.test(String(value || ''));
}

function generatedCardForLanguage(card, lang, index) {
  const targetField = languageField(lang);
  const doc = prepareDefaultFlashcardForSeed({
    ...card,
    korean: card[targetField] || '',
  }, lang, index);
  const targetWord = doc[targetField] || doc.korean || '';
  if (!targetWord) return '';
  if (lang !== 'en' && hasEnglishMeaningParenthetical(targetWord)) {
    throw new Error(`Refusing to generate ${lang} target text with embedded English meaning: ${targetWord}`);
  }

  const category = Array.isArray(doc.category) ? doc.category : [doc.category || 'uncategorized'];
  const conceptId = doc.conceptId ? `, conceptId: '${escapeStr(doc.conceptId)}'` : '';
  const conceptGloss = doc.conceptGloss ? `, conceptGloss: '${escapeStr(doc.conceptGloss)}'` : '';
  const usage = doc.usage && Object.keys(doc.usage).length > 0
    ? `, usage: ${jsValue(doc.usage)}`
    : '';

  return `  { korean: '${escapeStr(targetWord)}', romanization: '${escapeStr(doc.romanization || '')}', english: '${escapeStr(doc.english || '')}', category: ${jsValue(category)}, targetLang: '${lang}'${conceptId}${conceptGloss}${usage} },`;
}

langs.forEach((lang) => {
  const lines = ['module.exports = ['];

  catOrder.forEach((cat) => {
    const catCards = cardsByCat[cat];
    lines.push(`  // ===== ${cat.toUpperCase()} (${catCards.length}) =====`);

    catCards.forEach((card, index) => {
      const line = generatedCardForLanguage(card, lang, index);
      if (line) lines.push(line);
    });
    lines.push('');
  });

  lines.push('];');

  const outPath = path.join(__dirname, '..', 'flashcardData', `${lang}.js`);
  const output = `${lines.join('\n')}\n`;
  if (/\?\?\?\?/.test(output)) {
    throw new Error(`Refusing to write ${lang}.js because generated output contains mojibake placeholders.`);
  }
  fs.writeFileSync(outPath, output, 'utf8');
  console.log(`Generated ${lang}.js with ${cards.length} source cards`);
});

console.log('\nDone. All language files updated.');
