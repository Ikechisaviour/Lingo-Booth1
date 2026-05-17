// Level 1 Unit 1 — Greetings & Self-Introduction (Hindi)
// Functions: greeting, introducing yourself, asking where someone is from,
// correcting a wrong assumption, farewells.
// This lesson is the canonical TEMPLATE for all Hindi thematic Level 1 lessons.
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
  orientation: 'hi-l1u1-orientation',
  pronunciation: 'hi-l1u1-pronunciation',
  vocabularyGreetings: 'hi-l1u1-vocab-greetings',
  vocabularyPeople: 'hi-l1u1-vocab-people',
  grammarHonaa: 'hi-l1u1-grammar-honaa',
  grammarPronounsCases: 'hi-l1u1-grammar-pronouns-cases',
  grammarNegation: 'hi-l1u1-grammar-negation',
  reading: 'hi-l1u1-reading',
  listening: 'hi-l1u1-listening',
  writing: 'hi-l1u1-writing',
  culture: 'hi-l1u1-culture',
  task: 'hi-l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet someone in Hindi and say goodbye in three registers (intimate तू, neutral तुम, formal आप) so you can match the social context.',
      'Introduce yourself with your name, country, and one role (student / teacher / engineer) using the मैं … हूँ pattern with correct gender agreement.',
      'Ask another person their name and where they are from using आपका नाम क्या है? and आप कहाँ से हैं? then respond with appropriate honorific verb forms.',
    ],
    task: 'Picture your first day at IIT Delhi — you walk into a research lab and meet a visiting scholar from Mumbai. By the end of this lesson you should handle the whole exchange in Hindi without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Apply aspirated/unaspirated contrast in नमस्ते (namaste) and धन्यवाद (dhanyavaad) — the voiced aspirate "dh" is the trickiest sound for English speakers.',
      'Distinguish retroflex ण/ट from dental न/त in names and places — Patna is पटना (with retroflex T), not पतना.',
      'Pronounce nasalized vowels in हाँ (haaN), मैं (maiN), and हूँ (huuN) — the chandrabindu nasalization is phonemic, not optional decoration.',
    ],
    task: 'Read each example aloud and identify aspiration, retroflex/dental class, and vowel nasalization. Self-check by recording yourself if possible.',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 12 greetings and farewells across three registers, knowing which phrase fits which situation (Hindi neighborhood, Mumbai office, IIT Delhi classroom).',
      'Distinguish नमस्ते (Sanskritic/Hindu, universal) from आदाब (aadaab, Persianate/Muslim, urban Urdu-influenced register) — same function, different cultural register.',
    ],
    task: 'Say each phrase out loud three times with correct aspiration and joined hands gesture, then pair each one with the situation where you would use it.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and nationalities',
    goals: [
      'Use the 7 personal pronouns (मैं, तू/तुम/आप, यह/वह, हम, ये/वे) correctly, including the three-way you (तू intimate / तुम neutral / आप formal).',
      'State your role (छात्र/छात्रा, अध्यापक/अध्यापिका, इंजीनियर) and nationality (देश + -ई suffix or country name + वासी) in a complete short sentence with gender agreement.',
    ],
    task: 'Say your own role and nationality using the मैं … हूँ pattern with correct gender, then describe one classmate using वह … है.',
  },
  {
    id: ACT.grammarHonaa,
    section: 'Grammar I',
    title: 'होना (honaa) — the copula "to be"',
    goals: [
      'Conjugate होना in the present tense across all six person-number combinations: मैं हूँ, तू है, तुम हो, आप हैं, वह है, हम हैं, वे हैं. Unlike English, Hindi conjugates by both person AND number, with आप always taking plural form.',
      'Form a yes/no question by adding rising intonation OR placing क्या (kyaa) at the start: क्या आप छात्र हैं? ("Are you a student?").',
      'Form information questions with question words IN SITU — no movement: आप कहाँ से हैं? literal: "you where from are?"',
    ],
    task: 'Write six sentences using होना to identify yourself, then convert three of them into yes/no questions with क्या.',
  },
  {
    id: ACT.grammarPronounsCases,
    section: 'Grammar II',
    title: 'Pronouns + the possessive का/के/की pattern',
    goals: [
      'Use the 7 personal pronouns and recognize that तू/तुम/आप mark increasingly formal/respectful registers — the choice signals the entire relationship.',
      'Use the possessive postposition का/के/की to mark possession with gender-and-number agreement to the POSSESSED noun: मेरा नाम (my name, masc.sing) vs मेरी किताब (my book, fem.sing) vs मेरे दोस्त (my friends, masc.pl).',
    ],
    task: 'Construct three possessive phrases using मेरा/मेरी/मेरे, then explain why each form is chosen based on the gender and number of the possessed noun.',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar III',
    title: 'Negation with नहीं (nahiiN) and the correction pattern',
    goals: [
      'Negate a copula sentence by placing नहीं directly before the verb: मैं भारतीय नहीं हूँ ("I am not Indian").',
      'Apply the नहीं, मैं … हूँ pattern to correct someone\'s wrong guess politely without losing face.',
      'Recognize that नहीं is the universal present/future negation; for past tense and existence, use नहीं with the appropriate verb form.',
    ],
    task: 'Imagine a classmate guesses your nationality wrong; correct them in one polite sentence using the नहीं, मैं … हूँ pattern.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a self-introduction',
    goals: [
      'Read a short self-introduction paragraph aloud with correct aspiration, retroflex/dental contrast, nasalization, and schwa deletion.',
      'Answer comprehension questions about the speaker\'s name, country, role, and department using हाँ/नहीं + short responses.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first meeting',
    goals: [
      'Follow a 4-turn first-meeting dialogue and recognize the register markers (तुम vs आप, casual joined-hands greeting vs formal extended greeting).',
      'Reproduce the dialogue with your own name and country, swapping in the relevant phrases naturally.',
    ],
    task: 'Read the polite dialogue along with the AI tutor first, then perform it again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own self-introduction',
    goals: [
      'Write 3–5 sentences in Devanagari covering greeting, name, country, role, and one extra fact.',
      'Use होना at least twice and मेरा/मेरी at least once so the writing demonstrates the core grammar of this lesson with correct gender agreement.',
    ],
    task: 'Write your own self-introduction in 3–5 sentences using the model on the left, then read it aloud with correct pronunciation.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Joined-hands नमस्ते, three-way "you", and respecting elders',
    goals: [
      'Use the joined-hands gesture (हाथ जोड़कर) with नमस्ते — appropriate for first meetings, elders, religious contexts, and formal greetings. A handshake works in business settings but नमस्ते is always safe.',
      'Choose between तू (intimate family/God/insult), तुम (peers/younger), and आप (elders/strangers/respect) — picking the wrong one signals either disrespect or excessive coldness.',
      'Address older people with respect terms (जी added after a name: रामजी, माताजी; or kinship terms like भैया "brother", दीदी "elder sister", चाचा "uncle") — first-name basis is rare with anyone older.',
    ],
    task: 'Decide how you would address (1) a fellow student named अनिल, (2) a teacher named प्रो. शर्मा, (3) an older shopkeeper — give the full Hindi form with correct honorifics.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day at IIT Delhi — in Hindi',
    goals: [
      'Combine everything from this lesson into one continuous scene with no break between greeting, introduction, question, answer, correction, and farewell.',
      'Use the correct register (formal आप) for the senior researcher; show that you understand Hindi\'s honorific verb agreement (plural verb with singular subject for respect).',
    ],
    task: 'Roleplay your first day at IIT Delhi with the AI tutor playing a visiting scholar from Mumbai; aim for a 6-turn exchange in Hindi.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 1: नमस्ते — Greetings and Self-Introduction',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'hi',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (नमस्ते / नमस्कार / अलविदा) and match the register to the relationship.' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences using मेरा नाम … है and मैं … हूँ.' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask आप कहाँ से हैं? and respond naturally with country + से (from).' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use the नहीं, मैं … हूँ pattern to politely correct a wrong guess about your nationality or role.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'इस पाठ के लक्ष्य',
      'is paaTh ke lakShya',
      'By the end of this lesson, you can greet someone in Hindi, give your name, say where you are from, ask the same back, and say goodbye — all in one short conversation without pausing to think. The challenge is gender agreement and the three-way "you".',
      'word',
      'Functional language: अभिवादन abhivaadan (greet) · आत्म-परिचय aatma-parichay (self-introduce) · राष्ट्रीयता पूछना raaShTriiyataa puuChhanaa (ask origin) · अस्वीकार asviikaar (negate) · विदाई vidaaii (farewell)',
      'These five micro-skills are the spine of every social encounter in Hindi — once they\'re automatic, every later lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      'असली परिदृश्य',
      'asalii pariadrishya',
      'You are at IIT Delhi on your first day and a visiting scholar from Mumbai turns to you in the lab. The whole encounter takes about 30 seconds and you will need every micro-skill from this lesson plus correct gender agreement on every verb.',
      'word',
      'अतिथि विद्वान: "नमस्ते! मेरा नाम राहुल है। आप कहाँ से हैं?"',
      'A typical opener from an Indian visiting scholar: नमस्ते + name introduction with मेरा नाम है + origin question — common Indian academic opening.',
      [
        { target: 'नमस्ते namaste', note: 'standard joined-hands greeting; safe with peers, colleagues, elders, and formal contexts' },
        { target: 'मेरा नाम … है meraa naam … hai', note: 'self-introduction with possessive मेरा (my, masc) + नाम (name) + है (is); the canonical pattern' },
        { target: 'आप कहाँ से हैं? aap kahaaN se haiN?', note: 'literal: "you where from are?"; आप forces plural verb हैं even for singular subject — honorific structure' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      'तीन सम्बोधन-स्तर',
      'tiin sambodhan-star',
      'Hindi distinguishes three levels of "you", and the choice ripples through the entire conversation. INTIMATE तू (tuu): God, lover, very close family, sometimes insult. NEUTRAL तुम (tum): peers, younger people, friends. FORMAL आप (aap): elders, strangers, customers, teachers, anyone you wish to show respect.',
      'word',
      'तू कैसा है? (intimate, masc) · तुम कैसे हो? (neutral) · आप कैसे हैं? (formal)',
      'Switching from तुम to आप mid-conversation signals increased respect; the reverse signals familiarity and could insult if not invited.',
      [
        { target: 'INTIMATE तू (singular verb)', note: 'with God, lovers, very close family — using with a stranger is rude' },
        { target: 'NEUTRAL तुम (plural-form verb)', note: 'the safe default for peers, friends, classmates — neither cold nor disrespectful' },
        { target: 'FORMAL आप (always plural verb)', note: 'reserved for elders, strangers, teachers, customers; never wrong as a default' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'नमस्ते',
      'namaste',
      'Three-syllable greeting na-mas-te. The final े matra is pronounced (not deleted — schwa deletion only applies to the unwritten inherent vowel, not to written matras). The "m" of न-म- gets its schwa deleted in fast speech, sounding like "nams-te".',
      'word',
      'नमस्ते → na-mas-te /nəməs.t̪eː/',
      'The most heard greeting in Hindi; nasal न (dental) + labial म + dental त with े matra. No retroflex, no aspiration — a clean run of dental and labial sounds.',
      [
        { target: 'न na (dental n)', note: 'tongue at teeth, no aspiration' },
        { target: 'मस् mas (with schwa deletion)', note: 'inherent "a" of म often dropped before स + halant' },
        { target: 'ते te', note: 'dental त + े matra; "e" sound like English "bed"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'धन्यवाद',
      'dhanyavaad',
      '"Thank you" (formal/Sanskritic). The voiced aspirate ध (dha) at the start is the toughest sound for English speakers — breathy voicing during the consonant. The य of न्य sounds like "ny", and वाद ends with a long "aad".',
      'word',
      'धन्यवाद → dhan-ya-vaad /d̪ʱən.jə.ʋaːd̪/',
      'The breathy voicing on ध is what makes this word sound truly Hindi — without it, it sounds like "dan-ya-vaad" which native speakers will hear as foreign.',
      [
        { target: 'ध dha', note: 'voiced aspirate (breathy voiced) dental d; tongue at teeth, vocal folds vibrating with extra air' },
        { target: 'न्य nya', note: 'conjunct: dental n + य palatal semivowel' },
        { target: 'वाद vaad', note: 'व va/wa + ा long aa + द dental d' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'मैं हूँ',
      'maiN huuN',
      '"I am" — both words carry chandrabindu (nasalized vowel). मैं is "ma-i-N" with nasalized "ai"; हूँ is "huu-N" with nasalized long "uu". Skipping the nasalization changes both into different (non-)words.',
      'word',
      'मैं भारतीय हूँ। ("I am Indian.") → /mɛ̃ː bʱɑːr.t̪iːj hũː/',
      'Two nasalized vowels in one tiny sentence — this is normal Hindi prosody. Don\'t flatten them out.',
      [
        { target: 'मैं maiN', note: 'first-person pronoun with nasalized "ai" vowel — chandrabindu ँ' },
        { target: 'हूँ huuN', note: 'first-person present of होना with nasalized "uu"; agrees with मैं' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'पटना बनाम पतना',
      'PaTnaa banaam patanaa',
      'The city पटना (Patna, capital of Bihar) is pronounced with RETROFLEX ट — never dental त. Confusing retroflex and dental in place names is the #1 marker of a non-native speaker.',
      'word',
      'पटना से नई दिल्ली ("from Patna to New Delhi") · पटना — capital of Bihar state',
      'Every Indian city name has correct retroflex/dental positions baked in: कोलकाता (Kolkata) is dental t; पटना (Patna) is retroflex T; भोपाल (Bhopaal) is voiced aspirate bh.',
      [
        { target: 'पटना PaTnaa', note: 'retroflex ट — tongue curls back; capital "T" in transliteration' },
        { target: 'पतना (no such word)', note: 'if you used dental त here, the word would either not exist or be a different word' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'क्या',
      'kyaa',
      '"What" (information question word) AND the question particle that turns statements into yes/no questions. क्या begins with the conjunct क् + य = "kya". The vowel is long "aa". Schwa deletion does not apply (the inherent a after क is already suppressed by the halant inside the conjunct).',
      'word',
      'क्या आप छात्र हैं? ("Are you a student?") · आपका नाम क्या है? ("What is your name?")',
      'Same word, two grammatical jobs: at the START of a sentence it makes a yes/no question; in the MIDDLE/END it means "what".',
      [
        { target: 'क् + य → क्य', note: 'conjunct: halant suppresses inherent a of क, then य joins' },
        { target: '+ ा matra → क्या', note: 'long aa added' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      'आप',
      'aap',
      'The formal "you". Begins with the long vowel आ (independent form, since no consonant precedes), then प (labial p with inherent a deleted). Pronounced as one syllable: "aap" /aːp/.',
      'word',
      'आप कैसे हैं? ("How are you?" — formal)',
      'The single most important word in Hindi politeness — when in doubt, use आप. ALWAYS triggers plural verb agreement, even when addressing one person.',
      [
        { target: 'आ aa', note: 'long independent vowel; written as standalone आ at word start' },
        { target: 'प (schwa deleted)', note: 'labial p without the inherent a — word ends on consonant' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('नमस्ते', 'namaste', 'The universal Hindi greeting suitable any time of day; the safest default for first meetings, workplace, classrooms, and formal contexts. Often accompanied by the joined-hands gesture (हाथ जोड़कर). Slightly more Sanskritic in flavor than its Urdu counterpart आदाब.', 'word', 'नमस्ते! मेरा नाम सारा है।', 'Standard polite opener paired with a self-introduction; a typical first turn in any conversation.', null, [ACT.vocabularyGreetings]),
    createContentItem('नमस्कार', 'namaskaar', 'A slightly more formal variant of नमस्ते. Common in radio/TV broadcasts, formal speeches, and very respectful first meetings. Same meaning ("salutations to you") but heavier register; some speakers reserve नमस्कार for elders and dignitaries.', 'word', 'नमस्कार! आपका स्वागत है।', 'Formal welcome paired with स्वागत (svaagat, welcome); typical opening for a public event.', null, [ACT.vocabularyGreetings]),
    createContentItem('आदाब', 'aadaab', 'A Persianate/Urdu-influenced greeting common among Hindi-Urdu Muslim speakers in north India, Pakistan, and Hyderabad. Used as a respectful greeting any time of day. Often accompanied by raising the right hand to the forehead. Crossing-religious-line greeting in modern India.', 'word', 'आदाब, साहब! कैसे मिज़ाज हैं?', 'Used in Urdu-influenced register; "मिज़ाज" (mizaaj) is a more formal way to ask about mood/health.', null, [ACT.vocabularyGreetings]),
    createContentItem('हैलो', 'hailo', 'Casual greeting borrowed from English "hello", widely used in urban contexts especially on phone calls and among young people. Not appropriate as the only greeting with elders or in fully formal Hindi contexts; pair with नमस्ते if mixing registers.', 'word', 'हैलो! क्या हाल है?', 'Friend-to-friend opener; "क्या हाल है?" means "what\'s up / how\'s things?"', null, [ACT.vocabularyGreetings]),
    createContentItem('सुप्रभात', 'suprabhaat', 'A formal morning greeting (literally "good dawn"), used roughly until 10 AM. Slightly literary; common in workplaces, classrooms, news broadcasts. Less casual than नमस्ते. Some replace with गुड मॉर्निंग in urban Hindi.', 'word', 'सुप्रभात, सर!', 'Formal morning greeting to a superior using English-style title.', null, [ACT.vocabularyGreetings]),
    createContentItem('शुभ रात्रि', 'shubh raatri', 'Formal "good night" used as a FAREWELL when ending the day or going to sleep. Sanskritic register; informal alternative is गुड नाइट. Different from a greeting — never use as opening.', 'word', 'अच्छा, अब चलता हूँ। शुभ रात्रि!', 'Standard end-of-evening farewell; "अच्छा, अब चलता हूँ" means "OK, I\'ll head off now".', null, [ACT.vocabularyGreetings]),
    createContentItem('आप कैसे हैं', 'aap kaise haiN', 'Formal "how are you?" — addressed to a masculine OR mixed-gender singular respected person. For feminine addressee, use कैसी instead: आप कैसी हैं? (aap kaisii haiN?). The adjective कैसा takes gender agreement with the subject.', 'word', 'नमस्ते! आप कैसे हैं? — मैं ठीक हूँ, धन्यवाद।', 'Standard formal exchange; "ठीक" (Thiik) means "fine/OK".', null, [ACT.vocabularyGreetings]),
    createContentItem('क्या हाल है', 'kyaa haal hai', 'Casual "how\'s it going?" — used among friends and peers. Literal: "what condition is?". Reply is typically "ठीक है" (Thiik hai, "all good") or "बढ़िया" (baRhiyaa, "great"). Slightly more colloquial than कैसे हैं.', 'word', 'अरे, यार! क्या हाल है?', 'Friend-to-friend opener; "अरे यार" is an informal "hey buddy/friend".', null, [ACT.vocabularyGreetings]),
    createContentItem('बहुत खुशी हुई', 'bahut khushii huii', 'The standard polite phrase said at a first meeting; literal "much happiness happened". Used in almost every register from casual to formal; the universal safe response to a new introduction. Often expanded: आपसे मिलकर बहुत खुशी हुई ("very happy having met you").', 'word', 'आपसे मिलकर बहुत खुशी हुई।', 'Formal first-meeting close with मिलकर ("having met") emphasizing the meeting itself.', null, [ACT.vocabularyGreetings]),
    createContentItem('अलविदा', 'alvidaa', 'A formal farewell of Arabic/Persian origin meaning "goodbye / God be with you". Slightly literary; common in films and formal speech. More casual alternatives are फिर मिलेंगे (we\'ll meet again) and बाय (bye).', 'word', 'अलविदा! फिर मिलेंगे।', 'Formal close + casual reassurance "see you again"; soft on both sides.', null, [ACT.vocabularyGreetings]),
    createContentItem('फिर मिलेंगे', 'phir milenge', 'A warm farewell that explicitly anticipates another meeting ("we will meet again"). Less abrupt than अलविदा. Variants: कल मिलते हैं (kal milte haiN, "see you tomorrow"), जल्द ही मिलेंगे (jald hii milenge, "see you soon").', 'word', 'अच्छा, फिर मिलेंगे!', 'Warm casual close; sounds friendly without being too informal.', null, [ACT.vocabularyGreetings]),
    createContentItem('बाय', 'baay', 'Casual goodbye borrowed from English "bye". Standard in informal contexts, urban speech, and on phone calls. Often doubled: बाय-बाय. Not appropriate with elders in formal contexts — use अलविदा or फिर मिलेंगे instead.', 'word', 'ठीक है, बाय!', 'Friend-to-friend close; "ठीक है" softens the abruptness.', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People, roles, nationalities
    // ────────────────────────────────────────────────────────────────────
    createContentItem('मैं', 'maiN', 'First-person singular subject pronoun. Always triggers हूँ (huuN) in the present tense of होना. The chandrabindu nasalization is essential — without it the word becomes "mai" which sounds wrong.', 'word', 'मैं छात्र हूँ। ("I am a student.")', 'The simplest self-introduction subject; verbs agree with मैं in person AND gender.', null, [ACT.vocabularyPeople]),
    createContentItem('तू', 'tuu', 'INTIMATE second-person singular. Used with God in prayer, with lovers, with very close family (younger siblings), and in some regional dialects with peers. Using तू with a stranger or superior is rude or insulting. Takes singular verb (तू है).', 'word', 'हे प्रभु, तू कहाँ है?', 'Use to God — common in prayers and devotional songs; sounds tender, not disrespectful.', null, [ACT.vocabularyPeople]),
    createContentItem('तुम', 'tum', 'NEUTRAL second-person used for peers, friends, classmates, younger people, and family of similar age. Less formal than आप but not intimate like तू. Takes a special "plural-style" verb form ending in -o (तुम हो, तुम जाते हो). Singular in reference but plural in agreement.', 'word', 'तुम कहाँ रहते हो?', '"Where do you live?" — peer-to-peer question; रहते हो is the तुम-form of "live".', null, [ACT.vocabularyPeople]),
    createContentItem('आप', 'aap', 'FORMAL second-person used for elders, strangers, customers, teachers, and anyone you wish to show respect to. Takes plural verb forms (आप हैं, आप जाते हैं), even when addressing one person — this is the honorific structure. The default safe pronoun for any unknown context.', 'word', 'आप कैसे हैं, सर?', 'Formal-on-formal: आप + plural verb + sir title; appropriate for a senior researcher.', null, [ACT.vocabularyPeople]),
    createContentItem('यह / ये', 'yah / ye', 'Third-person proximal pronoun: "this/this person" (singular यह, plural ये). Used for someone or something nearby or just mentioned. In modern colloquial speech, यह is often pronounced "ye" too, especially in Delhi/UP/Bihar Hindi — and ye singular is heard alongside ye plural.', 'word', 'यह मेरा दोस्त है।', '"This is my friend" — proximal use, pointing to someone present.', null, [ACT.vocabularyPeople]),
    createContentItem('वह / वे', 'vah / ve', 'Third-person distal pronoun: "that/that person, he/she" (singular वह, plural वे). Used for someone or something not present. वह is gender-neutral — Hindi has no he/she distinction in pronouns. Verb form distinguishes singular (है) from plural (हैं).', 'word', 'वह मेरी बहन है।', '"That is my sister" — distal use; मेरी agrees with feminine बहन (sister).', null, [ACT.vocabularyPeople]),
    createContentItem('हम', 'ham', 'First-person plural "we". Used for any group including the speaker. Some speakers (especially in eastern UP/Bihar) use हम as a "majestic singular" — saying हम when they mean मैं. In standard Hindi, हम is plural and takes हम हैं.', 'word', 'हम छात्र हैं।', '"We are students" — group identification with plural copula.', null, [ACT.vocabularyPeople]),
    createContentItem('नाम', 'naam', 'A person\'s name. Masculine noun. Used in the universal patterns मेरा नाम … है ("my name is …") and आपका नाम क्या है? ("what is your name?"). Take care with the masculine possessive forms मेरा/आपका/उसका since "name" is grammatically masculine.', 'word', 'मेरा नाम राहुल है।', '"My name is Rahul" — masculine possessive मेरा because नाम is masculine.', null, [ACT.vocabularyPeople]),
    createContentItem('छात्र / छात्रा', 'Chhaatra / Chhaatraa', 'A male student (छात्र) or female student (छात्रा). Hindi nouns typically have a -aa feminine ending versus a consonant-final or -a masculine. Use the form that matches the speaker\'s gender: मैं छात्र हूँ (male) vs मैं छात्रा हूँ (female).', 'word', 'मैं आईआईटी दिल्ली का छात्र हूँ।', '"I am a student at IIT Delhi" — masculine; the possessive का agrees with छात्र (masc).', null, [ACT.vocabularyPeople]),
    createContentItem('विद्यार्थी', 'vidyaarthii', 'Sanskritic term for "student" — same meaning as छात्र but slightly more formal/literary. Used in formal documents, news, and academic registers. Common in school names: विद्यार्थी (student) + भवन (house) = विद्यार्थीभवन (student dormitory).', 'word', 'सभी विद्यार्थी कक्षा में बैठे थे।', '"All the students were sitting in class" — formal register; सभी = "all".', null, [ACT.vocabularyPeople]),
    createContentItem('अध्यापक / अध्यापिका', 'adhyaapak / adhyaapikaa', 'Teacher (masculine अध्यापक / feminine अध्यापिका). The Sanskrit-origin alternative is शिक्षक/शिक्षिका. Also commonly used: टीचर (borrowed English) and the respectful सर/मैडम after a name.', 'word', 'श्री शर्मा अध्यापक हैं।', '"Mr. Sharma is a teacher" — श्री is a formal Mr. honorific; verb हैं (plural) for respect.', null, [ACT.vocabularyPeople]),
    createContentItem('इंजीनियर', 'inji'+'niyar', 'Engineer (any discipline) — fully borrowed from English. Often paired with the field: सॉफ्टवेयर इंजीनियर (software engineer), सिविल इंजीनियर (civil engineer). High-status profession in modern India, particularly tied to IIT graduates.', 'word', 'मेरा भाई सॉफ्टवेयर इंजीनियर है।', '"My brother is a software engineer" — modern Indian middle-class profession.', null, [ACT.vocabularyPeople]),
    createContentItem('डॉक्टर', 'DaakTar', 'Doctor (medical or PhD). Borrowed from English with retroflex Ts. Used as both profession noun and title: डॉ. (abbreviation) before a name = "Dr.". डॉ. शर्मा (Dr. Sharma).', 'word', 'मेरी माँ डॉक्टर हैं।', '"My mother is a doctor" — मेरी (feminine possessive) because माँ is feminine; verb हैं is plural for respect to mother.', null, [ACT.vocabularyPeople]),
    createContentItem('भारतीय', 'bhaaratiiya', 'Indian (nationality adjective). The pattern is country-name + suffix -iiya/-ii: भारत + ई = भारतीय. Same adjective works for both genders and both numbers — adjectives ending in consonant are invariable in Hindi.', 'word', 'मैं भारतीय हूँ।', '"I am Indian" — invariable adjective; works for male and female speakers without change.', null, [ACT.vocabularyPeople]),
    createContentItem('अमेरिकी', 'amerikii', 'American — formed from अमेरिका (Ameriikaa, "America") + ई suffix. Same pattern produces कनाडाई (Canadian), रूसी (Russian), and so on. Some speakers use the unchanged borrowed form: अमेरिकन.', 'word', 'सारा अमेरिकी छात्रा है।', '"Sara is an American student" — the noun छात्रा (fem) is what governs the verb, not अमेरिकी.', null, [ACT.vocabularyPeople]),
    createContentItem('चीनी', 'chiinii', 'Chinese (nationality). From चीन (Chiin) + ई. Note: चीनी also means "sugar" (different word, identical form) and the language Mandarin. Context disambiguates.', 'word', 'वह चीनी है, बीजिंग से।', '"He is Chinese, from Beijing" — origin city in से phrase.', null, [ACT.vocabularyPeople]),
    createContentItem('जापानी', 'jaapaanii', 'Japanese (nationality and language). From जापान (Jaapaan) + ई. Same word covers nationality, language, and adjective use ("Japanese food").', 'word', 'मुझे जापानी खाना पसंद है।', '"I like Japanese food" — मुझे + पसंद है = "to me is liked" structure.', null, [ACT.vocabularyPeople]),
    createContentItem('कोरियाई', 'koriyaaii', 'Korean (nationality). From कोरिया (Koriyaa) + ई. The Korean wave (हलयू) has made Korean culture increasingly visible in urban India.', 'word', 'मेरी सहेली कोरियाई है।', '"My (female) friend is Korean" — सहेली is the feminine form of "friend".', null, [ACT.vocabularyPeople]),
    createContentItem('अंग्रेज़ / अंग्रेज़ी', 'angrez / angrezii', 'अंग्रेज़ = English (person/nationality, sometimes used historically for British colonial); अंग्रेज़ी = the English language. The nukta dot under ज़ marks the Persian/Urdu "z" sound (different from ज "j"). In modern Hindi, both forms are common.', 'word', 'मैं अंग्रेज़ी बोलता हूँ।', '"I speak English" — masculine speaker (बोलता); feminine would be बोलती.', null, [ACT.vocabularyPeople]),
    createContentItem('दिल्ली', 'Dillii', 'Delhi — capital of India and home of IIT Delhi. Pronounced with double-l (gemination) and retroflex D. Often paired with नई (naii, "new"): नई दिल्ली (New Delhi) refers to the formal capital district.', 'word', 'मैं नई दिल्ली में रहता हूँ।', '"I live in New Delhi" — मेरा निवास / रहना ("residing") + locative में.', null, [ACT.vocabularyPeople]),
    createContentItem('मुंबई', 'Mumbaii', 'Mumbai — financial capital of India (formerly Bombay). The official name was changed from बम्बई (Bambaii) in 1995 to reflect Marathi pronunciation. Both forms exist in older texts.', 'word', 'राहुल मुंबई से है।', '"Rahul is from Mumbai" — origin marker से (from).', null, [ACT.vocabularyPeople]),
    createContentItem('बेंगलुरु', 'Bengaluru', 'Bengaluru (formerly Bangalore) — India\'s tech capital in Karnataka. Name change reflects native Kannada pronunciation. Both बंगलोर (older) and बेंगलुरु (current) appear.', 'word', 'मेरा भाई बेंगलुरु में काम करता है।', '"My brother works in Bengaluru" — common modern context for the city.', null, [ACT.vocabularyPeople]),
    createContentItem('आईआईटी दिल्ली', 'aaii-aaii-Tii Dillii', 'IIT Delhi — Indian Institute of Technology, Delhi. One of the most prestigious engineering institutions in India. Functions as the "Tsinghua/Seoul National University equivalent" in Hindi-medium classroom contexts.', 'word', 'मैं आईआईटी दिल्ली में पढ़ता हूँ।', '"I study at IIT Delhi" — पढ़ता हूँ = "study" (masculine speaker, habitual present).', null, [ACT.vocabularyPeople]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: होना copula
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'होना का वर्तमान',
      'honaa kaa vartamaan',
      'होना ("to be") in the present tense has SIX forms by person + number. Unlike English ("am/is/are"), Hindi distinguishes तू vs तुम vs आप and singular vs plural. The verb agrees with the SUBJECT in person and number.',
      'sentence',
      'मैं हूँ (I am) · तू है (intimate "you" is) · तुम हो (neutral "you" are) · आप हैं (formal "you" are) · यह/वह है (this/that is) · ये/वे हैं (these/those are) · हम हैं (we are)',
      'Notice तू है is singular but आप हैं is always plural even for one person — honorific structure.',
      [
        { target: 'मैं हूँ maiN huuN', note: 'first-person singular; nasalized ँ on both' },
        { target: 'तुम हो tum ho', note: 'neutral "you" with characteristic -o ending' },
        { target: 'आप हैं aap haiN', note: 'formal "you" always uses plural-form है+ं' },
        { target: 'है vs हैं', note: 'singular है (vah, yah, tuu) vs plural हैं (aap, ye, ve, hum)' },
      ],
      [ACT.grammarHonaa],
    ),
    createContentItem(
      'होना के साथ संज्ञा',
      'honaa ke saath sanjnaa',
      'CRITICAL: होना links a subject to a noun or adjective. A noun in the predicate does NOT take case marking. The adjective in the predicate AGREES with the subject in gender and number.',
      'sentence',
      'मैं छात्र हूँ। (I am a [male] student.) · मैं छात्रा हूँ। (I am a [female] student.) · वह अच्छा है। (He is good.) · वह अच्छी है। (She is good.)',
      'The same verb hai/huuN works for nouns and adjectives, BUT the predicate word must match the speaker\'s/subject\'s gender.',
      [
        { target: 'noun predicate', note: 'gender must match the subject: छात्र (masc) vs छात्रा (fem)' },
        { target: 'adjective predicate', note: '-a/-ii adjectives agree with subject gender; consonant-ending adjectives are invariable' },
      ],
      [ACT.grammarHonaa],
    ),
    createContentItem(
      'क्या प्रश्न',
      'kyaa prashna',
      'Form a yes/no question by placing क्या (kyaa) at the START of a statement. Word order does not change. क्या here is a yes/no question marker, NOT the word "what" (same word, different jobs).',
      'sentence',
      'आप छात्र हैं। (You are a student.) → क्या आप छात्र हैं? (Are you a student?)',
      'क्या at the front = yes/no question. क्या in the middle/end = "what". Same word, two jobs.',
      [
        { target: 'क्या at start', note: 'yes/no question marker; works on ANY statement' },
        { target: 'rising intonation alone', note: 'in fast speech, क्या is often omitted and only intonation marks the question' },
      ],
      [ACT.grammarHonaa],
    ),
    createContentItem(
      'सूचना प्रश्न',
      'suuchanaa prashna',
      'Information questions in Hindi keep the SAME word order as statements — the question word replaces the unknown element where it would naturally sit. NO movement to the front (unlike English).',
      'sentence',
      'आपका नाम क्या है? ("What is your name?" — literal: "your name what is?") · आप कहाँ से हैं? ("Where are you from?" — literal: "you where from are?")',
      'No question-word movement makes Hindi much simpler than English in this respect — leave the question word where it naturally lives.',
      [
        { target: 'आपका नाम क्या है?', note: 'क्या sits in predicate slot, the natural position for "what is?"' },
        { target: 'आप कहाँ से हैं?', note: 'कहाँ से sits before the verb, the natural position for an adverbial phrase' },
        { target: 'वह कौन है?', note: 'कौन ("who") sits in predicate slot for "who is?"' },
      ],
      [ACT.grammarHonaa],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Pronouns + का/के/की possessive
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'व्यक्तिवाचक सर्वनाम',
      'vyaktivaachak sarvanaam',
      'Hindi has 7 distinct personal pronouns. The three-way "you" (तू/तुम/आप) signals register; plurals (हम/ये/वे) take plural verbs. Pronouns themselves do not change for gender (वह = he OR she); the verb shows gender via its -aa/-ii ending.',
      'sentence',
      'मैं · तू · तुम · आप · यह/ये · वह/वे · हम',
      'No gender on pronouns — Hindi resolves he/she at the verb level, not the pronoun level. This frees the pronoun system but doubles the verb agreement work.',
      null,
      [ACT.grammarPronounsCases],
    ),
    createContentItem(
      'का के की — possessive',
      'kaa ke kii — possessive postposition',
      'The possessive postposition का/के/की marks possession. CRITICAL: it agrees with the POSSESSED (the head noun), NOT the possessor. राम का बेटा (Ram\'s son, masc.sing → का); राम की बेटी (Ram\'s daughter, fem.sing → की); राम के बेटे (Ram\'s sons, masc.plural → के).',
      'sentence',
      'राम का घर (Ram\'s house, masc.sing) · राम के घर (Ram\'s houses, masc.pl) · राम की किताब (Ram\'s book, fem.sing) · राम की किताबें (Ram\'s books, fem.pl)',
      'In English, possession marker matches the OWNER; in Hindi, it matches the OWNED. Reverse intuition.',
      [
        { target: 'का (masc.sing)', note: 'used when the possessed thing is masculine and singular' },
        { target: 'के (masc.pl OR oblique masc.sing)', note: 'used for masc.plural and in oblique case' },
        { target: 'की (fem.sing AND fem.pl)', note: 'used for feminine, regardless of number' },
      ],
      [ACT.grammarPronounsCases],
    ),
    createContentItem(
      'मेरा/मेरे/मेरी — pronominal possessives',
      'meraa / mere / merii',
      'Possessive forms of personal pronouns. Same agreement rule as का/के/की: form changes with the POSSESSED noun. मेरा नाम (my name, masc) vs मेरी किताब (my book, fem) vs मेरे दोस्त (my friends, masc.pl).',
      'sentence',
      'मेरा (my, masc.sing) · मेरी (my, fem) · मेरे (my, masc.pl/oblique)\nतुम्हारा/तुम्हारी/तुम्हारे (your-neutral) · आपका/आपकी/आपके (your-formal) · उसका/उसकी/उसके (his/her)',
      'Memorize the three-form pattern; once you know it for one pronoun, the same -aa/-ii/-e endings apply to all possessives.',
      [
        { target: 'मेरा नाम राहुल है', note: 'masc.sing नाम → मेरा' },
        { target: 'मेरी बहन सीमा है', note: 'fem.sing बहन → मेरी' },
        { target: 'मेरे दोस्त छात्र हैं', note: 'masc.pl दोस्त → मेरे' },
      ],
      [ACT.grammarPronounsCases],
    ),
    createContentItem(
      'आप का / आपका',
      'aap kaa / aapkaa',
      'For formal "your", combine आप + का/के/की → written as one word आपका/आपकी/आपके in modern Hindi. Some older texts split: आप का. Both pronunciations are identical; modern style prefers the joined spelling.',
      'sentence',
      'आपका नाम क्या है? ("What is your name?") · आपकी उम्र क्या है? ("What is your age?") · आपके बच्चे कहाँ हैं? ("Where are your children?")',
      'The formal possessive used constantly when speaking respectfully — combines with any noun, taking gender/number agreement.',
      null,
      [ACT.grammarPronounsCases],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Negation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'नहीं negation',
      'nahiiN — negation marker',
      'Place नहीं (nahiiN) directly BEFORE the verb to negate. नहीं is the universal present/future negation. For past tense, नहीं still works with the appropriate past-tense form. The chandrabindu nasalization is essential — without it the word loses its identity.',
      'sentence',
      'मैं भारतीय नहीं हूँ। ("I am not Indian.") · तुम छात्र नहीं हो। ("You are not a student.") · वह डॉक्टर नहीं है। ("She is not a doctor.")',
      'Word order does not change otherwise; नहीं slides in just before the verb.',
      [
        { target: 'नहीं + होना', note: 'standard negation of the copula in any tense' },
        { target: 'नहीं + verb', note: 'all-purpose negation; नहीं जाता ("does not go"), नहीं खाता ("does not eat")' },
        { target: 'न vs नहीं', note: 'न is poetic/literary; नहीं is modern colloquial — use नहीं in speech' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'नहीं स्वर-नासिक्य',
      'nahiiN — vowel nasalization',
      'नहीं is pronounced "nahiiN" with the chandrabindu marking nasalization on the long ii. Some speakers reduce to "naheeN" or "nai" in very fast speech. Always two syllables in careful pronunciation; the nasalization is non-negotiable.',
      'sentence',
      'नहीं → na-hii(N) /nə.ɦĩː/',
      'Treat the final nasalization as part of the word identity — drop it and you sound like a learner.',
      null,
      [ACT.grammarNegation],
    ),
    createContentItem(
      'नहीं, मैं … हूँ correction',
      'nahiiN, maiN … huuN pattern',
      'The standard polite pattern for correcting someone\'s wrong guess: नहीं, मैं X नहीं हूँ। मैं Y हूँ। ("No, I am not X. I am Y."). Three parts: short denial, full denial, then the offered alternative. Skipping any part feels abrupt.',
      'sentence',
      'A: क्या आप जापानी हैं? — B: नहीं, मैं जापानी नहीं हूँ। मैं कोरियाई हूँ।',
      'The three-part rhythm makes the correction polite rather than blunt; offers the asker the right answer.',
      [
        { target: 'नहीं (short denial)', note: '"no"; opens the correction politely' },
        { target: 'मैं X नहीं हूँ (full denial)', note: 'rules out the wrong guess explicitly' },
        { target: 'मैं Y हूँ (offered alternative)', note: 'closes the loop with the correct answer' },
      ],
      [ACT.grammarNegation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'आत्म-परिचय',
      'aatma-parichay',
      'A complete five-sentence self-introduction in Hindi. Read it aloud with correct aspiration, retroflex/dental contrast, nasalization, and schwa deletion. Notice the parallel structure: nearly every sentence begins with मैं or मेरा/मेरी.',
      'sentence',
      'नमस्ते! मेरा नाम सारा है, मैं अमेरिकी हूँ। मैं आईआईटी दिल्ली की छात्रा हूँ, मेरा विषय कम्प्यूटर साइंस है। आपसे मिलकर बहुत खुशी हुई।',
      'Translation: "Hello! My name is Sara, I am American. I am a student at IIT Delhi, my subject is Computer Science. Nice to meet you."',
      [
        { target: 'मेरा नाम … है meraa naam … hai', note: 'name introduction with masculine नाम → masc.sing possessive मेरा' },
        { target: 'मैं अमेरिकी हूँ', note: 'nationality with the -ii suffix on the country name' },
        { target: 'आईआईटी दिल्ली की छात्रा', note: '"student of IIT Delhi" — feminine छात्रा takes feminine की' },
        { target: 'मेरा विषय कम्प्यूटर साइंस है', note: '"my subject is Computer Science" — विषय is masculine → मेरा' },
        { target: 'आपसे मिलकर बहुत खुशी हुई', note: 'standard polite closing of a first-meeting introduction' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'समझ के प्रश्न',
      'samajh ke prashna',
      'Four standard comprehension questions matching the paragraph. Answer each in a short sentence using the same patterns — हाँ/नहीं + restatement is the natural form.',
      'sentence',
      'प्र.१: आपका नाम क्या है? प्र.२: आप कहाँ से हैं? प्र.३: क्या आप छात्र हैं? प्र.४: आपका विषय क्या है?',
      'Two name/origin questions, one yes/no, one specific information — covers every question pattern from this lesson.',
      [
        { target: 'उ.१: मेरा नाम सारा है।', note: 'name answer using possessive + है' },
        { target: 'उ.२: मैं अमेरिका से हूँ।', note: 'country + से + हूँ ("from ... am")' },
        { target: 'उ.३: हाँ, मैं छात्रा हूँ।', note: 'positive answer with gender-correct छात्रा (fem)' },
        { target: 'उ.४: मेरा विषय कम्प्यूटर साइंस है।', note: 'full sentence; can shorten to just "कम्प्यूटर साइंस" in casual speech' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'पहली मुलाक़ात (विनम्र संवाद)',
      'pahlii mulaaqaat (vinamra sanvaad)',
      'A natural polite first-meeting conversation between two students at IIT Delhi. Covers all the patterns from this lesson: greetings, names, origins, roles, agreements, and farewells. Both speakers use आप — appropriate for two students who don\'t know each other yet.',
      'conversation',
      'अ: नमस्ते! आपसे मिलकर बहुत खुशी हुई। मेरा नाम राहुल है।\nब: नमस्ते, राहुल जी! मेरा नाम सारा है। मुझे भी आपसे मिलकर खुशी हुई।\nअ: आप कहाँ से हैं?\nब: मैं अमेरिका से हूँ। और आप?\nअ: मैं मुंबई से हूँ। क्या आप यहाँ आईआईटी की छात्रा हैं?\nब: हाँ, मैं कम्प्यूटर साइंस पढ़ती हूँ। और आप?\nअ: मैं भी कम्प्यूटर साइंस का छात्र हूँ! क्या संयोग है!\nब: तो फिर कक्षा में मिलेंगे!',
      'A natural exchange using आप politely throughout — the safe default for first meetings even between peers in academic settings.',
      [
        { target: 'आपसे मिलकर बहुत खुशी हुई', note: 'first-meeting polite phrase; appears in both speakers\' opening turns' },
        { target: 'और आप? aur aap?', note: 'standard return-the-question phrase — "and you?"' },
        { target: 'जी jii', note: 'honorific particle added after a name (राहुल जी) to show respect' },
        { target: 'मैं भी maiN bhii', note: '"I also"; भी ("also/too") follows the word it modifies' },
        { target: 'क्या संयोग है! kyaa sanyog hai!', note: '"what a coincidence!" — common reaction expression' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      'पहली मुलाक़ात (औपचारिक संवाद)',
      'pahlii mulaaqaat (aupacharik sanvaad)',
      'A formal first-meeting conversation suitable for academic or professional contexts. Notice the formal vocabulary: सर/मैडम, प्रो., the use of श्री before a name, and the careful honorific verbs — register markers signaling a more deliberate interaction.',
      'conversation',
      'छात्रा: नमस्कार, प्रो. शर्मा! मैं सारा हूँ। आपके बारे में बहुत सुना है।\nप्रोफ़ेसर: नमस्कार, सारा। आईआईटी में आपका स्वागत है। बैठिए।\nछात्रा: धन्यवाद। इस सेमेस्टर आपकी कक्षा लेना मेरे लिए सम्मान की बात है।\nप्रोफ़ेसर: बहुत अच्छा। आप कहाँ से हैं?\nछात्रा: जी, मैं अमेरिका के बोस्टन से हूँ।\nप्रोफ़ेसर: बहुत बढ़िया। यहाँ आपको अच्छा अनुभव हो।\nछात्रा: जी, धन्यवाद, सर।',
      'Same information as the polite version but with formal phrasing throughout — appropriate for hierarchical (student-professor) relationships.',
      [
        { target: 'आपके बारे में बहुत सुना है', note: '"I\'ve heard a lot about you" — formal first-meeting compliment' },
        { target: 'स्वागत है svaagat hai', note: '"welcome" used in formal contexts — to a guest, new student, etc.' },
        { target: 'बैठिए baiThiye', note: 'polite imperative "please sit"; -इए ending is the formal imperative' },
        { target: 'सम्मान की बात है', note: '"is a matter of honor"; formal way to say something is an honor' },
        { target: 'जी jii (sentence-level)', note: 'when standing alone, जी = "yes (politely)"; sprinkled in responses to show respect' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'लेखन ढाँचा',
      'lekhan DhaaNchaa',
      'A reusable five-sentence template for any Hindi self-introduction. Fill in the bracketed slots with your own information — the structure carries the rest. Watch gender agreement on every form.',
      'sentence',
      'नमस्ते! मेरा नाम [नाम] है। मैं [देश]+ई हूँ। मैं आईआईटी दिल्ली का/की [छात्र/छात्रा] हूँ। मुझे [शौक] पसंद है। आपसे मिलकर बहुत खुशी हुई।',
      'Five sentences cover the core: greeting, name, nationality, role, personal interest, closing — the minimum complete self-introduction.',
      [
        { target: '[नाम]', note: 'your name — Hindi-friendly spelling; transliterate consistently' },
        { target: '[देश]+ई', note: 'your nationality: country name + ई suffix (अमेरिकी, चीनी, कोरियाई, ब्रिटिश)' },
        { target: 'का/की [छात्र/छात्रा]', note: 'का छात्र (masc.) / की छात्रा (fem.) — both possessive and noun agree with gender' },
        { target: '[शौक]', note: 'a hobby or interest with मुझे … पसंद है pattern' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      'लेखन अभ्यास',
      'lekhan abhyaas',
      'Write your own 3–5 sentence self-introduction in Devanagari using the template. Use होना at least twice and मेरा/मेरी at least once so the writing demonstrates the core grammar of this lesson with correct gender agreement.',
      'sentence',
      'उदाहरण: नमस्ते! मेरा नाम किम जी-सू है। मैं कोरियाई हूँ। मैं आईआईटी दिल्ली की छात्रा हूँ। मुझे अंग्रेज़ी और गिटार पसंद है। आपसे मिलकर बहुत खुशी हुई!',
      'Translation: "Hello! My name is Kim Ji-su. I am Korean. I am a (female) student at IIT Delhi. I like English and guitar. Nice to meet you!"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'हाथ जोड़कर नमस्ते',
      'haath joRkar namaste',
      'The traditional accompaniment to नमस्ते is the joined-hands gesture: palms together, fingers up, at the chest level (or slightly higher for greater respect). Universally appropriate; never wrong. In business contexts, a handshake is also accepted, but नमस्ते alone is safe with anyone.',
      'sentence',
      'नमस्ते (hands joined) — for first meetings, elders, religious figures, formal contexts.\nनमस्कार (deeper bow, hands at forehead) — for very senior or religious figures.',
      'During COVID, the global rediscovery of नमस्ते as a no-contact greeting made it the universal Indian export gesture.',
      [
        { target: 'हाथ जोड़ना', note: 'literal: "to join hands" — the gesture itself' },
        { target: 'सिर झुकाना', note: '"to bow the head" — added for extra respect with elders' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'तू / तुम / आप',
      'tuu / tum / aap',
      'The three-way "you" is the most consequential register choice in Hindi. तू is intimate (God, lover, very close family) — using with a stranger is rude. तुम is neutral (peers, friends, younger). आप is formal/respectful. The same person you call तुम today might become आप if they take a senior role tomorrow.',
      'sentence',
      'INTIMATE: तू कहाँ है? (to God, lover) · NEUTRAL: तुम कहाँ हो? (to a friend) · FORMAL: आप कहाँ हैं? (to an elder)',
      'When in doubt, ALWAYS use आप. You cannot offend by being too respectful; you can offend by being too familiar.',
      [
        { target: 'तू → intimate', note: 'religious devotion, lovers, very close family — never strangers' },
        { target: 'तुम → neutral', note: 'peers, friends, younger siblings, classmates — most everyday' },
        { target: 'आप → formal', note: 'elders, strangers, teachers, customers — the safe default' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'जी / सर / मैडम',
      'jii / sar / maiDam',
      'Honorifics added to address forms of respect. जी (jii) attaches after a name (राहुल जी, माताजी "respected mother") and can also stand alone as a polite "yes" or attention-getter. सर (sir, from English) and मैडम (madam) are used in classrooms, offices, and customer service.',
      'sentence',
      'राहुल जी — respectful address to Rahul\nप्रो. शर्मा — formal teacher address\nभैया (bhaiyaa) — "brother", used to address male strangers of similar age',
      'Using a person\'s first name alone with no honorific is informal — common among peers, awkward with elders or in business.',
      [
        { target: 'जी after name', note: 'universal Hindi honorific; works with any name' },
        { target: 'सर / मैडम', note: 'English-loanword honorifics used in modern urban contexts' },
        { target: 'भैया / दीदी', note: '"brother / elder sister" — used with strangers of similar/slightly older age in informal contexts' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'हिन्दी-उर्दू',
      'hindii-urduu',
      'Hindi and Urdu share core grammar and basic vocabulary but draw advanced vocabulary from different sources: Hindi reaches for Sanskrit (धन्यवाद, सम्मान), Urdu reaches for Persian/Arabic (शुक्रिया, इज़्ज़त). In everyday spoken Hindustani, both registers mix freely; choosing one over the other signals cultural identity.',
      'sentence',
      'धन्यवाद (Sanskritic Hindi) ↔ शुक्रिया (Urdu/Persianate) — both mean "thank you"\nनमस्ते (Sanskritic) ↔ आदाब (Persianate/Urdu)',
      'Switching from Sanskritic to Persianate register is a cultural signal in modern India — both are valid Hindustani.',
      [
        { target: 'Sanskritic Hindi', note: 'formal/written register; education, news, religious Hindu contexts' },
        { target: 'Persianate Urdu/Hindustani', note: 'older Mughal heritage; films, poetry, urban Muslim contexts, Lucknow culture' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'कार्य: आईआईटी दिल्ली का पहला दिन',
      'kaarya: aaii-aaii-Tii Dillii kaa pahlaa din',
      'Roleplay your first day at IIT Delhi with the AI tutor playing a friendly visiting scholar from Mumbai. Use every skill from this lesson in one continuous scene — greet, introduce, ask, answer, farewell, all with correct gender agreement.',
      'conversation',
      '[प्रयोगशाला, आईआईटी दिल्ली]\nअतिथि विद्वान: नमस्ते! आपसे मिलकर बहुत खुशी हुई। मेरा नाम राहुल है।\nआप: [अभिवादन + आत्म-परिचय]\nअतिथि विद्वान: आप कहाँ से हैं?\nआप: [अपना देश/शहर बताइए]\nअतिथि विद्वान: क्या आप यहाँ छात्र/छात्रा हैं?\nआप: [पुष्टि + विषय जोड़िए]\nअतिथि विद्वान: अरे, बहुत बढ़िया! आपका विषय क्या है?\nआप: [जवाब]\nअतिथि विद्वान: आपसे बात करके बहुत अच्छा लगा!\nआप: [विदाई]',
      'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: 'अभिवादन', note: 'नमस्ते / नमस्कार + (हाथ जोड़कर) — pick the register that matches the scholar\'s opening' },
        { target: 'आत्म-परिचय', note: 'मेरा नाम … है — use the natural form' },
        { target: 'देश', note: 'मैं …+ई हूँ — use the country + ई pattern' },
        { target: 'विषय', note: 'मेरा विषय … है — state your major' },
        { target: 'विदाई', note: 'अलविदा / फिर मिलेंगे / बाय — match the register you opened with' },
      ],
      [ACT.task],
    ),
    createContentItem(
      'चुनौती — ग़लत अनुमान सुधारें',
      'chunautii — galat anumaan sudhaareN',
      'Stretch goal: in the same scene, the visiting scholar guesses your country incorrectly. Politely correct using the नहीं, मैं … हूँ pattern. Closes the loop without making the asker lose face.',
      'conversation',
      'अतिथि विद्वान: अरे, क्या आप जापानी हैं?\nआप: नहीं, मैं जापानी नहीं हूँ। मैं कोरियाई हूँ, सियोल से।\nअतिथि विद्वान: ओह, माफ़ कीजिए, मैं ग़लत समझा!\nआप: कोई बात नहीं, कोई बात नहीं।',
      '"कोई बात नहीं" (koii baat nahiiN) is a standard reassurance — "no problem/no matter" — common after any small mistake or apology.',
      [
        { target: 'नहीं, मैं … नहीं हूँ। मैं … हूँ।', note: 'the standard three-part polite correction pattern from Grammar III' },
        { target: 'कोई बात नहीं koii baat nahiiN', note: 'casual reassurance ("no problem"); standard response to a small apology' },
        { target: 'माफ़ कीजिए maaf kiijiye', note: '"please forgive me"; formal apology, more deliberate than the casual सॉरी' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
