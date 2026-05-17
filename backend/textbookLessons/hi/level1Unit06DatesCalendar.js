// Level 1 Unit 6 — Dates, Days, and the Calendar (Hindi)

const createContentItem = (target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization, nativeText: note, pronunciation: romanization,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'hi-l1u6-orientation',
  pronunciation: 'hi-l1u6-pronunciation',
  vocabularyDays: 'hi-l1u6-vocab-days',
  vocabularyMonths: 'hi-l1u6-vocab-months',
  grammarOrdinals: 'hi-l1u6-grammar-ordinals',
  grammarDates: 'hi-l1u6-grammar-dates',
  grammarKabAsking: 'hi-l1u6-grammar-kab-asking',
  reading: 'hi-l1u6-reading',
  listening: 'hi-l1u6-listening',
  writing: 'hi-l1u6-writing',
  culture: 'hi-l1u6-culture',
  task: 'hi-l1u6-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Name the 7 days, 12 months, and key dates of the Hindu/Western calendar.', 'Tell dates in dd/mm/yyyy format and in Hindi: १५ अगस्त २०२६.', 'Ask and answer कब? (when?) using time markers + को.'], task: 'Talk about birthdays, holidays, and important dates with the AI tutor.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Numbers in dates', goals: ['Pronounce dates with correct schwa deletion: तीस अक्तूबर (30 Oct), not "tiisa".', 'Master ordinal endings -waaN (masc) / -wiiN (fem): पहला, दूसरा, तीसरा.', 'Roll long aa in month names: जनवरी (janavarii), मार्च (maarch), जुलाई (julaaii).'], task: 'Read 10 dates aloud with native rhythm.' },
  { id: ACT.vocabularyDays, section: 'Vocabulary I', title: 'Days of the week', goals: ['Master the 7 days: सोमवार सोम=moon-day, etc.', 'Use सोमवार को (on Monday) with the postposition.'], task: 'Schedule one activity per day of the week.' },
  { id: ACT.vocabularyMonths, section: 'Vocabulary II', title: 'Months of the year and Hindu months', goals: ['Master 12 Western months (जनवरी-दिसंबर) used in everyday Hindi.', 'Recognize 4-5 Hindu calendar months (चैत्र, वैशाख, श्रावण, कार्तिक) for festival contexts.'], task: 'Name your birthday month and key festivals\' months.' },
  { id: ACT.grammarOrdinals, section: 'Grammar I', title: 'Ordinal numbers', goals: ['Master पहला/पहली, दूसरा/दूसरी, तीसरा/तीसरी, चौथा/चौथी, पाँचवाँ/पाँचवीं.', 'After 5, use number + -वाँ/-वीं: छठा, सातवाँ, आठवाँ.'], task: 'Order 5 events using ordinals.' },
  { id: ACT.grammarDates, section: 'Grammar II', title: 'Stating dates', goals: ['Format: [number] [month] [year], e.g., १५ अगस्त १९४७.', 'Use को with specific dates: १५ अगस्त को आज़ादी मिली.'], task: 'State 5 historical dates in Hindi.' },
  { id: ACT.grammarKabAsking, section: 'Grammar III', title: 'कब? questions and answers', goals: ['Use कब as a time question word in situ.', 'Distinguish कब (when, time) from कहाँ (where, place) and कैसे (how, manner).'], task: 'Ask the AI tutor 5 कब-questions.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'A festival calendar', goals: ['Read a paragraph about 4 major Indian festivals and their dates.', 'Identify ordinal numbers and date formats.'], task: 'Read aloud and answer 5 questions.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'Planning a meeting', goals: ['Follow a dialogue setting a meeting date and time.', 'Recognize negotiation phrases: कौन सा दिन ठीक है?'], task: 'Roleplay scheduling a study session with the tutor.' },
  { id: ACT.writing, section: 'Writing', title: 'Write a year-plan', goals: ['Write 6 sentences about important dates this year for you.', 'Use ordinals and dates.'], task: 'Write your own year-plan.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Indian calendars', goals: ['Know that India uses both the Gregorian (Western) and Vikrami Samvat (Hindu) calendars.', 'Recognize the major festival sequence: Holi (Mar) → Eid → Independence Day (15 Aug) → Ganesh Chaturthi → Navaratri/Dussehra (Oct) → Diwali (Oct-Nov) → Christmas.', 'Understand that Republic Day (26 January) and Independence Day (15 August) are the two big national holidays.'], task: 'Describe your country\'s national holidays.' },
  { id: ACT.task, section: 'Task', title: 'Plan a year at IIT Delhi', goals: ['Use dates, ordinals, days to plan a semester.', 'Handle scheduling negotiations.'], task: 'Roleplay planning a semester with another student.' },
];

const lesson = {
  title: 'Level 1 · Unit 6: तारीख और कैलेंडर — Dates and Calendar',
  category: 'dates', difficulty: 'beginner', targetLang: 'hi', nativeLang: 'en', track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'stating-date', label: 'Stating a date', goal: 'Use day + month + year format with को for "on that date".' },
    { id: 'asking-when', label: 'Asking when', goal: 'Use कब? in situ for time questions.' },
    { id: 'days-of-week', label: 'Talking about weekdays', goal: 'Schedule activities by weekday.' },
  ],
  relatedPools: ['topic-time', 'topic-calendar'],
  content: [
    createContentItem('कैलेंडर', 'kailenDar', 'Hindi uses the Gregorian calendar in daily life, but Hindu festivals follow the lunar Vikrami calendar. This unit covers the Western calendar (days, months, dates) plus key Indian holiday dates.', 'word', 'Functional: तारीख बताना (state date) · कब पूछना (ask when) · दिन के नाम (names of days)', '', null, [ACT.orientation]),
    createContentItem('सोमवार', 'somvaar', 'Monday (masc). सोम = moon + वार = day. Each day is named after a celestial body in Hindu tradition.', 'word', 'सोमवार को मेरी क्लास है।', '"On Monday I have class".', null, [ACT.vocabularyDays]),
    createContentItem('मंगलवार', 'mangalvaar', 'Tuesday (masc). मंगल = Mars + वार. Considered an auspicious day for some Hindu rituals.', 'word', 'मंगलवार को हनुमान जी का दिन है।', '"Tuesday is Hanuman ji\'s day".', null, [ACT.vocabularyDays]),
    createContentItem('बुधवार', 'budhvaar', 'Wednesday (masc). बुध = Mercury + वार.', 'word', 'बुधवार को मीटिंग है।', '"On Wednesday there\'s a meeting".', null, [ACT.vocabularyDays]),
    createContentItem('गुरुवार', 'guruvaar', 'Thursday (masc). गुरु = Jupiter (also "teacher") + वार. The day of the teacher/guru.', 'word', 'गुरुवार को मैं गुरु जी से मिलता हूँ।', '"On Thursday I meet my guru".', null, [ACT.vocabularyDays]),
    createContentItem('शुक्रवार', 'shukravaar', 'Friday (masc). शुक्र = Venus + वार.', 'word', 'शुक्रवार रात को पार्टी है।', '"On Friday night there\'s a party".', null, [ACT.vocabularyDays]),
    createContentItem('शनिवार', 'shanivaar', 'Saturday (masc). शनि = Saturn + वार. Hindu tradition associates शनि with karma/discipline.', 'word', 'शनिवार आधा दिन काम होता है।', '"Saturday is a half work day".', null, [ACT.vocabularyDays]),
    createContentItem('रविवार', 'ravivaar', 'Sunday (masc). रवि = Sun + वार. The universal day off in modern India.', 'word', 'रविवार छुट्टी का दिन है।', '"Sunday is a holiday".', null, [ACT.vocabularyDays]),
    createContentItem('जनवरी', 'janavarii', 'January (fem, English loan). Used universally; Hindu calendar names rarely used in dates.', 'word', 'मेरा जन्मदिन जनवरी में है।', '"My birthday is in January".', null, [ACT.vocabularyMonths]),
    createContentItem('फ़रवरी', 'farvarii', 'February (fem). Nukta on फ़ for the f-sound.', 'word', 'फ़रवरी में Valentine\'s Day है।', '', null, [ACT.vocabularyMonths]),
    createContentItem('मार्च', 'maarch', 'March (masc, English loan). The month of Holi.', 'word', 'होली मार्च में होती है।', '"Holi happens in March".', null, [ACT.vocabularyMonths]),
    createContentItem('अप्रैल', 'aprail', 'April (masc).', 'word', 'अप्रैल १४ को बैसाखी है।', '"On April 14 is Baisakhi".', null, [ACT.vocabularyMonths]),
    createContentItem('मई', 'maii', 'May (fem). Hot month in India.', 'word', 'मई में बहुत गर्मी होती है।', '"In May it\'s very hot".', null, [ACT.vocabularyMonths]),
    createContentItem('जून', 'juun', 'June (masc). Pre-monsoon heat.', 'word', 'जून के अंत में मानसून आता है।', '"At the end of June monsoon comes".', null, [ACT.vocabularyMonths]),
    createContentItem('जुलाई', 'julaaii', 'July (fem). Peak monsoon.', 'word', 'जुलाई में ख़ूब बारिश होती है।', '"In July it rains a lot".', null, [ACT.vocabularyMonths]),
    createContentItem('अगस्त', 'agast', 'August (masc). Independence Day month.', 'word', '१५ अगस्त को स्वतंत्रता दिवस है।', '"On Aug 15 is Independence Day".', null, [ACT.vocabularyMonths]),
    createContentItem('सितंबर', 'sitambar', 'September (masc). Teacher\'s Day on the 5th.', 'word', 'सितंबर ५ को शिक्षक दिवस है।', '"Sep 5 is Teacher\'s Day".', null, [ACT.vocabularyMonths]),
    createContentItem('अक्तूबर', 'aktuubar', 'October (masc). Festival month: Navaratri, Dussehra often fall here.', 'word', 'अक्तूबर त्यौहारों का महीना है।', '"October is the month of festivals".', null, [ACT.vocabularyMonths]),
    createContentItem('नवंबर', 'navambar', 'November (masc). Diwali usually here.', 'word', 'दिवाली अक्सर नवंबर में होती है।', '"Diwali is often in November".', null, [ACT.vocabularyMonths]),
    createContentItem('दिसंबर', 'disambar', 'December (masc). Year-end, Christmas.', 'word', 'दिसंबर २५ को क्रिसमस है।', '"Dec 25 is Christmas".', null, [ACT.vocabularyMonths]),
    createContentItem('क्रमसूचक संख्याएँ', 'kramsuuchak sankhyaaeN', 'Ordinal numbers — 1st, 2nd, etc. The first five are special words; from 6th onward, add -वाँ (masc) or -वीं (fem) to the cardinal: छठा/छठी (6th), सातवाँ (7th).', 'sentence', 'पहला (1st masc) / पहली (1st fem)\nदूसरा / दूसरी (2nd)\nतीसरा / तीसरी (3rd)\nचौथा / चौथी (4th)\nपाँचवाँ / पाँचवीं (5th)\nछठा / छठी (6th)\nसातवाँ / सातवीं (7th)', 'Memorize the first five; the rest follow a regular pattern.', null, [ACT.grammarOrdinals]),
    createContentItem('तारीख का प्रारूप', 'taariikh kaa praaruup', 'Date format in Hindi: NUMBER + MONTH + YEAR, optionally + को for specific dates. १५ अगस्त १९४७ ("15 August 1947"). With को: १५ अगस्त १९४७ को भारत आज़ाद हुआ ("On Aug 15, 1947, India became free").', 'sentence', 'मेरा जन्मदिन ५ जुलाई को है।', '"My birthday is on July 5".', null, [ACT.grammarDates]),
    createContentItem('कब', 'kab', '"When" — in-situ question word. Same position as other question words. Pairs with को for date-asking: तुम्हारा जन्मदिन कब है? ("when is your birthday?").', 'sentence', 'अगली छुट्टी कब है? — २६ जनवरी को।', '"When is the next holiday? — On Jan 26 (Republic Day)".', null, [ACT.grammarKabAsking]),
    createContentItem('भारत के त्यौहार', 'bhaarat ke tyauhaar', 'A description of India\'s 4 biggest holidays and their dates.', 'sentence', 'भारत में सबसे बड़े त्यौहार दिवाली, होली, ईद, और क्रिसमस हैं। दिवाली अक्तूबर-नवंबर में आती है। होली मार्च में मनाई जाती है। ईद मुस्लिम कैलेंडर पर निर्भर करती है। क्रिसमस २५ दिसंबर को होता है। २६ जनवरी गणतंत्र दिवस और १५ अगस्त स्वतंत्रता दिवस — ये दो राष्ट्रीय छुट्टियाँ हैं।', 'Translation: "India\'s biggest festivals are Diwali, Holi, Eid, and Christmas. Diwali comes in Oct-Nov. Holi is celebrated in March. Eid depends on the Muslim calendar. Christmas is on Dec 25. Jan 26 is Republic Day and Aug 15 is Independence Day — these are the two national holidays."', null, [ACT.reading]),
    createContentItem('प्रश्न', 'prashna', 'Comprehension questions that require the learner to recover festival names, date expressions, and `कब` answers from the reading rather than simply scanning isolated vocabulary.', 'sentence', 'प्र.१: सबसे बड़े त्यौहार कौन से हैं? · प्र.२: होली कब होती है? · प्र.३: गणतंत्र दिवस की तारीख क्या है? · प्र.४: स्वतंत्रता दिवस कब मनाते हैं?', 'Answer with full date phrases where possible so the reading exercise also reinforces calendar grammar and national-holiday vocabulary.', null, [ACT.reading]),
    createContentItem('मीटिंग तय करना', 'miiTing tay karnaa', 'Two students set a study session date.', 'conversation', 'अनिल: हमें अगली मीटिंग कब करनी चाहिए?\nसारा: मंगलवार ठीक है?\nअनिल: मंगलवार को मेरी क्लास है। बुधवार?\nसारा: बुधवार को मैं फ़्री हूँ। कितने बजे?\nअनिल: शाम ५ बजे।\nसारा: ठीक है। बुधवार ५ बजे को।\nअनिल: कैफ़ेटेरिया में मिलेंगे।', '', null, [ACT.listening]),
    createContentItem('अभ्यास', 'abhyaas', 'Roleplay: schedule a study session, then change it twice.', 'conversation', 'Pattern: [day] को मिलें? — नहीं, उस दिन [reason]। [another day] को कैसा है?', '', null, [ACT.listening]),
    createContentItem('साल की योजना', 'saal kii yojanaa', 'Write 6 sentences about important dates in your year.', 'sentence', 'उदाहरण: मेरा जन्मदिन ५ जुलाई को है। अगस्त में मैं छुट्टी पर जाता हूँ। १५ अगस्त को स्वतंत्रता दिवस मनाते हैं। अक्तूबर में मेरे माता-पिता आते हैं। दिसंबर में सेमेस्टर खत्म होता है। २५ दिसंबर को क्रिसमस होता है।', '', null, [ACT.writing]),
    createContentItem('भारतीय कैलेंडर', 'bhaaratiiya kailenDar', 'India officially uses Gregorian; for religious purposes Hindu लूनार calendar (विक्रम संवत, currently year 2082-83) is used. Vikrami year started in 57 BCE. Many festivals are tithi-based (lunar dates) so they fall on different Western dates each year.', 'sentence', 'विक्रमी संवत हिन्दू कैलेंडर है।', '"Vikrami Samvat is the Hindu calendar".', null, [ACT.culture]),
    createContentItem('राष्ट्रीय छुट्टियाँ', 'raaShTriiya ChhuTTiyaaN', 'Three national holidays: २६ जनवरी (Republic Day, when constitution took effect 1950), १५ अगस्त (Independence Day from British, 1947), and २ अक्तूबर (Gandhi Jayanti, Mahatma Gandhi\'s birthday). Schools, offices, banks all close.', 'sentence', '२६ जनवरी को परेड होती है।', '"On Jan 26 there\'s a parade" — the Republic Day parade in Delhi.', null, [ACT.culture]),
    createContentItem('क्षेत्रीय त्यौहार', 'kShetriiya tyauhaar', 'Regional festivals vary: Pongal in Tamil Nadu, Baisakhi in Punjab, Onam in Kerala, Durga Puja in Bengal, Bihu in Assam. Indian "Hindu calendar" is actually multiple calendars with regional variants.', 'sentence', 'हर राज्य के अपने त्यौहार हैं।', '"Every state has its own festivals".', null, [ACT.culture]),
    createContentItem('कार्य: सेमेस्टर योजना', 'kaarya: semesTar yojanaa', 'Plan a semester with another student — set exam dates, plan trips, schedule holidays.', 'conversation', '[कैफ़ेटेरिया]\nदोस्त: मिड-सेमेस्टर कब है?\nआप: अक्तूबर के आख़िर में।\nदोस्त: फिर दिवाली पर घर जा रहे हो?\nआप: हाँ, १० नवंबर को निकलूँगा।\nदोस्त: फ़ाइनल्स कब हैं?\nआप: दिसंबर ५ से १५ तक।\nदोस्त: फिर मिलेंगे जनवरी में।', '', null, [ACT.task]),
    createContentItem('चुनौती', 'chunautii', 'Stretch: explain how Indian holidays differ from your country\'s in 3 sentences.', 'sentence', 'भारत में बहुत सारे धार्मिक त्यौहार हैं — हिन्दू, मुस्लिम, सिख, क्रिश्चियन। मेरे देश में मुख्य रूप से क्रिश्चियन त्यौहार होते हैं। यहाँ हर महीने कोई न कोई त्यौहार होता है।', '', null, [ACT.task]),
  ],
};

module.exports = lesson;
