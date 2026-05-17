// Level 1 Unit 4 — Daily Routines (Italian)
// Functions: describing your day, regular activities, frequency adverbs,
// reflexive verbs for personal care.

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
  orientation: 'it-l1u4-orientation',
  pronunciation: 'it-l1u4-pronunciation',
  vocabularyRoutines: 'it-l1u4-vocab-routines',
  vocabularyTime: 'it-l1u4-vocab-time',
  grammarRegular: 'it-l1u4-grammar-regular-verbs',
  grammarReflexive: 'it-l1u4-grammar-reflexive',
  grammarFrequency: 'it-l1u4-grammar-frequency',
  reading: 'it-l1u4-reading',
  listening: 'it-l1u4-listening',
  writing: 'it-l1u4-writing',
  culture: 'it-l1u4-culture',
  task: 'it-l1u4-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Describe a normal weekday in Italian from waking up to going to bed using 12+ daily-routine verbs.', 'Conjugate the three regular present-tense paradigms (-are, -ere, -ire) automatically.', 'Use reflexive verbs (svegliarsi, alzarsi, lavarsi, vestirsi) with the matching reflexive pronouns (mi, ti, si, ci, vi, si).'], task: 'By the end you should narrate a complete day from 7 AM to 11 PM in Italian without rehearsing each line.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Verb-ending sound traps', goals: ['Distinguish -iamo (1st pl., stress on -IA-) from -ano (3rd pl., antepenultimate stress sdrucciola): parliamo /parˈljaː.mo/ vs parlano /ˈpar.la.no/.', 'Apply the geminate-consonant rule in 3rd-singular forms like fa /fa/, dà /da/ (with grave) vs ha /a/ (silent h).'], task: 'Read each verb form aloud with correct stress placement.' },
  { id: ACT.vocabularyRoutines, section: 'Vocabulary I', title: 'Daily-routine verbs', goals: ['Memorize 14 routine verbs across -are/-ere/-ire and reflexive forms: svegliarsi, alzarsi, lavarsi, vestirsi, fare colazione, andare, lavorare, studiare, mangiare, prendere, leggere, scrivere, dormire, tornare.'], task: 'Pair each verb with a time of day and produce one sentence per pairing.' },
  { id: ACT.vocabularyTime, section: 'Vocabulary II', title: 'Times of day and clock time', goals: ['Use mattina, pomeriggio, sera, notte to mark phase of day.', 'Tell time: che ora è / che ore sono → sono le otto, è l\'una, è mezzogiorno, è mezzanotte; add quarters and half: sono le otto e un quarto / e mezza / meno un quarto.'], task: 'State five times of day for typical activities.' },
  { id: ACT.grammarRegular, section: 'Grammar I', title: 'Regular present indicative — three conjugations', goals: ['Conjugate -are verbs: parlare → parlo, parli, parla, parliamo, parlate, parlano.', 'Conjugate -ere verbs: prendere → prendo, prendi, prende, prendiamo, prendete, prendono.', 'Conjugate -ire verbs (two patterns): dormire → dormo, dormi, dorme, dormiamo, dormite, dormono; finire → finisco, finisci, finisce, finiamo, finite, finiscono (with -isc- infix).'], task: 'Conjugate one verb from each group in all six persons.' },
  { id: ACT.grammarReflexive, section: 'Grammar II', title: 'Reflexive verbs and clitic pronouns', goals: ['Use the six reflexive pronouns: mi, ti, si, ci, vi, si — placed BEFORE the conjugated verb. Mi alzo "I get up", ti lavi "you wash yourself".', 'Recognize that some Italian verbs are reflexive where English isn\'t: svegliarsi "to wake up", alzarsi "to get up", chiamarsi "to be called".', 'In the infinitive and gerund the clitic attaches to the end: alzarsi, lavandosi.'], task: 'Conjugate three reflexive verbs in all six persons.' },
  { id: ACT.grammarFrequency, section: 'Grammar III', title: 'Frequency adverbs', goals: ['Use sempre (always), spesso (often), qualche volta (sometimes), mai (never, requires non), di solito (usually) — placed normally AFTER the verb: parlo sempre italiano.', 'Apply double negation: non parlo mai inglese ("I never speak English").'], task: 'Use each frequency adverb in a sentence about your routine.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'Read a daily-routine narrative', goals: ['Read a 7-sentence diary entry of an Italian student\'s typical day.', 'Answer five comprehension questions about times and activities.'], task: 'Read aloud and answer comprehension questions.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'Two students compare their days', goals: ['Follow a dialogue comparing two students\' daily routines.', 'Reproduce parts substituting your own activities.'], task: 'Perform the dialogue with the AI tutor.' },
  { id: ACT.writing, section: 'Writing', title: 'Write your daily routine', goals: ['Write a 6-sentence description of your typical weekday using regular verbs, reflexives, time expressions, and frequency adverbs.'], task: 'Write and read aloud.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Italian daily rhythm', goals: ['Recognize Italian meal times: colazione (light breakfast 7-9), pranzo (lunch 13-14, traditionally the main meal), aperitivo (around 18-19), cena (dinner 20-21).', 'Understand pausa pranzo (lunch break) — many small shops close 13:00-15:30 for it.', 'Know the espresso ritual: coffee taken standing al bancone (at the counter) and never with milk after 11 AM.'], task: 'Compare three differences between Italian and your home daily rhythm.' },
  { id: ACT.task, section: 'Task', title: 'Tell your day to an Italian friend', goals: ['Combine vocabulary, regular verbs, reflexive verbs, time, and frequency in one continuous narrative.'], task: 'Narrate your typical Tuesday from morning to night.' },
];

const lesson = {
  title: 'Level 1 · Unit 4: Una giornata tipo — Daily Routines',
  category: 'daily-routines',
  difficulty: 'beginner',
  targetLang: 'it',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-day', label: 'Describing your day', goal: 'Narrate morning, afternoon, evening, night sequentially using regular and reflexive verbs.' },
    { id: 'telling-time', label: 'Telling time', goal: 'Ask che ora è? and answer with sono le… / è l\'una / mezzogiorno.' },
    { id: 'expressing-frequency', label: 'Expressing frequency', goal: 'Place sempre, spesso, mai correctly with verbs to describe habits.' },
    { id: 'reflexive-actions', label: 'Reflexive personal-care actions', goal: 'Use mi alzo, mi lavo, mi vesto with correct pronoun placement.' },
  ],
  relatedPools: ['topic-daily-life', 'topic-time'],
  content: [
    createContentItem('Una giornata tipo', 'una djor-NA-ta TI-po', 'A typical day — the umbrella phrase for daily routine description. tipo here means "typical" and follows the noun.', 'word', 'Descrivo una mia giornata tipo da studentessa.', 'Opening phrase for any routine description.', null, [ACT.orientation]),
    createContentItem('Scenario', 'ske-NA-rjo', 'You meet a new Italian classmate at UniBo who asks "Com\'è una tua giornata?" — you need verbs for waking up, washing, eating, studying, exercising, returning home, sleeping.', 'word', 'Compagno: Com\'è una tua giornata?', 'Realistic prompt requiring routine narration.', null, [ACT.orientation]),
    createContentItem('Tre coniugazioni', 'three conjugations preview', 'Italian regular verbs split into three groups by infinitive ending: -are (parlare, mangiare, lavorare — the largest group), -ere (prendere, leggere, scrivere), -ire (dormire, partire, finire). Each group has a fixed set of present-tense endings.', 'word', 'parlare, prendere, dormire — three model verbs', 'Memorize the three patterns; about 90% of verbs follow them.', null, [ACT.orientation]),

    createContentItem('parliamo vs parlano', 'penultimate vs antepenultimate stress', 'parliamo /parˈljaː.mo/ has stress on -IA- (penultimate piana). parlano /ˈpar.la.no/ has stress on PAR- (antepenultimate sdrucciola). All 1st-plural verbs are penultimate; all 3rd-plural -are verbs are sdrucciole.', 'word', 'parliamo (we speak) vs parlano (they speak)', 'Common mispronunciation; learners stress -no at the end which is wrong.', null, [ACT.pronunciation]),
    createContentItem('fa, dà, ha — short verbs', 'monosyllables with grave accent or silent h', 'Three frequent short 3rd-singular verbs: fa "does/makes" (no accent, /fa/), dà "gives" (grave accent mandatory to distinguish from da "from", /da/), ha "has" (silent h, /a/, distinguished from a "to" only in writing).', 'word', 'fa, dà, ha — three lookalike 3rd-singular forms', 'The accents and silent h disambiguate in writing.', [
      { target: 'fa /fa/', note: 'does/makes; no accent needed (no homophone problem)' },
      { target: 'dà /da/', note: 'gives; grave accent vs preposition da' },
      { target: 'ha /a/', note: 'has; silent h vs preposition a' },
    ], [ACT.pronunciation]),
    createContentItem('finisco — -isc- infix', 'verbs with -isc- infix', '-ire verbs split into two patterns: the "regular" type (dormire, partire) and the "-isc-" type (finire, capire, preferire). The -isc- pattern inserts -isc- in 4 of 6 forms: finisco, finisci, finisce, finiamo, finite, finiscono. Note c /tʃ/ before i/e but /k/ before o.', 'word', 'finisco /fiˈnis.ko/ — finisce /fiˈniʃ.ʃe/', 'Note: -isco /sk/, -isce /ʃʃe/ — sound shift.', null, [ACT.pronunciation]),

    createContentItem('svegliarsi', '/sveʎˈʎar.si/', 'To wake up (reflexive). Reflexive infinitive ends in -si (oneself). Conjugated: mi sveglio, ti svegli, si sveglia, ci svegliamo, vi svegliate, si svegliano. gli /ʎ/ palatal lateral.', 'word', 'Mi sveglio alle sette.', 'First action of any morning routine narrative.', null, [ACT.vocabularyRoutines]),
    createContentItem('alzarsi', '/alˈtsar.si/', 'To get up (out of bed) — reflexive. Mi alzo subito dopo. The /ts/ is voiceless affricate.', 'word', 'Mi alzo alle sette e dieci.', 'Follows svegliarsi naturally.', null, [ACT.vocabularyRoutines]),
    createContentItem('lavarsi', '/laˈvar.si/', 'To wash oneself — reflexive. Used for washing face, hands, etc. Mi lavo le mani "I wash my hands". Compare lavare (non-reflexive): lavo i piatti "I wash the dishes".', 'word', 'Mi lavo i denti due volte al giorno.', '"I brush my teeth twice a day" — note reflexive even with a body-part object.', null, [ACT.vocabularyRoutines]),
    createContentItem('vestirsi', '/veˈstir.si/', 'To get dressed — reflexive. -ire verb regular type. Mi vesto, ti vesti, si veste.', 'word', 'Mi vesto in fretta la mattina.', '"I get dressed in a hurry in the morning".', null, [ACT.vocabularyRoutines]),
    createContentItem('fare colazione', '/ˈfaː.re ko.laˈtsjoː.ne/', 'To have breakfast. fare is irregular: faccio, fai, fa, facciamo, fate, fanno. Italian uses fare (not avere) for meals as activities.', 'word', 'Faccio colazione alle otto.', 'Italian breakfast is light: caffè + cornetto or biscotti.', null, [ACT.vocabularyRoutines]),
    createContentItem('andare', '/anˈdaː.re/', 'To go — irregular. Vado, vai, va, andiamo, andate, vanno. Pairs with prepositions: vado a casa, vado in università.', 'word', 'Vado in biblioteca.', 'Most common motion verb; memorize the irregular forms.', null, [ACT.vocabularyRoutines]),
    createContentItem('lavorare', '/la.voˈraː.re/', 'To work — regular -are. Lavoro, lavori, lavora, lavoriamo, lavorate, lavorano.', 'word', 'Lavoro in un bar il fine settimana.', '"I work in a bar on weekends" — common student job.', null, [ACT.vocabularyRoutines]),
    createContentItem('studiare', '/stuˈdjaː.re/', 'To study — regular -are with a slight spelling quirk: io studio, tu studi (the -i ending is the only -i, not -ii). Stress on -DJA-.', 'word', 'Studio italiano e latino.', 'Common student activity verb.', null, [ACT.vocabularyRoutines]),
    createContentItem('mangiare', '/manˈdʒaː.re/', 'To eat — regular -are. gi /dʒ/ before a. Same spelling quirk as studiare: tu mangi (one i).', 'word', 'Mangio la pasta a pranzo.', 'Pranzo (lunch) is traditionally the main Italian meal.', null, [ACT.vocabularyRoutines]),
    createContentItem('prendere', '/ˈprɛn.de.re/', 'To take — regular -ere. Prendo, prendi, prende. Used for transport (prendo l\'autobus), drinks (prendo un caffè), and other "taking" actions.', 'word', 'Prendo l\'autobus 19 per andare in università.', 'Multi-purpose verb; learn its many uses.', null, [ACT.vocabularyRoutines]),
    createContentItem('leggere', '/ˈlɛd.dʒe.re/', 'To read — regular -ere. Note gg /ddʒ/ geminated. Leggo, leggi, legge — but ggi /ddʒi/ becomes ggi /ddʒi/, so written leggi.', 'word', 'Leggo un libro ogni mese.', '"I read a book every month".', null, [ACT.vocabularyRoutines]),
    createContentItem('scrivere', '/ˈskri.ve.re/', 'To write — regular -ere. Scrivo, scrivi, scrive.', 'word', 'Scrivo un\'email al professore.', 'Common academic action.', null, [ACT.vocabularyRoutines]),
    createContentItem('dormire', '/dorˈmiː.re/', 'To sleep — regular -ire (regular type, NO -isc-). Dormo, dormi, dorme.', 'word', 'Dormo otto ore a notte.', 'Closing action of a daily routine.', null, [ACT.vocabularyRoutines]),
    createContentItem('tornare', '/torˈnaː.re/', 'To return / come back — regular -are. Torno a casa alle sette.', 'word', 'Torno a casa alle sette di sera.', '"I come home at seven in the evening".', null, [ACT.vocabularyRoutines]),

    createContentItem('mattina', '/matˈtiː.na/', 'Morning. Geminate tt. di mattina "in the morning" with no article.', 'word', 'La mattina mi sveglio presto.', 'Most routine narratives start with morning.', null, [ACT.vocabularyTime]),
    createContentItem('pomeriggio', '/po.meˈrid.dʒo/', 'Afternoon. Geminate gg /ddʒ/. Used as: di pomeriggio, nel pomeriggio, il pomeriggio.', 'word', 'Studio in biblioteca il pomeriggio.', 'Italian pomeriggio typically starts around 14:00.', null, [ACT.vocabularyTime]),
    createContentItem('sera', '/ˈseː.ra/', 'Evening (approximately 18:00 onward). di sera = "in the evening".', 'word', 'La sera ceno con i miei coinquilini.', '"In the evening I have dinner with my roommates".', null, [ACT.vocabularyTime]),
    createContentItem('notte', '/ˈnɔt.te/', 'Night (typically 22:00+). Open ò + geminate tt.', 'word', 'La notte dormo fino alle sette.', '"At night I sleep until seven".', null, [ACT.vocabularyTime]),
    createContentItem('Che ora è? / Che ore sono?', '/ke ˈoː.ra ɛ/, /ke ˈoː.re ˈsoː.no/', 'Telling time. Two equally common questions; che ora è singular, che ore sono plural — both mean "what time is it?". Answer with è/sono + le + hour.', 'word', '— Che ora è? — Sono le nove. · — Che ore sono? — È l\'una.', 'Italian uses essere for time; 2-12 takes plural sono le; 1 takes singular è l\'una.', [
      { target: 'è l\'una', note: '"it\'s 1 o\'clock" — singular for one' },
      { target: 'sono le due / tre / quattro…', note: 'plural for 2 onward' },
      { target: 'è mezzogiorno / mezzanotte', note: 'noon / midnight — masculine, special forms' },
    ], [ACT.vocabularyTime]),
    createContentItem('Quarters and halves', 'fractions of time', 'sono le otto e un quarto (8:15), sono le otto e mezza (8:30), sono le otto e tre quarti / sono le nove meno un quarto (8:45). Italian uses meno ("minus") to count down to the next hour.', 'word', 'Sono le nove meno un quarto. = 8:45.', 'Two ways to say 8:45: e tre quarti or meno un quarto (next hour minus 15).', null, [ACT.vocabularyTime]),

    createContentItem('-are: parlare (modello)', '-are paradigm', 'parlare "to speak" — model for ~80% of Italian verbs. parlo (1.s.), parli (2.s.), parla (3.s.), parliamo (1.pl.), parlate (2.pl.), parlano (3.pl. — sdrucciola, stress on PAR-).', 'sentence', 'parlo, parli, parla, parliamo, parlate, parlano', 'Memorize this paradigm; every -are verb follows it (except essere/avere/andare which are irregular).', null, [ACT.grammarRegular]),
    createContentItem('-ere: prendere (modello)', '-ere paradigm', 'prendere "to take" — model for -ere verbs. prendo, prendi, prende, prendiamo, prendete, prendono. Differences from -are: -e instead of -a in 3rd singular and 2nd plural; sdrucciole 3rd plural with -ono.', 'sentence', 'prendo, prendi, prende, prendiamo, prendete, prendono', 'Similar pattern to -are but with -e/-o vowels.', null, [ACT.grammarRegular]),
    createContentItem('-ire (regolare): dormire', '-ire paradigm (regular)', 'dormire "to sleep" — model for regular -ire verbs (about half of -ire verbs follow this). dormo, dormi, dorme, dormiamo, dormite, dormono. Same as -ere except 2nd plural is -ite.', 'sentence', 'dormo, dormi, dorme, dormiamo, dormite, dormono', 'Other regular -ire: partire, aprire, offrire, sentire.', null, [ACT.grammarRegular]),
    createContentItem('-ire (con -isc-): finire', '-ire paradigm (-isc- type)', 'finire "to finish" — the other half of -ire verbs add -isc- in 4 forms. finisco, finisci, finisce, finiamo, finite, finiscono. Note: 1st/2nd plural have NO -isc-. Other -isc- verbs: capire, preferire, costruire, pulire.', 'sentence', 'finisco, finisci, finisce, finiamo, finite, finiscono', 'You have to memorize which -ire verbs take -isc-; dictionaries mark them.', null, [ACT.grammarRegular]),
    createContentItem('Pronomi soggetto facoltativi', 'subject pronouns are optional', 'Italian normally DROPS the subject pronoun because the verb ending tells you the person. "Sono Anna" not "Io sono Anna" (unless emphatic). Use the pronoun for emphasis or contrast: io parlo, ma tu non parli.', 'sentence', 'Parlo italiano (standard) vs Io parlo italiano (emphatic — "I, not someone else").', 'Pro-drop language; English students often over-use pronouns.', null, [ACT.grammarRegular]),

    createContentItem('Pronomi riflessivi', 'reflexive pronouns', 'Six reflexive pronouns: mi (myself), ti (yourself informal), si (himself/herself/yourself formal), ci (ourselves), vi (yourselves), si (themselves). Placed BEFORE the conjugated verb: mi alzo, ti lavi, si veste, ci svegliamo, vi addormentate, si chiamano.', 'sentence', 'mi-ti-si-ci-vi-si — same form for 3rd singular and 3rd plural', 'A clitic — attaches to the verb prosodically.', null, [ACT.grammarReflexive]),
    createContentItem('Verbi riflessivi italiani vs inglesi', "Italian reflexives where English isn't", 'Some Italian verbs are reflexive where English uses a plain verb: svegliarsi "wake up" (not "wake oneself up"), alzarsi "get up", chiamarsi "be called/named", riposarsi "rest", divertirsi "have fun".', 'sentence', 'Mi sveglio (I wake up) — NOT "I wake up myself"', 'Common pitfall for English speakers who omit the reflexive.', [
      { target: 'svegliarsi', note: 'wake up — always reflexive' },
      { target: 'chiamarsi', note: 'be called (give one\'s name) — always reflexive: mi chiamo Anna' },
      { target: 'divertirsi', note: 'have fun — always reflexive: mi diverto' },
      { target: 'riposarsi', note: 'rest — always reflexive: mi riposo' },
    ], [ACT.grammarReflexive]),
    createContentItem('Riflessivi con infinito', 'reflexives in infinitive form', 'In infinitives, gerunds, and imperatives, the reflexive pronoun ATTACHES to the end of the verb: alzarsi (to get up), lavandosi (washing oneself), alzati! (get up! — informal). For modal verbs, the clitic can move: devo alzarmi OR mi devo alzare.', 'sentence', 'Devo alzarmi presto. = Mi devo alzare presto.', 'Modal verbs allow clitic climbing.', null, [ACT.grammarReflexive]),

    createContentItem('sempre / spesso / mai', 'sempre, spesso, mai — frequency adverbs', 'sempre "always", spesso "often", qualche volta / a volte "sometimes", raramente "rarely", mai "never" (requires non before verb). Placement: AFTER the verb in standard order: parlo sempre italiano.', 'sentence', 'Parlo sempre italiano. Mangio spesso la pasta. Non bevo mai il caffè.', 'Adverbs of frequency go after the verb in Italian.', null, [ACT.grammarFrequency]),
    createContentItem('mai con non', 'mai requires non', 'Italian double-negation rule: when using mai (never), nessuno (nobody), niente (nothing), nulla (nothing), the verb MUST be preceded by non. Non parlo mai inglese.', 'sentence', 'Non parlo mai. Non vedo mai film d\'azione.', 'NOT "parlo mai" alone — non is required.', null, [ACT.grammarFrequency]),
    createContentItem('di solito / normalmente', "habitual time markers", 'di solito (usually), normalmente, in genere, generalmente — all introduce habits. Placed at the start of the sentence or before the verb. Di solito mi sveglio alle sette.', 'sentence', 'Di solito mi sveglio alle sette. Normalmente faccio colazione al bar.', 'Sentence-initial; introduces the habitual.', null, [ACT.grammarFrequency]),
    createContentItem('ogni + tempo', 'ogni + time expression', 'ogni (every) is INVARIABLE and takes a SINGULAR noun: ogni giorno (every day), ogni mattina, ogni settimana, ogni mese, ogni anno. Note: tutti i giorni is also "every day" but takes plural.', 'sentence', 'Ogni giorno mi sveglio alle sette.', 'ogni + singular; tutti + plural — same meaning but different construction.', null, [ACT.grammarFrequency]),

    createContentItem('La giornata di Anna', 'Anna\'s typical day (reading)', '7-sentence diary entry of a UniBo student.', 'sentence', 'Mi sveglio alle sette e mi alzo subito. Faccio una doccia veloce e mi vesto. Alle otto faccio colazione: prendo sempre un cappuccino e un cornetto al bar in Via Zamboni. Alle nove vado in università per la lezione di latino. A pranzo mangio in mensa con gli amici. Il pomeriggio studio in biblioteca dalle tre alle sette. La sera ceno a casa, leggo un po\' e poi dormo verso le undici.', 'Translation explains in English: I wake up at 7 and get up immediately. I take a quick shower and get dressed. At 8 I have breakfast: I always have a cappuccino and a croissant at the bar on Via Zamboni. At 9 I go to university for Latin class. At lunch I eat in the canteen with friends. In the afternoon I study in the library from 3 to 7. In the evening I have dinner at home, I read a bit, and then sleep around 11.', [
      { target: 'mi sveglio / mi alzo / mi vesto', note: 'three reflexives in sequence — typical morning chain' },
      { target: 'cappuccino + cornetto', note: 'classic Italian breakfast' },
      { target: 'in mensa', note: 'university cafeteria; in + general place, no article' },
      { target: 'dalle tre alle sette', note: '"from 3 to 7" — articulated da/a + le' },
    ], [ACT.reading]),
    createContentItem('Domande sulla giornata di Anna', 'questions on the reading', 'Five questions checking comprehension.', 'sentence', 'D1: A che ora si alza? D2: Dove fa colazione? D3: Cosa fa il pomeriggio? D4: Con chi pranza? D5: A che ora va a letto?', 'Answers use times and verbs from the paragraph.', null, [ACT.reading]),

    createContentItem('Due giornate a confronto', "comparing two days", 'A dialogue between two students comparing their typical days.', 'conversation', 'Marco: Com\'è una tua giornata tipo?\nAnna: Mi sveglio alle sette, faccio colazione e vado in università alle nove. E tu?\nMarco: Io mi alzo più tardi, alle otto. Faccio colazione a casa, di solito caffè e biscotti.\nAnna: Cosa mangi a pranzo?\nMarco: A pranzo mangio in mensa, ma ogni venerdì pranzo a casa.\nAnna: Anch\'io vado in mensa. La sera cosa fai?\nMarco: La sera studio fino a tardi, di solito fino a mezzanotte.', 'Comparison dialogue using time + activity verbs.', null, [ACT.listening]),

    createContentItem('Scrivere la tua giornata', 'write your daily routine', '6-sentence template for own routine.', 'sentence', 'Esempio: Mi sveglio alle sette. Faccio una doccia e mi vesto. Alle otto e mezza vado in università. Il pomeriggio studio in biblioteca. La sera cucino e leggo. Vado a letto alle undici.', 'Substitute your own times and activities.', null, [ACT.writing]),

    createContentItem('Ritmo italiano dei pasti', 'Italian meal rhythm', 'colazione (breakfast, 7-9): light, sweet, often eaten standing at a bar. pranzo (lunch, 13-14): traditionally the biggest meal — pasta, main, vegetables. aperitivo (18-19): drinks + finger food, very social. cena (dinner, 20-21): lighter than American dinners; soup or pasta + simple secondo.', 'sentence', 'In Italia la cena è alle venti, non alle sei come negli Stati Uniti.', 'Cultural literacy: Italians eat much later than English speakers.', null, [ACT.culture]),
    createContentItem("Caffè rules", 'the espresso ritual', 'Italians drink caffè (espresso) standing al bancone in 2 minutes. Cappuccino is ONLY for morning (with breakfast); ordering one after lunch marks you as a foreigner. Caffè macchiato (with a drop of milk) is acceptable any time. Coffee after meals = espresso, no exceptions.', 'sentence', 'Un caffè al bancone, per favore. — Italian coffee culture in one phrase.', 'Espresso etiquette is a signature of Italian daily life.', [
      { target: 'cappuccino → solo la mattina', note: 'morning only; never after a meal' },
      { target: 'caffè (= espresso) → sempre', note: 'fine any time of day' },
      { target: 'al bancone', note: 'standing at the counter; cheaper and faster than sitting' },
    ], [ACT.culture]),
    createContentItem('Pausa pranzo', 'lunch break — shops close', 'Many Italian small shops close from 13:00 to 15:30 for pausa pranzo (lunch break). Large stores and chains stay open ("orario continuato"). Banks and public offices follow the closure. Plan errands accordingly.', 'sentence', 'Il negozio chiude alle tredici e riapre alle quindici e mezza.', 'Practical knowledge for living in Italy.', null, [ACT.culture]),

    createContentItem('Compito: racconta una tua giornata', 'task: narrate your day', 'Roleplay narrating your typical day to an Italian friend. Include morning routine (reflexives), classes/work, meals, and evening. Use frequency adverbs.', 'conversation', 'Amico: Cosa fai di solito durante la settimana?\nTu: [narrate morning, including 3 reflexives]\nAmico: A pranzo cosa mangi?\nTu: [meal details with times]\nAmico: E la sera?\nTu: [evening activities with frequency adverb]\nAmico: Vai mai al cinema?\nTu: [use mai or qualche volta]', 'Full integration; aim for 8-10 sentences total.', null, [ACT.task]),
    createContentItem('Sfida — il weekend', 'stretch — describe a weekend day', 'Stretch: describe a weekend day (different from weekday) using contrasts: il sabato dormo fino a tardi, il lunedì mi sveglio presto.', 'sentence', 'Il sabato è diverso: dormo fino alle dieci, faccio una colazione lunga, e di pomeriggio esco con gli amici.', 'Contrast weekday vs weekend routines.', null, [ACT.task]),
  ],
};

module.exports = lesson;
