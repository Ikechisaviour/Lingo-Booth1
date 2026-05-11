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
  vocabulary: 'l2r2-vocabulary',
  grammar: 'l2r2-grammar',
  speaking: 'l2r2-speaking',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary Review', title: 'Mixed vocabulary from Units 4-6',
    goals: ['Recall key vocabulary from these units.'],
    task: 'Use five mixed words in your own sentences.' },
  { id: ACT.grammar, section: 'Grammar Review', title: 'Mixed grammar from Units 4-6',
    goals: ['Combine patterns from each unit.'],
    task: 'Write four sentences mixing patterns from the three units.' },
  { id: ACT.speaking, section: 'Speaking Review', title: 'Festival roleplay with proverbs',
    goals: ['Roleplay attending a festival, using proverbs to react.'],
    task: 'Roleplay attending a Korean festival and reacting using a proverb.' },
];

const lesson = {
  title: '레벨 2 · 복습 2 (Review of Units 4-6)',
  category: 'daily-life', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'review',
  activities,
  expressionPractice: [
    { id: 'review-mixed', label: 'Mixed dissatisfaction + consoling + recommending', goal: 'Combine complaint, console-with-proverb, and recommend-festival functions in one short conversation.' },
  ],
  relatedPools: ['topic-people', 'topic-society', 'topic-culture', 'pos-proverbs', 'pos-idioms'],
  content: [
    createContentItem('태도', 'taedo', 'attitude (Unit 4)', 'word', '태도가 적극적이에요.', 'Their attitude is proactive.', null, [ACT.vocabulary]),
    createContentItem('속담', 'sokdam', 'proverb (Unit 5)', 'word', '한국 속담이 재미있어요.', 'Korean proverbs are fun.', null, [ACT.vocabulary]),
    createContentItem('축제', 'chukje', 'festival (Unit 6)', 'word', '봄 축제가 시작돼요.', 'The spring festival is starting.', null, [ACT.vocabulary]),
    createContentItem('자랑스럽다', 'jarangseureopda', 'to be proud (Unit 4)', 'word', '결과가 자랑스러워요.', 'I am proud of the result.', null, [ACT.vocabulary]),
    createContentItem('손이 크다', 'soni keuda', 'to be generous (idiom, Unit 5)', 'word', '어머니는 손이 크세요.', 'My mother is generous.', null, [ACT.vocabulary]),
    createContentItem('볼거리', 'bolgeori', 'things to see (Unit 6)', 'word', '볼거리가 많아요.', 'There is much to see.', null, [ACT.vocabulary]),
    createContentItem('적극적', 'jeokgeukjeok', 'proactive (Unit 4)', 'word', '적극적으로 참여해요.', 'I participate proactively.', null, [ACT.vocabulary]),
    createContentItem('관용어', 'gwanyongeo', 'idiomatic expression (Unit 5)', 'word', '관용어를 외우고 있어요.', 'I am memorizing idioms.', null, [ACT.vocabulary]),
    createContentItem('아리랑', 'arirang', 'Arirang folk song (Unit 6)', 'word', '아리랑이 들려요.', 'I can hear Arirang.', null, [ACT.vocabulary]),

    createContentItem(
      '실수는 누구나 하기 마련이지만 같은 실수만 반복할 수밖에 없으면 안 돼요.', 'silsuneun nuguna hagi maryeonijiman gateun silsumaneul banbokhal subakke eopseumyeon an dwaeyo.',
      'Mistakes are bound to happen, but you cannot just keep repeating the same one.', 'sentence',
      '실수는 누구나 하기 마련이지만 같은 실수만 반복할 수밖에 없으면 안 돼요. 한 번 더 시도해 보세요.',
      'Mistakes are bound to happen, but you cannot just keep repeating the same one. Try one more time.',
      [
        { korean: '~기 마련이다', english: 'is bound to ~ (Unit 5)' },
        { korean: '~ㄹ 수밖에 없다', english: 'cannot but ~ (Unit 4)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '이 축제야말로 여간 볼만한 게 아니에요.', 'i chukjeyamallo yeogan bolmanhan ge anieyo.',
      'This festival is truly worth watching, exceptionally.', 'sentence',
      '이 축제야말로 여간 볼만한 게 아니에요. 매년 갈 거예요.',
      'This festival is truly worth watching, exceptionally. I will go every year.',
      [
        { korean: 'N(이)야말로', english: 'truly N (Unit 6)' },
        { korean: '여간 ~ 아니다', english: 'exceptional (Unit 6)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '오늘은 비도 오고 친구도 못 와서 축제가 별로기는요. 그래도 가야지.', 'oneureun bido ogo chingudo mot waseo chukjega byeollogineunyo. geuraedo gayaji.',
      'Today the rain and my friend not coming make the festival not great — well, hardly. I should still go.', 'sentence',
      '오늘은 비도 오고 친구도 못 와서 축제가 별로기는요. 그래도 가야지. 볼거리가 많아요.',
      'Today the rain and my friend not coming make the festival not great — well, hardly. I should still go. There is a lot to see.',
      [
        { korean: '~고 해서', english: 'because of ~ (Unit 5)' },
        { korean: '~기는요', english: 'hardly (deflecting, Unit 6)' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '복습 대화', 'bokseup daehwa',
      'Cross-unit review dialogue', 'conversation',
      'A: 어제 친구한테 화났어. 도와주기는커녕 오히려 핑계만 댔어.\nB: 화 풀어. 사람은 누구나 실수하기 마련이야.\nA: 알아. 그래도 자기는 잘했다고 자랑스럽다듯이 말해.\nB: 가는 말이 고와야 오는 말이 곱대. 한번 솔직하게 이야기해 봐.\nA: 그래야겠다. 주말에 축제 같이 갈래? 기분 풀자.\nB: 좋아. 이번 축제는 정말 여간 볼거리가 많은 게 아니래.',
      'A: I got mad at my friend yesterday. Far from helping, they only made excuses.\nB: Calm down. People are bound to make mistakes.\nA: I know. But they talked as if they were proud of themselves.\nB: They say "kind words bring kind words back". Talk to them honestly once.\nA: I should. Want to come to the festival this weekend? Let us cheer up.\nB: Sure. They say this festival has exceptionally many things to see.',
      [
        { korean: '핑계를 대다', english: 'to make an excuse' },
        { korean: '기분 풀자', english: 'let us cheer up' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
