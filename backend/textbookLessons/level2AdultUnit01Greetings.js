// Level 2 Track-Adult Unit 1 — 안녕하세요? (Workplace greetings)
// Source: Book 2A·1. Adult / migrant-worker register: formal -ㅂ/습니다 default.

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
  vocabulary: 'l2au1-vocabulary',
  grammar: 'l2au1-grammar',
  speaking: 'l2au1-speaking',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Workplace greetings and titles',
    goals: ['Use 안녕하십니까, 처음 뵙겠습니다.', 'Address people by job title and 님.'],
    task: 'Greet your supervisor and a coworker.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'Formal -ㅂ/습니다 + 입니다 + 안 + 못',
    goals: ['Default to formal -ㅂ/습니다 forms in workplace settings.', 'Negate appropriately.'],
    task: 'Introduce yourself in formal speech with three sentences.' },
  { id: ACT.speaking, section: 'Speaking', title: 'First day at work',
    goals: ['Open and close a workplace conversation.'],
    task: 'Roleplay your first morning at a new factory job.' },
];

const lesson = {
  title: '레벨 2 (직장) · 1과: 안녕하세요? (Workplace Greetings)',
  category: 'business', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'workplace-greeting', label: 'Greeting at the workplace', goal: 'Open the workday with formal greetings to supervisors and coworkers.' },
    { id: 'self-introduction-formal', label: 'Formal self-introduction', goal: 'Introduce yourself with name, country, and role using -ㅂ/습니다.' },
  ],
  relatedPools: ['topic-society'],
  content: [
    createContentItem('안녕하십니까', 'annyeonghasimnikka', 'Hello (formal)', 'word', '안녕하십니까. 김민수입니다.', 'Hello. I am Kim Minsu.', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('처음 뵙겠습니다', 'cheoeum boepgetseumnida', 'How do you do (formal first meeting)', 'word', '처음 뵙겠습니다. 잘 부탁드립니다.', 'How do you do. I look forward to working with you.', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('잘 부탁드립니다', 'jal butakdeurimnida', 'I look forward to working with you', 'word', '잘 부탁드립니다.', 'I look forward to your guidance.', null, [ACT.vocabulary]),
    createContentItem('수고하십니다', 'sugohasimnida', 'Thank you for your hard work (greeting coworker)', 'word', '수고하십니다. 먼저 가 보겠습니다.', 'Thanks for your work. I will be on my way.', null, [ACT.vocabulary]),
    createContentItem('사장님', 'sajangnim', 'CEO / boss (honorific)', 'word', '사장님께 인사드렸어요.', 'I greeted the boss.', null, [ACT.vocabulary]),
    createContentItem('과장님', 'gwajangnim', 'section chief (honorific)', 'word', '과장님은 회의 중이세요.', 'The section chief is in a meeting.', null, [ACT.vocabulary]),
    createContentItem('동료', 'dongnyo', 'coworker / colleague', 'word', '제 동료는 한국어를 잘해요.', 'My coworker speaks Korean well.', null, [ACT.vocabulary]),
    createContentItem('직원', 'jigwon', 'employee', 'word', '저는 신입 직원입니다.', 'I am a new employee.', null, [ACT.vocabulary]),
    createContentItem('회사', 'hoesa', 'company', 'word', '저희 회사는 구미에 있습니다.', 'Our company is in Gumi.', null, [ACT.vocabulary]),
    createContentItem('공장', 'gongjang', 'factory', 'word', '공장에서 일합니다.', 'I work at a factory.', null, [ACT.vocabulary]),
    createContentItem('출근하다', 'chulgeunhada', 'to go to work / clock in', 'word', '8시에 출근합니다.', 'I clock in at 8.', null, [ACT.vocabulary]),
    createContentItem('퇴근하다', 'toegeunhada', 'to leave work / clock out', 'word', '6시에 퇴근합니다.', 'I clock out at 6.', null, [ACT.vocabulary]),

    createContentItem(
      '안녕하십니까. 신입 직원 김민수입니다.', 'annyeonghasimnikka. sinip jigwon gimminsuimnida.',
      'Hello. I am Kim Minsu, a new employee.', 'sentence',
      '안녕하십니까. 신입 직원 김민수입니다. 잘 부탁드립니다.',
      'Hello. I am Kim Minsu, a new employee. I look forward to working with you.',
      [
        { korean: '신입 직원', english: 'new employee' },
        { korean: '~입니다', english: 'is (formal)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '저는 필리핀에서 왔습니다.', 'jeoneun pillipineseo wassemnida.',
      'I came from the Philippines.', 'sentence',
      '저는 필리핀에서 왔습니다. 한국에 온 지 6개월 됐습니다.',
      'I came from the Philippines. I have been in Korea for 6 months.',
      [
        { korean: '~에서 왔습니다', english: 'came from ~ (formal)' },
        { korean: '한국에 온 지', english: 'since coming to Korea' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '한국어를 아직 잘 못합니다.', 'hangugeoreul ajik jal motamnida.',
      'I still cannot speak Korean well.', 'sentence',
      '한국어를 아직 잘 못합니다. 천천히 말씀해 주세요.',
      'I still cannot speak Korean well. Please speak slowly.',
      [
        { korean: '아직 잘 못합니다', english: 'cannot do well yet (formal 못 + 합니다)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '첫 출근', 'cheot chulgeun',
      'First day at work', 'conversation',
      'A (과장님): 안녕하십니까. 처음 뵙겠습니다.\nB (신입): 안녕하십니까. 신입 직원 김민수입니다. 필리핀에서 왔습니다.\nA: 반갑습니다. 한국어는 어떻습니까?\nB: 아직 잘 못합니다. 천천히 말씀해 주시면 감사하겠습니다.\nA: 알겠습니다. 모르는 게 있으면 언제든지 물어보세요.\nB: 네. 감사합니다. 잘 부탁드립니다.',
      'A (section chief): Hello. How do you do.\nB (new employee): Hello. I am Kim Minsu, a new employee. I came from the Philippines.\nA: Nice to meet you. How is your Korean?\nB: I cannot speak well yet. I would appreciate it if you could speak slowly.\nA: Understood. Ask anytime if there is something you do not know.\nB: Yes. Thank you. I look forward to working with you.',
      [
        { korean: '~으면 감사하겠습니다', english: 'I would appreciate it if ~' },
        { korean: '언제든지', english: 'anytime' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
