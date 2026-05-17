// Level 1 Unit 2 — Classroom & Studies (Bahasa Melayu)
// Functions: classroom objects, asking/answering classroom questions, talking
// about studies, days of the week, requesting help politely.
// Anchored in Universiti Malaya (UM) — Fakulti Sains, Perpustakaan Utama,
// Dewan Kuliah.

const createContentItem = (
  target,
  pinyin,
  note,
  type = 'word',
  example = '',
  exampleNote = '',
  breakdown = null,
  activityIds = [],
) => ({
  type,
  activityIds,
  targetText: target,
  romanization: pinyin,
  nativeText: note,
  pronunciation: pinyin,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ms-l1u2-orientation',
  pronunciation: 'ms-l1u2-pronunciation',
  vocabularyObjects: 'ms-l1u2-vocab-objects',
  vocabularySubjects: 'ms-l1u2-vocab-subjects',
  grammarIniItu: 'ms-l1u2-grammar-ini-itu',
  grammarThis: 'ms-l1u2-grammar-this',
  grammarQuestions: 'ms-l1u2-grammar-questions',
  reading: 'ms-l1u2-reading',
  listening: 'ms-l1u2-listening',
  writing: 'ms-l1u2-writing',
  culture: 'ms-l1u2-culture',
  task: 'ms-l1u2-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Name 12 classroom objects in Bahasa Melayu so you can describe any UM lecture hall — buku, pen, papan tulis, meja, kerusi, komputer.',
      'Talk about your studies: faculty (Fakulti), major (jurusan), year (tahun), and which courses (kursus) you are taking at UM.',
      'Ask classroom questions politely — "Apa ini?", "Macam mana cakap … dalam Bahasa Melayu?", "Boleh tolong jelaskan?"',
    ],
    task: 'Picture your first lecture in Dewan Kuliah B at UM. By the end of this lesson you should be able to identify every object on the lecturer\'s desk and ask three classroom questions politely.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Schwa-heavy classroom words',
    goals: [
      'Pronounce "perpustakaan" /pər.pus.ta.ka.an/ — five syllables, schwa in the first, two adjacent /a/ vowels at the end. The kind of word that exposes anglicized speech instantly.',
      'Pronounce "sekolah" /sə.ko.lah/ — schwa in se-, then /ko/, then /lah/. Penultimate stress lands on KO.',
      'Roll the r in "kerusi" /kə.ru.si/ (chair) and "kursus" /kur.sus/ (course).',
    ],
    task: 'Read each example aloud and mark the schwa.',
  },
  {
    id: ACT.vocabularyObjects,
    section: 'Vocabulary I',
    title: 'Classroom objects at UM',
    goals: [
      'Memorize 14 classroom objects you will see in any UM lecture hall or tutorial room.',
      'Distinguish "buku" (book) from "buku nota" (notebook) from "buku teks" (textbook) — the compound pattern is essential for richer classroom vocabulary.',
    ],
    task: 'Point to each object in your room and name it in BM.',
  },
  {
    id: ACT.vocabularySubjects,
    section: 'Vocabulary II',
    title: 'Faculties, majors, and subjects',
    goals: [
      'Name 10 common UM faculties and subjects (Fakulti Sains, Fakulti Undang-Undang, Sains Komputer, Perubatan, Kejuruteraan).',
      'Use "jurusan" (major) and "kursus" (course) in self-describing sentences.',
    ],
    task: 'Say your faculty and major in one BM sentence.',
  },
  {
    id: ACT.grammarIniItu,
    section: 'Grammar I',
    title: 'ini / itu — this / that (and there is no a/the)',
    goals: [
      'Use INI ("this", near) and ITU ("that", far) as both demonstratives and pronouns: "Buku INI" (this book), "Buku ITU" (that book), "INI buku" (this is a book), "ITU buku" (that is a book).',
      'Recognize that BM has NO articles (no a, no the): "buku" alone means "a book / the book / book" depending on context.',
    ],
    task: 'Make six sentences alternating ini/itu.',
  },
  {
    id: ACT.grammarThis,
    section: 'Grammar II',
    title: 'Adjectives FOLLOW the noun',
    goals: [
      'Use the noun-then-adjective order, opposite of English: "buku merah" = "red book" (literally "book red"); "rumah besar" = "big house" (literally "house big").',
      'Stack multiple adjectives by linking with "dan" or in sequence: "buku merah yang baru" = "the new red book".',
    ],
    task: 'Describe three classroom objects with at least one adjective each.',
  },
  {
    id: ACT.grammarQuestions,
    section: 'Grammar III',
    title: 'Apa / Siapa / Mana / Bila / Bagaimana — question words IN PLACE',
    goals: [
      'Use the 5 core question words in place (no movement): APA (what), SIAPA (who), MANA (where), BILA (when), BAGAIMANA (how).',
      'Form "Apa ini?" / "Siapa dia?" / "Di mana perpustakaan?" — same word order as statements, just substitute the question word for the unknown.',
    ],
    task: 'Form three classroom questions, each using a different question word.',
  },
  {
    id: ACT.reading,
    section: 'Reading',
    title: 'A page from a UM lecture brochure',
    goals: [
      'Read a short Fakulti Sains brochure paragraph aloud and identify the faculty, building, and main courses.',
      'Answer comprehension questions about facilities and study options.',
    ],
    task: 'Read the paragraph below and answer four questions.',
  },
  {
    id: ACT.listening,
    section: 'Listening',
    title: 'A first-tutorial dialogue',
    goals: [
      'Follow a 5-turn dialogue between a tutor and an international student about course materials and homework.',
      'Reproduce the dialogue with your own course names.',
    ],
    task: 'Read along with the tutor, then perform your own version.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Describe your study setup',
    goals: [
      'Write 4-5 sentences describing your major, your favorite course at UM, your classroom, and one tool you use most.',
      'Use ini/itu at least once and the noun-adjective order in at least two phrases.',
    ],
    task: 'Write the paragraph and read it aloud.',
  },
  {
    id: ACT.culture,
    section: 'Culture',
    title: 'UM, USM, UKM, UPM — Malaysia\'s research universities',
    goals: [
      'Recognize the four major research universities: Universiti Malaya (UM, est. 1949, KL — Malaysia\'s flagship), Universiti Sains Malaysia (USM, Penang), Universiti Kebangsaan Malaysia (UKM, Bangi), Universiti Putra Malaysia (UPM, Serdang).',
      'Understand the multi-ethnic intake: by law (and by tradition), public universities admit Malays, Chinese-Malaysians, Indian-Malaysians, and indigenous students in numbers reflecting national diversity.',
    ],
    task: 'Match each university with its city and one signature program.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Your first UM tutorial — in Bahasa Melayu',
    goals: [
      'Roleplay introducing yourself to a tutorial group of 5 mixed-ethnicity classmates.',
      'Ask one classroom question politely and answer one from the tutor.',
    ],
    task: 'Roleplay with the AI tutor a 5-turn first-tutorial scene.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 2: Di Bilik Kuliah — Classroom & Studies',
  category: 'study',
  difficulty: 'beginner',
  targetLang: 'ms',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'naming-objects', label: 'Naming objects', goal: 'Identify and name 10+ classroom items using "Ini …" / "Itu …".' },
    { id: 'asking-classroom-questions', label: 'Asking classroom questions', goal: 'Use "Apa ini?", "Macam mana cakap … dalam BM?", "Boleh tolong …?" politely.' },
    { id: 'describing-your-studies', label: 'Describing your studies', goal: 'State your faculty, major, year, and one course in 2-3 sentences.' },
  ],
  relatedPools: ['topic-education', 'topic-objects'],
  content: [
    // Orientation
    createContentItem('Bilik kuliah', 'bi.liʔ ku.li.ah', 'Lecture room — the main classroom unit at any Malaysian university. Distinct from "kelas" (a school classroom, primary/secondary) and "dewan kuliah" (the larger lecture hall).', 'word', 'Bilik kuliah saya di Fakulti Sains.', '"My lecture room is in the Faculty of Science" — typical UM orientation sentence.', null, [ACT.orientation]),
    createContentItem('matlamat unit', 'mat.la.mat u.nit', 'By the end of this lesson, you can describe your UM classroom, ask polite classroom questions, and talk about your studies — in BM, without code-switching.', 'word', 'Tiga kemahiran: menamakan objek · bertanya soalan · bercerita tentang pengajian.', 'Three micro-skills anchored in any university\'s teaching/learning life.', null, [ACT.orientation]),
    createContentItem('UM sebagai latar', 'u.em sə.ba.gai la.tar', 'Universiti Malaya (UM), founded 1949 in Kuala Lumpur, is Malaysia\'s flagship research university and the setting for this entire Level 1 curriculum.', 'word', 'UM ialah universiti tertua di Malaysia.', '"UM is the oldest university in Malaysia" — a definitional sentence using "ialah".', null, [ACT.orientation]),

    // Pronunciation
    createContentItem('perpustakaan', 'pər.pus.ta.ka.an', 'LIBRARY — five syllables, schwa in first syllable, two adjacent /a/ vowels (-aan suffix). One of the longest common BM words.', 'word', 'Perpustakaan Utama UM dibuka pada hari Isnin.', '"The UM Main Library opens on Monday" — note the schedule word "pada" and day "Isnin" (Monday).', null, [ACT.pronunciation]),
    createContentItem('sekolah', 'sə.ko.lah', 'SCHOOL — three syllables, schwa in se-, full /o/ in /ko/, soft final -h. Penultimate stress on KO. From Portuguese "escola".', 'word', 'Saya pernah pergi sekolah di Kuching.', '"I once attended school in Kuching" (Sarawak capital).', null, [ACT.pronunciation]),
    createContentItem('kerusi', 'kə.ru.si', 'CHAIR — three syllables, schwa in ke-, rolled r in /ru/, full /si/ at end. Penultimate stress on RU.', 'word', 'Kerusi itu rosak.', '"That chair is broken" — common UM classroom complaint.', null, [ACT.pronunciation]),
    createContentItem('kursus', 'kur.sus', 'COURSE — two syllables, rolled r in /kur/, /s/ both initial and middle, final /s/. From English "course". Penultimate stress on KUR.', 'word', 'Kursus Bahasa Melayu di UM seronok.', '"The BM course at UM is enjoyable" — using "seronok" (fun/enjoyable, Malaysian-flavor word).', null, [ACT.pronunciation]),
    createContentItem('jurusan', 'dʒu.ru.san', 'MAJOR / PROGRAM OF STUDY — three syllables, /dʒ/ initial, rolled r, full /u/ throughout.', 'word', 'Jurusan saya ialah Sains Komputer.', '"My major is Computer Science" — definitional sentence.', null, [ACT.pronunciation]),

    // Vocabulary I — objects
    createContentItem('buku', 'bu.ku', 'BOOK — generic. For specific types: buku teks (textbook), buku nota (notebook), buku rujukan (reference book), buku cerita (story book).', 'word', 'Buku Bahasa Melayu saya hilang.', '"My BM book is lost" — possessive comes after the noun.', null, [ACT.vocabularyObjects]),
    createContentItem('pen', 'pen', 'PEN — English loanword, kept as "pen" in BM. The native word "kalam" is poetic/Arabic and rare in daily speech.', 'word', 'Pen merah ini milik saya.', '"This red pen belongs to me" — using "milik" (belonging).', null, [ACT.vocabularyObjects]),
    createContentItem('pensel', 'pen.sel', 'PENCIL — from English "pencil". Standard MY spelling adapts to BM phonotactics with -el ending. ID prefers "pensil".', 'word', 'Saya guna pensel untuk lukis.', '"I use a pencil to draw" — note "guna" (use, casual) vs formal "gunakan".', null, [ACT.vocabularyObjects]),
    createContentItem('kerusi', 'kə.ru.si', 'CHAIR — generic seat. Distinct from "bangku" (bench, stool) and "sofa" (sofa).', 'word', 'Tolong duduk di kerusi itu.', '"Please sit on that chair" — using "tolong" (please) + "di" (at/on) + "itu" (that).', null, [ACT.vocabularyObjects]),
    createContentItem('meja', 'me.ja', 'TABLE / DESK — Sanskrit/Portuguese origin, full /e/ (NOT schwa). Distinct from "kaunter" (counter).', 'word', 'Meja pensyarah di hadapan.', '"The lecturer\'s desk is at the front" — using "hadapan" (front).', null, [ACT.vocabularyObjects]),
    createContentItem('papan tulis', 'pa.pan tu.lis', 'BLACKBOARD / WHITEBOARD — literally "writing board". Modern UM rooms have "papan putih" (whiteboard) and "skrin" (screen) for projection.', 'word', 'Cikgu menulis di papan tulis.', '"The teacher writes on the board" — using "menulis" (me- + tulis "write").', null, [ACT.vocabularyObjects]),
    createContentItem('papan putih', 'pa.pan pu.tih', 'WHITEBOARD — modern UM classrooms typically have these instead of chalkboards.', 'word', 'Papan putih ini baru.', '"This whiteboard is new" — note the demonstrative "ini" follows the noun.', null, [ACT.vocabularyObjects]),
    createContentItem('komputer', 'kɔm.pu.ter', 'COMPUTER — English loan, adapted spelling. The rolled final r is one of the clearest Malaysian markers.', 'word', 'Komputer riba saya rosak.', '"My laptop is broken" — "komputer riba" = laptop (literally "lap computer").', null, [ACT.vocabularyObjects]),
    createContentItem('komputer riba', 'kɔm.pu.ter ri.ba', 'LAPTOP — MY-specific term, literally "lap computer". ID uses "laptop" or "komputer jinjing". Used in every UM tutorial.', 'word', 'Saya bawa komputer riba ke kuliah.', '"I bring my laptop to lecture".', null, [ACT.vocabularyObjects]),
    createContentItem('telefon bimbit', 'te.le.fon bim.bit', 'MOBILE PHONE — MY uses "telefon bimbit" (literally "carry-along phone"). ID uses "ponsel" or "HP" (han-fon). The MY-specific compound.', 'word', 'Telefon bimbit dilarang dalam dewan peperiksaan.', '"Mobile phones are forbidden in the exam hall".', null, [ACT.vocabularyObjects]),
    createContentItem('beg', 'beg', 'BAG — English loan. Compound forms: "beg sekolah" (school bag), "beg laptop" (laptop bag), "beg tangan" (handbag).', 'word', 'Beg saya berat.', '"My bag is heavy".', null, [ACT.vocabularyObjects]),
    createContentItem('kertas', 'ker.tas', 'PAPER — generic. The single sheet vs the substance is context-dependent. "Sehelai kertas" = "one sheet of paper" with the classifier "helai".', 'word', 'Saya perlu sehelai kertas.', '"I need a sheet of paper" — using classifier "helai" (for thin flat objects).', null, [ACT.vocabularyObjects]),
    createContentItem('pemadam', 'pə.ma.dam', 'ERASER — from "padam" (to erase) + pe- prefix forming an instrument noun. The pe- prefix is one of the most productive in BM morphology.', 'word', 'Boleh saya pinjam pemadam awak?', '"Can I borrow your eraser?" — classic classroom request.', null, [ACT.vocabularyObjects]),
    createContentItem('pembaris', 'pəm.ba.ris', 'RULER — from "baris" (line, row) + pem- prefix.', 'word', 'Pembaris ini 30 sentimeter.', '"This ruler is 30 cm" — using SI units which are standard in Malaysian education.', null, [ACT.vocabularyObjects]),
    createContentItem('jam', 'dʒam', 'CLOCK / HOUR — same word for both. "Jam dinding" = wall clock; "jam tangan" = wristwatch.', 'word', 'Jam berapa sekarang?', '"What time is it now?" — using "berapa" (how many) + "sekarang" (now).', null, [ACT.vocabularyObjects]),

    // Vocabulary II — subjects
    createContentItem('Fakulti', 'fa.kul.ti', 'FACULTY — the major academic division at a Malaysian university. UM has 14 Fakulti including Sains, Undang-Undang, Perubatan, Kejuruteraan, Ekonomi, Bahasa.', 'word', 'Fakulti Sains UM dianggap antara yang terbaik.', '"UM\'s Faculty of Science is considered among the best".', null, [ACT.vocabularySubjects]),
    createContentItem('Sains Komputer', 'sains kɔm.pu.ter', 'COMPUTER SCIENCE — one of the most competitive UM programs. Many graduates go to Petronas, AirAsia, Grab, or Silicon Valley.', 'word', 'Saya pelajar Sains Komputer tahun dua.', '"I am a second-year Computer Science student".', null, [ACT.vocabularySubjects]),
    createContentItem('Perubatan', 'pə.ru.ba.tan', 'MEDICINE — from "ubat" (medicine) + pe- + -an. UM\'s medical school is the oldest in Malaysia, founded 1905 (King Edward VII College of Medicine, before UM).', 'word', 'Adik saya belajar Perubatan di UM.', '"My younger sibling studies Medicine at UM".', null, [ACT.vocabularySubjects]),
    createContentItem('Kejuruteraan', 'kə.dʒu.ru.tə.ra.an', 'ENGINEERING — five syllables, schwa-heavy. From "jurutera" (engineer) + ke- + -an. Petronas heavily recruits from UM/USM/UKM engineering programs.', 'word', 'Kejuruteraan Mekanikal sangat sukar.', '"Mechanical Engineering is very difficult".', null, [ACT.vocabularySubjects]),
    createContentItem('Undang-Undang', 'un.daŋ un.daŋ', 'LAW — reduplicated form. UM Law is the oldest in Malaysia; produces most senior Malaysian judges and politicians.', 'word', 'Fakulti Undang-Undang UM terkenal.', '"UM\'s Faculty of Law is famous".', null, [ACT.vocabularySubjects]),
    createContentItem('Ekonomi', 'e.kɔ.no.mi', 'ECONOMICS — English/Greek loan. UM Economics produces many central bank and Khazanah staff.', 'word', 'Saya minat Ekonomi.', '"I am interested in Economics" — using "minat" (interest).', null, [ACT.vocabularySubjects]),
    createContentItem('Bahasa dan Linguistik', 'ba.ha.sa dan liŋ.gu.is.tik', 'LANGUAGES AND LINGUISTICS — UM\'s Faculty of Languages offers BM, English, Chinese, Tamil, Arabic, Japanese, Korean.', 'word', 'Fakulti Bahasa menawarkan kursus Bahasa Korea.', '"The Faculty of Languages offers Korean courses".', null, [ACT.vocabularySubjects]),
    createContentItem('jurusan', 'dʒu.ru.san', 'MAJOR / PROGRAM — the specific degree program within a Fakulti. "Jurusan Sains Komputer" = Computer Science major.', 'word', 'Jurusan saya ialah Sains Komputer dengan minor dalam Statistik.', '"My major is CS with a minor in Statistics".', null, [ACT.vocabularySubjects]),
    createContentItem('kursus', 'kur.sus', 'COURSE / CLASS — one semester unit. Distinct from "jurusan" (the whole degree program).', 'word', 'Saya ambil enam kursus semester ini.', '"I am taking six courses this semester".', null, [ACT.vocabularySubjects]),
    createContentItem('semester', 'sə.mes.ter', 'SEMESTER — English loan. UM\'s academic year runs October-February (Sem 1) and March-July (Sem 2).', 'word', 'Semester pertama bermula bulan Oktober.', '"The first semester starts in October".', null, [ACT.vocabularySubjects]),

    // Grammar I — ini/itu
    createContentItem('ini', 'i.ni', 'THIS — near demonstrative. Can be a pronoun ("Ini buku" = "This is a book") OR an adjective AFTER a noun ("buku ini" = "this book"). The position changes the function.', 'sentence', 'Buku ini baru. (this book is new) / Ini buku baru. (this is a new book)', 'Two sentences, same words, different positions of "ini" — different meanings.', [
      { target: 'NOUN + ini = "this NOUN"', note: 'attributive use: "buku ini" = "this book"' },
      { target: 'Ini + NOUN = "this is NOUN"', note: 'predicative use: "Ini buku" = "This is a book"' },
    ], [ACT.grammarIniItu]),
    createContentItem('itu', 'i.tu', 'THAT — far demonstrative. Mirrors "ini" in syntax. "Buku itu" (that book) / "Itu buku" (that is a book).', 'sentence', 'Kerusi itu kotor. / Itu kerusi cikgu.', '"That chair is dirty" / "That is the teacher\'s chair".', null, [ACT.grammarIniItu]),
    createContentItem('tiada artikel a/the', 'ti.a.da ar.ti.kel a/the', 'BM has NO articles. "buku" alone = "a book / the book / book". Definiteness is recovered from context, demonstratives (ini/itu), or the "-nya" suffix.', 'sentence', 'Saya beli buku. (a book or the book — context decides)\nBukunya tebal. (his/the book is thick — -nya signals definite)', 'Two ways definiteness emerges without articles: context, or the -nya suffix.', null, [ACT.grammarIniItu]),

    // Grammar II — adjective order
    createContentItem('NOUN + adjective', 'noun + adj', 'BM puts the ADJECTIVE AFTER the noun — opposite of English. "buku merah" = "red book" (literally "book red"); "rumah besar" = "big house".', 'sentence', 'buku merah · rumah besar · kereta lama · pelajar baru', 'Four examples of noun-adjective order. Adjective never moves to the front.', null, [ACT.grammarThis]),
    createContentItem('multiple adjectives', 'banyak kata adjektif', 'For multiple adjectives, link with "dan" (and) OR stack in sequence: "buku merah dan baru" = "the red and new book"; "buku merah baru" = the new red book.', 'sentence', 'rumah besar dan baru / pelajar pandai dan rajin', '"Big and new house" / "Smart and hardworking student".', null, [ACT.grammarThis]),
    createContentItem('yang — relative linker', 'jaŋ', 'YANG marks a relative clause / specifies a quality: "buku YANG merah" = "the book that is red"; "pelajar YANG pandai" = "the student who is smart". Slightly more emphatic than simple stacking.', 'sentence', 'pelajar yang pandai · buku yang baru', '"The student who is smart" / "the new book (the one that\'s new)".', null, [ACT.grammarThis]),

    // Grammar III — Wh-questions
    createContentItem('apa', 'a.pa', 'WHAT — pronoun for things. "Apa ini?" ("What is this?"), "Apa khabar?" ("What\'s your news = how are you?"), "Apa nama awak?" ("What\'s your name?").', 'sentence', 'Apa ini? Apa itu? Apa nama awak?', 'Three high-frequency "apa" questions.', null, [ACT.grammarQuestions]),
    createContentItem('siapa', 'si.a.pa', 'WHO — pronoun for persons. "Siapa awak?" ("Who are you?"), "Siapa pensyarah awak?" ("Who is your lecturer?").', 'sentence', 'Siapa awak? Siapa dia? Siapa nama pensyarah?', 'Three high-frequency "siapa" questions.', null, [ACT.grammarQuestions]),
    createContentItem('mana', 'ma.na', 'WHERE — pronoun for places. Usually paired with "di" (at/in): "Di mana perpustakaan?" ("Where is the library?"). With "dari" (from): "Awak dari mana?" ("Where are you from?").', 'sentence', 'Di mana perpustakaan? Awak dari mana? Ke mana awak pergi?', 'Three location questions: at, from, to.', null, [ACT.grammarQuestions]),
    createContentItem('bila', 'bi.la', 'WHEN — for time. "Bila kelas?" ("When is class?"). Same word order as a statement.', 'sentence', 'Bila peperiksaan bermula? Bila awak datang ke UM?', '"When does the exam start?" / "When did you come to UM?".', null, [ACT.grammarQuestions]),
    createContentItem('bagaimana / macam mana', 'ba.gai.ma.na / ma.tʃam ma.na', 'HOW — "bagaimana" is the formal version; "macam mana" is the casual everyday version. "Bagaimana awak datang ke UM?" / "Macam mana awak datang ke UM?".', 'sentence', 'Bagaimana awak menyelesaikan masalah ini? / Macam mana awak buat?', '"How do you solve this problem?" (formal) / "How do you do it?" (casual).', null, [ACT.grammarQuestions]),

    // Reading
    createContentItem('Risalah Fakulti Sains UM', 'ri.sa.lah fa.kul.ti sains u.em', 'A short brochure paragraph for UM Faculty of Science.', 'sentence', 'Fakulti Sains Universiti Malaya menawarkan lebih daripada 20 program ijazah pertama dalam bidang Sains Komputer, Biologi, Kimia, Fizik, Matematik, dan Statistik. Pelajar belajar di Dewan Kuliah B dan menggunakan makmal di blok C. Perpustakaan Sains buka setiap hari kecuali Ahad. Pendaftaran kursus dilakukan secara dalam talian melalui MAYA UM.', 'A typical UM brochure passage — mentions Dewan Kuliah B (lecture hall), blok C (lab block), MAYA UM (UM\'s student portal).', [
      { target: 'menawarkan', note: 'me- + tawar "offer" + -kan = "to offer"; classic me-kan transitive verb' },
      { target: 'bidang', note: 'field / discipline' },
      { target: 'kecuali', note: 'except' },
      { target: 'pendaftaran', note: 'pen- + daftar "register" + -an = "registration"' },
      { target: 'dalam talian', note: 'online — literal "in line"; native BM coinage' },
    ], [ACT.reading]),
    createContentItem('Soalan kefahaman', 'so.a.lan kə.fa.ha.man', 'Four comprehension questions that make the learner retrieve numbers, locations, opening times, and process language from the reading instead of only recognizing isolated classroom words.', 'sentence', 'Q1: Berapa program ditawarkan? Q2: Di mana pelajar belajar? Q3: Bila Perpustakaan Sains tutup? Q4: Bagaimana pelajar mendaftar kursus?', 'Answer in short complete Malay sentences so the reading also rehearses question words and institutional vocabulary.', null, [ACT.reading]),

    // Listening
    createContentItem('Dialog: tutorial pertama', 'di.a.log: tu.to.ri.al pər.ta.ma', 'A 5-turn tutorial dialogue between Dr. Aishah and Sarah (international student).', 'sentence', 'Dr. Aishah: Apa khabar, Sarah? Bagaimana minggu pertama awak di UM?\nSarah: Khabar baik, Dr. Aishah. Saya seronok, tetapi sedikit penat.\nDr. Aishah: Tidak mengapa. Awak ada buku teks kursus ini?\nSarah: Belum, Dr. Aishah. Boleh saya beli di mana?\nDr. Aishah: Awak boleh beli di Koperasi UM atau muat turun versi digital.', 'Tutorial dialogue covering greetings, well-being, materials.', [
      { target: 'minggu pertama', note: 'first week' },
      { target: 'sedikit penat', note: 'a little tired' },
      { target: 'belum', note: 'not yet (vs "tidak" = not)' },
      { target: 'Koperasi UM', note: 'UM Cooperative bookstore' },
      { target: 'muat turun', note: 'download — native BM coinage (load + down)' },
    ], [ACT.listening]),

    // Writing
    createContentItem('Tulis tentang pengajian awak', 'tu.lis tən.taŋ pə.ŋa.dʒi.an a.waʔ', '4-5 sentence template for describing your studies.', 'sentence', 'Template: Saya pelajar tahun ___ di Universiti Malaya. Jurusan saya ialah ___. Saya ambil ___ kursus semester ini. Kursus kegemaran saya ialah ___ kerana ___. Bilik kuliah saya di Fakulti ___.', 'Use ini/itu, the noun-adjective order, and at least one ialah definition.', null, [ACT.writing]),

    // Culture
    createContentItem('UM, USM, UKM, UPM, UTM', 'u.em / u.es.em / u.ka.em / u.pe.em / u.te.em', 'Malaysia\'s five major research universities. UM (KL, est. 1949 — flagship); USM (Penang, est. 1969 — known for sciences); UKM (Bangi/Selangor, est. 1970 — Malay-language teaching tradition); UPM (Serdang, est. 1971 — agriculture/engineering); UTM (Skudai, JB, est. 1972 — engineering).', 'sentence', 'UM di KL, USM di Pulau Pinang, UKM di Bangi.', 'Three of the five flagship research universities; each city is a separate intellectual hub.', null, [ACT.culture]),
    createContentItem('Pelbagai etnik di universiti', 'pəl.ba.gai et.niʔ di u.ni.vər.si.ti', 'Malaysian public universities intake reflects national diversity: Malays, Chinese-Malaysians, Indian-Malaysians, indigenous Sabah/Sarawak Bumiputera, plus international students from Indonesia, Pakistan, Nigeria, China, Korea.', 'sentence', 'Di UM, anda akan jumpa kawan dari Sabah, Sarawak, China, India, dan Nigeria.', '"At UM, you will meet friends from Sabah, Sarawak, China, India, and Nigeria" — the multi-ethnic, multi-national reality.', null, [ACT.culture]),
    createContentItem('MAYA UM — portal pelajar', 'ma.ja u.em', 'MAYA UM is the student portal: course registration, results, fee payment, timetables. Every UM student lives in MAYA.', 'sentence', 'Daftar kursus melalui MAYA sebelum tarikh tutup.', '"Register courses via MAYA before the closing date".', null, [ACT.culture]),

    // Task
    createContentItem('Tugasan: tutorial pertama', 'tu.ga.san: tu.to.ri.al pər.ta.ma', 'Roleplay a 5-turn first-tutorial scene at UM. The AI tutor plays Dr. Aishah; you play the international student. Cover: greeting, who you are, which kursus you take, one question about classroom materials, and a polite close.', 'sentence', 'Scene: Pertama kali masuk tutorial di Fakulti Sains, UM.', 'Anchor your roleplay in a real UM classroom situation.', null, [ACT.task]),
  ],
};

module.exports = lesson;
