const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u17',
  title: 'Level 1 · Unit 17: На почте — Post Office',
  category: 'service',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Handle basic postal tasks such as sending letters, parcels, and asking about delivery.',
  vocabularyGoal: 'Use letter, parcel, stamp, address, and delivery words.',
  grammarGoal: 'Use `отправить`, `кому`, and simple service phrases with case-sensitive destinations.',
  speakingGoal: 'Say what you want to send, where it goes, and ask when it arrives.',
  task: 'Send one parcel at a post office counter.',
  expressionPractice: [
    practice('service-need', 'Stating service need', 'Use `я хочу отправить`.'),
    practice('destination', 'Giving destination', 'Use one destination form.'),
    practice('asking-arrival', 'Asking arrival', 'Use `когда дойдёт?`.'),
  ],
  relatedPools: ['topic-service', 'topic-travel'],
  items: [
    item('почта', 'pochta', '“Post office / mail.” Context decides whether the place or system is meant.', 'Почта находится рядом с банком.', '“The post office is next to the bank.”'),
    item('письмо', 'pismo', '“Letter.” A neuter noun with a soft sign in writing.', 'Я хочу отправить письмо.', '“I want to send a letter.”'),
    item('посылка', 'posylka', '“Parcel.” A practical service noun.', 'Эта посылка для Новосибирска.', '“This parcel is for Novosibirsk.”'),
    item('марка', 'marka', '“Stamp.” A small but necessary postal word.', 'Мне нужны две марки.', '“I need two stamps.”'),
    item('адрес', 'adres', '“Address.” It appears in many formal service tasks.', 'Напишите полный адрес.', '“Write the full address.”'),
    item('я хочу отправить', 'ya khochu otpravit', '“I want to send.” The perfective verb suits the single completed transaction.', 'Я хочу отправить посылку в Казань.', '“I want to send a parcel to Kazan.”'),
    item('сколько стоит доставка?', 'skolko stoit dostavka', '“How much does delivery cost?” A practical shipping question.', 'Сколько стоит доставка до Самары?', '“How much does delivery to Samara cost?”'),
    item('когда дойдёт?', 'kogda doydyot', '“When will it arrive?” Literally “when will it reach.”', 'Когда посылка дойдёт?', '“When will the parcel arrive?”'),
  ],
});
