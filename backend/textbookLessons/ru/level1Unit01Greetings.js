// Level 1 Unit 1 — Greetings & Self-Introduction (Russian)
// Functions: greeting in three registers, introducing yourself, asking where
// someone is from, correcting a wrong assumption, farewells.
// This lesson is the canonical TEMPLATE for all Russian thematic Level 1 lessons.
//
// All content is authored with Cyrillic (target) + scientific transliteration
// (romanization) + English glosses (canonical source). The AI conversation tutor
// reads this curriculum and delivers it to each learner in their preferred native
// language at runtime — never assume a specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition.

const createContentItem = (
  target,
  translit,
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
  romanization: translit,
  nativeText: note,
  pronunciation: translit,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ru-l1u1-orientation',
  pronunciation: 'ru-l1u1-pronunciation',
  vocabularyGreetings: 'ru-l1u1-vocab-greetings',
  vocabularyPeople: 'ru-l1u1-vocab-people',
  grammarBe: 'ru-l1u1-grammar-be',
  grammarPronounsGender: 'ru-l1u1-grammar-pronouns-gender',
  grammarNegation: 'ru-l1u1-grammar-negation',
  reading: 'ru-l1u1-reading',
  listening: 'ru-l1u1-listening',
  writing: 'ru-l1u1-writing',
  culture: 'ru-l1u1-culture',
  task: 'ru-l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet someone in Russian and say goodbye in three registers (casual peer-with-ты, polite stranger-with-Вы, formal Здравствуйте) so you match the situation.',
      'Introduce yourself with your name, country, and one role (студент / преподаватель / инженер) using the no-copula pattern Я — студент and the equivalent Меня зовут… for names.',
      'Ask another person their name and where they are from, then respond appropriately using the standard Откуда вы? / Я из + genitive frame.',
    ],
    task: 'Picture your first day at МГУ (Moscow State University) — you walk into a research seminar and a colleague from Saint Petersburg turns to you. By the end of this lesson you should handle the whole exchange in Russian without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce Здравствуйте (zdravstvuyte) with the silent В in the middle — the standard educated pronunciation drops it: "zdrastvuyte". Mispronouncing this single word marks a beginner more loudly than almost any other slip.',
      'Apply акание in unstressed О: молоко spelled m-o-l-o-k-o, spoken "malakó". Russian preserves spelling but reduces every unstressed vowel.',
      'Apply final devoicing in surnames: every -ов/-ев surname (Иванов, Петров, Медведев) ends in /f/, not /v/. "Ivanof", "Petrof", "Medvedef".',
    ],
    task: 'Read each example aloud, identify whether akanye and final devoicing apply, and pronounce the spoken version (not the spelled letters).',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 12 greetings and farewells across three registers, with the right phrase for each situation.',
      'Distinguish ты (informal/peer) from Вы (formal/honorific; capitalized in writing when addressing one person) — using the wrong one with the wrong person signals either disrespect or excessive coldness.',
    ],
    task: 'Say each phrase three times with the correct stress, then pair each one to a situation: meeting a friend, meeting a professor, ending a 60-minute meeting, calling out to a stranger.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and nationalities',
    goals: [
      'Use the 8 personal pronouns (я ты он она оно мы вы они) correctly, including capitalized Вы when addressing one person formally.',
      'State your role (студент/студентка, преподаватель, инженер) using the gendered noun for masculine vs feminine — almost every role in Russian has both forms.',
      'State your nationality using the gendered nationality noun (русский/русская, американец/американка, кореец/кореянка) and the Я из + genitive country pattern.',
    ],
    task: 'Say your own role and nationality, then describe one classmate using Он/Она — and notice that the noun gender must match the person\'s gender.',
  },
  {
    id: ACT.grammarBe,
    section: 'Grammar I',
    title: 'The zero copula — Russian has no "to be" in the present',
    goals: [
      'Drop the verb "to be" in the present tense: Russian says Я студент ("I [am] student") with NO verb between subject and predicate noun. The dash sometimes replaces it in writing for emphasis: Москва — столица России.',
      'Know that the past and future DO use forms of быть (был, будет), and that the absence is ONLY in the present tense.',
      'Recognize that Russian word order is flexible (Я студент / Студент я — both grammatical, different emphasis), so the no-verb rule must be combined with reading the stress pattern to identify subject vs predicate.',
    ],
    task: 'Write six no-copula present-tense sentences identifying yourself (Я Сара / Я американка / Я студентка / Я из Бостона…) and notice the missing verb.',
  },
  {
    id: ACT.grammarPronounsGender,
    section: 'Grammar II',
    title: 'Pronouns + the gender system (m/f/n)',
    goals: [
      'Use the 8 Russian personal pronouns: я (I), ты (you-informal sg), он (he), она (she), оно (it/neuter), мы (we), вы (you-formal sg OR you-plural), они (they).',
      'Match pronouns to grammatical gender: он for masculine nouns (стол "table" → он), она for feminine (книга → она), оно for neuter (окно "window" → оно). Russian assigns gender to every noun.',
      'Capitalize Вы when addressing ONE person formally in writing (letters, formal emails); lowercase вы when addressing multiple people informally. This convention signals respect on the page.',
    ],
    task: 'Identify the gender of 8 common nouns (стол, книга, окно, дом, мама, папа, кафе, имя) and produce the matching pronoun for each.',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar III',
    title: 'Negation with не and the "не…а…" correction pattern',
    goals: [
      'Negate any verb or predicate by placing не directly before it: Я не студент ("I am not a student"), Я не из Москвы ("I am not from Moscow").',
      'Know that не is unstressed and pronounced "ni" (иканье applies); only stressed нет ("no") keeps its full vowel.',
      'Apply the не X, а Y ("not X, but Y") pattern to politely correct someone\'s wrong guess about your nationality or role.',
    ],
    task: 'Imagine a Russian classmate guesses your nationality wrong; correct them in one polite sentence using the не X, а Y pattern.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a self-introduction',
    goals: [
      'Read a short self-introduction paragraph aloud with correct stress, akanye, and final devoicing on surnames.',
      'Answer comprehension questions about the speaker\'s name, country, role, and university using short Я + no-copula answers.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first meeting',
    goals: [
      'Follow a 4-turn first-meeting dialogue and recognize the register markers (Здравствуйте vs Привет, Вы vs ты, patronymic + first name vs diminutive).',
      'Reproduce the dialogue with your own name and country, swapping in the relevant phrases naturally while keeping the right register throughout.',
    ],
    task: 'Read the polite dialogue with the AI tutor first, then perform it again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own self-introduction',
    goals: [
      'Write 3–5 sentences in Cyrillic covering greeting, name, country, role, and one extra fact.',
      'Use the no-copula present tense at least twice and the Я из + genitive pattern at least once so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Write your own self-introduction in 3–5 sentences using the template, then read it aloud with correct stress and akanye.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Patronymics, diminutives, and ты vs Вы',
    goals: [
      'Use the three-part Russian name pattern: имя (given name) + отчество (patronymic, father\'s name + suffix) + фамилия (surname). Иван Петрович Иванов = Ivan + son-of-Pyotr + Ivanov. Adults address each other formally by ИМЯ + ОТЧЕСТВО — never by surname alone.',
      'Recognize diminutive name patterns: Александр → Саша / Сашенька / Шура; Екатерина → Катя / Катенька; every Russian name has a casual short form used among friends and family.',
      'Apply ты with peers, friends, family, children, and pets; Вы with strangers, older people, authorities, customers, and anyone you have not been invited to ты with. Switching from Вы to ты is a relationship milestone and usually requires explicit permission: "Давайте на ты" ("Let\'s switch to ты").',
    ],
    task: 'Decide how you would address (1) a classmate named Александр Петров, (2) a professor named Мария Ивановна Соколова, (3) a 60-year-old stranger on the bus — give the full Russian form for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day at МГУ — in Russian',
    goals: [
      'Combine everything from this lesson into one continuous scene with no break between greeting, introduction, question, answer, correction, and farewell.',
      'Use the correct register (formal/casual) based on the relationship; switch to Вы immediately when meeting someone older or more senior, and stay there throughout.',
    ],
    task: 'Roleplay your first day at МГУ with the AI tutor playing a doctoral candidate from Saint Petersburg; aim for a 6-turn exchange in Russian.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 1: Здравствуйте — Greetings and Self-Introduction',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'ru',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (Здравствуйте / Привет / До свидания) and match the register to the relationship.' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences using Меня зовут… and Я + role with zero copula.' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask Откуда вы? or Откуда ты? and respond naturally with Я из + genitive country/city.' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use the не X, а Y pattern to politely correct a wrong guess about your nationality or role.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Цели урока',
      'Tseli uroka',
      'By the end of this lesson, you can greet someone in Russian, give your name, say where you are from, ask the same back, and farewell — all in one short conversation without pausing to think. These five micro-skills are the spine of every social encounter in Russian.',
      'word',
      'Functional language: приветствие privetstvie (greeting) · знакомство znakomstvo (getting acquainted) · вопрос о происхождении vopros o proiskhozhdenii (origin question) · отрицание otritsanie (negation) · прощание proshchaniye (farewell)',
      'These five micro-skills are the spine of every Russian social encounter — once they\'re automatic, every later lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      'Реальный сценарий',
      'Real\'nyy stsenariy',
      'You are at МГУ (Moscow State University) on your first day and a doctoral candidate from Saint Petersburg turns to you in the lab. The whole encounter takes about 30 seconds and you will need every micro-skill from this lesson.',
      'word',
      'Аспирант: "Здравствуйте! Меня зовут Дмитрий Соколов. А вас?"',
      'A typical opener from a Russian colleague: formal Здравствуйте + name introduction using Меня зовут… + immediate return-the-question with А вас? (lit. "and you-formal?")',
      [
        { target: 'Здравствуйте zdravstvuyte', note: 'formal/polite greeting working in any register but felt as deliberate respect; informal/peer use Привет privet' },
        { target: 'Меня зовут… Menya zovut…', note: 'literally "[they] call me…" — the standard way to give your name; more natural than the literal Моё имя…' },
        { target: 'А вас? A vas?', note: 'literally "and you-formal-accusative?" — short return-the-question after answering' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      'Три уровня вежливости',
      'Tri urovnya vezhlivosti',
      'Russian distinguishes three politeness registers strongly. Casual (peers, friends): Привет / ты / Пока. Polite (workplace, first meetings, strangers): Здравствуйте / Вы / До свидания. Formal/ceremonial (elders, officials, ceremonies): Здравствуйте + имя-отчество (first name + patronymic) / Вы / Всего доброго.',
      'word',
      'Привет privet (casual) / Здравствуйте zdravstvuyte (polite) / Здравствуйте, Иван Петрович (formal with patronymic) — same greeting function, three social levels.',
      'Switching from Вы to ты mid-conversation requires explicit permission ("Давайте на ты"); the reverse is a sharp signal of distance or anger.',
      [
        { target: 'CASUAL: Привет, ты, Пока', note: 'use with peers, close friends, clearly informal settings; using Привет with a professor is a small but real social mistake' },
        { target: 'POLITE: Здравствуйте, Вы, До свидания', note: 'the safe default for first meetings, workplace, and any stranger encounter' },
        { target: 'FORMAL: + имя-отчество (Иван Петрович)', note: 'reserved for senior academics, customers, officials; combines the polite greeting with the full first name + patronymic of the addressee' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Здравствуйте',
      'zdravstvuyte (spoken: zdrastvuyte)',
      'The most famous Russian pronunciation pitfall: the В after Д is silent in normal speech. Spelled з-д-р-а-в-с-т-в-у-й-т-е but spoken /ˈzdrastvujtʲe/. Pronouncing every letter sounds painfully foreign; dropping the silent В sounds native.',
      'word',
      'Здравствуйте → spoken /ˈzdrastvujtʲe/',
      'The single highest-leverage pronunciation fix for a beginner: drop the silent В.',
      [
        { target: 'Здр- /zdr-/', note: 'the heavy initial cluster; pronounce all three consonants but quickly' },
        { target: '-аствуй-', note: 'the В after Д is SILENT in normal speech; do not say "zdravstvuyte"' },
        { target: '-те /-tʲe/', note: 'soft т before е; politeness/plural suffix on the imperative' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'молоко',
      'moloko (spoken: malakó)',
      'Аканье at work: unstressed О is pronounced /a/. Спелled m-o-l-o-k-o but spoken "malakó" — only the stressed final О keeps its /o/ quality, the other two reduce. The single most defining feature of standard Moscow speech.',
      'word',
      'молоко → spoken /məɫɐˈko/ (malakó)',
      'Apply this rule to every unstressed О you encounter — it changes the surface pronunciation of half of all Russian words.',
      [
        { target: 'мо- /mə-/', note: 'far from stress = heavy reduction toward schwa' },
        { target: '-ло- /-ɫɐ-/', note: 'first pretonic syllable = lighter reduction toward /a/' },
        { target: '-кó /-ˈko/', note: 'stressed final syllable = full /o/' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'Иванов',
      'Ivanov (spoken: Ivanóf)',
      'Final devoicing in surnames: every -ов / -ев surname (Иванов, Петров, Медведев, Романов, Карпов, Соколов, Достоевский is an exception with -ский) is pronounced with final /f/, not /v/. Spelling preserves the historical /v/; speech devoices it.',
      'word',
      'Иванов → spoken "Ivanóf"; Петров → "Petróf"; Медведев → "Medvédef"',
      'Every Russian surname pronunciation hinges on this rule; getting it wrong is one of the easiest beginner tells.',
      [
        { target: '-ов /-of/', note: 'final devoicing of в → /f/; applies to all masculine -ов surnames' },
        { target: 'stress varies', note: 'Иванóв (final stress) vs Петрóв (final) vs Сóколов (root stress); memorize stress with each surname' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'Спасибо',
      'Spasibo (spoken: spasíba)',
      'Standard greeting-adjacent word with akanye on the final unstressed О. Spelled с-п-а-с-и-б-о but spoken "spasíba". The stress falls on the second syllable -си-.',
      'word',
      'Спасибо → /spɐˈsʲibə/',
      'High-frequency word; akanye on final О is the only sound rule that matters here.',
      [
        { target: 'спа- /spɐ-/', note: 'first pretonic = lighter reduction' },
        { target: '-сú- /-ˈsʲi-/', note: 'stressed syllable; soft с before и' },
        { target: '-бо /-bə/', note: 'final unstressed О = schwa /ə/, sounds like "ba"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'Как вас зовут?',
      'Kak vas zovut?',
      'The standard formal "what is your name?" — literally "how [they] call you-formal?". Combines unstressed reduction patterns: как stays /kak/, вас stays /vas/, зовут has stressed final у. Stress falls on the last word — typical for Russian question rhythm.',
      'sentence',
      'Как вас зовут? — Меня зовут Сара.',
      'Question intonation rises sharply on the final stressed syllable (-вýт?) and falls again — distinct from English wh-question intonation.',
      [
        { target: 'Как kak', note: 'unstressed in this question; just /kak/' },
        { target: 'вас vas', note: 'accusative of Вы (you-formal); /vas/, no reduction' },
        { target: 'зовут zovút', note: 'third-person plural of звать ("to call"); stress on the second syllable, akanye on first' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('Здравствуйте', 'Zdravstvuyte', 'Formal/polite greeting working in any register but felt as deliberate respect; mandatory with strangers, elders, authorities, customers, and on first meetings. Literally "be healthy" — historical imperative. Always with Вы.', 'word', 'Здравствуйте, профессор!', 'Standard polite opener with a professor; combines the formal greeting with the academic title.', null, [ACT.vocabularyGreetings]),
    createContentItem('Привет', 'Privet', 'Casual greeting "hi"; used with friends, classmates, peers, family, children. Never appropriate with elders, authorities, or strangers in formal contexts. Almost always paired with ты.', 'word', 'Привет, Саша! Как дела?', '"Hi, Sasha! How\'s it going?" — typical opener using a diminutive name and a casual follow-up.', null, [ACT.vocabularyGreetings]),
    createContentItem('Здравствуй', 'Zdravstvuy', 'Mid-register greeting — singular, informal, but more polite than Привет. Used with children, close friends, or in slightly older / literary contexts. Less common than Здравствуйте (formal) or Привет (casual).', 'word', 'Здравствуй, Маша!', 'Used by a parent addressing a child, or by an older friend addressing a younger one — slightly old-fashioned today.', null, [ACT.vocabularyGreetings]),
    createContentItem('Доброе утро', 'Dobroye utro', 'Polite morning greeting "good morning"; used roughly from waking time until noon. More specific than Здравствуйте; works in all polite registers and most casual ones. Stress on -бр- and -ý-.', 'word', 'Доброе утро, Иван Петрович!', 'Polite morning greeting to a senior colleague using имя + отчество (first name + patronymic).', null, [ACT.vocabularyGreetings]),
    createContentItem('Добрый день', 'Dobryy den\'', 'Polite afternoon greeting "good day / good afternoon"; used roughly from noon until early evening. The default daytime polite greeting in workplaces, shops, and phone calls. Stress on -бр- and -е-; final ь softens н.', 'word', 'Добрый день! Чем могу помочь?', '"Good afternoon! How can I help?" — standard customer-service opener.', null, [ACT.vocabularyGreetings]),
    createContentItem('Добрый вечер', 'Dobryy vecher', 'Polite evening greeting "good evening"; used after sunset / early evening. Distinct from Спокойной ночи ("good night") which is a farewell — Добрый вечер is a greeting (arriving), Спокойной ночи is a farewell (parting).', 'word', 'Добрый вечер, дамы и господа.', '"Good evening, ladies and gentlemen." — formal opener for an evening event.', null, [ACT.vocabularyGreetings]),
    createContentItem('Очень приятно', 'Ochen\' priyatno', 'The standard polite first-meeting phrase, literally "very pleasant"; equivalent to English "pleased to meet you". Universal across casual-to-formal registers; the safe default response after exchanging names. Sometimes shortened to just Приятно.', 'word', '— Меня зовут Анна. — Очень приятно. Сара.', 'Standard exchange right after the name handover — Anna gives her name, the responder says "pleased to meet you" and gives their own name.', null, [ACT.vocabularyGreetings]),
    createContentItem('Как дела?', 'Kak dela?', 'Ritual inquiry "how are things?"; less formulaic than English "how are you?" but still mostly automatic. Default replies: Нормально ("fine"), Хорошо ("good"), Так себе ("so-so"). Used with ты; the Вы equivalent is Как у вас дела?', 'word', 'Привет, Саша! Как дела? — Нормально, спасибо.', 'Casual peer exchange; Нормально is the most natural Russian reply — Хорошо can sound slightly too enthusiastic.', null, [ACT.vocabularyGreetings]),
    createContentItem('До свидания', 'Do svidaniya', 'Standard polite farewell "goodbye"; literally "until [the next] meeting". Used in formal and most polite contexts. More deliberate than Пока but less ceremonial than Прощайте (used only when you don\'t expect to see the person again).', 'word', 'До свидания, профессор. Спасибо за лекцию.', 'Polite farewell to a teacher; combines the goodbye with a brief thanks for the lecture.', null, [ACT.vocabularyGreetings]),
    createContentItem('Пока', 'Poka', 'Casual farewell "bye"; literally "for now / meanwhile". Used among friends, peers, family. Equivalent to English "bye". Often doubled in informal speech: Пока-пока.', 'word', 'Пока-пока! Увидимся завтра.', '"Bye-bye! See you tomorrow." — casual close with a follow-up commitment.', null, [ACT.vocabularyGreetings]),
    createContentItem('Увидимся', 'Uvidimsya', 'Casual farewell "see you / we\'ll see each other"; literally "we will see [each other]" (reflexive future). Used among friends and colleagues who expect to meet again soon. Often combined with a time: Увидимся завтра / Увидимся на работе.', 'word', 'Ну, увидимся!', '"Well, see you!" — typical close after a casual meeting; ну ("well") is a soft opener.', null, [ACT.vocabularyGreetings]),
    createContentItem('Спокойной ночи', 'Spokoynoy nochi', 'Standard "good night" farewell; literally "[have a] calm night". Used at the END of an evening, before separating to sleep — NOT as an evening greeting (use Добрый вечер for that). Stress on -кóй- and -нó-.', 'word', 'Спокойной ночи, мама!', '"Good night, mom!" — typical family close at bedtime.', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People, roles, nationalities
    // ────────────────────────────────────────────────────────────────────
    createContentItem('я', 'ya', 'First-person singular subject pronoun "I". Lowercase by default — Russian does NOT capitalize я (only "I" in English is capitalized). Same form for nominative case; changes to меня (acc/gen), мне (dat/prep), мной (instr).', 'word', 'Я студент. / Я студентка.', 'The simplest possible self-introduction: я + role noun, NO verb between. The role noun changes for gender: студент (m) / студентка (f).', null, [ACT.vocabularyPeople]),
    createContentItem('ты', 'ty', 'Second-person singular pronoun used for casual address to peers, friends, family, children, and pets. Avoid with strangers, older people, or anyone in authority — use Вы instead. Forms: тебя (acc/gen), тебе (dat/prep), тобой (instr).', 'word', 'Ты студент? — Да.', 'Casual question about role; using ты with a stranger is a clear social mistake.', null, [ACT.vocabularyPeople]),
    createContentItem('Вы', 'Vy', 'Polite/formal second-person pronoun. CAPITALIZED in writing when addressing ONE specific person formally (letters, formal emails); lowercase вы when addressing multiple people informally. Triggers plural verb agreement regardless of how many people you mean.', 'word', 'Вы из России?', 'Polite "are you from Russia?" — written with capital В to signal respect to a single addressee.', null, [ACT.vocabularyPeople]),
    createContentItem('он', 'on', 'Third-person singular pronoun for masculine nouns (people and things). Used for any masculine noun, including inanimate objects: стол → он ("the table — it"); дом → он ("the house — it"). Forms: его (acc/gen), ему (dat), им (instr), о нём (prep).', 'word', 'Он мой брат.', '"He is my brother." — predicate noun construction with no copula in the present tense.', null, [ACT.vocabularyPeople]),
    createContentItem('она', 'ona', 'Third-person singular pronoun for feminine nouns (people and things). Used for any feminine noun, including inanimate objects: книга → она ("the book — it"); машина → она. Forms: её (acc/gen), ей (dat), ей/ею (instr), о ней (prep).', 'word', 'Она моя сестра.', '"She is my sister." — same no-copula structure with the feminine pronoun and possessive.', null, [ACT.vocabularyPeople]),
    createContentItem('оно', 'ono', 'Third-person singular pronoun for neuter nouns (the third gender). Less commonly heard than он/она because neuter nouns are rarer. Examples: окно → оно ("the window"), солнце → оно ("the sun"), имя → оно ("the [first] name").', 'word', 'Это окно. Оно большое.', '"This is a window. It is big." — Это + neuter noun, then the neuter pronoun in the follow-up.', null, [ACT.vocabularyPeople]),
    createContentItem('мы', 'my', 'First-person plural "we"; includes the speaker. Forms: нас (acc/gen), нам (dat), нами (instr), о нас (prep). Note the Ы spelling — uniquely Russian sound.', 'word', 'Мы студенты МГУ.', '"We are students at MSU." — plural predicate noun, still no copula in the present.', null, [ACT.vocabularyPeople]),
    createContentItem('вы', 'vy', 'Second-person plural OR singular formal pronoun. When addressing multiple people informally (a group of friends), use lowercase вы. When addressing ONE person formally (a stranger, professor, customer), use capitalized Вы in writing. Always triggers plural verb forms.', 'word', 'Вы из Москвы?', '"Are you (formal sg or pl) from Moscow?" — same form covers both meanings.', null, [ACT.vocabularyPeople]),
    createContentItem('они', 'oni', 'Third-person plural "they" — for any plural subject regardless of gender. Forms: их (acc/gen), им (dat), ими (instr), о них (prep).', 'word', 'Они мои друзья.', '"They are my friends." — plural pronoun with plural noun, no copula.', null, [ACT.vocabularyPeople]),
    createContentItem('Меня зовут', 'Menya zovut', 'The standard way to introduce yourself: literally "[they] call me [name]". Меня is the accusative of я; зовут is the 3rd-person plural of звать ("to call"). More natural than the literal Моё имя… ("My name is…"), which sounds slightly stiff.', 'sentence', 'Меня зовут Сара.', '"My name is Sara." — universal self-introduction; works in every register.', null, [ACT.vocabularyPeople]),
    createContentItem('имя', 'imya', 'Given name (first name). Neuter noun ending in -я is unusual; declines like a 3rd-declension neuter: имя (nom), имени (gen/dat/prep), именем (instr). Distinguished from фамилия (surname) and отчество (patronymic).', 'word', 'Моё имя — Сара.', 'Slightly stiffer alternative to Меня зовут… ; the dash replaces the missing copula in writing for emphasis.', null, [ACT.vocabularyPeople]),
    createContentItem('фамилия', 'familiya', 'Surname / family name. Feminine noun. Russian surnames typically end in -ов/-ев (m) / -ова/-ева (f) for the most common patronymic-origin family names, or -ин/-ина, -ский/-ская, -цкий/-цкая.', 'word', 'Моя фамилия — Иванов.', '"My surname is Ivanov." — note that male and female members of the same family have differently-ending surnames: Иванов (m) / Иванова (f).', null, [ACT.vocabularyPeople]),
    createContentItem('отчество', 'otchestvo', 'Patronymic — middle name derived from the father\'s given name + a suffix. Male: -ович / -евич (Иванович = son-of-Ivan). Female: -овна / -евна (Ивановна = daughter-of-Ivan). Used in formal address: ИМЯ + ОТЧЕСТВО (e.g., Иван Петрович, Мария Ивановна) is the polite way to address an adult.', 'word', 'Моё отчество — Александрович.', 'Used in academia, business, and any formal context; addressing a professor as just "Иван" without the отчество is rude.', null, [ACT.vocabularyPeople]),
    createContentItem('студент', 'student', 'Male student (any level). The feminine equivalent is студентка. Almost every Russian role-noun has separate masculine and feminine forms — gender must match the person.', 'word', 'Он студент МГУ.', '"He is an MSU student." — standard role identification with no copula and a place qualifier.', null, [ACT.vocabularyPeople]),
    createContentItem('студентка', 'studentka', 'Female student. Formed by adding -ка to the masculine студент. Pattern repeats across many role nouns: учитель/учительница (teacher), переводчик/переводчица (translator), американец/американка (American). Always match the gender of the referent.', 'word', 'Она студентка МГУ.', '"She is an MSU student." — feminine form mandatory when referring to a woman.', null, [ACT.vocabularyPeople]),
    createContentItem('преподаватель', 'prepodavatel\'', 'Teacher / instructor at university level — the standard Russian term for a university lecturer. Below професcор (full professor) but above аспирант (PhD candidate). Feminine: преподавательница. The shorter учитель is used for primary/secondary school teachers.', 'word', 'Мой преподаватель из Петербурга.', '"My teacher is from Petersburg." — uses Я из + genitive city to give origin.', null, [ACT.vocabularyPeople]),
    createContentItem('инженер', 'inzhener', 'Engineer (any discipline). Unlike many roles, no separate feminine form is in common use — both men and women are referred to as инженер in modern Russian. Stress on the final syllable: ин-же-нéр.', 'word', 'Мой папа инженер.', '"My dad is an engineer." — universal masculine-form noun for both sexes.', null, [ACT.vocabularyPeople]),
    createContentItem('врач', 'vrach', 'Doctor (medical). Universal — both men and women are called врач in modern Russian (the older feminine врачиха is now considered slangy/derogatory). For "scientific doctor" use доктор наук (Doctor of Sciences).', 'word', 'Моя мама врач.', '"My mom is a doctor." — note врач stays masculine grammatically even with a female referent.', null, [ACT.vocabularyPeople]),
    createContentItem('Россия / русский / русская', 'Rossiya / russkiy / russkaya', 'Country: Россия (Russia, feminine noun). Nationality adjective used as noun: русский (Russian man), русская (Russian woman). To say "I am from Russia" use Я из России (genitive case of Россия).', 'word', 'Я из России. Я русский / русская.', 'Two-part nationality statement: place of origin (Я из + gen.) + nationality (Я + adjective-noun).', null, [ACT.vocabularyPeople]),
    createContentItem('Америка / американец / американка', 'Amerika / amerikanets / amerikanka', 'Country: Америка (or США = USA, also used). Nationality: американец (American man), американка (American woman) — formed by -ец / -ка suffixes. Note the consonant alternation when feminizing: американец → американка.', 'word', 'Я из США. Я американка.', 'Standard self-identification by an American woman; США (S-Sh-A, abbreviation for Соединённые Штаты Америки) is more common than the longer name.', null, [ACT.vocabularyPeople]),
    createContentItem('Корея / кореец / кореянка', 'Koreya / koreyets / koreyanka', 'Country: Корея (Korea, feminine noun). Nationality: кореец (Korean man), кореянка (Korean woman). Slightly irregular feminine — -янка instead of expected -ка. Northern: Северная Корея; Southern: Южная Корея.', 'word', 'Я из Южной Кореи. Я кореянка.', '"I am from South Korea. I am Korean (f)." — adjective-noun phrase Южная Корея goes into genitive Южной Кореи after из.', null, [ACT.vocabularyPeople]),
    createContentItem('Китай / китаец / китаянка', 'Kitay / kitayets / kitayanka', 'Country: Китай (China, masculine noun ending in -й). Nationality: китаец (Chinese man), китаянка (Chinese woman). Genitive form for "from China" is из Китая.', 'word', 'Я из Китая. Я китаянка.', '"I am from China. I am Chinese (f)." — Китая is the genitive of masculine Китай.', null, [ACT.vocabularyPeople]),
    createContentItem('Япония / японец / японка', 'Yaponiya / yaponets / yaponka', 'Country: Япония (Japan, feminine noun). Nationality: японец (Japanese man), японка (Japanese woman). Standard -ец / -ка suffix pattern with mild consonant alternation.', 'word', 'Я из Японии. Я японец.', '"I am from Japan. I am Japanese (m)." — Японии is the genitive of feminine Япония.', null, [ACT.vocabularyPeople]),
    createContentItem('Нигерия / нигериец / нигерийка', 'Nigeriya / nigeriyets / nigeriyka', 'Country: Нигерия (Nigeria, feminine noun). Nationality: нигериец (Nigerian man), нигерийка (Nigerian woman). The -ец suffix attaches to -ий root, producing -иец / -ийка pattern.', 'word', 'Я из Нигерии. Я нигериец.', '"I am from Nigeria. I am Nigerian (m)." — Нигерии is the genitive of feminine Нигерия.', null, [ACT.vocabularyPeople]),
    createContentItem('Москва / москвич / москвичка', 'Moskva / moskvich / moskvichka', 'City: Москва (Moscow, feminine noun). Resident: москвич (Muscovite man), москвичка (Muscovite woman). "From Moscow" is из Москвы (genitive).', 'word', 'Я из Москвы. Я москвич.', '"I am from Moscow. I am a Muscovite (m)." — high-frequency self-identification for МГУ students.', null, [ACT.vocabularyPeople]),
    createContentItem('Санкт-Петербург', 'Sankt-Peterburg', 'City: Санкт-Петербург (Saint Petersburg) — formal name. Casual: Петербург or just Питер. The university there is СПбГУ (Saint Petersburg State University), the second-most prestigious Russian university after МГУ. Genitive for "from Petersburg": из Петербурга or из Питера.', 'word', 'Я из Петербурга. Я студент СПбГУ.', '"I am from Petersburg. I am a student at SPbGU." — typical introduction for a student at the second-most prestigious Russian university.', null, [ACT.vocabularyPeople]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: Zero copula
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Нулевая связка',
      'nulevaya svyazka — zero copula',
      'Russian has NO verb "to be" in the present tense. The sentence "I am a student" is just Я студент — two words, no verb between them. Other tenses DO use forms of быть: past был / была / было / были; future буду / будешь / будет.',
      'sentence',
      'Я Сара. / Я студентка. / Я из США. / Москва — столица России.',
      'Four examples of zero-copula structures: pronoun + noun, pronoun + role, pronoun + origin phrase, place + descriptor with a dash for emphasis.',
      [
        { target: 'Я Сара. (no verb)', note: '"I [am] Sara." — bare subject + predicate noun' },
        { target: 'Я студентка. (no verb)', note: '"I [am] a student (f)." — gendered role noun matches the speaker' },
        { target: 'Москва — столица. (dash)', note: '"Moscow [is] the capital." — written dash replaces the missing copula for emphasis' },
        { target: 'Я был студентом. (past, with верb)', note: '"I was a student." — past tense REQUIRES the verb был + instrumental case' },
      ],
      [ACT.grammarBe],
    ),
    createContentItem(
      'Нет глагола в настоящем',
      'No verb in the present',
      'CRITICAL RULE: never insert a verb meaning "am/is/are" in a present-tense Russian sentence. The English-speaker trap is to translate "I am a student" word-for-word as Я есть студент — this is grammatically wrong in modern Russian (есть exists but means "there is / there are" for existence, not for predication).',
      'sentence',
      'CORRECT: Я студент.\nWRONG: Я есть студент. (sounds archaic/foreign)',
      'The single most common mistake of beginner Russian learners from English — drop the verb entirely.',
      [
        { target: 'Я + noun ✓', note: 'standard zero-copula present-tense identification' },
        { target: 'Я есть + noun ✗', note: 'wrong; есть is reserved for existential "there is/are" or food-eating' },
      ],
      [ACT.grammarBe],
    ),
    createContentItem(
      'Это X',
      'Eto X — "this is X"',
      'The universal pointing-and-naming pattern: Это + noun = "This is [noun]". Это is invariable — it does NOT change for the gender or number of the noun it introduces. Это книга. (This is a book — fem) / Это стол. (This is a table — masc) / Это студенты. (These are students — pl).',
      'sentence',
      'Это мой друг. / Это моя сестра. / Это студенты МГУ.',
      'High-frequency pattern; used for introductions, pointing, and identification across all genders and numbers.',
      [
        { target: 'Это + masc noun', note: 'Это стол. ("This is a table.") — pointing to a masculine inanimate object' },
        { target: 'Это + fem noun', note: 'Это книга. ("This is a book.")' },
        { target: 'Это + plural', note: 'Это студенты. ("These are students.") — still Это, never эти + verb in this naming sense' },
      ],
      [ACT.grammarBe],
    ),
    createContentItem(
      'Вопросы — Кто? Что? Как?',
      'Questions — Kto? Chto? Kak?',
      'Yes/no questions in Russian DO NOT change word order — only the intonation changes (sharp rise on the questioned word, then fall). For Wh-questions, place the question word at the start: Кто это? ("Who is this?"), Что это? ("What is this?"), Как вас зовут? ("What is your name?", lit. "How do they call you?").',
      'sentence',
      'Вы студент? (yes/no, intonation only) / Кто вы? / Откуда вы?',
      'Russian inversion is much simpler than English: usually no inversion at all, only intonation does the work.',
      [
        { target: 'Вы студент?', note: 'yes/no question; same word order as statement, only rising-falling intonation' },
        { target: 'Кто вы?', note: '"Who are you?" — Wh-question with question word at start' },
        { target: 'Откуда вы?', note: '"Where are you from?" — Откуда literally "from where"; takes genitive in the answer' },
      ],
      [ACT.grammarBe],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Pronouns + gender
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Личные местоимения',
      'Lichnye mestoimeniya — personal pronouns',
      'Russian has 8 personal pronouns. Nominative forms only here — they take different shapes in each of the six grammatical cases (which you will meet later). я ya (I) · ты ty (you-informal sg) · он on (he/it-masc) · она ona (she/it-fem) · оно ono (it-neut) · мы my (we) · вы / Вы vy / Vy (you-formal sg or pl) · они oni (they).',
      'sentence',
      'я / ты / он / она / оно / мы / вы / они',
      'Note three peculiarities: (1) я is lowercase by default; (2) Вы is capitalized in formal singular writing; (3) он/она are used for inanimate things too, matching grammatical gender.',
      [
        { target: 'я ya', note: 'first-person singular; lowercase by default' },
        { target: 'ты ty', note: 'second-person informal singular; for peers, friends, family, pets' },
        { target: 'Вы Vy', note: 'second-person formal; capitalized when addressing ONE person in writing' },
        { target: 'он/она/оно on/ona/ono', note: 'third-person singular; gender-matched to the noun, including inanimate objects' },
      ],
      [ACT.grammarPronounsGender],
    ),
    createContentItem(
      'Грамматический род',
      'Grammaticheskiy rod — grammatical gender',
      'Every Russian noun has a grammatical gender: masculine (м.р.), feminine (ж.р.), or neuter (ср.р.). Rules of thumb: ends in a consonant or -й = masc (стол, дом, чай); ends in -а or -я = fem (книга, мама, неделя); ends in -о or -е = neut (окно, поле, имя). Exceptions exist (папа is masc despite -а; путь is masc despite ending in -ь).',
      'sentence',
      'стол (m) → он · книга (f) → она · окно (n) → оно · мама (f) → она · папа (m, exception) → он',
      'Gender is not optional — it determines pronoun choice, adjective agreement, and past-tense verb form (он был, она была, оно было, они были).',
      [
        { target: 'consonant / -й → m', note: 'дом, стол, чай, музей — overwhelming default for masculine' },
        { target: '-а / -я → f', note: 'книга, мама, неделя — overwhelming default for feminine' },
        { target: '-о / -е → n', note: 'окно, поле, море — neuter; rarer gender' },
        { target: 'people-words override', note: 'папа is m even with -а ending; дядя (uncle) is m; meaning trumps morphology for human referents' },
      ],
      [ACT.grammarPronounsGender],
    ),
    createContentItem(
      'Мой / моя / моё / мои',
      'Moy / moya / moyo / moi — "my"',
      'The possessive "my" has FOUR forms, agreeing with the gender and number of the possessed noun (NOT with the owner): мой (м.р. sg), моя (ж.р. sg), моё (ср.р. sg), мои (pl). Same pattern for твой / твоя / твоё / твои ("your-informal").',
      'sentence',
      'мой друг (m) · моя сестра (f) · моё имя (n) · мои родители (pl)',
      'Agreement is with the noun, not the speaker — мой стол ("my table") regardless of whether the speaker is male or female.',
      [
        { target: 'мой + masc noun', note: 'мой брат, мой дом, мой телефон' },
        { target: 'моя + fem noun', note: 'моя сестра, моя книга, моя мама' },
        { target: 'моё + neut noun', note: 'моё имя, моё окно, моё письмо' },
        { target: 'мои + plural noun', note: 'мои друзья, мои книги, мои родители' },
      ],
      [ACT.grammarPronounsGender],
    ),
    createContentItem(
      'Ваш / ваша / ваше / ваши',
      'Vash / vasha / vashe / vashi — "your-formal"',
      'The polite/plural "your": ваш (м.р. sg), ваша (ж.р. sg), ваше (ср.р. sg), ваши (pl). Same agreement principle as мой — matches the possessed noun. Capitalize Ваш / Ваша etc. when addressing ONE formal addressee in writing.',
      'sentence',
      'Как Ваше имя? (formal sg) / Ваши документы, пожалуйста. (gen border guard)',
      '"What is your (formal) name?" — standard formal version of "Как вас зовут?" — Ваше agrees with the neuter имя.',
      null,
      [ACT.grammarPronounsGender],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Negation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Не — отрицание',
      'Ne — negation',
      'Place the unstressed particle не directly before the verb or predicate to negate it. For zero-copula present tense, place не before the predicate noun or adjective: Я не студент ("I am not a student"), Я не из Москвы ("I am not from Moscow"). не is always unstressed and pronounced "ni" (иканье applies).',
      'sentence',
      'Я не студент. / Я не из Москвы. / Он не русский.',
      'Universal negation marker; works for verbs, predicate nouns, adjectives, and prepositional phrases.',
      [
        { target: 'не + predicate', note: 'pre-predicate negation; appears in zero-copula sentences' },
        { target: 'не + verb', note: 'pre-verb negation; appears in tensed sentences (я не знаю "I do not know")' },
        { target: 'не pronounced "ni"', note: 'unstressed; иканье reduces е to /i/' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'Не vs Нет',
      'Ne vs Net',
      'CRITICAL DISTINCTION: не is the negation PARTICLE (always before what it negates, unstressed). нет is the standalone word "no" — answers a yes/no question, or means "there is/are not" with genitive (У меня нет времени = "I have no time"). Different words, different functions.',
      'sentence',
      'Вы студент? — Нет, я не студент.',
      'A complete negative answer combines нет ("no") as the standalone answer with не + predicate as the explicit denial.',
      [
        { target: 'нет = "no" / "there is not"', note: 'standalone word; always stressed; opens a negative answer' },
        { target: 'не = "not" before what it negates', note: 'particle; always unstressed; pre-modifies a verb or predicate' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'Не X, а Y',
      'Ne X, a Y — "not X, but Y"',
      'The standard polite pattern for correcting someone\'s wrong guess: Не X, а Y ("not X, but Y"). The comma + а is essential — а is the contrastive "but" (different from но which is concessive). Use не X, а Y when both halves are alternatives in the same category (nationalities, roles, places).',
      'sentence',
      '— Вы из Японии? — Нет, я не из Японии, а из Кореи.',
      'A complete polite correction: negative answer + explicit denial + offered alternative — the three-part rhythm makes it sound natural rather than blunt.',
      [
        { target: 'Не X (denial)', note: 'spell out what you are NOT, even if redundant; signals you understood the question' },
        { target: ', а Y (alternative)', note: 'contrastive а introduces the correct option; comma is mandatory in writing' },
      ],
      [ACT.grammarNegation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Самопрезентация',
      'Samoprezentatsiya — self-introduction',
      'A complete five-sentence self-introduction in Russian. Read it aloud with correct stress, akanye, and final devoicing on the surname. Notice the parallel zero-copula structure: every sentence begins with Я (no verb between subject and predicate).',
      'sentence',
      'Здравствуйте! Меня зовут Сара Ким. Я из США. Я студентка МГУ, моя специальность — компьютерная инженерия. Очень приятно познакомиться.',
      'Translation: "Hello! My name is Sara Kim. I am from the USA. I am a student at MSU, my major is Computer Engineering. Very pleased to meet you."',
      [
        { target: 'Меня зовут Сара Ким', note: 'standard name introduction; works in all registers; full name (имя + фамилия) in formal contexts' },
        { target: 'Я из США', note: 'origin using Я из + genitive; США is the abbreviation for Соединённые Штаты Америки' },
        { target: 'Я студентка МГУ', note: 'role + institution using zero copula; студентка is feminine; МГУ is in the genitive (МГУ is invariable as an abbreviation)' },
        { target: 'моя специальность — компьютерная инженерия', note: '"my major is Computer Engineering" — feminine noun специальность takes feminine моя; dash replaces zero copula' },
        { target: 'Очень приятно познакомиться', note: 'longer formal version of Очень приятно; добавляет познакомиться ("to make acquaintance") for emphasis' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'Вопросы на понимание',
      'Voprosy na ponimanie — comprehension questions',
      'Four standard comprehension questions matching the paragraph. Answer each in a short sentence using zero-copula present; full sentences are typical but short answers (just the predicate) are also natural.',
      'sentence',
      'Q1: Как её зовут? Q2: Откуда она? Q3: Она студентка? Q4: Какая у неё специальность?',
      'Four question types: name, origin, yes/no role, specific-information about major.',
      [
        { target: 'A1: Её зовут Сара Ким.', note: 'third-person version of name-giving; Её is acc of она' },
        { target: 'A2: Она из США.', note: 'origin answer with Я из + genitive structure repeated in third person' },
        { target: 'A3: Да. / Да, она студентка.', note: 'short or full positive answer' },
        { target: 'A4: Компьютерная инженерия. / Её специальность — компьютерная инженерия.', note: 'short or full answer; dash replaces copula' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Первое знакомство (Вы)',
      'Pervoe znakomstvo (Vy)',
      'A natural polite-register first-meeting conversation between two doctoral candidates at МГУ. Covers all the patterns from this lesson: greeting, name exchange, origin, role, agreement, and farewell. Both speakers stay in Вы throughout — appropriate for first-meeting peers in academia.',
      'conversation',
      'Дмитрий: Здравствуйте! Меня зовут Дмитрий. А вас?\nСара: Очень приятно, Дмитрий. Меня зовут Сара.\nДмитрий: Откуда вы?\nСара: Я из США. А вы?\nДмитрий: Я из Петербурга. Вы тоже аспирантка?\nСара: Да, я аспирантка факультета вычислительной математики. А вы?\nДмитрий: Я тоже! Какое совпадение.\nСара: Тогда увидимся на лекциях.\nДмитрий: До свидания!',
      'A natural exchange between academic peers using Вы — the default for first-meeting Russian adults of equal status.',
      [
        { target: 'Меня зовут Дмитрий. А вас?', note: 'name handover + return-the-question; А вас? is the standard short follow-up' },
        { target: 'Откуда вы?', note: '"Where are you from?" — Откуда takes genitive in the answer' },
        { target: 'Я из США', note: 'Я из + genitive country; США is invariable as an abbreviation' },
        { target: 'Вы тоже аспирантка?', note: 'тоже ("also/too") confirms shared status; аспирантка is feminine PhD-candidate' },
        { target: 'Какое совпадение!', note: '"What a coincidence!" — common reaction expression; neuter form of какое to agree with neuter совпадение' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      'Первое знакомство (ты)',
      'Pervoe znakomstvo (ty)',
      'A casual peer-to-peer version of the same conversation, using ты throughout. Appropriate for student-age peers in informal settings (dorm common room, club meeting, friend-of-a-friend introduction).',
      'conversation',
      'Саша: Привет! Я Саша.\nСара: Привет, Саша! Я Сара.\nСаша: Откуда ты?\nСара: Я из Бостона. А ты?\nСаша: Я из Казани. Ты тоже студентка МГУ?\nСара: Да, я первокурсница. А ты?\nСаша: Я на третьем курсе. Программирую.\nСара: Класс!\nСаша: Пока, увидимся!',
      'Same information as the formal version but in casual ты-register — appropriate for peer-age students in informal first meetings.',
      [
        { target: 'Привет! Я Саша.', note: 'casual greeting + zero-copula self-naming with diminutive Саша (= Александр or Александра)' },
        { target: 'Я первокурсница', note: '"I am a first-year student (f)" — first year = первый курс; -ница feminine suffix' },
        { target: 'Я на третьем курсе.', note: '"I am in third year" — third year of university; на + prepositional case' },
        { target: 'Класс!', note: 'casual reaction "cool / awesome"; slang from английского "class"' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Шаблон для письма',
      'Shablon dlya pis\'ma — writing template',
      'A reusable five-sentence template for any Russian self-introduction. Fill in the bracketed slots with your own information — the structure carries the rest. Use the no-copula present tense for every sentence except the optional past-tense extra fact.',
      'sentence',
      'Здравствуйте! Меня зовут [имя фамилия]. Я из [страны] (genitive). Я [роль] в [МГУ / СПбГУ / etc]. Я [одно дополнительное предложение]. Очень приятно познакомиться.',
      'Five sentences cover the core: greeting, name, origin, role + institution, personal fact, closing — the minimum complete self-introduction.',
      [
        { target: '[имя фамилия]', note: 'your given name + surname; first name only for casual contexts, both for formal' },
        { target: '[страны in genitive]', note: 'country in genitive case after из: США, России, Японии, Кореи' },
        { target: '[роль]', note: 'студент / студентка / преподаватель / инженер / врач — the noun for your professional or academic identity, gender-matched' },
        { target: '[одно дополнительное предложение]', note: 'something specific that distinguishes you (hobby, major, favorite thing); avoid generic facts' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      'Письменное упражнение',
      'Pis\'mennoe uprazhneniye — writing exercise',
      'Write your own 3–5 sentence self-introduction in Cyrillic using the template. Use zero-copula present tense at least twice and the Я из + genitive pattern at least once so the writing demonstrates the core grammar of this lesson.',
      'sentence',
      'Пример: Здравствуйте! Меня зовут Ким Чжи Су. Я из Сеула. Я аспирантка МГУ. Моя специальность — машинное обучение. Очень приятно познакомиться!',
      'Translation: "Hello! My name is Kim Ji-su. I am from Seoul. I am a PhD candidate at MSU. My major is Machine Learning. Very pleased to meet you!"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Имя — Отчество — Фамилия',
      'Imya — Otchestvo — Familiya',
      'Russian people have THREE names in formal contexts: имя (given name) + отчество (patronymic, "son/daughter of [father\'s name]") + фамилия (surname). Иван Петрович Иванов = Ivan, son of Pyotr, Ivanov. Adults address each other formally by имя + отчество (Иван Петрович!) — NEVER by surname alone in spoken Russian (that\'s a military or police register).',
      'sentence',
      'Лев Николаевич Толстой = Lev (имя) + Nikolaevich (отчество, son of Nikolay) + Tolstoy (фамилия).',
      'Tolstoy\'s full name is the classic example; every Russian student knows this pattern from school.',
      [
        { target: 'имя (given name)', note: 'Иван, Мария, Александр — the basic first name; casual diminutives also exist (Ваня, Маша, Саша)' },
        { target: 'отчество (patronymic)', note: 'father\'s first name + -ович/-евич (m) or -овна/-евна (f); Пётр → Петрович (m) / Петровна (f)' },
        { target: 'фамилия (surname)', note: 'family name; gender-marked endings (-ов/-ова, -ин/-ина, -ский/-ская)' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Уменьшительные имена',
      'Umen\'shitelnyye imena — diminutives',
      'Almost every Russian first name has multiple diminutive (short and affectionate) forms used among friends and family. Александр → Саша (neutral short) → Сашенька (affectionate) → Шура (older variant). Екатерина → Катя → Катюша. Мария → Маша → Машенька. Using a diminutive signals warmth and familiarity — calling a stranger by the diminutive would be wildly inappropriate.',
      'sentence',
      'Александр → Саша → Сашенька → Шура · Мария → Маша → Машенька · Екатерина → Катя → Катюша',
      'Diminutives are a core part of Russian register awareness — using them appropriately is essential for genuine friendships.',
      [
        { target: 'Александр → Саша', note: 'neutral short form; used among friends and acquaintances; works for both Александр (m) and Александра (f)' },
        { target: '+ -енька / -ушка', note: 'affectionate suffixes; Сашенька, Машенька — used in romantic relationships, families, with children' },
        { target: 'old variants', note: 'Шура (Sasha), Аля (Alya), Стёпа (Stepa) — older forms still in use, sometimes pet-name only' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Ты vs Вы',
      'Ty vs Vy',
      'Вы (capitalized in formal singular writing) is the polite "you" used with strangers, older people, authorities, customers, professors, and anyone you have not been invited to ты with. Ты is the casual "you" for peers, friends, family, children, pets. Switching from Вы to ты is a relationship milestone — usually requires explicit permission: "Давайте на ты" ("Let\'s switch to ты"). The reverse switch (ты → Вы) signals coldness, anger, or distance.',
      'sentence',
      'Formal: Здравствуйте, Иван Петрович. Как Вы поживаете?\nCasual: Привет, Ваня! Как ты?',
      'Switching mid-conversation is consequential — practice noticing the register markers in every Russian exchange.',
      [
        { target: 'Вы (formal sg + plural)', note: 'use with strangers, older, authorities, customers; always plural verb agreement even for one person' },
        { target: 'ты (casual sg)', note: 'use with peers, friends, family, children; singular verb agreement' },
        { target: 'Давайте на ты', note: 'phrase to propose switching to ты — should usually be initiated by the older/more senior person' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'МГУ и СПбГУ',
      'MGU i SPbGU',
      'Московский государственный университет имени М. В. Ломоносова (МГУ, often abbreviated as "Moscow State" in English) is Russia\'s flagship university, founded in 1755 by Mikhail Lomonosov. Its main building on Воробьёвы горы (Sparrow Hills) is one of Stalin\'s Seven Sisters — a 36-story skyscraper visible across Moscow. Its principal rival is СПбГУ (Saint Petersburg State University), the second oldest and second most prestigious Russian university. Students freely identify with their university: Я из МГУ. / Я из СПбГУ.',
      'sentence',
      'МГУ имени Ломоносова — главный университет России.',
      '"MSU named after Lomonosov — Russia\'s main university." — standard description, often abbreviated as just МГУ.',
      [
        { target: 'МГУ MGU', note: 'Moscow State University; founded 1755; flagship of Russian higher education' },
        { target: 'СПбГУ SPbGU', note: 'Saint Petersburg State University; founded 1724; second oldest Russian university' },
        { target: 'Ломоносов Lomonosov', note: 'Mikhail Lomonosov; 18th-century polymath; MSU is named after him' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Задание: первый день в МГУ',
      'Zadaniye: pervyy den\' v MGU',
      'Roleplay your first day at МГУ with the AI tutor playing a doctoral candidate from Saint Petersburg. Use every skill from this lesson in one continuous scene — greet, introduce, ask, answer, farewell. Stay in Вы throughout (you and the AI partner have just met and are equal-age peers in an academic context).',
      'conversation',
      '[Лаборатория, МГУ]\nАспирант: Здравствуйте! Меня зовут Дмитрий Соколов. А вас?\nВы: [приветствие + представление]\nАспирант: Очень приятно. Откуда вы?\nВы: [страна / город в родительном падеже]\nАспирант: А кто вы по специальности?\nВы: [роль + специальность]\nАспирант: Очень интересно. Удачи вам!\nВы: [прощание]',
      'Six turns of fluent Вы-register exchange; the AI tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: 'приветствие', note: 'Здравствуйте + Очень приятно — pick the polite register since the AI partner opened with Здравствуйте' },
        { target: 'представление', note: 'Меня зовут… or Я + name with zero copula' },
        { target: 'страна / город', note: 'Я из + genitive — США, России, Бостона, Сеула' },
        { target: 'роль + специальность', note: 'Я студент / аспирант / преподаватель + Моя специальность — …' },
        { target: 'прощание', note: 'До свидания / Всего доброго / Удачи — match the polite register you opened with' },
      ],
      [ACT.task],
    ),
    createContentItem(
      'Вызов — исправить предположение',
      'Vyzov — ispravit\' predpolozheniye',
      'Stretch goal: in the same scene, the doctoral candidate guesses your country incorrectly. Politely correct using the Не X, а Y pattern. Closes the loop without making the asker feel embarrassed.',
      'conversation',
      'Дмитрий: А, вы, наверное, из Японии?\nВы: Нет, я не из Японии, а из Кореи. Из Сеула.\nДмитрий: Ой, извините, я ошибся.\nВы: Ничего страшного.',
      '"Ничего страшного" (nothing terrible) is a polite reassurance — "no big deal" — common after any small mistake or apology.',
      [
        { target: 'Не X, а Y', note: 'the standard three-part polite correction pattern from Grammar III' },
        { target: 'Ничего страшного', note: '"no big deal" / "it\'s nothing" — polite reassurance after a small apology' },
        { target: 'Извините', note: '"sorry / excuse me" — standard polite apology; slightly more formal than the casual Прости' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
