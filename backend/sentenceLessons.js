// Sentence-based lessons for all categories
// These are Q&A style sentences in Korean

const createContentItem = (korean, romanization, english, type = 'sentence', example = '', exampleEnglish = '', breakdown = null) => ({
  type,
  korean,
  romanization,
  english,
  pronunciation: romanization,
  example: example || korean,
  exampleEnglish: exampleEnglish || english,
  ...(breakdown ? { breakdown } : {}),
});

// GREETINGS - Sentences (Q&A format)
const greetingsSentences = [
['안녕하세요?', 'Annyeonghaseyo?', 'Hello, how are you?', [
  { korean: '안녕하세요?', english: 'Hello / How are you?' },
]],
['잘 지냈어요?', 'Jal jinaesseoyo?', 'How have you been?', [
  { korean: '잘', english: 'well' },
  { korean: '지냈어요?', english: 'have you been?' },
]],
['네, 잘 지냈어요.', 'Ne, jal jinaesseoyo.', 'Yes, I have been well.', [
  { korean: '네', english: 'yes' },
  { korean: '잘 지냈어요', english: 'I have been well' },
]],
['오랜만이에요.', 'Oraenmanieyo.', 'Long time no see.', [
  { korean: '오랜만이에요', english: 'it has been a long time' },
]],
['정말 오랜만이네요.', 'Jeongmal oraenmanineyo.', 'It has been a really long time.', [
  { korean: '정말', english: 'really' },
  { korean: '오랜만이네요', english: 'it has been a long time' },
]],
['어떻게 지내세요?', 'Eotteoke jinaeseyo?', 'How are you doing?', [
  { korean: '어떻게', english: 'how' },
  { korean: '지내세요?', english: 'are you doing?' },
]],
['덕분에 잘 지내요.', 'Deokbune jal jinaeyo.', 'I am doing well, thanks to you.', [
  { korean: '덕분에', english: 'thanks to you' },
  { korean: '잘 지내요', english: 'I am doing well' },
]],
['만나서 반가워요.', 'Mannaseo bangawoyo.', 'Nice to meet you.', [
  { korean: '만나서', english: 'meeting you' },
  { korean: '반가워요', english: 'I am glad' },
]],
['저도 반가워요.', 'Jeodo bangawoyo.', 'Nice to meet you too.', [
  { korean: '저도', english: 'me too' },
  { korean: '반가워요', english: 'I am glad' },
]],
['이름이 뭐예요?', 'Ireumi mwoyeyo?', 'What is your name?', [
  { korean: '이름이', english: 'name' },
  { korean: '뭐예요?', english: 'what is?' },
]],
['제 이름은 김민수예요.', 'Je ireumeun Kim Minsuyeyo.', 'My name is Kim Minsu.', [
  { korean: '제 이름은', english: 'my name' },
  { korean: '김민수예요', english: 'is Kim Minsu' },
]],
['어디서 오셨어요?', 'Eodiseo osyeosseoyo?', 'Where are you from?', [
  { korean: '어디서', english: 'from where' },
  { korean: '오셨어요?', english: 'did you come?' },
]],
['저는 미국에서 왔어요.', 'Jeoneun migugeseo wasseoyo.', 'I am from America.', [
  { korean: '저는', english: 'I' },
  { korean: '미국에서', english: 'from America' },
  { korean: '왔어요', english: 'came' },
]],
['한국말 잘하시네요.', 'Hangungmal jalhasineyo.', 'You speak Korean well.', [
  { korean: '한국말', english: 'Korean language' },
  { korean: '잘하시네요', english: 'you speak well' },
]],
['아니에요, 아직 배우고 있어요.', 'Anieyo, ajik baeugo isseoyo.', 'No, I am still learning.', [
  { korean: '아니에요', english: 'no' },
  { korean: '아직', english: 'still' },
  { korean: '배우고 있어요', english: 'I am learning' },
]],
['직업이 뭐예요?', 'Jigeobi mwoyeyo?', 'What is your job?', [
  { korean: '직업이', english: 'job' },
  { korean: '뭐예요?', english: 'what is?' },
]],
['저는 학생이에요.', 'Jeoneun haksaengieyo.', 'I am a student.', [
  { korean: '저는', english: 'I' },
  { korean: '학생이에요', english: 'am a student' },
]],
['몇 살이에요?', 'Myeot sarieyo?', 'How old are you?', [
  { korean: '몇 살이에요?', english: 'how old are you?' },
]],
['스물다섯 살이에요.', 'Seumuldaseot sarieyo.', 'I am twenty-five years old.', [
  { korean: '스물다섯', english: 'twenty-five' },
  { korean: '살이에요', english: 'years old' },
]],
['취미가 뭐예요?', 'Chwimiga mwoyeyo?', 'What is your hobby?', [
  { korean: '취미가', english: 'hobby' },
  { korean: '뭐예요?', english: 'what is?' },
]],
['음악 듣는 것을 좋아해요.', 'Eumak deutneun geoseul joahaeyo.', 'I like listening to music.', [
  { korean: '음악 듣는 것을', english: 'listening to music' },
  { korean: '좋아해요', english: 'I like' },
]],
['가족이 몇 명이에요?', 'Gajogi myeot myeongieyo?', 'How many people are in your family?', [
  { korean: '가족이', english: 'family' },
  { korean: '몇 명이에요?', english: 'how many people?' },
]],
['네 명이에요.', 'Ne myeongieyo.', 'There are four people.', [
  { korean: '네 명이에요', english: 'there are four people' },
]],
['형제자매가 있어요?', 'Hyeongje jamae ga isseoyo?', 'Do you have siblings?', [
  { korean: '형제자매가', english: 'siblings' },
  { korean: '있어요?', english: 'do you have?' },
]],
['네, 언니가 한 명 있어요.', 'Ne, eonniga han myeong isseoyo.', 'Yes, I have one older sister.', [
  { korean: '네', english: 'yes' },
  { korean: '언니가', english: 'older sister' },
  { korean: '한 명', english: 'one person' },
  { korean: '있어요', english: 'I have' },
]],
['주말에 뭐 했어요?', 'Jumare mwo haesseoyo?', 'What did you do on the weekend?', [
  { korean: '주말에', english: 'on the weekend' },
  { korean: '뭐 했어요?', english: 'what did you do?' },
]],
['친구들하고 영화를 봤어요.', 'Chingudeurhago yeonghwareul bwasseoyo.', 'I watched a movie with friends.', [
  { korean: '친구들하고', english: 'with friends' },
  { korean: '영화를', english: 'a movie' },
  { korean: '봤어요', english: 'I watched' },
]],
['오늘 날씨가 좋네요.', 'Oneul nalssiga joneyo.', 'The weather is nice today.', [
  { korean: '오늘', english: 'today' },
  { korean: '날씨가', english: 'the weather' },
  { korean: '좋네요', english: 'is nice' },
]],
['네, 정말 좋아요.', 'Ne, jeongmal joayo.', 'Yes, it is really nice.', [
  { korean: '네', english: 'yes' },
  { korean: '정말', english: 'really' },
  { korean: '좋아요', english: 'it is nice' },
]],
['내일 시간 있어요?', 'Naeil sigan isseoyo?', 'Do you have time tomorrow?', [
  { korean: '내일', english: 'tomorrow' },
  { korean: '시간 있어요?', english: 'do you have time?' },
]],
['네, 시간 있어요.', 'Ne, sigan isseoyo.', 'Yes, I have time.', [
  { korean: '네', english: 'yes' },
  { korean: '시간 있어요', english: 'I have time' },
]],
['커피 한잔 할까요?', 'Keopi hanjan halkkayo?', 'Shall we have a cup of coffee?', [
  { korean: '커피 한잔', english: 'a cup of coffee' },
  { korean: '할까요?', english: 'shall we have?' },
]],
['좋아요, 그럽시다.', 'Joayo, geureopsida.', 'Sounds good, let\'s do that.', [
  { korean: '좋아요', english: 'sounds good' },
  { korean: '그럽시다', english: 'let\'s do that' },
]],
['전화번호가 어떻게 되세요?', 'Jeonhwa beonhoga eotteoke doeseyo?', 'What is your phone number?', [
  { korean: '전화번호가', english: 'phone number' },
  { korean: '어떻게 되세요?', english: 'what is it?' },
]],
['010-1234-5678이에요.', '010-1234-5678ieyo.', 'It is 010-1234-5678.', [
  { korean: '010-1234-5678이에요', english: 'it is 010-1234-5678' },
]],
['연락 드릴게요.', 'Yeollak deurilgeyo.', 'I will contact you.', [
  { korean: '연락', english: 'contact' },
  { korean: '드릴게요', english: 'I will give (humble)' },
]],
['네, 연락 주세요.', 'Ne, yeollak juseyo.', 'Yes, please contact me.', [
  { korean: '네', english: 'yes' },
  { korean: '연락 주세요', english: 'please contact me' },
]],
['요즘 어떠세요?', 'Yojeum eotteoseyo?', 'How are things these days?', [
  { korean: '요즘', english: 'these days' },
  { korean: '어떠세요?', english: 'how are things?' },
]],
['바쁘지만 괜찮아요.', 'Bappeujiman gwaenchanhayo.', 'I am busy but okay.', [
  { korean: '바쁘지만', english: 'I am busy but' },
  { korean: '괜찮아요', english: 'it is okay' },
]],
['건강은 어떠세요?', 'Geongangeun eotteoseyo?', 'How is your health?', [
  { korean: '건강은', english: 'health' },
  { korean: '어떠세요?', english: 'how is it?' },
]],
['건강해요, 감사합니다.', 'Geonganghaeyo, gamsahamnida.', 'I am healthy, thank you.', [
  { korean: '건강해요', english: 'I am healthy' },
  { korean: '감사합니다', english: 'thank you' },
]],
['한국은 처음이에요?', 'Hangugeun cheoumieyo?', 'Is this your first time in Korea?', [
  { korean: '한국은', english: 'Korea' },
  { korean: '처음이에요?', english: 'is it the first time?' },
]],
['네, 처음이에요.', 'Ne, cheoumieyo.', 'Yes, it is my first time.', [
  { korean: '네', english: 'yes' },
  { korean: '처음이에요', english: 'it is the first time' },
]],
['한국 음식 좋아하세요?', 'Hanguk eumsik joahaseyo?', 'Do you like Korean food?', [
  { korean: '한국 음식', english: 'Korean food' },
  { korean: '좋아하세요?', english: 'do you like?' },
]],
['네, 아주 좋아해요.', 'Ne, aju joahaeyo.', 'Yes, I like it very much.', [
  { korean: '네', english: 'yes' },
  { korean: '아주', english: 'very much' },
  { korean: '좋아해요', english: 'I like it' },
]],
['김치 먹을 수 있어요?', 'Gimchi meogeul su isseoyo?', 'Can you eat kimchi?', [
  { korean: '김치', english: 'kimchi' },
  { korean: '먹을 수 있어요?', english: 'can you eat?' },
]],
['네, 김치 좋아해요.', 'Ne, gimchi joahaeyo.', 'Yes, I like kimchi.', [
  { korean: '네', english: 'yes' },
  { korean: '김치', english: 'kimchi' },
  { korean: '좋아해요', english: 'I like' },
]],
['한국어 공부한 지 얼마나 됐어요?', 'Hangugeo gongbuhan ji eolmana dwaesseoyo?', 'How long have you been studying Korean?', [
  { korean: '한국어 공부한 지', english: 'since studying Korean' },
  { korean: '얼마나 됐어요?', english: 'how long has it been?' },
]],
['1년 정도 됐어요.', '1nyeon jeongdo dwaesseoyo.', 'About one year.', [
  { korean: '1년 정도', english: 'about one year' },
  { korean: '됐어요', english: 'it has been' },
]],
['한국어가 어려워요?', 'Hangugeoga eoryeowoyo?', 'Is Korean difficult?', [
  { korean: '한국어가', english: 'Korean language' },
  { korean: '어려워요?', english: 'is it difficult?' },
]],
['조금 어렵지만 재미있어요.', 'Jogeum eoryeopjiman jaemiisseoyo.', 'It is a bit difficult but interesting.', [
  { korean: '조금 어렵지만', english: 'a bit difficult but' },
  { korean: '재미있어요', english: 'it is interesting' },
]],
['한국에서 뭐 하세요?', 'Hangugeseo mwo haseyo?', 'What do you do in Korea?', [
  { korean: '한국에서', english: 'in Korea' },
  { korean: '뭐 하세요?', english: 'what do you do?' },
]],
['영어를 가르쳐요.', 'Yeongeoreul gareuchyeoyo.', 'I teach English.', [
  { korean: '영어를', english: 'English' },
  { korean: '가르쳐요', english: 'I teach' },
]],
['한국 생활은 어때요?', 'Hanguk saenghwareun eottaeyo.', 'How is life in Korea?', [
  { korean: '한국 생활은', english: 'life in Korea' },
  { korean: '어때요?', english: 'how is it?' },
]],
['정말 좋아요.', 'Jeongmal joayo.', 'It is really good.', [
  { korean: '정말', english: 'really' },
  { korean: '좋아요', english: 'it is good' },
]],
['한국에 얼마나 있을 거예요?', 'Hanguge eolmana isseul geoyeyo?', 'How long will you be in Korea?', [
  { korean: '한국에', english: 'in Korea' },
  { korean: '얼마나', english: 'how long' },
  { korean: '있을 거예요?', english: 'will you be?' },
]],
['2년 정도 있을 거예요.', '2nyeon jeongdo isseul geoyeyo.', 'I will be here for about 2 years.', [
  { korean: '2년 정도', english: 'about 2 years' },
  { korean: '있을 거예요', english: 'I will be here' },
]],
['주말에 보통 뭐 해요?', 'Jumare botong mwo haeyo?', 'What do you usually do on weekends?', [
  { korean: '주말에', english: 'on weekends' },
  { korean: '보통', english: 'usually' },
  { korean: '뭐 해요?', english: 'what do you do?' },
]],
['보통 집에서 쉬어요.', 'Botong jibeseo swieoyo.', 'I usually rest at home.', [
  { korean: '보통', english: 'usually' },
  { korean: '집에서', english: 'at home' },
  { korean: '쉬어요', english: 'I rest' },
]],
['언제 한국에 왔어요?', 'Eonje hanguge wasseoyo?', 'When did you come to Korea?', [
  { korean: '언제', english: 'when' },
  { korean: '한국에', english: 'to Korea' },
  { korean: '왔어요?', english: 'did you come?' },
]],
['작년에 왔어요.', 'Jangnyeone wasseoyo.', 'I came last year.', [
  { korean: '작년에', english: 'last year' },
  { korean: '왔어요', english: 'I came' },
]],
['어디에 살아요?', 'Eodie sarayo?', 'Where do you live?', [
  { korean: '어디에', english: 'where' },
  { korean: '살아요?', english: 'do you live?' },
]],
['서울에 살아요.', 'Seoure sarayo.', 'I live in Seoul.', [
  { korean: '서울에', english: 'in Seoul' },
  { korean: '살아요', english: 'I live' },
]],
['서울 어디에 살아요?', 'Seoul eodie sarayo?', 'Where in Seoul do you live?', [
  { korean: '서울 어디에', english: 'where in Seoul' },
  { korean: '살아요?', english: 'do you live?' },
]],
['강남에 살아요.', 'Gangnamen sarayo.', 'I live in Gangnam.', [
  { korean: '강남에', english: 'in Gangnam' },
  { korean: '살아요', english: 'I live' },
]],
['혼자 살아요?', 'Honja sarayo?', 'Do you live alone?', [
  { korean: '혼자', english: 'alone' },
  { korean: '살아요?', english: 'do you live?' },
]],
['아니요, 룸메이트와 살아요.', 'Aniyo, rummeiteuwa sarayo.', 'No, I live with a roommate.', [
  { korean: '아니요', english: 'no' },
  { korean: '룸메이트와', english: 'with a roommate' },
  { korean: '살아요', english: 'I live' },
]],
['집이 어때요?', 'Jibi eottaeyo?', 'How is your house?', [
  { korean: '집이', english: 'house' },
  { korean: '어때요?', english: 'how is it?' },
]],
['작지만 괜찮아요.', 'Jakjiman gwaenchanhayo.', 'It is small but okay.', [
  { korean: '작지만', english: 'it is small but' },
  { korean: '괜찮아요', english: 'it is okay' },
]],
['회사는 어디예요?', 'Hoesaneun eodiyeyo?', 'Where is your company?', [
  { korean: '회사는', english: 'company' },
  { korean: '어디예요?', english: 'where is it?' },
]],
['강남역 근처예요.', 'Gangnam yeok geuncheoyeyo.', 'It is near Gangnam station.', [
  { korean: '강남역', english: 'Gangnam station' },
  { korean: '근처예요', english: 'it is near' },
]],
['출퇴근 시간이 얼마나 걸려요?', 'Chultoegeun sigani eolmana geollyeoyo?', 'How long is your commute?', [
  { korean: '출퇴근 시간이', english: 'commute time' },
  { korean: '얼마나 걸려요?', english: 'how long does it take?' },
]],
['한 시간 정도 걸려요.', 'Han sigan jeongdo geollyeoyo.', 'It takes about one hour.', [
  { korean: '한 시간 정도', english: 'about one hour' },
  { korean: '걸려요', english: 'it takes' },
]],
['무슨 요일에 쉬어요?', 'Museun yoire swieoyo?', 'What day do you have off?', [
  { korean: '무슨 요일에', english: 'on what day' },
  { korean: '쉬어요?', english: 'do you have off?' },
]],
['토요일하고 일요일에 쉬어요.', 'Toyoilhago iryoire swieoyo.', 'I have off on Saturday and Sunday.', [
  { korean: '토요일하고', english: 'Saturday and' },
  { korean: '일요일에', english: 'on Sunday' },
  { korean: '쉬어요', english: 'I have off' },
]],
['오늘 바빠요?', 'Oneul bappayo?', 'Are you busy today?', [
  { korean: '오늘', english: 'today' },
  { korean: '바빠요?', english: 'are you busy?' },
]],
['아니요, 안 바빠요.', 'Aniyo, an bappayo.', 'No, I am not busy.', [
  { korean: '아니요', english: 'no' },
  { korean: '안 바빠요', english: 'I am not busy' },
]],
['같이 점심 먹을래요?', 'Gachi jeomsim meogeullaeyo?', 'Do you want to eat lunch together?', [
  { korean: '같이', english: 'together' },
  { korean: '점심', english: 'lunch' },
  { korean: '먹을래요?', english: 'do you want to eat?' },
]],
['좋아요, 같이 먹어요.', 'Joayo, gachi meogeoyo.', 'Sounds good, let\'s eat together.', [
  { korean: '좋아요', english: 'sounds good' },
  { korean: '같이 먹어요', english: 'let\'s eat together' },
]],
['뭐 먹고 싶어요?', 'Mwo meokgo sipeoyo?', 'What do you want to eat?', [
  { korean: '뭐', english: 'what' },
  { korean: '먹고 싶어요?', english: 'do you want to eat?' },
]],
['한식이 먹고 싶어요.', 'Hansigi meokgo sipeoyo.', 'I want to eat Korean food.', [
  { korean: '한식이', english: 'Korean food' },
  { korean: '먹고 싶어요', english: 'I want to eat' },
]],
['지금 시간 있어요?', 'Jigeum sigan isseoyo?', 'Do you have time now?', [
  { korean: '지금', english: 'now' },
  { korean: '시간 있어요?', english: 'do you have time?' },
]],
['미안해요, 지금은 바빠요.', 'Mianhaeyo, jigeumeun bappayo.', 'Sorry, I am busy now.', [
  { korean: '미안해요', english: 'sorry' },
  { korean: '지금은', english: 'right now' },
  { korean: '바빠요', english: 'I am busy' },
]],
['나중에 연락할게요.', 'Najunge yeonlakhalgeyo.', 'I will contact you later.', [
  { korean: '나중에', english: 'later' },
  { korean: '연락할게요', english: 'I will contact you' },
]],
['네, 나중에 봐요.', 'Ne, najunge bwayo.', 'Okay, see you later.', [
  { korean: '네', english: 'okay' },
  { korean: '나중에', english: 'later' },
  { korean: '봐요', english: 'see you' },
]],
['잘 가요.', 'Jal gayo.', 'Goodbye (to someone leaving).', [
  { korean: '잘', english: 'well' },
  { korean: '가요', english: 'go' },
]],
['안녕히 가세요.', 'Annyeonghi gaseyo.', 'Goodbye (formal, to someone leaving).', [
  { korean: '안녕히', english: 'peacefully' },
  { korean: '가세요', english: 'please go' },
]],
['안녕히 계세요.', 'Annyeonghi gyeseyo.', 'Goodbye (to someone staying).', [
  { korean: '안녕히', english: 'peacefully' },
  { korean: '계세요', english: 'please stay' },
]],
['또 만나요.', 'Tto mannayo.', 'See you again.', [
  { korean: '또', english: 'again' },
  { korean: '만나요', english: 'let\'s meet' },
]],
['내일 봐요.', 'Naeil bwayo.', 'See you tomorrow.', [
  { korean: '내일', english: 'tomorrow' },
  { korean: '봐요', english: 'see you' },
]],
['다음 주에 봐요.', 'Daeum jue bwayo.', 'See you next week.', [
  { korean: '다음 주에', english: 'next week' },
  { korean: '봐요', english: 'see you' },
]],
['좋은 하루 보내세요.', 'Joeun haru bonaeseyo.', 'Have a good day.', [
  { korean: '좋은 하루', english: 'a good day' },
  { korean: '보내세요', english: 'please have' },
]],
['감사합니다, 당신도요.', 'Gamsahamnida, dangsindo yo.', 'Thank you, you too.', [
  { korean: '감사합니다', english: 'thank you' },
  { korean: '당신도요', english: 'you too' },
]],
['수고하셨어요.', 'Sugohasseosseoyo.', 'Good job (acknowledgment of hard work).', [
  { korean: '수고하셨어요', english: 'you worked hard' },
]],
['감사합니다.', 'Gamsahamnida.', 'Thank you.', [
  { korean: '감사합니다', english: 'thank you' },
]],
['실례합니다.', 'Sillyehamnida.', 'Excuse me.', [
  { korean: '실례합니다', english: 'excuse me' },
]],
['괜찮아요.', 'Gwaenchanhayo.', 'It\'s okay.', [
  { korean: '괜찮아요', english: 'it\'s okay' },
]],
['죄송합니다.', 'Joesonghamnida.', 'I am sorry.', [
  { korean: '죄송합니다', english: 'I am sorry' },
]],
['괜찮아요, 신경 쓰지 마세요.', 'Gwaenchanhayo, singyeong sseuji maseyo.', 'It\'s okay, don\'t worry about it.', [
  { korean: '괜찮아요', english: 'it\'s okay' },
  { korean: '신경 쓰지 마세요', english: 'don\'t worry about it' },
]],
['도와주셔서 감사합니다.', 'Dowajusyeoseo gamsahamnida.', 'Thank you for helping.', [
  { korean: '도와주셔서', english: 'for helping' },
  { korean: '감사합니다', english: 'thank you' },
]],
['천만에요.', 'Cheonmaneyo.', 'You\'re welcome.', [
  { korean: '천만에요', english: 'you\'re welcome' },
]],
['잠깐만 기다려 주세요.', 'Jamkkanman gidaryeo juseyo.', 'Please wait a moment.', [
  { korean: '잠깐만', english: 'just a moment' },
  { korean: '기다려 주세요', english: 'please wait' },
]],
['네, 알겠습니다.', 'Ne, algesseumnida.', 'Yes, I understand.', [
  { korean: '네', english: 'yes' },
  { korean: '알겠습니다', english: 'I understand' },
]],
['다시 한번 말씀해 주세요.', 'Dasi hanbeon malsseum hae juseyo.', 'Please say it one more time.', [
  { korean: '다시 한번', english: 'one more time' },
  { korean: '말씀해 주세요', english: 'please say' },
]],
['천천히 말씀해 주세요.', 'Cheoncheonhi malsseum hae juseyo.', 'Please speak slowly.', [
  { korean: '천천히', english: 'slowly' },
  { korean: '말씀해 주세요', english: 'please speak' },
]],
['무슨 뜻이에요?', 'Museun ddeusieyo?', 'What does it mean?', [
  { korean: '무슨', english: 'what' },
  { korean: '뜻이에요?', english: 'does it mean?' },
]],
['잘 모르겠어요.', 'Jal moreugesseoyo.', 'I don\'t know well.', [
  { korean: '잘', english: 'well' },
  { korean: '모르겠어요', english: 'I don\'t know' },
]],
['이해했어요?', 'Ihaehaesseoyo?', 'Did you understand?', [
  { korean: '이해했어요?', english: 'did you understand?' },
]],
['네, 이해했어요.', 'Ne, ihaehaesseoyo.', 'Yes, I understood.', [
  { korean: '네', english: 'yes' },
  { korean: '이해했어요', english: 'I understood' },
]],
].map(([k, r, e, b]) => createContentItem(k, r, e, 'sentence', k, e, b));

// DAILY LIFE - Sentences
const dailyLifeSentences = [
  // Morning routine
  ['아침에 몇 시에 일어나요?', 'Achime myeot sie ireonayo?', 'What time do you wake up in the morning?', [
    { korean: '아침에', english: 'in the morning' },
    { korean: '몇 시에', english: 'at what time' },
    { korean: '일어나요?', english: 'do you wake up?' },
  ]],
  ['보통 7시에 일어나요.', 'Botong 7sie ireonayo.', 'I usually wake up at 7 o\'clock.', [
    { korean: '보통', english: 'usually' },
    { korean: '7시에', english: 'at 7 o\'clock' },
    { korean: '일어나요', english: 'I wake up' },
  ]],
  ['아침은 뭐 먹어요?', 'Achimeun mwo meogeoyo?', 'What do you eat for breakfast?', [
    { korean: '아침은', english: 'for breakfast' },
    { korean: '뭐', english: 'what' },
    { korean: '먹어요?', english: 'do you eat?' },
  ]],
  ['보통 빵하고 커피를 먹어요.', 'Botong ppanghago keopireul meogeoyo.', 'I usually eat bread and coffee.', [
    { korean: '보통', english: 'usually' },
    { korean: '빵하고', english: 'bread and' },
    { korean: '커피를', english: 'coffee' },
    { korean: '먹어요', english: 'I eat' },
  ]],

  // Work routine
  ['출근 시간이 언제예요?', 'Chulgeun sigani eonjeyeyo?', 'When is your work start time?', [
    { korean: '출근 시간이', english: 'work start time' },
    { korean: '언제예요?', english: 'when is it?' },
  ]],
  ['9시에 출근해요.', '9sie chulgeunhaeyo.', 'I start work at 9 o\'clock.', [
    { korean: '9시에', english: 'at 9 o\'clock' },
    { korean: '출근해요', english: 'I go to work' },
  ]],
  ['어떻게 출근해요?', 'Eotteoke chulgeunhaeyo?', 'How do you commute to work?', [
    { korean: '어떻게', english: 'how' },
    { korean: '출근해요?', english: 'do you commute?' },
  ]],
  ['지하철로 출근해요.', 'Jihacheolro chulgeunhaeyo.', 'I commute by subway.', [
    { korean: '지하철로', english: 'by subway' },
    { korean: '출근해요', english: 'I commute' },
  ]],
  ['점심은 어디서 먹어요?', 'Jeomsimeun eodiseo meogeoyo?', 'Where do you eat lunch?', [
    { korean: '점심은', english: 'lunch' },
    { korean: '어디서', english: 'where' },
    { korean: '먹어요?', english: 'do you eat?' },
  ]],
  ['회사 근처 식당에서 먹어요.', 'Hoesa geuncheo sikdangeseo meogeoyo.', 'I eat at a restaurant near the office.', [
    { korean: '회사 근처', english: 'near the office' },
    { korean: '식당에서', english: 'at a restaurant' },
    { korean: '먹어요', english: 'I eat' },
  ]],
  ['퇴근 시간이 언제예요?', 'Toegeun sigani eonjeyeyo?', 'When do you finish work?', [
    { korean: '퇴근 시간이', english: 'finish work time' },
    { korean: '언제예요?', english: 'when is it?' },
  ]],
  ['6시에 퇴근해요.', '6sie toegeunhaeyo.', 'I finish work at 6 o\'clock.', [
    { korean: '6시에', english: 'at 6 o\'clock' },
    { korean: '퇴근해요', english: 'I finish work' },
  ]],
  ['퇴근 후에 뭐 해요?', 'Toegeun hue mwo haeyo?', 'What do you do after work?', [
    { korean: '퇴근 후에', english: 'after work' },
    { korean: '뭐', english: 'what' },
    { korean: '해요?', english: 'do you do?' },
  ]],
  ['보통 집에 가서 쉬어요.', 'Botong jibe gaseo swieoyo.', 'I usually go home and rest.', [
    { korean: '보통', english: 'usually' },
    { korean: '집에 가서', english: 'go home and' },
    { korean: '쉬어요', english: 'rest' },
  ]],

  // Evening and dinner
  ['저녁은 몇 시에 먹어요?', 'Jeonyeogeun myeot sie meogeoyo?', 'What time do you eat dinner?', [
    { korean: '저녁은', english: 'dinner' },
    { korean: '몇 시에', english: 'at what time' },
    { korean: '먹어요?', english: 'do you eat?' },
  ]],
  ['7시쯤 먹어요.', '7sijjeum meogeoyo.', 'I eat around 7 o\'clock.', [
    { korean: '7시쯤', english: 'around 7 o\'clock' },
    { korean: '먹어요', english: 'I eat' },
  ]],
  ['저녁 식사는 누가 준비해요?', 'Jeonyeok siksaneun nuga junbihaeyo?', 'Who prepares dinner?', [
    { korean: '저녁 식사는', english: 'dinner' },
    { korean: '누가', english: 'who' },
    { korean: '준비해요?', english: 'prepares?' },
  ]],
  ['제가 직접 요리해요.', 'Jega jikjeop yorihaeyo.', 'I cook it myself.', [
    { korean: '제가', english: 'I' },
    { korean: '직접', english: 'myself / directly' },
    { korean: '요리해요', english: 'cook' },
  ]],
  ['요리하는 것을 좋아해요?', 'Yorihaneun geoseul joahaeyo?', 'Do you like cooking?', [
    { korean: '요리하는 것을', english: 'cooking' },
    { korean: '좋아해요?', english: 'do you like?' },
  ]],
  ['네, 요리하는 것을 좋아해요.', 'Ne, yorihaneun geoseul joahaeyo.', 'Yes, I like cooking.', [
    { korean: '네', english: 'yes' },
    { korean: '요리하는 것을', english: 'cooking' },
    { korean: '좋아해요', english: 'I like' },
  ]],

  // Sleep routine
  ['보통 몇 시에 자요?', 'Botong myeot sie jayo?', 'What time do you usually go to bed?', [
    { korean: '보통', english: 'usually' },
    { korean: '몇 시에', english: 'at what time' },
    { korean: '자요?', english: 'do you sleep?' },
  ]],
  ['11시쯤 자요.', '11sijjeum jayo.', 'I go to bed around 11 o\'clock.', [
    { korean: '11시쯤', english: 'around 11 o\'clock' },
    { korean: '자요', english: 'I sleep' },
  ]],
  ['잠은 잘 자요?', 'Jameun jal jayo?', 'Do you sleep well?', [
    { korean: '잠은', english: 'sleep' },
    { korean: '잘', english: 'well' },
    { korean: '자요?', english: 'do you sleep?' },
  ]],
  ['네, 보통 잘 자요.', 'Ne, botong jal jayo.', 'Yes, I usually sleep well.', [
    { korean: '네', english: 'yes' },
    { korean: '보통', english: 'usually' },
    { korean: '잘 자요', english: 'I sleep well' },
  ]],

  // Weekend activities
  ['주말에는 뭐 해요?', 'Jumareneun mwo haeyo?', 'What do you do on weekends?', [
    { korean: '주말에는', english: 'on weekends' },
    { korean: '뭐', english: 'what' },
    { korean: '해요?', english: 'do you do?' },
  ]],
  ['친구들을 만나거나 집에서 쉬어요.', 'Chingudeureul mannageona jibeseo swieoyo.', 'I meet friends or rest at home.', [
    { korean: '친구들을 만나거나', english: 'meet friends or' },
    { korean: '집에서', english: 'at home' },
    { korean: '쉬어요', english: 'rest' },
  ]],

  // Housework
  ['집안일은 언제 해요?', 'Jibanireun eonje haeyo?', 'When do you do housework?', [
    { korean: '집안일은', english: 'housework' },
    { korean: '언제', english: 'when' },
    { korean: '해요?', english: 'do you do?' },
  ]],
  ['주말에 해요.', 'Jumare haeyo.', 'I do it on weekends.', [
    { korean: '주말에', english: 'on weekends' },
    { korean: '해요', english: 'I do it' },
  ]],
  ['빨래는 얼마나 자주 해요?', 'Ppallaeneun eolmana jaju haeyo?', 'How often do you do laundry?', [
    { korean: '빨래는', english: 'laundry' },
    { korean: '얼마나 자주', english: 'how often' },
    { korean: '해요?', english: 'do you do?' },
  ]],
  ['일주일에 한 번 해요.', 'Iljuire han beon haeyo.', 'I do it once a week.', [
    { korean: '일주일에', english: 'in a week' },
    { korean: '한 번', english: 'once' },
    { korean: '해요', english: 'I do it' },
  ]],
  ['청소는 얼마나 자주 해요?', 'Cheongsoneun eolmana jaju haeyo?', 'How often do you clean?', [
    { korean: '청소는', english: 'cleaning' },
    { korean: '얼마나 자주', english: 'how often' },
    { korean: '해요?', english: 'do you do?' },
  ]],
  ['일주일에 두 번 정도 해요.', 'Iljuire du beon jeongdo haeyo.', 'I do it about twice a week.', [
    { korean: '일주일에', english: 'in a week' },
    { korean: '두 번 정도', english: 'about twice' },
    { korean: '해요', english: 'I do it' },
  ]],

  // Grocery shopping
  ['장은 어디서 봐요?', 'Jangeun eodiseo bwayo?', 'Where do you go grocery shopping?', [
    { korean: '장은', english: 'grocery shopping' },
    { korean: '어디서', english: 'where' },
    { korean: '봐요?', english: 'do you do?' },
  ]],
  ['근처 마트에서 봐요.', 'Geuncheo mateu eseo bwayo.', 'I shop at a nearby mart.', [
    { korean: '근처', english: 'nearby' },
    { korean: '마트에서', english: 'at the mart' },
    { korean: '봐요', english: 'I shop' },
  ]],
  ['장은 얼마나 자주 봐요?', 'Jangeun eolmana jaju bwayo?', 'How often do you go grocery shopping?', [
    { korean: '장은', english: 'grocery shopping' },
    { korean: '얼마나 자주', english: 'how often' },
    { korean: '봐요?', english: 'do you do?' },
  ]],
  ['일주일에 한 번 봐요.', 'Iljuire han beon bwayo.', 'I go once a week.', [
    { korean: '일주일에', english: 'in a week' },
    { korean: '한 번', english: 'once' },
    { korean: '봐요', english: 'I go' },
  ]],

  // Exercise
  ['운동은 언제 해요?', 'Undongeun eonje haeyo?', 'When do you exercise?', [
    { korean: '운동은', english: 'exercise' },
    { korean: '언제', english: 'when' },
    { korean: '해요?', english: 'do you do?' },
  ]],
  ['저녁에 운동해요.', 'Jeonyeoge undonghaeyo.', 'I exercise in the evening.', [
    { korean: '저녁에', english: 'in the evening' },
    { korean: '운동해요', english: 'I exercise' },
  ]],
  ['무슨 운동을 해요?', 'Museun undongeul haeyo?', 'What exercise do you do?', [
    { korean: '무슨', english: 'what kind of' },
    { korean: '운동을', english: 'exercise' },
    { korean: '해요?', english: 'do you do?' },
  ]],
  ['조깅을 해요.', 'Joggingeul haeyo.', 'I go jogging.', [
    { korean: '조깅을', english: 'jogging' },
    { korean: '해요', english: 'I do' },
  ]],
  ['일주일에 몇 번 운동해요?', 'Iljuire myeot beon undonghaeyo?', 'How many times a week do you exercise?', [
    { korean: '일주일에', english: 'in a week' },
    { korean: '몇 번', english: 'how many times' },
    { korean: '운동해요?', english: 'do you exercise?' },
  ]],
  ['일주일에 세 번 정도 해요.', 'Iljuire se beon jeongdo haeyo.', 'I do it about three times a week.', [
    { korean: '일주일에', english: 'in a week' },
    { korean: '세 번 정도', english: 'about three times' },
    { korean: '해요', english: 'I do it' },
  ]],

  // Hobbies - Reading
  ['취미가 뭐예요?', 'Chwimiga mwoyeyo?', 'What is your hobby?', [
    { korean: '취미가', english: 'hobby' },
    { korean: '뭐예요?', english: 'what is it?' },
  ]],
  ['책 읽는 것을 좋아해요.', 'Chaek ingneun geoseul joahaeyo.', 'I like reading books.', [
    { korean: '책 읽는 것을', english: 'reading books' },
    { korean: '좋아해요', english: 'I like' },
  ]],
  ['무슨 책을 좋아해요?', 'Museun chaekeul joahaeyo?', 'What kind of books do you like?', [
    { korean: '무슨', english: 'what kind of' },
    { korean: '책을', english: 'books' },
    { korean: '좋아해요?', english: 'do you like?' },
  ]],
  ['소설을 좋아해요.', 'Soseoreul joahaeyo.', 'I like novels.', [
    { korean: '소설을', english: 'novels' },
    { korean: '좋아해요', english: 'I like' },
  ]],

  // Hobbies - Movies
  ['영화는 자주 봐요?', 'Yeonghwaneun jaju bwayo?', 'Do you often watch movies?', [
    { korean: '영화는', english: 'movies' },
    { korean: '자주', english: 'often' },
    { korean: '봐요?', english: 'do you watch?' },
  ]],
  ['네, 영화를 자주 봐요.', 'Ne, yeonghwareul jaju bwayo.', 'Yes, I watch movies often.', [
    { korean: '네', english: 'yes' },
    { korean: '영화를', english: 'movies' },
    { korean: '자주', english: 'often' },
    { korean: '봐요', english: 'I watch' },
  ]],
  ['무슨 영화를 좋아해요?', 'Museun yeonghwareul joahaeyo?', 'What kind of movies do you like?', [
    { korean: '무슨', english: 'what kind of' },
    { korean: '영화를', english: 'movies' },
    { korean: '좋아해요?', english: 'do you like?' },
  ]],
  ['액션 영화를 좋아해요.', 'Aeksyeon yeonghwareul joahaeyo.', 'I like action movies.', [
    { korean: '액션 영화를', english: 'action movies' },
    { korean: '좋아해요', english: 'I like' },
  ]],

  // Hobbies - Music
  ['음악을 자주 들어요?', 'Eumagul jaju deureoyo?', 'Do you often listen to music?', [
    { korean: '음악을', english: 'music' },
    { korean: '자주', english: 'often' },
    { korean: '들어요?', english: 'do you listen?' },
  ]],
  ['네, 매일 들어요.', 'Ne, maeil deureoyo.', 'Yes, I listen every day.', [
    { korean: '네', english: 'yes' },
    { korean: '매일', english: 'every day' },
    { korean: '들어요', english: 'I listen' },
  ]],
  ['무슨 음악을 좋아해요?', 'Museun eumagul joahaeyo?', 'What kind of music do you like?', [
    { korean: '무슨', english: 'what kind of' },
    { korean: '음악을', english: 'music' },
    { korean: '좋아해요?', english: 'do you like?' },
  ]],
  ['케이팝을 좋아해요.', 'Keipapeul joahaeyo.', 'I like K-pop.', [
    { korean: '케이팝을', english: 'K-pop' },
    { korean: '좋아해요', english: 'I like' },
  ]],

  // Hobbies - Games
  ['게임을 해요?', 'Geimeul haeyo?', 'Do you play games?', [
    { korean: '게임을', english: 'games' },
    { korean: '해요?', english: 'do you play?' },
  ]],
  ['네, 가끔 해요.', 'Ne, gakkeum haeyo.', 'Yes, I play sometimes.', [
    { korean: '네', english: 'yes' },
    { korean: '가끔', english: 'sometimes' },
    { korean: '해요', english: 'I do' },
  ]],
  ['무슨 게임을 해요?', 'Museun geimeul haeyo?', 'What games do you play?', [
    { korean: '무슨', english: 'what kind of' },
    { korean: '게임을', english: 'games' },
    { korean: '해요?', english: 'do you play?' },
  ]],
  ['RPG 게임을 해요.', 'RPG geimeul haeyo.', 'I play RPG games.', [
    { korean: 'RPG 게임을', english: 'RPG games' },
    { korean: '해요', english: 'I play' },
  ]],

  // Hobbies - TV
  ['TV는 자주 봐요?', 'TVneun jaju bwayo?', 'Do you often watch TV?', [
    { korean: 'TV는', english: 'TV' },
    { korean: '자주', english: 'often' },
    { korean: '봐요?', english: 'do you watch?' },
  ]],
  ['아니요, 잘 안 봐요.', 'Aniyo, jal an bwayo.', 'No, I don\'t watch it much.', [
    { korean: '아니요', english: 'no' },
    { korean: '잘 안', english: 'not much' },
    { korean: '봐요', english: 'I watch' },
  ]],
  ['무슨 프로그램을 좋아해요?', 'Museun peurogeuraemeul joahaeyo?', 'What programs do you like?', [
    { korean: '무슨', english: 'what kind of' },
    { korean: '프로그램을', english: 'programs' },
    { korean: '좋아해요?', english: 'do you like?' },
  ]],
  ['예능 프로그램을 좋아해요.', 'Yeneung peurogeuraemeul joahaeyo.', 'I like variety shows.', [
    { korean: '예능 프로그램을', english: 'variety shows' },
    { korean: '좋아해요', english: 'I like' },
  ]],

  // Travel
  ['여행을 자주 가요?', 'Yeohaengeul jaju gayo?', 'Do you travel often?', [
    { korean: '여행을', english: 'travel' },
    { korean: '자주', english: 'often' },
    { korean: '가요?', english: 'do you go?' },
  ]],
  ['일년에 한두 번 정도 가요.', 'Ilnyeone handu beon jeongdo gayo.', 'I go about once or twice a year.', [
    { korean: '일년에', english: 'in a year' },
    { korean: '한두 번 정도', english: 'about once or twice' },
    { korean: '가요', english: 'I go' },
  ]],
  ['어디로 여행 가고 싶어요?', 'Eodiro yeohaeng gago sipeoyo?', 'Where do you want to travel?', [
    { korean: '어디로', english: 'where to' },
    { korean: '여행', english: 'travel' },
    { korean: '가고 싶어요?', english: 'do you want to go?' },
  ]],
  ['제주도에 가고 싶어요.', 'Jejudoe gago sipeoyo.', 'I want to go to Jeju Island.', [
    { korean: '제주도에', english: 'to Jeju Island' },
    { korean: '가고 싶어요', english: 'I want to go' },
  ]],

  // Pets
  ['반려동물이 있어요?', 'Ballyeodongmuri isseoyo?', 'Do you have a pet?', [
    { korean: '반려동물이', english: 'pet' },
    { korean: '있어요?', english: 'do you have?' },
  ]],
  ['네, 고양이가 있어요.', 'Ne, goyangiga isseoyo.', 'Yes, I have a cat.', [
    { korean: '네', english: 'yes' },
    { korean: '고양이가', english: 'a cat' },
    { korean: '있어요', english: 'I have' },
  ]],
  ['이름이 뭐예요?', 'Ireumi mwoyeyo?', 'What is its name?', [
    { korean: '이름이', english: 'name' },
    { korean: '뭐예요?', english: 'what is it?' },
  ]],
  ['이름은 나비예요.', 'Ireumeun nabiyeyo.', 'Its name is Nabi.', [
    { korean: '이름은', english: 'the name' },
    { korean: '나비예요', english: 'is Nabi' },
  ]],

  // Stress management
  ['스트레스 받을 때 뭐 해요?', 'Seuteureseu badeul ttae mwo haeyo?', 'What do you do when you are stressed?', [
    { korean: '스트레스 받을 때', english: 'when stressed' },
    { korean: '뭐', english: 'what' },
    { korean: '해요?', english: 'do you do?' },
  ]],
  ['음악을 듣거나 산책을 해요.', 'Eumagul deutgeona sanchaegeul haeyo.', 'I listen to music or go for a walk.', [
    { korean: '음악을 듣거나', english: 'listen to music or' },
    { korean: '산책을 해요', english: 'go for a walk' },
  ]],

  // Cafes and beverages
  ['카페에 자주 가요?', 'Kapee jaju gayo?', 'Do you often go to cafes?', [
    { korean: '카페에', english: 'to cafes' },
    { korean: '자주', english: 'often' },
    { korean: '가요?', english: 'do you go?' },
  ]],
  ['네, 일주일에 두세 번 가요.', 'Ne, iljuire duse beon gayo.', 'Yes, I go two or three times a week.', [
    { korean: '네', english: 'yes' },
    { korean: '일주일에', english: 'in a week' },
    { korean: '두세 번', english: 'two or three times' },
    { korean: '가요', english: 'I go' },
  ]],
  ['무슨 커피를 좋아해요?', 'Museun keopireul joahaeyo?', 'What kind of coffee do you like?', [
    { korean: '무슨', english: 'what kind of' },
    { korean: '커피를', english: 'coffee' },
    { korean: '좋아해요?', english: 'do you like?' },
  ]],
  ['아메리카노를 좋아해요.', 'Amerikanoreul joahaeyo.', 'I like Americano.', [
    { korean: '아메리카노를', english: 'Americano' },
    { korean: '좋아해요', english: 'I like' },
  ]],

  // Alcohol
  ['술을 자주 마셔요?', 'Sureul jaju masyeoyo?', 'Do you often drink alcohol?', [
    { korean: '술을', english: 'alcohol' },
    { korean: '자주', english: 'often' },
    { korean: '마셔요?', english: 'do you drink?' },
  ]],
  ['가끔 친구들하고 마셔요.', 'Gakkeum chingudeurhago masyeoyo.', 'I sometimes drink with friends.', [
    { korean: '가끔', english: 'sometimes' },
    { korean: '친구들하고', english: 'with friends' },
    { korean: '마셔요', english: 'I drink' },
  ]],
  ['무슨 술을 좋아해요?', 'Museun sureul joahaeyo?', 'What kind of alcohol do you like?', [
    { korean: '무슨', english: 'what kind of' },
    { korean: '술을', english: 'alcohol' },
    { korean: '좋아해요?', english: 'do you like?' },
  ]],
  ['맥주를 좋아해요.', 'Maekjureul joahaeyo.', 'I like beer.', [
    { korean: '맥주를', english: 'beer' },
    { korean: '좋아해요', english: 'I like' },
  ]],

  // Smoking
  ['담배를 피워요?', 'Dambaereul piwoyo?', 'Do you smoke?', [
    { korean: '담배를', english: 'cigarettes' },
    { korean: '피워요?', english: 'do you smoke?' },
  ]],
  ['아니요, 안 피워요.', 'Aniyo, an piwoyo.', 'No, I don\'t smoke.', [
    { korean: '아니요', english: 'no' },
    { korean: '안 피워요', english: 'I don\'t smoke' },
  ]],

  // Health
  ['건강을 위해 뭐 해요?', 'Geongangeul wihae mwo haeyo?', 'What do you do for your health?', [
    { korean: '건강을 위해', english: 'for health' },
    { korean: '뭐', english: 'what' },
    { korean: '해요?', english: 'do you do?' },
  ]],
  ['운동하고 건강한 음식을 먹어요.', 'Undonghago geongganghan eumsigeul meogeoyo.', 'I exercise and eat healthy food.', [
    { korean: '운동하고', english: 'exercise and' },
    { korean: '건강한 음식을', english: 'healthy food' },
    { korean: '먹어요', english: 'I eat' },
  ]],
  ['병원에 자주 가요?', 'Byeongwone jaju gayo?', 'Do you often go to the hospital?', [
    { korean: '병원에', english: 'to the hospital' },
    { korean: '자주', english: 'often' },
    { korean: '가요?', english: 'do you go?' },
  ]],
  ['아니요, 건강해서 잘 안 가요.', 'Aniyo, geongganghaeseo jal an gayo.', 'No, I am healthy so I don\'t go often.', [
    { korean: '아니요', english: 'no' },
    { korean: '건강해서', english: 'because I\'m healthy' },
    { korean: '잘 안 가요', english: 'I don\'t go often' },
  ]],
  ['약은 잘 먹어요?', 'Yageun jal meogeoyo?', 'Do you take medicine regularly?', [
    { korean: '약은', english: 'medicine' },
    { korean: '잘', english: 'regularly' },
    { korean: '먹어요?', english: 'do you take?' },
  ]],
  ['아니요, 특별히 먹는 약은 없어요.', 'Aniyo, teukbyeolhi meongneun yageun eopseoyo.', 'No, I don\'t take any medicine in particular.', [
    { korean: '아니요', english: 'no' },
    { korean: '특별히', english: 'in particular' },
    { korean: '먹는 약은', english: 'medicine I take' },
    { korean: '없어요', english: 'there is none' },
  ]],
  ['알레르기가 있어요?', 'Allerugiga isseoyo?', 'Do you have allergies?', [
    { korean: '알레르기가', english: 'allergies' },
    { korean: '있어요?', english: 'do you have?' },
  ]],
  ['아니요, 없어요.', 'Aniyo, eopseoyo.', 'No, I don\'t.', [
    { korean: '아니요', english: 'no' },
    { korean: '없어요', english: 'I don\'t have' },
  ]],

  // Sleep quality
  ['잠을 잘 자요?', 'Jameul jal jayo?', 'Do you sleep well?', [
    { korean: '잠을', english: 'sleep' },
    { korean: '잘', english: 'well' },
    { korean: '자요?', english: 'do you sleep?' },
  ]],
  ['네, 보통 잘 자요.', 'Ne, botong jal jayo.', 'Yes, I usually sleep well.', [
    { korean: '네', english: 'yes' },
    { korean: '보통', english: 'usually' },
    { korean: '잘 자요', english: 'I sleep well' },
  ]],
  ['꿈을 자주 꿔요?', 'Kkumeul jaju kkwoyo?', 'Do you often dream?', [
    { korean: '꿈을', english: 'dreams' },
    { korean: '자주', english: 'often' },
    { korean: '꿔요?', english: 'do you dream?' },
  ]],
  ['가끔 꿔요.', 'Gakkeum kkwoyo.', 'I dream sometimes.', [
    { korean: '가끔', english: 'sometimes' },
    { korean: '꿔요', english: 'I dream' },
  ]],
  ['악몽을 꾸는 적 있어요?', 'Angmongeul kkuneun jeok isseoyo?', 'Have you ever had nightmares?', [
    { korean: '악몽을', english: 'nightmares' },
    { korean: '꾸는 적', english: 'ever had' },
    { korean: '있어요?', english: 'have you?' },
  ]],
  ['가끔 있어요.', 'Gakkeum isseoyo.', 'Sometimes I do.', [
    { korean: '가끔', english: 'sometimes' },
    { korean: '있어요', english: 'I do / there is' },
  ]],
  ['아침형 인간이에요, 저녁형 인간이에요?', 'Achimhyeong inganieyo, jeonyeokhyeong inganieyo?', 'Are you a morning person or evening person?', [
    { korean: '아침형 인간이에요', english: 'a morning person' },
    { korean: '저녁형 인간이에요?', english: 'an evening person?' },
  ]],
  ['저녁형 인간이에요.', 'Jeonyeokhyeong inganieyo.', 'I am an evening person.', [
    { korean: '저녁형', english: 'evening type' },
    { korean: '인간이에요', english: 'I am a person' },
  ]],
  ['낮잠을 자요?', 'Natjameul jayo?', 'Do you take naps?', [
    { korean: '낮잠을', english: 'naps' },
    { korean: '자요?', english: 'do you take?' },
  ]],
  ['주말에 가끔 자요.', 'Jumare gakkeum jayo.', 'I sometimes do on weekends.', [
    { korean: '주말에', english: 'on weekends' },
    { korean: '가끔', english: 'sometimes' },
    { korean: '자요', english: 'I sleep' },
  ]],

  // Beverages
  ['커피를 많이 마셔요?', 'Keopireul mani masyeoyo?', 'Do you drink a lot of coffee?', [
    { korean: '커피를', english: 'coffee' },
    { korean: '많이', english: 'a lot' },
    { korean: '마셔요?', english: 'do you drink?' },
  ]],
  ['네, 하루에 두세 잔 마셔요.', 'Ne, harue duse jan masyeoyo.', 'Yes, I drink two or three cups a day.', [
    { korean: '네', english: 'yes' },
    { korean: '하루에', english: 'in a day' },
    { korean: '두세 잔', english: 'two or three cups' },
    { korean: '마셔요', english: 'I drink' },
  ]],
  ['물은 많이 마셔요?', 'Mureun mani masyeoyo?', 'Do you drink a lot of water?', [
    { korean: '물은', english: 'water' },
    { korean: '많이', english: 'a lot' },
    { korean: '마셔요?', english: 'do you drink?' },
  ]],
  ['네, 하루에 2리터 정도 마셔요.', 'Ne, harue 2riteo jeongdo masyeoyo.', 'Yes, I drink about 2 liters a day.', [
    { korean: '네', english: 'yes' },
    { korean: '하루에', english: 'in a day' },
    { korean: '2리터 정도', english: 'about 2 liters' },
    { korean: '마셔요', english: 'I drink' },
  ]],

  // Snacks and diet
  ['간식을 자주 먹어요?', 'Gansigeul jaju meogeoyo?', 'Do you often eat snacks?', [
    { korean: '간식을', english: 'snacks' },
    { korean: '자주', english: 'often' },
    { korean: '먹어요?', english: 'do you eat?' },
  ]],
  ['가끔 먹어요.', 'Gakkeum meogeoyo.', 'I eat them sometimes.', [
    { korean: '가끔', english: 'sometimes' },
    { korean: '먹어요', english: 'I eat' },
  ]],
  ['무슨 간식을 좋아해요?', 'Museun gansigeul joahaeyo?', 'What snacks do you like?', [
    { korean: '무슨', english: 'what kind of' },
    { korean: '간식을', english: 'snacks' },
    { korean: '좋아해요?', english: 'do you like?' },
  ]],
  ['과자를 좋아해요.', 'Gwajareul joahaeyo.', 'I like cookies.', [
    { korean: '과자를', english: 'cookies' },
    { korean: '좋아해요', english: 'I like' },
  ]],
  ['다이어트를 해요?', 'Daieteureul haeyo?', 'Are you on a diet?', [
    { korean: '다이어트를', english: 'diet' },
    { korean: '해요?', english: 'are you doing?' },
  ]],
  ['아니요, 지금은 안 해요.', 'Aniyo, jigeumeun an haeyo.', 'No, I am not right now.', [
    { korean: '아니요', english: 'no' },
    { korean: '지금은', english: 'right now' },
    { korean: '안 해요', english: 'I\'m not doing' },
  ]],
].map(([k, r, e, b]) => createContentItem(k, r, e, 'sentence', k, e, b));

// FOOD - Sentences
const foodSentences = [
  ['배고파요?', 'Baegopayo?', 'Are you hungry?', [
    { korean: '배고파요', english: 'are you hungry' },
  ]],
  ['네, 배고파요.', 'Ne, baegopayo.', 'Yes, I am hungry.', [
    { korean: '네', english: 'yes' },
    { korean: '배고파요', english: 'I am hungry' },
  ]],
  ['뭐 먹고 싶어요?', 'Mwo meokgo sipeoyo?', 'What do you want to eat?', [
    { korean: '뭐', english: 'what' },
    { korean: '먹고 싶어요', english: 'want to eat' },
  ]],
  ['한식이 먹고 싶어요.', 'Hansigi meokgo sipeoyo.', 'I want to eat Korean food.', [
    { korean: '한식이', english: 'Korean food (subject)' },
    { korean: '먹고 싶어요', english: 'want to eat' },
  ]],
  ['매운 음식을 먹을 수 있어요?', 'Maeun eumsigul meogeul su isseoyo?', 'Can you eat spicy food?', [
    { korean: '매운 음식을', english: 'spicy food (object)' },
    { korean: '먹을 수 있어요', english: 'can eat' },
  ]],
  ['네, 매운 음식을 좋아해요.', 'Ne, maeun eumsigul joahaeyo.', 'Yes, I like spicy food.', [
    { korean: '네', english: 'yes' },
    { korean: '매운 음식을', english: 'spicy food (object)' },
    { korean: '좋아해요', english: 'like' },
  ]],
  ['이 식당은 어때요?', 'I sikdangeun eottaeyo?', 'How about this restaurant?', [
    { korean: '이 식당은', english: 'this restaurant (topic)' },
    { korean: '어때요', english: 'how about' },
  ]],
  ['좋아요, 여기서 먹어요.', 'Joayo, yeogiseo meogeoyo.', 'Sounds good, let\'s eat here.', [
    { korean: '좋아요', english: 'sounds good' },
    { korean: '여기서', english: 'here (at this place)' },
    { korean: '먹어요', english: 'let\'s eat' },
  ]],
  ['메뉴판 좀 주세요.', 'Menyupan jom juseyo.', 'Please give me the menu.', [
    { korean: '메뉴판', english: 'menu' },
    { korean: '좀', english: 'a bit (softener)' },
    { korean: '주세요', english: 'please give' },
  ]],
  ['여기 있습니다.', 'Yeogi itseumnida.', 'Here you are.', [
    { korean: '여기', english: 'here' },
    { korean: '있습니다', english: 'is / exists' },
  ]],
  ['주문하시겠어요?', 'Jumunhasi gesseoyo?', 'Are you ready to order?', [
    { korean: '주문하시겠어요', english: 'would you like to order' },
  ]],
  ['네, 주문할게요.', 'Ne, jumunhalgeyo.', 'Yes, I will order.', [
    { korean: '네', english: 'yes' },
    { korean: '주문할게요', english: 'I will order' },
  ]],
  ['뭘 주문하시겠어요?', 'Mwol jumunhasi gesseoyo?', 'What would you like to order?', [
    { korean: '뭘', english: 'what (object)' },
    { korean: '주문하시겠어요', english: 'would you like to order' },
  ]],
  ['비빔밥 하나 주세요.', 'Bibimbap hana juseyo.', 'One bibimbap please.', [
    { korean: '비빔밥', english: 'bibimbap' },
    { korean: '하나', english: 'one' },
    { korean: '주세요', english: 'please give' },
  ]],
  ['음료수는 뭐 드릴까요?', 'Eumnyosuneun mwo deurilkkayo?', 'What would you like to drink?', [
    { korean: '음료수는', english: 'drink (topic)' },
    { korean: '뭐', english: 'what' },
    { korean: '드릴까요', english: 'shall I give you' },
  ]],
  ['물 주세요.', 'Mul juseyo.', 'Water please.', [
    { korean: '물', english: 'water' },
    { korean: '주세요', english: 'please give' },
  ]],
  ['조금만 기다려 주세요.', 'Jogeumman gidaryeo juseyo.', 'Please wait a moment.', [
    { korean: '조금만', english: 'just a little' },
    { korean: '기다려 주세요', english: 'please wait' },
  ]],
  ['네, 천천히 하세요.', 'Ne, cheoncheonhi haseyo.', 'Okay, take your time.', [
    { korean: '네', english: 'okay' },
    { korean: '천천히', english: 'slowly' },
    { korean: '하세요', english: 'please do' },
  ]],
  ['여기 나왔습니다.', 'Yeogi nawatseumnida.', 'Here is your food.', [
    { korean: '여기', english: 'here' },
    { korean: '나왔습니다', english: 'has come out' },
  ]],
  ['감사합니다.', 'Gamsahamnida.', 'Thank you.', [
    { korean: '감사합니다', english: 'thank you' },
  ]],
  ['맛있게 드세요.', 'Masitge deuseyo.', 'Enjoy your meal.', [
    { korean: '맛있게', english: 'deliciously' },
    { korean: '드세요', english: 'please eat (honorific)' },
  ]],
  ['잘 먹겠습니다.', 'Jal meokgetseumnida.', 'I will eat well (before eating).', [
    { korean: '잘', english: 'well' },
    { korean: '먹겠습니다', english: 'I will eat' },
  ]],
  ['맛있어요?', 'Masisseoyo?', 'Is it delicious?', [
    { korean: '맛있어요', english: 'is it delicious' },
  ]],
  ['네, 정말 맛있어요.', 'Ne, jeongmal masisseoyo.', 'Yes, it is really delicious.', [
    { korean: '네', english: 'yes' },
    { korean: '정말', english: 'really' },
    { korean: '맛있어요', english: 'is delicious' },
  ]],
  ['이거 뭐예요?', 'Igeo mwoyeyo?', 'What is this?', [
    { korean: '이거', english: 'this' },
    { korean: '뭐예요', english: 'what is' },
  ]],
  ['이거는 김치찌개예요.', 'Igeoneun gimchi jjigaeyeyo.', 'This is kimchi stew.', [
    { korean: '이거는', english: 'this (topic)' },
    { korean: '김치찌개예요', english: 'is kimchi stew' },
  ]],
  ['좀 더 드시겠어요?', 'Jom deo deusigesseaayo?', 'Would you like more?', [
    { korean: '좀 더', english: 'a bit more' },
    { korean: '드시겠어요', english: 'would you like to eat (honorific)' },
  ]],
  ['아니요, 배불러요.', 'Aniyo, baebulleoyo.', 'No, I am full.', [
    { korean: '아니요', english: 'no' },
    { korean: '배불러요', english: 'I am full' },
  ]],
  ['잘 먹었습니다.', 'Jal meogeotseumnida.', 'I ate well (after eating).', [
    { korean: '잘', english: 'well' },
    { korean: '먹었습니다', english: 'I ate' },
  ]],
  ['계산할게요.', 'Gyesanhalgeyo.', 'I will pay.', [
    { korean: '계산할게요', english: 'I will pay' },
  ]],
  ['여기서 계산하나요?', 'Yeogiseo gyesanhananayo?', 'Do I pay here?', [
    { korean: '여기서', english: 'here (at this place)' },
    { korean: '계산하나요', english: 'do I pay' },
  ]],
  ['아니요, 저쪽에서 계산하세요.', 'Aniyo, jeojjogeseo gyesanhaseyo.', 'No, please pay over there.', [
    { korean: '아니요', english: 'no' },
    { korean: '저쪽에서', english: 'over there (at that place)' },
    { korean: '계산하세요', english: 'please pay' },
  ]],
  ['얼마예요?', 'Eolmayeyo?', 'How much is it?', [
    { korean: '얼마예요', english: 'how much is it' },
  ]],
  ['2만원입니다.', '2manwon imnida.', 'It is 20,000 won.', [
    { korean: '2만원', english: '20,000 won' },
    { korean: '입니다', english: 'it is' },
  ]],
  ['카드로 할게요.', 'Kadeuro halgeyo.', 'I will pay by card.', [
    { korean: '카드로', english: 'by card' },
    { korean: '할게요', english: 'I will do (pay)' },
  ]],
  ['네, 여기 카드 넣으세요.', 'Ne, yeogi kadeu neoeuseyayo.', 'Yes, please insert your card here.', [
    { korean: '네', english: 'yes' },
    { korean: '여기', english: 'here' },
    { korean: '카드', english: 'card' },
    { korean: '넣으세요', english: 'please insert' },
  ]],
  ['영수증 주세요.', 'Yeongseujeung juseyo.', 'Please give me the receipt.', [
    { korean: '영수증', english: 'receipt' },
    { korean: '주세요', english: 'please give' },
  ]],
  ['여기 있습니다.', 'Yeogi itseumnida.', 'Here you are.', [
    { korean: '여기', english: 'here' },
    { korean: '있습니다', english: 'is / exists' },
  ]],
  ['포장 가능해요?', 'Pojang ganeunghaeyo?', 'Can I get it to go?', [
    { korean: '포장', english: 'takeout / packing' },
    { korean: '가능해요', english: 'is it possible' },
  ]],
  ['네, 포장해 드릴게요.', 'Ne, pojanghae deurilgeyo.', 'Yes, I will pack it for you.', [
    { korean: '네', english: 'yes' },
    { korean: '포장해 드릴게요', english: 'I will pack it for you' },
  ]],
  ['배달이 돼요?', 'Baedari dwaeyo?', 'Do you deliver?', [
    { korean: '배달이', english: 'delivery (subject)' },
    { korean: '돼요', english: 'is it possible' },
  ]],
  ['네, 배달 가능합니다.', 'Ne, baedal ganeunghamnida.', 'Yes, delivery is available.', [
    { korean: '네', english: 'yes' },
    { korean: '배달', english: 'delivery' },
    { korean: '가능합니다', english: 'is available' },
  ]],
  ['배달 시간이 얼마나 걸려요?', 'Baedal sigani eolmana geollyeoyo?', 'How long does delivery take?', [
    { korean: '배달 시간이', english: 'delivery time (subject)' },
    { korean: '얼마나', english: 'how much / how long' },
    { korean: '걸려요', english: 'does it take' },
  ]],
  ['30분 정도 걸립니다.', '30bun jeongdo geollimnida.', 'It takes about 30 minutes.', [
    { korean: '30분', english: '30 minutes' },
    { korean: '정도', english: 'about / approximately' },
    { korean: '걸립니다', english: 'it takes' },
  ]],
  ['예약이 필요해요?', 'Yeyagi pillyohaeyo?', 'Do I need a reservation?', [
    { korean: '예약이', english: 'reservation (subject)' },
    { korean: '필요해요', english: 'is needed' },
  ]],
  ['주말에는 예약하시는 게 좋아요.', 'Jumareneun yeyakhasineun ge joayo.', 'It is better to make a reservation on weekends.', [
    { korean: '주말에는', english: 'on weekends (topic)' },
    { korean: '예약하시는 게', english: 'making a reservation (honorific)' },
    { korean: '좋아요', english: 'is good / is better' },
  ]],
  ['예약하고 싶은데요.', 'Yeyakhago sipeundeyo.', 'I would like to make a reservation.', [
    { korean: '예약하고 싶은데요', english: 'I would like to make a reservation' },
  ]],
  ['몇 분이세요?', 'Myeot buniseyo?', 'How many people?', [
    { korean: '몇 분이세요', english: 'how many people (honorific)' },
  ]],
  ['4명이에요.', '4myeongieyo.', 'There are 4 people.', [
    { korean: '4명이에요', english: 'there are 4 people' },
  ]],
  ['몇 시에 오시겠어요?', 'Myeot sie osigesseayo?', 'What time will you come?', [
    { korean: '몇 시에', english: 'at what time' },
    { korean: '오시겠어요', english: 'will you come (honorific)' },
  ]],
  ['7시에 갈게요.', '7sie galgeyo.', 'I will come at 7 o\'clock.', [
    { korean: '7시에', english: 'at 7 o\'clock' },
    { korean: '갈게요', english: 'I will go / come' },
  ]],
  ['성함이 어떻게 되세요?', 'Seonghami eotteoke doeseyo?', 'What is your name?', [
    { korean: '성함이', english: 'name (honorific, subject)' },
    { korean: '어떻게 되세요', english: 'what is (honorific)' },
  ]],
  ['김민수입니다.', 'Kim Minsumnida.', 'It is Kim Minsu.', [
    { korean: '김민수', english: 'Kim Minsu' },
    { korean: '입니다', english: 'it is' },
  ]],
  ['전화번호를 남겨 주세요.', 'Jeonhwa beonhoreul namgyeo juseyo.', 'Please leave your phone number.', [
    { korean: '전화번호를', english: 'phone number (object)' },
    { korean: '남겨 주세요', english: 'please leave' },
  ]],
  ['010-1234-5678이에요.', '010-1234-5678ieyo.', 'It is 010-1234-5678.', [
    { korean: '010-1234-5678', english: '010-1234-5678' },
    { korean: '이에요', english: 'it is' },
  ]],
  ['예약 확인해 드렸습니다.', 'Yeyak hwaginhae deuryeotseumnida.', 'I have confirmed your reservation.', [
    { korean: '예약', english: 'reservation' },
    { korean: '확인해 드렸습니다', english: 'I have confirmed for you' },
  ]],
  ['감사합니다.', 'Gamsahamnida.', 'Thank you.', [
    { korean: '감사합니다', english: 'thank you' },
  ]],
  ['채식주의자예요?', 'Chaesikjuuijayeyo?', 'Are you a vegetarian?', [
    { korean: '채식주의자예요', english: 'are you a vegetarian' },
  ]],
  ['아니요, 다 먹어요.', 'Aniyo, da meogeoyo.', 'No, I eat everything.', [
    { korean: '아니요', english: 'no' },
    { korean: '다', english: 'everything / all' },
    { korean: '먹어요', english: 'I eat' },
  ]],
  ['고기를 안 먹어요?', 'Gogireul an meogeoyo?', 'Don\'t you eat meat?', [
    { korean: '고기를', english: 'meat (object)' },
    { korean: '안 먹어요', english: 'don\'t eat' },
  ]],
  ['네, 고기는 안 먹어요.', 'Ne, gogineun an meogeoyo.', 'Yes, I don\'t eat meat.', [
    { korean: '네', english: 'yes (confirming negative)' },
    { korean: '고기는', english: 'meat (topic)' },
    { korean: '안 먹어요', english: 'don\'t eat' },
  ]],
  ['알레르기가 있으세요?', 'Allereugiga iseuseyo?', 'Do you have any allergies?', [
    { korean: '알레르기가', english: 'allergy (subject)' },
    { korean: '있으세요', english: 'do you have (honorific)' },
  ]],
  ['땅콩 알레르기가 있어요.', 'Ttangkong allereugiga isseoyo.', 'I have a peanut allergy.', [
    { korean: '땅콩', english: 'peanut' },
    { korean: '알레르기가', english: 'allergy (subject)' },
    { korean: '있어요', english: 'I have / exists' },
  ]],
  ['이 음식에 땅콩이 들어가요?', 'I eumsige ttangkongi deureogayo?', 'Does this food contain peanuts?', [
    { korean: '이 음식에', english: 'in this food' },
    { korean: '땅콩이', english: 'peanuts (subject)' },
    { korean: '들어가요', english: 'does it contain / go in' },
  ]],
  ['아니요, 안 들어가요.', 'Aniyo, an deureogayo.', 'No, it doesn\'t contain peanuts.', [
    { korean: '아니요', english: 'no' },
    { korean: '안 들어가요', english: 'does not contain' },
  ]],
  ['맵지 않게 해 주세요.', 'Maepji anke hae juseyo.', 'Please make it not spicy.', [
    { korean: '맵지 않게', english: 'not spicy' },
    { korean: '해 주세요', english: 'please make it' },
  ]],
  ['네, 덜 맵게 해 드릴게요.', 'Ne, deol maepge hae deurilgeyo.', 'Yes, I will make it less spicy.', [
    { korean: '네', english: 'yes' },
    { korean: '덜 맵게', english: 'less spicy' },
    { korean: '해 드릴게요', english: 'I will make it for you' },
  ]],
  ['싱거워요.', 'Singeowoyo.', 'It is bland.', [
    { korean: '싱거워요', english: 'it is bland' },
  ]],
  ['소금 좀 더 넣어 드릴까요?', 'Sogeum jom deo neoeo deurilkkayo?', 'Shall I add more salt?', [
    { korean: '소금', english: 'salt' },
    { korean: '좀 더', english: 'a bit more' },
    { korean: '넣어 드릴까요', english: 'shall I add for you' },
  ]],
  ['짜요.', 'Jjayo.', 'It is salty.', [
    { korean: '짜요', english: 'it is salty' },
  ]],
  ['죄송합니다.', 'Joesonghamnida.', 'I am sorry.', [
    { korean: '죄송합니다', english: 'I am sorry' },
  ]],
  ['물 좀 더 주세요.', 'Mul jom deo juseyo.', 'Please give me more water.', [
    { korean: '물', english: 'water' },
    { korean: '좀 더', english: 'a bit more' },
    { korean: '주세요', english: 'please give' },
  ]],
  ['네, 가져다 드릴게요.', 'Ne, gajyeoda deurilgeyo.', 'Yes, I will bring it to you.', [
    { korean: '네', english: 'yes' },
    { korean: '가져다 드릴게요', english: 'I will bring it for you' },
  ]],
  ['반찬 좀 더 주세요.', 'Banchan jom deo juseyo.', 'Please give me more side dishes.', [
    { korean: '반찬', english: 'side dishes' },
    { korean: '좀 더', english: 'a bit more' },
    { korean: '주세요', english: 'please give' },
  ]],
  ['여기 있습니다.', 'Yeogi itseumnida.', 'Here you are.', [
    { korean: '여기', english: 'here' },
    { korean: '있습니다', english: 'is / exists' },
  ]],
  ['숟가락 하나 더 주세요.', 'Sutgarak hana deo juseyo.', 'Please give me one more spoon.', [
    { korean: '숟가락', english: 'spoon' },
    { korean: '하나 더', english: 'one more' },
    { korean: '주세요', english: 'please give' },
  ]],
  ['네, 바로 가져다 드릴게요.', 'Ne, baro gajyeoda deurilgeyo.', 'Yes, I will bring it right away.', [
    { korean: '네', english: 'yes' },
    { korean: '바로', english: 'right away' },
    { korean: '가져다 드릴게요', english: 'I will bring it for you' },
  ]],
  ['휴지 있어요?', 'Hyuji isseoyo?', 'Do you have tissue?', [
    { korean: '휴지', english: 'tissue' },
    { korean: '있어요', english: 'do you have / is there' },
  ]],
  ['여기 휴지 있습니다.', 'Yeogi hyuji itseumnida.', 'Here is tissue.', [
    { korean: '여기', english: 'here' },
    { korean: '휴지', english: 'tissue' },
    { korean: '있습니다', english: 'is / exists' },
  ]],
  ['화장실이 어디예요?', 'Hwajangsiri eodiyeyo?', 'Where is the bathroom?', [
    { korean: '화장실이', english: 'bathroom (subject)' },
    { korean: '어디예요', english: 'where is' },
  ]],
  ['저쪽 끝에 있어요.', 'Jeojjok kkeute isseoyo.', 'It is at the end over there.', [
    { korean: '저쪽', english: 'over there' },
    { korean: '끝에', english: 'at the end' },
    { korean: '있어요', english: 'it is / exists' },
  ]],
  ['추천 메뉴가 뭐예요?', 'Chucheon menyuga mwoyeyo?', 'What is the recommended menu?', [
    { korean: '추천 메뉴가', english: 'recommended menu (subject)' },
    { korean: '뭐예요', english: 'what is' },
  ]],
  ['삼계탕이 맛있어요.', 'Samgyetangi masisseoyo.', 'Samgyetang is delicious.', [
    { korean: '삼계탕이', english: 'samgyetang (subject)' },
    { korean: '맛있어요', english: 'is delicious' },
  ]],
  ['여기 유명한 음식이 뭐예요?', 'Yeogi yumyeonghan eumsigi mwoyeyo?', 'What is the famous food here?', [
    { korean: '여기', english: 'here' },
    { korean: '유명한 음식이', english: 'famous food (subject)' },
    { korean: '뭐예요', english: 'what is' },
  ]],
  ['갈비찜이 유명해요.', 'Galbi jjimi yumyeonghaeyo.', 'Galbi-jjim is famous.', [
    { korean: '갈비찜이', english: 'galbi-jjim (subject)' },
    { korean: '유명해요', english: 'is famous' },
  ]],
  ['세트 메뉴가 있어요?', 'Seteu menyuga isseoyo?', 'Do you have a set menu?', [
    { korean: '세트 메뉴가', english: 'set menu (subject)' },
    { korean: '있어요', english: 'do you have / is there' },
  ]],
  ['네, 세트 메뉴 있습니다.', 'Ne, seteu menyu itseumnida.', 'Yes, we have set menus.', [
    { korean: '네', english: 'yes' },
    { korean: '세트 메뉴', english: 'set menu' },
    { korean: '있습니다', english: 'we have / exists' },
  ]],
  ['오늘의 특별 메뉴가 뭐예요?', 'Oneurui teukbyeol menyuga mwoyeyo?', 'What is today\'s special menu?', [
    { korean: '오늘의', english: 'today\'s' },
    { korean: '특별 메뉴가', english: 'special menu (subject)' },
    { korean: '뭐예요', english: 'what is' },
  ]],
  ['오늘은 불고기가 특별 메뉴예요.', 'Oneureun bulgogiga teukbyeol menyuyeyo.', 'Today\'s special is bulgogi.', [
    { korean: '오늘은', english: 'today (topic)' },
    { korean: '불고기가', english: 'bulgogi (subject)' },
    { korean: '특별 메뉴예요', english: 'is the special menu' },
  ]],
  ['얼마나 기다려야 해요?', 'Eolmana gidaryeoya haeyo?', 'How long do I have to wait?', [
    { korean: '얼마나', english: 'how long' },
    { korean: '기다려야 해요', english: 'do I have to wait' },
  ]],
  ['15분 정도 기다리셔야 해요.', '15bun jeongdo gidarisyeoya haeyo.', 'You have to wait about 15 minutes.', [
    { korean: '15분 정도', english: 'about 15 minutes' },
    { korean: '기다리셔야 해요', english: 'you have to wait (honorific)' },
  ]],
  ['테이블이 비어 있어요?', 'Teibeuri bieo isseoyo?', 'Is there an empty table?', [
    { korean: '테이블이', english: 'table (subject)' },
    { korean: '비어 있어요', english: 'is empty / is available' },
  ]],
  ['죄송하지만 지금은 자리가 없어요.', 'Joesonghajiman jigeumeun jariga eopseoyo.', 'I\'m sorry but there are no seats now.', [
    { korean: '죄송하지만', english: 'I\'m sorry but' },
    { korean: '지금은', english: 'now (topic)' },
    { korean: '자리가 없어요', english: 'there are no seats' },
  ]],
  ['대기하면 얼마나 기다려야 해요?', 'Daeghamyeon eolmana gidaryeoya haeyo?', 'If I wait, how long will it take?', [
    { korean: '대기하면', english: 'if I wait' },
    { korean: '얼마나', english: 'how long' },
    { korean: '기다려야 해요', english: 'do I have to wait' },
  ]],
  ['30분 정도 걸릴 것 같아요.', '30bun jeongdo geollil geot gatayo.', 'It will probably take about 30 minutes.', [
    { korean: '30분 정도', english: 'about 30 minutes' },
    { korean: '걸릴 것 같아요', english: 'it will probably take' },
  ]],
  ['리필 돼요?', 'Ripil dwaeyo?', 'Can I get a refill?', [
    { korean: '리필', english: 'refill' },
    { korean: '돼요', english: 'is it possible' },
  ]],
  ['네, 무료로 리필 가능해요.', 'Ne, muryoro ripil ganeunghaeyo.', 'Yes, refills are free.', [
    { korean: '네', english: 'yes' },
    { korean: '무료로', english: 'for free' },
    { korean: '리필', english: 'refill' },
    { korean: '가능해요', english: 'is possible' },
  ]],
  ['이거 주문 안 했는데요.', 'Igeo jumun an haenneundeyo.', 'I didn\'t order this.', [
    { korean: '이거', english: 'this' },
    { korean: '주문 안 했는데요', english: 'I didn\'t order' },
  ]],
  ['죄송합니다, 확인해 보겠습니다.', 'Joesonghamnida, hwaginhae bogetseumnida.', 'I\'m sorry, I will check.', [
    { korean: '죄송합니다', english: 'I\'m sorry' },
    { korean: '확인해 보겠습니다', english: 'I will check' },
  ]],
  ['주문이 잘못 나왔어요.', 'Jumuni jalmot nawasseoyo.', 'The order came out wrong.', [
    { korean: '주문이', english: 'the order (subject)' },
    { korean: '잘못', english: 'wrong / incorrectly' },
    { korean: '나왔어요', english: 'came out' },
  ]],
  ['죄송합니다, 바로 바꿔 드릴게요.', 'Joesonghamnida, baro bakkwo deurilgeyo.', 'I\'m sorry, I will change it right away.', [
    { korean: '죄송합니다', english: 'I\'m sorry' },
    { korean: '바로', english: 'right away' },
    { korean: '바꿔 드릴게요', english: 'I will change it for you' },
  ]],
  ['너무 오래 기다렸어요.', 'Neomu orae gidaryeosseoyo.', 'I waited too long.', [
    { korean: '너무', english: 'too much' },
    { korean: '오래', english: 'long (time)' },
    { korean: '기다렸어요', english: 'I waited' },
  ]],
  ['정말 죄송합니다.', 'Jeongmal joesonghamnida.', 'I am truly sorry.', [
    { korean: '정말', english: 'truly / really' },
    { korean: '죄송합니다', english: 'I am sorry' },
  ]],
].map(([k, r, e, b]) => createContentItem(k, r, e, 'sentence', k, e, b));

// TRAVEL - Sentences
const travelSentences = [
['여기가 어디예요?', 'Yeogiga eodiyeyo?', 'Where is this place?', [
  { korean: '여기가', english: 'this place' },
  { korean: '어디예요?', english: 'where is?' },
]],
['여기는 명동이에요.', 'Yeogineun myeongdongieyo.', 'This is Myeongdong.', [
  { korean: '여기는', english: 'this place' },
  { korean: '명동이에요.', english: 'is Myeongdong.' },
]],
['지하철역이 어디예요?', 'Jihacheol yeogi eodiyeyo?', 'Where is the subway station?', [
  { korean: '지하철역이', english: 'subway station' },
  { korean: '어디예요?', english: 'where is?' },
]],
['저기 보이는 건물 옆에 있어요.', 'Jeogi boineun geonmul yeope isseoyo.', 'It is next to that building you can see.', [
  { korean: '저기 보이는', english: 'that visible over there' },
  { korean: '건물 옆에', english: 'next to the building' },
  { korean: '있어요.', english: 'it is.' },
]],
['몇 번 출구로 나가야 해요?', 'Myeot beon chulguro nagaya haeyo?', 'Which exit should I take?', [
  { korean: '몇 번 출구로', english: 'which exit' },
  { korean: '나가야 해요?', english: 'should I go out?' },
]],
['3번 출구로 나가세요.', '3beon chulguro nagaseyo.', 'Take exit 3.', [
  { korean: '3번 출구로', english: 'exit 3' },
  { korean: '나가세요.', english: 'please go out.' },
]],
['어떻게 가요?', 'Eotteoke gayo?', 'How do I get there?', [
  { korean: '어떻게', english: 'how' },
  { korean: '가요?', english: 'do I go?' },
]],
['지하철을 타고 가세요.', 'Jihacheoreul tago gaseyo.', 'Take the subway.', [
  { korean: '지하철을', english: 'the subway' },
  { korean: '타고 가세요.', english: 'please ride and go.' },
]],
['몇 호선이에요?', 'Myeot hosenieyo?', 'Which line is it?', [
  { korean: '몇 호선이에요?', english: 'which line is it?' },
]],
['2호선이에요.', '2hosenieyo.', 'It is line 2.', [
  { korean: '2호선이에요.', english: 'it is line 2.' },
]],
['어디서 갈아타야 해요?', 'Eodiseo garataya haeyo?', 'Where do I need to transfer?', [
  { korean: '어디서', english: 'where' },
  { korean: '갈아타야 해요?', english: 'do I need to transfer?' },
]],
['시청역에서 갈아타세요.', 'Sicheong yeokeseo garatasayo.', 'Transfer at City Hall station.', [
  { korean: '시청역에서', english: 'at City Hall station' },
  { korean: '갈아타세요.', english: 'please transfer.' },
]],
['몇 정거장이에요?', 'Myeot jeonggeojangieyo?', 'How many stops is it?', [
  { korean: '몇 정거장이에요?', english: 'how many stops is it?' },
]],
['다섯 정거장이에요.', 'Daseot jeonggeojangieyo.', 'It is five stops.', [
  { korean: '다섯 정거장이에요.', english: 'it is five stops.' },
]],
['시간이 얼마나 걸려요?', 'Sigani eolmana geollyeoyo?', 'How long does it take?', [
  { korean: '시간이', english: 'time' },
  { korean: '얼마나 걸려요?', english: 'how long does it take?' },
]],
['20분 정도 걸려요.', '20bun jeongdo geollyeoyo.', 'It takes about 20 minutes.', [
  { korean: '20분 정도', english: 'about 20 minutes' },
  { korean: '걸려요.', english: 'it takes.' },
]],
['요금이 얼마예요?', 'Yogeumi eolmayeyo?', 'How much is the fare?', [
  { korean: '요금이', english: 'the fare' },
  { korean: '얼마예요?', english: 'how much is?' },
]],
['1,250원이에요.', '1,250wonieyo.', 'It is 1,250 won.', [
  { korean: '1,250원이에요.', english: 'it is 1,250 won.' },
]],
['교통카드로 할 수 있어요?', 'Gyotongkadeuro hal su isseoyo?', 'Can I use a transportation card?', [
  { korean: '교통카드로', english: 'with a transportation card' },
  { korean: '할 수 있어요?', english: 'can I do it?' },
]],
['네, 교통카드 사용 가능해요.', 'Ne, gyotongkadeu sayong ganeunghaeyo.', 'Yes, you can use a transportation card.', [
  { korean: '네,', english: 'yes,' },
  { korean: '교통카드 사용', english: 'transportation card use' },
  { korean: '가능해요.', english: 'is possible.' },
]],
['교통카드는 어디서 살 수 있어요?', 'Gyotongkadeuneun eodiseo sal su isseoyo?', 'Where can I buy a transportation card?', [
  { korean: '교통카드는', english: 'a transportation card' },
  { korean: '어디서', english: 'where' },
  { korean: '살 수 있어요?', english: 'can I buy?' },
]],
['편의점에서 살 수 있어요.', 'Pyeonuijeomeseo sal su isseoyo.', 'You can buy it at a convenience store.', [
  { korean: '편의점에서', english: 'at a convenience store' },
  { korean: '살 수 있어요.', english: 'you can buy.' },
]],
['충전은 어디서 해요?', 'Chungjeuneun eodiseo haeyo?', 'Where do I charge it?', [
  { korean: '충전은', english: 'charging' },
  { korean: '어디서', english: 'where' },
  { korean: '해요?', english: 'do I do?' },
]],
['지하철역이나 편의점에서 할 수 있어요.', 'Jihacheol yeokina pyeonuijeomeseo hal su isseoyo.', 'You can do it at subway stations or convenience stores.', [
  { korean: '지하철역이나', english: 'subway stations or' },
  { korean: '편의점에서', english: 'at convenience stores' },
  { korean: '할 수 있어요.', english: 'you can do it.' },
]],
['택시를 타고 싶어요.', 'Taeksireul tago sipeoyo.', 'I want to take a taxi.', [
  { korean: '택시를', english: 'a taxi' },
  { korean: '타고 싶어요.', english: 'I want to ride.' },
]],
['저기 택시 정류장이 있어요.', 'Jeogi taeksi jeongnyujangi isseoyo.', 'There is a taxi stand over there.', [
  { korean: '저기', english: 'over there' },
  { korean: '택시 정류장이', english: 'taxi stand' },
  { korean: '있어요.', english: 'there is.' },
]],
['택시비가 얼마나 나올까요?', 'Taeksibiga eolmana naolkkayo?', 'How much will the taxi fare be?', [
  { korean: '택시비가', english: 'the taxi fare' },
  { korean: '얼마나 나올까요?', english: 'how much will it come out to?' },
]],
['2만원 정도 나올 거예요.', '2manwon jeongdo naol geoyeyo.', 'It will be about 20,000 won.', [
  { korean: '2만원 정도', english: 'about 20,000 won' },
  { korean: '나올 거예요.', english: 'it will come out to.' },
]],
['여기서 내려 주세요.', 'Yeogiseo naeryeo juseyo.', 'Please let me off here.', [
  { korean: '여기서', english: 'here' },
  { korean: '내려 주세요.', english: 'please let me off.' },
]],
['네, 알겠습니다.', 'Ne, algetseumnida.', 'Yes, I understand.', [
  { korean: '네,', english: 'yes,' },
  { korean: '알겠습니다.', english: 'I understand.' },
]],
['버스는 몇 번이에요?', 'Beoseuneun myeot beonieyo?', 'Which bus number is it?', [
  { korean: '버스는', english: 'the bus' },
  { korean: '몇 번이에요?', english: 'which number is it?' },
]],
['472번 버스예요.', '472beon beoseuyeyo.', 'It is bus number 472.', [
  { korean: '472번 버스예요.', english: 'it is bus number 472.' },
]],
['버스 정류장이 어디예요?', 'Beoseu jeongnyujangi eodiyeyo?', 'Where is the bus stop?', [
  { korean: '버스 정류장이', english: 'the bus stop' },
  { korean: '어디예요?', english: 'where is?' },
]],
['저 앞에 있어요.', 'Jeo ape isseoyo.', 'It is up ahead.', [
  { korean: '저 앞에', english: 'up ahead' },
  { korean: '있어요.', english: 'it is.' },
]],
['이 버스 명동 가요?', 'I beoseu myeongdong gayo?', 'Does this bus go to Myeongdong?', [
  { korean: '이 버스', english: 'this bus' },
  { korean: '명동', english: 'Myeongdong' },
  { korean: '가요?', english: 'does it go?' },
]],
['네, 명동 가요.', 'Ne, myeongdong gayo.', 'Yes, it goes to Myeongdong.', [
  { korean: '네,', english: 'yes,' },
  { korean: '명동 가요.', english: 'it goes to Myeongdong.' },
]],
['여기서 내리면 돼요?', 'Yeogiseo naerimyeon dwaeyo?', 'Should I get off here?', [
  { korean: '여기서', english: 'here' },
  { korean: '내리면 돼요?', english: 'should I get off?' },
]],
['아니요, 다음 정류장에서 내리세요.', 'Aniyo, daeum jeongnyujangeyayo naerisayo.', 'No, get off at the next stop.', [
  { korean: '아니요,', english: 'no,' },
  { korean: '다음 정류장에서', english: 'at the next stop' },
  { korean: '내리세요.', english: 'please get off.' },
]],
['관광지가 어디 있어요?', 'Gwangwangjiga eodi isseoyo?', 'Where are the tourist attractions?', [
  { korean: '관광지가', english: 'tourist attractions' },
  { korean: '어디 있어요?', english: 'where are?' },
]],
['경복궁이 유명해요.', 'Gyeongbokgungi yumyeonghaeyo.', 'Gyeongbokgung is famous.', [
  { korean: '경복궁이', english: 'Gyeongbokgung' },
  { korean: '유명해요.', english: 'is famous.' },
]],
['입장료가 얼마예요?', 'Ipjangnyoga eolmayeyo?', 'How much is the entrance fee?', [
  { korean: '입장료가', english: 'the entrance fee' },
  { korean: '얼마예요?', english: 'how much is?' },
]],
['3,000원이에요.', '3,000wonieyo.', 'It is 3,000 won.', [
  { korean: '3,000원이에요.', english: 'it is 3,000 won.' },
]],
['개장 시간이 언제예요?', 'Gaejang sigani eonjeyeyo?', 'What time does it open?', [
  { korean: '개장 시간이', english: 'opening time' },
  { korean: '언제예요?', english: 'when is?' },
]],
['9시에 열어요.', '9sie yeoreoyo.', 'It opens at 9 o\'clock.', [
  { korean: '9시에', english: 'at 9 o\'clock' },
  { korean: '열어요.', english: 'it opens.' },
]],
['폐장 시간이 언제예요?', 'Pyejang sigani eonjeyeyo?', 'What time does it close?', [
  { korean: '폐장 시간이', english: 'closing time' },
  { korean: '언제예요?', english: 'when is?' },
]],
['6시에 닫아요.', '6sie dadayo.', 'It closes at 6 o\'clock.', [
  { korean: '6시에', english: 'at 6 o\'clock' },
  { korean: '닫아요.', english: 'it closes.' },
]],
['사진 찍어도 돼요?', 'Sajin jjigeodo dwaeyo?', 'Can I take pictures?', [
  { korean: '사진 찍어도', english: 'even if I take pictures' },
  { korean: '돼요?', english: 'is it okay?' },
]],
['네, 사진 찍어도 돼요.', 'Ne, sajin jjigeodo dwaeyo.', 'Yes, you can take pictures.', [
  { korean: '네,', english: 'yes,' },
  { korean: '사진 찍어도', english: 'even if you take pictures' },
  { korean: '돼요.', english: 'it is okay.' },
]],
['가이드 투어가 있어요?', 'Gaideu tueoga isseoyo?', 'Is there a guided tour?', [
  { korean: '가이드 투어가', english: 'a guided tour' },
  { korean: '있어요?', english: 'is there?' },
]],
['네, 오전 10시에 있어요.', 'Ne, ojeon 10sie isseoyo.', 'Yes, there is one at 10 AM.', [
  { korean: '네,', english: 'yes,' },
  { korean: '오전 10시에', english: 'at 10 AM' },
  { korean: '있어요.', english: 'there is.' },
]],
['한국어 가이드만 있어요?', 'Hangugeo gaideunan isseoyo?', 'Is there only a Korean guide?', [
  { korean: '한국어 가이드만', english: 'only a Korean guide' },
  { korean: '있어요?', english: 'is there?' },
]],
['아니요, 영어 가이드도 있어요.', 'Aniyo, yeongeo gaideu do isseoyo.', 'No, there is also an English guide.', [
  { korean: '아니요,', english: 'no,' },
  { korean: '영어 가이드도', english: 'an English guide also' },
  { korean: '있어요.', english: 'there is.' },
]],
['지도 있어요?', 'Jido isseoyo?', 'Do you have a map?', [
  { korean: '지도', english: 'a map' },
  { korean: '있어요?', english: 'do you have?' },
]],
['네, 여기 있어요.', 'Ne, yeogi isseoyo.', 'Yes, here it is.', [
  { korean: '네,', english: 'yes,' },
  { korean: '여기 있어요.', english: 'here it is.' },
]],
['화장실이 어디예요?', 'Hwajangsiri eodiyeyo?', 'Where is the bathroom?', [
  { korean: '화장실이', english: 'the bathroom' },
  { korean: '어디예요?', english: 'where is?' },
]],
['1층에 있어요.', '1cheunge isseoyo.', 'It is on the first floor.', [
  { korean: '1층에', english: 'on the first floor' },
  { korean: '있어요.', english: 'it is.' },
]],
['식당이 있어요?', 'Sikdangi isseoyo?', 'Is there a restaurant?', [
  { korean: '식당이', english: 'a restaurant' },
  { korean: '있어요?', english: 'is there?' },
]],
['2층에 있어요.', '2cheunge isseoyo.', 'It is on the second floor.', [
  { korean: '2층에', english: 'on the second floor' },
  { korean: '있어요.', english: 'it is.' },
]],
['기념품 가게가 어디예요?', 'Ginyeompum gagega eodiyeyo?', 'Where is the souvenir shop?', [
  { korean: '기념품 가게가', english: 'the souvenir shop' },
  { korean: '어디예요?', english: 'where is?' },
]],
['출구 옆에 있어요.', 'Chulgu yeope isseoyo.', 'It is next to the exit.', [
  { korean: '출구 옆에', english: 'next to the exit' },
  { korean: '있어요.', english: 'it is.' },
]],
['할인이 있어요?', 'Harini isseoyo?', 'Is there a discount?', [
  { korean: '할인이', english: 'a discount' },
  { korean: '있어요?', english: 'is there?' },
]],
['학생 할인이 있어요.', 'Haksaeng harini isseoyo.', 'There is a student discount.', [
  { korean: '학생 할인이', english: 'a student discount' },
  { korean: '있어요.', english: 'there is.' },
]],
['학생증 있으세요?', 'Haksaengjeung iseuseyo?', 'Do you have a student ID?', [
  { korean: '학생증', english: 'student ID' },
  { korean: '있으세요?', english: 'do you have?' },
]],
['네, 여기 있어요.', 'Ne, yeogi isseoyo.', 'Yes, here it is.', [
  { korean: '네,', english: 'yes,' },
  { korean: '여기 있어요.', english: 'here it is.' },
]],
['단체 할인도 있어요?', 'Danche harindo isseoyo?', 'Is there also a group discount?', [
  { korean: '단체 할인도', english: 'a group discount also' },
  { korean: '있어요?', english: 'is there?' },
]],
['네, 10명 이상이면 할인돼요.', 'Ne, 10myeong isangimyeon harindwaeyo.', 'Yes, there is a discount for 10 or more people.', [
  { korean: '네,', english: 'yes,' },
  { korean: '10명 이상이면', english: 'if 10 or more people' },
  { korean: '할인돼요.', english: 'there is a discount.' },
]],
['호텔 추천해 주세요.', 'Hotel chucheonhae juseyo.', 'Please recommend a hotel.', [
  { korean: '호텔', english: 'a hotel' },
  { korean: '추천해 주세요.', english: 'please recommend.' },
]],
['명동 근처 호텔이 좋아요.', 'Myeongdong geuncheo hoteli joayo.', 'Hotels near Myeongdong are good.', [
  { korean: '명동 근처', english: 'near Myeongdong' },
  { korean: '호텔이', english: 'hotels' },
  { korean: '좋아요.', english: 'are good.' },
]],
['예약했어요.', 'Yeyakhaesseoyo.', 'I made a reservation.', [
  { korean: '예약했어요.', english: 'I made a reservation.' },
]],
['예약자 성함이 어떻게 되세요?', 'Yeyakja seonghami eotteoke doeseyo?', 'What is the name on the reservation?', [
  { korean: '예약자 성함이', english: 'the reservation name' },
  { korean: '어떻게 되세요?', english: 'what is it?' },
]],
['김민수예요.', 'Kim Minsuyeyo.', 'It is Kim Minsu.', [
  { korean: '김민수예요.', english: 'it is Kim Minsu.' },
]],
['확인됐습니다, 여기 키가 있어요.', 'Hwagindwaetseumnida, yeogi kiga isseoyo.', 'Confirmed. Here is your key.', [
  { korean: '확인됐습니다,', english: 'confirmed,' },
  { korean: '여기 키가', english: 'here the key' },
  { korean: '있어요.', english: 'is.' },
]],
['아침 식사가 포함되어 있어요?', 'Achim siksaga pohamdoeeo isseoyo?', 'Is breakfast included?', [
  { korean: '아침 식사가', english: 'breakfast' },
  { korean: '포함되어 있어요?', english: 'is it included?' },
]],
['네, 1층 식당에서 7시부터예요.', 'Ne, 1cheung sikdangeseo 7sibuteo yeyo.', 'Yes, it is from 7 AM at the first floor restaurant.', [
  { korean: '네,', english: 'yes,' },
  { korean: '1층 식당에서', english: 'at the first floor restaurant' },
  { korean: '7시부터예요.', english: 'it is from 7 o\'clock.' },
]],
['체크아웃은 몇 시예요?', 'Chekeuauteun myeot siyeyo?', 'What time is check-out?', [
  { korean: '체크아웃은', english: 'check-out' },
  { korean: '몇 시예요?', english: 'what time is?' },
]],
['11시예요.', '11siyeyo.', 'It is 11 o\'clock.', [
  { korean: '11시예요.', english: 'it is 11 o\'clock.' },
]],
['짐 맡길 수 있어요?', 'Jim matgil su isseoyo?', 'Can I leave my luggage?', [
  { korean: '짐', english: 'luggage' },
  { korean: '맡길 수 있어요?', english: 'can I leave it?' },
]],
['네, 여기 맡기세요.', 'Ne, yeogi matgiseyo.', 'Yes, leave it here.', [
  { korean: '네,', english: 'yes,' },
  { korean: '여기', english: 'here' },
  { korean: '맡기세요.', english: 'please leave it.' },
]],
['와이파이 비밀번호가 뭐예요?', 'Waipai bimilbeonhoga mwoyeyo?', 'What is the WiFi password?', [
  { korean: '와이파이 비밀번호가', english: 'the WiFi password' },
  { korean: '뭐예요?', english: 'what is?' },
]],
['여기 적혀 있어요.', 'Yeogi jeokyeo isseoyo.', 'It is written here.', [
  { korean: '여기', english: 'here' },
  { korean: '적혀 있어요.', english: 'it is written.' },
]],
['방이 너무 춥워요.', 'Bangi neomu chuwoyo.', 'The room is too cold.', [
  { korean: '방이', english: 'the room' },
  { korean: '너무 춥워요.', english: 'is too cold.' },
]],
['온도를 올려 드릴게요.', 'Ondoreul ollyeo deurilgeyo.', 'I will raise the temperature.', [
  { korean: '온도를', english: 'the temperature' },
  { korean: '올려 드릴게요.', english: 'I will raise it for you.' },
]],
['뜨거운 물이 안 나와요.', 'Tteugeoun muri an nawayo.', 'Hot water is not coming out.', [
  { korean: '뜨거운 물이', english: 'hot water' },
  { korean: '안 나와요.', english: 'is not coming out.' },
]],
['죄송합니다, 바로 고쳐 드리겠습니다.', 'Joesonghamnida, baro gochyeo deurigetseumnida.', 'I\'m sorry, I will fix it right away.', [
  { korean: '죄송합니다,', english: 'I\'m sorry,' },
  { korean: '바로', english: 'right away' },
  { korean: '고쳐 드리겠습니다.', english: 'I will fix it for you.' },
]],
['환전은 어디서 해요?', 'Hwanjeuneun eodiseo haeyo?', 'Where do I exchange money?', [
  { korean: '환전은', english: 'money exchange' },
  { korean: '어디서', english: 'where' },
  { korean: '해요?', english: 'do I do?' },
]],
['은행이나 환전소에서 하세요.', 'Eunhaengina hwanjeonsoyayo haseyo.', 'Do it at a bank or money exchange.', [
  { korean: '은행이나', english: 'a bank or' },
  { korean: '환전소에서', english: 'at a money exchange' },
  { korean: '하세요.', english: 'please do it.' },
]],
['환율이 어떻게 돼요?', 'Hwanyuri eotteoke dwaeyo?', 'What is the exchange rate?', [
  { korean: '환율이', english: 'the exchange rate' },
  { korean: '어떻게 돼요?', english: 'what is it?' },
]],
['오늘은 1달러에 1,200원이에요.', 'Oneureun 1dalleoe 1,200wonieyo.', 'Today it is 1,200 won per dollar.', [
  { korean: '오늘은', english: 'today' },
  { korean: '1달러에', english: 'per 1 dollar' },
  { korean: '1,200원이에요.', english: 'it is 1,200 won.' },
]],
['신용카드 쓸 수 있어요?', 'Sinyongkadeu sseul su isseoyo?', 'Can I use a credit card?', [
  { korean: '신용카드', english: 'credit card' },
  { korean: '쓸 수 있어요?', english: 'can I use?' },
]],
['네, 카드 결제 가능해요.', 'Ne, kadeu gyeolje ganeunghaeyo.', 'Yes, card payment is possible.', [
  { korean: '네,', english: 'yes,' },
  { korean: '카드 결제', english: 'card payment' },
  { korean: '가능해요.', english: 'is possible.' },
]],
['현금만 받아요?', 'Hyeongeunman badayo?', 'Do you only accept cash?', [
  { korean: '현금만', english: 'only cash' },
  { korean: '받아요?', english: 'do you accept?' },
]],
['아니요, 카드도 돼요.', 'Aniyo, kadeu do dwaeyo.', 'No, card is okay too.', [
  { korean: '아니요,', english: 'no,' },
  { korean: '카드도', english: 'card also' },
  { korean: '돼요.', english: 'is okay.' },
]],
['ATM이 어디 있어요?', 'ATMi eodi isseoyo?', 'Where is an ATM?', [
  { korean: 'ATM이', english: 'an ATM' },
  { korean: '어디 있어요?', english: 'where is?' },
]],
['편의점 안에 있어요.', 'Pyeonuijeom ane isseoyo.', 'It is inside the convenience store.', [
  { korean: '편의점 안에', english: 'inside the convenience store' },
  { korean: '있어요.', english: 'it is.' },
]],
['영어 할 줄 아세요?', 'Yeongeo hal jul aseyo?', 'Do you speak English?', [
  { korean: '영어', english: 'English' },
  { korean: '할 줄 아세요?', english: 'do you know how to do?' },
]],
['조금 할 줄 알아요.', 'Jogeum hal jul arayo.', 'I speak a little.', [
  { korean: '조금', english: 'a little' },
  { korean: '할 줄 알아요.', english: 'I know how to do.' },
]],
['길을 잃었어요.', 'Gireul ireosseoyo.', 'I am lost.', [
  { korean: '길을', english: 'the way' },
  { korean: '잃었어요.', english: 'I lost.' },
]],
['어디로 가시려고 하세요?', 'Eodiro gasiryeogo haseyo?', 'Where are you trying to go?', [
  { korean: '어디로', english: 'to where' },
  { korean: '가시려고 하세요?', english: 'are you trying to go?' },
]],
['도와주셔서 감사합니다.', 'Dowajusyeoseo gamsahamnida.', 'Thank you for helping.', [
  { korean: '도와주셔서', english: 'for helping' },
  { korean: '감사합니다.', english: 'thank you.' },
]],
['천만에요, 조심히 가세요.', 'Cheonmaneyo, josimhi gaseyo.', 'You\'re welcome, go safely.', [
  { korean: '천만에요,', english: 'you\'re welcome,' },
  { korean: '조심히 가세요.', english: 'please go safely.' },
]],
].map(([k, r, e, b]) => createContentItem(k, r, e, 'sentence', k, e, b));

// SHOPPING - Sentences
const shoppingSentences = [
['이거 얼마예요?', 'Igeo eolmayeyo?', 'How much is this?', [
  { korean: '이거', english: 'this' },
  { korean: '얼마예요?', english: 'how much is it?' },
]],
['3만원이에요.', '3manwonieyo.', 'It is 30,000 won.', [
  { korean: '3만원이에요', english: 'it is 30,000 won' },
]],
['너무 비싸요.', 'Neomu bissayo.', 'It is too expensive.', [
  { korean: '너무', english: 'too' },
  { korean: '비싸요', english: 'is expensive' },
]],
['할인할 수 있어요?', 'Harinhal su isseoyo?', 'Can you give a discount?', [
  { korean: '할인할 수 있어요?', english: 'can you give a discount?' },
]],
['10% 할인해 드릴게요.', '10% harinhae deurilgeyo.', 'I will give you a 10% discount.', [
  { korean: '10% 할인해', english: '10% discount' },
  { korean: '드릴게요', english: 'I will give you' },
]],
['다른 색깔 있어요?', 'Dareun saekkal isseoyo?', 'Do you have other colors?', [
  { korean: '다른 색깔', english: 'other colors' },
  { korean: '있어요?', english: 'do you have?' },
]],
['네, 빨강색하고 파란색 있어요.', 'Ne, ppalgansaekhago paransaek isseoyo.', 'Yes, we have red and blue.', [
  { korean: '네', english: 'yes' },
  { korean: '빨강색하고', english: 'red and' },
  { korean: '파란색', english: 'blue' },
  { korean: '있어요', english: 'we have' },
]],
['입어 봐도 돼요?', 'Ibeo bwado dwaeyo?', 'Can I try it on?', [
  { korean: '입어 봐도', english: 'even if I try wearing' },
  { korean: '돼요?', english: 'is it okay?' },
]],
['네, 탈의실이 저쪽에 있어요.', 'Ne, taruisiri jeojjoge isseoyo.', 'Yes, the fitting room is over there.', [
  { korean: '네', english: 'yes' },
  { korean: '탈의실이', english: 'the fitting room' },
  { korean: '저쪽에 있어요', english: 'is over there' },
]],
['사이즈가 안 맞아요.', 'Saijeu ga an majayo.', 'The size doesn\'t fit.', [
  { korean: '사이즈가', english: 'the size' },
  { korean: '안 맞아요', english: 'doesn\'t fit' },
]],
['큰 사이즈 드릴까요?', 'Keun saijeu deurilkkayo?', 'Shall I give you a larger size?', [
  { korean: '큰 사이즈', english: 'a larger size' },
  { korean: '드릴까요?', english: 'shall I give you?' },
]],
['작은 사이즈 있어요?', 'Jageun saijeu isseoyo?', 'Do you have a smaller size?', [
  { korean: '작은 사이즈', english: 'a smaller size' },
  { korean: '있어요?', english: 'do you have?' },
]],
['죄송하지만 다 팔렸어요.', 'Joesonghajiman da pallyeosseoyo.', 'I\'m sorry but it is all sold out.', [
  { korean: '죄송하지만', english: 'I\'m sorry but' },
  { korean: '다 팔렸어요', english: 'it is all sold out' },
]],
['이거 살게요.', 'Igeo salgeyo.', 'I will buy this.', [
  { korean: '이거', english: 'this' },
  { korean: '살게요', english: 'I will buy' },
]],
['포장해 드릴까요?', 'Pojanghae deurilkkayo?', 'Shall I wrap it?', [
  { korean: '포장해', english: 'wrapping' },
  { korean: '드릴까요?', english: 'shall I do it for you?' },
]],
['네, 포장해 주세요.', 'Ne, pojanghae juseyo.', 'Yes, please wrap it.', [
  { korean: '네', english: 'yes' },
  { korean: '포장해 주세요', english: 'please wrap it' },
]],
['영수증 드릴까요?', 'Yeongseujeung deurilkkayo?', 'Shall I give you a receipt?', [
  { korean: '영수증', english: 'a receipt' },
  { korean: '드릴까요?', english: 'shall I give you?' },
]],
['네, 주세요.', 'Ne, juseyo.', 'Yes, please.', [
  { korean: '네', english: 'yes' },
  { korean: '주세요', english: 'please give' },
]],
['교환 가능해요?', 'Gyohwan ganeunghaeyo?', 'Is exchange possible?', [
  { korean: '교환', english: 'exchange' },
  { korean: '가능해요?', english: 'is it possible?' },
]],
['구매 후 7일 이내면 가능해요.', 'Gumae hu 7il inaemyeon ganeunghaeyo.', 'It is possible within 7 days after purchase.', [
  { korean: '구매 후', english: 'after purchase' },
  { korean: '7일 이내면', english: 'if within 7 days' },
  { korean: '가능해요', english: 'it is possible' },
]],
['환불 받고 싶어요.', 'Hwanbul batgo sipeoyo.', 'I want a refund.', [
  { korean: '환불', english: 'a refund' },
  { korean: '받고 싶어요', english: 'I want to receive' },
]],
['영수증 있으세요?', 'Yeongseujeung iseuseyo?', 'Do you have the receipt?', [
  { korean: '영수증', english: 'the receipt' },
  { korean: '있으세요?', english: 'do you have?' },
]],
['네, 여기 있어요.', 'Ne, yeogi isseoyo.', 'Yes, here it is.', [
  { korean: '네', english: 'yes' },
  { korean: '여기 있어요', english: 'here it is' },
]],
['무슨 문제가 있으세요?', 'Museun munjega iseuseyo?', 'What is the problem?', [
  { korean: '무슨 문제가', english: 'what problem' },
  { korean: '있으세요?', english: 'do you have?' },
]],
['불량품이에요.', 'Bullyangpumieyo.', 'It is defective.', [
  { korean: '불량품이에요', english: 'it is defective' },
]],
['죄송합니다, 바꿔 드릴게요.', 'Joesonghamnida, bakkwo deurilgeyo.', 'I\'m sorry, I will exchange it.', [
  { korean: '죄송합니다', english: 'I\'m sorry' },
  { korean: '바꿔 드릴게요', english: 'I will exchange it for you' },
]],
['환불은 얼마나 걸려요?', 'Hwanbureun eolmana geollyeoyo?', 'How long does the refund take?', [
  { korean: '환불은', english: 'the refund' },
  { korean: '얼마나 걸려요?', english: 'how long does it take?' },
]],
['3-5일 정도 걸려요.', '3-5il jeongdo geollyeoyo.', 'It takes about 3-5 days.', [
  { korean: '3-5일 정도', english: 'about 3-5 days' },
  { korean: '걸려요', english: 'it takes' },
]],
['세일 중이에요?', 'Seil jungieyo?', 'Is it on sale?', [
  { korean: '세일 중이에요?', english: 'is it on sale?' },
]],
['네, 지금 50% 할인 중이에요.', 'Ne, jigeum 50% harin jungieyo.', 'Yes, it is currently 50% off.', [
  { korean: '네', english: 'yes' },
  { korean: '지금', english: 'currently' },
  { korean: '50% 할인 중이에요', english: 'it is 50% off' },
]],
['언제까지 세일해요?', 'Eonjekkaji seilhaeyo?', 'Until when is the sale?', [
  { korean: '언제까지', english: 'until when' },
  { korean: '세일해요?', english: 'is the sale?' },
]],
['이번 주말까지예요.', 'Ibeon jumalkkajiyeyo.', 'It is until this weekend.', [
  { korean: '이번 주말까지예요', english: 'it is until this weekend' },
]],
['쿠폰 있어요?', 'Kupon isseoyo?', 'Do you have a coupon?', [
  { korean: '쿠폰', english: 'a coupon' },
  { korean: '있어요?', english: 'do you have?' },
]],
['네, 여기 쿠폰 쓸 수 있어요.', 'Ne, yeogi kupon sseul su isseoyo.', 'Yes, you can use a coupon here.', [
  { korean: '네', english: 'yes' },
  { korean: '여기', english: 'here' },
  { korean: '쿠폰 쓸 수 있어요', english: 'you can use a coupon' },
]],
['회원이에요?', 'Hoewoniyeyo?', 'Are you a member?', [
  { korean: '회원이에요?', english: 'are you a member?' },
]],
['아니요, 회원 가입하고 싶어요.', 'Aniyo, hoewon gaipago sipeoyo.', 'No, I want to become a member.', [
  { korean: '아니요', english: 'no' },
  { korean: '회원 가입하고 싶어요', english: 'I want to sign up as a member' },
]],
['회원 가입하면 혜택이 있어요?', 'Hoewon gaipamyeon hyetaeki isseoyo?', 'Are there benefits for membership?', [
  { korean: '회원 가입하면', english: 'if you sign up as a member' },
  { korean: '혜택이 있어요?', english: 'are there benefits?' },
]],
['네, 10% 할인 받아요.', 'Ne, 10% harin badayo.', 'Yes, you get a 10% discount.', [
  { korean: '네', english: 'yes' },
  { korean: '10% 할인', english: '10% discount' },
  { korean: '받아요', english: 'you get' },
]],
['포인트 적립되나요?', 'Pointeu jeokripneuannayo?', 'Do points accumulate?', [
  { korean: '포인트', english: 'points' },
  { korean: '적립되나요?', english: 'do they accumulate?' },
]],
['네, 구매 금액의 5% 적립돼요.', 'Ne, gumae geumaeui 5% jeokripttwaeyo.', 'Yes, 5% of the purchase amount is accumulated.', [
  { korean: '네', english: 'yes' },
  { korean: '구매 금액의', english: 'of the purchase amount' },
  { korean: '5% 적립돼요', english: '5% is accumulated' },
]],
['포인트 사용할 수 있어요?', 'Pointeu sayonghal su isseoyo?', 'Can I use points?', [
  { korean: '포인트', english: 'points' },
  { korean: '사용할 수 있어요?', english: 'can I use?' },
]],
['네, 1,000포인트 이상이면 사용 가능해요.', 'Ne, 1,000pointeu isangimyeon sayong ganeunghaeyo.', 'Yes, you can use them if you have more than 1,000 points.', [
  { korean: '네', english: 'yes' },
  { korean: '1,000포인트 이상이면', english: 'if more than 1,000 points' },
  { korean: '사용 가능해요', english: 'it is possible to use' },
]],
['카드 할인도 되나요?', 'Kadeu harindo doenayo?', 'Is there also a card discount?', [
  { korean: '카드 할인도', english: 'card discount also' },
  { korean: '되나요?', english: 'is it possible?' },
]],
['특정 카드는 추가 할인돼요.', 'Teukjeong kadeuneun chuga harindwaeyo.', 'Certain cards get an additional discount.', [
  { korean: '특정 카드는', english: 'certain cards' },
  { korean: '추가 할인돼요', english: 'get an additional discount' },
]],
['무이자 할부 되나요?', 'Muija halbu doenayo?', 'Is there interest-free installment?', [
  { korean: '무이자 할부', english: 'interest-free installment' },
  { korean: '되나요?', english: 'is it possible?' },
]],
['네, 3개월 무이자 가능해요.', 'Ne, 3gaewol muija ganeunghaeyo.', 'Yes, 3 months interest-free is possible.', [
  { korean: '네', english: 'yes' },
  { korean: '3개월 무이자', english: '3 months interest-free' },
  { korean: '가능해요', english: 'is possible' },
]],
['배송 가능해요?', 'Baesong ganeunghaeyo?', 'Is delivery possible?', [
  { korean: '배송', english: 'delivery' },
  { korean: '가능해요?', english: 'is it possible?' },
]],
['네, 배송비는 3,000원이에요.', 'Ne, baesongbineun 3,000wonieyo.', 'Yes, the delivery fee is 3,000 won.', [
  { korean: '네', english: 'yes' },
  { korean: '배송비는', english: 'the delivery fee' },
  { korean: '3,000원이에요', english: 'is 3,000 won' },
]],
['무료 배송 되나요?', 'Muryo baesong doenayo?', 'Is there free delivery?', [
  { korean: '무료 배송', english: 'free delivery' },
  { korean: '되나요?', english: 'is it possible?' },
]],
['5만원 이상 구매하시면 무료예요.', '5manwon isang gumaesimyeon muryoyeyo.', 'It is free if you purchase more than 50,000 won.', [
  { korean: '5만원 이상', english: 'more than 50,000 won' },
  { korean: '구매하시면', english: 'if you purchase' },
  { korean: '무료예요', english: 'it is free' },
]],
['배송 기간이 얼마나 걸려요?', 'Baesong gigani eolmana geollyeoyo?', 'How long is the delivery period?', [
  { korean: '배송 기간이', english: 'the delivery period' },
  { korean: '얼마나 걸려요?', english: 'how long does it take?' },
]],
['2-3일 정도 걸려요.', '2-3il jeongdo geollyeoyo.', 'It takes about 2-3 days.', [
  { korean: '2-3일 정도', english: 'about 2-3 days' },
  { korean: '걸려요', english: 'it takes' },
]],
['당일 배송 가능해요?', 'Dangil baesong ganeunghaeyo?', 'Is same-day delivery possible?', [
  { korean: '당일 배송', english: 'same-day delivery' },
  { korean: '가능해요?', english: 'is it possible?' },
]],
['서울 지역만 가능해요.', 'Seoul jiyeongman ganeunghaeyo.', 'It is only possible in the Seoul area.', [
  { korean: '서울 지역만', english: 'only the Seoul area' },
  { korean: '가능해요', english: 'is possible' },
]],
['선물 포장 가능해요?', 'Seonmul pojang ganeunghaeyo?', 'Is gift wrapping possible?', [
  { korean: '선물 포장', english: 'gift wrapping' },
  { korean: '가능해요?', english: 'is it possible?' },
]],
['네, 2,000원 추가예요.', 'Ne, 2,000won chugayeyo.', 'Yes, it is an additional 2,000 won.', [
  { korean: '네', english: 'yes' },
  { korean: '2,000원 추가예요', english: 'it is an additional 2,000 won' },
]],
['메시지 카드 넣을 수 있어요?', 'Mesiji kadeu neoeul su isseoyo?', 'Can you put a message card?', [
  { korean: '메시지 카드', english: 'a message card' },
  { korean: '넣을 수 있어요?', english: 'can you put in?' },
]],
['네, 뭐라고 쓸까요?', 'Ne, mworago sseulkkayo?', 'Yes, what should I write?', [
  { korean: '네', english: 'yes' },
  { korean: '뭐라고', english: 'what' },
  { korean: '쓸까요?', english: 'should I write?' },
]],
['생일 축하해요라고 써 주세요.', 'Saengil chukahaeyo rago sseo juseyo.', 'Please write "Happy Birthday".', [
  { korean: '생일 축하해요라고', english: '"Happy Birthday"' },
  { korean: '써 주세요', english: 'please write' },
]],
['알겠습니다.', 'Algetseumnida.', 'I understand.', [
  { korean: '알겠습니다', english: 'I understand' },
]],
['온라인으로도 살 수 있어요?', 'Onlaneurodo sal su isseoyo?', 'Can I buy it online too?', [
  { korean: '온라인으로도', english: 'online too' },
  { korean: '살 수 있어요?', english: 'can I buy?' },
]],
['네, 인터넷 쇼핑몰에서 살 수 있어요.', 'Ne, inteonet syopingmoreyayo sal su isseoyo.', 'Yes, you can buy it at the online shopping mall.', [
  { korean: '네', english: 'yes' },
  { korean: '인터넷 쇼핑몰에서', english: 'at the online shopping mall' },
  { korean: '살 수 있어요', english: 'you can buy' },
]],
['웹사이트 주소가 뭐예요?', 'Websaiteu jusoga mwoyeyo?', 'What is the website address?', [
  { korean: '웹사이트 주소가', english: 'the website address' },
  { korean: '뭐예요?', english: 'what is it?' },
]],
['여기 카드에 적혀 있어요.', 'Yeogi kadeue jeokyeo isseoyo.', 'It is written on this card.', [
  { korean: '여기 카드에', english: 'on this card' },
  { korean: '적혀 있어요', english: 'it is written' },
]],
['앱이 있어요?', 'Aebi isseoyo?', 'Do you have an app?', [
  { korean: '앱이', english: 'an app' },
  { korean: '있어요?', english: 'do you have?' },
]],
['네, 앱 다운받으면 쿠폰 받아요.', 'Ne, aep daunbadeumyeon kupon badayo.', 'Yes, you get a coupon if you download the app.', [
  { korean: '네', english: 'yes' },
  { korean: '앱 다운받으면', english: 'if you download the app' },
  { korean: '쿠폰 받아요', english: 'you get a coupon' },
]],
['재입고 언제 돼요?', 'Jaeipgo eonje dwaeyo?', 'When will it be restocked?', [
  { korean: '재입고', english: 'restocking' },
  { korean: '언제 돼요?', english: 'when will it happen?' },
]],
['다음 주 입고 예정이에요.', 'Daeum ju ipgo yejeongyeyo.', 'It is scheduled to arrive next week.', [
  { korean: '다음 주', english: 'next week' },
  { korean: '입고 예정이에요', english: 'it is scheduled to arrive' },
]],
['입고되면 연락 주실 수 있어요?', 'Ipgodoemyeon yeollak jusil su isseoyo?', 'Can you contact me when it arrives?', [
  { korean: '입고되면', english: 'when it arrives' },
  { korean: '연락 주실 수 있어요?', english: 'can you contact me?' },
]],
['네, 전화번호 남겨 주세요.', 'Ne, jeonhwa beonho namgyeo juseyo.', 'Yes, please leave your phone number.', [
  { korean: '네', english: 'yes' },
  { korean: '전화번호', english: 'phone number' },
  { korean: '남겨 주세요', english: 'please leave' },
]],
['이거 인기 많아요?', 'Igeo ingi manayo?', 'Is this popular?', [
  { korean: '이거', english: 'this' },
  { korean: '인기 많아요?', english: 'is it popular?' },
]],
['네, 요즘 많이 팔려요.', 'Ne, yojeum mani pallyeoyo.', 'Yes, it sells a lot these days.', [
  { korean: '네', english: 'yes' },
  { korean: '요즘', english: 'these days' },
  { korean: '많이 팔려요', english: 'it sells a lot' },
]],
['후기가 좋아요?', 'Hugiga joayo?', 'Are the reviews good?', [
  { korean: '후기가', english: 'the reviews' },
  { korean: '좋아요?', english: 'are they good?' },
]],
['네, 만족도가 높아요.', 'Ne, manjokdoga nopayo.', 'Yes, the satisfaction is high.', [
  { korean: '네', english: 'yes' },
  { korean: '만족도가', english: 'the satisfaction' },
  { korean: '높아요', english: 'is high' },
]],
['품질이 어때요?', 'Pumjiri eottaeyo?', 'How is the quality?', [
  { korean: '품질이', english: 'the quality' },
  { korean: '어때요?', english: 'how is it?' },
]],
['품질이 아주 좋아요.', 'Pumjiri aju joayo.', 'The quality is very good.', [
  { korean: '품질이', english: 'the quality' },
  { korean: '아주 좋아요', english: 'is very good' },
]],
['추천해 주시겠어요?', 'Chucheonhae jusigesseaayo?', 'Would you recommend it?', [
  { korean: '추천해 주시겠어요?', english: 'would you recommend it?' },
]],
['네, 강력 추천해요.', 'Ne, gangnyeok chucheonhaeyo.', 'Yes, I highly recommend it.', [
  { korean: '네', english: 'yes' },
  { korean: '강력 추천해요', english: 'I highly recommend it' },
]],
['비교해 볼 수 있어요?', 'Bigyohae bol su isseoyo?', 'Can I compare?', [
  { korean: '비교해 볼 수 있어요?', english: 'can I compare?' },
]],
['네, 이거하고 비교해 보세요.', 'Ne, igeohago bigyohae boseyo.', 'Yes, compare it with this.', [
  { korean: '네', english: 'yes' },
  { korean: '이거하고', english: 'with this' },
  { korean: '비교해 보세요', english: 'try comparing' },
]],
['차이가 뭐예요?', 'Chaiga mwoyeyo?', 'What is the difference?', [
  { korean: '차이가', english: 'the difference' },
  { korean: '뭐예요?', english: 'what is it?' },
]],
['이거는 더 가볍고 저거는 더 튼튼해요.', 'Igeoneun deo gabyeopgo jeogeneun deo teunteunhaeyo.', 'This one is lighter and that one is sturdier.', [
  { korean: '이거는 더 가볍고', english: 'this one is lighter and' },
  { korean: '저거는 더 튼튼해요', english: 'that one is sturdier' },
]],
['어느 게 더 나아요?', 'Eoneu ge deo naayo?', 'Which one is better?', [
  { korean: '어느 게', english: 'which one' },
  { korean: '더 나아요?', english: 'is better?' },
]],
['용도에 따라 다르지만 이거를 추천해요.', 'Yongdoe ttara dareu jiman igeoreul chucheonhaeyo.', 'It depends on the purpose, but I recommend this one.', [
  { korean: '용도에 따라 다르지만', english: 'it depends on the purpose, but' },
  { korean: '이거를 추천해요', english: 'I recommend this one' },
]],
['가격 차이는 얼마예요?', 'Gagyeok chaineun eolmayeyo?', 'How much is the price difference?', [
  { korean: '가격 차이는', english: 'the price difference' },
  { korean: '얼마예요?', english: 'how much is it?' },
]],
['1만원 차이예요.', '1manwon chaiyeyo.', 'It is a 10,000 won difference.', [
  { korean: '1만원 차이예요', english: 'it is a 10,000 won difference' },
]],
['고민되네요.', 'Gomindoeneyo.', 'I am not sure.', [
  { korean: '고민되네요', english: 'I am not sure' },
]],
['천천히 생각하세요.', 'Cheoncheonhi saenggakaseyo.', 'Take your time to think.', [
  { korean: '천천히', english: 'slowly / take your time' },
  { korean: '생각하세요', english: 'please think' },
]],
['나중에 다시 올게요.', 'Najunge dasi olgeyo.', 'I will come back later.', [
  { korean: '나중에', english: 'later' },
  { korean: '다시 올게요', english: 'I will come back' },
]],
['네, 언제든지 오세요.', 'Ne, eonjedeuji oseyo.', 'Yes, come anytime.', [
  { korean: '네', english: 'yes' },
  { korean: '언제든지 오세요', english: 'come anytime' },
]],
].map(([k, r, e, b]) => createContentItem(k, r, e, 'sentence', k, e, b));

// BUSINESS - Sentences
const businessSentences = [
['회의가 몇 시에 있어요?', 'Hoeiga myeot sie isseoyo?', 'What time is the meeting?', [
  { korean: '회의가', english: 'meeting' },
  { korean: '몇 시에', english: 'at what time' },
  { korean: '있어요?', english: 'is there?' },
]],
['오전 10시에 있어요.', 'Ojeon 10sie isseoyo.', 'It is at 10 AM.', [
  { korean: '오전 10시에', english: 'at 10 AM' },
  { korean: '있어요', english: 'it is' },
]],
['회의실이 어디예요?', 'Hoeuisiri eodiyeyo?', 'Where is the meeting room?', [
  { korean: '회의실이', english: 'the meeting room' },
  { korean: '어디예요?', english: 'where is?' },
]],
['3층 회의실이에요.', '3cheung hoeuisiriyeyo.', 'It is the meeting room on the 3rd floor.', [
  { korean: '3층', english: '3rd floor' },
  { korean: '회의실이에요', english: 'it is the meeting room' },
]],
['회의 자료 준비했어요?', 'Hoeui jaryo junbihaesseoyo?', 'Did you prepare the meeting materials?', [
  { korean: '회의 자료', english: 'meeting materials' },
  { korean: '준비했어요?', english: 'did you prepare?' },
]],
['네, 다 준비했어요.', 'Ne, da junbihaesseoyo.', 'Yes, I prepared everything.', [
  { korean: '네', english: 'yes' },
  { korean: '다', english: 'everything' },
  { korean: '준비했어요', english: 'I prepared' },
]],
['프레젠테이션 잘 부탁해요.', 'Peurejenteieyeon jal butakhaeyo.', 'Please do well with the presentation.', [
  { korean: '프레젠테이션', english: 'presentation' },
  { korean: '잘 부탁해요', english: 'please do well' },
]],
['최선을 다하겠습니다.', 'Choeseuneul dahagetseumnida.', 'I will do my best.', [
  { korean: '최선을', english: 'my best' },
  { korean: '다하겠습니다', english: 'I will do' },
]],
['보고서는 언제까지 제출해야 해요?', 'Bogoseoneun eonjekkaji jechulhaeya haeyo?', 'When do I have to submit the report?', [
  { korean: '보고서는', english: 'the report' },
  { korean: '언제까지', english: 'by when' },
  { korean: '제출해야 해요?', english: 'do I have to submit?' },
]],
['금요일까지 제출하세요.', 'Geumyoilkkaji jechulhaseyo.', 'Please submit it by Friday.', [
  { korean: '금요일까지', english: 'by Friday' },
  { korean: '제출하세요', english: 'please submit' },
]],
['마감 시간을 연장할 수 있어요?', 'Magam siganeul yeonjanghal su isseoyo?', 'Can you extend the deadline?', [
  { korean: '마감 시간을', english: 'the deadline' },
  { korean: '연장할 수 있어요?', english: 'can you extend?' },
]],
['이번만 월요일까지 주세요.', 'Ibeonman wolyoilkkaji juseyo.', 'Just this time, I will give you until Monday.', [
  { korean: '이번만', english: 'just this time' },
  { korean: '월요일까지', english: 'until Monday' },
  { korean: '주세요', english: 'please give' },
]],
['출장 가야 해요?', 'Chuljang gaya haeyo?', 'Do I have to go on a business trip?', [
  { korean: '출장', english: 'business trip' },
  { korean: '가야 해요?', english: 'do I have to go?' },
]],
['네, 다음 주에 부산 출장이 있어요.', 'Ne, daeum jue busan chuljangi isseoyo.', 'Yes, there is a business trip to Busan next week.', [
  { korean: '네', english: 'yes' },
  { korean: '다음 주에', english: 'next week' },
  { korean: '부산 출장이', english: 'Busan business trip' },
  { korean: '있어요', english: 'there is' },
]],
['며칠 동안이에요?', 'Myeochil donganiyo?', 'For how many days?', [
  { korean: '며칠', english: 'how many days' },
  { korean: '동안이에요?', english: 'is it for?' },
]],
['2박 3일이에요.', '2bak 3irieyo.', 'It is 2 nights and 3 days.', [
  { korean: '2박 3일이에요', english: '2 nights and 3 days' },
]],
['출장비는 어떻게 청구해요?', 'Chuljangbineun eotteoke cheonguhaeyo?', 'How do I claim the business trip expenses?', [
  { korean: '출장비는', english: 'business trip expenses' },
  { korean: '어떻게', english: 'how' },
  { korean: '청구해요?', english: 'do I claim?' },
]],
['영수증 모아서 제출하세요.', 'Yeongseujeung moaseo jechulhaseyo.', 'Collect the receipts and submit them.', [
  { korean: '영수증', english: 'receipts' },
  { korean: '모아서', english: 'collect and' },
  { korean: '제출하세요', english: 'please submit' },
]],
['연차 쓰고 싶어요.', 'Yeoncha sseugo sipeoyo.', 'I want to use vacation days.', [
  { korean: '연차', english: 'vacation days' },
  { korean: '쓰고 싶어요', english: 'I want to use' },
]],
['언제 쓰실 거예요?', 'Eonje sseusil geoyeyo?', 'When will you use them?', [
  { korean: '언제', english: 'when' },
  { korean: '쓰실 거예요?', english: 'will you use?' },
]],
['다음 주 금요일이요.', 'Daeum ju geumyoiriyo.', 'Next Friday.', [
  { korean: '다음 주', english: 'next week' },
  { korean: '금요일이요', english: 'Friday' },
]],
['승인했습니다.', 'Seunginhaetseumnida.', 'It has been approved.', [
  { korean: '승인했습니다', english: 'it has been approved' },
]],
['조퇴해도 될까요?', 'Jotoehae do doelkkayo?', 'May I leave early?', [
  { korean: '조퇴해도', english: 'even if I leave early' },
  { korean: '될까요?', english: 'would it be okay?' },
]],
['무슨 일 있으세요?', 'Museun il iseuseyo?', 'Is something wrong?', [
  { korean: '무슨 일', english: 'what matter' },
  { korean: '있으세요?', english: 'do you have?' },
]],
['병원에 가야 해요.', 'Byeongwone gaya haeyo.', 'I have to go to the hospital.', [
  { korean: '병원에', english: 'to the hospital' },
  { korean: '가야 해요', english: 'I have to go' },
]],
['네, 다녀오세요.', 'Ne, danyeooseyo.', 'Yes, go ahead.', [
  { korean: '네', english: 'yes' },
  { korean: '다녀오세요', english: 'go ahead / come back safely' },
]],
['야근해야 해요?', 'Yageunhaeya haeyo?', 'Do I have to work overtime?', [
  { korean: '야근해야', english: 'overtime work' },
  { korean: '해요?', english: 'do I have to do?' },
]],
['이번 주는 야근 많을 거예요.', 'Ibeon juneun yaheun maneul geoyeyo.', 'There will be a lot of overtime this week.', [
  { korean: '이번 주는', english: 'this week' },
  { korean: '야근', english: 'overtime' },
  { korean: '많을 거예요', english: 'there will be a lot' },
]],
['초과 근무 수당 받아요?', 'Chogwa geunmu sudang badayo?', 'Do I get overtime pay?', [
  { korean: '초과 근무 수당', english: 'overtime pay' },
  { korean: '받아요?', english: 'do I receive?' },
]],
['네, 급여에 포함돼요.', 'Ne, geubyeo e pohamdwaeyo.', 'Yes, it is included in the salary.', [
  { korean: '네', english: 'yes' },
  { korean: '급여에', english: 'in the salary' },
  { korean: '포함돼요', english: 'it is included' },
]],
['회식이 언제예요?', 'Hoesigi eonjeyeyo?', 'When is the company dinner?', [
  { korean: '회식이', english: 'company dinner' },
  { korean: '언제예요?', english: 'when is?' },
]],
['이번 주 금요일이에요.', 'Ibeon ju geumyoirieyo.', 'It is this Friday.', [
  { korean: '이번 주', english: 'this week' },
  { korean: '금요일이에요', english: 'it is Friday' },
]],
['참석해야 해요?', 'Chamseokhaeya haeyo?', 'Do I have to attend?', [
  { korean: '참석해야', english: 'attend' },
  { korean: '해요?', english: 'do I have to?' },
]],
['가능하면 참석해 주세요.', 'Ganeunghamyeon chamseokae juseyo.', 'Please attend if possible.', [
  { korean: '가능하면', english: 'if possible' },
  { korean: '참석해 주세요', english: 'please attend' },
]],
['이메일 확인했어요?', 'Imeir hwakinhaesseoyo?', 'Did you check the email?', [
  { korean: '이메일', english: 'email' },
  { korean: '확인했어요?', english: 'did you check?' },
]],
['네, 확인했어요.', 'Ne, hwakinhaesseoyo.', 'Yes, I checked it.', [
  { korean: '네', english: 'yes' },
  { korean: '확인했어요', english: 'I checked' },
]],
['답장 보냈어요?', 'Dapjang bonaesseoyo?', 'Did you send a reply?', [
  { korean: '답장', english: 'reply' },
  { korean: '보냈어요?', english: 'did you send?' },
]],
['아직 안 보냈어요.', 'Ajik an bonaesseoyo.', 'I haven\'t sent it yet.', [
  { korean: '아직', english: 'yet' },
  { korean: '안 보냈어요', english: 'haven\'t sent' },
]],
['빨리 답장 보내세요.', 'Ppalli dapjang bonaeseyo.', 'Please send a reply quickly.', [
  { korean: '빨리', english: 'quickly' },
  { korean: '답장', english: 'reply' },
  { korean: '보내세요', english: 'please send' },
]],
['지금 바로 보낼게요.', 'Jigeum baro bonaelgeyo.', 'I will send it right now.', [
  { korean: '지금 바로', english: 'right now' },
  { korean: '보낼게요', english: 'I will send' },
]],
['전화 좀 받아 주세요.', 'Jeonhwa jom bada juseyo.', 'Please answer the phone.', [
  { korean: '전화', english: 'phone' },
  { korean: '좀', english: 'a bit / please' },
  { korean: '받아 주세요', english: 'please answer' },
]],
['지금 통화 중이에요.', 'Jigeum tonghwa jungieyo.', 'I am on a call now.', [
  { korean: '지금', english: 'now' },
  { korean: '통화 중이에요', english: 'I am on a call' },
]],
['메시지 남겨 드릴까요?', 'Mesiji namgyeo deurilkkayo?', 'Shall I leave a message?', [
  { korean: '메시지', english: 'message' },
  { korean: '남겨 드릴까요?', english: 'shall I leave?' },
]],
['네, 전화 달라고 전해 주세요.', 'Ne, jeonhwa dallago jeonhae juseyo.', 'Yes, please tell them to call back.', [
  { korean: '네', english: 'yes' },
  { korean: '전화 달라고', english: 'to call back' },
  { korean: '전해 주세요', english: 'please tell them' },
]],
['팩스 보냈어요?', 'Paekseu bonaesseoyo?', 'Did you send the fax?', [
  { korean: '팩스', english: 'fax' },
  { korean: '보냈어요?', english: 'did you send?' },
]],
['네, 방금 보냈어요.', 'Ne, banggeum bonaesseoyo.', 'Yes, I just sent it.', [
  { korean: '네', english: 'yes' },
  { korean: '방금', english: 'just now' },
  { korean: '보냈어요', english: 'I sent' },
]],
['복사 좀 해 주세요.', 'Boksa jom hae juseyo.', 'Please make some copies.', [
  { korean: '복사', english: 'copies' },
  { korean: '좀', english: 'a bit / please' },
  { korean: '해 주세요', english: 'please do' },
]],
['몇 부 필요하세요?', 'Myeot bu pillyohaseyo?', 'How many copies do you need?', [
  { korean: '몇 부', english: 'how many copies' },
  { korean: '필요하세요?', english: 'do you need?' },
]],
['10부 부탁해요.', '10bu butakhaeyo.', 'Please make 10 copies.', [
  { korean: '10부', english: '10 copies' },
  { korean: '부탁해요', english: 'please' },
]],
['컬러로 할까요?', 'Keolleoro halkkayo?', 'Should I do it in color?', [
  { korean: '컬러로', english: 'in color' },
  { korean: '할까요?', english: 'should I do?' },
]],
['아니요, 흑백으로 하세요.', 'Aniyo, heukbaekuro haseyo.', 'No, do it in black and white.', [
  { korean: '아니요', english: 'no' },
  { korean: '흑백으로', english: 'in black and white' },
  { korean: '하세요', english: 'please do' },
]],
['프린터가 고장 났어요.', 'Peurinteoga gojang nasseoyo.', 'The printer is broken.', [
  { korean: '프린터가', english: 'the printer' },
  { korean: '고장 났어요', english: 'is broken' },
]],
['수리 요청했어요?', 'Suri yocheonghaesseoyo?', 'Did you request a repair?', [
  { korean: '수리', english: 'repair' },
  { korean: '요청했어요?', english: 'did you request?' },
]],
['네, 기사님이 오실 거예요.', 'Ne, gisanimi osil geoyeyo.', 'Yes, the technician will come.', [
  { korean: '네', english: 'yes' },
  { korean: '기사님이', english: 'the technician' },
  { korean: '오실 거예요', english: 'will come' },
]],
['컴퓨터가 안 켜져요.', 'Keompyuteoga an kyeojyeoyo.', 'The computer won\'t turn on.', [
  { korean: '컴퓨터가', english: 'the computer' },
  { korean: '안 켜져요', english: 'won\'t turn on' },
]],
['IT팀에 연락하세요.', 'IT time yeollakhaseyo.', 'Contact the IT team.', [
  { korean: 'IT팀에', english: 'the IT team' },
  { korean: '연락하세요', english: 'please contact' },
]],
['인터넷이 느려요.', 'Inteonesi neuryeoyo.', 'The internet is slow.', [
  { korean: '인터넷이', english: 'the internet' },
  { korean: '느려요', english: 'is slow' },
]],
['다시 접속해 보세요.', 'Dasi jeopsok ae boseyo.', 'Try connecting again.', [
  { korean: '다시', english: 'again' },
  { korean: '접속해 보세요', english: 'try connecting' },
]],
['파일이 안 열려요.', 'Pairi an yeollyeoyo.', 'The file won\'t open.', [
  { korean: '파일이', english: 'the file' },
  { korean: '안 열려요', english: 'won\'t open' },
]],
['다른 프로그램으로 열어 보세요.', 'Dareun peurogeuraemuro yeoreo boseyo.', 'Try opening it with another program.', [
  { korean: '다른 프로그램으로', english: 'with another program' },
  { korean: '열어 보세요', english: 'try opening' },
]],
['백업했어요?', 'Baekeophaesseoyo?', 'Did you back it up?', [
  { korean: '백업했어요?', english: 'did you back up?' },
]],
['아직 안 했어요.', 'Ajik an haesseoyo.', 'I haven\'t done it yet.', [
  { korean: '아직', english: 'yet' },
  { korean: '안 했어요', english: 'haven\'t done' },
]],
['자주 백업하세요.', 'Jaju baekeopaseyo.', 'Back up frequently.', [
  { korean: '자주', english: 'frequently' },
  { korean: '백업하세요', english: 'please back up' },
]],
['비밀번호를 잊어버렸어요.', 'Bimilbeonhoreul ijeobeolyeosseoyo.', 'I forgot the password.', [
  { korean: '비밀번호를', english: 'the password' },
  { korean: '잊어버렸어요', english: 'I forgot' },
]],
['재설정하세요.', 'Jaeseoljeonghaseyo.', 'Reset it.', [
  { korean: '재설정하세요', english: 'please reset' },
]],
['신입 사원이 들어왔어요.', 'Sinip sawoni deureowasseoyo.', 'A new employee joined.', [
  { korean: '신입 사원이', english: 'a new employee' },
  { korean: '들어왔어요', english: 'joined / came in' },
]],
['잘 부탁드립니다.', 'Jal butakdeurimnida.', 'I look forward to working with you.', [
  { korean: '잘 부탁드립니다', english: 'I look forward to working with you' },
]],
['교육은 언제 받아요?', 'Gyoyugeun eonje badayo?', 'When do I receive training?', [
  { korean: '교육은', english: 'training' },
  { korean: '언제', english: 'when' },
  { korean: '받아요?', english: 'do I receive?' },
]],
['다음 주부터 시작해요.', 'Daeum jubuteo sijakaeyo.', 'It starts from next week.', [
  { korean: '다음 주부터', english: 'from next week' },
  { korean: '시작해요', english: 'it starts' },
]],
['멘토가 누구예요?', 'Mentoga nuguyeyo?', 'Who is the mentor?', [
  { korean: '멘토가', english: 'mentor' },
  { korean: '누구예요?', english: 'who is?' },
]],
['김 과장님이에요.', 'Kim gwajangnimieyo.', 'It is Manager Kim.', [
  { korean: '김 과장님이에요', english: 'it is Manager Kim' },
]],
['업무 인수인계 받았어요?', 'Eopmu insuingye badasseoyo?', 'Did you receive the work handover?', [
  { korean: '업무 인수인계', english: 'work handover' },
  { korean: '받았어요?', english: 'did you receive?' },
]],
['네, 다 받았어요.', 'Ne, da badasseoyo.', 'Yes, I received everything.', [
  { korean: '네', english: 'yes' },
  { korean: '다', english: 'everything' },
  { korean: '받았어요', english: 'I received' },
]],
['퇴사하신다고요?', 'Toesahasindagoyo?', 'Are you resigning?', [
  { korean: '퇴사하신다고요?', english: 'are you resigning?' },
]],
['네, 다음 달에 퇴사해요.', 'Ne, daeum dare toesahaeyo.', 'Yes, I am resigning next month.', [
  { korean: '네', english: 'yes' },
  { korean: '다음 달에', english: 'next month' },
  { korean: '퇴사해요', english: 'I am resigning' },
]],
['새 직장 구하셨어요?', 'Sae jikjang guhasleosseoyo?', 'Did you find a new job?', [
  { korean: '새 직장', english: 'new job' },
  { korean: '구하셨어요?', english: 'did you find?' },
]],
['네, 더 좋은 기회를 얻었어요.', 'Ne, deo joeun gihoereul eodeosseoyo.', 'Yes, I got a better opportunity.', [
  { korean: '네', english: 'yes' },
  { korean: '더 좋은 기회를', english: 'a better opportunity' },
  { korean: '얻었어요', english: 'I got' },
]],
['승진 축하해요.', 'Seungjin chukahaeyo.', 'Congratulations on the promotion.', [
  { korean: '승진', english: 'promotion' },
  { korean: '축하해요', english: 'congratulations' },
]],
['감사합니다.', 'Gamsahamnida.', 'Thank you.', [
  { korean: '감사합니다', english: 'thank you' },
]],
['계약서에 서명했어요?', 'Gyeyakseoe seomyeonghaesseoyo?', 'Did you sign the contract?', [
  { korean: '계약서에', english: 'on the contract' },
  { korean: '서명했어요?', english: 'did you sign?' },
]],
['네, 서명하고 제출했어요.', 'Ne, seomyeonghago jechulhaesseoyo.', 'Yes, I signed and submitted it.', [
  { korean: '네', english: 'yes' },
  { korean: '서명하고', english: 'signed and' },
  { korean: '제출했어요', english: 'submitted' },
]],
['급여일이 언제예요?', 'Geubyeoiri eonjeyeyo?', 'When is payday?', [
  { korean: '급여일이', english: 'payday' },
  { korean: '언제예요?', english: 'when is?' },
]],
['매월 25일이에요.', 'Maewol 25irieyo.', 'It is the 25th of every month.', [
  { korean: '매월', english: 'every month' },
  { korean: '25일이에요', english: 'it is the 25th' },
]],
['상여금 받았어요?', 'Sangyeogeum badasseoyo?', 'Did you receive a bonus?', [
  { korean: '상여금', english: 'bonus' },
  { korean: '받았어요?', english: 'did you receive?' },
]],
['네, 이번 달에 받았어요.', 'Ne, ibeon dare badasseoyo.', 'Yes, I received it this month.', [
  { korean: '네', english: 'yes' },
  { korean: '이번 달에', english: 'this month' },
  { korean: '받았어요', english: 'I received' },
]],
['복지 혜택이 뭐가 있어요?', 'Bokji hyetaegi mwoga isseoyo?', 'What benefits are there?', [
  { korean: '복지 혜택이', english: 'benefits' },
  { korean: '뭐가 있어요?', english: 'what is there?' },
]],
['식비 지원하고 건강검진 있어요.', 'Sikbi jiwonhago geonganggeomjin isseoyo.', 'There is meal support and health checkups.', [
  { korean: '식비 지원하고', english: 'meal support and' },
  { korean: '건강검진', english: 'health checkups' },
  { korean: '있어요', english: 'there is' },
]],
['점심 식사 어디서 해요?', 'Jeomsim siksa eodiseo haeyo?', 'Where do you have lunch?', [
  { korean: '점심 식사', english: 'lunch' },
  { korean: '어디서', english: 'where' },
  { korean: '해요?', english: 'do you have?' },
]],
['구내식당에서 먹어요.', 'Gunae sikdangeseo meogeoyo.', 'I eat at the company cafeteria.', [
  { korean: '구내식당에서', english: 'at the company cafeteria' },
  { korean: '먹어요', english: 'I eat' },
]],
['같이 점심 먹을래요?', 'Gachi jeomsim meogeullaeyo?', 'Do you want to have lunch together?', [
  { korean: '같이', english: 'together' },
  { korean: '점심', english: 'lunch' },
  { korean: '먹을래요?', english: 'do you want to eat?' },
]],
['좋아요, 같이 가요.', 'Joayo, gachi gayo.', 'Sounds good, let\'s go together.', [
  { korean: '좋아요', english: 'sounds good' },
  { korean: '같이 가요', english: 'let\'s go together' },
]],
].map(([k, r, e, b]) => createContentItem(k, r, e, 'sentence', k, e, b));

// HEALTHCARE - Sentences
const healthcareSentences = [
['어디가 아파요?', 'Eodiga apayo?', 'Where does it hurt?', [
  { korean: '어디가', english: 'where' },
  { korean: '아파요?', english: 'does it hurt?' },
]],
['머리가 아파요.', 'Meoriga apayo.', 'My head hurts.', [
  { korean: '머리가', english: 'my head' },
  { korean: '아파요.', english: 'hurts.' },
]],
['언제부터 아팠어요?', 'Eonjebuteo apasseoyo?', 'Since when has it been hurting?', [
  { korean: '언제부터', english: 'since when' },
  { korean: '아팠어요?', english: 'has it been hurting?' },
]],
['어제부터 아팠어요.', 'Eojebuteo apasseoyo.', 'It has been hurting since yesterday.', [
  { korean: '어제부터', english: 'since yesterday' },
  { korean: '아팠어요.', english: 'it has been hurting.' },
]],
['열이 나요?', 'Yeori nayo?', 'Do you have a fever?', [
  { korean: '열이', english: 'fever' },
  { korean: '나요?', english: 'do you have?' },
]],
['네, 열이 조금 나요.', 'Ne, yeori jogeum nayo.', 'Yes, I have a slight fever.', [
  { korean: '네,', english: 'yes,' },
  { korean: '열이', english: 'fever' },
  { korean: '조금 나요.', english: 'a little comes out.' },
]],
['체온이 몇 도예요?', 'Cheoni myeot doyeyo?', 'What is your temperature?', [
  { korean: '체온이', english: 'temperature' },
  { korean: '몇 도예요?', english: 'how many degrees is it?' },
]],
['38도예요.', '38doyeyo.', 'It is 38 degrees.', [
  { korean: '38도예요.', english: 'it is 38 degrees.' },
]],
['기침이 나요?', 'Gichimi nayo?', 'Do you have a cough?', [
  { korean: '기침이', english: 'cough' },
  { korean: '나요?', english: 'do you have?' },
]],
['네, 기침이 심해요.', 'Ne, gichimi simhaeyo.', 'Yes, my cough is severe.', [
  { korean: '네,', english: 'yes,' },
  { korean: '기침이', english: 'cough' },
  { korean: '심해요.', english: 'is severe.' },
]],
['가래가 나와요?', 'Garaega nawayo?', 'Is there phlegm?', [
  { korean: '가래가', english: 'phlegm' },
  { korean: '나와요?', english: 'comes out?' },
]],
['네, 노란 가래가 나와요.', 'Ne, noran garaega nawayo.', 'Yes, there is yellow phlegm.', [
  { korean: '네,', english: 'yes,' },
  { korean: '노란 가래가', english: 'yellow phlegm' },
  { korean: '나와요.', english: 'comes out.' },
]],
['목이 아파요?', 'Mogi apayo?', 'Does your throat hurt?', [
  { korean: '목이', english: 'throat' },
  { korean: '아파요?', english: 'does it hurt?' },
]],
['네, 목이 많이 아파요.', 'Ne, mogi mani apayo.', 'Yes, my throat hurts a lot.', [
  { korean: '네,', english: 'yes,' },
  { korean: '목이', english: 'throat' },
  { korean: '많이 아파요.', english: 'hurts a lot.' },
]],
['콧물이 나요?', 'Kkonmuri nayo?', 'Do you have a runny nose?', [
  { korean: '콧물이', english: 'runny nose' },
  { korean: '나요?', english: 'do you have?' },
]],
['네, 계속 나와요.', 'Ne, gyesok nawayo?', 'Yes, it keeps running.', [
  { korean: '네,', english: 'yes,' },
  { korean: '계속', english: 'keeps' },
  { korean: '나와요.', english: 'coming out.' },
]],
['코가 막혔어요?', 'Koga makeoasseoyo?', 'Is your nose stuffy?', [
  { korean: '코가', english: 'nose' },
  { korean: '막혔어요?', english: 'is blocked?' },
]],
['네, 숨쉬기 힘들어요.', 'Ne, sumswigi himdeureoyo.', 'Yes, it is hard to breathe.', [
  { korean: '네,', english: 'yes,' },
  { korean: '숨쉬기', english: 'breathing' },
  { korean: '힘들어요.', english: 'is hard.' },
]],
['배가 아파요?', 'Baega apayo?', 'Does your stomach hurt?', [
  { korean: '배가', english: 'stomach' },
  { korean: '아파요?', english: 'does it hurt?' },
]],
['네, 배가 많이 아파요.', 'Ne, baega mani apayo.', 'Yes, my stomach hurts a lot.', [
  { korean: '네,', english: 'yes,' },
  { korean: '배가', english: 'stomach' },
  { korean: '많이 아파요.', english: 'hurts a lot.' },
]],
['설사를 해요?', 'Seolsareul haeyo?', 'Do you have diarrhea?', [
  { korean: '설사를', english: 'diarrhea' },
  { korean: '해요?', english: 'do you have?' },
]],
['네, 하루에 여러 번 해요.', 'Ne, harue yeoreo beon haeyo.', 'Yes, several times a day.', [
  { korean: '네,', english: 'yes,' },
  { korean: '하루에', english: 'in a day' },
  { korean: '여러 번', english: 'several times' },
  { korean: '해요.', english: 'I do.' },
]],
['구토했어요?', 'Gutohaesseoyo?', 'Did you vomit?', [
  { korean: '구토했어요?', english: 'did you vomit?' },
]],
['네, 아침에 한 번 했어요.', 'Ne, achime han beon haesseoyo.', 'Yes, I did once in the morning.', [
  { korean: '네,', english: 'yes,' },
  { korean: '아침에', english: 'in the morning' },
  { korean: '한 번', english: 'once' },
  { korean: '했어요.', english: 'I did.' },
]],
['식욕이 있어요?', 'Sigyogi isseoyo?', 'Do you have an appetite?', [
  { korean: '식욕이', english: 'appetite' },
  { korean: '있어요?', english: 'do you have?' },
]],
['아니요, 먹고 싶지 않아요.', 'Aniyo, meokgo sipji anayo.', 'No, I don\'t want to eat.', [
  { korean: '아니요,', english: 'no,' },
  { korean: '먹고 싶지 않아요.', english: 'I don\'t want to eat.' },
]],
['어지러워요?', 'Eojireowowo?', 'Are you dizzy?', [
  { korean: '어지러워요?', english: 'are you dizzy?' },
]],
['네, 가끔 어지러워요.', 'Ne, gakkeum eojireowowo.', 'Yes, I am sometimes dizzy.', [
  { korean: '네,', english: 'yes,' },
  { korean: '가끔', english: 'sometimes' },
  { korean: '어지러워요.', english: 'I am dizzy.' },
]],
['잠을 잘 자요?', 'Jameul jal jayo?', 'Do you sleep well?', [
  { korean: '잠을', english: 'sleep' },
  { korean: '잘 자요?', english: 'do you sleep well?' },
]],
['아니요, 잠을 잘 못 자요.', 'Aniyo, jameul jal mot jayo.', 'No, I don\'t sleep well.', [
  { korean: '아니요,', english: 'no,' },
  { korean: '잠을', english: 'sleep' },
  { korean: '잘 못 자요.', english: 'I can\'t sleep well.' },
]],
['스트레스 받아요?', 'Seuteureseu badayo?', 'Are you stressed?', [
  { korean: '스트레스', english: 'stress' },
  { korean: '받아요?', english: 'do you receive?' },
]],
['네, 요즘 스트레스가 많아요.', 'Ne, yojeum seuteureseuga manayo.', 'Yes, I have a lot of stress these days.', [
  { korean: '네,', english: 'yes,' },
  { korean: '요즘', english: 'these days' },
  { korean: '스트레스가', english: 'stress' },
  { korean: '많아요.', english: 'is a lot.' },
]],
['운동은 하세요?', 'Undongeun haseyo?', 'Do you exercise?', [
  { korean: '운동은', english: 'exercise' },
  { korean: '하세요?', english: 'do you do?' },
]],
['아니요, 요즘 못 하고 있어요.', 'Aniyo, yojeum mot hago isseoyo.', 'No, I haven\'t been able to lately.', [
  { korean: '아니요,', english: 'no,' },
  { korean: '요즘', english: 'lately' },
  { korean: '못 하고 있어요.', english: 'I haven\'t been able to.' },
]],
['담배 피우세요?', 'Dambae piuseyo?', 'Do you smoke?', [
  { korean: '담배', english: 'cigarettes' },
  { korean: '피우세요?', english: 'do you smoke?' },
]],
['아니요, 안 피워요.', 'Aniyo, an piwoyo.', 'No, I don\'t smoke.', [
  { korean: '아니요,', english: 'no,' },
  { korean: '안 피워요.', english: 'I don\'t smoke.' },
]],
['술 자주 마시세요?', 'Sul jaju masiseyo?', 'Do you drink alcohol often?', [
  { korean: '술', english: 'alcohol' },
  { korean: '자주', english: 'often' },
  { korean: '마시세요?', english: 'do you drink?' },
]],
['가끔 마셔요.', 'Gakkeum masyeoyo.', 'I drink occasionally.', [
  { korean: '가끔', english: 'occasionally' },
  { korean: '마셔요.', english: 'I drink.' },
]],
['알레르기가 있으세요?', 'Allereugiga iseuseyo?', 'Do you have allergies?', [
  { korean: '알레르기가', english: 'allergies' },
  { korean: '있으세요?', english: 'do you have?' },
]],
['아니요, 없어요.', 'Aniyo, eopseoyo.', 'No, I don\'t.', [
  { korean: '아니요,', english: 'no,' },
  { korean: '없어요.', english: 'I don\'t have any.' },
]],
['복용 중인 약이 있어요?', 'Bogyong jungin yagi isseoyo?', 'Are you taking any medication?', [
  { korean: '복용 중인', english: 'currently taking' },
  { korean: '약이', english: 'medication' },
  { korean: '있어요?', english: 'is there?' },
]],
['네, 혈압약을 먹어요.', 'Ne, hyeorabyageul meogeoyo.', 'Yes, I take blood pressure medicine.', [
  { korean: '네,', english: 'yes,' },
  { korean: '혈압약을', english: 'blood pressure medicine' },
  { korean: '먹어요.', english: 'I take.' },
]],
['가족 중에 당뇨병 환자 있어요?', 'Gajok junge dangyobyeong hwanja isseoyo?', 'Is there anyone with diabetes in your family?', [
  { korean: '가족 중에', english: 'in your family' },
  { korean: '당뇨병 환자', english: 'diabetes patient' },
  { korean: '있어요?', english: 'is there?' },
]],
['네, 아버지가 당뇨병이에요.', 'Ne, abeojiga dangyobyeongieyo.', 'Yes, my father has diabetes.', [
  { korean: '네,', english: 'yes,' },
  { korean: '아버지가', english: 'my father' },
  { korean: '당뇨병이에요.', english: 'has diabetes.' },
]],
['검사를 받아야 해요.', 'Geomsareul badaya haeyo.', 'You need to get tested.', [
  { korean: '검사를', english: 'a test' },
  { korean: '받아야 해요.', english: 'you need to receive.' },
]],
['무슨 검사를 해야 해요?', 'Museun geomsareul haeya haeyo?', 'What test do I need to take?', [
  { korean: '무슨 검사를', english: 'what test' },
  { korean: '해야 해요?', english: 'do I need to do?' },
]],
['혈액 검사하고 소변 검사 해요.', 'Hyeoraek geomsahago sobyeon geomsa haeyo.', 'Blood test and urine test.', [
  { korean: '혈액 검사하고', english: 'blood test and' },
  { korean: '소변 검사', english: 'urine test' },
  { korean: '해요.', english: 'we do.' },
]],
['검사 결과는 언제 나와요?', 'Geomsa gyeolgwaneun eonje nawayo?', 'When will the test results be ready?', [
  { korean: '검사 결과는', english: 'test results' },
  { korean: '언제', english: 'when' },
  { korean: '나와요?', english: 'will they come out?' },
]],
['3일 후에 나와요.', '3il hue nawayo.', 'They will be ready in 3 days.', [
  { korean: '3일 후에', english: 'in 3 days' },
  { korean: '나와요.', english: 'they come out.' },
]],
['엑스레이를 찍어야 해요.', 'Ekseu reireul jjigeoya haeyo.', 'You need to get an X-ray.', [
  { korean: '엑스레이를', english: 'an X-ray' },
  { korean: '찍어야 해요.', english: 'you need to take.' },
]],
['어디를 찍어요?', 'Eodireul jjigeoyo?', 'Where do you take it?', [
  { korean: '어디를', english: 'where' },
  { korean: '찍어요?', english: 'do you take it?' },
]],
['가슴을 찍어요.', 'Gaseumeul jjigeoyo.', 'We take it of your chest.', [
  { korean: '가슴을', english: 'chest' },
  { korean: '찍어요.', english: 'we take.' },
]],
['CT 촬영이 필요해요.', 'CT chwalyeongi pillyohaeyo.', 'A CT scan is needed.', [
  { korean: 'CT 촬영이', english: 'a CT scan' },
  { korean: '필요해요.', english: 'is needed.' },
]],
['비용이 얼마예요?', 'Biyongi eolmayeyo?', 'How much does it cost?', [
  { korean: '비용이', english: 'the cost' },
  { korean: '얼마예요?', english: 'how much is it?' },
]],
['보험 적용되면 2만원이에요.', 'Boheom jeok yongdoemyeon 2manwonieyo.', 'With insurance, it is 20,000 won.', [
  { korean: '보험 적용되면', english: 'if insurance is applied' },
  { korean: '2만원이에요.', english: 'it is 20,000 won.' },
]],
['처방전 받았어요?', 'Cheobangjeon badasseoyo?', 'Did you get a prescription?', [
  { korean: '처방전', english: 'prescription' },
  { korean: '받았어요?', english: 'did you receive?' },
]],
['네, 여기 있어요.', 'Ne, yeogi isseoyo.', 'Yes, here it is.', [
  { korean: '네,', english: 'yes,' },
  { korean: '여기 있어요.', english: 'here it is.' },
]],
['약은 어디서 받아요?', 'Yageun eodiseo badayo?', 'Where do I get the medicine?', [
  { korean: '약은', english: 'the medicine' },
  { korean: '어디서', english: 'where' },
  { korean: '받아요?', english: 'do I get it?' },
]],
['1층 약국에서 받으세요.', '1cheung yakgugeseo badeuseyo.', 'Get it at the pharmacy on the first floor.', [
  { korean: '1층 약국에서', english: 'at the first floor pharmacy' },
  { korean: '받으세요.', english: 'please get it.' },
]],
['하루에 몇 번 먹어요?', 'Harue myeot beon meogeoyo?', 'How many times a day do I take it?', [
  { korean: '하루에', english: 'in a day' },
  { korean: '몇 번', english: 'how many times' },
  { korean: '먹어요?', english: 'do I take it?' },
]],
['하루 세 번, 식후에 드세요.', 'Haru se beon, sikhu e deuseyo.', 'Three times a day, after meals.', [
  { korean: '하루 세 번,', english: 'three times a day,' },
  { korean: '식후에', english: 'after meals' },
  { korean: '드세요.', english: 'please take it.' },
]],
['부작용이 있어요?', 'Bujagyongi isseoyo?', 'Are there side effects?', [
  { korean: '부작용이', english: 'side effects' },
  { korean: '있어요?', english: 'are there?' },
]],
['졸릴 수 있어요.', 'Jollil su isseoyo.', 'You may feel drowsy.', [
  { korean: '졸릴 수 있어요.', english: 'you may feel drowsy.' },
]],
['술과 같이 먹으면 안 돼요?', 'Sulgwa gachi meokeumyeon an dwaeyo?', 'Can I not take it with alcohol?', [
  { korean: '술과 같이', english: 'together with alcohol' },
  { korean: '먹으면', english: 'if I take it' },
  { korean: '안 돼요?', english: 'is it not okay?' },
]],
['네, 술은 피하세요.', 'Ne, sureun pihaseyo.', 'Yes, avoid alcohol.', [
  { korean: '네,', english: 'yes,' },
  { korean: '술은', english: 'alcohol' },
  { korean: '피하세요.', english: 'please avoid.' },
]],
['며칠 동안 먹어야 해요?', 'Myeochil dongan meogeoya haeyo?', 'For how many days should I take it?', [
  { korean: '며칠 동안', english: 'for how many days' },
  { korean: '먹어야 해요?', english: 'should I take it?' },
]],
['일주일 동안 드세요.', 'Iljuil dongan deuseyo.', 'Take it for one week.', [
  { korean: '일주일 동안', english: 'for one week' },
  { korean: '드세요.', english: 'please take it.' },
]],
['약 다 먹고도 안 나으면요?', 'Yak da meokgodo an naeumyeonyo?', 'What if I don\'t get better after finishing the medicine?', [
  { korean: '약 다 먹고도', english: 'even after finishing all the medicine' },
  { korean: '안 나으면요?', english: 'what if I don\'t get better?' },
]],
['다시 오세요.', 'Dasi oseyo.', 'Come back again.', [
  { korean: '다시', english: 'again' },
  { korean: '오세요.', english: 'please come.' },
]],
['재진 예약할까요?', 'Jaejin yeyakhalkkayo?', 'Shall I make a follow-up appointment?', [
  { korean: '재진', english: 'follow-up visit' },
  { korean: '예약할까요?', english: 'shall I make an appointment?' },
]],
['네, 다음 주에 예약해 주세요.', 'Ne, daeum jue yeyak ae juseyo.', 'Yes, please make an appointment for next week.', [
  { korean: '네,', english: 'yes,' },
  { korean: '다음 주에', english: 'for next week' },
  { korean: '예약해 주세요.', english: 'please make an appointment.' },
]],
['입원해야 해요?', 'Ibwonhaeya haeyo?', 'Do I need to be hospitalized?', [
  { korean: '입원해야 해요?', english: 'do I need to be hospitalized?' },
]],
['아니요, 통원 치료로 괜찮아요.', 'Aniyo, tongwon chiryoro gwaenchanhayo.', 'No, outpatient treatment is fine.', [
  { korean: '아니요,', english: 'no,' },
  { korean: '통원 치료로', english: 'with outpatient treatment' },
  { korean: '괜찮아요.', english: 'it is fine.' },
]],
['수술이 필요해요?', 'Susuri pillyohaeyo?', 'Is surgery needed?', [
  { korean: '수술이', english: 'surgery' },
  { korean: '필요해요?', english: 'is it needed?' },
]],
['네, 수술하는 게 좋겠어요.', 'Ne, susulhaneun ge joesseoyo.', 'Yes, it would be good to have surgery.', [
  { korean: '네,', english: 'yes,' },
  { korean: '수술하는 게', english: 'having surgery' },
  { korean: '좋겠어요.', english: 'would be good.' },
]],
['수술 비용이 얼마예요?', 'Susul biyongi eolmayeyo?', 'How much does the surgery cost?', [
  { korean: '수술 비용이', english: 'the surgery cost' },
  { korean: '얼마예요?', english: 'how much is it?' },
]],
['보험 적용되면 50만원이에요.', 'Boheom jeogyongdoemyeon 50manwonieyo.', 'With insurance, it is 500,000 won.', [
  { korean: '보험 적용되면', english: 'if insurance is applied' },
  { korean: '50만원이에요.', english: 'it is 500,000 won.' },
]],
['회복 기간이 얼마나 걸려요?', 'Hoebook gigani eolmana geollyeoyo?', 'How long is the recovery period?', [
  { korean: '회복 기간이', english: 'the recovery period' },
  { korean: '얼마나 걸려요?', english: 'how long does it take?' },
]],
['2주 정도 걸려요.', '2ju jeongdo geollyeoyo.', 'It takes about 2 weeks.', [
  { korean: '2주 정도', english: 'about 2 weeks' },
  { korean: '걸려요.', english: 'it takes.' },
]],
['퇴원은 언제 할 수 있어요?', 'Toegwoneun eonje hal su isseoyo?', 'When can I be discharged?', [
  { korean: '퇴원은', english: 'discharge' },
  { korean: '언제', english: 'when' },
  { korean: '할 수 있어요?', english: 'can I do it?' },
]],
['모레 퇴원 가능해요.', 'More toegwon ganeunghaeyo.', 'You can be discharged the day after tomorrow.', [
  { korean: '모레', english: 'the day after tomorrow' },
  { korean: '퇴원 가능해요.', english: 'discharge is possible.' },
]],
['물리 치료 받아야 해요?', 'Mulli chiryo badaya haeyo?', 'Do I need physical therapy?', [
  { korean: '물리 치료', english: 'physical therapy' },
  { korean: '받아야 해요?', english: 'do I need to receive?' },
]],
['네, 주 2회 받으세요.', 'Ne, ju 2hoe badeuseyo.', 'Yes, receive it twice a week.', [
  { korean: '네,', english: 'yes,' },
  { korean: '주 2회', english: 'twice a week' },
  { korean: '받으세요.', english: 'please receive.' },
]],
['예약했는데 취소하고 싶어요.', 'Yeyakhaenneunde chwisohago sipeoyo.', 'I made an appointment but want to cancel.', [
  { korean: '예약했는데', english: 'I made an appointment but' },
  { korean: '취소하고 싶어요.', english: 'I want to cancel.' },
]],
['전화로 취소하시면 돼요.', 'Jeonhwaro chwisohasimyeon dwaeyo.', 'You can cancel by phone.', [
  { korean: '전화로', english: 'by phone' },
  { korean: '취소하시면 돼요.', english: 'you can cancel.' },
]],
['진료비가 얼마예요?', 'Jillyobiga eolmayeyo?', 'How much is the medical fee?', [
  { korean: '진료비가', english: 'the medical fee' },
  { korean: '얼마예요?', english: 'how much is it?' },
]],
['5만원입니다.', '5manwon imnida.', 'It is 50,000 won.', [
  { korean: '5만원입니다.', english: 'it is 50,000 won.' },
]],
['보험 되나요?', 'Boheom doenayo?', 'Is it covered by insurance?', [
  { korean: '보험', english: 'insurance' },
  { korean: '되나요?', english: 'is it covered?' },
]],
['네, 보험 적용 가능해요.', 'Ne, boheom jeokyong ganeunghaeyo.', 'Yes, insurance coverage is possible.', [
  { korean: '네,', english: 'yes,' },
  { korean: '보험 적용', english: 'insurance coverage' },
  { korean: '가능해요.', english: 'is possible.' },
]],
['건강검진 받고 싶어요.', 'Geongganggeomjin batgo sipeoyo.', 'I want to get a health checkup.', [
  { korean: '건강검진', english: 'health checkup' },
  { korean: '받고 싶어요.', english: 'I want to receive.' },
]],
['예약하시겠어요?', 'Yeyakhasigesseayo?', 'Would you like to make an appointment?', [
  { korean: '예약하시겠어요?', english: 'would you like to make an appointment?' },
]],
['네, 가능한 날짜 알려 주세요.', 'Ne, ganeunghan naljja allyeo juseyo.', 'Yes, please tell me the available dates.', [
  { korean: '네,', english: 'yes,' },
  { korean: '가능한 날짜', english: 'available dates' },
  { korean: '알려 주세요.', english: 'please tell me.' },
]],
['다음 주 월요일 어때요?', 'Daeum ju wolyoil eottaeyo?', 'How about next Monday?', [
  { korean: '다음 주 월요일', english: 'next Monday' },
  { korean: '어때요?', english: 'how about?' },
]],
['좋아요, 그날로 예약할게요.', 'Joayo, geunallo yeyakhalgeyo.', 'Sounds good, I will make an appointment for that day.', [
  { korean: '좋아요,', english: 'sounds good,' },
  { korean: '그날로', english: 'for that day' },
  { korean: '예약할게요.', english: 'I will make an appointment.' },
]],
].map(([k, r, e, b]) => createContentItem(k, r, e, 'sentence', k, e, b));

module.exports = {
  greetingsSentences,
  dailyLifeSentences,
  foodSentences,
  travelSentences,
  shoppingSentences,
  businessSentences,
  healthcareSentences
};
