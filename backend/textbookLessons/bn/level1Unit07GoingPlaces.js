const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u7',
  title: 'Level 1 · Unit 7: কোথায় যাচ্ছেন? — Going Places',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Say where you are, where you are going, and ask for basic directions.',
  vocabularyGoal: 'Use destinations, route words, and direction phrases.',
  grammarGoal: 'Use locative `-এ`, destination phrasing, and postpositions for landmarks.',
  speakingGoal: 'Say where you are, ask how to get somewhere, and give one short route.',
  task: 'Guide a visitor from campus to a nearby shop.',
  expressionPractice: [
    practice('stating-location', 'Stating location', 'Use one locative phrase.'),
    practice('stating-destination', 'Stating destination', 'Use one destination phrase.'),
    practice('asking-route', 'Asking route', 'Use `কীভাবে যাব?`.'),
  ],
  relatedPools: ['topic-travel', 'topic-directions'],
  items: [
    item('বিশ্ববিদ্যালয়ে', 'bishwobiddyaloy-e', '“At the university.” The locative ending marks place.', 'আমি বিশ্ববিদ্যালয়ে আছি।', '“I am at the university.”'),
    item('লাইব্রেরিতে যাচ্ছি', 'laibreri-te jacchhi', '“I am going to the library.” The destination uses a locative-like ending in this practical phrase.', 'ক্লাসের পরে লাইব্রেরিতে যাচ্ছি।', '“After class I am going to the library.”'),
    item('বাড়ি থেকে', 'bari theke', '“From home.” `থেকে` marks source or origin.', 'আমি বাড়ি থেকে আসছি।', '“I am coming from home.”'),
    item('বাঁদিকে ঘুরুন', 'bam dike ghurun', '“Turn left.” Respectful imperative form.', 'সিগন্যালে বাঁদিকে ঘুরুন।', '“At the signal, turn left.”'),
    item('সোজা যান', 'shoja jan', '“Go straight.” A concise polite route instruction.', 'সোজা যান, তারপর ডানদিকে ঘুরুন।', '“Go straight, then turn right.”'),
    item('কাছে / দূরে', 'kachhe / dure', '“Near / far.” Useful for distance answers.', 'স্টেশন খুব কাছে।', '“The station is very near.”'),
    item('... কীভাবে যাব?', '... kibhabe jabo', '“How do I go to ...?” A practical route question.', 'হাসপাতালে কীভাবে যাব?', '“How do I go to the hospital?”'),
    item('পাশে', 'pashe', '“Beside / next to.” A high-frequency landmark postposition.', 'ক্যাফে ব্যাংকের পাশে।', '“The cafe is next to the bank.”'),
  ],
});
