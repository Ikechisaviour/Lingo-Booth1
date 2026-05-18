/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { makeJapaneseProfile } = require('../textbookLessons/shared/japaneseProfiles');
const { mergeDuplicateContentItems } = require('../textbookLessons/shared/richCurriculumFactory');

const ROOT = path.join(__dirname, '..', 'textbookLessons', 'ja');
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
  listeningCheck: `Listen inside ${q(profile.pronunciationExample)} for the particle, ending, mora, or omission that changes the meaning of the model.`,
  shortAnswer: `Answer first with the shortest correct Japanese form that still fits ${q(profile.vocabularyExample)}, then add one useful extension.`,
  longAnswer: `Turn ${q(profile.extensionExample)} into a fuller answer by adding cause, time, or contrast without changing the core grammar.`,
  minimalPair: `Compare ${q(profile.secondaryGrammarExample)} with the nearest form a learner might confuse it with and explain what changes.`,
  rewrite: `Copy ${q(profile.writingExample)} once, then rewrite it from memory with attention to particles, kana, kanji, and endings.`,
  newSituation: `Move ${q(profile.taskExample)} into a new setting so the learner proves transfer rather than repetition.`,
  selfCorrection: `Name one error you might make while producing ${q(profile.errorExample)}, then repair it before looking back at the model.`,
  oralOutput: `Speak for twenty seconds by linking at least two lesson forms around ${q(profile.fluencyExample)} in one connected Japanese answer.`,
  unitMix: `Combine two reviewed forms inside ${q(profile.extensionExample)} so review means recombination, not simple repetition.`,
  reviewContrast: `Explain why the two reviewed patterns inside ${q(profile.comparisonExample)} are not interchangeable even when both seem possible at first glance.`,
  fastRecall: `Recall one form from each reviewed unit before checking ${q(profile.recallExample)} against the model.`,
  cumulativeScene: `Handle one longer scene around ${q(profile.taskExample)} so vocabulary from several earlier lessons has to work together.`,
  errorMap: `List the three mistakes most likely to reappear around ${q(profile.errorExample)} and repair each one.`,
  integratedReading: `Read ${q(profile.readingExample)} as one connected paragraph and mark where each reviewed unit contributes meaning.`,
  oralSummary: `Summarize the reviewed material aloud by building examples around ${q(profile.fluencyExample)} rather than naming grammar labels only.`,
  nextStep: `Name the reviewed area still weakest after ${q(profile.reflectionExample)}, then choose the next lesson that will repair it.`,
});

for (const name of fs.readdirSync(ROOT).filter((file) => /^level.*\.js$/.test(file) && file !== 'curriculum.js')) {
  const file = path.join(ROOT, name);
  delete require.cache[require.resolve(file)];
  const lesson = require(file);
  const profile = makeJapaneseProfile(name.replace(/\.js$/, ''), lesson);
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
    create('聞き取り確認', notes.listeningCheck, profile.pronunciationExample, profile.pronunciationExampleNote, 'practice', [ids.Pronunciation, ids['Listening and speaking']]),
    create('短い答え', notes.shortAnswer, profile.vocabularyExample, profile.vocabularyExampleNote, 'practice', [ids['Vocabulary I'], ids.Task]),
    create('長い答え', notes.longAnswer, profile.extensionExample, profile.extensionExampleNote, 'practice', [ids.Writing, ids.Task]),
    create('最小対', notes.minimalPair, profile.secondaryGrammarExample, profile.secondaryGrammarExampleNote, 'practice', [ids['Grammar II']]),
    create('書き直し', notes.rewrite, profile.writingExample, profile.writingExampleNote, 'writing', [ids.Writing]),
    create('新しい場面', notes.newSituation, profile.taskExample, profile.taskExampleNote, 'conversation', [ids.Task]),
    create('自己修正', notes.selfCorrection, profile.errorExample, profile.errorExampleNote, 'practice', [ids['Grammar II']]),
    create('口頭出力', notes.oralOutput, profile.fluencyExample, profile.fluencyExampleNote, 'practice', [ids['Listening and speaking'], ids.Task]),
  ];
  if (lesson.lessonType === 'review') {
    additions.push(
      create('単元ミックス', notes.unitMix, profile.extensionExample, profile.extensionExampleNote, 'practice', [ids['Grammar review I'], ids.Task]),
      create('復習の対比', notes.reviewContrast, profile.comparisonExample, profile.comparisonExampleNote, 'practice', [ids['Grammar review II']]),
      create('素早い再生', notes.fastRecall, profile.recallExample, profile.recallExampleNote, 'practice', [ids['Vocabulary consolidation I']]),
      create('総合場面', notes.cumulativeScene, profile.taskExample, profile.taskExampleNote, 'conversation', [ids.Task]),
      create('誤りマップ', notes.errorMap, profile.errorExample, profile.errorExampleNote, 'practice', [ids['Grammar review I'], ids['Grammar review II']]),
      create('統合読解', notes.integratedReading, profile.readingExample, profile.readingExampleNote, 'reading', [ids.Reading]),
      create('口頭要約', notes.oralSummary, profile.fluencyExample, profile.fluencyExampleNote, 'practice', [ids['Listening and speaking'], ids.Task]),
      create('次の一歩', notes.nextStep, profile.reflectionExample, profile.reflectionExampleNote, 'note', [ids['Culture recap'], ids.Task]),
    );
  }
  const existing = new Set(lesson.content.map((entry) => `${entry.targetText}::${entry.nativeText}`));
  lesson.content = mergeDuplicateContentItems([
    ...(lesson.content || []),
    ...additions.filter((entry) => !existing.has(`${entry.targetText}::${entry.nativeText}`)),
  ]).filter((entry) => entry.activityIds.every(Boolean));
  fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
}

console.log('Finalized Japanese depth additions.');
