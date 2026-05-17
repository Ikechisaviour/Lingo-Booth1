// Level 1 Unit 7 — Going Places (Modern Standard Arabic)
// Functions: motion verbs, destinations, modes of transport, future-with-سـ/سوف.

const createContentItem = (target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization, nativeText: note, pronunciation: romanization,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ar-l1u7-orientation', pronunciation: 'ar-l1u7-pronunciation',
  vocabMotion: 'ar-l1u7-vocab-motion', vocabTransport: 'ar-l1u7-vocab-transport',
  grammarFuture: 'ar-l1u7-grammar-future', grammarPurpose: 'ar-l1u7-grammar-purpose',
  reading: 'ar-l1u7-reading', listening: 'ar-l1u7-listening',
  writing: 'ar-l1u7-writing', culture: 'ar-l1u7-culture', task: 'ar-l1u7-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'Going places', goals: ['8 motion verbs in MSA.', 'Express future with سـ + present or سوف + present.', 'Use the purpose clause لـ + subjunctive.'], task: 'Plan a weekend trip from Riyadh.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Future-prefix سـ', goals: ['Pronounce سـ + verb without lengthening.', 'Distinguish سيذهب (he will go) from سـ as preposition.'], task: 'Read 6 future-tense verbs.' },
  { id: ACT.vocabMotion, section: 'Vocabulary I', title: 'Motion verbs', goals: ['Master يذهب, يأتي, يصل, يخرج, يدخل, يرجع, يسافر, يتحرك.'], task: 'Tell where you are going and where you came from.' },
  { id: ACT.vocabTransport, section: 'Vocabulary II', title: 'Transport modes', goals: ['Name 8 transport modes: سيارة, حافلة, قطار, طائرة, مترو, دراجة, تاكسي, سفينة.'], task: 'Choose the transport you would use for each destination.' },
  { id: ACT.grammarFuture, section: 'Grammar I', title: 'Future with سـ / سوف', goals: ['Form the future: سـ (near) or سوف (far/general) + present verb.', 'Apply correctly: سأذهب (I will go), سوف أذهب (I will go, more deliberate).'], task: 'Convert 6 present sentences to future.' },
  { id: ACT.grammarPurpose, section: 'Grammar II', title: 'Purpose with لـ + subjunctive', goals: ['Express purpose: أذهب إلى الجامعة لأدرس ("I go to university (in order) to study").', 'Conjugate the subjunctive mood: لأَدْرُسَ (instead of لأَدْرُسُ).'], task: 'Build 4 purpose sentences.' },
  { id: ACT.reading, section: 'Reading', title: 'A weekend trip to Mecca', goals: ['Read a paragraph planning a weekend trip.'], task: 'Answer 4 comprehension questions.' },
  { id: ACT.listening, section: 'Listening', title: 'Buying a bus ticket', goals: ['Follow a 5-turn ticket-buying dialogue.'], task: 'Buy your own ticket.' },
  { id: ACT.writing, section: 'Writing', title: 'Plan a trip', goals: ['Write 5 future sentences about an upcoming trip.'], task: 'Plan a real or imagined weekend trip.' },
  { id: ACT.culture, section: 'Culture', title: 'Travel by car culture in the Gulf', goals: ['Understand the car-centric culture in Saudi Arabia, the Gulf, and large cities.', 'Note the rise of metro systems in Dubai, Riyadh, and Cairo.'], task: 'Compare a Gulf city to your hometown for transport.' },
  { id: ACT.task, section: 'Task', title: 'Plan a weekend trip', goals: ['Plan a 6-turn weekend trip with the AI tutor.'], task: 'Negotiate destination, transport, departure time, and activities.' },
];

const lesson = {
  title: 'Level 1 · Unit 7: نذهب إلى ... — Going Places',
  category: 'travel', difficulty: 'beginner',
  targetLang: 'ar', nativeLang: 'en', track: 'textbook', lessonType: 'thematic',
  activities, expressionPractice: [
    { id: 'expressing-future', label: 'Expressing future', goal: 'Use سـ + verb for plans.' },
    { id: 'naming-transport', label: 'Naming transport', goal: 'Pair destination with appropriate transport.' },
    { id: 'purpose', label: 'Purpose clauses', goal: 'Add لـ + subjunctive to explain why.' },
  ],
  relatedPools: ['topic-travel'],
  content: [
    createContentItem('يذهب', 'yadhhabu', 'He goes / is going. Form I of ذَهَبَ. The standard motion verb; pair with إلى + destination.', 'word', 'يذهب إلى الجامعة كل يوم.', '"He goes to the university every day."', null, [ACT.vocabMotion]),
    createContentItem('يأتي', 'yaʾtī', 'He comes. Form I of أَتَى. The hamza in the middle.', 'word', 'يأتي من البيت.', '"He comes from home." — مِن "from".', null, [ACT.vocabMotion]),
    createContentItem('يصل', 'yaṣilu', 'He arrives. Form I of وَصَلَ — the وـ drops in the present. Emphatic ص.', 'word', 'يصل القطار في الساعة الثامنة.', '"The train arrives at eight o\'clock."', null, [ACT.vocabMotion]),
    createContentItem('يخرج', 'yakhruju', 'He goes out / exits. Form I of خَرَجَ. Velar fricative خ at the start.', 'word', 'أخرج من البيت في السابعة.', '"I leave the house at seven."', null, [ACT.vocabMotion]),
    createContentItem('يدخل', 'yadkhulu', 'He enters. Form I of دَخَلَ.', 'word', 'يدخل المختبر بهدوء.', '"He enters the lab quietly."', null, [ACT.vocabMotion]),
    createContentItem('يرجع', 'yarjiʿu', 'He returns. Form I of رَجَعَ. The pharyngeal ع at the end.', 'word', 'أرجع إلى البيت مساءً.', '"I return home in the evening."', null, [ACT.vocabMotion]),
    createContentItem('يسافر', 'yusāfiru', 'He travels (long-distance). Form III of سافر.', 'word', 'سيسافر إلى دبي غدًا.', '"He will travel to Dubai tomorrow."', null, [ACT.vocabMotion]),
    createContentItem('يتحرك', 'yataḥarraku', 'He moves / sets off. Form V of حرّك. Pharyngeal ح + shadda on ر.', 'word', 'الحافلة تتحرك الآن.', '"The bus is moving now."', null, [ACT.vocabMotion]),
    createContentItem('يمشي', 'yamshī', 'He walks. Form I of مشى. The kasra + ي gives long /iː/.', 'word', 'أحب أن أمشي في الحديقة.', '"I love to walk in the garden."', null, [ACT.vocabMotion]),
    createContentItem('يركب', 'yarkabu', 'He rides / boards. Used for any vehicle: يركب السيارة, يركب الحافلة, يركب الطائرة.', 'word', 'أركب الحافلة كل صباح.', '"I take the bus every morning."', null, [ACT.vocabMotion]),

    // Transport
    createContentItem('سيارة', 'sayyāra', 'Car (F). Plural سيارات sayyārāt. From the root س ي ر "moving".', 'word', 'أقود السيارة إلى العمل.', '"I drive the car to work."', null, [ACT.vocabTransport]),
    createContentItem('حافلة', 'ḥāfila', 'Bus (F). The MSA word; Egyptian colloquial uses أوتوبيس. Pharyngeal ح.', 'word', 'الحافلة رقم خمسة تذهب إلى المركز.', '"Bus number five goes downtown."', null, [ACT.vocabTransport]),
    createContentItem('قطار', 'qiṭār', 'Train (M). Plural قطارات qiṭārāt. Uvular ق, emphatic ط.', 'word', 'القطار السريع بين مكة والمدينة.', '"The high-speed train between Mecca and Medina."', null, [ACT.vocabTransport]),
    createContentItem('طائرة', 'ṭāʾira', 'Airplane (F). Plural طائرات ṭāʾirāt. Emphatic ط at the start.', 'word', 'سأركب الطائرة إلى القاهرة.', '"I will board the airplane to Cairo."', null, [ACT.vocabTransport]),
    createContentItem('مترو', 'mitrū', 'Metro / subway (M). Loanword. Cairo, Dubai, Riyadh, Doha all have one.', 'word', 'مترو الرياض جديد.', '"The Riyadh metro is new."', null, [ACT.vocabTransport]),
    createContentItem('تاكسي / سيارة أجرة', 'tāksī / sayyārat ujra', 'Taxi (M). Two forms: تاكسي loanword, سيارة أجرة "car of fare" (formal MSA).', 'word', 'سأطلب تاكسي.', '"I will call a taxi."', null, [ACT.vocabTransport]),
    createContentItem('دراجة', 'darrāja', 'Bicycle (F). Plural دراجات. With motor: دراجة نارية ("fire-bike", motorcycle).', 'word', 'أركب الدراجة في الحديقة.', '"I ride the bike in the garden."', null, [ACT.vocabTransport]),
    createContentItem('سفينة', 'safīna', 'Ship (F). Plural سفن sufun. Pattern فعينة.', 'word', 'السفينة في الميناء.', '"The ship is at the port."', null, [ACT.vocabTransport]),

    // Grammar Future
    createContentItem('السين والسوف', 'as-sīn wa-s-sawf', 'Future marker: prefix سـ to the present-tense verb (near future, immediate intention), or use سوف before the verb (more general / distant future). Both yield future meaning.', 'sentence', 'أذهب → سأذهب (I will go, near) / سوف أذهب (I will go, general)\nيدرس → سيدرس / سوف يدرس', 'In colloquial only the prefix سـ is used; سوف is more formal/literary.', [
      { target: 'سـ + present', note: 'near or definite future' },
      { target: 'سوف + present', note: 'general or more distant future; more formal' },
    ], [ACT.grammarFuture]),
    createContentItem('لـ + المضارع المنصوب', 'li- + al-muḍāriʿ al-manṣūb', 'Purpose clause: لـ ("in order to") + the subjunctive mood of the present verb. The subjunctive replaces the indicative final damma with fatha: يَدْرُسُ (indicative, "studies") → لِيَدْرُسَ (subjunctive, "in order to study").', 'sentence', 'أذهب إلى المكتبة لأقرأَ. ("I go to the library to read.")\nسافر إلى أمريكا ليتعلمَ الإنجليزية. ("He traveled to America to learn English.")', 'Subjunctive triggers: أن (that), لـ (in order to), كي (so that), حتى (until/so that), لن (will not).', null, [ACT.grammarPurpose]),

    // Reading
    createContentItem('رحلة إلى مكة', 'riḥla ilā Makka', 'A paragraph planning a weekend trip to Mecca from Riyadh.', 'sentence', 'في عطلة نهاية الأسبوع، سأسافر إلى مكة المكرمة لأؤدي العمرة. سأركب الطائرة من الرياض إلى جدة. ثم سأركب الحافلة من جدة إلى مكة. سأبقى يومين في مكة، ثم أرجع إلى الرياض يوم الأحد.', 'Translation: "On the weekend, I will travel to Mecca to perform Umrah. I will board the plane from Riyadh to Jeddah. Then I will take the bus from Jeddah to Mecca. I will stay two days in Mecca, then return to Riyadh on Sunday."', [
      { target: 'عطلة نهاية الأسبوع', note: '"weekend" — literally "holiday of the end of the week"' },
      { target: 'لأؤدي العمرة', note: '"to perform Umrah" — purpose clause with subjunctive' },
      { target: 'يومين', note: 'dual of يوم "day"; "two days"' },
    ], [ACT.reading]),

    // Listening
    createContentItem('شراء تذكرة الحافلة', 'shirāʾ tadhkirat al-ḥāfila', 'A 5-turn bus-ticket-buying dialogue.', 'conversation', 'الراكب: تذكرة إلى جدة، لو سمحت.\nالموظف: ذهاب فقط أم ذهاب وعودة؟\nالراكب: ذهاب وعودة.\nالموظف: مئتان وخمسون ريالًا.\nالراكب: تفضل. متى تتحرك الحافلة؟\nالموظف: الساعة العاشرة صباحًا.', 'ذهاب وعودة "go and return" = round trip; ذهاب فقط = one way.', null, [ACT.listening]),

    // Writing
    createContentItem('قالب الكتابة', 'qālab al-kitāba', 'Template: 5 future sentences planning a trip.', 'sentence', 'مثال: سأسافر إلى دبي يوم الجمعة. سأركب الطائرة من الرياض. سأبقى ثلاثة أيام. سأزور البرج الكبير. سأرجع يوم الاثنين.', 'Use سـ + verb in every sentence; vary the verbs.', null, [ACT.writing]),

    // Culture
    createContentItem('ثقافة السيارة في الخليج', 'thaqāfat as-sayyāra fī l-Khalīj', 'Saudi Arabia and the Gulf are heavily car-centric: subsidized gasoline, vast highway networks, and traditionally limited public transit. This is rapidly changing — Riyadh\'s metro opened in 2024, Dubai\'s in 2009, and Doha\'s in 2019. Women in Saudi Arabia have been allowed to drive since 2018.', 'sentence', 'في الخليج، السيارة وسيلة المواصلات الأساسية.', '"In the Gulf, the car is the primary means of transport."', null, [ACT.culture]),

    // Task
    createContentItem('المهمة — تخطيط رحلة', 'al-mahamma — takhṭīṭ riḥla', '6-turn weekend trip planning dialogue.', 'conversation', 'الصديق: إلى أين نسافر هذا الأسبوع؟\nأنت: [اقترح وجهة]\nالصديق: كيف نذهب؟\nأنت: [اختر وسيلة + سبب]\nالصديق: متى نتحرك؟\nأنت: [حدد وقت]\nالصديق: ممتاز! ماذا سنفعل هناك؟\nأنت: [اذكر نشاطين]', 'Use سـ-future throughout; add a purpose clause لـ at least once.', null, [ACT.task]),
  ],
};

module.exports = lesson;
