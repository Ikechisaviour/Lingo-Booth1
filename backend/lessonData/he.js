// Hebrew (he) beginner lesson data
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
// GREETINGS
// ============================================================
const greetings = {
  title: 'Basic Greetings & Introductions',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'he',
  content: [
    createContentItem('שלום', 'shalom', 'Hello / Peace'),
    createContentItem('בוקר טוב', 'boker tov', 'Good morning'),
    createContentItem('ערב טוב', 'erev tov', 'Good evening'),
    createContentItem('לילה טוב', 'layla tov', 'Good night'),
    createContentItem('להתראות', 'lehitraot', 'Goodbye'),
    createContentItem('תודה', 'toda', 'Thank you'),
    createContentItem('תודה רבה', 'toda raba', 'Thank you very much'),
    createContentItem('בבקשה', 'bevakasha', 'Please / You are welcome'),
    createContentItem('סליחה', 'slicha', 'Excuse me / Sorry'),
    createContentItem('כן', 'ken', 'Yes'),
    createContentItem('לא', 'lo', 'No'),
    createContentItem('מה שלומך?', 'ma shlomcha?', 'How are you? (to male)', 'sentence', 'שלום, מה שלומך?', 'Hello, how are you?', [
      { korean: 'מה', english: 'what' },
      { korean: 'שלומך', english: 'your well-being' },
    ]),
    createContentItem('מה שלומך?', 'ma shlomech?', 'How are you? (to female)', 'sentence', 'היי, מה שלומך?', 'Hey, how are you?', [
      { korean: 'מה', english: 'what' },
      { korean: 'שלומך', english: 'your well-being (f)' },
    ]),
    createContentItem('אני בסדר, תודה.', 'ani beseder, toda.', 'I am fine, thank you.', 'sentence', 'אני בסדר, תודה. ואתה?', 'I am fine, thank you. And you?', [
      { korean: 'אני', english: 'I' },
      { korean: 'בסדר', english: 'fine / okay' },
      { korean: 'תודה', english: 'thank you' },
    ]),
    createContentItem('נעים מאוד', 'naim meod', 'Nice to meet you'),
    createContentItem('איך קוראים לך?', 'eich korim lecha?', 'What is your name? (to male)', 'sentence', 'סליחה, איך קוראים לך?', 'Excuse me, what is your name?', [
      { korean: 'איך', english: 'how' },
      { korean: 'קוראים', english: 'they call' },
      { korean: 'לך', english: 'to you' },
    ]),
    createContentItem('קוראים לי דוד.', 'korim li David.', 'My name is David.', 'sentence', 'קוראים לי דוד, ולך?', 'My name is David, and yours?', [
      { korean: 'קוראים', english: 'they call' },
      { korean: 'לי', english: 'me' },
      { korean: 'דוד', english: 'David' },
    ]),
    createContentItem('מאיפה אתה?', 'meeifo ata?', 'Where are you from? (to male)', 'sentence', 'מאיפה אתה בא?', 'Where do you come from?', [
      { korean: 'מאיפה', english: 'from where' },
      { korean: 'אתה', english: 'you (m)' },
    ]),
    createContentItem('אני מאמריקה.', 'ani meamerika.', 'I am from America.', 'sentence', 'אני מאמריקה, ואתה?', 'I am from America, and you?', [
      { korean: 'אני', english: 'I' },
      { korean: 'מאמריקה', english: 'from America' },
    ]),
    createContentItem('מה נשמע?', 'ma nishma?', 'What is up?', 'sentence', 'היי, מה נשמע?', 'Hey, what is up?', [
      { korean: 'מה', english: 'what' },
      { korean: 'נשמע', english: 'is heard' },
    ]),
    createContentItem('הכל טוב.', 'hakol tov.', 'Everything is good.', 'sentence', 'הכל טוב, ברוך השם.', 'Everything is good, thank God.', [
      { korean: 'הכל', english: 'everything' },
      { korean: 'טוב', english: 'good' },
    ]),
    createContentItem('אני שמח להכיר אותך.', 'ani same\'ach lehakir otcha.', 'I am happy to meet you.', 'sentence', '', '', [
      { korean: 'אני', english: 'I' },
      { korean: 'שמח', english: 'happy' },
      { korean: 'להכיר', english: 'to meet / to know' },
      { korean: 'אותך', english: 'you' },
    ]),
    createContentItem('יום טוב', 'yom tov', 'Good day'),
    createContentItem('ביי', 'bye', 'Bye'),
    createContentItem('שלום וברכה', 'shalom uvracha', 'Hello and blessings'),
  ],
};

// ============================================================
// DAILY LIFE
// ============================================================
const dailyLife = {
  title: 'Everyday Life & Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'he',
  content: [
    createContentItem('בית', 'bayit', 'House / Home'),
    createContentItem('משפחה', 'mishpacha', 'Family'),
    createContentItem('עבודה', 'avoda', 'Work'),
    createContentItem('בית ספר', 'beit sefer', 'School'),
    createContentItem('מים', 'mayim', 'Water'),
    createContentItem('אוכל', 'ochel', 'Food'),
    createContentItem('שעה', 'sha\'a', 'Hour / Time'),
    createContentItem('יום', 'yom', 'Day'),
    createContentItem('לילה', 'layla', 'Night'),
    createContentItem('חבר', 'chaver', 'Friend (male)'),
    createContentItem('חברה', 'chavera', 'Friend (female)'),
    createContentItem('ילד', 'yeled', 'Boy / Child (male)'),
    createContentItem('ילדה', 'yalda', 'Girl / Child (female)'),
    createContentItem('מה השעה?', 'ma hasha\'a?', 'What time is it?', 'sentence', 'סליחה, מה השעה?', 'Excuse me, what time is it?', [
      { korean: 'מה', english: 'what' },
      { korean: 'השעה', english: 'the time' },
    ]),
    createContentItem('אני קם בשבע.', 'ani kam besheva.', 'I wake up at seven.', 'sentence', 'אני קם בשבע בבוקר.', 'I wake up at seven in the morning.', [
      { korean: 'אני', english: 'I' },
      { korean: 'קם', english: 'wake up / get up' },
      { korean: 'בשבע', english: 'at seven' },
    ]),
    createContentItem('אני הולך לעבודה.', 'ani holech laavoda.', 'I go to work.', 'sentence', 'אני הולך לעבודה כל יום.', 'I go to work every day.', [
      { korean: 'אני', english: 'I' },
      { korean: 'הולך', english: 'go / walk' },
      { korean: 'לעבודה', english: 'to work' },
    ]),
    createContentItem('אני גר בתל אביב.', 'ani gar betel aviv.', 'I live in Tel Aviv.', 'sentence', '', '', [
      { korean: 'אני', english: 'I' },
      { korean: 'גר', english: 'live' },
      { korean: 'בתל אביב', english: 'in Tel Aviv' },
    ]),
    createContentItem('אני לומד עברית.', 'ani lomed ivrit.', 'I am learning Hebrew.', 'sentence', 'אני לומד עברית כל יום.', 'I learn Hebrew every day.', [
      { korean: 'אני', english: 'I' },
      { korean: 'לומד', english: 'learning / studying' },
      { korean: 'עברית', english: 'Hebrew' },
    ]),
    createContentItem('אני אוהב את המשפחה שלי.', 'ani ohev et hamishpacha sheli.', 'I love my family.', 'sentence', '', '', [
      { korean: 'אני', english: 'I' },
      { korean: 'אוהב', english: 'love' },
      { korean: 'את', english: '(object marker)' },
      { korean: 'המשפחה שלי', english: 'my family' },
    ]),
    createContentItem('איפה אתה גר?', 'eifo ata gar?', 'Where do you live?', 'sentence', '', '', [
      { korean: 'איפה', english: 'where' },
      { korean: 'אתה', english: 'you (m)' },
      { korean: 'גר', english: 'live' },
    ]),
    createContentItem('מזג אוויר', 'mezeg avir', 'Weather'),
    createContentItem('טלפון', 'telefon', 'Telephone'),
    createContentItem('מכונית', 'mechonit', 'Car'),
    createContentItem('אוטובוס', 'otobus', 'Bus'),
  ],
};

// ============================================================
// FOOD
// ============================================================
const food = {
  title: 'Food & Dining',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'he',
  content: [
    createContentItem('לחם', 'lechem', 'Bread'),
    createContentItem('מים', 'mayim', 'Water'),
    createContentItem('קפה', 'kafe', 'Coffee'),
    createContentItem('תה', 'te', 'Tea'),
    createContentItem('חלב', 'chalav', 'Milk'),
    createContentItem('בשר', 'basar', 'Meat'),
    createContentItem('עוף', 'of', 'Chicken'),
    createContentItem('דג', 'dag', 'Fish'),
    createContentItem('אורז', 'orez', 'Rice'),
    createContentItem('ירקות', 'yerakot', 'Vegetables'),
    createContentItem('פירות', 'perot', 'Fruits'),
    createContentItem('סלט', 'salat', 'Salad'),
    createContentItem('ביצה', 'beitza', 'Egg'),
    createContentItem('גבינה', 'gvina', 'Cheese'),
    createContentItem('מסעדה', 'misada', 'Restaurant'),
    createContentItem('אני רעב.', 'ani raev.', 'I am hungry. (male)', 'sentence', 'אני רעב מאוד.', 'I am very hungry.', [
      { korean: 'אני', english: 'I' },
      { korean: 'רעב', english: 'hungry' },
    ]),
    createContentItem('אני רוצה לאכול.', 'ani rotze leechol.', 'I want to eat.', 'sentence', 'אני רוצה לאכול משהו.', 'I want to eat something.', [
      { korean: 'אני', english: 'I' },
      { korean: 'רוצה', english: 'want' },
      { korean: 'לאכול', english: 'to eat' },
    ]),
    createContentItem('מה אתה רוצה לשתות?', 'ma ata rotze lishtot?', 'What do you want to drink?', 'sentence', '', '', [
      { korean: 'מה', english: 'what' },
      { korean: 'אתה', english: 'you (m)' },
      { korean: 'רוצה', english: 'want' },
      { korean: 'לשתות', english: 'to drink' },
    ]),
    createContentItem('בבקשה את החשבון.', 'bevakasha et hacheshbon.', 'The bill, please.', 'sentence', '', '', [
      { korean: 'בבקשה', english: 'please' },
      { korean: 'את', english: '(object marker)' },
      { korean: 'החשבון', english: 'the bill' },
    ]),
    createContentItem('זה טעים מאוד!', 'ze taim meod!', 'This is very tasty!', 'sentence', 'האוכל הזה טעים מאוד!', 'This food is very tasty!', [
      { korean: 'זה', english: 'this' },
      { korean: 'טעים', english: 'tasty' },
      { korean: 'מאוד', english: 'very' },
    ]),
    createContentItem('תפריט', 'tafrit', 'Menu'),
    createContentItem('מלצר', 'meltzar', 'Waiter'),
    createContentItem('אני צמחוני.', 'ani tzimchoni.', 'I am vegetarian.', 'sentence', 'אני צמחוני, יש אוכל בלי בשר?', 'I am vegetarian, is there food without meat?', [
      { korean: 'אני', english: 'I' },
      { korean: 'צמחוני', english: 'vegetarian' },
    ]),
    createContentItem('בתאבון!', 'beteavon!', 'Bon appetit!'),
    createContentItem('סוכר', 'sukar', 'Sugar'),
    createContentItem('מלח', 'melach', 'Salt'),
  ],
};

// ============================================================
// TRAVEL
// ============================================================
const travel = {
  title: 'Travel & Directions',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'he',
  content: [
    createContentItem('שדה תעופה', 'sde teufa', 'Airport'),
    createContentItem('מלון', 'malon', 'Hotel'),
    createContentItem('תחנה', 'tachana', 'Station'),
    createContentItem('רכבת', 'rakevet', 'Train'),
    createContentItem('אוטובוס', 'otobus', 'Bus'),
    createContentItem('מונית', 'monit', 'Taxi'),
    createContentItem('דרכון', 'darkon', 'Passport'),
    createContentItem('כרטיס', 'kartis', 'Ticket'),
    createContentItem('מזוודה', 'mizvada', 'Suitcase'),
    createContentItem('מפה', 'mapa', 'Map'),
    createContentItem('ימינה', 'yamina', 'To the right'),
    createContentItem('שמאלה', 'smola', 'To the left'),
    createContentItem('ישר', 'yashar', 'Straight ahead'),
    createContentItem('רחוב', 'rechov', 'Street'),
    createContentItem('איפה השירותים?', 'eifo hasherutim?', 'Where is the restroom?', 'sentence', '', '', [
      { korean: 'איפה', english: 'where' },
      { korean: 'השירותים', english: 'the restroom' },
    ]),
    createContentItem('איך מגיעים ל...?', 'eich magiim le...?', 'How do I get to...?', 'sentence', 'איך מגיעים לתחנה המרכזית?', 'How do I get to the central station?', [
      { korean: 'איך', english: 'how' },
      { korean: 'מגיעים', english: 'get to / arrive' },
      { korean: 'ל', english: 'to' },
    ]),
    createContentItem('כמה זה עולה?', 'kama ze ole?', 'How much does it cost?', 'sentence', 'כמה זה עולה לנסוע לירושלים?', 'How much does it cost to travel to Jerusalem?', [
      { korean: 'כמה', english: 'how much' },
      { korean: 'זה', english: 'this' },
      { korean: 'עולה', english: 'costs' },
    ]),
    createContentItem('אני צריך מונית.', 'ani tzarich monit.', 'I need a taxi.', 'sentence', 'אני צריך מונית לשדה התעופה.', 'I need a taxi to the airport.', [
      { korean: 'אני', english: 'I' },
      { korean: 'צריך', english: 'need' },
      { korean: 'מונית', english: 'taxi' },
    ]),
    createContentItem('יש לי הזמנה.', 'yesh li hazmana.', 'I have a reservation.', 'sentence', 'שלום, יש לי הזמנה על שם דוד.', 'Hello, I have a reservation under the name David.', [
      { korean: 'יש לי', english: 'I have' },
      { korean: 'הזמנה', english: 'reservation' },
    ]),
    createContentItem('מתי יוצא הרכבת?', 'matai yotze harakevet?', 'When does the train leave?', 'sentence', '', '', [
      { korean: 'מתי', english: 'when' },
      { korean: 'יוצא', english: 'leaves' },
      { korean: 'הרכבת', english: 'the train' },
    ]),
    createContentItem('חוף', 'chof', 'Beach'),
    createContentItem('תיירות', 'tayarut', 'Tourism'),
    createContentItem('טיול', 'tiyul', 'Trip / Hike'),
    createContentItem('אני אבוד.', 'ani avud.', 'I am lost.', 'sentence', 'סליחה, אני אבוד. אתה יכול לעזור לי?', 'Excuse me, I am lost. Can you help me?', [
      { korean: 'אני', english: 'I' },
      { korean: 'אבוד', english: 'lost' },
    ]),
    createContentItem('כניסה', 'knisa', 'Entrance'),
    createContentItem('יציאה', 'yetzia', 'Exit'),
  ],
};

// ============================================================
// SHOPPING
// ============================================================
const shopping = {
  title: 'Shopping & Money',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'he',
  content: [
    createContentItem('חנות', 'chanut', 'Store / Shop'),
    createContentItem('שוק', 'shuk', 'Market'),
    createContentItem('כסף', 'kesef', 'Money'),
    createContentItem('שקל', 'shekel', 'Shekel (Israeli currency)'),
    createContentItem('מחיר', 'mechir', 'Price'),
    createContentItem('זול', 'zol', 'Cheap'),
    createContentItem('יקר', 'yakar', 'Expensive'),
    createContentItem('גדול', 'gadol', 'Big / Large'),
    createContentItem('קטן', 'katan', 'Small'),
    createContentItem('צבע', 'tzeva', 'Color'),
    createContentItem('אדום', 'adom', 'Red'),
    createContentItem('כחול', 'kachol', 'Blue'),
    createContentItem('לבן', 'lavan', 'White'),
    createContentItem('שחור', 'shachor', 'Black'),
    createContentItem('כמה זה עולה?', 'kama ze ole?', 'How much does this cost?', 'sentence', 'סליחה, כמה זה עולה?', 'Excuse me, how much does this cost?', [
      { korean: 'כמה', english: 'how much' },
      { korean: 'זה', english: 'this' },
      { korean: 'עולה', english: 'costs' },
    ]),
    createContentItem('אני רוצה לקנות את זה.', 'ani rotze liknot et ze.', 'I want to buy this.', 'sentence', '', '', [
      { korean: 'אני', english: 'I' },
      { korean: 'רוצה', english: 'want' },
      { korean: 'לקנות', english: 'to buy' },
      { korean: 'את זה', english: 'this' },
    ]),
    createContentItem('יש הנחה?', 'yesh hanacha?', 'Is there a discount?', 'sentence', 'אם אני קונה שניים, יש הנחה?', 'If I buy two, is there a discount?', [
      { korean: 'יש', english: 'is there' },
      { korean: 'הנחה', english: 'discount' },
    ]),
    createContentItem('אני רק מסתכל.', 'ani rak mistakel.', 'I am just looking.', 'sentence', 'תודה, אני רק מסתכל.', 'Thanks, I am just looking.', [
      { korean: 'אני', english: 'I' },
      { korean: 'רק', english: 'just / only' },
      { korean: 'מסתכל', english: 'looking' },
    ]),
    createContentItem('יש לכם מידה יותר גדולה?', 'yesh lachem mida yoter gdola?', 'Do you have a bigger size?', 'sentence', '', '', [
      { korean: 'יש לכם', english: 'do you have' },
      { korean: 'מידה', english: 'size' },
      { korean: 'יותר גדולה', english: 'bigger' },
    ]),
    createContentItem('אפשר לשלם בכרטיס אשראי?', 'efshar leshalem bekartis ashrai?', 'Can I pay with a credit card?', 'sentence', '', '', [
      { korean: 'אפשר', english: 'is it possible' },
      { korean: 'לשלם', english: 'to pay' },
      { korean: 'בכרטיס אשראי', english: 'with a credit card' },
    ]),
    createContentItem('קבלה', 'kabala', 'Receipt'),
    createContentItem('שקית', 'sakit', 'Bag'),
    createContentItem('זה יפה מאוד.', 'ze yafe meod.', 'This is very beautiful.', 'sentence', '', '', [
      { korean: 'זה', english: 'this' },
      { korean: 'יפה', english: 'beautiful' },
      { korean: 'מאוד', english: 'very' },
    ]),
    createContentItem('בגדים', 'bgadim', 'Clothes'),
    createContentItem('נעליים', 'naalayim', 'Shoes'),
  ],
};

// ============================================================
// BUSINESS
// ============================================================
const business = {
  title: 'Business & Work',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'he',
  content: [
    createContentItem('משרד', 'misrad', 'Office'),
    createContentItem('פגישה', 'pgisha', 'Meeting'),
    createContentItem('מנהל', 'menahel', 'Manager'),
    createContentItem('עובד', 'oved', 'Employee / Worker'),
    createContentItem('חברה', 'chevra', 'Company'),
    createContentItem('חוזה', 'choze', 'Contract'),
    createContentItem('משכורת', 'maskoret', 'Salary'),
    createContentItem('מחשב', 'machshev', 'Computer'),
    createContentItem('דוא"ל', 'doel', 'Email'),
    createContentItem('טלפון', 'telefon', 'Telephone'),
    createContentItem('פרויקט', 'proyekt', 'Project'),
    createContentItem('לקוח', 'lakoach', 'Client / Customer'),
    createContentItem('יש לי פגישה בשעה עשר.', 'yesh li pgisha beshaa eser.', 'I have a meeting at ten.', 'sentence', '', '', [
      { korean: 'יש לי', english: 'I have' },
      { korean: 'פגישה', english: 'meeting' },
      { korean: 'בשעה עשר', english: 'at ten o\'clock' },
    ]),
    createContentItem('אני עובד כאן.', 'ani oved kan.', 'I work here.', 'sentence', 'אני עובד כאן כבר שנתיים.', 'I have been working here for two years.', [
      { korean: 'אני', english: 'I' },
      { korean: 'עובד', english: 'work' },
      { korean: 'כאן', english: 'here' },
    ]),
    createContentItem('מה העבודה שלך?', 'ma haavoda shelcha?', 'What is your job?', 'sentence', '', '', [
      { korean: 'מה', english: 'what' },
      { korean: 'העבודה', english: 'the job' },
      { korean: 'שלך', english: 'your' },
    ]),
    createContentItem('אני צריך לשלוח דוא"ל.', 'ani tzarich lishloch doel.', 'I need to send an email.', 'sentence', '', '', [
      { korean: 'אני', english: 'I' },
      { korean: 'צריך', english: 'need' },
      { korean: 'לשלוח', english: 'to send' },
      { korean: 'דוא"ל', english: 'email' },
    ]),
    createContentItem('הפגישה בוטלה.', 'hapgisha butla.', 'The meeting was cancelled.', 'sentence', '', '', [
      { korean: 'הפגישה', english: 'the meeting' },
      { korean: 'בוטלה', english: 'was cancelled' },
    ]),
    createContentItem('בוא נדבר על זה.', 'bo nedaber al ze.', 'Let us talk about it.', 'sentence', 'בוא נדבר על הפרויקט.', 'Let us talk about the project.', [
      { korean: 'בוא', english: 'come / let\'s' },
      { korean: 'נדבר', english: 'we will talk' },
      { korean: 'על זה', english: 'about it' },
    ]),
    createContentItem('ראיון עבודה', 'reayon avoda', 'Job interview'),
    createContentItem('קורות חיים', 'korot chayim', 'Resume / CV'),
    createContentItem('אני מחפש עבודה.', 'ani mechapes avoda.', 'I am looking for a job.', 'sentence', 'אני מחפש עבודה בתל אביב.', 'I am looking for a job in Tel Aviv.', [
      { korean: 'אני', english: 'I' },
      { korean: 'מחפש', english: 'looking for' },
      { korean: 'עבודה', english: 'job / work' },
    ]),
    createContentItem('שעות עבודה', 'shaot avoda', 'Working hours'),
    createContentItem('חופשה', 'chufsha', 'Vacation / Holiday'),
    createContentItem('אפשר לקבוע פגישה?', 'efshar likvoa pgisha?', 'Can we schedule a meeting?', 'sentence', '', '', [
      { korean: 'אפשר', english: 'is it possible' },
      { korean: 'לקבוע', english: 'to schedule' },
      { korean: 'פגישה', english: 'meeting' },
    ]),
  ],
};

// ============================================================
// HEALTHCARE
// ============================================================
const healthcare = {
  title: 'Health & Medical',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'he',
  content: [
    createContentItem('רופא', 'rofe', 'Doctor'),
    createContentItem('בית חולים', 'beit cholim', 'Hospital'),
    createContentItem('מרפאה', 'mirpaa', 'Clinic'),
    createContentItem('בית מרקחת', 'beit mirkachat', 'Pharmacy'),
    createContentItem('תרופה', 'trufa', 'Medicine'),
    createContentItem('כאב', 'keev', 'Pain'),
    createContentItem('ראש', 'rosh', 'Head'),
    createContentItem('בטן', 'beten', 'Stomach'),
    createContentItem('גרון', 'garon', 'Throat'),
    createContentItem('חום', 'chom', 'Fever / Heat'),
    createContentItem('שיעול', 'shiul', 'Cough'),
    createContentItem('אלרגיה', 'alergia', 'Allergy'),
    createContentItem('אני לא מרגיש טוב.', 'ani lo margish tov.', 'I do not feel well.', 'sentence', 'אני לא מרגיש טוב מאז הבוקר.', 'I have not felt well since the morning.', [
      { korean: 'אני', english: 'I' },
      { korean: 'לא', english: 'not' },
      { korean: 'מרגיש', english: 'feel' },
      { korean: 'טוב', english: 'well / good' },
    ]),
    createContentItem('כואב לי הראש.', 'koev li harosh.', 'I have a headache.', 'sentence', 'כואב לי הראש כל היום.', 'I have had a headache all day.', [
      { korean: 'כואב', english: 'hurts' },
      { korean: 'לי', english: 'me' },
      { korean: 'הראש', english: 'the head' },
    ]),
    createContentItem('כואב לי הבטן.', 'koev li habeten.', 'I have a stomachache.', 'sentence', '', '', [
      { korean: 'כואב', english: 'hurts' },
      { korean: 'לי', english: 'me' },
      { korean: 'הבטן', english: 'the stomach' },
    ]),
    createContentItem('אני צריך רופא.', 'ani tzarich rofe.', 'I need a doctor.', 'sentence', 'אני צריך רופא בדחיפות.', 'I need a doctor urgently.', [
      { korean: 'אני', english: 'I' },
      { korean: 'צריך', english: 'need' },
      { korean: 'רופא', english: 'doctor' },
    ]),
    createContentItem('יש לי אלרגיה.', 'yesh li alergia.', 'I have an allergy.', 'sentence', 'יש לי אלרגיה לבוטנים.', 'I have an allergy to peanuts.', [
      { korean: 'יש לי', english: 'I have' },
      { korean: 'אלרגיה', english: 'allergy' },
    ]),
    createContentItem('איפה בית המרקחת?', 'eifo beit hamirkachat?', 'Where is the pharmacy?', 'sentence', 'סליחה, איפה בית המרקחת הקרוב?', 'Excuse me, where is the nearest pharmacy?', [
      { korean: 'איפה', english: 'where' },
      { korean: 'בית המרקחת', english: 'the pharmacy' },
    ]),
    createContentItem('מרשם', 'mirsham', 'Prescription'),
    createContentItem('אחות', 'achot', 'Nurse'),
    createContentItem('שיניים', 'shinayim', 'Teeth'),
    createContentItem('רופא שיניים', 'rofe shinayim', 'Dentist'),
    createContentItem('עיניים', 'einayim', 'Eyes'),
    createContentItem('דם', 'dam', 'Blood'),
    createContentItem('אני לוקח תרופות.', 'ani loke\'ach trufot.', 'I take medications.', 'sentence', 'אני לוקח תרופות כל יום.', 'I take medications every day.', [
      { korean: 'אני', english: 'I' },
      { korean: 'לוקח', english: 'take' },
      { korean: 'תרופות', english: 'medications' },
    ]),
    createContentItem('אמבולנס', 'ambulans', 'Ambulance'),
    createContentItem('חירום', 'cherum', 'Emergency'),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
