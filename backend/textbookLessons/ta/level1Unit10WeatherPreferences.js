const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u10',
  title: 'Level 1 · Unit 10: வானிலை மற்றும் விருப்பங்கள் — Weather and Preferences',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe weather and say what you like or prefer.',
  vocabularyGoal: 'Use weather words, season words, and preference phrases.',
  grammarGoal: 'Use `பிடிக்கும்`, `பிடிக்காது`, and comparative preference expressions.',
  speakingGoal: 'Describe today’s weather and compare two simple preferences.',
  task: 'Choose a weekend plan based on the weather.',
  expressionPractice: [
    practice('describing-weather', 'Describing weather', 'Use one weather sentence.'),
    practice('stating-like', 'Stating like', 'Use `பிடிக்கும்`.'),
    practice('stating-preference', 'Stating preference', 'Use `அதைவிட`.'),
  ],
  relatedPools: ['topic-weather', 'topic-preferences'],
  items: [
    item('இன்று வெயில் அதிகம்', 'iṉṟu veyil atikam', '“Today there is a lot of sun / it is very sunny.” A natural tropical-weather statement.', 'இன்று வெயில் அதிகம்.', '“Today it is very sunny.”'),
    item('மழை பெய்கிறது', 'maḻai peykiṟatu', '“It is raining.” A common weather verb phrase.', 'இப்போது மழை பெய்கிறது.', '“It is raining now.”'),
    item('குளிர்', 'kuḷir', '“Cold / coolness.” Useful in seasonal and body-sensation talk.', 'காலை குளிராக இருக்கிறது.', '“The morning is cool.”'),
    item('கோடை / மழைக்காலம்', 'kōṭai / maḻaikkālam', '“Summer / rainy season.” Seasonal talk matters more than a four-season European template.', 'எனக்கு மழைக்காலம் பிடிக்கும்.', '“I like the rainy season.”'),
    item('எனக்கு பிடிக்கும்', 'eṉakku piṭikkum', '“I like.” Tamil frames liking through an experiencer construction.', 'எனக்கு குளிரான வானிலை பிடிக்கும்.', '“I like cool weather.”'),
    item('எனக்கு பிடிக்காது', 'eṉakku piṭikkātu', '“I do not like.” The negative form is built into the verb.', 'எனக்கு மிகுந்த வெயில் பிடிக்காது.', '“I do not like intense sun.”'),
    item('அதைவிட', 'ataiviṭa', '“Than that / compared with that.” Useful in preferences.', 'கோடையைவிட மழைக்காலம் பிடிக்கும்.', '“I like the rainy season more than summer.”'),
    item('ஏனெனில்', 'ēṉeṉil', '“Because.” It lets the learner explain a preference.', 'மழைக்காலம் பிடிக்கும் ஏனெனில் காற்று குளிராக இருக்கும்.', '“I like the rainy season because the air is cool.”'),
  ],
});
