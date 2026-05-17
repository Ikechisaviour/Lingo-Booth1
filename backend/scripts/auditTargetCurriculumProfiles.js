/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const supported = ['es', 'fr', 'ja', 'de'];
const requiredAdvancedByLang = {
  es: ['género', 'ser, estar', 'pretérito', 'pronombres', 'subjuntivo', 'registro'],
  fr: ['genre', 'articles', 'passé composé', 'pronoms', 'subjonctif', 'registre'],
  ja: ['connectors', 'tense', 'modality', 'resemblance', 'modifiers', 'honorifics'],
  de: ['connectors', 'tense', 'modality', 'resemblance', 'modifiers', 'register'],
};
const minLessons = 51;
const minAvgActivities = 10;
const minAvgContent = 50;
const minContentFloor = 45;

const issues = [];
for (const lang of supported) {
  const file = path.join(__dirname, '..', 'textbookLessons', lang, 'curriculum.js');
  if (!fs.existsSync(file)) {
    issues.push(`${lang}: missing curriculum module`);
    continue;
  }
  const curriculum = require(file);
  const lessons = Object.values(curriculum);
  if (lessons.length !== minLessons) issues.push(`${lang}: expected ${minLessons} lessons, found ${lessons.length}`);
  if (!lessons.find((lesson) => lesson.lessonType === 'foundation')) issues.push(`${lang}: missing foundation lesson`);
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
  const lessonFiles = fs.readdirSync(path.dirname(file))
    .filter((name) => /^level.*\.js$/.test(name));
  if (lessonFiles.length !== minLessons) {
    issues.push(`${lang}: expected ${minLessons} per-lesson files, found ${lessonFiles.length}`);
  }
  const advancedTitles = lessons.filter((lesson) => lesson.lessonType === 'grammar').map((lesson) => lesson.title.toLowerCase()).join(' ');
  requiredAdvancedByLang[lang].forEach((token) => {
    if (!advancedTitles.includes(token)) issues.push(`${lang}: missing advanced feature token "${token}"`);
  });
}

if (issues.length) {
  console.error('Target curriculum profile audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Target curriculum profile audit passed.');
