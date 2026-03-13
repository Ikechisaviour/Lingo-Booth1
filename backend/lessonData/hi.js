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
// GREETINGS & INTRODUCTIONS
// ============================================================
const greetings = {
  title: 'Basic Greetings & Introductions',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'hi',
  content: [
    createContentItem('नमस्ते', 'namaste', 'Hello', 'word', 'नमस्ते, आप कैसे हैं?', 'Hello, how are you?'),
    createContentItem('नमस्कार', 'namaskaar', 'Greetings (formal)', 'word', 'नमस्कार, मैं आपसे मिलकर खुश हूँ।', 'Greetings, I am happy to meet you.'),
    createContentItem('अलविदा', 'alvida', 'Goodbye', 'word', 'अलविदा, फिर मिलेंगे!', 'Goodbye, we will meet again!'),
    createContentItem('शुभ प्रभात', 'shubh prabhaat', 'Good morning', 'word', 'शुभ प्रभात, आज मौसम अच्छा है।', 'Good morning, the weather is nice today.'),
    createContentItem('शुभ रात्रि', 'shubh raatri', 'Good night', 'word', 'शुभ रात्रि, अच्छी नींद आए।', 'Good night, sleep well.'),
    createContentItem('धन्यवाद', 'dhanyavaad', 'Thank you', 'word', 'आपकी मदद के लिए धन्यवाद।', 'Thank you for your help.'),
    createContentItem('शुक्रिया', 'shukriya', 'Thanks', 'word', 'बहुत बहुत शुक्रिया।', 'Thank you very much.'),
    createContentItem('माफ़ कीजिए', 'maaf keejiye', 'Excuse me / Sorry (formal)', 'word', 'माफ़ कीजिए, क्या आप मेरी मदद कर सकते हैं?', 'Excuse me, can you help me?'),
    createContentItem('हाँ', 'haan', 'Yes', 'word', 'हाँ, मैं समझ गया।', 'Yes, I understood.'),
    createContentItem('नहीं', 'nahin', 'No', 'word', 'नहीं, मुझे नहीं चाहिए।', 'No, I do not need it.'),
    createContentItem('कृपया', 'kripaya', 'Please', 'word', 'कृपया यहाँ बैठिए।', 'Please sit here.'),
    createContentItem('आप कैसे हैं?', 'aap kaise hain?', 'How are you? (formal)', 'sentence', 'आप कैसे हैं? सब ठीक है?', 'How are you? Is everything alright?', [
      { target: 'आप', native: 'you (formal)' },
      { target: 'कैसे', native: 'how' },
      { target: 'हैं', native: 'are' },
    ]),
    createContentItem('मैं ठीक हूँ।', 'main theek hoon.', 'I am fine.', 'sentence', 'मैं ठीक हूँ, धन्यवाद।', 'I am fine, thank you.', [
      { target: 'मैं', native: 'I' },
      { target: 'ठीक', native: 'fine' },
      { target: 'हूँ', native: 'am' },
    ]),
    createContentItem('आपका नाम क्या है?', 'aapka naam kya hai?', 'What is your name?', 'sentence', 'आपका नाम क्या है? मेरा नाम राहुल है।', 'What is your name? My name is Rahul.', [
      { target: 'आपका', native: 'your' },
      { target: 'नाम', native: 'name' },
      { target: 'क्या', native: 'what' },
      { target: 'है', native: 'is' },
    ]),
    createContentItem('मेरा नाम ... है।', 'mera naam ... hai.', 'My name is ...', 'sentence', 'मेरा नाम अमित है।', 'My name is Amit.', [
      { target: 'मेरा', native: 'my' },
      { target: 'नाम', native: 'name' },
      { target: 'है', native: 'is' },
    ]),
    createContentItem('आपसे मिलकर खुशी हुई।', 'aapse milkar khushi hui.', 'Nice to meet you.', 'sentence', 'आपसे मिलकर बहुत खुशी हुई।', 'Very nice to meet you.', [
      { target: 'आपसे', native: 'with you' },
      { target: 'मिलकर', native: 'meeting' },
      { target: 'खुशी', native: 'happiness' },
      { target: 'हुई', native: 'happened' },
    ]),
    createContentItem('फिर मिलेंगे', 'phir milenge', 'See you again', 'word', 'ठीक है, फिर मिलेंगे!', 'Okay, see you again!'),
    createContentItem('स्वागत है', 'svaagat hai', 'Welcome', 'word', 'हमारे घर में आपका स्वागत है।', 'Welcome to our home.'),
    createContentItem('क्या हाल है?', 'kya haal hai?', 'How are things?', 'sentence', 'क्या हाल है? बहुत दिन हो गए!', 'How are things? It has been a long time!', [
      { target: 'क्या', native: 'what' },
      { target: 'हाल', native: 'condition' },
      { target: 'है', native: 'is' },
    ]),
    createContentItem('मैं भारत से हूँ।', 'main bhaarat se hoon.', 'I am from India.', 'sentence', 'मैं भारत से हूँ, और आप?', 'I am from India, and you?', [
      { target: 'मैं', native: 'I' },
      { target: 'भारत', native: 'India' },
      { target: 'से', native: 'from' },
      { target: 'हूँ', native: 'am' },
    ]),
    createContentItem('क्या आप हिंदी बोलते हैं?', 'kya aap hindi bolte hain?', 'Do you speak Hindi?', 'sentence', 'क्या आप हिंदी बोलते हैं? मुझे थोड़ी हिंदी आती है।', 'Do you speak Hindi? I know a little Hindi.', [
      { target: 'क्या', native: 'do (question marker)' },
      { target: 'आप', native: 'you' },
      { target: 'हिंदी', native: 'Hindi' },
      { target: 'बोलते', native: 'speak' },
      { target: 'हैं', native: 'are' },
    ]),
    createContentItem('मुझे हिंदी नहीं आती।', 'mujhe hindi nahin aati.', 'I do not know Hindi.', 'sentence', 'माफ़ कीजिए, मुझे हिंदी नहीं आती।', 'Sorry, I do not know Hindi.', [
      { target: 'मुझे', native: 'to me' },
      { target: 'हिंदी', native: 'Hindi' },
      { target: 'नहीं', native: 'not' },
      { target: 'आती', native: 'comes (know)' },
    ]),
    createContentItem('कैसा चल रहा है?', 'kaisa chal raha hai?', 'How is it going?', 'sentence', 'सब कैसा चल रहा है?', 'How is everything going?', [
      { target: 'कैसा', native: 'how' },
      { target: 'चल रहा है', native: 'is going' },
    ]),
    createContentItem('ठीक है', 'theek hai', 'It is okay / Alright', 'word', 'ठीक है, कोई बात नहीं।', 'It is okay, no problem.'),
    createContentItem('भाई', 'bhai', 'Brother', 'word', 'यह मेरा भाई है।', 'This is my brother.'),
    createContentItem('बहन', 'bahan', 'Sister', 'word', 'मेरी बहन दिल्ली में रहती है।', 'My sister lives in Delhi.'),
  ],
};

// ============================================================
// DAILY LIFE
// ============================================================
const dailyLife = {
  title: 'Daily Life & Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'hi',
  content: [
    createContentItem('घर', 'ghar', 'Home / House', 'word', 'मेरा घर यहाँ से दूर है।', 'My home is far from here.'),
    createContentItem('पानी', 'paani', 'Water', 'word', 'मुझे एक गिलास पानी चाहिए।', 'I need a glass of water.'),
    createContentItem('खाना', 'khaana', 'Food / To eat', 'word', 'खाना तैयार है।', 'The food is ready.'),
    createContentItem('सोना', 'sona', 'To sleep', 'word', 'मुझे जल्दी सोना है।', 'I have to sleep early.'),
    createContentItem('काम', 'kaam', 'Work', 'word', 'मुझे काम पर जाना है।', 'I have to go to work.'),
    createContentItem('समय', 'samay', 'Time', 'word', 'अभी क्या समय हुआ है?', 'What time is it now?'),
    createContentItem('आज', 'aaj', 'Today', 'word', 'आज मौसम बहुत अच्छा है।', 'The weather is very nice today.'),
    createContentItem('कल', 'kal', 'Yesterday / Tomorrow', 'word', 'कल हम बाज़ार जाएँगे।', 'Tomorrow we will go to the market.'),
    createContentItem('सुबह', 'subah', 'Morning', 'word', 'मैं सुबह जल्दी उठता हूँ।', 'I wake up early in the morning.'),
    createContentItem('रात', 'raat', 'Night', 'word', 'रात को तारे बहुत सुंदर हैं।', 'The stars are very beautiful at night.'),
    createContentItem('दोस्त', 'dost', 'Friend', 'word', 'वह मेरा सबसे अच्छा दोस्त है।', 'He is my best friend.'),
    createContentItem('परिवार', 'parivaar', 'Family', 'word', 'मेरा परिवार बहुत बड़ा है।', 'My family is very big.'),
    createContentItem('स्कूल', 'school', 'School', 'word', 'बच्चे स्कूल जा रहे हैं।', 'The children are going to school.'),
    createContentItem('किताब', 'kitaab', 'Book', 'word', 'यह किताब बहुत अच्छी है।', 'This book is very good.'),
    createContentItem('फ़ोन', 'phone', 'Phone', 'word', 'मेरा फ़ोन कहाँ है?', 'Where is my phone?'),
    createContentItem('मैं रोज़ सुबह दौड़ता हूँ।', 'main roz subah daudta hoon.', 'I run every morning.', 'sentence', 'मैं रोज़ सुबह पार्क में दौड़ता हूँ।', 'I run in the park every morning.', [
      { target: 'मैं', native: 'I' },
      { target: 'रोज़', native: 'every day' },
      { target: 'सुबह', native: 'morning' },
      { target: 'दौड़ता', native: 'run' },
      { target: 'हूँ', native: 'am' },
    ]),
    createContentItem('आज मौसम अच्छा है।', 'aaj mausam achcha hai.', 'The weather is nice today.', 'sentence', 'आज मौसम बहुत अच्छा है, चलो बाहर चलते हैं।', 'The weather is very nice today, let us go outside.', [
      { target: 'आज', native: 'today' },
      { target: 'मौसम', native: 'weather' },
      { target: 'अच्छा', native: 'good/nice' },
      { target: 'है', native: 'is' },
    ]),
    createContentItem('मुझे नींद आ रही है।', 'mujhe neend aa rahi hai.', 'I am feeling sleepy.', 'sentence', 'बहुत रात हो गई, मुझे नींद आ रही है।', 'It is very late, I am feeling sleepy.', [
      { target: 'मुझे', native: 'to me' },
      { target: 'नींद', native: 'sleep' },
      { target: 'आ रही है', native: 'is coming' },
    ]),
    createContentItem('क्या समय हुआ है?', 'kya samay hua hai?', 'What time is it?', 'sentence', 'भाई, क्या समय हुआ है?', 'Brother, what time is it?', [
      { target: 'क्या', native: 'what' },
      { target: 'समय', native: 'time' },
      { target: 'हुआ है', native: 'has become' },
    ]),
    createContentItem('मैं घर जा रहा हूँ।', 'main ghar ja raha hoon.', 'I am going home.', 'sentence', 'काम ख़त्म हो गया, मैं घर जा रहा हूँ।', 'Work is finished, I am going home.', [
      { target: 'मैं', native: 'I' },
      { target: 'घर', native: 'home' },
      { target: 'जा रहा हूँ', native: 'am going' },
    ]),
    createContentItem('बच्चे', 'bachche', 'Children', 'word', 'बच्चे बाहर खेल रहे हैं।', 'The children are playing outside.'),
    createContentItem('कपड़े', 'kapde', 'Clothes', 'word', 'मुझे नए कपड़े ख़रीदने हैं।', 'I need to buy new clothes.'),
    createContentItem('बस', 'bas', 'Bus / Enough', 'word', 'बस आ गई, चलो चलते हैं।', 'The bus has arrived, let us go.'),
    createContentItem('गाड़ी', 'gaadi', 'Car / Vehicle', 'word', 'गाड़ी में पेट्रोल कम है।', 'The car is low on petrol.'),
    createContentItem('बारिश', 'baarish', 'Rain', 'word', 'बाहर बारिश हो रही है।', 'It is raining outside.'),
  ],
};

// ============================================================
// FOOD & DINING
// ============================================================
const food = {
  title: 'Food & Dining',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'hi',
  content: [
    createContentItem('रोटी', 'roti', 'Bread (flatbread)', 'word', 'मुझे दो रोटी और चाहिए।', 'I need two more rotis.'),
    createContentItem('चावल', 'chaaval', 'Rice', 'word', 'मुझे चावल और दाल दीजिए।', 'Please give me rice and lentils.'),
    createContentItem('दाल', 'daal', 'Lentils', 'word', 'आज दाल बहुत स्वादिष्ट है।', 'The lentils are very tasty today.'),
    createContentItem('सब्ज़ी', 'sabzi', 'Vegetable / Vegetable dish', 'word', 'यह सब्ज़ी बहुत अच्छी बनी है।', 'This vegetable dish turned out very well.'),
    createContentItem('चाय', 'chaay', 'Tea', 'word', 'क्या आप चाय पिएँगे?', 'Will you have tea?'),
    createContentItem('दूध', 'doodh', 'Milk', 'word', 'बच्चों को रोज़ दूध पीना चाहिए।', 'Children should drink milk every day.'),
    createContentItem('चीनी', 'cheeni', 'Sugar', 'word', 'चाय में चीनी कम डालिए।', 'Put less sugar in the tea.'),
    createContentItem('नमक', 'namak', 'Salt', 'word', 'खाने में नमक कम है।', 'The food has less salt.'),
    createContentItem('मिर्च', 'mirch', 'Chili pepper', 'word', 'यह बहुत तीखी मिर्च है।', 'This is a very spicy chili.'),
    createContentItem('फल', 'phal', 'Fruit', 'word', 'ताज़े फल सेहत के लिए अच्छे हैं।', 'Fresh fruits are good for health.'),
    createContentItem('आम', 'aam', 'Mango', 'word', 'गर्मियों में आम बहुत मीठे होते हैं।', 'Mangoes are very sweet in summer.'),
    createContentItem('पानी', 'paani', 'Water', 'word', 'एक बोतल पानी दीजिए।', 'Please give me a bottle of water.'),
    createContentItem('स्वादिष्ट', 'svaadisht', 'Delicious', 'word', 'खाना बहुत स्वादिष्ट था।', 'The food was very delicious.'),
    createContentItem('भूख', 'bhookh', 'Hunger', 'word', 'मुझे बहुत भूख लगी है।', 'I am very hungry.'),
    createContentItem('प्यास', 'pyaas', 'Thirst', 'word', 'मुझे प्यास लगी है।', 'I am thirsty.'),
    createContentItem('मुझे भूख लगी है।', 'mujhe bhookh lagi hai.', 'I am hungry.', 'sentence', 'मुझे बहुत भूख लगी है, कुछ खाने को दो।', 'I am very hungry, give me something to eat.', [
      { target: 'मुझे', native: 'to me' },
      { target: 'भूख', native: 'hunger' },
      { target: 'लगी है', native: 'has struck' },
    ]),
    createContentItem('खाना बहुत अच्छा है।', 'khaana bahut achcha hai.', 'The food is very good.', 'sentence', 'आपके हाथ का खाना बहुत अच्छा है।', 'The food made by you is very good.', [
      { target: 'खाना', native: 'food' },
      { target: 'बहुत', native: 'very' },
      { target: 'अच्छा', native: 'good' },
      { target: 'है', native: 'is' },
    ]),
    createContentItem('मेनू दिखाइए।', 'menu dikhaiye.', 'Please show me the menu.', 'sentence', 'भैया, मेनू दिखाइए।', 'Brother, please show me the menu.', [
      { target: 'मेनू', native: 'menu' },
      { target: 'दिखाइए', native: 'please show' },
    ]),
    createContentItem('बिल लाइए।', 'bill laiye.', 'Please bring the bill.', 'sentence', 'खाना हो गया, बिल लाइए।', 'We are done eating, please bring the bill.', [
      { target: 'बिल', native: 'bill' },
      { target: 'लाइए', native: 'please bring' },
    ]),
    createContentItem('यह शाकाहारी है?', 'yah shaakaahaari hai?', 'Is this vegetarian?', 'sentence', 'क्या यह शाकाहारी है? मैं माँस नहीं खाता।', 'Is this vegetarian? I do not eat meat.', [
      { target: 'यह', native: 'this' },
      { target: 'शाकाहारी', native: 'vegetarian' },
      { target: 'है', native: 'is' },
    ]),
    createContentItem('पनीर', 'paneer', 'Cottage cheese', 'word', 'मुझे पनीर टिक्का पसंद है।', 'I like paneer tikka.'),
    createContentItem('मसाला', 'masaala', 'Spice', 'word', 'इस खाने में बहुत मसाला है।', 'This food has a lot of spice.'),
    createContentItem('मिठाई', 'mithaai', 'Sweet / Dessert', 'word', 'त्योहार पर मिठाई बाँटी जाती है।', 'Sweets are distributed during festivals.'),
    createContentItem('नाश्ता', 'naashta', 'Breakfast / Snack', 'word', 'सुबह का नाश्ता ज़रूरी है।', 'Breakfast in the morning is important.'),
    createContentItem('तीखा', 'teekha', 'Spicy', 'word', 'मुझे तीखा खाना पसंद नहीं है।', 'I do not like spicy food.'),
  ],
};

// ============================================================
// TRAVEL & TRANSPORTATION
// ============================================================
const travel = {
  title: 'Travel & Transportation',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'hi',
  content: [
    createContentItem('हवाई अड्डा', 'havaai adda', 'Airport', 'word', 'हवाई अड्डा यहाँ से कितनी दूर है?', 'How far is the airport from here?'),
    createContentItem('रेलगाड़ी', 'relgaadi', 'Train', 'word', 'रेलगाड़ी कितने बजे आएगी?', 'What time will the train arrive?'),
    createContentItem('बस', 'bas', 'Bus', 'word', 'अगली बस कब आएगी?', 'When will the next bus come?'),
    createContentItem('टैक्सी', 'taiksi', 'Taxi', 'word', 'मुझे एक टैक्सी चाहिए।', 'I need a taxi.'),
    createContentItem('होटल', 'hotel', 'Hotel', 'word', 'यह होटल बहुत अच्छा है।', 'This hotel is very good.'),
    createContentItem('टिकट', 'tikat', 'Ticket', 'word', 'दो टिकट दिल्ली के लिए दीजिए।', 'Please give me two tickets to Delhi.'),
    createContentItem('सामान', 'saamaan', 'Luggage', 'word', 'मेरा सामान कहाँ है?', 'Where is my luggage?'),
    createContentItem('नक्शा', 'naksha', 'Map', 'word', 'क्या आपके पास शहर का नक्शा है?', 'Do you have a map of the city?'),
    createContentItem('सड़क', 'sadak', 'Road', 'word', 'यह सड़क कहाँ जाती है?', 'Where does this road go?'),
    createContentItem('दाएँ', 'daayen', 'Right (direction)', 'word', 'अगले मोड़ पर दाएँ मुड़िए।', 'Turn right at the next turn.'),
    createContentItem('बाएँ', 'baayen', 'Left (direction)', 'word', 'बाएँ मुड़ने के बाद सीधे जाइए।', 'Go straight after turning left.'),
    createContentItem('सीधे', 'seedhe', 'Straight', 'word', 'सीधे जाइए, फिर दाएँ मुड़िए।', 'Go straight, then turn right.'),
    createContentItem('दूर', 'door', 'Far', 'word', 'स्टेशन यहाँ से बहुत दूर नहीं है।', 'The station is not very far from here.'),
    createContentItem('पास', 'paas', 'Near / Close', 'word', 'बस स्टॉप मेरे घर के पास है।', 'The bus stop is near my house.'),
    createContentItem('पासपोर्ट', 'paasport', 'Passport', 'word', 'अपना पासपोर्ट दिखाइए।', 'Please show your passport.'),
    createContentItem('यह जगह कहाँ है?', 'yah jagah kahaan hai?', 'Where is this place?', 'sentence', 'माफ़ कीजिए, यह जगह कहाँ है?', 'Excuse me, where is this place?', [
      { target: 'यह', native: 'this' },
      { target: 'जगह', native: 'place' },
      { target: 'कहाँ', native: 'where' },
      { target: 'है', native: 'is' },
    ]),
    createContentItem('मुझे स्टेशन जाना है।', 'mujhe station jaana hai.', 'I need to go to the station.', 'sentence', 'मुझे रेलवे स्टेशन जाना है, रास्ता बताइए।', 'I need to go to the railway station, please show me the way.', [
      { target: 'मुझे', native: 'I need' },
      { target: 'स्टेशन', native: 'station' },
      { target: 'जाना है', native: 'to go' },
    ]),
    createContentItem('कितनी दूर है?', 'kitni door hai?', 'How far is it?', 'sentence', 'ताज महल यहाँ से कितनी दूर है?', 'How far is the Taj Mahal from here?', [
      { target: 'कितनी', native: 'how much' },
      { target: 'दूर', native: 'far' },
      { target: 'है', native: 'is' },
    ]),
    createContentItem('क्या आप मुझे वहाँ ले जा सकते हैं?', 'kya aap mujhe vahaan le ja sakte hain?', 'Can you take me there?', 'sentence', 'क्या आप मुझे होटल तक ले जा सकते हैं?', 'Can you take me to the hotel?', [
      { target: 'क्या', native: 'can (question)' },
      { target: 'आप', native: 'you' },
      { target: 'मुझे', native: 'me' },
      { target: 'वहाँ', native: 'there' },
      { target: 'ले जा सकते हैं', native: 'can take' },
    ]),
    createContentItem('मुझे एक कमरा चाहिए।', 'mujhe ek kamra chaahiye.', 'I need a room.', 'sentence', 'मुझे एक कमरा दो रातों के लिए चाहिए।', 'I need a room for two nights.', [
      { target: 'मुझे', native: 'I need' },
      { target: 'एक', native: 'one' },
      { target: 'कमरा', native: 'room' },
      { target: 'चाहिए', native: 'is needed' },
    ]),
    createContentItem('यात्रा', 'yaatra', 'Journey / Travel', 'word', 'आपकी यात्रा शुभ हो।', 'May your journey be auspicious.'),
    createContentItem('वापस', 'vaapas', 'Back / Return', 'word', 'हम कल वापस आएँगे।', 'We will come back tomorrow.'),
    createContentItem('रास्ता', 'raasta', 'Way / Path', 'word', 'कृपया रास्ता बताइए।', 'Please show me the way.'),
    createContentItem('ऑटो रिक्शा', 'auto riksha', 'Auto rickshaw', 'word', 'ऑटो रिक्शा से चलते हैं।', 'Let us go by auto rickshaw.'),
    createContentItem('किराया', 'kiraaya', 'Fare / Rent', 'word', 'इसका किराया कितना है?', 'What is the fare for this?'),
  ],
};

// ============================================================
// SHOPPING
// ============================================================
const shopping = {
  title: 'Shopping & Bargaining',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'hi',
  content: [
    createContentItem('दुकान', 'dukaan', 'Shop', 'word', 'यह दुकान कब खुलती है?', 'When does this shop open?'),
    createContentItem('बाज़ार', 'baazaar', 'Market', 'word', 'चलो बाज़ार चलते हैं।', 'Let us go to the market.'),
    createContentItem('पैसे', 'paise', 'Money', 'word', 'मेरे पास पैसे नहीं हैं।', 'I do not have money.'),
    createContentItem('कीमत', 'keemat', 'Price', 'word', 'इसकी कीमत क्या है?', 'What is the price of this?'),
    createContentItem('सस्ता', 'sasta', 'Cheap', 'word', 'कुछ सस्ता दिखाइए।', 'Show me something cheaper.'),
    createContentItem('महँगा', 'mahanga', 'Expensive', 'word', 'यह बहुत महँगा है।', 'This is very expensive.'),
    createContentItem('ख़रीदना', 'khareedna', 'To buy', 'word', 'मुझे यह ख़रीदना है।', 'I want to buy this.'),
    createContentItem('बेचना', 'bechna', 'To sell', 'word', 'क्या आप यह बेच रहे हैं?', 'Are you selling this?'),
    createContentItem('रंग', 'rang', 'Color', 'word', 'यह दूसरे रंग में है?', 'Is this available in another color?'),
    createContentItem('साइज़', 'saiz', 'Size', 'word', 'मेरा साइज़ मीडियम है।', 'My size is medium.'),
    createContentItem('कपड़ा', 'kapda', 'Cloth / Fabric', 'word', 'यह कपड़ा बहुत अच्छा है।', 'This fabric is very good.'),
    createContentItem('जूते', 'joote', 'Shoes', 'word', 'मुझे काले जूते चाहिए।', 'I need black shoes.'),
    createContentItem('थैला', 'thaila', 'Bag', 'word', 'एक थैला दीजिए।', 'Please give me a bag.'),
    createContentItem('इसकी कीमत क्या है?', 'iski keemat kya hai?', 'What is the price of this?', 'sentence', 'भैया, इसकी कीमत क्या है?', 'Brother, what is the price of this?', [
      { target: 'इसकी', native: 'of this' },
      { target: 'कीमत', native: 'price' },
      { target: 'क्या', native: 'what' },
      { target: 'है', native: 'is' },
    ]),
    createContentItem('कुछ कम कीजिए।', 'kuchh kam keejiye.', 'Please reduce the price.', 'sentence', 'बहुत महँगा है, कुछ कम कीजिए।', 'It is too expensive, please reduce the price.', [
      { target: 'कुछ', native: 'some' },
      { target: 'कम', native: 'less' },
      { target: 'कीजिए', native: 'please do' },
    ]),
    createContentItem('मुझे यह पसंद आया।', 'mujhe yah pasand aaya.', 'I liked this.', 'sentence', 'यह बहुत सुंदर है, मुझे यह पसंद आया।', 'This is very beautiful, I liked this.', [
      { target: 'मुझे', native: 'to me' },
      { target: 'यह', native: 'this' },
      { target: 'पसंद', native: 'liked' },
      { target: 'आया', native: 'came' },
    ]),
    createContentItem('क्या आप कार्ड लेते हैं?', 'kya aap card lete hain?', 'Do you accept cards?', 'sentence', 'क्या आप कार्ड लेते हैं या सिर्फ़ नकद?', 'Do you accept cards or only cash?', [
      { target: 'क्या', native: 'do (question)' },
      { target: 'आप', native: 'you' },
      { target: 'कार्ड', native: 'card' },
      { target: 'लेते हैं', native: 'accept' },
    ]),
    createContentItem('मुझे बस देख रहा हूँ।', 'mujhe bas dekh raha hoon.', 'I am just looking.', 'sentence', 'शुक्रिया, मैं बस देख रहा हूँ।', 'Thank you, I am just looking.', [
      { target: 'मैं', native: 'I' },
      { target: 'बस', native: 'just' },
      { target: 'देख रहा हूँ', native: 'am looking' },
    ]),
    createContentItem('नकद', 'nakad', 'Cash', 'word', 'मैं नकद में दूँगा।', 'I will pay in cash.'),
    createContentItem('रसीद', 'raseed', 'Receipt', 'word', 'मुझे रसीद दीजिए।', 'Please give me a receipt.'),
    createContentItem('यह कितने का है?', 'yah kitne ka hai?', 'How much is this?', 'sentence', 'भैया, यह कितने का है?', 'Brother, how much is this?', [
      { target: 'यह', native: 'this' },
      { target: 'कितने', native: 'how much' },
      { target: 'का', native: 'of' },
      { target: 'है', native: 'is' },
    ]),
    createContentItem('और दिखाइए।', 'aur dikhaiye.', 'Show me more.', 'sentence', 'यह पसंद नहीं आया, और दिखाइए।', 'I did not like this, show me more.', [
      { target: 'और', native: 'more' },
      { target: 'दिखाइए', native: 'please show' },
    ]),
    createContentItem('गहने', 'gahne', 'Jewelry', 'word', 'यह गहने सोने के हैं?', 'Is this jewelry made of gold?'),
    createContentItem('तोहफ़ा', 'tohfa', 'Gift', 'word', 'मुझे एक तोहफ़ा ख़रीदना है।', 'I need to buy a gift.'),
    createContentItem('मोल-भाव', 'mol-bhaav', 'Bargaining', 'word', 'यहाँ मोल-भाव चलता है।', 'Bargaining is possible here.'),
  ],
};

// ============================================================
// BUSINESS & WORK
// ============================================================
const business = {
  title: 'Business & Workplace',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'hi',
  content: [
    createContentItem('दफ़्तर', 'daftar', 'Office', 'word', 'मैं दफ़्तर जा रहा हूँ।', 'I am going to the office.'),
    createContentItem('काम', 'kaam', 'Work / Job', 'word', 'आपका काम क्या है?', 'What is your job?'),
    createContentItem('बैठक', 'baithak', 'Meeting', 'word', 'आज एक बैठक है।', 'There is a meeting today.'),
    createContentItem('ईमेल', 'email', 'Email', 'word', 'मैंने आपको ईमेल भेजा है।', 'I have sent you an email.'),
    createContentItem('वेतन', 'vetan', 'Salary', 'word', 'वेतन महीने के अंत में मिलता है।', 'The salary is received at the end of the month.'),
    createContentItem('नौकरी', 'naukri', 'Job / Employment', 'word', 'मुझे एक अच्छी नौकरी मिल गई।', 'I got a good job.'),
    createContentItem('बॉस', 'boss', 'Boss', 'word', 'मेरे बॉस बहुत अच्छे हैं।', 'My boss is very nice.'),
    createContentItem('कंपनी', 'company', 'Company', 'word', 'यह कंपनी बहुत बड़ी है।', 'This company is very big.'),
    createContentItem('कंप्यूटर', 'computer', 'Computer', 'word', 'कंप्यूटर चालू कीजिए।', 'Please turn on the computer.'),
    createContentItem('फ़ाइल', 'file', 'File', 'word', 'यह फ़ाइल बहुत ज़रूरी है।', 'This file is very important.'),
    createContentItem('प्रोजेक्ट', 'project', 'Project', 'word', 'यह प्रोजेक्ट कब तक पूरा होगा?', 'When will this project be completed?'),
    createContentItem('अनुभव', 'anubhav', 'Experience', 'word', 'आपको कितने साल का अनुभव है?', 'How many years of experience do you have?'),
    createContentItem('छुट्टी', 'chhutti', 'Holiday / Leave', 'word', 'मुझे कल छुट्टी चाहिए।', 'I need leave tomorrow.'),
    createContentItem('मैं यहाँ काम करता हूँ।', 'main yahaan kaam karta hoon.', 'I work here.', 'sentence', 'मैं इस कंपनी में काम करता हूँ।', 'I work in this company.', [
      { target: 'मैं', native: 'I' },
      { target: 'यहाँ', native: 'here' },
      { target: 'काम', native: 'work' },
      { target: 'करता हूँ', native: 'do' },
    ]),
    createContentItem('बैठक कितने बजे है?', 'baithak kitne baje hai?', 'What time is the meeting?', 'sentence', 'आज की बैठक कितने बजे है?', 'What time is today\'s meeting?', [
      { target: 'बैठक', native: 'meeting' },
      { target: 'कितने बजे', native: 'what time' },
      { target: 'है', native: 'is' },
    ]),
    createContentItem('मुझे छुट्टी चाहिए।', 'mujhe chhutti chaahiye.', 'I need a day off.', 'sentence', 'सर, मुझे कल छुट्टी चाहिए।', 'Sir, I need a day off tomorrow.', [
      { target: 'मुझे', native: 'I need' },
      { target: 'छुट्टी', native: 'leave/holiday' },
      { target: 'चाहिए', native: 'is needed' },
    ]),
    createContentItem('यह काम कब तक होगा?', 'yah kaam kab tak hoga?', 'When will this work be done?', 'sentence', 'यह काम कब तक पूरा होगा?', 'When will this work be completed?', [
      { target: 'यह', native: 'this' },
      { target: 'काम', native: 'work' },
      { target: 'कब तक', native: 'by when' },
      { target: 'होगा', native: 'will be done' },
    ]),
    createContentItem('मैं समय पर आऊँगा।', 'main samay par aaunga.', 'I will come on time.', 'sentence', 'चिंता मत कीजिए, मैं समय पर आऊँगा।', 'Do not worry, I will come on time.', [
      { target: 'मैं', native: 'I' },
      { target: 'समय पर', native: 'on time' },
      { target: 'आऊँगा', native: 'will come' },
    ]),
    createContentItem('सहकर्मी', 'sahkarmi', 'Colleague', 'word', 'मेरे सहकर्मी बहुत मददगार हैं।', 'My colleagues are very helpful.'),
    createContentItem('इंटरव्यू', 'interview', 'Interview', 'word', 'मेरा इंटरव्यू कल है।', 'My interview is tomorrow.'),
    createContentItem('तनख़्वाह', 'tankhvaah', 'Salary / Wages', 'word', 'तनख़्वाह अभी तक नहीं आई।', 'The salary has not come yet.'),
    createContentItem('रिपोर्ट', 'report', 'Report', 'word', 'रिपोर्ट कल तक तैयार कर दीजिए।', 'Please prepare the report by tomorrow.'),
    createContentItem('दस्तख़त', 'dastakhat', 'Signature', 'word', 'कृपया यहाँ दस्तख़त कीजिए।', 'Please sign here.'),
    createContentItem('व्यापार', 'vyaapaar', 'Business / Trade', 'word', 'उनका व्यापार बहुत अच्छा चल रहा है।', 'Their business is going very well.'),
  ],
};

// ============================================================
// HEALTHCARE & EMERGENCIES
// ============================================================
const healthcare = {
  title: 'Healthcare & Emergencies',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'hi',
  content: [
    createContentItem('डॉक्टर', 'doctor', 'Doctor', 'word', 'मुझे डॉक्टर से मिलना है।', 'I need to see a doctor.'),
    createContentItem('अस्पताल', 'aspataal', 'Hospital', 'word', 'सबसे नज़दीक अस्पताल कहाँ है?', 'Where is the nearest hospital?'),
    createContentItem('दवाई', 'davaai', 'Medicine', 'word', 'डॉक्टर ने दवाई दी है।', 'The doctor has given medicine.'),
    createContentItem('बुख़ार', 'bukhaar', 'Fever', 'word', 'मुझे बुख़ार है।', 'I have a fever.'),
    createContentItem('सिरदर्द', 'sirdard', 'Headache', 'word', 'मुझे बहुत सिरदर्द हो रहा है।', 'I am having a bad headache.'),
    createContentItem('पेट दर्द', 'pet dard', 'Stomach ache', 'word', 'मेरे पेट में दर्द है।', 'I have a stomach ache.'),
    createContentItem('दर्द', 'dard', 'Pain', 'word', 'यहाँ बहुत दर्द हो रहा है।', 'There is a lot of pain here.'),
    createContentItem('ज़ुकाम', 'zukaam', 'Cold (illness)', 'word', 'मुझे ज़ुकाम हो गया है।', 'I have caught a cold.'),
    createContentItem('खाँसी', 'khaansi', 'Cough', 'word', 'खाँसी बहुत दिनों से है।', 'I have had a cough for many days.'),
    createContentItem('चोट', 'chot', 'Injury', 'word', 'मुझे चोट लग गई है।', 'I have been injured.'),
    createContentItem('एलर्जी', 'allergy', 'Allergy', 'word', 'मुझे धूल से एलर्जी है।', 'I am allergic to dust.'),
    createContentItem('दवाख़ाना', 'davakhaana', 'Pharmacy', 'word', 'पास में दवाख़ाना कहाँ है?', 'Where is the nearby pharmacy?'),
    createContentItem('पट्टी', 'patti', 'Bandage', 'word', 'कृपया पट्टी बाँध दीजिए।', 'Please put on a bandage.'),
    createContentItem('मुझे डॉक्टर से मिलना है।', 'mujhe doctor se milna hai.', 'I need to see a doctor.', 'sentence', 'मेरी तबीयत ठीक नहीं है, मुझे डॉक्टर से मिलना है।', 'I am not feeling well, I need to see a doctor.', [
      { target: 'मुझे', native: 'I need' },
      { target: 'डॉक्टर', native: 'doctor' },
      { target: 'से', native: 'with' },
      { target: 'मिलना है', native: 'to meet' },
    ]),
    createContentItem('मेरी तबीयत ठीक नहीं है।', 'meri tabiyat theek nahin hai.', 'I am not feeling well.', 'sentence', 'आज मेरी तबीयत ठीक नहीं है।', 'I am not feeling well today.', [
      { target: 'मेरी', native: 'my' },
      { target: 'तबीयत', native: 'health/condition' },
      { target: 'ठीक नहीं', native: 'not well' },
      { target: 'है', native: 'is' },
    ]),
    createContentItem('क्या आपको किसी चीज़ से एलर्जी है?', 'kya aapko kisi cheez se allergy hai?', 'Are you allergic to anything?', 'sentence', 'क्या आपको किसी दवाई से एलर्जी है?', 'Are you allergic to any medicine?', [
      { target: 'क्या', native: 'do (question)' },
      { target: 'आपको', native: 'you' },
      { target: 'किसी चीज़', native: 'anything' },
      { target: 'एलर्जी', native: 'allergy' },
      { target: 'है', native: 'have' },
    ]),
    createContentItem('एंबुलेंस बुलाइए!', 'ambulance bulaiye!', 'Call an ambulance!', 'sentence', 'जल्दी एंबुलेंस बुलाइए, हालत गंभीर है!', 'Quickly call an ambulance, the condition is serious!', [
      { target: 'एंबुलेंस', native: 'ambulance' },
      { target: 'बुलाइए', native: 'please call' },
    ]),
    createContentItem('मुझे यहाँ दर्द हो रहा है।', 'mujhe yahaan dard ho raha hai.', 'I am having pain here.', 'sentence', 'डॉक्टर साहब, मुझे यहाँ दर्द हो रहा है।', 'Doctor, I am having pain here.', [
      { target: 'मुझे', native: 'to me' },
      { target: 'यहाँ', native: 'here' },
      { target: 'दर्द', native: 'pain' },
      { target: 'हो रहा है', native: 'is happening' },
    ]),
    createContentItem('मदद कीजिए!', 'madad keejiye!', 'Help!', 'sentence', 'कृपया मेरी मदद कीजिए!', 'Please help me!', [
      { target: 'मदद', native: 'help' },
      { target: 'कीजिए', native: 'please do' },
    ]),
    createContentItem('खून', 'khoon', 'Blood', 'word', 'खून की जाँच करवानी है।', 'I need to get a blood test done.'),
    createContentItem('जाँच', 'jaanch', 'Check-up / Test', 'word', 'डॉक्टर ने जाँच करवाने को कहा है।', 'The doctor said to get a check-up.'),
    createContentItem('नुस्ख़ा', 'nuskha', 'Prescription', 'word', 'डॉक्टर ने नुस्ख़ा लिख दिया है।', 'The doctor has written the prescription.'),
    createContentItem('बीमारी', 'bimaari', 'Illness / Disease', 'word', 'यह बीमारी संक्रामक है।', 'This illness is contagious.'),
    createContentItem('आँख', 'aankh', 'Eye', 'word', 'मेरी आँख में कुछ पड़ गया है।', 'Something has gotten into my eye.'),
    createContentItem('दाँत', 'daant', 'Tooth', 'word', 'मेरे दाँत में दर्द है।', 'I have a toothache.'),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
