// Arabic (Modern Standard Arabic) - Beginner Lessons
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

// ==========================================
// GREETINGS - BEGINNER (25 items)
// ==========================================
const greetings = {
  title: 'Basic Greetings & Introductions',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'ar',
  content: [
    // Basic greetings
    createContentItem('مرحبا', 'marhaba', 'Hello', 'word', 'مرحبا، كيف حالك؟', 'Hello, how are you?'),
    createContentItem('السلام عليكم', 'as-salaamu alaykum', 'Peace be upon you', 'sentence', 'السلام عليكم ورحمة الله', 'Peace and mercy of God be upon you', [{ target: 'السلام', native: 'peace' }, { target: 'عليكم', native: 'upon you' }]),
    createContentItem('وعليكم السلام', 'wa alaykum as-salaam', 'And peace be upon you', 'sentence', 'وعليكم السلام ورحمة الله وبركاته', 'And peace, mercy, and blessings of God be upon you', [{ target: 'وعليكم', native: 'and upon you' }, { target: 'السلام', native: 'peace' }]),
    createContentItem('أهلا وسهلا', 'ahlan wa sahlan', 'Welcome', 'sentence', 'أهلا وسهلا بك في بيتنا', 'Welcome to our home', [{ target: 'أهلا', native: 'family/welcome' }, { target: 'سهلا', native: 'ease/comfort' }]),
    createContentItem('صباح الخير', 'sabaah al-khayr', 'Good morning', 'sentence', 'صباح الخير، كيف حالك اليوم؟', 'Good morning, how are you today?', [{ target: 'صباح', native: 'morning' }, { target: 'الخير', native: 'the goodness' }]),
    createContentItem('صباح النور', 'sabaah an-nuur', 'Good morning (reply)', 'sentence', 'صباح النور والسرور', 'Morning of light and happiness', [{ target: 'صباح', native: 'morning' }, { target: 'النور', native: 'the light' }]),
    createContentItem('مساء الخير', 'masaa\' al-khayr', 'Good evening', 'sentence', 'مساء الخير يا أصدقاء', 'Good evening, friends', [{ target: 'مساء', native: 'evening' }, { target: 'الخير', native: 'the goodness' }]),
    createContentItem('مساء النور', 'masaa\' an-nuur', 'Good evening (reply)', 'word', 'مساء النور', 'Good evening (reply)'),

    // Farewells
    createContentItem('مع السلامة', 'ma\'a as-salaama', 'Goodbye', 'sentence', 'مع السلامة، إلى اللقاء', 'Goodbye, until we meet', [{ target: 'مع', native: 'with' }, { target: 'السلامة', native: 'safety' }]),
    createContentItem('إلى اللقاء', 'ila al-liqaa\'', 'Until we meet again', 'sentence', 'إلى اللقاء يا صديقي', 'Until we meet again, my friend', [{ target: 'إلى', native: 'until' }, { target: 'اللقاء', native: 'the meeting' }]),
    createContentItem('تصبح على خير', 'tusbihu ala khayr', 'Good night', 'sentence', 'تصبح على خير، نوم هنيئ', 'Good night, sleep well', [{ target: 'تصبح', native: 'you become/enter' }, { target: 'على خير', native: 'upon goodness' }]),

    // Thanking
    createContentItem('شكرا', 'shukran', 'Thank you', 'word', 'شكرا جزيلا على مساعدتك', 'Thank you very much for your help'),
    createContentItem('شكرا جزيلا', 'shukran jazeelan', 'Thank you very much', 'sentence', 'شكرا جزيلا لك', 'Thank you very much', [{ target: 'شكرا', native: 'thanks' }, { target: 'جزيلا', native: 'abundantly' }]),
    createContentItem('عفوا', 'afwan', 'You\'re welcome / Excuse me', 'word', 'عفوا، لا شكر على واجب', 'You\'re welcome, no need to thank'),
    createContentItem('لا شكر على واجب', 'la shukr ala waajib', 'Don\'t mention it', 'sentence', 'لا شكر على واجب، هذا واجبي', 'Don\'t mention it, it\'s my duty', [{ target: 'لا شكر', native: 'no thanks' }, { target: 'على واجب', native: 'upon a duty' }]),

    // Apologizing
    createContentItem('آسف', 'aasif', 'Sorry', 'word', 'أنا آسف على التأخير', 'I\'m sorry for the delay'),
    createContentItem('أعتذر', 'a\'tadhir', 'I apologize', 'word', 'أعتذر عن الإزعاج', 'I apologize for the inconvenience'),
    createContentItem('لو سمحت', 'law samaht', 'Please / Excuse me', 'sentence', 'لو سمحت، أين المحطة؟', 'Excuse me, where is the station?', [{ target: 'لو', native: 'if' }, { target: 'سمحت', native: 'you permitted' }]),

    // Introductions
    createContentItem('ما اسمك؟', 'ma ismuk?', 'What is your name?', 'sentence', 'مرحبا، ما اسمك؟', 'Hello, what is your name?', [{ target: 'ما', native: 'what' }, { target: 'اسمك', native: 'your name' }]),
    createContentItem('اسمي', 'ismi', 'My name is', 'word', 'اسمي أحمد', 'My name is Ahmad'),
    createContentItem('تشرفنا', 'tasharrafna', 'Pleased to meet you', 'word', 'تشرفنا بمعرفتك', 'Pleased to know you'),
    createContentItem('فرصة سعيدة', 'fursa sa\'eeda', 'Nice to meet you', 'sentence', 'فرصة سعيدة أن ألتقي بك', 'Nice to meet you', [{ target: 'فرصة', native: 'opportunity' }, { target: 'سعيدة', native: 'happy' }]),

    // How are you
    createContentItem('كيف حالك؟', 'kayf haaluk?', 'How are you?', 'sentence', 'مرحبا، كيف حالك؟', 'Hello, how are you?', [{ target: 'كيف', native: 'how' }, { target: 'حالك', native: 'your condition' }]),
    createContentItem('بخير، الحمد لله', 'bi-khayr, al-hamdu lillah', 'Fine, praise be to God', 'sentence', 'أنا بخير، الحمد لله', 'I\'m fine, praise be to God', [{ target: 'بخير', native: 'fine/well' }, { target: 'الحمد لله', native: 'praise be to God' }]),
    createContentItem('من أين أنت؟', 'min ayna anta?', 'Where are you from?', 'sentence', 'من أين أنت يا صديقي؟', 'Where are you from, my friend?', [{ target: 'من', native: 'from' }, { target: 'أين', native: 'where' }, { target: 'أنت', native: 'you' }]),
    createContentItem('أنا من', 'ana min', 'I am from', 'sentence', 'أنا من مصر', 'I am from Egypt', [{ target: 'أنا', native: 'I' }, { target: 'من', native: 'from' }]),
  ],
};

// ==========================================
// DAILY LIFE - BEGINNER (25 items)
// ==========================================
const dailyLife = {
  title: 'Daily Life & Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'ar',
  content: [
    // Time & routine
    createContentItem('الوقت', 'al-waqt', 'Time', 'word', 'ما الوقت الآن؟', 'What time is it now?'),
    createContentItem('كم الساعة؟', 'kam as-saa\'a?', 'What time is it?', 'sentence', 'لو سمحت، كم الساعة؟', 'Excuse me, what time is it?', [{ target: 'كم', native: 'how much/many' }, { target: 'الساعة', native: 'the hour/clock' }]),
    createContentItem('الصباح', 'as-sabaah', 'Morning', 'word', 'أستيقظ في الصباح الباكر', 'I wake up early in the morning'),
    createContentItem('الظهر', 'adh-dhuhr', 'Noon', 'word', 'نتناول الغداء عند الظهر', 'We eat lunch at noon'),
    createContentItem('المساء', 'al-masaa\'', 'Evening', 'word', 'أقرأ في المساء', 'I read in the evening'),
    createContentItem('الليل', 'al-layl', 'Night', 'word', 'أنام في الليل', 'I sleep at night'),

    // Daily actions
    createContentItem('أستيقظ', 'astayqidh', 'I wake up', 'word', 'أستيقظ في السادسة صباحا', 'I wake up at six in the morning'),
    createContentItem('أنام', 'anaam', 'I sleep', 'word', 'أنام في العاشرة مساء', 'I sleep at ten in the evening'),
    createContentItem('أغسل وجهي', 'aghsil wajhi', 'I wash my face', 'sentence', 'أغسل وجهي كل صباح', 'I wash my face every morning', [{ target: 'أغسل', native: 'I wash' }, { target: 'وجهي', native: 'my face' }]),
    createContentItem('أتناول الفطور', 'atanaawal al-futuur', 'I eat breakfast', 'sentence', 'أتناول الفطور في السابعة', 'I eat breakfast at seven', [{ target: 'أتناول', native: 'I eat/have' }, { target: 'الفطور', native: 'breakfast' }]),
    createContentItem('أذهب إلى العمل', 'adh-hab ila al-\'amal', 'I go to work', 'sentence', 'أذهب إلى العمل بالسيارة', 'I go to work by car', [{ target: 'أذهب', native: 'I go' }, { target: 'إلى', native: 'to' }, { target: 'العمل', native: 'work' }]),
    createContentItem('أرجع إلى البيت', 'arji\' ila al-bayt', 'I return home', 'sentence', 'أرجع إلى البيت في الخامسة', 'I return home at five', [{ target: 'أرجع', native: 'I return' }, { target: 'إلى البيت', native: 'to home' }]),

    // Days of the week
    createContentItem('اليوم', 'al-yawm', 'Today', 'word', 'اليوم هو يوم جميل', 'Today is a beautiful day'),
    createContentItem('غدا', 'ghadan', 'Tomorrow', 'word', 'سأذهب غدا', 'I will go tomorrow'),
    createContentItem('أمس', 'ams', 'Yesterday', 'word', 'ذهبت أمس إلى السوق', 'I went to the market yesterday'),
    createContentItem('الأسبوع', 'al-usbuu\'', 'Week', 'word', 'في الأسبوع القادم', 'Next week'),
    createContentItem('يوم الأحد', 'yawm al-ahad', 'Sunday', 'word', 'أذهب إلى الحديقة يوم الأحد', 'I go to the park on Sunday'),
    createContentItem('يوم الاثنين', 'yawm al-ithnayn', 'Monday', 'word', 'يوم الاثنين هو بداية الأسبوع', 'Monday is the beginning of the week'),
    createContentItem('يوم الجمعة', 'yawm al-jum\'a', 'Friday', 'word', 'يوم الجمعة يوم عطلة', 'Friday is a holiday'),

    // Common daily words
    createContentItem('البيت', 'al-bayt', 'Home / House', 'word', 'بيتنا كبير وجميل', 'Our home is big and beautiful'),
    createContentItem('المدرسة', 'al-madrasa', 'School', 'word', 'أذهب إلى المدرسة كل يوم', 'I go to school every day'),
    createContentItem('العائلة', 'al-\'aa\'ila', 'Family', 'word', 'عائلتي صغيرة وسعيدة', 'My family is small and happy'),
    createContentItem('الأصدقاء', 'al-asdiqaa\'', 'Friends', 'word', 'ألعب مع أصدقائي', 'I play with my friends'),
    createContentItem('أحب أن أقرأ', 'uhibb an aqra\'', 'I like to read', 'sentence', 'أحب أن أقرأ الكتب', 'I like to read books', [{ target: 'أحب', native: 'I like/love' }, { target: 'أن أقرأ', native: 'to read' }]),
    createContentItem('ماذا تفعل؟', 'madha taf\'al?', 'What are you doing?', 'sentence', 'ماذا تفعل الآن؟', 'What are you doing now?', [{ target: 'ماذا', native: 'what' }, { target: 'تفعل', native: 'you do' }]),
  ],
};

// ==========================================
// FOOD - BEGINNER (25 items)
// ==========================================
const food = {
  title: 'Food & Dining',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'ar',
  content: [
    // Common foods
    createContentItem('خبز', 'khubz', 'Bread', 'word', 'أريد خبزا طازجا', 'I want fresh bread'),
    createContentItem('أرز', 'aruzz', 'Rice', 'word', 'أحب الأرز مع الدجاج', 'I like rice with chicken'),
    createContentItem('دجاج', 'dajaaj', 'Chicken', 'word', 'الدجاج المشوي لذيذ', 'Grilled chicken is delicious'),
    createContentItem('لحم', 'lahm', 'Meat', 'word', 'هل تأكل اللحم؟', 'Do you eat meat?'),
    createContentItem('سمك', 'samak', 'Fish', 'word', 'أحب السمك الطازج', 'I like fresh fish'),
    createContentItem('خضروات', 'khudrawaat', 'Vegetables', 'word', 'الخضروات مفيدة للصحة', 'Vegetables are good for health'),
    createContentItem('فواكه', 'fawaakiih', 'Fruits', 'word', 'أتناول الفواكه كل يوم', 'I eat fruits every day'),
    createContentItem('حليب', 'haliib', 'Milk', 'word', 'أشرب الحليب كل صباح', 'I drink milk every morning'),
    createContentItem('ماء', 'maa\'', 'Water', 'word', 'أريد كوب ماء من فضلك', 'I want a glass of water, please'),
    createContentItem('شاي', 'shaay', 'Tea', 'word', 'هل تريد كوب شاي؟', 'Do you want a cup of tea?'),
    createContentItem('قهوة', 'qahwa', 'Coffee', 'word', 'القهوة العربية لذيذة جدا', 'Arabic coffee is very delicious'),
    createContentItem('عصير', 'asiir', 'Juice', 'word', 'أريد عصير برتقال', 'I want orange juice'),

    // Dining phrases
    createContentItem('أنا جائع', 'ana jaa\'i', 'I am hungry', 'sentence', 'أنا جائع جدا', 'I am very hungry', [{ target: 'أنا', native: 'I' }, { target: 'جائع', native: 'hungry' }]),
    createContentItem('أنا عطشان', 'ana atshaan', 'I am thirsty', 'sentence', 'أنا عطشان، أريد ماء', 'I am thirsty, I want water', [{ target: 'أنا', native: 'I' }, { target: 'عطشان', native: 'thirsty' }]),
    createContentItem('هل أنت جائع؟', 'hal anta jaa\'i?', 'Are you hungry?', 'sentence', 'هل أنت جائع؟ نأكل معا', 'Are you hungry? Let\'s eat together', [{ target: 'هل', native: 'are (question)' }, { target: 'أنت', native: 'you' }, { target: 'جائع', native: 'hungry' }]),
    createContentItem('الطعام لذيذ', 'at-ta\'aam ladhiidh', 'The food is delicious', 'sentence', 'الطعام لذيذ جدا، شكرا لك', 'The food is very delicious, thank you', [{ target: 'الطعام', native: 'the food' }, { target: 'لذيذ', native: 'delicious' }]),
    createContentItem('بالهناء والشفاء', 'bil-hanaa\' wash-shifaa\'', 'Bon appetit', 'sentence', 'بالهناء والشفاء، تفضلوا', 'Bon appetit, please go ahead', [{ target: 'بالهناء', native: 'with happiness' }, { target: 'والشفاء', native: 'and health' }]),
    createContentItem('أريد القائمة من فضلك', 'uriid al-qaa\'ima min fadlak', 'I want the menu, please', 'sentence', 'أريد القائمة من فضلك', 'I want the menu, please', [{ target: 'أريد', native: 'I want' }, { target: 'القائمة', native: 'the menu' }, { target: 'من فضلك', native: 'please' }]),
    createContentItem('الحساب من فضلك', 'al-hisaab min fadlak', 'The bill, please', 'sentence', 'الحساب من فضلك', 'The bill, please', [{ target: 'الحساب', native: 'the bill' }, { target: 'من فضلك', native: 'please' }]),

    // More food items
    createContentItem('سلطة', 'salata', 'Salad', 'word', 'أريد سلطة خضراء', 'I want a green salad'),
    createContentItem('شوربة', 'shuurba', 'Soup', 'word', 'شوربة العدس لذيذة', 'Lentil soup is delicious'),
    createContentItem('حلوى', 'halwa', 'Dessert / Sweets', 'word', 'أحب الحلوى العربية', 'I like Arabic sweets'),
    createContentItem('مطعم', 'mat\'am', 'Restaurant', 'word', 'هذا مطعم ممتاز', 'This is an excellent restaurant'),
    createContentItem('ملعقة', 'mil\'aqa', 'Spoon', 'word', 'أحتاج ملعقة من فضلك', 'I need a spoon, please'),
    createContentItem('طبق', 'tabaq', 'Plate / Dish', 'word', 'هذا الطبق شهي جدا', 'This dish is very appetizing'),
  ],
};

// ==========================================
// TRAVEL - BEGINNER (25 items)
// ==========================================
const travel = {
  title: 'Travel & Directions',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'ar',
  content: [
    // Transportation
    createContentItem('مطار', 'mataar', 'Airport', 'word', 'أين المطار من فضلك؟', 'Where is the airport, please?'),
    createContentItem('طائرة', 'taa\'ira', 'Airplane', 'word', 'الطائرة تغادر في الساعة الثالثة', 'The airplane departs at three o\'clock'),
    createContentItem('سيارة', 'sayyaara', 'Car', 'word', 'أريد استئجار سيارة', 'I want to rent a car'),
    createContentItem('حافلة', 'haafila', 'Bus', 'word', 'أين محطة الحافلة؟', 'Where is the bus stop?'),
    createContentItem('قطار', 'qitaar', 'Train', 'word', 'متى يصل القطار؟', 'When does the train arrive?'),
    createContentItem('تاكسي', 'taaksi', 'Taxi', 'word', 'أريد تاكسي من فضلك', 'I want a taxi, please'),
    createContentItem('محطة', 'mahatta', 'Station / Stop', 'word', 'أين أقرب محطة؟', 'Where is the nearest station?'),

    // Directions
    createContentItem('أين؟', 'ayna?', 'Where?', 'word', 'أين الفندق؟', 'Where is the hotel?'),
    createContentItem('يمين', 'yamiin', 'Right', 'word', 'اتجه يمينا من فضلك', 'Go right, please'),
    createContentItem('يسار', 'yasaar', 'Left', 'word', 'اتجه يسارا عند الإشارة', 'Go left at the traffic light'),
    createContentItem('مباشرة', 'mubaashara', 'Straight ahead', 'word', 'امش مباشرة ثم انعطف يمينا', 'Walk straight then turn right'),
    createContentItem('أين الفندق؟', 'ayna al-funduq?', 'Where is the hotel?', 'sentence', 'لو سمحت، أين الفندق؟', 'Excuse me, where is the hotel?', [{ target: 'أين', native: 'where' }, { target: 'الفندق', native: 'the hotel' }]),
    createContentItem('كيف أصل إلى؟', 'kayf asil ila?', 'How do I get to?', 'sentence', 'كيف أصل إلى وسط المدينة؟', 'How do I get to the city center?', [{ target: 'كيف', native: 'how' }, { target: 'أصل', native: 'I arrive/reach' }, { target: 'إلى', native: 'to' }]),

    // Travel essentials
    createContentItem('فندق', 'funduq', 'Hotel', 'word', 'حجزت غرفة في الفندق', 'I booked a room in the hotel'),
    createContentItem('غرفة', 'ghurfa', 'Room', 'word', 'أريد غرفة لشخصين', 'I want a room for two people'),
    createContentItem('جواز سفر', 'jawaaz safar', 'Passport', 'word', 'أين جواز سفري؟', 'Where is my passport?'),
    createContentItem('تذكرة', 'tadhkira', 'Ticket', 'word', 'أريد تذكرة ذهاب وعودة', 'I want a round-trip ticket'),
    createContentItem('حقيبة', 'haqiiba', 'Bag / Suitcase', 'word', 'هذه حقيبتي', 'This is my bag'),
    createContentItem('أريد أن أحجز', 'uriid an ahjiz', 'I want to book', 'sentence', 'أريد أن أحجز غرفة في الفندق', 'I want to book a room in the hotel', [{ target: 'أريد', native: 'I want' }, { target: 'أن أحجز', native: 'to book' }]),
    createContentItem('متى يغادر؟', 'mata yughaadir?', 'When does it leave?', 'sentence', 'متى يغادر القطار؟', 'When does the train leave?', [{ target: 'متى', native: 'when' }, { target: 'يغادر', native: 'it leaves' }]),
    createContentItem('هل هذا بعيد؟', 'hal hadha ba\'iid?', 'Is this far?', 'sentence', 'هل المطار بعيد من هنا؟', 'Is the airport far from here?', [{ target: 'هل', native: 'is (question)' }, { target: 'هذا', native: 'this' }, { target: 'بعيد', native: 'far' }]),
    createContentItem('قريب', 'qariib', 'Near / Close', 'word', 'الفندق قريب من هنا', 'The hotel is near here'),
    createContentItem('بعيد', 'ba\'iid', 'Far', 'word', 'المطار بعيد من المدينة', 'The airport is far from the city'),
    createContentItem('خريطة', 'khariita', 'Map', 'word', 'هل عندك خريطة؟', 'Do you have a map?'),
    createContentItem('سائح', 'saa\'ih', 'Tourist', 'word', 'أنا سائح من أمريكا', 'I am a tourist from America'),
  ],
};

// ==========================================
// SHOPPING - BEGINNER (25 items)
// ==========================================
const shopping = {
  title: 'Shopping & Money',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'ar',
  content: [
    // Shopping basics
    createContentItem('سوق', 'suuq', 'Market', 'word', 'نذهب إلى السوق غدا', 'We go to the market tomorrow'),
    createContentItem('محل', 'mahall', 'Shop / Store', 'word', 'هذا محل ملابس جميل', 'This is a nice clothing shop'),
    createContentItem('أريد أن أشتري', 'uriid an ashtari', 'I want to buy', 'sentence', 'أريد أن أشتري هدية', 'I want to buy a gift', [{ target: 'أريد', native: 'I want' }, { target: 'أن أشتري', native: 'to buy' }]),
    createContentItem('كم الثمن؟', 'kam ath-thaman?', 'How much is it?', 'sentence', 'كم ثمن هذا الكتاب؟', 'How much is this book?', [{ target: 'كم', native: 'how much' }, { target: 'الثمن', native: 'the price' }]),
    createContentItem('بكم هذا؟', 'bi-kam hadha?', 'How much is this?', 'sentence', 'لو سمحت، بكم هذا؟', 'Excuse me, how much is this?', [{ target: 'بكم', native: 'for how much' }, { target: 'هذا', native: 'this' }]),
    createContentItem('غالي', 'ghaali', 'Expensive', 'word', 'هذا غالي جدا', 'This is very expensive'),
    createContentItem('رخيص', 'rakhiis', 'Cheap', 'word', 'هل عندك شيء أرخص؟', 'Do you have something cheaper?'),

    // Money
    createContentItem('نقود', 'nuquud', 'Money', 'word', 'لا أملك نقودا كافية', 'I don\'t have enough money'),
    createContentItem('سعر', 'si\'r', 'Price', 'word', 'ما سعر هذا؟', 'What is the price of this?'),
    createContentItem('فلوس', 'fluus', 'Money (colloquial)', 'word', 'هل تقبلون الدفع بالبطاقة؟', 'Do you accept card payment?'),
    createContentItem('هل يمكن أن أدفع بالبطاقة؟', 'hal yumkin an adfa\' bil-bitaaqa?', 'Can I pay by card?', 'sentence', 'هل يمكن أن أدفع بالبطاقة الائتمانية؟', 'Can I pay by credit card?', [{ target: 'هل يمكن', native: 'is it possible' }, { target: 'أن أدفع', native: 'to pay' }, { target: 'بالبطاقة', native: 'by card' }]),

    // Clothing & items
    createContentItem('ملابس', 'malaabis', 'Clothes', 'word', 'أحتاج ملابس جديدة', 'I need new clothes'),
    createContentItem('حذاء', 'hidhaa\'', 'Shoes', 'word', 'أريد حذاء أسود', 'I want black shoes'),
    createContentItem('قميص', 'qamiis', 'Shirt', 'word', 'هذا القميص جميل', 'This shirt is beautiful'),
    createContentItem('فستان', 'fustaan', 'Dress', 'word', 'هذا الفستان أنيق', 'This dress is elegant'),
    createContentItem('حقيبة', 'haqiiba', 'Bag', 'word', 'أريد حقيبة يد', 'I want a handbag'),

    // Shopping phrases
    createContentItem('هل يوجد تخفيض؟', 'hal yuujad takhfiid?', 'Is there a discount?', 'sentence', 'هل يوجد تخفيض على هذا؟', 'Is there a discount on this?', [{ target: 'هل يوجد', native: 'is there' }, { target: 'تخفيض', native: 'discount' }]),
    createContentItem('أريد مقاسا أكبر', 'uriid maqaasan akbar', 'I want a bigger size', 'sentence', 'هل عندكم مقاس أكبر؟', 'Do you have a bigger size?', [{ target: 'أريد', native: 'I want' }, { target: 'مقاسا', native: 'a size' }, { target: 'أكبر', native: 'bigger' }]),
    createContentItem('أين غرفة القياس؟', 'ayna ghurfat al-qiyaas?', 'Where is the fitting room?', 'sentence', 'لو سمحت، أين غرفة القياس؟', 'Excuse me, where is the fitting room?', [{ target: 'أين', native: 'where' }, { target: 'غرفة القياس', native: 'fitting room' }]),
    createContentItem('سآخذ هذا', 'sa-aakhudh hadha', 'I\'ll take this', 'sentence', 'أعجبني، سآخذ هذا', 'I like it, I\'ll take this', [{ target: 'سآخذ', native: 'I will take' }, { target: 'هذا', native: 'this' }]),
    createContentItem('هدية', 'hadiyya', 'Gift', 'word', 'أبحث عن هدية لصديقي', 'I\'m looking for a gift for my friend'),
    createContentItem('كيس', 'kiis', 'Bag (plastic/paper)', 'word', 'أريد كيسا من فضلك', 'I want a bag, please'),
    createContentItem('لون', 'lawn', 'Color', 'word', 'ما هو لونك المفضل؟', 'What is your favorite color?'),
    createContentItem('هل عندكم؟', 'hal \'indakum?', 'Do you have?', 'sentence', 'هل عندكم هذا باللون الأزرق؟', 'Do you have this in blue?', [{ target: 'هل', native: 'do (question)' }, { target: 'عندكم', native: 'you have (plural)' }]),
  ],
};

// ==========================================
// BUSINESS - BEGINNER (25 items)
// ==========================================
const business = {
  title: 'Business & Work',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'ar',
  content: [
    // Workplace
    createContentItem('عمل', '\'amal', 'Work / Job', 'word', 'أذهب إلى العمل كل يوم', 'I go to work every day'),
    createContentItem('مكتب', 'maktab', 'Office / Desk', 'word', 'مكتبي في الطابق الثالث', 'My office is on the third floor'),
    createContentItem('شركة', 'sharika', 'Company', 'word', 'أعمل في شركة كبيرة', 'I work in a big company'),
    createContentItem('اجتماع', 'ijtimaa\'', 'Meeting', 'word', 'عندي اجتماع في العاشرة', 'I have a meeting at ten'),
    createContentItem('مدير', 'mudiir', 'Manager / Director', 'word', 'المدير في اجتماع الآن', 'The manager is in a meeting now'),
    createContentItem('زميل', 'zamiil', 'Colleague', 'word', 'هذا زميلي في العمل', 'This is my colleague at work'),
    createContentItem('موظف', 'muwaddhaf', 'Employee', 'word', 'أنا موظف جديد هنا', 'I am a new employee here'),

    // Common business phrases
    createContentItem('ما هي وظيفتك؟', 'ma hiya wadhiifatuk?', 'What is your job?', 'sentence', 'ما هي وظيفتك الحالية؟', 'What is your current job?', [{ target: 'ما', native: 'what' }, { target: 'هي', native: 'is (feminine)' }, { target: 'وظيفتك', native: 'your job' }]),
    createContentItem('أعمل في', 'a\'mal fi', 'I work in/at', 'sentence', 'أعمل في مجال التعليم', 'I work in the field of education', [{ target: 'أعمل', native: 'I work' }, { target: 'في', native: 'in' }]),
    createContentItem('عندي اجتماع', '\'indi ijtimaa\'', 'I have a meeting', 'sentence', 'عندي اجتماع مهم اليوم', 'I have an important meeting today', [{ target: 'عندي', native: 'I have' }, { target: 'اجتماع', native: 'meeting' }]),
    createContentItem('هل يمكنني المساعدة؟', 'hal yumkinuni al-musaa\'ada?', 'Can I help you?', 'sentence', 'مرحبا، هل يمكنني مساعدتك؟', 'Hello, can I help you?', [{ target: 'هل', native: 'can (question)' }, { target: 'يمكنني', native: 'I can' }, { target: 'المساعدة', native: 'help' }]),

    // Communication
    createContentItem('بريد إلكتروني', 'bariid ilikturuuni', 'Email', 'word', 'سأرسل لك بريدا إلكترونيا', 'I will send you an email'),
    createContentItem('هاتف', 'haatif', 'Phone', 'word', 'ما رقم هاتفك؟', 'What is your phone number?'),
    createContentItem('رقم', 'raqm', 'Number', 'word', 'هل يمكنني أخذ رقمك؟', 'Can I take your number?'),
    createContentItem('موعد', 'maw\'id', 'Appointment', 'word', 'أريد تحديد موعد', 'I want to set an appointment'),
    createContentItem('مشروع', 'mashruu\'', 'Project', 'word', 'هذا المشروع مهم جدا', 'This project is very important'),

    // Professions
    createContentItem('مهندس', 'muhandis', 'Engineer', 'word', 'أخي مهندس في شركة كبيرة', 'My brother is an engineer in a big company'),
    createContentItem('طبيب', 'tabiib', 'Doctor', 'word', 'أختي طبيبة في المستشفى', 'My sister is a doctor in the hospital'),
    createContentItem('معلم', 'mu\'allim', 'Teacher', 'word', 'المعلم يشرح الدرس', 'The teacher is explaining the lesson'),
    createContentItem('محاسب', 'muhaasib', 'Accountant', 'word', 'المحاسب يراجع الحسابات', 'The accountant is reviewing the accounts'),
    createContentItem('محامي', 'muhaami', 'Lawyer', 'word', 'أحتاج محاميا جيدا', 'I need a good lawyer'),

    // Business actions
    createContentItem('أرسل', 'ursil', 'I send', 'word', 'سأرسل التقرير غدا', 'I will send the report tomorrow'),
    createContentItem('أستلم', 'astallim', 'I receive', 'word', 'استلمت رسالتك', 'I received your message'),
    createContentItem('أوقع', 'uwaqqi\'', 'I sign', 'sentence', 'أحتاج أن أوقع العقد', 'I need to sign the contract', [{ target: 'أحتاج', native: 'I need' }, { target: 'أن أوقع', native: 'to sign' }, { target: 'العقد', native: 'the contract' }]),
  ],
};

// ==========================================
// HEALTHCARE - BEGINNER (25 items)
// ==========================================
const healthcare = {
  title: 'Healthcare & Body',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'ar',
  content: [
    // Body parts
    createContentItem('رأس', 'ra\'s', 'Head', 'word', 'عندي صداع في رأسي', 'I have a headache in my head'),
    createContentItem('عين', '\'ayn', 'Eye', 'word', 'عيناي تؤلماني', 'My eyes hurt'),
    createContentItem('أنف', 'anf', 'Nose', 'word', 'أنفي مسدود', 'My nose is blocked'),
    createContentItem('فم', 'fam', 'Mouth', 'word', 'افتح فمك من فضلك', 'Open your mouth, please'),
    createContentItem('يد', 'yad', 'Hand', 'word', 'يدي تؤلمني', 'My hand hurts'),
    createContentItem('قدم', 'qadam', 'Foot', 'word', 'أمشي على قدمي', 'I walk on foot'),
    createContentItem('بطن', 'batn', 'Stomach', 'word', 'عندي ألم في البطن', 'I have a stomachache'),
    createContentItem('ظهر', 'dhahr', 'Back', 'word', 'ظهري يؤلمني', 'My back hurts'),

    // Health conditions
    createContentItem('أنا مريض', 'ana mariid', 'I am sick', 'sentence', 'أنا مريض ولا أستطيع الذهاب', 'I am sick and cannot go', [{ target: 'أنا', native: 'I' }, { target: 'مريض', native: 'sick' }]),
    createContentItem('عندي حمى', '\'indi humma', 'I have a fever', 'sentence', 'عندي حمى وصداع', 'I have a fever and headache', [{ target: 'عندي', native: 'I have' }, { target: 'حمى', native: 'fever' }]),
    createContentItem('عندي صداع', '\'indi sudaa\'', 'I have a headache', 'sentence', 'عندي صداع شديد', 'I have a severe headache', [{ target: 'عندي', native: 'I have' }, { target: 'صداع', native: 'headache' }]),
    createContentItem('عندي زكام', '\'indi zukaam', 'I have a cold', 'sentence', 'عندي زكام وأعطس كثيرا', 'I have a cold and sneeze a lot', [{ target: 'عندي', native: 'I have' }, { target: 'زكام', native: 'cold' }]),
    createContentItem('أعاني من ألم', 'u\'aani min alam', 'I suffer from pain', 'sentence', 'أعاني من ألم في صدري', 'I suffer from chest pain', [{ target: 'أعاني', native: 'I suffer' }, { target: 'من', native: 'from' }, { target: 'ألم', native: 'pain' }]),
    createContentItem('أحتاج طبيبا', 'ahtaaj tabiiban', 'I need a doctor', 'sentence', 'أحتاج طبيبا بسرعة', 'I need a doctor quickly', [{ target: 'أحتاج', native: 'I need' }, { target: 'طبيبا', native: 'a doctor' }]),

    // At the doctor/hospital
    createContentItem('مستشفى', 'mustashfa', 'Hospital', 'word', 'أين أقرب مستشفى؟', 'Where is the nearest hospital?'),
    createContentItem('صيدلية', 'saydaliyya', 'Pharmacy', 'word', 'أين أقرب صيدلية؟', 'Where is the nearest pharmacy?'),
    createContentItem('دواء', 'dawaa\'', 'Medicine', 'word', 'هل أخذت الدواء؟', 'Did you take the medicine?'),
    createContentItem('وصفة طبية', 'wasfa tibbiyya', 'Prescription', 'sentence', 'أحتاج وصفة طبية من الطبيب', 'I need a prescription from the doctor', [{ target: 'وصفة', native: 'prescription' }, { target: 'طبية', native: 'medical' }]),
    createContentItem('حساسية', 'hasaasiyya', 'Allergy', 'word', 'عندي حساسية من الفول السوداني', 'I have a peanut allergy'),
    createContentItem('إسعافات أولية', 'is\'aafaat awwaliyya', 'First aid', 'sentence', 'أين صندوق الإسعافات الأولية؟', 'Where is the first aid kit?', [{ target: 'إسعافات', native: 'aid/relief' }, { target: 'أولية', native: 'first/primary' }]),

    // Emergency phrases
    createContentItem('ساعدوني!', 'saa\'iduuni!', 'Help me!', 'sentence', 'من فضلكم ساعدوني', 'Please help me', [{ target: 'ساعدوني', native: 'help me (plural)' }]),
    createContentItem('اتصلوا بالإسعاف', 'ittasilu bil-is\'aaf', 'Call an ambulance', 'sentence', 'من فضلكم اتصلوا بالإسعاف فورا', 'Please call an ambulance immediately', [{ target: 'اتصلوا', native: 'call (plural)' }, { target: 'بالإسعاف', native: 'the ambulance' }]),
    createContentItem('هل أنت بخير؟', 'hal anta bi-khayr?', 'Are you okay?', 'sentence', 'هل أنت بخير؟ هل تحتاج مساعدة؟', 'Are you okay? Do you need help?', [{ target: 'هل', native: 'are (question)' }, { target: 'أنت', native: 'you' }, { target: 'بخير', native: 'okay/well' }]),
    createContentItem('حالة طوارئ', 'haalat tawarii\'', 'Emergency', 'sentence', 'هذه حالة طوارئ!', 'This is an emergency!', [{ target: 'حالة', native: 'case/situation' }, { target: 'طوارئ', native: 'emergency' }]),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
