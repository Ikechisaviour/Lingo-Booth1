const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ms', {
  slug: 'ms-l1u19',
  title: 'Level 1 · Unit 19: Perayaan di Malaysia — Malaysian Holidays',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about major Malaysian celebrations and what people usually do during them.',
  vocabularyGoal: 'Use holiday vocabulary that reflects Malaysia’s multiethnic public calendar.',
  grammarGoal: 'Use `semasa`, `biasanya`, and `akan` to describe recurring and planned holiday actions.',
  speakingGoal: 'Describe one celebration and compare it with another.',
  task: 'Explain a Malaysian holiday to a visiting friend.',
  expressionPractice: [
    practice('holiday-description', 'Holiday description', 'Name a holiday and what people do.'),
    practice('usual-actions', 'Usual actions', 'Use `biasanya` for recurring practices.'),
    practice('comparison', 'Comparison', 'Compare two celebrations respectfully.'),
  ],
  relatedPools: ['topic-culture', 'topic-holidays'],
  items: [
    item('Hari Raya Aidilfitri', 'ha.ri ra.ya ai.dil.fit.ri', 'Major Muslim celebration after Ramadan; families visit, ask forgiveness, and host open houses.', 'Semasa Hari Raya, kami pulang ke kampung.', '“During Hari Raya, we return to the hometown.”'),
    item('Tahun Baru Cina', 'ta.hun ba.ru ci.na', 'Chinese New Year; reunion dinners, red packets, and lion dances are common.', 'Tahun Baru Cina biasanya meriah.', '“Chinese New Year is usually lively.”'),
    item('Deepavali', 'di.pa.va.li', 'Hindu festival of lights; lamps, family visits, and festive food are important.', 'Kawan saya jemput kami ke rumah terbuka Deepavali.', '“My friend invited us to a Deepavali open house.”'),
    item('Krismas', 'kris.mas', 'Christmas; celebrated religiously by Christians and publicly in malls and cities.', 'Pusat beli-belah dihias semasa Krismas.', '“Shopping centres are decorated during Christmas.”'),
    item('rumah terbuka', 'ru.mah ter.bu.ka', '“Open house.” A very Malaysian holiday practice where guests from many backgrounds are welcomed for food.', 'Kami pergi ke rumah terbuka jiran.', '“We went to the neighbour’s open house.”'),
    item('balik kampung', 'ba.lik kam.pung', '“Return to the hometown.” A major holiday travel idea.', 'Ramai orang balik kampung sebelum cuti panjang.', '“Many people return home before the long holiday.”'),
    item('duit raya / angpau', 'du.it ra.ya / ang.pau', 'Holiday money gifts: `duit raya` in Malay-Muslim settings, `angpau` in Chinese settings.', 'Kanak-kanak gembira menerima duit raya.', '“Children are happy to receive festive money.”'),
    item('semasa', 'se.ma.sa', '“During.” Useful for describing customs tied to a period.', 'Semasa Ramadan, umat Islam berpuasa.', '“During Ramadan, Muslims fast.”'),
    item('biasanya', 'bi.a.sa.nya', '“Usually.” The suffix `-nya` helps make an adverb from `biasa`.', 'Kami biasanya makan bersama keluarga.', '“We usually eat with family.”'),
    item('pelbagai kaum', 'pel.ba.gai ka.um', '“Various ethnic communities.” A central phrase for discussing Malaysian society respectfully.', 'Malaysia mempunyai pelbagai kaum dan perayaan.', '“Malaysia has many ethnic communities and celebrations.”'),
  ],
});
