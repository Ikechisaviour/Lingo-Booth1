const crypto = require('crypto');
const translate = require('google-translate-api-x');
const Translation = require('../models/Translation');

// Bump this whenever the overlay policy changes in a way that should invalidate
// old cache rows even if the authored lesson text itself did not change.
const TRANSLATION_POLICY_VERSION = 2;

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
      failed: false,
    }));
  } catch (err) {
    console.error(`Batch translation failed ${fromLang}->${toLang}:`, err.message);
    return texts.map(t => ({ text: t, pronunciation: '', failed: true }));
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
 * IMPORTANT: learner-facing explanation text is translated from the canonical
 * English explanation layer into the learner's native language. Target-layer
 * study text stays separate and is never reused as the source for learner
 * glosses.
 *
 * Returns null only if nativeLang is 'en' AND no romanization is needed.
 */
// Translate every native-displayed string on `lesson.activities[]` from the
// canonical English source into `nativeLang`. Returns a 1:1 array matching the
// shape stored on the Translation document.
//
// Per AGENTS.md: activities[].section/title/goals/task are seeded in English
// and rendered through the translation overlay — never displayed raw to a
// non-English learner.
async function translateActivitiesArray(activities, nativeLang) {
  const list = Array.isArray(activities) ? activities : [];
  if (!list.length) return [];

  const texts = [];
  const map = [];
  list.forEach((act, i) => {
    if (act?.section) { map.push({ i, field: 'section' }); texts.push(act.section); }
    if (act?.title)   { map.push({ i, field: 'title' });   texts.push(act.title); }
    if (act?.task)    { map.push({ i, field: 'task' });    texts.push(act.task); }
    const goals = Array.isArray(act?.goals) ? act.goals : [];
    goals.forEach((g, gi) => {
      if (g) { map.push({ i, field: 'goals', goalIndex: gi }); texts.push(g); }
    });
  });

  const results = texts.length ? await batchTranslateRaw(texts, 'en', nativeLang) : [];

  const out = list.map((act) => ({
    id: act?.id || '',
    section: '',
    title: '',
    goals: Array.isArray(act?.goals) ? act.goals.map(() => '') : [],
    task: '',
  }));

  for (let k = 0; k < map.length; k++) {
    const m = map[k];
    const translated = results[k]?.failed ? '' : (results[k]?.text || '');
    const entry = out[m.i];
    if (m.field === 'goals') {
      while (entry.goals.length <= m.goalIndex) entry.goals.push('');
      entry.goals[m.goalIndex] = translated;
    } else {
      entry[m.field] = translated;
    }
  }
  return out;
}

// Translate every native-displayed string on `lesson.expressionPractice[]`.
async function translateExpressionPracticeArray(expressionPractice, nativeLang) {
  const list = Array.isArray(expressionPractice) ? expressionPractice : [];
  if (!list.length) return [];

  const texts = [];
  const map = [];
  list.forEach((ep, i) => {
    if (ep?.label) { map.push({ i, field: 'label' }); texts.push(ep.label); }
    if (ep?.goal)  { map.push({ i, field: 'goal' });  texts.push(ep.goal); }
  });

  const results = texts.length ? await batchTranslateRaw(texts, 'en', nativeLang) : [];

  const out = list.map((ep) => ({ id: ep?.id || '', label: '', goal: '' }));
  for (let k = 0; k < map.length; k++) {
    const m = map[k];
    const translated = results[k]?.failed ? '' : (results[k]?.text || '');
    out[m.i][m.field] = translated;
  }
  return out;
}

async function batchTranslateBySource(texts, mapping, defaultFromLang, toLang) {
  if (!texts.length) return [];
  const results = new Array(texts.length);
  const groups = new Map();
  mapping.forEach((entry, index) => {
    const fromLang = entry.fromLang || defaultFromLang;
    if (!groups.has(fromLang)) groups.set(fromLang, []);
    groups.get(fromLang).push(index);
  });

  await Promise.all(Array.from(groups.entries()).map(async ([fromLang, indices]) => {
    const groupResults = await batchTranslateRaw(indices.map(index => texts[index]), fromLang, toLang);
    indices.forEach((textIndex, groupIndex) => {
      results[textIndex] = groupResults[groupIndex] || { text: texts[textIndex], pronunciation: '' };
    });
  }));

  return results;
}

function translationSourceFingerprint(lesson) {
  const source = {
    translationPolicyVersion: TRANSLATION_POLICY_VERSION,
    title: lesson?.title || '',
    activities: Array.isArray(lesson?.activities) ? lesson.activities : [],
    expressionPractice: Array.isArray(lesson?.expressionPractice) ? lesson.expressionPractice : [],
    content: Array.isArray(lesson?.content)
      ? lesson.content.map((item) => ({
        targetText: item?.targetText || item?.korean || '',
        exampleTarget: item?.exampleTarget || item?.example || '',
        nativeText: item?.nativeText || item?.english || '',
        exampleNative: item?.exampleNative || item?.exampleEnglish || '',
        breakdown: Array.isArray(item?.breakdown)
          ? item.breakdown.map((part) => ({
            target: part?.target || part?.korean || '',
            native: part?.native || part?.english || '',
          }))
          : [],
      }))
      : [],
  };

  return crypto
    .createHash('sha1')
    .update(JSON.stringify(source))
    .digest('hex');
}

async function getOrCreateTranslation(lesson, nativeLang, targetLang) {
  const needsNativeTranslation = nativeLang && nativeLang !== 'en';
  const needsRomanization = ROMANIZATION_LANGS.has(targetLang);

  // Determine cache key — use nativeLang, or '_roman' for romanization-only
  const cacheKey = needsNativeTranslation ? nativeLang : '_roman';
  if (!needsNativeTranslation && !needsRomanization) return null;

  const lessonId = lesson._id;
  const sourceFingerprint = translationSourceFingerprint(lesson);

  // Check cache — backfill any newly-added fields (title, activities,
  // expressionPractice) for translation rows that pre-date them.
  const cached = await Translation.findOne({ lessonId, lang: cacheKey });
  if (cached && cached.sourceFingerprint !== sourceFingerprint) {
    await Translation.deleteOne({ _id: cached._id });
  } else if (cached) {
    if (needsNativeTranslation) {
      const updates = {};

      if (lesson.title && !cached.title) {
        try {
          const [titleResult] = await batchTranslateRaw([lesson.title], 'en', nativeLang);
          cached.title = titleResult?.failed ? '' : (titleResult?.text || '');
          updates.title = cached.title;
        } catch (e) { /* ignore backfill errors */ }
      }

      const seedActs = Array.isArray(lesson.activities) ? lesson.activities : [];
      const cachedActs = Array.isArray(cached.activities) ? cached.activities : [];
      if (seedActs.length > 0 && cachedActs.length === 0) {
        try {
          const filled = await translateActivitiesArray(seedActs, nativeLang);
          cached.activities = filled;
          updates.activities = filled;
        } catch (e) { /* ignore backfill errors */ }
      }

      const seedEps = Array.isArray(lesson.expressionPractice) ? lesson.expressionPractice : [];
      const cachedEps = Array.isArray(cached.expressionPractice) ? cached.expressionPractice : [];
      if (seedEps.length > 0 && cachedEps.length === 0) {
        try {
          const filled = await translateExpressionPracticeArray(seedEps, nativeLang);
          cached.expressionPractice = filled;
          updates.expressionPractice = filled;
        } catch (e) { /* ignore backfill errors */ }
      }

      if (Object.keys(updates).length > 0) {
        try {
          await Translation.updateOne({ _id: cached._id }, { $set: updates });
        } catch (e) { /* ignore — overlay will still work from in-memory cached */ }
      }
    }
    return cached;
  }

  // Collect learner-facing explanation text from the canonical English layer.
  // Target-language strings stay in the target layer and are never used as the
  // source of native-side explanations.
  const targetTexts = [];
  const targetMapping = [];

  if (needsNativeTranslation) {
    for (let i = 0; i < lesson.content.length; i++) {
      const item = lesson.content[i];

      // Native-side item explanations are canonical English seed text.
      const tt = item.nativeText || item.english || '';
      if (tt.trim()) {
        targetMapping.push({ itemIndex: i, field: 'nativeText', fromLang: 'en' });
        targetTexts.push(tt);
      }

      // Native-side example explanations are canonical English seed text.
      // Translate them from English rather than from the target example.
      const et = item.exampleNative || item.exampleEnglish || '';
      if (et.trim()) {
        targetMapping.push({ itemIndex: i, field: 'exampleNative', fromLang: 'en' });
        targetTexts.push(et);
      }

      // Breakdown notes are learner-facing English explanations.
      if (item.breakdown && item.breakdown.length > 0) {
        for (let j = 0; j < item.breakdown.length; j++) {
          const bText = item.breakdown[j].native || item.breakdown[j].english || '';
          if (bText.trim()) {
            targetMapping.push({ itemIndex: i, field: 'breakdown', breakdownIndex: j, fromLang: 'en' });
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
  // Native explanations: canonical English → nativeLang
  // Romanization: targetLang → English (to extract pronunciation)
  // Title translation: English → nativeLang
  // Activities + expressionPractice translation: English → nativeLang (the
  //   seed authors these in English as canonical source; they are never shown
  //   raw to a non-English learner — see AGENTS.md "Class Lesson Content Language").
  const [nativeResults, romanResults, titleResults, activitiesArr, epArr] = await Promise.all([
    targetTexts.length > 0 ? batchTranslateBySource(targetTexts, targetMapping, targetLang, nativeLang) : [],
    romanTexts.length > 0 ? batchRomanize(romanTexts, targetLang) : [],
    needsNativeTranslation && lesson.title ? batchTranslateRaw([lesson.title], 'en', nativeLang) : [],
    needsNativeTranslation ? translateActivitiesArray(lesson.activities, nativeLang) : [],
    needsNativeTranslation ? translateExpressionPracticeArray(lesson.expressionPractice, nativeLang) : [],
  ]);
  const translatedTitle = titleResults.length > 0 && !titleResults[0]?.failed ? (titleResults[0]?.text || '') : '';

  // Build items map
  const itemsMap = {};
  const ensureItem = (idx) => {
    if (!itemsMap[idx]) {
      itemsMap[idx] = { index: idx, nativeText: '', exampleNative: '', romanization: '', exampleRomanization: '', breakdown: [] };
    }
    return itemsMap[idx];
  };

  // Apply learner-facing explanation translations.
  for (let k = 0; k < targetMapping.length; k++) {
    const m = targetMapping[k];
    const entry = ensureItem(m.itemIndex);
    const translated = nativeResults[k]?.failed ? '' : (nativeResults[k]?.text || '');

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
    const doc = await Translation.create({
      lessonId,
      lang: cacheKey,
      sourceFingerprint,
      title: translatedTitle,
      items,
      activities: activitiesArr,
      expressionPractice: epArr,
    });
    return doc;
  } catch (err) {
    if (err.code === 11000) {
      return Translation.findOne({ lessonId, lang: cacheKey });
    }
    console.error('Failed to cache translation:', err.message);
    return { items, activities: activitiesArr, expressionPractice: epArr };
  }
}

/**
 * Apply cached translations onto a lesson's JSON object.
 * Mutates and returns the lesson object.
 *
 * Native-language scaffolding (activities[], expressionPractice[]) is
 * overlaid here so non-English learners never see the canonical English
 * seed text. See AGENTS.md "Class Lesson Content Language".
 */
function applyTranslation(lessonObj, translation) {
  if (!translation) return lessonObj;

  if (translation.title) {
    lessonObj.title = translation.title;
  }

  if (Array.isArray(translation.items)) {
    for (const item of translation.items) {
      const content = lessonObj.content?.[item.index];
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
  }

  // Activities overlay — match by id when present, otherwise by index. The
  // id-anchor protects the overlay if a future seed edit reorders activities.
  if (Array.isArray(translation.activities) && Array.isArray(lessonObj.activities)) {
    const byId = new Map();
    translation.activities.forEach((t, i) => {
      if (t?.id) byId.set(t.id, t);
      else byId.set(`__index_${i}`, t);
    });
    lessonObj.activities.forEach((dst, i) => {
      const src = byId.get(dst?.id) || byId.get(`__index_${i}`);
      if (!src || !dst) return;
      if (src.section) dst.section = src.section;
      if (src.title) dst.title = src.title;
      if (src.task) dst.task = src.task;
      if (Array.isArray(src.goals) && Array.isArray(dst.goals)) {
        for (let g = 0; g < src.goals.length && g < dst.goals.length; g++) {
          if (src.goals[g]) dst.goals[g] = src.goals[g];
        }
      }
    });
  }

  // ExpressionPractice overlay — same id-or-index matching.
  if (Array.isArray(translation.expressionPractice) && Array.isArray(lessonObj.expressionPractice)) {
    const byId = new Map();
    translation.expressionPractice.forEach((t, i) => {
      if (t?.id) byId.set(t.id, t);
      else byId.set(`__index_${i}`, t);
    });
    lessonObj.expressionPractice.forEach((dst, i) => {
      const src = byId.get(dst?.id) || byId.get(`__index_${i}`);
      if (!src || !dst) return;
      if (src.label) dst.label = src.label;
      if (src.goal) dst.goal = src.goal;
    });
  }

  return lessonObj;
}

module.exports = {
  batchTranslateRaw,
  batchRomanize,
  batchNativePhonetic,
  TRANSLATION_POLICY_VERSION,
  translationSourceFingerprint,
  getOrCreateTranslation,
  applyTranslation,
  translateActivitiesArray,
  translateExpressionPracticeArray,
  ROMANIZATION_LANGS,
  NON_LATIN_LANGS,
};
