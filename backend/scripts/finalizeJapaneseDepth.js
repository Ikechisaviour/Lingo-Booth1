/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { makeJapaneseProfile } = require('../textbookLessons/shared/japaneseProfiles');

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

for (const name of fs.readdirSync(ROOT).filter((file) => /^level.*\.js$/.test(file) && file !== 'curriculum.js')) {
  const file = path.join(ROOT, name);
  delete require.cache[require.resolve(file)];
  const lesson = require(file);
  const profile = makeJapaneseProfile(name.replace(/\.js$/, ''), lesson);
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
    create('聞き取り確認', 'Listen for the exact particle, ending, mora, or omission that changes the meaning of the model.', profile.pronunciationExample, profile.pronunciationExampleNote, 'practice', [ids.Pronunciation, ids['Listening and speaking']]),
    create('短い答え', 'Answer once with the shortest correct Japanese form, then answer again with one useful extension.', profile.vocabularyExample, profile.vocabularyExampleNote, 'practice', [ids['Vocabulary I'], ids.Task]),
    create('長い答え', 'Turn the model into a fuller answer by adding cause, time, or contrast without changing the core grammar.', profile.extensionExample, profile.extensionExampleNote, 'practice', [ids.Writing, ids.Task]),
    create('最小対', 'Contrast the lesson form with the nearest form a learner might confuse it with and explain what changes.', profile.secondaryGrammarExample, profile.secondaryGrammarExampleNote, 'practice', [ids['Grammar II']]),
    create('書き直し', 'Copy the target sentence once, then rewrite it from memory with attention to particles, kana, kanji, and endings.', profile.writingExample, profile.writingExampleNote, 'writing', [ids.Writing]),
    create('新しい場面', 'Move the lesson language into a new setting so the learner proves transfer rather than repetition.', profile.taskExample, profile.taskExampleNote, 'conversation', [ids.Task]),
    create('自己修正', 'Name one error you might make in this lesson and repair it before looking back at the model.', profile.errorExample, profile.errorExampleNote, 'practice', [ids['Grammar II']]),
    create('口頭出力', 'Speak for twenty seconds using at least two lesson forms in one connected Japanese answer.', profile.fluencyExample, profile.fluencyExampleNote, 'practice', [ids['Listening and speaking'], ids.Task]),
  ];
  if (lesson.lessonType === 'review') {
    additions.push(
      create('単元ミックス', 'Combine forms from two earlier units in one sentence so review means recombination, not simple repetition.', profile.extensionExample, profile.extensionExampleNote, 'practice', [ids['Grammar review I'], ids.Task]),
      create('復習の対比', 'Explain why two earlier patterns are not interchangeable even when both seem possible at first glance.', profile.comparisonExample, profile.comparisonExampleNote, 'practice', [ids['Grammar review II']]),
      create('素早い再生', 'Recall one form from each reviewed unit without looking, then check the model only after retrieval.', profile.recallExample, profile.recallExampleNote, 'practice', [ids['Vocabulary consolidation I']]),
      create('総合場面', 'Handle one longer scene that forces vocabulary from several previous lessons to appear together.', profile.taskExample, profile.taskExampleNote, 'conversation', [ids.Task]),
      create('誤りマップ', 'List the three mistakes most likely to reappear across the reviewed units and repair each one.', profile.errorExample, profile.errorExampleNote, 'practice', [ids['Grammar review I'], ids['Grammar review II']]),
      create('統合読解', 'Read one connected paragraph and mark where each reviewed unit contributes meaning.', profile.readingExample, profile.readingExampleNote, 'reading', [ids.Reading]),
      create('口頭要約', 'Summarize the reviewed material aloud in one minute using examples rather than naming grammar labels only.', profile.fluencyExample, profile.fluencyExampleNote, 'practice', [ids['Listening and speaking'], ids.Task]),
      create('次の一歩', 'Name which reviewed area is still weakest and choose the next lesson that will repair it.', profile.reflectionExample, profile.reflectionExampleNote, 'note', [ids['Culture recap'], ids.Task]),
    );
  }
  const existing = new Set(lesson.content.map((entry) => `${entry.targetText}::${entry.nativeText}`));
  lesson.content.push(...additions.filter((entry) => !existing.has(`${entry.targetText}::${entry.nativeText}`)));
  lesson.content = lesson.content.filter((entry) => entry.activityIds.every(Boolean));
  fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
}

console.log('Finalized Japanese depth additions.');
