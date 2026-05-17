// Level 1 Unit 2 — Classroom & School Life (Hindi)
// Functions: identifying classroom objects, talking about your school day,
// asking and answering simple "what is this?" questions, basic counting,
// requesting permission.

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
  orientation: 'hi-l1u2-orientation',
  pronunciation: 'hi-l1u2-pronunciation',
  vocabularyObjects: 'hi-l1u2-vocab-objects',
  vocabularyPeopleSubjects: 'hi-l1u2-vocab-people-subjects',
  grammarGender: 'hi-l1u2-grammar-gender',
  grammarDemonstratives: 'hi-l1u2-grammar-demonstratives',
  grammarNumbers: 'hi-l1u2-grammar-numbers',
  reading: 'hi-l1u2-reading',
  listening: 'hi-l1u2-listening',
  writing: 'hi-l1u2-writing',
  culture: 'hi-l1u2-culture',
  task: 'hi-l1u2-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Name 25 high-frequency classroom objects and recognize their grammatical gender (every Hindi noun is masculine or feminine).',
      'Use यह/वह + है to ask and answer "what is this/that?" questions about objects around you.',
      'Count 1-20 in Hindi and recognize that numbers have their own forms (एक, दो, तीन …) that don\'t follow a simple pattern.',
    ],
    task: 'Imagine your first Hindi class at IIT Delhi — you need to ask your professor what objects are called and request permission for basic classroom actions.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sounds to master',
    goals: [
      'Distinguish दरवाज़ा (door, with nukta ज़) from दरवाजा (without nukta) — the nukta dot signals the Persian/Urdu z-sound vs the native Hindi j-sound.',
      'Pronounce conjuncts in school words: पुस्तक (pustak, with स्त), विद्यार्थी (with द्या), अध्यापक (with ध्या).',
      'Apply schwa deletion to common classroom words: कमरा (kamraa, not kamara), पुस्तक (pustak, not pustaka), बैग (baig, English loan).',
    ],
    task: 'Read each example aloud paying attention to nukta marks, conjuncts, and schwa-deletion patterns.',
  },
  {
    id: ACT.vocabularyObjects,
    section: 'Vocabulary I',
    title: 'Classroom objects',
    goals: [
      'Master the gender of 25 classroom objects — there is no shortcut; the gender must be memorized with each word.',
      'Use the demonstrative + noun + है pattern: यह पुस्तक है ("this is a book"), वह कुर्सी है ("that is a chair").',
    ],
    task: 'Point at 10 objects around you in Devanagari names and say यह/वह + noun + है for each.',
  },
  {
    id: ACT.vocabularyPeopleSubjects,
    section: 'Vocabulary II',
    title: 'School people and subjects',
    goals: [
      'Name the people in a classroom (अध्यापक, प्रिंसिपल, छात्र, साथी) and the subjects (गणित, विज्ञान, हिन्दी, इतिहास).',
      'Use the कौन question word for people ("who is this?") vs क्या for things ("what is this?").',
    ],
    task: 'Introduce three classmates to the AI tutor using the यह + name + है pattern.',
  },
  {
    id: ACT.grammarGender,
    section: 'Grammar I',
    title: 'Noun gender — masculine vs feminine',
    goals: [
      'Recognize that EVERY Hindi noun has gender, even inanimate objects — पुस्तक (book) is feminine, मेज़ (table) is feminine, कमरा (room) is masculine.',
      'Apply gender patterns: nouns ending in -aa (कमरा, बच्चा, पंखा) are usually masculine; nouns ending in -ii (कुर्सी, चाबी, बहन) and -tii (शिक्षक→शिक्षिका) are usually feminine.',
      'Memorize the exceptions: पानी (water, masculine despite -ii ending), आदमी (man, masculine), अकाल (famine, masculine).',
    ],
    task: 'Sort 15 nouns by gender, then explain which follow the -aa/-ii pattern and which are exceptions.',
  },
  {
    id: ACT.grammarDemonstratives,
    section: 'Grammar II',
    title: 'Demonstratives यह / वह / ये / वे',
    goals: [
      'Use यह for "this" (near, singular), वह for "that" (far, singular), ये for "these/this+plural", वे for "those".',
      'Recognize that यह/वह also serve as third-person pronouns ("he/she/it") — context tells you whether they\'re demonstrative or pronominal.',
      'Form basic identification sentences: यह क्या है? ("what is this?") → यह किताब है। ("this is a book").',
    ],
    task: 'Pair each object with the correct demonstrative based on whether it\'s near or far, singular or plural.',
  },
  {
    id: ACT.grammarNumbers,
    section: 'Grammar III',
    title: 'Numbers 1-20',
    goals: [
      'Memorize 1-10 (एक, दो, तीन, चार, पाँच, छह, सात, आठ, नौ, दस) and 11-20 (ग्यारह, बारह, तेरह, चौदह, पंद्रह, सोलह, सत्रह, अठारह, उन्नीस, बीस).',
      'Recognize that Hindi numbers 11-20 are individual words (not "ten-one, ten-two"), unlike many languages.',
      'Use numbers before nouns: तीन किताबें (three books), पाँच छात्र (five students).',
    ],
    task: 'Count from 1 to 20 aloud three times, then describe quantities of 5 different classroom objects.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'A classroom paragraph',
    goals: [
      'Read a description of a Hindi classroom and identify the gender of every noun used.',
      'Answer comprehension questions about counts, locations, and people.',
    ],
    task: 'Read the paragraph below aloud, then answer four comprehension questions.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'First day at the IIT Delhi classroom',
    goals: [
      'Follow a 6-turn dialogue between a new student and a senior at IIT Delhi.',
      'Identify the question patterns: क्या यह … है?, यह क्या है?, यह कौन है?.',
    ],
    task: 'Listen to the dialogue, then roleplay with the AI tutor swapping in your own classroom information.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Describe your classroom',
    goals: [
      'Write 5 sentences describing a classroom: what objects are in it, how many, where they are.',
      'Use at least 3 different demonstratives and 3 number words.',
    ],
    task: 'Write 5 sentences about your own classroom or a sketch of one.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Indian school life',
    goals: [
      'Know that Indian schools commonly start with prayer (प्रार्थना), and most public schools wear uniforms (वर्दी).',
      'Recognize the central role of teachers as गुरु ("revered teacher"), reflected in Teacher\'s Day (शिक्षक दिवस, September 5) honoring Dr. Sarvepalli Radhakrishnan.',
      'Understand that IITs are the apex engineering schools, with their own entrance exam culture (JEE) shaping middle-class Indian education.',
    ],
    task: 'Describe how an Indian classroom looks different from your own school experience.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Your first IIT Delhi classroom',
    goals: [
      'Combine vocabulary, demonstratives, and questions into one continuous scene.',
      'Ask the AI tutor about 5 objects, get 5 answers, and respond appropriately.',
    ],
    task: 'Roleplay walking into your first IIT Delhi classroom and asking what objects are called.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 2: कक्षा में — In the Classroom',
  category: 'classroom',
  difficulty: 'beginner',
  targetLang: 'hi',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'identifying-objects', label: 'Identifying objects', goal: 'Use यह/वह क्या है? to ask what something is, then respond with यह/वह + noun + है.' },
    { id: 'counting-things', label: 'Counting things', goal: 'State quantities using number + noun pattern; recognize gender-based pluralization.' },
    { id: 'asking-permission', label: 'Asking permission', goal: 'Use क्या मैं … सकता/सकती हूँ? to ask basic permission politely.' },
  ],
  relatedPools: ['topic-school', 'topic-objects'],
  content: [
    // Activity 1 — Orientation
    createContentItem('कक्षा का परिचय', 'kakShaa kaa parichay', 'By the end of this unit, you can name 25 classroom objects with their correct grammatical gender, count 1-20, and use यह/वह + है sentences to identify things. Every Hindi noun has gender — this is the lesson where you first confront it.', 'word', 'Functional language: वस्तु पहचानना (identify objects) · गिनना (count) · अनुमति माँगना (ask permission) · विषय बताना (state subjects)', 'Gender is the conceptual hurdle of this unit — there is no shortcut; you memorize as you go.', null, [ACT.orientation]),
    createContentItem('असली परिदृश्य', 'asalii pariadrishya', 'You walk into your first Hindi-medium classroom at IIT Delhi. The professor points to objects and asks "यह क्या है?" Your goal: answer naturally without freezing on gender or numbers.', 'word', 'प्रोफ़ेसर: "यह क्या है?" आप: "यह पुस्तक है।"', 'Standard pattern across every introductory classroom drill — point and identify.', [
      { target: 'यह क्या है?', note: 'literal "this what is?" — Hindi keeps question word in situ' },
      { target: 'यह पुस्तक है', note: '"this is a book"; noun is feminine but the verb is the same है' },
    ], [ACT.orientation]),
    createContentItem('लिंग की चुनौती', 'ling kii chunautii', 'EVERY Hindi noun is masculine OR feminine. There is no neuter. Objects are gendered: पुस्तक (book) is feminine, मेज़ (table) is feminine, कमरा (room) is masculine, पंखा (fan) is masculine. The gender controls adjective endings, possessives, and verb agreement throughout the sentence.', 'word', 'masculine: कमरा, पंखा, बच्चा, पंजा\nfeminine: पुस्तक, मेज़, कुर्सी, चाबी', 'Pattern hint: -aa ending → usually masc; -ii ending → usually fem. But ALWAYS memorize the gender with the noun.', null, [ACT.orientation]),

    // Activity 2 — Pronunciation
    createContentItem('नुक़्ता ज़', 'nuqtaa za', 'The nukta (dot under a letter) marks borrowed Persian/Arabic sounds. ज़ (with nukta) = z; ज (without) = j. दरवाज़ा (darvaazaa, "door") has nukta-ज़; if written without nukta as दरवाजा, it would read "darvaajaa" — both spellings exist, but the nukta version reflects the original Urdu/Persian pronunciation.', 'word', 'दरवाज़ा darvaazaa (door) · सब्ज़ी sabzii (vegetables) · ज़रूरी zaruurii (necessary)', 'Modern colloquial Hindi often drops the nukta in casual writing but pronounces the z anyway — the nukta is a writing convention more than a pronunciation rule.', [
      { target: 'ज (no nukta)', note: 'native Hindi j-sound: जल (jal, water), जाना (jaanaa, to go)' },
      { target: 'ज़ (with nukta)', note: 'borrowed Persian/Arabic z-sound: ज़मीन (zamiin, land), ज़ुबान (zubaan, tongue)' },
    ], [ACT.pronunciation]),
    createContentItem('संयुक्त अक्षर अभ्यास', 'sanyukt akShar abhyaas', 'Classroom words have many conjuncts. पुस्तक has the conjunct स्त (s+t = st); विद्यार्थी has द्या (d+y+aa); अध्यापक has ध्या (dh+y+aa). Reading conjuncts smoothly is essential for natural-sounding Hindi.', 'word', 'पुस्तक pustak (book) · विद्यार्थी vidyaarthii (student) · अध्यापक adhyaapak (teacher)', 'Practice each conjunct slowly first, then at natural speed; the rhythm should flow without splitting the cluster.', null, [ACT.pronunciation]),
    createContentItem('कमरा बनाम कमरे', 'kamraa banaam kamre', 'The masculine -aa ending nouns drop their final "a" in pronunciation (कमरा reads "kamraa", not "kamaraa") AND change to -e in the oblique case (कमरे, "in the room → कमरे में"). This is the most common noun-class behavior in Hindi.', 'word', 'कमरा (kamraa, "room") → कमरे में (kamre meN, "in the room") → कमरे (kamre, "rooms")', 'Hindi masculine -aa nouns have THREE forms: direct singular, oblique singular = plural, oblique plural with -oN ending.', null, [ACT.pronunciation]),

    // Activity 3 — Classroom vocabulary
    createContentItem('कक्षा', 'kakShaa', 'Classroom (feminine). Also means "class" in the sense of school grade — दसवीं कक्षा = "tenth grade/class". Often heard in "कक्षा में जाओ" (kakShaa meN jaao, "go to class").', 'word', 'मैं कक्षा में जा रहा हूँ।', '"I am going to class" — masc speaker; जा रहा हूँ is the present continuous.', null, [ACT.vocabularyObjects]),
    createContentItem('पुस्तक', 'pustak', 'Book (feminine). Sanskritic register; everyday Hindi often uses किताब (kitaab, also feminine, of Urdu/Persian origin). Both are perfectly correct; pustak feels academic.', 'word', 'मेरी पुस्तक मेज़ पर है।', '"My book is on the table" — मेरी (fem possessive) agrees with feminine पुस्तक.', null, [ACT.vocabularyObjects]),
    createContentItem('किताब', 'kitaab', 'Book (feminine) — Urdu/Persianate register, more common in everyday speech than पुस्तक. Used identically in syntax; choose based on context. The plural is किताबें (kitaabeN).', 'word', 'यह हिंदी की किताब है।', '"This is a Hindi book"; की agrees with feminine किताब.', null, [ACT.vocabularyObjects]),
    createContentItem('कलम', 'kalam', 'Pen (feminine, despite ending in a consonant). One of the trickier gender memorizations because the form doesn\'t signal feminine. The plural is कलमें (kalmeN).', 'word', 'क्या आपके पास कलम है?', '"Do you have a pen?" — आपके पास का (with you) idiom for "have".', null, [ACT.vocabularyObjects]),
    createContentItem('पेंसिल', 'pencil', 'Pencil (feminine, borrowed from English). Modern Hindi keeps the gender of the equivalent native word (कलम being feminine). Plural is पेंसिलें.', 'word', 'मेरी पेंसिल टूट गई।', '"My pencil broke" — टूट गई is fem.sing past tense.', null, [ACT.vocabularyObjects]),
    createContentItem('मेज़', 'mez', 'Table (feminine, despite the consonant ending; Persianate origin). Note the nukta on ज़ — pronounced with z, not j. Plural: मेज़ें.', 'word', 'मेज़ पर पुस्तक है।', '"There is a book on the table"; पर = on.', null, [ACT.vocabularyObjects]),
    createContentItem('कुर्सी', 'kursii', 'Chair (feminine). The -ii ending tells you feminine. Plural: कुर्सियाँ (kursiyaaN) with chandrabindu nasalization on the plural ending.', 'word', 'हर छात्र की एक कुर्सी है।', '"Every student has one chair"; हर = every.', null, [ACT.vocabularyObjects]),
    createContentItem('कमरा', 'kamraa', 'Room (masculine). The -aa ending pattern. Oblique singular and direct plural: कमरे (kamre). Oblique plural: कमरों (kamroN). Classroom is कक्षा, but a general room is कमरा.', 'word', 'यह बहुत बड़ा कमरा है।', '"This is a very big room"; बड़ा (big, masc) agrees with कमरा.', null, [ACT.vocabularyObjects]),
    createContentItem('दरवाज़ा', 'darvaazaa', 'Door (masculine). Nukta on ज़ signals the z-sound. The plural is दरवाज़े (darvaaze). दरवाज़ा खोलिए ("please open the door") is one of the most useful classroom phrases.', 'word', 'दरवाज़ा बंद कीजिए।', '"Please close the door" — formal imperative with -इए.', null, [ACT.vocabularyObjects]),
    createContentItem('खिड़की', 'khiRkii', 'Window (feminine). The -ii ending. Note the retroflex ड़ (RDa) — a special letter representing a flap sound, distinct from ड (Da). The plural is खिड़कियाँ.', 'word', 'खिड़की खुली है।', '"The window is open"; खुली is the fem.sing form of "open".', null, [ACT.vocabularyObjects]),
    createContentItem('बोर्ड', 'borD', 'Board (masculine, English loan). The chalkboard or whiteboard in a classroom. Often paired with श्याम-पट (shyaam-paT, Sanskritic "blackboard") in formal contexts. Modern Hindi-medium classrooms typically say बोर्ड.', 'word', 'अध्यापक बोर्ड पर लिख रहे हैं।', '"The teacher is writing on the board" — formal plural verb लिख रहे हैं for respect.', null, [ACT.vocabularyObjects]),
    createContentItem('चॉक', 'chauk', 'Chalk (masculine, English loan). Even in 2026, many Indian classrooms still use chalk — particularly in government schools. The Sanskrit alternative is खड़िया.', 'word', 'चॉक खत्म हो गया।', '"The chalk is finished/over"; हो गया is masc.sing perfective.', null, [ACT.vocabularyObjects]),
    createContentItem('पंखा', 'pankhaa', 'Ceiling fan (masculine). The most essential object in any Indian classroom — temperatures regularly hit 40°C+. The verb पंखा चलना ("the fan runs") is daily idiom.', 'word', 'गर्मी है। पंखा चलाइए।', '"It\'s hot. Please turn on the fan" — चलाइए is formal imperative of "to run".', null, [ACT.vocabularyObjects]),
    createContentItem('बैग', 'baig', 'Bag/backpack (masculine, English loan). Often दफ़्तरीबस्ता (bag for office stuff) in formal/literary register, but बैग is overwhelmingly common.', 'word', 'मेरा बैग कुर्सी पर है।', '"My bag is on the chair" — masc possessive मेरा agrees with masc बैग.', null, [ACT.vocabularyObjects]),
    createContentItem('कापी', 'kaapii', 'Notebook (feminine, English loan from "copy"). The everyday word for a school notebook. The Sanskritic alternative is अभ्यास-पुस्तिका but no one says that in conversation.', 'word', 'अपनी कापी निकालिए।', '"Take out your notebook" — अपनी = "your own"; agrees with feminine कापी.', null, [ACT.vocabularyObjects]),
    createContentItem('बस्ता', 'bastaa', 'School bag (masculine), specifically the cloth/sturdy bag carried to school. Older generation\'s word; younger speakers say बैग.', 'word', 'बच्चे का बस्ता भारी है।', '"The child\'s school bag is heavy" — possessive का agrees with masc बस्ता.', null, [ACT.vocabularyObjects]),
    createContentItem('रबर', 'rabar', 'Eraser (masculine, English loan "rubber"). British English heritage from colonial education. In modern speech एरेज़र is also used.', 'word', 'रबर कहाँ है?', '"Where is the eraser?" — कहाँ in situ.', null, [ACT.vocabularyObjects]),
    createContentItem('मार्कर', 'maarkar', 'Marker (masculine, English loan). Whiteboard marker in modern classrooms.', 'word', 'काला मार्कर दीजिए।', '"Give me the black marker" — काला (black, masc) agrees with masc मार्कर.', null, [ACT.vocabularyObjects]),
    createContentItem('घड़ी', 'ghaRii', 'Clock or watch (feminine). Often घड़ी पर देखना ("look at the watch/clock") meaning "check the time". Plural: घड़ियाँ.', 'word', 'दीवार पर घड़ी लगी है।', '"There is a clock on the wall" — लगी है is feminine perfective.', null, [ACT.vocabularyObjects]),

    // Activity 4 — People & subjects
    createContentItem('अध्यापक', 'adhyaapak', 'Teacher (masculine). Sanskritic register. Feminine form is अध्यापिका. The everyday alternative is टीचर (English loan, used for any gender). In universities, प्रोफ़ेसर is more common.', 'word', 'हमारे अध्यापक बहुत अच्छे हैं।', '"Our teacher is very good" — हमारे (masc.pl agreeing with respect-plural अध्यापक हैं).', null, [ACT.vocabularyPeopleSubjects]),
    createContentItem('शिक्षक', 'shikShak', 'Teacher (masculine, Sanskritic, slightly more formal than अध्यापक). Feminine: शिक्षिका. Used in formal documents and Teacher\'s Day (शिक्षक दिवस) commemorations.', 'word', 'शिक्षक दिवस ५ सितंबर को मनाते हैं।', '"Teacher\'s Day is celebrated on Sept 5" — को marks the date.', null, [ACT.vocabularyPeopleSubjects]),
    createContentItem('छात्र / छात्रा', 'Chhaatra / Chhaatraa', 'Male / female student. Used identically to "student" in English. The pair shows the canonical -a (masc) vs -aa (fem) ending.', 'word', 'सभी छात्र और छात्राएँ कक्षा में हैं।', '"All male and female students are in class" — note the plural endings differ.', null, [ACT.vocabularyPeopleSubjects]),
    createContentItem('प्रिंसिपल', 'prinsipal', 'Principal/headmaster (masc, English loan). The native term is प्रधानाचार्य (pradhaanaachaarya, very formal). In modern Indian schools, प्रिंसिपल is universally understood.', 'word', 'प्रिंसिपल साहब आ रहे हैं।', '"The principal sir is coming" — साहब adds respect; आ रहे हैं is the plural form.', null, [ACT.vocabularyPeopleSubjects]),
    createContentItem('गणित', 'gaNit', 'Mathematics (masculine). The high-status school subject in India — central to IIT entrance prep. Used as a standalone noun: मुझे गणित पसंद है ("I like maths").', 'word', 'मेरा पसंदीदा विषय गणित है।', '"My favorite subject is mathematics".', null, [ACT.vocabularyPeopleSubjects]),
    createContentItem('विज्ञान', 'vigyaan', 'Science (masculine). Specific branches: भौतिकी (physics), रसायन-विज्ञान (chemistry), जीव-विज्ञान (biology). Modern usage often borrows: फ़िज़िक्स, केमिस्ट्री, बायोलॉजी.', 'word', 'विज्ञान बहुत रोचक है।', '"Science is very interesting" — रोचक (interesting) is invariable adjective.', null, [ACT.vocabularyPeopleSubjects]),
    createContentItem('हिन्दी', 'hindii', 'Hindi (the language, feminine). Note the anusvara on the first syllable. As a subject of study: हिन्दी का पाठ ("Hindi lesson") with masculine पाठ taking masculine का.', 'word', 'मैं हिन्दी सीख रही हूँ।', '"I am learning Hindi" — fem speaker (सीख रही हूँ).', null, [ACT.vocabularyPeopleSubjects]),
    createContentItem('अंग्रेज़ी', 'angrezii', 'English language (feminine). With nukta on ज़. Subject taught in most Indian schools alongside Hindi; medium of instruction at IITs.', 'word', 'अंग्रेज़ी कठिन भाषा है।', '"English is a difficult language" — कठिन is invariable.', null, [ACT.vocabularyPeopleSubjects]),
    createContentItem('इतिहास', 'itihaas', 'History (masculine). Important school subject; covers ancient, medieval, and modern Indian history in CBSE curriculum.', 'word', 'भारतीय इतिहास बहुत पुराना है।', '"Indian history is very old" — पुराना (old) agrees masc.sing.', null, [ACT.vocabularyPeopleSubjects]),
    createContentItem('भूगोल', 'bhuugol', 'Geography (masculine). Word formed from भू (earth) + गोल (round). Paired with इतिहास in school timetables.', 'word', 'भूगोल की कक्षा कब है?', '"When is geography class?" — कब = when.', null, [ACT.vocabularyPeopleSubjects]),
    createContentItem('कौन', 'kaun', 'Question word for people: "who?". Same in-situ position as other question words. यह कौन है? = "who is this?". Plural form is ये कौन हैं?.', 'word', 'वह कौन है? — वह मेरा भाई है।', 'Standard "who" exchange.', null, [ACT.vocabularyPeopleSubjects]),

    // Activity 5 — Grammar: Gender
    createContentItem('लिंग — स्त्रीलिंग पुल्लिंग', 'ling — striiling pulling', 'Hindi has two genders: मासकलिन (पुल्लिंग, masc) and feminine (स्त्रीलिंग). Every noun is one or the other. Pattern: nouns ending in -aa (कमरा, बच्चा, पंखा) are usually masculine; nouns ending in -ii (कुर्सी, चाबी, बेटी) and abstract nouns ending in -taa/-aaii are usually feminine.', 'sentence', 'masc -aa: कमरा, बच्चा, लड़का, राजा\nfem -ii: कुर्सी, लड़की, चाबी, सहेली\nfem -taa: सुंदरता, गरीबी', 'When in doubt, listen to native speakers — gender is acquired by exposure.', [
      { target: 'rule: -aa ending → masc', note: '90% accurate; exceptions like माता (mother, fem) exist' },
      { target: 'rule: -ii ending → fem', note: '85% accurate; exceptions like पानी (water, masc) and आदमी (man, masc) exist' },
      { target: 'consonant ending: either', note: 'must be memorized: मेज़ (fem), बैग (masc), घर (masc), किताब (fem)' },
    ], [ACT.grammarGender]),
    createContentItem('अपवाद', 'apavaad', 'Exceptions to the -aa/-ii rule. Memorize these: पानी (water, masc despite -ii), आदमी (man, masc despite -ii), अकाल (famine, masc), विनती (request, fem). Loanwords usually default to their semantic gender (किताब from Arabic كتاب is fem because पुस्तक is fem; मेज़ from Persian is fem).', 'sentence', 'पानी ठंडा है। (water is cold — ठंडा masc agreeing with पानी masc)\nआदमी अच्छा है। (the man is good — अच्छा masc)', 'Whenever you learn a new Hindi noun, log its gender in your memory next to its meaning. There is no shortcut.', null, [ACT.grammarGender]),
    createContentItem('विशेषण मेल', 'visheShaN mel', 'Adjectives ending in -aa change to -ii for feminine and -e for masc.plural/oblique. अच्छा लड़का (good boy) → अच्छी लड़की (good girl) → अच्छे लड़के (good boys). Adjectives ending in consonants are INVARIABLE: सुंदर लड़का / सुंदर लड़की / सुंदर लड़के (beautiful boy/girl/boys).', 'sentence', 'अच्छा कमरा (good masc.sing room) · अच्छी कुर्सी (good fem.sing chair) · अच्छे कमरे (good masc.pl rooms) · अच्छी कुर्सियाँ (good fem.pl chairs)', 'The -aa/-ii/-e triad is THE pattern of Hindi gender/number agreement; memorize it and apply everywhere.', [
      { target: '-aa adjectives', note: 'change ending: -aa (masc.sing) / -ii (fem) / -e (masc.pl/oblique)' },
      { target: '-consonant adjectives', note: 'INVARIABLE: सुंदर, ठीक, साफ़, मुश्किल' },
    ], [ACT.grammarGender]),

    // Activity 6 — Grammar: Demonstratives
    createContentItem('यह / वह', 'yah / vah', 'यह = "this" (proximal, singular); वह = "that" (distal, singular). Both also work as pronouns ("he/she/it"). In colloquial Hindi (especially Delhi), यह often pronounced "ye" and वह as "vo" — but written form stays standard.', 'sentence', 'यह क्या है? (what is this?) · वह कौन है? (who is that?)', 'No gender change on यह/वह itself — gender is shown elsewhere in the sentence (verb or adjective).', null, [ACT.grammarDemonstratives]),
    createContentItem('ये / वे', 'ye / ve', 'ये = "these" (proximal plural); वे = "those" (distal plural). Used for plural noun reference: ये किताबें हैं ("these are books"), वे छात्र हैं ("those are students"). Also: ये/वे + plural verb when referring to a single respected person (honorific plural).', 'sentence', 'ये मेरे दोस्त हैं। (These are my friends.) · वे प्रोफ़ेसर शर्मा हैं। (That is Prof. Sharma — honorific plural for one person.)', 'Same forms cover plural AND honorific singular; context tells you which.', null, [ACT.grammarDemonstratives]),
    createContentItem('यह क्या है?', 'yah kyaa hai?', 'Standard "what is this?" question pattern. यह (this) + क्या (what) + है (is). Word order does NOT change for the question — the question word sits where the unknown information would go in the answer.', 'sentence', 'यह क्या है? — यह कलम है। (What is this? — This is a pen.)', 'Same pattern works with कौन (who), कहाँ (where), कब (when), क्यों (why).', null, [ACT.grammarDemonstratives]),
    createContentItem('कौन सा / कौन सी', 'kaun saa / kaun sii', '"Which" — used to distinguish among options. Pattern: कौन सा/सी + noun. Agrees with the noun\'s gender. कौन सा कमरा? (which room? masc) vs कौन सी किताब? (which book? fem).', 'sentence', 'कौन सा रंग आपको पसंद है?', '"Which color do you like?" — कौन सा agrees with masc रंग.', null, [ACT.grammarDemonstratives]),

    // Activity 7 — Numbers
    createContentItem('एक से दस', 'ek se das', 'Numbers 1-10. Memorize as a chant. Note the spelling of ५ पाँच (paaNch) with chandrabindu, and ६ छह (Chhah) which some pronounce छ: (chhe). Devanagari digits ०१२३४५६७८९ correspond to 0-9.', 'sentence', '१ एक · २ दो · ३ तीन · ४ चार · ५ पाँच · ६ छह · ७ सात · ८ आठ · ९ नौ · १० दस', 'These ten words are the building blocks for all higher numbers.', [
      { target: 'एक ek (1)', note: 'also means "one/a/an" indefinite article' },
      { target: 'दो do (2)', note: 'common in pair phrases: दोस्त = friend, दोनों = both' },
      { target: 'तीन tiin (3)', note: 'used in तिराहा (three-way intersection)' },
      { target: 'पाँच paaNch (5)', note: 'nasalized vowel; same root as पंच (panch, council)' },
      { target: 'दस das (10)', note: 'base for higher numbers (बीस=20, तीस=30, etc.)' },
    ], [ACT.grammarNumbers]),
    createContentItem('ग्यारह से बीस', 'gyaarah se biis', '11-20 — each number has its own form in Hindi, not "ten-one". This is a memorization unit; there\'s no shortcut. Notice the patterns: ग्यारह starts with the conjunct ग्य; उन्नीस = 19 (literally "one-less twenty"); बीस = 20.', 'sentence', '११ ग्यारह · १२ बारह · १३ तेरह · १४ चौदह · १५ पंद्रह · १६ सोलह · १७ सत्रह · १८ अठारह · १९ उन्नीस · २० बीस', 'Hindi numbers 11-99 are notoriously irregular — students often memorize them with a chant in childhood.', null, [ACT.grammarNumbers]),
    createContentItem('संख्या + संज्ञा', 'sankhyaa + sanjnaa', 'Number + noun order: number comes BEFORE the noun. The noun usually takes plural form: तीन किताबें (three books), पाँच छात्र (five students — masc plural unchanged ending). For uncountables, no number is needed: पानी (water), दूध (milk).', 'sentence', 'दो लड़के (two boys) · तीन लड़कियाँ (three girls) · पाँच कुर्सियाँ (five chairs) · दस मिनट (ten minutes — मिनट doesn\'t pluralize)', 'Some time units (मिनट, घंटा) keep singular form even with plurals — vestige of English borrowing.', null, [ACT.grammarNumbers]),

    // Activity 8 — Reading
    createContentItem('कक्षा का विवरण', 'kakShaa kaa vivaraN', 'A description of a classroom at IIT Delhi. Read aloud, identifying each noun\'s gender from context (adjective endings, verb forms). Five sentences, ~20 nouns, gender practice throughout.', 'sentence', 'यह आईआईटी दिल्ली की कक्षा है। यहाँ पच्चीस छात्र और दस छात्राएँ हैं। मेज़ पर एक बोर्ड, चॉक, और किताबें हैं। दीवार पर दो खिड़कियाँ और एक बड़ी घड़ी है। हमारे अध्यापक प्रो. वर्मा हैं। वे बहुत अच्छे शिक्षक हैं।', 'Translation: "This is an IIT Delhi classroom. Here there are 25 male students and 10 female students. On the table there is a board, chalk, and books. On the wall there are two windows and a big clock. Our teacher is Prof. Verma. He is a very good teacher (honorific plural)."', [
      { target: 'पच्चीस pacchiis', note: '25 — covered fully in numbers later; just recognize for now' },
      { target: 'दीवार diivaar', note: 'wall (fem); used with पर (on)' },
      { target: 'हमारे अध्यापक हैं', note: 'plural form for honorific reference to one teacher' },
    ], [ACT.reading]),
    createContentItem('समझ के प्रश्न', 'samajh ke prashna', 'Comprehension questions matching the paragraph. Answer in short sentences using the patterns from this unit.', 'sentence', 'प्र.१: कक्षा में कितने छात्र हैं?\nप्र.२: मेज़ पर क्या-क्या है?\nप्र.३: दीवार पर कितनी खिड़कियाँ हैं?\nप्र.४: अध्यापक कौन हैं?', 'क्या-क्या (reduplicated) means "what all" — expects multiple things in the answer.', [
      { target: 'उ.१: पच्चीस छात्र और दस छात्राएँ हैं।', note: 'count + plural noun' },
      { target: 'उ.२: एक बोर्ड, चॉक, और किताबें हैं।', note: 'list answer' },
      { target: 'उ.३: दो खिड़कियाँ हैं।', note: 'fem.pl खिड़कियाँ' },
      { target: 'उ.४: प्रो. वर्मा हमारे अध्यापक हैं।', note: 'name + honorific structure' },
    ], [ACT.reading]),

    // Activity 9 — Listening
    createContentItem('कक्षा में पहला दिन', 'kakShaa meN pahlaa din', 'A 6-turn dialogue: a new student (नई छात्रा) asks a senior (वरिष्ठ) about classroom objects and people at IIT Delhi.', 'conversation', 'नई: नमस्ते। यह क्या है?\nवरिष्ठ: यह हिंदी की पाठ्यपुस्तक है।\nनई: और वह?\nवरिष्ठ: वह बोर्ड है। अध्यापक उस पर लिखते हैं।\nनई: वह कौन है?\nवरिष्ठ: वह प्रो. शर्मा हैं, हमारे हिंदी के अध्यापक।\nनई: कक्षा में कितने छात्र हैं?\nवरिष्ठ: तीस छात्र हैं।\nनई: धन्यवाद!\nवरिष्ठ: कोई बात नहीं।', 'Natural pace; both speakers use polite forms with each other.', [
      { target: 'पाठ्यपुस्तक paaThyapustak', note: 'textbook (fem); literal "lesson-book"' },
      { target: 'उस पर us par', note: 'oblique form of वह (us) + पर (on) — "on it"' },
      { target: 'तीस tiis', note: 'thirty — preview of higher numbers' },
      { target: 'कोई बात नहीं', note: '"no problem" — standard response to धन्यवाद' },
    ], [ACT.listening]),
    createContentItem('रोलप्ले अभ्यास', 'rolaplay abhyaas', 'Practice exchange: ask the AI tutor about 5 classroom objects, then describe your own classroom in 3 sentences.', 'conversation', 'आप: यह क्या है? · ट्यूटर: यह … है।\nआप: और वह? · ट्यूटर: वह … है।\nदोहराएँ ५ बार। फिर अपनी कक्षा का वर्णन कीजिए।', 'Use यह क्या है? for things, यह कौन है? for people.', null, [ACT.listening]),

    // Activity 10 — Writing
    createContentItem('लेखन ढाँचा', 'lekhan DhaaNchaa', 'A reusable template for describing any space. Fill in: location, what objects are there, how many, who is there.', 'sentence', '[स्थान] में [संख्या] [वस्तु] हैं। [स्थान] पर [संख्या] [वस्तु] है। यहाँ/वहाँ [लोग] हैं। मुझे यह [स्थान] पसंद/नापसंद है।', 'Four-sentence template scales to bedrooms, libraries, parks, anywhere.', null, [ACT.writing]),
    createContentItem('अभ्यास', 'abhyaas', 'Write 5 sentences describing your own classroom or one you remember. Include at least 3 demonstratives (यह/वह/ये/वे) and 3 number-noun combinations.', 'sentence', 'उदाहरण: यह मेरी कक्षा है। यहाँ पंद्रह छात्र हैं। दीवार पर एक बोर्ड और दो खिड़कियाँ हैं। मेरी अध्यापिका मिसेज़ ख़ान हैं। मुझे यह कक्षा बहुत पसंद है।', 'Note feminine अध्यापिका + honorific plural verb हैं.', null, [ACT.writing]),

    // Activity 11 — Culture
    createContentItem('भारतीय विद्यालय जीवन', 'bhaaratiiya vidyaalay jiivan', 'Indian school days typically start with morning prayer (प्रार्थना सभा), include uniform-wearing (वर्दी), have multiple language classes, and end with homework (गृह-कार्य / होमवर्क). Many schools follow a 6-day week with Sunday off.', 'sentence', 'प्रार्थना सभा सुबह ८ बजे होती है।', 'School prayer assembly happens at 8 AM — common across CBSE/ICSE schools.', [
      { target: 'प्रार्थना सभा', note: 'morning prayer assembly — universal in Indian schools' },
      { target: 'वर्दी', note: 'school uniform — standard for nearly all Indian schools' },
      { target: 'गृह-कार्य', note: 'homework — Sanskritic form; everyday word is होमवर्क' },
    ], [ACT.culture]),
    createContentItem('गुरु और शिष्य', 'guru aur shiShya', 'In Indian tradition, the teacher (गुरु) holds revered status — captured in the saying गुरु ब्रह्मा गुरु विष्णु (the guru is creator-god). Modern manifestation: Teacher\'s Day (शिक्षक दिवस) on September 5 honors Dr. Sarvepalli Radhakrishnan, India\'s scholar-president.', 'sentence', 'शिक्षक दिवस ५ सितंबर को मनाते हैं।', 'On Teacher\'s Day, students often switch roles and "teach" the class as a tribute.', null, [ACT.culture]),
    createContentItem('आईआईटी संस्कृति', 'aaii-aaii-Tii sanskriti', 'IITs (Indian Institutes of Technology) are the apex engineering schools, admitting roughly 1% of JEE applicants. IIT Delhi, founded 1961, has its own slang (बीटेक, इंटर्न, क्रश/CRG cgpa, हॉस्टल) and culture (techfests, coding contests, intense academic load).', 'sentence', 'जेईई की तैयारी आईआईटी के लिए ज़रूरी है।', '"JEE prep is necessary for IIT" — JEE (Joint Entrance Exam) is the cultural rite-of-passage for tech aspirants.', null, [ACT.culture]),

    // Activity 12 — Task
    createContentItem('कार्य: पहली कक्षा', 'kaarya: pahlii kakShaa', 'Roleplay: walk into your first Hindi class at IIT Delhi. Ask the senior student about 5 objects, request to sit down, ask the professor\'s name.', 'conversation', '[आईआईटी दिल्ली, कमरा १०१]\nआप: नमस्ते। क्या मैं अंदर आ सकता/सकती हूँ?\nवरिष्ठ: हाँ, आइए। बैठिए।\nआप: यह क्या है? और वह?\nवरिष्ठ: यह बोर्ड है, वह घड़ी है।\nआप: हमारे अध्यापक कौन हैं?\nवरिष्ठ: प्रो. वर्मा हमारे अध्यापक हैं।\nआप: धन्यवाद!\nवरिष्ठ: स्वागत है।', 'क्या मैं … सकता/सकती हूँ? = "may I … ?" — preview of modal verbs from Unit 14.', [
      { target: 'अंदर आ सकता/सकती हूँ?', note: 'gender-aware permission request' },
      { target: 'बैठिए', note: 'formal imperative "please sit"' },
      { target: 'स्वागत है svaagat hai', note: '"welcome / you are welcome"' },
    ], [ACT.task]),
    createContentItem('चुनौती — विवरण', 'chunautii — vivaraN', 'Stretch: describe your seat and surroundings in 4 sentences using location markers (में, पर, के पास).', 'conversation', 'मैं कक्षा में पीछे बैठा/बैठी हूँ। मेरे पास खिड़की है। खिड़की के पास एक कुर्सी है। मेज़ पर मेरी किताब है।', 'के पास = "near"; में = "in"; पर = "on" — three core spatial postpositions previewed for Unit 3.', null, [ACT.task]),
  ],
};

module.exports = lesson;
