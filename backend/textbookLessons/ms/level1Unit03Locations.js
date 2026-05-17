// Level 1 Unit 3 — Locations & Directions (Bahasa Melayu)
// Functions: describing where things are, asking for directions, prepositions
// (di, ke, dari), neighborhoods in KL and other Malaysian cities.

const createContentItem = (
  target,
  pinyin,
  note,
  type = 'word',
  example = '',
  exampleNote = '',
  breakdown = null,
  activityIds = [],
) => ({
  type,
  activityIds,
  targetText: target,
  romanization: pinyin,
  nativeText: note,
  pronunciation: pinyin,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ms-l1u3-orientation',
  pronunciation: 'ms-l1u3-pronunciation',
  vocabularyPlaces: 'ms-l1u3-vocab-places',
  vocabularyPrepositions: 'ms-l1u3-vocab-prepositions',
  grammarDi: 'ms-l1u3-grammar-di',
  grammarKe: 'ms-l1u3-grammar-ke',
  grammarAda: 'ms-l1u3-grammar-ada',
  reading: 'ms-l1u3-reading',
  listening: 'ms-l1u3-listening',
  writing: 'ms-l1u3-writing',
  culture: 'ms-l1u3-culture',
  task: 'ms-l1u3-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Describe where things are using di, ke, dari and 12 location words.', 'Ask for and give directions in KL — Bukit Bintang, KLCC, Pasar Seni.', 'Use "ada" (there is/has) to talk about availability.'], task: 'Picture finding your way from UM in Pantai Dalam to KLCC by LRT. By the end of this lesson you should ask any Malaysian for directions and understand the reply.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Place-name pronunciation', goals: ['Pronounce KL neighborhoods: Bukit Bintang /bu.kit bin.taŋ/, Petaling Jaya /pə.ta.liŋ dʒa.ja/, Cheras /tʃə.ras/.', 'Roll the r in "Pulau Pinang", "Sarawak", "Penang Bridge".'], task: 'Read each place name aloud.' },
  { id: ACT.vocabularyPlaces, section: 'Vocabulary I', title: 'KL neighborhoods and places', goals: ['Name 15 KL/Selangor places: KLCC, Bukit Bintang, Pasar Seni, Petaling Street, Bangsar, Mont Kiara, PJ, Subang, Shah Alam.', 'Name 8 facility types: bank, pejabat pos, hospital, masjid, gereja, kuil, pasar, kedai.'], task: 'Match each place to its primary function.' },
  { id: ACT.vocabularyPrepositions, section: 'Vocabulary II', title: 'Location prepositions', goals: ['Use di (at/in), ke (to), dari (from), antara (between), sebelah (next to), di hadapan (in front of), di belakang (behind), di atas (on top), di bawah (under).'], task: 'Describe the position of three classroom objects.' },
  { id: ACT.grammarDi, section: 'Grammar I', title: 'di — at, in, on (static location)', goals: ['Use DI before a place name or location noun: di KL, di rumah, di UM. DI is a preposition AND, with passive verbs, a passive marker — be careful which one is in play.'], task: 'Make six sentences using di.' },
  { id: ACT.grammarKe, section: 'Grammar II', title: 'ke / dari — to / from (motion)', goals: ['Use KE for destination (Saya pergi KE pasar = I go to market) and DARI for origin (Saya dari Penang = I am from Penang).'], task: 'Describe one journey using both ke and dari.' },
  { id: ACT.grammarAda, section: 'Grammar III', title: 'ada — there is / has', goals: ['Use ADA to mean both "there is" (existential) and "has" (possession): "Di KL ada banyak pasar" (in KL there are many markets); "Saya ada kereta" (I have a car).'], task: 'Make three "ada" sentences in each meaning.' },
  { id: ACT.reading, section: 'Reading', title: 'A KL tourist map description', goals: ['Read a paragraph describing landmarks around KLCC and identify each by name.', 'Answer questions about distances and directions.'], task: 'Read and answer.' },
  { id: ACT.listening, section: 'Listening', title: 'Asking directions in Bukit Bintang', goals: ['Follow a tourist asking a local for directions to a hotel.', 'Reproduce the directions yourself.'], task: 'Role-perform the dialogue.' },
  { id: ACT.writing, section: 'Writing', title: 'Describe your home neighborhood', goals: ['Write 5 sentences about where you live and three places nearby, using prepositions correctly.'], task: 'Write and read aloud.' },
  { id: ACT.culture, section: 'Culture', title: 'KL layout — old town to KLCC', goals: ['Understand the KL geography: Pasar Seni / Chinatown (the old colonial core), KLCC (the modern petroleum center), Bukit Bintang (shopping/nightlife), Bangsar (expat-friendly), PJ (suburb), Putrajaya (administrative).', 'Recognize that Malaysia has multiple urban hubs: KL, Penang (George Town), JB (Johor Bahru), Kuching, Kota Kinabalu (KK) — each with its own character.'], task: 'Map each KL district to its primary function.' },
  { id: ACT.task, section: 'Task', title: 'Give directions in BM', goals: ['Roleplay giving directions from UM to KLCC to a tourist asking in BM.'], task: 'Roleplay with the AI tutor.' },
];

const lesson = {
  title: 'Level 1 · Unit 3: Di Mana? — Locations and Directions',
  category: 'locations',
  difficulty: 'beginner',
  targetLang: 'ms',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-location', label: 'Describing where things are', goal: 'Use di + place noun in clear short sentences.' },
    { id: 'asking-directions', label: 'Asking for directions', goal: 'Ask "Di mana …?" and "Macam mana saya pergi ke …?" naturally.' },
    { id: 'giving-directions', label: 'Giving simple directions', goal: 'Tell someone to "belok kanan", "lurus", "berhenti di lampu isyarat".' },
  ],
  relatedPools: ['topic-places', 'topic-travel'],
  content: [
    createContentItem('di mana', 'di ma.na', 'WHERE — "di" + "mana" = "at where". The standard direction-asking opener.', 'word', 'Di mana perpustakaan?', '"Where is the library?".', null, [ACT.orientation]),
    createContentItem('Kuala Lumpur (KL)', 'ku.a.la lum.pur', 'Capital of Malaysia, founded as a tin-mining town in the 1850s. Now the largest city, with KLCC (Petronas Towers), Bukit Bintang, Chinatown, and the iconic Sungai Kelang-Gombak confluence ("muddy confluence" — the literal meaning of Kuala Lumpur).', 'word', 'KL ialah ibu negara Malaysia.', '"KL is the capital of Malaysia".', null, [ACT.orientation]),
    createContentItem('Petaling Jaya (PJ)', 'pə.ta.liŋ dʒa.ja', 'KL\'s main satellite city in Selangor, planned in the 1950s. Home to Universiti Malaya (PJ campus is partly in Bandar Sunway area), many tech companies, and middle-class housing.', 'word', 'Saya tinggal di PJ.', '"I live in PJ" — common Klang Valley reply.', null, [ACT.orientation]),

    createContentItem('Bukit Bintang', 'bu.kit bin.taŋ', '"Star Hill" — KL\'s main shopping and nightlife district. Pavilion KL, Lot 10, Sungei Wang. Always crowded with tourists.', 'word', 'Bukit Bintang sentiasa sesak.', '"Bukit Bintang is always crowded" — sesak = congested.', null, [ACT.pronunciation]),
    createContentItem('Cheras', 'tʃə.ras', 'A large residential district southeast of KL central. Heavy Chinese-Malaysian population, famous food street.', 'word', 'Banyak kedai makan di Cheras.', '"Many restaurants in Cheras".', null, [ACT.pronunciation]),
    createContentItem('Pulau Pinang', 'pu.lau pi.naŋ', 'Penang state and island, home to George Town (UNESCO World Heritage). Often called "the Pearl of the Orient". Strong Hokkien-Chinese-Malaysian culture, famous for char kway teow and assam laksa.', 'word', 'Pulau Pinang terkenal dengan makanan.', '"Penang is famous for food".', null, [ACT.pronunciation]),
    createContentItem('Sarawak', 'sa.ra.waʔ', 'Largest Malaysian state, on Borneo. Capital Kuching ("Cat City"). Home to Iban, Bidayuh, Melanau, Penan indigenous peoples. Distinct culture from Peninsular Malaysia.', 'word', 'Kuching ialah ibu negeri Sarawak.', '"Kuching is the capital of Sarawak" — note "ibu negeri" (state capital) vs "ibu negara" (national capital).', null, [ACT.pronunciation]),
    createContentItem('Kota Kinabalu (KK)', 'ko.ta ki.na.ba.lu', 'Capital of Sabah, the other Borneo state. Named after Mount Kinabalu. Strong Kadazandusun cultural presence.', 'word', 'Mari pergi ke KK.', '"Let\'s go to KK".', null, [ACT.pronunciation]),

    // Places vocabulary
    createContentItem('rumah', 'ru.mah', 'HOUSE / HOME. Penultimate stress, soft final -h.', 'word', 'Rumah saya di Bangsar.', '"My house is in Bangsar".', null, [ACT.vocabularyPlaces]),
    createContentItem('bandar', 'ban.dar', 'CITY / TOWN. Rolled final r.', 'word', 'Bandar Kuala Lumpur.', '"The city of Kuala Lumpur".', null, [ACT.vocabularyPlaces]),
    createContentItem('kampung', 'kam.puŋ', 'VILLAGE — also a cultural concept. Many urban Malaysians "balik kampung" (return to the village) for Hari Raya — their parents\' rural hometown.', 'word', 'Saya balik kampung untuk Hari Raya.', '"I return to the village for Hari Raya" — the great national exodus from KL.', null, [ACT.vocabularyPlaces]),
    createContentItem('pasar', 'pa.sar', 'MARKET. "Pasar pagi" = morning market; "pasar malam" = night market (a Malaysian institution).', 'word', 'Pasar malam Bangsar setiap hari Ahad.', '"The Bangsar night market is every Sunday".', null, [ACT.vocabularyPlaces]),
    createContentItem('pasar raya', 'pa.sar ra.ja', 'SUPERMARKET — literal "big market". Distinct from "pasar" (traditional market).', 'word', 'Saya beli barang di pasar raya Tesco.', '"I buy groceries at Tesco supermarket".', null, [ACT.vocabularyPlaces]),
    createContentItem('kedai', 'kə.dai', 'SHOP / STORE. "Kedai makan" = restaurant; "kedai runcit" = grocery; "kedai mamak" = Indian-Muslim 24-hour eatery.', 'word', 'Kedai mamak buka 24 jam.', '"The mamak shop is open 24 hours" — a Malaysian institution.', null, [ACT.vocabularyPlaces]),
    createContentItem('masjid', 'mas.dʒid', 'MOSQUE. Masjid Negara (National Mosque) and Masjid Wilayah are KL landmarks. Arabic loan.', 'word', 'Masjid Negara di Kuala Lumpur.', '"The National Mosque is in KL".', null, [ACT.vocabularyPlaces]),
    createContentItem('gereja', 'gə.re.dʒa', 'CHURCH. Portuguese-origin word. Catholic and Protestant churches exist across Malaysia — St Mary\'s Cathedral KL, St John\'s Cathedral KL.', 'word', 'Gereja St Mary di Bukit Aman.', '"St Mary\'s Church is in Bukit Aman".', null, [ACT.vocabularyPlaces]),
    createContentItem('kuil', 'ku.il', 'HINDU TEMPLE. Distinct from "tokong" (Chinese/Buddhist temple). Batu Caves has the iconic Murugan kuil.', 'word', 'Kuil Batu Caves terkenal.', '"Batu Caves temple is famous" — Hindu Murugan temple.', null, [ACT.vocabularyPlaces]),
    createContentItem('tokong', 'to.koŋ', 'CHINESE / BUDDHIST TEMPLE. Distinct from "kuil" (Hindu).', 'word', 'Tokong Cheng Hoon Teng di Melaka.', '"Cheng Hoon Teng Temple in Melaka" — Malaysia\'s oldest Chinese temple.', null, [ACT.vocabularyPlaces]),
    createContentItem('bank', 'beŋk', 'BANK — English loan. Maybank, CIMB, Public Bank are the largest Malaysian banks.', 'word', 'Bank Maybank di hadapan KLCC.', '"Maybank is in front of KLCC".', null, [ACT.vocabularyPlaces]),
    createContentItem('hospital', 'hɔs.pi.tal', 'HOSPITAL — English loan. "Klinik" = clinic (smaller).', 'word', 'Hospital UM di Pantai Dalam.', '"UM Hospital is in Pantai Dalam".', null, [ACT.vocabularyPlaces]),
    createContentItem('pejabat pos', 'pə.dʒa.bat pos', 'POST OFFICE. POS Malaysia is the national postal service.', 'word', 'Pejabat pos di Pasar Seni.', '"The post office is in Pasar Seni".', null, [ACT.vocabularyPlaces]),
    createContentItem('stesen LRT', 'ste.sen el.ar.ti', 'LRT STATION. The Klang Valley LRT/MRT system is the urban rail network.', 'word', 'Stesen LRT KLCC dekat dengan Menara Petronas.', '"KLCC LRT station is near the Petronas Towers".', null, [ACT.vocabularyPlaces]),
    createContentItem('lapangan terbang', 'la.pa.ŋan tər.baŋ', 'AIRPORT. KLIA (Kuala Lumpur International Airport) is the main hub; klia2 for AirAsia and budget; Penang International, Senai (JB), Kuching, KK are regional.', 'word', 'KLIA ialah lapangan terbang utama Malaysia.', '"KLIA is Malaysia\'s main airport".', null, [ACT.vocabularyPlaces]),

    // Prepositions
    createContentItem('di', 'di', 'AT / IN / ON (static location). Used with place names: di KL, di rumah, di UM. WARNING: "di" is ALSO the passive verb marker — context tells you which.', 'sentence', 'Saya tinggal di Bangsar.', '"I live in Bangsar".', null, [ACT.vocabularyPrepositions]),
    createContentItem('ke', 'kə', 'TO (destination). "Saya pergi KE KLCC" = "I go TO KLCC". Schwa pronunciation.', 'sentence', 'Saya pergi ke pasar raya.', '"I go to the supermarket".', null, [ACT.vocabularyPrepositions]),
    createContentItem('dari', 'da.ri', 'FROM (origin). "Saya dari Penang" = "I am from Penang". Distinct from "daripada" (from a person/source, more formal).', 'sentence', 'Saya datang dari kampung di Kelantan.', '"I came from a village in Kelantan".', null, [ACT.vocabularyPrepositions]),
    createContentItem('antara', 'an.ta.ra', 'BETWEEN. "Antara KL dan PJ" = "between KL and PJ".', 'sentence', 'UM antara KL dan PJ.', '"UM is between KL and PJ".', null, [ACT.vocabularyPrepositions]),
    createContentItem('sebelah', 'sə.bə.lah', 'NEXT TO / BESIDE. "Di sebelah …" = "next to …". Also means "one side".', 'sentence', 'Bank di sebelah pejabat pos.', '"The bank is next to the post office".', null, [ACT.vocabularyPrepositions]),
    createContentItem('di hadapan', 'di ha.da.pan', 'IN FRONT OF. "Di hadapan UM" = "in front of UM".', 'sentence', 'Stesen LRT di hadapan rumah saya.', '"The LRT station is in front of my house".', null, [ACT.vocabularyPrepositions]),
    createContentItem('di belakang', 'di bə.la.kaŋ', 'BEHIND. "Di belakang …" = "behind …".', 'sentence', 'Taman di belakang sekolah.', '"The park is behind the school".', null, [ACT.vocabularyPrepositions]),
    createContentItem('di atas', 'di a.tas', 'ON TOP OF / ABOVE. "Di atas meja" = "on the table".', 'sentence', 'Buku di atas meja.', '"The book is on the table".', null, [ACT.vocabularyPrepositions]),
    createContentItem('di bawah', 'di ba.wah', 'UNDER. "Di bawah meja" = "under the table".', 'sentence', 'Kucing tidur di bawah kerusi.', '"The cat sleeps under the chair".', null, [ACT.vocabularyPrepositions]),
    createContentItem('berhampiran', 'bər.ham.pi.ran', 'NEAR / IN THE VICINITY. From ber- + hampir "close" + -an. More formal than "dekat dengan".', 'sentence', 'Hotel berhampiran KLCC.', '"The hotel is near KLCC".', null, [ACT.vocabularyPrepositions]),
    createContentItem('dekat dengan', 'də.kat də.ŋan', 'CLOSE TO. Casual everyday version.', 'sentence', 'Rumah saya dekat dengan stesen LRT.', '"My house is close to the LRT station".', null, [ACT.vocabularyPrepositions]),
    createContentItem('jauh dari', 'dʒauh da.ri', 'FAR FROM. "Rumah saya jauh dari kampus" = "My house is far from campus".', 'sentence', 'Putrajaya jauh dari KL.', '"Putrajaya is far from KL".', null, [ACT.vocabularyPrepositions]),

    // Grammar di
    createContentItem('di + place', 'di + place', 'Use DI as the static-location preposition before any place noun.', 'sentence', 'Saya tinggal di Bangsar. Mereka belajar di UM. Buku itu di atas meja.', 'Three "di" examples spanning living, studying, and object location.', null, [ACT.grammarDi]),
    createContentItem('di- passive vs di preposition', 'di- vs di', 'CRITICAL: "di-" attached to a verb is the PASSIVE marker (different morpheme): "buku dibaca" = "the book is read". "di rumah" with a space is the PREPOSITION. Same letters, very different grammar.', 'sentence', 'di rumah (preposition: "at home") / dimakan (passive verb: "is eaten")', 'The space matters. Modern BM writes "di-" passive attached, "di" preposition separate.', null, [ACT.grammarDi]),

    // Grammar ke
    createContentItem('ke + destination', 'kə + destination', 'Use KE before any destination: ke pasar, ke sekolah, ke Penang.', 'sentence', 'Saya pergi ke pasar pagi setiap hari Sabtu.', '"I go to the morning market every Saturday".', null, [ACT.grammarKe]),
    createContentItem('dari + origin', 'da.ri + origin', 'Use DARI to mark origin: dari KL, dari rumah, dari hospital. Distinct from "daripada" (from a person/source).', 'sentence', 'Saya pulang dari kerja.', '"I come home from work".', null, [ACT.grammarKe]),
    createContentItem('dari…ke… frame', 'da.ri kə', 'The journey frame: "Dari A KE B" = "From A to B". "Dari UM ke KLCC dengan LRT" = "From UM to KLCC by LRT".', 'sentence', 'Dari Penang ke KL ambil masa 4 jam dengan kereta.', '"From Penang to KL takes 4 hours by car".', null, [ACT.grammarKe]),

    // Grammar ada
    createContentItem('ada — existential', 'a.da', 'ADA means "there is / there are". "Di pasar ada banyak buah" = "At the market there are many fruits".', 'sentence', 'Di Cheras ada banyak kedai makan.', '"In Cheras there are many restaurants".', null, [ACT.grammarAda]),
    createContentItem('ada — possessive', 'a.da', 'ADA also means "have / has / has got". "Saya ada kereta" = "I have a car". Same word, two meanings recovered from context.', 'sentence', 'Awak ada masa esok?', '"Do you have time tomorrow?".', null, [ACT.grammarAda]),
    createContentItem('tiada / tidak ada', 'ti.a.da / ti.daʔ a.da', 'NEGATIVE of ada: "tiada" (formal-written) or "tidak ada" (polite spoken) or "takde" (casual).', 'sentence', 'Saya tiada wang. / Saya tidak ada wang. / Saya takde duit.', 'Three registers, same meaning ("I don\'t have money").', null, [ACT.grammarAda]),

    // Reading
    createContentItem('Sekitar KLCC', 'sə.ki.tar kel.si.si', 'A paragraph describing landmarks around KLCC.', 'sentence', 'Menara Berkembar Petronas terletak di tengah Kuala Lumpur. Di hadapan KLCC ada Suria KLCC, sebuah pusat membeli-belah yang besar. Di sebelah KLCC ada Taman KLCC yang dilengkapi dengan air pancut. Di belakang KLCC, Bukit Bintang berada lebih kurang dua kilometer ke selatan. Hotel-hotel mewah seperti Mandarin Oriental berhampiran KLCC.', 'A KL tourist-map paragraph covering Petronas Towers, Suria KLCC, KLCC Park, Bukit Bintang.', [
      { target: 'Menara Berkembar Petronas', note: 'Petronas Twin Towers — "menara berkembar" = "twin tower"' },
      { target: 'terletak', note: 'located — passive of "letak" (put/place)' },
      { target: 'pusat membeli-belah', note: 'shopping mall — "membeli-belah" = "shop-shop" with verbal reduplication' },
      { target: 'air pancut', note: 'fountain — literal "spurting water"' },
      { target: 'lebih kurang', note: 'approximately — literal "more less"' },
    ], [ACT.reading]),
    createContentItem('Soalan kefahaman', 'so.a.lan kə.fa.ha.man', 'Four comprehension questions that force the learner to track landmarks, relative position, distance, and nearby-place vocabulary from the route description.', 'sentence', 'Q1: Apa di hadapan KLCC? Q2: Di mana Bukit Bintang dari KLCC? Q3: Berapa jauh Bukit Bintang? Q4: Apa hotel berhampiran KLCC?', 'Answering them aloud turns the reading into practical direction-giving practice rather than a passive scan.', null, [ACT.reading]),

    // Listening
    createContentItem('Dialog: tanya jalan ke hotel', 'di.a.log: ta.ɲa dʒa.lan kə ho.tel', 'A 5-turn dialogue: an international tourist asks a local for directions in Bukit Bintang.', 'sentence', 'Pelancong: Maaf, encik. Saya cari Hotel Royal Bintang. Boleh tolong tunjukkan jalan?\nLelaki: Hotel Royal Bintang? Jalan terus, kemudian belok kiri di lampu isyarat. Hotel itu di sebelah kanan.\nPelancong: Berapa jauh dari sini?\nLelaki: Lebih kurang lima minit berjalan kaki.\nPelancong: Baik, terima kasih banyak-banyak.', 'Direction-asking dialogue with key direction words.', [
      { target: 'Maaf, encik', note: '"Excuse me, sir" — polite opener with title' },
      { target: 'tunjukkan jalan', note: '"show the way" — me-kan transitive' },
      { target: 'jalan terus', note: '"go straight"' },
      { target: 'belok kiri/kanan', note: '"turn left/right"' },
      { target: 'lampu isyarat', note: 'traffic light — literal "signal light"' },
      { target: 'berjalan kaki', note: '"walk" — literal "walk on foot"' },
    ], [ACT.listening]),

    // Writing
    createContentItem('Tulis tentang kawasan rumah awak', 'tu.lis tən.taŋ ka.wa.san ru.mah a.waʔ', '5-sentence template describing your neighborhood.', 'sentence', 'Saya tinggal di ___. Di hadapan rumah saya ada ___. Di sebelah ada ___. Stesen LRT terdekat ialah ___, lebih kurang ___ minit berjalan kaki. Saya suka kawasan ini kerana ___.', 'Practice all prepositions.', null, [ACT.writing]),

    // Culture
    createContentItem('Lapan bandar utama Malaysia', 'la.pan ban.dar u.ta.ma ma.lai.si.a', 'Malaysia\'s eight major cities: Kuala Lumpur (capital), Shah Alam (Selangor capital), George Town (Penang), Ipoh (Perak), Johor Bahru (Johor), Melaka, Kuching (Sarawak), Kota Kinabalu (Sabah).', 'sentence', 'Setiap negeri ada bandar utama sendiri.', '"Every state has its own main city" — Malaysia is federally organized, with 13 states + 3 federal territories.', null, [ACT.culture]),
    createContentItem('Putrajaya — pentadbiran', 'put.ra.dʒa.ja — pən.tad.bi.ran', 'Putrajaya is Malaysia\'s administrative capital (since 1999) — federal government offices, the PM\'s office, ministries are HERE, not in KL. KL remains the commercial/parliamentary capital.', 'sentence', 'Pejabat Perdana Menteri di Putrajaya.', '"The PM\'s office is in Putrajaya".', null, [ACT.culture]),
    createContentItem('KL ke Singapura', 'kel kə si.ŋa.pu.ra', 'KL to Singapore is about 350 km, 4 hours by car via PLUS Expressway. The Causeway at JB-Singapore is the busiest land border in the world. Bahasa Melayu is one of Singapore\'s 4 official languages — and is the national language by constitution.', 'sentence', 'Dari KL ke Singapura, anda boleh memandu, naik bas, atau terbang.', '"From KL to Singapore, you can drive, take a bus, or fly".', null, [ACT.culture]),

    // Task
    createContentItem('Tugasan: bagi arah ke KLCC', 'tu.ga.san: ba.gi a.rah kə kel.si.si', 'Roleplay giving directions from UM to KLCC.', 'sentence', 'Scene: Seorang pelancong di UM bertanya jalan ke KLCC.', 'Use ke, dari, di, belok, lurus.', null, [ACT.task]),
  ],
};

module.exports = lesson;
