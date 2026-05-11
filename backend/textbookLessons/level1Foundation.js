// Level 1 — Foundation: Hangul (한글) — complete alphabet
// First lesson in the Level 1 / Foundation track. Pre-grammar, pre-vocabulary.
// Covers every letter in the modern Korean alphabet plus syllable building.
//
// Activities:
//   1. Basic Consonants (14)        ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ
//   2. Tense Consonants (5)         ㄲ ㄸ ㅃ ㅆ ㅉ
//   3. Basic Vowels (10)            ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ
//   4. Compound Vowels (11)         ㅐ ㅒ ㅔ ㅖ ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ
//   5. Final Consonants — 7 sounds  ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ (plus reduction rules)
//   6. Double Finals (겹받침, 11)    ㄳ ㄵ ㄶ ㄺ ㄻ ㄼ ㄽ ㄾ ㄿ ㅀ ㅄ
//   7. Syllable Building            CV and CVC examples
//
// Total letters covered: 40 base letters + 11 double finals = 51 distinct shapes.
//
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
  basicConsonants: 'hangul-basic-consonants',
  tenseConsonants: 'hangul-tense-consonants',
  basicVowels: 'hangul-basic-vowels',
  compoundVowels: 'hangul-compound-vowels',
  finalConsonants: 'hangul-final-consonants',
  doubleFinals: 'hangul-double-finals',
  syllableBuilding: 'hangul-syllable-building',
};

const activities = [
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
    id: ACT.tenseConsonants,
    section: 'Tense Consonants',
    title: '자음 II — The 5 tense consonants',
    goals: [
      'Recognize the 5 doubled (tense) consonants ㄲ ㄸ ㅃ ㅆ ㅉ.',
      'Hear the difference between plain (ㄱ), aspirated (ㅋ), and tense (ㄲ) consonants.',
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
      'Recognize ㅐ ㅒ ㅔ ㅖ (a/e/ae/ye family).',
      'Recognize the w-vowels ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ and the diphthong ㅢ.',
    ],
    task: 'Read each compound vowel and the example word aloud.',
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
    // Activity 1 — Basic Consonants (14)
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
    // Activity 2 — Tense Consonants (5)
    // Doubled-character consonants. Pronounce sharply with tight throat,
    // no aspiration. Romanization uses the doubled letter.
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ㄲ (쌍기역)', 'kk', 'tense kk — sharper than ㄱ, no aspiration', 'word', '꿈', 'dream', null, [ACT.tenseConsonants]),
    createContentItem('ㄸ (쌍디귿)', 'tt', 'tense tt', 'word', '딸기', 'strawberry', null, [ACT.tenseConsonants]),
    createContentItem('ㅃ (쌍비읍)', 'pp', 'tense pp', 'word', '빵', 'bread', null, [ACT.tenseConsonants]),
    createContentItem('ㅆ (쌍시옷)', 'ss', 'tense ss', 'word', '쌀', 'uncooked rice', null, [ACT.tenseConsonants]),
    createContentItem('ㅉ (쌍지읒)', 'jj', 'tense jj', 'word', '짜다', 'to be salty', null, [ACT.tenseConsonants]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Basic Vowels (10)
    // The classic 10 vowels in dictionary order. Vowels are written either
    // beside or below the initial consonant.
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ㅏ (아)', 'a', 'like "ah" — open front', 'word', '아이', 'child', null, [ACT.basicVowels]),
    createContentItem('ㅑ (야)', 'ya', 'y-glide + a', 'word', '야구', 'baseball', null, [ACT.basicVowels]),
    createContentItem('ㅓ (어)', 'eo', 'like the "uh" in "but"', 'word', '어머니', 'mother', null, [ACT.basicVowels]),
    createContentItem('ㅕ (여)', 'yeo', 'y-glide + eo', 'word', '여자', 'woman', null, [ACT.basicVowels]),
    createContentItem('ㅗ (오)', 'o', 'like "oh" — close-mid back', 'word', '오이', 'cucumber', null, [ACT.basicVowels]),
    createContentItem('ㅛ (요)', 'yo', 'y-glide + o', 'word', '요리', 'cooking', null, [ACT.basicVowels]),
    createContentItem('ㅜ (우)', 'u', 'like "oo" — close back', 'word', '우유', 'milk', null, [ACT.basicVowels]),
    createContentItem('ㅠ (유)', 'yu', 'y-glide + u', 'word', '유리', 'glass', null, [ACT.basicVowels]),
    createContentItem('ㅡ (으)', 'eu', 'close back unrounded /ɯ/, no English equivalent — smile and say "uh"', 'word', '음악', 'music', null, [ACT.basicVowels]),
    createContentItem('ㅣ (이)', 'i', 'like "ee" — close front', 'word', '이름', 'name', null, [ACT.basicVowels]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Compound Vowels (11)
    // ㅐ ㅔ ㅒ ㅖ are simple compounds; ㅘ–ㅢ are w-glides.
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ㅐ (애)', 'ae', 'near-open front /ɛ/, like "eh"', 'word', '애기', 'baby', null, [ACT.compoundVowels]),
    createContentItem('ㅒ (얘)', 'yae', 'y-glide + ae (rare)', 'word', '얘기', 'story / talk (informal)', null, [ACT.compoundVowels]),
    createContentItem('ㅔ (에)', 'e', 'close-mid front /e/, "ay" without the glide', 'word', '에어컨', 'air conditioner', null, [ACT.compoundVowels]),
    createContentItem('ㅖ (예)', 'ye', 'y-glide + e', 'word', '예의', 'manners / etiquette', null, [ACT.compoundVowels]),
    createContentItem('ㅘ (와)', 'wa', 'w-glide + a', 'word', '과일', 'fruit', null, [ACT.compoundVowels]),
    createContentItem('ㅙ (왜)', 'wae', 'w-glide + ae', 'word', '왜', 'why', null, [ACT.compoundVowels]),
    createContentItem('ㅚ (외)', 'oe', 'pronounced like "we" in modern Korean', 'word', '외국', 'foreign country', null, [ACT.compoundVowels]),
    createContentItem('ㅝ (워)', 'wo', 'w-glide + eo', 'word', '뭐', 'what', null, [ACT.compoundVowels]),
    createContentItem('ㅞ (웨)', 'we', 'w-glide + e (rare)', 'word', '웨이터', 'waiter (loanword)', null, [ACT.compoundVowels]),
    createContentItem('ㅟ (위)', 'wi', 'w-glide + i', 'word', '위', 'top / above', null, [ACT.compoundVowels]),
    createContentItem('ㅢ (의)', 'ui', 'eu + i — pronounced [i] or [e] depending on position', 'word', '의자', 'chair', null, [ACT.compoundVowels]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Final Consonants: the 7 representative sounds
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
    // Activity 6 — Double Final Consonants (겹받침), all 11 clusters
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
      'Cluster ㄹ + ㅅ. The ㄹ is pronounced.',
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
    // Activity 7 — Syllable Building
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
  ],
};

module.exports = level1Foundation;
