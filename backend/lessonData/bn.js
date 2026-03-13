// Bengali (Bangla) beginner lesson data for all 7 categories
// Real, accurate Bengali vocabulary and phrases in Bengali script with Latin transliteration

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

// ===================== GREETINGS =====================
const greetings = {
  title: 'Basic Greetings & Introductions',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'bn',
  content: [
    createContentItem('নমস্কার', 'namaskar', 'Hello', 'word', 'নমস্কার, আপনি কেমন আছেন?', 'Hello, how are you?'),
    createContentItem('আসসালামু আলাইকুম', 'assalamu alaikum', 'Peace be upon you (Islamic greeting)', 'word', 'আসসালামু আলাইকুম, কেমন আছেন?', 'Peace be upon you, how are you?'),
    createContentItem('হ্যালো', 'hyalo', 'Hello (informal)', 'word', 'হ্যালো, কী খবর?', 'Hello, what\'s up?'),
    createContentItem('সুপ্রভাত', 'suprabhat', 'Good morning', 'word', 'সুপ্রভাত, ভালো ঘুম হয়েছে?', 'Good morning, did you sleep well?'),
    createContentItem('শুভ সন্ধ্যা', 'shubho shondhya', 'Good evening', 'word', 'শুভ সন্ধ্যা, কেমন আছেন?', 'Good evening, how are you?'),
    createContentItem('শুভ রাত্রি', 'shubho ratri', 'Good night', 'word', 'শুভ রাত্রি, ভালো ঘুমান।', 'Good night, sleep well.'),
    createContentItem('আপনি কেমন আছেন?', 'apni kemon achhen?', 'How are you? (formal)', 'sentence', '', '', [
      { target: 'আপনি', native: 'you (formal)' },
      { target: 'কেমন', native: 'how' },
      { target: 'আছেন', native: 'are' },
    ]),
    createContentItem('তুমি কেমন আছো?', 'tumi kemon achho?', 'How are you? (informal)', 'sentence', '', '', [
      { target: 'তুমি', native: 'you (informal)' },
      { target: 'কেমন', native: 'how' },
      { target: 'আছো', native: 'are' },
    ]),
    createContentItem('আমি ভালো আছি।', 'ami bhalo achhi.', 'I am fine.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'ভালো', native: 'fine/good' },
      { target: 'আছি', native: 'am' },
    ]),
    createContentItem('ধন্যবাদ', 'dhonnobad', 'Thank you', 'word', 'আপনাকে অনেক ধন্যবাদ।', 'Thank you very much.'),
    createContentItem('আপনাকে স্বাগতম', 'apnake swagatam', 'You are welcome', 'word'),
    createContentItem('দয়া করে', 'doya kore', 'Please', 'word', 'দয়া করে বসুন।', 'Please sit down.'),
    createContentItem('মাফ করবেন', 'maph korben', 'Excuse me / Sorry (formal)', 'word', 'মাফ করবেন, সময় কত?', 'Excuse me, what time is it?'),
    createContentItem('আমার নাম রহিম।', 'amar nam Rahim.', 'My name is Rahim.', 'sentence', '', '', [
      { target: 'আমার', native: 'my' },
      { target: 'নাম', native: 'name' },
      { target: 'রহিম', native: 'Rahim' },
    ]),
    createContentItem('আপনার নাম কী?', 'apnar nam ki?', 'What is your name?', 'sentence', '', '', [
      { target: 'আপনার', native: 'your (formal)' },
      { target: 'নাম', native: 'name' },
      { target: 'কী', native: 'what' },
    ]),
    createContentItem('আপনার সাথে দেখা হয়ে ভালো লাগলো।', 'apnar shathe dekha hoye bhalo laglo.', 'Nice to meet you.', 'sentence', '', '', [
      { target: 'আপনার সাথে', native: 'with you' },
      { target: 'দেখা হয়ে', native: 'meeting' },
      { target: 'ভালো লাগলো', native: 'felt good' },
    ]),
    createContentItem('হ্যাঁ', 'hya', 'Yes', 'word'),
    createContentItem('না', 'na', 'No', 'word'),
    createContentItem('আমি বাংলাদেশ থেকে এসেছি।', 'ami Bangladesh theke esechhi.', 'I am from Bangladesh.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'বাংলাদেশ থেকে', native: 'from Bangladesh' },
      { target: 'এসেছি', native: 'have come' },
    ]),
    createContentItem('আবার দেখা হবে।', 'abar dekha hobe.', 'See you again.', 'sentence', '', '', [
      { target: 'আবার', native: 'again' },
      { target: 'দেখা হবে', native: 'will meet' },
    ]),
    createContentItem('বিদায়', 'biday', 'Goodbye', 'word', 'বিদায়, ভালো থাকবেন।', 'Goodbye, take care.'),
    createContentItem('ভালো থাকবেন', 'bhalo thakben', 'Take care (formal)', 'word'),
    createContentItem('আমি একটু বাংলা বলতে পারি।', 'ami ektu bangla bolte pari.', 'I can speak a little Bengali.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'একটু', native: 'a little' },
      { target: 'বাংলা', native: 'Bengali' },
      { target: 'বলতে পারি', native: 'can speak' },
    ]),
    createContentItem('আপনি কোথা থেকে এসেছেন?', 'apni kotha theke esechhen?', 'Where are you from?', 'sentence', '', '', [
      { target: 'আপনি', native: 'you (formal)' },
      { target: 'কোথা থেকে', native: 'from where' },
      { target: 'এসেছেন', native: 'have come' },
    ]),
    createContentItem('দেখা হবে', 'dekha hobe', 'See you later', 'word'),
  ],
};

// ===================== DAILY LIFE =====================
const dailyLife = {
  title: 'Daily Life & Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'bn',
  content: [
    createContentItem('সময়', 'shomoy', 'Time', 'word', 'এখন কয়টা বাজে?', 'What time is it now?'),
    createContentItem('সকাল', 'shokal', 'Morning', 'word', 'সকালে আমি উঠি।', 'I wake up in the morning.'),
    createContentItem('দুপুর', 'dupur', 'Noon/Afternoon', 'word', 'দুপুরে আমি খাই।', 'I eat at noon.'),
    createContentItem('রাত', 'rat', 'Night', 'word', 'রাতে আমি ঘুমাই।', 'I sleep at night.'),
    createContentItem('আজ', 'aj', 'Today', 'word', 'আজ আবহাওয়া ভালো।', 'The weather is good today.'),
    createContentItem('কাল', 'kal', 'Tomorrow / Yesterday', 'word', 'কাল আমি যাবো।', 'I will go tomorrow.'),
    createContentItem('পরিবার', 'poribar', 'Family', 'word', 'আমার পরিবার বড়।', 'My family is big.'),
    createContentItem('বাবা', 'baba', 'Father', 'word'),
    createContentItem('মা', 'ma', 'Mother', 'word'),
    createContentItem('ভাই', 'bhai', 'Brother', 'word'),
    createContentItem('বোন', 'bon', 'Sister', 'word'),
    createContentItem('বাড়ি', 'bari', 'Home/House', 'word', 'আমি বাড়ি যাচ্ছি।', 'I am going home.'),
    createContentItem('আমি প্রতিদিন সকালে উঠি।', 'ami protidin shokale uthi.', 'I wake up every morning.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'প্রতিদিন', native: 'every day' },
      { target: 'সকালে', native: 'in the morning' },
      { target: 'উঠি', native: 'wake up' },
    ]),
    createContentItem('আমি স্কুলে যাই।', 'ami skule jai.', 'I go to school.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'স্কুলে', native: 'to school' },
      { target: 'যাই', native: 'go' },
    ]),
    createContentItem('আমি কাজ করি।', 'ami kaj kori.', 'I work.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'কাজ', native: 'work' },
      { target: 'করি', native: 'do' },
    ]),
    createContentItem('আবহাওয়া কেমন?', 'abohawa kemon?', 'How is the weather?', 'sentence', '', '', [
      { target: 'আবহাওয়া', native: 'weather' },
      { target: 'কেমন', native: 'how' },
    ]),
    createContentItem('আজ খুব গরম।', 'aj khub gorom.', 'It is very hot today.', 'sentence', '', '', [
      { target: 'আজ', native: 'today' },
      { target: 'খুব', native: 'very' },
      { target: 'গরম', native: 'hot' },
    ]),
    createContentItem('বৃষ্টি হচ্ছে।', 'brishti hochchhe.', 'It is raining.', 'sentence', '', '', [
      { target: 'বৃষ্টি', native: 'rain' },
      { target: 'হচ্ছে', native: 'is happening' },
    ]),
    createContentItem('আমি গোসল করছি।', 'ami gosol korchhi.', 'I am taking a bath.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'গোসল', native: 'bath' },
      { target: 'করছি', native: 'am doing' },
    ]),
    createContentItem('আমি পড়াশোনা করছি।', 'ami porashona korchhi.', 'I am studying.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'পড়াশোনা', native: 'study' },
      { target: 'করছি', native: 'am doing' },
    ]),
    createContentItem('ঘড়ি', 'ghori', 'Clock/Watch', 'word', 'ঘড়িতে কয়টা বাজে?', 'What time is it on the clock?'),
    createContentItem('ফোন', 'phone', 'Phone', 'word', 'আমার ফোন কোথায়?', 'Where is my phone?'),
    createContentItem('আমি ঘুমাতে যাচ্ছি।', 'ami ghumate jachchhi.', 'I am going to sleep.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'ঘুমাতে', native: 'to sleep' },
      { target: 'যাচ্ছি', native: 'am going' },
    ]),
    createContentItem('বন্ধু', 'bondhu', 'Friend', 'word', 'সে আমার বন্ধু।', 'He/She is my friend.'),
    createContentItem('আমি বাসায় আছি।', 'ami bashay achhi.', 'I am at home.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'বাসায়', native: 'at home' },
      { target: 'আছি', native: 'am' },
    ]),
  ],
};

// ===================== FOOD =====================
const food = {
  title: 'Food & Dining',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'bn',
  content: [
    createContentItem('খাবার', 'khabar', 'Food', 'word', 'খাবার তৈরি আছে।', 'The food is ready.'),
    createContentItem('ভাত', 'bhat', 'Rice', 'word', 'আমি ভাত খাই।', 'I eat rice.'),
    createContentItem('মাছ', 'machh', 'Fish', 'word', 'ইলিশ মাছ খুব সুস্বাদু।', 'Hilsa fish is very tasty.'),
    createContentItem('মাংস', 'mangsho', 'Meat', 'word', 'মুরগির মাংস আছে?', 'Is there chicken?'),
    createContentItem('ডাল', 'dal', 'Lentils', 'word', 'ডাল ভাত খুব ভালো।', 'Rice and lentils is very good.'),
    createContentItem('সবজি', 'shobji', 'Vegetables', 'word', 'তাজা সবজি কিনুন।', 'Buy fresh vegetables.'),
    createContentItem('পানি', 'pani', 'Water', 'word', 'এক গ্লাস পানি দিন।', 'Give me a glass of water.'),
    createContentItem('চা', 'cha', 'Tea', 'word', 'এক কাপ চা দিন।', 'Give me a cup of tea.'),
    createContentItem('দুধ', 'dudh', 'Milk', 'word', 'দুধ চা বানান।', 'Make milk tea.'),
    createContentItem('ফল', 'phol', 'Fruit', 'word', 'আম আমার প্রিয় ফল।', 'Mango is my favorite fruit.'),
    createContentItem('আম', 'am', 'Mango', 'word'),
    createContentItem('রুটি', 'ruti', 'Bread/Roti', 'word', 'সকালে রুটি খাই।', 'I eat bread in the morning.'),
    createContentItem('আমি খেতে চাই।', 'ami khete chai.', 'I want to eat.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'খেতে', native: 'to eat' },
      { target: 'চাই', native: 'want' },
    ]),
    createContentItem('খাবার মেনু দেখতে পারি?', 'khabar menu dekhte pari?', 'Can I see the food menu?', 'sentence', '', '', [
      { target: 'খাবার', native: 'food' },
      { target: 'মেনু', native: 'menu' },
      { target: 'দেখতে পারি', native: 'can I see' },
    ]),
    createContentItem('এটা কত টাকা?', 'eta koto taka?', 'How much does this cost?', 'sentence', '', '', [
      { target: 'এটা', native: 'this' },
      { target: 'কত', native: 'how much' },
      { target: 'টাকা', native: 'taka (money)' },
    ]),
    createContentItem('খাবার খুব সুস্বাদু।', 'khabar khub shushadu.', 'The food is very delicious.', 'sentence', '', '', [
      { target: 'খাবার', native: 'food' },
      { target: 'খুব', native: 'very' },
      { target: 'সুস্বাদু', native: 'delicious' },
    ]),
    createContentItem('আমি নিরামিষ খাই।', 'ami niramish khai.', 'I eat vegetarian food.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'নিরামিষ', native: 'vegetarian' },
      { target: 'খাই', native: 'eat' },
    ]),
    createContentItem('বিল দিন।', 'bil din.', 'Give me the bill.', 'sentence', '', '', [
      { target: 'বিল', native: 'bill' },
      { target: 'দিন', native: 'give' },
    ]),
    createContentItem('মিষ্টি', 'mishti', 'Sweets/Dessert', 'word', 'বাংলার মিষ্টি বিখ্যাত।', 'Bengali sweets are famous.'),
    createContentItem('ঝাল', 'jhal', 'Spicy', 'word', 'খাবারটা খুব ঝাল।', 'The food is very spicy.'),
    createContentItem('আমি পানি খেতে চাই।', 'ami pani khete chai.', 'I want to drink water.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'পানি', native: 'water' },
      { target: 'খেতে চাই', native: 'want to drink' },
    ]),
    createContentItem('ভরা পেট', 'bhora pet', 'Full stomach', 'word', 'আমার পেট ভরা।', 'My stomach is full.'),
    createContentItem('ক্ষুধা', 'khudha', 'Hunger', 'word', 'আমার খুব ক্ষুধা লেগেছে।', 'I am very hungry.'),
    createContentItem('দয়া করে আরেকটু দিন।', 'doya kore arektu din.', 'Please give me a little more.', 'sentence', '', '', [
      { target: 'দয়া করে', native: 'please' },
      { target: 'আরেকটু', native: 'a little more' },
      { target: 'দিন', native: 'give' },
    ]),
    createContentItem('লবণ', 'lobon', 'Salt', 'word'),
    createContentItem('চিনি', 'chini', 'Sugar', 'word'),
  ],
};

// ===================== TRAVEL =====================
const travel = {
  title: 'Travel & Transportation',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'bn',
  content: [
    createContentItem('বিমানবন্দর', 'bimanbondor', 'Airport', 'word', 'বিমানবন্দরে যেতে কতক্ষণ লাগে?', 'How long does it take to go to the airport?'),
    createContentItem('স্টেশন', 'station', 'Station', 'word', 'রেলস্টেশন কোথায়?', 'Where is the railway station?'),
    createContentItem('বাস', 'bas', 'Bus', 'word', 'বাস কখন আসবে?', 'When will the bus come?'),
    createContentItem('রিকশা', 'riksha', 'Rickshaw', 'word', 'রিকশায় করে যাবো।', 'I will go by rickshaw.'),
    createContentItem('ট্রেন', 'tren', 'Train', 'word', 'ঢাকা থেকে ট্রেন আছে।', 'There is a train from Dhaka.'),
    createContentItem('টিকিট', 'tikit', 'Ticket', 'word', 'একটা টিকিট দিন।', 'Give me one ticket.'),
    createContentItem('হোটেল', 'hotel', 'Hotel', 'word', 'ভালো হোটেল কোথায়?', 'Where is a good hotel?'),
    createContentItem('মানচিত্র', 'manchitro', 'Map', 'word'),
    createContentItem('পাসপোর্ট', 'passport', 'Passport', 'word', 'আপনার পাসপোর্ট দেখান।', 'Show your passport.'),
    createContentItem('এটা কোথায়?', 'eta kothay?', 'Where is this?', 'sentence', '', '', [
      { target: 'এটা', native: 'this' },
      { target: 'কোথায়', native: 'where' },
    ]),
    createContentItem('আমি ঢাকায় যেতে চাই।', 'ami Dhakay jete chai.', 'I want to go to Dhaka.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'ঢাকায়', native: 'to Dhaka' },
      { target: 'যেতে চাই', native: 'want to go' },
    ]),
    createContentItem('কতদূর?', 'kotodur?', 'How far?', 'word'),
    createContentItem('ডানে', 'dane', 'Right', 'word', 'ডানে যান।', 'Go right.'),
    createContentItem('বামে', 'bame', 'Left', 'word', 'বামে ঘুরুন।', 'Turn left.'),
    createContentItem('সোজা', 'shoja', 'Straight', 'word', 'সোজা যান।', 'Go straight.'),
    createContentItem('কাছে', 'kachhe', 'Near', 'word', 'এটা কি কাছে?', 'Is it nearby?'),
    createContentItem('দূরে', 'dure', 'Far', 'word', 'অনেক দূরে।', 'It is very far.'),
    createContentItem('আমি পথ হারিয়ে ফেলেছি।', 'ami poth hariye felechhi.', 'I am lost.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'পথ', native: 'way/path' },
      { target: 'হারিয়ে ফেলেছি', native: 'have lost' },
    ]),
    createContentItem('ট্যাক্সি ডাকুন।', 'taxi dakun.', 'Call a taxi.', 'sentence', '', '', [
      { target: 'ট্যাক্সি', native: 'taxi' },
      { target: 'ডাকুন', native: 'call' },
    ]),
    createContentItem('একটা ঘর বুক করতে চাই।', 'ekta ghor book korte chai.', 'I want to book a room.', 'sentence', '', '', [
      { target: 'একটা', native: 'one' },
      { target: 'ঘর', native: 'room' },
      { target: 'বুক করতে চাই', native: 'want to book' },
    ]),
    createContentItem('চেক-ইন', 'check-in', 'Check-in', 'word'),
    createContentItem('চেক-আউট', 'check-out', 'Check-out', 'word'),
    createContentItem('এখানে কতক্ষণ লাগবে?', 'ekhane kotokhon lagbe?', 'How long will it take to get here?', 'sentence', '', '', [
      { target: 'এখানে', native: 'here' },
      { target: 'কতক্ষণ', native: 'how long' },
      { target: 'লাগবে', native: 'will it take' },
    ]),
    createContentItem('সমুদ্র সৈকত', 'shomudro shoikot', 'Beach', 'word', 'কক্সবাজার সমুদ্র সৈকত সুন্দর।', 'Cox\'s Bazar beach is beautiful.'),
    createContentItem('আমি ভ্রমণে যাচ্ছি।', 'ami bhromone jachchhi.', 'I am going on a trip.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'ভ্রমণে', native: 'on a trip' },
      { target: 'যাচ্ছি', native: 'am going' },
    ]),
  ],
};

// ===================== SHOPPING =====================
const shopping = {
  title: 'Shopping & Markets',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'bn',
  content: [
    createContentItem('বাজার', 'bajar', 'Market', 'word', 'আমি বাজারে যাচ্ছি।', 'I am going to the market.'),
    createContentItem('দোকান', 'dokan', 'Shop/Store', 'word', 'দোকান কখন বন্ধ হয়?', 'When does the shop close?'),
    createContentItem('দাম', 'dam', 'Price', 'word', 'এটার দাম কত?', 'What is the price of this?'),
    createContentItem('টাকা', 'taka', 'Taka (currency) / Money', 'word', 'আমার কাছে টাকা নেই।', 'I don\'t have money.'),
    createContentItem('সস্তা', 'shosta', 'Cheap', 'word', 'এটা কি সস্তা?', 'Is this cheap?'),
    createContentItem('দামী', 'dami', 'Expensive', 'word', 'এটা খুব দামী।', 'This is very expensive.'),
    createContentItem('কাপড়', 'kapor', 'Clothes', 'word', 'নতুন কাপড় কিনবো।', 'I will buy new clothes.'),
    createContentItem('জুতা', 'juta', 'Shoes', 'word', 'এই জুতা কত?', 'How much are these shoes?'),
    createContentItem('এটা কত?', 'eta koto?', 'How much is this?', 'sentence', '', '', [
      { target: 'এটা', native: 'this' },
      { target: 'কত', native: 'how much' },
    ]),
    createContentItem('আমি এটা কিনবো।', 'ami eta kinbo.', 'I will buy this.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'এটা', native: 'this' },
      { target: 'কিনবো', native: 'will buy' },
    ]),
    createContentItem('দাম কমান।', 'dam koman.', 'Reduce the price.', 'sentence', '', '', [
      { target: 'দাম', native: 'price' },
      { target: 'কমান', native: 'reduce' },
    ]),
    createContentItem('আর কিছু আছে?', 'ar kichhu achhe?', 'Is there anything else?', 'sentence', '', '', [
      { target: 'আর', native: 'more' },
      { target: 'কিছু', native: 'something' },
      { target: 'আছে', native: 'is there' },
    ]),
    createContentItem('বড়', 'boro', 'Big/Large', 'word', 'আরেকটু বড় সাইজ দিন।', 'Give me a slightly bigger size.'),
    createContentItem('ছোট', 'chhoto', 'Small', 'word', 'এটা ছোট হয়ে গেছে।', 'This has become too small.'),
    createContentItem('রং', 'rong', 'Color', 'word', 'অন্য রং আছে?', 'Is there another color?'),
    createContentItem('লাল', 'lal', 'Red', 'word'),
    createContentItem('নীল', 'nil', 'Blue', 'word'),
    createContentItem('সবুজ', 'shobuj', 'Green', 'word'),
    createContentItem('সাদা', 'shada', 'White', 'word'),
    createContentItem('কালো', 'kalo', 'Black', 'word'),
    createContentItem('আমি শুধু দেখছি।', 'ami shudhu dekhchhi.', 'I am just looking.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'শুধু', native: 'just' },
      { target: 'দেখছি', native: 'am looking' },
    ]),
    createContentItem('ব্যাগ', 'byag', 'Bag', 'word', 'একটা ব্যাগ দিন।', 'Give me a bag.'),
    createContentItem('থলে', 'thole', 'Bag/Sack', 'word'),
    createContentItem('এটা দেখতে পারি?', 'eta dekhte pari?', 'Can I see this?', 'sentence', '', '', [
      { target: 'এটা', native: 'this' },
      { target: 'দেখতে পারি', native: 'can I see' },
    ]),
    createContentItem('ফেরত দিতে পারবো?', 'pherat dite parbo?', 'Can I return it?', 'sentence', '', '', [
      { target: 'ফেরত', native: 'return' },
      { target: 'দিতে পারবো', native: 'can I give' },
    ]),
  ],
};

// ===================== BUSINESS =====================
const business = {
  title: 'Business & Work',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'bn',
  content: [
    createContentItem('অফিস', 'office', 'Office', 'word', 'আমি অফিসে যাচ্ছি।', 'I am going to the office.'),
    createContentItem('কাজ', 'kaj', 'Work/Job', 'word', 'আমার অনেক কাজ আছে।', 'I have a lot of work.'),
    createContentItem('মিটিং', 'meeting', 'Meeting', 'word', 'আজ মিটিং আছে।', 'There is a meeting today.'),
    createContentItem('বস', 'bos', 'Boss', 'word'),
    createContentItem('সহকর্মী', 'shohokormi', 'Colleague', 'word', 'তিনি আমার সহকর্মী।', 'He/She is my colleague.'),
    createContentItem('বেতন', 'beton', 'Salary', 'word', 'বেতন কত?', 'What is the salary?'),
    createContentItem('চাকরি', 'chakri', 'Job/Employment', 'word', 'আমি চাকরি খুঁজছি।', 'I am looking for a job.'),
    createContentItem('ব্যবসা', 'byabsha', 'Business', 'word', 'আমি ব্যবসা করি।', 'I do business.'),
    createContentItem('কম্পিউটার', 'computer', 'Computer', 'word', 'কম্পিউটার চালু করুন।', 'Turn on the computer.'),
    createContentItem('ইমেইল', 'email', 'Email', 'word', 'আমাকে ইমেইল পাঠান।', 'Send me an email.'),
    createContentItem('আমি একটা মিটিংয়ে আছি।', 'ami ekta meetinge achhi.', 'I am in a meeting.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'একটা', native: 'one/a' },
      { target: 'মিটিংয়ে', native: 'in a meeting' },
      { target: 'আছি', native: 'am' },
    ]),
    createContentItem('আপনার সাথে কথা বলতে চাই।', 'apnar shathe kotha bolte chai.', 'I want to talk to you.', 'sentence', '', '', [
      { target: 'আপনার সাথে', native: 'with you' },
      { target: 'কথা', native: 'words/talk' },
      { target: 'বলতে চাই', native: 'want to say' },
    ]),
    createContentItem('দয়া করে এটা দেখুন।', 'doya kore eta dekhun.', 'Please look at this.', 'sentence', '', '', [
      { target: 'দয়া করে', native: 'please' },
      { target: 'এটা', native: 'this' },
      { target: 'দেখুন', native: 'look' },
    ]),
    createContentItem('আমি রাজি।', 'ami raji.', 'I agree.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'রাজি', native: 'agree' },
    ]),
    createContentItem('আমি রাজি নই।', 'ami raji noi.', 'I disagree.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'রাজি নই', native: 'do not agree' },
    ]),
    createContentItem('সময়সীমা', 'shomoyshima', 'Deadline', 'word', 'সময়সীমা কবে?', 'When is the deadline?'),
    createContentItem('প্রকল্প', 'prokolpo', 'Project', 'word', 'এই প্রকল্প গুরুত্বপূর্ণ।', 'This project is important.'),
    createContentItem('অভিজ্ঞতা', 'obhiggyota', 'Experience', 'word', 'আপনার কত বছরের অভিজ্ঞতা আছে?', 'How many years of experience do you have?'),
    createContentItem('প্রশিক্ষণ', 'proshikkhon', 'Training', 'word', 'আগামীকাল প্রশিক্ষণ আছে।', 'There is training tomorrow.'),
    createContentItem('ছুটি', 'chhuti', 'Leave/Holiday', 'word', 'আমি ছুটি নিতে চাই।', 'I want to take leave.'),
    createContentItem('আমি দেরিতে আসবো।', 'ami derite ashbo.', 'I will be late.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'দেরিতে', native: 'late' },
      { target: 'আসবো', native: 'will come' },
    ]),
    createContentItem('ধন্যবাদ, ভালো কাজ করেছেন।', 'dhonnobad, bhalo kaj korechhen.', 'Thank you, you did a good job.', 'sentence', '', '', [
      { target: 'ধন্যবাদ', native: 'thank you' },
      { target: 'ভালো কাজ', native: 'good work' },
      { target: 'করেছেন', native: 'you have done' },
    ]),
    createContentItem('স্বাক্ষর', 'shakkhor', 'Signature', 'word', 'এখানে স্বাক্ষর করুন।', 'Sign here.'),
    createContentItem('চুক্তি', 'chukti', 'Contract/Agreement', 'word'),
  ],
};

// ===================== HEALTHCARE =====================
const healthcare = {
  title: 'Healthcare & Emergencies',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'bn',
  content: [
    createContentItem('ডাক্তার', 'daktar', 'Doctor', 'word', 'আমাকে ডাক্তারের কাছে নিয়ে যান।', 'Take me to the doctor.'),
    createContentItem('হাসপাতাল', 'hashpatal', 'Hospital', 'word', 'হাসপাতাল কোথায়?', 'Where is the hospital?'),
    createContentItem('ওষুধ', 'oshudh', 'Medicine', 'word', 'ওষুধ খেয়েছেন?', 'Have you taken your medicine?'),
    createContentItem('ব্যথা', 'byatha', 'Pain', 'word', 'আমার মাথায় ব্যথা।', 'I have a headache.'),
    createContentItem('জ্বর', 'jor', 'Fever', 'word', 'আমার জ্বর আছে।', 'I have a fever.'),
    createContentItem('সর্দি', 'shordi', 'Cold (illness)', 'word', 'আমার সর্দি হয়েছে।', 'I have caught a cold.'),
    createContentItem('কাশি', 'kashi', 'Cough', 'word', 'আমার কাশি আছে।', 'I have a cough.'),
    createContentItem('মাথা ব্যথা', 'matha byatha', 'Headache', 'word'),
    createContentItem('পেট ব্যথা', 'pet byatha', 'Stomach ache', 'word', 'আমার পেটে ব্যথা।', 'I have a stomach ache.'),
    createContentItem('অ্যাম্বুলেন্স', 'ambulance', 'Ambulance', 'word', 'অ্যাম্বুলেন্স ডাকুন!', 'Call an ambulance!'),
    createContentItem('আমার শরীর খারাপ।', 'amar shorir kharap.', 'I am feeling unwell.', 'sentence', '', '', [
      { target: 'আমার', native: 'my' },
      { target: 'শরীর', native: 'body/health' },
      { target: 'খারাপ', native: 'bad' },
    ]),
    createContentItem('আমার সাহায্য দরকার।', 'amar shahajjo dorkar.', 'I need help.', 'sentence', '', '', [
      { target: 'আমার', native: 'my/I' },
      { target: 'সাহায্য', native: 'help' },
      { target: 'দরকার', native: 'need' },
    ]),
    createContentItem('এটা কি জরুরি?', 'eta ki joruri?', 'Is this an emergency?', 'sentence', '', '', [
      { target: 'এটা', native: 'this' },
      { target: 'কি', native: 'is it' },
      { target: 'জরুরি', native: 'emergency/urgent' },
    ]),
    createContentItem('ফার্মেসি কোথায়?', 'pharmacy kothay?', 'Where is the pharmacy?', 'sentence', '', '', [
      { target: 'ফার্মেসি', native: 'pharmacy' },
      { target: 'কোথায়', native: 'where' },
    ]),
    createContentItem('আমার অ্যালার্জি আছে।', 'amar allergy achhe.', 'I have an allergy.', 'sentence', '', '', [
      { target: 'আমার', native: 'I have / my' },
      { target: 'অ্যালার্জি', native: 'allergy' },
      { target: 'আছে', native: 'have/exists' },
    ]),
    createContentItem('রক্তচাপ', 'roktochap', 'Blood pressure', 'word', 'রক্তচাপ মাপুন।', 'Check the blood pressure.'),
    createContentItem('ডায়াবেটিস', 'diabetes', 'Diabetes', 'word', 'আমার ডায়াবেটিস আছে।', 'I have diabetes.'),
    createContentItem('দাঁত', 'dat', 'Tooth', 'word', 'আমার দাঁতে ব্যথা।', 'I have a toothache.'),
    createContentItem('চোখ', 'chokh', 'Eye', 'word', 'আমার চোখে সমস্যা।', 'I have an eye problem.'),
    createContentItem('নার্স', 'nurse', 'Nurse', 'word'),
    createContentItem('আমি অসুস্থ।', 'ami osustho.', 'I am sick.', 'sentence', '', '', [
      { target: 'আমি', native: 'I' },
      { target: 'অসুস্থ', native: 'sick/unwell' },
    ]),
    createContentItem('আমাকে ওষুধ দিন।', 'amake oshudh din.', 'Give me medicine.', 'sentence', '', '', [
      { target: 'আমাকে', native: 'to me' },
      { target: 'ওষুধ', native: 'medicine' },
      { target: 'দিন', native: 'give' },
    ]),
    createContentItem('কখন ভালো হবে?', 'kokhon bhalo hobe?', 'When will I get better?', 'sentence', '', '', [
      { target: 'কখন', native: 'when' },
      { target: 'ভালো হবে', native: 'will get better' },
    ]),
    createContentItem('রক্ত পরীক্ষা', 'rokto poriksha', 'Blood test', 'word', 'রক্ত পরীক্ষা করতে হবে।', 'A blood test needs to be done.'),
    createContentItem('বীমা', 'bima', 'Insurance', 'word', 'আপনার স্বাস্থ্য বীমা আছে?', 'Do you have health insurance?'),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
