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
  targetLang: 'ja',
  content: [
    createContentItem('こんにちは', 'konnichiwa', 'Hello', 'word', 'こんにちは、お元気ですか？', 'Hello, how are you?'),
    createContentItem('おはようございます', 'ohayou gozaimasu', 'Good morning', 'word', 'おはようございます、いい天気ですね。', 'Good morning, nice weather isn\'t it.'),
    createContentItem('こんばんは', 'konbanwa', 'Good evening', 'word', 'こんばんは、お疲れ様です。', 'Good evening, thanks for your hard work.'),
    createContentItem('さようなら', 'sayounara', 'Goodbye', 'word', 'さようなら、また明日。', 'Goodbye, see you tomorrow.'),
    createContentItem('ありがとうございます', 'arigatou gozaimasu', 'Thank you very much', 'word', 'ご親切にありがとうございます。', 'Thank you for your kindness.'),
    createContentItem('すみません', 'sumimasen', 'Excuse me / I\'m sorry', 'word', 'すみません、ちょっといいですか？', 'Excuse me, do you have a moment?'),
    createContentItem('はい', 'hai', 'Yes', 'word', 'はい、そうです。', 'Yes, that\'s right.'),
    createContentItem('いいえ', 'iie', 'No', 'word', 'いいえ、違います。', 'No, that\'s not right.'),
    createContentItem('お願いします', 'onegai shimasu', 'Please', 'word', 'これをお願いします。', 'This one, please.'),
    createContentItem('どういたしまして', 'dou itashimashite', 'You\'re welcome', 'word', 'どういたしまして、気にしないでください。', 'You\'re welcome, don\'t worry about it.'),
    createContentItem('はじめまして', 'hajimemashite', 'Nice to meet you', 'word', 'はじめまして、田中と申します。', 'Nice to meet you, my name is Tanaka.'),
    createContentItem('よろしくお願いします', 'yoroshiku onegai shimasu', 'Pleased to meet you / Please take care of me', 'word', 'これからよろしくお願いします。', 'I look forward to working with you.'),
    createContentItem('お元気ですか', 'ogenki desu ka', 'How are you?', 'sentence', 'お元気ですか？最近どうですか？', 'How are you? How have you been lately?', [
      { target: 'お元気', native: 'well / healthy' },
      { target: 'ですか', native: 'are you?' },
    ]),
    createContentItem('元気です', 'genki desu', 'I\'m fine', 'sentence', 'はい、元気です。ありがとうございます。', 'Yes, I\'m fine. Thank you.', [
      { target: '元気', native: 'fine / healthy' },
      { target: 'です', native: 'am / is' },
    ]),
    createContentItem('私の名前は...です', 'watashi no namae wa ... desu', 'My name is ...', 'sentence', '私の名前は田中です。', 'My name is Tanaka.', [
      { target: '私', native: 'I / me' },
      { target: 'の', native: 'possessive particle' },
      { target: '名前', native: 'name' },
      { target: 'は', native: 'topic particle' },
      { target: 'です', native: 'is / am' },
    ]),
    createContentItem('おやすみなさい', 'oyasumi nasai', 'Good night', 'word', 'おやすみなさい、いい夢を見てね。', 'Good night, sweet dreams.'),
    createContentItem('久しぶりですね', 'hisashiburi desu ne', 'Long time no see', 'sentence', '久しぶりですね、お変わりないですか？', 'Long time no see, have you been well?', [
      { target: '久しぶり', native: 'long time' },
      { target: 'です', native: 'is' },
      { target: 'ね', native: 'isn\'t it (particle)' },
    ]),
    createContentItem('失礼します', 'shitsurei shimasu', 'Excuse me (formal)', 'word', '失礼します、入ってもいいですか？', 'Excuse me, may I come in?'),
    createContentItem('ごめんなさい', 'gomen nasai', 'I\'m sorry', 'word', 'ごめんなさい、遅れてしまいました。', 'I\'m sorry, I was late.'),
    createContentItem('お名前は何ですか', 'onamae wa nan desu ka', 'What is your name?', 'sentence', 'すみません、お名前は何ですか？', 'Excuse me, what is your name?', [
      { target: 'お名前', native: 'name (polite)' },
      { target: 'は', native: 'topic particle' },
      { target: '何', native: 'what' },
      { target: 'ですか', native: 'is it?' },
    ]),
    createContentItem('どこから来ましたか', 'doko kara kimashita ka', 'Where are you from?', 'sentence', 'どこから来ましたか？日本からですか？', 'Where are you from? Are you from Japan?', [
      { target: 'どこ', native: 'where' },
      { target: 'から', native: 'from' },
      { target: '来ました', native: 'came' },
      { target: 'か', native: 'question particle' },
    ]),
    createContentItem('また会いましょう', 'mata aimashou', 'Let\'s meet again', 'sentence', 'また会いましょう、楽しかったです。', 'Let\'s meet again, it was fun.', [
      { target: 'また', native: 'again' },
      { target: '会いましょう', native: 'let\'s meet' },
    ]),
    createContentItem('いただきます', 'itadakimasu', 'Bon appetit (before eating)', 'word', 'いただきます！おいしそうですね。', 'Bon appetit! It looks delicious.'),
    createContentItem('ごちそうさまでした', 'gochisousama deshita', 'Thank you for the meal', 'word', 'ごちそうさまでした、とてもおいしかったです。', 'Thank you for the meal, it was very delicious.'),
    createContentItem('お疲れ様です', 'otsukaresama desu', 'Thanks for your hard work', 'word', 'お疲れ様です、今日も頑張りましたね。', 'Thanks for your hard work, you worked hard today too.'),
  ],
};

// ============================================================
// DAILY LIFE
// ============================================================
const dailyLife = {
  title: 'Everyday Life & Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'ja',
  content: [
    createContentItem('朝', 'asa', 'Morning', 'word', '毎朝六時に起きます。', 'I wake up at 6 every morning.'),
    createContentItem('昼', 'hiru', 'Noon / Daytime', 'word', '昼ご飯を食べましょう。', 'Let\'s eat lunch.'),
    createContentItem('夜', 'yoru', 'Night / Evening', 'word', '夜は静かです。', 'The night is quiet.'),
    createContentItem('時間', 'jikan', 'Time', 'word', '時間がありません。', 'I don\'t have time.'),
    createContentItem('今日', 'kyou', 'Today', 'word', '今日は忙しいです。', 'Today is busy.'),
    createContentItem('明日', 'ashita', 'Tomorrow', 'word', '明日は休みです。', 'Tomorrow is a day off.'),
    createContentItem('昨日', 'kinou', 'Yesterday', 'word', '昨日は楽しかったです。', 'Yesterday was fun.'),
    createContentItem('家', 'ie', 'House / Home', 'word', '家に帰ります。', 'I\'m going home.'),
    createContentItem('学校', 'gakkou', 'School', 'word', '学校に行きます。', 'I go to school.'),
    createContentItem('仕事', 'shigoto', 'Work / Job', 'word', '仕事が終わりました。', 'Work is finished.'),
    createContentItem('電車', 'densha', 'Train', 'word', '電車で会社に行きます。', 'I go to the office by train.'),
    createContentItem('天気', 'tenki', 'Weather', 'word', '今日の天気はいいですね。', 'The weather is nice today.'),
    createContentItem('毎朝コーヒーを飲みます', 'maiasa koohii wo nomimasu', 'I drink coffee every morning', 'sentence', '毎朝コーヒーを飲みます。', 'I drink coffee every morning.', [
      { target: '毎朝', native: 'every morning' },
      { target: 'コーヒー', native: 'coffee' },
      { target: 'を', native: 'object particle' },
      { target: '飲みます', native: 'drink' },
    ]),
    createContentItem('何時ですか', 'nanji desu ka', 'What time is it?', 'sentence', '今、何時ですか？', 'What time is it now?', [
      { target: '何時', native: 'what time' },
      { target: 'ですか', native: 'is it?' },
    ]),
    createContentItem('週末', 'shuumatsu', 'Weekend', 'word', '週末は何をしますか？', 'What do you do on weekends?'),
    createContentItem('友達', 'tomodachi', 'Friend', 'word', '友達と映画を見ました。', 'I watched a movie with a friend.'),
    createContentItem('電話', 'denwa', 'Telephone', 'word', '電話をかけてください。', 'Please make a phone call.'),
    createContentItem('散歩します', 'sanpo shimasu', 'Take a walk', 'sentence', '公園で散歩します。', 'I take a walk in the park.', [
      { target: '散歩', native: 'walk / stroll' },
      { target: 'します', native: 'do' },
    ]),
    createContentItem('買い物', 'kaimono', 'Shopping', 'word', '週末に買い物に行きます。', 'I go shopping on weekends.'),
    createContentItem('料理', 'ryouri', 'Cooking / Cuisine', 'word', '料理が好きです。', 'I like cooking.'),
    createContentItem('掃除をします', 'souji wo shimasu', 'I clean / do cleaning', 'sentence', '土曜日に部屋の掃除をします。', 'I clean my room on Saturday.', [
      { target: '掃除', native: 'cleaning' },
      { target: 'を', native: 'object particle' },
      { target: 'します', native: 'do' },
    ]),
    createContentItem('洗濯', 'sentaku', 'Laundry', 'word', '洗濯をしなければなりません。', 'I have to do the laundry.'),
    createContentItem('お風呂に入ります', 'ofuro ni hairimasu', 'I take a bath', 'sentence', '毎晩お風呂に入ります。', 'I take a bath every night.', [
      { target: 'お風呂', native: 'bath' },
      { target: 'に', native: 'particle (into)' },
      { target: '入ります', native: 'enter / get in' },
    ]),
    createContentItem('寝ます', 'nemasu', 'Sleep / Go to bed', 'word', '十一時に寝ます。', 'I go to bed at 11 o\'clock.'),
    createContentItem('起きます', 'okimasu', 'Wake up / Get up', 'word', '毎朝七時に起きます。', 'I wake up at 7 every morning.'),
  ],
};

// ============================================================
// FOOD & DINING
// ============================================================
const food = {
  title: 'Food & Dining',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'ja',
  content: [
    createContentItem('ご飯', 'gohan', 'Rice / Meal', 'word', 'ご飯を食べましょう。', 'Let\'s eat rice / a meal.'),
    createContentItem('水', 'mizu', 'Water', 'word', '水をください。', 'Water, please.'),
    createContentItem('お茶', 'ocha', 'Tea (green tea)', 'word', 'お茶を一杯いかがですか？', 'Would you like a cup of tea?'),
    createContentItem('肉', 'niku', 'Meat', 'word', '肉が好きです。', 'I like meat.'),
    createContentItem('魚', 'sakana', 'Fish', 'word', '日本人は魚をよく食べます。', 'Japanese people eat fish often.'),
    createContentItem('野菜', 'yasai', 'Vegetables', 'word', '野菜をもっと食べてください。', 'Please eat more vegetables.'),
    createContentItem('果物', 'kudamono', 'Fruit', 'word', 'この果物は甘いです。', 'This fruit is sweet.'),
    createContentItem('寿司', 'sushi', 'Sushi', 'word', '寿司を食べに行きませんか？', 'Shall we go eat sushi?'),
    createContentItem('ラーメン', 'raamen', 'Ramen', 'word', 'このラーメン屋は有名です。', 'This ramen shop is famous.'),
    createContentItem('おいしい', 'oishii', 'Delicious', 'word', 'このケーキはとてもおいしいです。', 'This cake is very delicious.'),
    createContentItem('メニューをください', 'menyuu wo kudasai', 'May I have the menu, please', 'sentence', 'すみません、メニューをください。', 'Excuse me, may I have the menu, please.', [
      { target: 'メニュー', native: 'menu' },
      { target: 'を', native: 'object particle' },
      { target: 'ください', native: 'please give me' },
    ]),
    createContentItem('お会計をお願いします', 'okaikei wo onegai shimasu', 'Check, please', 'sentence', 'すみません、お会計をお願いします。', 'Excuse me, check please.', [
      { target: 'お会計', native: 'the bill / check' },
      { target: 'を', native: 'object particle' },
      { target: 'お願いします', native: 'please' },
    ]),
    createContentItem('卵', 'tamago', 'Egg', 'word', '卵焼きが好きです。', 'I like Japanese omelette.'),
    createContentItem('パン', 'pan', 'Bread', 'word', '朝ごはんにパンを食べます。', 'I eat bread for breakfast.'),
    createContentItem('牛乳', 'gyuunyuu', 'Milk', 'word', '毎朝牛乳を飲みます。', 'I drink milk every morning.'),
    createContentItem('これは何ですか', 'kore wa nan desu ka', 'What is this?', 'sentence', 'すみません、これは何ですか？', 'Excuse me, what is this?', [
      { target: 'これ', native: 'this' },
      { target: 'は', native: 'topic particle' },
      { target: '何', native: 'what' },
      { target: 'ですか', native: 'is it?' },
    ]),
    createContentItem('辛い', 'karai', 'Spicy', 'word', 'この料理は辛いですか？', 'Is this dish spicy?'),
    createContentItem('甘い', 'amai', 'Sweet', 'word', 'このお菓子は甘いです。', 'This snack is sweet.'),
    createContentItem('お腹がすきました', 'onaka ga sukimashita', 'I\'m hungry', 'sentence', 'お腹がすきました、何か食べましょう。', 'I\'m hungry, let\'s eat something.', [
      { target: 'お腹', native: 'stomach' },
      { target: 'が', native: 'subject particle' },
      { target: 'すきました', native: 'became empty' },
    ]),
    createContentItem('のどが渇きました', 'nodo ga kawakimashita', 'I\'m thirsty', 'sentence', 'のどが渇きました、水をください。', 'I\'m thirsty, water please.', [
      { target: 'のど', native: 'throat' },
      { target: 'が', native: 'subject particle' },
      { target: '渇きました', native: 'became dry' },
    ]),
    createContentItem('天ぷら', 'tempura', 'Tempura', 'word', '海老の天ぷらが好きです。', 'I like shrimp tempura.'),
    createContentItem('味噌汁', 'misoshiru', 'Miso soup', 'word', '味噌汁は毎日飲みます。', 'I have miso soup every day.'),
    createContentItem('おにぎり', 'onigiri', 'Rice ball', 'word', 'コンビニでおにぎりを買いました。', 'I bought a rice ball at the convenience store.'),
    createContentItem('注文してもいいですか', 'chuumon shite mo ii desu ka', 'May I order?', 'sentence', 'すみません、注文してもいいですか？', 'Excuse me, may I order?', [
      { target: '注文', native: 'order' },
      { target: 'しても', native: 'even if I do' },
      { target: 'いいですか', native: 'is it okay?' },
    ]),
    createContentItem('お箸', 'ohashi', 'Chopsticks', 'word', 'お箸で食べられますか？', 'Can you eat with chopsticks?'),
  ],
};

// ============================================================
// TRAVEL & TRANSPORTATION
// ============================================================
const travel = {
  title: 'Travel & Transportation',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'ja',
  content: [
    createContentItem('駅', 'eki', 'Station', 'word', '駅はどこですか？', 'Where is the station?'),
    createContentItem('空港', 'kuukou', 'Airport', 'word', '空港まで一時間かかります。', 'It takes one hour to the airport.'),
    createContentItem('ホテル', 'hoteru', 'Hotel', 'word', 'ホテルを予約しました。', 'I booked a hotel.'),
    createContentItem('切符', 'kippu', 'Ticket', 'word', '切符を買いたいです。', 'I want to buy a ticket.'),
    createContentItem('地図', 'chizu', 'Map', 'word', '地図を見せてください。', 'Please show me the map.'),
    createContentItem('タクシー', 'takushii', 'Taxi', 'word', 'タクシーを呼んでください。', 'Please call a taxi.'),
    createContentItem('バス', 'basu', 'Bus', 'word', 'バスで行きましょう。', 'Let\'s go by bus.'),
    createContentItem('飛行機', 'hikouki', 'Airplane', 'word', '飛行機は午後三時に出発します。', 'The airplane departs at 3 PM.'),
    createContentItem('パスポート', 'pasupooto', 'Passport', 'word', 'パスポートを見せてください。', 'Please show your passport.'),
    createContentItem('出口', 'deguchi', 'Exit', 'word', '出口はあちらです。', 'The exit is over there.'),
    createContentItem('入口', 'iriguchi', 'Entrance', 'word', '入口はどこですか？', 'Where is the entrance?'),
    createContentItem('ここはどこですか', 'koko wa doko desu ka', 'Where am I?', 'sentence', 'すみません、ここはどこですか？', 'Excuse me, where am I?', [
      { target: 'ここ', native: 'here' },
      { target: 'は', native: 'topic particle' },
      { target: 'どこ', native: 'where' },
      { target: 'ですか', native: 'is it?' },
    ]),
    createContentItem('右', 'migi', 'Right', 'word', '右に曲がってください。', 'Please turn right.'),
    createContentItem('左', 'hidari', 'Left', 'word', '左に曲がってください。', 'Please turn left.'),
    createContentItem('まっすぐ', 'massugu', 'Straight ahead', 'word', 'まっすぐ行ってください。', 'Please go straight ahead.'),
    createContentItem('いくらですか', 'ikura desu ka', 'How much is it?', 'sentence', 'この切符はいくらですか？', 'How much is this ticket?', [
      { target: 'いくら', native: 'how much' },
      { target: 'ですか', native: 'is it?' },
    ]),
    createContentItem('予約', 'yoyaku', 'Reservation', 'word', '予約はしていますか？', 'Do you have a reservation?'),
    createContentItem('観光', 'kankou', 'Sightseeing', 'word', '東京で観光をしたいです。', 'I want to go sightseeing in Tokyo.'),
    createContentItem('新幹線', 'shinkansen', 'Bullet train', 'word', '新幹線で京都に行きます。', 'I\'m going to Kyoto by bullet train.'),
    createContentItem('この電車は東京に行きますか', 'kono densha wa toukyou ni ikimasu ka', 'Does this train go to Tokyo?', 'sentence', 'すみません、この電車は東京に行きますか？', 'Excuse me, does this train go to Tokyo?', [
      { target: 'この', native: 'this' },
      { target: '電車', native: 'train' },
      { target: 'は', native: 'topic particle' },
      { target: '東京', native: 'Tokyo' },
      { target: 'に', native: 'to' },
      { target: '行きますか', native: 'does it go?' },
    ]),
    createContentItem('荷物', 'nimotsu', 'Luggage / Baggage', 'word', '荷物はどこにありますか？', 'Where is the luggage?'),
    createContentItem('トイレはどこですか', 'toire wa doko desu ka', 'Where is the restroom?', 'sentence', 'すみません、トイレはどこですか？', 'Excuse me, where is the restroom?', [
      { target: 'トイレ', native: 'restroom / toilet' },
      { target: 'は', native: 'topic particle' },
      { target: 'どこ', native: 'where' },
      { target: 'ですか', native: 'is it?' },
    ]),
    createContentItem('写真を撮ってもいいですか', 'shashin wo totte mo ii desu ka', 'May I take a photo?', 'sentence', 'すみません、写真を撮ってもいいですか？', 'Excuse me, may I take a photo?', [
      { target: '写真', native: 'photo' },
      { target: 'を', native: 'object particle' },
      { target: '撮っても', native: 'even if I take' },
      { target: 'いいですか', native: 'is it okay?' },
    ]),
    createContentItem('近い', 'chikai', 'Near / Close', 'word', '駅は近いですか？', 'Is the station nearby?'),
    createContentItem('遠い', 'tooi', 'Far', 'word', '空港は遠いです。', 'The airport is far.'),
  ],
};

// ============================================================
// SHOPPING
// ============================================================
const shopping = {
  title: 'Shopping & Money',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'ja',
  content: [
    createContentItem('お店', 'omise', 'Shop / Store', 'word', 'あのお店に行きましょう。', 'Let\'s go to that shop.'),
    createContentItem('高い', 'takai', 'Expensive', 'word', 'これは高いですね。', 'This is expensive.'),
    createContentItem('安い', 'yasui', 'Cheap / Inexpensive', 'word', 'このシャツは安いです。', 'This shirt is cheap.'),
    createContentItem('お金', 'okane', 'Money', 'word', 'お金が足りません。', 'I don\'t have enough money.'),
    createContentItem('円', 'en', 'Yen (Japanese currency)', 'word', '千円です。', 'It\'s 1000 yen.'),
    createContentItem('これをください', 'kore wo kudasai', 'I\'ll take this, please', 'sentence', 'これをください、お願いします。', 'I\'ll take this, please.', [
      { target: 'これ', native: 'this' },
      { target: 'を', native: 'object particle' },
      { target: 'ください', native: 'please give me' },
    ]),
    createContentItem('大きい', 'ookii', 'Big / Large', 'word', 'もっと大きいサイズはありますか？', 'Do you have a bigger size?'),
    createContentItem('小さい', 'chiisai', 'Small', 'word', 'これは小さすぎます。', 'This is too small.'),
    createContentItem('色', 'iro', 'Color', 'word', '他の色はありますか？', 'Do you have other colors?'),
    createContentItem('赤', 'aka', 'Red', 'word', '赤いシャツが欲しいです。', 'I want a red shirt.'),
    createContentItem('青', 'ao', 'Blue', 'word', '青い靴を見せてください。', 'Please show me the blue shoes.'),
    createContentItem('白', 'shiro', 'White', 'word', '白いTシャツを買いました。', 'I bought a white T-shirt.'),
    createContentItem('黒', 'kuro', 'Black', 'word', '黒いかばんが好きです。', 'I like black bags.'),
    createContentItem('試着してもいいですか', 'shichaku shite mo ii desu ka', 'May I try this on?', 'sentence', 'すみません、試着してもいいですか？', 'Excuse me, may I try this on?', [
      { target: '試着', native: 'fitting / trying on' },
      { target: 'しても', native: 'even if I do' },
      { target: 'いいですか', native: 'is it okay?' },
    ]),
    createContentItem('クレジットカードは使えますか', 'kurejitto kaado wa tsukaemasu ka', 'Can I use a credit card?', 'sentence', 'クレジットカードは使えますか？', 'Can I use a credit card?', [
      { target: 'クレジットカード', native: 'credit card' },
      { target: 'は', native: 'topic particle' },
      { target: '使えますか', native: 'can I use?' },
    ]),
    createContentItem('レシート', 'reshiito', 'Receipt', 'word', 'レシートをください。', 'Please give me a receipt.'),
    createContentItem('袋', 'fukuro', 'Bag', 'word', '袋はいりますか？', 'Do you need a bag?'),
    createContentItem('セール', 'seeru', 'Sale', 'word', '今セール中です。', 'It\'s on sale now.'),
    createContentItem('割引', 'waribiki', 'Discount', 'word', '割引はありますか？', 'Is there a discount?'),
    createContentItem('いくらですか', 'ikura desu ka', 'How much is it?', 'sentence', 'すみません、これはいくらですか？', 'Excuse me, how much is this?', [
      { target: 'いくら', native: 'how much' },
      { target: 'ですか', native: 'is it?' },
    ]),
    createContentItem('服', 'fuku', 'Clothes', 'word', '新しい服を買いたいです。', 'I want to buy new clothes.'),
    createContentItem('靴', 'kutsu', 'Shoes', 'word', 'この靴はとても可愛いですね。', 'These shoes are very cute.'),
    createContentItem('サイズ', 'saizu', 'Size', 'word', 'Mサイズはありますか？', 'Do you have a size M?'),
    createContentItem('見ているだけです', 'mite iru dake desu', 'I\'m just looking', 'sentence', 'ありがとう、見ているだけです。', 'Thank you, I\'m just looking.', [
      { target: '見ている', native: 'looking' },
      { target: 'だけ', native: 'just / only' },
      { target: 'です', native: 'is / am' },
    ]),
    createContentItem('お土産', 'omiyage', 'Souvenir', 'word', 'お土産を買いたいです。', 'I want to buy souvenirs.'),
  ],
};

// ============================================================
// BUSINESS & WORK
// ============================================================
const business = {
  title: 'Business & Workplace',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'ja',
  content: [
    createContentItem('会社', 'kaisha', 'Company', 'word', '会社に勤めています。', 'I work at a company.'),
    createContentItem('会議', 'kaigi', 'Meeting', 'word', '会議は何時からですか？', 'What time does the meeting start?'),
    createContentItem('名刺', 'meishi', 'Business card', 'word', '名刺を交換しましょう。', 'Let\'s exchange business cards.'),
    createContentItem('電話', 'denwa', 'Telephone', 'word', '電話をかけてもいいですか？', 'May I make a phone call?'),
    createContentItem('メール', 'meeru', 'Email', 'word', 'メールを送りました。', 'I sent an email.'),
    createContentItem('上司', 'joushi', 'Boss / Superior', 'word', '上司に報告します。', 'I will report to my boss.'),
    createContentItem('同僚', 'douryou', 'Colleague / Coworker', 'word', '同僚と昼ご飯を食べました。', 'I had lunch with a colleague.'),
    createContentItem('書類', 'shorui', 'Documents', 'word', '書類を準備してください。', 'Please prepare the documents.'),
    createContentItem('パソコン', 'pasokon', 'Computer', 'word', 'パソコンが壊れました。', 'The computer broke.'),
    createContentItem('お忙しいところすみません', 'oisogashii tokoro sumimasen', 'Sorry to bother you when you\'re busy', 'sentence', 'お忙しいところすみません、少しよろしいですか？', 'Sorry to bother you when you\'re busy, do you have a moment?', [
      { target: 'お忙しい', native: 'busy (polite)' },
      { target: 'ところ', native: 'time / occasion' },
      { target: 'すみません', native: 'excuse me / sorry' },
    ]),
    createContentItem('締め切り', 'shimekiri', 'Deadline', 'word', '締め切りはいつですか？', 'When is the deadline?'),
    createContentItem('プレゼン', 'purezen', 'Presentation', 'word', '明日プレゼンがあります。', 'I have a presentation tomorrow.'),
    createContentItem('報告', 'houkoku', 'Report', 'word', '報告書を書きます。', 'I will write a report.'),
    createContentItem('出張', 'shucchou', 'Business trip', 'word', '来週、大阪に出張します。', 'I\'m going on a business trip to Osaka next week.'),
    createContentItem('残業', 'zangyou', 'Overtime work', 'word', '今日は残業しなければなりません。', 'I have to work overtime today.'),
    createContentItem('お先に失礼します', 'osaki ni shitsurei shimasu', 'Excuse me for leaving before you', 'sentence', 'お先に失礼します、お疲れ様でした。', 'Excuse me for leaving before you, good work today.', [
      { target: 'お先に', native: 'before you / ahead' },
      { target: '失礼します', native: 'excuse me (polite)' },
    ]),
    createContentItem('スケジュール', 'sukejuuru', 'Schedule', 'word', 'スケジュールを確認してください。', 'Please check the schedule.'),
    createContentItem('契約', 'keiyaku', 'Contract', 'word', '契約書にサインをお願いします。', 'Please sign the contract.'),
    createContentItem('打ち合わせ', 'uchiawase', 'Meeting / Discussion', 'word', '午後に打ち合わせがあります。', 'There is a meeting in the afternoon.'),
    createContentItem('確認してもよろしいですか', 'kakunin shite mo yoroshii desu ka', 'May I confirm?', 'sentence', 'もう一度確認してもよろしいですか？', 'May I confirm once more?', [
      { target: '確認', native: 'confirmation' },
      { target: 'しても', native: 'even if I do' },
      { target: 'よろしいですか', native: 'is it alright? (polite)' },
    ]),
    createContentItem('給料', 'kyuuryou', 'Salary', 'word', '給料日は毎月二十五日です。', 'Payday is the 25th of every month.'),
    createContentItem('休憩', 'kyuukei', 'Break / Rest', 'word', '休憩しましょう。', 'Let\'s take a break.'),
    createContentItem('面接', 'mensetsu', 'Interview', 'word', '来週面接があります。', 'I have an interview next week.'),
    createContentItem('よろしくお伝えください', 'yoroshiku otsutae kudasai', 'Please give my regards', 'sentence', '部長によろしくお伝えください。', 'Please give my regards to the department head.', [
      { target: 'よろしく', native: 'regards / well' },
      { target: 'お伝え', native: 'convey (polite)' },
      { target: 'ください', native: 'please' },
    ]),
    createContentItem('資料', 'shiryou', 'Materials / Data', 'word', '資料を配ってください。', 'Please distribute the materials.'),
  ],
};

// ============================================================
// HEALTHCARE
// ============================================================
const healthcare = {
  title: 'Health & Medical',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'ja',
  content: [
    createContentItem('病院', 'byouin', 'Hospital', 'word', '病院に行かなければなりません。', 'I have to go to the hospital.'),
    createContentItem('医者', 'isha', 'Doctor', 'word', '医者に診てもらいました。', 'I was examined by a doctor.'),
    createContentItem('薬', 'kusuri', 'Medicine', 'word', '薬を飲んでください。', 'Please take the medicine.'),
    createContentItem('熱', 'netsu', 'Fever', 'word', '熱があります。', 'I have a fever.'),
    createContentItem('頭', 'atama', 'Head', 'word', '頭が痛いです。', 'I have a headache.'),
    createContentItem('お腹', 'onaka', 'Stomach', 'word', 'お腹が痛いです。', 'I have a stomachache.'),
    createContentItem('風邪', 'kaze', 'Cold (illness)', 'word', '風邪を引きました。', 'I caught a cold.'),
    createContentItem('痛い', 'itai', 'Painful / It hurts', 'word', 'ここが痛いです。', 'It hurts here.'),
    createContentItem('薬局', 'yakkyoku', 'Pharmacy', 'word', '近くに薬局はありますか？', 'Is there a pharmacy nearby?'),
    createContentItem('アレルギー', 'arerugii', 'Allergy', 'word', '花粉アレルギーがあります。', 'I have a pollen allergy.'),
    createContentItem('具合が悪いです', 'guai ga warui desu', 'I\'m not feeling well', 'sentence', '具合が悪いです、休んでもいいですか？', 'I\'m not feeling well, may I rest?', [
      { target: '具合', native: 'condition / state' },
      { target: 'が', native: 'subject particle' },
      { target: '悪い', native: 'bad' },
      { target: 'です', native: 'is' },
    ]),
    createContentItem('咳', 'seki', 'Cough', 'word', '咳が出ます。', 'I have a cough.'),
    createContentItem('喉', 'nodo', 'Throat', 'word', '喉が痛いです。', 'My throat hurts.'),
    createContentItem('怪我', 'kega', 'Injury', 'word', '怪我をしました。', 'I got injured.'),
    createContentItem('救急車', 'kyuukyuusha', 'Ambulance', 'word', '救急車を呼んでください。', 'Please call an ambulance.'),
    createContentItem('保険証', 'hokenshou', 'Insurance card', 'word', '保険証を持っていますか？', 'Do you have your insurance card?'),
    createContentItem('歯', 'ha', 'Tooth', 'word', '歯が痛いです。', 'I have a toothache.'),
    createContentItem('目', 'me', 'Eye', 'word', '目がかゆいです。', 'My eyes are itchy.'),
    createContentItem('どこが痛いですか', 'doko ga itai desu ka', 'Where does it hurt?', 'sentence', 'どこが痛いですか？見せてください。', 'Where does it hurt? Please show me.', [
      { target: 'どこ', native: 'where' },
      { target: 'が', native: 'subject particle' },
      { target: '痛い', native: 'painful' },
      { target: 'ですか', native: 'is it?' },
    ]),
    createContentItem('吐き気', 'hakike', 'Nausea', 'word', '吐き気がします。', 'I feel nauseous.'),
    createContentItem('めまい', 'memai', 'Dizziness', 'word', 'めまいがします。', 'I feel dizzy.'),
    createContentItem('処方箋', 'shohousen', 'Prescription', 'word', '処方箋を出しますね。', 'I\'ll write you a prescription.'),
    createContentItem('診察', 'shinsatsu', 'Medical examination', 'word', '診察をお願いします。', 'I\'d like a medical examination, please.'),
    createContentItem('いつから痛いですか', 'itsu kara itai desu ka', 'Since when has it been hurting?', 'sentence', 'いつから痛いですか？', 'Since when has it been hurting?', [
      { target: 'いつ', native: 'when' },
      { target: 'から', native: 'from / since' },
      { target: '痛い', native: 'painful' },
      { target: 'ですか', native: 'is it?' },
    ]),
    createContentItem('血圧', 'ketsuatsu', 'Blood pressure', 'word', '血圧を測りましょう。', 'Let\'s measure your blood pressure.'),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
