// Filipino (Tagalog) Beginner Lessons
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
  targetLang: 'fil',
  content: [
    createContentItem('Kamusta', '', 'Hello / How are you', 'word', 'Kamusta ka?', 'How are you?'),
    createContentItem('Magandang umaga', '', 'Good morning', 'word', 'Magandang umaga po.', 'Good morning (polite).'),
    createContentItem('Magandang hapon', '', 'Good afternoon', 'word', 'Magandang hapon po.', 'Good afternoon (polite).'),
    createContentItem('Magandang gabi', '', 'Good evening', 'word', 'Magandang gabi po.', 'Good evening (polite).'),
    createContentItem('Oo', '', 'Yes', 'word', 'Oo, tama.', 'Yes, correct.'),
    createContentItem('Hindi', '', 'No', 'word', 'Hindi po.', 'No (polite).'),
    createContentItem('Salamat', '', 'Thank you', 'word', 'Maraming salamat po.', 'Thank you very much (polite).'),
    createContentItem('Walang anuman', '', 'You are welcome', 'word', 'Walang anuman po.', 'You are welcome (polite).'),
    createContentItem('Paalam', '', 'Goodbye', 'word', 'Paalam na po.', 'Goodbye (polite).'),
    createContentItem('Po', '', 'Polite particle (respect)', 'word', 'Salamat po.', 'Thank you (polite).'),
    createContentItem('Opo', '', 'Yes (polite)', 'word', 'Opo, naiintindihan ko.', 'Yes (polite), I understand.'),
    createContentItem('Paumanhin', '', 'Excuse me / Sorry', 'word', 'Paumanhin po.', 'Excuse me (polite).'),
    createContentItem('Pasensya na', '', 'Sorry / Please bear with me', 'word', 'Pasensya na po.', 'Sorry (polite).'),
    createContentItem('Ano ang pangalan mo?', '', 'What is your name?', 'sentence', '', '', [
      { target: 'Ano', native: 'What' },
      { target: 'ang pangalan', native: 'the name' },
      { target: 'mo', native: 'your' },
    ]),
    createContentItem('Ang pangalan ko ay...', '', 'My name is...', 'sentence', 'Ang pangalan ko ay Maria.', 'My name is Maria.', [
      { target: 'Ang pangalan', native: 'The name' },
      { target: 'ko', native: 'my' },
      { target: 'ay', native: 'is' },
    ]),
    createContentItem('Kamusta ka?', '', 'How are you?', 'sentence', '', '', [
      { target: 'Kamusta', native: 'How' },
      { target: 'ka', native: 'you' },
    ]),
    createContentItem('Mabuti naman, salamat.', '', 'I am fine, thank you.', 'sentence', '', '', [
      { target: 'Mabuti', native: 'Fine / Good' },
      { target: 'naman', native: 'also / indeed' },
      { target: 'salamat', native: 'thank you' },
    ]),
    createContentItem('Ikinagagalak kitang makilala.', '', 'Nice to meet you.', 'sentence', '', '', [
      { target: 'Ikinagagalak', native: 'It is a pleasure' },
      { target: 'kitang', native: 'you (linking)' },
      { target: 'makilala', native: 'to meet' },
    ]),
    createContentItem('Taga-saan ka?', '', 'Where are you from?', 'sentence', '', '', [
      { target: 'Taga-saan', native: 'From where' },
      { target: 'ka', native: 'you' },
    ]),
    createContentItem('Taga-Pilipinas ako.', '', 'I am from the Philippines.', 'sentence', '', '', [
      { target: 'Taga-Pilipinas', native: 'From the Philippines' },
      { target: 'ako', native: 'I' },
    ]),
    createContentItem('Ingat ka.', '', 'Take care.', 'sentence', '', '', [
      { target: 'Ingat', native: 'Take care / Be careful' },
      { target: 'ka', native: 'you' },
    ]),
    createContentItem('Hanggang sa muli.', '', 'Until next time.', 'sentence', '', '', [
      { target: 'Hanggang', native: 'Until' },
      { target: 'sa muli', native: 'next time / again' },
    ]),
    createContentItem('Tuloy po kayo.', '', 'Please come in.', 'sentence', '', '', [
      { target: 'Tuloy', native: 'Come in' },
      { target: 'po', native: '(polite particle)' },
      { target: 'kayo', native: 'you (plural/formal)' },
    ]),
    createContentItem('Kumain ka na ba?', '', 'Have you eaten already?', 'sentence', '', '', [
      { target: 'Kumain', native: 'Eat (past)' },
      { target: 'ka', native: 'you' },
      { target: 'na ba', native: 'already (question)' },
    ]),
    createContentItem('Saan ka pupunta?', '', 'Where are you going?', 'sentence', '', '', [
      { target: 'Saan', native: 'Where' },
      { target: 'ka', native: 'you' },
      { target: 'pupunta', native: 'going (future)' },
    ]),
  ],
};

// ============================================================
// DAILY LIFE
// ============================================================
const dailyLife = {
  title: 'Daily Life & Activities',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'fil',
  content: [
    createContentItem('Bahay', '', 'House / Home', 'word', 'Nasa bahay ako.', 'I am at home.'),
    createContentItem('Pamilya', '', 'Family', 'word', 'Malaki ang pamilya ko.', 'My family is big.'),
    createContentItem('Nanay', '', 'Mother', 'word', 'Nasa kusina ang nanay ko.', 'My mother is in the kitchen.'),
    createContentItem('Tatay', '', 'Father', 'word', 'Nagtatrabaho ang tatay ko.', 'My father is working.'),
    createContentItem('Anak', '', 'Child / Son / Daughter', 'word', 'May dalawang anak sila.', 'They have two children.'),
    createContentItem('Kapatid', '', 'Sibling', 'word', 'Ang kapatid ko ay estudyante.', 'My sibling is a student.'),
    createContentItem('Tubig', '', 'Water', 'word', 'Gusto ko ng tubig.', 'I want water.'),
    createContentItem('Pagkain', '', 'Food', 'word', 'Masarap ang pagkain.', 'The food is delicious.'),
    createContentItem('Araw', '', 'Day / Sun', 'word', 'Magandang araw.', 'Beautiful day.'),
    createContentItem('Gabi', '', 'Night', 'word', 'Tahimik ang gabi.', 'The night is quiet.'),
    createContentItem('Trabaho', '', 'Work / Job', 'word', 'Mahirap ang trabaho niya.', 'His/Her work is difficult.'),
    createContentItem('Paaralan', '', 'School', 'word', 'Malapit ang paaralan namin.', 'Our school is nearby.'),
    createContentItem('Oras', '', 'Time / Hour', 'word', 'Anong oras na?', 'What time is it?'),
    createContentItem('Kaibigan', '', 'Friend', 'word', 'Mabait ang kaibigan ko.', 'My friend is kind.'),
    createContentItem('Gising na ako.', '', 'I am already awake.', 'sentence', '', '', [
      { target: 'Gising', native: 'Awake' },
      { target: 'na', native: 'already' },
      { target: 'ako', native: 'I' },
    ]),
    createContentItem('Naliligo ako tuwing umaga.', '', 'I take a bath every morning.', 'sentence', '', '', [
      { target: 'Naliligo', native: 'Taking a bath' },
      { target: 'ako', native: 'I' },
      { target: 'tuwing umaga', native: 'every morning' },
    ]),
    createContentItem('Kumakain ako ng almusal.', '', 'I am eating breakfast.', 'sentence', '', '', [
      { target: 'Kumakain', native: 'Eating' },
      { target: 'ako', native: 'I' },
      { target: 'ng almusal', native: 'breakfast' },
    ]),
    createContentItem('Pupunta ako sa trabaho.', '', 'I am going to work.', 'sentence', '', '', [
      { target: 'Pupunta', native: 'Going (future)' },
      { target: 'ako', native: 'I' },
      { target: 'sa trabaho', native: 'to work' },
    ]),
    createContentItem('Natutulog na ang mga bata.', '', 'The children are already sleeping.', 'sentence', '', '', [
      { target: 'Natutulog', native: 'Sleeping' },
      { target: 'na', native: 'already' },
      { target: 'ang mga bata', native: 'the children' },
    ]),
    createContentItem('Nagluluto ako ng hapunan.', '', 'I am cooking dinner.', 'sentence', '', '', [
      { target: 'Nagluluto', native: 'Cooking' },
      { target: 'ako', native: 'I' },
      { target: 'ng hapunan', native: 'dinner' },
    ]),
    createContentItem('Naglalaba ako ng damit.', '', 'I am doing the laundry.', 'sentence', '', '', [
      { target: 'Naglalaba', native: 'Doing laundry' },
      { target: 'ako', native: 'I' },
      { target: 'ng damit', native: 'clothes' },
    ]),
    createContentItem('Naglilinis ako ng bahay.', '', 'I am cleaning the house.', 'sentence', '', '', [
      { target: 'Naglilinis', native: 'Cleaning' },
      { target: 'ako', native: 'I' },
      { target: 'ng bahay', native: 'the house' },
    ]),
    createContentItem('Nag-aaral ako ng Tagalog.', '', 'I am studying Tagalog.', 'sentence', '', '', [
      { target: 'Nag-aaral', native: 'Studying' },
      { target: 'ako', native: 'I' },
      { target: 'ng Tagalog', native: 'Tagalog' },
    ]),
    createContentItem('Umuulan sa labas.', '', 'It is raining outside.', 'sentence', '', '', [
      { target: 'Umuulan', native: 'Raining' },
      { target: 'sa labas', native: 'outside' },
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
  targetLang: 'fil',
  content: [
    createContentItem('Kanin', '', 'Rice (cooked)', 'word', 'Gusto ko ng kanin.', 'I want rice.'),
    createContentItem('Ulam', '', 'Viand / Main dish', 'word', 'Ano ang ulam natin?', 'What is our main dish?'),
    createContentItem('Isda', '', 'Fish', 'word', 'Masarap ang isda.', 'The fish is delicious.'),
    createContentItem('Manok', '', 'Chicken', 'word', 'Gusto ko ng manok.', 'I want chicken.'),
    createContentItem('Baboy', '', 'Pork', 'word', 'Adobong baboy ang paborito ko.', 'Pork adobo is my favorite.'),
    createContentItem('Gulay', '', 'Vegetables', 'word', 'Kumain ka ng gulay.', 'Eat your vegetables.'),
    createContentItem('Prutas', '', 'Fruit', 'word', 'Gusto ko ng prutas.', 'I want fruit.'),
    createContentItem('Tubig', '', 'Water', 'word', 'Isang basong tubig.', 'A glass of water.'),
    createContentItem('Kape', '', 'Coffee', 'word', 'Uminom ako ng kape.', 'I drank coffee.'),
    createContentItem('Masarap', '', 'Delicious', 'word', 'Masarap ang pagkain mo.', 'Your food is delicious.'),
    createContentItem('Maanghang', '', 'Spicy', 'word', 'Maanghang ang sinigang.', 'The sinigang is spicy.'),
    createContentItem('Matamis', '', 'Sweet', 'word', 'Matamis ang mangga.', 'The mango is sweet.'),
    createContentItem('Almusal', '', 'Breakfast', 'word', 'Kumain ka na ng almusal?', 'Have you eaten breakfast?'),
    createContentItem('Tanghalian', '', 'Lunch', 'word', 'Oras na ng tanghalian.', 'It is time for lunch.'),
    createContentItem('Hapunan', '', 'Dinner', 'word', 'Ano ang hapunan natin?', 'What is for dinner?'),
    createContentItem('Adobo', '', 'Adobo (braised meat dish)', 'word', 'Lutuin natin ang adobo.', 'Let us cook adobo.'),
    createContentItem('Sinigang', '', 'Sinigang (sour soup)', 'word', 'Masarap ang sinigang na baboy.', 'The pork sinigang is delicious.'),
    createContentItem('Gutom na ako.', '', 'I am already hungry.', 'sentence', '', '', [
      { target: 'Gutom', native: 'Hungry' },
      { target: 'na', native: 'already' },
      { target: 'ako', native: 'I' },
    ]),
    createContentItem('Kain na tayo.', '', 'Let us eat now.', 'sentence', '', '', [
      { target: 'Kain', native: 'Eat' },
      { target: 'na', native: 'now' },
      { target: 'tayo', native: 'we (inclusive)' },
    ]),
    createContentItem('Puwede po bang makita ang menu?', '', 'May I see the menu, please?', 'sentence', '', '', [
      { target: 'Puwede po bang', native: 'May I please' },
      { target: 'makita', native: 'see' },
      { target: 'ang menu', native: 'the menu' },
    ]),
    createContentItem('Ano po ang masarap dito?', '', 'What is delicious here?', 'sentence', '', '', [
      { target: 'Ano po', native: 'What (polite)' },
      { target: 'ang masarap', native: 'the delicious (thing)' },
      { target: 'dito', native: 'here' },
    ]),
    createContentItem('Isa pang kanin, po.', '', 'One more rice, please.', 'sentence', '', '', [
      { target: 'Isa pang', native: 'One more' },
      { target: 'kanin', native: 'rice' },
      { target: 'po', native: '(polite particle)' },
    ]),
    createContentItem('Busog na ako.', '', 'I am already full.', 'sentence', '', '', [
      { target: 'Busog', native: 'Full (stomach)' },
      { target: 'na', native: 'already' },
      { target: 'ako', native: 'I' },
    ]),
    createContentItem('Pabili po ng tubig.', '', 'I would like to buy water, please.', 'sentence', '', '', [
      { target: 'Pabili', native: 'I would like to buy' },
      { target: 'po', native: '(polite particle)' },
      { target: 'ng tubig', native: 'water' },
    ]),
    createContentItem('Magkano po ang lahat?', '', 'How much is everything?', 'sentence', '', '', [
      { target: 'Magkano', native: 'How much' },
      { target: 'po', native: '(polite particle)' },
      { target: 'ang lahat', native: 'everything' },
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
  targetLang: 'fil',
  content: [
    createContentItem('Sasakyan', '', 'Vehicle', 'word', 'Nasaan ang sasakyan?', 'Where is the vehicle?'),
    createContentItem('Eroplano', '', 'Airplane', 'word', 'Sasakay ako ng eroplano.', 'I will ride an airplane.'),
    createContentItem('Barko', '', 'Ship', 'word', 'Malaki ang barko.', 'The ship is big.'),
    createContentItem('Bus', '', 'Bus', 'word', 'Sumakay ako ng bus.', 'I rode the bus.'),
    createContentItem('Dyip', '', 'Jeepney', 'word', 'Sumasakay ako ng dyip araw-araw.', 'I ride the jeepney every day.'),
    createContentItem('Tren', '', 'Train', 'word', 'Mabilis ang tren.', 'The train is fast.'),
    createContentItem('Paliparan', '', 'Airport', 'word', 'Malapit ang paliparan.', 'The airport is nearby.'),
    createContentItem('Daungan', '', 'Port / Pier', 'word', 'Pumunta kami sa daungan.', 'We went to the port.'),
    createContentItem('Hotel', '', 'Hotel', 'word', 'Maganda ang hotel namin.', 'Our hotel is nice.'),
    createContentItem('Mapa', '', 'Map', 'word', 'May mapa ka ba?', 'Do you have a map?'),
    createContentItem('Pasaporte', '', 'Passport', 'word', 'Nasaan ang pasaporte ko?', 'Where is my passport?'),
    createContentItem('Maleta', '', 'Suitcase / Luggage', 'word', 'Mabigat ang maleta ko.', 'My suitcase is heavy.'),
    createContentItem('Tiket', '', 'Ticket', 'word', 'Bilhin mo ang tiket.', 'Buy the ticket.'),
    createContentItem('Kalsada', '', 'Road / Street', 'word', 'Maluwag ang kalsada.', 'The road is wide.'),
    createContentItem('Paano pumunta sa...?', '', 'How do I get to...?', 'sentence', 'Paano pumunta sa palengke?', 'How do I get to the market?', [
      { target: 'Paano', native: 'How' },
      { target: 'pumunta', native: 'to go' },
      { target: 'sa', native: 'to' },
    ]),
    createContentItem('Nasaan ang istasyon ng tren?', '', 'Where is the train station?', 'sentence', '', '', [
      { target: 'Nasaan', native: 'Where' },
      { target: 'ang istasyon', native: 'the station' },
      { target: 'ng tren', native: 'of the train' },
    ]),
    createContentItem('Magkano po ang pamasahe?', '', 'How much is the fare?', 'sentence', '', '', [
      { target: 'Magkano', native: 'How much' },
      { target: 'po', native: '(polite particle)' },
      { target: 'ang pamasahe', native: 'the fare' },
    ]),
    createContentItem('Para po.', '', 'Stop here, please. (for jeepney)', 'sentence', '', '', [
      { target: 'Para', native: 'Stop' },
      { target: 'po', native: '(polite particle)' },
    ]),
    createContentItem('Malayo pa ba?', '', 'Is it still far?', 'sentence', '', '', [
      { target: 'Malayo', native: 'Far' },
      { target: 'pa ba', native: 'still (question)' },
    ]),
    createContentItem('Malapit lang po.', '', 'It is just nearby.', 'sentence', '', '', [
      { target: 'Malapit', native: 'Near' },
      { target: 'lang', native: 'just / only' },
      { target: 'po', native: '(polite particle)' },
    ]),
    createContentItem('Saan po ang banyo?', '', 'Where is the bathroom?', 'sentence', '', '', [
      { target: 'Saan', native: 'Where' },
      { target: 'po', native: '(polite particle)' },
      { target: 'ang banyo', native: 'the bathroom' },
    ]),
    createContentItem('May bakanteng kuwarto ba kayo?', '', 'Do you have a vacant room?', 'sentence', '', '', [
      { target: 'May', native: 'There is / Have' },
      { target: 'bakanteng kuwarto', native: 'vacant room' },
      { target: 'ba kayo', native: '(question) you (formal)' },
    ]),
    createContentItem('Kumanan ka sa kanto.', '', 'Turn right at the corner.', 'sentence', '', '', [
      { target: 'Kumanan', native: 'Turn right' },
      { target: 'ka', native: 'you' },
      { target: 'sa kanto', native: 'at the corner' },
    ]),
    createContentItem('Kumaliwa ka pagkatapos ng simbahan.', '', 'Turn left after the church.', 'sentence', '', '', [
      { target: 'Kumaliwa', native: 'Turn left' },
      { target: 'ka', native: 'you' },
      { target: 'pagkatapos ng simbahan', native: 'after the church' },
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
  targetLang: 'fil',
  content: [
    createContentItem('Tindahan', '', 'Store / Shop', 'word', 'Pumunta tayo sa tindahan.', 'Let us go to the store.'),
    createContentItem('Palengke', '', 'Market', 'word', 'Mamimili ako sa palengke.', 'I will shop at the market.'),
    createContentItem('Pera', '', 'Money', 'word', 'Wala akong pera.', 'I do not have money.'),
    createContentItem('Presyo', '', 'Price', 'word', 'Mataas ang presyo.', 'The price is high.'),
    createContentItem('Mura', '', 'Cheap / Affordable', 'word', 'Mura ang gulay dito.', 'The vegetables are cheap here.'),
    createContentItem('Mahal', '', 'Expensive / Love', 'word', 'Mahal ang damit na ito.', 'This clothing is expensive.'),
    createContentItem('Damit', '', 'Clothes', 'word', 'Maganda ang damit mo.', 'Your clothes are nice.'),
    createContentItem('Sapatos', '', 'Shoes', 'word', 'Bago ang sapatos ko.', 'My shoes are new.'),
    createContentItem('Bag', '', 'Bag', 'word', 'Malaki ang bag niya.', 'His/Her bag is big.'),
    createContentItem('Sukli', '', 'Change (money)', 'word', 'Nasaan ang sukli ko?', 'Where is my change?'),
    createContentItem('Resibo', '', 'Receipt', 'word', 'Pabigay po ng resibo.', 'Please give me a receipt.'),
    createContentItem('Diskwento', '', 'Discount', 'word', 'May diskwento po ba?', 'Is there a discount?'),
    createContentItem('Tawad', '', 'Bargain / Haggle', 'word', 'Puwede po bang tumawad?', 'Can I haggle?'),
    createContentItem('Magkano po ito?', '', 'How much is this?', 'sentence', '', '', [
      { target: 'Magkano', native: 'How much' },
      { target: 'po', native: '(polite particle)' },
      { target: 'ito', native: 'this' },
    ]),
    createContentItem('Masyado pong mahal.', '', 'It is too expensive.', 'sentence', '', '', [
      { target: 'Masyado', native: 'Too much' },
      { target: 'pong', native: '(polite particle + linker)' },
      { target: 'mahal', native: 'expensive' },
    ]),
    createContentItem('Puwede po bang tumawad?', '', 'Can I bargain?', 'sentence', '', '', [
      { target: 'Puwede po bang', native: 'Can I (polite question)' },
      { target: 'tumawad', native: 'bargain / haggle' },
    ]),
    createContentItem('Bibilhin ko na ito.', '', 'I will buy this now.', 'sentence', '', '', [
      { target: 'Bibilhin', native: 'Will buy' },
      { target: 'ko', native: 'I' },
      { target: 'na', native: 'now / already' },
      { target: 'ito', native: 'this' },
    ]),
    createContentItem('May ibang kulay po ba?', '', 'Do you have another color?', 'sentence', '', '', [
      { target: 'May', native: 'Is there / Have' },
      { target: 'ibang kulay', native: 'another color' },
      { target: 'po ba', native: '(polite question)' },
    ]),
    createContentItem('Puwede ko bang subukan?', '', 'Can I try it on?', 'sentence', '', '', [
      { target: 'Puwede ko bang', native: 'Can I' },
      { target: 'subukan', native: 'try' },
    ]),
    createContentItem('Saan po ang fitting room?', '', 'Where is the fitting room?', 'sentence', '', '', [
      { target: 'Saan po', native: 'Where (polite)' },
      { target: 'ang fitting room', native: 'the fitting room' },
    ]),
    createContentItem('Tatanggap po ba kayo ng credit card?', '', 'Do you accept credit cards?', 'sentence', '', '', [
      { target: 'Tatanggap', native: 'Accept (future)' },
      { target: 'po ba kayo', native: '(polite question) you (formal)' },
      { target: 'ng credit card', native: 'credit card' },
    ]),
    createContentItem('Tumingin lang po ako.', '', 'I am just looking.', 'sentence', '', '', [
      { target: 'Tumingin', native: 'Looking' },
      { target: 'lang', native: 'just / only' },
      { target: 'po', native: '(polite particle)' },
      { target: 'ako', native: 'I' },
    ]),
    createContentItem('May mas mura po ba?', '', 'Is there a cheaper one?', 'sentence', '', '', [
      { target: 'May', native: 'Is there' },
      { target: 'mas mura', native: 'cheaper' },
      { target: 'po ba', native: '(polite question)' },
    ]),
    createContentItem('Last price na po ba ito?', '', 'Is this the final price?', 'sentence', '', '', [
      { target: 'Last price', native: 'Final price' },
      { target: 'na po ba', native: 'already (polite question)' },
      { target: 'ito', native: 'this' },
    ]),
  ],
};

// ============================================================
// BUSINESS & WORK
// ============================================================
const business = {
  title: 'Business & Work',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'fil',
  content: [
    createContentItem('Opisina', '', 'Office', 'word', 'Nasa opisina ako.', 'I am at the office.'),
    createContentItem('Trabaho', '', 'Work / Job', 'word', 'Maganda ang trabaho ko.', 'My job is good.'),
    createContentItem('Empleyado', '', 'Employee', 'word', 'Empleyado ako ng kumpanya.', 'I am an employee of the company.'),
    createContentItem('Boss', '', 'Boss', 'word', 'Mabait ang boss ko.', 'My boss is kind.'),
    createContentItem('Kumpanya', '', 'Company', 'word', 'Malaki ang kumpanya namin.', 'Our company is big.'),
    createContentItem('Pulong', '', 'Meeting', 'word', 'May pulong tayo mamaya.', 'We have a meeting later.'),
    createContentItem('Sweldo', '', 'Salary', 'word', 'Kailan ang sweldo?', 'When is payday?'),
    createContentItem('Bakasyon', '', 'Vacation / Leave', 'word', 'Mag-aapply ako ng bakasyon.', 'I will apply for a vacation.'),
    createContentItem('Proyekto', '', 'Project', 'word', 'Mahirap ang proyekto.', 'The project is difficult.'),
    createContentItem('Deadline', '', 'Deadline', 'word', 'Bukas ang deadline natin.', 'Our deadline is tomorrow.'),
    createContentItem('Kompyuter', '', 'Computer', 'word', 'Sira ang kompyuter ko.', 'My computer is broken.'),
    createContentItem('Dokumento', '', 'Document', 'word', 'Ipasa mo ang dokumento.', 'Submit the document.'),
    createContentItem('Telepono', '', 'Telephone', 'word', 'Tumutunog ang telepono.', 'The telephone is ringing.'),
    createContentItem('Tungkulin', '', 'Duty / Responsibility', 'word', 'Ano ang tungkulin mo?', 'What is your responsibility?'),
    createContentItem('Anong trabaho mo?', '', 'What is your job?', 'sentence', '', '', [
      { target: 'Anong', native: 'What' },
      { target: 'trabaho', native: 'job' },
      { target: 'mo', native: 'your' },
    ]),
    createContentItem('May pulong tayo ngayon.', '', 'We have a meeting today.', 'sentence', '', '', [
      { target: 'May', native: 'There is / Have' },
      { target: 'pulong', native: 'meeting' },
      { target: 'tayo', native: 'we (inclusive)' },
      { target: 'ngayon', native: 'today' },
    ]),
    createContentItem('Puwede ko po bang makausap ang manager?', '', 'May I speak with the manager?', 'sentence', '', '', [
      { target: 'Puwede ko po bang', native: 'May I (polite)' },
      { target: 'makausap', native: 'speak with' },
      { target: 'ang manager', native: 'the manager' },
    ]),
    createContentItem('Nag-a-apply po ako ng trabaho.', '', 'I am applying for a job.', 'sentence', '', '', [
      { target: 'Nag-a-apply', native: 'Applying' },
      { target: 'po', native: '(polite particle)' },
      { target: 'ako', native: 'I' },
      { target: 'ng trabaho', native: 'for a job' },
    ]),
    createContentItem('Tapos na po ang report ko.', '', 'My report is already done.', 'sentence', '', '', [
      { target: 'Tapos na', native: 'Already done' },
      { target: 'po', native: '(polite particle)' },
      { target: 'ang report ko', native: 'my report' },
    ]),
    createContentItem('Pirmahan mo ang kontrata.', '', 'Sign the contract.', 'sentence', '', '', [
      { target: 'Pirmahan', native: 'Sign' },
      { target: 'mo', native: 'you' },
      { target: 'ang kontrata', native: 'the contract' },
    ]),
    createContentItem('Mag-o-overtime ako ngayon.', '', 'I will work overtime today.', 'sentence', '', '', [
      { target: 'Mag-o-overtime', native: 'Will work overtime' },
      { target: 'ako', native: 'I' },
      { target: 'ngayon', native: 'today' },
    ]),
    createContentItem('Na-late ako sa trabaho.', '', 'I was late for work.', 'sentence', '', '', [
      { target: 'Na-late', native: 'Was late' },
      { target: 'ako', native: 'I' },
      { target: 'sa trabaho', native: 'for work' },
    ]),
    createContentItem('Kailan ang susunod na pulong?', '', 'When is the next meeting?', 'sentence', '', '', [
      { target: 'Kailan', native: 'When' },
      { target: 'ang susunod na', native: 'the next' },
      { target: 'pulong', native: 'meeting' },
    ]),
    createContentItem('I-email mo sa akin ang file.', '', 'Email me the file.', 'sentence', '', '', [
      { target: 'I-email mo', native: 'Email (you do it)' },
      { target: 'sa akin', native: 'to me' },
      { target: 'ang file', native: 'the file' },
    ]),
  ],
};

// ============================================================
// HEALTHCARE & MEDICAL
// ============================================================
const healthcare = {
  title: 'Healthcare & Medical',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'fil',
  content: [
    createContentItem('Doktor', '', 'Doctor', 'word', 'Pumunta ka sa doktor.', 'Go to the doctor.'),
    createContentItem('Nars', '', 'Nurse', 'word', 'Mabait ang nars.', 'The nurse is kind.'),
    createContentItem('Ospital', '', 'Hospital', 'word', 'Malapit ang ospital.', 'The hospital is nearby.'),
    createContentItem('Gamot', '', 'Medicine', 'word', 'Inumin mo ang gamot.', 'Take your medicine.'),
    createContentItem('Sakit', '', 'Illness / Pain', 'word', 'May sakit ako.', 'I am sick.'),
    createContentItem('Lagnat', '', 'Fever', 'word', 'May lagnat ang anak ko.', 'My child has a fever.'),
    createContentItem('Ubo', '', 'Cough', 'word', 'Masamang ubo ang meron ako.', 'I have a bad cough.'),
    createContentItem('Sipon', '', 'Cold / Runny nose', 'word', 'Sinisipon ako.', 'I have a cold.'),
    createContentItem('Sakit ng ulo', '', 'Headache', 'word', 'Masakit ang ulo ko.', 'I have a headache.'),
    createContentItem('Sakit ng tiyan', '', 'Stomachache', 'word', 'Masakit ang tiyan ko.', 'I have a stomachache.'),
    createContentItem('Sugat', '', 'Wound / Injury', 'word', 'May sugat ako sa kamay.', 'I have a wound on my hand.'),
    createContentItem('Reseta', '', 'Prescription', 'word', 'Kailangan ko ng reseta.', 'I need a prescription.'),
    createContentItem('Botika', '', 'Pharmacy', 'word', 'Pumunta ka sa botika.', 'Go to the pharmacy.'),
    createContentItem('Alerdyi', '', 'Allergy', 'word', 'May alerdyi ako sa hipon.', 'I am allergic to shrimp.'),
    createContentItem('Dugo', '', 'Blood', 'word', 'Kailangan ng blood test.', 'A blood test is needed.'),
    createContentItem('Hindi ako maganda ang pakiramdam.', '', 'I am not feeling well.', 'sentence', '', '', [
      { target: 'Hindi', native: 'Not' },
      { target: 'ako', native: 'I' },
      { target: 'maganda ang pakiramdam', native: 'feeling well' },
    ]),
    createContentItem('Masakit ang katawan ko.', '', 'My body aches.', 'sentence', '', '', [
      { target: 'Masakit', native: 'Painful / Aching' },
      { target: 'ang katawan', native: 'the body' },
      { target: 'ko', native: 'my' },
    ]),
    createContentItem('Kailangan ko ng doktor.', '', 'I need a doctor.', 'sentence', '', '', [
      { target: 'Kailangan', native: 'Need' },
      { target: 'ko', native: 'I' },
      { target: 'ng doktor', native: 'a doctor' },
    ]),
    createContentItem('May alerdyi ako sa gamot.', '', 'I am allergic to medicine.', 'sentence', '', '', [
      { target: 'May alerdyi', native: 'Have an allergy' },
      { target: 'ako', native: 'I' },
      { target: 'sa gamot', native: 'to medicine' },
    ]),
    createContentItem('Saan po ang pinakamalapit na ospital?', '', 'Where is the nearest hospital?', 'sentence', '', '', [
      { target: 'Saan po', native: 'Where (polite)' },
      { target: 'ang pinakamalapit na', native: 'the nearest' },
      { target: 'ospital', native: 'hospital' },
    ]),
    createContentItem('Ilang beses ko po iinumin ang gamot?', '', 'How many times should I take the medicine?', 'sentence', '', '', [
      { target: 'Ilang beses', native: 'How many times' },
      { target: 'ko po', native: 'I (polite)' },
      { target: 'iinumin', native: 'should take/drink' },
      { target: 'ang gamot', native: 'the medicine' },
    ]),
    createContentItem('May nararamdaman akong pananakit.', '', 'I am feeling some pain.', 'sentence', '', '', [
      { target: 'May nararamdaman', native: 'Feeling (something)' },
      { target: 'akong', native: 'I (with linker)' },
      { target: 'pananakit', native: 'pain' },
    ]),
    createContentItem('Kailan po ang susunod na check-up?', '', 'When is the next check-up?', 'sentence', '', '', [
      { target: 'Kailan po', native: 'When (polite)' },
      { target: 'ang susunod na', native: 'the next' },
      { target: 'check-up', native: 'check-up' },
    ]),
    createContentItem('Kailangan ko bang ma-confine?', '', 'Do I need to be admitted?', 'sentence', '', '', [
      { target: 'Kailangan ko bang', native: 'Do I need to' },
      { target: 'ma-confine', native: 'be admitted / confined' },
    ]),
    createContentItem('Paki-tawag po ng ambulansya.', '', 'Please call an ambulance.', 'sentence', '', '', [
      { target: 'Paki-tawag', native: 'Please call' },
      { target: 'po', native: '(polite particle)' },
      { target: 'ng ambulansya', native: 'an ambulance' },
    ]),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
