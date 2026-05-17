// Level 1 Unit 1 — Greetings & Self-Introduction (Turkish)
// Functions: greeting, introducing yourself, asking where someone is from,
// correcting a wrong assumption, farewells.
//
// All content is authored with Turkish (Latin script target) + English glosses
// (canonical source). The AI conversation tutor reads this curriculum and
// delivers it to each learner in their preferred native language at runtime —
// never assume a specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition.

const createContentItem = (
  target,
  pronunciation,
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
  romanization: pronunciation,
  nativeText: note,
  pronunciation,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'tr-l1u1-orientation',
  pronunciation: 'tr-l1u1-pronunciation',
  vocabularyGreetings: 'tr-l1u1-vocab-greetings',
  vocabularyPeople: 'tr-l1u1-vocab-people',
  grammarCopula: 'tr-l1u1-grammar-copula',
  grammarPronouns: 'tr-l1u1-grammar-pronouns',
  grammarNegation: 'tr-l1u1-grammar-negation',
  reading: 'tr-l1u1-reading',
  listening: 'tr-l1u1-listening',
  writing: 'tr-l1u1-writing',
  culture: 'tr-l1u1-culture',
  task: 'tr-l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet someone in Turkish and say goodbye in three registers (casual, polite, formal) so you can match the situation.',
      'Introduce yourself with your name, country, and one role (student / teacher / engineer) using the standard "Adım…" and "Ben…" patterns plus the personal-suffix copula (-im/-ım/-um/-üm).',
      'Ask another person their name and where they are from, then respond appropriately using -li/-lı/-lu/-lü (nationality/origin suffix).',
    ],
    task: 'Picture your first day at Boğaziçi Üniversitesi in İstanbul — you walk into a research meeting and meet a visiting scholar from Ankara. By the end of this lesson you should handle the whole exchange in Turkish without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce "Merhaba" (mer-ha-BA) with all three syllables clear, the final stress, and the h fully voiced — not anglicized to "mer-HAH-buh".',
      'Distinguish "iyi" (front-i, "ee-YEE") from "ıyı" (which would be a different word with back vowels) — and pronounce "İyi günler" with the ü rounded.',
      'Apply vowel harmony in the personal-suffix copula: öğrenciyim (front-rounded → -yim), Türküm (front-rounded → -üm), Amerikalıyım (back-unrounded → -yım) — same meaning, four shapes.',
    ],
    task: 'Read each example aloud and identify whether vowel harmony applies, then pronounce the correct suffix shape.',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 12 greetings and farewells across three registers, with the right phrase for each situation.',
      'Distinguish Selam (casual peer) from Merhaba (universal polite) from İyi günler (formal/time-of-day) — using the wrong one with the wrong person reads as too distant or too familiar.',
    ],
    task: 'Say each phrase aloud three times with correct stress, then pair each one with the situation where you would use it.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and nationalities',
    goals: [
      'Use the 6 personal pronouns (ben, sen, o, biz, siz, onlar) correctly, including the formal/plural siz used for honorific address.',
      'State your role (öğrenci / öğretmen / mühendis) and nationality (country + -li/-lı/-lu/-lü) in a complete short sentence using the personal-suffix copula.',
    ],
    task: 'Say your own role and nationality using the "Ben + role + -im" pattern, then describe a classmate using "O + role + -dir" or just leave the suffix off.',
  },
  {
    id: ACT.grammarCopula,
    section: 'Grammar I',
    title: 'The personal-suffix copula — "to be" in Turkish',
    goals: [
      'Use the personal-suffix copula (-im/-ım/-um/-üm for "I am"; -sin/-sın/-sun/-sün for "you are"; zero or -dir for "he/she/it is") — Turkish has no separate "to be" verb; the copula attaches to the predicate.',
      'Apply vowel harmony to choose the correct shape: Türküm (I am Turkish, front-rounded), Amerikalıyım (I am American, back-unrounded — with buffer y).',
      'Know that the 3rd person can use either NO suffix (informal) or -dir (formal/written). Both are correct in their context.',
    ],
    task: 'Write six self-identifications using the personal-suffix copula and four nationality words, then convert them to questions with -mı/-mi/-mu/-mü.',
  },
  {
    id: ACT.grammarPronouns,
    section: 'Grammar II',
    title: 'Personal pronouns + dropped subjects',
    goals: [
      'Use the 6 personal pronouns: ben (I), sen (you-casual), o (he/she/it), biz (we), siz (you-plural/formal), onlar (they).',
      'Drop the subject pronoun when the personal-suffix copula already marks person — "Öğrenciyim" (I am a student) is more natural than "Ben öğrenciyim", which sounds emphatic.',
      'Use siz for both plural-you AND formal-singular-you — same form, like French vous or German Sie.',
    ],
    task: 'Take three explicit-pronoun sentences and drop the pronoun; explain when keeping it adds emphasis.',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar III',
    title: 'Negation with "değil" and correcting an assumption',
    goals: [
      'Negate a noun/adjective predicate with the separate word "değil" placed after the predicate: "Japon değilim" (I am not Japanese).',
      'Distinguish "değil" (noun/adjective negation) from "-mE-" (verbal negation suffix) — Turkish has TWO negation systems depending on the predicate type.',
      'Apply the "X değil, Y" correction pattern: "Japon değilim, Türküm" (I am not Japanese, I am Turkish) — the polite three-part correction.',
    ],
    task: 'Imagine a classmate guesses your nationality wrong; correct them in one polite sentence using "X değil, Y" with proper harmony.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a self-introduction',
    goals: [
      'Read a short self-introduction paragraph aloud with correct vowel harmony, ğ-lengthening, and natural final-syllable stress.',
      'Answer comprehension questions about the speaker\'s name, country, role, and department using full or short answers.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first meeting',
    goals: [
      'Follow a 4-turn first-meeting dialogue and recognize the casual vs formal register markers (Selam vs Merhaba, sen vs siz, "Adım…" vs "İsmim…").',
      'Reproduce the dialogue with your own name and country, swapping in the relevant phrases naturally.',
    ],
    task: 'Read the polite dialogue along with the AI tutor first, then perform it again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own self-introduction',
    goals: [
      'Write 3–5 sentences in Turkish covering greeting, name, country, role, and one extra fact.',
      'Use the personal-suffix copula at least twice and at least one possessive (adım, ismim) so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Write your own self-introduction in 3–5 sentences using the model on the left, then read it aloud with correct stress and harmony.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Bey/Hanım titles, sen vs siz, and Atatürk reverence',
    goals: [
      'Use the bey (Mr.) and hanım (Ms.) titles after a given name — Ahmet Bey, Ayşe Hanım. This is the polite default for professional contexts, not family name + Mr./Ms.',
      'Switch from sen (casual) to siz (formal/respectful) when addressing elders, colleagues, customers, and anyone you don\'t already know on first-name basis.',
      'Recognize that Atatürk (the founder of the Turkish Republic) is referenced with extreme respect; criticism is socially and legally fraught — best avoided in first meetings.',
    ],
    task: 'Decide how you would address (1) a classmate named Mehmet, (2) a professor named Ayşe Yılmaz, (3) a senior researcher named Kemal Demir — give the full Turkish form for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day at Boğaziçi — in Turkish',
    goals: [
      'Combine everything from this lesson into one continuous scene with no break between greeting, introduction, question, answer, correction, and farewell.',
      'Use the correct register (formal/casual) based on the relationship; switch from sen to siz if the interlocutor is older or more senior.',
    ],
    task: 'Roleplay your first day at Boğaziçi Üniversitesi with the AI tutor playing a visiting scholar from Ankara; aim for a 6-turn exchange in Turkish.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 1: Merhaba — Greetings and Self-Introduction',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'tr',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (Merhaba / Selam / Hoşça kal / Görüşürüz) and match the register to the relationship.' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences using "Adım…" and "Ben + role + -im".' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask "Nerelisin?" or "Nereden geliyorsun?" and respond with country + -li/-lı/-lu/-lü.' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use the "X değil, Y" pattern to politely correct a wrong guess about your nationality or role.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Bu dersin hedefleri',
      'this lesson\'s goals',
      'By the end of this lesson, you can greet someone in Turkish, give your name, say where you are from, ask the same back, and farewell — all in one short conversation without pausing to think.',
      'word',
      'Functional language: selamlama (greet) · kendini tanıtma (introduce yourself) · nereli olduğunu sormak (ask origin) · olumsuzlama (negate) · vedalaşma (farewell)',
      'These five micro-skills are the spine of every social encounter in Turkish — once they\'re automatic, every later lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      'Gerçek senaryo',
      'real scenario',
      'You are at Boğaziçi Üniversitesi on your first day and a visiting scholar from Ankara turns to you in the lab. The whole encounter takes about 30 seconds and you will need every micro-skill from this lesson.',
      'word',
      'Ziyaretçi: "Merhaba! Adım Kemal. Sen nerelisin?"',
      'A typical opener from an Anatolian visiting scholar: polite Merhaba + name introduction + immediate origin question — common Turkish workplace pattern.',
      [
        { target: 'Merhaba', note: 'universal polite greeting; safe with peers, colleagues, and most professional contexts; less casual than Selam, less formal than İyi günler' },
        { target: 'Adım…', note: 'self-introduction "my name is…"; adım = ad (name) + ım (my); more concise than İsmim… which is the same pattern with isim (name)' },
        { target: 'Nerelisin?', note: 'literal "where-from-are-you?"; ner-e (where) + li (from) + sin (you-are); the standard origin question' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      'Üç saygı düzeyi',
      'three politeness levels',
      'Turkish distinguishes three rough politeness registers. Casual (peers, friends): Selam / sen / Hoşça kal. Polite (workplace, first meetings): Merhaba / sen or siz / Görüşürüz. Formal (elders, customers, ceremonies): İyi günler / siz / Hoşça kalın.',
      'word',
      'Selam (casual) · Merhaba (polite) · İyi günler (formal) — same greeting function, three social levels.',
      'Switching from sen to siz mid-conversation signals increased respect; the reverse signals familiarity.',
      [
        { target: 'CASUAL: Selam, sen', note: 'use with peers, close friends, and clearly informal settings; "Selam" is borrowed from Arabic salam but lighter in Turkish' },
        { target: 'POLITE: Merhaba, sen/siz', note: 'the safe default for first meetings, workplace, and customer-facing situations' },
        { target: 'FORMAL: İyi günler, siz', note: 'reserved for elders, senior officials, customers in formal industries, and ceremonies; time-of-day version is more formal than Merhaba' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Merhaba',
      'mer-ha-BA',
      'Three syllables, final-syllable stress, h fully voiced. English-speaker temptation is to slur to "mer-HAH-buh"; resist — keep all three vowels clean and the h crisp.',
      'word',
      'Merhaba! → mer-ha-BA (stress on final BA, h pronounced)',
      'The most heard Turkish greeting; mispronouncing it tags you as a beginner immediately.',
      [
        { target: 'mer', note: 'first syllable; clear /e/ vowel, tapped r' },
        { target: 'ha', note: 'middle syllable; h fully aspirated, /a/ open' },
        { target: 'BA', note: 'final syllable; stressed; /a/ open' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'İyi günler',
      'i-yi gün-LER',
      'Two words: "iyi" (good, EE-yee with front high i) + "günler" (days, plural of gün). Stress falls on final syllable of each word. The ü is the rounded front vowel — purse lips slightly when saying "ee".',
      'word',
      'İyi günler! → ee-YEE gün-LER (front high i + rounded ü)',
      'The formal greeting that doubles as a farewell ("good days"). Used in business, customer service, and with elders.',
      [
        { target: 'iyi', note: 'front high i, both syllables; do NOT use back ı here' },
        { target: 'günler', note: 'gün (day) + ler (PL); front-rounded vowel ü demands lip rounding' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '-im / -ım / -um / -üm',
      'four-form copula -im',
      'The first-person-singular copula has FOUR shapes by vowel harmony: -im (front-unrounded after e/i), -ım (back-unrounded after a/ı), -um (back-rounded after o/u), -üm (front-rounded after ö/ü). Same meaning "I am", four shapes.',
      'word',
      'öğrenciyim (front-unrounded) · doktorum (back-rounded) · Türküm (front-rounded) · Amerikalıyım (back-unrounded)',
      'Notice the buffer y in öğrenciyim and Amerikalıyım: vowel-final root + vowel-initial suffix triggers y insertion.',
      [
        { target: 'öğrenci + -y-im → öğrenciyim', note: 'student-I am; root ends in vowel → buffer y → -im (front-unrounded i)' },
        { target: 'doktor + -um → doktorum', note: 'doctor-I am; root ends in consonant → -um (back-rounded after o)' },
        { target: 'Türk + -üm → Türküm', note: 'Turkish-I am; root vowel ü → -üm (front-rounded)' },
        { target: 'Amerikalı + -y-ım → Amerikalıyım', note: 'American-I am; root vowel ı → -ım (back-unrounded), with buffer y' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'Hoşça kal',
      'hosh-CHA KAL',
      'Two-word casual farewell, literally "stay nicely". Sen-form (kal); plural/formal is "Hoşça kalın". The ş is "sh" and ç is "ch" — two distinct letters.',
      'word',
      'Hoşça kal! (sen, casual) vs Hoşça kalın! (siz, polite/formal)',
      'The standard polite farewell; matches the Merhaba register.',
      [
        { target: 'hoşça', note: 'hoş (nice) + ça (adverbial); pronounced "hosh-CHA"' },
        { target: 'kal', note: 'verb stem "stay"; imperative form; sen-form has no suffix' },
        { target: 'kalın', note: 'imperative plural/formal; sen → kal vs siz → kalın' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'Nerelisin?',
      'ne-re-li-SİN?',
      'A single agglutinated word: ner-e (where) + li (from) + sin (you-are). Final-syllable stress. The question has NO question particle because nereli already encodes the question.',
      'word',
      'Sen nerelisin? (Where are you from? — casual)\nSiz nerelisiniz? (Where are you from? — formal/plural)',
      'The standard origin question; uses the personal-suffix copula -sin/-sın/-sun/-sün for "you are".',
      [
        { target: 'ner-', note: 'wh-stem "where"' },
        { target: '-e-li', note: 'a buffer + the "from" suffix' },
        { target: '-sin', note: 'second-person singular copula; matches front-unrounded vowels in stem' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('Merhaba', 'mer-ha-BA', 'Universal polite greeting; safe with peers, colleagues, and most professional contexts; less casual than Selam, less formal than İyi günler. The default first-meeting greeting in any setting where you do not already know the register.', 'word', 'Merhaba! Adım Ayşe.', 'Standard polite opener paired with a self-introduction; a typical first turn in any conversation.', null, [ACT.vocabularyGreetings]),
    createContentItem('Selam', 'se-LAM', 'Casual greeting borrowed from Arabic salam, used among friends, peers, and family — equivalent to English "hi". Not appropriate with elders, customers, or anyone significantly senior in a formal setting. Common in messaging and youthful speech.', 'word', 'Selam! Nasılsın?', 'Friend-to-friend opener; "Nasılsın?" means "how are you?"', null, [ACT.vocabularyGreetings]),
    createContentItem('İyi günler', 'i-yi gün-LER', 'Polite-to-formal time-of-day greeting and farewell ("good days"). Used from late morning until evening in workplaces, shops, and with elders. Doubles as a polite farewell when leaving — a unique feature of Turkish greetings.', 'word', 'İyi günler, Ahmet Bey.', 'Polite greeting to a senior colleague using given name + Bey title.', null, [ACT.vocabularyGreetings]),
    createContentItem('Günaydın', 'gün-ay-DIN', 'Polite morning greeting used roughly from sunrise to 10 AM. Literally "good light/day". More common in workplaces, classrooms, and broadcasts than "İyi sabahlar" (good mornings), which is also valid but feels more formal.', 'word', 'Günaydın, hocam!', 'Polite morning greeting to a teacher; "hocam" (my teacher) is a warm respectful form.', null, [ACT.vocabularyGreetings]),
    createContentItem('İyi akşamlar', 'i-yi ak-şam-LAR', 'Polite-to-formal evening greeting used after sunset. Plural form ("good evenings") — Turkish greetings often use the plural for politeness. Like İyi günler, doubles as a farewell when leaving.', 'word', 'İyi akşamlar, hoş geldiniz.', 'Polite evening greeting to a guest combined with "welcome" (hoş geldiniz).', null, [ACT.vocabularyGreetings]),
    createContentItem('İyi geceler', 'i-yi ge-je-LER', 'Polite goodnight/late-evening farewell ("good nights"). Used both as a parting and before sleeping. Not a greeting — never use to open a conversation.', 'word', 'İyi geceler, yarın görüşürüz.', 'Polite night farewell paired with "see you tomorrow".', null, [ACT.vocabularyGreetings]),
    createContentItem('Hoş geldiniz', 'hosh GEL-di-niz', 'Formal welcome ("you came nicely") said to guests entering your home, shop, or office. Standard response: "Hoş bulduk" ("we found nicely"). One of the most ritualized exchanges in Turkish hospitality culture.', 'word', 'Hoş geldiniz, buyurun, oturun lütfen.', 'Standard host phrase: welcome + please + sit down.', null, [ACT.vocabularyGreetings]),
    createContentItem('Hoş bulduk', 'hosh bul-DUK', 'The ritual response to Hoş geldiniz ("we found nicely"). Used by guests entering. Pair memorization with Hoş geldiniz — they always come together.', 'word', '— Hoş geldiniz! — Hoş bulduk!', 'Host-guest pair; the guest is expected to say this in response, not "thank you".', null, [ACT.vocabularyGreetings]),
    createContentItem('Tanıştığımıza memnun oldum', 'ta-nısh-tı-ı-mı-za mem-NUN ol-dum', 'Standard polite first-meeting phrase ("I became pleased at our meeting"). Long but high-frequency; used in almost every register from polite to formal. Casual variant: "Memnun oldum" alone.', 'word', 'Tanıştığımıza memnun oldum, Ayşe Hanım.', 'Combines the first-meeting acknowledgment with the given name + Hanım honorific.', null, [ACT.vocabularyGreetings]),
    createContentItem('Nasılsın?', 'na-SIL-sın', 'Casual "how are you?" in the sen form. Standard reply: "İyiyim, teşekkür ederim, sen?" (I\'m well, thanks, you?). Plural/formal version: "Nasılsınız?". Less ritualized than English; can be a real question among close friends.', 'word', 'Nasılsın? — İyiyim, teşekkür ederim, sen?', 'Standard everyday exchange; both turns are formulaic and quick.', null, [ACT.vocabularyGreetings]),
    createContentItem('Hoşça kal', 'hosh-CHA kal', 'Casual farewell ("stay nicely") in the sen form. Plural/formal: "Hoşça kalın". Said by the leaving person; the staying person responds with "Güle güle" (smiling-smiling, "go smiling").', 'word', '— Hoşça kal! — Güle güle!', 'Leaver-stayer farewell pair; both halves are required for politeness.', null, [ACT.vocabularyGreetings]),
    createContentItem('Görüşürüz', 'gö-rü-şü-RÜZ', 'Casual-to-polite "see you" (literally "we will see each other"). Variants: "Yarın görüşürüz" (see you tomorrow), "Sonra görüşürüz" (see you later). Slightly warmer than plain "Hoşça kal".', 'word', 'Görüşürüz! Yarın aynı saatte.', 'Brief expectation-setting close; common when leaving a daily-meeting context.', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People, roles, nationalities
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ben', 'BEN', 'First-person singular pronoun "I". Unlike English, often DROPPED because the personal-suffix copula already marks first person ("Öğrenciyim" = "(I) am a student"). Keeping "ben" adds emphasis or contrast.', 'word', 'Ben öğrenciyim. (or just: Öğrenciyim.)', 'Two equivalent self-introductions; the second is more natural in flow, the first is emphatic.', null, [ACT.vocabularyPeople]),
    createContentItem('sen', 'SEN', 'Second-person singular pronoun "you" — used for casual address to peers, friends, and equals. Avoid with elders, senior officials, or in customer-facing roles — use siz instead.', 'word', 'Sen Japon musun?', 'Casual question about nationality using sen + the -mı/-mi/-mu/-mü question particle.', null, [ACT.vocabularyPeople]),
    createContentItem('siz', 'SİZ', 'Second-person pronoun used for BOTH plural-you AND formal-singular-you (like French vous, German Sie). For a single elder/superior, siz signals respect; for multiple people, siz is the only option.', 'word', 'Siz Türk müsünüz?', 'Formal "are you Turkish?" — appropriate when addressing someone you don\'t know well.', null, [ACT.vocabularyPeople]),
    createContentItem('o', 'O', 'Third-person singular pronoun — works for he, she, and it. Turkish has NO grammatical gender; one pronoun covers all three.', 'word', 'O benim arkadaşım.', '"He/She is my friend." — gender is inferred from context, not pronoun.', null, [ACT.vocabularyPeople]),
    createContentItem('biz', 'BİZ', 'First-person plural pronoun "we". Often dropped because the copula -iz/-ız/-uz/-üz marks first-person plural ("Öğrenciyiz" = "we are students").', 'word', 'Biz öğrenciyiz.', 'Group self-identification; "Öğrenciyiz" alone (no biz) is more natural.', null, [ACT.vocabularyPeople]),
    createContentItem('onlar', 'on-LAR', 'Third-person plural pronoun "they". The plural marker -lar attaches to the singular o. No gender distinction; covers male, female, and mixed groups.', 'word', 'Onlar Türk öğrenciler.', '"They are Turkish students." — plural noun also takes -ler.', null, [ACT.vocabularyPeople]),
    createContentItem('ad / isim', 'AD / i-SİM', 'Two near-synonyms for "name". ad is more colloquial and Turkic; isim is more formal and Arabic-origin. The first-person possessive forms are adım (my name) and ismim (my name). Both common.', 'word', 'Adım Mehmet. / İsmim Mehmet.', 'Two equivalent ways to give your name; adım is slightly warmer, ismim slightly more formal.', null, [ACT.vocabularyPeople]),
    createContentItem('soyad', 'soy-AD', 'Family name / surname. Turkish surnames were introduced by law in 1934 under Atatürk\'s reforms; before that, Turks used given name + father\'s name. Soyad always comes AFTER given name (Mehmet Yılmaz).', 'word', 'Adım Mehmet, soyadım Yılmaz.', 'Standard formal self-introduction: given name + family name.', null, [ACT.vocabularyPeople]),
    createContentItem('Bey', 'BEY', 'Honorific title for men, placed AFTER the given name (Ahmet Bey = "Mr. Ahmet"). Unlike English Mr. + family name, Turkish uses given name + Bey. Default polite form in professional settings.', 'word', 'Ahmet Bey, hoş geldiniz.', 'Polite welcome using given name + Bey honorific; the default professional form.', null, [ACT.vocabularyPeople]),
    createContentItem('Hanım', 'ha-NIM', 'Honorific title for women, placed AFTER the given name (Ayşe Hanım = "Ms. Ayşe"). Marital status is NOT encoded — modern safe default for any adult woman in formal contexts.', 'word', 'Ayşe Hanım benim öğretmenim.', '"Ms. Ayşe is my teacher" — formal reference using given name + Hanım.', null, [ACT.vocabularyPeople]),
    createContentItem('öğretmen', 'öy-RET-men', 'Teacher. Common in primary and secondary education. For university, "profesör" or "hoca" is more typical. "öğretmen" + im (my) = "öğretmenim" (my teacher).', 'word', 'O benim öğretmenim.', 'Standard role description; "öğretmen" can be used as an address form ("Öğretmenim!") in school.', null, [ACT.vocabularyPeople]),
    createContentItem('hoca', 'HO-ja', 'A warm, respectful term for "teacher" or "professor", with religious/scholarly origins. Used widely from primary through university. "Hocam" (my teacher) is the standard student-to-professor address — much warmer than English "professor".', 'word', 'Hocam, bir sorum var.', '"Teacher, I have a question." — common in university classrooms.', null, [ACT.vocabularyPeople]),
    createContentItem('profesör', 'pro-fe-SÖR', 'Professor — used for university faculty with full professorial rank. More formal than hoca; reserved for full professors and senior academics. Title prefix: "Prof. Dr. Yılmaz".', 'word', 'Profesör Yılmaz ders veriyor.', '"Professor Yılmaz is teaching" — formal academic reference.', null, [ACT.vocabularyPeople]),
    createContentItem('öğrenci', 'öy-REN-ji', 'Student (at any level). Vowel-final root, so the personal-suffix copula adds buffer y: öğrenci + y + im → öğrenciyim ("I am a student"). The most common role self-identifier in academic contexts.', 'word', 'Boğaziçi\'nde öğrenciyim.', '"I am a student at Boğaziçi (University)." — uses locative -de/-da.', null, [ACT.vocabularyPeople]),
    createContentItem('mühendis', 'mü-hen-DİS', 'Engineer (any discipline). The ü demands lip rounding; do not anglicize to "mu-HEN-dis". Compound: "yazılım mühendisi" (software engineer), "makine mühendisi" (mechanical engineer).', 'word', 'O yazılım mühendisi.', '"He/she is a software engineer" — yazılım = software.', null, [ACT.vocabularyPeople]),
    createContentItem('doktor', 'dok-TOR', 'Doctor (medical) — also used as a title before a name: Dr. Yılmaz. For PhDs, the same word is used ("doktor" of physics). Personal-suffix copula: doktorum (I am a doctor).', 'word', 'Annem doktor.', '"My mother is a doctor" — annem (my mother) + zero-copula (3rd person can drop).', null, [ACT.vocabularyPeople]),
    createContentItem('Türk', 'TÜRK', 'Turkish (person). For nationality, two patterns exist: (1) Türk (a Turk, citizenship/ethnicity) or (2) Türkiyeli (from Turkey, geographic). For self-introduction, "Türküm" (I am Turkish) is the standard.', 'word', 'Ben Türküm, İstanbul\'danım.', '"I am Turkish, I am from Istanbul" — combines nationality with city ablative.', null, [ACT.vocabularyPeople]),
    createContentItem('Amerikalı', 'a-me-ri-ka-LI', 'American — formed by Amerika (country) + -lı (from/of). The -li/-lı/-lu/-lü suffix is the universal "from/of" derivation for places. Note buffer -y- before vowel-initial copula: Amerikalıyım.', 'word', 'Amerikalıyım, Boston\'danım.', '"I am American, from Boston." — country + -lı + first-person copula.', null, [ACT.vocabularyPeople]),
    createContentItem('İngiliz', 'in-gi-LİZ', 'English / British person — note: "İngiliz" is the established word, NOT formed with -li suffix. Used for citizens of the UK as a whole, with regional variants (İskoç=Scottish, İrlandalı=Irish).', 'word', 'İngilizim, Londra\'danım.', '"I am English, from London." — note the apostrophe before case suffix on proper noun.', null, [ACT.vocabularyPeople]),
    createContentItem('Japon', 'ja-PON', 'Japanese person — borrowed from European. Personal-suffix copula: Japonum (I am Japanese, back-rounded after o).', 'word', 'O Japon mu? Hayır, Çinli.', '"Is he Japanese? No, Chinese." — using the -mu question particle (back-rounded harmony).', null, [ACT.vocabularyPeople]),
    createContentItem('Çinli', 'CHİN-li', 'Chinese person — Çin (China) + -li (from). The standard pattern for nationalities derived from country names.', 'word', 'Benim arkadaşım Çinli.', '"My friend is Chinese" — using benim (my, genitive) + possessive arkadaşım (my friend).', null, [ACT.vocabularyPeople]),
    createContentItem('Koreli', 'ko-re-Lİ', 'Korean person — Kore (Korea) + -li. The same country+-li pattern.', 'word', 'Annem Koreli, babam Türk.', '"My mother is Korean, my father is Turkish." — mixed-nationality common in modern Turkey.', null, [ACT.vocabularyPeople]),
    createContentItem('Nijeryalı', 'ni-jer-ya-LI', 'Nigerian — Nijerya (Nigeria) + -lı (back-unrounded after a). Final -ya gets buffer treatment in some agglutinations.', 'word', 'O Nijeryalı bir mühendis.', '"He is a Nigerian engineer." — bir (a) is the indefinite article.', null, [ACT.vocabularyPeople]),
    createContentItem('Endonezyalı', 'en-do-nez-ya-LI', 'Indonesian — Endonezya (Indonesia) + -lı. Country + -li pattern with back vowels.', 'word', 'Endonezyalı arkadaşım Jakarta\'da yaşıyor.', '"My Indonesian friend lives in Jakarta." — yaşa- (to live) + locative.', null, [ACT.vocabularyPeople]),
    createContentItem('Filipinli', 'fi-li-PİN-li', 'Filipino — Filipin (Philippines) + -li. Note the Turkish form drops the final -es and adds the -li suffix.', 'word', 'Arkadaşım Filipinli.', '"My friend is Filipino" — standard country+-li pattern.', null, [ACT.vocabularyPeople]),
    createContentItem('Vietnamlı', 'vi-yet-NAM-lı', 'Vietnamese — Vietnam + -lı. Back-vowel harmony in the suffix.', 'word', 'Vietnamlı bir öğrenci.', '"A Vietnamese student" — using bir for indefinite.', null, [ACT.vocabularyPeople]),
    createContentItem('arkadaş', 'ar-ka-DASH', 'Friend. Vowel harmony: arkadaş is back-vowel root, takes -lar plural (arkadaşlar). Possessive: arkadaşım (my friend).', 'word', 'Arkadaşım Ahmet, İstanbul\'da yaşıyor.', '"My friend Ahmet lives in Istanbul." — common framing for introducing a third person.', null, [ACT.vocabularyPeople]),
    createContentItem('öğretim üyesi', 'öy-re-tim ü-ye-Sİ', 'Faculty member / academic staff (literally "teaching member"). Formal term for university teaching positions. Used in academic CVs and formal references.', 'word', 'Boğaziçi\'nde öğretim üyesiyim.', '"I am a faculty member at Boğaziçi." — formal academic self-introduction.', null, [ACT.vocabularyPeople]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: Personal-suffix copula
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Kişi ekleri',
      'personal-suffix copula',
      'Turkish has NO separate "to be" verb. Instead, person-marked SUFFIXES attach to the predicate (noun or adjective). Each person has its own suffix shape, and each shape obeys vowel harmony. This is one of the most distinctive features of Turkish.',
      'sentence',
      'BEN: -im / -ım / -um / -üm — Öğrenciyim, Doktorum, Türküm, Amerikalıyım.\nSEN: -sin / -sın / -sun / -sün — Öğrencisin, Doktorsun, Türksün.\nO: (zero) or -dir — Öğrenci(dir), Doktor(dur), Türk(tür).\nBİZ: -iz / -ız / -uz / -üz — Öğrenciyiz, Doktoruz, Türküz.\nSİZ: -siniz / -sınız / -sunuz / -sünüz — Öğrencisiniz, Doktorsunuz, Türksünüz.\nONLAR: -ler / -lar (or zero) — Öğrenciler, Doktorlar, Türkler.',
      'Six persons × four harmony shapes = 24 forms total, but the rule is mechanical: pick the right person row, then pick the right harmony column.',
      [
        { target: 'BEN row', note: '-im/-ım/-um/-üm; example: öğrenciyim' },
        { target: 'SEN row', note: '-sin/-sın/-sun/-sün; example: öğrencisin' },
        { target: 'O row', note: 'zero (everyday) or -dir/-dır/-dur/-dür (formal); example: öğrenci or öğrencidir' },
        { target: 'BİZ row', note: '-iz/-ız/-uz/-üz; example: öğrenciyiz' },
        { target: 'SİZ row', note: '-siniz/-sınız/-sunuz/-sünüz; example: öğrencisiniz' },
      ],
      [ACT.grammarCopula],
    ),
    createContentItem(
      'Tampon -y-',
      'buffer y',
      'When a vowel-final predicate meets a vowel-initial copula suffix, Turkish inserts a buffer -y- to keep vowels separate. Common in öğrenci + im → öğrenciyim, Türkiyeli + im → Türkiyeliyim.',
      'sentence',
      'öğrenci (ends in i) + im → öğrenci-y-im = öğrenciyim.\nAmerikalı (ends in ı) + ım → Amerikalı-y-ım = Amerikalıyım.\nNijeryalı (ends in ı) + ım → Nijeryalı-y-ım = Nijeryalıyım.',
      'No diphthongs in Turkish: the buffer y is automatic when two vowels would otherwise meet.',
      null,
      [ACT.grammarCopula],
    ),
    createContentItem(
      'Soru eki',
      'question particle',
      'Form a yes/no question by adding the four-form question particle -mı/-mi/-mu/-mü (note: written as a SEPARATE word from the predicate, but harmony-bound to it). The particle takes its own personal-suffix copula: "Öğrenci misin?" (Are you a student?).',
      'sentence',
      'Öğrenci misin? (Are you a student? — sen)\nÖğretmen misiniz? (Are you a teacher? — siz)\nTürk müyüz? (Are we Turkish? — biz)\nAmerikalı mıyım? (Am I American? — ben)',
      'Note the particle stands alone in writing (with a space), but vowel-harmonizes with the previous word.',
      [
        { target: 'mı (after a/ı)', note: 'back-unrounded — Amerikalı mı?' },
        { target: 'mi (after e/i)', note: 'front-unrounded — Öğrenci mi?' },
        { target: 'mu (after o/u)', note: 'back-rounded — Doktor mu?' },
        { target: 'mü (after ö/ü)', note: 'front-rounded — Türk mü?' },
      ],
      [ACT.grammarCopula],
    ),
    createContentItem(
      'Soru kelimeleri',
      'question words',
      'Information questions use a question word in the position of the unknown — Turkish does NOT move the question word to the front like English. Order stays subject-object-verb.',
      'sentence',
      'Adın ne? (Your-name what? = What is your name?)\nNerelisin? (Where-from-are-you? = Where are you from?)\nMesleğin ne? (Your profession what? = What is your job?)',
      'Same word order as a statement; only the wh-word replaces the unknown.',
      [
        { target: 'ne', note: 'what; "Adın ne?" — predicate position' },
        { target: 'nereli', note: 'from where; "Nerelisin?" — agglutinated with -li and -sin' },
        { target: 'kim', note: 'who; "Kimsin?" — "Who are you?"' },
        { target: 'kaç', note: 'how many; "Kaç yaşındasın?" — "How old are you?"' },
      ],
      [ACT.grammarCopula],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Pronouns + dropping
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Şahıs zamirleri',
      'personal pronouns',
      'Turkish has 6 personal pronouns. No gender distinction in 3rd person (o = he/she/it). siz covers both formal-singular and plural. Pronouns are OFTEN DROPPED because the copula already marks person.',
      'sentence',
      'ben (I) · sen (you-casual) · o (he/she/it) · biz (we) · siz (you-plural/formal) · onlar (they)',
      'Same form for subject and object — case suffixes (beni, bana, sende, etc.) mark function.',
      null,
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'Zamir düşmesi',
      'pronoun-dropping',
      'Because the personal-suffix copula marks person, the pronoun is usually OPTIONAL — and dropping it sounds more natural. Including the pronoun adds emphasis or contrast.',
      'sentence',
      'NORMAL: Öğrenciyim. (I am a student.)\nEMPHATIC: Ben öğrenciyim. (I — as opposed to you — am a student.)',
      'A native-sounding Turkish speaker drops most pronouns; over-using "ben" sounds learner-y.',
      [
        { target: 'Öğrenciyim.', note: 'natural: "(I) am a student."' },
        { target: 'Ben öğrenciyim.', note: 'emphatic: "I am a student" (as opposed to someone else)' },
      ],
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'sen vs siz',
      'sen vs siz',
      'sen (singular casual) vs siz (singular formal OR plural). The most important social marker in Turkish address. Using sen with a stranger or elder reads as rude; using siz with a close peer reads as cold.',
      'sentence',
      'sen: Selam Mehmet, nasılsın?\nsiz: Merhaba Profesör Yılmaz, nasılsınız?',
      'Same meaning ("you"), two registers. Watch for the cue the other person sends and match it.',
      null,
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'İyelik ekleri',
      'possessive suffixes',
      'Possession is marked by suffixes on the possessed noun: adım (my name), adın (your name), adı (his/her name), adımız (our name), adınız (your name), adları (their name). Note: adı, NOT adımı (with accusative).',
      'sentence',
      'ad (name) → adım (my name), adın (your name), adı (his/her name), adımız (our name), adınız (your-PL name), adları (their name)',
      'The possessive system is a workhorse — it appears in every personal-information exchange.',
      [
        { target: '-(I)m / -(I)n / -(s)I / -(I)mIz / -(I)nIz / -lArI', note: 'six person-marked possessive forms; each obeys 4-way harmony' },
        { target: 'adım vs ismim', note: 'two synonyms with the same -im suffix; both mean "my name"' },
      ],
      [ACT.grammarPronouns],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Negation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'değil',
      'değil — copular negation',
      'For noun and adjective predicates, negation is the SEPARATE WORD "değil" placed after the predicate. Then the personal-suffix copula attaches to değil, not to the predicate: "Öğrenci değilim" (I am not a student).',
      'sentence',
      'Türk değilim. (I am not Turkish.)\nÖğrenci değilsin. (You are not a student.)\nDoktor değil. (He/She is not a doctor.)',
      'değil never changes form for harmony (always front-unrounded -e- and -i-); only the copula on it changes.',
      [
        { target: 'değilim (I am not)', note: 'değil + -im first-person' },
        { target: 'değilsin (you are not)', note: 'değil + -sin second-person' },
        { target: 'değil(dir) (he/she/it is not)', note: 'değil + zero or -dir third-person' },
        { target: 'değiliz (we are not)', note: 'değil + -iz first-plural' },
        { target: 'değilsiniz (you-PL/formal are not)', note: 'değil + -siniz second-plural' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'değil vs -mE-',
      'değil vs -mE-',
      'CRITICAL DISTINCTION: değil negates NOUN/ADJECTIVE predicates; the -mE- (-me-/-ma-) suffix negates VERBS. Mixing them is a beginner error.',
      'sentence',
      'NOUN: Öğrenci değilim. (I am not a student.)\nVERB: Gelmiyorum. (I am not coming.)',
      'değil for "to be"; -me-/-ma- for action verbs. Both obey harmony.',
      [
        { target: 'NOUN/ADJ negation → değil', note: 'separate word after predicate; takes the copula' },
        { target: 'VERB negation → -mE- suffix', note: 'inserted between root and tense; "gel-mi-yor-um" (I am not coming)' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'X değil, Y düzeltmesi',
      'X değil, Y correction pattern',
      'The standard polite pattern for correcting someone\'s wrong guess: "X değil, Y" (not X, but Y). Three parts: denial (X değil), comma, then the correct item (Y). Skipping any part makes the correction sound abrupt.',
      'sentence',
      'A: Japon musun? — B: Japon değilim, Koreliyim.',
      'The three-part rhythm is what makes the correction feel natural rather than blunt.',
      [
        { target: 'X değilim (denial)', note: '"I am not X"; opens the correction politely' },
        { target: 'Y-im (offered alternative)', note: 'closes the loop and gives the asker the right answer' },
      ],
      [ACT.grammarNegation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Kendini tanıtma',
      'self-introduction',
      'A complete five-sentence self-introduction in Turkish. Read aloud with correct vowel harmony, ğ-lengthening, and final-syllable stress. Notice the parallel structure: many sentences use the personal-suffix copula.',
      'sentence',
      'Merhaba! Adım Sara, Amerikalıyım. Boğaziçi Üniversitesi\'nde öğrenciyim, bilgisayar mühendisliği okuyorum. Tanıştığımıza memnun oldum.',
      'Translation: "Hello! My name is Sara, I am American. I am a student at Boğaziçi University, I study Computer Engineering. Nice to meet you."',
      [
        { target: 'Adım Sara', note: 'name introduction using adım (my name); warmer than ismim' },
        { target: 'Amerikalıyım', note: 'nationality using country + -lı + buffer y + -ım copula' },
        { target: 'Boğaziçi Üniversitesi\'nde', note: 'flagship Istanbul university; apostrophe before case suffix on proper noun + locative -de' },
        { target: 'okuyorum', note: 'oku- (to read/study) + -yor (present continuous) + -um (I); "I study"' },
        { target: 'Tanıştığımıza memnun oldum', note: 'standard polite closing of a first-meeting introduction' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'Anlama soruları',
      'comprehension questions',
      'Four standard comprehension questions matching the paragraph. Answer each in a short sentence; full sentences are not required for natural Turkish.',
      'sentence',
      'Q1: Adın ne? Q2: Nerelisin? Q3: Öğrenci misin? Q4: Ne okuyorsun?',
      'Four question types: name, origin, yes/no, content question.',
      [
        { target: 'A1: Adım Sara.', note: 'name answer using adım + first name' },
        { target: 'A2: Amerikalıyım.', note: 'country+-li+copula nationality answer' },
        { target: 'A3: Evet, öğrenciyim.', note: 'short positive answer; copula carries the meaning' },
        { target: 'A4: Bilgisayar mühendisliği.', note: 'short answer drops the verb; full sentence also fine' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'İlk tanışma (sohbet — kibar)',
      'first meeting (dialogue — polite)',
      'A natural polite-register first-meeting conversation between two students at Boğaziçi. Covers all the patterns from this lesson: greetings, names, origins, roles, agreements, and farewells.',
      'conversation',
      'A: Merhaba! Tanıştığımıza memnun oldum. Adım Mehmet.\nB: Merhaba Mehmet! Adım Sara. Ben de memnun oldum.\nA: Nerelisin?\nB: Amerikalıyım. Sen?\nA: Türküm, İstanbul\'luyum. Sen burada öğrenci misin?\nB: Evet, Boğaziçi\'nde bilgisayar mühendisliği okuyorum. Sen?\nA: Ben de aynı bölümdeyim! Ne tesadüf.\nB: Görüşmek üzere o zaman, derste görüşürüz!',
      'A natural exchange between peers using polite-but-casual register — the default for student-age interactions at Boğaziçi.',
      [
        { target: 'Tanıştığımıza memnun oldum', note: 'first-meeting polite phrase; appears in both speakers\' openings' },
        { target: 'Sen?', note: 'standard "return the question" — "and you?" in casual register' },
        { target: 'İstanbul\'luyum', note: '"I am from Istanbul" — city + -lu (back-rounded due to "u" in Istanbul) + buffer y + -um' },
        { target: 'Ben de', note: '"me too" — pronoun + de (also); de is also a stand-alone conjunction' },
        { target: 'Ne tesadüf', note: '"what a coincidence!" — common reaction expression' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      'İlk tanışma (sohbet — resmi)',
      'first meeting (dialogue — formal)',
      'A formal first-meeting conversation suitable for academic or professional contexts. Notice the formal vocabulary: siz, Bey/Hanım, full sentences, deliberate phrasing.',
      'conversation',
      'Öğrenci: Profesör Yılmaz, merhabalar. Adım Sara Kim. Tanıştığımıza çok memnun oldum.\nProfesör: Merhaba Sara Hanım. Boğaziçi\'ne hoş geldiniz. Lütfen oturun.\nÖğrenci: Teşekkür ederim. Bu dönem dersinizi almak benim için büyük bir onur.\nProfesör: Memnuniyetle. Siz nerelisiniz?\nÖğrenci: Amerikalıyım, Boston\'danım.\nProfesör: Çok güzel. Burada başarılı bir dönem geçirmenizi dilerim.\nÖğrenci: Teşekkür ederim, profesörüm.',
      'Same information as the polite version but with formal phrasing throughout — appropriate for hierarchical (student-professor) relationships.',
      [
        { target: 'Profesör Yılmaz, merhabalar', note: '"merhabalar" is the plural-for-politeness form of merhaba; signals respect' },
        { target: 'Sara Hanım', note: 'professor uses given name + Hanım honorific — the standard formal address form' },
        { target: 'siz nerelisiniz', note: 'siz + -siniz form; both pronoun and copula are formal/plural' },
        { target: 'profesörüm', note: '"my professor" — possessive form used as address; very warm and respectful' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Yazma şablonu',
      'writing template',
      'A reusable five-sentence template for any Turkish self-introduction. Fill in the bracketed slots with your own information — the structure carries the rest.',
      'sentence',
      'Merhaba! Adım [İSİM]. [MİLLİYET]lıyım/-liyim/-luyum/-lüyüm. Boğaziçi\'nde [BÖLÜM] okuyorum. [BİR EK BİLGİ]. Tanıştığımıza memnun oldum.',
      'Five sentences cover the core: greeting, name, nationality, role/major, personal fact, closing — the minimum complete self-introduction.',
      [
        { target: '[İSİM]', note: 'your name — given name only for casual, given + family for formal' },
        { target: '[MİLLİYET]', note: 'country + -li/-lı/-lu/-lü (harmony-matching), then buffer y + copula -im/-ım/-um/-üm' },
        { target: '[BÖLÜM]', note: 'your major or department: bilgisayar mühendisliği, edebiyat, tarih, vb.' },
        { target: '[BİR EK BİLGİ]', note: 'something specific that distinguishes you (hobby, hometown, favorite thing); avoid generic facts' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      'Yazma alıştırması',
      'writing exercise',
      'Write your own 3–5 sentence self-introduction in Turkish using the template. Use the personal-suffix copula at least twice and at least one possessive (adım, ismim) so the writing demonstrates the core grammar of this lesson.',
      'sentence',
      'Örnek: Merhaba! Adım Kim Ji-su. Koreliyim. Boğaziçi\'nde Türk dili ve edebiyatı okuyorum. Müzik dinlemeyi ve gitar çalmayı seviyorum. Tanıştığımıza memnun oldum!',
      'Translation: "Hello! My name is Kim Ji-su. I am Korean. I study Turkish language and literature at Boğaziçi. I like listening to music and playing guitar. Nice to meet you!"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'İsim + Bey/Hanım',
      'name + Bey/Hanım',
      'In Turkish, professional politeness uses GIVEN NAME + Bey (Mr.) or Hanım (Ms.) — opposite of the English Mr./Ms. + family name pattern. Ahmet Bey, Ayşe Hanım — the given name comes FIRST.',
      'sentence',
      'Ahmet Bey, hoş geldiniz. Ayşe Hanım, bu Sara, Amerika\'dan.',
      'In Turkey, calling a colleague "Mr. Yılmaz" sounds clinical; "Ahmet Bey" is the warm professional form.',
      [
        { target: 'Bey (men)', note: 'after given name; Ahmet Bey, Mehmet Bey, Kemal Bey' },
        { target: 'Hanım (women)', note: 'after given name; Ayşe Hanım, Zeynep Hanım, Fatma Hanım' },
        { target: 'No marital marker', note: 'unlike English Mrs./Miss, Hanım does NOT encode marital status — used freely' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'hoca / hocam',
      'hoca / hocam',
      'In academic and many professional contexts, "hoca" (teacher) is used as a warm form of address — from elementary school through university. "Hocam" (my teacher) is the standard student-to-professor address — much warmer than calling someone "Professor" or "Yılmaz Bey".',
      'sentence',
      'Hocam, bir sorum var. (Teacher, I have a question.)',
      'Even non-religious contexts use hoca: a music teacher, a sports coach, a senior colleague — all can be called hoca.',
      null,
      [ACT.culture],
    ),
    createContentItem(
      'sen vs siz seçimi',
      'sen vs siz choice',
      'sen for: close peers, friends, family, children, anyone clearly junior or familiar. siz for: elders, strangers, customers, professors, anyone you don\'t already know on first-name basis. When in doubt, START with siz — escalation from siz to sen is normal, the reverse signals disrespect.',
      'sentence',
      'Sen: Selam Mehmet, nasılsın? (with a peer)\nSiz: Merhaba Profesör Yılmaz, nasılsınız? (with a professor)',
      'In Turkish corporate culture, even longtime colleagues may keep siz until explicitly invited to switch.',
      [
        { target: 'Start with siz', note: 'safer default with anyone unfamiliar; escalation to sen is by invitation' },
        { target: 'Switch on invitation', note: '"Bana sen diyebilirsin" (you can call me sen) — explicit permission' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Atatürk\'e saygı',
      'reverence for Atatürk',
      'Mustafa Kemal Atatürk (1881-1938), founder of the Turkish Republic, is referred to with extreme respect. His portrait is in every public office and classroom; criticism is socially fraught and legally prosecutable under Law No. 5816. In first meetings, avoid political commentary; treat Atatürk and Turkish republican history as sensitive ground.',
      'sentence',
      'Atatürk Türk milletinin önderidir. (Atatürk is the leader of the Turkish nation.)',
      'In casual first meetings, default to neutral or positive framing of Turkish history. Avoid hot topics: Armenian question, Kurdish question, secular vs religious tension.',
      [
        { target: 'Atatürk', note: 'literally "father of the Turks"; only one person ever held this title' },
        { target: '29 Ekim Cumhuriyet Bayramı', note: 'Republic Day — national holiday for the founding of the Republic (1923)' },
        { target: '10 Kasım', note: 'November 10 — anniversary of Atatürk\'s death; a minute of silence is observed nationwide at 9:05 AM' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Görev: Boğaziçi\'nde ilk gün',
      'task: first day at Boğaziçi',
      'Roleplay your first day at Boğaziçi Üniversitesi with the AI tutor playing a friendly visiting scholar from Ankara. Use every skill from this lesson in one continuous scene — greet, introduce, ask, answer, farewell.',
      'conversation',
      '[Laboratuvar, Boğaziçi Üniversitesi]\nZiyaretçi: Merhaba! Tanıştığımıza memnun oldum. Adım Kemal Demir.\nSen: [selamlama + kendini tanıtma]\nZiyaretçi: Nerelisin?\nSen: [ülke/şehir]\nZiyaretçi: Sen burada öğrenci misin?\nSen: [evet + bölümün]\nZiyaretçi: Ah, çok güzel. Ne okuyorsun?\nSen: [cevap]\nZiyaretçi: Tanıştığımıza çok memnun oldum!\nSen: [vedalaşma]',
      'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: 'selamlama', note: 'Merhaba / Selam / İyi günler — pick the register that matches the scholar\'s opening' },
        { target: 'kendini tanıtma', note: 'Adım… / İsmim… + nationality + -lı/-li-yım/-im' },
        { target: 'ülke', note: 'country + -li/-lı/-lu/-lü-y-ım pattern: Amerikalıyım, Koreliyim' },
        { target: 'bölüm', note: 'bilgisayar mühendisliği / tarih / edebiyat / vb.' },
        { target: 'vedalaşma', note: 'Hoşça kalın / Görüşürüz / İyi günler — match the register you opened with' },
      ],
      [ACT.task],
    ),
    createContentItem(
      'Meydan okuma — varsayımı düzelt',
      'challenge — correct an assumption',
      'Stretch goal: in the same scene, the visiting scholar guesses your country incorrectly. Politely correct using the "X değil, Y" pattern. Closes the loop without making the asker lose face.',
      'conversation',
      'Ziyaretçi: Ah, sen Japon musun?\nSen: Hayır, Japon değilim. Koreliyim, Seul\'lüyüm.\nZiyaretçi: Affedersin, yanlış tahmin ettim!\nSen: Önemli değil, sorun yok.',
      '"Önemli değil" (it\'s not important) is a casual reassurance — standard after any small mistake or apology.',
      [
        { target: 'Japon değilim', note: 'değil + first-person copula -im; copular negation' },
        { target: 'Önemli değil', note: 'casual reassurance ("it\'s not important"); standard response to a small apology' },
        { target: 'Affedersin / Affedersiniz', note: 'sen / siz forms of "excuse me / sorry"; affedersin is the casual version' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
