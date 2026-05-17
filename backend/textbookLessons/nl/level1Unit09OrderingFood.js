const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u9',
  title: 'Level 1 · Unit 9: Eten Bestellen — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Order food and drinks politely in a cafe or lunchroom.',
  vocabularyGoal: 'Use food, drink, portion, and service words.',
  grammarGoal: 'Use polite frames with `ik wil graag`, `mag ik`, and `zonder`.',
  speakingGoal: 'Place a full order, change one detail, and ask for the bill.',
  task: 'Roleplay ordering lunch in a cafe.',
  expressionPractice: [
    practice('ordering-politely', 'Ordering politely', 'Use `ik wil graag` or `mag ik`.'),
    practice('customizing', 'Customizing', 'Use `zonder`.'),
    practice('closing-order', 'Closing order', 'Ask for the bill naturally.'),
  ],
  relatedPools: ['topic-food', 'topic-service'],
  items: [
    item('ik wil graag', 'ik vil khrahkh', '“I would like.” `Graag` makes the request warmer than a bare `ik wil`.', 'Ik wil graag een koffie.', '“I would like a coffee.”'),
    item('mag ik ...?', 'makh ik', '“May I have ...?” A very useful polite ordering frame.', 'Mag ik een broodje kaas?', '“May I have a cheese sandwich?”'),
    item('zonder suiker', 'ZON-der SOY-ker', '“Without sugar.” A direct customization phrase.', 'Een thee zonder suiker, alstublieft.', '“A tea without sugar, please.”'),
    item('weinig ijs', 'VAY-nikh eys', '“Little ice.” Useful for drink preferences.', 'Ik wil weinig ijs in mijn drankje.', '“I want little ice in my drink.”'),
    item('dagmenu', 'DAKH-meh-NY', '“Daily menu.” Common in cafes and lunch places.', 'Wat is het dagmenu?', '“What is the daily menu?”'),
    item('hier eten / meenemen', 'heer AY-ten / MAY-neh-men', '“Eat here / take away.” `Meenemen` is a separable-looking compound learners will keep seeing.', 'Wilt u hier eten of meenemen?', '“Would you like to eat here or take away?”'),
    item('een portie', 'ən POR-see', '“One portion.” A useful serving noun.', 'Een portie friet, alstublieft.', '“One portion of fries, please.”'),
    item('de rekening, alstublieft', 'də RAY-ke-ning al-stu-BLEEFT', '“The bill, please.” A complete must-know phrase.', 'De rekening, alstublieft.', '“The bill, please.”'),
  ],
});
