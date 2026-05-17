const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u8',
  title: 'Level 1 · Unit 8: Compras — Shopping',
  category: 'shopping',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Shop for everyday items, ask prices, compare options, and complete a purchase.',
  vocabularyGoal: 'Use price, size, color, and payment vocabulary.',
  grammarGoal: 'Use demonstratives such as `este/esta` and adjective agreement with the item being described.',
  speakingGoal: 'Ask a price, request one item, and compare two options.',
  task: 'Buy one item in a loja or feira.',
  expressionPractice: [
    practice('asking-price', 'Asking price', 'Use `quanto custa?`.'),
    practice('choosing-item', 'Choosing item', 'Use `este/esta` with agreement.'),
    practice('comparing', 'Comparing items', 'Use `mais barato` or `maior`.'),
  ],
  relatedPools: ['topic-shopping', 'topic-service'],
  items: [
    item('quanto custa?', 'KWAN-too KOOS-ta', '“How much does it cost?” A core service question.', 'Quanto custa esta camiseta?', '“How much does this T-shirt cost?”'),
    item('este / esta', 'ESH-chee / ESH-ta', '“This” masculine / feminine. The form follows the noun’s gender, not the speaker’s.', 'Quero esta bolsa e este livro.', '“I want this bag and this book.”'),
    item('mais barato', 'myz ba-RA-too', '“Cheaper.” `Mais` creates the comparison and the adjective still agrees if needed.', 'Tem um modelo mais barato?', '“Do you have a cheaper model?”'),
    item('caro / cara', 'KA-roo / KA-ra', '“Expensive” masculine / feminine. Agreement is visible in shopping talk because item nouns vary.', 'A bolsa é cara, mas o relógio é barato.', '“The bag is expensive, but the watch is cheap.”'),
    item('tamanho grande', 'ta-MAN-yoo GRAN-jee', '“Large size.” `Tamanho` names the category before the adjective.', 'Preciso de tamanho grande.', '“I need a large size.”'),
    item('azul / vermelho', 'a-ZOOL / ver-MEL-yoo', '“Blue / red.” Colors often follow the noun and may agree in number or gender depending on form.', 'Você tem uma camisa azul?', '“Do you have a blue shirt?”'),
    item('um quilo', 'oong KEE-loo', '“One kilogram.” Markets regularly use measures like `quilo`, `litro`, and `dúzia`.', 'Quero um quilo de laranja.', '“I want one kilo of oranges.”'),
    item('dinheiro', 'jee-NYEH-roo', '“Cash / money.” It appears in both payment and general money talk.', 'Posso pagar em dinheiro?', '“Can I pay in cash?”'),
    item('cartão', 'kar-TAO', '“Card.” A practical payment word with a nasal ending learners need to hear clearly.', 'Aceita cartão?', '“Do you accept cards?”'),
    item('troco', 'TROH-koo', '“Change.” Essential in small purchases and cash transactions.', 'Aqui está o seu troco.', '“Here is your change.”'),
  ],
});
