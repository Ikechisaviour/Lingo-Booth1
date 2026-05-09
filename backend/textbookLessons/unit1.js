// 1과: 적성과 진로 (Unit 1: Aptitude and Career)
// Intermediate Korean. Draft content matching the textbook scope:
//   Vocabulary: 능력 abilities, 적성 aptitudes, ~적 suffix
//   Grammar:    A-다면서(요)?, V-ㄴ/는다면서(요)?
//               V-다 보면
//               N은/는 A-다는 것이다[점이다], N은/는 V-ㄴ/는다는 것이다[점이다]
//               V-는 대로, N대로
//   Pronunciation: 경음화 (tensification) — 여권 [여꿘]
//   Culture:    Colleges and majors in Korea

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

// Activity IDs are stable, snake-case slugs that survive title edits and translation.
const ACT = {
  speaking: 'speaking-advice',
  readingSpeaking: 'reading-speaking-aptitudes',
  listeningSpeaking: 'listening-speaking-counseling',
  readingWriting: 'reading-writing-career',
  task: 'task-right-job',
  vocabulary: 'vocabulary-core',
  grammar: 'grammar-expression',
  pronunciation: 'pronunciation-glottalization',
  culture: 'culture-colleges-majors',
};

const activities = [
  {
    id: ACT.speaking,
    section: 'Speaking',
    title: 'Giving advice',
    goals: ['Give advice about aptitude, majors, and career choices.'],
    task: 'Give one short piece of advice to a classmate choosing a major or career.',
  },
  {
    id: ACT.readingSpeaking,
    section: 'Reading and Speaking',
    title: 'Aptitudes and strengths',
    goals: ["Read introductions about people's aptitudes.", 'Introduce your own strengths.'],
    task: 'Introduce one strength and say what kind of career it may fit.',
  },
  {
    id: ACT.listeningSpeaking,
    section: 'Listening and Speaking',
    title: 'Counseling and university-life advice',
    goals: [
      'Listen to counseling conversations about selecting a major.',
      'Listen to advice about school life.',
      'Ask for advice about university life.',
    ],
    task: 'Ask the tutor for advice about a university-life or major-choice problem.',
  },
  {
    id: ACT.readingWriting,
    section: 'Reading and Writing',
    title: 'Career-path advice',
    goals: ['Read internet counseling about career paths.', 'Write advice about a career path.'],
    task: 'Write two or three sentences of advice for a student choosing a career path.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: "Finding the right job for one's aptitude",
    goals: ['Match abilities and aptitudes to possible jobs.'],
    task: 'Describe your aptitude and let the tutor help you choose a suitable job.',
  },
  {
    id: ACT.vocabulary,
    section: 'Vocabulary',
    title: 'Abilities, aptitudes, and -적',
    goals: ['Practice words for abilities and aptitudes.', 'Use the -적 suffix naturally.'],
    task: 'Make one sentence with an ability or aptitude word.',
  },
  {
    id: ACT.grammar,
    section: 'Grammar and Expression',
    title: 'Key patterns',
    goals: [
      'A-다면서(요)? / V-ㄴ/는다면서(요)?',
      'V-다 보면',
      'N은/는 A-다는 것이다[점이다] / N은/는 V-ㄴ/는다는 것이다[점이다]',
      'V-는 대로 / N대로',
    ],
    task: 'Use one grammar pattern in a sentence about career, aptitude, or ability.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Glottalization: 여권',
    goals: ['Notice and practice tense-sound pronunciation in 여권.'],
    task: 'Listen to the pronunciation target and compare it with the spelling.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Colleges and majors in Korea',
    goals: ['Compare Korean college majors and career choices with your own context.'],
    task: 'Compare one Korean major or college term with your own school context.',
  },
];

const unit1 = {
  title: '1과: 적성과 진로 (Aptitude and Career)',
  category: 'career',
  difficulty: 'intermediate',
  targetLang: 'ko',
  nativeLang: 'en',
  track: 'textbook',
  activities,
  content: [
    // ── Vocabulary: aptitudes, abilities, careers ──
    createContentItem('적성', 'jeokseong', 'aptitude', 'word', '저는 적성에 맞는 일을 찾고 싶어요.', 'I want to find work that fits my aptitude.', null, [ACT.vocabulary, ACT.speaking, ACT.readingSpeaking, ACT.task]),
    createContentItem('진로', 'jinro', 'career path', 'word', '진로 상담을 받았어요.', 'I had career counseling.', null, [ACT.vocabulary, ACT.speaking, ACT.readingWriting, ACT.task]),
    createContentItem('능력', 'neungnyeok', 'ability', 'word', '제 능력을 키우고 싶어요.', 'I want to develop my ability.', null, [ACT.vocabulary, ACT.readingSpeaking, ACT.task]),
    createContentItem('전공', 'jeongong', 'major (academic)', 'word', '저는 금오공과대학교에서 컴퓨터공학을 전공해요.', 'I major in Computer Engineering at Kumoh National Institute of Technology.', null, [ACT.vocabulary, ACT.readingSpeaking, ACT.task, ACT.culture]),
    createContentItem('직업', 'jigeop', 'job / occupation', 'word', '미래의 직업을 고민하고 있어요.', 'I am thinking about my future job.', null, [ACT.vocabulary, ACT.task, ACT.culture]),
    createContentItem('조언', 'joeon', 'advice', 'word', '선배의 조언이 큰 도움이 되었어요.', "My senior's advice was a big help.", null, [ACT.vocabulary, ACT.speaking, ACT.listeningSpeaking, ACT.readingWriting]),
    createContentItem('상담', 'sangdam', 'counseling / consultation', 'word', '상담을 신청했어요.', 'I applied for counseling.', null, [ACT.vocabulary, ACT.listeningSpeaking, ACT.readingWriting]),
    createContentItem('장점', 'jangjeom', 'strength / merit', 'word', '제 장점은 꼼꼼한 거예요.', 'My strength is being meticulous.', null, [ACT.vocabulary, ACT.readingSpeaking, ACT.task]),
    createContentItem('단점', 'danjeom', 'weakness / shortcoming', 'word', '단점도 솔직하게 말해 주세요.', 'Please honestly share your weaknesses too.', null, [ACT.vocabulary, ACT.readingSpeaking]),
    createContentItem('흥미', 'heungmi', 'interest', 'word', '저는 디자인에 흥미가 있어요.', 'I have an interest in design.', null, [ACT.vocabulary, ACT.task]),
    createContentItem('분야', 'bunya', 'field / area', 'word', '어느 분야에서 일하고 싶어요?', 'In what field do you want to work?', null, [ACT.vocabulary, ACT.task]),
    createContentItem('적극적', 'jeokgeukjeok', 'active / proactive (using ~적 suffix)', 'word', '그 사람은 매우 적극적이에요.', 'That person is very proactive.', null, [ACT.vocabulary]),
    createContentItem('합리적', 'hamnijeok', 'rational (using ~적 suffix)', 'word', '합리적인 결정을 내려야 해요.', 'You should make a rational decision.', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('사회적', 'sahoejeok', 'social (using ~적 suffix)', 'word', '사회적 능력도 중요해요.', 'Social ability is also important.', null, [ACT.vocabulary, ACT.readingSpeaking]),

    // ── Grammar 1: A-다면서(요)? / V-ㄴ/는다면서(요)? — confirming hearsay ──
    createContentItem(
      '한국어 공부가 어렵다면서요?',
      'hangugeo gongbuga eoryeopdamyeonseoyo?',
      'I heard Korean studying is hard, is that right?',
      'sentence',
      '한국어 공부가 어렵다면서요? 저도 그렇게 들었어요.',
      'I heard Korean studying is hard, is that right? I heard the same.',
      [
        { korean: '한국어 공부가', english: 'studying Korean (subject)' },
        { korean: '어렵다면서요?', english: 'is hard, I heard? (A-다면서요)' },
      ],
      [ACT.grammar, ACT.listeningSpeaking],
    ),
    createContentItem(
      '그분이 의사라면서요?',
      'geubuni uisaramyeonseoyo?',
      "I heard he's a doctor, right?",
      'sentence',
      '그분이 의사라면서요? 정말 똑똑하시네요.',
      "I heard he's a doctor, right? He must be really smart.",
      [
        { korean: '그분이', english: 'that person (subject)' },
        { korean: '의사라면서요?', english: 'is a doctor, I heard? (N(이)라면서요)' },
      ],
      [ACT.grammar, ACT.listeningSpeaking],
    ),
    createContentItem(
      '내일 시험을 본다면서요?',
      'naeil siheomeul bondamyeonseoyo?',
      "I heard you're taking an exam tomorrow?",
      'sentence',
      '내일 시험을 본다면서요? 잘 준비했어요?',
      "I heard you're taking an exam tomorrow? Did you prepare well?",
      [
        { korean: '내일 시험을', english: 'an exam tomorrow' },
        { korean: '본다면서요?', english: 'will take, I heard? (V-ㄴ/는다면서요)' },
      ],
      [ACT.grammar, ACT.listeningSpeaking],
    ),

    // ── Grammar 2: V-다 보면 — if you keep doing, you'll find ──
    createContentItem(
      '매일 연습하다 보면 잘하게 될 거예요.',
      'maeil yeonseuphada bomyeon jalhage doel geoyeyo.',
      'If you keep practicing every day, you will get good at it.',
      'sentence',
      '걱정하지 마세요. 매일 연습하다 보면 잘하게 될 거예요.',
      "Don't worry. If you keep practicing every day, you will get good at it.",
      [
        { korean: '매일 연습하다 보면', english: 'if you keep practicing daily (V-다 보면)' },
        { korean: '잘하게 될 거예요', english: 'you will get good at it' },
      ],
      [ACT.grammar, ACT.speaking, ACT.readingWriting],
    ),
    createContentItem(
      '공부하다 보면 어려워질 때도 있어요.',
      'gongbuhada bomyeon eoryeowojil ttaedo isseoyo.',
      'If you keep studying, there are times it gets harder too.',
      'sentence',
      '공부하다 보면 어려워질 때도 있어요. 그래도 포기하지 마세요.',
      'If you keep studying, there are times it gets harder too. Still, do not give up.',
      [
        { korean: '공부하다 보면', english: 'if you keep studying (V-다 보면)' },
        { korean: '어려워질 때도 있어요', english: 'there are times it becomes hard' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    // ── Grammar 3: N은/는 ... -다는 것이다 / -다는 점이다 — the (key) thing is that ──
    createContentItem(
      '제 장점은 끈기가 있다는 것입니다.',
      'je jangjeomeun kkeungiga itdaneun geosimnida.',
      'My strength is that I have persistence.',
      'sentence',
      '제 장점은 끈기가 있다는 것입니다. 끝까지 포기하지 않아요.',
      "My strength is that I have persistence. I don't give up to the end.",
      [
        { korean: '제 장점은', english: 'my strength is (topic)' },
        { korean: '끈기가 있다는 것입니다', english: 'that I have persistence (A-다는 것이다)' },
      ],
      [ACT.grammar, ACT.readingSpeaking],
    ),
    createContentItem(
      '이 회사의 문제는 직원이 부족하다는 점입니다.',
      'i hoesaui munjeneun jigwoni bujokhadaneun jeomimnida.',
      'The issue with this company is that staff is insufficient.',
      'sentence',
      '이 회사의 문제는 직원이 부족하다는 점입니다. 더 뽑아야 해요.',
      'The issue with this company is that staff is insufficient. We need to hire more.',
      [
        { korean: '이 회사의 문제는', english: "this company's issue is (topic)" },
        { korean: '직원이 부족하다는 점입니다', english: 'is that staff is insufficient (A-다는 점이다)' },
      ],
      [ACT.grammar, ACT.readingWriting],
    ),

    // ── Grammar 4: V-는 대로 / N대로 — just as / according to ──
    createContentItem(
      '계획대로 일을 진행해 주세요.',
      'gyehoekdaero ireul jinhaenghae juseyo.',
      'Please proceed with the work according to plan.',
      'sentence',
      '계획대로 일을 진행해 주세요. 시간이 부족합니다.',
      'Please proceed with the work according to plan. We are short on time.',
      [
        { korean: '계획대로', english: 'according to plan (N대로)' },
        { korean: '일을 진행해 주세요', english: 'please proceed with work' },
      ],
      [ACT.grammar, ACT.readingWriting],
    ),
    createContentItem(
      '들은 대로 말씀드릴게요.',
      'deureun daero malsseumdeurilgeyo.',
      "I'll tell you exactly as I heard it.",
      'sentence',
      '들은 대로 말씀드릴게요. 보태거나 빼지 않을게요.',
      "I'll tell you exactly as I heard it. I won't add or leave out anything.",
      [
        { korean: '들은 대로', english: 'just as I heard (V-는/은 대로)' },
        { korean: '말씀드릴게요', english: 'I will respectfully tell you' },
      ],
      [ACT.grammar, ACT.readingSpeaking],
    ),

    // ── Conversation 1: career counseling at school ──
    createContentItem(
      '어떤 일을 하고 싶어요?',
      'eotteon ireul hago sipeoyo?',
      'What kind of work do you want to do?',
      'conversation',
      'A: 어떤 일을 하고 싶어요?\nB: 사람을 도와주는 일을 하고 싶어요. 저는 금오공과대학교에서 사회복지를 부전공하고 있어요.\nA: 그러면 사회복지사 분야가 잘 맞을 것 같아요.\nB: 좋은 생각이에요. 더 알아볼게요.',
      'A: What kind of work do you want to do?\nB: I want to do work that helps people. I am taking Social Welfare as a minor at Kumoh National Institute of Technology.\nA: Then the social worker field seems like a good fit.\nB: That is a good idea. I will look into it more.',
      [
        { korean: '어떤 일을', english: 'what kind of work' },
        { korean: '사람을 도와주는 일', english: 'work that helps people' },
        { korean: '금오공과대학교', english: 'Kumoh National Institute of Technology' },
        { korean: '사회복지를 부전공하고 있어요', english: 'I am taking Social Welfare as a minor' },
        { korean: '사회복지사 분야가 잘 맞을 것 같아요', english: 'the social worker field seems like a good fit' },
      ],
      [ACT.listeningSpeaking, ACT.speaking, ACT.task],
    ),

    // ── Conversation 2: confirming hearsay + V-다 보면 advice ──
    createContentItem(
      '금오공과대학교 생활이 어렵다면서요?',
      'geumo gonggwa daehakgyo saenghwari eoryeopdamyeonseoyo?',
      'I heard life at Kumoh National Institute of Technology is hard, right?',
      'conversation',
      'A: 금오공과대학교 생활이 어렵다면서요?\nB: 처음에는 힘들었는데 지내다 보면 익숙해져요.\nA: 무슨 동아리에 들어가면 좋을까요?\nB: 적성에 맞는 동아리를 찾는 게 중요해요.',
      'A: I heard life at Kumoh National Institute of Technology is hard, right?\nB: It was tough at first, but as you keep going you get used to it.\nA: What club would be good to join?\nB: It is important to find a club that fits your aptitude.',
      [
        { korean: '금오공과대학교', english: 'Kumoh National Institute of Technology' },
        { korean: '지내다 보면', english: 'as you keep going (V-다 보면)' },
        { korean: '익숙해져요', english: 'you get used to it' },
        { korean: '적성에 맞는', english: 'fitting your aptitude' },
      ],
      [ACT.listeningSpeaking, ACT.speaking],
    ),

    // ── Conversation 3: introducing one's strengths (말하기 task) ──
    createContentItem(
      '제 장점은 책임감이 강하다는 것입니다.',
      'je jangjeomeun chaegimgami ganghadaneun geosimnida.',
      'My strength is that I have a strong sense of responsibility.',
      'conversation',
      'A: 본인의 장점을 소개해 주시겠어요?\nB: 네. 제 장점은 책임감이 강하다는 것입니다. 금오공과대학교에서도 맡은 일을 계획대로 끝까지 해냈습니다.\nA: 어떤 분야에서 일하고 싶으세요?\nB: 사회적 가치를 만드는 일을 끝까지 해내고 싶습니다.',
      'A: Could you introduce your strengths?\nB: Yes. My strength is that I have a strong sense of responsibility. Even at Kumoh National Institute of Technology, I always saw my assigned work through to the end, according to plan.\nA: In what field would you like to work?\nB: I want to see through work that creates social value, all the way to the end.',
      [
        { korean: '본인의 장점', english: "one's own strength" },
        { korean: '책임감이 강하다는 것', english: 'that responsibility is strong (A-다는 것)' },
        { korean: '계획대로', english: 'according to plan (N대로)' },
        { korean: '끝까지 해내고 싶습니다', english: 'I want to see it through to the end' },
      ],
      [ACT.readingSpeaking, ACT.speaking, ACT.task],
    ),

    // ── Pronunciation: 경음화 (tensification) — Sino-Korean compounds where the
    // second morpheme is pronounced with a tense initial. Spotlight word: 여권 [여꿘].
    // Romanization reflects the actual pronunciation, not the spelling.
    createContentItem(
      '여권',
      'yeokkwon (spelled yeogwon, pronounced [여꿘])',
      'passport — the second morpheme 권 (券) tensifies to [꿘] in this Sino-Korean compound',
      'word',
      '여권을 잃어버려서 다시 만들었어요.',
      'I lost my passport so I had a new one made.',
      [
        { korean: '여권 [여꿘]', english: 'passport — pronounced with tense ㄲ, not plain ㄱ' },
        { korean: '여 + 권 (券)', english: 'travel + certificate; the 권 morpheme triggers tensification here' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '사건',
      'sakkeon (spelled sageon, pronounced [사껀])',
      'incident / event — same Sino-Korean tensification pattern as 여권',
      'word',
      '큰 사건이 갑자기 일어났어요.',
      'A big incident happened suddenly.',
      [
        { korean: '사건 [사껀]', english: 'incident — pronounced with tense ㄲ' },
        { korean: '큰 사건', english: 'a big incident' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '출국',
      'chulkkuk (spelled chulguk, pronounced [출꾹])',
      'departure (leaving the country) — tensification after ㄹ in Sino-Korean compounds',
      'word',
      '출국 시간이 다 됐어요.',
      'It is almost time for departure.',
      [
        { korean: '출국 [출꾹]', english: 'departure — pronounced with tense ㄲ after ㄹ' },
        { korean: '시간이 다 됐어요', english: 'the time has come' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '효과',
      'hyokkwa (spelled hyogwa, pronounced [효꽈])',
      'effect / result — Sino-Korean tensification of the second morpheme',
      'word',
      '이 약은 효과가 정말 좋아요.',
      'This medicine has a really good effect.',
      [
        { korean: '효과 [효꽈]', english: 'effect — pronounced with tense ㄲ' },
        { korean: '이 약은', english: 'this medicine (topic)' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '여권 좀 보여 주시겠어요?',
      'yeokkwon jom boyeo jusigesseoyo? (the 권 is pronounced [꿘])',
      'Could you show me your passport, please?',
      'conversation',
      'A: 여권 좀 보여 주시겠어요?\nB: 네, 여기 있습니다.\nA: 출국 시간까지 30분 남았어요. 게이트로 가 주세요.\nB: 감사합니다.',
      'A: Could you show me your passport, please?\nB: Yes, here it is.\nA: There are 30 minutes left until departure. Please go to the gate.\nB: Thank you.',
      [
        { korean: '여권 [여꿘] 좀', english: 'your passport, please — note the tense pronunciation' },
        { korean: '출국 [출꾹] 시간', english: 'departure time — also tensified' },
        { korean: '게이트로', english: 'to the gate' },
      ],
      [ACT.pronunciation],
    ),

    // ── Culture Note: Colleges and majors in Korea ──
    // Korean university structure differs from the user's likely context:
    //   - Most undergraduate programs are 4 years (대학교).
    //   - 1st year is general education (교양), 2nd year onward focuses on the major.
    //   - Departments (학과) sit inside colleges (단과대학) inside the university.
    //   - Double majors (복수전공) and minors (부전공) are formal options.
    createContentItem(
      '학과',
      'hakgwa',
      'department / academic major (the unit students enroll in)',
      'word',
      '저는 컴퓨터공학과 학생이에요.',
      'I am a student in the Computer Engineering department.',
      null,
      [ACT.culture],
    ),
    createContentItem(
      '학년',
      'hangnyeon',
      'academic year — 1st through 4th year of university',
      'word',
      '저는 지금 3학년이에요.',
      'I am in my third year right now.',
      null,
      [ACT.culture],
    ),
    createContentItem(
      '단과대학',
      'dangwadaehak',
      'college (a sub-unit of a university that contains several departments)',
      'word',
      '공과대학 안에 여러 학과가 있어요.',
      'There are several departments inside the College of Engineering.',
      null,
      [ACT.culture],
    ),
    createContentItem(
      '부전공',
      'bujeongong',
      'minor — a secondary field of study, lighter than 전공',
      'word',
      '저는 경영학을 부전공으로 하고 있어요.',
      'I am taking Business Administration as a minor.',
      null,
      [ACT.culture],
    ),
    createContentItem(
      '복수전공',
      'boksujeongong',
      'double major — two full majors completed in parallel',
      'word',
      '복수전공을 신청하려면 학점이 좋아야 해요.',
      'To apply for a double major you need good grades.',
      null,
      [ACT.culture],
    ),
    createContentItem(
      '한국 대학교는 보통 4년이에요.',
      'hanguk daehakgyoneun botong sa-nyeonieyo.',
      'Korean universities are usually four years.',
      'sentence',
      '한국 대학교는 보통 4년이에요. 1학년 때는 교양 과목을 많이 들어요.',
      'Korean universities are usually four years. In the first year you take a lot of general-education classes.',
      [
        { korean: '보통 4년', english: 'usually 4 years' },
        { korean: '교양 과목', english: 'general-education / liberal-arts subjects' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '금오공과대학교는 공학 분야 4년제 대학교예요.',
      'geumo gonggwa daehakgyoneun gonghak bunya 4-nyeonje daehakgyoyeyo.',
      'Kumoh National Institute of Technology is a 4-year university focused on engineering.',
      'sentence',
      '금오공과대학교는 공학 분야 4년제 대학교예요. 그래서 공학 학과가 많아요.',
      'Kumoh National Institute of Technology is a 4-year university focused on engineering, so it has many engineering departments.',
      [
        { korean: '금오공과대학교', english: 'Kumoh National Institute of Technology' },
        { korean: '공학 분야', english: 'the engineering field' },
        { korean: '4년제', english: '4-year (system)' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '무슨 학과 다녀요?',
      'museun hakgwa danyeoyo?',
      'What department do you attend?',
      'conversation',
      'A: 무슨 학과 다녀요?\nB: 저는 금오공과대학교 컴퓨터공학과 학생이에요.\nA: 몇 학년이에요?\nB: 3학년이에요. 내년에 졸업해요.\nA: 부전공이나 복수전공도 해요?\nB: 네, 경영학을 부전공으로 하고 있어요.',
      'A: What department do you attend?\nB: I am a student in the Computer Engineering department at Kumoh National Institute of Technology.\nA: What year are you in?\nB: Third year. I graduate next year.\nA: Are you doing a minor or a double major?\nB: Yes, I am taking Business Administration as a minor.',
      [
        { korean: '무슨 학과', english: 'what department' },
        { korean: '컴퓨터공학과', english: 'Computer Engineering department' },
        { korean: '몇 학년', english: 'what year (of study)' },
        { korean: '내년에 졸업해요', english: 'I graduate next year' },
        { korean: '부전공', english: 'minor' },
      ],
      [ACT.culture],
    ),

    // ── Reading passage: self-introduction about strengths and aptitude ──
    // For the Reading and Speaking activity. A short first-person paragraph
    // the AI tutor can read aloud, then ask the learner to summarize or
    // produce their own parallel introduction.
    createContentItem(
      '저는 사람을 잘 도와주는 편이에요. 그래서 제 적성은 사회복지사나 상담사와 잘 맞는 것 같아요. 저는 분석적인 능력보다 사회적 능력이 더 강해요. 그래서 사람과 가까이서 일하는 분야를 선택하고 싶어요.',
      'jeoneun sarameul jal dowajuneun pyeonieyo. geuraeseo je jeokseongeun sahoebokjisana sangdamsa-wa jal mat-neun geot gatayo. jeoneun bunseokjeogin neungnyeokboda sahoejeok neungnyeogi deo ganghaeyo. geuraeseo saramgwa gakkaiseo ilhaneun bunyareul seontaek-hago sipeoyo.',
      'I tend to be good at helping people. So my aptitude seems to fit well with being a social worker or counselor. My social abilities are stronger than my analytical abilities. That is why I want to choose a field where I work closely with people.',
      'sentence',
      '저는 사람을 잘 도와주는 편이에요. 그래서 제 적성은 사회복지사나 상담사와 잘 맞는 것 같아요. 저는 분석적인 능력보다 사회적 능력이 더 강해요. 그래서 사람과 가까이서 일하는 분야를 선택하고 싶어요.',
      'I tend to be good at helping people. So my aptitude seems to fit well with being a social worker or counselor. My social abilities are stronger than my analytical abilities. That is why I want to choose a field where I work closely with people.',
      [
        { korean: '도와주는 편이에요', english: 'I tend to help (편이에요 = I tend to)' },
        { korean: '제 적성은 ~와 잘 맞는 것 같아요', english: 'my aptitude seems to fit well with ~' },
        { korean: '분석적인 능력보다 사회적 능력', english: 'social ability rather than analytical ability' },
        { korean: '사람과 가까이서 일하는 분야', english: 'a field where I work closely with people' },
      ],
      [ACT.readingSpeaking],
    ),

    // ── Reading & Writing model: internet career counseling Q&A ──
    // For the Reading and Writing activity. The learner reads this Q&A and
    // is then prompted to write a parallel response for a different student.
    createContentItem(
      'Q: 저는 컴퓨터를 잘하지만 사람과 이야기하는 건 어려워요. 어떤 일이 저에게 맞을까요?\nA: 그런 경우에는 주로 컴퓨터로 일하는 분야가 좋아요. 예를 들어 데이터 분석가나 소프트웨어 개발자 같은 직업은 사람과 직접 대화하는 일이 적어요. 자기 적성에 맞는 분야를 찾는 게 가장 중요해요.',
      'Q: jeoneun keompyuteoreul jalhajiman saramgwa iyagihaneun geon eoryeowoyo. eotteon iri jeoege majeulkkayo?\nA: geureon gyeong-uneun juro keompyuteoro ilhaneun bunyaga joayo. yereul deureo deita bunseokgana sopeuteuwe-eo gaebalja gateun jigeobeun saramgwa jikjeop daehwahaneun iri jeogeoyo. jagi jeokseong-e mat-neun bunyareul chat-neun ge gajang junghaeyo.',
      'Q: I am good at computers, but I find it hard to talk with people. What kind of job would suit me?\nA: In that case, fields where you mainly work with computers are good. For example, jobs like data analyst or software developer involve little direct conversation with people. The most important thing is to find a field that fits your aptitude.',
      'sentence',
      'Q: 저는 컴퓨터를 잘하지만 사람과 이야기하는 건 어려워요. 어떤 일이 저에게 맞을까요?\nA: 그런 경우에는 주로 컴퓨터로 일하는 분야가 좋아요. 예를 들어 데이터 분석가나 소프트웨어 개발자 같은 직업은 사람과 직접 대화하는 일이 적어요. 자기 적성에 맞는 분야를 찾는 게 가장 중요해요.',
      'Q: I am good at computers, but I find it hard to talk with people. What kind of job would suit me?\nA: In that case, fields where you mainly work with computers are good. For example, jobs like data analyst or software developer involve little direct conversation with people. The most important thing is to find a field that fits your aptitude.',
      [
        { korean: '~을 잘하지만 ~는 어려워요', english: 'I am good at ~ but ~ is hard' },
        { korean: '데이터 분석가, 소프트웨어 개발자', english: 'data analyst, software developer' },
        { korean: '자기 적성에 맞는 분야', english: 'a field that fits your aptitude' },
        { korean: '~를 찾는 게 가장 중요해요', english: 'finding ~ is the most important thing' },
      ],
      [ACT.readingWriting],
    ),

    // ── Listening dialogue: counseling about choosing a major ──
    // For the Listening and Speaking activity. Multi-turn dialogue the AI
    // tutor can speak as Person A (counselor) and Person B (student); the
    // learner then answers comprehension questions or replays as one side.
    createContentItem(
      '어떤 전공에 관심이 있어요?',
      'eotteon jeongonge gwansimi isseoyo?',
      'What major are you interested in?',
      'conversation',
      'A (상담사): 어떤 전공에 관심이 있어요?\nB (학생): 잘 모르겠어요. 컴퓨터도 좋고 디자인도 좋아요.\nA: 둘 다 흥미가 있다면 어느 쪽이 더 적성에 맞는 것 같아요?\nB: 컴퓨터는 잘하는데, 디자인이 더 즐거워요.\nA: 그럼 두 가지를 합칠 수 있는 분야가 있어요. 예를 들어 UX 디자인은 어때요?\nB: 처음 들어봐요. 그 분야에 대해 더 알아볼게요. 감사합니다.',
      'A (counselor): What major are you interested in?\nB (student): I am not sure. I like both computers and design.\nA: If you are interested in both, which one feels more aligned with your aptitude?\nB: I am good at computers, but design is more fun.\nA: Then there is a field that can combine both. For example, how about UX design?\nB: I have never heard of it. I will look into that field more. Thank you.',
      [
        { korean: '어떤 전공에 관심이 있어요?', english: 'what major are you interested in?' },
        { korean: '둘 다 흥미가 있다면', english: 'if you are interested in both' },
        { korean: '적성에 맞는 것 같아요', english: 'feels aligned with your aptitude' },
        { korean: '두 가지를 합칠 수 있는 분야', english: 'a field that can combine both' },
        { korean: 'UX 디자인', english: 'UX design' },
      ],
      [ACT.listeningSpeaking],
    ),
  ],
};

module.exports = unit1;
