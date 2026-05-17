// Level 1 Unit 1 — Greetings & Self-Introduction (Bahasa Melayu)
// Functions: greeting, introducing yourself, asking where someone is from,
// correcting a wrong assumption, farewells.
// Anchored in multi-ethnic Malaysia: Universiti Malaya (UM), Kuala Lumpur,
// open-house culture, the Malay-Chinese-Indian-indigenous mix.
//
// All content is authored in Rumi (Latin script, target) with a phonetic hint
// (romanization slot) + English glosses (canonical source). The AI conversation
// tutor reads this curriculum and delivers it to each learner in their
// preferred native language at runtime — never assume a specific L1 in this
// file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition.

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
  orientation: 'ms-l1u1-orientation',
  pronunciation: 'ms-l1u1-pronunciation',
  vocabularyGreetings: 'ms-l1u1-vocab-greetings',
  vocabularyPeople: 'ms-l1u1-vocab-people',
  grammarPronouns: 'ms-l1u1-grammar-pronouns',
  grammarIalah: 'ms-l1u1-grammar-ialah',
  grammarNegation: 'ms-l1u1-grammar-negation',
  reading: 'ms-l1u1-reading',
  listening: 'ms-l1u1-listening',
  writing: 'ms-l1u1-writing',
  culture: 'ms-l1u1-culture',
  task: 'ms-l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet someone in Bahasa Melayu and say goodbye in three registers (casual, polite-neutral, formal) so you can match the situation across Malaysia\'s multi-ethnic society.',
      'Introduce yourself with your name, country, and one role (student / lecturer / engineer) using the Saya … and Nama saya … patterns.',
      'Ask another person their name and where they are from, then respond appropriately — including how the same opener works for a Malay, Chinese-Malaysian, or Indian-Malaysian counterpart.',
    ],
    task: 'Picture your first day at Universiti Malaya (UM) in Kuala Lumpur — you walk into the lecture hall and meet a lecturer from Pulau Pinang and a Tamil-speaking classmate from JB. By the end of this lesson you should handle the whole exchange in Bahasa Melayu without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce "Selamat" /sə.la.mat/ with a clear schwa in the first syllable and an unreleased final -t — the foundation of every Malay greeting.',
      'Distinguish the schwa /ə/ in "terima kasih" (/tə.ri.ma ka.sih/) from full vowels — the schwa rule is the difference between Bahasa-baku and "anglo" pronunciations.',
      'Roll the r in "orang", "pagi", "negara" — Malaysian r is a tap or trill, not the English approximant.',
    ],
    task: 'Read each example aloud and identify whether the e is schwa or /e/, then say the word with the correct vowel and a rolled r.',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 12 greetings and farewells across three registers, with the right phrase for each situation — including the multi-ethnic Malaysian reality where "Hi" / "Salam" / "Vanakkam" coexist with Selamat pagi.',
      'Distinguish "Apa khabar?" (general "how are you?") from "Selamat datang" ("welcome") — both are openers but serve different functions.',
    ],
    task: 'Say each phrase out loud three times with correct schwa and rolled r, then pair each one with the situation where you would use it.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and nationalities — the multi-ethnic Malaysian palette',
    goals: [
      'Use the 7 core personal pronouns (saya, aku, awak, kamu, anda, dia, kami / kita / mereka) correctly, including the politeness layers that are MORE elaborate than English you/we.',
      'State your role (pelajar / pensyarah / jurutera / doktor) and nationality (orang + country) in a complete short sentence.',
    ],
    task: 'Say your own role and nationality using the Saya … pattern, then describe one classmate using Dia … — pick a Malay, Chinese-Malaysian, and Indian-Malaysian name to practice cross-ethnic introductions.',
  },
  {
    id: ACT.grammarPronouns,
    section: 'Grammar I',
    title: 'Saya / aku / awak / anda / dia — the politeness layers',
    goals: [
      'Use SAYA as the safe default for "I" — appropriate from casual to formal, used by 99% of public-facing speakers including journalists, lecturers, and politicians.',
      'Use AKU only with very close friends, family, or in song lyrics — using "aku" with a stranger or superior is considered rude.',
      'Distinguish ANDA (formal/written/broadcast "you"), AWAK (polite-neutral "you" to a peer), KAMU (slightly casual "you" — fine among classmates, NOT to an elder), and ENGKAU/KAU (intimate or hostile depending on tone).',
    ],
    task: 'For each situation, pick the right pronoun pair: (1) talking to the PM, (2) chatting with a classmate, (3) addressing your grandmother, (4) writing an essay, (5) writing a love letter.',
  },
  {
    id: ACT.grammarIalah,
    section: 'Grammar II',
    title: 'ialah / adalah — the "to be" you do AND don\'t need',
    goals: [
      'Understand that Bahasa Melayu has NO obligatory copula in equational sentences: "Saya pelajar" ("I [am] a student") is a complete sentence with NO verb. This is one of the easiest features of BM.',
      'Use IALAH for definitional noun-noun equation in formal writing: "Bahasa Melayu IALAH bahasa rasmi Malaysia" ("Malay IS the official language of Malaysia"). Casual speech drops it.',
      'Use ADALAH for predicate noun phrases in formal writing: "Kuala Lumpur ADALAH ibu negara Malaysia". Distinguishing ialah (NP=NP) from adalah (NP is-a NP) is a written-register nuance.',
    ],
    task: 'Write three sentences: one casual (no copula), one formal with ialah, one formal with adalah — same meaning, three registers.',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar III',
    title: 'tidak / bukan — two negators for two situations',
    goals: [
      'Use BUKAN to negate a NOUN: "Saya BUKAN doktor" ("I am NOT a doctor"). Bukan is the noun-negator.',
      'Use TIDAK (or its short form TAK in speech) to negate a VERB or an ADJECTIVE: "Saya TIDAK faham" ("I do NOT understand"), "Dia TAK lapar" ("She is NOT hungry").',
      'Apply the BUKAN…, tetapi… pattern to politely correct someone\'s wrong guess: "Saya BUKAN orang Indonesia, TETAPI orang Malaysia."',
    ],
    task: 'Imagine a classmate guesses your nationality wrong; correct them in one polite sentence using the BUKAN…, tetapi… pattern.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a self-introduction',
    goals: [
      'Read a short self-introduction paragraph aloud with correct schwas, rolled r, final glottal stops, and natural rhythm.',
      'Answer comprehension questions about the speaker\'s name, country, role, and university using short BM sentences.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first meeting at UM',
    goals: [
      'Follow a 4-turn first-meeting dialogue and recognize the casual vs polite register markers (awak vs anda, family + title vs first-name basis).',
      'Reproduce the dialogue with your own name and country, swapping in the relevant phrases naturally.',
    ],
    task: 'Read the polite dialogue along with the AI tutor first, then perform it again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own self-introduction',
    goals: [
      'Write 3–5 sentences in Rumi covering greeting, name, country, role, and one extra fact about why you are in Malaysia.',
      'Use SAYA at least twice, an equational sentence (no copula) at least once, and BUKAN or TIDAK at least once so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Write your own self-introduction in 3–5 sentences using the model on the left, then read it aloud with correct schwas and rolled r.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Multi-ethnic Malaysia, "Encik / Puan", and the open-house culture',
    goals: [
      'Use the standard formal titles: ENCIK (Mr.) and PUAN (Mrs./Ms., married OR adult woman) — works across ethnicity. For Chinese-Malaysians, "Encik Tan" works as well as "Encik Ali"; for Indian-Malaysians, "Encik Kumar" is equally appropriate.',
      'Recognize the ethnic-religious greeting overlay: Malays often add "Assalamualaikum" (Muslim greeting), Chinese-Malaysians may use "Ni hao" or English "Hi" in casual settings, Indian-Malaysians "Vanakkam" with elders. BAHASA MELAYU is the public-sphere bridge.',
      'Understand the "open house" custom: during Hari Raya, Chinese New Year, Deepavali, and Christmas, Malaysians of every background host open houses (rumah terbuka) where everyone is welcome. This is the social engine of multi-ethnic Malaysia.',
    ],
    task: 'Decide how you would address (1) a Malay-Malaysian woman lecturer named Puan Aishah, (2) a Chinese-Malaysian male engineer named Mr Tan, (3) an Indian-Malaysian elder named Uncle Raju — give the full BM form for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day at Universiti Malaya — in Bahasa Melayu',
    goals: [
      'Combine everything from this lesson into one continuous scene with no break between greeting, introduction, question, answer, correction, and farewell.',
      'Use the correct register (polite/casual) based on the relationship; switch from "awak" to "anda" if the interlocutor is significantly senior, and use ENCIK / PUAN with a lecturer.',
    ],
    task: 'Roleplay your first day at Universiti Malaya with the AI tutor playing a Pulau Pinang lecturer and a Tamil-speaking classmate from JB; aim for a 6-turn exchange in Bahasa Melayu.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 1: Selamat Pagi — Greetings and Self-Introduction',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'ms',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (Selamat pagi / Apa khabar / Selamat tinggal) and match the register to the relationship.' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences using Saya … and Nama saya ….' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask "Awak dari mana?" or "Anda berasal dari mana?" and respond naturally with "Saya dari …".' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use the BUKAN…, tetapi… pattern to politely correct a wrong guess about your nationality or role.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Matlamat unit ini',
      'mat.la.mat u.nit i.ni',
      'By the end of this lesson, you can greet someone in Bahasa Melayu, give your name, say where you are from, ask the same back, and farewell — all in one short conversation across any of Malaysia\'s ethnic communities without pausing to think.',
      'word',
      'Lima kemahiran asas: memberi salam · memperkenalkan diri · bertanya asal · membetulkan andaian · mengucapkan selamat tinggal',
      'Five micro-skills are the spine of every social encounter in Malay — once they\'re automatic, every later lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      'Senario sebenar',
      'sə.na.ri.o sə.bə.nar',
      'You are at Universiti Malaya on your first day, walking into the Fakulti Sains lecture hall. A lecturer from Pulau Pinang and a Tamil-speaking classmate from Johor Bahru both turn to greet you. The whole encounter takes about 30 seconds and you will need every micro-skill from this lesson.',
      'word',
      'Pensyarah: "Selamat pagi! Nama saya Dr. Aishah. Awak dari mana?"',
      'A typical opener from a Malay-Malaysian lecturer: polite "Selamat pagi" + name introduction + immediate origin question — common Malaysian academic pattern.',
      [
        { target: 'Selamat pagi', note: 'standard polite morning greeting; works for any ethnic group, any setting until midday' },
        { target: 'Nama saya …', note: 'self-introduction with the noun "name" + possessive "my"; the safe, polite default' },
        { target: 'Awak dari mana?', note: 'literal: "you from where?"; polite-neutral origin question — use "anda" for very formal settings' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      'Tiga peringkat kesopanan',
      'ti.ga pə.riŋ.kat kə.so.pa.nan',
      'Bahasa Melayu distinguishes three rough politeness registers. Casual (close friends, peers, family): Hi / aku-kau / Apa cer. Polite-neutral (workplace, first meetings, classmates): Selamat pagi / saya-awak / Apa khabar. Formal (lecturers, officials, public broadcast): Selamat pagi / saya-anda / Assalamualaikum (with Muslim addressees) / Salam sejahtera (interfaith neutral).',
      'word',
      'Hi (casual) / Selamat pagi (polite) / Salam sejahtera (formal-interfaith) — same greeting function, three social levels.',
      'Switching from "awak" to "anda" mid-conversation signals increased respect; using "aku" with a senior is a serious breach of adab (proper manners).',
      [
        { target: 'CASUAL: Hi / Apa cer (Apa cerita)', note: 'use with peers, close friends, in WhatsApp group chats; common Manglish' },
        { target: 'POLITE: Selamat pagi / Apa khabar', note: 'the safe default for first meetings, workplace, and customer-facing situations' },
        { target: 'FORMAL: Salam sejahtera / Assalamualaikum', note: 'Salam sejahtera is religiously neutral; Assalamualaikum is the Muslim greeting (response: Waalaikumsalam)' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Selamat',
      'sə.la.mat',
      'The schwa /ə/ in the first syllable is critical — pronouncing it "SEH-lamat" with a full /e/ sounds anglicized. The final -t is unreleased: [sə.la.matˀ]. Penultimate stress falls on the LA syllable.',
      'word',
      'Selamat pagi /sə.la.mat pa.gi/',
      'The most heard greeting in Malaysia; appears every time you walk into any government office, school, or formal event.',
      [
        { target: 'Se- (/sə/, schwa)', note: 'unstressed first syllable; do NOT pronounce as /se/ or /si/' },
        { target: '-la- (/la/, stressed)', note: 'penultimate; light pitch lift' },
        { target: '-mat (/matˀ/, unreleased)', note: 'final -t glottal-stops or is held silent' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'terima kasih',
      'tə.ri.ma ka.sih',
      'The two-word phrase for "thank you". Schwa in the first syllable of "terima" (/tə/), full vowels everywhere else, soft final -h. Penultimate stress on RI and KA.',
      'word',
      'Terima kasih /tə.ri.ma ka.sih/ banyak-banyak',
      '"Many many thanks" — a doubled intensifier, very common in Malaysian speech.',
      [
        { target: 'te- (/tə/, schwa)', note: 'unstressed; reduces to schwa' },
        { target: '-rima (/ri.ma/)', note: 'penultimate stress on ri; rolled r' },
        { target: 'kasih (/ka.sih/)', note: 'penultimate stress on ka; soft final h' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'orang',
      'o.raŋ',
      '"Person" — extremely common word. Final -ng is /ŋ/ (one phoneme), not /n.g/. Rolled r in the middle. Penultimate stress on O.',
      'word',
      'orang Malaysia /o.raŋ ma.lai.si.a/',
      '"A Malaysian person" — the country-name + person pattern works for all nationalities.',
      [
        { target: 'o- (/o/, stressed)', note: 'penultimate; clean rounded vowel' },
        { target: '-rang (/raŋ/)', note: 'rolled r + /a/ + velar nasal /ŋ/' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'saya',
      'sa.ja',
      '"I" — most used pronoun in BM. Two clean /a/ vowels. The "y" is pronounced /j/ (English y). Penultimate stress on SA.',
      'word',
      'Saya pelajar di UM.',
      '"I am a student at UM." — quintessential self-intro sentence with no copula.',
      [
        { target: 'sa- (/sa/, stressed)', note: 'penultimate; clean open vowel' },
        { target: '-ya (/ja/)', note: 'final unstressed; the y is /j/' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'Apa khabar?',
      'a.pa xa.bar',
      '"How are you?" — the universal Malaysian greeting question. The loan digraph "kh" is /x/ (German "ch" sound) or simplified to /k/. Rolled final r in "khabar".',
      'word',
      'A: Apa khabar? B: Khabar baik, terima kasih.',
      '"How are you? — I\'m well, thank you." — fully ritualized exchange; both turns are formulaic.',
      [
        { target: 'apa /a.pa/', note: '"what" — penultimate stress on A' },
        { target: 'khabar /xa.bar/', note: '"news"; kh is /x/ or /k/; rolled final r' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('Selamat pagi', 'sə.la.mat pa.gi', 'Formal-neutral morning greeting used roughly from sunrise to noon. The safe default for any first meeting, workplace, classroom, or customer-facing situation. Works equally with Malay, Chinese-Malaysian, and Indian-Malaysian addressees.', 'word', 'Selamat pagi, cikgu!', 'Standard student-to-teacher greeting; "cikgu" means "teacher" (primary/secondary).', null, [ACT.vocabularyGreetings]),
    createContentItem('Selamat tengah hari', 'sə.la.mat tə.ŋah ha.ri', 'Polite midday greeting used roughly from noon to ~3 PM. Less common than "selamat pagi" or "selamat petang" but appropriate in formal settings or at the start of an afternoon meeting.', 'word', 'Selamat tengah hari, tuan-tuan dan puan-puan.', '"Good afternoon, ladies and gentlemen" — formal opening for a midday event.', null, [ACT.vocabularyGreetings]),
    createContentItem('Selamat petang', 'sə.la.mat pə.taŋ', 'Polite late-afternoon to early-evening greeting (roughly 3 PM to maghrib/sunset). Note "petang" means "late afternoon" in MY, not "evening" as in some ID usage.', 'word', 'Selamat petang, semua.', '"Good afternoon, everyone" — typical opener for a 4 PM lecture.', null, [ACT.vocabularyGreetings]),
    createContentItem('Selamat malam', 'sə.la.mat ma.lam', 'Evening greeting AND farewell — context-dependent. As a greeting, after sunset; as a farewell, when parting at night. Less commonly used as a "good night before bed" — that is "Selamat tidur".', 'word', 'Selamat malam. Jumpa esok.', '"Good evening / good night. See you tomorrow." — typical close to an evening event.', null, [ACT.vocabularyGreetings]),
    createContentItem('Assalamualaikum', 'as.sa.la.mu.a.lai.kum', 'The Arabic-origin Muslim greeting ("Peace be upon you"). Used by Malay-Malaysians (mostly Muslim) with each other and with other Muslims regardless of ethnicity. Reply: "Waalaikumsalam". Non-Muslims do not normally use this greeting unless deliberately participating in Muslim contexts.', 'word', 'A: Assalamualaikum. B: Waalaikumsalam warahmatullahi wabarakatuh.', 'Full religious reply in formal settings; casual reply is just "Waalaikumsalam".', null, [ACT.vocabularyGreetings]),
    createContentItem('Salam sejahtera', 'sa.lam sə.dʒah.tə.ra', 'The interfaith-neutral formal greeting promoted by the Malaysian government. "Peace and prosperity". Used in official broadcasts, parliament, and any setting where the audience mixes religions. The PM opens speeches with this.', 'word', 'Salam sejahtera, hadirin sekalian.', '"Peace and prosperity to all attendees" — standard parliamentary opener.', null, [ACT.vocabularyGreetings]),
    createContentItem('Apa khabar?', 'a.pa xa.bar', 'Standard "how are you?" — formal-neutral. Less ritualized than the English version; can be answered substantively, but in a quick greeting the answer is "Khabar baik" (I\'m well).', 'word', 'Apa khabar, Encik Ali? — Khabar baik, terima kasih.', 'Polite peer-to-peer exchange using the title "Encik".', null, [ACT.vocabularyGreetings]),
    createContentItem('Apa cer / Apa cerita', 'a.pa tʃər / a.pa tʃə.ri.ta', 'Casual "what\'s up?" — literally "what story?". Used among friends, peers, in WhatsApp. NOT appropriate with elders or in formal settings.', 'word', 'Apa cer, bro? — Best, you?', 'Manglish-flavored peer exchange; "best" = great, and the English "you" mixes in naturally.', null, [ACT.vocabularyGreetings]),
    createContentItem('Selamat datang', 'sə.la.mat da.taŋ', 'Welcome — a host-to-guest greeting. Universal across Malaysia, prominently displayed on signs at KLIA, hotels, and tourist sites in Rumi AND in Jawi.', 'word', 'Selamat datang ke Malaysia.', '"Welcome to Malaysia" — the slogan you read above the immigration counter at KLIA.', null, [ACT.vocabularyGreetings]),
    createContentItem('Selamat berkenalan', 'sə.la.mat bər.kə.na.lan', 'Polite "pleased to meet you" — said at a first introduction. The prefix ber- + the root kenal "know (someone)" + -an. Slightly more formal than English "nice to meet you".', 'word', 'Selamat berkenalan, Encik Tan.', 'Polite first-meeting line with the title Encik + Chinese-Malaysian family name.', null, [ACT.vocabularyGreetings]),
    createContentItem('Selamat tinggal', 'sə.la.mat tiŋ.gal', 'Farewell said by the one LEAVING — literal: "safe staying". The counterpart "Selamat jalan" is said by the one STAYING. This MY symmetry is unique among major SE Asian languages.', 'word', 'Selamat tinggal. — Selamat jalan.', 'Mutual farewell: the leaver says "Selamat tinggal", the stayer replies "Selamat jalan" ("safe journey").', null, [ACT.vocabularyGreetings]),
    createContentItem('Jumpa lagi', 'dʒum.pa la.gi', 'Casual "see you again" — literal "meet again". Common among friends, classmates, peers. Variant: "Jumpa esok" ("see you tomorrow"). More personal than "Selamat tinggal".', 'word', 'Jumpa lagi, kawan!', '"See you again, friend!" — typical friendly close.', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People, roles, nationalities
    // ────────────────────────────────────────────────────────────────────
    createContentItem('saya', 'sa.ja', 'First-person singular — the polite, safe, all-purpose "I". Used by 99% of speakers in any public-facing context. Stays the same in subject, object, and possessive positions (rumah saya = my house).', 'word', 'Saya pelajar di UM.', 'Standard self-introduction frame: Saya + role + di + place.', null, [ACT.vocabularyPeople]),
    createContentItem('aku', 'a.ku', 'First-person singular — INTIMATE. Used only with close friends, family, in song lyrics, prayer (with God), or with a clearly understood peer. Using "aku" with a stranger or superior is rude in Malaysian society.', 'word', 'Aku rindu kau.', '"I miss you" — typical song-lyric register; you would NOT say this to a lecturer.', null, [ACT.vocabularyPeople]),
    createContentItem('awak', 'a.waʔ', 'Second-person singular — polite-neutral "you". The safe everyday default for talking to a peer, colleague, classmate, or anyone you don\'t know but are not formally addressing.', 'word', 'Awak dari mana?', '"Where are you from?" — polite first-meeting question.', null, [ACT.vocabularyPeople]),
    createContentItem('kamu', 'ka.mu', 'Second-person singular — casual "you". Common with classmates, friends, slightly less formal than "awak". To an elder, "kamu" can sound presumptuous; stick to "awak" or a title.', 'word', 'Kamu lapar?', '"Are you hungry?" — casual peer question.', null, [ACT.vocabularyPeople]),
    createContentItem('anda', 'an.da', 'Second-person singular — FORMAL "you". Used in writing, broadcasts, formal speeches, customer-service scripts, advertising. Rarely used face-to-face in casual settings.', 'word', 'Anda dialu-alukan ke Malaysia.', '"You are warmly welcomed to Malaysia" — official Tourism Malaysia register.', null, [ACT.vocabularyPeople]),
    createContentItem('engkau / kau', 'əŋ.kau / kau', 'Second-person singular — INTIMATE or HOSTILE. Used between very close friends, lovers, or in anger. In song lyrics, very common. In a stranger interaction, sounds aggressive.', 'word', 'Engkau buat apa? / Kau buat apa?', '"What are you doing?" — said to a sibling, lover, or in anger to a stranger.', null, [ACT.vocabularyPeople]),
    createContentItem('dia', 'di.a', 'Third-person singular — used for he, she, AND it (people and animals). BM does NOT mark gender in pronouns — same form for everyone.', 'word', 'Dia kawan saya.', '"He / she is my friend" — gender is unspecified, recovered from context.', null, [ACT.vocabularyPeople]),
    createContentItem('kami', 'ka.mi', 'First-person plural — EXCLUSIVE "we" (we, NOT including the addressee). "Kami dari Malaysia" said to a non-Malaysian = "we Malaysians, not you".', 'word', 'Kami pelajar UM.', '"We are students at UM" — said to outsiders; not including them.', null, [ACT.vocabularyPeople]),
    createContentItem('kita', 'ki.ta', 'First-person plural — INCLUSIVE "we" (we, INCLUDING the addressee). "Kita pergi makan" said to a friend = "let\'s us go eat (you + me)".', 'word', 'Mari kita makan.', '"Let\'s eat (together)" — the inclusive "we" is a Malay grammatical specialty that English lacks.', null, [ACT.vocabularyPeople]),
    createContentItem('mereka', 'mə.re.ka', 'Third-person plural — "they". The schwa in me-, full /e/ in -re-, full /a/ at the end.', 'word', 'Mereka pelajar antarabangsa.', '"They are international students" — typical UM-context description.', null, [ACT.vocabularyPeople]),
    createContentItem('nama', 'na.ma', 'A person\'s name (full name or just given name, context-dependent). Used in "Nama saya …" ("My name is …") and "Apa nama awak?" ("What\'s your name?").', 'word', 'Nama saya Sarah.', '"My name is Sarah" — slightly more formal than "Saya Sarah".', null, [ACT.vocabularyPeople]),
    createContentItem('Encik', 'ən.tʃiʔ', 'Title — Mr. Used before a man\'s name (Encik Ali, Encik Tan, Encik Kumar) — works across ethnicity. Also used alone as a polite address to a stranger man.', 'word', 'Encik Tan ialah jurutera.', '"Mr Tan is an engineer" — formal third-person reference using title + Chinese-Malaysian family name.', null, [ACT.vocabularyPeople]),
    createContentItem('Puan', 'pu.an', 'Title — Mrs / Ms. Used before a woman\'s name for any adult woman, married or not (modern usage). The all-purpose female title parallel to Encik.', 'word', 'Puan Aishah seorang pensyarah.', '"Ms Aishah is a lecturer" — Malay-Malaysian female academic with the Puan title.', null, [ACT.vocabularyPeople]),
    createContentItem('Cik', 'tʃiʔ', 'Title — Miss. Used for a young unmarried woman, or as a slightly more casual version of Puan. Less common in modern formal usage than Puan.', 'word', 'Cik Aminah belajar di UKM.', '"Miss Aminah studies at UKM" — using Cik with an unmarried female student.', null, [ACT.vocabularyPeople]),
    createContentItem('Tuan', 'tu.an', 'Title — Sir, used for an honored or senior man. More respectful than Encik. Common with Hajj-completed Muslim men: "Tuan Haji Ahmad". Also used in the address "Yang Berhormat Tuan" for MPs.', 'word', 'Tuan Haji Ahmad, sila duduk.', '"Tuan Haji Ahmad, please sit" — honoring his completed pilgrimage.', null, [ACT.vocabularyPeople]),
    createContentItem('cikgu', 'tʃiʔ.gu', 'Title — teacher (primary or secondary). Used both as a job title and as direct address. "Cikgu Aishah" = Teacher Aishah, "Selamat pagi, cikgu" = "Good morning, teacher".', 'word', 'Cikgu Aishah mengajar Bahasa Melayu.', '"Teacher Aishah teaches Malay" — classroom register.', null, [ACT.vocabularyPeople]),
    createContentItem('pensyarah', 'pən.ʃa.rah', 'Lecturer / university faculty. Distinct from "cikgu" (school teacher) and "profesor" (full professor). The standard term for UM, USM, UKM, UPM staff.', 'word', 'Dr. Aishah ialah pensyarah di UM.', '"Dr Aishah is a lecturer at UM" — note the academic title Dr. before the name.', null, [ACT.vocabularyPeople]),
    createContentItem('pelajar', 'pə.la.dʒar', 'Student — primary, secondary, OR university. The all-purpose word. "Murid" is used specifically for school pupils; "mahasiswa" specifically for university (formal).', 'word', 'Saya pelajar tahun pertama.', '"I am a first-year student" — typical UM intro.', null, [ACT.vocabularyPeople]),
    createContentItem('jurutera', 'dʒu.ru.tə.ra', 'Engineer (any discipline). Compound of "juru" (skilled person) + "tera" (Sanskrit-origin, technical). Higher-status profession in Malaysia, often associated with Petronas, oil & gas, semiconductor industries.', 'word', 'Encik Tan ialah jurutera perisian.', '"Mr Tan is a software engineer" — common Klang Valley profession.', null, [ACT.vocabularyPeople]),
    createContentItem('doktor', 'dok.tor', 'A medical doctor OR a PhD holder. Used as a title before the name: "Dr. Aishah" (Dr Aishah). The English loan spelling "doktor" preserves the pronunciation.', 'word', 'Doktor Aishah pakar jantung.', '"Dr Aishah is a heart specialist" — using doktor as a title.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Malaysia', 'o.raŋ ma.lai.si.a', 'A Malaysian person. The country-name + orang pattern works universally. Equally appropriate for Malay, Chinese-Malaysian, Indian-Malaysian, or indigenous Malaysian identity.', 'word', 'Saya orang Malaysia.', 'Standard nationality self-identification across all ethnic groups.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Indonesia', 'o.raŋ in.do.ne.si.a', 'An Indonesian person. Note that "orang Indon" (without the "esia") is informal and can be slightly derogatory in some Malaysian contexts — always use the full form in polite speech.', 'word', 'Dia orang Indonesia, dari Jakarta.', '"She is Indonesian, from Jakarta" — full form is polite.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Singapura', 'o.raŋ si.ŋa.pu.ra', 'A Singaporean person. Singapore Malay is a recognized variety; many Singapore Malays speak BM at home and English at work.', 'word', 'Dia orang Singapura, tetapi belajar di UM.', '"He is Singaporean but studies at UM" — a common KL-UM scenario.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Brunei', 'o.raŋ bru.nai', 'A Bruneian person. Brunei Malay is another regional variety; Brunei uses BM as its sole official language (no English co-officiality unlike Singapore).', 'word', 'Mereka pelajar dari Brunei.', '"They are students from Brunei" — common at UM under bilateral exchange.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Cina', 'o.raŋ tʃi.na', 'In Malaysia, this refers to Chinese-Malaysians (ethnic Chinese citizens) OR Chinese nationals — context decides. Many Chinese-Malaysians self-identify as "rakyat Malaysia berketurunan Cina" in formal speech.', 'word', 'Encik Tan ialah orang Cina Malaysia.', '"Mr Tan is a Chinese-Malaysian" — full ethnic-national identity descriptor.', null, [ACT.vocabularyPeople]),
    createContentItem('orang India', 'o.raŋ in.di.a', 'Indian-Malaysian (ethnic Indian, ~7% of population) OR Indian national. Most Indian-Malaysians trace ancestry to Tamil Nadu; smaller communities are Malayali, Punjabi, Bengali.', 'word', 'Dia orang India Malaysia berketurunan Tamil.', '"She is an Indian-Malaysian of Tamil descent" — precise ethnic-national descriptor.', null, [ACT.vocabularyPeople]),
    createContentItem('orang asli', 'o.raŋ as.li', 'Literally "original people" — the official term for the indigenous Peninsular Malaysian population (Semai, Temiar, Jakun, Mah Meri, etc.). Distinct from "Bumiputera Sabah/Sarawak" (Kadazan, Iban, Bidayuh, etc.).', 'word', 'Komuniti orang asli tinggal di hutan Pahang.', '"The indigenous community lives in the Pahang forest" — cultural fact.', null, [ACT.vocabularyPeople]),
    createContentItem('orang Inggeris / British', 'o.raŋ iŋ.gə.ris', 'A British person. "Inggeris" is from the older English-language country name; modern BM increasingly uses "British" as a loan.', 'word', 'Encik James orang Inggeris.', '"Mr James is British".', null, [ACT.vocabularyPeople]),
    createContentItem('orang Amerika', 'o.raŋ a.me.ri.ka', 'An American (United States). For Latin Americans, Malaysians use "Amerika Latin" + nationality.', 'word', 'Saya orang Amerika, dari New York.', '"I am American, from New York" — full intro.', null, [ACT.vocabularyPeople]),
    createContentItem('pelajar antarabangsa', 'pə.la.dʒar an.ta.ra.baŋ.sa', 'International student — the standard academic term at UM, USM, UKM. "Antarabangsa" means "international" (antara = between, bangsa = nation/people).', 'word', 'Universiti Malaya ada ramai pelajar antarabangsa.', '"UM has many international students" — typical recruitment-brochure phrase.', null, [ACT.vocabularyPeople]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: Pronouns & politeness
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'lapisan kesopanan kata ganti diri',
      'la.pi.san kə.so.pa.nan ka.ta gan.ti di.ri',
      'BM pronouns are layered by politeness — much more elaborate than English I/you. The wrong choice signals the wrong relationship. Always START with the safe-formal layer and shift down only when the other person does.',
      'sentence',
      'Tertib: anda (formal) → saya/awak (polite) → kamu (casual) → aku/kau (intimate).',
      'A four-step ladder — drop one rung when you and your interlocutor are clearly peers; drop two only with close friends or family.',
      [
        { target: 'I: saya (polite) / aku (intimate)', note: 'use saya everywhere except with close friends, family, or in songs' },
        { target: 'YOU: anda (formal) / awak (polite) / kamu (casual) / engkau-kau (intimate)', note: 'four levels — the most layered second-person system in major SE Asian languages' },
        { target: 'WE-exclusive: kami / WE-inclusive: kita', note: 'BM marks the +addressee distinction explicitly, unlike English' },
        { target: 'HE/SHE: dia (no gender)', note: 'one form for all genders — much simpler than English he/she' },
      ],
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'kami vs kita — the inclusive/exclusive split',
      'ka.mi vs ki.ta',
      'CRITICAL: BM distinguishes EXCLUSIVE we (KAMI, not including the addressee) from INCLUSIVE we (KITA, including the addressee). English "we" collapses these — Malay does not.',
      'sentence',
      'Kami pelajar UM, anda dari mana? (we = us, NOT you) / Mari kita pergi makan! (we = us, INCLUDING you)',
      'Two scenes: in the first, the speaker is talking to an outsider; in the second, inviting the addressee along.',
      [
        { target: 'kami (exclusive)', note: 'we BUT NOT you — used when speaking to someone outside the group' },
        { target: 'kita (inclusive)', note: 'we INCLUDING you — used in invitations and shared-group contexts' },
      ],
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'kata ganti tidak berubah bentuk',
      'ka.ta gan.ti ti.daʔ bə.ru.bah bən.tuʔ',
      'Same form for subject and object — unlike English (I/me, he/him). "Saya cinta dia" = "I love him/her"; "Dia cinta saya" = "He/she loves me". Word order does the case work, not the pronoun.',
      'sentence',
      'Saya cinta dia. (I love him/her) / Dia cinta saya. (He/she loves me)',
      'Word order does the work of English pronoun case marking.',
      null,
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'kata ganti posesif',
      'ka.ta gan.ti po.se.sif',
      'POSSESSIVE: just place the pronoun AFTER the noun. "rumah saya" = my house; "kereta awak" = your car; "buku dia" = his/her book. No -\'s suffix, no separate possessive pronoun.',
      'sentence',
      'rumah saya · kereta awak · buku dia · negara kami · bahasa kita · komputer mereka',
      'Six possessive examples — all use the SAME pattern: noun + pronoun.',
      [
        { target: 'rumah saya', note: '"my house" — literally "house I"' },
        { target: 'kereta awak', note: '"your car" — literally "car you"' },
        { target: 'buku dia', note: '"his / her book" — gender unmarked' },
      ],
      [ACT.grammarPronouns],
    ),
    createContentItem(
      '-ku, -mu, -nya — short possessive forms',
      '-ku, -mu, -ɲa',
      'Shortened possessives suffixed to the noun: rumah-ku (my house, intimate/poetic), rumah-mu (your house, intimate), rumah-nya (his/her/its house, neutral). The -nya form is high-frequency in modern speech; -ku and -mu sound poetic or song-like.',
      'sentence',
      'rumahnya besar (his/her house is big) — neutral, everyday.\nkasihku sayang (my dear love) — poetic, song lyric.',
      'The -nya form is everyday neutral; -ku and -mu are reserved for poetry, songs, or intimate speech.',
      [
        { target: '-ku', note: 'intimate/poetic "my" — songs, love letters' },
        { target: '-mu', note: 'intimate/poetic "your"' },
        { target: '-nya', note: 'neutral everyday "his/her/its" — fully unmarked register' },
      ],
      [ACT.grammarPronouns],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: ialah / adalah
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'tiada kata kerja "to be"',
      'ti.a.da ka.ta kər.dʒa "to be"',
      'CRITICAL: Bahasa Melayu has NO obligatory copula in equational sentences. "Saya pelajar" ("I [am] a student") is a complete sentence with NO verb. Adding a copula in casual speech sounds odd.',
      'sentence',
      'Saya pelajar. (I am a student.)\nDia jurutera. (He / she is an engineer.)\nKuala Lumpur ibu negara Malaysia. (KL is the capital of Malaysia.)',
      'Three complete sentences, zero copulas — the no-copula rule is the single easiest grammatical feature of BM for any English speaker.',
      [
        { target: 'Saya pelajar', note: 'subject (saya) + predicate (pelajar); no linking verb' },
        { target: 'Dia jurutera', note: 'gender-unmarked dia + profession; complete sentence' },
        { target: 'KL ibu negara Malaysia', note: 'place + descriptor; no copula even in formal-feeling statement' },
      ],
      [ACT.grammarIalah],
    ),
    createContentItem(
      'ialah — for noun = noun definitions',
      'i.a.lah',
      'IALAH appears in FORMAL WRITING for definitional equations between two noun phrases. Pattern: NP IALAH NP. "Bahasa Melayu IALAH bahasa rasmi Malaysia" ("Malay IS the official language of Malaysia"). In speech, drop ialah.',
      'sentence',
      'Bahasa Melayu ialah bahasa rasmi Malaysia.\nUniversiti Malaya ialah universiti tertua di Malaysia.',
      'Two definitional sentences — both could drop "ialah" in speech but keep it in formal writing.',
      [
        { target: 'NP1 ialah NP2', note: 'definitional structure; both sides are nouns' },
        { target: 'casual: Bahasa Melayu, bahasa rasmi Malaysia', note: 'in speech, just pause where "ialah" would be' },
        { target: 'formal writing: Bahasa Melayu ialah bahasa rasmi Malaysia', note: 'use "ialah" in essays, reports, news articles' },
      ],
      [ACT.grammarIalah],
    ),
    createContentItem(
      'adalah — for predicate noun phrases',
      'a.da.lah',
      'ADALAH appears in formal writing where the predicate is a noun phrase OR an adjective phrase that needs emphasis. Distinct from ialah by frame: ialah marks definition (X = Y); adalah marks attribution (X is-a Y).',
      'sentence',
      'Kuala Lumpur adalah ibu negara Malaysia. (predicate noun phrase, formal)\nKeselamatan adalah penting. (predicate adjective phrase, formal)',
      'Adalah is broader than ialah in scope; ialah is reserved for true noun-noun definitions.',
      [
        { target: 'ialah → noun = noun definition', note: 'use when the two sides are interchangeable categories' },
        { target: 'adalah → attribution / predicate', note: 'use when assigning a property or describing' },
      ],
      [ACT.grammarIalah],
    ),
    createContentItem(
      'soal jawab dengan no copula',
      'so.al dʒa.wab dəŋ.an no copula',
      'Yes/no questions are formed simply by intonation OR by adding "ke" at the end (or fronting the predicate). "Awak pelajar?" ("You [are] a student?") with rising intonation is a complete question.',
      'sentence',
      'Awak pelajar? — Ya, saya pelajar UM.\nDia jurutera? — Tidak, dia doktor.',
      'Two Q-A pairs; the answer form mirrors the question structure.',
      [
        { target: 'Q: Awak pelajar?', note: 'rising intonation OR add -kah: Pelajarkah awak?' },
        { target: 'A: Ya, saya pelajar.', note: '"Yes, I am a student" — repeat the predicate for emphasis' },
        { target: 'A: Tidak, saya … (BUKAN if negating noun)', note: 'switch to BUKAN if negating the noun predicate' },
      ],
      [ACT.grammarIalah],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Negation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'tidak vs bukan — the noun-vs-everything-else split',
      'ti.daʔ vs bu.kan',
      'BM has TWO negators and they are NOT interchangeable. BUKAN negates a noun ("Saya BUKAN doktor" = "I am NOT a doctor"). TIDAK (and its short form TAK) negates a verb or an adjective ("Saya TIDAK lapar" = "I am NOT hungry").',
      'sentence',
      'Saya BUKAN doktor. (noun → bukan)\nSaya TIDAK lapar. (adjective → tidak)\nSaya TIDAK pergi. (verb → tidak)',
      'Three negation patterns — switching bukan/tidak is one of the most common beginner errors.',
      [
        { target: 'BUKAN + noun', note: 'noun-negator only — "saya bukan pelajar" = "I am not a student"' },
        { target: 'TIDAK + verb', note: 'verb-negator — "saya tidak makan" = "I do not eat"' },
        { target: 'TIDAK + adjective', note: 'adjective-negator — "saya tidak penat" = "I am not tired"' },
        { target: 'TAK = TIDAK (casual)', note: 'in speech, "tidak" shortens to "tak" — same meaning, casual register' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'BUKAN…, tetapi… — politely correcting',
      'bu.kan tə.ta.pi',
      'The BUKAN…, tetapi… frame politely flips a wrong guess. Pattern: "BUKAN [wrong thing], TETAPI [right thing]". The casual version uses "tapi" instead of "tetapi".',
      'sentence',
      'Saya BUKAN orang Indonesia, TETAPI orang Malaysia.\nDia BUKAN doktor, TAPI jurutera.',
      'Two corrections — note formal "tetapi" vs casual "tapi". Both versions are polite; tetapi feels textbook.',
      [
        { target: 'BUKAN X', note: 'state what is NOT the case' },
        { target: 'tetapi / tapi Y', note: 'state what IS the case; tetapi formal, tapi casual' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'tidak ada / tiada / takde',
      'ti.daʔ a.da / ti.a.da / taʔ.de',
      '"There is no / not have" has three forms layered by register. TIDAK ADA (formal-spoken), TIADA (formal-written, archaic-flavored), TAK ADA / TAKDE (casual spoken). All three mean "not have / there isn\'t".',
      'sentence',
      'Saya tidak ada masa. (polite-neutral)\nSaya tiada masa. (formal-written)\nSaya takde masa. (casual spoken)',
      'Three registers, same meaning ("I don\'t have time") — pick the one that matches your situation.',
      [
        { target: 'tidak ada', note: 'polite-neutral; safe default in any conversation' },
        { target: 'tiada', note: 'formal/written; appears in news, novels, formal speeches' },
        { target: 'takde (tak ada)', note: 'fully casual; WhatsApp, chats, peer speech' },
      ],
      [ACT.grammarNegation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Perkenalkan diri saya',
      'pər.kə.nal.kan di.ri sa.ja',
      'A short self-introduction paragraph by an international student at Universiti Malaya. Read aloud with: schwas in se-, pe-, te-; rolled r in pelajar, terima; unreleased final -k in tidak; penultimate stress.',
      'sentence',
      'Selamat pagi! Nama saya Sarah. Saya berasal dari New York, Amerika Syarikat. Sekarang saya pelajar tahun pertama di Universiti Malaya, jurusan Sains Komputer. Saya tinggal di asrama berdekatan Pantai Hospital. Saya bukan orang Malaysia, tetapi saya sangat suka tinggal di Kuala Lumpur. Terima kasih.',
      'A complete UM-international-student self-intro paragraph — used as the template for the writing activity at the end.',
      [
        { target: 'Selamat pagi! Nama saya Sarah.', note: 'opener: greeting + name; complete with no copula' },
        { target: 'Saya berasal dari New York, Amerika Syarikat.', note: 'origin sentence with ber-asal (prefix ber- + root asal "origin")' },
        { target: 'Sekarang saya pelajar tahun pertama di Universiti Malaya, jurusan Sains Komputer.', note: 'current status: year + program; "jurusan" = major; "di" = at/in' },
        { target: 'Saya tinggal di asrama berdekatan Pantai Hospital.', note: 'residence: ber-dekatan (prefix + dekat "near" + -an) = "near"; Pantai is a KL neighborhood' },
        { target: 'Saya bukan orang Malaysia, tetapi saya sangat suka tinggal di Kuala Lumpur.', note: 'correction + opinion; demonstrates BUKAN…tetapi… frame' },
        { target: 'Terima kasih.', note: 'standard polite close to a self-intro' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'Soalan kefahaman',
      'so.a.lan kə.fa.ha.man',
      'Four comprehension questions on the self-intro above. Answer each with a short BM sentence using the grammar of this lesson.',
      'sentence',
      'Q1: Siapa nama dia? Q2: Dia dari mana? Q3: Dia pelajar di mana? Q4: Dia orang Malaysia?',
      'Standard reading-comp format; the answers are short and reuse the source sentence patterns.',
      [
        { target: 'Q1 Siapa nama dia? → A: Namanya Sarah.', note: 'who-question + possessive -nya answer' },
        { target: 'Q2 Dia dari mana? → A: Dia dari New York.', note: 'origin question; "dari mana" = "from where"' },
        { target: 'Q3 Dia pelajar di mana? → A: Dia pelajar di Universiti Malaya.', note: 'location question; "di mana" = "at where"' },
        { target: 'Q4 Dia orang Malaysia? → A: Bukan, dia orang Amerika.', note: 'yes/no with noun → answer with BUKAN' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening / dialogue
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Dialog: hari pertama di UM',
      'di.a.log: ha.ri pər.ta.ma di u.em',
      'A 4-turn first-day-at-UM dialogue between Sarah (international student) and Dr. Aishah (a Malay-Malaysian lecturer from Penang). Note the register: polite-formal throughout, using SAYA / DR. AISHAH / ENCIK names.',
      'sentence',
      'Dr. Aishah: Selamat pagi! Saya Dr. Aishah, pensyarah Sains Komputer. Awak siapa?\nSarah: Selamat pagi, Dr. Aishah. Nama saya Sarah, pelajar baru dari Amerika.\nDr. Aishah: Selamat berkenalan, Sarah. Awak dari bandar mana di Amerika?\nSarah: Saya dari New York, Dr. Aishah. Saya sangat teruja belajar di UM.',
      'Four-turn first-day dialogue at UM; mirrors the canonical greet-introduce-ask-respond sequence.',
      [
        { target: 'Turn 1 (Dr. Aishah)', note: 'opens with Selamat pagi + self-intro by title + immediate question to student' },
        { target: 'Turn 2 (Sarah)', note: 'replies with greeting + name + origin in one breath; uses "pelajar baru" ("new student")' },
        { target: 'Turn 3 (Dr. Aishah)', note: 'acknowledges with Selamat berkenalan, then drills down: which city in America?' },
        { target: 'Turn 4 (Sarah)', note: 'answers city + adds emotional response ("teruja" = excited)' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      'Dialog: hari pertama dengan kawan sekelas',
      'di.a.log: ha.ri pər.ta.ma də.ŋan ka.wan sə.kə.las',
      'A 4-turn dialogue with a Tamil-speaking classmate from JB. Note the register shift: AWAK instead of formal ANDA, casual first-name basis, the multi-ethnic Malaysian reality where English words mix in.',
      'sentence',
      'Sarah: Hi! Saya Sarah, baru sampai dari Amerika. Awak siapa?\nKumar: Hi Sarah, saya Kumar, dari Johor Bahru. Selamat datang ke UM!\nSarah: Terima kasih, Kumar. Awak orang Malaysia?\nKumar: Ya, saya orang Malaysia berketurunan Tamil. Best lah belajar bersama-sama.',
      'Peer-to-peer dialogue: same script as the lecturer one but with awak-saya, "lah" particle, and casual register.',
      [
        { target: 'Turn 1 (Sarah)', note: 'casual "Hi" + self-intro with arrival mention; "baru sampai" = "just arrived"' },
        { target: 'Turn 2 (Kumar)', note: 'returns greeting + name + city (JB) + welcomes; demonstrates Indian-Malaysian peer voice' },
        { target: 'Turn 3 (Sarah)', note: 'follow-up nationality question — common second turn to confirm ethnicity-nationality' },
        { target: 'Turn 4 (Kumar)', note: 'full ethnic-national identity: "orang Malaysia berketurunan Tamil"; ends with "best lah" (great + emphatic -lah)' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Tulis perkenalan sendiri',
      'tu.lis pər.kə.na.lan sən.di.ri',
      'Write your own 3-5 sentence self-introduction in BM. Mandatory ingredients: a greeting, your name, your country, your role at UM, and one extra fact about why you came to Malaysia. Use SAYA at least twice, an equational sentence (no copula) at least once, and BUKAN or TIDAK once.',
      'sentence',
      'Template: Selamat pagi! Nama saya ___. Saya berasal dari ___. Saya pelajar di Universiti Malaya, jurusan ___. Saya bukan orang Malaysia, tetapi saya datang ke sini untuk ___. Terima kasih.',
      'A fill-in-the-blank template based on the reading paragraph; produce your own version and read it aloud.',
      [
        { target: 'Sentence 1: Greeting + name', note: 'opener; uses "Nama saya …"' },
        { target: 'Sentence 2: Origin', note: 'use "Saya berasal dari …"' },
        { target: 'Sentence 3: Status at UM', note: 'use "Saya pelajar di UM, jurusan …"; jurusan = major' },
        { target: 'Sentence 4: Correction / motivation', note: 'demonstrates BUKAN…tetapi… frame OR uses tidak/bukan in some way' },
        { target: 'Sentence 5: Close', note: 'Terima kasih or Saya sangat gembira berada di sini' },
      ],
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Encik / Puan — bahasa rentas etnik',
      'ən.tʃiʔ / pu.an — ba.ha.sa rən.tas et.niʔ',
      'The titles Encik (Mr.) and Puan (Mrs./Ms.) are ETHNICALLY NEUTRAL — they work equally with Malay (Encik Ali, Puan Aishah), Chinese-Malaysian (Encik Tan, Puan Lim), and Indian-Malaysian (Encik Kumar, Puan Devi) names. This is the linguistic spine of Malaysian multi-ethnic society.',
      'sentence',
      'Encik Ali (Malay) · Encik Tan (Cina) · Encik Kumar (India) — semua menggunakan tajuk yang sama.',
      'One title system across three communities; one of the practical accomplishments of post-Independence Malaysia.',
      [
        { target: 'Encik + family name', note: 'works for Malay, Chinese, Indian, Eurasian, and indigenous Malaysian men' },
        { target: 'Puan + family name', note: 'works the same way for adult women; modern usage is name-after-marriage neutral' },
        { target: 'Cik + family name', note: 'younger/unmarried women; less universal than Puan in formal settings' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Rumah Terbuka — open house culture',
      'ru.mah tər.bu.ka',
      '"Rumah terbuka" (literally "open house") is the Malaysian social institution where, during each major holiday (Hari Raya, Chinese New Year, Deepavali, Christmas), families OPEN their homes to everyone — neighbors, colleagues, strangers — regardless of religion or ethnicity. The PM hosts a national rumah terbuka.',
      'sentence',
      'Pada Hari Raya, kami selalu pergi ke rumah terbuka kawan-kawan Cina dan India juga.',
      '"At Hari Raya we always also visit our Chinese and Indian friends\' open houses." — the multi-directional reality of Malaysian celebration.',
      [
        { target: 'Hari Raya Aidilfitri (Malay/Muslim)', note: 'open houses host all communities; rendang and ketupat for everyone' },
        { target: 'Tahun Baru Cina (Chinese New Year)', note: 'Chinese-Malaysian open houses; mandarin oranges and yee sang' },
        { target: 'Deepavali (Tamil/Hindu)', note: 'Indian-Malaysian open houses; muruku and Indian sweets' },
        { target: 'Krismas (Christmas)', note: 'Christian Malaysian open houses; turkey, cake, and carols' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Bahasa sebagai jambatan',
      'ba.ha.sa sə.ba.gai dʒam.ba.tan',
      'In Malaysia, Bahasa Melayu is the "JAMBATAN" (bridge) language across ethnic communities. Malays speak Malay at home, Chinese-Malaysians speak Mandarin/Hokkien/Cantonese/Hakka, Indian-Malaysians speak Tamil/Malayalam/Punjabi — and EVERYONE meets in Malay (and English) in school, government, and public life.',
      'sentence',
      'Di rumah saya bercakap Tamil, di sekolah saya bercakap Bahasa Melayu dan Inggeris.',
      '"At home I speak Tamil, at school I speak Malay and English." — the typical Malaysian linguistic biography.',
      null,
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Tugasan: hari pertama di UM',
      'tu.ga.san: ha.ri pər.ta.ma di u.em',
      'Roleplay your first day at Universiti Malaya with the AI tutor. The tutor will play (1) a senior Malay-Malaysian lecturer from Penang who addresses you formally, and (2) a Tamil-speaking classmate from JB who addresses you casually. Use the right pronouns and titles for each.',
      'sentence',
      'Scene: Anda baru sampai di UM dari negara anda. Pertama, anda bertemu pensyarah anda di kuliah pertama. Kemudian, anda bertemu kawan sekelas anda di kantin.',
      'Two-scene roleplay: formal register with lecturer, casual register with classmate.',
      [
        { target: 'Scene 1 (with lecturer): formal', note: 'use Dr. Aishah / Encik / Puan + family name; pronoun saya-anda or saya-awak with polite intonation' },
        { target: 'Scene 2 (with classmate): casual', note: 'first-name basis; pronoun saya-awak or saya-kamu; "lah" particle natural' },
        { target: 'Target: 6 turns total in BM', note: 'no breaking into English unless deliberately code-switching for effect' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
