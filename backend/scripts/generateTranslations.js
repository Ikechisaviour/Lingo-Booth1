/**
 * generateTranslations.js
 * Translates all flashcard English values into 19 languages and writes them
 * back into flashcardData.js as per-language fields (es, fr, de, ...).
 *
 * Usage: node scripts/generateTranslations.js
 *
 * - Saves progress to scripts/translation_progress.json after each language
 * - Can be safely interrupted and re-run — already-translated languages are skipped
 * - Uses the unofficial Google Translate endpoint (no API key required)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const flashcardData = require('../flashcardData');

// App language codes → Google Translate language codes
const LANG_CODES = {
  es:  'es',
  fr:  'fr',
  de:  'de',
  zh:  'zh-CN',
  ja:  'ja',
  hi:  'hi',
  ar:  'ar',
  he:  'iw',   // Google uses 'iw' for Hebrew
  pt:  'pt',
  it:  'it',
  nl:  'nl',
  ru:  'ru',
  id:  'id',
  ms:  'ms',
  fil: 'tl',   // Google uses 'tl' for Filipino/Tagalog
  tr:  'tr',
  bn:  'bn',
  ta:  'ta',
};

const APP_LANGS = Object.keys(LANG_CODES);
const PROGRESS_FILE = path.join(__dirname, 'translation_progress.json');
const DELAY_MS = 150;       // ms between requests
const PARALLEL = 5;         // concurrent requests per batch

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function translateOne(text, googleLangCode) {
  return new Promise((resolve) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${googleLangCode}&dt=t&q=${encodeURIComponent(text)}`;
    const req = https.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const result = parsed[0].map(item => item[0]).join('');
          resolve(result || text);
        } catch {
          resolve(text);
        }
      });
    });
    req.on('error', () => resolve(text));
    req.on('timeout', () => { req.destroy(); resolve(text); });
  });
}

async function translateBatch(texts, googleLangCode) {
  const results = [];
  for (let i = 0; i < texts.length; i += PARALLEL) {
    const chunk = texts.slice(i, i + PARALLEL);
    const translated = await Promise.all(chunk.map(t => translateOne(t, googleLangCode)));
    results.push(...translated);
    if (i + PARALLEL < texts.length) await sleep(DELAY_MS);
  }
  return results;
}

async function main() {
  // Load saved progress
  let progress = {};
  if (fs.existsSync(PROGRESS_FILE)) {
    progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
    console.log(`Resuming from saved progress (${Object.keys(progress).length} languages already done)`);
  }

  // Collect unique English values
  const uniqueEnglish = [...new Set(flashcardData.map(c => c.english).filter(Boolean))];
  console.log(`${uniqueEnglish.length} unique English values across ${flashcardData.length} cards`);
  console.log(`Translating to ${APP_LANGS.length} languages...\n`);

  for (const appLang of APP_LANGS) {
    if (progress[appLang]) {
      console.log(`✓ ${appLang} — already done (${Object.keys(progress[appLang]).length} entries)`);
      continue;
    }

    const googleLang = LANG_CODES[appLang];
    console.log(`Translating to ${appLang} (${googleLang})...`);
    progress[appLang] = {};

    const translations = await translateBatch(uniqueEnglish, googleLang);
    uniqueEnglish.forEach((eng, i) => {
      progress[appLang][eng] = translations[i];
    });

    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
    console.log(`✓ ${appLang} done — ${Object.keys(progress[appLang]).length} translations saved`);
  }

  // Build updated flashcardData with translation fields
  console.log('\nBuilding updated flashcardData.js...');
  const updated = flashcardData.map(card => {
    const newCard = { ...card };
    for (const appLang of APP_LANGS) {
      const translated = progress[appLang]?.[card.english];
      // Only store if different from English (avoid pointless fields)
      if (translated && translated !== card.english) {
        newCard[appLang] = translated;
      }
    }
    return newCard;
  });

  const header = `// Auto-generated flashcard data — ${updated.length} cards\n` +
    `// Categories: adjectives, body, business, clothing, colors, common, daily-life, education, emotions, family, food, greetings, healthcare, hobbies, household, nature, numbers, places, pronouns, shopping, technology, time, transportation, travel, verbs, weather\n` +
    `// Translations: ${APP_LANGS.join(', ')}\n\n`;

  // Format as compact JS (one card per line for readability)
  const lines = updated.map(card => '  ' + JSON.stringify(card));
  const output = header + `const flashcardData = [\n${lines.join(',\n')}\n];\n\nmodule.exports = flashcardData;\n`;

  const outPath = path.join(__dirname, '../flashcardData.js');
  fs.writeFileSync(outPath, output);
  console.log(`\n✅ Done! flashcardData.js updated with translations for all ${APP_LANGS.length} languages.`);
  console.log(`   File size: ${(fs.statSync(outPath).size / 1024).toFixed(0)} KB`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
