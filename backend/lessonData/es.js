// Spanish (es) - Beginner Lesson Data
// Real, accurate Spanish vocabulary and phrases for all 7 categories

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
  targetLang: 'es',
  content: [
    createContentItem('Hola', '', 'Hello', 'word', 'Hola, ¿cómo estás?', 'Hello, how are you?'),
    createContentItem('Buenos días', '', 'Good morning', 'word', 'Buenos días, señora.', 'Good morning, ma\'am.'),
    createContentItem('Buenas tardes', '', 'Good afternoon', 'word', 'Buenas tardes a todos.', 'Good afternoon everyone.'),
    createContentItem('Buenas noches', '', 'Good evening / Good night', 'word', 'Buenas noches, que descanses.', 'Good night, rest well.'),
    createContentItem('Adiós', '', 'Goodbye', 'word', 'Adiós, nos vemos mañana.', 'Goodbye, see you tomorrow.'),
    createContentItem('Hasta luego', '', 'See you later', 'word', 'Hasta luego, amigo.', 'See you later, friend.'),
    createContentItem('Hasta mañana', '', 'See you tomorrow', 'word', 'Hasta mañana en clase.', 'See you tomorrow in class.'),
    createContentItem('Por favor', '', 'Please', 'word', '¿Me ayudas, por favor?', 'Can you help me, please?'),
    createContentItem('Gracias', '', 'Thank you', 'word', 'Muchas gracias por tu ayuda.', 'Thank you very much for your help.'),
    createContentItem('De nada', '', 'You\'re welcome', 'word', 'De nada, fue un placer.', 'You\'re welcome, it was a pleasure.'),
    createContentItem('Lo siento', '', 'I\'m sorry', 'word', 'Lo siento mucho.', 'I\'m very sorry.'),
    createContentItem('Perdón', '', 'Excuse me / Pardon', 'word', 'Perdón, ¿dónde está el baño?', 'Excuse me, where is the bathroom?'),
    createContentItem('Sí', '', 'Yes', 'word', 'Sí, estoy de acuerdo.', 'Yes, I agree.'),
    createContentItem('No', '', 'No', 'word', 'No, gracias.', 'No, thank you.'),
    createContentItem('¿Cómo te llamas?', '', 'What is your name?', 'sentence', '', '', [
      { target: '¿Cómo', native: 'How / What', korean: '¿Cómo', english: 'How / What' },
      { target: 'te llamas?', native: 'are you called?', korean: 'te llamas?', english: 'are you called?' },
    ]),
    createContentItem('Me llamo María.', '', 'My name is María.', 'sentence', '', '', [
      { target: 'Me llamo', native: 'I am called / My name is', korean: 'Me llamo', english: 'I am called / My name is' },
      { target: 'María', native: 'María', korean: 'María', english: 'María' },
    ]),
    createContentItem('Mucho gusto.', '', 'Nice to meet you.', 'sentence', 'Mucho gusto en conocerte.', 'Very nice to meet you.', [
      { target: 'Mucho', native: 'Much / Very', korean: 'Mucho', english: 'Much / Very' },
      { target: 'gusto', native: 'pleasure', korean: 'gusto', english: 'pleasure' },
    ]),
    createContentItem('¿Cómo estás?', '', 'How are you?', 'sentence', '', '', [
      { target: '¿Cómo', native: 'How', korean: '¿Cómo', english: 'How' },
      { target: 'estás?', native: 'are you?', korean: 'estás?', english: 'are you?' },
    ]),
    createContentItem('Estoy bien, gracias.', '', 'I\'m fine, thank you.', 'sentence', '', '', [
      { target: 'Estoy', native: 'I am', korean: 'Estoy', english: 'I am' },
      { target: 'bien', native: 'fine / well', korean: 'bien', english: 'fine / well' },
      { target: 'gracias', native: 'thank you', korean: 'gracias', english: 'thank you' },
    ]),
    createContentItem('¿De dónde eres?', '', 'Where are you from?', 'sentence', '', '', [
      { target: '¿De dónde', native: 'From where', korean: '¿De dónde', english: 'From where' },
      { target: 'eres?', native: 'are you?', korean: 'eres?', english: 'are you?' },
    ]),
    createContentItem('Soy de Estados Unidos.', '', 'I am from the United States.', 'sentence', '', '', [
      { target: 'Soy', native: 'I am', korean: 'Soy', english: 'I am' },
      { target: 'de', native: 'from', korean: 'de', english: 'from' },
      { target: 'Estados Unidos', native: 'United States', korean: 'Estados Unidos', english: 'United States' },
    ]),
    createContentItem('¿Hablas español?', '', 'Do you speak Spanish?', 'sentence', '', '', [
      { target: '¿Hablas', native: 'Do you speak', korean: '¿Hablas', english: 'Do you speak' },
      { target: 'español?', native: 'Spanish?', korean: 'español?', english: 'Spanish?' },
    ]),
    createContentItem('Un poco.', '', 'A little.', 'word', 'Hablo un poco de español.', 'I speak a little Spanish.'),
    createContentItem('No entiendo.', '', 'I don\'t understand.', 'sentence', 'No entiendo lo que dices.', 'I don\'t understand what you\'re saying.', [
      { target: 'No', native: 'Not', korean: 'No', english: 'Not' },
      { target: 'entiendo', native: 'I understand', korean: 'entiendo', english: 'I understand' },
    ]),
    createContentItem('¿Puedes repetir, por favor?', '', 'Can you repeat, please?', 'sentence', '', '', [
      { target: '¿Puedes', native: 'Can you', korean: '¿Puedes', english: 'Can you' },
      { target: 'repetir', native: 'repeat', korean: 'repetir', english: 'repeat' },
      { target: 'por favor?', native: 'please?', korean: 'por favor?', english: 'please?' },
    ]),
  ],
};

// ============================================================
// DAILY LIFE - Everyday Activities & Routines
// ============================================================
const dailyLife = {
  title: 'Everyday Activities & Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'es',
  content: [
    createContentItem('La casa', '', 'The house', 'word', 'Mi casa es grande.', 'My house is big.'),
    createContentItem('La familia', '', 'The family', 'word', 'Mi familia es muy unida.', 'My family is very close.'),
    createContentItem('El trabajo', '', 'Work / Job', 'word', 'Voy al trabajo todos los días.', 'I go to work every day.'),
    createContentItem('La escuela', '', 'The school', 'word', 'Los niños van a la escuela.', 'The children go to school.'),
    createContentItem('El tiempo', '', 'Time / Weather', 'word', '¿Qué hora es?', 'What time is it?'),
    createContentItem('Hoy', '', 'Today', 'word', 'Hoy es un buen día.', 'Today is a good day.'),
    createContentItem('Mañana', '', 'Tomorrow / Morning', 'word', 'Mañana tengo una reunión.', 'Tomorrow I have a meeting.'),
    createContentItem('Ayer', '', 'Yesterday', 'word', 'Ayer fui al parque.', 'Yesterday I went to the park.'),
    createContentItem('Dormir', '', 'To sleep', 'word', 'Necesito dormir más.', 'I need to sleep more.'),
    createContentItem('Comer', '', 'To eat', 'word', 'Vamos a comer juntos.', 'Let\'s eat together.'),
    createContentItem('Beber', '', 'To drink', 'word', 'Quiero beber agua.', 'I want to drink water.'),
    createContentItem('Caminar', '', 'To walk', 'word', 'Me gusta caminar por el parque.', 'I like to walk through the park.'),
    createContentItem('Leer', '', 'To read', 'word', 'Leo un libro cada semana.', 'I read a book every week.'),
    createContentItem('Escribir', '', 'To write', 'word', 'Necesito escribir una carta.', 'I need to write a letter.'),
    createContentItem('Me despierto a las siete.', '', 'I wake up at seven.', 'sentence', '', '', [
      { target: 'Me despierto', native: 'I wake up', korean: 'Me despierto', english: 'I wake up' },
      { target: 'a las siete', native: 'at seven', korean: 'a las siete', english: 'at seven' },
    ]),
    createContentItem('Desayuno con mi familia.', '', 'I have breakfast with my family.', 'sentence', '', '', [
      { target: 'Desayuno', native: 'I have breakfast', korean: 'Desayuno', english: 'I have breakfast' },
      { target: 'con', native: 'with', korean: 'con', english: 'with' },
      { target: 'mi familia', native: 'my family', korean: 'mi familia', english: 'my family' },
    ]),
    createContentItem('Voy al trabajo en autobús.', '', 'I go to work by bus.', 'sentence', '', '', [
      { target: 'Voy', native: 'I go', korean: 'Voy', english: 'I go' },
      { target: 'al trabajo', native: 'to work', korean: 'al trabajo', english: 'to work' },
      { target: 'en autobús', native: 'by bus', korean: 'en autobús', english: 'by bus' },
    ]),
    createContentItem('¿Qué hora es?', '', 'What time is it?', 'sentence', '', '', [
      { target: '¿Qué', native: 'What', korean: '¿Qué', english: 'What' },
      { target: 'hora', native: 'time / hour', korean: 'hora', english: 'time / hour' },
      { target: 'es?', native: 'is it?', korean: 'es?', english: 'is it?' },
    ]),
    createContentItem('Hace buen tiempo hoy.', '', 'The weather is nice today.', 'sentence', '', '', [
      { target: 'Hace', native: 'It makes / It is', korean: 'Hace', english: 'It makes / It is' },
      { target: 'buen tiempo', native: 'nice weather', korean: 'buen tiempo', english: 'nice weather' },
      { target: 'hoy', native: 'today', korean: 'hoy', english: 'today' },
    ]),
    createContentItem('Tengo que estudiar español.', '', 'I have to study Spanish.', 'sentence', '', '', [
      { target: 'Tengo que', native: 'I have to', korean: 'Tengo que', english: 'I have to' },
      { target: 'estudiar', native: 'study', korean: 'estudiar', english: 'study' },
      { target: 'español', native: 'Spanish', korean: 'español', english: 'Spanish' },
    ]),
    createContentItem('Me acuesto a las once.', '', 'I go to bed at eleven.', 'sentence', '', '', [
      { target: 'Me acuesto', native: 'I go to bed', korean: 'Me acuesto', english: 'I go to bed' },
      { target: 'a las once', native: 'at eleven', korean: 'a las once', english: 'at eleven' },
    ]),
    createContentItem('Los fines de semana descanso.', '', 'On weekends I rest.', 'sentence', '', '', [
      { target: 'Los fines de semana', native: 'On weekends', korean: 'Los fines de semana', english: 'On weekends' },
      { target: 'descanso', native: 'I rest', korean: 'descanso', english: 'I rest' },
    ]),
    createContentItem('Me gusta escuchar música.', '', 'I like to listen to music.', 'sentence', '', '', [
      { target: 'Me gusta', native: 'I like', korean: 'Me gusta', english: 'I like' },
      { target: 'escuchar', native: 'to listen to', korean: 'escuchar', english: 'to listen to' },
      { target: 'música', native: 'music', korean: 'música', english: 'music' },
    ]),
    createContentItem('Limpio la casa los sábados.', '', 'I clean the house on Saturdays.', 'sentence', '', '', [
      { target: 'Limpio', native: 'I clean', korean: 'Limpio', english: 'I clean' },
      { target: 'la casa', native: 'the house', korean: 'la casa', english: 'the house' },
      { target: 'los sábados', native: 'on Saturdays', korean: 'los sábados', english: 'on Saturdays' },
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
  targetLang: 'es',
  content: [
    createContentItem('El desayuno', '', 'Breakfast', 'word', 'El desayuno es a las ocho.', 'Breakfast is at eight.'),
    createContentItem('El almuerzo', '', 'Lunch', 'word', '¿Quieres almorzar conmigo?', 'Do you want to have lunch with me?'),
    createContentItem('La cena', '', 'Dinner', 'word', 'La cena está lista.', 'Dinner is ready.'),
    createContentItem('El agua', '', 'Water', 'word', 'Un vaso de agua, por favor.', 'A glass of water, please.'),
    createContentItem('El pan', '', 'Bread', 'word', 'El pan está fresco.', 'The bread is fresh.'),
    createContentItem('La carne', '', 'Meat', 'word', 'No como carne.', 'I don\'t eat meat.'),
    createContentItem('El pollo', '', 'Chicken', 'word', 'El pollo asado es delicioso.', 'The roasted chicken is delicious.'),
    createContentItem('El pescado', '', 'Fish', 'word', 'Me gusta el pescado fresco.', 'I like fresh fish.'),
    createContentItem('El arroz', '', 'Rice', 'word', 'El arroz con frijoles es típico.', 'Rice and beans is typical.'),
    createContentItem('Las frutas', '', 'Fruits', 'word', 'Las frutas son saludables.', 'Fruits are healthy.'),
    createContentItem('Las verduras', '', 'Vegetables', 'word', 'Como muchas verduras.', 'I eat a lot of vegetables.'),
    createContentItem('El café', '', 'Coffee', 'word', 'Un café con leche, por favor.', 'A coffee with milk, please.'),
    createContentItem('La leche', '', 'Milk', 'word', '¿Quieres leche en tu café?', 'Do you want milk in your coffee?'),
    createContentItem('El queso', '', 'Cheese', 'word', 'Este queso es muy bueno.', 'This cheese is very good.'),
    createContentItem('La sopa', '', 'Soup', 'word', 'La sopa de tomate está caliente.', 'The tomato soup is hot.'),
    createContentItem('¿Tiene usted una mesa para dos?', '', 'Do you have a table for two?', 'sentence', '', '', [
      { target: '¿Tiene usted', native: 'Do you have', korean: '¿Tiene usted', english: 'Do you have' },
      { target: 'una mesa', native: 'a table', korean: 'una mesa', english: 'a table' },
      { target: 'para dos?', native: 'for two?', korean: 'para dos?', english: 'for two?' },
    ]),
    createContentItem('Quisiera ver el menú, por favor.', '', 'I would like to see the menu, please.', 'sentence', '', '', [
      { target: 'Quisiera', native: 'I would like', korean: 'Quisiera', english: 'I would like' },
      { target: 'ver', native: 'to see', korean: 'ver', english: 'to see' },
      { target: 'el menú', native: 'the menu', korean: 'el menú', english: 'the menu' },
      { target: 'por favor', native: 'please', korean: 'por favor', english: 'please' },
    ]),
    createContentItem('¿Qué me recomienda?', '', 'What do you recommend?', 'sentence', '', '', [
      { target: '¿Qué', native: 'What', korean: '¿Qué', english: 'What' },
      { target: 'me recomienda?', native: 'do you recommend to me?', korean: 'me recomienda?', english: 'do you recommend to me?' },
    ]),
    createContentItem('Soy alérgico al maní.', '', 'I am allergic to peanuts.', 'sentence', '', '', [
      { target: 'Soy', native: 'I am', korean: 'Soy', english: 'I am' },
      { target: 'alérgico', native: 'allergic', korean: 'alérgico', english: 'allergic' },
      { target: 'al maní', native: 'to peanuts', korean: 'al maní', english: 'to peanuts' },
    ]),
    createContentItem('La cuenta, por favor.', '', 'The check, please.', 'sentence', '', '', [
      { target: 'La cuenta', native: 'The check / bill', korean: 'La cuenta', english: 'The check / bill' },
      { target: 'por favor', native: 'please', korean: 'por favor', english: 'please' },
    ]),
    createContentItem('Está delicioso.', '', 'It\'s delicious.', 'sentence', 'La comida está deliciosa.', 'The food is delicious.', [
      { target: 'Está', native: 'It is', korean: 'Está', english: 'It is' },
      { target: 'delicioso', native: 'delicious', korean: 'delicioso', english: 'delicious' },
    ]),
    createContentItem('Quiero pedir una ensalada.', '', 'I want to order a salad.', 'sentence', '', '', [
      { target: 'Quiero', native: 'I want', korean: 'Quiero', english: 'I want' },
      { target: 'pedir', native: 'to order', korean: 'pedir', english: 'to order' },
      { target: 'una ensalada', native: 'a salad', korean: 'una ensalada', english: 'a salad' },
    ]),
    createContentItem('¿Puedo tener más agua?', '', 'Can I have more water?', 'sentence', '', '', [
      { target: '¿Puedo', native: 'Can I', korean: '¿Puedo', english: 'Can I' },
      { target: 'tener', native: 'have', korean: 'tener', english: 'have' },
      { target: 'más agua?', native: 'more water?', korean: 'más agua?', english: 'more water?' },
    ]),
    createContentItem('No como carne, soy vegetariano.', '', 'I don\'t eat meat, I\'m vegetarian.', 'sentence', '', '', [
      { target: 'No como', native: 'I don\'t eat', korean: 'No como', english: 'I don\'t eat' },
      { target: 'carne', native: 'meat', korean: 'carne', english: 'meat' },
      { target: 'soy vegetariano', native: 'I\'m vegetarian', korean: 'soy vegetariano', english: 'I\'m vegetarian' },
    ]),
    createContentItem('¿Está incluida la propina?', '', 'Is the tip included?', 'sentence', '', '', [
      { target: '¿Está incluida', native: 'Is included', korean: '¿Está incluida', english: 'Is included' },
      { target: 'la propina?', native: 'the tip?', korean: 'la propina?', english: 'the tip?' },
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
  targetLang: 'es',
  content: [
    createContentItem('El aeropuerto', '', 'The airport', 'word', 'Vamos al aeropuerto.', 'Let\'s go to the airport.'),
    createContentItem('El hotel', '', 'The hotel', 'word', 'Reservé un hotel cerca de la playa.', 'I booked a hotel near the beach.'),
    createContentItem('El tren', '', 'The train', 'word', 'El tren sale a las tres.', 'The train leaves at three.'),
    createContentItem('El autobús', '', 'The bus', 'word', 'Tomo el autobús al centro.', 'I take the bus downtown.'),
    createContentItem('El taxi', '', 'The taxi', 'word', 'Necesito un taxi, por favor.', 'I need a taxi, please.'),
    createContentItem('El boleto', '', 'The ticket', 'word', '¿Dónde compro el boleto?', 'Where do I buy the ticket?'),
    createContentItem('El pasaporte', '', 'The passport', 'word', 'No olvides tu pasaporte.', 'Don\'t forget your passport.'),
    createContentItem('La maleta', '', 'The suitcase', 'word', 'Mi maleta es azul.', 'My suitcase is blue.'),
    createContentItem('El mapa', '', 'The map', 'word', '¿Tienes un mapa de la ciudad?', 'Do you have a map of the city?'),
    createContentItem('La playa', '', 'The beach', 'word', 'La playa es muy bonita.', 'The beach is very beautiful.'),
    createContentItem('El museo', '', 'The museum', 'word', 'El museo abre a las diez.', 'The museum opens at ten.'),
    createContentItem('La estación', '', 'The station', 'word', 'La estación de tren está lejos.', 'The train station is far away.'),
    createContentItem('¿Dónde está el baño?', '', 'Where is the bathroom?', 'sentence', '', '', [
      { target: '¿Dónde', native: 'Where', korean: '¿Dónde', english: 'Where' },
      { target: 'está', native: 'is', korean: 'está', english: 'is' },
      { target: 'el baño?', native: 'the bathroom?', korean: 'el baño?', english: 'the bathroom?' },
    ]),
    createContentItem('¿Cómo llego al centro?', '', 'How do I get downtown?', 'sentence', '', '', [
      { target: '¿Cómo', native: 'How', korean: '¿Cómo', english: 'How' },
      { target: 'llego', native: 'do I get / arrive', korean: 'llego', english: 'do I get / arrive' },
      { target: 'al centro?', native: 'downtown?', korean: 'al centro?', english: 'downtown?' },
    ]),
    createContentItem('Quisiera reservar una habitación.', '', 'I would like to book a room.', 'sentence', '', '', [
      { target: 'Quisiera', native: 'I would like', korean: 'Quisiera', english: 'I would like' },
      { target: 'reservar', native: 'to book / reserve', korean: 'reservar', english: 'to book / reserve' },
      { target: 'una habitación', native: 'a room', korean: 'una habitación', english: 'a room' },
    ]),
    createContentItem('¿Cuánto cuesta el boleto?', '', 'How much does the ticket cost?', 'sentence', '', '', [
      { target: '¿Cuánto', native: 'How much', korean: '¿Cuánto', english: 'How much' },
      { target: 'cuesta', native: 'does it cost', korean: 'cuesta', english: 'does it cost' },
      { target: 'el boleto?', native: 'the ticket?', korean: 'el boleto?', english: 'the ticket?' },
    ]),
    createContentItem('¿A qué hora sale el vuelo?', '', 'What time does the flight leave?', 'sentence', '', '', [
      { target: '¿A qué hora', native: 'At what time', korean: '¿A qué hora', english: 'At what time' },
      { target: 'sale', native: 'does it leave', korean: 'sale', english: 'does it leave' },
      { target: 'el vuelo?', native: 'the flight?', korean: 'el vuelo?', english: 'the flight?' },
    ]),
    createContentItem('Estoy perdido.', '', 'I am lost.', 'sentence', '¿Puede ayudarme? Estoy perdido.', 'Can you help me? I am lost.', [
      { target: 'Estoy', native: 'I am', korean: 'Estoy', english: 'I am' },
      { target: 'perdido', native: 'lost', korean: 'perdido', english: 'lost' },
    ]),
    createContentItem('¿Puede hablar más despacio?', '', 'Can you speak more slowly?', 'sentence', '', '', [
      { target: '¿Puede', native: 'Can you', korean: '¿Puede', english: 'Can you' },
      { target: 'hablar', native: 'speak', korean: 'hablar', english: 'speak' },
      { target: 'más despacio?', native: 'more slowly?', korean: 'más despacio?', english: 'more slowly?' },
    ]),
    createContentItem('Necesito un mapa.', '', 'I need a map.', 'sentence', '', '', [
      { target: 'Necesito', native: 'I need', korean: 'Necesito', english: 'I need' },
      { target: 'un mapa', native: 'a map', korean: 'un mapa', english: 'a map' },
    ]),
    createContentItem('¿Hay wifi aquí?', '', 'Is there wifi here?', 'sentence', '', '', [
      { target: '¿Hay', native: 'Is there', korean: '¿Hay', english: 'Is there' },
      { target: 'wifi', native: 'wifi', korean: 'wifi', english: 'wifi' },
      { target: 'aquí?', native: 'here?', korean: 'aquí?', english: 'here?' },
    ]),
    createContentItem('Me gustaría visitar el museo.', '', 'I would like to visit the museum.', 'sentence', '', '', [
      { target: 'Me gustaría', native: 'I would like', korean: 'Me gustaría', english: 'I would like' },
      { target: 'visitar', native: 'to visit', korean: 'visitar', english: 'to visit' },
      { target: 'el museo', native: 'the museum', korean: 'el museo', english: 'the museum' },
    ]),
    createContentItem('¿Dónde puedo cambiar dinero?', '', 'Where can I exchange money?', 'sentence', '', '', [
      { target: '¿Dónde', native: 'Where', korean: '¿Dónde', english: 'Where' },
      { target: 'puedo', native: 'can I', korean: 'puedo', english: 'can I' },
      { target: 'cambiar dinero?', native: 'exchange money?', korean: 'cambiar dinero?', english: 'exchange money?' },
    ]),
  ],
};

// ============================================================
// SHOPPING - Shopping & Purchases
// ============================================================
const shopping = {
  title: 'Shopping & Purchases',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'es',
  content: [
    createContentItem('La tienda', '', 'The store', 'word', 'La tienda cierra a las nueve.', 'The store closes at nine.'),
    createContentItem('El mercado', '', 'The market', 'word', 'Voy al mercado los domingos.', 'I go to the market on Sundays.'),
    createContentItem('El precio', '', 'The price', 'word', '¿Cuál es el precio?', 'What is the price?'),
    createContentItem('El dinero', '', 'Money', 'word', 'No tengo suficiente dinero.', 'I don\'t have enough money.'),
    createContentItem('La tarjeta', '', 'The card', 'word', '¿Aceptan tarjeta de crédito?', 'Do you accept credit card?'),
    createContentItem('Barato', '', 'Cheap', 'word', 'Este es más barato.', 'This one is cheaper.'),
    createContentItem('Caro', '', 'Expensive', 'word', 'Es demasiado caro.', 'It\'s too expensive.'),
    createContentItem('La ropa', '', 'Clothing', 'word', 'Necesito comprar ropa nueva.', 'I need to buy new clothes.'),
    createContentItem('Los zapatos', '', 'Shoes', 'word', 'Estos zapatos son cómodos.', 'These shoes are comfortable.'),
    createContentItem('La talla', '', 'Size', 'word', '¿Qué talla usas?', 'What size do you wear?'),
    createContentItem('El regalo', '', 'Gift', 'word', 'Busco un regalo para mi madre.', 'I\'m looking for a gift for my mother.'),
    createContentItem('El recibo', '', 'Receipt', 'word', '¿Me da el recibo, por favor?', 'Can you give me the receipt, please?'),
    createContentItem('La oferta', '', 'Sale / Offer', 'word', 'Hay una oferta especial hoy.', 'There is a special offer today.'),
    createContentItem('¿Cuánto cuesta esto?', '', 'How much does this cost?', 'sentence', '', '', [
      { target: '¿Cuánto', native: 'How much', korean: '¿Cuánto', english: 'How much' },
      { target: 'cuesta', native: 'does it cost', korean: 'cuesta', english: 'does it cost' },
      { target: 'esto?', native: 'this?', korean: 'esto?', english: 'this?' },
    ]),
    createContentItem('¿Tienen algo más barato?', '', 'Do you have something cheaper?', 'sentence', '', '', [
      { target: '¿Tienen', native: 'Do you have', korean: '¿Tienen', english: 'Do you have' },
      { target: 'algo', native: 'something', korean: 'algo', english: 'something' },
      { target: 'más barato?', native: 'cheaper?', korean: 'más barato?', english: 'cheaper?' },
    ]),
    createContentItem('¿Puedo probármelo?', '', 'Can I try it on?', 'sentence', '', '', [
      { target: '¿Puedo', native: 'Can I', korean: '¿Puedo', english: 'Can I' },
      { target: 'probármelo?', native: 'try it on?', korean: 'probármelo?', english: 'try it on?' },
    ]),
    createContentItem('¿Tienen una talla más grande?', '', 'Do you have a bigger size?', 'sentence', '', '', [
      { target: '¿Tienen', native: 'Do you have', korean: '¿Tienen', english: 'Do you have' },
      { target: 'una talla', native: 'a size', korean: 'una talla', english: 'a size' },
      { target: 'más grande?', native: 'bigger?', korean: 'más grande?', english: 'bigger?' },
    ]),
    createContentItem('Me lo llevo.', '', 'I\'ll take it.', 'sentence', '', '', [
      { target: 'Me', native: 'To me', korean: 'Me', english: 'To me' },
      { target: 'lo llevo', native: 'I\'ll take it', korean: 'lo llevo', english: 'I\'ll take it' },
    ]),
    createContentItem('¿Aceptan tarjeta de crédito?', '', 'Do you accept credit cards?', 'sentence', '', '', [
      { target: '¿Aceptan', native: 'Do you accept', korean: '¿Aceptan', english: 'Do you accept' },
      { target: 'tarjeta de crédito?', native: 'credit card?', korean: 'tarjeta de crédito?', english: 'credit card?' },
    ]),
    createContentItem('Solo estoy mirando, gracias.', '', 'I\'m just looking, thanks.', 'sentence', '', '', [
      { target: 'Solo', native: 'Just / Only', korean: 'Solo', english: 'Just / Only' },
      { target: 'estoy mirando', native: 'I\'m looking', korean: 'estoy mirando', english: 'I\'m looking' },
      { target: 'gracias', native: 'thanks', korean: 'gracias', english: 'thanks' },
    ]),
    createContentItem('¿Dónde están los probadores?', '', 'Where are the fitting rooms?', 'sentence', '', '', [
      { target: '¿Dónde están', native: 'Where are', korean: '¿Dónde están', english: 'Where are' },
      { target: 'los probadores?', native: 'the fitting rooms?', korean: 'los probadores?', english: 'the fitting rooms?' },
    ]),
    createContentItem('¿Tiene descuento?', '', 'Is there a discount?', 'sentence', '', '', [
      { target: '¿Tiene', native: 'Is there / Do you have', korean: '¿Tiene', english: 'Is there / Do you have' },
      { target: 'descuento?', native: 'a discount?', korean: 'descuento?', english: 'a discount?' },
    ]),
    createContentItem('¿Puedo pagar en efectivo?', '', 'Can I pay in cash?', 'sentence', '', '', [
      { target: '¿Puedo', native: 'Can I', korean: '¿Puedo', english: 'Can I' },
      { target: 'pagar', native: 'pay', korean: 'pagar', english: 'pay' },
      { target: 'en efectivo?', native: 'in cash?', korean: 'en efectivo?', english: 'in cash?' },
    ]),
    createContentItem('Quisiera devolver esto.', '', 'I would like to return this.', 'sentence', '', '', [
      { target: 'Quisiera', native: 'I would like', korean: 'Quisiera', english: 'I would like' },
      { target: 'devolver', native: 'to return', korean: 'devolver', english: 'to return' },
      { target: 'esto', native: 'this', korean: 'esto', english: 'this' },
    ]),
  ],
};

// ============================================================
// BUSINESS - Business & Work
// ============================================================
const business = {
  title: 'Business & Work',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'es',
  content: [
    createContentItem('La oficina', '', 'The office', 'word', 'Trabajo en una oficina grande.', 'I work in a big office.'),
    createContentItem('La reunión', '', 'The meeting', 'word', 'Tengo una reunión a las diez.', 'I have a meeting at ten.'),
    createContentItem('El jefe', '', 'The boss', 'word', 'Mi jefe es muy amable.', 'My boss is very kind.'),
    createContentItem('El compañero', '', 'The colleague', 'word', 'Mi compañero de trabajo me ayudó.', 'My work colleague helped me.'),
    createContentItem('El correo electrónico', '', 'Email', 'word', 'Te envío un correo electrónico.', 'I\'ll send you an email.'),
    createContentItem('El teléfono', '', 'The telephone', 'word', '¿Cuál es su número de teléfono?', 'What is your phone number?'),
    createContentItem('La empresa', '', 'The company', 'word', 'Esta empresa es muy grande.', 'This company is very large.'),
    createContentItem('El contrato', '', 'The contract', 'word', 'Firmé el contrato ayer.', 'I signed the contract yesterday.'),
    createContentItem('El horario', '', 'The schedule', 'word', 'Mi horario es de nueve a cinco.', 'My schedule is from nine to five.'),
    createContentItem('El sueldo', '', 'The salary', 'word', 'El sueldo es bueno.', 'The salary is good.'),
    createContentItem('La entrevista', '', 'The interview', 'word', 'Tengo una entrevista de trabajo.', 'I have a job interview.'),
    createContentItem('El proyecto', '', 'The project', 'word', 'Estamos trabajando en un nuevo proyecto.', 'We are working on a new project.'),
    createContentItem('Tengo una cita a las tres.', '', 'I have an appointment at three.', 'sentence', '', '', [
      { target: 'Tengo', native: 'I have', korean: 'Tengo', english: 'I have' },
      { target: 'una cita', native: 'an appointment', korean: 'una cita', english: 'an appointment' },
      { target: 'a las tres', native: 'at three', korean: 'a las tres', english: 'at three' },
    ]),
    createContentItem('¿Podemos programar una reunión?', '', 'Can we schedule a meeting?', 'sentence', '', '', [
      { target: '¿Podemos', native: 'Can we', korean: '¿Podemos', english: 'Can we' },
      { target: 'programar', native: 'schedule', korean: 'programar', english: 'schedule' },
      { target: 'una reunión?', native: 'a meeting?', korean: 'una reunión?', english: 'a meeting?' },
    ]),
    createContentItem('Encantado de conocerle.', '', 'Pleased to meet you. (formal)', 'sentence', '', '', [
      { target: 'Encantado', native: 'Pleased / Delighted', korean: 'Encantado', english: 'Pleased / Delighted' },
      { target: 'de conocerle', native: 'to meet you', korean: 'de conocerle', english: 'to meet you' },
    ]),
    createContentItem('Le presento a mi colega.', '', 'Let me introduce you to my colleague.', 'sentence', '', '', [
      { target: 'Le presento', native: 'I introduce to you', korean: 'Le presento', english: 'I introduce to you' },
      { target: 'a mi colega', native: 'my colleague', korean: 'a mi colega', english: 'my colleague' },
    ]),
    createContentItem('¿Cuál es su correo electrónico?', '', 'What is your email address?', 'sentence', '', '', [
      { target: '¿Cuál es', native: 'What is', korean: '¿Cuál es', english: 'What is' },
      { target: 'su correo electrónico?', native: 'your email?', korean: 'su correo electrónico?', english: 'your email?' },
    ]),
    createContentItem('Necesito terminar este informe.', '', 'I need to finish this report.', 'sentence', '', '', [
      { target: 'Necesito', native: 'I need', korean: 'Necesito', english: 'I need' },
      { target: 'terminar', native: 'to finish', korean: 'terminar', english: 'to finish' },
      { target: 'este informe', native: 'this report', korean: 'este informe', english: 'this report' },
    ]),
    createContentItem('La fecha límite es el viernes.', '', 'The deadline is Friday.', 'sentence', '', '', [
      { target: 'La fecha límite', native: 'The deadline', korean: 'La fecha límite', english: 'The deadline' },
      { target: 'es', native: 'is', korean: 'es', english: 'is' },
      { target: 'el viernes', native: 'Friday', korean: 'el viernes', english: 'Friday' },
    ]),
    createContentItem('Estoy buscando trabajo.', '', 'I am looking for a job.', 'sentence', '', '', [
      { target: 'Estoy buscando', native: 'I am looking for', korean: 'Estoy buscando', english: 'I am looking for' },
      { target: 'trabajo', native: 'work / a job', korean: 'trabajo', english: 'work / a job' },
    ]),
    createContentItem('¿A qué se dedica usted?', '', 'What do you do for a living?', 'sentence', '', '', [
      { target: '¿A qué', native: 'To what / What', korean: '¿A qué', english: 'To what / What' },
      { target: 'se dedica', native: 'do you dedicate yourself', korean: 'se dedica', english: 'do you dedicate yourself' },
      { target: 'usted?', native: 'you? (formal)', korean: 'usted?', english: 'you? (formal)' },
    ]),
    createContentItem('Trabajo en una empresa de tecnología.', '', 'I work at a technology company.', 'sentence', '', '', [
      { target: 'Trabajo', native: 'I work', korean: 'Trabajo', english: 'I work' },
      { target: 'en una empresa', native: 'at a company', korean: 'en una empresa', english: 'at a company' },
      { target: 'de tecnología', native: 'of technology', korean: 'de tecnología', english: 'of technology' },
    ]),
    createContentItem('Aquí tiene mi tarjeta de presentación.', '', 'Here is my business card.', 'sentence', '', '', [
      { target: 'Aquí tiene', native: 'Here is / Here you go', korean: 'Aquí tiene', english: 'Here is / Here you go' },
      { target: 'mi tarjeta', native: 'my card', korean: 'mi tarjeta', english: 'my card' },
      { target: 'de presentación', native: 'business (literally: of introduction)', korean: 'de presentación', english: 'business (literally: of introduction)' },
    ]),
  ],
};

// ============================================================
// HEALTHCARE - Health & Medical
// ============================================================
const healthcare = {
  title: 'Health & Medical',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'es',
  content: [
    createContentItem('El hospital', '', 'The hospital', 'word', 'El hospital está cerca.', 'The hospital is nearby.'),
    createContentItem('El médico', '', 'The doctor', 'word', 'Necesito ver a un médico.', 'I need to see a doctor.'),
    createContentItem('La farmacia', '', 'The pharmacy', 'word', '¿Hay una farmacia cerca?', 'Is there a pharmacy nearby?'),
    createContentItem('La medicina', '', 'Medicine', 'word', 'Tomo la medicina tres veces al día.', 'I take the medicine three times a day.'),
    createContentItem('El dolor', '', 'Pain', 'word', 'Tengo mucho dolor.', 'I am in a lot of pain.'),
    createContentItem('La fiebre', '', 'Fever', 'word', 'Tengo fiebre alta.', 'I have a high fever.'),
    createContentItem('La tos', '', 'Cough', 'word', 'Tengo tos desde ayer.', 'I\'ve had a cough since yesterday.'),
    createContentItem('El resfriado', '', 'Cold (illness)', 'word', 'Tengo un resfriado fuerte.', 'I have a bad cold.'),
    createContentItem('La cabeza', '', 'Head', 'word', 'Me duele la cabeza.', 'My head hurts.'),
    createContentItem('El estómago', '', 'Stomach', 'word', 'Me duele el estómago.', 'My stomach hurts.'),
    createContentItem('La alergia', '', 'Allergy', 'word', 'Tengo alergia al polvo.', 'I am allergic to dust.'),
    createContentItem('La cita médica', '', 'Medical appointment', 'word', 'Tengo una cita médica mañana.', 'I have a medical appointment tomorrow.'),
    createContentItem('La receta', '', 'Prescription', 'word', 'El médico me dio una receta.', 'The doctor gave me a prescription.'),
    createContentItem('No me siento bien.', '', 'I don\'t feel well.', 'sentence', '', '', [
      { target: 'No', native: 'Not', korean: 'No', english: 'Not' },
      { target: 'me siento', native: 'I feel', korean: 'me siento', english: 'I feel' },
      { target: 'bien', native: 'well', korean: 'bien', english: 'well' },
    ]),
    createContentItem('Me duele la garganta.', '', 'My throat hurts.', 'sentence', '', '', [
      { target: 'Me duele', native: 'It hurts me / My ... hurts', korean: 'Me duele', english: 'It hurts me / My ... hurts' },
      { target: 'la garganta', native: 'the throat', korean: 'la garganta', english: 'the throat' },
    ]),
    createContentItem('Necesito una ambulancia.', '', 'I need an ambulance.', 'sentence', '', '', [
      { target: 'Necesito', native: 'I need', korean: 'Necesito', english: 'I need' },
      { target: 'una ambulancia', native: 'an ambulance', korean: 'una ambulancia', english: 'an ambulance' },
    ]),
    createContentItem('¿Dónde está la farmacia más cercana?', '', 'Where is the nearest pharmacy?', 'sentence', '', '', [
      { target: '¿Dónde está', native: 'Where is', korean: '¿Dónde está', english: 'Where is' },
      { target: 'la farmacia', native: 'the pharmacy', korean: 'la farmacia', english: 'the pharmacy' },
      { target: 'más cercana?', native: 'nearest?', korean: 'más cercana?', english: 'nearest?' },
    ]),
    createContentItem('Soy alérgico a la penicilina.', '', 'I am allergic to penicillin.', 'sentence', '', '', [
      { target: 'Soy alérgico', native: 'I am allergic', korean: 'Soy alérgico', english: 'I am allergic' },
      { target: 'a la penicilina', native: 'to penicillin', korean: 'a la penicilina', english: 'to penicillin' },
    ]),
    createContentItem('¿Tiene algo para el dolor de cabeza?', '', 'Do you have something for a headache?', 'sentence', '', '', [
      { target: '¿Tiene', native: 'Do you have', korean: '¿Tiene', english: 'Do you have' },
      { target: 'algo', native: 'something', korean: 'algo', english: 'something' },
      { target: 'para el dolor de cabeza?', native: 'for a headache?', korean: 'para el dolor de cabeza?', english: 'for a headache?' },
    ]),
    createContentItem('Necesito ver a un dentista.', '', 'I need to see a dentist.', 'sentence', '', '', [
      { target: 'Necesito', native: 'I need', korean: 'Necesito', english: 'I need' },
      { target: 'ver', native: 'to see', korean: 'ver', english: 'to see' },
      { target: 'a un dentista', native: 'a dentist', korean: 'a un dentista', english: 'a dentist' },
    ]),
    createContentItem('¿Con qué frecuencia debo tomar la medicina?', '', 'How often should I take the medicine?', 'sentence', '', '', [
      { target: '¿Con qué frecuencia', native: 'How often', korean: '¿Con qué frecuencia', english: 'How often' },
      { target: 'debo tomar', native: 'should I take', korean: 'debo tomar', english: 'should I take' },
      { target: 'la medicina?', native: 'the medicine?', korean: 'la medicina?', english: 'the medicine?' },
    ]),
    createContentItem('Tengo seguro médico.', '', 'I have health insurance.', 'sentence', '', '', [
      { target: 'Tengo', native: 'I have', korean: 'Tengo', english: 'I have' },
      { target: 'seguro médico', native: 'health insurance', korean: 'seguro médico', english: 'health insurance' },
    ]),
    createContentItem('Es una emergencia.', '', 'It\'s an emergency.', 'sentence', '', '', [
      { target: 'Es', native: 'It is', korean: 'Es', english: 'It is' },
      { target: 'una emergencia', native: 'an emergency', korean: 'una emergencia', english: 'an emergency' },
    ]),
    createContentItem('Me torcí el tobillo.', '', 'I twisted my ankle.', 'sentence', '', '', [
      { target: 'Me torcí', native: 'I twisted', korean: 'Me torcí', english: 'I twisted' },
      { target: 'el tobillo', native: 'the ankle', korean: 'el tobillo', english: 'the ankle' },
    ]),
    createContentItem('¿Cuándo puedo recoger la receta?', '', 'When can I pick up the prescription?', 'sentence', '', '', [
      { target: '¿Cuándo', native: 'When', korean: '¿Cuándo', english: 'When' },
      { target: 'puedo recoger', native: 'can I pick up', korean: 'puedo recoger', english: 'can I pick up' },
      { target: 'la receta?', native: 'the prescription?', korean: 'la receta?', english: 'the prescription?' },
    ]),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
