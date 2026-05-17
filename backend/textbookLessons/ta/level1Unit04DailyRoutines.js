// Level 1 Unit 4 — Daily Routines (Tamil)
// Functions: time-of-day vocab, daily routine verbs, simple present tense
// agreement, narrating a daily schedule, Anna University student day.

const createContentItem = (target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization, nativeText: note, pronunciation: romanization,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ta-l1u4-orientation', pronunciation: 'ta-l1u4-pronunciation',
  vocabularyTime: 'ta-l1u4-vocab-time', vocabularyVerbs: 'ta-l1u4-vocab-verbs',
  grammarPresent: 'ta-l1u4-grammar-present', grammarAdverbs: 'ta-l1u4-grammar-adverbs',
  grammarSequence: 'ta-l1u4-grammar-sequence',
  reading: 'ta-l1u4-reading', listening: 'ta-l1u4-listening', writing: 'ta-l1u4-writing',
  culture: 'ta-l1u4-culture', task: 'ta-l1u4-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Describe a typical day in Tamil using time markers (kālai, maṭiyam, mālai, irāvu) + routine verbs.', 'Conjugate the simple present in all 8 agreement forms (-kiṟēṉ, -kiṟāy, -kiṟāṉ, -kiṟāḷ, -kiṟār, -kiṟatu, -kiṟōm, -kiṟīrkaḷ, -kiṟārkaḷ).', 'Sequence actions with piṟaku ("then/after") and muṉṉar ("before").'], task: 'Picture a day in your Anna University student life — by the end, you can narrate it minute-by-minute in Tamil.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in routine verbs', goals: ['Distinguish the present-tense markers -kiṟ- (Centhamizh) from spoken -kkir-/-r-.', 'Pronounce சாப்பிடு cāppiṭu (eat) with geminate pp + retroflex ṭ — two pronunciation rules at once.', 'Pronounce எழுந்திரு eḻuntiru (wake up) without losing the ழ.'], task: 'Drill present-tense verb pairs in formal vs spoken register.' },
  { id: ACT.vocabularyTime, section: 'Vocabulary I', title: 'Time of day & frequency', goals: ['Memorize: kālai (morning), maṭiyam (afternoon), mālai (evening), irāvu (night), patuṅki (early), naṭuvē (middle), tāmatam (late).', 'Numerals + maṇi for clock time: kālai eṭṭu maṇi = 8 AM.'], task: 'State 5 daily activities with their time of day.' },
  { id: ACT.vocabularyVerbs, section: 'Vocabulary II', title: 'Routine verbs', goals: ['Memorize 15 routine verbs: eḻuntiru (wake), kuḷi (bathe), cāppiṭu (eat), pō (go), paṭi (study/read), eḻutu (write), pēcu (speak), kēḷ (listen), pār (see), tūṅku (sleep), āṭu (play), oṭu (run), naṭa (walk), uṭkāru (sit), niṟku (stand).'], task: 'Pick 6 verbs and form simple present sentences with each.' },
  { id: ACT.grammarPresent, section: 'Grammar I', title: 'Simple present + 8-way agreement', goals: ['Form the simple present: verb stem + -கிற்- (-kiṟ-) + agreement suffix. நான் சாப்பிடு + கிற் + ஏன் = சாப்பிடுகிறேன் "I eat".', 'Apply ALL 8 agreement forms: -kiṟēṉ (1sg), -kiṟāy (2sg-int), -kiṟāṉ/-kiṟāḷ (3sg peer M/F), -kiṟār (3sg hon), -kiṟatu (3sg neuter), -kiṟōm (1pl), -kiṟīrkaḷ (2pl/polite), -kiṟārkaḷ (3pl).'], task: 'Conjugate "to eat" in all 8 forms; do same for "to sleep".' },
  { id: ACT.grammarAdverbs, section: 'Grammar II', title: 'Adverbs with -ஆக -āka', goals: ['Form adverbs from adjective/noun + -ஆக (-āka): vēkam (speed) → vēkamāka (quickly); maṭṭum (only) → maṭṭumāka.'], task: 'Form 5 adverbs and use each in a sentence.' },
  { id: ACT.grammarSequence, section: 'Grammar III', title: 'Sequencing with piṟaku and muṉṉar', goals: ['Use பிறகு piṟaku ("after that, then") and முன்னர் muṉṉar ("before") to chain actions.', 'Use the verbal participle (verb + -நு / -த்து) to subordinate: சாப்பிட்டு பிறகு படிக்கிறேன் "having eaten, then I study".'], task: 'Narrate 3 sequential actions using verbal participle + piṟaku.' },
  { id: ACT.reading, section: 'Reading', title: 'A student\'s day', goals: ['Read a 5-sentence daily routine paragraph aloud.'], task: 'Read and answer 4 comprehension questions.' },
  { id: ACT.listening, section: 'Listening', title: 'Two friends compare schedules', goals: ['Follow a 5-turn dialogue contrasting morning and evening routines.'], task: 'Reproduce with your schedule.' },
  { id: ACT.writing, section: 'Writing', title: 'Your day in Tamil', goals: ['Write 5-6 sentences describing your typical day.'], task: 'Use 4+ verbs in present tense + 2 time markers + 1 sequence marker.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Tamil daily rhythms', goals: ['Understand Tamil daily rhythm: early start (kolam at dawn), filter-coffee morning, late lunch (1-2 PM), tiffin evening, dinner ~9 PM.', 'Know the campus rhythm at Anna University: hostel mess, mid-morning chai, late library hours.'], task: 'Compare your daily routine with the Chennai-student version.' },
  { id: ACT.task, section: 'Task', title: 'Narrate your day', goals: ['Combine all skills in a continuous narrative.'], task: 'Roleplay with the AI tutor as a friend asking about your day.' },
];

const lesson = {
  title: 'Level 1 · Unit 4: ஒரு நாள் — Daily Routines',
  category: 'daily-routines', difficulty: 'beginner', targetLang: 'ta', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic', activities,
  expressionPractice: [
    { id: 'narrate-day', label: 'Narrate your day', goal: 'Sequence 5+ actions with time markers and connectors.' },
    { id: 'simple-present', label: 'Simple present', goal: 'Conjugate any verb in all 8 agreement forms.' },
    { id: 'sequencing', label: 'Sequencing actions', goal: 'Use verbal participle + piṟaku to chain events.' },
    { id: 'time-vocab', label: 'Time-of-day vocab', goal: 'State activities with kālai/maṭiyam/mālai/irāvu.' },
  ],
  relatedPools: ['topic-daily-life', 'topic-routines'],
  content: [
    createContentItem('என் ஒரு நாள்', 'eṉ oru nāḷ', 'By the end of this lesson you can narrate your day in Tamil minute-by-minute, conjugating verbs in all 8 present-tense forms.', 'word', 'Functional: எழுந்திரு (wake) · சாப்பிடு (eat) · படி (study) · தூங்கு (sleep) · -கிறேன்/-கிறான்/etc agreement', 'Daily-routine narration is the most common topic in beginner conversation; mastering it unlocks fluent small talk.', null, [ACT.orientation]),
    createContentItem('சூழல்', 'cūḻal', 'A friend at the Anna University mess asks "என்ன, இன்று என்ன பண்ணினீங்க?" ("So, what did you do today?"). You answer in fluent present-then-past Tamil.', 'word', 'நண்பன்: "இன்று எத்தனை மணிக்கு எழுந்தீர்கள்?"', 'A standard catch-up question; "எத்தனை மணிக்கு" = "at what time".', null, [ACT.orientation]),

    // Pronunciation
    createContentItem('-கிற- formal / -க்கிற்- spoken', '-kiṟ- vs -kkir-', 'Present-tense marker in Centhamizh is -கிற- (-kiṟ-, alveolar ṟ). In Koduntamizh (spoken), often contracted to -க்கிற்- with extra k or to -ர் -r alone. Diglossia in action: news Tamil uses one, friends use the other.', 'word', 'CENTHAMIZH: சாப்பிடுகிறேன் cāppiṭukiṟēṉ\nKODUNTAMIZH: சாப்பிடுறேன் cāppiṭuṟēṉ', 'Both are correct in their register; mixing makes you sound bookish or street.', null, [ACT.pronunciation]),
    createContentItem('சாப்பிடு', 'cāppiṭu', 'Eat. Geminate pp + retroflex ṭ. The most common Tamil verb after "be/go".', 'word', 'நீங்கள் என்ன சாப்பிடுகிறீர்கள்? nīṅkaḷ eṉṉa cāppiṭukiṟīrkaḷ?', 'Polite "what are you eating?"; same verb works for "having" food.', null, [ACT.pronunciation]),
    createContentItem('எழுந்திரு', 'eḻuntiru', 'Wake up. Compound: eḻu (rise) + tiru (be). The medial ழ is the Tamil signature.', 'word', 'நான் காலை 6 மணிக்கு எழுந்திருக்கிறேன்.', '"I wake up at 6 AM."', null, [ACT.pronunciation]),

    // Vocab I: time
    createContentItem('காலை', 'kālai', 'Morning. Long ā + diphthong ai. Time range: roughly sunrise to ~10 AM.', 'word', 'காலை வணக்கம். kālai vaṇakkam. "Good morning."', 'In Centhamizh: kālai. In Koduntamizh: kāla.', null, [ACT.vocabularyTime]),
    createContentItem('மதியம்', 'matiyam', 'Noon / afternoon. Dental t. Time range: ~11 AM to 3 PM. Lunch is "matiya cāppāṭu".', 'word', 'மதியம் சாப்பிட்டாயா? matiyam cāppiṭṭāyā?', '"Have you eaten lunch?" intimate-past + question particle -ā.', null, [ACT.vocabularyTime]),
    createContentItem('மாலை', 'mālai', 'Evening. Time range: ~4-7 PM. Tea/tiffin time in Tamil households.', 'word', 'மாலை சிற்றுண்டி நேரம். mālai ciṟṟuṇṭi nēram.', '"Evening tiffin time." ciṟṟuṇṭi = small evening meal.', null, [ACT.vocabularyTime]),
    createContentItem('இரவு', 'irāvu', 'Night. Long ā. Time range: ~7 PM onwards. Dinner is "irā cāppāṭu".', 'word', 'இரவு படிக்கிறேன். irāvu paṭikkiṟēṉ.', '"I study at night."', null, [ACT.vocabularyTime]),
    createContentItem('நேற்று / இன்று / நாளை', 'nēṟṟu / iṉṟu / nāḷai', 'Yesterday / today / tomorrow. Three high-frequency time markers. Alveolar trill ṟṟ in nēṟṟu.', 'word', 'நேற்று நான் வந்தேன், இன்று இருக்கிறேன், நாளை போகிறேன்.', '"Yesterday I came, today I am here, tomorrow I go."', null, [ACT.vocabularyTime]),
    createContentItem('-மணி hour', '-maṇi', 'The clock-hour marker. Format: numeral + maṇi = "[N] o\'clock". கால் maṇi (15 min), அரை maṇi (30 min), முக்கால் maṇi (45 min).', 'word', 'எட்டு மணிக்கு வா. eṭṭu maṇikku vā. "Come at 8 o\'clock."', '-maṇi + ukku = "at [N] o\'clock"; dative case for time-point.', null, [ACT.vocabularyTime]),
    createContentItem('நிமிடம்', 'nimiṭam', 'Minute. This time noun becomes especially useful once it takes the locative form `நிமிடத்தில்`, used for deadlines and near-future promises.', 'word', 'பத்து நிமிடத்தில் வருகிறேன். pattu nimiṭattil varukiṟēṉ.', '"I come in ten minutes." `nimiṭattil` shows the noun with a locative ending for elapsed time.', null, [ACT.vocabularyTime]),
    createContentItem('நாள் / வாரம் / மாதம்', 'nāḷ / vāram / mātam', 'Day / week / month. Three temporal-unit nouns. நாள் nāḷ has retroflex ḷ.', 'word', 'ஒரு வாரத்தில் ஏழு நாட்கள். oru vārattil ēḻu nāṭkaḷ.', '"In one week there are seven days."', null, [ACT.vocabularyTime]),

    // Vocab II: verbs
    createContentItem('எழுந்திரு', 'eḻuntiru', 'Wake up / get up. Common opener of daily routine narratives. Compound of eḻu + iru.', 'word', 'நான் காலை 6 மணிக்கு எழுந்திருக்கிறேன்.', '"I wake up at 6 AM."', null, [ACT.vocabularyVerbs]),
    createContentItem('குளி', 'kuḷi', 'Bathe / take a shower. Retroflex ḷ. In Tamil culture, morning bath is essentially universal.', 'word', 'காலையில் குளிக்கிறேன்.', '"I bathe in the morning."', null, [ACT.vocabularyVerbs]),
    createContentItem('சாப்பிடு', 'cāppiṭu', 'Eat. The all-purpose food verb; works for any meal type.', 'word', 'நாங்கள் ஒன்றாக சாப்பிடுவோம்.', '"We will eat together." -uvōm = "let\'s VERB" (1pl).', null, [ACT.vocabularyVerbs]),
    createContentItem('படி', 'paṭi', 'Study / read. Tamil same word for both — context disambiguates.', 'word', 'நான் நூலகத்தில் படிக்கிறேன். nāṉ nūlakattil paṭikkiṟēṉ.', '"I study in the library."', null, [ACT.vocabularyVerbs]),
    createContentItem('எழுது', 'eḻutu', 'Write. ழ in middle.', 'word', 'நாள்தோறும் எழுதுகிறேன்.', '"I write daily." -tōṟum = "every/each".', null, [ACT.vocabularyVerbs]),
    createContentItem('பேசு', 'pēcu', 'Speak / talk. Long ē.', 'word', 'நீங்கள் தமிழ் பேசுகிறீர்களா?', '"Do you speak Tamil?" -ā question particle.', null, [ACT.vocabularyVerbs]),
    createContentItem('கேள்', 'kēḷ', 'Listen / ask. Retroflex ḷ at end of stem. Same verb for both meanings; context decides.', 'word', 'நான் இசை கேட்கிறேன்.', '"I listen to music." Note that the stem changes from kēḷ to kēṭ before -kiṟēṉ — a sandhi rule.', null, [ACT.vocabularyVerbs]),
    createContentItem('பார்', 'pār', 'See / look at.', 'word', 'நான் தினமும் செய்தித்தாள் பார்க்கிறேன்.', '"I look at the newspaper every day." tiṉa-mum = "every-day".', null, [ACT.vocabularyVerbs]),
    createContentItem('தூங்கு', 'tūṅku', 'Sleep. The cluster ṅk is natural Tamil place-assimilation.', 'word', 'நான் இரவு 11 மணிக்கு தூங்குகிறேன்.', '"I sleep at 11 PM."', null, [ACT.vocabularyVerbs]),
    createContentItem('போ', 'pō', 'Go. Most irregular Tamil verb; future stem is pō-v-, past is pōṉēṉ.', 'word', 'நான் பல்கலைக்கழகத்துக்கு போகிறேன்.', '"I go to the university."', null, [ACT.vocabularyVerbs]),
    createContentItem('வா', 'vā', 'Come. Pair with pō. Future stem var-, past vantēṉ.', 'word', 'நாளை வருகிறேன்.', '"I will come tomorrow." (present-as-future use)', null, [ACT.vocabularyVerbs]),
    createContentItem('நட', 'naṭa', 'Walk. Retroflex ṭ.', 'word', 'நாங்கள் கடற்கரையில் நடக்கிறோம்.', '"We walk on the beach."', null, [ACT.vocabularyVerbs]),
    createContentItem('ஓடு', 'ōṭu', 'Run. Long ō + retroflex ṭ.', 'word', 'காலையில் நான் ஓடுகிறேன்.', '"In the morning I run."', null, [ACT.vocabularyVerbs]),
    createContentItem('உட்காரு', 'uṭkāru', 'Sit. Geminate ṭk cluster.', 'word', 'தயவுசெய்து உட்காருங்கள்.', '"Please sit." tayavuceytu = "kindly/please".', null, [ACT.vocabularyVerbs]),
    createContentItem('நிறு / நில்', 'niṟu / nil', 'Stand / stop. Two forms; nil is the imperative-stem.', 'word', 'அங்கே நிற்காதீர்கள்.', '"Don\'t stand there." -ātīrkaḷ negative polite imperative.', null, [ACT.vocabularyVerbs]),
    createContentItem('ஆடு', 'āṭu', 'Play / dance. Long ā + retroflex ṭ.', 'word', 'குழந்தைகள் பூங்காவில் ஆடுகிறார்கள்.', '"Children play in the park."', null, [ACT.vocabularyVerbs]),

    // Grammar I
    createContentItem('Present tense formula', 'present tense formula', 'PATTERN: verb stem + -கிற்- (-kiṟ-) + agreement suffix. Example: saap-piṭu + kiṟ + ēṉ = cāppiṭukiṟēṉ. The -kiṟ- marker is invariant; only the agreement changes.', 'sentence', 'நான் சாப்பிடுகிறேன் (-ēṉ) · நீ சாப்பிடுகிறாய் (-āy) · அவன் சாப்பிடுகிறான் (-āṉ) · அவள் சாப்பிடுகிறாள் (-āḷ) · அவர் சாப்பிடுகிறார் (-ār) · அது சாப்பிடுகிறது (-atu) · நாங்கள் சாப்பிடுகிறோம் (-ōm) · நீங்கள் சாப்பிடுகிறீர்கள் (-īrkaḷ) · அவர்கள் சாப்பிடுகிறார்கள் (-ārkaḷ)', '9 forms covering person + number + gender + honor — all built from one stem + one tense marker + one agreement.', [{ target: 'stem', note: 'unchanged across tenses for most verbs (some stem sandhi)' }, { target: '-kiṟ-', note: 'present-tense marker, invariant' }, { target: 'agreement', note: '9 endings; mandatory' }], [ACT.grammarPresent]),
    createContentItem('Centhamizh vs Koduntamizh present', 'register present', 'Centhamizh (formal): -கிறேன் -kiṟēṉ, etc. Koduntamizh (spoken): contracted forms — Chennai vaṟēṉ, Madurai vaṟēṉ but with regional vowels.', 'sentence', 'வருகிறேன் (formal) → வரேன் / வரோம் (spoken contraction)\nஇருக்கிறேன் (formal) → இருக்கேன் / இருக்கு (very colloquial 3rd-neuter)', 'News broadcasts use the formal; friends use the spoken; the two are mutually intelligible but stylistically distinct.', null, [ACT.grammarPresent]),

    // Grammar II
    createContentItem('-ஆக adverbializer', '-āka adverb', 'Form an adverb by adding -ஆக (-āka) to an adjective or noun. vēkam (speed) → vēkamāka (quickly); naṉṟu (good) → naṉṟāka (well); maṭṭum (only) → maṭṭumāka.', 'sentence', 'அவர் வேகமாக ஓடுகிறார். avar vēkamāka ōṭukiṟār.', '"He/she runs quickly."', [{ target: 'noun + āka', note: 'turns noun into manner adverb' }, { target: 'adj + āka', note: 'turns adjective into adverb' }, { target: '-mā-ka simplification', note: 'in spoken Tamil, -āka often → -ā: vēkamā ōṭuṟār' }], [ACT.grammarAdverbs]),

    // Grammar III
    createContentItem('Verbal participle (verb + -நு / -த்து)', 'verbal participle', 'To say "having done X, then Y", use the verbal participle: verb-stem with -நு (-nu) or -த்து (-ttu) ending, depending on verb class. சாப்பிடு → சாப்பிட்டு (having eaten); படி → படித்து (having studied).', 'sentence', 'நான் சாப்பிட்டு படிக்கிறேன். nāṉ cāppiṭṭu paṭikkiṟēṉ.', '"Having eaten, I study." = "I eat then study." Tamil chains actions this way constantly.', [{ target: 'class 1', note: 'verb + -ttu: paṭi → paṭittu' }, { target: 'class 2', note: 'verb + -ṭṭu: cāppiṭu → cāppiṭṭu' }, { target: 'class 3', note: 'verb + -ñcu/-ndu: pō → pōy (irregular)' }], [ACT.grammarSequence]),
    createContentItem('பிறகு / முன்னர்', 'piṟaku / muṉṉar', 'After (that) / before. Use either alone as a sequencer or attached after a verbal participle: VPart + piṟaku = "after VERB-ing".', 'sentence', 'நான் சாப்பிட்ட பிறகு படிக்கிறேன். (after-eating-then-study)\nநான் படிப்பதற்கு முன்னர் சாப்பிடுகிறேன். (eat-before-studying)', 'Sequencing with these two words is the backbone of narrating any routine.', null, [ACT.grammarSequence]),

    // Reading
    createContentItem('என் ஒரு நாள்', 'eṉ oru nāḷ', 'A 5-sentence daily-routine paragraph in Tamil.', 'sentence', 'நான் காலை 6 மணிக்கு எழுந்திருக்கிறேன். குளித்து, காலை உணவு சாப்பிடுகிறேன். 8 மணிக்கு பல்கலைக்கழகத்துக்கு போகிறேன். வகுப்புகள் முடிந்த பிறகு, மாலையில் கடற்கரையில் நடக்கிறேன். இரவு 11 மணிக்கு தூங்குகிறேன்.', 'Translation: "I wake up at 6 AM. Having bathed, I eat breakfast. At 8 I go to the university. After classes end, in the evening I walk on the beach. I sleep at 11 PM."', [{ target: 'எழுந்திருக்கிறேன்', note: 'wake-up present 1sg' }, { target: 'குளித்து', note: 'verbal participle "having bathed"' }, { target: 'காலை உணவு', note: '"morning meal" = breakfast' }, { target: 'வகுப்புகள் முடிந்த பிறகு', note: '"after classes ended"; muṭi = end + past relative participle' }], [ACT.reading]),

    // Listening
    createContentItem('இரண்டு நண்பர்கள்', 'iraṇṭu naṇparkaḷ', '5-turn dialogue between Anna University friends comparing routines.', 'conversation', 'முருகன்: காலை எத்தனை மணிக்கு எழுந்தாய்?\nசாரா: ஐந்தரை மணிக்கு. நீ?\nமுருகன்: நான் 7 மணிக்கு. நீ காலையில் என்ன செய்கிறாய்?\nசாரா: ஓடுகிறேன், குளிக்கிறேன், காலை உணவு சாப்பிடுகிறேன். பிறகு பல்கலைக்கழகம் போகிறேன்.\nமுருகன்: நீ வேகமாக நடக்கிறாய்! நான் சோம்பேறி.', 'Note intimate -āy ending used between friends; Sara uses informal style throughout.', [{ target: 'எத்தனை மணிக்கு', note: '"at how many o\'clock" = "at what time"' }, { target: 'என்ன செய்கிறாய்?', note: '"what do you (intimate) do?"' }, { target: 'சோம்பேறி', note: 'cōmpēṟi = "lazy person"; common Tamil teasing word' }], [ACT.listening]),

    // Writing
    createContentItem('உங்கள் நாள்', 'uṅkaḷ nāḷ', 'Write 5-6 sentences describing your typical day. Use 4+ verbs, 2 time markers, 1 sequencer.', 'sentence', 'மாதிரி: நான் காலை [நேரம்]க்கு எழுந்திருக்கிறேன். [verb]கிறேன், [verb]கிறேன். மதியம் [verb]கிறேன். பிறகு [verb]கிறேன். இரவு [நேரம்]க்கு தூங்குகிறேன்.', 'Fill the bracketed slots; read aloud with correct agreement.', null, [ACT.writing]),

    // Culture
    createContentItem('தமிழ் தினசரி தாளம்', 'tamiḻ tiṉacari tāḷam', 'Tamil daily rhythm: dawn kolam (rangoli rice-flour patterns drawn at house entrances), filter-coffee morning, idli/dosa breakfast, late lunch (rice + sambar + rasam at 1-2 PM), evening tiffin (4-5 PM), late dinner (8-9 PM). Hostel students adapt with mess-meal timings.', 'sentence', 'தமிழ் வீட்டில் காலையில் காப்பி தயார் ஆனால் ஒரு நாள் தொடங்கியது.', '"In a Tamil home, the day begins when the coffee is ready." Filter coffee is iconic; tea is also common.', null, [ACT.culture]),
    createContentItem('கோலம்', 'kōlam', 'The kolam — rice-flour pattern drawn at dawn outside the house entrance by women of the household. A daily artistic and spiritual practice; varieties include pulli kolam (dot-grid) and rangoli (colored). Anna Nagar streets are famous for elaborate kolams.', 'sentence', 'என் அம்மா தினமும் வாசலில் கோலம் போடுகிறார்.', '"My mother draws a kolam at the doorstep every day."', null, [ACT.culture]),

    // Task
    createContentItem('பணி: உங்கள் நாள் சொல்லுங்கள்', 'paṇi: uṅkaḷ nāḷ colluṅkaḷ', 'Tell your day to the AI tutor playing a curious classmate. Use all verbs and time markers from this lesson.', 'conversation', 'நண்பன்: காலை எத்தனை மணிக்கு எழுந்தாய்?\nநீ: [answer with time + verb]\nநண்பன்: காலை உணவு என்ன சாப்பிட்டாய்?\nநீ: [answer]\nநண்பன்: மதியம் என்ன பண்ணினாய்?\nநீ: [answer with sequence]\nநண்பன்: மாலையில்?\nநீ: [answer]', '6+ turn schedule narrative.', [{ target: 'opening', note: 'time-loc + verb' }, { target: 'sequence', note: 'verbal-participle + piṟaku' }, { target: 'closing', note: 'irāvu + sleep verb' }], [ACT.task]),
  ],
};

module.exports = lesson;
