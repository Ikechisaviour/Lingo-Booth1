const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u10',
  title: 'Level 1 · Unit 10: আবহাওয়া ও পছন্দ — Weather and Preferences',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe weather and say what you like or prefer.',
  vocabularyGoal: 'Use weather words, seasons, and preference phrases.',
  grammarGoal: 'Use `ভালো লাগে`, `পছন্দ করি`, and comparison phrases naturally.',
  speakingGoal: 'Describe today’s weather and compare two simple preferences.',
  task: 'Choose a weekend plan based on the weather.',
  expressionPractice: [
    practice('describing-weather', 'Describing weather', 'Use one weather sentence.'),
    practice('stating-like', 'Stating like', 'Use `ভালো লাগে` or `পছন্দ করি`.'),
    practice('stating-preference', 'Stating preference', 'Use `এর চেয়ে`.'),
  ],
  relatedPools: ['topic-weather', 'topic-preferences'],
  items: [
    item('আজ গরম', 'aj gorom', '“Today it is hot.” Bengali can state weather very compactly.', 'আজ খুব গরম।', '“Today it is very hot.”'),
    item('বৃষ্টি হচ্ছে', 'brishti hochchhe', '“It is raining.” A common progressive weather phrase.', 'এখন বৃষ্টি হচ্ছে।', '“It is raining now.”'),
    item('শীত', 'sheet', '“Cold / winter.” Context tells whether it means the sensation or the season.', 'সকালে একটু শীত লাগে।', '“It feels a little cold in the morning.”'),
    item('বর্ষা / গ্রীষ্ম', 'borsha / grishsho', '“Monsoon / summer.” South Asian seasonal talk is more useful than a generic four-season template.', 'আমার বর্ষা ভালো লাগে।', '“I like the monsoon season.”'),
    item('আমার ভালো লাগে', 'amar bhalo lage', '“I like.” Literally “it feels good to me.”', 'আমার ঠান্ডা আবহাওয়া ভালো লাগে।', '“I like cool weather.”'),
    item('আমি পছন্দ করি না', 'ami pochhondo kori na', '“I do not like / prefer.” Another common preference frame.', 'আমি খুব গরম পছন্দ করি না।', '“I do not like extreme heat.”'),
    item('এর চেয়ে', 'er cheye', '“Than this / compared with this.” Useful in preferences.', 'গ্রীষ্মের চেয়ে বর্ষা ভালো লাগে।', '“I like the monsoon more than summer.”'),
    item('কারণ', 'karon', '“Because.” It lets the learner explain a preference.', 'বর্ষা ভালো লাগে কারণ বাতাস ঠান্ডা থাকে।', '“I like the monsoon because the air stays cool.”'),
  ],
});
