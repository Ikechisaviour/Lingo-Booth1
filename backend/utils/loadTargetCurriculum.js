const fs = require('fs');
const path = require('path');

const TEXTBOOK_LESSONS_ROOT = path.resolve(__dirname, '..', 'textbookLessons');

function curriculumDirectory(targetLang) {
  return targetLang === 'ko'
    ? TEXTBOOK_LESSONS_ROOT
    : path.join(TEXTBOOK_LESSONS_ROOT, targetLang);
}

function curriculumModulePath(targetLang) {
  return path.join(curriculumDirectory(targetLang), 'curriculum.js');
}

function loadIndexedCurriculum(targetLang) {
  const modulePath = curriculumModulePath(targetLang);
  if (!fs.existsSync(modulePath)) return null;
  return {
    curriculum: require(modulePath),
    sourceKind: 'curriculum-module',
    sourcePath: modulePath,
  };
}

function loadLegacyFileCurriculum(targetLang) {
  const directory = curriculumDirectory(targetLang);
  if (!fs.existsSync(directory)) {
    throw new Error(`No textbook lesson directory exists for target language "${targetLang}".`);
  }

  const files = fs.readdirSync(directory)
    .filter((fileName) => /^level.+\.js$/i.test(fileName))
    .sort((left, right) => left.localeCompare(right));

  if (!files.length) {
    throw new Error(`No target curriculum files found for "${targetLang}".`);
  }

  const curriculum = {};
  for (const fileName of files) {
    const modulePath = path.join(directory, fileName);
    const lesson = require(modulePath);
    if (lesson?.targetLang !== targetLang || lesson?.track !== 'textbook') continue;
    curriculum[path.basename(fileName, '.js')] = lesson;
  }

  if (!Object.keys(curriculum).length) {
    throw new Error(`No textbook lessons matched target language "${targetLang}".`);
  }

  return {
    curriculum,
    sourceKind: 'legacy-file-scan',
    sourcePath: directory,
  };
}

function loadTargetCurriculum(targetLang) {
  const normalizedTargetLang = String(targetLang || '').trim().toLowerCase();
  if (!normalizedTargetLang) {
    throw new Error('targetLang is required');
  }

  return loadIndexedCurriculum(normalizedTargetLang)
    || loadLegacyFileCurriculum(normalizedTargetLang);
}

module.exports = {
  loadTargetCurriculum,
};
