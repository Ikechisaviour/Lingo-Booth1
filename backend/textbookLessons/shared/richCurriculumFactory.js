const createContentItem = ({
  target,
  romanization = '',
  note,
  type = 'word',
  example = '',
  exampleNote = '',
  breakdown = [],
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
  ...(breakdown.length
    ? {
        breakdown: breakdown.map((entry) => ({
          target: entry.target,
          native: entry.note,
          korean: entry.target,
          english: entry.note,
        })),
      }
    : {}),
});

const makeActivities = (lessonId, lesson, profile) => {
  const slug = profile.slug || lessonId.toLowerCase();
  const act = {
    orientation: `${slug}-orientation`,
    pronunciation: `${slug}-pronunciation`,
    vocabularyI: `${slug}-vocabulary-1`,
    vocabularyII: `${slug}-vocabulary-2`,
    grammarI: `${slug}-grammar-1`,
    grammarII: `${slug}-grammar-2`,
    reading: `${slug}-reading`,
    listening: `${slug}-listening`,
    writing: `${slug}-writing`,
    culture: `${slug}-culture`,
    task: `${slug}-task`,
  };

  if (lesson.lessonType === 'review') {
    return {
      act,
      activities: [
        { id: act.orientation, section: 'Orientation', title: 'What this review consolidates', goals: [profile.overview], task: profile.task },
        { id: act.pronunciation, section: 'Pronunciation review', title: 'Sounds worth rechecking', goals: [profile.pronunciationGoal], task: 'Read the review examples aloud and notice the sounds that still slow you down.' },
        { id: act.vocabularyI, section: 'Vocabulary consolidation I', title: 'Earlier language, recombined', goals: [profile.vocabularyGoal], task: 'Reuse words from at least two earlier units in new sentences.' },
        { id: act.vocabularyII, section: 'Vocabulary consolidation II', title: 'Flexible recall', goals: [profile.secondaryVocabularyGoal], task: 'Choose the most useful expression for each review scene.' },
        { id: act.grammarI, section: 'Grammar review I', title: 'The first contrast to control', goals: [profile.grammarGoal], task: 'Explain the difference between two patterns and use each once.' },
        { id: act.grammarII, section: 'Grammar review II', title: 'The second contrast to control', goals: [profile.secondaryGrammarGoal], task: 'Combine two older patterns in one answer.' },
        { id: act.reading, section: 'Reading', title: 'Read an integrated text', goals: ['Notice how earlier vocabulary and grammar now work together in one connected text.'], task: 'Read the model, then identify the source lesson for each major pattern.' },
        { id: act.listening, section: 'Listening and speaking', title: 'Follow a layered exchange', goals: ['Follow a short conversation that mixes several earlier units naturally.'], task: 'Retell one turn with different personal details.' },
        { id: act.writing, section: 'Writing', title: 'Write a synthesis answer', goals: ['Write connected sentences that combine several earlier lessons rather than isolated drills.'], task: 'Write one paragraph that uses at least three reviewed patterns.' },
        { id: act.culture, section: 'Culture recap', title: 'Keep the social setting intact', goals: [profile.cultureGoal], task: 'Name one cultural cue that changes how the same words should be used.' },
        { id: act.task, section: 'Task', title: 'Complete the cumulative scene', goals: [profile.task], task: profile.task },
      ],
    };
  }

  return {
    act,
    activities: [
      { id: act.orientation, section: 'Orientation', title: 'What you will be able to do', goals: [profile.overview], task: profile.task },
      { id: act.pronunciation, section: 'Pronunciation', title: 'Sound traps in this lesson', goals: [profile.pronunciationGoal], task: 'Read the anchor examples aloud and notice the contrast that changes meaning or naturalness.' },
      { id: act.vocabularyI, section: 'Vocabulary I', title: 'Core words for the situation', goals: [profile.vocabularyGoal], task: 'Use three anchor words in personally true sentences.' },
      { id: act.vocabularyII, section: 'Vocabulary II', title: 'Useful extensions and contrasts', goals: [profile.secondaryVocabularyGoal], task: 'Choose the best expression for three nearby situations.' },
      { id: act.grammarI, section: 'Grammar I', title: 'The main pattern', goals: [profile.grammarGoal], task: 'Build three fresh sentences with the main pattern.' },
      { id: act.grammarII, section: 'Grammar II', title: 'The contrast that prevents translation mistakes', goals: [profile.secondaryGrammarGoal], task: 'Compare the main pattern with one near-neighbor and explain the difference.' },
      { id: act.reading, section: 'Reading and speaking', title: 'Read the pattern in context', goals: ['Read a compact natural model and notice which words carry the lesson meaning.'], task: 'Answer two comprehension questions in complete target-language sentences.' },
      { id: act.listening, section: 'Listening and speaking', title: 'Hear a realistic exchange', goals: ['Follow a short exchange at natural register and reproduce it with your own details.'], task: 'Perform the exchange once from the model and once from memory.' },
      { id: act.writing, section: 'Writing', title: 'Write your own version', goals: ['Write connected target-language sentences that apply the lesson pattern to your own life.'], task: 'Write three to five lines and read them aloud.' },
      { id: act.culture, section: 'Culture note', title: 'How the language lives in context', goals: [profile.cultureGoal], task: 'Explain one social or regional detail that changes how the lesson language is used.' },
      { id: act.task, section: 'Task', title: 'Complete the communicative goal', goals: [profile.task], task: profile.task },
    ],
  };
};

const expandCoreItem = (entry, index, activityIds) => {
  const label = entry.targetText || entry.target || `anchor-${index + 1}`;
  const example = entry.exampleTarget || entry.example || label;
  const exampleNote = entry.exampleNative || entry.exampleNote || entry.nativeText || entry.note;
  const note = entry.nativeText || entry.note;
  const romanization = entry.romanization || '';
  const base = {
    target: label,
    romanization,
    note,
    example,
    exampleNote,
    type: entry.type || 'word',
    activityIds,
  };

  return [
    base,
    {
      target: example,
      romanization,
      note: `Model use: ${note}`,
      example,
      exampleNote,
      type: 'sentence',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: `Usage focus: ${note}`,
      example,
      exampleNote: `Notice what the form is doing here: ${exampleNote}`,
      type: 'note',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: `Contrast check: use this form when the meaning and setting match this lesson, not merely because it resembles a word-for-word translation.`,
      example,
      exampleNote: `The model shows the form inside a complete message rather than as an isolated dictionary item: ${exampleNote}`,
      type: 'note',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: `Recall prompt: say the form from memory, then explain what would change if you replaced it with a nearby alternative.`,
      example,
      exampleNote: `Self-check against the model before moving on: ${exampleNote}`,
      type: 'practice',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: `Repair prompt: if this sentence sounds translated rather than natural, return to the register, agreement, tense, or word-order clue highlighted in the note.`,
      example,
      exampleNote: `Use the model as the repair target: ${exampleNote}`,
      type: 'practice',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: `Transfer prompt: move this form into a new personal sentence while preserving the same grammatical job and social tone.`,
      example,
      exampleNote: `The learner should be able to leave the model behind without losing the point it demonstrates: ${exampleNote}`,
      type: 'practice',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: `Collocation check: say one word or phrase that naturally travels with this form so it is learned as usable language, not a stranded flashcard.`,
      example,
      exampleNote: `Use the model to notice what tends to appear beside the form: ${exampleNote}`,
      type: 'practice',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: `Listening cue: hear this item inside a full sentence and identify the small sound, ending, or pronoun that carries the grammatical difference.`,
      example,
      exampleNote: `The listening task is to catch the meaningful detail, not merely recognize the main vocabulary: ${exampleNote}`,
      type: 'practice',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: `Writing check: reproduce the form without looking, then compare article, agreement, accent, or pronoun placement against the model.`,
      example,
      exampleNote: `Use the written model as the final correctness check: ${exampleNote}`,
      type: 'practice',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: `Register check: decide whether this same idea would need a different wording with a friend, a stranger, or a professional counterpart.`,
      example,
      exampleNote: `The meaning may survive a register shift, but the social fit may not: ${exampleNote}`,
      type: 'practice',
      activityIds,
    },
  ];
};

const supportItems = (lessonId, lesson, profile, act) => [
  createContentItem({
    target: profile.orientationAnchor,
    note: profile.overview,
    example: profile.orientationExample,
    exampleNote: profile.orientationExampleNote,
    type: 'note',
    activityIds: [act.orientation],
  }),
  createContentItem({
    target: profile.pronunciationAnchor,
    note: profile.pronunciationGoal,
    example: profile.pronunciationExample,
    exampleNote: profile.pronunciationExampleNote,
    type: 'pronunciation',
    activityIds: [act.pronunciation],
  }),
  createContentItem({
    target: profile.vocabularyAnchor,
    note: profile.vocabularyGoal,
    example: profile.vocabularyExample,
    exampleNote: profile.vocabularyExampleNote,
    type: 'note',
    activityIds: [act.vocabularyI],
  }),
  createContentItem({
    target: profile.secondaryVocabularyAnchor,
    note: profile.secondaryVocabularyGoal,
    example: profile.secondaryVocabularyExample,
    exampleNote: profile.secondaryVocabularyExampleNote,
    type: 'note',
    activityIds: [act.vocabularyII],
  }),
  createContentItem({
    target: profile.grammarAnchor,
    note: profile.grammarGoal,
    example: profile.grammarExample,
    exampleNote: profile.grammarExampleNote,
    type: 'grammar',
    activityIds: [act.grammarI],
  }),
  createContentItem({
    target: profile.secondaryGrammarAnchor,
    note: profile.secondaryGrammarGoal,
    example: profile.secondaryGrammarExample,
    exampleNote: profile.secondaryGrammarExampleNote,
    type: 'grammar',
    activityIds: [act.grammarII],
  }),
  createContentItem({
    target: profile.readingAnchor,
    note: 'Read this connected model as one piece, then identify how the lesson vocabulary and grammar cooperate inside it.',
    example: profile.readingExample,
    exampleNote: profile.readingExampleNote,
    type: 'reading',
    activityIds: [act.reading],
  }),
  createContentItem({
    target: profile.listeningAnchor,
    note: 'This short exchange is meant to sound like real interaction rather than a list of isolated sentences.',
    example: profile.listeningExample,
    exampleNote: profile.listeningExampleNote,
    type: 'conversation',
    activityIds: [act.listening],
  }),
  createContentItem({
    target: profile.writingAnchor,
    note: 'Use the lesson pattern in your own writing so the form becomes available outside the model sentence.',
    example: profile.writingExample,
    exampleNote: profile.writingExampleNote,
    type: 'writing',
    activityIds: [act.writing],
  }),
  createContentItem({
    target: profile.cultureAnchor,
    note: profile.cultureGoal,
    example: profile.cultureExample,
    exampleNote: profile.cultureExampleNote,
    type: 'culture',
    activityIds: [act.culture],
  }),
  createContentItem({
    target: profile.taskAnchor,
    note: profile.task,
    example: profile.taskExample,
    exampleNote: profile.taskExampleNote,
    type: 'conversation',
    activityIds: [act.task],
  }),
  createContentItem({
    target: profile.errorAnchor,
    note: profile.errorGoal,
    example: profile.errorExample,
    exampleNote: profile.errorExampleNote,
    type: 'note',
    activityIds: [act.grammarII],
  }),
  createContentItem({
    target: profile.registerAnchor,
    note: profile.registerGoal,
    example: profile.registerExample,
    exampleNote: profile.registerExampleNote,
    type: 'culture',
    activityIds: [act.vocabularyII, act.culture],
  }),
  createContentItem({
    target: profile.fluencyAnchor,
    note: profile.fluencyGoal,
    example: profile.fluencyExample,
    exampleNote: profile.fluencyExampleNote,
    type: 'practice',
    activityIds: [act.listening, act.speaking, act.task],
  }),
  createContentItem({
    target: profile.transferAnchor,
    note: profile.transferGoal,
    example: profile.transferExample,
    exampleNote: profile.transferExampleNote,
    type: 'practice',
    activityIds: [act.writing, act.task],
  }),
  createContentItem({
    target: profile.recallAnchor,
    note: profile.recallGoal,
    example: profile.recallExample,
    exampleNote: profile.recallExampleNote,
    type: 'practice',
    activityIds: [act.vocabularyI, act.grammarI],
  }),
  createContentItem({
    target: profile.extensionAnchor,
    note: profile.extensionGoal,
    example: profile.extensionExample,
    exampleNote: profile.extensionExampleNote,
    type: 'note',
    activityIds: [act.reading, act.writing],
  }),
  createContentItem({
    target: profile.comparisonAnchor,
    note: profile.comparisonGoal,
    example: profile.comparisonExample,
    exampleNote: profile.comparisonExampleNote,
    type: 'note',
    activityIds: [act.grammarII, act.reading],
  }),
  createContentItem({
    target: profile.pronunciationRepairAnchor,
    note: profile.pronunciationRepairGoal,
    example: profile.pronunciationRepairExample,
    exampleNote: profile.pronunciationRepairExampleNote,
    type: 'pronunciation',
    activityIds: [act.pronunciation],
  }),
  createContentItem({
    target: profile.dialogueVariationAnchor,
    note: profile.dialogueVariationGoal,
    example: profile.dialogueVariationExample,
    exampleNote: profile.dialogueVariationExampleNote,
    type: 'conversation',
    activityIds: [act.listening, act.task],
  }),
  createContentItem({
    target: profile.sentenceBuildingAnchor,
    note: profile.sentenceBuildingGoal,
    example: profile.sentenceBuildingExample,
    exampleNote: profile.sentenceBuildingExampleNote,
    type: 'practice',
    activityIds: [act.grammarI, act.writing],
  }),
  createContentItem({
    target: profile.miniQuizAnchor,
    note: profile.miniQuizGoal,
    example: profile.miniQuizExample,
    exampleNote: profile.miniQuizExampleNote,
    type: 'practice',
    activityIds: [act.vocabularyII, act.grammarII],
  }),
  createContentItem({
    target: profile.reflectionAnchor,
    note: profile.reflectionGoal,
    example: profile.reflectionExample,
    exampleNote: profile.reflectionExampleNote,
    type: 'note',
    activityIds: [act.culture, act.task],
  }),
];

const buildRichLesson = (targetLang, lessonId, sourceLesson, profile) => {
  const { act, activities } = makeActivities(lessonId, sourceLesson, profile);
  const coreIds = [act.vocabularyI, act.vocabularyII, act.grammarI, act.grammarII, act.reading, act.listening, act.writing, act.task];
  const sourceItems = sourceLesson.content || [];
  const expandedCore = sourceItems.flatMap((entry, index) => expandCoreItem(entry, index, coreIds));
  const featureItems = (profile.featureItems || []).flatMap((entry) => [
    createContentItem({
      ...entry,
      type: 'note',
      activityIds: [act.vocabularyII, act.grammarII, act.reading],
    }),
    createContentItem({
      target: entry.example,
      note: `Applied example: ${entry.note}`,
      example: entry.example,
      exampleNote: entry.exampleNote,
      type: 'sentence',
      activityIds: [act.grammarII, act.reading, act.listening],
    }),
  ]);

  return {
    ...sourceLesson,
    targetLang,
    nativeLang: 'en',
    track: 'textbook',
    activities,
    expressionPractice: profile.expressionPractice || sourceLesson.expressionPractice || [],
    relatedPools: profile.relatedPools || sourceLesson.relatedPools || [],
    content: [
      ...supportItems(lessonId, sourceLesson, profile, act),
      ...featureItems,
      ...expandedCore.map((entry) => createContentItem(entry)),
    ],
  };
};

module.exports = {
  buildRichLesson,
};
