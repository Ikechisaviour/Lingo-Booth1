// Level 1 — Foundation: Hangul (한글) — complete alphabet & sound system
// First lesson in the Level 1 / Foundation track. Pre-grammar, pre-vocabulary.
// Covers every letter of the modern Korean alphabet AND the sound-change rules
// a learner needs to actually read Korean aloud.
//
// Activities:
//   1. Hangul Intro & Structure       — history, featural design, blocks
//   2. Basic Consonants (14)          ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ
//   3. Plain · Aspirated · Tense      ㄱ/ㅋ/ㄲ · ㄷ/ㅌ/ㄸ · ㅂ/ㅍ/ㅃ · ㅈ/ㅊ/ㅉ · ㅅ/ㅆ
//   4. Tense Consonants (5)           ㄲ ㄸ ㅃ ㅆ ㅉ
//   5. Basic Vowels (10)              ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ
//   6. Compound Vowels (11)           ㅐ ㅒ ㅔ ㅖ ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ
//   7. Syllable Block Layout          where each vowel sits inside the block
//   8. Final Consonants — 7 sounds    ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ (reduction rules)
//   9. Double Finals (겹받침, 11)      ㄳ ㄵ ㄶ ㄺ ㄻ ㄼ ㄽ ㄾ ㄿ ㅀ ㅄ
//  10. Sound Changes (음운 변화)       연음 · 경음화 · 비음화 · 격음화 · ㅎ-deletion · 유음화 · 구개음화
//  11. Syllable Building              CV and CVC examples
//  12. Reading Consolidation          read full words & a sentence, applying every rule
//
// Total letters covered: 40 base letters + 11 double finals = 51 distinct shapes.
// AI tutor uses lessonType: 'foundation' — directives keep it on script and
// sound; no grammar patterns are introduced.

const createContentItem = (
  korean,
  romanization,
  english,
  type = 'word',
  example = '',
  exampleEnglish = '',
  breakdown = null,
  activityIds = [],
) => ({
  type,
  activityIds,
  targetText: korean,
  romanization,
  nativeText: english,
  pronunciation: romanization,
  exampleTarget: example || korean,
  exampleNative: exampleEnglish || english,
  korean,
  english,
  example: example || korean,
  exampleEnglish: exampleEnglish || english,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.korean, native: b.english, korean: b.korean, english: b.english })) } : {}),
});

const ACT = {
  intro: 'hangul-intro',
  basicConsonants: 'hangul-basic-consonants',
  triads: 'hangul-consonant-triads',
  tenseConsonants: 'hangul-tense-consonants',
  basicVowels: 'hangul-basic-vowels',
  compoundVowels: 'hangul-compound-vowels',
  blockLayout: 'hangul-block-layout',
  finalConsonants: 'hangul-final-consonants',
  doubleFinals: 'hangul-double-finals',
  soundChanges: 'hangul-sound-changes',
  syllableBuilding: 'hangul-syllable-building',
  reading: 'hangul-reading-practice',
};

const activities = [
  {
    id: ACT.intro,
    section: 'Hangul Intro',
    title: '한글 입문 — How the Korean alphabet works',
    goals: [
      'Know that 한글 was invented in 1443 by King Sejong (세종대왕) so any Korean could learn to read in a day.',
      'Understand that consonants are shaped after the mouth/tongue, and vowels combine sky (•), earth (ㅡ), and human (ㅣ).',
      'Know that Korean writes in syllable blocks (square units), not letter-by-letter.',
    ],
    task: 'Read the four structural facts. After this lesson you should be able to write your own name in 한글.',
  },
  {
    id: ACT.basicConsonants,
    section: 'Basic Consonants',
    title: '자음 I — The 14 basic consonants',
    goals: [
      'Recognize all 14 basic Korean consonants by shape and sound.',
      'Hear how plain consonants soften between vowels and harden at the end of a syllable.',
    ],
    task: 'Read each consonant + the example word aloud.',
  },
  {
    id: ACT.triads,
    section: 'Plain · Aspirated · Tense',
    title: '평음 · 격음 · 경음 — the three-way consonant contrast',
    goals: [
      'Hear the single most important Korean sound contrast: plain vs aspirated vs tense.',
      'Map every consonant onto its triad: ㄱ/ㅋ/ㄲ, ㄷ/ㅌ/ㄸ, ㅂ/ㅍ/ㅃ, ㅈ/ㅊ/ㅉ, ㅅ/—/ㅆ.',
    ],
    task: 'For each triad, say all three sounds aloud while holding your hand in front of your mouth to feel the air.',
  },
  {
    id: ACT.tenseConsonants,
    section: 'Tense Consonants',
    title: '자음 II — The 5 tense consonants',
    goals: [
      'Recognize the 5 doubled (tense) consonants ㄲ ㄸ ㅃ ㅆ ㅉ.',
      'Pronounce them sharply with a tight throat and no aspiration.',
    ],
    task: 'Read each tense consonant aloud and contrast with its plain partner.',
  },
  {
    id: ACT.basicVowels,
    section: 'Basic Vowels',
    title: '모음 I — The 10 basic vowels',
    goals: [
      'Recognize the 10 basic Korean vowels in dictionary order.',
      'Pair each vowel with the silent ㅇ to form a syllable.',
    ],
    task: 'Read each vowel and its example word aloud.',
  },
  {
    id: ACT.compoundVowels,
    section: 'Compound Vowels',
    title: '모음 II — The 11 compound vowels',
    goals: [
      'Recognize ㅐ ㅒ ㅔ ㅖ (a/e/ae/ye family — ㅐ and ㅔ have merged in modern speech).',
      'Recognize the w-vowels ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ and the diphthong ㅢ.',
    ],
    task: 'Read each compound vowel and the example word aloud.',
  },
  {
    id: ACT.blockLayout,
    section: 'Syllable Layout',
    title: '음절 구성 — Where each vowel sits inside the block',
    goals: [
      'Know the three vowel positions: right of, below, or wrapping the initial consonant.',
      'Place 받침 correctly (always at the bottom).',
    ],
    task: 'For three vowels (ㅏ, ㅗ, ㅘ), say where the consonant and vowel go inside the block.',
  },
  {
    id: ACT.finalConsonants,
    section: 'Final Consonants',
    title: '받침 — The 7 final-consonant sounds',
    goals: [
      'Apply the rule that every Korean 받침 reduces to one of 7 sounds.',
      'Know that ㅋ ㄲ → [ㄱ]; ㅅ ㅆ ㅈ ㅊ ㅌ → [ㄷ]; ㅍ → [ㅂ].',
    ],
    task: 'Read each example word and identify the reduced 받침 sound.',
  },
  {
    id: ACT.doubleFinals,
    section: 'Double Finals',
    title: '겹받침 — Double-final consonant clusters',
    goals: [
      'Recognize the 11 double-final clusters.',
      'Know the standard rule for which letter is pronounced in each cluster.',
    ],
    task: 'Read each example word and identify which letter of the double-final is pronounced.',
  },
  {
    id: ACT.soundChanges,
    section: 'Sound Changes',
    title: '음운 변화 — The 7 rules that change how letters sound',
    goals: [
      'Apply 연음 (liaison): a 받침 jumps to the next syllable when that syllable starts with ㅇ.',
      'Apply 경음화, 비음화, 격음화, ㄹ-assimilation, ㅎ-deletion, and palatalization to read real Korean aloud.',
    ],
    task: 'Read each example and explain which rule applies and why.',
  },
  {
    id: ACT.syllableBuilding,
    section: 'Syllable Building',
    title: '자모 결합 — Building syllables',
    goals: [
      'Combine 자음 + 모음 to form a CV syllable.',
      'Combine 자음 + 모음 + 받침 to form a CVC syllable.',
      'Read your first real Korean words.',
    ],
    task: 'Build three CV syllables and three CVC syllables from given parts.',
  },
  {
    id: ACT.reading,
    section: 'Reading Practice',
    title: '읽기 연습 — Put it all together',
    goals: [
      'Read a short Korean sentence aloud applying every rule learned today.',
      'Identify which sound-change rule is happening at each point.',
    ],
    task: 'Read the sentence "안녕하세요. 저는 한국어를 배워요." aloud and call out the sound changes.',
  },
];

const level1Foundation = {
  title: '1과 (입문): 한글 — Reading & Writing the Korean Alphabet',
  category: 'greetings', // foundation lessons live under greetings until a 'foundation' category is added
  difficulty: 'beginner',
  targetLang: 'ko',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'foundation',
  activities,
  // Hangul lessons don't drill functional expressions — they're pre-language.
  expressionPractice: [],
  relatedPools: [],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Hangul Intro & Structure
    // The "why" before the "how". Once a learner sees the system, the
    // rest is just filling in 40 shapes.
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '한글 (Hangul)', 'hangeul',
      'The Korean alphabet — created in 1443 by King Sejong (세종대왕) so any commoner could learn to read in a day.',
      'word', '훈민정음 — "the proper sounds to teach the people"', 'The original 1446 publication that introduced 한글.',
      [
        { korean: '세종대왕', english: 'King Sejong the Great' },
        { korean: '1443', english: 'Year 한글 was invented' },
        { korean: '훈민정음', english: 'Original name of the script' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'Featural design — consonants', 'shape mirrors the mouth',
      'The 5 base consonants are drawn to look like the speech organ that makes them.',
      'word', 'ㄱ ㄴ ㅁ ㅅ ㅇ', 'the five base consonant shapes',
      [
        { korean: 'ㄱ', english: 'back of the tongue raised' },
        { korean: 'ㄴ', english: 'tongue tip on the upper teeth' },
        { korean: 'ㅁ', english: 'closed lips (square)' },
        { korean: 'ㅅ', english: 'teeth' },
        { korean: 'ㅇ', english: 'open throat (circle)' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'Featural design — vowels', 'sky · earth · human',
      'Every vowel combines three primitive strokes: • (sky, yang), ㅡ (earth, yin), and ㅣ (human).',
      'word', 'ㅏ = ㅣ + • · ㅗ = • + ㅡ', 'sky-stroke determines bright/dark vowel class',
      [
        { korean: '• (점)', english: 'sky / yang' },
        { korean: 'ㅡ (가로)', english: 'earth / yin' },
        { korean: 'ㅣ (세로)', english: 'human (between sky and earth)' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'Syllable blocks', 'square units',
      'Korean groups letters into square syllable blocks. Each block is one syllable: C + V (+ C).',
      'word', '한 = ㅎ + ㅏ + ㄴ', 'three letters, one square block, one sound: "han"',
      [
        { korean: '한', english: 'one syllable block (NOT h-a-n linear)' },
        { korean: '한국', english: 'two syllables: 한 + 국' },
        { korean: '한국어', english: 'three syllables: 한 + 국 + 어' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'Silent ㅇ rule', 'ieung as placeholder',
      'Every syllable must START with a consonant. If a syllable has no real opening consonant, write ㅇ as a silent placeholder. ㅇ is silent at the start, "ng" at the end.',
      'word', '아이 vs 강', '아이 = silent ㅇ × 2 · 강 = final ㅇ → ng',
      [
        { korean: '아 (a)', english: 'ㅇ silent + ㅏ → "a"' },
        { korean: '강 (gang)', english: 'final ㅇ → "ng"' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      'Stroke direction', 'top→bottom, left→right',
      'Write each stroke top-to-bottom and left-to-right (same as Chinese characters). Inside a block, write the consonant first, then the vowel, then the 받침.',
      'word', '한 → ㅎ, then ㅏ, then ㄴ', 'order of strokes inside the block',
      null,
      [ACT.intro],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Basic Consonants (14)
    // Dictionary order. Each item shows the letter, romanization (which can
    // differ between initial and final position), and a real example word.
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ㄱ (기역)', 'g (initial) / k (final)', 'first basic consonant — soft "g" between vowels, "k" at end', 'word', '가방', 'bag', null, [ACT.basicConsonants]),
    createContentItem('ㄴ (니은)', 'n', 'like English n', 'word', '나무', 'tree', null, [ACT.basicConsonants]),
    createContentItem('ㄷ (디귿)', 'd (initial) / t (final)', '"d" between vowels, "t" at end', 'word', '다리', 'leg / bridge', null, [ACT.basicConsonants]),
    createContentItem('ㄹ (리을)', 'r (between vowels) / l (final, doubled)', 'rolled-r between vowels, "l" at the end', 'word', '라디오', 'radio', null, [ACT.basicConsonants]),
    createContentItem('ㅁ (미음)', 'm', 'like English m', 'word', '머리', 'head / hair', null, [ACT.basicConsonants]),
    createContentItem('ㅂ (비읍)', 'b (initial) / p (final)', '"b" between vowels, "p" at end', 'word', '바다', 'sea', null, [ACT.basicConsonants]),
    createContentItem('ㅅ (시옷)', 's', '"s" — becomes [sh] before ㅣ or y-vowels', 'word', '사람', 'person', null, [ACT.basicConsonants]),
    createContentItem('ㅇ (이응)', '(silent at start) / ng (final)', 'silent placeholder at the start of a syllable; "ng" as 받침', 'word', '아이', 'child', null, [ACT.basicConsonants]),
    createContentItem('ㅈ (지읒)', 'j (initial) / t (final)', '"j" between vowels, "t"-like at end', 'word', '자리', 'seat / spot', null, [ACT.basicConsonants]),
    createContentItem('ㅊ (치읓)', 'ch', 'aspirated ch', 'word', '차', 'tea / car', null, [ACT.basicConsonants]),
    createContentItem('ㅋ (키읔)', 'k', 'aspirated k (puff of air)', 'word', '커피', 'coffee', null, [ACT.basicConsonants]),
    createContentItem('ㅌ (티읕)', 't', 'aspirated t', 'word', '토마토', 'tomato', null, [ACT.basicConsonants]),
    createContentItem('ㅍ (피읖)', 'p', 'aspirated p', 'word', '피자', 'pizza', null, [ACT.basicConsonants]),
    createContentItem('ㅎ (히읗)', 'h', 'like English h', 'word', '학교', 'school', null, [ACT.basicConsonants]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Plain · Aspirated · Tense triads (평음 · 격음 · 경음)
    // The single most important contrast in Korean phonology. Same mouth
    // shape, three different airflows.
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'ㄱ / ㅋ / ㄲ', 'g / k(h) / kk',
      'k-family triad. Same back-of-tongue position, three breath levels.',
      'word', '가 / 카 / 까', 'plain / aspirated / tense',
      [
        { korean: 'ㄱ (가)', english: 'plain — soft, almost "g" between vowels' },
        { korean: 'ㅋ (카)', english: 'aspirated — strong puff of air' },
        { korean: 'ㄲ (까)', english: 'tense — sharp, tight, NO air' },
      ],
      [ACT.triads],
    ),
    createContentItem(
      'ㄷ / ㅌ / ㄸ', 'd / t(h) / tt',
      't-family triad. Tongue tip behind the upper teeth.',
      'word', '다 / 타 / 따', 'plain / aspirated / tense',
      [
        { korean: 'ㄷ (다)', english: 'plain — soft "d"' },
        { korean: 'ㅌ (타)', english: 'aspirated — strong puff' },
        { korean: 'ㄸ (따)', english: 'tense — sharp, no air' },
      ],
      [ACT.triads],
    ),
    createContentItem(
      'ㅂ / ㅍ / ㅃ', 'b / p(h) / pp',
      'p-family triad. Both lips closed.',
      'word', '바 / 파 / 빠', 'plain / aspirated / tense',
      [
        { korean: 'ㅂ (바)', english: 'plain — soft "b"' },
        { korean: 'ㅍ (파)', english: 'aspirated — strong puff' },
        { korean: 'ㅃ (빠)', english: 'tense — sharp, no air' },
      ],
      [ACT.triads],
    ),
    createContentItem(
      'ㅈ / ㅊ / ㅉ', 'j / ch / jj',
      'ch-family triad. Tongue blade on the palate.',
      'word', '자 / 차 / 짜', 'plain / aspirated / tense',
      [
        { korean: 'ㅈ (자)', english: 'plain — soft "j"' },
        { korean: 'ㅊ (차)', english: 'aspirated — strong puff' },
        { korean: 'ㅉ (짜)', english: 'tense — sharp, no air' },
      ],
      [ACT.triads],
    ),
    createContentItem(
      'ㅅ / — / ㅆ', 's / — / ss',
      's-family — only two members, no aspirated form.',
      'word', '사 / — / 싸', 'plain / (no aspirated) / tense',
      [
        { korean: 'ㅅ (사)', english: 'plain — "s"' },
        { korean: 'ㅆ (싸)', english: 'tense — sharp "ss"' },
      ],
      [ACT.triads],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Tense Consonants (5)
    // Doubled-character consonants. Pronounce sharply with tight throat,
    // no aspiration. Romanization uses the doubled letter.
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ㄲ (쌍기역)', 'kk', 'tense kk — sharper than ㄱ, no aspiration', 'word', '꿈', 'dream', null, [ACT.tenseConsonants]),
    createContentItem('ㄸ (쌍디귿)', 'tt', 'tense tt', 'word', '딸기', 'strawberry', null, [ACT.tenseConsonants]),
    createContentItem('ㅃ (쌍비읍)', 'pp', 'tense pp', 'word', '빵', 'bread', null, [ACT.tenseConsonants]),
    createContentItem('ㅆ (쌍시옷)', 'ss', 'tense ss', 'word', '쌀', 'uncooked rice', null, [ACT.tenseConsonants]),
    createContentItem('ㅉ (쌍지읒)', 'jj', 'tense jj', 'word', '짜다', 'to be salty', null, [ACT.tenseConsonants]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Basic Vowels (10)
    // The classic 10 vowels in dictionary order. Vowels are written either
    // beside or below the initial consonant. The yang/yin/neutral grouping
    // matters later for verb conjugation (-아/어 ending choice).
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ㅏ (아)', 'a', 'like "ah" — open front · yang vowel', 'word', '아이', 'child', null, [ACT.basicVowels]),
    createContentItem('ㅑ (야)', 'ya', 'y-glide + a · yang vowel', 'word', '야구', 'baseball', null, [ACT.basicVowels]),
    createContentItem('ㅓ (어)', 'eo', 'like the "uh" in "but" · yin vowel', 'word', '어머니', 'mother', null, [ACT.basicVowels]),
    createContentItem('ㅕ (여)', 'yeo', 'y-glide + eo · yin vowel', 'word', '여자', 'woman', null, [ACT.basicVowels]),
    createContentItem('ㅗ (오)', 'o', 'like "oh" — close-mid back · yang vowel', 'word', '오이', 'cucumber', null, [ACT.basicVowels]),
    createContentItem('ㅛ (요)', 'yo', 'y-glide + o · yang vowel', 'word', '요리', 'cooking', null, [ACT.basicVowels]),
    createContentItem('ㅜ (우)', 'u', 'like "oo" — close back · yin vowel', 'word', '우유', 'milk', null, [ACT.basicVowels]),
    createContentItem('ㅠ (유)', 'yu', 'y-glide + u · yin vowel', 'word', '유리', 'glass', null, [ACT.basicVowels]),
    createContentItem('ㅡ (으)', 'eu', 'close back unrounded /ɯ/, no English equivalent — smile and say "uh" · neutral vowel', 'word', '음악', 'music', null, [ACT.basicVowels]),
    createContentItem('ㅣ (이)', 'i', 'like "ee" — close front · neutral vowel', 'word', '이름', 'name', null, [ACT.basicVowels]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Compound Vowels (11)
    // ㅐ ㅔ ㅒ ㅖ are simple compounds; ㅘ–ㅢ are w-glides.
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ㅐ (애)', 'ae', 'near-open front /ɛ/, like "eh"', 'word', '새', 'bird', null, [ACT.compoundVowels]),
    createContentItem('ㅒ (얘)', 'yae', 'y-glide + ae (rare)', 'word', '얘기', 'story / talk (informal)', null, [ACT.compoundVowels]),
    createContentItem('ㅔ (에)', 'e', 'close-mid front /e/ — in modern speech ㅐ and ㅔ sound nearly identical', 'word', '에어컨', 'air conditioner', null, [ACT.compoundVowels]),
    createContentItem('ㅖ (예)', 'ye', 'y-glide + e', 'word', '예의', 'manners / etiquette', null, [ACT.compoundVowels]),
    createContentItem('ㅘ (와)', 'wa', 'w-glide + a', 'word', '과일', 'fruit', null, [ACT.compoundVowels]),
    createContentItem('ㅙ (왜)', 'wae', 'w-glide + ae', 'word', '왜', 'why', null, [ACT.compoundVowels]),
    createContentItem('ㅚ (외)', 'oe', 'pronounced like "we" in modern Korean', 'word', '외국', 'foreign country', null, [ACT.compoundVowels]),
    createContentItem('ㅝ (워)', 'wo', 'w-glide + eo', 'word', '뭐', 'what', null, [ACT.compoundVowels]),
    createContentItem('ㅞ (웨)', 'we', 'w-glide + e (rare)', 'word', '웨이터', 'waiter (loanword)', null, [ACT.compoundVowels]),
    createContentItem('ㅟ (위)', 'wi', 'w-glide + i', 'word', '위', 'top / above', null, [ACT.compoundVowels]),
    createContentItem('ㅢ (의)', 'ui', 'eu + i — pronounced [ui] at word start, [i] in middle, [e] for possessive 의', 'word', '의자', 'chair', null, [ACT.compoundVowels]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Syllable Block Layout
    // Three vowel positions: right of, below, or wrapping the consonant.
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Right-side vowels (가로 모음)', 'C | V',
      'Vertical-line vowels sit to the RIGHT of the initial consonant: ㅏ ㅑ ㅓ ㅕ ㅣ ㅐ ㅒ ㅔ ㅖ.',
      'word', '나 · 너 · 니', 'consonant left, vowel right',
      [
        { korean: '나 (na)', english: 'ㄴ | ㅏ — ㄴ on the left, ㅏ on the right' },
        { korean: '시 (si)', english: 'ㅅ | ㅣ' },
        { korean: '개 (gae)', english: 'ㄱ | ㅐ' },
      ],
      [ACT.blockLayout],
    ),
    createContentItem(
      'Bottom-side vowels (세로 모음)', 'C / V',
      'Horizontal-line vowels sit BELOW the initial consonant: ㅗ ㅛ ㅜ ㅠ ㅡ.',
      'word', '노 · 누 · 느', 'consonant top, vowel bottom',
      [
        { korean: '노 (no)', english: 'ㄴ on top, ㅗ on the bottom' },
        { korean: '구 (gu)', english: 'ㄱ on top, ㅜ on the bottom' },
        { korean: '으 (eu)', english: 'silent ㅇ on top, ㅡ on the bottom' },
      ],
      [ACT.blockLayout],
    ),
    createContentItem(
      'L-shape vowels (혼합 모음)', 'C + V wrap',
      'Combined w-vowels WRAP the consonant: ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ. The consonant sits top-left, the vowel extends right and below.',
      'word', '와 · 워 · 의', 'consonant top-left, vowel L-shape',
      [
        { korean: '와 (wa)', english: 'ㅇ top-left, ㅗ below it, ㅏ to the right of ㅗ' },
        { korean: '워 (wo)', english: 'ㅇ top-left, ㅜ below, ㅓ right' },
        { korean: '의 (ui)', english: 'ㅇ top-left, ㅡ below, ㅣ right of ㅡ' },
      ],
      [ACT.blockLayout],
    ),
    createContentItem(
      '받침 always at the bottom', 'C V — 받침 below',
      'Whatever shape the block has, the 받침 sits in a row at the very bottom of the block.',
      'word', '안 · 곳 · 광', 'final consonant always at the bottom',
      [
        { korean: '안 (an)', english: 'ㅇ | ㅏ on top row, ㄴ at the bottom' },
        { korean: '곳 (got)', english: 'ㄱ / ㅗ on top, ㅅ at the bottom' },
        { korean: '광 (gwang)', english: 'ㄱ / ㅘ on top (L-shape), ㅇ at the bottom' },
      ],
      [ACT.blockLayout],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Final Consonants: the 7 representative sounds
    // All 받침 reduce to one of: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '받침 → [ㄱ]', '[k]',
      'Final ㄱ, ㅋ, ㄲ all sound like an unreleased [k].',
      'word', '학교', 'school — 학 ends in [ㄱ]',
      [
        { korean: '학 [hak]', english: 'ㅎ + ㅏ + ㄱ' },
        { korean: '교 [gyo]', english: 'ㄱ + ㅛ (no 받침)' },
      ],
      [ACT.finalConsonants],
    ),
    createContentItem(
      '받침 → [ㄴ]', '[n]',
      'Final ㄴ stays [n].',
      'word', '안녕', 'hello — 안 ends in [ㄴ]',
      [
        { korean: '안 [an]', english: 'ㅇ + ㅏ + ㄴ' },
        { korean: '녕 [nyeong]', english: 'ㄴ + ㅕ + ㅇ' },
      ],
      [ACT.finalConsonants],
    ),
    createContentItem(
      '받침 → [ㄷ]', '[t]',
      'Final ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㄷ all sound like an unreleased [t].',
      'word', '꽃', 'flower — 꽃 has 받침 ㅊ pronounced [t]',
      [{ korean: '꽃 [꼳]', english: 'final ㅊ → [t]' }],
      [ACT.finalConsonants],
    ),
    createContentItem(
      '받침 → [ㄹ]', '[l]',
      'Final ㄹ sounds like a clear [l].',
      'word', '서울', 'Seoul — 울 ends in [ㄹ]',
      [
        { korean: '서 [seo]', english: 'ㅅ + ㅓ' },
        { korean: '울 [ul]', english: 'ㅇ + ㅜ + ㄹ' },
      ],
      [ACT.finalConsonants],
    ),
    createContentItem(
      '받침 → [ㅁ]', '[m]',
      'Final ㅁ stays [m].',
      'word', '사람', 'person — 람 ends in [ㅁ]',
      [
        { korean: '사 [sa]', english: 'ㅅ + ㅏ' },
        { korean: '람 [ram]', english: 'ㄹ + ㅏ + ㅁ' },
      ],
      [ACT.finalConsonants],
    ),
    createContentItem(
      '받침 → [ㅂ]', '[p]',
      'Final ㅂ, ㅍ both sound like an unreleased [p].',
      'word', '집', 'house — 집 ends in [ㅂ]',
      [{ korean: '집 [jip]', english: 'ㅈ + ㅣ + ㅂ' }],
      [ACT.finalConsonants],
    ),
    createContentItem(
      '받침 → [ㅇ]', '[ng]',
      'Final ㅇ sounds like English "ng". The ㅇ is silent ONLY at the START of a syllable.',
      'word', '강', 'river — 강 ends in [ㅇ]',
      [{ korean: '강 [gang]', english: 'ㄱ + ㅏ + ㅇ' }],
      [ACT.finalConsonants],
    ),
    createContentItem(
      '받침 reduction examples',
      'examples', 'Words that show 받침 reducing to one of the 7 sounds.',
      'word', '안녕하세요. 만나서 반갑습니다.', 'Hello. Nice to meet you.',
      [
        { korean: '안 [an]', english: '받침 ㄴ' },
        { korean: '녕 [nyeong]', english: '받침 ㅇ' },
        { korean: '반 [ban]', english: '받침 ㄴ' },
        { korean: '갑 [gap]', english: '받침 ㅂ' },
        { korean: '습 [seup]', english: '받침 ㅂ' },
      ],
      [ACT.finalConsonants],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Double Final Consonants (겹받침), all 11 clusters
    // For each cluster, the rule says which letter is pronounced when the
    // syllable is followed by a consonant; before a vowel, the second letter
    // moves to the next syllable.
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'ㄳ → [ㄱ]', 'gs → [k]',
      'Cluster ㄱ + ㅅ. The ㄱ is pronounced.',
      'word', '몫', 'share / portion — pronounced [목]',
      [{ korean: '몫 [목]', english: 'final ㄳ → [k]' }],
      [ACT.doubleFinals],
    ),
    createContentItem(
      'ㄵ → [ㄴ]', 'nj → [n]',
      'Cluster ㄴ + ㅈ. The ㄴ is pronounced.',
      'word', '앉다', 'to sit — pronounced [안따]',
      [{ korean: '앉 [안]', english: 'final ㄵ → [n]' }],
      [ACT.doubleFinals],
    ),
    createContentItem(
      'ㄶ → [ㄴ]', 'nh → [n]',
      'Cluster ㄴ + ㅎ. The ㄴ is pronounced; the ㅎ aspirates a following consonant.',
      'word', '많다', 'to be many — pronounced [만타]',
      [{ korean: '많 [만]', english: 'final ㄶ → [n], ㅎ + ㄷ → ㅌ' }],
      [ACT.doubleFinals],
    ),
    createContentItem(
      'ㄺ → [ㄱ]', 'lg → [k]',
      'Cluster ㄹ + ㄱ. Usually the ㄱ is pronounced (with a few exceptions like 읽다 = [익따]).',
      'word', '닭', 'chicken — pronounced [닥]',
      [{ korean: '닭 [닥]', english: 'final ㄺ → [k]' }],
      [ACT.doubleFinals],
    ),
    createContentItem(
      'ㄻ → [ㅁ]', 'lm → [m]',
      'Cluster ㄹ + ㅁ. The ㅁ is pronounced.',
      'word', '삶', 'life — pronounced [삼]',
      [{ korean: '삶 [삼]', english: 'final ㄻ → [m]' }],
      [ACT.doubleFinals],
    ),
    createContentItem(
      'ㄼ → [ㄹ]', 'lb → [l]',
      'Cluster ㄹ + ㅂ. The ㄹ is pronounced (with exceptions like 밟다 = [밥따]).',
      'word', '여덟', 'eight — pronounced [여덜]',
      [{ korean: '여덟 [여덜]', english: 'final ㄼ → [l]' }],
      [ACT.doubleFinals],
    ),
    createContentItem(
      'ㄽ → [ㄹ]', 'ls → [l]',
      'Cluster ㄹ + ㅅ. The ㄹ is pronounced. (Rare cluster — almost only in 외곬.)',
      'word', '외곬', 'one-track — pronounced [외골]',
      [{ korean: '외곬 [외골]', english: 'final ㄽ → [l]' }],
      [ACT.doubleFinals],
    ),
    createContentItem(
      'ㄾ → [ㄹ]', 'lt → [l]',
      'Cluster ㄹ + ㅌ. The ㄹ is pronounced.',
      'word', '핥다', 'to lick — pronounced [할따]',
      [{ korean: '핥 [할]', english: 'final ㄾ → [l]' }],
      [ACT.doubleFinals],
    ),
    createContentItem(
      'ㄿ → [ㅂ]', 'lp → [p]',
      'Cluster ㄹ + ㅍ. The ㅂ is pronounced.',
      'word', '읊다', 'to recite — pronounced [읍따]',
      [{ korean: '읊 [읍]', english: 'final ㄿ → [p]' }],
      [ACT.doubleFinals],
    ),
    createContentItem(
      'ㅀ → [ㄹ]', 'lh → [l]',
      'Cluster ㄹ + ㅎ. The ㄹ is pronounced; the ㅎ aspirates a following consonant.',
      'word', '싫다', 'to dislike — pronounced [실타]',
      [{ korean: '싫 [실]', english: 'final ㅀ → [l], ㅎ + ㄷ → ㅌ' }],
      [ACT.doubleFinals],
    ),
    createContentItem(
      'ㅄ → [ㅂ]', 'bs → [p]',
      'Cluster ㅂ + ㅅ. The ㅂ is pronounced.',
      'word', '값', 'price — pronounced [갑]',
      [{ korean: '값 [갑]', english: 'final ㅄ → [p]' }],
      [ACT.doubleFinals],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Sound Changes (음운 변화)
    // The 7 rules that let learners actually READ Korean out loud.
    // Without these, students sound out 한국어 as "han-guk-eo" instead
    // of [한구거], etc.
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '연음 (liaison)', '받침 + ㅇ → moves to next syllable',
      'When a 받침 is followed by a syllable that starts with silent ㅇ, the 받침 jumps over and becomes the initial consonant of that syllable.',
      'word', '한국어 → [한구거]', 'the most common Korean reading rule',
      [
        { korean: '한 + 국 + 어', english: 'spelled this way' },
        { korean: '[한 · 구 · 거]', english: 'final ㄱ of 국 jumps to the ㅇ of 어 → 거' },
        { korean: '음악 → [으막]', english: 'final ㅁ of 음 jumps to the ㅇ of 악 → 막' },
      ],
      [ACT.soundChanges],
    ),
    createContentItem(
      '경음화 (tensification)', 'plain → tense after [ㄱ ㄷ ㅂ]',
      'After a 받침 that ends in [ㄱ], [ㄷ], or [ㅂ], a following plain consonant (ㄱ ㄷ ㅂ ㅅ ㅈ) becomes tense.',
      'word', '학교 → [학꾜]', 'spelled with ㄱ, pronounced ㄲ',
      [
        { korean: '학교 [학꾜]', english: 'ㄱ받침 + ㄱ → ㄱ + ㄲ' },
        { korean: '식당 [식땅]', english: 'ㄱ받침 + ㄷ → ㄱ + ㄸ' },
        { korean: '입국 [입꾹]', english: 'ㅂ받침 + ㄱ → ㅂ + ㄲ' },
      ],
      [ACT.soundChanges],
    ),
    createContentItem(
      '비음화 (nasalization)', 'stop → nasal before nasal',
      'A 받침 ending in [ㄱ], [ㄷ], or [ㅂ] becomes a nasal ([ㅇ], [ㄴ], [ㅁ]) when followed by a nasal consonant (ㄴ ㅁ).',
      'word', '국물 → [궁물]', 'ㄱ받침 turns into ㅇ before ㅁ',
      [
        { korean: '국물 [궁물]', english: '[ㄱ] + ㅁ → [ㅇ] + ㅁ' },
        { korean: '학년 [항년]', english: '[ㄱ] + ㄴ → [ㅇ] + ㄴ' },
        { korean: '입니다 [임니다]', english: '[ㅂ] + ㄴ → [ㅁ] + ㄴ — very common!' },
      ],
      [ACT.soundChanges],
    ),
    createContentItem(
      '격음화 (ㅎ-aspiration)', 'ㅎ + plain → aspirated',
      'When ㅎ meets ㄱ, ㄷ, ㅂ, or ㅈ (in either order), they merge into the aspirated version: ㅋ, ㅌ, ㅍ, ㅊ.',
      'word', '좋다 → [조타]', 'ㅎ받침 + ㄷ → ㅌ',
      [
        { korean: '좋다 [조타]', english: 'ㅎ + ㄷ → ㅌ' },
        { korean: '입학 [이팍]', english: 'ㅂ + ㅎ → ㅍ' },
        { korean: '축하 [추카]', english: 'ㄱ + ㅎ → ㅋ' },
      ],
      [ACT.soundChanges],
    ),
    createContentItem(
      'ㅎ 탈락 (ㅎ-deletion)', 'ㅎ disappears before a vowel',
      'When a syllable ends in ㅎ-받침 and the next syllable starts with a vowel (silent ㅇ), the ㅎ is dropped entirely.',
      'word', '좋아요 → [조아요]', 'the ㅎ in 좋 disappears',
      [
        { korean: '좋아요 [조아요]', english: 'ㅎ받침 + 아 → 아' },
        { korean: '많아요 [마나요]', english: 'ㅀ받침 + 아 → ㄴ jumps over, ㅎ drops' },
        { korean: '싫어요 [시러요]', english: 'ㅀ받침 + 어 → ㄹ jumps over, ㅎ drops' },
      ],
      [ACT.soundChanges],
    ),
    createContentItem(
      '유음화 (ㄹ-assimilation)', 'ㄴ + ㄹ → ㄹ + ㄹ',
      'When ㄴ meets ㄹ (in either order), both become ㄹ.',
      'word', '신라 → [실라]', 'ancient Korean kingdom',
      [
        { korean: '신라 [실라]', english: 'ㄴ + ㄹ → ㄹ + ㄹ' },
        { korean: '한라산 [할라산]', english: 'name of a mountain' },
        { korean: '일년 [일련]', english: 'ㄹ + ㄴ → ㄹ + ㄹ' },
      ],
      [ACT.soundChanges],
    ),
    createContentItem(
      '구개음화 (palatalization)', 'ㄷ/ㅌ + 이 → ㅈ/ㅊ',
      'When ㄷ-받침 or ㅌ-받침 is followed by 이, it becomes ㅈ or ㅊ.',
      'word', '같이 → [가치]', 'together',
      [
        { korean: '같이 [가치]', english: 'ㅌ받침 + 이 → 치' },
        { korean: '굳이 [구지]', english: 'ㄷ받침 + 이 → 지' },
        { korean: '해돋이 [해도지]', english: 'sunrise — ㄷ + 이 → 지' },
      ],
      [ACT.soundChanges],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Syllable Building
    // Show how 자음 + 모음 (CV) and 자음 + 모음 + 받침 (CVC) combine.
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '가 = ㄱ + ㅏ', 'ga',
      'CV: consonant beside vowel. Read left-to-right.', 'word',
      '가다', 'to go',
      [{ korean: '가', english: 'ㄱ (g) + ㅏ (a) → ga' }],
      [ACT.syllableBuilding],
    ),
    createContentItem(
      '도 = ㄷ + ㅗ', 'do',
      'CV: vowel ㅗ sits below the consonant (vertical-stack vowel).', 'word',
      '도시', 'city',
      [{ korean: '도', english: 'ㄷ (d) + ㅗ (o) → do' }],
      [ACT.syllableBuilding],
    ),
    createContentItem(
      '나 = ㄴ + ㅏ', 'na',
      'CV: another horizontal stack.', 'word',
      '나라', 'country',
      [{ korean: '나', english: 'ㄴ (n) + ㅏ (a) → na' }],
      [ACT.syllableBuilding],
    ),
    createContentItem(
      '학 = ㅎ + ㅏ + ㄱ', 'hak',
      'CVC: 받침 sits below the consonant + vowel pair.', 'word',
      '학생', 'student',
      [
        { korean: '학', english: 'ㅎ + ㅏ + ㄱ → hak' },
        { korean: '생', english: 'ㅅ + ㅐ + ㅇ → saeng' },
      ],
      [ACT.syllableBuilding],
    ),
    createContentItem(
      '강 = ㄱ + ㅏ + ㅇ', 'gang',
      'CVC where the 받침 is ㅇ → [ng].', 'word',
      '강아지', 'puppy',
      [
        { korean: '강', english: 'ㄱ + ㅏ + ㅇ → gang' },
        { korean: '아', english: 'ㅇ (silent) + ㅏ → a' },
        { korean: '지', english: 'ㅈ + ㅣ → ji' },
      ],
      [ACT.syllableBuilding],
    ),
    createContentItem(
      '책 = ㅊ + ㅐ + ㄱ', 'chaek',
      'CVC using a compound vowel (ㅐ) + a 받침 ㄱ.', 'word',
      '책상', 'desk',
      [
        { korean: '책', english: 'ㅊ + ㅐ + ㄱ → chaek' },
        { korean: '상', english: 'ㅅ + ㅏ + ㅇ → sang' },
      ],
      [ACT.syllableBuilding],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Reading Consolidation
    // The pay-off. Read full Korean and identify every rule in action.
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '한국어', '[한구거] hangugeo',
      'Read aloud: "Korean (language)". Spot 연음.',
      'word', '한국어를 공부해요.', 'I study Korean.',
      [
        { korean: '한', english: 'ㅎ + ㅏ + ㄴ — han' },
        { korean: '국', english: 'ㄱ + ㅜ + ㄱ — guk' },
        { korean: '어', english: 'silent ㅇ + ㅓ — eo' },
        { korean: '[한구거]', english: '연음: ㄱ받침 of 국 jumps to 어 → 거' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '학교에 가요', '[학꾜에 가요]',
      'Read aloud: "I go to school". Spot 경음화 in 학교.',
      'word', '학교에 가요.', 'I go to school.',
      [
        { korean: '학교', english: '[학꾜] — ㄱ받침 + ㄱ → tensifies to ㄲ' },
        { korean: '에', english: 'particle "to" — silent ㅇ + ㅔ' },
        { korean: '가요', english: '"go" — no sound change' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '좋아요', '[조아요] joayo',
      'Read aloud: "I like it / It is good". Spot ㅎ-deletion.',
      'word', '한국어가 좋아요.', 'I like Korean.',
      [
        { korean: '좋', english: 'ㅈ + ㅗ + ㅎ받침' },
        { korean: '아', english: 'silent ㅇ + ㅏ' },
        { korean: '[조아요]', english: 'ㅎ받침 disappears before 아' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'Full sentence', '[안녕하세요. 저는 한구거를 배워요.]',
      'Final challenge: read aloud the introduction sentence applying every rule you learned today.',
      'sentence',
      '안녕하세요. 저는 한국어를 배워요.',
      'Hello. I am learning Korean.',
      [
        { korean: '안녕하세요', english: '[안녕하세요] — no major changes, just 받침 ㄴ/ㅇ' },
        { korean: '저는', english: '"I" + topic marker — [저는]' },
        { korean: '한국어', english: '[한구거] — 연음!' },
        { korean: '를', english: 'object marker' },
        { korean: '배워요', english: '"learn" — no sound change' },
      ],
      [ACT.reading],
    ),
  ],
};

module.exports = level1Foundation;
