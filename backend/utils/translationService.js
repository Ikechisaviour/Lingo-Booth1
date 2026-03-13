const translate = require('google-translate-api-x');
const Translation = require('../models/Translation');

// Languages that use non-Latin scripts and benefit from romanization
const ROMANIZATION_LANGS = new Set([
  'ko', 'zh', 'ja', 'hi', 'ar', 'he', 'ru', 'bn', 'ta',
  'th', 'ka', 'am', 'my', 'km', 'lo', 'si', 'ne', 'ur',
  'fa', 'ps', 'yi', 'gu', 'kn', 'ml', 'te', 'pa', 'uk', 'bg', 'el',
]);

/**
 * Batch-translate an array of strings.
 * Returns an array of { text, pronunciation } in the same order.
 */
async function batchTranslateRaw(texts, fromLang, toLang) {
  if (!texts.length) return [];
  try {
    const results = await translate(texts, { from: fromLang, to: toLang });
    return results.map(r => ({
      text: r.text,
      pronunciation: r.pronunciation || '',
    }));
  } catch (err) {
    console.error(`Batch translation failed ${fromLang}->${toLang}:`, err.message);
    return texts.map(t => ({ text: t, pronunciation: '' }));
  }
}

/**
 * Get romanization for target-language texts by translating them to English
 * and extracting the pronunciation field from Google Translate.
 * Returns an array of romanization strings.
 */
async function batchRomanize(texts, fromLang) {
  if (!texts.length) return [];
  try {
    const results = await translate(texts, { from: fromLang, to: 'en' });
    return results.map(r => r.pronunciation || '');
  } catch (err) {
    console.error(`Batch romanization failed for ${fromLang}:`, err.message);
    return texts.map(() => '');
  }
}

// Non-Latin script languages — used to decide if native-script phonetics are needed
const NON_LATIN_LANGS = new Set([
  'ko', 'zh', 'ja', 'hi', 'ar', 'he', 'ru', 'bn', 'ta',
  'th', 'ka', 'am', 'my', 'km', 'lo', 'si', 'ne', 'ur',
  'fa', 'ps', 'yi', 'gu', 'kn', 'ml', 'te', 'pa', 'uk', 'bg', 'el',
]);

/**
 * Transliterate romanization strings into the native script.
 * For non-Latin native speakers, this converts Latin pronunciation guides
 * into the learner's own alphabet so they can read the sounds.
 *
 * e.g. "an-nyeong-ha-se-yo" → Arabic "آن نيونغ ها سي يو"
 *      "an-nyeong-ha-se-yo" → Hindi "एन-नयॉन्ग-हा-से-यो"
 *      "an-nyeong-ha-se-yo" → Russian "Аннён-ха-се-йо"
 *
 * Approach: send romanization (with syllable separators) to Google Translate
 * targeting the native language. Google transliterates phonetically rather than
 * translating when the input looks like a foreign phonetic string.
 *
 * @param {string[]} romanizations - Latin-script romanization strings
 * @param {string} nativeLang - target native language code (ar, hi, ru, etc.)
 * @returns {string[]} - native-script phonetic approximations (empty string if failed)
 */
async function batchNativePhonetic(romanizations, fromLang, nativeLang) {
  if (!romanizations.length) return [];
  // Only needed when native language uses non-Latin script
  if (!NON_LATIN_LANGS.has(nativeLang)) return romanizations.map(() => '');

  // Add hyphens between syllables to help Google transliterate rather than translate.
  // If romanization already has hyphens or spaces, keep as-is.
  const prepared = romanizations.map(r => {
    if (!r || r.includes('-') || r.includes(' ')) return r || '';
    // Insert hyphens at likely syllable boundaries (before consonant clusters after vowels)
    return r.replace(/([aeiouyü])([^aeiouyü\s-])/gi, '$1-$2');
  });

  try {
    const results = await translate(prepared, { from: 'en', to: nativeLang });
    return results.map((r, i) => {
      const result = r.text || '';
      // Verify the result is actually in native script (not just Latin echoed back).
      // If result still contains mostly Latin chars, it failed — return empty.
      const latinRatio = (result.match(/[a-zA-Z]/g) || []).length / (result.length || 1);
      if (latinRatio > 0.5) return '';
      // Clean up: remove hyphens, normalize spacing
      return result.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
    });
  } catch (err) {
    console.error(`Batch native phonetic failed -> ${nativeLang}:`, err.message);
    return romanizations.map(() => '');
  }
}

/**
 * Given a lesson document and a target native language, return translated
 * native-side fields + romanization. Uses cached Translation doc if available;
 * otherwise translates via Google Translate and caches the result.
 *
 * IMPORTANT: Native translation is done directly from targetLang → nativeLang
 * (not through English). This preserves cultural meaning and avoids the
 * telephone-game effect of translating through an intermediary language.
 *
 * Returns null only if nativeLang is 'en' AND no romanization is needed.
 */
async function getOrCreateTranslation(lesson, nativeLang, targetLang) {
  const needsNativeTranslation = nativeLang && nativeLang !== 'en';
  const needsRomanization = ROMANIZATION_LANGS.has(targetLang);

  // Determine cache key — use nativeLang, or '_roman' for romanization-only
  const cacheKey = needsNativeTranslation ? nativeLang : '_roman';
  if (!needsNativeTranslation && !needsRomanization) return null;

  const lessonId = lesson._id;

  // Check cache — backfill title if missing from older cached docs
  const cached = await Translation.findOne({ lessonId, lang: cacheKey });
  if (cached) {
    if (needsNativeTranslation && lesson.title && !cached.title) {
      try {
        const [titleResult] = await batchTranslateRaw([lesson.title], 'en', nativeLang);
        cached.title = titleResult?.text || '';
        await Translation.updateOne({ _id: cached._id }, { $set: { title: cached.title } });
      } catch (e) { /* ignore backfill errors */ }
    }
    return cached;
  }

  // Collect target-language texts for direct target → native translation
  const targetTexts = [];
  const targetMapping = [];

  if (needsNativeTranslation) {
    for (let i = 0; i < lesson.content.length; i++) {
      const item = lesson.content[i];

      // Translate targetText directly to nativeLang
      const tt = item.targetText || item.korean || '';
      if (tt.trim()) {
        targetMapping.push({ itemIndex: i, field: 'nativeText' });
        targetTexts.push(tt);
      }

      // Translate example target text directly to nativeLang
      const et = item.exampleTarget || item.example || '';
      if (et.trim()) {
        targetMapping.push({ itemIndex: i, field: 'exampleNative' });
        targetTexts.push(et);
      }

      // Translate breakdown target texts directly to nativeLang
      if (item.breakdown && item.breakdown.length > 0) {
        for (let j = 0; j < item.breakdown.length; j++) {
          const bText = item.breakdown[j].target || item.breakdown[j].korean || '';
          if (bText.trim()) {
            targetMapping.push({ itemIndex: i, field: 'breakdown', breakdownIndex: j });
            targetTexts.push(bText);
          }
        }
      }
    }
  }

  // Collect strings for romanization (target-language texts missing romanization)
  const romanTexts = [];
  const romanMapping = [];

  if (needsRomanization) {
    for (let i = 0; i < lesson.content.length; i++) {
      const item = lesson.content[i];

      if (!item.romanization) {
        const tt = item.targetText || item.korean || '';
        if (tt.trim()) {
          romanMapping.push({ itemIndex: i, field: 'romanization' });
          romanTexts.push(tt);
        }
      }

      if (!item.exampleRomanization) {
        const et = item.exampleTarget || item.example || '';
        if (et.trim()) {
          romanMapping.push({ itemIndex: i, field: 'exampleRomanization' });
          romanTexts.push(et);
        }
      }
    }
  }

  // Run batch operations in parallel
  // Native translation: targetLang → nativeLang (direct, no English intermediary)
  // Romanization: targetLang → English (to extract pronunciation)
  // Title translation: English → nativeLang
  const [nativeResults, romanResults, titleResults] = await Promise.all([
    targetTexts.length > 0 ? batchTranslateRaw(targetTexts, targetLang, nativeLang) : [],
    romanTexts.length > 0 ? batchRomanize(romanTexts, targetLang) : [],
    needsNativeTranslation && lesson.title ? batchTranslateRaw([lesson.title], 'en', nativeLang) : [],
  ]);
  const translatedTitle = titleResults.length > 0 ? (titleResults[0]?.text || '') : '';

  // Build items map
  const itemsMap = {};
  const ensureItem = (idx) => {
    if (!itemsMap[idx]) {
      itemsMap[idx] = { index: idx, nativeText: '', exampleNative: '', romanization: '', exampleRomanization: '', breakdown: [] };
    }
    return itemsMap[idx];
  };

  // Apply native translations (from target → native directly)
  for (let k = 0; k < targetMapping.length; k++) {
    const m = targetMapping[k];
    const entry = ensureItem(m.itemIndex);
    const translated = nativeResults[k]?.text || targetTexts[k];

    if (m.field === 'nativeText') {
      entry.nativeText = translated;
    } else if (m.field === 'exampleNative') {
      entry.exampleNative = translated;
    } else if (m.field === 'breakdown') {
      while (entry.breakdown.length <= m.breakdownIndex) {
        entry.breakdown.push({ native: '' });
      }
      entry.breakdown[m.breakdownIndex].native = translated;
    }
  }

  // Apply romanization
  for (let k = 0; k < romanMapping.length; k++) {
    const m = romanMapping[k];
    const entry = ensureItem(m.itemIndex);
    const roman = romanResults[k] || '';

    if (m.field === 'romanization') {
      entry.romanization = roman;
    } else if (m.field === 'exampleRomanization') {
      entry.exampleRomanization = roman;
    }
  }

  const items = Object.values(itemsMap).sort((a, b) => a.index - b.index);

  // Cache
  try {
    const doc = await Translation.create({ lessonId, lang: cacheKey, title: translatedTitle, items });
    return doc;
  } catch (err) {
    if (err.code === 11000) {
      return Translation.findOne({ lessonId, lang: cacheKey });
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

  if (translation.title) {
    lessonObj.title = translation.title;
  }

  for (const item of translation.items) {
    const content = lessonObj.content[item.index];
    if (!content) continue;

    if (item.nativeText) {
      content.nativeText = item.nativeText;
      content.english = item.nativeText;
    }
    if (item.exampleNative) {
      content.exampleNative = item.exampleNative;
      content.exampleEnglish = item.exampleNative;
    }
    if (item.romanization) {
      content.romanization = item.romanization;
      content.pronunciation = item.romanization;
    }
    if (item.exampleRomanization) {
      content.exampleRomanization = item.exampleRomanization;
    }

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

module.exports = { batchTranslateRaw, batchRomanize, batchNativePhonetic, getOrCreateTranslation, applyTranslation, ROMANIZATION_LANGS, NON_LATIN_LANGS };
