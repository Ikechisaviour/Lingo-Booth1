const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u5',
  title: 'Level 1 · Unit 5: Leven in Nederland — Life in the Netherlands',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe everyday Dutch life through weather, bikes, food, and city routines.',
  vocabularyGoal: 'Use words for country, city, bike, canal, weather, and daily culture.',
  grammarGoal: 'Use `er is/er zijn`, basic adjective order, and `de/het` awareness in practical descriptions.',
  speakingGoal: 'Describe one thing about Dutch daily life and compare it with your own.',
  task: 'Introduce daily life in the Netherlands to a visiting friend.',
  expressionPractice: [
    practice('describing-country', 'Describing country', 'Use one `er is/er zijn` sentence.'),
    practice('describing-routine', 'Describing routine', 'Use one culture word and one adjective.'),
    practice('comparing', 'Comparing', 'Use `meer` or `minder`.'),
  ],
  relatedPools: ['topic-culture', 'topic-city'],
  items: [
    item('Nederland', 'NAY-der-lant', '“The Netherlands.” The country name itself is singular even though English often imagines many “lands.”', 'Nederland heeft veel fietspaden.', '“The Netherlands has many bike lanes.”'),
    item('de fiets', 'də FEETS', '“The bicycle.” Cycling is practical daily transport, not only recreation.', 'Ik ga vaak met de fiets naar school.', '“I often go to school by bike.”'),
    item('de gracht', 'də GRAKHT', '“Canal.” A city-life word especially visible in Amsterdam and Utrecht.', 'Er is een gracht naast het museum.', '“There is a canal next to the museum.”'),
    item('regen', 'RAY-ghen', '“Rain.” Weather talk is genuinely everyday in Dutch life.', 'Er is vandaag veel regen.', '“There is a lot of rain today.”'),
    item('gezellig', 'khə-ZEL-likh', 'A culturally dense word meaning cozy, pleasant, or socially warm depending on context.', 'Het café is heel gezellig.', '“The cafe is very cozy / pleasant.”'),
    item('brood', 'BROHT', '“Bread.” Lunches are often simple bread-based meals, which makes this a very practical culture noun.', 'Veel mensen eten brood als lunch.', '“Many people eat bread for lunch.”'),
    item('er is / er zijn', 'er is / er zeyn', '“There is / there are.” Dutch uses `er` heavily when introducing what exists somewhere.', 'Er zijn veel fietsen in Amsterdam.', '“There are many bicycles in Amsterdam.”'),
    item('meer dan', 'meer dan', '“More than.” A useful early comparison frame.', 'Er zijn meer fietsen dan auto’s.', '“There are more bicycles than cars.”'),
  ],
});
