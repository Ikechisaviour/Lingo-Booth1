/**
 * Korean Hangul onboarding data.
 *
 * Hangul lives outside the regular planner — it's a one-time onboarding flow
 * gated before A1 grammar patterns, but always reachable later via a refresher
 * link. Lessons here are GROUPS (consonants_plain, vowels_basic, …); each
 * group is a single screen the learner steps through. Progress on the User
 * document tracks completed groups; the gate consults `onboardingCompletedAt`.
 *
 * Each jamo carries:
 *   - jamo:        the letter (e.g. ㄱ)
 *   - romanization Revised Romanization
 *   - sound:       short prose description of the sound
 *   - examples:    real Korean words that use it, with native gloss
 *   - tips:        pronunciation tip / mouth shape / common pitfalls
 */

const GROUPS = [
  // ─── Group 1 — Basic vowels ────────────────────────────────────────────
  {
    id: 'vowels_basic',
    order: 1,
    title: 'Basic vowels',
    titleKo: '기본 모음',
    subtitle: 'The 10 single-stroke vowels. Every Korean syllable contains one. Tap to hear, then copy the sound.',
    kind: 'vowels',
    estimatedMinutes: 6,
    jamo: [
      { jamo: 'ㅏ', romanization: 'a',  sound: 'as in 아빠 (appa) — bright, open',
        examples: [{ word: '아빠', romanization: 'appa',  native: 'dad' },      { word: '사과', romanization: 'sagwa',  native: 'apple' }],
        tips: 'Open your mouth wide and relaxed.' },
      { jamo: 'ㅓ', romanization: 'eo', sound: 'as in 어머니 (eomeoni) — flat, between English "uh" and "aw"',
        examples: [{ word: '어머니', romanization: 'eomeoni', native: 'mother' }, { word: '어디', romanization: 'eodi', native: 'where' }],
        tips: 'Mouth slightly less open than ㅏ. Do not round your lips.' },
      { jamo: 'ㅗ', romanization: 'o',  sound: 'as in 오빠 (oppa) — rounded lips',
        examples: [{ word: '오빠', romanization: 'oppa',  native: 'older brother (of a female)' }, { word: '오늘', romanization: 'oneul', native: 'today' }],
        tips: 'Round your lips into a small circle.' },
      { jamo: 'ㅜ', romanization: 'u',  sound: 'as in 우유 (uyu) — tight, rounded',
        examples: [{ word: '우유', romanization: 'uyu',   native: 'milk' },     { word: '누나', romanization: 'nuna', native: 'older sister (of a male)' }],
        tips: 'Round your lips tighter than ㅗ and pull them forward.' },
      { jamo: 'ㅡ', romanization: 'eu', sound: 'as in 음악 (eumak) — flat smile, no English equivalent',
        examples: [{ word: '음악', romanization: 'eumak', native: 'music' },    { word: '으레', romanization: 'eure',  native: 'as usual' }],
        tips: 'Pull your lips into a flat smile. The most "alien" sound for English speakers.' },
      { jamo: 'ㅣ', romanization: 'i',  sound: 'as in 이름 (ireum) — bright "ee"',
        examples: [{ word: '이름', romanization: 'ireum', native: 'name' },     { word: '비', romanization: 'bi', native: 'rain' }],
        tips: 'Like English "ee" but shorter.' },
      { jamo: 'ㅐ', romanization: 'ae', sound: 'as in 내 (nae) — open "eh"',
        examples: [{ word: '내', romanization: 'nae',   native: 'my' },         { word: '개', romanization: 'gae', native: 'dog' }],
        tips: 'ㅏ + ㅣ stacked. In modern Seoul Korean, nearly identical to ㅔ.' },
      { jamo: 'ㅔ', romanization: 'e',  sound: 'as in 네 (ne) — slightly closer "eh"',
        examples: [{ word: '네', romanization: 'ne',    native: 'yes' },        { word: '베개', romanization: 'begae', native: 'pillow' }],
        tips: 'Slightly closer mouth than ㅐ. Most speakers merge them — context disambiguates.' },
    ],
  },

  // ─── Group 2 — Y-vowels (iotized) ──────────────────────────────────────
  {
    id: 'vowels_y',
    order: 2,
    title: 'Y-vowels',
    titleKo: '이중 모음 · y',
    subtitle: 'Each basic vowel with an added /y/ glide — written as a doubled stroke.',
    kind: 'vowels',
    estimatedMinutes: 5,
    jamo: [
      { jamo: 'ㅑ', romanization: 'ya',  sound: 'as in 야구 (yagu)',
        examples: [{ word: '야구', romanization: 'yagu',  native: 'baseball' },     { word: '얘기', romanization: 'yaegi', native: 'story / chat' }],
        tips: 'ㅏ + y-glide.' },
      { jamo: 'ㅕ', romanization: 'yeo', sound: 'as in 여자 (yeoja)',
        examples: [{ word: '여자', romanization: 'yeoja', native: 'woman' },        { word: '여행', romanization: 'yeohaeng', native: 'travel' }],
        tips: 'ㅓ + y-glide.' },
      { jamo: 'ㅛ', romanization: 'yo',  sound: 'as in 요리 (yori)',
        examples: [{ word: '요리', romanization: 'yori',  native: 'cooking' },      { word: '교실', romanization: 'gyosil', native: 'classroom' }],
        tips: 'ㅗ + y-glide.' },
      { jamo: 'ㅠ', romanization: 'yu',  sound: 'as in 유리 (yuri)',
        examples: [{ word: '유리', romanization: 'yuri',  native: 'glass' },        { word: '뉴스', romanization: 'nyuseu', native: 'news' }],
        tips: 'ㅜ + y-glide.' },
      { jamo: 'ㅒ', romanization: 'yae', sound: 'as in 얘 (yae) — rare in modern Korean',
        examples: [{ word: '얘', romanization: 'yae',     native: 'this kid' }],
        tips: 'Rare in modern Korean. Often merges with ㅖ.' },
      { jamo: 'ㅖ', romanization: 'ye',  sound: 'as in 예 (ye)',
        examples: [{ word: '예', romanization: 'ye',      native: 'yes (formal)' }, { word: '시계', romanization: 'sigye', native: 'clock' }],
        tips: 'Common in greetings and formal speech.' },
    ],
  },

  // ─── Group 3 — W-vowels ───────────────────────────────────────────────
  {
    id: 'vowels_w',
    order: 3,
    title: 'W-vowels & ㅢ',
    titleKo: '이중 모음 · w',
    subtitle: 'Compound vowels built from two basic vowels stacked side-by-side.',
    kind: 'vowels',
    estimatedMinutes: 6,
    jamo: [
      { jamo: 'ㅘ', romanization: 'wa',  sound: 'as in 사과 (sagwa)',
        examples: [{ word: '사과', romanization: 'sagwa', native: 'apple' },        { word: '와요', romanization: 'wayo', native: '(I) come' }],
        tips: 'ㅗ + ㅏ.' },
      { jamo: 'ㅝ', romanization: 'wo',  sound: 'as in 뭐 (mwo)',
        examples: [{ word: '뭐', romanization: 'mwo',     native: 'what' },         { word: '워요', romanization: 'woyo', native: '(it) is hard' }],
        tips: 'ㅜ + ㅓ.' },
      { jamo: 'ㅙ', romanization: 'wae', sound: 'as in 왜 (wae) — rare',
        examples: [{ word: '왜', romanization: 'wae',     native: 'why' }],
        tips: 'ㅗ + ㅐ. Often merges with ㅞ and ㅚ in modern speech — all three sound roughly "we".' },
      { jamo: 'ㅞ', romanization: 'we',  sound: 'as in 웨딩 (weding)',
        examples: [{ word: '웨딩', romanization: 'weding', native: 'wedding' }],
        tips: 'ㅜ + ㅔ.' },
      { jamo: 'ㅚ', romanization: 'oe',  sound: 'as in 회사 (hoesa) — sounds like "we" in modern speech',
        examples: [{ word: '회사', romanization: 'hoesa',  native: 'company' },     { word: '외국', romanization: 'oeguk', native: 'foreign country' }],
        tips: 'ㅗ + ㅣ. In modern Seoul speech, indistinguishable from ㅞ for most learners.' },
      { jamo: 'ㅟ', romanization: 'wi',  sound: 'as in 위 (wi)',
        examples: [{ word: '위', romanization: 'wi',      native: 'up / above' },   { word: '귀', romanization: 'gwi', native: 'ear' }],
        tips: 'ㅜ + ㅣ.' },
      { jamo: 'ㅢ', romanization: 'ui',  sound: 'as in 의자 (uija) — shifts to /i/ or /e/ in some positions',
        examples: [{ word: '의자', romanization: 'uija',  native: 'chair' },        { word: '저의', romanization: 'jeoe', native: 'my (formal)' }],
        tips: 'Unique. Pronounced /ui/ at the start of a word, /i/ inside a word, /e/ when it means "of" (possessive marker).' },
    ],
  },

  // ─── Group 4 — Plain consonants ────────────────────────────────────────
  {
    id: 'consonants_plain',
    order: 4,
    title: 'Plain consonants',
    titleKo: '평음',
    subtitle: 'The 10 "unmarked" consonants. Soft, relaxed articulation.',
    kind: 'consonants',
    estimatedMinutes: 8,
    jamo: [
      { jamo: 'ㄱ', romanization: 'g / k', sound: 'as in 가다 (gada) / 아기 (agi) — "g" between vowels, "k" word-initial',
        examples: [{ word: '가다', romanization: 'gada', native: 'to go' },     { word: '아기', romanization: 'agi',  native: 'baby' }],
        tips: 'Shape mimics the side of the tongue against the back of the mouth.' },
      { jamo: 'ㄴ', romanization: 'n',     sound: 'as in 나 (na) — "n" as in "no"',
        examples: [{ word: '나', romanization: 'na',  native: 'I' },            { word: '눈', romanization: 'nun', native: 'eye / snow' }],
        tips: 'Shape mimics the tongue against the teeth ridge.' },
      { jamo: 'ㄷ', romanization: 'd / t', sound: 'as in 다리 (dari) — "d" between vowels, "t" word-initial',
        examples: [{ word: '다리', romanization: 'dari', native: 'leg / bridge' }, { word: '오디오', romanization: 'odio', native: 'audio' }],
        tips: 'Tip of tongue at the teeth ridge. Lighter than English "d".' },
      { jamo: 'ㄹ', romanization: 'r / l', sound: 'as in 라면 (ramyeon) — tap "r" between vowels, "l" at syllable end',
        examples: [{ word: '라면', romanization: 'ramyeon', native: 'ramen' },   { word: '서울', romanization: 'seoul', native: 'Seoul' }],
        tips: 'A flap of the tongue — like Spanish "r" in "pero", never English "r".' },
      { jamo: 'ㅁ', romanization: 'm',     sound: 'as in 물 (mul) — "m" as in "mom"',
        examples: [{ word: '물', romanization: 'mul',  native: 'water' },        { word: '엄마', romanization: 'eomma', native: 'mom' }],
        tips: 'Lips closed. Shape is a square — like a closed mouth.' },
      { jamo: 'ㅂ', romanization: 'b / p', sound: 'as in 바다 (bada) — "b" between vowels, "p" word-initial',
        examples: [{ word: '바다', romanization: 'bada', native: 'sea' },        { word: '아빠', romanization: 'appa', native: 'dad' }],
        tips: 'Lips together. Lighter than English "b".' },
      { jamo: 'ㅅ', romanization: 's',     sound: 'as in 사람 (saram) — softer than English "s"',
        examples: [{ word: '사람', romanization: 'saram', native: 'person' },    { word: '서울', romanization: 'seoul', native: 'Seoul' }],
        tips: 'Becomes "sh" before ㅣ or y-vowels: 시 → "shi".' },
      { jamo: 'ㅈ', romanization: 'j',     sound: 'as in 자다 (jada) — softer "j" like in "jeans"',
        examples: [{ word: '자다', romanization: 'jada', native: 'to sleep' },   { word: '바지', romanization: 'baji', native: 'pants' }],
        tips: 'No big lip-rounding, no big puff of air.' },
      { jamo: 'ㅎ', romanization: 'h',     sound: 'as in 하나 (hana) — "h" as in "house"',
        examples: [{ word: '하나', romanization: 'hana', native: 'one' },        { word: '학교', romanization: 'hakgyo', native: 'school' }],
        tips: 'Often very light, sometimes nearly silent between vowels.' },
      { jamo: 'ㅇ', romanization: '— / ng', sound: 'as in 아이 (ai) / 강 (gang) — silent word-initial, "ng" at end',
        examples: [{ word: '아이', romanization: 'ai',  native: 'child' },        { word: '강', romanization: 'gang', native: 'river' }],
        tips: 'Placeholder when a syllable starts with a vowel. Becomes ng-sound only as a final consonant.' },
    ],
  },

  // ─── Group 5 — Aspirated consonants ────────────────────────────────────
  {
    id: 'consonants_aspirated',
    order: 5,
    title: 'Aspirated consonants',
    titleKo: '거센소리',
    subtitle: 'Push more air. An extra horizontal stroke marks the aspiration.',
    kind: 'consonants',
    estimatedMinutes: 5,
    jamo: [
      { jamo: 'ㅋ', romanization: 'k',  sound: 'as in 커피 (keopi) — aspirated, strong puff',
        examples: [{ word: '커피', romanization: 'keopi', native: 'coffee' },     { word: '카페', romanization: 'kape', native: 'café' }],
        tips: 'Hold your hand near your mouth — you should feel air.' },
      { jamo: 'ㅌ', romanization: 't',  sound: 'as in 토요일 (toyoil) — aspirated',
        examples: [{ word: '토요일', romanization: 'toyoil', native: 'Saturday' }, { word: '티셔츠', romanization: 'tisyeocheu', native: 't-shirt' }],
        tips: 'Strong puff after the t-release.' },
      { jamo: 'ㅍ', romanization: 'p',  sound: 'as in 파리 (pari) — aspirated',
        examples: [{ word: '파리', romanization: 'pari', native: 'fly / Paris' }, { word: '커피', romanization: 'keopi', native: 'coffee' }],
        tips: 'Strong puff after the p-release. Looks like a flag with a vertical pole.' },
      { jamo: 'ㅊ', romanization: 'ch', sound: 'as in 차 (cha) — aspirated "ch"',
        examples: [{ word: '차', romanization: 'cha', native: 'car / tea' },      { word: '책', romanization: 'chaek', native: 'book' }],
        tips: 'Aspirated version of ㅈ. ㅈ + air.' },
    ],
  },

  // ─── Group 6 — Tense consonants ────────────────────────────────────────
  {
    id: 'consonants_tense',
    order: 6,
    title: 'Tense consonants',
    titleKo: '된소리',
    subtitle: 'Tighten the throat. Doubled letters with no puff of air.',
    kind: 'consonants',
    estimatedMinutes: 6,
    jamo: [
      { jamo: 'ㄲ', romanization: 'kk', sound: 'as in 꽃 (kkot) / 아까 (akka) — tight, no puff',
        examples: [{ word: '꽃', romanization: 'kkot', native: 'flower' },        { word: '아까', romanization: 'akka', native: 'a moment ago' }],
        tips: 'Like the "g" in "skill" — no puff. Throat slightly tight.' },
      { jamo: 'ㄸ', romanization: 'tt', sound: 'as in 딸 (ttal) / 또 (tto) — tight, no puff',
        examples: [{ word: '딸', romanization: 'ttal', native: 'daughter' },      { word: '또', romanization: 'tto',  native: 'again' }],
        tips: 'Like the "t" in "stop" — no puff.' },
      { jamo: 'ㅃ', romanization: 'pp', sound: 'as in 빵 (ppang) / 오빠 (oppa) — tight, no puff',
        examples: [{ word: '빵', romanization: 'ppang', native: 'bread' },        { word: '오빠', romanization: 'oppa', native: 'older brother (of a female)' }],
        tips: 'Like the "p" in "spy" — no puff.' },
      { jamo: 'ㅆ', romanization: 'ss', sound: 'as in 쌀 (ssal) — tight, sharp',
        examples: [{ word: '쌀', romanization: 'ssal', native: 'rice (raw)' },    { word: '비싸다', romanization: 'bissada', native: 'to be expensive' }],
        tips: 'Sharper, more sustained hiss than ㅅ.' },
      { jamo: 'ㅉ', romanization: 'jj', sound: 'as in 짜다 (jjada) / 진짜 (jinjja) — tight, no puff',
        examples: [{ word: '짜다', romanization: 'jjada', native: 'salty' },      { word: '진짜', romanization: 'jinjja', native: 'really' }],
        tips: 'Like a held, tight "j".' },
    ],
  },

  // ─── Group 7 — Syllable structure ──────────────────────────────────────
  {
    id: 'syllable_structure',
    order: 7,
    title: 'Syllable blocks',
    titleKo: '음절 구조',
    subtitle: 'Every Korean syllable is a block: initial + vowel, optionally plus a final.',
    kind: 'structure',
    estimatedMinutes: 7,
    structureNotes: [
      'Every syllable starts with a consonant. If the sound starts with a vowel, write ㅇ as a placeholder: 아, 이, 우.',
      'Vertical vowels (ㅏ ㅑ ㅓ ㅕ ㅣ ㅐ ㅔ) sit to the right of the initial consonant: 가, 너, 미.',
      'Horizontal vowels (ㅗ ㅛ ㅜ ㅠ ㅡ) sit below the initial consonant: 고, 무, 트.',
      'Compound vowels (ㅘ ㅝ ㅙ ㅞ ㅚ ㅟ ㅢ) wrap below + right: 과, 워, 의.',
      'An optional final consonant (batchim) sits at the bottom: 강, 밥, 책.',
      'You can have two-letter batchim too: 닭, 값, 앉다. Most of the time only one is voiced — pronunciation rules later.',
    ],
    examples: [
      { syllable: '가', breakdown: 'ㄱ (initial) + ㅏ (vowel)', sound: 'ga / ka', meaning: '"go" (verb stem)' },
      { syllable: '한', breakdown: 'ㅎ + ㅏ + ㄴ (batchim)',    sound: 'han',     meaning: '"Korean / one"' },
      { syllable: '국', breakdown: 'ㄱ + ㅜ + ㄱ (batchim)',    sound: 'guk',     meaning: '"country / soup"' },
      { syllable: '아', breakdown: 'ㅇ (placeholder) + ㅏ',     sound: 'a',       meaning: 'a / ah' },
      { syllable: '읽', breakdown: 'ㅇ + ㅣ + ㄺ (two-letter batchim)', sound: 'ik (only ㄱ voiced)', meaning: '"read" (verb stem of 읽다)' },
    ],
  },

  // ─── Group 8 — Reading practice ────────────────────────────────────────
  {
    id: 'reading_practice',
    order: 8,
    title: 'Reading practice',
    titleKo: '읽기 연습',
    subtitle: 'Real words at increasing complexity. Read each one aloud before you reveal.',
    kind: 'practice',
    estimatedMinutes: 8,
    practice: [
      // Tier 1 — open syllables (no batchim)
      { tier: 1, word: '아기',   romanization: 'agi',   gloss: 'baby' },
      { tier: 1, word: '나비',   romanization: 'nabi',  gloss: 'butterfly' },
      { tier: 1, word: '머리',   romanization: 'meori', gloss: 'head / hair' },
      { tier: 1, word: '커피',   romanization: 'keopi', gloss: 'coffee' },
      // Tier 2 — single batchim
      { tier: 2, word: '학교',   romanization: 'hakgyo',  gloss: 'school' },
      { tier: 2, word: '한국',   romanization: 'hanguk',  gloss: 'Korea' },
      { tier: 2, word: '서울',   romanization: 'seoul',   gloss: 'Seoul' },
      { tier: 2, word: '김치',   romanization: 'kimchi',  gloss: 'kimchi' },
      // Tier 3 — tense + aspirated
      { tier: 3, word: '꽃',     romanization: 'kkot',   gloss: 'flower (final ㅊ → t sound)' },
      { tier: 3, word: '빵',     romanization: 'ppang',  gloss: 'bread' },
      { tier: 3, word: '커피',   romanization: 'keopi',  gloss: 'coffee (aspirated ㅋ ㅍ)' },
      { tier: 3, word: '진짜',   romanization: 'jinjja', gloss: 'really' },
      // Tier 4 — compound vowels and y/w
      { tier: 4, word: '의자',   romanization: 'uija',  gloss: 'chair' },
      { tier: 4, word: '왜',     romanization: 'wae',   gloss: 'why' },
      { tier: 4, word: '여행',   romanization: 'yeohaeng', gloss: 'travel' },
      { tier: 4, word: '회사',   romanization: 'hoesa', gloss: 'company' },
    ],
  },
];

const GROUP_INDEX = Object.freeze(
  GROUPS.reduce((acc, g) => { acc[g.id] = g; return acc; }, {}),
);

const GROUP_IDS = Object.freeze(GROUPS.map((g) => g.id));

function getGroup(id) {
  return GROUP_INDEX[id] || null;
}

function isOnboardingComplete(progress) {
  if (!progress) return false;
  if (progress.onboardingCompletedAt) return true;
  const completed = new Set(progress.completedGroups || []);
  return GROUP_IDS.every((id) => completed.has(id));
}

module.exports = {
  GROUPS,
  GROUP_INDEX,
  GROUP_IDS,
  getGroup,
  isOnboardingComplete,
};
