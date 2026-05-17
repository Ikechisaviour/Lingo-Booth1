/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { makeProfile } = require('../textbookLessons/shared/romanceProfiles');

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

for (const lang of LANGS) {
  const dir = path.join(ROOT, lang);
  const files = fs.readdirSync(dir).filter((name) => /^level2Review\d+\.js$/.test(name));
  files.forEach((name) => {
    const file = path.join(dir, name);
    delete require.cache[require.resolve(file)];
    const lesson = require(file);
    const profile = makeProfile(lang, name.replace(/\.js$/, ''), lesson);
    const ids = lesson.activities.reduce((map, activity) => {
      map[activity.section] = activity.id;
      return map;
    }, {});
    lesson.content.push(
      create(lang === 'es' ? 'mezcla de unidades' : 'mélange des unités', 'Combine forms from two earlier units in one sentence so review means recombination, not simple repetition.', profile.extensionExample, profile.extensionExampleNote, 'practice', [ids['Grammar review I'], ids.Task]),
      create(lang === 'es' ? 'contraste de revisión' : 'contraste de révision', 'Explain why two earlier patterns are not interchangeable even when both seem possible at first glance.', profile.comparisonExample, profile.comparisonExampleNote, 'practice', [ids['Grammar review II']]),
      create(lang === 'es' ? 'recuperación rápida' : 'récupération rapide', 'Recall one form from each reviewed unit without looking, then check the model only after retrieval.', profile.recallExample, profile.recallExampleNote, 'practice', [ids['Vocabulary consolidation I']]),
      create(lang === 'es' ? 'escena acumulativa' : 'scène cumulative', 'Handle one longer scene that forces vocabulary from several previous lessons to appear together.', profile.taskExample, profile.taskExampleNote, 'conversation', [ids.Task]),
      create(lang === 'es' ? 'mapa de errores' : 'carte des erreurs', 'List the three mistakes most likely to reappear across the reviewed units and repair each one.', profile.errorExample, profile.errorExampleNote, 'practice', [ids['Grammar review I'], ids['Grammar review II']]),
      create(lang === 'es' ? 'lectura integrada' : 'lecture intégrée', 'Read one connected paragraph and mark where each reviewed unit contributes meaning.', profile.readingExample, profile.readingExampleNote, 'reading', [ids.Reading]),
      create(lang === 'es' ? 'resumen oral' : 'résumé oral', 'Summarize the reviewed material aloud in one minute using examples rather than naming grammar labels only.', profile.fluencyExample, profile.fluencyExampleNote, 'practice', [ids['Listening and speaking'], ids.Task]),
      create(lang === 'es' ? 'plan siguiente' : 'prochaine étape', 'Name which reviewed area is still weakest and choose the next lesson that will repair it.', profile.reflectionExample, profile.reflectionExampleNote, 'note', [ids['Culture recap'], ids.Task]),
    );
    fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
  });
  console.log(`Finalized review depth for ${lang}.`);
}
