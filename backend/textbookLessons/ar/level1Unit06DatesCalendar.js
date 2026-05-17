// Level 1 Unit 6 — Dates, Days, and the Calendar (Modern Standard Arabic)
// Functions: numbers, days, months (Gregorian + Hijri), dates, scheduling.

const createContentItem = (target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization, nativeText: note, pronunciation: romanization,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ar-l1u6-orientation', pronunciation: 'ar-l1u6-pronunciation',
  vocabNumbers: 'ar-l1u6-vocab-numbers', vocabDays: 'ar-l1u6-vocab-days', vocabMonths: 'ar-l1u6-vocab-months',
  grammarOrdinals: 'ar-l1u6-grammar-ordinals', grammarDates: 'ar-l1u6-grammar-dates',
  reading: 'ar-l1u6-reading', listening: 'ar-l1u6-listening',
  writing: 'ar-l1u6-writing', culture: 'ar-l1u6-culture', task: 'ar-l1u6-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'Telling dates', goals: ['Count 1-100 in MSA.', 'Name all 7 days of the week.', 'Name the 12 Gregorian months + the 12 Hijri months.'], task: 'Tell your birthday in both Gregorian and Hijri form.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Number traps', goals: ['Distinguish ثَلَاثَة thalātha (3) from ثَلَاث thalāth (3 for masculine counted).', 'Master the gender-polarity of Arabic numbers 3-10.'], task: 'Read 10 number-noun phrases with correct gender.' },
  { id: ACT.vocabNumbers, section: 'Vocabulary I', title: 'Cardinal numbers', goals: ['Master 0-20, then 30, 40, ..., 100.'], task: 'Count from 1 to 20 aloud.' },
  { id: ACT.vocabDays, section: 'Vocabulary II', title: 'Days of the week', goals: ['Name all 7 days starting from Sunday (الأحد).', 'Know that Friday is the weekly holy day and Saturday is also part of the weekend in Saudi Arabia.'], task: 'Say what you do on each day of your week.' },
  { id: ACT.vocabMonths, section: 'Vocabulary III', title: 'Months — Gregorian and Hijri', goals: ['Name the 12 Gregorian months in MSA (Levantine names) and the 12 Hijri months.', 'Know that the Hijri (lunar) year is ~11 days shorter than the Gregorian year.'], task: 'Pair each Hijri month with its religious significance (Ramadan, Hajj, etc.).' },
  { id: ACT.grammarOrdinals, section: 'Grammar I', title: 'Ordinal numbers (الأول، الثاني، ...)', goals: ['Form ordinals 1st-10th: الأول, الثاني, الثالث, ..., العاشر.', 'Match gender on the ordinal: الأولى, الثانية, ...'], task: 'Number 6 things first, second, third in order.' },
  { id: ACT.grammarDates, section: 'Grammar II', title: 'Date construction', goals: ['Form a complete date: اليوم + day + ال + ordinal + من + month + sana(t) + year.', 'Read a date like "the fifteenth of Ramadan 1445 AH" in MSA.'], task: 'Write 4 dates: today, your birthday, a holiday, a milestone.' },
  { id: ACT.reading, section: 'Reading', title: 'A weekly schedule', goals: ['Read a student\'s weekly class schedule.'], task: 'Answer 5 day-question items.' },
  { id: ACT.listening, section: 'Listening', title: 'Booking an appointment', goals: ['Follow a 5-turn appointment-booking dialogue.'], task: 'Book your own appointment.' },
  { id: ACT.writing, section: 'Writing', title: 'Write your weekly schedule', goals: ['Write 7 sentences, one for each day.'], task: 'Write your real schedule.' },
  { id: ACT.culture, section: 'Culture', title: 'The Hijri calendar and Friday', goals: ['Know that the Hijri (Islamic) calendar starts from Muhammad\'s hijra to Medina in 622 CE.', 'Friday (الجمعة) is the weekly holy day; in Saudi Arabia + most Gulf, the weekend is Friday–Saturday.'], task: 'Convert today\'s Gregorian date to its rough Hijri equivalent.' },
  { id: ACT.task, section: 'Task', title: 'Make a date', goals: ['Negotiate a meeting day and time in 6 turns.'], task: 'Roleplay scheduling a study session with a classmate.' },
];

const lesson = {
  title: 'Level 1 · Unit 6: التواريخ — Dates and the Calendar',
  category: 'time', difficulty: 'beginner',
  targetLang: 'ar', nativeLang: 'en', track: 'textbook', lessonType: 'thematic',
  activities, expressionPractice: [
    { id: 'counting', label: 'Counting', goal: 'Count 0-100 fluently.' },
    { id: 'naming-days', label: 'Naming days', goal: 'Name any day of the week and its activity.' },
    { id: 'telling-dates', label: 'Telling dates', goal: 'Construct a full Gregorian or Hijri date.' },
  ],
  relatedPools: ['topic-time'],
  content: [
    // Numbers 0-10
    createContentItem('صفر', 'ṣifr', 'Zero. The English word "zero" comes from this via Latin and Italian.', 'word', 'الرقم صفر.', '"The number zero."', null, [ACT.vocabNumbers]),
    createContentItem('واحد / واحدة', 'wāḥid / wāḥida', 'One. Like adjectives, has M/F forms. Pharyngeal ح.', 'word', 'كتاب واحد · طالبة واحدة', '"One book · one (female) student."', null, [ACT.vocabNumbers]),
    createContentItem('اثنان / اثنتان', 'ithnāni / ithnatāni', 'Two — only used in counting; for "two of something" Arabic uses the dual (المثنى) on the noun itself.', 'word', 'اثنان كتب — wrong; instead: كتابان "two books" (dual)', 'In MSA dual ending suffices; in colloquial اثنين is used freely.', null, [ACT.vocabNumbers]),
    createContentItem('ثلاثة / ثلاث', 'thalātha (M) / thalāth (F)', 'Three. GENDER POLARITY: for counting masculine nouns use ثلاثة (with ـة); for feminine nouns use ثلاث (without ـة). Same for 3-10.', 'word', 'ثلاثة كتب (3 books, M plural) · ثلاث طالبات (3 students, F plural)', 'The polarity rule is counterintuitive: M counted noun → F-looking number; F counted noun → M-looking number.', null, [ACT.vocabNumbers]),
    createContentItem('أربعة / أربع', 'arbaʿa / arbaʿ', 'Four. Same polarity rule. The pharyngeal ع.', 'word', 'أربعة طلاب · أربع طالبات', '"4 students-M · 4 students-F."', null, [ACT.vocabNumbers]),
    createContentItem('خمسة / خمس', 'khamsa / khams', 'Five. Velar fricative خ at the start.', 'word', 'خمسة أيام في الأسبوع.', '"Five days in the (work)week (Sun-Thu in many Arab countries)."', null, [ACT.vocabNumbers]),
    createContentItem('ستة / ست', 'sitta / sitt', 'Six. The colloquial ست also means "lady" in Egyptian (different word, same spelling).', 'word', 'ستة أشهر.', '"Six months."', null, [ACT.vocabNumbers]),
    createContentItem('سبعة / سبع', 'sabʿa / sabʿ', 'Seven. The pharyngeal ع.', 'word', 'سبعة أيام في الأسبوع.', '"Seven days in the week."', null, [ACT.vocabNumbers]),
    createContentItem('ثمانية / ثمان', 'thamāniya / thamānin', 'Eight. The fem form drops the ـية.', 'word', 'ثمانية ساعات.', '"Eight hours."', null, [ACT.vocabNumbers]),
    createContentItem('تسعة / تسع', 'tisʿa / tisʿ', 'Nine. The pharyngeal ع.', 'word', 'تسعة أشهر.', '"Nine months."', null, [ACT.vocabNumbers]),
    createContentItem('عشرة / عشر', 'ʿashara / ʿashr', 'Ten. The pharyngeal ع at the start.', 'word', 'عشر طالبات.', '"Ten (female) students."', null, [ACT.vocabNumbers]),
    createContentItem('أحد عشر', 'aḥada ʿashar', 'Eleven (M counted noun); for F: إحدى عشرة iḥdā ʿashrata. From 11 onward, both parts are invariable in form but the counted noun is in accusative singular.', 'word', 'أحد عشر كتابًا (M) · إحدى عشرة طالبةً (F)', 'Note the accusative tanwin on the counted noun.', null, [ACT.vocabNumbers]),
    createContentItem('عشرون', 'ʿishrūn', '20. From 20 onward, tens use the sound masculine plural ending ـون.', 'word', 'عشرون طالبًا.', '"Twenty students."', null, [ACT.vocabNumbers]),
    createContentItem('ثلاثون', 'thalāthūn', '30.', 'word', 'ثلاثون يومًا.', '"Thirty days."', null, [ACT.vocabNumbers]),
    createContentItem('مائة / مئة', 'miʾa', '100. Two spellings — مائة is traditional, مئة is modern. Same pronunciation.', 'word', 'مائة دينار.', '"One hundred dinars."', null, [ACT.vocabNumbers]),
    createContentItem('ألف', 'alf', 'One thousand. Plural آلاف ālāf.', 'word', 'ألف ليلة وليلة.', '"One Thousand and One Nights."', null, [ACT.vocabNumbers]),

    // Days
    createContentItem('الأحد', 'al-aḥad', 'Sunday — the first day of the Arab week. The hamza on أ.', 'word', 'يوم الأحد بداية الأسبوع.', '"Sunday is the start of the (work)week."', null, [ACT.vocabDays]),
    createContentItem('الاثنين', 'al-ithnayn', 'Monday. The dual form of "two" reinterpreted as a weekday name.', 'word', 'يوم الاثنين.', '"Monday."', null, [ACT.vocabDays]),
    createContentItem('الثلاثاء', 'ath-thulāthāʾ', 'Tuesday. From ثلاث "three" — the "third" day. Final hamza.', 'word', 'سأراك يوم الثلاثاء.', '"I\'ll see you on Tuesday."', null, [ACT.vocabDays]),
    createContentItem('الأربعاء', 'al-arbiʿāʾ', 'Wednesday. From أربع "four" — the "fourth" day.', 'word', 'الأربعاء يوم نصف الأسبوع.', '"Wednesday is mid-week."', null, [ACT.vocabDays]),
    createContentItem('الخميس', 'al-khamīs', 'Thursday. From خمسة "five" — the "fifth" day.', 'word', 'الخميس آخر يوم في الأسبوع.', '"Thursday is the last day of the (work)week (in many Arab countries)."', null, [ACT.vocabDays]),
    createContentItem('الجمعة', 'al-jumʿa', 'Friday. From جمع "gathering" — the day of the congregational prayer. The Arab world\'s holy day; in Gulf countries the weekend is Fri-Sat.', 'word', 'صلاة الجمعة في المسجد.', '"Friday prayer in the mosque."', null, [ACT.vocabDays]),
    createContentItem('السبت', 'as-sabt', 'Saturday. From the same root as "Sabbath".', 'word', 'يوم السبت إجازة.', '"Saturday is a day off."', null, [ACT.vocabDays]),

    // Gregorian months (Levantine names)
    createContentItem('يناير / كانون الثاني', 'yanāyir / Kānūn ath-thānī', 'January. Two MSA names: يناير is used in Egypt and the Gulf; كانون الثاني in the Levant.', 'word', 'في يناير الجو بارد.', '"In January the weather is cold."', null, [ACT.vocabMonths]),
    createContentItem('فبراير / شباط', 'fibrāyir / Shubāṭ', 'February. The first form is common in many Arab countries, while `شباط` is a Levantine month name learners will meet in regional calendars.', 'word', 'فبراير شهر قصير.', '"February is a short month" gives the international form in a simple calendar sentence.', null, [ACT.vocabMonths]),
    createContentItem('مارس / آذار', 'māris / Ādhār', 'March. `مارس` is widespread, and `آذار` is the Levantine alternative often used in news and local schedules.', 'word', 'في مارس يبدأ الربيع.', '"Spring begins in March" ties the month to a natural seasonal phrase.', null, [ACT.vocabMonths]),
    createContentItem('أبريل / نيسان', 'abrīl / Nīsān', 'April. The pair shows the common international borrowing and the older Levantine calendar form side by side.', 'word', 'الجو معتدل في أبريل.', '"The weather is moderate in April" models month use with weather talk.', null, [ACT.vocabMonths]),
    createContentItem('مايو / أيار', 'māyū / Ayyār', 'May. The alternate `أيار` is especially useful for learners reading Levantine media or holiday notices.', 'word', 'مايو شهر الزهور.', '"May is the month of flowers" supplies a memorable association.', null, [ACT.vocabMonths]),
    createContentItem('يونيو / حزيران', 'yūniyū / Ḥazīrān', 'June. Arabic learners often need both forms because regional month names vary more than English calendars suggest.', 'word', 'يونيو بداية الصيف.', '"June is the start of summer" links the month to the yearly cycle.', null, [ACT.vocabMonths]),
    createContentItem('يوليو / تموز', 'yūliyū / Tammūz', 'July. `تموز` is a high-frequency Levantine alternative, not merely a literary curiosity.', 'word', 'يوليو شهر حار جدًا.', '"July is a very hot month" fits ordinary summer conversation.', null, [ACT.vocabMonths]),
    createContentItem('أغسطس / آب', 'aghusṭus / Āb', 'August. The Levantine name `آب` is short and common in regional weather, school, and holiday contexts.', 'word', 'أغسطس شهر العطل.', '"August is the holiday month" reflects a common seasonal association.', null, [ACT.vocabMonths]),
    createContentItem('سبتمبر / أيلول', 'sibtambar / Aylūl', 'September. `أيلول` is the regional counterpart many learners encounter in Levantine announcements.', 'word', 'في سبتمبر تبدأ الدراسة.', '"School begins in September" makes the month useful immediately.', null, [ACT.vocabMonths]),
    createContentItem('أكتوبر / تشرين الأول', 'uktūbar / Tishrīn al-awwal', 'October. `تشرين الأول` literally distinguishes it from the following month, so learners should notice the paired naming system.', 'word', 'أكتوبر شهر جميل.', '"October is a beautiful month" keeps the example short while the note carries the contrast.', null, [ACT.vocabMonths]),
    createContentItem('نوفمبر / تشرين الثاني', 'nūfambar / Tishrīn ath-thānī', 'November. The Levantine form pairs with October as `first Tishrin` and `second Tishrin`, a useful calendar contrast.', 'word', 'في نوفمبر يبرد الجو.', '"In November the weather cools" adds seasonal context.', null, [ACT.vocabMonths]),
    createContentItem('ديسمبر / كانون الأول', 'dīsambar / Kānūn al-awwal', 'December. `كانون الأول` is the first half of another paired regional naming system continued by January.', 'word', 'ديسمبر آخر شهر في السنة.', '"December is the last month of the year" anchors year-end calendar talk.', null, [ACT.vocabMonths]),

    // Hijri months
    createContentItem('محرم', 'Muḥarram', 'Hijri month 1 — "the forbidden month". The Islamic new year falls on the 1st of Muharram.', 'word', 'السنة الهجرية تبدأ في محرم.', '"The Hijri year begins in Muharram."', null, [ACT.vocabMonths]),
    createContentItem('صفر', 'Ṣafar', 'Hijri month 2 — emphatic ص. Same word as "zero" but a proper noun here.', 'word', 'صفر هو الشهر الثاني.', '"Safar is the second month."', null, [ACT.vocabMonths]),
    createContentItem('ربيع الأول', 'Rabīʿ al-awwal', 'Hijri month 3 — "the first spring". The Prophet\'s birthday (المولد النبوي) falls on the 12th.', 'word', 'المولد النبوي في ربيع الأول.', '"The Prophet\'s birthday is in Rabi al-Awwal."', null, [ACT.vocabMonths]),
    createContentItem('ربيع الآخر / الثاني', 'Rabīʿ ath-thānī', 'Hijri month 4.', 'word', 'ربيع الثاني هو الشهر الرابع.', '"Rabi ath-Thani is the fourth month."', null, [ACT.vocabMonths]),
    createContentItem('جمادى الأولى', 'Jumādā al-ūlā', 'Hijri month 5 — feminine form because of جمادى.', 'word', 'جمادى الأولى هي الشهر الخامس.', '"Jumada al-Ula is the fifth month."', null, [ACT.vocabMonths]),
    createContentItem('جمادى الآخرة', 'Jumādā al-ākhira', 'Hijri month 6.', 'word', 'جمادى الآخرة هي الشهر السادس.', '"Jumada al-Akhira is the sixth month."', null, [ACT.vocabMonths]),
    createContentItem('رجب', 'Rajab', 'Hijri month 7 — one of the four sacred months in Islam.', 'word', 'رجب من الأشهر الحرم.', '"Rajab is one of the sacred months."', null, [ACT.vocabMonths]),
    createContentItem('شعبان', 'Shaʿbān', 'Hijri month 8 — preparation for Ramadan.', 'word', 'شعبان قبل رمضان.', '"Shaaban is before Ramadan."', null, [ACT.vocabMonths]),
    createContentItem('رمضان', 'Ramaḍān', 'Hijri month 9 — the month of fasting. The most religiously significant month. Emphatic ض mid-word.', 'word', 'رمضان شهر الصيام.', '"Ramadan is the month of fasting."', null, [ACT.vocabMonths]),
    createContentItem('شوال', 'Shawwāl', 'Hijri month 10 — begins with Eid al-Fitr (عيد الفطر) on the 1st.', 'word', 'الأول من شوال هو عيد الفطر.', '"The 1st of Shawwal is Eid al-Fitr."', null, [ACT.vocabMonths]),
    createContentItem('ذو القعدة', 'Dhū l-qaʿda', 'Hijri month 11 — a sacred month.', 'word', 'ذو القعدة من الأشهر الحرم.', '"Dhu l-Qaada is one of the sacred months."', null, [ACT.vocabMonths]),
    createContentItem('ذو الحجة', 'Dhū l-ḥijja', 'Hijri month 12 — the month of Hajj (pilgrimage). Eid al-Adha (عيد الأضحى) falls on the 10th.', 'word', 'الحج في ذي الحجة.', '"The Hajj is in Dhu l-Hijja."', null, [ACT.vocabMonths]),

    // Ordinals
    createContentItem('الأول', 'al-awwal (M) / الأولى al-ūlā (F)', '1st. Note that "first" has its own irregular form (NOT الواحد).', 'word', 'الفصل الأول · المرة الأولى', '"The first chapter · the first time."', null, [ACT.grammarOrdinals]),
    createContentItem('الثاني', 'ath-thānī (M) / الثانية ath-thāniya (F)', '2nd. Regular pattern from now on: الـ + active-participle-shape of the cardinal.', 'word', 'الفصل الثاني · المرة الثانية', '"The second chapter · the second time."', null, [ACT.grammarOrdinals]),
    createContentItem('الثالث', 'ath-thālith (M) / الثالثة ath-thālitha (F)', '3rd.', 'word', 'اليوم الثالث.', '"The third day."', null, [ACT.grammarOrdinals]),
    createContentItem('الرابع، الخامس، السادس', 'ar-rābiʿ, al-khāmis, as-sādis', '4th, 5th, 6th. Same pattern: الـ + active-participle.', 'word', 'القرن الواحد والعشرون.', '"The 21st century."', null, [ACT.grammarOrdinals]),

    // Reading
    createContentItem('جدول الأسبوع', 'jadwal al-usbūʿ', 'A student\'s weekly schedule paragraph.', 'sentence', 'يوم الأحد عندي محاضرة الرياضيات. الاثنين والثلاثاء أدرس اللغة العربية. الأربعاء محاضرة الفيزياء، والخميس مختبر. يوم الجمعة عطلة، وأذهب إلى المسجد لصلاة الجمعة. السبت أدرس في البيت.', 'Translation: "Sunday I have math lecture. Monday and Tuesday I study Arabic. Wednesday is physics lecture, and Thursday is lab. Friday is a holiday, and I go to the mosque for Friday prayer. Saturday I study at home."', null, [ACT.reading]),

    // Listening
    createContentItem('حجز موعد', 'ḥajz mawʿid', 'A 5-turn appointment-booking dialogue.', 'conversation', 'العميل: أريد حجز موعد مع الدكتور.\nالموظف: متى يناسبك؟\nالعميل: يوم الأربعاء، إذا أمكن.\nالموظف: عندي موعد فارغ في الساعة الثالثة.\nالعميل: ممتاز، شكرًا.', 'إذا أمكن idhā amkana "if possible" — polite hedge.', null, [ACT.listening]),

    // Culture
    createContentItem('التقويم الهجري', 'at-taqwīm al-hijrī', 'The Hijri (Islamic) calendar starts in 622 CE — the year of the Prophet Muhammad\'s migration (هجرة) from Mecca to Medina. Lunar; 12 months × ~29.5 days = ~354 days/year — 11 days shorter than Gregorian, so Ramadan migrates through the seasons.', 'sentence', '٢٠٢٤ ميلادي ≈ ١٤٤٥-١٤٤٦ هجري.', '"2024 CE ≈ 1445-1446 AH."', [
      { target: 'ميلادي (mīlādī)', note: 'Gregorian / "of the birth (of Christ)"' },
      { target: 'هجري (hijrī)', note: 'Hijri / "of the migration"' },
      { target: 'الجمعة', note: 'weekly holy day; weekend is Fri-Sat in Saudi Arabia and most Gulf' },
    ], [ACT.culture]),

    // Writing
    createContentItem('قالب الكتابة', 'qālab al-kitāba', 'Template: 7 sentences, one per day, describing your real weekly schedule.', 'sentence', 'مثال: يوم الأحد عندي محاضرة عربية. الاثنين أعمل في المكتبة. الثلاثاء عندي مختبر. الأربعاء أدرس مع أصدقائي. الخميس عندي اختبار. الجمعة أصلي وأرتاح. السبت أزور عائلتي.', 'Use يوم + day-name + activity for each line.', null, [ACT.writing]),

    // Task
    createContentItem('المهمة — حدد موعدًا', 'al-mahamma — ḥaddid mawʿidan', '6-turn negotiation of a study-session time with a classmate.', 'conversation', 'أ: نقابل بعض هذا الأسبوع لندرس؟\nب: متى يناسبك؟\nأ: الأربعاء أم الخميس؟\nب: الأربعاء أفضل. أي وقت؟\nأ: الساعة الرابعة بعد المحاضرات.\nب: تمام، أراك يوم الأربعاء في المكتبة.', 'تمام tamām (Egyptian/Levantine) "perfect/OK"; common loaned into MSA-light speech.', null, [ACT.task]),
  ],
};

module.exports = lesson;
