// Level 1 Unit 1 — Greetings & Self-Introduction (Portuguese, BP primary)
// Functions: greeting, introducing yourself, asking where someone is from,
// correcting a wrong assumption, farewells.
// This lesson is the canonical TEMPLATE for all Portuguese thematic Level 1 lessons.
//
// All content is authored with Portuguese (target, Latin script) + a
// pronunciation cue (romanization slot) + English glosses (canonical source).
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
  orientation: 'pt-l1u1-orientation',
  pronunciation: 'pt-l1u1-pronunciation',
  vocabularyGreetings: 'pt-l1u1-vocab-greetings',
  vocabularyPeople: 'pt-l1u1-vocab-people',
  grammarSerEstar: 'pt-l1u1-grammar-ser-estar',
  grammarPronouns: 'pt-l1u1-grammar-pronouns',
  grammarNegation: 'pt-l1u1-grammar-negation',
  reading: 'pt-l1u1-reading',
  listening: 'pt-l1u1-listening',
  writing: 'pt-l1u1-writing',
  culture: 'pt-l1u1-culture',
  task: 'pt-l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet someone in Portuguese in three registers (peer, polite, formal) so you match the situation — oi / olá / bom dia / boa tarde / boa noite.',
      'Introduce yourself with name, country, and one role (student / teacher / engineer) using the SER copula and the "me chamo" / "meu nome é" patterns.',
      'Ask another person their name and where they are from, then respond appropriately to their answer.',
    ],
    task: 'Picture your first day at the Universidade de São Paulo (USP) — you walk into a study group and meet a paulistano student in the corridor. By the end of this lesson you should handle the whole exchange in Portuguese without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Apply BP palatalization on every "boa noite" (-tchi at word end), "tudo bem" (no palatalization, but watch closed o), and "obrigado(a)" (gender-marked, but watch the open i).',
      'Distinguish nasalized "não" (no, with full ão nasal diphthong) from oral "nau" (a ship, archaic) — beginners frequently drop the nasalization and produce the wrong word.',
      'Pronounce "São Paulo" as /sɐ̃w̃ ˈpaw.lu/ — TWO nasal-then-oral diphthongs in a row, the canonical city name every Portuguese learner must say correctly.',
    ],
    task: 'Read each example aloud and identify which words trigger palatalization, which trigger nasalization, and which require neither.',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 12 greetings and farewells across three registers, with the right phrase for each situation.',
      'Distinguish "Oi" (informal/peer) from "Olá" (semi-formal default) from "Bom dia / boa tarde / boa noite" (time-of-day, all registers) — using the wrong one signals the wrong relationship.',
    ],
    task: 'Say each phrase out loud three times with correct stress and nasalization, then pair each one with the situation where you would use it.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and nationalities',
    goals: [
      'Use the 8 personal pronouns (eu, você, tu, ele, ela, nós, vocês, eles/elas) correctly, including the BP/EP split on "você" vs "tu".',
      'State your role (estudante / professor(a) / engenheiro(a)) and nationality (gentílico: brasileiro, americano, etc.) with correct GENDER agreement.',
    ],
    task: 'Say your own role and nationality with the right masculine/feminine ending, then describe one classmate of the opposite gender.',
  },
  {
    id: ACT.grammarSerEstar,
    section: 'Grammar I',
    title: 'SER as the identity copula',
    goals: [
      'Conjugate SER in the present indicative: eu sou, você é, ele/ela é, nós somos, vocês são, eles/elas são.',
      'Use SER for IDENTITY, ORIGIN, and INHERENT TRAITS (name, nationality, profession, lasting characteristics). The contrast with ESTAR (temporary states) is covered later — for now, identity = SER.',
      'Form a yes/no question by inverting word order and adding a question mark: "Você é estudante?" with rising intonation.',
    ],
    task: 'Write six sentences using SER to identify yourself and others, then convert three of them into yes/no questions.',
  },
  {
    id: ACT.grammarPronouns,
    section: 'Grammar II',
    title: 'Subject pronouns + possessives (meu / seu)',
    goals: [
      'Use the 8 BP subject pronouns: eu (I), você (you-sing), ele (he), ela (she), nós (we) / a gente (we-colloquial), vocês (you-pl), eles (they-m), elas (they-f).',
      'Use the possessive adjectives meu/minha (my), seu/sua (your), nosso/nossa (our) with correct GENDER agreement on the possessed noun: meu nome (m), minha cidade (f), meus amigos (m-pl).',
    ],
    task: 'Construct three possessive phrases with different genders and numbers, then describe one item belonging to each person in your study group.',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar III',
    title: 'Negation with NÃO and the "não … é" correction pattern',
    goals: [
      'Negate any sentence by placing "não" directly BEFORE the verb: "Eu não sou japonês" ("I am not Japanese").',
      'Add an emphatic SECOND não at the end in BP for stress: "Não sou, não" — the doubled não is a strong BP-specific reinforcement.',
      'Apply the "Não é X, é Y" pattern to politely correct someone\'s wrong guess.',
    ],
    task: 'Imagine a classmate guesses your nationality wrong; correct them in one polite sentence using the "Não, eu não sou X, sou Y" pattern.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a self-introduction',
    goals: [
      'Read a short self-introduction paragraph aloud with correct stress, nasalization, palatalization, and natural rhythm.',
      'Answer comprehension questions about the speaker\'s name, country, role, and major using full SER sentences.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first meeting at USP',
    goals: [
      'Follow a 6-turn first-meeting dialogue between two USP students and recognize the casual register markers (oi, "tudo bem?", informal você).',
      'Reproduce the dialogue with your own name and country, swapping in the relevant phrases naturally.',
    ],
    task: 'Read the casual dialogue along with the AI tutor first, then perform it again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own self-introduction',
    goals: [
      'Write 3–5 sentences in Portuguese covering greeting, name, country, role, and one extra fact.',
      'Use SER at least twice and one possessive (meu/minha/seu/sua) so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Write your own self-introduction in 3–5 sentences using the model on the left, then read it aloud with correct pronunciation.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Beijinhos, abraços, and Brazilian warmth',
    goals: [
      'Know the standard Brazilian greeting choreography: women kiss both cheeks (right then left in most cities; one cheek in São Paulo), men shake hands or hug, mixed pairs kiss cheeks if friends — kissing the air not the cheek.',
      'Use the diminutive culture: Brazilians constantly add -inho/-inha (cafezinho, beijinho, amorzinho) to mark warmth, informality, and affection.',
      'Distinguish BP "você" (default singular you) from EP "tu/você" politics — in Portugal, calling someone "você" can be condescending unless the relationship is clear.',
    ],
    task: 'Decide how you would greet (1) a classmate of the same gender at USP, (2) a senior professor at the same university, (3) a Portuguese visiting scholar from Lisbon — describe the greeting for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day at USP — in Portuguese',
    goals: [
      'Combine everything from this lesson into one continuous scene with no break between greeting, introduction, question, answer, correction, and farewell.',
      'Use the correct register (casual peer-to-peer) and the BP "você" form throughout.',
    ],
    task: 'Roleplay your first day at the Universidade de São Paulo with the AI tutor playing a paulistano student; aim for a 6-turn exchange in Portuguese.',
  },
];

const content = [
  // ────────────────────────────────────────────────────────────────────
  // Activity 1 — Orientation
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'Objetivos da aula',
    'ob-je-TCHI-vus da AU-la',
    'By the end of this lesson, you can greet someone in Portuguese, give your name, say where you are from, ask the same back, and farewell — all in one short conversation without pausing to think.',
    'word',
    'Funções: cumprimentar, apresentar-se, perguntar origem, negar, despedir-se',
    'These five micro-skills are the spine of every social encounter in Portuguese — once they are automatic, every later lesson layers on top.',
    null,
    [ACT.orientation],
  ),
  createContentItem(
    'Cenário real',
    'se-NÁ-riu he-AU (BP: /he-/, EP: /ʁe-/)',
    'You are at the Universidade de São Paulo (USP) on your first day and a paulistano student in the corridor turns to you outside the lab. The whole encounter takes about 30 seconds and you will need every micro-skill from this lesson.',
    'word',
    'Estudante paulistano: "Oi! Tudo bem? Meu nome é Lucas. E você, qual é o seu nome?"',
    'A typical opener from a paulistano peer: casual "oi" + wellbeing check "tudo bem?" + name introduction + question turning to you — the standard BP student pattern.',
    [
      { target: 'Oi!', note: 'casual greeting; safe with peers, classmates, and most informal contexts in Brazil' },
      { target: 'Tudo bem?', note: 'literal "everything well?"; the all-purpose BP wellbeing check at any time of day' },
      { target: 'Meu nome é…', note: 'standard self-introduction; slightly more formal than "Me chamo…"' },
      { target: 'E você?', note: '"And you?" — the standard return-the-question phrase' },
    ],
    [ACT.orientation],
  ),
  createContentItem(
    'Três níveis de formalidade',
    'treis NÍ-veis dʒi for-ma-li-DA-dʒi',
    'BP distinguishes three rough politeness registers. Casual (peers, friends): Oi / E aí?. Polite/default (workplace, first meetings): Olá / Bom dia / Boa tarde. Formal (elders, customers, ceremonies): O senhor / a senhora, Como vai o senhor?.',
    'word',
    'CASUAL: Oi / E aí? — POLITE: Olá / Bom dia — FORMAL: O senhor, como vai?',
    'Switching from "você" to "o senhor/a senhora" mid-conversation signals increased respect; the reverse signals familiarity.',
    [
      { target: 'CASUAL: Oi, E aí?', note: 'peers, close friends, university classmates of similar age' },
      { target: 'POLITE: Olá, Bom dia, Boa tarde, Boa noite', note: 'safe default for first meetings, workplace, customer-facing' },
      { target: 'FORMAL: O senhor / A senhora', note: 'elders, senior officials, customers, doctors with their patients' },
    ],
    [ACT.orientation],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 2 — Pronunciation
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'Boa noite',
    'BÔ-a NÔI-tchi',
    'BP palatalization rule: the final -te of "noite" reduces to /tʃi/ — "NÔI-tchi". European Portuguese keeps /t/ clean: /ˈnoj.tɨ/. This is the single most heard palatalization in any Brazilian greeting.',
    'word',
    'Boa noite, professor!',
    'Polite evening greeting/farewell. Used after sunset both as a hello (arriving) AND as a goodbye (leaving) — context disambiguates.',
    [
      { target: 'BP: NÔI-tchi', note: 'palatalized: final unstressed e → /i/ raises t → /tʃ/' },
      { target: 'EP: NOIT', note: 'final e drops; no palatalization' },
    ],
    [ACT.pronunciation],
  ),
  createContentItem(
    'Tudo bem',
    'TU-du BÊN',
    '"Tudo bem?" has NO palatalization (the d is followed by u, not i) — pronounce a clean /d/. The "bem" ends in a nasal vowel /bẽj̃/ that English speakers tend to under-nasalize. The full phrase rhythm is TWO equal beats.',
    'word',
    'Tudo bem? — Tudo bem, e você?',
    'The universal BP wellbeing check. The standard reply repeats the words back: "Tudo bem, e você?"',
    [
      { target: 'Tudo /ˈtu.du/', note: 'no palatalization — du has back vowel u, not i' },
      { target: 'bem /bẽj̃/', note: 'nasal vowel + slight i-glide; not "bem" with audible /m/' },
    ],
    [ACT.pronunciation],
  ),
  createContentItem(
    'São Paulo',
    'sɐ̃w̃ PAU-lu',
    'The canonical Brazilian city name. TWO diphthongs: "São" is nasal /sɐ̃w̃/ (full nasalization of both vowels), "Paulo" has the oral diphthong /aw/ + final /-lu/. Getting "São" right is the single biggest reveal of a beginner accent.',
    'word',
    'Eu moro em São Paulo.',
    'BP capital and economic hub; home to USP, the curriculum anchor university.',
    [
      { target: 'São /sɐ̃w̃/', note: 'nasal diphthong; both vowels nasalized, NO consonant after' },
      { target: 'Paulo /ˈpaw.lu/', note: 'oral diphthong au; final -o → /u/ in BP' },
    ],
    [ACT.pronunciation],
  ),
  createContentItem(
    'Obrigado/Obrigada',
    'o-bri-GA-du / o-bri-GA-da',
    'The standard "thank you" agrees in gender with the SPEAKER (not the listener): a man says "obrigado", a woman says "obrigada". Misgendering yourself is a classic beginner error.',
    'word',
    'Lucas: Obrigado! / Maria: Obrigada!',
    'Other gendered greetings work the same way: muito prazer (invariant), but bem-vindo/bem-vinda agrees with the addressee.',
    [
      { target: 'Obrigado (man speaking)', note: 'masculine -o ending; what a male speaker says about himself' },
      { target: 'Obrigada (woman speaking)', note: 'feminine -a ending; what a female speaker says about herself' },
      { target: 'Não confundir', note: 'agreement is with the SPEAKER, not the listener — this is the trap' },
    ],
    [ACT.pronunciation],
  ),
  createContentItem(
    'Eu',
    'eu /ew/',
    'The BP first-person subject pronoun. The oral diphthong /ew/ — closed e plus u glide. Required in most BP sentences (unlike Spanish or Italian which drop subject pronouns freely).',
    'word',
    'Eu sou Sofia. Eu estudo na USP.',
    'BP requires "eu" much more often than Spanish requires "yo"; it is functional emphasis, not redundancy.',
    null,
    [ACT.pronunciation],
  ),
  createContentItem(
    'Não',
    'não /nɐ̃w̃/',
    'The Portuguese "no" — full nasal diphthong /nɐ̃w̃/. Skipping nasalization turns it into "nau" (an archaic ship), a different word. The most common single word in negation.',
    'word',
    'Não, eu não sou japonês, sou brasileiro.',
    'BP frequently doubles não at sentence end for emphasis: "Não, não sou, não" — the second não is purely emphatic.',
    null,
    [ACT.pronunciation],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 3 — Vocabulary I: Greetings & farewells
  // ────────────────────────────────────────────────────────────────────
  createContentItem('Oi', 'oi /oj/', 'The universal Brazilian informal greeting — "hi". Used among peers, friends, family, and in any casual situation in Brazil. Equivalent to English "hi" or "hey". Not standard in Portugal — EP speakers say "Olá" instead.', 'word', 'Oi, tudo bem?', 'The most heard greeting in Brazil; combine with "tudo bem?" for the full opener.', null, [ACT.vocabularyGreetings]),
  createContentItem('Olá', 'olá /oˈla/', 'A semi-formal greeting suitable any time of day; the safe default for first meetings, workplace, and customer-facing contexts in both Brazil and Portugal. Pronounced with stress on the last syllable (oLÁ).', 'word', 'Olá! Bem-vindos à USP.', 'Polite opener for a class, a meeting, or a stranger; works in both BP and EP without sounding foreign.', null, [ACT.vocabularyGreetings]),
  createContentItem('E aí?', 'e-ai /iˈaj/', 'Highly casual BP-only greeting/check-in — literal "and there?" Used among close peers, especially teens and university students. Roughly equivalent to "what\'s up?". Avoid with anyone significantly senior or in formal contexts.', 'word', 'E aí, cara, beleza?', '"Cara" (literally "face") = "dude" in BP slang; "beleza" = "all good".', null, [ACT.vocabularyGreetings]),
  createContentItem('Bom dia', 'bom dia /bõ ˈdʒi.a/', 'Polite morning greeting used roughly from sunrise to noon. The "dia" palatalizes in BP to /ˈdʒi.a/. Works in any register and is the standard professional opener at the start of any morning interaction.', 'word', 'Bom dia, professora!', 'Standard student-to-teacher morning greeting; pair with the addressee\'s title.', null, [ACT.vocabularyGreetings]),
  createContentItem('Boa tarde', 'boa tarde /ˈbo.a ˈtaʁ.dʒi/', 'Polite afternoon greeting used roughly from noon to early evening (around 6 PM). Same register as bom dia. Note the BP palatalization on -de: /ˈtaʁ.dʒi/.', 'word', 'Boa tarde, pessoal.', '"Pessoal" = "everyone" as a group greeting; common at meetings, classes, customer-facing roles.', null, [ACT.vocabularyGreetings]),
  createContentItem('Boa noite', 'boa noite /ˈbo.a ˈnoj.tʃi/', 'Polite evening greeting/farewell after sunset. UNLIKE English, Portuguese uses "boa noite" BOTH as a hello (arriving in the evening) AND a goodbye (leaving in the evening). Context disambiguates.', 'word', 'Boa noite — entrando: hello / saindo: goodbye.', 'Note: there is no separate "good evening" vs "good night" in Portuguese.', null, [ACT.vocabularyGreetings]),
  createContentItem('Tudo bem?', 'tudo bem /ˈtu.du bẽj̃/', 'The all-purpose BP wellbeing check — literal "everything well?". Standard answer: "Tudo bem, e você?" — the question is half-ritual, half-genuine, depending on context.', 'word', 'Tudo bem? — Tudo bem, e você?', 'Less formulaic than English "how are you?" — Brazilians often add real details after the polite ritual.', null, [ACT.vocabularyGreetings]),
  createContentItem('Como vai?', 'como vai /ˈko.mu ˈvaj/', 'Slightly more polite alternative to "tudo bem?" — literal "how go(es) (it)?". Common in workplace, customer-facing, and adult contexts. The senhor/senhora version is "Como vai o senhor?".', 'word', 'Como vai, doutor?', 'Polite check-in addressed to a doctor or professional; combine with title.', null, [ACT.vocabularyGreetings]),
  createContentItem('Muito prazer', 'muito prazer /ˈmũj.tu pɾaˈze/', 'Standard polite first-meeting phrase — literal "much pleasure". Used the first time you meet someone, in any register from casual to formal. Invariant (does not change for gender).', 'word', 'Muito prazer, sou Sofia.', 'Pair with name introduction for the canonical first-meeting line.', null, [ACT.vocabularyGreetings]),
  createContentItem('Tchau', 'tchau /tʃaw/', 'Casual farewell borrowed from Italian "ciao", spelled phonetically. Used among friends, family, and peers. More casual than "até logo" but less casual than "fui!". The most common BP everyday goodbye.', 'word', 'Tchau, até amanhã!', 'Combine with "até + time" for an explicit next-meeting expectation.', null, [ACT.vocabularyGreetings]),
  createContentItem('Até logo', 'até logo /aˈtɛ ˈlɔ.gu/', 'Polite farewell — literal "until soon". Used when you expect to see the person again the same day or shortly. Slightly more formal than "tchau".', 'word', 'Até logo, professor.', 'Common student-to-teacher closing; signals respect and a return expectation.', null, [ACT.vocabularyGreetings]),
  createContentItem('Até amanhã', 'até amanhã /aˈtɛ aˈmɐ.ɲɐ̃/', 'Specific farewell expecting a meeting tomorrow — "until tomorrow". Variants: até segunda ("until Monday"), até a próxima ("until next time"). More personal than plain tchau.', 'word', 'Até amanhã, pessoal!', 'Casual closing of a daily class or meeting; explicit next-day expectation.', null, [ACT.vocabularyGreetings]),

  // ────────────────────────────────────────────────────────────────────
  // Activity 4 — Vocabulary II: People, roles, nationalities
  // ────────────────────────────────────────────────────────────────────
  createContentItem('eu', 'eu /ew/', 'First-person singular subject pronoun. Required in most BP sentences for clarity; unlike Spanish, BP does NOT freely drop subject pronouns. Same form for subject and topic.', 'word', 'Eu sou estudante.', 'The simplest possible self-introduction: eu + SER + role.', null, [ACT.vocabularyPeople]),
  createContentItem('você', 'você /voˈse/', 'Second-person singular pronoun used as the BP default "you" with peers, friends, colleagues, even strangers in casual contexts. Takes 3rd-person verb forms (você é, você fala). In EP it can sound condescending — use "tu" or "o senhor" instead.', 'word', 'Você é estudante?', 'BP default "you" for almost any situation short of extreme formality.', null, [ACT.vocabularyPeople]),
  createContentItem('tu', 'tu /tu/', 'Second-person singular pronoun used as the EP default "you" with peers and friends. Also used in BP regional dialects (Rio Grande do Sul, parts of Pará, Santa Catarina) but with 3rd-person verb forms ("tu é" in BP gaúcho speech vs "tu és" in EP standard).', 'word', 'Tu és estudante? (EP) / Tu é estudante? (BP gaúcho)', 'BP-standard speakers avoid "tu"; EP speakers use it as the default informal you.', null, [ACT.vocabularyPeople]),
  createContentItem('o senhor / a senhora', 'o senhor / a senhora', 'Honorific second-person — "sir / ma\'am" used in place of "você" to show respect to elders, customers, professors, doctors, officials. Takes 3rd-person verb forms (o senhor é, a senhora vai). Singular only; plural is "os senhores / as senhoras".', 'word', 'O senhor é o professor Silva?', 'The formal you for hierarchical relationships; switching to it mid-conversation signals deference.', null, [ACT.vocabularyPeople]),
  createContentItem('ele', 'ele /ˈe.li/', 'Third-person singular pronoun for male persons or for masculine inanimate nouns ("ele" can refer to "o livro" — the book). Note BP final-e raises to /i/: "É-li" not "É-le".', 'word', 'Ele é meu amigo.', 'Third-person reference; gender follows natural sex for people, grammatical gender for things.', null, [ACT.vocabularyPeople]),
  createContentItem('ela', 'ela /ˈɛ.la/', 'Third-person singular pronoun for female persons or feminine inanimate nouns ("ela" can refer to "a casa" — the house). Open é /ɛ/ in BP — contrast with ele (closed /e/).', 'word', 'Ela é minha professora.', 'Third-person reference; gender follows natural sex for people, grammatical gender for things.', null, [ACT.vocabularyPeople]),
  createContentItem('nós', 'nós /nɔs/', 'First-person plural — "we". Open ó /ɔ/, contrasting with the colloquial alternative "a gente" (literally "the people", grammatically singular). Both used in BP; "nós" is more standard/written, "a gente" more colloquial.', 'word', 'Nós somos estudantes da USP.', 'BP increasingly uses "a gente" in casual speech; "nós" remains standard in writing.', null, [ACT.vocabularyPeople]),
  createContentItem('a gente', 'a gente /a ˈʒẽ.tʃi/', 'Colloquial BP first-person plural "we" — literally "the people" but used as a casual stand-in for "nós". Takes 3rd-person SINGULAR verb forms (a gente é, a gente fala). Extremely common in everyday Brazilian speech, less common in EP.', 'word', 'A gente é estudante.', 'Even though it means "we", verb agreement is singular — a quirk of grammaticalization.', null, [ACT.vocabularyPeople]),
  createContentItem('vocês', 'vocês /voˈses/', 'Second-person plural — "you all". BP default plural form for any group regardless of formality. Takes 3rd-person plural verb forms (vocês são, vocês falam). Replaces EP "vós" (which is archaic in BP and rare in EP).', 'word', 'Vocês são da USP?', 'Universal BP "you-plural"; works for casual and polite alike.', null, [ACT.vocabularyPeople]),
  createContentItem('eles / elas', 'eles / elas /ˈe.lis/ /ˈɛ.las/', 'Third-person plural pronouns: eles (masculine or mixed-gender groups), elas (all-feminine groups). Default for any mixed group is the masculine "eles".', 'word', 'Eles são brasileiros. Elas são portuguesas.', 'A mixed group of one man and 99 women is still "eles" in standard Portuguese — a gender-rules artifact.', null, [ACT.vocabularyPeople]),
  createContentItem('nome', 'nome /ˈno.mi/', 'A person\'s given name. Used in "Meu nome é…" ("My name is…") and "Qual é o seu nome?" ("What is your name?"). Masculine noun ("o nome"), even though many specific names are feminine.', 'word', 'Meu nome é Sofia.', 'Standard formal-but-warm self-introduction.', null, [ACT.vocabularyPeople]),
  createContentItem('sobrenome', 'sobrenome /soˌbɾeˈno.mi/', 'A person\'s family name / surname — literally "over-name". Portuguese family names often include MULTIPLE surnames (mother\'s family + father\'s family), so a full name like "Sofia Oliveira Santos" has both maternal and paternal lines.', 'word', 'Sofia Maria Oliveira Santos — sobrenomes: Oliveira, Santos.', 'Brazilian official documents use both surnames; informal contexts often use just the last one.', null, [ACT.vocabularyPeople]),
  createContentItem('senhor / senhora', 'senhor / senhora', 'Honorific titles meaning "Mr. / Ms." (or "sir / ma\'am"). Used after surname in formal address: "Senhor Silva", "Senhora Costa". Also serve as the formal-you pronouns (see above).', 'word', 'O senhor Silva trabalha aqui?', 'Standard formal address pattern; used in any professional or hierarchical context.', null, [ACT.vocabularyPeople]),
  createContentItem('professor / professora', 'professor / professora', 'Title meaning "teacher" or "professor" — used after first name OR alone as direct address ("Professor!"). Gender-marked: professor (m), professora (f). Universal across primary school to university; not reserved for senior academics like English "professor".', 'word', 'Professora Maria, bom dia!', 'Standard student-to-teacher greeting; combines title + first name in BP, title + surname in EP.', null, [ACT.vocabularyPeople]),
  createContentItem('estudante', 'estudante /es.tuˈdɐ̃.tʃi/', 'A person currently studying — at any level. Genderless in form (same word for male and female students): "ele é estudante", "ela é estudante". Article changes: o estudante / a estudante.', 'word', 'Eu sou estudante da USP.', 'Most common role self-identifier in academic contexts.', null, [ACT.vocabularyPeople]),
  createContentItem('aluno / aluna', 'aluno / aluna /aˈlu.nu/ /aˈlu.na/', 'A student in a specific class/school relationship — "pupil" in older translations. Distinct from "estudante" (a person who studies in general). Gender-marked: aluno (m), aluna (f).', 'word', 'Sou aluna da professora Costa.', 'Use "aluno/a" to describe a student-of-someone relationship; "estudante" for general identity.', null, [ACT.vocabularyPeople]),
  createContentItem('engenheiro / engenheira', 'engenheiro / engenheira', 'Engineer (any discipline). Gender-marked. Note the double palatalization in BP pronunciation: "en-je-NHE-ru" — but no t/d/i sequences here, just the soft g and palatal nh.', 'word', 'Ele é engenheiro de software.', 'Modern profession; "de software" / "civil" / "elétrico" specifies the field.', null, [ACT.vocabularyPeople]),
  createContentItem('médico / médica', 'médico / médica /ˈmɛ.dʒi.ku/ /ˈmɛ.dʒi.ka/', 'A medical doctor. Used both as a noun (a profession) and as an address ("Doutor" or "Doutora" + name is more common for direct address). Note the proparoxítona stress (MÉ-dico) and the BP palatalization on -di-.', 'word', 'Minha mãe é médica.', 'Stress on first syllable; written accent on é signals the stress.', null, [ACT.vocabularyPeople]),
  createContentItem('brasileiro / brasileira', 'brasileiro / brasileira /bra.ziˈlej.ɾu/ /-ɾa/', 'A Brazilian person. Gender-marked. Country name "Brasil" + gentilic suffix -eiro/-eira. Stress on -EI-.', 'word', 'Sou brasileira, de Salvador.', 'Standard nationality self-identification.', null, [ACT.vocabularyPeople]),
  createContentItem('português / portuguesa', 'português / portuguesa /poʁ.tuˈges/ /-ˈge.za/', 'A Portuguese person OR the Portuguese language. Gender-marked for "person" (português/portuguesa); language is invariant "o português". Note the nasal "ês" ending in masculine.', 'word', 'Ele é português, de Lisboa.', 'Same word for nationality and language — context decides.', null, [ACT.vocabularyPeople]),
  createContentItem('americano / americana', 'americano / americana', 'An American (from the USA). Gender-marked. "Estadunidense" (a more precise term) exists but is rarely used; "americano" is the everyday word.', 'word', 'Sofia é americana, de Boston.', 'Note: "americano" in BP usually means USA-American; for "from the Americas" use "do continente americano".', null, [ACT.vocabularyPeople]),
  createContentItem('coreano / coreana', 'coreano / coreana', 'A Korean person OR the Korean language. Gender-marked for person, invariant for language ("o coreano"). Same pattern as português.', 'word', 'Meu colega é coreano, de Seul.', 'Standard nationality term; Brazil has a significant Korean community concentrated in São Paulo.', null, [ACT.vocabularyPeople]),
  createContentItem('chinês / chinesa', 'chinês / chinesa /ʃiˈnes/ /-ˈne.za/', 'A Chinese person OR the Chinese language. Same -ês/-esa pattern as português and japonês.', 'word', 'A professora é chinesa, de Xangai.', 'Note: x in "chinês" = /ʃ/; in "Xangai" also /ʃ/.', null, [ACT.vocabularyPeople]),
  createContentItem('japonês / japonesa', 'japonês / japonesa', 'A Japanese person OR the Japanese language. São Paulo has the largest Japanese diaspora outside Japan (Liberdade neighborhood).', 'word', 'Meu vizinho é japonês.', 'Connect to São Paulo cultural fact: Liberdade is the world\'s largest Japanese community outside Japan.', null, [ACT.vocabularyPeople]),
  createContentItem('moçambicano / moçambicana', 'moçambicano /-cana', 'A Mozambican person. Mozambique is one of the Portuguese-speaking African countries (PALOP) and shares the same standard written Portuguese with some lexical differences.', 'word', 'Meu professor é moçambicano, de Maputo.', 'Portuguese is the official language of Mozambique alongside many Bantu languages.', null, [ACT.vocabularyPeople]),
  createContentItem('angolano / angolana', 'angolano / angolana', 'An Angolan person. Angola, like Mozambique, is a PALOP country where Portuguese is official and shares the EP grammar baseline with local lexical and phonological variation.', 'word', 'Ela é angolana, de Luanda.', 'PALOP = Países Africanos de Língua Oficial Portuguesa.', null, [ACT.vocabularyPeople]),

  // ────────────────────────────────────────────────────────────────────
  // Activity 5 — Grammar I: SER copula
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'ser (identidade)',
    'ser — identity copula',
    'SER is the Portuguese "to be" for IDENTITY, ORIGIN, INHERENT TRAITS, and DEFINITIONS. Pairs with nouns and lasting characteristics: name, nationality, profession, character, time/date. Contrast with ESTAR (temporary states, locations of movable things) — covered next unit.',
    'sentence',
    'Eu SOU estudante. Você É brasileira. Eles SÃO médicos.',
    'SER tells you WHO/WHAT something IS at its core; ESTAR tells you WHERE/HOW it currently is. This unit only covers SER.',
    [
      { target: 'eu sou', note: '1st person singular; the most frequent self-introduction form' },
      { target: 'você é', note: '2nd person (BP default); also used with tu in BP regional dialects' },
      { target: 'ele/ela é', note: '3rd person singular; same form as você é' },
      { target: 'nós somos', note: '1st person plural; "we are"' },
      { target: 'vocês são', note: '2nd person plural; "you all are"' },
      { target: 'eles/elas são', note: '3rd person plural; "they are"' },
    ],
    [ACT.grammarSerEstar],
  ),
  createContentItem(
    'ser EP: tu és',
    'EP tu form',
    'In EP, the second-person singular informal pronoun is "tu" with its OWN verb conjugation: tu és (not tu é). BP-standard speakers rarely use tu; BP regional speakers (gaúcho, paraense) use "tu é" with the 3rd-person form. Learn both for full coverage.',
    'sentence',
    'EP: Tu és estudante? BP standard: Você é estudante? BP gaúcho: Tu é estudante?',
    'The EP form "tu és" is one of only a handful of 2nd-person-singular forms a BP learner needs to recognize passively.',
    [
      { target: 'EP: tu és', note: 'standard EP 2nd person singular informal' },
      { target: 'BP gaúcho: tu é', note: 'regional BP; uses 3rd-person verb with 2nd-person pronoun' },
      { target: 'BP standard: você é', note: 'most common across all of Brazil; this course\'s default' },
    ],
    [ACT.grammarSerEstar],
  ),
  createContentItem(
    'Yes/no questions',
    'inversion + intonation',
    'Yes/no questions in Portuguese use the SAME word order as statements; only the intonation rises at the end. Optional question word at the start can intensify the question. "Você é estudante?" with rising tone = "Are you a student?".',
    'sentence',
    'Statement: Você é estudante.\nQuestion: Você é estudante?',
    'Word order does NOT invert (unlike English "Are you?"). Just raise the pitch on the last syllable.',
    [
      { target: 'rising intonation only', note: 'no word inversion needed; pitch alone marks the question' },
      { target: 'short yes answer: Sou', note: 'BP commonly repeats the verb as a confirmation, especially without "sim"' },
      { target: 'short no answer: Não sou', note: 'negate the verb directly; "não" before SER' },
    ],
    [ACT.grammarSerEstar],
  ),
  createContentItem(
    'Information questions',
    'qual / quem / de onde',
    'Information questions use a question word at the start: qual ("which/what" for specific items), quem ("who"), de onde ("from where"), como ("how"), o que ("what" for generic things). Word order: question-word + verb + subject.',
    'sentence',
    'Qual é o seu nome? Quem é você? De onde você é? Como você se chama?',
    'These four cover ~95 percent of first-meeting interrogatives.',
    [
      { target: 'Qual é…?', note: 'use for specific identification: "Qual é o seu nome?" / "Qual é o seu telefone?"' },
      { target: 'Quem é…?', note: 'asking who a person is; "Quem é ele?"' },
      { target: 'De onde…?', note: 'asking origin; combines preposition + onde' },
      { target: 'Como…?', note: 'asking manner or wellbeing; "Como você se chama?"' },
    ],
    [ACT.grammarSerEstar],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 6 — Grammar II: Pronouns + possessives
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'Pronomes pessoais',
    'subject pronouns',
    'BP has 8 subject pronouns (some optional in EP). Required in BP much more often than in Spanish or Italian. Plural form "a gente" replaces "nós" in casual speech but takes a SINGULAR verb.',
    'sentence',
    'eu / você / tu / ele / ela / nós / a gente / vocês / eles / elas',
    'Always learn the verb-form-with-pronoun pair, not isolated pronouns; agreement matters.',
    null,
    [ACT.grammarPronouns],
  ),
  createContentItem(
    'Possessivos: meu / minha',
    'meu / minha — 1st person possessive',
    'Possessive adjectives agree in GENDER and NUMBER with the POSSESSED noun, not the owner. "Meu nome" (m: name is masculine) vs "Minha cidade" (f: city is feminine). Plural: meus nomes, minhas cidades.',
    'sentence',
    'meu nome (m), minha família (f), meus amigos (m-pl), minhas amigas (f-pl)',
    'The owner is always "eu" (me) regardless of which form you use; only the possessed noun controls agreement.',
    [
      { target: 'meu (m sg)', note: 'my + masculine singular noun: meu pai, meu carro' },
      { target: 'minha (f sg)', note: 'my + feminine singular noun: minha mãe, minha casa' },
      { target: 'meus (m pl)', note: 'my + masculine plural noun: meus pais, meus livros' },
      { target: 'minhas (f pl)', note: 'my + feminine plural noun: minhas irmãs, minhas amigas' },
    ],
    [ACT.grammarPronouns],
  ),
  createContentItem(
    'Possessivos: seu / sua',
    'seu / sua — 2nd person possessive',
    '"Seu/sua" is the BP default "your" — agrees with the possessed noun like meu/minha. AMBIGUITY: "seu" can also mean "his/her/their" in BP; context disambiguates, or use "dele/dela" for clarity.',
    'sentence',
    'seu nome (your name OR his/her name), sua família (your family OR his/her family)',
    'BP often resolves the ambiguity by using "dele/dela" for 3rd person: "o nome dele" = "his name", unambiguously.',
    [
      { target: 'seu (m sg)', note: 'your/his/her + masculine noun: seu pai, seu carro' },
      { target: 'sua (f sg)', note: 'your/his/her + feminine noun: sua mãe, sua casa' },
      { target: 'dele (his)', note: 'unambiguous "his"; literal "of him"; "o nome dele"' },
      { target: 'dela (her)', note: 'unambiguous "her"; literal "of her"; "a casa dela"' },
    ],
    [ACT.grammarPronouns],
  ),
  createContentItem(
    'Possessivos: nosso / nossa',
    'nosso / nossa — 1st person plural possessive',
    '"Nosso/nossa" = "our" — agrees with the possessed noun. Plural: nossos, nossas. Unlike English "our", these agree in BOTH gender and number with the thing owned.',
    'sentence',
    'nosso professor (m sg), nossa universidade (f sg), nossos colegas (m pl), nossas amigas (f pl)',
    'Same agreement logic as meu/minha — owner is irrelevant, possessed noun is what controls the form.',
    null,
    [ACT.grammarPronouns],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 7 — Grammar III: Negation
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'não — negação',
    'não — sentence negation',
    'Place "não" (no/not) directly BEFORE the verb to negate any sentence. "Eu não sou japonês" ("I am not Japanese"). Word order does NOT change. The same "não" handles both English "no" (answer) and "not" (sentence negator).',
    'sentence',
    'Você é estudante? — Não, eu não sou estudante.',
    'The first "não" is the answer "no"; the second "não" is the sentence negator. Both use the same word.',
    [
      { target: 'Não as answer', note: 'standalone: "Não" = "No"' },
      { target: 'Não + verb', note: 'preposed negation: "não sou", "não é", "não somos"' },
    ],
    [ACT.grammarNegation],
  ),
  createContentItem(
    'Doubled não (BP)',
    'doubled não for emphasis',
    'BP commonly DOUBLES the não at sentence end for emphasis: "Não sou, não" or "Não é não". The first não is the standard negator; the second is purely emphatic — it strengthens the denial without changing meaning. EP rarely uses this.',
    'sentence',
    'Não sou brasileiro, não.',
    'A purely BP-specific pattern; using it marks you as Brazilian. Optional but very common.',
    null,
    [ACT.grammarNegation],
  ),
  createContentItem(
    'Não X, é Y — correction',
    'não X, é Y pattern',
    'The standard polite pattern for correcting someone\'s wrong guess: "Não, não sou X. Sou Y." Three parts: denial (não), wrong item (X), then the correct item (sou Y). Skipping any of these makes the correction sound abrupt.',
    'sentence',
    'A: Você é japonesa? — B: Não, não sou japonesa. Sou coreana.',
    'The three-part rhythm is what makes the correction feel natural rather than blunt.',
    [
      { target: 'Não (denial)', note: '"no" — opens the correction politely' },
      { target: 'Não sou X (specific denial)', note: 'repeats the wrong assumption with negation' },
      { target: 'Sou Y (offered alternative)', note: 'closes the loop and gives the asker the right answer' },
    ],
    [ACT.grammarNegation],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 8 — Reading & Speaking
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'Auto-apresentação',
    'self-introduction (reading)',
    'A complete five-sentence self-introduction in Brazilian Portuguese. Read it aloud with correct stress, palatalization, and nasalization. Notice how nearly every sentence starts with "Eu" or has explicit subject.',
    'paragraph',
    'Oi! Meu nome é Sofia, eu sou americana. Eu sou estudante da Universidade de São Paulo, e o meu curso é engenharia de computação. Muito prazer em conhecer vocês!',
    'Translation: "Hi! My name is Sofia, I am American. I am a student at the University of São Paulo, and my course is Computer Engineering. Nice to meet you all!"',
    [
      { target: 'Meu nome é Sofia', note: 'standard self-introduction; "meu" agrees with masculine "nome"' },
      { target: 'eu sou americana', note: 'gender-marked nationality; -a ending for female speaker' },
      { target: 'estudante da USP', note: 'da = "de" + "a" (feminine article contraction); USP takes feminine article' },
      { target: 'engenharia de computação', note: '"de" contracts only when followed by article; "de computação" stays separate' },
      { target: 'Muito prazer em conhecer vocês', note: 'standard polite closing of a first-meeting introduction' },
    ],
    [ACT.reading],
  ),
  createContentItem(
    'Perguntas de compreensão',
    'comprehension questions',
    'Four standard comprehension questions matching the paragraph. Answer each in a short sentence using SER; full sentences are not required for natural Portuguese (short verb-only answers work too).',
    'sentence',
    'Q1: Qual é o nome dela? Q2: De onde ela é? Q3: Ela é estudante? Q4: Qual é o curso dela?',
    'Each question targets a specific micro-skill from the lesson.',
    [
      { target: 'A1: O nome dela é Sofia.', note: 'name answer using "dela" for 3rd-person possession; unambiguous' },
      { target: 'A2: Ela é dos Estados Unidos / dos EUA.', note: 'origin answer; "dos" = "de + os" article contraction' },
      { target: 'A3: É. / É, sim. / Ela é estudante.', note: 'short positive answer; can repeat verb or full sentence' },
      { target: 'A4: O curso dela é engenharia de computação.', note: 'specific answer using "dela" for clarity' },
    ],
    [ACT.reading],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 9 — Listening & Speaking
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'Primeira conversa (USP)',
    'first conversation (USP)',
    'A natural casual-register first-meeting conversation between two students at USP. Covers all the patterns from this lesson: greetings, names, origins, roles, agreements, and farewells.',
    'conversation',
    'A: Oi! Tudo bem? Meu nome é Lucas. E você?\nB: Oi, Lucas! Tudo bem? Eu sou Sofia, muito prazer.\nA: Prazer, Sofia! De onde você é?\nB: Eu sou dos Estados Unidos. E você?\nA: Sou brasileiro, de São Paulo. Você é estudante daqui da USP?\nB: Sou, sim! Estudo engenharia. E você?\nA: Eu também estudo engenharia! Que coincidência!\nB: Que legal! Então até a próxima aula!',
    'A natural exchange between peers using casual BP — the default for student-age interactions in São Paulo.',
    [
      { target: 'Tudo bem?', note: 'wellbeing check; appears in both speakers\' opening turns' },
      { target: 'E você?', note: 'standard return-the-question phrase after answering your own turn' },
      { target: 'De onde você é?', note: '"where are you from?"; combines preposition "de" + "onde"' },
      { target: 'da USP', note: 'preposition + article contraction: "de + a" = "da"; USP takes feminine article' },
      { target: 'Eu também', note: '"me too / I also"; "também" before or after the verb' },
      { target: 'Que legal!', note: '"how cool!" — universal BP positive reaction expression' },
      { target: 'Até a próxima aula', note: '"until the next class"; "a próxima" feminine because "aula" is feminine' },
    ],
    [ACT.listening],
  ),
  createContentItem(
    'Conversa formal (academia)',
    'formal conversation (academic)',
    'A formal first-meeting conversation suitable for student-professor or business contexts. Notice the formal vocabulary: o senhor / a senhora, "muito prazer em conhecê-lo(a)", surname + title — register markers signaling a more deliberate interaction.',
    'conversation',
    'Aluna: Bom dia, professora! A senhora é a professora Costa?\nProfessora: Bom dia! Sim, sou eu. E a senhorita é...?\nAluna: Eu sou Sofia Mendes, sua nova aluna do curso de engenharia.\nProfessora: Ah, muito prazer em conhecê-la, Sofia. Bem-vinda à USP.\nAluna: Muito obrigada, professora. É uma honra estudar com a senhora.\nProfessora: O prazer é meu. Aceita um cafezinho?',
    'Same information as the casual version but with formal phrasing throughout — appropriate for hierarchical (student-professor) relationships.',
    [
      { target: 'A senhora', note: 'formal "you" for women; takes 3rd-person verb (a senhora é)' },
      { target: 'A senhorita', note: 'formal "you" for young unmarried women; slightly old-fashioned but still used in academic settings' },
      { target: 'conhecê-la', note: 'infinitive + clitic -la ("her/you-formal-fem"); ênclise (clitic after verb)' },
      { target: 'Bem-vinda', note: 'gender-marked welcome; feminine -vinda agrees with female addressee' },
      { target: 'cafezinho', note: 'diminutive of café; the universal Brazilian welcome ritual — offering an espresso-sized coffee' },
    ],
    [ACT.listening],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 10 — Writing
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'Modelo de escrita',
    'writing template',
    'A reusable five-sentence template for any Portuguese self-introduction. Fill in the bracketed slots with your own information — the structure carries the rest.',
    'sentence',
    'Oi! Meu nome é [nome]. Eu sou [nacionalidade m/f]. Eu sou [profissão/papel] na USP. Eu [um fato extra]. Muito prazer em conhecer vocês!',
    'Five sentences cover the core: greeting, name, nationality, role, personal fact, closing — the minimum complete self-introduction.',
    [
      { target: '[nome]', note: 'your given name; surname optional for casual contexts' },
      { target: '[nacionalidade]', note: 'gender-marked: brasileiro(a), americano(a), coreano(a), português/portuguesa' },
      { target: '[profissão/papel]', note: 'estudante / professor(a) / engenheiro(a) — gender-mark where applicable' },
      { target: '[fato extra]', note: 'something specific that distinguishes you (hobby, course, favorite thing)' },
    ],
    [ACT.writing],
  ),
  createContentItem(
    'Exercício de escrita',
    'writing exercise',
    'Write your own 3–5 sentence self-introduction in Portuguese using the template. Use SER at least twice and one possessive (meu/minha/seu/sua) so the writing demonstrates the core grammar of this lesson.',
    'sentence',
    'Exemplo: Oi! Meu nome é Yujin. Eu sou coreana, de Seul. Sou estudante de engenharia na USP. Adoro música brasileira. Muito prazer!',
    'Translation: "Hi! My name is Yujin. I am Korean, from Seoul. I am an engineering student at USP. I love Brazilian music. Nice to meet you!"',
    null,
    [ACT.writing],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 11 — Culture Note
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'Beijinhos',
    'beijinhos — cheek-kiss greeting',
    'Standard Brazilian female-to-female and female-to-male-friend greeting: a kiss on each cheek (right cheek first), usually a quick air-kiss not a wet one. Regional variation: São Paulo = ONE kiss on the right cheek; Rio = TWO (right then left); Minas/Northeast = often THREE. Men typically shake hands or hug close friends rather than kiss.',
    'word',
    'Oi! Beijinhos! (parting kiss-greeting)',
    'Trying to do TWO kisses in São Paulo will leave you kissing air on the second attempt — pay attention to the local count.',
    [
      { target: 'SP: um beijinho', note: 'paulistano default; one kiss on the right cheek' },
      { target: 'RJ: dois beijinhos', note: 'carioca default; right then left' },
      { target: 'MG / NE: três', note: 'mineiro and nordestino traditions often add a third kiss' },
      { target: 'EP: dois beijinhos', note: 'Portugal default; two kisses, right then left' },
    ],
    [ACT.culture],
  ),
  createContentItem(
    'Diminutivos',
    'diminutives -inho / -inha',
    'Brazilian Portuguese loves diminutives. Adding -inho (m) or -inha (f) to almost any noun signals warmth, casualness, smallness, or affection: cafezinho (a "little coffee" = the universal welcome espresso), beijinho (a "little kiss"), amorzinho (sweetheart), oizinho (a tiny "hi"). EP uses diminutives more sparingly.',
    'word',
    'cafezinho, beijinho, amorzinho, casinha, irmãzinha',
    'Even nouns that are not literally "small" take diminutives for warmth: a doctor offering you cafezinho is not promising less coffee — just warmer hospitality.',
    [
      { target: 'cafezinho', note: 'the BP welcome espresso; offering it is the universal Brazilian hospitality move' },
      { target: 'beijinho', note: 'air-kiss greeting / brigadeiro-style sweet; both meanings common' },
      { target: 'amorzinho', note: 'term of endearment among friends, family, between partners' },
      { target: 'oizinho', note: 'a sweet "hi"; common in texting' },
    ],
    [ACT.culture],
  ),
  createContentItem(
    'BP "você" vs EP "tu/você"',
    'pronoun politics across the Atlantic',
    'BP "você" is the universal default singular you — casual or polite, friend or stranger. EP "você" is RISKY: with peers it sounds COLD or CONDESCENDING; with strangers it can come across as talking down. EP defaults are "tu" (informal) or "o senhor / a senhora" (formal). A Brazilian visiting Lisbon should learn to use names + 3rd-person verbs ("Como está, Maria?") rather than "Como está você?".',
    'sentence',
    'BP: Você quer um café? (any context)\nEP polite: Quer um café? (no pronoun, or full name)',
    'The pronoun politics is one of the biggest social differences between BP and EP — getting it wrong marks you as foreign in either country.',
    [
      { target: 'BP você (everywhere)', note: 'works in 99 percent of BP situations; the safe choice' },
      { target: 'EP tu (peers)', note: 'EP default for friends, family, peers; takes 2nd-person verb (tu és)' },
      { target: 'EP o senhor / a senhora', note: 'EP polite; takes 3rd-person verb' },
      { target: 'EP você (avoid)', note: 'sounds condescending in many contexts; use only when relationship is clearly equal AND you have permission' },
    ],
    [ACT.culture],
  ),
  createContentItem(
    'USP — Universidade de São Paulo',
    'USP overview',
    'The Universidade de São Paulo (USP) is the largest research university in Latin America and the BP-speaking world\'s flagship campus. Founded in 1934. Public, free tuition, highly selective entrance exam (vestibular / FUVEST). The default referent whenever this curriculum says "the university" — pictures placed at the Cidade Universitária campus in Butantã, São Paulo.',
    'word',
    'USP — Universidade de São Paulo, Cidade Universitária, Butantã, São Paulo, SP, Brasil',
    'Anchoring lessons at USP lets every dialogue have a concrete location, accent (paulistano), and student population to picture.',
    null,
    [ACT.culture],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 12 — Task / Consolidation
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'Tarefa: Primeiro dia na USP',
    'task: first day at USP',
    'Roleplay your first day at USP with the AI tutor playing a friendly paulistano student. Use every skill from this lesson in one continuous scene — greet, introduce, ask, answer, correct, farewell.',
    'conversation',
    '[Corredor da USP, primeiro dia]\nEstudante paulistano: Oi! Tudo bem? Meu nome é Lucas. E você?\nVocê: [cumprimentar + apresentar-se]\nLucas: De onde você é?\nVocê: [dizer país/cidade]\nLucas: Você também é estudante da USP?\nVocê: [confirmar + dizer seu curso]\nLucas: Que legal! Qual é o seu curso?\nVocê: [responder]\nLucas: Foi um prazer te conhecer!\nVocê: [despedir-se]',
    'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever you say.',
    [
      { target: 'cumprimentar', note: 'Oi / Olá / Tudo bem? — match Lucas\'s casual register' },
      { target: 'apresentar-se', note: 'Meu nome é… or Sou… — use the natural form' },
      { target: 'país/cidade', note: 'Sou [nacionalidade], de [cidade] — gender-mark nationality correctly' },
      { target: 'curso', note: 'Estudo… or O meu curso é… — state your major' },
      { target: 'despedir-se', note: 'Tchau / Até logo / Até a próxima — match the register you opened with' },
    ],
    [ACT.task],
  ),
  createContentItem(
    'Desafio — Corrigir uma suposição',
    'challenge — correct an assumption',
    'Stretch goal: in the same scene, Lucas guesses your country incorrectly. Politely correct using the "Não, não sou X. Sou Y" pattern. Closes the loop without making the asker feel embarrassed.',
    'conversation',
    'Lucas: Ah, você é japonesa, né?\nVocê: Não, eu não sou japonesa. Sou coreana, de Seul.\nLucas: Ah, desculpa, me confundi!\nVocê: Tudo bem, sem problema.',
    '"Tudo bem" and "sem problema" are casual reassurances; standard responses to any small apology or mistake.',
    [
      { target: 'Não, não sou X. Sou Y.', note: 'standard three-part polite correction pattern from Grammar III' },
      { target: 'né? (question tag)', note: 'BP contraction of "não é?"; tag-question marker like English "right?"' },
      { target: 'me confundi', note: '"I got confused"; reflexive verb with pronoun; pronoun placement is próclise in BP' },
      { target: 'Tudo bem, sem problema.', note: 'casual reassurance pair; standard response to a small apology' },
    ],
    [ACT.task],
  ),
];

module.exports = {
  title: 'Level 1 · Unit 1: Olá — Greetings and Self-Introduction',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'pt',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (oi / olá / tchau / até logo) and match the register to the relationship.' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences using "Meu nome é…" and "Eu sou…".' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask "De onde você é?" and respond naturally with country + city, gender-marking the nationality correctly.' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use the "Não, não sou X. Sou Y" pattern to politely correct a wrong guess about your nationality or role.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content,
};
