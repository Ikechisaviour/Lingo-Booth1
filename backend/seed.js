const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');
require('dotenv').config();

// Import real vocabulary lessons
const realLessons = require('./intermediateAdvancedLessons');
const sentenceLessons = require('./sentenceLessons');

// Helper function to create content items
const createContentItem = (korean, romanization, english, type = 'word', example = '', exampleEnglish = '') => ({
  type,
  korean,
  romanization,
  english,
  pronunciation: romanization,
  example: example || korean,
  exampleEnglish: exampleEnglish || english
});

const lessons = [
  // ==========================================
  // GREETINGS - BEGINNER (100+ items)
  // ==========================================
  {
    title: 'Basic Greetings & Introductions',
    category: 'greetings',
    difficulty: 'beginner',
    content: [
      // Basic greetings
      createContentItem('안녕하세요', 'annyeonghaseyo', 'Hello', 'word', '안녕하세요, 만나서 반갑습니다', 'Hello, nice to meet you'),
      createContentItem('안녕', 'annyeong', 'Hi (informal)', 'word', '안녕, 잘 지냈어?', 'Hi, how have you been?'),
      createContentItem('안녕히 가세요', 'annyeonghi gaseyo', 'Goodbye (to person leaving)', 'sentence', '안녕히 가세요, 조심히 가세요', 'Goodbye, go safely'),
      createContentItem('안녕히 계세요', 'annyeonghi gyeseyo', 'Goodbye (when you leave)', 'sentence', '안녕히 계세요, 다음에 봐요', 'Goodbye, see you next time'),
      createContentItem('잘 가', 'jal ga', 'Bye (informal)', 'word', '잘 가, 내일 봐', 'Bye, see you tomorrow'),
      createContentItem('또 봐요', 'tto bwayo', 'See you again', 'sentence', '또 봐요, 좋은 하루 되세요', 'See you again, have a nice day'),
      createContentItem('나중에 봐요', 'najunge bwayo', 'See you later', 'sentence', '나중에 봐요', 'See you later'),
      createContentItem('내일 봐요', 'naeil bwayo', 'See you tomorrow', 'sentence', '내일 봐요', 'See you tomorrow'),

      // Thanking
      createContentItem('감사합니다', 'gamsahamnida', 'Thank you', 'word', '도와주셔서 감사합니다', 'Thank you for helping me'),
      createContentItem('고맙습니다', 'gomapseumnida', 'Thank you', 'word', '정말 고맙습니다', 'Thank you so much'),
      createContentItem('고마워', 'gomawo', 'Thanks (informal)', 'word', '고마워, 친구야', 'Thanks, friend'),
      createContentItem('고마워요', 'gomawoyo', 'Thanks (casual)', 'word', '고마워요', 'Thanks'),
      createContentItem('천만에요', 'cheonmaneyo', 'You\'re welcome', 'word', '천만에요, 별말씀을요', 'You\'re welcome, don\'t mention it'),
      createContentItem('괜찮아요', 'gwaenchanayo', 'It\'s okay / You\'re welcome', 'word', '괜찮아요, 도와줄 수 있어요', 'It\'s okay, I can help'),
      createContentItem('아니에요', 'anieyo', 'Not at all', 'word', '아니에요, 괜찮아요', 'Not at all, it\'s okay'),

      // Apologizing
      createContentItem('죄송합니다', 'joesonghamnida', 'I\'m sorry (formal)', 'word', '늦어서 죄송합니다', 'I\'m sorry for being late'),
      createContentItem('미안합니다', 'mianhamnida', 'I\'m sorry', 'word', '정말 미안합니다', 'I\'m really sorry'),
      createContentItem('미안해', 'mianhae', 'Sorry (informal)', 'word', '미안해, 실수했어', 'Sorry, I made a mistake'),
      createContentItem('미안해요', 'mianhaeyo', 'Sorry (casual)', 'word', '늦어서 미안해요', 'Sorry for being late'),
      createContentItem('실례합니다', 'sillyehamnida', 'Excuse me', 'word', '실례합니다, 지나가겠습니다', 'Excuse me, I\'m passing through'),

      // Introductions
      createContentItem('만나서 반갑습니다', 'mannaseo bangapseumnida', 'Nice to meet you', 'sentence', '처음 뵙겠습니다. 만나서 반갑습니다', 'How do you do. Nice to meet you'),
      createContentItem('반가워요', 'bangawoyo', 'Nice to meet you (casual)', 'sentence', '반가워요', 'Nice to meet you'),
      createContentItem('처음 뵙겠습니다', 'cheoeum boepgetseumnida', 'How do you do (first meeting)', 'sentence', '처음 뵙겠습니다', 'How do you do'),
      createContentItem('제 이름은', 'je ireumeun', 'My name is', 'sentence', '제 이름은 김민수입니다', 'My name is Kim Minsu'),
      createContentItem('이름이 뭐예요?', 'ireumi mwoyeyo?', 'What is your name?', 'sentence', '이름이 뭐예요?', 'What is your name?'),
      createContentItem('성함이 어떻게 되세요?', 'seonghami eotteoke doeseyo?', 'What is your name? (formal)', 'sentence', '성함이 어떻게 되세요?', 'What is your name?'),
      createContentItem('저는', 'jeoneun', 'I am / As for me', 'word', '저는 학생입니다', 'I am a student'),
      createContentItem('나는', 'naneun', 'I (informal)', 'word', '나는 한국 사람이야', 'I am Korean'),

      // How are you
      createContentItem('어떻게 지내세요?', 'eotteoke jinaeseyo?', 'How are you?', 'sentence', '요즘 어떻게 지내세요?', 'How have you been lately?'),
      createContentItem('잘 지내요?', 'jal jinaeyo?', 'How are you? (casual)', 'sentence', '잘 지내요?', 'How are you?'),
      createContentItem('어떠세요?', 'eotteoseyo?', 'How is it? / How are you?', 'sentence', '요즘 어떠세요?', 'How is it lately?'),
      createContentItem('잘 지내요', 'jal jinaeyo', 'I\'m doing well', 'sentence', '네, 잘 지내요', 'Yes, I\'m doing well'),
      createContentItem('잘 지냈어요', 'jal jinaesseoyo', 'I\'ve been well', 'sentence', '잘 지냈어요, 고마워요', 'I\'ve been well, thanks'),
      createContentItem('괜찮아요', 'gwaenchanayo', 'I\'m okay', 'sentence', '괜찮아요', 'I\'m okay'),
      createContentItem('그냥 그래요', 'geunyang geuraeyo', 'So-so / Just okay', 'sentence', '그냥 그래요', 'Just okay'),
      createContentItem('좋아요', 'johayo', 'Good / I\'m good', 'sentence', '아주 좋아요', 'Very good'),

      // Basic questions
      createContentItem('네', 'ne', 'Yes', 'word', '네, 맞아요', 'Yes, that\'s right'),
      createContentItem('아니요', 'aniyo', 'No', 'word', '아니요, 아니에요', 'No, it\'s not'),
      createContentItem('예', 'ye', 'Yes (formal)', 'word', '예, 알겠습니다', 'Yes, I understand'),
      createContentItem('맞아요', 'majayo', 'That\'s right', 'sentence', '네, 맞아요', 'Yes, that\'s right'),
      createContentItem('틀려요', 'teullyeoyo', 'That\'s wrong', 'sentence', '아니요, 틀려요', 'No, that\'s wrong'),

      // Please
      createContentItem('주세요', 'juseyo', 'Please give me', 'word', '물 좀 주세요', 'Please give me some water'),
      createContentItem('해 주세요', 'hae juseyo', 'Please do it', 'sentence', '천천히 해 주세요', 'Please do it slowly'),
      createContentItem('도와주세요', 'dowajuseyo', 'Please help me', 'sentence', '도와주세요', 'Please help me'),
      createContentItem('가르쳐 주세요', 'gareuchyeo juseyo', 'Please teach me', 'sentence', '한국어를 가르쳐 주세요', 'Please teach me Korean'),

      // Basic courtesy
      createContentItem('수고하세요', 'sugohaseyo', 'Thank you for your work / Good luck', 'sentence', '오늘도 수고하세요', 'Thank you for your work today too'),
      createContentItem('조심하세요', 'josimhaseyo', 'Be careful / Take care', 'sentence', '조심하세요', 'Be careful'),
      createContentItem('안녕히 주무세요', 'annyeonghi jumuseyo', 'Good night', 'sentence', '안녕히 주무세요', 'Good night'),
      createContentItem('잘 자요', 'jal jayo', 'Sleep well (casual)', 'sentence', '잘 자요', 'Sleep well'),
      createContentItem('좋은 아침이에요', 'joeun achimieyo', 'Good morning', 'sentence', '좋은 아침이에요', 'Good morning'),
      createContentItem('좋은 하루 되세요', 'joeun haru doeseyo', 'Have a good day', 'sentence', '좋은 하루 되세요', 'Have a good day'),
      createContentItem('즐거운 주말 보내세요', 'jeulgeoun jumal bonaeseyo', 'Have a great weekend', 'sentence', '즐거운 주말 보내세요', 'Have a great weekend'),

      // Nationalities & Origins
      createContentItem('한국 사람', 'hanguk saram', 'Korean person', 'word', '저는 한국 사람입니다', 'I am Korean'),
      createContentItem('미국 사람', 'miguk saram', 'American person', 'word', '저는 미국 사람입니다', 'I am American'),
      createContentItem('어디에서 왔어요?', 'eodieseo wasseoyo?', 'Where are you from?', 'sentence', '어디에서 왔어요?', 'Where are you from?'),
      createContentItem('어느 나라 사람이에요?', 'eoneu nara saramieyo?', 'What nationality are you?', 'sentence', '어느 나라 사람이에요?', 'What nationality are you?'),

      // Occupations
      createContentItem('학생', 'haksaeng', 'Student', 'word', '저는 학생입니다', 'I am a student'),
      createContentItem('선생님', 'seonsaengnim', 'Teacher', 'word', '제 선생님입니다', 'This is my teacher'),
      createContentItem('회사원', 'hoesawon', 'Office worker', 'word', '저는 회사원입니다', 'I am an office worker'),
      createContentItem('의사', 'uisa', 'Doctor', 'word', '저는 의사입니다', 'I am a doctor'),

      // Family terms (basic)
      createContentItem('엄마', 'eomma', 'Mom', 'word', '우리 엄마', 'My mom'),
      createContentItem('아빠', 'appa', 'Dad', 'word', '우리 아빠', 'My dad'),
      createContentItem('가족', 'gajok', 'Family', 'word', '우리 가족', 'My family'),

      // Numbers 1-10
      createContentItem('하나', 'hana', 'One', 'word', '하나, 둘, 셋', 'One, two, three'),
      createContentItem('둘', 'dul', 'Two', 'word', '둘이에요', 'It\'s two'),
      createContentItem('셋', 'set', 'Three', 'word', '셋 있어요', 'There are three'),
      createContentItem('넷', 'net', 'Four', 'word', '넷 주세요', 'Please give me four'),
      createContentItem('다섯', 'daseot', 'Five', 'word', '다섯 개', 'Five items'),
      createContentItem('여섯', 'yeoseot', 'Six', 'word', '여섯 명', 'Six people'),
      createContentItem('일곱', 'ilgop', 'Seven', 'word', '일곱 시', 'Seven o\'clock'),
      createContentItem('여덟', 'yeodeol', 'Eight', 'word', '여덟 개', 'Eight items'),
      createContentItem('아홉', 'ahop', 'Nine', 'word', '아홉 번', 'Nine times'),
      createContentItem('열', 'yeol', 'Ten', 'word', '열 개', 'Ten items'),

      // Sino-Korean numbers 1-10
      createContentItem('일', 'il', 'One (Sino)', 'word', '일 분', 'One minute'),
      createContentItem('이', 'i', 'Two (Sino)', 'word', '이 월', 'February'),
      createContentItem('삼', 'sam', 'Three (Sino)', 'word', '삼 층', 'Third floor'),
      createContentItem('사', 'sa', 'Four (Sino)', 'word', '사 월', 'April'),
      createContentItem('오', 'o', 'Five (Sino)', 'word', '오 시', 'Five o\'clock'),
      createContentItem('육', 'yuk', 'Six (Sino)', 'word', '육 일', 'Sixth day'),
      createContentItem('칠', 'chil', 'Seven (Sino)', 'word', '칠 월', 'July'),
      createContentItem('팔', 'pal', 'Eight (Sino)', 'word', '팔 층', 'Eighth floor'),
      createContentItem('구', 'gu', 'Nine (Sino)', 'word', '구 시', 'Nine o\'clock'),
      createContentItem('십', 'sip', 'Ten (Sino)', 'word', '십 원', 'Ten won'),

      // Basic verbs
      createContentItem('있어요', 'isseoyo', 'There is / Have', 'word', '시간 있어요?', 'Do you have time?'),
      createContentItem('없어요', 'eopseoyo', 'There isn\'t / Don\'t have', 'word', '시간 없어요', 'I don\'t have time'),
      createContentItem('가요', 'gayo', 'Go', 'word', '집에 가요', 'I\'m going home'),
      createContentItem('와요', 'wayo', 'Come', 'word', '이리 와요', 'Come here'),
      createContentItem('먹어요', 'meogeoyo', 'Eat', 'word', '밥 먹어요', 'I eat rice'),
      createContentItem('마셔요', 'masyeoyo', 'Drink', 'word', '물 마셔요', 'I drink water'),
      createContentItem('해요', 'haeyo', 'Do', 'word', '숙제 해요', 'I do homework'),
      createContentItem('봐요', 'bwayo', 'See / Watch', 'word', '영화 봐요', 'I watch a movie'),
      createContentItem('읽어요', 'ilgeoyo', 'Read', 'word', '책을 읽어요', 'I read a book'),
      createContentItem('써요', 'sseoyo', 'Write / Use', 'word', '편지를 써요', 'I write a letter'),

      // More basic expressions
      createContentItem('알겠습니다', 'algetseumnida', 'I understand', 'sentence', '네, 알겠습니다', 'Yes, I understand'),
      createContentItem('알았어요', 'arasseoyo', 'I got it / I understand', 'sentence', '알았어요', 'I got it'),
      createContentItem('몰라요', 'mollayo', 'I don\'t know', 'sentence', '몰라요', 'I don\'t know'),
      createContentItem('모르겠어요', 'moreugesseoyo', 'I don\'t know', 'sentence', '잘 모르겠어요', 'I don\'t really know'),
      createContentItem('아직', 'ajik', 'Yet / Still', 'word', '아직 몰라요', 'I don\'t know yet'),
      createContentItem('이미', 'imi', 'Already', 'word', '이미 먹었어요', 'I already ate'),
      createContentItem('벌써', 'beolsseo', 'Already', 'word', '벌써 끝났어요', 'It\'s already finished'),
      createContentItem('지금', 'jigeum', 'Now', 'word', '지금 가요', 'I\'m going now'),
      createContentItem('오늘', 'oneul', 'Today', 'word', '오늘 날씨가 좋아요', 'The weather is nice today'),
      createContentItem('내일', 'naeil', 'Tomorrow', 'word', '내일 봐요', 'See you tomorrow'),
      createContentItem('어제', 'eoje', 'Yesterday', 'word', '어제 만났어요', 'I met yesterday')
    ]
  },

  // ==========================================
  // GREETINGS - INTERMEDIATE (100+ items)
  // ==========================================
  {
    title: 'Polite Expressions & Social Phrases',
    category: 'greetings',
    difficulty: 'intermediate',
    content: [
      createContentItem('오래간만입니다', 'oraegamanimnida', 'Long time no see', 'sentence', '정말 오래간만입니다', 'It\'s been a really long time'),
      createContentItem('오랜만이에요', 'oraenmanieyo', 'Long time no see (casual)', 'sentence', '오랜만이에요', 'Long time no see'),
      createContentItem('오랜만', 'oraenman', 'Long time (informal)', 'word', '정말 오랜만이야', 'It\'s been a long time'),
      createContentItem('수고하셨습니다', 'sugohasyeotseumnida', 'Thank you for your hard work', 'sentence', '오늘도 수고하셨습니다', 'Thank you for your hard work today'),
      createContentItem('수고 많으셨어요', 'sugo manheusyeosseoyo', 'You worked hard', 'sentence', '오늘 수고 많으셨어요', 'You worked hard today'),
      createContentItem('고생하셨어요', 'gosaenghasyeosseoyo', 'You\'ve been through a lot', 'sentence', '고생하셨어요', 'You\'ve been through a lot'),
      createContentItem('애쓰셨어요', 'aesseusyeosseoyo', 'You worked hard / Thanks for your effort', 'sentence', '정말 애쓰셨어요', 'You really worked hard'),

      // Polite requests
      createContentItem('부탁드립니다', 'butakdeurimnida', 'I request / Please', 'sentence', '잘 부탁드립니다', 'I kindly request'),
      createContentItem('부탁해요', 'butakaeyo', 'Please (casual)', 'sentence', '부탁해요', 'Please'),
      createContentItem('도와주시겠어요?', 'dowajusigesseoyo?', 'Could you help me?', 'sentence', '좀 도와주시겠어요?', 'Could you help me a bit?'),
      createContentItem('괜찮으시면', 'gwaenchanheusimyeon', 'If it\'s okay with you', 'sentence', '괜찮으시면 도와주세요', 'If it\'s okay, please help'),
      createContentItem('가능하시면', 'ganeunghasimyeon', 'If possible', 'sentence', '가능하시면 연락 주세요', 'If possible, please contact me'),

      // Expressing gratitude
      createContentItem('감사의 말씀 드립니다', 'gamsaui malsseum deurimnida', 'I express my gratitude', 'sentence', '진심으로 감사의 말씀 드립니다', 'I sincerely express my gratitude'),
      createContentItem('정말 감사합니다', 'jeongmal gamsahamnida', 'Thank you very much', 'sentence', '도와주셔서 정말 감사합니다', 'Thank you very much for helping'),
      createContentItem('대단히 감사합니다', 'daedanhi gamsahamnida', 'Thank you very much', 'sentence', '대단히 감사합니다', 'Thank you very much'),
      createContentItem('너무 고마워요', 'neomu gomawoyo', 'Thank you so much', 'sentence', '너무 고마워요', 'Thank you so much'),
      createContentItem('신세 졌습니다', 'sinse jyeotseumnida', 'I\'m indebted to you', 'sentence', '정말 신세 졌습니다', 'I\'m really indebted to you'),

      // Apologizing (advanced)
      createContentItem('대단히 죄송합니다', 'daedanhi joesonghamnida', 'I\'m very sorry', 'sentence', '대단히 죄송합니다', 'I\'m very sorry'),
      createContentItem('진심으로 사과드립니다', 'jinsimeuro sagwadeurimnida', 'I sincerely apologize', 'sentence', '진심으로 사과드립니다', 'I sincerely apologize'),
      createContentItem('제 잘못입니다', 'je jalmositseumnida', 'It\'s my fault', 'sentence', '제 잘못입니다', 'It\'s my fault'),
      createContentItem('용서해 주세요', 'yongseohae juseyo', 'Please forgive me', 'sentence', '용서해 주세요', 'Please forgive me'),
      createContentItem('실례했습니다', 'sillyehaetseumnida', 'I was rude / Excuse me', 'sentence', '실례했습니다', 'Excuse me'),

      // Concern and care
      createContentItem('괜찮으세요?', 'gwaenchaneuseyo?', 'Are you okay?', 'sentence', '괜찮으세요?', 'Are you okay?'),
      createContentItem('몸 조심하세요', 'mom josimhaseyo', 'Take care of your health', 'sentence', '몸 조심하세요', 'Take care of your health'),
      createContentItem('건강하세요', 'geonganghaseyo', 'Stay healthy', 'sentence', '건강하세요', 'Stay healthy'),
      createContentItem('무리하지 마세요', 'murihaji maseyo', 'Don\'t overdo it', 'sentence', '무리하지 마세요', 'Don\'t overdo it'),
      createContentItem('편히 쉬세요', 'pyeonhi swiseyo', 'Rest comfortably', 'sentence', '편히 쉬세요', 'Rest comfortably'),

      // Encouragement
      createContentItem('힘내세요', 'himnaeseyo', 'Cheer up / Keep it up', 'sentence', '힘내세요', 'Cheer up'),
      createContentItem('화이팅', 'hwaiting', 'Fighting / You can do it', 'word', '화이팅!', 'You can do it!'),
      createContentItem('잘 될 거예요', 'jal doel geoyeyo', 'It will be okay', 'sentence', '걱정하지 마세요. 잘 될 거예요', 'Don\'t worry. It will be okay'),
      createContentItem('할 수 있어요', 'hal su isseoyo', 'You can do it', 'sentence', '당신은 할 수 있어요', 'You can do it'),
      createContentItem('걱정하지 마세요', 'geokjeonghaji maseyo', 'Don\'t worry', 'sentence', '걱정하지 마세요', 'Don\'t worry'),

      // Congratulations
      createContentItem('축하합니다', 'chukahamnida', 'Congratulations', 'sentence', '졸업을 축하합니다', 'Congratulations on your graduation'),
      createContentItem('축하해요', 'chukahaeyo', 'Congratulations (casual)', 'sentence', '생일 축하해요', 'Happy birthday'),
      createContentItem('잘했어요', 'jalhaesseoyo', 'Well done', 'sentence', '정말 잘했어요', 'You did really well'),
      createContentItem('대단하시네요', 'daedanhasineyo', 'That\'s amazing', 'sentence', '정말 대단하시네요', 'That\'s really amazing'),

      // Sympathy
      createContentItem('안됐네요', 'andwaenneyo', 'That\'s too bad', 'sentence', '정말 안됐네요', 'That\'s really too bad'),
      createContentItem('유감입니다', 'yugamimnida', 'I\'m sorry to hear that', 'sentence', '정말 유감입니다', 'I\'m really sorry to hear that'),
      createContentItem('힘드시겠어요', 'himdeuisigesseoyo', 'It must be hard', 'sentence', '많이 힘드시겠어요', 'It must be very hard'),

      // Welcoming
      createContentItem('어서 오세요', 'eoseo oseyo', 'Welcome', 'sentence', '어서 오세요', 'Welcome'),
      createContentItem('환영합니다', 'hwanyeonghamnida', 'Welcome (formal)', 'sentence', '환영합니다', 'Welcome'),
      createContentItem('오신 것을 환영합니다', 'osin geoseul hwanyeonghamnida', 'We welcome your visit', 'sentence', '오신 것을 환영합니다', 'We welcome your visit'),

      // Seasonal greetings
      createContentItem('새해 복 많이 받으세요', 'saehae bok manhi badeuseyo', 'Happy New Year', 'sentence', '새해 복 많이 받으세요', 'Happy New Year'),
      createContentItem('즐거운 크리스마스 보내세요', 'jeulgeoun keuriseumaseu bonaeseyo', 'Merry Christmas', 'sentence', '즐거운 크리스마스 보내세요', 'Merry Christmas'),
      createContentItem('추석 잘 보내세요', 'chuseok jal bonaeseyo', 'Have a good Chuseok', 'sentence', '추석 잘 보내세요', 'Have a good Chuseok'),

      // Age and asking personal info
      createContentItem('나이가 어떻게 되세요?', 'naiga eotteoke doeseyo?', 'How old are you?', 'sentence', '실례지만 나이가 어떻게 되세요?', 'Excuse me, but how old are you?'),
      createContentItem('몇 살이에요?', 'myeot sarieyo?', 'How old are you?', 'sentence', '몇 살이에요?', 'How old are you?'),
      createContentItem('직업이 뭐예요?', 'jigeobi mwoyeyo?', 'What is your job?', 'sentence', '직업이 뭐예요?', 'What is your job?'),
      createContentItem('무슨 일 하세요?', 'museun il haseyo?', 'What do you do?', 'sentence', '무슨 일 하세요?', 'What do you do?'),
      createContentItem('어디에 사세요?', 'eodie saseyo?', 'Where do you live?', 'sentence', '어디에 사세요?', 'Where do you live?'),
      createContentItem('고향이 어디예요?', 'gohyangi eodiyeyo?', 'Where is your hometown?', 'sentence', '고향이 어디예요?', 'Where is your hometown?'),

      // Making suggestions
      createContentItem('어때요?', 'eottaeyo?', 'How about it?', 'sentence', '같이 가는 게 어때요?', 'How about going together?'),
      createContentItem('어떠세요?', 'eotteoseyo?', 'How about it? (formal)', 'sentence', '내일 만나시는 게 어떠세요?', 'How about meeting tomorrow?'),
      createContentItem('같이 갈까요?', 'gachi galkkayo?', 'Shall we go together?', 'sentence', '같이 갈까요?', 'Shall we go together?'),
      createContentItem('할까요?', 'halkkayo?', 'Shall we do it?', 'sentence', '뭐 먹을까요?', 'What shall we eat?'),

      // Agreement and disagreement
      createContentItem('동의합니다', 'donguihamnida', 'I agree', 'sentence', '완전히 동의합니다', 'I completely agree'),
      createContentItem('그렇게 생각해요', 'geureoke saenggakaeyo', 'I think so', 'sentence', '저도 그렇게 생각해요', 'I think so too'),
      createContentItem('그럴 수도 있어요', 'geureol sudo isseoyo', 'That could be', 'sentence', '그럴 수도 있어요', 'That could be'),
      createContentItem('확실해요', 'hwaksilhaeyo', 'I\'m sure', 'sentence', '확실해요', 'I\'m sure'),
      createContentItem('그렇지 않아요', 'geureochi anayo', 'That\'s not right', 'sentence', '그렇지 않아요', 'That\'s not right'),

      // Preferences
      createContentItem('좋아해요', 'johahaeyo', 'I like it', 'sentence', '저는 커피를 좋아해요', 'I like coffee'),
      createContentItem('싫어해요', 'sireohaeyo', 'I don\'t like it', 'sentence', '저는 매운 음식을 싫어해요', 'I don\'t like spicy food'),
      createContentItem('관심 있어요', 'gwansim isseoyo', 'I\'m interested', 'sentence', '한국 문화에 관심 있어요', 'I\'m interested in Korean culture'),
      createContentItem('별로예요', 'byeolloyeyo', 'Not really / Not particularly', 'sentence', '별로예요', 'Not really'),

      // Talking about weather
      createContentItem('날씨가 좋아요', 'nalssiga johayo', 'The weather is nice', 'sentence', '오늘 날씨가 좋아요', 'The weather is nice today'),
      createContentItem('날씨가 나빠요', 'nalssiga nappayo', 'The weather is bad', 'sentence', '오늘 날씨가 나빠요', 'The weather is bad today'),
      createContentItem('덥네요', 'deopneyo', 'It\'s hot', 'sentence', '오늘 정말 덥네요', 'It\'s really hot today'),
      createContentItem('춥네요', 'chupneyo', 'It\'s cold', 'sentence', '오늘 춥네요', 'It\'s cold today'),
      createContentItem('비가 와요', 'biga wayo', 'It\'s raining', 'sentence', '밖에 비가 와요', 'It\'s raining outside'),
      createContentItem('눈이 와요', 'nuni wayo', 'It\'s snowing', 'sentence', '눈이 와요', 'It\'s snowing'),

      // Expressing feelings
      createContentItem('기분이 좋아요', 'gibuni johayo', 'I feel good', 'sentence', '오늘 기분이 좋아요', 'I feel good today'),
      createContentItem('기분이 안 좋아요', 'gibuni an johayo', 'I don\'t feel good', 'sentence', '오늘 기분이 안 좋아요', 'I don\'t feel good today'),
      createContentItem('행복해요', 'haengbokhaeyo', 'I\'m happy', 'sentence', '정말 행복해요', 'I\'m really happy'),
      createContentItem('슬퍼요', 'seulpeoyo', 'I\'m sad', 'sentence', '슬퍼요', 'I\'m sad'),
      createContentItem('화가 나요', 'hwaga nayo', 'I\'m angry', 'sentence', '화가 나요', 'I\'m angry'),
      createContentItem('피곤해요', 'pigonhaeyo', 'I\'m tired', 'sentence', '너무 피곤해요', 'I\'m so tired'),
      createContentItem('지루해요', 'jiruhaeyo', 'I\'m bored', 'sentence', '지루해요', 'I\'m bored'),
      createContentItem('걱정돼요', 'geokjeongdwaeyo', 'I\'m worried', 'sentence', '걱정돼요', 'I\'m worried'),

      // Making phone calls
      createContentItem('여보세요', 'yeoboseyo', 'Hello (on phone)', 'word', '여보세요, 김민수입니다', 'Hello, this is Kim Minsu'),
      createContentItem('전화 주셔서 감사합니다', 'jeonhwa jusyeoseo gamsahamnida', 'Thank you for calling', 'sentence', '전화 주셔서 감사합니다', 'Thank you for calling'),
      createContentItem('다시 전화할게요', 'dasi jeonhwahalgeyo', 'I\'ll call again', 'sentence', '나중에 다시 전화할게요', 'I\'ll call again later'),
      createContentItem('메시지 남겨 주세요', 'mesiji namgyeo juseyo', 'Please leave a message', 'sentence', '메시지 남겨 주세요', 'Please leave a message'),
      createContentItem('통화 중이에요', 'tonghwa jungieyo', 'The line is busy', 'sentence', '통화 중이에요', 'The line is busy'),

      // Time expressions
      createContentItem('오전', 'ojeon', 'Morning / AM', 'word', '오전 10시', '10 AM'),
      createContentItem('오후', 'ohu', 'Afternoon / PM', 'word', '오후 3시', '3 PM'),
      createContentItem('낮', 'nat', 'Daytime', 'word', '낮에 만나요', 'Let\'s meet during the day'),
      createContentItem('밤', 'bam', 'Night', 'word', '밤에 전화할게요', 'I\'ll call at night'),
      createContentItem('아침', 'achim', 'Morning', 'word', '아침에 일어나요', 'I wake up in the morning'),
      createContentItem('저녁', 'jeonyeok', 'Evening', 'word', '저녁에 봐요', 'See you in the evening'),

      // Days of the week
      createContentItem('월요일', 'woryoil', 'Monday', 'word', '월요일에 만나요', 'Let\'s meet on Monday'),
      createContentItem('화요일', 'hwayoil', 'Tuesday', 'word', '화요일이에요', 'It\'s Tuesday'),
      createContentItem('수요일', 'suyoil', 'Wednesday', 'word', '수요일', 'Wednesday'),
      createContentItem('목요일', 'mogyoil', 'Thursday', 'word', '목요일', 'Thursday'),
      createContentItem('금요일', 'geumyoil', 'Friday', 'word', '금요일', 'Friday'),
      createContentItem('토요일', 'toyoil', 'Saturday', 'word', '토요일', 'Saturday'),
      createContentItem('일요일', 'iryoil', 'Sunday', 'word', '일요일', 'Sunday'),

      // Additional social phrases
      createContentItem('주말', 'jumal', 'Weekend', 'word', '주말에 뭐 해요?', 'What do you do on weekends?'),
      createContentItem('평일', 'pyeongil', 'Weekday', 'word', '평일에는 바빠요', 'I\'m busy on weekdays'),
      createContentItem('내일', 'naeil', 'Tomorrow', 'word', '내일 만나요', 'Let\'s meet tomorrow'),
      createContentItem('어제', 'eoje', 'Yesterday', 'word', '어제 뭐 했어요?', 'What did you do yesterday?'),
      createContentItem('오늘', 'oneul', 'Today', 'word', '오늘 시간 있어요?', 'Do you have time today?')
    ]
  },

  // ==========================================
  // GREETINGS - ADVANCED (100+ items)
  // ==========================================
  {
    title: 'Formal Business & Cultural Expressions',
    category: 'greetings',
    difficulty: 'advanced',
    content: [
      createContentItem('뵙게 되어 영광입니다', 'boepge doeeo yeonggwangimnida', 'It\'s an honor to meet you', 'sentence', '뵙게 되어 영광입니다', 'It\'s an honor to meet you'),
      createContentItem('오랫동안 기다려 왔습니다', 'oraetdongan gidaryeo watseumnida', 'I\'ve been looking forward to this for a long time', 'sentence', '이 만남을 오랫동안 기다려 왔습니다', 'I\'ve been looking forward to this meeting for a long time'),
      createContentItem('귀한 시간 내주셔서 감사합니다', 'gwihan sigan naejusyeoseo gamsahamnida', 'Thank you for your precious time', 'sentence', '귀한 시간 내주셔서 감사합니다', 'Thank you for your precious time'),
      createContentItem('번거롭게 해드려 죄송합니다', 'beongeoreopge haedeuryeo joesonghamnida', 'I\'m sorry to trouble you', 'sentence', '번거롭게 해드려 죄송합니다', 'I\'m sorry to trouble you'),
      createContentItem('폐를 끼쳐 드려 죄송합니다', 'pyereul kkichyeo deuryeo joesonghamnida', 'I apologize for causing you trouble', 'sentence', '폐를 끼쳐 드려 죄송합니다', 'I apologize for causing you trouble'),

      // Business formalities
      createContentItem('명함을 주고받다', 'myeonghameul jugobatda', 'To exchange business cards', 'sentence', '먼저 명함을 주고받겠습니다', 'Let\'s exchange business cards first'),
      createContentItem('명함 받으시겠습니까?', 'myeongham badeusigetsseumnikka?', 'Would you like my card?', 'sentence', '명함 받으시겠습니까?', 'Would you like my card?'),
      createContentItem('앞으로 잘 부탁드립니다', 'apeuro jal butakdeurimnida', 'I look forward to working with you', 'sentence', '앞으로 잘 부탁드립니다', 'I look forward to working with you'),
      createContentItem('귀사의 발전을 기원합니다', 'gwisaui baljeon-eul giwonhamnida', 'I wish your company prosperity', 'sentence', '귀사의 발전을 기원합니다', 'I wish your company prosperity'),
      createContentItem('성원에 감사드립니다', 'seongwone gamsadeurimnida', 'Thank you for your support', 'sentence', '많은 성원에 감사드립니다', 'Thank you for your great support'),

      // Formal meetings
      createContentItem('회의 시작하겠습니다', 'hoeui sijakhagetseumnida', 'Let\'s start the meeting', 'sentence', '지금부터 회의 시작하겠습니다', 'Let\'s start the meeting now'),
      createContentItem('의견을 말씀해 주시기 바랍니다', 'uigyeoneul malssumhae jusigi baramnida', 'Please share your opinion', 'sentence', '여러분의 의견을 말씀해 주시기 바랍니다', 'Please share your opinions'),
      createContentItem('검토해 보시겠습니까?', 'geomtohae bosigetsseumnikka?', 'Would you like to review it?', 'sentence', '먼저 검토해 보시겠습니까?', 'Would you like to review it first?'),
      createContentItem('결정을 내려야 합니다', 'gyeoljeongeul naeryeoya hamnida', 'We need to make a decision', 'sentence', '오늘 결정을 내려야 합니다', 'We need to make a decision today'),

      // Honorific expressions
      createContentItem('계시다', 'gyesida', 'To be (honorific)', 'word', '사장님이 계십니까?', 'Is the president here?'),
      createContentItem('드시다', 'deusida', 'To eat (honorific)', 'word', '식사하셨습니까?', 'Have you eaten?'),
      createContentItem('주무시다', 'jumusida', 'To sleep (honorific)', 'word', '편히 주무세요', 'Sleep well'),
      createContentItem('말씀하시다', 'malsseumasida', 'To speak (honorific)', 'word', '말씀해 주세요', 'Please speak'),
      createContentItem('여쭙다', 'yeojjipda', 'To ask (humble)', 'word', '여쭤봐도 될까요?', 'May I ask?'),
      createContentItem('드리다', 'deurida', 'To give (humble)', 'word', '선물을 드립니다', 'I give a gift'),
      createContentItem('뵙다', 'boepda', 'To see/meet (humble)', 'word', '내일 뵙겠습니다', 'I will see you tomorrow'),

      // Expressing deep gratitude
      createContentItem('진심으로 감사드립니다', 'jinsimeuro gamsadeurimnida', 'I sincerely thank you', 'sentence', '진심으로 감사드립니다', 'I sincerely thank you'),
      createContentItem('깊이 감사드립니다', 'gipi gamsadeurimnida', 'I deeply thank you', 'sentence', '깊이 감사드립니다', 'I deeply thank you'),
      createContentItem('은혜를 잊지 않겠습니다', 'eunhyereul itji anketseumnida', 'I won\'t forget your kindness', 'sentence', '은혜를 잊지 않겠습니다', 'I won\'t forget your kindness'),
      createContentItem('보답하겠습니다', 'bodapagetseumnida', 'I will repay you', 'sentence', '꼭 보답하겠습니다', 'I will surely repay you'),

      // Deep apologies
      createContentItem('심려를 끼쳐 드려 죄송합니다', 'simnyeoreul kkichyeo deuryeo joesonghamnida', 'I\'m sorry for causing you concern', 'sentence', '심려를 끼쳐 드려 죄송합니다', 'I\'m sorry for causing you concern'),
      createContentItem('불편을 드려 죄송합니다', 'bulpyeoneul deuryeo joesonghamnida', 'I apologize for the inconvenience', 'sentence', '불편을 드려 죄송합니다', 'I apologize for the inconvenience'),
      createContentItem('용서를 구합니다', 'yongseoreul guhamnida', 'I ask for forgiveness', 'sentence', '용서를 구합니다', 'I ask for forgiveness'),
      createContentItem('변명의 여지가 없습니다', 'byeonmyeongui yeojiga eopseumnida', 'There\'s no excuse', 'sentence', '변명의 여지가 없습니다', 'There\'s no excuse'),

      // Formal requests
      createContentItem('부디', 'budi', 'Please (formal)', 'word', '부디 양해해 주시기 바랍니다', 'Please understand'),
      createContentItem('삼가 부탁드립니다', 'samga butakdeurimnida', 'I humbly request', 'sentence', '삼가 부탁드립니다', 'I humbly request'),
      createContentItem('고려해 주시기 바랍니다', 'goryeohae jusigi baramnida', 'Please consider', 'sentence', '긍정적으로 고려해 주시기 바랍니다', 'Please consider positively'),
      createContentItem('협조해 주시면 감사하겠습니다', 'hyeopjohae jusimyeon gamsahagetseumnida', 'I would appreciate your cooperation', 'sentence', '협조해 주시면 감사하겠습니다', 'I would appreciate your cooperation'),

      // Condolences
      createContentItem('삼가 고인의 명복을 빕니다', 'samga goinui myeongbogeul bimnida', 'May the deceased rest in peace', 'sentence', '삼가 고인의 명복을 빕니다', 'May the deceased rest in peace'),
      createContentItem('조의를 표합니다', 'jouireul pyohamnida', 'I express my condolences', 'sentence', '조의를 표합니다', 'I express my condolences'),
      createContentItem('위로의 말씀을 드립니다', 'wiroui malsseumeul deurimnida', 'I offer my condolences', 'sentence', '위로의 말씀을 드립니다', 'I offer my condolences'),

      // Celebrations (formal)
      createContentItem('경사를 축하드립니다', 'gyeongsareul chukadeurimnida', 'Congratulations on your celebration', 'sentence', '경사를 축하드립니다', 'Congratulations on your celebration'),
      createContentItem('영광스러운 날을 축하합니다', 'yeonggwangseureon nareul chukahamnida', 'Congratulations on this glorious day', 'sentence', '영광스러운 날을 축하합니다', 'Congratulations on this glorious day'),
      createContentItem('무궁한 발전을 기원합니다', 'mugunghan baljeoneul giwonhamnida', 'I wish you endless development', 'sentence', '무궁한 발전을 기원합니다', 'I wish you endless development'),

      // Ceremonies and events
      createContentItem('개회사를 드리겠습니다', 'gaehoesareul deurigetseumnida', 'I will give the opening speech', 'sentence', '개회사를 드리겠습니다', 'I will give the opening speech'),
      createContentItem('폐회를 선언합니다', 'pyehoereul seoneonhamnida', 'I declare the closing', 'sentence', '이것으로 폐회를 선언합니다', 'With this, I declare the closing'),
      createContentItem('건배를 제의합니다', 'geonbaereul jeuihamnida', 'I propose a toast', 'sentence', '건배를 제의합니다', 'I propose a toast'),
      createContentItem('박수를 부탁드립니다', 'baksureul butakdeurimnida', 'Please give a round of applause', 'sentence', '큰 박수를 부탁드립니다', 'Please give a big round of applause'),

      // Invitations (formal)
      createContentItem('초대에 응해 주셔서 감사합니다', 'chodaee eunghae jusyeoseo gamsahamnida', 'Thank you for accepting the invitation', 'sentence', '초대에 응해 주셔서 감사합니다', 'Thank you for accepting the invitation'),
      createContentItem('참석해 주시기 바랍니다', 'chamseokae jusigi baramnida', 'Please attend', 'sentence', '꼭 참석해 주시기 바랍니다', 'Please be sure to attend'),
      createContentItem('광림하여 주시면 감사하겠습니다', 'gwangnimhayeo jusimyeon gamsahagetseumnida', 'We would appreciate your presence', 'sentence', '광림하여 주시면 감사하겠습니다', 'We would appreciate your presence'),

      // Professional courtesy
      createContentItem('실례지만', 'sillyejiman', 'Excuse me, but', 'word', '실례지만 여쭤봐도 될까요?', 'Excuse me, but may I ask?'),
      createContentItem('송구스럽지만', 'songguseureopjiman', 'I\'m sorry to bother you, but', 'word', '송구스럽지만 부탁이 있습니다', 'I\'m sorry to bother you, but I have a request'),
      createContentItem('주제넘은 말씀이지만', 'jujeneobeun malsseumijiman', 'This may be presumptuous, but', 'sentence', '주제넘은 말씀이지만', 'This may be presumptuous, but'),
      createContentItem('감히 말씀드리자면', 'gamhi malsseumdeurijamyeon', 'If I may dare to say', 'sentence', '감히 말씀드리자면', 'If I may dare to say'),

      // Business negotiations
      createContentItem('재고해 보시겠습니까?', 'jaegohae bosigetsseumnikka?', 'Would you reconsider?', 'sentence', '다시 한 번 재고해 보시겠습니까?', 'Would you reconsider once more?'),
      createContentItem('조정이 가능하십니까?', 'jojeongi ganeunghashipnikka?', 'Is adjustment possible?', 'sentence', '가격 조정이 가능하십니까?', 'Is price adjustment possible?'),
      createContentItem('타협점을 찾아야 합니다', 'tahyeopjeomdareul chajaya hamnida', 'We need to find a compromise', 'sentence', '타협점을 찾아야 합니다', 'We need to find a compromise'),
      createContentItem('검토 후 연락드리겠습니다', 'geomto hu yeonrakdeurigetseumnida', 'I will contact you after review', 'sentence', '검토 후 연락드리겠습니다', 'I will contact you after review'),

      // Expressing opinions formally
      createContentItem('소견으로는', 'sogyeoneuro-neun', 'In my opinion', 'word', '제 소견으로는', 'In my opinion'),
      createContentItem('사료됩니다', 'saryodoeemnida', 'It is thought / considered', 'word', '적절하다고 사료됩니다', 'It is considered appropriate'),
      createContentItem('제안하는 바입니다', 'jeanhaneun baimnida', 'This is what I propose', 'sentence', '이것이 제안하는 바입니다', 'This is what I propose'),
      createContentItem('견해를 밝히자면', 'gyeonhaereul balkhijamyeon', 'To express my view', 'sentence', '제 견해를 밝히자면', 'To express my view'),

      // Agreement in business
      createContentItem('전적으로 동의합니다', 'jeonjeogeuro donguihamnida', 'I completely agree', 'sentence', '전적으로 동의합니다', 'I completely agree'),
      createContentItem('이의가 없습니다', 'uiga eopseumnida', 'I have no objection', 'sentence', '이의가 없습니다', 'I have no objection'),
      createContentItem('찬성합니다', 'chanseonghamnida', 'I agree / I\'m in favor', 'sentence', '찬성합니다', 'I\'m in favor'),
      createContentItem('승인하겠습니다', 'seunginhagesseumnida', 'I will approve', 'sentence', '승인하겠습니다', 'I will approve'),

      // Disagreement (polite)
      createContentItem('유감스럽게도', 'yugamseureopgedo', 'Unfortunately / Regrettably', 'word', '유감스럽게도 동의할 수 없습니다', 'Unfortunately, I cannot agree'),
      createContentItem('다소 의견이 다릅니다', 'daso uigyeoni dareubnida', 'My opinion differs somewhat', 'sentence', '다소 의견이 다릅니다', 'My opinion differs somewhat'),
      createContentItem('재고가 필요하다고 봅니다', 'jaegoga piryohadago bomnida', 'I think reconsideration is needed', 'sentence', '재고가 필요하다고 봅니다', 'I think reconsideration is needed'),

      // Expressing hope
      createContentItem('바라마지 않습니다', 'baramaji anseumnida', 'I sincerely hope', 'sentence', '성공하시기를 바라마지 않습니다', 'I sincerely hope you succeed'),
      createContentItem('기대하고 있습니다', 'gidaehago itseumnida', 'I\'m looking forward to', 'sentence', '좋은 결과를 기대하고 있습니다', 'I\'m looking forward to good results'),
      createContentItem('기원합니다', 'giwonhamnida', 'I wish / I pray', 'sentence', '건강하시기를 기원합니다', 'I wish you good health'),

      // Closing remarks
      createContentItem('마지막으로', 'majimageuro', 'Finally / Lastly', 'word', '마지막으로 감사 인사를 드립니다', 'Finally, I express my thanks'),
      createContentItem('결론적으로', 'gyeollonjeogeuro', 'In conclusion', 'word', '결론적으로 말씀드리면', 'In conclusion'),
      createContentItem('요약하자면', 'yoyaghajamyeon', 'To summarize', 'word', '요약하자면', 'To summarize'),
      createContentItem('이상으로 마치겠습니다', 'isangeuro machigetseumnida', 'I will conclude with this', 'sentence', '이상으로 발표를 마치겠습니다', 'I will conclude my presentation with this'),

      // Expressions of humility
      createContentItem('부족하지만', 'bujokajiman', 'Though I\'m lacking', 'word', '부족하지만 열심히 하겠습니다', 'Though I\'m lacking, I will do my best'),
      createContentItem('미흡하지만', 'miheupajiman', 'Though inadequate', 'word', '미흡하지만 최선을 다하겠습니다', 'Though inadequate, I will do my best'),
      createContentItem('과분한 칭찬입니다', 'gwabunhan chingchanimnida', 'You praise me too much', 'sentence', '과분한 칭찬입니다', 'You praise me too much'),
      createContentItem('송구스럽습니다', 'songguseureopseumnida', 'I\'m very sorry / I feel ashamed', 'sentence', '송구스럽습니다', 'I\'m very sorry'),

      // Sophisticated time expressions
      createContentItem('조만간', 'jomangan', 'Soon / Before long', 'word', '조만간 연락드리겠습니다', 'I will contact you soon'),
      createContentItem('차후에', 'chahue', 'Later / In the future', 'word', '차후에 논의하겠습니다', 'We will discuss it later'),
      createContentItem('언젠가', 'eonjenga', 'Someday', 'word', '언젠가 꼭 이루겠습니다', 'I will surely achieve it someday'),
      createContentItem('당장', 'dangjang', 'Right now / Immediately', 'word', '당장 처리하겠습니다', 'I will handle it immediately'),

      // Addressing seniors/superiors
      createContentItem('선배님', 'seonbaenim', 'Senior (honorific)', 'word', '선배님, 조언 부탁드립니다', 'Senior, please give me advice'),
      createContentItem('교수님', 'gyosunim', 'Professor (honorific)', 'word', '교수님, 질문이 있습니다', 'Professor, I have a question'),
      createContentItem('사장님', 'sajangnim', 'President / CEO (honorific)', 'word', '사장님께서 오셨습니다', 'The president has arrived'),
      createContentItem('회장님', 'hoejangnim', 'Chairman (honorific)', 'word', '회장님 말씀이십니다', 'This is the chairman speaking'),

      // Complex courtesy phrases
      createContentItem('염치불구하고', 'yeomchibulguhago', 'Shamelessly / Presumptuously', 'word', '염치불구하고 부탁드립니다', 'I presumptuously ask this favor'),
      createContentItem('누를 끼치다', 'nureul kkichida', 'To cause trouble', 'sentence', '누를 끼쳐 죄송합니다', 'I\'m sorry for causing trouble'),
      createContentItem('신세를 지다', 'sinsereul jida', 'To be indebted', 'sentence', '큰 신세를 졌습니다', 'I am greatly indebted'),
      createContentItem('배려해 주시다', 'baeryeohae jusida', 'To be considerate', 'sentence', '배려해 주셔서 감사합니다', 'Thank you for your consideration'),

      // Additional formal business expressions
      createContentItem('하명하시다', 'hamyeonghashida', 'To command / To order (very respectful)', 'word', '하명하신 대로 하겠습니다', 'I will do as you command'),
      createContentItem('지시하시다', 'jishihashida', 'To instruct (honorific)', 'word', '지시하신 사항을 확인했습니다', 'I confirmed what you instructed'),
      createContentItem('승낙하시다', 'seungnakhashida', 'To consent (honorific)', 'word', '승낙해 주셔서 감사합니다', 'Thank you for consenting'),
      createContentItem('양해를 구하다', 'yanghaereul guhada', 'To ask for understanding', 'sentence', '양해를 구합니다', 'I ask for your understanding'),
      createContentItem('관대하게 봐주시다', 'gwandaehage bwajusida', 'To look upon generously', 'sentence', '관대하게 봐주시기 바랍니다', 'Please look upon this generously'),
      createContentItem('각별히 부탁드리다', 'gakbyeolhi butakdeurida', 'To especially request', 'sentence', '각별히 부탁드립니다', 'I especially request this'),
      createContentItem('면목이 없다', 'myeonmogi eopda', 'To have no face / To be ashamed', 'sentence', '면목이 없습니다', 'I am ashamed'),
      createContentItem('더할 나위 없이', 'deohal nawi eopsi', 'Extremely / Couldn\'t be better', 'word', '더할 나위 없이 감사합니다', 'I am extremely grateful'),
      createContentItem('황송하다', 'hwangsonghada', 'To be honored beyond measure', 'word', '황송하게도 상을 받았습니다', 'I was honored beyond measure to receive an award'),
      createContentItem('망극하다', 'manggeukada', 'To be extremely grateful / overwhelmed', 'word', '망극한 은혜입니다', 'It is an overwhelming kindness'),
      createContentItem('경청하다', 'gyeongcheonghada', 'To listen attentively', 'word', '경청해 주셔서 감사합니다', 'Thank you for listening attentively'),
      createContentItem('숙고하다', 'sukgohada', 'To consider deeply', 'word', '숙고해 보겠습니다', 'I will consider it deeply'),
      createContentItem('헤아려 주시다', 'hearyeo jusida', 'To understand / To sympathize', 'sentence', '마음을 헤아려 주셔서 감사합니다', 'Thank you for understanding my heart')
    ]
  },

  // ==========================================
  // DAILY LIFE - BEGINNER (100+ items)
  // ==========================================
  {
    title: 'Daily Life & Routines',
    category: 'daily-life',
    difficulty: 'beginner',
    content: [
      // Time words
      createContentItem('아침', 'achim', 'Morning', 'word', '아침에 일어나요', 'I wake up in the morning'),
      createContentItem('점심', 'jeomsim', 'Lunch', 'word', '점심 먹었어요?', 'Did you eat lunch?'),
      createContentItem('저녁', 'jeonyeok', 'Dinner/Evening', 'word', '저녁에 뭐 할 거예요?', 'What will you do in the evening?'),
      createContentItem('밤', 'bam', 'Night', 'word', '밤에 자요', 'I sleep at night'),
      createContentItem('낮', 'nat', 'Daytime', 'word', '낮에 일해요', 'I work during the day'),
      createContentItem('새벽', 'saebyeok', 'Dawn', 'word', '새벽에 일어났어요', 'I woke up at dawn'),

      // Places
      createContentItem('집', 'jip', 'House/Home', 'word', '집에 가요', 'I\'m going home'),
      createContentItem('학교', 'hakgyo', 'School', 'word', '학교에 가요', 'I go to school'),
      createContentItem('회사', 'hoesa', 'Company/Office', 'word', '회사에 다녀요', 'I go to work'),
      createContentItem('방', 'bang', 'Room', 'word', '방에 있어요', 'I\'m in the room'),
      createContentItem('부엌', 'bueok', 'Kitchen', 'word', '부엌에서 요리해요', 'I cook in the kitchen'),
      createContentItem('화장실', 'hwajangsil', 'Bathroom', 'word', '화장실이 어디예요?', 'Where is the bathroom?'),
      createContentItem('거실', 'geosil', 'Living room', 'word', '거실에서 쉬어요', 'I rest in the living room'),
      createContentItem('침실', 'chimsil', 'Bedroom', 'word', '침실에서 자요', 'I sleep in the bedroom'),
      createContentItem('문', 'mun', 'Door', 'word', '문을 열어요', 'I open the door'),
      createContentItem('창문', 'changmun', 'Window', 'word', '창문을 닫아요', 'I close the window'),
      createContentItem('의자', 'uija', 'Chair', 'word', '의자에 앉아요', 'I sit on a chair'),
      createContentItem('책상', 'chaeksang', 'Desk', 'word', '책상 위에 있어요', 'It\'s on the desk'),
      createContentItem('침대', 'chimdae', 'Bed', 'word', '침대에서 자요', 'I sleep on the bed'),
      createContentItem('소파', 'sopa', 'Sofa', 'word', '소파에 앉아요', 'I sit on the sofa'),

      // Daily activities
      createContentItem('일어나다', 'ireonada', 'To wake up', 'word', '아침에 일어나요', 'I wake up in the morning'),
      createContentItem('자다', 'jada', 'To sleep', 'word', '밤에 자요', 'I sleep at night'),
      createContentItem('먹다', 'meokda', 'To eat', 'word', '밥을 먹어요', 'I eat rice'),
      createContentItem('마시다', 'masida', 'To drink', 'word', '물을 마셔요', 'I drink water'),
      createContentItem('씻다', 'ssitda', 'To wash', 'word', '얼굴을 씻어요', 'I wash my face'),
      createContentItem('샤워하다', 'syawohada', 'To shower', 'word', '샤워해요', 'I take a shower'),
      createContentItem('목욕하다', 'mogyokada', 'To bathe', 'word', '목욕해요', 'I take a bath'),
      createContentItem('요리하다', 'yorihada', 'To cook', 'word', '요리를 해요', 'I cook'),
      createContentItem('청소하다', 'cheongsohada', 'To clean', 'word', '방을 청소해요', 'I clean the room'),
      createContentItem('빨래하다', 'ppallaehada', 'To do laundry', 'word', '빨래를 해요', 'I do laundry'),
      createContentItem('공부하다', 'gongbuhada', 'To study', 'word', '한국어를 공부해요', 'I study Korean'),
      createContentItem('일하다', 'ilhada', 'To work', 'word', '회사에서 일해요', 'I work at the company'),
      createContentItem('쉬다', 'swida', 'To rest', 'word', '집에서 쉬어요', 'I rest at home'),
      createContentItem('운동하다', 'undonghada', 'To exercise', 'word', '매일 운동해요', 'I exercise every day'),
      createContentItem('걷다', 'geotda', 'To walk', 'word', '공원에서 걸어요', 'I walk in the park'),
      createContentItem('달리다', 'dallida', 'To run', 'word', '아침에 달려요', 'I run in the morning'),
      createContentItem('읽다', 'ikda', 'To read', 'word', '책을 읽어요', 'I read a book'),
      createContentItem('쓰다', 'sseuda', 'To write', 'word', '일기를 써요', 'I write a diary'),
      createContentItem('듣다', 'deutda', 'To listen', 'word', '음악을 들어요', 'I listen to music'),
      createContentItem('보다', 'boda', 'To see/watch', 'word', 'TV를 봐요', 'I watch TV'),
      createContentItem('놀다', 'nolda', 'To play', 'word', '친구와 놀아요', 'I play with friends'),
      createContentItem('앉다', 'anda', 'To sit', 'word', '의자에 앉아요', 'I sit on a chair'),
      createContentItem('서다', 'seoda', 'To stand', 'word', '여기 서요', 'I stand here'),
      createContentItem('눕다', 'nupda', 'To lie down', 'word', '침대에 누워요', 'I lie on the bed'),

      // Daily objects
      createContentItem('책', 'chaek', 'Book', 'word', '책을 읽어요', 'I read a book'),
      createContentItem('연필', 'yeonpil', 'Pencil', 'word', '연필로 써요', 'I write with a pencil'),
      createContentItem('펜', 'pen', 'Pen', 'word', '펜이 있어요', 'I have a pen'),
      createContentItem('가방', 'gabang', 'Bag', 'word', '가방을 들어요', 'I carry a bag'),
      createContentItem('컴퓨터', 'keompyuteo', 'Computer', 'word', '컴퓨터를 사용해요', 'I use a computer'),
      createContentItem('핸드폰', 'haendeupon', 'Cell phone', 'word', '핸드폰이 있어요', 'I have a cell phone'),
      createContentItem('시계', 'sigye', 'Clock/Watch', 'word', '시계를 봐요', 'I look at the clock'),
      createContentItem('안경', 'angyeong', 'Glasses', 'word', '안경을 써요', 'I wear glasses'),
      createContentItem('옷', 'ot', 'Clothes', 'word', '옷을 입어요', 'I wear clothes'),
      createContentItem('신발', 'sinbal', 'Shoes', 'word', '신발을 신어요', 'I put on shoes'),
      createContentItem('모자', 'moja', 'Hat', 'word', '모자를 써요', 'I wear a hat'),
      createContentItem('우산', 'usan', 'Umbrella', 'word', '우산이 필요해요', 'I need an umbrella'),
      createContentItem('열쇠', 'yeolsoe', 'Key', 'word', '열쇠가 있어요', 'I have a key'),
      createContentItem('지갑', 'jigap', 'Wallet', 'word', '지갑을 찾아요', 'I\'m looking for my wallet'),
      createContentItem('TV', 'tibi', 'TV', 'word', 'TV를 봐요', 'I watch TV'),
      createContentItem('라디오', 'radio', 'Radio', 'word', '라디오를 들어요', 'I listen to the radio'),

      // Food items (basic)
      createContentItem('밥', 'bap', 'Rice/Meal', 'word', '밥 먹어요', 'I eat rice'),
      createContentItem('빵', 'ppang', 'Bread', 'word', '빵을 먹어요', 'I eat bread'),
      createContentItem('물', 'mul', 'Water', 'word', '물 주세요', 'Please give me water'),
      createContentItem('우유', 'uyu', 'Milk', 'word', '우유를 마셔요', 'I drink milk'),
      createContentItem('주스', 'juseu', 'Juice', 'word', '주스가 좋아요', 'I like juice'),
      createContentItem('차', 'cha', 'Tea', 'word', '차를 마셔요', 'I drink tea'),
      createContentItem('커피', 'keopi', 'Coffee', 'word', '커피 한 잔', 'A cup of coffee'),
      createContentItem('과일', 'gwail', 'Fruit', 'word', '과일을 먹어요', 'I eat fruit'),
      createContentItem('사과', 'sagwa', 'Apple', 'word', '사과가 맛있어요', 'Apples are delicious'),
      createContentItem('바나나', 'banana', 'Banana', 'word', '바나나를 좋아해요', 'I like bananas'),
      createContentItem('계란', 'gyeran', 'Egg', 'word', '계란을 먹어요', 'I eat eggs'),
      createContentItem('고기', 'gogi', 'Meat', 'word', '고기를 좋아해요', 'I like meat'),
      createContentItem('생선', 'saengseon', 'Fish', 'word', '생선을 먹어요', 'I eat fish'),
      createContentItem('야채', 'yachae', 'Vegetables', 'word', '야채가 건강해요', 'Vegetables are healthy'),

      // Common verbs
      createContentItem('하다', 'hada', 'To do', 'word', '숙제를 해요', 'I do homework'),
      createContentItem('가다', 'gada', 'To go', 'word', '학교에 가요', 'I go to school'),
      createContentItem('오다', 'oda', 'To come', 'word', '집에 와요', 'I come home'),
      createContentItem('있다', 'itda', 'To be/exist/have', 'word', '시간이 있어요', 'I have time'),
      createContentItem('없다', 'eopda', 'To not be/not have', 'word', '돈이 없어요', 'I don\'t have money'),
      createContentItem('주다', 'juda', 'To give', 'word', '선물을 줘요', 'I give a gift'),
      createContentItem('받다', 'batda', 'To receive', 'word', '선물을 받아요', 'I receive a gift'),
      createContentItem('사다', 'sada', 'To buy', 'word', '옷을 사요', 'I buy clothes'),
      createContentItem('팔다', 'palda', 'To sell', 'word', '물건을 팔아요', 'I sell things'),
      createContentItem('만들다', 'mandeulda', 'To make', 'word', '음식을 만들어요', 'I make food'),
      createContentItem('타다', 'tada', 'To ride', 'word', '버스를 타요', 'I ride the bus'),
      createContentItem('걸리다', 'geollida', 'To take (time)', 'word', '한 시간 걸려요', 'It takes one hour'),
      createContentItem('시작하다', 'sijakada', 'To start', 'word', '공부를 시작해요', 'I start studying'),
      createContentItem('끝나다', 'kkeunnada', 'To finish/end', 'word', '수업이 끝났어요', 'Class finished'),
      createContentItem('열다', 'yeolda', 'To open', 'word', '문을 열어요', 'I open the door'),
      createContentItem('닫다', 'datda', 'To close', 'word', '창문을 닫아요', 'I close the window'),
      createContentItem('켜다', 'kyeoda', 'To turn on', 'word', '불을 켜요', 'I turn on the light'),
      createContentItem('끄다', 'kkeuda', 'To turn off', 'word', 'TV를 꺼요', 'I turn off the TV'),
      createContentItem('입다', 'ipda', 'To wear (clothes)', 'word', '옷을 입어요', 'I wear clothes'),
      createContentItem('벗다', 'beotda', 'To take off (clothes)', 'word', '신발을 벗어요', 'I take off shoes'),
      createContentItem('신다', 'sinda', 'To wear (shoes/socks)', 'word', '신발을 신어요', 'I put on shoes'),
      createContentItem('쓰다', 'sseuda', 'To wear (hat/glasses)', 'word', '모자를 써요', 'I wear a hat'),
      createContentItem('찾다', 'chatda', 'To look for/find', 'word', '열쇠를 찾아요', 'I look for the key'),
      createContentItem('전화하다', 'jeonhwahada', 'To call', 'word', '친구에게 전화해요', 'I call a friend'),
      createContentItem('말하다', 'malhada', 'To speak', 'word', '한국어로 말해요', 'I speak in Korean'),
      createContentItem('묻다', 'mutda', 'To ask', 'word', '질문을 물어요', 'I ask a question'),
      createContentItem('대답하다', 'daedapada', 'To answer', 'word', '질문에 대답해요', 'I answer the question'),

      // Adjectives (state)
      createContentItem('좋다', 'jota', 'To be good', 'word', '날씨가 좋아요', 'The weather is good'),
      createContentItem('나쁘다', 'nappeuda', 'To be bad', 'word', '기분이 나빠요', 'I feel bad'),
      createContentItem('크다', 'keuda', 'To be big', 'word', '집이 커요', 'The house is big'),
      createContentItem('작다', 'jakda', 'To be small', 'word', '방이 작아요', 'The room is small'),
      createContentItem('많다', 'manta', 'To be many/much', 'word', '사람이 많아요', 'There are many people'),
      createContentItem('적다', 'jeokda', 'To be few/little', 'word', '시간이 적어요', 'There is little time'),
      createContentItem('길다', 'gilda', 'To be long', 'word', '머리가 길어요', 'Hair is long'),
      createContentItem('짧다', 'jjalda', 'To be short', 'word', '치마가 짧아요', 'The skirt is short'),
      createContentItem('높다', 'nopda', 'To be high/tall', 'word', '건물이 높아요', 'The building is tall'),
      createContentItem('낮다', 'natda', 'To be low', 'word', '목소리가 낮아요', 'The voice is low'),
      createContentItem('빠르다', 'ppareuda', 'To be fast', 'word', '차가 빨라요', 'The car is fast'),
      createContentItem('느리다', 'neurida', 'To be slow', 'word', '버스가 느려요', 'The bus is slow'),
      createContentItem('새롭다', 'saeropda', 'To be new', 'word', '옷이 새로워요', 'The clothes are new'),
      createContentItem('오래되다', 'oraedoeda', 'To be old (things)', 'word', '책이 오래됐어요', 'The book is old'),
      createContentItem('깨끗하다', 'kkaekkeuthada', 'To be clean', 'word', '방이 깨끗해요', 'The room is clean'),
      createContentItem('더럽다', 'deoreopda', 'To be dirty', 'word', '옷이 더러워요', 'The clothes are dirty'),
      createContentItem('쉽다', 'swipda', 'To be easy', 'word', '한국어가 쉬워요', 'Korean is easy'),
      createContentItem('어렵다', 'eoryeopda', 'To be difficult', 'word', '숙제가 어려워요', 'Homework is difficult'),
      createContentItem('재미있다', 'jaemiitda', 'To be fun/interesting', 'word', '영화가 재미있어요', 'The movie is interesting'),
      createContentItem('재미없다', 'jaemieopda', 'To be boring', 'word', '수업이 재미없어요', 'Class is boring'),
      createContentItem('맛있다', 'masitda', 'To be delicious', 'word', '음식이 맛있어요', 'The food is delicious'),
      createContentItem('맛없다', 'maseopda', 'To be tasteless/bad', 'word', '이거 맛없어요', 'This is tasteless')
    ]
  },

  // ==========================================
  // FOOD - BEGINNER (100+ items)
  // ==========================================
  {
    title: 'Korean Food & Dining',
    category: 'food',
    difficulty: 'beginner',
    content: Array(120).fill(null).map((_, i) => {
      const foodItems = [
        ['김치', 'gimchi', 'Kimchi', '김치가 맛있어요', 'Kimchi is delicious'],
        ['비빔밥', 'bibimbap', 'Mixed rice', '비빔밥 하나 주세요', 'One bibimbap please'],
        ['불고기', 'bulgogi', 'Bulgogi', '불고기가 정말 맛있어요', 'Bulgogi is really delicious'],
        ['떡볶이', 'tteokbokki', 'Spicy rice cakes', '떡볶이 좋아해요', 'I like tteokbokki'],
        ['김밥', 'gimbap', 'Seaweed rice roll', '김밥 먹을래요', 'I want to eat gimbap'],
        ['라면', 'ramyeon', 'Instant noodles', '라면 끓여요', 'I cook ramyeon'],
        ['국수', 'guksu', 'Noodles', '국수가 맛있어요', 'Noodles are delicious'],
        ['찌개', 'jjigae', 'Stew', '찌개를 먹어요', 'I eat stew'],
        ['된장찌개', 'doenjangjjigae', 'Soybean paste stew', '된장찌개 주세요', 'Soybean paste stew please'],
        ['김치찌개', 'gimchijjigae', 'Kimchi stew', '김치찌개가 좋아요', 'I like kimchi stew'],
        ['국', 'guk', 'Soup', '국이 뜨거워요', 'The soup is hot'],
        ['미역국', 'miyeokguk', 'Seaweed soup', '미역국 먹어요', 'I eat seaweed soup'],
        ['삼겹살', 'samgyeopsal', 'Pork belly', '삼겹살 구워요', 'I grill pork belly'],
        ['갈비', 'galbi', 'Ribs', '갈비가 맛있어요', 'Ribs are delicious'],
        ['치킨', 'chikin', 'Chicken', '치킨 시킬래요', 'I want to order chicken'],
        ['피자', 'pija', 'Pizza', '피자 좋아해요', 'I like pizza'],
        ['햄버거', 'haembeogeo', 'Hamburger', '햄버거 먹어요', 'I eat hamburgers'],
        ['샌드위치', 'saendeuwichi', 'Sandwich', '샌드위치 만들어요', 'I make sandwiches'],
        ['밥', 'bap', 'Rice/Meal', '밥 먹었어요?', 'Did you eat?'],
        ['빵', 'ppang', 'Bread', '빵집에 가요', 'I go to the bakery'],
        ['떡', 'tteok', 'Rice cake', '떡을 먹어요', 'I eat rice cakes'],
        ['과자', 'gwaja', 'Snacks/Cookies', '과자 사요', 'I buy snacks'],
        ['사탕', 'satang', 'Candy', '사탕 좋아해요', 'I like candy'],
        ['초콜릿', 'chokollit', 'Chocolate', '초콜릿 먹어요', 'I eat chocolate'],
        ['아이스크림', 'aiseukeulim', 'Ice cream', '아이스크림 사요', 'I buy ice cream'],
        ['케이크', 'keikeu', 'Cake', '케이크가 달아요', 'Cake is sweet'],
        ['쿠키', 'kuki', 'Cookie', '쿠키 구워요', 'I bake cookies'],
        ['물', 'mul', 'Water', '물 한 잔 주세요', 'Please give me a glass of water'],
        ['우유', 'uyu', 'Milk', '우유를 마셔요', 'I drink milk'],
        ['주스', 'juseu', 'Juice', '오렌지 주스 주세요', 'Orange juice please'],
        ['차', 'cha', 'Tea', '차를 마셔요', 'I drink tea'],
        ['커피', 'keopi', 'Coffee', '커피 한 잔 할까요?', 'Shall we have coffee?'],
        ['녹차', 'nokcha', 'Green tea', '녹차가 좋아요', 'Green tea is good'],
        ['콜라', 'kolla', 'Cola', '콜라 주세요', 'Cola please'],
        ['사이다', 'saida', 'Sprite', '사이다 마셔요', 'I drink sprite'],
        ['소주', 'soju', 'Soju', '소주 한 병', 'One bottle of soju'],
        ['맥주', 'maekju', 'Beer', '맥주 좋아해요', 'I like beer'],
        ['와인', 'wain', 'Wine', '와인 마셔요', 'I drink wine'],
        ['과일', 'gwail', 'Fruit', '과일을 먹어요', 'I eat fruit'],
        ['사과', 'sagwa', 'Apple', '사과가 맛있어요', 'Apples are delicious'],
        ['바나나', 'banana', 'Banana', '바나나를 좋아해요', 'I like bananas'],
        ['딸기', 'ttalgi', 'Strawberry', '딸기가 달아요', 'Strawberries are sweet'],
        ['포도', 'podo', 'Grapes', '포도 먹어요', 'I eat grapes'],
        ['수박', 'subak', 'Watermelon', '수박이 시원해요', 'Watermelon is refreshing'],
        ['오렌지', 'orenji', 'Orange', '오렌지 주스', 'Orange juice'],
        ['배', 'bae', 'Pear', '배가 맛있어요', 'Pears are delicious'],
        ['복숭아', 'boksunga', 'Peach', '복숭아 좋아해요', 'I like peaches'],
        ['야채', 'yachae', 'Vegetables', '야채가 건강해요', 'Vegetables are healthy'],
        ['상추', 'sangchu', 'Lettuce', '상추 쌈', 'Lettuce wrap'],
        ['오이', 'oi', 'Cucumber', '오이가 시원해요', 'Cucumber is refreshing'],
        ['토마토', 'tomato', 'Tomato', '토마토 먹어요', 'I eat tomatoes'],
        ['당근', 'danggeun', 'Carrot', '당근이 건강해요', 'Carrots are healthy'],
        ['감자', 'gamja', 'Potato', '감자 좋아해요', 'I like potatoes'],
        ['양파', 'yangpa', 'Onion', '양파 썰어요', 'I slice onions'],
        ['마늘', 'maneul', 'Garlic', '마늘이 많아요', 'There\'s a lot of garlic'],
        ['고추', 'gochu', 'Chili pepper', '고추가 매워요', 'Chili peppers are spicy'],
        ['계란', 'gyeran', 'Egg', '계란 프라이', 'Fried egg'],
        ['달걀', 'dalgyal', 'Egg', '달걀 삶아요', 'I boil eggs'],
        ['고기', 'gogi', 'Meat', '고기를 구워요', 'I grill meat'],
        ['소고기', 'sogogi', 'Beef', '소고기가 비싸요', 'Beef is expensive'],
        ['돼지고기', 'dwaejigogi', 'Pork', '돼지고기 좋아해요', 'I like pork'],
        ['닭고기', 'dakgogi', 'Chicken', '닭고기 먹어요', 'I eat chicken'],
        ['생선', 'saengseon', 'Fish', '생선이 신선해요', 'Fish is fresh'],
        ['참치', 'chamchi', 'Tuna', '참치 김밥', 'Tuna gimbap'],
        ['연어', 'yeoneo', 'Salmon', '연어 좋아해요', 'I like salmon'],
        ['새우', 'saeu', 'Shrimp', '새우가 맛있어요', 'Shrimp is delicious'],
        ['오징어', 'ojingeo', 'Squid', '오징어 볶음', 'Stir-fried squid'],
        ['두부', 'dubu', 'Tofu', '두부가 부드러워요', 'Tofu is soft'],
        ['된장', 'doenjang', 'Soybean paste', '된장 맛있어요', 'Soybean paste is delicious'],
        ['고추장', 'gochujang', 'Red chili paste', '고추장이 매워요', 'Red chili paste is spicy'],
        ['간장', 'ganjang', 'Soy sauce', '간장 좀 주세요', 'Please pass the soy sauce'],
        ['설탕', 'seoltang', 'Sugar', '설탕이 달아요', 'Sugar is sweet'],
        ['소금', 'sogeum', 'Salt', '소금 넣어요', 'I add salt'],
        ['후추', 'huchu', 'Pepper', '후추가 매워요', 'Pepper is spicy'],
        ['기름', 'gireum', 'Oil', '기름에 볶아요', 'I stir-fry in oil'],
        ['참기름', 'chamgireum', 'Sesame oil', '참기름 향이 좋아요', 'Sesame oil smells good'],
        ['식초', 'sikcho', 'Vinegar', '식초 넣어요', 'I add vinegar'],
        ['맛있다', 'masitda', 'To be delicious', '정말 맛있어요', 'It\'s really delicious'],
        ['맛없다', 'maseopda', 'To be tasteless', '맛없어요', 'It\'s tasteless'],
        ['달다', 'dalda', 'To be sweet', '케이크가 달아요', 'Cake is sweet'],
        ['싱겁다', 'singgeopda', 'To be bland', '국이 싱거워요', 'Soup is bland'],
        ['짜다', 'jjada', 'To be salty', '너무 짜요', 'It\'s too salty'],
        ['맵다', 'maepda', 'To be spicy', '김치가 매워요', 'Kimchi is spicy'],
        ['시다', 'sida', 'To be sour', '레몬이 셔요', 'Lemon is sour'],
        ['쓰다', 'sseuda', 'To be bitter', '약이 써요', 'Medicine is bitter'],
        ['뜨겁다', 'tteugeopda', 'To be hot (temperature)', '국이 뜨거워요', 'Soup is hot'],
        ['차갑다', 'chagapda', 'To be cold', '물이 차가워요', 'Water is cold'],
        ['시원하다', 'siwonhada', 'To be cool/refreshing', '수박이 시원해요', 'Watermelon is refreshing'],
        ['따뜻하다', 'ttatteuthada', 'To be warm', '커피가 따뜻해요', 'Coffee is warm'],
        ['먹다', 'meokda', 'To eat', '밥 먹어요', 'I eat rice'],
        ['마시다', 'masida', 'To drink', '물 마셔요', 'I drink water'],
        ['요리하다', 'yorihada', 'To cook', '저녁을 요리해요', 'I cook dinner'],
        ['만들다', 'mandeulda', 'To make', '음식을 만들어요', 'I make food'],
        ['굽다', 'gupda', 'To grill/bake', '고기를 구워요', 'I grill meat'],
        ['볶다', 'bokda', 'To stir-fry', '야채를 볶아요', 'I stir-fry vegetables'],
        ['삶다', 'samda', 'To boil', '계란을 삶아요', 'I boil eggs'],
        ['끓이다', 'kkeulida', 'To boil (soup)', '국을 끓여요', 'I boil soup'],
        ['썰다', 'sseolda', 'To slice', '양파를 썰어요', 'I slice onions'],
        ['자르다', 'jareuda', 'To cut', '과일을 잘라요', 'I cut fruit'],
        ['씻다', 'ssitda', 'To wash', '과일을 씻어요', 'I wash fruit'],
        ['넣다', 'neota', 'To put in', '소금을 넣어요', 'I put in salt'],
        ['빼다', 'ppaeda', 'To take out', '뼈를 빼요', 'I remove bones'],
        ['시키다', 'sikida', 'To order', '음식을 시켜요', 'I order food'],
        ['주문하다', 'jumunhada', 'To order', '메뉴를 주문해요', 'I order from the menu'],
        ['배고프다', 'baegopuda', 'To be hungry', '배고파요', 'I\'m hungry'],
        ['배부르다', 'baeburuda', 'To be full', '배불러요', 'I\'m full'],
        ['목마르다', 'mongmareuda', 'To be thirsty', '목말라요', 'I\'m thirsty'],
        ['식당', 'sikdang', 'Restaurant', '식당에 가요', 'I go to a restaurant'],
        ['음식점', 'eumsikjeom', 'Eatery', '음식점이 많아요', 'There are many eateries'],
        ['카페', 'kape', 'Cafe', '카페에서 만나요', 'Let\'s meet at a cafe'],
        ['빵집', 'ppangjip', 'Bakery', '빵집에 가요', 'I go to the bakery'],
        ['시장', 'sijang', 'Market', '시장에서 사요', 'I buy at the market'],
        ['마트', 'mateu', 'Mart', '마트 가요', 'I go to the mart'],
        ['편의점', 'pyeonuijeom', 'Convenience store', '편의점이 가까워요', 'The convenience store is close'],
        ['메뉴', 'menyu', 'Menu', '메뉴 좀 보여주세요', 'Please show me the menu'],
        ['주문', 'jumun', 'Order', '주문 받아주세요', 'Please take my order'],
        ['계산', 'gyesan', 'Bill/Check', '계산서 주세요', 'Check please'],
        ['돈', 'don', 'Money', '돈이 없어요', 'I don\'t have money']
      ];

      if (i < foodItems.length) {
        const item = foodItems[i];
        return createContentItem(item[0], item[1], item[2], 'word', item[3], item[4]);
      }
      return null;
    }).filter(Boolean)
  },

  // ==========================================
  // TRAVEL - BEGINNER (100+ items)
  // ==========================================
  {
    title: 'Transportation & Directions',
    category: 'travel',
    difficulty: 'beginner',
    content: Array(110).fill(null).map((_, i) => {
      const travelItems = [
        ['공항', 'gonghang', 'Airport', '공항에 가요', 'I\'m going to the airport'],
        ['비행기', 'bihaenggi', 'Airplane', '비행기를 타요', 'I take a plane'],
        ['지하철', 'jihacheol', 'Subway', '지하철로 갈게요', 'I\'ll go by subway'],
        ['버스', 'beoseu', 'Bus', '버스 정류장이 어디예요?', 'Where is the bus stop?'],
        ['택시', 'taeksi', 'Taxi', '택시를 탈게요', 'I\'ll take a taxi'],
        ['기차', 'gicha', 'Train', '기차역이 어디예요?', 'Where is the train station?'],
        ['자동차', 'jadongcha', 'Car', '자동차로 가요', 'I go by car'],
        ['차', 'cha', 'Car (informal)', '차가 있어요', 'I have a car'],
        ['자전거', 'jajeongeo', 'Bicycle', '자전거 타요', 'I ride a bicycle'],
        ['오토바이', 'otobai', 'Motorcycle', '오토바이 타요', 'I ride a motorcycle'],
        ['역', 'yeok', 'Station', '역이 가까워요', 'The station is close'],
        ['정류장', 'jeongnyujang', 'Stop', '버스 정류장', 'Bus stop'],
        ['표', 'pyo', 'Ticket', '표 사요', 'I buy a ticket'],
        ['티켓', 'tiket', 'Ticket', '티켓 주세요', 'Ticket please'],
        ['길', 'gil', 'Road/Way', '길을 몰라요', 'I don\'t know the way'],
        ['거리', 'geori', 'Street', '거리가 복잡해요', 'The street is crowded'],
        ['도로', 'doro', 'Road', '도로가 넓어요', 'The road is wide'],
        ['건물', 'geonmul', 'Building', '건물이 높아요', 'The building is tall'],
        ['호텔', 'hotel', 'Hotel', '호텔에 묵어요', 'I stay at a hotel'],
        ['모텔', 'motel', 'Motel', '모텔이 싸요', 'Motels are cheap'],
        ['숙소', 'sukso', 'Accommodation', '숙소를 찾아요', 'I look for accommodation'],
        ['방', 'bang', 'Room', '방 있어요?', 'Do you have a room?'],
        ['관광', 'gwangwang', 'Tourism', '관광하러 왔어요', 'I came for tourism'],
        ['여행', 'yeohaeng', 'Travel', '여행 좋아해요', 'I like traveling'],
        ['여권', 'yeogwon', 'Passport', '여권 보여주세요', 'Please show your passport'],
        ['비자', 'bija', 'Visa', '비자가 필요해요', 'I need a visa'],
        ['짐', 'jim', 'Luggage', '짐이 많아요', 'I have a lot of luggage'],
        ['가방', 'gabang', 'Bag', '가방을 잃어버렸어요', 'I lost my bag'],
        ['지도', 'jido', 'Map', '지도 있어요?', 'Do you have a map?'],
        ['카메라', 'kamera', 'Camera', '카메라로 찍어요', 'I take photos with a camera'],
        ['사진', 'sajin', 'Photo', '사진 찍어요', 'I take photos'],
        ['어디', 'eodi', 'Where', '어디 가요?', 'Where are you going?'],
        ['여기', 'yeogi', 'Here', '여기 있어요', 'It\'s here'],
        ['저기', 'jeogi', 'There', '저기 가요', 'I go there'],
        ['거기', 'geogi', 'There', '거기 어때요?', 'How is it there?'],
        ['앞', 'ap', 'Front', '앞에 있어요', 'It\'s in front'],
        ['뒤', 'dwi', 'Back', '뒤에 있어요', 'It\'s in the back'],
        ['옆', 'yeop', 'Side', '옆에 앉아요', 'I sit on the side'],
        ['위', 'wi', 'Top/Above', '위에 있어요', 'It\'s on top'],
        ['아래', 'arae', 'Below/Under', '아래에 있어요', 'It\'s below'],
        ['안', 'an', 'Inside', '안에 들어가요', 'I go inside'],
        ['밖', 'bak', 'Outside', '밖에 나가요', 'I go outside'],
        ['왼쪽', 'oenjjok', 'Left', '왼쪽으로 가세요', 'Go left'],
        ['오른쪽', 'oreunjjok', 'Right', '오른쪽이에요', 'It\'s on the right'],
        ['직진', 'jikjin', 'Straight', '직진하세요', 'Go straight'],
        ['가다', 'gada', 'To go', '학교에 가요', 'I go to school'],
        ['오다', 'oda', 'To come', '여기 와요', 'Come here'],
        ['타다', 'tada', 'To ride', '버스를 타요', 'I ride the bus'],
        ['내리다', 'naerida', 'To get off', '여기서 내려요', 'I get off here'],
        ['걷다', 'geotda', 'To walk', '걸어서 가요', 'I go by walking'],
        ['달리다', 'dallida', 'To run', '빨리 달려요', 'I run fast'],
        ['서다', 'seoda', 'To stop/stand', '여기 서요', 'Stop here'],
        ['돌다', 'dolda', 'To turn', '왼쪽으로 도세요', 'Turn left'],
        ['건너다', 'geonneoda', 'To cross', '길을 건너요', 'I cross the street'],
        ['도착하다', 'dochaokada', 'To arrive', '역에 도착했어요', 'I arrived at the station'],
        ['출발하다', 'chulbalhada', 'To depart', '내일 출발해요', 'I depart tomorrow'],
        ['예약하다', 'yeyakada', 'To reserve', '방을 예약해요', 'I reserve a room'],
        ['묵다', 'mukda', 'To stay', '호텔에 묵어요', 'I stay at a hotel'],
        ['찾다', 'chatda', 'To find/look for', '길을 찾아요', 'I look for the way'],
        ['잃어버리다', 'ireobeorida', 'To lose', '길을 잃어버렸어요', 'I got lost'],
        ['가깝다', 'gakkapda', 'To be close', '역이 가까워요', 'The station is close'],
        ['멀다', 'meolda', 'To be far', '공항이 멀어요', 'The airport is far'],
        ['빠르다', 'ppareuda', 'To be fast', '지하철이 빨라요', 'Subway is fast'],
        ['느리다', 'neurida', 'To be slow', '버스가 느려요', 'Bus is slow'],
        ['복잡하다', 'bokjapada', 'To be crowded/complicated', '거리가 복잡해요', 'The street is crowded'],
        ['조용하다', 'joyonghada', 'To be quiet', '호텔이 조용해요', 'The hotel is quiet'],
        ['시끄럽다', 'sikkeeureopda', 'To be noisy', '거리가 시끄러워요', 'The street is noisy'],
        ['안전하다', 'anjeonhada', 'To be safe', '여기가 안전해요', 'It\'s safe here'],
        ['위험하다', 'wiheomhada', 'To be dangerous', '밤에는 위험해요', 'It\'s dangerous at night'],
        ['편하다', 'pyeonhada', 'To be comfortable', '지하철이 편해요', 'Subway is comfortable'],
        ['불편하다', 'bulpyeonhada', 'To be uncomfortable', '버스가 불편해요', 'Bus is uncomfortable'],
        ['얼마나', 'eolmana', 'How much/How far', '얼마나 멀어요?', 'How far is it?'],
        ['몇 분', 'myeot bun', 'How many minutes', '몇 분 걸려요?', 'How many minutes does it take?'],
        ['몇 시간', 'myeot sigan', 'How many hours', '몇 시간 걸려요?', 'How many hours does it take?'],
        ['분', 'bun', 'Minute', '10분 걸려요', 'It takes 10 minutes'],
        ['시간', 'sigan', 'Hour', '한 시간 걸려요', 'It takes one hour'],
        ['북쪽', 'bukjjok', 'North', '북쪽으로 가요', 'I go north'],
        ['남쪽', 'namjjok', 'South', '남쪽이에요', 'It\'s in the south'],
        ['동쪽', 'dongjjok', 'East', '동쪽에 있어요', 'It\'s in the east'],
        ['서쪽', 'seojjok', 'West', '서쪽으로 가세요', 'Go west'],
        ['입구', 'ipgu', 'Entrance', '입구가 어디예요?', 'Where is the entrance?'],
        ['출구', 'chulgu', 'Exit', '출구로 나가요', 'I go out through the exit'],
        ['엘리베이터', 'ellibeiteo', 'Elevator', '엘리베이터 타요', 'I take the elevator'],
        ['계단', 'gyedan', 'Stairs', '계단으로 올라가요', 'I go up the stairs'],
        ['층', 'cheung', 'Floor', '3층이에요', 'It\'s on the 3rd floor'],
        ['1층', 'ilcheung', 'First floor', '1층에 있어요', 'It\'s on the first floor'],
        ['호수', 'hosu', 'Lake', '호수가 아름다워요', 'The lake is beautiful'],
        ['산', 'san', 'Mountain', '산에 올라가요', 'I climb the mountain'],
        ['바다', 'bada', 'Sea', '바다가 좋아요', 'I like the sea'],
        ['공원', 'gongwon', 'Park', '공원에서 걸어요', 'I walk in the park'],
        ['박물관', 'bangmulgwan', 'Museum', '박물관 가요', 'I go to the museum'],
        ['미술관', 'misulgwan', 'Art museum', '미술관이 좋아요', 'The art museum is good'],
        ['극장', 'geukjang', 'Theater', '극장에서 봐요', 'I watch at the theater'],
        ['영화관', 'yeonghwagwan', 'Cinema', '영화관 가요', 'I go to the cinema'],
        ['병원', 'byeongwon', 'Hospital', '병원이 어디예요?', 'Where is the hospital?'],
        ['약국', 'yakguk', 'Pharmacy', '약국에 가요', 'I go to the pharmacy'],
        ['은행', 'eunhaeng', 'Bank', '은행이 가까워요', 'The bank is close'],
        ['우체국', 'ucheguk', 'Post office', '우체국 어디예요?', 'Where is the post office?'],
        ['경찰서', 'gyeongchalseo', 'Police station', '경찰서가 어디예요?', 'Where is the police station?'],
        ['주소', 'juso', 'Address', '주소를 알아요', 'I know the address'],
        ['전화번호', 'jeonhwabeonho', 'Phone number', '전화번호 주세요', 'Please give me the phone number'],
        ['도움', 'doum', 'Help', '도움이 필요해요', 'I need help'],
        ['도와주세요', 'dowajuseyo', 'Please help', '도와주세요', 'Please help me'],
        ['실례합니다', 'sillyehamnida', 'Excuse me', '실례합니다, 길 좀 물어볼게요', 'Excuse me, I\'d like to ask for directions']
      ];

      if (i < travelItems.length) {
        const item = travelItems[i];
        return createContentItem(item[0], item[1], item[2], 'word', item[3], item[4]);
      }
      return null;
    }).filter(Boolean)
  },

  // ==========================================
  // SHOPPING - BEGINNER (100+ items)
  // ==========================================
  {
    title: 'Shopping Basics',
    category: 'shopping',
    difficulty: 'beginner',
    content: Array(105).fill(null).map((_, i) => {
      const items = [
        ['가게', 'gage', 'Shop/Store', '가게에 가요', 'I go to the store'],
        ['상점', 'sangjeom', 'Shop', '상점이 많아요', 'There are many shops'],
        ['백화점', 'baekhwajeom', 'Department store', '백화점에서 사요', 'I shop at the department store'],
        ['시장', 'sijang', 'Market', '시장이 싸요', 'The market is cheap'],
        ['마트', 'mateu', 'Mart', '마트 가요', 'I go to the mart'],
        ['슈퍼마켓', 'syupeomaket', 'Supermarket', '슈퍼마켓이 가까워요', 'The supermarket is close'],
        ['편의점', 'pyeonuijeom', 'Convenience store', '편의점 24시간이에요', 'Convenience store is 24 hours'],
        ['온라인', 'onlain', 'Online', '온라인으로 사요', 'I buy online'],
        ['쇼핑', 'syoping', 'Shopping', '쇼핑 좋아해요', 'I like shopping'],
        ['돈', 'don', 'Money', '돈이 있어요', 'I have money'],
        ['현금', 'hyeongeum', 'Cash', '현금으로 낼게요', 'I\'ll pay with cash'],
        ['카드', 'kadeu', 'Card', '카드로 계산해요', 'I pay with card'],
        ['신용카드', 'sinyongkadeu', 'Credit card', '신용카드 있어요', 'I have a credit card'],
        ['원', 'won', 'Won (currency)', '천 원이에요', 'It\'s 1,000 won'],
        ['달러', 'dalleo', 'Dollar', '10달러예요', 'It\'s 10 dollars'],
        ['가격', 'gagyeok', 'Price', '가격이 얼마예요?', 'What\'s the price?'],
        ['값', 'gap', 'Price/Value', '값이 싸요', 'The price is cheap'],
        ['얼마', 'eolma', 'How much', '얼마예요?', 'How much is it?'],
        ['얼마나', 'eolmana', 'How much', '얼마나 비싸요?', 'How expensive is it?'],
        ['비싸다', 'bissada', 'To be expensive', '너무 비싸요', 'It\'s too expensive'],
        ['싸다', 'ssada', 'To be cheap', '이거 싸요', 'This is cheap'],
        ['비싸요', 'bissayo', 'It\'s expensive', '옷이 비싸요', 'Clothes are expensive'],
        ['싸요', 'ssayo', 'It\'s cheap', '야채가 싸요', 'Vegetables are cheap'],
        ['할인', 'harin', 'Discount', '할인해요', 'It\'s discounted'],
        ['세일', 'seil', 'Sale', '세일 중이에요', 'It\'s on sale'],
        ['사다', 'sada', 'To buy', '옷을 사요', 'I buy clothes'],
        ['팔다', 'palda', 'To sell', '가게에서 팔아요', 'They sell at the store'],
        ['주다', 'juda', 'To give', '돈을 줘요', 'I give money'],
        ['받다', 'batda', 'To receive', '거스름돈 받아요', 'I receive change'],
        ['내다', 'naeda', 'To pay', '돈을 내요', 'I pay money'],
        ['계산하다', 'gyesanhada', 'To calculate/pay', '계산해 주세요', 'Please calculate'],
        ['고르다', 'goreuda', 'To choose', '마음에 드는 걸 골라요', 'I choose what I like'],
        ['선택하다', 'seontaekada', 'To select', '하나를 선택해요', 'I select one'],
        ['보다', 'boda', 'To see/look', '구경만 해요', 'I\'m just looking'],
        ['구경하다', 'gugyeonghada', 'To look around', '가게를 구경해요', 'I look around the store'],
        ['찾다', 'chatda', 'To look for', '옷을 찾아요', 'I look for clothes'],
        ['필요하다', 'piryohada', 'To need', '옷이 필요해요', 'I need clothes'],
        ['옷', 'ot', 'Clothes', '옷을 입어요', 'I wear clothes'],
        ['바지', 'baji', 'Pants', '바지가 작아요', 'The pants are small'],
        ['치마', 'chima', 'Skirt', '치마가 예뻐요', 'The skirt is pretty'],
        ['셔츠', 'syeocheu', 'Shirt', '셔츠를 입어요', 'I wear a shirt'],
        ['티셔츠', 'tisyeocheu', 'T-shirt', '티셔츠 사요', 'I buy a T-shirt'],
        ['재킷', 'jaekit', 'Jacket', '재킷이 따뜻해요', 'The jacket is warm'],
        ['코트', 'koteu', 'Coat', '코트가 무거워요', 'The coat is heavy'],
        ['드레스', 'deureseu', 'Dress', '드레스가 예뻐요', 'The dress is pretty'],
        ['양복', 'yangbok', 'Suit', '양복이 비싸요', 'The suit is expensive'],
        ['신발', 'sinbal', 'Shoes', '신발을 신어요', 'I put on shoes'],
        ['구두', 'gudu', 'Dress shoes', '구두가 불편해요', 'Dress shoes are uncomfortable'],
        ['운동화', 'undonghwa', 'Sneakers', '운동화가 편해요', 'Sneakers are comfortable'],
        ['샌들', 'saendeul', 'Sandals', '샌들을 신어요', 'I wear sandals'],
        ['부츠', 'bucheu', 'Boots', '부츠가 멋있어요', 'Boots are cool'],
        ['가방', 'gabang', 'Bag', '가방을 사요', 'I buy a bag'],
        ['지갑', 'jigap', 'Wallet', '지갑이 작아요', 'The wallet is small'],
        ['벨트', 'belteu', 'Belt', '벨트가 필요해요', 'I need a belt'],
        ['모자', 'moja', 'Hat', '모자를 써요', 'I wear a hat'],
        ['장갑', 'janggap', 'Gloves', '장갑이 따뜻해요', 'Gloves are warm'],
        ['목도리', 'mokdori', 'Scarf', '목도리를 둘러요', 'I wear a scarf'],
        ['안경', 'angyeong', 'Glasses', '안경이 비싸요', 'Glasses are expensive'],
        ['선글라스', 'seongeullaseu', 'Sunglasses', '선글라스 써요', 'I wear sunglasses'],
        ['시계', 'sigye', 'Watch', '시계가 예뻐요', 'The watch is pretty'],
        ['반지', 'banji', 'Ring', '반지를 껴요', 'I wear a ring'],
        ['목걸이', 'mokgeori', 'Necklace', '목걸이가 예뻐요', 'The necklace is pretty'],
        ['귀걸이', 'gwigeori', 'Earrings', '귀걸이를 해요', 'I wear earrings'],
        ['크기', 'keugi', 'Size', '크기가 어떻게 돼요?', 'What size is it?'],
        ['사이즈', 'saijeu', 'Size', '사이즈가 커요', 'The size is big'],
        ['작다', 'jakda', 'To be small', '너무 작아요', 'It\'s too small'],
        ['크다', 'keuda', 'To be big', '좀 커요', 'It\'s a bit big'],
        ['맞다', 'matda', 'To fit', '사이즈가 맞아요', 'The size fits'],
        ['안 맞다', 'an matda', 'To not fit', '사이즈가 안 맞아요', 'The size doesn\'t fit'],
        ['색깔', 'saekkal', 'Color', '색깔이 예뻐요', 'The color is pretty'],
        ['색', 'saek', 'Color', '무슨 색이에요?', 'What color is it?'],
        ['빨강', 'ppalgang', 'Red', '빨간색이에요', 'It\'s red'],
        ['파랑', 'parang', 'Blue', '파란색 좋아해요', 'I like blue'],
        ['노랑', 'norang', 'Yellow', '노란색이에요', 'It\'s yellow'],
        ['초록', 'chorok', 'Green', '초록색 가방', 'Green bag'],
        ['검정', 'geomjeong', 'Black', '검은색 신발', 'Black shoes'],
        ['하양', 'hayang', 'White', '하얀색이에요', 'It\'s white'],
        ['회색', 'hoesaek', 'Gray', '회색 옷', 'Gray clothes'],
        ['분홍', 'bunhong', 'Pink', '분홍색이 예뻐요', 'Pink is pretty'],
        ['주황', 'juhwang', 'Orange', '주황색이에요', 'It\'s orange'],
        ['보라', 'bora', 'Purple', '보라색 좋아해요', 'I like purple'],
        ['입어보다', 'ibeoboda', 'To try on (clothes)', '입어봐도 돼요?', 'May I try it on?'],
        ['신어보다', 'sineoboda', 'To try on (shoes)', '신어볼게요', 'I\'ll try them on'],
        ['탈의실', 'taruisil', 'Fitting room', '탈의실이 어디예요?', 'Where is the fitting room?'],
        ['거울', 'geoul', 'Mirror', '거울 좀 보여주세요', 'Please show me a mirror'],
        ['새로운', 'saeroun', 'New', '새 옷이에요', 'It\'s new clothes'],
        ['오래된', 'oraedoen', 'Old', '오래된 옷', 'Old clothes'],
        ['예쁘다', 'yeppeuda', 'To be pretty', '정말 예뻐요', 'It\'s really pretty'],
        ['멋있다', 'meositda', 'To be cool/stylish', '멋있어요', 'It\'s cool'],
        ['좋다', 'jota', 'To be good', '마음에 들어요', 'I like it'],
        ['나쁘다', 'nappeuda', 'To be bad', '별로예요', 'It\'s not good'],
        ['마음에 들다', 'maeume deulda', 'To like', '마음에 들어요', 'I like it'],
        ['교환하다', 'gyohwanhada', 'To exchange', '교환할 수 있어요?', 'Can I exchange it?'],
        ['환불하다', 'hwanbulhada', 'To refund', '환불 받고 싶어요', 'I want a refund'],
        ['영수증', 'yeongsujeung', 'Receipt', '영수증 주세요', 'Receipt please'],
        ['포장하다', 'pojangahada', 'To wrap', '포장해 주세요', 'Please wrap it'],
        ['봉투', 'bongtu', 'Bag/Envelope', '봉투 주세요', 'Bag please'],
        ['주세요', 'juseyo', 'Please give', '이거 주세요', 'Please give me this'],
        ['보여주세요', 'boyeojuseyo', 'Please show', '저거 보여주세요', 'Please show me that'],
        ['괜찮아요', 'gwaenchanayo', 'It\'s okay', '괜찮아요, 안 살게요', 'It\'s okay, I won\'t buy'],
        ['다음에', 'daeume', 'Next time', '다음에 올게요', 'I\'ll come next time']
      ];

      if (i < items.length) {
        const item = items[i];
        return createContentItem(item[0], item[1], item[2], 'word', item[3], item[4]);
      }
      return null;
    }).filter(Boolean)
  },

  // ==========================================
  // HEALTHCARE - BEGINNER (100+ items)
  // ==========================================
  {
    title: 'Health & Medical Basics',
    category: 'healthcare',
    difficulty: 'beginner',
    content: Array(105).fill(null).map((_, i) => {
      const items = [
        ['병원', 'byeongwon', 'Hospital', '병원에 가야 해요', 'I need to go to the hospital'],
        ['의사', 'uisa', 'Doctor', '의사 선생님', 'Doctor'],
        ['간호사', 'ganhosa', 'Nurse', '간호사가 친절해요', 'The nurse is kind'],
        ['환자', 'hwanja', 'Patient', '환자가 많아요', 'There are many patients'],
        ['약', 'yak', 'Medicine', '약을 먹어요', 'I take medicine'],
        ['약국', 'yakguk', 'Pharmacy', '약국에서 사요', 'I buy at the pharmacy'],
        ['처방전', 'cheobangjeon', 'Prescription', '처방전 주세요', 'Prescription please'],
        ['진찰', 'jinchal', 'Examination', '진찰을 받아요', 'I get examined'],
        ['검사', 'geomsa', 'Test', '검사가 필요해요', 'I need a test'],
        ['치료', 'chiryo', 'Treatment', '치료를 받아요', 'I receive treatment'],
        ['수술', 'susul', 'Surgery', '수술이 필요해요', 'I need surgery'],
        ['주사', 'jusa', 'Injection', '주사를 맞아요', 'I get an injection'],
        ['아프다', 'apeuda', 'To hurt/be sick', '아파요', 'It hurts'],
        ['아파요', 'apayo', 'It hurts', '머리가 아파요', 'My head hurts'],
        ['아프지 않다', 'apeuji anta', 'To not hurt', '안 아파요', 'It doesn\'t hurt'],
        ['머리', 'meori', 'Head', '머리가 아파요', 'My head hurts'],
        ['머리가 아프다', 'meoriga apeuda', 'To have a headache', '머리가 아파요', 'I have a headache'],
        ['배', 'bae', 'Stomach', '배가 아파요', 'My stomach hurts'],
        ['배가 고프다', 'baega gopeuda', 'To be hungry', '배고파요', 'I\'m hungry'],
        ['배가 부르다', 'baega bureuda', 'To be full', '배불러요', 'I\'m full'],
        ['눈', 'nun', 'Eye', '눈이 아파요', 'My eyes hurt'],
        ['귀', 'gwi', 'Ear', '귀가 아파요', 'My ears hurt'],
        ['코', 'ko', 'Nose', '코가 막혀요', 'My nose is stuffed'],
        ['입', 'ip', 'Mouth', '입을 벌려요', 'Open your mouth'],
        ['이', 'i', 'Tooth', '이가 아파요', 'My tooth hurts'],
        ['치아', 'chia', 'Teeth', '치아가 건강해요', 'My teeth are healthy'],
        ['목', 'mok', 'Throat/Neck', '목이 아파요', 'My throat hurts'],
        ['어깨', 'eokkae', 'Shoulder', '어깨가 아파요', 'My shoulders hurt'],
        ['팔', 'pal', 'Arm', '팔이 아파요', 'My arm hurts'],
        ['손', 'son', 'Hand', '손을 다쳤어요', 'I hurt my hand'],
        ['손가락', 'songgarak', 'Finger', '손가락이 아파요', 'My finger hurts'],
        ['다리', 'dari', 'Leg', '다리가 아파요', 'My leg hurts'],
        ['발', 'bal', 'Foot', '발이 아파요', 'My foot hurts'],
        ['등', 'deung', 'Back', '등이 아파요', 'My back hurts'],
        ['허리', 'heori', 'Waist/Lower back', '허리가 아파요', 'My lower back hurts'],
        ['가슴', 'gaseum', 'Chest', '가슴이 아파요', 'My chest hurts'],
        ['열', 'yeol', 'Fever', '열이 나요', 'I have a fever'],
        ['열이 나다', 'yeori nada', 'To have fever', '열이 나요', 'I have a fever'],
        ['기침', 'gichim', 'Cough', '기침이 나요', 'I have a cough'],
        ['기침하다', 'gichimhada', 'To cough', '기침을 해요', 'I cough'],
        ['재채기', 'jaechaegi', 'Sneeze', '재채기가 나요', 'I sneeze'],
        ['콧물', 'konmul', 'Runny nose', '콧물이 나요', 'I have a runny nose'],
        ['감기', 'gamgi', 'Cold', '감기에 걸렸어요', 'I caught a cold'],
        ['독감', 'dokgam', 'Flu', '독감이에요', 'It\'s the flu'],
        ['몸살', 'momsal', 'Body ache', '몸살이 나요', 'I have body aches'],
        ['두통', 'dutong', 'Headache', '두통이 있어요', 'I have a headache'],
        ['복통', 'boktong', 'Stomachache', '복통이 있어요', 'I have a stomachache'],
        ['설사', 'seolsa', 'Diarrhea', '설사를 해요', 'I have diarrhea'],
        ['변비', 'byeonbi', 'Constipation', '변비가 있어요', 'I have constipation'],
        ['구토', 'guto', 'Vomiting', '구토를 해요', 'I vomit'],
        ['메스꺼움', 'meseukkeoweum', 'Nausea', '메스꺼워요', 'I feel nauseous'],
        ['어지럽다', 'eojireopda', 'To be dizzy', '어지러워요', 'I\'m dizzy'],
        ['피곤하다', 'pigonhada', 'To be tired', '피곤해요', 'I\'m tired'],
        ['힘들다', 'himdeurda', 'To be hard/exhausted', '힘들어요', 'It\'s hard'],
        ['졸리다', 'jollida', 'To be sleepy', '졸려요', 'I\'m sleepy'],
        ['피', 'pi', 'Blood', '피가 나요', 'I\'m bleeding'],
        ['상처', 'sangcheo', 'Wound', '상처가 있어요', 'I have a wound'],
        ['다치다', 'dachida', 'To get hurt', '다쳤어요', 'I got hurt'],
        ['부러지다', 'bureojida', 'To break/fracture', '다리가 부러졌어요', 'My leg is broken'],
        ['베이다', 'beida', 'To be cut', '손가락을 베였어요', 'I cut my finger'],
        ['화상', 'hwasang', 'Burn', '화상을 입었어요', 'I got burned'],
        ['알레르기', 'allereugi', 'Allergy', '알레르기가 있어요', 'I have allergies'],
        ['천식', 'cheonsik', 'Asthma', '천식이 있어요', 'I have asthma'],
        ['당뇨', 'dangnyo', 'Diabetes', '당뇨가 있어요', 'I have diabetes'],
        ['고혈압', 'gohyeorap', 'High blood pressure', '고혈압이에요', 'I have high blood pressure'],
        ['약을 먹다', 'yageul meokda', 'To take medicine', '약을 먹어요', 'I take medicine'],
        ['약을 바르다', 'yageul bareuda', 'To apply medicine', '약을 발라요', 'I apply medicine'],
        ['쉬다', 'swida', 'To rest', '집에서 쉬어요', 'I rest at home'],
        ['자다', 'jada', 'To sleep', '푹 자요', 'I sleep well'],
        ['건강하다', 'geonganghada', 'To be healthy', '건강해요', 'I\'m healthy'],
        ['건강', 'geongang', 'Health', '건강이 중요해요', 'Health is important'],
        ['낫다', 'natda', 'To get better', '나았어요', 'I got better'],
        ['치료하다', 'chiryohada', 'To treat', '치료를 해요', 'I treat it'],
        ['예방하다', 'yebanghada', 'To prevent', '예방이 중요해요', 'Prevention is important'],
        ['운동하다', 'undonghada', 'To exercise', '운동을 해요', 'I exercise'],
        ['산책하다', 'sanchaekhada', 'To take a walk', '산책을 해요', 'I take a walk'],
        ['스트레스', 'seuteureseu', 'Stress', '스트레스가 많아요', 'I have a lot of stress'],
        ['피로', 'piro', 'Fatigue', '피로가 쌓여요', 'Fatigue builds up'],
        ['잠', 'jam', 'Sleep', '잠이 안 와요', 'I can\'t sleep'],
        ['불면증', 'bulmyeonjeung', 'Insomnia', '불면증이 있어요', 'I have insomnia'],
        ['체온', 'cheon', 'Body temperature', '체온을 재요', 'I measure body temperature'],
        ['혈압', 'hyeorap', 'Blood pressure', '혈압이 높아요', 'Blood pressure is high'],
        ['맥박', 'maekbak', 'Pulse', '맥박을 재요', 'I check the pulse'],
        ['호흡', 'hoheup', 'Breathing', '호흡이 힘들어요', 'Breathing is difficult'],
        ['응급', 'eunggeup', 'Emergency', '응급실이 어디예요?', 'Where is the emergency room?'],
        ['119', 'ililigu', '119 (Emergency)', '119에 전화해요', 'I call 119'],
        ['구급차', 'gugeupcha', 'Ambulance', '구급차를 불러요', 'I call an ambulance'],
        ['보험', 'boheom', 'Insurance', '보험이 있어요', 'I have insurance'],
        ['건강검진', 'geonganggeomjin', 'Health checkup', '건강검진을 받아요', 'I get a health checkup'],
        ['예약', 'yeyak', 'Appointment', '예약했어요', 'I made an appointment'],
        ['접수', 'jeopsu', 'Reception', '접수하세요', 'Please check in'],
        ['대기실', 'daegisil', 'Waiting room', '대기실에 앉아요', 'I sit in the waiting room'],
        ['진료실', 'jinryosil', 'Treatment room', '진료실로 들어가요', 'I enter the treatment room'],
        ['입원하다', 'ibwonhada', 'To be hospitalized', '입원했어요', 'I was hospitalized'],
        ['퇴원하다', 'toewonhada', 'To be discharged', '내일 퇴원해요', 'I\'m discharged tomorrow'],
        ['통증', 'tongjeung', 'Pain', '통증이 심해요', 'The pain is severe'],
        ['증상', 'jeungsang', 'Symptom', '증상이 뭐예요?', 'What are the symptoms?'],
        ['진단', 'jindan', 'Diagnosis', '진단을 받아요', 'I get diagnosed'],
        ['회복하다', 'hoebokada', 'To recover', '빨리 회복하세요', 'Recover quickly'],
        ['컨디션', 'keondisyeon', 'Condition', '컨디션이 안 좋아요', 'My condition is not good'],
        ['몸', 'mom', 'Body', '몸이 안 좋아요', 'I don\'t feel well']
      ];

      if (i < items.length) {
        const item = items[i];
        return createContentItem(item[0], item[1], item[2], 'word', item[3], item[4]);
      }
      return null;
    }).filter(Boolean)
  },

  // ==========================================
  // BUSINESS - BEGINNER (100+ items)
  // ==========================================
  {
    title: 'Business Korean Basics',
    category: 'business',
    difficulty: 'beginner',
    content: Array(105).fill(null).map((_, i) => {
      const items = [
        ['회사', 'hoesa', 'Company', '회사에 다녀요', 'I go to work'],
        ['직장', 'jikjang', 'Workplace', '직장이 어디예요?', 'Where is your workplace?'],
        ['사무실', 'samusil', 'Office', '사무실에 있어요', 'I\'m in the office'],
        ['일', 'il', 'Work', '일이 많아요', 'I have a lot of work'],
        ['일하다', 'ilhada', 'To work', '열심히 일해요', 'I work hard'],
        ['직원', 'jigwon', 'Employee', '직원이에요', 'I\'m an employee'],
        ['사장', 'sajang', 'President/Boss', '사장님이에요', 'This is the president'],
        ['부장', 'bujang', 'Department head', '부장님', 'Department head'],
        ['과장', 'gwajang', 'Section chief', '과장님', 'Section chief'],
        ['대리', 'daeri', 'Assistant manager', '대리님', 'Assistant manager'],
        ['사원', 'sawon', 'Staff member', '신입 사원', 'New staff'],
        ['동료', 'dongryo', 'Colleague', '동료가 좋아요', 'My colleagues are nice'],
        ['상사', 'sangsa', 'Boss/Superior', '상사에게 보고해요', 'I report to my boss'],
        ['부하', 'buha', 'Subordinate', '부하 직원', 'Subordinate staff'],
        ['회의', 'hoeui', 'Meeting', '회의가 있어요', 'There\'s a meeting'],
        ['미팅', 'miting', 'Meeting', '미팅 시간이에요', 'It\'s meeting time'],
        ['보고', 'bogo', 'Report', '보고서를 써요', 'I write a report'],
        ['발표', 'balpyo', 'Presentation', '발표를 해요', 'I give a presentation'],
        ['프로젝트', 'peurojekteu', 'Project', '프로젝트를 해요', 'I do a project'],
        ['업무', 'eommu', 'Task/Business', '업무가 많아요', 'I have many tasks'],
        ['출근하다', 'chulgeunhada', 'To go to work', '9시에 출근해요', 'I go to work at 9'],
        ['퇴근하다', 'toegyeunhada', 'To leave work', '6시에 퇴근해요', 'I leave work at 6'],
        ['출장', 'chuljang', 'Business trip', '출장 가요', 'I\'m going on a business trip'],
        ['야근', 'yageun', 'Overtime', '야근을 해요', 'I work overtime'],
        ['휴가', 'hyuga', 'Vacation', '휴가를 내요', 'I take vacation'],
        ['월급', 'wolgeum', 'Monthly salary', '월급을 받아요', 'I receive my salary'],
        ['급여', 'geupyeo', 'Salary', '급여가 적어요', 'The salary is low'],
        ['보너스', 'boneoseu', 'Bonus', '보너스를 받았어요', 'I received a bonus'],
        ['승진', 'seungjin', 'Promotion', '승진했어요', 'I got promoted'],
        ['계약', 'gyeyak', 'Contract', '계약서를 써요', 'I write a contract'],
        ['근무', 'geunmu', 'Work/Service', '근무 시간', 'Working hours'],
        ['근무하다', 'geunmuhada', 'To work', '여기서 근무해요', 'I work here'],
        ['명함', 'myeongham', 'Business card', '명함 주세요', 'Please give me your card'],
        ['이메일', 'imeil', 'Email', '이메일 보내요', 'I send an email'],
        ['전화', 'jeonhwa', 'Phone call', '전화 주세요', 'Please call me'],
        ['팩스', 'paekseu', 'Fax', '팩스 보내요', 'I send a fax'],
        ['문서', 'munseo', 'Document', '문서를 작성해요', 'I create a document'],
        ['서류', 'seoryu', 'Documents', '서류가 필요해요', 'I need documents'],
        ['파일', 'pail', 'File', '파일을 보내요', 'I send a file'],
        ['인터넷', 'inteonet', 'Internet', '인터넷이 느려요', 'Internet is slow'],
        ['컴퓨터', 'keompyuteo', 'Computer', '컴퓨터를 켜요', 'I turn on the computer'],
        ['프린터', 'peurinteo', 'Printer', '프린터가 안 돼요', 'Printer doesn\'t work'],
        ['복사', 'boksa', 'Copy', '복사해 주세요', 'Please copy this'],
        ['복사기', 'boksagi', 'Copier', '복사기 어디예요?', 'Where is the copier?'],
        ['책상', 'chaeksang', 'Desk', '책상이 깨끗해요', 'The desk is clean'],
        ['의자', 'uija', 'Chair', '의자가 편해요', 'The chair is comfortable'],
        ['회의실', 'hoeuisil', 'Meeting room', '회의실이 어디예요?', 'Where is the meeting room?'],
        ['휴게실', 'hyugesil', 'Break room', '휴게실에서 쉬어요', 'I rest in the break room'],
        ['커피', 'keopi', 'Coffee', '커피 마셔요', 'I drink coffee'],
        ['점심', 'jeomsim', 'Lunch', '점심 먹어요', 'I eat lunch'],
        ['점심시간', 'jeomsim sigan', 'Lunch time', '점심시간이에요', 'It\'s lunch time'],
        ['바쁘다', 'bappeuda', 'To be busy', '바빠요', 'I\'m busy'],
        ['한가하다', 'hangahada', 'To be free', '한가해요', 'I\'m free'],
        ['시간', 'sigan', 'Time', '시간이 없어요', 'I don\'t have time'],
        ['마감', 'magam', 'Deadline', '마감이 언제예요?', 'When is the deadline?'],
        ['빨리', 'ppalli', 'Quickly', '빨리 해요', 'I do it quickly'],
        ['천천히', 'cheoncheonhi', 'Slowly', '천천히 해요', 'I do it slowly'],
        ['중요하다', 'jungyohada', 'To be important', '중요해요', 'It\'s important'],
        ['필요하다', 'piryohada', 'To be necessary', '필요해요', 'It\'s necessary'],
        ['준비하다', 'junbihada', 'To prepare', '준비해요', 'I prepare'],
        ['확인하다', 'hwaginhada', 'To check/confirm', '확인해 주세요', 'Please confirm'],
        ['결정하다', 'gyeoljeonghada', 'To decide', '결정했어요', 'I decided'],
        ['계획', 'gyehoek', 'Plan', '계획이 있어요', 'I have a plan'],
        ['계획하다', 'gyehoekhada', 'To plan', '계획을 세워요', 'I make a plan'],
        ['목표', 'mokpyo', 'Goal', '목표가 있어요', 'I have a goal'],
        ['성공', 'seonggong', 'Success', '성공했어요', 'I succeeded'],
        ['실패', 'silpae', 'Failure', '실패했어요', 'I failed'],
        ['노력', 'noryeok', 'Effort', '노력해요', 'I try hard'],
        ['노력하다', 'noryeokhada', 'To make an effort', '열심히 노력해요', 'I work hard'],
        ['열심히', 'yeolsimhi', 'Diligently', '열심히 일해요', 'I work diligently'],
        ['최선', 'choeseon', 'One\'s best', '최선을 다해요', 'I do my best'],
        ['문제', 'munje', 'Problem', '문제가 있어요', 'There\'s a problem'],
        ['해결', 'haegyeol', 'Solution', '해결했어요', 'I solved it'],
        ['해결하다', 'haegyeolhada', 'To solve', '문제를 해결해요', 'I solve the problem'],
        ['질문', 'jilmun', 'Question', '질문이 있어요', 'I have a question'],
        ['질문하다', 'jilmunhada', 'To ask', '질문해도 돼요?', 'May I ask a question?'],
        ['답', 'dap', 'Answer', '답을 알아요', 'I know the answer'],
        ['대답하다', 'daedapada', 'To answer', '대답해 주세요', 'Please answer'],
        ['설명', 'seolmyeong', 'Explanation', '설명해 주세요', 'Please explain'],
        ['이해하다', 'ihaehada', 'To understand', '이해했어요', 'I understood'],
        ['모르다', 'moreuda', 'To not know', '몰라요', 'I don\'t know'],
        ['알다', 'alda', 'To know', '알아요', 'I know'],
        ['배우다', 'baeuda', 'To learn', '배워요', 'I learn'],
        ['가르치다', 'gareuchida', 'To teach', '가르쳐 주세요', 'Please teach me'],
        ['도와주다', 'dowajuda', 'To help', '도와줘요', 'I help'],
        ['도움', 'doum', 'Help', '도움이 필요해요', 'I need help'],
        ['감사하다', 'gamsahada', 'To be grateful', '감사해요', 'Thank you'],
        ['고맙다', 'gomapda', 'To be thankful', '고마워요', 'Thanks'],
        ['죄송하다', 'joesonghada', 'To be sorry', '죄송해요', 'I\'m sorry'],
        ['미안하다', 'mianhada', 'To be sorry', '미안해요', 'I\'m sorry'],
        ['괜찮다', 'gwaenchanta', 'To be okay', '괜찮아요', 'It\'s okay'],
        ['좋다', 'jota', 'To be good', '좋아요', 'It\'s good'],
        ['나쁘다', 'nappeuda', 'To be bad', '나빠요', 'It\'s bad'],
        ['부서', 'buseo', 'Department', '어느 부서예요?', 'Which department?'],
        ['팀', 'tim', 'Team', '팀장이에요', 'This is the team leader'],
        ['고객', 'gogaek', 'Customer/Client', '고객과 만나요', 'I meet with a client'],
        ['거래처', 'georaecheo', 'Business partner', '거래처에 가요', 'I go to the business partner'],
        ['매출', 'maechul', 'Sales', '매출이 늘었어요', 'Sales increased'],
        ['비용', 'biyong', 'Cost/Expense', '비용이 많아요', 'Costs are high'],
        ['예산', 'yesan', 'Budget', '예산이 부족해요', 'Budget is insufficient'],
        ['담당', 'damdang', 'In charge', '제가 담당해요', 'I\'m in charge']
      ];

      if (i < items.length) {
        const item = items[i];
        return createContentItem(item[0], item[1], item[2], 'word', item[3], item[4]);
      }
      return null;
    }).filter(Boolean)
  },

  // Add remaining 12 lessons with real Korean vocabulary
  // Daily Life - Intermediate & Advanced
  {
    title: 'Daily Activities & Schedules',
    category: 'daily-life',
    difficulty: 'intermediate',
    content: realLessons.dailyLifeIntermediate
  },
  {
    title: 'Lifestyle & Cultural Practices',
    category: 'daily-life',
    difficulty: 'advanced',
    content: realLessons.dailyLifeAdvanced
  },

  // Food - Intermediate & Advanced
  {
    title: 'Restaurant Conversations',
    category: 'food',
    difficulty: 'intermediate',
    content: realLessons.foodIntermediate
  },
  {
    title: 'Korean Cuisine Culture',
    category: 'food',
    difficulty: 'advanced',
    content: realLessons.foodAdvanced
  },

  // Travel - Intermediate & Advanced
  {
    title: 'Public Transportation',
    category: 'travel',
    difficulty: 'intermediate',
    content: realLessons.travelIntermediate
  },
  {
    title: 'Travel Planning',
    category: 'travel',
    difficulty: 'advanced',
    content: realLessons.travelAdvanced
  },

  // Shopping - Intermediate & Advanced
  {
    title: 'Price Negotiation',
    category: 'shopping',
    difficulty: 'intermediate',
    content: realLessons.shoppingIntermediate
  },
  {
    title: 'Consumer Rights',
    category: 'shopping',
    difficulty: 'advanced',
    content: realLessons.shoppingAdvanced
  },

  // Business - Intermediate & Advanced
  {
    title: 'Office Communication',
    category: 'business',
    difficulty: 'intermediate',
    content: realLessons.businessIntermediate
  },
  {
    title: 'Corporate Management',
    category: 'business',
    difficulty: 'advanced',
    content: realLessons.businessAdvanced
  },

  // Healthcare - Intermediate & Advanced
  {
    title: 'Medical Consultations',
    category: 'healthcare',
    difficulty: 'intermediate',
    content: realLessons.healthcareIntermediate
  },
  {
    title: 'Specialized Treatment',
    category: 'healthcare',
    difficulty: 'advanced',
    content: realLessons.healthcareAdvanced
  },

  // ==========================================
  // SENTENCES DIFFICULTY - All Categories
  // ==========================================

  // Greetings - Sentences
  {
    title: 'Conversation Practice',
    category: 'greetings',
    difficulty: 'sentences',
    content: sentenceLessons.greetingsSentences
  },

  // Daily Life - Sentences
  {
    title: 'Daily Conversations',
    category: 'daily-life',
    difficulty: 'sentences',
    content: sentenceLessons.dailyLifeSentences
  },

  // Food - Sentences
  {
    title: 'Restaurant Dialogues',
    category: 'food',
    difficulty: 'sentences',
    content: sentenceLessons.foodSentences
  },

  // Travel - Sentences
  {
    title: 'Travel Conversations',
    category: 'travel',
    difficulty: 'sentences',
    content: sentenceLessons.travelSentences
  },

  // Shopping - Sentences
  {
    title: 'Shopping Dialogues',
    category: 'shopping',
    difficulty: 'sentences',
    content: sentenceLessons.shoppingSentences
  },

  // Business - Sentences
  {
    title: 'Workplace Conversations',
    category: 'business',
    difficulty: 'sentences',
    content: sentenceLessons.businessSentences
  },

  // Healthcare - Sentences
  {
    title: 'Medical Conversations',
    category: 'healthcare',
    difficulty: 'sentences',
    content: sentenceLessons.healthcareSentences
  }
];

// Connect to MongoDB and seed data
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing lessons
    await Lesson.deleteMany({});
    console.log('Cleared existing lessons');

    // Insert new lessons
    const insertedLessons = await Lesson.insertMany(lessons);
    console.log(`\n✅ Successfully inserted ${insertedLessons.length} lessons`);

    console.log('\n=== Lesson Summary ===');
    lessons.forEach((lesson, idx) => {
      console.log(`${idx + 1}. ${lesson.title} (${lesson.category} - ${lesson.difficulty}): ${lesson.content.length} exercises`);
    });

    const categories = [...new Set(lessons.map(l => l.category))];
    console.log('\n=== Category Breakdown ===');
    categories.forEach(cat => {
      const catLessons = lessons.filter(l => l.category === cat);
      const totalExercises = catLessons.reduce((sum, l) => sum + l.content.length, 0);
      console.log(`${cat}: ${catLessons.length} lessons, ${totalExercises} total exercises`);
    });

    console.log('\n=== Difficulty Breakdown ===');
    const difficulties = ['beginner', 'intermediate', 'advanced'];
    difficulties.forEach(diff => {
      const diffLessons = lessons.filter(l => l.difficulty === diff);
      const totalExercises = diffLessons.reduce((sum, l) => sum + l.content.length, 0);
      console.log(`${diff}: ${diffLessons.length} lessons, ${totalExercises} total exercises`);
    });

    console.log('\n✨ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
