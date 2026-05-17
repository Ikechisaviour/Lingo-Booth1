// Level 1 Unit 1 — Greetings & Self-Introduction (Bengali / Bangla)
// Functions: greeting, introducing yourself, asking where someone is from,
// correcting a wrong assumption, farewells.
// This lesson is the canonical TEMPLATE for all Bengali thematic Level 1 lessons.
//
// All content is authored with Bangla script (target) + ISO-15919 / simplified
// transliteration (romanization) + English glosses (canonical source). The AI
// conversation tutor reads this curriculum and delivers it to each learner in
// their preferred native language at runtime — never assume a specific L1 here.
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
  orientation: 'bn-l1u1-orientation',
  pronunciation: 'bn-l1u1-pronunciation',
  vocabularyGreetings: 'bn-l1u1-vocab-greetings',
  vocabularyPeople: 'bn-l1u1-vocab-people',
  grammarCopula: 'bn-l1u1-grammar-copula',
  grammarPronouns: 'bn-l1u1-grammar-pronouns',
  grammarNegation: 'bn-l1u1-grammar-negation',
  reading: 'bn-l1u1-reading',
  listening: 'bn-l1u1-listening',
  writing: 'bn-l1u1-writing',
  culture: 'bn-l1u1-culture',
  task: 'bn-l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet someone in Bengali across three registers — Muslim-default (আসসালামু আলাইকুম), Hindu-default (নমস্কার), and casual secular (হ্যালো / কেমন আছ?) — and pick the right one for each context in BD and WB.',
      'Introduce yourself with your name, country, and one role (student / teacher / engineer) using the আমি ... and আমার নাম ... patterns.',
      'Ask another person their name (আপনার নাম কী?) and where they are from (আপনি কোথা থেকে এসেছেন?), then respond appropriately.',
    ],
    task: 'Picture your first day at the University of Dhaka (ঢাকা বিশ্ববিদ্যালয়) — you walk into the TSC student center and meet a visiting researcher from Kolkata. By the end of this lesson you should handle the whole exchange in Bengali without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Apply the inherent ô correctly: নমস্কার is nômoshkar (three syllables, not "namaskar" or "nômskar") — DO NOT delete the inherent vowel as Hindi does.',
      'Distinguish the retroflex consonants in টা/ঠা/ডা/ঢা from the dental ones in তা/থা/দা/ধা; words like ঢাকা Ḍhaka (capital) and নাম nam ("name") sit on opposite ends of this contrast.',
      'Read the three sibilants শ/ষ/স uniformly as "sh" before vowels: শুভেচ্ছা shubhecchha, ষষ্ঠ shôshṭhô, সালাম salam (the last keeps /s/ because of the Arabic loan origin).',
    ],
    task: 'Read each example aloud and identify whether the consonant is retroflex or dental, then apply the inherent ô without deleting it.',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 12 greetings and farewells across three registers — religious-Muslim, religious-Hindu, secular — with the right phrase for each situation in BD and WB.',
      'Distinguish আপনি apni (formal-honorific) from তুমি tumi (familiar) and তুই tui (intimate) so the choice of "you" in your greeting matches the relationship.',
    ],
    task: 'Say each phrase three times aloud with the correct inherent ô, then pair each one to a situation: (1) meeting an elder Muslim man in Dhaka, (2) meeting a Hindu professor in Kolkata, (3) greeting a peer at the cafeteria.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and nationalities',
    goals: [
      'Use the 8 core personal pronouns including the three-tier "you" (তুই tui / তুমি tumi / আপনি apni) and the parallel three-tier "he/she" (সে she / তিনি tini — same person, different respect levels).',
      'State your role (ছাত্র/ছাত্রী, শিক্ষক, ইঞ্জিনিয়ার, ডাক্তার) and nationality (country name + -ীয় or "-ের") in a complete short sentence.',
    ],
    task: 'Say your own role and nationality using the আমি ... pattern, then describe one classmate using সে / তিনি ....',
  },
  {
    id: ACT.grammarCopula,
    section: 'Grammar I',
    title: 'Zero copula in present tense — "I am" without a verb',
    goals: [
      'Recognize that Bengali typically DROPS the copula ("to be") in simple present-tense identifications: আমি ছাত্র ami chhatro literally "I student" = "I am a student". No verb is needed.',
      'For emphasis or formal writing, the copula হই / হও / হন (am / are / is) can be added: আমি ছাত্র হই ami chhatro hôi — but in everyday speech, the zero-copula form is the default.',
      'Use the optional pronoun-drop: with first/second person, the subject is often dropped if clear from context (ছাত্র = "[I/you] am/are a student" given the right register).',
    ],
    task: 'Write six zero-copula sentences using আমি / তুমি / আপনি / সে / তিনি as subjects, with one different complement noun each.',
  },
  {
    id: ACT.grammarPronouns,
    section: 'Grammar II',
    title: 'Personal pronouns + possessive genitive -র / -এর',
    goals: [
      'Use the 8 core personal pronouns: আমি ami (I), আমরা amra (we), তুই tui (you-intimate), তুমি tumi (you-familiar), আপনি apni (you-honorific), সে she (he/she-ordinary), তিনি tini (he/she-honorific), তারা tara (they-ordinary).',
      'Form the genitive (possessive) with the case clitic -র (after vowels) or -এর (after consonants): আমা+র = আমার ("my"), নাম+এর = নামের ("of the name").',
      'Note that Bengali has NO grammatical gender — সে covers both "he" and "she"; only context tells you which.',
    ],
    task: 'Construct three possessive phrases using -র / -এর with different pronouns (আমার বই amar bôi "my book", তোমার নাম tomar nam "your name", তাঁর দেশ tãr desh "his/her honorific country").',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar III',
    title: 'Negation with না na and the বরং ... না ... correction pattern',
    goals: [
      'Negate a noun-identity statement by placing না na AFTER the noun: আমি ছাত্র না ami chhatro na ("I am not a student"). For verbal predicates, না goes after the verb.',
      'Apply the correction pattern X না, Y "not X, but Y" to politely correct someone\'s wrong guess: আমি জাপানি না, বাংলাদেশী ami japani na, bangladeshi ("I\'m not Japanese, I\'m Bangladeshi").',
      'Distinguish না na (general negation) from নয় nôy (formal/literary negation with copula): both translate "not" but নয় is essay-register.',
    ],
    task: 'Imagine a classmate guesses your nationality wrong; correct them in one polite sentence using the X না, Y pattern.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a self-introduction',
    goals: [
      'Read a short Bangla self-introduction paragraph aloud with correct inherent vowels, retroflex/dental contrasts, and natural rhythm.',
      'Answer comprehension questions about the speaker\'s name, country, role, and department.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first meeting',
    goals: [
      'Follow a 6-turn first-meeting dialogue and recognize the religious-default register markers (salam vs nômoshkar, apni vs tumi).',
      'Reproduce the dialogue with your own name and country, swapping in the relevant phrases naturally.',
    ],
    task: 'Read the polite dialogue along with the AI tutor first, then perform it again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own self-introduction',
    goals: [
      'Write 3–5 sentences in Bangla script covering greeting, name, country, role, and one extra fact.',
      'Use the genitive -র / -এর at least once and a possessive pronoun at least once so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Write your own self-introduction in 3–5 sentences using the model on the left, then read it aloud with correct pronunciation.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Religious-default greetings, honorific you, and the BD/WB split',
    goals: [
      'Pick a greeting that matches the addressee\'s likely tradition: assalamu alaikum for BD-Muslim contexts, nômoshkar for WB-Hindu contexts, secular hyalo / kemon achho for peers.',
      'Use আপনি apni with elders, professors, strangers, and anyone you should respect — switching to তুমি tumi mid-conversation signals familiarity (welcome with peers, inappropriate with seniors).',
      'Use family name + title (স্যার Sir, ম্যাডাম Madam, ভাই Bhai "brother", আপা Apa "elder sister") to address adults; first-name basis is rare across hierarchies.',
    ],
    task: 'Decide how you would address (1) a Muslim professor in Dhaka, (2) a Hindu professor in Kolkata, (3) a classmate of either tradition — give the full Bengali greeting + form of address for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day at ঢাকা বিশ্ববিদ্যালয় — in Bengali',
    goals: [
      'Combine everything from this lesson into one continuous scene with no break between greeting, introduction, question, answer, correction, and farewell.',
      'Use the correct register (apni vs tumi) based on the relationship; switch up or down a level if the interlocutor invites it.',
    ],
    task: 'Roleplay your first day at the University of Dhaka with the AI tutor playing a visiting researcher from Kolkata; aim for a 6-turn exchange in Bengali, with the religious-default greeting matched to context.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 1: আসসালামু আলাইকুম / নমস্কার — Greetings and Self-Introduction',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'bn',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely with assalamu alaikum / nômoshkar / kemon achho — and match the religious-cultural register to the addressee.' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences using আমার নাম ... and আমি ....' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask আপনি কোথা থেকে এসেছেন? or তুমি কোথা থেকে এসেছ? and respond naturally with country.' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use the X না, Y pattern to politely correct a wrong guess about your nationality or role.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'এই পাঠের লক্ষ্য',
      'ei paṭher lôkkhô',
      'By the end of this lesson, you can greet someone in Bengali, give your name, say where you are from, ask the same back, and farewell — all in one short conversation without pausing to think, with the right register for BD-Muslim, WB-Hindu, and secular peer contexts.',
      'word',
      'কাজ: অভিবাদন → পরিচয় → প্রশ্ন → উত্তর → বিদায় (functions: greet → introduce → question → answer → farewell)',
      'These five micro-skills are the spine of every social encounter in Bengali — once they\'re automatic, every later lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      'বাস্তব পরিস্থিতি',
      'bastôb pôristhiti',
      'You are at the TSC student center of the University of Dhaka on your first day, and a visiting researcher from Jadavpur University in Kolkata turns to you. The whole encounter takes about 30 seconds, and you will need every micro-skill from this lesson — including switching from Bangladesh-default to West Bengal-default register mid-conversation.',
      'word',
      'গবেষক: "আসসালামু আলাইকুম। আমি যাদবপুর থেকে এসেছি। আপনার নাম কী?"',
      'A typical opener: salam greeting (recognizing the BD host\'s likely Muslim context) + origin statement + name question — a common Bengali academic-visit pattern.',
      [
        { target: 'আসসালামু আলাইকুম assalamu alaikum', note: 'Arabic-derived Muslim greeting; the unmarked greeting in BD; reply ওয়ালাইকুম আসসালাম walaikum assalam' },
        { target: 'আমি ami', note: 'first-person singular pronoun; no grammatical gender' },
        { target: 'আপনার নাম কী? apnar nam ki?', note: 'literally "your-honorific name what?"; standard name-asking question' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      'তিন স্তরের সম্মান',
      'tin stôrer shômman',
      'Bengali distinguishes three rough politeness registers built into the pronoun system. Intimate (তুই tui — children, siblings, very close friends, sometimes God): "তুই কেমন আছিস?" tui kemôn achhish?. Familiar (তুমি tumi — peers, younger people, family): "তুমি কেমন আছ?" tumi kemôn achho?. Honorific (আপনি apni — elders, strangers, customers, professors): "আপনি কেমন আছেন?" apni kemôn achhen?',
      'word',
      'তুই / তুমি / আপনি — same word "you", three respect levels — and EACH PRONOUN TAKES ITS OWN VERB ENDING.',
      'The verb ending changes WITH the pronoun (-ish for tui, -o for tumi, -en for apni), so the register is signaled doubly — pronoun + verb form.',
      [
        { target: 'INTIMATE: তুই tui / আছিস achhish', note: 'use with children, siblings, lifelong friends, sometimes God in prayer; using with a stranger is rude' },
        { target: 'FAMILIAR: তুমি tumi / আছ achho', note: 'use with peers, younger acquaintances, family members of similar age; the default among university students' },
        { target: 'HONORIFIC: আপনি apni / আছেন achhen', note: 'use with elders, professors, strangers, customers, in formal contexts; the SAFE default when in doubt' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'নমস্কার',
      'nômoshkar (3 syllables, not 2)',
      'CRITICAL pronunciation: the inherent ô in the second consonant cluster is preserved — nô-môsh-kar (three syllables), not "namaskar" (Hindi) or "nômskar" (incorrect schwa deletion). Sanskrit-derived greeting "I bow to you", standard among Bengali Hindus.',
      'word',
      'নমস্কার nômoshkar — fold hands at chest, slight bow, say the word slowly',
      'A learner who pronounces it "namaskar" is reading it as Hindi; the inherent Bengali ô must be preserved in each syllable.',
      [
        { target: 'ন (nô)', note: 'first syllable; dental n + inherent ô' },
        { target: 'ম (mô)', note: 'second syllable; labial m + inherent ô — NOT silent' },
        { target: 'স্ক (shkô)', note: 'conjunct স + ক; in modern Bengali pronounced "sh-k"' },
        { target: 'কার (kar)', note: 'final syllable; ক + আ-kar = ka, then র = r — no inherent ô after র because final r ends the word' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'আসসালামু আলাইকুম',
      'assalamu alaikum (Arabic loan, fixed phrase)',
      'A loanword phrase from Arabic ("peace be upon you"), pronounced as a continuous unit. Notice the double স (স্স) which represents Arabic gemination, and the kar আ-kar wrapping around the syllable. Standard Muslim greeting in BD.',
      'word',
      'আসসালামু আলাইকুম assalamu alaikum — reply: ওয়ালাইকুম আসসালাম walaikum assalam',
      'Treat this phrase as a fixed expression — do NOT analyze morpheme by morpheme; native speakers say it as one breath unit.',
      [
        { target: 'আস-সা-লা-মু', note: 'four syllables; double স্স represents Arabic gemination, kept in writing but spoken as a single long s' },
        { target: 'আ-লাই-কুম', note: 'three syllables; final -কুম has the inherent ô on ম suppressed by context' },
        { target: 'reply pattern', note: 'walaikum assalam is the standard reply; never use the same phrase you received' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'কেমন আছেন',
      'kemôn achhen',
      'The honorific "how are you?". কেমন kemôn ("how") + আছেন achhen (be-honorific). Notice the verb-second pattern from English-perspective: literally "how are-honorific", with the verb at the END.',
      'word',
      'আপনি কেমন আছেন? apni kemôn achhen?',
      'For familiar register, replace with কেমন আছ? kemôn achho?. For intimate, কেমন আছিস? kemôn achhish?.',
      [
        { target: 'কেমন kemôn', note: '"how"; question word, dental k + inherent ô' },
        { target: 'আছেন achhen', note: 'present-tense be-verb, honorific 3rd person; -en is the honorific suffix' },
        { target: 'verb at end', note: 'Bengali is SOV — verb comes LAST, unlike English SVO' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'ঢাকা',
      'Ḍhaka (retroflex aspirated ḍh)',
      'The capital of Bangladesh and the name of this curriculum\'s anchor university. Critical pronunciation: ঢ ḍh is the RETROFLEX VOICED ASPIRATED stop — tongue curled BACK to the roof, voicing on, with a breath release. English speakers often substitute "d" or "dh" — both wrong.',
      'word',
      'ঢাকা বিশ্ববিদ্যালয় Ḍhaka Bishwobiddyaloy ("University of Dhaka", est. 1921)',
      'The city was historically transliterated "Dacca" in English but officially "Dhaka" since 1982; the retroflex aspirate is the original sound.',
      [
        { target: 'ঢ ḍh', note: 'voiced aspirated retroflex; tongue curled back, breathy release' },
        { target: 'compare ঢাকা (city) vs ঢাকা (covered)', note: 'same spelling, both pronounced ḍhaka; context disambiguates ("Dhaka" the city vs "covered" past participle)' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'বিশ্ববিদ্যালয়',
      'bishwobiddyaloy',
      'The word for "university" — six syllables, two conjunct consonants, one rich tatsama (Sanskrit-derived) compound. Literal breakdown: বিশ্ব (world) + বিদ্যা (knowledge) + আলয় (place) = "place of world-knowledge". Three high-frequency conjuncts in one word: শ্ব, দ্য, ালয়.',
      'word',
      'ঢাকা বিশ্ববিদ্যালয় Ḍhaka Bishwobiddyaloy · যাদবপুর বিশ্ববিদ্যালয় Jadôbpur Bishwobiddyaloy',
      'A learner who can read this word fluently has internalized the conjunct system; reading it stumblingly signals the script is still parsed letter-by-letter.',
      [
        { target: 'বিশ্ব bishwô', note: '"world"; conjunct শ্ব = শ + ব' },
        { target: 'বিদ্যা biddya', note: '"knowledge"; conjunct দ্য = দ + য' },
        { target: 'আলয় aloy', note: '"abode, place"; from Sanskrit ālaya' },
        { target: 'rhythm', note: 'six syllables with stress on bid-dya — say slowly first, then build speed' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('আসসালামু আলাইকুম', 'assalamu alaikum', 'The standard Muslim greeting in Bangladesh and among Muslim communities in West Bengal; Arabic "peace be upon you". Used any time of day, in any register from casual to formal, between Muslim speakers. The reply is fixed: ওয়ালাইকুম আসসালাম walaikum assalam ("and peace upon you").', 'word', 'আসসালামু আলাইকুম, ভাই। কেমন আছেন? assalamu alaikum, bhai. kemôn achhen? ("Peace upon you, brother. How are you-honorific?")', 'High-frequency in BD; using it as a foreigner is welcomed and signals cultural awareness. Non-Muslims in BD may also use it casually.', null, [ACT.vocabularyGreetings]),
    createContentItem('ওয়ালাইকুম আসসালাম', 'walaikum assalam', 'The fixed reply to assalamu alaikum — "and peace upon you". You NEVER use the same greeting back; the reply is morphologically different. Saying the wrong reply marks the speaker as a learner.', 'word', 'A: আসসালামু আলাইকুম। B: ওয়ালাইকুম আসসালাম। কেমন আছেন?', 'Always pair these two; treating them as a unit makes the response automatic.', null, [ACT.vocabularyGreetings]),
    createContentItem('নমস্কার', 'nômoshkar', 'The standard Hindu greeting in West Bengal and among Hindu communities in Bangladesh; Sanskrit "I bow to you". Hands folded at chest, slight bow. Used any time of day with anyone respected. The reply is the same word: নমস্কার.', 'word', 'নমস্কার, দিদি। ভাল আছেন? nômoshkar, didi. bhalo achhen? ("Namaskar, elder sister. Are you well?")', 'High-frequency in WB; the standard greeting for first meetings, especially with elders or in formal/professional contexts. Inappropriate in conservative Muslim contexts where salam is expected.', null, [ACT.vocabularyGreetings]),
    createContentItem('হ্যালো', 'hyalo', 'A casual secular greeting borrowed from English "hello". Used among friends, peers, on phone calls, and in cross-religion contexts where neither salam nor nômoshkar fits. Modern, youthful register; common among urban university students in both BD and WB.', 'word', 'হ্যালো! কেমন আছ? hyalo! kemôn achho? ("Hello! How are you-familiar?")', 'Equivalent to English casual "hi/hello"; not appropriate with elders or in formal contexts but ubiquitous among young people.', null, [ACT.vocabularyGreetings]),
    createContentItem('কেমন আছেন', 'kemôn achhen', 'The honorific "how are you?". Pairs with আপনি apni. Standard polite inquiry at the start of any meeting beyond the greeting itself. The full polite opening is greeting + name + কেমন আছেন?', 'word', 'নমস্কার, ভাই। কেমন আছেন? nômoshkar, bhai. kemôn achhen?', 'Like English "how are you?", the honorific form is a ritual rather than a real question — answer with ভাল আছি bhalo achhi ("I am well"). For familiar register use কেমন আছ?, for intimate কেমন আছিস?.', null, [ACT.vocabularyGreetings]),
    createContentItem('ভাল আছি', 'bhalo achhi', 'The standard reply to "how are you?": "I am well". আছি achhi is the first-person present-tense form of the be-verb (the only pronoun without honorific-vs-non-honorific distinction in this paradigm). Often expanded to ভাল আছি, আপনার? bhalo achhi, apnar? ("I\'m well, and you-honorific?").', 'word', 'A: কেমন আছেন? B: ভাল আছি, ধন্যবাদ। আপনি?', 'High-frequency formulaic exchange; complete the turn by returning the question (আপনি? / তুমি?).', null, [ACT.vocabularyGreetings]),
    createContentItem('শুভ সকাল', 'shubhô shôkal', 'A polite-to-formal morning greeting ("good morning"), used roughly from dawn to ~10 AM. The compound শুভ shubhô ("auspicious") + সকাল shôkal ("morning") is more formal than আসসালামু আলাইকুম or নমস্কার and is common in workplaces, broadcasts, and printed cards. Cognate with WB usage শুভ প্রভাত shubhô prôbhat (more literary).', 'word', 'শুভ সকাল, স্যার। shubhô shôkal, sar. ("Good morning, sir.")', 'Polite morning greeting in formal/professional contexts; sometimes used together WITH the religious greeting (assalamu alaikum + shubhô shôkal).', null, [ACT.vocabularyGreetings]),
    createContentItem('শুভ রাত্রি', 'shubhô ratri', 'A polite-formal "good night" — a farewell, not a greeting. Used when parting in the evening or before sleep. The WB-literary variant শুভ রজনী shubhô rojôni is highly poetic and now rare. Compare with the morning শুভ সকাল.', 'word', 'শুভ রাত্রি। ভাল করে ঘুমাবেন। shubhô ratri. bhalo kôre ghumaben. ("Good night. Sleep well-honorific.")', 'Polite farewell-at-night; the second sentence "sleep well-honorific" pairs the wish with a polite imperative.', null, [ACT.vocabularyGreetings]),
    createContentItem('স্বাগতম', 'shagôtôm', 'A formal "welcome" used to receive someone — at an event, a home, an office. Sanskrit-derived. Written স্বা (conjunct স+ব), pronounced "shôa" or "sha" depending on speaker. Common in printed welcome signs and formal speech openings.', 'word', 'ঢাকা বিশ্ববিদ্যালয়ে আপনাকে স্বাগতম। Ḍhaka bishwobiddyaloye apnake shagôtôm. ("Welcome to the University of Dhaka.")', 'High-register welcome; for casual welcome use the more conversational আসুন asun ("please come") or চলে আসো chôle asho.', null, [ACT.vocabularyGreetings]),
    createContentItem('ধন্যবাদ', 'dhônnôbad', 'The standard polite "thank you". Sanskrit-derived (literally "praise-word"). Used in all polite contexts in both BD and WB. The informal alternative শুকরিয়া shukria (Persian-derived) appears in BD-Muslim contexts.', 'word', 'অনেক ধন্যবাদ আপনার সাহায্যের জন্য। ônek dhônnôbad apnar shahajjyer jônnyô. ("Many thanks for your help.")', 'Universal polite "thank you"; the intensifier অনেক ("much/many") is added freely. Casual peers may just nod or say থ্যাঙ্কস thyangkks (English loan).', null, [ACT.vocabularyGreetings]),
    createContentItem('আল্লাহ হাফেজ', 'allaha hafez', 'The standard Muslim farewell in BD — Arabic-derived, "may Allah protect (you)". Used at the end of meetings, calls, and visits between Muslim speakers. The Hindu/secular equivalent is খোদা হাফেজ khôda hafez (also Persian/Arabic-derived, "may God protect") which is also widely used in BD across communities.', 'word', 'ভাল থাকবেন। আল্লাহ হাফেজ। bhalo thakben. allaha hafez. ("Stay well. Allah hafez.")', 'Standard BD-Muslim farewell; in WB-Hindu contexts, the parallel form is নমস্কার (which doubles as both greeting and farewell).', null, [ACT.vocabularyGreetings]),
    createContentItem('বিদায়', 'biday', 'A formal-literary "farewell". Used in printed cards, formal speeches, and the dramatic register. In everyday conversation, the more common farewells are আবার দেখা হবে abar dekha hôbe ("we\'ll meet again") and the religious-default farewells above. Sanskrit-derived.', 'word', 'বিদায়, প্রিয় বন্ধু। আবার দেখা হবে। biday, priyô bôndhu. abar dekha hôbe. ("Farewell, dear friend. We\'ll meet again.")', 'Literary register; casual peer-to-peer farewells use আসি ashi ("[I am] coming/leaving") or চলি chôli ("[I am] going") — less final than biday.', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People, roles, nationalities
    // ────────────────────────────────────────────────────────────────────
    createContentItem('আমি', 'ami', 'First-person singular pronoun "I". Used identically for male and female speakers — Bengali has no grammatical gender. The genitive (possessive) is আমার amar ("my"); the accusative-dative is আমাকে amake ("to me").', 'word', 'আমি ছাত্র। ami chhatro. ("I am a [male] student.") / আমি ছাত্রী। ami chhatri. ("I am a [female] student.")', 'The simplest possible self-introduction: ami + role noun. Note that the role noun is gendered (chhatro vs chhatri), even though the pronoun is not.', null, [ACT.vocabularyPeople]),
    createContentItem('আমরা', 'amra', 'First-person plural pronoun "we". Formed by adding -রা -ra to ami. Same form for inclusive and exclusive "we" — context disambiguates.', 'word', 'আমরা বাংলাদেশী। amra bangladeshi. ("We are Bangladeshi.")', 'Plural pronoun; verb agrees in -i ending (আমরা আছি amra achhi "we are").', null, [ACT.vocabularyPeople]),
    createContentItem('তুই', 'tui', 'INTIMATE second-person pronoun "you". Use ONLY with very close peers, younger siblings, children, lifelong friends, and in some religious traditions with God in prayer. Using তুই with a stranger or elder is deeply rude and signals disrespect or aggression. The genitive is তোর tor.', 'word', 'তুই কি ভাল আছিস? tui ki bhalo achhish? ("Are you[intimate] well?")', 'Among adults, তুই is reserved for the inner circle; defaulting to তুমি is much safer.', null, [ACT.vocabularyPeople]),
    createContentItem('তুমি', 'tumi', 'FAMILIAR second-person pronoun "you". The default register among university students, peers, friends, family members of similar age, and younger people you know. Standard for husband-wife in modern BD/WB. Genitive: তোমার tomar.', 'word', 'তুমি কেমন আছ? tumi kemôn achho? ("How are you[familiar]?")', 'The everyday "you" in peer contexts; switching from আপনি to তুমি signals warmth and intimacy.', null, [ACT.vocabularyPeople]),
    createContentItem('আপনি', 'apni', 'HONORIFIC second-person pronoun "you". Use with elders, professors, strangers, customers, in formal/professional contexts, and as the SAFE DEFAULT whenever in doubt. Genitive: আপনার apnar. The verb agrees in -en (আছেন achhen "you-honorific are").', 'word', 'আপনি কোথা থেকে এসেছেন? apni kothay theke esechhen? ("Where have you[honorific] come from?")', 'In professional and academic contexts, foreigners should default to apni; switching to tumi can come later if the host invites it.', null, [ACT.vocabularyPeople]),
    createContentItem('সে', 'she', 'Third-person ORDINARY pronoun "he/she/they-singular". NO GENDER distinction — সে covers all genders. Used for peers, equals, and people of unmarked social rank. Genitive: তার tar.', 'word', 'সে আমার বন্ধু। she amar bôndhu. ("He/she is my friend.")', 'Bengali has no he/she split — the gender of the referent is signaled only by context, nouns, or other vocabulary.', null, [ACT.vocabularyPeople]),
    createContentItem('তিনি', 'tini', 'Third-person HONORIFIC pronoun "he/she-honorific". Used for elders, professors, public figures, and anyone whose status calls for respect. Same person can be called সে by a peer and তিনি by a junior. Genitive: তাঁর tãr (note the candrabindu nasalization).', 'word', 'তিনি ঢাকা বিশ্ববিদ্যালয়ের শিক্ষক। tini Ḍhaka bishwobiddyaloyer shikkhôk. ("He/she-honorific is a teacher at the University of Dhaka.")', 'Choosing তিনি signals you respect the person being referred to; choosing সে signals equal status.', null, [ACT.vocabularyPeople]),
    createContentItem('তারা', 'tara', 'Third-person plural pronoun "they". Same form for ordinary and honorific (in plurals the distinction collapses in modern usage). Genitive: তাদের tader.', 'word', 'তারা সবাই ছাত্র। tara shôbai chhatro. ("They are all students.")', 'Plural reference; the singular ordinary সে / honorific তিনি split does not extend to plurals.', null, [ACT.vocabularyPeople]),
    createContentItem('নাম', 'nam', 'Noun "name". High-frequency. Note the dental "n" + inherent vowel a-kar; the inherent ô of the first letter is overridden by the kar.', 'word', 'আপনার নাম কী? apnar nam ki? ("What is your name?")', 'The standard name-asking question; pair with the genitive আপনার/তোমার + নাম + কী?', null, [ACT.vocabularyPeople]),
    createContentItem('ছাত্র', 'chhatro', 'Noun "student-male" or "student (generic)". Used for school, college, and university students. Conjunct ত্র (tro) is essential. The female form is ছাত্রী chhatri.', 'word', 'আমি ঢাকা বিশ্ববিদ্যালয়ের ছাত্র। ami Ḍhaka bishwobiddyaloyer chhatro. ("I am a [male] student at the University of Dhaka.")', 'Gender-marked: male form ছাত্র, female form ছাত্রী. Mixed/generic group uses the male form by default.', null, [ACT.vocabularyPeople]),
    createContentItem('ছাত্রী', 'chhatri', 'Noun "student-female". The -ী suffix marks female form. Pair with the male ছাত্র chhatro for the gender-pair pattern of many Bengali role nouns.', 'word', 'আমি ছাত্রী। সাবিনা আমার নাম। ami chhatri. Sabina amar nam. ("I am a [female] student. My name is Sabina.")', 'High-frequency in BD/WB university contexts; the female form distinguishes self-identification.', null, [ACT.vocabularyPeople]),
    createContentItem('শিক্ষক', 'shikkhôk', 'Noun "teacher (generic / male)". From Sanskrit śikṣaka. Used in school and university contexts; in higher education, the more specific title অধ্যাপক ôddhyapôk ("professor") is also common. Female form: শিক্ষিকা shikkhika.', 'word', 'আমার বাবা একজন শিক্ষক। amar baba ekjôn shikkhôk. ("My father is a teacher.")', 'Note the classifier একজন ekjôn ("one-person") — Bengali requires classifiers with numerals for human referents.', null, [ACT.vocabularyPeople]),
    createContentItem('অধ্যাপক', 'ôddhyapôk', 'Noun "professor". From Sanskrit adhyāpaka. Reserved for university faculty; the more general শিক্ষক covers all educators. The female form is অধ্যাপিকা ôddhyapika.', 'word', 'অধ্যাপক চৌধুরী আজ ক্লাস নেবেন। ôddhyapôk Chôudhuri aj klas neben. ("Professor Chowdhury will take class today.")', 'Combine with the family name as an address form: অধ্যাপক + name, parallel to "Professor Smith" in English.', null, [ACT.vocabularyPeople]),
    createContentItem('ডাক্তার', 'ḍaktar', 'Noun "doctor (medical)". English loanword fully naturalized. Also used as a title before the name: ডাক্তার রহমান Ḍaktar Rôhman ("Doctor Rahman").', 'word', 'আমার মা একজন ডাক্তার। amar ma ekjôn ḍaktar. ("My mother is a doctor.")', 'Universal title; the formal Sanskrit alternative চিকিৎসক chikitsôk is preferred in literary writing but rarely in speech.', null, [ACT.vocabularyPeople]),
    createContentItem('ইঞ্জিনিয়ার', 'injiniyar', 'Noun "engineer". English loanword fully naturalized in BD and WB. Note the conjunct ঞ্জ in the spelling. Pair with field: সফটওয়্যার ইঞ্জিনিয়ার (software engineer), সিভিল ইঞ্জিনিয়ার (civil engineer).', 'word', 'আমার বড় ভাই সফটওয়্যার ইঞ্জিনিয়ার। amar bôro bhai sôphtoyar injiniyar. ("My elder brother is a software engineer.")', 'BUET (Bangladesh University of Engineering and Technology) graduates are the most prestigious engineering professionals in BD; mention of BUET often accompanies this profession.', null, [ACT.vocabularyPeople]),
    createContentItem('বন্ধু', 'bôndhu', 'Noun "friend". Conjunct ন্ধ (n+dh). Used for friends of any gender — no gendered form. The plural is বন্ধুরা bôndhura ("friends").', 'word', 'তুমি আমার সবচেয়ে ভাল বন্ধু। tumi amar shôbcheye bhalo bôndhu. ("You are my best friend.")', 'High-frequency; pair with the genitive আমার amar to express relationship.', null, [ACT.vocabularyPeople]),
    createContentItem('বাংলাদেশী', 'bangladeshi', 'Noun/adjective "Bangladeshi (person)". Country name বাংলাদেশ + suffix -ী. Used for citizens and people of Bangladeshi origin. Spelled identically to the English nominalization "Bangladeshi".', 'word', 'আমি বাংলাদেশী, ঢাকা থেকে এসেছি। ami bangladeshi, Ḍhaka theke esechhi. ("I am Bangladeshi, I have come from Dhaka.")', 'Self-identification as Bangladeshi; in WB-Hindu contexts the alternative term বাঙালি bangali ("Bengali ethnic") is preferred.', null, [ACT.vocabularyPeople]),
    createContentItem('ভারতীয়', 'bharôtiyô', 'Noun/adjective "Indian (person)". Country name ভারত Bharôt + suffix -ীয়. Used for citizens of India regardless of state. WB-Bengali speakers will often add the more specific "I am from West Bengal" because India is so diverse.', 'word', 'তিনি ভারতীয়, কলকাতা থেকে। tini bharôtiyô, Kôlkata theke. ("He/she-honorific is Indian, from Kolkata.")', 'High-frequency for the cross-border BD/WB context that any Bengali learner encounters.', null, [ACT.vocabularyPeople]),
    createContentItem('বাঙালি', 'bangali', 'Noun/adjective "Bengali (ethnic / cultural)". Refers to the ethnolinguistic identity, NOT citizenship — a person can be Bangladeshi AND Bengali, or Indian AND Bengali. The capital "B" in English distinguishes ethnic Bengali from Bangladeshi citizen. Female form: বাঙালী or বাঙালিনী.', 'word', 'আমি বাঙালি, কিন্তু আমেরিকান নাগরিক। ami bangali, kintu amerikan nagôrik. ("I\'m Bengali [ethnic], but an American citizen.")', 'Diaspora identity; many second-generation Bengali speakers in the US/UK describe themselves this way.', null, [ACT.vocabularyPeople]),
    createContentItem('আমেরিকান', 'amerikan', 'Noun/adjective "American". English loanword "American" fully naturalized. Alternative formal term: মার্কিন markin.', 'word', 'সারা আমেরিকান, বোস্টন থেকে এসেছেন। Sara amerikan, Bôston theke esechhen. ("Sara is American, she-honorific has come from Boston.")', 'Casual everyday term; in formal writing মার্কিন is more common (a calque from older Persian/Urdu usage).', null, [ACT.vocabularyPeople]),
    createContentItem('ব্রিটিশ', 'briṭish', 'Noun/adjective "British". English loanword "British". Used for UK nationality in general. Alternative: ইংরেজ ingrej (more specifically "English/Englishman", with colonial historical overtones).', 'word', 'আমার শিক্ষক ব্রিটিশ। amar shikkhôk briṭish. ("My teacher is British.")', 'Modern, neutral; ইংরেজ carries colonial-era baggage in BD/WB.', null, [ACT.vocabularyPeople]),
    createContentItem('জাপানি', 'japani', 'Noun/adjective "Japanese (person)". The country is জাপান Japan; the nationality is জাপানি japani. Same suffix -ি as বাংলাদেশী bangladeshi.', 'word', 'তিনি জাপানি, টোকিও থেকে এসেছেন। tini japani, Ṭokio theke esechhen. ("He/she-honorific is Japanese, from Tokyo.")', 'High-frequency in academic and corporate contexts; Japan is a major destination for BD/WB students.', null, [ACT.vocabularyPeople]),
    createContentItem('চীনা', 'china', 'Noun/adjective "Chinese". The country is চীন Chin; the nationality is চীনা china. Note: this is NOT the same as English "China" — the spelling is চীন.', 'word', 'বেইজিং থেকে আসা চীনা ছাত্র। Beijing theke asha china chhatro. ("A Chinese student from Beijing.")', 'High-frequency given the growth of China-Bangladesh and China-India relations.', null, [ACT.vocabularyPeople]),
    createContentItem('নাইজেরিয়ান', 'naijeriyan', 'Noun/adjective "Nigerian". English loanword "Nigerian" fully naturalized in Bengali. The country is নাইজেরিয়া.', 'word', 'আমি নাইজেরিয়ান, লাগোস থেকে। ami naijeriyan, Lagôs theke. ("I am Nigerian, from Lagos.")', 'BD has growing Nigerian student communities; the term is increasingly common in university contexts.', null, [ACT.vocabularyPeople]),
    createContentItem('বিদেশী', 'bideshi', 'Noun/adjective "foreigner / foreign". বি (away/foreign) + দেশী (country-person). The neutral term for any non-native; the alternative ফরেনার phorenar (English loan) is more casual urban usage.', 'word', 'বিদেশী ছাত্রদের জন্য বিশেষ ক্লাস। bideshi chhatroder jônnyô bisheshô klas. ("A special class for foreign students.")', 'Used in administrative and academic contexts; the AI tutor can use this when discussing the learner\'s status in BD/WB.', null, [ACT.vocabularyPeople]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: Zero copula
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'শূন্য সংযোজক ক্রিয়া',
      'shūnyô shôngyojôk kriya',
      'Bengali drops the copula ("to be") in present-tense identifications. আমি ছাত্র ami chhatro means "I am a student" — NO verb between "I" and "student" is needed. The structure is simply [subject] [complement noun], with no verb at all.',
      'sentence',
      'আমি ছাত্র। ami chhatro. ("I am a student.") · সে ডাক্তার। she ḍaktar. ("He/she is a doctor.") · আপনি বাংলাদেশী? apni bangladeshi? ("Are you-honorific Bangladeshi?")',
      'The zero-copula present is the unmarked Bengali pattern; explicit copulas are added only for emphasis, formal writing, or contrast.',
      [
        { target: 'আমি ছাত্র', note: 'subject + complement, no verb — "I [am] a student"' },
        { target: 'sentence-final question', note: 'add কি ki or just rising intonation to turn the same words into a question' },
        { target: 'compare with verbal present', note: 'আমি যাই ami jai ("I go") — here a verb IS needed because the action is dynamic' },
      ],
      [ACT.grammarCopula],
    ),
    createContentItem(
      'হই / হও / হন — দরকার হলে',
      'hôi / hôo / hôn — when needed',
      'The full copula forms exist for EMPHASIS or formal writing: হই (1st sg/pl), হও (2nd familiar), হন (2nd/3rd honorific), হয় (3rd ordinary). আমি ছাত্র হই ami chhatro hôi adds emphasis: "I AM a student (and not anything else)". Everyday speech drops it.',
      'sentence',
      'আমি ছাত্র। (default) → আমি ছাত্র হই। (emphatic) → আমি ছাত্রই হই, শিক্ষক নই। (contrastive: "I am [emphatically] a student, not a teacher.")',
      'The form to memorize for formal use is হই hôi (1st person), but learners should produce zero-copula in everyday contexts.',
      [
        { target: 'হই hôi (1st sg/pl)', note: 'আমি ছাত্র হই — emphatic "I am"; বিরল in conversation' },
        { target: 'হও hôo (2nd familiar)', note: 'তুমি ছাত্র হও — emphatic "you[familiar] are"' },
        { target: 'হন hôn (2nd/3rd honorific)', note: 'আপনি / তিনি ছাত্র হন — emphatic for honorific subjects' },
        { target: 'হয় hôy (3rd ordinary)', note: 'সে ছাত্র হয় — emphatic for ordinary 3rd person' },
      ],
      [ACT.grammarCopula],
    ),
    createContentItem(
      'প্রশ্ন গঠন — কী / কি',
      'prôshnô gôthôn — ki / ki',
      'Form a yes/no question by adding কি ki at the end or just by raising intonation. Form a wh-question by replacing the unknown noun with কী ki ("what") — keeping the SAME word order, no inversion.',
      'sentence',
      'আপনি ছাত্র। → আপনি কি ছাত্র? ("Are you a student?") · আপনার নাম কী? ("What is your name?")',
      'NO word-order change; Bengali questions are formed by adding a particle or substituting a wh-word, never by inversion (unlike English).',
      [
        { target: 'statement: আপনার নাম সাবিনা', note: 'flat statement, no inversion needed' },
        { target: 'yes/no Q: আপনার নাম কি সাবিনা?', note: 'add কি — no word order change' },
        { target: 'wh-Q: আপনার নাম কী?', note: 'replace সাবিনা with কী, same position' },
      ],
      [ACT.grammarCopula],
    ),
    createContentItem(
      'সংযোজক ক্রিয়া বনাম থাকা',
      'shôngyojôk kriya vs thaka',
      'IMPORTANT DISTINCTION: the be-verb হওয়া hôoya / "to be" (identity copula) is different from the be-verb থাকা thaka / "to be located, to stay". For "I am a student" use the (often dropped) copula হওয়া. For "I am in Dhaka" use থাকা: আমি ঢাকায় আছি ami Ḍhakay achhi.',
      'sentence',
      'IDENTITY: আমি ছাত্র। (no verb) · LOCATION: আমি ঢাকায় আছি। (verb required)',
      'English uses "am" for both; Bengali splits identity ("am a student", no verb) from location ("am in Dhaka", verb required).',
      [
        { target: 'identity → zero copula', note: 'আমি ছাত্র; identity statements drop the verb' },
        { target: 'location → আছি/আছ/আছেন', note: 'আমি ঢাকায় আছি; location statements REQUIRE the be-verb' },
        { target: 'tense matters', note: 'past identity DOES require the verb: আমি ছাত্র ছিলাম ami chhatro chhilam ("I was a student")' },
      ],
      [ACT.grammarCopula],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Pronouns + genitive
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'ব্যক্তিবাচক সর্বনাম',
      'byôktibachôk shôrbônam',
      'Bengali has 8 core personal pronouns. NO grammatical gender — সে she means "he/she" alike. THREE-tier "you" (তুই/তুমি/আপনি) and TWO-tier "he/she" (সে/তিনি) — same person, different respect level.',
      'sentence',
      '১ আমি (I) / আমরা (we) · ২ তুই (you-intimate) / তুমি (you-familiar) / আপনি (you-honorific) · ৩ সে (he/she-ord) / তিনি (he/she-hon) / তারা (they)',
      'Mastering the three-tier "you" is the single biggest social-functional task of Level 1; choose wrong and the entire conversation feels off-key.',
      [
        { target: 'NO gender', note: 'one form covers he/she; gender is signaled only by other vocabulary' },
        { target: 'THREE-tier you', note: 'intimacy gradient: তুই (kids/sibs) < তুমি (peers) < আপনি (elders/strangers/professionals)' },
        { target: 'verb agrees', note: 'each pronoun has its own verb-ending; the pronoun and verb together signal register' },
      ],
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'সম্বন্ধবাচক ক্লিটিক -র / -এর',
      'shômbôndhôbachôk klitik -r / -er',
      'Form the genitive (possessive) by adding the case clitic -র (after vowel-ending nouns/pronouns) or -এর (after consonant-ending). আমা+র = আমার ("my"), তুমি+র = তোমার ("your"), নাম+এর = নামের ("of the name").',
      'sentence',
      'আমার নাম amar nam ("my name") · তোমার বই tomar bôi ("your book") · আপনার দেশ apnar desh ("your country, honorific")',
      'The genitive is one of the high-frequency case clitics; it attaches to the LAST noun in a noun phrase, never to the first.',
      [
        { target: 'after vowel → -র', note: 'আমি + র → আমার; নদী + র → নদীর' },
        { target: 'after consonant → -এর', note: 'নাম + এর → নামের; ছাত্র + এর → ছাত্রের' },
        { target: 'pronoun stem changes', note: 'আমি → আমা- (not আমিা); তুমি → তোমা-; তিনি → তাঁ-' },
      ],
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'অধিকরণবাচক -তে / -এ',
      'ôdhikorônôbachôk -te / -e',
      'Form the locative ("in / at / on") with the case clitic -তে (after vowels) or -এ (after consonants). ঢাকা+য় = ঢাকায় Ḍhakay ("in Dhaka"), বাড়ি+তে = বাড়িতে baṛite ("at home"), বিশ্ববিদ্যালয়+এ = বিশ্ববিদ্যালয়ে ("at the university").',
      'sentence',
      'আমি ঢাকায় থাকি। ami Ḍhakay thaki. ("I live in Dhaka.") · সে কলকাতায় থাকে। she Kôlkatay thake. ("He/she lives in Kolkata.")',
      'The locative pairs with থাকা thaka ("to stay, to live") and আছ-/আছেন ("to be located"). High-frequency for talking about origin and residence.',
      [
        { target: '-তে (after vowel)', note: 'বাড়ি + তে → বাড়িতে; sometimes -য় after নাম-final vowels (ঢাকা + য় → ঢাকায়)' },
        { target: '-এ (after consonant)', note: 'হাত + এ → হাতে; সকাল + এ → সকালে' },
        { target: 'pair with থাকা or আছ-', note: 'location-being requires the verb; identity-being drops it' },
      ],
      [ACT.grammarPronouns],
    ),
    createContentItem(
      'তিন স্তরের শ্রদ্ধা',
      'tin stôrer shrôddha',
      'The pronoun choice tracks RESPECT, not just intimacy. Two strangers meeting use আপনি apni regardless of age — respect is the default. As intimacy builds, peers shift down to তুমি tumi. তুই tui is reserved for the inner circle.',
      'sentence',
      'STRANGER → আপনি apni · GETTING-TO-KNOW → still আপনি · PEERS → তুমি tumi · INTIMATE → তুই tui',
      'In professional contexts, the apni-default often persists for years; even close colleagues may stick with apni if the workplace is hierarchical.',
      [
        { target: 'safe default', note: 'when in doubt, use আপনি apni — undershooting respect is the social safer error' },
        { target: 'switching down', note: 'usually the SENIOR or HOST initiates the switch from apni to tumi; learners should follow, not lead' },
        { target: 'religious register', note: 'BD-Muslim and WB-Hindu prayer language uses তুই for God (intimate); the only case where intimacy = highest reverence' },
      ],
      [ACT.grammarPronouns],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Negation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'না — সাধারণ নেতি',
      'na — sadharôn neti',
      'Negate a noun-identity statement by adding না na AFTER the noun: আমি ছাত্র না ami chhatro na ("I am not a student"). For verbal predicates, না goes AFTER the verb: আমি যাই না ami jai na ("I do not go"). Bengali negation is post-verbal/post-nominal, unlike English pre-verbal "not".',
      'sentence',
      'আমি জাপানি না। ami japani na. ("I am not Japanese.") · সে আজ আসবে না। she aj ashbe na. ("He/she won\'t come today.")',
      'High-frequency particle; learners coming from SVO languages often want to put it BEFORE the verb — resist that instinct.',
      [
        { target: 'noun identity: N + না', note: 'আমি ছাত্র না — "I am not a student"' },
        { target: 'verbal predicate: V + না', note: 'আমি যাই না — "I do not go"; verb stays at end, না after it' },
        { target: 'compare with English "not"', note: 'English: I am NOT a student (pre-noun); Bengali: I student NOT (post-noun)' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'নয় — আনুষ্ঠানিক নেতি',
      'nôy — anushṭhanik neti',
      'নয় nôy is the formal/literary form of negation used in formal writing, news, and essays. It carries the copula AND the negation together: আমি ছাত্র নই ami chhatro nôi ("I am not a student" — formal). Person-marked: নই (1st), নও (2nd-fam), নন (2nd-hon), নয় (3rd-ord), নয় (3rd-hon stays nôy or নন).',
      'sentence',
      'আমি বিদেশী নই, বাঙালি। ami bideshi nôi, bangali. ("I am not foreign, [I am] Bengali.") — literary register',
      'In formal essays and news, নয়/নই/নন replace the casual NOUN + না pattern; learners should recognize both.',
      [
        { target: 'নই nôi (1st)', note: 'first-person formal negation' },
        { target: 'নন nôn (2nd/3rd honorific)', note: 'honorific formal negation' },
        { target: 'register choice', note: 'spoken: NOUN + না; written/formal: নই/নন/নয়' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'X না, Y — সংশোধন প্যাটার্ন',
      'X na, Y — shôngshodhôn pyaṭarn',
      'The standard polite pattern for correcting a wrong guess: NOUN1 না, NOUN2 ("not NOUN1, but NOUN2"). Three parts: denial (NOUN1 না), then the correct alternative (NOUN2). Skipping any part makes the correction sound abrupt.',
      'sentence',
      'A: আপনি কি জাপানি? B: না, আমি জাপানি না — আমি বাংলাদেশী। ("Are you Japanese?" / "No, I\'m not Japanese — I\'m Bangladeshi.")',
      'The rhythm "denial + correction" is what makes the speech act feel natural rather than blunt; abbreviating to "Bangladeshi" alone would be terse.',
      [
        { target: 'না (opening denial)', note: 'often optional but adds politeness' },
        { target: 'NOUN1 না', note: 'restate the wrong guess + denial' },
        { target: 'NOUN2', note: 'offer the correct answer; closes the loop for the asker' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'কিছু নেই — অস্তিত্ব নেতি',
      'kichhu nei — ôstitwô neti',
      'For the EXISTENTIAL negative "there is not / I do not have", Bengali uses নেই nei (the negative of আছে achhe "exists/has"). Different from না na, which is the general negation. কোনো সমস্যা নেই kono shômôshya nei ("there is no problem"), আমার টাকা নেই amar ṭaka nei ("I have no money").',
      'sentence',
      'আমার বই আছে। amar bôi achhe. ("I have a book.") → আমার বই নেই। amar bôi nei. ("I don\'t have a book.")',
      'Existential and possessive negation use নেই, NOT না — confusing the two is one of the most common learner errors.',
      [
        { target: 'আছে achhe (positive)', note: 'existential/possessive "is, exists, has"' },
        { target: 'নেই nei (negative)', note: 'existential/possessive "is not, does not exist, does not have"' },
        { target: 'CONTRAST with না', note: 'না negates predication; নেই negates existence/possession — different verbs of being' },
      ],
      [ACT.grammarNegation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'আত্ম-পরিচয়',
      'attô-pôrichôy',
      'A complete five-sentence self-introduction in Bengali. Read aloud with correct inherent vowels, retroflex/dental contrasts, and natural rhythm. Notice the parallel structure: nearly every sentence starts with আমি.',
      'sentence',
      'আসসালামু আলাইকুম! আমার নাম সারা। আমি আমেরিকান। আমি ঢাকা বিশ্ববিদ্যালয়ের ছাত্রী, কম্পিউটার সায়েন্সে পড়ি। আপনার সঙ্গে দেখা হয়ে ভাল লাগল।',
      'Translation: "Assalamu alaikum! My name is Sara. I am American. I am a (female) student at the University of Dhaka, studying Computer Science. Glad to meet you (honorific)."',
      [
        { target: 'আমার নাম সারা', note: 'name introduction with genitive amar; default opening sentence' },
        { target: 'আমি আমেরিকান', note: 'zero-copula nationality identification; American = bideshi here' },
        { target: 'ঢাকা বিশ্ববিদ্যালয়ের ছাত্রী', note: 'genitive -er + role; "student of the University of Dhaka"' },
        { target: 'কম্পিউটার সায়েন্সে পড়ি', note: 'locative -e (subject in Bengali) + verb পড়ি pôri ("I study/read"); high-frequency verb' },
        { target: 'দেখা হয়ে ভাল লাগল', note: 'idiomatic "nice to meet you"; literally "meeting having-happened, [I] felt good"' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'বোধগম্যতা প্রশ্ন',
      'bodhôgômmôta prôshnô',
      'Four standard comprehension questions matching the paragraph. Answer each in a short sentence using the zero-copula or আমি pattern.',
      'sentence',
      '১ আপনার নাম কী? ২ আপনি কোন দেশের? ৩ আপনি কি ছাত্র? ৪ আপনি কী পড়েন?',
      'Two identity questions, one nationality, one yes/no, one specific information — covering all the question patterns from this lesson.',
      [
        { target: 'A1: আমার নাম সারা।', note: 'name answer with genitive; full sentence' },
        { target: 'A2: আমি আমেরিকান।', note: 'nationality with zero copula' },
        { target: 'A3: হ্যাঁ। / হ্যাঁ, আমি ছাত্রী।', note: 'short positive answer; can be just "yes" or full sentence' },
        { target: 'A4: কম্পিউটার সায়েন্স।', note: 'short answer drops redundant phrase; full sentence also fine' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'প্রথম দেখা (সংলাপ — সম্মানজনক)',
      'prôthôm dekha (shônglap — shômmanjônôk)',
      'A natural honorific-register first-meeting conversation between a Bangladeshi student and a visiting West Bengal researcher. Covers all the patterns from this lesson: greetings (both salam and nômoshkar variants), names, origins, roles, and farewells.',
      'conversation',
      'A: আসসালামু আলাইকুম! আমি সাবিনা। আপনার নাম কী?\nB: ওয়ালাইকুম আসসালাম। আমি সুদীপ্ত। আপনি কি ঢাকার ছাত্রী?\nA: হ্যাঁ, আমি ঢাকা বিশ্ববিদ্যালয়ের ছাত্রী। বাংলা বিভাগে। আপনি?\nB: আমি যাদবপুর বিশ্ববিদ্যালয় থেকে এসেছি — কলকাতা থেকে। গবেষণা করতে এসেছি।\nA: ওহ, কী ধরনের গবেষণা?\nB: আমি বাংলাদেশের লোকসঙ্গীত নিয়ে গবেষণা করছি।\nA: খুব ভাল! আপনার সঙ্গে কথা বলে আনন্দ হল।\nB: ধন্যবাদ। আপনার সাথেও।',
      'A natural exchange in apni-register — Bangladeshi Muslim student greets with salam; WB Hindu researcher replies in kind (recognizing the host\'s religious context), then both default to apni throughout.',
      [
        { target: 'salam ↔ nômoshkar', note: 'speakers cross religious-default greetings smoothly; both are heard equally on a university campus in BD' },
        { target: 'আপনি? at end of turn', note: 'standard return-question "and you?"; equivalent to English "and yourself?"' },
        { target: 'কোন/কী ধরনের', note: '"which/what kind of" — high-frequency question patterns; pair with the same word order as statement' },
        { target: 'গবেষণা gôbeshôna', note: '"research"; appears at universities and in academic contexts; spell with conjunct ষ্ণ' },
        { target: 'আনন্দ হল', note: '"happiness happened" — idiomatic "I am glad"; uses the impersonal pattern X-এর Y হওয়া' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      'প্রথম দেখা (সংলাপ — পরিচিত)',
      'prôthôm dekha (shônglap — pôrichitô)',
      'The SAME content with FAMILIAR register (tumi) between two students of similar age. Notice the verb-ending shifts: achhen → achho, esechhen → esechho, kôrchhen → kôrchho. The vocabulary stays mostly the same; only the register markers change.',
      'conversation',
      'A: হ্যালো! আমি সাবিনা। তোমার নাম কী?\nB: হ্যালো! আমি সুদীপ্ত। তুমি কি ঢাকার ছাত্রী?\nA: হ্যাঁ, ঢাকা বিশ্ববিদ্যালয়ে পড়ি। তুমি কোথা থেকে?\nB: আমি কলকাতা থেকে। যাদবপুরে পড়ি। বাংলাদেশে ঘুরতে এসেছি।\nA: বাহ! কেমন লাগছে?\nB: খুব ভাল। মানুষ অনেক বন্ধুসুলভ।\nA: পরে আবার দেখা হবে! আল্লাহ হাফেজ।\nB: হ্যাঁ, পরে দেখা হবে। ভাল থেকো।',
      'Peer-to-peer register; both use তুমি and the corresponding -o verb endings throughout. The casual secular হ্যালো replaces the religious greeting.',
      [
        { target: 'তুমি / তোমার / -o endings', note: 'familiar pronoun, familiar genitive, familiar verb suffix all align' },
        { target: 'হ্যালো hyalo', note: 'casual secular greeting for peers; works across religious lines' },
        { target: 'বন্ধুসুলভ bôndhushulôbh', note: '"friendly"; literally "friend-like"; tatsama compound' },
        { target: 'ভাল থেকো bhalo theko', note: '"stay well-familiar"; common farewell wish in tumi-register' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'লেখার টেমপ্লেট',
      'lekhar ṭempleṭ',
      'A reusable five-sentence template for any Bengali self-introduction. Fill in the bracketed slots with your own information — the structure carries the rest.',
      'sentence',
      '[Greeting]! আমার নাম [নাম]। আমি [দেশের নাম]+ী/আন। আমি ঢাকা/যাদবপুর বিশ্ববিদ্যালয়ের [পদ]। [একটি বাড়তি কথা]। আপনার সঙ্গে দেখা হয়ে ভাল লাগল।',
      'Five sentences cover the core: greeting, name, nationality, role, personal fact, closing — the minimum complete self-introduction.',
      [
        { target: '[Greeting]', note: 'pick salam (BD-Muslim), nômoshkar (Hindu), or hyalo (secular peer) to match the addressee' },
        { target: '[নাম]', note: 'your given name; family name optional' },
        { target: '[দেশের নাম]+ী', note: 'country name + the -i suffix: bangladeshi, japani, china, naijeriyan; some take -an' },
        { target: '[পদ]', note: 'ছাত্র / ছাত্রী / শিক্ষক / ইঞ্জিনিয়ার / ডাক্তার — your role' },
        { target: '[একটি বাড়তি কথা]', note: 'something distinguishing (hobby, major, hometown); avoid generic facts' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      'লেখার অনুশীলন',
      'lekhar ônushilôn',
      'Write your own 3–5 sentence self-introduction in Bangla script using the template. Use the genitive -র / -এর at least once and a possessive pronoun at least once so the writing demonstrates the core grammar.',
      'sentence',
      'নমুনা: নমস্কার! আমার নাম শিউলি। আমি ভারতীয়। আমি যাদবপুর বিশ্ববিদ্যালয়ের ছাত্রী। আমি ইংরেজি ও সাহিত্য ভালবাসি। আপনার সঙ্গে দেখা হয়ে আনন্দ পেলাম।',
      'Translation: "Namaskar! My name is Shiuli. I am Indian. I am a (female) student at Jadavpur University. I love English and literature. Glad to have met you-honorific."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'ধর্মভিত্তিক অভিবাদন',
      'dhôrmôbhittik ôbhibadôn',
      'In Bengali-speaking cultures, the default greeting tracks RELIGIOUS BACKGROUND, not nationality. Muslims (majority in BD; significant minority in WB) default to assalamu alaikum; Hindus (majority in WB; significant minority in BD) default to nômoshkar. Christians may use either or a secular greeting. Cross-religion encounters can use either or the secular hyalo / kemôn achhen.',
      'sentence',
      'BD-Muslim default: আসসালামু আলাইকুম · WB-Hindu default: নমস্কার · cross-religion / secular: হ্যালো / কেমন আছেন?',
      'Using the religious greeting that matches the addressee\'s tradition signals cultural awareness and respect; using the wrong one is never offensive but marks the speaker as an outsider.',
      [
        { target: 'BD: Muslim majority (~91%)', note: 'salam is the default in Dhaka, Chattogram, Sylhet, and most cities' },
        { target: 'WB: Hindu majority (~70%)', note: 'nômoshkar is the default in Kolkata, Shantiniketan, and most WB cities' },
        { target: 'minority within each', note: 'BD Hindus in Old Dhaka or Khulna use nômoshkar; WB Muslims in Murshidabad use salam' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'নাম + পদ',
      'nam + pôd',
      'In Bengali-speaking cultures, professionals are addressed by FAMILY NAME + TITLE much more often than by first name. অধ্যাপক চৌধুরী (Professor Chowdhury), ডাক্তার রহমান (Doctor Rahman), স্যার Sir, ম্যাডাম Madam. Calling a professor or doctor by their first name alone is inappropriate.',
      'sentence',
      'অধ্যাপক চৌধুরী · ডাক্তার রহমান · স্যার Karim · ম্যাডাম Sen',
      'Many titles double as forms of address. The English loans Sir/Madam are universal in formal contexts in both BD and WB.',
      [
        { target: 'অধ্যাপক / স্যার / ম্যাডাম', note: 'university; স্যার is gender-male, ম্যাডাম gender-female' },
        { target: 'ডাক্তার / ইঞ্জিনিয়ার', note: 'profession + name; common everywhere' },
        { target: 'ভাই / আপা / দাদা / দিদি', note: 'kinship-based address for non-relatives: ভাই "brother", আপা/দিদি "elder sister", দাদা "elder brother"' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'আপনি বনাম তুমি',
      'apni vs tumi',
      'আপনি apni is the honorific "you" used with elders, professors, strangers, customers, and anyone you wish to show respect to. তুমি tumi is the everyday "you" for peers, friends, family of similar age, and casual contexts. Using তুমি with someone who expects আপনি signals disrespect; using আপনি with a close peer can feel cold.',
      'sentence',
      'নমস্কার, অধ্যাপক চৌধুরী, কেমন আছেন? (formal) vs হ্যালো, রিতু, কেমন আছ? (casual)',
      'Switching from আপনি to তুমি mid-friendship signals warmth; the reverse signals withdrawal. In hierarchical professional contexts, apni often persists for years.',
      [
        { target: 'আপনি apni (formal)', note: 'use with elders, professors, strangers, customers, in formal industries' },
        { target: 'তুমি tumi (familiar)', note: 'use with peers, friends, classmates, in casual workplaces' },
        { target: 'তুই tui (intimate)', note: 'siblings, lifelong friends, children; aggressive with strangers' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'বাংলাদেশ বনাম পশ্চিমবঙ্গ',
      'Bangladesh vs Pôshchimbôngo',
      'Two countries, two cultural traditions, one written language. BD has Bengali as its sole official language; WB has it as a state language alongside Hindi and English. BD is majority Muslim with Eid and Victory Day (Dec 16) as major holidays; WB is majority Hindu with Durga Puja as the biggest holiday. Both share Pohela Boishakh (Bengali New Year, ~April 14) and February 21 (UNESCO Mother Language Day, commemorating the 1952 Bengali Language Movement martyrs).',
      'sentence',
      'BD: ঢাকা / চট্টগ্রাম / সিলেট / খুলনা · WB: কলকাতা / শান্তিনিকেতন / শিলিগুড়ি / দার্জিলিং',
      'Major cities students will encounter. Shantiniketan is Tagore\'s university town in WB; Sylhet is the diaspora hub in BD; Chittagong/Chattogram is BD\'s major port.',
      [
        { target: 'BD: BD Boishakh + Eid + Victory Day + 21 Feb', note: 'Bangladesh\'s civic + religious calendar' },
        { target: 'WB: Boishakh + Durga Puja + 21 Feb', note: 'West Bengal\'s major celebrations; Durga Puja is the central WB festival' },
        { target: 'shared: ভাষা দিবস', note: 'February 21 — Language Martyrs Day, UNESCO International Mother Language Day; commemorates 1952 protests' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'কাজ: ঢাকার প্রথম দিন',
      'kaj: Ḍhakar prôthôm din',
      'Roleplay your first day at the University of Dhaka with the AI tutor playing a visiting researcher from Jadavpur University in Kolkata. Use every skill from this lesson in one continuous scene — greet, introduce, ask, answer, farewell. The tutor will adapt the religious-default greeting and pronoun register to whatever signals you give.',
      'conversation',
      '[টিএসসি, ঢাকা বিশ্ববিদ্যালয়]\nগবেষক: আসসালামু আলাইকুম। আমি যাদবপুর থেকে এসেছি। আপনি কি এখানকার ছাত্র/ছাত্রী?\nতুমি: [অভিবাদন + পরিচয়]\nগবেষক: আপনি কোন দেশের?\nতুমি: [দেশ বলো]\nগবেষক: কী পড়েন?\nতুমি: [বিভাগ / মেজর বলো]\nগবেষক: আপনার সঙ্গে কথা বলে ভাল লাগল।\nতুমি: [বিদায়]',
      'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally.',
      [
        { target: 'অভিবাদন', note: 'salam / nômoshkar / hyalo — pick the register that matches the researcher\'s opening' },
        { target: 'পরিচয়', note: 'আমার নাম … / আমি … — natural form' },
        { target: 'দেশ', note: 'আমি [country]+ী/আন — nationality with the standard suffix pattern' },
        { target: 'বিভাগ', note: 'আমি … বিভাগে পড়ি — "I study in the … department"; locative -e' },
        { target: 'বিদায়', note: 'আল্লাহ হাফেজ / নমস্কার / আবার দেখা হবে — match the register' },
      ],
      [ACT.task],
    ),
    createContentItem(
      'চ্যালেঞ্জ — ভুল অনুমান সংশোধন',
      'chyalenj — bhul ônuman shôngshodhôn',
      'Stretch goal: in the same scene, the researcher guesses your country incorrectly. Politely correct using the X না, Y pattern. Closes the loop without making the asker lose face.',
      'conversation',
      'গবেষক: ওহ, আপনি কি জাপানি?\nতুমি: না, আমি জাপানি না। আমি কোরিয়ান, সিউল থেকে এসেছি।\nগবেষক: আহা, ক্ষমা করবেন — আমি ভুল ভেবেছিলাম।\nতুমি: কোনো সমস্যা নেই।',
      'কোনো সমস্যা নেই kono shômôshya nei is a casual reassurance — "no problem" — common after any small mistake or apology.',
      [
        { target: 'X না, Y', note: 'the standard polite correction pattern from Grammar III' },
        { target: 'কোনো সমস্যা নেই', note: 'casual reassurance with existential negation নেই; literally "no problem exists"' },
        { target: 'ক্ষমা করবেন kôhôma kôrben', note: '"please excuse [me]-honorific"; future-imperative form for politeness' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
