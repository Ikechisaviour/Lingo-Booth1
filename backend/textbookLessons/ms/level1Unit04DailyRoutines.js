// Level 1 Unit 4 — Daily Routines (Bahasa Melayu)
// Functions: time of day, daily-routine verbs, telling time, frequency adverbs.
// Anchored in a UM student's weekday and a working professional's day in KL.

const createContentItem = (
  target, pinyin, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = [],
) => ({
  type, activityIds, targetText: target, romanization: pinyin, nativeText: note, pronunciation: pinyin,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ms-l1u4-orientation',
  pronunciation: 'ms-l1u4-pronunciation',
  vocabularyTimeOfDay: 'ms-l1u4-vocab-time-of-day',
  vocabularyRoutineVerbs: 'ms-l1u4-vocab-routine-verbs',
  grammarTellingTime: 'ms-l1u4-grammar-telling-time',
  grammarFrequency: 'ms-l1u4-grammar-frequency',
  grammarSequence: 'ms-l1u4-grammar-sequence',
  reading: 'ms-l1u4-reading',
  listening: 'ms-l1u4-listening',
  writing: 'ms-l1u4-writing',
  culture: 'ms-l1u4-culture',
  task: 'ms-l1u4-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Tell the time in BM with "jam berapa" and use the 24-hour and 12-hour formats.', 'Describe your daily routine with 15 verbs across morning/afternoon/evening/night.', 'Use frequency adverbs (selalu, biasanya, kadang-kadang, jarang, tidak pernah) to compare habits.'], task: 'Picture a typical weekday at UM. By the end of this lesson you should narrate your day from 6 AM to midnight in BM.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Time-words and verbs', goals: ['Pronounce "pagi" /pa.gi/, "tengah hari" /tə.ŋah ha.ri/, "petang" /pə.taŋ/, "malam" /ma.lam/ — the four parts of the Malaysian day.', 'Distinguish "bangun" /ba.ŋun/ (wake up) from "bangun pagi" (get up in the morning) — same verb, fuller phrase.'], task: 'Read each time word and verb aloud.' },
  { id: ACT.vocabularyTimeOfDay, section: 'Vocabulary I', title: 'Time of day & clock', goals: ['Name the four parts of the day: pagi, tengah hari, petang, malam.', 'Tell the time using "pukul" (hour-marker) and "minit" (minutes).'], task: 'State the current time and three other times.' },
  { id: ACT.vocabularyRoutineVerbs, section: 'Vocabulary II', title: 'Daily routine verbs', goals: ['Memorize 15 daily verbs: bangun, mandi, gosok gigi, sarapan, pergi kelas, balik, tidur.', 'Note the ber- prefix on many routine verbs: bersiap, berkemas, bersarapan.'], task: 'Order the verbs into a typical day.' },
  { id: ACT.grammarTellingTime, section: 'Grammar I', title: 'pukul + number — telling time', goals: ['Use PUKUL (literally "to strike") to mean "o\'clock": "pukul lima" = 5 o\'clock. Specify AM/PM with pagi/petang/malam.', 'For half hours: "pukul lima setengah" = 5:30. For minutes: "pukul lima sepuluh minit".'], task: 'Tell five different times across the day.' },
  { id: ACT.grammarFrequency, section: 'Grammar II', title: 'Frequency adverbs', goals: ['Place frequency adverbs BEFORE the verb: SELALU (always), BIASANYA (usually), KADANG-KADANG (sometimes), JARANG (rarely), TIDAK PERNAH (never).'], task: 'Compare your habits using all five frequency adverbs.' },
  { id: ACT.grammarSequence, section: 'Grammar III', title: 'Sequence connectors — kemudian, selepas itu, akhirnya', goals: ['String actions in sequence: PERTAMA (first), KEMUDIAN (then), SELEPAS ITU (after that), AKHIRNYA (finally).'], task: 'Narrate four sequential actions.' },
  { id: ACT.reading, section: 'Reading', title: 'A UM student\'s diary entry', goals: ['Read a 100-word diary entry from a Year 2 UM student.', 'Identify the times, verbs, and frequency markers.'], task: 'Read and answer.' },
  { id: ACT.listening, section: 'Listening', title: 'Two friends comparing routines', goals: ['Follow a dialogue between a Sabahan and a KL native comparing their daily routines.'], task: 'Perform the dialogue.' },
  { id: ACT.writing, section: 'Writing', title: 'Write your own daily routine', goals: ['Write 6-8 sentences narrating a typical day with times and verbs.'], task: 'Write and read aloud.' },
  { id: ACT.culture, section: 'Culture', title: 'Mamak culture and the Malaysian late night', goals: ['Understand that mamak (Indian-Muslim 24-hour eateries) are central to Malaysian late-night social life.', 'Recognize that Malaysian Muslims fast (puasa) during Ramadan — daily routine shifts dramatically with sahur (pre-dawn meal) and iftar/berbuka puasa (sunset breaking).', 'Recognize Five daily Muslim prayer times (Subuh, Zuhur, Asar, Maghrib, Isyak) structure many Malaysians\' day.'], task: 'Map prayer times to clock times.' },
  { id: ACT.task, section: 'Task', title: 'Narrate your day', goals: ['Roleplay describing your full day to a curious Malaysian classmate.'], task: 'Roleplay 6-turn exchange.' },
];

const lesson = {
  title: 'Level 1 · Unit 4: Rutin Harian — Daily Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'ms',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'telling-time', label: 'Telling the time', goal: 'State any clock time using "pukul" + numbers.' },
    { id: 'describing-routine', label: 'Describing your day', goal: 'String 6+ daily activities in sequence.' },
    { id: 'comparing-habits', label: 'Comparing habits', goal: 'Use selalu / biasanya / kadang-kadang / jarang to compare.' },
  ],
  relatedPools: ['topic-daily-life', 'topic-time'],
  content: [
    createContentItem('rutin harian', 'ru.tin ha.ri.an', 'DAILY ROUTINE — "rutin" (English loan) + "harian" (from "hari" + -an = daily).', 'word', 'Rutin harian saya bermula pukul 6 pagi.', '"My daily routine starts at 6 AM".', null, [ACT.orientation]),
    createContentItem('hari biasa vs hujung minggu', 'ha.ri bi.a.sa vs hu.dʒuŋ miŋ.gu', 'WEEKDAY vs WEEKEND — "hari biasa" (literal "ordinary day") = weekday; "hujung minggu" (literal "end of week") = weekend.', 'word', 'Rutin saya berbeza pada hujung minggu.', '"My routine differs on the weekend".', null, [ACT.orientation]),

    // Pronunciation
    createContentItem('pagi', 'pa.gi', 'MORNING — sunrise to ~noon. Two clean /a/ vowels, soft /g/.', 'word', 'Pagi-pagi sudah panas.', '"Already hot in the early morning" — note reduplication "pagi-pagi" = "early morning".', null, [ACT.pronunciation]),
    createContentItem('tengah hari', 'tə.ŋah ha.ri', 'MIDDAY / NOON — schwa in te-, /ŋ/ digraph, two /a/ in hari.', 'word', 'Tengah hari saya makan di kantin UM.', '"At noon I eat at the UM canteen".', null, [ACT.pronunciation]),
    createContentItem('petang', 'pə.taŋ', 'LATE AFTERNOON — schwa + /taŋ/. Roughly 3 PM to maghrib.', 'word', 'Petang ini saya ada tutorial.', '"This afternoon I have a tutorial".', null, [ACT.pronunciation]),
    createContentItem('malam', 'ma.lam', 'NIGHT / EVENING — sunset onwards. Two clean /a/ vowels.', 'word', 'Malam ini saya akan tidur awal.', '"Tonight I will sleep early".', null, [ACT.pronunciation]),
    createContentItem('bangun', 'ba.ŋun', 'WAKE UP / GET UP. /ŋ/ digraph. Used standalone or in "bangun pagi" / "bangun tidur".', 'word', 'Saya bangun pukul enam pagi.', '"I wake up at 6 AM".', null, [ACT.pronunciation]),

    // Time of day vocabulary
    createContentItem('pagi', 'pa.gi', 'MORNING. Roughly 5 AM to noon. "Selamat pagi" greeting works in this range.', 'word', 'Saya minum kopi pada waktu pagi.', '"I drink coffee in the morning".', null, [ACT.vocabularyTimeOfDay]),
    createContentItem('tengah hari', 'tə.ŋah ha.ri', 'NOON / MIDDAY. Roughly 12-3 PM. The hottest part of the Malaysian day; many shops slow down.', 'word', 'Tengah hari yang panas.', '"A hot midday".', null, [ACT.vocabularyTimeOfDay]),
    createContentItem('petang', 'pə.taŋ', 'LATE AFTERNOON. Roughly 3 PM to maghrib (sunset, ~7 PM in Malaysia year-round).', 'word', 'Petang ini ada hujan.', '"This afternoon there\'s rain" — common Malaysian weather.', null, [ACT.vocabularyTimeOfDay]),
    createContentItem('malam', 'ma.lam', 'NIGHT / EVENING. After sunset. Note that BM "malam" covers both English "evening" and "night".', 'word', 'Malam ini ada konsert di Stadium Bukit Jalil.', '"Tonight there\'s a concert at Bukit Jalil Stadium".', null, [ACT.vocabularyTimeOfDay]),
    createContentItem('tengah malam', 'tə.ŋah ma.lam', 'MIDNIGHT. "Tengah" (middle) + "malam" (night). Distinct from late-night ("lewat malam").', 'word', 'Tengah malam saya masih belajar.', '"At midnight I am still studying" — typical exam-week situation.', null, [ACT.vocabularyTimeOfDay]),
    createContentItem('pukul', 'pu.kul', '"O\'CLOCK" — the time marker placed before the hour number. Literally "to strike". "Pukul lima" = 5 o\'clock.', 'word', 'Pukul berapa sekarang?', '"What time is it now?".', null, [ACT.vocabularyTimeOfDay]),
    createContentItem('minit', 'mi.nit', 'MINUTE. From English. "Sepuluh minit" = ten minutes.', 'word', 'Tunggu sepuluh minit.', '"Wait ten minutes".', null, [ACT.vocabularyTimeOfDay]),
    createContentItem('jam', 'dʒam', 'HOUR / CLOCK. "Dua jam" = two hours; "jam dinding" = wall clock; "jam berapa" = what time.', 'word', 'Saya belajar tiga jam setiap petang.', '"I study three hours every afternoon".', null, [ACT.vocabularyTimeOfDay]),
    createContentItem('setengah', 'sə.tə.ŋah', 'HALF. Used for half-hour: "pukul lima setengah" = 5:30.', 'word', 'Pukul tujuh setengah pagi.', '"7:30 AM".', null, [ACT.vocabularyTimeOfDay]),
    createContentItem('suku', 'su.ku', 'QUARTER. Used for quarter-hour: "pukul lima suku" = 5:15.', 'word', 'Pukul tiga suku petang.', '"3:15 PM".', null, [ACT.vocabularyTimeOfDay]),

    // Routine verbs
    createContentItem('bangun', 'ba.ŋun', 'WAKE UP / GET UP. The first verb of any daily routine.', 'word', 'Saya bangun pukul 6 pagi.', '"I wake up at 6 AM".', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('mandi', 'man.di', 'BATHE / SHOWER. Malaysians shower often (sometimes 2-3 times daily) due to the climate.', 'word', 'Saya mandi dua kali sehari.', '"I shower twice a day" — typical Malaysian frequency.', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('gosok gigi', 'go.soʔ gi.gi', 'BRUSH TEETH. "Gosok" = scrub/rub; "gigi" = tooth/teeth.', 'word', 'Selepas bangun saya gosok gigi.', '"After waking up I brush my teeth".', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('sarapan / bersarapan', 'sa.ra.pan / bər.sa.ra.pan', 'BREAKFAST. Standalone noun "sarapan" or verb "bersarapan" (with ber- prefix).', 'word', 'Saya bersarapan dengan nasi lemak.', '"I have breakfast with nasi lemak" — the national dish.', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('makan tengah hari', 'ma.kan tə.ŋah ha.ri', 'LUNCH (literal "eat midday").', 'word', 'Makan tengah hari saya di kantin UM.', '"I have lunch at the UM canteen".', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('makan malam', 'ma.kan ma.lam', 'DINNER (literal "eat night").', 'word', 'Makan malam dengan keluarga.', '"Dinner with the family".', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('pergi kelas / pergi kerja', 'pər.gi kə.las / pər.gi kər.dʒa', 'GO TO CLASS / GO TO WORK.', 'word', 'Saya pergi kelas dengan LRT.', '"I go to class by LRT".', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('belajar', 'bə.la.dʒar', 'STUDY / LEARN. The stress falls on JAR because the penultimate is schwa.', 'word', 'Saya belajar di perpustakaan.', '"I study at the library".', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('balik', 'ba.liʔ', 'RETURN / GO BACK. "Balik rumah" = go home; "balik kampung" = return to the village (a major Malaysian cultural act during Hari Raya).', 'word', 'Saya balik rumah pukul 6 petang.', '"I return home at 6 PM".', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('tidur', 'ti.dur', 'SLEEP. "Tidur awal" = sleep early; "tidur lewat" = sleep late.', 'word', 'Saya tidur pukul sebelas malam.', '"I sleep at 11 PM".', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('bersiap', 'bər.si.ap', 'GET READY / PREPARE ONESELF. ber- + siap (ready).', 'word', 'Saya bersiap untuk pergi kerja.', '"I get ready to go to work".', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('memasak', 'mə.ma.saʔ', 'COOK. me- + masak. Many Malaysians cook for the family AND eat out frequently.', 'word', 'Ibu memasak nasi lemak.', '"Mother cooks nasi lemak".', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('membaca', 'məm.ba.tʃa', 'READ. me- + baca. The /m/ assimilates to the initial /b/.', 'word', 'Saya membaca berita pada waktu pagi.', '"I read the news in the morning".', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('menonton', 'mə.non.ton', 'WATCH (TV, movie). me- + tonton.', 'word', 'Selepas makan malam saya menonton TV.', '"After dinner I watch TV".', null, [ACT.vocabularyRoutineVerbs]),
    createContentItem('bersembahyang / solat', 'bər.səm.bah.jaŋ / so.lat', 'PRAY (Muslim). "Solat" is the Arabic-origin Islamic prayer; "bersembahyang" is the native BM term used by all religions.', 'word', 'Umat Islam solat lima kali sehari.', '"Muslims pray five times a day".', null, [ACT.vocabularyRoutineVerbs]),

    // Grammar — telling time
    createContentItem('pukul + number', 'pu.kul + number', 'Time-telling formula: PUKUL + hour number. "Pukul lima" = 5:00. Add "pagi/petang/malam" to specify AM/PM.', 'sentence', 'Pukul tujuh pagi. Pukul tiga petang. Pukul sembilan malam.', '"7 AM. 3 PM. 9 PM." — three time examples spanning the day.', [
      { target: 'Pukul + number', note: 'the hour' },
      { target: '+ pagi/petang/malam', note: 'specify the time of day' },
    ], [ACT.grammarTellingTime]),
    createContentItem('setengah / suku for half/quarter', 'sə.tə.ŋah / su.ku', 'For half-past: "pukul X setengah" (5:30 = pukul lima setengah). For quarter-past: "pukul X suku" (5:15). For minutes: "pukul X Y minit".', 'sentence', 'Pukul lima setengah. Pukul lima suku. Pukul lima sepuluh minit.', '5:30, 5:15, 5:10 — three increments.', null, [ACT.grammarTellingTime]),
    createContentItem('24-hour vs 12-hour', '24-jam vs 12-jam', 'Modern MY official schedules use 24-hour ("pukul 1800" = 6 PM). Casual speech uses 12-hour with pagi/petang/malam. Both are correct, register-dependent.', 'sentence', 'Mesyuarat pukul 1500 (formal) / pukul tiga petang (casual).', '"Meeting at 3 PM" — two registers, same time.', null, [ACT.grammarTellingTime]),

    // Frequency adverbs
    createContentItem('selalu', 'sə.la.lu', 'ALWAYS. Place before the verb: "Saya SELALU bersarapan" = "I always have breakfast".', 'sentence', 'Saya selalu makan nasi lemak hari Sabtu.', '"I always eat nasi lemak on Saturday".', null, [ACT.grammarFrequency]),
    createContentItem('biasanya', 'bi.a.sa.ɲa', 'USUALLY. From "biasa" (usual) + -nya suffix.', 'sentence', 'Biasanya saya tidur pukul sebelas.', '"Usually I sleep at 11".', null, [ACT.grammarFrequency]),
    createContentItem('kadang-kadang / kadangkala', 'ka.daŋ ka.daŋ / ka.daŋ.ka.la', 'SOMETIMES. Reduplicated form "kadang-kadang" is everyday; "kadangkala" is formal/written.', 'sentence', 'Kadang-kadang saya pergi pasar malam.', '"Sometimes I go to the night market".', null, [ACT.grammarFrequency]),
    createContentItem('jarang', 'dʒa.raŋ', 'RARELY / SELDOM.', 'sentence', 'Saya jarang menonton TV.', '"I rarely watch TV".', null, [ACT.grammarFrequency]),
    createContentItem('tidak pernah', 'ti.daʔ pər.nah', 'NEVER. Literally "not ever".', 'sentence', 'Saya tidak pernah ke Sabah.', '"I have never been to Sabah".', null, [ACT.grammarFrequency]),

    // Sequence
    createContentItem('pertama / kemudian / selepas itu / akhirnya', 'pər.ta.ma / kə.mu.di.an / sə.lə.pas i.tu / a.kir.ɲa', 'Sequence connectors: PERTAMA (first), KEMUDIAN (then), SELEPAS ITU (after that), AKHIRNYA (finally).', 'sentence', 'Pertama saya bangun, kemudian mandi, selepas itu sarapan, akhirnya pergi kelas.', '"First I wake up, then shower, after that breakfast, finally go to class".', null, [ACT.grammarSequence]),
    createContentItem('sebelum / selepas', 'sə.bə.lum / sə.lə.pas', 'BEFORE / AFTER. "Sebelum tidur" = before sleep; "selepas makan" = after eating.', 'sentence', 'Sebelum tidur saya membaca. Selepas makan saya minum teh.', '"Before sleep I read. After eating I drink tea".', null, [ACT.grammarSequence]),

    // Reading
    createContentItem('Diari Sarah, pelajar UM', 'di.a.ri sa.rah, pə.la.dʒar u.em', 'A diary entry from Sarah, a Year 2 UM student.', 'sentence', 'Hari ini hari Isnin. Saya bangun pukul 6 pagi, gosok gigi, dan mandi. Pukul 7 saya bersarapan dengan roti dan kopi. Selepas itu saya naik bas ke kampus. Kuliah pertama saya pukul 9 — Algoritma. Pukul 12 tengah hari saya makan di kantin dengan kawan saya, Kumar. Petang ini saya ada tutorial Pengaturcaraan. Malam saya akan belajar di Perpustakaan Utama sampai pukul 10, kemudian balik asrama dan tidur.', 'A complete diary entry covering morning to night.', [
      { target: 'kuliah', note: 'lecture' },
      { target: 'Algoritma', note: 'Algorithms course' },
      { target: 'Pengaturcaraan', note: 'Programming' },
      { target: 'asrama', note: 'dormitory' },
    ], [ACT.reading]),
    createContentItem('Soalan kefahaman', 'so.a.lan kə.fa.ha.man', 'Four reading questions about Sarah\'s day.', 'sentence', 'Q1: Pukul berapa Sarah bangun? Q2: Apa dia makan untuk sarapan? Q3: Pukul berapa kuliah pertama? Q4: Apa dia buat selepas kuliah?', 'Standard reading comp.', null, [ACT.reading]),

    // Listening
    createContentItem('Dialog: rutin di KL vs Sabah', 'di.a.log: ru.tin di kel vs sa.bah', 'Dialogue between a KL native and a Sabahan classmate comparing routines.', 'sentence', 'Aiman: Maria, awak bangun pukul berapa di Kota Kinabalu?\nMaria: Saya selalu bangun pukul 6 pagi, sebab matahari naik awal di Sabah.\nAiman: Wah, awal! Saya biasanya bangun pukul 7.\nMaria: Awak makan apa untuk sarapan?\nAiman: Saya makan roti canai di kedai mamak. Awak?\nMaria: Di Sabah saya makan nasi kuning atau hinava.', '6-turn dialogue comparing KL Malay-Malaysian and Sabah indigenous breakfast habits.', [
      { target: 'sebab', note: 'because' },
      { target: 'matahari naik', note: 'sunrise (literal "sun rises")' },
      { target: 'roti canai', note: 'Indian-Malaysian flatbread, eaten at mamak shops' },
      { target: 'nasi kuning', note: 'yellow rice — Sabahan breakfast' },
      { target: 'hinava', note: 'Kadazan ceviche-like fish dish — distinctly Sabahan' },
    ], [ACT.listening]),

    // Writing
    createContentItem('Tulis rutin awak', 'tu.lis ru.tin a.waʔ', '6-8 sentence template for daily routine.', 'sentence', 'Template: Saya bangun pukul ___. Selepas itu saya ___ dan ___. Pukul ___ saya ___. Tengah hari saya makan ___. Petang ___. Malam saya ___. Saya tidur pukul ___.', 'Use frequency adverbs and sequence connectors.', null, [ACT.writing]),

    // Culture
    createContentItem('Mamak — peletak rutin', 'ma.maʔ — pə.lə.tak ru.tin', 'Mamak shops are 24-hour Indian-Muslim eateries — a Malaysian institution. They serve teh tarik, roti canai, nasi kandar, and host football-watching, late-night conversation, and lepak (hanging out).', 'sentence', 'Mamak ialah tempat pertemuan rentas etnik.', '"The mamak is a cross-ethnic meeting place".', null, [ACT.culture]),
    createContentItem('Lima waktu solat', 'li.ma wak.tu so.lat', 'Five daily Muslim prayer times shape many Malaysians\' day: SUBUH (dawn, ~5:45 AM), ZUHUR (noon, ~1 PM), ASAR (mid-afternoon, ~4 PM), MAGHRIB (sunset, ~7 PM), ISYAK (night, ~8 PM). Schools, offices, and TV channels announce azan (call to prayer).', 'sentence', 'Azan Subuh berkumandang dari masjid.', '"The dawn call to prayer resounds from the mosque".', null, [ACT.culture]),
    createContentItem('Bulan Ramadan dan rutin baru', 'bu.lan ra.ma.dan dan ru.tin ba.ru', 'During Ramadan, Muslims fast from Subuh (dawn) to Maghrib (sunset). The daily routine shifts: SAHUR (pre-dawn meal at 4-5 AM), no food/drink until BERBUKA PUASA / IFTAR (sunset breaking, ~7 PM). Schools and offices end early; pasar Ramadan (Ramadan bazaars) open every afternoon.', 'sentence', 'Pada bulan Ramadan, rutin saya berubah sepenuhnya.', '"During Ramadan my routine changes completely".', null, [ACT.culture]),

    // Task
    createContentItem('Tugasan: cerita hari awak', 'tu.ga.san: tʃə.ri.ta ha.ri a.waʔ', 'Roleplay narrating your full day to a curious Malaysian classmate.', 'sentence', 'Scene: Awak duduk di kantin UM. Kawan baru tanya: "Apa rutin harian awak?"', 'Use times, verbs, frequency adverbs.', null, [ACT.task]),
  ],
};

module.exports = lesson;
