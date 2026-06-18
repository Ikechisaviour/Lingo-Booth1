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
    subtitle: 'The 10 single-stroke vowels. Every Korean syllable contains one.',
    kind: 'vowels',
    estimatedMinutes: 6,
    jamo: [
      { jamo: 'ㅏ', romanization: 'a',  sound: 'as in "father"',                 examples: [{ word: '아빠', native: 'dad' },     { word: '사과', native: 'apple' }],   tips: 'Open your mouth wide and relaxed.' },
      { jamo: 'ㅓ', romanization: 'eo', sound: 'between "uh" and "aw"',          examples: [{ word: '어머니', native: 'mother' }, { word: '어디', native: 'where' }],    tips: 'Mouth slightly less open than ㅏ. Do not round your lips.' },
      { jamo: 'ㅗ', romanization: 'o',  sound: 'as in "go" — rounded lips',      examples: [{ word: '오빠', native: 'older brother' }, { word: '오늘', native: 'today' }], tips: 'Round your lips into a small circle.' },
      { jamo: 'ㅜ', romanization: 'u',  sound: 'as in "boot" — tight rounded',   examples: [{ word: '우유', native: 'milk' },    { word: '누나', native: 'older sister (of a male)' }], tips: 'Round your lips tighter than ㅗ and pull them forward.' },
      { jamo: 'ㅡ', romanization: 'eu', sound: 'flat, like a smile — no English equivalent', examples: [{ word: '으레', native: 'as usual' }, { word: '음악', native: 'music' }], tips: 'Pull your lips into a flat smile. The most "alien" sound for English speakers.' },
      { jamo: 'ㅣ', romanization: 'i',  sound: 'as in "machine"',                examples: [{ word: '이름', native: 'name' },    { word: '비', native: 'rain' }],        tips: 'Like English "ee" but shorter.' },
      { jamo: 'ㅐ', romanization: 'ae', sound: 'as in "bat"',                    examples: [{ word: '내', native: 'my' },        { word: '개', native: 'dog' }],        tips: 'ㅏ + ㅣ stacked. In modern Seoul Korean, nearly identical to ㅔ.' },
      { jamo: 'ㅔ', romanization: 'e',  sound: 'as in "bed"',                    examples: [{ word: '네', native: 'yes' },       { word: '베개', native: 'pillow' }],    tips: 'Slightly closer mouth than ㅐ. Most speakers merge them — context disambiguates.' },
    ],
  },

  // ─── Group 2 — Y-vowels (iotized) ──────────────────────────────────────
  {
    id: 'vowels_y',
    order: 2,
    title: 'Y-vowels',
    subtitle: 'Each basic vowel with an added /y/ glide — written as a doubled stroke.',
    kind: 'vowels',
    estimatedMinutes: 5,
    jamo: [
      { jamo: 'ㅑ', romanization: 'ya',  sound: '"ya" as in "yard"',          examples: [{ word: '야구', native: 'baseball' }, { word: '얘기', native: 'story / chat' }], tips: 'ㅏ + y-glide.' },
      { jamo: 'ㅕ', romanization: 'yeo', sound: '"yuh" as in "young"',         examples: [{ word: '여자', native: 'woman' },     { word: '여행', native: 'travel' }], tips: 'ㅓ + y-glide.' },
      { jamo: 'ㅛ', romanization: 'yo',  sound: '"yo" as in "yo-yo"',          examples: [{ word: '요리', native: 'cooking' },   { word: '교실', native: 'classroom' }], tips: 'ㅗ + y-glide.' },
      { jamo: 'ㅠ', romanization: 'yu',  sound: '"you"',                       examples: [{ word: '유리', native: 'glass' },     { word: '뉴스', native: 'news' }], tips: 'ㅜ + y-glide.' },
      { jamo: 'ㅒ', romanization: 'yae', sound: 'rare — like "yae" in "yeah"', examples: [{ word: '얘', native: 'this kid' }],   tips: 'Rare in modern Korean. Often merges with ㅖ.' },
      { jamo: 'ㅖ', romanization: 'ye',  sound: '"ye" as in "yes"',            examples: [{ word: '예', native: 'yes (formal)' }, { word: '시계', native: 'clock' }], tips: 'Common in greetings and formal speech.' },
    ],
  },

  // ─── Group 3 — W-vowels ───────────────────────────────────────────────
  {
    id: 'vowels_w',
    order: 3,
    title: 'W-vowels & ㅢ',
    subtitle: 'Compound vowels built from two basic vowels stacked side-by-side.',
    kind: 'vowels',
    estimatedMinutes: 6,
    jamo: [
      { jamo: 'ㅘ', romanization: 'wa',  sound: '"wa"',                        examples: [{ word: '와요', native: '(I) come' }, { word: '사과', native: 'apple' }], tips: 'ㅗ + ㅏ.' },
      { jamo: 'ㅝ', romanization: 'wo',  sound: '"wuh"',                       examples: [{ word: '워요', native: '(it) is hard' }, { word: '뭐', native: 'what' }], tips: 'ㅜ + ㅓ.' },
      { jamo: 'ㅙ', romanization: 'wae', sound: '"way" — rare',                examples: [{ word: '왜', native: 'why' }],         tips: 'ㅗ + ㅐ. Often merges with ㅞ and ㅚ in modern speech — all three sound roughly "we".' },
      { jamo: 'ㅞ', romanization: 'we',  sound: '"we"',                        examples: [{ word: '웨딩', native: 'wedding' }],   tips: 'ㅜ + ㅔ.' },
      { jamo: 'ㅚ', romanization: 'oe',  sound: '"we" — historically distinct',examples: [{ word: '외국', native: 'foreign country' }, { word: '회사', native: 'company' }], tips: 'ㅗ + ㅣ. In modern Seoul speech, indistinguishable from ㅞ for most learners.' },
      { jamo: 'ㅟ', romanization: 'wi',  sound: '"wee"',                       examples: [{ word: '위', native: 'up / above' }, { word: '귀', native: 'ear' }], tips: 'ㅜ + ㅣ.' },
      { jamo: 'ㅢ', romanization: 'ui',  sound: '"ee-uh" — special',           examples: [{ word: '의자', native: 'chair' }, { word: '저의', native: 'my (formal)' }], tips: 'Unique. Pronounced /ui/ at the start of a word, /i/ inside a word, /e/ when it means "of" (possessive marker).' },
    ],
  },

  // ─── Group 4 — Plain consonants ────────────────────────────────────────
  {
    id: 'consonants_plain',
    order: 4,
    title: 'Plain consonants',
    subtitle: 'The 10 "unmarked" consonants. Soft, relaxed articulation.',
    kind: 'consonants',
    estimatedMinutes: 8,
    jamo: [
      { jamo: 'ㄱ', romanization: 'g / k', sound: '"g" between vowels, "k" at the start of a word', examples: [{ word: '가다', native: 'to go' }, { word: '아기', native: 'baby' }], tips: 'Shape mimics the side of the tongue against the back of the mouth.' },
      { jamo: 'ㄴ', romanization: 'n',     sound: '"n" as in "no"',                                  examples: [{ word: '나', native: 'I' },     { word: '눈', native: 'eye / snow' }], tips: 'Shape mimics the tongue against the teeth ridge.' },
      { jamo: 'ㄷ', romanization: 'd / t', sound: '"d" between vowels, "t" word-initially',         examples: [{ word: '다리', native: 'leg / bridge' }, { word: '오디오', native: 'audio' }], tips: 'Tip of tongue at the teeth ridge. Lighter than English "d".' },
      { jamo: 'ㄹ', romanization: 'r / l', sound: '"r" between vowels (tap), "l" before consonants / at end of syllable', examples: [{ word: '라면', native: 'ramen' }, { word: '서울', native: 'Seoul' }], tips: 'A flap of the tongue — like Spanish "r" in "pero", never English "r".' },
      { jamo: 'ㅁ', romanization: 'm',     sound: '"m" as in "mom"',                                examples: [{ word: '물', native: 'water' },  { word: '엄마', native: 'mom' }], tips: 'Lips closed. Shape is a square — like a closed mouth.' },
      { jamo: 'ㅂ', romanization: 'b / p', sound: '"b" between vowels, "p" word-initially',         examples: [{ word: '바다', native: 'sea' },   { word: '아빠', native: 'dad' }], tips: 'Lips together. Lighter than English "b".' },
      { jamo: 'ㅅ', romanization: 's',     sound: '"s" — softer than English',                       examples: [{ word: '사람', native: 'person' }, { word: '서울', native: 'Seoul' }], tips: 'Becomes "sh" before ㅣ or y-vowels: 시 → "shi".' },
      { jamo: 'ㅈ', romanization: 'j',     sound: '"j" as in "jeans" — softer',                     examples: [{ word: '자다', native: 'to sleep' }, { word: '바지', native: 'pants' }], tips: 'No big lip-rounding, no big puff of air.' },
      { jamo: 'ㅎ', romanization: 'h',     sound: '"h" as in "house"',                              examples: [{ word: '하나', native: 'one' },     { word: '학교', native: 'school' }], tips: 'Often very light, sometimes nearly silent between vowels.' },
      { jamo: 'ㅇ', romanization: '— / ng', sound: 'silent at start of syllable, "ng" at end',       examples: [{ word: '아이', native: 'child' },   { word: '강', native: 'river' }], tips: 'Placeholder when a syllable starts with a vowel. Becomes ng-sound only as a final consonant.' },
    ],
  },

  // ─── Group 5 — Aspirated consonants ────────────────────────────────────
  {
    id: 'consonants_aspirated',
    order: 5,
    title: 'Aspirated consonants',
    subtitle: 'Push more air. An extra horizontal stroke marks the aspiration.',
    kind: 'consonants',
    estimatedMinutes: 5,
    jamo: [
      { jamo: 'ㅋ', romanization: 'k',  sound: 'aspirated "k" — strong puff',  examples: [{ word: '커피', native: 'coffee' }, { word: '카페', native: 'café' }], tips: 'Hold your hand near your mouth — you should feel air.' },
      { jamo: 'ㅌ', romanization: 't',  sound: 'aspirated "t"',                examples: [{ word: '토요일', native: 'Saturday' }, { word: '티셔츠', native: 't-shirt' }], tips: 'Strong puff after the t-release.' },
      { jamo: 'ㅍ', romanization: 'p',  sound: 'aspirated "p"',                examples: [{ word: '파리', native: 'fly / Paris' }, { word: '커피', native: 'coffee' }], tips: 'Strong puff after the p-release. Looks like a flag with a vertical pole.' },
      { jamo: 'ㅊ', romanization: 'ch', sound: 'aspirated "ch" as in "church"', examples: [{ word: '차', native: 'car / tea' },     { word: '책', native: 'book' }], tips: 'Aspirated version of ㅈ. ㅈ + air.' },
    ],
  },

  // ─── Group 6 — Tense consonants ────────────────────────────────────────
  {
    id: 'consonants_tense',
    order: 6,
    title: 'Tense consonants',
    subtitle: 'Tighten the throat. Doubled letters with no puff of air.',
    kind: 'consonants',
    estimatedMinutes: 6,
    jamo: [
      { jamo: 'ㄲ', romanization: 'kk', sound: 'tense ㄱ — tight, no air',  examples: [{ word: '꽃', native: 'flower' },     { word: '아까', native: 'a moment ago' }], tips: 'Like the "g" in "skill" — no puff. Throat slightly tight.' },
      { jamo: 'ㄸ', romanization: 'tt', sound: 'tense ㄷ — tight, no air',  examples: [{ word: '딸', native: 'daughter' },   { word: '또', native: 'again' }],          tips: 'Like the "t" in "stop" — no puff.' },
      { jamo: 'ㅃ', romanization: 'pp', sound: 'tense ㅂ — tight, no air',  examples: [{ word: '빵', native: 'bread' },      { word: '오빠', native: 'older brother (of a female)' }], tips: 'Like the "p" in "spy" — no puff.' },
      { jamo: 'ㅆ', romanization: 'ss', sound: 'tense ㅅ — tight, sharp',   examples: [{ word: '쌀', native: 'rice (raw)' },{ word: '비싸다', native: 'to be expensive' }], tips: 'Sharper, more sustained hiss than ㅅ.' },
      { jamo: 'ㅉ', romanization: 'jj', sound: 'tense ㅈ — tight, no air',  examples: [{ word: '짜다', native: 'salty' },     { word: '진짜', native: 'really' }],       tips: 'Like a held, tight "j".' },
    ],
  },

  // ─── Group 7 — Syllable structure ──────────────────────────────────────
  {
    id: 'syllable_structure',
    order: 7,
    title: 'Syllable blocks',
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
