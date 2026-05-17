// Level 1 — Foundation: Modern Hebrew Alphabet, Niqqud & Pronunciation
// First lesson on the Hebrew / Foundation track. Pre-grammar, pre-vocabulary.
// Covers the 22 consonants (Alefbet), final letters, niqqud vowels, the guttural
// series, bgd-kpt softening, qamatz/patach distinction, stress patterns
// (mil'el vs mil'ra), shva mobile/quiescent, and the modern Israeli pronunciation
// vs historical Sephardi/Ashkenazi variants.
//
// All content is authored with Hebrew script (target, RTL) + simplified Latin
// transliteration + English glosses (canonical source). The AI conversation tutor
// reads this curriculum and delivers it to each learner in their preferred native
// language at runtime — never assume a specific L1 in this file.
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
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  intro: 'he-foundation-intro',
  alefbet: 'he-foundation-alefbet',
  finalLetters: 'he-foundation-final-letters',
  gutturals: 'he-foundation-gutturals',
  bgdkpt: 'he-foundation-bgdkpt',
  niqqud: 'he-foundation-niqqud',
  qamatzPatach: 'he-foundation-qamatz-patach',
  shva: 'he-foundation-shva',
  stress: 'he-foundation-stress',
  readingDirection: 'he-foundation-reading-direction',
  unpointedText: 'he-foundation-unpointed-text',
  practice: 'he-foundation-practice',
};

const activities = [
  {
    id: ACT.intro,
    section: 'Why the Alefbet & Niqqud',
    title: 'אלפבית — How Hebrew sound is organized',
    goals: [
      'Understand that Hebrew is written right-to-left using a 22-letter abjad (consonant-only) script, with vowel marks (niqqud) optionally added below or beside letters.',
      'Know that adult Hebrew texts (newspapers, books, signs, WhatsApp) almost never use niqqud — readers infer vowels from context, so the Alefbet matters more than the vowel marks for daily reading.',
      'See that Modern Israeli Hebrew has merged several historical consonant pairs (alef/ayin, tet/tav, kaf/quf) into single sounds, but the spelling still distinguishes them.',
    ],
    task: 'Read the four structural facts. By the end of this lesson you should be able to identify every Alefbet letter, apply bgd-kpt softening, and stress Hebrew words correctly.',
  },
  {
    id: ACT.alefbet,
    section: 'The 22 Letters',
    title: 'אותיות הא"ב — The Alefbet',
    goals: [
      'Recognize and name all 22 Hebrew letters in order: alef, bet, gimel, dalet, he, vav, zayin, chet, tet, yud, kaf, lamed, mem, nun, samech, ayin, pe, tzadi, qof, resh, shin, tav.',
      'Distinguish letter pairs that share a base form: ב/כ (bet/kaf) and ר/ד (resh/dalet) — the most common confusion points for new learners.',
      'Know that letters also serve as numerals (gematria): א=1, ב=2, … י=10, כ=20, ל=30 — used in Jewish religious dates and traditional numbering.',
    ],
    task: 'Read each letter aloud with its name and primary sound. Drill the visually similar pairs ב/כ and ר/ד until you can spot them at a glance.',
  },
  {
    id: ACT.finalLetters,
    section: 'Final Letter Forms',
    title: 'אותיות סופיות — Sofit forms',
    goals: [
      'Recognize the five letters that change shape at the end of a word: כ→ך (kaf→khaf sofit), מ→ם (mem→mem sofit), נ→ן (nun→nun sofit), פ→ף (pe→fe sofit), צ→ץ (tzadi→tzadi sofit).',
      'Apply the final-form rule consistently: שלום uses regular mem, but in שָׁלוֹם at the end of a word it uses sofit ם. Mid-word always uses the regular form.',
      'Understand that the final forms are purely visual — they do not change the sound, only the letter shape when it ends a word.',
    ],
    task: 'Read aloud מים (mayim, water), שמש (shemesh, sun), מלך (melech, king) — identify the final letters and contrast them with the same letters mid-word.',
  },
  {
    id: ACT.gutturals,
    section: 'Guttural Sounds',
    title: 'אותיות גרוניות — The throat letters',
    goals: [
      'Identify the four guttural letters: א (alef, glottal stop or silent), ה (he, light h), ח (chet, voiceless velar fricative like Scottish "loch"), ע (ayin, historically pharyngeal, mostly silent in Modern Israeli).',
      'Pronounce ח (chet) as a back-of-throat "kh" — this is the most distinctive Hebrew consonant for English speakers; common in words like חבר (chaver, friend) and חג (chag, holiday).',
      'Know that in Modern Israeli Hebrew, ע (ayin) has merged with א (alef) for most speakers — both become a glottal stop or silent break, though Mizrahi speakers preserve the pharyngeal sound.',
    ],
    task: 'Practice ח (chet) on these five words: חבר (chaver), חג (chag), חם (cham, hot), חתול (chatul, cat), חלום (chalom, dream).',
  },
  {
    id: ACT.bgdkpt,
    section: 'Bgd-Kpt Softening',
    title: 'בגדכפת — Plosive/fricative pairs',
    goals: [
      'Apply the bgd-kpt rule: six letters (ב ג ד כ פ ת) historically had a hard (plosive) sound after silence/consonant and a soft (fricative) sound after vowel. In Modern Israeli only three pairs remain active: ב (b/v), כ (k/kh), פ (p/f).',
      'See the pattern in action: בית (bayit, house) starts with /b/ but הבית (ha-bayit, the house) the ב stays /b/; vs לבד (levad, alone) where ב in the middle softens to /v/.',
      'Recognize that ג ד ת no longer soften in Modern Israeli pronunciation — historical Ashkenazi /θ/ for soft tav has been replaced by /t/ across the board.',
    ],
    task: 'Read these word pairs aloud: בָּא (ba, came) vs לָבוֹא (lavo, to come) · כָּתַב (katav, wrote) vs לִכְתּוֹב (likhtov, to write) · פָּתַח (patach, opened) vs לִפְתּוֹחַ (liftoach, to open).',
  },
  {
    id: ACT.niqqud,
    section: 'Vowel Marks',
    title: 'ניקוד — Niqqud system',
    goals: [
      'Recognize the 10 main niqqud signs: kamatz (ָ /a/), patach (ַ /a/), tzere (ֵ /e/), segol (ֶ /e/), chiriq (ִ /i/), cholam (וֹ /o/), kubutz (ֻ /u/), shuruk (וּ /u/), shva (ְ /ə/ or silent), and the chataf vowels for gutturals.',
      'Know that niqqud appear BELOW or BESIDE the consonant, never above (except the cholam dot, which sits above-left).',
      'Understand that niqqud are used in textbooks, dictionaries, children\'s books, poetry, religious texts, and to disambiguate — but NOT in everyday writing.',
    ],
    task: 'Read these fully-pointed words: שָׁלוֹם (shalom), בַּיִת (bayit), מֶלֶךְ (melech), אִישׁ (ish), חָבֵר (chaver) — naming each niqqud aloud.',
  },
  {
    id: ACT.qamatzPatach,
    section: 'Qamatz vs Patach',
    title: 'קמץ וקמץ קטן — The /a/ vs /o/ distinction',
    goals: [
      'Pronounce kamatz gadol (ָ) as /a/ in most positions — historically Sephardi/Modern Israeli, opposed to Ashkenazi /o/ pronunciation in religious contexts.',
      'Recognize kamatz katan (the same ָ mark) which is pronounced /o/ in specific positions — most commonly in closed unstressed syllables, as in כָּל־ (kol, "all of").',
      'Know that the distinction matters for reading aloud religious texts, place names (חָכְמָה chochmah vs חָכָם chacham), and traditional poetry; in everyday speech the difference is usually clear from context.',
    ],
    task: 'Compare these contrastive pairs: חָכָם (chacham, wise) vs חָכְמָה (chochmah, wisdom) · כָּל (kol, all) vs כָּלָה (kalah, bride) — feel the /a/ vs /o/ shift.',
  },
  {
    id: ACT.shva,
    section: 'Shva — Mobile and Quiescent',
    title: 'שווא — The reduced vowel',
    goals: [
      'Distinguish shva na (mobile, ə-like or short /e/) from shva nach (quiescent, silent). Shva na typically appears at the start of a syllable; shva nach closes a syllable.',
      'Pronounce shva na as a brief /e/ in most cases: שְׁמוֹ (shemo, "his name") starts with sh-e-mo, not "shmo".',
      'Recognize that Modern Israeli often drops or shortens shva na in casual speech — "shemo" becomes essentially "shmo" — but in careful or formal speech the brief /e/ should be heard.',
    ],
    task: 'Read these words noting where shva sounds: לְהִתְרָאוֹת (lehitra\'ot, see you), שְׁלֹמֹה (Shlomo), בְּרָכָה (bracha, blessing) — identify shva na (sounded) vs shva nach (silent).',
  },
  {
    id: ACT.stress,
    section: 'Stress Placement',
    title: 'הטעמה — Mil\'el vs mil\'ra',
    goals: [
      'Place stress on the LAST syllable (mil\'ra) by default — this is the dominant pattern in Modern Hebrew: shalom (sha-LOM), bayit (ba-YIT), chaver (cha-VER).',
      'Recognize mil\'el (penultimate) stress in a smaller class of words: yeled (YE-led, child), erev (E-rev, evening), boker (BO-ker, morning), and in segolate noun pattern words.',
      'Apply correct stress for meaning differentiation: בָּקְרָה (BO-kra, morning-acc) vs בָּקְרָה (bok-RA, "criticized her") — same letters, different stress, different meaning.',
    ],
    task: 'Stress these correctly: שלום (sha-LOM), בית (ba-YIT), ילד (YE-led), בוקר (BO-ker), כלב (KE-lev), חבר (cha-VER), מורה (mo-RAH).',
  },
  {
    id: ACT.readingDirection,
    section: 'Reading Direction & Punctuation',
    title: 'מימין לשמאל — Right-to-left reading',
    goals: [
      'Read Hebrew right-to-left: the first letter is the rightmost; pages turn from what English readers see as "back to front".',
      'Recognize that Hebrew punctuation uses the same marks as English (period, comma, question mark) but they sit on the right side of the line; numbers within Hebrew text still read left-to-right.',
      'Know that quotation marks in Hebrew are " or " around the quoted text (the gershayim mark, also used in acronyms like צה"ל Tzahal = IDF).',
    ],
    task: 'Read this sentence right-to-left: שלום, אני יוסי. Identify the first word (שלום) and the last word (יוסי).',
  },
  {
    id: ACT.unpointedText,
    section: 'Reading Without Niqqud',
    title: 'כתב ללא ניקוד — Ktav lelo niqqud',
    goals: [
      'Read everyday Hebrew (newspapers, signs, WhatsApp, books) which lacks niqqud — vowel choice is inferred from word recognition and context.',
      'Apply the ktiv male ("full spelling") convention used in unpointed texts: ו indicates /o/ or /u/, י indicates /i/ — so שָׁלוֹם is spelled שלום (with the vav) and אִישׁ is spelled איש (with the yud).',
      'Understand that the Hebrew Academy officially regulates ktiv male; mastery of unpointed reading is the marker of real Hebrew literacy.',
    ],
    task: 'Read these unpointed words and infer the vowels: שלום (shalom), בוקר (boker), מים (mayim), אישה (isha), חתול (chatul), ספר (sefer/safar/saper depending on context).',
  },
  {
    id: ACT.practice,
    section: 'Reading Practice',
    title: 'קריאה — Read your first paragraph',
    goals: [
      'Read a short pointed paragraph aloud, applying all rules from this lesson: letter recognition, niqqud, bgd-kpt softening, stress, and shva.',
      'Move to the same paragraph without niqqud and read it with the same fluency, demonstrating that you can infer vowels from word shape.',
    ],
    task: 'Read the four-sentence paragraph below with niqqud first, then again without niqqud. Each sentence introduces a Hebrew anchor (Jerusalem, Tel Aviv, the Kotel, Hebrew University).',
  },
];

const lesson = {
  title: 'Level 1 · Foundation: האלפבית והניקוד — Hebrew Letters and Vowels',
  category: 'foundation',
  difficulty: 'beginner',
  targetLang: 'he',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'foundation',
  activities,
  expressionPractice: [],
  relatedPools: ['topic-foundation', 'topic-orthography'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Intro
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'עברית מודרנית',
      'ivrit modernit',
      'Modern Hebrew (the language revived as a daily spoken language in Israel from the late 19th century) is written right-to-left in a 22-letter consonant script. Vowel marks (niqqud) are optional and rarely used in adult texts — readers infer vowels from context and word shape.',
      'word',
      'עברית — ivrit — the language of the Israelites; used today in Israel as the everyday spoken and written language.',
      'About 9 million speakers; the language of Israeli media, government, education, and the IDF.',
      null,
      [ACT.intro],
    ),
    createContentItem(
      'אבג"ד = אבגד',
      'alef-bet-gimel-dalet',
      'The Hebrew alphabet is called the alefbet (after its first two letters: alef + bet). It is an abjad — a writing system that originally encoded only consonants, with vowels added later as small marks (niqqud) below or beside the letters.',
      'word',
      'א ב ג ד — the first four letters; the source of the English alphabet through Phoenician → Greek → Latin.',
      'Hebrew, Arabic, Aramaic, and Phoenician all share this 22-letter consonantal base; only Hebrew added the optional niqqud system around the 7th century CE (Tiberian Masoretes).',
      null,
      [ACT.intro],
    ),
    createContentItem(
      'מימין לשמאל',
      'mi-yamin li-smol',
      'Hebrew reads right-to-left: the first letter of a word is the rightmost one. Pages turn what English readers would call "back to front". Numbers within Hebrew text still read left-to-right, which creates bidirectional layout challenges in software.',
      'word',
      'שלום — read right-to-left: ש (shin), ל (lamed), ו (vav), ם (mem sofit) = sh-l-o-m = "shalom".',
      'Every Israeli keyboard switches typing direction; on WhatsApp this is automatic, but in code editors you may need bidirectional support.',
      [
        { target: 'ש (rightmost)', note: 'first letter; shin /sh/' },
        { target: 'ל', note: 'second letter; lamed /l/' },
        { target: 'ו', note: 'third letter; vav, here marking /o/ vowel' },
        { target: 'ם (leftmost)', note: 'final letter; mem sofit /m/, ends the word' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'בלי ניקוד',
      'bli niqqud',
      'Adult Hebrew texts (newspapers, novels, signs, WhatsApp, government documents) do NOT use niqqud. Niqqud appears only in textbooks, dictionaries, children\'s books, poetry, religious texts, and to disambiguate rare words. Reading without niqqud is the real literacy benchmark.',
      'word',
      'הארץ (Haaretz, the major Israeli newspaper) is printed entirely without niqqud — readers infer vowels from word shape and context.',
      'In this curriculum, Level 1 uses niqqud for clarity; later levels increasingly drop it, mirroring the real-world Hebrew literacy progression.',
      null,
      [ACT.intro],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Alefbet
    // ────────────────────────────────────────────────────────────────────
    createContentItem('א', 'alef', 'The first letter of the alefbet. Acts as a "silent" placeholder for a vowel: pronounced as a glottal stop (the catch in "uh-oh") or simply marks where a vowel begins. Never has its own consonant sound in Modern Israeli.', 'word', 'אבא (aba, dad) — the alef is silent; you hear "a-ba".', 'Alef is also the numerical 1 in gematria; appears in dates and traditional numbering.', null, [ACT.alefbet]),
    createContentItem('ב', 'bet/vet', 'Two sounds: /b/ when hard (with a dagesh dot inside: בּ) and /v/ when soft (no dot: ב). In unpointed text the same letter ב serves both — context decides. בּ at word start = /b/; ב after a vowel often = /v/.', 'word', 'בית (bayit, house) /b/ vs אבא (aba, dad) /v/ in some dialects, though modern aba uses /b/.', 'Bet is numerical 2; appears in the very first word of the Torah (בראשית, Bereshit).', null, [ACT.alefbet]),
    createContentItem('ג', 'gimel', 'Always pronounced /g/ as in "go" in Modern Israeli Hebrew. The historical soft form (/gh/, like Spanish g in "lago") has been lost — modern Hebrew reads ג as /g/ in all positions.', 'word', 'גמל (gamal, camel) — straightforward /g/.', 'In foreign loanwords, ג׳ (gimel with a geresh apostrophe) represents /dʒ/ as in "jazz" → ג׳אז.', null, [ACT.alefbet]),
    createContentItem('ד', 'dalet', 'Pronounced /d/ as in "dog" in all positions in Modern Israeli. The historical soft form (/ð/, English "th" in "the") has been lost in modern speech.', 'word', 'דלת (delet, door) — note the word DALET literally means "door" in old Semitic; the letter shape originally pictured a tent flap.', 'Visually very similar to ר (resh); the only difference is the small "heel" on the upper-right corner of dalet.', null, [ACT.alefbet]),
    createContentItem('ה', 'he', 'Pronounced /h/ as in English "house" at the start of a syllable; SILENT at the end of a word (where it usually marks a final /a/ or /e/ vowel). Often dropped entirely in casual speech: "אהבה" (ahavah, love) is heard as "ahava".', 'word', 'הר (har, mountain) /h/ vs מורה (morah, female teacher) where final ה is silent.', 'The definite article "the" in Hebrew is just ה- prefixed to the noun: הבית (ha-bayit) = "the house".', null, [ACT.alefbet]),
    createContentItem('ו', 'vav', 'Three uses: /v/ as a consonant (וֶרֶד, vered, rose); /o/ as a vowel marker when written וֹ; /u/ when written וּ. In unpointed text, ו by itself usually marks /o/ or /u/ inside a word.', 'word', 'שלום (shalom) — the ו here marks /o/; דוד (dod, uncle) — the ו marks /o/.', 'Vav is also the conjunction "and": ו- prefixed to a word means "and …" (לחם וחלב lechem ve-chalav = "bread and milk").', null, [ACT.alefbet]),
    createContentItem('ז', 'zayin', 'Pronounced /z/ as in English "zoo". Always voiced; no soft variant.', 'word', 'זמן (zman, time) — pure /z/ start.', 'Numerical value 7; appears in religious contexts (the 7 days of the week).', null, [ACT.alefbet]),
    createContentItem('ח', 'chet', 'Pronounced as a back-of-throat /kh/ (voiceless velar fricative, like Scottish "loch", German "Bach", Spanish "j" in "jamón"). This is the most distinctive Hebrew sound for English speakers — historically pharyngeal /ħ/, now velar in mainstream Modern Israeli.', 'word', 'חבר (chaver, friend) — opens with the velar /kh/ sound.', 'Crucial in everyday words: חג (chag, holiday), חי (chai, alive), חם (cham, hot), חתול (chatul, cat). English speakers tend to under-aspirate it; lean into the throat.', null, [ACT.alefbet]),
    createContentItem('ט', 'tet', 'Pronounced /t/ identically to ת (tav) in Modern Israeli. Historically a distinct emphatic /tˤ/ (like Arabic ط), but the distinction has been lost in everyday speech. Spelling preserves both.', 'word', 'טוב (tov, good) — straightforward /t/.', 'Numerical value 9; in Israeli slang, ט וב on Yom Kippur cards greets "tov" (good year).', null, [ACT.alefbet]),
    createContentItem('י', 'yud', 'Two uses: /y/ as a consonant (יום yom, day); marks /i/ or /e/ as a vowel letter (ים yam, sea — here functioning as part of the vowel cluster). Tiny in shape — the smallest Hebrew letter.', 'word', 'ילד (yeled, child) /y/ vs ספריה (sifriya, library) where the י inside marks /i/.', 'Numerical value 10; the first letter of the divine name יהוה.', null, [ACT.alefbet]),
    createContentItem('כ', 'kaf/khaf', 'Two sounds: /k/ when hard (with dagesh: כּ) and /kh/ when soft (without: כ). The soft form sounds identical to ח (chet) in Modern Israeli — both are the velar fricative. Has a final form ך (khaf sofit).', 'word', 'כלב (kelev, dog) /k/ vs ברכה (bracha, blessing) where the כ in middle is soft /kh/.', 'Numerical value 20; the word "kosher" (כשר, kasher) starts with this letter.', null, [ACT.alefbet]),
    createContentItem('ל', 'lamed', 'Pronounced /l/ as in English "love". Always voiced; no soft variant. The tallest letter in the alefbet — its top extends above the line.', 'word', 'לחם (lechem, bread) — clear /l/ start.', 'The infinitive prefix in Hebrew is ל- (le- or li-): ללכת (lalechet, to walk), לאכול (le\'echol, to eat).', null, [ACT.alefbet]),
    createContentItem('מ', 'mem', 'Pronounced /m/ as in English "mom". Has a final form ם (mem sofit) used only at the end of a word. The final form looks like a closed square.', 'word', 'מים (mayim, water) — note the regular מ at the start, and the same letter "mid-word" rule, with sofit ם only at the very end of words.', 'Numerical value 40; the word "מלך" (melech, king) ends with the final form ך, not regular כ.', null, [ACT.alefbet]),
    createContentItem('נ', 'nun', 'Pronounced /n/ as in English "no". Has a final form ן (nun sofit) — a long vertical line that extends below the baseline.', 'word', 'נחמד (nechmad, nice) — clear /n/ start; sofit appears in בן (ben, son).', 'Numerical value 50; the word "נר" (ner, candle) is symbolic in Hanukkah.', null, [ACT.alefbet]),
    createContentItem('ס', 'samech', 'Pronounced /s/ as in English "sun". One of two letters with /s/ sound (the other is שׂ, shin with the dot on the left). Visually a closed circle.', 'word', 'ספר (sefer, book) — clear /s/ start.', 'Numerical value 60; not present in the early stages of Hebrew development — historically interchangeable in some words with שׂ.', null, [ACT.alefbet]),
    createContentItem('ע', 'ayin', 'Historically a voiced pharyngeal /ʕ/, but in mainstream Modern Israeli pronounced as a glottal stop or simply silent — merged with א (alef) for most speakers. Mizrahi (Middle Eastern Jewish) speakers preserve the pharyngeal /ʕ/.', 'word', 'עברית (ivrit, Hebrew) — the ע is essentially silent in modern pronunciation, just marking where the vowel /i/ begins.', 'The merger of ע and א is one of the most contested features of Modern Israeli; television newscasters historically distinguished them, but younger speakers do not.', null, [ACT.alefbet]),
    createContentItem('פ', 'pe/fe', 'Two sounds: /p/ when hard (with dagesh: פּ) and /f/ when soft (without: פ). Has a final form ף (fe sofit). Bgd-kpt soft form appears after vowels in many roots.', 'word', 'פה (po, here) /p/ vs יפה (yafe, beautiful) where the פ in middle is soft /f/.', 'Numerical value 80; "פלאפל" (felafel) starts with the soft /f/.', null, [ACT.alefbet]),
    createContentItem('צ', 'tzadi', 'Pronounced /ts/ as in English "cats" or German "z" in "Zeit". Has a final form ץ (tzadi sofit). Often transliterated as "tz" or "ts" in English (and sometimes "z" in older orthographies).', 'word', 'צבא (tzava, army) — clear /ts/ start.', 'In loanwords, צ׳ with a geresh represents /tʃ/ as in "chip" → צ׳יפס.', null, [ACT.alefbet]),
    createContentItem('ק', 'qof', 'Pronounced /k/ identically to כּ (hard kaf) in Modern Israeli. Historically a distinct uvular /q/ (like Arabic ق), but the distinction has been lost in mainstream Modern Israeli. Spelling preserves both.', 'word', 'קפה (kafe, coffee) — straightforward /k/.', 'Numerical value 100; appears in קמפוס (kampus, campus) and many other loanwords from English.', null, [ACT.alefbet]),
    createContentItem('ר', 'resh', 'Pronounced as a uvular /ʁ/ (back-of-throat trill, similar to French "r" in "Paris" or German "r") in mainstream Modern Israeli. Some Mizrahi and Yemenite speakers use the older Sephardi alveolar trill /r/ (like Spanish "rr").', 'word', 'רחוב (rechov, street) — opens with the uvular /ʁ/ sound.', 'Visually similar to ד (dalet); resh has a rounded top corner with no "heel".', null, [ACT.alefbet]),
    createContentItem('ש', 'shin/sin', 'Two sounds: /sh/ when the dot is on the upper-right (שׁ) and /s/ when the dot is on the upper-left (שׂ). In unpointed text the dot is omitted — context decides. The /sh/ form is far more common.', 'word', 'שלום (shalom) /sh/ vs ישראל (Yisrael) where one ש acts as /s/ in the historical name.', 'Numerical value 300; the shin shape appears on tefillin straps.', null, [ACT.alefbet]),
    createContentItem('ת', 'tav', 'Pronounced /t/ identically to ט (tet) in Modern Israeli. Historically had a soft form /θ/ (English "th" in "thin") in Sephardi tradition and /s/ in Ashkenazi tradition, but the modern standard uses /t/ in all positions.', 'word', 'תודה (toda, thanks) — clear /t/ start.', 'Last letter of the alefbet; numerical value 400; the word "torah" (תורה) starts with this letter.', null, [ACT.alefbet]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Final Letters
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'אותיות סופיות',
      'otiyot sofiyot',
      'Five letters change shape at the end of a word: כ→ך, מ→ם, נ→ן, פ→ף, צ→ץ. The sound is identical to the regular form; only the visual shape changes. Mid-word always uses the regular form.',
      'word',
      'מנכ"ל (menakhel, CEO) — only the very last כ becomes ך as it ends the word.',
      'The mnemonic for final letters: כמנפץ (kaf-mem-nun-pe-tzadi) — the five that change.',
      [
        { target: 'כ → ך', note: 'kaf → khaf sofit; extends below the baseline' },
        { target: 'מ → ם', note: 'mem → mem sofit; becomes a closed square' },
        { target: 'נ → ן', note: 'nun → nun sofit; a tall vertical line' },
        { target: 'פ → ף', note: 'pe → fe sofit; extends below the baseline' },
        { target: 'צ → ץ', note: 'tzadi → tzadi sofit; tall vertical extension' },
      ],
      [ACT.finalLetters],
    ),
    createContentItem(
      'דוגמאות',
      'dugma\'ot',
      'Practice examples: מים (mayim, water — mid-word mem inside, no sofit at start, sofit ם at end), שמש (shemesh, sun — uses sofit ש... wait, shin does NOT have a final form; let\'s use ילד yeled, child — uses regular ד at the end since dalet has no sofit), עץ (etz, tree — sofit ץ at the very end), and מלך (melech, king — sofit ך at end).',
      'word',
      'מים, ילד, עץ, מלך, ברוך (baruch, blessed; with sofit ך at end).',
      'Only the five letters כמנפץ have sofit forms; all others use the same shape regardless of position.',
      null,
      [ACT.finalLetters],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Gutturals
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'אותיות גרוניות',
      'otiyot gronyot',
      'The four gutturals — א ה ח ע — are produced in the throat. They affect surrounding vowels (preferring patach /a/) and reject doubling (dagesh). They are essential for understanding many irregular verb forms in Hebrew.',
      'word',
      'אהחע — alef, he, chet, ayin: the throat letters.',
      'Verbs whose root contains a guttural belong to "weak" conjugation classes with predictable irregularities — a key Level 3 topic.',
      [
        { target: 'א alef', note: 'glottal stop or silent placeholder' },
        { target: 'ה he', note: 'light /h/, silent at word end' },
        { target: 'ח chet', note: 'velar fricative /kh/, like Scottish "loch"' },
        { target: 'ע ayin', note: 'historically pharyngeal /ʕ/, mostly silent in modern Israeli' },
      ],
      [ACT.gutturals],
    ),
    createContentItem(
      'ח חבר',
      'chet — chaver',
      'The chet /kh/ is the most distinctive Hebrew consonant for English speakers. Practice with these everyday words: חבר (chaver, friend), חג (chag, holiday), חם (cham, hot), חתול (chatul, cat), חלום (chalom, dream). The sound is back of the throat, not the tongue.',
      'word',
      'חג שמח! (chag sameach! — happy holiday!) — the universal Israeli greeting on any holiday, starts with two /kh/ sounds in chag and ends with one in sameach.',
      'Don\'t pronounce חבר as "haver" (English /h/) — that sounds like a child or a tourist. The Israeli ear is sharp on chet.',
      null,
      [ACT.gutturals],
    ),
    createContentItem(
      'ע vs א',
      'ayin vs alef',
      'In mainstream Modern Israeli, ע (ayin) has merged with א (alef) — both are glottal stops or silent placeholders. The historical distinction (pharyngeal /ʕ/ for ayin) is preserved by some Mizrahi and Yemenite speakers but absent from broadcast Hebrew.',
      'word',
      'עברית (ivrit, Hebrew) and אבא (aba, dad) — both start with a glottal stop in modern pronunciation.',
      'Spelling distinguishes them, so the merger creates homophones for learners: עין (ayin, eye) and אין (ein, "there is not") sound nearly identical in casual speech.',
      [
        { target: 'historical ע', note: 'voiced pharyngeal /ʕ/, like Arabic ع' },
        { target: 'modern ע', note: 'glottal stop or silent, merged with alef' },
        { target: 'Mizrahi/Yemenite ע', note: 'preserves the /ʕ/ pharyngeal sound' },
      ],
      [ACT.gutturals],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Bgd-Kpt
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'בגדכפת',
      'bgd-kpt',
      'Six letters historically had hard (plosive) and soft (fricative) variants: ב/v, ג/gh, ד/dh, כ/kh, פ/f, ת/th. The hard form is marked with a dagesh dot inside the letter; the soft has no dot. Modern Israeli preserves only THREE active pairs: ב (b/v), כ (k/kh), פ (p/f). The other three (ג ד ת) no longer soften — they are always /g/ /d/ /t/.',
      'word',
      'Active pairs: ב/v, כ/kh, פ/f. Lost pairs: ג, ד, ת — always hard in Modern Israeli.',
      'The bgd-kpt mnemonic is the sequence of the six historical "softening" letters, spelled out as a memory word.',
      [
        { target: 'ב /b/ → /v/', note: 'active in modern: בית /b/, אבא /v/-ish though usually /b/' },
        { target: 'כ /k/ → /kh/', note: 'active in modern: כלב /k/, ברכה /kh/' },
        { target: 'פ /p/ → /f/', note: 'active in modern: פה /p/, יפה /f/' },
        { target: 'ג ד ת', note: 'historically softened, but no longer in modern Israeli — always hard' },
      ],
      [ACT.bgdkpt],
    ),
    createContentItem(
      'כללי הריכוך',
      'klalei ha-rikuch',
      'The softening rule: a bgd-kpt letter softens after a vowel (within or across morpheme boundaries). It stays hard after a closed syllable or at the very start. So בית (bayit, house) starts with /b/, but לבד (levad, alone) has /v/ because the ב is between vowels.',
      'word',
      'בא ba (came) /b/ at word start vs לבוא lavo (to come) /v/ between vowels.',
      'In modern verb forms, the prefix לְ- (le-, to) often triggers softening on the first root letter of an infinitive.',
      [
        { target: 'word start → hard', note: 'בית /b/, כלב /k/, פה /p/' },
        { target: 'after vowel → soft', note: 'לבד /v/, ברכה /kh/, יפה /f/' },
        { target: 'after consonant → hard', note: 'preserves the plosive: יכבד /k/ stays' },
      ],
      [ACT.bgdkpt],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Niqqud
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'ניקוד',
      'niqqud',
      'The niqqud system marks vowels with small signs below or beside consonants. Developed by the Masoretes of Tiberias around the 7th century CE to preserve the pronunciation of biblical Hebrew. Used in textbooks, dictionaries, children\'s books, poetry, and religious texts — but not in everyday writing.',
      'word',
      'שָׁלוֹם — kamatz (ָ) under shin = /a/, cholam (וֹ) above vav = /o/.',
      'Three eras: pre-niqqud biblical scrolls were consonant-only; the Masoretes added marks around 700 CE; the modern Israeli Hebrew Academy regulates the official ktiv male (full spelling) for unpointed text.',
      null,
      [ACT.niqqud],
    ),
    createContentItem('ָ קמץ', 'kamatz', 'Pronounced /a/ in most positions. Looks like a "T" sign below the consonant. In specific positions (closed unstressed syllables) it is pronounced /o/ as kamatz katan, but the everyday default is /a/.', 'word', 'דָּג (dag, fish) — kamatz under the ד gives /a/.', 'Ashkenazi tradition pronounces all kamatz as /o/ in religious texts (kometz); Sephardi/Modern Israeli reads it as /a/ except for kamatz katan.', null, [ACT.niqqud]),
    createContentItem('ַ פתח', 'patach', 'Pronounced /a/, identical to kamatz in modern speech. Looks like a horizontal line below the consonant. Common in many word patterns including imperatives and segolate nouns.', 'word', 'בַּת (bat, daughter) — patach under the ב gives /a/.', 'Furtive patach appears before a final guttural (ח, ע, ה) and is pronounced BEFORE the guttural: רוּחַ (ruach, wind) — read "ru-ACH" with the /a/ slipped in before the chet.', null, [ACT.niqqud]),
    createContentItem('ֵ צירה', 'tzere', 'Pronounced /e/ (mid-high front vowel, like English "bait" without the glide). Two horizontal dots below the consonant. Common in segolate nouns and certain verb forms.', 'word', 'אֵם (em, mother) — tzere under alef gives /e/.', 'In modern Israeli, tzere and segol (ֶ) have nearly merged — both pronounced /e/ — but spelling preserves the distinction.', null, [ACT.niqqud]),
    createContentItem('ֶ סגול', 'segol', 'Pronounced /e/ (mid-low front vowel). Three dots in a triangle below the consonant. Gives the "segolate" noun pattern its name: yeled (child), erev (evening), melech (king).', 'word', 'יֶלֶד (yeled, child) — two segols give the characteristic /e/-/e/ pattern.', 'Segolate nouns are mil\'el-stressed (penultimate stress); a Level 3 topic.', null, [ACT.niqqud]),
    createContentItem('ִ חיריק', 'chiriq', 'Pronounced /i/ (high front vowel, like English "see" but shorter). A single dot below the consonant. Often paired with a yud (ִי) for the same /i/ sound in full spelling.', 'word', 'אִישׁ (ish, man) — chiriq under alef gives /i/.', 'In ktiv male (unpointed full spelling), /i/ is usually marked by a yud letter: איש in unpointed.', null, [ACT.niqqud]),
    createContentItem('וֹ חולם', 'cholam', 'Pronounced /o/ (mid-back rounded vowel). A dot above the consonant (cholam chaser) or above a vav letter (cholam male, וֹ). The full form וֹ is the most common in modern spelling.', 'word', 'שָׁלוֹם (shalom) — cholam male וֹ marks the /o/.', 'In ktiv male, /o/ is almost always written with a vav: שלום, בוקר, יום.', null, [ACT.niqqud]),
    createContentItem('וּ שורוק', 'shuruk', 'Pronounced /u/ (high back rounded vowel). Always written as a vav with a dot inside: וּ. The standard way to mark /u/ in modern spelling.', 'word', 'תּוּת (tut, strawberry) — shuruk in the middle gives /u/.', 'Compare to kubutz (three dots below, only used in pointed text without a vav).', null, [ACT.niqqud]),
    createContentItem('ְ שווא', 'shva', 'Two vertical dots below the consonant. Marks either a reduced /ə/ vowel (shva na, mobile) or NO vowel at all (shva nach, quiescent). Distinguishing the two is one of the trickiest parts of Hebrew pronunciation.', 'word', 'שְׁלֹמֹה (Shlomo, Solomon) — the shva under ש is mobile in formal speech (sh-e-lo-mo) but often dropped in casual (shlo-mo).', 'Shva mobile typically appears at a syllable\'s start; shva quiescent closes a syllable.', null, [ACT.niqqud]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Qamatz vs Patach
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'קמץ גדול',
      'kamatz gadol',
      'The "big kamatz" — pronounced /a/ in most positions. This is the default reading of the kamatz sign in Modern Israeli Hebrew.',
      'word',
      'דָּג (dag, fish), חָבָק (chavak, hugged) — both /a/.',
      'Ashkenazi religious tradition reads ALL kamatz as /o/ (kometz), so the same word שָׁלוֹם becomes "Sholom" in Yiddish-influenced contexts.',
      null,
      [ACT.qamatzPatach],
    ),
    createContentItem(
      'קמץ קטן',
      'kamatz katan',
      'The "small kamatz" — same sign ָ but pronounced /o/. Appears in specific positions: closed unstressed syllables. The most famous example is כָּל־ (kol, "all of"), which is /o/ even though it looks like a regular kamatz.',
      'word',
      'כָּל־הָאָרֶץ (kol ha-aretz, "all the land") — the kamatz in כָּל is read /o/, not /a/.',
      'Identifying kamatz katan correctly is a marker of careful Hebrew reading; everyday casual speech often blurs the distinction.',
      [
        { target: 'kamatz gadol /a/', note: 'open or stressed syllable; the default reading' },
        { target: 'kamatz katan /o/', note: 'closed unstressed syllable; common in words like כל, חכמה' },
      ],
      [ACT.qamatzPatach],
    ),
    createContentItem(
      'חכם vs חכמה',
      'chacham vs chochmah',
      'Contrastive pair: חָכָם (chacham, wise — masculine adjective) has TWO kamatz gadol, both /a/. חָכְמָה (chochmah, wisdom — feminine noun) has kamatz KATAN on the first syllable (/o/) and kamatz gadol on the last (/a/). The shift in vowel marks the shift in stress and word class.',
      'word',
      'הוא חָכָם (hu chacham, he is wise) vs יש לה חָכְמָה (yesh la chochmah, she has wisdom).',
      'This is a classic pair used to teach kamatz distinction in Israeli schools.',
      null,
      [ACT.qamatzPatach],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Shva
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'שווא נע',
      'shva na',
      'Mobile shva — pronounced as a brief /ə/ or short /e/. Typically appears at the START of a syllable. In careful speech you hear a short vowel; in casual speech it is often dropped or reduced to nothing.',
      'word',
      'שְׁלוֹמְךָ (shlomcha, your peace/wellbeing) — careful: sh-e-lom-cha; casual: shlom-cha.',
      'Five contexts trigger shva na: (1) start of word, (2) under doubled letter, (3) after a long vowel, (4) under the second of two consecutive shvas, (5) after a guttural with chataf vowel.',
      [
        { target: 'sh-e-lo-mo (careful)', note: 'mobile shva gives a brief /e/' },
        { target: 'shlo-mo (casual)', note: 'shva dropped; this is how Israelis speak everyday' },
      ],
      [ACT.shva],
    ),
    createContentItem(
      'שווא נח',
      'shva nach',
      'Quiescent shva — completely silent. Closes a syllable. Appears in the middle of words after a closed syllable.',
      'word',
      'מַלְכָּה (malka, queen) — the shva under ל is silent; reads "mal-KA".',
      'Distinguishing shva nach from shva na takes practice; in unpointed text you don\'t see the mark at all, so word recognition is what guides pronunciation.',
      null,
      [ACT.shva],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Stress
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'מלרע',
      'mil\'ra',
      'Ultimate (final-syllable) stress — the default Modern Hebrew stress pattern. Most verbs, most adjectives, and most multi-syllable nouns are mil\'ra: shalom (sha-LOM), chaver (cha-VER), morah (mo-RAH), shomer (sho-MER).',
      'word',
      'שלום sha-LOM · חבר cha-VER · מורה mo-RAH · ספר se-FER (book).',
      'When transliterating Hebrew names, the natural English stress (penultimate) often clashes with the Hebrew mil\'ra (ultimate) — "Sarah" the English name is SA-rah, but Hebrew שָׂרָה is sa-RAH.',
      null,
      [ACT.stress],
    ),
    createContentItem(
      'מלעיל',
      'mil\'el',
      'Penultimate stress — a smaller but important class. Most segolate nouns (יֶלֶד YE-led, מֶלֶךְ ME-lech, בֹּקֶר BO-ker, עֶרֶב E-rev) are mil\'el. Imperatives and some loanwords also stress penultimate.',
      'word',
      'ילד YE-led · בוקר BO-ker · ערב E-rev · ספר SE-fer (book, segolate pattern).',
      'Native Israelis identify mil\'el speakers by ear immediately — getting stress wrong is the most audible non-native marker.',
      null,
      [ACT.stress],
    ),
    createContentItem(
      'הטעמה שונה — משמעות שונה',
      'hat\'ama shona — mashma\'ut shona',
      'Stress can change meaning. בָּקְרָה stressed BOK-ra means "criticized her" (verb past tense); stressed bo-K\'RA can be parsed differently. Stress is a real phonemic feature in Hebrew, not just rhythm.',
      'word',
      'Compare: שָׁבוּ (sha-VU, they returned) vs שַׁבּוּ (SHA-bu, they captured) — different stress, different verb root meaning.',
      'In unpointed text, the spelling is identical; only stress (and context) distinguishes the meanings.',
      null,
      [ACT.stress],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Reading Direction
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'כיוון הקריאה',
      'kivun ha-kri\'a',
      'Hebrew reads right-to-left. The first letter of every word is the rightmost. Book pages turn from right-to-left as well, so what English readers see as the "back cover" of a Hebrew book is actually the front. Newspapers, magazines, and websites all follow this convention.',
      'word',
      'הספר נפתח מימין — "the book opens from the right" — a Hebrew literary convention.',
      'In Israeli software (WhatsApp, email, websites), there are special bidirectional algorithms (BiDi) to handle mixed Hebrew/English text correctly.',
      null,
      [ACT.readingDirection],
    ),
    createContentItem(
      'מספרים',
      'misparim',
      'Numbers within Hebrew text still read LEFT-to-right, which creates bidirectional layout. The phone number 03-123-4567 in a Hebrew sentence reads its digits in the English direction even though the surrounding Hebrew flows right-to-left.',
      'word',
      'הטלפון הוא 03-1234567 — the phone number flows L-to-R inside an R-to-L sentence.',
      'This bidirectional handling is the root of many software bugs in Hebrew applications.',
      null,
      [ACT.readingDirection],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Unpointed text
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'כתיב מלא',
      'ktiv male',
      'Full spelling — the convention used in unpointed Hebrew. To compensate for missing vowel marks, /o/ and /u/ are spelled with a vav, /i/ is spelled with a yud, and doubled letters often get extra letters. So שָׁלוֹם is pointed; שלום is unpointed full spelling.',
      'word',
      'בּוֹקֶר (boker, morning) → unpointed: בוקר. The וֹ (cholam male) survives as the letter ו in unpointed.',
      'The Hebrew Academy publishes official ktiv male rules; modern Israeli media follows them closely.',
      [
        { target: 'pointed: שָׁלוֹם', note: 'used in textbooks, religious texts, poetry' },
        { target: 'unpointed: שלום', note: 'used in everyday writing, signs, WhatsApp' },
      ],
      [ACT.unpointedText],
    ),
    createContentItem(
      'דוגמאות לקריאה',
      'dugma\'ot li-kri\'a',
      'Practice reading unpointed words: שלום (shalom), בוקר (boker), טוב (tov), חבר (chaver), מים (mayim), ישראל (Yisrael), ירושלים (Yerushalayim), אוניברסיטה (universita).',
      'word',
      'בוקר טוב — boker tov — "good morning". Both words are unpointed; you infer the vowels from word recognition.',
      'Mastering unpointed reading is the marker of real Hebrew literacy; in Israel, only kindergarteners and Torah readers use niqqud regularly.',
      null,
      [ACT.unpointedText],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Reading practice
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'פסקת קריאה',
      'piska li-kri\'a',
      'A short paragraph applying all rules from this lesson. Read it twice: first with niqqud, then again without. Each sentence introduces a Hebrew anchor.',
      'sentence',
      'אֲנִי לוֹמֵד עִבְרִית בָּאוּנִיבֶרְסִיטָה הָעִבְרִית בִּירוּשָׁלַיִם. הָעִיר יְפֵיפִיָּה. יֵשׁ הַרְבֵּה סְטוּדֶנְטִים מִכָּל הָעוֹלָם. הַחָבֵר שֶׁלִּי גָּר בְּתֵל אָבִיב.',
      'Translation: "I study Hebrew at Hebrew University in Jerusalem. The city is beautiful. There are many students from all over the world. My friend lives in Tel Aviv."',
      [
        { target: 'אֲנִי לוֹמֵד עִבְרִית', note: 'ani lomed ivrit — "I study Hebrew" (masculine speaker)' },
        { target: 'הָאוּנִיבֶרְסִיטָה הָעִבְרִית', note: 'ha-universita ha-ivrit — "Hebrew University", Israel\'s flagship institution in Jerusalem' },
        { target: 'בִּירוּשָׁלַיִם', note: 'bi-yerushalayim — "in Jerusalem"; prefix בְּ- ("in/at") + Yerushalayim, Hebrew name of Jerusalem' },
        { target: 'בְּתֵל אָבִיב', note: 'be-tel aviv — "in Tel Aviv", Israel\'s coastal commercial capital' },
      ],
      [ACT.practice],
    ),
    createContentItem(
      'אותה פסקה ללא ניקוד',
      'ota piska lelo niqqud',
      'The same paragraph without niqqud. Use word recognition to infer vowels. This is what you will read everywhere outside textbooks.',
      'sentence',
      'אני לומד עברית באוניברסיטה העברית בירושלים. העיר יפיפייה. יש הרבה סטודנטים מכל העולם. החבר שלי גר בתל אביב.',
      'Notice that the vav letters (ו) and yud letters (י) inside words mark where vowels go in unpointed full spelling.',
      null,
      [ACT.practice],
    ),
  ],
};

module.exports = lesson;
