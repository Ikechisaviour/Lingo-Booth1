// Russian (Русский) beginner lesson data
// Cyrillic script with Latin transliteration

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
  targetLang: 'ru',
  content: [
    createContentItem('Привет', 'privet', 'Hello (informal)', 'word', 'Привет, как дела?', 'Hello, how are you?'),
    createContentItem('Здравствуйте', 'zdravstvuyte', 'Hello (formal)', 'word', 'Здравствуйте, рад вас видеть.', 'Hello, glad to see you.'),
    createContentItem('Доброе утро', 'dobroye utro', 'Good morning', 'word', 'Доброе утро! Как спали?', 'Good morning! How did you sleep?'),
    createContentItem('Добрый день', 'dobryy den\'', 'Good afternoon', 'word', 'Добрый день, коллеги!', 'Good afternoon, colleagues!'),
    createContentItem('Добрый вечер', 'dobryy vecher', 'Good evening', 'word', 'Добрый вечер! Проходите.', 'Good evening! Come in.'),
    createContentItem('До свидания', 'do svidaniya', 'Goodbye (formal)', 'word', 'До свидания, было приятно.', 'Goodbye, it was nice.'),
    createContentItem('Пока', 'poka', 'Bye (informal)', 'word', 'Пока, увидимся!', 'Bye, see you!'),
    createContentItem('Спокойной ночи', 'spokoynoy nochi', 'Good night', 'word', 'Спокойной ночи, сладких снов.', 'Good night, sweet dreams.'),
    createContentItem('Да', 'da', 'Yes', 'word', 'Да, конечно.', 'Yes, of course.'),
    createContentItem('Нет', 'net', 'No', 'word', 'Нет, спасибо.', 'No, thank you.'),
    createContentItem('Спасибо', 'spasibo', 'Thank you', 'word', 'Спасибо за помощь!', 'Thank you for your help!'),
    createContentItem('Пожалуйста', 'pozhaluysta', 'Please / You\'re welcome', 'word', 'Пожалуйста, садитесь.', 'Please, sit down.'),
    createContentItem('Извините', 'izvinite', 'Excuse me / Sorry (formal)', 'word', 'Извините, можно вопрос?', 'Excuse me, may I ask a question?'),
    createContentItem('Как вас зовут?', 'kak vas zovut?', 'What is your name? (formal)', 'sentence', '', '', [
      { target: 'как', native: 'how/what' },
      { target: 'вас', native: 'you (formal)' },
      { target: 'зовут', native: 'is called' },
    ]),
    createContentItem('Меня зовут...', 'menya zovut...', 'My name is...', 'sentence', 'Меня зовут Анна.', 'My name is Anna.', [
      { target: 'меня', native: 'me' },
      { target: 'зовут', native: 'is called' },
    ]),
    createContentItem('Как дела?', 'kak dela?', 'How are you?', 'sentence', '', '', [
      { target: 'как', native: 'how' },
      { target: 'дела', native: 'things/affairs' },
    ]),
    createContentItem('Хорошо, спасибо.', 'khorosho, spasibo.', 'Good, thank you.', 'sentence', '', '', [
      { target: 'хорошо', native: 'good/well' },
      { target: 'спасибо', native: 'thank you' },
    ]),
    createContentItem('Очень приятно.', 'ochen\' priyatno.', 'Nice to meet you.', 'sentence', '', '', [
      { target: 'очень', native: 'very' },
      { target: 'приятно', native: 'pleasant' },
    ]),
    createContentItem('Откуда вы?', 'otkuda vy?', 'Where are you from?', 'sentence', '', '', [
      { target: 'откуда', native: 'from where' },
      { target: 'вы', native: 'you (formal)' },
    ]),
    createContentItem('Я из Америки.', 'ya iz ameriki.', 'I am from America.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'из', native: 'from' },
      { target: 'Америки', native: 'America' },
    ]),
    createContentItem('Вы говорите по-английски?', 'vy govorite po-angliyski?', 'Do you speak English?', 'sentence', '', '', [
      { target: 'вы', native: 'you (formal)' },
      { target: 'говорите', native: 'speak' },
      { target: 'по-английски', native: 'in English' },
    ]),
    createContentItem('Я не понимаю.', 'ya ne ponimayu.', 'I don\'t understand.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'не', native: 'not' },
      { target: 'понимаю', native: 'understand' },
    ]),
    createContentItem('Повторите, пожалуйста.', 'povtorite, pozhaluysta.', 'Please repeat.', 'sentence', '', '', [
      { target: 'повторите', native: 'repeat' },
      { target: 'пожалуйста', native: 'please' },
    ]),
    createContentItem('Я немного говорю по-русски.', 'ya nemnogo govoryu po-russki.', 'I speak a little Russian.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'немного', native: 'a little' },
      { target: 'говорю', native: 'speak' },
      { target: 'по-русски', native: 'in Russian' },
    ]),
    createContentItem('Рад познакомиться.', 'rad poznakomit\'sya.', 'Glad to meet you. (male)', 'sentence', '', '', [
      { target: 'рад', native: 'glad (male)' },
      { target: 'познакомиться', native: 'to get acquainted' },
    ]),
  ],
};

// ============================================================
// DAILY LIFE
// ============================================================
const dailyLife = {
  title: 'Daily Life & Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'ru',
  content: [
    createContentItem('Дом', 'dom', 'House / Home', 'word', 'Мой дом большой.', 'My house is big.'),
    createContentItem('Семья', 'sem\'ya', 'Family', 'word', 'У меня большая семья.', 'I have a big family.'),
    createContentItem('Мама', 'mama', 'Mom', 'word', 'Моя мама готовит ужин.', 'My mom is cooking dinner.'),
    createContentItem('Папа', 'papa', 'Dad', 'word', 'Мой папа на работе.', 'My dad is at work.'),
    createContentItem('Друг', 'drug', 'Friend (male)', 'word', 'Это мой лучший друг.', 'This is my best friend.'),
    createContentItem('Работа', 'rabota', 'Work / Job', 'word', 'Я иду на работу.', 'I am going to work.'),
    createContentItem('Школа', 'shkola', 'School', 'word', 'Дети в школе.', 'The children are at school.'),
    createContentItem('Время', 'vremya', 'Time', 'word', 'Сколько сейчас времени?', 'What time is it now?'),
    createContentItem('Утро', 'utro', 'Morning', 'word', 'Я люблю утро.', 'I love the morning.'),
    createContentItem('Вечер', 'vecher', 'Evening', 'word', 'Добрый вечер!', 'Good evening!'),
    createContentItem('Сегодня', 'segodnya', 'Today', 'word', 'Сегодня хорошая погода.', 'Today the weather is nice.'),
    createContentItem('Завтра', 'zavtra', 'Tomorrow', 'word', 'Завтра будет дождь.', 'Tomorrow it will rain.'),
    createContentItem('Вчера', 'vchera', 'Yesterday', 'word', 'Вчера было холодно.', 'Yesterday it was cold.'),
    createContentItem('Который час?', 'kotoryy chas?', 'What time is it?', 'sentence', '', '', [
      { target: 'который', native: 'which' },
      { target: 'час', native: 'hour' },
    ]),
    createContentItem('Я просыпаюсь в семь часов.', 'ya prosypayus\' v sem\' chasov.', 'I wake up at seven o\'clock.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'просыпаюсь', native: 'wake up' },
      { target: 'в семь часов', native: 'at seven o\'clock' },
    ]),
    createContentItem('Мне нужно идти.', 'mne nuzhno idti.', 'I need to go.', 'sentence', '', '', [
      { target: 'мне', native: 'to me / I' },
      { target: 'нужно', native: 'need' },
      { target: 'идти', native: 'to go' },
    ]),
    createContentItem('Я устал.', 'ya ustal.', 'I am tired. (male)', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'устал', native: 'tired (male)' },
    ]),
    createContentItem('Какая сегодня погода?', 'kakaya segodnya pogoda?', 'What is the weather like today?', 'sentence', '', '', [
      { target: 'какая', native: 'what kind of' },
      { target: 'сегодня', native: 'today' },
      { target: 'погода', native: 'weather' },
    ]),
    createContentItem('На улице холодно.', 'na ulitse kholodno.', 'It is cold outside.', 'sentence', '', '', [
      { target: 'на улице', native: 'outside / on the street' },
      { target: 'холодно', native: 'cold' },
    ]),
    createContentItem('Я живу в Москве.', 'ya zhivu v moskve.', 'I live in Moscow.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'живу', native: 'live' },
      { target: 'в Москве', native: 'in Moscow' },
    ]),
    createContentItem('Мне нравится читать.', 'mne nravitsya chitat\'.', 'I like to read.', 'sentence', '', '', [
      { target: 'мне', native: 'to me / I' },
      { target: 'нравится', native: 'like / enjoy' },
      { target: 'читать', native: 'to read' },
    ]),
    createContentItem('Я иду домой.', 'ya idu domoy.', 'I am going home.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'иду', native: 'am going (on foot)' },
      { target: 'домой', native: 'home (direction)' },
    ]),
    createContentItem('У меня есть вопрос.', 'u menya yest\' vopros.', 'I have a question.', 'sentence', '', '', [
      { target: 'у меня', native: 'I have (lit. at me)' },
      { target: 'есть', native: 'there is' },
      { target: 'вопрос', native: 'question' },
    ]),
    createContentItem('Можно войти?', 'mozhno voyti?', 'May I come in?', 'sentence', '', '', [
      { target: 'можно', native: 'may / is it possible' },
      { target: 'войти', native: 'to come in' },
    ]),
  ],
};

// ============================================================
// FOOD & DINING
// ============================================================
const food = {
  title: 'Food & Dining',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'ru',
  content: [
    createContentItem('Еда', 'yeda', 'Food', 'word', 'Еда очень вкусная.', 'The food is very tasty.'),
    createContentItem('Вода', 'voda', 'Water', 'word', 'Стакан воды, пожалуйста.', 'A glass of water, please.'),
    createContentItem('Хлеб', 'khleb', 'Bread', 'word', 'Свежий хлеб на столе.', 'Fresh bread is on the table.'),
    createContentItem('Молоко', 'moloko', 'Milk', 'word', 'Я пью молоко утром.', 'I drink milk in the morning.'),
    createContentItem('Мясо', 'myaso', 'Meat', 'word', 'Мясо хорошо приготовлено.', 'The meat is well cooked.'),
    createContentItem('Рыба', 'ryba', 'Fish', 'word', 'Я люблю рыбу.', 'I like fish.'),
    createContentItem('Суп', 'sup', 'Soup', 'word', 'Борщ — это русский суп.', 'Borscht is a Russian soup.'),
    createContentItem('Чай', 'chay', 'Tea', 'word', 'Чай с лимоном, пожалуйста.', 'Tea with lemon, please.'),
    createContentItem('Кофе', 'kofe', 'Coffee', 'word', 'Я хочу кофе.', 'I want coffee.'),
    createContentItem('Завтрак', 'zavtrak', 'Breakfast', 'word', 'Завтрак в восемь часов.', 'Breakfast is at eight o\'clock.'),
    createContentItem('Обед', 'obed', 'Lunch', 'word', 'Пора на обед.', 'It\'s time for lunch.'),
    createContentItem('Ужин', 'uzhin', 'Dinner', 'word', 'Ужин готов!', 'Dinner is ready!'),
    createContentItem('Ресторан', 'restoran', 'Restaurant', 'word', 'Этот ресторан хороший.', 'This restaurant is good.'),
    createContentItem('Вкусно', 'vkusno', 'Delicious / Tasty', 'word', 'Очень вкусно!', 'Very delicious!'),
    createContentItem('Меню', 'menyu', 'Menu', 'word', 'Можно меню, пожалуйста?', 'Can I have the menu, please?'),
    createContentItem('Я голоден.', 'ya goloden.', 'I am hungry. (male)', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'голоден', native: 'hungry (male)' },
    ]),
    createContentItem('Что вы порекомендуете?', 'chto vy porekomenduyete?', 'What do you recommend?', 'sentence', '', '', [
      { target: 'что', native: 'what' },
      { target: 'вы', native: 'you (formal)' },
      { target: 'порекомендуете', native: 'recommend' },
    ]),
    createContentItem('Счёт, пожалуйста.', 'schyot, pozhaluysta.', 'The check, please.', 'sentence', '', '', [
      { target: 'счёт', native: 'check / bill' },
      { target: 'пожалуйста', native: 'please' },
    ]),
    createContentItem('Я хочу заказать.', 'ya khochu zakazat\'.', 'I would like to order.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'хочу', native: 'want' },
      { target: 'заказать', native: 'to order' },
    ]),
    createContentItem('У вас есть меню на английском?', 'u vas yest\' menyu na angliyskom?', 'Do you have a menu in English?', 'sentence', '', '', [
      { target: 'у вас', native: 'do you have (lit. at you)' },
      { target: 'есть', native: 'there is' },
      { target: 'меню', native: 'menu' },
      { target: 'на английском', native: 'in English' },
    ]),
    createContentItem('Без сахара, пожалуйста.', 'bez sakhara, pozhaluysta.', 'Without sugar, please.', 'sentence', '', '', [
      { target: 'без', native: 'without' },
      { target: 'сахара', native: 'sugar' },
      { target: 'пожалуйста', native: 'please' },
    ]),
    createContentItem('Это очень вкусно!', 'eto ochen\' vkusno!', 'This is very tasty!', 'sentence', '', '', [
      { target: 'это', native: 'this' },
      { target: 'очень', native: 'very' },
      { target: 'вкусно', native: 'tasty' },
    ]),
    createContentItem('Я вегетарианец.', 'ya vegetarianets.', 'I am a vegetarian. (male)', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'вегетарианец', native: 'vegetarian (male)' },
    ]),
    createContentItem('У меня аллергия на орехи.', 'u menya allergiya na orekhi.', 'I am allergic to nuts.', 'sentence', '', '', [
      { target: 'у меня', native: 'I have' },
      { target: 'аллергия', native: 'allergy' },
      { target: 'на орехи', native: 'to nuts' },
    ]),
  ],
};

// ============================================================
// TRAVEL & TRANSPORTATION
// ============================================================
const travel = {
  title: 'Travel & Transportation',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'ru',
  content: [
    createContentItem('Аэропорт', 'aeroport', 'Airport', 'word', 'Аэропорт далеко отсюда.', 'The airport is far from here.'),
    createContentItem('Вокзал', 'vokzal', 'Train station', 'word', 'Вокзал в центре города.', 'The train station is in the city center.'),
    createContentItem('Метро', 'metro', 'Metro / Subway', 'word', 'Я еду на метро.', 'I am going by metro.'),
    createContentItem('Автобус', 'avtobus', 'Bus', 'word', 'Автобус приедет через пять минут.', 'The bus will arrive in five minutes.'),
    createContentItem('Такси', 'taksi', 'Taxi', 'word', 'Вызовите мне такси.', 'Call me a taxi.'),
    createContentItem('Поезд', 'poyezd', 'Train', 'word', 'Поезд отправляется в десять.', 'The train departs at ten.'),
    createContentItem('Билет', 'bilet', 'Ticket', 'word', 'Один билет, пожалуйста.', 'One ticket, please.'),
    createContentItem('Паспорт', 'pasport', 'Passport', 'word', 'Покажите паспорт.', 'Show your passport.'),
    createContentItem('Гостиница', 'gostinitsa', 'Hotel', 'word', 'Гостиница рядом с вокзалом.', 'The hotel is near the train station.'),
    createContentItem('Карта', 'karta', 'Map', 'word', 'У вас есть карта города?', 'Do you have a city map?'),
    createContentItem('Улица', 'ulitsa', 'Street', 'word', 'Какая это улица?', 'What street is this?'),
    createContentItem('Направо', 'napravo', 'To the right', 'word', 'Поверните направо.', 'Turn right.'),
    createContentItem('Налево', 'nalevo', 'To the left', 'word', 'Идите налево.', 'Go left.'),
    createContentItem('Прямо', 'pryamo', 'Straight ahead', 'word', 'Идите прямо.', 'Go straight ahead.'),
    createContentItem('Где находится...?', 'gde nakhoditsya...?', 'Where is...?', 'sentence', 'Где находится музей?', 'Where is the museum?', [
      { target: 'где', native: 'where' },
      { target: 'находится', native: 'is located' },
    ]),
    createContentItem('Как добраться до...?', 'kak dobrat\'sya do...?', 'How do I get to...?', 'sentence', 'Как добраться до центра?', 'How do I get to the center?', [
      { target: 'как', native: 'how' },
      { target: 'добраться', native: 'to get / to reach' },
      { target: 'до', native: 'to / until' },
    ]),
    createContentItem('Сколько стоит билет?', 'skol\'ko stoit bilet?', 'How much is a ticket?', 'sentence', '', '', [
      { target: 'сколько', native: 'how much' },
      { target: 'стоит', native: 'costs' },
      { target: 'билет', native: 'ticket' },
    ]),
    createContentItem('Я потерялся.', 'ya poteryalsya.', 'I am lost. (male)', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'потерялся', native: 'got lost (male)' },
    ]),
    createContentItem('Это далеко отсюда?', 'eto daleko otsyuda?', 'Is it far from here?', 'sentence', '', '', [
      { target: 'это', native: 'it / this' },
      { target: 'далеко', native: 'far' },
      { target: 'отсюда', native: 'from here' },
    ]),
    createContentItem('Мне нужно в аэропорт.', 'mne nuzhno v aeroport.', 'I need to get to the airport.', 'sentence', '', '', [
      { target: 'мне', native: 'to me / I' },
      { target: 'нужно', native: 'need' },
      { target: 'в аэропорт', native: 'to the airport' },
    ]),
    createContentItem('Когда следующий поезд?', 'kogda sleduyushchiy poyezd?', 'When is the next train?', 'sentence', '', '', [
      { target: 'когда', native: 'when' },
      { target: 'следующий', native: 'next' },
      { target: 'поезд', native: 'train' },
    ]),
    createContentItem('У меня бронь.', 'u menya bron\'.', 'I have a reservation.', 'sentence', '', '', [
      { target: 'у меня', native: 'I have' },
      { target: 'бронь', native: 'reservation' },
    ]),
    createContentItem('Можно вызвать такси?', 'mozhno vyzvat\' taksi?', 'Can you call a taxi?', 'sentence', '', '', [
      { target: 'можно', native: 'is it possible' },
      { target: 'вызвать', native: 'to call / to summon' },
      { target: 'такси', native: 'taxi' },
    ]),
    createContentItem('Остановите здесь, пожалуйста.', 'ostanovite zdes\', pozhaluysta.', 'Stop here, please.', 'sentence', '', '', [
      { target: 'остановите', native: 'stop' },
      { target: 'здесь', native: 'here' },
      { target: 'пожалуйста', native: 'please' },
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
  targetLang: 'ru',
  content: [
    createContentItem('Магазин', 'magazin', 'Store / Shop', 'word', 'Магазин открыт до девяти.', 'The store is open until nine.'),
    createContentItem('Рынок', 'rynok', 'Market', 'word', 'Мы идём на рынок.', 'We are going to the market.'),
    createContentItem('Деньги', 'den\'gi', 'Money', 'word', 'У меня нет денег.', 'I have no money.'),
    createContentItem('Рубль', 'rubl\'', 'Ruble', 'word', 'Это стоит сто рублей.', 'It costs one hundred rubles.'),
    createContentItem('Цена', 'tsena', 'Price', 'word', 'Какая цена?', 'What is the price?'),
    createContentItem('Дорого', 'dorogo', 'Expensive', 'word', 'Это слишком дорого.', 'This is too expensive.'),
    createContentItem('Дёшево', 'dyoshevo', 'Cheap', 'word', 'Здесь всё дёшево.', 'Everything is cheap here.'),
    createContentItem('Скидка', 'skidka', 'Discount', 'word', 'Есть скидка?', 'Is there a discount?'),
    createContentItem('Размер', 'razmer', 'Size', 'word', 'Какой у вас размер?', 'What is your size?'),
    createContentItem('Касса', 'kassa', 'Cash register / Checkout', 'word', 'Касса там.', 'The checkout is over there.'),
    createContentItem('Пакет', 'paket', 'Bag / Packet', 'word', 'Вам нужен пакет?', 'Do you need a bag?'),
    createContentItem('Карта', 'karta', 'Card', 'word', 'Вы принимаете карту?', 'Do you accept card?'),
    createContentItem('Сколько это стоит?', 'skol\'ko eto stoit?', 'How much does this cost?', 'sentence', '', '', [
      { target: 'сколько', native: 'how much' },
      { target: 'это', native: 'this' },
      { target: 'стоит', native: 'costs' },
    ]),
    createContentItem('Я хочу купить это.', 'ya khochu kupit\' eto.', 'I want to buy this.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'хочу', native: 'want' },
      { target: 'купить', native: 'to buy' },
      { target: 'это', native: 'this' },
    ]),
    createContentItem('Можно посмотреть?', 'mozhno posmotret\'?', 'Can I take a look?', 'sentence', '', '', [
      { target: 'можно', native: 'may / is it possible' },
      { target: 'посмотреть', native: 'to look / to see' },
    ]),
    createContentItem('Есть другой цвет?', 'yest\' drugoy tsvet?', 'Is there another color?', 'sentence', '', '', [
      { target: 'есть', native: 'is there' },
      { target: 'другой', native: 'another' },
      { target: 'цвет', native: 'color' },
    ]),
    createContentItem('Мне нужен размер побольше.', 'mne nuzhen razmer pobol\'she.', 'I need a bigger size.', 'sentence', '', '', [
      { target: 'мне', native: 'to me / I' },
      { target: 'нужен', native: 'need' },
      { target: 'размер', native: 'size' },
      { target: 'побольше', native: 'a bit bigger' },
    ]),
    createContentItem('Где можно примерить?', 'gde mozhno primerit\'?', 'Where can I try it on?', 'sentence', '', '', [
      { target: 'где', native: 'where' },
      { target: 'можно', native: 'is it possible' },
      { target: 'примерить', native: 'to try on' },
    ]),
    createContentItem('Я просто смотрю.', 'ya prosto smotryu.', 'I am just looking.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'просто', native: 'just' },
      { target: 'смотрю', native: 'am looking' },
    ]),
    createContentItem('Можно оплатить картой?', 'mozhno oplatit\' kartoy?', 'Can I pay by card?', 'sentence', '', '', [
      { target: 'можно', native: 'is it possible' },
      { target: 'оплатить', native: 'to pay' },
      { target: 'картой', native: 'by card' },
    ]),
    createContentItem('Дайте, пожалуйста, чек.', 'dayte, pozhaluysta, chek.', 'Please give me a receipt.', 'sentence', '', '', [
      { target: 'дайте', native: 'give (formal)' },
      { target: 'пожалуйста', native: 'please' },
      { target: 'чек', native: 'receipt' },
    ]),
    createContentItem('Можно вернуть это?', 'mozhno vernut\' eto?', 'Can I return this?', 'sentence', '', '', [
      { target: 'можно', native: 'is it possible' },
      { target: 'вернуть', native: 'to return' },
      { target: 'это', native: 'this' },
    ]),
  ],
};

// ============================================================
// BUSINESS
// ============================================================
const business = {
  title: 'Business & Work',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'ru',
  content: [
    createContentItem('Офис', 'ofis', 'Office', 'word', 'Офис на третьем этаже.', 'The office is on the third floor.'),
    createContentItem('Встреча', 'vstrecha', 'Meeting', 'word', 'Встреча в два часа.', 'The meeting is at two o\'clock.'),
    createContentItem('Компания', 'kompaniya', 'Company', 'word', 'Наша компания большая.', 'Our company is big.'),
    createContentItem('Директор', 'direktor', 'Director / Manager', 'word', 'Директор сейчас занят.', 'The director is busy right now.'),
    createContentItem('Сотрудник', 'sotrudnik', 'Employee / Colleague', 'word', 'Он наш новый сотрудник.', 'He is our new employee.'),
    createContentItem('Контракт', 'kontrakt', 'Contract', 'word', 'Подпишите контракт.', 'Sign the contract.'),
    createContentItem('Зарплата', 'zarplata', 'Salary', 'word', 'Зарплата приходит первого числа.', 'The salary arrives on the first.'),
    createContentItem('Проект', 'proyekt', 'Project', 'word', 'Проект почти готов.', 'The project is almost ready.'),
    createContentItem('Телефон', 'telefon', 'Phone', 'word', 'Мой рабочий телефон.', 'My work phone.'),
    createContentItem('Электронная почта', 'elektronnaya pochta', 'Email', 'word', 'Отправьте мне электронную почту.', 'Send me an email.'),
    createContentItem('Документ', 'dokument', 'Document', 'word', 'Документ на столе.', 'The document is on the desk.'),
    createContentItem('Компьютер', 'komp\'yuter', 'Computer', 'word', 'Компьютер не работает.', 'The computer is not working.'),
    createContentItem('У меня назначена встреча.', 'u menya naznachena vstrecha.', 'I have a scheduled meeting.', 'sentence', '', '', [
      { target: 'у меня', native: 'I have' },
      { target: 'назначена', native: 'scheduled' },
      { target: 'встреча', native: 'meeting' },
    ]),
    createContentItem('Я хотел бы обсудить проект.', 'ya khotel by obsudit\' proyekt.', 'I would like to discuss the project.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'хотел бы', native: 'would like' },
      { target: 'обсудить', native: 'to discuss' },
      { target: 'проект', native: 'project' },
    ]),
    createContentItem('Когда крайний срок?', 'kogda krayniy srok?', 'When is the deadline?', 'sentence', '', '', [
      { target: 'когда', native: 'when' },
      { target: 'крайний срок', native: 'deadline' },
    ]),
    createContentItem('Я отправлю вам отчёт.', 'ya otpravlyu vam otchyot.', 'I will send you the report.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'отправлю', native: 'will send' },
      { target: 'вам', native: 'to you (formal)' },
      { target: 'отчёт', native: 'report' },
    ]),
    createContentItem('Давайте назначим встречу.', 'davayte naznachim vstrechu.', 'Let\'s schedule a meeting.', 'sentence', '', '', [
      { target: 'давайте', native: 'let\'s' },
      { target: 'назначим', native: 'schedule' },
      { target: 'встречу', native: 'meeting' },
    ]),
    createContentItem('Я работаю в этой компании.', 'ya rabotayu v etoy kompanii.', 'I work at this company.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'работаю', native: 'work' },
      { target: 'в этой компании', native: 'at this company' },
    ]),
    createContentItem('Можно вашу визитку?', 'mozhno vashu vizitku?', 'May I have your business card?', 'sentence', '', '', [
      { target: 'можно', native: 'may I / is it possible' },
      { target: 'вашу', native: 'your (formal)' },
      { target: 'визитку', native: 'business card' },
    ]),
    createContentItem('Рад сотрудничеству.', 'rad sotrudnichestvu.', 'Glad to cooperate.', 'sentence', '', '', [
      { target: 'рад', native: 'glad' },
      { target: 'сотрудничеству', native: 'cooperation' },
    ]),
    createContentItem('Перезвоните мне, пожалуйста.', 'perezvonite mne, pozhaluysta.', 'Please call me back.', 'sentence', '', '', [
      { target: 'перезвоните', native: 'call back' },
      { target: 'мне', native: 'me' },
      { target: 'пожалуйста', native: 'please' },
    ]),
    createContentItem('Я согласен.', 'ya soglasen.', 'I agree. (male)', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'согласен', native: 'agree (male)' },
    ]),
    createContentItem('Мне нужно подумать.', 'mne nuzhno podumat\'.', 'I need to think about it.', 'sentence', '', '', [
      { target: 'мне', native: 'to me / I' },
      { target: 'нужно', native: 'need' },
      { target: 'подумать', native: 'to think' },
    ]),
  ],
};

// ============================================================
// HEALTHCARE
// ============================================================
const healthcare = {
  title: 'Healthcare & Emergencies',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'ru',
  content: [
    createContentItem('Больница', 'bol\'nitsa', 'Hospital', 'word', 'Больница рядом.', 'The hospital is nearby.'),
    createContentItem('Врач', 'vrach', 'Doctor', 'word', 'Мне нужен врач.', 'I need a doctor.'),
    createContentItem('Аптека', 'apteka', 'Pharmacy', 'word', 'Аптека за углом.', 'The pharmacy is around the corner.'),
    createContentItem('Лекарство', 'lekarstvo', 'Medicine', 'word', 'Примите лекарство.', 'Take the medicine.'),
    createContentItem('Боль', 'bol\'', 'Pain', 'word', 'У меня сильная боль.', 'I have severe pain.'),
    createContentItem('Голова', 'golova', 'Head', 'word', 'У меня болит голова.', 'I have a headache.'),
    createContentItem('Живот', 'zhivot', 'Stomach', 'word', 'У меня болит живот.', 'I have a stomachache.'),
    createContentItem('Температура', 'temperatura', 'Temperature / Fever', 'word', 'У меня высокая температура.', 'I have a high fever.'),
    createContentItem('Простуда', 'prostuda', 'Cold (illness)', 'word', 'У меня простуда.', 'I have a cold.'),
    createContentItem('Кашель', 'kashel\'', 'Cough', 'word', 'У меня сильный кашель.', 'I have a bad cough.'),
    createContentItem('Аллергия', 'allergiya', 'Allergy', 'word', 'У меня аллергия.', 'I have an allergy.'),
    createContentItem('Рецепт', 'retsept', 'Prescription', 'word', 'Вот мой рецепт.', 'Here is my prescription.'),
    createContentItem('Скорая помощь', 'skoraya pomoshch\'', 'Ambulance', 'word', 'Вызовите скорую помощь!', 'Call an ambulance!'),
    createContentItem('Помогите!', 'pomogite!', 'Help!', 'word', 'Помогите, пожалуйста!', 'Help, please!'),
    createContentItem('Мне плохо.', 'mne plokho.', 'I feel sick / I feel bad.', 'sentence', '', '', [
      { target: 'мне', native: 'to me / I' },
      { target: 'плохо', native: 'bad / sick' },
    ]),
    createContentItem('Мне нужна помощь.', 'mne nuzhna pomoshch\'.', 'I need help.', 'sentence', '', '', [
      { target: 'мне', native: 'to me / I' },
      { target: 'нужна', native: 'need (feminine)' },
      { target: 'помощь', native: 'help' },
    ]),
    createContentItem('Где ближайшая аптека?', 'gde blizhayshaya apteka?', 'Where is the nearest pharmacy?', 'sentence', '', '', [
      { target: 'где', native: 'where' },
      { target: 'ближайшая', native: 'nearest' },
      { target: 'аптека', native: 'pharmacy' },
    ]),
    createContentItem('У меня болит горло.', 'u menya bolit gorlo.', 'I have a sore throat.', 'sentence', '', '', [
      { target: 'у меня', native: 'I have (lit. at me)' },
      { target: 'болит', native: 'hurts' },
      { target: 'горло', native: 'throat' },
    ]),
    createContentItem('Я плохо себя чувствую.', 'ya plokho sebya chuvstvuyu.', 'I don\'t feel well.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'плохо', native: 'badly' },
      { target: 'себя', native: 'myself' },
      { target: 'чувствую', native: 'feel' },
    ]),
    createContentItem('Мне нужно к врачу.', 'mne nuzhno k vrachu.', 'I need to see a doctor.', 'sentence', '', '', [
      { target: 'мне', native: 'to me / I' },
      { target: 'нужно', native: 'need' },
      { target: 'к врачу', native: 'to the doctor' },
    ]),
    createContentItem('У меня есть страховка.', 'u menya yest\' strakhovka.', 'I have insurance.', 'sentence', '', '', [
      { target: 'у меня', native: 'I have' },
      { target: 'есть', native: 'there is' },
      { target: 'страховка', native: 'insurance' },
    ]),
    createContentItem('Вызовите скорую!', 'vyzovite skoruyu!', 'Call an ambulance!', 'sentence', '', '', [
      { target: 'вызовите', native: 'call (formal imperative)' },
      { target: 'скорую', native: 'ambulance (short for skoraya pomoshch)' },
    ]),
    createContentItem('Это срочно.', 'eto srochno.', 'It is urgent.', 'sentence', '', '', [
      { target: 'это', native: 'it / this' },
      { target: 'срочно', native: 'urgent' },
    ]),
    createContentItem('Я принимаю лекарства.', 'ya prinimayu lekarstva.', 'I am taking medication.', 'sentence', '', '', [
      { target: 'я', native: 'I' },
      { target: 'принимаю', native: 'am taking' },
      { target: 'лекарства', native: 'medication' },
    ]),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
