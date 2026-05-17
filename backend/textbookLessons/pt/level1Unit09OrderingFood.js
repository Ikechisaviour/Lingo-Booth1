const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u9',
  title: 'Level 1 · Unit 9: Pedindo Comida — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Order food and drinks politely in a cafe, padaria, or restaurant.',
  vocabularyGoal: 'Use meal, drink, portion, and service vocabulary.',
  grammarGoal: 'Use `eu queria`, `para mim`, and `sem` for polite requests and customizations.',
  speakingGoal: 'Place a complete order, change one detail, and confirm it.',
  task: 'Roleplay ordering breakfast at a padaria.',
  expressionPractice: [
    practice('ordering-politely', 'Ordering politely', 'Use `eu queria` as a courteous default.'),
    practice('customizing', 'Customizing', 'Use `sem` or `com pouco`.'),
    practice('confirming', 'Confirming order', 'Repeat the final items clearly.'),
  ],
  relatedPools: ['topic-food', 'topic-service'],
  items: [
    item('eu queria', 'eh-oo kee-REE-a', 'Literally “I wanted,” but in service talk it is a polite present request.', 'Eu queria um café com leite.', '“I would like a coffee with milk.”'),
    item('para mim', 'PA-ra meeng', '“For me.” A very common ordering frame after the server turns to you.', 'Para mim, um pão de queijo.', '“For me, one cheese bread.”'),
    item('sem açúcar', 'seng a-SOO-kar', '“Without sugar.” `Sem` removes an ingredient cleanly.', 'Quero café sem açúcar.', '“I want coffee without sugar.”'),
    item('com pouco gelo', 'kong POH-koo ZHEH-loo', '“With little ice.” Useful for drinks and service customization.', 'Um suco com pouco gelo, por favor.', '“A juice with little ice, please.”'),
    item('prato do dia', 'PRA-too doo JEE-a', '“Dish of the day.” A very practical restaurant phrase in Brazil and Portugal.', 'Qual é o prato do dia?', '“What is the dish of the day?”'),
    item('para viagem', 'PA-ra vee-A-zhem', '“To go / takeaway.” Service vocabulary differs by region, but this form is widely understood.', 'Este sanduíche é para viagem.', '“This sandwich is to go.”'),
    item('para comer aqui', 'PA-ra koh-MER a-KEE', '“To eat here.” A natural contrast with takeaway.', 'É para comer aqui ou para viagem?', '“Is it for here or to go?”'),
    item('uma porção', 'OO-ma por-SAO', '“One portion.” Food orders often need a serving noun, not only the food item.', 'Quero uma porção de batata frita.', '“I want one portion of fries.”'),
    item('mais alguma coisa?', 'myz al-GOO-ma KOI-za', '“Anything else?” A high-frequency server question.', 'Mais alguma coisa para beber?', '“Anything else to drink?”'),
    item('a conta, por favor', 'a KON-ta por fa-VOR', '“The bill, please.” One of the most useful complete service phrases.', 'A conta, por favor.', '“The bill, please.”'),
  ],
});
