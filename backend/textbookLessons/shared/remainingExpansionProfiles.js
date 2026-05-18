const { beginnerProfileConfigs, makeBeginnerProfile } = require('./beginnerProfiles');

const featureLibraries = {
  ms: [
    [/Affix/i, [['menulis / ditulis', 'Malay voice and valency often live in affixes. Active meN- forms and passive di- forms reorganize who is foregrounded.', 'Saya menulis surat. Surat itu ditulis semalam.', 'The object can become the topic when the passive form fits the discourse.']]],
    [/Reduplication/i, [['buku-buku', 'Reduplication can mark plurality, variety, or lexical meaning; it is productive but not interchangeable with every noun.', 'Saya membeli buku-buku baharu.', 'The repeated form signals more than one book in an ordinary context.']]],
    [/Classifier/i, [['seorang guru / sebuah rumah', 'Malay classifiers appear with counted nouns and reflect semantic shape or animacy rather than grammatical gender.', 'Dia seorang guru dan tinggal di sebuah rumah kecil.', 'The classifier changes with the noun type.']]],
    [/Particles/i, [['lah / kah', 'Malay particles add emphasis, softening, or question force and can make a sentence sound far more natural.', 'Datanglah esok. Bolehkah saya masuk?', 'Small particles reshape interactional tone.']]],
    [/Register/i, [['saya / aku', 'Malay pronoun choice is a register decision. Saya is broadly safe; aku is more intimate and can sound too close in formal settings.', 'Saya ingin bertanya. Aku sudah tahu.', 'The social relationship changes the right pronoun.']]],
    [/Clause/i, [['kerana / supaya', 'Connectors distinguish cause from purpose, helping longer Malay sentences stay precise.', 'Saya datang awal kerana mesyuarat bermula pagi supaya semuanya siap.', 'The connector tells the listener why the clause is there.']]],
  ],
  ar: [
    [/Roots/i, [['كتب / كتاب / مكتبة', 'Arabic roots and patterns create related words while the pattern changes category and nuance.', 'كتب الطالب الدرس في المكتبة.', 'The shared root remains visible across verb, noun, and place noun.']]],
    [/Agreement/i, [['الطالبة المجتهدة', 'Arabic agreement tracks gender, number, definiteness, and often case, so several words move together.', 'الطالبة المجتهدة وصلت مبكرا.', 'The adjective follows the noun in agreement.']]],
    [/Broken/i, [['كتاب / كتب', 'Many Arabic plurals are broken plurals, so number is often a lexical pattern rather than a simple ending.', 'اشتريت كتابا ثم قرأت كتبا كثيرة.', 'Learners need to know both singular and plural shapes.']]],
    [/Verb Forms/i, [['فهم / أفهم / استفهم', 'Derived verb forms reshape voice, causation, reciprocity, or request around one root.', 'فهم الدرس ثم استفسر عن المثال.', 'The pattern adds meaning beyond tense.']]],
    [/Case/i, [['كتاب جديد / الكتاب الجديد', 'Case endings and definiteness matter most in careful formal Arabic, even when everyday speech reduces them.', 'قرأت كتابا جديدا ثم أعرت الكتاب الجديد لصديقي.', 'Register determines how visible the endings remain.']]],
    [/Diglossia/i, [['كيف حالك؟ / إزيك؟', 'Arabic learners must notice the distance between Modern Standard Arabic and spoken varieties rather than treating them as one register.', 'في الصف أقول كيف حالك؟ وفي القاهرة قد أسمع إزيك؟', 'Both belong to Arabic, but not to the same setting.']]],
  ],
  he: [
    [/Binyanim/i, [['כתב / נכתב / התכתב', 'Hebrew binyanim organize voice and lexical meaning around roots, so related verbs may still behave differently.', 'הוא כתב מכתב, והמכתב נכתב אתמול.', 'The root remains related while the pattern changes perspective.']]],
    [/Construct/i, [['בית ספר', 'The construct state links nouns tightly, often replacing a free-standing possessive pattern.', 'זה בית ספר חדש.', 'The first noun changes shape because it is bound to the next noun.']]],
    [/Agreement/i, [['ילד טוב / ילדה טובה', 'Hebrew agreement marks gender and number across nouns, adjectives, and many verb forms.', 'הילדה הטובה הגיעה מוקדם.', 'Several words reveal the same agreement choice.']]],
    [/Direct Object/i, [['את הספר', 'Definite direct objects are marked with את, a small word that has no direct English equivalent but is structurally important.', 'קראתי את הספר אתמול.', 'The marker appears because the object is definite.']]],
    [/Word Order/i, [['מחר אני נוסע', 'Hebrew allows fronting for topic and emphasis, but learners still need to notice what sounds neutral versus marked.', 'אני נוסע מחר. מחר אני נוסע.', 'Both are possible; the information focus changes.']]],
    [/Register/i, [['אפשר לעזור לך? / האם אוכל לסייע לך?', 'Pronouns, verb forms, and lexical choices shift between conversational, written, and highly formal Hebrew.', 'אפשר לעזור לך? האם אוכל לסייע לך?', 'The second version is more formal than daily conversation usually needs.']]],
  ],
  hi: [
    [/Postpositions/i, [['घर में / घर से', 'Hindi uses postpositions after the noun phrase to mark location, source, relation, and many other roles.', 'मैं घर में हूँ और स्कूल से आया हूँ।', 'The noun phrase changes according to the postposition that follows it.']]],
    [/Ergativity/i, [['मैंने खाना खाया', 'Perfective transitive clauses commonly use ने, and agreement may follow the object rather than the subject.', 'सीमा ने किताब पढ़ी।', 'The feminine object can control the verb form.']]],
    [/Compound/i, [['देख लेना / कर देना', 'Compound verbs add completion, benefactive force, or speaker stance beyond the base verb.', 'कृपया यह काम कर दीजिए।', 'The vector verb changes the feel of the action.']]],
    [/Aspect/i, [['मैं पढ़ता हूँ / मैं पढ़ रहा हूँ', 'Hindi separates habitual and progressive aspect clearly, so tense alone does not express the full time meaning.', 'मैं रोज पढ़ता हूँ, लेकिन अभी पढ़ रहा हूँ।', 'The two forms describe different kinds of ongoingness.']]],
    [/Honorificity/i, [['तू / तुम / आप', 'Hindi pronouns and verb endings encode intimacy and respect; the safest public default is usually आप.', 'आप कैसे हैं? तुम कैसे हो?', 'The relationship is audible in both pronoun and verb.']]],
    [/Relative/i, [['जो छात्र आया वह मेरा मित्र है', 'Hindi often pairs relative जो with correlative वह to bind two clauses together.', 'जो किताब मेज पर है वह मेरी है।', 'The two-part structure is a core sentence-building tool.']]],
  ],
  it: [
    [/Gender/i, [['il libro / la casa', 'Italian agreement spreads across articles, nouns, and adjectives, so a noun choice often changes several words around it.', 'Ho comprato il libro nuovo e la casa nuova.', 'The adjective follows the noun class and number.']]],
    [/Past Aspect|Passato Prossimo|Imperfetto/i, [['ho studiato / studiavo', 'Passato prossimo advances completed events; imperfetto frames habits, background, or ongoing scenes.', 'Studiavo quando mi hai chiamato.', 'The two past forms shape the story differently.']]],
    [/Clitics|Object Pronouns/i, [['me lo dai', 'Italian clitics package participants before the verb and follow a fixed order that learners must hear quickly.', 'Me lo dai domani?', 'The small pronouns replace a fuller noun phrase.']]],
    [/Subjunctive/i, [['penso che sia utile', 'The subjunctive often appears after opinion, doubt, desire, or evaluation rather than plain factual assertion.', 'Spero che tu venga presto.', 'The mood marks the speaker stance toward the clause.']]],
    [/Pronominal/i, [['andarsene / farcela', 'Pronominal verbs can carry meanings that are not predictable from the base verb alone.', 'Me ne vado adesso, ma ce la faccio.', 'The clitic bundle is part of the lexical item.']]],
    [/Register/i, [['tu / Lei', 'Italian address shifts with social distance. Lei keeps formal respect visible in both pronoun and verb agreement.', 'Come stai? / Come sta?', 'The same question changes with the relationship.']]],
  ],
  fil: [
    [/Focus/i, [['kumain / kinain', 'Filipino voice or focus morphology tells which participant the clause is organized around.', 'Kumain si Ana ng mangga. Kinain ni Ana ang mangga.', 'The event is similar, but the grammatical spotlight moves.']]],
    [/Aspect/i, [['kumakain / kumain / kakain', 'Filipino aspect marks completed, ongoing, and contemplated action more centrally than simple tense labels suggest.', 'Kumakain ako ngayon, kumain ako kanina, kakain ako mamaya.', 'The form changes with the event contour.']]],
    [/Linkers/i, [['magandang bahay', 'Linkers connect modifiers smoothly to what they describe and are essential to natural phrase shape.', 'May magandang bahay sa kanto.', 'The linker belongs to the phrase, not to translation glosses.']]],
    [/Markers/i, [['ang / ng / sa', 'Filipino markers show grammatical role and focus, replacing many assumptions learners bring from word-order languages.', 'Nakita ng bata ang aso sa parke.', 'The markers explain who does what to whom.']]],
    [/Particles/i, [['na / pa / naman', 'Enclitic particles add aspectual and interactional meaning that can be hard to translate word for word.', 'Kumain na ako, pero may oras pa naman.', 'The particles make the answer sound lived-in.']]],
    [/Register/i, [['po / opo', 'Respect particles and polite answers are central to social Filipino, especially with elders and service encounters.', 'Opo, maaari po bang magtanong?', 'Politeness is carried by particles as well as vocabulary.']]],
  ],
  id: [
    [/Affix/i, [['menulis / ditulis', 'Indonesian affixes reorganize voice and lexical meaning, so learners need to hear the stem inside several shapes.', 'Saya menulis laporan. Laporan itu ditulis kemarin.', 'The same event can foreground a different participant.']]],
    [/Reduplication/i, [['buku-buku', 'Reduplication can mark plurality, variety, or lexical meaning and is not just decorative repetition.', 'Saya membeli buku-buku baru.', 'The repeated form gives a clear plural reading here.']]],
    [/Classifier/i, [['seorang guru / sebuah rumah', 'Classifiers appear with counted nouns and reflect semantics such as animacy or shape rather than grammatical gender.', 'Dia seorang guru dan tinggal di sebuah rumah kecil.', 'The classifier follows the noun type.']]],
    [/Particles/i, [['sudah / masih / kok', 'Small particles and aspect words make Indonesian timing and stance much more natural.', 'Saya sudah makan, tetapi masih lapar kok.', 'The sentence carries both time and attitude.']]],
    [/Formal/i, [['saya / aku', 'Indonesian register is visible in pronouns and vocabulary. Saya is broadly safe; aku is closer and more intimate.', 'Saya ingin bertanya. Aku sudah tahu.', 'The same meaning lands differently socially.']]],
    [/Clause/i, [['karena / supaya', 'Clause linkers separate reason from purpose and help longer Indonesian answers stay precise.', 'Saya datang lebih awal karena rapat dimulai pagi supaya semuanya siap.', 'Each connector gives the next clause a clear job.']]],
  ],
  pt: [
    [/Gender/i, [['o livro / a casa', 'Portuguese agreement spreads across articles, nouns, and many adjectives, so one noun can reshape the whole phrase.', 'Comprei o livro novo e a casa nova.', 'The adjective follows gender and number.']]],
    [/Ser and Estar/i, [['ser / estar', 'Portuguese divides identity or classification from location or current state through ser and estar.', 'A cidade é tranquila, mas hoje está vazia.', 'The two verbs create different meanings of "be."']]],
    [/Past Aspect/i, [['estudei / estudava', 'Perfective and imperfective past forms shape whether an event advances the story or frames the background.', 'Estudava quando você ligou.', 'The forms organize the listener’s view of time.']]],
    [/Clitics|Object Pronouns/i, [['me explicou / explicou-me', 'Portuguese object pronouns shift position with register and variety, especially between Brazilian and European norms.', 'Ela me explicou tudo. / Ela explicou-me tudo.', 'Both are Portuguese, but not equally neutral everywhere.']]],
    [/Subjunctive/i, [['espero que você venha', 'The subjunctive appears after desire, doubt, evaluation, and many future-oriented clauses.', 'É importante que você descanse.', 'The mood marks stance rather than a bare fact.']]],
    [/Variation/i, [['você / tu', 'Portuguese varies strongly by region in pronouns, clitic placement, and everyday forms, so learners need broad awareness rather than one imagined universal norm.', 'Você vai hoje? / Tu vais hoje?', 'Both are valid, but the social geography differs.']]],
  ],
  ru: [
    [/Cases/i, [['книга / книгу / книге', 'Russian case endings show grammatical role, so one noun appears in several useful shapes.', 'Я вижу книгу и говорю о книге.', 'The ending changes with the sentence job.']]],
    [/Aspect/i, [['писать / написать', 'Russian aspect separates process from bounded completion and often matters more than tense alone.', 'Я писал письмо и наконец написал его.', 'The second verb presents completion.']]],
    [/Motion/i, [['идти / ходить', 'Motion verbs distinguish directionality and habitual movement before prefixes even enter the picture.', 'Я иду домой сейчас, но обычно хожу пешком.', 'One form is directional now; the other is habitual.']]],
    [/Participles/i, [['читающий студент', 'Participles compress relative-clause information into noun modifiers and are especially common in written Russian.', 'Читающий студент не заметил звонка.', 'The form makes the noun phrase denser.']]],
    [/Prefixes/i, [['идти / прийти / уйти', 'Prefixes reshape motion and viewpoint, making Russian verbs highly compositional but not always transparent.', 'Он пришёл утром и ушёл вечером.', 'The prefix changes the path meaning.']]],
    [/Word Order/i, [['Сегодня я работаю.', 'Russian word order is flexible but not free: moving words often changes theme, focus, or emotional weight.', 'Я работаю сегодня. Сегодня я работаю.', 'The facts stay similar while discourse emphasis changes.']]],
  ],
  tr: [
    [/Vowel Harmony/i, [['evler / okullar', 'Turkish suffix vowels harmonize with the preceding vowel, so morphology and pronunciation move together.', 'Evler büyük, okullar açık.', 'The plural ending changes shape to fit the stem.']]],
    [/Cases/i, [['eve / evde / evden', 'Case suffixes mark direction, location, and source directly on the noun.', 'Eve gidiyorum, evde çalışıyorum, evden çıkıyorum.', 'One noun carries several spatial roles through suffixes.']]],
    [/Evidential/i, [['geldi / gelmiş', 'Turkish distinguishes witnessed past from reported or inferred past, making information source part of grammar.', 'Ali geldi. Ali gelmiş.', 'The second sentence distances the speaker from direct evidence.']]],
    [/Participles/i, [['gelen kişi', 'Participles build compact relative-like modifiers before the noun.', 'Dün gelen kişi öğretmendi.', 'The modifier precedes the noun it describes.']]],
    [/Converbs/i, [['gelince / geldikten sonra', 'Converbs connect clauses through time, cause, or manner without turning every idea into a full finite clause.', 'Eve gelince beni ara.', 'The suffix creates a compact temporal link.']]],
    [/Register/i, [['sen / siz', 'Turkish address and politeness shift through pronouns, agreement, and request forms.', 'Nasılsın? / Nasılsınız?', 'The relationship is visible in the ending.']]],
  ],
  nl: [
    [/Word Order/i, [['Vandaag ga ik werken.', 'Dutch main clauses keep the finite verb in second position, while subordinate clauses send verbs later.', 'Ik blijf thuis omdat ik morgen moet werken.', 'Clause type changes the verb frame.']]],
    [/Separable/i, [['opstaan / ik sta op', 'Separable verbs split in finite main clauses and rejoin in infinitives and some subordinate contexts.', 'Ik sta vroeg op omdat ik morgen vroeg moet opstaan.', 'Learners must recognize both shapes.']]],
    [/Diminutives/i, [['huis / huisje', 'Dutch diminutives are productive and often add affection, smallness, or conversational naturalness.', 'We drinken een kopje koffie in een huisje aan zee.', 'The suffix changes both meaning and tone.']]],
    [/Past Tenses/i, [['ik werkte / ik heb gewerkt', 'Dutch uses simple past and perfect with differences of style, event framing, and region.', 'Gisteren werkte ik thuis en heb ik veel gedaan.', 'Both forms are useful, not interchangeable decorations.']]],
    [/Pronouns/i, [['er', 'Dutch er carries location, quantity, and existential meanings that often have no one-word English equivalent.', 'Er staan drie fietsen buiten.', 'The small word performs structural work.']]],
    [/Register/i, [['jij / u', 'Dutch pronouns and request forms shift with social distance; directness does not remove the need for politeness.', 'Hoe heet jij? / Hoe heet u?', 'The relationship changes the right form.']]],
  ],
  ta: [
    [/Cases?|Case Suffixes/i, [['வீடு / வீட்டில் / வீட்டுக்கு', 'Tamil case suffixes attach to the noun and carry relations that other languages may express with separate words.', 'நான் வீட்டில் இருக்கிறேன்; பிறகு வீட்டுக்கு செல்கிறேன்.', 'The suffix changes the noun’s role.']]],
    [/Verb Morphology/i, [['படிக்கிறேன் / படித்தேன்', 'Tamil verbs carry tense, person, and number information in rich endings.', 'நான் இன்று படிக்கிறேன்; நேற்று படித்தேன்.', 'The ending packages several grammatical decisions.']]],
    [/Participles/i, [['வந்த மனிதர்', 'Participial modifiers are central to Tamil relative-clause style and appear before the noun.', 'நேற்று வந்த மனிதர் என் ஆசிரியர்.', 'The clause is compressed into a modifier.']]],
    [/Diglossia/i, [['வருகிறேன் / வர்றேன்', 'Tamil has a meaningful distance between formal literary and everyday spoken forms.', 'நான் வருகிறேன் is formal; நான் வர்றேன் is conversational.', 'Both matter, but not in the same setting.']]],
    [/Honorificity/i, [['நீ / நீங்கள்', 'Tamil encodes respect through pronouns and verb agreement, so social relation changes grammar.', 'நீ எப்படி இருக்கிறாய்? / நீங்கள் எப்படி இருக்கிறீர்கள்?', 'The respectful form changes more than one word.']]],
    [/Relative/i, [['நான் வாங்கிய புத்தகம்', 'Relative participles let Tamil describe nouns without a separate relative pronoun.', 'நான் நேற்று வாங்கிய புத்தகம் சுவாரஸ்யமாக உள்ளது.', 'The modifier carries the embedded action.']]],
  ],
  bn: [
    [/Classifiers/i, [['একটা বই / একজন মানুষ', 'Bengali classifiers appear with counted nouns and reflect noun type, especially human versus non-human reference.', 'আমি একটা বই কিনেছি এবং একজন মানুষকে দেখেছি।', 'The classifier changes with the noun class.']]],
    [/Case Markers/i, [['বইয়ে / বই থেকে', 'Bengali marks many relations through postpositions or case-like endings after the noun.', 'বইয়ে ছবি আছে; বই থেকে শিখেছি।', 'The noun phrase changes with its role.']]],
    [/Agreement/i, [['আমি করি / তুমি করো / আপনি করেন', 'Bengali verb forms respond strongly to person and honorific level.', 'আমি যাই, তুমি যাও, আপনি যান।', 'The social relation changes the ending.']]],
    [/Aspect/i, [['করছি / করেছি', 'Bengali distinguishes ongoing, completed, and habitual readings through verb morphology.', 'আমি এখন পড়ছি, কিন্তু কাজটি করেছি।', 'The verb form tells how the event unfolds.']]],
    [/Honorificity/i, [['তুই / তুমি / আপনি', 'Bengali has several pronoun levels, and the wrong one can sound far too intimate or too distant.', 'আপনি কেমন আছেন? তুমি কেমন আছ?', 'The matching verb form matters with the pronoun.']]],
    [/Compounds?|Compound Verbs/i, [['খেয়ে নেওয়া', 'Compound verbs add completion, benefactive nuance, or speaker stance beyond the base verb.', 'খেয়ে নাও, তারপর বের হও।', 'The vector verb adds a practical shade of meaning.']]],
  ],
};

function matchingFeatureItems(lang, lesson) {
  return (featureLibraries[lang] || [])
    .filter(([matcher]) => matcher.test(lesson.title))
    .flatMap(([, items]) => items.map(([target, note, example, exampleNote]) => ({
      target,
      note,
      example,
      exampleNote,
    })));
}

function getFeatureSourceItems(lang, lesson) {
  const featureItems = matchingFeatureItems(lang, lesson);
  if (!featureItems.length) return [];

  return featureItems.flatMap((item) => ([
    {
      type: 'word',
      targetText: item.target,
      romanization: '',
      nativeText: item.note,
      pronunciation: '',
      exampleTarget: item.example,
      exampleNative: item.exampleNote,
      korean: item.target,
      english: item.note,
      example: item.example,
      exampleEnglish: item.exampleNote,
    },
    {
      type: 'sentence',
      targetText: item.example,
      romanization: '',
      nativeText: `Model use: ${item.note}`,
      pronunciation: '',
      exampleTarget: item.example,
      exampleNative: item.exampleNote,
      korean: item.example,
      english: `Model use: ${item.note}`,
      example: item.example,
      exampleEnglish: item.exampleNote,
    },
    {
      type: 'grammar',
      targetText: item.target,
      romanization: '',
      nativeText: `Contrast focus: ${item.note}`,
      pronunciation: '',
      exampleTarget: item.example,
      exampleNative: item.exampleNote,
      korean: item.target,
      english: `Contrast focus: ${item.note}`,
      example: item.example,
      exampleEnglish: item.exampleNote,
    },
  ]));
}

function makeExpansionProfile(lang, lessonId, lesson) {
  const profile = makeBeginnerProfile(lang, lessonId, lesson);
  const config = beginnerProfileConfigs[lang];
  return {
    ...profile,
    vocabularyGoal: `Use the key ${config.label} language of ${lesson.title} with the register and setting that the lesson requires.`,
    secondaryGrammarGoal: `Contrast the main pattern in ${lesson.title} with one nearby ${config.label} form so the learner can avoid literal transfer.`,
    featureItems: matchingFeatureItems(lang, lesson),
  };
}

module.exports = {
  getFeatureSourceItems,
  makeExpansionProfile,
};
