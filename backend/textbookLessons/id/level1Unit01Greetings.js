// Level 1 Unit 1 — Greetings & Self-Introduction (Bahasa Indonesia)
// Functions: greeting, introducing yourself, asking where someone is from,
// correcting a wrong assumption, farewells.
// This lesson is the canonical TEMPLATE for all Indonesian thematic Level 1 lessons.
//
// All content is authored with Latin-script Indonesian (target) + the same
// Latin spelling as a "romanization" slot + English glosses (canonical source).
// The AI conversation tutor reads this curriculum and delivers it to each
// learner in their preferred native language at runtime — never assume a
// specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"): every
// nativeText, exampleNative, and breakdown.native carries register, usage
// context, or contrast info — not a bare definition.

const createContentItem = (
  target,
  romanization,
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
  orientation: 'id-l1u1-orientation',
  pronunciation: 'id-l1u1-pronunciation',
  vocabularyGreetings: 'id-l1u1-vocab-greetings',
  vocabularyPeople: 'id-l1u1-vocab-people',
  grammarAdalah: 'id-l1u1-grammar-adalah',
  grammarPronouns: 'id-l1u1-grammar-pronouns',
  grammarNegation: 'id-l1u1-grammar-negation',
  reading: 'id-l1u1-reading',
  listening: 'id-l1u1-listening',
  writing: 'id-l1u1-writing',
  culture: 'id-l1u1-culture',
  task: 'id-l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet someone in Indonesian and say goodbye in three registers (kasual / sopan / formal) so you can match the situation — selamat pagi vs halo vs assalamualaikum.',
      'Introduce yourself with your name, country, and one role (mahasiswa / dosen / insinyur) using the saya … pattern and the optional adalah copula.',
      'Ask another person their name and where they are from using siapa nama Anda? and dari mana asal Anda?, then respond appropriately.',
    ],
    task: 'Picture your first day at Universitas Indonesia (UI) in Depok — you walk into an orientation room and meet a senior student from Yogyakarta. By the end of this lesson you should handle the whole exchange in Indonesian without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce "Selamat" /səˈlamat/ with a schwa on the first e and full /a/ on the second — many learners over-pronounce the first vowel and the word sounds wrong.',
      'Pronounce the digraphs in this unit\'s vocabulary: ng in "senang" /sənaŋ/ "happy" and "datang" /datang/ "come"; ny in "nyaman" /ɲaman/ "comfortable"; both as single phonemes, not two letters.',
      'Apply the no-final-devoicing rule to "abad" /abad/ "century", "Belanda" /bəlanda/ "Netherlands"; the d stays voiced, not /t/.',
    ],
    task: 'Read each example aloud and identify whether the e is a schwa or a full vowel; pronounce the spoken version with light penultimate stress.',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 12 greetings and farewells across three registers (formal selamat-time-of-day, neutral halo, Islamic assalamualaikum) with the right phrase for each situation.',
      'Distinguish selamat pagi (formal/polite) from halo (casual neutral) and assalamualaikum (Muslim register) — using the wrong one with the wrong person signals a mismatch in social awareness.',
    ],
    task: 'Say each phrase out loud three times with correct schwa/full-vowel distinction, then pair each one with the situation where you would use it.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and nationalities',
    goals: [
      'Use the 7 personal pronouns (saya / aku / kamu / Anda / dia / kami / kita / kalian / mereka) correctly, including the inclusive/exclusive "we" distinction (kita vs kami).',
      'State your role (mahasiswa / dosen / insinyur / dokter) and nationality (orang + country name) in a complete short sentence: "Saya orang Amerika".',
    ],
    task: 'Say your own role and nationality using the "saya (adalah) [role] orang [country]" pattern, then describe one classmate.',
  },
  {
    id: ACT.grammarAdalah,
    section: 'Grammar I',
    title: 'The zero copula and optional adalah',
    goals: [
      'Recognize that Indonesian has NO obligatory copula: "Saya mahasiswa" ("I am a student") needs no "to be". Just place the subject and predicate next to each other.',
      'Use the optional adalah for emphatic or formal equation between two nouns: "Indonesia adalah negara kepulauan terbesar di dunia" ("Indonesia is the largest archipelago country in the world"). Skip adalah in everyday speech.',
      'Form a yes/no question with rising intonation OR by adding apakah at the front: "Anda mahasiswa?" or "Apakah Anda mahasiswa?" — both mean "Are you a student?"',
    ],
    task: 'Write six identity sentences using the zero copula, then add adalah to two of them in a formal-context rewrite.',
  },
  {
    id: ACT.grammarPronouns,
    section: 'Grammar II',
    title: 'Pronouns and the kita / kami split',
    goals: [
      'Use the 7+ personal pronouns: saya (I, polite), aku (I, intimate), kamu (you, casual), Anda (you, formal), dia (he/she), kami (we, exclusive), kita (we, inclusive), kalian (you-plural), mereka (they).',
      'Apply the kita vs kami distinction CRUCIAL to Indonesian: kita INCLUDES the listener, kami EXCLUDES. "Kita makan?" = "Shall we (you and I) eat?" but "Kami sudah makan" = "We (but not you) have already eaten". Mixing these is a classic learner error.',
      'Use -ku (my, attached), -mu (your, attached), -nya (his/her/its, attached) as enclitic possessives: namaku (my name), namamu (your name), namanya (his/her name).',
    ],
    task: 'Construct three sentences contrasting kita and kami, then rewrite each with the enclitic possessives -ku, -mu, -nya.',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar III',
    title: 'Negation: tidak vs bukan',
    goals: [
      'Use tidak (often shortened to "ndak", "nggak", "gak" in casual speech) to negate verbs and adjectives: "Saya tidak makan" (I do not eat), "Dia tidak senang" (He is not happy).',
      'Use bukan to negate nouns: "Saya bukan dosen" (I am not a lecturer), "Itu bukan rumah saya" (That is not my house). Using tidak with a noun is a common L2 error.',
      'Apply the "Bukan A, tetapi B" correction pattern: "Saya bukan orang Jepang, tetapi orang Korea" ("I am not Japanese, but Korean") — the standard polite three-part correction.',
    ],
    task: 'Imagine a classmate guesses your nationality wrong; correct them in one polite sentence using the "Bukan A, tetapi B" pattern.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a self-introduction',
    goals: [
      'Read a short Indonesian self-introduction paragraph aloud with correct stress, schwa, and natural rhythm.',
      'Answer comprehension questions about the speaker\'s name, country, role, and major using complete short Indonesian sentences.',
    ],
    task: 'Read the paragraph below aloud once, then answer five comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first meeting',
    goals: [
      'Follow a 4-turn first-meeting dialogue at UI orientation and recognize the casual vs polite register markers (kamu vs Anda, halo vs selamat pagi).',
      'Reproduce the dialogue with your own name and country, swapping in the relevant phrases naturally.',
    ],
    task: 'Read the polite dialogue along with the AI tutor first, then perform it again with your own information.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own self-introduction',
    goals: [
      'Write 3–5 sentences in Indonesian covering greeting, name, country, role at UI, and one extra fact.',
      'Use the zero copula consistently and include at least one possessive enclitic (-ku, -mu, or -nya).',
    ],
    task: 'Write your own self-introduction in 3–5 sentences using the model on the left, then read it aloud with correct rhythm.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Pak / Bu titles, name conventions, and "muka" face',
    goals: [
      'Use Bapak (Mr., often shortened to Pak) and Ibu (Mrs./Ma\'am, often shortened to Bu) before given names as the default respectful form of address. "Pak Budi" (Mr. Budi), "Bu Sari" (Ms. Sari) — much more common than calling adults by bare names.',
      'Know that many Indonesians (especially Javanese) have ONE name only — Sukarno, Suharto, Habibie. Western "first name / last name" categories often do not apply. Mononymous names are normal.',
      'Recognize that Indonesian culture, like Mandarin, places high value on saving face (menjaga muka, lit. "guarding face"). Avoid direct disagreement in formal contexts; use indirect language ("mungkin..." perhaps, "saya pikir..." I think) to suggest alternatives.',
    ],
    task: 'Decide how you would address (1) a classmate named Andi, (2) a lecturer named Budi Santoso, (3) a senior dean named Bu Sari — give the full Indonesian form for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day at UI — in Indonesian',
    goals: [
      'Combine everything from this lesson into one continuous orientation-room scene at UI: greeting, introduction, origin question, answer, polite correction, farewell.',
      'Use the correct register (kamu vs Anda) based on the relationship; switch from kamu to Anda if the interlocutor is older or more senior.',
    ],
    task: 'Roleplay your first day at UI Depok with the AI tutor playing a senior student from Yogyakarta; aim for a 6-turn exchange in Indonesian.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 1: Halo! — Greetings and Self-Introduction',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'id',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (selamat pagi / halo / sampai jumpa) and match the register to the relationship.' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences using "Nama saya …" and "Saya orang …".' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask "Dari mana asal Anda?" or "Anda dari mana?" and respond naturally with "Saya dari …".' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use the "Bukan A, tetapi B" pattern to politely correct a wrong guess about your nationality or role.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Tujuan pelajaran',
      'tu-juan pə-la-dʒa-ran',
      'By the end of this lesson, you can greet someone in Indonesian, give your name, say where you are from, ask the same back, and farewell — all in one short conversation without pausing to think.',
      'word',
      'Functional language: menyapa "greet", memperkenalkan diri "introduce oneself", menanyakan asal "ask origin", menyangkal "negate/deny", berpamitan "take leave".',
      'These five micro-skills are the spine of every social encounter in Indonesian — once they\'re automatic, every later lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      'Adegan nyata',
      'a-də-gan ɲa-ta',
      'You are at Universitas Indonesia in Depok on your first day, and a senior student from Yogyakarta turns to you at the orientation table. The whole encounter takes about 30 seconds and you will need every micro-skill from this lesson.',
      'word',
      'Senior: "Halo! Nama saya Budi. Saya dari Yogyakarta. Kamu dari mana?"',
      'A typical opener from a UI senior: friendly halo + name + origin + immediate return question — the most common Indonesian student-to-student pattern.',
      [
        { target: 'Halo', note: 'casual neutral greeting; safe with peers, classmates, and most informal contexts' },
        { target: 'Nama saya … (Name + saya)', note: 'self-introduction with "name + my"; saya is the polite first-person pronoun used by default with new acquaintances' },
        { target: 'Kamu dari mana?', note: 'casual "where are you from?"; kamu is casual you (peers); switch to Anda for formal contexts' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      'Tiga tingkat kesopanan',
      'ti-ga ting-kat kə-so-pa-nan',
      'Indonesian distinguishes three rough politeness registers in greetings. Casual (peers, close friends): Halo / Hai / Sampai jumpa. Polite (workplace, first meetings): Selamat pagi/siang/sore/malam / Sampai jumpa lagi. Formal/religious (Muslim contexts, prayer rooms, mosques): Assalamualaikum / Wassalamualaikum warahmatullahi wabarakatuh.',
      'word',
      'Hai (casual) / Selamat pagi (polite) / Assalamualaikum (Muslim formal) — same greeting function, three social levels.',
      'Switching from kamu to Anda mid-conversation signals increased respect; the reverse signals familiarity.',
      [
        { target: 'CASUAL: Halo, Hai', note: 'use with peers, close friends, and clearly informal settings' },
        { target: 'POLITE: Selamat pagi/siang/sore/malam', note: 'the safe default for first meetings, workplace, and customer-facing situations; time-specific' },
        { target: 'MUSLIM FORMAL: Assalamualaikum', note: 'Arabic-loan "peace be upon you"; standard in Muslim Indonesian contexts, religious settings, and increasingly in mainstream business' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Selamat',
      'sə-LA-mat',
      'The single most important Indonesian word for first-meeting situations. Pronounced /səˈlamat/ with: (1) schwa in the first syllable, (2) penultimate stress on the second syllable LA, (3) full /a/ on the final syllable. Many learners over-pronounce the first e and end up saying /seˈlamat/, which sounds heavy and foreign.',
      'word',
      'Selamat pagi → spoken: /səˈlamat ˈpagi/',
      'Schwa-LIGHT-full + full-LIGHT — the natural rhythm of the most-said Indonesian greeting; aim for legato, not staccato.',
      [
        { target: 'sə- (schwa)', note: 'first syllable; very short, nearly consonantal' },
        { target: '-LA- (stressed)', note: 'second syllable; penultimate stress; full /a/' },
        { target: '-mat (full)', note: 'third syllable; full /a/, unstressed' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'senang',
      'sə-NANG',
      'A high-frequency adjective meaning "happy / pleased", common in the first-meeting phrase "Saya senang berkenalan dengan Anda" ("I am pleased to meet you"). Pronunciation: schwa in the first syllable, then NANG as a single unit with /ŋ/ at the end — NOT /nan/+/g/.',
      'word',
      'Saya senang berkenalan dengan Anda.',
      '"I am pleased to make your acquaintance" — formal first-meeting phrase; senang /sənaŋ/ with single /ŋ/.',
      null,
      [ACT.pronunciation],
    ),
    createContentItem(
      'Indonesia',
      'in-do-NE-sia',
      'The country name itself. Pronounced /indoˈnesia/ in slow careful speech with penultimate stress on NE, but often /indoˈnesja/ in casual speech with the -sia compressed into one syllable. The final -sia is /sja/ in fast speech, /si-a/ in careful speech.',
      'word',
      'Bahasa Indonesia',
      '"Indonesian language" — bahasa /baˈhasa/ has penultimate stress on HA; Indonesia stresses NE.',
      null,
      [ACT.pronunciation],
    ),
    createContentItem(
      'Universitas',
      'u-ni-vər-si-TAS',
      'A four-syllable word with the penultimate-schwa exception: the second-to-last syllable -ta- would stress normally, but the actual stress falls on the FINAL syllable because of the rhythmic flow of the affixed form. /unifersiˈtas/.',
      'word',
      'Universitas Indonesia',
      '"University of Indonesia" (UI) — the standard name of the flagship state university in Depok, Jakarta area.',
      null,
      [ACT.pronunciation],
    ),
    createContentItem(
      'terima kasih',
      'tə-RI-ma KA-sih',
      'The standard "thank you" phrase, literally "receive love/affection". Two words, each with penultimate stress: TE-RI-ma /təˈrima/ + KA-sih /ˈkasih/. The final -h is barely audible — a soft breathiness, not a full /h/. Casual short forms: makasih /maˈkasih/, makasih banyak /maˈkasih ˈbaɲak/ "thanks a lot".',
      'word',
      'Terima kasih banyak!',
      '"Thank you very much!" — banyak /ˈbaɲak/ with ny as a single /ɲ/.',
      null,
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('Halo', 'ha-lo', 'A casual neutral greeting borrowed from English "hello". Used among friends, peers, and family — equivalent to English "hi/hello". Appropriate for most informal contexts; in formal first meetings, prefer selamat + time of day.', 'word', 'Halo, apa kabar?', 'Friend-to-friend opener; "apa kabar?" means "what news? / how are you?"', null, [ACT.vocabularyGreetings]),
    createContentItem('Hai', 'hai', 'A very casual greeting, slightly more youthful and modern than halo. Common among younger speakers and in text messages. Borrowed from English "hi".', 'word', 'Hai, lagi apa?', 'Casual peer greeting; "lagi apa?" means "what are you doing right now?" — uses lagi as the ongoing-action particle.', null, [ACT.vocabularyGreetings]),
    createContentItem('Selamat pagi', 'sə-la-mat pa-gi', 'A polite morning greeting used from sunrise until about 10am. "Selamat" (safe/well) + "pagi" (morning). Safe default for workplaces, classrooms, broadcasts, and customer-facing situations. Younger speakers also say "Pagi!" as a casual shortening.', 'word', 'Selamat pagi, Pak Budi.', 'Polite morning greeting to a male senior using Pak + given name; standard student-to-lecturer opening at UI.', null, [ACT.vocabularyGreetings]),
    createContentItem('Selamat siang', 'sə-la-mat si-ang', 'A polite midday greeting used from about 10am to about 3pm — the hot middle of the Indonesian day. Replaces "Selamat pagi" once the morning is over. Used in offices, schools, and any polite encounter during midday.', 'word', 'Selamat siang, semuanya.', 'Polite group greeting for an afternoon class or office meeting; "semuanya" = "everyone".', null, [ACT.vocabularyGreetings]),
    createContentItem('Selamat sore', 'sə-la-mat so-re', 'A polite late-afternoon greeting used from about 3pm to sunset. Many Indonesians draw a distinct line between siang (hot midday) and sore (cooler late afternoon) — the temperature shift matters culturally. "Sore" /soˈre/ has a full /e/ on the second syllable, NOT a schwa.', 'word', 'Selamat sore, Bu.', 'Polite late-afternoon greeting using Bu (short for Ibu); the e in sore is a clear /e/, not /ə/.', null, [ACT.vocabularyGreetings]),
    createContentItem('Selamat malam', 'sə-la-mat ma-lam', 'A polite evening greeting used after sunset. Distinct from "Selamat tidur" (good night / goodbye-at-bedtime) — "Selamat malam" is a greeting (arriving), "Selamat tidur" is a farewell (sleeping). Used at dinner gatherings, evening events, and night classes.', 'word', 'Selamat malam, selamat datang.', 'Formal evening opener for a dinner event: "Good evening, welcome".', null, [ACT.vocabularyGreetings]),
    createContentItem('Assalamualaikum', 'as-sa-la-mu-a-laj-kum', 'An Arabic-loan greeting meaning "peace be upon you", used among Muslims and in increasingly mainstream Indonesian contexts. Standard reply: "Waalaikumsalam" ("and upon you, peace"). Used in religious settings, between Muslim friends, in mosques, and now commonly in public broadcasts to acknowledge Indonesia\'s Muslim majority.', 'word', 'Assalamualaikum, Pak Imam.', 'Standard greeting to a religious leader; "Pak Imam" combines the respectful title with the religious role.', null, [ACT.vocabularyGreetings]),
    createContentItem('Apa kabar', 'a-pa ka-bar', 'A ritual inquiry into wellbeing, literally "what news?" — Indonesian "how are you?". Standard reply: "Baik, terima kasih, dan Anda?" ("Good, thank you, and you?") or casually "Baik!" ("Good!"). Less ritualized than English "how are you?" — Indonesians sometimes give actual updates rather than the formulaic "fine".', 'word', 'Apa kabar? — Baik, terima kasih.', 'Standard everyday exchange; both turns are formulaic and quick in formal contexts but can lead to real conversation among friends.', null, [ACT.vocabularyGreetings]),
    createContentItem('Senang berkenalan dengan Anda', 'sə-nang bər-kə-na-lan də-ngan an-da', 'The standard polite phrase said at a first meeting: "happy to make acquaintance with you". Used in almost every register from casual to formal; the universal safe response to a new introduction. Casual short form: "Senang ketemu" ("happy to meet").', 'word', 'Senang berkenalan dengan Anda, Bu Sari.', 'Combines the meeting-acknowledgment phrase with the family-name + Bu honorific.', null, [ACT.vocabularyGreetings]),
    createContentItem('Sampai jumpa', 'sam-pai dʒum-pa', 'A polite farewell suitable for most workplace, customer, and acquaintance contexts. Literal meaning "until meeting [again]". Slightly more deliberate than dadah but less formal than "Selamat tinggal".', 'word', 'Sampai jumpa lagi!', '"See you again!" — adding "lagi" (again) makes the closing warmer and more anticipatory.', null, [ACT.vocabularyGreetings]),
    createContentItem('Dadah', 'da-dah', 'A casual farewell borrowed from English "ta-ta" (or possibly Dutch "dag-dag"). Used among friends, peers, family, and especially with children — equivalent to English "bye-bye". Indonesian parents say "dadah" while waving a child\'s hand. More casual than sampai jumpa.', 'word', 'Dadah, sampai besok!', 'Friend-to-friend close; "sampai besok" = "see you tomorrow".', null, [ACT.vocabularyGreetings]),
    createContentItem('Selamat tinggal', 'sə-la-mat ting-gal', 'A formal farewell used by the person LEAVING to the person STAYING. Literal: "safe stay" — wishes the stayer well. Reciprocal pair: "Selamat jalan" is said by the stayer to the leaver ("safe journey"). Common in airports, train stations, and any long-departure context.', 'word', 'Selamat tinggal — Selamat jalan.', 'Reciprocal farewell exchange: leaver says "tinggal" (stay safely), stayer says "jalan" (journey safely).', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People, roles, nationalities
    // ────────────────────────────────────────────────────────────────────
    createContentItem('saya', 'sa-ya', 'First-person singular polite pronoun, used in formal, neutral, and professional contexts. The safe default for any new acquaintance, business interaction, or written Indonesian. Unmarked for gender or case.', 'word', 'Saya mahasiswa di UI.', 'The simplest possible self-introduction: saya + role + location.', null, [ACT.vocabularyPeople]),
    createContentItem('aku', 'a-ku', 'First-person singular intimate pronoun, used with close friends, family, romantic partners, and in song lyrics and poetry. Switching from saya to aku signals closeness. Using aku with a stranger or a superior is inappropriate; using saya with a close friend can feel cold.', 'word', 'Aku sayang kamu.', '"I love you" — only aku/kamu in this intimate phrase; saya/Anda would sound clinical.', null, [ACT.vocabularyPeople]),
    createContentItem('kamu', 'ka-mu', 'Second-person casual singular pronoun, used among peers, friends, and clearly informal settings. Avoid with elders, supervisors, or strangers — use Anda or Bapak/Ibu + name instead. The enclitic possessive form is -mu (namamu "your name").', 'word', 'Kamu dari mana?', 'Casual question about origin using "kamu + dari + mana" (you + from + where).', null, [ACT.vocabularyPeople]),
    createContentItem('Anda', 'an-da', 'Honorific second-person singular pronoun used in formal and respectful contexts: workplaces, customer service, news broadcasts, formal writing. Capitalization (Anda not anda) is the EYD convention for respect. Function similar to formal pronouns in many European languages (vous, Sie, usted).', 'word', 'Bagaimana kabar Anda?', 'Formal "how are you?" — appropriate in any polite setting.', null, [ACT.vocabularyPeople]),
    createContentItem('dia', 'di-a', 'Third-person singular pronoun for any human (and sometimes animal). Indonesian does NOT distinguish gender in pronouns — dia covers he, she, and singular they. Context determines gender. The enclitic possessive form is -nya (rumahnya "his/her house").', 'word', 'Dia teman saya.', '"He/she is my friend" — gender ambiguous in Indonesian; English translation requires context.', null, [ACT.vocabularyPeople]),
    createContentItem('beliau', 'bə-liau', 'A very respectful third-person singular pronoun used for senior people: parents, lecturers, religious leaders, public figures, elders. Function similar to formal third-person forms in many Asian languages. Switching from dia to beliau signals deep respect.', 'word', 'Beliau adalah dosen saya.', '"He/she (respected) is my lecturer" — beliau + adalah is the standard formal academic reference.', null, [ACT.vocabularyPeople]),
    createContentItem('kami', 'ka-mi', 'First-person plural EXCLUSIVE pronoun: includes the speaker, EXCLUDES the listener. "Kami sudah makan" = "We have already eaten" (but not you). The kami/kita distinction is one of the trickiest features of Indonesian for English speakers — English "we" is ambiguous.', 'word', 'Kami dari Indonesia.', '"We (but not you) are from Indonesia" — if the listener is Indonesian, you would use kita instead.', null, [ACT.vocabularyPeople]),
    createContentItem('kita', 'ki-ta', 'First-person plural INCLUSIVE pronoun: includes both the speaker AND the listener. "Kita makan?" = "Shall we (you and I) eat?" The kita/kami contrast must be learned consciously — Indonesian children master it by age 4.', 'word', 'Kita pergi ke kantin?', '"Shall we (you and I) go to the cafeteria?" — kita because the listener is included.', null, [ACT.vocabularyPeople]),
    createContentItem('kalian', 'ka-li-an', 'Second-person plural casual pronoun: addresses multiple peers/friends. The plural counterpart to kamu. For formal plural address, Indonesian uses repeated Anda or "Anda sekalian / Bapak-Ibu sekalian" ("you all, ladies and gentlemen").', 'word', 'Kalian dari mana?', '"Where are you all from?" — casual group question to fellow students.', null, [ACT.vocabularyPeople]),
    createContentItem('mereka', 'mə-re-ka', 'Third-person plural pronoun: they. Used for groups of any gender. Indonesian has no gender distinction in plural pronouns either — "mereka" covers all third-person plural references.', 'word', 'Mereka mahasiswa UI.', '"They are UI students" — plural reference without gender marking.', null, [ACT.vocabularyPeople]),
    createContentItem('nama', 'na-ma', 'A person\'s name. Used in the common phrases "Siapa nama Anda?" ("What is your name?") and "Nama saya …" ("My name is …"). Unlike Mandarin or English, Indonesian does not strongly distinguish given vs family name — many Indonesians are mononymous.', 'word', 'Siapa nama Anda? — Nama saya Sari.', '"What is your name?" — "My name is Sari" — standard first-meeting exchange.', null, [ACT.vocabularyPeople]),
    createContentItem('Bapak (Pak)', 'ba-pak', 'Respectful title for an adult man, similar to "Mr." or "Sir". Used before a given name (Pak Budi = Mr. Budi) or alone as direct address. Pak is the abbreviated form, almost universal in everyday speech. Bapak literally means "father" and extends to any adult male in respectful contexts.', 'word', 'Pak Budi, selamat pagi.', 'Standard respectful greeting combining the title with the given name.', null, [ACT.vocabularyPeople]),
    createContentItem('Ibu (Bu)', 'i-bu', 'Respectful title for an adult woman, similar to "Mrs." / "Ms." / "Ma\'am". Used before a given name (Bu Sari = Ms. Sari) or alone as direct address. Bu is the abbreviated form. Ibu literally means "mother" and extends to any adult female in respectful contexts. Marital status not implied.', 'word', 'Bu Sari adalah dosen saya.', '"Ms. Sari is my lecturer" — formal academic reference using Bu + given name.', null, [ACT.vocabularyPeople]),
    createContentItem('mahasiswa', 'ma-ha-sis-wa', 'A university student. Compound of maha- (great) + siswa (pupil) — etymologically "great pupil", distinguishing university-level from school-level (siswa). Feminine form: mahasiswi (with -i ending), though mahasiswa is used as the unmarked default.', 'word', 'Saya mahasiswa baru di UI.', '"I am a new student at UI" — baru "new" is a postnominal adjective; di "at" + place.', null, [ACT.vocabularyPeople]),
    createContentItem('dosen', 'do-sen', 'A university lecturer / professor. Indonesia distinguishes dosen (university) from guru (school teacher) — dosen is reserved for higher-education faculty. The professorial rank specifically is "profesor" or "guru besar" ("great teacher").', 'word', 'Dosen kami sangat ramah.', '"Our lecturers are very friendly" — kami (exclusive) because the speaker is implicitly addressing someone not in the group.', null, [ACT.vocabularyPeople]),
    createContentItem('insinyur', 'in-si-ɲur', 'An engineer (any discipline). Borrowed from Dutch "ingenieur"; pronounced with single /ɲ/ for ny. The title "Ir." (insinyur, abbreviated) is sometimes used before an engineer\'s name in formal contexts — Ir. Budi Santoso.', 'word', 'Ayah saya seorang insinyur.', '"My father is an engineer" — seorang is the classifier for humans (one + person).', null, [ACT.vocabularyPeople]),
    createContentItem('dokter', 'dok-ter', 'A medical doctor. Used both as a profession and as a title before a given name: dr. Budi Santoso. The abbreviated form "Dr." (or lowercase "dr.") is the typical written form.', 'word', 'Ibu saya seorang dokter.', '"My mother is a doctor" — seorang classifier; dokter unmarked for gender.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Indonesia', 'o-rang in-do-ne-si-a', 'An Indonesian person — formed by orang (person) + country name. This is the universal Indonesian pattern for nationalities: orang + [country]. No special suffix needed.', 'word', 'Saya orang Indonesia.', 'Standard nationality self-identification using "orang + country" pattern.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Amerika', 'o-rang a-me-ri-ka', 'An American — orang + Amerika. Amerika refers to the USA specifically in most Indonesian contexts. For the continents, "Amerika Utara" (North America) and "Amerika Selatan" (South America) are used.', 'word', 'Dia orang Amerika dari New York.', '"He/she is American from New York" — orang Amerika + city of origin.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Inggris', 'o-rang ing-gris', 'A British person — orang + Inggris (literally "English"; Indonesian uses Inggris for the UK as a whole and the language). Sometimes "orang Britania" (orang + Britain) for clarity, but Inggris is the everyday form.', 'word', 'James orang Inggris.', '"James is British" — using the orang + country pattern.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Jepang', 'o-rang dʒə-pang', 'A Japanese person — orang + Jepang. One of the most commonly referenced foreign nationalities in Indonesian contexts due to historical and economic ties. Jepang has a schwa on the first syllable.', 'word', 'Pak Tanaka orang Jepang.', '"Mr. Tanaka is Japanese" — Pak + family name + nationality.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Korea', 'o-rang ko-re-a', 'A Korean person — orang + Korea. Korea Selatan (South Korea) and Korea Utara (North Korea) are distinguished when needed.', 'word', 'Saya orang Korea, dari Seoul.', 'Self-identification as Korean + city of origin.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Cina / orang Tionghoa', 'o-rang tʃi-na / o-rang ti-ong-hoa', 'A Chinese person. Two competing terms: "orang Cina" (older, sometimes carries negative connotations from past tensions) and "orang Tionghoa" (the modern, neutral preferred form, especially for ethnic Chinese Indonesians). Politically charged — use Tionghoa in any formal context.', 'word', 'Banyak orang Tionghoa tinggal di Glodok.', '"Many Chinese people live in Glodok" — Glodok is Jakarta\'s Chinatown.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Nigeria', 'o-rang ni-dʒe-ri-a', 'A Nigerian person — orang + Nigeria. Africa is increasingly visible in Indonesian discourse, but specific African nationalities are less commonly referenced than European or East Asian ones.', 'word', 'Saya orang Nigeria.', 'Self-identification as Nigerian using the orang + country pattern.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Filipina', 'o-rang fi-li-pi-na', 'A Filipino person — orang + Filipina (the Philippines). Indonesia and the Philippines are ASEAN neighbors; this term is common in regional contexts.', 'word', 'Teman sekamar saya orang Filipina.', '"My roommate is Filipino" — sekamar "same-room" = roommate.', null, [ACT.vocabularyPeople]),
    createContentItem('mahasiswa internasional', 'ma-ha-sis-wa in-ter-na-si-o-nal', 'An international student. Compound of mahasiswa + internasional. Indonesian universities increasingly use this term for foreign students; alternative "mahasiswa asing" (foreign student) is also common but slightly more othering.', 'word', 'UI memiliki banyak mahasiswa internasional.', '"UI has many international students" — memiliki "to own/have" + banyak "many" + plural noun.', null, [ACT.vocabularyPeople]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: adalah / zero copula
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Tanpa "to be"',
      'tan-pa to be',
      'Indonesian has NO obligatory copula. Subject and predicate are simply juxtaposed. "Saya mahasiswa" = "I am a student" (literally "I student"). "Dia dosen" = "He/she is a lecturer" (literally "He/she lecturer"). This is the simplest equation in any Indo-European-trained learner\'s adaptation.',
      'sentence',
      'Saya mahasiswa. Anda dosen. Dia insinyur.',
      'Three identity sentences, all with zero copula — much simpler than English "to be" conjugation.',
      [
        { target: 'Saya mahasiswa', note: '"I (am) a student" — no verb needed' },
        { target: 'Anda dosen', note: '"You (are) a lecturer" — same pattern' },
        { target: 'Dia insinyur', note: '"He/she (is) an engineer" — gender-neutral dia' },
      ],
      [ACT.grammarAdalah],
    ),
    createContentItem(
      'adalah',
      'a-da-lah',
      'An OPTIONAL copula used in formal and emphatic contexts, especially in definitions and equations: "Indonesia adalah negara kepulauan" ("Indonesia is an archipelagic nation"). Adalah is dropped in everyday speech but appears prominently in textbooks, news, and definitions. The -lah at the end is the same emphatic particle as in "siapa-lah" ("who indeed").',
      'sentence',
      'Indonesia adalah negara kepulauan terbesar di dunia.',
      '"Indonesia is the largest archipelagic country in the world" — formal definitional sentence; adalah makes the equation emphatic.',
      [
        { target: 'Use adalah for definitions', note: 'A adalah B = "A is (defined as) B"' },
        { target: 'Drop adalah in everyday speech', note: '"Saya mahasiswa" is more natural than "Saya adalah mahasiswa"' },
        { target: 'Adalah cannot precede adjectives', note: 'Wrong: *Saya adalah lapar; Right: Saya lapar "I am hungry"' },
      ],
      [ACT.grammarAdalah],
    ),
    createContentItem(
      'apakah question',
      'a-pa-kah',
      'Form a yes/no question by adding "apakah" at the front of a statement, OR simply use rising intonation on the statement. Word order does not change. "Anda mahasiswa?" (rising) = "Apakah Anda mahasiswa?" — both mean "Are you a student?"',
      'sentence',
      'Anda mahasiswa → Apakah Anda mahasiswa?',
      'Two equivalent question forms; apakah is more formal/written, rising intonation more casual/spoken.',
      [
        { target: 'Anda mahasiswa?', note: 'rising intonation question, casual' },
        { target: 'Apakah Anda mahasiswa?', note: 'apakah-fronted question, formal' },
        { target: 'Answer: Ya / Tidak / Bukan', note: 'Ya = yes; tidak = no (negates verbs); bukan = not (negates nouns)' },
      ],
      [ACT.grammarAdalah],
    ),
    createContentItem(
      'wh-questions',
      'siapa, apa, di mana, dari mana',
      'Information questions in Indonesian keep the SAME word order as statements — you replace the unknown with a question word and either leave it in situ or front it. Question words: siapa (who), apa (what), di mana (where), dari mana (where from), kapan (when), mengapa/kenapa (why), bagaimana (how), berapa (how much/many).',
      'sentence',
      'Siapa nama Anda? · Anda dari mana? · Apa pekerjaan Anda? · Berapa umur Anda?',
      'Same word order as statements — much simpler than English wh-question movement.',
      [
        { target: 'Siapa nama Anda?', note: 'literal: "who name your?" — siapa for "who" in name-questions' },
        { target: 'Anda dari mana?', note: 'literal: "you from where?" — mana stays in object position' },
        { target: 'Apa pekerjaan Anda?', note: 'literal: "what job your?" — pekerjaan = peN-…-an on root kerja' },
        { target: 'Berapa umur Anda?', note: 'literal: "how-much age your?" — used for age questions; standard answer is a number + tahun "years"' },
      ],
      [ACT.grammarAdalah],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Pronouns + enclitic possessives
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Sistem kata ganti',
      'sis-tem ka-ta gan-ti',
      'Indonesian has at least 9 personal pronouns, marked for politeness AND for inclusion. Same form for subject and object — unlike English (I/me). The plural is formed by separate words, not by adding a suffix.',
      'sentence',
      'I: saya (polite), aku (intimate). YOU: kamu (casual), Anda (formal). HE/SHE: dia, beliau (respectful). WE: kami (exclusive), kita (inclusive). YOU-PL: kalian. THEY: mereka.',
      'One-form-fits-all for case (no subject/object change), but two-axis distinction for politeness AND inclusion — more nuanced than English.',
      null,
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'kita vs kami',
      'ki-ta vs ka-mi',
      'The single trickiest distinction in Indonesian pronouns: kita INCLUDES the listener, kami EXCLUDES. "Kita makan?" = "Shall WE (you and I) eat?" "Kami sudah makan" = "WE (but not you) already ate". English "we" collapses this distinction; Indonesian preserves it religiously. Mixing kita and kami is a classic learner error and can cause real confusion.',
      'sentence',
      'A: Kita makan dulu? — B: Boleh. (you and I eat first?) vs A: Maaf, kami sudah makan. (sorry, we [not you] already ate)',
      'Two scenarios; native speakers parse the distinction in 200ms because the meanings are so different.',
      [
        { target: 'kita = inclusive', note: 'includes the listener; use when "we" means "you and I"' },
        { target: 'kami = exclusive', note: 'excludes the listener; use when "we" means "I and someone else, but not you"' },
        { target: 'kita-kita', note: 'casual reduplication meaning "us / our group" with inclusive nuance' },
      ],
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'Enclitic possessives -ku, -mu, -nya',
      '-ku, -mu, -ɲa',
      'Three high-frequency enclitic possessives attached directly to the noun: -ku (my, from aku), -mu (your-casual, from kamu), -nya (his/her/its, from dia). Examples: namaku (my name), namamu (your name), namanya (his/her name). These contracted forms are MUCH more common in everyday speech than the full "saya/kamu/dia" + noun forms.',
      'sentence',
      'Namaku Sari. Siapa namamu? — Namanya Budi.',
      'Three sentences using all three enclitics; this is the natural everyday form, not the textbook full form.',
      [
        { target: '-ku', note: 'my (from aku); intimate possessive' },
        { target: '-mu', note: 'your (from kamu); casual possessive' },
        { target: '-nya', note: 'his/her/its (from dia); also serves as a definite article' },
      ],
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'Full possessive: rumah saya / rumah Anda',
      'ru-mah sa-ya',
      'For polite possessives, Indonesian uses the full pronoun AFTER the noun: "rumah saya" (my house), "rumah Anda" (your house), "rumah beliau" (his/her [respected] house). The enclitic -ku and -mu are too intimate for formal contexts; saya and Anda following the noun are the correct formal forms.',
      'sentence',
      'Ini rumah saya. Itu rumah Anda. Yang di seberang adalah rumah beliau.',
      'Three possessive sentences in polite register; notice the noun-first, possessor-second order — opposite of English "my house".',
      [
        { target: 'noun + saya = polite "my"', note: 'rumah saya (my house, formal)' },
        { target: 'noun + Anda = polite "your"', note: 'rumah Anda (your house, formal)' },
        { target: 'noun + beliau = respectful "his/her"', note: 'rumah beliau (his/her [respected] house)' },
      ],
      [ACT.grammarPronouns],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Negation (tidak vs bukan)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'tidak (negates verbs and adjectives)',
      'ti-dak (ti-daʔ)',
      'Use TIDAK directly before a verb or adjective to negate it: "Saya tidak makan" (I do not eat), "Dia tidak senang" (He is not happy), "Ini tidak mahal" (This is not expensive). Casual short forms: ndak, nggak, gak (highly informal urban Jakarta speech).',
      'sentence',
      'Saya tidak makan daging. Ini tidak mahal.',
      '"I do not eat meat. This is not expensive." — tidak before the verb and the adjective.',
      [
        { target: 'tidak + verb', note: 'tidak makan = "do not eat"' },
        { target: 'tidak + adjective', note: 'tidak senang = "not happy"' },
        { target: 'nggak / gak (casual)', note: 'urban Jakarta informal: "Gak tau" = "I don\'t know"' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'bukan (negates nouns)',
      'bu-kan',
      'Use BUKAN to negate nouns and noun phrases: "Saya bukan dosen" (I am not a lecturer), "Itu bukan rumah saya" (That is not my house). Using tidak with a noun is a classic L2 error — *"Saya tidak dosen" is ungrammatical. Bukan also negates entire propositions: "Bukan begitu" = "It\'s not like that".',
      'sentence',
      'Saya bukan orang Jepang. Itu bukan rumah saya.',
      '"I am not Japanese. That is not my house." — bukan before nouns.',
      [
        { target: 'bukan + noun', note: 'bukan dosen = "not a lecturer"' },
        { target: 'bukan + orang + nationality', note: 'bukan orang Jepang = "not Japanese"' },
        { target: 'WRONG: tidak + noun', note: '*Saya tidak dosen — does not occur in Indonesian' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'Bukan A, tetapi B (correction pattern)',
      'bu-kan A, tə-ta-pi B',
      'The standard polite pattern for correcting someone\'s wrong guess: "Bukan A, tetapi B" ("not A, but B"). Three parts: denial (bukan), wrong item (A), then alternative (tetapi B). The denial-alternative rhythm is what makes the correction feel polite rather than abrupt.',
      'sentence',
      'A: Anda orang Jepang? — B: Bukan, saya orang Korea.',
      '"Are you Japanese?" — "No, I am Korean." — minimal three-part polite correction.',
      [
        { target: 'Bukan (denial)', note: 'opens the correction politely; signals "not so"' },
        { target: 'tetapi / tapi (but)', note: 'casual short form "tapi" is acceptable in most contexts; tetapi is more formal' },
        { target: 'Saya orang Korea (alternative)', note: 'closes the loop and gives the asker the right answer' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'belum (not yet — important contrast)',
      'bə-lum',
      'A third negation word: BELUM means "not yet", contrasting with tidak (categorical "not"). "Saya belum makan" = "I haven\'t eaten yet" (open to eating later); "Saya tidak makan" = "I don\'t eat" (categorical refusal). Standard answer to "Sudah makan?" ("Have you eaten?") is either "Sudah" (already) or "Belum" (not yet).',
      'sentence',
      'A: Sudah makan? — B: Belum.',
      '"Have you eaten?" — "Not yet." — minimal one-word answer; sudah/belum is one of the most common Indonesian exchanges.',
      [
        { target: 'tidak = categorical', note: '"do not / will not" — closed' },
        { target: 'belum = not yet', note: '"haven\'t yet / not so far" — open to the future' },
        { target: 'sudah/belum pair', note: 'aspect pair; question "sudah ...?" expects either sudah or belum' },
      ],
      [ACT.grammarNegation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Perkenalan diri',
      'pər-kə-na-lan di-ri',
      'A complete five-sentence self-introduction in Indonesian. Read it aloud with correct stress, schwa, and natural rhythm. Notice the parallel structure: nearly every sentence subject is saya or implied saya.',
      'sentence',
      'Selamat pagi! Nama saya Sarah. Saya orang Amerika. Saya mahasiswa baru di Universitas Indonesia, jurusan ilmu komputer. Senang berkenalan dengan Anda.',
      'Translation: "Good morning! My name is Sarah. I am American. I am a new student at the University of Indonesia, computer science major. Pleased to meet you."',
      [
        { target: 'Nama saya Sarah', note: 'noun + saya possessive; more polite than namaku Sarah' },
        { target: 'Saya orang Amerika', note: 'nationality using orang + country pattern' },
        { target: 'mahasiswa baru di UI', note: 'student status + baru (new) postnominal adjective + location' },
        { target: 'jurusan ilmu komputer', note: '"computer science major"; jurusan = department/major' },
        { target: 'Senang berkenalan dengan Anda', note: 'standard polite closing of a first-meeting introduction' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'Pertanyaan pemahaman',
      'pər-ta-ɲa-an pə-ma-ha-man',
      'Five standard comprehension questions matching the paragraph. Answer each in a short sentence using zero copula; full sentences are preferred over one-word answers in academic Indonesian.',
      'sentence',
      'Q1: Siapa nama narator? Q2: Dia orang apa? Q3: Di mana dia kuliah? Q4: Apa jurusannya? Q5: Bagaimana perasaannya?',
      'Five question words: siapa (who), apa (what), di mana (where), apa (what), bagaimana (how).',
      [
        { target: 'A1: Nama narator Sarah.', note: 'noun + Sarah; complete short sentence' },
        { target: 'A2: Dia orang Amerika.', note: 'orang + country pattern' },
        { target: 'A3: Dia kuliah di UI.', note: 'kuliah "study at university" + di + place' },
        { target: 'A4: Jurusannya ilmu komputer.', note: '-nya enclitic possessive + ilmu komputer' },
        { target: 'A5: Dia senang berkenalan.', note: 'standard "happy to meet" phrase' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Pertemuan pertama (dialog kasual)',
      'pər-tə-mu-an pər-ta-ma',
      'A natural casual first-meeting conversation between two students at UI. Covers all the patterns from this lesson: greetings, names, origins, roles, and farewells, all in peer-register kamu.',
      'conversation',
      'Budi: Halo! Aku Budi. Kamu siapa?\nSarah: Halo, Budi! Aku Sarah. Senang ketemu.\nBudi: Kamu dari mana?\nSarah: Aku dari Amerika. Kamu?\nBudi: Aku dari Yogyakarta. Kamu mahasiswa di sini?\nSarah: Iya, jurusan ilmu komputer. Kamu juga mahasiswa?\nBudi: Aku mahasiswa hukum, tahun ketiga.\nSarah: Wah, hebat! Sampai jumpa lagi, ya.\nBudi: Dadah, Sarah!',
      'A natural casual exchange between peers using aku/kamu — the default for student-age first meetings on a UI campus.',
      [
        { target: 'aku/kamu peer register', note: 'casual student register; switching to saya/Anda would feel cold among same-age peers' },
        { target: 'Kamu? (return question)', note: 'casual short form of "Kamu dari mana?" — return the question without repeating the full structure' },
        { target: 'Iya (yes, casual)', note: '"yeah"; more casual than ya; ya is the polite form' },
        { target: 'Wah, hebat! (reaction)', note: '"Wow, awesome!" — common reaction expression among young Indonesians' },
        { target: 'Sampai jumpa lagi, ya', note: 'standard farewell with ya tag particle softening the close' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      'Pertemuan pertama (dialog formal)',
      'pər-tə-mu-an pər-ta-ma (for-mal)',
      'A formal first-meeting conversation suitable for academic or professional contexts — e.g., meeting a senior lecturer at UI. Notice the formal vocabulary: Anda, Bapak/Ibu, jenjang akademis — register markers signaling a more deliberate interaction.',
      'conversation',
      'Mahasiswa: Selamat pagi, Pak. Nama saya Sarah Williams. Saya mahasiswa baru di sini.\nDosen: Selamat pagi, Sarah. Saya Pak Budi Santoso, dosen ilmu komputer.\nMahasiswa: Senang berkenalan dengan Bapak.\nDosen: Sama-sama. Dari mana asal Anda?\nMahasiswa: Saya dari Amerika Serikat, Pak. Dari Boston.\nDosen: Wah, jauh sekali. Selamat datang di Indonesia. Semoga betah di sini.\nMahasiswa: Terima kasih, Pak.',
      'Same information as the casual version but with formal phrasing throughout — appropriate for hierarchical (student-lecturer) relationships.',
      [
        { target: 'Pak / Bapak', note: 'respectful "Mr./Sir"; used as direct address without name and as title before name' },
        { target: 'Anda nín-equivalent', note: 'formal "you"; used throughout in academic register' },
        { target: 'Senang berkenalan dengan Bapak', note: 'fully formal version of the meeting phrase; uses Bapak as the address form' },
        { target: 'Sama-sama', note: '"Likewise / you too" — standard polite return for thanks or meeting phrases' },
        { target: 'Semoga betah di sini', note: '"Hope you feel at home here" — common welcoming phrase; betah = "feel at home, comfortable staying"' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Templat menulis',
      'tem-plat mə-nu-lis',
      'A reusable five-sentence template for any Indonesian self-introduction. Fill in the bracketed slots with your own information — the structure carries the rest.',
      'sentence',
      'Selamat pagi! Nama saya [nama]. Saya orang [kebangsaan]. Saya [pekerjaan/status] di [institusi]. Saya [fakta tambahan]. Senang berkenalan.',
      'Five sentences cover the core: greeting, name, nationality, role, personal fact, closing — the minimum complete self-introduction.',
      [
        { target: '[nama]', note: 'your given name only for casual, or full name for formal' },
        { target: '[kebangsaan]', note: 'your nationality using orang + country pattern (Amerika, Indonesia, Korea)' },
        { target: '[pekerjaan/status]', note: 'mahasiswa / dosen / insinyur / dokter / etc. — your professional or academic identity' },
        { target: '[institusi]', note: 'your university, company, or school: UI, ITB, UGM, Universitas Gadjah Mada' },
        { target: '[fakta tambahan]', note: 'something specific that distinguishes you (hobby, major, favorite thing); avoid generic facts' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      'Latihan menulis',
      'la-ti-han mə-nu-lis',
      'Write your own 3–5 sentence self-introduction using the template. Use the zero copula consistently, include at least one enclitic possessive (-ku, -mu, or -nya), and end with a standard closing.',
      'sentence',
      'Contoh: Selamat siang! Nama saya Kim Ji-su. Saya orang Korea. Saya mahasiswa di UI, jurusan teknik kimia. Hobi saya bermain gitar dan membaca novel. Senang berkenalan dengan Anda!',
      'Translation: "Good afternoon! My name is Kim Ji-su. I am Korean. I am a student at UI, chemical engineering major. My hobby is playing guitar and reading novels. Pleased to meet you!"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Pak / Bu sebagai sapaan',
      'pak / bu sə-ba-gai sa-pa-an',
      'In Indonesian, the default respectful address to any adult is Pak (Bapak) for men or Bu (Ibu) for women, followed by the given name. "Pak Budi" (Mr. Budi), "Bu Sari" (Ms. Sari). This is much more common than calling adults by bare given names. Even close family colleagues address each other this way at work.',
      'sentence',
      'Pak Budi, ada waktu sebentar? · Bu Sari, ini laporannya.',
      '"Mr. Budi, do you have a moment?" / "Ms. Sari, here is the report" — standard workplace politeness.',
      [
        { target: 'Pak + given name', note: 'most common; used for any adult man older than the speaker' },
        { target: 'Bu + given name', note: 'most common; used for any adult woman' },
        { target: 'Pak / Bu alone', note: 'as direct address ("excuse me, sir/ma\'am") without a name' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Nama tunggal (mononymous names)',
      'na-ma tung-gal',
      'Many Indonesians (especially Javanese) have ONE name only — Sukarno, Suharto, Habibie, Megawati. Western "first name / last name" categories do not apply. Form fields requiring a "last name" are a constant source of frustration for mononymous Indonesians traveling abroad. Use the single name as a complete name.',
      'sentence',
      'Sukarno (presiden pertama), Suharto (presiden kedua), Habibie (presiden ketiga), Megawati Soekarnoputri (presiden kelima).',
      'Four of Indonesia\'s seven presidents had single names (or simple two-element names). Mononymous names are normal, not rare.',
      [
        { target: 'Sukarno', note: 'first president (1945–1967); single name; in old EYD: Soekarno' },
        { target: 'Habibie', note: 'third president; single name; full official: B.J. Habibie (initials added)' },
        { target: 'Megawati Soekarnoputri', note: 'fifth president, daughter of Sukarno; "Soekarnoputri" = "daughter of Sukarno", an honorific patronymic' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Anda vs kamu',
      'an-da vs ka-mu',
      'Anda is the honorific "you" used in workplaces, customer service, news broadcasts, and any polite first-meeting context. Kamu is the everyday "you" for peers, friends, family. Using kamu with someone who expects Anda signals disrespect or familiarity; using Anda with a close peer can create cold distance. Capitalize Anda in writing (EYD convention).',
      'sentence',
      'Selamat datang. Bagaimana kabar Anda? (formal) vs Halo, apa kabar kamu? (casual)',
      'Switching from kamu to Anda mid-conversation signals increased respect; the reverse signals warmth or familiarity.',
      [
        { target: 'Anda (formal, capitalized)', note: 'use with strangers, in business, in writing; the safe default' },
        { target: 'kamu (casual)', note: 'use with peers, friends, classmates, in clearly informal contexts' },
        { target: 'Pak/Bu + name (most respectful)', note: 'even more formal than Anda; use with elders, supervisors, customers' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Muka (face)',
      'mu-ka',
      'The concept of "menjaga muka" (lit. "guarding face") in Indonesian culture parallels Mandarin 面子 (miànzi): preserving one\'s public reputation and dignity. Indonesians strongly avoid direct disagreement or public correction in formal contexts. Use indirect language: "mungkin..." (perhaps), "saya pikir..." (I think), "kalau menurut saya..." (in my opinion) to suggest alternatives rather than flat denial.',
      'sentence',
      'Instead of "Anda salah", use "Mungkin ada salah paham" ("Perhaps there is a misunderstanding").',
      'Face-saving language is not "fake politeness" — it is core social skill in any Indonesian professional context.',
      [
        { target: 'menjaga muka', note: 'lit. "guard face" — to maintain one\'s social standing' },
        { target: 'malu', note: '"shame / embarrassment"; very high-frequency emotion concept' },
        { target: 'segan', note: '"reluctant out of respect" — Javanese-influenced; the polite hesitation that avoids causing inconvenience' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Tugas: Hari pertama di UI',
      'tu-gas: ha-ri pər-ta-ma di u-i',
      'Roleplay your first day at Universitas Indonesia (UI) Depok with the AI tutor playing a friendly senior student from Yogyakarta. Use every skill from this lesson in one continuous scene — greet, introduce, ask, answer, farewell.',
      'conversation',
      '[Ruang orientasi, UI Depok]\nSenior: Halo! Aku Andi. Kamu mahasiswa baru?\nKamu: [sapa + perkenalkan diri]\nSenior: Dari mana asal kamu?\nKamu: [kebangsaan/kota asal]\nSenior: Wah, jauh ya! Apa jurusanmu?\nKamu: [jurusan]\nSenior: Aku jurusan teknik mesin. Mau bareng pulang ke asrama nanti?\nKamu: [setuju + tanya balik]\nSenior: Aku tinggal di asrama UI di Depok. Kamu di mana?\nKamu: [jawab + akhiri dengan ramah]',
      'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: 'sapa (greeting)', note: 'Halo / Hai / Selamat pagi — pick the register that matches the senior\'s opening' },
        { target: 'perkenalkan diri', note: 'Nama saya … / Aku … — use the natural form for the register' },
        { target: 'kebangsaan', note: 'Saya orang … — use the orang + country pattern' },
        { target: 'jurusan', note: 'state your major: ilmu komputer / teknik mesin / hukum / kedokteran' },
        { target: 'akhiri (close)', note: 'Sampai jumpa / dadah / sampai besok — match the register you opened with' },
      ],
      [ACT.task],
    ),
    createContentItem(
      'Tantangan — koreksi asumsi',
      'tan-ta-ngan — ko-rek-si a-sum-si',
      'Stretch goal: in the same scene, the senior guesses your country incorrectly. Politely correct using the "Bukan A, tetapi B" pattern. Closes the loop without making the asker lose face.',
      'conversation',
      'Senior: Oh, kamu dari Jepang ya?\nKamu: Bukan, aku bukan orang Jepang. Aku orang Korea, dari Seoul.\nSenior: Eh, maaf, salah nebak. \nKamu: Tidak apa-apa, santai aja.',
      '"Tidak apa-apa" (not what-what) is a casual reassurance — "it\'s no problem" — common after any small mistake or apology. "Santai aja" = "just relax / chill" (very casual Jakarta speech).',
      [
        { target: 'Bukan A, tetapi B', note: 'the standard three-part polite correction pattern from Grammar III' },
        { target: 'Tidak apa-apa (or nggak apa-apa)', note: 'casual reassurance; the apa-apa reduplication softens it further' },
        { target: 'Maaf, salah nebak', note: '"Sorry, wrong guess" — nebak is the casual form of menebak "to guess"' },
        { target: 'Santai aja', note: 'very casual: "just take it easy"; aja is the casual form of saja "only/just"' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
