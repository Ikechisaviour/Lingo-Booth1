const createContentItem = (targetText, romanization, nativeText, type = 'word', exampleTarget = '', exampleNative = '', breakdown = null) => ({
  type,
  targetText,
  romanization,
  nativeText,
  pronunciation: romanization,
  exampleTarget: exampleTarget || targetText,
  exampleNative: exampleNative || nativeText,
  korean: targetText,
  english: nativeText,
  example: exampleTarget || targetText,
  exampleEnglish: exampleNative || nativeText,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.korean || b.target, native: b.english || b.native, korean: b.korean || b.target, english: b.english || b.native })) } : {}),
});

// ============================================================
// 1. GREETINGS & INTRODUCTIONS
// ============================================================
const greetings = {
  title: 'Basic Greetings & Introductions',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'ta',
  content: [
    createContentItem('வணக்கம்', 'vanakkam', 'Hello', 'word', 'வணக்கம், எப்படி இருக்கீர்கள்?', 'Hello, how are you?'),
    createContentItem('நல்ல காலை', 'nalla kaalai', 'Good morning', 'word', 'நல்ல காலை, சார்!', 'Good morning, sir!'),
    createContentItem('நல்ல மாலை', 'nalla maalai', 'Good evening', 'word', 'நல்ல மாலை, எப்படி இருக்கீர்கள்?', 'Good evening, how are you?'),
    createContentItem('நல்ல இரவு', 'nalla iravu', 'Good night', 'word', 'நல்ல இரவு, நன்றாக தூங்குங்கள்.', 'Good night, sleep well.'),
    createContentItem('நன்றி', 'nandri', 'Thank you', 'word', 'மிக்க நன்றி!', 'Thank you very much!'),
    createContentItem('தயவுசெய்து', 'thayavuseidhu', 'Please', 'word', 'தயவுசெய்து உட்காருங்கள்.', 'Please sit down.'),
    createContentItem('மன்னிக்கவும்', 'mannikkavum', 'Excuse me / Sorry', 'word', 'மன்னிக்கவும், நான் தாமதமாக வந்தேன்.', 'Sorry, I came late.'),
    createContentItem('ஆம்', 'aam', 'Yes', 'word', 'ஆம், நான் புரிந்துகொண்டேன்.', 'Yes, I understood.'),
    createContentItem('இல்லை', 'illai', 'No', 'word', 'இல்லை, எனக்கு வேண்டாம்.', 'No, I don\'t want it.'),
    createContentItem('போய் வருகிறேன்', 'poi varugiren', 'Goodbye (I\'ll go and come back)', 'word', 'சரி, போய் வருகிறேன்!', 'Okay, goodbye!'),
    createContentItem('நீங்கள் எப்படி இருக்கீர்கள்?', 'neengal eppadi irukkeerkal?', 'How are you?', 'sentence', '', '', [
      { target: 'நீங்கள்', native: 'you' },
      { target: 'எப்படி', native: 'how' },
      { target: 'இருக்கீர்கள்', native: 'are' },
    ]),
    createContentItem('நான் நன்றாக இருக்கிறேன்.', 'naan nandraga irukkiren.', 'I am fine.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'நன்றாக', native: 'well / fine' },
      { target: 'இருக்கிறேன்', native: 'am' },
    ]),
    createContentItem('உங்கள் பெயர் என்ன?', 'ungal peyar enna?', 'What is your name?', 'sentence', '', '', [
      { target: 'உங்கள்', native: 'your' },
      { target: 'பெயர்', native: 'name' },
      { target: 'என்ன', native: 'what' },
    ]),
    createContentItem('என் பெயர் ராஜா.', 'en peyar raajaa.', 'My name is Raja.', 'sentence', '', '', [
      { target: 'என்', native: 'my' },
      { target: 'பெயர்', native: 'name' },
      { target: 'ராஜா', native: 'Raja' },
    ]),
    createContentItem('சந்தோஷமாக சந்திக்கிறேன்', 'sandhoshamaga sandhikkiren', 'Nice to meet you', 'sentence', '', '', [
      { target: 'சந்தோஷமாக', native: 'happily' },
      { target: 'சந்திக்கிறேன்', native: 'meeting' },
    ]),
    createContentItem('நான் தமிழ் படிக்கிறேன்.', 'naan tamizh padikkiren.', 'I am learning Tamil.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'தமிழ்', native: 'Tamil' },
      { target: 'படிக்கிறேன்', native: 'am learning' },
    ]),
    createContentItem('நான் இந்தியாவிலிருந்து வருகிறேன்.', 'naan indhiyaavilirundhu varugiren.', 'I come from India.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'இந்தியாவிலிருந்து', native: 'from India' },
      { target: 'வருகிறேன்', native: 'come' },
    ]),
    createContentItem('வாருங்கள்', 'vaarungal', 'Come (polite)', 'word', 'உள்ளே வாருங்கள்.', 'Please come inside.'),
    createContentItem('பிறகு சந்திப்போம்', 'piragu sandhippom', 'See you later', 'sentence', '', '', [
      { target: 'பிறகு', native: 'later' },
      { target: 'சந்திப்போம்', native: 'we will meet' },
    ]),
    createContentItem('நலமா?', 'nalamaa?', 'Are you well?', 'word', 'நலமா? எல்லாம் நல்லா இருக்கா?', 'Are you well? Is everything fine?'),
    createContentItem('சுகமா?', 'sugamaa?', 'Are you comfortable?', 'word', 'சுகமா? உடம்பு எப்படி?', 'Are you comfortable? How is your health?'),
    createContentItem('வருக வருக', 'varuga varuga', 'Welcome', 'word', 'வருக வருக, உட்காருங்கள்.', 'Welcome, please sit down.'),
    createContentItem('கொஞ்சம் தமிழ் தெரியும்.', 'konjam tamizh theriyum.', 'I know a little Tamil.', 'sentence', '', '', [
      { target: 'கொஞ்சம்', native: 'a little' },
      { target: 'தமிழ்', native: 'Tamil' },
      { target: 'தெரியும்', native: 'know' },
    ]),
    createContentItem('மீண்டும் சொல்லுங்கள்.', 'meendum sollungal.', 'Please say it again.', 'sentence', '', '', [
      { target: 'மீண்டும்', native: 'again' },
      { target: 'சொல்லுங்கள்', native: 'please say' },
    ]),
    createContentItem('புரியவில்லை.', 'puriyavillai.', 'I don\'t understand.', 'sentence', '', '', [
      { target: 'புரியவில்லை', native: 'don\'t understand' },
    ]),
  ],
};

// ============================================================
// 2. DAILY LIFE
// ============================================================
const dailyLife = {
  title: 'Daily Life & Routine',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'ta',
  content: [
    createContentItem('வீடு', 'veedu', 'House / Home', 'word', 'என் வீடு சென்னையில் இருக்கிறது.', 'My house is in Chennai.'),
    createContentItem('குடும்பம்', 'kudumbam', 'Family', 'word', 'என் குடும்பம் பெரியது.', 'My family is big.'),
    createContentItem('அம்மா', 'ammaa', 'Mother', 'word', 'என் அம்மா சமைக்கிறார்கள்.', 'My mother is cooking.'),
    createContentItem('அப்பா', 'appaa', 'Father', 'word', 'என் அப்பா வேலைக்கு போகிறார்.', 'My father is going to work.'),
    createContentItem('தண்ணீர்', 'thanneer', 'Water', 'word', 'தயவுசெய்து தண்ணீர் கொடுங்கள்.', 'Please give me water.'),
    createContentItem('சாப்பாடு', 'saappaadu', 'Food / Meal', 'word', 'சாப்பாடு ரொம்ப நல்லா இருக்கு.', 'The food is very good.'),
    createContentItem('நேரம்', 'neram', 'Time', 'word', 'இப்போது என்ன நேரம்?', 'What time is it now?'),
    createContentItem('இன்று', 'indru', 'Today', 'word', 'இன்று என்ன கிழமை?', 'What day is today?'),
    createContentItem('நாளை', 'naalai', 'Tomorrow', 'word', 'நாளை நான் வருவேன்.', 'I will come tomorrow.'),
    createContentItem('நேற்று', 'netru', 'Yesterday', 'word', 'நேற்று மழை பெய்தது.', 'It rained yesterday.'),
    createContentItem('நான் காலையில் எழுந்திருப்பேன்.', 'naan kaalaiyil ezhundhiruppen.', 'I wake up in the morning.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'காலையில்', native: 'in the morning' },
      { target: 'எழுந்திருப்பேன்', native: 'wake up' },
    ]),
    createContentItem('நான் பல் தேய்க்கிறேன்.', 'naan pal theykkiren.', 'I brush my teeth.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'பல்', native: 'teeth' },
      { target: 'தேய்க்கிறேன்', native: 'brush' },
    ]),
    createContentItem('நான் குளிக்கிறேன்.', 'naan kulikkiren.', 'I take a bath.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'குளிக்கிறேன்', native: 'take a bath' },
    ]),
    createContentItem('நான் வேலைக்கு போகிறேன்.', 'naan velaikku pogiren.', 'I am going to work.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'வேலைக்கு', native: 'to work' },
      { target: 'போகிறேன்', native: 'am going' },
    ]),
    createContentItem('வேலை', 'velai', 'Work / Job', 'word', 'உங்கள் வேலை என்ன?', 'What is your job?'),
    createContentItem('பள்ளி', 'palli', 'School', 'word', 'குழந்தைகள் பள்ளிக்கு போகிறார்கள்.', 'The children are going to school.'),
    createContentItem('படிக்கிறேன்', 'padikkiren', 'I am studying / reading', 'word', 'நான் புத்தகம் படிக்கிறேன்.', 'I am reading a book.'),
    createContentItem('தூங்குகிறேன்', 'thoongugiren', 'I am sleeping', 'word', 'நான் இரவில் தூங்குகிறேன்.', 'I sleep at night.'),
    createContentItem('மழை பெய்கிறது.', 'mazhai peygiradhu.', 'It is raining.', 'sentence', '', '', [
      { target: 'மழை', native: 'rain' },
      { target: 'பெய்கிறது', native: 'is falling' },
    ]),
    createContentItem('வெயில் அடிக்கிறது.', 'veyil adikkiRadhu.', 'It is sunny.', 'sentence', '', '', [
      { target: 'வெயில்', native: 'sun / heat' },
      { target: 'அடிக்கிறது', native: 'is striking' },
    ]),
    createContentItem('என்ன செய்கிறீர்கள்?', 'enna seygiReerkal?', 'What are you doing?', 'sentence', '', '', [
      { target: 'என்ன', native: 'what' },
      { target: 'செய்கிறீர்கள்', native: 'are you doing' },
    ]),
    createContentItem('நான் சாப்பிடுகிறேன்.', 'naan saappidugiren.', 'I am eating.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'சாப்பிடுகிறேன்', native: 'am eating' },
    ]),
    createContentItem('குழந்தை', 'kuzhundhai', 'Child', 'word', 'குழந்தை விளையாடுகிறது.', 'The child is playing.'),
    createContentItem('நண்பன்', 'nanban', 'Friend (male)', 'word', 'அவன் என் நண்பன்.', 'He is my friend.'),
    createContentItem('நண்பி', 'nanbi', 'Friend (female)', 'word', 'அவள் என் நண்பி.', 'She is my friend.'),
  ],
};

// ============================================================
// 3. FOOD & DINING
// ============================================================
const food = {
  title: 'Food & Dining',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'ta',
  content: [
    createContentItem('சோறு', 'soru', 'Rice (cooked)', 'word', 'எனக்கு சோறு வேண்டும்.', 'I want rice.'),
    createContentItem('சாம்பார்', 'saambaar', 'Sambar (lentil stew)', 'word', 'சாம்பார் மிகவும் சுவையாக இருக்கிறது.', 'The sambar is very tasty.'),
    createContentItem('இட்லி', 'idli', 'Idli (steamed rice cake)', 'word', 'காலை உணவுக்கு இட்லி சாப்பிட்டேன்.', 'I ate idli for breakfast.'),
    createContentItem('தோசை', 'dhosai', 'Dosa (crepe)', 'word', 'மசாலா தோசை கொடுங்கள்.', 'Give me a masala dosa.'),
    createContentItem('பருப்பு', 'paruppu', 'Lentils / Dal', 'word', 'பருப்பு சாதம் நல்லா இருக்கு.', 'Dal rice is good.'),
    createContentItem('காய்கறி', 'kaaykari', 'Vegetable', 'word', 'புதிய காய்கறி வாங்குங்கள்.', 'Buy fresh vegetables.'),
    createContentItem('பழம்', 'pazham', 'Fruit', 'word', 'மாம்பழம் என் விருப்பமான பழம்.', 'Mango is my favorite fruit.'),
    createContentItem('பால்', 'paal', 'Milk', 'word', 'ஒரு கிளாஸ் பால் கொடுங்கள்.', 'Give me a glass of milk.'),
    createContentItem('காப்பி', 'kaappi', 'Coffee', 'word', 'ஃபில்டர் காப்பி வேண்டும்.', 'I want filter coffee.'),
    createContentItem('தேநீர்', 'theneer', 'Tea', 'word', 'ஒரு கப் தேநீர் கொடுங்கள்.', 'Give me a cup of tea.'),
    createContentItem('உணவகம்', 'unavagam', 'Restaurant', 'word', 'நாம் உணவகத்திற்கு போவோம்.', 'Let\'s go to the restaurant.'),
    createContentItem('சுவையாக இருக்கிறது.', 'suvaiyaaga irukkiRadhu.', 'It is tasty.', 'sentence', '', '', [
      { target: 'சுவையாக', native: 'tasty' },
      { target: 'இருக்கிறது', native: 'it is' },
    ]),
    createContentItem('எனக்கு பசிக்கிறது.', 'enakku pasikkiRadhu.', 'I am hungry.', 'sentence', '', '', [
      { target: 'எனக்கு', native: 'to me' },
      { target: 'பசிக்கிறது', native: 'hungry (feeling)' },
    ]),
    createContentItem('எனக்கு தாகமாக இருக்கிறது.', 'enakku thaagamaaga irukkiRadhu.', 'I am thirsty.', 'sentence', '', '', [
      { target: 'எனக்கு', native: 'to me' },
      { target: 'தாகமாக', native: 'thirsty' },
      { target: 'இருக்கிறது', native: 'it is' },
    ]),
    createContentItem('மெனு காட்டுங்கள்.', 'menu kaattungal.', 'Please show the menu.', 'sentence', '', '', [
      { target: 'மெனு', native: 'menu' },
      { target: 'காட்டுங்கள்', native: 'please show' },
    ]),
    createContentItem('கணக்கு கொடுங்கள்.', 'kanakku kodungal.', 'Please give the bill.', 'sentence', '', '', [
      { target: 'கணக்கு', native: 'bill / account' },
      { target: 'கொடுங்கள்', native: 'please give' },
    ]),
    createContentItem('காரம்', 'kaaram', 'Spicy', 'word', 'இது ரொம்ப காரமாக இருக்கிறது.', 'This is very spicy.'),
    createContentItem('இனிப்பு', 'inippu', 'Sweet', 'word', 'இந்த இனிப்பு நல்லா இருக்கு.', 'This sweet is good.'),
    createContentItem('புளிப்பு', 'pulippu', 'Sour', 'word', 'இது கொஞ்சம் புளிப்பாக இருக்கிறது.', 'This is a little sour.'),
    createContentItem('உப்பு', 'uppu', 'Salt', 'word', 'கொஞ்சம் உப்பு போடுங்கள்.', 'Add a little salt.'),
    createContentItem('நான் சைவம் சாப்பிடுவேன்.', 'naan saivam saappiduven.', 'I eat vegetarian food.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'சைவம்', native: 'vegetarian' },
      { target: 'சாப்பிடுவேன்', native: 'will eat' },
    ]),
    createContentItem('இன்னும் கொஞ்சம் வேண்டும்.', 'innum konjam vendum.', 'I want a little more.', 'sentence', '', '', [
      { target: 'இன்னும்', native: 'more' },
      { target: 'கொஞ்சம்', native: 'a little' },
      { target: 'வேண்டும்', native: 'want / need' },
    ]),
    createContentItem('போதும்', 'podhum', 'Enough', 'word', 'போதும், நன்றி.', 'Enough, thank you.'),
    createContentItem('தயிர்', 'thayir', 'Yogurt / Curd', 'word', 'தயிர் சாதம் கொடுங்கள்.', 'Give me curd rice.'),
    createContentItem('மீன்', 'meen', 'Fish', 'word', 'மீன் குழம்பு சுவையாக இருக்கிறது.', 'Fish curry is tasty.'),
  ],
};

// ============================================================
// 4. TRAVEL & TRANSPORTATION
// ============================================================
const travel = {
  title: 'Travel & Transportation',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'ta',
  content: [
    createContentItem('பேருந்து', 'perundhu', 'Bus', 'word', 'பேருந்து நிலையம் எங்கே?', 'Where is the bus station?'),
    createContentItem('ரயில்', 'rayil', 'Train', 'word', 'ரயில் எப்போது வரும்?', 'When will the train come?'),
    createContentItem('விமானம்', 'vimaanam', 'Airplane', 'word', 'விமானம் மூன்று மணிக்கு புறப்படும்.', 'The airplane departs at three o\'clock.'),
    createContentItem('ஆட்டோ', 'aatto', 'Auto-rickshaw', 'word', 'ஆட்டோவில் போகலாமா?', 'Shall we go by auto?'),
    createContentItem('டாக்சி', 'daaksi', 'Taxi', 'word', 'ஒரு டாக்சி கூப்பிடுங்கள்.', 'Call a taxi.'),
    createContentItem('சாலை', 'saalai', 'Road / Street', 'word', 'இந்த சாலை எங்கே போகிறது?', 'Where does this road go?'),
    createContentItem('வலது', 'valadhu', 'Right', 'word', 'வலது பக்கம் திரும்புங்கள்.', 'Turn right.'),
    createContentItem('இடது', 'idadhu', 'Left', 'word', 'இடது பக்கம் போங்கள்.', 'Go to the left.'),
    createContentItem('நேராக', 'neraaga', 'Straight', 'word', 'நேராக போங்கள்.', 'Go straight.'),
    createContentItem('இது எங்கே இருக்கிறது?', 'idhu engey irukkiRadhu?', 'Where is this?', 'sentence', '', '', [
      { target: 'இது', native: 'this' },
      { target: 'எங்கே', native: 'where' },
      { target: 'இருக்கிறது', native: 'is' },
    ]),
    createContentItem('எவ்வளவு தூரம்?', 'evvalavu dhoorum?', 'How far is it?', 'sentence', '', '', [
      { target: 'எவ்வளவு', native: 'how much' },
      { target: 'தூரம்', native: 'distance' },
    ]),
    createContentItem('நான் சென்னைக்கு போக வேண்டும்.', 'naan chennaiku poga vendum.', 'I need to go to Chennai.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'சென்னைக்கு', native: 'to Chennai' },
      { target: 'போக வேண்டும்', native: 'need to go' },
    ]),
    createContentItem('டிக்கெட் வேண்டும்.', 'tikket vendum.', 'I need a ticket.', 'sentence', '', '', [
      { target: 'டிக்கெட்', native: 'ticket' },
      { target: 'வேண்டும்', native: 'need' },
    ]),
    createContentItem('ஓட்டல்', 'oattal', 'Hotel', 'word', 'அருகில் ஓட்டல் இருக்கிறதா?', 'Is there a hotel nearby?'),
    createContentItem('அருகில்', 'arugil', 'Nearby', 'word', 'அருகில் என்ன இருக்கிறது?', 'What is nearby?'),
    createContentItem('தொலைவில்', 'tholaivil', 'Far away', 'word', 'அது ரொம்ப தொலைவில் இருக்கிறது.', 'That is very far away.'),
    createContentItem('நிலையம்', 'nilaiyam', 'Station', 'word', 'ரயில் நிலையம் எங்கே?', 'Where is the railway station?'),
    createContentItem('விமான நிலையம்', 'vimaana nilaiyam', 'Airport', 'word', 'விமான நிலையத்திற்கு எப்படி போவது?', 'How to go to the airport?'),
    createContentItem('வரைபடம்', 'varaipadam', 'Map', 'word', 'வரைபடம் இருக்கிறதா?', 'Do you have a map?'),
    createContentItem('பயணம்', 'payanam', 'Journey / Travel', 'word', 'பயணம் நன்றாக இருந்தது.', 'The journey was good.'),
    createContentItem('இங்கே நிறுத்துங்கள்.', 'ingey niRuththungal.', 'Stop here.', 'sentence', '', '', [
      { target: 'இங்கே', native: 'here' },
      { target: 'நிறுத்துங்கள்', native: 'stop (polite)' },
    ]),
    createContentItem('எவ்வளவு ஆகும்?', 'evvalavu aagum?', 'How much will it cost?', 'sentence', '', '', [
      { target: 'எவ்வளவு', native: 'how much' },
      { target: 'ஆகும்', native: 'will it be' },
    ]),
    createContentItem('நான் வழி தெரியாமல் இருக்கிறேன்.', 'naan vazhi theriyaamal irukkiren.', 'I am lost.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'வழி', native: 'way / path' },
      { target: 'தெரியாமல்', native: 'without knowing' },
      { target: 'இருக்கிறேன்', native: 'am' },
    ]),
    createContentItem('சாமான்', 'saamaan', 'Luggage / Baggage', 'word', 'என் சாமான் எங்கே?', 'Where is my luggage?'),
  ],
};

// ============================================================
// 5. SHOPPING
// ============================================================
const shopping = {
  title: 'Shopping & Markets',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'ta',
  content: [
    createContentItem('கடை', 'kadai', 'Shop / Store', 'word', 'அந்த கடையில் நிறைய பொருள்கள் இருக்கின்றன.', 'That shop has many items.'),
    createContentItem('சந்தை', 'sandhai', 'Market', 'word', 'நாம் சந்தைக்கு போவோம்.', 'Let\'s go to the market.'),
    createContentItem('விலை', 'vilai', 'Price', 'word', 'இதன் விலை என்ன?', 'What is the price of this?'),
    createContentItem('பணம்', 'panam', 'Money', 'word', 'என்னிடம் பணம் இல்லை.', 'I don\'t have money.'),
    createContentItem('ரூபாய்', 'ruubaai', 'Rupee', 'word', 'இது நூறு ரூபாய்.', 'This is one hundred rupees.'),
    createContentItem('மலிவு', 'malivu', 'Cheap / Affordable', 'word', 'இது மிகவும் மலிவாக இருக்கிறது.', 'This is very cheap.'),
    createContentItem('விலை உயர்ந்தது', 'vilai uyarndhadhu', 'Expensive', 'word', 'இது ரொம்ப விலை உயர்ந்தது.', 'This is very expensive.'),
    createContentItem('இது எவ்வளவு?', 'idhu evvalavu?', 'How much is this?', 'sentence', '', '', [
      { target: 'இது', native: 'this' },
      { target: 'எவ்வளவு', native: 'how much' },
    ]),
    createContentItem('கொஞ்சம் குறைக்கலாமா?', 'konjam kuraikkalaama?', 'Can you reduce the price a little?', 'sentence', '', '', [
      { target: 'கொஞ்சம்', native: 'a little' },
      { target: 'குறைக்கலாமா', native: 'can you reduce' },
    ]),
    createContentItem('நான் இதை வாங்குகிறேன்.', 'naan idhai vaangugiren.', 'I will buy this.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'இதை', native: 'this (accusative)' },
      { target: 'வாங்குகிறேன்', native: 'am buying' },
    ]),
    createContentItem('துணி', 'thuni', 'Cloth / Clothing', 'word', 'புதிய துணி வாங்க வேண்டும்.', 'I need to buy new clothes.'),
    createContentItem('சட்டை', 'sattai', 'Shirt', 'word', 'இந்த சட்டை நல்லா இருக்கு.', 'This shirt looks good.'),
    createContentItem('புடவை', 'pudavai', 'Saree', 'word', 'பட்டுப் புடவை காட்டுங்கள்.', 'Show me a silk saree.'),
    createContentItem('செருப்பு', 'seruppu', 'Footwear / Sandal', 'word', 'புதிய செருப்பு வேண்டும்.', 'I need new footwear.'),
    createContentItem('பொருள்', 'porul', 'Item / Thing', 'word', 'இந்த பொருள் நல்லதா?', 'Is this item good?'),
    createContentItem('பை', 'pai', 'Bag', 'word', 'ஒரு பை கொடுங்கள்.', 'Give me a bag.'),
    createContentItem('வேண்டாம்', 'vendaam', 'Don\'t want / No need', 'word', 'வேண்டாம், நன்றி.', 'No need, thank you.'),
    createContentItem('வேறு ஏதாவது இருக்கிறதா?', 'veru edhaavadhu irukkiRadhaa?', 'Is there anything else?', 'sentence', '', '', [
      { target: 'வேறு', native: 'other' },
      { target: 'ஏதாவது', native: 'anything' },
      { target: 'இருக்கிறதா', native: 'is there' },
    ]),
    createContentItem('இது எனக்கு பிடித்திருக்கிறது.', 'idhu enakku pidiththirukkiRadhu.', 'I like this.', 'sentence', '', '', [
      { target: 'இது', native: 'this' },
      { target: 'எனக்கு', native: 'to me' },
      { target: 'பிடித்திருக்கிறது', native: 'like / pleasing' },
    ]),
    createContentItem('பேரம் பேசலாமா?', 'peram pesalaama?', 'Can I bargain?', 'sentence', '', '', [
      { target: 'பேரம்', native: 'bargaining' },
      { target: 'பேசலாமா', native: 'can we talk / negotiate' },
    ]),
    createContentItem('ரசீது கொடுங்கள்.', 'raseedhu kodungal.', 'Please give me the receipt.', 'sentence', '', '', [
      { target: 'ரசீது', native: 'receipt' },
      { target: 'கொடுங்கள்', native: 'please give' },
    ]),
    createContentItem('அளவு', 'alavu', 'Size', 'word', 'பெரிய அளவு இருக்கிறதா?', 'Do you have a bigger size?'),
    createContentItem('நிறம்', 'niRam', 'Color', 'word', 'வேறு நிறம் இருக்கிறதா?', 'Do you have another color?'),
    createContentItem('சிவப்பு', 'sivappu', 'Red', 'word', 'சிவப்பு நிறம் காட்டுங்கள்.', 'Show me the red color.'),
    createContentItem('நீலம்', 'neelam', 'Blue', 'word', 'நீல நிறம் நல்லா இருக்கு.', 'Blue color looks good.'),
  ],
};

// ============================================================
// 6. BUSINESS & WORK
// ============================================================
const business = {
  title: 'Business & Work',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'ta',
  content: [
    createContentItem('அலுவலகம்', 'aluvalagam', 'Office', 'word', 'நான் அலுவலகத்தில் வேலை செய்கிறேன்.', 'I work in an office.'),
    createContentItem('கூட்டம்', 'koottam', 'Meeting', 'word', 'நாளை கூட்டம் இருக்கிறது.', 'There is a meeting tomorrow.'),
    createContentItem('மேலாளர்', 'melaalar', 'Manager', 'word', 'மேலாளரிடம் பேசுங்கள்.', 'Speak to the manager.'),
    createContentItem('ஊழியர்', 'oozhiyar', 'Employee', 'word', 'புதிய ஊழியர் வந்திருக்கிறார்.', 'The new employee has come.'),
    createContentItem('சம்பளம்', 'sambalam', 'Salary', 'word', 'சம்பளம் இன்று வரும்.', 'The salary will come today.'),
    createContentItem('தொலைபேசி', 'tholaipesi', 'Telephone', 'word', 'தொலைபேசியில் பேசுங்கள்.', 'Speak on the telephone.'),
    createContentItem('மின்னஞ்சல்', 'minnanjal', 'Email', 'word', 'மின்னஞ்சல் அனுப்பினேன்.', 'I sent an email.'),
    createContentItem('கணினி', 'kanini', 'Computer', 'word', 'கணினியில் வேலை செய்கிறேன்.', 'I am working on the computer.'),
    createContentItem('திட்டம்', 'thittam', 'Plan / Project', 'word', 'இந்த திட்டம் முக்கியமானது.', 'This project is important.'),
    createContentItem('வேலை நேரம்', 'velai neram', 'Working hours', 'word', 'வேலை நேரம் என்ன?', 'What are the working hours?'),
    createContentItem('நான் ஒரு பொறியாளர்.', 'naan oru poriyaalar.', 'I am an engineer.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'ஒரு', native: 'a / an' },
      { target: 'பொறியாளர்', native: 'engineer' },
    ]),
    createContentItem('உங்கள் தொழில் என்ன?', 'ungal thozhil enna?', 'What is your profession?', 'sentence', '', '', [
      { target: 'உங்கள்', native: 'your' },
      { target: 'தொழில்', native: 'profession' },
      { target: 'என்ன', native: 'what' },
    ]),
    createContentItem('ஒப்பந்தம்', 'oppandham', 'Contract / Agreement', 'word', 'ஒப்பந்தத்தில் கையெழுத்து போடுங்கள்.', 'Sign the contract.'),
    createContentItem('நேர்காணல்', 'nerkaanal', 'Interview', 'word', 'நாளை நேர்காணல் இருக்கிறது.', 'There is an interview tomorrow.'),
    createContentItem('அனுபவம்', 'anubavam', 'Experience', 'word', 'உங்களுக்கு எவ்வளவு அனுபவம் இருக்கிறது?', 'How much experience do you have?'),
    createContentItem('நான் இந்த நிறுவனத்தில் வேலை செய்கிறேன்.', 'naan indha niRuvanathil velai seygiren.', 'I work at this company.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'இந்த', native: 'this' },
      { target: 'நிறுவனத்தில்', native: 'at the company' },
      { target: 'வேலை செய்கிறேன்', native: 'am working' },
    ]),
    createContentItem('நிறுவனம்', 'niRuvanam', 'Company', 'word', 'இது ஒரு பெரிய நிறுவனம்.', 'This is a big company.'),
    createContentItem('வியாபாரம்', 'viyaabaaram', 'Business / Trade', 'word', 'வியாபாரம் நன்றாக போகிறது.', 'Business is going well.'),
    createContentItem('கூட்டத்தில் கலந்துகொள்ளுங்கள்.', 'koottathil kalandhukollungal.', 'Please attend the meeting.', 'sentence', '', '', [
      { target: 'கூட்டத்தில்', native: 'in the meeting' },
      { target: 'கலந்துகொள்ளுங்கள்', native: 'please attend' },
    ]),
    createContentItem('அறிக்கை', 'arikkai', 'Report', 'word', 'அறிக்கையை சமர்ப்பியுங்கள்.', 'Submit the report.'),
    createContentItem('விடுமுறை', 'vidumurai', 'Holiday / Leave', 'word', 'நாளை விடுமுறை எடுக்கிறேன்.', 'I am taking leave tomorrow.'),
    createContentItem('பயிற்சி', 'payiRchi', 'Training', 'word', 'புதிய பயிற்சி நாளை தொடங்கும்.', 'New training starts tomorrow.'),
    createContentItem('ஆவணம்', 'aavanam', 'Document', 'word', 'ஆவணங்களை கொண்டு வாருங்கள்.', 'Bring the documents.'),
    createContentItem('குழு', 'kuzhu', 'Team / Group', 'word', 'நமது குழு மிகவும் நன்றாக வேலை செய்கிறது.', 'Our team works very well.'),
  ],
};

// ============================================================
// 7. HEALTHCARE
// ============================================================
const healthcare = {
  title: 'Healthcare & Medical',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'ta',
  content: [
    createContentItem('மருத்துவர்', 'maruththuvar', 'Doctor', 'word', 'மருத்துவரை பாருங்கள்.', 'See the doctor.'),
    createContentItem('மருத்துவமனை', 'maruththuvamanai', 'Hospital', 'word', 'மருத்துவமனை எங்கே இருக்கிறது?', 'Where is the hospital?'),
    createContentItem('மருந்து', 'marundhu', 'Medicine', 'word', 'மருந்து சாப்பிடுங்கள்.', 'Take the medicine.'),
    createContentItem('மருந்தகம்', 'marundhagam', 'Pharmacy', 'word', 'அருகில் மருந்தகம் இருக்கிறதா?', 'Is there a pharmacy nearby?'),
    createContentItem('உடம்பு', 'udambu', 'Body', 'word', 'உடம்பு சரியில்லை.', 'I am not feeling well.'),
    createContentItem('தலைவலி', 'thalaivali', 'Headache', 'word', 'எனக்கு தலைவலி இருக்கிறது.', 'I have a headache.'),
    createContentItem('காய்ச்சல்', 'kaaichsal', 'Fever', 'word', 'எனக்கு காய்ச்சல் இருக்கிறது.', 'I have a fever.'),
    createContentItem('இருமல்', 'irumal', 'Cough', 'word', 'எனக்கு இருமல் இருக்கிறது.', 'I have a cough.'),
    createContentItem('சளி', 'sali', 'Cold (illness)', 'word', 'எனக்கு சளி பிடித்திருக்கிறது.', 'I have caught a cold.'),
    createContentItem('வயிற்று வலி', 'vayiRRu vali', 'Stomach ache', 'word', 'எனக்கு வயிற்று வலி இருக்கிறது.', 'I have a stomach ache.'),
    createContentItem('எனக்கு உடம்பு சரியில்லை.', 'enakku udambu sariyillai.', 'I am not feeling well.', 'sentence', '', '', [
      { target: 'எனக்கு', native: 'to me' },
      { target: 'உடம்பு', native: 'body / health' },
      { target: 'சரியில்லை', native: 'not right / not well' },
    ]),
    createContentItem('மருத்துவரை பார்க்க வேண்டும்.', 'maruththuvarai paarkka vendum.', 'I need to see a doctor.', 'sentence', '', '', [
      { target: 'மருத்துவரை', native: 'doctor (accusative)' },
      { target: 'பார்க்க', native: 'to see' },
      { target: 'வேண்டும்', native: 'need' },
    ]),
    createContentItem('அலர்ஜி', 'alarji', 'Allergy', 'word', 'எனக்கு அலர்ஜி இருக்கிறது.', 'I have an allergy.'),
    createContentItem('வலி', 'vali', 'Pain', 'word', 'இங்கே வலிக்கிறது.', 'It hurts here.'),
    createContentItem('காயம்', 'kaayam', 'Injury / Wound', 'word', 'சிறிய காயம் ஏற்பட்டிருக்கிறது.', 'There is a minor injury.'),
    createContentItem('இரத்தம்', 'raththam', 'Blood', 'word', 'இரத்த பரிசோதனை செய்ய வேண்டும்.', 'Need to do a blood test.'),
    createContentItem('பரிசோதனை', 'parisodhanai', 'Test / Examination', 'word', 'மருத்துவ பரிசோதனை செய்யுங்கள்.', 'Do a medical examination.'),
    createContentItem('மாத்திரை', 'maaththirai', 'Tablet / Pill', 'word', 'இந்த மாத்திரையை தினமும் சாப்பிடுங்கள்.', 'Take this tablet daily.'),
    createContentItem('ஊசி', 'oosi', 'Injection / Needle', 'word', 'ஊசி போட வேண்டும்.', 'Need to give an injection.'),
    createContentItem('அவசர சிகிச்சை', 'avasara sigichsai', 'Emergency treatment', 'word', 'அவசர சிகிச்சை பிரிவு எங்கே?', 'Where is the emergency department?'),
    createContentItem('நான் நீரிழிவு நோயாளி.', 'naan neerizhibu noyaali.', 'I am a diabetes patient.', 'sentence', '', '', [
      { target: 'நான்', native: 'I' },
      { target: 'நீரிழிவு', native: 'diabetes' },
      { target: 'நோயாளி', native: 'patient' },
    ]),
    createContentItem('எனக்கு இந்த மருந்துக்கு அலர்ஜி.', 'enakku indha marundhukku alarji.', 'I am allergic to this medicine.', 'sentence', '', '', [
      { target: 'எனக்கு', native: 'to me' },
      { target: 'இந்த', native: 'this' },
      { target: 'மருந்துக்கு', native: 'to the medicine' },
      { target: 'அலர்ஜி', native: 'allergy' },
    ]),
    createContentItem('காப்பீடு', 'kaappeedu', 'Insurance', 'word', 'மருத்துவ காப்பீடு இருக்கிறதா?', 'Do you have medical insurance?'),
    createContentItem('பல் வலி', 'pal vali', 'Toothache', 'word', 'எனக்கு பல் வலி இருக்கிறது.', 'I have a toothache.'),
    createContentItem('கண்', 'kan', 'Eye', 'word', 'கண் மருத்துவரை பாருங்கள்.', 'See the eye doctor.'),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
