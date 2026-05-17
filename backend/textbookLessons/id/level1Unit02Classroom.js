// Level 1 Unit 2 — Classroom & Campus (Bahasa Indonesia)
// Functions: navigating a UI classroom, asking what something is called in
// Indonesian, requesting help from a lecturer, checking-in on a homework, and
// the polite forms of asking permission at university.

const createContentItem = (target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type,
  activityIds,
  targetText: target,
  romanization,
  nativeText: note,
  pronunciation: romanization,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'id-l1u2-orientation',
  pronunciation: 'id-l1u2-pronunciation',
  vocabularyClassroom: 'id-l1u2-vocab-classroom',
  vocabularyActions: 'id-l1u2-vocab-actions',
  grammarIni: 'id-l1u2-grammar-ini',
  grammarPossession: 'id-l1u2-grammar-possession',
  grammarAdaTidakAda: 'id-l1u2-grammar-ada',
  reading: 'id-l1u2-reading',
  listening: 'id-l1u2-listening',
  writing: 'id-l1u2-writing',
  culture: 'id-l1u2-culture',
  task: 'id-l1u2-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: [
    'Identify the items around a UI classroom (papan tulis, kursi, meja, proyektor, buku) and ask "Ini apa?" / "Itu apa?" when you don\'t know a word.',
    'Ask a lecturer for help in Indonesian: "Maaf, Pak, saya tidak mengerti", "Bisakah Bapak mengulang?", "Boleh saya bertanya?".',
    'Use the basic spatial deictics ini (this, near speaker), itu (that, near listener or distant), di sini, di situ, di sana.',
  ], task: 'Picture your first orientation class at UI Depok. By the end of this lesson you should ask any classroom-related question in Indonesian, recognize what your lecturer holds up, and politely ask for permission to leave or ask a question.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in classroom vocabulary', goals: [
    'Pronounce ng in "papan tulis" /papan tulis/ (no ng) vs "ruang" /ruaŋ/ (ng = /ŋ/) — distinguish the two on hearing.',
    'Apply the schwa rule to "mengerti" /məŋərti/: TWO schwas (me- and -er-), full /i/ at the end; stress on the penultimate /ti/.',
    'Pronounce loanwords with Indonesian phonology: "proyektor" /proˈjektor/ (NOT English "pro-JECT-or"), "kalkulator" /kalkulator/ (NOT English "CAL-cu-lay-tor").',
  ], task: 'Read fifteen classroom words aloud and mark the schwas; identify single ng /ŋ/ vs double letters.' },
  { id: ACT.vocabularyClassroom, section: 'Vocabulary I', title: 'Classroom items and spaces', goals: [
    'Memorize 14 classroom and campus items: kelas, ruang, papan tulis, kursi, meja, buku, pena, pensil, kertas, tas, laptop, proyektor, jam, jendela.',
    'Connect each item to a real action it enables: "Saya menulis dengan pena di kertas" — locating Indonesian vocabulary in real motion.',
  ], task: 'Look around your room and label five real objects in Indonesian; use each in a short sentence.' },
  { id: ACT.vocabularyActions, section: 'Vocabulary II', title: 'Classroom actions and questions', goals: [
    'Use 10 high-frequency classroom verbs: mendengar (listen), menulis (write), membaca (read), berbicara (speak), bertanya (ask), menjawab (answer), mengerti (understand), mengulang (repeat), belajar (study), istirahat (rest).',
    'Distinguish the meN- active forms from the ber- intransitive forms: menulis (writes X) vs berbicara (speaks intransitively).',
  ], task: 'For each of the 10 verbs, produce one sentence using it; identify which prefix it carries and why.' },
  { id: ACT.grammarIni, section: 'Grammar I', title: 'ini / itu deictic system', goals: [
    'Use ini for objects close to the speaker, itu for objects close to the listener OR distant. "Ini buku saya" (this is my book — in my hand), "Itu buku Anda" (that is your book — in your hand or across the room).',
    'Combine ini/itu with question word apa: "Ini apa?" "Itu apa?" — the basic "what is this/that?" question.',
    'Use the spatial trio: di sini (here, near speaker), di situ (there, near listener), di sana (over there, far from both).',
  ], task: 'Walk around a room pointing at five objects and saying "Ini X" or "Itu X" with correct deixis.' },
  { id: ACT.grammarPossession, section: 'Grammar II', title: 'Noun-first possession patterns', goals: [
    'Form possessives by placing the noun BEFORE the possessor: buku saya (my book), pena Anda (your pen), kelas kami (our class). Opposite of English "my book" word order.',
    'Choose between full pronouns (buku saya — polite) and enclitic forms (bukuku — intimate; bukumu — casual; bukunya — his/her/the).',
    'Form a possessive question: "Buku siapa ini?" ("Whose book is this?") — siapa as the possessive question word.',
  ], task: 'Convert five English possessives ("my book, your pen, his pencil, our class, their teacher") into Indonesian; do each with both full and enclitic forms.' },
  { id: ACT.grammarAdaTidakAda, section: 'Grammar III', title: 'ada / tidak ada (existential)', goals: [
    'Use ada to mark existence: "Ada buku di meja" ("There is a book on the table"), "Ada lima mahasiswa" ("There are five students"). Ada has no English equivalent — it functions like "there is/are" + sometimes "to have".',
    'Negate with tidak ada: "Tidak ada kursi di sini" ("There is no chair here"). Note that ada is a verb, so tidak (not bukan) is the correct negation.',
    'Apply ada in the "have" sense: "Saya ada pertanyaan" ("I have a question") — a casual alternative to "Saya punya pertanyaan".',
  ], task: 'Describe five objects around you using ada / tidak ada; mix the existential and possessive senses.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'Read a class observation', goals: [
    'Read a 6-sentence paragraph describing a UI classroom scene with correct rhythm.',
    'Answer comprehension questions about what objects are present, who is doing what action, and the spatial relationships.',
  ], task: 'Read the paragraph aloud and answer five questions in complete short sentences.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'A student asks for help', goals: [
    'Follow a 5-turn dialogue between a confused student and a lecturer at UI; identify the polite request markers (maaf, Pak; bolehkah; bisakah).',
    'Reproduce the dialogue switching roles; vary the question topic (homework deadline, vocabulary, exam date).',
  ], task: 'Read the polite dialogue with the AI tutor, then perform it again as the lecturer.' },
  { id: ACT.writing, section: 'Writing', title: 'Describe your classroom', goals: [
    'Write 4–6 sentences describing your current classroom or study space in Indonesian.',
    'Include at least one ada sentence, one ini/itu sentence, and one possessive structure.',
  ], task: 'Write the description, then read it aloud with correct stress and schwa.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Classroom hierarchy at Indonesian universities', goals: [
    'Recognize that Indonesian university classrooms maintain a clear dosen-mahasiswa hierarchy — much more so than typical Western classrooms.',
    'Always address the lecturer as Pak/Bu + given name; stand briefly when first speaking; ask "Permisi" before interrupting.',
    'Understand the "datang tepat waktu" cultural expectation — Indonesian universities increasingly enforce punctuality, contrasting with the older "jam karet" (rubber time) stereotype.',
  ], task: 'Compare classroom etiquette in your home culture with the Indonesian model; identify three differences.' },
  { id: ACT.task, section: 'Task', title: 'First class at UI', goals: [
    'Combine vocabulary, deictics, possessives, and polite requests in one continuous scene at a UI lecture hall.',
  ], task: 'Roleplay your first class at UI with the AI tutor as your lecturer; aim for 6 turns covering greeting, identifying classroom items, asking a question, getting an answer, and signing off.' },
];

const lesson = {
  title: 'Level 1 · Unit 2: Di Kelas — Classroom and Campus',
  category: 'classroom',
  difficulty: 'beginner',
  targetLang: 'id',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'naming-objects', label: 'Naming classroom objects', goal: 'Identify and name 14 classroom items using ini/itu deixis.' },
    { id: 'asking-help', label: 'Asking for help', goal: 'Ask a lecturer politely for clarification, repetition, or permission.' },
    { id: 'spatial-deictic', label: 'Spatial location', goal: 'Use di sini, di situ, di sana correctly for three-way distance distinction.' },
    { id: 'expressing-possession', label: 'Possession', goal: 'Use noun-first possessive structures with both full pronouns and enclitics.' },
  ],
  relatedPools: ['topic-education', 'topic-objects'],
  content: [
    // Activity 1 — Orientation
    createContentItem('Tujuan unit', 'tu-juan u-nit', 'By the end of this unit you can name everything around a UI classroom in Indonesian, ask "what is this called?" when you don\'t know a word, locate objects in space using ini/itu/sini/situ/sana, and politely request help from a lecturer using Pak/Bu + permission verbs.', 'word', 'Saya bisa berbicara tentang barang di kelas.', '"I can talk about items in the classroom" — minimum competence for surviving an Indonesian academic environment.', null, [ACT.orientation]),
    createContentItem('Adegan: kelas pengantar ilmu komputer', 'a-də-gan: kə-las pə-ngan-tar il-mu kom-pu-ter', 'You walk into your first "Pengantar Ilmu Komputer" (Introduction to Computer Science) class at UI Depok. The lecturer Pak Budi greets the class and starts pointing at objects on the desk. You need to follow along and ask about anything you don\'t recognize.', 'word', 'Pak Budi: "Selamat pagi, semuanya! Ini buku panduan kuliah. Itu papan tulis. Ada pertanyaan?"', 'A typical opening minute of an Indonesian lecture: greeting + pointing + ada-question for participation.', [
      { target: 'buku panduan kuliah', note: '"course guide book" — panduan = "guide", from root pandu' },
      { target: 'papan tulis', note: 'whiteboard, blackboard; literally "writing board"; high frequency in academic settings' },
      { target: 'Ada pertanyaan?', note: 'literal "Is there a question?"; the standard end-of-segment check-in by any Indonesian lecturer' },
    ], [ACT.orientation]),

    // Activity 2 — Pronunciation
    createContentItem('ruang vs papan', 'ru-aŋ vs pa-pan', 'Two common classroom words illustrating the ng/no-ng contrast. Ruang /ruaŋ/ "room" ends in single /ŋ/ (the velar nasal). Papan /papan/ "board" ends in /n/ (the alveolar nasal). Mixing the two changes meaning.', 'word', 'ruang kelas vs papan tulis', '"classroom" (ruang) vs "whiteboard" (papan tulis) — distinctive nasal endings.', null, [ACT.pronunciation]),
    createContentItem('mengerti', 'mə-ŋər-ti', 'A four-syllable verb critical for classroom interaction: "Saya mengerti" / "Saya tidak mengerti" ("I understand / I do not understand"). Pronunciation: TWO schwas (me- and -er-), single /ŋ/ from the meN- prefix sandhi (meN- + erti → mengerti), full /i/ at the end. The schwa-schwa-full rhythm is signature affixed Indonesian.', 'word', 'Maaf, saya tidak mengerti.', '"Sorry, I don\'t understand" — the safest classroom phrase in your toolkit.', null, [ACT.pronunciation]),
    createContentItem('proyektor', 'pro-jek-tor', 'A loanword from Dutch "projector" / English "projector". Indonesian phonology: stress on -JEK-, no English diphthongs on the vowels (clean /e/ not /ej/), final r tapped or trilled. Many Indonesian classrooms now use proyektor + LCD; the older "OHP" (overhead projector) is mostly gone.', 'word', 'Proyektor di kelas kami baru.', '"The projector in our class is new" — baru as postnominal adjective; kami because the speaker excludes the listener.', null, [ACT.pronunciation]),
    createContentItem('jadwal', 'dʒad-wal', 'A two-syllable Arabic-loan word meaning "schedule / timetable", appearing in every classroom context: jadwal kuliah, jadwal ujian. Pronunciation: /dʒ/ initial, /a/ in both syllables, no schwa, penultimate stress.', 'word', 'Jadwal kuliah kami padat.', '"Our class schedule is packed" — padat = "dense"; a high-frequency academic complaint.', null, [ACT.pronunciation]),
    createContentItem('Pak Budi vs Bu Sari', 'paʔ bu-di vs bu sa-ri', 'Two titles you will use constantly. Pak /paʔ/ (short for Bapak) has a glottal stop final k. Bu /bu/ (short for Ibu) is a single open syllable. Both followed by the given name in everyday classroom address.', 'word', 'Pak Budi, ada pertanyaan untuk Anda. · Bu Sari, terima kasih.', 'Two standard student-to-lecturer phrases; notice Pak has glottal /paʔ/, Bu has plain /bu/.', null, [ACT.pronunciation]),

    // Activity 3 — Vocabulary I (classroom items)
    createContentItem('kelas', 'kə-las', 'A class or classroom; covers both the social unit (the group of students) and the physical room. "Saya ada kelas hari ini" (I have a class today). The schwa on the first syllable makes the word almost monosyllabic in fast speech.', 'word', 'Kelas pengantar kalkulus dimulai jam 8.', '"Introductory calculus class starts at 8 o\'clock" — dimulai = di- + mulai (passive "is started").', null, [ACT.vocabularyClassroom]),
    createContentItem('ruang', 'ru-aŋ', 'A room or space; more specifically the physical room. "Ruang kelas" (classroom space), "ruang dosen" (lecturer\'s office), "ruang tunggu" (waiting room). Final ng = single /ŋ/.', 'word', 'Ruang kelas kami di lantai dua.', '"Our classroom is on the second floor" — lantai "floor"; the kami excludes the listener.', null, [ACT.vocabularyClassroom]),
    createContentItem('papan tulis', 'pa-pan tu-lis', 'A whiteboard or blackboard, literally "writing board". The verb root tulis "to write" + papan "board". In modern UI classrooms papan tulis is whiteboard; the older blackboard (papan tulis hitam) is mostly gone.', 'word', 'Tolong tulis di papan tulis.', '"Please write on the whiteboard" — tolong = "please / kindly"; the polite request opener.', null, [ACT.vocabularyClassroom]),
    createContentItem('kursi', 'kur-si', 'A chair. Loanword from Arabic kursī. Penultimate stress, both vowels short and clean. Plural is kursi-kursi or "banyak kursi".', 'word', 'Silakan duduk di kursi.', '"Please sit on the chair" — silakan = polite invitation marker; duduk = sit (root, no affix needed).', null, [ACT.vocabularyClassroom]),
    createContentItem('meja', 'me-dʒa', 'A table or desk. Penultimate stress on /me/, full /e/ (not schwa). The word covers any flat-topped piece of furniture from a small desk to a large dining table; context disambiguates.', 'word', 'Buku saya di atas meja.', '"My book is on top of the table" — di atas = on top of; spatial preposition.', null, [ACT.vocabularyClassroom]),
    createContentItem('buku', 'bu-ku', 'A book. The unmarked default; specific types specified by compound: buku panduan (guidebook), buku catatan (notebook), buku tulis (notebook for writing), buku teks (textbook).', 'word', 'Buku catatan saya hilang.', '"My notebook is lost" — hilang = "disappear, lose"; intransitive (no di- needed).', null, [ACT.vocabularyClassroom]),
    createContentItem('pena', 'pe-na', 'A pen. Borrowed from English "pen". Note: pulpen also exists (from Dutch "vulpen", "fountain pen"), and many Indonesians use both interchangeably for any ink pen. Younger speakers tend toward pena.', 'word', 'Saya pinjam pena Anda boleh?', '"May I borrow your pen?" — pinjam = "borrow"; boleh = "may" placed at end as politeness softener.', null, [ACT.vocabularyClassroom]),
    createContentItem('pensil', 'pen-sil', 'A pencil. Loanword. Distinct from pena: pensil is graphite (erasable), pena is ink. The diminutive pensil warna (colored pencil) is used in art classes; HB, 2B, 4B grades are standard.', 'word', 'Tolong pinjam pensil kalau ada.', '"Please lend a pencil if there is one" — kalau = "if"; ada = existential check.', null, [ACT.vocabularyClassroom]),
    createContentItem('kertas', 'kər-tas', 'Paper. Penultimate-syllable schwa /kər/ + full /tas/. Plural is kertas-kertas or "banyak kertas". Compounds: kertas ujian (exam paper), kertas A4, kertas folio (foolscap, still common in formal documents).', 'word', 'Tulis nama Anda di kertas ini.', '"Write your name on this paper" — tulis as bare imperative verb (no prefix needed for direct command).', null, [ACT.vocabularyClassroom]),
    createContentItem('tas', 'tas', 'A bag. A monosyllabic native word. Specific types: tas ransel (backpack), tas selempang (sling bag), tas tangan (handbag, lit. "hand bag"). Every UI mahasiswa carries a tas with books, laptop, and a water bottle for the long walk between fakultas buildings.', 'word', 'Tas saya berat sekali hari ini.', '"My bag is very heavy today" — berat sekali = "very heavy"; sekali is the intensifier "very" placed after the adjective.', null, [ACT.vocabularyClassroom]),
    createContentItem('laptop', 'lep-top', 'A laptop computer. Loanword from English, but pronounced with Indonesian phonology — first syllable /lep-/ closer to "lep" than English "lap-". Critical for every modern mahasiswa; most UI courses now require laptop use.', 'word', 'Laptop saya rusak.', '"My laptop is broken" — rusak = "broken, damaged"; intransitive stative.', null, [ACT.vocabularyClassroom]),
    createContentItem('proyektor', 'pro-jek-tor', 'A projector. Loanword from Dutch/English. Used to display lecture slides in nearly every UI classroom. The full setup is often called "proyektor + LCD".', 'word', 'Proyektor kelasnya rusak.', '"The class\'s projector is broken" — -nya enclitic possessive marking the class as owner.', null, [ACT.vocabularyClassroom]),
    createContentItem('jam', 'dʒam', 'A clock OR an hour, depending on context. "Jam dinding" (wall clock), "jam tangan" (wristwatch), "jam delapan" (eight o\'clock). The polysemy is similar to English "hour/o\'clock".', 'word', 'Jam berapa sekarang? — Jam sembilan pagi.', '"What time is it now?" — "Nine in the morning" — standard time exchange.', null, [ACT.vocabularyClassroom]),
    createContentItem('jendela', 'dʒən-de-la', 'A window. Note the schwa-full-full pattern: /dʒəndela/. Common in classroom descriptions ("Buka jendela" — open the window) and in idiom ("jendela dunia" — window to the world, used in advertising for books and travel).', 'word', 'Tolong tutup jendela, dingin sekali.', '"Please close the window, it\'s very cold" — tutup = close; dingin = cold; sekali intensifier.', null, [ACT.vocabularyClassroom]),

    // Activity 4 — Vocabulary II (actions)
    createContentItem('mendengar', 'mən-də-ngar', 'To hear / to listen (transitive). meN- + dengar. The verb takes a direct object: "Saya mendengar musik" ("I am listening to music"). For "to listen carefully", use mendengarkan (with -kan suffix adding focused attention).', 'word', 'Dengarkan baik-baik!', '"Listen carefully!" — imperative form drops me- prefix; baik-baik is the reduplicated intensifier "well, carefully".', null, [ACT.vocabularyActions]),
    createContentItem('menulis', 'mə-nu-lis', 'To write (transitive). meN- + tulis (with t-deletion sandhi). Takes a direct object: "Saya menulis surat" ("I am writing a letter"). Bare imperative: "Tulis!". Passive: ditulis.', 'word', 'Mahasiswa menulis catatan kuliah.', '"The student writes lecture notes" — catatan kuliah = "lecture notes"; catatan from catat "to note".', null, [ACT.vocabularyActions]),
    createContentItem('membaca', 'məm-ba-tʃa', 'To read (transitive). meN- + baca (with no consonant deletion because b stays). Takes a direct object: "Saya membaca buku" ("I am reading a book"). Bare imperative: "Baca!". Passive: dibaca.', 'word', 'Tolong baca halaman 25.', '"Please read page 25" — halaman = page; numeric specification follows the noun.', null, [ACT.vocabularyActions]),
    createContentItem('berbicara', 'bər-bi-tʃa-ra', 'To speak (intransitive). ber- + bicara. Cannot take a direct object directly — needs a preposition: "berbicara tentang X" (speak about X), "berbicara dengan X" (speak with X). For "to say something" use mengatakan with -kan suffix.', 'word', 'Saya berbicara dengan dosen.', '"I am speaking with the lecturer" — dengan = with; berbicara needs the preposition.', null, [ACT.vocabularyActions]),
    createContentItem('bertanya', 'bər-ta-ɲa', 'To ask a question (intransitive). ber- + tanya. To ask "about" something use bertanya tentang; to ask "to" someone use bertanya kepada. Bertanya is itself ny-internal /bərˈtaɲa/.', 'word', 'Boleh saya bertanya, Pak?', '"May I ask a question, sir?" — the standard polite classroom opener for a question.', null, [ACT.vocabularyActions]),
    createContentItem('menjawab', 'mən-dʒa-wab', 'To answer (transitive). meN- + jawab. Takes a direct object: "Mahasiswa menjawab pertanyaan" ("The student answers the question"). Passive: dijawab.', 'word', 'Tolong jawab pertanyaan ini.', '"Please answer this question" — bare imperative jawab without me- prefix.', null, [ACT.vocabularyActions]),
    createContentItem('mengerti', 'mə-ŋər-ti', 'To understand. meN- + erti (the root erti is rare alone; mengerti is the everyday form). "Saya mengerti" or "Saya tidak mengerti" — the most useful classroom feedback phrase. Synonym: paham, memahami.', 'word', 'Saya belum mengerti, bisa diulang?', '"I don\'t understand yet, can it be repeated?" — belum (not yet, open) + passive di- form of ulang.', null, [ACT.vocabularyActions]),
    createContentItem('mengulang', 'mə-ŋu-lang', 'To repeat (transitive). meN- + ulang. Lecturers and students alike use this constantly: "Bisa diulang?" ("Can it be repeated?"). Passive: diulang.', 'word', 'Tolong ulang sekali lagi.', '"Please repeat one more time" — sekali lagi = once more; lagi as the repetition particle.', null, [ACT.vocabularyActions]),
    createContentItem('belajar', 'bə-la-dʒar', 'To study / learn (intransitive). ber- + ajar (with b+a → bel sandhi). Studying without an explicit object: "Saya belajar" (I study). To "study X" use belajar X with no preposition: "Saya belajar bahasa Indonesia" (I study Indonesian). For "to teach", use mengajar.', 'word', 'Saya belajar bahasa Indonesia di UI.', '"I study Indonesian at UI" — di + location; no preposition needed for the object bahasa Indonesia.', null, [ACT.vocabularyActions]),
    createContentItem('istirahat', 'is-ti-ra-hat', 'To rest / take a break (intransitive). A four-syllable Arabic-loan root. "Istirahat sebentar" (take a short break) is the standard mid-lecture announcement. UI classes typically have a 10-minute jeda between consecutive sessions.', 'word', 'Mari kita istirahat sepuluh menit.', '"Let us rest ten minutes" — Mari kita = "let\'s us (inclusive)"; the standard polite proposal opener.', null, [ACT.vocabularyActions]),

    // Activity 5 — Grammar I: ini / itu
    createContentItem('ini', 'i-ni', 'Demonstrative "this" — for items NEAR the speaker. "Ini buku saya" (this is my book, in my hand). When used as a question subject: "Ini apa?" ("What is this?"). Indonesian deixis is two-way at the basic level (ini/itu) and three-way with location (sini/situ/sana).', 'sentence', 'Ini meja. Ini kursi. Ini buku saya.', 'Three identification sentences with ini; zero copula throughout.', [
      { target: 'Ini apa?', note: 'standard "what is this?" question for objects near the speaker' },
      { target: 'Ini siapa?', note: 'standard "who is this?" question for people near the speaker — useful for photos and introductions' },
      { target: 'Ini X', note: 'identification statement; no copula needed' },
    ], [ACT.grammarIni]),
    createContentItem('itu', 'i-tu', 'Demonstrative "that" — for items near the LISTENER or distant from both. "Itu papan tulis" (that is the whiteboard, on the wall away from me). Indonesian itu is less ambiguous than English "that" because the distinct sini/situ/sana axis carries some of the spatial work.', 'sentence', 'Itu papan tulis. Itu dosen kami. Itu buku teks ilmu komputer.', 'Three identification sentences with itu for distant or listener-near objects.', [
      { target: 'Itu apa?', note: '"What is that?" — for objects across the room' },
      { target: 'Itu siapa?', note: '"Who is that?" — for people across the room' },
      { target: 'Itu juga buku saya', note: '"That is also my book" — juga = also' },
    ], [ACT.grammarIni]),
    createContentItem('di sini / di situ / di sana', 'di si-ni / di si-tu / di sa-na', 'Three-way location system: di sini (here, near speaker), di situ (there, near listener), di sana (over there, far from both). English collapses this to "here / there". The Indonesian sana is distinctly distal — like Spanish "allí" or Japanese "asoko".', 'sentence', 'Saya di sini, Anda di situ, dia di sana.', '"I am here, you are there, he/she is over there" — minimal three-way distance illustration.', [
      { target: 'di sini', note: 'near the speaker — proximal' },
      { target: 'di situ', note: 'near the listener — medial' },
      { target: 'di sana', note: 'far from both speaker and listener — distal' },
    ], [ACT.grammarIni]),
    createContentItem('Buku siapa ini?', 'bu-ku si-a-pa i-ni', 'A possessive question: "Whose book is this?" Word order: NOUN + siapa + ini/itu. Note: siapa (who) doubles as the possessive interrogative "whose" — Indonesian does not have a separate word.', 'sentence', 'Buku siapa ini? — Itu buku saya, terima kasih.', '"Whose book is this?" — "That is my book, thank you" — minimal possessive question-answer.', null, [ACT.grammarIni]),

    // Activity 6 — Grammar II: Possession
    createContentItem('Possessor follows the noun', 'kə-pe-mi-li-kan', 'In Indonesian, the possessor comes AFTER the noun: buku saya (my book), pena Anda (your pen), rumah kami (our house). This is the OPPOSITE of English "my book" word order. Indonesian shares this with Malay, Tagalog, and many Austronesian languages.', 'sentence', 'rumah saya, mobil Anda, sepeda dia, kelas kami', 'Four NP+possessor structures; the possessor pronoun sits immediately after the noun, no preposition.', null, [ACT.grammarPossession]),
    createContentItem('Enclitic possessives -ku / -mu / -nya', '-ku / -mu / -nya', 'Three high-frequency enclitic possessives: -ku (my, from aku), -mu (your-casual, from kamu), -nya (his/her/its, from dia). Attached directly to the noun: namaku, namamu, namanya. Much more common in everyday speech than the full form.', 'sentence', 'Bukuku di sini, bukumu di situ, bukunya di sana.', '"My book is here, your book is there, his/her book is over there" — three enclitics in a single sentence showing the deictic + possession combo.', null, [ACT.grammarPossession]),
    createContentItem('Compound possessives', 'kom-pa-und ke-pe-mi-li-kan', 'Stacked possession: noun + possessor + possessor. "Rumah teman saya" ("my friend\'s house"; lit. "house friend my"). Read RIGHT-TO-LEFT: my → friend → house. The rightmost is the head; each leftward element specifies more.', 'sentence', 'rumah teman saya, kelas dosen bahasa Indonesia kami', 'Two compound possessives showing how Indonesian stacks rightward; native speakers parse fluidly.', null, [ACT.grammarPossession]),
    createContentItem('punya — explicit "to have"', 'pu-ɲa', 'For explicit possession, use the verb punya: "Saya punya buku" (I have a book). Punya is more concrete than ada (existential); use punya when the possession is the focus, ada when existence is the focus. Past: "Saya pernah punya..." ("I used to have..."), negated: "Saya tidak punya...".', 'sentence', 'Saya punya laptop baru. Anda punya pertanyaan?', 'Two punya sentences; the verb is a standalone bare form, no me- prefix needed in casual register.', null, [ACT.grammarPossession]),

    // Activity 7 — Grammar III: ada / tidak ada
    createContentItem('ada', 'a-da', 'A high-frequency verb meaning roughly "there is/are" OR "to exist" OR (casually) "to have". "Ada buku di meja" (There is a book on the table). "Ada banyak mahasiswa" (There are many students). "Saya ada pertanyaan" (I have a question — casual). One verb covers what English does with multiple constructions.', 'sentence', 'Ada buku di meja. Ada lima mahasiswa di kelas. Saya ada pertanyaan.', 'Three ada sentences in three different senses: existential, quantified existence, possession.', null, [ACT.grammarAdaTidakAda]),
    createContentItem('tidak ada', 'ti-daʔ a-da', 'Negative of ada: "tidak ada" (there is no / does not exist / does not have). "Tidak ada kursi di sini" (There is no chair here). Because ada is a verb, the negation is tidak (not bukan).', 'sentence', 'Tidak ada papan tulis di sini. Saya tidak ada waktu.', '"There is no whiteboard here. I have no time" — tidak ada in two senses.', null, [ACT.grammarAdaTidakAda]),
    createContentItem('ada vs punya', 'a-da vs pu-ɲa', 'Both can express "have", but with different focus. "Saya ada waktu" (I have time available — existence focus). "Saya punya tiga buku" (I own three books — possession focus). For physical objects, punya is more natural; for time, opportunity, qualities, ada is more natural.', 'sentence', 'Saya ada waktu. Saya punya buku. (Both OK; emphasis differs.)', 'Two sentences showing the subtle distinction; native speakers don\'t analyze it consciously but pick one fluidly.', null, [ACT.grammarAdaTidakAda]),
    createContentItem('Existential question: Ada X?', 'a-da X?', 'Form an existential question by fronting ada with rising intonation: "Ada pena?" ("Is there a pen?", "Do you have a pen?"). Reply: "Ada" (yes, there is) or "Tidak ada" (no, there isn\'t). Extremely high-frequency in everyday speech.', 'sentence', 'A: Ada laptop? — B: Ada, di tas saya.', '"Do you have a laptop?" — "Yes, in my bag" — minimal everyday exchange.', null, [ACT.grammarAdaTidakAda]),

    // Activity 8 — Reading
    createContentItem('Hari pertama di kelas', 'ha-ri pər-ta-ma di kə-las', 'A six-sentence paragraph describing a first-day classroom scene at UI. Read aloud with correct stress and schwa rhythm, then answer the comprehension questions.', 'sentence', 'Ini ruang kelas saya di Universitas Indonesia. Di depan ada papan tulis besar dan proyektor. Kursi dan meja mahasiswa ada banyak — kira-kira 40 buah. Dosen kami, Pak Budi, sangat ramah. Beliau mengajar pengantar ilmu komputer setiap hari Senin dan Rabu. Saya sangat senang belajar di sini.', '"This is my classroom at UI. In front there is a large whiteboard and a projector. Many chairs and desks for students — around 40 pieces. Our lecturer, Pak Budi, is very friendly. He teaches Introduction to Computer Science every Monday and Wednesday. I am very happy studying here."', [
      { target: 'Di depan ada X', note: '"In front (there) is X" — di depan = "in front" + existential ada' },
      { target: 'kira-kira 40 buah', note: '"approximately 40 (pieces)" — buah is the generic inanimate classifier' },
      { target: 'sangat ramah', note: '"very friendly" — sangat is a pre-adjective intensifier, equivalent to "very"' },
      { target: 'beliau mengajar', note: '"he/she (respected) teaches" — beliau is the respectful third-person pronoun for the lecturer' },
      { target: 'setiap hari Senin dan Rabu', note: '"every Monday and Wednesday" — setiap = every; days don\'t capitalize unlike English' },
    ], [ACT.reading]),
    createContentItem('Pertanyaan pemahaman', 'pər-ta-ɲa-an pə-ma-ha-man', 'Five comprehension questions. Answer in complete short Indonesian sentences using the patterns from this unit.', 'sentence', '1) Apa yang ada di depan kelas? 2) Berapa banyak kursi? 3) Siapa nama dosen? 4) Apa yang diajarkan? 5) Hari apa kelasnya?', 'Five wh-questions exercising different content from the paragraph.', [
      { target: 'A1: Papan tulis dan proyektor.', note: 'noun phrase answer to "apa yang ada"' },
      { target: 'A2: Kira-kira 40 buah.', note: 'quantity answer with kira-kira + classifier' },
      { target: 'A3: Pak Budi.', note: 'one-word answer is acceptable for siapa' },
      { target: 'A4: Pengantar ilmu komputer.', note: 'topic answer; pengantar = "introduction to"' },
      { target: 'A5: Hari Senin dan Rabu.', note: 'two-day answer using hari + day name' },
    ], [ACT.reading]),

    // Activity 9 — Listening
    createContentItem('Bertanya kepada dosen', 'bər-ta-ɲa kə-pa-da do-sen', 'A 5-turn dialogue: a student approaches the lecturer after class with a question about the homework deadline. Notice the polite request markers — maaf, Pak; permisi; bolehkah; bisakah.', 'conversation', 'Mahasiswa: Permisi, Pak Budi. Boleh saya bertanya sebentar?\nDosen: Tentu, silakan.\nMahasiswa: Untuk tugas minggu ini, deadline-nya kapan, Pak?\nDosen: Tugas modul pertama dikumpulkan hari Jumat, jam lima sore.\nMahasiswa: Baik, terima kasih banyak, Pak.\nDosen: Sama-sama. Kalau ada kesulitan, silakan datang ke ruang dosen.', 'Standard polite student-lecturer exchange; uses Pak as direct address throughout; bertanya as the focused asking verb.', [
      { target: 'Permisi', note: '"Excuse me" — opening polite attention-getter; from Dutch "permissie"' },
      { target: 'Boleh saya bertanya', note: '"May I ask" — boleh = permission marker' },
      { target: 'sebentar', note: '"a moment" — softens the request' },
      { target: 'dikumpulkan', note: 'passive di- + kumpul + -kan: "to be submitted/collected"; kumpul root means "gather"' },
      { target: 'Kalau ada kesulitan', note: '"If there is difficulty" — kalau = if; kesulitan = ke-...-an on root sulit "difficult"' },
    ], [ACT.listening]),

    // Activity 10 — Writing
    createContentItem('Tulis tentang ruang belajar Anda', 'tu-lis tən-tang ru-aŋ bə-la-dʒar an-da', 'Writing task: write 4-6 sentences describing your current study space. Required elements: at least one ada sentence, one ini/itu sentence, and one possessive structure with either full pronoun or enclitic.', 'sentence', 'Contoh: Ini ruang belajar saya. Di meja saya ada laptop, buku, dan secangkir kopi. Kursinya sangat nyaman. Saya belajar di sini setiap malam. Jendela di sebelah kanan menghadap taman.', '"Example: This is my study space. On my desk there is a laptop, books, and a cup of coffee. The chair is very comfortable. I study here every night. The window on the right side faces the garden."', null, [ACT.writing]),

    // Activity 11 — Culture
    createContentItem('Hierarki dosen-mahasiswa', 'hi-e-rar-ki do-sen ma-ha-sis-wa', 'Indonesian university classrooms maintain a clearer dosen-mahasiswa hierarchy than typical Western classrooms. Standing briefly when first speaking, saying "Permisi" before interrupting, addressing the lecturer as Pak/Bu + given name throughout the semester — these are baseline expectations, not extra politeness.', 'sentence', 'Permisi, Pak. Boleh saya bertanya?', 'Standard student-initiates-conversation phrase; even after several months of class, this opening stays consistent.', null, [ACT.culture]),
    createContentItem('Jam karet — and its decline', 'dʒam ka-ret', '"Jam karet" (lit. "rubber time") was the older Indonesian stereotype of flexible time — meetings starting late, deadlines slipping. Modern Indonesian universities, especially flagships like UI, ITB, and UGM, strictly enforce punctuality and deadlines. The stereotype persists in casual speech but does not match academic reality.', 'sentence', 'Tepat waktu, ya. Bukan jam karet lagi.', '"On time, ok. Not rubber time anymore" — common reminder in professional Indonesian contexts.', null, [ACT.culture]),
    createContentItem('Diam adalah emas', 'di-am a-da-lah e-mas', 'A common Indonesian proverb: "Silence is gold". In classrooms, this manifests as students often hesitating to speak up unless directly asked — partly out of respect, partly out of group-harmony concerns. UI lecturers increasingly try to break this by direct calling (menunjuk) — but the cultural default leans toward quiet.', 'sentence', 'Murid yang baik tahu kapan diam.', '"A good student knows when to be silent" — diam = silent; tahu kapan = "knows when".', null, [ACT.culture]),

    // Activity 12 — Task
    createContentItem('Tugas akhir unit: Hari kuliah pertama', 'tu-gas a-xir u-nit: ha-ri ku-li-ah pər-ta-ma', 'Roleplay your first lecture at UI with the AI tutor as Pak Budi. Required exchanges: (1) greet the lecturer, (2) identify three classroom items using ini/itu, (3) ask a polite question about the homework, (4) receive the answer, (5) thank and farewell. Use formal Anda + Pak throughout.', 'conversation', '[Ruang kelas, gedung Fasilkom UI]\nKamu: [salam masuk + perkenalkan diri]\nPak Budi: Selamat datang, [nama]. Silakan duduk.\nKamu: [tanya tentang item di kelas]\nPak Budi: [menjawab]\nKamu: [tanya tentang tugas pertama]\nPak Budi: [menjelaskan deadline]\nKamu: [berterima kasih + tanya hal lain]\nPak Budi: [tutup]\nKamu: [salam pulang]', 'Eight-turn full classroom interaction; covers all unit content.', null, [ACT.task]),
  ],
};

module.exports = lesson;
