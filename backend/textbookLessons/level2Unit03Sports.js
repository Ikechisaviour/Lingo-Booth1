// Level 2 Unit 3 — 스포츠의 세계 (World of sports)
// Source: Book 2D Unit 3. Vocab: 운동 경기, 승부와 상황.
// Grammar: V-(으)나 마나, V-는 바람에, N(이)라는 N, N에 비해(서).
// Pronunciation: 경음화 '바쁠걸요'. Culture: 씨름 (Korean wrestling).

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
  speaking: 'l2u3-speaking',
  readingSpeaking: 'l2u3-reading-speaking',
  listeningSpeaking: 'l2u3-listening-speaking',
  readingWriting: 'l2u3-reading-writing',
  task: 'l2u3-task',
  vocabulary: 'l2u3-vocabulary',
  grammar: 'l2u3-grammar',
  pronunciation: 'l2u3-pronunciation',
  culture: 'l2u3-culture',
};

const activities = [
  { id: ACT.speaking, section: 'Speaking', title: 'Explaining the match result',
    goals: ['Recap a match result with cause and reaction.'],
    task: 'Describe the result of a match you watched recently.' },
  { id: ACT.readingSpeaking, section: 'Reading and Speaking', title: 'Playing-field intros',
    goals: ['Read introductions to playing fields.'],
    task: 'Introduce a stadium or court.' },
  { id: ACT.listeningSpeaking, section: 'Listening and Speaking', title: 'Athlete attitudes + match predictions',
    goals: ['Discuss an athlete\'s attitude.', 'Predict a match outcome.'],
    task: 'Predict the next match between two teams of your choice.' },
  { id: ACT.readingWriting, section: 'Reading and Writing', title: 'Futsal explanation + match writeup',
    goals: ['Read an explanation about futsal.', 'Write about a special sports match.'],
    task: 'Write three sentences about a memorable sporting moment.' },
  { id: ACT.task, section: 'Task', title: 'Plan an athletic competition',
    goals: ['Plan a friendly contest.'],
    task: 'Plan a small soccer tournament for Kumoh National Institute of Technology students.' },
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Athletic events + victory/defeat',
    goals: ['Name sports events.', 'Use 이기다 / 지다 / 비기다.'],
    task: 'Recap the wins and losses of a team.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'Sports-talk patterns',
    goals: ['V-(으)나 마나', 'V-는 바람에', 'N(이)라는 N', 'N에 비해(서)'],
    task: 'Use V-는 바람에 to explain why a team lost.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: '경음화 \'바쁠걸요\'',
    goals: ['Recognize tense initial after ㄹ + ㄱ.'],
    task: 'Read 바쁠걸요, 좋을걸요 with tensified [ㅸ걸요].' },
  { id: ACT.culture, section: 'Culture Note', title: '씨름 — Korean wrestling',
    goals: ['Understand the basics of 씨름.'],
    task: 'Compare 씨름 with a wrestling style from your country.' },
];

const lesson = {
  title: '레벨 2 · 3과: 스포츠의 세계 (World of Sports)',
  category: 'daily-life', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'expressing-certainty', label: 'Expressing certainty', goal: 'Use V-(으)나 마나 to express that the outcome is obvious.' },
    { id: 'disagreeing-prediction', label: 'Disagreeing with expectations', goal: 'Use N에 비해(서) to argue against an expected outcome.' },
  ],
  relatedPools: ['topic-society'],
  content: [
    createContentItem('경기', 'gyeonggi', 'match / game', 'word', '어제 경기를 봤어요.', 'I watched the match yesterday.', null, [ACT.vocabulary]),
    createContentItem('선수', 'seonsu', 'player / athlete', 'word', '한국 선수가 1등이에요.', 'The Korean athlete is in 1st place.', null, [ACT.vocabulary]),
    createContentItem('이기다', 'igida', 'to win', 'word', '우리 팀이 이겼어요.', 'Our team won.', null, [ACT.vocabulary]),
    createContentItem('지다', 'jida', 'to lose', 'word', '아쉽게 졌어요.', 'We lost regrettably.', null, [ACT.vocabulary]),
    createContentItem('비기다', 'bigida', 'to tie / draw', 'word', '경기가 1대1로 비겼어요.', 'The game ended 1-1.', null, [ACT.vocabulary]),
    createContentItem('승부', 'seungbu', 'victory or defeat', 'word', '승부를 가리기 어려워요.', 'It is hard to determine a winner.', null, [ACT.vocabulary]),
    createContentItem('점수', 'jeomsu', 'score / points', 'word', '점수가 높아요.', 'The score is high.', null, [ACT.vocabulary]),
    createContentItem('응원하다', 'eungwonhada', 'to cheer for / support', 'word', '한국 팀을 응원해요.', 'I cheer for the Korean team.', null, [ACT.vocabulary]),
    createContentItem('축구', 'chukgu', 'soccer / football', 'word', '축구를 좋아해요.', 'I like soccer.', null, [ACT.vocabulary]),
    createContentItem('야구', 'yagu', 'baseball', 'word', '야구는 한국에서 인기 있어요.', 'Baseball is popular in Korea.', null, [ACT.vocabulary]),
    createContentItem('농구', 'nonggu', 'basketball', 'word', '농구도 자주 해요.', 'I also play basketball often.', null, [ACT.vocabulary]),
    createContentItem('풋살', 'putsal', 'futsal', 'word', '풋살은 5명이 해요.', 'Futsal is played with 5 people.', null, [ACT.vocabulary]),
    createContentItem('연습', 'yeonseup', 'practice', 'word', '매일 연습해요.', 'I practice every day.', null, [ACT.vocabulary]),
    createContentItem('씨름', 'ssireum', 'Korean wrestling', 'word', '씨름은 한국 전통 운동이에요.', 'Ssireum is a traditional Korean sport.', null, [ACT.vocabulary, ACT.culture]),

    createContentItem(
      '연습하나 마나 1등은 못해요.', 'yeonseuphana mana 1deungeun mothaeyo.',
      'Whether or not you practice, you cannot win 1st place.', 'sentence',
      '저 팀은 너무 강해요. 연습하나 마나 1등은 못해요.',
      'That team is too strong. Whether or not you practice, you cannot win 1st place.',
      [
        { korean: '연습하나 마나', english: 'whether or not you practice (V-(으)나 마나)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '비가 오는 바람에 경기가 취소됐어요.', 'biga oneun barame gyeonggiga chwisodwaesseoyo.',
      'Because of the rain, the match was canceled.', 'sentence',
      '비가 오는 바람에 경기가 취소됐어요. 다음 주에 다시 해요.',
      'Because of the rain, the match was canceled. We will do it again next week.',
      [
        { korean: '~는 바람에', english: 'because of (unintended cause)' },
        { korean: '취소되다', english: 'to be canceled' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '풋살이라는 운동을 아세요?', 'putsariraneun undongeul aseyo?',
      'Do you know a sport called futsal?', 'sentence',
      '풋살이라는 운동을 아세요? 축구하고 비슷해요.',
      'Do you know a sport called futsal? It is similar to soccer.',
      [
        { korean: '~라는 N', english: 'a N called ~' },
      ],
      [ACT.grammar, ACT.readingWriting],
    ),
    createContentItem(
      '축구에 비해서 야구가 더 길어요.', 'chukgue bihaeseo yaguga deo gireoyo.',
      'Compared to soccer, baseball is longer.', 'sentence',
      '축구에 비해서 야구가 더 길어요. 한 경기에 3시간 정도 걸려요.',
      'Compared to soccer, baseball is longer. One game takes about 3 hours.',
      [
        { korean: '~에 비해서', english: 'compared to ~' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '경기 결과 이야기', 'gyeonggi gyeolgwa iyagi',
      'Talking about the match result', 'conversation',
      'A: 어제 한국 대 일본 야구 경기 봤어요?\nB: 네, 봤어요. 한국이 이겼지요?\nA: 네, 4대2로요. 비가 오는 바람에 잠깐 멈췄지만 결국 한국이 이겼어요.\nB: 김 선수가 정말 잘하더라고요.\nA: 맞아요. 일본 선수에 비해서 김 선수가 정말 빨라요.\nB: 다음 경기도 기대돼요.',
      'A: Did you watch the Korea vs Japan baseball game yesterday?\nB: Yes I did. Korea won, right?\nA: Yes, 4-2. The game paused briefly because of rain, but in the end Korea won.\nB: Player Kim was really good.\nA: Right. Compared to the Japanese player, Kim is really fast.\nB: I am looking forward to the next game too.',
      [
        { korean: '~ 대 ~', english: '~ vs ~' },
        { korean: '결국', english: 'in the end' },
        { korean: '기대되다', english: 'to look forward to' },
      ],
      [ACT.listeningSpeaking, ACT.speaking],
    ),
  ],
};

module.exports = lesson;
