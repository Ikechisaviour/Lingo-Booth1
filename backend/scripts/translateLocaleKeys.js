/* eslint-disable no-console */
// Fill every non-English locale file under frontend/src/locales/<lang>/translation.json
// with translations for any keys that exist in en/ but are missing or still
// stamped with the canonical English string.
//
// Strategy:
//   1. Read en/translation.json as the source of truth (canonical English).
//   2. For each non-English locale, walk the same key paths.
//   3. Collect missing keys + keys whose value equals the English value
//      (i.e. unfilled placeholders).
//   4. Batch-translate them via google-translate-api-x.
//   5. Write back.
//
// Per AGENTS.md "Language Support": all UI text must use i18n keys, and
// every locale must mirror en/'s key set. The auditLocaleKeys.js script
// checks key parity; this script keeps the values in sync after new keys
// are added.
//
// Locale-generation rule:
// - write JSON as UTF-8 and preserve non-Latin scripts.
// - never accept generated "????" or mojibake in translated values.
// - public/user-facing labels must be localized through this pipeline instead
//   of hardcoded in JSX or copied from one language into another.
//
// Run:
//   node backend/scripts/translateLocaleKeys.js                 # fill missing/equal in all locales
//   node backend/scripts/translateLocaleKeys.js --langs=es,fr   # narrow scope
//   node backend/scripts/translateLocaleKeys.js --force         # re-translate every key

const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api-x');

// Default to web locales; pass --surface=mobile to fill the React Native
// locale set instead. The mobile and web locale trees are independent: each
// surface has its own en/translation.json as the source of truth for that
// surface, and translations land in the matching tree.
const SURFACE_DIRS = {
  web: path.resolve(__dirname, '..', '..', 'frontend', 'src', 'locales'),
  mobile: path.resolve(__dirname, '..', '..', 'mobile', 'src', 'locales'),
};
const SOURCE_LANG = 'en';
const TRANSLATE_LANG_ALIASES = {
  fil: 'tl',
  zh: 'zh-CN',
};

function parseArgs(argv) {
  const out = {};
  for (const a of argv.slice(2)) {
    if (!a.startsWith('--')) continue;
    const eq = a.indexOf('=');
    if (eq === -1) out[a.slice(2)] = true;
    else out[a.slice(2, eq)] = a.slice(eq + 1);
  }
  return out;
}

function listLocales(localesDir) {
  return fs.readdirSync(localesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== SOURCE_LANG)
    .map((d) => d.name);
}

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function saveJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

function placeholders(value) {
  if (typeof value !== 'string') return [];
  const out = [];
  const pattern = /{{\s*([^{}\s]+)\s*}}/g;
  let match;
  while ((match = pattern.exec(value))) out.push(match[1]);
  return out;
}

function samePlaceholderSet(left, right) {
  if (left.length !== right.length) return false;
  const a = [...left].sort();
  const b = [...right].sort();
  return a.every((value, index) => value === b[index]);
}

function isCorruptGeneratedText(value) {
  return typeof value === 'string' && /\?{3,}/.test(value);
}

function protectPlaceholders(value) {
  const placeholdersInValue = [];
  const text = String(value).replace(/{{\s*([^{}\s]+)\s*}}/g, (_match, name) => {
    const index = placeholdersInValue.push(name) - 1;
    return `⟦PH${index}⟧`;
  });
  return {
    text,
    restore(translated) {
      let output = String(translated || '');
      placeholdersInValue.forEach((name, index) => {
        const tokenPattern = new RegExp(`⟦\\s*PH\\s*${index}\\s*⟧|\\[\\[\\s*PH\\s*${index}\\s*\\]\\]|PH\\s*${index}`, 'gi');
        output = output.replace(tokenPattern, `{{${name}}}`);
      });
      return output;
    },
  };
}

// Recursively walk the English source and the locale; produce a list of
// { path, englishValue, currentValue } for every leaf that is missing or
// is still the English value.
function collectGaps(source, target, force, prefix = []) {
  const gaps = [];
  for (const [key, value] of Object.entries(source)) {
    const nextPath = [...prefix, key];
    const currentValue = target?.[key];

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const childTarget = (currentValue && typeof currentValue === 'object' && !Array.isArray(currentValue))
        ? currentValue
        : {};
      gaps.push(...collectGaps(value, childTarget, force, nextPath));
      continue;
    }

    // Skip language NAMES (the {"languages": {"en": "English", ...}} block)
    // — those are the names of languages, intentionally written in the
    // locale's own script (e.g. "한국어"). They live under the top-level
    // key "languages" and should not be translated.
    if (nextPath[0] === 'languages') continue;

    if (typeof value !== 'string') continue;

    const isMissing = currentValue === undefined || currentValue === null;
    const hasCorruptGeneratedText = isCorruptGeneratedText(currentValue);
    const hasBadPlaceholders = !samePlaceholderSet(placeholders(value), placeholders(currentValue));
    const isUnfilled = typeof currentValue === 'string' && currentValue === value && SOURCE_LANG !== 'en' ? false
      : (typeof currentValue === 'string' && currentValue === value);

    if (force || isMissing || isUnfilled || hasCorruptGeneratedText || hasBadPlaceholders) {
      gaps.push({ path: nextPath, englishValue: value, currentValue });
    }
  }
  return gaps;
}

function setByPath(obj, pathArr, value) {
  let current = obj;
  for (let i = 0; i < pathArr.length - 1; i++) {
    const key = pathArr[i];
    if (!current[key] || typeof current[key] !== 'object' || Array.isArray(current[key])) {
      current[key] = {};
    }
    current = current[key];
  }
  current[pathArr[pathArr.length - 1]] = value;
}

async function translateBatch(texts, toLang) {
  if (!texts.length) return [];
  const protectedTexts = texts.map(protectPlaceholders);
  const to = TRANSLATE_LANG_ALIASES[toLang] || toLang;
  try {
    // google-translate-api-x supports both string-array and single-string inputs.
    const results = await translate(protectedTexts.map((entry) => entry.text), {
      from: SOURCE_LANG,
      to,
      forceTo: true,
      rejectOnPartialFail: false,
    });
    return results.map((r, index) => {
      if (!r || typeof r.text !== 'string') return null;
      return protectedTexts[index].restore(r.text);
    });
  } catch (err) {
    console.error(`Batch translate ${SOURCE_LANG}->${toLang} failed:`, err.message);
    return texts.map(() => null);
  }
}

async function fillLocale(localesDir, localeName, force) {
  const file = path.join(localesDir, localeName, 'translation.json');
  if (!fs.existsSync(file)) {
    console.warn(`Skip ${localeName}: no translation.json`);
    return { localeName, filled: 0, failed: 0 };
  }
  const source = loadJson(path.join(localesDir, SOURCE_LANG, 'translation.json'));
  const target = loadJson(file);

  const gaps = collectGaps(source, target, force);
  if (!gaps.length) {
    return { localeName, filled: 0, failed: 0 };
  }

  // Chunk by 50 to be a polite citizen.
  const CHUNK = 50;
  let filled = 0;
  let failed = 0;
  for (let i = 0; i < gaps.length; i += CHUNK) {
    const slice = gaps.slice(i, i + CHUNK);
    const texts = slice.map((g) => g.englishValue);
    const translated = await translateBatch(texts, localeName);
    slice.forEach((gap, j) => {
      const value = translated[j];
      const placeholdersOk = samePlaceholderSet(placeholders(gap.englishValue), placeholders(value));
      const valueOk = value && typeof value === 'string' && value.trim() && !isCorruptGeneratedText(value) && placeholdersOk;
      if (valueOk) {
        setByPath(target, gap.path, value);
        filled += 1;
      } else {
        // Fall back: keep the English string so the audit can still pass and
        // a fluent reviewer can fix it later.
        setByPath(target, gap.path, gap.englishValue);
        failed += 1;
      }
    });
  }

  saveJson(file, target);
  return { localeName, filled, failed };
}

async function main() {
  const args = parseArgs(process.argv);
  const force = !!args.force;
  const surface = String(args.surface || 'web').toLowerCase();
  const localesDir = SURFACE_DIRS[surface];
  if (!localesDir) {
    console.error(`Unknown --surface=${surface}. Use one of: ${Object.keys(SURFACE_DIRS).join(', ')}`);
    process.exit(1);
  }
  const requested = args.langs
    ? args.langs.split(',').map((s) => s.trim()).filter(Boolean)
    : listLocales(localesDir);

  console.log(`Filling ${surface} locales: ${requested.join(', ')}${force ? ' (force re-translate)' : ''}`);

  const results = [];
  for (const localeName of requested) {
    const r = await fillLocale(localesDir, localeName, force);
    results.push(r);
    if (r.filled || r.failed) {
      console.log(`  ${localeName}: filled ${r.filled}, fallback ${r.failed}`);
    } else {
      console.log(`  ${localeName}: nothing to do`);
    }
  }

  const totalFilled = results.reduce((s, r) => s + r.filled, 0);
  const totalFailed = results.reduce((s, r) => s + r.failed, 0);
  console.log(`\nDone. ${totalFilled} translated, ${totalFailed} fell back to English placeholder.`);
}

main().catch((err) => {
  console.error('Fill failed:', err.message || err);
  process.exit(1);
});
