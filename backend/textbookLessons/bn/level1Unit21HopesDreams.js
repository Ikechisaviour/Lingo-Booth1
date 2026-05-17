const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u21',
  title: 'Level 1 · Unit 21: আশা ও স্বপ্ন — Hopes and Dreams',
  category: 'future',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about future plans, hopes, and longer-term dreams.',
  vocabularyGoal: 'Use future, study, work, travel, and aspiration vocabulary.',
  grammarGoal: 'Use desire with `চাই`, future forms with `করব`, and hope expressions with `আশা করি`.',
  speakingGoal: 'Describe one realistic plan and one longer dream with a reason.',
  task: 'Give a short future-self introduction.',
  expressionPractice: [
    practice('stating-desire', 'Stating desire', 'Use `চাই`.'),
    practice('stating-plan', 'Stating plan', 'Use one future form.'),
    practice('stating-hope', 'Stating hope', 'Use `আশা করি`.'),
  ],
  relatedPools: ['topic-future', 'topic-goals'],
  items: [
    item('ভবিষ্যৎ', 'bhobishyot', '“Future.” A central abstract noun for plans and goals.', 'আমি আমার ভবিষ্যৎ নিয়ে ভাবি।', '“I think about my future.”'),
    item('স্বপ্ন', 'shopno', '“Dream.” It can be literal or aspirational.', 'আমার স্বপ্ন ডাক্তার হওয়া।', '“My dream is to become a doctor.”'),
    item('চাই', 'chai', '“Want.” A compact desire form.', 'আমি বাংলা ভালোভাবে শিখতে চাই।', '“I want to learn Bengali well.”'),
    item('পড়ব', 'poṛbo', '“I will study.” A first-person future form.', 'আমি বিশ্ববিদ্যালয়ে ইঞ্জিনিয়ারিং পড়ব।', '“I will study engineering at university.”'),
    item('আশা করি', 'asha kori', '“I hope.” A common hopeful frame.', 'আশা করি একদিন কলকাতায় যাব।', '“I hope I will go to Kolkata one day.”'),
    item('হতে', 'hote', '“To become / to be.” Useful in career dreams.', 'আমি শিক্ষক হতে চাই।', '“I want to become a teacher.”'),
    item('সুযোগ পেলে', 'sujog pele', '“If I get the opportunity.” A natural condition around future plans.', 'সুযোগ পেলে বিদেশে কাজ করব।', '“If I get the opportunity, I will work abroad.”'),
    item('একদিন', 'ekdin', '“One day.” A simple phrase for distant hopes.', 'একদিন একটা বই লিখতে চাই।', '“One day I want to write a book.”'),
  ],
});
