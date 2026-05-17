const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u19',
  title: 'Level 1 · Unit 19: Festas e Tradições — Cultural Holidays',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about major celebrations across the Portuguese-speaking world.',
  vocabularyGoal: 'Use holiday, family, food, and celebration words.',
  grammarGoal: 'Use `costuma`, `vai`, and `porque` to describe repeated customs and future plans.',
  speakingGoal: 'Describe one holiday, say what people usually do, and give one greeting.',
  task: 'Explain one celebration to a visitor.',
  expressionPractice: [
    practice('naming-holiday', 'Naming a holiday', 'Introduce one celebration clearly.'),
    practice('describing-custom', 'Describing custom', 'Use `costuma` plus one action.'),
    practice('giving-greeting', 'Giving greeting', 'Use the greeting that fits the occasion.'),
  ],
  relatedPools: ['topic-culture', 'topic-family'],
  items: [
    item('Carnaval', 'kar-na-VAO', 'A major celebration in Brazil, especially visible in parades, blocos, music, and costumes.', 'No Carnaval, muitas pessoas dançam samba.', '“At Carnival, many people dance samba.”'),
    item('Festa Junina', 'FESH-ta zhoo-NEE-na', 'A Brazilian June festival with rural imagery, quadrilha dancing, corn foods, and regional variation.', 'Na Festa Junina, comemos milho e dançamos quadrilha.', '“At Festa Junina, we eat corn and dance quadrilha.”'),
    item('Natal', 'na-TAO', '“Christmas.” A major family holiday in Portuguese-speaking contexts.', 'No Natal, minha família janta junta.', '“At Christmas, my family has dinner together.”'),
    item('Ano Novo', 'A-noo NOH-voo', '“New Year.” In Brazil, white clothing and beach celebrations are especially visible.', 'No Ano Novo, muitas pessoas usam branco.', '“At New Year, many people wear white.”'),
    item('Páscoa', 'PAS-kwa', '“Easter.” It is associated with family meals and chocolate eggs in modern practice.', 'Na Páscoa, as crianças ganham ovos de chocolate.', '“At Easter, children receive chocolate eggs.”'),
    item('costumar', 'kohs-too-MAR', '“Usually do / be accustomed to.” Excellent for recurring customs.', 'As famílias costumam se reunir no Natal.', '“Families usually gather at Christmas.”'),
    item('comemorar', 'koh-meh-moh-RAR', '“Celebrate.” A central holiday verb.', 'Como vocês comemoram o Ano Novo?', '“How do you celebrate New Year?”'),
    item('família reunida', 'fa-MEE-lya heh-oo-NEE-da', '“Family gathered together.” A culturally useful phrase around holidays.', 'Gosto de ver a família reunida.', '“I like seeing the family gathered together.”'),
    item('Feliz Natal', 'feh-LEEZ na-TAO', '“Merry Christmas.” A fixed holiday greeting.', 'Feliz Natal para você e sua família.', '“Merry Christmas to you and your family.”'),
    item('tradição', 'tra-jee-SAO', '“Tradition.” A bridge word for explaining customs across cultures.', 'É uma tradição importante no Brasil.', '“It is an important tradition in Brazil.”'),
  ],
});
