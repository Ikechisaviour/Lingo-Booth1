/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { getBlueprints } = require('../textbookLessons/shared/remainingExpansionCatalog');
const { getFeatureSourceItems } = require('../textbookLessons/shared/remainingExpansionProfiles');

const rebuiltLangs = ['ko', 'zh', 'en', 'es', 'fr', 'ja', 'de'];
const newlyExpandedLangs = ['ms', 'ar', 'he', 'hi', 'it', 'fil', 'id', 'pt', 'ru', 'tr', 'nl', 'ta', 'bn'];
const supported = [...rebuiltLangs, ...newlyExpandedLangs];
const requiredAdvancedByLang = {
  es: ['genero', 'ser, estar', 'preterito', 'pronombres', 'subjuntivo', 'registro'],
  fr: ['genre', 'articles', 'passe compose', 'pronoms', 'subjonctif', 'registre'],
  ja: ['connectors', 'tense', 'modality', 'resemblance', 'modifiers', 'honorifics'],
  de: ['connectors', 'tense', 'modality', 'resemblance', 'modifiers', 'register'],
};
const minLessons = 51;
const minAvgActivities = 10;
const minAvgContent = 50;
const minContentFloor = 45;

function loadCurriculum(lang) {
  const root = lang === 'ko'
    ? path.join(__dirname, '..', 'textbookLessons')
    : path.join(__dirname, '..', 'textbookLessons', lang);
  const file = path.join(root, 'curriculum.js');

  if (fs.existsSync(file)) {
    delete require.cache[require.resolve(file)];
    return { curriculum: require(file), lessonRoot: root };
  }

  const lessonFiles = fs.readdirSync(root)
    .filter((name) => /^level.*\.js$/.test(name));
  const curriculum = Object.fromEntries(lessonFiles.map((name) => {
    const lessonFile = path.join(root, name);
    delete require.cache[require.resolve(lessonFile)];
    return [name.replace(/\.js$/, ''), require(lessonFile)];
  }));

  return { curriculum, lessonRoot: root };
}

function fold(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

const issues = [];
for (const lang of supported) {
  const { curriculum, lessonRoot } = loadCurriculum(lang);
  const lessons = Object.values(curriculum);
  if (lessons.length !== minLessons) issues.push(`${lang}: expected ${minLessons} lessons, found ${lessons.length}`);
  if (!lessons.find((lesson) => lesson.lessonType === 'foundation')) issues.push(`${lang}: missing foundation lesson`);

  const levelCounts = Object.keys(curriculum).reduce((acc, lessonId) => {
    if (/^level1/i.test(lessonId)) acc.level1 += 1;
    if (/^level2/i.test(lessonId)) acc.level2 += 1;
    if (/^level3/i.test(lessonId)) acc.level3 += 1;
    return acc;
  }, { level1: 0, level2: 0, level3: 0 });
  if (levelCounts.level1 !== 22 || levelCounts.level2 !== 23 || levelCounts.level3 !== 6) {
    issues.push(`${lang}: expected 22/23/6 lessons by level, found ${levelCounts.level1}/${levelCounts.level2}/${levelCounts.level3}`);
  }

  const totalActivities = lessons.reduce((sum, lesson) => sum + (lesson.activities?.length || 0), 0);
  const totalContent = lessons.reduce((sum, lesson) => sum + (lesson.content?.length || 0), 0);
  const avgActivities = totalActivities / lessons.length;
  const avgContent = totalContent / lessons.length;
  if (avgActivities < minAvgActivities) issues.push(`${lang}: average activities ${avgActivities.toFixed(1)} is below ${minAvgActivities}`);
  if (avgContent < minAvgContent) issues.push(`${lang}: average content ${avgContent.toFixed(1)} is below ${minAvgContent}`);
  lessons.forEach((lesson) => {
    if ((lesson.content?.length || 0) < minContentFloor) {
      issues.push(`${lang}: ${lesson.title} has only ${lesson.content?.length || 0} content items`);
    }
  });

  const lessonFiles = fs.readdirSync(lessonRoot)
    .filter((name) => /^level.*\.js$/.test(name));
  if (lessonFiles.length !== minLessons) {
    issues.push(`${lang}: expected ${minLessons} per-lesson files, found ${lessonFiles.length}`);
  }

  if (requiredAdvancedByLang[lang]) {
    const advancedTitles = fold(
      lessons
        .filter((lesson) => lesson.lessonType === 'grammar')
        .map((lesson) => lesson.title)
        .join(' '),
    );
    requiredAdvancedByLang[lang].forEach((token) => {
      if (!advancedTitles.includes(token)) issues.push(`${lang}: missing advanced feature token "${token}"`);
    });
  }

  if (newlyExpandedLangs.includes(lang)) {
    const expectedGrammarBlueprints = getBlueprints(lang).filter((blueprint) => blueprint.lessonType === 'grammar');
    expectedGrammarBlueprints.forEach((blueprint) => {
      const lesson = curriculum[blueprint.id];
      if (!lesson) {
        issues.push(`${lang}: missing generated grammar lesson ${blueprint.id}`);
        return;
      }
      const featureItems = getFeatureSourceItems(lang, { ...blueprint, lang });
      if (!featureItems.length) {
        issues.push(`${lang}: ${blueprint.id} has no language-specific feature source items`);
        return;
      }
      const expectedTargets = new Set(featureItems.map((item) => item.targetText));
      const supportTargets = [lesson.content?.[2]?.targetText, lesson.content?.[4]?.targetText];
      supportTargets.forEach((target) => {
        if (!expectedTargets.has(target)) {
          issues.push(`${lang}: ${blueprint.id} support anchors drifted away from its grammar feature target "${target}"`);
        }
      });
    });
  }
}

if (issues.length) {
  console.error('Target curriculum profile audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Target curriculum profile audit passed.');
