// Chinese (Mandarin) beginner lesson data - Simplified characters with pinyin
// All 7 categories: greetings, daily-life, food, travel, shopping, business, healthcare

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
  targetLang: 'zh',
  content: [
    createContentItem('你好', 'nǐ hǎo', 'Hello', 'word', '你好，你怎么样？', 'Hello, how are you?'),
    createContentItem('您好', 'nín hǎo', 'Hello (formal)', 'word', '您好，请问您贵姓？', 'Hello, may I ask your surname?'),
    createContentItem('早上好', 'zǎoshang hǎo', 'Good morning', 'word', '早上好，今天天气不错。', 'Good morning, the weather is nice today.'),
    createContentItem('下午好', 'xiàwǔ hǎo', 'Good afternoon', 'word', '下午好，你吃午饭了吗？', 'Good afternoon, have you eaten lunch?'),
    createContentItem('晚上好', 'wǎnshang hǎo', 'Good evening', 'word', '晚上好，欢迎来我家。', 'Good evening, welcome to my home.'),
    createContentItem('再见', 'zàijiàn', 'Goodbye', 'word', '再见，明天见！', 'Goodbye, see you tomorrow!'),
    createContentItem('谢谢', 'xièxie', 'Thank you', 'word', '谢谢你的帮助。', 'Thank you for your help.'),
    createContentItem('不客气', 'bú kèqi', 'You\'re welcome', 'word', '不客气，这是我应该做的。', 'You\'re welcome, it\'s what I should do.'),
    createContentItem('对不起', 'duìbuqǐ', 'I\'m sorry', 'word', '对不起，我迟到了。', 'I\'m sorry, I\'m late.'),
    createContentItem('没关系', 'méi guānxi', 'It doesn\'t matter', 'word', '没关系，不要担心。', 'It doesn\'t matter, don\'t worry.'),
    createContentItem('请', 'qǐng', 'Please', 'word', '请坐。', 'Please sit down.'),
    createContentItem('你叫什么名字？', 'nǐ jiào shénme míngzi?', 'What is your name?', 'sentence', '', '', [
      { target: '你', native: 'you', korean: '你', english: 'you' },
      { target: '叫', native: 'called', korean: '叫', english: 'called' },
      { target: '什么', native: 'what', korean: '什么', english: 'what' },
      { target: '名字', native: 'name', korean: '名字', english: 'name' },
    ]),
    createContentItem('我叫…', 'wǒ jiào...', 'My name is...', 'sentence', '我叫李明。', 'My name is Li Ming.', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '叫', native: 'am called', korean: '叫', english: 'am called' },
    ]),
    createContentItem('你好吗？', 'nǐ hǎo ma?', 'How are you?', 'sentence', '', '', [
      { target: '你', native: 'you', korean: '你', english: 'you' },
      { target: '好', native: 'good/well', korean: '好', english: 'good/well' },
      { target: '吗', native: 'question particle', korean: '吗', english: 'question particle' },
    ]),
    createContentItem('我很好', 'wǒ hěn hǎo', 'I\'m fine', 'sentence', '我很好，谢谢你。', 'I\'m fine, thank you.', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '很', native: 'very', korean: '很', english: 'very' },
      { target: '好', native: 'good', korean: '好', english: 'good' },
    ]),
    createContentItem('认识你很高兴', 'rènshi nǐ hěn gāoxìng', 'Nice to meet you', 'sentence', '', '', [
      { target: '认识', native: 'to know/meet', korean: '认识', english: 'to know/meet' },
      { target: '你', native: 'you', korean: '你', english: 'you' },
      { target: '很高兴', native: 'very happy', korean: '很高兴', english: 'very happy' },
    ]),
    createContentItem('你是哪国人？', 'nǐ shì nǎ guó rén?', 'What country are you from?', 'sentence', '', '', [
      { target: '你', native: 'you', korean: '你', english: 'you' },
      { target: '是', native: 'are', korean: '是', english: 'are' },
      { target: '哪国', native: 'which country', korean: '哪国', english: 'which country' },
      { target: '人', native: 'person', korean: '人', english: 'person' },
    ]),
    createContentItem('我是美国人', 'wǒ shì měiguó rén', 'I am American', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '是', native: 'am', korean: '是', english: 'am' },
      { target: '美国人', native: 'American', korean: '美国人', english: 'American' },
    ]),
    createContentItem('晚安', 'wǎn ān', 'Good night', 'word', '晚安，做个好梦。', 'Good night, sweet dreams.'),
    createContentItem('好久不见', 'hǎojiǔ bújiàn', 'Long time no see', 'sentence', '好久不见，你最近怎么样？', 'Long time no see, how have you been recently?', [
      { target: '好久', native: 'long time', korean: '好久', english: 'long time' },
      { target: '不见', native: 'not see', korean: '不见', english: 'not see' },
    ]),
    createContentItem('欢迎', 'huānyíng', 'Welcome', 'word', '欢迎来到中国！', 'Welcome to China!'),
    createContentItem('你多大了？', 'nǐ duō dà le?', 'How old are you?', 'sentence', '', '', [
      { target: '你', native: 'you', korean: '你', english: 'you' },
      { target: '多大', native: 'how old', korean: '多大', english: 'how old' },
      { target: '了', native: 'particle', korean: '了', english: 'particle' },
    ]),
    createContentItem('我二十五岁', 'wǒ èrshíwǔ suì', 'I am 25 years old', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '二十五', native: 'twenty-five', korean: '二十五', english: 'twenty-five' },
      { target: '岁', native: 'years old', korean: '岁', english: 'years old' },
    ]),
    createContentItem('请问', 'qǐngwèn', 'Excuse me (to ask)', 'word', '请问，洗手间在哪儿？', 'Excuse me, where is the restroom?'),
    createContentItem('明天见', 'míngtiān jiàn', 'See you tomorrow', 'sentence', '', '', [
      { target: '明天', native: 'tomorrow', korean: '明天', english: 'tomorrow' },
      { target: '见', native: 'see/meet', korean: '见', english: 'see/meet' },
    ]),
  ],
};

// ============================================================
// DAILY LIFE
// ============================================================
const dailyLife = {
  title: 'Everyday Life & Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  content: [
    createContentItem('家', 'jiā', 'Home / Family', 'word', '我的家在北京。', 'My home is in Beijing.'),
    createContentItem('学校', 'xuéxiào', 'School', 'word', '我每天去学校。', 'I go to school every day.'),
    createContentItem('工作', 'gōngzuò', 'Work / Job', 'word', '他的工作很忙。', 'His job is very busy.'),
    createContentItem('时间', 'shíjiān', 'Time', 'word', '你有时间吗？', 'Do you have time?'),
    createContentItem('今天', 'jīntiān', 'Today', 'word', '今天是星期一。', 'Today is Monday.'),
    createContentItem('昨天', 'zuótiān', 'Yesterday', 'word', '昨天我去了公园。', 'Yesterday I went to the park.'),
    createContentItem('明天', 'míngtiān', 'Tomorrow', 'word', '明天我们去看电影。', 'Tomorrow we will go see a movie.'),
    createContentItem('朋友', 'péngyou', 'Friend', 'word', '她是我的好朋友。', 'She is my good friend.'),
    createContentItem('电话', 'diànhuà', 'Telephone', 'word', '请给我打电话。', 'Please call me.'),
    createContentItem('现在几点？', 'xiànzài jǐ diǎn?', 'What time is it now?', 'sentence', '', '', [
      { target: '现在', native: 'now', korean: '现在', english: 'now' },
      { target: '几点', native: 'what time', korean: '几点', english: 'what time' },
    ]),
    createContentItem('我每天早上六点起床', 'wǒ měitiān zǎoshang liù diǎn qǐchuáng', 'I wake up at 6 every morning', 'sentence', '', '', [
      { target: '每天', native: 'every day', korean: '每天', english: 'every day' },
      { target: '早上', native: 'morning', korean: '早上', english: 'morning' },
      { target: '六点', native: 'six o\'clock', korean: '六点', english: 'six o\'clock' },
      { target: '起床', native: 'get up', korean: '起床', english: 'get up' },
    ]),
    createContentItem('睡觉', 'shuìjiào', 'To sleep', 'word', '我十一点睡觉。', 'I go to sleep at eleven.'),
    createContentItem('吃饭', 'chīfàn', 'To eat (a meal)', 'word', '我们一起吃饭吧。', 'Let\'s eat together.'),
    createContentItem('喝水', 'hē shuǐ', 'To drink water', 'word', '多喝水对身体好。', 'Drinking more water is good for your health.'),
    createContentItem('看书', 'kàn shū', 'To read a book', 'word', '我喜欢看书。', 'I like to read books.'),
    createContentItem('天气', 'tiānqì', 'Weather', 'word', '今天天气怎么样？', 'How is the weather today?'),
    createContentItem('今天天气很好', 'jīntiān tiānqì hěn hǎo', 'The weather is very nice today', 'sentence', '', '', [
      { target: '今天', native: 'today', korean: '今天', english: 'today' },
      { target: '天气', native: 'weather', korean: '天气', english: 'weather' },
      { target: '很好', native: 'very good', korean: '很好', english: 'very good' },
    ]),
    createContentItem('星期', 'xīngqī', 'Week / Day of the week', 'word', '今天星期几？', 'What day is it today?'),
    createContentItem('我在学中文', 'wǒ zài xué zhōngwén', 'I am studying Chinese', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '在', native: 'currently (progressive)', korean: '在', english: 'currently (progressive)' },
      { target: '学', native: 'study', korean: '学', english: 'study' },
      { target: '中文', native: 'Chinese', korean: '中文', english: 'Chinese' },
    ]),
    createContentItem('洗澡', 'xǐzǎo', 'To take a shower/bath', 'word', '我每天晚上洗澡。', 'I take a shower every evening.'),
    createContentItem('上班', 'shàngbān', 'To go to work', 'word', '我八点上班。', 'I go to work at eight.'),
    createContentItem('下班', 'xiàbān', 'To get off work', 'word', '你几点下班？', 'What time do you get off work?'),
    createContentItem('你住在哪儿？', 'nǐ zhù zài nǎr?', 'Where do you live?', 'sentence', '', '', [
      { target: '你', native: 'you', korean: '你', english: 'you' },
      { target: '住', native: 'live', korean: '住', english: 'live' },
      { target: '在', native: 'at/in', korean: '在', english: 'at/in' },
      { target: '哪儿', native: 'where', korean: '哪儿', english: 'where' },
    ]),
    createContentItem('我住在北京', 'wǒ zhù zài běijīng', 'I live in Beijing', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '住在', native: 'live in', korean: '住在', english: 'live in' },
      { target: '北京', native: 'Beijing', korean: '北京', english: 'Beijing' },
    ]),
    createContentItem('运动', 'yùndòng', 'Exercise / Sports', 'word', '我喜欢运动。', 'I like exercising.'),
  ],
};

// ============================================================
// FOOD & DINING
// ============================================================
const food = {
  title: 'Food & Dining',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'zh',
  content: [
    createContentItem('米饭', 'mǐfàn', 'Rice (cooked)', 'word', '我想要一碗米饭。', 'I would like a bowl of rice.'),
    createContentItem('面条', 'miàntiáo', 'Noodles', 'word', '这家的面条很好吃。', 'The noodles here are very delicious.'),
    createContentItem('饺子', 'jiǎozi', 'Dumplings', 'word', '我们一起包饺子吧。', 'Let\'s make dumplings together.'),
    createContentItem('菜', 'cài', 'Dish / Vegetable', 'word', '你想吃什么菜？', 'What dish would you like to eat?'),
    createContentItem('肉', 'ròu', 'Meat', 'word', '我不吃肉。', 'I don\'t eat meat.'),
    createContentItem('鸡肉', 'jīròu', 'Chicken', 'word', '这个鸡肉很嫩。', 'This chicken is very tender.'),
    createContentItem('牛肉', 'niúròu', 'Beef', 'word', '我喜欢吃牛肉面。', 'I like eating beef noodles.'),
    createContentItem('鱼', 'yú', 'Fish', 'word', '清蒸鱼很好吃。', 'Steamed fish is very delicious.'),
    createContentItem('水果', 'shuǐguǒ', 'Fruit', 'word', '你喜欢吃什么水果？', 'What fruit do you like to eat?'),
    createContentItem('茶', 'chá', 'Tea', 'word', '请喝茶。', 'Please have some tea.'),
    createContentItem('咖啡', 'kāfēi', 'Coffee', 'word', '我每天喝咖啡。', 'I drink coffee every day.'),
    createContentItem('啤酒', 'píjiǔ', 'Beer', 'word', '来一瓶啤酒。', 'One bottle of beer, please.'),
    createContentItem('我饿了', 'wǒ è le', 'I\'m hungry', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '饿', native: 'hungry', korean: '饿', english: 'hungry' },
      { target: '了', native: 'particle (change of state)', korean: '了', english: 'particle (change of state)' },
    ]),
    createContentItem('我渴了', 'wǒ kě le', 'I\'m thirsty', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '渴', native: 'thirsty', korean: '渴', english: 'thirsty' },
      { target: '了', native: 'particle (change of state)', korean: '了', english: 'particle (change of state)' },
    ]),
    createContentItem('服务员', 'fúwùyuán', 'Waiter / Waitress', 'word', '服务员，买单！', 'Waiter, the check please!'),
    createContentItem('菜单', 'càidān', 'Menu', 'word', '请给我菜单。', 'Please give me the menu.'),
    createContentItem('好吃', 'hǎochī', 'Delicious', 'word', '这个菜很好吃。', 'This dish is very delicious.'),
    createContentItem('我要点菜', 'wǒ yào diǎn cài', 'I want to order food', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '要', native: 'want to', korean: '要', english: 'want to' },
      { target: '点菜', native: 'order food', korean: '点菜', english: 'order food' },
    ]),
    createContentItem('买单', 'mǎidān', 'Check / Bill', 'word', '请买单。', 'Check, please.'),
    createContentItem('这个多少钱？', 'zhège duōshao qián?', 'How much is this?', 'sentence', '', '', [
      { target: '这个', native: 'this', korean: '这个', english: 'this' },
      { target: '多少', native: 'how much/many', korean: '多少', english: 'how much/many' },
      { target: '钱', native: 'money', korean: '钱', english: 'money' },
    ]),
    createContentItem('筷子', 'kuàizi', 'Chopsticks', 'word', '你会用筷子吗？', 'Can you use chopsticks?'),
    createContentItem('鸡蛋', 'jīdàn', 'Egg', 'word', '我早餐吃了两个鸡蛋。', 'I ate two eggs for breakfast.'),
    createContentItem('豆腐', 'dòufu', 'Tofu', 'word', '麻婆豆腐是四川菜。', 'Mapo tofu is a Sichuan dish.'),
    createContentItem('不要太辣', 'bú yào tài là', 'Not too spicy', 'sentence', '', '', [
      { target: '不要', native: 'don\'t want', korean: '不要', english: 'don\'t want' },
      { target: '太', native: 'too', korean: '太', english: 'too' },
      { target: '辣', native: 'spicy', korean: '辣', english: 'spicy' },
    ]),
    createContentItem('汤', 'tāng', 'Soup', 'word', '来一碗蛋花汤。', 'One bowl of egg drop soup, please.'),
  ],
};

// ============================================================
// TRAVEL
// ============================================================
const travel = {
  title: 'Travel & Transportation',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'zh',
  content: [
    createContentItem('机场', 'jīchǎng', 'Airport', 'word', '我们去机场。', 'We are going to the airport.'),
    createContentItem('火车站', 'huǒchē zhàn', 'Train station', 'word', '火车站在哪儿？', 'Where is the train station?'),
    createContentItem('地铁', 'dìtiě', 'Subway / Metro', 'word', '坐地铁很方便。', 'Taking the subway is very convenient.'),
    createContentItem('出租车', 'chūzūchē', 'Taxi', 'word', '我们打出租车吧。', 'Let\'s take a taxi.'),
    createContentItem('公共汽车', 'gōnggòng qìchē', 'Bus', 'word', '公共汽车站在前面。', 'The bus stop is ahead.'),
    createContentItem('酒店', 'jiǔdiàn', 'Hotel', 'word', '这家酒店很好。', 'This hotel is very nice.'),
    createContentItem('护照', 'hùzhào', 'Passport', 'word', '请出示您的护照。', 'Please show your passport.'),
    createContentItem('签证', 'qiānzhèng', 'Visa', 'word', '你需要签证吗？', 'Do you need a visa?'),
    createContentItem('行李', 'xíngli', 'Luggage', 'word', '我的行李在哪儿？', 'Where is my luggage?'),
    createContentItem('地图', 'dìtú', 'Map', 'word', '你有地图吗？', 'Do you have a map?'),
    createContentItem('我想去长城', 'wǒ xiǎng qù chángchéng', 'I want to go to the Great Wall', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '想', native: 'want to', korean: '想', english: 'want to' },
      { target: '去', native: 'go to', korean: '去', english: 'go to' },
      { target: '长城', native: 'Great Wall', korean: '长城', english: 'Great Wall' },
    ]),
    createContentItem('怎么去？', 'zěnme qù?', 'How do I get there?', 'sentence', '天安门怎么去？', 'How do I get to Tiananmen?', [
      { target: '怎么', native: 'how', korean: '怎么', english: 'how' },
      { target: '去', native: 'go', korean: '去', english: 'go' },
    ]),
    createContentItem('左', 'zuǒ', 'Left', 'word', '请往左拐。', 'Please turn left.'),
    createContentItem('右', 'yòu', 'Right', 'word', '请往右拐。', 'Please turn right.'),
    createContentItem('直走', 'zhí zǒu', 'Go straight', 'word', '一直往前走。', 'Keep going straight.'),
    createContentItem('远', 'yuǎn', 'Far', 'word', '很远吗？', 'Is it far?'),
    createContentItem('近', 'jìn', 'Near / Close', 'word', '很近，走路五分钟。', 'Very close, five minutes on foot.'),
    createContentItem('我迷路了', 'wǒ mílù le', 'I\'m lost', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '迷路', native: 'lost (the way)', korean: '迷路', english: 'lost (the way)' },
      { target: '了', native: 'particle', korean: '了', english: 'particle' },
    ]),
    createContentItem('这里', 'zhèlǐ', 'Here', 'word', '请在这里等。', 'Please wait here.'),
    createContentItem('那里', 'nàlǐ', 'There', 'word', '洗手间在那里。', 'The restroom is over there.'),
    createContentItem('我要一张票', 'wǒ yào yì zhāng piào', 'I want one ticket', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '要', native: 'want', korean: '要', english: 'want' },
      { target: '一张', native: 'one (flat object)', korean: '一张', english: 'one (flat object)' },
      { target: '票', native: 'ticket', korean: '票', english: 'ticket' },
    ]),
    createContentItem('洗手间在哪儿？', 'xǐshǒujiān zài nǎr?', 'Where is the restroom?', 'sentence', '', '', [
      { target: '洗手间', native: 'restroom', korean: '洗手间', english: 'restroom' },
      { target: '在', native: 'at/in', korean: '在', english: 'at/in' },
      { target: '哪儿', native: 'where', korean: '哪儿', english: 'where' },
    ]),
    createContentItem('飞机', 'fēijī', 'Airplane', 'word', '飞机几点起飞？', 'What time does the plane take off?'),
    createContentItem('到了', 'dào le', 'Arrived', 'word', '我们到了。', 'We have arrived.'),
    createContentItem('请问这是哪儿？', 'qǐngwèn zhè shì nǎr?', 'Excuse me, where is this?', 'sentence', '', '', [
      { target: '请问', native: 'excuse me', korean: '请问', english: 'excuse me' },
      { target: '这', native: 'this', korean: '这', english: 'this' },
      { target: '是', native: 'is', korean: '是', english: 'is' },
      { target: '哪儿', native: 'where', korean: '哪儿', english: 'where' },
    ]),
  ],
};

// ============================================================
// SHOPPING
// ============================================================
const shopping = {
  title: 'Shopping & Money',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'zh',
  content: [
    createContentItem('多少钱？', 'duōshao qián?', 'How much?', 'sentence', '这件衣服多少钱？', 'How much is this clothing?', [
      { target: '多少', native: 'how much', korean: '多少', english: 'how much' },
      { target: '钱', native: 'money', korean: '钱', english: 'money' },
    ]),
    createContentItem('太贵了', 'tài guì le', 'Too expensive', 'sentence', '', '', [
      { target: '太', native: 'too', korean: '太', english: 'too' },
      { target: '贵', native: 'expensive', korean: '贵', english: 'expensive' },
      { target: '了', native: 'particle', korean: '了', english: 'particle' },
    ]),
    createContentItem('便宜', 'piányi', 'Cheap / Inexpensive', 'word', '这个比较便宜。', 'This one is cheaper.'),
    createContentItem('能便宜一点吗？', 'néng piányi yìdiǎn ma?', 'Can it be a little cheaper?', 'sentence', '', '', [
      { target: '能', native: 'can', korean: '能', english: 'can' },
      { target: '便宜', native: 'cheap', korean: '便宜', english: 'cheap' },
      { target: '一点', native: 'a little', korean: '一点', english: 'a little' },
      { target: '吗', native: 'question particle', korean: '吗', english: 'question particle' },
    ]),
    createContentItem('我想买…', 'wǒ xiǎng mǎi...', 'I want to buy...', 'sentence', '我想买这个。', 'I want to buy this.', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '想', native: 'want to', korean: '想', english: 'want to' },
      { target: '买', native: 'buy', korean: '买', english: 'buy' },
    ]),
    createContentItem('衣服', 'yīfu', 'Clothes', 'word', '这件衣服很好看。', 'This piece of clothing looks great.'),
    createContentItem('鞋子', 'xiézi', 'Shoes', 'word', '我要买一双鞋子。', 'I want to buy a pair of shoes.'),
    createContentItem('大', 'dà', 'Big / Large', 'word', '有大号的吗？', 'Do you have a large size?'),
    createContentItem('小', 'xiǎo', 'Small', 'word', '这个太小了。', 'This one is too small.'),
    createContentItem('可以试穿吗？', 'kěyǐ shìchuān ma?', 'Can I try it on?', 'sentence', '', '', [
      { target: '可以', native: 'can/may', korean: '可以', english: 'can/may' },
      { target: '试穿', native: 'try on', korean: '试穿', english: 'try on' },
      { target: '吗', native: 'question particle', korean: '吗', english: 'question particle' },
    ]),
    createContentItem('现金', 'xiànjīn', 'Cash', 'word', '你们收现金吗？', 'Do you accept cash?'),
    createContentItem('信用卡', 'xìnyòngkǎ', 'Credit card', 'word', '可以刷信用卡吗？', 'Can I pay with a credit card?'),
    createContentItem('超市', 'chāoshì', 'Supermarket', 'word', '超市在哪儿？', 'Where is the supermarket?'),
    createContentItem('商店', 'shāngdiàn', 'Store / Shop', 'word', '这家商店很大。', 'This store is very big.'),
    createContentItem('颜色', 'yánsè', 'Color', 'word', '你喜欢什么颜色？', 'What color do you like?'),
    createContentItem('红色', 'hóngsè', 'Red', 'word', '我喜欢红色的。', 'I like the red one.'),
    createContentItem('蓝色', 'lánsè', 'Blue', 'word', '有蓝色的吗？', 'Do you have a blue one?'),
    createContentItem('我只是看看', 'wǒ zhǐshì kànkan', 'I\'m just looking', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '只是', native: 'just/only', korean: '只是', english: 'just/only' },
      { target: '看看', native: 'take a look', korean: '看看', english: 'take a look' },
    ]),
    createContentItem('打折', 'dǎzhé', 'Discount', 'word', '今天打折吗？', 'Is there a discount today?'),
    createContentItem('袋子', 'dàizi', 'Bag', 'word', '需要袋子吗？', 'Do you need a bag?'),
    createContentItem('找钱', 'zhǎo qián', 'Change (money back)', 'word', '请找钱。', 'Please give change.'),
    createContentItem('有没有别的？', 'yǒu méiyǒu bié de?', 'Do you have any others?', 'sentence', '', '', [
      { target: '有没有', native: 'is there / do you have', korean: '有没有', english: 'is there / do you have' },
      { target: '别的', native: 'other', korean: '别的', english: 'other' },
    ]),
    createContentItem('收据', 'shōujù', 'Receipt', 'word', '请给我收据。', 'Please give me a receipt.'),
    createContentItem('手机', 'shǒujī', 'Mobile phone', 'word', '我想买一个新手机。', 'I want to buy a new mobile phone.'),
  ],
};

// ============================================================
// BUSINESS
// ============================================================
const business = {
  title: 'Business & Office',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'zh',
  content: [
    createContentItem('公司', 'gōngsī', 'Company', 'word', '你在哪个公司工作？', 'Which company do you work at?'),
    createContentItem('办公室', 'bàngōngshì', 'Office', 'word', '我在办公室工作。', 'I work in an office.'),
    createContentItem('会议', 'huìyì', 'Meeting', 'word', '下午有一个会议。', 'There is a meeting in the afternoon.'),
    createContentItem('经理', 'jīnglǐ', 'Manager', 'word', '他是我们的经理。', 'He is our manager.'),
    createContentItem('同事', 'tóngshì', 'Colleague', 'word', '她是我的同事。', 'She is my colleague.'),
    createContentItem('名片', 'míngpiàn', 'Business card', 'word', '这是我的名片。', 'This is my business card.'),
    createContentItem('电脑', 'diànnǎo', 'Computer', 'word', '我需要一台电脑。', 'I need a computer.'),
    createContentItem('电子邮件', 'diànzǐ yóujiàn', 'Email', 'word', '请发电子邮件给我。', 'Please send me an email.'),
    createContentItem('合同', 'hétong', 'Contract', 'word', '请签这份合同。', 'Please sign this contract.'),
    createContentItem('你做什么工作？', 'nǐ zuò shénme gōngzuò?', 'What do you do for work?', 'sentence', '', '', [
      { target: '你', native: 'you', korean: '你', english: 'you' },
      { target: '做', native: 'do', korean: '做', english: 'do' },
      { target: '什么', native: 'what', korean: '什么', english: 'what' },
      { target: '工作', native: 'work/job', korean: '工作', english: 'work/job' },
    ]),
    createContentItem('我是老师', 'wǒ shì lǎoshī', 'I am a teacher', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '是', native: 'am', korean: '是', english: 'am' },
      { target: '老师', native: 'teacher', korean: '老师', english: 'teacher' },
    ]),
    createContentItem('工资', 'gōngzī', 'Salary', 'word', '工资什么时候发？', 'When will the salary be paid?'),
    createContentItem('项目', 'xiàngmù', 'Project', 'word', '这个项目很重要。', 'This project is very important.'),
    createContentItem('报告', 'bàogào', 'Report', 'word', '请写一份报告。', 'Please write a report.'),
    createContentItem('我们来讨论一下', 'wǒmen lái tǎolùn yíxià', 'Let\'s discuss this', 'sentence', '', '', [
      { target: '我们', native: 'we', korean: '我们', english: 'we' },
      { target: '来', native: 'let\'s (suggestion)', korean: '来', english: 'let\'s (suggestion)' },
      { target: '讨论', native: 'discuss', korean: '讨论', english: 'discuss' },
      { target: '一下', native: 'a bit', korean: '一下', english: 'a bit' },
    ]),
    createContentItem('忙', 'máng', 'Busy', 'word', '最近很忙。', 'I\'ve been very busy recently.'),
    createContentItem('加班', 'jiābān', 'Overtime', 'word', '今天要加班。', 'I have to work overtime today.'),
    createContentItem('请假', 'qǐngjià', 'Ask for leave', 'word', '我想请假一天。', 'I want to take one day off.'),
    createContentItem('开会', 'kāihuì', 'To have a meeting', 'word', '我们九点开会。', 'We have a meeting at nine.'),
    createContentItem('合作', 'hézuò', 'Cooperation / To cooperate', 'word', '期待和您合作。', 'Looking forward to cooperating with you.'),
    createContentItem('这份文件请看一下', 'zhè fèn wénjiàn qǐng kàn yíxià', 'Please take a look at this document', 'sentence', '', '', [
      { target: '这份', native: 'this (document)', korean: '这份', english: 'this (document)' },
      { target: '文件', native: 'document', korean: '文件', english: 'document' },
      { target: '请', native: 'please', korean: '请', english: 'please' },
      { target: '看一下', native: 'take a look', korean: '看一下', english: 'take a look' },
    ]),
    createContentItem('面试', 'miànshì', 'Interview', 'word', '明天有一个面试。', 'There is an interview tomorrow.'),
    createContentItem('客户', 'kèhù', 'Client / Customer', 'word', '客户下午来。', 'The client is coming in the afternoon.'),
  ],
};

// ============================================================
// HEALTHCARE
// ============================================================
const healthcare = {
  title: 'Health & Medical',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'zh',
  content: [
    createContentItem('医院', 'yīyuàn', 'Hospital', 'word', '医院在哪儿？', 'Where is the hospital?'),
    createContentItem('医生', 'yīshēng', 'Doctor', 'word', '我要看医生。', 'I need to see a doctor.'),
    createContentItem('药', 'yào', 'Medicine', 'word', '你吃药了吗？', 'Have you taken your medicine?'),
    createContentItem('药店', 'yàodiàn', 'Pharmacy', 'word', '附近有药店吗？', 'Is there a pharmacy nearby?'),
    createContentItem('头疼', 'tóu téng', 'Headache', 'word', '我头疼。', 'I have a headache.'),
    createContentItem('肚子疼', 'dùzi téng', 'Stomachache', 'word', '我肚子疼。', 'I have a stomachache.'),
    createContentItem('发烧', 'fāshāo', 'Fever', 'word', '我发烧了。', 'I have a fever.'),
    createContentItem('感冒', 'gǎnmào', 'Cold (illness)', 'word', '我感冒了。', 'I have a cold.'),
    createContentItem('咳嗽', 'késou', 'Cough', 'word', '我一直咳嗽。', 'I keep coughing.'),
    createContentItem('过敏', 'guòmǐn', 'Allergy', 'word', '我对花生过敏。', 'I am allergic to peanuts.'),
    createContentItem('我不舒服', 'wǒ bù shūfu', 'I don\'t feel well', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '不', native: 'not', korean: '不', english: 'not' },
      { target: '舒服', native: 'comfortable', korean: '舒服', english: 'comfortable' },
    ]),
    createContentItem('哪里不舒服？', 'nǎlǐ bù shūfu?', 'Where does it hurt?', 'sentence', '', '', [
      { target: '哪里', native: 'where', korean: '哪里', english: 'where' },
      { target: '不', native: 'not', korean: '不', english: 'not' },
      { target: '舒服', native: 'comfortable', korean: '舒服', english: 'comfortable' },
    ]),
    createContentItem('请帮我叫救护车', 'qǐng bāng wǒ jiào jiùhùchē', 'Please call an ambulance for me', 'sentence', '', '', [
      { target: '请', native: 'please', korean: '请', english: 'please' },
      { target: '帮我', native: 'help me', korean: '帮我', english: 'help me' },
      { target: '叫', native: 'call', korean: '叫', english: 'call' },
      { target: '救护车', native: 'ambulance', korean: '救护车', english: 'ambulance' },
    ]),
    createContentItem('牙疼', 'yá téng', 'Toothache', 'word', '我牙疼得厉害。', 'My toothache is severe.'),
    createContentItem('受伤', 'shòushāng', 'Injured', 'word', '他受伤了。', 'He is injured.'),
    createContentItem('验血', 'yàn xuè', 'Blood test', 'word', '你需要验血。', 'You need a blood test.'),
    createContentItem('打针', 'dǎzhēn', 'Injection / Shot', 'word', '我怕打针。', 'I\'m afraid of injections.'),
    createContentItem('我需要看医生', 'wǒ xūyào kàn yīshēng', 'I need to see a doctor', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '需要', native: 'need to', korean: '需要', english: 'need to' },
      { target: '看', native: 'see', korean: '看', english: 'see' },
      { target: '医生', native: 'doctor', korean: '医生', english: 'doctor' },
    ]),
    createContentItem('处方', 'chǔfāng', 'Prescription', 'word', '这是你的处方。', 'This is your prescription.'),
    createContentItem('保险', 'bǎoxiǎn', 'Insurance', 'word', '你有医疗保险吗？', 'Do you have medical insurance?'),
    createContentItem('我对这个药过敏', 'wǒ duì zhège yào guòmǐn', 'I am allergic to this medicine', 'sentence', '', '', [
      { target: '我', native: 'I', korean: '我', english: 'I' },
      { target: '对', native: 'toward/to', korean: '对', english: 'toward/to' },
      { target: '这个药', native: 'this medicine', korean: '这个药', english: 'this medicine' },
      { target: '过敏', native: 'allergic', korean: '过敏', english: 'allergic' },
    ]),
    createContentItem('挂号', 'guàhào', 'Register (at hospital)', 'word', '请先去挂号。', 'Please register first.'),
    createContentItem('体温', 'tǐwēn', 'Body temperature', 'word', '请量一下体温。', 'Please take your temperature.'),
    createContentItem('休息', 'xiūxi', 'Rest', 'word', '你需要好好休息。', 'You need to rest well.'),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
