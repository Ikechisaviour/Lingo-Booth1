const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u9',
  title: 'Level 1 · Unit 9: Pag-order ng Pagkain — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Order food and drinks, ask for small changes, and close the meal politely.',
  vocabularyGoal: 'Use dish, drink, and taste vocabulary.',
  grammarGoal: 'Use `gusto ko`, `paki-`, and `walang` for service requests.',
  speakingGoal: 'Place a short food order and change one detail.',
  task: 'Roleplay ordering lunch in a café.',
  expressionPractice: [
    practice('ordering-food', 'Ordering food', 'Use `Gusto ko ng ...`.'),
    practice('changing-detail', 'Changing detail', 'Use `walang` and `konting`.'),
    practice('asking-bill', 'Asking bill', 'Close the meal naturally.'),
  ],
  relatedPools: ['topic-food', 'topic-service'],
  items: [
    item('Gusto ko ng ...', 'gusto ko ng ...', 'A natural ordering frame meaning “I want ...”.', 'Gusto ko ng adobo.', '“I want adobo.”'),
    item('tubig / kape / tsaa', 'tubig / kape / tsaa', 'Water, coffee, and tea: core drink words.', 'Gusto ko ng tubig at kape.', '“I want water and coffee.”'),
    item('kanin / sabaw / tinapay', 'kanin / sabaw / tinapay', 'Rice, soup, and bread: useful meal-building nouns.', 'Gusto ko ng sabaw at kanin.', '“I want soup and rice.”'),
    item('walang', 'walang', '“Without / there is no.” Useful for omitted ingredients.', 'Kape na walang asukal.', '“Coffee without sugar.”'),
    item('konting', 'konting', '“A little.” Often used before seasoning requests.', 'Konting asin lang.', '“Just a little salt.”'),
    item('maanghang', 'maanghang', '“Spicy.”', 'Masyadong maanghang para sa akin.', '“It is too spicy for me.”'),
    item('masarap', 'masarap', '“Delicious.” A very high-frequency food adjective.', 'Masarap ang pagkain.', '“The food is delicious.”'),
    item('Pakiabot', 'pakiabot', '“Please pass / please give.” `paki-` softens requests.', 'Pakiabot ang menu.', '“Please pass the menu.”'),
    item('bill', 'bill', 'The English loanword is common in casual restaurant speech.', 'Pwede na po ang bill.', '“May we have the bill now?”'),
    item('takeout', 'takeout', 'A common urban loanword; `ipabalot` is also useful.', 'Takeout po ito.', '“This is for takeout.”'),
  ],
});
