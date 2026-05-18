// Level 1 Unit 2 — Classroom Life (Tamil)
// Functions: classroom objects, asking & answering "what is this/that?", numbers
// 1-20, basic location with iru, classroom interactions at Anna University.

const createContentItem = (target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds,
  targetText: target, romanization, nativeText: note, pronunciation: romanization,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ta-l1u2-orientation',
  pronunciation: 'ta-l1u2-pronunciation',
  vocabularyObjects: 'ta-l1u2-vocab-objects',
  vocabularyNumbers: 'ta-l1u2-vocab-numbers',
  grammarDemonstratives: 'ta-l1u2-grammar-demonstratives',
  grammarLocation: 'ta-l1u2-grammar-location',
  grammarPlural: 'ta-l1u2-grammar-plural',
  reading: 'ta-l1u2-reading',
  listening: 'ta-l1u2-listening',
  writing: 'ta-l1u2-writing',
  culture: 'ta-l1u2-culture',
  task: 'ta-l1u2-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: [
      'Identify and name 15+ classroom objects at Anna University (puttakam, eḻutukōl, mēcai, naṟkāli, paḷḷi, vakuppu).',
      'Ask "What is this/that?" using இது என்ன? itu eṉṉa? and அது என்ன? atu eṉṉa? and answer with the noun + zero copula.',
      'Count 1-20 in Tamil with the spoken vs literary number system.',
    ],
    task: 'Picture your first lecture hall at Anna University — by the end of this lesson you should be able to name every object you see and ask about anything you don\'t recognize.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in classroom Tamil',
    goals: [
      'Distinguish proximal இ (this) from distal அ (that) — the same vowel contrast appears in ivar/avar, iṅkē/aṅkē, ippōtu/appōtu.',
      'Pronounce புத்தகம் puttakam with geminate -tt- (voiceless) and final -m, NOT -ng.',
      'Apply the no-voicing-distinction rule in வகுப்பு vakuppu — geminate pp stays voiceless.',
    ],
    task: 'Drill the proximal/distal pairs and the geminate clusters in classroom words until both feel natural.' },
  { id: ACT.vocabularyObjects, section: 'Vocabulary I', title: 'Classroom objects',
    goals: [
      'Memorize 15+ classroom objects with their gender-agnostic noun forms (Tamil inanimate nouns have NO gender).',
      'Use the inherent-neuter "atu" with each one in identity sentences.',
    ],
    task: 'Walk through a virtual Anna University classroom and name each object as you encounter it.' },
  { id: ACT.vocabularyNumbers, section: 'Vocabulary II', title: 'Numbers 1-20',
    goals: [
      'Count 1-10 (oṉṟu, iraṇṭu, mūṉṟu, nāṉku, aintu, āṟu, ēḻu, eṭṭu, oṉpatu, pattu) and 11-20 (patiṉoṉṟu through irupatu).',
      'Notice the "compound" pattern: 11 = pati+oṉṟu ("ten-one"), 12 = pati+iraṇṭu, etc.',
    ],
    task: 'Count aloud 1-20 with correct gemination and retroflex; especially watch onpatu (9) and irupatu (20).' },
  { id: ACT.grammarDemonstratives, section: 'Grammar I', title: 'Proximal vs distal demonstratives',
    goals: [
      'Use இ- (proximal "this") vs அ- (distal "that") across the deictic series: itu/atu (it), ivar/avar (he/she-hon), iṅkē/aṅkē (here/there), ippōtu/appōtu (now/then).',
      'Answer the question இது என்ன? itu eṉṉa? with itu + noun + zero copula.',
    ],
    task: 'Pick three objects near you and three across the room; describe each with the right deictic.' },
  { id: ACT.grammarLocation, section: 'Grammar II', title: 'Locative case + iru',
    goals: [
      'Form the locative case with -இல் (-il) for inanimate locations: vakupp + -il = vakuppil ("in the class").',
      'Combine locative with iru ("to exist/be located") + agreement: புத்தகம் மேசையில் இருக்கிறது. puttakam mēcaiyil irukkiṟatu. "The book is on the table."',
    ],
    task: 'Describe where three classroom objects are located using locative + irukkiṟatu.' },
  { id: ACT.grammarPlural, section: 'Grammar III', title: 'Plural suffix -kaḷ',
    goals: [
      'Form plurals with -கள் (-kaḷ) suffix: maṇavaṉ → maṇavarkaḷ; puttakam → puttakaṅkaḷ; nāy → nāykaḷ.',
      'Note: tamil DOESN\'T systematically pluralize inanimate nouns when number is implied; "many books" can be "neraya puttakam" or "puttakaṅkaḷ".',
    ],
    task: 'Pluralize five nouns from this lesson with -kaḷ; identify which sound natural without the marker.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'A classroom description',
    goals: ['Read a short description of an Anna University classroom aloud.', 'Answer comprehension questions about what is where.'],
    task: 'Read the paragraph and answer four questions.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'A first lecture',
    goals: ['Follow a 4-turn classroom exchange between professor and students.', 'Reproduce with your own substitutions.'],
    task: 'Read along, then perform with your information.' },
  { id: ACT.writing, section: 'Writing', title: 'Describe your classroom',
    goals: ['Write 3-5 sentences describing a classroom in Tamil script.', 'Use locative case at least twice.'],
    task: 'Write the description; read aloud.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Tamil education and Anna University',
    goals: [
      'Understand the importance of education in Tamil culture — competitive entrance exams, strong STEM emphasis, role of IIT Madras and Anna University.',
      'Know classroom etiquette: standing when professor enters, addressing as ஐயா/அம்மா, no first-name basis.',
    ],
    task: 'Compare Tamil classroom etiquette with your home country\'s.' },
  { id: ACT.task, section: 'Task', title: 'Your first class',
    goals: ['Combine vocabulary, demonstratives, locative, and plural in one continuous classroom scene.'],
    task: 'Roleplay with the AI tutor as a peer asking about classroom objects and where they are.' },
];

const lesson = {
  title: 'Level 1 · Unit 2: வகுப்பறை — Classroom Life',
  category: 'classroom', difficulty: 'beginner', targetLang: 'ta', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic', activities,
  expressionPractice: [
    { id: 'identifying-objects', label: 'Identifying objects', goal: 'Ask "what is this/that?" with itu/atu eṉṉa? and answer with noun + zero copula.' },
    { id: 'describing-location', label: 'Describing location', goal: 'Use locative -il + irukkiṟatu to state where things are.' },
    { id: 'counting', label: 'Counting 1-20', goal: 'Count classroom items using Tamil numerals with correct phonology.' },
    { id: 'classroom-interaction', label: 'Classroom interaction', goal: 'Ask and answer basic classroom questions in polite register.' },
  ],
  relatedPools: ['topic-education', 'topic-objects'],
  content: [
    // Orientation
    createContentItem('வகுப்பறை அறிமுகம்', 'vakuppaṟai aṟimukam', 'By the end of this lesson you can describe everything in a classroom at Anna University — name the objects, count them, say where each is, and ask about anything unfamiliar.', 'word', 'Functional language: புத்தகம் (book), மேசை (table), வகுப்பு (class), மாணவர்கள் (students), ஆசிரியர் (teacher), எழுதுகோல் (pen)', 'These items appear in every lesson going forward — solid recognition here unlocks the rest of the textbook.', null, [ACT.orientation]),
    createContentItem('சூழல்', 'cūḻal', 'Your first lecture hall at Anna University. The professor walks in with a stack of books; you need to follow the description as they point to each one and call its name.', 'word', 'பேராசிரியர்: "இது என்ன? இது புத்தகம்."', 'Standard classroom Q&A pattern: deictic + என்ன? followed by deictic + noun.', null, [ACT.orientation]),

    // Pronunciation
    createContentItem('இது vs அது', 'itu vs atu', 'Proximal vs distal demonstrative pronouns. Same final syllable (-tu), different initial vowel: short i (this, near speaker) vs short a (that, away from speaker). The i-/a- contrast runs through the whole deictic system.', 'word', 'இது புத்தகம். அது மேசை. itu puttakam. atu mēcai. "This is a book. That is a table."', 'Mastering this single vowel contrast unlocks all the location, time, and reference words in Tamil.', [{ target: 'itu', note: 'proximal: in your hand, on your desk, close' }, { target: 'atu', note: 'distal: across the room, in the corner, far' }], [ACT.pronunciation]),
    createContentItem('புத்தகம்', 'puttakam', 'Geminate -tt- (voiceless because doubled) + final -m. Most common Tamil classroom word. Tamil-script learners often write -தக- but the geminate -த்தக- is mandatory.', 'word', 'என் புத்தகம் மேசையில். eṉ puttakam mēcaiyil. "My book is on the table."', 'Sloppy gemination (puttakam → putakam) sounds non-native immediately.', null, [ACT.pronunciation]),
    createContentItem('வகுப்பு', 'vakuppu', 'Geminate -pp- (voiceless). Note also that medial single -k- in vakuppu is voiced /vagu/ — same Tamil voicing rule.', 'word', 'என் வகுப்பு எங்கே? eṉ vakuppu eṅkē? "Where is my class?"', 'vakuppu = class/lesson; vakuppaṟai = classroom (vakuppu + aṟai "room").', null, [ACT.pronunciation]),

    // Vocabulary I: Objects
    createContentItem('புத்தகம்', 'puttakam', 'Book. The single most common classroom object. Plural: புத்தகங்கள் puttakaṅkaḷ. Note geminate tt.', 'word', 'இது தமிழ் புத்தகம். itu tamiḻ puttakam. "This is a Tamil book."', 'When specifying the subject of the book, place the topic noun before புத்தகம் (Tamil book, English book).', null, [ACT.vocabularyObjects]),
    createContentItem('எழுதுகோல்', 'eḻutukōl', 'Pen. A Centhamizh compound from எழுது eḻutu ("write") + கோல் kōl ("stick"). In colloquial Tamil, "பேனா" pēṉā is more common (English loan).', 'word', 'எனக்கு ஒரு எழுதுகோல் கொடுங்கள். eṉakku oru eḻutukōl koṭuṅkaḷ. "Please give me a pen."', 'In schools and formal contexts: eḻutukōl. In daily speech: pēṉā.', null, [ACT.vocabularyObjects]),
    createContentItem('பென்சில்', 'peṉcil', 'Pencil — direct loan from English, common in casual Tamil. Formal/Centhamizh form is முற்கோல் muṟkōl (rarely used).', 'word', 'என் பென்சில் எங்கே? eṉ peṉcil eṅkē? "Where is my pencil?"', 'Loanword pronunciation: pen-cil with neutralized vowels.', null, [ACT.vocabularyObjects]),
    createContentItem('மேசை', 'mēcai', 'Table / desk. The diphthong -ai- at the end is the marker of many feminine-ish-seeming nouns (but inanimate; no real gender in Tamil for objects).', 'word', 'புத்தகம் மேசையில் இருக்கிறது. puttakam mēcaiyil irukkiṟatu. "The book is on the table."', 'Locative form takes -y-il-: mēcai → mēcaiyil (insert -y- to break vowel hiatus).', null, [ACT.vocabularyObjects]),
    createContentItem('நாற்காலி', 'nāṟkāli', 'Chair. Literally "four-legs" (nāṟ "four" + kāli "leg"). Note alveolar trill ṟ.', 'word', 'நீங்கள் நாற்காலியில் உட்காருங்கள். nīṅkaḷ nāṟkāliyil uṭkāruṅkaḷ. "Please sit on the chair."', 'uṭkāru = sit; -uṅkaḷ is the polite imperative ending.', null, [ACT.vocabularyObjects]),
    createContentItem('கரும்பலகை', 'karumpalakai', 'Blackboard. Centhamizh compound: karum "black" + palakai "board". In modern classrooms, often replaced by வெள்ளைப் பலகை veḷḷaip palakai "whiteboard" or projector.', 'word', 'ஆசிரியர் கரும்பலகையில் எழுதுகிறார். āciriyar karumpalakaiyil eḻutukiṟār. "The teacher writes on the blackboard."', 'Standard classroom action verb: eḻutu "write" with honorific agreement -ār.', null, [ACT.vocabularyObjects]),
    createContentItem('சுண்ணாம்பு', 'cuṇṇāmpu', 'Chalk. Retroflex ண in middle. The geminate-then-m structure is typical of compound nouns.', 'word', 'என்னிடம் சுண்ணாம்பு இல்லை. eṉṉiṭam cuṇṇāmpu illai. "I don\'t have chalk."', 'eṉṉiṭam = "with me / at my place" (locative of "I"); idiomatic for possession.', null, [ACT.vocabularyObjects]),
    createContentItem('குறிப்பேடு', 'kuṟippēṭu', 'Notebook. Centhamizh: kuṟippu "note" + ēṭu "page/leaf". In casual speech often replaced by நோட்டு nōṭṭu (English loan).', 'word', 'எனக்கு புதிய குறிப்பேடு வேண்டும். eṉakku putiya kuṟippēṭu vēṇṭum. "I need a new notebook."', 'vēṇṭum = "(it is) wanted/needed"; this idiomatic form expresses need.', null, [ACT.vocabularyObjects]),
    createContentItem('பை', 'pai', 'Bag. Short and high-frequency. School bag = paḷḷi pai or just pai. In Anna University context, பை is often a laptop bag.', 'word', 'என் பை நாற்காலியில் இருக்கிறது.', '"My bag is on the chair." Simple location pattern.', null, [ACT.vocabularyObjects]),
    createContentItem('கணினி', 'kaṇiṉi', 'Computer. Centhamizh coinage from கணி "calculate" + -ni. In daily Tanglish, often just "computer" or "laptop".', 'word', 'அவர் கணினியில் வேலை செய்கிறார். avar kaṇiṉiyil vēlai ceykiṟār. "He/she works on the computer."', 'kaṇiṉi + locative + verb: standard Tamil description of computer use.', null, [ACT.vocabularyObjects]),
    createContentItem('கதவு', 'katavu', 'Door. Common in directional instructions: "shut the door" = கதவை மூடு katavai mūṭu.', 'word', 'கதவை மூடுங்கள். katavai mūṭuṅkaḷ. "Please close the door."', 'katav-ai = accusative direct-object (suffix -ai); polite imperative mūṭuṅkaḷ.', null, [ACT.vocabularyObjects]),
    createContentItem('சன்னல்', 'caṉṉal', 'Window. Note geminate ṉṉ.', 'word', 'சன்னல் திற. caṉṉal tiṟa. "Open the window." (intimate)', 'tiṟa = "open!" (intimate imperative). Polite would be tiṟaṅkaḷ.', null, [ACT.vocabularyObjects]),
    createContentItem('விளக்கு', 'viḷakku', 'Light / lamp. Retroflex ḷ + geminate kk. In a classroom, also "lamp" or "ceiling light".', 'word', 'விளக்கு ஏற்று. viḷakku ēṟṟu. "Turn on the light."', 'ēṟṟu = "make to ascend / light up" (causative).', null, [ACT.vocabularyObjects]),
    createContentItem('கடிகாரம்', 'kaṭikāram', 'Clock / watch. Compound: kaṭi + kāram. Standard word in offices, classrooms, train stations.', 'word', 'கடிகாரத்தில் மணி என்ன? kaṭikārattil maṇi eṉṉa? "What time is it on the clock?"', 'maṇi = "hour, bell"; eṉṉa = "what".', null, [ACT.vocabularyObjects]),
    createContentItem('வரைபடம்', 'varaipaṭam', 'Map. Centhamizh: varai "draw/line" + paṭam "picture". Common in geography/social studies classrooms.', 'word', 'இது இந்தியாவின் வரைபடம். itu intiyāviṉ varaipaṭam. "This is a map of India."', 'intiyāviṉ = "of India" (genitive -iṉ).', null, [ACT.vocabularyObjects]),
    createContentItem('ஆசிரியர் மேசை', 'āciriyar mēcai', 'Teacher\'s desk. Compound noun: noun + noun (no possessive particle needed in this register).', 'word', 'ஆசிரியர் மேசையில் புத்தகங்கள் உள்ளன.', '"On the teacher\'s desk there are books." uḷḷaṉa = "(they) exist" (plural neuter).', null, [ACT.vocabularyObjects]),

    // Vocabulary II: Numbers 1-20
    createContentItem('ஒன்று', 'oṉṟu', 'One. The base form; in counting "oṉṟu", in adjective use "oru" (e.g., "oru puttakam" = "one book / a book").', 'word', 'எனக்கு ஒரு புத்தகம் கொடுங்கள். eṉakku oru puttakam koṭuṅkaḷ. "Give me one book / a book."', 'Two forms: oṉṟu (counting "one"), oru (adjectival "one/a").', null, [ACT.vocabularyNumbers]),
    createContentItem('இரண்டு', 'iraṇṭu', 'Two. Retroflex ṇ + ṭ cluster. Adjectival form: "iraṇṭu" stays the same.', 'word', 'இரண்டு மாணவர்கள் வந்தார்கள்.', '"Two students came" — note plural -kaḷ on noun and -ārkaḷ on verb.', null, [ACT.vocabularyNumbers]),
    createContentItem('மூன்று', 'mūṉṟu', 'Three. Long ū + alveolar ṟ.', 'word', 'மூன்று வகுப்புகள் உள்ளன. mūṉṟu vakuppukaḷ uḷḷaṉa.', '"There are three classes."', null, [ACT.vocabularyNumbers]),
    createContentItem('நான்கு', 'nāṉku', 'Four. Long ā + alveolar ṉ + k. The famous "nāl" form appears in compounds: nāṟ-kāli = "four-legged" = chair.', 'word', 'நான்கு நாற்காலிகள் இருக்கின்றன.', '"There are four chairs."', null, [ACT.vocabularyNumbers]),
    createContentItem('ஐந்து', 'aintu', 'Five. The ai diphthong + ntu.', 'word', 'எங்களுக்கு ஐந்து நிமிடம் கொடுங்கள்.', '"Give us five minutes."', null, [ACT.vocabularyNumbers]),
    createContentItem('ஆறு', 'āṟu', 'Six. Long ā + alveolar trill ṟ. Same word means "river" in classical Tamil — context disambiguates.', 'word', 'அண்ணா பல்கலைக்கழகத்தில் ஆறு பல்கலைக்கோட்டங்கள் உள்ளன.', '"At Anna University there are six campuses."', null, [ACT.vocabularyNumbers]),
    createContentItem('ஏழு', 'ēḻu', 'Seven. Long ē + the famous ழ. A great word for ழ-practice.', 'word', 'வாரத்தில் ஏழு நாட்கள்.', '"There are seven days in a week."', null, [ACT.vocabularyNumbers]),
    createContentItem('எட்டு', 'eṭṭu', 'Eight. Short e + geminate retroflex ṭṭ. Important to keep the gemination clear.', 'word', 'காலை எட்டு மணிக்கு வகுப்பு.', '"Class is at 8 AM."', null, [ACT.vocabularyNumbers]),
    createContentItem('ஒன்பது', 'oṉpatu', 'Nine. Alveolar ṉ + p.', 'word', 'ஒன்பது மாதம். oṉpatu mātam.', '"Nine months."', null, [ACT.vocabularyNumbers]),
    createContentItem('பத்து', 'pattu', 'Ten. Geminate tt.', 'word', 'பத்து வயது. pattu vayatu.', '"Ten years (old)."', null, [ACT.vocabularyNumbers]),
    createContentItem('பதினொன்று - பத்தொன்பது', 'patiṉoṉṟu - pattoṉpatu', 'Eleven through nineteen formed by combining patti- ("ten-") + the unit. 11 = patiṉoṉṟu ("ten-one"), 12 = paṉṉiraṇṭu, 13 = patimūṉṟu, 14 = patiṉāṉku, 15 = patiṉaintu, 16 = patiṉāṟu, 17 = patiṉēḻu, 18 = patiṉeṭṭu, 19 = pattoṉpatu.', 'word', 'பதினைந்து மாணவர்கள். patiṉaintu māṇavarkaḷ.', '"Fifteen students."', [{ target: '11 patiṉoṉṟu', note: 'pati + oṉṟu' }, { target: '15 patiṉaintu', note: 'pati + aintu' }, { target: '19 pattoṉpatu', note: 'pattu + oṉpatu (note vowel coalescence)' }], [ACT.vocabularyNumbers]),
    createContentItem('இருபது', 'irupatu', 'Twenty. Then 30=muppatu, 40=nāṟpatu, 50=aimpatu, 60=aṟupatu, 70=eḻupatu, 80=eṇpatu, 90=toṇṇūṟu, 100=nūṟu.', 'word', 'இருபது பேர் வருகிறார்கள்.', '"Twenty people are coming."', [{ target: '20 irupatu', note: 'iru + patu' }, { target: '30 muppatu', note: 'mu + patu' }, { target: '50 aimpatu', note: 'aim + patu' }, { target: '100 nūṟu', note: 'distinct word, not compound' }], [ACT.vocabularyNumbers]),

    // Grammar I: Demonstratives
    createContentItem('இ- vs அ- deictic system', 'i- vs a- deictic', 'Tamil deictics are systematically organized by an initial vowel: i- (proximal "this/here") vs a- (distal "that/there") vs e- (interrogative "which/where"). The pattern runs across pronouns, place words, and time words.', 'sentence', 'itu/atu (it this/that) · ivar/avar (he/she this/that hon) · iṅkē/aṅkē (here/there) · ippōtu/appōtu (now/then) · ettaṉai/attaṉai (how many/that many)', 'Once you learn one deictic, you know the others by swapping the initial vowel.', [{ target: 'i- proximal', note: 'this / here / now / proximate' }, { target: 'a- distal', note: 'that / there / then / distal' }, { target: 'e- interrogative', note: 'which / where / when / how' }], [ACT.grammarDemonstratives]),
    createContentItem('இது என்ன?', 'itu eṉṉa?', 'The question "what is this?" Pattern: deictic + en-na? Answer: deictic + noun + (zero copula).', 'sentence', 'Q: இது என்ன? "What is this?"\nA: இது புத்தகம். "(This) is a book."', 'Standard classroom Q&A pattern; verbless answer is natural.', null, [ACT.grammarDemonstratives]),
    createContentItem('இவர் / அவர்', 'proximal honor', 'For people, both proximal (ivar) and distal (avar) take the honorific in formal contexts. Use ivaṉ/ivaḷ for peer-near, ivar for honor-near.', 'sentence', 'இவர் என் ஆசிரியர். ivar eṉ āciriyar. "This (honored person) is my teacher."', 'Switching from avar (distal) to ivar (proximal) signals you are referring to someone right there with you.', null, [ACT.grammarDemonstratives]),

    // Grammar II: Locative + iru
    createContentItem('-இல் locative case', '-il locative', 'The locative case suffix -இல் (-il) attaches to a noun to mean "in / on / at". This is one of the EIGHT Tamil cases (more on the full system later). Vowel-final nouns insert -y-: mēcai → mēcaiyil.', 'sentence', 'வகுப்பில் (in class) · சென்னையில் (in Chennai) · மேசையில் (on the table) · புத்தகத்தில் (in the book)', 'Eight cases total: nom, acc -ai, dat -ukku, sociative -uṭaṉ, instrumental -āl, locative -il, ablative -iliruntu, genitive -iṉ.', [{ target: 'consonant-final + il', note: 'pal + il = pallil' }, { target: 'vowel-final + y + il', note: 'mēcai + y + il = mēcaiyil' }, { target: 'm-final → t + il', note: 'puttakam → puttakatt + il = puttakattil' }], [ACT.grammarLocation]),
    createContentItem('இரு + agreement', 'iru + agreement', 'The verb இரு iru ("to exist, be located") takes full agreement: -kkiṟēṉ (I), -kkiṟāy (you-int), -kkiṟār (he/she-hon), -kkiṟāḷ (she-peer), -kkiṟāṉ (he-peer), -kkiṟatu (it). For inanimate plural, -kkiṉṟaṉa.', 'sentence', 'புத்தகம் மேசையில் இருக்கிறது. (singular neuter)\nபுத்தகங்கள் மேசையில் இருக்கின்றன. (plural neuter)', 'Tamil verb agreement is THE feature — every tense, every verb, agreement is mandatory.', null, [ACT.grammarLocation]),
    createContentItem('உள் / உள்ளன', 'uḷ / uḷḷaṉa', 'Alternative existential verb form. உள் uḷ + agreement: உள்ளது uḷḷatu (it exists/is), உள்ளன uḷḷaṉa (they exist, neuter plural). More formal/literary than iru forms; standard in printed text.', 'sentence', 'வகுப்பில் இருபது மாணவர்கள் உள்ளனர். (formal) / இருக்கிறார்கள். (spoken)', 'In Centhamizh: uḷḷaṉar (plural human). In Koduntamizh: irukkiṟārkaḷ.', null, [ACT.grammarLocation]),

    // Grammar III: Plural
    createContentItem('-கள் plural', '-kaḷ plural', 'The plural marker -கள் (-kaḷ) is added to noun stems. Final consonant clusters often require euphonic adjustments: puttakam → puttakaṅkaḷ (final m → ṅ + kaḷ).', 'sentence', 'மாணவன் → மாணவர்கள் · புத்தகம் → புத்தகங்கள் · நாய் → நாய்கள் · குழந்தை → குழந்தைகள்', 'Note the retroflex ḷ at the end of -kaḷ; getting this wrong is a giveaway.', [{ target: 'human plural', note: 'māṇavaṉ → māṇavarkaḷ (uses respectful form base)' }, { target: 'inanimate', note: 'puttakam → puttakaṅkaḷ (m → ṅ before k)' }, { target: 'animal', note: 'nāy → nāykaḷ (no change to stem)' }], [ACT.grammarPlural]),
    createContentItem('விருப்பப் பன்மை', 'optional plural', 'For INANIMATE nouns with explicit quantifiers, the plural marker is often DROPPED: "irupatu māṇavarkaḷ" (twenty students — marker used) but "irupatu puttakam" (twenty books — marker dropped, redundant with number). Tamil is more compact than English here.', 'sentence', 'நிறைய புத்தகம். niṟaiya puttakam. "Lots of book(s)."\nநிறைய புத்தகங்கள். niṟaiya puttakaṅkaḷ. "Many books."', 'Both acceptable; the marker-less form is more common in everyday speech.', null, [ACT.grammarPlural]),

    // Reading
    createContentItem('வகுப்பறை விளக்கம்', 'vakuppaṟai viḷakkam', 'A classroom description in Tamil. Read aloud applying every rule from this lesson: deictics, locative, plural, agreement.', 'sentence', 'இது அண்ணா பல்கலைக்கழகத்தின் வகுப்பறை. வகுப்பில் இருபது மாணவர்கள் இருக்கிறார்கள். ஆசிரியர் மேசையில் ஐந்து புத்தகங்கள் உள்ளன. கரும்பலகையில் தமிழ் எழுத்துக்கள் இருக்கின்றன. வகுப்பறை வளமாக இருக்கிறது.', 'Translation: "This is a classroom at Anna University. In the class there are twenty students. On the teacher\'s desk there are five books. On the blackboard there are Tamil letters. The classroom is lively/well-arranged."', [{ target: 'அண்ணா பல்கலைக்கழகத்தின்', note: 'Anna University-genitive ("of Anna U")' }, { target: 'வகுப்பில்', note: 'class-loc ("in class")' }, { target: 'மேசையில்', note: 'table-loc ("on table") with -y- insertion' }, { target: 'எழுத்துக்கள்', note: 'letter-plural; note geminate tt + plural kaḷ' }], [ACT.reading]),
    createContentItem('கேள்விகள்', 'kēḷvikaḷ', 'Four comprehension questions on the classroom passage.', 'sentence', 'Q1: வகுப்பில் எத்தனை மாணவர்கள்? Q2: ஆசிரியர் மேசையில் என்ன இருக்கிறது? Q3: கரும்பலகையில் என்ன இருக்கிறது? Q4: வகுப்பறை எப்படி?', 'eṭṭaṉai = "how many"; eppaṭi = "how / what kind of".', [{ target: 'A1: இருபது மாணவர்கள்.', note: '"twenty students"' }, { target: 'A2: ஐந்து புத்தகங்கள் இருக்கின்றன.', note: '"there are five books"' }, { target: 'A3: தமிழ் எழுத்துக்கள்.', note: '"Tamil letters"' }, { target: 'A4: வளமாக இருக்கிறது.', note: '"it is well-arranged/lively"' }], [ACT.reading]),

    // Listening
    createContentItem('முதல் வகுப்பு', 'mutal vakuppu', 'A 5-turn classroom dialogue between professor and students.', 'conversation', 'பேராசிரியர்: வணக்கம், மாணவர்களே! இது தமிழ் வகுப்பு.\nமாணவன்: வணக்கம், ஐயா!\nபேராசிரியர்: இது புத்தகம். இது குறிப்பேடு. (கரும்பலகையை சுட்டிக் காட்டி) அது கரும்பலகை. நீங்கள் ஒவ்வொருவரும் ஒரு குறிப்பேடு கொண்டிருக்க வேண்டும்.\nமாணவி: ஐயா, என்னிடம் குறிப்பேடு இல்லை.\nபேராசிரியர்: பரவாயில்லை. இன்று கடனாக கொடுக்கிறேன்.', 'Translation roughly: "Hello, students! This is the Tamil class." "Hello, sir!" "This is a book. This is a notebook. (pointing to blackboard) That is the blackboard. Each of you must have a notebook." "Sir, I don\'t have a notebook." "No problem. I\'ll lend you one today."', [{ target: 'மாணவர்களே', note: 'vocative-plural; "O students!"' }, { target: 'ஒவ்வொருவரும்', note: '"each one"; -um is additive ("also/each")' }, { target: 'கடனாக', note: '"as a loan"; -āka adverbializer' }], [ACT.listening]),

    // Writing
    createContentItem('வகுப்பறை விவரிப்பு', 'vakuppaṟai vivarippu', 'Template: write a 4-5 sentence description of YOUR classroom using locative, plural, and agreement.', 'sentence', 'மாதிரி: இது என் தமிழ் வகுப்பு. வகுப்பில் [எண்] மாணவர்கள் இருக்கிறார்கள். மேசையில் [பொருள்கள்] இருக்கின்றன. நான் [இடத்தில்] உட்காருகிறேன். வகுப்பறை [விளக்கம்].', 'Fill the bracketed slots and read aloud.', null, [ACT.writing]),

    // Culture
    createContentItem('தமிழ் கல்வி', 'tamiḻ kalvi', 'Education in Tamil culture is famously competitive — entrance exams (IIT-JEE, NEET, TNPSC), strong STEM emphasis, parental investment in tutoring. Anna University and IIT Madras in Chennai are flagship institutions; Loyola College (arts) and the various government colleges feed many fields.', 'sentence', 'தமிழ்நாட்டில் கல்விக்கு மிகுந்த மரியாதை. tamiḻnāṭṭil kalvikku mikunta mariyātai. "In Tamil Nadu, much respect is given to education."', 'Tamil tradition since Sangam era values learning; the title புலவர் pulavar ("learned one, poet") is among the highest.', null, [ACT.culture]),
    createContentItem('வகுப்பறை மரியாதை', 'vakuppaṟai mariyātai', 'Classroom etiquette: stand when professor enters, address as ஐயா/அம்மா, never use the intimate நீ. Respect for the guru-shishya tradition is preserved even in modern engineering classrooms.', 'sentence', 'ஆசிரியர் வரும்போது மாணவர்கள் எழுந்து நிற்கிறார்கள்.', '"When the teacher comes, students stand up." Standard practice in TN schools and colleges.', null, [ACT.culture]),

    // Task
    createContentItem('பணி: வகுப்பறை சுற்றுப்பயணம்', 'paṇi: vakuppaṟai cuṟṟuppayaṇam', 'Tour your virtual classroom with the AI tutor. They will point to objects; you name them, count them, and say where they are.', 'conversation', 'AI: இது என்ன?\nநீ: [பொருள் பெயர்]\nAI: வகுப்பில் எத்தனை மாணவர்கள்?\nநீ: [எண்]\nAI: ஆசிரியர் எங்கே?\nநீ: [இடம்]\nAI: உங்கள் புத்தகம் எங்கே?\nநீ: [இடம்]', '8-turn exchange covering deictics, numbers, and locatives.', [{ target: 'பொருள் பெயர்', note: 'name the object using zero-copula identity' }, { target: 'எண்', note: 'use the count + plural marker' }, { target: 'இடம்', note: 'use locative + iru-agreement' }], [ACT.task]),
  ],
};

module.exports = lesson;
