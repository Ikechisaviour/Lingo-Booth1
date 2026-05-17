// Level 1 Unit 3 — Locations & Prepositions (Italian)
// Functions: describing where things and people are, prepositions of place,
// articulated prepositions (al/del/dal/sul/nel/dei), asking and giving directions.

const createContentItem = (
  target,
  pronunciation,
  note,
  type = 'word',
  example = '',
  exampleNote = '',
  breakdown = null,
  activityIds = [],
) => ({
  type,
  activityIds,
  targetText: target,
  romanization: pronunciation,
  nativeText: note,
  pronunciation,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'it-l1u3-orientation',
  pronunciation: 'it-l1u3-pronunciation',
  vocabularyPlaces: 'it-l1u3-vocab-places',
  vocabularyPrepositions: 'it-l1u3-vocab-prepositions',
  grammarArticulated: 'it-l1u3-grammar-articulated',
  grammarStare: 'it-l1u3-grammar-stare',
  grammarDove: 'it-l1u3-grammar-dove',
  reading: 'it-l1u3-reading',
  listening: 'it-l1u3-listening',
  writing: 'it-l1u3-writing',
  culture: 'it-l1u3-culture',
  task: 'it-l1u3-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Say where you are, where someone or something is, and where you are going using a complete set of simple prepositions (a, in, di, da, su, per, con, tra/fra) and articulated forms (al, dal, dei, sul, nel).',
      'Distinguish in (city/country: "in Italia") from a (specific point: "a Bologna") — the most error-prone preposition pair for English speakers.',
      'Form articulated prepositions by combining preposition + article: di + il = del, a + la = alla, in + i = nei, su + lo = sullo.',
    ],
    task: 'Picture yourself giving directions in Bologna: from the train station to Piazza Maggiore via Via Indipendenza. By the end of this lesson you should describe every step in Italian.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in articulated prepositions',
    goals: [
      'Hold the geminate ll in alla, della, dalle, sulla — the double l is a held lateral that distinguishes alla "to the (f.s.)" from a la (ungrammatical).',
      'Distinguish dai /dai/ "from the (m.pl.)" from da i (the analytical form, also acceptable in some registers) — articulated forms are the modern standard.',
      'Pronounce the elided d\' (di + a = d\'? No — di before vowel uses dell\' or d\'); the elision is part of articulated prepositions.',
    ],
    task: 'Read each articulated preposition aloud and produce the geminate consonants cleanly.',
  },
  {
    id: ACT.vocabularyPlaces,
    section: 'Vocabulary I',
    title: 'Places in the city',
    goals: [
      'Memorize 14 city places: la piazza, la via, la strada, il bar, il ristorante, l\'università, la biblioteca, la stazione, l\'aeroporto, il museo, il negozio, la farmacia, il supermercato, la chiesa.',
      'Distinguish bar (Italian-style café) from caffè (the drink AND any café), and ristorante (full meal) from trattoria (informal) and osteria (very informal).',
    ],
    task: 'Name 5 places near you in Italian and add an article to each.',
  },
  {
    id: ACT.vocabularyPrepositions,
    section: 'Vocabulary II',
    title: 'Simple prepositions: a, in, di, da, su, per, con, tra/fra',
    goals: [
      'Use a for specific locations and destinations (a Bologna, a casa, a scuola); in for countries, regions, large geographic areas, and means of transport (in Italia, in macchina); di for origin and possession (di Bologna, il libro di Anna); da for movement from (da Roma) and a person\'s place (da Marco).',
      'Use su (on), per (for/through), con (with), tra/fra (between/among) without article when possible; with article they contract.',
    ],
    task: 'Build one sentence per preposition using a different place each time.',
  },
  {
    id: ACT.grammarArticulated,
    section: 'Grammar I',
    title: 'Articulated prepositions — preposition + article',
    goals: [
      'Form every articulated preposition: a + il = al, a + lo = allo, a + l\' = all\', a + la = alla, a + i = ai, a + gli = agli, a + le = alle. Same pattern for di, da, in, su.',
      'Use "in" articulated only in specific cases: nel (in the m.s.), nella (in the f.s.), nei (in the m.pl.), nelle (in the f.pl.). Bare "in" is preferred for countries and means of transport.',
      'Note that con and per are usually NOT articulated in modern Italian (col is archaic; con il is preferred); per is never articulated.',
    ],
    task: 'Combine each simple preposition with il, la, lo, i, gli, le to build the full articulated paradigm.',
  },
  {
    id: ACT.grammarStare,
    section: 'Grammar II',
    title: 'stare for location and state',
    goals: [
      'Conjugate stare in the present: io sto, tu stai, lui/lei sta, noi stiamo, voi state, loro stanno.',
      'Use stare for temporary location ("where I am now"): sto a Bologna, stiamo in biblioteca. Compare with essere for permanent origin: sono di Bologna.',
      'Use stare for how someone feels: come stai? — sto bene / sto male. Essere bene would be ungrammatical for this meaning.',
    ],
    task: 'Conjugate stare with six sentences expressing location, then three more expressing state of being.',
  },
  {
    id: ACT.grammarDove,
    section: 'Grammar III',
    title: 'dove / di dove / da dove — three "where" questions',
    goals: [
      'Use dove (where) for current location: dove sei? "where are you?".',
      'Use di dove (where from — origin) with essere: di dove sei? "where are you from?". Note di dov\'è with elision before è.',
      'Use da dove (from where — movement) with venire/arrivare: da dove vieni? "where are you coming from?".',
    ],
    task: 'Ask each of the three questions and answer naturally for yourself.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Directions in Bologna',
    goals: [
      'Read a short paragraph giving directions from Bologna Centrale station to Piazza Maggiore.',
      'Answer four comprehension questions about the route using prepositions of place.',
    ],
    task: 'Read the directions aloud and trace the route on a mental map.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Asking for directions',
    goals: [
      'Follow a 6-turn dialogue in which a tourist asks a local for directions to the Asinelli tower in Bologna.',
      'Reproduce the dialogue substituting a different destination.',
    ],
    task: 'Perform the dialogue with the AI tutor, swapping in your own destination.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write directions',
    goals: [
      'Write 5 sentences giving directions from one Bologna landmark to another using articulated prepositions and place verbs (andare, prendere, girare).',
    ],
    task: 'Write the directions and read them aloud.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Bologna geography and porticoes',
    goals: [
      'Recognize Bologna\'s 38 km of UNESCO-listed porticoes (covered walkways) as a defining urban feature.',
      'Know the main landmarks: Piazza Maggiore (main square), le Due Torri (Asinelli and Garisenda — the leaning towers), Università di Bologna (the oldest in Europe), and the Quadrilatero (medieval market quarter).',
      'Understand that piazza (square) is the heart of every Italian town, often surrounded by chiesa, comune (town hall), and bar/caffè.',
    ],
    task: 'Describe in three sentences how you would spend a Saturday afternoon in central Bologna.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Give directions in Bologna',
    goals: [
      'Combine prepositions, articulated forms, place vocabulary, and movement verbs into one coherent set of directions.',
    ],
    task: 'Roleplay giving directions from Bologna Centrale to your faculty at UniBo.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 3: Dove? — Locations, Places, and Prepositions',
  category: 'locations',
  difficulty: 'beginner',
  targetLang: 'it',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'saying-where', label: 'Saying where you are', goal: 'Use stare + preposition + place: sto a Bologna, sto in biblioteca.' },
    { id: 'asking-directions', label: 'Asking for directions', goal: 'Use Scusi, dov\'è… or Come posso arrivare a… to ask for a destination.' },
    { id: 'giving-directions', label: 'Giving directions', goal: 'Use vai/prendi/gira + articulated preposition + place name to direct someone.' },
    { id: 'describing-route', label: 'Describing a route', goal: 'Chain prima…, poi…, dopo… with prepositions to describe a multi-step path.' },
  ],
  relatedPools: ['topic-city', 'topic-direction'],
  content: [
    createContentItem('Localizzazione', 'lo-ka-li-tsa-TSJO-ne', 'The skill of saying where things and people are. Italian uses a rich preposition system with articulated forms (al, dei, sulla) that English does not have.', 'word', 'Sono a Bologna, in centro, vicino alla stazione.', 'Three preposition uses in one short sentence: a + city, in + general area, vicino a + specific spot.', null, [ACT.orientation]),
    createContentItem('Bologna come anchor', 'BO-lo-nya', 'Bologna will be the anchor city for this unit. Located in Emilia-Romagna, it has an iconic medieval center with porticoes, Piazza Maggiore at the heart, the two leaning towers (Le Due Torri), and Italy\'s oldest university.', 'word', 'Bologna è in Emilia-Romagna, nel nord-Italia.', 'Anchor location; you\'ll give directions through it in this lesson.', null, [ACT.orientation]),
    createContentItem('a vs in', 'a vs in — the biggest preposition trap', 'a marks SPECIFIC points: a Bologna (city), a casa (home), a scuola (school). in marks ENCLOSURES and large areas: in Italia (country), in Toscana (region), in biblioteca (inside a building). Cities take a; countries take in. This is the most error-prone pair for English speakers — both look like "in".', 'word', 'Vivo a Bologna, in Italia.', 'Memorize the rule: cities = a, countries/regions = in.', [
      { target: 'a + city', note: 'a Bologna, a Roma, a Firenze, a New York' },
      { target: 'in + country/region', note: 'in Italia, in Francia, in Toscana, in Asia' },
      { target: 'a casa / a scuola / a letto', note: 'specific points without article in Italian' },
      { target: 'in biblioteca / in centro / in chiesa', note: 'enclosed spaces / general areas, no article' },
    ], [ACT.orientation]),

    createContentItem('alla', '/ˈal.la/', 'a + la = alla. Articulated preposition meaning "to the / at the" + feminine singular. Geminate ll fully held — distinguishes from a la which is ungrammatical in modern Italian.', 'word', 'Vado alla stazione.', 'Most common feminine articulated form.', null, [ACT.pronunciation]),
    createContentItem('della', '/ˈdel.la/', 'di + la = della. "Of the" + feminine singular. Geminate ll.', 'word', 'La via della stazione è lunga.', '"The street of the station is long".', null, [ACT.pronunciation]),
    createContentItem('sullo', '/ˈsul.lo/', 'su + lo = sullo. "On the" + masculine singular before s+cons/z. Geminate ll.', 'word', 'Il libro è sullo zaino.', '"The book is on the backpack" — lo is used before z, so sullo.', null, [ACT.pronunciation]),
    createContentItem('agli', '/ˈaʎ.ʎi/', 'a + gli = agli. "To the" + masculine plural before vowel/s+cons. Palatal lateral /ʎ/ doubled.', 'word', 'Parlo agli studenti.', '"I speak to the students" — gli is used before vowel, so agli for plural.', null, [ACT.pronunciation]),
    createContentItem('nelle', '/ˈnel.le/', 'in + le = nelle. "In the" + feminine plural. Geminate ll.', 'word', 'Le matite sono nelle borse.', '"The pencils are in the bags" — le for f.pl., nelle.', null, [ACT.pronunciation]),

    createContentItem('la piazza', '/la ˈpjat.tsa/', 'The square. The geographic and social heart of every Italian town. Geminate zz pronounced /tts/. Plural le piazze.', 'word', 'Ci vediamo in Piazza Maggiore.', 'In + piazza is bare (no article) when used with the proper name.', null, [ACT.vocabularyPlaces]),
    createContentItem('la via', '/la ˈviː.a/', 'The street. Used in addresses: Via Indipendenza, 15. Plural le vie.', 'word', 'Abito in Via Zamboni.', 'Bologna\'s Via Zamboni is the heart of the student quarter.', null, [ACT.vocabularyPlaces]),
    createContentItem('la strada', '/la ˈstraː.da/', 'The road / street, broader than via. Used for main thoroughfares and roads outside cities. Plural le strade.', 'word', 'Questa strada porta a Firenze.', 'Strada vs via: strada is generic, via is part of a name.', null, [ACT.vocabularyPlaces]),
    createContentItem('il bar', '/il bar/', 'The Italian-style café-bar. Serves coffee, pastries, light drinks, and aperitivi. Invariable plural: i bar. Distinct from English "bar"; Italian bar opens at 6 AM.', 'word', 'Andiamo al bar a prendere un caffè.', 'The Italian morning ritual is "un caffè al bar".', null, [ACT.vocabularyPlaces]),
    createContentItem('il ristorante', '/il ri.stoˈran.te/', 'The full-service restaurant. Plural i ristoranti. Less common than informal trattoria for everyday meals.', 'word', 'Ceniamo al ristorante stasera.', 'Reserve ristorante for proper restaurants; trattoria for casual.', null, [ACT.vocabularyPlaces]),
    createContentItem("l'università", '/lu.ni.ver.siˈta/', 'The university. Feminine, final-stressed. Plural le università (invariable in plural for -tà words).', 'word', "Studio all'Università di Bologna.", 'Articulated alla + l\' = all\'università.', null, [ACT.vocabularyPlaces]),
    createContentItem('la biblioteca', '/la bi.bljoˈtɛː.ka/', 'The library. Plural le biblioteche (with h to keep c hard).', 'word', 'Studio in biblioteca tutti i giorni.', 'in biblioteca = "at the library" (no article needed inside fixed phrase).', null, [ACT.vocabularyPlaces]),
    createContentItem('la stazione', '/la sta.ˈtsjoː.ne/', 'The (train) station. Plural le stazioni. Italian stations are usually called Stazione di [city name] — Stazione di Bologna Centrale.', 'word', 'Arrivo alla stazione alle dieci.', 'Bologna Centrale is the main train hub of northern Italy.', null, [ACT.vocabularyPlaces]),
    createContentItem("l'aeroporto", '/la.e.roˈpɔr.to/', 'The airport. Masculine, vowel-initial → l\'. Plural gli aeroporti.', 'word', "L'aeroporto di Bologna si chiama Marconi.", 'Bologna airport is Marconi; named after Guglielmo Marconi, the inventor.', null, [ACT.vocabularyPlaces]),
    createContentItem('il museo', '/il muˈzɛː.o/', 'The museum. Open ɛ. Plural i musei.', 'word', 'Il museo è chiuso il lunedì.', 'Most Italian museums are closed on Monday.', null, [ACT.vocabularyPlaces]),
    createContentItem('il negozio', '/il neˈɡɔt.tsjo/', 'The shop. Plural i negozi. zi /tsjo/ — voiceless affricate.', 'word', 'Il negozio chiude alle otto.', '"The shop closes at 8".', null, [ACT.vocabularyPlaces]),
    createContentItem('la farmacia', '/la far.maˈtʃiː.a/', 'The pharmacy. Plural le farmacie. Final-stress on -CI-a is rare but here -ia is unstressed; stress on -CI-.', 'word', "C'è una farmacia in fondo alla via.", 'Pharmacies are marked with a green cross in Italy.', null, [ACT.vocabularyPlaces]),
    createContentItem('il supermercato', '/il su.per.merˈkaː.to/', 'The supermarket. Plural i supermercati. Compound: super + mercato.', 'word', 'Vado al supermercato per la spesa.', 'Distinct from alimentari (small grocery shop).', null, [ACT.vocabularyPlaces]),
    createContentItem('la chiesa', '/la ˈkjɛː.za/', 'The church. Plural le chiese. chi /kj/ — h keeps c hard.', 'word', 'La chiesa di San Petronio è in Piazza Maggiore.', 'San Petronio is Bologna\'s cathedral, the 5th-largest in Italy.', null, [ACT.vocabularyPlaces]),
    createContentItem('a casa', '/a ˈkaː.sa/', '"At home / to home". Note: NO article — fixed phrase. Movement: vado a casa "I\'m going home"; location: sono a casa "I\'m at home".', 'word', 'Resto a casa stasera.', 'a casa is one of the few "specific point" Italian phrases without article.', null, [ACT.vocabularyPlaces]),

    createContentItem('a (preposizione)', '/a/', 'Preposition "to / at" — used for specific points (cities, casa, scuola, letto). Articulated forms: al, allo, all\', alla, ai, agli, alle.', 'word', 'Vado a Bologna. Sono a casa.', 'Cities take a; countries take in.', null, [ACT.vocabularyPrepositions]),
    createContentItem('in (preposizione)', '/in/', 'Preposition "in / at" — used for enclosed spaces, countries, regions, and means of transport. Articulated: nel, nello, nell\', nella, nei, negli, nelle.', 'word', 'Vivo in Italia. Vado in macchina.', 'Vehicle: in + transport (in macchina, in treno, in autobus).', null, [ACT.vocabularyPrepositions]),
    createContentItem('di (preposizione)', '/di/', '"Of / from / about". Origin: sono di Bologna. Possession: il libro di Anna. Articulated: del, dello, dell\', della, dei, degli, delle.', 'word', 'Sono di Bologna. Il libro di Marco.', 'Same di used for origin and possession.', null, [ACT.vocabularyPrepositions]),
    createContentItem('da (preposizione)', '/da/', '"From / by / at someone\'s place". Movement: vengo da Roma. Person\'s place: vado da Marco "I\'m going to Marco\'s". Articulated: dal, dallo, dall\', dalla, dai, dagli, dalle.', 'word', 'Vengo da Roma. Vado dal dentista.', 'da + person/professional = at their place: dal medico, dal barbiere.', null, [ACT.vocabularyPrepositions]),
    createContentItem('su (preposizione)', '/su/', '"On / upon". Articulated: sul, sullo, sull\', sulla, sui, sugli, sulle. Often used for surfaces and topics.', 'word', 'Il libro è sul tavolo. Parlo sulla cucina italiana.', 'Both physical (on) and figurative (about).', null, [ACT.vocabularyPrepositions]),
    createContentItem('per (preposizione)', '/per/', '"For / through / in order to". NEVER articulated in modern Italian. Used for purpose (per imparare "in order to learn"), direction (per Roma "toward Rome"), and duration (per due ore "for two hours").', 'word', 'Studio per imparare. Il treno per Roma.', 'No articulated form; just per il, per la, per i, per le.', null, [ACT.vocabularyPrepositions]),
    createContentItem('con (preposizione)', '/kon/', '"With". Modern Italian rarely articulates with con (col is archaic/poetic; con il is the standard).', 'word', 'Vado al cinema con Anna.', 'Use "con il/la/i/le" as separate words.', null, [ACT.vocabularyPrepositions]),
    createContentItem('tra / fra', '/tra/, /fra/', '"Between / among / in (with time)". tra and fra are interchangeable. Used for both location ("between two things") and future time ("in two hours" = fra due ore).', 'word', 'Tra Roma e Bologna. · Fra due ore.', 'Choose tra/fra for euphony — avoid tra trams or fra fratelli.', null, [ACT.vocabularyPrepositions]),

    createContentItem('Preposizioni articolate — tabella', 'articulated prepositions — full table', 'Italian contracts certain prepositions with the definite article. The full system: a, di, da, in, su all contract with il/lo/l\'/la/i/gli/le. con and per do not (modern usage). Memorize the table — it appears in every sentence.', 'sentence', 'a + il = al · di + il = del · da + il = dal · in + il = nel · su + il = sul\na + la = alla · di + la = della · da + la = dalla · in + la = nella · su + la = sulla\na + i = ai · di + i = dei · da + i = dai · in + i = nei · su + i = sui', 'The full pattern; learn by drilling.', [
      { target: 'al (a + il)', note: 'al cinema, al ristorante, al bar' },
      { target: 'allo (a + lo)', note: 'allo studio, allo zoo, allo psicologo' },
      { target: "all' (a + l')", note: "all'università, all'amico" },
      { target: 'alla (a + la)', note: 'alla stazione, alla biblioteca, alla casa' },
      { target: 'ai (a + i)', note: 'ai ragazzi, ai libri' },
      { target: 'agli (a + gli)', note: 'agli studenti, agli amici' },
      { target: 'alle (a + le)', note: 'alle ragazze, alle case, alle nove (time)' },
    ], [ACT.grammarArticulated]),
    createContentItem('di articolato', "di + article forms", 'Same pattern for di: del, dello, dell\', della, dei, degli, delle. Used for possession ("of the…"), origin from a specific place, and partitive ("some").', 'sentence', 'Il libro del professore. La penna della studentessa. I quaderni degli amici.', 'Most frequent articulated preposition after a.', null, [ACT.grammarArticulated]),
    createContentItem('da articolato', "da + article forms", 'dal, dallo, dall\', dalla, dai, dagli, dalle. Used for "from the" and movement: vengo dalla biblioteca "I\'m coming from the library", vado dal dentista "I\'m going to the dentist\'s".', 'sentence', 'Vengo dalla biblioteca. Vado dal medico.', 'Note: dal + profession = at their office (dal dentista).', null, [ACT.grammarArticulated]),
    createContentItem('in articolato', "in + article forms", 'nel, nello, nell\', nella, nei, negli, nelle. Less common than bare "in" with countries; usually used with specific buildings or items.', 'sentence', "Nel libro c'è un'immagine. Nello zaino ci sono due libri.", 'Bare "in" preferred with countries/regions/transport.', null, [ACT.grammarArticulated]),
    createContentItem('su articolato', "su + article forms", 'sul, sullo, sull\', sulla, sui, sugli, sulle. "On the". Used for surfaces and topics.', 'sentence', 'Il libro è sul tavolo. Parlo sulla cucina italiana.', 'Same forms apply for "about" (topic).', null, [ACT.grammarArticulated]),

    createContentItem('stare — presente', 'present indicative of stare', 'Six forms: io sto, tu stai, lui/lei sta, noi stiamo, voi state, loro stanno. Geminate nn in stanno. Stare is the "where I am right now" verb; pairs with essere for permanent identity.', 'sentence', 'io STO / tu STAI / lui-lei STA / noi STIA-mo / voi STA-te / loro STAN-no', 'Memorize like avere and essere — the third pillar verb.', null, [ACT.grammarStare]),
    createContentItem('stare per posizione', 'stare for location/state', 'stare expresses "where someone is right now" (location) and "how someone feels" (state). Use it for casual location: sto a Bologna ora "I\'m in Bologna right now"; for permanent origin use essere: sono di Bologna "I\'m from Bologna".', 'sentence', 'Sto in biblioteca. (location now) · Sto bene. (feeling)', 'A common Romance-language distinction English doesn\'t make.', [
      { target: 'stare = current location', note: 'sto a Bologna (right now); sto in classe' },
      { target: 'stare = feeling/state', note: 'sto bene, sto male, sto così così' },
      { target: 'essere = permanent identity', note: 'sono italiano, sono di Bologna (origin)' },
    ], [ACT.grammarStare]),
    createContentItem('come stai? / come sta?', "how are you — informal and formal", 'The standard greeting follow-up: come stai? (tu, informal) or come sta? (Lei, formal). Standard answers: sto bene, sto male, sto così così "so-so", non c\'è male "not bad".', 'sentence', '— Come stai? — Sto bene, grazie. E tu?', 'Mandatory follow-up to ciao in most encounters.', null, [ACT.grammarStare]),
    createContentItem('stare + gerund', 'stare + gerundio for ongoing action', 'stare + gerund (V-ando / V-endo) expresses ongoing/progressive action — like English "to be V-ing". Sto mangiando "I am eating right now". Distinct from simple present mangio "I eat (habitually)".', 'sentence', 'Sto studiando. (I am studying right now) vs Studio. (I study, generally)', 'Progressive aspect — exists in Italian but used less than in English.', null, [ACT.grammarStare]),

    createContentItem('dove?', '/ˈdoː.ve/', '"Where" — asks for current location. Used with essere or stare: dove sei? dove stai?', 'sentence', 'Dove sei? — Sono in biblioteca.', 'Basic location question.', null, [ACT.grammarDove]),
    createContentItem('di dove?', '/di ˈdoː.ve/', '"Where from (origin)" — used with essere. Asks for permanent origin/nationality.', 'sentence', 'Di dove sei? — Sono di Bologna.', 'For permanent origin; pair with sono di + city.', null, [ACT.grammarDove]),
    createContentItem('da dove?', '/da ˈdoː.ve/', '"From where (movement)" — used with venire (to come) or arrivare (to arrive). Asks for the point you\'re moving from.', 'sentence', 'Da dove vieni? — Vengo dalla biblioteca.', 'For movement from; pair with vengo da + place.', null, [ACT.grammarDove]),
    createContentItem('dove vai?', '/ˈdoː.ve vai/', '"Where are you going?" — used with andare (to go). Pair with vado a + place.', 'sentence', 'Dove vai? — Vado a casa.', 'Movement TO question; mirror image of da dove.', null, [ACT.grammarDove]),

    createContentItem('Bologna in cinque tappe', 'Bologna in five stops (reading)', 'A short paragraph guiding you from Bologna Centrale station to Piazza Maggiore via Via Indipendenza. Uses articulated prepositions extensively.', 'sentence', 'Dalla stazione di Bologna Centrale, prendi Via Indipendenza. Cammina dritto per circa dieci minuti. Sulla sinistra c\'è la chiesa di San Petronio Vecchio. Più avanti, attraversa Via Rizzoli. Arrivi a Piazza Maggiore: davanti a te c\'è la basilica di San Petronio e a destra il Palazzo Comunale.', 'Translation: "From Bologna Central station, take Via Indipendenza. Walk straight for about ten minutes. On the left there is the church of San Petronio Vecchio. Further on, cross Via Rizzoli. You arrive at Piazza Maggiore: in front of you is the basilica of San Petronio and on the right the Town Hall."', [
      { target: 'dalla stazione', note: 'da + la = dalla; "from the station"' },
      { target: 'sulla sinistra', note: 'su + la = sulla; "on the left"' },
      { target: 'attraversa Via Rizzoli', note: 'tu imperative of attraversare; "cross Via Rizzoli"' },
      { target: 'davanti a te', note: '"in front of you" — davanti a + pronoun' },
      { target: 'a destra / a sinistra', note: '"on the right / on the left" — fixed phrases with a' },
    ], [ACT.reading]),
    createContentItem('Domande sul percorso', 'route comprehension questions', 'Five route-comprehension questions.', 'sentence', 'D1: Da dove parte il percorso? D2: Quale via prendi? D3: Cosa c\'è sulla sinistra? D4: Dove arrivi? D5: Cosa c\'è davanti a te in Piazza Maggiore?', 'Answers use articulated prepositions.', [
      { target: 'R1: Dalla stazione di Bologna Centrale.', note: 'origin point' },
      { target: 'R2: Prendo Via Indipendenza.', note: 'street name' },
      { target: 'R3: C\'è la chiesa di San Petronio Vecchio.', note: 'landmark' },
      { target: 'R4: Arrivo a Piazza Maggiore.', note: 'destination with a' },
      { target: 'R5: La basilica di San Petronio.', note: 'in front of you' },
    ], [ACT.reading]),

    createContentItem('Chiedere indicazioni — dialogo', 'asking for directions dialogue', 'A tourist asks for directions to Le Due Torri (Bologna\'s leaning towers).', 'conversation', 'Turista: Scusi, signora, dove sono le Due Torri?\nLocale: Le torri Asinelli e Garisenda? Allora, da qui prenda Via Rizzoli e cammini dritto.\nTurista: Quanto è lontano?\nLocale: Cinque minuti a piedi. Le torri sono in fondo alla via, all\'incrocio con Via Zamboni.\nTurista: Grazie mille!\nLocale: Prego, buona giornata.', 'Standard direction-asking pattern.', [
      { target: 'scusi (formal)', note: '"excuse me" — Lei form imperative' },
      { target: 'prenda / cammini', note: 'formal Lei imperatives — irregular forms of prendere/camminare' },
      { target: 'in fondo a + place', note: '"at the end of" — common direction phrase' },
      { target: "all'incrocio con", note: '"at the intersection with" — a + l\' = all\'' },
    ], [ACT.listening]),

    createContentItem('Indicazioni — scrivere', 'write directions', 'Template for 5-sentence directions writing using articulated prepositions.', 'sentence', 'Esempio: Dalla casa, prendi Via Zamboni. Dopo cento metri, gira a destra in Via San Giacomo. Continua dritto fino al semaforo. Al semaforo, attraversa la piazza. La biblioteca è sulla sinistra.', 'Substitute your own streets and landmarks.', null, [ACT.writing]),

    createContentItem('I portici di Bologna', 'porticoes of Bologna', 'Bologna has 38 km of covered walkways (portici), the longest in the world. Built from the 12th century to provide walking space and let buildings expand upward. UNESCO World Heritage since 2021. The portici are key to navigating Bologna in any weather — you can walk most of the city without getting wet.', 'sentence', 'Cammino sotto i portici quando piove.', 'Cultural literacy: the portico is to Bologna what the canal is to Venice.', [
      { target: 'i portici (m.pl.)', note: 'the covered walkways; 38 km total' },
      { target: 'sotto i portici', note: '"under the porticoes" — common location phrase' },
      { target: 'Patrimonio UNESCO', note: 'UNESCO Heritage status confirmed 2021' },
    ], [ACT.culture]),
    createContentItem('Piazza Maggiore', 'piazza maggiore — the heart of bologna', 'Piazza Maggiore is Bologna\'s main square, surrounded by the basilica of San Petronio (5th-largest in Italy), Palazzo del Podestà, Palazzo Comunale, and the Fountain of Neptune nearby. The piazza dates to the 13th century.', 'sentence', 'Ci vediamo in Piazza Maggiore alle sei.', 'Standard meeting spot in central Bologna.', null, [ACT.culture]),
    createContentItem('Le Due Torri', 'the two towers — asinelli and garisenda', 'Bologna\'s most famous landmark: Torre degli Asinelli (97 m, climbable, 498 steps) and Torre della Garisenda (48 m, leaning at 4 degrees, closed to public). Built ~1109 by rival families. The two towers appear in Dante\'s Inferno.', 'sentence', 'Salgo sulla Torre degli Asinelli.', 'Tourist must-do; the climb is steep but the view spans the city.', null, [ACT.culture]),

    createContentItem('Compito: indicazioni dal Centrale', 'task: directions from the central station', 'Roleplay giving directions from Bologna Centrale to your faculty (or any landmark). Use articulated prepositions, place names, and movement verbs.', 'conversation', '[Esci dalla stazione Bologna Centrale]\nAmico: Scusami, sono nuovo qui. Dove si trova la facoltà di Lettere?\nTu: [give 4-5 step directions using articulated prepositions]\nAmico: Quanto ci vuole a piedi?\nTu: [estimate time]\nAmico: Perfetto, grazie!\nTu: [polite goodbye]', 'Six turns; demonstrates the full unit.', null, [ACT.task]),
    createContentItem('Sfida — descrivere il tuo percorso casa-università', "stretch — describe your home-to-university route", 'Stretch goal: describe in detail the route from your accommodation to your faculty, mentioning at least 3 landmarks, 2 transport choices, and 5 articulated prepositions.', 'sentence', 'Esempio: Esco da casa, prendo l\'autobus 19 dalla fermata di Via Marconi fino alla stazione, poi cammino sotto i portici fino all\'aula 3 della Facoltà di Lettere in Via Zamboni.', 'Full integration of unit vocabulary and grammar.', null, [ACT.task]),
  ],
};

module.exports = lesson;
