// Level 1 Unit 6 — Dates & Calendar (Modern Hebrew)
// Functions: days, months, dates, ordinals, the Hebrew vs Gregorian calendar.

const createContentItem = (target, translit, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization: translit, nativeText: note, pronunciation: translit,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'he-l1u6-orientation', pronunciation: 'he-l1u6-pronunciation',
  vocabDays: 'he-l1u6-vocab-days', vocabMonths: 'he-l1u6-vocab-months', vocabSeasons: 'he-l1u6-vocab-seasons',
  grammarOrdinals: 'he-l1u6-grammar-ordinals', grammarDates: 'he-l1u6-grammar-dates',
  reading: 'he-l1u6-reading', listening: 'he-l1u6-listening', writing: 'he-l1u6-writing',
  culture: 'he-l1u6-culture', task: 'he-l1u6-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Name the 7 days of the week using ordinal numbers (yom rishon = "first day").', 'Name the 12 Gregorian months and the 12 Hebrew months.', 'Express dates: today, tomorrow, on Tuesday, in November, in 2026.'], task: 'Set up appointments, talk about holidays, and explain your travel dates.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Stress on ordinal numbers', goals: ['Apply mil\'ra stress on most ordinal numbers: rishON, shenI, shlishI, revi\'I.', 'Distinguish gender ordinals: rishon (m) vs rishona (f).', 'Apply chet correctly in chamishi (5th) and chol ha-mo\'ed.'], task: 'Pronounce 1st-10th in both genders.' },
  { id: ACT.vocabDays, section: 'Vocabulary I', title: 'Days of the week', goals: ['Name all 7 days: yom rishon (Sun), yom sheni (Mon), yom shlishi (Tue), yom revi\'i (Wed), yom chamishi (Thu), yom shishi (Fri), shabbat (Sat).', 'Use the prefix ב- for "on day X": be-yom sheni (on Monday).', 'Recognize that the Israeli workweek is Sun-Thu, Friday half-day.'], task: 'Say what you do on each day of the week.' },
  { id: ACT.vocabMonths, section: 'Vocabulary II', title: 'Months', goals: ['Memorize the 12 Gregorian months (Yanuar, Februar, ... Detzember).', 'Recognize the 12 Hebrew months (Tishrei, Cheshvan, Kislev, Tevet, Shevat, Adar, Nisan, Iyar, Sivan, Tammuz, Av, Elul).', 'Know that the Hebrew year begins in Tishrei (Rosh Hashanah, September/October).'], task: 'Say what month each major Israeli holiday falls in.' },
  { id: ACT.vocabSeasons, section: 'Vocabulary III', title: 'Seasons', goals: ['Name the 4 seasons: aviv (spring), kayitz (summer), stav (autumn), choref (winter).', 'Describe seasonal weather in Israel (mild winters, hot summers).'], task: 'Describe your favorite season and why.' },
  { id: ACT.grammarOrdinals, section: 'Grammar I', title: 'Ordinal numbers 1st-10th', goals: ['Use ordinal numbers: rishon, sheni, shlishi, revi\'i, chamishi, shishi, shvi\'i, shmini, tshi\'i, asiri.', 'Apply gender agreement: rishon (m) / rishona (f) etc.', 'Place ordinals AFTER the noun: ha-yom ha-rishon (the first day).'], task: 'Order 5 events using ordinal numbers (first, second, ...).' },
  { id: ACT.grammarDates, section: 'Grammar II', title: 'Expressing dates', goals: ['Say a date: ha-yom 5 be-Yanuar 2026 (today is January 5, 2026).', 'Use prepositions: בעוד (be-od, in [time]), לפני (lifnei, before), אחרי (acharei, after).', 'Express "today, yesterday, tomorrow": ha-yom, etmol, machar.'], task: 'Give 6 future/past dates in Hebrew.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'A school year calendar', goals: ['Read the academic year calendar of Hebrew University.', 'Identify when each semester starts, when holidays fall.'], task: 'Read aloud and answer six date-related questions.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'Setting an appointment', goals: ['Follow two friends scheduling a coffee meeting.', 'Identify the date, day, and time they agree on.'], task: 'Confirm a meeting day and time in Hebrew.' },
  { id: ACT.writing, section: 'Writing', title: 'Your travel itinerary', goals: ['Write 6 sentences planning a trip to Israel with specific dates.', 'Use ordinals, prepositions of time, and at least 5 different dates.'], task: 'Compose your itinerary.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Hebrew calendar and holidays', goals: ['Understand the lunar Hebrew calendar with leap months (Adar I/II).', 'Know the major holiday months: Tishrei (Rosh Hashanah, Yom Kippur, Sukkot), Kislev (Hanukkah), Nisan (Pesach), Iyar (Yom HaAtzma\'ut).'], task: 'Match 5 holidays to their Hebrew month.' },
  { id: ACT.task, section: 'Task', title: 'Planning a semester at Hebrew University', goals: ['Combine days, months, ordinals, and dates in a continuous planning scene.', 'Coordinate with the AI tutor (playing a fellow student) over 4 study sessions in the coming weeks.'], task: 'Roleplay scheduling four meetings with classmates over a month.' },
];

const lesson = {
  title: 'Level 1 · Unit 6: לוח השנה — Days, Months, and Dates',
  category: 'time', difficulty: 'beginner', targetLang: 'he', nativeLang: 'en', track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'naming-days', label: 'Naming days', goal: 'Say each day of the week and what you do on it.' },
    { id: 'setting-dates', label: 'Setting dates', goal: 'Schedule events with specific dates and times.' },
    { id: 'discussing-holidays', label: 'Discussing holidays', goal: 'Mention 3 Israeli holidays with their approximate dates.' },
  ],
  relatedPools: ['topic-time', 'topic-culture'],
  content: [
    createContentItem('היום, אתמול, מחר', 'ha-yom, etmol, machar', 'The basic time triad: ha-yom (today), etmol (yesterday), machar (tomorrow). Used constantly in casual speech.', 'word', 'היום יום שני, מחר יום שלישי. — ha-yom yom sheni, machar yom shlishi — "Today is Monday, tomorrow is Tuesday."', 'Also useful: שלשום (shilshom, day before yesterday), מחרתיים (mochrotayim, day after tomorrow).', null, [ACT.orientation]),
    createContentItem('יום ראשון', 'yom rishon (yom ri-SHON)', 'Sunday — "first day". The start of the Israeli workweek. Mil\'ra stress on rishon. The Hebrew workweek begins Sunday (not Monday), since Shabbat is Saturday and the new week starts the next day.', 'word', 'יום ראשון בבוקר. — yom rishon ba-boker — "Sunday morning."', 'Israeli schools, government, and most businesses open Sunday morning; expat workers from Western companies often have Sundays "off" (weekends Friday-Saturday) while colleagues work.', null, [ACT.vocabDays]),
    createContentItem('יום שני', 'yom sheni', 'Monday — "second day".', 'word', 'יש לי שיעור ביום שני. — yesh li shiur be-yom sheni — "I have a lesson on Monday."', 'In casual speech, often shortened to just sheni: "Monday".', null, [ACT.vocabDays]),
    createContentItem('יום שלישי', 'yom shlishi', 'Tuesday — "third day". Mil\'ra: shli-SHI.', 'word', 'נדבר ביום שלישי. — nedaber be-yom shlishi — "Let\'s talk on Tuesday."', 'The day of the week with the fewest religious associations; "Tuesday" is sometimes a kind of throwaway day.', null, [ACT.vocabDays]),
    createContentItem('יום רביעי', 'yom revi\'i', 'Wednesday — "fourth day".', 'word', 'ביום רביעי יש לי בחינה. — be-yom revi\'i yesh li bechina — "On Wednesday I have an exam."', 'Israeli school week peaks midweek.', null, [ACT.vocabDays]),
    createContentItem('יום חמישי', 'yom chamishi', 'Thursday — "fifth day". Initial chet /kh/.', 'word', 'יום חמישי = יום החופש. — yom chamishi = yom ha-chofesh — "Thursday is the day of freedom."', 'Last full workday before the weekend (Friday is half-day, Saturday is Shabbat). Often a party night.', null, [ACT.vocabDays]),
    createContentItem('יום שישי', 'yom shishi', 'Friday — "sixth day". Half workday in Israel; schools and offices close by midday.', 'word', 'יום שישי מוקדם — yom shishi mukdam — "Friday early"', 'Friday afternoon = the country "shuts down" to prepare for Shabbat.', null, [ACT.vocabDays]),
    createContentItem('שבת', 'shabbat', 'Saturday / Sabbath. From Friday sunset to Saturday sunset. Day of rest in Judaism. Public transport stops in most cities (Tel Aviv is partial exception); restaurants outside touristy areas are closed.', 'word', 'שבת שלום! — shabbat shalom — "Shabbat peace!" — the universal Friday/Saturday greeting.', 'Religious Shabbat involves no driving, electricity, cooking, or work; secular Israelis just take the day off.', null, [ACT.vocabDays]),
    createContentItem('סופ"ש', 'sof shavua (sof-SH)', 'Weekend. Abbreviation for סוף שבוע (sof shavua, "end of week"). The Israeli weekend is Friday afternoon through Saturday.', 'word', 'מה אתה עושה בסופ"ש? — ma ata oseh ba-sof shavua? — "What are you doing on the weekend?"', 'Modern Israeli speech: sofash, often written as סופ"ש.', null, [ACT.vocabDays]),

    createContentItem('ינואר עד דצמבר', 'Yanuar ad Detzember', 'The 12 Gregorian months in Modern Hebrew: ינואר (Yanuar), פברואר (Februar), מרץ (Mertz), אפריל (April), מאי (Mai), יוני (Yuni), יולי (Yuli), אוגוסט (Ogust), ספטמבר (September), אוקטובר (Oktober), נובמבר (November), דצמבר (Detzember).', 'word', 'יוני הוא חודש חם. — Yuni hu chodesh cham — "June is a hot month."', 'These names are direct transliterations; the Hebrew calendar has separate month names (Tishrei, Cheshvan, etc.) used for religious and traditional dates.', null, [ACT.vocabMonths]),
    createContentItem('תשרי', 'Tishrei', 'First month of the Hebrew calendar (~September-October). Contains Rosh Hashanah (new year), Yom Kippur, and Sukkot.', 'word', 'בתשרי יש את ראש השנה. — be-Tishrei yesh et Rosh ha-Shana — "In Tishrei is Rosh Hashanah."', 'The Hebrew civil new year is at Rosh Hashanah, 1 Tishrei.', null, [ACT.vocabMonths]),
    createContentItem('ניסן', 'Nisan', 'Seventh month (~March-April). Contains Pesach (Passover). Named in Babylonian after the spring; biblical name was Aviv.', 'word', 'פסח בניסן. — Pesach be-Nisan — "Passover is in Nisan."', 'The biblical religious year begins in Nisan (first month of religious calendar), but the civil year begins in Tishrei.', null, [ACT.vocabMonths]),
    createContentItem('אדר', 'Adar', 'Sixth Hebrew month (~February-March). Contains Purim. In leap years (7 of every 19), an extra Adar is added (Adar I and Adar II).', 'word', 'פורים בחודש אדר. — Purim be-chodesh Adar — "Purim is in the month of Adar."', 'Talmudic saying: "When Adar comes, joy increases" — Adar is considered a happy month.', null, [ACT.vocabMonths]),
    createContentItem('כסלו / טבת', 'Kislev / Tevet', 'Hebrew months ~November-December and December-January. Hanukkah straddles Kislev-Tevet.', 'word', 'חנוכה בכסלו וטבת. — Chanukah be-Kislev ve-Tevet — "Hanukkah is in Kislev and Tevet."', 'The Hanukkah candle-lighting starts 25 Kislev and runs eight days.', null, [ACT.vocabMonths]),

    createContentItem('אביב / קיץ / סתיו / חורף', 'aviv / kayitz / stav / choref', 'The four seasons. Israel has mild Mediterranean winters (Nov-March, rainy in north, cool) and hot dry summers (June-Sep, often 35+ C). Spring (March-May) and autumn (Sep-Nov) are brief.', 'word', 'הקיץ חם והחורף קר. — ha-kayitz cham ve-ha-choref kar — "Summer is hot, winter is cold."', 'Aviv is also the name of Tel-Aviv (Hill of Spring) and a common boy/girl name.', null, [ACT.vocabSeasons]),

    createContentItem('מספרים סודרים', 'misparim sodrim', 'Ordinal numbers 1st-10th, with gender agreement. M-sg / F-sg pattern: rishon/rishona (1st), sheni/shniya (2nd), shlishi/shlishit (3rd), revi\'i/revi\'it (4th), chamishi/chamishit (5th), shishi/shishit (6th), shvi\'i/shvi\'it (7th), shmini/shminit (8th), tshi\'i/tshi\'it (9th), asiri/asirit (10th).', 'sentence', 'הסמסטר הראשון, השנה הרביעית. — ha-semester ha-rishon, ha-shana ha-revi\'it — "the first semester, the fourth year."', 'For ordinals above 10, Hebrew typically uses the cardinal number with definite article: "the 15th" = ha-15.', [
      { target: '1st rishon/rishona', note: 'masculine without -i, feminine with -a' },
      { target: '2nd sheni/shniya', note: '-i ending in masc, -iya in fem' },
      { target: '3rd-10th', note: 'pattern C1-C2-i-C3-i (m) or -it (f)' },
    ], [ACT.grammarOrdinals]),

    createContentItem('היום ה...', 'ha-yom ha-...', 'Standard date expression: ha-yom (today) + ordinal number + month name. "Today is the 15th of November" = ha-yom ha-15 be-November.', 'sentence', 'היום ה-15 בנובמבר 2026. — ha-yom ha-chamesh esre be-November alpayim esrim ve-shesh — "Today is November 15, 2026."', 'Years are read as full cardinal numbers; 2026 = alpayim ve-esrim ve-shesh ("two-thousand and twenty and six").', null, [ACT.grammarDates]),

    createContentItem('לוח שנה אקדמי', 'lu\'ach shana akademi', 'The Hebrew University academic-year calendar. Read for date and month vocabulary.', 'sentence', 'שנת הלימודים מתחילה ב-1 באוקטובר. הסמסטר הראשון מסתיים בינואר. הסמסטר השני מתחיל בפברואר ומסתיים ביוני. בקיץ יש קורסים מיוחדים. ראש השנה נופל בספטמבר או באוקטובר, חופשת הפסח באפריל.', 'Translation: "The academic year begins October 1. The first semester ends in January. The second semester begins in February and ends in June. In summer there are special courses. Rosh Hashanah falls in September or October, Pesach vacation in April."', null, [ACT.reading]),

    createContentItem('קביעת פגישה', 'kvi\'at pgisha', 'Two friends schedule a coffee meeting. Listen for the day, time, and place agreement.', 'conversation', 'שירה: היי דני, נפגש לקפה?\nדני: יאללה. ביום שלישי?\nשירה: שלישי לא יכולה, יש לי שיעור עד שבע.\nדני: אז ביום רביעי, בארבע?\nשירה: יופי, בארבע ברחוב יפו, בקפה ארומה?\nדני: סבבה, נתראה ברביעי.', 'Note the casual register, the rapid agreement, and the use of street + cafe name as meeting point.', [
      { target: 'יאללה yalla', note: 'Arabic loan; "come on / let\'s"' },
      { target: 'סבבה sababa', note: 'Arabic loan; "cool / okay / great"' },
      { target: 'נתראה nitra\'e', note: '"we\'ll see each other"; casual farewell with future meeting' },
    ], [ACT.listening]),

    createContentItem('תכנית טיול', 'tochnit tiyul', 'Write 6 sentences planning a trip to Israel with dates and a clear sequence.', 'sentence', 'דוגמה: אני נוסעת לישראל ב-3 במאי. ביום הראשון אני נוחתת בנמל התעופה. ביום השני אני נוסעת לתל אביב. ביום השלישי אני בירושלים. בסוף השבוע אני בים המלח. אחרי שבוע אני חוזרת הביתה.', 'Translation: "I\'m going to Israel on May 3. On day one I land at the airport. On day two I go to Tel Aviv. On day three I\'m in Jerusalem. On the weekend I\'m at the Dead Sea. After a week I return home."', null, [ACT.writing]),

    createContentItem('לוח עברי', 'lu\'ach ivri', 'The Hebrew calendar is lunisolar — 12 lunar months adjusted with leap months (Adar II) to keep aligned with solar seasons. Months: Tishrei (1st), Cheshvan, Kislev, Tevet, Shevat, Adar, Nisan (7th but biblical 1st), Iyar, Sivan, Tammuz, Av, Elul.', 'sentence', 'הלוח העברי הוא לוח ירחי-שמשי. — ha-lu\'ach ha-ivri hu lu\'ach yerachi-shimshi — "The Hebrew calendar is lunar-solar."', 'Israeli civil documents use both Hebrew and Gregorian dates; tombstones, religious documents, and Israeli IDs include the Hebrew date.', null, [ACT.culture]),
    createContentItem('חגי תשרי', 'chagei Tishrei', 'The "month of holidays" — Tishrei contains Rosh Hashanah (1-2 Tishrei, new year), Yom Kippur (10 Tishrei, day of atonement), Sukkot (15-22 Tishrei, harvest festival).', 'sentence', 'בתשרי כל הארץ בחופשה. — be-Tishrei kol ha-aretz be-chufsha — "In Tishrei the whole country is on vacation."', 'Israeli universities don\'t hold classes during the Tishrei holidays; the academic year really gets going after Sukkot.', null, [ACT.culture]),

    createContentItem('משימה: תיאום מפגשים', 'mesima: ti\'um mifgashim', 'Roleplay coordinating four study sessions over a month with classmates at Hebrew University. Use days, dates, ordinals, and time.', 'conversation', 'חבר: בוא נתחיל לתאם פגישות לחודש הזה.\nאתה: [מציע יום ראשון]\nחבר: ראשון לא טוב, אצלי מבחן. שני?\nאתה: [מסכים, נותן שעה]\nחבר: מעולה. ואיפה?\nאתה: [מציע ספריה / קפה / כיתה]\nחבר: יופי, נתראה.', 'Eight-turn exchange covering scheduling, day-swapping, time and place.', null, [ACT.task]),
  ],
};

module.exports = lesson;
