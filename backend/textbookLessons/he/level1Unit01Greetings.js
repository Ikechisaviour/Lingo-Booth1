// Level 1 Unit 1 — Greetings & Self-Introduction (Modern Hebrew)
// Functions: greeting, introducing yourself, asking where someone is from,
// correcting a wrong assumption, farewells.
// This lesson is the canonical TEMPLATE for all Hebrew thematic Level 1 lessons.
//
// All content is authored with Hebrew (target) + Latin transliteration +
// English glosses (canonical source). The AI conversation tutor reads this
// curriculum and delivers it to each learner in their preferred native
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
  orientation: 'he-l1u1-orientation',
  pronunciation: 'he-l1u1-pronunciation',
  vocabularyGreetings: 'he-l1u1-vocab-greetings',
  vocabularyPeople: 'he-l1u1-vocab-people',
  grammarNoCopula: 'he-l1u1-grammar-no-copula',
  grammarPronounsGender: 'he-l1u1-grammar-pronouns-gender',
  grammarNegation: 'he-l1u1-grammar-negation',
  reading: 'he-l1u1-reading',
  listening: 'he-l1u1-listening',
  writing: 'he-l1u1-writing',
  culture: 'he-l1u1-culture',
  task: 'he-l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet someone in Hebrew and say goodbye in three registers (casual, polite, formal) so you can match the situation.',
      'Introduce yourself with your name, country of origin, and one role (student / teacher / engineer) using the gender-agreeing pattern.',
      'Ask another person their name and where they are from, then respond appropriately to their answer using gender-appropriate forms.',
    ],
    task: 'Picture your first day at Hebrew University of Jerusalem — you walk into a research seminar and meet a returning Israeli scholar. By the end of this lesson you should handle the whole exchange in Hebrew without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce the chet /kh/ in שלום (shalom) — actually no chet, but in חבר (chaver) and the everyday חג (chag). This is the most distinctive Hebrew sound.',
      'Apply mil\'ra (final) stress to nearly every multi-syllable word: shaLOM, chaVER, moRAH, leHITraOT.',
      'Drop or reduce shva mobile in casual speech: lehitra\'ot becomes "lehitraOT" not "le-hi-tra-OT" with full /e/ on every shva.',
    ],
    task: 'Read each example aloud, stressing the correct syllable, and pronounce chet ח as a back-of-throat /kh/.',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 12 greetings and farewells across three registers, with the right phrase for each situation.',
      'Use שלום (shalom) as both greeting AND farewell — the only Hebrew greeting that works in any register and any direction.',
    ],
    task: 'Say each phrase out loud three times, then pair each one with the situation where you would use it.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and nationalities',
    goals: [
      'Use the 6 personal pronouns (אני, אתה, את, הוא, היא, אנחנו, אתם, אתן, הם, הן) correctly, distinguishing masculine and feminine forms.',
      'State your role (סטודנט/סטודנטית, מורה, מהנדס/מהנדסת) with gender agreement, and nationality with the appropriate suffix.',
    ],
    task: 'Say your own role and nationality using the gender-appropriate form, then describe one classmate using the third-person form matching their gender.',
  },
  {
    id: ACT.grammarNoCopula,
    section: 'Grammar I',
    title: 'No present-tense "to be" — the zero copula',
    goals: [
      'Form a simple identity sentence WITHOUT a verb: אני סטודנט (ani student) literally "I student" = "I am a student". Hebrew has no present-tense "to be".',
      'Use the optional pronoun copula (הוא/היא/הם/הן) for emphasis or formal definition: דוד הוא רופא (David hu rofe) "David, he-is a doctor".',
      'Form a yes/no question with rising intonation only — no word-order change, no question particle.',
    ],
    task: 'Write six sentences in the no-copula pattern, then convert three of them into yes/no questions using intonation only.',
  },
  {
    id: ACT.grammarPronounsGender,
    section: 'Grammar II',
    title: 'Pronouns and gender agreement',
    goals: [
      'Use the 10 personal pronouns: אני (ani, I), אתה (ata, you-m), את (at, you-f), הוא (hu, he), היא (hi, she), אנחנו (anachnu, we), אתם (atem, you-m-pl), אתן (aten, you-f-pl), הם (hem, they-m), הן (hen, they-f).',
      'Apply gender agreement to every adjective and noun: a male student is סטודנט (student), a female student is סטודנטית (studentit). Hebrew has no neuter — every noun is masculine or feminine.',
    ],
    task: 'Construct three sentences each with masculine and feminine subjects, watching for the adjective/noun agreement.',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar III',
    title: 'Negation with לא (lo) and the correction pattern',
    goals: [
      'Negate a no-copula sentence by placing לא (lo) before the noun/adjective: אני לא סטודנט ("I am not a student").',
      'Apply the לא … אלא … (lo … ela …) pattern to correct someone\'s wrong guess politely: "not X, rather Y".',
      'Distinguish לא (lo, general negation) from אין (ein, existential negation, "there is not").',
    ],
    task: 'Imagine a classmate guesses your nationality wrong; correct them in one polite sentence using the לא … אלא … pattern.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a self-introduction',
    goals: [
      'Read a short self-introduction paragraph aloud with correct stress, chet pronunciation, and gender agreement.',
      'Answer comprehension questions about the speaker\'s name, country, role, and department.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first meeting',
    goals: [
      'Follow a 4-turn first-meeting dialogue and recognize the casual vs formal register markers.',
      'Reproduce the dialogue with your own name and country, swapping in gender-appropriate forms naturally.',
    ],
    task: 'Read the dialogue along with the AI tutor first, then perform it again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own self-introduction',
    goals: [
      'Write 3–5 sentences in Hebrew script covering greeting, name, country, role, and one extra fact.',
      'Use the no-copula pattern consistently, and apply gender agreement to every adjective and noun.',
    ],
    task: 'Write your own self-introduction in 3–5 sentences using the model on the left, then read it aloud.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'First-name basis, military bond, and direct talk',
    goals: [
      'Use first names quickly — Israeli culture is famously informal even in professional contexts; calling a professor "Dani" instead of "Professor Cohen" is normal.',
      'Recognize the bonding role of military service (צבא) — adults frequently meet by asking "where did you serve?" or referring to their unit.',
      'Embrace the directness (דוגרי, dugri) of Israeli social style — being blunt or asking personal questions early is friendly, not rude.',
    ],
    task: 'Decide how you would address (1) a fellow student named Dani, (2) a professor named Sarah Cohen, (3) a senior researcher named David Levy — give the natural Israeli form for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day at Hebrew University — in Hebrew',
    goals: [
      'Combine everything from this lesson into one continuous scene with no break between greeting, introduction, question, answer, correction, and farewell.',
      'Use gender-appropriate forms throughout based on whom you are speaking to (atah vs at).',
    ],
    task: 'Roleplay your first day at Hebrew University of Jerusalem with the AI tutor playing a returning Israeli student; aim for a 6-turn exchange in Hebrew.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 1: שלום — Greetings and Self-Introduction',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'he',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (שלום / בוקר טוב / להתראות) and match the register to the relationship.' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences using the no-copula pattern.' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask מאיפה אתה/את? and respond naturally with the country and city.' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use the לא … אלא … pattern to politely correct a wrong guess about your nationality or role.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'מטרות השיעור',
      'matarot ha-shiur',
      'By the end of this lesson, you can greet someone in Hebrew, give your name, say where you are from, ask the same back, and farewell — all in one short conversation, with gender-appropriate forms.',
      'word',
      'Functional skills: לברך (levarech, to greet) · להציג את עצמך (lehatzig et atzmecha, introduce yourself) · לשאול מאיפה (lish\'ol me\'efo, ask origin) · לתקן (letaken, correct) · להיפרד (lehipared, farewell).',
      'These five micro-skills are the spine of every social encounter in Hebrew; once they\'re automatic, every later lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      'תרחיש אמיתי',
      'tarchish amiti',
      'You are at the Hebrew University of Jerusalem (האוניברסיטה העברית) on your first day, and a returning Israeli student turns to you in the seminar room. The whole encounter takes about 30 seconds and you will need every micro-skill from this lesson.',
      'word',
      'הסטודנט הישראלי: "שלום! אני דני. מאיפה אתה/את?"',
      'A typical Israeli opener — name first, direct origin question, no preamble; the famous Israeli directness (דוגרי, dugri).',
      [
        { target: 'שלום shalom', note: 'universal greeting and farewell; works in any register' },
        { target: 'אני דני ani Dani', note: 'self-introduction; first names are standard even with new acquaintances' },
        { target: 'מאיפה אתה/את? me\'efo ata/at?', note: 'origin question; ata (m) or at (f) depending on the addressee' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      'שלוש רמות נימוס',
      'shalosh ramot nimus',
      'Hebrew distinguishes three rough politeness registers. Casual (peers, friends): מה נשמע? (ma nishma, "what\'s up?"), אהלן (ahalan, "hi" — from Arabic). Polite (workplace, first meetings): שלום (shalom), בוקר טוב (boker tov). Formal (rare in modern Israel): שלום רב (shalom rav, "much peace") — sounds slightly literary.',
      'word',
      'אהלן ahalan (casual) / שלום shalom (polite) / שלום רב shalom rav (formal) — same greeting function, three social levels.',
      'Israeli society is notably egalitarian; the formal register is rare outside official ceremonies and is sometimes felt as overly stiff.',
      [
        { target: 'CASUAL: אהלן, מה נשמע?', note: 'use with peers, close friends, anyone roughly your age' },
        { target: 'POLITE: שלום, בוקר טוב', note: 'safe default for first meetings, workplace, customer-facing' },
        { target: 'FORMAL: שלום רב', note: 'reserved for ceremonies, official letters, addresses to large audiences' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'שלום',
      'shalom (stressed: sha-LOM)',
      'The most common Hebrew word — greeting, farewell, and the noun "peace" all in one. Mil\'ra stress: sha-LOM, with the stress on the second syllable. The /sh/ sound is the most common consonant cluster opener in Hebrew.',
      'word',
      'שלום! → sha-LOM, two clean syllables with final stress.',
      'In Ashkenazi religious tradition, pronounced "Sholom" (with /o/-/o/); in Yiddish-influenced contexts "Sholem". Modern Israeli uses /a/-/o/.',
      [
        { target: 'sha-', note: 'first syllable, unstressed, short /a/' },
        { target: '-LOM', note: 'second syllable, stressed, full /o/ from the cholam mark' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'חבר',
      'chaver (cha-VER)',
      'A common everyday word starting with chet /kh/. Mil\'ra stress: cha-VER. Practice the chet as a back-of-throat fricative, not a soft English /h/.',
      'word',
      'חבר טוב — chaver tov — "good friend".',
      'The most common /kh/-initial word a learner will encounter; mastering this opens up chag, chatul, chalom, chol, and dozens more.',
      [
        { target: 'cha- (/kh/+/a/)', note: 'velar fricative /kh/ followed by /a/; the throat is engaged' },
        { target: '-VER', note: 'stressed syllable; the bet is soft /v/ here because it follows a vowel' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'להתראות',
      'lehitra\'ot (le-hit-ra-OT)',
      'The standard farewell "see you / goodbye". Four syllables with mil\'ra stress on the last: le-hit-ra-OT. In casual speech the shvas drop and it sounds more like "lehitra\'OT".',
      'word',
      'להתראות! לילה טוב! — lehitra\'ot, layla tov — "Goodbye, good night."',
      'The longest common Hebrew farewell; abbreviated in writing as להת׳ in informal contexts.',
      [
        { target: 'le-', note: 'prefix לְ- meaning "to" — infinitive marker' },
        { target: '-hit-', note: 'reflexive binyan hitpa\'el prefix' },
        { target: '-ra-OT', note: 'root ר-א-ה (r-a-h, "see"); the whole word means "to see each other"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'תודה',
      'toda (to-DA)',
      'Standard "thank you". Two syllables with mil\'ra stress: to-DA. The opening ת is /t/ in modern Israeli (the historical soft form /th/ is gone).',
      'word',
      'תודה רבה! toda raba — "thank you very much" (literally "much thanks").',
      'Variants: תודה רבה toda raba (very much, common); אלף תודות elef todot (a thousand thanks, warm); תודה לאל toda la-El (thank God, exclamation).',
      [
        { target: 'to-', note: 'first syllable, /t/ from tav' },
        { target: '-DA', note: 'stressed; he at end silent, marks final /a/' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'בוקר טוב',
      'boker tov (BO-ker TOV)',
      'Morning greeting. Note the dual stress pattern: בוקר is mil\'el (BO-ker, segolate pattern), but טוב is mil\'ra (TOV, monosyllable). Many Hebrew compound greetings have this rhythm.',
      'word',
      'בוקר טוב! איך הולך? — boker tov, eich holech — "good morning, how\'s it going?"',
      'Common Israeli reply variants: בוקר אור (boker or, "morning of light"), בוקר זריחות (boker zrichot, "morning of sunrises").',
      [
        { target: 'BO-ker', note: 'mil\'el stress; segolate noun pattern (CECEC)' },
        { target: 'TOV', note: 'mil\'ra; monosyllable, adjective "good"' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('שלום', 'shalom', 'The universal Hebrew greeting AND farewell — works in any register, any time, with anyone. Literal meaning "peace"; the peace overtone is felt mostly in formal/written contexts. The single most useful Hebrew word.', 'word', 'שלום! מה שלומך? — shalom! ma shlomcha? — "Hello! How are you?"', 'A standard opener; "ma shlomcha" (m) or "ma shlomech" (f) literally means "what is your peace/wellbeing?"', null, [ACT.vocabularyGreetings]),
    createContentItem('בוקר טוב', 'boker tov', 'Polite morning greeting, used roughly from sunrise to noon. Standard reply: בוקר אור (boker or, "morning of light") — slightly more poetic than just repeating boker tov.', 'word', 'בוקר טוב, פרופסור! — boker tov, profesor — "Good morning, Professor!"', 'Israelis often answer with the more elaborate "boker or" rather than echoing the same phrase; signals warmth.', null, [ACT.vocabularyGreetings]),
    createContentItem('צהריים טובים', 'tzohorayim tovim', 'Polite midday greeting, used roughly from noon to mid-afternoon. Note the dual form of the noun: צהריים is grammatically dual (-ayim ending), so the adjective takes the plural form טובים.', 'word', 'צהריים טובים, מה תרצי לשתות? — tzohorayim tovim, ma tirtzi lishtot? — "Good afternoon, what would you like to drink?"', 'Less common in casual speech than boker tov or erev tov; the dual-noun grammar makes it slightly bookish.', null, [ACT.vocabularyGreetings]),
    createContentItem('ערב טוב', 'erev tov', 'Polite evening greeting, used from late afternoon through nighttime. Erev is a segolate noun (E-rev, mil\'el stress) meaning "evening".', 'word', 'ערב טוב! איך היה היום? — erev tov! eich haya ha-yom? — "Good evening! How was your day?"', 'Standard at restaurants, at evening events, in hotels.', null, [ACT.vocabularyGreetings]),
    createContentItem('לילה טוב', 'layla tov', 'Standard "good night" — used at bedtime or when parting in late hours. Not a greeting on arrival; it is specifically a farewell when someone is going to sleep or for the night.', 'word', 'לילה טוב, חלומות פז! — layla tov, chalomot paz — "Good night, sweet dreams!" (literally "dreams of gold")', 'Distinct from "good evening" — erev tov is a greeting, layla tov is a farewell.', null, [ACT.vocabularyGreetings]),
    createContentItem('להתראות', 'lehitra\'ot', 'The standard farewell "see you / goodbye". Literally "to see each other" — the verb is from binyan hitpa\'el (reflexive). The most common goodbye in any register.', 'word', 'להתראות, נדבר מחר! — lehitra\'ot, nedaber machar — "See you, we\'ll talk tomorrow!"', 'Often abbreviated as להת׳ in WhatsApp; or said with a wave as "lehit\'!"', null, [ACT.vocabularyGreetings]),
    createContentItem('ביי', 'bye', 'Casual farewell borrowed from English — extremely common in everyday speech, even in formal-ish contexts. Hebrew has fully adopted "bye" as part of the language.', 'word', 'ביי, נתראה! — bye, nitra\'e — "Bye, see ya!"', 'Often doubled "bye bye" or repeated three times "bye bye bye" in playful contexts.', null, [ACT.vocabularyGreetings]),
    createContentItem('נעים מאוד', 'na\'im me\'od', 'First-meeting phrase meaning "nice to meet you" (literally "very pleasant"). Used in polite/formal introductions. Can also be said as a stand-alone reply: someone introduces themselves, you say "na\'im me\'od".', 'word', 'נעים מאוד להכיר אותך — na\'im me\'od lehakir otach — "very nice to meet you" (to a female).', 'The full phrase often shortens to just "na\'im me\'od"; the shorter form is more common in everyday meetings.', null, [ACT.vocabularyGreetings]),
    createContentItem('מה נשמע', 'ma nishma', 'Casual "what\'s up / how are you?" — extremely common among peers and friends. Literally "what is heard?" Standard reply: הכל בסדר (ha-kol be-seder, "everything is in order").', 'word', 'מה נשמע? — בסדר, ואתה? — ma nishma? — beseder, ve-ata? — "What\'s up?" "Fine, and you?"', 'The most natural peer-to-peer greeting in Israeli Hebrew; nearly always replaces "ma shlomcha" among friends.', null, [ACT.vocabularyGreetings]),
    createContentItem('מה שלומך', 'ma shlomcha / shlomech', 'Polite "how are you?" — note the gender ending: shlomcha to a male, shlomech to a female. Literally "what is your peace?" More formal than ma nishma; used with people you don\'t know well or with elders.', 'word', 'מה שלומך, גב\' כהן? — ma shlomech, gveret Cohen? — "How are you, Mrs. Cohen?"', 'The "-cha" (m) and "-ech" (f) endings are universal possessive pronoun suffixes attached to many Hebrew nouns.', null, [ACT.vocabularyGreetings]),
    createContentItem('אהלן', 'ahalan', 'Casual greeting borrowed from Arabic أهلاً (ahlan). Extremely common in Israeli everyday speech, especially among younger speakers. Roughly equivalent to "hey" or "hi".', 'word', 'אהלן אחי! — ahalan achi! — "Hey bro!"', 'Often paired with sahbak (also from Arabic) or achi/achoti (brother/sister) for added warmth among male friends.', null, [ACT.vocabularyGreetings]),
    createContentItem('יאללה ביי', 'yalla bye', 'The quintessential Israeli farewell — mashup of Arabic يلا (yalla, "let\'s go / come on") + English "bye". Casual; common among peers when wrapping up a chat or leaving.', 'word', 'יאללה ביי, נדבר מחר! — yalla bye, nedaber machar — "Alright bye, we\'ll talk tomorrow!"', 'A perfect example of Israeli Hebrew\'s magpie nature: Hebrew base, Arabic loan, English loan, all in two words.', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People, roles, nationalities
    // ────────────────────────────────────────────────────────────────────
    createContentItem('אני', 'ani', 'First-person singular pronoun "I". Same form for masculine and feminine subjects — one of the few Hebrew pronouns that doesn\'t mark gender. Always pronounced a-NI (mil\'ra).', 'word', 'אני סטודנט. — ani student — "I am a student" (masculine speaker).', 'No subject/object distinction in Hebrew pronouns: "I" and "me" are both ani; "me" in object position uses אותי (oti), which is a different word entirely.', null, [ACT.vocabularyPeople]),
    createContentItem('אתה', 'ata', 'Masculine singular "you". Used when addressing one male. Note the gender split: a male is אתה (ata), a female is את (at) — Hebrew distinguishes them in singular but not in casual mixed-gender plural.', 'word', 'מאיפה אתה? — me\'efo ata? — "Where are you from?" (to a male)', 'Israeli society uses ata/at very freely — even with strangers, professors, and elders; the formal "you" common in European languages has no Hebrew equivalent.', null, [ACT.vocabularyPeople]),
    createContentItem('את', 'at', 'Feminine singular "you". Identical spelling to the direct-object marker את (et, no vowel), but stressed and pronounced differently. Used when addressing one female.', 'word', 'מאיפה את? — me\'efo at? — "Where are you from?" (to a female)', 'In unpointed text, את can be confusing — only context tells you whether it\'s the pronoun "you-f" or the object marker.', null, [ACT.vocabularyPeople]),
    createContentItem('הוא', 'hu', 'Third-person masculine singular "he". Pronounced "hoo" with the silent ה and the long /u/ from vav. Used as both the regular pronoun and as a "pronoun copula" in definitional sentences.', 'word', 'הוא חבר שלי. — hu chaver sheli — "He is my friend."', 'As a pronoun copula: דוד הוא רופא (David hu rofe) "David is a doctor"; the hu adds emphasis/definition.', null, [ACT.vocabularyPeople]),
    createContentItem('היא', 'hi', 'Third-person feminine singular "she". Pronounced "hee" with silent ה and /i/ from chiriq + yud. Used as the regular pronoun and as a feminine "pronoun copula".', 'word', 'היא מורה. — hi morah — "She is a teacher."', 'Common pronoun-copula use: שרה היא רופאה (Sarah hi rofa) "Sarah is a doctor".', null, [ACT.vocabularyPeople]),
    createContentItem('אנחנו', 'anachnu', 'First-person plural "we". Three syllables: a-NACH-nu, mil\'el-ish (penultimate stress). Same form regardless of gender mix.', 'word', 'אנחנו סטודנטים. — anachnu studentim — "We are students" (masculine or mixed group)', 'In casual speech, anachnu often shortens to anu (אנו) in literary register or stays as the full form.', null, [ACT.vocabularyPeople]),
    createContentItem('אתם / אתן', 'atem / aten', 'Second-person plural "you" — אתם (atem) for masculine or mixed groups, אתן (aten) for all-female groups. Mixed groups use the masculine form by default (a common feature of Hebrew gender).', 'word', 'מאיפה אתם? — me\'efo atem? — "Where are you (plural) from?"', 'In modern egalitarian-conscious writing, some authors alternate masculine and feminine plural forms; in everyday speech the masculine plural dominates.', null, [ACT.vocabularyPeople]),
    createContentItem('הם / הן', 'hem / hen', 'Third-person plural "they" — הם (hem) for masculine or mixed groups, הן (hen) for all-female groups. Same masculine-default rule as atem/aten.', 'word', 'הם חברים. — hem chaverim — "They are friends" (masculine or mixed)', 'The hen form is increasingly used in feminist-conscious media to avoid the masculine default.', null, [ACT.vocabularyPeople]),
    createContentItem('שם', 'shem', 'A person\'s name. The phrase מה השם שלך? (ma ha-shem shelcha/shelach?) "what\'s your name?" is the standard question. Also used metaphorically: שם טוב (shem tov, good reputation).', 'word', 'מה השם שלך? — שמי דני. — ma ha-shem shelcha? — shmi Dani — "What\'s your name?" "My name is Dani."', 'The construct form שמי (shmi, "my name") replaces "ha-shem sheli" in slightly more elegant register.', null, [ACT.vocabularyPeople]),
    createContentItem('סטודנט / סטודנטית', 'student / studentit', 'University-level student — masculine סטודנט, feminine סטודנטית. Borrowed from European languages; the -it suffix is the standard feminine ending for many Hebrew nouns.', 'word', 'אני סטודנטית באוניברסיטה העברית. — ani studentit ba-universita ha-ivrit — "I am a (female) student at Hebrew University."', 'For primary/secondary school students, use תלמיד/תלמידה (talmid/talmida); סטודנט is reserved for higher education.', null, [ACT.vocabularyPeople]),
    createContentItem('תלמיד / תלמידה', 'talmid / talmida', 'Primary or secondary school student — masculine תלמיד, feminine תלמידה. Also used in religious contexts for a disciple or pupil of a rabbi.', 'word', 'אני תלמיד תיכון. — ani talmid tichon — "I am a high-school student."', 'תיכון (tichon) = high school; יסודי (yesodi) = elementary; חטיבת ביניים (chativat beinayim) = middle school.', null, [ACT.vocabularyPeople]),
    createContentItem('מורה', 'moreh / morah', 'Teacher — masculine מורה (moreh), feminine מורה (morah, with the same spelling but pronounced differently). In unpointed text both are written מורה.', 'word', 'דני הוא מורה לעברית. — Dani hu moreh le-ivrit — "Dani is a Hebrew teacher."', 'For university professors, use פרופסור (profesor) or מרצה (martze, lecturer).', null, [ACT.vocabularyPeople]),
    createContentItem('מהנדס / מהנדסת', 'mehandes / mehandeset', 'Engineer — masculine מהנדס, feminine מהנדסת. The -et suffix is another common feminine ending.', 'word', 'אני מהנדס תוכנה. — ani mehandes tochna — "I am a software engineer."', 'Israel has one of the highest engineer-per-capita rates in the world; tech engineering is a default conversation topic.', null, [ACT.vocabularyPeople]),
    createContentItem('רופא / רופאה', 'rofe / rofa', 'Doctor — masculine רופא, feminine רופאה. The /e/-/a/ ending pattern is standard for Hebrew adjectives and many profession nouns.', 'word', 'אמא שלי רופאה. — ima sheli rofa — "My mom is a doctor."', 'For specialists, add the specialty: רופא ילדים (rofe yeladim, pediatrician), רופא שיניים (rofe shinayim, dentist).', null, [ACT.vocabularyPeople]),
    createContentItem('ישראל / ישראלי', 'Yisrael / Yisre\'eli', 'Israel (country) / Israeli (person). The nationality is formed by adding -i (m) or -it (f) to the country name: ישראלי (yisre\'eli, m) / ישראלית (yisre\'elit, f).', 'word', 'אני ישראלית, מתל אביב. — ani yisre\'elit, mi-tel aviv — "I am Israeli, from Tel Aviv."', 'Note the spelling shift: ישראל (country) → ישראלי (nationality, with added yud); the pronunciation also shifts from Yisra\'EL to Yisre\'eLI.', null, [ACT.vocabularyPeople]),
    createContentItem('אמריקאי / אמריקאית', 'amerika\'i / amerika\'it', 'American — masculine אמריקאי, feminine אמריקאית. The country אמריקה (Amerika); the alternative ארצות הברית (Artzot ha-Brit, "the United States").', 'word', 'הוא אמריקאי מניו יורק. — hu amerika\'i mi-niu york — "He is American, from New York."', 'In casual usage, אמריקאי covers anyone from the USA; for South Americans, the specific country word is used.', null, [ACT.vocabularyPeople]),
    createContentItem('סיני / סינית', 'sini / sinit', 'Chinese (person) — סיני (m) / סינית (f); the country is סין (Sin). The same word סינית also means "the Chinese language".', 'word', 'אני סינית, מבייג׳ינג. — ani sinit, mi-beijing — "I am Chinese, from Beijing."', 'The -it suffix on a nationality also forms the language name: עברית = Hebrew (language), אנגלית = English, רוסית = Russian.', null, [ACT.vocabularyPeople]),
    createContentItem('יפני / יפנית', 'yapani / yapanit', 'Japanese — יפני (m) / יפנית (f); the country is יפן (Yapan). Note the pronunciation: yud at start is /y/, not /j/.', 'word', 'הסטודנטית היפנית בכיתה שלי. — ha-studentit ha-yapanit ba-kita sheli — "The Japanese (female) student in my class."', 'The country names of East Asian countries in Hebrew often retain their original pronunciation phonetically.', null, [ACT.vocabularyPeople]),
    createContentItem('צרפתי / צרפתייה', 'tzarfati / tzarfatiya', 'French — צרפתי (m) / צרפתייה (tzarfatiya, f, with -iya ending). The country: צרפת (Tzarfat).', 'word', 'אחותי גרה בצרפת. — achoti gara be-tzarfat — "My sister lives in France."', 'The -iya feminine ending appears in many nationality words: רוסייה (rusiya, Russian woman), פולנייה (polaniya, Polish woman).', null, [ACT.vocabularyPeople]),
    createContentItem('גרמני / גרמנייה', 'germani / germaniya', 'German — גרמני (m) / גרמנייה (germaniya, f). The country: גרמניה (Germaniya).', 'word', 'יש לי חבר גרמני בברלין. — yesh li chaver germani be-berlin — "I have a German friend in Berlin."', 'Germany has a complex historical resonance in Hebrew due to the Holocaust; modern usage is purely geographic.', null, [ACT.vocabularyPeople]),
    createContentItem('ניגרי / ניגרית', 'nigeri / nigerit', 'Nigerian — ניגרי (m) / ניגרית (f). The country: ניגריה (Nigeria).', 'word', 'אני ניגרי, מאבוג׳ה. — ani nigeri, me-abuja — "I am Nigerian, from Abuja."', 'African country names typically transliterate phonetically; the standard pattern country + -i still applies.', null, [ACT.vocabularyPeople]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: No copula
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'אין הווה לפועל "להיות"',
      'ein hove la-po\'al lihiyot',
      'Hebrew has NO present-tense form of the verb "to be". Sentences with present-tense identity are formed by simply juxtaposing subject and predicate: אני סטודנט (ani student) literally "I student" = "I am a student". This zero-copula structure is one of Hebrew\'s most distinctive features.',
      'sentence',
      'אני סטודנט. (ani student) "I am a student" · היא מורה. (hi morah) "She is a teacher" · הם חברים. (hem chaverim) "They are friends".',
      'The past and future of "to be" DO exist: הייתי (hayiti, I was), אהיה (ehye, I will be). Only the present is zero.',
      [
        { target: 'אני סטודנט', note: 'subject + noun; no verb between them' },
        { target: 'היא יפה', note: 'subject + adjective; same zero structure' },
        { target: 'הם בבית', note: 'subject + prepositional phrase; still no copula' },
      ],
      [ACT.grammarNoCopula],
    ),
    createContentItem(
      'הוא/היא כאוגד',
      'hu/hi ke-oged',
      'The third-person pronouns הוא/היא/הם/הן can be inserted between subject and predicate as a "pronoun copula" for emphasis or formal definition. דוד הוא רופא (David hu rofe) "David, he-is a doctor". Often used in definitions, formal sentences, and when the subject is itself a name or definite noun.',
      'sentence',
      'דוד הוא רופא. (David hu rofe) "David is a doctor" — pronoun copula adds slight formality\nשרה היא הרופאה החדשה. (Sarah hi ha-rofa ha-chadasha) "Sarah is the new doctor" — pronoun copula required-ish before definite noun.',
      'The pronoun copula is REQUIRED when the subject is definite and the predicate is also definite: only one such sentence type without it sounds wrong.',
      [
        { target: 'X הוא Y (definite Y)', note: 'pronoun-copula required: דוד הוא הרופא ("David is THE doctor")' },
        { target: 'X רופא (indefinite Y)', note: 'no copula needed: דוד רופא ("David is A doctor")' },
        { target: 'emphasis', note: 'inserting hu/hi adds rhetorical weight even when not required' },
      ],
      [ACT.grammarNoCopula],
    ),
    createContentItem(
      'שאלה כן/לא',
      'she\'ela ken/lo',
      'Form a yes/no question by RAISING INTONATION at the end of any statement. No word-order change, no particle. אתה סטודנט. → אתה סטודנט? — same words, just rising tone.',
      'sentence',
      'אתה סטודנט. (statement) → אתה סטודנט? (question)\nאת מאיטליה. → את מאיטליה?',
      'Optionally, the word האם (ha-im, "whether") can prefix a formal question: האם אתה סטודנט? — but this is mostly literary/formal; everyday questions just use intonation.',
      [
        { target: 'falling tone', note: 'statement: "you are a student"' },
        { target: 'rising tone', note: 'question: "are you a student?"' },
        { target: 'short answers: כן / לא', note: 'ken (yes) / lo (no); standalone replies are very common' },
      ],
      [ACT.grammarNoCopula],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Pronouns + gender
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'כינויי גוף',
      'kinuyei guf',
      'Hebrew has 10 personal pronouns, distinguishing person, number, and (in some) gender. Singular: אני, אתה, את, הוא, היא. Plural: אנחנו, אתם, אתן, הם, הן. Same form for subject and object in nominative use (אני means both "I" and as default subject).',
      'sentence',
      'אני ani (I), אתה ata (you-m), את at (you-f), הוא hu (he), היא hi (she), אנחנו anachnu (we), אתם atem (you-m-pl), אתן aten (you-f-pl), הם hem (they-m), הן hen (they-f).',
      'Mixed-gender groups always use the masculine form (atem, hem) by default — a feature of Hebrew gender system.',
      null,
      [ACT.grammarPronounsGender],
    ),
    createContentItem(
      'התאמת מין',
      'hat\'amat min',
      'Hebrew has TWO grammatical genders — masculine and feminine. Every noun, adjective, and verb form must agree in gender. There is no neuter. A student is סטודנט (m) or סטודנטית (f); good is טוב (m) or טובה (f); studies is לומד (m) or לומדת (f).',
      'sentence',
      'הוא סטודנט טוב. (hu student tov) "He is a good student"\nהיא סטודנטית טובה. (hi studentit tova) "She is a good student"',
      'The feminine endings -ah / -ah / -it / -et / -ya are the most common; with practice, gender agreement becomes automatic.',
      [
        { target: 'masculine: סטודנט טוב', note: 'unmarked noun + adjective both unmarked' },
        { target: 'feminine: סטודנטית טובה', note: 'noun ends -it; adjective ends -ah' },
        { target: 'plural-m: סטודנטים טובים', note: '-im plural ending on both' },
        { target: 'plural-f: סטודנטיות טובות', note: '-ot plural ending on both' },
      ],
      [ACT.grammarPronounsGender],
    ),
    createContentItem(
      'גוף שני ביחיד',
      'guf sheni ba-yachid',
      'Singular "you" splits by gender: אתה (ata) to a male, את (at) to a female. Getting this wrong is extremely audible and slightly awkward — Israelis correct it gently but immediately. Plural "you" is אתם (atem) for mixed/masculine, אתן (aten) for all-female.',
      'sentence',
      'דני, איפה אתה גר? — Dani, eifo ata gar? — to male\nשרה, איפה את גרה? — Sarah, eifo at gara? — to female',
      'The verb after at often takes a feminine ending (-et, -a), so the full gender match cascades through the sentence.',
      null,
      [ACT.grammarPronounsGender],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Negation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'לא',
      'lo',
      'General negation marker. Place לא (lo) BEFORE the verb or predicate to negate. For no-copula sentences, לא precedes the noun/adjective: אני לא סטודנט ("I am not a student"). The all-purpose negation word — covers present, future, and standalone "no".',
      'sentence',
      'אני לא סטודנט. (ani lo student) "I am not a student"\nאני לא יודע. (ani lo yode\'a) "I don\'t know"\nלא! (lo!) "No!"',
      'Note that לא is also the standalone reply for "no" — the same word for "not" and "no".',
      [
        { target: 'לא + noun/adj', note: 'negates a no-copula present sentence' },
        { target: 'לא + verb', note: 'negates a regular verb sentence' },
        { target: 'לא standalone', note: 'reply meaning "no"' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'לא … אלא …',
      'lo … ela …',
      'The standard polite correction pattern: לא X, אלא Y ("not X, rather Y"). Three parts: denial (לא), wrong item (X), correct item (אלא Y). The אלא (ela) literally means "rather, but actually" and is more elegant than just אבל (aval, "but").',
      'sentence',
      'אני לא יפני, אלא סיני. (ani lo yapani, ela sini) "I am not Japanese, rather Chinese."',
      'In casual speech, אלא can be replaced with אבל or אני … (just restarting the sentence), but the lo … ela … pattern is the textbook correction form.',
      [
        { target: 'לא (denial)', note: 'opens the correction politely' },
        { target: 'אלא (rather)', note: 'pivot to the correct answer' },
        { target: 'corrected item', note: 'closes the loop with the right answer' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'אין',
      'ein',
      'Existential negation — "there is not". Use אין (ein) for "there isn\'t X" sentences and for negating possession constructions. Distinct from לא: לא negates predicates, אין negates existence.',
      'sentence',
      'אין לי זמן. (ein li zman) "I don\'t have time" (lit. "there is not to-me time")\nאין כאן אף אחד. (ein kan af echad) "There is no one here"',
      'The positive form is יש (yesh, "there is"); together they form the basic existence/possession sentences.',
      null,
      [ACT.grammarNegation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'הצגה עצמית',
      'hatzaga atzmit',
      'A complete five-sentence self-introduction in Hebrew. Read it aloud with correct stress, chet pronunciation, and gender agreement. Notice the no-copula structure throughout: most sentences have no "to be" verb.',
      'sentence',
      'שלום! שמי שרה, ואני אמריקאית. אני סטודנטית באוניברסיטה העברית בירושלים. אני לומדת מדעי המחשב. נעים מאוד להכיר אתכם.',
      'Translation: "Hello! My name is Sarah, and I\'m American. I\'m a student at Hebrew University in Jerusalem. I study computer science. Nice to meet you all."',
      [
        { target: 'שמי שרה shmi Sarah', note: 'construct form of "my name"; literary alternative to "ha-shem sheli"' },
        { target: 'אני אמריקאית ani amerikait', note: 'feminine nationality form (speaker is female)' },
        { target: 'באוניברסיטה העברית', note: 'ba-universita ha-ivrit — "at Hebrew University"; preposition ba- = "in/at the"' },
        { target: 'בירושלים', note: 'bi-yerushalayim — "in Jerusalem" — Israel\'s capital' },
        { target: 'מדעי המחשב', note: 'mada\'ei ha-mach\'shev — "computer science"; literally "sciences of the computer"' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'שאלות הבנה',
      'she\'elot havana',
      'Four standard comprehension questions matching the paragraph. Answer in short sentences using the no-copula pattern. Note that question words mostly stay in their natural position (no English-style wh-fronting except for emphasis).',
      'sentence',
      'Q1: מה השם שלך? Q2: מאיפה את? Q3: איפה את לומדת? Q4: מה את לומדת?',
      'ma ha-shem shelach? · me\'efo at? · eifo at lomedet? · ma at lomedet?',
      [
        { target: 'A1: שמי שרה.', note: 'shmi Sarah — "my name is Sarah"' },
        { target: 'A2: אני מאמריקה.', note: 'ani me-amerika — "I am from America"' },
        { target: 'A3: באוניברסיטה העברית.', note: 'ba-universita ha-ivrit — "at Hebrew University"' },
        { target: 'A4: מדעי המחשב.', note: 'mada\'ei ha-mach\'shev — short answer drops the redundant "I study"' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'מפגש ראשון (שיחה — חברי)',
      'mifgash rishon (sicha — chaveri)',
      'A natural casual first-meeting conversation between two students at Hebrew University. Covers all the patterns from this lesson: greetings, names, origins, roles, agreements, and farewells.',
      'conversation',
      'דני: אהלן! איך קוראים לך?\nשרה: היי, אני שרה. ואתה?\nדני: אני דני. מאיפה את?\nשרה: אני מאמריקה, מבוסטון. ואתה?\nדני: אני מירושלים, גדלתי כאן. את גם סטודנטית באוניברסיטה?\nשרה: כן, אני לומדת מדעי המחשב.\nדני: וואו, אני גם! איזה צירוף מקרים!\nשרה: יאללה, נתראה בכיתה!',
      'A natural exchange between peers using casual register — the default for student-age interactions at Israeli universities. Note the casual ahalan greeting and yalla farewell.',
      [
        { target: 'איך קוראים לך?', note: 'eich kor\'im lecha/lach? — "what do they call you?" / "what\'s your name?"; literal: "how do they call to-you?"' },
        { target: 'גדלתי כאן gadalti kan', note: '"I grew up here"; past tense of גדל (gadal, to grow) with -ti first-person ending' },
        { target: 'איזה צירוף מקרים!', note: 'eize tziruf mikrim! — "what a coincidence!"; literally "what a combination of cases"' },
        { target: 'נתראה nitra\'e', note: '"we\'ll see each other"; first-person plural future of "to see"; common casual farewell' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      'מפגש ראשון (שיחה — רשמי)',
      'mifgash rishon (sicha — rishmi)',
      'A formal first-meeting conversation suitable for academic or professional contexts. Notice the formal vocabulary: nice-to-meet-you, the pronoun copula, full sentence structures — register markers signaling a more deliberate interaction.',
      'conversation',
      'סטודנט: שלום, פרופסור כהן. נעים מאוד להכיר אותך.\nפרופסור: שלום, ברוך הבא לאוניברסיטה.\nסטודנט: תודה. שמי דוד לוי, ואני סטודנט חדש.\nפרופסור: מצוין. מאיפה אתה, דוד?\nסטודנט: אני מארצות הברית, אבל גדלתי בישראל.\nפרופסור: יופי. מצפה לעבוד איתך השנה.\nסטודנט: תודה רבה, פרופסור.',
      'Same information as the casual version but with formal phrasing throughout — appropriate for hierarchical (student-professor) relationships, though even this is far less hierarchical than European or East Asian equivalents.',
      [
        { target: 'נעים מאוד להכיר אותך', note: 'na\'im me\'od lehakir otcha — "very nice to meet you"; full first-meeting phrase' },
        { target: 'ברוך הבא baruch ha-ba', note: '"welcome"; literally "blessed (is) he who comes"; feminine form: ברוכה הבאה (bruchah ha-ba\'a)' },
        { target: 'ארצות הברית', note: 'artzot ha-brit — "United States"; literal "lands of the covenant"' },
        { target: 'מצפה לעבוד איתך', note: 'metzapeh la\'avod itcha — "I look forward to working with you"; metzapeh = "expecting/looking forward"' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'תבנית כתיבה',
      'tavnit ktiva',
      'A reusable five-sentence template for any Hebrew self-introduction. Fill in the bracketed slots with your own information — the structure carries the rest. Note that all forms must match your gender.',
      'sentence',
      'שלום! שמי [שם]. אני [לאום]. אני [תפקיד] באוניברסיטה העברית. אני [פרט נוסף]. נעים מאוד.',
      'Translation: "Hello! My name is [name]. I am [nationality]. I am a [role] at Hebrew University. I [extra fact]. Very nice to meet you."',
      [
        { target: '[שם]', note: 'your name — first name only is standard in Israel, even formal' },
        { target: '[לאום]', note: 'nationality with gender suffix: אמריקאי (m) / אמריקאית (f), סיני (m) / סינית (f), etc.' },
        { target: '[תפקיד]', note: 'role with gender: סטודנט (m) / סטודנטית (f), מורה, מהנדס/מהנדסת' },
        { target: '[פרט נוסף]', note: 'something specific (hobby, major, where you live); avoid generic facts' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      'תרגיל כתיבה',
      'targil ktiva',
      'Write your own 3–5 sentence self-introduction in Hebrew using the template. Make sure every adjective, noun, and verb agrees in gender with you (the speaker).',
      'sentence',
      'דוגמה: שלום! שמי לי. אני סינית מבייג׳ינג. אני סטודנטית באוניברסיטה העברית, ולומדת היסטוריה. אוהבת מאוד את ירושלים. נעים מאוד!',
      'Translation: "Hello! My name is Li. I\'m Chinese from Beijing. I\'m a student at Hebrew University and I study history. I love Jerusalem very much. Nice to meet you!"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'שמות פרטיים',
      'shemot pratiyim',
      'In Israeli culture, FIRST NAMES are used almost universally — from kindergarten to professors to government ministers. Calling a professor "Dr. Cohen" sounds slightly stiff; "Dani" or "David" is normal. Last names exist for paperwork but are rarely used in face-to-face interaction.',
      'sentence',
      'דני (Dani), שרה (Sarah), אסף (Asaf), מיכל (Michal) — first names work everywhere.',
      'A senior professor might be called דני by undergraduates, post-docs, and colleagues alike. This egalitarian custom is one of Israel\'s sharpest cultural markers.',
      [
        { target: 'first names ubiquitous', note: 'in classrooms, offices, hospitals, government' },
        { target: 'titles rare', note: 'פרופסור (profesor), דוקטור (doktor) used sparingly, often dropped after first introduction' },
        { target: 'last names', note: 'reserved for written correspondence, ID papers, signage' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'שירות צבאי',
      'sherut tzeva\'i',
      'Almost every Jewish Israeli serves in the IDF (צה"ל, Tzahal) from age 18 — men typically 32 months, women 24. Military service is a universal life experience and a major source of social bonding. "Where did you serve?" (איפה שירתת?) is a standard introductory question, like asking "where did you go to college?" in the US.',
      'sentence',
      'איפה שירתת? — eifo sheratata? (to male) / eifo sherat? (to female) — "where did you serve?"',
      'Even non-veterans (Arab Israelis, Haredi Jews) know this is a default ice-breaker; the question is usually genuine, not nationalist.',
      [
        { target: 'שירות חובה', note: 'sherut chova — mandatory service; default for Jewish Israelis' },
        { target: 'יחידה', note: 'yechida — unit; people mention theirs by name or number' },
        { target: 'שירות לאומי', note: 'sherut le\'umi — national service; civilian alternative for religious women' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'דוגרי',
      'dugri',
      'A defining feature of Israeli social style: DIRECTNESS. The Hebrew word דוגרי (dugri, from Turkish/Arabic doğru "straight") means "straight talk" — saying what you think without softening. Israelis ask personal questions early (salary, marital status, religious observance), bargain hard, give blunt feedback, and consider this WARM rather than rude.',
      'sentence',
      'דוגמה: על כמה אתה משלם שכר דירה? — al kama ata meshalem schar dira? — "how much do you pay in rent?" — a question Israelis ask within minutes of meeting.',
      'For learners from indirect cultures (East Asia, parts of Europe), the dugri style takes adjustment; for those from direct cultures (US Northeast, parts of Northern Europe), it can feel familiar.',
      null,
      [ACT.culture],
    ),
    createContentItem(
      'בלגן',
      'balagan',
      'A signature Israeli concept: בלגן (balagan, from Russian) means "chaos, mess, disorder" — and Israelis embrace it. Everything from traffic to bureaucracy to office layout is described as "balagan" and that\'s often a compliment about being alive, energetic, and improvisational. Compare to the Japanese cultural value of order; Israel\'s is the opposite.',
      'sentence',
      'איזה בלגן! — eize balagan! — "what a mess!" — can mean genuinely chaotic OR delightfully bustling.',
      'Sister concepts: יהיה בסדר (yihye beseder, "it will be okay") and סמוך עליי (smoch alay, "trust me") — the Israeli faith in improvising through chaos.',
      null,
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'משימה: יום ראשון באוניברסיטה',
      'mesima: yom rishon ba-universita',
      'Roleplay your first day at Hebrew University of Jerusalem with the AI tutor playing a friendly returning Israeli student. Use every skill from this lesson in one continuous scene — greet, introduce, ask, answer, farewell.',
      'conversation',
      '[Seminar room, Hebrew University]\nהסטודנט הישראלי: אהלן! איך קוראים לך?\nאתה: [מברך + מציג את עצמך]\nהסטודנט הישראלי: מאיפה אתה/את?\nאתה: [אומר/אומרת מאיזו ארץ/עיר]\nהסטודנט הישראלי: סטודנט/ית חדש/ה? מה אתה לומד / את לומדת?\nאתה: [עונה + שואל בחזרה]\nהסטודנט הישראלי: יופי! בהצלחה השנה!\nאתה: [נפרד]',
      'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: 'ברכה', note: 'שלום / אהלן — pick the register that matches the opener' },
        { target: 'הצגה עצמית', note: 'אני [שם] — first name is standard' },
        { target: 'לאום', note: 'אני [לאום] — apply gender suffix' },
        { target: 'תחום לימוד', note: 'אני לומד/ת [תחום] — what you study' },
        { target: 'פרידה', note: 'להתראות / יאללה ביי / נתראה — match the register' },
      ],
      [ACT.task],
    ),
    createContentItem(
      'אתגר — תיקון הנחה',
      'etgar — tikun hanacha',
      'Stretch goal: in the same scene, the Israeli student guesses your country incorrectly. Politely correct using the לא … אלא … pattern. Closes the loop without making the asker feel embarrassed.',
      'conversation',
      'הסטודנט הישראלי: אה, אתה אמריקאי?\nאתה: לא, אני לא אמריקאי. אני סיני, מבייג׳ינג.\nהסטודנט הישראלי: סליחה, התבלבלתי!\nאתה: אין דבר, אין דבר.',
      '"ein davar" (אין דבר) is a casual reassurance — "it\'s nothing" — common after any small mistake or apology. Israelis say it warmly, often repeated twice.',
      [
        { target: 'לא … אלא …', note: 'the standard polite correction pattern from Grammar III' },
        { target: 'אין דבר ein davar', note: 'casual reassurance ("it\'s nothing"); standard response to a small apology' },
        { target: 'סליחה slicha', note: 'all-purpose "sorry" or "excuse me"; from the verb לסלוח (slicha, to forgive)' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
