/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { SUPPORTED_LANGUAGES } = require('../config/languages');

const ROOT = path.join(__dirname, '..', 'textbookLessons');
const MAX_AVG_CONTENT = 140;
const MAX_LESSON_CONTENT = 180;
const FORBIDDEN_GENERIC_PATTERNS = [
  /^Topic anchor\.$/i,
  /^Make service requests\.$/i,
  /^Describe symptoms naturally\.$/i,
  /^Make suggestions\.$/i,
  /^Explain fixed expressions\.$/i,
  /^Read this connected model as one piece, then identify how the lesson vocabulary and grammar cooperate inside it\.$/i,
  /^Hear the lesson language inside a short exchange so the learner follows the message rather than isolated flashcards\.$/i,
  /^Use the lesson pattern in your own writing so the form becomes available outside the model sentence\.$/i,
  /^Listen for the exact (particle, ending, mora, or omission|syllable, ending, article, or pronoun) that changes the meaning of the model\.$/i,
  /^Answer once with the shortest correct .+ form, then answer again with one useful extension\.$/i,
  /^Turn the model into a fuller answer by adding cause, time(, contrast, or social detail without losing|, or contrast without changing) the core grammar\.$/i,
  /^Contrast the lesson form with the nearest form a learner might confuse it with and explain what changes\.$/i,
  /^Copy the target sentence once, then rewrite it from memory with attention to /i,
  /^Move the lesson language into a new setting so the learner proves transfer rather than repetition\.$/i,
  /^Name one error you might make in this lesson and repair it before looking back at the model\.$/i,
  /^Speak for twenty seconds using at least two lesson forms in one connected /i,
  /^Combine forms from two earlier units in one sentence so review means recombination, not simple repetition\.$/i,
  /^Explain why two earlier patterns are not interchangeable even when both seem possible at first glance\.$/i,
  /^Recall one form from each reviewed unit without looking, then check the model only after retrieval\.$/i,
  /^Handle one longer scene that forces vocabulary from several previous lessons to appear together\.$/i,
  /^List the three mistakes most likely to reappear across the reviewed units and repair each one\.$/i,
  /^Read one connected paragraph and mark where each reviewed unit contributes meaning\.$/i,
  /^Summarize the reviewed material aloud in one minute using examples rather than naming grammar labels only\.$/i,
  /^Name which reviewed area is still weakest and choose the next lesson that will repair it\.$/i,
];
const {
  instructionalStringsForLesson,
} = require('../textbookLessons/shared/richCurriculumFactory');

function rootFor(lang) {
  return lang === 'ko' ? ROOT : path.join(ROOT, lang);
}

function lessonFiles(root) {
  return fs.readdirSync(root)
    .filter((file) => /^level.*\.js$/.test(file))
    .map((file) => path.join(root, file));
}

const issues = [];

for (const lang of SUPPORTED_LANGUAGES) {
  const root = rootFor(lang);
  if (!fs.existsSync(root)) continue;
  const files = lessonFiles(root);
  const lessons = files.map((file) => {
    delete require.cache[require.resolve(file)];
    return { file, lesson: require(file) };
  });
  const avgContent = lessons.reduce((sum, { lesson }) => sum + (lesson.content?.length || 0), 0) / (lessons.length || 1);
  if (avgContent > MAX_AVG_CONTENT) {
    issues.push(`${lang}: average content ${avgContent.toFixed(1)} exceeds ${MAX_AVG_CONTENT}; check for recursive re-enrichment`);
  }

  lessons.forEach(({ file, lesson }) => {
    const content = lesson.content || [];
    const instructionalStrings = instructionalStringsForLesson(lesson);
    if (content.length > MAX_LESSON_CONTENT) {
      issues.push(`${lang}: ${path.basename(file)} has ${content.length} content items; rich lessons should not balloon past ${MAX_LESSON_CONTENT}`);
    }
    const seen = new Set();
    content.forEach((entry) => {
      const nativeText = String(entry.nativeText || '').trim();
      if (FORBIDDEN_GENERIC_PATTERNS.some((pattern) => pattern.test(nativeText))) {
        issues.push(`${lang}: ${path.basename(file)} still contains generic scaffold copy "${nativeText}"`);
      }
      if (
        lang !== 'en'
        && instructionalStrings.has(entry.exampleTarget)
      ) {
        issues.push(`${lang}: ${path.basename(file)} leaks an instruction into target-language example content "${entry.exampleTarget}"`);
      }
      const signature = `${entry.type || ''}::${entry.targetText || ''}::${nativeText}::${entry.exampleTarget || ''}`;
      if (seen.has(signature)) {
        issues.push(`${lang}: ${path.basename(file)} repeats content item "${entry.targetText}" with the same note`);
      }
      seen.add(signature);
    });
  });
}

if (issues.length) {
  console.error('Curriculum editorial quality audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Curriculum editorial quality audit passed.');
