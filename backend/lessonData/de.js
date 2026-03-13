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
  targetLang: 'de',
  content: [
    createContentItem('Hallo', '', 'Hello', 'word', 'Hallo, wie geht es Ihnen?', 'Hello, how are you?'),
    createContentItem('Guten Morgen', '', 'Good morning', 'word', 'Guten Morgen, haben Sie gut geschlafen?', 'Good morning, did you sleep well?'),
    createContentItem('Guten Tag', '', 'Good day', 'word', 'Guten Tag, kann ich Ihnen helfen?', 'Good day, can I help you?'),
    createContentItem('Guten Abend', '', 'Good evening', 'word', 'Guten Abend, willkommen im Restaurant.', 'Good evening, welcome to the restaurant.'),
    createContentItem('Gute Nacht', '', 'Good night', 'word', 'Gute Nacht, schlaf gut!', 'Good night, sleep well!'),
    createContentItem('Auf Wiedersehen', '', 'Goodbye', 'word', 'Auf Wiedersehen, bis morgen!', 'Goodbye, see you tomorrow!'),
    createContentItem('Tschüss', '', 'Bye (informal)', 'word', 'Tschüss, bis bald!', 'Bye, see you soon!'),
    createContentItem('Bis später', '', 'See you later', 'word', 'Bis später, ich muss jetzt gehen.', 'See you later, I have to go now.'),
    createContentItem('Wie geht es Ihnen?', '', 'How are you? (formal)', 'sentence', '', '', [
      { target: 'Wie', native: 'How' },
      { target: 'geht', native: 'goes' },
      { target: 'es', native: 'it' },
      { target: 'Ihnen', native: 'you (formal)' },
    ]),
    createContentItem('Mir geht es gut, danke.', '', 'I am fine, thank you.', 'sentence', '', '', [
      { target: 'Mir', native: 'To me' },
      { target: 'geht es', native: 'goes it' },
      { target: 'gut', native: 'well' },
      { target: 'danke', native: 'thank you' },
    ]),
    createContentItem('Danke', '', 'Thank you', 'word', 'Danke für Ihre Hilfe.', 'Thank you for your help.'),
    createContentItem('Bitte', '', 'Please / You\'re welcome', 'word', 'Bitte setzen Sie sich.', 'Please have a seat.'),
    createContentItem('Entschuldigung', '', 'Excuse me / Sorry', 'word', 'Entschuldigung, wo ist der Bahnhof?', 'Excuse me, where is the train station?'),
    createContentItem('Ja', '', 'Yes', 'word', 'Ja, das stimmt.', 'Yes, that is correct.'),
    createContentItem('Nein', '', 'No', 'word', 'Nein, das möchte ich nicht.', 'No, I don\'t want that.'),
    createContentItem('Ich heiße ...', '', 'My name is ...', 'sentence', 'Ich heiße Maria. Und Sie?', 'My name is Maria. And you?', [
      { target: 'Ich', native: 'I' },
      { target: 'heiße', native: 'am called' },
    ]),
    createContentItem('Freut mich!', '', 'Nice to meet you!', 'sentence', 'Freut mich, Sie kennenzulernen!', 'Nice to meet you!', [
      { target: 'Freut', native: 'Pleases' },
      { target: 'mich', native: 'me' },
    ]),
    createContentItem('Woher kommen Sie?', '', 'Where are you from? (formal)', 'sentence', '', '', [
      { target: 'Woher', native: 'From where' },
      { target: 'kommen', native: 'come' },
      { target: 'Sie', native: 'you (formal)' },
    ]),
    createContentItem('Ich komme aus ...', '', 'I come from ...', 'sentence', 'Ich komme aus Deutschland.', 'I come from Germany.', [
      { target: 'Ich', native: 'I' },
      { target: 'komme', native: 'come' },
      { target: 'aus', native: 'from' },
    ]),
    createContentItem('Sprechen Sie Englisch?', '', 'Do you speak English? (formal)', 'sentence', '', '', [
      { target: 'Sprechen', native: 'Speak' },
      { target: 'Sie', native: 'you (formal)' },
      { target: 'Englisch', native: 'English' },
    ]),
    createContentItem('Ich spreche ein bisschen Deutsch.', '', 'I speak a little German.', 'sentence', '', '', [
      { target: 'Ich', native: 'I' },
      { target: 'spreche', native: 'speak' },
      { target: 'ein bisschen', native: 'a little' },
      { target: 'Deutsch', native: 'German' },
    ]),
    createContentItem('Wie heißen Sie?', '', 'What is your name? (formal)', 'sentence', '', '', [
      { target: 'Wie', native: 'How' },
      { target: 'heißen', native: 'are called' },
      { target: 'Sie', native: 'you (formal)' },
    ]),
    createContentItem('Es tut mir leid.', '', 'I am sorry.', 'sentence', 'Es tut mir leid, ich verstehe nicht.', 'I am sorry, I don\'t understand.', [
      { target: 'Es', native: 'It' },
      { target: 'tut', native: 'does' },
      { target: 'mir', native: 'to me' },
      { target: 'leid', native: 'sorrow' },
    ]),
    createContentItem('Vielen Dank', '', 'Thank you very much', 'word', 'Vielen Dank für alles!', 'Thank you very much for everything!'),
    createContentItem('Willkommen', '', 'Welcome', 'word', 'Willkommen in Berlin!', 'Welcome to Berlin!'),
  ],
};

// ============================================================
// DAILY LIFE
// ============================================================
const dailyLife = {
  title: 'Daily Life & Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'de',
  content: [
    createContentItem('die Familie', '', 'the family', 'word', 'Meine Familie wohnt in München.', 'My family lives in Munich.'),
    createContentItem('das Haus', '', 'the house', 'word', 'Das Haus hat einen großen Garten.', 'The house has a large garden.'),
    createContentItem('die Wohnung', '', 'the apartment', 'word', 'Die Wohnung ist sehr gemütlich.', 'The apartment is very cozy.'),
    createContentItem('die Uhr', '', 'the clock / watch', 'word', 'Wie viel Uhr ist es?', 'What time is it?'),
    createContentItem('heute', '', 'today', 'word', 'Heute ist Montag.', 'Today is Monday.'),
    createContentItem('morgen', '', 'tomorrow', 'word', 'Morgen gehen wir einkaufen.', 'Tomorrow we go shopping.'),
    createContentItem('gestern', '', 'yesterday', 'word', 'Gestern war ein schöner Tag.', 'Yesterday was a beautiful day.'),
    createContentItem('Ich stehe um sieben Uhr auf.', '', 'I get up at seven o\'clock.', 'sentence', '', '', [
      { target: 'Ich', native: 'I' },
      { target: 'stehe ... auf', native: 'get up' },
      { target: 'um sieben Uhr', native: 'at seven o\'clock' },
    ]),
    createContentItem('die Arbeit', '', 'work / job', 'word', 'Ich gehe jeden Tag zur Arbeit.', 'I go to work every day.'),
    createContentItem('die Schule', '', 'the school', 'word', 'Die Kinder gehen in die Schule.', 'The children go to school.'),
    createContentItem('Ich dusche mich morgens.', '', 'I shower in the morning.', 'sentence', '', '', [
      { target: 'Ich', native: 'I' },
      { target: 'dusche mich', native: 'shower myself' },
      { target: 'morgens', native: 'in the morning' },
    ]),
    createContentItem('das Frühstück', '', 'breakfast', 'word', 'Zum Frühstück esse ich Brot mit Marmelade.', 'For breakfast I eat bread with jam.'),
    createContentItem('das Mittagessen', '', 'lunch', 'word', 'Das Mittagessen ist um zwölf Uhr.', 'Lunch is at twelve o\'clock.'),
    createContentItem('das Abendessen', '', 'dinner', 'word', 'Was gibt es zum Abendessen?', 'What is there for dinner?'),
    createContentItem('Wo ist die Toilette?', '', 'Where is the toilet?', 'sentence', '', '', [
      { target: 'Wo', native: 'Where' },
      { target: 'ist', native: 'is' },
      { target: 'die Toilette', native: 'the toilet' },
    ]),
    createContentItem('das Wetter', '', 'the weather', 'word', 'Wie ist das Wetter heute?', 'How is the weather today?'),
    createContentItem('Es regnet.', '', 'It is raining.', 'sentence', 'Es regnet den ganzen Tag.', 'It is raining all day.', [
      { target: 'Es', native: 'It' },
      { target: 'regnet', native: 'rains' },
    ]),
    createContentItem('die Straße', '', 'the street', 'word', 'Die Straße ist sehr lang.', 'The street is very long.'),
    createContentItem('der Bus', '', 'the bus', 'word', 'Der Bus kommt in fünf Minuten.', 'The bus comes in five minutes.'),
    createContentItem('Ich gehe gern spazieren.', '', 'I like to go for a walk.', 'sentence', '', '', [
      { target: 'Ich', native: 'I' },
      { target: 'gehe', native: 'go' },
      { target: 'gern', native: 'gladly / like to' },
      { target: 'spazieren', native: 'for a walk' },
    ]),
    createContentItem('der Freund', '', 'the friend (male)', 'word', 'Mein Freund heißt Thomas.', 'My friend is called Thomas.'),
    createContentItem('die Freundin', '', 'the friend (female)', 'word', 'Meine Freundin kommt aus Österreich.', 'My friend comes from Austria.'),
    createContentItem('Ich bin müde.', '', 'I am tired.', 'sentence', 'Ich bin müde, ich gehe ins Bett.', 'I am tired, I am going to bed.', [
      { target: 'Ich', native: 'I' },
      { target: 'bin', native: 'am' },
      { target: 'müde', native: 'tired' },
    ]),
    createContentItem('das Telefon', '', 'the telephone', 'word', 'Das Telefon klingelt.', 'The telephone is ringing.'),
    createContentItem('Wie spät ist es?', '', 'What time is it?', 'sentence', '', '', [
      { target: 'Wie', native: 'How' },
      { target: 'spät', native: 'late' },
      { target: 'ist', native: 'is' },
      { target: 'es', native: 'it' },
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
  targetLang: 'de',
  content: [
    createContentItem('das Brot', '', 'bread', 'word', 'Ich möchte ein Stück Brot, bitte.', 'I would like a piece of bread, please.'),
    createContentItem('das Wasser', '', 'water', 'word', 'Kann ich ein Glas Wasser haben?', 'Can I have a glass of water?'),
    createContentItem('der Kaffee', '', 'coffee', 'word', 'Ich trinke morgens immer Kaffee.', 'I always drink coffee in the morning.'),
    createContentItem('der Tee', '', 'tea', 'word', 'Möchten Sie Tee oder Kaffee?', 'Would you like tea or coffee?'),
    createContentItem('das Bier', '', 'beer', 'word', 'Ein Bier, bitte!', 'A beer, please!'),
    createContentItem('der Wein', '', 'wine', 'word', 'Ich hätte gern ein Glas Rotwein.', 'I would like a glass of red wine.'),
    createContentItem('das Fleisch', '', 'meat', 'word', 'Ich esse kein Fleisch.', 'I don\'t eat meat.'),
    createContentItem('der Fisch', '', 'fish', 'word', 'Der Fisch ist sehr frisch.', 'The fish is very fresh.'),
    createContentItem('das Gemüse', '', 'vegetables', 'word', 'Gemüse ist gesund.', 'Vegetables are healthy.'),
    createContentItem('das Obst', '', 'fruit', 'word', 'Ich esse gern Obst zum Frühstück.', 'I like to eat fruit for breakfast.'),
    createContentItem('die Kartoffel', '', 'potato', 'word', 'Kartoffeln sind ein typisch deutsches Essen.', 'Potatoes are a typical German food.'),
    createContentItem('der Käse', '', 'cheese', 'word', 'Ich hätte gern ein Brot mit Käse.', 'I would like bread with cheese.'),
    createContentItem('Ich hätte gern ...', '', 'I would like ...', 'sentence', 'Ich hätte gern eine Suppe.', 'I would like a soup.', [
      { target: 'Ich', native: 'I' },
      { target: 'hätte', native: 'would have' },
      { target: 'gern', native: 'gladly' },
    ]),
    createContentItem('Die Rechnung, bitte.', '', 'The bill, please.', 'sentence', '', '', [
      { target: 'Die', native: 'The' },
      { target: 'Rechnung', native: 'bill' },
      { target: 'bitte', native: 'please' },
    ]),
    createContentItem('das Restaurant', '', 'the restaurant', 'word', 'Wir gehen heute Abend ins Restaurant.', 'We are going to the restaurant tonight.'),
    createContentItem('die Speisekarte', '', 'the menu', 'word', 'Kann ich die Speisekarte haben?', 'Can I have the menu?'),
    createContentItem('Das schmeckt gut!', '', 'That tastes good!', 'sentence', '', '', [
      { target: 'Das', native: 'That' },
      { target: 'schmeckt', native: 'tastes' },
      { target: 'gut', native: 'good' },
    ]),
    createContentItem('Ich bin vegetarisch.', '', 'I am vegetarian.', 'sentence', '', '', [
      { target: 'Ich', native: 'I' },
      { target: 'bin', native: 'am' },
      { target: 'vegetarisch', native: 'vegetarian' },
    ]),
    createContentItem('der Zucker', '', 'sugar', 'word', 'Ohne Zucker, bitte.', 'Without sugar, please.'),
    createContentItem('die Milch', '', 'milk', 'word', 'Ich nehme Milch im Kaffee.', 'I take milk in my coffee.'),
    createContentItem('Haben Sie einen Tisch für zwei?', '', 'Do you have a table for two?', 'sentence', '', '', [
      { target: 'Haben', native: 'Have' },
      { target: 'Sie', native: 'you (formal)' },
      { target: 'einen Tisch', native: 'a table' },
      { target: 'für zwei', native: 'for two' },
    ]),
    createContentItem('der Kuchen', '', 'cake', 'word', 'Der Kuchen ist sehr lecker.', 'The cake is very delicious.'),
    createContentItem('die Wurst', '', 'sausage', 'word', 'Die Bratwurst ist typisch deutsch.', 'Bratwurst is typically German.'),
    createContentItem('Zum Wohl!', '', 'Cheers!', 'sentence', 'Zum Wohl! Auf unsere Freundschaft!', 'Cheers! To our friendship!', [
      { target: 'Zum', native: 'To the' },
      { target: 'Wohl', native: 'well-being' },
    ]),
    createContentItem('Guten Appetit!', '', 'Enjoy your meal!', 'sentence', 'Das Essen ist fertig. Guten Appetit!', 'The food is ready. Enjoy your meal!', [
      { target: 'Guten', native: 'Good' },
      { target: 'Appetit', native: 'appetite' },
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
  targetLang: 'de',
  content: [
    createContentItem('der Flughafen', '', 'the airport', 'word', 'Wie komme ich zum Flughafen?', 'How do I get to the airport?'),
    createContentItem('der Bahnhof', '', 'the train station', 'word', 'Der Bahnhof ist in der Nähe.', 'The train station is nearby.'),
    createContentItem('der Zug', '', 'the train', 'word', 'Der Zug fährt um neun Uhr ab.', 'The train departs at nine o\'clock.'),
    createContentItem('die U-Bahn', '', 'the subway', 'word', 'Nehmen Sie die U-Bahn Linie drei.', 'Take subway line three.'),
    createContentItem('das Hotel', '', 'the hotel', 'word', 'Ich habe ein Zimmer im Hotel reserviert.', 'I have reserved a room at the hotel.'),
    createContentItem('der Reisepass', '', 'the passport', 'word', 'Haben Sie Ihren Reisepass dabei?', 'Do you have your passport with you?'),
    createContentItem('die Fahrkarte', '', 'the ticket', 'word', 'Wo kann ich eine Fahrkarte kaufen?', 'Where can I buy a ticket?'),
    createContentItem('Wo ist ...?', '', 'Where is ...?', 'sentence', 'Wo ist das Museum?', 'Where is the museum?', [
      { target: 'Wo', native: 'Where' },
      { target: 'ist', native: 'is' },
    ]),
    createContentItem('links', '', 'left', 'word', 'Gehen Sie nach links.', 'Go to the left.'),
    createContentItem('rechts', '', 'right', 'word', 'Das Hotel ist rechts um die Ecke.', 'The hotel is right around the corner.'),
    createContentItem('geradeaus', '', 'straight ahead', 'word', 'Gehen Sie geradeaus bis zur Ampel.', 'Go straight ahead to the traffic light.'),
    createContentItem('Wie komme ich zum ...?', '', 'How do I get to the ...?', 'sentence', 'Wie komme ich zum Brandenburger Tor?', 'How do I get to the Brandenburg Gate?', [
      { target: 'Wie', native: 'How' },
      { target: 'komme', native: 'come / get' },
      { target: 'ich', native: 'I' },
      { target: 'zum', native: 'to the' },
    ]),
    createContentItem('die Haltestelle', '', 'the stop (bus/tram)', 'word', 'Die Haltestelle ist dort drüben.', 'The stop is over there.'),
    createContentItem('Ich möchte ein Zimmer buchen.', '', 'I would like to book a room.', 'sentence', '', '', [
      { target: 'Ich', native: 'I' },
      { target: 'möchte', native: 'would like' },
      { target: 'ein Zimmer', native: 'a room' },
      { target: 'buchen', native: 'to book' },
    ]),
    createContentItem('die Landkarte', '', 'the map', 'word', 'Haben Sie eine Landkarte von der Stadt?', 'Do you have a map of the city?'),
    createContentItem('das Gepäck', '', 'luggage', 'word', 'Wo kann ich mein Gepäck abgeben?', 'Where can I drop off my luggage?'),
    createContentItem('Wann fährt der nächste Zug?', '', 'When does the next train leave?', 'sentence', '', '', [
      { target: 'Wann', native: 'When' },
      { target: 'fährt', native: 'leaves / drives' },
      { target: 'der nächste', native: 'the next' },
      { target: 'Zug', native: 'train' },
    ]),
    createContentItem('die Abfahrt', '', 'departure', 'word', 'Die Abfahrt ist um acht Uhr.', 'The departure is at eight o\'clock.'),
    createContentItem('die Ankunft', '', 'arrival', 'word', 'Die Ankunft ist um zehn Uhr.', 'The arrival is at ten o\'clock.'),
    createContentItem('das Taxi', '', 'the taxi', 'word', 'Können Sie mir ein Taxi rufen?', 'Can you call me a taxi?'),
    createContentItem('Ist es weit von hier?', '', 'Is it far from here?', 'sentence', '', '', [
      { target: 'Ist', native: 'Is' },
      { target: 'es', native: 'it' },
      { target: 'weit', native: 'far' },
      { target: 'von hier', native: 'from here' },
    ]),
    createContentItem('die Brücke', '', 'the bridge', 'word', 'Gehen Sie über die Brücke.', 'Go over the bridge.'),
    createContentItem('der Ausgang', '', 'the exit', 'word', 'Wo ist der Ausgang?', 'Where is the exit?'),
    createContentItem('der Eingang', '', 'the entrance', 'word', 'Der Eingang ist auf der anderen Seite.', 'The entrance is on the other side.'),
    createContentItem('Ich habe mich verlaufen.', '', 'I am lost.', 'sentence', '', '', [
      { target: 'Ich', native: 'I' },
      { target: 'habe', native: 'have' },
      { target: 'mich', native: 'myself' },
      { target: 'verlaufen', native: 'lost (walking)' },
    ]),
  ],
};

// ============================================================
// SHOPPING
// ============================================================
const shopping = {
  title: 'Shopping & Prices',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'de',
  content: [
    createContentItem('das Geschäft', '', 'the shop / store', 'word', 'Das Geschäft öffnet um neun Uhr.', 'The shop opens at nine o\'clock.'),
    createContentItem('der Supermarkt', '', 'the supermarket', 'word', 'Ich gehe in den Supermarkt.', 'I am going to the supermarket.'),
    createContentItem('Wie viel kostet das?', '', 'How much does that cost?', 'sentence', '', '', [
      { target: 'Wie viel', native: 'How much' },
      { target: 'kostet', native: 'costs' },
      { target: 'das', native: 'that' },
    ]),
    createContentItem('teuer', '', 'expensive', 'word', 'Das ist zu teuer.', 'That is too expensive.'),
    createContentItem('billig', '', 'cheap', 'word', 'Hier gibt es billige Kleidung.', 'There are cheap clothes here.'),
    createContentItem('günstig', '', 'affordable / good value', 'word', 'Dieses Angebot ist sehr günstig.', 'This offer is very affordable.'),
    createContentItem('die Größe', '', 'the size', 'word', 'Welche Größe haben Sie?', 'What size do you have?'),
    createContentItem('Haben Sie das in einer anderen Größe?', '', 'Do you have this in another size?', 'sentence', '', '', [
      { target: 'Haben Sie', native: 'Do you have' },
      { target: 'das', native: 'this' },
      { target: 'in einer anderen', native: 'in another' },
      { target: 'Größe', native: 'size' },
    ]),
    createContentItem('das Geld', '', 'money', 'word', 'Ich habe nicht genug Geld dabei.', 'I don\'t have enough money with me.'),
    createContentItem('die Kasse', '', 'the cash register / checkout', 'word', 'Bitte zahlen Sie an der Kasse.', 'Please pay at the checkout.'),
    createContentItem('Kann ich mit Karte zahlen?', '', 'Can I pay by card?', 'sentence', '', '', [
      { target: 'Kann', native: 'Can' },
      { target: 'ich', native: 'I' },
      { target: 'mit Karte', native: 'by card' },
      { target: 'zahlen', native: 'pay' },
    ]),
    createContentItem('bar', '', 'cash (adjective)', 'word', 'Ich zahle bar.', 'I pay in cash.'),
    createContentItem('der Rabatt', '', 'the discount', 'word', 'Gibt es einen Rabatt?', 'Is there a discount?'),
    createContentItem('das Sonderangebot', '', 'the special offer', 'word', 'Diese Woche gibt es ein Sonderangebot.', 'This week there is a special offer.'),
    createContentItem('die Tüte', '', 'the bag', 'word', 'Brauchen Sie eine Tüte?', 'Do you need a bag?'),
    createContentItem('Ich schaue mich nur um.', '', 'I am just looking around.', 'sentence', '', '', [
      { target: 'Ich', native: 'I' },
      { target: 'schaue', native: 'look' },
      { target: 'mich', native: 'myself' },
      { target: 'nur', native: 'just' },
      { target: 'um', native: 'around' },
    ]),
    createContentItem('Kann ich das anprobieren?', '', 'Can I try this on?', 'sentence', '', '', [
      { target: 'Kann', native: 'Can' },
      { target: 'ich', native: 'I' },
      { target: 'das', native: 'this' },
      { target: 'anprobieren', native: 'try on' },
    ]),
    createContentItem('die Umkleidekabine', '', 'the fitting room', 'word', 'Wo ist die Umkleidekabine?', 'Where is the fitting room?'),
    createContentItem('der Markt', '', 'the market', 'word', 'Samstags gehe ich auf den Markt.', 'On Saturdays I go to the market.'),
    createContentItem('geöffnet', '', 'open', 'word', 'Das Geschäft ist von neun bis achtzehn Uhr geöffnet.', 'The shop is open from nine to six.'),
    createContentItem('geschlossen', '', 'closed', 'word', 'Sonntags ist alles geschlossen.', 'On Sundays everything is closed.'),
    createContentItem('Ich nehme das.', '', 'I will take that.', 'sentence', '', '', [
      { target: 'Ich', native: 'I' },
      { target: 'nehme', native: 'take' },
      { target: 'das', native: 'that' },
    ]),
    createContentItem('die Quittung', '', 'the receipt', 'word', 'Kann ich eine Quittung bekommen?', 'Can I get a receipt?'),
    createContentItem('Das passt gut.', '', 'That fits well.', 'sentence', '', '', [
      { target: 'Das', native: 'That' },
      { target: 'passt', native: 'fits' },
      { target: 'gut', native: 'well' },
    ]),
    createContentItem('umtauschen', '', 'to exchange / return', 'word', 'Kann ich das umtauschen?', 'Can I exchange this?'),
  ],
};

// ============================================================
// BUSINESS
// ============================================================
const business = {
  title: 'Business & Work',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'de',
  content: [
    createContentItem('das Büro', '', 'the office', 'word', 'Ich arbeite in einem Büro.', 'I work in an office.'),
    createContentItem('die Besprechung', '', 'the meeting', 'word', 'Die Besprechung ist um zehn Uhr.', 'The meeting is at ten o\'clock.'),
    createContentItem('der Chef', '', 'the boss (male)', 'word', 'Mein Chef ist sehr nett.', 'My boss is very nice.'),
    createContentItem('die Chefin', '', 'the boss (female)', 'word', 'Die Chefin leitet die Besprechung.', 'The boss is leading the meeting.'),
    createContentItem('der Kollege', '', 'the colleague (male)', 'word', 'Mein Kollege hilft mir bei dem Projekt.', 'My colleague helps me with the project.'),
    createContentItem('die Kollegin', '', 'the colleague (female)', 'word', 'Meine Kollegin ist sehr kompetent.', 'My colleague is very competent.'),
    createContentItem('der Termin', '', 'the appointment', 'word', 'Ich habe morgen einen wichtigen Termin.', 'I have an important appointment tomorrow.'),
    createContentItem('die E-Mail', '', 'the email', 'word', 'Ich schicke Ihnen eine E-Mail.', 'I will send you an email.'),
    createContentItem('Ich arbeite bei ...', '', 'I work at ...', 'sentence', 'Ich arbeite bei einer großen Firma.', 'I work at a large company.', [
      { target: 'Ich', native: 'I' },
      { target: 'arbeite', native: 'work' },
      { target: 'bei', native: 'at' },
    ]),
    createContentItem('der Vertrag', '', 'the contract', 'word', 'Bitte unterschreiben Sie den Vertrag.', 'Please sign the contract.'),
    createContentItem('Was ist Ihr Beruf?', '', 'What is your profession?', 'sentence', '', '', [
      { target: 'Was', native: 'What' },
      { target: 'ist', native: 'is' },
      { target: 'Ihr', native: 'your (formal)' },
      { target: 'Beruf', native: 'profession' },
    ]),
    createContentItem('die Firma', '', 'the company', 'word', 'Die Firma hat 500 Mitarbeiter.', 'The company has 500 employees.'),
    createContentItem('das Gehalt', '', 'the salary', 'word', 'Das Gehalt wird monatlich gezahlt.', 'The salary is paid monthly.'),
    createContentItem('der Lebenslauf', '', 'the CV / resume', 'word', 'Bitte senden Sie Ihren Lebenslauf.', 'Please send your CV.'),
    createContentItem('Ich habe einen Termin mit ...', '', 'I have an appointment with ...', 'sentence', 'Ich habe einen Termin mit Herrn Müller.', 'I have an appointment with Mr. Müller.', [
      { target: 'Ich habe', native: 'I have' },
      { target: 'einen Termin', native: 'an appointment' },
      { target: 'mit', native: 'with' },
    ]),
    createContentItem('das Projekt', '', 'the project', 'word', 'Das Projekt muss nächste Woche fertig sein.', 'The project must be finished next week.'),
    createContentItem('der Computer', '', 'the computer', 'word', 'Mein Computer funktioniert nicht.', 'My computer is not working.'),
    createContentItem('das Telefongespräch', '', 'the phone call', 'word', 'Ich bin in einem Telefongespräch.', 'I am on a phone call.'),
    createContentItem('Können wir einen Termin vereinbaren?', '', 'Can we arrange an appointment?', 'sentence', '', '', [
      { target: 'Können', native: 'Can' },
      { target: 'wir', native: 'we' },
      { target: 'einen Termin', native: 'an appointment' },
      { target: 'vereinbaren', native: 'arrange' },
    ]),
    createContentItem('die Visitenkarte', '', 'the business card', 'word', 'Hier ist meine Visitenkarte.', 'Here is my business card.'),
    createContentItem('der Praktikant', '', 'the intern (male)', 'word', 'Der Praktikant beginnt nächsten Monat.', 'The intern starts next month.'),
    createContentItem('Ich bin für ... zuständig.', '', 'I am responsible for ...', 'sentence', 'Ich bin für den Verkauf zuständig.', 'I am responsible for sales.', [
      { target: 'Ich', native: 'I' },
      { target: 'bin', native: 'am' },
      { target: 'für', native: 'for' },
      { target: 'zuständig', native: 'responsible' },
    ]),
    createContentItem('die Pause', '', 'the break', 'word', 'Wir machen jetzt Mittagspause.', 'We are taking a lunch break now.'),
    createContentItem('der Feierabend', '', 'end of the workday', 'word', 'Ich habe um fünf Uhr Feierabend.', 'I finish work at five o\'clock.'),
    createContentItem('die Bewerbung', '', 'the application', 'word', 'Ich habe eine Bewerbung geschrieben.', 'I have written an application.'),
  ],
};

// ============================================================
// HEALTHCARE
// ============================================================
const healthcare = {
  title: 'Healthcare & Emergencies',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'de',
  content: [
    createContentItem('der Arzt', '', 'the doctor (male)', 'word', 'Ich muss zum Arzt gehen.', 'I need to go to the doctor.'),
    createContentItem('die Ärztin', '', 'the doctor (female)', 'word', 'Die Ärztin ist sehr freundlich.', 'The doctor is very friendly.'),
    createContentItem('das Krankenhaus', '', 'the hospital', 'word', 'Wo ist das nächste Krankenhaus?', 'Where is the nearest hospital?'),
    createContentItem('die Apotheke', '', 'the pharmacy', 'word', 'Die Apotheke ist um die Ecke.', 'The pharmacy is around the corner.'),
    createContentItem('Ich bin krank.', '', 'I am sick.', 'sentence', 'Ich bin krank und kann nicht arbeiten.', 'I am sick and cannot work.', [
      { target: 'Ich', native: 'I' },
      { target: 'bin', native: 'am' },
      { target: 'krank', native: 'sick' },
    ]),
    createContentItem('Ich habe Kopfschmerzen.', '', 'I have a headache.', 'sentence', '', '', [
      { target: 'Ich', native: 'I' },
      { target: 'habe', native: 'have' },
      { target: 'Kopfschmerzen', native: 'headache' },
    ]),
    createContentItem('Ich habe Bauchschmerzen.', '', 'I have a stomachache.', 'sentence', '', '', [
      { target: 'Ich', native: 'I' },
      { target: 'habe', native: 'have' },
      { target: 'Bauchschmerzen', native: 'stomachache' },
    ]),
    createContentItem('das Fieber', '', 'fever', 'word', 'Ich habe Fieber.', 'I have a fever.'),
    createContentItem('der Husten', '', 'cough', 'word', 'Ich habe seit drei Tagen Husten.', 'I have had a cough for three days.'),
    createContentItem('der Schnupfen', '', 'cold / runny nose', 'word', 'Ich habe Schnupfen.', 'I have a cold.'),
    createContentItem('die Allergie', '', 'allergy', 'word', 'Ich habe eine Allergie gegen Nüsse.', 'I have an allergy to nuts.'),
    createContentItem('das Medikament', '', 'medication', 'word', 'Ich brauche ein Medikament.', 'I need medication.'),
    createContentItem('das Rezept', '', 'the prescription', 'word', 'Sie brauchen ein Rezept vom Arzt.', 'You need a prescription from the doctor.'),
    createContentItem('Hilfe!', '', 'Help!', 'word', 'Hilfe! Rufen Sie einen Krankenwagen!', 'Help! Call an ambulance!'),
    createContentItem('der Notfall', '', 'the emergency', 'word', 'Das ist ein Notfall!', 'This is an emergency!'),
    createContentItem('Rufen Sie einen Krankenwagen!', '', 'Call an ambulance!', 'sentence', '', '', [
      { target: 'Rufen', native: 'Call' },
      { target: 'Sie', native: 'you (formal)' },
      { target: 'einen Krankenwagen', native: 'an ambulance' },
    ]),
    createContentItem('Wo tut es weh?', '', 'Where does it hurt?', 'sentence', '', '', [
      { target: 'Wo', native: 'Where' },
      { target: 'tut', native: 'does' },
      { target: 'es', native: 'it' },
      { target: 'weh', native: 'hurt' },
    ]),
    createContentItem('Es tut hier weh.', '', 'It hurts here.', 'sentence', '', '', [
      { target: 'Es', native: 'It' },
      { target: 'tut', native: 'does' },
      { target: 'hier', native: 'here' },
      { target: 'weh', native: 'hurt' },
    ]),
    createContentItem('die Versicherung', '', 'insurance', 'word', 'Haben Sie eine Krankenversicherung?', 'Do you have health insurance?'),
    createContentItem('der Zahnarzt', '', 'the dentist', 'word', 'Ich habe einen Termin beim Zahnarzt.', 'I have an appointment at the dentist.'),
    createContentItem('Ich brauche einen Arzt.', '', 'I need a doctor.', 'sentence', '', '', [
      { target: 'Ich', native: 'I' },
      { target: 'brauche', native: 'need' },
      { target: 'einen Arzt', native: 'a doctor' },
    ]),
    createContentItem('die Erkältung', '', 'the common cold', 'word', 'Ich habe eine Erkältung.', 'I have a cold.'),
    createContentItem('das Pflaster', '', 'the bandage / plaster', 'word', 'Haben Sie ein Pflaster?', 'Do you have a bandage?'),
    createContentItem('Ich bin gegen ... allergisch.', '', 'I am allergic to ...', 'sentence', 'Ich bin gegen Penicillin allergisch.', 'I am allergic to penicillin.', [
      { target: 'Ich', native: 'I' },
      { target: 'bin', native: 'am' },
      { target: 'gegen', native: 'to / against' },
      { target: 'allergisch', native: 'allergic' },
    ]),
    createContentItem('die Tablette', '', 'the tablet / pill', 'word', 'Nehmen Sie dreimal täglich eine Tablette.', 'Take one tablet three times daily.'),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
