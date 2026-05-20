/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const files = {
  web: path.join(repoRoot, 'frontend', 'src', 'pages', 'ClassLessonPage.js'),
  mobile: path.join(repoRoot, 'mobile', 'src', 'navigation', 'MainTabs.tsx'),
};
const issues = [];

for (const [surface, file] of Object.entries(files)) {
  const source = fs.readFileSync(file, 'utf8');
  [
    'exampleCueFor',
    'shouldSpeakTutorPart',
    'tutorVoiceForLocale',
    'contrastingVoiceForLocale',
    'singleVoice: true',
    'classLesson.fallback.practiceLead',
    'classLesson.fallback.shortAnswer',
    'classLesson.fallback.continue',
  ].forEach((token) => {
    if (!source.includes(token)) {
      issues.push(`${surface}: class tutor must preserve audio/localized-fallback token "${token}".`);
    }
  });
  if (/const pairHasEnglish[\s\S]{0,500}lessonActionFallback/.test(source)) {
    issues.push(`${surface}: class lesson fallback must not hide learner prompts for non-English pairs.`);
  }
}

if (issues.length) {
  console.error('Tutor audio safety audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Tutor audio safety audit passed.');
