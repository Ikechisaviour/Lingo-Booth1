const defaultExpressionPractice = (slug) => [
  { id: `${slug}-main`, label: 'Using the main pattern', goal: 'Use the central pattern naturally in a personally relevant answer.' },
  { id: `${slug}-extend`, label: 'Extending the answer', goal: 'Add one reason, contrast, or example so the answer sounds lived-in rather than memorized.' },
  { id: `${slug}-repair`, label: 'Repairing a likely mistake', goal: 'Notice one nearby German form learners often confuse with this pattern and choose the better option.' },
];

const featureLibraries = [
  {
    match: /Foundation|Articles|Gender|Cases/i,
    items: [
      ['der / die / das', 'German grammatical gender is lexical: article, pronoun, and many adjective endings depend on the noun class, so the article belongs with the noun from the first encounter.', 'der Tisch, die Tasche, das Buch', 'Learning the noun without its article postpones a problem that German will ask for constantly.'],
      ['den Mann / dem Mann', 'German case marks the noun phrase job. Masculine nouns show the contrast most clearly: der for nominative, den for accusative, dem for dative.', 'Ich sehe den Mann. Ich helfe dem Mann.', 'The noun stays recognizable while the article tells a different story about its role.'],
    ],
  },
  {
    match: /Word Order|Verb Position|Connectors|Subordinate/i,
    items: [
      ['Heute gehe ich zur Arbeit.', 'German main clauses keep the finite verb in second position, even when another element begins the sentence.', 'Ich gehe heute zur Arbeit. Heute gehe ich zur Arbeit.', 'The topic may move; the finite verb still guards the second slot.'],
      ['weil ich heute arbeite', 'Subordinate clauses introduced by words such as weil send the finite verb to the end.', 'Ich komme später, weil ich heute arbeite.', 'The clause type changes the verb position, not merely the punctuation.'],
    ],
  },
  {
    match: /Separable|Daily Routines|Phone|Commute/i,
    items: [
      ['aufstehen / ich stehe auf', 'Many German verbs split in finite main clauses. The prefix carries real meaning, so losing it can change or break the sentence.', 'Ich stehe um sieben Uhr auf.', 'The verb begins in one place and finishes at the clause edge.'],
      ['anrufen / ich rufe dich an', 'Separable verbs remain together in dictionaries and infinitives but split in ordinary present-tense main clauses.', 'Ich rufe dich heute Abend an.', 'Learners need to recognize both shapes as the same verb.'],
    ],
  },
  {
    match: /Modal|Ability|Suggestions|Rules|Modality/i,
    items: [
      ['können / müssen / dürfen', 'German modal verbs carry ability, obligation, and permission while the main verb moves to the infinitive at the end.', 'Ich kann kommen. Ich muss arbeiten. Ich darf gehen.', 'The meaning changes with the modal; the clause frame changes with all of them.'],
      ['ich möchte', 'Möchte is a polite wish form and often sounds more natural than a blunt wollen in service encounters.', 'Ich möchte einen Kaffee.', 'Choice of modal changes social tone, not only dictionary meaning.'],
    ],
  },
  {
    match: /Shopping|Ordering Food|Adjectives|Modifiers/i,
    items: [
      ['ein guter Kaffee / einen guten Kaffee', 'German adjective endings respond to article type, gender, number, and case. The ending is compact grammar, not ornamental spelling.', 'Ich trinke einen guten Kaffee.', 'The noun phrase changes when it becomes the direct object.'],
      ['klein / kleiner / am kleinsten', 'German comparison marks degrees on the adjective and often uses als for direct comparison.', 'Dieses Zimmer ist kleiner als das andere.', 'Comparison is a grammar pattern, not only a vocabulary list.'],
    ],
  },
  {
    match: /Locations|Going Places|Transportation|Two-way/i,
    items: [
      ['in die Schule / in der Schule', 'Two-way prepositions take accusative for direction and dative for location. German asks whether movement crosses into a place or rests within it.', 'Ich gehe in die Schule. Ich bin in der Schule.', 'The preposition is the same; the case reveals the spatial relation.'],
      ['mit dem Zug', 'Mit always governs dative, making transport phrases a useful early place to hear dative articles.', 'Ich fahre mit dem Zug.', 'Prepositions can determine case before the learner has even chosen a noun.'],
    ],
  },
  {
    match: /Past Activities|Tense|Perfect/i,
    items: [
      ['ich habe gelernt / ich bin gegangen', 'Conversational German often uses the perfect tense for past events. Most verbs use haben, but many movement and change-of-state verbs use sein.', 'Ich habe gelernt. Ich bin nach Hause gegangen.', 'Auxiliary choice is part of the verb knowledge.'],
      ['ich lernte / ich ging', 'The simple past remains common in writing and with high-frequency verbs such as sein, haben, and werden.', 'Gestern war ich krank.', 'German past tense choice is partly grammatical and partly register-based.'],
    ],
  },
  {
    match: /Passive|Formal|Workplace/i,
    items: [
      ['Das Formular wird geprüft.', 'German passive with werden foregrounds the process or result when the actor is unknown, irrelevant, or intentionally backgrounded.', 'Die Lieferung wird morgen vorbereitet.', 'Formal German often prefers process clarity over naming every actor.'],
      ['Könnten Sie bitte ...?', 'Formal requests commonly combine Sie with Konjunktiv II for distance and politeness.', 'Könnten Sie mir bitte helfen?', 'Politeness is built through grammar as well as vocabulary.'],
    ],
  },
  {
    match: /Konjunktiv|Hopes|Dreams|Resemblance/i,
    items: [
      ['ich würde gern', 'Konjunktiv II softens wishes, hypotheticals, and requests. Würde plus infinitive is a broad, useful frame before learners master every strong-verb form.', 'Ich würde gern in Berlin arbeiten.', 'The form presents desire with distance rather than blunt insistence.'],
      ['wenn ich Zeit hätte', 'Hypothetical conditions use Konjunktiv II because the speaker is not reporting a present fact.', 'Wenn ich Zeit hätte, würde ich mehr lesen.', 'The two clause halves cooperate to mark unreality.'],
    ],
  },
  {
    match: /Relative|Modifiers|Relationships/i,
    items: [
      ['das Buch, das ich gekauft habe', 'German relative clauses use a relative pronoun that agrees in gender and number with the noun, but its case comes from its role inside the relative clause.', 'Das ist das Buch, das ich gestern gekauft habe.', 'One pronoun listens to two grammatical pressures at once.'],
      ['die Frau, der ich geholfen habe', 'Relative clauses reveal case clearly when the relative pronoun is dative.', 'Das ist die Frau, der ich geholfen habe.', 'Agreement alone is not enough; clause role still matters.'],
    ],
  },
  {
    match: /Register|Greetings|Workplace Greetings/i,
    items: [
      ['du / Sie', 'German address is a social choice. Du is familiar; Sie is formal and keeps its capital letter in writing.', 'Wie heißt du? / Wie heißen Sie?', 'The relationship changes both pronoun and verb form.'],
      ['Guten Tag / Hallo', 'Hallo is friendly and common, but Guten Tag remains safer in formal first contact and service situations.', 'Guten Tag, Frau Keller. Hallo, Lena.', 'A greeting can be correct linguistically and still miss the social setting.'],
    ],
  },
];

const matchingFeatureItems = (lesson) => {
  const haystack = lesson.title;
  return featureLibraries
    .filter((feature) => feature.match.test(haystack))
    .flatMap((feature) => feature.items.map(([target, note, example, exampleNote]) => ({
      target,
      note,
      example,
      exampleNote,
    })));
};

const sourcePools = (lesson) => lesson.relatedPools?.length ? lesson.relatedPools : [`topic-${lesson.category || 'daily-life'}`];

const makeGermanProfile = (lessonId, lesson) => {
  const slug = `de-${lessonId.toLowerCase()}`;
  const first = lesson.content?.[0] || {};
  const second = lesson.content?.[1] || first;
  const last = lesson.content?.[lesson.content.length - 1] || second;
  const overview = lesson.activities?.[0]?.goals?.[0] || `Use the central skill of ${lesson.title} accurately in context.`;
  const task = lesson.activities?.[lesson.activities.length - 1]?.task || `Complete one connected exchange that demonstrates the main skill of ${lesson.title}.`;
  return {
    slug,
    overview,
    task,
    orientationAnchor: 'Lernziel',
    orientationExample: 'Lernziel',
    orientationExampleNote: `The whole lesson is built toward this outcome: ${task}`,
    pronunciationGoal: 'Keep German vowel length, final consonants, umlauts, and sentence stress clear enough that grammar contrasts remain audible.',
    pronunciationAnchor: 'Lautkontrolle',
    pronunciationExample: first.exampleTarget || first.targetText,
    pronunciationExampleNote: first.exampleNative || first.nativeText,
    vocabularyGoal: `Use the key language of ${lesson.title} with the register and setting that the lesson requires.`,
    vocabularyAnchor: first.targetText,
    vocabularyExample: first.exampleTarget || first.targetText,
    vocabularyExampleNote: first.exampleNative || first.nativeText,
    secondaryVocabularyGoal: `Distinguish the nearby wording choices that make ${lesson.title} sound precise rather than merely understandable.`,
    secondaryVocabularyAnchor: second.targetText,
    secondaryVocabularyExample: second.exampleTarget || second.targetText,
    secondaryVocabularyExampleNote: second.exampleNative || second.nativeText,
    grammarGoal: overview,
    grammarAnchor: first.targetText,
    grammarExample: first.exampleTarget || first.targetText,
    grammarExampleNote: first.exampleNative || first.nativeText,
    secondaryGrammarGoal: `Contrast the main pattern in ${lesson.title} with one nearby German form so the learner can avoid literal translation.`,
    secondaryGrammarAnchor: second.targetText,
    secondaryGrammarExample: second.exampleTarget || second.targetText,
    secondaryGrammarExampleNote: second.exampleNative || second.nativeText,
    readingAnchor: 'Lesemodell',
    readingExample: last.exampleTarget || last.targetText,
    readingExampleNote: last.exampleNative || last.nativeText,
    listeningAnchor: 'Dialogmodell',
    listeningExample: last.exampleTarget || last.targetText,
    listeningExampleNote: last.exampleNative || last.nativeText,
    writingAnchor: 'Schreibübung',
    writingExample: first.exampleTarget || first.targetText,
    writingExampleNote: 'Adapt the model to your own life while keeping the lesson pattern intact.',
    cultureGoal: 'Notice the register, regional habit, or interactional expectation that changes how this German is used in real life.',
    cultureAnchor: 'Gebrauch und Situation',
    cultureExample: second.exampleTarget || second.targetText,
    cultureExampleNote: second.exampleNative || second.nativeText,
    taskAnchor: 'Abschlussaufgabe',
    taskExample: last.exampleTarget || last.targetText,
    taskExampleNote: task,
    errorAnchor: 'Häufiger Fehler',
    errorGoal: `Watch for the literal-translation mistake most likely in ${lesson.title}; German often carries meaning through case, verb position, endings, or register that another language may leave implicit.`,
    errorExample: second.exampleTarget || second.targetText,
    errorExampleNote: second.exampleNative || second.nativeText,
    registerAnchor: 'Register',
    registerGoal: 'Check whether the situation calls for familiar, neutral, polite, formal, or written-register German before choosing the final wording.',
    registerExample: first.exampleTarget || first.targetText,
    registerExampleNote: first.exampleNative || first.nativeText,
    fluencyAnchor: 'Flüssigkeit',
    fluencyGoal: 'Say the idea as one connected German message rather than as separate translated fragments.',
    fluencyExample: last.exampleTarget || last.targetText,
    fluencyExampleNote: last.exampleNative || last.nativeText,
    transferAnchor: 'Transfer',
    transferGoal: 'Move the lesson pattern into a new personal situation while preserving the same grammatical job and social tone.',
    transferExample: first.exampleTarget || first.targetText,
    transferExampleNote: 'The learner should be able to leave the model behind without losing the form.',
    recallAnchor: 'Abruf',
    recallGoal: 'Retrieve the key form from memory before rereading the model; retrieval is where durable control begins.',
    recallExample: first.targetText,
    recallExampleNote: first.nativeText,
    extensionAnchor: 'Erweiterung',
    extensionGoal: 'Extend the answer with one cause, contrast, time marker, or social detail so the language becomes useful beyond a single memorized line.',
    extensionExample: last.exampleTarget || last.targetText,
    extensionExampleNote: 'A strong answer usually says one useful thing more than the minimum.',
    comparisonAnchor: 'Kontrast',
    comparisonGoal: `Compare the central form in ${lesson.title} with the closest nearby alternative so the learner knows not only what to say, but why this wording wins here.`,
    comparisonExample: second.exampleTarget || second.targetText,
    comparisonExampleNote: second.exampleNative || second.nativeText,
    pronunciationRepairAnchor: 'Aussprachekorrektur',
    pronunciationRepairGoal: 'Repair the one umlaut, vowel-length, final-consonant, or stress detail most likely to blur this German lesson in fast speech.',
    pronunciationRepairExample: first.exampleTarget || first.targetText,
    pronunciationRepairExampleNote: first.exampleNative || first.nativeText,
    dialogueVariationAnchor: 'Dialogvariation',
    dialogueVariationGoal: 'Change one participant, one setting, and one detail while keeping the lesson form natural.',
    dialogueVariationExample: last.exampleTarget || last.targetText,
    dialogueVariationExampleNote: last.exampleNative || last.nativeText,
    sentenceBuildingAnchor: 'Satzbau',
    sentenceBuildingGoal: 'Build the sentence in layers: anchor phrase first, verb frame next, then the detail that makes it personal.',
    sentenceBuildingExample: first.exampleTarget || first.targetText,
    sentenceBuildingExampleNote: first.exampleNative || first.nativeText,
    miniQuizAnchor: 'Schnelltest',
    miniQuizGoal: 'Choose the better of two nearby forms and say aloud what clue made the decision.',
    miniQuizExample: second.exampleTarget || second.targetText,
    miniQuizExampleNote: second.exampleNative || second.nativeText,
    reflectionAnchor: 'Rückblick',
    reflectionGoal: 'Name the one feature from this lesson that would most easily betray literal translation if ignored.',
    reflectionExample: last.exampleTarget || last.targetText,
    reflectionExampleNote: last.exampleNative || last.nativeText,
    expressionPractice: defaultExpressionPractice(slug),
    relatedPools: sourcePools(lesson),
    featureItems: matchingFeatureItems(lesson),
  };
};

module.exports = {
  makeGermanProfile,
};
