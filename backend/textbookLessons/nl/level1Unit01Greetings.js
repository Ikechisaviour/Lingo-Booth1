// Level 1 Unit 1 — Greetings & Self-Introduction (Dutch)
// Functions: greeting, introducing yourself, asking where someone is from,
// correcting a wrong assumption, farewells.
// This lesson is the canonical TEMPLATE for all Dutch thematic Level 1 lessons.
//
// All content is authored with Dutch (target, Latin script) + phonetic hint
// (romanization slot) + English glosses (canonical source). The AI conversation
// tutor reads this curriculum and delivers it to each learner in their preferred
// native language at runtime — never assume a specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition.

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
  orientation: 'nl-l1u1-orientation',
  pronunciation: 'nl-l1u1-pronunciation',
  vocabularyGreetings: 'nl-l1u1-vocab-greetings',
  vocabularyPeople: 'nl-l1u1-vocab-people',
  grammarZijn: 'nl-l1u1-grammar-zijn',
  grammarPronouns: 'nl-l1u1-grammar-pronouns',
  grammarVerbEndings: 'nl-l1u1-grammar-verb-endings',
  reading: 'nl-l1u1-reading',
  listening: 'nl-l1u1-listening',
  writing: 'nl-l1u1-writing',
  culture: 'nl-l1u1-culture',
  task: 'nl-l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet someone in Dutch and say goodbye in three registers (casual, polite, formal) so you can match the situation.',
      'Introduce yourself with your name, country, and one role (student / docent / ingenieur) using the "Ik ben…" and "Ik heet…" patterns.',
      'Ask another person their name and where they are from with "Hoe heet je?" and "Waar kom je vandaan?", and answer naturally.',
      'Correct a wrong guess about your nationality with "Nee, ik ben geen…, ik ben…" while keeping the exchange friendly.',
    ],
    task: 'Picture your first day at Universiteit van Amsterdam (UvA) — you walk into a research meeting and meet a visiting scholar from Utrecht. By the end of this lesson you should handle the whole exchange in Dutch without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce the velar/uvular fricative in "goedemorgen" /xudəˈmɔrxə(n)/ and "dag" /dɑx/ — every greeting in this lesson contains at least one /x/.',
      'Distinguish je /jə/ (unstressed you) from jij /jɛi/ (stressed you) — same pronoun, two pronunciations depending on emphasis.',
      'Pronounce the ij diphthong /ɛi/ in "mijn" (my), "jij" (you), "wij" (we), "zij" (she/they) — all the high-frequency pronouns share this sound.',
      'Use Dutch "j" as /j/ in "ja" /jaː/ and "Jan" /jɑn/ — NOT as English /dʒ/.',
    ],
    task: 'Read each example aloud and identify whether the fricative is hard-g or soft-g; check that "j" is glide, not English "j".',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 12 greetings and farewells across three registers, with the right phrase for each situation.',
      'Distinguish "hoi" (informal peer-to-peer) from "goedendag" (polite/professional) from "geachte" (very formal, only in letters) — using the wrong one shifts the relationship awkwardly.',
      'Use the time-of-day greetings goedemorgen / goedemiddag / goedenavond / goedenacht and recognize the rough cutoffs (morning until noon, middag until ~6pm, avond until ~midnight, nacht for late-night farewells).',
    ],
    task: 'Say each phrase out loud three times with the correct g/ch, then pair each one with the situation where you would use it.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and nationalities',
    goals: [
      'Use the 8 subject pronouns (ik, jij/je, u, hij, zij/ze, het, wij/we, jullie, zij/ze) correctly, including the formal-you "u".',
      'State your role (student / docent / ingenieur / arts) and nationality (country name + adjective: Nederlander, Belg, Amerikaan, Nigeriaan) in a complete short sentence.',
      'Recognize that Dutch has both a noun form (een Nederlander = "a Dutchman") and an adjective form (Nederlands = "Dutch") for nationality.',
    ],
    task: 'Say your own role and nationality using "Ik ben…" then describe one classmate using "Hij is…" or "Zij is…".',
  },
  {
    id: ACT.grammarZijn,
    section: 'Grammar I',
    title: 'zijn — to be (irregular)',
    goals: [
      'Conjugate the highly irregular verb "zijn" (to be) — ik ben, jij bent, u bent, hij/zij is, wij zijn, jullie zijn, zij zijn. This is the single most frequent Dutch verb and must be memorized.',
      'Build a simple identity sentence: subject + zijn-form + noun/adjective: "Ik ben student" (I am a student), "Zij is Nederlands" (She is Dutch).',
      'Form a yes/no question by INVERTING subject and verb: "Ben jij student?" (Are you a student?) — Dutch is a V2 (verb-second) language, so questions front the verb.',
    ],
    task: 'Write six sentences using "zijn", then convert three of them into yes/no questions by inverting subject and verb.',
  },
  {
    id: ACT.grammarPronouns,
    section: 'Grammar II',
    title: 'Subject pronouns — stressed vs unstressed forms',
    goals: [
      'Use the 8 subject pronouns: ik (I), jij/je (you informal), u (you formal), hij (he), zij/ze (she/they), het (it), wij/we (we), jullie (you-plural informal), zij/ze (they).',
      'Distinguish STRESSED forms (jij, zij, wij, ze) from UNSTRESSED forms (je, ze, we, ze) — used depending on whether the pronoun carries focus. Default casual speech uses je/ze/we; emphatic speech uses jij/zij/wij.',
      'Use "u" (you formal) with strangers, elders, customers, professors, and in official contexts. Switching from "je" to "u" mid-conversation signals respect; the reverse signals familiarity.',
    ],
    task: 'Construct three sentences with stressed pronouns (jij, zij, wij), then rewrite each with the unstressed equivalent (je, ze, we) and feel the rhythm change.',
  },
  {
    id: ACT.grammarVerbEndings,
    section: 'Grammar III',
    title: 'Present-tense verb endings: stem / stem+t / stem+en',
    goals: [
      'Conjugate any regular Dutch verb in the present tense: ik + stem, jij/u/hij/zij/het + stem+t, wij/jullie/zij + stem+en. So "werken" (to work) → ik werk, jij werkt, wij werken.',
      'Apply the "drop -t for inverted jij" rule: in inversion (questions), the 2nd-person singular drops -t. "Jij werkt" (you work) → "Werk jij?" (do you work?). No other person changes.',
      'Apply Dutch spelling rules to verb stems: from infinitive "lopen" the stem is "loop" (double oo because closed syllable), from "schrijven" the stem is "schrijf" (final v devoices to f).',
    ],
    task: 'Conjugate three new verbs (werken, wonen, studeren) for ik / jij / hij / wij, then invert one to form a question.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a self-introduction',
    goals: [
      'Read a short self-introduction paragraph aloud with correct g/ch fricatives, vowel lengths, schwa, and natural rhythm.',
      'Answer comprehension questions about the speaker\'s name, country, role, and city in complete short sentences.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in complete short Dutch sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first meeting',
    goals: [
      'Follow a 6-turn first-meeting dialogue and recognize the casual vs formal register markers (hoi vs goedendag, je vs u, voornaam vs familie + meneer/mevrouw).',
      'Reproduce the dialogue with your own name and country, swapping in the relevant phrases naturally.',
    ],
    task: 'Read the casual and formal dialogues with the AI tutor first, then perform them again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own self-introduction',
    goals: [
      'Write 3–5 sentences covering greeting, name, country, role, and one extra fact (city, hobby, or study).',
      'Use the verb "zijn" at least twice and one other regular verb so the writing demonstrates both the irregular core and the regular ending pattern of this lesson.',
    ],
    task: 'Write your own self-introduction in 3–5 sentences using the model on the left, then read it aloud with correct g/ch and vowel length.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Direct communication, "tutoyeren", and Dutch first names',
    goals: [
      'Recognize the cultural norm of Dutch directness — Dutch speakers value clarity, brevity, and saying what you mean. Polite circumlocution sounds evasive, not respectful.',
      'Understand "tutoyeren" — the act of switching from "u" to "je". Initiated by the senior/older person ("Zeg maar je tegen me") or by mutual agreement; doing it unilaterally to an elder is a small social misstep.',
      'Recognize the Dutch first-name culture: in workplaces (including the UvA and most companies), colleagues — even managers — use first names. Title + last name is reserved for letters, formal speeches, and customer-facing contexts.',
    ],
    task: 'Decide how you would address (1) a fellow student named Bram, (2) a professor named Anna de Vries, (3) a hotel receptionist — give the full Dutch form for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day at UvA — in Dutch',
    goals: [
      'Combine everything from this lesson into one continuous scene with no break between greeting, introduction, question, answer, correction, and farewell.',
      'Use the correct register (formaal/informeel) based on the relationship; switch from "je" to "u" if the interlocutor is older, senior, or in a customer-facing role.',
    ],
    task: 'Roleplay your first day at Universiteit van Amsterdam with the AI tutor playing a visiting scholar from Utrecht; aim for a 6-turn exchange in Dutch.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 1: Hoi — Greetings and Self-Introduction',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'nl',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (hoi / goedendag / dag) and match the register to the relationship.' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences using "Ik heet…" and "Ik ben…".' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask "Waar kom je vandaan?" and respond naturally with "Ik kom uit…".' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use "Nee, ik ben geen…, ik ben…" to politely correct a wrong guess about your nationality or role.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Lesdoelen',
      'LES-doo-lə(n)',
      'By the end of this lesson, you can greet someone in Dutch, give your name, say where you are from, ask the same back, correct a wrong assumption, and farewell — all in one short conversation without pausing to think. These five micro-skills are the spine of every social encounter in Dutch.',
      'word',
      'Functies: begroeten (greet) · jezelf voorstellen (introduce yourself) · vragen waar iemand vandaan komt (ask origin) · ontkennen (negate) · afscheid nemen (farewell)',
      'These five sub-skills are the spine of every social encounter in Dutch — once they are automatic, every later lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      'Echte situatie',
      'EKH-tə si-tu-AA-tsi',
      'You are at Universiteit van Amsterdam on your first day and a visiting scholar from Utrecht turns to you in the lab. The whole encounter takes about 30 seconds and you will need every micro-skill from this lesson. Register is informal-but-polite — student-to-student at a Dutch university defaults to "je", first names, and casual phrasing.',
      'word',
      'Bezoekend onderzoeker: "Hoi! Ik ben Pieter. Waar kom je vandaan?"',
      'A typical opener from a Dutch peer: informal "hoi" + first name only + immediate origin question — Dutch directness in action.',
      [
        { target: 'Hoi /ɦɔy/', note: 'most common informal NL greeting peer-to-peer; warmer than English "hi"; not for grandmother or boss' },
        { target: 'Ik ben Pieter', note: 'self-introduction with the verb "zijn"; even more common than "Ik heet Pieter"' },
        { target: 'Waar kom je vandaan?', note: 'literal: "where come you from?"; the standard origin question, fronted-question word order' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      'Drie registers',
      'drie rə-XHIS-tərs',
      'Dutch distinguishes three rough politeness registers. CASUAL (peers, friends): hoi / hé / hallo + je/jij + first names + doei/dag. POLITE (workplace, first meetings, shops): goedendag / hallo + je or u + meneer/mevrouw + family name + tot ziens. FORMAL (letters, very senior figures, official): geachte heer/mevrouw + u + full titles + met vriendelijke groet.',
      'word',
      'CASUAL: hoi / hé / doei  |  POLITE: goedendag / dag / tot ziens  |  FORMAL: geachte heer X / met vriendelijke groet (in writing)',
      'Switching from "je" to "u" mid-conversation signals increased respect; the reverse signals familiarity (initiated by the senior person — "zeg maar je").',
      [
        { target: 'CASUAL: hoi, hé, doei, dag, hoi je', note: 'use with peers, classmates, close colleagues, friends, family' },
        { target: 'POLITE: goedendag, hallo, tot ziens, dag', note: 'the safe default for first meetings, customer service, professors' },
        { target: 'FORMAL: geachte heer/mevrouw, met vriendelijke groet', note: 'reserved for letters, very senior figures, and official contexts; rarely spoken' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'goedemorgen',
      'xudə-MOR-xə(n)',
      'Two velar fricatives in one word: the opening /x/ (sometimes voiced /ɣ/ in some accents) at "goed-", and the closing /x/ at "-gen". In Northern Dutch (Amsterdam, the Randstad), both are hard-g /χ/, scratchy. In Flemish, both soften to /ç/. The middle "-e-" reduces to schwa /ə/.',
      'word',
      'goedemorgen → /xudə.ˈmɔr.xə(n)/',
      'The most common formal morning greeting; you will say it 100+ times in your first week in the Netherlands.',
      [
        { target: 'goed- /xut/ → /xudə/ when combined', note: 'final d softens before vowel-initial suffix; fricative g at start' },
        { target: '-e- /ə/', note: 'unstressed middle vowel — schwa, not full /eː/' },
        { target: '-morgen /ˈmɔrxə(n)/', note: 'stressed first syllable; the velar fricative reappears before the schwa-n ending' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'jij vs je',
      'JEI vs jə',
      'The 2nd-person pronoun has TWO pronunciations depending on stress. STRESSED: "jij" /jɛi/ — used when emphasis is on the YOU. UNSTRESSED: "je" /jə/ — used in casual flow when emphasis is elsewhere. Same word, two surface forms; native speakers switch automatically.',
      'word',
      'STRESSED: "JIJ bent de docent?" (YOU are the teacher?) /jɛi/\nUNSTRESSED: "Wat doe je?" (What do you do?) /jə/',
      'Beginners overuse "jij" and sound emphatic; default to "je" for natural rhythm.',
      [
        { target: 'jij /jɛi/ — stressed', note: 'long ij diphthong; contrast, emphasis, first introductions' },
        { target: 'je /jə/ — unstressed', note: 'schwa; default for normal speech and casual writing' },
        { target: 'choice is a rhythm choice', note: 'not a grammar mistake to mix, but native rhythm prefers one in each context' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'dag',
      'DAKH',
      'A versatile greeting/farewell, pronounced /dɑx/ — short a + final-devoiced /x/. Functions as both "hi" (informal greeting) and "bye" (casual farewell). Always one syllable; never "dawg" or "dahg".',
      'word',
      'dag /dɑx/ — short ɑ + final fricative /x/',
      'Hear final devoicing in action: the "g" letter at word end becomes voiceless /x/, never the English /ɡ/ stop.',
      [
        { target: 'd- /d/', note: 'voiced dental stop; standard' },
        { target: '-a- /ɑ/', note: 'short open back vowel; closed syllable' },
        { target: '-g /x/', note: 'final-devoiced fricative; same sound as ch in "lachen"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'mijn / jouw / zijn / haar',
      'mein / jou / zein / haar',
      'The possessive pronouns all share short bursts of common Dutch sounds. mijn /mɛin/ (my) — the ij diphthong. jouw /jɑu/ (your, stressed) — the ou diphthong + initial j as /j/. zijn /zɛin/ (his) — initial z + ij. haar /haːr/ (her) — long aa + final r.',
      'word',
      'mijn boek /mɛin buk/ (my book) · jouw fiets /jɑu fits/ (your bike) · zijn vader /zɛin ˈvaːdər/ (his father) · haar moeder /haːr ˈmudər/ (her mother)',
      'Four high-frequency words; mastering their sounds unlocks most family/possession sentences in the lesson.',
      null,
      [ACT.pronunciation],
    ),
    createContentItem(
      'Hoe heet je?',
      'hu HEET-jə',
      'The "h" in "heet" and "hoe" is a clear aspirated /h/ (some Northern speakers say /ɦ/ — voiced h, like German). The "ee" is long /eː/. The "j" in "je" is the glide /j/ — the whole question links into the rhythm "hu-HEET-jə" with one main stress.',
      'sentence',
      'Hoe heet je? /ɦu ˈɦeːt jə/ — "What is your name?" (literal: "How are you called?")',
      'Notice the question intonation does NOT rise sharply like English; Dutch question intonation is flatter, with stress on the verb.',
      [
        { target: 'Hoe /ɦu/', note: 'long oe vowel /u/; means "how"' },
        { target: 'heet /ɦeːt/', note: 'long ee + final-devoiced t (already voiceless)' },
        { target: 'je /jə/', note: 'unstressed second-person pronoun' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('hoi', 'HOY', 'The most common informal NL greeting peer-to-peer; warmer than English "hi" and very widely used. Appropriate for friends, classmates, close colleagues; NOT for grandmother, boss in a formal company, or first contact with a professor. Pronounced /ɦɔy/ — h + short o + y glide.', 'word', 'Hoi! Hoe gaat het?', 'A standard casual exchange between two students or close colleagues; "hoe gaat het?" = "how is it going?"', null, [ACT.vocabularyGreetings]),
    createContentItem('hallo', 'HAH-loh', 'A polite-neutral greeting suitable across most registers — slightly more formal than "hoi" but less than "goedendag". Safe default for first meetings, phone calls, customer service. Used widely in both NL and Flanders.', 'word', 'Hallo, met Pieter.', 'Standard phone opener — "Hello, this is Pieter" — using "met" + name to identify yourself; never "ik ben" on the phone.', null, [ACT.vocabularyGreetings]),
    createContentItem('goedendag', 'KHU-də(n)-DAKH', 'A polite formal-leaning greeting any time of day; the safe choice for shops, first meetings with senior people, customer service. Pronounced with TWO velar fricatives — one at "goed-", one at "-dag". Common variants: "goeiedag" (more casual), "goeden dag" (older spelling).', 'word', 'Goedendag mevrouw, kan ik u helpen?', 'Standard customer-service opener using formal "u" and the title "mevrouw" — typical in shops, banks, and offices.', null, [ACT.vocabularyGreetings]),
    createContentItem('goedemorgen', 'KHU-də(n)-MOR-khə(n)', 'A polite morning greeting used roughly from sunrise to noon. Slightly more formal than "hoi" and common in workplaces, classrooms, and broadcasts. Pronounced with two /x/ fricatives. Variant: "goeiemorgen" (casual contraction).', 'word', 'Goedemorgen, professor De Vries.', 'Standard student-to-professor opener in the morning; uses last name + title, polite but not stiff.', null, [ACT.vocabularyGreetings]),
    createContentItem('goedemiddag', 'KHU-də(n)-MID-dakh', 'A polite-to-formal afternoon greeting used roughly from noon to 6pm. Same register as goedemorgen. Less common in casual speech, where "hoi" or "hallo" covers all times of day. Often shortened to "middag!" among acquaintances.', 'word', 'Goedemiddag, ik kom voor de afspraak van twee uur.', 'Polite arrival greeting at a 2pm appointment, using "afspraak" (appointment) and "van twee uur" (of two o\'clock).', null, [ACT.vocabularyGreetings]),
    createContentItem('goedenavond', 'KHU-də(n)-AA-vont', 'A polite-to-formal evening greeting used after about 6pm. Distinct from "goedenacht" which is a LATE-night farewell (going to bed). Variant: "goeienavond" (casual). The "-avond" portion has long aa + final devoiced t.', 'word', 'Goedenavond, welkom bij Hotel Krasnapolsky.', 'A formal hotel welcome — combining the evening greeting with a venue identifier.', null, [ACT.vocabularyGreetings]),
    createContentItem('aangenaam', 'AAN-khə-naam', 'The polite first-meeting phrase, equivalent to "nice to meet you". Literal: "agreeable". Slightly formal, often paired with a name: "Aangenaam, Pieter." or "Aangenaam kennis te maken" (formal full version, "pleasant to make acquaintance"). Less common than English "nice to meet you"; Dutch speakers sometimes simply nod.', 'word', 'Aangenaam, ik ben Anna.', 'A formal introduction phrase, especially at business or academic first meetings.', null, [ACT.vocabularyGreetings]),
    createContentItem('hoe gaat het?', 'hu KHAAT hət', 'A genuine inquiry into wellbeing — less formulaic than English "how are you?" in some contexts but is still often a ritual phrase in passing. Standard reply: "Goed, dank je. En met jou?" (Good, thanks. And you?). Casual variant: "Hoe gaat \'t?"', 'word', 'Hoe gaat het? — Goed, dank je. En met jou?', 'Standard everyday exchange; "met jou" rather than just "jou" because of the preposition "met" (with).', null, [ACT.vocabularyGreetings]),
    createContentItem('tot ziens', 'tot SEENS', 'A polite farewell suitable for most workplace, customer, and acquaintance contexts. Literal: "until see-again". Slightly more formal than "doei" but less than "vaarwel" (which is too formal/dramatic for everyday use). Universal closing for shop visits.', 'word', 'Tot ziens en een fijne dag verder!', 'Polite farewell paired with "have a nice rest of the day" — typical shop or service-counter closing.', null, [ACT.vocabularyGreetings]),
    createContentItem('doei', 'DOOY', 'A casual farewell — equivalent to English "bye". Used among friends, peers, family, and casual colleagues. More casual than "tot ziens"; common in modern urban speech. Variant: "doeg" /dux/ (very casual NL), "doei doei" (chipper, friendly).', 'word', 'Doei! Tot morgen!', 'Friend-to-friend close; "tot morgen" = "until tomorrow".', null, [ACT.vocabularyGreetings]),
    createContentItem('tot morgen', 'tot MOR-khə(n)', 'A casual farewell that explicitly expects a meeting tomorrow. Variants: "tot zo" (see you in a bit / shortly), "tot straks" (see you later today), "tot volgende week" (see you next week), "tot dan" (see you then). More personal than plain "doei".', 'word', 'Tot morgen, slaap lekker!', 'Brief expectation-setting close paired with the evening farewell "slaap lekker" ("sleep well").', null, [ACT.vocabularyGreetings]),
    createContentItem('slaap lekker', 'slaap LEK-kər', 'A nighttime farewell when someone is going to bed (or to sleep). Literal: "sleep tasty/well". Functions as a "good night" but specifically for sleep — at a normal evening party you would still say "doei" or "tot ziens". The greeting "goedenacht" is more formal/old-fashioned.', 'word', 'Slaap lekker, tot morgen!', 'A typical end-of-evening close among family or close friends.', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People, roles, nationalities
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ik', 'IK', 'First-person singular subject pronoun. Unlike English "I", "ik" is not capitalized in the middle of sentences. Stressed and unstressed forms are the same /ɪk/. Combines with the irregular "zijn" form "ben": "ik ben".', 'word', 'Ik ben student.', 'The simplest possible self-introduction: ik + zijn-form + role noun. No article needed before "student" in Dutch.', null, [ACT.vocabularyPeople]),
    createContentItem('jij / je', 'JEI / jə', 'Second-person singular pronoun used for casual address to peers, friends, equals, and most colleagues. Stressed: "jij" /jɛi/. Unstressed: "je" /jə/. Avoid with elders, senior officials, or in customer-facing roles — use "u" instead.', 'word', 'Wat doe je? Wat doe JIJ?', 'Same question, different rhythm: unstressed "je" for casual flow, stressed "jij" to focus on you specifically.', null, [ACT.vocabularyPeople]),
    createContentItem('u', 'UU', 'Honorific second-person pronoun used for elders, customers, senior officials, professors at first meeting, strangers, and anyone you wish to show extra respect to. The "polite you" — like German Sie, French vous, Spanish usted. Singular or plural; the verb form is "u bent" or "u is" (both accepted).', 'word', 'Hoe maakt u het?', 'Formal "how do you do?" — very high register, often in business or with very senior figures.', null, [ACT.vocabularyPeople]),
    createContentItem('hij', 'HEI', 'Third-person masculine singular pronoun. Pronounced /ɦɛi/ — h + ij diphthong. Stressed and unstressed forms are the same, but unstressed often drops the h: "Heeft hij…" /ˈɦeːf tɪ/ in fast speech.', 'word', 'Hij is mijn broer.', 'Standard third-person introduction; "broer" = brother.', null, [ACT.vocabularyPeople]),
    createContentItem('zij / ze', 'ZEI / zə', 'Third-person feminine singular pronoun, OR third-person plural (both genders). Stressed: "zij" /zɛi/. Unstressed: "ze" /zə/. Context disambiguates singular vs plural: "Zij is" (she is, singular) vs "Zij zijn" (they are, plural).', 'word', 'Zij is mijn zus. Ze zijn mijn ouders.', 'Same pronoun "zij/ze" used for singular feminine ("she is my sister") and plural ("they are my parents").', null, [ACT.vocabularyPeople]),
    createContentItem('het', 'HƏT', 'Third-person neuter singular pronoun ("it") — also the definite article for neuter nouns ("het boek" = the book). Pronounced /hət/ in flow, often /ət/ when unstressed. Used much less often than English "it"; Dutch often drops the subject when context is clear.', 'word', 'Het is mooi vandaag.', '"It is beautiful today" — typical weather opener using neuter "het".', null, [ACT.vocabularyPeople]),
    createContentItem('wij / we', 'VEI / və', 'First-person plural pronoun. Stressed: "wij" /ʋɛi/. Unstressed: "we" /ʋə/. Default casual speech uses "we"; emphatic uses "wij".', 'word', 'Wij zijn studenten aan de UvA.', 'Group self-identification at the Universiteit van Amsterdam; note "studenten" (plural) without article.', null, [ACT.vocabularyPeople]),
    createContentItem('jullie', 'YUL-li', 'Second-person plural pronoun used to address multiple peers/friends. Casual register, like singular "je". For a formal plural, repeat "u" or use "dames en heren" (ladies and gentlemen). No stressed/unstressed split.', 'word', 'Jullie zijn welkom!', 'Casual group welcome; "you-plural are welcome!"', null, [ACT.vocabularyPeople]),
    createContentItem('naam', 'NAAM', 'A person\'s name. Used in the common phrases "Wat is je naam?" ("What is your name?") and "Mijn naam is…" ("My name is…"). Slightly more formal than "Hoe heet je?" / "Ik heet…". Note long aa.', 'word', 'Mijn naam is Sara.', '"My name is Sara" — slightly more formal than "Ik heet Sara".', null, [ACT.vocabularyPeople]),
    createContentItem('voornaam', 'VOOR-naam', 'A person\'s first name (literal: "fore-name"). Distinct from "achternaam" (last name, literal "after-name") and "familienaam" (family name). In casual Dutch culture, the voornaam is the default address form — even for managers and professors after first contact.', 'word', 'Mijn voornaam is Pieter, mijn achternaam is De Vries.', 'Common formal full-name reveal; "De Vries" is one of the most common Dutch surnames.', null, [ACT.vocabularyPeople]),
    createContentItem('meneer', 'mə-NEER', 'Title used for adult men in formal contexts — like "Mr." or "sir". Used alone (Meneer, kunt u me helpen?) as polite address to a stranger, or with a last name (meneer De Vries). Pronunciation: schwa-stressed /e/.', 'word', 'Meneer De Vries, dit is uw kamer.', 'Formal hotel/service phrase: "Mr. De Vries, this is your room."', null, [ACT.vocabularyPeople]),
    createContentItem('mevrouw', 'mə-VROU', 'Title used for adult women in formal contexts — like "Mrs.", "Ms.", or "madam". Marital status NOT implied. Used alone or with last name. The "vrouw" portion has the ou diphthong /ɑu/.', 'word', 'Mevrouw Bakker is onze docent.', '"Mrs. Bakker is our teacher" — formal reference using last name + title.', null, [ACT.vocabularyPeople]),
    createContentItem('student', 'stuu-DENT', 'A person currently studying — at any level from secondary school to graduate research. Note Dutch stress on the second syllable (different from English). Plural: studenten. Female form sometimes: studente (formal/older).', 'word', 'Ik ben student aan de UvA.', 'Self-identification at the Universiteit van Amsterdam — note "aan de" (at the) for institutional location.', null, [ACT.vocabularyPeople]),
    createContentItem('docent', 'doo-SENT', 'A teacher at the secondary or university level. Less casual than "leraar" (school teacher, primary/secondary). Universities use "docent" for non-professor teaching staff; "professor" is reserved for the highest rank. Plural: docenten.', 'word', 'Mijn docent heet meneer Bakker.', 'Standard student introduction of a teacher; first-name address comes after the teacher invites it.', null, [ACT.vocabularyPeople]),
    createContentItem('ingenieur', 'in-zhə-NYEUR', 'Engineer (any discipline) — French loanword, pronounced with the French-style nasalized vowels. Abbreviation: ir. (used before names, like "ir. Jansen" = Engineer Jansen). Plural: ingenieurs.', 'word', 'Mijn moeder is ingenieur bij Shell.', '"My mother is an engineer at Shell" — Shell being a major Dutch-British company headquartered in The Hague.', null, [ACT.vocabularyPeople]),
    createContentItem('arts', 'ARTS', 'A medical doctor. Also used as a title-like reference after the family name: "dokter Bakker" (or "arts Bakker" — rarer). The more colloquial "dokter" is also widely used; "arts" leans slightly more formal/professional.', 'word', 'Mijn vader is arts in het ziekenhuis.', '"My father is a doctor at the hospital" — "ziekenhuis" = hospital (sick-house).', null, [ACT.vocabularyPeople]),
    createContentItem('Nederlander', 'NEE-dər-lan-dər', 'A Dutch person (noun, masculine; feminine: Nederlandse). The country is "Nederland"; the people are "Nederlanders"; the adjective is "Nederlands". So "Ik ben Nederlander" (I am Dutch — noun) or "Ik ben Nederlands" (I am Dutch — adjective).', 'word', 'Ik ben Nederlander, geboren in Utrecht.', 'Standard nationality self-identification using the noun form + birthplace.', null, [ACT.vocabularyPeople]),
    createContentItem('Belg', 'BELKH', 'A Belgian person (noun, masculine; feminine: Belgische). The country is "België"; the adjective is "Belgisch". Note the final -g is /x/ (final-devoiced fricative). Many Belgians speak Dutch (Flemish), others French (Walloon).', 'word', 'Mijn vriend is Belg, hij komt uit Antwerpen.', 'Standard reference using the noun + city of origin; Antwerpen is the largest Flemish city.', null, [ACT.vocabularyPeople]),
    createContentItem('Amerikaan', 'a-mə-ri-KAAN', 'An American (noun, masculine; feminine: Amerikaanse). The country is "Amerika" (or "de Verenigde Staten" for the United States specifically). Adjective: Amerikaans.', 'word', 'Sara is Amerikaan, ze komt uit Boston.', '"Sara is American, she comes from Boston" — typical third-person introduction.', null, [ACT.vocabularyPeople]),
    createContentItem('Nigeriaan', 'ni-khə-ri-AAN', 'A Nigerian person (noun, masculine; feminine: Nigeriaanse). The country is "Nigeria"; adjective: Nigeriaans. Note the velar fricative /x/ in the country name.', 'word', 'Ik ben Nigeriaan en ik kom uit Lagos.', 'Self-identification using country + origin city.', null, [ACT.vocabularyPeople]),
    createContentItem('Chinees / Japans / Koreaans', 'sji-NEES / yaa-PANS / koh-rə-AANS', 'A few common East Asian nationality adjectives: Chinees (Chinese), Japans (Japanese), Koreaans (Korean), Vietnamees (Vietnamese), Indonesisch (Indonesian — historically very common in NL due to colonial ties), Filipijns (Filipino).', 'word', 'Mijn collega Hiroshi is Japans, en Yuna is Koreaans.', 'Quick reference for multiple nationalities in a single sentence — common at international universities.', null, [ACT.vocabularyPeople]),
    createContentItem('uit + country', 'œyt', 'The preposition "uit" /œyt/ means "from" (origin) — used to say where you come from. Pattern: "Ik kom uit + country/city." So "Ik kom uit Nederland" (I come from the Netherlands), "Ik kom uit Amsterdam" (I come from Amsterdam). Note the ui diphthong.', 'word', 'Waar kom je vandaan? — Ik kom uit Spanje.', 'Standard exchange asking for and giving origin; "Spanje" = Spain.', null, [ACT.vocabularyPeople]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: zijn copula
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'zijn',
      'ZEIN',
      'The verb "zijn" (to be) is highly irregular and the single most frequent Dutch verb. Memorize the full conjugation: ik BEN, jij BENT, u BENT (or u IS), hij/zij/het IS, wij ZIJN, jullie ZIJN, zij ZIJN. Notice that 4 different stems appear (ben, bent, is, zijn) — no other Dutch verb has this many.',
      'sentence',
      'ik ben — jij bent — u bent — hij is — zij is — het is — wij zijn — jullie zijn — zij zijn',
      'Memorize this paradigm cold; every Dutch identity statement, location statement, and many tenses depend on it.',
      [
        { target: 'ik ben /ɪk bɛn/', note: '1st person singular; the form that appears in every self-introduction' },
        { target: 'jij bent /jɛi bɛnt/', note: '2nd person singular informal; note -t ending matches the regular 2nd-person pattern' },
        { target: 'hij/zij/het is /ɪs/', note: '3rd person singular; the "is" form, totally suppletive' },
        { target: 'wij/jullie/zij zijn /zɛin/', note: 'all three plurals use the same "zijn" form — same as the infinitive' },
      ],
      [ACT.grammarZijn],
    ),
    createContentItem(
      'identity sentence',
      'identiteit zinnen',
      'The basic Dutch identity sentence is SUBJECT + zijn-form + COMPLEMENT (noun OR adjective). Unlike Mandarin or Hebrew, Dutch keeps the copula in both noun and adjective predications: "Ik ben student" (noun) AND "Ik ben moe" (adjective, "I am tired").',
      'sentence',
      'CORRECT NOUN: Ik ben student.\nCORRECT ADJ: Ik ben moe.',
      'Both predication types use the same "zijn" form; no English-speaker trap here — works like English "to be".',
      [
        { target: 'zijn + noun', note: 'Ik ben student / Ik ben Nederlander / Hij is docent — identity, role, profession' },
        { target: 'zijn + adjective', note: 'Ik ben moe / Ik ben blij / Het is mooi — state, quality, feeling' },
        { target: 'no article for general profession', note: 'NL drops "een" (a/an) for profession: "Ik ben student" not "Ik ben een student"' },
      ],
      [ACT.grammarZijn],
    ),
    createContentItem(
      'V2 inversion for yes/no questions',
      'inversie',
      'CORE DUTCH GRAMMAR RULE: Dutch is a V2 (verb-second) language. In a statement, the finite verb is in the SECOND position. In a yes/no question, the verb MOVES to the FIRST position, inverting with the subject. So "Jij bent student" (statement) → "Ben jij student?" (question).',
      'sentence',
      'STATEMENT: Jij bent student.   →   QUESTION: Ben jij student?\nSTATEMENT: Hij is Nederlander. → QUESTION: Is hij Nederlander?\nSTATEMENT: Wij zijn vrienden.   → QUESTION: Zijn wij vrienden?',
      'V2 inversion is the single most distinctive Dutch syntactic feature (shared with German). Learners drilling Spanish/English models often skip the inversion and produce ungrammatical "Jij bent student?" with rising intonation only.',
      [
        { target: 'subject + verb (statement)', note: 'Jij bent student — declarative word order' },
        { target: 'verb + subject (question)', note: 'Ben jij student? — invert for yes/no question' },
        { target: 'NO intonation-only questions', note: 'Dutch requires actual inversion; rising intonation on a statement sounds odd unless seeking confirmation' },
      ],
      [ACT.grammarZijn],
    ),
    createContentItem(
      'wh-questions',
      'vraagwoorden',
      'Information questions use wh-words at the FRONT of the sentence (just like English), then verb-second order: question-word + verb + subject + rest. wat (what), wie (who), waar (where), wanneer (when), waarom (why), hoe (how), welke (which).',
      'sentence',
      'Hoe heet je? ("What\'s your name?", lit. "How are you called?")\nWaar woon je? ("Where do you live?")\nWat doe je? ("What do you do?")\nWie ben jij? ("Who are you?")',
      'Compare to English: same word order in principle (wh-word + verb + subject), but Dutch is stricter about V2 and never accepts "Why you go?" — must be "Waarom ga je?"',
      [
        { target: 'wat /ʋɑt/', note: 'what; very high frequency' },
        { target: 'wie /ʋi/', note: 'who; subject form (object form same)' },
        { target: 'waar /ʋaːr/', note: 'where; static location; for direction use "waarheen"' },
        { target: 'wanneer /ʋɑˈneːr/', note: 'when; long ee in stressed second syllable' },
        { target: 'waarom /ʋaːˈrɔm/', note: 'why; stress on om' },
        { target: 'hoe /ɦu/', note: 'how; very common in greetings (Hoe gaat het?)' },
        { target: 'welke /ˈʋɛlkə/', note: 'which (common gender); for neuter use "welk"' },
      ],
      [ACT.grammarZijn],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Pronouns
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'persoonlijke voornaamwoorden',
      'pər-SOON-lə-kə VOR-naam-vor-də(n)',
      'Dutch has 9 subject pronouns. Three of them have stressed/unstressed pairs: jij/je, zij/ze, wij/we. The plural "they" uses the same form as feminine singular "she" (zij/ze) — context disambiguates by the verb form.',
      'sentence',
      'SG: ik · jij/je · u · hij · zij/ze · het\nPL: wij/we · jullie · zij/ze',
      'Memorize the stress pairs as ONE pronoun with two voices — switching between them is a rhythm choice, not a meaning choice.',
      null,
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'stressed vs unstressed',
      'STRESSED versus un-STRESSED',
      'STRESSED forms (jij, zij, wij) carry emphasis or contrast — used when YOU is the focus. UNSTRESSED forms (je, ze, we) flow naturally in casual speech without focus. A native Dutch speaker switches automatically; learners default to stressed forms and sound emphatic.',
      'sentence',
      'EMPHATIC: "JIJ bent de baas, niet ik!" ("YOU are the boss, not me!")\nNEUTRAL: "Wat doe je dit weekend?" ("What are you doing this weekend?")',
      'Use stressed for contrast and introductions; default to unstressed for everything else.',
      [
        { target: 'jij /jɛi/ — stressed', note: 'use when focusing on "you specifically"' },
        { target: 'je /jə/ — unstressed', note: 'default casual flow; vast majority of sentences' },
        { target: 'zij /zɛi/ — stressed', note: 'use to focus on "she" or "they"' },
        { target: 'ze /zə/ — unstressed', note: 'default; also disambiguates plural in flow' },
        { target: 'wij /ʋɛi/ — stressed', note: 'use to focus on "us"' },
        { target: 'we /ʋə/ — unstressed', note: 'default casual flow' },
      ],
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'u — the polite you',
      'UU',
      'The formal second-person pronoun "u" is used for: elders, customers, professors at first meeting, strangers in formal contexts, very senior officials, and anyone you want to show extra respect. Like German "Sie", French "vous", Spanish "usted". Verb form: "u bent" or "u is" — both accepted.',
      'sentence',
      'Goedendag, hoe heet u? — Ik heet meneer De Vries.',
      'Switching from "je" to "u" mid-conversation signals increased respect; the reverse signals familiarity and is initiated by the senior person ("zeg maar je tegen me").',
      [
        { target: 'u with elder/senior', note: 'default for grandparents, professors, customers, officials' },
        { target: 'u bent / u is', note: 'both forms accepted in modern Dutch; "u bent" slightly more common' },
        { target: '"Tutoyeren"', note: 'the act of switching from "u" to "je"; initiated by senior; small social ritual' },
      ],
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'object pronouns preview',
      'objects-VOR-naam-vor-də(n)',
      'PREVIEW: Dutch object pronouns differ from subject pronouns: mij/me (me), jou/je (you-obj), u (you-obj formal), hem (him), haar (her), het (it), ons (us), jullie (you-pl), hen/hun/ze (them). Full coverage in Unit 4; for now, recognize "mij" and "jou" in the dialogue.',
      'sentence',
      'Hoe gaat het MET JOU? — Goed met MIJ, dank je.',
      'A preview only — the full object-pronoun system arrives in Unit 4. For Unit 1, just notice "mij" and "jou" appear after prepositions.',
      null,
      [ACT.grammarPronouns],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Verb endings
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'present tense endings',
      'tegenwoordige tijd',
      'Regular Dutch verbs in the present tense follow a simple three-way pattern based on stem + ending. ik = stem. jij/u/hij/zij/het = stem + t. wij/jullie/zij = stem + en. Stem is found by dropping the -en from the infinitive (and applying Dutch spelling: long-vowel doubling if closed syllable, consonant doubling if short).',
      'sentence',
      'werken (to work) → stem werk\nik werk · jij werkt · hij werkt · wij werken · jullie werken · zij werken',
      'The three-way pattern (Ø / -t / -en) is THE Dutch verb conjugation in present tense, used by 90%+ of verbs.',
      [
        { target: 'ik + stem (no ending)', note: 'ik werk, ik woon, ik schrijf — first person is the bare stem' },
        { target: 'jij/u/hij/zij/het + stem + t', note: 'jij werkt, hij werkt, zij werkt — same -t ending for all singular non-ik' },
        { target: 'wij/jullie/zij + stem + en', note: 'wij werken, jullie werken, zij werken — plural always -en' },
      ],
      [ACT.grammarVerbEndings],
    ),
    createContentItem(
      'stem-finding spelling rules',
      'stam vinden',
      'To find the stem of a Dutch verb, drop -en from the infinitive AND apply the open/closed syllable spelling rule. lopen → loop (closed syllable: doubled oo to keep long o). werken → werk (closed: just remove -en). schrijven → schrijf (closed: final v devoices to f in spelling). bakken → bak (open: removed doubled k since now closed syllable already short).',
      'sentence',
      'lopen → loop (long-vowel doubled in closed syllable)\nwerken → werk (no spelling change)\nschrijven → schrijf (v → f for spelling)\nbakken → bak (kk → k since closed syllable shows short vowel without doubling)',
      'Three spelling adjustments to learn: long-vowel doubling, v→f at end, consonant un-doubling when stem-closed.',
      [
        { target: 'long vowel double in stem', note: 'lopen → loop, leven → leef, halen → haal' },
        { target: 'v→f, z→s at end', note: 'final devoicing rule shows in spelling: schrijven → schrijf' },
        { target: 'consonant un-doubles', note: 'bakken → bak, zwemmen → zwem' },
      ],
      [ACT.grammarVerbEndings],
    ),
    createContentItem(
      'jij/je inversion drops -t',
      'inversie -t valt weg',
      'CRITICAL DUTCH RULE: when "jij" or "je" comes AFTER the verb (in inversion or after a wh-word), the verb DROPS its -t ending. "Jij werkt" (you work) → "Werk jij?" (do you work?) — no t! No other person has this rule. This rule is one of the most common beginner mistakes.',
      'sentence',
      'STATEMENT: Jij werkt hier. → QUESTION: Werk jij hier? (no -t!)\nSTATEMENT: Jij heet Sara.  → QUESTION: Hoe heet jij? (no -t!)\nSTATEMENT: Jij bent moe.   → QUESTION: Ben jij moe? (no -t in "ben" anyway, but rule applies)',
      'Memorize this rule: "drop -t when je/jij follows the verb". It applies only to je/jij; hij and zij keep their -t.',
      [
        { target: 'jij werkt → werk jij?', note: 'standard inversion question' },
        { target: 'hij werkt → werkt hij?', note: 'no drop for hij — keeps -t' },
        { target: 'jij heet → hoe heet jij?', note: 'after wh-word, jij also drops -t (since it follows the verb)' },
      ],
      [ACT.grammarVerbEndings],
    ),
    createContentItem(
      'three verbs in flow',
      'drie werkwoorden',
      'Three high-frequency verbs to drill: heten (to be called), wonen (to live/reside), werken (to work). All three are regular; all three are useful in the self-introduction. Conjugation: ik heet / woon / werk; jij heet / woont / werkt; wij heten / wonen / werken.',
      'sentence',
      'Ik heet Sara. Ik woon in Amsterdam. Ik werk aan de UvA.',
      'A three-sentence self-introduction using all three core verbs — covers name, residence, and job in three breaths.',
      [
        { target: 'heten (be called) → heet/heet/heten', note: 'note: heet from infinitive heten by dropping -en and keeping long ee' },
        { target: 'wonen (live) → woon/woont/wonen', note: 'note: woon doubles the o because stem is closed syllable' },
        { target: 'werken (work) → werk/werkt/werken', note: 'note: werk stays the same, no doubling needed; short e' },
      ],
      [ACT.grammarVerbEndings],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'zelfintroductie',
      'zelf-in-troh-DUKT-si',
      'A complete five-sentence self-introduction in Dutch. Read it aloud with correct g/x fricatives, vowel lengths, schwa reduction, and natural rhythm. Notice the parallel structure: nearly every sentence starts with "Ik".',
      'sentence',
      'Hallo! Ik heet Sara, ik ben Amerikaan. Ik ben student aan de Universiteit van Amsterdam, mijn studie is informatica. Leuk om je te ontmoeten.',
      'Translation: "Hello! My name is Sara, I am American. I am a student at the University of Amsterdam, my major is Computer Science. Nice to meet you."',
      [
        { target: 'Ik heet Sara', note: 'name introduction using "heten"; warmer than "Mijn naam is Sara"' },
        { target: 'ik ben Amerikaan', note: 'nationality using noun form; alternative: "ik ben Amerikaans" (adjective)' },
        { target: 'aan de Universiteit van Amsterdam', note: '"aan de" — the standard preposition for "at" a university; "van Amsterdam" = "of Amsterdam"' },
        { target: 'mijn studie is informatica', note: '"my study/major is informatics"; "studie" is the noun for academic specialization' },
        { target: 'Leuk om je te ontmoeten', note: 'casual polite first-meeting close; lit. "nice to meet you"; alternative: "Aangenaam"' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'begripsvragen',
      'bə-KHRIPS-vraa-khə(n)',
      'Four standard comprehension questions matching the paragraph. Answer each in a short sentence using "ik ben…" or "ik heet…"; full sentences are not required for natural Dutch.',
      'sentence',
      'V1: Hoe heet je? V2: Waar kom je vandaan? V3: Ben je student? V4: Wat is jouw studie?',
      'One name question, one origin, one yes/no, one specific information — covering all the question patterns from this lesson.',
      [
        { target: 'A1: Ik heet Sara.', note: 'name answer using "heten"; the natural form' },
        { target: 'A2: Ik kom uit Amerika.', note: 'origin answer using uit + country' },
        { target: 'A3: Ja, ik ben student.', note: 'short positive answer; can repeat verb or full sentence' },
        { target: 'A4: Informatica.', note: 'short answer drops the redundant phrase; full sentence ("Mijn studie is informatica") also fine' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'eerste ontmoeting (informeel)',
      'EERS-tə ont-MOO-ting in-for-MEEL',
      'A natural casual first-meeting conversation between two students at UvA. Covers all the patterns from this lesson: greetings, names, origins, roles, return-the-question, agreements, and farewells. Register is "je" throughout — the default for peer-to-peer at a Dutch university.',
      'conversation',
      'A: Hoi! Leuk je te ontmoeten. Ik ben Pieter.\nB: Hoi Pieter! Ik ben Sara. Ook leuk.\nA: Waar kom je vandaan?\nB: Ik kom uit Amerika. En jij?\nA: Ik ben Nederlander, uit Utrecht. Ben jij hier student?\nB: Ja, ik studeer informatica aan de UvA. Jij?\nA: Ik ook! Wat een toeval.\nB: Tot ziens in college dan!',
      'A natural exchange between peers using the casual "je" register — the default for student-age interactions in NL/BE.',
      [
        { target: 'Leuk je te ontmoeten', note: 'casual first-meeting phrase; "leuk om je te ontmoeten" is slightly more formal' },
        { target: 'En jij? / Jij?', note: 'standard return-the-question phrase after answering your own turn' },
        { target: 'Ik ook!', note: '"me too"; "ook" is the all-purpose "also" particle' },
        { target: 'Wat een toeval', note: '"what a coincidence!" — common reaction expression' },
        { target: 'Tot ziens in college dan!', note: 'casual close meaning "see you in class then!"; "dan" = then' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      'eerste ontmoeting (formeel)',
      'EERS-tə ont-MOO-ting for-MEEL',
      'A formal first-meeting conversation suitable for academic or professional contexts. Notice the formal vocabulary: "u", "meneer/mevrouw", "aangenaam", full name + title — register markers signaling a deliberate hierarchical interaction.',
      'conversation',
      'Student: Goedemorgen professor. Ik ben Sara Kim, uw nieuwe student.\nProfessor: Goedemorgen mevrouw Kim. Aangenaam. Welkom in Amsterdam.\nStudent: Dank u. Mag ik plaatsnemen?\nProfessor: Natuurlijk. Waar komt u vandaan?\nStudent: Ik kom uit Boston. Ik studeer informatica.\nProfessor: Heel goed. Veel succes met uw studie hier aan de UvA.\nStudent: Dank u wel, professor.',
      'Same information as the casual version but with formal phrasing throughout — appropriate for hierarchical (student-professor at first meeting) relationships.',
      [
        { target: 'Aangenaam', note: 'formal first-meeting phrase "pleased to meet you"; signals respect' },
        { target: 'mevrouw Kim', note: 'title + last name; standard formal address for adult women' },
        { target: 'u nieuwe student / uw studie', note: '"u" subject, "uw" possessive — both formal' },
        { target: 'Mag ik plaatsnemen?', note: 'formal "may I take a seat?"; "plaatsnemen" is a separable verb (Unit 3)' },
        { target: 'Dank u wel', note: '"thank you very much"; "u" matches the formal register' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'schrijfsjabloon',
      'SKHREIF-shaa-bloon',
      'A reusable five-sentence template for any Dutch self-introduction. Fill in the bracketed slots with your own information — the structure carries the rest.',
      'sentence',
      'Hallo! Ik heet [naam]. Ik ben [nationaliteit]. Ik woon in [stad]. Ik ben [beroep/rol] aan de UvA. Leuk om kennis te maken.',
      'Five sentences cover the core: greeting, name, nationality, city, role/profession, closing — the minimum complete self-introduction.',
      [
        { target: '[naam]', note: 'your name — first name only for casual, first + last for formal' },
        { target: '[nationaliteit]', note: 'your nationality using noun form (Nederlander, Amerikaan, Nigeriaan) or adjective (Nederlands, Amerikaans, Nigeriaans)' },
        { target: '[stad]', note: 'your city — Amsterdam, Rotterdam, Utrecht, Den Haag, Eindhoven, or your hometown' },
        { target: '[beroep/rol]', note: 'student / docent / ingenieur / arts / onderzoeker — the noun for your role at UvA' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      'schrijfoefening',
      'SKHREIF-oo-fə-ning',
      'Write your own 3–5 sentence self-introduction in Dutch using the template. Use the verb "zijn" at least twice and one other regular verb (heten / wonen / werken / studeren) so the writing demonstrates both the irregular core and the regular ending pattern of this lesson.',
      'sentence',
      'Voorbeeld: Hallo! Ik heet Kim Jisoo. Ik ben Koreaans. Ik woon in Amsterdam. Ik studeer geneeskunde aan de UvA. Leuk om kennis te maken!',
      'Translation: "Hello! I am Kim Jisoo. I am Korean. I live in Amsterdam. I study medicine at the UvA. Nice to meet you!"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Nederlandse directheid',
      'NEE-dər-lan-tsə di-REKT-heit',
      'Dutch directness is a defining cultural feature. Dutch speakers value clarity, brevity, and saying what you mean. Polite circumlocution ("would you possibly perhaps maybe…") sounds evasive, not respectful. "Nee" (no) is a complete sentence; declining an invitation with "Nee, dank je" is fine and friendly. Foreigners often mistake this for rudeness — it is not.',
      'sentence',
      'Foreigner: "Excuse me, I was wondering if perhaps you might be able to tell me…"\nDutch native: "Wat wil je weten?" ("What do you want to know?")',
      'Bluntness is a courtesy in Dutch culture — it means "I respect you enough to not waste your time". Adjust your expectations accordingly.',
      [
        { target: '"Doe maar gewoon"', note: 'famous Dutch saying: "just act normal" — anti-pretension cultural norm' },
        { target: 'no thanks-loops', note: 'one "dank je" is enough; repeating it sounds insincere' },
        { target: 'directness ≠ rudeness', note: 'Dutch directness is high-context politeness; the message is "I trust you to handle truth"' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'tutoyeren',
      'tu-tu-WEE-rə(n)',
      'The act of switching from "u" to "je" with someone — a small but significant social moment. Initiated by the senior/older/higher-ranked person, typically by saying "Zeg maar je tegen me" ("Just say \'je\' to me") or simply by using "je" themselves. Doing it unilaterally to an elder is a small social misstep. In casual workplaces (most NL companies), tutoyeren happens within minutes; in more formal sectors (banks, government), it can take weeks.',
      'sentence',
      'Manager: "Zeg maar je tegen me, hoor."\nNieuwe medewerker: "Oké, dank je."',
      'After tutoyeren, both parties use "je" — never switch back unless the relationship changes significantly.',
      [
        { target: '"Zeg maar je"', note: 'the initiating phrase from senior to junior' },
        { target: 'unilateral je with elder', note: 'small mistake — wait for invitation in formal contexts' },
        { target: 'Flemish je / u', note: 'Flanders is slightly more conservative; "u" persists longer than in NL' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'voornaam culture',
      'VOR-naam',
      'Dutch workplaces — especially at universities like the UvA and most tech companies — default to FIRST-NAME basis. Students often call their professors by first name after the first lecture; colleagues at every rank use voornamen. Title + last name is reserved for letters, formal speeches, and customer-facing contexts (banks, hospitals, hotels).',
      'sentence',
      'Casual: Hoi Anna! (to a professor named Anna de Vries, after she invited it)\nFormal letter: Geachte mevrouw De Vries (to the same person, in writing)',
      'Two contexts, same person, very different forms — Dutch culture switches register more fluidly than e.g. German.',
      [
        { target: 'workplace default = voornaam', note: 'first names from week one in most NL/BE companies and universities' },
        { target: 'customer-facing = meneer/mevrouw + achternaam', note: 'hotels, banks, hospitals — formal address persists' },
        { target: 'letters = formal even with friends', note: 'written register stays formal even with people you "je" in person' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'gezelligheid',
      'khə-ZEL-lə-kheit',
      'The untranslatable Dutch concept "gezelligheid" — the feeling of cozy togetherness, conviviality, and warmth in a social setting. A small candle-lit dinner with friends is "gezellig"; a warm café on a rainy afternoon is "gezellig"; even a tidy room can be "gezellig". The Danish "hygge" is the closest equivalent, but the Dutch use it more often and more flexibly.',
      'sentence',
      'Wat gezellig hier! ("How cozy/nice it is here!") — typical reaction on entering a warm café.',
      'A core Dutch cultural value — events, meals, and even meetings are judged partly on their "gezelligheid". A meeting can be "niet gezellig" (not cozy/sociable) as a real complaint.',
      [
        { target: 'gezellig (adj)', note: 'cozy, sociable, convivial; one of the most flexible positive adjectives in Dutch' },
        { target: 'gezelligheid (noun)', note: 'the abstract quality; what cozy social situations have' },
        { target: 'untranslatable status', note: 'a famous Dutch claim — though hygge, koselig, mysig are similar in other languages' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'opdracht: eerste dag aan de UvA',
      'OP-drakht: EERS-tə dakh aan də UU-VAA',
      'Roleplay your first day at Universiteit van Amsterdam with the AI tutor playing a friendly visiting scholar from Utrecht. Use every skill from this lesson in one continuous scene — greet, introduce, ask, answer, farewell.',
      'conversation',
      '[Labo UvA, Amsterdam]\nBezoekend onderzoeker: Hoi! Leuk je te ontmoeten. Ik ben Pieter.\nJij: [begroet + stel jezelf voor]\nBezoekend onderzoeker: Waar kom je vandaan?\nJij: [zeg je land/stad]\nBezoekend onderzoeker: Ben jij hier student?\nJij: [bevestig + voeg studie toe]\nBezoekend onderzoeker: Wat een toeval! Wat studeer je?\nJij: [antwoord]\nBezoekend onderzoeker: Leuk om met je te praten!\nJij: [neem afscheid]',
      'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: 'begroet', note: 'hoi / hallo / goedendag — pick the register that matches the scholar\'s opening' },
        { target: 'jezelf voorstellen', note: 'Ik heet… or Ik ben… — use the natural form' },
        { target: 'land/stad', note: 'Ik kom uit + country/city — use the uit + place pattern' },
        { target: 'studie', note: 'Ik studeer… or Mijn studie is… — state your major' },
        { target: 'afscheid', note: 'tot ziens / doei / tot morgen — match the register you opened with' },
      ],
      [ACT.task],
    ),
    createContentItem(
      'uitdaging — verkeerde aanname corrigeren',
      'œyt-DAA-khing — vər-KEER-də AAN-naa-mə',
      'Stretch goal: in the same scene, the visiting scholar guesses your country incorrectly. Politely correct using the pattern "Nee, ik ben geen…, ik ben…". Closes the loop without making the asker lose face.',
      'conversation',
      'Bezoekend onderzoeker: Oh, ben jij Japans?\nJij: Nee, ik ben geen Japans, ik ben Koreaans. Ik kom uit Seoul.\nBezoekend onderzoeker: Ah, sorry hoor, mijn fout!\nJij: Geen probleem.',
      '"Geen probleem" (no problem) is a casual reassurance — standard after any small mistake or apology. Note "geen" (no/none) is the negation used for nouns; "niet" negates verbs and adjectives.',
      [
        { target: 'Nee, ik ben geen X, ik ben Y', note: 'standard three-part polite correction; "geen" negates nouns' },
        { target: 'Geen probleem / geen zorgen', note: 'casual reassurance ("no problem / no worries"); standard response to apology' },
        { target: 'sorry hoor', note: 'casual apology with the colloquial particle "hoor"; softens the apology' },
        { target: 'mijn fout', note: '"my mistake"; a common short admission' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
