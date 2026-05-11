// Level 2 Track-Adult Unit 2 — 저는 9시에 출근해요 (Work schedule)
// Source: Book 2A·2.

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
  vocabulary: 'l2au2-vocabulary',
  grammar: 'l2au2-grammar',
  speaking: 'l2au2-speaking',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Schedule, shifts, breaks',
    goals: ['Use 출근, 퇴근, 점심 시간, 야근.'],
    task: 'Describe a typical workday schedule.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'Time + 에 + V-ㅂ니다 + N부터 N까지',
    goals: ['Mark schedule times with 에.', 'Use 부터 ~ 까지 for shift hours.'],
    task: 'State your shift in two sentences.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Asking about a coworker\'s schedule',
    goals: ['Ask a coworker about hours, breaks, days off.'],
    task: 'Roleplay asking about a Saturday shift swap.' },
];

const lesson = {
  title: '레벨 2 (직장) · 2과: 저는 9시에 출근합니다 (Work Schedule)',
  category: 'business', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'stating-schedule', label: 'Stating your schedule', goal: 'Use time + 에 + 출근/퇴근합니다 to state your hours.' },
    { id: 'asking-shift', label: 'Asking about a shift', goal: 'Use 몇 시부터 / 무슨 요일에 to ask about a coworker\'s shift.' },
  ],
  relatedPools: ['topic-society'],
  content: [
    createContentItem('출근', 'chulgeun', 'going to work', 'word', '출근 시간이 8시입니다.', 'Clock-in time is 8.', null, [ACT.vocabulary]),
    createContentItem('퇴근', 'toegeun', 'leaving work', 'word', '6시에 퇴근합니다.', 'I leave work at 6.', null, [ACT.vocabulary]),
    createContentItem('근무', 'geunmu', 'work duty / shift', 'word', '오늘은 야간 근무입니다.', 'Today is a night shift.', null, [ACT.vocabulary]),
    createContentItem('점심 시간', 'jeomsim sigan', 'lunch break', 'word', '점심 시간은 12시부터 1시까지입니다.', 'Lunch break is 12 to 1.', null, [ACT.vocabulary]),
    createContentItem('야근', 'yageun', 'overtime / night work', 'word', '오늘 야근해야 합니다.', 'I have to do overtime today.', null, [ACT.vocabulary]),
    createContentItem('휴일', 'hyuil', 'day off / holiday', 'word', '일요일은 휴일입니다.', 'Sunday is a day off.', null, [ACT.vocabulary]),
    createContentItem('교대', 'gyodae', 'shift change / rotation', 'word', '교대 근무가 힘듭니다.', 'Shift work is tough.', null, [ACT.vocabulary]),
    createContentItem('아침 근무', 'achim geunmu', 'morning shift', 'word', '저는 아침 근무입니다.', 'I am on the morning shift.', null, [ACT.vocabulary]),
    createContentItem('야간 근무', 'yagan geunmu', 'night shift', 'word', '야간 근무는 힘듭니다.', 'Night shifts are hard.', null, [ACT.vocabulary]),
    createContentItem('휴게실', 'hyugesil', 'break room', 'word', '휴게실에서 쉬세요.', 'Please rest in the break room.', null, [ACT.vocabulary]),
    createContentItem('지각', 'jigak', 'being late (to work)', 'word', '지각하면 안 됩니다.', 'You must not be late.', null, [ACT.vocabulary]),
    createContentItem('조퇴', 'jotoe', 'leaving early', 'word', '몸이 안 좋아서 조퇴합니다.', 'I will leave early because I do not feel well.', null, [ACT.vocabulary]),

    createContentItem(
      '저는 9시에 출근하고 6시에 퇴근합니다.', 'jeoneun ahopsie chulgeunhago yeoseossie toegeunhamnida.',
      'I clock in at 9 and clock out at 6.', 'sentence',
      '저는 9시에 출근하고 6시에 퇴근합니다. 점심 시간은 1시간입니다.',
      'I clock in at 9 and clock out at 6. Lunch break is 1 hour.',
      [
        { korean: '~에 출근하고', english: 'clock in at ~ and (V-고 connecting)' },
        { korean: '~시에 퇴근합니다', english: 'clock out at ~' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '근무 시간은 8시부터 5시까지입니다.', 'geunmu siganeun yeodeolsibuteo daseossikkajimnida.',
      'Work hours are 8 to 5.', 'sentence',
      '근무 시간은 8시부터 5시까지입니다. 그 다음에는 야근이 있을 수도 있습니다.',
      'Work hours are 8 to 5. After that there may be overtime.',
      [
        { korean: 'N부터 N까지', english: 'from N to N' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '오늘 점심 시간에 같이 갈까요?', 'oneul jeomsim sigane gachi galkkayo?',
      'Shall we go together at lunch break today?', 'sentence',
      '오늘 점심 시간에 같이 갈까요? 휴게실에서 쉬어요.',
      'Shall we go together at lunch break today? Let us rest in the break room.',
      [
        { korean: '점심 시간에', english: 'at lunch break' },
        { korean: '같이 갈까요?', english: 'shall we go together?' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '근무 일정 묻기', 'geunmu iljeong mutgi',
      'Asking about work schedule', 'conversation',
      'A: 사라 씨, 내일 출근 시간이 어떻게 됩니까?\nB: 아침 근무라서 7시에 출근합니다. 4시에 퇴근합니다.\nA: 토요일에는 일하십니까?\nB: 토요일은 휴일입니다. 일요일에 야간 근무를 합니다.\nA: 야근이 많이 힘드시지요?\nB: 처음에는 힘들었는데 지금은 익숙해졌습니다.',
      'A: Sarah, what are your clock-in hours tomorrow?\nB: It is a morning shift so I clock in at 7. I clock out at 4.\nA: Do you work on Saturdays?\nB: Saturday is a day off. I work the night shift on Sunday.\nA: Overtime must be quite tough?\nB: It was hard at first, but now I am used to it.',
      [
        { korean: '익숙해지다', english: 'to get used to' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
