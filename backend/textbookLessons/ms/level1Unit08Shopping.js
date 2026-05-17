// Level 1 Unit 8 — Shopping (Bahasa Melayu)
// Functions: shopping vocab, prices in Ringgit, bargaining, asking sizes/colors,
// at the pasar malam and the modern pasar raya.

const createContentItem = (target, pinyin, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization: pinyin, nativeText: note, pronunciation: pinyin,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ms-l1u8-orientation', pronunciation: 'ms-l1u8-pronunciation',
  vocabularyShopping: 'ms-l1u8-vocab-shopping', vocabularyColors: 'ms-l1u8-vocab-colors',
  grammarPrices: 'ms-l1u8-grammar-prices', grammarBargain: 'ms-l1u8-grammar-bargain',
  grammarClassifier: 'ms-l1u8-grammar-classifier',
  reading: 'ms-l1u8-reading', listening: 'ms-l1u8-listening',
  writing: 'ms-l1u8-writing', culture: 'ms-l1u8-culture', task: 'ms-l1u8-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'Shopping in Malaysia', goals: ['Use shopping vocab to buy clothes, food, electronics.', 'State and ask prices in Ringgit Malaysia (RM).', 'Bargain politely at the pasar malam (night market).'], task: 'Picture a Saturday at Petaling Street (Chinatown). By the end you can ask prices, bargain, and pay.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Shopping words', goals: ['Pronounce "harga" /har.ga/, "beli" /bə.li/, "jual" /dʒu.al/, "diskaun" /dis.kaun/, "duit" /du.it/, "ringgit" /riŋ.git/.'], task: 'Read aloud.' },
  { id: ACT.vocabularyShopping, section: 'Vocabulary I', title: 'Shopping verbs and items', goals: ['Use beli (buy), jual (sell), bayar (pay), pilih (choose), cari (look for), cuba (try).', 'Name 10 common purchases: baju, kasut, beg, makanan, minuman.'], task: 'List 10 shopping items.' },
  { id: ACT.vocabularyColors, section: 'Vocabulary II', title: 'Colors and sizes', goals: ['Memorize 10 colors: merah, biru, hijau, kuning, putih, hitam, jingga, ungu, coklat, kelabu.', 'Name sizes: kecil, sederhana, besar, S, M, L, XL.'], task: 'Describe 5 items by color and size.' },
  { id: ACT.grammarPrices, section: 'Grammar I', title: 'Stating prices — Ringgit and Sen', goals: ['Use "RM" or "Ringgit" + number for price. RM10 = sepuluh ringgit. RM10.50 = sepuluh ringgit lima puluh sen.'], task: 'State 6 prices.' },
  { id: ACT.grammarBargain, section: 'Grammar II', title: 'Bargaining phrases', goals: ['Use "Boleh kurang?" (can you reduce?), "Mahal sangat!" (too expensive!), "Berapa harga?" (what\'s the price?).'], task: 'Roleplay a bargaining exchange.' },
  { id: ACT.grammarClassifier, section: 'Grammar III', title: 'Classifiers (penjodoh bilangan)', goals: ['Use Malay classifiers: ORANG (people), EKOR (animals), BUAH (large objects, fruit, vehicles), BATANG (long thin things), BIJI (round small things), HELAI (thin flat things).'], task: 'Pair 8 nouns with classifiers.' },
  { id: ACT.reading, section: 'Reading', title: 'A pasar malam description', goals: ['Read a night-market scene description.'], task: 'Read and answer.' },
  { id: ACT.listening, section: 'Listening', title: 'Bargaining at Petaling Street', goals: ['Follow a tourist bargaining for a watch.'], task: 'Perform.' },
  { id: ACT.writing, section: 'Writing', title: 'Write about your shopping trip', goals: ['Write 6 sentences about a recent shopping trip.'], task: 'Write and read aloud.' },
  { id: ACT.culture, section: 'Culture', title: 'Pasar malam, Petaling Street, Mid Valley', goals: ['Understand the layers of Malaysian shopping: pasar malam (night markets, weekly, bargaining), pasar (traditional markets), pasar raya (supermarkets, fixed prices), shopping mall (Pavilion, Mid Valley, KLCC — fixed prices, often premium).', 'Recognize Petaling Street (Chinatown), Central Market (Pasar Seni — artisan), Mydin (Muslim-friendly mass-market chain), Lulu Hypermarket (Indian-Muslim).'], task: 'Match shop types to price expectations.' },
  { id: ACT.task, section: 'Task', title: 'Pasar malam roleplay', goals: ['Roleplay shopping at Pasar Malam Setia Alam — ask prices, bargain, pay.'], task: 'Roleplay 6 turns.' },
];

const lesson = {
  title: 'Level 1 · Unit 8: Beli-Belah — Shopping',
  category: 'shopping',
  difficulty: 'beginner', targetLang: 'ms', nativeLang: 'en', track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-price', label: 'Asking the price', goal: 'Use "Berapa harga …?" naturally.' },
    { id: 'bargaining', label: 'Bargaining politely', goal: 'Use "Boleh kurang?" and counter-offers.' },
    { id: 'choosing-by-color', label: 'Choosing by color/size', goal: 'State color and size preferences.' },
  ],
  relatedPools: ['topic-shopping', 'topic-money'],
  content: [
    createContentItem('membeli-belah', 'məm.bə.li bə.lah', 'GO SHOPPING. Reduplicated verb "beli-belah" + me- prefix. The standard everyday word.', 'word', 'Saya suka membeli-belah di Pavilion.', '"I like shopping at Pavilion".', null, [ACT.orientation]),
    createContentItem('pasar malam vs pasar raya vs mall', 'pa.sar ma.lam vs pa.sar ra.ja vs mol', 'Three Malaysian shopping registers: PASAR MALAM (night market, bargaining), PASAR RAYA (supermarket, fixed prices), MALL (premium retail, fixed prices).', 'word', 'Pasar malam murah, mall mahal.', '"Night markets cheap, malls expensive".', null, [ACT.orientation]),

    // Pronunciation
    createContentItem('harga', 'har.ga', 'PRICE. Rolled r, hard /g/.', 'word', 'Berapa harga ini?', '"How much is this?".', null, [ACT.pronunciation]),
    createContentItem('ringgit', 'riŋ.git', 'RINGGIT — the Malaysian currency. The word originally meant "jagged" (referring to the milled edge of Spanish silver dollars).', 'word', 'RM50 sahaja.', '"Only RM50".', null, [ACT.pronunciation]),
    createContentItem('duit', 'du.it', 'MONEY. From Dutch "duit". The everyday word; "wang" is more formal.', 'word', 'Saya tiada duit.', '"I have no money".', null, [ACT.pronunciation]),
    createContentItem('diskaun', 'dis.kaun', 'DISCOUNT. English loan, MY spelling. "Ada diskaun?" = "Is there a discount?".', 'word', 'Ada diskaun untuk pelajar?', '"Is there a student discount?".', null, [ACT.pronunciation]),

    // Shopping verbs and items
    createContentItem('beli', 'bə.li', 'BUY. "Saya beli baju" = "I buy clothes". Transitive form: "membeli".', 'word', 'Saya nak beli kasut baru.', '"I want to buy new shoes".', null, [ACT.vocabularyShopping]),
    createContentItem('jual', 'dʒu.al', 'SELL. "Kedai itu jual buah" = "That shop sells fruit". Transitive: "menjual".', 'word', 'Pak cik jual buah di pasar.', '"The uncle sells fruit at the market".', null, [ACT.vocabularyShopping]),
    createContentItem('bayar', 'ba.jar', 'PAY. "Bayar dengan tunai" = pay in cash; "bayar dengan kad" = pay by card; "bayar dengan eWallet" = pay by e-wallet (Touch \'n Go, GrabPay, Boost).', 'word', 'Boleh bayar dengan eWallet?', '"Can I pay with e-wallet?".', null, [ACT.vocabularyShopping]),
    createContentItem('pilih', 'pi.lih', 'CHOOSE. "Pilih baju yang awak suka" = "Choose the shirt you like".', 'word', 'Sila pilih warna.', '"Please choose a color".', null, [ACT.vocabularyShopping]),
    createContentItem('cari', 'tʃa.ri', 'LOOK FOR / SEEK. "Saya cari baju Melayu" = "I\'m looking for a baju Melayu".', 'word', 'Saya cari hadiah untuk ibu.', '"I\'m looking for a gift for mum".', null, [ACT.vocabularyShopping]),
    createContentItem('cuba', 'tʃu.ba', 'TRY. "Cuba baju ini" = "try this shirt". Also general "try".', 'word', 'Boleh cuba dulu?', '"Can I try first?".', null, [ACT.vocabularyShopping]),
    createContentItem('baju', 'ba.dʒu', 'CLOTHES / SHIRT. General clothing word. Compounds: baju Melayu (men\'s traditional), baju kurung (women\'s traditional), baju Cina (cheongsam), sari (Indian).', 'word', 'Baju Melayu untuk Hari Raya.', '"Baju Melayu for Hari Raya".', null, [ACT.vocabularyShopping]),
    createContentItem('kasut', 'ka.sut', 'SHOES. "Sepasang kasut" = a pair of shoes.', 'word', 'Kasut Nike RM300.', '"Nike shoes RM300".', null, [ACT.vocabularyShopping]),
    createContentItem('beg / beg tangan', 'beg / beg ta.ŋan', 'BAG / HANDBAG.', 'word', 'Beg tangan ini Coach asli.', '"This handbag is genuine Coach".', null, [ACT.vocabularyShopping]),
    createContentItem('jam tangan', 'dʒam ta.ŋan', 'Wristwatch. Literally `hand clock`; a practical compound noun learners meet in shops, markets, and bargaining scenes.', 'word', 'Jam tangan ini berapa?', '"How much is this watch?" is a compact price question using a real market item.', null, [ACT.vocabularyShopping]),
    createContentItem('makanan', 'ma.ka.nan', 'FOOD. makan + -an.', 'word', 'Makanan halal.', '"Halal food".', null, [ACT.vocabularyShopping]),
    createContentItem('minuman', 'mi.nu.man', 'DRINKS. minum + -an.', 'word', 'Minuman sejuk.', '"Cold drinks".', null, [ACT.vocabularyShopping]),

    // Colors
    createContentItem('merah', 'me.rah', 'Red. Malay colors follow the noun, so this word is immediately useful for describing clothing after the item name.', 'word', 'Baju merah.', '"Red shirt" models the noun-then-adjective order used in shopping.', null, [ACT.vocabularyColors]),
    createContentItem('biru', 'bi.ru', 'Blue. A common color word for sky, clothing, packaging, and everyday object descriptions.', 'word', 'Langit biru.', '"Blue sky" keeps the same post-noun adjective pattern.', null, [ACT.vocabularyColors]),
    createContentItem('hijau', 'hi.dʒau', 'Green. Often used for leaves, vegetables, traffic lights, and product colors in daily descriptions.', 'word', 'Daun hijau.', '"Green leaf" is a simple natural pairing learners can remember quickly.', null, [ACT.vocabularyColors]),
    createContentItem('kuning', 'ku.niŋ', 'YELLOW. Color associated with Malay royalty.', 'word', 'Payung kuning Sultan.', '"Sultan\'s yellow umbrella" — royal symbol.', null, [ACT.vocabularyColors]),
    createContentItem('putih', 'pu.tih', 'White. A high-frequency color in clothing, school uniforms, and descriptions of clean or plain objects.', 'word', 'Baju putih.', '"White shirt" is a common clothing phrase in Malaysia.', null, [ACT.vocabularyColors]),
    createContentItem('hitam', 'hi.tam', 'Black. Used for vehicles, clothing, and everyday contrast pairs such as black versus white.', 'word', 'Kereta hitam.', '"Black car" gives a practical object-color combination.', null, [ACT.vocabularyColors]),
    createContentItem('jingga / oren', 'dʒiŋ.ga / o.ren', 'ORANGE. "Jingga" (Sanskrit) or "oren" (English) — both used.', 'word', 'Buah oren.', '"Oranges".', null, [ACT.vocabularyColors]),
    createContentItem('ungu', 'u.ŋu', 'Purple. Less common than basic colors, but useful in clothing and gift-shopping descriptions.', 'word', 'Bunga ungu.', '"Purple flower" keeps the color tied to a memorable visual noun.', null, [ACT.vocabularyColors]),
    createContentItem('coklat', 'tʃok.lat', 'Brown. The same form also appears in the word for chocolate, so context tells whether it is a color or a food item.', 'word', 'Beg coklat.', '"Brown bag" shows the color meaning in a shopping context.', null, [ACT.vocabularyColors]),
    createContentItem('kelabu', 'kə.la.bu', 'Grey. Especially common with weather, clouds, and neutral clothing colors.', 'word', 'Awan kelabu.', '"Grey clouds" connects the word to a typical weather image.', null, [ACT.vocabularyColors]),
    createContentItem('saiz: kecil / sederhana / besar', 'saiz: kə.tʃil / sə.dər.ha.na / bə.sar', 'SIZES: small / medium / large. Also S / M / L / XL as English-loan abbreviations.', 'word', 'Saiz M.', '"Size M".', null, [ACT.vocabularyColors]),

    // Grammar — prices
    createContentItem('RM (Ringgit Malaysia)', 'ar.em', 'CURRENCY. Symbol RM. 1 ringgit = 100 sen. "RM10" = sepuluh ringgit. "RM10.50" = sepuluh ringgit lima puluh sen.', 'sentence', 'Harga ini RM50 sahaja.', '"This price is only RM50".', null, [ACT.grammarPrices]),
    createContentItem('sen', 'sen', 'CENT. 1/100 of a ringgit.', 'sentence', 'RM2.50 = dua ringgit lima puluh sen.', '"RM2.50".', null, [ACT.grammarPrices]),
    createContentItem('berapa harga', 'bə.ra.pa har.ga', 'HOW MUCH? "Berapa harga baju ini?" = "How much is this shirt?".', 'sentence', 'Berapa harga sepasang kasut ini?', '"How much is this pair of shoes?".', null, [ACT.grammarPrices]),

    // Bargaining
    createContentItem('Boleh kurang?', 'bo.leh ku.raŋ', '"Can it be reduced?" — the universal Malaysian bargaining opener at pasar malam.', 'sentence', 'Boleh kurang sikit?', '"Can you reduce a bit?".', null, [ACT.grammarBargain]),
    createContentItem('Mahal sangat!', 'ma.hal sa.ŋat', '"Too expensive!" — bargaining pushback.', 'sentence', 'Wah, mahal sangat lah!', '"Wow, way too expensive!" — with -lah for emphasis.', null, [ACT.grammarBargain]),
    createContentItem('Saya bagi ___ je', 'sa.ja ba.gi ___ dʒə', 'COUNTER-OFFER: "Saya bagi ___ saja" = "I\'ll give just ___". The bargainer\'s counter-price.', 'sentence', 'Saya bagi RM30 sahaja.', '"I\'ll give only RM30".', null, [ACT.grammarBargain]),
    createContentItem('Harga last', 'har.ga last', '"FINAL PRICE" — Manglish bargaining term. "Harga last RM40" = "Final price RM40".', 'sentence', 'OK, harga last RM40.', '"OK, final price RM40".', null, [ACT.grammarBargain]),

    // Classifiers
    createContentItem('orang — for people', 'o.raŋ', 'CLASSIFIER for people. "Tiga ORANG pelajar" = "three students".', 'sentence', 'Lima orang anak.', '"Five children".', null, [ACT.grammarClassifier]),
    createContentItem('ekor — for animals', 'e.kor', 'CLASSIFIER for animals. "Dua EKOR kucing" = "two cats". Literal meaning "tail".', 'sentence', 'Tiga ekor ayam.', '"Three chickens".', null, [ACT.grammarClassifier]),
    createContentItem('buah — for large objects, fruit, vehicles', 'bu.ah', 'CLASSIFIER for large/round objects, fruits, buildings, vehicles. "Sebuah kereta" = "a car".', 'sentence', 'Sebuah rumah, dua buah kereta.', '"One house, two cars".', null, [ACT.grammarClassifier]),
    createContentItem('batang — for long thin objects', 'ba.taŋ', 'CLASSIFIER for cylindrical/long objects. "Sebatang pen" = "a pen"; "dua batang rokok" = "two cigarettes".', 'sentence', 'Sebatang pen.', '"A pen".', null, [ACT.grammarClassifier]),
    createContentItem('biji — for small round things', 'bi.dʒi', 'CLASSIFIER for small round objects, fruits, eggs. "Dua biji telur" = "two eggs".', 'sentence', 'Tiga biji epal.', '"Three apples".', null, [ACT.grammarClassifier]),
    createContentItem('helai — for thin flat objects', 'hə.lai', 'CLASSIFIER for sheets, leaves, paper, cloth, hair. "Sehelai baju" = "a piece of clothing".', 'sentence', 'Dua helai kertas.', '"Two sheets of paper".', null, [ACT.grammarClassifier]),
    createContentItem('keping — for pieces/slices', 'kə.piŋ', 'CLASSIFIER for slices, pieces, coins, cards. "Dua keping kek" = "two slices of cake".', 'sentence', 'Sekeping roti.', '"A slice of bread".', null, [ACT.grammarClassifier]),
    createContentItem('pasang — for pairs', 'pa.saŋ', 'CLASSIFIER for pairs. "Sepasang kasut" = "a pair of shoes".', 'sentence', 'Sepasang kasut Nike.', '"A pair of Nike shoes".', null, [ACT.grammarClassifier]),

    // Reading
    createContentItem('Pasar Malam Setia Alam', 'pa.sar ma.lam sə.ti.a a.lam', 'A description of a Selangor weekly night market.', 'sentence', 'Setiap hari Ahad malam, Pasar Malam Setia Alam dipenuhi dengan ratusan penjaja. Penjaja menjual segala macam barang: baju, kasut, beg, jam tangan, telefon bimbit murah, dan makanan. Ramai pelanggan datang membeli-belah kerana harga lebih murah daripada di mall. Penjaja dan pembeli sering tawar-menawar — "Boleh kurang? Saya bagi RM20 saja".', 'A pasar malam scene.', [
      { target: 'dipenuhi', note: 'is filled (passive of penuh)' },
      { target: 'penjaja', note: 'street hawker / vendor' },
      { target: 'pelanggan', note: 'customer' },
      { target: 'tawar-menawar', note: 'bargaining (reduplication of tawar "offer")' },
    ], [ACT.reading]),
    createContentItem('Soalan kefahaman', 'so.a.lan kə.fa.ha.man', 'Reading questions that check time, products, customer motivation, and bargaining language from the night-market passage.', 'sentence', 'Q1: Bila pasar malam? Q2: Apa dijual? Q3: Mengapa pelanggan datang? Q4: Apa mereka cakap untuk bargain?', 'The answers recycle shopping words into realistic market comprehension rather than isolated vocabulary recall.', null, [ACT.reading]),

    // Listening
    createContentItem('Dialog: tawar-menawar Petaling Street', 'di.a.log: ta.war mə.na.war pə.ta.liŋ stri:t', 'Bargaining for a watch at Chinatown.', 'sentence', 'Pelancong: Berapa harga jam tangan ini?\nPenjaja: RM150, kak.\nPelancong: Wah, mahal! Boleh kurang?\nPenjaja: Boleh, RM120 untuk awak.\nPelancong: Masih mahal. Saya bagi RM80 sahaja.\nPenjaja: Aduh, rugi saya. OK lah, RM100 harga last.\nPelancong: Setuju! Ambil duit ini.', 'Full bargaining sequence.', null, [ACT.listening]),

    // Writing
    createContentItem('Tulis: trip beli-belah', 'tu.lis: trip bə.li bə.lah', 'A reusable writing frame for narrating one shopping trip with destination, item, color, size, price, payment method, and one extra action.', 'sentence', 'Template: Semalam saya pergi ke ___ untuk membeli ___. Saya beli ___ warna ___ saiz ___. Harga RM ___. Saya bayar dengan ___. Saya juga ___.', 'Filling the slots forces the learner to combine shopping vocabulary, adjectives, and simple past narration in one coherent paragraph.', null, [ACT.writing]),

    // Culture
    createContentItem('Petaling Street (Jalan Petaling)', 'pə.ta.liŋ stri:t / dʒa.lan pə.ta.liŋ', 'KL\'s Chinatown core, famous for counterfeit watches, bags, food (Hokkien mee, Hainan chicken rice). Tourist must-visit. Heavy bargaining expected.', 'sentence', 'Petaling Street terkenal dengan barangan tiruan.', '"Petaling Street is famous for counterfeit goods".', null, [ACT.culture]),
    createContentItem('Mid Valley, Pavilion, KLCC, Sunway Pyramid', 'mid va.li / pa.vi.li.on / kel.si.si / sun.wei pi.ra.mid', 'Major KL/Selangor shopping malls. Pavilion (luxury), Mid Valley (mid-range), KLCC (Petronas Towers, premium), Sunway Pyramid (Egyptian-themed, suburban).', 'sentence', 'Mid Valley terbesar di Lembah Klang.', '"Mid Valley is the largest in the Klang Valley".', null, [ACT.culture]),
    createContentItem('eWallet revolusi', 'i.wo.let re.vo.lu.si', 'Malaysia leapfrogged into mobile payments. Touch \'n Go eWallet, GrabPay, Boost, ShopeePay are now everywhere — even at pasar malam stalls. QR code payments universal.', 'sentence', 'Saya bayar dengan Touch \'n Go.', '"I pay with Touch \'n Go".', null, [ACT.culture]),

    // Task
    createContentItem('Tugasan: beli-belah di pasar malam', 'tu.ga.san: bə.li bə.lah di pa.sar ma.lam', 'Roleplay at Pasar Malam Setia Alam.', 'sentence', 'Scene: Awak nak beli baju, jam, dan makanan.', 'Bargain for at least one item.', null, [ACT.task]),
  ],
};

module.exports = lesson;
