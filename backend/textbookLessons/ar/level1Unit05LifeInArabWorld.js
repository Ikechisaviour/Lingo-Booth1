// Level 1 Unit 5 — Life in the Arab World (Modern Standard Arabic)
// Functions: describing places, food, climate, customs across Arab countries.

const createContentItem = (target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization, nativeText: note, pronunciation: romanization,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ar-l1u5-orientation', pronunciation: 'ar-l1u5-pronunciation',
  vocabCountries: 'ar-l1u5-vocab-countries', vocabLife: 'ar-l1u5-vocab-life',
  grammarAdj: 'ar-l1u5-grammar-adj', grammarDual: 'ar-l1u5-grammar-dual',
  grammarKana: 'ar-l1u5-grammar-kana',
  reading: 'ar-l1u5-reading', listening: 'ar-l1u5-listening',
  writing: 'ar-l1u5-writing', culture: 'ar-l1u5-culture', task: 'ar-l1u5-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'Life across the Arab world',
    goals: ['Name 15+ Arab countries with their capitals and nisba adjectives.', 'Describe climate and food differences across regions.', 'Use the dual (مُثَنَّى) for paired things (eyes, hands, two countries).'],
    task: 'Survey the 22 Arab countries — their capitals, languages, and one cultural feature each.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'City names', goals: ['Pronounce القاهرة, الرياض, الدوحة, الجزائر, الخرطوم correctly.', 'Apply sun-letter rule on city names with الـ.'], task: 'Read 10 capital names with correct emphatics and pharyngeals.' },
  { id: ACT.vocabCountries, section: 'Vocabulary I', title: 'Arab countries and capitals', goals: ['Memorize 15 countries with capitals.'], task: 'Pair each country with its capital and nisba.' },
  { id: ACT.vocabLife, section: 'Vocabulary II', title: 'Life vocabulary', goals: ['12 nouns about climate, food, dress.'], task: 'Describe daily life in 3 different Arab countries.' },
  { id: ACT.grammarAdj, section: 'Grammar I', title: 'Adjective agreement', goals: ['Agree adjectives in definiteness, gender, number, and case.', 'Apply the "agreement-with-non-human-plurals as feminine-singular" rule.'], task: 'Modify 6 nouns with appropriately-agreed adjectives.' },
  { id: ACT.grammarDual, section: 'Grammar II', title: 'The dual (المثنى)', goals: ['Form the dual: noun + ـان (nom) / ـين (acc/gen).', 'Use the dual for exactly two of anything — eyes, hands, two countries, two students.'], task: 'Convert 5 plurals into duals.' },
  { id: ACT.grammarKana, section: 'Grammar III', title: 'كان and the past nominal sentence', goals: ['Use كان to push a nominal sentence into the past: كان الطقس حارًا ("the weather WAS hot").', 'Apply the accusative case on the predicate after كان.'], task: 'Convert 4 present nominal sentences to past with كان.' },
  { id: ACT.reading, section: 'Reading', title: 'A tour of the Arab world', goals: ['Read a paragraph describing 4 Arab cities.'], task: 'Read and answer 4 location questions.' },
  { id: ACT.listening, section: 'Listening', title: 'Comparing two countries', goals: ['Follow a dialogue comparing Egypt and Saudi Arabia.'], task: 'Reproduce with two countries of your choice.' },
  { id: ACT.writing, section: 'Writing', title: 'Describe an Arab city', goals: ['Write 5 sentences about an Arab city using adj agreement.'], task: 'Choose a city; describe.' },
  { id: ACT.culture, section: 'Culture', title: 'The diversity of the Arab world', goals: ['Understand the geographic spread (Atlantic to Gulf), 22 countries, ~400M speakers.', 'Recognize regional dialect families: Maghrebi, Egyptian, Levantine, Mesopotamian, Gulf.'], task: 'Sketch a map of the 5 dialect zones.' },
  { id: ACT.task, section: 'Task', title: 'Present an Arab country', goals: ['Give a 1-minute oral summary of an Arab country.'], task: 'Roleplay a presentation about a country.' },
];

const lesson = {
  title: 'Level 1 · Unit 5: في العالم العربي — Life in the Arab World',
  category: 'culture', difficulty: 'beginner',
  targetLang: 'ar', nativeLang: 'en', track: 'textbook', lessonType: 'thematic',
  activities, expressionPractice: [
    { id: 'naming-countries', label: 'Naming countries', goal: 'Pair each Arab country with capital + nisba.' },
    { id: 'comparing', label: 'Comparing', goal: 'Use أكثر / أقل + adjective to compare.' },
    { id: 'describing-culture', label: 'Describing culture', goal: '5-sentence description of one Arab country.' },
  ],
  relatedPools: ['topic-culture', 'topic-geography'],
  content: [
    createContentItem('العالم العربي', 'al-ʿālam al-ʿarabī', 'The Arab world — 22 countries from Morocco to Oman, spanning Africa and West Asia. About 400 million Arabic speakers. ʿAyn at the start of both words.', 'word', 'العالم العربي مساحته واسعة.', '"The Arab world has a vast area."', null, [ACT.orientation]),
    createContentItem('مصر / القاهرة', 'Miṣr / al-Qāhira', 'Egypt — capital Cairo. ~110 million people, the most-populous Arab country. The Egyptian dialect is the most-understood across the Arab world due to media reach.', 'word', 'القاهرة عاصمة مصر.', '"Cairo is the capital of Egypt."', null, [ACT.vocabCountries]),
    createContentItem('السعودية / الرياض', 'as-Saʿūdiyya / ar-Riyāḍ', 'Saudi Arabia — capital Riyadh. Birthplace of Islam (Mecca المكرمة and Medina المنورة). Home to King Saud University, our anchor.', 'word', 'الرياض عاصمة المملكة العربية السعودية.', '"Riyadh is the capital of the Kingdom of Saudi Arabia."', null, [ACT.vocabCountries]),
    createContentItem('الإمارات / أبوظبي', 'al-Imārāt / Abū Ẓabī', 'UAE — capital Abu Dhabi (literally "father of the gazelle"); biggest city Dubai (دبي). Federation of 7 emirates.', 'word', 'دبي أكبر مدن الإمارات.', '"Dubai is the largest of the UAE\'s cities."', null, [ACT.vocabCountries]),
    createContentItem('قطر / الدوحة', 'Qaṭar / ad-Dawḥa', 'Qatar — capital Doha. Small Gulf country; hosts Al Jazeera and the 2022 World Cup.', 'word', 'الدوحة مدينة حديثة.', '"Doha is a modern city."', null, [ACT.vocabCountries]),
    createContentItem('الكويت', 'al-Kuwait', 'Kuwait — country and capital share the name. The ك moon letter (no assimilation in الكويت).', 'word', 'الكويت دولة صغيرة وغنية.', '"Kuwait is a small and rich country."', null, [ACT.vocabCountries]),
    createContentItem('عُمان / مسقط', 'ʿUmān / Masqaṭ', 'Oman — capital Muscat. Pharyngeal ع at the start.', 'word', 'مسقط على ساحل البحر.', '"Muscat is on the sea coast."', null, [ACT.vocabCountries]),
    createContentItem('البحرين / المنامة', 'al-Baḥrayn / al-Manāma', 'Bahrain — capital Manama. The name البحرين is a dual: "the two seas".', 'word', 'البحرين جزيرة في الخليج.', '"Bahrain is an island in the Gulf."', null, [ACT.vocabCountries]),
    createContentItem('الأردن / عَمَّان', 'al-Urdun / ʿAmmān', 'Jordan — capital Amman. Note the shadda on م in ʿAmmān.', 'word', 'عمان عاصمة الأردن.', '"Amman is the capital of Jordan."', null, [ACT.vocabCountries]),
    createContentItem('لبنان / بيروت', 'Lubnān / Bayrūt', 'Lebanon — capital Beirut.', 'word', 'بيروت مدينة الثقافة.', '"Beirut is the city of culture."', null, [ACT.vocabCountries]),
    createContentItem('سوريا / دمشق', 'Sūriyā / Dimashq', 'Syria — capital Damascus, one of the oldest continuously inhabited cities in the world.', 'word', 'دمشق من أقدم المدن.', '"Damascus is among the oldest cities."', null, [ACT.vocabCountries]),
    createContentItem('فلسطين / القدس', 'Filasṭīn / al-Quds', 'Palestine — Jerusalem (al-Quds, "the Holy"). Religious significance for Muslims, Christians, and Jews.', 'word', 'القدس مدينة مقدسة.', '"Jerusalem is a holy city."', null, [ACT.vocabCountries]),
    createContentItem('العراق / بغداد', 'al-ʿIrāq / Baghdād', 'Iraq — capital Baghdad. Heart of the medieval Abbasid Caliphate.', 'word', 'بغداد مدينة عريقة.', '"Baghdad is an ancient city."', null, [ACT.vocabCountries]),
    createContentItem('اليمن / صنعاء', 'al-Yaman / Ṣanʿāʾ', 'Yemen — capital Sanaa. The hamza at the end of صنعاء is the final glottal stop.', 'word', 'صنعاء مدينة جبلية.', '"Sanaa is a mountainous city."', null, [ACT.vocabCountries]),
    createContentItem('المغرب / الرباط', 'al-Maghrib / ar-Ribāṭ', 'Morocco — capital Rabat. The name المغرب means "the West" (where the sun sets).', 'word', 'المغرب في شمال إفريقيا.', '"Morocco is in North Africa."', null, [ACT.vocabCountries]),
    createContentItem('الجزائر', 'al-Jazāʾir', 'Algeria — country and capital share the name. Means "the islands".', 'word', 'الجزائر أكبر دولة عربية مساحةً.', '"Algeria is the largest Arab country by area."', null, [ACT.vocabCountries]),
    createContentItem('تونس', 'Tūnis', 'Tunisia — country and capital share the name.', 'word', 'تونس بلد صغير وجميل.', '"Tunisia is a small and beautiful country."', null, [ACT.vocabCountries]),
    createContentItem('ليبيا / طرابلس', 'Lībiyā / Ṭarābulus', 'Libya — capital Tripoli. Emphatic ط at the start of طرابلس.', 'word', 'طرابلس على البحر المتوسط.', '"Tripoli is on the Mediterranean."', null, [ACT.vocabCountries]),
    createContentItem('السودان / الخرطوم', 'as-Sūdān / al-Kharṭūm', 'Sudan — capital Khartoum. Velar fricative خ at the start of الخرطوم.', 'word', 'الخرطوم عند ملتقى النيلين.', '"Khartoum is at the confluence of the two Niles."', null, [ACT.vocabCountries]),

    // Vocab life
    createContentItem('حار', 'ḥārr', 'Hot (M). Plain شدّة on the ر. Used for weather and food. Pharyngeal ح.', 'word', 'الطقس حار في الصيف.', '"The weather is hot in summer."', null, [ACT.vocabLife]),
    createContentItem('بارد', 'bārid', 'Cold (M). Active participle pattern فاعِل.', 'word', 'الجو بارد في الجبال.', '"The weather is cold in the mountains."', null, [ACT.vocabLife]),
    createContentItem('معتدل', 'muʿtadil', 'Moderate (M). Used for climate and behavior.', 'word', 'الجو معتدل في الربيع.', '"The weather is moderate in spring."', null, [ACT.vocabLife]),
    createContentItem('صحراء', 'ṣaḥrāʾ', 'Desert (F). Plural صحارى ṣaḥārā.', 'word', 'الصحراء الكبرى في إفريقيا.', '"The Great Sahara is in Africa."', null, [ACT.vocabLife]),
    createContentItem('بحر', 'baḥr', 'Sea (M). Plural بحار biḥār. The pharyngeal ح.', 'word', 'البحر الأحمر بين مصر والسعودية.', '"The Red Sea is between Egypt and Saudi Arabia."', null, [ACT.vocabLife]),
    createContentItem('نهر', 'nahr', 'River (M). Plural أنهار anhār. The Nile = نهر النيل.', 'word', 'نهر النيل أطول نهر في العالم.', '"The Nile is the longest river in the world."', null, [ACT.vocabLife]),
    createContentItem('جبل', 'jabal', 'Mountain (M). Plural جبال jibāl. Many Arab city names start with جبل (Jebel Ali, Jabal an-Nūr).', 'word', 'جبل النور في مكة.', '"Mount Nūr is in Mecca."', null, [ACT.vocabLife]),
    createContentItem('تمر', 'tamr', 'Dates (collective M). The signature food of Arab desert culture; eaten daily and especially during Ramadan.', 'word', 'نأكل التمر قبل الإفطار في رمضان.', '"We eat dates before iftar in Ramadan."', null, [ACT.vocabLife]),
    createContentItem('قهوة', 'qahwa', 'Coffee (F). The Arabic word that English "coffee" comes from. Arabic coffee (قهوة عربية) is cardamom-spiced and central to hospitality.', 'word', 'القهوة العربية رمز الكرم.', '"Arabic coffee is a symbol of generosity."', null, [ACT.vocabLife]),
    createContentItem('شاي', 'shāy', 'Tea (M). The Maghreb prefers mint tea (الشاي بالنعناع); the Gulf prefers black tea.', 'word', 'الشاي بالنعناع شائع في المغرب.', '"Mint tea is common in Morocco."', null, [ACT.vocabLife]),
    createContentItem('خبز', 'khubz', 'Bread (M). Eaten with nearly every meal. Regional varieties: كماج kumāj (Levantine), خبز عربي khubz ʿarabī (pita-style).', 'word', 'الخبز العربي رقيق وطري.', '"Arabic bread is thin and soft."', null, [ACT.vocabLife]),
    createContentItem('ثوب', 'thawb', 'Thawb — the traditional ankle-length men\'s robe of the Gulf. In Saudi Arabia worn daily by most local men.', 'word', 'يلبس الرجل الثوب الأبيض.', '"The man wears the white thawb."', null, [ACT.vocabLife]),
    createContentItem('عباءة', 'ʿabāʾa', 'Abaya — the loose black overgarment worn by many women in the Gulf. Pharyngeal ع at the start.', 'word', 'العباءة لباس تقليدي.', '"The abaya is traditional dress."', null, [ACT.vocabLife]),
    createContentItem('حجاب', 'ḥijāb', 'Headscarf / Islamic head covering. Pharyngeal ح.', 'word', 'تلبس الحجاب باختيارها.', '"She wears the hijab by her own choice."', null, [ACT.vocabLife]),

    // Grammar
    createContentItem('مطابقة الصفة', 'muṭābaqat aṣ-ṣifa', 'Adjective agreement: an adjective must agree with its noun in 4 features — DEFINITENESS (الـ or not), GENDER (M/F), NUMBER (sg/du/pl), and CASE (raf\'/nasb/jarr). Special rule: NON-HUMAN PLURALS take FEMININE SINGULAR adjective agreement.', 'sentence', 'كتاب جديد kitāb jadīd (a new book — both indef M sg)\nالكتاب الجديد al-kitāb al-jadīd (the new book — both def M sg)\nكتب جديدة kutub jadīda ("new books"-NON-HUMAN PL → fem sg adj!)\nطلاب أمريكيون ṭullāb amrīkiyyūn ("American students" — human pl, sound masc pl adj)', 'The non-human-plural rule is a hallmark of Arabic agreement; English speakers must drill it.', [
      { target: 'human plural', note: 'adj in plural form (sound masc/fem plural or broken plural)' },
      { target: 'non-human plural', note: 'adj in FEMININE SINGULAR form — كتب جديدة, لا كتب جدد' },
    ], [ACT.grammarAdj]),
    createContentItem('المثنى', 'al-muthannā', 'The dual — Arabic\'s third number, used for EXACTLY TWO of anything. Form: noun + ـان (nominative) or ـين (accusative/genitive). Falls between singular and plural.', 'sentence', 'كتاب → كتابان (two books, nom) → كتابين (two books, acc/gen)\nطالب → طالبان · طالبة → طالبتان (note ـة + ـان = ـتان)', 'In colloquial speech the accusative form ـين covers all uses; MSA writing still observes the case distinction.', [
      { target: 'nominative ـان', note: 'used when the dual is subject of a sentence' },
      { target: 'accusative/genitive ـين', note: 'used after verbs (as object) or prepositions' },
      { target: 'feminine ـة → ـتان', note: 'taa marbuta opens up to ـت before the dual ending' },
    ], [ACT.grammarDual]),
    createContentItem('كان وأخواتها', 'kāna wa-akhawātuhā', 'كان ("was/were") is the past-tense copula. Use it to push a nominal sentence into the past. The PREDICATE after كان takes the accusative case, just like after ليس.', 'sentence', 'الطقس حار (present: "the weather is hot")\nكان الطقس حارًا (past: "the weather was hot" — note accusative ـًا)', 'The "sisters" of كان (أخوات كان) are a class of verbs that take an accusative predicate: كان, ليس, صار, أصبح, ظل, بقي, ما زال.', null, [ACT.grammarKana]),

    // Reading
    createContentItem('جولة في العالم العربي', 'jawla fī l-ʿālam al-ʿarabī', 'A tour paragraph describing four Arab cities.', 'sentence', 'القاهرة مدينة كبيرة جدًا، عاصمة مصر، وفيها أهرامات الجيزة. الرياض عاصمة المملكة العربية السعودية، وهي مدينة حديثة في وسط الصحراء. بيروت مدينة جميلة على البحر المتوسط، عاصمة لبنان. مراكش مدينة تاريخية في المغرب، فيها أسواق قديمة وحدائق رائعة.', 'Translation: "Cairo is a very big city, capital of Egypt, with the Giza pyramids. Riyadh is the capital of Saudi Arabia, a modern city in the middle of the desert. Beirut is a beautiful city on the Mediterranean, capital of Lebanon. Marrakech is a historic city in Morocco, with old souks and wonderful gardens."', null, [ACT.reading]),

    // Listening
    createContentItem('مقارنة بين مصر والسعودية', 'muqārana bayna Miṣr wa-s-Saʿūdiyya', 'A comparison dialogue between an Egyptian and a Saudi student.', 'conversation', 'المصرية: الطقس في القاهرة حار صيفًا وبارد شتاءً.\nالسعودي: الرياض حارة جدًا في الصيف، خمسون درجة أحيانًا!\nالمصرية: ماذا تأكلون عادةً؟\nالسعودي: نأكل الكبسة والتمر. وأنتم؟\nالمصرية: نأكل الفول والطعمية في الفطور.\nالسعودي: لذيذ!', 'كبسة kabsa — the iconic Saudi rice-with-meat dish. فول fūl — Egyptian breakfast staple of stewed fava beans.', null, [ACT.listening]),

    // Writing
    createContentItem('قالب الكتابة', 'qālab al-kitāba', 'Template: 5 sentences describing one Arab city with adj agreement.', 'sentence', 'مثال: الرياض مدينة كبيرة وحديثة. عاصمة السعودية. الطقس فيها حار في الصيف. الناس فيها كرماء. أحب جامعة الملك سعود في وسط المدينة.', 'Adjectives must agree: مدينة كبيرة (F sg adj after F sg noun); الناس كرماء (human plural adj after human plural noun).', null, [ACT.writing]),

    // Culture
    createContentItem('تنوع العالم العربي', 'tanawwuʿ al-ʿālam al-ʿarabī', 'The Arab world is geographically vast (Atlantic to Gulf) and culturally diverse: Maghrebi (Morocco/Algeria/Tunisia/Libya), Egyptian, Levantine (Syria/Lebanon/Jordan/Palestine), Iraqi, Gulf, Yemeni. Shared MSA + Quran; very different colloquials.', 'sentence', '٢٢ دولة، ٥ مناطق لهجية رئيسية، ٤٠٠ مليون متحدث.', '"22 countries, 5 main dialect regions, 400 million speakers."', [
      { target: 'Maghrebi', note: 'Morocco, Algeria, Tunisia, Libya — heaviest Berber substrate; hardest for easterners to understand' },
      { target: 'Egyptian', note: 'most-understood dialect due to films and media' },
      { target: 'Levantine', note: 'Syria, Lebanon, Jordan, Palestine — sweet-sounding, often used in songs' },
      { target: 'Gulf', note: 'Saudi, Kuwaiti, Qatari, Emirati, Bahraini, Omani' },
      { target: 'Mesopotamian', note: 'Iraqi — distinctive vocabulary; close to Gulf' },
    ], [ACT.culture]),

    // Task
    createContentItem('المهمة — تقديم بلد عربي', 'al-mahamma — taqdīm balad ʿarabī', 'Roleplay a 1-minute presentation about an Arab country. Include capital, population (approximate), climate, one famous dish, and one cultural feature.', 'conversation', 'الأستاذ: قدّم لنا بلدًا عربيًا.\nأنت: سأقدم [البلد]. عاصمته [العاصمة]. عدد السكان [الرقم] مليون تقريبًا. الطقس [وصف]. أشهر طعام [الأكل]. الناس [وصف الثقافة]. شكرًا.', 'Aim for 6+ sentences with adj agreement and at least one إضافة.', null, [ACT.task]),
  ],
};

module.exports = lesson;
