// Level 1 Unit 6 — Dates & Calendar (Bahasa Melayu)
// Functions: days of the week, months, dates, year, age, birthdays.

const createContentItem = (target, pinyin, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization: pinyin, nativeText: note, pronunciation: pinyin,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ms-l1u6-orientation', pronunciation: 'ms-l1u6-pronunciation',
  vocabularyDays: 'ms-l1u6-vocab-days', vocabularyMonths: 'ms-l1u6-vocab-months',
  vocabularyNumbers: 'ms-l1u6-vocab-numbers', grammarDateFormat: 'ms-l1u6-grammar-date-format',
  grammarAge: 'ms-l1u6-grammar-age', grammarRelativeTime: 'ms-l1u6-grammar-relative-time',
  reading: 'ms-l1u6-reading', listening: 'ms-l1u6-listening',
  writing: 'ms-l1u6-writing', culture: 'ms-l1u6-culture', task: 'ms-l1u6-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['State the date in BM using day, date, month, year.', 'Say your age and birthday.', 'Talk about national holidays and academic semester dates at UM.'], task: 'Picture filling out a UM form that asks "Tarikh lahir?" By the end of this lesson you will give the date confidently.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Days, months, numbers', goals: ['Pronounce Arabic-origin day names (Ahad, Isnin, Selasa, Rabu, Khamis, Jumaat, Sabtu).', 'Pronounce English-origin month names (Januari, Februari) and the Malay-Arabic Bulan Sya\'aban / Ramadan if relevant.'], task: 'Read each calendar word aloud.' },
  { id: ACT.vocabularyDays, section: 'Vocabulary I', title: 'Days of the week', goals: ['Memorize seven days: Ahad, Isnin, Selasa, Rabu, Khamis, Jumaat, Sabtu.', 'Note that the BM week starts MONDAY in everyday usage, but the days themselves are numbered from SUNDAY (Ahad = "one") to Saturday in Arabic-origin etymology.'], task: 'Say what day it is today and yesterday/tomorrow.' },
  { id: ACT.vocabularyMonths, section: 'Vocabulary II', title: 'Months', goals: ['Memorize the 12 months (Januari, Februari, Mac, April, Mei, Jun, Julai, Ogos, September, Oktober, November, Disember). Note Malaysian spelling differences from ID.'], task: 'Say your birth month.' },
  { id: ACT.vocabularyNumbers, section: 'Vocabulary III', title: 'Numbers 1-100 + years', goals: ['Master numbers 1-100 needed for dates: 1 satu, 2 dua, ... 11 sebelas, 12 dua belas, 20 dua puluh, 21 dua puluh satu, 100 seratus.', 'State years: 2026 = dua ribu dua puluh enam.'], task: 'Count to 30 and say five years.' },
  { id: ACT.grammarDateFormat, section: 'Grammar I', title: 'BM date format: day-date-month-year', goals: ['Use the BM date order: "Hari Khamis, 17 Mei 2026". Note: date BEFORE month (DD/MM/YYYY), opposite of US.'], task: 'Write today and three other dates.' },
  { id: ACT.grammarAge, section: 'Grammar II', title: 'Saying your age', goals: ['Use "Umur saya ___ tahun" or "Saya berumur ___ tahun" to state age.'], task: 'State your age and a friend\'s.' },
  { id: ACT.grammarRelativeTime, section: 'Grammar III', title: 'Relative time: hari ini, semalam, esok', goals: ['Use HARI INI (today), SEMALAM (yesterday), ESOK (tomorrow), LUSA (day after tomorrow), KELMARIN (two days ago).'], task: 'Compare what you did across days.' },
  { id: ACT.reading, section: 'Reading', title: 'UM academic calendar', goals: ['Read a calendar excerpt and identify semester dates.'], task: 'Read and answer.' },
  { id: ACT.listening, section: 'Listening', title: 'Planning a birthday party', goals: ['Follow a dialogue planning a birthday gathering.'], task: 'Perform the dialogue.' },
  { id: ACT.writing, section: 'Writing', title: 'Write your important dates', goals: ['Write 5 sentences about your birthday and family member birthdays.'], task: 'Write and read aloud.' },
  { id: ACT.culture, section: 'Culture', title: 'Two calendars: Gregorian + Hijri', goals: ['Recognize that Malaysia uses the Gregorian calendar officially, but the Hijri (Islamic lunar) calendar determines Ramadan, Hari Raya, Maulidur Rasul, and other Muslim holidays.', 'Recognize the Lunar (Chinese) calendar for CNY and the Tamil calendar for Hindu festivals.'], task: 'Map three festivals to their calendar systems.' },
  { id: ACT.task, section: 'Task', title: 'Make plans', goals: ['Roleplay planning a meet-up next week with a Malaysian friend.'], task: 'Roleplay 5 turns.' },
];

const lesson = {
  title: 'Level 1 · Unit 6: Tarikh dan Kalendar — Dates and Calendar',
  category: 'time',
  difficulty: 'beginner', targetLang: 'ms', nativeLang: 'en', track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'stating-dates', label: 'Stating dates', goal: 'Say today, yesterday, tomorrow, and any date.' },
    { id: 'stating-age', label: 'Stating age', goal: 'Use "umur saya" or "saya berumur".' },
    { id: 'planning-events', label: 'Planning events', goal: 'Schedule an activity for a specific day.' },
  ],
  relatedPools: ['topic-time', 'topic-daily-life'],
  content: [
    createContentItem('tarikh', 'ta.riʔ', 'DATE — Arabic-origin. "Tarikh hari ini" = today\'s date.', 'word', 'Tarikh lahir saya 5 Mei.', '"My birthdate is 5 May".', null, [ACT.orientation]),
    createContentItem('kalendar', 'ka.len.dar', 'CALENDAR — English loan. Also called "takwim" in formal Arabic-derived register.', 'word', 'Sila tanda dalam kalendar.', '"Please mark in the calendar".', null, [ACT.orientation]),

    createContentItem('Ahad', 'a.had', 'SUNDAY. Arabic "first day" (yaum al-ahad). The first day in the Arabic week numbering.', 'word', 'Hari Ahad saya rehat di rumah.', '"On Sunday I rest at home".', null, [ACT.vocabularyDays]),
    createContentItem('Isnin', 'is.nin', 'MONDAY. Arabic "second day" (yaum al-ithnayn). The start of the working week in modern MY usage.', 'word', 'Saya benci hari Isnin.', '"I hate Mondays".', null, [ACT.vocabularyDays]),
    createContentItem('Selasa', 'sə.la.sa', 'TUESDAY. Arabic "third day".', 'word', 'Mesyuarat hari Selasa pagi.', '"Meeting Tuesday morning".', null, [ACT.vocabularyDays]),
    createContentItem('Rabu', 'ra.bu', 'WEDNESDAY. Arabic "fourth day".', 'word', 'Hari Rabu hari pertengahan minggu.', '"Wednesday is mid-week".', null, [ACT.vocabularyDays]),
    createContentItem('Khamis', 'xa.mis', 'THURSDAY. Arabic "fifth day". Some Malay-Muslims read Surah Yasin on Khamis night.', 'word', 'Malam Khamis di masjid kampung.', '"Thursday night at the village mosque" — religious gathering.', null, [ACT.vocabularyDays]),
    createContentItem('Jumaat', 'dʒu.ma.at', 'FRIDAY. Arabic "gathering day" (yaum al-jumu\'ah). The Friday prayer (solat Jumaat) is obligatory for Muslim men. Friday afternoons are quieter — many shops close briefly.', 'word', 'Solat Jumaat di Masjid Negara.', '"Friday prayer at the National Mosque".', null, [ACT.vocabularyDays]),
    createContentItem('Sabtu', 'sab.tu', 'SATURDAY. Arabic "sabbath day" (yaum al-sabt).', 'word', 'Sabtu dan Ahad ialah hujung minggu.', '"Saturday and Sunday are the weekend".', null, [ACT.vocabularyDays]),
    createContentItem('Note: Kelantan/Terengganu weekend', 'kə.lan.tan/tə.rəŋ.ga.nu', 'In Kelantan, Terengganu, Kedah, and Johor, the weekend is FRIDAY-SATURDAY (because Friday is the Muslim prayer day). The rest of Malaysia uses SAT-SUN.', 'word', 'Di Kelantan, hujung minggu hari Jumaat dan Sabtu.', '"In Kelantan, the weekend is Friday and Saturday".', null, [ACT.vocabularyDays]),

    // Months
    createContentItem('Januari', 'dʒa.nu.a.ri', 'January. Malay month names follow familiar international forms, but they are still used with `bulan` in natural calendar talk.', 'word', 'Tahun bermula pada bulan Januari.', '"The year starts in January" uses `bulan Januari`, the ordinary month phrase learners will hear in schedules.', null, [ACT.vocabularyMonths]),
    createContentItem('Februari', 'fe.bru.a.ri', 'FEBRUARY. Often Chinese New Year falls in this month.', 'word', 'Tahun Baru Cina selalunya pada bulan Februari.', '"CNY is usually in February".', null, [ACT.vocabularyMonths]),
    createContentItem('Mac', 'matʃ', 'MARCH. MY spelling is "Mac" (3-letter), ID is "Maret".', 'word', 'Cuti sekolah pertama pada bulan Mac.', '"First school break in March".', null, [ACT.vocabularyMonths]),
    createContentItem('April', 'ap.ril', 'April. A short international loan that appears unchanged in Malaysian calendars, school notices, and appointment dates.', 'word', 'Cuaca panas pada April.', '"Hot weather in April" gives a compact model for month-based weather talk.', null, [ACT.vocabularyMonths]),
    createContentItem('Mei', 'mei', 'MAY. Hari Pekerja (Labour Day) is May 1, public holiday.', 'word', 'Hari Pekerja pada 1 Mei.', '"Labour Day on May 1".', null, [ACT.vocabularyMonths]),
    createContentItem('Jun', 'dʒun', 'JUNE. Mid-year school break.', 'word', 'Cuti pertengahan tahun pada bulan Jun.', '"Mid-year break in June".', null, [ACT.vocabularyMonths]),
    createContentItem('Julai', 'dʒu.lai', 'July. Malaysian spelling uses `Julai`, a useful contrast with English spelling even though the month is easy to recognize.', 'word', 'Bulan Julai panas dan kering.', '"July is hot and dry" links the month to a natural seasonal description.', null, [ACT.vocabularyMonths]),
    createContentItem('Ogos', 'o.gos', 'AUGUST. MY spelling — ID uses "Agustus". Hari Merdeka August 31.', 'word', 'Hari Merdeka pada 31 Ogos.', '"Independence Day on 31 August".', null, [ACT.vocabularyMonths]),
    createContentItem('September', 'sep.tem.ber', 'SEPTEMBER. Hari Malaysia September 16.', 'word', 'Hari Malaysia pada 16 September.', '"Malaysia Day on 16 September".', null, [ACT.vocabularyMonths]),
    createContentItem('Oktober', 'ok.to.ber', 'OCTOBER. UM Sem 1 usually starts.', 'word', 'Semester baru bermula Oktober.', '"New semester starts October".', null, [ACT.vocabularyMonths]),
    createContentItem('November', 'no.vem.ber', 'NOVEMBER. Deepavali often falls.', 'word', 'Deepavali biasanya pada November.', '"Deepavali usually in November".', null, [ACT.vocabularyMonths]),
    createContentItem('Disember', 'di.sem.ber', 'DECEMBER. MY spelling — ID uses "Desember". Christmas season.', 'word', 'Krismas pada 25 Disember.', '"Christmas on 25 December".', null, [ACT.vocabularyMonths]),

    // Numbers
    createContentItem('satu, dua, tiga', 'sa.tu, du.a, ti.ga', '1, 2, 3 — the most basic. "Satu" can become "se-" prefix in compounds: seratus (one hundred), seribu (one thousand).', 'word', '1 satu, 2 dua, 3 tiga, 4 empat, 5 lima', 'First five numbers.', null, [ACT.vocabularyNumbers]),
    createContentItem('enam, tujuh, lapan, sembilan, sepuluh', 'ə.nam, tu.dʒuh, la.pan, səm.bi.lan, sə.pu.luh', '6-10. Note: MY uses "lapan" (8), ID uses "delapan".', 'word', '6 enam, 7 tujuh, 8 lapan, 9 sembilan, 10 sepuluh', 'Numbers 6-10.', null, [ACT.vocabularyNumbers]),
    createContentItem('sebelas, dua belas, ... dua puluh', 'sə.bə.las, du.a bə.las, ... du.a pu.luh', '11-20. 11 = sebelas (special form), 12-19 = X belas, 20 = dua puluh.', 'word', '11 sebelas, 12 dua belas, 13 tiga belas, 20 dua puluh, 21 dua puluh satu', 'Numbers 11-21.', null, [ACT.vocabularyNumbers]),
    createContentItem('puluh, ratus, ribu', 'pu.luh, ra.tus, ri.bu', 'Tens, hundreds, thousands. 100 = seratus, 1000 = seribu, 2026 = dua ribu dua puluh enam.', 'word', 'Tahun 2026 = dua ribu dua puluh enam.', '"Year 2026".', null, [ACT.vocabularyNumbers]),

    // Grammar — date format
    createContentItem('format tarikh', 'for.mat ta.riʔ', 'BM DATE: "Hari [day], [date] [month] [year]". Example: "Hari Khamis, 17 Mei 2026".', 'sentence', 'Hari Khamis, 17 Mei 2026.', 'Standard full date format in formal writing.', [
      { target: 'Hari + day', note: 'day of the week comes first' },
      { target: 'date number', note: 'date as a cardinal number — no ordinal -nd/-th' },
      { target: 'month name', note: 'month in capital initial' },
      { target: 'year', note: 'year as cardinal number' },
    ], [ACT.grammarDateFormat]),
    createContentItem('tarikh ringkas', 'ta.riʔ riŋ.kas', 'Short format: DD/MM/YYYY or DD-MM-YYYY. 17/5/2026 = 17 Mei 2026.', 'sentence', '17/5/2026 = 17 Mei 2026.', 'Numeric and written forms.', null, [ACT.grammarDateFormat]),

    // Age
    createContentItem('umur', 'u.mur', 'AGE. "Umur saya 25 tahun" = "My age is 25 years".', 'sentence', 'Umur saya 21 tahun.', '"My age is 21".', null, [ACT.grammarAge]),
    createContentItem('berumur', 'bə.ru.mur', 'BE … AGE. ber- + umur. "Saya berumur 25 tahun" = "I am 25 years old".', 'sentence', 'Saya berumur 21 tahun.', '"I am 21 years old".', null, [ACT.grammarAge]),
    createContentItem('Tarikh lahir / hari lahir', 'ta.riʔ la.hir / ha.ri la.hir', 'BIRTHDATE / BIRTHDAY. "Tarikh lahir" is the calendar date; "hari lahir" is the celebration.', 'sentence', 'Tarikh lahir saya 5 Mei. Hari lahir saya esok!', '"My birthdate is May 5. My birthday is tomorrow!".', null, [ACT.grammarAge]),

    // Relative time
    createContentItem('hari ini, semalam, esok', 'ha.ri i.ni, sə.ma.lam, e.soʔ', 'TODAY, YESTERDAY, TOMORROW. Core relative time markers.', 'sentence', 'Hari ini Selasa. Semalam Isnin. Esok Rabu.', '"Today Tuesday. Yesterday Monday. Tomorrow Wednesday".', null, [ACT.grammarRelativeTime]),
    createContentItem('lusa, kelmarin', 'lu.sa, kəl.ma.rin', 'DAY AFTER TOMORROW / DAY BEFORE YESTERDAY.', 'sentence', 'Lusa hari Khamis. Kelmarin hari Ahad.', '"Day after tomorrow is Thursday. Day before yesterday was Sunday".', null, [ACT.grammarRelativeTime]),
    createContentItem('minggu lepas, minggu depan', 'miŋ.gu lə.pas, miŋ.gu də.pan', 'LAST WEEK, NEXT WEEK. Also "bulan lepas/depan", "tahun lepas/depan".', 'sentence', 'Minggu lepas saya ke Penang. Minggu depan ke Sabah.', '"Last week I went to Penang. Next week to Sabah".', null, [ACT.grammarRelativeTime]),

    // Reading
    createContentItem('Kalendar akademik UM', 'ka.len.dar a.ka.de.miʔ u.em', 'A UM academic calendar excerpt.', 'sentence', 'Semester 1 sesi 2025/2026 bermula pada hari Isnin, 13 Oktober 2025. Cuti pertengahan semester dari 22 hingga 30 November 2025. Peperiksaan akhir bermula pada 19 Januari 2026 hingga 6 Februari 2026. Semester 2 bermula pada 16 Mac 2026.', 'A typical UM calendar paragraph.', null, [ACT.reading]),
    createContentItem('Soalan kefahaman', 'so.a.lan kə.fa.ha.man', 'Calendar questions that require the learner to recover start dates, duration, and semester sequence from a real-looking academic schedule.', 'sentence', 'Q1: Bila Semester 1 bermula? Q2: Berapa lama cuti pertengahan? Q3: Bila peperiksaan akhir? Q4: Bila Semester 2?', 'Use full date phrases in the answers so the reading reinforces `bila`, month names, and academic-calendar vocabulary together.', null, [ACT.reading]),

    // Listening
    createContentItem('Dialog: rancang hari lahir', 'di.a.log: ran.tʃaŋ ha.ri la.hir', 'Two friends planning a birthday party.', 'sentence', 'Sarah: Aiman, hari lahir awak bila?\nAiman: 17 Mei. Dua minggu lagi.\nSarah: Wah, kita kena rancang sesuatu! Hari Sabtu boleh?\nAiman: Boleh. Sabtu 16 Mei. Datang ke rumah saya di Bangsar pukul 7 malam.\nSarah: Setuju! Saya akan beli kek.', '5-turn dialogue using dates, days, times.', null, [ACT.listening]),

    // Writing
    createContentItem('Tulis tarikh penting', 'tu.lis ta.riʔ pən.tiŋ', '5-sentence template for important dates.', 'sentence', 'Template: Hari lahir saya ___. Saya berumur ___ tahun. Hari lahir ibu saya ___ dan ayah saya ___. Hari kemerdekaan negara saya ialah ___.', 'Combine all date vocabulary.', null, [ACT.writing]),

    // Culture
    createContentItem('Kalendar Hijriah', 'ka.len.dar hid.ʒri.ah', 'Islamic lunar calendar — determines Ramadan, Hari Raya Aidilfitri (1 Syawal), Aidiladha (10 Zulhijjah), Maulidur Rasul (12 Rabiulawal), Awal Muharram (Islamic New Year).', 'sentence', 'Ramadan bulan ke-9 dalam kalendar Hijriah.', '"Ramadan is the 9th month in the Hijri calendar".', null, [ACT.culture]),
    createContentItem('Kalendar Cina', 'ka.len.dar tʃi.na', 'Chinese lunar calendar — determines Tahun Baru Cina (1st day of 1st lunar month), Mid-Autumn Festival, Cheng Beng.', 'sentence', 'Tahun Baru Cina mengikut kalendar lunar Cina.', '"CNY follows the Chinese lunar calendar".', null, [ACT.culture]),
    createContentItem('Kalendar Tamil', 'ka.len.dar ta.mil', 'Tamil/Hindu calendar — determines Deepavali, Thaipusam, Ponggal.', 'sentence', 'Thaipusam pada bulan Tamil Thai.', '"Thaipusam is in the Tamil month of Thai".', null, [ACT.culture]),
    createContentItem('Empat sistem hidup berdampingan', 'əm.pat sis.tem hi.dup bər.dam.pi.ŋan', 'Malaysians live with FOUR calendars simultaneously: Gregorian (official), Hijri (Muslim), Chinese (CNY), Tamil (Hindu). Public-holiday gazettes track all four.', 'sentence', 'Rakyat Malaysia menggunakan empat sistem kalendar.', '"Malaysians use four calendar systems".', null, [ACT.culture]),

    // Task
    createContentItem('Tugasan: rancang pertemuan', 'tu.ga.san: ran.tʃaŋ pər.tə.mu.an', 'Roleplay planning a meet-up next week.', 'sentence', 'Scene: Awak nak jumpa kawan minggu depan untuk kopi.', 'Use day, date, time vocabulary.', null, [ACT.task]),
  ],
};

module.exports = lesson;
