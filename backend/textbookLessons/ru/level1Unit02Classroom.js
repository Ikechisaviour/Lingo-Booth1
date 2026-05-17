// Level 1 Unit 2 — Classroom & Studies (Russian)
// Functions: identifying classroom objects, naming subjects, asking about
// schedules, talking about students/teachers, classroom commands.

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
  orientation: 'ru-l1u2-orientation',
  pronunciation: 'ru-l1u2-pronunciation',
  vocabularyObjects: 'ru-l1u2-vocab-objects',
  vocabularySubjects: 'ru-l1u2-vocab-subjects',
  grammarThisThat: 'ru-l1u2-grammar-this-that',
  grammarPossessives: 'ru-l1u2-grammar-possessives',
  grammarPlural: 'ru-l1u2-grammar-plural',
  reading: 'ru-l1u2-reading',
  listening: 'ru-l1u2-listening',
  writing: 'ru-l1u2-writing',
  culture: 'ru-l1u2-culture',
  task: 'ru-l1u2-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Name 20+ everyday classroom objects in Russian (стол, стул, доска, ручка, учебник, тетрадь, рюкзак) using gender-correct nouns and matching pronouns он/она/оно.',
      'List your university subjects (русский язык, математика, физика, программирование, литература) and ask "Что у тебя сегодня?" / "What do you have today?"',
      'Follow basic classroom commands (Откройте учебник, Прочитайте текст, Слушайте внимательно) and respond to roll call (Я здесь / Я есть).',
    ],
    task: 'Picture your first 8 am lecture at МГУ — the професcор enters and gives instructions. By the end of this lesson you should follow every direction and locate every object in the room in Russian.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in classroom Russian',
    goals: [
      'Apply akanye in высокочастотных classroom words: учебник /uˈtʃʲebnʲɪk/ (only second syllable stressed), карандаш /kərɐnˈdaʂ/ (third syllable stressed).',
      'Handle the consonant cluster шк in школа /ˈʂkoɫɐ/ — Russian permits initial sh-k unlike English.',
      'Apply final devoicing in карандаш — final ш is straightforward, but контролируйте in карандаша (genitive) /-ʂa/ — ш stays voiceless throughout.',
    ],
    task: 'Read each classroom word aloud, mark the stress, and apply akanye / final devoicing where relevant.',
  },
  {
    id: ACT.vocabularyObjects,
    section: 'Vocabulary I',
    title: 'Classroom objects',
    goals: [
      'Memorize 16 high-frequency classroom nouns with their grammatical gender — every Russian object is m/f/n and you cannot use it correctly without knowing which.',
      'Learn to ask "Where is …?" using Где + nominative: Где доска? / Где учебник? / Где моя ручка?',
    ],
    task: 'Point at each classroom object and say its Russian name + gender + matching pronoun (стол → он, доска → она, окно → оно).',
  },
  {
    id: ACT.vocabularySubjects,
    section: 'Vocabulary II',
    title: 'Subjects, schedule words, and student types',
    goals: [
      'Name 10 academic subjects (русский язык, математика, физика, химия, биология, история, программирование, литература, философия, английский).',
      'Use schedule words (урок, лекция, семинар, перемена, расписание, экзамен) to talk about the school day.',
    ],
    task: 'List your top 5 subjects this semester and pair each with one schedule word (Сегодня у меня лекция по математике).',
  },
  {
    id: ACT.grammarThisThat,
    section: 'Grammar I',
    title: 'Это vs Этот / Эта / Это / Эти — "this/these"',
    goals: [
      'Use invariable Это to name something: Это книга. (This is a book.) / Это студенты. (These are students.) — Это never changes here.',
      'Use the DECLINING demonstrative этот / эта / это / эти as a modifier: Этот учебник новый. / Эта ручка моя. — agrees in gender and number with the noun it modifies.',
      'Distinguish the two: invariable Это points and names; declining этот/эта/etc. modifies a noun within the sentence.',
    ],
    task: 'Build 6 sentences using Это (pointing) and 6 sentences using этот/эта/это/эти (modifying); compare the two structures.',
  },
  {
    id: ACT.grammarPossessives,
    section: 'Grammar II',
    title: 'Possessives — мой / твой / наш / ваш / его / её / их',
    goals: [
      'Use мой / твой / наш / ваш with full agreement (gender + number): мой стол, моя ручка, моё окно, мои книги.',
      'Use the INVARIABLE possessives его (his/its-m/its-n), её (her), их (their) — these never change shape regardless of the noun.',
      'Avoid the English-to-Russian trap of agreeing his/her with the owner — these are invariable in Russian.',
    ],
    task: 'Build 8 possessive phrases mixing both types (мой учебник, его учебник, её сумка, наши преподаватели).',
  },
  {
    id: ACT.grammarPlural,
    section: 'Grammar III',
    title: 'Plural formation — -ы / -и / -а / -я',
    goals: [
      'Form regular masculine and feminine plurals: hard-stem nouns take -ы (студент → студенты, книга → книги but actually -и due to 7-letter rule); soft-stem nouns take -и (учитель → учителя, неделя → недели).',
      'Recognize neuter plurals -а / -я: окно → окна, поле → поля. Many masculine nouns also take -а (дом → дома) — a quirky group that requires memorization.',
      'Apply the 7-letter rule: nouns ending in к г х ж ш щ ч take -и (NOT -ы): книги, девочки, девушки, мужчины — never *книгы.',
    ],
    task: 'Form the plural of 10 high-frequency classroom nouns and identify which spelling rule applies.',
  },
  {
    id: ACT.reading,
    section: 'Reading',
    title: 'Read a class schedule',
    goals: [
      'Read a Russian class schedule aloud, naming each day of the week and each subject in nominative.',
      'Answer comprehension questions about when each subject occurs and who teaches it.',
    ],
    task: 'Read the schedule below and answer four questions about it in short Russian sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening',
    title: 'Classroom commands',
    goals: [
      'Follow 8 standard classroom commands in Russian (Откройте, Закройте, Прочитайте, Послушайте, Запишите, Повторите, Сядьте, Встаньте).',
      'Recognize the formal -те ending on plural/polite imperatives vs the singular ты-form (открой vs откройте).',
    ],
    task: 'Listen to 8 commands and physically respond (open book, close book, repeat, etc.) without translating.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Describe your study desk',
    goals: [
      'Write 5–6 sentences describing the objects on your study desk, using gender-correct nouns and possessive agreement.',
      'Use Это + invariable for naming and этот/эта/это/эти for modifying.',
    ],
    task: 'Write your desk description and read it aloud with correct stress.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Russian education and the МГУ campus',
    goals: [
      'Understand the structure of Russian higher education: 4-year бакалавриат (bachelor\'s), 2-year магистратура (master\'s), 3-year аспирантура (PhD candidate).',
      'Recognize the prestige hierarchy: МГУ → СПбГУ → НГУ (Новосибирский) → УрФУ (Екатеринбург) → other regional universities.',
      'Know that addressing teachers requires имя + отчество (Иван Петрович), never just "учитель" or surname alone.',
    ],
    task: 'List three things you would do differently in a Russian classroom vs your home country classroom.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First lecture at МГУ',
    goals: [
      'Combine all skills: greet the professor, identify yourself, locate your seat, follow the opening commands, ask one question about the syllabus.',
      'Stay in Вы register throughout when addressing the professor; ты with peers nearby.',
    ],
    task: 'Roleplay the first 5 minutes of a Russian lecture with the AI tutor as professor.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 2: Урок — Classroom and Studies',
  category: 'classroom',
  difficulty: 'beginner',
  targetLang: 'ru',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'naming-objects', label: 'Naming classroom objects', goal: 'Identify every object you see in a classroom by Russian name + gender + matching pronoun.' },
    { id: 'asking-where', label: 'Asking where something is', goal: 'Use Где + nominative to locate any object (Где доска? Где моя ручка?).' },
    { id: 'following-commands', label: 'Following commands', goal: 'Respond physically to standard classroom imperatives without translating word-by-word.' },
    { id: 'discussing-schedule', label: 'Discussing schedule', goal: 'Tell someone what classes you have today and ask the same back (Что у тебя сегодня?).' },
  ],
  relatedPools: ['topic-school', 'topic-objects'],
  content: [
    createContentItem('Цели урока', 'Tseli uroka', 'By the end of this lesson, you can identify everything in a Russian classroom by name, follow standard professor commands, and discuss your schedule and subjects without searching for words.', 'word', 'Сегодня мы изучаем класс и предметы.', '"Today we study the classroom and subjects." — typical opening line of a Russian language lesson.', null, [ACT.orientation]),
    createContentItem('Реальный сценарий', 'Realnyy stsenariy', 'You walk into your first 8 am lecture at the historic main building of МГУ on Воробьёвы горы. The aspirant teaching the seminar enters, opens the textbook, and starts giving directions in rapid Russian — you need to follow every word.', 'word', 'Откройте учебник на странице 12.', '"Open your textbook to page 12." — standard opening direction; учебник (textbook) is masculine, takes на + prepositional case for "on page".', [
      { target: 'Откройте otkroyte', note: 'plural/polite imperative of открыть ("to open"); -те ending signals Вы or plural addressee' },
      { target: 'учебник uchebnik', note: 'textbook (m); stress on the 2nd syllable -че-; common university object' },
      { target: 'на странице na stranitse', note: '"on page" — preposition на + prepositional case of страница (page, f)' },
    ], [ACT.orientation]),
    createContentItem('Три части урока', 'Tri chasti uroka', 'A typical Russian university лекция has three parts: лекция (lecture by professor, 45-90 min), перемена (break, 10-15 min), and семинар (seminar with discussion, often led by an аспирант). The pacing is faster and more dense than typical Western university lectures.', 'word', 'Лекция → перемена → семинар.', 'Standard sequence of a Russian academic morning; understanding which part you are in helps set register and participation expectations.', null, [ACT.orientation]),

    createContentItem('учебник', 'uchebnik', 'Учебник (m, stress on -че-) — textbook. The most-handled classroom object. Genitive учебника. Loses а in plural учебники (7-letter rule applies after к).', 'word', 'Откройте учебник на странице 10.', '"Open the textbook to page 10." — standard professor instruction; учебник is the direct object in accusative (= nominative for inanimate masculine).', null, [ACT.pronunciation]),
    createContentItem('тетрадь', 'tetrad\'', 'Тетрадь (f, stress on -páдь, ends in soft ь) — notebook. Feminine noun ending in -ь requires special declension (3rd declension). Plural тетради. Final devoicing of д to /t/: "tetrát".', 'word', 'У меня новая тетрадь.', '"I have a new notebook." — standard possession sentence using У + genitive personal pronoun + nominative noun.', null, [ACT.pronunciation]),
    createContentItem('школа', 'shkola', 'Школа (f) — school (primary/secondary). Russian distinguishes школа (K-11) from университет/институт/вуз (tertiary). Stress on first syllable; initial consonant cluster шк.', 'word', 'Я учусь в школе.', '"I study at school." — учиться (to study) + в + prepositional case школе.', null, [ACT.pronunciation]),

    createContentItem('стол', 'stol', 'Table / desk (m). One of the most frequent nouns in Russian. Plural столы (stress shifts to ending). Diminutive столик (small table, often "café table").', 'word', 'На столе книга.', '"On the table is a book." — locative phrase with на + prepositional case.', null, [ACT.vocabularyObjects]),
    createContentItem('стул', 'stul', 'Chair (m). Irregular plural: стулья (with -ья ending instead of expected -ы). One of a small group of nouns with this irregular plural (брат → братья, друг → друзья).', 'word', 'Здесь четыре стула.', '"There are four chairs here." — стула is genitive singular (after 2-4 numerals).', null, [ACT.vocabularyObjects]),
    createContentItem('доска', 'doska', 'Board / blackboard (f). Mobile-stress noun: доскá (nom sg) → дóски (nom pl). Modern classrooms have доска интерактивная (smart board).', 'word', 'Посмотрите на доску.', '"Look at the board." — посмотреть + на + accusative.', null, [ACT.vocabularyObjects]),
    createContentItem('ручка', 'ruchka', 'Pen (f). Literally "little hand" (diminutive of рука "hand") — Russian uses this to mean pen, door handle, or chair arm depending on context. Plural ручки (7-letter rule).', 'word', 'Дайте мне ручку, пожалуйста.', '"Give me a pen, please." — formal polite request using дать (imperative дайте).', null, [ACT.vocabularyObjects]),
    createContentItem('карандаш', 'karandash', 'Pencil (m). Final ш always voiceless. Stress on the final syllable. Plural карандаши (-и after ш per 7-letter rule).', 'word', 'У меня нет карандаша.', '"I have no pencil." — нет + genitive carries the meaning "absence of"; карандаша is genitive of карандаш.', null, [ACT.vocabularyObjects]),
    createContentItem('окно', 'okno', 'Window (n). Akanye fully applies: spelled o-k-n-o but spoken "akno" (stressed final о). Plural окна. The exception to neuter "stays neuter" — окна as a vague slang term can mean "free periods between classes".', 'word', 'Откройте окно, пожалуйста.', '"Open the window, please." — окно is accusative direct object (same as nominative for inanimate neuter).', null, [ACT.vocabularyObjects]),
    createContentItem('дверь', 'dver\'', 'Door (f). 3rd-declension feminine ending in -ь. Mobile stress in plural: двери. Final devoicing: -рь /-rʲ/.', 'word', 'Закройте дверь.', '"Close the door." — закрыть imperative + accusative.', null, [ACT.vocabularyObjects]),
    createContentItem('сумка', 'sumka', 'Bag (f). Generic word for any bag (shopping, handbag, sports). For a backpack specifically: рюкзак (m). Plural сумки.', 'word', 'Где моя сумка?', '"Where is my bag?" — using Где + nom + possessive agreement (моя fem).', null, [ACT.vocabularyObjects]),
    createContentItem('рюкзак', 'ryukzak', 'Backpack (m). Borrowed from German "Rucksack". The default student carry-bag in Russia, especially at МГУ and other large campuses. Plural рюкзаки.', 'word', 'Мой рюкзак тяжёлый.', '"My backpack is heavy." — adjective тяжёлый (m) agrees with рюкзак.', null, [ACT.vocabularyObjects]),
    createContentItem('компьютер', 'komp\'yuter', 'Computer (m). Borrowed; pronunciation reflects Russian phonology (no glide insertion in front of ю). Plural компьютеры.', 'word', 'Это мой компьютер.', '"This is my computer." — pointing/identification with Это + zero copula.', null, [ACT.vocabularyObjects]),
    createContentItem('телефон', 'telefon', 'Phone (m). Greek-origin word. Genitive телефона, plural телефоны. Often used for "mobile phone" — мобильный телефон → мобильник (colloquial).', 'word', 'У тебя есть телефон?', '"Do you have a phone?" — У + gen + есть + nom (possessive structure).', null, [ACT.vocabularyObjects]),
    createContentItem('часы', 'chasy', 'Clock / watch (pl tantum). Always plural in Russian — there is no singular час meaning clock (час singular means "hour"). Verb agreement: часы идут ("the clock is going") — plural verb.', 'word', 'Мои часы спешат.', '"My watch is fast." — часы always plural, requiring plural verb and plural мои.', null, [ACT.vocabularyObjects]),
    createContentItem('класс', 'klass', 'Classroom / class (m). Double s pronounced as a single long s. Plural классы. Can mean (1) physical classroom, (2) school grade level (5-й класс = 5th grade), or (3) social class.', 'word', 'Мы в классе.', '"We are in the classroom." — в + prepositional case классе.', null, [ACT.vocabularyObjects]),

    createContentItem('русский язык', 'russkiy yazyk', 'Russian language (m phrase). Adjective русский agrees with masculine язык. Often shortened to just русский ("Russian" as school subject).', 'word', 'Сегодня у меня русский язык.', '"Today I have Russian." — У + gen + nominative for "I have/have got" pattern.', null, [ACT.vocabularySubjects]),
    createContentItem('английский', 'angliyskiy', 'English language / subject (m adjective used as noun). When meaning the subject, often без язык: "Я учу английский" ("I study English"). Stress on -ли-.', 'word', 'Я учу английский.', '"I am studying English." — учу is 1sg of учить ("to study, to learn").', null, [ACT.vocabularySubjects]),
    createContentItem('математика', 'matematika', 'Mathematics (f). Greek-origin word. Stress on -ма- (second syllable from start). Stress doesn\'t move across forms.', 'word', 'Я люблю математику.', '"I love math." — accusative singular ends in -у (replaces -а of nominative).', null, [ACT.vocabularySubjects]),
    createContentItem('физика', 'fizika', 'Physics (f). Greek-origin. Stress on first syllable: фи-. The Russian физика department (физмат) at МГУ is among the world\'s most prestigious.', 'word', 'Физика — мой любимый предмет.', '"Physics is my favorite subject." — dash replaces copula in writing.', null, [ACT.vocabularySubjects]),
    createContentItem('химия', 'khimiya', 'Chemistry (f). Russian distinguishes химия (chemistry as a science) from биохимия (biochemistry). Stress on first syllable. Note Х = /x/ velar fricative.', 'word', 'Урок химии в кабинете 305.', '"Chemistry class is in room 305." — кабинет = "room/study/office".', null, [ACT.vocabularySubjects]),
    createContentItem('биология', 'biologiya', 'Biology (f). Greek-origin. Stress on -ло-. Russian biological tradition is strong (Pavlov, Vavilov, Vernadsky).', 'word', 'Биология — наука о жизни.', '"Biology is the science of life." — наука "science" + о + prep case жизни.', null, [ACT.vocabularySubjects]),
    createContentItem('история', 'istoriya', 'History (f). High-frequency subject and word for "story" too. Stress on -сто-. Russian history (русская история) is heavily taught in Russian schools.', 'word', 'Расскажите об истории.', '"Tell about history." — рассказать + об (variant of о before vowel) + prep case.', null, [ACT.vocabularySubjects]),
    createContentItem('литература', 'literatura', 'Literature (f). Russian literary tradition is core to school curricula — Пушкин, Лермонтов, Гоголь, Толстой, Достоевский, Чехов, Булгаков are all required reading.', 'word', 'Урок литературы.', '"Literature class." — урок + gen of subject.', null, [ACT.vocabularySubjects]),
    createContentItem('программирование', 'programmirovaniye', 'Programming (n). Long compound; stress on -ва-. The МГУ ВМК (Faculty of Computational Mathematics and Cybernetics) is the top programming faculty.', 'word', 'Я учу программирование.', '"I am learning programming." — neuter noun, no gender change to учу.', null, [ACT.vocabularySubjects]),
    createContentItem('философия', 'filosofiya', 'Philosophy (f). Stress on -со-. Russian philosophical tradition includes Solovyov, Berdyaev, Florensky. The философский factor at МГУ is on Воробьёвы горы.', 'word', 'Философия — сложный предмет.', '"Philosophy is a difficult subject." — сложный (m) agrees with предмет.', null, [ACT.vocabularySubjects]),
    createContentItem('лекция', 'lektsiya', 'Lecture (f). Greek/Latin loan. Russian distinguishes лекция (large 45-90 min lecture by full professor) from семинар (small discussion-based class led by аспирант or assistant professor).', 'word', 'Лекция начинается в 8:30.', '"The lecture starts at 8:30." — начинается reflexive verb "begins".', null, [ACT.vocabularySubjects]),
    createContentItem('семинар', 'seminar', 'Seminar (m). Discussion-based class, smaller than a lecture, often led by аспиранты (PhD candidates) at МГУ. Where homework is graded and questions are asked.', 'word', 'У нас сегодня семинар.', '"We have a seminar today." — У нас = "we have"; standard possession structure.', null, [ACT.vocabularySubjects]),
    createContentItem('перемена', 'peremena', 'Break / recess (f). 10-15 minutes between lectures. Also means "change" in other contexts. Stress on -ме-.', 'word', 'На перемене я пью кофе.', '"During the break I drink coffee." — на + prep case перемене.', null, [ACT.vocabularySubjects]),
    createContentItem('расписание', 'raspisaniye', 'Schedule / timetable (n). High-frequency campus word. Stress on -са-.', 'word', 'Где расписание?', '"Where is the schedule?" — Где + nom for location questions.', null, [ACT.vocabularySubjects]),
    createContentItem('экзамен', 'ekzamen', 'Exam (m). Stress on -за-. Russian university exams are often oral (устный) rather than written (письменный) — a major difference from Western systems.', 'word', 'Когда экзамен по физике?', '"When is the physics exam?" — по + dat case for "in [subject]".', null, [ACT.vocabularySubjects]),

    createContentItem('Это (invariable)', 'Eto (invariable)', 'Invariable Это is used to NAME or POINT — "this is X / these are X". Does not agree with anything. Это книга. (This is a book.) / Это студенты. (These are students.) / Это моя сестра. (This is my sister.)', 'sentence', 'Это студент. / Это студентка. / Это студенты.', 'Same Это for all three — never changes for gender or number when used as a "this is" pointer.', [
      { target: 'Это + masc', note: 'Это стол. — pointing to a masculine thing' },
      { target: 'Это + fem', note: 'Это ручка. — pointing to a feminine thing' },
      { target: 'Это + plural', note: 'Это книги. — pointing to plural things' },
    ], [ACT.grammarThisThat]),
    createContentItem('этот / эта / это / эти (declining)', 'etot/eta/eto/eti', 'DECLINING demonstrative used as a modifier of a noun. Agrees in gender and number: этот (m), эта (f), это (n), эти (pl). NOT to be confused with invariable Это.', 'sentence', 'этот стол · эта ручка · это окно · эти книги', 'Note: this is the form used WITHIN a sentence to modify a noun, not at the start to name something.', [
      { target: 'этот + masc sg', note: 'этот учебник — "this textbook"' },
      { target: 'эта + fem sg', note: 'эта тетрадь — "this notebook"' },
      { target: 'это + neut sg', note: 'это окно — "this window"' },
      { target: 'эти + pl', note: 'эти студенты — "these students"' },
    ], [ACT.grammarThisThat]),
    createContentItem('Тот / Та / То / Те', 'Tot/Ta/To/Te', '"That / those" — the distal counterpart to этот/эта/это/эти. Same declension pattern, but means "that one over there" vs the closer "this one here".', 'sentence', 'тот стол · та ручка · то окно · те книги', 'Used to distinguish two things: Этот стол мой, а тот — её. ("This table is mine, that one is hers.")', null, [ACT.grammarThisThat]),

    createContentItem('мой / моя / моё / мои', 'moy/moya/moyo/moi', 'My — agrees in gender and number with the POSSESSED noun (not the owner): мой стол (m), моя ручка (f), моё окно (n), мои книги (pl). Stress shifts: моЯ (fem stressed final), моЁ (neut stressed final).', 'sentence', 'мой брат · моя сестра · моё имя · мои родители', 'Identical pattern for твой / наш / ваш — all three are full-agreement possessives.', null, [ACT.grammarPossessives]),
    createContentItem('наш / наша / наше / наши', 'nash/nasha/nashe/nashi', 'Our — full-agreement possessive. наш дом (m), наша мама (f), наше окно (n), наши друзья (pl).', 'sentence', 'наш университет · наша группа · наше расписание', '"Our university" / "our group" / "our schedule" — high-frequency academic phrases.', null, [ACT.grammarPossessives]),
    createContentItem('его / её / их (invariable)', 'yego/yeyo/ikh (invariable)', 'CRITICAL: его (his/its-m,n), её (her), их (their) are INVARIABLE — they NEVER change for the gender or number of the possessed noun. English speakers wrongly try to "agree" them: ее ручка / её учебник / её книги — same её for all three. Note: его is spelled with г but pronounced "yivo" (one of the famous /v/ pronunciations of г).', 'sentence', 'его дом · его мама · его книги — все три формы — одно и то же слово.', 'Same его for all three — never *ега, *еги, etc.', [
      { target: 'его pronounced "yivo"', note: 'г = /v/ in this word (and a handful of others like сегодня); spelling preserves Old Russian /g/' },
      { target: 'её = her', note: 'invariable; же её брат, её сестра, её родители' },
      { target: 'их = their', note: 'invariable plural; их учитель, их группа, их экзамены' },
    ], [ACT.grammarPossessives]),

    createContentItem('Plurals: -ы / -и', 'Plurals -y / -i', 'Hard-stem masculine and feminine nouns take -ы in nominative plural: студент → студенты, газета → газеты. The 7-letter rule overrides: after к г х ж ш щ ч write -и, not -ы (книга → книги, not *книгы).', 'sentence', 'студент → студенты · книга → книги · ученик → ученики · собака → собаки', 'Two of the four examples take -и due to 7-letter rule (книги, ученики, собаки).', null, [ACT.grammarPlural]),
    createContentItem('Plurals: -а / -я', 'Plurals -a / -ya', 'Neuter nouns take -а / -я in nominative plural: окно → окна, поле → поля. A subset of MASCULINE nouns also take -а — most are high-frequency (дом → дома, город → города, профессор → профессора). This group must be memorized.', 'sentence', 'окно → окна · поле → поля · дом → дома · город → города', 'Stress often shifts on -а plurals: дом sg / домА pl, гОрод sg / городА pl.', null, [ACT.grammarPlural]),
    createContentItem('Irregular plurals', 'Irregular plurals', 'A handful of nouns have irregular plurals: брат → братья (brother → brothers), друг → друзья (friend → friends), стул → стулья (chair → chairs), дерево → деревья (tree → trees). The -ья ending applies; these must be memorized.', 'sentence', 'брат → братья · друг → друзья · стул → стулья · дерево → деревья', 'All four high-frequency; the irregularity is unavoidable in everyday speech.', null, [ACT.grammarPlural]),

    createContentItem('Расписание', 'Raspisaniye — schedule', 'A typical first-year МГУ schedule: Monday history, Tuesday math, Wednesday Russian language, Thursday physics, Friday programming. Read each day + subject aloud.', 'sentence', 'Понедельник — история.\nВторник — математика.\nСреда — русский язык.\nЧетверг — физика.\nПятница — программирование.', 'Each day takes — as a "is" replacement (dash for emphasis). Days of the week are masculine except среда (feminine, "Wednesday").', [
      { target: 'Понедельник Ponedelnik', note: 'Monday (m); literally "after Sunday-day" from old usage' },
      { target: 'Вторник Vtornik', note: 'Tuesday (m); from второй "second"' },
      { target: 'Среда Sreda', note: 'Wednesday (f); literally "middle [of the week]"' },
      { target: 'Четверг Chetverg', note: 'Thursday (m); from четвёртый "fourth"' },
      { target: 'Пятница Pyatnitsa', note: 'Friday (f); from пятый "fifth"' },
    ], [ACT.reading]),
    createContentItem('Вопросы', 'Voprosy', 'Four comprehension questions about the schedule.', 'sentence', 'Q1: Когда математика? Q2: Что в среду? Q3: Какая пятница? Q4: Какой день — четверг?', 'Mix of когда (when), что (what), какая/какой (which / what kind of).', [
      { target: 'A1: Математика во вторник.', note: 'во variant of в before consonant cluster' },
      { target: 'A2: В среду — русский язык.', note: 'accusative form среду for "on Wednesday"' },
    ], [ACT.reading]),

    createContentItem('Команды на уроке', 'Komandy na uroke — classroom commands', 'Eight standard imperatives a Russian professor uses. All in plural -те form (polite to addressee). The bare ты-form drops the -те.', 'sentence', 'Откройте учебник. Закройте окно. Прочитайте текст. Послушайте внимательно. Запишите. Повторите. Сядьте. Встаньте.', 'Drill these until you respond physically without thinking — that\'s the goal of classroom listening.', [
      { target: 'Откройте Otkroyte', note: '"open!" (plural/polite); pf imperative of открыть' },
      { target: 'Закройте Zakroyte', note: '"close!"; pf imperative of закрыть' },
      { target: 'Прочитайте Prochitayte', note: '"read [to the end]!"; pf imperative of прочитать' },
      { target: 'Послушайте Poslushayte', note: '"listen [now]!"; pf imperative of послушать' },
      { target: 'Запишите Zapishite', note: '"write down!"; pf imperative of записать' },
      { target: 'Повторите Povtorite', note: '"repeat!"; pf imperative of повторить' },
      { target: 'Сядьте Syadte', note: '"sit down!"; pf imperative of сесть' },
      { target: 'Встаньте Vstan\'te', note: '"stand up!"; pf imperative of встать' },
    ], [ACT.listening]),
    createContentItem('Перекличка', 'Pereklichka — roll call', 'The standard Russian roll-call exchange: преподаватель reads the surname, student responds "Я здесь" or "Я".', 'conversation', 'Преподаватель: Иванов?\nСтудент: Я здесь.\nПреподаватель: Петрова?\nСтудентка: Я.', 'Я здесь ("I am here") and bare Я are both acceptable; longer "Присутствую" (I am present) sounds formal/military.', null, [ACT.listening]),

    createContentItem('Описание стола', 'Opisaniye stola — desk description', 'A sample 5-sentence description of a study desk using gender-correct nouns, possessive agreement, and Это / этот.', 'sentence', 'На моём столе компьютер, учебник и тетрадь. Это мой ноутбук. Этот учебник — по физике. А эта тетрадь — по математике. Мне нужна новая ручка.', 'Note the prepositional case forms (моём столе) and the dash for predicate clarity.', [
      { target: 'На моём столе', note: 'на + prepositional case; моём is m prep ending agreeing with стол (m prep столе)' },
      { target: 'Это мой ноутбук', note: 'invariable Это for naming + possessive мой agreeing with masculine ноутбук' },
      { target: 'Этот учебник', note: 'declining этот agreeing with masculine учебник; in-sentence modifier' },
    ], [ACT.writing]),

    createContentItem('Имя + Отчество в аудитории', 'Imya + Otchestvo in the classroom', 'Russian students address professors by имя + отчество (e.g., "Иван Петрович"), NEVER by surname alone or by the bare title "Профессор". Surname-only is used in writing (Иванов И. П.) but not in spoken address.', 'sentence', 'Здравствуйте, Иван Петрович! У меня вопрос.', '"Hello, Ivan Petrovich! I have a question." — standard student-to-professor opener.', [
      { target: '+ имя + отчество', note: 'always combined when addressing; never separately in formal speech' },
      { target: 'no "Профессор!"', note: 'unlike English "Professor!" or German "Herr Professor!" — Russian uses имя + отчество' },
    ], [ACT.culture]),
    createContentItem('Структура образования', 'Struktura obrazovaniya', 'Russian higher education flow: 4 years бакалавриат (Bachelor\'s) → 2 years магистратура (Master\'s) → 3-4 years аспирантура (PhD candidacy → defense of диссертация). Used to be one-stage специалитет (5 years); now mostly Bologna-aligned two-stage.', 'sentence', 'Бакалавриат (4 года) → Магистратура (2 года) → Аспирантура (3-4 года).', 'Total: 9-10 years from первый курс to доктор философии (PhD); МГУ and СПбГУ are the prestige destinations at each stage.', null, [ACT.culture]),
    createContentItem('Воробьёвы горы', 'Vorobyovy gory — Sparrow Hills', 'The main building of МГУ stands on Воробьёвы горы (Sparrow Hills), a 220m hill on the southern bank of the Moskva river. The skyscraper (240m, 36 floors, 1953) is one of Stalin\'s Семь сестёр (Seven Sisters) — gothic skyscrapers built across postwar Moscow.', 'sentence', 'Главное здание МГУ — на Воробьёвых горах.', '"The main building of MSU is on Sparrow Hills." — standard description; на + prep case of plural Воробьёвы горы.', null, [ACT.culture]),

    createContentItem('Задание: первая лекция', 'Zadaniye: pervaya lektsiya', 'Roleplay your first lecture at МГУ: greet the аспирант (PhD candidate teaching the seminar) with Здравствуйте + имя + отчество, locate your seat, follow opening commands, ask one syllabus question.', 'conversation', '[Аудитория, МГУ]\nАспирант: Здравствуйте, садитесь.\nВы: [приветствие]\nАспирант: Откройте учебник на странице 5.\nВы: [физическое действие]\nАспирант: Прочитайте первый абзац.\nВы: [читаете вслух]\nВы: [вопрос о расписании]\nАспирант: Хороший вопрос.', 'Six turns combining greeting, command-following, reading aloud, and asking a question — full classroom integration.', null, [ACT.task]),
  ],
};

module.exports = lesson;
