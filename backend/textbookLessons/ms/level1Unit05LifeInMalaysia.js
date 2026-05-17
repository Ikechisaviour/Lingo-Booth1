// Level 1 Unit 5 — Life in Malaysia (Bahasa Melayu)
// The "Life in [country]" cultural unit. Distinctly Malaysian: multi-ethnic
// society, mamak culture, festivals across faiths, Bahasa rojak / Manglish,
// state diversity (Peninsular vs Sabah vs Sarawak vs Borneo).

const createContentItem = (
  target, pinyin, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = [],
) => ({
  type, activityIds, targetText: target, romanization: pinyin, nativeText: note, pronunciation: pinyin,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ms-l1u5-orientation',
  pronunciation: 'ms-l1u5-pronunciation',
  vocabularyEthnic: 'ms-l1u5-vocab-ethnic',
  vocabularyFestivals: 'ms-l1u5-vocab-festivals',
  vocabularyFood: 'ms-l1u5-vocab-food',
  vocabularyStates: 'ms-l1u5-vocab-states',
  grammarComparison: 'ms-l1u5-grammar-comparison',
  grammarManglish: 'ms-l1u5-grammar-manglish',
  reading: 'ms-l1u5-reading',
  listening: 'ms-l1u5-listening',
  writing: 'ms-l1u5-writing',
  task: 'ms-l1u5-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'Multi-ethnic Malaysia', goals: ['Recognize the three major ethnic groups (Malay 60%, Chinese 23%, Indian 7%) plus the indigenous Peninsular (Orang Asli) and Sabah/Sarawak Bumiputera communities.', 'Name the major festivals: Hari Raya Aidilfitri, Tahun Baru Cina, Deepavali, Krismas, Hari Merdeka.', 'Describe Malaysian society in 3 sentences using BM.'], task: 'Picture Merdeka Day (August 31) in Dataran Merdeka. By the end of this lesson you should describe the multi-ethnic Malaysia scene in BM.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Festival and food names', goals: ['Pronounce festival names: Hari Raya Aidilfitri, Deepavali, Tahun Baru Cina, Hari Wesak.', 'Pronounce iconic foods: nasi lemak, char kway teow, roti canai, teh tarik.'], task: 'Read each name aloud.' },
  { id: ACT.vocabularyEthnic, section: 'Vocabulary I', title: 'Ethnic and religious groups', goals: ['Name the ethnic groups (Melayu, Cina, India, Orang Asli, Bumiputera Sabah/Sarawak) and religions (Islam, Buddhisme, Hindu, Kristian).'], task: 'List 5 ethnic-religious combinations.' },
  { id: ACT.vocabularyFestivals, section: 'Vocabulary II', title: 'Festivals across faiths', goals: ['Name 8 Malaysian festivals: Hari Raya Aidilfitri, Hari Raya Aidiladha, Tahun Baru Cina, Deepavali, Hari Wesak, Krismas, Pesta Kaamatan (Sabah), Gawai (Sarawak).'], task: 'Match each festival to its community.' },
  { id: ACT.vocabularyFood, section: 'Vocabulary III', title: 'Iconic Malaysian food', goals: ['Name 10 iconic dishes: nasi lemak, char kway teow, roti canai, nasi kandar, laksa, satay, rendang, teh tarik.'], task: 'Pair each dish with the community of origin.' },
  { id: ACT.vocabularyStates, section: 'Vocabulary IV', title: 'States of Malaysia', goals: ['Name the 13 states + 3 federal territories.', 'Distinguish Peninsular (Semenanjung) from Borneo (Sabah, Sarawak).'], task: 'Place each state on a mental map.' },
  { id: ACT.grammarComparison, section: 'Grammar I', title: 'lebih … daripada — comparisons', goals: ['Form comparatives with LEBIH ___ DARIPADA: "lebih besar daripada" = "bigger than".'], task: 'Compare two cities.' },
  { id: ACT.grammarManglish, section: 'Grammar II', title: 'Bahasa rojak / Manglish', goals: ['Recognize bahasa rojak (mixed language): Malay + English + Chinese + Tamil in a single sentence.', 'Use the discourse particle -lah for emphasis.'], task: 'Identify 3 Manglish features in a sample.' },
  { id: ACT.reading, section: 'Reading', title: 'A short profile of Malaysia', goals: ['Read a Wikipedia-style intro paragraph.', 'Answer cultural-knowledge questions.'], task: 'Read and answer.' },
  { id: ACT.listening, section: 'Listening', title: 'A KL-PJ-JB-Penang group chat', goals: ['Follow a casual group dialogue about which state has the best food.'], task: 'Perform a similar dialogue.' },
  { id: ACT.writing, section: 'Writing', title: 'Write about a Malaysian festival you joined', goals: ['Write 5-6 sentences about a festival you joined or want to join.'], task: 'Write and read aloud.' },
  { id: ACT.task, section: 'Task', title: 'Open house roleplay', goals: ['Roleplay attending a Malay-Malaysian Hari Raya open house and meeting Chinese and Indian guests.'], task: 'Roleplay 6 turns.' },
];

const lesson = {
  title: 'Level 1 · Unit 5: Hidup di Malaysia — Life in Malaysia',
  category: 'culture',
  difficulty: 'beginner',
  targetLang: 'ms',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-malaysia', label: 'Describing Malaysia', goal: 'Talk about the multi-ethnic society in 3-4 sentences.' },
    { id: 'naming-festivals', label: 'Naming festivals', goal: 'Identify and discuss 5+ Malaysian festivals.' },
    { id: 'comparing-states', label: 'Comparing states', goal: 'Use "lebih … daripada" to compare Malaysian states or cities.' },
  ],
  relatedPools: ['topic-culture', 'topic-society'],
  content: [
    createContentItem('Malaysia', 'ma.lai.si.a', 'A federation of 13 states + 3 federal territories (Kuala Lumpur, Putrajaya, Labuan). Population ~33 million. Founded 1957 (Malaya independence), 1963 (joined by Sabah, Sarawak, Singapore; Singapore left 1965).', 'word', 'Malaysia merdeka pada 31 Ogos 1957.', '"Malaysia became independent on 31 August 1957".', null, [ACT.orientation]),
    createContentItem('Wawasan Malaysia', 'wa.wa.san ma.lai.si.a', 'Malaysia\'s national vision: multi-ethnic, multi-religious unity. The motto "Bersekutu Bertambah Mutu" (United, Greater Quality) is on the coat of arms.', 'word', 'Negaraku, tanah tumpahnya darahku.', '"My country, the land where my blood is spilled" — opening of the national anthem.', null, [ACT.orientation]),
    createContentItem('Bumiputera vs bukan Bumiputera', 'bu.mi.pu.tə.ra vs bu.kan bu.mi.pu.tə.ra', 'Constitutional category: Bumiputera (Sons of the Soil) = Malays + indigenous Sabah/Sarawak + Orang Asli (~70% population). Non-Bumiputera = Chinese-Malaysians + Indian-Malaysians + others (~30%). Affects scholarships, university quotas, and land policy.', 'word', 'Rakyat Malaysia terdiri daripada pelbagai kaum.', '"Malaysians are made up of various ethnic groups".', null, [ACT.orientation]),

    // Pronunciation
    createContentItem('Hari Raya Aidilfitri', 'ha.ri ra.ja ai.dil.fit.ri', 'Eid al-Fitr — the celebration after Ramadan fasting. The biggest Malay-Muslim festival; the entire country gets 2-3 days public holiday.', 'word', 'Selamat Hari Raya Aidilfitri!', '"Happy Eid!" — universal greeting in Malaysia regardless of religion.', null, [ACT.pronunciation]),
    createContentItem('Deepavali', 'di.pa.va.li', 'Festival of Lights — Hindu festival, public holiday in Malaysia. Indian-Malaysians light oil lamps (diya) and hold open houses.', 'word', 'Selamat Deepavali!', '"Happy Deepavali!".', null, [ACT.pronunciation]),
    createContentItem('Tahun Baru Cina', 'ta.hun ba.ru tʃi.na', 'Chinese New Year — Chinese-Malaysian celebration; major public holiday. Lion dance, ang pow (red packets), reunion dinners.', 'word', 'Gong Xi Fa Cai / Selamat Tahun Baru Cina!', 'Mandarin or Malay greeting; both heard during CNY.', null, [ACT.pronunciation]),
    createContentItem('nasi lemak', 'na.si lə.maʔ', 'Malaysia\'s national dish — coconut rice with sambal, fried anchovies, peanuts, boiled egg, cucumber. Eaten at any time of day.', 'word', 'Nasi lemak ialah hidangan kebangsaan.', '"Nasi lemak is the national dish".', null, [ACT.pronunciation]),
    createContentItem('char kway teow', 'tʃar kwai tjau', 'Hokkien-origin wok-fried flat rice noodles with prawns, cockles, Chinese sausage — Penang\'s signature dish. The Penang version is the iconic one.', 'word', 'Char kway teow Penang paling sedap.', '"Penang char kway teow is the tastiest".', null, [ACT.pronunciation]),
    createContentItem('teh tarik', 'teh ta.riʔ', '"Pulled tea" — strong tea with condensed milk, dramatically poured between two mugs to froth. Iconic mamak drink, Malaysian comfort beverage.', 'word', 'Teh tarik kurang manis, satu.', '"One teh tarik, less sweet" — typical mamak order.', null, [ACT.pronunciation]),

    // Ethnic groups
    createContentItem('orang Melayu', 'o.raŋ mə.la.ju', 'MALAY — ~60% of population. Constitutionally defined as Muslim, Malay-speaking, practicing Malay customs. The political majority. Distinct sub-groups: Kelantan/Terengganu (east coast), Negeri Sembilan (matrilineal), Johor.', 'word', 'Orang Melayu majoriti rakyat Malaysia.', '"Malays are the majority of Malaysians".', null, [ACT.vocabularyEthnic]),
    createContentItem('orang Cina Malaysia', 'o.raŋ tʃi.na ma.lai.si.a', 'CHINESE-MALAYSIANS — ~23%. Mostly Hokkien, Cantonese, Hakka, Teochew, Hainanese origins (in Penang, KL, Ipoh, Sabah). Most are Buddhist, Taoist, or Christian. Strong commercial and educational role.', 'word', 'Orang Cina Malaysia berbahasa Mandarin dan Bahasa Melayu.', '"Chinese-Malaysians speak Mandarin and Malay".', null, [ACT.vocabularyEthnic]),
    createContentItem('orang India Malaysia', 'o.raŋ in.di.a ma.lai.si.a', 'INDIAN-MALAYSIANS — ~7%. Mostly Tamil-origin (with smaller Malayali, Punjabi, Bengali, Sri Lankan communities). Mostly Hindu, with Sikh and Muslim minorities. Concentrated in plantation areas and urban KL.', 'word', 'Orang India Malaysia kebanyakannya berketurunan Tamil.', '"Indian-Malaysians are mostly of Tamil descent".', null, [ACT.vocabularyEthnic]),
    createContentItem('Orang Asli', 'o.raŋ as.li', 'INDIGENOUS PENINSULAR — ~0.7% of Peninsular population. Three groups: Semang (northern), Senoi (central), Proto-Malay (southern). Speak own languages, traditionally forest-dwellers.', 'word', 'Komuniti Orang Asli ada di Pahang, Perak, dan Kelantan.', '"Indigenous communities are in Pahang, Perak, and Kelantan".', null, [ACT.vocabularyEthnic]),
    createContentItem('Bumiputera Sabah', 'bu.mi.pu.tə.ra sa.bah', 'INDIGENOUS SABAH peoples: Kadazan-Dusun (largest), Bajau, Murut, Rungus. Mostly Christian or animist. Sabah feels culturally distinct from Peninsular Malaysia.', 'word', 'Kadazan-Dusun kaum terbesar di Sabah.', '"Kadazan-Dusun is the largest ethnic group in Sabah".', null, [ACT.vocabularyEthnic]),
    createContentItem('Bumiputera Sarawak', 'bu.mi.pu.tə.ra sa.ra.waʔ', 'INDIGENOUS SARAWAK peoples: Iban (largest), Bidayuh, Melanau, Penan, Kenyah, Kayan. Many languages. The Iban "Gawai Dayak" festival is a state public holiday.', 'word', 'Iban kaum terbesar di Sarawak.', '"Iban is the largest ethnic group in Sarawak".', null, [ACT.vocabularyEthnic]),

    // Festivals
    createContentItem('Hari Raya Aidilfitri', 'ha.ri ra.ja ai.dil.fit.ri', 'EID AL-FITR — end of Ramadan. 2 days public holiday. Open houses, baju kurung/baju Melayu, ketupat, rendang, kuih raya. Children receive duit raya (cash gifts) from elders.', 'word', 'Setiap rumah Melayu terbuka untuk semua semasa Hari Raya.', '"Every Malay home is open to everyone during Hari Raya".', null, [ACT.vocabularyFestivals]),
    createContentItem('Hari Raya Aidiladha', 'ha.ri ra.ja ai.dil.ad.ha', 'EID AL-ADHA — the Festival of Sacrifice, ~2 months after Aidilfitri. Sacrifice of cattle/sheep at the mosque, meat distributed to the poor. 1 day public holiday.', 'word', 'Korban dilakukan di masjid pada Hari Raya Aidiladha.', '"Sacrifice is performed at the mosque on Aidiladha".', null, [ACT.vocabularyFestivals]),
    createContentItem('Tahun Baru Cina', 'ta.hun ba.ru tʃi.na', 'CHINESE NEW YEAR — 2 days public holiday. Reunion dinner on the eve, ang pow (red packets) for children/unmarried, lion dance, mandarin oranges, yee sang (prosperity toss) in Malaysia/Singapore.', 'word', 'Tahun Baru Cina di Malaysia ada hidangan yee sang.', '"Chinese New Year in Malaysia has the yee sang dish" — a Malaysian-Singaporean innovation.', null, [ACT.vocabularyFestivals]),
    createContentItem('Deepavali', 'di.pa.va.li', 'DEEPAVALI / DIWALI — Hindu Festival of Lights. 1 day public holiday. Oil lamps (diya), rangoli (floor art), Indian sweets, open houses.', 'word', 'Kuil Sri Maha Mariamman di Brickfields ramai semasa Deepavali.', '"Sri Maha Mariamman Temple in Brickfields is crowded during Deepavali".', null, [ACT.vocabularyFestivals]),
    createContentItem('Hari Wesak', 'ha.ri we.saʔ', 'VESAK — Buddhist celebration of Buddha\'s birth, enlightenment, death. 1 day public holiday. Candle processions at Buddhist temples.', 'word', 'Umat Buddha menyalakan lilin pada Hari Wesak.', '"Buddhists light candles on Vesak Day".', null, [ACT.vocabularyFestivals]),
    createContentItem('Krismas', 'kris.mas', 'CHRISTMAS — 1 day public holiday in Malaysia. Christian Malaysians celebrate; commercial Christmas is huge in KL malls.', 'word', 'Pavilion KL dihias untuk Krismas.', '"Pavilion KL is decorated for Christmas".', null, [ACT.vocabularyFestivals]),
    createContentItem('Pesta Kaamatan', 'pes.ta ka.a.ma.tan', 'HARVEST FESTIVAL — Kadazan-Dusun festival in Sabah. 30-31 May, Sabah state holiday. Unduk Ngadau (beauty pageant), magavau ritual.', 'word', 'Pesta Kaamatan di Sabah setiap akhir Mei.', '"Kaamatan in Sabah every end of May".', null, [ACT.vocabularyFestivals]),
    createContentItem('Hari Gawai', 'ha.ri ga.wai', 'IBAN/DAYAK HARVEST — Sarawak state holiday, 1-2 June. Longhouse celebrations, tuak (rice wine), traditional dance.', 'word', 'Hari Gawai di Sarawak sangat meriah.', '"Hari Gawai in Sarawak is very lively".', null, [ACT.vocabularyFestivals]),
    createContentItem('Hari Merdeka', 'ha.ri mər.de.ka', 'INDEPENDENCE DAY — 31 August, commemorating 1957 independence from Britain. Parade at Dataran Merdeka KL, flag-waving everywhere.', 'word', 'Merdeka! Merdeka! Merdeka!', 'Tunku Abdul Rahman\'s independence proclamation — repeated at every Merdeka anniversary.', null, [ACT.vocabularyFestivals]),
    createContentItem('Hari Malaysia', 'ha.ri ma.lai.si.a', 'MALAYSIA DAY — 16 September, commemorating 1963 formation of Malaysia (Malaya + Sabah + Sarawak + Singapore). Public holiday since 2010.', 'word', 'Hari Malaysia raikan penyatuan Sabah dan Sarawak.', '"Malaysia Day celebrates the union of Sabah and Sarawak".', null, [ACT.vocabularyFestivals]),

    // Food
    createContentItem('nasi lemak', 'na.si lə.maʔ', 'NATIONAL DISH. Coconut rice + sambal + ikan bilis (anchovies) + kacang (peanuts) + telur + timun. Eaten breakfast, lunch, or dinner. The "kedai nasi lemak" is everywhere.', 'word', 'Nasi lemak biasa, dengan rendang.', '"Regular nasi lemak with rendang" — typical add-on.', null, [ACT.vocabularyFood]),
    createContentItem('char kway teow', 'tʃar kwai tjau', 'PENANG SPECIALTY. Wok-fried flat noodles with prawns, cockles, Chinese sausage, egg. Hokkien origin.', 'word', 'Char kway teow Lorong Selamat di Pulau Pinang terkenal.', '"Lorong Selamat char kway teow in Penang is famous".', null, [ACT.vocabularyFood]),
    createContentItem('roti canai', 'ro.ti tʃa.nai', 'INDIAN-MUSLIM FLATBREAD. Eaten at mamak shops with dhal or curry. The breakfast staple of urban Malaysia.', 'word', 'Roti canai dengan teh tarik, dua.', '"Two roti canai with teh tarik" — classic mamak order.', null, [ACT.vocabularyFood]),
    createContentItem('nasi kandar', 'na.si kan.dar', 'PENANG INDIAN-MUSLIM RICE. Rice with assorted curries — fish, chicken, beef, vegetables. Originated in Penang. The famous chains: Line Clear, Kayu, Pelita.', 'word', 'Nasi kandar Pelita 24 jam.', '"Pelita nasi kandar is 24 hours".', null, [ACT.vocabularyFood]),
    createContentItem('laksa', 'lak.sa', 'NOODLE SOUP. Many regional types: Penang asam laksa (sour, tamarind-fish), Sarawak laksa (creamy, Chinese-influenced), curry laksa (Klang Valley).', 'word', 'Asam laksa Penang berbeza daripada laksa Sarawak.', '"Penang asam laksa is different from Sarawak laksa".', null, [ACT.vocabularyFood]),
    createContentItem('satay', 'sa.tai', 'SATAY — grilled meat skewers with peanut sauce. Malay origin, now eaten across SE Asia. Kajang satay (Selangor) is famous.', 'word', 'Satay kambing Kajang sepuluh batang.', '"Ten sticks of Kajang mutton satay".', null, [ACT.vocabularyFood]),
    createContentItem('rendang', 'rən.daŋ', 'DRY BEEF CURRY (Malay/Minang origin). The Hari Raya signature dish, served with ketupat (rice cakes). UNESCO listed as one of the world\'s great dishes.', 'word', 'Rendang Tok Pahang versi paling klasik.', '"Pahang Rendang Tok is the most classic version".', null, [ACT.vocabularyFood]),
    createContentItem('cendol', 'tʃen.dol', 'COLD DESSERT — green pandan jelly, coconut milk, gula melaka (palm sugar), shaved ice. Penang and Melaka have the famous spots.', 'word', 'Cendol Pulau Pinang dengan gula Melaka.', '"Penang cendol with Melaka palm sugar".', null, [ACT.vocabularyFood]),
    createContentItem('teh tarik', 'teh ta.riʔ', '"PULLED TEA" — strong tea with condensed milk, theatrically poured. The national drink, mamak staple.', 'word', 'Teh tarik kurang manis, kurang ais.', '"Teh tarik less sweet, less ice" — typical Malaysian-precise order.', null, [ACT.vocabularyFood]),
    createContentItem('kuih', 'ku.ih', 'TRADITIONAL CAKES / SWEETS. Hundreds of varieties — kuih lapis, ondeh-ondeh, kuih talam, seri muka, kuih raya (Hari Raya cookies).', 'word', 'Kuih raya buatan ibu paling sedap.', '"Mum\'s homemade Hari Raya kuih is the tastiest".', null, [ACT.vocabularyFood]),

    // States
    createContentItem('13 negeri Malaysia', 'ti.ga bə.las nə.gə.ri ma.lai.si.a', '13 states: Johor, Kedah, Kelantan, Melaka, Negeri Sembilan, Pahang, Perak, Perlis, Pulau Pinang, Sabah, Sarawak, Selangor, Terengganu. Plus 3 Federal Territories: KL, Putrajaya, Labuan.', 'word', 'Malaysia ada 13 negeri dan 3 wilayah persekutuan.', '"Malaysia has 13 states and 3 federal territories".', null, [ACT.vocabularyStates]),
    createContentItem('Semenanjung vs Borneo', 'sə.mə.nan.dʒuŋ vs bor.neo', 'PENINSULAR (Semenanjung) Malaysia: 11 states on the Malay Peninsula. EAST Malaysia: Sabah and Sarawak on northern Borneo. Different ecology, demographics, history.', 'word', 'Semenanjung dipisahkan dari Sabah dan Sarawak oleh Laut China Selatan.', '"Peninsular is separated from Sabah and Sarawak by the South China Sea".', null, [ACT.vocabularyStates]),
    createContentItem('Selangor — sekitar KL', 'sə.la.ŋor — sə.ki.tar kel', 'SELANGOR — the most populous and richest state, surrounding KL. Includes Shah Alam (state capital), PJ, Subang Jaya, Klang (port). Sultan of Selangor.', 'word', 'Selangor terkaya di Malaysia.', '"Selangor is the richest in Malaysia".', null, [ACT.vocabularyStates]),
    createContentItem('Pulau Pinang — kosmopolitan', 'pu.lau pi.naŋ — kos.mo.po.li.tan', 'PENANG — multi-ethnic, food-famous, UNESCO-listed George Town. Chinese-Malaysian-majority population. State CM traditionally Chinese-Malaysian.', 'word', 'Pulau Pinang dikenali sebagai "Pearl of the Orient".', '"Penang is known as the Pearl of the Orient".', null, [ACT.vocabularyStates]),
    createContentItem('Kelantan — pantai timur', 'kə.lan.tan — pan.tai ti.mur', 'KELANTAN — east coast Peninsular, Malay-Muslim conservative state. Distinct dialect (loghat Kelantan, ~30% mutually unintelligible with standard BM). PAS-governed politically.', 'word', 'Loghat Kelantan susah difahami.', '"The Kelantan dialect is hard to understand" — even for other Malaysians.', null, [ACT.vocabularyStates]),
    createContentItem('Sabah — Negeri di Bawah Bayu', 'sa.bah — nə.gə.ri di ba.wah ba.ju', 'SABAH — "Land below the wind" (below the typhoon belt). Capital Kota Kinabalu. Mount Kinabalu (4095m), Sipadan diving, Kadazan-Dusun culture. Politically distinct, with its own Sabah-only parties.', 'word', 'Sabah negeri pelancongan utama.', '"Sabah is a major tourist state".', null, [ACT.vocabularyStates]),
    createContentItem('Sarawak — Bumi Kenyalang', 'sa.ra.waʔ — bu.mi kə.ɲa.laŋ', 'SARAWAK — "Land of the Hornbills". Capital Kuching. Largest state by area. Distinct Sarawak parties politically. Iban, Bidayuh, Melanau cultures.', 'word', 'Kuching ialah ibu negeri Sarawak.', '"Kuching is the state capital of Sarawak".', null, [ACT.vocabularyStates]),

    // Comparison grammar
    createContentItem('lebih ___ daripada', 'lə.bih ___ da.ri.pa.da', 'COMPARATIVE: "Lebih X daripada Y" = "more X than Y". "Kereta itu lebih besar daripada kereta ini" = "That car is bigger than this car".', 'sentence', 'Penang lebih kecil daripada Selangor.', '"Penang is smaller than Selangor".', null, [ACT.grammarComparison]),
    createContentItem('paling ___', 'pa.liŋ ___', 'SUPERLATIVE: "Paling X" = "most X / X-est". "Paling besar" = biggest. Also "ter-" prefix: "terbesar".', 'sentence', 'Sarawak negeri paling besar di Malaysia.', '"Sarawak is the biggest state in Malaysia".', null, [ACT.grammarComparison]),
    createContentItem('sama … dengan', 'sa.ma … də.ŋan', 'EQUAL COMPARISON: "sama X dengan Y" = "as X as Y". "Bahasa Melayu sama susah dengan Bahasa Indonesia" = "Malay is as hard as Indonesian".', 'sentence', 'KL sama sibuk dengan Singapura.', '"KL is as busy as Singapore".', null, [ACT.grammarComparison]),

    // Manglish
    createContentItem('Bahasa rojak', 'ba.ha.sa ro.dʒaʔ', '"MIXED LANGUAGE" — the casual Malaysian way of speaking that mixes Malay, English, Mandarin, Hokkien, Cantonese, Tamil in a single sentence. NOT a standard, but universally understood in urban Malaysia.', 'sentence', 'Eh, you nak makan apa? — I dunno lah, you decide can or not?', 'A textbook bahasa rojak sentence — 50% English, 30% BM, 20% local discourse particles.', null, [ACT.grammarManglish]),
    createContentItem('-lah particle', '-lah', 'The most famous Malaysian discourse particle. Adds emphasis, softening, or insistence depending on tone. "Sudahlah" = "enough already!"; "Boleh lah" = "OK, sure, can"; "Susah lah" = "It\'s hard, you know".', 'sentence', 'Cepatlah! / Sudahlah. / Boleh lah, tapi mahal sikit.', 'Three uses of -lah: urging, dismissing, agreeing-with-reservation.', null, [ACT.grammarManglish]),
    createContentItem('-mah / -leh — Cantonese-origin', '-mah / -leh', 'Borrowed from Cantonese: -mah (questioning, "isn\'t it?") and -leh (mild assertion). Common in Chinese-Malaysian Manglish.', 'sentence', 'You don\'t know mah? / Just like that leh.', 'These travel from Cantonese into Manglish and back; pure BM rarely uses them.', null, [ACT.grammarManglish]),
    createContentItem('Manglish examples', 'man.glish examples', 'Iconic Manglish: "Can or not?" (Is it possible?), "Got" (have/exist), "On the way" (coming soon).', 'sentence', 'Can or not? / I got money. / On the way already.', 'Three Manglish standards heard daily in KL and PJ.', null, [ACT.grammarManglish]),

    // Reading
    createContentItem('Profil Malaysia', 'pro.fil ma.lai.si.a', 'A short Wikipedia-style intro paragraph on Malaysia.', 'sentence', 'Malaysia ialah sebuah negara persekutuan di Asia Tenggara dengan 13 negeri dan 3 wilayah persekutuan. Penduduk Malaysia terdiri daripada pelbagai kaum: Melayu, Cina, India, Orang Asli, dan kaum Bumiputera Sabah dan Sarawak. Bahasa rasmi ialah Bahasa Melayu, dan agama rasmi ialah Islam. Ibu negara ialah Kuala Lumpur, dan pentadbiran kerajaan berada di Putrajaya. Malaysia merdeka pada 31 Ogos 1957, dan persekutuan kini diumumkan pada 16 September 1963.', 'Standard country profile in BM.', [
      { target: 'negara persekutuan', note: 'federation' },
      { target: 'penduduk', note: 'population' },
      { target: 'pelbagai kaum', note: 'various ethnic groups' },
      { target: 'agama rasmi', note: 'official religion' },
      { target: 'pentadbiran', note: 'administration' },
    ], [ACT.reading]),

    // Listening
    createContentItem('Group chat: KL vs Penang vs JB', 'group chat: kel vs pi.naŋ vs jb', 'A casual WhatsApp-style group chat among friends from KL, Penang, JB, and Kuching about food.', 'sentence', 'Aiman (KL): Eh weekend ni mari KL, kita pergi makan nasi lemak Kg Baru.\nLi Wei (Penang): Aiyo, nasi lemak KL biasa-biasa je. Datang Penang, char kway teow Lorong Selamat lagi power lah!\nSiti (JB): JB pun ada makanan sedap weh — laksa Johor!\nDavid (Kuching): Tapi tak ada negeri yang boleh kalahkan laksa Sarawak.', 'Four-state food comparison in bahasa rojak.', [
      { target: 'weekend ni', note: '"this weekend" — English loan in casual speech' },
      { target: 'aiyo', note: 'exclamation borrowed from Tamil/Cantonese' },
      { target: 'biasa-biasa je', note: '"just so-so" — reduplication "biasa-biasa" + "je" (short for "sahaja", "only")' },
      { target: 'lagi power', note: '"even more powerful" — Manglish' },
      { target: 'kalahkan', note: 'defeat — kalah + -kan transitivizer' },
    ], [ACT.listening]),

    // Writing
    createContentItem('Tulis tentang perayaan', 'tu.lis tən.taŋ pə.ra.ja.an', '5-6 sentence template for festival description.', 'sentence', 'Template: Tahun lepas saya sambut ___ di ___. Saya pergi rumah terbuka kawan saya yang ___. Kami makan ___ dan minum ___. Saya juga belajar tentang ___. Pengalaman ini sangat ___.', 'Use a real or imagined festival experience.', null, [ACT.writing]),

    // Task
    createContentItem('Tugasan: rumah terbuka Hari Raya', 'tu.ga.san: ru.mah tər.bu.ka ha.ri ra.ja', 'Roleplay attending a Hari Raya open house at a Malay-Malaysian colleague\'s home. You meet the host, sample food, exchange greetings with Chinese and Indian guests.', 'sentence', 'Scene: Awak dijemput ke rumah terbuka Encik Aiman di Bangsar.', 'Use formal greetings, food vocabulary, and ethnic-bridge social skills.', null, [ACT.task]),
  ],
};

module.exports = lesson;
