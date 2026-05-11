// Level 1 Unit 17 — Sending & post office
// Sources: Book 1B·13 (가족들에게 선물을 보내고 싶어요) + 1B·14 (이 소포를 필리핀에 보내고 싶어요)
// Functions: mailing packages, sending gifts, expressing want with -고 싶다.

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
  vocabulary: 'l1u17-vocabulary',
  grammar: 'l1u17-grammar',
  speaking: 'l1u17-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Post-office words and shipping options',
    goals: ['Name shipping items, methods, and forms.'],
    task: 'List the steps of sending a package.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'V-고 싶다 + N에게/한테 + V-아/어 보다',
    goals: [
      'Express want with V-고 싶다.',
      'Use 에게 (formal) / 한테 (casual) for the recipient.',
      'Use V-아/어 보다 to suggest trying something.',
    ],
    task: 'Say one thing you want to send and to whom.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'At the post office',
    goals: ['Ask the postal clerk for help.', 'Choose shipping speed and confirm cost.'],
    task: 'Roleplay sending a small package from Kumoh National Institute of Technology to your family abroad.',
  },
];

const lesson = {
  title: '레벨 1 · 17과: 소포를 보내고 싶어요 (Sending and Post Office)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'expressing-want', label: 'Expressing what you want to do', goal: 'Use V-고 싶다 to say what you want to send or buy.' },
    { id: 'asking-shipping-method', label: 'Asking about shipping methods', goal: 'Ask 어떻게 보내요? and choose between 항공/등기/일반.' },
  ],
  relatedPools: ['topic-society'],
  content: [
    createContentItem('우체국', 'ucheguk', 'post office', 'word', '우체국에 가요.', 'I am going to the post office.', null, [ACT.vocabulary]),
    createContentItem('소포', 'sopo', 'package', 'word', '소포를 보내고 싶어요.', 'I want to send a package.', null, [ACT.vocabulary]),
    createContentItem('편지', 'pyeonji', 'letter', 'word', '편지를 썼어요.', 'I wrote a letter.', null, [ACT.vocabulary]),
    createContentItem('보내다', 'bonaeda', 'to send', 'word', '필리핀에 보내요.', 'I am sending it to the Philippines.', null, [ACT.vocabulary]),
    createContentItem('받다', 'batda', 'to receive', 'word', '소포를 받았어요.', 'I received a package.', null, [ACT.vocabulary]),
    createContentItem('우표', 'upyo', 'stamp', 'word', '우표 하나 주세요.', 'One stamp please.', null, [ACT.vocabulary]),
    createContentItem('봉투', 'bongtu', 'envelope', 'word', '봉투에 주소를 써요.', 'I write the address on the envelope.', null, [ACT.vocabulary]),
    createContentItem('주소', 'juso', 'address', 'word', '주소가 어떻게 되세요?', 'May I have your address?', null, [ACT.vocabulary]),
    createContentItem('무게', 'muge', 'weight', 'word', '무게를 재 주세요.', 'Please weigh it.', null, [ACT.vocabulary]),
    createContentItem('항공', 'hanggong', 'airmail', 'word', '항공으로 보내 주세요.', 'Please send it by airmail.', null, [ACT.vocabulary]),
    createContentItem('등기', 'deunggi', 'registered (mail)', 'word', '등기로 보낼게요.', 'I will send it by registered mail.', null, [ACT.vocabulary]),
    createContentItem('선물', 'seonmul', 'gift / present', 'word', '가족에게 선물을 보내요.', 'I am sending a gift to my family.', null, [ACT.vocabulary]),
    createContentItem('가족', 'gajok', 'family', 'word', '가족이 보고 싶어요.', 'I miss my family.', null, [ACT.vocabulary]),
    createContentItem('나라', 'nara', 'country', 'word', '저는 필리핀이라는 나라에서 왔어요.', 'I came from a country called the Philippines.', null, [ACT.vocabulary]),

    createContentItem(
      '가족에게 선물을 보내고 싶어요.', 'gajogege seonmureul bonaego sipeoyo.',
      'I want to send a gift to my family.', 'sentence',
      '가족에게 선물을 보내고 싶어요. 한국 과자가 어때요?',
      'I want to send a gift to my family. How about Korean snacks?',
      [
        { korean: '가족에게', english: 'to family (에게 indirect object)' },
        { korean: '선물을 보내고 싶어요', english: 'want to send a gift (V-고 싶다)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '이 소포를 필리핀에 보내고 싶어요.', 'i soporeul pillipine bonaego sipeoyo.',
      'I want to send this package to the Philippines.', 'sentence',
      '이 소포를 필리핀에 보내고 싶어요. 항공으로 부탁해요.',
      'I want to send this package to the Philippines. Please send it by air.',
      [
        { korean: '필리핀에', english: 'to the Philippines (destination)' },
        { korean: '항공으로', english: 'by airmail' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '등기로 보내 보세요.', 'deunggiro bonae boseyo.',
      'Try sending it by registered mail.', 'sentence',
      '중요한 거예요? 그러면 등기로 보내 보세요. 더 안전해요.',
      'Is it important? Then try sending it by registered mail. It is safer.',
      [
        { korean: '등기로', english: 'by registered mail' },
        { korean: '보내 보세요', english: 'try sending (V-아/어 보다 + 세요)' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '소포를 보내요', 'soporeul bonaeyo',
      'Sending a package abroad', 'conversation',
      'A: 안녕하세요. 이 소포를 필리핀에 보내고 싶어요.\nB: 안에 뭐가 있어요?\nA: 옷하고 한국 과자예요. 가족 선물이에요.\nB: 무게가 2킬로네요. 항공으로요, 일반으로요?\nA: 항공으로요. 얼마나 걸려요?\nB: 약 5일 걸려요. 25,000원이에요.\nA: 등기로 보내 주세요.',
      'A: Hello. I want to send this package to the Philippines.\nB: What is inside?\nA: Clothes and Korean snacks. They are gifts for my family.\nB: It is 2 kg. By air or regular?\nA: By air. How long will it take?\nB: About 5 days. It is 25,000 won.\nA: Please send it by registered mail.',
      [
        { korean: '안에 뭐가 있어요?', english: 'what is inside?' },
        { korean: '항공으로요, 일반으로요?', english: 'by air or regular?' },
        { korean: '얼마나 걸려요?', english: 'how long does it take?' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
