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
  const files = fs.readdirSync(dir).filter((name) => name.endsWith('.js') && name !== 'curriculum.js');
  files.forEach((name) => {
    const file = path.join(dir, name);
    delete require.cache[require.resolve(file)];
    const lesson = require(file);
    const lessonId = name.replace(/\.js$/, '');
    const profile = makeProfile(lang, lessonId, lesson);
    const ids = lesson.activities.reduce((map, activity) => {
      map[activity.section] = activity.id;
      return map;
    }, {});
    const additions = [
      create(profile.comparisonAnchor, profile.comparisonGoal, profile.comparisonExample, profile.comparisonExampleNote, 'note', [ids['Grammar II']]),
      create(profile.pronunciationRepairAnchor, profile.pronunciationRepairGoal, profile.pronunciationRepairExample, profile.pronunciationRepairExampleNote, 'pronunciation', [ids.Pronunciation]),
      create(profile.dialogueVariationAnchor, profile.dialogueVariationGoal, profile.dialogueVariationExample, profile.dialogueVariationExampleNote, 'conversation', [ids['Listening and speaking'], ids.Task]),
      create(profile.sentenceBuildingAnchor, profile.sentenceBuildingGoal, profile.sentenceBuildingExample, profile.sentenceBuildingExampleNote, 'practice', [ids['Grammar I'], ids.Writing]),
      create(profile.miniQuizAnchor, profile.miniQuizGoal, profile.miniQuizExample, profile.miniQuizExampleNote, 'practice', [ids['Vocabulary II'], ids['Grammar II']]),
      create(profile.reflectionAnchor, profile.reflectionGoal, profile.reflectionExample, profile.reflectionExampleNote, 'note', [ids['Culture note'] || ids['Culture recap'], ids.Task]),
      create(lang === 'es' ? 'escucha focalizada' : 'écoute ciblée', 'Listen for the exact syllable, ending, article, or pronoun that changes the meaning of the model.', profile.pronunciationExample, profile.pronunciationExampleNote, 'practice', [ids.Pronunciation, ids['Listening and speaking']]),
      create(lang === 'es' ? 'respuesta corta' : 'réponse courte', 'Answer once with the shortest correct form, then answer again with one useful extension.', profile.vocabularyExample, profile.vocabularyExampleNote, 'practice', [ids['Vocabulary I'], ids.Task]),
      create(lang === 'es' ? 'respuesta larga' : 'réponse développée', 'Turn the model into a fuller answer by adding cause, time, or contrast without changing the core grammar.', profile.extensionExample, profile.extensionExampleNote, 'practice', [ids.Writing, ids.Task]),
      create(lang === 'es' ? 'par mínimo' : 'paire minimale', 'Contrast the lesson form with the nearest form a learner might confuse it with and explain what changes.', profile.secondaryGrammarExample, profile.secondaryGrammarExampleNote, 'practice', [ids['Grammar II']]),
      create(lang === 'es' ? 'revisión escrita' : 'révision écrite', 'Copy the target sentence once, then rewrite it from memory with attention to accents, agreement, and pronoun placement.', profile.writingExample, profile.writingExampleNote, 'writing', [ids.Writing]),
      create(lang === 'es' ? 'escena nueva' : 'nouvelle scène', 'Move the lesson language into a new setting so the learner proves transfer rather than repetition.', profile.taskExample, profile.taskExampleNote, 'conversation', [ids.Task]),
      create(lang === 'es' ? 'autocorrección' : 'auto-correction', 'Name one error you might make in this lesson and repair it before looking back at the model.', profile.errorExample, profile.errorExampleNote, 'practice', [ids['Grammar II']]),
      create(lang === 'es' ? 'salida oral' : 'sortie orale', 'Speak for twenty seconds using at least two lesson forms in one connected answer.', profile.fluencyExample, profile.fluencyExampleNote, 'practice', [ids['Listening and speaking'], ids.Task]),
    ].filter((entry) => entry.activityIds.every(Boolean));
    if (lesson.lessonType === 'review') {
      additions.push(
        create(lang === 'es' ? 'mezcla de unidades' : 'mélange des unités', 'Combine forms from two earlier units in one sentence so review means recombination, not simple repetition.', profile.extensionExample, profile.extensionExampleNote, 'practice', [ids['Grammar review I'], ids.Task]),
        create(lang === 'es' ? 'contraste de revisión' : 'contraste de révision', 'Explain why two earlier patterns are not interchangeable even when both seem possible at first glance.', profile.comparisonExample, profile.comparisonExampleNote, 'practice', [ids['Grammar review II']]),
        create(lang === 'es' ? 'recuperación rápida' : 'récupération rapide', 'Recall one form from each reviewed unit without looking, then check the model only after retrieval.', profile.recallExample, profile.recallExampleNote, 'practice', [ids['Vocabulary consolidation I']]),
        create(lang === 'es' ? 'escena acumulativa' : 'scène cumulative', 'Handle one longer scene that forces vocabulary from several previous lessons to appear together.', profile.taskExample, profile.taskExampleNote, 'conversation', [ids.Task]),
        create(lang === 'es' ? 'mapa de errores' : 'carte des erreurs', 'List the three mistakes most likely to reappear across the reviewed units and repair each one.', profile.errorExample, profile.errorExampleNote, 'practice', [ids['Grammar review I'], ids['Grammar review II']]),
        create(lang === 'es' ? 'lectura integrada' : 'lecture intégrée', 'Read one connected paragraph and mark where each reviewed unit contributes meaning.', profile.readingExample, profile.readingExampleNote, 'reading', [ids.Reading]),
        create(lang === 'es' ? 'resumen oral' : 'résumé oral', 'Summarize the reviewed material aloud in one minute using examples rather than naming grammar labels only.', profile.fluencyExample, profile.fluencyExampleNote, 'practice', [ids['Listening and speaking'], ids.Task]),
        create(lang === 'es' ? 'plan siguiente' : 'prochaine étape', 'Name which reviewed area is still weakest and choose the next lesson that will repair it.', profile.reflectionExample, profile.reflectionExampleNote, 'note', [ids['Culture recap'], ids.Task]),
      );
    }
    lesson.content.push(...additions);
    fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
  });
  console.log(`Finalized depth additions for ${lang}.`);
}
