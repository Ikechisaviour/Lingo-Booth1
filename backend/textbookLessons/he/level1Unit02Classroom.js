// Level 1 Unit 2 — Classroom & Studying (Modern Hebrew)
// Functions: identifying classroom objects, asking what something is,
// asking and answering yes/no, asking for help in class, simple location.

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
  orientation: 'he-l1u2-orientation',
  pronunciation: 'he-l1u2-pronunciation',
  vocabClassroom: 'he-l1u2-vocab-classroom',
  vocabSubjects: 'he-l1u2-vocab-subjects',
  grammarDemonstrative: 'he-l1u2-grammar-demonstrative',
  grammarDefiniteHa: 'he-l1u2-grammar-definite-ha',
  grammarQuestionMa: 'he-l1u2-grammar-question-ma',
  reading: 'he-l1u2-reading',
  listening: 'he-l1u2-listening',
  writing: 'he-l1u2-writing',
  culture: 'he-l1u2-culture',
  task: 'he-l1u2-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Name 15 common classroom objects in Hebrew with correct gender.', 'Ask "what is this/that?" and answer with full sentences using the demonstrative זה/זאת.', 'Use the definite article ה- to specify "the book" vs "a book".'], task: 'By the end you should be able to walk into a classroom at Hebrew University, point at things, and ask the AI tutor what each is.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'The /a/-/e/ contrast and definite ה-', goals: ['Distinguish ספר (sefer, book) — segolate mil\'el — from ספרא (sapra, scribe-Aramaic) — different stress and gender.', 'Add the definite ה- (ha-) prefix to nouns and feel how the next consonant often doubles (compensatory in writing only).', 'Apply correct stress on segolate classroom nouns: SE-fer (book), DE-let (door), CHE-der (room).'], task: 'Read each pair aloud with correct stress; identify which are segolate (mil\'el) and which are mil\'ra.' },
  { id: ACT.vocabClassroom, section: 'Vocabulary I', title: 'Classroom objects', goals: ['Memorize 15 classroom nouns with their gender (m/f).', 'Use the right plural ending: -im (m) or -ot (f) — מורים (morim, teachers-m) vs מורות (morot, teachers-f).'], task: 'Say each word out loud with its gender and an example sentence.' },
  { id: ACT.vocabSubjects, section: 'Vocabulary II', title: 'Subjects of study', goals: ['Name 10 academic subjects (math, history, computer science, literature, etc.).', 'Use the construct "I study X" (אני לומד/ת X) with each subject.'], task: 'State which subjects you study using gender-appropriate verb forms.' },
  { id: ACT.grammarDemonstrative, section: 'Grammar I', title: 'Demonstratives זה/זאת/אלה', goals: ['Use זה (ze, this-m) for masculine nouns and זאת (zot, this-f) for feminine nouns.', 'Use the plural אלה (ele, these) for any plural regardless of gender.', 'Form "this is X" sentences: זה ספר (ze sefer, "this is a book").'], task: 'Identify ten classroom objects using ze / zot / ele.' },
  { id: ACT.grammarDefiniteHa, section: 'Grammar II', title: 'Definite article ה-', goals: ['Add the definite article ה- (ha-) directly to a noun to make it definite: ספר (a book) → הספר (ha-sefer, the book).', 'Apply double-definiteness: in a noun + adjective phrase, BOTH must take ה-: הספר הטוב (ha-sefer ha-tov, "the good book").', 'Recognize that the indefinite article does not exist — bare ספר can mean "a book" or just "book".'], task: 'Convert ten indefinite phrases into definite ones with proper double-ha-.' },
  { id: ACT.grammarQuestionMa, section: 'Grammar III', title: 'Asking "what?" with מה', goals: ['Form "what is this?" sentences: מה זה? (ma ze?) and מה זאת? (ma zot?).', 'Keep the question word in initial position; rest of word order unchanged.', 'Answer the same way: זה ספר (ze sefer, "this is a book").'], task: 'Have the AI ask "ma ze?" while pointing at various objects; you answer in full sentences.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'A description of the classroom', goals: ['Read a short paragraph describing a Hebrew University classroom with 8 vocabulary items in context.', 'Answer comprehension questions about what is in the room.'], task: 'Read aloud once, then answer five questions about the contents of the room.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'A class introduction', goals: ['Follow a teacher introducing the classroom and the syllabus.', 'Reproduce the dialogue substituting your own classroom and subject.'], task: 'Listen to the teacher and answer her questions about the contents of the room.' },
  { id: ACT.writing, section: 'Writing', title: 'Describe your classroom', goals: ['Write 5 sentences describing your own classroom or study space.', 'Use at least three demonstratives, three definite articles, and three different nouns with the correct gender.'], task: 'Compose your description; aim for 5 simple sentences.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Israeli academic culture', goals: ['Recognize the informal classroom style — students interrupt, debate, eat snacks.', 'Understand the strong emphasis on STEM at Hebrew University and Technion.', 'Know that Israeli students typically start university in their early 20s after military service.'], task: 'Compare three differences between Israeli university culture and your home country\'s.' },
  { id: ACT.task, section: 'Task', title: 'First class at Hebrew University', goals: ['Combine classroom vocabulary, demonstratives, and definite article in a continuous classroom scene.', 'Ask the AI tutor about three objects you don\'t know the names of.'], task: 'Roleplay your first class with the AI tutor as the professor pointing at things and asking you what they are.' },
];

const lesson = {
  title: 'Level 1 · Unit 2: בכיתה — Classroom and Studying',
  category: 'classroom',
  difficulty: 'beginner',
  targetLang: 'he',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'identifying-objects', label: 'Identifying objects', goal: 'Ask and answer "what is this?" with correct gender forms.' },
    { id: 'asking-for-help', label: 'Asking for help in class', goal: 'Politely ask the teacher to repeat, explain, or translate.' },
    { id: 'describing-room', label: 'Describing your room', goal: 'Use 5+ classroom vocabulary words to describe what is in your study space.' },
  ],
  relatedPools: ['topic-education', 'topic-objects'],
  content: [
    // Orientation
    createContentItem('הכיתה', 'ha-kita', 'The classroom — your first physical setting in Hebrew learning. By the end of this lesson, you can name 15 objects in it, ask "what is this?", and apply the definite article ה-. Kita can mean both "classroom" and "grade level" (e.g., kita gimel = "third grade").', 'word', 'אני בכיתה. — ani ba-kita — "I am in class / in the classroom."', 'The Hebrew University of Jerusalem has classrooms ranging from intimate seminar rooms to Hall A, the historic 1925 lecture hall in the Mount Scopus campus.', null, [ACT.orientation]),
    createContentItem('מטרות', 'matarot', 'Lesson goals: (1) name 15 classroom objects in Hebrew, (2) ask and answer "what is this?", (3) apply the definite article ה- correctly, (4) use demonstratives ze/zot/ele to point at things.', 'word', 'ארבע מטרות לשיעור הזה. — arba matarot la-shiur ha-ze — "Four goals for this lesson."', 'A pattern you\'ll see in every Hebrew classroom: explicit goal-setting at the lesson start.', null, [ACT.orientation]),

    // Pronunciation
    createContentItem('ספר', 'sefer (SE-fer)', 'Segolate noun — mil\'el (penultimate) stress. The pattern CECEC with two segols (e-e) is one of the most common Hebrew noun shapes. Masculine; plural ספרים (sfarim).', 'word', 'ספר טוב. — sefer tov — "a good book."', 'The pattern matches מלך (melech), כלב (kelev), דרך (derech, way) — all mil\'el segolates.', null, [ACT.pronunciation]),
    createContentItem('מורה', 'moreh / morah', 'The /h/ at the end is silent; the gender distinction is purely written: identical in unpointed text (מורה for both). Mil\'ra stress: mo-REH or mo-RAH. Masculine moreh ends -e; feminine morah ends -a (with silent ה).', 'word', 'המורה שלי טוב. — ha-moreh sheli tov — "my teacher (m) is good."', 'When you say morah aloud, the ah-ending is short and the final ה is purely orthographic.', null, [ACT.pronunciation]),
    createContentItem('עפרון', 'iparon (i-pa-RON)', 'Pencil. The initial ע (ayin) is silent in modern Israeli; the word effectively starts with /i/. Mil\'ra stress on the last syllable: i-pa-RON. Masculine; plural עפרונות (efronot, irregular).', 'word', 'יש לי עפרון. — yesh li iparon — "I have a pencil."', 'The plural shifts the initial vowel: iparon → efronot — a common pattern with shifting vowels.', null, [ACT.pronunciation]),

    // Vocabulary I — Classroom objects
    createContentItem('ספר', 'sefer', 'Book — the universal study object. Masculine. Plural: ספרים (sfarim).', 'word', 'הספר על השולחן. — ha-sefer al ha-shulchan — "The book is on the table."', 'The root ס-פ-ר also gives ספריה (sifriya, library), ספרן (sifran, librarian), סופר (sofer, writer/scribe) — the family of "writing/counting".', null, [ACT.vocabClassroom]),
    createContentItem('מחברת', 'mach\'beret', 'Notebook. Feminine (the -et ending). Plural: מחברות (mach\'barot). From the root ח-ב-ר ("to join/connect"), reflecting the bound pages.', 'word', 'אני כותב במחברת. — ani kotev ba-mach\'beret — "I write in the notebook."', 'The same root gives חבר (chaver, friend) and חברה (chevra, society) — all involve binding/joining.', null, [ACT.vocabClassroom]),
    createContentItem('עט', 'et', 'Pen. Masculine. Plural: עטים (etim). Two-letter word with silent initial ע and short /e/.', 'word', 'יש לך עט? — yesh lecha et? — "Do you have a pen?"', 'In Israeli schools, the ballpoint pen is the universal writing tool; pencils are reserved for math and erasable drafts.', null, [ACT.vocabClassroom]),
    createContentItem('עפרון', 'iparon', 'Pencil. Masculine. Plural: עפרונות (efronot, with vowel shift).', 'word', 'תן לי עפרון, בבקשה. — ten li iparon, bevakasha — "Give me a pencil, please."', 'בבקשה (bevakasha) means both "please" and "you\'re welcome" — same word for both functions.', null, [ACT.vocabClassroom]),
    createContentItem('שולחן', 'shulchan', 'Table or desk. Masculine. Plural: שולחנות (shulchanot). From the root ש-ל-ח ("to send/lay out").', 'word', 'הספרים על השולחן. — ha-sfarim al ha-shulchan — "The books are on the table."', 'Same word covers both kitchen table and classroom desk; context disambiguates.', null, [ACT.vocabClassroom]),
    createContentItem('כיסא', 'kise', 'Chair. Masculine. Plural: כיסאות (kis\'ot). One of the rare cases where the singular ends -a but the plural is -ot.', 'word', 'אני יושב על הכיסא. — ani yoshev al ha-kise — "I sit on the chair."', 'The word also means "throne" in biblical/literary contexts; כיסא דוד (kise David, throne of David).', null, [ACT.vocabClassroom]),
    createContentItem('לוח', 'lu\'ach', 'Board (blackboard, whiteboard, bulletin board, calendar). Masculine. Plural: לוחות (luchot). Same word as the Tablets of Stone (Lukhot ha-Brit).', 'word', 'המורה כותב על הלוח. — ha-moreh kotev al ha-lu\'ach — "The teacher writes on the board."', 'Levels of meaning: classroom board, schedule chart, calendar, the biblical tablets — context decides.', null, [ACT.vocabClassroom]),
    createContentItem('דלת', 'delet', 'Door. Feminine — note that despite ending in -t (often a masculine signal), delet is feminine. Plural: דלתות (dlatot).', 'word', 'הדלת פתוחה. — ha-delet ptucha — "The door is open."', 'Dalet is also the name of the fourth Hebrew letter (ד), and the letter shape originally depicted a tent flap.', null, [ACT.vocabClassroom]),
    createContentItem('חלון', 'chalon', 'Window. Masculine. Plural: חלונות (chalonot). The initial chet /kh/ is the back-of-throat fricative.', 'word', 'תפתח את החלון, חם. — tiftach et ha-chalon, cham — "Open the window, it\'s hot."', 'In Hebrew classrooms, open windows are common — Israel\'s climate makes natural ventilation normal.', null, [ACT.vocabClassroom]),
    createContentItem('תיק', 'tik', 'Bag or backpack. Masculine. Plural: תיקים (tikim).', 'word', 'התיק שלי כבד. — ha-tik sheli kaved — "My bag is heavy."', 'A תיק גב (tik gav, "back bag") is a backpack; just תיק covers any school bag.', null, [ACT.vocabClassroom]),
    createContentItem('מחשב', 'mach\'shev', 'Computer. Masculine. Plural: מחשבים (mach\'shevim). From the root ח-ש-ב ("to think/calculate").', 'word', 'יש לי מחשב חדש. — yesh li mach\'shev chadash — "I have a new computer."', 'Israel is a major tech hub; computer literacy is universal in Israeli classrooms by elementary school.', null, [ACT.vocabClassroom]),
    createContentItem('טלפון', 'telefon', 'Phone. Masculine. Borrowed; plural: טלפונים (telefonim). For "mobile phone" specifically: סלולרי (selulari) or just פלאפון (pelefon, a brand-name turned generic).', 'word', 'תכבה את הטלפון בשיעור. — techabe et ha-telefon ba-shiur — "Turn off the phone in class."', 'Pelefon was the first Israeli cellular brand (1986); the name became generic for any mobile, like "Kleenex".', null, [ACT.vocabClassroom]),
    createContentItem('שיעור', 'shiur', 'Lesson, class period. Masculine. Plural: שיעורים (shiurim). Mil\'ra: shi-UR.', 'word', 'השיעור הראשון בתשע. — ha-shiur ha-rishon be-tesha — "The first lesson is at nine."', 'Also used in religious context: שיעור תורה (shiur Torah) is a Torah lesson; the word has deep traditional roots.', null, [ACT.vocabClassroom]),
    createContentItem('שיעורי בית', 'shiurei bayit', 'Homework. Plural construct phrase: literally "lessons of (the) home". Always plural in form.', 'word', 'יש לי הרבה שיעורי בית. — yesh li harbe shiurei bayit — "I have a lot of homework."', 'The construct chain shiurei + bayit shows the noun-of-noun pattern (smichut); a Level 3 topic in full.', null, [ACT.vocabClassroom]),
    createContentItem('מבחן', 'mivchan', 'Exam. Masculine. Plural: מבחנים (mivchanim). From the root ב-ח-ן ("to examine/test").', 'word', 'יש מבחן ביום שני. — yesh mivchan be-yom sheni — "There is an exam on Monday."', 'Same root gives בחינה (bechina, also "exam", slightly more formal/written) and בוחן (bochen, quiz).', null, [ACT.vocabClassroom]),
    createContentItem('שאלה', 'she\'ela', 'Question. Feminine. Plural: שאלות (she\'elot). The -a/-ot pattern is the most common Hebrew feminine.', 'word', 'יש לי שאלה. — yesh li she\'ela — "I have a question."', 'Asking questions is highly valued in Israeli classroom culture — students interrupt teachers freely.', null, [ACT.vocabClassroom]),
    createContentItem('תשובה', 'teshuva', 'Answer, response. Feminine. Plural: תשובות (teshuvot). Same root in religious context means "repentance / return".', 'word', 'אין לי תשובה. — ein li teshuva — "I don\'t have an answer."', 'Teshuva is also the name of the High Holy Day period of repentance; the same root carries both "answer" and "return".', null, [ACT.vocabClassroom]),

    // Vocabulary II — Subjects
    createContentItem('מתמטיקה', 'matematika', 'Math. Feminine. Borrowed; pronounced essentially as in English with mil\'ra stress on -KA.', 'word', 'אני לומד מתמטיקה. — ani lomed matematika — "I study math" (male speaker).', 'In casual speech often shortened: matemat (מתמט). Mathematics is the backbone of Israeli STEM education.', null, [ACT.vocabSubjects]),
    createContentItem('היסטוריה', 'historya', 'History. Feminine. Borrowed; mil\'ra stress.', 'word', 'יש לי שיעור היסטוריה. — yesh li shiur historya — "I have a history class."', 'Hebrew University has a renowned history department, particularly Jewish history and Middle Eastern studies.', null, [ACT.vocabSubjects]),
    createContentItem('ספרות', 'sifrut', 'Literature. Feminine. From the root ס-פ-ר (writing, counting).', 'word', 'אני אוהבת ספרות. — ani ohevet sifrut — "I love literature" (female speaker).', 'Modern Hebrew literature — Bialik, Agnon, Oz, Grossman, Keret — is a distinct literary tradition revived alongside the language.', null, [ACT.vocabSubjects]),
    createContentItem('פיזיקה', 'fizika', 'Physics. Feminine. Borrowed; the פ at the start is /f/ in modern Hebrew.', 'word', 'הפיזיקה קשה. — ha-fizika kasha — "Physics is hard."', 'Israeli physics — particularly nuclear, optics, and condensed matter — has produced multiple Nobel laureates.', null, [ACT.vocabSubjects]),
    createContentItem('כימיה', 'chimya', 'Chemistry. Feminine. The initial כ here is /kh/ (no dagesh).', 'word', 'מעבדת כימיה. — ma\'abadat chimya — "Chemistry lab."', 'Israel\'s chemical industry (Dead Sea Works) employs many graduate chemists; the field is well-funded.', null, [ACT.vocabSubjects]),
    createContentItem('ביולוגיה', 'biologya', 'Biology. Feminine.', 'word', 'אני לומדת ביולוגיה. — ani lomedet biologya — "I study biology" (female speaker).', 'Hebrew University has a famous life sciences institute on the Givat Ram campus.', null, [ACT.vocabSubjects]),
    createContentItem('מדעי המחשב', 'mada\'ei ha-mach\'shev', 'Computer science. Plural construct: "sciences of the computer". The plural form mada\'ei (sciences) is in construct with ha-mach\'shev (the computer).', 'word', 'אני לומד מדעי המחשב. — ani lomed mada\'ei ha-mach\'shev — "I study computer science."', 'Hebrew University and Technion produce some of the world\'s top computer scientists; Israel has more tech startups per capita than any country.', null, [ACT.vocabSubjects]),
    createContentItem('פסיכולוגיה', 'psichologya', 'Psychology. Feminine. The initial פס is /ps/.', 'word', 'הפסיכולוגיה מעניינת. — ha-psichologya me\'anyenet — "Psychology is interesting."', 'Psychology is the most popular humanities major at Israeli universities.', null, [ACT.vocabSubjects]),
    createContentItem('כלכלה', 'kalkala', 'Economics. Feminine. From the root כ-ל-כ-ל ("to provide for / nourish").', 'word', 'יש לי בחינה בכלכלה. — yesh li bechina be-kalkala — "I have an exam in economics."', 'Israel\'s economy and economics tradition is internationally regarded; multiple Nobel laureates in economics have ties to Hebrew University.', null, [ACT.vocabSubjects]),
    createContentItem('משפטים', 'mishpatim', 'Law. Plural in form: literally "laws" or "judgments". Singular משפט (mishpat) = "trial / sentence / law / judgment".', 'word', 'אני לומדת משפטים. — ani lomedet mishpatim — "I study law" (female speaker).', 'Hebrew University Law School is Israel\'s oldest and most prestigious.', null, [ACT.vocabSubjects]),

    // Grammar I — Demonstratives
    createContentItem('זה', 'ze', 'Demonstrative "this" (masculine singular). Used for masculine nouns and as the default for unclear-gender pointing. Also used as a filler/emphatic in casual speech: זה כאן (ze kan, "it\'s here").', 'sentence', 'זה ספר. — ze sefer — "This is a book."\nזה מורה חדש. — ze moreh chadash — "This is a new teacher."', 'In casual speech ze can also mean "that" — Hebrew\'s near/far distinction is mostly carried by context, not separate words.', [
      { target: 'זה + masc noun', note: 'this/that masculine; covers near and far' },
      { target: 'זה in isolation', note: 'can mean "it" — "ze beseder" = "it\'s okay"' },
    ], [ACT.grammarDemonstrative]),
    createContentItem('זאת / זו', 'zot / zo', 'Demonstrative "this" (feminine singular). Two forms exist: זאת (zot) is more standard/literary; זו (zo) is more casual. Both used for feminine nouns.', 'sentence', 'זאת מחברת. — zot mach\'beret — "This is a notebook (f)."\nזו השאלה שלי. — zo ha-she\'ela sheli — "This is my question."', 'Modern Israeli speech leans toward זו for everyday use; זאת appears in writing and formal speech.', null, [ACT.grammarDemonstrative]),
    createContentItem('אלה / אלו', 'ele / elu', 'Demonstrative "these" (plural — both genders). אלה is the standard literary form; אלו is more casual. No separate gender for plural demonstratives.', 'sentence', 'אלה הספרים שלי. — ele ha-sfarim sheli — "These are my books."\nאלה החברים שלי. — ele ha-chaverim sheli — "These are my friends."', 'For "those" specifically, Hebrew uses אלה or sometimes ההם / ההן (ha-hem / ha-hen) for far-deixis emphasis.', null, [ACT.grammarDemonstrative]),

    // Grammar II — Definite ha-
    createContentItem('ה- הידיעה', 'ha- ha-yedi\'a', 'The definite article ה- ("ha-") is the only article in Hebrew — there is no indefinite "a/an". Attach ה- directly to the noun: ספר (a book) → הספר (ha-sefer, the book). No space between ה- and the noun.', 'sentence', 'ספר → הספר (ha-sefer, the book)\nמורה → המורה (ha-moreh, the teacher)\nשולחן → השולחן (ha-shulchan, the table)', 'Historically, the ה- prefix caused doubling (dagesh) of the following consonant — preserved in writing for some letters but lost in speech.', null, [ACT.grammarDefiniteHa]),
    createContentItem('הסכמת מין במין', 'haskamat min be-min', 'Double definiteness: when a definite noun has an adjective, BOTH must take ה-. הספר הטוב = "the good book" (ha-sefer ha-tov). If only one has ha-, the phrase changes meaning: הספר טוב = "the book is good" (statement); only הספר הטוב together = "the good book" (noun phrase).', 'sentence', 'הספר הטוב — ha-sefer ha-tov — "the good book" (noun phrase)\nהספר טוב — ha-sefer tov — "the book is good" (sentence)', 'This pattern is essential: missing the second ha- inadvertently creates a sentence rather than a phrase.', null, [ACT.grammarDefiniteHa]),
    createContentItem('צורות ה-', 'tzurot ha-', 'The ה- (ha-) prefix takes slightly different vowels before guttural letters: before א ה ע ר, the patach can lengthen to qamatz: ה+אם → האם (ha-em, the mother). In modern unpointed text this is invisible — ha- just attaches.', 'sentence', 'הא → האם (ha-em) · הע → העיר (ha-ir, the city)', 'For elementary Hebrew, just write ה- attached to the noun; the niqqud subtleties matter for written-pointed text only.', null, [ACT.grammarDefiniteHa]),

    // Grammar III — Asking ma
    createContentItem('מה זה', 'ma ze', 'The standard "what is this?" question. Two words; first the question word, then the demonstrative. For feminine objects: מה זאת? (ma zot). For plural: מה אלה? (ma ele).', 'sentence', 'מה זה? — זה מחשב.\nמה זאת? — זאת מחברת.\nמה אלה? — אלה ספרים.', 'The answer mirrors the question — same demonstrative + identification noun.', null, [ACT.grammarQuestionMa]),
    createContentItem('מה זה ה...', 'ma ze ha-...', 'A second question form: "what is the X?" — מה זה הדבר הזה? (ma ze ha-davar ha-ze, "what is this thing?"). Useful when you don\'t know the name.', 'sentence', 'מה זה הדבר הזה? — ma ze ha-davar ha-ze — "What is this thing?"', 'דבר (davar) = "thing"; the all-purpose word for any object you can\'t name.', null, [ACT.grammarQuestionMa]),

    // Reading
    createContentItem('הכיתה שלנו', 'ha-kita shelanu', 'A short paragraph describing a Hebrew University classroom. Read aloud once; identify all the classroom vocabulary.', 'sentence', 'זאת הכיתה שלנו. יש בה שולחנות וכיסאות, לוח גדול וחלונות. על השולחן שלי יש ספר, מחברת, ועט. גם המחשב שלי על השולחן. החברים שלי יושבים לידי. המורה כותבת על הלוח.', 'Translation: "This is our classroom. In it there are tables and chairs, a big board and windows. On my desk are a book, a notebook, and a pen. My computer is also on the desk. My friends sit next to me. The teacher (f) is writing on the board."', [
      { target: 'יש בה yesh ba', note: '"there is in it" — feminine possessive; ba = "in her/it" since kita is feminine' },
      { target: 'לידי lidi', note: '"next to me"; ליד (lyad) = "next to" + י (-i) "my"' },
      { target: 'יושבים לידי yoshvim lidi', note: '"sit next to me"; yoshvim is masc plural of "sit"' },
    ], [ACT.reading]),
    createContentItem('שאלות הבנה', 'she\'elot havana', 'Five comprehension questions about the paragraph. Use full sentences.', 'sentence', 'Q1: מה יש בכיתה? Q2: מה על השולחן? Q3: איפה החברים? Q4: מה עושה המורה? Q5: זאת הכיתה שלך?', 'ma yesh ba-kita? ma al ha-shulchan? eifo ha-chaverim? ma osa ha-moreh? zot ha-kita shelcha?', null, [ACT.reading]),

    // Listening
    createContentItem('המורה מציגה את הכיתה', 'ha-moreh metzigah et ha-kita', 'The teacher introduces the classroom on day one. Listen for the demonstratives, definite articles, and gender agreements.', 'conversation', 'מורה: שלום לכולם! זאת הכיתה החדשה שלכם.\nמורה: זה הלוח, וזה השולחן שלי. החלון מאחור, והדלת לפניכם.\nתלמיד: מה זה הדבר הזה?\nמורה: זה מחשב הוראה. אנחנו נשתמש בו השנה.\nתלמידה: ויש לנו ספרים?\nמורה: כן, יש לכם ספרים. הספרים על השולחנות.', 'A natural classroom opener; notice the teacher uses ze/zot/zaat throughout to identify objects, the double-ha- pattern (ha-kita ha-chadasha), and the possessive endings (shelchem, shelchem, etc.).', [
      { target: 'מאחור me-achor', note: '"behind" — me- "from" + achor "back"' },
      { target: 'לפניכם lifneichem', note: '"in front of you (m-pl)"; preposition lifnei + suffix -chem' },
      { target: 'נשתמש nishtamesh', note: 'first-person plural future of השתמש (to use); binyan hitpa\'el' },
    ], [ACT.listening]),

    // Writing
    createContentItem('תרגיל כתיבה', 'targil ktiva', 'Write 5 sentences describing your own classroom or study space. Use at least three demonstratives, three definite articles, and three different gender-marked nouns.', 'sentence', 'דוגמה: זאת הכיתה שלי. יש בה שולחן, כיסא, ולוח. על השולחן יש ספר ומחשב. אני לומדת מדעי המחשב. הכיתה שלי קטנה אבל יפה.', 'Translation: "This is my classroom. In it there is a table, chair, and board. On the table there are a book and computer. I study computer science. My classroom is small but nice."', null, [ACT.writing]),

    // Culture
    createContentItem('תרבות אקדמית ישראלית', 'tarbut akademit yisre\'elit', 'Israeli classroom culture is informal and combative: students interrupt freely, debate teachers, snack during lectures, and call professors by first name. This reflects the broader Israeli style of dugri (directness).', 'sentence', 'בכיתה ישראלית, סטודנט מותר להתווכח עם המרצה. — ba-kita yisre\'elit, student mutar lehit\'vake\'ach im ha-martze — "In an Israeli class, a student is allowed to argue with the lecturer."', 'For students coming from Confucian or hierarchical cultures, this can be a culture shock at first.', null, [ACT.culture]),
    createContentItem('סטם ושירות', 'STEM ve-sherut', 'Two distinguishing features of Israeli higher education: (1) STEM dominance — engineering, CS, and life sciences are oversized vs humanities; (2) post-military age — most students start university around 22, not 18, having served in the IDF first.', 'sentence', 'רוב הסטודנטים מתחילים אוניברסיטה אחרי הצבא. — rov ha-studentim matchilim universita acharei ha-tzava — "Most students start university after the army."', 'This means Israeli undergrads are older and more mature than typical Western 18-year-old freshmen.', null, [ACT.culture]),
    createContentItem('האוניברסיטה העברית', 'ha-universita ha-ivrit', 'Hebrew University of Jerusalem (האוניברסיטה העברית בירושלים) — founded 1925, Israel\'s flagship academic institution. Three main campuses: Mount Scopus (humanities, social sciences), Givat Ram (sciences, math), Ein Karem (medicine).', 'sentence', 'אינשטיין היה אחד המייסדים של האוניברסיטה העברית. — Einstein haya echad ha-meyasdim shel ha-universita ha-ivrit — "Einstein was one of the founders of Hebrew University."', 'Other top Israeli universities: Tel Aviv University, Technion (Haifa, engineering), Weizmann Institute (Rehovot, sciences), Bar-Ilan, Ben-Gurion of the Negev.', null, [ACT.culture]),

    // Task
    createContentItem('משימה: שיעור ראשון', 'mesima: shiur rishon', 'Roleplay your first class at Hebrew University. The AI tutor is the professor pointing at objects and asking what they are. Answer with full ze/zot/ele sentences. Ask back about objects you don\'t know.', 'conversation', '[Classroom, Mount Scopus]\nפרופ׳: שלום לכולם. ברוכים הבאים.\nאתה: שלום.\nפרופ׳: [מצביעה] מה זה?\nאתה: זה לוח.\nפרופ׳: יופי. ומה זאת?\nאתה: זאת... [אתה לא יודע]\nאתה: סליחה, איך אומרים את זה בעברית?\nפרופ׳: זאת מצלמה. עכשיו, ספרים על השולחן, בבקשה.', 'Seven turns; the AI tutor will adapt to your gender and respond naturally to whatever you say.', [
      { target: 'מצביע/ה matzbi\'a', note: '"point at"; verb from root צ-ב-ע ("color, point")' },
      { target: 'איך אומרים?', note: 'eich omrim — "how do you say?"; the all-purpose translation request' },
      { target: 'מצלמה matzlema', note: '"camera"; from root צ-ל-ם ("photograph")' },
    ], [ACT.task]),
  ],
};

module.exports = lesson;
