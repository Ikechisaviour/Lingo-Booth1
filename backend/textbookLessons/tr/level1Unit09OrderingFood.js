const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u9',
  title: 'Level 1 · Unit 9: Yemek Siparişi — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Order food and drinks politely in cafes and lokantas.',
  vocabularyGoal: 'Use food, drink, portion, and service words.',
  grammarGoal: 'Use `istiyorum`, `alabilir miyim`, and `-siz` to request and customize.',
  speakingGoal: 'Place a complete order, change one detail, and ask for the bill.',
  task: 'Roleplay ordering lunch in a lokanta.',
  expressionPractice: [
    practice('ordering-politely', 'Ordering politely', 'Use `alabilir miyim?`.'),
    practice('customizing', 'Customizing', 'Use `-siz` or `az`.'),
    practice('closing-order', 'Closing order', 'Ask for the bill naturally.'),
  ],
  relatedPools: ['topic-food', 'topic-service'],
  items: [
    item('bir çay alabilir miyim?', 'bir çay a-la-bi-LİR mi-YİM', '“May I get one tea?” This is a polite service request.', 'Bir çay alabilir miyim?', '“May I get one tea?”'),
    item('ben bir çorba istiyorum', 'ben bir çor-BA is-ti-YO-rum', '“I want one soup.” Straightforward and acceptable in many casual restaurants.', 'Ben bir mercimek çorbası istiyorum.', '“I want one lentil soup.”'),
    item('şekersiz', 'şe-ker-SİZ', '“Without sugar.” The suffix `-siz/-sız/-suz/-süz` means “without,” shaped by vowel harmony.', 'Şekersiz kahve istiyorum.', '“I want coffee without sugar.”'),
    item('az acılı', 'az a-cı-LI', '“Mild / with little spice.” `-lı` means “with,” the opposite of `-siz`.', 'Az acılı kebap alabilir miyim?', '“May I have mildly spicy kebap?”'),
    item('burada yemek', 'bu-RA-da ye-MEK', '“Eat here.” `Burada` is location, and the infinitive names the action.', 'Burada mı, paket mi?', '“For here or takeaway?”'),
    item('paket', 'pa-KET', '“Takeaway / package.” Very common in food-service contexts.', 'Bunu paket yapar mısınız?', '“Could you make this takeaway?”'),
    item('bir porsiyon', 'bir por-si-YON', '“One portion.” A useful serving noun for many dishes.', 'Bir porsiyon mantı istiyorum.', '“I want one portion of mantı.”'),
    item('hesap lütfen', 'he-SAP lüt-FEN', '“The bill, please.” A compact must-know phrase.', 'Hesap lütfen.', '“The bill, please.”'),
  ],
});
