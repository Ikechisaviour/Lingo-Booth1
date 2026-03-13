// Italian (it) - Beginner Lessons for all 7 categories
// Real, accurate Italian vocabulary and phrases

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
  targetLang: 'it',
  content: [
    createContentItem('Ciao', '', 'Hello / Hi', 'word', 'Ciao, come stai?', 'Hello, how are you?'),
    createContentItem('Buongiorno', '', 'Good morning', 'word', 'Buongiorno, signora.', 'Good morning, ma\'am.'),
    createContentItem('Buonasera', '', 'Good evening', 'word', 'Buonasera a tutti.', 'Good evening, everyone.'),
    createContentItem('Buonanotte', '', 'Good night', 'word', 'Buonanotte, dormi bene.', 'Good night, sleep well.'),
    createContentItem('Arrivederci', '', 'Goodbye (formal)', 'word', 'Arrivederci, a presto!', 'Goodbye, see you soon!'),
    createContentItem('Salve', '', 'Hello (neutral/formal)', 'word', 'Salve, come va?', 'Hello, how is it going?'),
    createContentItem('Grazie', '', 'Thank you', 'word', 'Grazie mille per l\'aiuto.', 'Thank you so much for the help.'),
    createContentItem('Prego', '', 'You\'re welcome', 'word', 'Prego, non c\'è di che.', 'You\'re welcome, don\'t mention it.'),
    createContentItem('Per favore', '', 'Please', 'word', 'Un caffè, per favore.', 'A coffee, please.'),
    createContentItem('Scusa', '', 'Excuse me (informal)', 'word', 'Scusa, puoi ripetere?', 'Excuse me, can you repeat?'),
    createContentItem('Mi scusi', '', 'Excuse me (formal)', 'word', 'Mi scusi, dov\'è la stazione?', 'Excuse me, where is the station?'),
    createContentItem('Sì', '', 'Yes', 'word', 'Sì, certo!', 'Yes, of course!'),
    createContentItem('No', '', 'No', 'word', 'No, grazie.', 'No, thank you.'),
    createContentItem('Come ti chiami?', '', 'What is your name? (informal)', 'sentence', 'Ciao, come ti chiami?', 'Hi, what is your name?', [
      { target: 'Come', native: 'What/How', korean: 'Come', english: 'What/How' },
      { target: 'ti chiami?', native: 'is your name?', korean: 'ti chiami?', english: 'is your name?' },
    ]),
    createContentItem('Mi chiamo...', '', 'My name is...', 'sentence', 'Mi chiamo Marco.', 'My name is Marco.', [
      { target: 'Mi', native: 'Myself', korean: 'Mi', english: 'Myself' },
      { target: 'chiamo', native: 'I call', korean: 'chiamo', english: 'I call' },
    ]),
    createContentItem('Come stai?', '', 'How are you? (informal)', 'sentence', 'Ciao, come stai?', 'Hi, how are you?', [
      { target: 'Come', native: 'How', korean: 'Come', english: 'How' },
      { target: 'stai?', native: 'are you?', korean: 'stai?', english: 'are you?' },
    ]),
    createContentItem('Sto bene, grazie.', '', 'I\'m fine, thank you.', 'sentence', 'Sto bene, grazie. E tu?', 'I\'m fine, thank you. And you?', [
      { target: 'Sto bene', native: 'I\'m fine', korean: 'Sto bene', english: 'I\'m fine' },
      { target: 'grazie', native: 'thank you', korean: 'grazie', english: 'thank you' },
    ]),
    createContentItem('Piacere di conoscerti.', '', 'Nice to meet you.', 'sentence', 'Piacere di conoscerti, Maria.', 'Nice to meet you, Maria.', [
      { target: 'Piacere', native: 'Pleasure', korean: 'Piacere', english: 'Pleasure' },
      { target: 'di conoscerti', native: 'to meet you', korean: 'di conoscerti', english: 'to meet you' },
    ]),
    createContentItem('Di dove sei?', '', 'Where are you from?', 'sentence', 'Di dove sei? Sei italiano?', 'Where are you from? Are you Italian?', [
      { target: 'Di dove', native: 'From where', korean: 'Di dove', english: 'From where' },
      { target: 'sei?', native: 'are you?', korean: 'sei?', english: 'are you?' },
    ]),
    createContentItem('Sono di...', '', 'I\'m from...', 'sentence', 'Sono di Roma.', 'I\'m from Rome.', [
      { target: 'Sono', native: 'I am', korean: 'Sono', english: 'I am' },
      { target: 'di', native: 'from', korean: 'di', english: 'from' },
    ]),
    createContentItem('Parli inglese?', '', 'Do you speak English?', 'sentence', 'Scusa, parli inglese?', 'Excuse me, do you speak English?', [
      { target: 'Parli', native: 'Do you speak', korean: 'Parli', english: 'Do you speak' },
      { target: 'inglese?', native: 'English?', korean: 'inglese?', english: 'English?' },
    ]),
    createContentItem('Non capisco.', '', 'I don\'t understand.', 'sentence', 'Mi dispiace, non capisco.', 'I\'m sorry, I don\'t understand.', [
      { target: 'Non', native: 'Not', korean: 'Non', english: 'Not' },
      { target: 'capisco', native: 'I understand', korean: 'capisco', english: 'I understand' },
    ]),
    createContentItem('Come si dice...?', '', 'How do you say...?', 'sentence', 'Come si dice "water" in italiano?', 'How do you say "water" in Italian?', [
      { target: 'Come', native: 'How', korean: 'Come', english: 'How' },
      { target: 'si dice', native: 'does one say', korean: 'si dice', english: 'does one say' },
    ]),
    createContentItem('A presto!', '', 'See you soon!', 'word', 'Ciao, a presto!', 'Bye, see you soon!'),
    createContentItem('A domani!', '', 'See you tomorrow!', 'word', 'Buonanotte, a domani!', 'Good night, see you tomorrow!'),
  ],
};

// ============================================================
// DAILY LIFE
// ============================================================
const dailyLife = {
  title: 'Everyday Life & Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'it',
  content: [
    createContentItem('La casa', '', 'The house', 'word', 'La casa è grande.', 'The house is big.'),
    createContentItem('La famiglia', '', 'The family', 'word', 'La mia famiglia è piccola.', 'My family is small.'),
    createContentItem('Il lavoro', '', 'The work / job', 'word', 'Vado al lavoro ogni giorno.', 'I go to work every day.'),
    createContentItem('La scuola', '', 'The school', 'word', 'I bambini vanno a scuola.', 'The children go to school.'),
    createContentItem('L\'acqua', '', 'The water', 'word', 'Bevo molta acqua.', 'I drink a lot of water.'),
    createContentItem('Il tempo', '', 'The time / weather', 'word', 'Che tempo fa oggi?', 'What\'s the weather like today?'),
    createContentItem('Oggi', '', 'Today', 'word', 'Oggi è una bella giornata.', 'Today is a beautiful day.'),
    createContentItem('Domani', '', 'Tomorrow', 'word', 'Domani vado al mare.', 'Tomorrow I\'m going to the sea.'),
    createContentItem('Ieri', '', 'Yesterday', 'word', 'Ieri ho lavorato tutto il giorno.', 'Yesterday I worked all day.'),
    createContentItem('La mattina', '', 'The morning', 'word', 'La mattina bevo un caffè.', 'In the morning I drink a coffee.'),
    createContentItem('Mi sveglio alle sette.', '', 'I wake up at seven.', 'sentence', 'Mi sveglio alle sette ogni mattina.', 'I wake up at seven every morning.', [
      { target: 'Mi sveglio', native: 'I wake up', korean: 'Mi sveglio', english: 'I wake up' },
      { target: 'alle sette', native: 'at seven', korean: 'alle sette', english: 'at seven' },
    ]),
    createContentItem('Faccio colazione.', '', 'I eat breakfast.', 'sentence', 'Faccio colazione alle otto.', 'I eat breakfast at eight.', [
      { target: 'Faccio', native: 'I have/make', korean: 'Faccio', english: 'I have/make' },
      { target: 'colazione', native: 'breakfast', korean: 'colazione', english: 'breakfast' },
    ]),
    createContentItem('Vado al lavoro.', '', 'I go to work.', 'sentence', 'Vado al lavoro in autobus.', 'I go to work by bus.', [
      { target: 'Vado', native: 'I go', korean: 'Vado', english: 'I go' },
      { target: 'al lavoro', native: 'to work', korean: 'al lavoro', english: 'to work' },
    ]),
    createContentItem('Che ore sono?', '', 'What time is it?', 'sentence', 'Scusa, che ore sono?', 'Excuse me, what time is it?', [
      { target: 'Che', native: 'What', korean: 'Che', english: 'What' },
      { target: 'ore', native: 'hours/time', korean: 'ore', english: 'hours/time' },
      { target: 'sono?', native: 'is it?', korean: 'sono?', english: 'is it?' },
    ]),
    createContentItem('Ho bisogno di...', '', 'I need...', 'sentence', 'Ho bisogno di aiuto.', 'I need help.', [
      { target: 'Ho bisogno', native: 'I need', korean: 'Ho bisogno', english: 'I need' },
      { target: 'di', native: 'of', korean: 'di', english: 'of' },
    ]),
    createContentItem('Il telefono', '', 'The phone', 'word', 'Dov\'è il mio telefono?', 'Where is my phone?'),
    createContentItem('La macchina', '', 'The car', 'word', 'La macchina è parcheggiata fuori.', 'The car is parked outside.'),
    createContentItem('Il bagno', '', 'The bathroom', 'word', 'Dov\'è il bagno?', 'Where is the bathroom?'),
    createContentItem('La camera da letto', '', 'The bedroom', 'word', 'La camera da letto è al secondo piano.', 'The bedroom is on the second floor.'),
    createContentItem('Sono stanco.', '', 'I\'m tired.', 'sentence', 'Sono molto stanco oggi.', 'I\'m very tired today.', [
      { target: 'Sono', native: 'I am', korean: 'Sono', english: 'I am' },
      { target: 'stanco', native: 'tired', korean: 'stanco', english: 'tired' },
    ]),
    createContentItem('Devo andare.', '', 'I have to go.', 'sentence', 'Mi dispiace, devo andare.', 'I\'m sorry, I have to go.', [
      { target: 'Devo', native: 'I have to', korean: 'Devo', english: 'I have to' },
      { target: 'andare', native: 'go', korean: 'andare', english: 'go' },
    ]),
    createContentItem('Mi piace...', '', 'I like...', 'sentence', 'Mi piace leggere libri.', 'I like reading books.', [
      { target: 'Mi piace', native: 'I like', korean: 'Mi piace', english: 'I like' },
      { target: 'leggere', native: 'to read', korean: 'leggere', english: 'to read' },
      { target: 'libri', native: 'books', korean: 'libri', english: 'books' },
    ]),
    createContentItem('La chiave', '', 'The key', 'word', 'Hai la chiave di casa?', 'Do you have the house key?'),
    createContentItem('Lunedì', '', 'Monday', 'word', 'Lunedì torno al lavoro.', 'On Monday I go back to work.'),
    createContentItem('Il fine settimana', '', 'The weekend', 'word', 'Cosa fai nel fine settimana?', 'What are you doing on the weekend?'),
  ],
};

// ============================================================
// FOOD & DINING
// ============================================================
const food = {
  title: 'Food, Drinks & Dining',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'it',
  content: [
    createContentItem('Il ristorante', '', 'The restaurant', 'word', 'Andiamo al ristorante stasera.', 'Let\'s go to the restaurant tonight.'),
    createContentItem('Il menù', '', 'The menu', 'word', 'Posso avere il menù?', 'Can I have the menu?'),
    createContentItem('Il caffè', '', 'The coffee', 'word', 'Un caffè, per favore.', 'A coffee, please.'),
    createContentItem('L\'acqua', '', 'The water', 'word', 'Un bicchiere d\'acqua, per favore.', 'A glass of water, please.'),
    createContentItem('Il vino', '', 'The wine', 'word', 'Un bicchiere di vino rosso.', 'A glass of red wine.'),
    createContentItem('La pizza', '', 'The pizza', 'word', 'Vorrei una pizza margherita.', 'I would like a margherita pizza.'),
    createContentItem('La pasta', '', 'The pasta', 'word', 'La pasta è al dente.', 'The pasta is al dente.'),
    createContentItem('Il pane', '', 'The bread', 'word', 'Il pane è fresco.', 'The bread is fresh.'),
    createContentItem('Il formaggio', '', 'The cheese', 'word', 'Mi piace il formaggio italiano.', 'I like Italian cheese.'),
    createContentItem('La carne', '', 'The meat', 'word', 'Non mangio la carne.', 'I don\'t eat meat.'),
    createContentItem('Il pesce', '', 'The fish', 'word', 'Il pesce è freschissimo.', 'The fish is very fresh.'),
    createContentItem('La frutta', '', 'The fruit', 'word', 'La frutta è dolce.', 'The fruit is sweet.'),
    createContentItem('La verdura', '', 'The vegetables', 'word', 'Mangio molta verdura.', 'I eat a lot of vegetables.'),
    createContentItem('Il gelato', '', 'The ice cream', 'word', 'Vorrei un gelato al cioccolato.', 'I would like a chocolate ice cream.'),
    createContentItem('Vorrei ordinare.', '', 'I would like to order.', 'sentence', 'Buonasera, vorrei ordinare.', 'Good evening, I would like to order.', [
      { target: 'Vorrei', native: 'I would like', korean: 'Vorrei', english: 'I would like' },
      { target: 'ordinare', native: 'to order', korean: 'ordinare', english: 'to order' },
    ]),
    createContentItem('Il conto, per favore.', '', 'The check, please.', 'sentence', 'Scusi, il conto, per favore.', 'Excuse me, the check, please.', [
      { target: 'Il conto', native: 'The check/bill', korean: 'Il conto', english: 'The check/bill' },
      { target: 'per favore', native: 'please', korean: 'per favore', english: 'please' },
    ]),
    createContentItem('È buonissimo!', '', 'It\'s delicious!', 'sentence', 'Questo piatto è buonissimo!', 'This dish is delicious!', [
      { target: 'È', native: 'It is', korean: 'È', english: 'It is' },
      { target: 'buonissimo', native: 'very good/delicious', korean: 'buonissimo', english: 'very good/delicious' },
    ]),
    createContentItem('Ho fame.', '', 'I\'m hungry.', 'sentence', 'Ho molta fame.', 'I\'m very hungry.', [
      { target: 'Ho', native: 'I have', korean: 'Ho', english: 'I have' },
      { target: 'fame', native: 'hunger', korean: 'fame', english: 'hunger' },
    ]),
    createContentItem('Ho sete.', '', 'I\'m thirsty.', 'sentence', 'Ho sete, vorrei dell\'acqua.', 'I\'m thirsty, I\'d like some water.', [
      { target: 'Ho', native: 'I have', korean: 'Ho', english: 'I have' },
      { target: 'sete', native: 'thirst', korean: 'sete', english: 'thirst' },
    ]),
    createContentItem('Sono allergico a...', '', 'I\'m allergic to...', 'sentence', 'Sono allergico alle noci.', 'I\'m allergic to nuts.', [
      { target: 'Sono', native: 'I am', korean: 'Sono', english: 'I am' },
      { target: 'allergico', native: 'allergic', korean: 'allergico', english: 'allergic' },
      { target: 'a', native: 'to', korean: 'a', english: 'to' },
    ]),
    createContentItem('Un tavolo per due.', '', 'A table for two.', 'sentence', 'Buonasera, un tavolo per due, per favore.', 'Good evening, a table for two, please.', [
      { target: 'Un tavolo', native: 'A table', korean: 'Un tavolo', english: 'A table' },
      { target: 'per due', native: 'for two', korean: 'per due', english: 'for two' },
    ]),
    createContentItem('La colazione', '', 'Breakfast', 'word', 'La colazione è inclusa.', 'Breakfast is included.'),
    createContentItem('Il pranzo', '', 'Lunch', 'word', 'A che ora è il pranzo?', 'What time is lunch?'),
    createContentItem('La cena', '', 'Dinner', 'word', 'La cena è pronta.', 'Dinner is ready.'),
    createContentItem('Cosa mi consiglia?', '', 'What do you recommend?', 'sentence', 'Cosa mi consiglia come primo?', 'What do you recommend as a first course?', [
      { target: 'Cosa', native: 'What', korean: 'Cosa', english: 'What' },
      { target: 'mi consiglia?', native: 'do you recommend to me?', korean: 'mi consiglia?', english: 'do you recommend to me?' },
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
  targetLang: 'it',
  content: [
    createContentItem('L\'aeroporto', '', 'The airport', 'word', 'L\'aeroporto è lontano.', 'The airport is far.'),
    createContentItem('La stazione', '', 'The station', 'word', 'Dov\'è la stazione dei treni?', 'Where is the train station?'),
    createContentItem('Il treno', '', 'The train', 'word', 'Il treno parte alle dieci.', 'The train leaves at ten.'),
    createContentItem('L\'autobus', '', 'The bus', 'word', 'Prendo l\'autobus ogni giorno.', 'I take the bus every day.'),
    createContentItem('Il biglietto', '', 'The ticket', 'word', 'Dove posso comprare un biglietto?', 'Where can I buy a ticket?'),
    createContentItem('L\'albergo', '', 'The hotel', 'word', 'L\'albergo è in centro.', 'The hotel is in the center.'),
    createContentItem('La valigia', '', 'The suitcase', 'word', 'Ho perso la mia valigia.', 'I lost my suitcase.'),
    createContentItem('Il passaporto', '', 'The passport', 'word', 'Hai il passaporto?', 'Do you have the passport?'),
    createContentItem('La mappa', '', 'The map', 'word', 'Hai una mappa della città?', 'Do you have a map of the city?'),
    createContentItem('Dov\'è...?', '', 'Where is...?', 'sentence', 'Scusi, dov\'è il museo?', 'Excuse me, where is the museum?', [
      { target: 'Dov\'è', native: 'Where is', korean: 'Dov\'è', english: 'Where is' },
    ]),
    createContentItem('Quanto costa?', '', 'How much does it cost?', 'sentence', 'Quanto costa un biglietto?', 'How much does a ticket cost?', [
      { target: 'Quanto', native: 'How much', korean: 'Quanto', english: 'How much' },
      { target: 'costa?', native: 'does it cost?', korean: 'costa?', english: 'does it cost?' },
    ]),
    createContentItem('A che ora parte...?', '', 'What time does... leave?', 'sentence', 'A che ora parte il treno?', 'What time does the train leave?', [
      { target: 'A che ora', native: 'At what time', korean: 'A che ora', english: 'At what time' },
      { target: 'parte', native: 'does it leave', korean: 'parte', english: 'does it leave' },
    ]),
    createContentItem('Vorrei prenotare...', '', 'I would like to book...', 'sentence', 'Vorrei prenotare una camera.', 'I would like to book a room.', [
      { target: 'Vorrei', native: 'I would like', korean: 'Vorrei', english: 'I would like' },
      { target: 'prenotare', native: 'to book', korean: 'prenotare', english: 'to book' },
    ]),
    createContentItem('Andata e ritorno', '', 'Round trip', 'word', 'Un biglietto andata e ritorno per Milano.', 'A round trip ticket to Milan.'),
    createContentItem('Solo andata', '', 'One way', 'word', 'Un biglietto di sola andata.', 'A one-way ticket.'),
    createContentItem('La fermata', '', 'The stop', 'word', 'Qual è la prossima fermata?', 'What is the next stop?'),
    createContentItem('A destra', '', 'To the right', 'word', 'Giri a destra al semaforo.', 'Turn right at the traffic light.'),
    createContentItem('A sinistra', '', 'To the left', 'word', 'Giri a sinistra dopo il ponte.', 'Turn left after the bridge.'),
    createContentItem('Dritto', '', 'Straight ahead', 'word', 'Vada dritto per duecento metri.', 'Go straight for two hundred meters.'),
    createContentItem('Mi sono perso.', '', 'I\'m lost.', 'sentence', 'Scusi, mi sono perso.', 'Excuse me, I\'m lost.', [
      { target: 'Mi sono', native: 'I am', korean: 'Mi sono', english: 'I am' },
      { target: 'perso', native: 'lost', korean: 'perso', english: 'lost' },
    ]),
    createContentItem('Quanto tempo ci vuole?', '', 'How long does it take?', 'sentence', 'Quanto tempo ci vuole per arrivare?', 'How long does it take to arrive?', [
      { target: 'Quanto tempo', native: 'How long', korean: 'Quanto tempo', english: 'How long' },
      { target: 'ci vuole?', native: 'does it take?', korean: 'ci vuole?', english: 'does it take?' },
    ]),
    createContentItem('Il museo', '', 'The museum', 'word', 'Il museo chiude alle sei.', 'The museum closes at six.'),
    createContentItem('La spiaggia', '', 'The beach', 'word', 'Andiamo alla spiaggia domani.', 'Let\'s go to the beach tomorrow.'),
    createContentItem('Ho una prenotazione.', '', 'I have a reservation.', 'sentence', 'Buonasera, ho una prenotazione.', 'Good evening, I have a reservation.', [
      { target: 'Ho', native: 'I have', korean: 'Ho', english: 'I have' },
      { target: 'una prenotazione', native: 'a reservation', korean: 'una prenotazione', english: 'a reservation' },
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
  targetLang: 'it',
  content: [
    createContentItem('Il negozio', '', 'The shop', 'word', 'Il negozio è aperto.', 'The shop is open.'),
    createContentItem('Il supermercato', '', 'The supermarket', 'word', 'Vado al supermercato.', 'I\'m going to the supermarket.'),
    createContentItem('Il mercato', '', 'The market', 'word', 'Il mercato è il sabato mattina.', 'The market is on Saturday morning.'),
    createContentItem('I soldi', '', 'The money', 'word', 'Non ho abbastanza soldi.', 'I don\'t have enough money.'),
    createContentItem('La carta di credito', '', 'The credit card', 'word', 'Accettate la carta di credito?', 'Do you accept credit cards?'),
    createContentItem('Lo scontrino', '', 'The receipt', 'word', 'Posso avere lo scontrino?', 'Can I have the receipt?'),
    createContentItem('Quanto costa questo?', '', 'How much is this?', 'sentence', 'Scusi, quanto costa questo?', 'Excuse me, how much is this?', [
      { target: 'Quanto costa', native: 'How much does it cost', korean: 'Quanto costa', english: 'How much does it cost' },
      { target: 'questo?', native: 'this?', korean: 'questo?', english: 'this?' },
    ]),
    createContentItem('È troppo caro.', '', 'It\'s too expensive.', 'sentence', 'No grazie, è troppo caro.', 'No thanks, it\'s too expensive.', [
      { target: 'È', native: 'It is', korean: 'È', english: 'It is' },
      { target: 'troppo', native: 'too', korean: 'troppo', english: 'too' },
      { target: 'caro', native: 'expensive', korean: 'caro', english: 'expensive' },
    ]),
    createContentItem('C\'è uno sconto?', '', 'Is there a discount?', 'sentence', 'C\'è uno sconto per studenti?', 'Is there a student discount?', [
      { target: 'C\'è', native: 'Is there', korean: 'C\'è', english: 'Is there' },
      { target: 'uno sconto?', native: 'a discount?', korean: 'uno sconto?', english: 'a discount?' },
    ]),
    createContentItem('La taglia', '', 'The size', 'word', 'Che taglia porti?', 'What size do you wear?'),
    createContentItem('Grande', '', 'Big / Large', 'word', 'Avete una taglia più grande?', 'Do you have a bigger size?'),
    createContentItem('Piccolo', '', 'Small', 'word', 'Questo è troppo piccolo.', 'This is too small.'),
    createContentItem('Posso provarlo?', '', 'Can I try it on?', 'sentence', 'Mi piace, posso provarlo?', 'I like it, can I try it on?', [
      { target: 'Posso', native: 'Can I', korean: 'Posso', english: 'Can I' },
      { target: 'provarlo?', native: 'try it on?', korean: 'provarlo?', english: 'try it on?' },
    ]),
    createContentItem('Lo prendo.', '', 'I\'ll take it.', 'sentence', 'Va bene, lo prendo.', 'Alright, I\'ll take it.', [
      { target: 'Lo', native: 'It', korean: 'Lo', english: 'It' },
      { target: 'prendo', native: 'I take', korean: 'prendo', english: 'I take' },
    ]),
    createContentItem('Sto solo guardando.', '', 'I\'m just looking.', 'sentence', 'Grazie, sto solo guardando.', 'Thanks, I\'m just looking.', [
      { target: 'Sto', native: 'I am', korean: 'Sto', english: 'I am' },
      { target: 'solo', native: 'just', korean: 'solo', english: 'just' },
      { target: 'guardando', native: 'looking', korean: 'guardando', english: 'looking' },
    ]),
    createContentItem('Aperto', '', 'Open', 'word', 'Il negozio è aperto dalle nove.', 'The shop is open from nine.'),
    createContentItem('Chiuso', '', 'Closed', 'word', 'Mi dispiace, siamo chiusi.', 'I\'m sorry, we\'re closed.'),
    createContentItem('I saldi', '', 'The sales', 'word', 'Ci sono i saldi in questo periodo.', 'There are sales at this time.'),
    createContentItem('La borsa', '', 'The bag / purse', 'word', 'Quanto costa questa borsa?', 'How much does this bag cost?'),
    createContentItem('Le scarpe', '', 'The shoes', 'word', 'Queste scarpe sono comode.', 'These shoes are comfortable.'),
    createContentItem('Posso pagare in contanti?', '', 'Can I pay in cash?', 'sentence', 'Posso pagare in contanti?', 'Can I pay in cash?', [
      { target: 'Posso pagare', native: 'Can I pay', korean: 'Posso pagare', english: 'Can I pay' },
      { target: 'in contanti?', native: 'in cash?', korean: 'in contanti?', english: 'in cash?' },
    ]),
    createContentItem('Avete...?', '', 'Do you have...?', 'sentence', 'Avete questo in blu?', 'Do you have this in blue?', [
      { target: 'Avete', native: 'Do you have', korean: 'Avete', english: 'Do you have' },
      { target: 'questo', native: 'this', korean: 'questo', english: 'this' },
    ]),
    createContentItem('Il regalo', '', 'The gift', 'word', 'Cerco un regalo per mia madre.', 'I\'m looking for a gift for my mother.'),
    createContentItem('Economico', '', 'Cheap / Affordable', 'word', 'Questo è più economico.', 'This one is cheaper.'),
  ],
};

// ============================================================
// BUSINESS & WORK
// ============================================================
const business = {
  title: 'Business & Workplace',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'it',
  content: [
    createContentItem('L\'ufficio', '', 'The office', 'word', 'L\'ufficio è al terzo piano.', 'The office is on the third floor.'),
    createContentItem('La riunione', '', 'The meeting', 'word', 'La riunione è alle tre.', 'The meeting is at three.'),
    createContentItem('Il collega', '', 'The colleague', 'word', 'Il mio collega è molto gentile.', 'My colleague is very kind.'),
    createContentItem('Il capo', '', 'The boss', 'word', 'Il capo vuole parlarmi.', 'The boss wants to talk to me.'),
    createContentItem('L\'email', '', 'The email', 'word', 'Ho mandato un\'email stamattina.', 'I sent an email this morning.'),
    createContentItem('Il contratto', '', 'The contract', 'word', 'Devo firmare il contratto.', 'I have to sign the contract.'),
    createContentItem('Lo stipendio', '', 'The salary', 'word', 'Lo stipendio è buono.', 'The salary is good.'),
    createContentItem('Il progetto', '', 'The project', 'word', 'Lavoro a un nuovo progetto.', 'I\'m working on a new project.'),
    createContentItem('Ho un appuntamento.', '', 'I have an appointment.', 'sentence', 'Ho un appuntamento alle due.', 'I have an appointment at two.', [
      { target: 'Ho', native: 'I have', korean: 'Ho', english: 'I have' },
      { target: 'un appuntamento', native: 'an appointment', korean: 'un appuntamento', english: 'an appointment' },
    ]),
    createContentItem('Sono in ritardo.', '', 'I\'m late.', 'sentence', 'Mi scusi, sono in ritardo.', 'Excuse me, I\'m late.', [
      { target: 'Sono', native: 'I am', korean: 'Sono', english: 'I am' },
      { target: 'in ritardo', native: 'late', korean: 'in ritardo', english: 'late' },
    ]),
    createContentItem('Posso avere il suo biglietto da visita?', '', 'Can I have your business card?', 'sentence', 'Piacere, posso avere il suo biglietto da visita?', 'Nice to meet you, can I have your business card?', [
      { target: 'Posso avere', native: 'Can I have', korean: 'Posso avere', english: 'Can I have' },
      { target: 'il suo biglietto da visita?', native: 'your business card?', korean: 'il suo biglietto da visita?', english: 'your business card?' },
    ]),
    createContentItem('Che lavoro fai?', '', 'What do you do for work?', 'sentence', 'Piacere, che lavoro fai?', 'Nice to meet you, what do you do for work?', [
      { target: 'Che', native: 'What', korean: 'Che', english: 'What' },
      { target: 'lavoro', native: 'work/job', korean: 'lavoro', english: 'work/job' },
      { target: 'fai?', native: 'do you do?', korean: 'fai?', english: 'do you do?' },
    ]),
    createContentItem('Lavoro come...', '', 'I work as...', 'sentence', 'Lavoro come ingegnere.', 'I work as an engineer.', [
      { target: 'Lavoro', native: 'I work', korean: 'Lavoro', english: 'I work' },
      { target: 'come', native: 'as', korean: 'come', english: 'as' },
    ]),
    createContentItem('Il computer', '', 'The computer', 'word', 'Il computer non funziona.', 'The computer is not working.'),
    createContentItem('La stampante', '', 'The printer', 'word', 'La stampante è rotta.', 'The printer is broken.'),
    createContentItem('Il documento', '', 'The document', 'word', 'Devo stampare questo documento.', 'I have to print this document.'),
    createContentItem('La fattura', '', 'The invoice', 'word', 'Le mando la fattura domani.', 'I\'ll send you the invoice tomorrow.'),
    createContentItem('Posso parlare con...?', '', 'Can I speak with...?', 'sentence', 'Posso parlare con il direttore?', 'Can I speak with the director?', [
      { target: 'Posso parlare', native: 'Can I speak', korean: 'Posso parlare', english: 'Can I speak' },
      { target: 'con', native: 'with', korean: 'con', english: 'with' },
    ]),
    createContentItem('Il curriculum', '', 'The résumé / CV', 'word', 'Ho mandato il mio curriculum.', 'I sent my résumé.'),
    createContentItem('Il colloquio', '', 'The job interview', 'word', 'Ho un colloquio domani.', 'I have a job interview tomorrow.'),
    createContentItem('La scadenza', '', 'The deadline', 'word', 'La scadenza è venerdì.', 'The deadline is Friday.'),
    createContentItem('Sono d\'accordo.', '', 'I agree.', 'sentence', 'Sì, sono d\'accordo con lei.', 'Yes, I agree with you.', [
      { target: 'Sono', native: 'I am', korean: 'Sono', english: 'I am' },
      { target: 'd\'accordo', native: 'in agreement', korean: 'd\'accordo', english: 'in agreement' },
    ]),
    createContentItem('Le presento...', '', 'Let me introduce... (formal)', 'sentence', 'Le presento il mio collega, Marco.', 'Let me introduce my colleague, Marco.', [
      { target: 'Le presento', native: 'Let me introduce to you', korean: 'Le presento', english: 'Let me introduce to you' },
      { target: 'il mio collega', native: 'my colleague', korean: 'il mio collega', english: 'my colleague' },
    ]),
    createContentItem('L\'azienda', '', 'The company', 'word', 'L\'azienda è molto grande.', 'The company is very big.'),
  ],
};

// ============================================================
// HEALTHCARE & EMERGENCIES
// ============================================================
const healthcare = {
  title: 'Health & Medical',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'it',
  content: [
    createContentItem('L\'ospedale', '', 'The hospital', 'word', 'Dov\'è l\'ospedale più vicino?', 'Where is the nearest hospital?'),
    createContentItem('Il medico', '', 'The doctor', 'word', 'Devo vedere un medico.', 'I need to see a doctor.'),
    createContentItem('La farmacia', '', 'The pharmacy', 'word', 'C\'è una farmacia qui vicino?', 'Is there a pharmacy nearby?'),
    createContentItem('La medicina', '', 'The medicine', 'word', 'Devo prendere la medicina.', 'I have to take the medicine.'),
    createContentItem('La ricetta', '', 'The prescription', 'word', 'Ho bisogno di una ricetta.', 'I need a prescription.'),
    createContentItem('L\'ambulanza', '', 'The ambulance', 'word', 'Chiamate un\'ambulanza!', 'Call an ambulance!'),
    createContentItem('Mi fa male...', '', 'My... hurts', 'sentence', 'Mi fa male la testa.', 'My head hurts.', [
      { target: 'Mi fa male', native: '...hurts me', korean: 'Mi fa male', english: '...hurts me' },
      { target: 'la testa', native: 'the head', korean: 'la testa', english: 'the head' },
    ]),
    createContentItem('Non mi sento bene.', '', 'I don\'t feel well.', 'sentence', 'Non mi sento bene oggi.', 'I don\'t feel well today.', [
      { target: 'Non', native: 'Not', korean: 'Non', english: 'Not' },
      { target: 'mi sento', native: 'I feel', korean: 'mi sento', english: 'I feel' },
      { target: 'bene', native: 'well', korean: 'bene', english: 'well' },
    ]),
    createContentItem('Ho la febbre.', '', 'I have a fever.', 'sentence', 'Ho la febbre alta.', 'I have a high fever.', [
      { target: 'Ho', native: 'I have', korean: 'Ho', english: 'I have' },
      { target: 'la febbre', native: 'a fever', korean: 'la febbre', english: 'a fever' },
    ]),
    createContentItem('Ho il raffreddore.', '', 'I have a cold.', 'sentence', 'Ho il raffreddore da tre giorni.', 'I\'ve had a cold for three days.', [
      { target: 'Ho', native: 'I have', korean: 'Ho', english: 'I have' },
      { target: 'il raffreddore', native: 'a cold', korean: 'il raffreddore', english: 'a cold' },
    ]),
    createContentItem('La testa', '', 'The head', 'word', 'Mi gira la testa.', 'I feel dizzy.'),
    createContentItem('Lo stomaco', '', 'The stomach', 'word', 'Mi fa male lo stomaco.', 'My stomach hurts.'),
    createContentItem('Il braccio', '', 'The arm', 'word', 'Mi sono rotto il braccio.', 'I broke my arm.'),
    createContentItem('La gamba', '', 'The leg', 'word', 'Mi fa male la gamba.', 'My leg hurts.'),
    createContentItem('Il dente', '', 'The tooth', 'word', 'Ho mal di denti.', 'I have a toothache.'),
    createContentItem('Aiuto!', '', 'Help!', 'word', 'Aiuto! Chiamate la polizia!', 'Help! Call the police!'),
    createContentItem('È un\'emergenza.', '', 'It\'s an emergency.', 'sentence', 'Per favore, è un\'emergenza.', 'Please, it\'s an emergency.', [
      { target: 'È', native: 'It is', korean: 'È', english: 'It is' },
      { target: 'un\'emergenza', native: 'an emergency', korean: 'un\'emergenza', english: 'an emergency' },
    ]),
    createContentItem('Sono diabetico.', '', 'I\'m diabetic.', 'sentence', 'Attenzione, sono diabetico.', 'Careful, I\'m diabetic.', [
      { target: 'Sono', native: 'I am', korean: 'Sono', english: 'I am' },
      { target: 'diabetico', native: 'diabetic', korean: 'diabetico', english: 'diabetic' },
    ]),
    createContentItem('Ho bisogno di un dottore.', '', 'I need a doctor.', 'sentence', 'Per favore, ho bisogno di un dottore.', 'Please, I need a doctor.', [
      { target: 'Ho bisogno', native: 'I need', korean: 'Ho bisogno', english: 'I need' },
      { target: 'di un dottore', native: 'a doctor', korean: 'di un dottore', english: 'a doctor' },
    ]),
    createContentItem('L\'assicurazione', '', 'The insurance', 'word', 'Ha l\'assicurazione sanitaria?', 'Do you have health insurance?'),
    createContentItem('La pressione', '', 'The blood pressure', 'word', 'Devo misurare la pressione.', 'I need to measure my blood pressure.'),
    createContentItem('L\'allergia', '', 'The allergy', 'word', 'Ho un\'allergia al polline.', 'I have a pollen allergy.'),
    createContentItem('Dove fa male?', '', 'Where does it hurt?', 'sentence', 'Mi dica, dove fa male?', 'Tell me, where does it hurt?', [
      { target: 'Dove', native: 'Where', korean: 'Dove', english: 'Where' },
      { target: 'fa male?', native: 'does it hurt?', korean: 'fa male?', english: 'does it hurt?' },
    ]),
    createContentItem('La tosse', '', 'The cough', 'word', 'Ho una brutta tosse.', 'I have a bad cough.'),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
