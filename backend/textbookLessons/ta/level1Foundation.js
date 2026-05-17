// Level 1 — Foundation: Tamil Script (Vatteluttu) & Sounds
// First lesson on the Tamil / Foundation track. Pre-grammar, pre-vocabulary.
// Covers the vowels (uyir), consonants (mei), aytham, the special ழ (zh),
// retroflex series, gemination, short/long vowels, and the basics of the
// Centhamizh/Koduntamizh diglossia. Sets up Anna University (Chennai) as the
// course anchor and references Sri Lanka and Singapore/Malaysia diaspora.
//
// All content is authored with Tamil script (target) + ISO-15919 / simplified
// transliteration (romanization) + English glosses (canonical source). The AI
// conversation tutor reads this curriculum and delivers it to each learner in
// their preferred native language at runtime — never assume a specific L1.
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
  intro: 'ta-foundation-intro',
  vowels: 'ta-foundation-vowels',
  consonants: 'ta-foundation-consonants',
  retroflex: 'ta-foundation-retroflex',
  zhSound: 'ta-foundation-zh',
  gemination: 'ta-foundation-gemination',
  vowelLength: 'ta-foundation-vowel-length',
  syllables: 'ta-foundation-syllables',
  voicing: 'ta-foundation-voicing',
  diglossia: 'ta-foundation-diglossia',
  numerals: 'ta-foundation-numerals',
  reading: 'ta-foundation-reading',
};

const activities = [
  {
    id: ACT.intro,
    section: 'Why Tamil Script & Sounds',
    title: 'எழுத்து அறிமுகம் — How Tamil sounds are organized',
    goals: [
      'Understand that Tamil is an abugida-style alphasyllabary: each base consonant carries an inherent vowel that vowel signs override — different from Latin one-letter-one-sound.',
      'See why the Tamil alphabet has just 12 vowels and 18 core consonants (plus the special āytam ஃ) but yields hundreds of combined syllables, each with its own glyph.',
      'Know that Tamil sound has FOUR famous features English speakers must learn: no voicing distinction at phoneme level, retroflex consonants (ட ண ள), the unique ழ "zh" (IPA ɻ), and phonemic gemination + vowel length.',
    ],
    task: 'Read the four structural facts. By the end of this lesson you should be able to read a Tamil-script syllable aloud with the correct sound, even before you know the word.',
  },
  {
    id: ACT.vowels,
    section: 'Vowels (உயிர் uyir)',
    title: '12 vowels — short / long pairs',
    goals: [
      'Learn the 12 vowels arranged in pairs: அ/ஆ (a/ā), இ/ஈ (i/ī), உ/ஊ (u/ū), எ/ஏ (e/ē), ஒ/ஓ (o/ō) plus ஐ (ai) and ஔ (au).',
      'Pronounce short vs long vowel pairs clearly — vowel length is PHONEMIC: சதம் catam ("hundred") vs சாதம் cātam ("rice") are two completely different words.',
    ],
    task: 'Read each vowel aloud, then drill the short/long contrast pairs (a/ā, i/ī, u/ū) until the distinction is automatic.',
  },
  {
    id: ACT.consonants,
    section: 'Consonants (மெய் mei)',
    title: '18 core consonants — six groups of three',
    goals: [
      'Learn the 18 mei: hard (வல்லினம் vallinam: க ச ட த ப ற), soft/nasal (மெல்லினம் mellinam: ங ஞ ண ந ம ன), and medium (இடையினம் idaiyinam: ய ர ல வ ழ ள).',
      'Notice the symmetrical 6×3 structure — Tamil consonants are organized by place AND manner, making the chart predictable.',
    ],
    task: 'Read each consonant aloud with the inherent vowel a (க ka, ச ca, ட ṭa, த ta, …) and place each one in its row of the 6×3 chart.',
  },
  {
    id: ACT.retroflex,
    section: 'Retroflex Series',
    title: 'ட ண ள — tongue curled back',
    goals: [
      'Pronounce the retroflex series ட (ṭ), ண (ṇ), ள (ḷ) by curling the tongue tip backward and touching the hard palate — distinct from the dental series த (t), ந (n), ல (l) where the tongue touches the teeth.',
      'Hear the contrast in minimal pairs: பட (paṭa "spread!") vs பத (pata "lesson"); ணை (ṇai retroflex) vs நை (nai dental).',
    ],
    task: 'Read each retroflex/dental minimal pair side by side, curling the tongue back ONLY for the retroflex version.',
  },
  {
    id: ACT.zhSound,
    section: 'The Famous ழ (zh)',
    title: 'ழ — the unique Tamil sound (IPA ɻ)',
    goals: [
      'Pronounce ழ — a retroflex approximant unique to Tamil and Malayalam, written "zh" in ISO-15919 but NOT a /z/ sound at all. The tongue tip curls far back without quite touching anything.',
      'Use it in iconic words: தமிழ் tamiḻ (Tamil itself!), பழம் paḻam ("fruit"), மழை maḻai ("rain"). Getting ழ right is a litmus test for Tamil pronunciation.',
    ],
    task: 'Curl your tongue back as if for ட but keep a tiny gap; say "ḻa" — slightly r-like, slightly l-like, not quite either. Drill tamiḻ, paḻam, maḻai.',
  },
  {
    id: ACT.gemination,
    section: 'Gemination (இரட்டிப்பு iraṭṭippu)',
    title: 'Double consonants change meaning',
    goals: [
      'Pronounce geminate (doubled) consonants as a single LONG consonant — like English "book-keeper" pronounced fast. Spelled with the consonant repeated or with puḷḷi: க்க, ட்ட, ப்ப.',
      'Hear gemination as phonemic: படம் paṭam ("picture") vs பட்டம் paṭṭam ("title/degree"); படி paṭi ("step") vs பட்டி paṭṭi ("village/hamlet"). One consonant or two changes meaning.',
    ],
    task: 'Read each minimal pair side by side, holding the doubled consonant for nearly twice as long.',
  },
  {
    id: ACT.vowelLength,
    section: 'Short vs Long Vowels',
    title: 'Vowel length is phonemic',
    goals: [
      'Pronounce short vowels (அ இ உ எ ஒ) for one beat and long vowels (ஆ ஈ ஊ ஏ ஓ) for two beats — the contrast carries meaning.',
      'Drill iconic pairs: சதம் catam (hundred) vs சாதம் cātam (cooked rice); பல pala (many) vs பால் pāl (milk); இல illa (no — short) vs ஈ ī (housefly).',
    ],
    task: 'Hold the long vowel for two clear counts; cut the short vowel cleanly after one. Repeat each pair five times.',
  },
  {
    id: ACT.syllables,
    section: 'Syllables (உயிர்மெய் uyirmei)',
    title: 'Consonant + vowel = one glyph',
    goals: [
      'Read combined consonant-vowel glyphs: க + ஆ = கா (kā), ம + இ = மி (mi), த + உ = து (tu). Each combination has its own visual form — vowel signs sit above, below, or beside the consonant.',
      'Recognize the puḷḷi (dot ்) that marks a "pure consonant" with no vowel: க் = k alone, used in word-final and consonant cluster positions.',
    ],
    task: 'Take the consonant க and combine it with all 12 vowels (க, கா, கி, கீ, கு, கூ, கெ, கே, கை, கொ, கோ, கௌ, plus க்) — see how each glyph differs.',
  },
  {
    id: ACT.voicing,
    section: 'Voicing Rules (வல்லினம்)',
    title: 'No voicing distinction — k IS g positionally',
    goals: [
      'Understand that Tamil has NO phonemic voicing distinction: க is /k/ at the start of a word but /g/ between vowels — the same letter, predicted by environment, not contrast.',
      'Apply the rule: க is /k/ word-initially or geminated; /g/ between vowels or after nasals (போக pōka /pōga/, தங்கம் taṅkam /taṅgam/). Same applies to ச (c/s/j), ட (ṭ/ḍ), த (t/d), ப (p/b).',
    ],
    task: 'Read each example word and predict whether the medial vallinam is voiced or voiceless based on its position; then say it aloud.',
  },
  {
    id: ACT.diglossia,
    section: 'Centhamizh vs Koduntamizh',
    title: 'Two registers — written vs spoken Tamil',
    goals: [
      'Understand Tamil diglossia: செந்தமிழ் centamiḻ is the formal/literary/written register (news, textbooks, formal speeches), while கொடுந்தமிழ் koṭuntamiḻ is colloquial spoken Tamil (everyday talk, Tanglish-mixed in cities).',
      'See that the two registers differ in grammar AND vocabulary — formal நான் வருகிறேன் (nāṉ varukiṟēṉ "I come") becomes spoken நான் வரேன் (nāṉ varēṉ); written இருக்கிறது is spoken இருக்கு.',
    ],
    task: 'Read each register-pair example and identify whether each version is centamiḻ (literary) or koṭuntamiḻ (spoken).',
  },
  {
    id: ACT.numerals,
    section: 'Numerals & Special Symbols',
    title: '௦ ௧ ௨ ௩ ௪ ௫ ௬ ௭ ௮ ௯ — Tamil digits',
    goals: [
      'Recognize the 10 Tamil digits (௦-௯) — though everyday writing now uses Arabic numerals, classical and ornamental Tamil texts still use the Tamil digits.',
      'Recognize the āytam (ஃ) — a special "half-sound" symbol used in Centhamizh and in transliterating foreign sounds like "f" (e.g., ஃபோன் for "phone").',
    ],
    task: 'Read the Tamil digits 0-9 aloud, then read aloud one number formed with them: ௨௦௨௬ = 2026.',
  },
  {
    id: ACT.reading,
    section: 'Reading Practice',
    title: 'Read a full Tamil sentence aloud',
    goals: [
      'Read a short Tamil sentence applying all the rules: vowel length, retroflex, gemination, ழ, and positional voicing.',
      'Identify each rule in the example sentence and label why each consonant is pronounced as it is.',
    ],
    task: 'Read aloud: "வணக்கம்! என் பெயர் ராஜா. நான் சென்னையில் இருக்கிறேன்." (Vaṇakkam! En peyar Rājā. Nāṉ Cennaiyil irukkiṟēṉ. "Hello! My name is Raja. I am in Chennai.") — then mark every gemination and every retroflex.',
  },
];

const level1Foundation = {
  title: 'Foundation: Tamil Script & Sounds — Reading & Pronouncing Tamil',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'ta',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'foundation',
  activities,
  expressionPractice: [],
  relatedPools: [],
  content: [
    // Activity 1 — Why Tamil Script & Sounds
    createContentItem(
      'தமிழ் எழுத்து',
      'tamiḻ eḻuttu',
      'Tamil is one of the oldest continuously-spoken languages in the world (Sangam literature dates back over 2000 years). Its script is an abugida: each consonant carries an inherent /a/ unless a vowel sign overrides it.',
      'word',
      'தமிழ் tamiḻ — the language itself; note the famous ழ at the end (IPA ɻ).',
      'When Tamil speakers say their language name correctly, the final consonant is the retroflex approximant ழ — the same sound that distinguishes Tamil pronunciation.',
      [
        { target: 'த ta', note: 'dental t; tongue at upper teeth' },
        { target: 'மி mi', note: 'consonant ம with vowel sign for i' },
        { target: 'ழ் ḻ', note: 'the famous retroflex approximant; puḷḷi marks it as a pure consonant with no vowel' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'நான்கு பெரிய அம்சங்கள்',
      'nāṉku periya amcaṅkaḷ',
      'Four features of Tamil that English speakers must internalize: (1) no voicing contrast — same letter for k/g, t/d, p/b; (2) retroflex consonants ட ண ள with tongue curled back; (3) the unique ழ; (4) phonemic gemination and vowel length.',
      'word',
      '(1) போக pōka /pōga/  (2) பாட்டி pāṭṭi grandma  (3) தமிழ் tamiḻ  (4) படம்/பட்டம் paṭam/paṭṭam (picture/title)',
      'These four contrasts are what make Tamil sound distinctly Tamil rather than another South Asian language.',
      null,
      [ACT.intro],
    ),
    createContentItem(
      'அண்ணா பல்கலைக்கழகம்',
      'aṇṇā palkalaikkaḻakam',
      'Anna University in Chennai (named after C. N. Annadurai, "Anna") is one of South India\'s leading technical universities and our anchor campus for this course. Throughout the lessons we will reference Chennai life — IIT Madras nearby, Loyola College, Marina Beach, T. Nagar shopping.',
      'word',
      'நான் அண்ணா பல்கலைக்கழகத்தில் படிக்கிறேன். Nāṉ Aṇṇā Palkalaikkaḻakattil paṭikkiṟēṉ. "I study at Anna University."',
      'Notice the locative suffix -il (-இல்) — Anna University + in. Eight-case agglutination, introduced in detail later.',
      null,
      [ACT.intro],
    ),

    // Activity 2 — Vowels (12 uyir)
    createContentItem(
      'அ / ஆ',
      'a / ā',
      'Short a vs long ā — the first vowel pair. Short அ is one beat; long ஆ is two beats. Vowel length carries meaning and tone of the word changes audibly.',
      'word',
      'பல pala (many) vs பால் pāl (milk); அடி aṭi (hit/foot) vs ஆடு āṭu (goat/dance)',
      'Hold the long vowel clearly for two counts — Tamil rhythm depends on it. Bunching the long vowel into a short one yields a different word.',
      [
        { target: 'அ a', note: 'short low central vowel, ~1 mora' },
        { target: 'ஆ ā', note: 'long low central vowel, ~2 morae' },
      ],
      [ACT.vowels],
    ),
    createContentItem(
      'இ / ஈ',
      'i / ī',
      'Short i vs long ī. Short இ is similar to English "bit"; long ஈ is held for two beats like English "beet" (but pure, not diphthongized).',
      'word',
      'இல illa (no/not, in spoken) vs ஈ ī (housefly)',
      'The contrast is clearer than in English because Tamil keeps vowels pure (no glide off the long form).',
      [
        { target: 'இ i', note: 'short high front vowel' },
        { target: 'ஈ ī', note: 'long high front vowel; never glides into a y-sound' },
      ],
      [ACT.vowels],
    ),
    createContentItem(
      'உ / ஊ',
      'u / ū',
      'Short u vs long ū. Short உ is reduced to almost a schwa in word-final position in colloquial speech (the famous "kuṛṛiyalukaram"). Long ஊ is two beats, fully rounded.',
      'word',
      'புது putu (new) vs பூ pū (flower); உலகம் ulakam (world) vs ஊர் ūr (hometown/village)',
      'In colloquial Tamil, word-final short u barely sounds at all — அவன் சாப்பிட்டான் /avan sāppiṭṭān/ has a barely audible final u.',
      [
        { target: 'உ u', note: 'short rounded back vowel; word-finally reduced' },
        { target: 'ஊ ū', note: 'long rounded back vowel; held two beats' },
      ],
      [ACT.vowels],
    ),
    createContentItem(
      'எ / ஏ',
      'e / ē',
      'Short e (like English "bet") vs long ē (held two beats, no glide). Tamil ē is pure — unlike English "say" which glides into y.',
      'word',
      'எரி eri (burn!) vs ஏரி ēri (lake); என் eṉ (my) vs ஏன் ēṉ (why)',
      'The pair ē/eṉ is grammatically high-frequency: ēṉ "why" opens countless questions.',
      [
        { target: 'எ e', note: 'short mid front vowel' },
        { target: 'ஏ ē', note: 'long mid front vowel; pure, no English-style glide' },
      ],
      [ACT.vowels],
    ),
    createContentItem(
      'ஒ / ஓ',
      'o / ō',
      'Short o (like English "bought" but shorter) vs long ō (held two beats, no glide off into w). Tamil ō stays pure throughout.',
      'word',
      'ஒன்று oṉṟu (one) vs ஓடு ōṭu (run!); கொடு koṭu (give!) vs கோடு kōṭu (line/horn)',
      'The number 1 (ஒன்று) uses the short form; "ten" (ஓரு wait — ten is பத்து) — koṭu/kōṭu is the cleanest minimal pair.',
      [
        { target: 'ஒ o', note: 'short mid back rounded vowel' },
        { target: 'ஓ ō', note: 'long mid back rounded vowel; held two beats' },
      ],
      [ACT.vowels],
    ),
    createContentItem(
      'ஐ / ஔ',
      'ai / au',
      'The two diphthongs: ai (like English "I/eye") and au (like English "ow/cow"). Both behave like long vowels in word rhythm.',
      'word',
      'ஐந்து aintu (five); ஔஷதம் auṣatam (medicine — Sanskrit loan)',
      'ஔ is rare in native Tamil words but appears in Sanskrit loans and in formal Centhamizh.',
      [
        { target: 'ஐ ai', note: 'diphthong; like "eye"; very common — used for direct-object suffix -ai too' },
        { target: 'ஔ au', note: 'diphthong; rare in native words; mostly in Sanskrit loans' },
      ],
      [ACT.vowels],
    ),

    // Activity 3 — Consonants (18 mei)
    createContentItem(
      'வல்லினம் (Hard Six)',
      'vallinam',
      'The hard series: க (k/g), ச (c/s/j), ட (ṭ/ḍ retroflex), த (t/d dental), ப (p/b), ற (ṟ trill or alveolar t). These take voicing positionally — voiceless at word start or when geminated, voiced between vowels.',
      'word',
      'க ka, ச ca, ட ṭa, த ta, ப pa, ற ṟa',
      'Each row of the Tamil consonant chart pairs a vallinam with its mellinam nasal (க/ங, ச/ஞ, ட/ண, த/ந, ப/ம, ற/ன) — 6 pairs total.',
      [
        { target: 'க', note: 'velar stop k/g; the most frequent consonant in Tamil' },
        { target: 'ச', note: 'palatal stop c/s/j; word-initially often /s/ in modern speech' },
        { target: 'ட', note: 'retroflex stop ṭ/ḍ; tongue curled back' },
        { target: 'த', note: 'dental stop t/d; tongue at upper teeth' },
        { target: 'ப', note: 'bilabial stop p/b' },
        { target: 'ற', note: 'alveolar trill ṟ; distinct from ர (r); doubled becomes geminate ṟṟ /ttr/' },
      ],
      [ACT.consonants],
    ),
    createContentItem(
      'மெல்லினம் (Soft Six)',
      'mellinam',
      'The nasal series: ங (ṅ velar), ஞ (ñ palatal), ண (ṇ retroflex), ந (n dental), ம (m bilabial), ன (ṉ alveolar). Each shares place of articulation with its vallinam pair.',
      'word',
      'ங ṅa, ஞ ña, ண ṇa, ந na, ம ma, ன ṉa',
      'Tamil distinguishes THREE n-sounds in writing (ந, ண, ன) where most languages have one — though in spoken Tamil ந and ன often merge.',
      [
        { target: 'ண ṇ', note: 'retroflex n; paired with ட ṭ' },
        { target: 'ந n', note: 'dental n; word-initially in many native words' },
        { target: 'ன ṉ', note: 'alveolar n; word-medially and finally' },
      ],
      [ACT.consonants],
    ),
    createContentItem(
      'இடையினம் (Medium Six)',
      'iṭaiyiṉam',
      'The "in-between" series: ய (y), ர (r alveolar tap), ல (l dental), வ (v/w), ழ (ḻ retroflex approximant — the famous Tamil sound), ள (ḷ retroflex lateral). These are sonorants, never geminate as harshly as the vallinam.',
      'word',
      'ய ya, ர ra, ல la, வ va, ழ ḻa, ள ḷa',
      'Tamil distinguishes ல (dental l) and ள (retroflex l) and ழ (retroflex approximant) — three l-like sounds where English has one.',
      [
        { target: 'ய y', note: 'palatal glide; like English "y" in "yes"' },
        { target: 'ர r', note: 'alveolar tap; like Spanish "pero"; single quick flap' },
        { target: 'ல l', note: 'dental lateral; tongue at upper teeth' },
        { target: 'வ v', note: 'bilabial-dental approximant; between English v and w' },
        { target: 'ழ ḻ', note: 'THE Tamil sound — retroflex approximant, IPA ɻ; curl tongue back without touching' },
        { target: 'ள ḷ', note: 'retroflex lateral; tongue curled back AND lateral release' },
      ],
      [ACT.consonants],
    ),

    // Activity 4 — Retroflex
    createContentItem(
      'ட vs த',
      'ṭ vs t',
      'Retroflex ட vs dental த: the tongue position is the only difference. For ட, curl the tip backward and tap the hard palate; for த, the tip touches the upper teeth.',
      'word',
      'பட paṭa (spread out!) vs பத pata (lesson/section); அடி aṭi (foot) vs அதி ati (very, intense)',
      'Mixing these up gives different words; minimal-pair drill is essential.',
      [
        { target: 'ட (retroflex)', note: 'tongue tip curled back to hard palate' },
        { target: 'த (dental)', note: 'tongue tip at upper teeth' },
      ],
      [ACT.retroflex],
    ),
    createContentItem(
      'ண vs ந vs ன',
      'ṇ vs n vs ṉ',
      'Three n-sounds: ண retroflex (curl tongue back), ந dental (tongue at teeth), ன alveolar (tongue at ridge). In careful Tamil all three are distinct; in fast spoken Tamil, ந and ன often merge.',
      'word',
      'ஆணி āṇi (nail) vs ஆனி āṉi (June-July month name); ந is word-initial in many words while ன is word-medial/final.',
      'Written Tamil insists on the three-way distinction; spoken Tamil collapses it. Both are needed.',
      [
        { target: 'ண ṇ retroflex', note: 'paired with ட; tongue curled' },
        { target: 'ந n dental', note: 'word-initial native words' },
        { target: 'ன ṉ alveolar', note: 'word-medial / final native words' },
      ],
      [ACT.retroflex],
    ),
    createContentItem(
      'ள vs ல',
      'ḷ vs l',
      'Retroflex ள vs dental ல: minimum-pair distinction. ள has the tongue curled back; ல has it at the teeth. ள is also distinct from ழ — three l-like sounds total in Tamil.',
      'word',
      'பல pala (many) vs பள் paḷ (sleep!); கல் kal (stone) vs கள் kaḷ (toddy, also plural marker)',
      'The plural marker -kaḷ uses retroflex ள — every Tamil plural noun ends in this sound.',
      [
        { target: 'ள (retroflex l)', note: 'tongue curled back with lateral release' },
        { target: 'ல (dental l)', note: 'tongue at upper teeth' },
        { target: 'ழ (retroflex approximant)', note: 'curl back but NO contact; the famous Tamil sound' },
      ],
      [ACT.retroflex],
    ),

    // Activity 5 — ழ (zh)
    createContentItem(
      'ழ — IPA ɻ',
      'ḻ — retroflex approximant',
      'The most famous Tamil sound. Curl your tongue tip far back, almost touching the soft palate, but leave a small gap so air flows freely. Result: a sound somewhere between American "r", British "l", and a soft "zh" — but truly its own thing.',
      'word',
      'தமிழ் tamiḻ (Tamil); பழம் paḻam (fruit); மழை maḻai (rain); எழுது eḻutu (write!); ஆழம் āḻam (depth)',
      'Tamils take great pride in this sound — saying "tamil" instead of "tamiḻ" is a giveaway you are learning. Practice until it feels natural.',
      [
        { target: 'Tongue position', note: 'tip curled back, hovering near soft palate, NO contact' },
        { target: 'Airflow', note: 'continuous like an English r, but with the tongue much further back' },
        { target: 'Common confusion', note: 'NOT a /z/ sound despite the "zh" spelling; NOT identical to ள (which has contact)' },
      ],
      [ACT.zhSound],
    ),
    createContentItem(
      'ழ in iconic words',
      'ḻ in iconic words',
      'Four high-frequency Tamil words use ழ — drill these as core pronunciation practice. The language\'s own name ends in this sound.',
      'word',
      'தமிழ் tamiḻ · பழம் paḻam · மழை maḻai · எழுத்து eḻuttu (script/letter)',
      'If you can say "tamiḻ" with a clean ழ in front of a native speaker, you have arrived.',
      [
        { target: 'தமிழ் tamiḻ', note: 'the language; word-final ḻ' },
        { target: 'பழம் paḻam', note: 'fruit; intervocalic ḻ' },
        { target: 'மழை maḻai', note: 'rain; intervocalic ḻ before ai diphthong' },
        { target: 'எழுத்து eḻuttu', note: 'script, letter; ḻ before geminate tt' },
      ],
      [ACT.zhSound],
    ),

    // Activity 6 — Gemination
    createContentItem(
      'இரட்டிப்பு',
      'iraṭṭippu',
      'Gemination: a consonant held twice as long as a single one. Spelled with the consonant + puḷḷi + same consonant: க்க, ட்ட, த்த, ப்ப. Phonemic — one or two changes the word.',
      'word',
      'பட்டி paṭṭi (village) vs படி paṭi (step); அப்பா appā (dad) vs அபா apā (~rare); எண் eṇ (number) vs எண்ணு eṇṇu (think!)',
      'Hold the doubled consonant for nearly twice as long; sloppy speakers shorten the geminate and produce a different word.',
      [
        { target: 'Single ட paṭi', note: 'one ṭ-sound; word = "step"' },
        { target: 'Geminate ட்ட paṭṭi', note: 'doubled ṭṭ-sound; word = "village"' },
      ],
      [ACT.gemination],
    ),
    createContentItem(
      'Vallinam gemination devoices',
      'vallinam gemination devoices',
      'IMPORTANT RULE: when a vallinam (k/c/ṭ/t/p/ṟ) is geminated, it is ALWAYS pronounced voiceless. Compare போக pōka /pōga/ ("to go") with போக்கு pōkku /pōkku/ ("way/manner") — the geminate kk is /kk/ never /gg/.',
      'word',
      'எழுது eḻutu /eḻudu/ (write!) vs எழுத்து eḻuttu /eḻuttu/ (script — note the /tt/ never /dd/)',
      'This rule + the no-voicing-distinction rule together let you predict every Tamil voicing without a dictionary.',
      [
        { target: 'Single intervocalic k', note: 'voiced /g/: போக /pōga/' },
        { target: 'Geminate kk', note: 'voiceless /kk/: போக்கு /pōkku/' },
      ],
      [ACT.gemination],
    ),

    // Activity 7 — Vowel length
    createContentItem(
      'குறில் / நெடில்',
      'kuṟil / neṭil',
      'Tamil distinguishes "short" (குறில் kuṟil) and "long" (நெடில் neṭil) vowels. Length is phonemic: each long vowel is held for ~2 morae, each short for ~1. Five short/long pairs plus 2 long diphthongs.',
      'word',
      'சதம் catam (hundred) vs சாதம் cātam (cooked rice) — same consonants, different first vowel length, different words.',
      'In Centhamizh poetry, vowel length controls meter; in everyday speech, it controls meaning. Either way, it is non-negotiable.',
      [
        { target: 'குறில் (short)', note: 'அ இ உ எ ஒ — held 1 mora' },
        { target: 'நெடில் (long)', note: 'ஆ ஈ ஊ ஏ ஓ + ஐ ஔ — held 2 morae' },
      ],
      [ACT.vowelLength],
    ),

    // Activity 8 — Syllables / uyirmei
    createContentItem(
      'உயிர்மெய் எழுத்து',
      'uyirmei eḻuttu',
      'Consonant + vowel = a combined "uyirmei" glyph. The vowel sign attaches to the consonant in a specific position: above (ே), below, beside, or wrapping. Each of the 18 consonants × 12 vowels = 216 syllable glyphs (plus 18 puḷḷi-marked pure consonants).',
      'word',
      'க + ஆ = கா kā; க + இ = கி ki; க + ஈ = கீ kī; க + உ = கு ku; க + ஊ = கூ kū; க + எ = கெ ke; க + ஏ = கே kē; க + ஐ = கை kai; க + ஒ = கொ ko; க + ஓ = கோ kō; க + ஔ = கௌ kau',
      'Once you learn the vowel signs once, you can read any of the 216 combinations.',
      [
        { target: '்', note: 'puḷḷi (dot) — kills the inherent vowel, leaving a pure consonant க்' },
        { target: 'ா', note: 'long-a sign — placed after consonant: கா' },
        { target: 'ி ீ', note: 'short-i, long-ī signs — above-right of consonant' },
        { target: 'ு ூ', note: 'short-u, long-ū signs — usually wrap below' },
        { target: 'ெ ே ை', note: 'short-e, long-ē, ai signs — placed before consonant' },
      ],
      [ACT.syllables],
    ),

    // Activity 9 — Voicing
    createContentItem(
      'ஒலி நிலை',
      'oli nilai',
      'Tamil has NO phonemic voicing distinction. The same letter க is /k/ at the start of a word, /g/ between vowels, /kk/ when geminated. Voicing is positional, not contrastive. Same applies to ச (c/s/j), ட (ṭ/ḍ), த (t/d), ப (p/b).',
      'word',
      'காகம் kākam /kāgam/ (crow); பழம் paḻam /paḻam/; போதும் pōtum /pōdum/ (enough)',
      'This is the OPPOSITE of English/most languages, where /k/ and /g/ are different phonemes. In Tamil, the writing system needs only one letter because context predicts the sound.',
      [
        { target: 'Word-initial', note: 'voiceless: க /k/, ப /p/, த /t/' },
        { target: 'Intervocalic', note: 'voiced: க /g/, ப /b/, த /d/' },
        { target: 'After nasal', note: 'voiced: ங்க /ṅg/, ம்ப /mb/, ந்த /nd/' },
        { target: 'Geminated', note: 'voiceless (rule overrides): க்க /kk/, ப்ப /pp/' },
      ],
      [ACT.voicing],
    ),

    // Activity 10 — Diglossia
    createContentItem(
      'செந்தமிழ் vs கொடுந்தமிழ்',
      'centamiḻ vs koṭuntamiḻ',
      'Centhamizh (செந்தமிழ் "pure Tamil") is the formal literary register: news broadcasts, textbooks, formal speeches, religious texts. Koduntamizh (கொடுந்தமிழ் "regional Tamil") is everyday spoken Tamil — heavily contracted, with regional flavors and Tanglish in cities.',
      'sentence',
      'WRITTEN: நான் வருகிறேன். nāṉ varukiṟēṉ. ("I come/am coming.")\nSPOKEN: நான் வரேன். nāṉ varēṉ.',
      'Tamil diglossia is one of the strongest in the world — news Tamil and spoken Tamil differ in verb endings, copula, even basic pronouns. Both must be learned.',
      [
        { target: 'Centhamizh -kiṟēṉ', note: 'literary present-1st-singular suffix; "I VERB"' },
        { target: 'Koduntamizh -ēṉ', note: 'spoken contraction; same meaning' },
      ],
      [ACT.diglossia],
    ),
    createContentItem(
      'Tanglish & regional dialects',
      'tanglish & regional dialects',
      'In urban Tamil Nadu (especially Chennai, Coimbatore) and among Singapore/Malaysia diaspora, code-switching with English ("Tanglish") is universal in speech: "நான் office-க்கு போறேன்" (Nāṉ office-kku pōṟēṉ "I am going to office"). Regional dialects differ too: Chennai, Madurai, Coimbatore, Jaffna (Sri Lanka), and diaspora Tamil each have their own flavor.',
      'sentence',
      'Chennai-style: சாப்ட்டியா? cāppṭṭiyā? ("Have you eaten?")\nMadurai-style: சாப்பிட்டீங்களா? cāppiṭṭīṅkaḷā?\nJaffna-style: சாப்பிட்டியோ? cāppiṭṭiyō?',
      'Madurai Tamil is conservative; Chennai Tamil contracts the most; Jaffna Tamil preserves classical features lost on the mainland.',
      null,
      [ACT.diglossia],
    ),

    // Activity 11 — Numerals
    createContentItem(
      'தமிழ் எண்கள்',
      'tamiḻ eṇkaḷ',
      'The 10 native Tamil digits — though Arabic numerals dominate modern writing, Tamil digits appear in classical texts, calendars, and ornamental use.',
      'word',
      '௦ 0 · ௧ 1 · ௨ 2 · ௩ 3 · ௪ 4 · ௫ 5 · ௬ 6 · ௭ 7 · ௮ 8 · ௯ 9',
      'Memorize for reading classical texts; in everyday Tamil writing you can use 0-9 freely.',
      null,
      [ACT.numerals],
    ),
    createContentItem(
      'ஃ (āytam)',
      'ḥ (āytam)',
      'The āytam ஃ is a special "half-syllable" symbol used in Centhamizh for certain phonological environments and in modern Tamil to transliterate foreign sounds like /f/. ஃபோன் ḥpōṉ = "phone".',
      'word',
      'ஃபோன் /fōn/ (phone); ஃபேஸ்புக் fēsbuk (Facebook — Tanglish transliteration)',
      'Modern Tamil uses ஃ mainly to bend the script to English loanwords; classical use is for vowel-resolution in poetry.',
      null,
      [ACT.numerals],
    ),

    // Activity 12 — Reading practice
    createContentItem(
      'வாசிப்பு பயிற்சி',
      'vācippu payiṟci',
      'A reading-aloud exercise applying every rule from this lesson: vowel length, retroflex, gemination, ழ, and positional voicing. Read this sentence and identify each rule as it appears.',
      'sentence',
      'வணக்கம்! என் பெயர் ராஜா. நான் சென்னை, அண்ணா பல்கலைக்கழகத்தில் தமிழ் படிக்கிறேன்.',
      'Translation: "Hello! My name is Raja. I study Tamil at Anna University, Chennai."',
      [
        { target: 'வணக்கம் vaṇakkam', note: 'retroflex ṇ + geminate kk; standard greeting' },
        { target: 'என் பெயர் eṉ peyar', note: 'alveolar ṉ; "my name"' },
        { target: 'சென்னை ceṉṉai', note: 'geminate ṉṉ; the city Chennai itself' },
        { target: 'பல்கலைக்கழகத்தில் palkalaikkaḻakattil', note: 'long agglutinative word: "university-in" (case suffix -il); contains both ḻ and geminate tt' },
        { target: 'தமிழ் tamiḻ', note: 'the language; with the iconic word-final ḻ' },
        { target: 'படிக்கிறேன் paṭikkiṟēṉ', note: 'verb "I study/read"; retroflex ṭ + geminate kk + present marker -kiṟēṉ' },
      ],
      [ACT.reading],
    ),
  ],
};

module.exports = level1Foundation;
