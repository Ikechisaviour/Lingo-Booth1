const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u9',
  title: 'Level 1 · Unit 9: В кафе — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Order food and drinks politely in a cafe or столовая.',
  vocabularyGoal: 'Use food, drink, portion, and service words.',
  grammarGoal: 'Use `мне, пожалуйста`, `можно`, and `без` to request and customize.',
  speakingGoal: 'Place a full order, remove one ingredient, and ask for the bill.',
  task: 'Roleplay ordering lunch in a cafe.',
  expressionPractice: [
    practice('ordering-politely', 'Ordering politely', 'Use `мне, пожалуйста`.'),
    practice('customizing', 'Customizing', 'Use `без` plus genitive.'),
    practice('closing-order', 'Closing order', 'Ask for the bill naturally.'),
  ],
  relatedPools: ['topic-food', 'topic-service'],
  items: [
    item('мне, пожалуйста', 'mne pozhaluysta', 'Literally “to me, please,” this is a very natural polite ordering frame.', 'Мне, пожалуйста, чай и суп.', '“Tea and soup for me, please.”'),
    item('можно ...?', 'mozhno', '“May I / can I have ...?” A soft, versatile service request.', 'Можно кофе без сахара?', '“May I have coffee without sugar?”'),
    item('без сахара', 'bez sakhara', '“Without sugar.” `Без` takes the genitive case.', 'Чай без сахара, пожалуйста.', '“Tea without sugar, please.”'),
    item('не острое', 'ne ostroye', '“Not spicy.” The adjective agrees with the neuter food noun implied here.', 'Мне нужно не острое блюдо.', '“I need a non-spicy dish.”'),
    item('порция', 'portsiya', '“Portion.” Food orders often need this serving noun.', 'Одну порцию пельменей, пожалуйста.', '“One portion of dumplings, please.”'),
    item('здесь / с собой', 'zdes / s soboy', '“Here / to go.” These are the practical service contrasts.', 'Это здесь или с собой?', '“Is this for here or to go?”'),
    item('ещё что-нибудь?', 'yeshcho chto-nibud', '“Anything else?” A common server question.', 'Ещё что-нибудь будете?', '“Will you have anything else?”'),
    item('счёт, пожалуйста', 'shchyot pozhaluysta', '“The bill, please.” A complete phrase worth memorizing whole.', 'Счёт, пожалуйста.', '“The bill, please.”'),
  ],
});
