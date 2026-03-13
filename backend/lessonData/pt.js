// Portuguese (Brazilian) - Beginner Lessons
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
// GREETINGS - BEGINNER
// ==========================================
const greetings = {
  title: 'Basic Greetings & Introductions',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'pt',
  content: [
    // Basic greetings
    createContentItem('Olá', '', 'Hello', 'word', 'Olá, como vai você?', 'Hello, how are you?'),
    createContentItem('Oi', '', 'Hi', 'word', 'Oi, tudo bem?', 'Hi, how are you?'),
    createContentItem('Bom dia', '', 'Good morning', 'sentence', 'Bom dia, como você está?', 'Good morning, how are you?', [{ korean: 'Bom', english: 'good' }, { korean: 'dia', english: 'day/morning' }]),
    createContentItem('Boa tarde', '', 'Good afternoon', 'sentence', 'Boa tarde, posso ajudar?', 'Good afternoon, can I help?', [{ korean: 'Boa', english: 'good' }, { korean: 'tarde', english: 'afternoon' }]),
    createContentItem('Boa noite', '', 'Good evening / Good night', 'sentence', 'Boa noite, durma bem', 'Good night, sleep well', [{ korean: 'Boa', english: 'good' }, { korean: 'noite', english: 'night/evening' }]),

    // Farewells
    createContentItem('Tchau', '', 'Bye', 'word', 'Tchau, até amanhã!', 'Bye, see you tomorrow!'),
    createContentItem('Até logo', '', 'See you soon', 'sentence', 'Até logo, foi bom te ver', 'See you soon, it was good seeing you', [{ korean: 'Até', english: 'until' }, { korean: 'logo', english: 'soon' }]),
    createContentItem('Até amanhã', '', 'See you tomorrow', 'sentence', 'Até amanhã, boa noite', 'See you tomorrow, good night', [{ korean: 'Até', english: 'until' }, { korean: 'amanhã', english: 'tomorrow' }]),
    createContentItem('Até mais', '', 'See you later', 'sentence', 'Até mais, pessoal!', 'See you later, everyone!', [{ korean: 'Até', english: 'until' }, { korean: 'mais', english: 'more/later' }]),
    createContentItem('Adeus', '', 'Goodbye (formal)', 'word', 'Adeus, boa viagem', 'Goodbye, have a good trip'),

    // Thanking
    createContentItem('Obrigado', '', 'Thank you (said by male)', 'word', 'Muito obrigado pela ajuda', 'Thank you very much for the help'),
    createContentItem('Obrigada', '', 'Thank you (said by female)', 'word', 'Muito obrigada!', 'Thank you very much!'),
    createContentItem('De nada', '', 'You\'re welcome', 'sentence', 'De nada, foi um prazer', 'You\'re welcome, it was a pleasure', [{ korean: 'De', english: 'of' }, { korean: 'nada', english: 'nothing' }]),
    createContentItem('Por nada', '', 'Don\'t mention it', 'sentence', 'Por nada, sempre que precisar', 'Don\'t mention it, whenever you need', [{ korean: 'Por', english: 'for' }, { korean: 'nada', english: 'nothing' }]),
    createContentItem('Valeu', '', 'Thanks (slang)', 'word', 'Valeu, cara!', 'Thanks, dude!'),

    // Apologizing
    createContentItem('Desculpa', '', 'Sorry', 'word', 'Desculpa, eu não sabia', 'Sorry, I didn\'t know'),
    createContentItem('Desculpe', '', 'Excuse me / Sorry (formal)', 'word', 'Desculpe o atraso', 'Sorry for the delay'),
    createContentItem('Com licença', '', 'Excuse me (to pass)', 'sentence', 'Com licença, posso passar?', 'Excuse me, may I pass?', [{ korean: 'Com', english: 'with' }, { korean: 'licença', english: 'permission' }]),
    createContentItem('Me perdoe', '', 'Forgive me', 'sentence', 'Me perdoe pelo erro', 'Forgive me for the mistake', [{ korean: 'Me', english: 'me' }, { korean: 'perdoe', english: 'forgive' }]),

    // Introductions
    createContentItem('Meu nome é', '', 'My name is', 'sentence', 'Meu nome é João', 'My name is João', [{ korean: 'Meu', english: 'my' }, { korean: 'nome', english: 'name' }, { korean: 'é', english: 'is' }]),
    createContentItem('Prazer em conhecer', '', 'Nice to meet you', 'sentence', 'Prazer em conhecer você', 'Nice to meet you', [{ korean: 'Prazer', english: 'pleasure' }, { korean: 'em', english: 'in' }, { korean: 'conhecer', english: 'to meet/know' }]),
    createContentItem('Como você se chama?', '', 'What is your name?', 'sentence', 'Como você se chama?', 'What is your name?', [{ korean: 'Como', english: 'how/what' }, { korean: 'você', english: 'you' }, { korean: 'se chama', english: 'are called' }]),
    createContentItem('Eu sou', '', 'I am', 'sentence', 'Eu sou brasileiro', 'I am Brazilian', [{ korean: 'Eu', english: 'I' }, { korean: 'sou', english: 'am' }]),
    createContentItem('Tudo bem?', '', 'How are you? / All good?', 'sentence', 'Oi, tudo bem?', 'Hi, how are you?', [{ korean: 'Tudo', english: 'everything' }, { korean: 'bem', english: 'well/good' }]),
    createContentItem('Tudo bem', '', 'I\'m fine / All good', 'sentence', 'Tudo bem, e você?', 'I\'m fine, and you?', [{ korean: 'Tudo', english: 'everything' }, { korean: 'bem', english: 'well/good' }]),
    createContentItem('Como vai?', '', 'How are you? (casual)', 'sentence', 'E aí, como vai?', 'Hey, how are you?', [{ korean: 'Como', english: 'how' }, { korean: 'vai', english: 'goes' }]),

    // Basic courtesy
    createContentItem('Por favor', '', 'Please', 'word', 'Por favor, me ajude', 'Please help me'),
    createContentItem('Sim', '', 'Yes', 'word', 'Sim, com certeza', 'Yes, of course'),
    createContentItem('Não', '', 'No', 'word', 'Não, obrigado', 'No, thank you'),
    createContentItem('Talvez', '', 'Maybe', 'word', 'Talvez amanhã', 'Maybe tomorrow'),
  ],
};

// ==========================================
// DAILY LIFE - BEGINNER
// ==========================================
const dailyLife = {
  title: 'Everyday Life & Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'pt',
  content: [
    // Time & schedule
    createContentItem('Que horas são?', '', 'What time is it?', 'sentence', 'Que horas são agora?', 'What time is it now?', [{ korean: 'Que', english: 'what' }, { korean: 'horas', english: 'hours/time' }, { korean: 'são', english: 'are' }]),
    createContentItem('Hoje', '', 'Today', 'word', 'Hoje é segunda-feira', 'Today is Monday'),
    createContentItem('Amanhã', '', 'Tomorrow', 'word', 'Amanhã eu trabalho', 'Tomorrow I work'),
    createContentItem('Ontem', '', 'Yesterday', 'word', 'Ontem choveu muito', 'Yesterday it rained a lot'),
    createContentItem('Agora', '', 'Now', 'word', 'Eu estou ocupado agora', 'I am busy now'),
    createContentItem('Sempre', '', 'Always', 'word', 'Eu sempre acordo cedo', 'I always wake up early'),

    // Daily activities
    createContentItem('Acordar', '', 'To wake up', 'word', 'Eu acordo às seis horas', 'I wake up at six o\'clock'),
    createContentItem('Dormir', '', 'To sleep', 'word', 'Eu vou dormir cedo', 'I\'m going to sleep early'),
    createContentItem('Tomar banho', '', 'To take a shower', 'sentence', 'Eu vou tomar banho agora', 'I\'m going to take a shower now', [{ korean: 'Tomar', english: 'to take' }, { korean: 'banho', english: 'bath/shower' }]),
    createContentItem('Escovar os dentes', '', 'To brush teeth', 'sentence', 'Eu escovo os dentes três vezes por dia', 'I brush my teeth three times a day', [{ korean: 'Escovar', english: 'to brush' }, { korean: 'os dentes', english: 'the teeth' }]),
    createContentItem('Tomar café da manhã', '', 'To have breakfast', 'sentence', 'Eu tomo café da manhã às sete', 'I have breakfast at seven', [{ korean: 'Tomar', english: 'to have/take' }, { korean: 'café da manhã', english: 'breakfast' }]),
    createContentItem('Almoçar', '', 'To have lunch', 'word', 'Vamos almoçar juntos?', 'Shall we have lunch together?'),
    createContentItem('Jantar', '', 'To have dinner', 'word', 'Eu janto com a família', 'I have dinner with the family'),
    createContentItem('Trabalhar', '', 'To work', 'word', 'Eu trabalho de segunda a sexta', 'I work Monday to Friday'),
    createContentItem('Estudar', '', 'To study', 'word', 'Eu estudo português todo dia', 'I study Portuguese every day'),
    createContentItem('Cozinhar', '', 'To cook', 'word', 'Eu gosto de cozinhar', 'I like to cook'),

    // Home
    createContentItem('Casa', '', 'House / Home', 'word', 'Minha casa é grande', 'My house is big'),
    createContentItem('Quarto', '', 'Bedroom / Room', 'word', 'Meu quarto é pequeno', 'My room is small'),
    createContentItem('Banheiro', '', 'Bathroom', 'word', 'O banheiro fica ali', 'The bathroom is over there'),
    createContentItem('Cozinha', '', 'Kitchen', 'word', 'A cozinha está limpa', 'The kitchen is clean'),
    createContentItem('Sala', '', 'Living room', 'word', 'Estamos na sala', 'We are in the living room'),

    // Weather
    createContentItem('Está quente', '', 'It\'s hot', 'sentence', 'Hoje está muito quente', 'Today it\'s very hot', [{ korean: 'Está', english: 'it is' }, { korean: 'quente', english: 'hot' }]),
    createContentItem('Está frio', '', 'It\'s cold', 'sentence', 'Está frio lá fora', 'It\'s cold outside', [{ korean: 'Está', english: 'it is' }, { korean: 'frio', english: 'cold' }]),
    createContentItem('Está chovendo', '', 'It\'s raining', 'sentence', 'Está chovendo muito', 'It\'s raining a lot', [{ korean: 'Está', english: 'it is' }, { korean: 'chovendo', english: 'raining' }]),
    createContentItem('Tempo', '', 'Weather / Time', 'word', 'Como está o tempo?', 'How is the weather?'),
    createContentItem('Sol', '', 'Sun', 'word', 'O sol está forte hoje', 'The sun is strong today'),
  ],
};

// ==========================================
// FOOD - BEGINNER
// ==========================================
const food = {
  title: 'Food & Dining',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'pt',
  content: [
    // Basic food items
    createContentItem('Comida', '', 'Food', 'word', 'A comida está deliciosa', 'The food is delicious'),
    createContentItem('Água', '', 'Water', 'word', 'Um copo de água, por favor', 'A glass of water, please'),
    createContentItem('Café', '', 'Coffee', 'word', 'Eu quero um café', 'I want a coffee'),
    createContentItem('Pão', '', 'Bread', 'word', 'Eu como pão no café da manhã', 'I eat bread for breakfast'),
    createContentItem('Arroz', '', 'Rice', 'word', 'O arroz está pronto', 'The rice is ready'),
    createContentItem('Feijão', '', 'Beans', 'word', 'Arroz e feijão é um prato típico', 'Rice and beans is a typical dish'),
    createContentItem('Carne', '', 'Meat', 'word', 'Eu gosto de carne', 'I like meat'),
    createContentItem('Frango', '', 'Chicken', 'word', 'Frango grelhado, por favor', 'Grilled chicken, please'),
    createContentItem('Peixe', '', 'Fish', 'word', 'O peixe está fresco', 'The fish is fresh'),
    createContentItem('Salada', '', 'Salad', 'word', 'Eu quero uma salada', 'I want a salad'),
    createContentItem('Fruta', '', 'Fruit', 'word', 'Essa fruta é doce', 'This fruit is sweet'),
    createContentItem('Suco', '', 'Juice', 'word', 'Um suco de laranja, por favor', 'An orange juice, please'),
    createContentItem('Cerveja', '', 'Beer', 'word', 'Uma cerveja gelada, por favor', 'A cold beer, please'),
    createContentItem('Leite', '', 'Milk', 'word', 'Eu tomo leite todo dia', 'I drink milk every day'),
    createContentItem('Queijo', '', 'Cheese', 'word', 'Pão de queijo é muito bom', 'Cheese bread is very good'),

    // Ordering & dining
    createContentItem('O cardápio, por favor', '', 'The menu, please', 'sentence', 'O cardápio, por favor', 'The menu, please', [{ korean: 'O cardápio', english: 'the menu' }, { korean: 'por favor', english: 'please' }]),
    createContentItem('Eu quero', '', 'I want', 'sentence', 'Eu quero um prato do dia', 'I want the dish of the day', [{ korean: 'Eu', english: 'I' }, { korean: 'quero', english: 'want' }]),
    createContentItem('A conta, por favor', '', 'The check, please', 'sentence', 'A conta, por favor', 'The check, please', [{ korean: 'A conta', english: 'the bill/check' }, { korean: 'por favor', english: 'please' }]),
    createContentItem('Está delicioso', '', 'It\'s delicious', 'sentence', 'A comida está deliciosa', 'The food is delicious', [{ korean: 'Está', english: 'it is' }, { korean: 'delicioso', english: 'delicious' }]),
    createContentItem('Eu tenho fome', '', 'I\'m hungry', 'sentence', 'Eu tenho muita fome', 'I\'m very hungry', [{ korean: 'Eu', english: 'I' }, { korean: 'tenho', english: 'have' }, { korean: 'fome', english: 'hunger' }]),
    createContentItem('Eu tenho sede', '', 'I\'m thirsty', 'sentence', 'Eu tenho muita sede', 'I\'m very thirsty', [{ korean: 'Eu', english: 'I' }, { korean: 'tenho', english: 'have' }, { korean: 'sede', english: 'thirst' }]),
    createContentItem('Garçom!', '', 'Waiter!', 'word', 'Garçom, a conta por favor!', 'Waiter, the check please!'),
    createContentItem('Sobremesa', '', 'Dessert', 'word', 'Vocês têm sobremesa?', 'Do you have dessert?'),
    createContentItem('Eu sou vegetariano', '', 'I\'m vegetarian (male)', 'sentence', 'Eu sou vegetariano, tem opções sem carne?', 'I\'m vegetarian, are there options without meat?', [{ korean: 'Eu', english: 'I' }, { korean: 'sou', english: 'am' }, { korean: 'vegetariano', english: 'vegetarian' }]),
    createContentItem('Gostoso', '', 'Tasty / Delicious', 'word', 'Que gostoso!', 'How tasty!'),
  ],
};

// ==========================================
// TRAVEL - BEGINNER
// ==========================================
const travel = {
  title: 'Travel & Transportation',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'pt',
  content: [
    // Transportation
    createContentItem('Ônibus', '', 'Bus', 'word', 'Onde fica o ponto de ônibus?', 'Where is the bus stop?'),
    createContentItem('Metrô', '', 'Subway / Metro', 'word', 'Eu vou de metrô', 'I\'m going by metro'),
    createContentItem('Táxi', '', 'Taxi', 'word', 'Preciso de um táxi', 'I need a taxi'),
    createContentItem('Avião', '', 'Airplane', 'word', 'O avião parte às dez horas', 'The airplane departs at ten o\'clock'),
    createContentItem('Aeroporto', '', 'Airport', 'word', 'Vamos para o aeroporto', 'Let\'s go to the airport'),

    // Directions
    createContentItem('Onde fica?', '', 'Where is it?', 'sentence', 'Onde fica o banheiro?', 'Where is the bathroom?', [{ korean: 'Onde', english: 'where' }, { korean: 'fica', english: 'is located' }]),
    createContentItem('Aqui', '', 'Here', 'word', 'O hotel fica aqui', 'The hotel is here'),
    createContentItem('Ali', '', 'There', 'word', 'O restaurante fica ali', 'The restaurant is there'),
    createContentItem('Perto', '', 'Near / Close', 'word', 'Tem um banco perto daqui?', 'Is there a bank near here?'),
    createContentItem('Longe', '', 'Far', 'word', 'O aeroporto é longe daqui?', 'Is the airport far from here?'),
    createContentItem('Esquerda', '', 'Left', 'word', 'Vire à esquerda', 'Turn left'),
    createContentItem('Direita', '', 'Right', 'word', 'Vire à direita', 'Turn right'),
    createContentItem('Em frente', '', 'Straight ahead', 'sentence', 'Siga em frente', 'Go straight ahead', [{ korean: 'Em', english: 'in' }, { korean: 'frente', english: 'front/ahead' }]),

    // Places
    createContentItem('Hotel', '', 'Hotel', 'word', 'Eu reservei um hotel', 'I booked a hotel'),
    createContentItem('Praia', '', 'Beach', 'word', 'Vamos para a praia!', 'Let\'s go to the beach!'),
    createContentItem('Museu', '', 'Museum', 'word', 'O museu abre às nove', 'The museum opens at nine'),
    createContentItem('Igreja', '', 'Church', 'word', 'A igreja é muito bonita', 'The church is very beautiful'),
    createContentItem('Rua', '', 'Street', 'word', 'Qual é o nome desta rua?', 'What is the name of this street?'),

    // Travel phrases
    createContentItem('Eu estou perdido', '', 'I\'m lost (male)', 'sentence', 'Desculpe, eu estou perdido', 'Sorry, I\'m lost', [{ korean: 'Eu', english: 'I' }, { korean: 'estou', english: 'am' }, { korean: 'perdido', english: 'lost' }]),
    createContentItem('Pode me ajudar?', '', 'Can you help me?', 'sentence', 'Pode me ajudar, por favor?', 'Can you help me, please?', [{ korean: 'Pode', english: 'can you' }, { korean: 'me', english: 'me' }, { korean: 'ajudar', english: 'help' }]),
    createContentItem('Quanto tempo leva?', '', 'How long does it take?', 'sentence', 'Quanto tempo leva para chegar?', 'How long does it take to arrive?', [{ korean: 'Quanto', english: 'how much' }, { korean: 'tempo', english: 'time' }, { korean: 'leva', english: 'takes' }]),
    createContentItem('Passaporte', '', 'Passport', 'word', 'Aqui está meu passaporte', 'Here is my passport'),
    createContentItem('Mala', '', 'Suitcase / Bag', 'word', 'Minha mala é a azul', 'My suitcase is the blue one'),
    createContentItem('Viagem', '', 'Trip / Travel', 'word', 'Boa viagem!', 'Have a good trip!'),
    createContentItem('Eu quero ir para', '', 'I want to go to', 'sentence', 'Eu quero ir para o centro', 'I want to go downtown', [{ korean: 'Eu', english: 'I' }, { korean: 'quero', english: 'want' }, { korean: 'ir para', english: 'to go to' }]),
  ],
};

// ==========================================
// SHOPPING - BEGINNER
// ==========================================
const shopping = {
  title: 'Shopping & Prices',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'pt',
  content: [
    // Basic shopping
    createContentItem('Quanto custa?', '', 'How much does it cost?', 'sentence', 'Quanto custa esse?', 'How much does this one cost?', [{ korean: 'Quanto', english: 'how much' }, { korean: 'custa', english: 'costs' }]),
    createContentItem('Caro', '', 'Expensive', 'word', 'Isso é muito caro', 'This is very expensive'),
    createContentItem('Barato', '', 'Cheap', 'word', 'Esse é mais barato', 'This one is cheaper'),
    createContentItem('Dinheiro', '', 'Money', 'word', 'Eu não tenho dinheiro', 'I don\'t have money'),
    createContentItem('Cartão', '', 'Card (credit/debit)', 'word', 'Aceita cartão?', 'Do you accept card?'),
    createContentItem('Troco', '', 'Change (money)', 'word', 'Tem troco para cem?', 'Do you have change for a hundred?'),

    // Items
    createContentItem('Roupa', '', 'Clothing', 'word', 'Eu preciso comprar roupa', 'I need to buy clothing'),
    createContentItem('Sapato', '', 'Shoe', 'word', 'Quero experimentar esse sapato', 'I want to try on this shoe'),
    createContentItem('Camisa', '', 'Shirt', 'word', 'Essa camisa é bonita', 'This shirt is pretty'),
    createContentItem('Calça', '', 'Pants', 'word', 'Eu preciso de uma calça nova', 'I need new pants'),
    createContentItem('Vestido', '', 'Dress', 'word', 'Esse vestido é lindo', 'This dress is beautiful'),
    createContentItem('Bolsa', '', 'Bag / Purse', 'word', 'Essa bolsa é de couro?', 'Is this bag leather?'),
    createContentItem('Presente', '', 'Gift', 'word', 'É um presente para minha mãe', 'It\'s a gift for my mother'),

    // Shopping phrases
    createContentItem('Posso experimentar?', '', 'Can I try it on?', 'sentence', 'Posso experimentar essa camisa?', 'Can I try on this shirt?', [{ korean: 'Posso', english: 'can I' }, { korean: 'experimentar', english: 'try on' }]),
    createContentItem('Tem outro tamanho?', '', 'Do you have another size?', 'sentence', 'Tem outro tamanho maior?', 'Do you have a bigger size?', [{ korean: 'Tem', english: 'do you have' }, { korean: 'outro', english: 'another' }, { korean: 'tamanho', english: 'size' }]),
    createContentItem('Estou só olhando', '', 'I\'m just looking', 'sentence', 'Obrigado, estou só olhando', 'Thanks, I\'m just looking', [{ korean: 'Estou', english: 'I am' }, { korean: 'só', english: 'just' }, { korean: 'olhando', english: 'looking' }]),
    createContentItem('Eu vou levar', '', 'I\'ll take it', 'sentence', 'Eu vou levar esse', 'I\'ll take this one', [{ korean: 'Eu', english: 'I' }, { korean: 'vou', english: 'am going to' }, { korean: 'levar', english: 'take' }]),
    createContentItem('Tem desconto?', '', 'Is there a discount?', 'sentence', 'Tem desconto para pagamento à vista?', 'Is there a discount for cash payment?', [{ korean: 'Tem', english: 'is there' }, { korean: 'desconto', english: 'discount' }]),
    createContentItem('Loja', '', 'Store / Shop', 'word', 'A loja fecha às dez', 'The store closes at ten'),
    createContentItem('Supermercado', '', 'Supermarket', 'word', 'Vou ao supermercado', 'I\'m going to the supermarket'),
    createContentItem('Shopping', '', 'Mall / Shopping center', 'word', 'Vamos ao shopping?', 'Shall we go to the mall?'),
    createContentItem('Sacola', '', 'Bag (shopping)', 'word', 'Preciso de uma sacola', 'I need a bag'),
    createContentItem('Promoção', '', 'Sale / Promotion', 'word', 'Esse produto está em promoção', 'This product is on sale'),
    createContentItem('Posso pagar com cartão?', '', 'Can I pay with card?', 'sentence', 'Posso pagar com cartão de crédito?', 'Can I pay with credit card?', [{ korean: 'Posso', english: 'can I' }, { korean: 'pagar', english: 'pay' }, { korean: 'com cartão', english: 'with card' }]),
    createContentItem('Recibo', '', 'Receipt', 'word', 'Posso ter o recibo?', 'Can I have the receipt?'),
  ],
};

// ==========================================
// BUSINESS - BEGINNER
// ==========================================
const business = {
  title: 'Business & Work',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'pt',
  content: [
    // Workplace basics
    createContentItem('Escritório', '', 'Office', 'word', 'Eu trabalho no escritório', 'I work at the office'),
    createContentItem('Reunião', '', 'Meeting', 'word', 'A reunião é às duas horas', 'The meeting is at two o\'clock'),
    createContentItem('Empresa', '', 'Company', 'word', 'Eu trabalho em uma empresa grande', 'I work at a big company'),
    createContentItem('Chefe', '', 'Boss', 'word', 'Meu chefe é muito bom', 'My boss is very nice'),
    createContentItem('Colega', '', 'Colleague', 'word', 'Meus colegas são simpáticos', 'My colleagues are friendly'),
    createContentItem('Trabalho', '', 'Work / Job', 'word', 'Eu gosto do meu trabalho', 'I like my job'),
    createContentItem('Computador', '', 'Computer', 'word', 'Eu preciso do computador', 'I need the computer'),

    // Business phrases
    createContentItem('Bom dia, em que posso ajudar?', '', 'Good morning, how can I help?', 'sentence', 'Bom dia, em que posso ajudar?', 'Good morning, how can I help?', [{ korean: 'Bom dia', english: 'good morning' }, { korean: 'em que', english: 'in what' }, { korean: 'posso ajudar', english: 'can I help' }]),
    createContentItem('Tenho uma reunião', '', 'I have a meeting', 'sentence', 'Tenho uma reunião às três', 'I have a meeting at three', [{ korean: 'Tenho', english: 'I have' }, { korean: 'uma reunião', english: 'a meeting' }]),
    createContentItem('Qual é o seu e-mail?', '', 'What is your email?', 'sentence', 'Qual é o seu e-mail?', 'What is your email?', [{ korean: 'Qual', english: 'what' }, { korean: 'é', english: 'is' }, { korean: 'o seu e-mail', english: 'your email' }]),
    createContentItem('Qual é o seu telefone?', '', 'What is your phone number?', 'sentence', 'Qual é o seu telefone?', 'What is your phone number?', [{ korean: 'Qual', english: 'what' }, { korean: 'é', english: 'is' }, { korean: 'o seu telefone', english: 'your phone number' }]),
    createContentItem('Eu preciso enviar um e-mail', '', 'I need to send an email', 'sentence', 'Eu preciso enviar um e-mail urgente', 'I need to send an urgent email', [{ korean: 'Eu preciso', english: 'I need to' }, { korean: 'enviar', english: 'send' }, { korean: 'um e-mail', english: 'an email' }]),
    createContentItem('Eu entendo', '', 'I understand', 'sentence', 'Eu entendo, obrigado', 'I understand, thank you', [{ korean: 'Eu', english: 'I' }, { korean: 'entendo', english: 'understand' }]),
    createContentItem('Eu não entendo', '', 'I don\'t understand', 'sentence', 'Desculpe, eu não entendo', 'Sorry, I don\'t understand', [{ korean: 'Eu', english: 'I' }, { korean: 'não', english: 'don\'t' }, { korean: 'entendo', english: 'understand' }]),
    createContentItem('Pode repetir, por favor?', '', 'Can you repeat, please?', 'sentence', 'Pode repetir, por favor?', 'Can you repeat, please?', [{ korean: 'Pode', english: 'can you' }, { korean: 'repetir', english: 'repeat' }, { korean: 'por favor', english: 'please' }]),

    // Job-related
    createContentItem('Salário', '', 'Salary', 'word', 'O salário é bom', 'The salary is good'),
    createContentItem('Horário', '', 'Schedule / Hours', 'word', 'Qual é o horário de trabalho?', 'What are the work hours?'),
    createContentItem('Férias', '', 'Vacation', 'word', 'Eu estou de férias', 'I\'m on vacation'),
    createContentItem('Currículo', '', 'Resume / CV', 'word', 'Eu enviei meu currículo', 'I sent my resume'),
    createContentItem('Entrevista', '', 'Interview', 'word', 'Eu tenho uma entrevista amanhã', 'I have an interview tomorrow'),
    createContentItem('Contrato', '', 'Contract', 'word', 'Preciso assinar o contrato', 'I need to sign the contract'),
    createContentItem('Prazo', '', 'Deadline', 'word', 'O prazo é sexta-feira', 'The deadline is Friday'),
    createContentItem('Muito prazer', '', 'Pleased to meet you (business)', 'sentence', 'Muito prazer, eu sou o gerente', 'Pleased to meet you, I am the manager', [{ korean: 'Muito', english: 'very/much' }, { korean: 'prazer', english: 'pleasure' }]),
  ],
};

// ==========================================
// HEALTHCARE - BEGINNER
// ==========================================
const healthcare = {
  title: 'Health & Medical',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'pt',
  content: [
    // Body parts
    createContentItem('Cabeça', '', 'Head', 'word', 'Minha cabeça está doendo', 'My head is hurting'),
    createContentItem('Estômago', '', 'Stomach', 'word', 'Meu estômago está ruim', 'My stomach is bad'),
    createContentItem('Garganta', '', 'Throat', 'word', 'Minha garganta dói', 'My throat hurts'),
    createContentItem('Costas', '', 'Back', 'word', 'Eu tenho dor nas costas', 'I have back pain'),
    createContentItem('Braço', '', 'Arm', 'word', 'Eu machuquei o braço', 'I hurt my arm'),
    createContentItem('Perna', '', 'Leg', 'word', 'Minha perna está doendo', 'My leg is hurting'),
    createContentItem('Olho', '', 'Eye', 'word', 'Meu olho está vermelho', 'My eye is red'),
    createContentItem('Dente', '', 'Tooth', 'word', 'Meu dente está doendo', 'My tooth is hurting'),

    // Symptoms & conditions
    createContentItem('Estou doente', '', 'I\'m sick', 'sentence', 'Estou doente, preciso ir ao médico', 'I\'m sick, I need to go to the doctor', [{ korean: 'Estou', english: 'I am' }, { korean: 'doente', english: 'sick' }]),
    createContentItem('Dor de cabeça', '', 'Headache', 'sentence', 'Eu tenho dor de cabeça', 'I have a headache', [{ korean: 'Dor', english: 'pain' }, { korean: 'de', english: 'of' }, { korean: 'cabeça', english: 'head' }]),
    createContentItem('Febre', '', 'Fever', 'word', 'Eu estou com febre', 'I have a fever'),
    createContentItem('Tosse', '', 'Cough', 'word', 'Eu estou com tosse', 'I have a cough'),
    createContentItem('Gripe', '', 'Flu', 'word', 'Eu estou com gripe', 'I have the flu'),
    createContentItem('Alergia', '', 'Allergy', 'word', 'Eu tenho alergia a camarão', 'I\'m allergic to shrimp'),

    // Medical places & people
    createContentItem('Hospital', '', 'Hospital', 'word', 'Onde fica o hospital?', 'Where is the hospital?'),
    createContentItem('Médico', '', 'Doctor', 'word', 'Preciso ver um médico', 'I need to see a doctor'),
    createContentItem('Farmácia', '', 'Pharmacy', 'word', 'Tem uma farmácia aqui perto?', 'Is there a pharmacy nearby?'),
    createContentItem('Remédio', '', 'Medicine', 'word', 'Preciso tomar remédio', 'I need to take medicine'),
    createContentItem('Dentista', '', 'Dentist', 'word', 'Eu preciso ir ao dentista', 'I need to go to the dentist'),

    // Medical phrases
    createContentItem('Eu preciso de ajuda', '', 'I need help', 'sentence', 'Eu preciso de ajuda, por favor', 'I need help, please', [{ korean: 'Eu', english: 'I' }, { korean: 'preciso', english: 'need' }, { korean: 'de ajuda', english: 'help' }]),
    createContentItem('Onde dói?', '', 'Where does it hurt?', 'sentence', 'Onde dói? Mostre para mim', 'Where does it hurt? Show me', [{ korean: 'Onde', english: 'where' }, { korean: 'dói', english: 'does it hurt' }]),
    createContentItem('Eu sou alérgico a', '', 'I\'m allergic to (male)', 'sentence', 'Eu sou alérgico a penicilina', 'I\'m allergic to penicillin', [{ korean: 'Eu', english: 'I' }, { korean: 'sou', english: 'am' }, { korean: 'alérgico a', english: 'allergic to' }]),
    createContentItem('Me sinto mal', '', 'I feel bad / I feel sick', 'sentence', 'Me sinto mal, preciso descansar', 'I feel sick, I need to rest', [{ korean: 'Me', english: 'myself' }, { korean: 'sinto', english: 'feel' }, { korean: 'mal', english: 'bad/sick' }]),
    createContentItem('É uma emergência', '', 'It\'s an emergency', 'sentence', 'É uma emergência, chame uma ambulância!', 'It\'s an emergency, call an ambulance!', [{ korean: 'É', english: 'it is' }, { korean: 'uma emergência', english: 'an emergency' }]),
    createContentItem('Seguro de saúde', '', 'Health insurance', 'sentence', 'Eu tenho seguro de saúde', 'I have health insurance', [{ korean: 'Seguro', english: 'insurance' }, { korean: 'de saúde', english: 'of health' }]),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
