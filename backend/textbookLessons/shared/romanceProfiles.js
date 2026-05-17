const defaultExpressionPractice = (slug) => [
  { id: `${slug}-main`, label: 'Using the main pattern', goal: 'Use the central pattern naturally in a personally relevant answer.' },
  { id: `${slug}-extend`, label: 'Extending the answer', goal: 'Add one reason, contrast, or example so the answer sounds lived-in rather than memorized.' },
  { id: `${slug}-repair`, label: 'Repairing a likely mistake', goal: 'Notice one nearby form learners often confuse with this pattern and choose the better option.' },
];

const featureLibraries = {
  es: [
    {
      match: /tú|usted|Greetings/i,
      items: [
        ['tú / usted', 'Address is social grammar in Spanish: tú is familiar in many settings, while usted marks distance, respect, or formality. Region, age, and setting all matter, so the safe choice is sometimes a social judgment rather than a vocabulary lookup.', '¿Cómo estás? / ¿Cómo está usted?', 'The verb form changes with the address choice, so the relationship is audible in the sentence.'],
        ['encantado / encantada', 'Some first-meeting adjectives agree with the speaker, not the listener. A learner who says encantada is revealing the speaker form, which makes this a good early window into agreement.', 'Encantado de conocerte. / Encantada de conocerla.', 'The phrase combines gender agreement with the tú/usted relationship choice.'],
      ],
    },
    {
      match: /Gender|Objects and Gender|g[eé]nero/i,
      items: [
        ['el problema / la mano', 'Spanish gender is grammatical, not a reliable mirror of biological sex or final letters. High-frequency exceptions must be learned as lexical facts, not treated as broken rules.', 'El problema es serio. La mano está herida.', 'Both nouns resist a simple final-letter shortcut.'],
        ['los libros rojos / las casas rojas', 'Agreement spreads through the phrase: article, noun, and many adjectives all move together in number and gender.', 'Compré los libros nuevos y las carpetas rojas.', 'A single noun choice can reshape several words around it.'],
      ],
    },
    {
      match: /ser|estar|LifeInSpanishSpeakingWorld/i,
      items: [
        ['ser / estar', 'Spanish distributes different meanings of English “be” across two verbs. Ser commonly frames identity or classification; estar commonly frames location or current state. The choice changes meaning, not just style.', 'La ciudad es tranquila. La ciudad está tranquila hoy.', 'The first describes a characteristic; the second describes today’s condition.'],
        ['listo / aburrido', 'Some adjectives change interpretation with ser versus estar. Ser listo means clever; estar listo means ready. Ser aburrido means boring; estar aburrido means bored.', 'Mi hermano es listo, pero todavía no está listo.', 'The same adjective can describe a trait in one form and a state in the other.'],
      ],
    },
    {
      match: /Daily Routines|reflex|me levanto/i,
      items: [
        ['me levanto / levanto la mano', 'Reflexive pronouns are not decorative. Me levanto means “I get myself up,” while levanto la mano takes an external object.', 'Me levanto temprano y luego levanto la persiana.', 'The verb shape tells you where the action lands.'],
        ['me ducho / me visto', 'Spanish daily-routine talk uses reflexive verbs heavily because the subject acts on themself. That pattern becomes automatic long before learners meet its formal grammar name.', 'Me ducho antes de desayunar y me visto después.', 'A natural morning sequence uses reflexive forms repeatedly.'],
      ],
    },
    {
      match: /gustar|Preferences|Leisure/i,
      items: [
        ['me gusta / me gustan', 'With gustar, the thing liked controls the verb, while the person who likes it is marked indirectly. This reverses the sentence logic many learners expect from English.', 'Me gusta el café. Me gustan los días soleados.', 'Singular versus plural depends on the liked thing, not on me.'],
        ['me encanta / prefiero', 'Spanish has several ways to express preference, and they do different work. Me encanta expresses strong liking; prefiero compares options directly.', 'Me encanta bailar, pero prefiero salir temprano.', 'The lesson becomes richer when learners can move beyond one recycled liking phrase.'],
      ],
    },
    {
      match: /Past Activities|Past Aspect|pretérito|imperfecto/i,
      items: [
        ['fui / iba', 'Spanish past tense is not merely “finished versus unfinished.” The preterite advances events; the imperfect paints background, habit, or ongoing context.', 'Ayer fui al mercado. Cuando era niño, iba cada sábado.', 'One form moves the story; the other sets the frame.'],
        ['Mientras estudiaba, sonó el teléfono.', 'Past narration often combines both aspects in one sentence: imperfect for the ongoing scene, preterite for the event that interrupts it.', 'Llovía cuando llegamos.', 'Aspect lets the speaker shape the listener’s view of time.'],
      ],
    },
    {
      match: /subjuntivo|subjunctive/i,
      items: [
        ['quiero que vengas', 'The Spanish subjunctive often appears when a speaker projects desire, doubt, recommendation, evaluation, or unreality onto another clause. It is less “advanced decoration” than a way of marking stance.', 'Espero que tengas tiempo.', 'The speaker is not reporting a plain fact; they are framing a wished-for possibility.'],
        ['Es importante que descanses.', 'Evaluations such as es importante que commonly require the subjunctive because the clause is judged rather than asserted as fact.', 'Dudo que sea cierto.', 'Different triggers share one deeper logic: the speaker is not simply stating reality.'],
      ],
    },
    {
      match: /Pronouns|clític|clitic/i,
      items: [
        ['me lo dio', 'Spanish object clitics encode who receives an action and what is transferred before the conjugated verb. Their order is fixed enough that mistakes sound sharply non-native.', 'Mi amiga me lo explicó.', 'Indirect object comes before direct object in the normal cluster.'],
        ['Quiero dártelo / Te lo quiero dar.', 'With infinitives, Spanish allows clitics either attached to the infinitive or before the conjugated verb. Both are grammatical, but learners need to recognize both shapes instantly.', 'Voy a enviársela mañana.', 'The alternation is flexible, not random.'],
      ],
    },
  ],
  fr: [
    {
      match: /Greetings|Bonjour|tu or vous/i,
      items: [
        ['tu / vous', 'French address is a social choice: tu is familiar singular, while vous can be polite singular or plural. Picking the pronoun also changes the verb form and the emotional distance of the exchange.', 'Comment vas-tu ? / Comment allez-vous ?', 'The relationship is carried by grammar, not only by tone of voice.'],
        ['bonjour / salut', 'Bonjour is the dependable polite opener; salut is warmer and more informal. A learner who uses salut everywhere can sound overfamiliar even when every word is otherwise correct.', 'Bonjour Madame. Salut Paul.', 'French greetings are small but socially precise.'],
      ],
    },
    {
      match: /Foundation|liaison|sound|spelling/i,
      items: [
        ['les amis', 'Liaison makes a normally silent consonant audible before a vowel in many common phrases. It is a feature of connected speech, not a letter-by-letter reading trick.', 'les amis arrivent', 'The /z/ bridge helps French sound like phrases rather than isolated words.'],
        ['petit / petite', 'Written French preserves letters that are not always pronounced. Feminine forms often reveal a consonant that stays silent in the masculine.', 'un petit café / une petite table', 'Spelling and sound are related, but not one-to-one.'],
      ],
    },
    {
      match: /Genre|Gender|agreement/i,
      items: [
        ['un ami français / une amie française', 'French agreement can be visible in spelling, audible in speech, both, or neither. Learners need to watch articles and endings together rather than trusting one signal.', 'Les nouvelles étudiantes sont arrivées.', 'Agreement may spread across article, adjective, noun, and past participle.'],
        ['grand / grande', 'The feminine form can make a final consonant audible that is silent in the masculine. This ties grammar directly to pronunciation.', 'un grand appartement / une grande maison', 'Agreement is heard as well as seen.'],
      ],
    },
    {
      match: /Articles|partitifs|partitive/i,
      items: [
        ['du / de la / des', 'French partitives present an unspecified quantity of something, especially food or mass nouns. They are not optional filler before the noun.', 'Je bois du café et je mange de la soupe.', 'The article helps say “some,” even when English leaves it unspoken.'],
        ['pas de', 'After negation, French often reduces indefinite and partitive articles to de. This is a high-frequency pattern that learners need early because it appears in ordinary refusals and descriptions.', 'Je bois du café, mais je ne bois pas de lait.', 'Negation reshapes the article system.'],
      ],
    },
    {
      match: /Past Activities|Past Tenses|passé composé|imparfait/i,
      items: [
        ['j’ai parlé / je parlais', 'French past narration separates completed events from background, habit, or ongoing context. The contrast is aspectual, not simply “short” versus “long.”', 'Je lisais quand le téléphone a sonné.', 'The imperfect sets the scene; the passé composé moves the event.'],
        ['être / avoir auxiliaries', 'Most passé composé verbs use avoir, but common movement and reflexive verbs use être. Those être forms may also show agreement with the subject.', 'Elle est arrivée tôt. Ils se sont levés.', 'Auxiliary choice is a grammar decision learners must hear and produce quickly.'],
      ],
    },
    {
      match: /Pronoun Order|pronoms|y, and en/i,
      items: [
        ['je le lui donne', 'French object pronouns follow a fixed pre-verbal order. Learners cannot simply stack them in the order they think of the nouns.', 'Je le lui ai donné.', 'The cluster is compact and highly patterned.'],
        ['j’y vais / j’en veux', 'Y often replaces a place or à-phrase; en often replaces de-phrases or quantities. These small words carry large chunks of meaning in everyday French.', 'Tu vas au marché ? Oui, j’y vais. Tu veux du pain ? Oui, j’en veux.', 'Pronouns keep speech natural by avoiding needless repetition.'],
      ],
    },
    {
      match: /subjonctif|subjunctive/i,
      items: [
        ['il faut que tu viennes', 'French uses the subjunctive after necessity, desire, and certain evaluations because the subordinate clause is framed through stance rather than asserted as plain fact.', 'Je veux que tu sois prêt.', 'The mood carries the speaker’s attitude toward the clause.'],
        ['bien que / pour que', 'Some conjunctions reliably trigger the subjunctive and are best learned as whole patterns rather than as isolated translations.', 'Bien qu’il soit tard, nous continuons.', 'Advanced control comes from recognizing trigger families.'],
      ],
    },
  ],
};

const makeProfile = (lang, lessonId, lesson) => {
  const slug = `${lang}-${lessonId.toLowerCase()}`;
  const first = lesson.content?.[0] || {};
  const second = lesson.content?.[1] || first;
  const last = lesson.content?.[lesson.content.length - 1] || second;
  const overview = lesson.activities?.[0]?.goals?.[0]
    || lesson.nativeText
    || `Use the core language of ${lesson.title} accurately in context.`;
  const task = lesson.activities?.[lesson.activities.length - 1]?.task
    || `Complete one connected exchange that demonstrates the main skill of ${lesson.title}.`;

  return {
    slug,
    overview,
    task,
    orientationAnchor: lang === 'es' ? 'objetivo de la lección' : 'objectif de la leçon',
    orientationExample: lang === 'es' ? 'objetivo de la lección' : 'objectif de la leçon',
    orientationExampleNote: `The whole lesson is built toward this outcome: ${task}`,
    pronunciationGoal: lang === 'es'
      ? 'Keep Spanish vowels, stress, and linking clear enough that grammar contrasts remain audible in real speech.'
      : 'Keep French liaison, mute letters, vowel quality, and phrase rhythm clear enough that the sentence remains easy to follow.',
    pronunciationAnchor: lang === 'es' ? 'control de sonido' : 'controle des sons',
    pronunciationExample: first.exampleTarget || first.targetText,
    pronunciationExampleNote: lang === 'es'
      ? 'Read the model with stable vowels and the written stress pattern intact.'
      : 'Read the model with French phrase rhythm, liaison where appropriate, and no extra sounded final consonants.',
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
    secondaryGrammarGoal: `Contrast the main pattern in ${lesson.title} with one common alternative so the learner can avoid literal translation.`,
    secondaryGrammarAnchor: second.targetText,
    secondaryGrammarExample: second.exampleTarget || second.targetText,
    secondaryGrammarExampleNote: second.exampleNative || second.nativeText,
    readingAnchor: lang === 'es' ? 'lectura modelo' : 'lecture modele',
    readingExample: last.exampleTarget || last.targetText,
    readingExampleNote: last.exampleNative || last.nativeText,
    listeningAnchor: lang === 'es' ? 'dialogo modelo' : 'dialogue modele',
    listeningExample: last.exampleTarget || last.targetText,
    listeningExampleNote: last.exampleNative || last.nativeText,
    writingAnchor: lang === 'es' ? 'escritura guiada' : 'ecriture guidee',
    writingExample: first.exampleTarget || first.targetText,
    writingExampleNote: 'Adapt the model to your own life while keeping the lesson pattern intact.',
    cultureGoal: lang === 'es'
      ? 'Notice the regional, register, or social choice that affects how this Spanish is actually used across communities.'
      : 'Notice the register, interactional, or cultural choice that affects how this French is actually used in daily life.',
    cultureAnchor: lang === 'es' ? 'uso y contexto' : 'usage et contexte',
    cultureExample: second.exampleTarget || second.targetText,
    cultureExampleNote: lang === 'es'
      ? 'Spanish varies across regions; the lesson keeps the form broadly useful while naming the contrast that matters.'
      : 'French depends heavily on register and connected speech; the lesson keeps both visible instead of teaching words in isolation.',
    taskAnchor: lang === 'es' ? 'tarea final' : 'tache finale',
    taskExample: last.exampleTarget || last.targetText,
    taskExampleNote: task,
    errorAnchor: lang === 'es' ? 'error frecuente' : 'erreur fréquente',
    errorGoal: lang === 'es'
      ? `Watch for the literal-translation mistake most likely in ${lesson.title}; Spanish often signals meaning through agreement, aspect, clitics, or address choices that another language may leave implicit.`
      : `Watch for the literal-translation mistake most likely in ${lesson.title}; French often signals meaning through articles, pronoun order, agreement, or connected speech that another language may leave implicit.`,
    errorExample: second.exampleTarget || second.targetText,
    errorExampleNote: `Use the model to repair the likely mistake before it becomes automatic: ${second.exampleNative || second.nativeText}`,
    registerAnchor: lang === 'es' ? 'registro' : 'registre',
    registerGoal: lang === 'es'
      ? 'Check whether the situation calls for informal, polite, regional, or service-register Spanish before choosing the final wording.'
      : 'Check whether the situation calls for familiar, polite, service, or written-register French before choosing the final wording.',
    registerExample: first.exampleTarget || first.targetText,
    registerExampleNote: first.exampleNative || first.nativeText,
    fluencyAnchor: lang === 'es' ? 'fluidez' : 'fluidité',
    fluencyGoal: 'Say the idea as one connected message rather than as separate translated fragments.',
    fluencyExample: last.exampleTarget || last.targetText,
    fluencyExampleNote: last.exampleNative || last.nativeText,
    transferAnchor: lang === 'es' ? 'transferencia' : 'transfert',
    transferGoal: `Move the lesson pattern from the model into a new personal situation while keeping its grammatical job intact.`,
    transferExample: first.exampleTarget || first.targetText,
    transferExampleNote: 'The learner should be able to leave the model behind without losing the form.',
    recallAnchor: lang === 'es' ? 'recuerdo activo' : 'rappel actif',
    recallGoal: 'Retrieve the key form from memory before rereading the model; retrieval is where durable control begins.',
    recallExample: first.targetText,
    recallExampleNote: first.nativeText,
    extensionAnchor: lang === 'es' ? 'ampliación' : 'extension',
    extensionGoal: 'Extend the answer with one cause, contrast, time marker, or social detail so the language becomes useful beyond a single memorized line.',
    extensionExample: last.exampleTarget || last.targetText,
    extensionExampleNote: 'A strong answer usually says one useful thing more than the minimum.',
    comparisonAnchor: lang === 'es' ? 'contraste' : 'contraste',
    comparisonGoal: `Compare the central form in ${lesson.title} with the closest nearby alternative so the learner knows not only what to say, but why this wording wins here.`,
    comparisonExample: second.exampleTarget || second.targetText,
    comparisonExampleNote: second.exampleNative || second.nativeText,
    pronunciationRepairAnchor: lang === 'es' ? 'reparación de sonido' : 'réparation sonore',
    pronunciationRepairGoal: lang === 'es'
      ? 'Repair the one vowel, stress, trill, or linking detail most likely to blur this Spanish lesson in fast speech.'
      : 'Repair the one liaison, vowel, final consonant, or rhythm detail most likely to blur this French lesson in fast speech.',
    pronunciationRepairExample: first.exampleTarget || first.targetText,
    pronunciationRepairExampleNote: first.exampleNative || first.nativeText,
    dialogueVariationAnchor: lang === 'es' ? 'variación del diálogo' : 'variation du dialogue',
    dialogueVariationGoal: 'Change one participant, one setting, and one detail while keeping the lesson form natural.',
    dialogueVariationExample: last.exampleTarget || last.targetText,
    dialogueVariationExampleNote: last.exampleNative || last.nativeText,
    sentenceBuildingAnchor: lang === 'es' ? 'construcción de frase' : 'construction de phrase',
    sentenceBuildingGoal: 'Build the sentence in layers: anchor phrase first, then grammar carrier, then the detail that makes it personal.',
    sentenceBuildingExample: first.exampleTarget || first.targetText,
    sentenceBuildingExampleNote: first.exampleNative || first.nativeText,
    miniQuizAnchor: lang === 'es' ? 'comprobación rápida' : 'vérification rapide',
    miniQuizGoal: 'Choose the better of two nearby forms and say aloud what clue made the decision.',
    miniQuizExample: second.exampleTarget || second.targetText,
    miniQuizExampleNote: second.exampleNative || second.nativeText,
    reflectionAnchor: lang === 'es' ? 'reflexión' : 'réflexion',
    reflectionGoal: 'Name the one feature from this lesson that would most easily betray literal translation if ignored.',
    reflectionExample: last.exampleTarget || last.targetText,
    reflectionExampleNote: last.exampleNative || last.nativeText,
    expressionPractice: defaultExpressionPractice(slug),
    relatedPools: sourcePools(lesson),
    featureItems: matchingFeatureItems(lang, lesson),
  };
};

const sourcePools = (lesson) => lesson.relatedPools?.length ? lesson.relatedPools : [`topic-${lesson.category || 'daily-life'}`];
const matchingFeatureItems = (lang, lesson) => {
  const haystack = [
    lesson.title,
    ...(lesson.content || []).flatMap((entry) => [entry.targetText, entry.nativeText, entry.exampleTarget, entry.exampleNative]),
  ].join(' ');
  return (featureLibraries[lang] || [])
    .filter((feature) => feature.match.test(haystack))
    .flatMap((feature) => feature.items.map(([target, note, example, exampleNote]) => ({
      target,
      note,
      example,
      exampleNote,
    })));
};

module.exports = {
  makeProfile,
};
