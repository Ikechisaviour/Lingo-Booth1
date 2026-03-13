/**
 * generateLangFiles.js
 * Generates per-language flashcard files from the Korean master flashcardData.js
 * Each language gets all 2422 cards with proper categories and translations.
 *
 * Usage: node scripts/generateLangFiles.js
 */

const fs = require('fs');
const path = require('path');
const cards = require('../flashcardData');

const langs = ['es','fr','de','zh','ja','hi','ar','he','pt','it','nl','ru','id','tr','bn','ta','ms','fil'];

// Group cards by their first category to maintain organized output
const catOrder = [];
const cardsByCat = {};
cards.forEach(c => {
  const cat = Array.isArray(c.category) ? c.category[0] : (c.category || 'uncategorized');
  if (!cardsByCat[cat]) {
    cardsByCat[cat] = [];
    catOrder.push(cat);
  }
  cardsByCat[cat].push(c);
});

function escapeStr(s) {
  if (!s) return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

langs.forEach(lang => {
  const lines = ['module.exports = ['];

  catOrder.forEach(cat => {
    const catCards = cardsByCat[cat];
    lines.push(`  // ===== ${cat.toUpperCase()} (${catCards.length}) =====`);

    catCards.forEach(card => {
      const targetWord = card[lang] || '';
      const english = card.english || '';
      // Korean romanization doesn't apply to other languages — leave empty
      const romanization = '';
      const categories = Array.isArray(card.category) ? card.category : [card.category || 'uncategorized'];
      const catStr = categories.map(c => `'${escapeStr(c)}'`).join(', ');

      lines.push(`  { korean: '${escapeStr(targetWord)}', romanization: '${escapeStr(romanization)}', english: '${escapeStr(english)}', category: [${catStr}], targetLang: '${lang}' },`);
    });
    lines.push('');
  });

  lines.push('];');

  const outPath = path.join(__dirname, '..', 'flashcardData', `${lang}.js`);
  fs.writeFileSync(outPath, lines.join('\n') + '\n');
  console.log(`Generated ${lang}.js with ${cards.length} cards`);
});

console.log('\nDone! All language files updated.');
