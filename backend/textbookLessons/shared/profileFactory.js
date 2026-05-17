const createContentItem = ({
  target,
  romanization = '',
  note,
  type = 'word',
  example = '',
  exampleNote = '',
  activityIds = [],
}) => ({
  type,
  activityIds,
  targetText: target,
  romanization,
  nativeText: note,
  pronunciation: romanization,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
});

const buildLesson = (targetLang, lesson) => ({
  ...lesson,
  targetLang,
  nativeLang: 'en',
  track: 'textbook',
  content: lesson.content.map(createContentItem),
});

const item = (target, romanization, note, example, exampleNote, type = 'word') => ({
  target,
  romanization,
  note,
  example,
  exampleNote,
  type,
});

const practice = (id, label, goal) => ({ id, label, goal });

const structured = (targetLang, {
  slug,
  title,
  category,
  difficulty,
  lessonType,
  overview,
  vocabularyGoal,
  grammarGoal,
  speakingGoal,
  task,
  expressionPractice = [],
  relatedPools = [],
  items,
}) => {
  const ACT = {
    orientation: `${slug}-orientation`,
    vocabulary: `${slug}-vocabulary`,
    grammar: `${slug}-grammar`,
    reading: `${slug}-reading`,
    speaking: `${slug}-speaking`,
    task: `${slug}-task`,
  };

  return buildLesson(targetLang, {
    title,
    category,
    difficulty,
    lessonType,
    activities: [
      { id: ACT.orientation, section: 'Orientation', title: 'What this lesson unlocks', goals: [overview], task },
      { id: ACT.vocabulary, section: 'Vocabulary', title: 'Core language for the situation', goals: [vocabularyGoal], task: 'Use three lesson items in original examples.' },
      { id: ACT.grammar, section: 'Grammar', title: 'The pattern that carries the lesson', goals: [grammarGoal], task: 'Build three fresh sentences with the lesson pattern.' },
      { id: ACT.reading, section: 'Reading and listening', title: 'Notice the pattern in context', goals: ['Read one natural model, hear it, then identify the words and forms doing the work.'], task: 'Explain what changes when one key word changes.' },
      { id: ACT.speaking, section: 'Speaking', title: 'Use it personally', goals: [speakingGoal], task: 'Answer with your own information rather than copying the model.' },
      { id: ACT.task, section: 'Task', title: 'Complete the communicative goal', goals: [task], task },
    ],
    expressionPractice,
    relatedPools,
    content: items.map((entry, index) => ({
      ...entry,
      activityIds: index === items.length - 1
        ? [ACT.reading, ACT.speaking, ACT.task]
        : [ACT.vocabulary, ACT.grammar, ACT.speaking],
    })),
  });
};

module.exports = {
  buildLesson,
  item,
  practice,
  structured,
};
