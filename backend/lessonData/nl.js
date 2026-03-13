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
  targetLang: 'nl',
  content: [
    createContentItem('Hallo', '', 'Hello', 'word', 'Hallo, hoe gaat het?', 'Hello, how are you?'),
    createContentItem('Goedemorgen', '', 'Good morning', 'word', 'Goedemorgen, alles goed?', 'Good morning, all good?'),
    createContentItem('Goedemiddag', '', 'Good afternoon', 'word', 'Goedemiddag mevrouw.', 'Good afternoon, ma\'am.'),
    createContentItem('Goedenavond', '', 'Good evening', 'word', 'Goedenavond allemaal.', 'Good evening, everyone.'),
    createContentItem('Goedenacht', '', 'Good night', 'word', 'Goedenacht, slaap lekker.', 'Good night, sleep well.'),
    createContentItem('Tot ziens', '', 'Goodbye', 'word', 'Tot ziens, tot morgen!', 'Goodbye, see you tomorrow!'),
    createContentItem('Dag', '', 'Bye (informal)', 'word', 'Dag, tot later!', 'Bye, see you later!'),
    createContentItem('Doei', '', 'Bye-bye (casual)', 'word', 'Doei, het was leuk!', 'Bye-bye, it was fun!'),
    createContentItem('Hoe gaat het?', '', 'How are you?', 'sentence', 'Hallo! Hoe gaat het met je?', 'Hello! How are you doing?', [
      { target: 'Hoe', native: 'How', korean: 'Hoe', english: 'How' },
      { target: 'gaat', native: 'goes', korean: 'gaat', english: 'goes' },
      { target: 'het', native: 'it', korean: 'het', english: 'it' },
    ]),
    createContentItem('Goed, dank je', '', 'Good, thank you', 'sentence', 'Goed, dank je. En met jou?', 'Good, thank you. And with you?', [
      { target: 'Goed', native: 'Good', korean: 'Goed', english: 'Good' },
      { target: 'dank', native: 'thank', korean: 'dank', english: 'thank' },
      { target: 'je', native: 'you', korean: 'je', english: 'you' },
    ]),
    createContentItem('Alsjeblieft', '', 'Please (informal)', 'word', 'Kun je me helpen, alsjeblieft?', 'Can you help me, please?'),
    createContentItem('Alstublieft', '', 'Please (formal)', 'word', 'Wilt u plaatsnemen, alstublieft?', 'Would you please take a seat?'),
    createContentItem('Dank je wel', '', 'Thank you (informal)', 'sentence', 'Dank je wel voor je hulp.', 'Thank you for your help.', [
      { target: 'Dank', native: 'Thank', korean: 'Dank', english: 'Thank' },
      { target: 'je', native: 'you', korean: 'je', english: 'you' },
      { target: 'wel', native: 'indeed', korean: 'wel', english: 'indeed' },
    ]),
    createContentItem('Dank u wel', '', 'Thank you (formal)', 'sentence', 'Dank u wel voor uw tijd.', 'Thank you for your time.', [
      { target: 'Dank', native: 'Thank', korean: 'Dank', english: 'Thank' },
      { target: 'u', native: 'you (formal)', korean: 'u', english: 'you (formal)' },
      { target: 'wel', native: 'indeed', korean: 'wel', english: 'indeed' },
    ]),
    createContentItem('Graag gedaan', '', 'You\'re welcome', 'word', 'Graag gedaan, geen probleem.', 'You\'re welcome, no problem.'),
    createContentItem('Sorry', '', 'Sorry', 'word', 'Sorry, dat was mijn fout.', 'Sorry, that was my fault.'),
    createContentItem('Pardon', '', 'Excuse me', 'word', 'Pardon, mag ik erdoor?', 'Excuse me, may I pass through?'),
    createContentItem('Ja', '', 'Yes', 'word', 'Ja, dat klopt.', 'Yes, that\'s correct.'),
    createContentItem('Nee', '', 'No', 'word', 'Nee, dank je.', 'No, thank you.'),
    createContentItem('Ik heet...', '', 'My name is...', 'sentence', 'Hallo, ik heet Anna.', 'Hello, my name is Anna.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'heet', native: 'am called', korean: 'heet', english: 'am called' },
    ]),
    createContentItem('Hoe heet je?', '', 'What is your name?', 'sentence', 'Hallo, hoe heet je?', 'Hello, what is your name?', [
      { target: 'Hoe', native: 'How', korean: 'Hoe', english: 'How' },
      { target: 'heet', native: 'are called', korean: 'heet', english: 'are called' },
      { target: 'je', native: 'you', korean: 'je', english: 'you' },
    ]),
    createContentItem('Aangenaam', '', 'Nice to meet you', 'word', 'Aangenaam kennis te maken.', 'Nice to meet you.'),
    createContentItem('Ik spreek een beetje Nederlands', '', 'I speak a little Dutch', 'sentence', 'Ik spreek een beetje Nederlands.', 'I speak a little Dutch.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'spreek', native: 'speak', korean: 'spreek', english: 'speak' },
      { target: 'een beetje', native: 'a little', korean: 'een beetje', english: 'a little' },
      { target: 'Nederlands', native: 'Dutch', korean: 'Nederlands', english: 'Dutch' },
    ]),
    createContentItem('Spreekt u Engels?', '', 'Do you speak English?', 'sentence', 'Pardon, spreekt u Engels?', 'Excuse me, do you speak English?', [
      { target: 'Spreekt', native: 'Speak', korean: 'Spreekt', english: 'Speak' },
      { target: 'u', native: 'you (formal)', korean: 'u', english: 'you (formal)' },
      { target: 'Engels', native: 'English', korean: 'Engels', english: 'English' },
    ]),
    createContentItem('Ik begrijp het niet', '', 'I don\'t understand', 'sentence', 'Sorry, ik begrijp het niet.', 'Sorry, I don\'t understand.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'begrijp', native: 'understand', korean: 'begrijp', english: 'understand' },
      { target: 'het', native: 'it', korean: 'het', english: 'it' },
      { target: 'niet', native: 'not', korean: 'niet', english: 'not' },
    ]),
    createContentItem('Meneer', '', 'Sir / Mr.', 'word', 'Goedemorgen, meneer.', 'Good morning, sir.'),
    createContentItem('Mevrouw', '', 'Ma\'am / Mrs.', 'word', 'Goedemiddag, mevrouw.', 'Good afternoon, ma\'am.'),
  ],
};

// ============================================================
// DAILY LIFE
// ============================================================
const dailyLife = {
  title: 'Everyday Life & Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'nl',
  content: [
    createContentItem('Huis', '', 'House', 'word', 'Ik woon in een groot huis.', 'I live in a big house.'),
    createContentItem('Familie', '', 'Family', 'word', 'Mijn familie is heel belangrijk.', 'My family is very important.'),
    createContentItem('Werk', '', 'Work', 'word', 'Ik ga naar mijn werk.', 'I am going to my work.'),
    createContentItem('School', '', 'School', 'word', 'De kinderen gaan naar school.', 'The children go to school.'),
    createContentItem('Tijd', '', 'Time', 'word', 'Hoe laat is het?', 'What time is it?'),
    createContentItem('Vandaag', '', 'Today', 'word', 'Wat doen we vandaag?', 'What are we doing today?'),
    createContentItem('Morgen', '', 'Tomorrow', 'word', 'Morgen ga ik naar de dokter.', 'Tomorrow I am going to the doctor.'),
    createContentItem('Gisteren', '', 'Yesterday', 'word', 'Gisteren was het mooi weer.', 'Yesterday the weather was nice.'),
    createContentItem('Ik word wakker om zeven uur', '', 'I wake up at seven o\'clock', 'sentence', 'Ik word elke dag wakker om zeven uur.', 'I wake up every day at seven o\'clock.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'word wakker', native: 'wake up', korean: 'word wakker', english: 'wake up' },
      { target: 'om', native: 'at', korean: 'om', english: 'at' },
      { target: 'zeven uur', native: 'seven o\'clock', korean: 'zeven uur', english: 'seven o\'clock' },
    ]),
    createContentItem('Ontbijt', '', 'Breakfast', 'word', 'Het ontbijt is om acht uur.', 'Breakfast is at eight o\'clock.'),
    createContentItem('Lunch', '', 'Lunch', 'word', 'We eten lunch op kantoor.', 'We eat lunch at the office.'),
    createContentItem('Avondeten', '', 'Dinner', 'word', 'Het avondeten is klaar.', 'Dinner is ready.'),
    createContentItem('Slapen', '', 'To sleep', 'word', 'Ik ga om tien uur slapen.', 'I go to sleep at ten o\'clock.'),
    createContentItem('Douchen', '', 'To shower', 'word', 'Ik douche elke ochtend.', 'I shower every morning.'),
    createContentItem('Hoe laat is het?', '', 'What time is it?', 'sentence', 'Pardon, hoe laat is het?', 'Excuse me, what time is it?', [
      { target: 'Hoe', native: 'How', korean: 'Hoe', english: 'How' },
      { target: 'laat', native: 'late', korean: 'laat', english: 'late' },
      { target: 'is', native: 'is', korean: 'is', english: 'is' },
      { target: 'het', native: 'it', korean: 'het', english: 'it' },
    ]),
    createContentItem('Ik ga naar huis', '', 'I am going home', 'sentence', 'Het is laat, ik ga naar huis.', 'It\'s late, I am going home.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'ga', native: 'go', korean: 'ga', english: 'go' },
      { target: 'naar', native: 'to', korean: 'naar', english: 'to' },
      { target: 'huis', native: 'home', korean: 'huis', english: 'home' },
    ]),
    createContentItem('Weer', '', 'Weather', 'word', 'Het weer is vandaag goed.', 'The weather is good today.'),
    createContentItem('Warm', '', 'Warm / Hot', 'word', 'Het is vandaag erg warm.', 'It is very warm today.'),
    createContentItem('Koud', '', 'Cold', 'word', 'Het is buiten koud.', 'It is cold outside.'),
    createContentItem('Regen', '', 'Rain', 'word', 'Er komt regen vandaag.', 'There will be rain today.'),
    createContentItem('Fiets', '', 'Bicycle', 'word', 'Ik ga met de fiets naar werk.', 'I go to work by bicycle.'),
    createContentItem('Auto', '', 'Car', 'word', 'De auto staat in de garage.', 'The car is in the garage.'),
    createContentItem('Ik moet naar mijn werk', '', 'I have to go to work', 'sentence', 'Sorry, ik moet naar mijn werk.', 'Sorry, I have to go to work.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'moet', native: 'must/have to', korean: 'moet', english: 'must/have to' },
      { target: 'naar', native: 'to', korean: 'naar', english: 'to' },
      { target: 'mijn', native: 'my', korean: 'mijn', english: 'my' },
      { target: 'werk', native: 'work', korean: 'werk', english: 'work' },
    ]),
    createContentItem('Boodschappen doen', '', 'To do groceries', 'sentence', 'Ik ga boodschappen doen bij de supermarkt.', 'I am going to do groceries at the supermarket.', [
      { target: 'Boodschappen', native: 'Groceries', korean: 'Boodschappen', english: 'Groceries' },
      { target: 'doen', native: 'to do', korean: 'doen', english: 'to do' },
    ]),
    createContentItem('Telefoon', '', 'Phone', 'word', 'Mijn telefoon is leeg.', 'My phone is dead.'),
    createContentItem('Vriend', '', 'Friend', 'word', 'Hij is een goede vriend.', 'He is a good friend.'),
  ],
};

// ============================================================
// FOOD & DINING
// ============================================================
const food = {
  title: 'Food & Dining',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'nl',
  content: [
    createContentItem('Water', '', 'Water', 'word', 'Mag ik een glas water?', 'May I have a glass of water?'),
    createContentItem('Brood', '', 'Bread', 'word', 'Wij eten brood bij het ontbijt.', 'We eat bread at breakfast.'),
    createContentItem('Kaas', '', 'Cheese', 'word', 'Nederlandse kaas is beroemd.', 'Dutch cheese is famous.'),
    createContentItem('Melk', '', 'Milk', 'word', 'Ik drink een glas melk.', 'I drink a glass of milk.'),
    createContentItem('Koffie', '', 'Coffee', 'word', 'Wilt u een kopje koffie?', 'Would you like a cup of coffee?'),
    createContentItem('Thee', '', 'Tea', 'word', 'Ik neem een kopje thee.', 'I\'ll have a cup of tea.'),
    createContentItem('Bier', '', 'Beer', 'word', 'Een biertje, alstublieft.', 'A beer, please.'),
    createContentItem('Vlees', '', 'Meat', 'word', 'Ik eet geen vlees.', 'I don\'t eat meat.'),
    createContentItem('Vis', '', 'Fish', 'word', 'De vis is heel vers.', 'The fish is very fresh.'),
    createContentItem('Groenten', '', 'Vegetables', 'word', 'Ik eet graag groenten.', 'I like to eat vegetables.'),
    createContentItem('Fruit', '', 'Fruit', 'word', 'Er is veel vers fruit.', 'There is a lot of fresh fruit.'),
    createContentItem('Aardappelen', '', 'Potatoes', 'word', 'We eten aardappelen bij het avondeten.', 'We eat potatoes at dinner.'),
    createContentItem('Soep', '', 'Soup', 'word', 'Erwtensoep is typisch Nederlands.', 'Pea soup is typically Dutch.'),
    createContentItem('Ik heb honger', '', 'I am hungry', 'sentence', 'Ik heb honger, laten we eten.', 'I am hungry, let\'s eat.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'heb', native: 'have', korean: 'heb', english: 'have' },
      { target: 'honger', native: 'hunger', korean: 'honger', english: 'hunger' },
    ]),
    createContentItem('Ik heb dorst', '', 'I am thirsty', 'sentence', 'Ik heb dorst, mag ik water?', 'I am thirsty, may I have water?', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'heb', native: 'have', korean: 'heb', english: 'have' },
      { target: 'dorst', native: 'thirst', korean: 'dorst', english: 'thirst' },
    ]),
    createContentItem('De rekening, alstublieft', '', 'The bill, please', 'sentence', 'Mag ik de rekening, alstublieft?', 'May I have the bill, please?', [
      { target: 'De', native: 'The', korean: 'De', english: 'The' },
      { target: 'rekening', native: 'bill', korean: 'rekening', english: 'bill' },
      { target: 'alstublieft', native: 'please', korean: 'alstublieft', english: 'please' },
    ]),
    createContentItem('Lekker', '', 'Delicious / Tasty', 'word', 'Dit eten is heel lekker!', 'This food is very delicious!'),
    createContentItem('Restaurant', '', 'Restaurant', 'word', 'Laten we naar een restaurant gaan.', 'Let\'s go to a restaurant.'),
    createContentItem('Ober', '', 'Waiter', 'word', 'Ober, mag ik bestellen?', 'Waiter, may I order?'),
    createContentItem('Menu', '', 'Menu', 'word', 'Mag ik het menu zien?', 'May I see the menu?'),
    createContentItem('Ik wil graag bestellen', '', 'I would like to order', 'sentence', 'Ik wil graag bestellen, alstublieft.', 'I would like to order, please.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'wil', native: 'want', korean: 'wil', english: 'want' },
      { target: 'graag', native: 'gladly', korean: 'graag', english: 'gladly' },
      { target: 'bestellen', native: 'to order', korean: 'bestellen', english: 'to order' },
    ]),
    createContentItem('Pannenkoeken', '', 'Pancakes', 'word', 'Nederlandse pannenkoeken zijn dun.', 'Dutch pancakes are thin.'),
    createContentItem('Friet', '', 'French fries', 'word', 'Ik wil friet met mayonaise.', 'I want fries with mayonnaise.'),
    createContentItem('Suiker', '', 'Sugar', 'word', 'Wilt u suiker in uw koffie?', 'Do you want sugar in your coffee?'),
    createContentItem('Zout', '', 'Salt', 'word', 'Mag ik het zout, alstublieft?', 'May I have the salt, please?'),
    createContentItem('Het smaakt goed', '', 'It tastes good', 'sentence', 'Het smaakt heel goed!', 'It tastes very good!', [
      { target: 'Het', native: 'It', korean: 'Het', english: 'It' },
      { target: 'smaakt', native: 'tastes', korean: 'smaakt', english: 'tastes' },
      { target: 'goed', native: 'good', korean: 'goed', english: 'good' },
    ]),
  ],
};

// ============================================================
// TRAVEL & DIRECTIONS
// ============================================================
const travel = {
  title: 'Travel & Directions',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'nl',
  content: [
    createContentItem('Luchthaven', '', 'Airport', 'word', 'We gaan naar de luchthaven.', 'We are going to the airport.'),
    createContentItem('Trein', '', 'Train', 'word', 'De trein vertrekt om negen uur.', 'The train departs at nine o\'clock.'),
    createContentItem('Bus', '', 'Bus', 'word', 'De bus stopt hier.', 'The bus stops here.'),
    createContentItem('Tram', '', 'Tram', 'word', 'Neem de tram naar het centrum.', 'Take the tram to the center.'),
    createContentItem('Station', '', 'Station', 'word', 'Het station is dichtbij.', 'The station is nearby.'),
    createContentItem('Hotel', '', 'Hotel', 'word', 'Ik heb een hotel geboekt.', 'I have booked a hotel.'),
    createContentItem('Kaartje', '', 'Ticket', 'word', 'Ik wil een kaartje kopen.', 'I want to buy a ticket.'),
    createContentItem('Paspoort', '', 'Passport', 'word', 'Mag ik uw paspoort zien?', 'May I see your passport?'),
    createContentItem('Koffer', '', 'Suitcase', 'word', 'Mijn koffer is zwaar.', 'My suitcase is heavy.'),
    createContentItem('Waar is...?', '', 'Where is...?', 'sentence', 'Waar is het station?', 'Where is the station?', [
      { target: 'Waar', native: 'Where', korean: 'Waar', english: 'Where' },
      { target: 'is', native: 'is', korean: 'is', english: 'is' },
    ]),
    createContentItem('Rechts', '', 'Right', 'word', 'Ga naar rechts bij het stoplicht.', 'Go right at the traffic light.'),
    createContentItem('Links', '', 'Left', 'word', 'Sla links af na de brug.', 'Turn left after the bridge.'),
    createContentItem('Rechtdoor', '', 'Straight ahead', 'word', 'Loop rechtdoor tot het einde.', 'Walk straight ahead to the end.'),
    createContentItem('Dichtbij', '', 'Nearby', 'word', 'Is er een apotheek dichtbij?', 'Is there a pharmacy nearby?'),
    createContentItem('Ver', '', 'Far', 'word', 'Het vliegveld is ver weg.', 'The airport is far away.'),
    createContentItem('Hoe kom ik bij...?', '', 'How do I get to...?', 'sentence', 'Hoe kom ik bij het museum?', 'How do I get to the museum?', [
      { target: 'Hoe', native: 'How', korean: 'Hoe', english: 'How' },
      { target: 'kom', native: 'get/come', korean: 'kom', english: 'get/come' },
      { target: 'ik', native: 'I', korean: 'ik', english: 'I' },
      { target: 'bij', native: 'to/at', korean: 'bij', english: 'to/at' },
    ]),
    createContentItem('Ik ben verdwaald', '', 'I am lost', 'sentence', 'Kunt u me helpen? Ik ben verdwaald.', 'Can you help me? I am lost.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'ben', native: 'am', korean: 'ben', english: 'am' },
      { target: 'verdwaald', native: 'lost', korean: 'verdwaald', english: 'lost' },
    ]),
    createContentItem('Plattegrond', '', 'Map', 'word', 'Heeft u een plattegrond?', 'Do you have a map?'),
    createContentItem('Centrum', '', 'City center', 'word', 'Het centrum is heel mooi.', 'The city center is very beautiful.'),
    createContentItem('Brug', '', 'Bridge', 'word', 'Loop over de brug.', 'Walk over the bridge.'),
    createContentItem('Gracht', '', 'Canal', 'word', 'Amsterdam heeft veel grachten.', 'Amsterdam has many canals.'),
    createContentItem('Straat', '', 'Street', 'word', 'Welke straat is dit?', 'Which street is this?'),
    createContentItem('Ik wil een kaartje naar Amsterdam', '', 'I want a ticket to Amsterdam', 'sentence', 'Ik wil een kaartje naar Amsterdam, alstublieft.', 'I want a ticket to Amsterdam, please.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'wil', native: 'want', korean: 'wil', english: 'want' },
      { target: 'een', native: 'a', korean: 'een', english: 'a' },
      { target: 'kaartje', native: 'ticket', korean: 'kaartje', english: 'ticket' },
      { target: 'naar', native: 'to', korean: 'naar', english: 'to' },
    ]),
    createContentItem('Wanneer vertrekt de trein?', '', 'When does the train leave?', 'sentence', 'Wanneer vertrekt de trein naar Utrecht?', 'When does the train to Utrecht leave?', [
      { target: 'Wanneer', native: 'When', korean: 'Wanneer', english: 'When' },
      { target: 'vertrekt', native: 'departs', korean: 'vertrekt', english: 'departs' },
      { target: 'de', native: 'the', korean: 'de', english: 'the' },
      { target: 'trein', native: 'train', korean: 'trein', english: 'train' },
    ]),
    createContentItem('Perron', '', 'Platform', 'word', 'De trein vertrekt van perron drie.', 'The train departs from platform three.'),
  ],
};

// ============================================================
// SHOPPING
// ============================================================
const shopping = {
  title: 'Shopping & Money',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'nl',
  content: [
    createContentItem('Winkel', '', 'Shop / Store', 'word', 'De winkel is open.', 'The shop is open.'),
    createContentItem('Supermarkt', '', 'Supermarket', 'word', 'Ik ga naar de supermarkt.', 'I am going to the supermarket.'),
    createContentItem('Markt', '', 'Market', 'word', 'De markt is op zaterdag.', 'The market is on Saturday.'),
    createContentItem('Geld', '', 'Money', 'word', 'Ik heb niet genoeg geld.', 'I don\'t have enough money.'),
    createContentItem('Euro', '', 'Euro', 'word', 'Dat kost vijf euro.', 'That costs five euros.'),
    createContentItem('Prijs', '', 'Price', 'word', 'Wat is de prijs?', 'What is the price?'),
    createContentItem('Goedkoop', '', 'Cheap', 'word', 'Dit is heel goedkoop.', 'This is very cheap.'),
    createContentItem('Duur', '', 'Expensive', 'word', 'Die jas is te duur.', 'That jacket is too expensive.'),
    createContentItem('Korting', '', 'Discount', 'word', 'Is er korting op dit artikel?', 'Is there a discount on this item?'),
    createContentItem('Hoeveel kost dit?', '', 'How much does this cost?', 'sentence', 'Hoeveel kost dit T-shirt?', 'How much does this T-shirt cost?', [
      { target: 'Hoeveel', native: 'How much', korean: 'Hoeveel', english: 'How much' },
      { target: 'kost', native: 'costs', korean: 'kost', english: 'costs' },
      { target: 'dit', native: 'this', korean: 'dit', english: 'this' },
    ]),
    createContentItem('Kassa', '', 'Cash register / Checkout', 'word', 'U kunt betalen bij de kassa.', 'You can pay at the checkout.'),
    createContentItem('Tas', '', 'Bag', 'word', 'Wilt u een tas?', 'Would you like a bag?'),
    createContentItem('Pinnen', '', 'To pay by debit card', 'word', 'Kan ik hier pinnen?', 'Can I pay by card here?'),
    createContentItem('Contant', '', 'Cash', 'word', 'Betaalt u contant of met de pin?', 'Are you paying cash or by card?'),
    createContentItem('Bon', '', 'Receipt', 'word', 'Mag ik de bon, alstublieft?', 'May I have the receipt, please?'),
    createContentItem('Maat', '', 'Size', 'word', 'Welke maat heeft u?', 'What size do you have?'),
    createContentItem('Kleding', '', 'Clothing', 'word', 'Deze winkel verkoopt kleding.', 'This store sells clothing.'),
    createContentItem('Schoenen', '', 'Shoes', 'word', 'Ik zoek nieuwe schoenen.', 'I am looking for new shoes.'),
    createContentItem('Ik zoek...', '', 'I am looking for...', 'sentence', 'Ik zoek een cadeau voor mijn moeder.', 'I am looking for a gift for my mother.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'zoek', native: 'am looking for', korean: 'zoek', english: 'am looking for' },
    ]),
    createContentItem('Mag ik dit passen?', '', 'May I try this on?', 'sentence', 'Mag ik dit passen in de paskamer?', 'May I try this on in the fitting room?', [
      { target: 'Mag', native: 'May', korean: 'Mag', english: 'May' },
      { target: 'ik', native: 'I', korean: 'ik', english: 'I' },
      { target: 'dit', native: 'this', korean: 'dit', english: 'this' },
      { target: 'passen', native: 'try on', korean: 'passen', english: 'try on' },
    ]),
    createContentItem('Open', '', 'Open', 'word', 'De winkel is open tot zes uur.', 'The store is open until six o\'clock.'),
    createContentItem('Gesloten', '', 'Closed', 'word', 'Sorry, we zijn gesloten.', 'Sorry, we are closed.'),
    createContentItem('Uitverkoop', '', 'Sale', 'word', 'Er is uitverkoop bij de Bijenkorf.', 'There is a sale at the Bijenkorf.'),
    createContentItem('Cadeau', '', 'Gift / Present', 'word', 'Dit is een cadeau voor jou.', 'This is a gift for you.'),
    createContentItem('Ik neem dit', '', 'I\'ll take this', 'sentence', 'Ik neem dit, dank u wel.', 'I\'ll take this, thank you.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'neem', native: 'take', korean: 'neem', english: 'take' },
      { target: 'dit', native: 'this', korean: 'dit', english: 'this' },
    ]),
  ],
};

// ============================================================
// BUSINESS
// ============================================================
const business = {
  title: 'Business & Professional',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'nl',
  content: [
    createContentItem('Kantoor', '', 'Office', 'word', 'Ik werk op kantoor.', 'I work at the office.'),
    createContentItem('Vergadering', '', 'Meeting', 'word', 'De vergadering begint om tien uur.', 'The meeting starts at ten o\'clock.'),
    createContentItem('Baas', '', 'Boss', 'word', 'Mijn baas is aardig.', 'My boss is nice.'),
    createContentItem('Collega', '', 'Colleague', 'word', 'Dit is mijn collega Jan.', 'This is my colleague Jan.'),
    createContentItem('E-mail', '', 'Email', 'word', 'Ik stuur u een e-mail.', 'I will send you an email.'),
    createContentItem('Telefoon', '', 'Telephone', 'word', 'Ik bel u morgen per telefoon.', 'I will call you tomorrow by phone.'),
    createContentItem('Bedrijf', '', 'Company', 'word', 'Ons bedrijf is in Amsterdam.', 'Our company is in Amsterdam.'),
    createContentItem('Contract', '', 'Contract', 'word', 'Wilt u het contract tekenen?', 'Would you like to sign the contract?'),
    createContentItem('Afspraak', '', 'Appointment', 'word', 'Ik heb een afspraak om twee uur.', 'I have an appointment at two o\'clock.'),
    createContentItem('Ik heb een afspraak met...', '', 'I have an appointment with...', 'sentence', 'Ik heb een afspraak met meneer De Vries.', 'I have an appointment with Mr. De Vries.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'heb', native: 'have', korean: 'heb', english: 'have' },
      { target: 'een', native: 'an', korean: 'een', english: 'an' },
      { target: 'afspraak', native: 'appointment', korean: 'afspraak', english: 'appointment' },
      { target: 'met', native: 'with', korean: 'met', english: 'with' },
    ]),
    createContentItem('Salaris', '', 'Salary', 'word', 'Het salaris is goed.', 'The salary is good.'),
    createContentItem('Baan', '', 'Job', 'word', 'Ik zoek een nieuwe baan.', 'I am looking for a new job.'),
    createContentItem('Sollicitatie', '', 'Job application', 'word', 'Ik heb een sollicitatie vandaag.', 'I have a job application today.'),
    createContentItem('CV', '', 'Resume / CV', 'word', 'Kunt u uw CV opsturen?', 'Can you send your CV?'),
    createContentItem('Kunt u dat herhalen?', '', 'Can you repeat that?', 'sentence', 'Sorry, kunt u dat herhalen?', 'Sorry, can you repeat that?', [
      { target: 'Kunt', native: 'Can', korean: 'Kunt', english: 'Can' },
      { target: 'u', native: 'you (formal)', korean: 'u', english: 'you (formal)' },
      { target: 'dat', native: 'that', korean: 'dat', english: 'that' },
      { target: 'herhalen', native: 'repeat', korean: 'herhalen', english: 'repeat' },
    ]),
    createContentItem('Factuur', '', 'Invoice', 'word', 'Ik stuur de factuur vandaag.', 'I will send the invoice today.'),
    createContentItem('Klant', '', 'Client / Customer', 'word', 'De klant wacht in de lobby.', 'The client is waiting in the lobby.'),
    createContentItem('Project', '', 'Project', 'word', 'Het project is bijna klaar.', 'The project is almost finished.'),
    createContentItem('Deadline', '', 'Deadline', 'word', 'De deadline is volgende week.', 'The deadline is next week.'),
    createContentItem('Ik werk hier sinds...', '', 'I have been working here since...', 'sentence', 'Ik werk hier sinds januari.', 'I have been working here since January.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'werk', native: 'work', korean: 'werk', english: 'work' },
      { target: 'hier', native: 'here', korean: 'hier', english: 'here' },
      { target: 'sinds', native: 'since', korean: 'sinds', english: 'since' },
    ]),
    createContentItem('Pauze', '', 'Break', 'word', 'Laten we een pauze nemen.', 'Let\'s take a break.'),
    createContentItem('Presentatie', '', 'Presentation', 'word', 'De presentatie is om drie uur.', 'The presentation is at three o\'clock.'),
    createContentItem('Mag ik u iets vragen?', '', 'May I ask you something?', 'sentence', 'Pardon, mag ik u iets vragen?', 'Excuse me, may I ask you something?', [
      { target: 'Mag', native: 'May', korean: 'Mag', english: 'May' },
      { target: 'ik', native: 'I', korean: 'ik', english: 'I' },
      { target: 'u', native: 'you (formal)', korean: 'u', english: 'you (formal)' },
      { target: 'iets', native: 'something', korean: 'iets', english: 'something' },
      { target: 'vragen', native: 'to ask', korean: 'vragen', english: 'to ask' },
    ]),
    createContentItem('Overleg', '', 'Consultation / Discussion', 'word', 'We hebben morgen overleg.', 'We have a discussion tomorrow.'),
    createContentItem('Nota', '', 'Note / Bill', 'word', 'Ik maak een nota voor u.', 'I will make a note for you.'),
  ],
};

// ============================================================
// HEALTHCARE
// ============================================================
const healthcare = {
  title: 'Healthcare & Emergencies',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'nl',
  content: [
    createContentItem('Dokter', '', 'Doctor', 'word', 'Ik moet naar de dokter.', 'I need to go to the doctor.'),
    createContentItem('Ziekenhuis', '', 'Hospital', 'word', 'Het ziekenhuis is in het centrum.', 'The hospital is in the center.'),
    createContentItem('Apotheek', '', 'Pharmacy', 'word', 'Is er een apotheek in de buurt?', 'Is there a pharmacy nearby?'),
    createContentItem('Medicijn', '', 'Medicine', 'word', 'Ik neem dit medicijn elke dag.', 'I take this medicine every day.'),
    createContentItem('Pijn', '', 'Pain', 'word', 'Ik heb pijn in mijn hoofd.', 'I have pain in my head.'),
    createContentItem('Ziek', '', 'Sick / Ill', 'word', 'Ik voel me ziek.', 'I feel sick.'),
    createContentItem('Koorts', '', 'Fever', 'word', 'Ik heb koorts.', 'I have a fever.'),
    createContentItem('Verkoudheid', '', 'Cold (illness)', 'word', 'Ik heb een verkoudheid.', 'I have a cold.'),
    createContentItem('Hoesten', '', 'To cough / Cough', 'word', 'Ik moet de hele tijd hoesten.', 'I have to cough all the time.'),
    createContentItem('Hoofdpijn', '', 'Headache', 'word', 'Ik heb verschrikkelijke hoofdpijn.', 'I have a terrible headache.'),
    createContentItem('Buikpijn', '', 'Stomachache', 'word', 'Mijn kind heeft buikpijn.', 'My child has a stomachache.'),
    createContentItem('Allergie', '', 'Allergy', 'word', 'Ik heb een allergie voor noten.', 'I have an allergy to nuts.'),
    createContentItem('Ik voel me niet lekker', '', 'I don\'t feel well', 'sentence', 'Sorry, ik voel me niet lekker.', 'Sorry, I don\'t feel well.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'voel', native: 'feel', korean: 'voel', english: 'feel' },
      { target: 'me', native: 'myself', korean: 'me', english: 'myself' },
      { target: 'niet', native: 'not', korean: 'niet', english: 'not' },
      { target: 'lekker', native: 'well', korean: 'lekker', english: 'well' },
    ]),
    createContentItem('Ik heb een afspraak bij de dokter', '', 'I have an appointment with the doctor', 'sentence', 'Ik heb een afspraak bij de dokter om twee uur.', 'I have an appointment with the doctor at two o\'clock.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'heb', native: 'have', korean: 'heb', english: 'have' },
      { target: 'een afspraak', native: 'an appointment', korean: 'een afspraak', english: 'an appointment' },
      { target: 'bij', native: 'with/at', korean: 'bij', english: 'with/at' },
      { target: 'de dokter', native: 'the doctor', korean: 'de dokter', english: 'the doctor' },
    ]),
    createContentItem('Ambulance', '', 'Ambulance', 'word', 'Bel een ambulance!', 'Call an ambulance!'),
    createContentItem('Noodgeval', '', 'Emergency', 'word', 'Dit is een noodgeval.', 'This is an emergency.'),
    createContentItem('Help!', '', 'Help!', 'word', 'Help! Bel de politie!', 'Help! Call the police!'),
    createContentItem('Verzekering', '', 'Insurance', 'word', 'Heeft u een zorgverzekering?', 'Do you have health insurance?'),
    createContentItem('Recept', '', 'Prescription', 'word', 'De dokter schrijft een recept.', 'The doctor writes a prescription.'),
    createContentItem('Tandarts', '', 'Dentist', 'word', 'Ik ga morgen naar de tandarts.', 'I am going to the dentist tomorrow.'),
    createContentItem('Waar doet het pijn?', '', 'Where does it hurt?', 'sentence', 'Kunt u me vertellen waar het pijn doet?', 'Can you tell me where it hurts?', [
      { target: 'Waar', native: 'Where', korean: 'Waar', english: 'Where' },
      { target: 'doet', native: 'does', korean: 'doet', english: 'does' },
      { target: 'het', native: 'it', korean: 'het', english: 'it' },
      { target: 'pijn', native: 'pain/hurt', korean: 'pijn', english: 'pain/hurt' },
    ]),
    createContentItem('Bloeddruk', '', 'Blood pressure', 'word', 'De verpleegster meet mijn bloeddruk.', 'The nurse measures my blood pressure.'),
    createContentItem('Ik ben allergisch voor...', '', 'I am allergic to...', 'sentence', 'Ik ben allergisch voor penicilline.', 'I am allergic to penicillin.', [
      { target: 'Ik', native: 'I', korean: 'Ik', english: 'I' },
      { target: 'ben', native: 'am', korean: 'ben', english: 'am' },
      { target: 'allergisch', native: 'allergic', korean: 'allergisch', english: 'allergic' },
      { target: 'voor', native: 'to', korean: 'voor', english: 'to' },
    ]),
    createContentItem('Verpleegster', '', 'Nurse', 'word', 'De verpleegster is heel vriendelijk.', 'The nurse is very friendly.'),
    createContentItem('Bel 112', '', 'Call 112 (emergency number)', 'sentence', 'In een noodgeval, bel 112.', 'In an emergency, call 112.', [
      { target: 'Bel', native: 'Call', korean: 'Bel', english: 'Call' },
      { target: '112', native: '112 (emergency number)', korean: '112', english: '112 (emergency number)' },
    ]),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
