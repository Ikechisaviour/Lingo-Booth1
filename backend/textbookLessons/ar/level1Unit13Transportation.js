const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u13',
  title: 'Level 1 · Unit 13: المواصلات — Transportation',
  category: 'transport',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Choose transport, ask how to get somewhere, and describe a simple route.',
  vocabularyGoal: 'Use vehicle words, route words, and common transport questions.',
  grammarGoal: 'Use `بـ` for means, `إلى` for destination, and `من` for origin.',
  speakingGoal: 'Explain how you travel from one place to another.',
  task: 'Ask for the best way to reach a destination and describe the route back.',
  expressionPractice: [
    practice('naming-transport', 'Naming transport', 'Use the right vehicle noun.'),
    practice('describing-route', 'Describing a route', 'Combine origin, destination, and means.'),
    practice('asking-how', 'Asking how to go', 'Use `كيف أذهب إلى ...؟` naturally.'),
  ],
  relatedPools: ['topic-transport', 'topic-travel'],
  items: [
    item('سيارة', 'sayyāra', '“Car.” A feminine noun and one of the most common transport words.', 'أذهب بالسيارة.', '“I go by car.”'),
    item('حافلة', 'ḥāfila', '“Bus.” The formal MSA word used in educational contexts.', 'أركب الحافلة إلى الجامعة.', '“I take the bus to the university.”'),
    item('قطار', 'qiṭār', '“Train.” Its plural and related station vocabulary become useful later.', 'القطار سريع.', '“The train is fast.”'),
    item('مترو', 'mitrū', '“Metro.” A loanword now common in many Arab cities.', 'أذهب بالمترو إلى العمل.', '“I go to work by metro.”'),
    item('بـ', 'bi-', 'The prefix meaning “by / with” when naming means of transport.', 'أذهب بالحافلة.', '“I go by bus.”'),
    item('من ... إلى ...', 'min ... ilā ...', '“From ... to ...” gives a complete route frame.', 'أذهب من البيت إلى الجامعة.', '“I go from home to the university.”'),
    item('كيف أذهب إلى ...؟', 'kayfa adhhabu ilā ...?', '“How do I go to ...?” A practical direction question.', 'كيف أذهب إلى المحطة؟', '“How do I get to the station?”'),
    item('محطة', 'maḥaṭṭa', '“Station / stop.” Feminine and useful with bus, metro, and train travel.', 'أين محطة المترو؟', '“Where is the metro station?”'),
    item('قريب / بعيد', 'qarīb / baʿīd', '“Near / far.” Useful for choosing whether transport is needed.', 'المستشفى قريب من هنا.', '“The hospital is near here.”'),
    item('أمشي', 'amshī', '“I walk.” It gives a non-vehicle option and supports route comparisons.', 'إذا كان المكان قريبًا، أمشي.', '“If the place is near, I walk.”'),
  ],
});
