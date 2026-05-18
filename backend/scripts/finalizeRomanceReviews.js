/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { makeProfile } = require('../textbookLessons/shared/romanceProfiles');
const { mergeDuplicateContentItems } = require('../textbookLessons/shared/richCurriculumFactory');

const ROOT = path.join(__dirname, '..', 'textbookLessons');
const LANGS = ['es', 'fr'];

const create = (target, note, example, exampleNote, type, activityIds) => ({
  type,
  activityIds,
  targetText: target,
  romanization: '',
  nativeText: note,
  pronunciation: '',
  exampleTarget: example,
  exampleNative: exampleNote,
  korean: target,
  english: note,
  example,
  exampleEnglish: exampleNote,
});

const q = (value) => `"${String(value || '').trim()}"`;
const makeReviewNotes = (profile) => ({
  unitMix: `Combine two reviewed forms inside ${q(profile.extensionExample)} so review means recombination, not simple repetition.`,
  reviewContrast: `Explain why the two reviewed patterns inside ${q(profile.comparisonExample)} are not interchangeable even when both seem possible at first glance.`,
  fastRecall: `Recall one form from each reviewed unit before checking ${q(profile.recallExample)} against the model.`,
  cumulativeScene: `Handle one longer scene around ${q(profile.taskExample)} so vocabulary from several earlier lessons has to work together.`,
  errorMap: `List the three mistakes most likely to reappear around ${q(profile.errorExample)} and repair each one.`,
  integratedReading: `Read ${q(profile.readingExample)} as one connected paragraph and mark where each reviewed unit contributes meaning.`,
  oralSummary: `Summarize the reviewed material aloud by building examples around ${q(profile.fluencyExample)} rather than naming grammar labels only.`,
  nextStep: `Name the reviewed area still weakest after ${q(profile.reflectionExample)}, then choose the next lesson that will repair it.`,
});

for (const lang of LANGS) {
  const dir = path.join(ROOT, lang);
  const files = fs.readdirSync(dir).filter((name) => /^level2Review\d+\.js$/.test(name));
  files.forEach((name) => {
    const file = path.join(dir, name);
    delete require.cache[require.resolve(file)];
    const lesson = require(file);
    const profile = makeProfile(lang, name.replace(/\.js$/, ''), lesson);
    const notes = makeReviewNotes(profile);
    const ids = lesson.activities.reduce((map, activity) => {
      map[activity.section] = activity.id;
      return map;
    }, {});
    lesson.content = mergeDuplicateContentItems([
      ...(lesson.content || []),
      create(lang === 'es' ? 'mezcla de unidades' : 'mélange des unités', notes.unitMix, profile.extensionExample, profile.extensionExampleNote, 'practice', [ids['Grammar review I'], ids.Task]),
      create(lang === 'es' ? 'contraste de revisión' : 'contraste de révision', notes.reviewContrast, profile.comparisonExample, profile.comparisonExampleNote, 'practice', [ids['Grammar review II']]),
      create(lang === 'es' ? 'recuperación rápida' : 'récupération rapide', notes.fastRecall, profile.recallExample, profile.recallExampleNote, 'practice', [ids['Vocabulary consolidation I']]),
      create(lang === 'es' ? 'escena acumulativa' : 'scène cumulative', notes.cumulativeScene, profile.taskExample, profile.taskExampleNote, 'conversation', [ids.Task]),
      create(lang === 'es' ? 'mapa de errores' : 'carte des erreurs', notes.errorMap, profile.errorExample, profile.errorExampleNote, 'practice', [ids['Grammar review I'], ids['Grammar review II']]),
      create(lang === 'es' ? 'lectura integrada' : 'lecture intégrée', notes.integratedReading, profile.readingExample, profile.readingExampleNote, 'reading', [ids.Reading]),
      create(lang === 'es' ? 'resumen oral' : 'résumé oral', notes.oralSummary, profile.fluencyExample, profile.fluencyExampleNote, 'practice', [ids['Listening and speaking'], ids.Task]),
      create(lang === 'es' ? 'plan siguiente' : 'prochaine étape', notes.nextStep, profile.reflectionExample, profile.reflectionExampleNote, 'note', [ids['Culture recap'], ids.Task]),
    ]);
    fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
  });
  console.log(`Finalized review depth for ${lang}.`);
}
