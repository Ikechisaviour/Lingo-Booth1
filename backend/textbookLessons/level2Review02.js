// Level 2 Track-Thematic — 복습 2 (Review 2)
// Consolidates Units 4-6: 남자와 여자, 속담과 관용어, 공연과 축제.

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
  orientation: 'l2r2-orientation',
  vocabulary: 'l2r2-vocabulary',
  grammar: 'l2r2-grammar',
  mixedSentences: 'l2r2-mixed',
  speaking: 'l2r2-speaking',
  listening: 'l2r2-listening',
  writing: 'l2r2-writing',
  task: 'l2r2-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What this review covers',
    goals: ['Recall vocab + grammar from U4 (gender), U5 (proverbs), U6 (festivals).', 'Combine complaint, console-with-proverb, recommend-festival in one dialogue.'],
    task: 'Imagine venting to a Korean friend about someone, getting consoled with a proverb, then being invited to a festival to cheer up.' },
  { id: ACT.vocabulary, section: 'Vocabulary Review', title: 'Mixed vocab from U4-6',
    goals: ['Recall key vocab.'],
    task: 'Use 5 mixed words in your own sentences.' },
  { id: ACT.grammar, section: 'Grammar Review', title: 'Mixed grammar from U4-6',
    goals: ['Combine patterns from each unit.'],
    task: 'Pick 4 patterns and write a sentence with each.' },
  { id: ACT.mixedSentences, section: 'Mixed Sentences', title: 'Multi-pattern combos',
    goals: ['Combine cross-unit patterns.'],
    task: 'Build 3 multi-pattern sentences.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Festival roleplay with proverbs',
    goals: ['Use proverbs to react to festival moments.'],
    task: 'Roleplay attending a festival.' },
  { id: ACT.listening, section: 'Listening', title: 'Cross-unit dialogue',
    goals: ['Follow a complaint → console → recommend chain.'],
    task: 'Identify each function in turn.' },
  { id: ACT.writing, section: 'Writing', title: 'Cross-unit reflection',
    goals: ['Write 5-6 sentences combining all three themes.'],
    task: 'Write a reflection.' },
  { id: ACT.task, section: 'Task', title: 'Cheer-up festival invite',
    goals: ['Use all 3 units\' grammar.'],
    task: 'Vent + console + invite to festival.' },
];

const lesson = {
  title: '레벨 2 · 복습 2 (Review of Units 4-6)',
  category: 'daily-life',
  difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'review',
  activities,
  expressionPractice: [
    { id: 'review-mixed', label: 'Complaint + console + recommend', goal: 'Combine 3 functions in one conversation.' },
    { id: 'cross-unit-emphasis', label: 'Cross-unit emphasis', goal: 'Use ~기는요 (U6) + ~기 마련이다 (U5) + ~기는커녕 (U4) together.' },
  ],
  relatedPools: ['topic-people', 'topic-society', 'topic-culture', 'pos-proverbs', 'pos-idioms'],
  content: [
    createContentItem('Review goal', 'consolidation', 'By end: vent + console + recommend across Units 4-6 grammar.', 'word', 'Units 4+5+6 combined', 'Mixed practice.', null, [ACT.orientation]),
    createContentItem('Scenario', 'cheer-up chat', 'Your friend vents about a frustrating classmate; you console with a proverb; then propose going to a campus festival to lift the mood.', 'word', 'Friend complains → You console with proverb → You invite to festival', 'Cross-unit flow.', null, [ACT.orientation]),

    createContentItem('태도', 'taedo', 'attitude (U4)', 'word', '태도가 좋아요.', 'Good attitude.', null, [ACT.vocabulary]),
    createContentItem('불만', 'bulman', 'complaint (U4)', 'word', '불만이 많아요.', 'Many complaints.', null, [ACT.vocabulary]),
    createContentItem('자랑스럽다', 'jarangseureopda', 'proud (U4)', 'word', '결과가 자랑스러워요.', 'Proud of result.', null, [ACT.vocabulary]),
    createContentItem('속담', 'sokdam', 'proverb (U5)', 'word', '한국 속담이 재미있어요.', 'Korean proverbs are fun.', null, [ACT.vocabulary]),
    createContentItem('관용어', 'gwanyongeo', 'idiom (U5)', 'word', '관용어를 외워요.', 'I memorize idioms.', null, [ACT.vocabulary]),
    createContentItem('손이 크다', 'soni keuda', 'be generous (U5)', 'word', '어머니는 손이 크세요.', 'Mother is generous.', null, [ACT.vocabulary]),
    createContentItem('축제', 'chukje', 'festival (U6)', 'word', '봄 축제가 시작돼요.', 'Spring festival starts.', null, [ACT.vocabulary]),
    createContentItem('볼거리', 'bolgeori', 'sights (U6)', 'word', '볼거리가 많아요.', 'Many sights.', null, [ACT.vocabulary]),
    createContentItem('아리랑', 'arirang', 'Arirang (U6)', 'word', '아리랑이 들려요.', 'I hear Arirang.', null, [ACT.vocabulary]),

    createContentItem('~기는커녕 (U4)', 'far from', 'Far from V-ing.', 'sentence', '도와주기는커녕 방해만 했어요.', 'Far from helping, only got in the way.', null, [ACT.grammar]),
    createContentItem('~ㄹ 게 뻔하다 (U4)', 'predicting', 'Surely will V.', 'sentence', '오늘도 늦을 게 뻔해요.', 'Surely late again today.', null, [ACT.grammar]),
    createContentItem('~기 마련이다 (U5)', 'consoling', 'Is bound to.', 'sentence', '실수는 누구나 하기 마련이에요.', 'Everyone makes mistakes.', null, [ACT.grammar]),
    createContentItem('~다 보니까 (U5)', 'gradual change', 'Having continued V.', 'sentence', '살다 보니까 좋아졌어요.', 'Living, I came to like it.', null, [ACT.grammar]),
    createContentItem('~이야말로 (U6)', 'truly', 'Truly the one.', 'sentence', '이 축제야말로 가야 해요.', 'This festival is THE one.', null, [ACT.grammar]),
    createContentItem('여간 ~ 아니다 (U6)', 'exceptionally', 'Exceptionally A.', 'sentence', '여간 멋있는 게 아니에요.', 'Exceptionally great.', null, [ACT.grammar]),

    createContentItem('Combo 1 (U4 + U5)', 'complaint + console',
      '~기는커녕 + ~기 마련이다.',
      'sentence', '도와주기는커녕 방해만 했지만, 사람은 누구나 실수하기 마련이에요.',
      'Far from helping, he hindered. But everyone makes mistakes.',
      null, [ACT.mixedSentences]),
    createContentItem('Combo 2 (U5 + U6)', 'console + festival',
      '~기 마련이다 + ~이야말로.',
      'sentence', '속상한 일은 누구에게나 있기 마련이에요. 이번 축제야말로 기분을 풀 기회예요.',
      'Everyone has upsetting things. This festival is THE chance to cheer up.',
      null, [ACT.mixedSentences]),
    createContentItem('Combo 3 (U4 + U6)', 'predict + emphasize',
      '~ㄹ 게 뻔하다 + 여간 ~ 아니다.',
      'sentence', '비가 올 게 뻔하지만 이 공연은 여간 멋있는 게 아니라 꼭 가야 해요.',
      'It will surely rain, but this performance is exceptionally great, so I must go.',
      null, [ACT.mixedSentences]),

    createContentItem('Festival reaction with proverb', 'speaking',
      'React to festival moments using proverbs.',
      'sentence', '와, 사람이 정말 많네! 호랑이도 제 말 하면 온다더니 친구도 마침 왔어. 이 축제야말로 와야 해.',
      'Wow, so many people! Speak of the devil — my friend just arrived. This festival is THE one to attend.',
      null, [ACT.speaking]),

    createContentItem('Cross-unit dialogue', 'listening',
      'Friend vents, you console, then invite.',
      'conversation',
      'A: 어제 친구한테 화났어. 도와주기는커녕 오히려 핑계만 댔어.\nB: 화 풀어. 사람은 누구나 실수하기 마련이야.\nA: 알아. 그래도 자기는 잘했다듯이 자랑스럽게 말해.\nB: 가는 말이 고와야 오는 말이 곱대. 한번 솔직하게 이야기해 봐.\nA: 그래야겠다. 주말에 축제 같이 갈래? 기분 풀자.\nB: 좋아. 이번 축제는 여간 볼거리가 많은 게 아니래.',
      'A: Got mad at my friend yesterday. Far from helping, only excuses. B: Calm down. Everyone makes mistakes. A: I know. But she sounded proud of herself. B: They say "kind words for kind words". Talk honestly once. A: I should. Want to come to the festival? Let us cheer up. B: Yes. They say this one has exceptionally many sights.',
      [
        { korean: '~기는커녕', english: 'U4' },
        { korean: '~기 마련이다', english: 'U5' },
        { korean: '여간 ~ 아니다', english: 'U6' },
      ],
      [ACT.listening]),

    createContentItem('Reflection paragraph', 'writing',
      'Sample paragraph combining all three units.',
      'sentence',
      '저는 친구한테 화났어요. 도와주기는커녕 핑계만 대요. 하지만 사람은 누구나 실수하기 마련이라고 생각해요. 한국에 살다 보니까 가는 말이 고와야 오는 말이 곱다는 속담이 정말 맞아요. 이번 주말에는 친구와 같이 축제에 가려고 해요. 그 축제야말로 우리 기분을 풀어 줄 거예요.',
      'I got mad at my friend. Far from helping, only excuses. But I think everyone makes mistakes. Living in Korea, I find the proverb "kind words for kind words back" really true. This weekend I will go to a festival with my friend. That festival is THE one to cheer us up.',
      null, [ACT.writing]),

    createContentItem('과제: Vent + console + invite', 'task',
      'Roleplay: Friend vents about a difficult coworker. You console with a proverb. You invite to a festival.',
      'conversation',
      'Friend: ~ 기는커녕 ~ (vent)\nYou: ~ 기 마련이에요. (console)\nFriend: 그래도 ~\nYou: ~ 다 보니까 ~ 도 좋아져요. (proverb-style wisdom)\nYou: 이번 ~ 축제야말로 ~ (invite)\nFriend: 좋아요!',
      'AI tutor will play the friend.',
      [
        { korean: '~ 기는커녕 (U4)', english: 'far from' },
        { korean: '~ 기 마련이다 (U5)', english: 'is bound to' },
        { korean: '~ 다 보니까 (U5)', english: 'having continued' },
        { korean: '~ 이야말로 (U6)', english: 'truly the one' },
      ],
      [ACT.task]),
  ],
};

module.exports = lesson;
