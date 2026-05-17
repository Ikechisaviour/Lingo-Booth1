// Level 1 — Foundation: Filipino/Tagalog Sounds, Stress, and the Latin Alphabet
// First lesson on the Filipino / Foundation track. Pre-grammar, pre-vocabulary.
// Covers the 5-vowel system, the glottal stop, meaning-bearing stress
// (búhay vs buháy), the ng phoneme, the lack of native consonant clusters,
// intervocalic /h/ softening, the modern Filipino alphabet, and a brief
// historical note on Baybayin (the pre-colonial script).
//
// All content is authored with Filipino (target, Latin script) + a
// pronunciation respelling + English glosses (canonical source). The AI
// conversation tutor reads this curriculum and delivers it to each learner
// in their preferred native language at runtime — never assume a specific L1.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition.

const createContentItem = (
  target,
  pron,
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
  romanization: pron,
  nativeText: note,
  pronunciation: pron,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  intro: 'fil-foundation-intro',
  alphabet: 'fil-foundation-alphabet',
  vowels: 'fil-foundation-vowels',
  consonants: 'fil-foundation-consonants',
  ngPhoneme: 'fil-foundation-ng-phoneme',
  glottalStop: 'fil-foundation-glottal-stop',
  stress: 'fil-foundation-stress',
  intervocalicH: 'fil-foundation-intervocalic-h',
  noClusters: 'fil-foundation-no-clusters',
  baybayin: 'fil-foundation-baybayin',
  spanishLoans: 'fil-foundation-spanish-loans',
  englishLoans: 'fil-foundation-english-loans',
  reading: 'fil-foundation-reading',
};

const activities = [
  {
    id: ACT.intro,
    section: 'Why Sound First',
    title: 'Pasimula — How Filipino sounds are organized',
    goals: [
      'Understand that Filipino is the Tagalog-based national language of the Philippines (alongside English) and is written in the Latin alphabet with mostly transparent spelling — what you see is roughly what you say.',
      'Know that the four features that trip up new learners are: the glottal stop phoneme (often unwritten — bata vs bata\'), meaning-bearing stress (búhay vs buháy), the single phoneme /ŋ/ spelled ng, and the softening of intervocalic /h/ in fast speech.',
      'See that Spanish (over 300 years of colonization) and English (American period plus the present-day) contribute massive layers of loanwords on top of the Austronesian Tagalog core — modern urban Filipino is famously Taglish.',
    ],
    task: 'Read the structural facts. By the end of this lesson you should be able to read any Filipino word aloud with the right stress, the right glottal stop, and the ng phoneme as a single sound.',
  },
  {
    id: ACT.alphabet,
    section: 'The Modern Alphabet',
    title: 'Makabagong Alpabetong Filipino — 28 letters',
    goals: [
      'Recognize the 28 letters of the modern Filipino alphabet: the 26 of English plus Ñ (from Spanish, used in names like Señor / Señora) and Ng (a digraph treated as one letter, alphabetized between N and O).',
      'Distinguish the older Abakada (20 letters, 1940s) from the modern Alpabeto (28 letters, since 1987) — the modern set lets Filipino write Spanish names (Niño), English loans (cellphone, computer), and indigenous-language names with the original spelling.',
    ],
    task: 'Recite the alphabet aloud. Where the older Abakada said "A, Ba, Ka, Da, E, Ga, Ha, I, La, Ma, Na, Nga, O, Pa, Ra, Sa, Ta, U, Wa, Ya" (consonant + a), the modern set adds C, F, J, Ñ, Q, V, X, Z and uses English letter names by default.',
  },
  {
    id: ACT.vowels,
    section: 'The 5 Vowels',
    title: 'Limang Patinig — a, e, i, o, u',
    goals: [
      'Pronounce the 5 vowels as pure monophthongs without diphthongization: a /a/ as in "father", e /ɛ/ as in "bed", i /i/ as in "machine", o /o/ as in "boat" (but shorter), u /u/ as in "boot" (but shorter).',
      'Know that native Tagalog had only 3 vowels (a, i/e, u/o) and that i/e and u/o were merged in old words — this is why malíit (small) and Maynilà (Manila) feel "tight" while loaned aire (air, from Spanish) holds a clear /e/.',
      'Avoid English-style vowel reduction: in Filipino, every unstressed vowel keeps its full quality — banána is /baˈnana/ with three clear /a/ vowels, not /bəˈnænə/.',
    ],
    task: 'Read a, e, i, o, u in clean monophthong pronunciation. Then read the contrast pair bumili (to buy) vs bumilí (bought) and notice that the vowels stay the same — only the stress moves.',
  },
  {
    id: ACT.consonants,
    section: 'The Consonants',
    title: 'Mga Katinig — native and loaned',
    goals: [
      'Recognize the native Tagalog consonants p, t, k, b, d, g, m, n, ng, s, h, l, r, w, y — all unaspirated and all pronounced clearly.',
      'Recognize the loaned consonants c, f, j, ñ, q, v, x, z used in Spanish and English borrowings (computer, jeepney, fiesta) — older speakers may nativize them (pamilya for "family") while younger speakers preserve the original sound.',
      'Note that /p/, /t/, /k/ in Filipino are UNASPIRATED — closer to Spanish or French than to English. English speakers naturally puff air after /p/ in "Pasig"; native pronunciation has no puff.',
    ],
    task: 'Read each consonant paired with /a/: pa, ta, ka, ba, da, ga, ma, na, nga, sa, ha, la, ra, wa, ya. Hold your hand in front of your mouth; you should feel no puff for p, t, k.',
  },
  {
    id: ACT.ngPhoneme,
    section: 'The Ng Phoneme',
    title: 'Ang ng — one sound, not two',
    goals: [
      'Pronounce the digraph ng as a single velar nasal /ŋ/ — the same sound as the end of English "sing", but here it can also START a syllable (ngayon /ŋaˈjon/, "now") and even a word.',
      'Distinguish ng /ŋ/ (one sound) from n+g (two sounds, very rare in native words). The famous tongue-twister Mánga (mango fruit) /ˈmaŋga/ vs manga (the Japanese comics, recent loan) /ˈmaŋga/ has converged in modern speech.',
      'Know that ng-initial words are FAMOUS for being hard for non-native speakers. Drill ngayon, ngipin (tooth), ngiti (smile), nganga (open mouth), Ng̃ (the surname).',
    ],
    task: 'Hold the /ŋ/ position (back of tongue on soft palate) without releasing it, then add /a/ for nga. Repeat with ngayon, ngiti, ngipin until ng-initial feels natural.',
  },
  {
    id: ACT.glottalStop,
    section: 'The Glottal Stop',
    title: 'Impit — the unwritten consonant',
    goals: [
      'Recognize the glottal stop /ʔ/ as a real phoneme in Filipino — the catch in your throat between "uh-oh" — even though standard orthography usually does NOT write it.',
      'Distinguish the four minimal-pair stress/glottal types (linguists call them malumay, malumi, mabilis, maragsa): bata /ˈbata/ "bathrobe", batà /baˈtaʔ/ "young" (final glottal), báta /ˈbata/ "to endure", batá /baˈta/ "child" — the same letters mean four different words.',
      'Know that careful dictionaries mark the final glottal with a grave accent (à) or apostrophe (a\') but newspapers, signs, and social media usually do not — you learn it word by word.',
    ],
    task: 'Listen for and reproduce the glottal stop at the end of common words: pô (sir/ma\'am), opò (yes, polite), batà (young), masamà (bad), bahàng (flood-linker). Each ends with a real throat-catch.',
  },
  {
    id: ACT.stress,
    section: 'Stress Patterns',
    title: 'Diin — stress that changes meaning',
    goals: [
      'Place stress on the correct syllable — Filipino has FOUR stress patterns and they can change meaning: búhay (life, penultimate stress) vs buháy (alive, final stress); kaibigan (friend, antepenultimate) vs kaibígan (sweetheart, penultimate).',
      'Apply the "default" rule for unmarked words: stress falls on the SECOND-TO-LAST syllable (penultimate) for most common nouns — this is why "Manila" sounds like ma-NI-la in Filipino, not MAH-ni-la as in English.',
      'Mark stress with an acute accent (´) in careful writing: éskwela vs eskwéla can mean different things; dictionaries always mark it, everyday text usually does not.',
    ],
    task: 'Read the minimal pairs aloud: búhay/buháy, kaibigan/kaibígan, áso (dog)/asó (smoke), túbo (pipe)/tubò (sugar cane)/tubó (profit). Notice how the meaning shifts with the stress.',
  },
  {
    id: ACT.intervocalicH,
    section: 'Intervocalic /h/',
    title: 'Mahina ang h — soft /h/ between vowels',
    goals: [
      'Pronounce the /h/ clearly at the START of a word (hindî "no", hapon "afternoon") but very softly — almost dropped — between vowels in fast speech: bahay "house" sounds like /ˈbaʔaj/ or /ˈbaaj/ in casual speech.',
      'Know that careful or formal speech keeps the /h/ audible (ba-HAY) while everyday rapid speech drops it (BA-ay) — both are correct.',
      'Distinguish this from the GLOTTAL STOP (impit), which is its own phoneme and is NOT the same as dropped h.',
    ],
    task: 'Read bahay, tahanan, mahal, lihim in careful style (every /h/ audible), then in casual style (intervocalic /h/ softened). Both are correct Filipino.',
  },
  {
    id: ACT.noClusters,
    section: 'No Native Clusters',
    title: 'Walang clusters — vowel breaks in loans',
    goals: [
      'Know that native Tagalog has NO consonant clusters at the start of a syllable. Spanish/English loanwords are either kept intact in writing (problema, telepono) or restructured with an inserted vowel in older borrowings (Spanish "cruz" → krus; "tres" → tres, kept; English "school" → eskwela).',
      'Recognize the resulting CV-CV-CV rhythm of native words: ma-ka-ka-i-no-min ("can drink") has only single consonants between vowels.',
      'See why loanwords often look long: Spanish "estudiante" → estudyante (4 syllables) with the consonant cluster "st" broken up.',
    ],
    task: 'Read magaling, makakalakad, kaibigan, magkaibigan and feel the CV-CV-CV rhythm. Then read eskwela, estudyante, problema — loanwords with reshaped clusters.',
  },
  {
    id: ACT.spanishLoans,
    section: 'Spanish Loans',
    title: 'Mga hiram sa Espanyol — three centuries of vocabulary',
    goals: [
      'Recognize that thousands of everyday Filipino words come from Spanish (1565-1898 colonial period): mesa (table), silya (chair), kotse (car), kuwento (story), pamilya (family), Diyos (God), iglesia (church), pasko (Christmas), simbahan (church-building, from Spanish but rebuilt).',
      'See typical adaptation patterns: Spanish "j" → Filipino "h" (jamon → hamon "ham"), Spanish "f" → "p" in older words (familia → pamilya), Spanish "c+e/i" → "s" (ciudad → siyudad), Spanish gender-marking dropped (señor → ginoo only in formal use, or kept as ser/ginang).',
      'Know that Spanish numbers (uno, dos, tres…) are used freely alongside native Tagalog numbers (isa, dalawa, tatlo…) — Spanish for prices and time, native for counting children or hours.',
    ],
    task: 'Identify the Spanish origin of: kabayo (horse), zapatos (shoes), Pasko (Christmas), Diyos (God), kuwarto (room), bintana (window), mesa (table). Then notice the Tagalog version exists in some cases (kabayo / hayop, mesa / hapag).',
  },
  {
    id: ACT.englishLoans,
    section: 'English Loans & Taglish',
    title: 'Taglish — code-switching as default urban register',
    goals: [
      'Recognize that English loanwords pervade modern Filipino — computer, cellphone, internet, mall, ATM, jeepney, basketball — and that mixing English and Tagalog WITHIN sentences (Taglish) is the default register of urban speech.',
      'See the typical Taglish pattern: Tagalog grammatical structure + English content words (Magsho-shopping ako bukas "I will go shopping tomorrow" — Tagalog mag-, future reduplication, ako; English content "shopping").',
      'Know that Taglish is NOT broken Filipino — it is a legitimate, productive variety. Formal Filipino (TV news, government, exams) avoids it; spoken urban Filipino embraces it.',
    ],
    task: 'Read the Taglish sentence Magdo-download ako ng app sa cellphone ko mamaya ("I will download an app on my cellphone later") and identify which words are English (download, app, cellphone) and which are Tagalog (mag-, ako, ng, sa, ko, mamaya).',
  },
  {
    id: ACT.baybayin,
    section: 'Baybayin (Historical Script)',
    title: 'Baybayin — the pre-colonial script',
    goals: [
      'Know that before Spanish colonization, Tagalog (and many other Philippine languages) was written in Baybayin (also called Alibata in older textbooks) — a Brahmic-derived syllabary, not an alphabet.',
      'Recognize that Baybayin is HISTORICAL and CULTURAL, not the current writing system. You will see it on the Philippine peso bill (₱), on government logos (Wikang Filipino), as tattoos, and on cultural products — but everyday reading, writing, schools, and government use the Latin alphabet.',
      'Understand the structure briefly: each Baybayin character represents a consonant + vowel /a/ by default; the vowel changes with a small mark above (i/e) or below (o/u); a "kudlit" cancels the vowel. This is a syllabary, similar in concept to Indian Devanagari or Japanese hiragana.',
    ],
    task: 'Look at the Baybayin script on the Philippine peso bill (the words "Pilipino" appear in Baybayin script around the seal). You do NOT need to read it for this curriculum — but you should know it exists and is part of the cultural identity, not the daily orthography.',
  },
  {
    id: ACT.reading,
    section: 'Reading Practice',
    title: 'Read a real Filipino paragraph aloud',
    goals: [
      'Apply all foundation rules — pure vowels, single ng, glottal stops, default penultimate stress, soft intervocalic /h/ — to a short authentic paragraph.',
      'Recognize which letters are loans (Spanish c, English/Spanish f, j, v) and pronounce them accordingly.',
      'Keep CV-CV rhythm in native words and accept the cluster-friendly rhythm of loaned words side by side.',
    ],
    task: 'Read the paragraph below aloud at a moderate pace, paying attention to stress, the ng phoneme, glottal stops at the ends of marked words, and the soft intervocalic /h/.',
  },
];

const lesson = {
  title: 'Level 1 · Foundation: Mga Tunog at Diin — Filipino Sounds, Stress, and the Alphabet',
  category: 'foundation',
  difficulty: 'beginner',
  targetLang: 'fil',
  nativeLang: 'en',
  track: 'foundation',
  lessonType: 'foundation',
  activities,
  expressionPractice: [
    { id: 'read-aloud', label: 'Reading aloud', goal: 'Read any Filipino word with correct stress, ng as a single sound, and glottal stops where they belong.' },
    { id: 'glottal-stops', label: 'Hearing glottal stops', goal: 'Identify the unwritten final glottal stop in words like batà, masamà, pô, opò.' },
    { id: 'stress-pairs', label: 'Distinguishing stress pairs', goal: 'Hear and produce minimal pairs like búhay vs buháy and áso vs asó.' },
    { id: 'identify-loans', label: 'Identifying loanwords', goal: 'Spot Spanish and English loans in modern Filipino and pronounce them with appropriate adaptation.' },
  ],
  relatedPools: ['topic-language', 'topic-foundation'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Why Sound First
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Pasimula',
      'pa-si-MU-la',
      'Filipino is the Tagalog-based national language of the Philippines, written in the Latin alphabet with mostly transparent spelling. Spoken alongside English (the co-official language) and dozens of regional languages like Cebuano, Ilocano, and Hiligaynon.',
      'word',
      'Filipino + English = Taglish, the default urban register',
      'Modern urban Filipinos code-switch constantly between Tagalog and English in everyday speech — this is normal, not a sign of weak Filipino.',
      null,
      [ACT.intro],
    ),
    createContentItem(
      'Apat na hamon',
      'A-PAT na HA-mon (four challenges)',
      'The four features that trip up new learners: (1) the glottal stop phoneme (usually unwritten), (2) meaning-bearing stress, (3) the single phoneme /ŋ/ spelled ng (including at the start of words), (4) the softening of intervocalic /h/ in fast speech.',
      'word',
      'bata vs batà vs báta vs batá — same letters, four words',
      'Stress + glottal stop combine to give four contrastive words: a tongue-twister minimal-quadruple that previews everything in this lesson.',
      [
        { target: 'bata (no diin, no impit)', note: 'bathrobe / dressing gown — Spanish loan' },
        { target: 'batà (final glottal)', note: 'young (adjective)' },
        { target: 'báta (penultimate stress)', note: 'to endure / suffer (verb root)' },
        { target: 'batá (final stress)', note: 'child (noun)' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'Tatlong layer ng salita',
      'TAT-long LAYER ng sa-LI-ta',
      'Filipino vocabulary has three big layers stacked on top of each other: (1) Austronesian Tagalog core (bahay, anak, dagat), (2) Spanish loans from 333 years of colonial contact (mesa, silya, Diyos), (3) English loans from American occupation and the present (computer, jeepney, mall). Modern Filipino freely mixes all three.',
      'word',
      'Bahay → mesa → computer: native + Spanish + English in one room',
      'A Manila living room: bahay (house, Tagalog) + mesa (table, Spanish) + computer (English) — typical mixed-layer modern vocabulary.',
      null,
      [ACT.intro],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Modern Alphabet
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Modernong Alpabeto',
      'mo-DER-nong al-pa-BE-to',
      'The modern Filipino alphabet has 28 letters: the 26 of English plus Ñ (from Spanish) and the digraph Ng (one letter, two letters in writing). Adopted in 1987 to replace the older Abakada (20 letters, 1940s) which could not spell Spanish names or English loanwords with their original letters.',
      'word',
      'A B C D E F G H I J K L M N Ñ Ng O P Q R S T U V W X Y Z',
      'Note Ng is alphabetized between N and O — so words starting with ng appear after all n-words.',
      null,
      [ACT.alphabet],
    ),
    createContentItem(
      'Ñ',
      'EN-ye',
      'The letter Ñ (called eñe) is from Spanish, used in proper nouns and a few loanwords: Niño (boy, in religious contexts), Doña, Señor. Pronounced /ɲ/ — like the "ny" in English "canyon".',
      'word',
      'Niño Jesús, Señor, Doña Aurora',
      'Mostly preserved in Spanish-origin names and Catholic religious vocabulary; in everyday spelling, often replaced by ny.',
      [
        { target: 'Ñ → ny equivalent', note: 'Niño can also be written Ninyo informally; Señor → Senyor' },
        { target: '/ɲ/ palatal nasal', note: 'tongue middle against the palate — Spanish "ñ", Italian "gn"' },
      ],
      [ACT.alphabet],
    ),
    createContentItem(
      'Ng (titik)',
      'NA-nga (Spanish-style) o "ENG" (English-style)',
      'The digraph Ng is treated as ONE letter in the Filipino alphabet, alphabetized between N and O. Pronounced as a single velar nasal /ŋ/ — the same sound as the end of English "sing", but here it can also START a syllable.',
      'word',
      'Letter names: A, Bi, Si, Di, I, Ef, Ji, Eyts, Ay, Jey, Key, El, Em, En, Enye, NG, O, Pi, Kyu, Ar, Es, Ti, Yu, Vi, Dabolyu, Eks, Way, Zi',
      'In a dictionary, ngayon (today) comes AFTER nuno (great-grandparent), because Ng > N in alphabetical order.',
      null,
      [ACT.alphabet],
    ),
    createContentItem(
      'Lumang Abakada',
      'LU-mang a-ba-ka-DA',
      'The older Abakada (1940s-1987) had only 20 letters and could not spell Spanish/English loans with original letters — fiesta became piyesta, jeep became dyip, cellphone became selpon. Modern alphabet preserves original spelling: fiesta, jeep, cellphone. Both spellings are still seen in older books and signs.',
      'word',
      'Old: piyesta, dyip, selpon, kompyuter. Modern: fiesta, jeep, cellphone, computer.',
      'You will see both. Older speakers and government documents lean toward nativized spelling; younger speakers and signage lean toward preserving English/Spanish original spelling.',
      null,
      [ACT.alphabet],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Five Vowels
    // ────────────────────────────────────────────────────────────────────
    createContentItem('a', 'AH', 'Open central vowel /a/, like "father" but shorter. The most common vowel in Filipino. Always pronounced as a clear /a/, never reduced to schwa even when unstressed.', 'word', 'aso, bata, papa', 'Each /a/ is full, even in unstressed positions — banana is /baˈnana/ with three pure /a/s.', null, [ACT.vowels]),
    createContentItem('e', 'EH', 'Mid front vowel /ɛ/, like "bed". Historically merged with /i/ in native Tagalog — many native words have an /e/ variant. Always preserved in Spanish loans (sero "zero", peso).', 'word', 'mesa, peso, kape', 'Most words with /e/ are Spanish or English loans; in native Tagalog, /e/ often alternates with /i/.', null, [ACT.vowels]),
    createContentItem('i', 'EE', 'High front vowel /i/, like "machine" but shorter. Sometimes alternates with /e/ in native words: sino "who" (standard) ~ seno (regional).', 'word', 'silya, ibon, ipin', 'Pure /i/ — no glide like English "ee" can have.', null, [ACT.vowels]),
    createContentItem('o', 'OH', 'Mid back rounded vowel /o/, like "boat" but shorter and without the diphthong glide. Historically merged with /u/ in native Tagalog.', 'word', 'oo, mabuto, doktor', 'Pure /o/ — never the English /oʊ/ diphthong.', null, [ACT.vowels]),
    createContentItem('u', 'OO', 'High back rounded vowel /u/, like "boot" but shorter. Sometimes alternates with /o/ in native words: bukas "tomorrow" vs bokas (rare regional).', 'word', 'ulan, buko, kuya', 'Pure /u/, no diphthong glide.', null, [ACT.vowels]),
    createContentItem(
      'i/e at u/o alternation',
      'EE/EH at OO/OH alternation',
      'Native Tagalog historically had only 3 vowels: /a/, a high vowel (/i/~/e/), and a back vowel (/u/~/o/). The 5-vowel system stabilized under Spanish influence. You will still see the older 3-way overlap in native words: lalaki "man" sometimes spelled lalake; tubig "water" sometimes pronounced tobig.',
      'word',
      'lalaki ~ lalake; tubig ~ tobig; sino ~ seno',
      'Spelling reform in the 20th century mostly settled on i and u for native words, but the older spellings persist in some regions and in older literature.',
      null,
      [ACT.vowels],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Consonants
    // ────────────────────────────────────────────────────────────────────
    createContentItem('p, t, k (walang aspirated)', 'PA, TA, KA (no puff)', 'The voiceless stops p, t, k are UNASPIRATED in Filipino — no puff of air after release, unlike English. Hold your hand in front of your mouth: English "pin" has a puff; Filipino "pin-id" (closed) does not.', 'word', 'Pasig, taho, kape', 'A key feature that distinguishes Filipino sound from English-accented pronunciation; native speakers immediately notice English-style aspiration.', null, [ACT.consonants]),
    createContentItem('b, d, g (voiced)', 'BA, DA, GA', 'Voiced stops b, d, g. Standard sounds, similar to English. Tagalog has no /v/ in native words — Spanish/English loans with v are pronounced as b (Victoria → Bictoria in older speakers, kept as Victoria in modern educated speech).', 'word', 'bata, dito, ganda', 'Older nativization: video → bidyo, vacation → bakasyon. Modern speech often keeps the /v/.', null, [ACT.consonants]),
    createContentItem('m, n, ng (nasals)', 'MA, NA, NGA', 'Three nasal consonants: bilabial /m/, alveolar /n/, and velar /ŋ/ (spelled ng). All three can appear at the start, middle, or end of a syllable. The velar /ŋ/ is the unusual one for English speakers — it can begin a word.', 'word', 'mama, nanay, ngayon', 'ngayon /ŋaˈjon/ "now" — the velar nasal at word-initial position is the foundation challenge for English learners.', null, [ACT.consonants]),
    createContentItem('s, h (fricatives)', 'SA, HA', 'Only two fricatives in native Tagalog: /s/ and /h/. Spanish brought /f/ (sometimes nativized to /p/: familia → pamilya) and English brought /z/, /ʃ/, /tʃ/ in loans (cheese, share, zip — often preserved in modern speech).', 'word', 'sino, hindi, hapon', 'Native Tagalog has no /f/, /v/, /z/, /ʃ/, /tʃ/, /dʒ/ — all come in via loans.', null, [ACT.consonants]),
    createContentItem('l, r (liquids)', 'LA, RA', 'Alveolar lateral /l/ and tapped /r/. The /r/ is a single tap (Spanish-style), not a trill and not the English approximant. Many native words alternate: dito ~ rito "here" — d at the start of a word becomes r between vowels (sa-d-iya → sariya in some compounds).', 'word', 'lalaki, dito, sariwa', 'The d/r alternation is a productive sound rule: din "also" → rin after a vowel (oo rin "yes, also" but hindi din "no, also").', null, [ACT.consonants]),
    createContentItem('w, y (glides)', 'WA, YA', 'Two semivowel glides: /w/ as in English "water", /y/ as in English "yes". Used freely between vowels: kawayan "bamboo", payong "umbrella".', 'word', 'wala, yelo, kawayan', 'Glides smooth vowel-vowel transitions and are extremely common in Filipino phonotactics.', null, [ACT.consonants]),
    createContentItem('Loaned letters: c, f, j, ñ, q, v, x, z', 'see below', 'These eight letters appear ONLY in loanwords or proper nouns. Older speakers nativize them (c→k, f→p, j→h or dy, q→k, v→b, x→ks, z→s). Modern educated speakers preserve the original sound for English and Spanish loans.', 'word', 'computer (kept), familia → pamilya (nativized), Jesús (Hesús or kept)',
      'Pattern depends on age, register, and how recent the loan is. Recent loans (computer, video) often kept; old loans (familia, Hesús) often nativized.',
      [
        { target: 'c → k (older) or kept', note: 'cebolla → sibuyas (old) but computer kept (modern)' },
        { target: 'f → p (older) or kept', note: 'familia → pamilya (old) but fiesta kept (newer)' },
        { target: 'j → h or dy (older) or kept', note: 'jamón → hamon, jeep → dyip (old)' },
        { target: 'v → b (older) or kept', note: 'vacaciones → bakasyon (old) but video often kept' },
        { target: 'z → s (older) or kept', note: 'zapatos → sapatos (semi-nativized)' },
      ],
      [ACT.consonants],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Ng phoneme
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ng (titik, isang tunog)', 'eng (English-style) o nga (Spanish-style)', 'The digraph ng represents a SINGLE velar nasal /ŋ/. Unlike English where /ŋ/ only appears at the end of syllables (sing, ring), in Filipino /ŋ/ can also START a syllable and a word. This is the single biggest pronunciation challenge for English learners.', 'word', 'ngayon, ngiti, ngipin, nganga', 'Drill these four ng-initial words until you can produce /ŋ/ before any vowel without breaking it into n+g.', null, [ACT.ngPhoneme]),
    createContentItem('ngayon', 'nga-YON', '"Now / today". A foundational word and a key ng-initial drill word. The /ŋ/ is at the start of the first syllable; do NOT pronounce it as "n-gayon" with two sounds.', 'word', 'Anong oras na ngayon?', '"What time is it now?" — extremely high-frequency phrase.', null, [ACT.ngPhoneme]),
    createContentItem('ngiti', 'nga-TI o ngi-TI', '"Smile" (noun) or "to smile" (root). Another foundational ng-initial drill word.', 'word', 'Ngumiti ka, please.', '"Please smile" — common phrase when taking photos; uses the -um- actor-focus prefix on ngiti.', null, [ACT.ngPhoneme]),
    createContentItem('ngipin', 'ngi-PIN', '"Tooth / teeth". The /ŋ/ followed by /i/ is one of the trickier sequences — practice the smooth velar-to-front-vowel transition.', 'word', 'Magsipilyo ka ng ngipin.', '"Brush your teeth" — uses the marker ng (different from the digraph; see next item).', null, [ACT.ngPhoneme]),
    createContentItem('ng (marker, hiwalay)', 'nang', 'IMPORTANT: there are TWO "ng" things in Filipino. (1) The digraph ng (one sound /ŋ/) inside a word. (2) The grammatical marker ng (pronounced /naŋ/, written as just "ng") that signals genitive/object case. Same letters, different roles.', 'word', 'libro NG bata "the child\'s book" — the marker pronounced /naŋ/', 'The grammatical marker is one of the three case markers in Filipino (ang, ng, sa). Spelled "ng" but pronounced /naŋ/ to distinguish.', null, [ACT.ngPhoneme]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Glottal stop
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Impit (glottal stop)',
      'IM-pit',
      'A glottal stop /ʔ/ — the catch in the throat between "uh-oh" — is a real phoneme in Filipino that can change word meaning. It usually appears at the END of a word or BETWEEN two vowels. Standard orthography usually does NOT write it, so you learn each word\'s glottal pattern.',
      'word',
      'po vs pô — same spelling, but pô has a final glottal stop',
      'Native speakers hear the difference clearly; learners need explicit drill until the throat-catch becomes automatic.',
      [
        { target: 'pô /poʔ/', note: 'the politeness marker addressing elders/strangers; ends in glottal' },
        { target: 'po /po/', note: 'rare without glottal; functionally not used' },
        { target: 'opò /oˈpoʔ/', note: '"yes" (respectful, to elder); both stress and final glottal' },
      ],
      [ACT.glottalStop],
    ),
    createContentItem(
      'Apat na uri (four stress/glottal types)',
      'A-pat na U-ri',
      'Filipino linguists classify every word into one of four patterns based on stress + glottal. Malumay: penultimate stress, no final glottal (BÁta). Malumi: penultimate stress, final glottal (BÁtà). Mabilis: final stress, no glottal (batá). Maragsa: final stress, final glottal (batà). Same letters → four different words.',
      'word',
      'bata (no marker) = bathrobe; batà = young (malumi); batá = child (mabilis); báta = endure (malumay+verb)',
      'Newspapers do not mark these distinctions; dictionaries do. You learn by hearing and using each word in context.',
      [
        { target: 'malumay', note: 'penultimate stress, no glottal — báta "endure"' },
        { target: 'malumi', note: 'penultimate stress + final glottal — báta\' "young"' },
        { target: 'mabilis', note: 'final stress, no glottal — batá "child"' },
        { target: 'maragsa', note: 'final stress + final glottal — batá\' "to be young (rare)"' },
      ],
      [ACT.glottalStop],
    ),
    createContentItem(
      'Pô at opò',
      'POH at o-POH',
      'The two most important politeness words — pô and opò — both END with a glottal stop. Pô is the universal politeness marker addressed to elders, strangers, or superiors. Opò means "yes, respectfully" (to elder); without glottal stop, opo would not signal the same respect.',
      'word',
      'Salamat pô. Opò, kumain na pô ako.',
      '"Thank you, sir/ma\'am. Yes, I have eaten." — every elder-directed sentence often ends in pô; learn this glottal early.',
      null,
      [ACT.glottalStop],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Stress
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Diin (stress)',
      'DI-in',
      'Filipino stress is MEANING-BEARING. Move the stress and you change the word. Default is penultimate (second-to-last syllable) for unmarked words, but many roots take final stress and many derived forms shift stress.',
      'word',
      'búhay (LIFE) vs buháy (ALIVE) — same letters, different meaning',
      'Stress mistakes are immediately audible to native speakers and can cause real confusion (asking about "smoke" instead of "dog").',
      null,
      [ACT.stress],
    ),
    createContentItem(
      'búhay vs buháy',
      'BU-hay vs bu-HAY',
      '"Life" (noun, penultimate stress) vs "alive" (adjective, final stress). Famous minimal pair from the national anthem ("Lupang Hinirang") — the line "Aming ligaya na pag may mang-aapi, ang mamatay nang dahil sa\'yo" ends on "ang mamatáy" with deliberate final stress for poetic effect.',
      'word',
      'Maganda ang búhay sa Pilipinas. / Buháy pa ba siya?',
      '"Life is good in the Philippines." / "Is she still alive?" — same letters, different stress, totally different meaning.',
      null,
      [ACT.stress],
    ),
    createContentItem(
      'áso vs asó',
      'A-so vs a-SO',
      '"Dog" (penultimate stress) vs "smoke" (final stress). Another famous minimal pair. Without correct stress, "may áso sa labas" (there is a dog outside) sounds like "may asó sa labas" (there is smoke outside).',
      'word',
      'May áso ako. / May asó sa kusina!',
      '"I have a dog." / "There is smoke in the kitchen!" — life-or-death difference in some contexts.',
      null,
      [ACT.stress],
    ),
    createContentItem(
      'kaibigan vs kaibígan',
      'ka-i-BI-gan vs ka-i-bi-GAN',
      '"Friend" (antepenultimate stress on bi) vs "sweetheart/lover" (penultimate stress on bi-GAN). A common adolescent joke: "kaibígan or kaibigan?" when introducing someone — small stress shift, very different relationship.',
      'word',
      'Si Maria ang kaibigan ko. / Si Maria ang kaibígan ko.',
      '"Maria is my friend." vs "Maria is my sweetheart." — context and tone usually clarify, but stress is the formal distinguishing feature.',
      null,
      [ACT.stress],
    ),
    createContentItem(
      'Default na diin: penultimate',
      'penultimate stress as default',
      'For unmarked Filipino words, the DEFAULT stress falls on the SECOND-TO-LAST syllable. Manila is ma-NI-la (not MA-ni-la as in English); Cebu is se-BU (not SE-bu). This is why English speakers must shift their stress habits when speaking Filipino.',
      'word',
      'Manila, Cebu, Iloilo, Davao — stress: ma-NI-la, se-BU, i-lo-I-lo, da-VAO',
      'These are some of the Philippine city names you will hear constantly; learn them with native stress.',
      null,
      [ACT.stress],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Intervocalic /h/
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'h sa pagitan ng patinig',
      'h between vowels',
      'The /h/ is clearly pronounced at the START of a word (hindî, hapon) but VERY SOFT — almost dropped — between vowels in fast speech. Bahay "house" can be /baˈhaj/ (careful), /baˈʔaj/ (casual), or /ˈbaaj/ (very fast). All three are correct.',
      'word',
      'bahay: ba-HAY (careful) → ba-AY (fast)',
      'Do not over-pronounce /h/ between vowels — sounds bookish. Do not drop initial /h/ — sounds non-native.',
      null,
      [ACT.intervocalicH],
    ),
    createContentItem(
      'Hindi (no)',
      'hin-DEE (full) or hin-DEH (final-stress variant)',
      'The most common negative word. Sometimes shortened in fast speech to "di" (hindi → di) — di alam "don\'t know", di ako "not me". Initial /h/ is always audible; the final vowel can vary regionally.',
      'word',
      'Hindi ako kumakain ng karne. / Di ako kumakain ng karne.',
      '"I don\'t eat meat" — same meaning in two registers; full hindi is more careful, di is casual.',
      null,
      [ACT.intervocalicH],
    ),
    createContentItem(
      'Bahay (house)',
      'BA-hay (careful) o BA-ay (casual)',
      'Foundational vocabulary word; also a perfect drill for intervocalic /h/. Careful speakers say BA-hay with clear /h/; casual urban speakers often drop it to BA-ay.',
      'word',
      'Pumunta ka sa bahay ko. — "Come to my house."',
      'In a casual phone call: "Sa bahay ka ba?" can sound like "Sa BA-ay ka ba?"',
      null,
      [ACT.intervocalicH],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — No native clusters
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'CV-CV rhythm',
      'consonant-vowel pattern',
      'Native Tagalog has NO consonant clusters at the start of a syllable — every syllable is CV (consonant + vowel) or V (vowel alone). This gives Filipino its distinctive open, even rhythm: ma-ka-ka-i-no-min, ma-ga-na-lin, ka-i-bi-gan.',
      'word',
      'magaling, makakalakad, mapagmahal',
      'Even long words break down into clear CV-CV-CV syllables; no consonant pile-ups.',
      null,
      [ACT.noClusters],
    ),
    createContentItem(
      'Cluster sa hiram',
      'clusters in loanwords',
      'Spanish and English loanwords bring clusters that Filipino accepts in writing but often reshapes in speech: estudyante (from estudiante), problema (kept), eskwela (from escuela — "es" added because Spanish "sc" was hard for native speakers).',
      'word',
      'estudyante, problema, eskwela, transportasyon',
      'Older speakers may even insert an extra vowel: krus → kurus, kotse → kotsi (rare). Modern speech generally accepts clusters in loans.',
      [
        { target: 'No cluster (native)', note: 'magaling, kaibigan, makinis' },
        { target: 'Cluster kept (recent loans)', note: 'problema, transportasyon, computer' },
        { target: 'Cluster reshaped (older loans)', note: 'eskwela (escuela), istasyon (estación)' },
      ],
      [ACT.noClusters],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Spanish loans
    // ────────────────────────────────────────────────────────────────────
    createContentItem('mesa', 'ME-sa', '"Table". From Spanish "mesa". An everyday household word; native Tagalog "hapag" exists but is rarely used in modern speech.', 'word', 'Ilagay mo ang plato sa mesa.', '"Put the plate on the table" — Spanish-origin household items dominate Filipino kitchens.', null, [ACT.spanishLoans]),
    createContentItem('silya', 'SIL-ya', '"Chair". From Spanish "silla". Replaced any native term in everyday use. Silyang plastik (plastic chair) is a Filipino household staple.', 'word', 'Umupo ka sa silya.', '"Sit on the chair" — typical instruction.', null, [ACT.spanishLoans]),
    createContentItem('Pasko', 'PAS-ko', '"Christmas". From Spanish "Pascua". The biggest holiday in the Philippines — preparations start in September; Simbang Gabi (9-day pre-dawn masses) runs Dec 16-24; Noche Buena (Christmas Eve dinner) follows.', 'word', 'Maligayang Pasko!', '"Merry Christmas!" — universal Filipino greeting from October through January.', null, [ACT.spanishLoans]),
    createContentItem('Diyos', 'DI-yos', '"God". From Spanish "Dios". The Philippines is the largest Catholic country in Asia (about 80% Catholic), so Diyos appears constantly in everyday speech and exclamations (Diyos ko! "My God!").', 'word', 'Salamat sa Diyos.', '"Thanks be to God" — extremely common phrase across registers.', null, [ACT.spanishLoans]),
    createContentItem('pamilya', 'pa-MIL-ya', '"Family". From Spanish "familia", nativized (Spanish /f/ → Filipino /p/ in older borrowings). Pamilya is a core cultural value — extended family, godparents (ninong/ninang), and titos/titas (uncles/aunts, often unrelated) all included.', 'word', 'Ang pamilya ay pinakamahalaga.', '"Family is most important" — a near-universal Filipino value.', null, [ACT.spanishLoans]),
    createContentItem('Spanish numbers', 'uno, dos, tres, kwatro, singko', 'Spanish numbers used for prices, time, dates, and money. Filipino has native numbers (isa, dalawa, tatlo) but in money/time contexts, Spanish numbers dominate (singkwenta pesos "fifty pesos", alas-singko "five o\'clock").', 'word', 'Magkano? Singkwenta pesos. / Anong oras? Alas-dos.', 'Spanish numbers for money + time + dates; native numbers for counting people, objects, abstract counts.', null, [ACT.spanishLoans]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — English loans + Taglish
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Taglish',
      'TAG-lish',
      'The default register of urban modern Filipino: Tagalog grammar + English content words mixed within a sentence. Not "bad Filipino" — a legitimate variety. Used in Manila offices, on TV, in pop music, and on social media.',
      'word',
      'Magsho-shopping ako bukas sa mall.',
      '"I will go shopping at the mall tomorrow" — Tagalog mag- prefix + reduplication + English "shopping" + native ako, bukas, sa + English "mall".',
      [
        { target: 'magsho-shopping', note: 'Tagalog mag- (actor focus) + reduplication (future) + English root "shop"' },
        { target: 'ako', note: 'Tagalog "I" — never replaced by English in Taglish' },
        { target: 'bukas', note: 'Tagalog "tomorrow"' },
        { target: 'sa mall', note: 'Tagalog locative marker sa + English "mall"' },
      ],
      [ACT.englishLoans],
    ),
    createContentItem('computer', 'kom-PYU-ter', '"Computer". English loan, kept intact in modern spelling. Older Abakada spelling: kompyuter. Both seen.', 'word', 'May computer ka ba sa bahay?', '"Do you have a computer at home?" — typical urban Filipino question.', null, [ACT.englishLoans]),
    createContentItem('cellphone', 'SEL-pon', '"Cellphone / mobile phone". Older nativized spelling: selpon. Modern spelling: cellphone or "cp" in texts. Mobile phones are ubiquitous; the Philippines was once the texting capital of the world.', 'word', 'Wala akong load sa cellphone.', '"I don\'t have load on my cellphone" — load = prepaid credit, another loan.', null, [ACT.englishLoans]),
    createContentItem('jeepney', 'JIP-ni', '"Jeepney". A uniquely Filipino word — referring to the colorful elongated jeep-buses that are the iconic shared transit of Manila and the provinces. From "jeep" (US army surplus, post-WWII) + "knee" or "ney" (sound suffix). Spelled jeepney or dyipni.', 'word', 'Sumakay ka ng jeepney papuntang Cubao.', '"Take a jeepney to Cubao" — Cubao is a major Quezon City transit hub.', null, [ACT.englishLoans]),
    createContentItem('mall', 'MOL', '"Shopping mall". Imported word and imported concept; the Philippines is famous for its enormous malls (SM, Ayala). Going to the mall (mag-mall) is a major social activity.', 'word', 'Tara, punta tayo sa mall.', '"Come on, let\'s go to the mall" — typical weekend invitation.', null, [ACT.englishLoans]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Baybayin (historical script)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Baybayin',
      'bay-BA-yin',
      'The pre-colonial writing system used to write Tagalog (and several other Philippine languages) before Spanish colonization. A Brahmic-derived syllabary — NOT an alphabet. Each character represents a consonant + the vowel /a/ by default. NOT used for everyday writing today; preserved as cultural and national identity symbol.',
      'word',
      'You will see Baybayin on the Philippine peso bill, on government logos, as tattoos, and on cultural products. Modern Filipinos generally cannot read it fluently.',
      'Baybayin appears on the seal of the Republic and the currency. Some artists tattoo their names in Baybayin. It is a heritage script, not a daily orthography.',
      [
        { target: 'syllabary structure', note: 'each character = consonant + default vowel /a/; vowel changes with diacritic above/below' },
        { target: 'kudlit', note: 'a small mark added above (for i/e) or below (for o/u) the consonant' },
        { target: 'virama (Spanish-era)', note: 'a cross-mark introduced by Spanish missionaries to cancel the default vowel — original Baybayin did not have this' },
        { target: 'not Alibata', note: 'the term "Alibata" was a 20th-century coinage; the original native name is Baybayin' },
      ],
      [ACT.baybayin],
    ),
    createContentItem(
      'Cultural symbol',
      'simbolo ng pagkakakilanlan',
      'Baybayin is increasingly visible in cultural assertions of pre-colonial Filipino identity. Some advocates push for re-introduction in schools; legislation has been proposed but not yet implemented. Your curriculum uses the LATIN alphabet (the daily standard) but you should know Baybayin exists.',
      'word',
      'Look at the back of any Philippine peso bill: the small flowing script around the seal is Baybayin spelling "Pilipino".',
      'Cultural literacy: knowing that Baybayin exists, what it represents, and what it does NOT represent (it is not how Filipinos write today).',
      null,
      [ACT.baybayin],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 13 — Reading practice
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Pagbasa: Maganda ang umaga',
      'reading: Maganda ang umaga',
      'A short authentic paragraph that uses every foundation rule. Read aloud at moderate pace, applying penultimate stress, the single ng phoneme, glottal stops at the end of marked words (pô, opò, batà), and soft intervocalic /h/.',
      'sentence',
      'Magandang umaga pô. Ako pô si Maria. Taga-Quezon City pô ako. Ang pamilya ko ay may bahay sa Cubao. May aso ako, ang pangalan ay Bantay. Ngayon ay araw ng Linggo. Pupunta kami sa simbahan, pagkatapos ay mananghalian kami sa bahay ng lola ko.',
      'Note: pô (final glottal), Quezon (English-like /k/), pamilya (penultimate stress on MIL), bahay (intervocalic h optional), aso (penultimate stress: "dog" not "smoke"), Bantay (final-stress name), Linggo (double g represents /ŋg/), simbahan (Spanish-origin), mananghalian (long native word, CV-CV rhythm), lola (Spanish-origin "grandma").',
      [
        { target: 'Magandang umaga pô', note: '"Good morning, sir/ma\'am" — note final glottal on pô' },
        { target: 'Ako pô si Maria', note: '"I am Maria" — ako = "I" in ang case; si introduces a personal name' },
        { target: 'Taga-Quezon City', note: '"From Quezon City" — taga- = "from" (origin); QC is the largest city in Metro Manila' },
        { target: 'May aso ako', note: '"I have a dog" — penultimate stress on Aso, not asó "smoke"' },
        { target: 'simbahan', note: '"church-building" — Catholic mass attendance is a Sunday norm' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'Pagbasa: Sa palengke',
      'reading: at the market',
      'Second reading paragraph, focused on market/everyday register. Notice how Spanish loanwords (mesa, kuwarta, sapatos) and English loans (mall, OK) mix with native Tagalog grammar.',
      'sentence',
      'Pumunta kami sa palengke kanina. Bumili kami ng isda, gulay, at prutas. Nag-Taglish kami sa vendor: "Magkano po itong mangga?" "Singkwenta pesos po, ate." Maganda naman ang presyo. Pagkatapos, kumain kami ng halo-halo sa kanto.',
      'Notice: palengke (Spanish-origin "market"), kuwarta (Spanish "cuarta"), magkano + po (politeness), singkwenta + pesos (Spanish numbers for money), halo-halo (native reduplication = mixed dessert), kanto (Spanish "esquina" → kanto "corner").',
      [
        { target: 'pumunta kami', note: 'past-tense actor-focus pumunta + we-exclusive kami' },
        { target: 'palengke', note: 'wet market — Spanish-origin word; mall is the modern parallel' },
        { target: 'Magkano po itong mangga?', note: '"How much is this mango, sir?" — magkano = "how much"; itong = ito (this) + linker' },
        { target: 'Singkwenta pesos po, ate', note: '"50 pesos, ate" — ate = older sister / respectful address for slightly-older woman' },
        { target: 'halo-halo', note: 'iconic Filipino shaved-ice dessert; name is native reduplication of "halo" (mix)' },
      ],
      [ACT.reading],
    ),
  ],
};

module.exports = lesson;
