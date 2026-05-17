// Level 1 — Foundation: Hindi Devanagari & Sound System
// First lesson on the Hindi / Foundation track. Pre-grammar, pre-vocabulary.
// Covers the Devanagari script (vowels, consonants, conjuncts), the aspirated
// vs unaspirated stop contrast, the retroflex vs dental contrast, nasalized
// vowels (chandrabindu / anusvara), schwa deletion, gemination, and the basic
// reading rules a learner needs to sound out written Hindi.
//
// All content is authored with Devanagari (target) + IAST/simplified
// romanization + English glosses (canonical source). The AI conversation
// tutor reads this curriculum and delivers it to each learner in their
// preferred native language at runtime — never assume a specific L1 in this
// file.
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
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  intro: 'hi-foundation-intro',
  vowels: 'hi-foundation-vowels',
  consonantsUnaspirated: 'hi-foundation-consonants-unaspirated',
  consonantsAspirated: 'hi-foundation-consonants-aspirated',
  retroflexDental: 'hi-foundation-retroflex-dental',
  nasals: 'hi-foundation-nasals',
  sibilants: 'hi-foundation-sibilants',
  schwaDeletion: 'hi-foundation-schwa-deletion',
  conjuncts: 'hi-foundation-conjuncts',
  punctuation: 'hi-foundation-punctuation',
  reading: 'hi-foundation-reading-practice',
};

const activities = [
  {
    id: ACT.intro,
    section: 'Why Devanagari & Sounds',
    title: 'देवनागरी परिचय — How Hindi is written and pronounced',
    goals: [
      'Understand that Devanagari is an abugida: each consonant carries an inherent "a" vowel unless modified by a vowel sign (matra) or a halant (्) virama.',
      'Know that Hindi has phonemic contrasts (aspiration, retroflex vs dental, nasalization) that English does not — and that ignoring them changes meaning.',
      'See that every Hindi syllable is built from consonant + vowel-matra + optional nasalization, and that conjuncts (joined consonants) handle consonant clusters.',
    ],
    task: 'By the end of this lesson you should be able to read a Devanagari word aloud, identify the consonants and vowel signs, and know whether the final schwa is deleted.',
  },
  {
    id: ACT.vowels,
    section: 'Vowels',
    title: 'स्वर — The 11 vowels and their matras',
    goals: [
      'Master the 11 Hindi vowels (अ आ इ ई उ ऊ ऋ ए ऐ ओ औ) and their matra (diacritic) forms used after consonants.',
      'Distinguish short vs long vowel pairs (इ/ई, उ/ऊ) — pair length is phonemic and changes word meaning.',
      'Recognize that the inherent vowel "a" (schwa) of every consonant is unwritten — कमल reads as "kamal" not "kamala" thanks to schwa deletion.',
    ],
    task: 'Read each vowel in independent form and in matra form attached to क (ka). Notice which vowels sit above, below, before, or after the consonant.',
  },
  {
    id: ACT.consonantsUnaspirated,
    section: 'Consonants I',
    title: 'अनप्राण व्यंजन — Unaspirated stops and the five varga rows',
    goals: [
      'Read the five unaspirated voiceless stops क च ट त प (ka cha Ta ta pa) and their voiced counterparts ग ज ड द ब (ga ja Da da ba).',
      'Recognize that Hindi consonants are organized in vargas (rows) by place of articulation — velar, palatal, retroflex, dental, labial — and each row has 5 consonants.',
      'Know that क is pronounced like English "k" but without the puff of air English speakers naturally produce — that puff belongs to ख (kha), a different phoneme.',
    ],
    task: 'Practice each consonant with the inherent "a": क ka, ख kha, ग ga, घ gha — feel the difference between aspirated and unaspirated even when transliteration looks similar.',
  },
  {
    id: ACT.consonantsAspirated,
    section: 'Consonants II',
    title: 'महाप्राण व्यंजन — The aspirated contrast (PHONEMIC)',
    goals: [
      'Distinguish unaspirated क ka from aspirated ख kha by feeling the puff of air on the back of your hand — minimal pairs like कान (kaan, "ear") vs खान (khaan, "mine/quarry") rely on this single feature.',
      'Master four aspirated/unaspirated minimal pairs: क/ख, ग/घ, च/छ, ज/झ, ट/ठ, ड/ढ, त/थ, द/ध, प/फ, ब/भ. Each pair is two different phonemes, not stylistic variants.',
      'Notice that voiced aspirates (घ gha, झ jha, ढ Dha, ध dha, भ bha) are rare in world languages — they have breathy voicing not found in English.',
    ],
    task: 'Read the minimal pair list aloud: कान vs खान, गोल vs घोल, टीक vs ठीक, तार vs थार, पल vs फल, बाल vs भाल. If a native speaker can\'t distinguish the words you say, the aspiration is missing.',
  },
  {
    id: ACT.retroflexDental,
    section: 'Consonants III',
    title: 'मूर्धन्य बनाम दन्त्य — Retroflex vs dental (PHONEMIC)',
    goals: [
      'Distinguish retroflex ट ठ ड ढ ण (the tongue curls back, tip touches behind the alveolar ridge) from dental त थ द ध न (the tongue tip touches the back of the upper front teeth).',
      'Recognize that English "t" and "d" land between Hindi retroflex and dental — neither matches. To English speakers, dental sounds "softer" and retroflex sounds "sharper".',
      'Master minimal pairs: टाल (Taal, "to postpone") vs ताल (taal, "rhythm/beat"); डाल (Daal, "branch") vs दाल (daal, "lentils"). Mixing them up changes meaning.',
    ],
    task: 'Place a fingertip on the roof of your mouth, then slide it back; the dental t/d are at the teeth, retroflex T/D are well behind that ridge. Practice on minimal pairs.',
  },
  {
    id: ACT.nasals,
    section: 'Nasals & Nasalization',
    title: 'नासिक्य — Nasal consonants, anusvara, and chandrabindu',
    goals: [
      'Read the five nasal consonants ङ ञ ण न म and recognize that ङ/ञ rarely appear in modern Hindi (they survive mostly in Sanskrit-derived spellings).',
      'Use the anusvara (ं, a dot above the line) to mark a nasal consonant that assimilates to the following stop: हिंदी = हिन्दी (hindii), अंक = अंक (ank).',
      'Use chandrabindu (ँ, dot under moon) to mark NASALIZED VOWELS — distinct from anusvara. हाँ (haaN, "yes") has a nasalized "aa", not an "n" sound.',
    ],
    task: 'Read three pairs and identify which carries anusvara (consonantal n/m) vs chandrabindu (vowel nasalization): हंस vs हँस, मैं vs मन, गाँव vs गांव.',
  },
  {
    id: ACT.sibilants,
    section: 'Sibilants & Affricates',
    title: 'सङ्घर्षी — स, श, ष, ह — three sibilants and the glottal',
    goals: [
      'Distinguish स (sa, alveolar like English "s") from श (sha, palato-alveolar like English "sh") — स्कूल (skuul, "school") vs शुक्र (shukra, "Friday/Venus").',
      'Know that ष (Sha, retroflex sh) appears mostly in Sanskrit-origin words and is pronounced identically to श by most Hindi speakers in everyday speech.',
      'Read ह as a clear breathy "h" — never silent, unlike English "honor" or "hour".',
    ],
    task: 'Read each: सच (sach, "truth"), शक (shak, "doubt"), विशेष (visheSh, "special"), हाथ (haath, "hand"). Notice the s/sh distinction is phonemic.',
  },
  {
    id: ACT.schwaDeletion,
    section: 'Schwa Deletion',
    title: 'अ-लोप — Why कमल is "kamal" not "kamala"',
    goals: [
      'Recognize that the inherent vowel "a" (schwa) is DELETED at the end of most Hindi words: कमल reads as "kamal", not "kamala"; नमस्ते reads as "namaste" not "namastey".',
      'Apply the medial schwa deletion rule: when a word has the pattern CaCaCa, the middle "a" often drops in pronunciation. समझ is "samajh" not "samajha"; धरम is "dharam" not "dharama".',
      'Know that schwa deletion is the single biggest pronunciation gap between Devanagari spelling and Hindi pronunciation — Sanskrit-origin spellings show every "a" but Hindi drops them.',
    ],
    task: 'For each word, mark which final or medial "a" is deleted: कमल, सरल, धरम, नमस्ते, मन्दिर. Read each aloud the natural Hindi way, not the literal Devanagari way.',
  },
  {
    id: ACT.conjuncts,
    section: 'Conjuncts',
    title: 'संयुक्त अक्षर — Joined consonants and the halant',
    goals: [
      'Read common conjuncts where two consonants merge: क्ष (k+Sh = ksh), त्र (t+r = tr), ज्ञ (j+ny = gya in modern Hindi), श्र (sh+r = shr).',
      'Use the halant (virama, ्) under a consonant to suppress the inherent "a", allowing two consonants to be pronounced consecutively without a vowel between them.',
      'Recognize the special r-shapes: रेफ (the curl on top, as in धर्म "dharm" — r before a consonant) and ्र (the slanted line below, as in प्रेम "prem" — r after a consonant).',
    ],
    task: 'Identify the conjunct in each word and read aloud: क्षमा (kshamaa, "forgiveness"), ज्ञान (gyaan, "knowledge"), धर्म (dharm, "duty/religion"), प्रेम (prem, "love"), विद्या (vidyaa, "knowledge").',
  },
  {
    id: ACT.punctuation,
    section: 'Punctuation',
    title: 'विराम चिह्न — Hindi punctuation and the danda',
    goals: [
      'Use the danda (।) as the Hindi full stop instead of the Western period. हम भारत में हैं। ("We are in India.")',
      'Recognize that Hindi uses Western comma, question mark, and exclamation but retains the danda for sentence end. The double danda (॥) marks verse or formal pause.',
      'Know that Hindi numerals (०१२३४५६७८९) exist alongside Western digits — most modern publications use Western digits except in formal/traditional contexts.',
    ],
    task: 'Punctuate this sentence stream correctly with a danda and a question mark: आप कैसे हैं मैं ठीक हूँ',
  },
  {
    id: ACT.reading,
    section: 'Reading Practice',
    title: 'पठन अभ्यास — Read your first words aloud',
    goals: [
      'Read 8 high-frequency words aloud with correct aspiration, retroflex/dental contrast, and schwa deletion.',
      'Match each Devanagari word with its IAST romanization and recognize the schwa-deletion pattern in each.',
    ],
    task: 'Read each word three times: नमस्ते, धन्यवाद, हाँ, नहीं, मैं, आप, घर, खाना. Self-check against the romanization in the breakdown.',
  },
];

const lesson = {
  title: 'Level 1 · Foundation: देवनागरी और हिन्दी ध्वनियाँ — Devanagari & the Hindi Sound System',
  category: 'foundation',
  difficulty: 'beginner',
  targetLang: 'hi',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'foundation',
  activities,
  expressionPractice: [],
  relatedPools: ['topic-script', 'topic-pronunciation'],
  content: [
    // Activity 1 — Intro
    createContentItem(
      'देवनागरी का आधार',
      'devanaagarii kaa aadhaar',
      'Devanagari is an abugida — a writing system where each consonant carries an inherent vowel "a" (schwa) unless a vowel sign (matra) or a halant (्) modifies it. Read left to right; a horizontal "head line" (शिरोरेखा shirorekhaa) connects letters within a word.',
      'word',
      'क ka · की kii · के ke · क् k (with halant suppressing inherent a)',
      'Same क-shape, four different sound values — that\'s the abugida principle at work.',
      [
        { target: 'क ka', note: 'consonant alone reads with inherent "a" — the unwritten default vowel' },
        { target: 'की kii', note: 'consonant + ी matra (vertical line after) reads with long "ii"' },
        { target: 'के ke', note: 'consonant + े matra (curl above) reads with "e"' },
        { target: 'क् k', note: 'consonant + ्  halant suppresses the inherent "a" entirely' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'शिरोरेखा',
      'shirorekhaa',
      'The horizontal line drawn across the top of letters that joins them into a word. It is part of the script\'s identity — without it the letters look isolated and "broken" to a Hindi reader. The line is drawn LAST when handwriting a word.',
      'word',
      'भारत bhaarat (India) — the four letters भ-ा-र-त share one continuous head line.',
      'Compare: ब, ह, र, त (no head line, disconnected) vs भारत (one connected word). The line signals "these letters form one word".',
      null,
      [ACT.intro],
    ),
    createContentItem(
      'तीन भेद',
      'tiin bhed',
      'Hindi phonology has three contrast systems that English does not: (1) aspirated vs unaspirated stops (क/ख), (2) retroflex vs dental (ट/त), (3) nasalized vs oral vowels (हाँ/हा). Mastering these three contrasts is the difference between sounding Hindi and sounding foreign.',
      'word',
      'क ka / ख kha — same place, different aspiration\nट Ta / त ta — same aspiration, different place\nहा haa / हाँ haaN — same consonants, different vowel nasalization',
      'Each contrast is phonemic — change one feature, change the word.',
      [
        { target: 'aspiration', note: 'puff of air after the consonant; in IAST marked by "h"' },
        { target: 'retroflex', note: 'tongue tip curls back behind the alveolar ridge; marked by capital T/D/N in simplified roman' },
        { target: 'nasalization', note: 'air flows through the nose during the vowel; marked by N in this guide and by chandrabindu ँ in Devanagari' },
      ],
      [ACT.intro],
    ),

    // Activity 2 — Vowels
    createContentItem('अ', 'a', 'Independent form of the short "a" vowel — the inherent vowel of every consonant. Pronounced like the "u" in English "cup" or the "a" in "about". Often dropped at the end of words (schwa deletion).', 'word', 'अब ab ("now") · अगर agar ("if")', 'The inherent vowel; when written alone (no consonant), it uses this independent shape.', null, [ACT.vowels]),
    createContentItem('आ', 'aa', 'Independent long "aa" — pronounced like the "a" in English "father" (twice as long as short अ). The matra form is ा (a vertical line after the consonant): का = k+aa.', 'word', 'आम aam ("mango") · आज aaj ("today")', 'Length is phonemic: अब ab ("now") vs आब aab ("water/luster") — totally different words.', [
      { target: 'आ (independent)', note: 'used at the start of a word' },
      { target: 'ा (matra)', note: 'used after a consonant to add the "aa" sound; the vertical line drops to the right' },
    ], [ACT.vowels]),
    createContentItem('इ / ई', 'i / ii', 'Short "i" (इ, like English "sit") vs long "ii" (ई, like English "see" but longer). The matras are ि (placed BEFORE the consonant visually but read AFTER) and ी (placed after). दिन (din) is short i; दीन (diin) is long ii.', 'word', 'दिन din ("day") vs दीन diin ("poor/wretched")', 'Same consonants, different vowel length, different word. इ matra is unusual: it sits before but sounds after — pure visual artifact.', [
      { target: 'इ ि (short i)', note: 'always written BEFORE the consonant but pronounced AFTER it' },
      { target: 'ई ी (long ii)', note: 'written and pronounced after the consonant' },
    ], [ACT.vowels]),
    createContentItem('उ / ऊ', 'u / uu', 'Short "u" (उ, like English "put") vs long "uu" (ऊ, like English "boot"). The matras ु and ू attach below the consonant. कुछ (kuch) is short u; कूड़ा (kuuRaa) is long uu.', 'word', 'कुछ kuch ("something") vs कूकना kuukna ("to coo")', 'Length distinction works just like इ/ई. Both matras sit underneath the consonant.', null, [ACT.vowels]),
    createContentItem('ए / ऐ', 'e / ai', '"e" (ए, like the "e" in "bed" but pure, no off-glide) vs "ai" (ऐ, like the "a" in "cat" or in northern Hindi like English "eye"). Matras are े and ै, both sitting above the consonant. The ऐ vowel varies regionally — eastern dialects tend to keep diphthong "ai", western/Delhi pronounce more like "æ".', 'word', 'मेरा meraa ("my, masculine") vs मैं maiN ("I")', 'These are NOT length pairs — they\'re different qualities. ऐ is not "long e".', null, [ACT.vowels]),
    createContentItem('ओ / औ', 'o / au', '"o" (ओ, like the "o" in "go" but pure, no glide) vs "au" (औ, like the "ou" in "thought" or the "aw" in "law"). Matras are ो and ौ, both attached to the right of the consonant with a curve over the top.', 'word', 'सोना sonaa ("to sleep / gold") vs सौ sau ("hundred")', 'Like ए/ऐ, these are quality pairs, not length pairs.', null, [ACT.vowels]),
    createContentItem('ऋ', 'Ri', 'A vocalic "r" inherited from Sanskrit, pronounced "ri" in modern Hindi (some speakers, in Sanskrit recitation, use a syllabic r). Appears only in Sanskrit-derived vocabulary. The matra is ृ attached below the consonant.', 'word', 'कृपया kRipayaa ("please") · ऋषि RiShi ("sage")', 'Rare in everyday spoken Hindi; common in formal/literary register. Modern speakers pronounce as "ri".', null, [ACT.vowels]),
    createContentItem('मात्रा सारणी', 'maatraa saaraNii', 'Vowel signs (matras) attached to consonant क ka, showing the full vowel range. Notice that ि sits before the consonant (visually) but reads after, while all other matras sit around the consonant in their natural reading order.', 'sentence', 'क ka · का kaa · कि ki · की kii · कु ku · कू kuu · के ke · कै kai · को ko · कौ kau · कृ kRi', 'Memorize this row — every consonant uses the same matra shapes. Once you know these 10 forms, you can read any consonant + vowel combination.', [
      { target: 'क (no matra)', note: 'inherent vowel "a" — the default' },
      { target: 'का', note: 'long aa with ा after' },
      { target: 'कि / की', note: 'short i (before, but read after) / long ii (after)' },
      { target: 'कु / कू', note: 'short u / long uu — both attach below' },
      { target: 'के / कै', note: 'e / ai — both attach above' },
      { target: 'को / कौ', note: 'o / au — both attach to the right with hooks' },
    ], [ACT.vowels]),

    // Activity 3 — Unaspirated consonants
    createContentItem('क वर्ग', 'ka varga', 'The velar row (back of tongue against soft palate): क ka, ख kha, ग ga, घ gha, ङ Na. Same place of articulation across all five — what varies is aspiration (puff of air) and voicing.', 'sentence', 'क ka · ख kha · ग ga · घ gha · ङ Na', 'Five-letter row pattern: voiceless unaspirated, voiceless aspirated, voiced unaspirated, voiced aspirated, nasal. This pattern repeats across all 5 vargas.', [
      { target: 'क ka', note: 'voiceless unaspirated; English "k" but NO puff of air after' },
      { target: 'ग ga', note: 'voiceless... wait, "ga" is voiced; like English "g" in "go"' },
      { target: 'ङ Na', note: 'velar nasal like English "ng" in "sing"; rare in modern Hindi' },
    ], [ACT.consonantsUnaspirated]),
    createContentItem('च वर्ग', 'cha varga', 'The palatal row (tongue blade against hard palate): च cha, छ Chha, ज ja, झ jha, ञ Nya. The unaspirated च is like the English "ch" in "much" but with less aspiration; the aspirated छ has a strong puff.', 'sentence', 'च cha · छ Chha · ज ja · झ jha · ञ Nya', 'च is unaspirated "ch"; छ is aspirated "chh" — minimal pair चल "chal" (go) vs छल "Chhal" (deceit).', [
      { target: 'च cha', note: 'unaspirated ch; pronounced WITHOUT the puff that English "ch" has' },
      { target: 'छ Chha', note: 'aspirated ch with a strong puff' },
      { target: 'ज ja', note: 'voiced palatal like English "j" in "judge"' },
    ], [ACT.consonantsUnaspirated]),
    createContentItem('ट वर्ग', 'Ta varga', 'The retroflex row (tongue curls back, tip behind the alveolar ridge): ट Ta, ठ Tha, ड Da, ढ Dha, ण Na. These are the sounds that mark "Indian" pronunciation of English borrowings — टैक्सी "Taxi", डॉक्टर "DaakTar".', 'sentence', 'ट Ta · ठ Tha · ड Da · ढ Dha · ण Na', 'No close English equivalent — even English "t" and "d" are closer to dental त/द than to retroflex ट/ड.', [
      { target: 'ट Ta', note: 'unaspirated retroflex t; tongue tip curled WELL back' },
      { target: 'ण Na', note: 'retroflex n; rare in everyday Hindi, common in Sanskrit borrowings (गुण guN "quality")' },
    ], [ACT.consonantsUnaspirated]),
    createContentItem('त वर्ग', 'ta varga', 'The dental row (tongue tip against back of upper teeth): त ta, थ tha, द da, ध dha, न na. The unaspirated त is SOFTER than English "t" — tongue is forward, no puff.', 'sentence', 'त ta · थ tha · द da · ध dha · न na', 'A very common gloss confusion: English "t" feels closer to retroflex ट to Hindi ears, but to render English "t" sounds Hindi-natural, use dental त.', [
      { target: 'त ta', note: 'unaspirated dental t; tongue against teeth, no puff' },
      { target: 'द da', note: 'voiced dental d; tongue against teeth' },
      { target: 'न na', note: 'dental n — the default "n" in Hindi' },
    ], [ACT.consonantsUnaspirated]),
    createContentItem('प वर्ग', 'pa varga', 'The labial row (both lips): प pa, फ pha, ब ba, भ bha, म ma. प is unaspirated "p" without the puff English speakers add; फ is the aspirated counterpart with strong puff.', 'sentence', 'प pa · फ pha · ब ba · भ bha · म ma', 'फ in MODERN Hindi often represents "f" in foreign loanwords (फ़ोन phone) — context tells you which sound.', [
      { target: 'प pa', note: 'unaspirated p; like the "p" in English "spin" (after s, no puff)' },
      { target: 'फ pha / fa', note: 'aspirated p in native words; English "f" sound in loanwords (often written फ़ with a dot)' },
      { target: 'भ bha', note: 'voiced aspirate "bh" — breathy voicing not found in English' },
    ], [ACT.consonantsUnaspirated]),
    createContentItem('अन्य व्यंजन', 'anya vyanjan', 'Beyond the five vargas: य ya, र ra, ल la, व va/wa, श sha, ष Sha, स sa, ह ha. These are the semivowels, liquids, sibilants, and the glottal — used constantly in everyday Hindi.', 'sentence', 'य ya · र ra · ल la · व va · श sha · ष Sha · स sa · ह ha', 'व alternates between "v" and "w" depending on dialect and position; both are acceptable.', [
      { target: 'य ya', note: 'palatal semivowel; like English "y" in "yes"' },
      { target: 'र ra', note: 'alveolar tap; like Spanish "r" in "pero", not English "r"' },
      { target: 'व va/wa', note: 'labiodental; can sound like "v" or "w" — both correct' },
    ], [ACT.consonantsUnaspirated]),

    // Activity 4 — Aspiration
    createContentItem('अप्राण बनाम महाप्राण', 'apraaN banaam mahaapraaN', 'The aspiration contrast is the single most important feature for sounding native. EVERY voiceless stop has an aspirated partner — and every voiced stop also has an aspirated (breathy-voiced) partner. English does not have this contrast as a phonemic feature.', 'sentence', 'क/ख · च/छ · ट/ठ · त/थ · प/फ — voiceless pairs\nग/घ · ज/झ · ड/ढ · द/ध · ब/भ — voiced pairs', 'Hold your hand in front of your mouth: when you say ख kha or फ pha, you should feel a strong puff; क ka and प pa should produce almost no puff.', [
      { target: 'unaspirated क/ग', note: 'no puff of air; consonant releases cleanly' },
      { target: 'aspirated ख/घ', note: 'audible puff of air follows the release (voiced version is "breathy")' },
    ], [ACT.consonantsAspirated]),
    createContentItem('न्यूनतम जोड़े', 'nyuunatam joRe', 'Minimal pairs that prove aspiration is phonemic: कान (kaan, "ear") vs खान (khaan, "mine/quarry"); गोल (gol, "round") vs घोल (ghol, "solution"); पल (pal, "moment") vs फल (phal, "fruit"); बाल (baal, "hair") vs भाल (bhaal, "forehead").', 'sentence', 'कान vs खान · गोल vs घोल · पल vs फल · बाल vs भाल', 'If you cannot reliably distinguish these in your own speech, native listeners will misunderstand routinely.', [
      { target: 'कान kaan / खान khaan', note: '"ear" vs "mine" — single feature change' },
      { target: 'पल pal / फल phal', note: '"moment" vs "fruit" — common minimal pair drilled in school' },
      { target: 'बाल baal / भाल bhaal', note: 'voiced unaspirated vs voiced breathy — hardest contrast for English speakers' },
    ], [ACT.consonantsAspirated]),
    createContentItem('महाप्राण ध्वनि अभ्यास', 'mahaapraaN dhvani abhyaas', 'Drill the four aspirated voiceless consonants ख छ ठ थ फ with a syllable + vowel rhythm. Start each syllable with the puff, not at the vowel — the air should escape BEFORE the vowel begins.', 'sentence', 'खा kha · छो Chho · ठा Thaa · था thaa · फा phaa', 'In careful speech, the puff is audible across the room; in fast everyday speech, it\'s subtle but still distinguishable from unaspirated.', null, [ACT.consonantsAspirated]),
    createContentItem('स्वरयुक्त महाप्राण', 'svarayukt mahaapraaN', 'The voiced aspirates (घ झ ढ ध भ) carry "breathy voice" — voicing continues into the vowel with a husky, breathy quality. This sound does not exist in English at all and takes practice for non-Indic speakers.', 'sentence', 'घर ghar ("house") · झूठ jhuuTh ("lie") · ढाई Dhaaii ("two and a half") · धन्यवाद dhanyavaad ("thanks") · भारत bhaarat ("India")', 'You\'ll hear these every day — घर "ghar" alone is one of the most common words in Hindi.', [
      { target: 'breathy voice', note: 'vocal folds vibrate AND let extra air through simultaneously — the voiced equivalent of an aspirated consonant' },
    ], [ACT.consonantsAspirated]),

    // Activity 5 — Retroflex vs dental
    createContentItem('मूर्धन्य', 'muurdhanya', 'The retroflex series ट ठ ड ढ ण is articulated with the tongue tip curled back behind the alveolar ridge (where English "r" lives). The tongue actually touches the roof of the mouth WELL behind the teeth.', 'sentence', 'टमाटर TamaaTar ("tomato") · डाक Daak ("mail") · पटना PaTna ("Patna city") · ठीक Thiik ("OK/fine")', 'A clean retroflex sounds slightly "drum-like" to English ears — the curl gives it a hollow resonance.', null, [ACT.retroflexDental]),
    createContentItem('दन्त्य', 'dantya', 'The dental series त थ द ध न is articulated with the tongue tip pressed against the BACK of the upper front teeth — much further forward than English "t" and "d", which land on the alveolar ridge.', 'sentence', 'तीन tiin ("three") · दिन din ("day") · सात saat ("seven") · पता pataa ("address/clue")', 'To English speakers, dental Hindi consonants sound "soft" because the tongue is forward and there\'s no aspiration.', null, [ACT.retroflexDental]),
    createContentItem('रेट्रोफ्लेक्स बनाम दन्त्य न्यूनतम जोड़े', 'reTroflexus banaam dantya nyuunatam joRe', 'Mixing up retroflex and dental changes meaning. The pair टाल/ताल proves the contrast is phonemic: टाल (Taal) "to postpone" vs ताल (taal) "rhythm/beat". Similarly डाल (Daal, "branch") vs दाल (daal, "lentils").', 'sentence', 'टाल Taal vs ताल taal · डाल Daal vs दाल daal · ठीक Thiik vs थीक (rare/dialect)', 'दाल "daal" (lentils) is the food eaten daily; डाल "Daal" is the branch on a tree. Mixing them up creates real confusion at the dinner table.', [
      { target: 'retroflex (capital T/D/N)', note: 'tongue curls back; sounds "rolling" or "drum-like"' },
      { target: 'dental (lowercase t/d/n)', note: 'tongue at teeth; sounds "soft" or "light"' },
    ], [ACT.retroflexDental]),
    createContentItem('English loanwords', 'angrezii shabd', 'English "t" and "d" map to RETROFLEX in Hindi: टैक्सी (Taxi), डॉक्टर (DaakTar), टीवी (TiiVii). Hindi speakers hear English "t" as retroflex because English "t" is alveolar, not dental.', 'sentence', 'टैक्सी Taxi · डॉक्टर DaakTar · होटल hoTel · चॉकलेट chaakleT', 'When you transliterate ANY English word into Devanagari, default to retroflex for t/d/n.', null, [ACT.retroflexDental]),

    // Activity 6 — Nasals
    createContentItem('अनुस्वार', 'anusvaar', 'The anusvara ं (dot above the line) replaces a nasal consonant + halant before another consonant. हिंदी = हिन्दी (both spell the same word "hindii"). The exact pronunciation depends on the following consonant — it assimilates to its place of articulation.', 'sentence', 'हिंदी hindii ("Hindi") · अंक ank ("digit/grade") · संग sang ("with")', 'Modern publications prefer the anusvara form (हिंदी); classical/Sanskrit spellings keep the full conjunct (हिन्दी).', [
      { target: 'ं before क-वर्ग', note: 'sounds like ङ "ng" (अंक → ank ≈ "ank" with velar nasal)' },
      { target: 'ं before च-वर्ग', note: 'sounds like ञ "ny"' },
      { target: 'ं before ट-वर्ग', note: 'sounds like ण retroflex n' },
      { target: 'ं before त-वर्ग', note: 'sounds like न dental n' },
      { target: 'ं before प-वर्ग', note: 'sounds like म "m"' },
    ], [ACT.nasals]),
    createContentItem('चन्द्रबिन्दु', 'chandrabindu', 'The chandrabindu ँ (literally "moon-dot") marks a NASALIZED VOWEL — the vowel itself is nasalized, no nasal consonant. हाँ (haaN) is "yes" with nasalized "aa"; हा (haa) without it is just the letter "haa".', 'sentence', 'हाँ haaN ("yes") · नहीं nahiiN ("no") · गाँव gaaNv ("village")', 'In casual handwriting, chandrabindu often reduces to just a dot, making it visually identical to anusvara — context tells which is meant.', [
      { target: 'ं anusvara', note: 'CONSONANTAL nasal — adds an n/m/ng sound BEFORE the next consonant' },
      { target: 'ँ chandrabindu', note: 'VOWEL nasalization — the vowel itself is nasalized, no separate nasal sound' },
    ], [ACT.nasals]),
    createContentItem('नासिक्य व्यंजन', 'naasikya vyanjan', 'The five nasal consonants ङ ञ ण न म correspond to each varga. In modern Hindi, only न (dental) and म (labial) appear freely; the others survive mostly in conjuncts and Sanskrit borrowings.', 'sentence', 'मन man ("mind") · नाम naam ("name") · रंग rang ("color") · पञ्च panch ("five", written modern as पंच)', 'When you see ङ or ञ in standalone form, it\'s almost certainly a Sanskrit-influenced or technical text.', null, [ACT.nasals]),

    // Activity 7 — Sibilants
    createContentItem('स बनाम श', 'sa banaam sha', 'The two main sibilants: स (sa, alveolar, like English "s") and श (sha, palato-alveolar, like English "sh"). Confusing them changes words: सीता (Siitaa, the goddess) vs शीता (rare/dialect "cooled"); सच (sach, "truth") vs शक (shak, "doubt").', 'sentence', 'सच sach · शक shak · सात saat · शाम shaam', 'श appears in many high-frequency words: शाम (evening), शहर (city), शब्द (word).', null, [ACT.sibilants]),
    createContentItem('ष', 'Sha (retroflex sh)', 'A retroflex sibilant inherited from Sanskrit. In Sanskrit it had a distinct retroflex articulation; in modern spoken Hindi it merges with श. You still see it in Sanskrit-origin words like विशेष (visheSh, "special") and शेष (sheSh, "remainder").', 'word', 'विशेष visheSh ("special") · पुरुष puruSh ("man") · भाषा bhaaShaa ("language")', 'Pronounce as श in casual speech; Sanskrit recitation distinguishes the retroflex articulation.', null, [ACT.sibilants]),
    createContentItem('ह', 'ha (glottal h)', 'The voiced glottal fricative — always pronounced clearly in Hindi, NEVER silent. हाथ (haath, "hand") and होना (honaa, "to be") are heard with a strong h. Word-internal h can color preceding vowels: मेहनत (mehnat) sounds like "may-nat" with the h breathing into the e.', 'word', 'हाथ haath ("hand") · होना honaa ("to be") · मेहनत mehnat ("hard work")', 'English speakers tend to drop h in unstressed positions (e.g. "an honor"); Hindi h is always audible.', null, [ACT.sibilants]),

    // Activity 8 — Schwa deletion
    createContentItem('शब्दान्त अ-लोप', 'shabdaant a-lop', 'WORD-FINAL schwa deletion: the inherent "a" at the end of a Devanagari word is almost always silent in Hindi. कमल reads as "kamal", not "kamala"; घर reads "ghar", not "ghara"; नमस्ते reads "namaste", not "namastey".', 'sentence', 'कमल kamal ("lotus") · घर ghar ("house") · राम Raam ("Raam") · नमस्ते namaste', 'This is the #1 mistake of new Hindi readers — pronouncing every written consonant\'s inherent "a". Sanskrit recitation keeps them all; Hindi does not.', [
      { target: 'कमल → kamal', note: 'final inherent "a" dropped' },
      { target: 'राम → Raam', note: 'final inherent "a" dropped; long aa stays' },
      { target: 'घर → ghar', note: 'final inherent "a" dropped' },
    ], [ACT.schwaDeletion]),
    createContentItem('मध्य अ-लोप', 'madhya a-lop', 'MEDIAL schwa deletion: in three-syllable words with the pattern CVCVCV, the middle schwa often drops. समझ (samajh, not samaja-ha); धरम (dharam, not dhara-ma); नमक (namak, not nama-ka).', 'sentence', 'समझ samajh · धरम dharam · नमक namak · रहम raham', 'The rule is roughly: keep the schwa if dropping would create an awkward consonant cluster; otherwise drop. Native speakers internalize this without thinking.', null, [ACT.schwaDeletion]),
    createContentItem('अ-लोप अपवाद', 'a-lop apavaad', 'Exceptions: schwa is KEPT in certain morphological positions, e.g. before the past-tense suffix -aa (हटाया haTaayaa, not haTaayaa-deleted). Sanskrit-origin religious/literary terms often keep the final schwa in formal recitation (राम becomes Rama, not Raam, in Sanskrit chant).', 'sentence', 'हटाया haTaayaa ("removed", schwa kept) vs हटा haTaa ("removed/got out", schwa dropped) — different forms', 'When in doubt, drop. When listening to classical music, news Sanskrit-heavy register, or religious recitation, expect more retained schwas.', null, [ACT.schwaDeletion]),

    // Activity 9 — Conjuncts
    createContentItem('संयुक्ताक्षर', 'sanyuktaakShar', 'Conjuncts are visual forms for consonant clusters. Common patterns: stacked vertically (क्क kka), joined horizontally (क्त kta), or specially shaped (क्ष kSha, ज्ञ gya, त्र tra). When two consonants share a vowel-less junction, Devanagari often displays them as a single ligature.', 'sentence', 'क्ष kSh · ज्ञ gy · त्र tr · श्र shr · द्व dv · प्र pr', 'You don\'t have to memorize every conjunct — most are predictable. The 5-6 special ones (क्ष ज्ञ त्र श्र) are worth recognizing on sight.', [
      { target: 'क्ष kShi/kSha', note: 'k + sh; appears in क्षमा kShamaa ("forgiveness"), क्षण kShaN ("moment")' },
      { target: 'ज्ञ gya', note: 'j + ny; in MODERN Hindi pronounced "gya" not "jña"; appears in ज्ञान gyaan ("knowledge")' },
      { target: 'त्र tra', note: 't + r; appears in नेत्र netra ("eye"), मित्र mitra ("friend")' },
    ], [ACT.conjuncts]),
    createContentItem('र के विशेष रूप', 'ra ke visheSh ruup', 'The consonant र has TWO special positional forms: रेफ (a curl on top of the next consonant, used when r comes BEFORE another consonant: धर्म = dharm, with the curl over म) and ्र (a slanted stroke below, used when r comes AFTER another consonant: प्रेम = prem, with the stroke under प).', 'sentence', 'धर्म dharm (r before consonant — रेफ above) · प्रेम prem (r after consonant — ्र below)', 'These two shapes are confusing at first; remember: rāf goes ON TOP of the LATER letter; subscript ra goes BELOW the EARLIER letter.', [
      { target: 'रेफ ्र (above)', note: 'r BEFORE another consonant: धर्म, कर्म, सूर्य' },
      { target: '्र (below)', note: 'r AFTER another consonant: प्रेम, क्रम, ग्राम' },
    ], [ACT.conjuncts]),
    createContentItem('हलन्त (विराम)', 'halant (viraam)', 'The halant (्) is a small mark below a consonant that suppresses its inherent "a", allowing it to bond with the next consonant. क् = k (no vowel); क्त = kt; क्र = kr. Most conjuncts can also be written with explicit halant when ligatures are unclear: द्व or द्‌व both render "dv".', 'sentence', 'क्त kt (as in भक्त bhakt "devotee") · द्व dv (as in द्वार dvaar "door")', 'You\'ll see halant explicitly mostly at the END of certain Sanskrit-origin words: विद्वान् vidvaan (with explicit halant marking the final consonant as truly vowel-less).', null, [ACT.conjuncts]),

    // Activity 10 — Punctuation
    createContentItem('।', 'danda (vertical line)', 'The Hindi full stop — a single vertical line at the end of a sentence. Replaces the Western period ".". हम भारत में हैं। ("We are in India.") The danda is used in all formal Hindi writing; informal SMS/chat may use Western period.', 'sentence', 'मैं ठीक हूँ। ("I am fine.") · वह घर गया। ("He went home.")', 'Always one space before and after, just like a Western period in English typography.', null, [ACT.punctuation]),
    createContentItem('? ! ,', 'angrezii viraam chinh', 'The Western question mark, exclamation point, and comma are fully integrated into modern Hindi. Question: आप कैसे हैं? Exclamation: कितना अच्छा! Comma: मैं, तुम और वह.', 'sentence', 'आप कैसे हैं? · कितना अच्छा! · मैं, तुम, और वह', 'There is no Devanagari question mark; modern Hindi adopts the Western one universally.', null, [ACT.punctuation]),
    createContentItem('देवनागरी अंक', 'devanaagarii ank', 'Devanagari has its own digits ०१२३४५६७८९ corresponding to 0-9. Most modern Hindi publications use Western digits; Devanagari digits survive in formal printing, traditional documents, and religious texts.', 'sentence', '० १ २ ३ ४ ५ ६ ७ ८ ९ ↔ 0 1 2 3 4 5 6 7 8 9', '२०२६ = 2026; in newspaper headlines you may see either form, even side-by-side.', null, [ACT.punctuation]),

    // Activity 11 — Reading practice
    createContentItem(
      'नमस्ते',
      'namaste',
      'The all-purpose greeting in Hindi. Pronounced "namaste" (final "e" not silent like in अ-loss because े is a written matra, not the inherent vowel). Used any time of day with anyone — formal or informal.',
      'word',
      'नमस्ते आप कैसे हैं? ("Hello, how are you?")',
      'The most common Hindi word any new speaker learns; safe with everyone.',
      [
        { target: 'न na', note: 'dental n with inherent vowel' },
        { target: 'म ma', note: 'labial m + inherent vowel — DELETED here, reads "m" not "ma"' },
        { target: 'स्ते ste', note: 'conjunct स्त with े matra: "ste"' },
      ],
      [ACT.reading],
    ),
    createContentItem('धन्यवाद', 'dhanyavaad', '"Thank you" — formal-to-neutral register. Comes from Sanskrit "thanks-bringing speech". The aspirated द ध (dh) and the breathy voicing are key features. More formal than शुक्रिया (shukriyaa, Urdu-origin "thanks").', 'word', 'आपका धन्यवाद। ("Thank you.")', 'Sanskritic register vs शुक्रिया (Persianate/Urdu register) — same meaning, different cultural flavor.', [
      { target: 'ध dha', note: 'voiced aspirated dental — breathy "dh"' },
      { target: 'न्य nya', note: 'conjunct न्य; sometimes simplified to nya' },
      { target: 'वाद vaad', note: '"speech" — Sanskrit root' },
    ], [ACT.reading]),
    createContentItem('हाँ / नहीं', 'haaN / nahiiN', 'Yes (हाँ) and No (नहीं). Both end in chandrabindu (nasalized vowel). हाँ is informal/neutral; जी हाँ (jii haaN) is more polite. नहीं is universally no; जी नहीं is polite no.', 'word', 'हाँ, मैं ठीक हूँ। ("Yes, I\'m fine.") · नहीं, धन्यवाद। ("No, thank you.")', 'The nasalized vowels make these words distinctive; without chandrabindu they sound rude or wrong.', null, [ACT.reading]),
    createContentItem('मैं / आप', 'maiN / aap', '"I" and "you" (formal). मैं ends in chandrabindu (maiN with nasalized ai). आप is the highest formal "you", used with elders, strangers, customers, and as a default safe choice.', 'word', 'मैं भारत से हूँ। आप कहाँ से हैं? ("I\'m from India. Where are you from?")', 'आप always takes plural verb agreement, even for a single person — this is the honorific structure.', null, [ACT.reading]),
    createContentItem('घर / खाना', 'ghar / khaanaa', '"House" (घर) and "food/to eat" (खाना). घर demonstrates the voiced aspirate gh; खाना demonstrates the voiceless aspirate kh. Both are everyday words.', 'word', 'मेरा घर दिल्ली में है। मुझे भारतीय खाना पसंद है। ("My house is in Delhi. I like Indian food.")', 'Schwa deletion: घर is "ghar" not "ghara"; खाना keeps "khaa" + "naa" because of the long aa matra.', null, [ACT.reading]),
    createContentItem('पाठ अभ्यास', 'paaTh abhyaas', 'A short reading paragraph combining everything from this foundation lesson. Practice aloud: every consonant cleanly aspirated or unaspirated, every retroflex distinct from dental, every nasalized vowel marked with the chandrabindu pronunciation, every word-final schwa dropped.', 'sentence', 'नमस्ते! मैं भारत से हूँ। मेरा घर दिल्ली में है। मुझे भारतीय खाना और हिंदी संगीत पसंद है। आपको क्या पसंद है?', 'Translation: "Hello! I\'m from India. My house is in Delhi. I like Indian food and Hindi music. What do you like?"', [
      { target: 'भारत bhaarat', note: 'voiced aspirate "bh" + dental t — both phonemically distinct from English equivalents' },
      { target: 'हिंदी hindii', note: 'anusvara on ह assimilates to dental n before द' },
      { target: 'पसंद pasand', note: '"liked"; anusvara on स assimilates to dental n before द' },
    ], [ACT.reading]),
  ],
};

module.exports = lesson;
