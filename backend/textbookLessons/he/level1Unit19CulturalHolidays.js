const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u19',
  title: 'Level 1 · Unit 19: חגים ומועדים — Holidays and Celebrations',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about major holidays, greetings, family visits, and celebration plans.',
  vocabularyGoal: 'Use holiday names, greeting formulas, meal words, and visit vocabulary.',
  grammarGoal: 'Use future plans and time phrases for upcoming celebrations.',
  speakingGoal: 'Describe one holiday and what people usually do during it.',
  task: 'Explain a holiday plan for a family visit.',
  expressionPractice: [
    practice('naming-holiday', 'Naming holiday', 'Use the holiday name accurately.'),
    practice('giving-greeting', 'Giving greeting', 'Choose a fitting formula.'),
    practice('describing-custom', 'Describing custom', 'Say what people do during the holiday.'),
  ],
  relatedPools: ['topic-culture', 'topic-family'],
  items: [
    item('חג', 'khag', '“Holiday / festival.” A central culture word.', 'חג שמח!', '“Happy holiday!”'),
    item('ראש השנה', 'rosh ha-shana', '“Rosh Hashanah.” Literally “head of the year.”', 'בראש השנה אוכלים תפוח בדבש.', '“On Rosh Hashanah people eat apple with honey.”'),
    item('פסח', 'pesakh', '“Passover.” A major spring holiday with strong food and family associations.', 'בפסח קוראים את ההגדה.', '“On Passover people read the Haggadah.”'),
    item('חנוכה', 'khanuka', '“Hanukkah.” Associated with candles and special foods.', 'בחנוכה מדליקים נרות.', '“On Hanukkah people light candles.”'),
    item('שנה טובה', 'shana tova', '“Good year.” A greeting especially used around Rosh Hashanah.', 'שנה טובה ומתוקה!', '“A good and sweet year!”'),
    item('ארוחה משפחתית', 'arukha mishpakhtit', '“Family meal.” A useful phrase across many holidays.', 'יש לנו ארוחה משפחתית בערב.', '“We have a family meal in the evening.”'),
    item('לבקר', 'levaker', '“To visit.” Useful for holiday plans.', 'אני אבקר את סבא וסבתא.', '“I will visit my grandparents.”'),
    item('מתנה', 'matana', '“Gift.” Feminine.', 'קניתי מתנה לאחותי.', '“I bought a gift for my sister.”'),
    item('נר', 'ner', '“Candle.” Important in several Jewish observances.', 'אנחנו מדליקים נרות.', '“We light candles.”'),
    item('בשבוע הבא', 'bashavua haba', '“Next week.” Useful for future celebration plans.', 'בשבוע הבא נחגוג עם המשפחה.', '“Next week we will celebrate with the family.”'),
  ],
});
