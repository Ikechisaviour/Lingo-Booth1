// Level 1 — Foundation: Russian Cyrillic, Sounds & Stress
// First lesson on the Russian / Foundation track. Pre-grammar, pre-vocabulary.
// Covers the Cyrillic alphabet (33 letters), the hard/soft consonant system,
// vowel reduction (akanye, ikanye), phonemic stress, final devoicing, the
// palatalization that defines Russian phonology, and the basic spelling rules
// a learner needs to read Cyrillic aloud confidently.
//
// All content is authored with Cyrillic (target) + scientific transliteration
// (romanization) + English glosses (canonical source). The AI conversation
// tutor reads this curriculum and delivers it to each learner in their
// preferred native language at runtime — never assume a specific L1.
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
  // Legacy keys for UI fallback — the "korean" slot holds the target text,
  // the "english" slot holds the note.
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  intro: 'ru-foundation-intro',
  alphabetVowels: 'ru-foundation-alphabet-vowels',
  alphabetConsonants: 'ru-foundation-alphabet-consonants',
  alphabetSigns: 'ru-foundation-alphabet-signs',
  stress: 'ru-foundation-stress',
  reduction: 'ru-foundation-reduction',
  palatalization: 'ru-foundation-palatalization',
  devoicing: 'ru-foundation-devoicing',
  spellingRules: 'ru-foundation-spelling-rules',
  cursiveHandwriting: 'ru-foundation-cursive',
  readingPractice: 'ru-foundation-reading-practice',
  miniGreeting: 'ru-foundation-mini-greeting',
};

const activities = [
  {
    id: ACT.intro,
    section: 'Why Cyrillic & Sounds',
    title: 'Кириллица — How Russian sounds are organized',
    goals: [
      'Understand that Russian uses the Cyrillic alphabet (33 letters), of which roughly a third look familiar to Latin readers but often have different sound values (P=R, H=N, B=V).',
      'See that Russian phonology is built on three pillars: phonemic stress (one vowel per word is stressed and the rest reduce), the hard/soft consonant distinction (palatalization), and final devoicing.',
      'Know that you cannot read Russian aloud from spelling alone without knowing where the stress falls — stress placement is unpredictable and changes the pronunciation of every other vowel.',
    ],
    task: 'Read the four structural facts. By the end of this lesson you should be able to read a Cyrillic word aloud, applying stress, reduction, and palatalization automatically.',
  },
  {
    id: ACT.alphabetVowels,
    section: 'Cyrillic Vowels',
    title: 'Гласные — The 10 Russian vowel letters',
    goals: [
      'Recognize the five HARD-row vowels (а э ы о у) which keep the preceding consonant hard.',
      'Recognize the five SOFT-row vowels (я е и ё ю) which palatalize (soften) the preceding consonant and at the start of a word or after another vowel add a /j/ glide.',
      'Pair the hard/soft rows: а/я, э/е, ы/и, о/ё, у/ю — each pair represents the same vowel quality with different effects on the preceding consonant.',
    ],
    task: 'Read each vowel aloud, then read the hard/soft pair contrasts (мать/мять, лук/люк) to feel how the same vowel sound depends on the consonant that precedes it.',
  },
  {
    id: ACT.alphabetConsonants,
    section: 'Cyrillic Consonants',
    title: 'Согласные — The 21 Russian consonant letters',
    goals: [
      'Read all 21 Russian consonant letters, with special attention to the false-friend letters that look Latin but sound different: В=v, Н=n, Р=r, С=s, Х=kh, У=u.',
      'Distinguish the paired voiced/voiceless consonants (б/п, в/ф, г/к, д/т, ж/ш, з/с) — voicing alternates in final position (final devoicing) and across morpheme boundaries.',
      'Pronounce the unique-to-Russian sounds: щ (a long soft sh, like "fresh cheese" run together), ц (ts as in "cats"), ч (ch as in "cheek"), х (a velar fricative like German "Bach"), ж (zh as in "measure").',
    ],
    task: 'Read each consonant aloud paired with а (ба, ва, га, да…) and then with я (бя, вя, гя, дя…) to feel hard vs soft.',
  },
  {
    id: ACT.alphabetSigns,
    section: 'The Two Silent Signs',
    title: 'Ъ и Ь — Hard sign and soft sign',
    goals: [
      'Use Ь (мягкий знак, "soft sign") at the end of a word or before a hard vowel to MARK the preceding consonant as soft (palatalized): мать (mother) vs мат (chess-mate); брат (brother) vs брать (to take).',
      'Use Ъ (твёрдый знак, "hard sign") to BLOCK palatalization between a prefix ending in a hard consonant and a soft-row vowel: подъезд (entryway), объект (object) — without ъ the д/б would soften.',
      'Know that BOTH signs have NO sound of their own — they only modify the consonant they follow.',
    ],
    task: 'Read 8 minimal pairs (мать/мат, брат/брать, угол/уголь, кров/кровь) aloud and identify which consonant is hard and which is soft in each.',
  },
  {
    id: ACT.stress,
    section: 'Phonemic Stress',
    title: 'Ударение — Why stress is half of Russian pronunciation',
    goals: [
      'Recognize that Russian stress is PHONEMIC: it distinguishes word meaning, as in зАмок (castle) vs замОк (lock), or мУка (torment) vs мукА (flour). Wrong stress = wrong word.',
      'Know that Russian stress is unpredictable from spelling (unlike Polish or Czech) — every new noun must be learned with its stress, and stress can shift across grammatical forms (рукА nom sg vs рУки nom pl).',
      'Understand that unstressed vowels REDUCE — Russian spelling preserves the underlying vowel but speech weakens it (молоко spelled m-o-l-o-k-o but spoken "ma-la-KO").',
    ],
    task: 'Read 10 minimal-pair words where stress alone changes meaning, then mark the stressed vowel in each one.',
  },
  {
    id: ACT.reduction,
    section: 'Vowel Reduction',
    title: 'Аканье — How unstressed О becomes A',
    goals: [
      'Apply аканье: unstressed О in standard Moscow Russian is pronounced as /a/ — молоко spelled m-o-l-o-k-o is spoken "malakó". This is the most audible feature of educated Moscow speech.',
      'Apply иканье: unstressed Е and Я merge toward /i/ — петух (rooster) → "pitukh", язык (language) → "izyk" in fast speech.',
      'Recognize the three-tier reduction system: stressed (full vowel), first pretonic (light reduction), other unstressed (heavy reduction toward schwa /ə/).',
    ],
    task: 'Read 8 multi-syllable words (молоко, голова, хорошо, собака, корова) aloud applying аканье and иканье — mark which syllables reduce and which keep their full vowel.',
  },
  {
    id: ACT.palatalization,
    section: 'Palatalization (Soft Consonants)',
    title: 'Мягкость — The hard/soft split that defines Russian',
    goals: [
      'Understand that almost every Russian consonant comes in HARD and SOFT versions — soft consonants are pronounced with the tongue raised toward the palate, producing a subtle /j/-like glide.',
      'Trigger softening with: a following soft-row vowel (я е и ё ю) OR a following soft sign (ь). Hard by default elsewhere.',
      'Hear the difference: мат /mat/ (chess-mate, hard) vs мать /matʲ/ (mother, soft); брат /brat/ (brother, hard) vs брать /bratʲ/ (to take, soft); кон /kon/ (game-round) vs конь /konʲ/ (horse).',
    ],
    task: 'Read 12 hard/soft pairs aloud and identify by ear which consonant in each is palatalized.',
  },
  {
    id: ACT.devoicing,
    section: 'Final Devoicing',
    title: 'Оглушение — When voiced consonants go voiceless at word-end',
    goals: [
      'Apply final devoicing: a voiced consonant at the END of a word is pronounced as its voiceless counterpart — хлеб (bread) spelled with б but spoken "khlep"; муж (husband) spelled with ж but spoken "mush"; друг (friend) spelled with г but spoken "druk".',
      'Apply assimilatory devoicing: a voiced consonant before a voiceless one also devoices — водка (vodka) spelled v-o-d-k-a but spoken "votka"; автобус (bus) spelled a-v-t-o-b-u-s but spoken "aftobus".',
      'Apply assimilatory voicing: a voiceless consonant before a voiced one voices — сделать (to do) spelled s-d but spoken "zdelat".',
    ],
    task: 'Read 8 words where final devoicing or cluster assimilation changes the surface pronunciation from the spelling.',
  },
  {
    id: ACT.spellingRules,
    section: 'Spelling Rules',
    title: 'Правила правописания — Three rules that shape every word',
    goals: [
      'Apply the 7-letter rule: after к, г, х, ж, ш, щ, ч NEVER write ы — always write и (книги "books", not книгы).',
      'Apply the 5-letter rule: after ж, ш, щ, ч, ц in unstressed position, write Е not О (хорошее, not хорошое); in stressed position write О if it is the audible vowel (большой).',
      'Know that и after a hard consonant (ж, ш, ц) is actually pronounced as ы — жить (to live) sounds like "zhyt"; цирк (circus) sounds like "tsyrk".',
    ],
    task: 'Read 6 example words showing each rule and explain why the spelling differs from what plain phonetics would predict.',
  },
  {
    id: ACT.cursiveHandwriting,
    section: 'Cursive Handwriting',
    title: 'Прописные буквы — Why printed Russian and handwritten Russian look so different',
    goals: [
      'Recognize that handwritten Russian (used in schools, signatures, notes) differs significantly from printed: т looks like Latin "m", д looks like a fancy "g", п looks like "n", and в curls.',
      'Read three short handwritten phrases to know the form even if you do not write them yourself yet.',
      'Know that learners who only learn printed forms will be unable to read handwritten signs, doctor\'s notes, or personal letters — both forms are essential.',
    ],
    task: 'Match six printed-cursive letter pairs and read one short handwritten sentence aloud.',
  },
  {
    id: ACT.readingPractice,
    section: 'Reading Practice',
    title: 'Чтение — Read your first Cyrillic words',
    goals: [
      'Read 12 high-frequency Russian words aloud with correct stress, reduction, and palatalization — applying every rule from this lesson.',
      'Identify the stressed syllable in each before reading aloud to anchor the rest of the pronunciation.',
    ],
    task: 'Read each word three times: once focusing on stress, once on reduction, once at natural speed.',
  },
  {
    id: ACT.miniGreeting,
    section: 'Mini-Conversation',
    title: 'Здравствуйте — Your first Russian sentence aloud',
    goals: [
      'Read aloud the formal Russian greeting Здравствуйте (zdravstvuyte) — note the silent В in the middle (the standard educated pronunciation drops it: "zdrastvuyte").',
      'Compare the formal Здравствуйте with the casual Привет (privet) — these are the two phrases you will use most in your first month of Russian.',
      'Read Спасибо (spasibo, "thank you") and Пожалуйста (pozhaluysta, "please / you\'re welcome") — the two universal politeness markers in Russian.',
    ],
    task: 'Read each phrase three times, mark the stressed syllable, and identify any silent or reduced letters.',
  },
];

const lesson = {
  title: 'Level 1 · Foundation: Кириллица — Cyrillic, Sounds & Stress',
  category: 'foundation',
  difficulty: 'beginner',
  targetLang: 'ru',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'foundation',
  activities,
  expressionPractice: [
    { id: 'read-cyrillic', label: 'Read Cyrillic aloud', goal: 'Decode any printed Russian word — applying stress, reduction, and palatalization correctly.' },
    { id: 'mark-stress', label: 'Mark phonemic stress', goal: 'Identify where the stress falls in a new word and adjust vowel reduction accordingly.' },
    { id: 'hard-soft', label: 'Distinguish hard vs soft consonants', goal: 'Hear and produce the difference between мат and мать, брат and брать, кон and конь.' },
    { id: 'final-devoicing', label: 'Apply final devoicing', goal: 'Pronounce хлеб as "khlep", друг as "druk", and водка as "votka" without overthinking the spelling.' },
  ],
  relatedPools: ['topic-foundation', 'topic-pronunciation'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Цели урока',
      'Tseli uroka',
      'By the end of this lesson, you can decode any printed Russian word — applying phonemic stress, vowel reduction (аканье), hard/soft consonants, and final devoicing — even before you know the meaning. Reading Cyrillic out loud is the foundation that every later Russian lesson assumes.',
      'word',
      'Три столпа русской фонологии: ударение (stress), мягкость (palatalization), оглушение (devoicing).',
      'These three pillars — stress, palatalization, and devoicing — interlock to determine how every Russian word actually sounds.',
      null,
      [ACT.intro],
    ),
    createContentItem(
      'Реальный сценарий',
      'Realnyy stsenariy',
      'You are walking through a Moscow metro station (Метро) on your first day at МГУ (Lomonosov Moscow State University) and you need to read the station names off the wall: Театральная, Площадь Революции, Охотный ряд. Without stress and reduction skills, every name will sound robotic.',
      'word',
      'МГУ (М-Гэ-У) — Московский государственный университет имени М. В. Ломоносова.',
      'МГУ is one of the world\'s most prestigious universities; its main campus on Воробьёвы горы (Sparrow Hills) overlooks Moscow.',
      [
        { target: 'Театральная Teatralnaya', note: 'literally "Theater" (station near the Bolshoi Theatre); stress falls on the third syllable -ра-' },
        { target: 'Площадь Революции Ploshchad Revolyutsii', note: '"Revolution Square" — стресс on -лю- in the second word; final ь softens д in площадь' },
        { target: 'Охотный ряд Okhotnyy ryad', note: '"Hunters\' Row" — older name of the metro station; final д devoices to /t/ in ряд' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'Кириллица — 33 буквы',
      'Kirillitsa — 33 bukvy',
      'The Cyrillic alphabet has 33 letters: 10 vowels (5 hard + 5 soft), 21 consonants, and 2 silent signs (ъ ь). About 10 letters look familiar to Latin readers and have the SAME sound (А, К, М, О, Т), about 7 look familiar but sound DIFFERENT (В=v, Н=n, Р=r, С=s, У=u, Х=kh, Е=ye), and the rest are uniquely Cyrillic.',
      'word',
      'А Б В Г Д Е Ё Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я',
      'Each row of three reading: А Б В = "a be ve", Г Д Е = "ge de ye", Ё Ж З = "yo zhe ze"…',
      [
        { target: 'Same shape, same sound (≈10)', note: 'А К М О Т — these you already know by sight and sound from Latin script' },
        { target: 'Same shape, different sound (≈7)', note: 'В=v Н=n Р=r С=s У=u Х=kh Е=ye — the false-friend traps for new readers' },
        { target: 'Uniquely Cyrillic (≈16)', note: 'Б Г Д Ж З И Л П Ф Ц Ч Ш Щ Ы Э Ю Я — these have no Latin shape equivalent and must be memorized from scratch' },
      ],
      [ACT.intro],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Cyrillic Vowels
    // ────────────────────────────────────────────────────────────────────
    createContentItem('А а', 'a', 'Hard-row vowel /a/, exactly like the "a" in Spanish "casa" or English "father". Keeps the preceding consonant HARD. Appears in мама ("mom"), да ("yes"), наш ("our"). Spelled with the same shape as Latin A.', 'word', 'мама mama — "mom"; both а\'s are written but only the stressed one is fully /a/, the unstressed one reduces toward schwa.', 'Even in this most basic word, vowel reduction applies: the first а is stressed and clear, the second а is unstressed and weakened.', null, [ACT.alphabetVowels]),
    createContentItem('Я я', 'ya', 'Soft-row counterpart of а. After a consonant: palatalizes that consonant + /a/ (мяч "myach" = "ball"). At the start of a word or after a vowel: pronounced /ja/ (я "ya" = "I", маяк "mayak" = "lighthouse").', 'word', 'я ya ("I") vs мяч myach ("ball")', 'Two faces of я: word-initial /ja/ glide vs post-consonant palatalizer.', [
      { target: 'я word-initial = /ja/', note: 'pronounced with full /j/ glide as in "yacht"' },
      { target: 'мя post-consonant = /mʲa/', note: 'm is palatalized (soft); a is the same vowel as in мать, but the consonant changes' },
    ], [ACT.alphabetVowels]),
    createContentItem('О о', 'o', 'Hard-row vowel /o/ when stressed, but reduces to /a/ when unstressed (аканье). Stressed: дом /dom/ ("house"). Unstressed: молоко /mɐlɐˈko/ ("malako", "milk") — only the final о is stressed and pronounced /o/.', 'word', 'молоко moloko spoken "malakó" — three о\'s written, only one о sound spoken.', 'This is аканье at work: unstressed о merges with а sound; only the stressed о keeps its /o/ quality.', null, [ACT.alphabetVowels]),
    createContentItem('Ё ё', 'yo', 'Soft-row counterpart of о. ALWAYS stressed when present — Russian words have at most one ё and the stress automatically falls on it. Often printed as plain е (the diaeresis is widely dropped); learners must guess from context whether е means /je/ or /jo/.', 'word', 'ёлка yolka ("fir tree, Christmas tree") · всё vsyo ("everything")', 'Stressed by default; commonly written as е in newspapers, books, and most modern text — a major reading trap.', [
      { target: 'ё ALWAYS stressed', note: 'never reduces; stress automatically falls here when ё appears in a word' },
      { target: 'ё often written as е', note: 'in 90% of modern Russian text, the dots are dropped — a major reading challenge for learners' },
    ], [ACT.alphabetVowels]),
    createContentItem('Э э', 'e', 'Hard-row vowel /ɛ/, like English "e" in "met". Rare letter, used mostly at the start of borrowed words (этаж "floor", экзамен "exam", элемент "element") or as the second part of diphthong-like spellings.', 'word', 'это eto ("this") — high-frequency demonstrative; pronounced /ˈeto/.', 'One of the most frequent words in beginner Russian; the only common everyday word that uses initial э.', null, [ACT.alphabetVowels]),
    createContentItem('Е е', 'ye', 'Soft-row counterpart of э. After a consonant: palatalizes + /e/ (нет "nyet" = "no"). Word-initial or after a vowel: /je/ glide (есть "yest" = "to eat / there is"). Far more common than Э.', 'word', 'нет nyet ("no") vs есть yest ("to eat / there is")', 'Same vowel quality, two roles depending on position: palatalizer after a consonant, /j/-glide at word start or after a vowel.', null, [ACT.alphabetVowels]),
    createContentItem('Ы ы', 'y', 'Hard-row vowel — a uniquely Russian sound. Made by saying /i/ but pulling the tongue back as if saying /u/. Roughly the vowel in English "ill" produced with a dark back tongue. Always keeps the preceding consonant hard.', 'word', 'мы my ("we") · ты ty ("you, informal singular") · сын syn ("son")', 'Three of the most common Russian words use ы; learners often hear it as a flat /i/ at first, but the back-tongue quality is what natives pick up on.', null, [ACT.alphabetVowels]),
    createContentItem('И и', 'i', 'Soft-row counterpart of ы. Palatalizes the preceding consonant and is pronounced /i/. By the 7-letter rule, и is also used after к г х ж ш щ ч (after ж ш ц it is pronounced as ы, not i — a major spelling-pronunciation mismatch).', 'word', 'или ili ("or") · книги knigi ("books") · жить zhit\' ("to live")', 'Standard /i/ in или and книги; but in жить the и after ж sounds like ы.', [
      { target: 'и after most consonants = /i/', note: 'soft palatalized i' },
      { target: 'и after ж ш ц = /ɨ/ (=ы)', note: 'жить sounds like "zhyt"; цирк sounds like "tsyrk" — spelling-pronunciation mismatch' },
    ], [ACT.alphabetVowels]),
    createContentItem('У у', 'u', 'Hard-row vowel /u/, like English "u" in "boot" or Spanish "u" in "luna". Keeps the preceding consonant hard. Spelled like Latin Y but pronounced /u/.', 'word', 'утро utro ("morning") · стул stul ("chair")', 'Visually identical to Latin Y, which is one of the most common decoding traps for new readers.', null, [ACT.alphabetVowels]),
    createContentItem('Ю ю', 'yu', 'Soft-row counterpart of у. After a consonant: palatalizes + /u/ (люди "lyudi" = "people"). Word-initial or after a vowel: /ju/ glide (юг "yug" = "south").', 'word', 'люди lyudi ("people") vs юг yug ("south")', 'Two roles depending on position, like the other soft-row vowels.', null, [ACT.alphabetVowels]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Cyrillic Consonants
    // ────────────────────────────────────────────────────────────────────
    createContentItem('Б б', 'b', 'Voiced bilabial stop /b/. Devoices to /p/ at the end of a word (хлеб spelled with б but spoken "khlep"). Pairs with п (voiceless counterpart).', 'word', 'брат brat ("brother") · хлеб khleb spoken "khlep"', 'Voicing alternation: word-initial brat keeps /b/, word-final khleb devoices to /p/.', null, [ACT.alphabetConsonants]),
    createContentItem('В в', 'v', 'Voiced labiodental fricative /v/. False friend: looks like Latin B but sounds like /v/. Devoices to /f/ at word end (Иванов is spoken "Ivanof" — important for Russian name pronunciation).', 'word', 'вода voda ("water") · Иванов Ivanov spoken "Ivanof"', 'The most common Russian surname suffix -ов/-ев is pronounced -of/-ef due to final devoicing.', null, [ACT.alphabetConsonants]),
    createContentItem('Г г', 'g', 'Voiced velar stop /g/, like English "g" in "go". Devoices to /k/ at word end (друг is spoken "druk"). In a handful of high-frequency words, intervocalic г is pronounced /v/: его (his/him) sounds like "yivo", сегодня (today) sounds like "sivodnya".', 'word', 'город gorod ("city") · друг drug spoken "druk" · его yego spoken "yivo"', 'The /v/ pronunciation of г in possessive endings (-его, -ого) is one of the most learner-confusing rules; memorize the words rather than the rule.', [
      { target: 'г default = /g/', note: 'as in город, газета, гулять' },
      { target: 'г at word end = /k/', note: 'final devoicing: друг → "druk", вторник → "ftornik"' },
      { target: 'г in -его/-ого = /v/', note: 'masculine genitive ending and a few common words; учебник его → "yivo", сегодня → "sivodnya"' },
    ], [ACT.alphabetConsonants]),
    createContentItem('Д д', 'd', 'Voiced dental stop /d/, like English "d" but with the tongue more forward against the teeth. Devoices to /t/ at word end (год spoken "got"). Has a hard and soft version (д vs дь, with the soft heard before soft-row vowels and ь).', 'word', 'дом dom ("house") · год god spoken "got" · день dyen\' ("day")', 'Hard д in дом; soft д in день (where the soft sign палатализирует the consonant before /e/).', null, [ACT.alphabetConsonants]),
    createContentItem('Ж ж', 'zh', 'Voiced post-alveolar fricative /ʒ/, like English "s" in "measure". Always HARD — never palatalizes, even before и (which is pronounced as ы in this context). Devoices to /ʃ/ (ш) at word end (муж spoken "mush").', 'word', 'жить zhit\' spoken "zhyt" · муж muzh spoken "mush"', 'The hard-only nature of ж is critical: even when и follows, the consonant stays hard and the и shifts to /ɨ/.', null, [ACT.alphabetConsonants]),
    createContentItem('З з', 'z', 'Voiced alveolar fricative /z/, like English "z" in "zoo". Devoices to /s/ at word end (раз spoken "ras"). Has a soft version palatalized before soft-row vowels and ь.', 'word', 'здравствуйте zdravstvuyte ("hello, formal") · раз raz spoken "ras"', 'The famous formal greeting begins with з + д; in fast speech the В is dropped: "zdrastvuyte".', null, [ACT.alphabetConsonants]),
    createContentItem('Й й', 'y', 'Short i (и краткое); the consonantal /j/-glide. Always functions as a consonant — appears at the end of words (мой "moy" = "my") and in diphthongs (война "voyna" = "war"). Never starts a stressed syllable.', 'word', 'мой moy ("my") · война voyna ("war") · музей muzey ("museum")', 'Й always behaves like a consonant despite the i-like shape; it forms diphthong codas, not syllable nuclei.', null, [ACT.alphabetConsonants]),
    createContentItem('К к', 'k', 'Voiceless velar stop /k/, like English "k". Pairs with г (voiced). Triggers the 7-letter rule: NEVER write ы after к (write книги, not книгы).', 'word', 'книга kniga ("book") · кошка koshka ("cat")', '7-letter rule means plural of книга is книги (with и) not книгы.', null, [ACT.alphabetConsonants]),
    createContentItem('Л л', 'l', 'Lateral approximant /l/. Russian has a clear hard-soft contrast: hard л is "dark" (with tongue retracted, like Polish ł or English "ll" in "ball"); soft ль is "clear" (with tongue forward, like Italian "gli").', 'word', 'лук luk ("onion, bow") vs люк lyuk ("hatch")', 'Hard vs soft л is one of the easier hard/soft pairs to hear for English speakers: dark vs light "l".', null, [ACT.alphabetConsonants]),
    createContentItem('М м', 'm', 'Bilabial nasal /m/, same as English. Has a hard and soft version. Spelled like Latin M, sounds like Latin M — one of the few completely uneventful letters in the Cyrillic alphabet.', 'word', 'мама mama ("mom") · мир mir ("world, peace")', 'Universal sound; the same shape and value as Latin M.', null, [ACT.alphabetConsonants]),
    createContentItem('Н н', 'n', 'Alveolar nasal /n/. False friend: looks like Latin H but sounds like /n/. Hard and soft versions; soft нь appears in words like день, конь, осень.', 'word', 'нет nyet ("no") · день dyen\' ("day") · конь kon\' ("horse")', 'The most-confused false friend for new readers — H-shape but N-sound.', null, [ACT.alphabetConsonants]),
    createContentItem('П п', 'p', 'Voiceless bilabial stop /p/. Pairs with б. Spelled like Greek π. Standard /p/ sound with hard and soft versions.', 'word', 'папа papa ("dad") · пять pyat\' ("five")', 'Hard п in папа; soft пь in пять (where ть also softens the t).', null, [ACT.alphabetConsonants]),
    createContentItem('Р р', 'r', 'Trilled alveolar /r/, like Spanish "r" in "perro" or Italian "r" in "Roma". False friend: looks like Latin P but sounds like a rolled /r/. One of the hardest sounds for English speakers to produce.', 'word', 'Россия Rossiya ("Russia") · хорошо khorosho ("well, good") · брат brat ("brother")', 'Trilled р is part of Russian identity — broadcasters and actors are trained to produce a strong rolling р.', null, [ACT.alphabetConsonants]),
    createContentItem('С с', 's', 'Voiceless alveolar fricative /s/. False friend: looks like Latin C but sounds like /s/. Pairs with з.', 'word', 'спасибо spasibo ("thank you") · сын syn ("son")', 'спасибо literally means "save God" (спаси Бог) — historically a contraction.', null, [ACT.alphabetConsonants]),
    createContentItem('Т т', 't', 'Voiceless dental stop /t/. Has a hard and soft version; soft ть appears in infinitives and in words like мать, путь.', 'word', 'там tam ("there") · мать mat\' ("mother") · путь put\' ("way, path")', 'All Russian verb infinitives end in -ть, -ти, or -чь — the soft т is everywhere in the verb system.', null, [ACT.alphabetConsonants]),
    createContentItem('Ф ф', 'f', 'Voiceless labiodental fricative /f/. Pairs with в. Less common than other consonants; appears mostly in borrowed words (телефон, фабрика, фотография).', 'word', 'фото foto ("photo") · кофе kofe ("coffee")', 'Most words with ф are loanwords from Greek or Western European languages; native Slavic vocabulary has very few /f/ sounds.', null, [ACT.alphabetConsonants]),
    createContentItem('Х х', 'kh', 'Voiceless velar fricative /x/, like German "ch" in "Bach" or Scottish "ch" in "loch". NOT the English "h" sound. False friend: looks like Latin X but sounds like /x/.', 'word', 'хорошо khorosho ("well") · хлеб khleb spoken "khlep"', 'The velar х is one of the most distinctive Russian sounds; English speakers often substitute /h/ but natives hear the difference immediately.', null, [ACT.alphabetConsonants]),
    createContentItem('Ц ц', 'ts', 'Voiceless alveolar affricate /ts/, like English "ts" in "cats" or German "z" in "Zeit". Always HARD — never palatalizes. After ц, и is pronounced as ы.', 'word', 'центр tsentr ("center") · отец otets ("father")', 'Hard-only nature: центр is pronounced "tsentr" but the е behaves as if after a hard consonant.', null, [ACT.alphabetConsonants]),
    createContentItem('Ч ч', 'ch', 'Voiceless post-alveolar affricate /tʃʲ/, like English "ch" in "cheek". Always SOFT — even when followed by hard-row letters, the soft quality remains.', 'word', 'час chas ("hour") · чай chay ("tea")', 'Always-soft nature: ч + а is read as /tʃʲa/ even though а is a hard-row vowel.', null, [ACT.alphabetConsonants]),
    createContentItem('Ш ш', 'sh', 'Voiceless post-alveolar fricative /ʃ/, like English "sh" in "shoe", but produced with the tongue further back and "darker" in quality. Always HARD. After ш, и is pronounced as ы.', 'word', 'школа shkola ("school") · машина mashina ("car")', 'Russian ш is deeper and darker than English "sh" — phoneticians describe it as retracted.', null, [ACT.alphabetConsonants]),
    createContentItem('Щ щ', 'shch', 'Voiceless post-alveolar fricative /ɕː/ — a LONG soft sh, like running together "fresh cheese" or the German "ch" in "ich" stretched out. Always SOFT, always long.', 'word', 'борщ borshch ("borscht") · ещё yeshchyo ("still, yet")', 'The trickiest Cyrillic sound for English speakers; takes most learners several weeks to produce naturally.', null, [ACT.alphabetConsonants]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — The Two Silent Signs
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Ь — мягкий знак',
      'Myagkiy znak — soft sign',
      'The SOFT SIGN ь has no sound of its own. It marks the preceding consonant as SOFT (palatalized). Appears at the end of a word (мать, день, путь) or in the middle before a hard-row vowel (письмо "pismo" = "letter"). Critical for verbs: every infinitive ends in -ть or -ти.',
      'word',
      'мать mat\' ("mother") vs мат mat ("chess-mate"): same letters, different soft sign, completely different words.',
      'The most common minimal pair contrast in Russian — ь changes meaning by changing only the softness of the final consonant.',
      [
        { target: 'мать = mother (soft т)', note: 'palatalized final t; standard family word' },
        { target: 'мат = chess-mate / obscene language (hard т)', note: 'unpalatalized final t; completely different meaning' },
      ],
      [ACT.alphabetSigns],
    ),
    createContentItem(
      'Ъ — твёрдый знак',
      'Tvyordyy znak — hard sign',
      'The HARD SIGN ъ has no sound of its own. It BLOCKS palatalization between a prefix (ending in a consonant) and a soft-row vowel (я е ё ю и) in the root. Common in prefix-root compounds: подъезд (entryway, под- + езд), объект (object, об- + ект), съесть (to eat up, с- + есть).',
      'word',
      'подъезд podyezd ("entryway, building entrance") — without ъ, the д would soften before -езд.',
      'Used to be much more frequent in pre-1918 Russian (written at the end of every word ending in a hard consonant); now restricted to prefix-root boundaries.',
      [
        { target: 'без ъ: подезд would be wrong', note: 'spelling rule requires ъ to keep prefix-final consonant hard' },
        { target: 'с ъ: подъезд = "pod-yezd"', note: 'pronounced with a clean /j/ glide and hard д preceding it' },
      ],
      [ACT.alphabetSigns],
    ),
    createContentItem(
      'Минимальные пары',
      'Minimalnye pary — minimal pairs',
      'Eight classic minimal pairs that demonstrate the soft sign\'s power to distinguish words. Each pair has identical consonants and vowels — only the presence/absence of ь changes the meaning. Master these to feel the hard/soft distinction.',
      'sentence',
      'мать/мат · брат/брать · угол/уголь · кров/кровь · мел/мель · кон/конь · ел/ель · вес/весь',
      'Each pair: same letters minus ь, completely different word. The exercise that proves palatalization is phonemic in Russian.',
      [
        { target: 'мать / мат', note: 'mother / chess-mate' },
        { target: 'брат / брать', note: 'brother / to take (verb infinitive)' },
        { target: 'угол / уголь', note: 'corner / coal' },
        { target: 'кров / кровь', note: 'shelter / blood' },
        { target: 'мел / мель', note: 'chalk / shoal (shallow water)' },
        { target: 'кон / конь', note: 'game-round / horse' },
        { target: 'ел / ель', note: 'ate (past masc) / fir tree' },
        { target: 'вес / весь', note: 'weight / all, the entire' },
      ],
      [ACT.alphabetSigns],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Phonemic Stress
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Ударение',
      'Udareniye — stress',
      'Russian has FREE phonemic stress: any syllable in a word can be stressed, and the position is not predictable from spelling. Stress is also MOBILE — the same root can shift stress across grammatical forms (рукА "hand" nom sg → рУки "hands" nom pl). Wrong stress is often the single most audible foreign-accent feature.',
      'word',
      'зАмок (castle, stress on first syllable) vs замОк (lock, stress on second syllable) — SAME spelling, different meaning.',
      'Stress is so important that beginner textbooks always mark it; native Russian text usually does NOT mark stress (the reader is expected to know).',
      [
        { target: 'зАмок = castle', note: 'stress on first syllable; о is full, second о reduces' },
        { target: 'замОк = lock', note: 'stress on second syllable; first о reduces toward /a/, second о is full' },
      ],
      [ACT.stress],
    ),
    createContentItem(
      'Минимальные пары по ударению',
      'Stress minimal pairs',
      'Six classic stress minimal pairs that demonstrate the meaning power of stress placement alone. Read each pair aloud, marking the stress mid-word — these are the same letters, same letters, only stress differs.',
      'sentence',
      'мУка/мукА · пИсать/писАть · пОтом/потОм · бЕлок/белОк · хлОпок/хлопОк · нОшу/ношУ',
      'Practice rotation: read each pair quickly and identify which member of the pair is which by stress alone.',
      [
        { target: 'мУка / мукА', note: 'torment / flour — first/second syllable stress' },
        { target: 'пИсать / писАть', note: 'to urinate / to write — first/second syllable stress; vulgarity risk if you mistress this verb' },
        { target: 'пОтом / потОм', note: 'with sweat (instr) / later, then — first/second syllable stress' },
        { target: 'бЕлок / белОк', note: 'squirrels (gen pl) / protein, egg-white — first/second syllable stress' },
      ],
      [ACT.stress],
    ),
    createContentItem(
      'Подвижное ударение',
      'Podvizhnoye udareniye — mobile stress',
      'Russian stress can SHIFT across grammatical forms of the same word. Common pattern: stress on the ending in singular, on the root in plural (рукА sg → рУки pl). Other patterns: stress on the root in nominative, on the ending in oblique cases. Memorize stress with each word; do not assume it stays fixed.',
      'sentence',
      'рукА (hand, nom sg) → рУки (hands, nom pl) · головА (head, nom sg) → гОловы (heads, nom pl)',
      'Stress shift is part of the morphology; learners who learn one form must learn the others separately.',
      null,
      [ACT.stress],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Vowel Reduction (Akanye)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Аканье',
      'Akanye',
      'Unstressed О in standard Moscow Russian is pronounced /a/ (in the first pretonic syllable) or schwa /ə/ (in other unstressed positions). Spelling preserves the underlying О, but pronunciation is /a/ — молоко spelled m-o-l-o-k-o, spoken "malakó" (only the stressed final о is /o/).',
      'word',
      'молоко moloko spoken "malakó" — three written о\'s, but only the stressed final one sounds like /o/.',
      'Аканье is THE defining feature of standard educated Moscow Russian; provincial dialects sometimes preserve /o/ in unstressed syllables (этим говорят на севере).',
      [
        { target: 'мо-ло-ко (written)', note: 'three identical о letters' },
        { target: 'мa-лa-ко (spoken)', note: 'first two reduce toward /a/; only stressed final is /o/' },
      ],
      [ACT.reduction],
    ),
    createContentItem(
      'Иканье',
      'Ikanye',
      'Unstressed Е and Я merge toward /i/ (or close to it) in unstressed positions. петух (rooster) spelled p-e-t-u-kh but spoken "pi-túkh"; язык (language) spelled ya-z-y-k but spoken "yi-zýk" in fast Moscow speech.',
      'word',
      'петух petukh spoken "pitúkh" · язык yazyk spoken "yizýk"',
      'Иканье is somewhat less universal than аканье; some careful speakers preserve /e/ even in unstressed position, especially in formal speech.',
      null,
      [ACT.reduction],
    ),
    createContentItem(
      'Три ступени редукции',
      'Three tiers of reduction',
      'Russian unstressed vowels reduce in THREE TIERS. Tier 1: stressed (full vowel quality). Tier 2: first pretonic syllable (light reduction, vowels stay recognizable). Tier 3: other unstressed positions (heavy reduction, often to schwa /ə/). Word: голова (head) — first syllable goes to /ə/, second to /a/, third (stressed) /a/.',
      'sentence',
      'голова golova spoken "gəlavá" — /ə/ + /a/ + /a/ (stressed); three different vowel qualities for one written vowel.',
      'Three-tier reduction is what makes Russian sound "rolling" — vowels gradient from light to full as you approach the stressed syllable.',
      [
        { target: 'голова tier-3 г-/ə/', note: 'far from stress = heavy reduction to schwa' },
        { target: 'голова tier-2 -ло-/a/', note: 'first pretonic = lighter reduction to /a/' },
        { target: 'голова tier-1 -вА/a/', note: 'stressed = full vowel' },
      ],
      [ACT.reduction],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Palatalization
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Мягкость',
      'Myagkost — softness / palatalization',
      'Russian consonants come in HARD (unpalatalized) and SOFT (palatalized) versions. Soft consonants are pronounced with the tongue raised toward the hard palate, producing a subtle /j/-like coloring. Triggered by: a following soft-row vowel (я е и ё ю) OR a following soft sign (ь). Hard by default elsewhere.',
      'sentence',
      'Hard: ма /ma/ (мать "mother" has soft т at end)\nSoft: мя /mʲa/ (мяч "ball" has soft м)',
      'Hard vs soft palatalization is the single most important phonological feature of Russian — and the hardest for English speakers to hear and produce.',
      [
        { target: 'Triggers softening: я е и ё ю ь', note: 'soft-row vowels + soft sign — the only triggers' },
        { target: 'Always hard: ж ш ц', note: 'these three never palatalize, even when soft-row letters follow' },
        { target: 'Always soft: ч щ й', note: 'these three never harden, even when hard-row letters follow' },
      ],
      [ACT.palatalization],
    ),
    createContentItem(
      'Пары твёрдый/мягкий',
      'Hard/soft pairs',
      'Twelve hard/soft minimal pairs to drill. Each pair has identical consonants except for the hard/soft distinction in the marked consonant. Listen carefully — the difference is real but subtle for English ears.',
      'sentence',
      'мат/мать · брат/брать · кон/конь · угол/уголь · вес/весь · мел/мель · ел/ель · хор/хорь · вон/вонь · стал/сталь · тот/тёть · нос/нёс',
      'Master these pairs and the hard/soft system stops being abstract — it becomes audible.',
      null,
      [ACT.palatalization],
    ),
    createContentItem(
      'Лук vs Люк',
      'Luk vs Lyuk',
      'A classic hard/soft pair for the consonant Л: лук /luk/ (onion / bow) has hard l (dark, with retracted tongue); люк /lʲuk/ (hatch) has soft l (clear, with tongue forward). The vowel sound is essentially the same /u/, only the л differs.',
      'word',
      'лук luk ("onion, bow") vs люк lyuk ("hatch / manhole cover")',
      'One of the easiest hard/soft contrasts for English speakers to hear: dark "l" (like Polish ł) vs clear "l" (like Italian "gli").',
      null,
      [ACT.palatalization],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Final Devoicing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Оглушение',
      'Oglushenie — final devoicing',
      'A voiced consonant at the END of a word is pronounced as its voiceless counterpart. Spelling preserves the underlying voiced consonant (хлеб with б), but speech devoices it (spoken "khlep"). Affects all six voiced/voiceless pairs: б→п, в→ф, г→к, д→т, ж→ш, з→с.',
      'sentence',
      'хлеб khleb → "khlep" (bread)\nдруг drug → "druk" (friend)\nраз raz → "ras" (one time)\nИванов Ivanov → "Ivanof" (surname)',
      'Critical for Russian name pronunciation: every -ов / -ев surname (Ivanov, Petrov, Medvedev) ends in /f/, not /v/.',
      [
        { target: 'б → п at word end', note: 'хлеб → "khlep"; столб → "stolp"' },
        { target: 'в → ф at word end', note: 'Иванов → "Ivanof"; кров → "krof"' },
        { target: 'г → к at word end', note: 'друг → "druk"; вторник → "ftornik"' },
        { target: 'д → т at word end', note: 'год → "got"; сад → "sat"' },
        { target: 'ж → ш at word end', note: 'муж → "mush"; нож → "nosh"' },
        { target: 'з → с at word end', note: 'раз → "ras"; глаз → "glas"' },
      ],
      [ACT.devoicing],
    ),
    createContentItem(
      'Ассимиляция по глухости',
      'Cluster devoicing',
      'A voiced consonant before a VOICELESS consonant in the same word also devoices. Spelling keeps the underlying voiced letter, speech devoices it. водка (vodka) is spoken "votka"; автобус (bus) is spoken "aftobus"; всё (all) is spoken "fsyo".',
      'sentence',
      'водка vodka → "votka"\nавтобус avtobus → "aftobus"\nвсё vsyo → "fsyo"',
      'The single word for "vodka" itself demonstrates the rule — its name in Russian is /votka/, not /vodka/.',
      null,
      [ACT.devoicing],
    ),
    createContentItem(
      'Ассимиляция по звонкости',
      'Cluster voicing',
      'The reverse also applies: a voiceless consonant before a VOICED consonant voices. сделать (to do) is written с-д but spoken /z/-/d/ = "zdelat"; футбол (football) is spoken "fudbol" in fast speech.',
      'sentence',
      'сделать sdelat → "zdelat"\nфутбол futbol → "fudbol" (fast speech)',
      'Less audible than final devoicing but still phonologically real; native speakers do it automatically.',
      null,
      [ACT.devoicing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Spelling Rules
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Правило 7 букв',
      '7-letter spelling rule',
      'After the seven letters К Г Х Ж Ш Щ Ч, NEVER write Ы — always write И. This explains why the plural of книга (book) is книги (with и, despite ы being the default hard plural), and why хорошие (good, masc pl) takes -ие not -ые.',
      'sentence',
      'книга → книги (plural; not "книгы")\nрука → руки (plural; not "рукы")\nкошка → кошки (plural; not "кошкы")',
      'A purely orthographic rule with no phonological reason — and so absolute that violating it is a sure sign of a non-native or a careless writer.',
      [
        { target: 'After К Г Х', note: 'velar consonants; и replaces ы in any plural/genitive ending' },
        { target: 'After Ж Ш Щ Ч', note: 'hushers; и replaces ы even though these consonants are mostly hard' },
      ],
      [ACT.spellingRules],
    ),
    createContentItem(
      'Правило 5 букв',
      '5-letter spelling rule',
      'After the five letters Ж Ш Щ Ч Ц, in UNSTRESSED position write Е not О (хорошее, not хорошое). In STRESSED position, write О if it is the audible vowel (большой). This explains a major class of adjective and noun endings.',
      'sentence',
      'большое (big, neuter, stressed-final) — write О\nхорошее (good, neuter, unstressed) — write Е, not О',
      'Apply by ear: if the ending is stressed, listen for /o/ or /a/; if unstressed, default to Е after these five letters.',
      null,
      [ACT.spellingRules],
    ),
    createContentItem(
      'И после Ж Ш Ц = Ы',
      'i posle Zh Sh Ts = y',
      'After the hard-only consonants Ж, Ш, and Ц, the letter И is pronounced as Ы. This is a sound-spelling mismatch: spelling preserves the historical И, pronunciation reflects the always-hard consonant.',
      'sentence',
      'жить zhit → "zhyt"\nшить shit → "shyt"\nцирк tsirk → "tsyrk"',
      'Almost every learner mispronounces these by saying "zhit" with a soft i; natives pull the vowel back to ы automatically.',
      null,
      [ACT.spellingRules],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Cursive Handwriting
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Прописные буквы',
      'Propisnye bukvy — cursive letters',
      'Russian cursive (the form taught in Russian schools and used in personal handwriting) differs dramatically from printed Russian. Many cursive letters resemble entirely different printed letters: т looks like Latin m, д looks like fancy g, п looks like n. Reading handwritten Russian requires learning cursive separately.',
      'sentence',
      'Printed: дом · Cursive: looks like "gom"\nPrinted: птица · Cursive: looks like "ntuya"',
      'Without cursive literacy, you cannot read handwritten signs, notes from friends, doctor\'s prescriptions, or 90% of personal correspondence in Russia.',
      [
        { target: 'т cursive ↔ m', note: 'cursive lowercase т is written exactly like Latin lowercase m' },
        { target: 'д cursive ↔ g-shape', note: 'cursive lowercase д has a loop below the baseline like Latin g' },
        { target: 'п cursive ↔ n', note: 'cursive lowercase п is written exactly like Latin lowercase n' },
        { target: 'в cursive ↔ B-curl', note: 'cursive lowercase в has a distinctive lower curl' },
      ],
      [ACT.cursiveHandwriting],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Reading Practice
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Чтение слов',
      'Chteniye slov — word reading',
      'Twelve high-frequency Russian words to read aloud. Each tests a different combination of the rules from this lesson: stress, reduction, palatalization, devoicing, and the spelling rules. Mark the stress, then read at natural speed.',
      'sentence',
      '1. молоко — "malakó"\n2. хорошо — "kharashó"\n3. спасибо — "spasíba"\n4. собака — "sabáka"\n5. книга — "kníga"\n6. хлеб — "khlep" (devoicing)\n7. друг — "druk" (devoicing)\n8. водка — "votka" (cluster devoicing)\n9. мать — "matʲ" (soft т)\n10. брат — "brat" (hard т)\n11. сегодня — "sivódnya" (г = /v/)\n12. жить — "zhyt" (и after ж = ы)',
      'Run through all 12 twice: once focusing on stress, once at fluent speed.',
      null,
      [ACT.readingPractice],
    ),
    createContentItem(
      'Чтение названий метро',
      'Reading metro station names',
      'Six real Moscow metro station names that combine every rule from this lesson. The Moscow metro is one of the largest reading laboratories for a Russian learner — read each name aloud applying stress, reduction, and devoicing.',
      'sentence',
      'Театральная — "Tiatrálnaya"\nПлощадь Революции — "Plóshchad Rivalyútsii"\nОхотный ряд — "Akhótnyy ryat" (final д devoices)\nКиевская — "Kíevskaya"\nКомсомольская — "Kamsamólskaya"\nВоробьёвы горы — "Varabyóvy góry"',
      'These six names cover акание, иканье, devoicing, palatalization, and the ё-stress rule.',
      null,
      [ACT.readingPractice],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Mini-Greeting
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Здравствуйте',
      'Zdravstvuyte',
      'The standard formal Russian greeting "hello". Long, consonant-heavy, and one of the first words every learner must master. In educated speech, the В after Д is dropped: "zdrastvuyte". Used with strangers, older people, authorities, and in any formal context.',
      'word',
      'Здравствуйте, профессор Иванов!',
      '"Hello, Professor Ivanov!" — standard polite greeting in academic and professional contexts.',
      [
      { target: 'Здравствуйте zdravstvuyte', note: 'formal/polite greeting; mandatory with strangers, elders, and authorities; literally "be healthy"' },
      { target: 'silent В', note: 'in normal speech, the В after Д is dropped: "zdrastvuyte"' },
        { target: 'stress on -ствуй-', note: 'second syllable; the rest reduces toward schwa' },
      ],
      [ACT.miniGreeting],
    ),
    createContentItem(
      'Привет',
      'Privet',
      'The standard informal Russian greeting "hi". Used with friends, classmates, peers, and family. Equivalent to English "hi" — never appropriate with elders, authorities, or strangers in formal contexts.',
      'word',
      'Привет, Саша!',
      '"Hi, Sasha!" — casual peer greeting using a diminutive (Саша = nickname for Александр or Александра).',
      null,
      [ACT.miniGreeting],
    ),
    createContentItem(
      'Спасибо · Пожалуйста',
      'Spasibo · Pozhaluysta',
      'The two universal Russian politeness markers: спасибо ("thank you") and пожалуйста ("please" / "you\'re welcome"). Used in every register from casual to formal. Historically, спасибо is a contraction of спаси Бог ("save [you] God") and пожалуйста of пожалуй + ста (archaic suffix).',
      'word',
      '— Спасибо! — Пожалуйста!',
      'The most common Russian exchange after any small favor — universal across all settings.',
      [
        { target: 'спасибо spasibo', note: '"thank you"; works in all registers from casual to formal' },
        { target: 'пожалуйста pozhaluysta', note: 'doubles as "please" (when asking) and "you\'re welcome" (when responding to thanks)' },
        { target: 'silent letters', note: 'спасибо has no silent letters; пожалуйста loses the л in fast speech: "pazhaluysta"' },
      ],
      [ACT.miniGreeting],
    ),
  ],
};

module.exports = lesson;
