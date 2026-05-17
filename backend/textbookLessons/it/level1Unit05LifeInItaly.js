// Level 1 Unit 5 — Life in Italy (Italian)
// Functions: describing life as a student/resident in Italy, geographic regions,
// regional differences, cultural anchors.

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
  orientation: 'it-l1u5-orientation',
  pronunciation: 'it-l1u5-pronunciation',
  vocabularyRegions: 'it-l1u5-vocab-regions',
  vocabularyLife: 'it-l1u5-vocab-life',
  grammarPiacere: 'it-l1u5-grammar-piacere',
  grammarComparison: 'it-l1u5-grammar-comparison',
  grammarMolto: 'it-l1u5-grammar-molto',
  reading: 'it-l1u5-reading',
  listening: 'it-l1u5-listening',
  writing: 'it-l1u5-writing',
  culture: 'it-l1u5-culture',
  task: 'it-l1u5-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Describe what life is like in Italy as a foreign student — daily challenges, things you like, regional contrasts.', 'Use mi piace / mi piacciono correctly with singular and plural subjects.', 'Compare Italian cities and regions: Roma vs Milano, nord vs sud.'], task: 'Picture yourself one month into your Erasmus at UniBo, explaining to your family back home what life is like.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in region names', goals: ['Pronounce the geminate ss in Toscana? Actually it\'s single — but Lombardia, Sicilia, Sardegna all have distinctive sounds.', 'Apply gn /ɲ/ in Romagna /roˈmaɲ.ɲa/, Sardegna /sarˈdeɲ.ɲa/.'], task: 'Read each region name aloud.' },
  { id: ACT.vocabularyRegions, section: 'Vocabulary I', title: 'Italian regions and major cities', goals: ['Know 8 of Italy\'s 20 regioni: Lazio (Roma), Lombardia (Milano), Toscana (Firenze), Veneto (Venezia, Verona), Campania (Napoli), Sicilia (Palermo), Emilia-Romagna (Bologna), Piemonte (Torino).', 'Recognize the nord/centro/sud divide and what each part is famous for.'], task: 'Match cities to regions and produce one fact per region.' },
  { id: ACT.vocabularyLife, section: 'Vocabulary II', title: 'Life-in-Italy vocabulary', goals: ['Memorize: il coinquilino (roommate), l\'affitto (rent), il permesso di soggiorno (residence permit), la carta d\'identità (ID card), l\'Erasmus, la mensa, il dottore, il commercialista.', 'Use abituarsi a (get used to), mancare (miss), piacere (like) idiomatically.'], task: 'Build five sentences combining piacere with life-vocabulary items.' },
  { id: ACT.grammarPiacere, section: 'Grammar I', title: 'piacere — the reversed verb', goals: ['Use mi piace with a singular subject: mi piace la pasta, mi piace l\'Italia. The thing liked is the GRAMMATICAL SUBJECT; the experiencer is in the indirect object form (mi, ti, gli, le, ci, vi, gli/loro).', 'Use mi piacciono with a plural subject: mi piacciono i gelati, mi piacciono le città italiane.', 'Recognize piacere\'s reversed argument structure — it\'s not "I like X" but "X is pleasing to me".'], task: 'Build 5 piacere sentences with singular and plural subjects, then negate three with non.' },
  { id: ACT.grammarComparison, section: 'Grammar II', title: 'più / meno + adjective + di — comparisons', goals: ['Form comparatives with più (more) / meno (less) + adjective + di + noun: Roma è più grande di Bologna ("Rome is bigger than Bologna").', 'Recognize irregular comparatives: buono → migliore "better", cattivo → peggiore "worse", grande → maggiore, piccolo → minore.', 'Form equality: tanto…quanto / così…come for "as…as".'], task: 'Compare 5 pairs of cities or things in Italy.' },
  { id: ACT.grammarMolto, section: 'Grammar III', title: 'molto, tanto, poco — quantifiers', goals: ['Use molto/tanto/poco as adverbs (uninflected) BEFORE adjectives: molto bello, tanto interessante, poco facile.', 'Use them as adjectives (inflected: molto/molta/molti/molte) before nouns: molti studenti, molte persone, molta pasta.'], task: 'Build 6 sentences using each form correctly.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'A letter home from Bologna', goals: ['Read a 10-sentence letter from an Erasmus student to family back home.'], task: 'Read aloud and answer comprehension questions.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'Two students comparing cities', goals: ['Follow a dialogue between students from Roma and Milano about their cities.'], task: 'Reproduce with your own city comparison.' },
  { id: ACT.writing, section: 'Writing', title: 'Write a postcard from Italy', goals: ['Write a 6-sentence postcard describing one Italian region.'], task: 'Pick one region, describe with comparisons and piacere.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Italy north vs south', goals: ['Recognize the historical nord-sud divide: industrial north, agricultural/tourist south, with strong regional identities everywhere.', 'Know key festivals: Carnevale (Venezia, Viareggio), Ferragosto (15 August), Pasqua, Natale + Befana (6 January).'], task: 'Compare three differences between nord and sud Italy.' },
  { id: ACT.task, section: 'Task', title: 'Tell your family about life in Italy', goals: ['Combine vocabulary, piacere, comparisons, and quantifiers into one continuous narrative.'], task: 'Voice-record a 90-second message to your family.' },
];

const lesson = {
  title: 'Level 1 · Unit 5: Vivere in Italia — Life in Italy',
  category: 'cultural-anchor',
  difficulty: 'beginner',
  targetLang: 'it',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'expressing-likes', label: 'Expressing likes', goal: 'Use mi piace / mi piacciono with singular and plural subjects.' },
    { id: 'comparing-places', label: 'Comparing places', goal: 'Use più…di and meno…di to compare cities, regions, foods.' },
    { id: 'describing-life', label: 'Describing daily life', goal: 'Narrate life-as-student with mensa, coinquilino, affitto, lezioni.' },
    { id: 'cultural-observations', label: 'Sharing cultural observations', goal: 'Comment on Italian habits with mi piace, non mi piace, è diverso.' },
  ],
  relatedPools: ['topic-cultural-anchor', 'topic-society'],
  content: [
    createContentItem('Vivere in Italia', 'VI-ve-re in i-TA-lja', 'Life in Italy — the umbrella theme of this unit. Encompasses regional differences, daily challenges, foods, festivals, and the small joys of Italian life.', 'word', 'Vivere in Italia è bello ma a volte complicato.', 'Realistic frame: not everything is easy, but a lot is wonderful.', null, [ACT.orientation]),
    createContentItem('Italia in numeri', 'Italia by the numbers', '20 regioni, ~60 milioni di abitanti, 7600 km di costa, capitale Roma (~3 milioni), centro economico Milano (1.4 milioni), patrimonio UNESCO più grande del mondo (58 siti).', 'word', 'L\'Italia ha venti regioni e ventiquattro siti UNESCO.', 'Numerical orientation.', null, [ACT.orientation]),

    createContentItem('Toscana', '/tosˈkaː.na/', 'Tuscany — central Italy, capital Firenze. Famous for Renaissance art, Chianti wine, rolling cypress-dotted hills, and cities like Siena, Pisa, Lucca.', 'word', 'La Toscana è famosa per il vino Chianti.', 'Italy\'s most visited region after Veneto.', null, [ACT.vocabularyRegions]),
    createContentItem('Lombardia', '/lom.barˈdiː.a/', 'Lombardy — northern Italy, capital Milano. Italy\'s economic engine, fashion capital, also home to Bergamo, Brescia, the Lake District.', 'word', 'La Lombardia è la regione più ricca d\'Italia.', 'Industrial / financial center of the country.', null, [ACT.vocabularyRegions]),
    createContentItem('Lazio', '/ˈlat.tsjo/', 'Lazio — central-western Italy, capital Roma. Home to the Vatican, Colosseum, ancient sites.', 'word', 'Il Lazio ospita la capitale, Roma.', 'Region of Rome and Vatican City.', null, [ACT.vocabularyRegions]),
    createContentItem('Veneto', '/ˈvɛː.ne.to/', 'Veneto — northeastern Italy, capital Venezia. Famous for Venice, Verona, Padova, prosecco wine, and dialects very different from standard Italian.', 'word', 'Il Veneto ha Venezia, Verona e Padova.', 'Tourist heartland of northeastern Italy.', null, [ACT.vocabularyRegions]),
    createContentItem('Campania', '/kamˈpaː.nja/', 'Campania — southern Italy, capital Napoli. Pompeii, Capri, Amalfi Coast, Mount Vesuvius. Birthplace of pizza margherita.', 'word', 'La Campania è famosa per Napoli e Pompei.', 'Southern food and tourism mecca.', null, [ACT.vocabularyRegions]),
    createContentItem('Sicilia', '/siˈtʃiː.lja/', 'Sicily — largest island, capital Palermo. Greek temples, baroque churches, Mount Etna, distinctive cuisine (arancini, cannoli, granita).', 'word', 'La Sicilia è la più grande isola del Mediterraneo.', 'Mediterranean island with unique culture.', null, [ACT.vocabularyRegions]),
    createContentItem('Emilia-Romagna', '/eˈmiː.lja roˈmaɲ.ɲa/', 'Emilia-Romagna — northern Italy, capital Bologna. Home of UniBo, parmigiano cheese, prosciutto di Parma, balsamic vinegar, tagliatelle al ragù. Note gn /ɲ/ in Romagna.', 'word', 'L\'Emilia-Romagna è la regione del cibo: prosciutto, parmigiano, tagliatelle.', 'The "food region" of Italy; home base for this curriculum.', null, [ACT.vocabularyRegions]),
    createContentItem('Piemonte', '/pjeˈmon.te/', 'Piedmont — northwestern Italy, capital Torino. Italian Alps, Italian-Swiss border, FIAT, slow-food movement, truffles, Barolo wine.', 'word', 'Il Piemonte è la patria del cioccolato e dei tartufi.', 'Confluence of French Alpine and Italian culture.', null, [ACT.vocabularyRegions]),

    createContentItem('il coinquilino / la coinquilina', '/koin.kwiˈliː.no/', 'Roommate (m./f.). Used for sharing apartments — very common for Italian students. Plural i coinquilini / le coinquiline.', 'word', 'Vivo con tre coinquiline in un appartamento.', 'Standard Erasmus / university experience.', null, [ACT.vocabularyLife]),
    createContentItem("l'affitto", '/lafˈfit.to/', 'Rent (m.s.). Geminate ff and tt. Plural gli affitti.', 'word', 'L\'affitto a Bologna è alto.', 'Bologna and Milan have the highest student rents in Italy.', null, [ACT.vocabularyLife]),
    createContentItem('il permesso di soggiorno', '/perˈmes.so/', 'Residence permit (m.s.) — required for non-EU students. Geminate ss. Plural i permessi di soggiorno.', 'word', 'Devo rinnovare il permesso di soggiorno.', 'Bureaucratic essential for non-EU students.', null, [ACT.vocabularyLife]),
    createContentItem("la carta d'identità", 'card-d\'identity', 'ID card (f.s.) — required document for all Italian residents. Apostrophe in d\' = elision of di. Plural le carte d\'identità.', 'word', 'Mostro la carta d\'identità in banca.', 'Used for any official transaction.', null, [ACT.vocabularyLife]),
    createContentItem("l'Erasmus", '/eˈraz.mus/', 'The Erasmus exchange program (m.). Invariable, used as a noun ("essere in Erasmus") and adjectivally ("studente Erasmus"). Approximately 30,000 foreign students study in Italy via Erasmus each year.', 'word', 'Sono in Erasmus a Bologna per un anno.', 'Erasmus is named after the philosopher Erasmus of Rotterdam (1466-1536) who himself studied at UniBo.', null, [ACT.vocabularyLife]),
    createContentItem('la mensa', '/la ˈmen.sa/', 'University canteen (f.s.). Pluralized le mense. Italian university mense serve hot meals at heavily subsidized prices.', 'word', 'A pranzo vado in mensa.', 'Often the cheapest student meal option.', null, [ACT.vocabularyLife]),
    createContentItem('abituarsi a', '/a.bi.twar.si a/', 'To get used to — reflexive verb + preposition a. Mi abituo a / mi sono abituato a + thing.', 'word', 'Mi sto abituando al ritmo italiano.', 'Useful for adaptation talk.', null, [ACT.vocabularyLife]),
    createContentItem('mancare', '/manˈkaː.re/', 'To miss / to be missing. Same reversed structure as piacere: mi manca la famiglia "I miss my family" (literally "my family is missing to me"). Same conjugation rules apply.', 'word', 'Mi manca la mia famiglia. · Mi mancano gli amici.', 'Reversed-verb structure like piacere.', null, [ACT.vocabularyLife]),

    createContentItem('piacere — il verbo "rovesciato"', 'piacere — the reversed verb', 'Italian piacere is structurally REVERSED compared to English "like". The thing liked is the GRAMMATICAL SUBJECT (which controls the verb form); the experiencer is in the INDIRECT OBJECT form (mi/ti/gli/le/ci/vi/gli). Mi piace la pasta = "Pasta is pleasing to me". Mi piacciono i gelati = "Ice creams are pleasing to me".', 'sentence', 'Mi piace il caffè. (single subj.) · Mi piacciono i biscotti. (plural subj.)', 'Master this structure — piacere governs many other reversed verbs (mancare, servire, occorrere).', [
      { target: 'mi (1.s. indirect)', note: '"to me" — experiencer' },
      { target: 'piace / piacciono', note: 'verb agrees with the THING liked, not the person liking' },
      { target: 'la pasta / i biscotti', note: 'subject — what is pleasing' },
    ], [ACT.grammarPiacere]),
    createContentItem('Pronomi indiretti — paradigma', 'indirect object pronouns', 'mi (to me), ti (to you informal), gli (to him), le (to her), Le (to you formal), ci (to us), vi (to you all), gli/loro (to them). Modern Italian increasingly uses gli for "to them"; loro is more formal/written.', 'sentence', 'mi-ti-gli-le-ci-vi-gli (modern) or mi-ti-gli-le-ci-vi-loro (formal)', 'Same pronouns are used for many "experiencer" verbs.', null, [ACT.grammarPiacere]),
    createContentItem('Negative di piacere', 'piacere negation', 'Negate with non BEFORE the pronoun: non mi piace il pesce, non mi piacciono i film d\'azione.', 'sentence', 'Non mi piace la birra. Non mi piacciono i lunedì mattina.', 'Standard non + pronoun + verb order.', null, [ACT.grammarPiacere]),
    createContentItem('piacere con altri esperienti', 'piacere with other experiencers', 'Replace mi with another indirect pronoun: ti piace la pizza? "do you like pizza?", a Marco piace il vino "Marco likes wine" (a + name fronted for emphasis).', 'sentence', 'A Marco piace il calcio. A Anna piacciono le canzoni napoletane.', 'Use a + person\'s name to highlight the experiencer.', null, [ACT.grammarPiacere]),

    createContentItem('Comparativo: più di / meno di', 'comparative: more than / less than', 'più (more) / meno (less) + adjective + di + comparison object. Roma è più grande di Bologna. Milano è meno antica di Roma. The adjective AGREES with the subject.', 'sentence', 'Roma è più grande di Bologna. · Bologna è meno costosa di Milano.', 'Standard comparative construction.', [
      { target: 'più + adj + di', note: '"more X than" — più antico di, più caro di' },
      { target: 'meno + adj + di', note: '"less X than" — meno costoso di, meno caldo di' },
      { target: 'adjective agreement', note: 'adjective matches the SUBJECT in gender/number' },
    ], [ACT.grammarComparison]),
    createContentItem('Comparativi irregolari', 'irregular comparatives', 'Four irregular comparatives to memorize: buono → migliore (better), cattivo → peggiore (worse), grande → maggiore (greater/older), piccolo → minore (smaller/younger). Each can also use più + base form.', 'sentence', 'La pizza napoletana è migliore della newyorkese. · Mio fratello maggiore ha 28 anni.', 'Migliore/peggiore are very common; the regular forms più buono / più cattivo also exist.', null, [ACT.grammarComparison]),
    createContentItem('Uguaglianza: tanto…quanto / così…come', 'equality: as…as', 'For equality: tanto + adj + quanto + comparison, or così + adj + come + comparison. Bologna è tanto bella quanto Firenze. Both pairs are equivalent.', 'sentence', 'Bologna è (tanto) bella quanto Firenze. Roma è (così) antica come Atene.', 'Both pairs work; tanto/quanto is slightly more common.', null, [ACT.grammarComparison]),

    createContentItem('molto come avverbio', 'molto as adverb (uninflected)', 'When molto modifies an adjective or verb, it stays UNINFLECTED: molto bello (very beautiful), molto bene (very well), mangio molto (I eat a lot). Same for tanto, poco, troppo when adverbial.', 'sentence', 'L\'Italia è molto bella. Mangio molto. Lavoro molto.', 'Adverbial use — no agreement.', null, [ACT.grammarMolto]),
    createContentItem('molto come aggettivo', 'molto as adjective (inflected)', 'When molto modifies a noun, it INFLECTS for gender and number: molto (m.s.), molta (f.s.), molti (m.pl.), molte (f.pl.). Molti studenti, molte persone, molta acqua.', 'sentence', 'Ho molti amici. Conosco molte persone. Bevo molta acqua.', 'Adjective use — agreement with the noun.', null, [ACT.grammarMolto]),
    createContentItem('poco, troppo, tanto', "other quantifiers with same rule", 'Same inflection vs adverb rules for: poco/-a/-i/-e (little/few), troppo/-a/-i/-e (too much/many), tanto/-a/-i/-e (so much/many).', 'sentence', 'Ho poco tempo. · Pochi studenti studiano. · Troppe persone in autobus.', 'Memorize the parallel rule for all four.', null, [ACT.grammarMolto]),

    createContentItem('Lettera dalla Bologna', "a letter from Bologna (reading)", '10-sentence letter from a UniBo Erasmus student to family.', 'sentence', 'Cari mamma e papà, sono a Bologna da un mese. Mi piace molto la città: è più piccola di Roma ma molto vivace per gli studenti. Vivo in un appartamento con tre coinquiline: una è italiana di Napoli, le altre sono francese e spagnola. L\'università è bellissima. Mi piacciono le lezioni di letteratura italiana, ma il latino è più difficile del greco. A pranzo mangio in mensa: il cibo è buono e costa poco. Mi mancano molto la nostra cucina e i nostri amici, ma sto bene. Bologna è famosa per i portici e per il cibo: tagliatelle al ragù, tortellini, mortadella — tutto delizioso. Vi scrivo presto, un abbraccio. Vostra Anna.', 'A realistic letter combining all unit grammar.', null, [ACT.reading]),
    createContentItem('Domande sulla lettera', 'comprehension on the letter', 'Five comprehension questions that make the learner recover duration, housemates, preferences, absence, and city identity from the letter.', 'sentence', 'D1: Da quanto tempo Anna è a Bologna? D2: Con chi abita? D3: Cosa le piace dell\'università? D4: Cosa le manca? D5: Perché Bologna è famosa?', 'Answering them rehearses `piacere`, `mancare`, and descriptive city language in connected context.', null, [ACT.reading]),

    createContentItem('Roma vs Milano — dialogo', "Roma vs Milano dialogue", 'Two students discussing their cities.', 'conversation', 'Marco (Roma): Milano è più costosa di Roma, no?\nGiulia (Milano): Sì, ma a Milano si trova più lavoro. Roma è bella ma più caotica.\nMarco: Il cibo a Roma è migliore, però — la carbonara, l\'amatriciana.\nGiulia: A Milano abbiamo il risotto, l\'ossobuco. La cucina milanese è meno conosciuta ma altrettanto buona.\nMarco: Vero. Ma a Roma c\'è il Colosseo!\nGiulia: A Milano c\'è il Duomo e la Scala. Entrambe sono belle.', 'Comparative city dialogue using più/meno.', null, [ACT.listening]),

    createContentItem('Cartolina dall\'Italia', "postcard from Italy (writing)", '6-sentence postcard template.', 'sentence', 'Esempio: Sono a Venezia in vacanza. La città è bellissima, più antica di qualsiasi altra città italiana. Mi piacciono le gondole e i ponti. Il cibo è ottimo: tante vongole e pesce fresco. Mi piace anche il dialetto veneziano, anche se è difficile da capire. Un saluto, Anna.', 'Substitute your own city/region.', null, [ACT.writing]),

    createContentItem('Nord vs sud', "north vs south italy", 'Italy is historically divided: nord (Lombardia, Piemonte, Veneto, etc.) is industrialized, more European in tempo; sud (Campania, Sicilia, Puglia, etc.) is more agricultural, more family-centered, with stronger regional identities. The economic divide is real but the cultural richness is balanced.', 'sentence', 'Il nord è più ricco economicamente, ma il sud è più caloroso umanamente.', 'Major cultural axis worth understanding.', [
      { target: 'nord = ricco, industriale', note: 'Lombardia, Piemonte, Veneto — Italian economic engine' },
      { target: 'sud = solare, agricolo', note: 'Campania, Sicilia, Puglia — Italian cultural soul' },
      { target: 'centro = misto', note: 'Toscana, Lazio, Emilia-Romagna — bridge between the two' },
    ], [ACT.culture]),
    createContentItem('Feste italiane', "Italian festivals", 'Major festivals: Carnevale (Venezia, Viareggio — February); Pasqua (Easter — March/April); 25 aprile (Liberation Day); 1 maggio (Labor Day); 2 giugno (Republic Day); Ferragosto (15 August — Italy shuts down for vacation); Natale (Christmas); Befana (6 January — old woman brings gifts).', 'sentence', 'Il 15 agosto è Ferragosto: l\'Italia è in vacanza.', 'Critical to plan around these holidays.', null, [ACT.culture]),
    createContentItem('Aperitivo', "aperitivo culture", 'Aperitivo is the late-afternoon (18-20) social ritual: drinks (spritz, Negroni, prosecco) + buffet/finger food (often free with drink). Milano invented modern aperitivo culture; now standard in every Italian city.', 'sentence', 'Andiamo a fare l\'aperitivo alle sette?', 'Pre-dinner social hour; a signature Italian habit.', null, [ACT.culture]),

    createContentItem('Compito: vita in Italia per la famiglia', "task: tell your family about life in Italy", '90-second narration combining all unit grammar.', 'conversation', 'Mamma: Allora, com\'è la vita in Italia?\nTu: [describe city with comparison]\nMamma: Cosa ti piace?\nTu: [3 piacere sentences with sing. and plural]\nMamma: Cosa ti manca?\nTu: [mancare with 2 different subjects]\nMamma: Ti stai abituando?\nTu: [abituarsi a + 1-2 things]\nMamma: Buon proseguimento!', 'Full integration.', null, [ACT.task]),
    createContentItem('Sfida — descrivere una regione', "stretch — describe one Italian region", 'Stretch: describe one Italian region in 5+ sentences using comparisons and piacere.', 'sentence', 'Esempio: La Sicilia è la regione più grande d\'Italia. Ha più sole della Lombardia. Mi piacciono molto i cannoli e le arancine. Il dialetto siciliano è difficile, più diverso dall\'italiano del napoletano.', 'Full integration target.', null, [ACT.task]),
  ],
};

module.exports = lesson;
