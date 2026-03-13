// French (fr) beginner lesson data for all 7 categories
// Each category contains 20-30 content items with accurate French vocabulary and phrases

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
// GREETINGS - Basic Greetings & Introductions
// ============================================================
const greetings = {
  title: 'Basic Greetings & Introductions',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'fr',
  content: [
    createContentItem('Bonjour', '', 'Hello / Good morning', 'word', 'Bonjour, comment allez-vous?', 'Hello, how are you?'),
    createContentItem('Bonsoir', '', 'Good evening', 'word', 'Bonsoir, madame.', 'Good evening, ma\'am.'),
    createContentItem('Salut', '', 'Hi / Bye (informal)', 'word', 'Salut, ça va?', 'Hi, how\'s it going?'),
    createContentItem('Au revoir', '', 'Goodbye', 'word', 'Au revoir et bonne journée!', 'Goodbye and have a good day!'),
    createContentItem('Bonne nuit', '', 'Good night', 'word', 'Bonne nuit, dors bien.', 'Good night, sleep well.'),
    createContentItem('Merci', '', 'Thank you', 'word', 'Merci beaucoup pour votre aide.', 'Thank you very much for your help.'),
    createContentItem('Merci beaucoup', '', 'Thank you very much', 'word', 'Merci beaucoup, c\'est très gentil.', 'Thank you very much, that\'s very kind.'),
    createContentItem('De rien', '', 'You\'re welcome', 'word', 'De rien, c\'est normal.', 'You\'re welcome, it\'s nothing.'),
    createContentItem('S\'il vous plaît', '', 'Please (formal)', 'word', 'Un café, s\'il vous plaît.', 'A coffee, please.'),
    createContentItem('S\'il te plaît', '', 'Please (informal)', 'word', 'Aide-moi, s\'il te plaît.', 'Help me, please.'),
    createContentItem('Excusez-moi', '', 'Excuse me (formal)', 'word', 'Excusez-moi, où est la gare?', 'Excuse me, where is the train station?'),
    createContentItem('Pardon', '', 'Sorry / Pardon', 'word', 'Pardon, je ne comprends pas.', 'Sorry, I don\'t understand.'),
    createContentItem('Oui', '', 'Yes', 'word', 'Oui, bien sûr.', 'Yes, of course.'),
    createContentItem('Non', '', 'No', 'word', 'Non, merci.', 'No, thank you.'),
    createContentItem('Comment allez-vous?', '', 'How are you? (formal)', 'sentence', 'Bonjour, comment allez-vous?', 'Hello, how are you?', [
      { target: 'Comment', native: 'How', korean: 'Comment', english: 'How' },
      { target: 'allez-vous', native: 'are you (formal)', korean: 'allez-vous', english: 'are you (formal)' },
    ]),
    createContentItem('Comment tu t\'appelles?', '', 'What is your name? (informal)', 'sentence', 'Salut, comment tu t\'appelles?', 'Hi, what is your name?', [
      { target: 'Comment', native: 'How / What', korean: 'Comment', english: 'How / What' },
      { target: 'tu t\'appelles', native: 'are you called', korean: 'tu t\'appelles', english: 'are you called' },
    ]),
    createContentItem('Je m\'appelle...', '', 'My name is...', 'sentence', 'Je m\'appelle Marie.', 'My name is Marie.', [
      { target: 'Je', native: 'I', korean: 'Je', english: 'I' },
      { target: 'm\'appelle', native: 'am called', korean: 'm\'appelle', english: 'am called' },
    ]),
    createContentItem('Enchanté', '', 'Nice to meet you', 'word', 'Enchanté de faire votre connaissance.', 'Nice to meet you.'),
    createContentItem('Je suis content de vous rencontrer.', '', 'I am happy to meet you.', 'sentence', 'Je suis content de vous rencontrer.', 'I am happy to meet you.', [
      { target: 'Je suis', native: 'I am', korean: 'Je suis', english: 'I am' },
      { target: 'content', native: 'happy', korean: 'content', english: 'happy' },
      { target: 'de vous rencontrer', native: 'to meet you', korean: 'de vous rencontrer', english: 'to meet you' },
    ]),
    createContentItem('Ça va?', '', 'How\'s it going?', 'sentence', 'Salut, ça va?', 'Hi, how\'s it going?', [
      { target: 'Ça', native: 'It / That', korean: 'Ça', english: 'It / That' },
      { target: 'va', native: 'goes', korean: 'va', english: 'goes' },
    ]),
    createContentItem('Ça va bien, merci.', '', 'I\'m fine, thank you.', 'sentence', 'Ça va bien, merci. Et vous?', 'I\'m fine, thank you. And you?', [
      { target: 'Ça va', native: 'It goes', korean: 'Ça va', english: 'It goes' },
      { target: 'bien', native: 'well', korean: 'bien', english: 'well' },
      { target: 'merci', native: 'thank you', korean: 'merci', english: 'thank you' },
    ]),
    createContentItem('À bientôt', '', 'See you soon', 'word', 'Au revoir, à bientôt!', 'Goodbye, see you soon!'),
    createContentItem('À demain', '', 'See you tomorrow', 'word', 'Bonne nuit, à demain!', 'Good night, see you tomorrow!'),
    createContentItem('Bienvenue', '', 'Welcome', 'word', 'Bienvenue en France!', 'Welcome to France!'),
    createContentItem('D\'où venez-vous?', '', 'Where are you from? (formal)', 'sentence', 'D\'où venez-vous?', 'Where are you from?', [
      { target: 'D\'où', native: 'From where', korean: 'D\'où', english: 'From where' },
      { target: 'venez-vous', native: 'do you come (formal)', korean: 'venez-vous', english: 'do you come (formal)' },
    ]),
    createContentItem('Je viens de...', '', 'I come from...', 'sentence', 'Je viens des États-Unis.', 'I come from the United States.', [
      { target: 'Je', native: 'I', korean: 'Je', english: 'I' },
      { target: 'viens', native: 'come', korean: 'viens', english: 'come' },
      { target: 'de', native: 'from', korean: 'de', english: 'from' },
    ]),
  ],
};

// ============================================================
// DAILY LIFE - Everyday Expressions & Activities
// ============================================================
const dailyLife = {
  title: 'Everyday Expressions & Activities',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'fr',
  content: [
    createContentItem('Aujourd\'hui', '', 'Today', 'word', 'Aujourd\'hui, il fait beau.', 'Today, the weather is nice.'),
    createContentItem('Demain', '', 'Tomorrow', 'word', 'Demain, je vais au travail.', 'Tomorrow, I am going to work.'),
    createContentItem('Hier', '', 'Yesterday', 'word', 'Hier, j\'ai visité le musée.', 'Yesterday, I visited the museum.'),
    createContentItem('Le matin', '', 'The morning', 'word', 'Le matin, je bois du café.', 'In the morning, I drink coffee.'),
    createContentItem('L\'après-midi', '', 'The afternoon', 'word', 'L\'après-midi, je travaille.', 'In the afternoon, I work.'),
    createContentItem('Le soir', '', 'The evening', 'word', 'Le soir, je regarde la télévision.', 'In the evening, I watch television.'),
    createContentItem('La maison', '', 'The house', 'word', 'Je suis à la maison.', 'I am at home.'),
    createContentItem('La famille', '', 'The family', 'word', 'Ma famille est grande.', 'My family is big.'),
    createContentItem('Les enfants', '', 'The children', 'word', 'Les enfants jouent dans le jardin.', 'The children play in the garden.'),
    createContentItem('Le travail', '', 'Work / Job', 'word', 'Je vais au travail en métro.', 'I go to work by metro.'),
    createContentItem('L\'école', '', 'School', 'word', 'Les enfants vont à l\'école.', 'The children go to school.'),
    createContentItem('Quelle heure est-il?', '', 'What time is it?', 'sentence', 'Excusez-moi, quelle heure est-il?', 'Excuse me, what time is it?', [
      { target: 'Quelle', native: 'What', korean: 'Quelle', english: 'What' },
      { target: 'heure', native: 'hour / time', korean: 'heure', english: 'hour / time' },
      { target: 'est-il', native: 'is it', korean: 'est-il', english: 'is it' },
    ]),
    createContentItem('Il est huit heures.', '', 'It is eight o\'clock.', 'sentence', 'Il est huit heures du matin.', 'It is eight o\'clock in the morning.', [
      { target: 'Il est', native: 'It is', korean: 'Il est', english: 'It is' },
      { target: 'huit', native: 'eight', korean: 'huit', english: 'eight' },
      { target: 'heures', native: 'hours / o\'clock', korean: 'heures', english: 'hours / o\'clock' },
    ]),
    createContentItem('Je me lève à sept heures.', '', 'I wake up at seven o\'clock.', 'sentence', 'Je me lève à sept heures tous les jours.', 'I wake up at seven o\'clock every day.', [
      { target: 'Je me lève', native: 'I get up', korean: 'Je me lève', english: 'I get up' },
      { target: 'à', native: 'at', korean: 'à', english: 'at' },
      { target: 'sept heures', native: 'seven o\'clock', korean: 'sept heures', english: 'seven o\'clock' },
    ]),
    createContentItem('Je prends le petit-déjeuner.', '', 'I have breakfast.', 'sentence', 'Je prends le petit-déjeuner à huit heures.', 'I have breakfast at eight o\'clock.', [
      { target: 'Je prends', native: 'I have / take', korean: 'Je prends', english: 'I have / take' },
      { target: 'le petit-déjeuner', native: 'breakfast', korean: 'le petit-déjeuner', english: 'breakfast' },
    ]),
    createContentItem('L\'eau', '', 'Water', 'word', 'Je voudrais un verre d\'eau.', 'I would like a glass of water.'),
    createContentItem('Dormir', '', 'To sleep', 'word', 'Je vais dormir maintenant.', 'I am going to sleep now.'),
    createContentItem('Manger', '', 'To eat', 'word', 'On va manger à midi.', 'We are going to eat at noon.'),
    createContentItem('Parler', '', 'To speak', 'word', 'Je parle un peu français.', 'I speak a little French.'),
    createContentItem('Comprendre', '', 'To understand', 'word', 'Je ne comprends pas.', 'I don\'t understand.'),
    createContentItem('Je ne comprends pas.', '', 'I don\'t understand.', 'sentence', 'Désolé, je ne comprends pas.', 'Sorry, I don\'t understand.', [
      { target: 'Je', native: 'I', korean: 'Je', english: 'I' },
      { target: 'ne ... pas', native: 'not (negation)', korean: 'ne ... pas', english: 'not (negation)' },
      { target: 'comprends', native: 'understand', korean: 'comprends', english: 'understand' },
    ]),
    createContentItem('Parlez-vous anglais?', '', 'Do you speak English?', 'sentence', 'Excusez-moi, parlez-vous anglais?', 'Excuse me, do you speak English?', [
      { target: 'Parlez-vous', native: 'Do you speak (formal)', korean: 'Parlez-vous', english: 'Do you speak (formal)' },
      { target: 'anglais', native: 'English', korean: 'anglais', english: 'English' },
    ]),
    createContentItem('J\'ai besoin d\'aide.', '', 'I need help.', 'sentence', 'J\'ai besoin d\'aide, s\'il vous plaît.', 'I need help, please.', [
      { target: 'J\'ai besoin', native: 'I need', korean: 'J\'ai besoin', english: 'I need' },
      { target: 'd\'aide', native: 'of help', korean: 'd\'aide', english: 'of help' },
    ]),
    createContentItem('Le temps', '', 'The weather / Time', 'word', 'Quel temps fait-il aujourd\'hui?', 'What is the weather like today?'),
    createContentItem('Il fait chaud.', '', 'It is hot.', 'sentence', 'Il fait très chaud aujourd\'hui.', 'It is very hot today.', [
      { target: 'Il fait', native: 'It is (weather)', korean: 'Il fait', english: 'It is (weather)' },
      { target: 'chaud', native: 'hot', korean: 'chaud', english: 'hot' },
    ]),
  ],
};

// ============================================================
// FOOD - Food & Dining
// ============================================================
const food = {
  title: 'Food & Dining',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'fr',
  content: [
    createContentItem('Le restaurant', '', 'The restaurant', 'word', 'Allons au restaurant ce soir.', 'Let\'s go to the restaurant tonight.'),
    createContentItem('Le menu', '', 'The menu', 'word', 'Le menu, s\'il vous plaît.', 'The menu, please.'),
    createContentItem('L\'entrée', '', 'The starter / Appetizer', 'word', 'Comme entrée, je prends la soupe.', 'As a starter, I\'ll have the soup.'),
    createContentItem('Le plat principal', '', 'The main course', 'word', 'Le plat principal est délicieux.', 'The main course is delicious.'),
    createContentItem('Le dessert', '', 'The dessert', 'word', 'Voulez-vous un dessert?', 'Would you like a dessert?'),
    createContentItem('Le pain', '', 'Bread', 'word', 'Du pain, s\'il vous plaît.', 'Some bread, please.'),
    createContentItem('Le fromage', '', 'Cheese', 'word', 'La France a beaucoup de fromages.', 'France has a lot of cheeses.'),
    createContentItem('La viande', '', 'Meat', 'word', 'Je ne mange pas de viande.', 'I don\'t eat meat.'),
    createContentItem('Le poisson', '', 'Fish', 'word', 'Le poisson est très frais.', 'The fish is very fresh.'),
    createContentItem('Les légumes', '', 'Vegetables', 'word', 'J\'aime les légumes grillés.', 'I like grilled vegetables.'),
    createContentItem('Les fruits', '', 'Fruits', 'word', 'Les fruits sont sucrés.', 'The fruits are sweet.'),
    createContentItem('Le vin', '', 'Wine', 'word', 'Un verre de vin rouge, s\'il vous plaît.', 'A glass of red wine, please.'),
    createContentItem('Le café', '', 'Coffee', 'word', 'Je voudrais un café, s\'il vous plaît.', 'I would like a coffee, please.'),
    createContentItem('L\'addition', '', 'The bill / Check', 'word', 'L\'addition, s\'il vous plaît.', 'The bill, please.'),
    createContentItem('Je voudrais commander.', '', 'I would like to order.', 'sentence', 'Je voudrais commander, s\'il vous plaît.', 'I would like to order, please.', [
      { target: 'Je voudrais', native: 'I would like', korean: 'Je voudrais', english: 'I would like' },
      { target: 'commander', native: 'to order', korean: 'commander', english: 'to order' },
    ]),
    createContentItem('Qu\'est-ce que vous recommandez?', '', 'What do you recommend?', 'sentence', 'Qu\'est-ce que vous recommandez comme plat?', 'What do you recommend as a dish?', [
      { target: 'Qu\'est-ce que', native: 'What', korean: 'Qu\'est-ce que', english: 'What' },
      { target: 'vous recommandez', native: 'do you recommend', korean: 'vous recommandez', english: 'do you recommend' },
    ]),
    createContentItem('C\'est délicieux!', '', 'It\'s delicious!', 'sentence', 'Ce plat est vraiment délicieux!', 'This dish is really delicious!', [
      { target: 'C\'est', native: 'It is', korean: 'C\'est', english: 'It is' },
      { target: 'délicieux', native: 'delicious', korean: 'délicieux', english: 'delicious' },
    ]),
    createContentItem('J\'ai faim.', '', 'I am hungry.', 'sentence', 'J\'ai très faim, on va manger?', 'I am very hungry, shall we eat?', [
      { target: 'J\'ai', native: 'I have', korean: 'J\'ai', english: 'I have' },
      { target: 'faim', native: 'hunger', korean: 'faim', english: 'hunger' },
    ]),
    createContentItem('J\'ai soif.', '', 'I am thirsty.', 'sentence', 'J\'ai soif, je veux de l\'eau.', 'I am thirsty, I want some water.', [
      { target: 'J\'ai', native: 'I have', korean: 'J\'ai', english: 'I have' },
      { target: 'soif', native: 'thirst', korean: 'soif', english: 'thirst' },
    ]),
    createContentItem('Une table pour deux, s\'il vous plaît.', '', 'A table for two, please.', 'sentence', 'Bonsoir, une table pour deux, s\'il vous plaît.', 'Good evening, a table for two, please.', [
      { target: 'Une table', native: 'A table', korean: 'Une table', english: 'A table' },
      { target: 'pour deux', native: 'for two', korean: 'pour deux', english: 'for two' },
      { target: 's\'il vous plaît', native: 'please', korean: 's\'il vous plaît', english: 'please' },
    ]),
    createContentItem('Le petit-déjeuner', '', 'Breakfast', 'word', 'Le petit-déjeuner est inclus.', 'Breakfast is included.'),
    createContentItem('Le déjeuner', '', 'Lunch', 'word', 'On prend le déjeuner à midi.', 'We have lunch at noon.'),
    createContentItem('Le dîner', '', 'Dinner', 'word', 'Le dîner est à vingt heures.', 'Dinner is at eight o\'clock.'),
    createContentItem('Le beurre', '', 'Butter', 'word', 'Du pain avec du beurre.', 'Bread with butter.'),
    createContentItem('Le lait', '', 'Milk', 'word', 'Un café au lait, s\'il vous plaît.', 'A coffee with milk, please.'),
    createContentItem('Je suis allergique à...', '', 'I am allergic to...', 'sentence', 'Je suis allergique aux noix.', 'I am allergic to nuts.', [
      { target: 'Je suis', native: 'I am', korean: 'Je suis', english: 'I am' },
      { target: 'allergique', native: 'allergic', korean: 'allergique', english: 'allergic' },
      { target: 'à', native: 'to', korean: 'à', english: 'to' },
    ]),
  ],
};

// ============================================================
// TRAVEL - Travel & Transportation
// ============================================================
const travel = {
  title: 'Travel & Transportation',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'fr',
  content: [
    createContentItem('L\'aéroport', '', 'The airport', 'word', 'L\'aéroport est loin d\'ici.', 'The airport is far from here.'),
    createContentItem('La gare', '', 'The train station', 'word', 'La gare est au centre-ville.', 'The train station is in the city center.'),
    createContentItem('Le train', '', 'The train', 'word', 'Le train arrive à quelle heure?', 'What time does the train arrive?'),
    createContentItem('Le métro', '', 'The metro / Subway', 'word', 'Je prends le métro tous les jours.', 'I take the metro every day.'),
    createContentItem('Le bus', '', 'The bus', 'word', 'L\'arrêt de bus est là-bas.', 'The bus stop is over there.'),
    createContentItem('Le taxi', '', 'The taxi', 'word', 'Prenons un taxi.', 'Let\'s take a taxi.'),
    createContentItem('L\'hôtel', '', 'The hotel', 'word', 'J\'ai réservé une chambre d\'hôtel.', 'I booked a hotel room.'),
    createContentItem('Le billet', '', 'The ticket', 'word', 'Un billet aller-retour, s\'il vous plaît.', 'A round-trip ticket, please.'),
    createContentItem('Le passeport', '', 'The passport', 'word', 'N\'oubliez pas votre passeport.', 'Don\'t forget your passport.'),
    createContentItem('La valise', '', 'The suitcase', 'word', 'Ma valise est trop lourde.', 'My suitcase is too heavy.'),
    createContentItem('La carte', '', 'The map', 'word', 'Avez-vous une carte de la ville?', 'Do you have a map of the city?'),
    createContentItem('Le voyage', '', 'The trip / Journey', 'word', 'Bon voyage!', 'Have a good trip!'),
    createContentItem('Où est...?', '', 'Where is...?', 'sentence', 'Où est la station de métro?', 'Where is the metro station?', [
      { target: 'Où', native: 'Where', korean: 'Où', english: 'Where' },
      { target: 'est', native: 'is', korean: 'est', english: 'is' },
    ]),
    createContentItem('Comment aller à...?', '', 'How do I get to...?', 'sentence', 'Comment aller à la Tour Eiffel?', 'How do I get to the Eiffel Tower?', [
      { target: 'Comment', native: 'How', korean: 'Comment', english: 'How' },
      { target: 'aller', native: 'to go', korean: 'aller', english: 'to go' },
      { target: 'à', native: 'to', korean: 'à', english: 'to' },
    ]),
    createContentItem('C\'est loin d\'ici?', '', 'Is it far from here?', 'sentence', 'La gare, c\'est loin d\'ici?', 'The station, is it far from here?', [
      { target: 'C\'est', native: 'It is', korean: 'C\'est', english: 'It is' },
      { target: 'loin', native: 'far', korean: 'loin', english: 'far' },
      { target: 'd\'ici', native: 'from here', korean: 'd\'ici', english: 'from here' },
    ]),
    createContentItem('Tournez à gauche.', '', 'Turn left.', 'sentence', 'Tournez à gauche au feu rouge.', 'Turn left at the red light.', [
      { target: 'Tournez', native: 'Turn', korean: 'Tournez', english: 'Turn' },
      { target: 'à gauche', native: 'to the left', korean: 'à gauche', english: 'to the left' },
    ]),
    createContentItem('Tournez à droite.', '', 'Turn right.', 'sentence', 'Tournez à droite après le pont.', 'Turn right after the bridge.', [
      { target: 'Tournez', native: 'Turn', korean: 'Tournez', english: 'Turn' },
      { target: 'à droite', native: 'to the right', korean: 'à droite', english: 'to the right' },
    ]),
    createContentItem('Tout droit', '', 'Straight ahead', 'word', 'Allez tout droit pendant cinq minutes.', 'Go straight ahead for five minutes.'),
    createContentItem('Je voudrais réserver une chambre.', '', 'I would like to book a room.', 'sentence', 'Je voudrais réserver une chambre pour deux nuits.', 'I would like to book a room for two nights.', [
      { target: 'Je voudrais', native: 'I would like', korean: 'Je voudrais', english: 'I would like' },
      { target: 'réserver', native: 'to book / reserve', korean: 'réserver', english: 'to book / reserve' },
      { target: 'une chambre', native: 'a room', korean: 'une chambre', english: 'a room' },
    ]),
    createContentItem('À quelle heure part le train?', '', 'What time does the train leave?', 'sentence', 'À quelle heure part le prochain train?', 'What time does the next train leave?', [
      { target: 'À quelle heure', native: 'At what time', korean: 'À quelle heure', english: 'At what time' },
      { target: 'part', native: 'leaves', korean: 'part', english: 'leaves' },
      { target: 'le train', native: 'the train', korean: 'le train', english: 'the train' },
    ]),
    createContentItem('La sortie', '', 'The exit', 'word', 'Où est la sortie?', 'Where is the exit?'),
    createContentItem('L\'entrée', '', 'The entrance', 'word', 'L\'entrée est par ici.', 'The entrance is this way.'),
    createContentItem('Le plan', '', 'The map / Plan', 'word', 'Avez-vous un plan du métro?', 'Do you have a metro map?'),
    createContentItem('Je suis perdu.', '', 'I am lost.', 'sentence', 'Excusez-moi, je suis perdu.', 'Excuse me, I am lost.', [
      { target: 'Je suis', native: 'I am', korean: 'Je suis', english: 'I am' },
      { target: 'perdu', native: 'lost', korean: 'perdu', english: 'lost' },
    ]),
    createContentItem('La plage', '', 'The beach', 'word', 'La plage est magnifique.', 'The beach is magnificent.'),
  ],
};

// ============================================================
// SHOPPING - Shopping & Money
// ============================================================
const shopping = {
  title: 'Shopping & Money',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'fr',
  content: [
    createContentItem('Le magasin', '', 'The shop / Store', 'word', 'Le magasin ouvre à neuf heures.', 'The shop opens at nine o\'clock.'),
    createContentItem('Le marché', '', 'The market', 'word', 'Le marché est ouvert le dimanche.', 'The market is open on Sunday.'),
    createContentItem('Le prix', '', 'The price', 'word', 'Quel est le prix?', 'What is the price?'),
    createContentItem('L\'argent', '', 'Money', 'word', 'Je n\'ai pas assez d\'argent.', 'I don\'t have enough money.'),
    createContentItem('La carte bancaire', '', 'Bank card / Credit card', 'word', 'Vous acceptez la carte bancaire?', 'Do you accept credit cards?'),
    createContentItem('Cher', '', 'Expensive', 'word', 'C\'est trop cher.', 'It\'s too expensive.'),
    createContentItem('Bon marché', '', 'Cheap / Inexpensive', 'word', 'Ce magasin est bon marché.', 'This store is inexpensive.'),
    createContentItem('La taille', '', 'The size', 'word', 'Quelle taille faites-vous?', 'What size are you?'),
    createContentItem('Combien ça coûte?', '', 'How much does it cost?', 'sentence', 'Combien ça coûte, cette robe?', 'How much does this dress cost?', [
      { target: 'Combien', native: 'How much', korean: 'Combien', english: 'How much' },
      { target: 'ça coûte', native: 'does it cost', korean: 'ça coûte', english: 'does it cost' },
    ]),
    createContentItem('Je cherche...', '', 'I am looking for...', 'sentence', 'Je cherche une robe noire.', 'I am looking for a black dress.', [
      { target: 'Je', native: 'I', korean: 'Je', english: 'I' },
      { target: 'cherche', native: 'am looking for', korean: 'cherche', english: 'am looking for' },
    ]),
    createContentItem('Est-ce que je peux essayer?', '', 'Can I try it on?', 'sentence', 'Est-ce que je peux essayer cette veste?', 'Can I try on this jacket?', [
      { target: 'Est-ce que', native: 'Is it that (question marker)', korean: 'Est-ce que', english: 'Is it that (question marker)' },
      { target: 'je peux', native: 'I can', korean: 'je peux', english: 'I can' },
      { target: 'essayer', native: 'try on', korean: 'essayer', english: 'try on' },
    ]),
    createContentItem('La cabine d\'essayage', '', 'The fitting room', 'word', 'Où est la cabine d\'essayage?', 'Where is the fitting room?'),
    createContentItem('Avez-vous une taille plus grande?', '', 'Do you have a bigger size?', 'sentence', 'Avez-vous une taille plus grande?', 'Do you have a bigger size?', [
      { target: 'Avez-vous', native: 'Do you have', korean: 'Avez-vous', english: 'Do you have' },
      { target: 'une taille', native: 'a size', korean: 'une taille', english: 'a size' },
      { target: 'plus grande', native: 'bigger', korean: 'plus grande', english: 'bigger' },
    ]),
    createContentItem('La caisse', '', 'The cash register / Checkout', 'word', 'La caisse est au fond du magasin.', 'The checkout is at the back of the store.'),
    createContentItem('Un sac', '', 'A bag', 'word', 'Voulez-vous un sac?', 'Would you like a bag?'),
    createContentItem('Les soldes', '', 'Sales / Discounts', 'word', 'Les soldes commencent en janvier.', 'The sales start in January.'),
    createContentItem('Une réduction', '', 'A discount', 'word', 'Il y a une réduction de vingt pour cent.', 'There is a twenty percent discount.'),
    createContentItem('Je vais prendre celui-ci.', '', 'I\'ll take this one.', 'sentence', 'Oui, je vais prendre celui-ci.', 'Yes, I\'ll take this one.', [
      { target: 'Je vais prendre', native: 'I will take', korean: 'Je vais prendre', english: 'I will take' },
      { target: 'celui-ci', native: 'this one', korean: 'celui-ci', english: 'this one' },
    ]),
    createContentItem('C\'est gratuit.', '', 'It\'s free.', 'sentence', 'La livraison est gratuite.', 'Delivery is free.', [
      { target: 'C\'est', native: 'It is', korean: 'C\'est', english: 'It is' },
      { target: 'gratuit', native: 'free (no cost)', korean: 'gratuit', english: 'free (no cost)' },
    ]),
    createContentItem('La boulangerie', '', 'The bakery', 'word', 'J\'achète du pain à la boulangerie.', 'I buy bread at the bakery.'),
    createContentItem('La pharmacie', '', 'The pharmacy', 'word', 'La pharmacie est ouverte le dimanche.', 'The pharmacy is open on Sunday.'),
    createContentItem('Ouvert', '', 'Open', 'word', 'Le magasin est ouvert.', 'The shop is open.'),
    createContentItem('Fermé', '', 'Closed', 'word', 'Le magasin est fermé le lundi.', 'The shop is closed on Monday.'),
    createContentItem('Je voudrais acheter...', '', 'I would like to buy...', 'sentence', 'Je voudrais acheter un cadeau.', 'I would like to buy a gift.', [
      { target: 'Je voudrais', native: 'I would like', korean: 'Je voudrais', english: 'I would like' },
      { target: 'acheter', native: 'to buy', korean: 'acheter', english: 'to buy' },
    ]),
    createContentItem('Le reçu', '', 'The receipt', 'word', 'Puis-je avoir le reçu?', 'May I have the receipt?'),
  ],
};

// ============================================================
// BUSINESS - Business & Work
// ============================================================
const business = {
  title: 'Business & Work',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'fr',
  content: [
    createContentItem('Le bureau', '', 'The office', 'word', 'Je travaille au bureau.', 'I work at the office.'),
    createContentItem('La réunion', '', 'The meeting', 'word', 'La réunion est à quatorze heures.', 'The meeting is at two o\'clock.'),
    createContentItem('Le collègue', '', 'The colleague', 'word', 'Mon collègue est très sympathique.', 'My colleague is very nice.'),
    createContentItem('Le directeur', '', 'The director / Manager', 'word', 'Le directeur est en réunion.', 'The manager is in a meeting.'),
    createContentItem('L\'entreprise', '', 'The company', 'word', 'L\'entreprise a cent employés.', 'The company has one hundred employees.'),
    createContentItem('Le contrat', '', 'The contract', 'word', 'J\'ai signé le contrat.', 'I signed the contract.'),
    createContentItem('Le projet', '', 'The project', 'word', 'Le projet avance bien.', 'The project is progressing well.'),
    createContentItem('L\'email', '', 'The email', 'word', 'Je vous envoie un email.', 'I will send you an email.'),
    createContentItem('Le téléphone', '', 'The telephone', 'word', 'Je suis au téléphone.', 'I am on the phone.'),
    createContentItem('Le rendez-vous', '', 'The appointment', 'word', 'J\'ai un rendez-vous à dix heures.', 'I have an appointment at ten o\'clock.'),
    createContentItem('Je travaille chez...', '', 'I work at...', 'sentence', 'Je travaille chez une grande entreprise.', 'I work at a large company.', [
      { target: 'Je travaille', native: 'I work', korean: 'Je travaille', english: 'I work' },
      { target: 'chez', native: 'at / for', korean: 'chez', english: 'at / for' },
    ]),
    createContentItem('Quelle est votre profession?', '', 'What is your profession?', 'sentence', 'Quelle est votre profession?', 'What is your profession?', [
      { target: 'Quelle', native: 'What', korean: 'Quelle', english: 'What' },
      { target: 'est', native: 'is', korean: 'est', english: 'is' },
      { target: 'votre profession', native: 'your profession', korean: 'votre profession', english: 'your profession' },
    ]),
    createContentItem('Je suis ingénieur.', '', 'I am an engineer.', 'sentence', 'Je suis ingénieur en informatique.', 'I am a computer engineer.', [
      { target: 'Je suis', native: 'I am', korean: 'Je suis', english: 'I am' },
      { target: 'ingénieur', native: 'engineer', korean: 'ingénieur', english: 'engineer' },
    ]),
    createContentItem('Pouvez-vous répéter, s\'il vous plaît?', '', 'Can you repeat, please?', 'sentence', 'Pouvez-vous répéter, s\'il vous plaît?', 'Can you repeat, please?', [
      { target: 'Pouvez-vous', native: 'Can you (formal)', korean: 'Pouvez-vous', english: 'Can you (formal)' },
      { target: 'répéter', native: 'repeat', korean: 'répéter', english: 'repeat' },
      { target: 's\'il vous plaît', native: 'please', korean: 's\'il vous plaît', english: 'please' },
    ]),
    createContentItem('La facture', '', 'The invoice', 'word', 'Je vous envoie la facture demain.', 'I will send you the invoice tomorrow.'),
    createContentItem('Le salaire', '', 'The salary', 'word', 'Le salaire est versé chaque mois.', 'The salary is paid every month.'),
    createContentItem('Le stage', '', 'The internship', 'word', 'Je fais un stage de trois mois.', 'I am doing a three-month internship.'),
    createContentItem('L\'emploi', '', 'The job / Employment', 'word', 'Je cherche un emploi.', 'I am looking for a job.'),
    createContentItem('Le CV', '', 'The resume / CV', 'word', 'J\'ai envoyé mon CV.', 'I sent my resume.'),
    createContentItem('J\'ai une question.', '', 'I have a question.', 'sentence', 'Excusez-moi, j\'ai une question.', 'Excuse me, I have a question.', [
      { target: 'J\'ai', native: 'I have', korean: 'J\'ai', english: 'I have' },
      { target: 'une question', native: 'a question', korean: 'une question', english: 'a question' },
    ]),
    createContentItem('Le délai', '', 'The deadline', 'word', 'Le délai est vendredi prochain.', 'The deadline is next Friday.'),
    createContentItem('L\'entretien', '', 'The interview', 'word', 'J\'ai un entretien d\'embauche demain.', 'I have a job interview tomorrow.'),
    createContentItem('Nous sommes d\'accord.', '', 'We agree.', 'sentence', 'Très bien, nous sommes d\'accord.', 'Very well, we agree.', [
      { target: 'Nous sommes', native: 'We are', korean: 'Nous sommes', english: 'We are' },
      { target: 'd\'accord', native: 'in agreement', korean: 'd\'accord', english: 'in agreement' },
    ]),
    createContentItem('L\'ordinateur', '', 'The computer', 'word', 'J\'utilise l\'ordinateur pour travailler.', 'I use the computer to work.'),
    createContentItem('Envoyer', '', 'To send', 'word', 'Je vais envoyer le rapport.', 'I will send the report.'),
  ],
};

// ============================================================
// HEALTHCARE - Health & Medical
// ============================================================
const healthcare = {
  title: 'Health & Medical',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'fr',
  content: [
    createContentItem('Le médecin', '', 'The doctor', 'word', 'Je dois voir le médecin.', 'I need to see the doctor.'),
    createContentItem('L\'hôpital', '', 'The hospital', 'word', 'L\'hôpital est près d\'ici.', 'The hospital is near here.'),
    createContentItem('La pharmacie', '', 'The pharmacy', 'word', 'Je vais à la pharmacie.', 'I am going to the pharmacy.'),
    createContentItem('Le médicament', '', 'The medicine / Medication', 'word', 'Prenez ce médicament trois fois par jour.', 'Take this medicine three times a day.'),
    createContentItem('La douleur', '', 'Pain', 'word', 'J\'ai une douleur au dos.', 'I have a pain in my back.'),
    createContentItem('La fièvre', '', 'Fever', 'word', 'J\'ai de la fièvre.', 'I have a fever.'),
    createContentItem('Le rhume', '', 'A cold', 'word', 'J\'ai attrapé un rhume.', 'I caught a cold.'),
    createContentItem('La toux', '', 'Cough', 'word', 'J\'ai une toux depuis trois jours.', 'I have had a cough for three days.'),
    createContentItem('L\'ordonnance', '', 'The prescription', 'word', 'Vous avez une ordonnance?', 'Do you have a prescription?'),
    createContentItem('L\'assurance maladie', '', 'Health insurance', 'word', 'Avez-vous une assurance maladie?', 'Do you have health insurance?'),
    createContentItem('J\'ai mal à la tête.', '', 'I have a headache.', 'sentence', 'J\'ai mal à la tête depuis ce matin.', 'I have had a headache since this morning.', [
      { target: 'J\'ai mal', native: 'I have pain', korean: 'J\'ai mal', english: 'I have pain' },
      { target: 'à la tête', native: 'in the head', korean: 'à la tête', english: 'in the head' },
    ]),
    createContentItem('J\'ai mal au ventre.', '', 'I have a stomachache.', 'sentence', 'J\'ai mal au ventre depuis hier.', 'I have had a stomachache since yesterday.', [
      { target: 'J\'ai mal', native: 'I have pain', korean: 'J\'ai mal', english: 'I have pain' },
      { target: 'au ventre', native: 'in the stomach', korean: 'au ventre', english: 'in the stomach' },
    ]),
    createContentItem('Je ne me sens pas bien.', '', 'I don\'t feel well.', 'sentence', 'Je ne me sens pas bien aujourd\'hui.', 'I don\'t feel well today.', [
      { target: 'Je', native: 'I', korean: 'Je', english: 'I' },
      { target: 'ne ... pas', native: 'not (negation)', korean: 'ne ... pas', english: 'not (negation)' },
      { target: 'me sens', native: 'feel', korean: 'me sens', english: 'feel' },
      { target: 'bien', native: 'well', korean: 'bien', english: 'well' },
    ]),
    createContentItem('Appelez une ambulance!', '', 'Call an ambulance!', 'sentence', 'Vite, appelez une ambulance!', 'Quick, call an ambulance!', [
      { target: 'Appelez', native: 'Call', korean: 'Appelez', english: 'Call' },
      { target: 'une ambulance', native: 'an ambulance', korean: 'une ambulance', english: 'an ambulance' },
    ]),
    createContentItem('Les urgences', '', 'The emergency room', 'word', 'Où sont les urgences?', 'Where is the emergency room?'),
    createContentItem('Le dentiste', '', 'The dentist', 'word', 'J\'ai rendez-vous chez le dentiste.', 'I have an appointment with the dentist.'),
    createContentItem('La piqûre', '', 'The injection / Shot', 'word', 'J\'ai peur des piqûres.', 'I am afraid of injections.'),
    createContentItem('Le sang', '', 'Blood', 'word', 'Je dois faire une prise de sang.', 'I need to get a blood test.'),
    createContentItem('J\'ai besoin d\'un rendez-vous.', '', 'I need an appointment.', 'sentence', 'J\'ai besoin d\'un rendez-vous chez le médecin.', 'I need an appointment with the doctor.', [
      { target: 'J\'ai besoin', native: 'I need', korean: 'J\'ai besoin', english: 'I need' },
      { target: 'd\'un rendez-vous', native: 'of an appointment', korean: 'd\'un rendez-vous', english: 'of an appointment' },
    ]),
    createContentItem('Êtes-vous enceinte?', '', 'Are you pregnant?', 'sentence', 'Êtes-vous enceinte?', 'Are you pregnant?', [
      { target: 'Êtes-vous', native: 'Are you (formal)', korean: 'Êtes-vous', english: 'Are you (formal)' },
      { target: 'enceinte', native: 'pregnant', korean: 'enceinte', english: 'pregnant' },
    ]),
    createContentItem('L\'allergie', '', 'Allergy', 'word', 'J\'ai une allergie au pollen.', 'I have a pollen allergy.'),
    createContentItem('Le comprimé', '', 'The tablet / Pill', 'word', 'Prenez deux comprimés par jour.', 'Take two tablets per day.'),
    createContentItem('Le sirop', '', 'The syrup', 'word', 'Prenez une cuillère de sirop le soir.', 'Take a spoonful of syrup in the evening.'),
    createContentItem('Je suis diabétique.', '', 'I am diabetic.', 'sentence', 'Je suis diabétique, je ne peux pas manger de sucre.', 'I am diabetic, I cannot eat sugar.', [
      { target: 'Je suis', native: 'I am', korean: 'Je suis', english: 'I am' },
      { target: 'diabétique', native: 'diabetic', korean: 'diabétique', english: 'diabetic' },
    ]),
    createContentItem('C\'est urgent.', '', 'It\'s urgent.', 'sentence', 'C\'est urgent, aidez-moi!', 'It\'s urgent, help me!', [
      { target: 'C\'est', native: 'It is', korean: 'C\'est', english: 'It is' },
      { target: 'urgent', native: 'urgent', korean: 'urgent', english: 'urgent' },
    ]),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
