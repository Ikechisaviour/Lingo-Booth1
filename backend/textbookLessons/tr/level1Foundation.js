// Level 1 — Foundation: Turkish Alphabet, Vowel Harmony & Pronunciation
// First lesson on the Turkish / Foundation track. Pre-grammar, pre-vocabulary.
// Covers the Atatürk-reformed Latin alphabet, 8-vowel system, vowel harmony
// (front/back + rounded/unrounded), agglutinative suffix logic, soft g (ğ),
// dotted vs dotless i (i/ı), and consonant assimilation that learners must
// internalize before any morphology.
//
// All content is authored with Turkish (Latin script target) + a phonetic
// approximation + English glosses (canonical source). The AI conversation
// tutor reads this curriculum and delivers it to each learner in their
// preferred native language at runtime — never assume a specific L1 in
// this file.
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
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  intro: 'tr-foundation-intro',
  alphabet: 'tr-foundation-alphabet',
  vowels: 'tr-foundation-vowels',
  consonants: 'tr-foundation-consonants',
  softG: 'tr-foundation-soft-g',
  dottedI: 'tr-foundation-dotted-i',
  vowelHarmonyBack: 'tr-foundation-vowel-harmony-back',
  vowelHarmonyRound: 'tr-foundation-vowel-harmony-round',
  consonantAssim: 'tr-foundation-consonant-assim',
  agglutination: 'tr-foundation-agglutination',
  stress: 'tr-foundation-stress',
  reading: 'tr-foundation-reading-practice',
};

const activities = [
  {
    id: ACT.intro,
    section: 'Why the Alphabet, Vowels, and Harmony',
    title: 'Türk alfabesi — How Turkish sounds are organized',
    goals: [
      'Understand that Turkish is an agglutinative, vowel-harmonic language — every suffix shifts shape depending on the last vowel of the root.',
      'See why the Atatürk-reformed 29-letter Latin alphabet (1928) gives a near one-to-one sound-to-letter mapping, far cleaner than the Ottoman Arabic script it replaced.',
      'Know that every Turkish word obeys two harmony axes (front/back and rounded/unrounded) plus a consonant voicing rule, and that mastering these three patterns unlocks all later morphology.',
    ],
    task: 'Read the structural facts. By the end of this lesson you should be able to look at a Turkish word and predict its plural, locative, and accusative endings just from its vowels.',
  },
  {
    id: ACT.alphabet,
    section: 'The 29-letter Alphabet',
    title: 'Türk alfabesi — A B C Ç D E F G Ğ H I İ J K L M N O Ö P R S Ş T U Ü V Y Z',
    goals: [
      'Recognize all 29 letters of the Turkish alphabet, including the six letters absent from English (ç ğ ı i̇ ö ş ü) and the three English letters missing (q w x).',
      'Distinguish dotted İ/i from dotless I/ı — they are TWO DIFFERENT letters with two different sounds, not capitalization variants.',
      'Map each letter to a single consistent IPA value: Turkish is famously "spelled as it sounds" — one letter, one sound, with the soft ğ as the only quirky exception.',
    ],
    task: 'Recite the alphabet aloud, then read each letter paired with the vowel "a" (ba, ca, ça, da, fa, ga, ğa, ha…) until each sound feels distinct.',
  },
  {
    id: ACT.vowels,
    section: 'The 8 Vowels',
    title: 'Sekiz ünlü — a e ı i o ö u ü organized by tongue position',
    goals: [
      'Pronounce all 8 Turkish vowels with the correct tongue position: back vowels a o ı u vs front vowels e ö i ü.',
      'Pronounce the rounded set o ö u ü with lip rounding vs unrounded a e ı i with relaxed lips — the second harmony axis.',
      'Place each vowel on the 2x2 grid (back/front × unrounded/rounded): a(back-unrounded) e(front-unrounded) ı(back-unrounded-high) i(front-unrounded-high) o(back-rounded) ö(front-rounded) u(back-rounded-high) ü(front-rounded-high).',
    ],
    task: 'Read each vowel three times with the correct mouth shape, then read a sample word containing it (ana, ev, ışık, iki, on, öğle, un, üzüm).',
  },
  {
    id: ACT.consonants,
    section: 'The 21 Consonants',
    title: 'Ünsüzler — Consonants with traps for English ears',
    goals: [
      'Distinguish c (English "j" as in "jam") from ç (English "ch" as in "chair") from j (French "j" as in "bonjour", a soft zh-sound) — three letters, three completely different sounds.',
      'Pronounce ş (English "sh") and h (always pronounced, never silent) accurately.',
      'Internalize that the Turkish r is always tapped (single-flap, like Spanish "pero"), never the English approximant — and is pronounced even at the end of words (var = "vahr", not "vah").',
    ],
    task: 'Drill the four c/ç/j/ş contrasts in minimal pairs: cam (glass) vs çam (pine) vs şam (Damascus) — then read each consonant + "a" pair until natural.',
  },
  {
    id: ACT.softG,
    section: 'The Soft G — ğ',
    title: 'Yumuşak ge — A letter that lengthens, never sounds',
    goals: [
      'Understand that ğ (yumuşak ge, "soft g") is NEVER pronounced as a hard consonant. It either lengthens the preceding vowel (dağ = "daa", mountain) or acts as a glide (eğer ≈ "eyer", if).',
      'Recognize that ğ never starts a Turkish word — it can only appear between or after a vowel.',
      'Apply the ğ-lengthening rule when reading: every ağ, oğ, uğ extends the previous vowel by about half a beat (sağ "right" sounds like "saa").',
    ],
    task: 'Read 10 ğ-words aloud (dağ, ağaç, soğuk, doğru, öğle, düğün, yağmur, oğul, eğer, yığın) — lengthen, do not click.',
  },
  {
    id: ACT.dottedI,
    section: 'Dotted İ vs Dotless I',
    title: 'i vs ı — Two letters, two vowels, one capitalization rule',
    goals: [
      'Distinguish i (front-unrounded-high, like English "ee" in "see") from ı (back-unrounded-high, like the second vowel in English "rhythm" or Russian ы).',
      'Apply the unusual capitalization: lowercase i has a dot, uppercase İ KEEPS the dot — and lowercase ı is dotless, uppercase I is also dotless.',
      'Know that swapping i for ı changes meaning completely: bir (a/one) vs bır- (no such word), kız (girl) vs kiz (no such word) — these are NEVER interchangeable.',
    ],
    task: 'Read 8 i/ı minimal pairs out loud: kız/kiz, bir/bır, sıkı/siki, ışık/işik — focus on the back-vowel ı being further back in the mouth.',
  },
  {
    id: ACT.vowelHarmonyBack,
    section: 'Vowel Harmony I — Front/Back',
    title: 'Büyük ünlü uyumu — The big harmony rule',
    goals: [
      'Apply the front/back rule: if the last vowel of the root is BACK (a o ı u), suffix vowels must also be back; if FRONT (e ö i ü), suffix vowels must be front.',
      'Recognize the two-form suffix pattern for plurals: -lar (after back-vowel roots: ev → evler WAIT no — ev is front, so this is -ler) — corrected: kız → kızlar (back), ev → evler (front), kitap → kitaplar (back), göz → gözler (front).',
      'Know that vowel harmony is THE single most important pattern in Turkish — it governs every native suffix and almost every loanword integration.',
    ],
    task: 'Take 10 root nouns and predict the plural form (-lar or -ler) by inspecting the last vowel: çocuk → çocuklar, ders → dersler, kapı → kapılar, gül → güller.',
  },
  {
    id: ACT.vowelHarmonyRound,
    section: 'Vowel Harmony II — Rounded/Unrounded (4-way)',
    title: 'Küçük ünlü uyumu — The small harmony rule',
    goals: [
      'Apply the four-form rule: when a suffix has a high vowel slot, the vowel matches BOTH the back/front AND the rounded/unrounded of the last root vowel — producing 4 forms: -i / -ı / -u / -ü.',
      'See the accusative suffix in action: ev-i (the house), kız-ı (the girl), kol-u (the arm), göz-ü (the eye) — same suffix, four shapes.',
      'Distinguish two-form suffixes (-lar/-ler, -dan/-den, only 2 shapes) from four-form suffixes (-i/-ı/-u/-ü, -in/-ın/-un/-ün, 4 shapes) — every suffix is one or the other.',
    ],
    task: 'Apply the accusative to 10 nouns and produce the correct -i / -ı / -u / -ü form: telefon → telefonu, masa → masayı, ev → evi, gül → gülü.',
  },
  {
    id: ACT.consonantAssim,
    section: 'Consonant Assimilation',
    title: 'Ünsüz benzeşmesi — When d becomes t',
    goals: [
      'Apply the voicing assimilation rule: suffixes that start with d (-de, -da, -dan, -den) become t (-te, -ta, -tan, -ten) after a voiceless final consonant (p, ç, t, k, f, s, ş, h).',
      'Apply the softening rule going the other way: a final voiceless p/ç/t/k often softens to b/c/d/ğ when a vowel-initial suffix is added (kitap → kitabı "the book-ACC", ağaç → ağacı "the tree-ACC").',
      'Memorize the mnemonic for voiceless consonants: FıSTıKÇı ŞaHaP (a name) — its consonants F-S-T-K-Ç-Ş-H-P are exactly the eight that trigger the d→t shift.',
    ],
    task: 'Apply the locative (-de/-da/-te/-ta) to 10 nouns: ev → evde, okul → okulda, kitap → kitapta, ağaç → ağaçta, masa → masada.',
  },
  {
    id: ACT.agglutination,
    section: 'Agglutinative Logic',
    title: 'Eklemeli yapı — How Turkish stacks suffixes',
    goals: [
      'Understand the strict suffix order in Turkish nouns: ROOT + DERIVATIONAL + PLURAL + POSSESSIVE + CASE + (PERSON for verbs/predicates) — and that this order NEVER varies.',
      'Decompose ev-ler-im-de "in my houses" as ev (house) + ler (plural) + im (my) + de (in) — four morphemes, each with its own job.',
      'See that the agglutinative logic means a single Turkish word can carry information that would require 5+ English words.',
    ],
    task: 'Take the root "ev" (house) and stack: ev → evler → evlerim → evlerimde → evlerimdeki — each suffix adds one piece of meaning.',
  },
  {
    id: ACT.stress,
    section: 'Stress',
    title: 'Vurgu — Where the emphasis falls',
    goals: [
      'Apply the default stress rule: Turkish stresses the FINAL syllable of a word — kitap [ki-TAP], araba [a-ra-BA], öğrenci [öğ-ren-Cİ].',
      'Recognize the exceptions: place names often stress the penultimate (İstanbul [is-TAN-bul], Ankara [AN-ka-ra]), and some suffixes (-yor, -lar in nouns) are unstressable so stress moves back.',
      'Hear that Turkish stress is much lighter than English — vowels do not reduce, and unstressed syllables keep their full pronunciation.',
    ],
    task: 'Read 10 multi-syllable words aloud with final-syllable stress: telefon, bilgisayar, üniversite, hastane, lokanta, gazete, yemek, çocuk, arkadaş, öğretmen.',
  },
  {
    id: ACT.reading,
    section: 'Reading Practice',
    title: 'Okuma alıştırması — Putting it all together',
    goals: [
      'Read a short Turkish paragraph aloud applying vowel harmony reading, ğ-lengthening, i/ı distinction, and final-syllable stress — all at once.',
      'Identify where vowel harmony, consonant assimilation, and ğ-lengthening occur within the paragraph so the patterns become recognizable in the wild.',
    ],
    task: 'Read the paragraph below twice with correct stress and ğ-lengthening, then mark each suffix and explain which harmony rule produced its shape.',
  },
];

const lesson = {
  title: 'Level 1 · Foundation: Türk Alfabesi, Ünlü Uyumu ve Telaffuz',
  category: 'foundation',
  difficulty: 'beginner',
  targetLang: 'tr',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'foundation',
  activities,
  expressionPractice: [
    { id: 'read-aloud', label: 'Read aloud from the alphabet', goal: 'Pronounce all 29 Turkish letters with their consistent sound values.' },
    { id: 'vowel-harmony', label: 'Predict harmony', goal: 'Given a noun, predict its plural and locative suffix shape from its last vowel.' },
    { id: 'agglutination', label: 'Stack suffixes', goal: 'Build a four-suffix word from a single root and explain each piece.' },
  ],
  relatedPools: ['topic-pronunciation', 'topic-alphabet'],
  content: [
    // ──────────────────────────────────────────────────────────────────
    // Activity 1 — Intro
    // ──────────────────────────────────────────────────────────────────
    createContentItem(
      'Türk alfabesi',
      'Türk alfabesi',
      'The Turkish alphabet was reformed by Atatürk in 1928, replacing the Ottoman-era Perso-Arabic script with a Latin alphabet of 29 letters. Result: a near one-to-one sound-to-letter mapping that makes Turkish one of the most phonetically transparent languages in Europe.',
      'word',
      'A B C Ç D E F G Ğ H I İ J K L M N O Ö P R S Ş T U Ü V Y Z (29 letters)',
      'Note three letters absent in English: ç (ch), ğ (silent/lengthening), ş (sh) — plus i/ı, ö, ü. The English letters q, w, x are NOT in the Turkish alphabet (used only in foreign words like "taxi" → "taksi").',
      null,
      [ACT.intro],
    ),
    createContentItem(
      'Eklemeli dil',
      'agglutinative language',
      'Turkish is "agglutinative": meaning is built by gluing suffixes onto a fixed root, each suffix carrying one clear piece of information (plural, possessive, case, person, tense). A single Turkish word can encode what English needs a full sentence for.',
      'word',
      'evlerinizden = ev (house) + ler (PL) + iniz (your-PL) + den (from) = "from your houses"',
      'One root, four suffixes, one meaning — and each suffix changes shape according to vowel harmony.',
      [
        { target: 'ev', note: 'root: house (front-unrounded last vowel "e")' },
        { target: '-ler', note: 'plural suffix; -ler because root vowel is front' },
        { target: '-iniz', note: 'your-plural possessive; four-form i-suffix matches front-unrounded' },
        { target: '-den', note: 'ablative "from"; two-form -den/-dan, front version because root is front' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'Ünlü uyumu',
      'vowel harmony',
      'Two-axis harmony governs every native suffix: (1) front/back — back-vowel roots take back-vowel suffixes, front-vowel roots take front-vowel suffixes; (2) rounded/unrounded — high-vowel suffix slots also match rounding of last root vowel. Mastering harmony is the single biggest unlock in Turkish.',
      'word',
      'Roots and their plural suffix shapes: ev → evler, kız → kızlar, göz → gözler, kol → kollar.',
      'Same root meaning category (body part, object), different last vowel, different suffix shape — vowel harmony is mechanical, not semantic.',
      null,
      [ACT.intro],
    ),

    // ──────────────────────────────────────────────────────────────────
    // Activity 2 — Alphabet
    // ──────────────────────────────────────────────────────────────────
    createContentItem('A a', 'a', 'Open back unrounded vowel, like English "a" in "father" — clean and full, never reduced.', 'word', 'ada (island), anne (mother), araba (car)', 'A is a back vowel — it triggers back-vowel suffixes (-lar, -da, -dan).', null, [ACT.alphabet]),
    createContentItem('B b', 'be', 'Voiced bilabial stop, identical to English "b". Often appears at root end where a final p softens to b before a vowel-initial suffix (kitap → kitab-ı).', 'word', 'baba (father), bebek (baby), bilgisayar (computer)', 'Voicing-assimilation candidate: words ending in -p often shift to -b before vowel suffixes.', null, [ACT.alphabet]),
    createContentItem('C c', 'ce', 'IMPORTANT TRAP: Turkish c sounds like English "j" in "jam" — NOT like English "c". Voiced post-alveolar affricate.', 'word', 'cam (glass), cep (pocket), Cuma (Friday)', 'English-speaker pitfall: do NOT read c as "see" or "kuh"; always "j" as in "jam".', null, [ACT.alphabet]),
    createContentItem('Ç ç', 'çe', 'Voiceless post-alveolar affricate — sounds like English "ch" in "chair". Distinct letter from C; never confuse them.', 'word', 'çay (tea), çocuk (child), çiçek (flower)', 'The bottom hook (cedilla) marks the voiceless partner of C. Common in everyday words.', null, [ACT.alphabet]),
    createContentItem('D d', 'de', 'Voiced alveolar stop, like English "d". Locative/ablative suffixes -de/-da become -te/-ta after voiceless consonants (kitapta, not kitapda).', 'word', 'dağ (mountain), deniz (sea), dört (four)', 'Triggers the d→t assimilation rule after voiceless consonants.', null, [ACT.alphabet]),
    createContentItem('E e', 'e', 'Mid front unrounded vowel, like English "e" in "bed" but slightly more open. Front-vowel suffix trigger.', 'word', 'ev (house), ekmek (bread), elma (apple)', 'Front-unrounded: triggers -ler, -de, -den, -i.', null, [ACT.alphabet]),
    createContentItem('F f', 'fe', 'Voiceless labiodental fricative, identical to English "f". Member of the FıSTıKÇı ŞaHaP voiceless set that triggers d→t assimilation.', 'word', 'fil (elephant), fındık (hazelnut), futbol (football)', 'Hazelnut (fındık) is one of Turkey\'s top exports — recognize this word in any Turkish supermarket.', null, [ACT.alphabet]),
    createContentItem('G g', 'ge', 'Voiced velar stop, like English hard "g" in "go". Distinct from Ğ (soft g, no sound). Never read G as English "j".', 'word', 'gül (rose), göz (eye), gece (night)', 'Contrast with Ğ on next slide: G is a real consonant, Ğ is a vowel-extender.', null, [ACT.alphabet]),
    createContentItem('Ğ ğ', 'yumuşak ge', 'Soft G — NEVER pronounced as a consonant. Lengthens the preceding vowel (dağ "daa") or acts as a y-glide between vowels (eğer ≈ "eyer"). Never starts a word.', 'word', 'dağ (mountain, "daa"), ağaç (tree, "aach"), soğuk (cold, "sohuk")', 'The most counter-intuitive letter for beginners: a written letter that has no sound of its own.', null, [ACT.alphabet]),
    createContentItem('H h', 'he', 'Voiceless glottal fricative, like English "h" in "house". Crucially: always pronounced, never silent (unlike French, Spanish "h").', 'word', 'hava (weather), hastane (hospital), her (every)', 'Member of the FıSTıKÇı ŞaHaP voiceless set; triggers d→t assimilation.', null, [ACT.alphabet]),
    createContentItem('I ı', 'ı', 'TRAP: this is dotless I, a back-unrounded-high vowel. Sound like the second vowel in English "rhythm" or Russian ы. NOT the same as dotted i.', 'word', 'ışık (light), kız (girl), sıcak (hot)', 'Distinct phoneme from i — kız (girl) vs kiz (no such word). Master this vowel early.', null, [ACT.alphabet]),
    createContentItem('İ i', 'i', 'Dotted i — front-unrounded-high vowel, like English "ee" in "see". Note the unusual capitalization rule: dotted lowercase i → KEEPS dot uppercase İ.', 'word', 'iki (two), İstanbul, ev (house) — note: lowercase i has dot, capital İ has dot.', 'Capitalization: dotted i → İ (not I). Dotless ı → I. This matters in printing and Turkish keyboards.', null, [ACT.alphabet]),
    createContentItem('J j', 'je', 'TRAP: Turkish j is the French/zh sound (like English "s" in "measure"), NOT English "j" (which is the Turkish c). Rare letter, mostly in loanwords.', 'word', 'jandarma (gendarmerie), jambon (ham), jeton (token)', 'Almost all j-initial words are French/European loans (jeton, jaluzi, jenerator).', null, [ACT.alphabet]),
    createContentItem('K k', 'ke', 'Voiceless velar stop, like English "k". Members of FıSTıKÇı ŞaHaP voiceless set. Final k often softens to ğ before vowel suffixes (kitap → kitabı; but renk → rengi).', 'word', 'kalem (pen), kitap (book), küçük (small)', 'Softening to ğ before vowels: ekmek (bread) → ekmeği (the bread, ACC).', null, [ACT.alphabet]),
    createContentItem('L l', 'le', 'Alveolar lateral, similar to English "l". Slightly clear (front) before front vowels, slightly dark (back) before back vowels.', 'word', 'lokanta (restaurant), limon (lemon), kalem (pen)', 'Standard Turkish l; never silent.', null, [ACT.alphabet]),
    createContentItem('M m', 'me', 'Bilabial nasal, identical to English "m". Common in interrogative suffix -mı/-mi/-mu/-mü (a four-form question particle).', 'word', 'masa (table), merhaba (hello), mavi (blue)', 'Note the question particle -mı/-mi/-mu/-mü uses m + a harmony-matching vowel.', null, [ACT.alphabet]),
    createContentItem('N n', 'ne', 'Alveolar nasal, like English "n". Common in possessive (-ın/-in/-un/-ün) and pronouns (ben "I", sen "you").', 'word', 'ne (what), nasıl (how), nine (grandmother)', 'Crucial in interrogatives ne (what), nasıl (how), nerede (where), niçin (why).', null, [ACT.alphabet]),
    createContentItem('O o', 'o', 'Mid back rounded vowel, like English "o" in "or". Back + rounded, so triggers -lar plural and -u (four-way) accusative.', 'word', 'on (ten), okul (school), oda (room)', 'Back-rounded: triggers -lar plural, -da locative, -u accusative.', null, [ACT.alphabet]),
    createContentItem('Ö ö', 'ö', 'Mid front rounded vowel — say English "e" while rounding lips (like German ö or French eu). Front + rounded, triggers -ler plural and -ü accusative.', 'word', 'öğle (noon), göz (eye), dört (four)', 'Front-rounded: triggers -ler plural, -de locative, -ü accusative.', null, [ACT.alphabet]),
    createContentItem('P p', 'pe', 'Voiceless bilabial stop, like English "p". Member of FıSTıKÇı ŞaHaP. Final p often softens to b before a vowel suffix (kitap → kitabı).', 'word', 'para (money), patates (potato), pazar (market/Sunday)', 'Triggers d→t assimilation; softens to b before vowels.', null, [ACT.alphabet]),
    createContentItem('R r', 're', 'Alveolar tap — single-flap r like Spanish "pero", NEVER the English approximant. Always pronounced, even word-finally. Often slightly devoiced at word-end (var ≈ "varhh").', 'word', 'renk (color), araba (car), var (there is)', 'Word-final r: keep the tap; do not swallow it like in English "car".', null, [ACT.alphabet]),
    createContentItem('S s', 'se', 'Voiceless alveolar fricative, like English "s". Member of FıSTıKÇı ŞaHaP. Distinct from Ş.', 'word', 'sabah (morning), su (water), sen (you)', 'Triggers d→t assimilation in following suffixes.', null, [ACT.alphabet]),
    createContentItem('Ş ş', 'şe', 'Voiceless post-alveolar fricative — English "sh" in "ship". Member of FıSTıKÇı ŞaHaP. Cedilla distinguishes from S.', 'word', 'şehir (city), şeker (sugar), kuş (bird)', 'Common in everyday words: şey (thing), şimdi (now), şu (that).', null, [ACT.alphabet]),
    createContentItem('T t', 'te', 'Voiceless alveolar stop, like English "t". Member of FıSTıKÇı ŞaHaP. Replaces d in suffixes after voiceless consonants.', 'word', 'tabak (plate), tren (train), tatlı (sweet)', 'Common assimilation target: kitap-ta (not kitap-da).', null, [ACT.alphabet]),
    createContentItem('U u', 'u', 'Close back rounded vowel, like English "oo" in "boot" but shorter and pure. Back + rounded.', 'word', 'un (flour), uzun (long), uyku (sleep)', 'Back-rounded high: triggers -lar plural, -u accusative, -un genitive.', null, [ACT.alphabet]),
    createContentItem('Ü ü', 'ü', 'Close front rounded vowel — say English "ee" with rounded lips, like German ü or French u. Front + rounded.', 'word', 'üç (three), üzüm (grape), gül (rose)', 'Front-rounded high: triggers -ler plural, -ü accusative, -ün genitive.', null, [ACT.alphabet]),
    createContentItem('V v', 've', 'Voiced labiodental fricative, like English "v" or Spanish soft b/v. Common conjunction "ve" = "and".', 'word', 've (and), var (there is), vermek (to give)', 'The most common Turkish conjunction "ve" (and) is also a one-syllable word with this letter.', null, [ACT.alphabet]),
    createContentItem('Y y', 'ye', 'Palatal approximant, like English "y" in "yes". Often inserted as a buffer between two vowels (araba-y-ı, su-y-u).', 'word', 'yemek (food/to eat), yarın (tomorrow), iyi (good)', 'Buffer-y: a vowel-final root + vowel-initial suffix triggers a y between them.', null, [ACT.alphabet]),
    createContentItem('Z z', 'ze', 'Voiced alveolar fricative, like English "z". Common in numbers and time words.', 'word', 'zaman (time), zor (difficult), kız (girl)', 'Used in numbers: yüz (hundred), bin yüz (1100), and time expressions: zaman, an.', null, [ACT.alphabet]),

    // ──────────────────────────────────────────────────────────────────
    // Activity 3 — Vowels: the 8-vowel grid
    // ──────────────────────────────────────────────────────────────────
    createContentItem(
      'Sekiz ünlü',
      'eight vowels',
      'Turkish has 8 vowel phonemes arranged on a 2×2×2 grid: 2 dimensions of harmony (front/back, rounded/unrounded) plus 2 heights (high/low). Memorize all 8 by their grid position, not their spelling.',
      'sentence',
      'Back: a (low-unrounded), o (low-rounded), ı (high-unrounded), u (high-rounded).\nFront: e (low-unrounded), ö (low-rounded), i (high-unrounded), ü (high-rounded).',
      'Knowing the grid is more useful than knowing letter names — every suffix derives from grid position.',
      [
        { target: 'BACK-UNROUNDED', note: 'a (low), ı (high) — triggers -lar, -da, -ı suffix shapes' },
        { target: 'BACK-ROUNDED', note: 'o (low), u (high) — triggers -lar, -da, -u suffix shapes' },
        { target: 'FRONT-UNROUNDED', note: 'e (low), i (high) — triggers -ler, -de, -i suffix shapes' },
        { target: 'FRONT-ROUNDED', note: 'ö (low), ü (high) — triggers -ler, -de, -ü suffix shapes' },
      ],
      [ACT.vowels],
    ),
    createContentItem(
      'a / e karşıtlığı',
      'a vs e',
      'The most common two-form suffix uses a vs e: plural -lar/-ler, locative -da/-de, ablative -dan/-den. Choose a after back-vowel roots, e after front-vowel roots.',
      'sentence',
      'kız → kızlar (back) · ev → evler (front) · masa → masada (back) · cep → cepte (front)',
      'Two-form rule covers maybe 30% of Turkish suffixes; the rest use 4-form.',
      null,
      [ACT.vowels],
    ),
    createContentItem(
      'ı / i / u / ü',
      'four high vowels',
      'The four high vowels participate in four-form suffixes. Same suffix slot fills with ı (back-unrounded), i (front-unrounded), u (back-rounded), ü (front-rounded) depending on root.',
      'sentence',
      'Accusative: kız-ı, ev-i, kol-u, göz-ü — same suffix, four shapes.',
      'Four-form suffixes are the second pattern; master both two-form and four-form to handle all of Turkish morphology.',
      [
        { target: 'kız-ı', note: 'back-unrounded → ı' },
        { target: 'ev-i', note: 'front-unrounded → i' },
        { target: 'kol-u', note: 'back-rounded → u' },
        { target: 'göz-ü', note: 'front-rounded → ü' },
      ],
      [ACT.vowels],
    ),
    createContentItem(
      'o / ö asimetrisi',
      'o/ö asymmetry',
      'IMPORTANT EXCEPTION: o and ö only appear in the FIRST syllable of native Turkish words. In suffixes, the high-vowel slot uses u/ü instead — so the four-form is ı/i/u/ü, never ı/i/o/ö.',
      'sentence',
      'Wrong: *otello (no native Turkish has o in later syllables).\nCorrect: telefon (loanword), kola (loanword) — o-in-later-syllable is a loanword giveaway.',
      'Useful diagnostic: a Turkish word with o in syllable 2+ is almost always a loanword.',
      null,
      [ACT.vowels],
    ),
    createContentItem(
      'Diftong yok',
      'no diphthongs',
      'Turkish has NO native diphthongs — each vowel is a pure monophthong. When two vowels meet across a morpheme boundary, Turkish inserts a buffer consonant (usually y or n) rather than merging them.',
      'sentence',
      'araba + ı (accusative) → arabayı (not "arabaı") — y inserted to keep vowels separate.',
      'No diphthongs means each vowel keeps its full quality — sounds clean and Slavic-like rather than English-glided.',
      null,
      [ACT.vowels],
    ),

    // ──────────────────────────────────────────────────────────────────
    // Activity 4 — Consonants
    // ──────────────────────────────────────────────────────────────────
    createContentItem(
      'c vs ç',
      'c vs ç',
      'Voiced/voiceless pair. c = English "j" in "jam"; ç = English "ch" in "chair". Distinct words: cam (glass) vs çam (pine), can (soul) vs çan (bell).',
      'sentence',
      'cam (glass, cahm) vs çam (pine, chahm) — same spelling minus the cedilla, different meaning.',
      'Minimal pair drill: cay (cay, no meaning) vs çay (tea) — listen for the voicing.',
      [
        { target: 'c = English "j"', note: 'voiced affricate; cam, ceket, can' },
        { target: 'ç = English "ch"', note: 'voiceless affricate; çam, çocuk, çay' },
      ],
      [ACT.consonants],
    ),
    createContentItem(
      'j vs c',
      'j vs c',
      'Two Turkish letters that English-speakers conflate. j = soft "zh" (French je, English "measure"); c = hard "j" (English "jam"). Different sounds entirely.',
      'sentence',
      'jandarma (zhandarma, gendarmerie) vs candarma (would be jandarma in English ears, but Turkish j IS the zh sound).',
      'Most j-words are loans from French; native Turkish words use c instead.',
      null,
      [ACT.consonants],
    ),
    createContentItem(
      'r (akıcı)',
      'tapped r',
      'Turkish r is ALWAYS a single tap (alveolar flap), like Spanish "pero". Never the English bunched approximant. Pronounced fully even at word-end (var sounds like "vahr" with a clean tap).',
      'sentence',
      'araba (car, a-RA-ba with tapped r) vs English "Arabia" (different r entirely).',
      'Tap the r quickly; do not roll it (that would be Spanish rr, not Turkish r).',
      null,
      [ACT.consonants],
    ),
    createContentItem(
      'h sessiz değil',
      'h is never silent',
      'Turkish h is ALWAYS pronounced — even mid-word (sabah "morning"), even at word-end (Allah, ah). Unlike French/Spanish/Italian, never silent.',
      'sentence',
      'sabah (sah-BAH, morning), hangi (HAN-gi, which), Allah (ahl-LAH).',
      'English-speaker habit of dropping h ("our" becoming "ower") is wrong in Turkish — every h is pronounced.',
      null,
      [ACT.consonants],
    ),
    createContentItem(
      'q, w, x yok',
      'no q, w, x',
      'The letters Q, W, X are NOT in the Turkish alphabet. Words borrowed from English with these letters get Turkified: taxi → taksi, washington → vaşington, query → keri.',
      'sentence',
      'taxi → taksi, week-end → vikend (now hafta sonu), quiz → kviz (rare; mostly avoided).',
      'Some informal writing (texting, brand names) uses q/w/x but standard Turkish does not.',
      null,
      [ACT.consonants],
    ),

    // ──────────────────────────────────────────────────────────────────
    // Activity 5 — Soft G
    // ──────────────────────────────────────────────────────────────────
    createContentItem(
      'ğ kuralı',
      'ğ rule',
      'The soft G (yumuşak ge) is NEVER pronounced as a stop. Three behaviors: (1) lengthens preceding vowel (dağ → "daa"), (2) acts as a y-glide between vowels (eğer → "eyer"), (3) lengthens the vowel between two ğs? — but this is rare. ğ never starts a word.',
      'sentence',
      'dağ → "daa" (mountain) · ağaç → "aaç" (tree) · soğuk → "souk" (cold) · değil → "deyil" (not)',
      'A core literacy skill: see ğ, treat it as silent-with-lengthening.',
      [
        { target: 'between back vowels (aa, ıı, oo, uu)', note: 'pure lengthening; dağ, doğru, soğuk' },
        { target: 'between front vowels (ee, ii, öö, üü)', note: 'often a y-glide; eğer, değil, öğle' },
        { target: 'word-final after vowel', note: 'lengthens preceding vowel; dağ, ağ' },
      ],
      [ACT.softG],
    ),
    createContentItem(
      'ğ örnekleri',
      'ğ examples',
      'High-frequency ğ-words you will see daily. Memorize their pronunciations so reading them is automatic.',
      'sentence',
      'dağ (daa, mountain) · doğru (DOH-ru, correct) · oğlum (OH-lum, my son) · öğretmen (öy-RET-men, teacher) · değil (de-YIL, not) · soğuk (SO-uk, cold) · yağmur (yaa-MUR, rain)',
      'Notice öğretmen has both ğ and a stress on the final syllable.',
      null,
      [ACT.softG],
    ),
    createContentItem(
      'ğ asla başta',
      'ğ never word-initial',
      'No Turkish word starts with ğ. This is a strict orthographic rule: ğ requires a preceding vowel. If you see ğ at the very start of a word, it is a typo or non-Turkish.',
      'sentence',
      'ALLOWED: dağ, ağ, eğer, oğul. BANNED: *ğal, *ğep — these are not Turkish.',
      'Use the rule as a checking tool when proofreading Turkish text.',
      null,
      [ACT.softG],
    ),

    // ──────────────────────────────────────────────────────────────────
    // Activity 6 — i vs ı
    // ──────────────────────────────────────────────────────────────────
    createContentItem(
      'i / ı çifti',
      'i / ı pair',
      'These are TWO LETTERS, TWO PHONEMES — not capital and lowercase variants of one letter. Dotted i is high-front-unrounded ("ee"); dotless ı is high-back-unrounded (English "rhythm").',
      'sentence',
      'Minimal pairs: kız (girl) vs *kiz (no word); bir (one) vs *bır (no word); sıkı (tight) vs siki (vulgar).',
      'In a few cases swapping vowels produces a different actual Turkish word with very different meaning.',
      [
        { target: 'i (dotted, front)', note: 'like English "ee"; bir, iki, ev, evim' },
        { target: 'ı (dotless, back)', note: 'like Russian ы; kız, ışık, kırmızı' },
      ],
      [ACT.dottedI],
    ),
    createContentItem(
      'Büyük harf kuralı',
      'capitalization rule',
      'Turkish keeps the dot through capitalization for the dotted i: lowercase i → uppercase İ (with dot). The dotless letter is lowercase ı / uppercase I (no dot). This causes endless trouble for Turkish-language software (Locale "tr-TR" bug).',
      'sentence',
      'İstanbul (capital I has dot) · ısı (warmth, all lowercase, dotless) · İYİ (good, all uppercase, dotted).',
      'Programmers: the Turkish locale changes I.toLowerCase() to ı, not i — a famous Unicode bug source.',
      null,
      [ACT.dottedI],
    ),
    createContentItem(
      'ı + harmoni',
      'ı in harmony',
      'When the last vowel of a root is ı, all four-form suffixes use ı: kız → kızı (the girl, ACC), kızın (your girl, GEN), kızdan (from the girl, ABL).',
      'sentence',
      'kız → kızı (ACC), kızın (GEN), kızdan (ABL), kızlar (PL) — all back-unrounded forms.',
      'ı-roots are common in Turkish; learn to recognize and produce the matching suffixes.',
      null,
      [ACT.dottedI],
    ),

    // ──────────────────────────────────────────────────────────────────
    // Activity 7 — Vowel harmony I (front/back)
    // ──────────────────────────────────────────────────────────────────
    createContentItem(
      'Büyük ünlü uyumu',
      'big vowel harmony',
      'THE rule. Suffix vowels must match the front/back quality of the LAST vowel in the root. Two-form suffixes (-lar/-ler) have two shapes; four-form suffixes have four. The "big" harmony is just the front/back axis.',
      'sentence',
      'Last vowel back (a, ı, o, u) → -lar plural: kız-lar, masa-lar, kol-lar, okul-lar.\nLast vowel front (e, i, ö, ü) → -ler plural: ev-ler, gül-ler, göz-ler.',
      'The mechanic is the LAST root vowel; intermediate vowels are irrelevant.',
      [
        { target: 'BACK roots → -lar', note: 'a, ı, o, u in last syllable; 30+ years of practice would not change this' },
        { target: 'FRONT roots → -ler', note: 'e, i, ö, ü in last syllable; same mechanical rule' },
      ],
      [ACT.vowelHarmonyBack],
    ),
    createContentItem(
      'Çoğul örnekleri',
      'plural examples',
      'Drill set: predict the plural by last vowel. ev → evler, kız → kızlar, oda → odalar, gece → geceler, çocuk → çocuklar, öğretmen → öğretmenler, üzüm → üzümler.',
      'sentence',
      'ev → evler · kız → kızlar · oda → odalar · gece → geceler · çocuk → çocuklar · öğretmen → öğretmenler · üzüm → üzümler',
      'After 50 such pairs, the suffix shape becomes automatic.',
      null,
      [ACT.vowelHarmonyBack],
    ),
    createContentItem(
      'Lokatif örnekleri',
      'locative examples',
      'Same harmony applies to locative -de/-da: ev-de (at home), kız-da (with the girl), oda-da (in the room), göz-de (in the eye). The d → t assimilation applies on top when the root ends in a voiceless consonant.',
      'sentence',
      'ev-de · kız-da · oda-da · göz-de · sokak-ta · ağaç-ta · kitap-ta',
      'Last three trigger d → t because final k/ç/p are voiceless (FıSTıKÇı ŞaHaP set).',
      null,
      [ACT.vowelHarmonyBack],
    ),
    createContentItem(
      'İstisnalar',
      'exceptions',
      'A few common words BREAK harmony — usually old loanwords (saat "hour", kitap "book", anne "mother"). These take suffixes by their LAST vowel even if internal harmony is broken. The rule is always the last vowel.',
      'sentence',
      'saat (back ending) → saatler? NO — saatler (front "e" treated as last vowel because of internal a-a-a sequence? actually saat is a Persian loan).',
      'Some loanwords (kitap, saat, kalem) take front suffixes despite back vowels — historical reasons. Memorize the irregulars.',
      [
        { target: 'kitap → kitabı (ACC)', note: 'back vowel, regular' },
        { target: 'saat → saati (ACC)', note: 'has back vowels but uses front suffix — historical irregularity' },
        { target: 'kalem → kalemi (ACC)', note: 'front vowel, regular' },
      ],
      [ACT.vowelHarmonyBack],
    ),

    // ──────────────────────────────────────────────────────────────────
    // Activity 8 — Vowel harmony II (rounded/unrounded)
    // ──────────────────────────────────────────────────────────────────
    createContentItem(
      'Küçük ünlü uyumu',
      'small vowel harmony',
      'The 4-way rule for HIGH-vowel suffix slots: I-vowels match BOTH the front/back AND the rounded/unrounded of the last root vowel. Result: -ı / -i / -u / -ü (four shapes).',
      'sentence',
      'kız-ı (back-unrounded ACC) · ev-i (front-unrounded ACC) · kol-u (back-rounded ACC) · göz-ü (front-rounded ACC)',
      'The four shapes form the famous "i-suffix" family: accusative, possessives, genitive, etc.',
      [
        { target: 'BACK-UNROUNDED → ı', note: 'a, ı root vowels → suffix ı' },
        { target: 'FRONT-UNROUNDED → i', note: 'e, i root vowels → suffix i' },
        { target: 'BACK-ROUNDED → u', note: 'o, u root vowels → suffix u' },
        { target: 'FRONT-ROUNDED → ü', note: 'ö, ü root vowels → suffix ü' },
      ],
      [ACT.vowelHarmonyRound],
    ),
    createContentItem(
      'Akusatif',
      'accusative',
      'The definite-direct-object marker -ı/-i/-u/-ü picks one of four shapes by harmony. Drill: telefon → telefonu, masa → masayı (with buffer y), göz → gözü, gül → gülü.',
      'sentence',
      'Kitabı okudum. (I read the book.) · Telefonu açtım. (I picked up the phone.) · Gülü kokladım. (I smelled the rose.)',
      'Notice the buffer y in masayı: vowel-final root + vowel-initial suffix triggers y insertion.',
      null,
      [ACT.vowelHarmonyRound],
    ),
    createContentItem(
      'Genitif -in/-ın/-un/-ün',
      'genitive -in/-ın/-un/-ün',
      'The possessor case "of X" also uses the four-form pattern: ev-in (of the house, "the house\'s"), kız-ın (of the girl), kol-un (of the arm), göz-ün (of the eye). Same harmony.',
      'sentence',
      'evin kapısı (the door of the house) · kızın çantası (the girl\'s bag) · kolun gücü (the strength of the arm)',
      'Genitive + possessive form the famous Turkish izafet (compound noun) construction.',
      null,
      [ACT.vowelHarmonyRound],
    ),

    // ──────────────────────────────────────────────────────────────────
    // Activity 9 — Consonant assimilation
    // ──────────────────────────────────────────────────────────────────
    createContentItem(
      'FıSTıKÇı ŞaHaP',
      'FıSTıKÇı ŞaHaP mnemonic',
      'A Turkish name whose consonants — F, S, T, K, Ç, Ş, H, P — are exactly the eight VOICELESS consonants that trigger the d → t assimilation in suffixes. Memorize it; it covers every case.',
      'sentence',
      'After F/S/T/K/Ç/Ş/H/P (and only those), suffix -de becomes -te, -da becomes -ta, -dan becomes -tan, -den becomes -ten.',
      'A bedrock Turkish-teaching mnemonic; works without exception.',
      null,
      [ACT.consonantAssim],
    ),
    createContentItem(
      'd → t örnekleri',
      'd → t examples',
      'Drill: apply locative -de/-da to ten roots and watch d → t after voiceless finals.',
      'sentence',
      'ev-de · oda-da · masa-da · kitap-ta · sokak-ta · ağaç-ta · iş-te · top-ta · sınıf-ta · saat-te',
      'The first three keep -de/-da (final letter voiced/vowel); the rest shift to -te/-ta after FıSTıKÇı consonants.',
      null,
      [ACT.consonantAssim],
    ),
    createContentItem(
      'Yumuşama',
      'softening',
      'The reverse direction: a root-final voiceless p/ç/t/k often softens to its voiced partner b/c/d/ğ when followed by a vowel-initial suffix. Common in everyday words: kitap → kitabı, ağaç → ağacı, kanat → kanadı, ekmek → ekmeği.',
      'sentence',
      'kitap + ı (ACC) → kitabı (the book) — p softens to b before vowel.\nağaç + ı (ACC) → ağacı — ç softens to c.\nekmek + i (ACC) → ekmeği — k softens to ğ.',
      'Not every root softens — short monosyllables and loanwords often resist (top → topu, not "tobu").',
      [
        { target: 'p → b', note: 'kitap → kitabı, dolap → dolabı' },
        { target: 'ç → c', note: 'ağaç → ağacı, ilaç → ilacı' },
        { target: 't → d', note: 'kanat → kanadı, kağıt → kağıdı' },
        { target: 'k → ğ', note: 'ekmek → ekmeği, çocuk → çocuğu' },
      ],
      [ACT.consonantAssim],
    ),

    // ──────────────────────────────────────────────────────────────────
    // Activity 10 — Agglutination
    // ──────────────────────────────────────────────────────────────────
    createContentItem(
      'Ek sırası',
      'suffix order',
      'In Turkish nouns the suffix order is FIXED: ROOT + DERIVATIONAL + PLURAL + POSSESSIVE + CASE. Mixing the order is a syntactic error.',
      'sentence',
      'ev-ler-im-de = ev (house) + ler (PL) + im (my) + de (LOC) = "in my houses"',
      'Each suffix is one job: plural before possessive before case. Always.',
      [
        { target: 'ROOT', note: 'ev (house)' },
        { target: '+PLURAL', note: '-ler/-lar' },
        { target: '+POSSESSIVE', note: '-im (my), -in (your), -i (his/her), -imiz (our), -iniz (your-PL), -leri (their)' },
        { target: '+CASE', note: '-de (LOC), -den (ABL), -e (DAT), -i (ACC), -in (GEN)' },
      ],
      [ACT.agglutination],
    ),
    createContentItem(
      'Stack örneği',
      'stacking example',
      'Build a complex word step by step from "ev" (house).',
      'sentence',
      'ev → evler → evlerim → evlerimde → evlerimdeki',
      '"the one in my houses" — five layers of suffixes from one root.',
      [
        { target: 'ev', note: 'root: house' },
        { target: 'evler', note: '+ ler (PL): houses' },
        { target: 'evlerim', note: '+ im (my): my houses' },
        { target: 'evlerimde', note: '+ de (LOC): in my houses' },
        { target: 'evlerimdeki', note: '+ ki (substantivizing): the one in my houses' },
      ],
      [ACT.agglutination],
    ),
    createContentItem(
      'Fiil sırası',
      'verb suffix order',
      'For verbs the fixed order is ROOT + VOICE + NEGATIVE + TENSE/ASPECT + PERSON. Example: gel-me-di-niz = "you (plural) did not come".',
      'sentence',
      'gel-me-di-niz = gel (come) + me (NEG) + di (past) + niz (you-PL) = "you did not come"',
      'Verb stacks are typically 3-5 suffixes; same fixed ordering principle.',
      null,
      [ACT.agglutination],
    ),

    // ──────────────────────────────────────────────────────────────────
    // Activity 11 — Stress
    // ──────────────────────────────────────────────────────────────────
    createContentItem(
      'Son hece vurgusu',
      'final-syllable stress',
      'Default Turkish stress falls on the LAST syllable of a word. Adding suffixes shifts stress forward to the new final syllable: ev (EV) → evler (ev-LER) → evlerim (ev-le-RİM).',
      'sentence',
      'kitap (ki-TAP) → kitaplar (ki-tap-LAR) → kitaplarımız (ki-tap-la-rı-MIZ)',
      'Stress is light compared to English; vowels do not reduce in unstressed syllables.',
      null,
      [ACT.stress],
    ),
    createContentItem(
      'İstisnalar',
      'stress exceptions',
      'Place names typically stress penultimate: İstanbul (is-TAN-bul), Ankara (AN-ka-ra), İzmir (İZ-mir). Some suffixes are "stress-repellent" (-yor, -lar in some contexts) and shift stress back to the previous syllable.',
      'sentence',
      'Place names: İstanbul (is-TAN-bul), Ankara (AN-ka-ra), İzmir (İZ-mir), Bursa (BUR-sa).\nVerb -yor: GİDİ-yor-um (I am going) — yor is unstressable.',
      'Place names and the present -yor are the two main stress exceptions to learn.',
      null,
      [ACT.stress],
    ),

    // ──────────────────────────────────────────────────────────────────
    // Activity 12 — Reading practice
    // ──────────────────────────────────────────────────────────────────
    createContentItem(
      'Okuma parçası',
      'reading paragraph',
      'A short Turkish paragraph using every pattern from this lesson: harmony, ğ, i/ı, agglutination, stress. Read aloud twice.',
      'paragraph',
      'Merhaba! Benim adım Ayşe. İstanbul\'da yaşıyorum. Boğaziçi Üniversitesi\'nde öğrenciyim. Türkçe öğreniyorum. Türkçe çok güzel bir dil. Yağmurlu havalarda evde kitap okumayı seviyorum. Sabahları çay içerim, akşamları arkadaşlarımla buluşurum.',
      'Translation: "Hello! My name is Ayşe. I live in İstanbul. I am a student at Boğaziçi University. I am learning Turkish. Turkish is a very beautiful language. On rainy days I like reading books at home. I drink tea in the mornings and meet my friends in the evenings."',
      [
        { target: 'İstanbul\'da', note: 'apostrophe separates proper noun from case suffix; -da locative shows back-vowel harmony' },
        { target: 'Boğaziçi Üniversitesi\'nde', note: 'compound noun with possessive + locative; flagship Istanbul university name' },
        { target: 'öğrenciyim', note: 'öğrenci (student) + y (buffer) + im (I am); ğ acts as glide between ö and r' },
        { target: 'yağmurlu', note: 'yağ + mur (rain) + lu (with) — ğ lengthens preceding vowel' },
        { target: 'sabahları / akşamları', note: 'plural + possessive used adverbially: "in the mornings / evenings"' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'Harmoni kontrolü',
      'harmony check',
      'Find every suffix in the paragraph and explain why it has the shape it does. This trains the diagnostic eye.',
      'sentence',
      'evde → ev (front) → -de (front locative). yağmurlu → yağmur (back) → -lu (back-rounded). çayı içerim → çay (back) → -ı (back-unrounded ACC).',
      'Every suffix shape has a deterministic explanation from the last root vowel.',
      null,
      [ACT.reading],
    ),
  ],
};

module.exports = lesson;
