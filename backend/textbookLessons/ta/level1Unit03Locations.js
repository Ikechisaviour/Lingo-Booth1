// Level 1 Unit 3 — Locations & Directions (Tamil)
// Functions: asking and giving directions in Chennai, location words, the
// eight-case system surface (locative -il, dative -ukku, ablative -iliruntu),
// pointing landmarks at Anna University, IIT Madras, Marina Beach.

const createContentItem = (target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization, nativeText: note, pronunciation: romanization,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ta-l1u3-orientation',
  pronunciation: 'ta-l1u3-pronunciation',
  vocabularyPlaces: 'ta-l1u3-vocab-places',
  vocabularyPositions: 'ta-l1u3-vocab-positions',
  grammarLocativeDative: 'ta-l1u3-grammar-loc-dat',
  grammarAblative: 'ta-l1u3-grammar-ablative',
  grammarDirections: 'ta-l1u3-grammar-directions',
  reading: 'ta-l1u3-reading',
  listening: 'ta-l1u3-listening',
  writing: 'ta-l1u3-writing',
  culture: 'ta-l1u3-culture',
  task: 'ta-l1u3-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Ask "where is X?" in Chennai using எங்கே? and answer with location + locative.', 'Give simple directions using left/right/straight + go-verb in imperative.', 'Distinguish three of the eight Tamil cases: locative -il (at), dative -ukku (to), ablative -iliruntu (from).'], task: 'Picture yourself lost near Anna University looking for Marina Beach — by the end of this lesson you can ask, understand, and give directions in Tamil.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in directions', goals: ['Distinguish locative -இல் -il (alveolar) from -உள் -uḷ (retroflex) — different morphemes, different meanings.', 'Pronounce வலது valatu (right) and இடது iṭatu (left) with crisp final -tu, not -du.', 'Geminate kk in -ukku dative; never voice to -ugu.'], task: 'Drill the case-suffix pairs and direction words until automatic.' },
  { id: ACT.vocabularyPlaces, section: 'Vocabulary I', title: 'Places in Chennai', goals: ['Memorize 15+ public places: vīṭu (house), kaṭai (shop), maruttuvamaṉai (hospital), pēruntu nilaiyam (bus station), railvē nilaiyam (railway station).', 'Recognize Chennai landmarks: Marīṉā kaṭaṟkarai (Marina Beach), Aṇṇā nakar (Anna Nagar), T. Nakar.'], task: 'Map five places you know in your city to their Tamil equivalents.' },
  { id: ACT.vocabularyPositions, section: 'Vocabulary II', title: 'Position words', goals: ['Memorize 10 position words: mēlē (above), kīḻē (below), uḷḷē (inside), veḷiyē (outside), pakkam (beside), eti (opposite), muṉṉālē (in front), piṉṉālē (behind), maṉaiyilē (in the corner), naṭuvilē (in the middle).'], task: 'Describe the position of three classroom objects using these words.' },
  { id: ACT.grammarLocativeDative, section: 'Grammar I', title: 'Locative -il and Dative -ukku', goals: ['Use locative -இல் (-il) for "at, in, on" — STATIC location.', 'Use dative -உக்கு (-ukku) for "to, for" — DIRECTIONAL goal. நான் கடைக்கு போகிறேன் = "I go TO the shop"; நான் கடையில் இருக்கிறேன் = "I am AT the shop".'], task: 'Construct three -il sentences and three -ukku sentences distinguishing being-there from going-there.' },
  { id: ACT.grammarAblative, section: 'Grammar II', title: 'Ablative -iliruntu', goals: ['Form ablative ("from") by stacking locative + iruntu: -இல் + இருந்து = -இலிருந்து -iliruntu. நான் சென்னையிலிருந்து வருகிறேன் "I come from Chennai".', 'Recognize the pattern as agglutinative suffix-stacking — the heart of Tamil grammar.'], task: 'Form ablative for five place names and use each in a sentence.' },
  { id: ACT.grammarDirections, section: 'Grammar III', title: 'Direction verbs and imperatives', goals: ['Use polite imperative -உங்கள் -uṅkaḷ on the verb stem: pō → pōṅkaḷ (please go), tirumpu → tirumpuṅkaḷ (please turn).', 'Form direction phrases: vala-pakkam (rightward), iṭa-pakkam (leftward), nēr-āka (straight).'], task: 'Give a three-step direction to a place in your neighborhood using polite imperative.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'Directions from Anna University to Marina Beach', goals: ['Read aloud a 4-sentence direction-giving paragraph.', 'Answer comprehension questions about which way to turn at which landmark.'], task: 'Read the paragraph and trace the route on an imagined map.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'Asking a stranger', goals: ['Follow a polite stranger-direction-asking exchange.', 'Reproduce with your own destination.'], task: 'Read along and perform with substitutions.' },
  { id: ACT.writing, section: 'Writing', title: 'Write directions home', goals: ['Write 4-5 sentences giving directions from Anna U to your hostel.', 'Use locative, dative, ablative, and polite imperative at least once each.'], task: 'Compose and read aloud.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Chennai geography and navigation', goals: ['Know the famous Chennai districts: T. Nagar (shopping), Mylapore (temple/tradition), Anna Nagar (residential), Adyar (Anna U area), Marina Beach (the iconic 13-km beach).', 'Understand that Chennai uses hub-and-landmark navigation more than street numbers — "near Loyola College", "opposite Bessy" is normal.'], task: 'Pick three Chennai landmarks; describe how you would direct a visitor using them.' },
  { id: ACT.task, section: 'Task', title: 'Lost in Chennai', goals: ['Combine all skills in a single direction-asking-and-following scene.'], task: 'Roleplay being lost near Marina Beach with the AI tutor as a helpful stranger.' },
];

const lesson = {
  title: 'Level 1 · Unit 3: எங்கே? — Locations and Directions',
  category: 'locations', difficulty: 'beginner', targetLang: 'ta', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic', activities,
  expressionPractice: [
    { id: 'asking-where', label: 'Asking where', goal: 'Use எங்கே? + place-noun to ask location.' },
    { id: 'giving-direction', label: 'Giving direction', goal: 'Combine direction words + polite imperative for 2-3 step instructions.' },
    { id: 'three-cases', label: 'Three-case practice', goal: 'Pick locative vs dative vs ablative based on at/to/from semantics.' },
    { id: 'chennai-landmarks', label: 'Chennai landmarks', goal: 'Reference Marina Beach, Anna Nagar, T. Nagar, IIT Madras correctly.' },
  ],
  relatedPools: ['topic-locations', 'topic-city'],
  content: [
    createContentItem('இடம் & திசை', 'iṭam & ticai', 'By the end of this lesson you can navigate Chennai in Tamil — ask "where is X?", give and follow directions, and distinguish "at" / "to" / "from" using the right case suffix.', 'word', 'Functional: எங்கே? eṅkē? (where?) · -இல் (at) · -உக்கு (to) · -இலிருந்து (from) · வலது/இடது (right/left)', 'These case suffixes appear in every later unit — this lesson plants them deep.', null, [ACT.orientation]),
    createContentItem('சூழல்', 'cūḻal', 'You leave Anna University after class and want to reach Marina Beach. You ask a kindly Chennai uncle for directions. Cover all three cases in his answer.', 'word', 'மாமா: "இங்கிருந்து நேராக போய் வலது பக்கம் திரும்புங்கள். கடற்கரை அங்கேதான்."', 'Standard Chennai-uncle direction style: location ablative + go-verb + turn-direction + landmark.', null, [ACT.orientation]),

    // Pronunciation
    createContentItem('-இல் vs -உள்', '-il vs -uḷ', 'Two locative-like suffixes with DIFFERENT roles. -இல் (-il, alveolar l) = "at/in" — the standard locative. -உள் (-uḷ, retroflex ḷ) = "inside, within" — more emphatic enclosure. Confusing them is a Tamil-learner mistake.', 'word', 'வீட்டில் (in/at the house) vs வீட்டுள்ளே (inside the house, intensified)', 'Mixing the two is a fingerprint of a learner — natives produce them automatically.', null, [ACT.pronunciation]),
    createContentItem('-உக்கு dative', '-ukku dative', 'Dative case suffix -உக்கு (-ukku). Geminate kk is voiceless because doubled. Marks goal/direction/recipient.', 'word', 'கடைக்கு போகிறேன். kaṭaikku pōkiṟēṉ. "I go to the shop."', 'Voicing the kk to /gg/ is a non-native error; keep it crisp /kk/.', null, [ACT.pronunciation]),
    createContentItem('வலது / இடது', 'valatu / iṭatu', 'Right / left. Final -tu (dental t, voiceless because adjacent to vowel and word-final). The cluster ṭa in iṭatu is retroflex.', 'word', 'வலது பக்கம் திரும்புங்கள். valatu pakkam tirumpuṅkaḷ. "Please turn right."', 'pakkam = side; valatu/iṭatu pakkam = right/left side.', null, [ACT.pronunciation]),

    // Vocab I
    createContentItem('வீடு', 'vīṭu', 'House. Retroflex ṭ + final -u. Locative form: வீட்டில் vīṭṭil (with euphonic gemination).', 'word', 'என் வீடு அண்ணா நகர். eṉ vīṭu Aṇṇā Nakar. "My house is in Anna Nagar."', 'Anna Nagar is a major residential Chennai neighborhood; named after the same Annadurai.', null, [ACT.vocabularyPlaces]),
    createContentItem('கடை', 'kaṭai', 'Shop / store. Retroflex ṭ. Common compound: மளிகைக் கடை maḷikai-k kaṭai = grocery shop.', 'word', 'நான் கடைக்கு போகிறேன். nāṉ kaṭaikku pōkiṟēṉ. "I am going to the shop."', 'Dative -kku marks the goal of motion; kaṭai + kku = kaṭai-kku.', null, [ACT.vocabularyPlaces]),
    createContentItem('மருத்துவமனை', 'maruttuvamaṉai', 'Hospital. Compound: maruttuvam (medicine) + maṉai (place/house). Centhamizh-style coinage; in casual speech, "hospital" (English) is also common.', 'word', 'அவரை மருத்துவமனைக்கு கூட்டிச் செல்லுங்கள்.', '"Please take him/her to the hospital."', null, [ACT.vocabularyPlaces]),
    createContentItem('பேருந்து நிலையம்', 'pēruntu nilaiyam', 'Bus station. Compound: pēruntu "bus" (lit. "great vehicle") + nilaiyam "station/standing place". Chennai\'s major bus terminus is CMBT — Chennai Mofussil Bus Terminus.', 'word', 'CMBT பேருந்து நிலையம் எங்கே? CMBT pēruntu nilaiyam eṅkē?', '"Where is the CMBT bus station?"', null, [ACT.vocabularyPlaces]),
    createContentItem('ரயில் நிலையம்', 'rayil nilaiyam', 'Railway station. English loan rayil + Tamil nilaiyam. Chennai Central (சென்னை சென்ட்ரல்) is the iconic landmark; also Egmore.', 'word', 'சென்னை சென்ட்ரலுக்கு எப்படி போவது?', '"How does one go to Chennai Central?" -uku dative on a place name.', null, [ACT.vocabularyPlaces]),
    createContentItem('கடற்கரை', 'kaṭaṟkarai', 'Beach / shore. Centhamizh: kaṭal (sea) + karai (shore). Marina Beach (மரீனா கடற்கரை) is the 13-km signature Chennai landmark.', 'word', 'மரீனா கடற்கரைக்கு போகலாம்.', '"Let\'s go to Marina Beach." -lām is the "let\'s/may" suffix.', null, [ACT.vocabularyPlaces]),
    createContentItem('கோயில்', 'kōyil', 'Temple. Long ō + alveolar y + alveolar l. Mylapore (மயிலாப்பூர்) in central Chennai is famous for the Kapaleeswarar Temple (கபாலீஸ்வரர் கோயில்).', 'word', 'நாங்கள் கபாலீஸ்வரர் கோயிலுக்கு போகிறோம்.', '"We are going to Kapaleeswarar Temple."', null, [ACT.vocabularyPlaces]),
    createContentItem('உணவகம்', 'uṇavakam', 'Restaurant. Compound: uṇavu (food) + akam (interior/place). Casual term is "hotel" (English; in Tamil Nadu, "hotel" often means restaurant).', 'word', 'இந்த உணவகத்தில் சாதம் நல்லாயிருக்கிறது.', '"In this restaurant, the rice is good." Note "hotel" colloquially = restaurant in TN English.', null, [ACT.vocabularyPlaces]),
    createContentItem('நூலகம்', 'nūlakam', 'Library. Compound: nūl (book/thread/text) + akam (place). Anna University has the prestigious Anna Centenary Library.', 'word', 'நூலகத்தில் அமைதியாக இருக்க வேண்டும்.', '"In the library one must be silent."', null, [ACT.vocabularyPlaces]),
    createContentItem('பூங்கா', 'pūṅkā', 'Park / garden. Compound: pū (flower) + ṅkā (place suffix). Semmozhi Poonga (செம்மொழிப் பூங்கா) in Chennai is a famous botanical garden.', 'word', 'நாங்கள் பூங்காவில் நடக்கப் போனோம்.', '"We went to walk in the park."', null, [ACT.vocabularyPlaces]),
    createContentItem('வங்கி', 'vaṅki', 'Bank. The cluster ṅk shows the natural nasal-place assimilation that runs through Tamil. State Bank of India (SBI) is universally referenced.', 'word', 'வங்கியில் இன்று கூட்டம் அதிகம்.', '"At the bank today there is a big crowd."', null, [ACT.vocabularyPlaces]),
    createContentItem('அண்ணா நகர்', 'aṇṇā nakar', 'Anna Nagar — a major residential neighborhood in west Chennai, named for C.N. Annadurai. Grid-planned, upscale, full of restaurants and the famous Tower Park.', 'word', 'நான் அண்ணா நகரில் வசிக்கிறேன். nāṉ Aṇṇā Nakaril vacikkiṟēṉ.', '"I live in Anna Nagar." vaci = "to dwell, live"; vacikkiṟēṉ = "I live".', null, [ACT.vocabularyPlaces]),
    createContentItem('டி. நகர்', 'ṭi. nakar', 'T. Nagar (Thyagaraya Nagar) — Chennai\'s shopping mecca. Ranganathan Street is the most crowded shopping street in India.', 'word', 'டி. நகரில் கூட்டம் மிக அதிகம்.', '"In T. Nagar there is a huge crowd."', null, [ACT.vocabularyPlaces]),
    createContentItem('மயிலாப்பூர்', 'mayilāppūr', 'Mylapore — the traditional heart of Chennai; home to the Kapaleeswarar Temple, the famous tank, and traditional Tamil Brahmin culture. Bharatanatyam and Carnatic music thrive here.', 'word', 'மயிலாப்பூர் சென்னையின் கலாச்சார மையம்.', '"Mylapore is Chennai\'s cultural center."', null, [ACT.vocabularyPlaces]),
    createContentItem('அடையார்', 'aṭaiyār', 'Adyar — the neighborhood housing Anna University, IIT Madras, Theosophical Society, and Adyar river. The "campus belt" of Chennai.', 'word', 'அடையாறில் ஐ.ஐ.டி மற்றும் அண்ணா பல்கலைக்கழகம்.', '"In Adyar are IIT and Anna University."', null, [ACT.vocabularyPlaces]),
    createContentItem('IIT மெட்ராஸ்', 'IIT meṭrās', 'Indian Institute of Technology Madras — the premier engineering institute in India, located in a 600-acre forested campus next to Anna University in Adyar. Deer roam the campus.', 'word', 'IIT மெட்ராஸ் காட்டுக்கு பெயர்போனது.', '"IIT Madras is famous for its forest." kāṭu = forest; -ukku peyar-pōṉatu = "is famous for".', null, [ACT.vocabularyPlaces]),

    // Vocab II: positions
    createContentItem('மேலே', 'mēlē', 'Above / on top. The -ē vowel-final is the locative/adverbial. Pair: mēlē/kīḻē (above/below).', 'word', 'புத்தகம் மேசை மேலே.', '"The book is on/above the table."', null, [ACT.vocabularyPositions]),
    createContentItem('கீழே', 'kīḻē', 'Below / under. Note ழ (retroflex approximant).', 'word', 'பை மேசை கீழே. pai mēcai kīḻē.', '"The bag is under the table."', null, [ACT.vocabularyPositions]),
    createContentItem('உள்ளே', 'uḷḷē', 'Inside. Retroflex ḷ + -ē locative.', 'word', 'புத்தகம் பைக்குள்ளே.', '"The book is inside the bag." pai-kku-ḷ-ḷē = bag-inside.', null, [ACT.vocabularyPositions]),
    createContentItem('வெளியே', 'veḷiyē', 'Outside. A practical spatial word that commonly follows a genitive or dative-linked noun when locating people or animals beyond a boundary.', 'word', 'நாய் வீட்டுக்கு வெளியே.', '"The dog is outside the house" shows the location phrase after the house noun.', null, [ACT.vocabularyPositions]),
    createContentItem('பக்கம்', 'pakkam', 'Beside / side. Used with vala- (right) and iṭa- (left) for direction phrases.', 'word', 'என் பக்கம் வா.', '"Come to my side / near me." vā = come (intimate imperative).', null, [ACT.vocabularyPositions]),
    createContentItem('எதிரே', 'etirē', 'Opposite / facing.', 'word', 'பேருந்து நிலையம் கடைக்கு எதிரே.', '"The bus station is opposite the shop."', null, [ACT.vocabularyPositions]),
    createContentItem('முன்னாலே', 'muṉṉālē', 'In front of. Geminate ṉṉ.', 'word', 'வாசலின் முன்னாலே நில்.', '"Stand in front of the door."', null, [ACT.vocabularyPositions]),
    createContentItem('பின்னாலே', 'piṉṉālē', 'Behind. Geminate ṉṉ.', 'word', 'பின்னாலே ஒரு பூங்கா இருக்கிறது.', '"Behind, there is a park."', null, [ACT.vocabularyPositions]),
    createContentItem('நடுவிலே', 'naṭuvilē', 'In the middle. The ending carries locative meaning, so the phrase is useful for describing classrooms, streets, and seating arrangements.', 'word', 'வகுப்பின் நடுவிலே ஆசிரியர் நிற்கிறார்.', '"In the middle of the class, the teacher stands" gives a common classroom scene.', null, [ACT.vocabularyPositions]),
    createContentItem('மூலையிலே', 'mūlaiyilē', 'In the corner. A high-value room-description word, especially when learners start locating furniture and objects.', 'word', 'மூலையிலே ஒரு கடிகாரம்.', '"In the corner is a clock" keeps the spatial phrase tied to a visible object.', null, [ACT.vocabularyPositions]),

    // Grammar I
    createContentItem('-இல் locative', '-il locative', 'STATIC location. Marks "at, in, on" — where something IS. நான் வீட்டில் இருக்கிறேன் = "I am at home". Always with iru ("be located"), never with pō ("go").', 'sentence', 'நான் சென்னையில் இருக்கிறேன். (loc, static)\nநான் சென்னைக்கு போகிறேன். (dat, motion-to)', 'Each case has its own verb-class affinity; pairing the wrong case + verb yields nonsense.', [{ target: '-il + iru', note: 'static location ("is at")' }, { target: '-il + nikar', note: 'event happens at location ("happens at")' }], [ACT.grammarLocativeDative]),
    createContentItem('-உக்கு dative', '-ukku dative', 'GOAL of motion or recipient. Marks "to (a place), to (a person), for (purpose)". நான் கடைக்கு போகிறேன் = "I go TO the shop"; எனக்கு புத்தகம் கொடு = "give me a book / a book TO me".', 'sentence', 'கடைக்கு போகிறேன் (motion-to)\nஎனக்கு கொடு (recipient)\nநன்றிக்கு (for thanks)', 'Dative is the workhorse case — appears in motion, possession ("X has Y" = "Y-nom Y X-dat iru-kkiṟatu"), and many idioms.', [{ target: 'consonant + ukku', note: 'pal-ukku, kaṭai-kku' }, { target: 'vowel + kku', note: 'after -i / -ai: kaṭai-kku, peṇṇukku' }, { target: 'special: enakku, unakku', note: 'pronouns get fused dative: nāṉ → enakku, nī → unakku, avar → avarukku' }], [ACT.grammarLocativeDative]),
    createContentItem('Possession with dative', 'possession dative', 'Tamil HAS-construction uses dative: "X has Y" = "X-dat Y iru-kkiṟatu". எனக்கு புத்தகம் இருக்கிறது eṉakku puttakam irukkiṟatu = "I have a book" (literally "to-me book is").', 'sentence', 'எனக்கு இரண்டு தம்பிகள் இருக்கிறார்கள். eṉakku iraṇṭu tampikaḷ irukkiṟārkaḷ. "I have two younger brothers."', 'Same iru verb, agreed with the POSSESSED noun (not the possessor); animate possession uses honor-marked agreement.', null, [ACT.grammarLocativeDative]),

    // Grammar II
    createContentItem('-இலிருந்து ablative', '-iliruntu ablative', 'Marks "from" (source of motion). Formed by STACKING two suffixes: locative -il + iruntu (perfective past of iru = "having been"). The compound means "having been at X, [now moving]".', 'sentence', 'நான் சென்னையிலிருந்து கோவைக்கு பயணம் செய்தேன்.', '"I traveled from Chennai to Coimbatore." -iliruntu source + -ukku goal in the same sentence.', [{ target: '-il + -iruntu', note: 'literal: "having been at"; functional: "from"' }, { target: 'pronoun form', note: 'eṉṉiliruntu = "from me"; ivariliruntu = "from him/her hon"' }], [ACT.grammarAblative]),
    createContentItem('Agglutinative stacking', 'agglutinative stacking', 'Tamil is famously agglutinative: suffixes stack on a noun stem to express what English uses prepositions for. Example: vīṭu (house) + kaḷ (plural) + il (loc) + iruntu (abl) = vīṭukaḷiliruntu "from the houses".', 'sentence', 'வீடு + கள் + இல் + இருந்து = வீடுகளிலிருந்து', 'Each suffix adds one layer of meaning; the order is fixed (number → case → postposition).', [{ target: 'order', note: 'stem → plural → case → postposition' }, { target: 'predictable', note: 'once you learn the layers, you can decode any noun form' }], [ACT.grammarAblative]),

    // Grammar III
    createContentItem('Polite imperative -உங்கள்', '-uṅkaḷ polite', 'Polite/plural imperative formed by adding -உங்கள் (-uṅkaḷ) to the verb stem. பார் pār (look-intimate) → பாருங்கள் pāruṅkaḷ (please look). The intimate imperative is the bare stem.', 'sentence', 'வா (come, intimate) → வாருங்கள் (please come)\nகேள் (listen) → கேளுங்கள் (please listen)\nபோ (go) → போங்கள் (please go)', 'Mismatched register (using intimate vā with a stranger) sounds rude; using polite vāruṅkaḷ with a child sounds stiff.', null, [ACT.grammarDirections]),
    createContentItem('Direction phrases', 'direction phrases', 'வலது பக்கம் valatu pakkam = right side; இடது பக்கம் iṭatu pakkam = left side; நேராக nērāka = straight; திரும்புங்கள் tirumpuṅkaḷ = please turn. Stack these for multi-step directions.', 'sentence', 'நேராக போய், வலது பக்கம் திரும்புங்கள்.', '"Go straight, then turn right."', null, [ACT.grammarDirections]),

    // Reading
    createContentItem('வழிவகை', 'vaḻivakai', 'A 4-sentence direction paragraph from Anna University to Marina Beach. Apply locative/dative/ablative + imperative.', 'sentence', 'அண்ணா பல்கலைக்கழகத்திலிருந்து மரீனா கடற்கரைக்கு இப்படி போங்கள். வாயிலில் இருந்து நேராக போய் சர்தார் பட்டேல் சாலையில் கிழக்கு பக்கம் திரும்புங்கள். கூட்டுச் சாலை வரும்வரை சுமார் 4 கி.மீ. நேராக போங்கள். அங்கே மரீனா கடற்கரை இருக்கிறது.', 'Translation: "From Anna University to Marina Beach, go like this. From the gate, go straight and turn east on Sardar Patel Road. Go straight about 4 km until you reach the junction. There, Marina Beach is."', [{ target: 'அண்ணா பல்கலைக்கழகத்திலிருந்து', note: 'University-loc-from = "from Anna U" — ablative stack' }, { target: 'மரீனா கடற்கரைக்கு', note: 'Marina Beach-dat = "to Marina Beach"' }, { target: 'திரும்புங்கள்', note: 'polite imperative "please turn"' }, { target: 'வரும்வரை', note: '"until coming" — durative phrase' }], [ACT.reading]),

    // Listening
    createContentItem('அந்நியர் உரையாடல்', 'aṉṉiyar uraiyāṭal', 'Polite stranger-direction-asking exchange.', 'conversation', 'நீ: மன்னிக்கவும், ஐயா. மரீனா கடற்கரைக்கு எப்படி போவது?\nமாமா: ஓ! இங்கிருந்து நேராக போய், கடற்கரை சாலையில் வலது பக்கம் திரும்புங்கள். மூன்று கி.மீ. போனால் கடற்கரை வந்துவிடும்.\nநீ: மிக்க நன்றி, ஐயா!\nமாமா: பரவாயில்லை, தம்பி.', 'Standard polite exchange; mAamA (uncle) addresses you as "thambi" (younger brother), a warm Tamil informality.', [{ target: 'எப்படி போவது? eppaṭi pōvatu?', note: '"how to go?" — verbal-noun question' }, { target: 'வந்துவிடும்', note: '"will come / will arrive" — completive aspect' }, { target: 'தம்பி tampi', note: '"younger brother" — affectionate address from older male to younger male' }], [ACT.listening]),

    // Writing
    createContentItem('வழிக் குறிப்பு', 'vaḻik kuṟippu', 'Write 4-5 sentences giving directions from Anna University to your hostel using locative, dative, ablative, and polite imperative.', 'sentence', 'மாதிரி: அண்ணா பல்கலைக்கழக வாயிலில் இருந்து நேராக 200 மீட்டர் போய், இடது பக்கம் திரும்புங்கள். அங்கே ஒரு கடை. கடைக்கு பின்னாலே என் விடுதி இருக்கிறது.', 'Translation: "From the Anna University gate, go straight 200 meters and turn left. There is a shop there. Behind the shop is my hostel."', null, [ACT.writing]),

    // Culture
    createContentItem('சென்னை நிலவெளி', 'ceṉṉai nilaveḷi', 'Chennai geography: T. Nagar (shopping), Mylapore (temple/tradition), Anna Nagar (residential), Adyar (Anna U / IIT belt), Marina (the 13-km beach), Besant Nagar / Bessy (Elliot\'s Beach), Velachery (newer suburb).', 'sentence', 'டி. நகர் கடை, மயிலாப்பூர் கோயில், மரீனா கடற்கரை, அடையார் கல்லூரி — சென்னையின் நான்கு முகங்கள்.', '"T. Nagar shopping, Mylapore temple, Marina beach, Adyar college — the four faces of Chennai."', null, [ACT.culture]),
    createContentItem('இடம் சார்ந்த வழிகாட்டுதல்', 'iṭam cārnta vaḻikāṭṭutal', 'Chennai navigation uses LANDMARKS not street numbers: "near Loyola College", "opposite Bessy beach", "next to Cake World". A learner who tries to use numerical addresses will be looked at strangely.', 'sentence', 'லயோலா கல்லூரிக்கு பக்கத்தில் என் வீடு.', '"Near Loyola College is my house" — landmark-based locating.', null, [ACT.culture]),

    // Task
    createContentItem('பணி: மரீனாவில் தொலைந்து', 'paṇi: marīnāvil tolaintu', 'Lost near Marina Beach — ask a Chennai uncle for directions back to Anna University. The AI tutor will play the uncle.', 'conversation', 'நீ: [மன்னிக்கவும் + அண்ணா பல்கலைக்கழகத்துக்கு எப்படி போவது?]\nமாமா: [direction 1]\nநீ: [confirm + ask follow-up]\nமாமா: [direction 2]\nநீ: [நன்றி]', '6-turn exchange using all three cases and polite imperative.', [{ target: 'opening', note: 'மன்னிக்கவும் + dative-place + எப்படி போவது?' }, { target: 'confirmation', note: 'சரி, புரிந்தது. + ablative-loc-question' }, { target: 'closing', note: 'மிக்க நன்றி, ஐயா/மாமா' }], [ACT.task]),
  ],
};

module.exports = lesson;
