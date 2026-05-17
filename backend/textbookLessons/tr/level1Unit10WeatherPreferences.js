const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u10',
  title: 'Level 1 · Unit 10: Hava ve Tercihler — Weather and Preferences',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe weather and say what you like or prefer.',
  vocabularyGoal: 'Use weather nouns, seasons, and preference expressions.',
  grammarGoal: 'Use `seviyorum`, `sevmiyorum`, and `tercih ediyorum` in simple comparisons.',
  speakingGoal: 'Describe today’s weather and compare two preferences.',
  task: 'Choose a weekend plan based on the weather.',
  expressionPractice: [
    practice('describing-weather', 'Describing weather', 'Use one weather sentence.'),
    practice('stating-like', 'Stating like', 'Use `seviyorum`.'),
    practice('stating-preference', 'Stating preference', 'Use `tercih ediyorum`.'),
  ],
  relatedPools: ['topic-weather', 'topic-preferences'],
  items: [
    item('hava sıcak', 'ha-VA sı-JAK', '“The weather is hot.” Turkish often omits an explicit copula in present simple statements.', 'Bugün hava çok sıcak.', '“Today the weather is very hot.”'),
    item('yağmur yağıyor', 'ya-MUR ya-ğı-YOR', '“It is raining.” The root and progressive suffix show Turkish verbal build-up clearly.', 'Şimdi yağmur yağıyor.', '“It is raining now.”'),
    item('kar', 'KAR', '“Snow.” A central seasonal word in many parts of Turkey.', 'Kışın kar yağıyor.', '“In winter it snows.”'),
    item('yaz / kış', 'YAZ / KIŞ', '“Summer / winter.” Useful comparison anchors.', 'Yazı seviyorum, kışı sevmiyorum.', '“I like summer, I do not like winter.”'),
    item('seviyorum', 'se-vi-YO-rum', '“I like / love.” The present progressive-shaped form is the normal everyday preference form.', 'Serin havayı seviyorum.', '“I like cool weather.”'),
    item('sevmiyorum', 'sev-mi-YO-rum', '“I do not like.” The negative marker sits before the tense suffix.', 'Çok sıcak havayı sevmiyorum.', '“I do not like very hot weather.”'),
    item('tercih ediyorum', 'ter-CİH e-di-YO-rum', '“I prefer.” Useful when choosing between two options.', 'Denizi dağa tercih ediyorum.', '“I prefer the sea to the mountain.”'),
    item('çünkü', 'çün-KÜ', '“Because.” It turns a preference into a fuller explanation.', 'İlkbaharı seviyorum çünkü hava güzel.', '“I like spring because the weather is nice.”'),
  ],
});
