// Level 1 Unit 4 — Daily Routines (Modern Hebrew)
// Functions: describing what you do every day, telling time, sequencing actions,
// using present-tense verbs with full gender agreement.

const createContentItem = (target, translit, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization: translit, nativeText: note, pronunciation: translit,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'he-l1u4-orientation', pronunciation: 'he-l1u4-pronunciation',
  vocabRoutines: 'he-l1u4-vocab-routines', vocabTime: 'he-l1u4-vocab-time',
  grammarPresent: 'he-l1u4-grammar-present', grammarSequence: 'he-l1u4-grammar-sequence',
  grammarFrequency: 'he-l1u4-grammar-frequency',
  reading: 'he-l1u4-reading', listening: 'he-l1u4-listening', writing: 'he-l1u4-writing',
  culture: 'he-l1u4-culture', task: 'he-l1u4-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Describe your daily routine from morning to night in Hebrew.', 'Tell time on the hour and half-hour.', 'Use frequency adverbs like "always", "usually", "sometimes".'], task: 'Construct a full morning-to-evening account of a typical day at Hebrew University.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Present-tense verb stress', goals: ['Apply mil\'ra stress to most present tense verbs: kotEV, holECH, yoshEV.', 'Hear the gender ending change rhythm: kotev (m) vs kotEvet (f).', 'Recognize the plural endings -im (m-pl) and -ot (f-pl).'], task: 'Pronounce each present-tense paradigm with correct stress.' },
  { id: ACT.vocabRoutines, section: 'Vocabulary I', title: 'Daily activities', goals: ['Memorize 15 routine verbs (wake up, eat, work, study, sleep) in present tense.', 'Use each in both masculine and feminine forms.'], task: 'List your own daily activities using each verb.' },
  { id: ACT.vocabTime, section: 'Vocabulary II', title: 'Time expressions', goals: ['Tell time on the hour: שמונה (shmone, 8), עשר (eser, 10), שתים עשרה (shteim esre, 12).', 'Use וחצי (va-chetzi, "and half") and רבע (reva, "quarter").', 'Use parts of the day: בוקר, צהריים, ערב, לילה.'], task: 'Tell the AI tutor the time at five different points in your daily schedule.' },
  { id: ACT.grammarPresent, section: 'Grammar I', title: 'Present tense — Pa\'al binyan', goals: ['Form the four present-tense forms of a Pa\'al (qal) verb: kotev (m-sg), kotevet (f-sg), kotvim (m-pl), kotvot (f-pl).', 'Apply the pattern to verbs from this lesson: לכתוב (likhtov, to write), ללמוד (lilmod, to study), לאכול (le\'echol, to eat).', 'Recognize that present participles double as both "I write" and "I am writing".'], task: 'Conjugate 5 verbs in all four present-tense forms.' },
  { id: ACT.grammarSequence, section: 'Grammar II', title: 'Sequencing — Then and after', goals: ['Use אז (az, "then") and אחר כך (achar kach, "after that") to sequence actions.', 'Use ב + time + מתחיל ל- + verb structure: "I start [verb]ing at [time]".'], task: 'Describe your morning in 4 sequenced steps using az and achar kach.' },
  { id: ACT.grammarFrequency, section: 'Grammar III', title: 'Frequency adverbs', goals: ['Use תמיד (tamid, always), בדרך כלל (be-derech klal, usually), לפעמים (lif\'amim, sometimes), אף פעם לא (af pa\'am lo, never).', 'Position adverbs: usually before the verb (in modern Hebrew, more flexible).'], task: 'Describe three habits with three different frequency adverbs.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'A day in the life', goals: ['Read a 6-sentence diary entry about a student\'s day.', 'Answer comprehension questions about the timing and sequence.'], task: 'Read aloud once, then answer five comprehension questions.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'Comparing routines', goals: ['Follow two students comparing their morning routines.', 'Identify the verbs, times, and frequency markers used.'], task: 'Listen and then describe one of the speakers\' routines.' },
  { id: ACT.writing, section: 'Writing', title: 'Your daily diary', goals: ['Write 6 sentences about your own typical day.', 'Use at least 5 present-tense verbs, 3 time expressions, and 2 frequency adverbs.'], task: 'Compose your daily diary entry.' },
  { id: ACT.culture, section: 'Culture Note', title: 'The Israeli week', goals: ['Recognize that the Israeli workweek is Sunday-Thursday (not Monday-Friday).', 'Know that Shabbat (Saturday) is a day of rest, with most businesses closed.', 'Understand the importance of "the country" coming home for Shabbat dinner.'], task: 'Name the days of the Israeli workweek.' },
  { id: ACT.task, section: 'Task', title: 'Comparing your routine with a sabra', goals: ['Combine routine vocabulary, time, sequencing, and frequency in a continuous self-narrative.', 'Compare your routine with a typical Israeli\'s.'], task: 'Roleplay a conversation with an Israeli classmate comparing morning routines.' },
];

const lesson = {
  title: 'Level 1 · Unit 4: יום שלי — A Day in My Life',
  category: 'daily-life', difficulty: 'beginner', targetLang: 'he', nativeLang: 'en', track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-routine', label: 'Describing your routine', goal: 'Walk through a typical day with verbs, times, and sequencing.' },
    { id: 'telling-time', label: 'Telling time', goal: 'Give the time in Hebrew on the hour, half-hour, and quarter-hour.' },
    { id: 'comparing-habits', label: 'Comparing habits', goal: 'Contrast what you usually do with what a partner usually does.' },
  ],
  relatedPools: ['topic-time', 'topic-daily-life'],
  content: [
    createContentItem('יום ביום', 'yom be-yom', 'Day by day. The lesson covers your typical day from waking up to going to bed — the most common conversational topic in any language.', 'word', 'מה אתה עושה יום ביום? — ma ata oseh yom be-yom — "what do you do every day?"', 'Hebrew has no distinct "habitual" tense; the present serves both "I do (now)" and "I do (habitually)".', null, [ACT.orientation]),
    createContentItem('קם / קמה', 'kam / kama', 'Wakes up / gets up. Masculine kam, feminine kama. Mil\'ra in feminine (ka-MA), mil\'el-ish in masculine (KAM, monosyllable). From binyan Pa\'al, root ק-ו-ם.', 'word', 'אני קם בשש בבוקר. — ani kam be-shesh ba-boker — "I wake up at 6 AM."', 'Pa\'al binyan; the root ק-ו-ם also gives קמה (kama, harvest) and מקום (makom, place).', null, [ACT.pronunciation]),
    createContentItem('כותב / כותבת', 'kotev / kotevet', 'Writes. Masculine kotev (ko-TEV), feminine kotevet (ko-TE-vet). Plural: kotvim (m), kotvot (f). The feminine ending -et is one of two main feminine present-tense endings.', 'word', 'היא כותבת מייל. — hi kotevet mail — "She writes an email."', 'Root כ-ת-ב gives a huge family: ktav (handwriting), ktiva (writing), katav (he wrote), katuv (written), mikhtav (letter), katavah (article).', null, [ACT.pronunciation]),
    createContentItem('הולך / הולכת', 'holech / holechet', 'Walks / goes. Masculine holech, feminine holechet. The chet /kh/ is the back-of-throat sound. Plural: holchim / holchot.', 'word', 'אני הולך לאוניברסיטה. — ani holech la-universita — "I\'m walking/going to the university."', 'Root ה-ל-ך gives the noun הליכה (halicha, walking) and the verbal noun ללכת (lalechet, to go).', null, [ACT.pronunciation]),

    createContentItem('קם', 'kam', 'To wake up / get up. Pa\'al, root ק-ו-ם.', 'sentence', 'אני קם בשש. — ani kam be-shesh — "I get up at six."', 'Common reversed phrase: ממשיך לישון (mamshich lishon, keep sleeping) — when you don\'t want to wake.', null, [ACT.vocabRoutines]),
    createContentItem('מתקלח', 'mitkale\'ach / mitkalachat', 'Showers. Reflexive (binyan hitpa\'el), root ק-ל-ח. Masculine mitkale\'ach, feminine mitkalachat.', 'sentence', 'אני מתקלח בבוקר. — ani mitkale\'ach ba-boker — "I shower in the morning."', 'Israelis shower frequently due to climate; cold-water showers in summer are normal.', null, [ACT.vocabRoutines]),
    createContentItem('מצחצח שיניים', 'metzachtze\'ach shinayim', 'Brushes teeth. Pi\'el binyan, root צ-ח-צ-ח (a four-letter "reduplicated" root). Shinayim = teeth (dual number).', 'sentence', 'אני מצחצח שיניים בבוקר. — ani metzachtze\'ach shinayim ba-boker — "I brush my teeth in the morning."', 'Shinayim has the dual ending -ayim, used for natural pairs (eyes, ears, hands).', null, [ACT.vocabRoutines]),
    createContentItem('אוכל', 'ochel / ochelet', 'Eats. Pa\'al, root א-כ-ל. Masculine ochel (o-CHEL), feminine ochelet.', 'sentence', 'אני אוכל ארוחת בוקר. — ani ochel aruchat boker — "I eat breakfast."', 'Same root gives mahkal (food), ma\'achal (dish), ochel (also "food" as noun).', null, [ACT.vocabRoutines]),
    createContentItem('שותה', 'shoteh / shotah', 'Drinks. Pa\'al, root ש-ת-ה. Mil\'ra: sho-TE / sho-TAH.', 'sentence', 'אני שותה קפה כל בוקר. — ani shoteh kafe kol boker — "I drink coffee every morning."', 'Coffee culture in Israel is intense; the standard is קפה הפוך (kafe hafuch, "upside-down coffee" = cappuccino).', null, [ACT.vocabRoutines]),
    createContentItem('נוסע', 'nose\'a / nosa\'at', 'Travels (by vehicle). Pa\'al, root נ-ס-ע. Mil\'ra.', 'sentence', 'אני נוסעת באוטובוס. — ani nosa\'at ba-otobus — "I take the bus" (female speaker).', 'Different from הולך (holech, walks); use nose\'a specifically for vehicle travel.', null, [ACT.vocabRoutines]),
    createContentItem('לומד', 'lomed / lomedet', 'Studies, learns. Pa\'al, root ל-מ-ד. Mil\'ra.', 'sentence', 'אני לומדת באוניברסיטה. — ani lomedet ba-universita — "I study at the university."', 'Root ל-מ-ד gives talmid (student), melamed (teacher of children, traditional), limmud (study, learning).', null, [ACT.vocabRoutines]),
    createContentItem('עובד', 'oved / ovedet', 'Works. Pa\'al, root ע-ב-ד.', 'sentence', 'אני עובד אחר הצהריים. — ani oved acharei ha-tzohorayim — "I work in the afternoon."', 'Root ע-ב-ד gives avoda (work), eved (slave), oved (worker, employee).', null, [ACT.vocabRoutines]),
    createContentItem('חוזר', 'chozer / chozeret', 'Returns. Pa\'al, root ח-ז-ר. Initial chet /kh/.', 'sentence', 'אני חוזרת הביתה בשבע. — ani chozeret ha-baita be-sheva — "I return home at seven."', 'ha-baita = "homeward" (directional suffix -a); a common destination phrase.', null, [ACT.vocabRoutines]),
    createContentItem('צופה', 'tzofeh / tzofah', 'Watches. Pa\'al, root צ-פ-ה. Mil\'ra.', 'sentence', 'אני צופה בטלוויזיה. — ani tzofeh ba-televizia — "I watch TV."', 'Modern Israeli often replaces with "roeh" (sees) in casual speech: roeh televizia.', null, [ACT.vocabRoutines]),
    createContentItem('קורא', 'kore / kor\'et', 'Reads. Pa\'al, root ק-ר-א. The initial /k/ is hard from qof. Feminine korEt (silent alef).', 'sentence', 'אני קורא ספר לפני השינה. — ani kore sefer lifnei ha-shena — "I read a book before bed."', 'Same root gives mikra (Bible reading) and korei (caller, reader).', null, [ACT.vocabRoutines]),
    createContentItem('הולך לישון', 'holech lishon', 'Goes to sleep. Compound: holech (goes) + lishon (to sleep, infinitive). Replace lishon with le\'echol, lilmod, etc. for "goes to eat/study".', 'sentence', 'אני הולכת לישון בשתיים עשרה. — ani holechet lishon be-shteim esre — "I go to sleep at midnight."', 'For "I sleep" (present tense), use ישן/ישנה (yashen/yeshena).', null, [ACT.vocabRoutines]),

    createContentItem('שעה', 'sha\'a', 'Hour. Feminine. Plural: שעות (sha\'ot).', 'sentence', 'מה השעה? — ma ha-sha\'a — "What time is it?" (literally "what is the hour?")', 'For "an hour" of duration: שעה (sha\'a, no article).', null, [ACT.vocabTime]),
    createContentItem('בוקר / צהריים / ערב / לילה', 'boker / tzohorayim / erev / layla', 'Parts of the day. Boker (morning, mil\'el), tzohorayim (noon, dual form), erev (evening, mil\'el), layla (night).', 'sentence', 'בשבע בבוקר — be-sheva ba-boker — "at seven in the morning"', 'Tzohorayim has the dual ending -ayim ("the two-noons" = noon period); a relic of older Hebrew time-counting.', null, [ACT.vocabTime]),
    createContentItem('וחצי', 'va-chetzi', 'And half. Used for half-past times: shesh va-chetzi = 6:30.', 'sentence', 'השעה שבע וחצי. — ha-sha\'a sheva va-chetzi — "It\'s 7:30."', 'Chetzi (half) used in many compounds: chetzi pita (half a pita), chetzi sha\'a (half an hour).', null, [ACT.vocabTime]),
    createContentItem('רבע', 'reva', 'Quarter. Mil\'el: RE-va. Used for quarter-hours: reva la-chamesh = quarter to 5; reva acharei chamesh = quarter past 5.', 'sentence', 'השעה רבע לתשע. — ha-sha\'a reva la-tesha — "It\'s quarter to 9."', 'Less common in casual speech than digital time-telling, but essential for traditional Hebrew time.', null, [ACT.vocabTime]),

    createContentItem('זמן הווה — בניין פעל', 'zman hove — binyan pa\'al', 'Present tense in the Pa\'al (qal) binyan — the most common verb pattern. Four forms for gender/number: M-sg (kotev), F-sg (kotevet), M-pl (kotvim), F-pl (kotvot). The pattern for a regular three-consonant root: C1oC2eC3 (m-sg).', 'sentence', 'כותב / כותבת / כותבים / כותבות — kotev / kotevet / kotvim / kotvot.', 'Present-tense forms are technically participles in Hebrew grammar — they double as nouns ("a writer") and verbs ("writes").', [
      { target: 'M-sg kotev', note: 'C1-o-C2-e-C3 pattern; the unmarked form' },
      { target: 'F-sg kotevet', note: '-et ending after the C3' },
      { target: 'M-pl kotvim', note: '-im plural; the o-vowel drops before the plural suffix' },
      { target: 'F-pl kotvot', note: '-ot plural; same vowel drop' },
    ], [ACT.grammarPresent]),
    createContentItem('דוגמאות', 'dugma\'ot', 'Pa\'al present examples: לכתוב (likhtov, to write) → kotev/et/im/ot. ללמוד (lilmod, to study) → lomed/et/im/ot. לאכול (le\'echol, to eat) → ochel/et/im/ot.', 'sentence', 'אני לומד / היא לומדת / הם לומדים / הן לומדות.', 'Note that all four forms share the same root letters; only the vowels and endings change.', null, [ACT.grammarPresent]),

    createContentItem('אז / אחר כך', 'az / achar kach', 'Sequencing markers. אז (az) = "then, so"; אחר כך (achar kach) = "after that". Use to chain sequential actions.', 'sentence', 'אני קם, אז אוכל, אחר כך הולך ללימודים. — ani kam, az ochel, achar kach holech la-limudim — "I get up, then eat, after that go to studies."', 'In modern speech az is also used as a filler ("so...") and as a question particle ("so what?").', null, [ACT.grammarSequence]),
    createContentItem('מתחיל ל-', 'matchil le-', 'Begins to / starts. Combines matchil (begins) + ל- + infinitive verb.', 'sentence', 'אני מתחיל לעבוד בתשע. — ani matchil la\'avod be-tesha — "I start working at nine."', 'Sister forms: ממשיך ל- (mamshich le-, continues to), מסיים (mesayem, finishes).', null, [ACT.grammarSequence]),

    createContentItem('תמיד / בדרך כלל / לפעמים / אף פעם לא', 'tamid / be-derech klal / lif\'amim / af pa\'am lo', 'Frequency adverbs. Tamid (always) → 100%; be-derech klal (usually) → 80%; lif\'amim (sometimes) → 30%; af pa\'am lo (never) → 0%. Note the double negation: af pa\'am ("not even once") + לא (lo).', 'sentence', 'אני תמיד שותה קפה. אף פעם לא שותה תה. — ani tamid shoteh kafe. af pa\'am lo shoteh teh. — "I always drink coffee. I never drink tea."', 'Position: typically before the verb (tamid + verb); modern speech allows post-verb position too.', null, [ACT.grammarFrequency]),

    createContentItem('יומן', 'yoman', 'A 6-sentence diary entry by a Hebrew University student. Read aloud, then answer the comprehension questions.', 'sentence', 'יום ראשון. אני קמה בשש בבוקר ושותה קפה. בשבע אני נוסעת לאוניברסיטה באוטובוס. בתשע יש לי שיעור מתמטיקה, אחר כך אני אוכלת צהריים בקפיטריה. בארבע אחר הצהריים אני חוזרת הביתה. בערב אני קוראת בספריה ולומדת. בעשר וחצי אני הולכת לישון.', 'Translation: "Sunday. I get up at 6 AM and drink coffee. At 7 I take the bus to the university. At 9 I have a math class, after which I eat lunch at the cafeteria. At 4 PM I return home. In the evening I read at the library and study. At 10:30 I go to sleep."', null, [ACT.reading]),

    createContentItem('השוואת שגרות', 'hashvayat shigrot', 'Two students compare their morning routines. Listen for the verbs and frequency markers.', 'conversation', 'דני: אתה מתעורר בשעה כמה?\nיוסי: אני קם בחמש וחצי, אני תמיד הולך לחדר כושר.\nדני: וואו, אני בקושי קם בשמונה!\nיוסי: ואז מה? אתה אוכל ארוחת בוקר?\nדני: לפעמים. בדרך כלל רק קפה.\nיוסי: אני אף פעם לא שותה קפה. רק תה ירוק.', 'Note the contrast: Yossi has a rigid early routine, Dani has a flexible later one. Both styles are common in Israel.', [
      { target: 'בקושי be-koshi', note: '"barely / hardly"; a very common modifier' },
      { target: 'חדר כושר cheder kosher', note: '"gym"; lit. "fitness room"' },
      { target: 'תה ירוק teh yarok', note: '"green tea"; with masculine adjective agreement (teh is masculine)' },
    ], [ACT.listening]),

    createContentItem('תרגיל כתיבה', 'targil ktiva', 'Write 6 sentences about your typical day. Use at least 5 present-tense verbs, 3 time expressions, and 2 frequency adverbs.', 'sentence', 'דוגמה: אני קם בשבע בבוקר. בדרך כלל אני אוכל ארוחת בוקר בבית. בשמונה אני נוסע לעבודה. בארבע אחר הצהריים אני חוזר. בערב אני לומד עברית, אחר כך צופה בטלוויזיה. אני אף פעם לא הולך לישון לפני אחת עשרה.', 'Translation: "I get up at 7 AM. Usually I eat breakfast at home. At 8 I go to work. At 4 PM I return. In the evening I study Hebrew, then watch TV. I never go to sleep before 11."', null, [ACT.writing]),

    createContentItem('שבוע ישראלי', 'shavua yisre\'eli', 'The Israeli workweek runs Sunday (יום ראשון, yom rishon — "first day") through Thursday (יום חמישי, yom chamishi — "fifth day"). Friday (יום שישי) is a short day; Saturday is Shabbat. This is opposite the Christian-influenced Mon-Fri pattern of most Western countries.', 'sentence', 'השבוע מתחיל ביום ראשון. — ha-shavua matchil be-yom rishon — "The week starts on Sunday."', 'Israeli schools, offices, and government are closed Friday afternoon and Saturday; reopen Sunday morning.', [
      { target: 'יום ראשון yom rishon', note: 'Sunday — "first day"; the start of the workweek' },
      { target: 'יום שני yom sheni', note: 'Monday — "second day"' },
      { target: 'יום שישי yom shishi', note: 'Friday — "sixth day"; half workday' },
      { target: 'שבת shabbat', note: 'Saturday — sabbath; day of rest' },
    ], [ACT.culture]),
    createContentItem('ארוחת שישי בלילה', 'aruchat shishi ba-layla', 'Friday night dinner. The center of Israeli social life: families gather, candles are lit (in religious homes), and "the country comes home". Whether secular or religious, most Israelis treat Friday dinner as sacred family time.', 'sentence', 'כל הארץ באה הביתה לארוחת ערב שישי. — kol ha-aretz ba\'a ha-baita le-aruchat erev shishi — "The whole country comes home for Friday evening dinner."', 'Even secular Tel Avivians keep this tradition; restaurants in Tel Aviv stay open but the city quiets noticeably.', null, [ACT.culture]),

    createContentItem('משימה: השוואת יום', 'mesima: hashva\'at yom', 'Roleplay a conversation with an Israeli classmate at Hebrew University. Compare your typical day. Use frequency adverbs, time, and sequencing.', 'conversation', '[Hebrew U cafeteria]\nישראלי: אז מה השעה אתה קם?\nאתה: [תשובה עם זמן]\nישראלי: וואי מוקדם! ואז מה אתה עושה?\nאתה: [תיאור 2-3 פעולות בסדר]\nישראלי: גם אני! אבל אני אף פעם לא אוכל ארוחת בוקר.\nאתה: [תגובה]\nישראלי: יאללה, בהצלחה היום!', 'Six-turn exchange covering wake time, morning routine, frequency, and farewell.', null, [ACT.task]),
  ],
};

module.exports = lesson;
