const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u9',
  title: 'Level 1 · Unit 9: खाना ऑर्डर करना — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Order food and drinks, ask for small changes, and close the meal politely.',
  vocabularyGoal: 'Use restaurant, dish, drink, and taste words.',
  grammarGoal: 'Use `मुझे ... चाहिए`, postpositions such as `के साथ`, and polite imperatives.',
  speakingGoal: 'Place a short food order and change one detail.',
  task: 'Roleplay ordering lunch in a restaurant.',
  expressionPractice: [
    practice('ordering-food', 'Ordering food', 'Use `मुझे ... चाहिए`.'),
    practice('changing-detail', 'Changing detail', 'Use `बिना` and `कम`.'),
    practice('asking-bill', 'Asking bill', 'Close the meal politely.'),
  ],
  relatedPools: ['topic-food', 'topic-service'],
  items: [
    item('मुझे ... चाहिए', 'mujhe ... chāhiye', 'A polite request frame that works beautifully for food orders.', 'मुझे एक दाल चाहिए।', '“I would like one dal.”'),
    item('पानी / चाय / कॉफ़ी', 'pānī / chāy / kŏfī', 'Water, tea, and coffee: core drink words.', 'मुझे पानी और चाय चाहिए।', '“I would like water and tea.”'),
    item('दाल / चावल / रोटी', 'dāl / chāval / roṭī', 'Dal, rice, and roti: foundational food vocabulary.', 'दाल के साथ चावल चाहिए।', '“I want rice with dal.”'),
    item('के साथ', 'ke sāth', '“With.” A postposition phrase after the noun.', 'चाय के साथ समोसा।', '“Samosa with tea.”'),
    item('बिना', 'binā', '“Without.” Use before the thing omitted.', 'चीनी बिना चाय चाहिए।', '“I want tea without sugar.”'),
    item('कम', 'kam', '“Less.” Useful for salt, oil, or spice requests.', 'थोड़ा कम नमक डालिए।', '“Please add a little less salt.”'),
    item('मसालेदार', 'masāledār', '“Spicy / full of spices.”', 'यह खाना बहुत मसालेदार है।', '“This food is very spicy.”'),
    item('स्वादिष्ट', 'svādiṣṭ', '“Delicious.” Slightly more formal than colloquial `बहुत अच्छा`.', 'खाना स्वादिष्ट है।', '“The food is delicious.”'),
    item('बिल', 'bil', '“Bill / check.” A common loanword.', 'कृपया बिल दीजिए।', '“Please give the bill.”'),
    item('पैक कर दीजिए', 'paik kar dījiye', '“Please pack it.” A practical service request.', 'बाकी खाना पैक कर दीजिए।', '“Please pack the remaining food.”'),
  ],
});
