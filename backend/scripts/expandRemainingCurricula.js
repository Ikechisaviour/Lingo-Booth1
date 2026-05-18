/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { buildRichLesson } = require('../textbookLessons/shared/richCurriculumFactory');
const {
  getFeatureSourceItems,
  makeExpansionProfile,
} = require('../textbookLessons/shared/remainingExpansionProfiles');
const { getBlueprints } = require('../textbookLessons/shared/remainingExpansionCatalog');

const ROOT = path.join(__dirname, '..', 'textbookLessons');
const LANGS = ['ms', 'ar', 'he', 'hi', 'it', 'fil', 'id', 'pt', 'ru', 'tr', 'nl', 'ta', 'bn'];
const CORE_TYPES = new Set(['word', 'grammar', 'sentence']);

function normalizeSourceKey(curriculum, requestedKey) {
  if (curriculum[requestedKey]) return requestedKey;
  if (requestedKey === 'level1Unit05LifeInCountry') {
    return Object.keys(curriculum).find((key) => key.startsWith('level1Unit05'));
  }
  return requestedKey;
}

function selectCoreItems(curriculum, keys) {
  const candidates = keys
    .map((key) => curriculum[normalizeSourceKey(curriculum, key)])
    .filter(Boolean)
    .flatMap((lesson) => lesson.content || []);
  const selected = [];
  const seen = new Set();

  for (const item of candidates) {
    const signature = `${item.targetText || ''}::${item.nativeText || ''}`;
    if (!CORE_TYPES.has(item.type) || !String(item.targetText || '').trim() || seen.has(signature)) continue;
    selected.push({
      type: item.type,
      targetText: item.targetText,
      romanization: item.romanization || '',
      nativeText: item.nativeText,
      pronunciation: item.pronunciation || item.romanization || '',
      exampleTarget: item.exampleTarget || item.targetText,
      exampleNative: item.exampleNative || item.nativeText,
      korean: item.targetText,
      english: item.nativeText,
      example: item.exampleTarget || item.targetText,
      exampleEnglish: item.exampleNative || item.nativeText,
    });
    seen.add(signature);
    if (selected.length >= 6) return selected;
  }

  return selected;
}

function makeSourceLesson(curriculum, blueprint) {
  const featureContent = blueprint.lessonType === 'grammar'
    ? getFeatureSourceItems(blueprint.lang, blueprint)
    : [];
  const content = featureContent.length
    ? featureContent
    : selectCoreItems(curriculum, blueprint.sourceKeys);
  if (content.length < 3) {
    throw new Error(`${blueprint.id} needs at least three usable source items, found ${content.length}.`);
  }

  return {
    title: blueprint.title,
    category: blueprint.category,
    difficulty: blueprint.difficulty,
    lessonType: blueprint.lessonType,
    ...(blueprint.reviewOf ? { reviewOf: blueprint.reviewOf } : {}),
    activities: [{
      id: `${blueprint.id}-orientation`,
      section: 'Orientation',
      title: 'What this lesson unlocks',
      goals: [blueprint.overview],
      task: blueprint.task,
    }],
    content,
  };
}

for (const lang of LANGS) {
  const dir = path.join(ROOT, lang);
  const curriculumPath = path.join(dir, 'curriculum.js');
  delete require.cache[require.resolve(curriculumPath)];
  const curriculum = require(curriculumPath);

  for (const blueprint of getBlueprints(lang).map((entry) => ({ ...entry, lang }))) {
    const sourceLesson = makeSourceLesson(curriculum, blueprint);
    const richLesson = buildRichLesson(
      lang,
      blueprint.id,
      sourceLesson,
      makeExpansionProfile(lang, blueprint.id, sourceLesson),
    );
    fs.writeFileSync(path.join(dir, `${blueprint.id}.js`), `module.exports = ${JSON.stringify(richLesson, null, 2)};\n`, 'utf8');
    curriculum[blueprint.id] = richLesson;
  }

  const lessonIds = [...new Set([
    ...Object.keys(curriculum),
    ...getBlueprints(lang).map((blueprint) => blueprint.id),
  ])];
  const aggregator = `${lessonIds.map((lessonId) => `const ${lessonId} = require('./${lessonId}');`).join('\n')}\n\nmodule.exports = {\n${lessonIds.map((lessonId) => `  ${lessonId},`).join('\n')}\n};\n`;
  fs.writeFileSync(curriculumPath, aggregator, 'utf8');
  console.log(`Expanded ${lang} to ${lessonIds.length} curriculum lessons.`);
}
