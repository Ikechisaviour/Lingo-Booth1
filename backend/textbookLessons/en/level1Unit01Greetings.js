// Level 1 Unit 1 — Greetings & Self-Introduction (English)
// Functions: greeting, introducing yourself, asking where someone is from,
// correcting a wrong assumption, farewells.
// This lesson is the canonical TEMPLATE for all English thematic Level 1 lessons.
//
// All content is authored in English (the target). The AI conversation tutor
// reads this curriculum and delivers it to each learner in their preferred
// native language at runtime — never assume a specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition.

const createContentItem = (
  target,
  ipa,
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
  romanization: ipa,
  nativeText: note,
  pronunciation: ipa,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'en-l1u1-orientation',
  pronunciation: 'en-l1u1-pronunciation',
  vocabularyGreetings: 'en-l1u1-vocab-greetings',
  vocabularyPeople: 'en-l1u1-vocab-people',
  grammarToBe: 'en-l1u1-grammar-to-be',
  grammarPronounsArticles: 'en-l1u1-grammar-pronouns-articles',
  grammarNegation: 'en-l1u1-grammar-negation',
  reading: 'en-l1u1-reading',
  listening: 'en-l1u1-listening',
  writing: 'en-l1u1-writing',
  culture: 'en-l1u1-culture',
  task: 'en-l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet someone in English and say goodbye in three registers (casual, polite, formal) so you can match the situation.',
      'Introduce yourself with your name, country, and one role (student / teacher / engineer) in a single short turn.',
      'Ask another person their name and where they are from, then respond appropriately to their answer.',
    ],
    task: 'Picture your first day at Massachusetts Institute of Technology — you walk into a meeting with international colleagues. By the end of this lesson you should be able to handle the whole scene without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce the two "th" sounds — voiceless /θ/ in "thank you", voiced /ð/ in "this" — by placing the tongue tip between the teeth.',
      'Use contractions (I\'m, you\'re, it\'s) by default — full forms (I am, you are, it is) sound stiff or emphatic in casual conversation.',
      'Reduce am/are/is to schwa in natural speech (/əm ər ɪz/) so the rhythm matches stress-timed English.',
    ],
    task: 'Read each example out loud and hold a hand on your throat to feel which sounds vibrate (voiced) and which do not (voiceless).',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 12 greetings and farewells across three registers, with the right phrase for each situation.',
      'Know when to use "How do you do" (formal first meetings only) vs "How are you" (everyday ritual greeting, no real answer expected).',
    ],
    task: 'Say each phrase out loud three times, then pair each one with the situation where you would use it (peer, professor, customer, friend).',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and nationalities',
    goals: [
      'Use the 7 subject pronouns (I, you, he, she, it, we, they) and the common titles (Mr, Mrs, Ms, Dr, Professor) correctly with names.',
      'State your role (student / teacher / engineer) and nationality in a complete short sentence.',
    ],
    task: 'Say your own role and nationality in one sentence, then describe one classmate in a second sentence using a third-person pronoun.',
  },
  {
    id: ACT.grammarToBe,
    section: 'Grammar I',
    title: 'The verb "to be" — am / is / are (+ contractions)',
    goals: [
      'Conjugate "to be" with all six subject pronouns: I am, you are, he/she/it is, we are, they are.',
      'Use the contraction form (I\'m, you\'re, he\'s) by default in speech; the long form is reserved for emphasis or formal writing.',
      'Form a yes/no question by inverting subject and verb (Are you a student?) — the most common question pattern in English.',
    ],
    task: 'Write six sentences about yourself: three using full forms, three using contractions, covering at least three different pronouns.',
  },
  {
    id: ACT.grammarPronounsArticles,
    section: 'Grammar II',
    title: 'Subject pronouns + a / an / the (articles)',
    goals: [
      'Use the 7 subject pronouns explicitly — English sentences almost always require a subject, even when the meaning is obvious.',
      'Use "a" before consonant sounds and "an" before vowel sounds — the choice depends on the SOUND of the next word, not the letter.',
      'Use "the" when both speakers know which specific one is meant; use no article for general plural or uncountable nouns.',
    ],
    task: 'Fill in a/an/the in three short sentences, then justify each choice based on whether the noun is first mention, specific, or generic.',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar III',
    title: 'Negation — not, isn\'t, aren\'t, I\'m not',
    goals: [
      'Negate a "to be" sentence by placing NOT immediately after am/is/are.',
      'Use the contraction (isn\'t, aren\'t) by default in speech; "I am not" contracts only the pronoun half (I\'m not), never the verb half.',
      'Apply the "No, I\'m not …, I\'m …" pattern to correct someone\'s wrong guess politely.',
    ],
    task: 'Imagine a classmate guesses your nationality wrong; correct them in one polite sentence using the standard pattern.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a self-introduction',
    goals: [
      'Read a short self-introduction paragraph aloud with correct word stress and natural schwa reduction.',
      'Answer comprehension questions about the speaker\'s name, country, role, and department using short "to be" answers.',
    ],
    task: 'Read the paragraph below aloud once, then answer the four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first meeting',
    goals: [
      'Follow a 4-turn first-meeting dialogue and recognize the polite vs formal register markers.',
      'Reproduce the dialogue with your own name and country, swapping in the relevant phrases naturally.',
    ],
    task: 'Read the polite dialogue along with the AI tutor first, then perform it again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own self-introduction',
    goals: [
      'Write 3–5 sentences covering greeting, name, country, role, and one extra fact about yourself.',
      'Use at least one contraction (I\'m, it\'s) and one article (a, an) so the writing sounds natural rather than mechanical.',
    ],
    task: 'Write your own self-introduction in 3–5 sentences using the model on the left, then read it aloud to check the rhythm.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Handshakes, eye contact, first names, and small talk',
    goals: [
      'Use a firm 2–3-second handshake with eye contact as the default professional greeting; bowing is uncommon in English-speaking cultures.',
      'Switch to first names quickly — most English-speaking workplaces do not use last names except for very senior or first-meeting situations.',
      'Open conversations with brief small talk (weather, weekend, travel) before any business topic — skipping this feels abrupt to a native speaker.',
    ],
    task: 'Decide how you would greet (1) a classmate, (2) your professor, (3) a CEO at a job fair — name the greeting, the handshake style, and the small-talk opener for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day at MIT — in English',
    goals: [
      'Combine everything from this lesson into one continuous scene with no break between greeting, introduction, question, answer, correction, and farewell.',
      'Improvise responses to the AI tutor\'s prompts rather than reading from a script — the goal is fluent recall, not rehearsal.',
    ],
    task: 'Roleplay your first day at Massachusetts Institute of Technology with the AI tutor playing an international classmate; aim for a 6-turn exchange.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 1: Hello — Greetings and Self-Introduction',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'en',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (Hello / Goodbye / See you) and match the register to the relationship.' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences, fluently and without pausing to translate.' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask "Where are you from?" with falling intonation and respond naturally to the answer.' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use the standard "No, I\'m not …, I\'m …" pattern to politely correct a wrong guess about your nationality or role.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Lesson goal',
      'self-introduction',
      'By the end of this lesson, you can greet someone in English, give your name, say where you are from, ask the same in return, and farewell — all in one short conversation without pausing to think.',
      'word',
      'Functional language: greet · introduce · ask origin · negate · farewell.',
      'These five micro-skills are the spine of every social encounter — once they\'re automatic, every later lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      'Real-world scenario',
      'first day at MIT',
      'You are at Massachusetts Institute of Technology on your first day and a new international colleague turns to you at the next desk. The whole encounter takes about 30 seconds and you will need every micro-skill from this lesson.',
      'word',
      'Colleague: "Hi, I\'m Sarah. Where are you from?"',
      'A casual opener: "Hi" (casual register) + contracted name + immediate origin question — a typical Western workplace pattern.',
      [
        { target: 'Hi, I\'m Sarah', note: 'casual register greeting + self-introduction with contraction; appropriate among peers' },
        { target: 'Where are you from?', note: 'standard origin question; falling intonation; safe with strangers in most English-speaking contexts' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      'Three registers in English',
      'casual / polite / formal',
      'English greetings split into three rough registers. Casual (peers, friends): Hi / Hey / Bye. Polite (first meetings, workplace, customers): Hello / Nice to meet you / Goodbye. Formal (interviews, ceremonies, very senior people): Good morning / How do you do / It was a pleasure.',
      'word',
      'Hi (casual) / Hello (polite) / Good morning (formal) — same greeting function, three social levels.',
      'Choosing the wrong register is the fastest way to sound out of place — too casual with a senior feels disrespectful; too formal with a peer feels cold.',
      [
        { target: 'CASUAL: Hi, Hey, Bye', note: 'use with peers, friends, equals, and in clearly informal settings (cafes, dorms, dorm-style work environments)' },
        { target: 'POLITE: Hello, Nice to meet you', note: 'the safe default for first meetings, customer-facing situations, and most workplace interactions' },
        { target: 'FORMAL: Good morning, How do you do', note: 'reserved for interviews, formal ceremonies, very senior people, and broadcast contexts' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'thank you',
      '/ˈθæŋk juː/',
      'Starts with voiceless /θ/ — tongue tip lightly between the teeth, push air. Not /s/, not /t/, not /f/ — substituting any of those marks an accent immediately.',
      'word',
      'Thank you. → /ˈθæŋkjuː/. Faster: /ˈθæŋkjə/.',
      'In quick speech "you" weakens to /jə/ — the strong /juː/ form sounds slightly emphatic.',
      [
        { target: 'th /θ/', note: 'voiceless dental fricative; tongue tip visible between the teeth, no throat vibration' },
        { target: 'ank', note: 'short /æ/ + velar nasal /ŋ/ + /k/ — three sounds blended quickly' },
        { target: 'you /juː/', note: 'strong form /juː/ when stressed; reduces to /jə/ when not — most common in fast speech' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'this is',
      '/ðɪs ɪz/',
      'Starts with voiced /ð/ — same tongue-between-teeth position as /θ/, but with throat vibration added. /ð/ appears in the most common English function words (this, that, the, they, them).',
      'word',
      'This is Sarah. → /ðɪs ɪz ˈsɛrə/. With linking: /ðɪ ˈsɪz ˈsɛrə/.',
      'In natural speech the /s/ of "this" links onto the vowel of "is" — listeners hear one fused chunk.',
      [
        { target: 'th /ð/', note: 'voiced dental fricative; throat vibrates; same tongue position as /θ/' },
        { target: 'is → /ɪz/', note: 'unstressed auxiliary verb; stays /ɪz/ unless emphatic (where it would become /ɪz/ with full stress)' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'I am → I\'m',
      '/aɪ æm/ → /aɪm/',
      'Almost always contracted in speech. The long form "I am" sounds stiff, formal, or emphatic — appropriate in writing or for strong emphasis ("I AM a student"), wrong as the default.',
      'word',
      'I am Sarah. → I\'m Sarah. /aɪm ˈsɛrə/.',
      'Default to the contraction; switch to the long form only when you want emphasis or formality.',
      [
        { target: 'I am (formal/written/emphatic)', note: 'kept full in writing, formal speech, or when stressing the verb for emphasis' },
        { target: 'I\'m (everyday default)', note: 'the natural spoken form — every native speaker contracts unless emphasizing' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'Nice to meet you',
      '/naɪs tə ˈmiːtʃuː/',
      'A staple polite phrase with three connected-speech features: "to" weakens to /tə/, "meet you" assimilates to /miːtʃuː/, and the whole phrase flows as one unit at conversational speed.',
      'word',
      'Nice to meet you. → /naɪs tə ˈmiːtʃuː/ (fast) — said as one rhythmic unit.',
      'Reading it word-by-word sounds robotic; the natural delivery glues the words together.',
      [
        { target: 'to /tə/', note: 'preposition reduces to schwa — full /tuː/ would sound emphatic' },
        { target: 'meet you → meetchu', note: '/t/ + /j/ assimilates to /tʃ/; happens in every natural English accent' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'Where are you from?',
      '/ˈwɛr ər juː frɒm/',
      'A wh-question with falling intonation at the end (unlike yes/no questions which rise). The auxiliary "are" weakens to /ər/; "you" often weakens to /jə/. This is the most common origin question in English.',
      'word',
      'Where are you from? → /ˈwɛr ər jə ˈfrɒm/.',
      'Stress on "where" and "from" with the rest reduced — the rhythm pattern is "STRONG-weak-weak-STRONG".',
      null,
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('Hello', '/həˈloʊ/', 'A polite greeting suitable any time of day; the safest default for first meetings, customer-facing situations, and most workplace interactions.', 'word', 'Hello. Nice to meet you.', 'A standard polite first-meeting opener; pairs naturally with the next phrase.', null, [ACT.vocabularyGreetings]),
    createContentItem('Hi', '/haɪ/', 'A casual greeting used between peers, friends, and equals. Slightly less formal than Hello but appropriate in most modern workplaces; avoid with very senior people or in interviews.', 'word', 'Hi! I\'m Sarah.', 'Casual self-introduction; the exclamation mark mirrors the bright, friendly tone.', null, [ACT.vocabularyGreetings]),
    createContentItem('Hey', '/heɪ/', 'A very casual greeting used among close friends and peers; can also be used to get someone\'s attention. Not appropriate for first meetings, customers, or anyone senior.', 'word', 'Hey, what\'s up?', 'Friend-to-friend opener; "what\'s up" is itself a casual ritual question, not literal.', null, [ACT.vocabularyGreetings]),
    createContentItem('Good morning', '/ɡʊd ˈmɔːrnɪŋ/', 'A polite-to-formal greeting used before noon. The time-of-day variants (morning/afternoon/evening) are slightly more formal than Hello and very common in workplaces, classrooms, and broadcasts.', 'word', 'Good morning, everyone.', 'Polite group greeting at the start of a meeting, class, or broadcast.', null, [ACT.vocabularyGreetings]),
    createContentItem('Good afternoon', '/ɡʊd ˌɑːftərˈnuːn/', 'A polite-to-formal greeting used from roughly noon until evening. Same register as Good morning; the boundary with "evening" is fuzzy and varies by culture.', 'word', 'Good afternoon, Professor.', 'Polite address to a senior; pairs naturally with a title or last name.', null, [ACT.vocabularyGreetings]),
    createContentItem('Good evening', '/ɡʊd ˈiːvnɪŋ/', 'A polite-to-formal greeting used after sunset until late night. Distinct from "good night" — Good evening is a greeting (arriving), Good night is a farewell (leaving).', 'word', 'Good evening, ladies and gentlemen.', 'Formal opening for a public address, ceremony, or restaurant greeting.', null, [ACT.vocabularyGreetings]),
    createContentItem('Nice to meet you', '/naɪs tə ˈmiːtʃuː/', 'The standard polite phrase said at a first meeting. Used in almost every register from casual to formal; the universal safe response to a new introduction.', 'word', 'Nice to meet you. I\'m Min-su.', 'Combines the meeting-acknowledgment phrase with a contracted self-introduction in one fluent turn.', null, [ACT.vocabularyGreetings]),
    createContentItem('How do you do?', '/haʊ də juː ˈduː/', 'A very formal first-meeting phrase used in extremely traditional or ceremonial contexts. Counter-intuitively, the expected response is also "How do you do?" — not a real question. Rarely used in casual English today.', 'word', 'How do you do? I\'m Dr. Kim.', 'Formal first-meeting exchange; pairs with a title and last name for full formality.', null, [ACT.vocabularyGreetings]),
    createContentItem('How are you?', '/haʊ ər juː/', 'A ritual greeting, not a literal inquiry into wellbeing. The expected reply is short and positive ("Good, thanks. You?"). Sharing real feelings here is reserved for close friends; with strangers or acquaintances always reply briefly.', 'word', 'Hi! How are you? — I\'m good, thanks.', 'Standard everyday exchange; both turns are formulaic and quick.', null, [ACT.vocabularyGreetings]),
    createContentItem('Goodbye', '/ɡʊdˈbaɪ/', 'A polite farewell suitable for most workplace and customer contexts. Slightly more formal than "Bye" but less stiff than "It was a pleasure."', 'word', 'Goodbye! Have a good day.', 'Polite farewell combined with a warm closing wish — a common workplace and customer-service pattern.', null, [ACT.vocabularyGreetings]),
    createContentItem('Bye', '/baɪ/', 'A casual farewell used among friends, peers, and family. The everyday default in most informal English; "Goodbye" sounds slightly more deliberate.', 'word', 'Bye! See you tomorrow.', 'Friend-to-friend close; pairs naturally with a forward-looking phrase like "See you tomorrow".', null, [ACT.vocabularyGreetings]),
    createContentItem('See you', '/siː juː/', 'A casual farewell that explicitly expects a future meeting. Often followed by a time marker: "See you tomorrow / next week / soon / later." More personal than a plain "Bye".', 'word', 'See you later. / See you tomorrow.', 'Two common variants; "later" is open-ended while "tomorrow" pins the next meeting.', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People, roles, nationalities
    // ────────────────────────────────────────────────────────────────────
    createContentItem('I', '/aɪ/', 'First-person singular subject pronoun. Always capitalized, even mid-sentence — a spelling quirk unique to English among major world languages.', 'word', 'I am Sarah.', 'The simplest possible self-introduction: pronoun + form of "to be" + name.', null, [ACT.vocabularyPeople]),
    createContentItem('you', '/juː/', 'Second-person pronoun used for any addressee — singular or plural, formal or informal. English does not distinguish a polite "you" from a casual one (unlike many languages).', 'word', 'You are Korean.', 'A simple statement to someone — same form whether to one person or to a group.', null, [ACT.vocabularyPeople]),
    createContentItem('he', '/hiː/', 'Third-person singular masculine pronoun. English forces explicit gender for he/she — many languages do not, so this is a frequent grammar trap.', 'word', 'He is my friend.', 'Standard third-person introduction of a male individual.', null, [ACT.vocabularyPeople]),
    createContentItem('she', '/ʃiː/', 'Third-person singular feminine pronoun used for a single female person. Required when referring back to a previously mentioned woman or girl.', 'word', 'She is my teacher.', 'Standard third-person introduction of a female individual.', null, [ACT.vocabularyPeople]),
    createContentItem('it', '/ɪt/', 'Third-person singular pronoun for things, animals, abstract ideas, and weather. Used far more often in English than equivalent pronouns in many other languages.', 'word', 'It is a book.', 'The standard way to identify an object by category; pairs with "this" or "that" for emphasis.', null, [ACT.vocabularyPeople]),
    createContentItem('we', '/wiː/', 'First-person plural subject pronoun. Includes the speaker — distinct from "they" which excludes the speaker.', 'word', 'We are students.', 'Group self-identification; the speaker is part of the group being described.', null, [ACT.vocabularyPeople]),
    createContentItem('they', '/ðeɪ/', 'Third-person plural subject pronoun. Increasingly used as a singular gender-neutral pronoun for non-binary people or when gender is unknown — both uses are grammatically correct in modern English.', 'word', 'They are from Korea.', 'Plural reference to a group; or singular reference where gender is unspecified or non-binary.', null, [ACT.vocabularyPeople]),
    createContentItem('name', '/neɪm/', 'How a person is called or referred to. Appears most often in the formula "My name is …" — slightly more formal than "I\'m …" but interchangeable in practice.', 'word', 'My name is Sarah.', 'Standard self-introduction; equivalent to "I\'m Sarah" with a slightly more formal tone.', null, [ACT.vocabularyPeople]),
    createContentItem('Mr.', '/ˈmɪstər/', 'Title used before any adult man\'s last name (or sometimes full name). Marital status is not implied — the safe default title for any man whose preference you do not know.', 'word', 'Mr. Kim is my boss.', 'Title + last name pattern; appropriate for any workplace senior.', null, [ACT.vocabularyPeople]),
    createContentItem('Mrs.', '/ˈmɪsɪz/', 'Title used before a married woman\'s last name. Implies marital status — use only when you know the person is married and prefers this title; otherwise Ms. is safer.', 'word', 'Mrs. Park is my neighbor.', 'Traditional title; less common in younger generations who prefer Ms. regardless of marital status.', null, [ACT.vocabularyPeople]),
    createContentItem('Ms.', '/mɪz/', 'Title used before any adult woman\'s last name; marital status is not implied. The safest default title for any woman whose preference is unknown — equivalent to Mr. for men.', 'word', 'Ms. Lee is the manager.', 'Modern professional default; never wrong regardless of marital status.', null, [ACT.vocabularyPeople]),
    createContentItem('Dr.', '/ˈdɒktər/', 'Title used for someone with a doctorate (PhD, MD, EdD, etc.). Doubles as both academic and medical title — context tells you which one applies.', 'word', 'Dr. Choi is our professor.', 'Academic or medical title; outranks Mr./Ms. and is used in formal address.', null, [ACT.vocabularyPeople]),
    createContentItem('Professor', '/prəˈfɛsər/', 'Title used for university teachers, typically alongside a last name. Sometimes shortened to "Prof." in writing. American usage applies it more loosely (any college teacher); British usage reserves it for the most senior professorial rank.', 'word', 'Professor Smith teaches English.', 'Title + last name; appropriate in any academic setting.', null, [ACT.vocabularyPeople]),
    createContentItem('student', '/ˈstuːdənt/', 'A person currently studying — at any level from elementary school to graduate research. Used freely without qualification: "I\'m a student" implies "currently in formal education."', 'word', 'I am a student.', 'Most common role self-identifier in academic contexts; takes an indefinite article.', null, [ACT.vocabularyPeople]),
    createContentItem('teacher', '/ˈtiːtʃər/', 'A person who teaches — typically at primary or secondary level. For university-level instructors, "professor" or "lecturer" is more common.', 'word', 'She is a teacher.', 'Standard role label for someone whose job is teaching.', null, [ACT.vocabularyPeople]),
    createContentItem('engineer', '/ˌɛndʒɪˈnɪər/', 'A person trained in engineering — software, mechanical, electrical, etc. Note the indefinite article is "an" because the word starts with a vowel sound, not because of the letter.', 'word', 'He is an engineer.', 'Article example: vowel-sound word takes "an" regardless of opening letter.', null, [ACT.vocabularyPeople]),
    createContentItem('doctor', '/ˈdɒktər/', 'A medical professional. Same root as the title Dr., but used as a regular noun when describing a profession rather than addressing the person.', 'word', 'My mother is a doctor.', 'Profession description; the indefinite article identifies a category, not a specific person.', null, [ACT.vocabularyPeople]),
    createContentItem('Korean', '/kəˈriːən/', 'A person from Korea, or relating to Korea. Functions as both noun and adjective without form change — a common pattern for nationality words.', 'word', 'I am Korean.', 'Statement of nationality; the same word works as an adjective ("Korean food") or noun ("a Korean").', null, [ACT.vocabularyPeople]),
    createContentItem('American', '/əˈmɛrɪkən/', 'A person from the United States, or relating to the US. Note: in everyday English "American" usually means specifically the US, not all of the Americas — a common source of regional sensitivity.', 'word', 'Sarah is American.', 'Functions as both noun and adjective; "the USA" is more precise if needed.', null, [ACT.vocabularyPeople]),
    createContentItem('British', '/ˈbrɪtɪʃ/', 'Relating to the United Kingdom (or Great Britain). For a person, "British" works as an adjective but as a noun "a Briton" or informally "a Brit" is more common than "a British".', 'word', 'James is British.', 'Adjective use; the noun form often shifts to "a Brit" in casual speech.', null, [ACT.vocabularyPeople]),
    createContentItem('Chinese', '/tʃaɪˈniːz/', 'A person from China, or relating to China. Noun and adjective in one — like "Korean" and "Japanese", -ese nationality words don\'t change form.', 'word', 'Wang is Chinese.', 'Single-form nationality word covering both noun and adjective roles.', null, [ACT.vocabularyPeople]),
    createContentItem('Japanese', '/ˌdʒæpəˈniːz/', 'A person from Japan, or relating to Japan. Same -ese pattern as Chinese and Vietnamese — single form for noun and adjective.', 'word', 'Tanaka is Japanese.', 'Single-form -ese nationality word.', null, [ACT.vocabularyPeople]),
    createContentItem('Vietnamese', '/ˌvjɛtnəˈmiːz/', 'A person from Vietnam, or relating to Vietnam. Follows the -ese pattern; never pluralized as "Vietnameses".', 'word', 'My roommate is Vietnamese.', 'Single-form -ese nationality word; no plural inflection.', null, [ACT.vocabularyPeople]),
    createContentItem('Filipino', '/ˌfɪlɪˈpiːnoʊ/', 'A person from the Philippines, or relating to the Philippines. The form "Filipino" is used for males or as a default; "Filipina" is sometimes used specifically for females (though "Filipino" is increasingly used for everyone).', 'word', 'My friend is Filipino.', 'Both noun and adjective; the masculine/feminine split is fading in modern usage.', null, [ACT.vocabularyPeople]),
    createContentItem('Nigerian', '/naɪˈdʒɪəriən/', 'A person from Nigeria, or relating to Nigeria. The -ian/-an pattern is shared with many other nationality words (Canadian, Brazilian, Korean, Russian).', 'word', 'I am Nigerian.', 'Standard -ian nationality pattern.', null, [ACT.vocabularyPeople]),
    createContentItem('international student', '/ˌɪntərˈnæʃənl ˈstuːdənt/', 'A student studying outside their home country. The preferred term in academic and policy contexts — "foreign student" is older and can feel othering.', 'word', 'There are many international students at MIT.', 'The modern academic-policy term; preferred over "foreign student" in university communications.', null, [ACT.vocabularyPeople]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: "to be"
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'to be — full conjugation',
      'am / is / are',
      'The verb "to be" changes form based on the subject — one of the few English verbs with three distinct present-tense forms. Mastering this conjugation is the gateway to every basic sentence in the language.',
      'sentence',
      'I am Sarah. You are Korean. He is a teacher. She is my friend. It is a book. We are students. They are from China.',
      'Pattern: I → am, he/she/it → is, you/we/they → are. Memorize the three groupings.',
      [
        { target: 'I am', note: 'first-person singular — the only form that uses "am"' },
        { target: 'you are', note: 'second-person (singular and plural use the same form)' },
        { target: 'he / she / it is', note: 'third-person singular — the only form that uses "is"' },
        { target: 'we / they are', note: 'plural pronouns; share the "are" form with "you"' },
      ],
      [ACT.grammarToBe],
    ),
    createContentItem(
      'Contractions — speak shorter',
      'I\'m, you\'re, he\'s, …',
      'Subject pronoun + form of "to be" almost always contracts in speech and casual writing. Using the full form ("I am") sounds stiff or emphatic; using the contraction is the natural everyday default.',
      'sentence',
      'I\'m a student. You\'re Korean. He\'s a teacher. It\'s a book. We\'re from MIT. They\'re engineers.',
      'All six contractions follow the same pattern: drop the vowel of the auxiliary, replace with an apostrophe.',
      [
        { target: 'I am → I\'m /aɪm/', note: 'pronoun + verb fuse; the most frequent English contraction' },
        { target: 'you are → you\'re /jʊr/', note: 'same pattern; pronounced /jʊr/ in American English, /jɔː/ in some British accents' },
        { target: 'he is → he\'s /hiːz/', note: 'note: "he\'s" is also the contraction of "he has" — context tells which' },
        { target: 'she is → she\'s /ʃiːz/', note: 'same ambiguity as "he\'s" — can mean "is" or "has" depending on what follows' },
        { target: 'it is → it\'s /ɪts/', note: 'do not confuse with "its" (possessive without apostrophe)' },
        { target: 'we are → we\'re /wɪər/', note: 'distinct from "were" (past tense plural) — different vowel' },
        { target: 'they are → they\'re /ðɛr/', note: 'sounds identical to "there" and "their" — common spelling error in writing' },
      ],
      [ACT.grammarToBe],
    ),
    createContentItem(
      'Yes/no question — invert',
      'Are you …? / Is he …?',
      'Make a yes/no question by placing the form of "to be" before the subject — subject and verb swap positions. This is the most common question pattern in English.',
      'sentence',
      'You are a student. → Are you a student? — Yes, I am. / No, I\'m not.',
      'Short answers repeat the verb: "Yes, I am" or "No, I\'m not" — never just "Yes" or "No" if you want to sound natural.',
      [
        { target: 'Are you a student?', note: 'verb-subject inversion — the universal yes/no question pattern with "to be"' },
        { target: 'Is he Korean?', note: 'same inversion pattern with third-person singular' },
        { target: 'Yes, I am.', note: 'positive short answer; never contracts ("Yes, I\'m" is wrong)' },
        { target: 'No, I\'m not.', note: 'negative short answer; the only allowed contraction is the pronoun half ("I\'m"), never "amn\'t"' },
      ],
      [ACT.grammarToBe],
    ),
    createContentItem(
      'Wh- questions with "to be"',
      'What / Where / Who + be',
      'Information questions start with a question word (what/where/who/when/why/how), followed by the form of "to be", followed by the subject. Spoken English almost always contracts the question word with "is" ("What\'s" not "What is").',
      'sentence',
      'What\'s your name? — My name is Sarah.\nWhere are you from? — I\'m from Korea.\nWho is that? — That\'s my teacher.',
      'These three questions are the standard first-meeting set; learners should be able to ask and answer all three without thinking.',
      [
        { target: 'What\'s your name?', note: 'standard introduction question; "What\'s" is the default spoken form' },
        { target: 'Where are you from?', note: 'standard origin question; falling intonation at the end (unlike yes/no)' },
        { target: 'Who is she?', note: 'identification question; used to ask about someone present or being pointed at' },
      ],
      [ACT.grammarToBe],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Pronouns + Articles
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Subject pronouns recap',
      '7 pronouns',
      'English requires an explicit subject in almost every sentence — dropping it (as many languages allow) is ungrammatical, not casual. The 7 subject pronouns cover every possible referent.',
      'sentence',
      'I am a student. (NOT "Am a student.") · She is Korean. (NOT "Is Korean.")',
      'Even when the subject is obvious from context, English still requires it explicitly — this is one of the strictest rules in the language.',
      null,
      [ACT.grammarPronounsArticles],
    ),
    createContentItem(
      'a / an — indefinite article',
      'one of many',
      'Use "a" before a consonant sound and "an" before a vowel sound. The choice depends on the SOUND of the following word, not the letter — "a university" (starts with /j/, a consonant sound) but "an hour" (h is silent, vowel sound).',
      'sentence',
      'a student / a book / a university (/j/ sound) · an apple / an engineer / an hour (silent h, vowel sound)',
      'When in doubt, say the word aloud and listen for a consonant or vowel sound at the start.',
      [
        { target: 'a student', note: 'starts with consonant /s/ → "a"' },
        { target: 'an apple', note: 'starts with vowel /æ/ → "an"' },
        { target: 'a university /ˌjuːnɪˈvɜːrsəti/', note: 'looks like a vowel but starts with /j/ (a consonant sound) → "a"' },
        { target: 'an hour /aʊər/', note: 'looks like a consonant but h is silent — actually starts with /aʊ/ → "an"' },
      ],
      [ACT.grammarPronounsArticles],
    ),
    createContentItem(
      'the — definite article',
      'a specific one both speakers know',
      'Use "the" when both speakers know which specific thing is meant — because it was just mentioned, because it is unique (the sun), or because the context makes it obvious. Indefinite "a/an" introduces a new item; definite "the" refers back to a known one.',
      'sentence',
      'The teacher is here. (the one we both know) · The sun is bright. (only one sun) · I have a book. The book is red. (book is now known)',
      'Pattern: introduce with "a/an", refer back with "the".',
      [
        { target: 'a book', note: 'first mention — any book of this category' },
        { target: 'the book', note: 'now both speakers know which specific book is meant' },
        { target: 'the sun', note: 'unique reference — only one sun exists in our context' },
      ],
      [ACT.grammarPronounsArticles],
    ),
    createContentItem(
      'No article — when to skip',
      'plurals & uncountables',
      'Generic plural and uncountable nouns usually take no article — they describe categories rather than specific instances. Add "the" only when you mean a specific portion or instance of the category.',
      'sentence',
      'Students study hard. (students in general) · Water is essential. (water as a substance) · BUT: The water in this bottle is cold. (specific water)',
      'Generic vs specific is the key distinction; "the" signals specific, no-article signals generic.',
      null,
      [ACT.grammarPronounsArticles],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Negation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Negate with NOT',
      'add NOT after am/is/are',
      'Negate a "to be" sentence by placing "not" immediately after the verb. Word order is fixed: subject + be + NOT + complement. There is no other position for "not" in this pattern.',
      'sentence',
      'I am not Korean. · You are not a teacher. · He is not from MIT. · We are not engineers.',
      'Same pattern across all six pronouns; only the form of "be" changes.',
      [
        { target: 'I am not …', note: 'first-person negation; uniquely cannot contract the verb half' },
        { target: 'You/we/they are not …', note: 'second-person and plural; contracts to "aren\'t" in speech' },
        { target: 'He/she/it is not …', note: 'third-person singular; contracts to "isn\'t" in speech' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'Negative contractions',
      'isn\'t, aren\'t, I\'m not',
      'Negative forms contract in speech. Two patterns: contract the verb-with-not ("isn\'t", "aren\'t") or contract the pronoun-with-verb ("I\'m not"). The first person is unique — "amn\'t" does not exist in modern English.',
      'sentence',
      'He isn\'t Korean. · They aren\'t students. · I\'m not from Seoul.',
      'For first person, only "I\'m not" works; for everyone else, both contraction styles are valid.',
      [
        { target: 'is not → isn\'t /ˈɪzənt/', note: 'standard verb+not contraction for third-person singular' },
        { target: 'are not → aren\'t /ɑːrnt/', note: 'standard verb+not contraction for second-person and plurals' },
        { target: 'I am not → I\'m not /aɪm nɒt/', note: 'pronoun+verb contraction; "amn\'t" was used historically but is not standard today' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'Correcting an assumption',
      'No, I\'m not …, I\'m …',
      'The standard polite pattern for correcting someone\'s wrong guess. Three parts: "No" (denial), "I\'m not X" (specific correction of the guess), "I\'m Y" (offered alternative). Skipping any of these makes the correction sound abrupt.',
      'sentence',
      'A: Are you Japanese? — B: No, I\'m not Japanese. I\'m Korean.',
      'The three-part rhythm is what makes the correction feel natural rather than blunt.',
      [
        { target: 'No, I\'m not Japanese.', note: 'denial + specific correction of what was guessed' },
        { target: 'I\'m Korean.', note: 'offered alternative — closes the loop and gives the asker the right answer' },
      ],
      [ACT.grammarNegation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Self-introduction paragraph',
      'reading practice',
      'A complete five-sentence self-introduction that covers greeting, name, nationality, role, department, and closing. Read it aloud with natural rhythm — stress on content words, schwa on function words.',
      'sentence',
      'Hello. I\'m Sarah. I\'m American. I\'m a student at Massachusetts Institute of Technology. I\'m in the Computer Engineering department. Nice to meet you.',
      'Notice the parallel structure: every sentence starts with "I\'m" — a deliberate beginner-friendly pattern.',
      [
        { target: 'I\'m Sarah', note: 'name introduction with contraction; contraction is the default spoken form' },
        { target: 'I\'m American', note: 'nationality as adjective; no article needed' },
        { target: 'I\'m a student at MIT', note: 'role + location; "a" because "student" is one of many possible roles' },
        { target: 'I\'m in the Computer Engineering department', note: '"the" because this is a specific known department, not just any department' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'Comprehension questions',
      'answer in English',
      'Four standard comprehension questions matching the paragraph. Use short "to be" answers — full sentences are optional but not required for natural English.',
      'sentence',
      'Q1: What\'s your name? · Q2: Where are you from? · Q3: Are you a student? · Q4: What\'s your department?',
      'Two wh-questions (name, origin, department) and one yes/no question (student) — covering all the question patterns from this lesson.',
      [
        { target: 'A1: I\'m Sarah.', note: 'name answer; the shortest possible "to be" sentence' },
        { target: 'A2: I\'m from the USA. / I\'m American.', note: 'either origin or nationality — both are acceptable answers to "where from"' },
        { target: 'A3: Yes, I am.', note: 'short positive answer to a yes/no question; full repetition would be unusual' },
        { target: 'A4: (I\'m in) Computer Engineering.', note: 'short answer drops the redundant verb phrase; full sentence is also fine' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'First-meeting dialogue (polite)',
      'classmate to classmate',
      'A natural polite-register first-meeting conversation between two students at MIT. Covers all the patterns from this lesson: greetings, names, origins, roles, agreements, and farewells.',
      'conversation',
      'A: Hi! Nice to meet you. I\'m Min-su.\nB: Hi, Min-su! I\'m Sarah. Nice to meet you, too.\nA: Where are you from?\nB: I\'m from the USA. And you?\nA: I\'m Korean. I\'m from Seoul. Are you a student here?\nB: Yes, I am. I\'m in Computer Engineering. How about you?\nA: Oh, me too! What a coincidence.\nB: Cool! See you in class then.',
      'A natural exchange between peers using contractions throughout — the polite-casual default for student-age interactions.',
      [
        { target: 'Nice to meet you', note: 'first-meeting polite phrase; appears in both speakers\' opening turns' },
        { target: 'too / me too', note: 'agreement marker; "too" attaches to a phrase, "me too" stands alone' },
        { target: 'How about you?', note: 'standard return-the-question phrase after answering your own turn' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      'First-meeting dialogue (formal)',
      'student to professor',
      'A formal first-meeting conversation suitable for academic or professional contexts. Notice the formal vocabulary: "Good morning", "Professor", "It\'s a pleasure", "Likewise" — register markers that signal a more deliberate interaction.',
      'conversation',
      'Student: Good morning, Professor. I\'m Sarah Kim. It\'s a pleasure to meet you.\nProfessor: Good morning, Sarah. Welcome to MIT. Please have a seat.\nStudent: Thank you. I\'m looking forward to your class this semester.\nProfessor: Likewise. Where are you from?\nStudent: I\'m from the USA, originally from Boston.\nProfessor: Wonderful. I hope you enjoy your time here.\nStudent: Thank you so much, Professor.',
      'Same information as the polite version but with formal phrasing throughout — appropriate for hierarchical relationships.',
      [
        { target: 'It\'s a pleasure to meet you', note: 'formal first-meeting phrase; the formal counterpart of "Nice to meet you"' },
        { target: 'Likewise', note: 'formal one-word response meaning "the same goes for me"; common in professional settings' },
        { target: 'looking forward to …', note: 'standard polite expression of positive anticipation; pairs naturally with a future event' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Model self-introduction',
      'writing template',
      'A reusable five-sentence template for any self-introduction. Fill in the bracketed slots with your own information — the structure carries the rest.',
      'sentence',
      'Hello. I\'m [name]. I\'m [nationality]. I\'m a [role] at MIT. I [one extra fact]. Nice to meet you.',
      'Five sentences cover the core: greeting, name, nationality, role, personal fact, closing — the minimum complete self-introduction.',
      [
        { target: '[name]', note: 'your name — first name only for casual, first + last for polite' },
        { target: '[nationality]', note: 'your nationality as an adjective (Korean, American, Vietnamese) or "from + country" alternative' },
        { target: '[role]', note: 'student / teacher / engineer / etc. — the noun for your professional or academic identity' },
        { target: '[one extra fact]', note: 'something specific that distinguishes you (hobby, major, favorite thing); avoid generic facts' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      'Writing prompt',
      'your turn',
      'Write your own 3–5 sentence self-introduction using the template. Use at least one contraction (I\'m, it\'s) and one article (a, an) so the writing sounds natural rather than stilted.',
      'sentence',
      'Example: Hello. I\'m Ji-su Kim. I\'m Korean. I\'m a student at MIT. I love English, and I play the guitar. Nice to meet you!',
      'Check: greeting, name, nationality, role, one fact, closing — all six elements should appear.',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Handshakes',
      'how to greet physically',
      'In most English-speaking professional cultures, a firm 2–3-second handshake with eye contact is the default greeting. Bowing is uncommon in Western contexts; a too-weak handshake reads as timid, a too-strong one reads as aggressive.',
      'sentence',
      'Shake hands with a firm grip for 2–3 seconds. Make eye contact.',
      'Aim for confident-but-relaxed; both partners should feel a clear grip without strain.',
      [
        { target: 'firm handshake', note: 'the default professional greeting in most English-speaking workplaces' },
        { target: 'eye contact', note: 'signals attention and respect; avoiding it can read as evasive or rude in Western cultures' },
        { target: 'no bowing', note: 'rare in Western English-speaking contexts; reserved for very formal or cross-cultural situations' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'First names quickly',
      'when to use first names',
      'American and Australian English shift to first names very quickly — often after the first sentence. British English is slightly more reserved. For senior people, wait until they explicitly invite you with "Call me [first name]" before switching.',
      'sentence',
      'Professor Smith → after "Call me John", you can say "John".',
      'Watch and listen for the cue; switching to first names without invitation can feel presumptuous in formal contexts.',
      [
        { target: 'Mr./Ms./Dr./Professor + last name', note: 'the safe opening form for anyone senior, in a formal context, or whom you have just met' },
        { target: '"Call me [first name]"', note: 'explicit invitation to switch to first-name terms; only then is it appropriate' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Small talk before business',
      'icebreaking topics',
      'In English-speaking cultures, conversations open with a brief casual exchange before any business or serious topic. Skipping the small talk feels abrupt; safe topics are weather, weekend, travel, and food. Avoid age, marital status, politics, and salary — these are considered personal or rude with anyone but close friends.',
      'sentence',
      '"How was your weekend?" "Did you have a good trip?" "Beautiful weather today, isn\'t it?"',
      'These three openers cover most workplace and customer-service situations.',
      [
        { target: 'Safe topics: weather, weekend, travel', note: 'universally appropriate; impossible to offend with these' },
        { target: 'Avoid: age, marital status, politics, salary', note: 'considered personal or rude with strangers, colleagues, or anyone outside close friendship' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '"How are you?" is a ritual',
      'not a real question',
      '"How are you?" is treated as a greeting, not a sincere inquiry. The expected reply is short and positive ("Good, thanks. You?" or "Fine, thanks."). Sharing real feelings here is reserved for close friends — with acquaintances or colleagues, always reply briefly even if you are having a bad day.',
      'sentence',
      'A: Hi, how are you? — B: Good, thanks. You? — A: I\'m good.',
      'The exchange takes 5 seconds; treating it as a real question can feel awkward in casual contexts.',
      null,
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Task: First day at MIT',
      'consolidation task',
      'Roleplay your first day at Massachusetts Institute of Technology with the AI tutor playing a friendly international classmate. Use every skill from this lesson in one continuous scene — greet, introduce, ask, answer, farewell.',
      'conversation',
      '[Conference room, Massachusetts Institute of Technology]\nClassmate: Hi! Nice to meet you. I\'m Sarah.\nYou: [greet + introduce yourself]\nClassmate: Where are you from?\nYou: [say your country/city]\nClassmate: Are you a student here?\nYou: [confirm + add your major]\nClassmate: Nice! What\'s your major exactly?\nYou: [answer]\nClassmate: Great talking to you!\nYou: [farewell]',
      'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: 'greet', note: 'Hi / Hello / Nice to meet you — pick the register that matches the classmate\'s opening' },
        { target: 'introduce', note: 'I\'m [name] — use the contraction for natural rhythm' },
        { target: 'origin', note: 'I\'m from [country/city] — or use the nationality adjective directly' },
        { target: 'role', note: 'I\'m a student. My major is [field] — combine role + specifics in two short sentences' },
        { target: 'farewell', note: 'Nice to meet you. / See you. / Bye. — match the register you opened with' },
      ],
      [ACT.task],
    ),
    createContentItem(
      'Stretch goal: correct an assumption',
      'use I\'m not …, I\'m …',
      'In the same scene, the classmate guesses your country incorrectly. Politely correct them using the three-part pattern (No → deny → offer alternative). Closes the loop without making the asker feel bad.',
      'conversation',
      'Classmate: Oh, are you from Japan?\nYou: No, I\'m not Japanese. I\'m Korean. I\'m from Seoul.\nClassmate: Oh sorry, my mistake!\nYou: No worries.',
      '"No worries" is a casual reassurance phrase common in Australian and increasingly American English; equivalent to "it\'s fine".',
      [
        { target: 'No, I\'m not …, I\'m …', note: 'the standard three-part polite correction pattern from Grammar III' },
        { target: 'No worries', note: 'casual reassurance phrase ("it is fine"); originally Australian, now common in most English-speaking contexts' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
