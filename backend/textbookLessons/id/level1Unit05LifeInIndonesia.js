// Level 1 Unit 5 — Life in Indonesia (Bahasa Indonesia)
// Functions: describing Indonesian geography, climate, food, and lifestyle;
// using comparative and superlative structures; talking about the 17,000-island
// archipelago and the major regional cultures.

const createContentItem = (target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization, nativeText: note, pronunciation: romanization,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'id-l1u5-orientation',
  pronunciation: 'id-l1u5-pronunciation',
  vocabularyGeography: 'id-l1u5-vocab-geography',
  vocabularyCulture: 'id-l1u5-vocab-culture',
  grammarComparative: 'id-l1u5-grammar-comparative',
  grammarSuperlative: 'id-l1u5-grammar-superlative',
  grammarYang: 'id-l1u5-grammar-yang',
  reading: 'id-l1u5-reading',
  listening: 'id-l1u5-listening',
  writing: 'id-l1u5-writing',
  culture: 'id-l1u5-culture',
  task: 'id-l1u5-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: [
    'Describe Indonesia\'s geography (17,000+ islands, equatorial climate, monsoon seasons) and its five main islands (Sumatera, Jawa, Kalimantan, Sulawesi, Papua).',
    'Use comparative (lebih X dari Y) and superlative (paling X / ter-X) structures.',
    'Apply the relativizer yang to form complex noun phrases: "negara yang besar" (a country that is big), "orang yang dari Bali" (a person who is from Bali).',
  ], task: 'Picture a UI orientation tour where a senior shows international students around campus and Jakarta. By unit\'s end you handle the country-overview part of any first-week conversation.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in geography vocabulary', goals: [
    'Pronounce Indonesian island and city names accurately: Sumatera (NOT "Sumatra"), Kalimantan, Sulawesi, Yogyakarta (Jogja), Bandung, Surabaya.',
    'Apply schwa rules in "kepulauan" /kəpulaˈuan/ — circumfix ke-…-an on root pulau.',
    'Pronounce "khatulistiwa" /xatulistiwa/ — Arabic-loan with kh = /x/, used for "equator".',
  ], task: 'Read 15 geography terms with correct phonology.' },
  { id: ACT.vocabularyGeography, section: 'Vocabulary I', title: 'Geography and climate', goals: [
    'Memorize 15 geographic terms: pulau, negara, kepulauan, gunung, sungai, laut, hutan, sawah, pantai, kota, desa, ibukota, provinsi, daerah, kawasan.',
    'Master climate vocabulary: musim hujan (wet season), musim kemarau (dry season), tropis, panas, lembap, hujan deras.',
  ], task: 'Locate 5 major Indonesian places on a map and describe each.' },
  { id: ACT.vocabularyCulture, section: 'Vocabulary II', title: 'Indonesian regional cultures', goals: [
    'Identify the major ethnic groups (suku) and languages: Jawa, Sunda, Batak, Minangkabau, Bugis, Bali, Dayak — each with their own bahasa daerah (regional language).',
    'Recognize the cultural ideal of "Bhinneka Tunggal Ika" (Unity in Diversity) — Indonesia\'s national motto.',
  ], task: 'Match 7 regional cultures to their home islands and a famous food or art form.' },
  { id: ACT.grammarComparative, section: 'Grammar I', title: 'Comparative: lebih X dari Y', goals: [
    'Form a comparative with "lebih + adjective + dari/daripada + Y": "Jakarta lebih besar dari Depok" (Jakarta is bigger than Depok).',
    'Use kurang (less): "Hari ini kurang panas dari kemarin" (Today is less hot than yesterday).',
    'Use sama X dengan Y for equality: "Sumatera sama besar dengan Kalimantan" (Sumatra is as big as Borneo).',
  ], task: 'Write 5 comparative sentences about Indonesian places.' },
  { id: ACT.grammarSuperlative, section: 'Grammar II', title: 'Superlative: paling X / ter-X', goals: [
    'Use "paling + adjective": "Jakarta paling besar di Indonesia" (Jakarta is the biggest in Indonesia).',
    'Use the ter- superlative prefix: "terbesar" (largest), "tertinggi" (highest), "terpanjang" (longest).',
    'Use "di + place" or "di antara + group" to mark the comparison set.',
  ], task: 'Form 5 superlatives about Indonesian geography.' },
  { id: ACT.grammarYang, section: 'Grammar III', title: 'The relativizer yang', goals: [
    'Use yang to form relative clauses: "negara yang besar" (a country that is big), "orang yang dari Bali" (a person who is from Bali). Yang is the all-purpose Indonesian "that/which/who".',
    'Apply yang before adjectives to nominalize them: "yang besar" = "the big one"; "yang merah" = "the red one".',
  ], task: 'Convert 5 English relative clauses into Indonesian with yang.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'A geography textbook paragraph', goals: [
    'Read a paragraph about Indonesia\'s archipelagic geography with correct rhythm.',
    'Answer 5 comprehension questions about islands, climate, and population.',
  ], task: 'Read and answer.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'A campus tour conversation', goals: [
    'Follow a 7-turn dialogue between a senior and a foreign student touring the UI campus and discussing Indonesia.',
  ], task: 'Read along and switch roles.' },
  { id: ACT.writing, section: 'Writing', title: 'Compare your home country to Indonesia', goals: [
    'Write 6-8 sentences comparing Indonesia and your home country (geography, climate, population, food).',
    'Use at least three comparative or superlative structures and three yang relative clauses.',
  ], task: 'Write and read aloud.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Pancasila, gotong royong, Bhinneka Tunggal Ika', goals: [
    'Understand the five principles of Pancasila — Indonesia\'s state philosophy.',
    'Recognize the cultural value of gotong royong (mutual assistance / communal work).',
    'Internalize "Bhinneka Tunggal Ika" as the foundation of Indonesian identity — unity across 1,300+ ethnic groups.',
  ], task: 'Match each Pancasila principle to an example from daily life.' },
  { id: ACT.task, section: 'Task', title: 'Introduce Indonesia to a visitor', goals: [
    'Roleplay introducing Indonesia to a foreign visitor in one continuous 6-turn exchange.',
  ], task: 'Roleplay with the AI tutor.' },
];

const lesson = {
  title: 'Level 1 · Unit 5: Hidup di Indonesia — Life in Indonesia',
  category: 'culture',
  difficulty: 'beginner',
  targetLang: 'id',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-place', label: 'Describing places', goal: 'Describe an Indonesian city or island with geographic + cultural detail.' },
    { id: 'comparing', label: 'Comparing', goal: 'Use lebih X dari Y and paling X for comparisons.' },
    { id: 'relative-clauses', label: 'Yang relative clauses', goal: 'Form complex noun phrases with yang.' },
  ],
  relatedPools: ['topic-geography', 'topic-culture'],
  content: [
    createContentItem('Tujuan unit', 'tu-juan u-nit', 'By end of unit you describe Indonesia\'s 17,000-island geography, contrast it with your home country, and discuss its diverse cultures using comparative and superlative structures.', 'word', 'Saya bisa berbicara tentang geografi dan budaya Indonesia.', 'Unit goal.', null, [ACT.orientation]),
    createContentItem('Skenario: tur kampus UI', 'skə-na-rio', 'You are on an orientation tour at UI Depok with a senior mahasiswa named Andi who is showing you the campus and explaining about Indonesia. By the end of the tour you should be able to answer his questions and ask your own about life in Indonesia.', 'word', 'Andi: "Selamat datang di Indonesia! Indonesia adalah negara kepulauan terbesar di dunia."', 'Opening line of the orientation tour.', null, [ACT.orientation]),

    createContentItem('Sumatera', 'su-ma-tə-ra', 'The westernmost large Indonesian island. Note: in Indonesian spelling it is "Sumatera" with -tera (four syllables), not the English "Sumatra". Home to Medan, Palembang, Padang, Aceh.', 'word', 'Pulau Sumatera lebih besar dari Pulau Jawa.', 'Sumatra island is larger than Java island.', null, [ACT.pronunciation]),
    createContentItem('Kalimantan', 'ka-li-man-tan', 'The Indonesian portion of the island of Borneo (Indonesia + Malaysia + Brunei share Borneo). Indonesia\'s new capital city Nusantara is being built in East Kalimantan. Stress penultimate /tan/.', 'word', 'Ibukota baru Indonesia ada di Kalimantan Timur.', 'Indonesia\'s new capital is in East Kalimantan.', null, [ACT.pronunciation]),
    createContentItem('Sulawesi', 'su-la-we-si', 'A large central island, four-armed in shape. Home to Bugis, Makassar, Toraja ethnic groups. Stress on /we/.', 'word', 'Sulawesi terkenal dengan kopi Toraja.', 'Sulawesi is famous for Toraja coffee.', null, [ACT.pronunciation]),
    createContentItem('Papua', 'pa-pu-a', 'The Indonesian half of New Guinea island. Highest mountain (Puncak Jaya, 4,884m) and most ethnically diverse region (250+ tribes, 250+ languages).', 'word', 'Puncak Jaya di Papua adalah gunung tertinggi di Asia Tenggara.', 'Puncak Jaya in Papua is the highest mountain in Southeast Asia.', null, [ACT.pronunciation]),
    createContentItem('khatulistiwa', 'xa-tu-lis-ti-wa', 'Equator. Arabic-loan with kh = /x/ (velar fricative). The equator passes through Indonesia near Pontianak (Kalimantan Barat), Singkawang, and Bonjol. Stress on /wa/.', 'word', 'Indonesia dilewati garis khatulistiwa.', 'Indonesia is crossed by the equator (line).', null, [ACT.pronunciation]),
    createContentItem('kepulauan', 'kə-pu-la-u-an', 'Archipelago. Circumfix ke-…-an on root pulau (island). Six syllables; schwa first, full vowels otherwise.', 'word', 'Indonesia adalah negara kepulauan.', 'Indonesia is an archipelagic nation.', null, [ACT.pronunciation]),

    createContentItem('pulau', 'pu-lau', 'An island. The basic geographic unit of Indonesia. Diphthong /au/ at the end. "Pulau Jawa" (Java), "Pulau Bali" (Bali).', 'word', 'Indonesia memiliki lebih dari 17,000 pulau.', 'Indonesia has more than 17,000 islands.', null, [ACT.vocabularyGeography]),
    createContentItem('negara', 'nə-ga-ra', 'A country, nation, or state. Schwa first syllable, full /a/ throughout. "Negara berkembang" (developing country), "negara maju" (developed country).', 'word', 'Indonesia adalah negara terpadat keempat di dunia.', 'Indonesia is the fourth most populous country in the world.', null, [ACT.vocabularyGeography]),
    createContentItem('gunung', 'gu-nung', 'A mountain. Both /u/ vowels are full, ng final = /ŋ/. Indonesia has over 130 active volcanoes (gunung berapi).', 'word', 'Gunung Merapi adalah gunung berapi yang masih aktif.', 'Mount Merapi is a still-active volcano.', null, [ACT.vocabularyGeography]),
    createContentItem('sungai', 'su-ngai', 'A river. ng = single /ŋ/, then /ai/ diphthong. Indonesia\'s major rivers include Sungai Kapuas (Kalimantan, longest in Indonesia), Sungai Musi (Sumatera), Sungai Bengawan Solo (Jawa).', 'word', 'Sungai Kapuas adalah sungai terpanjang di Indonesia.', 'Sungai Kapuas is the longest river in Indonesia.', null, [ACT.vocabularyGeography]),
    createContentItem('laut', 'la-ut', 'A sea. Two-syllable /la-ut/. Indonesia has several named seas: Laut Jawa, Laut Banda, Laut Sulawesi, Laut Arafura.', 'word', 'Indonesia dikelilingi oleh laut.', 'Indonesia is surrounded by sea.', null, [ACT.vocabularyGeography]),
    createContentItem('hutan', 'hu-tan', 'Forest. Indonesia has the world\'s third-largest tropical rainforest after the Amazon and Congo. Hutan hujan tropis = tropical rainforest.', 'word', 'Hutan hujan di Kalimantan dan Papua sangat luas.', 'The rainforests in Kalimantan and Papua are very vast.', null, [ACT.vocabularyGeography]),
    createContentItem('sawah', 'sa-wah', 'Rice paddy (flooded field). The iconic terraced sawah of Bali (Tegallalang, Jatiluwih) is UNESCO-listed. Sawah covers ~25% of Java\'s lowland.', 'word', 'Sawah di Bali terkenal di dunia.', 'The rice paddies in Bali are world-famous.', null, [ACT.vocabularyGeography]),
    createContentItem('pantai', 'pan-tai', 'Beach. Indonesia has one of the world\'s longest coastlines (~99,000 km). Famous: Kuta (Bali), Parangtritis (Yogyakarta), Pink Beach (Komodo).', 'word', 'Pantai di Bali bersih dan indah.', 'The beaches in Bali are clean and beautiful.', null, [ACT.vocabularyGeography]),
    createContentItem('kota', 'ko-ta', 'City. "Kota besar" (big city), "kota kecil" (small town), "kota tua" (old town — the colonial Dutch district in Jakarta).', 'word', 'Jakarta adalah kota terbesar di Indonesia.', 'Jakarta is the largest city in Indonesia.', null, [ACT.vocabularyGeography]),
    createContentItem('desa', 'de-sa', 'Village. The administrative unit below kelurahan in rural areas. Approximately 75,000 desa across Indonesia. Idealized in literature and politics as the heart of "real" Indonesia.', 'word', 'Saya berasal dari desa di Jawa Tengah.', 'I come from a village in Central Java.', null, [ACT.vocabularyGeography]),
    createContentItem('ibukota', 'i-bu-ko-ta', 'Capital city. Compound: ibu (mother) + kota (city) — literally "mother city". Indonesia\'s ibukota is moving from Jakarta to Nusantara (East Kalimantan) in stages from 2024.', 'word', 'Ibukota lama Indonesia adalah Jakarta.', 'Indonesia\'s old capital is Jakarta.', null, [ACT.vocabularyGeography]),
    createContentItem('provinsi', 'pro-vin-si', 'A province. Indonesia has 38 provinces (as of 2024 after Papua subdivision). Each provinsi has a gubernur (governor) and DPRD (provincial parliament).', 'word', 'Indonesia memiliki 38 provinsi.', 'Indonesia has 38 provinces.', null, [ACT.vocabularyGeography]),
    createContentItem('musim hujan', 'mu-sim hu-dʒan', 'Rainy season (October-April in most of Indonesia). Daily afternoon downpours, flooding in Jakarta\'s low areas, traffic chaos. "Musim hujan tiba" = the rainy season has come.', 'word', 'Musim hujan di Indonesia mulai bulan Oktober.', 'The rainy season in Indonesia starts in October.', null, [ACT.vocabularyGeography]),
    createContentItem('musim kemarau', 'mu-sim kə-ma-rau', 'Dry season (May-September). Less rain, more heat, dust. Wildfires in Kalimantan and Sumatra during the worst dry years cause the famous "kabut asap" (haze) seen from Singapore.', 'word', 'Musim kemarau lebih panas dan kering.', 'The dry season is hotter and drier.', null, [ACT.vocabularyGeography]),

    createContentItem('suku', 'su-ku', 'Ethnic group / tribe. Indonesia has ~1,300 suku. Major: Jawa (40%), Sunda (15%), Batak, Minangkabau, Bugis, Bali, Dayak, Madura. Each with its own bahasa daerah.', 'word', 'Indonesia memiliki lebih dari 1,300 suku.', 'Indonesia has more than 1,300 ethnic groups.', null, [ACT.vocabularyCulture]),
    createContentItem('bahasa daerah', 'ba-ha-sa da-e-rah', 'Regional language. Examples: bahasa Jawa, bahasa Sunda, bahasa Batak, bahasa Bali. About 700+ regional languages are spoken in Indonesia, in addition to bahasa Indonesia.', 'word', 'Saya juga bisa bahasa Jawa.', 'I can also speak Javanese.', null, [ACT.vocabularyCulture]),
    createContentItem('suku Jawa', 'su-ku dʒa-wa', 'The Javanese ethnic group, ~40% of Indonesia\'s population. Centers in Central and East Java. Known for halus (refined) language register, krama vs ngoko speech levels, gamelan music, wayang shadow puppets, batik.', 'word', 'Suku Jawa adalah suku terbesar di Indonesia.', 'The Javanese are the largest ethnic group in Indonesia.', null, [ACT.vocabularyCulture]),
    createContentItem('suku Sunda', 'su-ku sun-da', 'The Sundanese ethnic group, ~15% of population. West Java (Bandung area). Distinct bahasa Sunda; cuisine famous for fresh vegetables (lalapan), sambal, karedok.', 'word', 'Bandung adalah ibukota budaya Sunda.', 'Bandung is the capital of Sundanese culture.', null, [ACT.vocabularyCulture]),
    createContentItem('suku Batak', 'su-ku ba-tak', 'Batak ethnic groups of North Sumatra (around Lake Toba). Six sub-groups (Toba, Karo, Simalungun, Pakpak, Mandailing, Angkola). Known for strong patrilineal clan (marga) names like Siregar, Sitompul, Hutabarat.', 'word', 'Suku Batak terkenal dengan marga.', 'The Batak are famous for clan names.', null, [ACT.vocabularyCulture]),
    createContentItem('suku Minangkabau', 'su-ku mi-nang-ka-bau', 'Minangkabau ethnic group of West Sumatra. Unique matrilineal inheritance (property passes through women). Cuisine includes nasi padang, rendang, sate padang — famous nationwide.', 'word', 'Rendang adalah masakan suku Minangkabau.', 'Rendang is Minangkabau cuisine.', null, [ACT.vocabularyCulture]),
    createContentItem('suku Bali', 'su-ku ba-li', 'Balinese ethnic group, primarily on Bali island. Hindu (unlike most of Indonesia which is Muslim). Distinctive architecture, dance (Kecak, Legong), and Nyepi (silent day).', 'word', 'Suku Bali menganut agama Hindu.', 'The Balinese follow Hindu religion.', null, [ACT.vocabularyCulture]),
    createContentItem('Bhinneka Tunggal Ika', 'bin-ne-ka tung-gal i-ka', 'Indonesia\'s national motto: "Unity in Diversity" (literally "different but one"). Old Javanese phrase from 14th-century Majapahit empire. Found on the Garuda Pancasila coat of arms.', 'word', 'Bhinneka Tunggal Ika — semboyan negara Indonesia.', 'Bhinneka Tunggal Ika — the national motto of Indonesia.', null, [ACT.vocabularyCulture]),

    createContentItem('lebih X dari Y', 'lə-bih X da-ri Y', 'Comparative pattern: "more X than Y". Lebih (more) + adjective + dari/daripada (than) + Y. Dari is everyday; daripada is slightly more formal/written.', 'sentence', 'Jakarta lebih besar dari Depok.', 'Jakarta is bigger than Depok.', [
      { target: 'lebih + adjective', note: 'more X; the comparative marker' },
      { target: 'dari / daripada', note: 'than; daripada is formal' },
      { target: 'kurang X dari Y', note: 'opposite: less X than Y' },
    ], [ACT.grammarComparative]),
    createContentItem('sama X dengan Y', 'sa-ma X də-ngan Y', 'Equality pattern: "as X as Y". Sama (same) + adjective + dengan (with) + Y. "Sumatera sama besar dengan Kalimantan" = Sumatra is as big as Borneo.', 'sentence', 'Bandung sama indah dengan Yogyakarta.', 'Bandung is as beautiful as Yogyakarta.', null, [ACT.grammarComparative]),

    createContentItem('paling X', 'pa-ling X', 'Superlative pattern: "the most X". Paling + adjective. "Paling besar" = the biggest. Used with di + location to mark the comparison set: "paling besar di dunia" = biggest in the world.', 'sentence', 'Indonesia paling besar di Asia Tenggara.', 'Indonesia is the largest in Southeast Asia.', null, [ACT.grammarSuperlative]),
    createContentItem('ter- superlative', 'tər-', 'The ter- prefix forms a superlative adjective: ter + adjective. terbesar (largest), tertinggi (highest), terpanjang (longest), terindah (most beautiful), tertua (oldest). Functionally equivalent to "paling X" but as a single word.', 'sentence', 'Pulau Jawa adalah pulau terpadat di Indonesia.', 'Java is the most populous island in Indonesia.', [
      { target: 'terbesar (= paling besar)', note: 'largest' },
      { target: 'tertinggi (= paling tinggi)', note: 'highest' },
      { target: 'terpanjang (= paling panjang)', note: 'longest' },
      { target: 'terbaik (= paling baik)', note: 'best' },
    ], [ACT.grammarSuperlative]),

    createContentItem('yang relative clause', 'jaŋ', 'Yang is the all-purpose Indonesian relativizer: "that / which / who". Pattern: NOUN + yang + clause. "Negara yang besar" = "a country that is big". Equally used for restrictive ("the book that I bought") and non-restrictive ("the book, which I bought").', 'sentence', 'Indonesia adalah negara yang sangat luas.', 'Indonesia is a country that is very vast.', [
      { target: 'noun + yang + adjective', note: '"X that is Y" — basic relative' },
      { target: 'noun + yang + verb', note: '"X that does Y" — action relative' },
      { target: 'yang + adjective alone', note: '"the X one" — nominalized: yang besar = the big one' },
    ], [ACT.grammarYang]),
    createContentItem('yang nominalizer', 'jaŋ no-mi-na-li-zer', 'Yang alone (without an explicit head noun) acts as a nominalizer: "yang merah" = "the red one", "yang besar" = "the big one". Used to disambiguate among many: "Yang mana?" = "Which one?".', 'sentence', 'Saya pilih yang merah.', 'I choose the red one.', null, [ACT.grammarYang]),
    createContentItem('yang chains', 'jaŋ chains', 'Multiple yang clauses can chain: "Negara yang besar yang terletak di Asia Tenggara yang memiliki banyak pulau" = "A country that is big that is located in Southeast Asia that has many islands". Common in written/news Indonesian.', 'sentence', 'Indonesia adalah negara kepulauan yang terbesar di dunia yang dilewati garis khatulistiwa.', 'Indonesia is the largest archipelagic country in the world that is crossed by the equator.', null, [ACT.grammarYang]),

    createContentItem('Geografi Indonesia', 'ge-o-gra-fi in-do-ne-sia', 'A 7-sentence reading about Indonesia\'s geography. Read aloud with smooth rhythm.', 'sentence', 'Indonesia adalah negara kepulauan terbesar di dunia. Ada lebih dari 17,000 pulau, dengan lima pulau utama: Sumatera, Jawa, Kalimantan, Sulawesi, dan Papua. Indonesia dilewati garis khatulistiwa, jadi iklimnya tropis sepanjang tahun. Ada dua musim: musim hujan dari Oktober hingga April, dan musim kemarau dari Mei hingga September. Penduduk Indonesia lebih dari 270 juta jiwa, terbesar keempat di dunia. Ada lebih dari 1,300 suku dengan 700+ bahasa daerah. Semboyan negara adalah Bhinneka Tunggal Ika — berbeda-beda tetapi tetap satu.', '"Indonesia is the largest archipelagic country in the world. There are more than 17,000 islands, with five main ones: Sumatra, Java, Borneo, Sulawesi, and Papua. Indonesia is crossed by the equator, so its climate is tropical year-round. There are two seasons: rainy from October to April, and dry from May to September. Indonesia\'s population is over 270 million, the fourth-largest in the world. There are more than 1,300 ethnic groups with 700+ regional languages. The national motto is Bhinneka Tunggal Ika — different but one."', null, [ACT.reading]),
    createContentItem('Pertanyaan pemahaman', 'pər-ta-ɲa-an', 'Five comprehension questions about Indonesia\'s geography. Answer with comparatives and superlatives where appropriate.', 'sentence', '1) Berapa jumlah pulau di Indonesia? 2) Sebutkan lima pulau utama. 3) Kapan musim hujan dimulai? 4) Berapa jumlah penduduk Indonesia? 5) Apa semboyan negara?', 'Five wh-questions; answers should be complete short sentences.', null, [ACT.reading]),

    createContentItem('Tur kampus UI', 'tur kam-pus u-i', 'A 7-turn dialogue between Andi (senior) and a foreign student touring UI.', 'conversation', 'Andi: Ini Universitas Indonesia, kampus terbaik di Indonesia.\nKamu: Wah, besar sekali ya.\nAndi: Iya, kampus UI Depok luasnya lebih dari 300 hektar.\nKamu: Lebih luas dari kampus di negara saya. Berapa mahasiswanya?\nAndi: Sekitar 50,000 mahasiswa, dari semua provinsi di Indonesia dan banyak negara lain.\nKamu: Apa fakultas yang paling populer?\nAndi: Fakultas Kedokteran dan Fakultas Teknik adalah yang paling sulit masuknya.\nKamu: Terima kasih untuk turnya!', 'Casual peer conversation with comparative/superlative practice.', null, [ACT.listening]),

    createContentItem('Bandingkan Indonesia dengan negara Anda', 'ban-ding-kan', 'Write 6-8 sentences comparing Indonesia and your home country. Required: 3 comparatives/superlatives, 3 yang clauses.', 'sentence', 'Contoh: Indonesia lebih besar dari Korea Selatan. Indonesia memiliki 17,000 pulau, sementara Korea adalah semenanjung. Iklim Indonesia tropis, yang lebih panas dari Korea. Korea memiliki empat musim yang berbeda. Penduduk Indonesia lebih banyak dari Korea, tapi Korea lebih padat per kilometer persegi. Makanan Indonesia yang paling terkenal adalah rendang. Bagi saya, Indonesia adalah negara yang sangat menarik.', 'Example comparison.', null, [ACT.writing]),

    createContentItem('Pancasila', 'pan-tʃa-si-la', 'Indonesia\'s state philosophy, 5 principles formulated by Sukarno in 1945: (1) Ketuhanan Yang Maha Esa (belief in one God), (2) Kemanusiaan yang adil dan beradab (just and civilized humanity), (3) Persatuan Indonesia (Indonesian unity), (4) Kerakyatan yang dipimpin oleh hikmat kebijaksanaan (democracy guided by wisdom), (5) Keadilan sosial bagi seluruh rakyat Indonesia (social justice for all).', 'sentence', 'Pancasila adalah dasar negara Indonesia.', 'Pancasila is the foundational philosophy of Indonesia.', null, [ACT.culture]),
    createContentItem('gotong royong', 'go-tong ro-yong', 'Mutual assistance, communal work. A core Indonesian cultural value: villagers gathering to rebuild a neighbor\'s house, neighbors sharing food when someone is ill. The original Sundanese-Javanese concept now nationalized. UI students still organize "kerja bakti" (volunteer work) in this spirit.', 'sentence', 'Gotong royong adalah budaya khas Indonesia.', 'Gotong royong is a uniquely Indonesian cultural practice.', null, [ACT.culture]),
    createContentItem('Bhinneka Tunggal Ika', 'bin-ne-ka tung-gal i-ka', '"Unity in Diversity" — Old Javanese from a 14th-century poem (Sutasoma). Found on Indonesia\'s Garuda emblem. Symbolizes the unity of the 1,300+ ethnic groups and 6 official religions within one nation.', 'sentence', 'Bhinneka Tunggal Ika tertulis di lambang Garuda.', 'Bhinneka Tunggal Ika is written on the Garuda emblem.', null, [ACT.culture]),

    createContentItem('Tugas akhir: Perkenalkan Indonesia', 'tu-gas a-xir', 'Roleplay introducing Indonesia to a foreign visitor (the AI tutor). Use comparatives, superlatives, and yang clauses naturally.', 'conversation', '[Pertemuan dengan tamu]\nTamu: Saya ingin tahu tentang Indonesia.\nKamu: [Jelaskan ukuran dan geografi]\nTamu: Apa makanan yang khas?\nKamu: [Sebutkan beberapa]\nTamu: Apakah ada banyak suku?\nKamu: [Jelaskan keragaman]\nTamu: Apa yang paling Anda sukai dari Indonesia?\nKamu: [Pendapat pribadi]\nTamu: Terima kasih banyak!', '8-turn introduction scenario.', null, [ACT.task]),
  ],
};

module.exports = lesson;
