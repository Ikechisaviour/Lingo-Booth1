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

const CORE_TYPES = new Set(['word', 'grammar', 'sentence']);
const MAX_EXPANDED_CORE_ITEMS = 6;
const GENERATED_NOTE_PREFIXES = [
  'Model use for ',
  'Usage focus for ',
  'Contrast check for ',
  'Recall ',
  'Repair ',
  'Transfer ',
  'Find one word or phrase that naturally travels with ',
  'Listen for ',
  'Write ',
  'Check whether ',
];

const quoted = (value) => `"${String(value || '').trim()}"`;

const contextualSupportNotes = (profile) => ({
  pronunciation: `${profile.pronunciationGoal} In this lesson, listen especially while saying ${quoted(profile.pronunciationExample)}.`,
  reading: `Read the connected model for ${profile.readingAnchor || 'this lesson'} as one message. Notice how ${quoted(profile.readingExample)} lets the lesson vocabulary and grammar work together instead of appearing as isolated flashcards.`,
  listening: `Hear ${quoted(profile.listeningExample)} as interaction, not as a sentence list. The listening goal is to follow the exchange while keeping the lesson's register and grammar intact.`,
  writing: `Write your own version after studying ${quoted(profile.writingExample)}. Keep the same grammatical job, then change the detail that makes the sentence true for you.`,
  culture: `${profile.cultureGoal} Use ${quoted(profile.cultureExample)} as the social comparison point for this lesson.`,
  error: `${profile.errorGoal} Begin by checking ${quoted(profile.errorExample)} against the model.`,
  register: `${profile.registerGoal} Compare the social fit of ${quoted(profile.registerExample)} before reusing it elsewhere.`,
  fluency: `${profile.fluencyGoal} Aim to carry ${quoted(profile.fluencyExample)} as one thought.`,
  transfer: `${profile.transferGoal} Start from ${quoted(profile.transferExample)} and move it into your own life.`,
  recall: `${profile.recallGoal} Begin with ${quoted(profile.recallExample)} before looking back.`,
  extension: `${profile.extensionGoal} Extend from ${quoted(profile.extensionExample)} rather than restarting from a blank sentence.`,
  comparison: `${profile.comparisonGoal} Use ${quoted(profile.comparisonExample)} as the comparison line.`,
  pronunciationRepair: `${profile.pronunciationRepairGoal} Use ${quoted(profile.pronunciationRepairExample)} as the repair line.`,
  dialogueVariation: `${profile.dialogueVariationGoal} Begin from ${quoted(profile.dialogueVariationExample)}.`,
  sentenceBuilding: `${profile.sentenceBuildingGoal} Rebuild ${quoted(profile.sentenceBuildingExample)} one layer at a time.`,
  miniQuiz: `${profile.miniQuizGoal} Use ${quoted(profile.miniQuizExample)} as the deciding example.`,
  reflection: `${profile.reflectionGoal} Finish by testing that idea against ${quoted(profile.reflectionExample)}.`,
});

const contextualCoreNotes = ({ label, note, example, exampleNote }) => ({
  model: `Model use for ${quoted(label)}: ${note}`,
  usage: `Usage focus for ${quoted(label)}: ${note}`,
  contrast: `Contrast check for ${quoted(label)}: keep it when the intended meaning and setting match this lesson; do not choose it only because it resembles a word-for-word translation.`,
  recall: `Recall ${quoted(label)} from memory, then explain what would change if a nearby alternative replaced it in ${quoted(example)}.`,
  repair: `Repair ${quoted(label)} inside ${quoted(example)} if the sentence starts sounding translated rather than natural. Use the note as the clue: ${note}`,
  transfer: `Transfer ${quoted(label)} into one new personal sentence while preserving the same grammatical job and social tone shown by ${quoted(example)}.`,
  collocation: `Find one word or phrase that naturally travels with ${quoted(label)} in this setting so it becomes usable language, not a stranded flashcard.`,
  listening: `Listen for ${quoted(label)} inside ${quoted(example)} and identify the smallest sound, ending, particle, or pronoun that carries the useful difference.`,
  writing: `Write ${quoted(label)} again without looking, then compare the exact written form against ${quoted(example)} before moving on.`,
  register: `Check whether ${quoted(label)} would still fit with a friend, a stranger, and a professional counterpart. The example note gives the social clue: ${exampleNote}`,
});

const isGeneratedScaffoldText = (value) => GENERATED_NOTE_PREFIXES
  .some((prefix) => String(value || '').startsWith(prefix));

const normalizeSourceItem = (entry, activityIds) => createContentItem({
  target: entry.targetText || entry.target,
  romanization: entry.romanization || '',
  note: entry.nativeText || entry.note,
  type: entry.type || 'word',
  example: entry.exampleTarget || entry.example || entry.targetText || entry.target,
  exampleNote: entry.exampleNative || entry.exampleNote || entry.nativeText || entry.note,
  breakdown: (entry.breakdown || []).map((row) => ({
    target: row.target || row.korean,
    note: row.native || row.english,
  })),
  activityIds: entry.activityIds?.length ? entry.activityIds : activityIds,
});

const selectRepresentativeCoreItems = (entries, limit = MAX_EXPANDED_CORE_ITEMS) => {
  const selected = [];
  const seen = new Set();

  for (const entry of entries || []) {
    const key = `${entry.targetText || entry.target || ''}::${entry.nativeText || entry.note || ''}`;
    if (
      !CORE_TYPES.has(entry.type)
      || !String(entry.targetText || entry.target || '').trim()
      || isGeneratedScaffoldText(entry.nativeText || entry.note)
      || seen.has(key)
    ) {
      continue;
    }
    selected.push(entry);
    seen.add(key);
    if (selected.length >= limit) return selected;
  }

  return selected;
};

const selectProfileCoreItems = (lesson) => {
  const pool = selectRepresentativeCoreItems(lesson.content || [], MAX_EXPANDED_CORE_ITEMS);
  const fallback = lesson.content || [];
  const items = pool.length ? pool : fallback;
  return {
    first: items[0] || {},
    second: items[1] || items[0] || {},
    middle: items[Math.floor(items.length / 2)] || items[1] || items[0] || {},
    last: items[items.length - 1] || items[1] || items[0] || {},
  };
};

const instructionalStringsForLesson = (lesson) => new Set([
  ...(lesson.activities || []).flatMap((activity) => [
    activity.task,
    ...(activity.goals || []),
  ]),
  ...(lesson.expressionPractice || []).flatMap((entry) => [entry.goal]),
].filter(Boolean));

const hasInstructionalTargetLeak = (lesson, targetLang = lesson.targetLang) => {
  if (targetLang === 'en') return false;
  const instructionalStrings = instructionalStringsForLesson(lesson);
  return (lesson.content || []).some((entry) => (
    instructionalStrings.has(entry.exampleTarget)
  ));
};

const extractCanonicalSourceItemsFromRichLesson = (lesson) => selectRepresentativeCoreItems(
  (lesson.content || []).filter((entry) => {
    const activityCount = entry.activityIds?.length || 0;
    return activityCount === 0 || activityCount >= 8;
  }),
  Number.POSITIVE_INFINITY,
);

const dedupeContentItems = (entries) => {
  const seen = new Set();
  return entries.filter((entry) => {
    const key = `${entry.type || ''}::${entry.targetText || ''}::${entry.nativeText || ''}::${entry.exampleTarget || ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const mergeDuplicateContentItems = (entries = []) => {
  const merged = [];
  const bySignature = new Map();

  entries.forEach((entry) => {
    const key = `${entry.type || ''}::${entry.targetText || ''}::${entry.nativeText || ''}::${entry.exampleTarget || ''}`;
    if (!bySignature.has(key)) {
      const next = {
        ...entry,
        activityIds: [...new Set(entry.activityIds || [])],
      };
      bySignature.set(key, next);
      merged.push(next);
      return;
    }

    const existing = bySignature.get(key);
    existing.activityIds = [...new Set([...(existing.activityIds || []), ...(entry.activityIds || [])])];
  });

  return merged;
};

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
  const prompts = contextualCoreNotes({
    label,
    note,
    example,
    exampleNote,
  });

  return [
    base,
    {
      target: example,
      romanization,
      note: prompts.model,
      example,
      exampleNote,
      type: 'sentence',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: prompts.usage,
      example,
      exampleNote: `Notice what the form is doing here: ${exampleNote}`,
      type: 'note',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: prompts.contrast,
      example,
      exampleNote: `The model shows the form inside a complete message rather than as an isolated dictionary item: ${exampleNote}`,
      type: 'note',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: prompts.recall,
      example,
      exampleNote: `Self-check against the model before moving on: ${exampleNote}`,
      type: 'practice',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: prompts.repair,
      example,
      exampleNote: `Use the model as the repair target: ${exampleNote}`,
      type: 'practice',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: prompts.transfer,
      example,
      exampleNote: `The learner should be able to leave the model behind without losing the point it demonstrates: ${exampleNote}`,
      type: 'practice',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: prompts.collocation,
      example,
      exampleNote: `Use the model to notice what tends to appear beside the form: ${exampleNote}`,
      type: 'practice',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: prompts.listening,
      example,
      exampleNote: `The listening task is to catch the meaningful detail, not merely recognize the main vocabulary: ${exampleNote}`,
      type: 'practice',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: prompts.writing,
      example,
      exampleNote: `Use the written model as the final correctness check: ${exampleNote}`,
      type: 'practice',
      activityIds,
    },
    {
      target: label,
      romanization,
      note: prompts.register,
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
    note: contextualSupportNotes(profile).pronunciation,
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
    note: contextualSupportNotes(profile).reading,
    example: profile.readingExample,
    exampleNote: profile.readingExampleNote,
    type: 'reading',
    activityIds: [act.reading],
  }),
  createContentItem({
    target: profile.listeningAnchor,
    note: contextualSupportNotes(profile).listening,
    example: profile.listeningExample,
    exampleNote: profile.listeningExampleNote,
    type: 'conversation',
    activityIds: [act.listening],
  }),
  createContentItem({
    target: profile.writingAnchor,
    note: contextualSupportNotes(profile).writing,
    example: profile.writingExample,
    exampleNote: profile.writingExampleNote,
    type: 'writing',
    activityIds: [act.writing],
  }),
  createContentItem({
    target: profile.cultureAnchor,
    note: contextualSupportNotes(profile).culture,
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
    note: contextualSupportNotes(profile).error,
    example: profile.errorExample,
    exampleNote: profile.errorExampleNote,
    type: 'note',
    activityIds: [act.grammarII],
  }),
  createContentItem({
    target: profile.registerAnchor,
    note: contextualSupportNotes(profile).register,
    example: profile.registerExample,
    exampleNote: profile.registerExampleNote,
    type: 'culture',
    activityIds: [act.vocabularyII, act.culture],
  }),
  createContentItem({
    target: profile.fluencyAnchor,
    note: contextualSupportNotes(profile).fluency,
    example: profile.fluencyExample,
    exampleNote: profile.fluencyExampleNote,
    type: 'practice',
    activityIds: [act.listening, act.task],
  }),
  createContentItem({
    target: profile.transferAnchor,
    note: contextualSupportNotes(profile).transfer,
    example: profile.transferExample,
    exampleNote: profile.transferExampleNote,
    type: 'practice',
    activityIds: [act.writing, act.task],
  }),
  createContentItem({
    target: profile.recallAnchor,
    note: contextualSupportNotes(profile).recall,
    example: profile.recallExample,
    exampleNote: profile.recallExampleNote,
    type: 'practice',
    activityIds: [act.vocabularyI, act.grammarI],
  }),
  createContentItem({
    target: profile.extensionAnchor,
    note: contextualSupportNotes(profile).extension,
    example: profile.extensionExample,
    exampleNote: profile.extensionExampleNote,
    type: 'note',
    activityIds: [act.reading, act.writing],
  }),
  createContentItem({
    target: profile.comparisonAnchor,
    note: contextualSupportNotes(profile).comparison,
    example: profile.comparisonExample,
    exampleNote: profile.comparisonExampleNote,
    type: 'note',
    activityIds: [act.grammarII, act.reading],
  }),
  createContentItem({
    target: profile.pronunciationRepairAnchor,
    note: contextualSupportNotes(profile).pronunciationRepair,
    example: profile.pronunciationRepairExample,
    exampleNote: profile.pronunciationRepairExampleNote,
    type: 'pronunciation',
    activityIds: [act.pronunciation],
  }),
  createContentItem({
    target: profile.dialogueVariationAnchor,
    note: contextualSupportNotes(profile).dialogueVariation,
    example: profile.dialogueVariationExample,
    exampleNote: profile.dialogueVariationExampleNote,
    type: 'conversation',
    activityIds: [act.listening, act.task],
  }),
  createContentItem({
    target: profile.sentenceBuildingAnchor,
    note: contextualSupportNotes(profile).sentenceBuilding,
    example: profile.sentenceBuildingExample,
    exampleNote: profile.sentenceBuildingExampleNote,
    type: 'practice',
    activityIds: [act.grammarI, act.writing],
  }),
  createContentItem({
    target: profile.miniQuizAnchor,
    note: contextualSupportNotes(profile).miniQuiz,
    example: profile.miniQuizExample,
    exampleNote: profile.miniQuizExampleNote,
    type: 'practice',
    activityIds: [act.vocabularyII, act.grammarII],
  }),
  createContentItem({
    target: profile.reflectionAnchor,
    note: contextualSupportNotes(profile).reflection,
    example: profile.reflectionExample,
    exampleNote: profile.reflectionExampleNote,
    type: 'note',
    activityIds: [act.culture, act.task],
  }),
];

const buildRichLesson = (targetLang, lessonId, sourceLesson, profile) => {
  const { act, activities } = makeActivities(lessonId, sourceLesson, profile);
  const coreIds = [act.vocabularyI, act.vocabularyII, act.grammarI, act.grammarII, act.reading, act.listening, act.writing, act.task];
  const sourceItems = (sourceLesson.content || [])
    .filter((entry) => CORE_TYPES.has(entry.type))
    .map((entry) => normalizeSourceItem(entry, coreIds));
  const representativeItems = selectRepresentativeCoreItems(sourceItems);
  const expandedCore = representativeItems.flatMap((entry, index) => expandCoreItem(entry, index, coreIds).slice(1));
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
    content: dedupeContentItems([
      ...supportItems(lessonId, sourceLesson, profile, act),
      ...featureItems,
      ...sourceItems,
      ...expandedCore.map((entry) => createContentItem(entry)),
    ]),
  };
};

module.exports = {
  buildRichLesson,
  contextualCoreNotes,
  contextualSupportNotes,
  extractCanonicalSourceItemsFromRichLesson,
  isGeneratedScaffoldText,
  selectRepresentativeCoreItems,
  selectProfileCoreItems,
  instructionalStringsForLesson,
  hasInstructionalTargetLeak,
  dedupeContentItems,
  mergeDuplicateContentItems,
};
