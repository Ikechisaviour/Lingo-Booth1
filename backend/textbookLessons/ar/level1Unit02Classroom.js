// Level 1 Unit 2 — Classroom Language (Modern Standard Arabic)
// Functions: classroom objects, instructions, asking what something is,
// describing location, demonstratives (هذا/هذه/ذلك/تلك), polite requests.
// Anchor: King Saud University classroom in Riyadh.

const createContentItem = (
  target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = [],
) => ({
  type, activityIds,
  targetText: target, romanization, nativeText: note, pronunciation: romanization,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ar-l1u2-orientation',
  pronunciation: 'ar-l1u2-pronunciation',
  vocabObjects: 'ar-l1u2-vocab-objects',
  vocabInstructions: 'ar-l1u2-vocab-instructions',
  grammarDemonstratives: 'ar-l1u2-grammar-demonstratives',
  grammarDefiniteArticle: 'ar-l1u2-grammar-definite-article',
  grammarImperatives: 'ar-l1u2-grammar-imperatives',
  reading: 'ar-l1u2-reading',
  listening: 'ar-l1u2-listening',
  writing: 'ar-l1u2-writing',
  culture: 'ar-l1u2-culture',
  task: 'ar-l1u2-task',
};

const activities = [
  {
    id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: [
      'Name 20+ everyday classroom objects in MSA with correct gender (mostly feminine if ending in ـة, mostly masculine otherwise).',
      'Use demonstratives هذا/هذه (this) and ذلك/تلك (that) to point things out, with full gender agreement.',
      'Understand and use 10 classroom imperatives — open the book, repeat, listen, write — both in masculine and feminine forms.',
    ],
    task: 'Picture yourself in your first Arabic class at King Saud University; by the end of the lesson you can name everything in the room and follow every instruction.',
  },
  {
    id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in this lesson',
    goals: [
      'Distinguish the emphatic ط in طاولة ṭāwila (table) from plain ت in تلميذ tilmīdh (pupil) — same beginning sound, very different articulation.',
      'Pronounce the difficult cluster كتاب kitāb (book) without inserting a vowel between k and t.',
      'Apply the sun-letter rule on الطاولة aṭ-ṭāwila (the table) — ل silent, ط doubled.',
    ],
    task: 'Read each example aloud and mark which sun-letter assimilations apply.',
  },
  {
    id: ACT.vocabObjects, section: 'Vocabulary I', title: 'Classroom objects',
    goals: [
      'Memorize 20 classroom objects with correct gender and plural form (sound vs broken plurals).',
      'Pay attention to ـة-ending nouns (almost always feminine) vs unmarked nouns.',
    ],
    task: 'Walk around the room and name every visible object using هذا/هذه + الـ + noun.',
  },
  {
    id: ACT.vocabInstructions, section: 'Vocabulary II', title: 'Classroom instructions and polite words',
    goals: [
      'Understand 10 imperatives a teacher uses: open, close, repeat, listen, write, read, answer, ask, look, speak.',
      'Reply politely with عفوًا (excuse me), لو سمحت (please, lit. "if you permit"), شكرًا (thank you).',
    ],
    task: 'Listen to the AI tutor giving instructions; respond by acting them out and saying شكرًا.',
  },
  {
    id: ACT.grammarDemonstratives, section: 'Grammar I', title: 'Demonstratives — this and that',
    goals: [
      'Use هذا hādhā (this-M), هذه hādhihi (this-F), ذلك dhālika (that-M), تلك tilka (that-F) with full gender agreement on the following noun.',
      'Combine demonstrative + definite article: هذا الكتاب hādhā l-kitāb ("this book"); the noun MUST be definite for the demonstrative reading.',
    ],
    task: 'Point at 6 objects and identify each with هذا / هذه + الـ + noun.',
  },
  {
    id: ACT.grammarDefiniteArticle, section: 'Grammar II', title: 'The definite article الـ and sun/moon letters',
    goals: [
      'Apply الـ to make any noun definite: كتاب kitāb (a book) → الكتاب al-kitāb (the book).',
      'Apply sun-letter assimilation correctly in speech for the 14 sun letters (ت ث د ذ ر ز س ش ص ض ط ظ ل ن).',
      'Understand that indefiniteness is shown by ABSENCE of الـ plus optional tanwīn (ـٌ ـً ـٍ) on the case ending.',
    ],
    task: 'Take 10 nouns from this unit; add الـ and pronounce each with correct sun/moon behavior.',
  },
  {
    id: ACT.grammarImperatives, section: 'Grammar III', title: 'Imperatives — masculine and feminine forms',
    goals: [
      'Form the singular imperative for Form I verbs: take the present, drop the prefix يـ, add a helper alif if needed: يَكْتُب yaktub → اُكْتُبْ uktub! (write!-M).',
      'Distinguish masculine and feminine imperatives: اُكْتُبْ uktub (write-M) vs اُكْتُبِي uktubī (write-F).',
      'Soften imperatives with من فضلك min faḍlik (please-M) / من فضلكِ min faḍliki (please-F) or لو سمحت law samaḥt.',
    ],
    task: 'For 5 verbs, produce both M and F singular imperatives and add a politeness marker.',
  },
  { id: ACT.reading, section: 'Reading', title: 'Reading a classroom inventory',
    goals: ['Read a short paragraph describing a classroom layout aloud.', 'Identify each object\'s gender and the demonstratives used.'],
    task: 'Read the paragraph and answer 4 comprehension questions about object locations.' },
  { id: ACT.listening, section: 'Listening', title: 'Teacher giving instructions',
    goals: ['Follow a 6-instruction sequence from a teacher.', 'Reproduce the instructions in both M and F forms.'],
    task: 'Listen and act out each instruction; then play the teacher role yourself.' },
  { id: ACT.writing, section: 'Writing', title: 'Label your own classroom',
    goals: ['Write 5 sentences identifying classroom items with هذا/هذه + الـ + noun.', 'Add one adjective per item with correct gender agreement.'],
    task: 'Write 5 labeled sentences for items on your desk.' },
  { id: ACT.culture, section: 'Culture', title: 'Arab classroom etiquette',
    goals: ['Stand when a teacher enters; greet with السلام عليكم.', 'Use يا أستاذ/يا أستاذة as the standard vocative for teachers.'],
    task: 'Practice the standard greeting sequence when a teacher walks in.' },
  { id: ACT.task, section: 'Task', title: 'Classroom dialogue at King Saud University',
    goals: ['Combine demonstratives, imperatives, and politeness into a 6-turn classroom exchange.'],
    task: 'Roleplay an opening-of-class dialogue with the AI tutor as the professor.' },
];

const lesson = {
  title: 'Level 1 · Unit 2: في الفصل — Classroom Language',
  category: 'school', difficulty: 'beginner',
  targetLang: 'ar', nativeLang: 'en', track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'naming-objects', label: 'Naming objects', goal: 'Use هذا/هذه + الـ + noun to identify objects with correct gender.' },
    { id: 'following-instructions', label: 'Following instructions', goal: 'Understand and act on 10 classroom imperatives.' },
    { id: 'asking-for-help', label: 'Asking for help', goal: 'Use لو سمحت + question to ask a question politely in class.' },
    { id: 'classroom-politeness', label: 'Classroom politeness', goal: 'Reply with شكرًا, عفوًا, لا بأس appropriately.' },
  ],
  relatedPools: ['topic-school'],
  content: [
    createContentItem('فصل', 'faṣl', 'A classroom or a class period. Same word for the physical room and the time-slot. Pattern فَعْل; plural فصول fuṣūl.', 'word', 'هذا فصلُنا الجديد.', '"This is our new classroom." — fasluna shows the 1st-person plural possessive suffix.', null, [ACT.orientation, ACT.vocabObjects]),
    createContentItem('قاعة', 'qāʿa', 'A hall or lecture room — bigger and more formal than فصل. Used at universities for lecture halls. The pharyngeal ع mid-word is the trap.', 'word', 'المحاضرة في القاعة الكبرى.', '"The lecture is in the Grand Hall."', null, [ACT.orientation, ACT.vocabObjects]),

    // Pronunciation
    createContentItem('الطاولة', 'aṭ-ṭāwila', 'Sun-letter assimilation: الطاولة → aṭ-ṭāwila. The ل of الـ is silent and ط is geminated. Emphatic ط darkens the following vowel.', 'word', 'الطاولة كبيرة. aṭ-ṭāwila kabīra.', '"The table is big." Note feminine adjective agreement.', [
      { target: 'الـ + ط', note: 'sun letter — ل silent' },
      { target: 'ط emphatic', note: 'tongue retracted; vowel darkened' },
    ], [ACT.pronunciation]),
    createContentItem('كتاب vs الكتاب', 'kitāb vs al-kitāb', 'Indefinite kitāb "a book" vs definite al-kitāb "the book". ك is a moon letter, so ل of الـ is pronounced normally.', 'word', 'كتاب kitāb (a book) vs الكتاب al-kitāb (the book)', 'Moon-letter rule: ل audible before ك.', null, [ACT.pronunciation]),
    createContentItem('تلميذ', 'tilmīdh', 'Plain ت starts this word — distinct from the emphatic ط. The final ذ is a voiced interdental "th" as in "this".', 'word', 'هذا تلميذ مجتهد.', '"This is a hard-working pupil."', null, [ACT.pronunciation]),

    // Vocabulary I — Classroom objects
    createContentItem('كتاب', 'kitāb', 'Book (M). Plural كُتُب kutub. Root ك ت ب "writing". The most basic classroom object.', 'word', 'الكتاب على الطاولة.', '"The book is on the table." — على is "on".', null, [ACT.vocabObjects]),
    createContentItem('قلم', 'qalam', 'Pen or pencil (M). Plural أقلام aqlām. The ق is uvular — not English k.', 'word', 'أين قلمي؟', '"Where is my pen?" — قلمي = qalam + ـي "my".', null, [ACT.vocabObjects]),
    createContentItem('دفتر', 'daftar', 'Notebook (M). Plural دفاتر dafātir (broken plural pattern فَعَاتِل).', 'word', 'أكتب الواجب في الدفتر.', '"I write the homework in the notebook."', null, [ACT.vocabObjects]),
    createContentItem('ورقة', 'waraqa', 'A sheet of paper (F, ends in ـة). Plural أوراق awrāq (broken plural).', 'word', 'أعطني ورقة، من فضلك.', '"Give me a sheet of paper, please."', null, [ACT.vocabObjects]),
    createContentItem('طاولة', 'ṭāwila', 'Table or desk (F). Plural طاولات ṭāwilāt (sound feminine plural). Begins with emphatic ط.', 'word', 'الطاولة في وسط الفصل.', '"The table is in the middle of the classroom."', null, [ACT.vocabObjects]),
    createContentItem('كرسي', 'kursī', 'Chair (M). Plural كراسي karāsī (broken plural).', 'word', 'اجلس على الكرسي، من فضلك.', '"Sit on the chair, please."', null, [ACT.vocabObjects]),
    createContentItem('سبورة', 'sabbūra', 'Blackboard or whiteboard (F). Has a shadda on the ب — held twice as long. Plural سبورات sabbūrāt.', 'word', 'الأستاذ يكتب على السبورة.', '"The professor is writing on the board."', null, [ACT.vocabObjects]),
    createContentItem('باب', 'bāb', 'Door (M). Plural أبواب abwāb (broken plural pattern أَفْعَال).', 'word', 'افتح الباب، من فضلك.', '"Open the door, please."', null, [ACT.vocabObjects]),
    createContentItem('نافذة', 'nāfidha', 'Window (F, ends in ـة). Plural نوافذ nawāfidh (broken plural).', 'word', 'النافذة مفتوحة.', '"The window is open."', null, [ACT.vocabObjects]),
    createContentItem('حقيبة', 'ḥaqība', 'Bag or backpack (F). Plural حقائب ḥaqāʾib. The ح is the pharyngeal — not English h.', 'word', 'حقيبتي ثقيلة.', '"My bag is heavy."', null, [ACT.vocabObjects]),
    createContentItem('ساعة', 'sāʿa', 'Clock or hour or watch (F). The pharyngeal ع mid-word. Plural ساعات sāʿāt.', 'word', 'الساعة على الجدار.', '"The clock is on the wall."', null, [ACT.vocabObjects]),
    createContentItem('جدار', 'jidār', 'Wall (M). Plural جدران judrān.', 'word', 'على الجدار خريطة.', '"On the wall there is a map."', null, [ACT.vocabObjects]),
    createContentItem('خريطة', 'kharīṭa', 'Map (F). Plural خرائط kharāʾiṭ. Begins with the velar fricative خ.', 'word', 'خريطة العالم العربي.', '"A map of the Arab world."', null, [ACT.vocabObjects]),
    createContentItem('قاموس', 'qāmūs', 'Dictionary (M). Plural قواميس qawāmīs. The uvular ق at the start.', 'word', 'القاموس في المكتبة.', '"The dictionary is in the library."', null, [ACT.vocabObjects]),
    createContentItem('ممحاة', 'mimḥāh', 'Eraser (F). Plural ممحايات mimḥāyāt. The pharyngeal ح mid-word.', 'word', 'أين الممحاة؟', '"Where is the eraser?"', null, [ACT.vocabObjects]),
    createContentItem('مسطرة', 'misṭara', 'Ruler (F). Plural مساطر masāṭir. Emphatic ط in the middle.', 'word', 'استعمل المسطرة.', '"Use the ruler."', null, [ACT.vocabObjects]),
    createContentItem('حاسوب', 'ḥāsūb', 'Computer (M). Modern term; older دكمبيوتر kumbyūtir is a transliteration. Plural حواسيب ḥawāsīb.', 'word', 'الحاسوب على الطاولة.', '"The computer is on the desk."', null, [ACT.vocabObjects]),
    createContentItem('شاشة', 'shāsha', 'Screen or monitor (F). Plural شاشات shāshāt.', 'word', 'الشاشة كبيرة.', '"The screen is large."', null, [ACT.vocabObjects]),
    createContentItem('طلاب', 'ṭullāb', 'Students (broken plural of طالب). The shadda on ل doubles the consonant. Used for male or mixed-gender groups.', 'word', 'الطلاب في الفصل.', '"The students are in the classroom."', null, [ACT.vocabObjects]),
    createContentItem('طالبات', 'ṭālibāt', 'Female students (sound feminine plural of طالبة).', 'word', 'الطالبات يدرسن العربية.', '"The female students are studying Arabic." — verb in fem plural form.', null, [ACT.vocabObjects]),
    createContentItem('أستاذ', 'ustādh', 'Professor or teacher (M). Plural أساتذة asātidha. Also a respectful "Mr." for any adult man.', 'word', 'الأستاذ يشرح الدرس.', '"The professor is explaining the lesson."', null, [ACT.vocabObjects]),
    createContentItem('درس', 'dars', 'Lesson (M). Plural دروس durūs. Root د ر س "studying".', 'word', 'الدرس صعب اليوم.', '"The lesson is hard today."', null, [ACT.vocabObjects]),

    // Vocabulary II — Instructions
    createContentItem('افتح', 'iftaḥ (M) / iftaḥī (F)', 'Imperative: "Open!" — Form I of فَتَحَ fataḥa. The pharyngeal ح at the end. For a woman: افتحي iftaḥī.', 'word', 'افتح الكتاب على الصفحة عشرة.', '"Open the book to page ten."', null, [ACT.vocabInstructions]),
    createContentItem('أغلق', 'aghliq (M) / aghliqī (F)', 'Imperative: "Close!" — Form IV of أَغْلَقَ aghlaqa. The velar fricative غ at the start (voiced خ).', 'word', 'أغلق الباب، لو سمحت.', '"Close the door, please."', null, [ACT.vocabInstructions]),
    createContentItem('اكتب', 'uktub (M) / uktubī (F)', 'Imperative: "Write!" — from كَتَبَ. Hamzat al-waṣl on the alif: silent if not utterance-initial.', 'word', 'اكتب اسمك على الورقة.', '"Write your name on the paper."', null, [ACT.vocabInstructions]),
    createContentItem('اقرأ', 'iqraʾ (M) / iqraʾī (F)', 'Imperative: "Read!" — from قَرَأَ. Uvular ق + glottal stop ء at the end.', 'word', 'اقرأ الفقرة بصوت عالٍ.', '"Read the paragraph aloud." — بصوت عالٍ "in a loud voice".', null, [ACT.vocabInstructions]),
    createContentItem('استمع', 'istamiʿ (M) / istamiʿī (F)', 'Imperative: "Listen!" — Form VIII from سَمِعَ. The pharyngeal ع at the end. Soft alif at start (hamzat al-waṣl).', 'word', 'استمع جيدًا.', '"Listen carefully." — جيدًا "well" in accusative.', null, [ACT.vocabInstructions]),
    createContentItem('تكلم', 'takallam (M) / takallamī (F)', 'Imperative: "Speak!" — Form V from تَكَلَّمَ. Shadda on ل (geminated).', 'word', 'تكلم بصوت أعلى.', '"Speak with a louder voice."', null, [ACT.vocabInstructions]),
    createContentItem('أعد', 'aʿid (M) / aʿīdī (F)', 'Imperative: "Repeat!" — Form IV from أَعَادَ. The pharyngeal ع after the hamza.', 'word', 'أعد الجملة، من فضلك.', '"Repeat the sentence, please."', null, [ACT.vocabInstructions]),
    createContentItem('انظر', 'unẓur (M) / unẓurī (F)', 'Imperative: "Look!" — from نَظَرَ. Emphatic ظ in the middle.', 'word', 'انظر إلى السبورة.', '"Look at the board."', null, [ACT.vocabInstructions]),
    createContentItem('أجب', 'ajib (M) / ajībī (F)', 'Imperative: "Answer!" — Form IV from أجاب. Note the difference: ajib (M) but ajībī (F, with long ī).', 'word', 'أجب على السؤال.', '"Answer the question."', null, [ACT.vocabInstructions]),
    createContentItem('اسأل', 'isʾal (M) / isʾalī (F)', 'Imperative: "Ask!" — from سَأَلَ. The hamza on the ا in the middle.', 'word', 'اسأل أي سؤال.', '"Ask any question."', null, [ACT.vocabInstructions]),
    createContentItem('من فضلك', 'min faḍlik (M) / min faḍliki (F)', 'Politeness: "please", literally "from your favor". The most common politeness marker added to any request.', 'word', 'افتح النافذة، من فضلك.', '"Open the window, please." — to a man.', null, [ACT.vocabInstructions]),
    createContentItem('لو سمحت', 'law samaḥt(a) (M) / law samaḥti (F)', 'Politeness: "if you would permit". Slightly more formal than من فضلك; common in service interactions.', 'word', 'الماء، لو سمحت.', '"The water, please."', null, [ACT.vocabInstructions]),
    createContentItem('شكرًا', 'shukran', 'Thank you. Indefinite accusative form — tanwīn al-fath (ـًا). Common reply: عفوًا ʿafwan ("you\'re welcome") or لا شكر على واجب lā shukra ʿalā wājib.', 'word', 'شكرًا جزيلًا، يا أستاذ.', '"Thank you very much, professor." — جزيلًا intensifies.', null, [ACT.vocabInstructions]),
    createContentItem('عفوًا', 'ʿafwan', 'Excuse me / pardon / you\'re welcome. Multipurpose: signals apology AND replies to a thank-you. The pharyngeal ع at the start.', 'word', 'عفوًا، ما اسمك؟', '"Excuse me, what is your name?"', null, [ACT.vocabInstructions]),
    createContentItem('لا أفهم', 'lā afham', 'Negative present-tense verb: "I do not understand". Critical phrase for any learner; use freely in class.', 'word', 'لا أفهم، أعد لو سمحت.', '"I don\'t understand, please repeat."', null, [ACT.vocabInstructions]),
    createContentItem('كيف يقال … بالعربية؟', 'kayf yuqāl … bi-l-ʿarabiyya?', '"How do you say … in Arabic?" — the all-purpose vocabulary-mining question in class.', 'word', 'كيف يقال "computer" بالعربية؟ — يقال "حاسوب".', '"How do you say computer in Arabic?" — "It is said haasuub."', null, [ACT.vocabInstructions]),

    // Grammar I — Demonstratives
    createContentItem('هذا', 'hādhā', 'Demonstrative "this" (M). Used for masculine singular nouns. The ـذا spelling has a SILENT alif — pronounced /haːdhaː/ but the second alif is a diacritic-only "dagger alif" in fully-vowelled text.', 'sentence', 'هذا كتابي. hādhā kitābī.', '"This is my book." — predicate is indefinite, so no الـ on كتابي.', [
      { target: 'هذا as subject', note: 'use when pointing at something masculine close-at-hand' },
      { target: 'هذا + الـ + noun = "this N"', note: 'هذا الكتاب = "this book"; both demonstrative and noun must be present' },
    ], [ACT.grammarDemonstratives]),
    createContentItem('هذه', 'hādhihi', 'Demonstrative "this" (F). Used for feminine singular nouns — including those ending in ـة and irregular feminines like شمس (sun).', 'sentence', 'هذه طاولة كبيرة.', '"This is a big table."', [
      { target: 'هذه as subject', note: 'feminine counterpart to هذا' },
      { target: 'هذه + الـ + fem noun', note: 'هذه الطاولة = "this table"' },
    ], [ACT.grammarDemonstratives]),
    createContentItem('ذلك', 'dhālika', 'Demonstrative "that" (M, far). Used for distant masculine singular nouns or to introduce a previously-mentioned topic.', 'sentence', 'ذلك الكتاب لي.', '"That book is mine."', null, [ACT.grammarDemonstratives]),
    createContentItem('تلك', 'tilka', 'Demonstrative "that" (F, far). Feminine counterpart to ذلك.', 'sentence', 'تلك النافذة مفتوحة.', '"That window is open."', null, [ACT.grammarDemonstratives]),
    createContentItem('هذان / هاتان', 'hādhāni / hātāni', 'Demonstrative dual: "these two" (M) / "these two" (F). Used when pointing at exactly two objects. Rare in colloquial but standard in MSA.', 'sentence', 'هذان طالبان. / هاتان طالبتان.', '"These are two students-M / two students-F."', null, [ACT.grammarDemonstratives]),
    createContentItem('هؤلاء', 'hāʾulāʾi', '"These" (plural, M or F humans). Used for plural human referents. The hamza on the seat ؤ — kasra controls the seat.', 'sentence', 'هؤلاء الطلاب من سوريا.', '"These students are from Syria."', null, [ACT.grammarDemonstratives]),
    createContentItem('قاعدة عامة', 'qāʿida ʿāmma', 'GENERAL RULE: a demonstrative sentence has the structure هذا/هذه + indefinite noun (a complete nominal sentence: "this is a …"). A demonstrative phrase has the structure هذا/هذه + الـ + noun (just "this …", needs more to be a sentence).', 'sentence', 'هذا كتاب (sentence: "This is a book") vs هذا الكتاب جديد (sentence: "This book is new", where هذا الكتاب is the subject)', 'Mistake to avoid: هذا الكتاب alone is NOT a complete sentence; it needs a predicate after it.', null, [ACT.grammarDemonstratives]),

    // Grammar II — Definite article
    createContentItem('الـ', 'al-', 'The definite article — invariant in writing, but its pronunciation depends on the following letter. Before MOON letters, ل is fully pronounced (al-kitāb). Before SUN letters, ل is silent and the next letter doubles (ash-shams).', 'sentence', 'كتاب → الكتاب · شمس → الشمس', 'Always attached directly to the noun, no space.', [
      { target: 'before moon letter (e.g., ك)', note: 'pronounce ل: al-kitāb' },
      { target: 'before sun letter (e.g., ش)', note: 'ل silent, next letter doubled: ash-shams' },
    ], [ACT.grammarDefiniteArticle]),
    createContentItem('التنوين', 'at-tanwīn', 'Tanwīn = "noun-ation" — three diacritics indicating an INDEFINITE noun: ـٌ (un, nominative), ـً (an, accusative — needs a "tanwin-bearing alif" ـًا), ـٍ (in, genitive). The opposite of الـ.', 'sentence', 'كتابٌ kitābun (a book, nominative) vs الكتابُ al-kitābu (the book, nominative)', 'In colloquial speech tanwīn is dropped; in MSA writing and formal speech it is required.', null, [ACT.grammarDefiniteArticle]),
    createContentItem('قاعدة الشمس والقمر', 'qāʿidat ash-shams wa-l-qamar', 'The sun/moon letter rule applied: الشمس (sun, sun-letter) → ash-shams; القمر (moon, moon-letter) → al-qamar. Memorize the 14 sun letters as a set: ت ث د ذ ر ز س ش ص ض ط ظ ل ن.', 'sentence', 'الطالب aṭ-ṭālib (sun: ط doubled) vs الكتاب al-kitāb (moon: ل audible)', 'Predict the rule from the next letter; if you can\'t hear the ل, it\'s a sun letter.', null, [ACT.grammarDefiniteArticle]),

    // Grammar III — Imperatives
    createContentItem('بناء الأمر', 'bināʾ al-amr', 'To form a Form I singular imperative: take the present tense (يَكْتُب yaktub), drop the يـ prefix (كْتُب), and add a helping initial hamza-alif (with damma if the present has damma, kasra otherwise): اُكْتُبْ uktub! For Forms II-X, drop the prefix without adding a hamza.', 'sentence', 'يَكْتُب → اُكْتُبْ (write!)\nيَقْرَأ → اِقْرَأْ (read!)\nيَفْتَح → اِفْتَحْ (open!)', 'The vowel on the helper alif follows the stem vowel: damma for u-stem, kasra otherwise.', [
      { target: 'present yaktub (u-stem)', note: 'imperative starts with damma: uktub' },
      { target: 'present yaqraʾ (a-stem)', note: 'imperative starts with kasra: iqraʾ' },
      { target: 'Form II-X drop prefix', note: 'تَكَلَّمَ → تَكَلَّمْ takallam (speak!)' },
    ], [ACT.grammarImperatives]),
    createContentItem('المؤنث في الأمر', 'al-muʾannath fī l-amr', 'To make a singular imperative feminine, add ـِي to the end and drop the final sukun: uktub! (M) → uktubī! (F). The kasra + ي ending is the feminine singular marker for all 2nd-person verb forms.', 'sentence', 'افتح iftaḥ (M, open!) → افتحي iftaḥī (F)\nأجب ajib (M, answer!) → أجيبي ajībī (F)', 'Note the F sometimes has a different stem vowel (ajib vs ajībī) — the F form looks at the underlying stem.', null, [ACT.grammarImperatives]),
    createContentItem('تليين الأمر', 'talyīn al-amr', 'Softening an imperative: add لو سمحت (law samaḥt) "if you would permit" or من فضلك (min faḍlik) "please". Without these, an MSA imperative sounds curt — like an English bare "Open!".', 'sentence', 'افتح الباب! (curt) → افتح الباب، من فضلك. (polite)', 'Always soften imperatives when addressing seniors, customers, or in any non-emergency context.', null, [ACT.grammarImperatives]),

    // Reading
    createContentItem('في الفصل', 'fī l-faṣl', 'A short paragraph describing a classroom layout. Read aloud with attention to demonstratives and gender agreement.', 'sentence', 'هذا فصلنا. في الفصل طاولة كبيرة وكراسي كثيرة. على الطاولة كتاب وقلم ودفتر. أمام الفصل سبورة، وعلى الجدار خريطة العالم العربي. هذه الخريطة مفيدة جدًا للطلاب.', 'Translation: "This is our classroom. In the classroom there is a big table and many chairs. On the table there is a book and a pen and a notebook. In front of the classroom there is a blackboard, and on the wall is a map of the Arab world. This map is very useful for the students."', [
      { target: 'هذا فصلنا', note: '"This is our classroom" — هذا + indefinite predicate' },
      { target: 'في الفصل ...', note: 'fronted prepositional phrase; common when introducing scene' },
      { target: 'خريطة العالم العربي', note: '"map of the Arab world" — three-noun إضافة chain' },
      { target: 'هذه الخريطة مفيدة', note: '"this map is useful" — هذه + الـ + fem noun + fem adj' },
    ], [ACT.reading]),

    // Listening
    createContentItem('تعليمات الأستاذ', 'taʿlīmāt al-ustādh', 'A 6-instruction sequence from a teacher. Listen, act out, and repeat in F form if you are female (the teacher addresses you with masculine forms in this script).', 'conversation', '١. السلام عليكم، يا طلاب! ٢. افتحوا الكتاب على الصفحة عشرة. ٣. اقرأوا الفقرة الأولى بصوت عالٍ. ٤. اكتبوا الكلمات الجديدة في الدفتر. ٥. أجيبوا على الأسئلة. ٦. لا تنسوا الواجب لليوم القادم!', 'Note plural imperatives ending in ـوا for addressing the whole class: افتحوا, اقرأوا, اكتبوا.', [
      { target: 'افتحوا iftaḥū', note: 'masculine plural imperative — addresses a mixed-gender class' },
      { target: 'لا تنسوا lā tansaw', note: 'negative imperative "don\'t forget"; لا + jussive form' },
      { target: 'الواجب al-wājib', note: '"the homework" — same word as "duty"' },
    ], [ACT.listening]),

    // Writing
    createContentItem('قالب الكتابة', 'qālab al-kitāba', 'Template for writing 5 labeled sentences about your desk. Use هذا/هذه + الـ + noun for the demonstrative; add one adjective per item with correct gender.', 'sentence', 'مثال: هذا الكتاب أزرق. هذه الورقة بيضاء. هذا القلم طويل. هذه الحقيبة ثقيلة. هذا الحاسوب جديد.', 'Note each adjective agrees with the noun in gender: أزرق (M) for كتاب; بيضاء (F) for ورقة; طويل (M) for قلم.', null, [ACT.writing]),

    // Culture
    createContentItem('احترام الأستاذ', 'iḥtirām al-ustādh', 'Arab classroom etiquette: stand when the teacher enters, greet with السلام عليكم, address with يا أستاذ/أستاذة + first name. Calling a teacher by first name without title is considered impolite in most Arab academic contexts.', 'sentence', 'الطلاب يقفون: "السلام عليكم، يا أستاذ محمد!"\nالأستاذ: "وعليكم السلام، تفضلوا، اجلسوا."', 'تفضلوا tafaḍḍalū is a polite plural "please (do this)" — extremely common in hospitality.', [
      { target: 'يا أستاذ + name', note: 'vocative form for addressing a teacher; يا precedes the name' },
      { target: 'تفضل / تفضلي / تفضلوا', note: 'polite "please (sit, take, come)" — gender/number marked' },
    ], [ACT.culture]),
    createContentItem('يا حرف النداء', 'yā ḥarf an-nidāʾ', 'The vocative particle يا precedes any direct address: يا أستاذ (Professor!), يا أحمد (Ahmad!), يا أخي (my brother!). Universal in Arab speech across all registers.', 'word', 'يا أستاذ، عندي سؤال.', '"Professor, I have a question."', null, [ACT.culture]),

    // Task
    createContentItem('المهمة — حوار في الفصل', 'al-mahamma — ḥiwār fī l-faṣl', 'Combine demonstratives, imperatives, and politeness in a 6-turn classroom dialogue with the AI tutor as the professor.', 'conversation', 'الأستاذ: السلام عليكم، يا طلاب!\nأنت: [رد التحية]\nالأستاذ: افتحوا الكتاب على الصفحة عشرين.\nأنت: [تأكيد + سؤال إذا لزم]\nالأستاذ: ما هذا؟ (يشير إلى صورة)\nأنت: [هذا/هذه + اسم العنصر]\nالأستاذ: ممتاز! اكتب كلمة جديدة.\nأنت: [طلب التهجئة بأدب]', 'Six turns; practice gender agreement, polite imperatives, and demonstrative use throughout.', [
      { target: 'رد التحية', note: 'reply وعليكم السلام' },
      { target: 'هذا/هذه + noun', note: 'identify with correct gender' },
      { target: 'كيف تتهجى …؟', note: '"How do you spell …?" — a common follow-up' },
    ], [ACT.task]),
  ],
};

module.exports = lesson;
