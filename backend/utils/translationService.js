const translate = require('google-translate-api-x');
const Translation = require('../models/Translation');

/**
 * Batch-translate an array of strings from English to the target language.
 * Uses google-translate-api-x's array support to send one request.
 * Returns an array of translated strings in the same order.
 */
async function batchTranslate(texts, toLang) {
  if (!texts.length) return [];
  try {
    const results = await translate(texts, { from: 'en', to: toLang });
    // results is an array of { text } objects when input is an array
    return results.map(r => r.text);
  } catch (err) {
    console.error(`Batch translation failed -> ${toLang}:`, err.message);
    // fallback: return originals
    return texts;
  }
}

/**
 * Given a lesson document and a target native language, return translated
 * native-side fields. Uses cached Translation doc if available; otherwise
 * translates via Google Translate and caches the result.
 *
 * Returns null if nativeLang is 'en' (no translation needed).
 */
async function getOrCreateTranslation(lesson, nativeLang) {
  if (!nativeLang || nativeLang === 'en') return null;

  const lessonId = lesson._id;

  // Check cache first
  const cached = await Translation.findOne({ lessonId, lang: nativeLang });
  if (cached) return cached;

  // Collect all strings to translate in one flat array, tracking their positions
  const textsToTranslate = [];
  const mapping = []; // { itemIndex, field, breakdownIndex? }

  for (let i = 0; i < lesson.content.length; i++) {
    const item = lesson.content[i];

    const nativeText = item.nativeText || item.english || '';
    if (nativeText.trim()) {
      mapping.push({ itemIndex: i, field: 'nativeText' });
      textsToTranslate.push(nativeText);
    }

    const exampleNative = item.exampleNative || item.exampleEnglish || '';
    if (exampleNative.trim()) {
      mapping.push({ itemIndex: i, field: 'exampleNative' });
      textsToTranslate.push(exampleNative);
    }

    if (item.breakdown && item.breakdown.length > 0) {
      for (let j = 0; j < item.breakdown.length; j++) {
        const bText = item.breakdown[j].native || item.breakdown[j].english || '';
        if (bText.trim()) {
          mapping.push({ itemIndex: i, field: 'breakdown', breakdownIndex: j });
          textsToTranslate.push(bText);
        }
      }
    }
  }

  // Single batch translation call
  const translated = await batchTranslate(textsToTranslate, nativeLang);

  // Reconstruct items array
  const itemsMap = {};
  for (let k = 0; k < mapping.length; k++) {
    const m = mapping[k];
    if (!itemsMap[m.itemIndex]) {
      itemsMap[m.itemIndex] = { index: m.itemIndex, nativeText: '', exampleNative: '', breakdown: [] };
    }
    const entry = itemsMap[m.itemIndex];

    if (m.field === 'nativeText') {
      entry.nativeText = translated[k];
    } else if (m.field === 'exampleNative') {
      entry.exampleNative = translated[k];
    } else if (m.field === 'breakdown') {
      // Ensure breakdown array is long enough
      while (entry.breakdown.length <= m.breakdownIndex) {
        entry.breakdown.push({ native: '' });
      }
      entry.breakdown[m.breakdownIndex].native = translated[k];
    }
  }

  const items = Object.values(itemsMap).sort((a, b) => a.index - b.index);

  // Cache the translation
  try {
    const doc = await Translation.create({ lessonId, lang: nativeLang, items });
    return doc;
  } catch (err) {
    if (err.code === 11000) {
      return Translation.findOne({ lessonId, lang: nativeLang });
    }
    console.error('Failed to cache translation:', err.message);
    return { items };
  }
}

/**
 * Apply cached translations onto a lesson's JSON object.
 * Mutates and returns the lesson object.
 */
function applyTranslation(lessonObj, translation) {
  if (!translation || !translation.items) return lessonObj;

  for (const item of translation.items) {
    const content = lessonObj.content[item.index];
    if (!content) continue;

    if (item.nativeText) content.nativeText = item.nativeText;
    if (item.exampleNative) content.exampleNative = item.exampleNative;

    // Also update legacy fields for backward compat
    if (item.nativeText) content.english = item.nativeText;
    if (item.exampleNative) content.exampleEnglish = item.exampleNative;

    if (item.breakdown && content.breakdown) {
      for (let j = 0; j < item.breakdown.length; j++) {
        if (content.breakdown[j] && item.breakdown[j].native) {
          content.breakdown[j].native = item.breakdown[j].native;
          content.breakdown[j].english = item.breakdown[j].native;
        }
      }
    }
  }

  return lessonObj;
}

module.exports = { batchTranslate, getOrCreateTranslation, applyTranslation };
