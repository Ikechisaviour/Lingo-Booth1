// Level 1 Unit 2 — Classroom & Campus Life (Bengali / Bangla)
// Functions: classroom objects, asking questions in class, expressing
// understanding/non-understanding, requesting help, basic numbers 1-20,
// and describing campus locations at the University of Dhaka or Jadavpur.

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
  orientation: 'bn-l1u2-orientation',
  pronunciation: 'bn-l1u2-pronunciation',
  vocabularyObjects: 'bn-l1u2-vocab-objects',
  vocabularyPeople: 'bn-l1u2-vocab-people',
  vocabularyActions: 'bn-l1u2-vocab-actions',
  grammarClassifiers: 'bn-l1u2-grammar-classifiers',
  grammarThisThat: 'bn-l1u2-grammar-this-that',
  grammarLocative: 'bn-l1u2-grammar-locative',
  reading: 'bn-l1u2-reading',
  listening: 'bn-l1u2-listening',
  writing: 'bn-l1u2-writing',
  culture: 'bn-l1u2-culture',
  task: 'bn-l1u2-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Name 15+ classroom objects (বই book, কলম pen, খাতা notebook, ব্ল্যাকবোর্ড blackboard, টেবিল table) using correct classifiers.',
      'Ask basic classroom questions: "What is this?" এটা কী? eṭa ki?, "Where is the X?" X কোথায়? kothay?, "May I ask a question?" আমি কি একটা প্রশ্ন করতে পারি? ami ki ekṭa prôshnô kôrte pari?.',
      'Express understanding/non-understanding: বুঝেছি bujhechhi ("I understand"), বুঝিনি bujhini ("I don\'t understand"), আবার বলুন abar bôlun ("Please say it again").',
    ],
    task: 'Picture your first lecture at the Faculty of Arts, University of Dhaka. The professor introduces classroom rules and asks each student to identify themselves and their main subject. You need vocabulary for objects on your desk, common classroom actions, and polite question-asking.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in classroom vocabulary',
    goals: [
      'Apply the inherent ô in পাঠ paṭh ("lesson") — read pa-ṭhô, not "path"; the inherent ô at the final syllable is preserved.',
      'Distinguish the retroflex ট in টেবিল ṭebil ("table") from dental ত in তোমার tomar ("your").',
      'Handle the conjunct ক্ষ in শিক্ষা shikkha ("education") — pronounced "kkha", a single ligature you must recognize as one shape.',
    ],
    task: 'Read each classroom term aloud and identify the inherent vowel placement and conjuncts.',
  },
  {
    id: ACT.vocabularyObjects,
    section: 'Vocabulary I',
    title: 'Classroom objects and supplies',
    goals: [
      'Memorize 12 classroom objects with their classifiers: একটা বই ekṭa bôi ("a book"), একটা কলম ekṭa kôlôm ("a pen"), একটা ব্যাগ ekṭa byag ("a bag").',
      'Distinguish singular vs plural with the classifier -গুলো -gulō or -রা -ra: বইগুলো bôigulō ("the books"), ছাত্ররা chhatrora ("the students").',
    ],
    task: 'Say each object name with the classifier একটা ekṭa, then count three of each using তিনটে tinṭe.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'Classroom people and roles',
    goals: [
      'Name the people: ছাত্র / ছাত্রী (student m/f), শিক্ষক / শিক্ষিকা (teacher m/f), অধ্যাপক (professor), সহপাঠী shôhôpaṭhī ("classmate"), বন্ধু (friend).',
      'Use proper address forms: স্যার sar, ম্যাডাম myaḍam, ভাই bhai, আপা apa, দিদি didi (the kinship-based forms).',
    ],
    task: 'Address each of the five people in your class scenario using the appropriate honorific and title.',
  },
  {
    id: ACT.vocabularyActions,
    section: 'Vocabulary III',
    title: 'Classroom actions and verbs',
    goals: [
      'Use 8 classroom-action verbs: পড়া pôra (read/study), লেখা lekha (write), শোনা shona (listen), বলা bôla (say), দেখা dekha (see), শেখা shekha (learn), বুঝা bujha (understand), মনে রাখা mône rakha (remember).',
      'Recognize the verb endings for the three pronoun-registers (-i, -o, -en) so you can describe what you and your classmates do.',
    ],
    task: 'Conjugate পড়া in the present for আমি / তুমি / আপনি / সে / তিনি, then build one sentence per form.',
  },
  {
    id: ACT.grammarClassifiers,
    section: 'Grammar I',
    title: 'Classifiers: -টা / -টি / -জন / -খানা',
    goals: [
      'Use -টা -ṭa (casual, default) or -টি -ṭi (slightly more formal) for inanimate count nouns: একটা বই ("a book"), তিনটে কলম ("three pens").',
      'Use -জন -jôn for people: একজন ছাত্র ("one student"), দু-জন শিক্ষক ("two teachers").',
      'Use -খানা -khana for flat/wide objects: একখানা চিঠি ekkhana chiṭhi ("a letter"), দুখানা বই dukhana bôi (formal, "two books").',
    ],
    task: 'Count one of each classifier: পাঁচটি কলম, তিনজন ছাত্র, একখানা খাতা — and explain why each takes that classifier.',
  },
  {
    id: ACT.grammarThisThat,
    section: 'Grammar II',
    title: 'এটা / সেটা / ওটা — demonstratives',
    goals: [
      'Use the three-way demonstrative: এটা eṭa ("this" — near speaker), সেটা sheṭa ("that" — near listener or known referent), ওটা oṭa ("that yonder" — far from both).',
      'Combine with classifiers: এই বইটা ei bôiṭa ("this book"), সেই কলমটা shei kôlômṭa ("that pen").',
      'Form questions: এটা কী? ("what is this?"), ওটা কার? ("whose is that yonder?").',
    ],
    task: 'Point to three objects in your room and identify each with এটা / সেটা / ওটা according to distance.',
  },
  {
    id: ACT.grammarLocative,
    section: 'Grammar III',
    title: 'Locative case -তে / -এ / -য়',
    goals: [
      'Form locatives with -তে after vowel-ending nouns (বাড়িতে baṛite "at home"), -এ after consonant-ending (ক্লাসে klashe "in class"), and -য় after vowels in some nouns (ঢাকায় Ḍhakay).',
      'Pair with থাকা thaka ("to stay/be located") and আছ-/আছেন (existential): ক্লাসে কতজন ছাত্র আছে? klashe kôtjôn chhatro achhe? ("How many students are in the class?").',
    ],
    task: 'Form three locative phrases: at the university, in the library, on the table — using -তে / -এ / -য় appropriately.',
  },
  {
    id: ACT.reading,
    section: 'Reading',
    title: 'Read a classroom scene',
    goals: [
      'Read a short classroom-description paragraph aloud with correct inherent vowels, conjuncts, and classifiers.',
      'Answer four comprehension questions about location, quantity, and identification.',
    ],
    task: 'Read the paragraph below aloud and answer the questions in short Bengali sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening',
    title: 'A first lecture',
    goals: [
      'Follow a teacher-student dialogue covering name introduction, subject choice, and a polite "may I ask" exchange.',
      'Reproduce the dialogue with your own information, switching to apni register for the teacher.',
    ],
    task: 'Read the dialogue, then perform it with your own name and a different subject.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Describe your classroom',
    goals: [
      'Write 4-5 sentences describing the objects on your desk, the number of classmates, and one fact about the room — using at least three classifiers.',
    ],
    task: 'Write your description using the template, then read it aloud.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Sir/Madam culture, standing for the teacher',
    goals: [
      'Recognize the formal teacher-student register in BD/WB universities: standing when the teacher enters, addressing as স্যার/ম্যাডাম, never first-name basis.',
      'Compare DU and Jadavpur classroom culture — both formal, both English-Bengali bilingual in practice, but Jadavpur tends toward slightly more Anglicized usage.',
    ],
    task: 'Decide how you would address (1) a male professor in Dhaka, (2) a female lecturer in Kolkata, (3) a TA in either institution.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Introduce yourself in class',
    goals: [
      'Combine name, country, role, subject, and one fact in a fluent 4-sentence self-introduction suitable for a first lecture.',
    ],
    task: 'Roleplay your first-day-of-class introduction with the AI tutor playing the professor.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 2: ক্লাসরুম — Classroom & Campus Life',
  category: 'classroom',
  difficulty: 'beginner',
  targetLang: 'bn',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'naming-objects', label: 'Naming classroom objects', goal: 'Identify objects on your desk using the right classifier (-টা / -টি / -জন / -খানা).' },
    { id: 'asking-question', label: 'Asking a question in class', goal: 'Ask আমি কি একটা প্রশ্ন করতে পারি? politely.' },
    { id: 'expressing-understanding', label: 'Expressing understanding', goal: 'Use বুঝেছি / বুঝিনি / আবার বলুন as appropriate.' },
    { id: 'describing-location', label: 'Describing location', goal: 'Use locative -তে / -এ / -য় with থাকা or আছে to say where things are.' },
  ],
  relatedPools: ['topic-education', 'topic-objects'],
  content: [
    // Orientation
    createContentItem('পাঠের লক্ষ্য', 'paṭher lôkkhô', 'By the end of this lesson, you can navigate a Bengali-language classroom: name objects, count them with classifiers, ask permission, signal understanding/non-understanding, and describe what is where. The classroom is the daily microcosm of student life in BD and WB universities.', 'word', 'বিষয়: ক্লাসরুম শব্দাবলি, শ্রেণিবাচক, এটা/সেটা/ওটা, অধিকরণ', 'These five skill clusters are needed daily in any Bengali-language educational context.', null, [ACT.orientation]),
    createContentItem('বাস্তব পরিস্থিতি', 'bastôb pôristhiti', 'You walk into your first lecture at the Faculty of Arts, University of Dhaka (or Jadavpur University). The professor calls roll, asks each student to introduce themselves, and announces the day\'s topic. You need to follow basic instructions and ask a polite clarifying question.', 'word', 'অধ্যাপক: "আজকের পাঠ — বাংলা সাহিত্যের ইতিহাস। সবাই বই বের করুন।"', 'A typical opener: subject announcement + imperative to take out books; you need to follow the cue and respond appropriately.', [{ target: 'অধ্যাপক ôddhyapôk', note: '"professor"; honorific title' }, { target: 'আজকের ajker', note: 'genitive of আজ aj "today" — "today\'s"' }, { target: 'বের করুন ber kôrun', note: 'imperative honorific: "[please] bring out"' }], [ACT.orientation]),
    createContentItem('শ্রদ্ধার স্তর', 'shrôddhar stôr', 'In class, students use আপনি apni when speaking to the professor and তুমি tumi (or সে in 3rd person) when speaking to classmates of similar age. Cross-language note: even classmates who share a first language with the teacher will switch to apni when speaking to them in front of the class.', 'word', 'TO TEACHER → আপনি / স্যার / ম্যাডাম · TO CLASSMATE → তুমি / [name]', 'Register-switching mid-conversation is the social skill this lesson teaches alongside the vocabulary.', [{ target: 'apni + verb-en', note: 'honorific pronoun pairs with -en verb endings' }, { target: 'tumi + verb-o', note: 'familiar pronoun pairs with -o verb endings' }, { target: 'switching mid-turn', note: 'when addressing teacher then classmate, the pronoun and verb-ending change in the same breath' }], [ACT.orientation]),

    // Pronunciation
    createContentItem('পাঠ', 'paṭh', 'Read pa-ṭhô — three sounds, three syllables, the final inherent ô preserved. The retroflex ṭh distinguishes this from the dental th that English speakers tend to substitute.', 'word', 'আজকের পাঠ ajker paṭh ("today\'s lesson")', 'Common classroom noun; the retroflex aspirate is critical.', [{ target: 'প pô', note: 'labial p + inherent ô' }, { target: 'ঠ ṭhô', note: 'retroflex aspirated stop + inherent ô' }], [ACT.pronunciation]),
    createContentItem('টেবিল', 'ṭebil', 'A retroflex ṭ + e-kar at the start; loanword from English "table". The retroflex contrasts sharply with the dental ত t — a learner who reads it as "tebil" with English /t/ sounds off.', 'word', 'টেবিলের উপর বইটা রাখো। ṭebiler upôr bôiṭa rakho. ("Put the book on the table.")', 'Loanword vocabulary uses the retroflex when adapting English /t/ — a common pattern in BD/WB.', [{ target: 'ট ṭ', note: 'retroflex; tongue curled back' }, { target: 'compare ত t', note: 'dental; tongue at upper teeth — different word' }], [ACT.pronunciation]),
    createContentItem('শিক্ষা', 'shikkha', 'The conjunct ক্ষ kkho is pronounced as a doubled "kkh" — a single ligature, not parsed as k + ṣ. High-frequency in education vocabulary.', 'word', 'শিক্ষা মন্ত্রণালয় shikkha môntronaloy ("Ministry of Education")', 'Appears in many compound nouns related to schooling.', [{ target: 'শি shi', note: 'sibilant + i-kar; "shi"' }, { target: 'ক্ষা kkha', note: 'conjunct ক+ষ + a-kar; modern pronunciation "kkha"' }], [ACT.pronunciation]),
    createContentItem('ব্ল্যাকবোর্ড', 'blyakborḍ', 'English loanword "blackboard". Cluster ব্ল্য is a triple conjunct (ব + ল + য) with the y-phala. Read fast as a single English-style word.', 'word', 'ব্ল্যাকবোর্ডে লিখুন। blyakborḍe likhun. ("Please write on the blackboard.")', 'In WB, often "ব্ল্যাকবোর্ড", BD increasingly "হোয়াইটবোর্ড" hoyaiṭborḍ.', null, [ACT.pronunciation]),
    createContentItem('প্রশ্ন', 'prôshnô', 'The word "question". Conjunct প্র + শ্ন. The র-ফলা attached to প gives "pr-"; then conjunct শ্ন (sh+n) follows. Three syllables: prô-shnô.', 'word', 'প্রশ্ন করতে পারি? prôshnô kôrte pari? ("May I ask a question?")', 'High-frequency classroom phrase; the conjuncts are essential.', [{ target: 'প্র pr-', note: 'প with র-phala subscript = "pr-"' }, { target: 'শ্ন shn', note: 'conjunct শ + ন = "shn"' }], [ACT.pronunciation]),

    // Vocabulary I — Classroom objects
    createContentItem('বই', 'bôi', 'Noun "book". One of the highest-frequency words. The plural is বইগুলো bôigulō ("the books").', 'word', 'আমার একটা বই আছে। amar ekṭa bôi achhe. ("I have a book.")', 'Universal classroom item; first vocabulary item in any educational context.', null, [ACT.vocabularyObjects]),
    createContentItem('কলম', 'kôlôm', 'Noun "pen". Persian loanword (qalam) fully naturalized. Inherent ô preserved word-finally — kô-lôm, three syllables, not "kalm".', 'word', 'একটা কলম দেবেন? ekṭa kôlôm deben? ("Will [you-honorific] give a pen?")', 'High-frequency; the no-schwa-deletion rule is on full display.', null, [ACT.vocabularyObjects]),
    createContentItem('খাতা', 'khata', 'Noun "notebook" — the bound paper book students write in. Persian loanword. Distinguishes from বই (printed book) by use.', 'word', 'খাতায় উত্তর লেখো। khatay uttôr lekho. ("Write the answer in the notebook.")', 'Locative -য় on the vowel-ending stem; everyday classroom imperative.', null, [ACT.vocabularyObjects]),
    createContentItem('পেন্সিল', 'pensil', 'Noun "pencil". English loanword. The conjunct ন্স (n+s) is common in loanwords.', 'word', 'পেন্সিল দিয়ে লিখি। pensil diye likhi. ("I write with a pencil.")', 'Instrumental -দিয়ে -diye marks the means of action.', null, [ACT.vocabularyObjects]),
    createContentItem('ব্যাগ', 'byag', 'Noun "bag". English loanword. The y-phala in ব্য gives the y-glide; pronounced "byag" with a short a.', 'word', 'আমার ব্যাগে অনেক বই আছে। amar byage ônek bôi achhe. ("I have many books in my bag.")', 'Locative -এ on the consonant-ending stem.', null, [ACT.vocabularyObjects]),
    createContentItem('টেবিল', 'ṭebil', 'Noun "table". English loanword with the standard retroflex-ṭ adaptation. The locative is টেবিলে ṭebile.', 'word', 'টেবিলের উপরে বই আছে। ṭebiler upôre bôi achhe. ("There is a book on top of the table.")', 'Postposition উপর "on top" used with the genitive -র.', null, [ACT.vocabularyObjects]),
    createContentItem('চেয়ার', 'cheyar', 'Noun "chair". English loanword. The য়-ending gives a clear final glide.', 'word', 'চেয়ারে বসুন। cheyare bôshun. ("Please sit on the chair.")', 'Imperative honorific বসুন from বসা ("to sit").', null, [ACT.vocabularyObjects]),
    createContentItem('দরজা', 'dôrôja', 'Noun "door". Three syllables — dô-rô-ja — with inherent ô on দ and র preserved. Persian-Arabic origin (darwāza).', 'word', 'দরজা বন্ধ করো। dôrôja bôndhô kôro. ("Close the door.")', 'High-frequency household and classroom noun.', null, [ACT.vocabularyObjects]),
    createContentItem('জানালা', 'janala', 'Noun "window". Persian loanword (janazah/janala). Common in classroom and home contexts.', 'word', 'জানালা খুলে দাও। janala khule dao. ("Please open the window.")', 'Compound verb খুলে দাও "having-opened give" = "open [it] for [us]".', null, [ACT.vocabularyObjects]),
    createContentItem('ব্ল্যাকবোর্ড', 'blyakborḍ', 'Noun "blackboard". English loanword. Distinguishes from হোয়াইটবোর্ড "whiteboard", common in newer BD/WB classrooms.', 'word', 'ব্ল্যাকবোর্ডে শিক্ষক লিখছেন। blyakborḍe shikkhôk likhchhen. ("The teacher is writing on the blackboard.")', 'Present continuous -chhen for honorific subject.', null, [ACT.vocabularyObjects]),
    createContentItem('ঘড়ি', 'ghôri', 'Noun "clock / watch". Aspirated voiced velar ঘ at the start.', 'word', 'ঘড়িতে দশটা বাজে। ghôrite dôshṭa baje. ("On the clock it is ten o\'clock.")', 'Locative -তে; "X-টা bajte" = "X o\'clock has struck".', null, [ACT.vocabularyObjects]),
    createContentItem('ম্যাপ', 'myap', 'Noun "map". English loanword with y-phala. WB also uses মানচিত্র manchitrô (Sanskrit-derived) in formal writing.', 'word', 'দেয়ালে একটা ম্যাপ লাগানো। deyale ekṭa myap laganō. ("A map is hung on the wall.")', 'Past passive লাগানো "hung-up".', null, [ACT.vocabularyObjects]),

    // Vocabulary II — People
    createContentItem('সহপাঠী', 'shôhôpaṭhī', 'Noun "classmate". Compound সহ shôho ("together") + পাঠী paṭhī ("student"). Plural: সহপাঠীরা shôhôpaṭhīra.', 'word', 'আমার দু-জন সহপাঠী আছে। amar du-jôn shôhôpaṭhī achhe. ("I have two classmates.")', 'Classifier -জন for people; numeral দু-জন "two-person".', null, [ACT.vocabularyPeople]),
    createContentItem('শিক্ষিকা', 'shikkhika', 'Noun "female teacher". The -ika suffix marks female; male form is শিক্ষক shikkhôk.', 'word', 'আমাদের শিক্ষিকা খুব ভাল। amader shikkhika khub bhalo. ("Our [female] teacher is very good.")', 'Genitive আমাদের amader "our" — irregular formation from আমরা amra.', null, [ACT.vocabularyPeople]),
    createContentItem('অধ্যাপিকা', 'ôddhyapika', 'Noun "female professor". The female-Sanskrit-suffix -ika.', 'word', 'অধ্যাপিকা চক্রবর্তী আজ অনুপস্থিত। ôddhyapika Chôkrôbôrtī aj ônupôshtitô. ("Professor Chakraborty [female] is absent today.")', 'Common surname (Chakraborty) used in Bengali Hindu academic naming.', null, [ACT.vocabularyPeople]),
    createContentItem('প্রাধ্যক্ষ', 'pradhdhykkhô', 'Noun "principal / head of department". Sanskrit-derived. Conjunct ধ্য + ক্ষ.', 'word', 'প্রাধ্যক্ষের অফিস কোথায়? pradhdhykkher ôphis kothay? ("Where is the principal\'s office?")', 'High-register academic term; common in BD government schools.', null, [ACT.vocabularyPeople]),
    createContentItem('ভাইস-চ্যান্সেলর', 'bhais-chyansôlôr', 'Noun "Vice-Chancellor" (head of a university). English loan, often used as a title in BD/WB universities.', 'word', 'উপাচার্য / ভিসি / ভাইস-চ্যান্সেলর', 'Three terms for the same role: উপাচার্য upacharyô (Sanskrit, formal), ভিসি bhisi (initialism), ভাইস-চ্যান্সেলর (English loan).', null, [ACT.vocabularyPeople]),
    createContentItem('গবেষক', 'gôbeshôk', 'Noun "researcher". Common in academic contexts; appears in M.Phil/Ph.D. environments. Female: গবেষিকা.', 'word', 'তিনি ঢাকা বিশ্ববিদ্যালয়ের গবেষক। tini Ḍhaka bishwobiddyaloyer gôbeshôk. ("He/she-honorific is a researcher at the University of Dhaka.")', 'Tatsama term for academic researcher.', null, [ACT.vocabularyPeople]),
    createContentItem('স্যার', 'sar', 'Vocative "Sir". English loan, universally used to address male teachers in BD/WB universities. Pair with the family name.', 'word', 'স্যার, আমি একটা প্রশ্ন করতে পারি? sar, ami ekṭa prôshnô kôrte pari? ("Sir, may I ask a question?")', 'Standard polite teacher address; works in both BD and WB.', null, [ACT.vocabularyPeople]),
    createContentItem('ম্যাডাম', 'myaḍam', 'Vocative "Madam". English loan, universally used to address female teachers. The य-phala in ম্যা gives the "mya-" glide.', 'word', 'ম্যাডাম, আজকের পাঠ কী? myaḍam, ajker paṭh ki? ("Madam, what is today\'s lesson?")', 'Female-teacher address; alternative ম্যাম myam (more casual).', null, [ACT.vocabularyPeople]),
    createContentItem('আপা', 'apa', 'Vocative "elder sister"; used to address an older female (10+ years older or otherwise senior in some way), even if not actually a relative. BD-typical address form. WB uses দিদি didi.', 'word', 'আপা, দরজাটা একটু খুলে দেবেন? apa, dôrôjaṭa ekṭu khule deben? ("Elder sister, will [you-honorific] open the door a bit?")', 'Standard kinship-based address; signals respect + warmth.', null, [ACT.vocabularyPeople]),
    createContentItem('ভাই', 'bhai', 'Vocative "brother"; used to address an older male (similar function to আপা). Universal across BD and WB. Common with shopkeepers, drivers, and slightly older male peers.', 'word', 'ভাই, কত দাম? bhai, kôtô dam? ("Brother, how much [does it cost]?")', 'Most common address form for an adult male stranger.', null, [ACT.vocabularyPeople]),

    // Vocabulary III — Actions
    createContentItem('পড়া', 'pôra', 'Verb root "to read / to study". Class 1 verb; present-tense paradigm: পড়ি pôri (1st), পড় pôrô (tui), পড়ো pôro (tumi), পড়েন pôren (apni), পড়ে pôre (3rd-ord), পড়েন pôren (3rd-hon).', 'word', 'আমি বাংলা পড়ি। ami bangla pôri. ("I study Bengali.")', 'Top-frequency verb in academic contexts; "to read" and "to study" share one verb in Bengali.', [{ target: '1st: পড়ি pôri', note: 'I read/study' }, { target: 'tumi: পড়ো pôro', note: 'you-familiar read/study' }, { target: 'apni: পড়েন pôren', note: 'you-honorific read/study' }], [ACT.vocabularyActions]),
    createContentItem('লেখা', 'lekha', 'Verb root "to write". Class 1. Paradigm: লিখি likhi (1st), লেখো lekho (tumi), লেখেন lekhen (apni). Note the stem-vowel change from "le-" in the infinitive to "li-" in 1st person.', 'word', 'আমি বাংলায় লিখি। ami banglay likhi. ("I write in Bengali.")', 'Stem vowel alternation; many class-1 verbs show this pattern.', null, [ACT.vocabularyActions]),
    createContentItem('শোনা', 'shona', 'Verb root "to hear / to listen". Class 1. Paradigm: শুনি shuni (1st), শোনো shono (tumi), শোনেন shonen (apni). Stem vowel "sho-" → "shu-".', 'word', 'আমি গান শুনি। ami gan shuni. ("I listen to songs.")', 'Common in classroom (শুনুন "[please] listen") and entertainment contexts (গান শোনা "to listen to music").', null, [ACT.vocabularyActions]),
    createContentItem('বলা', 'bôla', 'Verb root "to say / to speak / to tell". Class 1. Paradigm: বলি bôli (1st), বল bôlô (tui), বলো bôlo (tumi), বলেন bôlen (apni).', 'word', 'আমি বাংলা বলি। ami bangla bôli. ("I speak Bengali.")', 'Top-frequency verb; appears in nearly every conversation.', null, [ACT.vocabularyActions]),
    createContentItem('দেখা', 'dekha', 'Verb root "to see / to look at / to watch". Class 1. Paradigm: দেখি dekhi (1st), দেখো dekho (tumi), দেখেন dekhen (apni). High-frequency.', 'word', 'ব্ল্যাকবোর্ডের দিকে দেখুন। blyakborḍer dike dekhun. ("[Please-honorific] look toward the blackboard.")', 'Postposition দিকে dike ("toward, in the direction of") with genitive.', null, [ACT.vocabularyActions]),
    createContentItem('শেখা', 'shekha', 'Verb root "to learn". Class 1. Distinct from পড়া (study/read) — শেখা emphasizes the acquisition of skill or knowledge. Paradigm: শিখি shikhi, শেখো shekho, শেখেন shekhen.', 'word', 'আমি বাংলা শিখছি। ami bangla shikhchhi. ("I am learning Bengali.")', 'Present continuous -chhi (1st sg); contrasts with simple present pôri ("I study [habitually]").', null, [ACT.vocabularyActions]),
    createContentItem('বুঝা', 'bujha', 'Verb root "to understand". Class 1. Paradigm: বুঝি bujhi (1st), বুঝিস bujhish (tui), বোঝ bojhô (tumi-old)/বুঝো bujho (tumi-modern), বোঝেন bojhen (apni). Stem alternation bu-/bo-.', 'word', 'আমি বুঝিনি। ami bujhini. ("I did not understand.")', 'Past negative -ini (1st sg); high-frequency in classroom when asking for clarification.', null, [ACT.vocabularyActions]),
    createContentItem('মনে রাখা', 'mône rakha', 'Compound verb "to remember" — literally "to keep in mind". মনে mône ("in mind", locative of মন môn) + রাখা rakha ("to keep/place"). Conjugates on রাখা.', 'word', 'এই নিয়মটা মনে রাখুন। ei niyômṭa mône rakhun. ("Please-honorific remember this rule.")', 'Compound-verb pattern; the locative element stays invariant.', null, [ACT.vocabularyActions]),

    // Grammar I — Classifiers
    createContentItem('শ্রেণিবাচক', 'shrenibachôk', 'Bengali requires a CLASSIFIER between a numeral and a noun (or after a count noun) — like Chinese 个 ge or Japanese 個 ko. The default classifier is -টা -ṭa (casual) or -টি -ṭi (slightly more formal). Without a classifier, the phrase sounds wrong.', 'sentence', 'একটা বই ekṭa bôi ("a book") · দুটো কলম duṭo kôlôm ("two pens") · তিনটি ছবি tinṭi chhôbi ("three pictures")', 'The classifier is part of the count phrase; native speakers never count without one.', [{ target: '-টা -ṭa', note: 'default; everyday spoken' }, { target: '-টি -ṭi', note: 'slightly more formal; common in writing' }, { target: 'numeral + classifier', note: 'inseparable unit; "ek + ṭa" = "one (count of)"; cannot say just "ek bôi"' }], [ACT.grammarClassifiers]),
    createContentItem('-জন', '-jôn', 'Classifier for PEOPLE. একজন ekjôn ("one person"), দু-জন du-jôn ("two people"), পাঁচজন pãchjôn ("five people"). Cannot be used for objects.', 'sentence', 'ক্লাসে তিনজন ছাত্র আছে। klashe tinjôn chhatro achhe. ("There are three students in the class.")', 'Person-specific classifier; using -টা for a person sounds dehumanizing.', [{ target: '-জন human-only', note: 'use for any human being regardless of status' }, { target: 'numeral phonotactic', note: 'দু-জন (with hyphen) or দুজন; both acceptable' }], [ACT.grammarClassifiers]),
    createContentItem('-খানা', '-khana', 'Classifier for flat or wide objects: letters, papers, sheets, broad surfaces. Slightly formal/literary. একখানা চিঠি ekkhana chiṭhi ("a letter"), দুখানা কাগজ dukhana kagôj ("two sheets of paper").', 'sentence', 'এই দুখানা বই আপনাকে দিচ্ছি। ei dukhana bôi apnake dicchi. ("I am giving you-honorific these two books.")', 'High-register; conversational speech often substitutes -টা/-টি, but -খানা signals formality and care.', null, [ACT.grammarClassifiers]),
    createContentItem('-গুলো / -গুলি / -রা', '-gulō / -guli / -ra', 'Plural markers. -গুলো / -গুলি for inanimate objects ("the books" বইগুলো). -রা for human beings ("the students" ছাত্ররা). -রা plural cannot be used with explicit number; -গুলো can.', 'sentence', 'বইগুলো টেবিলের উপর। bôigulō ṭebiler upôr. ("The books [are] on the table.") · ছাত্ররা ক্লাসে। chhatrora klashe. ("The students [are] in class.")', 'Plural marking is OPTIONAL in Bengali — a bare noun can be singular OR plural by context.', null, [ACT.grammarClassifiers]),

    // Grammar II — Demonstratives
    createContentItem('এটা / সেটা / ওটা', 'eṭa / sheṭa / oṭa', 'THREE-WAY demonstratives. এটা eṭa = "this" (near speaker). সেটা sheṭa = "that" (near listener OR previously mentioned). ওটা oṭa = "that yonder" (far from both). Bengali has more spatial distinctions than English.', 'sentence', 'এটা আমার বই। eṭa amar bôi. ("This is my book.") · সেটা তোমার? sheṭa tomar? ("Is that yours?") · ওটা কার? oṭa kar? ("Whose is that [yonder]?")', 'The three-way system is one of the first grammar puzzles for English learners.', [{ target: 'এ ei = "this" (near)', note: 'pointing to something you can touch' }, { target: 'সে she = "that" (near listener)', note: 'pointing to something near the addressee' }, { target: 'ও o = "that" (far from both)', note: 'pointing to something distant' }], [ACT.grammarThisThat]),
    createContentItem('এই / সেই / ওই + N', 'ei / shei / oi + N', 'Adjectival demonstratives (attached to nouns): এই বই ei bôi ("this book"), সেই কলম shei kôlôm ("that pen"), ওই দরজা oi dôrôja ("that door yonder"). Used before the noun, not after.', 'sentence', 'এই বইটা পড়ো। ei bôiṭa pôro. ("Read this book.")', 'The attributive forms (ei, shei, oi) are different from the pronominal forms (eṭa, sheṭa, oṭa).', null, [ACT.grammarThisThat]),
    createContentItem('কোন / কোথায় / কেন', 'kon / kothay / ken', 'Wh-words. কোন kon ("which"), কোথায় kothay ("where"), কেন ken ("why"), কী ki ("what"), কে ke ("who"), কীভাবে kibhabe ("how"), কখন kôkhôn ("when"), কতদিন kôtôdin ("how long").', 'sentence', 'কোন বইটা তোমার? kon bôiṭa tomar? ("Which book is yours?") · কোথায় থাক? kothay thakô? ("Where do you live?")', 'Wh-words STAY IN PLACE in Bengali — no fronting like English.', null, [ACT.grammarThisThat]),

    // Grammar III — Locative
    createContentItem('-তে / -এ / -য়', '-te / -e / -y', 'Locative case clitic ("in / at / on"). Allomorph rules: -তে after vowel-final stems (বাড়িতে baṛite), -এ after consonant-final (ক্লাসে klashe), -য় after some a-final stems (ঢাকায় Ḍhakay).', 'sentence', 'আমি ঢাকায় থাকি। ami Ḍhakay thaki. ("I live in Dhaka.") · ছাত্ররা ক্লাসে। chhatrora klashe. ("The students [are] in class.")', 'The locative is one of the most frequent case clitics; pair with থাকা ("to stay/live") or আছ-/আছেন (existential).', [{ target: '-তে after vowel', note: 'বাড়ি baṛi → বাড়িতে baṛite ("at home")' }, { target: '-এ after consonant', note: 'ক্লাস klash → ক্লাসে klashe ("in class")' }, { target: '-য় after a-final', note: 'ঢাকা Ḍhaka → ঢাকায় Ḍhakay ("in Dhaka")' }], [ACT.grammarLocative]),
    createContentItem('উপর / নিচ / ভিতর / বাইরে', 'upôr / nich / bhitôr / baire', 'Postpositions for spatial relations, used WITH a genitive: টেবিলের উপর "on top of the table", বাড়ির নিচে "underneath the house", রুমের ভিতর "inside the room", ঘরের বাইরে "outside the house".', 'sentence', 'বইটা টেবিলের উপর। bôiṭa ṭebiler upôr. ("The book is on the table.")', 'The genitive -er marks the OBJECT of the postposition; high-frequency spatial vocabulary.', [{ target: 'উপর upôr "on top, above"', note: 'paired with -er genitive' }, { target: 'নিচ nich "below, underneath"', note: 'with -er genitive' }, { target: 'ভিতর bhitôr "inside"', note: 'with -er genitive' }, { target: 'বাইরে baire "outside"', note: 'already in locative form -e' }], [ACT.grammarLocative]),
    createContentItem('কোথায় থাকেন?', 'kothay thaken?', 'Standard "Where do you live?" question (honorific). The reply: আমি [place]-তে/-এ/-য় থাকি ami [place]-te/-e/-y thaki. Different from the location-of-being question (আপনি কোথায়? "where are you-honorific?", more transient).', 'sentence', 'A: আপনি কোথায় থাকেন? B: আমি ঢাকার মোহাম্মদপুরে থাকি। ("Where do you-hon live?" / "I live in Mohammadpur, Dhaka.")', 'Common get-to-know-you question; the place phrase uses the locative on the smallest unit (district name) with optional containing genitive (city).', null, [ACT.grammarLocative]),
    createContentItem('থাকা বনাম আছ-', 'thaka vs achh-', 'TWO verbs of being-located: থাকা thaka (habitual residence, "to live, to stay"), আছ-/আছেন (current location, "to be at, to be present"). আমি ঢাকায় থাকি ami Ḍhakay thaki ("I live in Dhaka", habitual) vs আমি এখন ঢাকায় আছি ami ekhôn Ḍhakay achhi ("I am in Dhaka now", current).', 'sentence', 'HABITUAL: আমি ঢাকায় থাকি · CURRENT: আমি এখন ঢাকায় আছি', 'English uses "live" vs "am at" similarly; Bengali splits cleanly.', null, [ACT.grammarLocative]),

    // Reading
    createContentItem('ক্লাসের বর্ণনা', 'klasher bôrnôna', 'Read a four-sentence classroom description aloud, applying classifiers, locatives, and the zero copula correctly.', 'sentence', 'এটা আমাদের ক্লাসরুম। ক্লাসে বিশটি চেয়ার এবং দশটি টেবিল আছে। ব্ল্যাকবোর্ডের সামনে শিক্ষকের টেবিল। আজ ক্লাসে পনেরোজন ছাত্র উপস্থিত।', 'Translation: "This is our classroom. In the class there are 20 chairs and 10 tables. In front of the blackboard [is] the teacher\'s table. Today 15 students are present in the class."', [{ target: 'এটা আমাদের ক্লাসরুম', note: 'zero copula; demonstrative + possessive + noun' }, { target: 'বিশটি চেয়ার এবং দশটি টেবিল', note: '-টি classifier with inanimate count' }, { target: 'সামনে shamne ("in front of")', note: 'postposition with genitive ব্ল্যাকবোর্ডের' }, { target: 'পনেরোজন pônerojôn', note: '-জন classifier with human count (15 people)' }], [ACT.reading]),
    createContentItem('প্রশ্ন ও উত্তর', 'prôshnô ô uttôr', 'Comprehension questions to answer using the vocabulary you just read.', 'sentence', '১ ক্লাসে কতটি চেয়ার? ২ ব্ল্যাকবোর্ডের সামনে কী? ৩ আজ কতজন ছাত্র উপস্থিত? ৪ এটা কাদের ক্লাসরুম?', 'Q-and-A drill; answer in short Bengali sentences.', [{ target: 'A1: ক্লাসে বিশটি চেয়ার আছে।', note: 'classifier-noun + existential আছে' }, { target: 'A2: শিক্ষকের টেবিল।', note: 'genitive + noun' }, { target: 'A3: পনেরোজন ছাত্র উপস্থিত।', note: '-জন classifier + adjective; zero copula' }, { target: 'A4: এটা আমাদের ক্লাসরুম।', note: 'possessive আমাদের + noun' }], [ACT.reading]),

    // Listening
    createContentItem('প্রথম ক্লাস (সংলাপ)', 'prôthôm klash (shônglap)', 'A natural professor-student first-class exchange. Apni register throughout; the teacher invites a student to introduce themselves.', 'conversation', 'অধ্যাপক: আজ আমাদের প্রথম ক্লাস। সবাই একে একে নিজের পরিচয় দিন।\nছাত্র: স্যার, আসসালামু আলাইকুম। আমার নাম তারেক। আমি বাংলাদেশী, চট্টগ্রাম থেকে।\nঅধ্যাপক: ওয়ালাইকুম আসসালাম। আপনি কী বিষয়ে পড়েন?\nছাত্র: স্যার, আমি ইতিহাস বিভাগের ছাত্র।\nঅধ্যাপক: খুব ভাল। স্বাগতম।\nছাত্র: ধন্যবাদ, স্যার।', 'Standard honorific-register class introduction; teacher uses apni even to junior students in BD universities.', [{ target: 'একে একে eke eke', note: '"one by one"; reduplication for distributive meaning' }, { target: 'নিজের পরিচয় দিন nijer pôrichoy din', note: 'imperative honorific "[please] give your own introduction"' }, { target: 'বিষয়ে পড়েন bishôye pôren', note: 'locative -এ + verb; "study in/on a subject"' }, { target: 'ইতিহাস বিভাগ itihash bibhag', note: '"History Department"; bibhag = department/division' }], [ACT.listening]),
    createContentItem('সহপাঠীর সাথে কথা', 'shôhôpaṭhīr shathe kôtha', 'A casual peer-to-peer dialogue between classmates after the first class. Tumi register throughout.', 'conversation', 'A: হ্যালো! তুমি কোথা থেকে?\nB: আমি সিলেট থেকে এসেছি। তুমি?\nA: আমি কুমিল্লা থেকে। কোন বিষয়ে পড়ছ?\nB: বাংলা সাহিত্য। তুমি?\nA: আমি ইংরেজি সাহিত্য পড়ছি। আমরা একই ভবনে ক্লাস করি?\nB: হ্যাঁ, কলা ভবন। পরে দেখা হবে!', 'Casual register switch; peer university students use tumi after one introduction.', [{ target: 'তুমি? at turn-end', note: 'standard return-question "and you?"' }, { target: 'পড়ছ pôrchhô', note: 'present continuous "[you-fam] are studying"' }, { target: 'কলা ভবন kôla bhôbôn', note: '"Arts Building"; the Faculty of Arts building at DU' }, { target: 'পরে দেখা হবে pôre dekha hôbe', note: '"later [we] will meet"; standard casual farewell' }], [ACT.listening]),

    // Writing
    createContentItem('ক্লাসের বর্ণনা লেখা', 'klasher bôrnôna lekha', 'Write 4-5 sentences describing your own classroom using at least three classifiers and one locative phrase.', 'sentence', 'নমুনা: এটা আমার ক্লাসরুম। ক্লাসে পঁচিশটি চেয়ার এবং দশটি টেবিল। আমার ডেস্কের উপর তিনটি বই, একটি কলম, একটি খাতা। আমার সহপাঠী আট-জন।', 'Translation: "This is my classroom. In the class [are] 25 chairs and 10 tables. On my desk [are] 3 books, a pen, a notebook. I have 8 classmates."', null, [ACT.writing]),
    createContentItem('পরিচয় লেখা', 'pôrichoy lekha', 'Write a 3-sentence self-introduction including your department and one classroom fact.', 'sentence', 'নমুনা: আমার নাম জনাথন। আমি আমেরিকান, যুক্তরাষ্ট্রের নিউ ইয়র্ক থেকে এসেছি। আমি ঢাকা বিশ্ববিদ্যালয়ের আন্তর্জাতিক সম্পর্ক বিভাগের ছাত্র।', '"International Relations Department" is আন্তর্জাতিক সম্পর্ক বিভাগ — high-frequency for international students.', null, [ACT.writing]),

    // Culture
    createContentItem('স্যার-ম্যাডাম সংস্কৃতি', 'sar-myaḍam shôngskriti', 'Bengali university culture preserves strong vertical formality. Teachers are addressed as স্যার (male) or ম্যাডাম (female) — never by first name, even by senior students or PhD candidates speaking informally. The English-derived titles are universal in BD/WB universities.', 'sentence', 'TO MALE TEACHER → স্যার + family name · TO FEMALE TEACHER → ম্যাডাম + family name · NEVER first-name', 'Some senior professors invite first-name use among PhD students, but this is rare and always invited, never assumed.', null, [ACT.culture]),
    createContentItem('দাঁড়ানোর রীতি', 'dãrhanor riti', 'In BD and many WB classrooms, students STAND when a senior professor enters the room. The teacher gestures for everyone to sit (বসুন bôshun "[please] sit"). Standing is a cultural marker of respect that English-medium learners may not anticipate.', 'sentence', 'অধ্যাপক ঢুকলে দাঁড়াতে হয়। ôddhyapôk ḍhukle dãrhate hôy. ("When a professor enters, [we] must stand.")', 'The conditional -le is "when/if X happens"; the obligation form -ate hôy is "must X".', null, [ACT.culture]),
    createContentItem('ঢাকা বিশ্ববিদ্যালয় ভবন', 'Ḍhaka Bishwobiddyaloy bhôbôn', 'University of Dhaka campus layout: কলা ভবন kôla bhôbôn (Arts Building, est. 1921, the original DU building), কার্জন হল Karjan Hôl (Curzon Hall, the science building), TSC (Teacher-Student Center). Each is a landmark students reference daily.', 'sentence', 'আমি কলা ভবনে ক্লাস করি। ami kôla bhôbône klash kôri. ("I have class in the Arts Building.")', 'Students often abbreviate building names — TSC, Kôla Bhôbôn, Karjan — in conversation.', [{ target: 'কলা ভবন Arts Building', note: 'main humanities building at DU' }, { target: 'কার্জন হল Curzon Hall', note: 'original science complex, named for Lord Curzon (1904)' }, { target: 'TSC', note: 'student union and meeting hub at DU' }], [ACT.culture]),
    createContentItem('যাদবপুর তুলনা', 'Jadôbpur tulôna', 'For comparison: Jadavpur University (Kolkata, founded 1955) has a different but parallel layout — Arts Building, Science Building, Engineering Faculty. WB students may say "JU" or "যাদবপুর" interchangeably. Jadavpur is more English-medium than DU at the postgraduate level.', 'sentence', 'যাদবপুর বিশ্ববিদ্যালয় (JU) কলকাতার একটি গবেষণাধর্মী বিশ্ববিদ্যালয়। (Jadavpur University is a research-oriented university in Kolkata.)', 'Cross-border academic awareness; both DU and JU are top-tier Bengali-medium universities.', null, [ACT.culture]),

    // Task
    createContentItem('কাজ: ক্লাসে পরিচয়', 'kaj: klashe pôrichoy', 'Roleplay your first-day-of-class introduction with the AI tutor playing the professor. Use the full apni register; include name, country, department, hometown, and one detail (hobby or motivation for studying Bengali).', 'conversation', 'অধ্যাপক: ক্লাসে স্বাগতম। নিজের পরিচয় দিন।\nতুমি: [অভিবাদন + নাম + দেশ]\nঅধ্যাপক: কোন বিভাগের ছাত্র?\nতুমি: [বিভাগ + বিশ্ববিদ্যালয়]\nঅধ্যাপক: বাংলা কেন শিখছেন?\nতুমি: [একটি কারণ]\nঅধ্যাপক: চমৎকার। বসুন।\nতুমি: [ধন্যবাদ]', 'Six-turn structured exchange; the tutor will adapt to your level and prompt clarifications.', [{ target: 'কোন বিভাগের', note: '"of which department" — interrogative with genitive' }, { target: 'কেন শিখছেন', note: '"why [are you] learning-honorific?"; present continuous' }, { target: 'চমৎকার chômôtkar', note: '"excellent"; common positive acknowledgment from teachers' }], [ACT.task]),
    createContentItem('চ্যালেঞ্জ — প্রশ্ন করা', 'chyalenj — prôshnô kôra', 'Stretch goal: in the same scene, ask the professor a polite clarifying question about the syllabus or first reading.', 'conversation', 'তুমি: স্যার, আমি কি একটা প্রশ্ন করতে পারি?\nঅধ্যাপক: অবশ্যই, বলুন।\nতুমি: প্রথম পাঠের জন্য কোন বইটা পড়তে হবে?\nঅধ্যাপক: "বাংলা সাহিত্যের ইতিহাস" — লেখক সুকুমার সেন। গ্রন্থাগারে পাবেন।\nতুমি: ধন্যবাদ, স্যার।', 'Practical academic exchange; the AI tutor names a real textbook (Sukumar Sen, a classic WB scholar — cross-border reference).', [{ target: 'একটা প্রশ্ন করতে পারি?', note: 'standard polite permission-asking; modal -te pari "can/may X"' }, { target: 'পড়তে হবে', note: '"must read"; obligation -te hôbe' }, { target: 'গ্রন্থাগার grônthagar', note: '"library"; tatsama compound (book-place)' }], [ACT.task]),
  ],
};

module.exports = lesson;
