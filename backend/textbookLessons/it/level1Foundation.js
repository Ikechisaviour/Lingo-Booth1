// Level 1 — Foundation: Italian Phonology, Spelling, and Stress
// First lesson on the Italian / Foundation track. Pre-grammar, pre-vocabulary.
// Covers the 7-vowel system (with open/closed mid contrasts), geminate (double)
// consonants, c/g softening before i/e, gl/gn palatals, the sc digraph, word
// stress (mostly penultimate, with exceptions), and the reading rules a learner
// needs to read aloud from Italian spelling.
//
// All content is authored with Italian (target) + a light phonetic
// `romanization` hint (vowel quality, geminates, stress) + English glosses
// (canonical source). The AI conversation tutor reads this curriculum and
// delivers it to each learner in their preferred native language at runtime —
// never assume a specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition.

const createContentItem = (
  target,
  pronunciation,
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
  romanization: pronunciation,
  nativeText: note,
  pronunciation,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  // Legacy keys for UI fallback — same convention as the Korean source:
  // the "korean" slot holds the target text, the "english" slot holds the note.
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  intro: 'it-foundation-intro',
  vowels: 'it-foundation-vowels',
  openClosed: 'it-foundation-open-closed-mid',
  consonants: 'it-foundation-consonants',
  softening: 'it-foundation-c-g-softening',
  digraphs: 'it-foundation-digraphs-gl-gn-sc',
  geminates: 'it-foundation-geminates',
  stress: 'it-foundation-stress',
  spelling: 'it-foundation-spelling-rules',
  apocope: 'it-foundation-apocope-elision',
  intonation: 'it-foundation-intonation',
  reading: 'it-foundation-reading-practice',
};

const activities = [
  {
    id: ACT.intro,
    section: 'Why Italian phonology first',
    title: 'Suoni italiani — How Italian sounds are organized',
    goals: [
      'Understand that Italian spelling is highly phonemic: with a handful of rules, every written word predicts its pronunciation, unlike English.',
      'Know that Italian has 7 vowels (not 5): /a, e, ɛ, i, o, ɔ, u/ — the open/closed contrast in mid vowels can change meaning (pèsca "peach" vs pésca "fishing").',
      'See that double (geminate) consonants are pronounced as longer, audibly held consonants and signal different words (casa "house" vs cassa "crate"; ano "anus" vs anno "year").',
    ],
    task: 'Read the four structural facts and by the end of this lesson you should be able to read any Italian word aloud with correct stress, geminate length, and vowel quality.',
  },
  {
    id: ACT.vowels,
    section: 'The 5 written vowels',
    title: 'Vocali — pure, never reduced',
    goals: [
      'Pronounce the five written vowels a, e, i, o, u as pure, never-reduced sounds — Italian never weakens vowels to schwa as English does in "about" or "sofa".',
      'Hold every vowel at the same clear quality whether it is stressed or unstressed — caffè has two distinct /a/ and /ɛ/ even in fast speech.',
    ],
    task: 'Read each vowel in the pairs (banana, espresso, vino, sole, luna) without ever reducing — every vowel must sound like its named letter.',
  },
  {
    id: ACT.openClosed,
    section: 'Open vs closed mid vowels',
    title: 'è / é and ò / ó — Italian\'s 7-vowel system',
    goals: [
      'Distinguish open /ɛ/ (è, as in caffè, lèggere "to read") from closed /e/ (é, as in perché, ségno "sign") — minimal pairs like pèsca/pésca differ ONLY in vowel quality.',
      'Distinguish open /ɔ/ (ò, as in però, bòtte "barrel") from closed /o/ (ó, as in dóve, sópra) — same kind of minimal pair (bòtte "barrel" vs bótte "blows").',
      'Know that the contrast is most reliable in stressed syllables and that the grave (è ò) vs acute (é ó) accent marks are written ONLY when the stress falls on a final vowel — elsewhere, native speakers know by tradition and exposure.',
    ],
    task: 'Read each minimal pair aloud (pèsca/pésca, bòtte/bótte, vénti "twenty"/vènti "winds") and produce the open vs closed contrast cleanly.',
  },
  {
    id: ACT.consonants,
    section: 'Consonants you already know',
    title: 'b, d, f, l, m, n, p, r, s, t, v, z — and the trilled rolled r',
    goals: [
      'Pronounce most Italian consonants close to their English values (b, d, f, l, m, n, p, t, v) — these are easy and similar to English.',
      'Produce the trilled (rolled) /r/ — a quick tongue-tip flap against the alveolar ridge, never an English /ɹ/ — and notice that geminated /rr/ (carro "cart") is even longer.',
      'Pronounce both /s/ values: voiceless [s] between vowels in many words (casa /ˈka.za/ varies by region; in northern standard it is voiced [z]; in Tuscan/standard it can be [s]); voiced [z] before voiced consonants (sbaglio "mistake" = [z]).',
      'Distinguish /ts/ vs /dz/ written z: voiceless [ts] in pizza, grazie, voiced [dz] in zero, zaino "backpack" — both spelled z.',
    ],
    task: 'Drill each consonant in word pairs (banana, dado, fame, gamba, lago, mamma, no, porta, rosso, sole, tetto, vino, zucchero) until the trilled r and the [ts]/[dz] z feel natural.',
  },
  {
    id: ACT.softening,
    section: 'c, g softening before i and e',
    title: 'Hard vs soft c and g — the spelling-to-sound rule',
    goals: [
      'Apply the c rule: c is hard /k/ before a, o, u, and consonants (casa, come, cucina, classe); c is soft /tʃ/ before i and e (ciao, cinema, cento). Add h after c to keep it hard before i/e: chi /ki/, che /ke/.',
      'Apply the g rule symmetrically: g is hard /ɡ/ before a, o, u (gamba, gola, gusto); g is soft /dʒ/ before i and e (gente, giorno, giudice — though u after g+i/e is silent here, signaling "soft g"). Add h to keep g hard before i/e: ghiaccio "ice" /ˈɡjat.tʃo/, spaghetti.',
      'Know that the silent i in "cia, cio, ciu" or "gia, gio, giu" only marks the softening: ciao = /tʃao/, not /tʃiao/; the i is a spelling device.',
    ],
    task: 'Read each c/g word and decide hard vs soft from the spelling alone (casa, cima, chiave, gola, giro, gheriglio, sciogliere) — the rule is fully predictable.',
  },
  {
    id: ACT.digraphs,
    section: 'gl, gn, sc — Italian palatals and digraphs',
    title: 'Three two-letter combinations you cannot guess from English',
    goals: [
      'Pronounce gli as a palatal lateral /ʎ/ — like Spanish "ll" in Spain, NOT like English "gl" of "glass". Examples: figlio /ˈfiʎ.ʎo/ "son", famiglia "family", aglio "garlic". When gl is followed by another vowel (a, e, o, u, or consonant), it is just /ɡl/: globo /ˈɡlɔ.bo/ "globe".',
      'Pronounce gn as a palatal nasal /ɲ/ — like Spanish "ñ" or French "gn" in "agneau". Examples: gnocchi /ˈɲɔk.ki/, signora "lady", lasagna, bagno "bathroom". Geminated audibly in many words (signora is [siɲˈɲoː.ra]).',
      'Distinguish sc soft /ʃ/ before i/e (sciare "to ski", pesce "fish", scendere "to descend") from sc hard /sk/ before a/o/u (scuola, scarpa "shoe", scuro "dark"). Add h to keep sc hard before i/e: schifo /ˈski.fo/ "disgust", scheda "card".',
    ],
    task: 'Read each digraph word and produce the palatal sound from the spelling (famiglia, agnello, scienza, schermo) — never substitute the English-like cluster.',
  },
  {
    id: ACT.geminates,
    section: 'Double consonants (geminates)',
    title: 'Consonante doppia — Italian\'s longest non-vowel feature',
    goals: [
      'Hold geminated consonants for noticeably longer than single ones — the audible length is what marks the difference between casa /ˈkaː.sa/ "house" and cassa /ˈkas.sa/ "crate", or ano /ˈaː.no/ vs anno /ˈanː.no/ "year".',
      'Know that ALL written double consonants are pronounced double: nn, mm, tt, ss, rr, ll, pp, bb, dd, gg, ff, vv, cc, zz, plus the trickier ones cch /kk/ in occhio /ˈɔk.kjo/ "eye" and gg /ddʒ/ in oggi /ˈɔd.dʒi/ "today".',
      'Notice that the vowel BEFORE a geminate is shortened, while the vowel before a single consonant is slightly lengthened — the rhythm shift is a strong cue for native ears.',
    ],
    task: 'Read each minimal pair (casa/cassa, ano/anno, copia/coppia, sera/serra) and produce the length contrast cleanly.',
  },
  {
    id: ACT.stress,
    section: 'Word stress',
    title: 'Accento — penultimate by default, but watch for the exceptions',
    goals: [
      'Place stress on the penultimate (second-to-last) syllable by default — about 70% of Italian words follow this rule: amico, casa, parlare, ragazzo, cucina.',
      'Apply the antepenultimate (third-to-last) stress when marked or when expected: telefono, abitano, musica, fragile — these are called "parole sdrucciole" and are very common in verbs.',
      'Read the written grave accent at end of word (final stress): caffè, però, città, virtù, lunedì — the accent ALWAYS marks final stress and is mandatory in writing.',
      'Spot the rare "bisdrucciole" words with fourth-from-last stress: telèfonano "they phone", abìtano in some dialects, and certain verb+clitic combinations (compràmelo "buy it for me").',
    ],
    task: 'Mark the stress on these words and read aloud: amico, telefono, città, parliamogliene, càpita.',
  },
  {
    id: ACT.spelling,
    section: 'Spelling-to-sound predictability',
    title: 'Ortografia fonetica — what you see is what you say',
    goals: [
      'Trust Italian spelling: with the rules above (c/g softening, gl/gn, sc, double consonants, stress) every written word predicts its pronunciation — unlike English, Italian has almost no silent letters.',
      'Know the rare silent letters: h is almost always silent (ho /ɔ/ "I have", hai /ai/ "you have", hanno /ˈanː.no/ "they have"), and silent only h appears in c+h, g+h to keep the consonant hard before i/e.',
      'Read foreign borrowings phonetically as Italians do: computer becomes /komˈpjuː.ter/, weekend /ˈwiː.kɛnd/, file /fail/, but the spelling stays English.',
    ],
    task: 'Read these words on first sight and predict the pronunciation: chiamare, ghirlanda, sciopero, lavorare, hanno, weekend.',
  },
  {
    id: ACT.apocope,
    section: 'Truncation and elision',
    title: 'Apocope / elisione — when words shorten or merge',
    goals: [
      'Apply apocope (troncamento): some words drop a final vowel before another word for rhythm — buon giorno (not "buono giorno"), san Pietro (not "santo Pietro"), bel ragazzo (not "bello ragazzo").',
      'Apply elision (elisione): some articles and pronouns drop their vowel before a vowel-initial word, replaced by an apostrophe — l\'amico (lo + amico), l\'idea (la + idea), un\'amica (una + amica, but NOT "un amico" for masculine).',
      'Notice that the apostrophe in un\'amica signals feminine ("una" elided) — without the apostrophe, "un amico" is masculine. This is one of the few cases where the apostrophe is grammatically meaningful.',
    ],
    task: 'Write the correct elided/truncated form for each pair: lo + amico → ?; una + ora → ?; bello + uomo → ?; santo + Antonio → ?.',
  },
  {
    id: ACT.intonation,
    section: 'Intonation',
    title: 'Intonazione — questions, statements, and emphasis',
    goals: [
      'Use rising intonation on yes/no questions: parli italiano? rises on -liano. Italian word order does NOT change for yes/no questions — only intonation marks them.',
      'Keep flat-to-falling intonation on statements (parli italiano. — a statement) and on wh-questions (dove abiti? — falling like a statement, because the wh-word carries the question force).',
      'Note that Italian intonation is generally more melodic and wider in pitch range than English — emphasis is signaled by pitch peaks on the content word, not by raising volume.',
    ],
    task: 'Read each sentence twice — once as a statement, once as a yes/no question — and produce the intonation contrast clearly.',
  },
  {
    id: ACT.reading,
    section: 'Reading Practice',
    title: 'Lettura — Read a full sentence applying every rule',
    goals: [
      'Read a short Italian sentence aloud with correct vowel quality, geminates, c/g softening, gl/gn palatals, and stress placement.',
      'Identify each phonological feature in the sentence: where does stress fall? Which c/g is hard vs soft? Where is the geminate?',
    ],
    task: 'Read aloud: "Buongiorno! Mi chiamo Anna e sono una studentessa dell\'Università di Bologna." Then point out the geminates, the chi /ki/, the soft gi /dʒ/, and the elision in "dell\'".',
  },
];

const level1Foundation = {
  title: 'Foundation: Italian Phonology & Stress — Reading and Pronouncing Italian',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'it',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'foundation',
  activities,
  expressionPractice: [],
  relatedPools: [],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Why phonology first
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'L\'ortografia è quasi fonetica',
      "lor-to-gra-FI-a è KWA-zi fo-NE-ti-ka",
      'Italian spelling is almost fully phonemic — with a handful of rules (c/g softening, gl/gn, sc, double consonants, stress) every written word predicts its pronunciation. Unlike English, Italian has almost no silent letters and almost no ambiguous spellings.',
      'word',
      'Italian: amico /aˈmiː.ko/, casa /ˈkaː.sa/, gnocchi /ˈɲɔk.ki/ — predictable from the spelling.',
      'Once the rules are internalized you can read any Italian text aloud, even words you have never seen.',
      [
        { target: 'amico', note: 'penultimate stress, hard c /k/ before i? NO — c before i would be soft /tʃ/. But "amico" has c followed by o → hard /k/. Read as a-MI-co.' },
        { target: 'casa', note: 'penultimate stress, single s pronounced [z] in northern standard, [s] in Tuscan — both acceptable.' },
        { target: 'gnocchi', note: 'palatal nasal /ɲ/ from gn + geminated /kk/ from cch — sound nothing like the spelling suggests to English eyes.' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'Sette vocali, non cinque',
      "SET-te vo-KA-li, non CHIN-que",
      'Italian has 7 vowel sounds — /a, e, ɛ, i, o, ɔ, u/ — even though only 5 letters are written. The mid vowels e and o each have an open and a closed variant, and the contrast can change meaning: pèsca /ˈpɛs.ka/ "peach" vs pésca /ˈpes.ka/ "fishing"; bòtte /ˈbɔt.te/ "barrel" vs bótte /ˈbot.te/ "blows".',
      'word',
      'pèsca (peach) vs pésca (fishing) — same spelling, different vowel and different word.',
      'Most learners eventually pick up the open/closed distinction through exposure; in dictionaries, è and ò are marked grave, é and ó acute.',
      [
        { target: '/ɛ/ è (open e)', note: 'wider, lower jaw, like the e in English "bed"' },
        { target: '/e/ é (closed e)', note: 'narrower, higher jaw, like the e in French "été" or German "See"' },
        { target: '/ɔ/ ò (open o)', note: 'wider, like the o in English "thought" (less rounded)' },
        { target: '/o/ ó (closed o)', note: 'narrower, more rounded, like the o in French "eau" or German "rot"' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'Le consonanti doppie contano',
      "le kon-so-NAN-ti DOP-pje KON-ta-no",
      'Double consonants are pronounced longer than single ones, and the length contrast distinguishes words: casa /ˈkaː.sa/ "house" vs cassa /ˈkas.sa/ "crate", sera /ˈseː.ra/ "evening" vs serra /ˈsɛr.ra/ "greenhouse", copia "copy" vs coppia "couple", caro "dear" vs carro "cart". Native speakers hear the difference instantly.',
      'word',
      'casa "house" (single s) vs cassa "crate" (double s) — same vowels, different consonant length, different word.',
      'English speakers are the worst offenders here — pronounce every double letter you see.',
      null,
      [ACT.intro],
    ),
    createContentItem(
      'Obiettivo del corso',
      "o-bjet-TI-vo del KOR-so",
      'By the end of this Foundation lesson you should be able to read any Italian word aloud with correct vowel quality, geminate length, c/g softening, gl/gn palatals, and stress placement — even words you have never seen — using the spelling rules alone.',
      'word',
      'Goal: read "Buongiorno, mi chiamo Anna e sono dell\'Università di Bologna." with correct pronunciation on first sight.',
      'If you can read this introduction correctly with the chi /ki/, the gi /dʒ/, the geminated nn, and the elision dell\', you have all the Foundation tools and can begin Unit 1.',
      null,
      [ACT.intro],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — The 5 written vowels
    // ────────────────────────────────────────────────────────────────────
    createContentItem('a', 'a /a/', 'Open central vowel like the a in English "father" or Spanish "casa". Mouth wide open, tongue low and central. Never reduced to schwa even when unstressed: banana is /baˈnaː.na/ with three full /a/ vowels.', 'word', 'banana, mamma, casa, gatto, andare', 'Same in all positions, stressed or unstressed — the consistency is the rule.', null, [ACT.vowels]),
    createContentItem('e (in general)', 'e /e/ or /ɛ/', 'A mid-front unrounded vowel. Italian "e" has TWO phonemic values: closed /e/ (perché, séra in some pronunciations) and open /ɛ/ (caffè, bène). Choosing the wrong one is rarely a problem in context but is a strong native-vs-learner cue.', 'word', 'perché /perˈke/, caffè /kafˈfɛ/, bene /ˈbɛː.ne/, ego /ˈɛː.ɡo/', 'The open/closed contrast is detailed in the next activity; for now, aim for a clear non-schwa "e".', null, [ACT.vowels]),
    createContentItem('i', 'i /i/', 'Close front unrounded vowel like the "ee" in English "see". Always tense, never lax like the "i" in English "sit". Examples: vino, pizza, ribelle.', 'word', 'vino, pizza, mille, città, italiano', 'Italian "i" is always tense; never mix in the lax English "sit"-style /ɪ/.', null, [ACT.vowels]),
    createContentItem('o (in general)', 'o /o/ or /ɔ/', 'A mid-back rounded vowel. Italian "o" has TWO phonemic values: closed /o/ (dove, sopra) and open /ɔ/ (però, otto). Both are clearly rounded — the lips stay round.', 'word', 'dove /ˈdoː.ve/, otto /ˈɔt.to/, sole /ˈsoː.le/, però /peˈrɔ/', 'The open/closed contrast is in the next activity; for now, aim for a clearly rounded "o".', null, [ACT.vowels]),
    createContentItem('u', 'u /u/', 'Close back rounded vowel like "oo" in English "boot". Lips firmly rounded and protruded; tongue back. Examples: luna, uno, computer (in Italian pronunciation, the u is /u/).', 'word', 'luna, uno, futuro, succo, museo', 'Always /u/ — never the English schwa or lax vowel that "u" can represent in English.', null, [ACT.vowels]),
    createContentItem(
      'Le vocali sono sempre piene',
      "le vo-KA-li SO-no SEM-pre PJE-ne",
      'Italian vowels are never reduced. English speakers must resist the urge to weaken unstressed vowels to schwa: in "banana", all three vowels are full /a/. This consistency is the strongest single feature of Italian rhythm.',
      'sentence',
      'banana /baˈnaː.na/ — three full /a/, never /bəˈnæn.ə/',
      'Holding every vowel pure is harder than it sounds; English habits make us schwa-ize unstressed syllables.',
      [
        { target: 'NO schwa /ə/', note: 'unstressed vowels are still full vowels in Italian, not the centralized /ə/ of English' },
        { target: 'NO laxing', note: 'i is always /i/ (tense), never /ɪ/ (lax); same for u → /u/ never /ʊ/' },
      ],
      [ACT.vowels],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Open vs closed mid vowels
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'è vs é (open vs closed e)',
      'è /ɛ/ vs é /e/',
      'Italian distinguishes two e sounds. Closed /e/ (é) is narrower and higher — like the French "été" or German "See". Open /ɛ/ (è) is wider and lower — like English "bed". The contrast is phonemic: pésca /ˈpes.ka/ "fishing" vs pèsca /ˈpɛs.ka/ "peach"; vénti /ˈven.ti/ "twenty" vs vènti /ˈvɛn.ti/ "winds".',
      'word',
      'pèsca (peach, /ɛ/) vs pésca (fishing, /e/) — minimal pair distinguished only by vowel quality',
      'Native speakers feel the distinction instantly; learners pick it up over time with exposure.',
      [
        { target: 'è /ɛ/ — open', note: 'wider jaw, like English "bed"; written grave in dictionaries and on final-stress words (caffè, però)' },
        { target: 'é /e/ — closed', note: 'narrower jaw, like French "été"; written acute on final-stress words (perché, né, sé)' },
      ],
      [ACT.openClosed],
    ),
    createContentItem(
      'ò vs ó (open vs closed o)',
      'ò /ɔ/ vs ó /o/',
      'Italian distinguishes two o sounds. Closed /o/ (ó) is narrower and more rounded — like French "eau". Open /ɔ/ (ò) is wider and lower — like English "thought" but less rounded. The contrast is phonemic: bótte /ˈbot.te/ "blows" vs bòtte /ˈbɔt.te/ "barrel"; mózzo /ˈmot.tso/ "hub" vs mòzzo /ˈmɔt.tso/ "stump".',
      'word',
      'bòtte (barrel, /ɔ/) vs bótte (blows, /o/) — distinguished only by vowel quality + sometimes geminate length',
      'In writing, the grave/acute accent appears only on final-stress words; elsewhere, native speakers learn by tradition.',
      [
        { target: 'ò /ɔ/ — open', note: 'wider, less rounded; written grave (però, ciò, dò)' },
        { target: 'ó /o/ — closed', note: 'narrower, more rounded; written acute on final-stress words is rare — usually just an unmarked "o"' },
      ],
      [ACT.openClosed],
    ),
    createContentItem(
      'L\'accento sulle finali',
      "lat-CHEN-to SUL-le fi-NA-li",
      'The grave (è ò à ù ì) and acute (é) accents are written ONLY on a final stressed vowel. In all other positions, the open/closed quality is unmarked and learned from exposure. The accent at the end is mandatory: caffè without the grave is a misspelling.',
      'sentence',
      'caffè, però, città, virtù, lunedì, perché, né, sé — all final-stressed and all written with an accent',
      'Without the final accent, Italian readers would misread the stress and the word.',
      [
        { target: 'grave: à è ì ò ù', note: 'used on most final-stressed words; à and the others always grave' },
        { target: 'acute: é', note: 'used only on final-stressed closed-e words: perché, né, sé, ventitré' },
      ],
      [ACT.openClosed],
    ),
    createContentItem(
      'Coppie minime e/ɛ e o/ɔ',
      "KOP-pje MI-ni-me",
      'A handful of minimal pairs distinguished only by vowel quality. Native speakers know these by lifelong exposure; learners can use them as listening targets.',
      'sentence',
      'pèsca (peach) vs pésca (fishing) · bòtte (barrel) vs bótte (blows) · vénti (20) vs vènti (winds) · accétta (axe) vs accètta (s/he accepts)',
      'Most regional dialects neutralize one or both contrasts; the open/closed distinction is most reliable in standard Tuscan/Roman Italian.',
      [
        { target: 'pèsca /ˈpɛs.ka/ peach', note: 'open e' },
        { target: 'pésca /ˈpes.ka/ fishing', note: 'closed e' },
        { target: 'vènti /ˈvɛn.ti/ winds', note: 'open e — masculine plural of vento "wind"' },
        { target: 'vénti /ˈven.ti/ twenty', note: 'closed e — the number 20' },
      ],
      [ACT.openClosed],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Consonants
    // ────────────────────────────────────────────────────────────────────
    createContentItem('b', 'b /b/', 'Voiced bilabial stop, like English b. Geminated bb is held longer: gobba /ˈɡob.ba/ "hump".', 'word', 'bambino, bocca, bello, gobba', 'Same as English b; geminate is just longer.', null, [ACT.consonants]),
    createContentItem('d', 'd /d/', 'Voiced alveolar stop, like English d but with the tongue against the upper teeth (dental, not alveolar). Geminated dd: freddo /ˈfred.do/ "cold".', 'word', 'dove, donna, freddo, gradito', 'Slightly more dental than English d; the difference is subtle.', null, [ACT.consonants]),
    createContentItem('f', 'f /f/', 'Voiceless labiodental fricative, identical to English f. Geminated ff: caffè /kafˈfɛ/.', 'word', 'famiglia, fame, caffè, soffio', 'Same as English f; geminate is held longer.', null, [ACT.consonants]),
    createContentItem('l', 'l /l/', 'Voiced alveolar lateral. Italian l is always "clear" /l/ (like English "leaf") and never "dark" /ɫ/ (like English "feel"). Geminated ll: bello /ˈbɛl.lo/.', 'word', 'luna, latte, bello, mille', 'Always clear, never the back-of-tongue "dark l" of English word-finals.', null, [ACT.consonants]),
    createContentItem('m', 'm /m/', 'Voiced bilabial nasal, identical to English m. Geminated mm: mamma /ˈmam.ma/.', 'word', 'mamma, mano, immagine, dramma', 'Identical to English m.', null, [ACT.consonants]),
    createContentItem('n', 'n /n/', 'Voiced alveolar nasal, like English n. Geminated nn: anno /ˈan.no/ "year" — contrast with ano /ˈaː.no/ "anus".', 'word', 'no, naso, anno, donna', 'Geminate vs single is a meaning-bearing contrast: ano vs anno.', null, [ACT.consonants]),
    createContentItem('p', 'p /p/', 'Voiceless bilabial stop. Italian p is UNaspirated — no puff of air after the release, unlike English "pat". Closer to the p in English "spat". Geminated pp: cappello /kapˈpɛl.lo/ "hat".', 'word', 'pane, pasta, cappello, doppio', 'No puff of air — sounds slightly softer than the English word-initial p.', null, [ACT.consonants]),
    createContentItem('r', 'r /r/ (trilled)', 'Alveolar trill or tap. Italian r is a rolled tongue-tip flap, never the English /ɹ/. Geminated rr is even longer: carro /ˈkar.ro/ "cart", carriera /karˈrjɛː.ra/ "career".', 'word', 'rosso, ragazzo, carro, terra', 'One of the hardest sounds for English speakers; practice with "tt-r-r" tongue rolls.', null, [ACT.consonants]),
    createContentItem('s (voiceless)', 's /s/', 'Voiceless alveolar fricative, like English s. Used word-initially, after consonants, and when geminated (ss: rosso /ˈros.so/). In some regional standards (Tuscan, southern), single s between vowels is also /s/ — casa /ˈka.sa/.', 'word', 'sole, scuola, rosso, casa (Tuscan)', 'Geminated ss is always /s/.', null, [ACT.consonants]),
    createContentItem('s (voiced)', 's /z/', 'Voiced alveolar fricative, like English z. Used before voiced consonants (sbaglio /ˈzba.ʎo/ "mistake", smettere "to stop") and in northern standard pronunciation of single s between vowels: casa /ˈka.za/, rosa /ˈrɔ.za/.', 'word', 'sbaglio, sviluppo, casa (northern), rosa', 'Region variable: northern Italian voices intervocalic s; Tuscan often does not.', null, [ACT.consonants]),
    createContentItem('t', 't /t/', 'Voiceless dental stop. Tongue against the upper teeth (more dental than English t), UNaspirated (no puff). Geminated tt: tetto /ˈtet.to/ "roof".', 'word', 'tavolo, tutto, tetto, attimo', 'Slightly more dental than English t and no puff of air.', null, [ACT.consonants]),
    createContentItem('v', 'v /v/', 'Voiced labiodental fricative, identical to English v. Geminated vv is rare but exists: davvero /davˈveː.ro/ "really".', 'word', 'vino, vita, davvero, evviva', 'Same as English v.', null, [ACT.consonants]),
    createContentItem('z (voiceless)', 'z /ts/', 'Voiceless alveolar affricate, like the "ts" in English "cats" but at the start or middle of a syllable. Pizza /ˈpit.tsa/, grazie /ˈɡrat.tsje/, marzo /ˈmar.tso/.', 'word', 'pizza, grazie, marzo, stazione', 'Word-medial z is often geminated even when written single (pizza vs pìza).', null, [ACT.consonants]),
    createContentItem('z (voiced)', 'z /dz/', 'Voiced alveolar affricate, like English "dz" or the German z in "Zeit" reversed-voicing. Zaino /ˈdzai.no/ "backpack", zero /ˈdzɛː.ro/, zona /ˈdzɔː.na/.', 'word', 'zero, zaino, zona, mezzo', 'Same letter as voiceless z; only context tells you which.', null, [ACT.consonants]),
    createContentItem('q', 'q /k/ + always followed by u', 'Identical to /k/ in pronunciation, but always written as "qu" with a following vowel: quando /ˈkwan.do/ "when", quattro /ˈkwat.tro/ "four". Never the /kw/ of English "quick" with rounding — Italian qu is /kw/ where the w is a glide.', 'word', 'quando, quattro, qui, quasi', 'Spelling rule: when /kw/ + vowel, write qu; do not use cu except after c-double like "acqua".', null, [ACT.consonants]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — c, g softening
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'c duro vs c dolce',
      'hard c /k/ vs soft c /tʃ/',
      'Italian c has TWO sounds determined by the next letter. Before a, o, u, and any consonant, c is hard /k/: casa, come, cucina, classe. Before i or e, c is soft /tʃ/ (English "ch"): ciao /tʃao/, cinema /ˈtʃiː.ne.ma/, cento /ˈtʃɛn.to/. The rule is fully predictable.',
      'sentence',
      'HARD: casa /ˈkaː.sa/, cosa /ˈkɔː.sa/, cucina /kuˈtʃiː.na/ (only first c)\nSOFT: ciao /tʃao/, cinema, cena /ˈtʃeː.na/',
      'There are no exceptions — the rule applies to every c in every Italian word.',
      [
        { target: 'c + a/o/u → /k/', note: 'casa, come, cucina, classe' },
        { target: 'c + i/e → /tʃ/', note: 'ciao, cinema, cento' },
      ],
      [ACT.softening],
    ),
    createContentItem(
      'ch + i/e per il c duro',
      'ch keeps c hard before i or e',
      'To write a hard /k/ before i or e, Italian inserts an h: chi /ki/, che /ke/, che /ˈkeː/. The h is silent and ONLY signals "the c stays hard". Similarly, hard-c plurals: amico → amici /aˈmiː.tʃi/ (regular soft), but parco → parchi /ˈpar.ki/ (hard, h added).',
      'sentence',
      'chi /ki/ "who", che /ke/ "what/that", chiave /ˈkjaː.ve/ "key", chiesa /ˈkjɛː.za/ "church"',
      'The h is purely orthographic — it never has its own sound.',
      [
        { target: 'chi /ki/', note: '"who" — most common ch word' },
        { target: 'che /ke/', note: '"what / that" — ubiquitous; both relative and interrogative' },
        { target: 'chiave /ˈkjaː.ve/', note: '"key" — note also the palatalized jav reading' },
      ],
      [ACT.softening],
    ),
    createContentItem(
      'g duro vs g dolce',
      'hard g /ɡ/ vs soft g /dʒ/',
      'Same rule as c. Before a, o, u, and consonants, g is hard /ɡ/: gamba "leg", gola "throat", gusto "taste", grande. Before i or e, g is soft /dʒ/ (English "j"): gente /ˈdʒɛn.te/ "people", giorno /ˈdʒor.no/ "day", giudice /ˈdʒuː.di.tʃe/ "judge". To keep g hard before i or e, write gh: spaghetti /spaˈɡet.ti/, ghiaccio /ˈɡjat.tʃo/ "ice".',
      'sentence',
      'HARD: gamba, gola, gusto, ghiaccio, spaghetti\nSOFT: gente, giorno, gelato, giudice',
      'Same pattern as c, just with g instead.',
      [
        { target: 'g + a/o/u → /ɡ/', note: 'gamba, gola, gusto' },
        { target: 'g + i/e → /dʒ/', note: 'gente, giorno, gelato' },
        { target: 'gh + i/e → /ɡ/', note: 'spaghetti, ghiaccio — h keeps g hard' },
      ],
      [ACT.softening],
    ),
    createContentItem(
      'La i muta in cia/cio/ciu, gia/gio/giu',
      'silent i in cia/cio/ciu, gia/gio/giu',
      'When ci or gi is followed by a, o, or u, the i is SILENT — it is just a spelling device to mark the soft c/g. So ciao = /tʃao/ (one syllable, no /i/), giorno = /ˈdʒor.no/ (no /i/), giudice = /ˈdʒuː.di.tʃe/ (the gi is /dʒ/, then a u). Pronouncing the i would be a learner error.',
      'sentence',
      'ciao /tʃao/ NOT /tʃi.ao/ · giorno /ˈdʒor.no/ NOT /dʒi.or.no/ · cucchiaio /kukˈkjaː.jo/ "spoon" — the i in chia is also silent? NO, here it is /kja/ — different rule, see below.',
      'The silent i only applies after c, sc, or g when followed by a/o/u; it is an orthographic device.',
      null,
      [ACT.softening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — gl, gn, sc digraphs
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'gl + i → /ʎ/',
      'gli /ʎ/ palatal lateral',
      'When gl is followed by i (and usually another vowel), it is pronounced /ʎ/ — a palatal lateral, like Spanish "ll" in Spain or the "lli" in English "million" pronounced quickly. NEVER like English "gl" of "glass". Examples: figlio /ˈfiʎ.ʎo/ "son", famiglia /faˈmiʎ.ʎa/, aglio /ˈaʎ.ʎo/ "garlic", gli /ʎi/ (the masculine plural article).',
      'sentence',
      'figlio /ˈfiʎ.ʎo/ "son" · famiglia /faˈmiʎ.ʎa/ "family" · gli /ʎi/ "the (m.pl.)"',
      'Many learners say /ɡli/ — wrong; it must be the palatal /ʎ/.',
      [
        { target: 'gli + V → /ʎ/', note: 'figlio, famiglia, foglia (leaf), maglia (sweater)' },
        { target: 'gli (article)', note: 'masculine plural definite article /ʎi/; gli alunni, gli studenti' },
        { target: 'EXCEPTION: gl + a/o/u → /ɡl/', note: 'globo /ˈɡlɔː.bo/, gloria /ˈɡlɔː.rja/ — only gl + i is palatal' },
      ],
      [ACT.digraphs],
    ),
    createContentItem(
      'gn → /ɲ/',
      'gn /ɲ/ palatal nasal',
      'gn is always /ɲ/ — a palatal nasal, like Spanish "ñ" or French "gn" in "agneau". Examples: gnocchi /ˈɲɔk.ki/, signora /siɲˈɲoː.ra/ "lady", lasagna /laˈzaɲ.ɲa/, bagno /ˈbaɲ.ɲo/ "bathroom", insegnare /in.seɲˈɲaː.re/ "to teach". Often phonetically geminated even when written single.',
      'sentence',
      'gnocchi /ˈɲɔk.ki/ · signora /siɲˈɲoː.ra/ · lasagna /laˈzaɲ.ɲa/ · bagno /ˈbaɲ.ɲo/',
      'Never read gn as English "gn" of "sign" (where g is silent and n is alveolar).',
      [
        { target: 'gn + a/e/i/o/u → /ɲ/', note: 'always palatal nasal, in any context' },
        { target: 'phonetically geminated', note: 'gn between vowels is held long even without a written double letter' },
      ],
      [ACT.digraphs],
    ),
    createContentItem(
      'sc + i/e → /ʃ/',
      'sc soft /ʃ/ before i or e',
      'When sc is followed by i or e, it is pronounced /ʃ/ (English "sh"): pesce /ˈpeʃ.ʃe/ "fish", sciare /ˈʃaː.re/ "to ski", scienza /ˈʃɛn.tsa/ "science", scendere /ˈʃen.de.re/ "to descend". Phonetically often geminated /ʃʃ/ between vowels.',
      'sentence',
      'pesce /ˈpeʃ.ʃe/ · sciare /ˈʃaː.re/ · scienza /ˈʃɛn.tsa/ · scena /ˈʃɛː.na/ "scene"',
      'Same i-silencing rule as c/g: sciare = /ˈʃaː.re/, the i is purely orthographic.',
      [
        { target: 'sc + i/e → /ʃ/', note: 'pesce, scienza, sciare' },
        { target: 'sci + V → /ʃ/ (i silent)', note: 'sciare /ˈʃaː.re/, sciopero /ˈʃɔː.pe.ro/ "strike"' },
      ],
      [ACT.digraphs],
    ),
    createContentItem(
      'sc + a/o/u → /sk/',
      'sc hard /sk/ before a, o, u',
      'When sc is followed by a, o, u, or a consonant, it is pronounced /sk/ (English "sk"): scuola /ˈskwɔː.la/ "school", scarpa /ˈskar.pa/ "shoe", scuro /ˈskuː.ro/ "dark", scrivere /ˈskri.ve.re/ "to write". To keep sc hard before i or e, write sch: schifo /ˈski.fo/ "disgust", scherzo /ˈsker.tso/ "joke".',
      'sentence',
      'HARD: scuola, scarpa, scuro, scrivere, schermo /ˈsker.mo/ "screen"\nSOFT: pesce, scienza, sciare',
      'Same h-trick as c/g: sch keeps sc hard before i/e.',
      [
        { target: 'sc + a/o/u/cons → /sk/', note: 'scuola, scarpa, scrivere' },
        { target: 'sch + i/e → /sk/', note: 'schifo, scheda, scherzo — h keeps sc hard' },
      ],
      [ACT.digraphs],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Geminate consonants
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Consonanti doppie',
      'gemination — hold the consonant longer',
      'Every double consonant in Italian spelling is pronounced as a longer, held consonant. The contrast is meaning-bearing: casa /ˈkaː.sa/ "house" vs cassa /ˈkas.sa/ "crate"; ano /ˈaː.no/ vs anno /ˈanː.no/; sete /ˈseː.te/ "thirst" vs sette /ˈset.te/ "seven"; copia /ˈkɔː.pja/ vs coppia /ˈkop.pja/.',
      'sentence',
      'casa (house) vs cassa (crate) · sete (thirst) vs sette (seven) · capello (single hair) vs cappello (hat) · pala (shovel) vs palla (ball)',
      'The vowel before a geminate is shorter; the vowel before a single consonant is longer.',
      [
        { target: 'short vowel + long consonant', note: 'cassa /ˈkas.sa/ — vowel clipped, ss held' },
        { target: 'long vowel + short consonant', note: 'casa /ˈkaː.sa/ — vowel lengthened, s short' },
      ],
      [ACT.geminates],
    ),
    createContentItem(
      'Geminate speciali: cch, ggh, zz',
      'cch /kk/, ggh /ɡɡ/, zz /tts/ or /ddz/',
      'Some combinations are double consonants written with an h: cch is /kk/ (occhio /ˈɔk.kjo/ "eye", bicchiere "glass"), gghi /ɡɡi/ (rare but exists in classical names), and zz is /tts/ or /ddz/ — almost always geminated when written single, and always when written double: pizza /ˈpit.tsa/, mezzo /ˈmɛd.dzo/ "half".',
      'sentence',
      'occhio /ˈɔk.kjo/ · bicchiere /bikˈkjɛː.re/ · pizza /ˈpit.tsa/ · mezzo /ˈmɛd.dzo/',
      'The "double" feature applies to digraphs as well as single letters.',
      [
        { target: 'cch → /kk/', note: 'occhio, bicchiere, secchio "bucket"' },
        { target: 'gg+i/e → /ddʒ/', note: 'oggi /ˈɔd.dʒi/ "today", maggio "May", peggio /ˈpɛd.dʒo/ "worse"' },
        { target: 'zz → /tts/ or /ddz/', note: 'pizza, mezzo, ragazzo /raˈɡat.tso/' },
      ],
      [ACT.geminates],
    ),
    createContentItem(
      'Geminate non-double per ortografia',
      'phonetic geminates not always written',
      'A few sounds are phonetically geminated even when written single: gn between vowels (signora /siɲˈɲoː.ra/), gl + i between vowels (famiglia /faˈmiʎ.ʎa/), z between vowels in many words (pizza is written zz, but azoto "nitrogen" has a single z, yet often pronounced geminated regionally). Listen for the length even when the spelling is single.',
      'sentence',
      'signora /siɲˈɲoː.ra/, famiglia /faˈmiʎ.ʎa/, sciare /ˈʃʃaː.re/ in some regions',
      'A subtle feature but a strong native-vs-learner cue once mastered.',
      null,
      [ACT.geminates],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Word stress
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Parole piane',
      'piane — penultimate stress (default)',
      'About 70% of Italian words have stress on the penultimate (second-to-last) syllable. These are called "parole piane". Examples: amico (a-MI-co), casa (CA-sa), parlare (par-LA-re), ragazzo (ra-GAZ-zo). No accent mark is written — the stress is the default.',
      'sentence',
      'a-MI-co, ca-SA, par-LA-re, ra-GAZ-zo, cu-CI-na, sa-PE-re',
      'Default for unmarked words; if no other rule signals stress, assume penultimate.',
      [
        { target: 'amico → a-MI-co', note: 'three syllables, stress on second-to-last' },
        { target: 'parlare → par-LA-re', note: 'verb infinitive, stress on second-to-last (penultimate)' },
        { target: 'ragazzo → ra-GAZ-zo', note: 'noun, penultimate stress' },
      ],
      [ACT.stress],
    ),
    createContentItem(
      'Parole sdrucciole',
      'sdrucciole — antepenultimate stress',
      'A large minority of Italian words have stress on the antepenultimate (third-to-last) syllable. These are "parole sdrucciole". Common in third-person plural verbs (abitano "they live", parlano "they speak") and many nouns (telefono, musica, fragile, sabato, indice). No accent mark — you simply have to know.',
      'sentence',
      'TE-le-fo-no, MU-si-ca, A-bi-ta-no, SA-ba-to, FRA-gi-le',
      'Especially common in 3rd-plural verbs (-ano, -ono endings); also frequent in scientific and technical vocabulary.',
      [
        { target: 'telefono → TE-le-fo-no', note: 'antepenultimate stress on first syllable of a 4-syllable word' },
        { target: 'abitano → A-bi-ta-no', note: '"they live" — 3rd-plural verbs are almost all sdrucciole' },
        { target: 'musica → MU-si-ca', note: 'noun with antepenultimate stress' },
      ],
      [ACT.stress],
    ),
    createContentItem(
      'Parole tronche',
      'tronche — final-syllable stress',
      'Words ending in a stressed final vowel are "parole tronche" and ALWAYS marked with a written grave or acute accent: caffè, però, città, virtù, lunedì, perché. Without the accent, the reader would default to penultimate and misread the word. This is the only mandatory written stress mark in Italian.',
      'sentence',
      'caf-FÈ, pe-RÒ, cit-TÀ, vir-TÙ, lu-ne-DÌ, per-CHÉ',
      'Always written with a grave accent (à è ì ò ù) or acute on é.',
      [
        { target: 'caffè', note: 'final stress on open è — coffee, the iconic Italian word' },
        { target: 'città', note: 'final stress on à — "city"; same rule as caffè' },
        { target: 'perché', note: 'final stress on closed é — written acute, the only common acute in everyday text' },
      ],
      [ACT.stress],
    ),
    createContentItem(
      'Parole bisdrucciole',
      'bisdrucciole — fourth-from-last stress',
      'Rare: words with stress on the fourth-from-last syllable. Almost always verb forms with attached clitics: compràmelo "buy it for me" (COM-pra-me-lo), abìtano in some regional accents, or comunichìmelo. Native speakers recognize them by pattern.',
      'sentence',
      'COM-pra-me-lo, DI-glie-lo-glie-lo, AL-zan-do-si',
      'Rare in everyday speech; mainly in imperatives with stacked clitics.',
      null,
      [ACT.stress],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Spelling-to-sound
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Ortografia trasparente',
      'spelling-to-sound is mostly predictable',
      'Italian spelling is one of the most regular in Europe. Given the rules from this lesson (c/g softening, gl/gn, sc, double consonants, written accent on final-stress words), you can read almost any Italian word correctly on first sight. The few exceptions are: open/closed mid vowels (not marked except finally), s/z voicing (regionally variable), and place-name/foreign-borrowing peculiarities.',
      'sentence',
      'chiamare, ghirlanda, sciopero, lavorare, hanno, computer — all readable from the rules',
      'Compare to English where "ough" can be 8 sounds (cough, dough, through, tough, thought, plough, hiccough, lough) — Italian has no such chaos.',
      null,
      [ACT.spelling],
    ),
    createContentItem(
      'H muta',
      'silent h',
      'Italian h is almost ALWAYS silent. Its only function is orthographic: in ch/gh/sch it keeps c/g/sc hard before i/e; in the verb avere ("to have") and a few interjections, it has no sound at all. Examples: ho /ɔ/ "I have", hai /ai/ "you have", ha /a/ "s/he has", hanno /ˈanː.no/ "they have". Pronouncing the h is a learner error.',
      'sentence',
      'ho, hai, ha, hanno — all without any /h/ sound · oh!, ahi! interjections too',
      'The h in avere distinguishes forms in writing: ho vs o "or"; hai vs ai "to the (m.pl.)"; ha vs a "to"; hanno vs anno "year". Same sound, different spelling.',
      [
        { target: 'ho vs o', note: '"I have" vs "or" — same sound /ɔ/, different meaning' },
        { target: 'hai vs ai', note: '"you have" vs "to the (m.pl.)" — same sound /ai/, different meaning' },
        { target: 'hanno vs anno', note: '"they have" vs "year" — same sound /ˈanː.no/, different meaning' },
      ],
      [ACT.spelling],
    ),
    createContentItem(
      'Prestiti stranieri',
      'foreign borrowings keep foreign spelling',
      'Italian generally adapts foreign loanwords to its phonology but preserves their original spelling. Computer is /komˈpjuː.ter/, weekend /ˈwiː.kɛnd/, file /fail/, manager /ˈmɛ.ne.dʒer/. The native pronunciation rules are bent for English-origin words.',
      'sentence',
      'computer, weekend, file, manager, mouse, design, leader',
      'These are usually invariable (no Italian plural ending): un computer, due computer.',
      null,
      [ACT.spelling],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Apocope and elision
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Apocope (troncamento)',
      'apocope — dropping final vowel',
      'Some words drop their final vowel before another word for rhythmic flow. The most common: buono → buon (buon giorno), bello → bel (bel ragazzo), santo → san (San Pietro), grande → gran (gran cosa), uno → un (un amico). The dropped vowel is NOT replaced by an apostrophe — the new form is just the shorter word.',
      'sentence',
      'buon giorno (not buono giorno) · San Pietro · bel ragazzo · un amico',
      'Applies mainly to adjectives before nouns and to "santo" before names.',
      [
        { target: 'buon giorno', note: '"good day" — buono shortened to buon before a masculine noun starting with a consonant' },
        { target: 'San Pietro', note: '"Saint Peter" — santo → san before consonant-initial male names' },
        { target: 'bel paese', note: '"beautiful country" — bello → bel; "Bel Paese" is also a famous cheese' },
      ],
      [ACT.apocope],
    ),
    createContentItem(
      'Elisione',
      'elision — dropping vowel + apostrophe',
      'Some articles and pronouns drop their final vowel before a vowel-initial word, marked by an apostrophe. lo → l\' (l\'amico), la → l\' (l\'idea), una → un\' (un\'amica, but un amico for masculine), questo → quest\' (quest\'anno "this year"). The apostrophe is mandatory — without it the spelling is wrong.',
      'sentence',
      'l\'amico (lo + amico) · l\'idea (la + idea) · un\'amica (una + amica) · quest\'anno (questo + anno)',
      'Be especially careful with un vs un\' — the apostrophe is the only thing marking the feminine.',
      [
        { target: "lo + amico → l'amico", note: 'masculine vowel-initial' },
        { target: "la + idea → l'idea", note: 'feminine vowel-initial' },
        { target: "una + amica → un'amica", note: 'feminine — apostrophe required to mark feminine' },
        { target: 'un amico (NO apostrophe)', note: 'masculine — no elision needed, no apostrophe' },
      ],
      [ACT.apocope],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Intonation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Intonazione affermativa',
      'falling intonation on statements',
      'Italian statements end with a falling intonation on the last stressed syllable: Parlo italiano. (par-lo i-ta-LIA-no↓). The pitch rises slightly on the stressed syllable, then falls to the end. Wh-questions (with chi, che, dove, quando, perché) use the SAME falling contour — the wh-word carries the question force.',
      'sentence',
      'Parlo italiano. ↓ · Dove abiti? ↓ · Come ti chiami? ↓',
      'Wh-questions in Italian sound flat-to-falling to English ears — no rise like "Where do you live?".',
      null,
      [ACT.intonation],
    ),
    createContentItem(
      'Intonazione interrogativa',
      'rising intonation on yes/no questions',
      'Yes/no questions in Italian use rising intonation on the last stressed syllable, with no change in word order: Parli italiano? rises on i-ta-LIA-no↑. This is the ONLY way to mark a yes/no question in Italian — no auxiliary inversion, no "do" support, no question word.',
      'sentence',
      'Parli italiano. (statement) → Parli italiano? (question, same words, rising end)',
      'Italian relies entirely on intonation for yes/no question marking, unlike English which uses word order.',
      [
        { target: 'statement: parlo italiano ↓', note: 'pitch falls on final syllable' },
        { target: 'question: parli italiano? ↑', note: 'pitch rises on final syllable; same word order as statement' },
      ],
      [ACT.intonation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Reading Practice
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Lettura completa',
      'a sentence applying every rule',
      'A complete sentence exercising every Foundation rule: vowels, geminates, c/g softening, gl, gn, sc, stress, and elision. Reading it fluently means every rule has clicked.',
      'sentence',
      '"Buongiorno! Mi chiamo Anna e sono una studentessa dell\'Università di Bologna."',
      'Identify each rule: where is a geminate? Where is chi /ki/? Where is the elision? Where is the gn?',
      [
        { target: 'Buongiorno', note: 'buon + giorno — apocope of buono; gi soft /dʒ/' },
        { target: 'chiamo', note: 'chi /ki/ — h keeps c hard before i; penultimate stress: chi-A-mo' },
        { target: 'Anna', note: 'geminate nn — held longer than single n; contrast with hypothetical "ana"' },
        { target: 'sono', note: 'penultimate stress: SO-no; closed o /o/' },
        { target: 'studentessa', note: 'geminate ss; penultimate stress: stu-den-TES-sa' },
        { target: "dell'", note: 'elision of della (di + la) before vowel-initial Università' },
        { target: 'Università', note: 'final stress on à — written grave accent mandatory: u-ni-ver-si-TÀ' },
        { target: 'Bologna', note: 'gn → /ɲ/ palatal nasal; penultimate stress: bo-LO-gna' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'Identificare l\'accento',
      'identify the stress in each word',
      'Mark the stress on every word in the practice sentence. Stress-marking is the test of Foundation mastery; once you can hear and label every stress, you can move to Unit 1.',
      'sentence',
      'Buon-GIOR-no, mi CHIA-mo AN-na, e SO-no U-na stu-den-TES-sa del-luni-ver-si-TÀ di Bo-LO-gna.',
      'Answer: Buongiorno (penultimate), chiamo (penultimate), Anna (penultimate), sono (penultimate), studentessa (penultimate), Università (final, marked).',
      null,
      [ACT.reading],
    ),
    createContentItem(
      'Sfida — leggere a velocità naturale',
      'stretch — read at conversational tempo',
      'Stretch goal: read the sentence at natural Italian tempo with correct stress, vowel quality, geminates, and palatals. Italian has a fluid melodic rhythm — content words ride the pitch, function words flow lightly between them.',
      'sentence',
      'TEMPO: Buongiorno · mi CHIAmo ANna · e sono UNA studenTESSa dell\'università di BoLOgna.',
      'Stress falls on content words (chiamo, Anna, studentessa, Università, Bologna); function words (mi, e, sono, una, di) flow lightly.',
      null,
      [ACT.reading],
    ),
  ],
};

module.exports = level1Foundation;
