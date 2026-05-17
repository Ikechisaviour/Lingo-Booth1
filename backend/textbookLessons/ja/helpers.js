const createContentItem = ({
  target,
  romanization = '',
  note,
  type = 'word',
  example = '',
  exampleNote = '',
  breakdown = null,
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
  // Legacy fallbacks used by older lesson UI paths.
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? {
    breakdown: breakdown.map((item) => ({
      target: item.target,
      native: item.native,
      korean: item.target,
      english: item.native,
    })),
  } : {}),
});

const buildLesson = (lesson) => ({
  ...lesson,
  targetLang: 'ja',
  nativeLang: 'en',
  track: 'textbook',
  content: lesson.content.map(createContentItem),
});

const buildStructuredLesson = ({
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

  return buildLesson({
    title,
    category,
    difficulty,
    lessonType,
    activities: [
      {
        id: ACT.orientation,
        section: 'Orientation',
        title: 'What this lesson unlocks',
        goals: [overview],
        task,
      },
      {
        id: ACT.vocabulary,
        section: 'Vocabulary',
        title: 'Core words for the situation',
        goals: [vocabularyGoal],
        task: 'Say each new item aloud, then use three of them in your own examples.',
      },
      {
        id: ACT.grammar,
        section: 'Grammar',
        title: 'The pattern that carries the lesson',
        goals: [grammarGoal],
        task: 'Build three fresh sentences with the lesson pattern before moving on.',
      },
      {
        id: ACT.reading,
        section: 'Reading and listening',
        title: 'Notice the pattern in context',
        goals: ['Read a short natural example, hear it once, then identify the words and pattern doing the work.'],
        task: 'Read the model once, then explain what changes if one key word is swapped.',
      },
      {
        id: ACT.speaking,
        section: 'Speaking',
        title: 'Use it in a real exchange',
        goals: [speakingGoal],
        task: 'Answer the tutor with your own information instead of copying the model.',
      },
      {
        id: ACT.task,
        section: 'Task',
        title: 'Complete the communicative goal',
        goals: [task],
        task,
      },
    ],
    expressionPractice,
    relatedPools,
    content: items.map((item, index) => ({
      ...item,
      activityIds: item.activityIds || (
        index === items.length - 1
          ? [ACT.reading, ACT.speaking, ACT.task]
          : [ACT.vocabulary, ACT.grammar, ACT.speaking]
      ),
    })),
  });
};

module.exports = {
  buildLesson,
  createContentItem,
  buildStructuredLesson,
};
