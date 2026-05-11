// Level 3 Cluster — Position, Endings/Register, Word Builders, Irregulars
// Combines TTMIK Workbook Lessons 3 (position), 16/25/27/28 (endings),
// 23/30 (Hanja word builders), and 11/24/26/29 (irregulars).
// One bundled cluster so the AI tutor can teach related forms together.

const createContentItem = (
  korean, romanization, english, type = 'word',
  example = '', exampleEnglish = '', breakdown = null, activityIds = [],
) => ({
  type, activityIds,
  targetText: korean, romanization, nativeText: english, pronunciation: romanization,
  exampleTarget: example || korean, exampleNative: exampleEnglish || english,
  korean, english, example: example || korean, exampleEnglish: exampleEnglish || english,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.korean, native: b.english, korean: b.korean, english: b.english })) } : {}),
});

const ACT = {
  position: 'l3c6-position',
  endings: 'l3c6-endings',
  hanja: 'l3c6-hanja',
  irregulars: 'l3c6-irregulars',
};

const activities = [
  { id: ACT.position, section: 'Position & Direction', title: '앞·뒤·옆·위·밑에',
    goals: ['Recognize the five basic Korean position words.'],
    task: 'Place an item in three different relative positions.' },
  { id: ACT.endings, section: 'Endings & Register', title: '청유형 / -네요 / 반말 vs 존댓말 / -자',
    goals: ['Use 청유형 -아/어/여요 (let\'s).', 'Use -네요 (mild surprise / observation).', 'Switch between 반말 and 존댓말.', 'Use -자 for casual "let\'s".'],
    task: 'Convert one polite suggestion into 반말 -자.' },
  { id: ACT.hanja, section: 'Word Builders', title: '학(學) and 실(室)',
    goals: ['Recognize 학(學) in 학교, 학생, 학습.', 'Recognize 실(室) in 교실, 사무실, 거실.'],
    task: 'Pick three words containing 학 or 실 and decode them.' },
  { id: ACT.irregulars, section: 'Irregulars', title: 'ㅂ / 르 / ㄷ / ㅅ irregular verbs',
    goals: ['Apply each irregular conjugation correctly.'],
    task: 'Conjugate one verb of each irregular type into present polite form.' },
];

const lesson = {
  title: 'Level 3 · Position, Endings, Word Builders, Irregulars (combined cluster)',
  category: 'daily-life', difficulty: 'advanced',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'switching-register', label: 'Switching register', goal: 'Convert a 존댓말 sentence to 반말 and back.' },
    { id: 'decoding-hanja', label: 'Decoding a Hanja morpheme', goal: 'Spot 학 or 실 inside a longer word and explain its meaning.' },
  ],
  relatedPools: ['pos-prefix-suffix', 'pos-hanja-phrases'],
  content: [
    // Position
    createContentItem('앞에', 'ape', 'in front of', 'word', '학교 앞에 카페가 있어요.', 'There is a cafe in front of the school.', null, [ACT.position]),
    createContentItem('뒤에', 'dwie', 'behind', 'word', '집 뒤에 산이 있어요.', 'There is a mountain behind the house.', null, [ACT.position]),
    createContentItem('옆에', 'yeope', 'next to', 'word', '도서관 옆에 카페가 있어요.', 'There is a cafe next to the library.', null, [ACT.position]),
    createContentItem('위에', 'wie', 'on top of', 'word', '책상 위에 책이 있어요.', 'There is a book on the desk.', null, [ACT.position]),
    createContentItem('밑에', 'mite', 'under', 'word', '의자 밑에 가방이 있어요.', 'There is a bag under the chair.', null, [ACT.position]),

    // Endings & Register
    createContentItem(
      '같이 점심 먹어요!', 'gachi jeomsim meogeoyo!',
      'Let us eat lunch together! (청유형 -아/어/여요)', 'sentence',
      '같이 점심 먹어요! 학생 식당이 어때요?',
      'Let us eat lunch together! How about the student cafeteria?',
      [{ korean: '청유형 -아/어/여요', english: 'let us ~' }],
      [ACT.endings],
    ),
    createContentItem(
      '비가 오네요!', 'biga oneyo!',
      'Oh, it is raining! (-네요 = mild observation)', 'sentence',
      '와, 비가 오네요! 우산 가져왔어요?',
      'Wow, it is raining! Did you bring an umbrella?',
      [{ korean: '-네요', english: 'mild surprise / observation' }],
      [ACT.endings],
    ),
    createContentItem(
      '같이 가자!', 'gachi gaja!',
      'Let us go together! (반말 -자)', 'sentence',
      '같이 가자! 5분만 기다려.',
      'Let us go together! Just wait 5 minutes.',
      [{ korean: '-자', english: 'let us ~ (casual / 반말)' }],
      [ACT.endings],
    ),

    // Word Builders
    createContentItem('학(學)', 'hak', 'study / learning (Hanja)', 'word', '학교, 학생, 학습', 'school, student, study', null, [ACT.hanja]),
    createContentItem('실(室)', 'sil', 'room (Hanja)', 'word', '교실, 사무실, 거실', 'classroom, office, living room', null, [ACT.hanja]),
    createContentItem('학교', 'hakgyo', 'school (學 + 校)', 'word', '학교에 가요.', 'I go to school.', null, [ACT.hanja]),
    createContentItem('교실', 'gyosil', 'classroom (敎 + 室)', 'word', '교실에 학생들이 있어요.', 'There are students in the classroom.', null, [ACT.hanja]),

    // Irregulars
    createContentItem(
      'ㅂ irregular: 덥다 → 더워요', 'beop irregular: deopda → deowoyo',
      'Verbs ending in ㅂ: ㅂ → 우 before vowel (덥다 → 더워요).', 'sentence',
      '오늘 정말 더워요. (덥다 + -아요 → 더워요)',
      'It is really hot today. (덥다 + -아요 → 더워요)',
      [{ korean: '덥다 → 더워요', english: '"to be hot" → "is hot" (polite)' }],
      [ACT.irregulars],
    ),
    createContentItem(
      '르 irregular: 모르다 → 몰라요', 'reu irregular: moreuda → mollayo',
      'Verbs ending in 르: ㄹㄹ insert before vowel (모르다 → 몰라요).', 'sentence',
      '죄송해요, 잘 몰라요. (모르다 + -아요 → 몰라요)',
      'Sorry, I do not really know. (모르다 + -아요 → 몰라요)',
      [{ korean: '모르다 → 몰라요', english: '"to not know" → "do not know"' }],
      [ACT.irregulars],
    ),
    createContentItem(
      'ㄷ irregular: 듣다 → 들어요', 'd irregular: deutda → deureoyo',
      'Verbs ending in ㄷ: ㄷ → ㄹ before vowel (듣다 → 들어요).', 'sentence',
      '저는 매일 음악을 들어요. (듣다 + -어요 → 들어요)',
      'I listen to music every day. (듣다 + -어요 → 들어요)',
      [{ korean: '듣다 → 들어요', english: '"to listen" → "listen" (polite)' }],
      [ACT.irregulars],
    ),
    createContentItem(
      'ㅅ irregular: 짓다 → 지어요', 's irregular: jitda → jieoyo',
      'Verbs ending in ㅅ: ㅅ drops before vowel (짓다 → 지어요).', 'sentence',
      '시를 지어요. (짓다 + -어요 → 지어요)',
      'I compose a poem. (짓다 + -어요 → 지어요)',
      [{ korean: '짓다 → 지어요', english: '"to compose / build" → "compose / build"' }],
      [ACT.irregulars],
    ),
  ],
};

module.exports = lesson;
