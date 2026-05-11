/**
 * generateLangFiles.js
 * Generates per-language flashcard files from the master flashcardData.js.
 *
 * The generated files keep target-language text plus a neutral concept gloss.
 * They do not carry every possible native-language translation pair.
 *
 * Usage: node scripts/generateLangFiles.js
 */

const fs = require('fs');
const path = require('path');
const cards = require('../flashcardData');
const { prepareDefaultFlashcardForSeed } = require('../utils/languageConcepts');

const langs = ['es', 'fr', 'de', 'zh', 'ja', 'hi', 'ar', 'he', 'pt', 'it', 'nl', 'ru', 'id', 'tr', 'bn', 'ta', 'ms', 'fil'];

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

function generatedCardForLanguage(card, lang, index) {
  const doc = prepareDefaultFlashcardForSeed({
    ...card,
    korean: card[lang] || '',
  }, lang, index);
  const targetWord = doc[lang] || doc.korean || '';
  if (!targetWord) return '';

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
  fs.writeFileSync(outPath, `${lines.join('\n')}\n`);
  console.log(`Generated ${lang}.js with ${cards.length} source cards`);
});

console.log('\nDone. All language files updated.');
