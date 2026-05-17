// Level 1 — Foundation: Bahasa Melayu Sound System & Rumi Spelling
// First lesson on the Malay / Bahasa Melayu (Malaysian) track. Pre-grammar,
// pre-vocabulary. Covers the 6 vowels (including schwa), the consonant
// inventory (with ng/ny phonemes), syllable structure, stress, the Rumi
// alphabet, and a brief note on Jawi (the Arabic-derived script used in
// religious and ceremonial contexts in Malaysia). Emphasis is on Malaysian
// pronunciation norms — distinct from Indonesian where relevant.
//
// All content is authored with Rumi (target Latin script) + a phonetic hint
// (romanization slot, used for IPA / spoken-form notes) + rich English glosses
// (canonical source). The AI conversation tutor reads this curriculum and
// delivers it to each learner in their preferred native language at runtime —
// never assume a specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition.

const createContentItem = (
  target,
  pinyin,
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
  romanization: pinyin,
  nativeText: note,
  pronunciation: pinyin,
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
  intro: 'ms-foundation-intro',
  alphabet: 'ms-foundation-alphabet',
  vowels: 'ms-foundation-vowels',
  schwa: 'ms-foundation-schwa',
  consonants: 'ms-foundation-consonants',
  digraphs: 'ms-foundation-digraphs',
  syllables: 'ms-foundation-syllables',
  stress: 'ms-foundation-stress',
  loanwords: 'ms-foundation-loanwords',
  jawi: 'ms-foundation-jawi',
  msVsId: 'ms-foundation-ms-vs-id',
  reading: 'ms-foundation-reading',
};

const activities = [
  {
    id: ACT.intro,
    section: 'Why Sound & Spelling First',
    title: 'Bahasa Melayu — a Rumi-script language with a tidy sound system',
    goals: [
      'Understand that modern Bahasa Melayu (BM) is written in Rumi (the Latin alphabet) with one-letter-to-one-sound regularity, so once you learn the rules you can read any word aloud.',
      'See that BM has 6 vowels (including a true schwa /ə/), no tones, no native consonant clusters, and a light penultimate stress — these four facts shape everything you will pronounce later.',
      'Know that Jawi (Arabic-derived script) is still officially co-equal in Malaysia for ceremonial, religious, and signage use, and that you will see it on mosques, royal documents, and Kelantan/Terengganu street signs.',
    ],
    task: 'Read the four structural facts. By the end of this lesson you should pronounce any Rumi-spelled Malay word aloud with correct vowels and stress, even before you know its meaning.',
  },
  {
    id: ACT.alphabet,
    section: 'The Rumi Alphabet',
    title: 'Abjad Rumi — 26 letters, mostly familiar',
    goals: [
      'Recognize the 26-letter Rumi alphabet used in BM: identical letter shapes to English, but the values of c, e, j, and y diverge.',
      'Know the BM names of the letters (a, bé, cé, dé, é, éf, gé, ha, i, jé, ka, él, ém, én, o, pé, ku, ér, és, té, u, vé, wé, éks, yé, zét) — Malaysian school usage; very close to ID but the letter "r" is rolled more consistently in MY.',
    ],
    task: 'Spell out your own name letter by letter aloud using the BM letter names; the first names you will hear spelled this way are in school registration and at JPN (national registry).',
  },
  {
    id: ACT.vowels,
    section: 'The 6 Vowels',
    title: 'Vokal — a, e, i, o, u, é (schwa is hidden in "e")',
    goals: [
      'Pronounce the 5 "full" vowels a (/a/), i (/i/), o (/o/), u (/u/), é (/e/) as pure, short, undiphthongized sounds — closer to Spanish or Italian vowels than to English.',
      'Recognize that the single letter "e" in BM stands for TWO different sounds: a true schwa /ə/ (most often, as in "emak", "kerja") AND the /e/ sound (as in "meja", "petang"). Malaysians do NOT normally mark é with an accent in everyday writing; you learn which is which from context or a dictionary.',
      'Notice that BM vowels never reduce as heavily as English vowels: "Malaysia" is "ma-lay-si-a" with 4 clearly pronounced vowels, not "muh-lay-shuh".',
    ],
    task: 'Read aloud: ada, ibu, oren, ubat, meja (/e/), emak (/ə/). Hear the contrast between the two "e" pronunciations.',
  },
  {
    id: ACT.schwa,
    section: 'The Schwa',
    title: 'Bunyi "e pepet" /ə/ — the most common Malay vowel',
    goals: [
      'Hear that the schwa /ə/ (called "e pepet" in BM) is the default sound of the letter "e" in unstressed syllables — extremely high frequency: emak, kerja, perempuan, bersama, terima, sebab.',
      'Distinguish Malaysian and Indonesian schwa: BM keeps the schwa fairly distinct, while Indonesian often deletes it or merges it with adjacent vowels (e.g., MY "kereta" vs ID "kreta" in casual speech).',
      'Know that the contrasting /e/ (called "e taling") appears in fewer but high-value words: meja, sate, petang, sekolah (first e). Mispronouncing one for the other can create a different word: perang /pə.raŋ/ "war" vs perang /pe.raŋ/ "brown".',
    ],
    task: 'Read aloud: perang (war /ə/) vs perang (brown /e/), serong (slanted /ə/) vs sérong (oblique /e/). Mark which "e" is which.',
  },
  {
    id: ACT.consonants,
    section: 'Consonants',
    title: 'Konsonan — mostly English-like with three traps',
    goals: [
      'Pronounce most BM consonants the same as English (b, d, f, g, h, j, k, l, m, n, p, r, s, t, v, w, y, z), but with three exceptions: c is always /tʃ/ (cina, cakap), q only in religious loans (Quran), and x is rare and pronounced /ks/.',
      'Roll the "r" — Malaysian "r" is a tap or trill (similar to Spanish), NOT the English approximant. This is one of the clearest Malaysian markers compared to Singaporean Malay, which is softer.',
      'Note that final consonants (especially -k and -p) are usually unreleased glottal stops in Malaysian speech: "tidak" → [ti.daʔ], "cakap" → [tʃa.kapˀ]. This is much stronger in MY than in ID.',
    ],
    task: 'Read aloud: cinta, jaga, raya, makan, cakap. Tap the r, glottal-stop the final k/p.',
  },
  {
    id: ACT.digraphs,
    section: 'Digraphs',
    title: 'ng, ny, sy, kh, gh — two letters, one sound',
    goals: [
      'Pronounce ng /ŋ/ as a single sound (like English "sing"), even at the start of a word — "ngeri" (scary) starts with /ŋ/, not /n.g/.',
      'Pronounce ny /ɲ/ as a single palatal nasal (like Spanish "ñ") — "nyamuk" (mosquito), "tanya" (ask).',
      'Recognize the loan digraphs: sy /ʃ/ in Arabic loans (syarikat "company", masyarakat "society"), kh /x/ or /k/ (khusus "specific"), gh /ɣ/ or /g/ (ghaib "unseen").',
    ],
    task: 'Read aloud: ngeri, nyanyi, syarikat, khabar, ghairah. Identify which digraph is in each word.',
  },
  {
    id: ACT.syllables,
    section: 'Syllable Structure',
    title: 'Suku kata — open syllables and no native clusters',
    goals: [
      'Recognize that native Malay syllables are mostly (C)V or (C)VC — there are NO native consonant clusters at the start of a word. "Strategi", "psikologi", "skema" are all loanwords from European languages.',
      'Note that even when written with clusters, Malaysians often insert a schwa: "strategi" → /sə.tə.ra.te.gi/, "kelas" stays /kə.las/ but "klas" is impossible natively.',
      'See that most native words alternate consonant and vowel cleanly: ma-kan, ru-mah, se-ko-lah, ke-lu-ar-ga. This makes syllabification almost automatic.',
    ],
    task: 'Syllabify these words by drawing dots: keluarga, sekolah, makanan, terima, perpustakaan.',
  },
  {
    id: ACT.stress,
    section: 'Stress',
    title: 'Tekanan — light penultimate, but flat overall',
    goals: [
      'Apply the default rule: stress falls on the second-last (penultimate) syllable — saYA, maKAN, ruMAH, sekoLAH, terima KAsih.',
      'Hear that BM stress is LIGHT compared to English — the syllables are roughly equal in length, and the "stress" is a small pitch lift, not a big vowel lengthening.',
      'Know the exception: if the penultimate vowel is a schwa, stress shifts to the final syllable. beLAJAR, ke-LUAR. Indonesian shifts this even more aggressively; Malaysian keeps it mild.',
    ],
    task: 'Read aloud and mark the stressed syllable: saya, makan, rumah, sekolah, belajar, keluar, terima kasih.',
  },
  {
    id: ACT.loanwords,
    section: 'Loanwords',
    title: 'Pinjaman — English, Arabic, Sanskrit, Portuguese, Chinese, Tamil',
    goals: [
      'Recognize the layered loan history of BM: Sanskrit (bahasa, dunia, raja, agama), Arabic (kitab, masjid, doa, ilmu), Portuguese (gereja, bendera, almari, mentega), English (komputer, polis, lif/lift, basikal), Chinese (teh, mi, kongsi), Tamil (mangga, kapal).',
      'Know that MY and ID often diverge in their loan vocabulary: MY "lif" (from English "lift") vs ID "lift"; MY "kereta" (general car) vs ID "mobil"; MY "pejabat" (office) vs ID "kantor"; MY "polis" (police) vs ID "polisi" (policy in ID; police is "polisi" or "polri").',
      'Pronounce English loans with native vowels and unreleased stops: "stesen" /stesen/ (station), "lif" /lif/, "polis" /po.lis/, "komputer" /kɔm.pu.tər/.',
    ],
    task: 'For each word, name the source language: meja, sekolah, masjid, polis, teh, raja, almari.',
  },
  {
    id: ACT.jawi,
    section: 'Jawi',
    title: 'Tulisan Jawi — the Arabic-derived script of the Malay world',
    goals: [
      'Know that Jawi is the original written script of Malay (from the 14th century), based on Arabic with extra letters for Malay-only sounds (ca چ, nga ڠ, nya ڽ, pa ڤ, ga ݢ).',
      'Recognize that Jawi is still active in Malaysia: it is co-official in Kelantan and Terengganu, used on mosques and royal documents nationwide, and taught in primary school under Pendidikan Islam.',
      'Identify the most common Jawi you will encounter as a beginner: مليسيا (Malaysia), كوالا لومڤور (Kuala Lumpur), سلامت داتڠ (Selamat datang).',
    ],
    task: 'Identify the Jawi rendering of "Selamat Datang" (welcome) on Malaysian airport signs — you will recognize it visually even without knowing the script in depth.',
  },
  {
    id: ACT.msVsId,
    section: 'MS vs ID',
    title: 'Bahasa Melayu vs Bahasa Indonesia — sibling languages, distinct identities',
    goals: [
      'Understand that MS (Bahasa Melayu / Bahasa Malaysia) and ID (Bahasa Indonesia) are roughly 80% mutually intelligible but ARE different national standards with separate spelling councils (DBP Malaysia, Badan Bahasa Indonesia).',
      'Note the biggest differences a beginner will hit: vocabulary (MY pejabat vs ID kantor "office"; MY kereta vs ID mobil "car"; MY bilik vs ID kamar "room"; MY duit vs ID uang "money"), spelling (MY kerana vs ID karena "because"), and loan source (MY favors English loans, ID favors Dutch/older Portuguese).',
      'Recognize that pronunciation diverges too: MY tends to keep final glottal stops crisp and rolls the r more; ID has heavier schwa reduction and a softer r. Hearing one or the other is enough to identify the speaker\'s country.',
    ],
    task: 'For each pair, mark which is MY and which is ID: kereta/mobil, bilik/kamar, kerana/karena, pejabat/kantor, lif/lift.',
  },
  {
    id: ACT.reading,
    section: 'Reading Practice',
    title: 'Bacaan — Read a full sentence applying every rule',
    goals: [
      'Read a short Rumi-spelled Malay sentence aloud with correct vowels (full vs schwa), digraphs (ng, ny), final glottal stops, and penultimate stress.',
      'Identify each vowel quality, each digraph, and each stressed syllable in the example sentence.',
    ],
    task: 'Read aloud: "Selamat pagi! Saya seorang pelajar di Universiti Malaya, dan saya tinggal di Kuala Lumpur." Then point out every schwa, every digraph, and every stressed syllable.',
  },
];

const level1Foundation = {
  title: 'Foundation: Bahasa Melayu Sound System & Rumi Spelling — Reading & Pronouncing Malay',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'ms',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'foundation',
  activities,
  expressionPractice: [],
  relatedPools: [],
  content: [
    // Activity 1 — Intro
    createContentItem('Bahasa Melayu', 'ba.ha.sa mə.la.ju', 'The official national language of Malaysia, Brunei, and Singapore (alongside English/Mandarin/Tamil). The same language family as Bahasa Indonesia but a distinct national standard regulated by Dewan Bahasa dan Pustaka (DBP) in Kuala Lumpur.', 'word', 'Bahasa Melayu ialah bahasa rasmi Malaysia.', '"Malay is the official language of Malaysia." — opening line of any civic introduction in BM.', null, [ACT.intro]),
    createContentItem('Rumi dan Jawi', 'ru.mi dan dʒa.wi', 'BM uses TWO scripts officially: Rumi (Latin alphabet, the everyday script since the 20th century) and Jawi (Arabic-derived, kept for religious, ceremonial, and Islamic-state contexts). Rumi is what 99% of beginners will read.', 'word', 'Tulisan Rumi digunakan di sekolah; tulisan Jawi digunakan di masjid dan istana.', '"Rumi script is used in schools; Jawi is used at the mosque and the palace." — the practical division of labor.', null, [ACT.intro]),
    createContentItem('empat ciri utama', 'əm.pat tʃi.ri u.ta.ma', 'The four foundational features of Malay sound: (1) 6 vowels including schwa, (2) no tones, (3) no native clusters, (4) light penultimate stress. Master these and you can read any new word aloud correctly.', 'word', '(1) 6 vokal · (2) tiada nada · (3) tiada kelompok konsonan asli · (4) tekanan ringan di suku kata kedua dari belakang.', 'Compare with Mandarin (tones), English (heavy clusters, heavy stress reduction), or Arabic (emphatic consonants) — BM is structurally one of the easiest scripts in Asia.', null, [ACT.intro]),

    // Activity 2 — Alphabet
    createContentItem('A a', 'a', 'Pronounced /a/ — a clean front-open vowel, like Spanish "a" or English "father" but shorter.', 'word', 'apa, ada, ayam', 'Three high-frequency words starting with a: "what", "exist/have", "chicken".', null, [ACT.alphabet]),
    createContentItem('B b', 'bé', 'Pronounced /b/ at all positions; final -b devoices to /p/ in some loans (e.g., "Arab" → /a.rap/).', 'word', 'buku, baju, baik', 'Three common words: book, shirt, good.', null, [ACT.alphabet]),
    createContentItem('C c', 'tʃé', 'CRITICAL: BM "c" is ALWAYS /tʃ/ (like English "ch"), never /k/ or /s/. "cinta" /tʃin.ta/ "love", "cakap" /tʃa.kap/ "speak". Unlike English where c shifts between /k/ and /s/.', 'word', 'cinta, cakap, cuba', 'Love, speak, try — three core verbs with c = /tʃ/.', null, [ACT.alphabet]),
    createContentItem('D d', 'dé', 'Pronounced /d/ at start and middle; usually unreleased at end of word ("abad" → /a.batˀ/).', 'word', 'dia, dari, duduk', 'He/she, from, sit down.', null, [ACT.alphabet]),
    createContentItem('E e', 'é', 'Two pronunciations: schwa /ə/ ("emak", "kerja") OR /e/ ("meja", "petang"). You learn which from context — Malaysians rarely mark the distinction in writing.', 'word', 'emak (/ə/) vs meja (/e/)', '"Mother" with schwa; "table" with the full /e/. Same letter, different sound, different meaning.', null, [ACT.alphabet]),
    createContentItem('F f', 'éf', 'Used mainly in loanwords (English, Arabic): "fail" (file), "fikir" (think, from Arabic).', 'word', 'fail, fikir, faedah', 'File, think, benefit — three loanwords with /f/.', null, [ACT.alphabet]),
    createContentItem('G g', 'gé', 'Always hard /g/ in BM, unlike English where g can be /dʒ/. "gigi" /gi.gi/ "tooth", never */dʒi.dʒi/.', 'word', 'gigi, guru, gajah', 'Tooth, teacher, elephant.', null, [ACT.alphabet]),
    createContentItem('H h', 'ha', 'Pronounced /h/ but often softened or dropped at end of word: "rumah" /ru.ma(h)/, "Allah" with strong final h.', 'word', 'hari, harga, hujan', 'Day, price, rain.', null, [ACT.alphabet]),
    createContentItem('I i', 'i', 'Pronounced /i/ — clean close-front vowel, like Spanish or French "i".', 'word', 'ini, ibu, ikan', 'This, mother, fish.', null, [ACT.alphabet]),
    createContentItem('J j', 'dʒé', 'BM "j" is /dʒ/ (like English "j" in "judge"). Different from ID standard where it is sometimes softened, and very different from Spanish j /x/.', 'word', 'jam, jalan, jumpa', 'Hour/clock, road/walk, meet.', null, [ACT.alphabet]),
    createContentItem('K k', 'ka', 'Pronounced /k/ at start and middle; at the END of a word in Malaysian speech, it becomes a glottal stop [ʔ]: "tidak" → /ti.daʔ/, "anak" → /a.naʔ/. This is much stronger in MY than ID.', 'word', 'kucing, kereta, tidak', 'Cat, car, no/not — note the glottal-stop ending in "tidak".', null, [ACT.alphabet]),
    createContentItem('L l', 'él', 'Pronounced /l/ — clear /l/ at the start of a syllable, sometimes slightly darker before back vowels.', 'word', 'lima, lapan, laut', 'Five, eight, sea.', null, [ACT.alphabet]),
    createContentItem('M m', 'ém', 'Pronounced /m/. Very high frequency word-initially because of the prefix me-.', 'word', 'mata, makan, minum', 'Eye, eat, drink.', null, [ACT.alphabet]),
    createContentItem('N n', 'én', 'Pronounced /n/. At end of word stays /n/; do not let it nasalize the preceding vowel.', 'word', 'nasi, nama, nanti', 'Rice (cooked), name, later.', null, [ACT.alphabet]),
    createContentItem('O o', 'o', 'Pronounced /o/ — clean rounded back-mid vowel, like Spanish "o".', 'word', 'orang, otak, oren', 'Person, brain, orange (color and fruit).', null, [ACT.alphabet]),
    createContentItem('P p', 'pé', 'Pronounced /p/. Final -p is unreleased in MY: "cakap" /tʃa.kapˀ/, "tetap" /tə.tapˀ/.', 'word', 'pagi, polis, perempuan', 'Morning, police, woman.', null, [ACT.alphabet]),
    createContentItem('Q q', 'ku', 'Almost exclusively in Arabic religious loans: "Quran", "qari" (reciter). Pronounced /q/ or /k/ depending on speaker piety/exposure.', 'word', 'Quran, qari, qiamat', 'The Quran, reciter, the Last Day.', null, [ACT.alphabet]),
    createContentItem('R r', 'ér', 'CRITICAL Malaysian feature: r is rolled or tapped (like Spanish), not the English approximant. Malaysian speakers roll it more consistently than Singaporean Malay speakers, and far more than English-influenced KL teen speech.', 'word', 'raja, rumah, rakyat', 'King, house, the people (citizens).', null, [ACT.alphabet]),
    createContentItem('S s', 'és', 'Pronounced /s/ — never /z/ between vowels (unlike English). "rasa" /ra.sa/, not */ra.za/.', 'word', 'satu, suka, susah', 'One, like, difficult.', null, [ACT.alphabet]),
    createContentItem('T t', 'té', 'Pronounced /t/. Final -t in MY is unreleased: "lambat" /lam.batˀ/.', 'word', 'tiga, terima, tidur', 'Three, receive/accept, sleep.', null, [ACT.alphabet]),
    createContentItem('U u', 'u', 'Pronounced /u/ — clean rounded back-close vowel.', 'word', 'umur, untuk, ular', 'Age, for/in order to, snake.', null, [ACT.alphabet]),
    createContentItem('V v', 'vé', 'Loan letter — used in English-origin words: "van", "visa", "video". Often pronounced /v/ or /f/ depending on speaker.', 'word', 'van, visa, video', 'Three high-frequency English loans with v.', null, [ACT.alphabet]),
    createContentItem('W w', 'wé', 'Pronounced /w/ — used native (wang "money") and in loans (waktu "time", from Arabic).', 'word', 'wang, waktu, warna', 'Money, time, color.', null, [ACT.alphabet]),
    createContentItem('X x', 'éks', 'Very rare — only in scientific/borrowed terms: "x-ray", "Xerox". Native words never use x.', 'word', 'x-ray, sinar-X', 'X-ray, X-ray (same meaning, two spellings).', null, [ACT.alphabet]),
    createContentItem('Y y', 'yé', 'Pronounced /j/ (English "y" sound). Used at start of syllable: "ya" (yes), "yang" (relative pronoun).', 'word', 'ya, yang, yakin', 'Yes, which/that, sure/confident.', null, [ACT.alphabet]),
    createContentItem('Z z', 'zét', 'Loan letter, mainly Arabic-origin names and loans. "zaman" (era), "Zainab" (female name).', 'word', 'zaman, zakat, Zainab', 'Era, religious alms, common female name.', null, [ACT.alphabet]),

    // Activity 3 — Vowels
    createContentItem('a /a/', 'a', 'A clean open vowel — like Spanish "a" or the "a" in English "father", but always SHORT. Never reduces to schwa, even in unstressed positions.', 'word', 'apa, ada, mata, kata', 'What, exist, eye, word — four words anchoring the /a/ sound.', null, [ACT.vowels]),
    createContentItem('i /i/', 'i', 'A clean close-front vowel — like Spanish or French "i". Same value at start, middle, and end of a word.', 'word', 'ini, itu, gigi, lari', 'This, that, tooth, run.', null, [ACT.vowels]),
    createContentItem('u /u/', 'u', 'A clean close-back rounded vowel.', 'word', 'untuk, susu, ibu, baru', 'For, milk, mother, new.', null, [ACT.vowels]),
    createContentItem('o /o/', 'o', 'A clean mid-back rounded vowel. Less frequent in native words than a/i/u/e.', 'word', 'orang, kotak, roti, soto', 'Person, box, bread, a clear soup dish.', null, [ACT.vowels]),
    createContentItem('e /e/ (e taling)', 'e', 'The "full" e — a mid-front vowel like Spanish or French "e". Appears in fewer but high-value words and contrasts with the schwa /ə/.', 'word', 'meja, peta, sate, petang', 'Table, map, satay, late afternoon.', null, [ACT.vowels]),
    createContentItem('e /ə/ (e pepet, the schwa)', 'ə', 'The "soft" e — a central unstressed vowel, the single most common vowel in Malay. Written with the same letter "e" as /e/, so context tells you which is which.', 'word', 'emak, kerja, sebab, terima', 'Mother (casual), work, reason, receive — four classic schwa examples.', null, [ACT.vowels]),

    // Activity 4 — Schwa deep dive
    createContentItem('e pepet vs e taling', 'ə vs e', 'BM\'s biggest pronunciation puzzle: same letter, two sounds. As a rule of thumb, /e/ (taling) appears in stressed open syllables of loanwords (meja, sate), while /ə/ (pepet) is the default in unstressed positions and in many prefixes/suffixes (me-, ke-, -kan, -lah).', 'sentence', 'perang /pə.raŋ/ "war" vs perang /pe.raŋ/ "brown"; serong /sə.rɔŋ/ "slanted" vs serong rare.', 'A handful of homograph pairs hinge on this distinction; a dictionary marks them with é for the full vowel.', [
      { target: 'perang (war)', note: 'with schwa /ə/; the unmarked everyday pronunciation' },
      { target: 'pérang (brown color)', note: 'with /e/; some dictionaries mark it pérang with an accent' },
    ], [ACT.schwa]),
    createContentItem('me- prefix', 'mə-', 'The most common Malay verbal prefix me- is ALWAYS pronounced /mə-/ with a schwa. So "membaca" (to read) is /məm.ba.tʃa/, never */mem.ba.tʃa/.', 'word', 'membaca, menulis, mengajar', 'To read, to write, to teach — all start with /mə-/.', null, [ACT.schwa]),
    createContentItem('ber- prefix', 'bər-', 'The other major prefix ber- (forming intransitive verbs) is also /bər-/ with schwa: berjalan /bər.dʒa.lan/ "walk", berkata /bər.ka.ta/ "say".', 'word', 'berjalan, berkata, berbahasa', 'Walk, say, speak (a language).', null, [ACT.schwa]),
    createContentItem('-kan suffix', '-kan', 'The transitive suffix -kan, attached to a verb stem, is pronounced /-kan/ (NOT /-kən/) — the final syllable stays full /a/. "berikan" /bə.ri.kan/ "give to".', 'word', 'berikan, lakukan, jelaskan', 'Give to, do (to/for someone), explain.', null, [ACT.schwa]),

    // Activity 5 — Consonants
    createContentItem('c /tʃ/', 'tʃ', 'Always /tʃ/, no exceptions. The letter c never makes /k/ or /s/ in BM.', 'word', 'cinta, cuba, cuci', 'Love, try, wash.', null, [ACT.consonants]),
    createContentItem('j /dʒ/', 'dʒ', 'Always /dʒ/ like English "judge". The MY pronunciation is firm and consonant-like; ID often softens it.', 'word', 'jaga, jumpa, jangan', 'Take care of, meet, don\'t.', null, [ACT.consonants]),
    createContentItem('r rolled', 'r (tapped/trilled)', 'Malaysian r is a clear tap or trill — distinctly NOT the English approximant. Hearing the rolled r is one of the easiest ways to identify a Malaysian (vs Singaporean or English-influenced) speaker.', 'word', 'raya, ramai, lari', 'Big celebration, many people, run — all anchor the rolled r.', null, [ACT.consonants]),
    createContentItem('final glottal stop -k/-p/-t', 'ʔ / unreleased', 'Most final stops in MY are unreleased or become glottal stops: "tidak" → [ti.daʔ], "cakap" → [tʃa.kapˀ], "lambat" → [lam.batˀ]. This is much more pronounced in MY than ID.', 'word', 'tidak, cakap, lambat, sedap', 'No, speak, late/slow, delicious — four examples of the unreleased-final pattern.', null, [ACT.consonants]),

    // Activity 6 — Digraphs
    createContentItem('ng /ŋ/', 'ŋ', 'A single phoneme — the velar nasal, same as the "ng" in English "sing". Can appear at the start of a word in Malay: "ngeri" /ŋə.ri/ "scary".', 'word', 'ngeri, hingga, tangan', 'Scary, until, hand.', null, [ACT.digraphs]),
    createContentItem('ny /ɲ/', 'ɲ', 'A single palatal nasal, like Spanish "ñ" or Italian "gn". "nyanyi" /ɲa.ɲi/ "sing", "tanya" /ta.ɲa/ "ask".', 'word', 'nyanyi, tanya, banyak', 'Sing, ask, many.', null, [ACT.digraphs]),
    createContentItem('sy /ʃ/', 'ʃ', 'A loan digraph from Arabic — the "sh" sound. Mostly in Arabic-origin words: "syarikat" (company), "masyarakat" (society), "syukur" (gratitude).', 'word', 'syarikat, masyarakat, syukur', 'Company, society, gratitude (religious).', null, [ACT.digraphs]),
    createContentItem('kh /x/ or /k/', 'x', 'Loan digraph for Arabic /x/ (the German "ch" sound). Many speakers simplify to /k/: "khabar" /xa.bar/ or /ka.bar/ "news".', 'word', 'khabar, khusus, akhir', 'News, special, end.', null, [ACT.digraphs]),
    createContentItem('gh /ɣ/ or /g/', 'ɣ', 'Loan digraph for Arabic /ɣ/ (voiced velar fricative). Most speakers simplify to /g/: "ghaib" /ɣaib/ or /gaib/ "unseen", "Maghrib" /maɣ.rib/ "sunset prayer".', 'word', 'ghaib, Maghrib, ghairah', 'Unseen, sunset prayer, passion.', null, [ACT.digraphs]),

    // Activity 7 — Syllables
    createContentItem('CV pattern', 'CV', 'The default Malay syllable: one consonant + one vowel. Most native words can be parsed this way: ma-kan, sa-ya, ka-mu, ru-mah.', 'word', 'ma-kan, sa-ya, ka-mu, ru-mah', 'Eat, I, you, house.', null, [ACT.syllables]),
    createContentItem('CVC pattern', 'CVC', 'The other native pattern: closed syllable. Common in second/last syllable: ma-kan (the -kan is CVC), pe-nat (CV-CVC).', 'word', 'pe-nat, lam-bat, pen-deh, ti-dur', 'Tired, late, short, sleep.', null, [ACT.syllables]),
    createContentItem('no native clusters', 'no CC-', 'No native Malay word starts with two consonants. Words like "strategi", "skim", "psikologi" are loans, and Malaysians often insert a schwa: /sə.tə.ra.te.gi/.', 'word', 'strategi, skema, psikologi', 'Strategy, schema, psychology — all loans.', null, [ACT.syllables]),

    // Activity 8 — Stress
    createContentItem('penultimate stress', 'tekanan penultimat', 'Default stress rule: the second-from-last syllable. saYA, maKAN, ruMAH, sekoLAH, terima KAsih.', 'sentence', 'saYA, maKAN, ruMAH, sekoLAH', 'Four examples — each marks the stressed syllable in caps.', null, [ACT.stress]),
    createContentItem('schwa shifts stress', 'schwa → ultima', 'If the penultimate vowel is a schwa, stress shifts to the FINAL syllable: be-laJAR, ke-LUAR, ber-saMA.', 'sentence', 'beLAJAR, keLUAR, berSAMA', 'Three examples where the penultimate schwa pushes stress to the last syllable.', null, [ACT.stress]),
    createContentItem('overall flat rhythm', 'irama mendatar', 'Compared to English, BM stress is LIGHT — the rhythm is closer to syllable-timed than stress-timed. Each syllable gets roughly equal length, and "stress" is a tiny pitch lift, not a heavy emphasis.', 'sentence', 'Compare English "BANANA" (heavy 2nd syllable) with BM "piSANG" (light 2nd syllable).', 'Banana vs piSANG — both stress the penultimate, but the English version reduces the other syllables, while BM keeps them full.', null, [ACT.stress]),

    // Activity 9 — Loanwords
    createContentItem('Sanskrit loans', 'pinjaman Sanskrit', 'Sanskrit gave Malay its abstract vocabulary 1500 years ago: bahasa (language), dunia (world), raja (king), agama (religion), guru (teacher), suami (husband).', 'word', 'bahasa, dunia, raja, agama, guru', 'Language, world, king, religion, teacher — five core Sanskrit-derived words.', null, [ACT.loanwords]),
    createContentItem('Arabic loans', 'pinjaman Arab', 'Arabic arrived with Islam in the 13th century: kitab (book), masjid (mosque), doa (prayer), ilmu (knowledge), waktu (time), salam (peace).', 'word', 'kitab, masjid, doa, ilmu, waktu', 'Book, mosque, prayer, knowledge, time.', null, [ACT.loanwords]),
    createContentItem('Portuguese loans', 'pinjaman Portugis', 'Portuguese ruled Melaka 1511-1641, leaving: gereja (church), bendera (flag), almari (cupboard), mentega (butter), garpu (fork).', 'word', 'gereja, bendera, almari, mentega', 'Church, flag, cupboard, butter — four Portuguese-origin words still in daily MY use.', null, [ACT.loanwords]),
    createContentItem('English loans (MY favors English)', 'pinjaman Inggeris', 'British rule (1786-1957) and modern English dominance mean MY uses MANY more English loans than ID. MY: lif (lift), polis (police), basikal (bicycle), komputer, telefon, restoran.', 'word', 'lif, polis, basikal, komputer', 'Lift (elevator), police, bicycle, computer — note MY spelling adapts to pronunciation.', null, [ACT.loanwords]),
    createContentItem('Chinese loans (Hokkien-heavy)', 'pinjaman Cina', 'Centuries of Chinese (mostly Hokkien) trade and settlement gave: teh (tea), mi (noodles), kongsi (share / Chinese association), tauke (boss), bihun (rice vermicelli).', 'word', 'teh, mi, kongsi, tauke', 'Tea, noodles, share/association, boss.', null, [ACT.loanwords]),
    createContentItem('Tamil loans', 'pinjaman Tamil', 'Tamil traders and later plantation labor gave: mangga (mango), kapal (ship), tandil (foreman), kuli (laborer), kari (curry, via Tamil "kari").', 'word', 'mangga, kapal, kari, kuli', 'Mango, ship, curry, laborer.', null, [ACT.loanwords]),

    // Activity 10 — Jawi
    createContentItem('Jawi origin', 'asal usul Jawi', 'Jawi script developed from Arabic in the 14th century to write Malay, adding letters for Malay-only sounds: ca چ, nga ڠ, nya ڽ, pa ڤ, ga ݢ, va ۏ.', 'word', 'Jawi: مليسيا (Malaysia), كوالا لومڤور (Kuala Lumpur)', 'Two place names in Jawi — you will see these on civic monuments, postage stamps, and government building signs.', null, [ACT.jawi]),
    createContentItem('Jawi today', 'Jawi hari ini', 'Jawi is co-official in Kelantan and Terengganu (used on state government buildings and street signs), mandatory in Pendidikan Islam classes nationwide, and ceremonial in royal documents (titah Sultan).', 'word', 'سلامت داتڠ (Selamat Datang)', '"Welcome" in Jawi — you will see this at KLIA airport, on Petronas signage, and at hotel entrances.', null, [ACT.jawi]),
    createContentItem('Jawi vs Rumi division of labor', 'Jawi vs Rumi', 'Today Rumi handles 99% of writing (newspapers, school, government, internet). Jawi survives in: (1) mosque signage, (2) religious texts, (3) royal proclamations, (4) cultural calligraphy. As a beginner you only need Rumi.', 'word', 'Jawi: ٱللَّٰه (Allah)', 'The most universally recognized Jawi/Arabic-origin word in Malaysia.', null, [ACT.jawi]),

    // Activity 11 — MS vs ID
    createContentItem('MY pejabat vs ID kantor', 'pə.dʒa.bat vs kan.tor', 'OFFICE — MY uses "pejabat" (Arabic-derived); ID uses "kantor" (Dutch loanword from Portuguese "contador").', 'sentence', 'MY: Saya bekerja di pejabat. / ID: Saya bekerja di kantor.', '"I work at the office." — identical sentence frame, one diagnostic word.', null, [ACT.msVsId]),
    createContentItem('MY kereta vs ID mobil', 'kə.re.ta vs mo.bil', 'CAR — MY "kereta" (from Portuguese "carreta"); ID "mobil" (from English "mobile" → Dutch "auto", later "mobil"). One of the clearest divergences.', 'sentence', 'MY: Saya pandu kereta. / ID: Saya menyetir mobil.', '"I drive a car." — note also MY "pandu" vs ID "menyetir/nyetir".', null, [ACT.msVsId]),
    createContentItem('MY bilik vs ID kamar', 'bi.lik vs ka.mar', 'ROOM — MY "bilik"; ID "kamar". MY "bilik" is the regular word for any room; ID uses "ruangan" or "kamar".', 'sentence', 'MY: Bilik saya kecil. / ID: Kamar saya kecil.', '"My room is small."', null, [ACT.msVsId]),
    createContentItem('MY duit vs ID uang', 'du.it vs u.aŋ', 'MONEY — MY "duit" (from Dutch "duit", coin); ID "uang" (native) or "duit" (casual). Both languages know both words but the unmarked everyday choice differs.', 'sentence', 'MY: Saya tiada duit. / ID: Saya tidak punya uang.', '"I don\'t have money."', null, [ACT.msVsId]),
    createContentItem('MY kerana vs ID karena', 'kə.ra.na vs ka.re.na', 'BECAUSE — MY spells "kerana" with schwa; ID spells "karena" with full a. Same Sanskrit origin (kāraṇa), two national standards.', 'sentence', 'MY: Saya datang kerana awak. / ID: Saya datang karena kamu.', '"I came because of you." — note also MY "awak" vs ID "kamu" (both = "you-casual").', null, [ACT.msVsId]),
    createContentItem('MY lif vs ID lift', 'lif vs lift', 'ELEVATOR — MY spells "lif" (adapted to native phonotactics with no final cluster); ID writes "lift" (closer to English). Same Konglish origin, different spelling rule.', 'sentence', 'MY: Naik lif ke tingkat lima. / ID: Naik lift ke lantai lima.', '"Take the lift to the fifth floor." — also note MY tingkat vs ID lantai.', null, [ACT.msVsId]),

    // Activity 12 — Reading practice
    createContentItem('Selamat pagi! Saya seorang pelajar.', 'sə.la.mat pa.gi sa.ja sə.o.raŋ pə.la.dʒar', 'Read aloud with: schwa in se-lamat, schwa in se-orang, schwa in pe-lajar, rolled r, unreleased final -t.', 'sentence', 'Selamat pagi! Saya seorang pelajar di Universiti Malaya, dan saya tinggal di Kuala Lumpur.', 'Full reading-practice sentence: every digraph (ng in tinggal), every schwa (se-, pe-, in dan), every full vowel, every glottal-stop final all in play. This is the target you should hit by the end of Foundation.', [
      { target: 'Selamat pagi', note: 'opens with two schwas in "Selamat", then full vowels in "pagi"' },
      { target: 'pelajar', note: 'schwa in pe-, then /la/, then /dʒar/ with rolled r' },
      { target: 'Universiti Malaya', note: 'English-loan "universiti" pronounced with native vowels; "Malaya" with three clean /a/' },
      { target: 'Kuala Lumpur', note: 'capital city — KL — clean open vowels, rolled r in lumpur, final -r tapped' },
    ], [ACT.reading]),
    createContentItem('Apa khabar?', 'a.pa xa.bar', 'The classic greeting question. Notice the loan digraph kh, the rolled r, and the rising intonation at the end.', 'sentence', 'A: Apa khabar? B: Khabar baik, terima kasih.', '"How are you? — I\'m well, thank you." — the universal Malaysian opener.', null, [ACT.reading]),
    createContentItem('Saya tinggal di Kuala Lumpur.', 'sa.ja tiŋ.gal di kua.la lum.pur', 'Note the /ŋg/ cluster in "tinggal" (ng + g), the rolled final r in "Lumpur", and penultimate stress on saYA, tingGAL, lumPUR.', 'sentence', 'Saya tinggal di Kuala Lumpur sejak tahun 2020.', '"I have been living in KL since 2020." — typical biographical sentence.', null, [ACT.reading]),
  ],
};

module.exports = level1Foundation;
