// Level 1 Unit 1 — Greetings & Self-Introduction (Filipino/Tagalog)
// Functions: greeting, introducing yourself, asking where someone is from,
// correcting a wrong assumption, farewells, basic po/opo politeness.
// This lesson is the canonical TEMPLATE for all Filipino thematic Level 1 lessons.
//
// All content is authored with Filipino (Latin script) + a pronunciation respelling +
// English glosses (canonical source). The AI conversation tutor reads this
// curriculum and delivers it to each learner in their preferred native
// language at runtime — never assume a specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition.

const createContentItem = (
  target,
  pron,
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
  romanization: pron,
  nativeText: note,
  pronunciation: pron,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'fil-l1u1-orientation',
  pronunciation: 'fil-l1u1-pronunciation',
  vocabularyGreetings: 'fil-l1u1-vocab-greetings',
  vocabularyPeople: 'fil-l1u1-vocab-people',
  grammarAko: 'fil-l1u1-grammar-ako',
  grammarSiAng: 'fil-l1u1-grammar-si-ang',
  grammarTagaPo: 'fil-l1u1-grammar-taga-po',
  reading: 'fil-l1u1-reading',
  listening: 'fil-l1u1-listening',
  writing: 'fil-l1u1-writing',
  culture: 'fil-l1u1-culture',
  task: 'fil-l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet someone in Filipino across three registers (casual peer, polite with pô, formal with opò and family titles) so you can match the situation.',
      'Introduce yourself with name, hometown, and one role (estudyante / guro / inhinyero) using the ako si… and ako ay… patterns.',
      'Ask another person their name and where they are from, then respond appropriately to their answer using taga-… constructions.',
      'Use pô and opò correctly when addressing elders, strangers, or anyone deserving respect.',
    ],
    task: 'Picture your first day at UP Diliman — you walk into a research meeting and meet a visiting professor from Cebu. By the end of this lesson you should handle the whole exchange in Filipino without rehearsing each line, including the pô markers an older interlocutor will expect.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce the glottal-stop endings on pô and opò automatically — getting these right is what makes a learner sound respectful rather than blunt.',
      'Apply penultimate stress on the foundational names (Maria → ma-RI-a; Manila → ma-NI-la; Cebu → se-BU) rather than English-style initial stress.',
      'Pronounce the ng phoneme as a single sound, including the difficult initial ng in ngayon "now".',
      'Distinguish the digraph ng (one sound, inside a word) from the marker ng (pronounced /naŋ/, the genitive/object case marker).',
    ],
    task: 'Read each example aloud and identify whether a glottal stop applies, then pronounce the spoken version. Drill pô / opò repeatedly until the final glottal feels automatic.',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 12 greetings and farewells across three registers, with the right phrase for each situation.',
      'Distinguish Magandang umaga (peer/standard) from Magandang umaga pô (with elders/strangers) — using the wrong register signals disrespect (no pô) or excessive distance (over-formal among peers).',
      'Use time-of-day greetings (umaga, hapon, gabi) appropriately — Filipino has a single template (Magandang ___) filled with the time word.',
    ],
    task: 'Say each phrase out loud three times with the correct stress and pô-glottal, then pair each one with the situation where you would use it.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and origins',
    goals: [
      'Use the 8 personal pronouns in the ang case (ako / ikaw-ka / siya / kami / tayo / kayo / sila) — Filipino has THREE case sets but ang is the one used for subject in this lesson.',
      'State your role (estudyante / guro / doktor / inhinyero) and your origin (taga-Maynila, taga-Cebu, taga-Amerika) in a complete short sentence.',
      'Know the difference between kami (we, excluding you) and tayo (we, including you) — a feature English does not have.',
    ],
    task: 'Say your own role and origin using the Ako ay … / Taga-… pattern, then describe one classmate using Siya ay … / Taga-… patterns.',
  },
  {
    id: ACT.grammarAko,
    section: 'Grammar I',
    title: 'Ang pronouns and the ay-inversion',
    goals: [
      'Use the eight ang-case pronouns (ako, ikaw/ka, siya, kami, tayo, kayo, sila) — these mark the SUBJECT or topic of the sentence.',
      'Form a basic identification sentence with two patterns: (a) Ako si Maria "I am Maria" (predicate-first, more common in speech) and (b) Ako ay si Maria (with the literary linker ay, less common in speech, standard in writing).',
      'Know that ka is a special "weak" form of ikaw used after the predicate: Estudyante ka ba? "Are you a student?" — never *Estudyante ikaw ba.',
    ],
    task: 'Write six sentences using ako, ka, siya, and the ay-inversion, then say them aloud with both predicate-first and ay-inverted forms.',
  },
  {
    id: ACT.grammarSiAng,
    section: 'Grammar II',
    title: 'Si vs Ang — case markers for personal vs common names',
    goals: [
      'Use si before a personal name (si Maria, si Juan) and ang before a common noun (ang estudyante, ang guro). These are the singular-subject markers in the ang case.',
      'Use sina (plural personal) and ang mga (plural common) — sina Maria at Juan "Maria and Juan", ang mga estudyante "the students".',
      'Form yes/no questions with the particle ba placed AFTER the predicate — Filipino question particles do not invert word order.',
    ],
    task: 'Construct three identification sentences using si and ang correctly, then turn one into a yes/no question with ba.',
  },
  {
    id: ACT.grammarTagaPo,
    section: 'Grammar III',
    title: 'Taga- origin prefix and the pô/opò politeness system',
    goals: [
      'Use the prefix taga- attached to a place name to mean "from (that place)": taga-Maynila "from Manila", taga-Cebu "from Cebu", taga-Amerika "from America".',
      'Apply pô as a politeness marker that can be inserted into almost any sentence addressed to an elder, stranger, or superior — Magandang umaga pô, salamat pô, opò.',
      'Use opò "yes (respectful)" and hindî pô "no (respectful)" when responding to an elder.',
      'Know that omitting pô when speaking to an elder is felt as rude; using pô peer-to-peer is felt as overly formal or sarcastic.',
    ],
    task: 'Imagine an older woman asks where you are from. Respond using taga-… and pô; then imagine a peer asks the same — respond without pô.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a self-introduction',
    goals: [
      'Read a short self-introduction paragraph aloud with correct stress, glottal stops on pô, and natural rhythm.',
      'Answer comprehension questions about the speaker\'s name, city, role, and family using oo / hindî / opò / hindî pô short answers as appropriate.',
    ],
    task: 'Read the paragraph aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first meeting',
    goals: [
      'Follow a 4-turn first-meeting dialogue and recognize the casual vs polite register markers (presence/absence of pô, ate/kuya/tito titles, ay-inversion).',
      'Reproduce the dialogue with your own name and city, swapping in the relevant phrases naturally.',
    ],
    task: 'Read the polite dialogue along with the AI tutor first, then perform it again with your own information swapped in, paying attention to whether to use pô.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own self-introduction',
    goals: [
      'Write 3–5 sentences in Filipino covering greeting, name, city, role, and one extra fact.',
      'Use si or ang correctly at least twice and use the taga- prefix at least once to demonstrate the core grammar of this lesson.',
    ],
    task: 'Write your own self-introduction in 3–5 sentences using the model on the left, then read it aloud with correct stress and pô-glottals where appropriate.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Pô, opò, kinship titles, and the "Filipino time" register',
    goals: [
      'Know that pô (politeness particle) and opò (respectful "yes") are obligatory when speaking to elders, strangers significantly older than you, government officials, teachers, and your friends\' parents — using them is a sign of basic upbringing (kapwa-tao "fellow person").',
      'Use kinship titles even for non-relatives: Ate (older sister, any slightly-older woman), Kuya (older brother, any slightly-older man), Tito/Tita (uncle/aunt, often any older adult family-friend), Lolo/Lola (grandfather/grandmother). Calling a stranger Ate at a sari-sari store is normal politeness.',
      'Notice that Filipino communication tends to be indirect, group-oriented, and harmony-preserving — refusing directly is uncomfortable; "I will try" (susubukan ko) often means a polite "no". This is part of hiyà (sense of propriety/shame) and pakikisama (going along with the group).',
    ],
    task: 'Decide how you would address (1) a classmate named Juan, (2) a slightly-older saleswoman at a sari-sari store, (3) your friend\'s mother, (4) a 70-year-old neighbor. Give the full Filipino form of address for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day at UP Diliman — in Filipino',
    goals: [
      'Combine everything from this lesson into one continuous scene with no break between greeting, introduction, question, answer, correction, and farewell.',
      'Use the correct register (polite with pô / casual without) based on the relationship; switch registers mid-conversation if the interlocutor turns out to be older than expected.',
    ],
    task: 'Roleplay your first day at the University of the Philippines Diliman with the AI tutor playing a visiting professor from Cebu; aim for a 6-turn exchange in Filipino with appropriate pô markers.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 1: Magandang Umaga — Greetings and Self-Introduction',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'fil',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (Magandang umaga / Kumusta / Paalam) and match the register to the relationship.' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, origin, and one fact about yourself in two short sentences using ako si… and taga-…' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask Taga-saan ka? or Saan ka galing? and respond naturally with taga- + place.' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use the hindî …, … pattern to politely correct a wrong guess about your origin or role.' },
    { id: 'showing-respect', label: 'Showing respect with po/opo', goal: 'Insert pô into sentences addressed to elders, strangers, or superiors; reply with opò for "yes".' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Layunin ng aralin',
      'la-YU-nin ng a-RA-lin',
      'By the end of this lesson, you can greet someone in Filipino, give your name, say where you are from, ask the same back, correct a wrong guess, and farewell — all in one short conversation, with the correct pô/opò register for the situation.',
      'word',
      'Functional language: bumati (greet) · magpakilala (introduce yourself) · magtanong tungkol sa pinagmulan (ask origin) · iwasto (correct) · magpaalam (farewell)',
      'These five micro-skills are the spine of every social encounter in Filipino — once they\'re automatic, every later lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      'Tunay na sitwasyon',
      'TU-nay na sit-wa-SYON',
      'You are at the University of the Philippines Diliman on your first day and a visiting professor from Cebu turns to you in the lab. The whole encounter takes about 30 seconds and you will need every micro-skill from this lesson — including correctly inserting pô because the professor is significantly older than you.',
      'word',
      'Propesor: "Magandang umaga. Ako si Dr. Reyes. Taga-saan ka?"',
      'A typical opener from a Filipino senior academic: time-of-day greeting + name + immediate origin question — a common pattern in Philippine academic culture.',
      [
        { target: 'Magandang umaga', note: 'time-of-day greeting; safe with peers, colleagues, and most professional contexts before about 11 AM' },
        { target: 'Ako si…', note: 'self-introduction with the personal-name marker si; standard pattern for introducing yourself' },
        { target: 'Taga-saan ka?', note: 'literal: "from-where you?"; standard origin question using the taga- prefix' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      'Tatlong antas ng paggalang',
      'TAT-long an-TAS ng pag-ga-LANG',
      'Filipino distinguishes three rough politeness registers. Casual (peers, friends): Kumusta? / Ikaw? / Paalam. Polite (workplace, first meetings): Magandang umaga / Ikaw o ka / Salamat. Formal/respectful with elders: pô added throughout — Magandang umaga pô / opò / Salamat pô.',
      'word',
      'Kumusta (casual) / Magandang umaga (polite) / Magandang umaga pô (respectful) — same greeting function, three social levels.',
      'Adding pô mid-conversation signals increased respect; dropping pô signals familiarity or, worse, dismissal.',
      [
        { target: 'CASUAL: Kumusta, Hi, Hoy', note: 'use with peers, close friends, and clearly informal settings' },
        { target: 'POLITE: Magandang umaga / hapon / gabi', note: 'the safe default for first meetings, workplace, and customer-facing situations' },
        { target: 'RESPECTFUL: + pô / opò', note: 'reserved for elders, strangers, teachers, parents-of-friends, government officials, ceremonies' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Pô',
      'POH (with final glottal stop)',
      'The single most important politeness marker in Filipino. Always pronounced with a glottal stop at the end — the "catch in the throat" — even though most everyday writing does not mark it. Without the glottal stop, the word does not carry its respect function.',
      'word',
      'Salamat pô. → /saˈlamat poʔ/',
      'You will use pô in nearly every sentence addressed to an elder. Drill the glottal until automatic.',
      [
        { target: 'pô — final glottal stop /ʔ/', note: 'the "uh-oh" catch at the end; not written but always pronounced' },
        { target: 'penultimate stress fail', note: 'pô is a single syllable, so stress applies only to neighboring words' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'Opò',
      'o-POH (penultimate stress + final glottal)',
      'The respectful "yes" said to elders, strangers, or superiors. Stress on the second syllable, final glottal stop. Distinct from oo (peer "yes", penultimate stress, no glottal). Saying "oo" to your grandmother when she expects opò signals rudeness.',
      'word',
      'Opò, kumain na pô ako. → /oˈpoʔ kuˈmain na poʔ ʔaˈko/',
      '"Yes, I have already eaten" — common response when a lola asks if you have eaten. Both opò and ako-context pô carry the respect.',
      [
        { target: 'opò vs oo', note: 'opò = respectful yes (with glottal); oo = peer yes (no glottal)' },
        { target: 'final glottal essential', note: 'without it, you sound peer-level — inappropriate to elders' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'Ngayon',
      'nga-YON',
      '"Now / today". Begins with the velar nasal /ŋ/ — a single phoneme that English speakers tend to split into n+g. Final stress (mabilis); the second syllable is the loud one.',
      'word',
      'Anong oras na ngayon? → /aˈnoŋ ʔoˈras na ŋaˈjon/',
      '"What time is it now?" — a foundational phrase that drills the ng-initial phoneme and the use of na "already / now".',
      [
        { target: 'ng /ŋ/ initial', note: 'single velar nasal, not n+g; back of tongue against soft palate before the vowel' },
        { target: 'final stress', note: 'nga-YON not NGA-yon; characteristic of mabilis stress pattern' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'Maganda',
      'ma-gan-DA (final stress) o ma-GAN-da (penultimate)',
      '"Beautiful / good". Used in greetings (Magandang umaga "Good morning"). Standard pronunciation puts penultimate stress (ma-GAN-da), but some speakers and the literary form may have final stress. As an adjective + linker -ng, becomes magandang before a noun.',
      'word',
      'Magandang umaga → ma-GAN-dang u-MA-ga',
      'Note the -ng linker fused on maganda + umaga; this is the linker that joins modifier + head in Filipino.',
      [
        { target: 'maganda + -ng linker', note: '-ng attaches when modifier ends in a vowel; -na attaches when it ends in a consonant' },
        { target: 'umaga', note: 'morning (penultimate stress: u-MA-ga); appears with each time-of-day greeting' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'Ang ng (marker)',
      'NANG (pronunciation of the marker)',
      'The grammatical marker spelled "ng" is pronounced /naŋ/ — distinct from the digraph ng inside a word. So libro ng bata "the child\'s book" sounds like /ˈlibro naŋ ˈbataʔ/. Same letters, different role and pronunciation.',
      'word',
      'libro ng bata → "LEE-broh nang BAH-tah"',
      'A foundational case marker; appears in nearly every sentence to mark non-subject nouns.',
      [
        { target: 'ng marker = /naŋ/', note: 'inserted between predicate and non-subject noun; never inside a word' },
        { target: 'ng digraph = /ŋ/', note: 'represents a single sound inside words like ngayon, mango, bahay-bahay' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('Magandang umaga', 'ma-GAN-dang u-MA-ga', '"Good morning". Used from sunrise to about 11 AM. The standard polite greeting; add pô when addressing elders or in formal settings. Without pô, it is the safe default for peers.', 'word', 'Magandang umaga, ate.', '"Good morning, ate" — addressing a slightly-older woman with the kinship title ate (older sister, used for any older woman of similar age).', null, [ACT.vocabularyGreetings]),
    createContentItem('Magandang tanghali', 'ma-GAN-dang tang-HA-li', '"Good noon". Used roughly 11 AM-1 PM. Less common than umaga or hapon; many Filipinos jump from umaga directly to hapon. Adding pô makes it respectful: Magandang tanghali pô.', 'word', 'Magandang tanghali, kuya.', '"Good noon, kuya" — kuya = older brother / any slightly-older man.', null, [ACT.vocabularyGreetings]),
    createContentItem('Magandang hapon', 'ma-GAN-dang HA-pon', '"Good afternoon". Used roughly 1 PM-6 PM. Note hapon also means "Japanese (person)" with different stress — Hapon (Japan/Japanese) is penultimate, hapon (afternoon) is penultimate too but in context never ambiguous. Adding pô for elders.', 'word', 'Magandang hapon pô, lola.', '"Good afternoon, grandma" — pô + lola together: maximum respect register.', null, [ACT.vocabularyGreetings]),
    createContentItem('Magandang gabi', 'ma-GAN-dang ga-BI', '"Good evening". Used from sunset onward. Distinct from "good night" (used as farewell) — Filipino does not strongly separate evening greeting and evening farewell, but adding pô + addressing context clarifies.', 'word', 'Magandang gabi sa inyong lahat.', '"Good evening to all of you" — formal address; inyong = "your (plural respectful)" + linker.', null, [ACT.vocabularyGreetings]),
    createContentItem('Kumusta', 'ku-mus-TA', '"How are you?" From Spanish "¿Cómo está?". Used as both a greeting and an actual inquiry. Standard answer: Mabuti naman, salamat "I\'m well, thanks". Casual register; works peer-to-peer and with friendly elders.', 'word', 'Kumusta ka? — Mabuti naman, salamat.', '"How are you? — I\'m well, thanks." — universal exchange.', null, [ACT.vocabularyGreetings]),
    createContentItem('Kumusta pô kayo', 'ku-mus-TA pô ka-YO', 'Respectful version of "how are you?". Two markers of respect: pô + kayo (plural/respectful "you"). Used with elders, strangers, or anyone you wish to address with extra deference.', 'word', 'Kumusta pô kayo, lolo? — Mabuti naman pô, salamat.', 'Note the pô in both turns; the entire exchange stays in the respectful register.', null, [ACT.vocabularyGreetings]),
    createContentItem('Mabuti', 'ma-BU-ti', '"Well / good / fine". The standard answer to kumusta. Often expanded to "Mabuti naman" (well-naman, with the contrastive particle naman = "actually / on the other hand") which softens any implication and sounds friendlier than bare mabuti.', 'word', 'Kumusta? — Mabuti naman, ikaw?', '"How are you? — I\'m well actually, you?" — note the ikaw "you" reciprocating the question.', null, [ACT.vocabularyGreetings]),
    createContentItem('Hello / Hi', 'HE-low / HAY', 'English-borrowed greetings used freely in casual Filipino, especially among urban younger speakers. Not respectful — never use these alone with elders. Often combined: "Hi, kumusta?"', 'word', 'Hi, kumusta?', 'Casual peer opener — combines English Hi with Filipino kumusta; very common in Taglish.', null, [ACT.vocabularyGreetings]),
    createContentItem('Ikinagagalak kong makilala ka', 'i-ki-na-ga-GA-lak kong ma-ki-LA-la ka', '"I am happy to meet you". A formal-register first-meeting phrase. More common in writing and formal speech than in casual conversation, where Filipinos may just say "Hi, ako si…". Polite version: Ikinagagalak kong makilala kayo (kayo instead of ka).', 'word', 'Ikinagagalak kong makilala ka, Maria.', 'Formal first-meeting; in casual settings, "Hi, ako si Juan" is more typical.', null, [ACT.vocabularyGreetings]),
    createContentItem('Paalam', 'pa-A-lam', '"Goodbye / farewell". A polite formal farewell. More deliberate than casual "Bye" or "Sige" (literally "OK / go ahead"). Used in writing, broadcasts, and formal situations.', 'word', 'Paalam pô, hanggang sa muli.', '"Goodbye, until we meet again" — formal register; very common closing line in formal letters or speeches.', null, [ACT.vocabularyGreetings]),
    createContentItem('Sige', 'SI-ge', '"OK / alright / go ahead", often functions as casual goodbye. The most common everyday "bye" among peers — Sige na nga "OK then", Sige, mauna na ako "OK, I\'ll go ahead". Extremely high frequency.', 'word', 'Sige, kita-kits.', '"OK, see ya" — kita-kits is reduplicated kita "we see each other", informal "see ya".', null, [ACT.vocabularyGreetings]),
    createContentItem('Babay / Bye', 'BAY-bay / BAY', 'Casual English-borrowed farewell. Always informal; never used with elders alone. Common between peers, family members of the same generation, and on the phone.', 'word', 'Bye, sa uulitin.', '"Bye, till next time" — sa uulitin = future-reduplicated "to be repeated", "till next time".', null, [ACT.vocabularyGreetings]),
    createContentItem('Hanggang sa muli', 'hang-GANG sa mu-LI', '"Until we meet again". Formal/sentimental farewell. Used in writing and formal speeches; rare in everyday casual speech. Combine with paalam for maximum formality.', 'word', 'Paalam, hanggang sa muli.', 'Formal farewell pair; common closing for radio broadcasts and formal letters.', null, [ACT.vocabularyGreetings]),
    createContentItem('Ingat ka', 'I-ngat ka', '"Take care". Said as you part ways, especially if the other person is going somewhere. Adding pô for respect: Ingat pô kayo. A warmer, more personal farewell than plain paalam.', 'word', 'Ingat ka sa daan.', '"Take care on the road" — typical farewell when someone is heading home, especially at night.', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People, roles, origins
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ako', 'a-KO', 'First-person singular pronoun in the ang case (used as subject of identification sentences). Filipino has THREE case sets — ako is the "topic / subject" form. The corresponding ng-case form is ko and the sa-case form is akin/sa akin.', 'word', 'Ako si Maria. Estudyante ako.', '"I am Maria. I am a student." — two ways to use ako: as the predicate-fronted subject (Ako si…) and as the post-predicate subject (Estudyante ako).', null, [ACT.vocabularyPeople]),
    createContentItem('ikaw / ka', 'i-KAW / KA', 'Second-person singular pronoun in the ang case. IKAW is the "strong" form used at the start of a sentence or in isolation. KA is the "weak" form used AFTER the predicate. Same meaning, different syntactic positions: Ikaw ay estudyante. = Estudyante ka.', 'word', 'Ikaw ba si Maria? — Oo, ako nga. / Estudyante ka ba?', 'Casual register; with elders, switch to the plural/respectful kayo.', null, [ACT.vocabularyPeople]),
    createContentItem('kayo', 'ka-YO', 'Second-person plural pronoun in the ang case, also used as the SINGULAR RESPECTFUL "you" (like French vous, Spanish usted). Use with elders, strangers, customers, anyone you wish to honor. Plural function: addressing two or more people.', 'word', 'Taga-saan pô kayo? / Saan kayo galing?', '"Where are you (respectful/plural) from?" — kayo + pô = double respect register.', null, [ACT.vocabularyPeople]),
    createContentItem('siya', 'shi-YA', 'Third-person singular pronoun in the ang case. NO GENDER — siya covers he, she, AND they-singular. Filipino does not grammatically mark gender. Context tells you which the speaker means.', 'word', 'Siya si Maria. / Siya ang guro namin.', '"This is Maria. / She is our teacher." — siya is gender-neutral; only the name/context indicates female.', null, [ACT.vocabularyPeople]),
    createContentItem('kami', 'ka-MI', 'First-person plural EXCLUSIVE pronoun in the ang case. "We" not including the listener. Crucial distinction from tayo — Kami ay magkakaibigan "We (excluding you) are friends" implies the listener is NOT part of the group.', 'word', 'Kami ay taga-Maynila, sila ay taga-Cebu.', '"We (not you) are from Manila, they are from Cebu" — kami specifies the listener is outside the group.', null, [ACT.vocabularyPeople]),
    createContentItem('tayo', 'TA-yo', 'First-person plural INCLUSIVE pronoun in the ang case. "We" INCLUDING the listener. Kain na tayo "Let\'s eat (you and me)" is friendly; Kain na kami "We are eating (you not invited)" is rude.', 'word', 'Tayo na sa palengke. / Mga Pilipino tayo.', '"Let\'s go to the market." / "We are Filipinos" — both include the listener.', null, [ACT.vocabularyPeople]),
    createContentItem('sila', 'si-LA', 'Third-person plural pronoun in the ang case. "They" (any group, any gender). Like siya, sila is gender-neutral. Plural counterpart of siya.', 'word', 'Sila ang mga estudyante mula sa Cebu.', '"They are the students from Cebu" — sila + plural marker mga + place.', null, [ACT.vocabularyPeople]),
    createContentItem('estudyante', 'es-tud-YAN-te', '"Student". From Spanish "estudiante". The standard word at all levels (primary, high school, university, postgraduate). Older Tagalog "mag-aaral" exists but estudyante is more common in everyday speech.', 'word', 'Estudyante ako sa UP Diliman.', '"I am a student at UP Diliman" — UP = University of the Philippines, the country\'s premier university; Diliman is the main campus in Quezon City.', null, [ACT.vocabularyPeople]),
    createContentItem('guro', 'gu-RO', '"Teacher". A native Tagalog word, used at all levels of education. More formal: "titser" (from English "teacher"). Most schools use "Ma\'am / Sir" as direct address, not guro.', 'word', 'Si Ma\'am Reyes ay guro namin sa Filipino.', '"Ma\'am Reyes is our Filipino teacher" — direct address Ma\'am + family name is standard in classrooms.', null, [ACT.vocabularyPeople]),
    createContentItem('doktor', 'dok-TOR', '"Doctor". From Spanish "doctor" / English "doctor". Used both as profession and as title before a family name: Dr. Reyes / Doktor Reyes. For female doctors: Doktora (Dra. Reyes).', 'word', 'Si Dr. Santos ay doktor sa PGH.', '"Dr. Santos is a doctor at PGH" — PGH = Philippine General Hospital, the main public hospital.', null, [ACT.vocabularyPeople]),
    createContentItem('inhinyero', 'in-hin-YE-ro', '"Engineer". From Spanish "ingeniero". Used as a profession word; the title "Engineer" is often used in formal address: Engr. Cruz / Inhinyero Cruz. Female: inhinyera.', 'word', 'Inhinyero ang tatay ko.', '"My father is an engineer" — tatay = father (Spanish-origin); ko = my (ng-case pronoun).', null, [ACT.vocabularyPeople]),
    createContentItem('nars', 'NARS', '"Nurse". From English "nurse", nativized in spelling. The Philippines exports many nurses to the US, UK, and Middle East; nars is a high-prestige profession word socially.', 'word', 'Nars siya sa Saudi.', '"She is a nurse in Saudi (Arabia)" — common OFW (Overseas Filipino Worker) context.', null, [ACT.vocabularyPeople]),
    createContentItem('Pilipino', 'pi-li-PI-no', '"Filipino (a person)". Refers to a person from the Philippines, regardless of gender (older usage Pilipina for female has fallen out of mainstream speech). Also the older name for the national language (now officially "Filipino").', 'word', 'Pilipino ako, taga-Cebu.', '"I am Filipino, from Cebu" — note the distinction: Pilipino = ethnic/national identity; Cebuano = regional origin and language.', null, [ACT.vocabularyPeople]),
    createContentItem('Amerikano', 'a-me-ri-KA-no', '"American". From Spanish "americano". Refers to a person from the US. Female: Amerikana. Note the older usage where "Kano" is a casual short form (sometimes pejorative).', 'word', 'Amerikano si Mike, taga-California.', '"Mike is American, from California" — taga- attached to any place name.', null, [ACT.vocabularyPeople]),
    createContentItem('Koreano', 'ko-re-A-no', '"Korean". From Spanish "coreano". Korea is a major migration and tourism source for the Philippines; Korean residents in cities like Manila and Angeles are visible communities.', 'word', 'Marami nang Koreano sa Maynila.', '"There are many Koreans in Manila now" — marami = many; nang here = "already".', null, [ACT.vocabularyPeople]),
    createContentItem('Tsino', 'TSI-no', '"Chinese". From Spanish "chino". Filipino-Chinese (Tsinoy) is a large, deeply integrated community — Chinese-Filipinos have been in the islands for centuries and contributed enormously to commerce.', 'word', 'Tsino-Pilipino siya, lumaki sa Binondo.', '"She is Chinese-Filipino, grew up in Binondo" — Binondo is the world\'s oldest Chinatown, founded 1594 in Manila.', null, [ACT.vocabularyPeople]),
    createContentItem('Hapon', 'HA-pon', '"Japanese". From Spanish "japón". Note the same-spelling-different-meaning trap: hapon (afternoon, common noun) vs Hapon (Japan/Japanese, proper noun). Context and capitalization distinguish.', 'word', 'Si Yuki ay Hapon, taga-Tokyo.', '"Yuki is Japanese, from Tokyo" — Hapon capitalized as proper noun.', null, [ACT.vocabularyPeople]),
    createContentItem('Pangalan', 'pa-nga-LAN', '"Name". A foundational vocabulary word for self-introduction. Used in the phrases Ano ang pangalan mo? "What is your name?" and Ang pangalan ko ay… "My name is…".', 'word', 'Ano pô ang pangalan ninyo?', 'Respectful "What is your name?" — pô + ninyo (plural-respectful "your") to an elder.', null, [ACT.vocabularyPeople]),
    createContentItem('pamilya', 'pa-MIL-ya', '"Family". From Spanish "familia", nativized (Spanish /f/ → /p/ in older borrowings). Family is a core value; extended family (kuya, ate, tito, tita, lolo, lola, ninong, ninang) all matter.', 'word', 'Malaki ang pamilya namin — anim na magkakapatid.', '"Our family is big — six siblings" — typical Filipino family size in older generations.', null, [ACT.vocabularyPeople]),
    createContentItem('kaibigan', 'ka-i-BI-gan', '"Friend". Antepenultimate stress (ka-i-BI-gan). Compare to kaibígan (penultimate stress, "sweetheart/lover") — stress shift changes meaning entirely. Plural: mga kaibigan / magkakaibigan "friends with each other".', 'word', 'Si Maria ay kaibigan ko, hindi kaibígan.', '"Maria is my friend, not my sweetheart" — joke based on the stress contrast.', null, [ACT.vocabularyPeople]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: ang pronouns + ay
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Ang case pronouns',
      'ang-case pronouns',
      'Filipino has THREE pronoun case sets (ang/ng/sa) — this unit teaches the ANG case, used for the subject/topic of the sentence. The eight pronouns: ako (I), ikaw/ka (you-sing), siya (he/she/they-sing, no gender), kami (we-excl), tayo (we-incl), kayo (you-pl/respectful), sila (they).',
      'sentence',
      'Ako, ikaw/ka, siya, kami, tayo, kayo, sila — all ang-case pronouns.',
      'Memorize all 8 as a block; they appear in every conversation. The ng-case (ko, mo, niya…) and sa-case (akin, iyo, kanya…) come in later lessons.',
      [
        { target: 'ako', note: 'I — strong form, used anywhere' },
        { target: 'ikaw / ka', note: 'you-singular — ikaw at start, ka after predicate' },
        { target: 'siya', note: 'he / she / they-singular — gender-neutral' },
        { target: 'kami', note: 'we (excluding you) — listener NOT included' },
        { target: 'tayo', note: 'we (including you) — listener IS included' },
        { target: 'kayo', note: 'you-plural OR you-singular-respectful' },
        { target: 'sila', note: 'they — gender-neutral' },
      ],
      [ACT.grammarAko],
    ),
    createContentItem(
      'Predicate-first order (basic)',
      'predicate before subject',
      'Filipino is a PREDICATE-INITIAL language. The default order is PREDICATE + SUBJECT (the opposite of English). Estudyante ako "I am a student" literally "Student I". The information you want to emphasize goes FIRST.',
      'sentence',
      'Estudyante ako. / Maganda siya. / Pilipino kami.',
      'Three identification sentences, all predicate-first. The predicate (estudyante, maganda, Pilipino) comes BEFORE the subject (ako, siya, kami).',
      [
        { target: 'Estudyante ako', note: 'literally "Student I" — predicate Estudyante, subject ako' },
        { target: 'Maganda siya', note: 'literally "Beautiful she/he" — predicate Maganda, subject siya' },
        { target: 'Pilipino kami', note: 'literally "Filipino we-exclusive"' },
      ],
      [ACT.grammarAko],
    ),
    createContentItem(
      'Ay-inversion (literary/formal)',
      'ay-inversion (formal)',
      'The marker AY allows you to put the SUBJECT FIRST and the predicate second — a more English-like word order. Common in writing, speeches, news broadcasts. Less common in everyday speech. Ako ay estudyante = Estudyante ako = "I am a student".',
      'sentence',
      'Ako ay estudyante. / Si Maria ay guro. / Ang Pilipinas ay maganda.',
      'All three use ay-inversion. In casual speech, drop ay: Ako estudyante or just Estudyante ako.',
      [
        { target: 'AY = formal linker', note: 'no English direct equivalent; functions like "is/are" in English' },
        { target: 'Subject + AY + Predicate', note: 'literary order; the casual-speech order drops AY' },
        { target: 'use in writing', note: 'news, essays, formal letters; less common in spoken Filipino' },
      ],
      [ACT.grammarAko],
    ),
    createContentItem(
      'Strong vs weak ikaw / ka',
      'ikaw vs ka',
      'Both mean "you (singular)". IKAW is the STRONG form: used at the start of a sentence or in isolation. KA is the WEAK form: appears AFTER the predicate. You cannot say *Estudyante ikaw — must be Estudyante ka. You cannot say *Ka ba ay…— must be Ikaw ba ay….',
      'sentence',
      'Ikaw ay estudyante. = Estudyante ka. = "You are a student."',
      'Three equivalent ways to say "you are a student" — first ay-inversion with ikaw, second predicate-first with ka, both using the strong vs weak distinction correctly.',
      [
        { target: 'IKAW (strong) — sentence-initial', note: 'used at start of sentence: Ikaw ay…, Ikaw ba?' },
        { target: 'KA (weak) — after predicate', note: 'used after the predicate: Estudyante ka, Maganda ka' },
        { target: 'never *Estudyante ikaw', note: 'cannot use ikaw after predicate; always ka' },
      ],
      [ACT.grammarAko],
    ),
    createContentItem(
      'Kami vs tayo',
      'KA-mi vs TA-yo',
      'CRITICAL distinction. KAMI = we EXCLUDING you (the listener). TAYO = we INCLUDING you (the listener). English "we" is ambiguous; Filipino forces you to specify. Using kami when you mean tayo (or vice versa) is a common learner mistake that natives notice immediately.',
      'sentence',
      'Kain na tayo (let\'s eat — together) / Kain na kami (we are eating — you are not invited).',
      'A classic minimal-pair example: changing kami → tayo turns a polite invitation into an unfriendly statement.',
      [
        { target: 'KAMI = EXCL we', note: 'listener NOT part of the "we" — "we (not you)"' },
        { target: 'TAYO = INCL we', note: 'listener IS part of the "we" — "we (including you)"' },
        { target: 'invitation = TAYO', note: 'invitations always use tayo: Tara, tayo na "Come on, let\'s go"' },
      ],
      [ACT.grammarAko],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: si / ang and ba questions
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Si — personal name marker',
      'SI',
      'Si is the ang-case marker for PERSONAL NAMES (singular). Used immediately before a person\'s name: Si Maria, Si Juan, Si Dr. Reyes. Without si, the name is bare and feels ungrammatical in subject position.',
      'sentence',
      'Si Maria ay guro. = Guro si Maria. = "Maria is a teacher."',
      'Same identification, two orders. Both require si before the personal name Maria.',
      [
        { target: 'SI + personal name (sing)', note: 'singular personal-name marker for ang case' },
        { target: 'never *Maria ay guro', note: 'bare personal name as subject is ungrammatical; need si' },
      ],
      [ACT.grammarSiAng],
    ),
    createContentItem(
      'Sina — plural personal name marker',
      'SI-na',
      'Sina is the plural counterpart of si — used for multiple personal names: Sina Maria at Juan = "Maria and Juan". Pronounce sina /ˈsina/, two syllables.',
      'sentence',
      'Sina Maria at Juan ay magkapatid.',
      '"Maria and Juan are siblings" — sina marks both names as the plural subject.',
      [
        { target: 'SINA + multiple personal names', note: 'plural personal-name marker' },
        { target: 'at = "and"', note: 'conjunction linking the names' },
      ],
      [ACT.grammarSiAng],
    ),
    createContentItem(
      'Ang — common noun marker',
      'ANG',
      'Ang is the ang-case marker for COMMON NOUNS (singular). Used before non-name nouns: ang estudyante, ang guro, ang bahay. Equivalent to English "the" plus subject role.',
      'sentence',
      'Ang estudyante ay nasa silid-aralan.',
      '"The student is in the classroom" — ang marks estudyante as the subject; nasa = "is at / is in" (sa-case existential).',
      [
        { target: 'ANG + common noun', note: 'definite-subject marker for common nouns' },
        { target: 'ANG vs SI', note: 'ang for common nouns; si for personal names' },
      ],
      [ACT.grammarSiAng],
    ),
    createContentItem(
      'Ang mga — plural common noun marker',
      'ANG MA-nga',
      'Ang mga (pronounced ang ma-NGA) is the plural form of ang — "the [plural common noun]". Mga is the universal plural marker for common nouns (not pronouns). Ang mga estudyante "the students".',
      'sentence',
      'Ang mga estudyante ay marami.',
      '"The students are many" — ang mga marks the plural subject; marami = "many".',
      [
        { target: 'MGA = plural marker', note: 'attached before any common noun to make it plural' },
        { target: 'pronounced /maˈŋa/', note: 'short m + ng + a; ng is single sound' },
      ],
      [ACT.grammarSiAng],
    ),
    createContentItem(
      'Ba — yes/no question particle',
      'BA',
      'Form a yes/no question by inserting the particle BA after the FIRST major word of the sentence (usually the predicate). Word order does NOT change otherwise. Estudyante ka. → Estudyante ka BA? "Are you a student?"',
      'sentence',
      'Estudyante ka ba? / Maganda ba siya? / Pilipino ba kayo?',
      'Three yes/no questions — ba inserted after predicate (estudyante), after predicate-pronoun (maganda + ba), after predicate (Pilipino).',
      [
        { target: 'BA = yes/no question', note: 'inserts after predicate or first content word' },
        { target: 'word order unchanged', note: 'unlike English "Are you…?" — no inversion needed' },
        { target: 'short answer: Oo / Hindî', note: 'Oo = yes (peer), Hindî = no; with elder: Opò / Hindî pô' },
      ],
      [ACT.grammarSiAng],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: taga- + po system
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Taga- prefix',
      'TA-ga-',
      'The prefix taga- attached to a place name means "from (that place) / native of". Taga-Maynila = "from Manila", Taga-Cebu = "from Cebu", Taga-Amerika = "from America", Taga-saan = "from where?".',
      'sentence',
      'Taga-saan ka? — Taga-Quezon City ako.',
      '"Where are you from? — I\'m from Quezon City" — taga-saan is the standard origin question; answer with taga- + place.',
      [
        { target: 'taga- + place', note: 'prefix forming origin adjectives/nouns' },
        { target: 'taga-saan = "from where"', note: 'saan = where; taga-saan = "native of where"' },
        { target: 'no hyphen variant: tagaMaynila', note: 'sometimes written without hyphen; both correct' },
      ],
      [ACT.grammarTagaPo],
    ),
    createContentItem(
      'Saan ka galing?',
      'SA-an ka GA-ling',
      'Alternative origin question: "where are you coming from?" galing = "from / coming from / origin". Saan ka galing? has a slightly different nuance than Taga-saan ka? — the former asks about recent movement, the latter about ethnic/origin identity.',
      'sentence',
      'Saan ka galing? — Galing ako sa UP. / Taga-saan ka? — Taga-Cebu ako.',
      'Saan ka galing? = where did you just come from (recent location). Taga-saan ka? = where are you originally from (identity).',
      null,
      [ACT.grammarTagaPo],
    ),
    createContentItem(
      'Pô — respect marker',
      'POH',
      'The universal politeness particle, inserted into sentences addressed to ELDERS, STRANGERS, TEACHERS, PARENTS-OF-FRIENDS, CUSTOMERS in service contexts, and any SUPERIOR. Always pronounced with final glottal stop. Functions like an honorific overlay — does not translate but signals respect throughout the sentence.',
      'sentence',
      'Salamat pô. / Magandang umaga pô. / Hindî pô ako estudyante.',
      'Three sentences with pô inserted. Notice pô can come at the end (Salamat pô), after the first word (Magandang umaga pô), or after a particle (Hindî pô).',
      [
        { target: 'pô — placement', note: 'flexible; typically after first major word or at end' },
        { target: 'OBLIGATORY with elders', note: 'omitting pô when talking to an elder is felt as rude' },
        { target: 'NOT used peer-to-peer', note: 'using pô with peers can feel over-formal or sarcastic' },
      ],
      [ACT.grammarTagaPo],
    ),
    createContentItem(
      'Opò vs oo',
      'o-POH vs O-o',
      'OPÒ = "yes" (respectful, to elder/stranger), with penultimate stress and final glottal. OO = "yes" (peer, casual), with penultimate stress and NO glottal. Using oo to a grandmother signals disrespect; opò signals proper upbringing.',
      'sentence',
      'Lola: "Kumain ka na?" — You: "Opò, lola." vs Peer: "Kumain ka na?" — You: "Oo."',
      'Same question, two different "yes" responses based on relationship. Mismatching causes social friction immediately.',
      [
        { target: 'opò — respectful YES', note: 'final glottal stop; for elders/strangers' },
        { target: 'oo — peer YES', note: 'no glottal; for friends/equals' },
        { target: 'Hindî pô — respectful NO', note: 'NO does not have a special opò-style word; just hindî + pô' },
      ],
      [ACT.grammarTagaPo],
    ),
    createContentItem(
      'Ate, kuya, tito, tita, lolo, lola',
      'A-te, KU-ya, TI-to, TI-ta, LO-lo, LO-la',
      'KINSHIP TITLES used for non-relatives too. Ate = older sister / any slightly-older woman. Kuya = older brother / any slightly-older man. Tito/Tita = uncle/aunt / any much-older family-friend adult. Lolo/Lola = grandfather/grandmother. Using these signals respect proportional to perceived age.',
      'sentence',
      'Sa sari-sari store: "Ate, magkano ang Coke?" — "Singkwenta pesos, kuya."',
      '"At the sari-sari store: \'Ate, how much is the Coke?\' — \'50 pesos, kuya.\'" — strangers using kinship titles is everyday Philippine politeness.',
      [
        { target: 'ate / kuya', note: 'used for anyone slightly older than you (within a generation)' },
        { target: 'tito / tita', note: 'used for adults much older than you (parents\' generation), often unrelated' },
        { target: 'lolo / lola', note: 'used for grandparents-age strangers; very respectful' },
      ],
      [ACT.grammarTagaPo],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Pagbasa: Ang pamilya namin',
      'pag-BA-sa: ang pa-MIL-ya na-MIN',
      'A short self-introduction paragraph that uses ako, si, taga-, pô, opò, and basic identification patterns. Read aloud with penultimate stress on most words and final glottal on pô.',
      'sentence',
      'Magandang umaga pô. Ako pô si Maria Santos. Estudyante pô ako sa University of the Philippines Diliman. Taga-Quezon City pô ako. Ang nanay ko ay guro at ang tatay ko ay inhinyero. May dalawa pô akong kapatid — si Juan, kuya ko, at si Anna, kapatid kong babae. Mahal na mahal namin ang pamilya namin.',
      'Notes: pô throughout (formal/respectful register); si + personal names (Maria, Juan, Anna); ang for common nouns (ang nanay, ang tatay); taga-Quezon City; namin = our (exclusive ng-case); kapatid = sibling (gender-neutral, specified with na lalaki / na babae).',
      [
        { target: 'Magandang umaga pô', note: '"Good morning, sir/ma\'am" — respectful greeting opening' },
        { target: 'Ako pô si Maria Santos', note: '"I am Maria Santos" — ako + pô (respectful) + si (personal-name marker) + name' },
        { target: 'Taga-Quezon City pô ako', note: '"I am from Quezon City" — taga- + place name; QC is the largest city in Metro Manila' },
        { target: 'May dalawa pô akong kapatid', note: '"I have two siblings" — may = "there is/have"; akong = ako + linker -ng' },
        { target: 'Mahal na mahal namin', note: '"We love so much" — mahal "love" reduplicated for intensity; namin = our (exclusive)' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'Mga tanong (comprehension questions)',
      'MA-nga ta-NONG',
      'Four comprehension questions to answer after the reading. Use Oo/Opò/Hindî/Hindî pô as appropriate, then expand with a full sentence.',
      'sentence',
      'Q1: Sino si Maria? Q2: Taga-saan siya? Q3: Estudyante ba si Maria? Q4: Ilan ang kapatid niya?',
      'Sample answers: A1: Si Maria ay estudyante sa UP Diliman. A2: Taga-Quezon City siya. A3: Oo, estudyante siya. A4: Dalawa ang kapatid niya.',
      null,
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening / dialogue
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Diyalogo: Unang pagkikita sa UP',
      'di-YA-lo-go: U-nang pag-ki-ki-TA sa UP',
      'A 4-turn first-meeting dialogue between a student and a visiting professor at UP Diliman. Watch the register shift: the professor uses casual register with himself (Ako si Dr. Reyes), the student uses respectful register (pô + opò throughout).',
      'sentence',
      'Propesor: Magandang umaga. Ako si Dr. Reyes, taga-Cebu. — Estudyante: Magandang umaga pô. Ako pô si Maria Santos, taga-Quezon City. — Propesor: Estudyante ka ba dito sa UP? — Estudyante: Opò, estudyante pô ako sa Kolehiyo ng Sining. — Propesor: Maganda. Ikinagagalak kong makilala ka. — Estudyante: Ikinagagalak ko rin pô kayong makilala.',
      'Note: professor uses ka (casual you-singular); student uses kayo (respectful you-plural). Student\'s answer has pô throughout; professor speaks naturally without pô because he is the senior figure.',
      [
        { target: 'Propesor casual register', note: 'no pô needed (senior speaker); uses ka, dito' },
        { target: 'Estudyante respectful register', note: 'pô throughout; opò for "yes"; kayo for "you" addressing senior' },
        { target: 'Kolehiyo ng Sining', note: '"College of Arts" — typical UP college name' },
        { target: 'Ikinagagalak ko rin pô', note: '"Pleased to meet you too" (respectful) — rin = "also"; pô; kayo (respectful)' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      'Pagpapalit ng impormasyon',
      'pag-pa-PA-lit ng im-por-mas-YON',
      '"Swap in your own info". Reproduce the dialogue with YOUR own name, hometown, and field of study. The structure stays; only the personal data changes.',
      'sentence',
      'Tudural: Magandang umaga pô. Ako pô si ___, taga-___. Estudyante pô ako sa ___.',
      'Template line; fill in name, city, college. Practice with the AI tutor playing the senior figure.',
      null,
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Pagsulat: Sarili kong pagpapakilala',
      'pag-SU-lat: sa-RI-li kong pag-pa-pa-ki-LA-la',
      '"My own self-introduction". Write 3–5 sentences using ako si…, taga-…, estudyante / [your role], at least one ay-inversion, and at least one pô if you imagine the audience as a senior or stranger.',
      'sentence',
      'Modelo: Magandang araw pô. Ako pô si [pangalan]. Taga-[lugar] pô ako. Ako ay estudyante / [trabaho]. Masaya pô akong makilala kayo.',
      'Five short sentences; fill in personal data. Required: pô at least three times, si once, taga- once, ay-inversion once.',
      [
        { target: 'Magandang araw pô', note: '"Good day" — pô + magandang araw is a register-neutral safe opener' },
        { target: 'Ako pô si [name]', note: '"I am [name]" — pô + si + name' },
        { target: 'Taga-[place] pô ako', note: '"I am from [place]"' },
        { target: 'Ako ay estudyante', note: '"I am a student" — ay-inversion for formal/written register' },
        { target: 'Masaya pô akong makilala kayo', note: '"I am happy to meet you (respectful)" — masaya = happy; akong = ako + linker -ng' },
      ],
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Pô at opò bilang kultural na halaga',
      'POH at o-POH bilang kul-tu-RAL na ha-la-GA',
      '"Pô and opò as cultural values". In Filipino culture, using pô/opò is not optional politeness but a CORE marker of proper upbringing (lutong-bahay, "home-cooked" / well-raised). A young person who does not use pô with elders is described as "walang modo" (no manners) or "walang galang" (no respect). Schools, families, and even strangers will gently correct a child who forgets.',
      'word',
      'Lola: "Hoy, sabihin mo \'pô\'!" / Bata: "Salamat pô, lola."',
      '"Hey, say pô!" / "Thank you, grandma." — typical elder correction; the child re-says the phrase with pô.',
      null,
      [ACT.culture],
    ),
    createContentItem(
      'Kinship titles bilang paggalang',
      'kinship titles as respect',
      'Filipinos use kinship titles (ate, kuya, tito, tita, lolo, lola) for NON-RELATIVES routinely. A 25-year-old man buying snacks from a 45-year-old vendor will call her tita; she calls him kuya. This is not pretending to be family — it is the everyday register of respectful address. English-speaking foreigners are sometimes surprised; in the Philippines it is automatic.',
      'word',
      'Sa kanto: "Tita, bili ako ng kanin po." — "Sige, kuya, eto na."',
      '"On the corner: \'Aunt, I\'ll buy rice.\' — \'OK, brother, here you go.\'" — strangers, kinship titles applied.',
      [
        { target: 'ate', note: 'older sister / any slightly-older woman' },
        { target: 'kuya', note: 'older brother / any slightly-older man' },
        { target: 'tita / tito', note: 'aunt / uncle (often unrelated, parent-generation)' },
        { target: 'lola / lolo', note: 'grandmother / grandfather (related or not, much older)' },
        { target: 'ninang / ninong', note: 'godmother / godfather (Catholic context, baptism/wedding sponsors)' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Hiyà at pakikisama',
      'HI-yaʔ at pa-ki-ki-SA-ma',
      'Two foundational Filipino values that shape communication. HIYÀ (sense of propriety/shame) makes direct refusal uncomfortable — Filipinos often say "susubukan ko" (I will try) or "tingnan natin" (let\'s see) when they really mean "no". PAKIKISAMA (going along with the group) prioritizes group harmony over individual assertion. Foreigners often misread "yes / I will try" as commitment when it is polite hedging.',
      'word',
      '"Pwede ba kayo pumunta?" — "Susubukan ko." (often = no, but polite)',
      'Read between the lines. A direct "Hindî, hindî ako pwede" is rare; "Susubukan ko" is the common indirect refusal.',
      null,
      [ACT.culture],
    ),
    createContentItem(
      'UP Diliman',
      'YU-pi di-LI-man',
      'The University of the Philippines Diliman, located in Quezon City (north Metro Manila), is the flagship campus of UP — the country\'s premier public university and the alma mater of many presidents, scientists, artists, and activists. Reference institutions you may also hear: Ateneo de Manila University (private, Jesuit, also in QC), De La Salle University (private, Manila), University of Santo Tomas (Catholic, oldest in Asia, Manila).',
      'word',
      'Estudyante pô ako sa UP Diliman.',
      '"I am a student at UP Diliman" — high-prestige academic reference; UP Diliman students are commonly called "Iskolar ng Bayan" (scholar of the nation).',
      [
        { target: 'UP Diliman', note: 'flagship UP campus; Quezon City; "Iskolar ng Bayan"' },
        { target: 'Ateneo de Manila', note: 'private Jesuit university; also in Quezon City' },
        { target: 'DLSU (La Salle)', note: 'private Catholic university; Taft Avenue, Manila' },
        { target: 'UST', note: 'University of Santo Tomas; Catholic; oldest university in Asia (1611)' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Gawain: Unang araw sa UP Diliman',
      'ga-WA-in: U-nang A-raw sa UP di-LI-man',
      '"Task: First day at UP Diliman". Roleplay the full encounter with the AI tutor playing a visiting professor from Cebu. Aim for a 6-turn exchange. Required: 1) Magandang [time] pô + greeting, 2) ako pô si … self-introduction, 3) Taga-… origin, 4) opò response to one yes/no question, 5) one correction using hindî pô …, 6) Salamat pô / Paalam closing.',
      'sentence',
      'Halimbawa: Propesor: "Magandang umaga." Ikaw: "Magandang umaga pô. Ako pô si [pangalan]. Taga-[lugar] pô ako." Propesor: "Taga-Cebu ka ba?" Ikaw: "Hindî pô, taga-[lugar] pô ako. Pero nakakapunta pô ako sa Cebu." Propesor: "Estudyante ka ba dito?" Ikaw: "Opò, estudyante pô ako sa Kolehiyo ng Agham." Propesor: "Maganda. Salamat sa pagpapakilala." Ikaw: "Salamat pô. Paalam pô.',
      'Six turns; pô throughout; one correction (hindî pô); one opò; greeting + introduction + origin + correction + farewell.',
      [
        { target: 'Opening: Magandang [time] pô', note: 'first turn always opens with time-greeting + pô' },
        { target: 'Self-intro: Ako pô si …', note: 'name + role + origin in one or two short sentences' },
        { target: 'Correction: Hindî pô, … pô', note: 'when the senior\'s guess is wrong, polite correction' },
        { target: 'Closing: Salamat pô. Paalam pô.', note: 'thanks + goodbye in respectful register' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
