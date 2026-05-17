// Level 1 — Foundation: Dutch Pronunciation, Spelling, and Sound System
// First lesson on the Dutch / Foundation track. Pre-grammar, pre-vocabulary.
// Covers the Dutch alphabet, the famously fricative g/ch, the diphthongs
// ui/ei/ij/au/ou, the long-short vowel system, final devoicing, schwa
// reduction, the difference between Standard Dutch (Netherlands) and Flemish
// (Belgian Dutch), and how regional accents (hard-g Holland vs soft-g
// Brabant/Flanders) reshape the same orthography.
//
// All content is authored with Dutch (target, Latin script) + a phonetic
// hint (romanization slot) + English glosses (canonical source). The AI
// conversation tutor reads this curriculum and delivers it to each learner
// in their preferred native language at runtime — never assume a specific L1
// in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition.

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
  // Legacy keys for UI fallback — the "korean" slot holds the target text,
  // the "english" slot holds the note.
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  intro: 'nl-foundation-intro',
  alphabet: 'nl-foundation-alphabet',
  vowelsShort: 'nl-foundation-vowels-short',
  vowelsLong: 'nl-foundation-vowels-long',
  diphthongs: 'nl-foundation-diphthongs',
  consonants: 'nl-foundation-consonants',
  gAndCh: 'nl-foundation-g-ch',
  finalDevoicing: 'nl-foundation-final-devoicing',
  schwa: 'nl-foundation-schwa',
  spelling: 'nl-foundation-spelling',
  hollandFlanders: 'nl-foundation-holland-flanders',
  reading: 'nl-foundation-reading',
};

const activities = [
  {
    id: ACT.intro,
    section: 'Why Dutch sounds the way it does',
    title: 'Klanksysteem — How Dutch sounds are organized',
    goals: [
      'Understand that Dutch uses the Latin alphabet but spells sounds quite differently from English: "g" is a fricative, "j" is /j/ (English y), and vowels are long or short depending on syllable shape.',
      'Recognize that Dutch is famous for one sound: the voiceless velar/uvular fricative written "g" or "ch" — the "Scheveningen test sound" that distinguishes a native speaker from a learner.',
      'Know that within Dutch there are two big regional poles: Netherlands Dutch (harde g, sharp scraping sound) and Flemish Belgian Dutch (zachte g, much softer palatal fricative) — both are standard.',
    ],
    task: 'Read the four structural facts. By the end of this lesson you should be able to read a Dutch sentence aloud with recognizable g/ch, the right vowel length, and natural schwa reduction.',
  },
  {
    id: ACT.alphabet,
    section: 'Het Nederlandse alfabet',
    title: 'The Dutch alphabet — 26 letters + ij',
    goals: [
      'Recognize all 26 Latin letters and learn that Dutch treats "ij" as a single letter/digraph (sometimes called the 27th letter) — it is even capitalized as IJ (both letters capitalized: IJsselmeer, IJmuiden).',
      'Pronounce each letter name in Dutch: a (aa), b (bee), c (see), d (dee)… so you can spell your name and address aloud on the phone.',
      'Notice that q, x, and y are rare and almost always appear in loanwords (quiz, xylofoon, yoghurt) — native Dutch words avoid them.',
    ],
    task: 'Spell your own name aloud in Dutch letter names, then practice the digraph IJ in IJsselmeer and ijs.',
  },
  {
    id: ACT.vowelsShort,
    section: 'Korte klinkers',
    title: 'Short vowels — a, e, i, o, u in closed syllables',
    goals: [
      'Pronounce the five short vowels: a (/ɑ/ as in "man" man), e (/ɛ/ as in "bed" bed), i (/ɪ/ as in "kip" chicken), o (/ɔ/ as in "bos" forest), u (/ʏ/ as in "bus" bus).',
      'Recognize the spelling rule: a short vowel appears in a CLOSED syllable (ends in a consonant). One vowel letter + closing consonant + maybe more letters = short.',
      'Hear how the Dutch short "u" /ʏ/ is unique — it is rounded like the German ü but shorter; English has no exact equivalent.',
    ],
    task: 'Read aloud man, bed, kip, bos, bus — the textbook five — and feel that the vowel is short and the syllable closes on a consonant.',
  },
  {
    id: ACT.vowelsLong,
    section: 'Lange klinkers',
    title: 'Long vowels — aa, ee, oo, uu, eu, oe, ie',
    goals: [
      'Pronounce the seven long vowels and digraphs: aa /aː/ (maan), ee /eː/ (meer), oo /oː/ (boot), uu /yː/ (muur — like German ü long), eu /øː/ (deur — like French œu in "œuf"), oe /u/ (boek — like English "oo" in "boot"), ie /i/ (riet).',
      'Recognize the spelling rule: a long vowel doubles in a CLOSED syllable (maan, boot) but stays single in an OPEN syllable (manen "moons", boten "boats"). This open-syllable rule is the single most common Dutch spelling pattern.',
      'Distinguish "eu" /øː/ from "uu" /yː/ — both are front-rounded sounds; "eu" is more open, "uu" more closed. Pairs like deur (door) vs duur (expensive) only differ in this vowel.',
    ],
    task: 'Read maan / manen, boot / boten, muur / muren aloud — feel the same long vowel sound but different spelling in open vs closed syllables.',
  },
  {
    id: ACT.diphthongs,
    section: 'Tweeklanken',
    title: 'The famous Dutch diphthongs — ui, ei/ij, au/ou',
    goals: [
      'Pronounce ui /œy/ (huis, ui) — a sound English has no equivalent of; starts open-mid front-rounded and glides to high front-rounded. The single hardest Dutch sound for English speakers.',
      'Hear that ei and ij sound IDENTICAL — both /ɛi/ as in "rein" rain or "rijst" rice. They differ only in spelling, by historical convention; learners memorize which words take which.',
      'Pronounce au and ou — also identical, both /ɑu/ as in "gauw" quickly or "koud" cold. Again same sound, two spellings inherited from older Dutch.',
    ],
    task: 'Read huis, ui, ijs, eind, rijst, koud, gauw aloud — three diphthongs, six spellings, three distinct sounds.',
  },
  {
    id: ACT.consonants,
    section: 'Medeklinkers',
    title: 'Consonants that surprise English speakers — j, v, w, sch',
    goals: [
      'Pronounce Dutch "j" as /j/ (English "y" in "yes") — NOT as English "j" /dʒ/. So ja "yes" sounds like "yah", and Jan sounds like "Yahn".',
      'Hear Dutch "v" — in Netherlands Dutch it is often nearly identical to "f" (vader and Vader sound similar to "fader"); in Flemish it stays a clean voiced /v/.',
      'Pronounce Dutch "w" — bilabial/labiodental approximant /ʋ/, between English "v" and "w". Wat /ʋɑt/ "what" is NEITHER English "vat" nor English "what".',
      'Pronounce the cluster "sch" /sx/ at the start of a word: school /sxoːl/ — an "s" followed by the famous fricative. The town name Scheveningen was the Dutch WW2 shibboleth — non-natives could not pronounce it.',
    ],
    task: 'Read ja, vader, water, school, schipper, Scheveningen aloud and check each against the rule.',
  },
  {
    id: ACT.gAndCh,
    section: 'De Nederlandse g',
    title: 'The famous g/ch — hard-g vs soft-g',
    goals: [
      'Pronounce the voiceless velar/uvular fricative /x/ (or /χ/ in harder accents). This is the single most recognizable Dutch sound. Spelled "g" at the start of a syllable (gaan, goed) and "ch" at the end of a syllable (acht, lach).',
      'Distinguish HARD G (Netherlands, especially Amsterdam, Rotterdam, Den Haag) — a scratchy, far-back /χ/ that English speakers describe as a "throat-clearing" sound, from SOFT G (Flanders, Brabant in NL south) — a much gentler palatal /ç/ closer to German "ich".',
      'Recognize that "ch" inside a word (lachen, nacht) is the SAME sound as "g" at the start — Dutch spelling distributes the same phoneme across two letters by position.',
      'Hear that final "g" devoices but stays a fricative: zag (saw, past tense) is /zɑx/, not /zɑɡ/. There is NO /ɡ/ stop sound in native Dutch words (loanwords like "goal" /ɡoːl/ being the exception).',
    ],
    task: 'Read gaan, goed, lachen, nacht, acht, Scheveningen, gezellig aloud — drill the fricative until you can do five in a row without your throat hurting.',
  },
  {
    id: ACT.finalDevoicing,
    section: 'Eindklankverscherping',
    title: 'Final devoicing — hond sounds like "hont"',
    goals: [
      'Apply the universal Dutch final-devoicing rule: voiced obstruents (b, d, v, z, g) become voiceless at the end of a syllable. So hond "dog" is written with d but pronounced /hɔnt/; web /ʋɛp/; lief /lif/.',
      'Hear that the spelling reveals the underlying form: the plural honden /hɔndə(n)/ keeps the /d/ because it is no longer final; the singular hond /hɔnt/ devoices because /d/ is at the syllable edge.',
      'Recognize that this rule is automatic in spoken Dutch — no native speaker says /hɔnd/. Foreign learners who DO pronounce the final voiced sound stand out immediately.',
    ],
    task: 'Read hond / honden, web / webben, lief / lieve, huis / huizen aloud — feel the singular devoice and the plural voice come back.',
  },
  {
    id: ACT.schwa,
    section: 'De doffe e',
    title: 'Schwa — the dull "e" in unstressed syllables',
    goals: [
      'Recognize that the letter "e" in unstressed syllables is pronounced as schwa /ə/ — the neutral "uh" vowel. So lopen "to walk" is /loːpə(n)/, not /loːpɛn/.',
      'Apply schwa reduction in the high-frequency endings -en, -e, -er, -el: lopen, mensen, vader, water, vogel — all the bolded "e"s reduce to /ə/.',
      'Notice that final -n after schwa is often dropped in casual northern speech: lopen sounds like "lope" in Amsterdam, but is fully /loːpən/ in formal speech and Flemish.',
    ],
    task: 'Read lopen, mensen, vader, water, vogel aloud — light, fast unstressed syllables. Then try a sentence: "De mensen lopen langzaam."',
  },
  {
    id: ACT.spelling,
    section: 'Spellingregels',
    title: 'Open-syllable rule — manen ≠ mannen',
    goals: [
      'Apply the open-syllable spelling rule: a long vowel in an OPEN syllable is written with one letter (manen "moons", lopen "to walk"), in a CLOSED syllable with two (maan "moon", loop "I walk"). Critical for plurals and conjugations.',
      'Apply the closed-syllable doubling rule: a short vowel in an open syllable is preserved by DOUBLING the following consonant (mannen "men", loppen does not exist; correct: lopen for long, but the pattern mannen shows doubled n keeps the a short).',
      'Spell the four-way distinction maan / manen / man / mannen correctly — this is the canonical example Dutch schoolchildren learn first.',
    ],
    task: 'Spell the singular and plural of bus, maan, man, boot — check whether each is short or long and apply the doubling rule.',
  },
  {
    id: ACT.hollandFlanders,
    section: 'Holland vs Vlaanderen',
    title: 'Standard Dutch vs Flemish — same language, two centers',
    goals: [
      'Recognize that Standard Dutch (Algemeen Nederlands, AN) is the umbrella for both Netherlands Dutch and Flemish (Vlaams), the Dutch of northern Belgium. The standard written language is essentially identical; spoken Flemish has softer-g, slower rhythm, more conservative grammar, and some unique vocabulary.',
      'Know a handful of canonical NL-vs-BE word pairs: appelsap (NL) / appelsien-sap (BE), je (NL) / gij (informal BE colloquial), tof (BE) / leuk (NL) for "nice/cool", patat (NL) / frieten (BE) for "fries".',
      'Hear the rhythm difference: Netherlands Dutch is fast, clipped, schwa-reduced; Flemish is slower, more careful with full vowels, and uses fewer reductions.',
    ],
    task: 'Listen to (or imagine) the same sentence "Wat doe je dit weekend?" in Amsterdam and in Antwerpen — note the harde-g vs zachte-g and the rhythm.',
  },
  {
    id: ACT.reading,
    section: 'Voorlezen',
    title: 'Read your first Dutch paragraph aloud',
    goals: [
      'Apply every rule from this lesson to a short connected paragraph: g/ch fricatives, long-short vowels, final devoicing, schwa reduction, diphthongs.',
      'Hear the natural rhythm of Dutch — stress on the first syllable of native words, schwa on weak syllables, fast sentence pace.',
    ],
    task: 'Read the paragraph aloud once for accuracy, then a second time for natural rhythm. Mark each sound you struggled with so you know what to drill next.',
  },
];

const lesson = {
  title: 'Foundation: Dutch Sounds & Spelling',
  category: 'foundation',
  difficulty: 'beginner',
  targetLang: 'nl',
  nativeLang: 'en',
  track: 'foundation',
  lessonType: 'foundation',
  activities,
  expressionPractice: [
    { id: 'read-pinyin', label: 'Reading aloud', goal: 'Read any Dutch word aloud with correct vowel length, g/ch fricative, and schwa reduction.' },
    { id: 'spell-name', label: 'Spelling your name', goal: 'Spell your own name and address aloud in Dutch letter names with the correct ij digraph.' },
    { id: 'distinguish-regions', label: 'Recognizing regions', goal: 'Distinguish hard-g Holland speech from soft-g Flemish speech in 5 seconds of audio.' },
  ],
  relatedPools: ['topic-foundation'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Why Dutch sounds the way it does
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Lesdoel',
      'les-DOOL',
      'By the end of this lesson, you can read any Dutch word aloud with recognizable g/ch fricatives, correct vowel length, natural schwa, and a sense of whether the speech is Northern (Holland) or Southern (Flanders). You will not yet have grammar — that starts in Unit 1.',
      'word',
      'Functies: alfabet (alphabet) · klinkers (vowels) · medeklinkers (consonants) · g/ch · eindklankverscherping (final devoicing) · doffe e (schwa)',
      'These six sub-skills are the spine of every Dutch sentence you will ever pronounce — drilling them once here saves you years of accent work.',
      null,
      [ACT.intro],
    ),
    createContentItem(
      'Echte situatie',
      'EKH-tə si-tu-AA-tsi',
      'You arrive at Schiphol Airport, the immigration officer says "Welkom in Nederland" /ˈʋɛlkɔm ɪn ˈneːdərlɑnt/, you greet a UvA professor with "Goedendag" /ˈɣudədɑx/, and on the train to Amsterdam Centraal someone asks "Mag ik hier zitten?" /mɑx ɪk hir ˈzɪtə(n)/. In 30 seconds you have already heard hard-g, soft-g, schwa, ui, ij, and final devoicing.',
      'word',
      'Schiphol /ˈsxɪphɔl/ — the SCH cluster at word start is /sx/, NOT /ʃ/ as in English "ship".',
      'A learner who pronounces Schiphol as "Shipple" sounds tourist-instantly; the correct /sxɪp-hɔl/ marks at least a few weeks of practice.',
      [
        { target: 'Welkom /ˈʋɛlkɔm/', note: 'note the Dutch /ʋ/ approximant — between English w and v' },
        { target: 'Goedendag /ˈɣudədɑx/', note: 'two velar fricatives — opening /ɣ/ (voiced in some speech) and closing /x/' },
        { target: 'Mag ik /mɑx ɪk/', note: 'final-devoiced g; the /ɡ/ stop never appears in native Dutch' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'Twee taalpolen',
      'tʋee TAAL-poh-lə(n)',
      'Standard Dutch has two prestige centers. Randstad (Amsterdam–Rotterdam–Den Haag–Utrecht) sets the journalistic and broadcast norm: hard-g, fast pace, dropped final -n in lopen, schwa-heavy. Flanders (Antwerpen–Gent–Brussel–Leuven) sets the Belgian Dutch norm: soft-g, slower, more careful, retains final -n more often, slightly older vocabulary in many areas.',
      'word',
      'Randstad /ˈrɑntstɑt/ — final t comes from devoicing of d; the cluster -dt at word end is always pronounced /t/.',
      'Both are fully standard; choosing one or the other is a regional/identity question, not a "correct vs incorrect" question.',
      [
        { target: 'Hard-g (NL Holland)', note: 'far-back /χ/, scratchy; the textbook "Dutch" accent in international media' },
        { target: 'Soft-g (Flanders, NL south)', note: 'palatal /ç/, gentle; similar to German "ich" or Spanish "j" in some regions' },
        { target: 'Both are AN', note: 'Algemeen Nederlands = the standard language; both norms are AN' },
      ],
      [ACT.intro],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Alphabet
    // ────────────────────────────────────────────────────────────────────
    createContentItem('het alfabet', 'hət ɑl-fa-BET', 'The Dutch alphabet has the same 26 Latin letters as English. The letter names are spelled in Dutch phonetics: a (aa /aː/), b (bee /beː/), c (see /seː/), d (dee /deː/), e (ee /eː/), f (ef /ɛf/), g (gee /ɣeː/), h (haa /ɦaː/), i (ie /i/), j (jee /jeː/), k (kaa /kaː/), l (el /ɛl/), m (em /ɛm/), n (en /ɛn/), o (oo /oː/), p (pee /peː/), q (kuu /kyː/), r (er /ɛr/), s (es /ɛs/), t (tee /teː/), u (uu /yː/), v (vee /veː/), w (wee /ʋeː/), x (iks /ɪks/), y (Griekse y or i-grec), z (zet /zɛt/).', 'word', 'A-bee-see-dee-ee-ef-gee-haa-ie-jee-kaa-el-em-en-oo-pee-kuu-er-es-tee-uu-vee-wee-iks-ee-zet', 'Children learn this in primary school exactly like English children learn the ABC song; spelling something aloud uses these names.', null, [ACT.alphabet]),
    createContentItem('IJ / ij', 'EI', 'The digraph "ij" is treated as a single letter in Dutch — sometimes called the 27th letter of the alphabet. When a word begins with ij and is capitalized, BOTH letters capitalize: IJsselmeer, IJmuiden, IJsbreker. In handwriting and crossword puzzles, IJ fills a single cell. Pronounced /ɛi/ — identical to "ei".', 'word', 'IJsselmeer /ˈɛisəlmeːr/ — the large lake formed by damming the Zuiderzee in 1932', 'Spelling a Dutch name aloud, "ij" is one letter (called "lange ij" or "ij van ijs"), distinct from i + j.', [{ target: 'IJsselmeer', note: 'both letters capitalize because IJ is one letter' }, { target: 'ijs /ɛis/', note: 'ice; the common ij in lowercase' }, { target: 'i-grec / Griekse y', note: 'the letter y, distinguished from "lange ij" in spelling' }], [ACT.alphabet]),
    createContentItem('spelling oefenen', 'SPEL-ling OO-fə-nən', 'Spelling your name aloud in Dutch uses the letter names: M-A-R-T-I-N would be "em-aa-er-tee-ie-en", said quickly with the rhythm of any European spelling. For unclear letters (especially over the phone), Dutch speakers use the official spelling alphabet: Anton, Bernard, Cornelis, Dirk, Eduard, Ferdinand, Gerard, Hendrik, Izaak, Johan, Karel, Lodewijk, Marie, Nico, Otto, Pieter, Quirinus/Quotient, Rudolf, Simon, Theodoor, Utrecht, Victor, Willem, Xerxes, Ypsilon, Zacharias.', 'word', 'Mijn naam is Jan: "jee-aa-en" — three letters, said quickly.', 'On the phone in NL/BE, "Jan met de J van Johan" disambiguates spelling when the line is bad — like English "J as in Juliet".', null, [ACT.alphabet]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Short vowels
    // ────────────────────────────────────────────────────────────────────
    createContentItem('korte a', 'kor-tə AA', 'The short "a" /ɑ/ is a back open vowel — similar to American English "ah" in "father" but shorter, or the British "a" in "cat" but darker. Always written with ONE "a" in a CLOSED syllable.', 'word', 'man /mɑn/ (man), kat /kɑt/ (cat), bak /bɑk/ (tray), pak /pɑk/ (suit, package)', 'The short-a appears in some of the highest-frequency Dutch words — man, kan, dat, wat, gat — so drilling it once pays dividends everywhere.', null, [ACT.vowelsShort]),
    createContentItem('korte e', 'kor-tə E', 'The short "e" /ɛ/ is a front open-mid vowel — like English "e" in "bed". Identical to German short e and French è. In stressed syllables only; in unstressed syllables, "e" usually becomes schwa.', 'word', 'bed /bɛt/ (bed; note final devoicing), pen /pɛn/ (pen), tien /tin/ — wait, tien is long; correct short: hek /hɛk/ (fence)', 'Compare to English: bed, pen, men — the same vowel sound; the spelling rule is the difference.', null, [ACT.vowelsShort]),
    createContentItem('korte i', 'kor-tə IE', 'The short "i" /ɪ/ is a front near-close near-front vowel — like English "i" in "bit", "pin", "kit". Distinct from the long /i/ written "ie". So "wit" /ʋɪt/ (white) ≠ "wiet" /ʋit/ (weed/grass).', 'word', 'kip /kɪp/ (chicken), wit /ʋɪt/ (white), dit /dɪt/ (this), zit /zɪt/ ((he/she/it) sits)', 'A very common Dutch beginner trap: confusing short i with long ie. Compare wit vs wiet, lit vs liet.', null, [ACT.vowelsShort]),
    createContentItem('korte o', 'kor-tə O', 'The short "o" /ɔ/ is a back open-mid rounded vowel — like British English "o" in "lot" or American English "aw" in "off". Distinct from the long /oː/ written "oo" or open-syllable o.', 'word', 'bos /bɔs/ (forest), pot /pɔt/ (pot), kom /kɔm/ (bowl; also "come" imperative), top /tɔp/ (top)', 'Compare to long oo: bos (forest, short) vs boos (angry, long); pot vs poot ("paw").', null, [ACT.vowelsShort]),
    createContentItem('korte u', 'kor-tə UU-kort', 'The short "u" /ʏ/ is a front close-rounded vowel — like a short version of German ü or French u (NOT like English "u" in "but"). Round your lips for "oo" and try to say "ih".', 'word', 'bus /bʏs/ (bus), put /pʏt/ (well, pit), kus /kʏs/ (kiss), nul /nʏl/ (zero)', 'English speakers often substitute /ʌ/ or /ə/ for short u — sounds like "bus" pronounced "bahs". Round the lips to fix this.', null, [ACT.vowelsShort]),
    createContentItem('vier korte klinkers in zin', 'vier kor-tə KLIN-kərs in zin', 'Five short vowels appear in one sentence: "Die man in de bus eet een kip in het bos." All five short qualities — a, e, i, o, u — in one breath. The native rhythm is fast and the short vowels stay tight.', 'sentence', '"Die man in de bus eet een kip in het bos."', 'Translation: "That man on the bus is eating a chicken in the forest." (a bit absurd, but every word is real).', null, [ACT.vowelsShort]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Long vowels
    // ────────────────────────────────────────────────────────────────────
    createContentItem('aa /aː/', 'aa', 'Long a — a front-to-central open long vowel. Like American English "a" in "father" but held longer. Spelled "aa" in closed syllables (maan), single "a" in open syllables (manen).', 'word', 'maan /maːn/ (moon), naam /naːm/ (name), straat /straːt/ (street); open syllable: manen /ˈmaːnə(n)/ (moons), namen (names)', 'The single most common spelling mistake learners make: writing "mannen" (men) when they mean "manen" (moons). The double consonant signals SHORT vowel, not long.', null, [ACT.vowelsLong]),
    createContentItem('ee /eː/', 'ee', 'Long e — a front close-mid long vowel. Often diphthongized in Northern Dutch to [eɪ] (like English "ay" in "say"); held pure in Flemish [eː]. Spelled "ee" in closed syllables (meer), single "e" in open syllables (meren).', 'word', 'meer /meːr/ (more; also lake), heet /heːt/ (hot; also "is called"), been /beːn/ (leg, bone); open syllable: meren (lakes), heten (to be called)', 'Compare to short e: bed (short /ɛ/) vs beed not a word; better pair: men vs meen (mean, opine).', null, [ACT.vowelsLong]),
    createContentItem('oo /oː/', 'oo', 'Long o — a back close-mid rounded long vowel. In Northern Dutch often diphthongized to [oʊ] like English "oh"; in Flemish kept pure [oː]. Spelled "oo" in closed syllables (boot), single "o" in open syllables (boten).', 'word', 'boot /boːt/ (boat), groot /xroːt/ (big), hoog /hoːx/ (high); open: boten (boats), hoge (high, attributive)', 'Compare to short o: bos (short /ɔ/) vs boos (long /oː/, "angry"); pot vs poot (paw).', null, [ACT.vowelsLong]),
    createContentItem('uu /yː/', 'uu', 'Long u — a front close-rounded long vowel, identical to German long ü and French u. Round your lips for "oo" and try to say a long "ee". English has no equivalent — the closest is forcing French "tu".', 'word', 'muur /myːr/ (wall), buur /byːr/ (neighbor), duur /dyːr/ (expensive); open: muren (walls), buren (neighbors)', 'A core "Dutch sounds difficult" vowel. Distinguish from short u (bus /ʏ/) and from "oe" /u/ (boek).', null, [ACT.vowelsLong]),
    createContentItem('eu /øː/', 'eu', 'The eu digraph — a front close-mid rounded long vowel, like German ö long or French eu in "feu". Round your lips for "oh" and say "eh".', 'word', 'deur /døːr/ (door), neus /nøːs/ (nose), keuken /ˈkøːkə(n)/ (kitchen), kleur /kløːr/ (color)', 'Distinguish "eu" from "uu": deur (door) vs duur (expensive) — both rounded, but eu is more open.', null, [ACT.vowelsLong]),
    createContentItem('oe /u/', 'oe', 'The oe digraph — a back close rounded vowel, like English "oo" in "boot" or "u" in "rule". Confusingly spelled with "o + e", but it is NOT a diphthong — it is one short-ish vowel.', 'word', 'boek /buk/ (book), zoek /zuk/ (search; also "I seek"), moeder /ˈmudər/ (mother), goed /ɣut/ (good; final-devoiced)', 'Distinguish "oe" /u/ from short u /ʏ/: boek (book) vs buk (bend down imperative); moe (tired) vs mij (me, ij sound).', null, [ACT.vowelsLong]),
    createContentItem('ie /i/', 'ie', 'The ie digraph — a front close long vowel, like English "ee" in "see" but slightly shorter. Phonemically long but often phonetically short. Distinguish from short i (kip /kɪp/) which is lax.', 'word', 'riet /rit/ (reed), kies /kis/ (molar tooth; also "I choose"), vier /vir/ (four), wie /ʋi/ (who)', 'Compare: kip (chicken, short i) vs kies (tooth, long ie); wit (white) vs wiet (slang for weed).', null, [ACT.vowelsLong]),
    createContentItem('open-vs-closed syllable rule', 'OH-pə(n) versus xə-SLOH-tən', 'THE Dutch spelling rule: in a CLOSED syllable (ends in consonant), long vowels DOUBLE (maan, boot, muur). In an OPEN syllable (ends in vowel), long vowels stay SINGLE (manen, boten, muren). Schoolchildren learn this with the rhyme "maan-manen, man-mannen".', 'sentence', 'maan /maːn/ (moon, closed) → manen /ˈmaːnən/ (moons, open) — same vowel, different spelling.\nman /mɑn/ (man, closed) → mannen /ˈmɑnən/ (men, open with doubled n to keep a short)', 'Failing this rule is the #1 marker of a non-native Dutch speller; mastering it unlocks 80% of Dutch plurals and conjugations.', [{ target: 'closed + long → double vowel', note: 'maan, boot, deur (-ur is open in pronunciation but root closes)' }, { target: 'open + long → single vowel', note: 'manen, boten, deuren — vowel stays long without doubling' }, { target: 'open + short → double consonant', note: 'mannen, potten, kippen — consonant doubles to keep vowel short' }], [ACT.vowelsLong]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Diphthongs
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ui /œy/', 'UY', 'The ui diphthong — starts at open-mid front-rounded /œ/ and glides to high front-rounded /y/. English has no equivalent. Many native English speakers approximate as "ow" or "oy", but neither is right.', 'word', 'huis /ɦœys/ (house), uit /œyt/ (out), ui /œy/ (onion), buiten /ˈbœytə(n)/ (outside), kruis /krœys/ (cross)', 'A "Dutchness test": foreigners who can say "huis uit" /ɦœys œyt/ ("out of the house") well have moved beyond beginner level. Pure ui is rare in English speakers and stands out.', null, [ACT.diphthongs]),
    createContentItem('ei = ij /ɛi/', 'EI', 'The ei and ij digraphs are pronounced IDENTICALLY as /ɛi/ — start at /ɛ/ (English "e" in bed) and glide to /i/ (English "ee"). They differ only in spelling, by historical convention. Native speakers memorize "ei words" vs "ij words" the same way English speakers memorize "ie vs ei" rules.', 'word', 'ei /ɛi/ (egg), eind /ɛint/ (end), klein /klɛin/ (small) — with EI; rijst /rɛist/ (rice), tijd /tɛit/ (time), mijn /mɛin/ (mine, my) — with IJ', 'Schoolchildren say "korte ei" (short ei, the digraph) vs "lange ij" (long ij, the digraph that historically came from a long ī) — names that distinguish them in dictation.', [{ target: 'ei (korte ei)', note: 'historical origin from older /ɛɪ/' }, { target: 'ij (lange ij)', note: 'historical origin from a long ī' }, { target: 'same sound today', note: 'no native speaker distinguishes them phonetically' }], [ACT.diphthongs]),
    createContentItem('au = ou /ɑu/', 'OU', 'The au and ou digraphs are pronounced IDENTICALLY as /ɑu/ — start at /ɑ/ (Dutch short a) and glide to /u/ (English "oo"). Similar to English "ow" in "how" but starts further back. Like ei/ij, the two spellings reflect historical origins, not modern sound differences.', 'word', 'auto /ˈɑuto/ (car), nauw /nɑu/ (narrow), gauw /xɑu/ (quickly) — with AU; koud /kɑut/ (cold), oud /ɑut/ (old), bouwen /ˈbɑuʋə(n)/ (to build) — with OU', 'A typical NL learner mistake: writing "oud" as "aud" or vice versa. The sound is one; the spelling is two.', null, [ACT.diphthongs]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Consonants
    // ────────────────────────────────────────────────────────────────────
    createContentItem('Dutch j /j/', 'j', 'Dutch "j" is /j/, exactly like English "y" in "yes" or German "j" in "ja". NEVER like English "j" /dʒ/. So "ja" /jaː/ (yes) sounds like "yah", and "Jan" /jɑn/ sounds like "Yahn".', 'word', 'ja /jaː/ (yes), jij /jɛi/ (you, stressed), jaar /jaːr/ (year), jongen /ˈjɔŋə(n)/ (boy)', 'An English-speaker giveaway: pronouncing "Jan" as English "Jan" /dʒæn/ instead of /jɑn/. Dutch "j" is always a glide.', null, [ACT.consonants]),
    createContentItem('Dutch v /v/ ~ /f/', 'v', 'Dutch "v" varies regionally. In Northern (NL) speech it is often devoiced toward /f/ — "vader" /ˈfaːdər/ sounds nearly like "fater". In Flemish (BE) it stays a clean voiced /v/. Both are accepted as standard.', 'word', 'vader /ˈvaːdər/ or /ˈfaːdər/ (father), van /vɑn/ or /fɑn/ (of, from), vier /vir/ (four), avond /ˈaːvɔnt/ (evening)', 'A linguistic detail rather than a trap — but knowing it explains why Belgian Dutch sounds noticeably more "voiced" to a Hollander.', null, [ACT.consonants]),
    createContentItem('Dutch w /ʋ/', 'w', 'Dutch "w" is /ʋ/, a labiodental approximant — between English "v" and "w". Touch your upper teeth lightly to your lower lip but do not buzz like a "v". The Flemish "w" leans closer to English "w" /w/, the Northern "w" closer to /ʋ/.', 'word', 'wat /ʋɑt/ (what), wij /ʋɛi/ (we, stressed), water /ˈʋaːtər/ (water), willen /ˈʋɪlə(n)/ (to want)', 'Saying "what" with full English /w/ sounds tourist; saying it with full /v/ sounds German. The labiodental /ʋ/ is the Dutch middle ground.', null, [ACT.consonants]),
    createContentItem('Dutch sch /sx/', 'sch', 'At the START of a syllable, the cluster "sch" is pronounced /sx/ — an /s/ followed by the famous /x/ fricative. At the END of a syllable (rare), "sch" can be just /s/ (mens, but no native modern word ends in -sch). The diminutive -isch is pronounced /is/ — historically "logisch" /loːxis/.', 'word', 'school /sxoːl/ (school), schip /sxɪp/ (ship), schoen /sxun/ (shoe), Schiphol /ˈsxɪphɔl/ (the airport), Scheveningen /ˈsxeːvənɪŋə(n)/ (a Dutch town)', 'Scheveningen was the WW2 Dutch shibboleth — German speakers could not produce /sx/ and said /ʃ/, exposing them as non-natives at checkpoints.', [{ target: 'sch- /sx/ at word start', note: 'always /s/ + /x/, never /ʃ/ as in English "ship"' }, { target: '-isch /is/ in -isch suffix', note: 'logisch, magisch — the ch is silent in this ending' }], [ACT.consonants]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — The Dutch g
    // ────────────────────────────────────────────────────────────────────
    createContentItem('g /ɣ/ ~ /x/ at start of syllable', 'g', 'At the START of a syllable, "g" is the voiceless (or in some dialects voiced) velar/uvular fricative /x/ ~ /ɣ/. In NL Holland speech, often voiceless /χ/ or /x/, scratchy and far back. In Flanders, soft palatal /ç/.', 'word', 'gaan /xaːn/ (to go), goed /xut/ (good; final-devoiced), groot /xroːt/ (big), geld /xɛlt/ (money), gezellig /xəˈzɛləx/ (cozy/sociable)', 'The single hardest Dutch sound for English speakers — but the most recognizable. Three weeks of drilling 5 minutes a day usually fixes it.', null, [ACT.gAndCh]),
    createContentItem('ch /x/ at end of syllable', 'ch', 'At the END of a syllable, the same /x/ phoneme is spelled "ch". So "lachen" (to laugh) has /x/ in the middle; "nacht" (night) has /x/ before the t.', 'word', 'lachen /ˈlɑxə(n)/ (to laugh), nacht /nɑxt/ (night), acht /ɑxt/ (eight), zucht /zʏxt/ (sigh)', 'A weird-looking spelling distribution to learners: same sound, two letters depending on position. Once you see it, every Dutch word makes sense.', null, [ACT.gAndCh]),
    createContentItem('hard-g vs soft-g', 'HART-khee versus ZAKHT-ə khee', 'HARDE G: far-back uvular /χ/, scratchy, the textbook "Dutch" sound. Heard in Amsterdam, Rotterdam, Den Haag, Utrecht, much of the Randstad. ZACHTE G: gentle palatal /ç/, much closer to German "ich" or English "h" with a slight friction. Heard in Brabant (south NL) and all of Flanders.', 'sentence', 'gezellig: Amsterdam /xəˈzɛləχ/ (hard) — Antwerpen /çəˈzɛləç/ (soft) — same word, two textures.', 'NL public broadcasting often defaults to harder g; Flemish public broadcasting (VRT) defaults to softer g. Both are AN (Standard Dutch).', [{ target: 'HARD G — Randstad NL', note: 'uvular /χ/; scratchy; "throat-clearing" effect to anglophone ears' }, { target: 'SOFT G — Flanders + south NL', note: 'palatal /ç/; gentle; closer to "h" with friction' }, { target: 'pick one and stick with it', note: 'learners should not mix; choose the model speaker you study from' }], [ACT.gAndCh]),
    createContentItem('the Scheveningen test', 'SKHEE-və-ning-ən', 'The town name Scheveningen /ˈsxeːvənɪŋə(n)/ contains two of the hardest Dutch sounds back-to-back: the cluster /sx/ at start, and the velar nasal /ŋ/ in -ningen. In WW2, Dutch resistance used this name to flush out German spies at checkpoints.', 'word', 'Scheveningen: /sx/ + /eː/ + /v/ + /ə/ + /n/ + /ɪ/ + /ŋ/ + /ə(n)/', 'A non-Dutch speaker invariably says something like "Sheveningen" /ʃeː.../, exposing the accent in three syllables.', null, [ACT.gAndCh]),
    createContentItem('no /g/ in native Dutch', 'gheen khee', 'Dutch has NO native /ɡ/ stop sound (the English hard g in "go"). The letter "g" in Dutch always represents the fricative /x/ or /ɣ/. Loanwords like "goal" /ɡoːl/ (soccer goal) or "garage" /ɡaːˈraːʒə/ (French loan) are the exceptions; even there, many speakers Dutchify to /xoːl/ or /ɣoːl/.', 'word', 'goal /ɡoːl/ (loanword; some speakers /xoːl/), garage /ɣaːˈraːʒə/ (also a fricative pronunciation), gym /ɡɪm/ or /ʒɪm/ (English loan)', 'Learners who insist on /ɡ/ for every Dutch "g" sound foreign. Force yourself to fricate.', null, [ACT.gAndCh]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Final devoicing
    // ────────────────────────────────────────────────────────────────────
    createContentItem('eindklankverscherping', 'EINT-klank-vər-skher-ping', 'The universal Dutch final-devoicing rule: at the end of a syllable, voiced obstruents (b, d, v, z, g) become voiceless ([p, t, f, s, x]). The spelling does NOT change — only the pronunciation. Compare singular hond /hɔnt/ (devoiced) to plural honden /ˈhɔndə(n)/ (voiced returns).', 'sentence', 'hond /hɔnt/ "dog" (final d → t) ↔ honden /ˈhɔndə(n)/ "dogs" (d stays voiced because not final)\nweb /ʋɛp/ "web" ↔ webben /ˈʋɛbə(n)/ "webs"\nlief /lif/ "sweet, dear" ↔ lieve /ˈlivə/ "sweet (attributive)"', 'A native speaker applies this automatically; foreign learners who carefully say [hɔnd] sound robotic.', [{ target: 'b → /p/', note: 'web /ʋɛp/, rib /rɪp/, bord /bɔrt/ uses d not b but principle' }, { target: 'd → /t/', note: 'hond /hɔnt/, brood /broːt/ (bread), land /lɑnt/' }, { target: 'v → /f/', note: 'lief /lif/, brief /brif/ (letter), actief /ɑkˈtif/' }, { target: 'z → /s/', note: 'huis /ɦœys/, kaas /kaːs/ (cheese), grijs /ɣrɛis/' }, { target: 'g → /x/', note: 'zag /zɑx/ (saw, past), dag /dɑx/ (day)' }], [ACT.finalDevoicing]),
    createContentItem('spelling vs pronunciation', 'SPEL-ling versus uit-SPRAAK', 'Dutch spelling is morpho-phonemic: it shows the underlying root, not the surface sound. "hond" is spelled with d because the d returns in honden, hondje, hondachtig. The "morphology wins over pronunciation" principle is why Dutch spelling can look surprising.', 'sentence', 'hond /hɔnt/ — spelled with d, pronounced /t/\nhondje /ˈɦɔntjə/ — even diminutive devoices because d is now final-in-syllable\nhonden /ˈɦɔndən/ — voicing returns in plural where d is followed by vowel', 'Compare to English "dogs" /dɒɡz/ — English voices voicelessly per its own rules; Dutch is opposite-ish.', null, [ACT.finalDevoicing]),
    createContentItem('-dt cluster', 'DEE-tee', 'The cluster "-dt" appears in present tense verbs: hij vindt /ɦɛi vɪnt/ (he finds). Both letters are pronounced as a single /t/ — silent d in surface but written because the stem is "vind-" and the 3rd-person ending is "-t".', 'word', 'hij vindt /ɦɛi vɪnt/ (he finds), zij rijdt /zɛi rɛit/ (she drives), het houdt /ɦət ɦɑut/ (it holds)', 'A perennial Dutch dictation trap for native schoolchildren: writing "vind" instead of "vindt" in 3rd person. Foreigners who learn the rule "stem + t for 3rd person" early get it right faster than natives.', null, [ACT.finalDevoicing]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Schwa
    // ────────────────────────────────────────────────────────────────────
    createContentItem('de doffe e', 'də DOH-fə ee', 'The schwa /ə/ — the neutral "uh" vowel found in unstressed syllables. Spelled "e" in most contexts: lopen /ˈloːpən/, vader /ˈvaːdər/, water /ˈʋaːtər/. Always SHORT, always UNSTRESSED, never the carrier of meaning.', 'word', 'lopen /ˈloːpə(n)/ (to walk), vader /ˈvaːdər/ (father), water /ˈʋaːtər/ (water), vogel /ˈvoːɣəl/ (bird)', 'Listen for the rhythm: native Dutch is STRONG-weak-STRONG-weak; the weak syllables are almost always schwa.', null, [ACT.schwa]),
    createContentItem('-en endings', 'minus E-N', 'The -en ending appears in plurals (boeken), infinitives (lopen), and many participles (geslapen). In Northern Dutch CASUAL speech, the final n is often dropped: "lopen" → /ˈloːpə/. In Flemish and formal Northern Dutch, the n is retained: /ˈloːpən/.', 'word', 'lopen /ˈloːpə(n)/ "to walk" — casual NL drops n, formal/BE keeps n\nboeken /ˈbukə(n)/ "books"\nmensen /ˈmɛnsə(n)/ "people"', 'A regional rhythm marker: NL news anchors often drop n in casual broadcasts but keep it in formal news; VRT (Flemish public radio) keeps n always.', null, [ACT.schwa]),
    createContentItem('schwa NEVER stressed', 'sxʋaa nooit BƏ-klɛm-toont', 'A schwa NEVER carries stress. If a syllable is stressed, its "e" is full /e/ or /ɛ/, never /ə/. Stress in Dutch is almost always on the FIRST root syllable of a native word, with the schwa pattern falling on suffixes and endings.', 'sentence', 'STRONG-weak-weak: lopen /ˈloːpən/, mannen /ˈmɑnən/, langzaam /ˈlɑŋzaːm/ (slowly)\nweak-STRONG-weak: verloren /vərˈloːrə(n)/ (lost) — schwa in unstressed prefix ver-', 'A reliable cue: if you hear a clear vowel, it is likely stressed; if you hear "uh", it is schwa and the stress is elsewhere.', null, [ACT.schwa]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Spelling rules
    // ────────────────────────────────────────────────────────────────────
    createContentItem('maan / manen / man / mannen', 'maan ma-nən man MAH-nən', 'The four-way distinction that every Dutch schoolchild memorizes. maan (one moon, closed syllable, long aa) → manen (moons, open syllable, single a stays long). man (one man, closed, short a) → mannen (men, open, doubled n keeps a short). The same logic powers every Dutch noun plural and verb conjugation.', 'sentence', 'maan /maːn/ → manen /ˈmaːnə(n)/ (closed-long → open-long; double a becomes single)\nman /mɑn/ → mannen /ˈmɑnə(n)/ (closed-short → open-short; consonant doubles to keep short)', 'Memorize this set; every other Dutch spelling rule for vowels is a variation of these two patterns.', [{ target: 'long vowel + open syllable → single letter', note: 'manen, lopen, boten, deuren' }, { target: 'long vowel + closed syllable → double letter', note: 'maan, loop, boot, deur (note ur is closed-ish)' }, { target: 'short vowel + open syllable → double consonant', note: 'mannen, pakken, kippen, bossen' }, { target: 'short vowel + closed syllable → single consonant', note: 'man, pak, kip, bos' }], [ACT.spelling]),
    createContentItem('verb conjugation echoes the rule', 'spellingregel in werkwoorden', 'The open/closed rule shows up in verb conjugation. The verb "lopen" /ˈloːpə(n)/ "to walk" has stem "loop-" /loːp/. So "ik loop" /ɪk loːp/ (I walk) has DOUBLED oo because the syllable is closed; "wij lopen" /ʋɛi ˈloːpə(n)/ has SINGLE o because the syllable is open.', 'sentence', 'ik loop / hij loopt / wij lopen / jullie lopen / zij lopen — closed-double-closed-double-open-single-open-single-open-single', 'Failing this pattern is the most common spelling mistake of Dutch learners; conjugation drills usually fix it within the first month.', null, [ACT.spelling]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Holland vs Flanders
    // ────────────────────────────────────────────────────────────────────
    createContentItem('Nederlands van Nederland', 'NEE-dər-lants vɑn NEE-dər-lɑnt', 'Netherlands Dutch — spoken by ~17 million in the Netherlands. Phonetic markers: harde g (often /χ/), more diphthongized long vowels (oo → [oʊ], ee → [eɪ]), faster pace, frequent dropped final -n in -en, more loanword acceptance (especially English).', 'sentence', '"Wat doe je dit weekend?" — Amsterdam: /ʋɑt du jə dɪt ˈʋikənt/, fast and clipped.', 'Public broadcaster: NOS, NPO. Dictionary: Van Dale. University reference: Universiteit van Amsterdam (UvA), Universiteit Leiden, Universiteit Utrecht.', null, [ACT.hollandFlanders]),
    createContentItem('Vlaams (Nederlands van België)', 'VLAAMS', 'Flemish — Standard Dutch as spoken by ~6.5 million in Flanders (northern Belgium). Phonetic markers: zachte g (/ç/), more conservative pure long vowels, slower deliberate pace, fuller -en endings, distinctive vocabulary (frieten not patat, gij in informal speech, schoon for "beautiful" alongside mooi).', 'sentence', '"Wat doet ge dit weekend?" — Antwerpen: /ʋɑt dut xə dɪt ˈʋikənt/, slower, softer g.', 'Public broadcaster: VRT (Radio 1, één). University reference: KU Leuven, Universiteit Gent, Universiteit Antwerpen.', null, [ACT.hollandFlanders]),
    createContentItem('vocab pairs NL/BE', 'voh-CAB PAA-rə(n)', 'A handful of canonical NL/BE vocabulary differences — both fully Dutch, both fully understood across the border. NL: patat (fries), je (you), leuk (nice), kletsen (chat), magnetron (microwave), pinpas (debit card). BE: frieten (fries), jij/gij (you, gij in informal speech only), tof / plezant (nice), babbelen (chat), microgolfoven (microwave), bankkaart (debit card).', 'sentence', 'NL: "Wil je nog patat?" — BE: "Wilt ge nog frieten?"\nNL: "Wat leuk!" — BE: "Wat tof!" or "Plezant!"', 'These differences are like American vs British English — every speaker understands both, but uses their own variant in daily life.', null, [ACT.hollandFlanders]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Reading practice
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'voorleesoefening',
      'VOR-lees-oo-fə-ning',
      'A first connected paragraph that exercises every rule from this lesson. Read it aloud slowly first, then at natural speed. Mark the words you struggled with — they are your homework.',
      'sentence',
      'Goedemorgen! Ik woon in Amsterdam, vlak bij het IJsselmeer. Mijn huis is klein maar gezellig. Elke dag fiets ik naar mijn werk in de stad, langs het water en de oude grachten. \'s Avonds eet ik vaak brood met kaas, drink een glas melk, en lees een boek. Het leven hier is rustig en mooi.',
      'Translation: "Good morning! I live in Amsterdam, right next to the IJsselmeer. My house is small but cozy. Every day I cycle to my work in the city, along the water and the old canals. In the evenings I often eat bread with cheese, drink a glass of milk, and read a book. Life here is calm and beautiful."',
      [
        { target: 'Goedemorgen /xudəˈmɔrxə(n)/', note: 'two g/x fricatives — opener and -gen ending' },
        { target: 'IJsselmeer /ˈɛisəlmeːr/', note: 'capitalized IJ (single digraph letter); long ee' },
        { target: 'gezellig /xəˈzɛləx/', note: 'final -ig is pronounced /əx/, the schwa-then-x pattern' },
        { target: 'fiets /fits/', note: 'long ie; final s; ts cluster' },
        { target: 'grachten /ˈxrɑxtə(n)/', note: 'two velar fricatives in one word; the famous Amsterdam canals' },
        { target: '\'s Avonds /sˈaːvɔnts/', note: 'old genitive remnant meaning "in the evening"; final -ds → /ts/' },
        { target: 'kaas /kaːs/', note: 'long aa in closed syllable; cheese — a Dutch icon' },
        { target: 'rustig /ˈrʏstəx/', note: 'short u + -ig ending; "calm, quiet"' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'klankcheck',
      'KLANK-tʃɛk',
      'A self-check checklist after reading. Did you produce the right g/x fricative on every g and ch? Did long vs short vowels stay distinct? Did final consonants devoice (kaas /kaːs/ not /kaːz/)? Did unstressed -en reduce to /ə(n)/? If any "no", that is next week\'s drill target.',
      'sentence',
      'Checklist: ✓ g/ch fricatives · ✓ long vs short vowels · ✓ final devoicing · ✓ schwa in -en/-er/-e · ✓ diphthongs ui/ei/ou',
      'Every Dutch native speaker checks these automatically; learners build the reflex over weeks of conscious drilling.',
      null,
      [ACT.reading],
    ),
  ],
};

module.exports = lesson;
