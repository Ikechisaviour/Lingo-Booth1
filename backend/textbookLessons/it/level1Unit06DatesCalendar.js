// Level 1 Unit 6 — Dates & Calendar (Italian)
// Functions: days of the week, months, dates, ordinals, scheduling expressions.

const createContentItem = (target, pronunciation, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization: pronunciation, nativeText: note, pronunciation,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'it-l1u6-orientation', pronunciation: 'it-l1u6-pronunciation',
  vocabularyDays: 'it-l1u6-vocab-days', vocabularyMonths: 'it-l1u6-vocab-months',
  grammarDates: 'it-l1u6-grammar-dates', grammarOrdinals: 'it-l1u6-grammar-ordinals',
  grammarTime: 'it-l1u6-grammar-time', reading: 'it-l1u6-reading',
  listening: 'it-l1u6-listening', writing: 'it-l1u6-writing', culture: 'it-l1u6-culture', task: 'it-l1u6-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Say any date in Italian — day, month, year — using the day-month-year order (giorno-mese-anno).', 'Use il + day for "on Monday/Tuesday" patterns.', 'Read ordinal numbers 1st-31st and know when ordinals are mandatory (only 1st of the month).'], task: 'Schedule a meeting, a birthday party, and an exam date all in Italian.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Day and month sound traps', goals: ['Distinguish martedì (Tuesday) vs mercoledì (Wednesday) — both final-stress with grave on -dì.', 'Apply gn /ɲ/ in giugno (June), gennaio (January with -nn-).'], task: 'Read each day and month with correct stress.' },
  { id: ACT.vocabularyDays, section: 'Vocabulary I', title: 'Days of the week', goals: ['Memorize 7 days: lunedì, martedì, mercoledì, giovedì, venerdì, sabato, domenica. Note: first 5 end in -dì with grave (final stress, "day"); sabato and domenica have antepenultimate stress.', 'Use lowercase for days unlike English; week starts on lunedì (Monday).'], task: 'Recite the week and produce 3 schedule sentences.' },
  { id: ACT.vocabularyMonths, section: 'Vocabulary II', title: 'Months of the year', goals: ['Memorize all 12 months: gennaio, febbraio, marzo, aprile, maggio, giugno, luglio, agosto, settembre, ottobre, novembre, dicembre. All lowercase.', 'Recognize ge-/gi- soft g, gn /ɲ/ in giugno, and geminates in geMMaio, agOsto, sETTembre.'], task: 'List the 4 seasons with their months.' },
  { id: ACT.grammarDates, section: 'Grammar I', title: 'Saying dates: il 15 marzo 2024', goals: ['Use the format: il + cardinal number + month + year. NO comma. The 1st of the month uses ORDINAL: il primo gennaio "January 1st"; all other days use CARDINAL: il due gennaio, il quindici marzo.', 'Read year as a full number: il 2024 = "il duemilaventiquattro" (one word, no hyphens).'], task: 'Write 5 important dates in Italian.' },
  { id: ACT.grammarOrdinals, section: 'Grammar II', title: 'Ordinal numbers 1st-31st', goals: ['Use primo, secondo, terzo, quarto, quinto, sesto, settimo, ottavo, nono, decimo.', 'From 11th up, add -esimo to the cardinal number (drop final vowel): undicesimo (11th), dodicesimo (12th), ventesimo (20th), trentunesimo (31st).', 'Use ordinals only for 1st of the month and for floor numbers (primo piano), kings/popes (Vittorio Emanuele II = "secondo"), and rankings.'], task: 'Build 5 ordinals: 1st floor, 2nd king, 3rd attempt, 21st-century, 1st of January.' },
  { id: ACT.grammarTime, section: 'Grammar III', title: 'Scheduling expressions', goals: ['Use il + day for habit: il lunedì studio "On Mondays I study" (=every Monday).', 'Use giorno without article for a single specific day: lunedì studio "this Monday I study" (specific).', 'Use prossimo/scorso for "next" and "last": la prossima settimana, lo scorso anno, il mese scorso.'], task: 'Schedule activities using all three patterns.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'Read a weekly schedule', goals: ['Read a UniBo student\'s week schedule with classes, work, and free time.'], task: 'Answer comprehension questions about days and times.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'Two friends plan a weekend', goals: ['Follow a dialogue planning a Friday-Saturday outing.'], task: 'Make your own plans in dialogue.' },
  { id: ACT.writing, section: 'Writing', title: 'Write your weekly schedule', goals: ['Write a 7-day schedule with days, times, and activities.'], task: 'Submit your real schedule in Italian.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Italian calendar customs', goals: ['Know the major holidays: 1 gennaio (Capodanno), 6 gennaio (Befana), Pasqua + Pasquetta (variable), 25 aprile (Liberation), 1 maggio (Worker\'s Day), 2 giugno (Republic), 15 agosto (Ferragosto), 1 novembre (All Saints), 8 dicembre (Immacolata), 25 dicembre (Natale), 26 dicembre (Santo Stefano).', 'Recognize "onomastico" — name day, often celebrated like a birthday.'], task: 'Identify three Italian holidays not in your home country.' },
  { id: ACT.task, section: 'Task', title: 'Schedule your week with a friend', goals: ['Combine days, dates, ordinals, and scheduling expressions in one continuous dialogue.'], task: 'Plan a 5-day study + leisure schedule with your tutor.' },
];

const lesson = {
  title: 'Level 1 · Unit 6: Date e calendario — Dates and Calendar',
  category: 'dates-calendar', difficulty: 'beginner',
  targetLang: 'it', nativeLang: 'en', track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'saying-date', label: 'Saying today\'s date', goal: 'Use Oggi è il + day + month + year correctly.' },
    { id: 'scheduling-day', label: 'Scheduling for a day', goal: 'Use il + day for habit, no article for specific.' },
    { id: 'reading-calendar', label: 'Reading a calendar', goal: 'Pronounce days and months with correct stress.' },
    { id: 'planning-future', label: 'Planning future events', goal: 'Use la prossima settimana, il mese prossimo to schedule ahead.' },
  ],
  relatedPools: ['topic-time', 'topic-calendar'],
  content: [
    createContentItem('Calendario italiano', 'ka-len-DA-rjo i-ta-LJA-no', 'The Italian calendar — week starts on lunedì (Monday), months and days lowercase. ISO format dd/mm/yyyy is standard (different from US mm/dd).', 'word', 'Oggi è il 15/03/2024 — il quindici marzo duemilaventiquattro.', 'European date convention; dd before mm.', null, [ACT.orientation]),
    createContentItem('Settimana e mese', 'la SET-ti-MA-na e il MEH-se', 'la settimana (week) — 7 days starting lunedì. il mese (month) — 12 named months. l\'anno (year) — uses "anni" for age and counting; "annate" for vintages.', 'word', 'Una settimana ha sette giorni. Un mese ha trenta o trentuno giorni.', 'Basic time-unit vocabulary.', null, [ACT.orientation]),
    createContentItem('Stagioni', 'sta-DJO-ni', 'Seasons: la primavera (spring, March-May), l\'estate (f.) (summer, June-Aug), l\'autunno (autumn, Sep-Nov), l\'inverno (winter, Dec-Feb). All feminine except autunno and inverno (masc.).', 'word', 'Bologna ha quattro stagioni distinte.', 'Reference for time/season.', null, [ACT.orientation]),

    createContentItem('martedì vs mercoledì', '/mar.teˈdi/, /mer.ko.leˈdi/', 'Both end in -dì with grave (final stress). martedì = Tuesday (Mars-day); mercoledì = Wednesday (Mercury-day). The -dì comes from Latin dies "day".', 'word', 'Lunedì e martedì lavoro; mercoledì studio.', 'Both final-stressed; the grave is mandatory.', null, [ACT.pronunciation]),
    createContentItem('giugno', '/ˈdʒuɲ.ɲo/', 'June. gn /ɲ/ palatal nasal. gi soft /dʒ/ before u. Penultimate stress.', 'word', 'A giugno faccio gli esami.', 'June = university exam season.', null, [ACT.pronunciation]),
    createContentItem('gennaio', '/dʒenˈnaː.jo/', 'January. Geminate nn. gi soft /dʒ/ before e. -aio /ajo/ diphthong.', 'word', 'A gennaio fa freddo a Bologna.', 'Cold winter month in northern Italy.', null, [ACT.pronunciation]),

    createContentItem('lunedì', '/lu.neˈdi/', 'Monday — first day of Italian week. Final-stress with grave: -dì.', 'word', 'Lunedì ho lezione alle nove.', 'Standard start-of-week.', null, [ACT.vocabularyDays]),
    createContentItem('martedì', '/mar.teˈdi/', 'Tuesday — Mars-day.', 'word', 'Martedì studio italiano.', 'Final-stress like all weekdays.', null, [ACT.vocabularyDays]),
    createContentItem('mercoledì', '/mer.ko.leˈdi/', 'Wednesday — Mercury-day.', 'word', 'Mercoledì mattina ho biologia.', 'Mid-week.', null, [ACT.vocabularyDays]),
    createContentItem('giovedì', '/dʒo.veˈdi/', 'Thursday — Jove (Jupiter)-day. gi /dʒ/.', 'word', 'Giovedì è la mia giornata libera.', 'Final-stress.', null, [ACT.vocabularyDays]),
    createContentItem('venerdì', '/ve.nerˈdi/', 'Friday — Venus-day.', 'word', 'Venerdì sera esco con gli amici.', 'Italian "weekend" effectively starts Friday evening.', null, [ACT.vocabularyDays]),
    createContentItem('sabato', '/ˈsaː.ba.to/', 'Saturday. Antepenultimate stress (sdrucciola): SA-ba-to. Note: NOT final-stress like the weekdays.', 'word', 'Il sabato dormo fino a tardi.', 'Stress shift from weekdays; sdrucciola.', null, [ACT.vocabularyDays]),
    createContentItem('domenica', '/doˈmeː.ni.ka/', 'Sunday. Antepenultimate stress (do-ME-ni-ca, but with stress on ME — actually penultimate "piana" piano: do-MEN-i-ca? Stress on MEN: do-MEN-i-ca). Final -a, feminine.', 'word', 'Domenica vado in chiesa.', 'Only feminine day name.', null, [ACT.vocabularyDays]),

    createContentItem('gennaio', '/dʒenˈnaː.jo/', 'January. Geminate nn; gi /dʒ/; -aio diphthong.', 'word', 'Il 1° gennaio è Capodanno.', 'First month; primo (ordinal) used for 1st.', null, [ACT.vocabularyMonths]),
    createContentItem('febbraio', '/febˈbraː.jo/', 'February. Geminate bb. 28 or 29 days (anno bisestile = leap year).', 'word', 'Febbraio ha 28 giorni, 29 negli anni bisestili.', 'Geminate bb feature.', null, [ACT.vocabularyMonths]),
    createContentItem('marzo', '/ˈmar.tso/', 'March. zi /ts/ voiceless affricate.', 'word', 'A marzo arriva la primavera.', 'Spring begins.', null, [ACT.vocabularyMonths]),
    createContentItem('aprile', '/aˈpriː.le/', 'April. Italian month names stay lowercase, and `aprile` is especially important because 25 April is a major civic holiday.', 'word', 'Il 25 aprile è la festa della Liberazione.', 'Liberation Day from fascism (1945) makes this month immediately useful in Italian calendar culture.', null, [ACT.vocabularyMonths]),
    createContentItem('maggio', '/ˈmad.dʒo/', 'May. Geminate gg /ddʒ/.', 'word', 'Il 1° maggio è la festa dei lavoratori.', 'Worker\'s Day.', null, [ACT.vocabularyMonths]),
    createContentItem('giugno', '/ˈdʒuɲ.ɲo/', 'June. gi /dʒ/ + gn /ɲ/.', 'word', 'A giugno finiscono le lezioni.', 'End of academic year.', null, [ACT.vocabularyMonths]),
    createContentItem('luglio', '/ˈluʎ.ʎo/', 'July. gli /ʎ/ palatal lateral.', 'word', 'Luglio è il mese più caldo.', 'gli palatal feature.', null, [ACT.vocabularyMonths]),
    createContentItem('agosto', '/aˈɡos.to/', 'August. Open o /ɔ/ in some pronunciations.', 'word', 'A Ferragosto, il 15 agosto, l\'Italia chiude.', 'Italy effectively shuts down for vacation in August.', null, [ACT.vocabularyMonths]),
    createContentItem('settembre', '/setˈtɛm.bre/', 'September. Geminate tt + open ɛ.', 'word', 'A settembre iniziano le lezioni.', 'Academic year begins.', null, [ACT.vocabularyMonths]),
    createContentItem('ottobre', '/otˈtoː.bre/', 'October. Geminate tt.', 'word', 'Ottobre è il mese del foliage.', 'Autumn colors.', null, [ACT.vocabularyMonths]),
    createContentItem('novembre', '/noˈvɛm.bre/', 'November. Open ɛ.', 'word', 'A novembre c\'è la festa di Tutti i Santi.', 'All Saints\' Day on 1 November.', null, [ACT.vocabularyMonths]),
    createContentItem('dicembre', '/diˈtʃɛm.bre/', 'December. Soft c /tʃ/; open ɛ.', 'word', 'Dicembre è il mese del Natale.', 'Christmas month.', null, [ACT.vocabularyMonths]),

    createContentItem('Il formato della data', 'date format day-month-year', 'Italian uses day-month-year order: il 15 marzo 2024 (NOT March 15, 2024). Use il + cardinal number + month + year. Year is read as one continuous number.', 'sentence', 'il 15 marzo 2024 → "il quindici marzo duemilaventiquattro"', 'European convention; key difference from US.', null, [ACT.grammarDates]),
    createContentItem('Il 1° è primo, gli altri cardinali', "1st = primo, all others = cardinal", 'CRITICAL RULE: The 1st of any month uses the ORDINAL primo: il primo gennaio. ALL OTHER DAYS use CARDINAL numbers: il due gennaio, il quindici marzo, il trentun dicembre. This is the only ordinal use for dates.', 'sentence', 'il primo gennaio (1st of January, ordinal) · il due gennaio (2nd of January, cardinal)', 'Only 1st uses ordinal; very strict rule.', null, [ACT.grammarDates]),
    createContentItem('Leggere l\'anno', "reading the year", 'Italian reads years as ONE NUMBER, not in pairs: 2024 = duemilaventiquattro, not "venti-ventiquattro". 1995 = millenovecentonovantacinque (mille + nove + cento + novanta + cinque).', 'sentence', '1995 = millenovecentonovantacinque · 2024 = duemilaventiquattro', 'Year as a single number — very different from English.', null, [ACT.grammarDates]),
    createContentItem('Quanti ne abbiamo oggi?', "what's the date today?", 'Standard date question: "Quanti ne abbiamo oggi?" (literally "how many of them do we have today?") or "Che giorno è oggi?". Answer: ne abbiamo quindici, è il quindici marzo.', 'sentence', '— Quanti ne abbiamo oggi? — Ne abbiamo quindici.', 'Idiomatic question; use ne pronoun in the answer.', null, [ACT.grammarDates]),

    createContentItem('Ordinali 1°-10°', "ordinals 1st-10th", 'primo, secondo, terzo, quarto, quinto, sesto, settimo, ottavo, nono, decimo. These are the irregular forms; learn them by heart. Each agrees with its noun in gender and number: il primo piano, la prima volta.', 'sentence', '1° primo, 2° secondo, 3° terzo, 4° quarto, 5° quinto, 6° sesto, 7° settimo, 8° ottavo, 9° nono, 10° decimo', 'First ten ordinals are irregular.', null, [ACT.grammarOrdinals]),
    createContentItem('Ordinali 11°+', "ordinals 11th and above", 'From 11th up: drop the final vowel of the cardinal and add -esimo. undicesimo (11th), dodicesimo, ventesimo (20th), trentunesimo (31st), centesimo (100th). Same gender agreement applies.', 'sentence', '11° undicesimo, 20° ventesimo, 31° trentunesimo, 100° centesimo', 'Predictable pattern from 11th onward.', null, [ACT.grammarOrdinals]),
    createContentItem('Usi degli ordinali', "uses of ordinals", 'Ordinals are used for: 1st of month (primo gennaio), floors (il primo piano), centuries (il ventunesimo secolo), kings/popes (Vittorio Emanuele II "secondo"), rankings (sono il terzo della classe). They DO NOT replace cardinals for counting.', 'sentence', 'Abito al terzo piano. Il ventunesimo secolo. Papa Giovanni XXIII (ventitreesimo).', 'Distinct from cardinal use; ordinals are for ranking and 1st-of-month only.', null, [ACT.grammarOrdinals]),

    createContentItem('il lunedì — habitual', "il + day — every Monday", 'Using il/la + day means "every [day]" — the habitual pattern. il lunedì studio = "I study on Mondays" (every Monday). la domenica (with article and lowercase) = "on Sundays".', 'sentence', 'Il lunedì studio. (every Monday) vs Lunedì studio. (this Monday, specific)', 'Article = habit; no article = specific.', null, [ACT.grammarTime]),
    createContentItem('giorno specifico', "specific day — no article", 'No article + day = this specific [day]. Lunedì studio = "I study on Monday (this Monday)". Use without article for upcoming specific occurrences.', 'sentence', 'Lunedì ho un esame. (this coming Monday)', 'Specific upcoming day.', null, [ACT.grammarTime]),
    createContentItem('prossimo / scorso', "next / last", 'prossimo (next), scorso (last) — adjectives that follow the noun: la settimana prossima, l\'anno scorso, il mese scorso. They agree with the noun in gender/number.', 'sentence', 'La settimana prossima ho l\'esame. L\'anno scorso ero a Roma.', 'Future and past time markers.', null, [ACT.grammarTime]),
    createContentItem('tra / fra + tempo', "in + time period (future)", 'tra / fra + time period for future events: tra due settimane "in two weeks", fra un mese "in a month".', 'sentence', 'Tra una settimana parto per Milano.', '"In a week I leave for Milan".', null, [ACT.grammarTime]),

    createContentItem('Orario settimanale', "weekly schedule (reading)", '7-day schedule of a UniBo student.', 'sentence', 'Lunedì: lezione di letteratura alle 9, biblioteca dalle 14 alle 18.\nMartedì: latino alle 10, mensa, pomeriggio libero.\nMercoledì: linguistica alle 11, biblioteca alle 15.\nGiovedì: storia alle 9, lavoro al bar dalle 16.\nVenerdì: filosofia alle 10, weekend libero!\nSabato: dormire, mercato in centro, cinema la sera.\nDomenica: pranzo dai nonni, riposo.', 'Realistic UniBo schedule.', null, [ACT.reading]),
    createContentItem('Domande sull\'orario', "schedule comprehension questions", 'Five comprehension questions that make the learner retrieve weekday routines, frequency, free time, and leisure plans from the schedule passage.', 'sentence', 'D1: Cosa fa Anna il lunedì alle 9? D2: Quanti giorni lavora? D3: Quando ha il pomeriggio libero? D4: Cosa fa la domenica? D5: Quando va al cinema?', 'Answer using days and times so the reading exercise also rehearses `quando`, weekday names, and clock expressions.', null, [ACT.reading]),

    createContentItem('Pianificare il weekend', "planning the weekend dialogue", 'Two friends plan Friday-Saturday.', 'conversation', 'Marco: Cosa fai venerdì sera?\nAnna: Venerdì ho lezione fino alle 18, poi sono libera.\nMarco: Andiamo a cena fuori? C\'è un ristorante nuovo in Via Zamboni.\nAnna: Volentieri! A che ora?\nMarco: Alle 21? E sabato cosa fai?\nAnna: Sabato mattina dormo, ma il pomeriggio sono libera.\nMarco: Andiamo al cinema sabato pomeriggio?\nAnna: Perfetto! Ci vediamo venerdì alle 21.', 'Scheduling dialogue.', null, [ACT.listening]),

    createContentItem('Il tuo orario settimanale', "your weekly schedule (writing)", 'Template for a 7-day schedule.', 'sentence', 'Esempio: Lunedì alle 9 ho italiano. Martedì lavoro dalle 14 alle 18. Mercoledì sera vado in palestra. Giovedì mattina ho latino. Venerdì sera esco con gli amici. Sabato dormo fino alle 10. Domenica pranzo dai miei.', 'Substitute your own activities.', null, [ACT.writing]),

    createContentItem('Feste italiane principali', "main Italian holidays", 'The major public holidays: 1 gennaio (Capodanno), 6 gennaio (Epifania/Befana), Pasqua (Easter Sunday + Monday Pasquetta), 25 aprile (Liberazione), 1 maggio (Festa dei Lavoratori), 2 giugno (Festa della Repubblica), 15 agosto (Ferragosto — Assumption), 1 novembre (Ognissanti), 8 dicembre (Immacolata), 25 dicembre (Natale), 26 dicembre (Santo Stefano).', 'sentence', 'Il 25 dicembre è Natale; il 26 dicembre è Santo Stefano. Tutti i negozi sono chiusi.', 'Memorize at least the dates without dates fixed (Pasqua moves).', null, [ACT.culture]),
    createContentItem('Onomastico', "name day — onomastico", 'Italian Catholics celebrate the day of the saint they\'re named after, sometimes more than their birthday. Onomastico = your name day. Calendars list which saint corresponds to which day.', 'sentence', 'Il 13 giugno è il mio onomastico — sono nato Antonio.', 'A unique Italian birthday-like custom.', null, [ACT.culture]),
    createContentItem('Ferragosto', "Ferragosto — August 15", 'Italy\'s peak vacation day. Originally Roman emperor Augustus\'s "Feriae Augusti" festival; Christianized as Assumption Day. Almost all Italians take vacation around Ferragosto. Many businesses close 2-3 weeks in August.', 'sentence', 'Per Ferragosto la mia famiglia va al mare.', 'Defining feature of Italian summer.', null, [ACT.culture]),

    createContentItem('Compito: pianificare la settimana', "task: plan the week", '7-day planning dialogue with friend; use days, times, prossimo/scorso, and habit vs specific patterns.', 'conversation', 'Amico: Cosa fai questa settimana?\nTu: [3 days of plans with specific times]\nAmico: Hai tempo il weekend?\nTu: [weekend plan with prossimo/scorso reference]\nAmico: E la settimana prossima?\nTu: [future plan with tra/fra]', 'Full integration.', null, [ACT.task]),
    createContentItem('Sfida — descrivere il tuo anno', "stretch — describe your year", 'Stretch: describe each month of your typical year with one activity each.', 'sentence', 'Esempio: A gennaio ho gli esami. A febbraio festeggio Carnevale. A marzo arriva la primavera. A maggio finiscono le lezioni. A giugno parto in vacanza. Ad agosto vado al mare. A settembre torno all\'università.', 'Full month vocabulary use.', null, [ACT.task]),
  ],
};

module.exports = lesson;
