/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { makeGermanProfile } = require('../textbookLessons/shared/germanProfiles');
const { mergeDuplicateContentItems } = require('../textbookLessons/shared/richCurriculumFactory');

const ROOT = path.join(__dirname, '..', 'textbookLessons', 'de');
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

for (const name of fs.readdirSync(ROOT).filter((file) => /^level.*\.js$/.test(file))) {
  const file = path.join(ROOT, name);
  delete require.cache[require.resolve(file)];
  const lesson = require(file);
  const profile = makeGermanProfile(name.replace(/\.js$/, ''), lesson);
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
    create('Hörkontrolle', 'Listen for the exact ending, article, or verb position that changes the meaning of the model.', profile.pronunciationExample, profile.pronunciationExampleNote, 'practice', [ids.Pronunciation, ids['Listening and speaking']]),
    create('Kurze Antwort', 'Answer once with the shortest correct German form, then answer again with one useful extension.', profile.vocabularyExample, profile.vocabularyExampleNote, 'practice', [ids['Vocabulary I'], ids.Task]),
    create('Lange Antwort', 'Turn the model into a fuller answer by adding cause, contrast, time, or register detail without losing the core grammar.', profile.extensionExample, profile.extensionExampleNote, 'practice', [ids.Writing, ids.Task]),
    create('Minimalpaar', 'Contrast the lesson form with the nearest German form a learner might confuse it with and explain what changes.', profile.secondaryGrammarExample, profile.secondaryGrammarExampleNote, 'practice', [ids['Grammar II']]),
    create('Umschreiben', 'Copy the target sentence once, then rewrite it from memory with attention to articles, endings, and verb position.', profile.writingExample, profile.writingExampleNote, 'writing', [ids.Writing]),
    create('Neue Situation', 'Move the lesson language into a new setting so the learner proves transfer rather than repetition.', profile.taskExample, profile.taskExampleNote, 'conversation', [ids.Task]),
    create('Selbstkorrektur', 'Name one error you might make in this lesson and repair it before looking back at the model.', profile.errorExample, profile.errorExampleNote, 'practice', [ids['Grammar II']]),
    create('Mündliche Ausgabe', 'Speak for twenty seconds using at least two lesson forms in one connected German answer.', profile.fluencyExample, profile.fluencyExampleNote, 'practice', [ids['Listening and speaking'], ids.Task]),
  ];
  if (lesson.lessonType === 'review') {
    additions.push(
      create('Einheiten mischen', 'Combine forms from two earlier units in one sentence so review means recombination, not simple repetition.', profile.extensionExample, profile.extensionExampleNote, 'practice', [ids['Grammar review I'], ids.Task]),
      create('Wiederholungskontrast', 'Explain why two earlier patterns are not interchangeable even when both seem possible at first glance.', profile.comparisonExample, profile.comparisonExampleNote, 'practice', [ids['Grammar review II']]),
      create('Schneller Abruf', 'Recall one form from each reviewed unit without looking, then check the model only after retrieval.', profile.recallExample, profile.recallExampleNote, 'practice', [ids['Vocabulary consolidation I']]),
      create('Gesamtszene', 'Handle one longer scene that forces vocabulary from several previous lessons to appear together.', profile.taskExample, profile.taskExampleNote, 'conversation', [ids.Task]),
    );
  }
  lesson.content = mergeDuplicateContentItems([
    ...(lesson.content || []),
    ...additions.filter((entry) => entry.activityIds.every(Boolean)),
  ]);
  fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
}

console.log('Finalized German depth additions.');
