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
const makeDepthNotes = (profile) => ({
  listeningCheck: `Listen inside ${q(profile.pronunciationExample)} for the syllable, ending, article, or pronoun that changes the meaning of the model.`,
  shortAnswer: `Answer first with the shortest correct form that still fits ${q(profile.vocabularyExample)}, then add one useful extension.`,
  longAnswer: `Turn ${q(profile.extensionExample)} into a fuller answer by adding cause, time, or contrast without changing the core grammar.`,
  minimalPair: `Compare ${q(profile.secondaryGrammarExample)} with the nearest form a learner might confuse it with and explain what changes.`,
  rewrite: `Copy ${q(profile.writingExample)} once, then rewrite it from memory with attention to accents, agreement, and pronoun placement.`,
  newSituation: `Move ${q(profile.taskExample)} into a new setting so the learner proves transfer rather than repetition.`,
  selfCorrection: `Name one error you might make while producing ${q(profile.errorExample)}, then repair it before looking back at the model.`,
  oralOutput: `Speak for twenty seconds by linking at least two lesson forms around ${q(profile.fluencyExample)} in one connected answer.`,
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
  const files = fs.readdirSync(dir).filter((name) => name.endsWith('.js') && name !== 'curriculum.js');
  files.forEach((name) => {
    const file = path.join(dir, name);
    delete require.cache[require.resolve(file)];
    const lesson = require(file);
    const lessonId = name.replace(/\.js$/, '');
    const profile = makeProfile(lang, lessonId, lesson);
    const notes = makeDepthNotes(profile);
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
      create(lang === 'es' ? 'escucha focalizada' : 'écoute ciblée', notes.listeningCheck, profile.pronunciationExample, profile.pronunciationExampleNote, 'practice', [ids.Pronunciation, ids['Listening and speaking']]),
      create(lang === 'es' ? 'respuesta corta' : 'réponse courte', notes.shortAnswer, profile.vocabularyExample, profile.vocabularyExampleNote, 'practice', [ids['Vocabulary I'], ids.Task]),
      create(lang === 'es' ? 'respuesta larga' : 'réponse développée', notes.longAnswer, profile.extensionExample, profile.extensionExampleNote, 'practice', [ids.Writing, ids.Task]),
      create(lang === 'es' ? 'par mínimo' : 'paire minimale', notes.minimalPair, profile.secondaryGrammarExample, profile.secondaryGrammarExampleNote, 'practice', [ids['Grammar II']]),
      create(lang === 'es' ? 'revisión escrita' : 'révision écrite', notes.rewrite, profile.writingExample, profile.writingExampleNote, 'writing', [ids.Writing]),
      create(lang === 'es' ? 'escena nueva' : 'nouvelle scène', notes.newSituation, profile.taskExample, profile.taskExampleNote, 'conversation', [ids.Task]),
      create(lang === 'es' ? 'autocorrección' : 'auto-correction', notes.selfCorrection, profile.errorExample, profile.errorExampleNote, 'practice', [ids['Grammar II']]),
      create(lang === 'es' ? 'salida oral' : 'sortie orale', notes.oralOutput, profile.fluencyExample, profile.fluencyExampleNote, 'practice', [ids['Listening and speaking'], ids.Task]),
    ].filter((entry) => entry.activityIds.every(Boolean));
    if (lesson.lessonType === 'review') {
      additions.push(
        create(lang === 'es' ? 'mezcla de unidades' : 'mélange des unités', notes.unitMix, profile.extensionExample, profile.extensionExampleNote, 'practice', [ids['Grammar review I'], ids.Task]),
        create(lang === 'es' ? 'contraste de revisión' : 'contraste de révision', notes.reviewContrast, profile.comparisonExample, profile.comparisonExampleNote, 'practice', [ids['Grammar review II']]),
        create(lang === 'es' ? 'recuperación rápida' : 'récupération rapide', notes.fastRecall, profile.recallExample, profile.recallExampleNote, 'practice', [ids['Vocabulary consolidation I']]),
        create(lang === 'es' ? 'escena acumulativa' : 'scène cumulative', notes.cumulativeScene, profile.taskExample, profile.taskExampleNote, 'conversation', [ids.Task]),
        create(lang === 'es' ? 'mapa de errores' : 'carte des erreurs', notes.errorMap, profile.errorExample, profile.errorExampleNote, 'practice', [ids['Grammar review I'], ids['Grammar review II']]),
        create(lang === 'es' ? 'lectura integrada' : 'lecture intégrée', notes.integratedReading, profile.readingExample, profile.readingExampleNote, 'reading', [ids.Reading]),
        create(lang === 'es' ? 'resumen oral' : 'résumé oral', notes.oralSummary, profile.fluencyExample, profile.fluencyExampleNote, 'practice', [ids['Listening and speaking'], ids.Task]),
        create(lang === 'es' ? 'plan siguiente' : 'prochaine étape', notes.nextStep, profile.reflectionExample, profile.reflectionExampleNote, 'note', [ids['Culture recap'], ids.Task]),
      );
    }
    lesson.content = mergeDuplicateContentItems([
      ...(lesson.content || []),
      ...additions,
    ]);
    fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
  });
  console.log(`Finalized depth additions for ${lang}.`);
}
