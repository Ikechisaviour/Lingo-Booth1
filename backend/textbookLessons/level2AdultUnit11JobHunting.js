// Level 2 Track-Adult Unit 11 — 새 일자리를 찾고 있습니다 (Job hunting)
// Source: Book 2A·11. Functions: looking for jobs, interviews, signing contracts.

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
  vocabulary: 'l2au11-vocabulary',
  grammar: 'l2au11-grammar',
  speaking: 'l2au11-speaking',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Job-hunting words',
    goals: ['Use 이력서, 면접, 자기소개서, 합격, 불합격.'],
    task: 'Outline your job-hunting steps in three sentences.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'V-(으)ㄴ 경험 + V-(으)려고 하다 + N에 지원하다',
    goals: ['Talk about experience.', 'Express intention with V-(으)려고 하다.', 'Apply to: N에 지원하다.'],
    task: 'Use V-(으)려고 하다 to state what kind of job you intend to apply for.' },
  { id: ACT.speaking, section: 'Speaking', title: 'A job interview',
    goals: ['Introduce yourself in an interview setting.', 'Answer common interview questions.'],
    task: 'Roleplay a 5-minute interview for a factory shift-leader role.' },
];

const lesson = {
  title: '레벨 2 (직장) · 11과: 새 일자리를 찾고 있습니다 (Job Hunting)',
  category: 'career', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'stating-job-intent', label: 'Stating job-search intent', goal: 'Use V-(으)려고 하다 + 일자리를 찾다 to state what you intend to look for.' },
    { id: 'interview-self-intro', label: 'Self-introduction at an interview', goal: 'Give a 30-second self-introduction including name, country, experience, and aspiration.' },
  ],
  relatedPools: ['topic-society', 'topic-people'],
  content: [
    createContentItem('일자리', 'iljari', 'job opening', 'word', '새 일자리를 찾고 있습니다.', 'I am looking for a new job.', null, [ACT.vocabulary]),
    createContentItem('이력서', 'iryeokseo', 'résumé / CV', 'word', '이력서를 보내십시오.', 'Please send a resume.', null, [ACT.vocabulary]),
    createContentItem('자기소개서', 'jagisogaeseo', 'cover letter / personal statement', 'word', '자기소개서를 썼습니다.', 'I wrote a cover letter.', null, [ACT.vocabulary]),
    createContentItem('면접', 'myeonjeop', 'interview', 'word', '내일 면접이 있습니다.', 'I have an interview tomorrow.', null, [ACT.vocabulary]),
    createContentItem('합격', 'hapgyeok', 'passing / acceptance', 'word', '합격을 축하합니다.', 'Congratulations on passing.', null, [ACT.vocabulary]),
    createContentItem('불합격', 'bulhapgyeok', 'failure / rejection', 'word', '불합격해서 아쉽습니다.', 'I am disappointed I did not get accepted.', null, [ACT.vocabulary]),
    createContentItem('지원하다', 'jiwonhada', 'to apply', 'word', '여러 회사에 지원했습니다.', 'I applied to several companies.', null, [ACT.vocabulary]),
    createContentItem('경력', 'gyeongnyeok', 'work experience / career history', 'word', '경력이 3년 있습니다.', 'I have 3 years of experience.', null, [ACT.vocabulary]),
    createContentItem('자격증', 'jagyeokjeung', 'certification / license', 'word', '자격증이 있습니다.', 'I have a certification.', null, [ACT.vocabulary]),
    createContentItem('급여', 'geupyeo', 'salary', 'word', '급여 조건은 어떻습니까?', 'What are the salary conditions?', null, [ACT.vocabulary]),
    createContentItem('계약', 'gyeyak', 'contract', 'word', '오늘 계약을 맺습니다.', 'I am signing the contract today.', null, [ACT.vocabulary]),
    createContentItem('근로계약서', 'geullogyeyakseo', 'employment contract', 'word', '근로계약서를 잘 읽으십시오.', 'Read the employment contract carefully.', null, [ACT.vocabulary]),

    createContentItem(
      '저는 새 일자리에 지원하려고 합니다.', 'jeoneun sae iljarie jiwonharyeogo hamnida.',
      'I intend to apply for a new job.', 'sentence',
      '저는 새 일자리에 지원하려고 합니다. 이력서를 준비하고 있습니다.',
      'I intend to apply for a new job. I am preparing my résumé.',
      [
        { korean: 'V-(으)려고 하다', english: 'intend to ~' },
        { korean: 'N에 지원하다', english: 'to apply to N' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '한국 회사에서 일한 경험이 있습니다.', 'hanguk hoesaeseo ilhan gyeongheomi itseumnida.',
      'I have experience working at a Korean company.', 'sentence',
      '한국 회사에서 일한 경험이 있습니다. 3년 정도입니다.',
      'I have experience working at a Korean company. About 3 years.',
      [
        { korean: 'V-(으)ㄴ 경험이 있다', english: 'have experience of ~' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '면접 날짜가 언제로 정해졌습니까?', 'myeonjeop naljjaga eonjero jeonghaejyeotseumnikka?',
      'When has the interview date been set for?', 'sentence',
      '면접 날짜가 언제로 정해졌습니까? — 다음 주 화요일입니다.',
      'When has the interview date been set for? — Next Tuesday.',
      [
        { korean: '~로 정해졌다', english: 'has been set for ~' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '간단한 면접', 'gandanhan myeonjeop',
      'A simple interview', 'conversation',
      'A (면접관): 안녕하십니까. 자기소개를 부탁드립니다.\nB (지원자): 안녕하십니까. 사라라고 합니다. 필리핀에서 왔고 한국에 온 지 2년이 되었습니다. 식품 공장에서 일한 경험이 있습니다.\nA: 우리 회사에 지원하신 이유를 말씀해 주십시오.\nB: 더 큰 회사에서 책임감 있게 일해 보고 싶어서 지원했습니다. 또 한국어 실력도 더 키우려고 합니다.\nA: 좋습니다. 야간 근무가 가능하십니까?\nB: 네, 가능합니다.\nA: 알겠습니다. 결과는 일주일 안에 알려 드리겠습니다.',
      'A (interviewer): Hello. Please introduce yourself.\nB (applicant): Hello. My name is Sarah. I am from the Philippines and I have been in Korea for 2 years. I have experience at a food factory.\nA: Tell me why you applied to our company.\nB: I want to work with responsibility at a larger company. I also intend to develop my Korean further.\nA: Good. Are night shifts okay?\nB: Yes, they are.\nA: Understood. We will let you know the result within a week.',
      [
        { korean: '면접관 / 지원자', english: 'interviewer / applicant' },
        { korean: '책임감 있게', english: 'responsibly / with responsibility' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
