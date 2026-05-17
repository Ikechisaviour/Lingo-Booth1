// Level 1 Unit 1 — Greetings & Self-Introduction (Italian)
// Functions: greeting, introducing yourself, asking where someone is from,
// correcting a wrong assumption, farewells. Anchor city: Bologna; anchor
// school: Università di Bologna (the oldest university in Europe).
//
// All content is authored with Italian (target) + light pronunciation cues
// (vowel quality, geminates, stress) + English glosses (canonical source).
// The AI conversation tutor reads this curriculum and delivers it to each
// learner in their preferred native language at runtime — never assume a
// specific L1 in this file.
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
  orientation: 'it-l1u1-orientation',
  pronunciation: 'it-l1u1-pronunciation',
  vocabularyGreetings: 'it-l1u1-vocab-greetings',
  vocabularyPeople: 'it-l1u1-vocab-people',
  grammarEssere: 'it-l1u1-grammar-essere',
  grammarGenderArticles: 'it-l1u1-grammar-gender-articles',
  grammarNegation: 'it-l1u1-grammar-negation',
  reading: 'it-l1u1-reading',
  listening: 'it-l1u1-listening',
  writing: 'it-l1u1-writing',
  culture: 'it-l1u1-culture',
  task: 'it-l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet someone in Italian and say goodbye in three registers (informal ciao, polite buongiorno/buonasera, formal salve) so you match the situation.',
      'Introduce yourself with your name, country, and one role (student / teacher / engineer) using mi chiamo… and sono… patterns.',
      'Ask another person their name and where they are from, then respond appropriately — choosing tu (informal) or Lei (formal) verb forms correctly.',
    ],
    task: 'Picture your first day at Università di Bologna — you walk into a Dipartimento di Lettere lab and meet a visiting researcher from Roma. By the end of this lesson you should handle the whole exchange in Italian without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Apply the c-softening rule in ciao /tʃao/ — the c becomes /tʃ/ before i; never read as /kjao/.',
      'Hold the geminate consonants in buongiorno (no double letter here actually) and in piacere /pjaˈtʃeː.re/, signora /siɲˈɲoː.ra/ — gn is palatal /ɲ/ and phonetically long between vowels.',
      'Place stress correctly on penultimate by default: chia-MA-rsi, pia-CE-re, ra-GAZZ-zo; mark final stress with the written grave on città, Università, caffè.',
    ],
    task: 'Read each example aloud and identify whether the c/g is hard or soft, where the geminate is, and which syllable is stressed.',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 12 greetings and farewells across three registers, with the right phrase for each situation.',
      'Distinguish ciao (informal hello AND goodbye, peer-to-peer) from buongiorno/buonasera (polite, time-of-day) and salve (register-neutral, useful when you are not sure).',
    ],
    task: 'Say each phrase out loud three times with the correct stress, then pair each one with the situation where you would use it.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and nationalities',
    goals: [
      'Use the 7 personal pronouns (io tu Lei lui lei noi voi loro) correctly, including the formal-you Lei which takes 3rd-person-singular verb forms.',
      'State your role (studente/studentessa, professore/professoressa, ingegnere) and nationality (italiano/italiana, americano/americana) with the correct gender agreement.',
    ],
    task: 'Say your own role and nationality using the sono… pattern, with masculine or feminine ending matching your gender, then describe one classmate.',
  },
  {
    id: ACT.grammarEssere,
    section: 'Grammar I',
    title: 'essere (to be) — irregular but unavoidable',
    goals: [
      'Conjugate essere in the present indicative: io sono, tu sei, lui/lei è, noi siamo, voi siete, loro sono. Italian verbs change form for every person, so the subject pronoun is usually dropped.',
      'Use essere to link a subject with a noun, adjective, or place: sono Anna (I am Anna), è italiana (she is Italian), siamo a Bologna (we are in Bologna).',
      'Recognize that Italian has TWO copulas, essere ("to be" — identity, origin, permanent traits) and stare ("to be" — location, temporary state, ongoing action). For Level 1 introductions, use only essere.',
    ],
    task: 'Conjugate essere in six sentences identifying yourself and others, then convert three of them into yes/no questions by changing intonation only.',
  },
  {
    id: ACT.grammarGenderArticles,
    section: 'Grammar II',
    title: 'Gender, number, and articles — il/lo/la/i/gli/le',
    goals: [
      'Recognize that every Italian noun has a gender (masculine or feminine) and a number (singular or plural). Most -o endings are masculine (ragazzo, libro), most -a endings are feminine (ragazza, casa), and -e endings can be either (studente m., notte f.).',
      'Use the four definite articles for masculine singular (il / lo / l\'), three for feminine singular (la / l\'), and four for masculine plural (i / gli) plus feminine plural (le / l\') — choice depends on the next consonant.',
      'Make adjectives agree with their noun: ragazzo italiano (m.s.), ragazza italiana (f.s.), ragazzi italiani (m.pl.), ragazze italiane (f.pl.).',
    ],
    task: 'Pick three nouns from this lesson, attach the correct article and a nationality adjective, then put them in the plural with the correct article.',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar III',
    title: 'Negation with non and the non… ma… correction pattern',
    goals: [
      'Negate any verb by placing non directly BEFORE it: non sono italiano ("I am not Italian"), non parlo bene ("I don\'t speak well"). Word order is otherwise unchanged.',
      'Apply the non… ma… ("not… but…") pattern to correct someone\'s wrong guess politely: non sono spagnola, ma italiana.',
      'Note that Italian uses double negatives without confusion: non parlo mai = "I don\'t ever speak / I never speak"; both negatives are needed.',
    ],
    task: 'Imagine a classmate guesses your nationality wrong; correct them in one polite sentence using the non… ma… pattern.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a self-introduction',
    goals: [
      'Read a short self-introduction paragraph aloud with correct stress, geminate length, and c/g softening.',
      'Answer comprehension questions about the speaker\'s name, country, role, and department using è / non è short answers.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in short Italian sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first meeting',
    goals: [
      'Follow a 4-turn first-meeting dialogue and recognize the informal vs formal register markers (ciao vs buongiorno, tu vs Lei, family name with signore/signora).',
      'Reproduce the dialogue with your own name and country, swapping in the relevant phrases naturally.',
    ],
    task: 'Read the polite dialogue along with the AI tutor first, then perform it again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own self-introduction',
    goals: [
      'Write 3–5 sentences covering greeting, name, country, role, and one extra fact.',
      'Use essere conjugations at least twice and a definite article at least once so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Write your own self-introduction in 3–5 sentences using the model on the left, then read it aloud with correct stress and gender agreement.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'tu vs Lei, family vs given name, and Bologna',
    goals: [
      'Choose tu vs Lei correctly: tu for peers, friends, family, children, and increasingly young colleagues; Lei for first meetings with adults, professors, customers, and anyone clearly older or more senior. Lei takes 3rd-person-singular verbs and is capitalized in writing.',
      'Use family name + title (signor Rossi, signora Bianchi, professoressa Conti) for formal address; switch to first name only when invited (dammi del tu = "use tu with me", a common explicit invitation).',
      'Recognize Bologna as Italy\'s ancient university city, home to Università di Bologna (founded 1088 — the oldest in Europe). Bolognese is famous for its rich cuisine (tagliatelle al ragù, NOT spaghetti alla bolognese — that\'s a tourist invention) and for the porticoes that line every street.',
    ],
    task: 'Decide how you would address (1) a classmate named Marco, (2) a professor named Anna Conti, (3) a senior colleague at a company named Luigi Bianchi — give the full Italian form for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day at Università di Bologna — in Italian',
    goals: [
      'Combine everything from this lesson into one continuous scene with no break between greeting, introduction, question, answer, correction, and farewell.',
      'Use the correct register (formal/informal) based on the relationship; switch from tu to Lei if the interlocutor is older or more senior.',
    ],
    task: 'Roleplay your first day at Università di Bologna with the AI tutor playing a visiting researcher from Roma; aim for a 6-turn exchange in Italian.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 1: Ciao — Greetings and Self-Introduction',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'it',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (ciao / buongiorno / arrivederci) and match the register to the relationship.' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences using mi chiamo… and sono….' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask Di dove sei? (informal) or Di dov\'è? (formal) and respond naturally with sono di + city.' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use the non… ma… pattern to politely correct a wrong guess about your nationality or role.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Obiettivi della lezione',
      "o-bjet-TI-vi del-la le-TSJO-ne",
      'By the end of this lesson, you can greet someone in Italian, give your name, say where you are from, ask the same back, and farewell — all in one short conversation without pausing to think.',
      'word',
      'Functional language: salutare (greet) · presentarsi (introduce oneself) · chiedere la provenienza (ask origin) · negare (negate) · congedarsi (take leave)',
      'These five micro-skills are the spine of every social encounter in Italian — once they\'re automatic, every later lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      'Scenario reale',
      "ske-NA-rjo re-A-le",
      'You are at Università di Bologna on your first day and a visiting researcher from Roma turns to you in the Dipartimento. The whole encounter takes about 30 seconds and you will need every micro-skill from this lesson.',
      'word',
      'Ricercatore: "Ciao! Mi chiamo Marco. Tu di dove sei?"',
      'A typical opener from an Italian colleague: friendly ciao + name introduction + immediate origin question — the standard Italian workplace pattern.',
      [
        { target: 'Ciao', note: 'informal hello AND goodbye; peer-to-peer; warm but never used with strangers older than you or in formal settings' },
        { target: 'Mi chiamo… mi KJA-mo', note: 'literal "I call myself" — the standard self-introduction; uses the reflexive verb chiamarsi' },
        { target: 'Di dove sei? di DO-ve SEI', note: 'literal "Of where are you?"; the standard origin question (informal tu form)' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      'Tre livelli di formalità',
      "TRE li-VEL-li di for-ma-li-TA",
      'Italian distinguishes three rough politeness registers. Informal (peers, friends, family): ciao / tu / piacere. Polite (workplace, first meetings, adults): buongiorno / Lei / piacere di conoscerLa. Formal (older strangers, professional events, official contexts): salve or buongiorno / Lei / molto lieto.',
      'word',
      'ciao (informal) / buongiorno (polite, mornings to ~17h) / buonasera (polite, evenings) / salve (register-neutral, useful when unsure)',
      'Switching from tu to Lei mid-conversation signals increased respect; reverse signals familiarity. In northern Italy, salve is the safe default among strangers; in the south, buongiorno is more common.',
      [
        { target: 'INFORMAL: ciao, tu', note: 'use with peers, close friends, family, and clearly informal settings' },
        { target: 'POLITE: buongiorno, Lei', note: 'the safe default for first meetings, workplace, and adult strangers' },
        { target: 'FORMAL: salve / buongiorno + Lei', note: 'reserved for elders, senior officials, customers, and ceremonies' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'ciao',
      "/tʃao/ — TCHA-o",
      'c before i softens to /tʃ/ (English "ch"). The i is SILENT — purely a spelling device. ciao is one syllable, not two: /tʃao/, not /tʃi.ao/. Same rule applies to ciliegia /tʃiˈljɛː.dʒa/ "cherry" — silent i, just marks the soft c.',
      'word',
      'ciao /tʃao/ — one syllable, soft c, silent i',
      'The single most-recognized Italian word in the world; learners often add an extra /i/ which is wrong.',
      [
        { target: 'c + i → /tʃ/', note: 'softening rule from Foundation — c is soft before i and e' },
        { target: 'silent i', note: 'in "cia, cio, ciu" the i has no sound — it just marks the soft c' },
        { target: '/ao/ diphthong', note: 'two vowels in one syllable; falling pitch from /a/ to /o/' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'buongiorno',
      "/bwonˈdʒor.no/ — bwon-DJOR-no",
      'Three patterns to notice: (1) buon is the truncated form of buono before a masculine consonant-initial noun (apocope); (2) gi before o is soft /dʒ/ with silent i; (3) penultimate stress on -GIOR-, the geminate-feeling rr is just a single trilled r.',
      'word',
      'buon + giorno → buongiorno /bwonˈdʒor.no/',
      'Often written as two words (buon giorno) — both spellings are accepted in modern Italian.',
      [
        { target: 'buon (apocope)', note: 'truncated from buono before a masculine consonant-initial noun' },
        { target: 'gi /dʒ/', note: 'g soft before i; the i in gio is silent, just marks soft g' },
        { target: 'stress on GIOR', note: 'penultimate; primary stress on the second syllable' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'piacere',
      "/pjaˈtʃeː.re/ — pja-TCHE-re",
      'Two tricky features: (1) pi is /pj/ — a glide, not a separate syllable; (2) c before e is soft /tʃ/, so cere is /tʃere/. Penultimate stress on -CE-: pja-TCHE-re.',
      'word',
      'piacere /pjaˈtʃeː.re/ "pleasure / nice to meet you"',
      'The standard reply to a first introduction: Mi chiamo Anna. — Piacere, Marco.',
      [
        { target: 'pj glide', note: 'i acts as a glide before another vowel; not its own syllable' },
        { target: 'ce /tʃe/', note: 'c soft before e — note this is different from chia /kja/' },
        { target: 'long penultimate e', note: 'in open syllables the stressed vowel is phonetically lengthened: tʃeː' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'signora',
      "/siɲˈɲoː.ra/ — sin-NYO-ra",
      'gn is the palatal nasal /ɲ/ — like Spanish ñ or French gn. Between vowels it is phonetically geminated /ɲɲ/, even though it is spelled with a single n in gn. Stress is penultimate.',
      'word',
      'signora /siɲˈɲoː.ra/ "lady / Mrs."',
      'Polite address for any adult woman; pairs with signore for adult men.',
      [
        { target: 'gn → /ɲ/', note: 'palatal nasal, never English /ɡn/' },
        { target: 'phonetic gemination', note: '/ɲɲ/ between vowels — held long even without a written double letter' },
        { target: 'stress on NYO', note: 'penultimate; the o is closed /o/' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'università',
      "/u.ni.ver.si.ˈta/ — u-ni-ver-si-TA",
      'Final stress on the last à, mandatorily marked with the grave accent. Without the accent, readers would default to penultimate stress (u-ni-ver-SI-ta) and misread the word. The à is open /a/, held with full clarity.',
      'word',
      'università /u.ni.ver.si.ˈta/ — final stress (parola tronca)',
      'One of a small family of feminine -tà words (città, libertà, qualità) all stressed on the final à.',
      [
        { target: 'final stress', note: 'parola tronca — stress on last syllable, written with grave accent' },
        { target: 'mandatory à', note: 'without the accent the word would be misread' },
        { target: 'feminine -tà family', note: 'città, libertà, qualità, identità — all feminine, all final-stressed' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ciao', '/tʃao/', 'Informal hello AND goodbye; used among peers, friends, family, and increasingly young colleagues. Versatile but NEVER appropriate as the first word to an older stranger, a customer, or in a formal setting. Saying "ciao" to a 70-year-old shopkeeper is a faux pas.', 'word', 'Ciao Marco! Come stai?', 'Friend-to-friend opener; "Come stai?" means "How are you?" using the tu (informal) form.', null, [ACT.vocabularyGreetings]),
    createContentItem('buongiorno', '/bwonˈdʒor.no/', 'Polite-to-formal greeting used from morning until late afternoon (sunset, roughly 17:00–18:00). The safest default with anyone you don\'t know well. Also serves as a farewell upon leaving in the morning/afternoon: "Buongiorno!" said walking out.', 'word', 'Buongiorno, signora Conti.', 'Polite greeting paired with title + family name; standard for shop owners, neighbors, and first encounters during the day.', null, [ACT.vocabularyGreetings]),
    createContentItem('buonasera', '/bwo.naˈseː.ra/', 'Polite-to-formal greeting used from late afternoon (after ~17:00) through the evening, AND as a farewell at the same hours. The Italian day is split into two registers: buongiorno (light hours) and buonasera (dark hours). Switching mid-evening is normal.', 'word', 'Buonasera, professore.', 'Polite evening greeting; works for arriving and leaving from late afternoon onward.', null, [ACT.vocabularyGreetings]),
    createContentItem('buonanotte', '/bwo.naˈnɔt.te/', 'Goodnight — used ONLY as a farewell at bedtime or when parting late at night, NEVER as a greeting. The geminate tt /tːt/ in -notte is fully held — buonanotte is pronounced with a clearly long t.', 'word', 'Buonanotte, mamma!', 'Family farewell at bedtime; never opens a conversation.', null, [ACT.vocabularyGreetings]),
    createContentItem('salve', '/ˈsal.ve/', 'A register-neutral greeting useful when you are unsure whether to use ciao or buongiorno — perfect for entering a small shop, addressing a colleague you don\'t know well, or hesitating about formality. More common in northern Italy than in the south.', 'word', 'Salve, una pizza margherita per favore.', 'Polite-but-not-cold opener in a casual professional context; standard in cafés and small shops.', null, [ACT.vocabularyGreetings]),
    createContentItem('arrivederci', '/ar.ri.veˈder.tʃi/', 'Standard polite farewell — literally "to seeing each other again". Geminate rr is held; soft c /tʃ/ before i. Used in most polite contexts (workplaces, shops, formal exits). The plural-feel of -ci makes it appropriate even when addressing one person.', 'word', 'Arrivederci, signora Bianchi!', 'Standard polite goodbye; can be paired with title + family name for added respect.', null, [ACT.vocabularyGreetings]),
    createContentItem('arrivederLa', '/ar.ri.ve.derˈla/', 'Formal version of arrivederci, using the formal-you Lei (capitalized -La). Used in high-formality contexts: business, official meetings, addressing senior figures. The capital L in the spelling signals the formal pronoun.', 'word', 'ArrivederLa, dottor Rossi.', 'High-formality farewell; standard in professional/medical/legal contexts.', null, [ACT.vocabularyGreetings]),
    createContentItem('a presto', '/a ˈprɛs.to/', 'Informal-to-polite farewell — "see you soon". Used when you genuinely expect to see the person again in the near future. Common in casual emails and message sign-offs.', 'word', 'A presto, Marco!', 'Friend-to-friend close; warmer than the neutral arrivederci.', null, [ACT.vocabularyGreetings]),
    createContentItem('a dopo', '/a ˈdoː.po/', 'Informal farewell — "see you later (today)". Used when you will see the person again within the same day. Common between roommates, colleagues parting for a few hours.', 'word', 'Vado a comprare il latte. A dopo!', 'Casual short-term close; "I\'m going to buy milk. See you later!"', null, [ACT.vocabularyGreetings]),
    createContentItem('a domani', '/a doˈmaː.ni/', 'Informal-to-polite farewell — "see you tomorrow". Used when you have a planned meeting the next day; common at work or among students leaving a class.', 'word', 'A domani, ragazzi!', 'Teacher-to-students or peer farewell when you expect to meet tomorrow.', null, [ACT.vocabularyGreetings]),
    createContentItem('mi chiamo…', '/mi ˈkjaː.mo/', 'Self-introduction phrase — literal "I call myself" (reflexive verb chiamarsi). Combined with your name, this is the standard way to give your name in Italian. Less formal than "il mio nome è…" but more common in everyday speech.', 'word', 'Mi chiamo Anna Rossi.', 'Standard self-introduction; can be paired with a country/role afterwards.', null, [ACT.vocabularyGreetings]),
    createContentItem('piacere', '/pjaˈtʃeː.re/', 'The standard first-meeting response — literal "pleasure". Said when shaking hands or just after being introduced. The fuller form "piacere di conoscerti" (informal) or "piacere di conoscerLa" (formal) adds explicit acknowledgment.', 'word', '— Mi chiamo Marco. — Piacere, Anna.', 'Standard exchange after a first introduction; both speakers usually say piacere in turn.', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People, roles, nationalities
    // ────────────────────────────────────────────────────────────────────
    createContentItem('io', '/ˈi.o/', 'First-person singular subject pronoun. Italian usually DROPS the subject pronoun because the verb ending makes the subject clear: sono Anna (not io sono Anna) — adding io would be emphatic or contrastive. Pronounced clearly as two syllables: I-o.', 'word', 'Io sono italiana, lui è francese. (contrast)', 'Used for emphasis or to mark a contrast; otherwise dropped.', null, [ACT.vocabularyPeople]),
    createContentItem('tu', '/tu/', 'Informal second-person singular. Used with peers, friends, family, children, and increasingly with colleagues your own age. Triggers 2nd-person-singular verb forms (sei, hai, parli). NEVER use with a stranger older than you, a customer, or a professor on first meeting.', 'word', 'Tu sei italiano? — informal, peer-to-peer', 'Using tu with the wrong person is a clear social misstep; if in doubt, use Lei first.', null, [ACT.vocabularyPeople]),
    createContentItem('Lei', '/lɛi/', 'Formal second-person pronoun — the polite "you" used with adults you don\'t know, professors, customers, senior people. Capitalized in writing to distinguish from "lei" meaning "she". Takes 3rd-person-singular verb forms (Lei è, Lei ha, Lei parla — identical to "she is, has, speaks").', 'word', 'Lei è americana? — formal, addressing an adult', 'The verb form is identical to "she is" — context disambiguates. Standard for all first formal meetings.', null, [ACT.vocabularyPeople]),
    createContentItem('lui', '/lui/', 'Third-person singular masculine — "he / him". Same form for subject and object after a preposition (con lui "with him"). Used for any male person; for things, gender follows the noun.', 'word', 'Lui è il mio amico Marco.', 'Standard third-person introduction; lui + essere + role.', null, [ACT.vocabularyPeople]),
    createContentItem('lei', '/lɛi/', 'Third-person singular feminine — "she / her". Same spelling as the formal Lei but lowercase distinguishes "she" from formal "you" in writing. Verb form is identical (3rd-person-singular).', 'word', 'Lei è la professoressa Conti.', 'Third-person introduction using the female form; note the lowercase l for "she".', null, [ACT.vocabularyPeople]),
    createContentItem('noi', '/noi/', 'First-person plural — "we / us". Often dropped because the -iamo verb ending (siamo, parliamo) makes the subject clear. Used for emphasis or contrast.', 'word', 'Noi siamo studenti dell\'Università di Bologna.', 'Group self-identification; siamo is the noi form of essere.', null, [ACT.vocabularyPeople]),
    createContentItem('voi', '/voi/', 'Second-person plural — "you all". Used to address multiple people in any register (no formal/informal split in the plural in modern standard Italian; historically Voi was a formal singular in the south, but this is dated). Takes -ate/-ete/-ite verb endings.', 'word', 'Voi siete italiani?', 'Casual or polite group question; "Are you (all) Italian?".', null, [ACT.vocabularyPeople]),
    createContentItem('loro', '/ˈloː.ro/', 'Third-person plural — "they / them". Same form for masculine and feminine groups (loro covers mixed-gender too). Pronounced with closed o.', 'word', 'Loro sono italiani.', 'Plural reference to a group; loro often dropped in fast speech.', null, [ACT.vocabularyPeople]),
    createContentItem('nome', '/ˈnoː.me/', 'Given name (first name). Contrast with cognome (family name / surname). When asked "Come ti chiami?" you answer with your nome alone (Anna) or full name (Anna Rossi).', 'word', 'Il mio nome è Anna.', '"My name is Anna" — slightly more formal than mi chiamo Anna.', null, [ACT.vocabularyPeople]),
    createContentItem('cognome', '/koɲˈɲoː.me/', 'Family name (surname). Italian convention places given name FIRST, then family name (Anna Rossi). Note the gn /ɲ/ palatal nasal and penultimate stress.', 'word', 'Il mio cognome è Rossi.', '"My surname is Rossi" — common in formal introductions and on forms.', null, [ACT.vocabularyPeople]),
    createContentItem('signore', '/siɲˈɲoː.re/', 'Mr. / sir — used before a man\'s family name (signor Rossi, with apocope dropping the final -e). Also as a standalone polite address: "Sì, signore." ("Yes, sir."). Shortened to signor before a name (signor Rossi, signor Bianchi).', 'word', 'Buongiorno, signor Rossi.', 'Polite address; signor (truncated) before family names, signore alone or before a vowel.', null, [ACT.vocabularyPeople]),
    createContentItem('signora', '/siɲˈɲoː.ra/', 'Mrs. / Madam — used before a woman\'s family name (signora Bianchi) or alone as a polite address. Does NOT change for marital status; the safe default for any adult woman in formal contexts.', 'word', 'Buonasera, signora Bianchi.', 'Polite address; appropriate for any adult woman regardless of marital status.', null, [ACT.vocabularyPeople]),
    createContentItem('signorina', '/si.ɲɲoˈriː.na/', 'Miss — used for young women. Increasingly considered old-fashioned or even slightly inappropriate; modern Italian prefers signora for all adult women. Still used for very young women (teens to early 20s) or in older/southern contexts.', 'word', 'Buongiorno, signorina.', 'Older or southern register; signora is the modern safe default.', null, [ACT.vocabularyPeople]),
    createContentItem('professore', '/pro.fesˈsoː.re/', 'Male professor or teacher (high school and up). Used as a title with or without family name (professor Rossi, signor professore). Distinct from maestro/maestra (primary school teacher). Note the geminate ss and penultimate stress.', 'word', 'Buongiorno, professor Rossi.', 'Standard address for a male high-school or university teacher; truncated to "professor" before family name.', null, [ACT.vocabularyPeople]),
    createContentItem('professoressa', '/pro.fes.soˈres.sa/', 'Female professor or teacher. Italian has fully gendered professional titles: professore (m.) / professoressa (f.), dottore (m.) / dottoressa (f.), studente (m.) / studentessa (f.). Note two geminates: ss and ss.', 'word', 'Professoressa Conti, posso fare una domanda?', '"Professor Conti, may I ask a question?" — standard student-to-female-teacher address.', null, [ACT.vocabularyPeople]),
    createContentItem('studente', '/stuˈdɛn.te/', 'Male student (or generic). Ending -ente is masculine; feminine form is studentessa. Used for any level from high school to graduate.', 'word', 'Sono uno studente di Bologna.', 'Most common role self-identifier in academic contexts; "uno studente" — uno before a masculine word starting with s+consonant.', null, [ACT.vocabularyPeople]),
    createContentItem('studentessa', '/stu.denˈtes.sa/', 'Female student. -essa is the feminine ending for many professional/role nouns: studentessa, professoressa, dottoressa, principessa.', 'word', 'Sono una studentessa di Bologna.', 'Same self-introduction with feminine ending; una before a feminine consonant-initial word.', null, [ACT.vocabularyPeople]),
    createContentItem('ingegnere', '/in.dʒeɲˈɲɛː.re/', 'Engineer — gn /ɲ/ palatal nasal between vowels (phonetically long). The word is invariable in some uses but takes ingegnera as a modern feminine form (older usage kept ingegnere for both).', 'word', 'Lui è un ingegnere informatico.', '"He is a software engineer" — informatico means "of computer science / IT".', null, [ACT.vocabularyPeople]),
    createContentItem('medico', '/ˈmɛː.di.ko/', 'Doctor (medical professional, generic). Antepenultimate stress: ME-di-co. Distinct from dottore/dottoressa, which are titles (also used for anyone with a university degree, not just medical doctors).', 'word', 'Mia madre è medico.', '"My mother is a doctor" — note that medico stays masculine even when referring to a woman (job vs title).', null, [ACT.vocabularyPeople]),
    createContentItem('italiano / italiana', '/i.taˈljaː.no/, /i.taˈljaː.na/', 'Italian (adjective and noun). Masculine -o, feminine -a; plurals italiani (m.), italiane (f.). Lowercase as adjective (sono italiano), capitalized only when referring to the language as a proper noun: l\'Italiano è bello.', 'word', 'Sono italiano. (m.) / Sono italiana. (f.)', 'Standard nationality self-identification; gender must match the speaker.', null, [ACT.vocabularyPeople]),
    createContentItem('americano / americana', '/a.me.riˈkaː.no/, /a.me.riˈkaː.na/', 'American (adjective and noun). Same -o/-a pattern. In Italian, "americano" by default means "from the USA"; "sudamericano" is South American, "nordamericano" is North American more broadly.', 'word', 'Sono americana, di Boston.', '"I am American, from Boston" — nationality + city of origin.', null, [ACT.vocabularyPeople]),
    createContentItem('inglese', '/inˈɡleː.ze/', 'English (adjective, noun, and language). -ese ending is invariable for masculine/feminine singular: lui è inglese, lei è inglese. Plural inglesi (both m. and f.).', 'word', 'James è inglese, di Londra.', '"James is English, from London" — -ese adjectives don\'t change for gender in singular.', null, [ACT.vocabularyPeople]),
    createContentItem('francese', '/franˈtʃeː.ze/', 'French. Same -ese invariable pattern as inglese. Plural francesi.', 'word', 'Marie è francese, di Parigi.', '"Marie is French, from Paris" — -ese ending invariable in singular.', null, [ACT.vocabularyPeople]),
    createContentItem('tedesco / tedesca', '/teˈdes.ko/, /teˈdes.ka/', 'German. Note the IRREGULAR plural: m.pl. tedeschi (with h added to keep c hard /k/ before i), f.pl. tedesche. Without the h the plural would soften to /tʃ/.', 'word', 'Klaus è tedesco; sua sorella è tedesca.', '"Klaus is German; his sister is German" — note the masculine and feminine forms.', null, [ACT.vocabularyPeople]),
    createContentItem('spagnolo / spagnola', '/spaɲˈɲɔː.lo/, /spaɲˈɲɔː.la/', 'Spanish. Note gn /ɲ/ and open ò /ɔ/. Plurals spagnoli (m.), spagnole (f.).', 'word', 'María è spagnola, di Madrid.', '"María is Spanish, from Madrid" — feminine form with -a.', null, [ACT.vocabularyPeople]),
    createContentItem('cinese', '/tʃiˈneː.ze/', 'Chinese. -ese invariable for masc/fem singular. Note c soft /tʃ/ before i.', 'word', 'Li è cinese, di Pechino.', '"Li is Chinese, from Beijing" — note c /tʃ/ before i.', null, [ACT.vocabularyPeople]),
    createContentItem('giapponese', '/dʒap.poˈneː.ze/', 'Japanese. Geminate pp held; gi /dʒ/ before a; -ese invariable in singular.', 'word', 'Tanaka è giapponese.', '"Tanaka is Japanese" — geminate pp distinguishes from hypothetical *giaponese.', null, [ACT.vocabularyPeople]),
    createContentItem('coreano / coreana', '/ko.reˈaː.no/, /ko.reˈaː.na/', 'Korean. Same -o/-a pattern as italiano/italiana. Plurals coreani (m.), coreane (f.).', 'word', 'Min-ji è coreana, di Seul.', '"Min-ji is Korean, from Seoul" — feminine -a.', null, [ACT.vocabularyPeople]),
    createContentItem('nigeriano / nigeriana', '/ni.dʒeˈrjaː.no/, /ni.dʒeˈrjaː.na/', 'Nigerian. Same -o/-a pattern; geni /dʒe/ soft g before e.', 'word', 'Chiamaka è nigeriana, di Lagos.', '"Chiamaka is Nigerian, from Lagos" — soft g /dʒ/ before e.', null, [ACT.vocabularyPeople]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: essere conjugation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'essere — presente indicativo',
      'present indicative of "to be"',
      'essere is the most important irregular verb in Italian. Six different forms, one per person: io sono, tu sei, lui/lei è (with grave accent to distinguish from "e" = "and"), noi siamo, voi siete, loro sono. The subject pronoun is normally DROPPED because the verb form already shows the person.',
      'sentence',
      'io SONO / tu SEI / lui-lei È / noi SIAMO / voi SIETE / loro SONO',
      'Italian verb endings carry person information; subject pronouns are emphatic only.',
      [
        { target: 'io sono', note: '"I am" — 1st singular; pronoun usually dropped (just "sono")' },
        { target: 'tu sei', note: '"you are" (informal); 2nd singular' },
        { target: 'lui/lei è', note: '"he/she is" — note the GRAVE accent: è (verb) vs e (and)' },
        { target: 'noi siamo', note: '"we are"; 1st plural' },
        { target: 'voi siete', note: '"you all are"; 2nd plural' },
        { target: 'loro sono', note: '"they are"; same form as io sono — context disambiguates' },
      ],
      [ACT.grammarEssere],
    ),
    createContentItem(
      'essere per identità e origine',
      'essere for identity and origin',
      'essere links a subject with a noun, adjective, or place to express identity (sono Anna), nationality (sono italiana), profession (sono studentessa), and origin (sono di Bologna). Most adjectives and nouns must agree with the subject in gender and number.',
      'sentence',
      'Sono Anna. (identity) · Sono italiana. (nationality, f.) · Sono di Bologna. (origin) · Sono una studentessa. (profession)',
      'For introductions in Level 1, essere covers everything; stare comes later.',
      [
        { target: 'identity: sono + name', note: 'no article needed before a personal name' },
        { target: 'nationality: sono + adj', note: 'adjective agrees with speaker gender (italiano/italiana)' },
        { target: 'origin: sono di + city', note: '"I am from Bologna" — di + city of origin' },
        { target: 'profession: sono + un/una + noun', note: 'indefinite article usually required: sono UNA studentessa' },
      ],
      [ACT.grammarEssere],
    ),
    createContentItem(
      'essere vs stare',
      'essere (permanent) vs stare (temporary/location)',
      'Italian distinguishes two "to be" verbs (like Spanish ser/estar). essere = identity, origin, profession, permanent traits. stare = location ("where I am right now"), temporary state ("how I feel"), and ongoing actions (stare + gerund: sto mangiando "I am eating"). For Unit 1 introductions, use only essere.',
      'sentence',
      'Sono Anna. (essere — identity) vs Sto bene. (stare — feel) · Sono di Bologna. (essere — origin) vs Sto a Bologna. (stare — current location)',
      'A common Romance-language pitfall; English "I am" maps to TWO Italian verbs.',
      [
        { target: 'essere → identity/origin', note: 'sono italiana, sono di Bologna, è ingegnere' },
        { target: 'stare → location/state', note: 'sto a Bologna ora, come stai? sto bene' },
      ],
      [ACT.grammarEssere],
    ),
    createContentItem(
      'Domande sì/no',
      'yes/no questions — intonation only',
      'Italian forms yes/no questions WITHOUT changing word order — only the intonation rises on the final stressed syllable. Sei italiano? (rising on -liano) means "Are you Italian?" — the words are identical to the statement "Sei italiano." (you are Italian). No auxiliary inversion, no question word.',
      'sentence',
      'Sei italiano. (statement, falling) → Sei italiano? (question, rising — same words)',
      'In writing the question mark signals; in speech, the rising intonation is the only marker.',
      [
        { target: 'no word order change', note: 'unlike English ("you are" → "are you"), Italian keeps the same order' },
        { target: 'rising intonation', note: 'the final stressed syllable rises in pitch' },
        { target: 'short answers: sì / no', note: '"yes / no"; often paired with the verb: "Sì, sono italiano" or just "Sì"' },
      ],
      [ACT.grammarEssere],
    ),
    createContentItem(
      'Domande informative — chi, che, dove, di dove',
      'wh-questions — chi, che, dove, di dove',
      'Information questions in Italian place the question word at the FRONT of the sentence (like English): chi (who), che / che cosa / cosa (what), dove (where), di dove (where from), come (how), quando (when), perché (why). Italian intonation on wh-questions FALLS like a statement; the question word carries the question force.',
      'sentence',
      'Come ti chiami? "What\'s your name?" · Di dove sei? "Where are you from?" · Chi è? "Who is it?" · Che cosa fai? "What do you do?"',
      'Same word order pattern as English, but the intonation falls (not rises like a yes/no question).',
      [
        { target: 'Come ti chiami?', note: '"What\'s your name?" — literal "How do you call yourself?"' },
        { target: 'Di dove sei?', note: '"Where are you from?" — informal tu; formal is "Di dov\'è Lei?"' },
        { target: 'Chi è?', note: '"Who is it?" — standard answer to phone/door' },
        { target: 'Che cosa fai? / Cosa fai? / Che fai?', note: '"What do you do?" — three equally common forms; che alone is shorter/colloquial' },
      ],
      [ACT.grammarEssere],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Gender, number, articles
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Genere dei nomi',
      'noun gender — masculine vs feminine',
      'Every Italian noun has a gender. The rules of thumb: nouns ending in -o are usually MASCULINE (ragazzo, libro, treno); nouns ending in -a are usually FEMININE (ragazza, casa, pizza); nouns ending in -e can be EITHER (studente m., notte f., bicicletta f. but cane m.). Plurals: -o → -i (ragazzi), -a → -e (ragazze), -e → -i (studenti, notti, both genders).',
      'sentence',
      'M.s. ragazzo → M.pl. ragazzi · F.s. ragazza → F.pl. ragazze · M/F.s. studente → studenti / studentesse (or studenti for mixed)',
      'There is no neuter in Italian. Even abstract concepts have a gender — la libertà (f.) "freedom", il pensiero (m.) "thought".',
      [
        { target: '-o → masculine', note: 'most -o singulars are masculine; plural -i (ragazzi, libri)' },
        { target: '-a → feminine', note: 'most -a singulars are feminine; plural -e (ragazze, case)' },
        { target: '-e → either', note: 'memorize: studente (m.), notte (f.), padre (m.), madre (f.); plural -i for both' },
        { target: 'exceptions', note: 'mano "hand" is feminine despite -o; problema "problem" is masculine despite -a' },
      ],
      [ACT.grammarGenderArticles],
    ),
    createContentItem(
      'Articoli determinativi maschili',
      'masculine definite articles — il, lo, l\', i, gli',
      'Italian has THREE masculine singular definite articles depending on the next sound: il before most consonants (il ragazzo, il treno); lo before s + consonant, z, gn, ps, x, y (lo studente, lo zaino, lo gnomo); l\' (elision of lo) before vowels (l\'amico). Plurals: i before consonant (i ragazzi); gli before vowels or s+cons/z/gn (gli studenti, gli amici).',
      'sentence',
      'il ragazzo / lo studente / l\'amico / i ragazzi / gli studenti / gli amici',
      'The article you choose depends on the FIRST SOUND of the noun, not its meaning.',
      [
        { target: 'il + consonant', note: 'il ragazzo, il libro, il professore, il treno' },
        { target: 'lo + s+cons / z / gn / ps / x / y', note: 'lo studente, lo zaino, lo psicologo, lo gnomo' },
        { target: "l' + vowel", note: 'elision of lo before vowels: l\'amico, l\'orologio' },
        { target: 'i (plural of il)', note: 'i ragazzi, i libri, i treni' },
        { target: 'gli (plural of lo/l\')', note: 'gli studenti, gli amici, gli zaini' },
      ],
      [ACT.grammarGenderArticles],
    ),
    createContentItem(
      'Articoli determinativi femminili',
      'feminine definite articles — la, l\', le',
      'Italian has just TWO feminine singular forms: la before any consonant (la ragazza, la casa, la studentessa); l\' (elision of la) before vowels (l\'amica, l\'università). Plural is unified: le for all feminine nouns regardless of starting sound (le ragazze, le amiche, le università).',
      'sentence',
      'la ragazza / l\'amica / le ragazze / le amiche',
      'Simpler than the masculine: only two singular forms instead of three.',
      [
        { target: 'la + consonant', note: 'la ragazza, la casa, la studentessa' },
        { target: "l' + vowel", note: "elision of la: l'amica, l'università, l'idea" },
        { target: 'le (all plural)', note: 'le ragazze, le amiche, le case — works before any sound' },
      ],
      [ACT.grammarGenderArticles],
    ),
    createContentItem(
      'Articoli indeterminativi',
      'indefinite articles — un, uno, una, un\'',
      'Italian has FOUR indefinite singular articles: un (most masculine, before consonant or vowel — un ragazzo, un amico, no elision); uno (masculine, before s+cons/z/gn/ps — uno studente); una (feminine, before consonant — una ragazza); un\' (elision of una, before vowel — un\'amica). The apostrophe in un\' is the ONLY thing marking the feminine.',
      'sentence',
      'un ragazzo / un amico / uno studente / una ragazza / un\'amica',
      'Critical: un amico (m.) vs un\'amica (f.) — same sound, different gender, marked by the apostrophe.',
      [
        { target: 'un (masc + cons or vowel)', note: 'un ragazzo, un amico — no apostrophe before vowel for masculine' },
        { target: 'uno (masc + s+cons/z/gn/etc.)', note: 'uno studente, uno zaino, uno psicologo' },
        { target: 'una (fem + cons)', note: 'una ragazza, una casa, una studentessa' },
        { target: "un' (fem + vowel)", note: "un'amica, un'università — apostrophe MANDATORY" },
        { target: 'no plural form', note: 'plural "some" is expressed by partitive: degli amici, delle amiche' },
      ],
      [ACT.grammarGenderArticles],
    ),
    createContentItem(
      'Accordo aggettivo-nome',
      'adjective-noun agreement',
      'Italian adjectives MUST agree with their noun in gender and number. -o/-a adjectives have four forms: m.s. -o, f.s. -a, m.pl. -i, f.pl. -e (italiano/italiana/italiani/italiane). -e adjectives have only TWO forms: -e for singular (both genders), -i for plural (both genders) — (grande, grandi; intelligente, intelligenti).',
      'sentence',
      'ragazzo italiano / ragazza italiana / ragazzi italiani / ragazze italiane · ragazzo intelligente / ragazza intelligente / ragazzi intelligenti / ragazze intelligenti',
      'Agreement is automatic and obligatory — getting it wrong sounds clearly foreign.',
      [
        { target: '-o/-a adjectives (4 forms)', note: 'italiano, italiana, italiani, italiane — match -o/-a/-i/-e noun endings' },
        { target: '-e adjectives (2 forms)', note: 'grande, grandi — same for masc/fem; only number changes' },
      ],
      [ACT.grammarGenderArticles],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Negation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Negazione con "non"',
      'negation with non — before the verb',
      'Italian negates ANY verb by placing non directly BEFORE the verb. Word order is otherwise unchanged. Non sono italiano. Non parlo francese. Non capisco. Non vado. The non is always there in negatives — no auxiliary "do" is needed.',
      'sentence',
      'Sono italiano → Non sono italiano. · Parlo francese → Non parlo francese.',
      'Simplest negation system in Romance: just put "non" before the verb.',
      [
        { target: 'non + verb', note: 'non sono, non parlo, non capisco — always before the verb' },
        { target: 'with clitics', note: 'non mi chiamo Marco; non ti conosco — non goes before the clitic too' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'Doppia negazione',
      'double negation — Italian allows it',
      'Unlike English, Italian REQUIRES the double negative with most negative words: non… mai (never), non… nessuno (nobody), non… niente (nothing), non… nemmeno (not even). Non parlo mai = "I never speak" (literally "I don\'t speak never"). Both negatives are needed for grammaticality.',
      'sentence',
      'Non parlo mai. (I never speak.) · Non vedo nessuno. (I don\'t see anyone.) · Non capisco niente. (I don\'t understand anything.)',
      'Two negatives don\'t cancel in Italian — they reinforce.',
      [
        { target: 'non + verb + mai', note: '"never" — non parlo mai italiano' },
        { target: 'non + verb + nessuno', note: '"nobody" — non conosco nessuno qui' },
        { target: 'non + verb + niente', note: '"nothing" — non ho niente da dire' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'Schema "non… ma…"',
      'non… ma… correction pattern',
      'The standard polite pattern for correcting someone\'s wrong guess: non + WRONG, ma + RIGHT. Three parts: denial (non sono X), conjunction (ma "but"), then the correct value (Y). Skipping any part makes the correction abrupt.',
      'sentence',
      'A: Sei spagnolo? — B: Non sono spagnolo, ma italiano.',
      'The three-part rhythm makes the correction feel natural rather than blunt.',
      [
        { target: 'non sono X (denial)', note: '"I am not X" — opens the correction politely' },
        { target: 'ma Y (correct alternative)', note: 'closes the loop and gives the asker the right answer' },
      ],
      [ACT.grammarNegation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Una presentazione personale',
      'a self-introduction (paragraph)',
      'A complete five-sentence self-introduction in Italian. Read it aloud with correct stress, geminates, and c/g softening. Notice the parallel structure: nearly every sentence is centered on essere.',
      'sentence',
      'Buongiorno! Mi chiamo Anna Rossi e sono italiana. Sono una studentessa dell\'Università di Bologna; studio lettere classiche. Sono di Firenze, ma adesso abito a Bologna. Molto piacere di conoscervi.',
      'Translation: "Good morning! My name is Anna Rossi and I am Italian. I am a student at the University of Bologna; I study classical literature. I am from Florence, but now I live in Bologna. Very nice to meet you all."',
      [
        { target: 'Mi chiamo Anna Rossi', note: 'self-introduction with reflexive chiamarsi; warmer than "il mio nome è"' },
        { target: 'sono italiana', note: 'feminine -a because the speaker is female; would be italiano if male' },
        { target: "dell'Università", note: 'elision of della (di + la) before vowel-initial Università' },
        { target: 'studio lettere classiche', note: '"I study classical literature" — note the plural agreement classiche (f.pl.)' },
        { target: 'sono di Firenze', note: '"I am from Florence" — sono di + city of origin' },
        { target: 'molto piacere di conoscervi', note: '"very pleased to meet you (all)" — vi = voi clitic, polite plural closing' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'Domande di comprensione',
      'comprehension questions',
      'Four standard comprehension questions matching the paragraph. Answer each in a short Italian sentence using è / sono / non è; full sentences are not required for natural Italian.',
      'sentence',
      'D1: Come si chiama? · D2: Di dov\'è? · D3: Studia all\'Università di Roma? · D4: Cosa studia?',
      'Two name questions, one origin, one yes/no with wrong premise, one specific information — covering all the question patterns from this lesson.',
      [
        { target: 'R1: Si chiama Anna Rossi.', note: 'name answer using si chiama (3rd-person of chiamarsi)' },
        { target: "R2: È di Firenze.", note: 'origin answer using è di + city' },
        { target: "R3: No, non studia all'Università di Roma, ma a Bologna.", note: 'correction using non… ma… pattern' },
        { target: 'R4: Studia lettere classiche.', note: 'short answer; full sentence also fine' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Primo incontro (dialogo — informale)',
      'first meeting (informal dialogue)',
      'A natural informal first-meeting conversation between two students at Università di Bologna. Covers all the patterns from this lesson: greetings, names, origins, roles, agreement, and farewells — using tu throughout.',
      'conversation',
      'A: Ciao! Mi chiamo Marco. E tu come ti chiami?\nB: Ciao Marco, io sono Anna. Piacere!\nA: Piacere mio. Sei italiana?\nB: Sì, sono italiana, di Firenze. E tu di dove sei?\nA: Sono romano, di Roma. Sei una studentessa qui a Bologna?\nB: Sì, studio lettere classiche al primo anno. Tu?\nA: Anch\'io! Studio lettere. Che bello, allora ci vedremo a lezione.\nB: Sì, a presto Marco!',
      'A natural exchange between peers using ciao + tu — the default for student-age informal interactions in Italy.',
      [
        { target: 'Mi chiamo… e tu?', note: 'introduce yourself and return the question with "e tu?"' },
        { target: 'piacere mio', note: '"my pleasure" — natural reply when the other says "piacere"' },
        { target: 'sono di + city', note: 'standard origin answer; di Firenze, di Roma' },
        { target: "anch'io", note: '"me too" — anche + io with elision before vowel' },
        { target: 'ci vedremo a lezione', note: '"we\'ll see each other in class" — reflexive vedersi in future tense' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      'Primo incontro (dialogo — formale)',
      'first meeting (formal dialogue)',
      'A formal first-meeting conversation suitable for academic or professional contexts. Notice the formal vocabulary: Lei (capitalized), buongiorno, professoressa/professore, family-name + title — register markers signaling a more deliberate interaction.',
      'conversation',
      'Studentessa: Buongiorno, professoressa Conti. Posso entrare?\nProfessoressa: Buongiorno, prego, si accomodi. Lei è la nuova studentessa Erasmus?\nStudentessa: Sì, mi chiamo Anna Rossi. Sono americana, ma di origini italiane.\nProfessoressa: Ah, benvenuta a Bologna. Da dove viene esattamente?\nStudentessa: Vengo da Boston. Sono molto contenta di essere qui all\'Università.\nProfessoressa: Benissimo. Allora, qual è il Suo campo di studio?\nStudentessa: Studio lettere classiche, in particolare il latino medievale.\nProfessoressa: Eccellente! ArrivederLa, signorina Rossi.',
      'Same information as the informal version but with formal phrasing throughout — appropriate for hierarchical (student-professor) relationships.',
      [
        { target: 'professoressa Conti', note: 'formal address: title + family name; never first name on first meeting' },
        { target: 'si accomodi', note: 'formal imperative (Lei form) of accomodarsi; "please make yourself comfortable / take a seat"' },
        { target: 'Lei è… (formal)', note: 'formal "you" — same verb form as "she is"; capitalized in writing' },
        { target: 'Da dove viene? / Di dov\'è?', note: 'formal origin questions; venire and essere both work' },
        { target: 'ArrivederLa', note: 'formal farewell with -La suffix (the formal direct object pronoun)' },
        { target: 'signorina Rossi', note: 'in this case appropriate because the speaker is young; signora would also work for any adult woman' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Modello di presentazione',
      'reusable self-introduction template',
      'A reusable five-sentence template for any Italian self-introduction. Fill in the bracketed slots with your own information — the structure carries the rest.',
      'sentence',
      'Buongiorno! Mi chiamo [NOME COGNOME]. Sono [NAZIONALITÀ-agreement]. Sono [studente/studentessa] all\'Università di [CITTÀ]. Sono di [CITTÀ DI ORIGINE] e [UN FATTO]. Piacere di conoscervi.',
      'Five sentences cover the core: greeting, name, nationality, role, origin + personal fact, closing — the minimum complete self-introduction.',
      [
        { target: '[NOME COGNOME]', note: 'given name first, then family name — Italian convention' },
        { target: '[NAZIONALITÀ-agreement]', note: 'italiana/italiano matching speaker gender; -a if female, -o if male' },
        { target: '[studente/studentessa]', note: 'masculine or feminine role noun matching speaker gender' },
        { target: '[CITTÀ DI ORIGINE]', note: 'use "di + city" or "vengo da + country/city" for variety' },
        { target: '[UN FATTO]', note: 'something specific (hobby, major, favorite thing) to distinguish you' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      'Esercizio di scrittura',
      'writing exercise',
      'Write your own 3–5 sentence self-introduction in Italian using the template. Use essere conjugations at least twice and a definite article at least once so the writing demonstrates the core grammar of this lesson.',
      'sentence',
      'Esempio: Buongiorno! Mi chiamo Kim Ji-su. Sono coreana. Sono una studentessa di lettere all\'Università di Bologna. Mi piace il latino e suono la chitarra. Piacere di conoscervi!',
      'Translation: "Good morning! My name is Kim Ji-su. I am Korean. I am a literature student at the University of Bologna. I like Latin and I play the guitar. Nice to meet you all!"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'tu vs Lei',
      'when to use informal tu vs formal Lei',
      'Lei is the formal "you" used with adults you don\'t know, professors, customers, senior people, and anyone you wish to show extra respect to. Tu is the informal "you" for peers, friends, family, children. Using tu with someone who expects Lei signals disrespect; using Lei with a close peer creates cold distance. Mid-conversation, when invited to switch, the other person says "dammi del tu" ("use tu with me").',
      'sentence',
      'Buongiorno, signora Bianchi. Come sta Lei? (formal) vs Ciao Anna! Come stai? (informal)',
      'Switching from tu to Lei mid-conversation signals increased respect; the reverse signals familiarity. The verb form changes too: Lei takes 3rd-singular forms identical to "she/he".',
      [
        { target: 'Lei (formal)', note: 'use with elders, customers, professors, in professional contexts; takes 3rd-singular verbs' },
        { target: 'tu (informal)', note: 'use with peers, friends, classmates, family, children; takes 2nd-singular verbs' },
        { target: '"dammi del tu"', note: 'explicit invitation to switch to tu; common after a few formal exchanges' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Nome + cognome',
      'given name then family name — Western order',
      'Italian uses the standard Western order: given name first, family name second (Anna Rossi). On official forms, the order is sometimes reversed (Rossi, Anna) or the cognome is listed first — but in spoken introductions, always nome then cognome. Italians frequently introduce themselves with both names when meeting professionals.',
      'sentence',
      'Mi chiamo Anna Rossi. (given + family) · Sono il dottor Bianchi. (title + family name only)',
      'Family names ending in -i (Rossi, Bianchi, Conti, Ferrari) are extremely common and often gender-neutral.',
      [
        { target: 'nome (given name)', note: 'first; Anna, Marco, Giulia, Luigi' },
        { target: 'cognome (family name)', note: 'second; Rossi, Bianchi, Verdi, Conti' },
        { target: 'Italian -i surnames', note: 'often plural-form family names; very common: Rossi, Bianchi, Ferrari' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Università di Bologna',
      'the oldest university in Europe',
      'Università di Bologna, founded in 1088, is the oldest continuously operating university in Europe. Located in Bologna (Emilia-Romagna), the city is known as "la dotta" ("the learned"), "la grassa" ("the fat" — for its rich cuisine), and "la rossa" ("the red" — for both its terracotta porticoes and its left-leaning politics). Famous students include Dante, Petrarch, Erasmus, and Copernicus. Modern Bologna has about 90,000 students out of 400,000 residents.',
      'sentence',
      "Studio all'Università di Bologna, fondata nel 1088 — la più antica d'Europa.",
      'A point of national pride; mentioning UniBo in introductions is high-status in Italian academic contexts.',
      [
        { target: 'la dotta', note: '"the learned" — Bologna nickname for its university tradition' },
        { target: 'la grassa', note: '"the fat" — for its rich cuisine (tagliatelle, mortadella, tortellini)' },
        { target: 'la rossa', note: '"the red" — for the terracotta-colored porticoes and the city\'s left-leaning politics' },
        { target: 'porticoes (portici)', note: '38 km of covered walkways across the city; UNESCO World Heritage since 2021' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Bella figura',
      'making a good impression — bella figura',
      'The concept of "fare una bella figura" (literally "to make a beautiful figure") refers to making a good public impression — through dress, manner, language, and behavior. Italians value bella figura highly in social and professional contexts; even casual meetings are dressed up. The opposite, "brutta figura" (ugly figure), is what you fear: being rude, unkempt, or socially awkward. First-meeting formality (Lei, family name, polite phrases) is part of building bella figura.',
      'sentence',
      'In un primo incontro, fai una bella figura usando il Lei e il cognome.',
      'Not "fake politeness" — bella figura is core social skill in any Italian professional context. Dressing too casually for a meeting or addressing a stranger with "tu" both risk "brutta figura".',
      [
        { target: 'bella figura', note: 'good public impression; goal of polite, well-dressed behavior' },
        { target: 'brutta figura', note: 'embarrassing impression; what you avoid by following polite norms' },
        { target: 'far bella figura', note: '"to make a good impression"; common verbal phrase' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Compito: il primo giorno all\'Università di Bologna',
      'task: first day at Università di Bologna',
      'Roleplay your first day at Università di Bologna with the AI tutor playing a friendly Roman researcher. Use every skill from this lesson in one continuous scene — greet, introduce, ask, answer, farewell.',
      'conversation',
      '[Dipartimento di Lettere, Università di Bologna]\nRicercatore: Ciao! Sono Marco. Piacere.\nTu: [greet + introduce]\nRicercatore: Di dove sei?\nTu: [give country/city]\nRicercatore: Sei una studentessa qui?\nTu: [confirm + give major]\nRicercatore: Ah bello! Cosa studi esattamente?\nTu: [answer]\nRicercatore: È stato un piacere chiacchierare.\nTu: [farewell]',
      'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: 'greet', note: 'ciao / piacere — match the peer informal register' },
        { target: 'introduce', note: 'mi chiamo… / sono… — pick whichever flows' },
        { target: 'country', note: 'sono + nationality (agree with gender) / sono di + city' },
        { target: 'major', note: 'studio + subject — lettere, ingegneria, medicina' },
        { target: 'farewell', note: 'a presto / arrivederci / ciao — match the register you opened with' },
      ],
      [ACT.task],
    ),
    createContentItem(
      'Sfida — correggere un\'ipotesi',
      'stretch — correct a wrong assumption',
      'Stretch goal: in the same scene, the Roman researcher guesses your country incorrectly. Politely correct using the non… ma… pattern. Closes the loop without making the asker lose bella figura.',
      'conversation',
      'Ricercatore: Ah, sei tedesca?\nTu: No, non sono tedesca, ma coreana. Sono di Seul.\nRicercatore: Scusami, mi sono sbagliato!\nTu: Tranquillo, non c\'è problema.',
      '"Tranquillo / tranquilla" (literally "calm") is the casual Italian reassurance — "it\'s fine" — common after any small mistake or apology.',
      [
        { target: 'non… ma…', note: 'the standard three-part polite correction pattern from Grammar III' },
        { target: 'tranquillo / non c\'è problema', note: 'casual reassurance ("don\'t worry / no problem"); standard response to a small apology' },
        { target: 'scusami / mi scusi', note: '"sorry" — scusami (informal tu), mi scusi (formal Lei)' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
