// Level 2 Track-Adult Unit 6 — 기숙사 생활이 어떻습니까? (Dormitory life)
// Source: Book 2A·6. Functions: discussing dorm rooms, roommates, common-area rules.

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
  vocabulary: 'l2au6-vocabulary',
  grammar: 'l2au6-grammar',
  speaking: 'l2au6-speaking',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Dorm rooms and shared spaces',
    goals: ['Use 기숙사, 룸메이트, 빨래방, 공용 공간.'],
    task: 'Describe your dorm room in two sentences.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'N에 살다 + A-(으)ㄴ + V-기 좋다/나쁘다',
    goals: ['Use N에 살다 to live somewhere.', 'Use V-기 좋다/나쁘다 to evaluate.'],
    task: 'Evaluate two parts of your dorm using V-기 좋다 / 나쁘다.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Talking about life in the dorm',
    goals: ['Compare dorm life to home.', 'Negotiate quiet hours.'],
    task: 'Roleplay a polite request to your roommate to lower the volume.' },
];

const lesson = {
  title: '레벨 2 (직장) · 6과: 기숙사 생활이 어떻습니까? (Dormitory Life)',
  category: 'daily-life', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'comparing-living', label: 'Comparing living situations', goal: 'Use V-기 좋다/나쁘다 to compare your dorm with a previous place.' },
    { id: 'requesting-roommate', label: 'Making a polite request to a roommate', goal: 'Use V-아/어 주실 수 있어요? to politely ask for a small change.' },
  ],
  relatedPools: ['topic-people'],
  content: [
    createContentItem('기숙사', 'gisuksa', 'dormitory', 'word', '회사 기숙사에 삽니다.', 'I live in the company dorm.', null, [ACT.vocabulary]),
    createContentItem('룸메이트', 'rumeiteu', 'roommate', 'word', '룸메이트가 친절합니다.', 'My roommate is kind.', null, [ACT.vocabulary]),
    createContentItem('공용 공간', 'gongyong gonggan', 'common area', 'word', '공용 공간을 깨끗하게 사용합시다.', 'Let us keep the common area clean.', null, [ACT.vocabulary]),
    createContentItem('빨래방', 'ppallaebang', 'laundry room', 'word', '빨래방은 1층에 있습니다.', 'The laundry room is on the first floor.', null, [ACT.vocabulary]),
    createContentItem('주방', 'jubang', 'kitchen', 'word', '공용 주방에서 요리할 수 있습니다.', 'You can cook in the shared kitchen.', null, [ACT.vocabulary]),
    createContentItem('침대', 'chimdae', 'bed', 'word', '침대가 편합니다.', 'The bed is comfortable.', null, [ACT.vocabulary]),
    createContentItem('샤워실', 'syawosil', 'shower room', 'word', '샤워실은 층마다 있습니다.', 'There is a shower room on every floor.', null, [ACT.vocabulary]),
    createContentItem('소음', 'soeum', 'noise', 'word', '밤에 소음이 있습니다.', 'There is noise at night.', null, [ACT.vocabulary]),
    createContentItem('규칙', 'gyuchik', 'rule', 'word', '기숙사 규칙을 지킵시다.', 'Let us follow the dorm rules.', null, [ACT.vocabulary]),
    createContentItem('통금', 'tonggeum', 'curfew', 'word', '통금이 11시입니다.', 'Curfew is 11.', null, [ACT.vocabulary]),
    createContentItem('편하다', 'pyeonhada', 'to be comfortable / convenient', 'word', '기숙사가 편합니다.', 'The dorm is convenient.', null, [ACT.vocabulary]),
    createContentItem('불편하다', 'bulpyeonhada', 'to be uncomfortable / inconvenient', 'word', '소음 때문에 불편합니다.', 'It is uncomfortable because of the noise.', null, [ACT.vocabulary]),

    createContentItem(
      '저는 회사 기숙사에 삽니다.', 'jeoneun hoesa gisuksae samnida.',
      'I live in the company dorm.', 'sentence',
      '저는 회사 기숙사에 삽니다. 회사에서 5분 거리입니다.',
      'I live in the company dorm. It is a 5-minute distance from the company.',
      [
        { korean: 'N에 살다', english: 'to live in/at N' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '교통이 편해서 살기 좋습니다.', 'gyotongi pyeonhaeseo salgi joseumnida.',
      'Transportation is convenient, so it is a good place to live.', 'sentence',
      '교통이 편해서 살기 좋습니다. 그런데 소음이 있어서 자기 나쁩니다.',
      'Transportation is convenient, so it is a good place to live. But it is hard to sleep because of the noise.',
      [
        { korean: 'V-기 좋다 / 나쁘다', english: 'good / bad to ~ (evaluative nominalization)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '소리 좀 줄여 주실 수 있어요?', 'sori jom juryeo jusil su isseoyo?',
      'Could you turn down the volume?', 'sentence',
      '죄송하지만 밤이 늦어서 소리 좀 줄여 주실 수 있어요?',
      'Sorry, but it is late at night — could you turn down the volume?',
      [
        { korean: '~줄여 주실 수 있어요?', english: 'could you turn down ~? (polite request)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '룸메이트와 대화', 'rumeiteuwa daehwa',
      'Conversation with a roommate', 'conversation',
      'A: 사라 씨, 기숙사 생활 어떻습니까?\nB: 처음에는 좀 불편했는데 지금은 익숙해졌습니다. 룸메이트가 친절해서 좋습니다.\nA: 공용 주방은 자주 쓰십니까?\nB: 네, 매일 저녁에 요리합니다. 가끔 룸메이트하고 같이 먹어요.\nA: 통금은 몇 시입니까?\nB: 11시입니다. 그래서 일찍 들어와야 합니다.',
      'A: Sarah, how is dorm life?\nB: It was a bit inconvenient at first, but now I am used to it. My roommate is kind, so it is good.\nA: Do you use the shared kitchen often?\nB: Yes, I cook every evening. Sometimes I eat with my roommate.\nA: What time is curfew?\nB: 11. So I have to come in early.',
      [
        { korean: '익숙해지다', english: 'to get used to' },
        { korean: '일찍 들어오다', english: 'to come in early' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
