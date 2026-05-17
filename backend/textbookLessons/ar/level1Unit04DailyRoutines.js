// Level 1 Unit 4 — Daily Routines (Modern Standard Arabic)
// Functions: present-tense verbs of daily life, time of day, frequency adverbs.

const createContentItem = (target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization, nativeText: note, pronunciation: romanization,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ar-l1u4-orientation', pronunciation: 'ar-l1u4-pronunciation',
  vocabVerbs: 'ar-l1u4-vocab-verbs', vocabTime: 'ar-l1u4-vocab-time',
  grammarPresent: 'ar-l1u4-grammar-present', grammarFreq: 'ar-l1u4-grammar-freq',
  grammarNegPresent: 'ar-l1u4-grammar-neg-present',
  reading: 'ar-l1u4-reading', listening: 'ar-l1u4-listening',
  writing: 'ar-l1u4-writing', culture: 'ar-l1u4-culture', task: 'ar-l1u4-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: ['Describe a daily routine in MSA using 12+ present-tense Form I verbs.', 'Use time-of-day expressions (صباحًا، ظهرًا، مساءً، ليلًا).', 'Use frequency adverbs (دائمًا، عادةً، أحيانًا، نادرًا، أبدًا) with the correct case.'],
    task: 'Describe your day from waking to sleeping at King Saud University.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Verb-prefix vowels', goals: ['Hear that the present-tense prefix vowel varies: yaktub (he writes) vs yashrab (he drinks) vs yadrus (he studies).', 'Apply emphatics in ظهرًا ẓuhran (noon) and صلاة ṣalāh (prayer).'], task: 'Read 8 present-tense verbs and mark the stem vowel.' },
  { id: ACT.vocabVerbs, section: 'Vocabulary I', title: 'Daily-routine verbs', goals: ['12+ Form I present-tense verbs in the 1st-person singular: أستيقظ, أصلي, أفطر, أذهب, أعمل, أعود, أتناول, أدرس, أشاهد, أنام.'], task: 'Pair each verb with the time when you typically do it.' },
  { id: ACT.vocabTime, section: 'Vocabulary II', title: 'Times of day and frequency', goals: ['Times: صباحًا، ظهرًا، عصرًا، مغربًا، عشاءً، ليلًا.', 'Frequency: دائمًا، عادةً، غالبًا، أحيانًا، نادرًا، أبدًا.'], task: 'Build 5 frequency sentences about your routine.' },
  { id: ACT.grammarPresent, section: 'Grammar I', title: 'Form I present tense — conjugation table', goals: ['Conjugate يَفْعَل for 8 persons (أنا, أنت M, أنت F, هو, هي, نحن, أنتم, هم).', 'Apply the present-tense prefix أَ يَ تَ نَ correctly.'], task: 'Conjugate كَتَبَ (to write) in the present for all 8 persons.' },
  { id: ACT.grammarFreq, section: 'Grammar II', title: 'Frequency adverbs in the accusative', goals: ['Use frequency adverbs in the accusative (manṣūb) with tanwin al-fath ـًا.', 'Place adverbs flexibly: before or after the verb.'], task: 'Convert 4 sentences from neutral to specifying frequency.' },
  { id: ACT.grammarNegPresent, section: 'Grammar III', title: 'Negation of the present with لا', goals: ['Negate any present-tense verb with لا (lā) directly before it: لا أفهم, لا يأكل اللحم.', 'Distinguish لا (present) from ما (past, archaic-MSA) from لم (past + jussive).'], task: 'Negate 6 routine verbs with لا.' },
  { id: ACT.reading, section: 'Reading', title: 'A day in the life', goals: ['Read a paragraph describing a student\'s typical day.', 'Identify each verb\'s subject from its conjugation.'], task: 'Read aloud and answer 4 time-question comprehension items.' },
  { id: ACT.listening, section: 'Listening', title: 'Comparing schedules', goals: ['Follow a 6-turn schedule-comparison dialogue.'], task: 'Compare your schedule with the AI tutor.' },
  { id: ACT.writing, section: 'Writing', title: 'Write your weekday routine', goals: ['Write 6 sentences with at least 5 different verbs.', 'Use 2 frequency adverbs.'], task: 'Write your real routine.' },
  { id: ACT.culture, section: 'Culture', title: 'Five prayers and the day\'s rhythm', goals: ['Understand how the five daily prayers (الفجر، الظهر، العصر، المغرب، العشاء) structure life in observant Muslim contexts.', 'Recognize that work hours, school schedules, and meal times in Saudi Arabia, the Gulf, and much of the Muslim world are organized around the prayer times.'], task: 'List the five prayer names with rough times.' },
  { id: ACT.task, section: 'Task', title: 'Describe a day at King Saud University', goals: ['Combine verbs, times, and frequency adverbs in a continuous 8-sentence narrative.'], task: 'Roleplay a "tell me about your day" conversation with the AI tutor.' },
];

const lesson = {
  title: 'Level 1 · Unit 4: يومي — My Daily Routine',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ar', nativeLang: 'en', track: 'textbook', lessonType: 'thematic',
  activities, expressionPractice: [
    { id: 'describing-routine', label: 'Describing routine', goal: 'String 6 present-tense verbs into a coherent daily narrative.' },
    { id: 'time-of-day', label: 'Specifying time of day', goal: 'Pair each routine activity with a time adverbial (صباحًا، ظهرًا، …).' },
    { id: 'frequency', label: 'Stating frequency', goal: 'Use دائمًا، عادةً، أحيانًا، نادرًا، أبدًا appropriately.' },
  ],
  relatedPools: ['topic-daily-life'],
  content: [
    // Verbs
    createContentItem('أستيقظ', 'astayqiẓu', 'I wake up. Form X of يَقِظَ. Emphatic ظ at the end; ست- prefix marks Form X.', 'word', 'أستيقظ في الساعة السادسة صباحًا.', '"I wake up at six in the morning."', null, [ACT.vocabVerbs]),
    createContentItem('أصلي', 'uṣallī', 'I pray. Form II of صلى. The shadda on ل — geminated. Used for the five daily prayers.', 'word', 'أصلي الفجر قبل شروق الشمس.', '"I pray Fajr before sunrise."', null, [ACT.vocabVerbs]),
    createContentItem('أفطر', 'ufṭiru', 'I eat breakfast / I break my fast. Form IV of فطر. Same word covers daily breakfast AND breaking the Ramadan fast at sunset.', 'word', 'أفطر بعد صلاة الفجر.', '"I eat breakfast after the Fajr prayer."', null, [ACT.vocabVerbs]),
    createContentItem('أذهب', 'adhhabu', 'I go. Form I of ذَهَبَ. Root ذ ه ب. Combined with إلى + place.', 'word', 'أذهب إلى الجامعة الساعة الثامنة.', '"I go to the university at eight."', null, [ACT.vocabVerbs]),
    createContentItem('أعمل', 'aʿmalu', 'I work / I do. Form I of عَمِلَ. Multipurpose verb: work, action, doing.', 'word', 'أعمل في المكتبة.', '"I work in the library."', null, [ACT.vocabVerbs]),
    createContentItem('أتناول', 'atanāwalu', 'I have (a meal). Form VI of ناول. The polite, formal verb for "eat (a meal)"; less casual than آكل.', 'word', 'أتناول الغداء في المطعم.', '"I have lunch at the restaurant."', null, [ACT.vocabVerbs]),
    createContentItem('آكل', 'ākulu', 'I eat. Form I of أَكَلَ. Note: the present 1st-person uses آ (alif madda) — āku not aʾku.', 'word', 'آكل التمر في رمضان.', '"I eat dates in Ramadan."', null, [ACT.vocabVerbs]),
    createContentItem('أشرب', 'ashrabu', 'I drink. Form I of شَرِبَ. The vowel pattern is fatha-fatha in the present (yashrab).', 'word', 'أشرب القهوة في الصباح.', '"I drink coffee in the morning."', null, [ACT.vocabVerbs]),
    createContentItem('أدرس', 'adrusu', 'I study. Form I of دَرَسَ. Root د ر س — same root as درس "lesson" and مدرسة "school".', 'word', 'أدرس اللغة العربية.', '"I study the Arabic language."', null, [ACT.vocabVerbs]),
    createContentItem('أعود', 'aʿūdu', 'I return / I come back. Form I of عَادَ. Hollow verb (middle root letter is و).', 'word', 'أعود إلى البيت في المساء.', '"I return home in the evening."', null, [ACT.vocabVerbs]),
    createContentItem('أشاهد', 'ushāhidu', 'I watch. Form III of شاهد. Used for TV, films, sports.', 'word', 'أشاهد الأخبار في التلفاز.', '"I watch the news on TV."', null, [ACT.vocabVerbs]),
    createContentItem('أقرأ', 'aqraʾu', 'I read. Form I of قَرَأَ. The verb that gives the Quran its name (literally "the recitation").', 'word', 'أقرأ كتابًا قبل النوم.', '"I read a book before sleeping."', null, [ACT.vocabVerbs]),
    createContentItem('أنام', 'anāmu', 'I sleep. Form I of نَامَ. Hollow verb.', 'word', 'أنام في الساعة الحادية عشرة.', '"I sleep at eleven o\'clock."', null, [ACT.vocabVerbs]),

    // Time
    createContentItem('صباحًا', 'ṣabāḥan', 'In the morning. Accusative form of صباح with tanwin al-fath ـًا — the adverbial accusative.', 'word', 'أعمل صباحًا.', '"I work in the morning."', null, [ACT.vocabTime]),
    createContentItem('ظهرًا', 'ẓuhran', 'At noon. Accusative of ظهر. Also the name of the noon prayer.', 'word', 'أتناول الغداء ظهرًا.', '"I have lunch at noon."', null, [ACT.vocabTime]),
    createContentItem('عصرًا', 'ʿaṣran', 'In the afternoon. Accusative of عصر. Also the name of the afternoon prayer.', 'word', 'أدرس عصرًا.', '"I study in the afternoon."', null, [ACT.vocabTime]),
    createContentItem('مساءً', 'masāʾan', 'In the evening. Accusative of مساء.', 'word', 'نلتقي مساءً.', '"We meet in the evening."', null, [ACT.vocabTime]),
    createContentItem('ليلًا', 'laylan', 'At night. Accusative of ليل.', 'word', 'أنام ليلًا.', '"I sleep at night."', null, [ACT.vocabTime]),
    createContentItem('دائمًا', 'dāʾiman', 'Always. Frequency adverb in the accusative.', 'word', 'أصلي الفجر دائمًا.', '"I always pray Fajr."', null, [ACT.vocabTime]),
    createContentItem('عادةً', 'ʿādatan', 'Usually. Accusative of عادة "habit". Common conversational frequency word.', 'word', 'عادةً أستيقظ مبكرًا.', '"I usually wake up early."', null, [ACT.vocabTime]),
    createContentItem('غالبًا', 'ghāliban', 'Most often / often. Stronger than أحيانًا but weaker than دائمًا.', 'word', 'غالبًا أعمل في المكتبة.', '"I often work in the library."', null, [ACT.vocabTime]),
    createContentItem('أحيانًا', 'aḥyānan', 'Sometimes. Accusative of أحيان (the plural of حين "moment").', 'word', 'أحيانًا أشرب الشاي.', '"Sometimes I drink tea."', null, [ACT.vocabTime]),
    createContentItem('نادرًا', 'nādiran', 'Rarely. Accusative of نادر.', 'word', 'نادرًا ما أتأخر.', '"I rarely arrive late." — نادرًا ما = "rarely that".', null, [ACT.vocabTime]),
    createContentItem('أبدًا', 'abadan', 'Never (with negation). Accusative; always paired with لا/لم: لا أدخن أبدًا.', 'word', 'لا أدخن أبدًا.', '"I never smoke."', null, [ACT.vocabTime]),

    // Grammar
    createContentItem('تصريف الفعل في المضارع', 'taṣrīf al-fiʿl fī l-muḍāriʿ', 'Present-tense conjugation table for Form I. The PREFIX marks person/number; the SUFFIX often marks mood. Pattern shown with كَتَبَ → يَكْتُب.', 'sentence', 'أنا أكتبُ · أنتَ تكتبُ · أنتِ تكتبين · هو يكتبُ · هي تكتبُ · نحن نكتبُ · أنتم تكتبون · هم يكتبون', 'Note F sg adds ـين, M pl adds ـون.', [
      { target: 'أنا أَـ', note: '1sg prefix' },
      { target: 'أنتَ تَـ', note: '2msg prefix' },
      { target: 'أنتِ تَـ + ـِين', note: '2fsg prefix + suffix' },
      { target: 'هو يَـ', note: '3msg prefix' },
      { target: 'هي تَـ', note: '3fsg prefix (same shape as 2msg)' },
      { target: 'نحن نَـ', note: '1pl prefix' },
      { target: 'أنتم تَـ + ـون', note: '2mpl prefix + suffix' },
      { target: 'هم يَـ + ـون', note: '3mpl prefix + suffix' },
    ], [ACT.grammarPresent]),
    createContentItem('حالة النصب في الظرف', 'ḥālat an-naṣb fī ẓ-ẓarf', 'Adverbials in MSA are in the accusative (manṣūb) and indefinite (tanwin al-fath ـًا). This applies to time, manner, and degree adverbs: صباحًا (in the morning), دائمًا (always), سريعًا (quickly).', 'sentence', 'صباحًا (morning) · ظهرًا (noon) · دائمًا (always) · سريعًا (quickly) · جدًا (very)', 'The tanwin al-fath ending is unmistakable — it always means an indefinite accusative adverb (or noun).', null, [ACT.grammarFreq]),
    createContentItem('النفي بـ لا', 'an-nafy bi-lā', 'Negate the present tense with لا (lā) placed directly before the verb. لا covers any general/present/habitual negation.', 'sentence', 'أفهم → لا أفهم ("I don\'t understand")\nيأكل اللحم → لا يأكل اللحم ("He doesn\'t eat meat")', 'لا ≠ ما (archaic for past) ≠ لم (past + jussive) ≠ لن (future).', null, [ACT.grammarNegPresent]),

    // Reading
    createContentItem('يومي في الجامعة', 'yawmī fī l-jāmiʿa', 'A paragraph describing a student\'s typical day at King Saud University.', 'sentence', 'أستيقظ في الساعة السادسة، وأصلي الفجر. ثم أفطر وأذهب إلى الجامعة. أحضر المحاضرات صباحًا، وأتناول الغداء في مطعم الجامعة. عصرًا أدرس في المكتبة. أعود إلى البيت مساءً، وأشاهد الأخبار. أنام في الساعة الحادية عشرة.', 'Translation summary: wake at 6, pray Fajr, breakfast, university, lectures, lunch at uni restaurant, study in afternoon, home in evening, news, sleep at 11.', [
      { target: 'ثم thumma', note: 'sequencing "then"' },
      { target: 'أحضر المحاضرات', note: '"I attend the lectures" — حضر means "attend/be present"' },
      { target: 'في الساعة الحادية عشرة', note: '"at eleven o\'clock"' },
    ], [ACT.reading]),

    // Listening
    createContentItem('مقارنة الجداول', 'muqāranat al-jadāwil', 'A 6-turn schedule-comparison dialogue.', 'conversation', 'أ: متى تستيقظ عادةً؟\nب: عادةً أستيقظ في السادسة. وأنت؟\nأ: أنا أستيقظ في السابعة. هل تشرب القهوة صباحًا؟\nب: نعم، دائمًا. والشاي أحيانًا.\nأ: متى تذهب إلى الجامعة؟\nب: عادةً في الثامنة.', 'High-frequency casual exchange among students.', null, [ACT.listening]),

    // Culture
    createContentItem('أوقات الصلاة', 'awqāt aṣ-ṣalāh', 'The five daily prayers and their rough times structure life in Saudi Arabia, the Gulf, and observant Muslim contexts everywhere. Shops close briefly at each adhān; the workday and the school day are organized around them.', 'sentence', 'الفجر (dawn) · الظهر (noon) · العصر (mid-afternoon) · المغرب (sunset) · العشاء (night)', 'Friday (الجمعة) the noon prayer is the congregational الجمعة prayer; it is a public holiday in most Arab countries.', [
      { target: 'الفجر', note: 'before sunrise; first prayer of the day' },
      { target: 'الظهر', note: 'just after noon; lunchtime prayer' },
      { target: 'العصر', note: 'mid-afternoon' },
      { target: 'المغرب', note: 'just after sunset; iftar time during Ramadan' },
      { target: 'العشاء', note: 'about 90 min after sunset' },
    ], [ACT.culture]),

    // Writing
    createContentItem('قالب الكتابة', 'qālab al-kitāba', 'Template for writing your weekday routine: 6 sentences with 5+ verbs and 2 frequency adverbs.', 'sentence', 'مثال: أستيقظ عادةً في السابعة. أفطر ثم أذهب إلى الجامعة. أدرس صباحًا وأتناول الغداء ظهرًا. عصرًا أعمل في المكتبة أحيانًا. مساءً أعود إلى البيت وأقرأ. أنام في الحادية عشرة.', 'Keep the verbs in 1st person; switch frequency and time adverbs to vary.', null, [ACT.writing]),

    // Task
    createContentItem('المهمة — احكِ يومك', 'al-mahamma — iḥki yawmak', 'Roleplay "tell me about your day" with the AI tutor. Use at least 6 verbs, 2 frequency adverbs, and 2 time-of-day adverbs.', 'conversation', 'الأستاذ: احكِ لي عن يومك المعتاد، يا [name].\nأنت: [open with morning routine, 2 verbs]\nالأستاذ: ماذا تفعل في الظهر؟\nأنت: [lunch + afternoon, 2 verbs + frequency]\nالأستاذ: وفي المساء؟\nأنت: [evening, 2 verbs + time]\nالأستاذ: ممتاز. شكرًا.', 'Aim for a fluent 8-sentence answer; the tutor will prompt for elaboration if you stop short.', null, [ACT.task]),
  ],
};

module.exports = lesson;
