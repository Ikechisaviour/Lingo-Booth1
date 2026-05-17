// Level 1 — Foundation: Bengali (Bangla) Script & Pronunciation
// First lesson on the Bengali / Foundation track. Pre-grammar, pre-vocabulary.
// Covers the Bengali alphabet (vowels and consonants), the inherent vowel ô,
// vowel signs (kar) vs full-form vowels, aspiration, retroflex vs dental
// contrasts, the three sibilants merged in speech, conjunct consonants,
// and the Bangladesh vs West Bengal pronunciation split.
//
// All content is authored with Bangla script (target) + ISO-15919 / simplified
// transliteration (romanization) + English glosses (canonical source). The AI
// conversation tutor reads this curriculum and delivers it to each learner in
// their preferred native language at runtime — never assume a specific L1 in
// this file.
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
  intro: 'bn-foundation-intro',
  inherentVowel: 'bn-foundation-inherent-vowel',
  vowels: 'bn-foundation-vowels',
  vowelSigns: 'bn-foundation-vowel-signs',
  stops: 'bn-foundation-stops',
  retroflexDental: 'bn-foundation-retroflex-dental',
  sibilants: 'bn-foundation-sibilants',
  conjuncts: 'bn-foundation-conjuncts',
  numerals: 'bn-foundation-numerals',
  bdVsWb: 'bn-foundation-bd-vs-wb',
  reading: 'bn-foundation-reading',
};

const activities = [
  {
    id: ACT.intro,
    section: 'Why Bangla Script',
    title: 'বাংলা লিপি — How Bengali sounds are organized',
    goals: [
      'Understand that Bengali (বাংলা bangla) uses the Eastern Nagari script, a member of the Brahmic family — letters are organized by place of articulation rather than alphabetic order.',
      'Know that Bengali is the official language of Bangladesh (~170M speakers) and the Indian state of West Bengal (~85M speakers), with smaller communities in Tripura, Assam, and diaspora across the UK, US, and Gulf states.',
      'See that every Bengali consonant carries an inherent vowel ô (the schwa-like অ), which is read or dropped according to position — this single rule shapes how every word is read aloud.',
    ],
    task: 'Read the four structural facts. By the end of this lesson you should be able to read any Bangla word aloud with correct inherent-vowel application, even before you know the meaning.',
  },
  {
    id: ACT.inherentVowel,
    section: 'The Inherent Vowel ô',
    title: 'অন্তর্নিহিত স্বরধ্বনি — The vowel that lives inside every consonant',
    goals: [
      'Understand that every Bengali consonant letter (ক, খ, গ, etc.) is read with an inherent vowel ô (rhymes with English "law" or German "o"), unlike Devanagari where the inherent vowel is the schwa "a".',
      'Apply the no-schwa-deletion rule: unlike Hindi, Bengali keeps the inherent ô at the END of most words, so কলম is read kôlôm (three syllables), not "kalm".',
      'Recognize the ও-kar (◌ো) that turns inherent ô into a long o, and the hôshonto (◌্) that suppresses the inherent vowel for consonant clusters.',
    ],
    task: 'For each of five sample consonants, say it twice: first with the inherent ô (ক = kô), then with the hôshonto (ক্ = just k).',
  },
  {
    id: ACT.vowels,
    section: 'Vowels',
    title: 'স্বরবর্ণ — The 11 vowel letters',
    goals: [
      'Recognize all 11 full-form vowel letters: অ ô, আ a, ই i, ঈ ī, উ u, ঊ ū, ঋ ri, এ e, ঐ ôi, ও o, ঔ ôu.',
      'Distinguish full-form vowels (used word-initially) from vowel signs / kar (used after a consonant) — the same vowel sound has TWO written forms depending on position.',
      'Pay extra attention to the inherent vowel অ (ô), the diphthong ঐ (ôi), and the diphthong ঔ (ôu) — these three are the ones most often mispronounced by learners who carry over Hindi or English habits.',
    ],
    task: 'Read each vowel aloud in its full form, then identify its vowel sign equivalent on a consonant like ক.',
  },
  {
    id: ACT.vowelSigns,
    section: 'Vowel Signs (Kar)',
    title: 'কার চিহ্ন — Vowel marks attached to consonants',
    goals: [
      'Learn the 10 vowel signs (kar) that attach to consonants: ◌া -a, ি◌ -i, ◌ী -ī, ◌ু -u, ◌ূ -ū, ◌ৃ -ri, ে◌ -e, ৈ◌ -ôi, ো◌ -o, ৌ◌ -ôu.',
      'Notice the placement quirks: ি◌ is written BEFORE the consonant (visually) but read AFTER it (phonetically), and ো◌ wraps around the consonant (ক + ো → কো ko).',
      'Note that there is no kar for অ ô — the inherent vowel is the default, so writing nothing means "ô is here".',
    ],
    task: 'Write the syllable "ki" two ways: full-form vowel ই + ক, then the kar form কি. Compare the visual difference.',
  },
  {
    id: ACT.stops,
    section: 'Stops & Aspiration',
    title: 'স্পর্শ ব্যঞ্জনবর্ণ — The five rows of stop consonants',
    goals: [
      'Recognize the five-row organization of Bengali stops: velars (ক kô, খ khô, গ gô, ঘ ghô, ঙ ngô), palatals (চ cô, ছ chô, জ jô, ঝ jhô, ঞ ñô), retroflex (ট ṭô, ঠ ṭhô, ড ḍô, ঢ ḍhô, ণ ṇô), dental (ত tô, থ thô, দ dô, ধ dhô, ন nô), labial (প pô, ফ phô, ব bô, ভ bhô, ম mô).',
      'Apply the four-way aspiration contrast in each row: unvoiced unaspirated (ক k), unvoiced aspirated (খ kh), voiced unaspirated (গ g), voiced aspirated (ঘ gh).',
      'Hear that aspiration is meaningful in Bengali: কাল kal ("yesterday/tomorrow") vs খাল khal ("canal") are completely different words.',
    ],
    task: 'Read the velar row aloud (ক খ গ ঘ ঙ) with clear aspiration on খ and ঘ, then drill the same four-way contrast on the labial row (প ফ ব ভ).',
  },
  {
    id: ACT.retroflexDental,
    section: 'Retroflex vs Dental',
    title: 'মূর্ধন্য বনাম দন্ত্য — Two t/d/n series learners must distinguish',
    goals: [
      'Distinguish retroflex stops (ট ṭ, ঠ ṭh, ড ḍ, ঢ ḍh, ণ ṇ) — pronounced with the tongue curled back to touch the roof of the mouth — from dental stops (ত t, থ th, দ d, ধ dh, ন n) — pronounced with the tongue tip on the upper teeth.',
      'Hear that the retroflex/dental distinction is meaning-bearing: টাকা ṭaka ("money / Bangladeshi taka") vs তাকা taka ("look at" imperative) are entirely different words.',
      'Note that English /t/ and /d/ are alveolar — between retroflex and dental — so English speakers must consciously choose which Bengali series to use; defaulting to "halfway" sounds wrong in both directions.',
    ],
    task: 'Read each minimal pair aloud (টাকা/তাকা, ডাল/দাল, ণ/ন) until the retroflex-vs-dental contrast feels automatic.',
  },
  {
    id: ACT.sibilants,
    section: 'Three Sibilants',
    title: 'শ ষ স — Three letters, one sound in speech',
    goals: [
      'Recognize that Bengali writes three sibilant letters — শ (talobyô shô), ষ (mūrdhônyô shô), স (dôntyô sô) — historically distinct in Sanskrit (palatal /ɕ/, retroflex /ʂ/, dental /s/).',
      'Know that in modern Bengali speech all three merge to a single sound /ʃ/ "sh" in most positions — শ, ষ, and স are all pronounced "sh" before vowels and most consonants.',
      'Apply the spelling rules that determine which sibilant to write: ষ appears in tatsama (Sanskrit-derived) words after retroflex contexts, স often appears in clusters (স্ত, স্থ, স্ক) and tatsama bases, শ is the default elsewhere.',
    ],
    task: 'Read these three words aloud — শাড়ি shari ("sari"), ষাঁড় shãṛ ("bull"), সাত shat ("seven") — and notice they all begin with the same "sh" sound despite three different letters.',
  },
  {
    id: ACT.conjuncts,
    section: 'Conjunct Consonants',
    title: 'যুক্তাক্ষর — Consonant clusters in writing',
    goals: [
      'Understand that when two consonants meet without a vowel between them, they form a যুক্তাক্ষর juktakkhor (conjunct) — a single ligature, not two separate letters.',
      'Recognize the most common conjuncts: ক্ত (k+t = kt as in ভক্ত bhôkto "devotee"), স্ত (s+t = st as in ছাত্র chhatro "student"), ন্ত (n+t = nt as in অন্ত ônto "end"), দ্দ (d+d), দ্ধ (d+dh), and the special য-ফলা (-yô attached as a subscript "-y") and র-ফলা (-rô attached as a subscript "-r").',
      'Know that conjuncts are part of fluent reading: a Bengali learner who cannot recognize ক্ষ (kṣô), জ্ঞ (jñô), and ত্র (trô) will stall on every paragraph.',
    ],
    task: 'For each of three conjuncts (ক্ত, স্ত, ক্ষ), identify the two component consonants and read the conjunct in a sample word.',
  },
  {
    id: ACT.numerals,
    section: 'Bengali Numerals',
    title: 'বাংলা সংখ্যা — The 10 digits',
    goals: [
      'Recognize the 10 Bengali numerals ০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) as distinct from Western 0-9 — both forms appear in Bangladesh and West Bengal newspapers, signs, and currency.',
      'Read the names: শূন্য shūnyô (0), এক ek (1), দুই dui (2), তিন tin (3), চার char (4), পাঁচ pãch (5), ছয় chhôy (6), সাত shat (7), আট aṭ (8), নয় nôy (9).',
      'Know that Bangladeshi taka (৳) and Indian rupee amounts are commonly written with Bengali numerals on bills, official documents, and Pohela Boishakh greeting cards.',
    ],
    task: 'Count aloud from ০ to ৯ in Bengali, then write today\'s date using Bengali numerals.',
  },
  {
    id: ACT.bdVsWb,
    section: 'Bangladesh vs West Bengal',
    title: 'বাংলাদেশ বনাম পশ্চিমবঙ্গ — Pronunciation and vocabulary splits',
    goals: [
      'Know that "Bengali" is a single written language but two major spoken standards: Bangladeshi Standard (centered on Dhaka, used by the BD government and media) and Indian Standard (centered on Kolkata, used by WB media and the Indian academic establishment).',
      'Recognize key vocabulary splits — water = পানি pani (BD) vs জল jol (WB) — salt = লবণ lôbôn (both) but BD prefers it; sugar = চিনি chini (both); invitation = দাওয়াত daoyat (BD, Arabic-derived) vs নিমন্ত্রণ nimôntron (WB, Sanskrit-derived).',
      'Hear that BD speech tends to keep the inherent ô more strongly word-finally and uses more Perso-Arabic loanwords (Eid, namaz, dawat, ramzan), while WB speech often clips ô and uses more Sanskrit-derived vocabulary (puja, snan, namaskar).',
    ],
    task: 'Read each minimal pair pani/jol, daoyat/nimôntron and decide which one you would use in Dhaka, Chattogram, Kolkata, and Shantiniketan respectively.',
  },
  {
    id: ACT.reading,
    section: 'Reading Practice',
    title: 'পাঠ অনুশীলন — Read a sentence applying every rule',
    goals: [
      'Read a short Bangla sentence aloud with correct inherent vowels, kar placement, aspiration, retroflex/dental contrasts, and sibilant merging.',
      'Identify the writing-vs-speech mismatches: where ô is dropped in casual speech, where sibilants all read as "sh", and where conjuncts compress two consonants into one ligature.',
    ],
    task: 'Read aloud: "আমার নাম সাবিনা। আমি ঢাকা বিশ্ববিদ্যালয়ের ছাত্রী।" (amar nam Sabina. ami Dhaka Bishwobiddyaloyer chhatri.) — "My name is Sabina. I am a student at the University of Dhaka."',
  },
];

const level1Foundation = {
  title: 'Foundation: বাংলা লিপি — Bengali Script & Pronunciation',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'bn',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'foundation',
  activities,
  expressionPractice: [],
  relatedPools: [],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Why Bangla Script
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'বাংলা ভাষা',
      'bangla bhasha',
      'Bengali (বাংলা bangla) is the seventh most-spoken language in the world by native speakers, with ~170 million in Bangladesh and ~85 million in the Indian state of West Bengal, plus significant diaspora communities in the UK, US, Gulf states, and Malaysia.',
      'word',
      'বাংলাদেশ ও পশ্চিমবঙ্গ — Bangladesh ô Pôshchimbôngo (Bangladesh and West Bengal)',
      'The same written language spans two countries with very different cultural and political contexts; learners must be aware of both throughout this course.',
      [
        { target: 'বাংলাদেশ Bangladesh', note: 'sovereign country since 1971; capital Dhaka; majority Muslim; Bengali is the sole official language' },
        { target: 'পশ্চিমবঙ্গ West Bengal', note: 'Indian state; capital Kolkata; majority Hindu; Bengali is an official language alongside English and Hindi' },
        { target: '~250M total speakers', note: 'seventh-largest language community in the world; UNESCO-recognized Mother Language Day origins (Feb 21, 1952)' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'পূর্ব নাগরী লিপি',
      'pūrbô nagōri lipi',
      'The Eastern Nagari script (also called Bengali-Assamese script) is a Brahmic abugida — a hybrid between an alphabet and a syllabary in which each consonant letter inherently carries a vowel that can be modified by attached signs. Shared with Assamese and Manipuri Bishnupriya.',
      'word',
      'লিপির পরিবার: ব্রাহ্মী → সিদ্ধং → পূর্ব নাগরী (Brahmi → Siddham → Eastern Nagari)',
      'The script descends from Brahmi (3rd-c BCE) through Siddham (~600 CE) to the modern form, codified mostly during the Bengal Renaissance (19th c).',
      [
        { target: 'অক্ষর akkhor', note: 'syllable/letter — the basic unit of writing in Bengali, not the individual phoneme' },
        { target: 'abugida (not alphabet)', note: 'consonant with inherent vowel is the default; vowels are written only when DIFFERENT from the inherent vowel' },
        { target: 'left-to-right, top-line maatra', note: 'most letters hang from a horizontal headline (মাত্রা matra), like Devanagari' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'স্বরধ্বনি ও ব্যঞ্জনধ্বনি',
      'shôrôdhwoni ô byônjondhwoni',
      'Bengali has 11 vowels (স্বরবর্ণ shôrôbôrnô) and ~35 distinctive consonants (ব্যঞ্জনবর্ণ byônjônbôrnô), organized by place and manner of articulation. Every consonant letter carries the inherent vowel ô unless a kar (vowel sign), hôshonto (vowel-suppressor), or conjunct override it.',
      'word',
      '১১টি স্বরবর্ণ + ৩৫টি ব্যঞ্জনবর্ণ',
      'The organization is phonetic, not arbitrary: knowing the place-and-manner table is what makes Bengali script learnable as a system.',
      [
        { target: 'স্বর shôr (vowel)', note: '11 letters, plus 10 kar (vowel signs) — same sound, different shape by position' },
        { target: 'ব্যঞ্জন byônjon (consonant)', note: '~35 letters organized by place (velar/palatal/retroflex/dental/labial) × manner (voiced/voiceless × aspirated/unaspirated × nasal)' },
        { target: 'inherent ô', note: 'every consonant carries this hidden vowel until told otherwise — the single most important rule of Bengali reading' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'শেখার লক্ষ্য',
      'shekhar lôkkhô',
      'By the end of this Foundation lesson, you should be able to read any Bengali word aloud with correct inherent-vowel application, distinguish retroflex from dental, aspirated from unaspirated, and recognize the most common conjuncts — even before you know what the words mean.',
      'word',
      'লক্ষ্য: "আমার নাম..." পড়তে পারা — read "amar nam..." with correct sibilant, kar, and inherent vowel.',
      'If you can read this self-introduction opener correctly, you have all the Foundation tools and can begin Unit 1.',
      null,
      [ACT.intro],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Inherent Vowel ô
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'অন্তর্নিহিত অ',
      'ôntôrnihito ô',
      'Every Bengali consonant carries an inherent vowel pronounced ô — somewhere between English "aw" (as in "law") and "o" (as in "got"). Unlike Hindi/Devanagari schwa /ə/, Bengali ô is a back rounded vowel and is NOT dropped at word ends.',
      'word',
      'ক = kô (not just k) · ম = mô · ত = tô · ন = nô',
      'The inherent vowel is silent in writing but ALWAYS pronounced unless explicitly suppressed by hôshonto, kar, or conjunct context.',
      [
        { target: 'ক (written) = kô (spoken)', note: 'the letter ক alone is read "kô"; English speakers hearing "k" alone are mishearing the inherent ô' },
        { target: 'ô ≈ "aw" of English "law"', note: 'back rounded vowel; NOT the schwa /ə/ of Hindi, NOT the "a" of English "cat"' },
        { target: 'word-final ô is KEPT', note: 'unlike Hindi (where কলম would become "kalm"), Bengali pronounces কলম as kôlôm — three full syllables' },
      ],
      [ACT.inherentVowel],
    ),
    createContentItem(
      'হসন্ত',
      'hôshonto (◌্)',
      'The hôshonto (also called বিরাম biram) is a small diagonal mark written below a consonant to suppress its inherent vowel. ক্ alone reads simply "k" — the inherent ô is silenced. Used at the end of certain words and to form conjuncts in older typesetting.',
      'word',
      'ক্ = k (silent ô) · ত্ = t · প্ = p',
      'In modern typography, conjuncts are usually written as ligatures rather than with explicit hôshonto, but the mark is essential for typing and learning the rule.',
      [
        { target: '◌্ hôshonto', note: 'diagonal mark BELOW the consonant; visually small but functionally important' },
        { target: 'suppresses inherent ô', note: 'turns "kô" into "k", "tô" into "t" — used to form clusters and certain word endings' },
        { target: 'হঠাৎ hôṭhat ("suddenly")', note: 'the final ৎ is a special hôshonto-form of ত — read as a bare "t" without an ô after it' },
      ],
      [ACT.inherentVowel],
    ),
    createContentItem(
      'অ-অপলোপ',
      'ô-ôpôlop',
      'CRITICAL CONTRAST WITH HINDI: Bengali does NOT delete the schwa/inherent vowel at word ends or in many internal positions. Hindi "kalam" (कलम pen) becomes Bengali "kôlôm" (কলম) — three full syllables. English speakers who learn Hindi first must un-learn the deletion habit.',
      'word',
      'কলম kôlôm ("pen") · মন môn ("mind") · কথা kôtha ("word/talk")',
      'Three-syllable readings where Hindi would give two-syllable readings; this is the single biggest pronunciation tell of an over-Hindified learner.',
      [
        { target: 'কলম Hindi → kalam', note: 'two syllables, schwa-deleted between l and m' },
        { target: 'কলম Bengali → kôlôm', note: 'three syllables with the inherent ô preserved' },
        { target: 'mental rule', note: 'when in doubt, READ the inherent ô — over-pronouncing it sounds more correct than under-pronouncing' },
      ],
      [ACT.inherentVowel],
    ),
    createContentItem(
      'অ বনাম আ',
      'ô vs a',
      'CRITICAL CONTRAST: অ (ô, the inherent vowel) and আ (a, the kar -া) are two completely different vowels in Bengali, though both descend from Sanskrit /a/. ô is short and back-rounded; a is longer, open, and unrounded. কম kôm ("less") vs কাম kam ("work, BD slang") — different words.',
      'word',
      'কম kôm ("less") vs কাম kam ("work / lust") · ভ্রম bhrôm ("error") vs ভ্রম্যমাণ bhrômmôman ("wandering")',
      'The inherent অ is short and rounded; the kar আ-kar (◌া) is long and open — never collapse them.',
      [
        { target: 'অ (ô) / inherent', note: 'short, back, rounded, like English "law" without the diphthong' },
        { target: 'আ (a) / kar ◌া', note: 'long, open, central, like English "ah" in "father"' },
        { target: 'কম vs কাম', note: 'minimal pair: ô differentiates from a — both are core vocabulary' },
      ],
      [ACT.inherentVowel],
    ),
    createContentItem(
      'উচ্চারণ অভ্যাস',
      'uccharôn ôbbhash',
      'Drill: read each consonant aloud first with the inherent ô (ক = kô, ম = mô, ত = tô), then with hôshonto applied (ক্ = k, ম্ = m, ত্ = t). The contrast trains your ear to hear what is silent in writing.',
      'word',
      'ক → kô / ক্ → k · ম → mô / ম্ → m · ত → tô / ত্ → t',
      'A simple drill that pays off for the rest of the course — never read a consonant letter as a bare consonant unless hôshonto or kar tells you to.',
      null,
      [ACT.inherentVowel],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vowels (11 full-form letters)
    // ────────────────────────────────────────────────────────────────────
    createContentItem('অ', 'ô', 'First vowel; the inherent vowel that lives inside every consonant. Pronounced like the "aw" of English "law" — short, back, rounded. Written as a full letter only at the start of a word (অমর ômôr "immortal"); inside or after a consonant, it is invisible/inherent.', 'word', 'অমর ômôr ("immortal") · অভ্র ôbhrô ("sky")', 'The default vowel — letters carry it silently unless overridden.', null, [ACT.vowels]),
    createContentItem('আ', 'a', 'Second vowel; the open central vowel like English "ah" in "father". Pronounced longer than অ. As a kar it is ◌া (e.g., কা = ka, মা = ma).', 'word', 'আম am ("mango") · আমি ami ("I")', 'High-frequency vowel; appears in the most common pronoun আমি and many basic nouns.', null, [ACT.vowels]),
    createContentItem('ই', 'i', 'Third vowel; short high front vowel like English "i" in "bit" or shorter "ee". As a kar it is ি◌ (e.g., কি = ki, but written visually BEFORE ক).', 'word', 'ইলিশ ilish ("hilsa fish, Bangladesh national fish") · ইচ্ছা iccha ("wish")', 'The kar i◌ visually precedes the consonant but is read AFTER it — a common stumbling block for new readers.', null, [ACT.vowels]),
    createContentItem('ঈ', 'ī', 'Fourth vowel; long high front vowel — historically distinct from ই but pronounced identically in modern Bengali. The distinction is preserved in spelling only (especially in tatsama Sanskrit-derived words).', 'word', 'নদী nôdi ("river") · দীপ dīp ("lamp")', 'In modern speech, ই and ঈ are homophones; learners must memorize which words use which.', null, [ACT.vowels]),
    createContentItem('উ', 'u', 'Fifth vowel; short high back rounded vowel like English "u" in "put". As a kar it is ◌ু (e.g., কু = ku).', 'word', 'উটপাখি uṭpakhi ("ostrich") · উপহার upôhar ("gift")', 'Common vowel; appears in many everyday words.', null, [ACT.vowels]),
    createContentItem('ঊ', 'ū', 'Sixth vowel; long high back rounded vowel — historically distinct from উ but pronounced identically in modern Bengali. Spelling distinction preserved especially in tatsama words.', 'word', 'ঊষা usha ("dawn") · ভূমি bhūmi ("land")', 'Like the ই/ঈ pair, modern speech merges উ and ঊ; learners memorize by word.', null, [ACT.vowels]),
    createContentItem('ঋ', 'ri', 'Seventh vowel; a syllabic "r" sound in Sanskrit, but in modern Bengali pronounced as "ri" — the same as রি (ri). Appears only in tatsama Sanskrit-derived words.', 'word', 'ঋতু ritu ("season") · কৃষ্ণ Kŗshno ("Krishna")', 'Pronounced "ri" in Bengali despite the Sanskrit origin; the kar form is ◌ৃ.', null, [ACT.vowels]),
    createContentItem('এ', 'e', 'Eighth vowel; mid front unrounded vowel like English "e" in "bed" or "ay" in "say" depending on word. Bangladeshi speech tends toward open /ɛ/, West Bengal toward closer /e/. As a kar it is ে◌ (e.g., কে = ke).', 'word', 'এক ek ("one") · এই ei ("this")', 'High-frequency vowel; the pronoun এই ei is one of the most common words in spoken Bengali.', null, [ACT.vowels]),
    createContentItem('ঐ', 'ôi', 'Ninth vowel; diphthong like English "oy" in "boy" (some learners hear it as "ai"). Appears mostly in tatsama words and a few common words like দৈনিক dôinik ("daily").', 'word', 'দৈনিক dôinik ("daily") · ঐক্য ôikkô ("unity")', 'Less frequent than the simple vowels; in modern speech sometimes simplifies to "oi" or "ai".', null, [ACT.vowels]),
    createContentItem('ও', 'o', 'Tenth vowel; mid back rounded vowel like English "o" in "go" — longer and clearer than the inherent অ. As a kar it is ো◌, which WRAPS around the consonant (ক + ো → কো ko). Also functions as a particle meaning "and / also".', 'word', 'ও o ("he/she-ordinary" or "and") · ওজন ojon ("weight")', 'Important to distinguish from inherent অ ô — different vowel, different word.', null, [ACT.vowels]),
    createContentItem('ঔ', 'ôu', 'Eleventh vowel; diphthong like English "ow" in "show" but with more lip rounding. Appears in formal/tatsama vocabulary. As a kar it is ৌ◌ (e.g., মৌ môu).', 'word', 'মৌ môu ("honey/bee") · ঔষধ ôushôdh ("medicine")', 'Less frequent in casual speech; common in literary and pharmaceutical/medical vocabulary.', null, [ACT.vowels]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vowel Signs (Kar)
    // ────────────────────────────────────────────────────────────────────
    createContentItem('◌া (আ-কার)', 'a-kar', 'Attached to a consonant to give it the vowel "a" (like English "ah"). Written as a vertical bar AFTER the consonant. ক + ◌া = কা ka, ম + ◌া = মা ma.', 'word', 'কা ka, মা ma ("mother"), বাবা baba ("father"), ভাত bhat ("rice")', 'High-frequency kar; appears in the basic kinship terms and the staple food ভাত.', null, [ACT.vowelSigns]),
    createContentItem('ি◌ (ই-কার)', 'i-kar', 'Attached to a consonant to give it the vowel "i" (short, high front). VISUAL TRAP: written BEFORE the consonant but read AFTER it. ক + ই-kar = কি ki (read "ki", not "ik").', 'word', 'কি ki ("what / is it?"), দিন din ("day"), মিষ্টি mishti ("sweet")', 'The most common visual quirk in the script — beginners often misread কি as "ik" before learning the rule.', null, [ACT.vowelSigns]),
    createContentItem('◌ী (ঈ-কার)', 'ī-kar', 'Attached to give long "ī". In modern speech identical to short i-kar. Written as a vertical bar AFTER the consonant with a hook on top.', 'word', 'নদী nôdi ("river"), পাখি pakhi ("bird"), দিদি didi ("elder sister")', 'In modern Bengali pronounced same as ি◌; the difference is spelling-only.', null, [ACT.vowelSigns]),
    createContentItem('◌ু (উ-কার)', 'u-kar', 'Attached to give "u" (short, high back rounded). Written as a small hook below the consonant. ক + ◌ু = কু ku.', 'word', 'কুমির kumir ("crocodile"), গুরু guru ("teacher / mentor"), দু-জন du-jon ("two people")', 'Note that some consonants take an alternate u-kar shape (e.g., রু ru, শু shu) — a typographic quirk worth memorizing.', null, [ACT.vowelSigns]),
    createContentItem('◌ূ (ঊ-কার)', 'ū-kar', 'Attached to give long "ū". In modern speech identical to short u-kar. Written as a longer hook below.', 'word', 'ভূমি bhūmi ("land"), মূল mūl ("root / base"), নূপুর nūpur ("anklet")', 'In modern Bengali pronounced same as ◌ু; spelling distinction preserved in tatsama words.', null, [ACT.vowelSigns]),
    createContentItem('ে◌ (এ-কার)', 'e-kar', 'Attached to give "e". Written as a hook BEFORE the consonant. ক + ে◌ = কে ke. Bangladesh speech: more open /ɛ/; West Bengal: closer /e/.', 'word', 'কে ke ("who"), দেশ desh ("country"), মে me ("May")', 'High-frequency kar; appears in the basic question word "who" and the noun দেশ "country/nation".', null, [ACT.vowelSigns]),
    createContentItem('ৈ◌ (ঐ-কার)', 'ôi-kar', 'Attached to give the diphthong "ôi". Written as a double hook BEFORE the consonant. Less common than e-kar.', 'word', 'কৈ kôi ("where" — BD colloquial), দৈনিক dôinik ("daily")', 'BD colloquial "কৈ?" ("where?") is one of the few high-frequency words using this kar.', null, [ACT.vowelSigns]),
    createContentItem('ো◌ (ও-কার)', 'o-kar', 'Attached to give "o" (long, mid back rounded). WRAPS around the consonant: hook before AND vertical bar after (ক + ো◌ = কো ko).', 'word', 'কোথায় kothay ("where"), লোক lok ("person"), গোলাপ golap ("rose")', 'Distinguish from inherent অ ô — different vowel quality and length.', null, [ACT.vowelSigns]),
    createContentItem('ৌ◌ (ঔ-কার)', 'ôu-kar', 'Attached to give the diphthong "ôu". Wraps around the consonant like o-kar but with a different right-hand mark. Less frequent.', 'word', 'মৌমাছি môumachi ("honeybee"), নৌকা nôuka ("boat")', 'নৌকা is a very common word in Bengal Delta culture — both BD and WB are riverine.', null, [ACT.vowelSigns]),
    createContentItem('◌ৃ (ঋ-কার)', 'ri-kar', 'Attached to give "ri". Written as a curl below. Appears only in tatsama words.', 'word', 'কৃষক krishôk ("farmer"), মৃত্যু mrittyu ("death"), পৃথিবী prithibi ("earth/world")', 'Pronounced "ri" despite the Sanskrit syllabic-r origin.', null, [ACT.vowelSigns]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Stops & Aspiration
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ক খ গ ঘ ঙ', 'kô khô gô ghô ngô', 'The velar (back-of-throat) row. ক k unvoiced unaspirated, খ kh unvoiced aspirated, গ g voiced unaspirated, ঘ gh voiced aspirated, ঙ ng nasal. Four-way contrast familiar to Hindi/Urdu speakers; novel for English speakers.', 'word', 'কাল kal ("yesterday/tomorrow") · খাল khal ("canal") · গাল gal ("cheek") · ঘাট ghaṭ ("riverbank") · বাঙালি bangali ("Bengali person")', 'কাল/খাল/গাল form a near-minimal triple showing the aspiration and voicing contrasts.', [
      { target: 'ক k', note: 'unvoiced unaspirated — like English "k" of "sky" without the puff' },
      { target: 'খ kh', note: 'unvoiced aspirated — like the "k" of "key" with a strong puff' },
      { target: 'গ g', note: 'voiced unaspirated — like the "g" of "go" but cleaner, no breath' },
      { target: 'ঘ gh', note: 'voiced aspirated — the trickiest for English speakers, a "g" with a breathy release' },
      { target: 'ঙ ng', note: 'velar nasal — like the "ng" of English "sing"; rare initially, common in conjuncts' },
    ], [ACT.stops]),
    createContentItem('চ ছ জ ঝ ঞ', 'cô chô jô jhô ñô', 'The palatal row. চ c like "ch" of "cheap" but unaspirated, ছ ch aspirated. জ j like "j" of "jump" unaspirated, ঝ jh aspirated voiced. ঞ ñ palatal nasal (rare alone).', 'word', 'চা cha ("tea") · ছবি chôbi ("picture/photo") · জল jol (WB)/পানি pani (BD) ("water")', 'চা ("tea") is one of the highest-frequency words in either BD or WB — both cultures are tea-drinking.', [
      { target: 'চ c', note: 'unaspirated "ch"; like Italian "ce/ci" but unvoiced' },
      { target: 'ছ ch', note: 'aspirated "ch"; clearer puff than চ' },
      { target: 'জ j', note: 'voiced unaspirated; "j" of "jump"' },
      { target: 'ঝ jh', note: 'voiced aspirated; breathy "j"' },
      { target: 'ঞ ñ', note: 'palatal nasal; appears mostly in conjuncts like জ্ঞ jñô' },
    ], [ACT.stops]),
    createContentItem('ট ঠ ড ঢ ণ', 'ṭô ṭhô ḍô ḍhô ṇô', 'The retroflex row. Tongue tip CURLED BACK against the roof of the mouth, not on the teeth or alveolar ridge. ট ṭ, ঠ ṭh, ড ḍ, ঢ ḍh, ণ ṇ. Borrowed scholarly transliteration uses underdots.', 'word', 'টাকা ṭaka ("Bangladeshi taka / money") · ঠিক ṭhik ("correct, OK") · ডাল ḍal ("lentils, dal") · ঢাকা Ḍhaka (the capital city)', 'টাকা (the BD currency unit) and ঢাকা (the capital) are everyday vocabulary that immediately train the retroflex.', [
      { target: 'ট ṭ', note: 'retroflex unaspirated; tongue tip curled back to roof' },
      { target: 'ঠ ṭh', note: 'retroflex aspirated; same curl with a puff of air' },
      { target: 'ড ḍ', note: 'voiced retroflex; tongue tip curled back, voicing on' },
      { target: 'ঢ ḍh', note: 'voiced aspirated retroflex; breathy ḍ' },
      { target: 'ণ ṇ', note: 'retroflex nasal; rare alone, common in conjuncts and tatsama words' },
    ], [ACT.stops]),
    createContentItem('ত থ দ ধ ন', 'tô thô dô dhô nô', 'The DENTAL row. Tongue tip on the BACK of the upper teeth, not the alveolar ridge (English "t" is alveolar — neither retroflex nor dental). ত t, থ th, দ d, ধ dh, ন n.', 'word', 'তুমি tumi ("you-familiar") · থামো thamo ("stop!") · দেশ desh ("country") · ধন্যবাদ dhonnobad ("thank you") · নাম nam ("name")', 'High-frequency vocabulary — every greeting and self-introduction uses these.', [
      { target: 'ত t', note: 'dental unaspirated; tongue tip on upper teeth, no puff' },
      { target: 'থ th', note: 'dental aspirated; same position with a puff (NOT the English "th" of "thin")' },
      { target: 'দ d', note: 'voiced dental unaspirated' },
      { target: 'ধ dh', note: 'voiced dental aspirated' },
      { target: 'ন n', note: 'dental nasal; common everywhere' },
    ], [ACT.stops]),
    createContentItem('প ফ ব ভ ম', 'pô phô bô bhô mô', 'The labial (lip) row. প p, ফ ph (NOT English "f" — it is aspirated p, although modern speech increasingly merges with /f/ in BD), ব b, ভ bh (used where Hindi has व/भ — Bengali has no separate /v/ phoneme, ভ covers both bh and v sounds), ম m.', 'word', 'পানি pani (BD water) · ফুল phul ("flower") · বই bôi ("book") · ভাষা bhasha ("language") · মা ma ("mother")', 'NO /V/: there is no native /v/ in Bengali; loanwords like "video" are written ভিডিও bhiḍio. The single biggest pronunciation difference from English loans.', [
      { target: 'প p', note: 'unvoiced unaspirated labial' },
      { target: 'ফ ph', note: 'unvoiced aspirated labial; in modern BD often pronounced as /f/, in WB closer to /pʰ/' },
      { target: 'ব b', note: 'voiced unaspirated labial' },
      { target: 'ভ bh', note: 'voiced aspirated labial; also covers /v/ in loanwords (ভিডিও bhiḍio "video")' },
      { target: 'ম m', note: 'labial nasal; same as English "m"' },
    ], [ACT.stops]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Retroflex vs Dental
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'মূর্ধন্য বনাম দন্ত্য',
      'mūrdhônnô vs dôntyô',
      'The retroflex/dental contrast is meaning-bearing in Bengali. Retroflex (ট ঠ ড ঢ ণ): tongue tip CURLED BACK touching the roof of the mouth. Dental (ত থ দ ধ ন): tongue tip on the BACK of the upper teeth. English /t/ and /d/ are neither — they are alveolar, halfway between.',
      'word',
      'টাকা ṭaka ("taka/money") vs তাকা taka (imperative "look!") · ডাল ḍal ("lentils") vs দাল dal (rare variant) · বাটা baṭa ("hub/center") vs বাতা bata ("railing")',
      'Native English speakers MUST consciously place the tongue; defaulting to English alveolar position sounds wrong in both directions.',
      [
        { target: 'টাকা ṭaka', note: 'retroflex ṭ; the BD currency unit; tongue curled back' },
        { target: 'তাকা taka', note: 'dental t; "look (imperative)"; tongue on upper teeth' },
        { target: 'minimal pair', note: 'spelling difference, meaning difference, retroflex vs dental difference — three layers' },
      ],
      [ACT.retroflexDental],
    ),
    createContentItem(
      'ড় ঢ় — ফ্ল্যাপ ব্যঞ্জন',
      'ṛô ṛhô — the flap retroflexes',
      'Two SPECIAL retroflex consonants written with a subscript dot (নুক্তা nukta): ড় ṛ (a flap, like the tap-r of American English "butter"), and ঢ় ṛh (aspirated flap). Distinct from ড ḍ and ঢ ḍh, which are full retroflex stops.',
      'word',
      'পড়া pôṛa ("to read/study") · বড় bôṛo ("big") · গাঢ় gaṛho ("dark, intense")',
      'These flap-retroflexes appear in some of the highest-frequency words in Bengali; the dot is essential.',
      [
        { target: 'ড ḍ vs ড় ṛ', note: 'stop vs flap; ḍ is held, ṛ is a quick tap' },
        { target: 'পড়া pôṛa', note: '"to read/study"; appears in every academic context' },
        { target: 'বড় bôṛo', note: '"big"; one of the first adjectives a learner meets' },
      ],
      [ACT.retroflexDental],
    ),
    createContentItem(
      'য় — অন্ত্য ইয়',
      'y — final iyô',
      'য় is the consonant য (y) with a subscript dot, used to write the final-y sound (like English "y" in "boy"). Often interchangeable with the kar ই-kar in writing endings. Crucial for pronouns and many verb endings.',
      'word',
      'বিশ্ববিদ্যালয় bishwobiddyaloyô ("university") · ছেলেমেয়ে chelemeye ("children")',
      'University of Dhaka (ঢাকা বিশ্ববিদ্যালয়) ends in this final-y consonant.',
      null,
      [ACT.retroflexDental],
    ),
    createContentItem(
      'উদাহরণ অনুশীলন',
      'udahôron ônushilôn',
      'Drill: read each minimal pair aloud, focusing only on the retroflex/dental contrast. Do not let your tongue settle on the English alveolar middle ground.',
      'sentence',
      'টা/তা · ঠা/থা · ডা/দা · ঢা/ধা · ণা/না',
      'Pure articulation drill; only the tongue position changes between left and right of each pair.',
      [
        { target: 'টা ṭa (retroflex)', note: 'tongue curled back' },
        { target: 'তা ta (dental)', note: 'tongue on upper teeth' },
        { target: 'avoid English /t/', note: 'never let the tongue rest on the alveolar ridge — that is neither one' },
      ],
      [ACT.retroflexDental],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Three Sibilants
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'তিন সিবিলান্ট',
      'tin shibilant',
      'Bengali writes three sibilants — শ (talobyô shô), ষ (mūrdhônnô shô), স (dôntyô sô) — but speaks only one (or two): in most positions, all three are pronounced "sh" /ʃ/. Before certain consonants, স may be pronounced "s". Historical Sanskrit had palatal/retroflex/dental distinctions; Bengali speech merged them.',
      'word',
      'শাড়ি shari ("sari") · ষাঁড় shãṛ ("bull") · সাত shat ("seven")',
      'All three above pronounced with the same initial "sh"; only spelling distinguishes them.',
      [
        { target: 'শ talobyô shô', note: '"palatal sh"; the default/most common spelling' },
        { target: 'ষ mūrdhônnô shô', note: '"retroflex sh"; appears in tatsama words and certain conjuncts (ষ্ণ, ক্ষ)' },
        { target: 'স dôntyô sô', note: '"dental s"; appears in tatsama words and certain clusters (স্ত, স্থ)' },
        { target: 'all → "sh" in speech', note: 'merging is complete in modern Bengali (slightly preserved in formal recitation)' },
      ],
      [ACT.sibilants],
    ),
    createContentItem(
      'স যখন "s" পড়া হয়',
      'when স is read "s"',
      'EXCEPTION: স is pronounced /s/ (not "sh") in some clusters: স্ত (st), স্থ (sth), স্ক (sk), স্প (sp), স্ম (sm). Also in many English loanwords transcribed with স (stop, store, stadium).',
      'word',
      'স্টেশন steshôn ("station") · স্কুল skūl ("school") · স্পষ্ট spôshṭô ("clear")',
      'High-frequency loanword vocabulary uses স as /s/; modern Bengali speech accommodates the English original.',
      [
        { target: 'স্ত স্থ স্ক স্প স্ম', note: 'consonant clusters that keep /s/' },
        { target: 'English loanwords', note: 'স used to write /s/ in loanwords; স্কুল, স্টেশন, স্পোর্টস' },
        { target: 'tatsama words', note: 'often "sh" even when written স: e.g., স্বাস্থ্য shashthô "health"' },
      ],
      [ACT.sibilants],
    ),
    createContentItem(
      'হ — হা ধ্বনি',
      'h — the ha sound',
      'হ is the aspirate /h/, like English "h" in "house". Common in greetings and Persian/Arabic loanwords (হাসপাতাল hashpatal "hospital"). Often combined as part of aspirated consonants (kh, gh, ch, jh, ṭh, ḍh, th, dh, ph, bh).',
      'word',
      'হ্যাঁ hyãn ("yes") · হাত hat ("hand") · হাসপাতাল hashpatal ("hospital")',
      'High-frequency consonant; the affirmative হ্যাঁ ("yes") is one of the first words learners need.',
      null,
      [ACT.sibilants],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Conjunct Consonants
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'যুক্তাক্ষর কী',
      'juktakkhor ki',
      'When two consonants meet WITHOUT an intervening vowel, they merge into a যুক্তাক্ষর juktakkhor — a single conjunct ligature. ক + ত = ক্ত (kt as in ভক্ত bhôkto "devotee"). Most fluent Bengali contains conjuncts in nearly every sentence.',
      'word',
      'ভক্ত bhôkto ("devotee") · ছাত্র chhatro ("student-male") · কষ্ট kôshṭô ("difficulty")',
      'Reading fluently requires recognizing the most common conjuncts as visual wholes, not parsing them letter by letter.',
      [
        { target: 'ক্ত k + t → kt', note: 'ক with hôshonto + ত; appears in ভক্ত, শক্ত, রক্ত' },
        { target: 'স্ত s + t → st', note: 'স + ত; appears in ছাত্র, রাস্তা, পোস্ট' },
        { target: 'ক্ষ k + ṣ → kkh', note: 'special; pronounced "kkho" in modern Bengali (e.g., শিক্ষা shikkha "education")' },
      ],
      [ACT.conjuncts],
    ),
    createContentItem(
      'য-ফলা',
      'yô-phôla',
      'A special subscript form of য (yô) used in conjuncts after another consonant. Written as ্য below or attached. Often pronounced as a gemination (doubling) of the preceding consonant OR as a /j/ glide, depending on word and dialect.',
      'word',
      'বিদ্যালয় biddyaloy ("school") · ব্যক্তি bekti ("person") · মূল্য mūlyô ("value, price")',
      'Common in tatsama/Sanskrit-derived vocabulary; the subscript -y often signals a more formal register.',
      [
        { target: 'দ্য = ddhô or dyô', note: 'subscript -y after দ; বিদ্যা biddya ("knowledge")' },
        { target: 'ব্য = byo or beko-', note: 'subscript -y after ব; ব্যক্তি bekti ("person")' },
        { target: 'lyô = lyô or geminated', note: 'মূল্য pronounced mūlyô or mullô depending on speaker' },
      ],
      [ACT.conjuncts],
    ),
    createContentItem(
      'র-ফলা ও রেফ',
      'rô-phôla and rêph',
      'TWO ways to combine the consonant র (r) in conjuncts: (1) র-ফলা rô-phôla = subscript -r AFTER another consonant (গ্র gr, প্র pr, ক্র kr); (2) রেফ rêph = superscript "r" mark BEFORE another consonant (র্থ rth, র্ম rm), pronounced as r + the following consonant.',
      'word',
      'প্রথম prôthôm ("first") · গ্রাম gram ("village") · অর্থ ôrthô ("meaning") · কর্ম kôrmô ("work, action")',
      'High-frequency in academic and literary vocabulary; rêph (superscript r) is one of the most distinctive visual features of Bangla.',
      [
        { target: 'র-ফলা (◌্র)', note: 'subscript r AFTER; consonant + r' },
        { target: 'রেফ (◌র্)', note: 'superscript r BEFORE; r + consonant' },
        { target: 'placement matters', note: 'গ্রাম (gram) vs ব্যর্থ (byôrthô "failed") — opposite placements' },
      ],
      [ACT.conjuncts],
    ),
    createContentItem(
      'সাধারণ যুক্তাক্ষর',
      'sadharôn juktakkhor',
      'Five extra-common conjuncts every learner must recognize visually: ক্ষ kkho (ক+ষ; "education" শিক্ষা), জ্ঞ ggô (জ+ঞ; "knowledge" জ্ঞান), হ্ম mho (হ+ম; "Brahman" ব্রাহ্মণ), ত্র tro (ত+র; "three" ত্রি), দ্ম dmô (দ+ম; rare but classical).',
      'word',
      'শিক্ষা shikkha ("education") · জ্ঞান ggyan ("knowledge") · ব্রাহ্মণ brahmôn ("Brahmin") · ত্রিভুজ tribhuj ("triangle")',
      'Each appears in vocabulary the learner will need by Unit 10 at the latest.',
      [
        { target: 'ক্ষ kkho', note: 'pronounced "kkho"; written as a distinct ligature, not visually decomposable' },
        { target: 'জ্ঞ ggô', note: 'pronounced "ggô" or "ggyô" depending on dialect (BD ggô / WB ggyô)' },
        { target: 'ত্র tro', note: 'common in tatsama and Sanskrit-loan words' },
      ],
      [ACT.conjuncts],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Bengali Numerals
    // ────────────────────────────────────────────────────────────────────
    createContentItem('০', 'shūnyô (0)', 'Zero. শূন্য shūnyô. Same as the Sanskrit/Hindi-Arabic numeral concept but written differently.', 'word', '০ — shūnyô', 'The Indian subcontinent gave the world the zero; Bengali numerals retain a distinct form.', null, [ACT.numerals]),
    createContentItem('১', 'ek (1)', 'One. এক ek. Used both as a numeral and a counting word.', 'word', '১ ek · একটি ekṭi ("one [thing]" with classifier)', 'Bengali nouns frequently take a classifier (-টি -ṭi / -টা -ṭa) when counted; "ek" alone is the abstract numeral.', null, [ACT.numerals]),
    createContentItem('২', 'dui (2)', 'Two. দুই dui. The colloquial form is দু du- in compounds (দুটি duṭi "two [things]").', 'word', '২ dui · দুটি duṭi', 'Bengali numerals often appear in compound forms with classifiers attached.', null, [ACT.numerals]),
    createContentItem('৩', 'tin (3)', 'Three. তিন tin.', 'word', '৩ tin · তিনটি tinṭi', 'Read as a single syllable "tin" — short i, dental n.', null, [ACT.numerals]),
    createContentItem('৪', 'char (4)', 'Four. চার char.', 'word', '৪ char · চারটি charṭi', 'High-frequency numeral; appears in time expressions ("4 o\'clock" চারটে charṭe).', null, [ACT.numerals]),
    createContentItem('৫', 'pãch (5)', 'Five. পাঁচ pãch. The candrabindu (◌ঁ) on পাঁ marks nasalization — the vowel is pronounced with air through the nose as well as the mouth.', 'word', '৫ pãch · পাঁচটি pãchṭi', 'Important to nasalize the vowel; পাচ pach (without candrabindu) is a different (much rarer) word.', null, [ACT.numerals]),
    createContentItem('৬', 'chhôy (6)', 'Six. ছয় chhôy. Note the final য় (semivowel y) — diphthongs ending in -y are common in Bengali numbers.', 'word', '৬ chhôy · ছ-টি chhôṭi', 'Compound forms drop the y: ছ-টি chhôṭi rather than ছয়টি.', null, [ACT.numerals]),
    createContentItem('৭', 'shat (7)', 'Seven. সাত shat. Note that স is pronounced "sh" before vowels.', 'word', '৭ shat · সাতটি shaṭṭi', 'High-frequency: appears in many proverbs and days-of-the-week constructions (সপ্তাহ shôptaho "week", from "seven").', null, [ACT.numerals]),
    createContentItem('৮', 'aṭ (8)', 'Eight. আট aṭ. Final retroflex ট ṭ — tongue curled back.', 'word', '৮ aṭ · আটটি aṭṭi', 'Note the gemination in compounds (aṭṭi) — the conjunct ট্ট.', null, [ACT.numerals]),
    createContentItem('৯', 'nôy (9)', 'Nine. নয় nôy. Inherent ô + final য়.', 'word', '৯ nôy · ন-টি nôṭi', 'Compound form drops the য়: ন-টি nôṭi.', null, [ACT.numerals]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Bangladesh vs West Bengal
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'পানি বনাম জল',
      'pani vs jol',
      'WATER — the single most famous vocabulary split between Bangladesh and West Bengal. পানি pani is the everyday Bangladeshi word (Perso-Arabic origin); জল jol is the everyday West Bengal word (Sanskrit origin). Using "pani" in Kolkata, or "jol" in Dhaka, is immediately recognizable as cross-border. Both are understood everywhere.',
      'word',
      'BD: এক গ্লাস পানি দিন। ek glas pani din. ("One glass of water please.") · WB: এক গ্লাস জল দিন। ek glas jol din.',
      'A small grocery clerk in Mymensingh will use pani; the same clerk in Howrah will use jol. Memorize both as a matched pair.',
      [
        { target: 'পানি pani (BD)', note: 'Perso-Arabic loan; the unmarked everyday word in Bangladesh' },
        { target: 'জল jol (WB)', note: 'Sanskrit origin; the unmarked everyday word in West Bengal' },
        { target: 'religious/cultural overlap', note: 'BD Hindus often use jol in religious contexts; WB Muslims often use pani; both understood everywhere' },
      ],
      [ACT.bdVsWb],
    ),
    createContentItem(
      'দাওয়াত বনাম নিমন্ত্রণ',
      'daoyat vs nimôntron',
      'INVITATION — Bangladesh prefers দাওয়াত daoyat (Arabic da\'wah), used for everything from a wedding to a meal at home. West Bengal prefers নিমন্ত্রণ nimôntron (Sanskrit), the formal default. The split reflects the religious-cultural histories of the two regions.',
      'word',
      'BD: তোমাকে দাওয়াত দিচ্ছি। tomake daoyat dicchi. ("I am inviting you.") · WB: তোমাকে নিমন্ত্রণ জানাচ্ছি। tomake nimôntron janacchi.',
      'Both words exist in both regions, but with different default registers and frequencies.',
      [
        { target: 'দাওয়াত daoyat (BD default)', note: 'Arabic; everyday word for any kind of invitation' },
        { target: 'নিমন্ত্রণ nimôntron (WB default)', note: 'Sanskrit; everyday word for invitations and formal occasions' },
        { target: 'cultural alignment', note: 'BD vocabulary tilts Perso-Arabic (Eid, namaz, dawat); WB vocabulary tilts Sanskrit (puja, snan, namaskar)' },
      ],
      [ACT.bdVsWb],
    ),
    createContentItem(
      'নমস্কার বনাম আসসালামু আলাইকুম',
      'nômoshkar vs assalamu alaikum',
      'GREETINGS — Bangladesh\'s majority-Muslim population overwhelmingly uses আসসালামু আলাইকুম assalamu alaikum (Arabic, "peace be upon you") as the default greeting. West Bengal\'s majority-Hindu population uses নমস্কার nômoshkar (Sanskrit, "I bow") with the hands joined. Both registers exist everywhere but track religious-cultural majority.',
      'word',
      'BD-Muslim default: আসসালামু আলাইকুম — reply: ওয়ালাইকুম আসসালাম walaikum assalam · WB-Hindu default: নমস্কার — reply: নমস্কার',
      'Pick the greeting that matches the addressee\'s tradition; using the wrong one is not offensive but marks you as an outsider.',
      [
        { target: 'আসসালামু আলাইকুম', note: 'Arabic; standard Muslim greeting throughout BD and among WB Muslims' },
        { target: 'নমস্কার nômoshkar', note: 'Sanskrit; standard Hindu greeting throughout WB and among BD Hindus' },
        { target: 'হ্যালো hyalo', note: 'casual borrowing from English "hello"; secular, works everywhere with peers' },
      ],
      [ACT.bdVsWb],
    ),
    createContentItem(
      'ঢাকাইয়া বনাম কলকাতার উচ্চারণ',
      'Ḍhakaiya vs Kôlkatar uccharôn',
      'PRONUNCIATION SPLIT — Dhaka-area speech tends to keep the inherent ô strong and word-final; pronunciation is generally slower and more deliberate. Kolkata-area speech often clips the inherent ô and speaks faster. Sylheti (northeast BD) has very different phonology again — almost a separate language to outsiders.',
      'sentence',
      'BD: ভাল আছ? bhalo achho? (slow, clear ô) · WB: ভাল আছ? bhalo achho? (faster, clipped final ô)',
      'The written sentence is identical; the spoken delivery differs. Both are correct Bengali.',
      [
        { target: 'BD Dhaka — slower, clearer ô', note: 'inherent vowel preserved; Perso-Arabic loanwords blend in' },
        { target: 'WB Kolkata — faster, clipped ô', note: 'inherent vowel often dropped finally; more rapid Sanskrit-derived speech' },
        { target: 'Sylheti regional', note: 'northeast BD; phonology and lexicon diverge enough that many speakers consider it a separate language' },
      ],
      [ACT.bdVsWb],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Reading Practice
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'পঠন অনুশীলন',
      'pôṭhôn ônushilôn',
      'Read this two-sentence self-introduction aloud, applying every Foundation rule: inherent ô, retroflex/dental contrast, sibilant merging, conjunct recognition, and (if Bangladeshi register) keeping the word-final ô.',
      'sentence',
      'আমার নাম সাবিনা। আমি ঢাকা বিশ্ববিদ্যালয়ের ছাত্রী।',
      'Translation: "My name is Sabina. I am a (female) student at the University of Dhaka."',
      [
        { target: 'আমার নাম amar nam', note: '"my name"; opens every self-introduction in Bengali' },
        { target: 'ঢাকা বিশ্ববিদ্যালয় Ḍhaka Bishwobiddyaloy', note: '"University of Dhaka" — the most prestigious public university in Bangladesh; established 1921' },
        { target: 'ছাত্রী chhatri', note: '"female student"; the male form is ছাত্র chhatro — gender is shown by suffix, not grammar' },
        { target: 'conjunct: শ্ব', note: 'in বিশ্ব bishwô ("world"); শ + ব → শ্ব' },
        { target: 'conjunct: দ্য', note: 'in বিদ্যা biddya ("knowledge"); দ + য → দ্য' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'WB রূপ',
      'WB rūp',
      'The same self-introduction in a West Bengal-typical register, with the school changed to Jadavpur University (Kolkata\'s major research university). Notice the identical written form but different cultural reference point.',
      'sentence',
      'আমার নাম শিউলি। আমি যাদবপুর বিশ্ববিদ্যালয়ের ছাত্রী।',
      'Translation: "My name is Shiuli. I am a (female) student at Jadavpur University." (Shiuli — শিউলি — is a flower name common in Bengali Hindu naming.)',
      [
        { target: 'যাদবপুর বিশ্ববিদ্যালয়', note: 'Jadavpur University, Kolkata; a leading public research university in WB (established 1955)' },
        { target: 'শিউলি Shiuli', note: 'a girl\'s name; refers to the night-flowering jasmine, a strong WB cultural symbol around Durga Puja' },
        { target: 'same grammar, different culture', note: 'syntax and morphology identical; only the proper nouns and naming conventions differ' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'অভ্যাসের প্রশ্ন',
      'ôbbhasher prôshnô',
      'Comprehension drill: identify in each word above which Foundation rule applies. (1) আমার — inherent ô retained, (2) নাম — dental n, (3) ছাত্রী — conjunct ত্র + ী-kar, (4) বিশ্ববিদ্যালয় — three conjuncts in sequence.',
      'sentence',
      'প্রশ্ন: ঢাকা শব্দে কোন ধ্বনি retroflex? প্রশ্ন: ছাত্রী-তে কয়টি যুক্তাক্ষর? (Q: Which sound in "Dhaka" is retroflex? Q: How many conjuncts in chhatri?)',
      'Answer pattern: ঢাকা → ঢ (ḍh) is retroflex aspirated; ছাত্রী → one conjunct (ত্র tro) + one kar (ী ī-kar).',
      null,
      [ACT.reading],
    ),
  ],
};

module.exports = level1Foundation;
