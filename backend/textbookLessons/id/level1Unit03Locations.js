// Level 1 Unit 3 — Locations & Directions (Bahasa Indonesia)
// Functions: asking and giving directions on the UI Depok campus, talking
// about places in Jakarta, using spatial prepositions di / ke / dari, and
// the basic directional vocabulary (kanan, kiri, lurus, belok).

const createContentItem = (target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization, nativeText: note, pronunciation: romanization,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'id-l1u3-orientation',
  pronunciation: 'id-l1u3-pronunciation',
  vocabularyPlaces: 'id-l1u3-vocab-places',
  vocabularyDirections: 'id-l1u3-vocab-directions',
  grammarPrepositions: 'id-l1u3-grammar-prepositions',
  grammarKeMana: 'id-l1u3-grammar-ke-mana',
  grammarImperatives: 'id-l1u3-grammar-imperatives',
  reading: 'id-l1u3-reading',
  listening: 'id-l1u3-listening',
  writing: 'id-l1u3-writing',
  culture: 'id-l1u3-culture',
  task: 'id-l1u3-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: [
    'Name 15+ places on the UI Depok campus and in Jakarta (perpustakaan, kantin, masjid, halte, stasiun, Monas) and use them in directional questions.',
    'Ask and answer "Di mana X?" / "Bagaimana cara ke X?" / "Berapa jauh dari sini?" — the three core directions questions.',
    'Give a multi-step direction using lurus, belok kiri/kanan, sampai, di sebelah.',
  ], task: 'Imagine you arrive at Stasiun UI by KRL (commuter rail) and need to find Perpustakaan Pusat. By the end of this unit, you can ask for directions and follow them in spoken Indonesian.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in location vocabulary', goals: [
    'Pronounce "perpustakaan" /pərpustakaˈan/ — a six-syllable word with two schwas; an exercise in schwa-keeping rhythm.',
    'Apply the digraph rule to "kanan" /kanan/ vs "Manggarai" /maŋˈgarai/ — the second has ngg = /ŋg/ with both nasal and stop pronounced.',
    'Pronounce "Indonesia" /indoˈnesia/ in slow careful speech, /indoˈnesja/ in casual fast speech — both are acceptable; choose by register.',
  ], task: 'Read fifteen location words; identify schwas and digraphs.' },
  { id: ACT.vocabularyPlaces, section: 'Vocabulary I', title: 'Places on campus and in the city', goals: [
    'Memorize 15 high-frequency place words: kampus, fakultas, perpustakaan, kantin, masjid, gereja, asrama, halte, stasiun, bandara, pasar, mall, rumah sakit, bank, kantor pos.',
  ], task: 'Match each place to its function and a typical activity.' },
  { id: ACT.vocabularyDirections, section: 'Vocabulary II', title: 'Directional terms and prepositions', goals: [
    'Use lurus (straight), belok kanan/kiri (turn right/left), sampai (until/up to), di sebelah (next to), di depan (in front of), di belakang (behind), di antara (between).',
  ], task: 'Give a 3-step direction from your room to the nearest food place.' },
  { id: ACT.grammarPrepositions, section: 'Grammar I', title: 'di / ke / dari', goals: [
    'Use di for static location ("at, in, on"): "Saya di rumah" (I am at home).',
    'Use ke for direction toward ("to"): "Saya pergi ke kampus" (I go to campus).',
    'Use dari for origin ("from"): "Saya datang dari Jakarta" (I come from Jakarta).',
    'CRITICAL: do not confuse di + verb (=at + verb) with the passive di- prefix (di + verb stem with no space) — di-makan (eaten) vs di kantin (at the cafeteria).',
  ], task: 'Write five sentences mixing di, ke, dari with different place nouns.' },
  { id: ACT.grammarKeMana, section: 'Grammar II', title: 'Question patterns: di mana, ke mana, dari mana', goals: [
    'Form the three location questions by combining the preposition with mana (where): "Di mana?" (where at?), "Ke mana?" (where to?), "Dari mana?" (where from?).',
    'Use bagaimana cara (how the way) for "how do I get to": "Bagaimana cara ke Perpustakaan Pusat?".',
    'Use berapa jauh (how far) for distance: "Berapa jauh dari sini?".',
  ], task: 'Convert five English direction questions into Indonesian using the right preposition + mana.' },
  { id: ACT.grammarImperatives, section: 'Grammar III', title: 'Polite imperatives with tolong / silakan', goals: [
    'Use tolong (please, requesting help) before a bare verb: "Tolong belok kiri" (Please turn left).',
    'Use silakan (please, granting permission/inviting) before a bare verb: "Silakan masuk" (Please come in).',
    'Add -lah for slight emphasis in commands: "Datanglah ke kelas tepat waktu" (Do come to class on time).',
  ], task: 'Rewrite five blunt commands as polite requests using tolong or silakan.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'Read a campus map description', goals: [
    'Read a paragraph describing the layout of UI Depok\'s central plaza.',
    'Answer 5 comprehension questions about which building is where.',
  ], task: 'Read and answer.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'Asking for directions at Stasiun UI', goals: [
    'Follow a 6-turn dialogue between a confused newcomer and a friendly local at Stasiun UI; identify directional verbs.',
    'Reproduce the dialogue switching roles.',
  ], task: 'Read along, then perform.' },
  { id: ACT.writing, section: 'Writing', title: 'Describe your daily route', goals: [
    'Write 5 sentences describing your route from home/dorm to your first class.',
    'Use at least three different prepositions (di, ke, dari) and one polite imperative.',
  ], task: 'Write and read aloud.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Jakarta-Depok-Bogor commute and Jabodetabek', goals: [
    'Understand the Jabodetabek (Jakarta-Bogor-Depok-Tangerang-Bekasi) commuter belt and why UI students often live in Depok and work in Jakarta.',
    'Recognize the KRL Commuter Line as the standard student transport and the ojek online (Gojek, Grab) for last-mile.',
  ], task: 'Map your route on a Jabodetabek map; identify three KRL stations relevant to UI students.' },
  { id: ACT.task, section: 'Task', title: 'Find your way from Stasiun UI to your fakultas', goals: [
    'Complete a 6-turn navigation scene asking a local for directions and following them.',
  ], task: 'Roleplay with the AI tutor.' },
];

const lesson = {
  title: 'Level 1 · Unit 3: Di Mana? — Locations and Directions',
  category: 'locations',
  difficulty: 'beginner',
  targetLang: 'id',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-where', label: 'Asking where', goal: 'Ask and answer "Di mana X?" with confident location vocabulary.' },
    { id: 'giving-directions', label: 'Giving directions', goal: 'Provide a multi-step direction using lurus, belok, sampai, di sebelah.' },
    { id: 'distance-questions', label: 'Distance', goal: 'Use berapa jauh and respond with metric distance.' },
  ],
  relatedPools: ['topic-places', 'topic-transportation'],
  content: [
    // Activity 1
    createContentItem('Tujuan unit', 'tu-juan u-nit', 'By the end of this unit you can navigate Universitas Indonesia\'s Depok campus and central Jakarta in Indonesian — asking directions, giving directions, identifying buildings, and using the di/ke/dari preposition system fluidly.', 'word', 'Saya bisa bertanya arah dan mengikuti petunjuk dalam bahasa Indonesia.', '"I can ask for directions and follow instructions in Indonesian" — core unit competency statement.', null, [ACT.orientation]),
    createContentItem('Skenario: dari Stasiun UI ke Perpustakaan Pusat', 'skə-na-ri-o', 'You step off the KRL Commuter Line at Stasiun UI in Depok. The Universitas Indonesia campus opens behind the station, with Danau Kenanga (Kenanga Lake) visible to the left. You need to reach Perpustakaan Pusat — UI\'s central library, the iconic dome-roofed building visible from anywhere in the campus.', 'word', 'Permisi, Pak. Bagaimana cara ke Perpustakaan Pusat dari sini?', 'Standard polite direction-asking sentence; Pak as direct address; bagaimana cara as the "how-to" formula.', null, [ACT.orientation]),

    // Activity 2 — Pronunciation
    createContentItem('perpustakaan', 'pər-pus-ta-ka-an', 'A six-syllable word for "library": peN- + pustaka + -an, with sandhi making peN- → per- (the er- is schwa). Two schwas (per-, the unstressed first vowel). Stress on the penultimate /ka/. Common in academic settings: "perpustakaan pusat" = central library, "perpustakaan fakultas" = faculty library.', 'word', 'Perpustakaan Pusat UI buka pukul 8 pagi.', '"UI\'s central library opens at 8am" — pukul = o\'clock (formal) / time-marker.', null, [ACT.pronunciation]),
    createContentItem('Manggarai', 'maŋ-ga-rai', 'A major train station in central Jakarta — the main transfer hub between KRL lines. The ngg = /ŋg/ with both nasal and stop pronounced (compare angka /aŋka/ with no /g/). Important station name for any UI student traveling to central Jakarta.', 'word', 'Pindah kereta di Stasiun Manggarai.', '"Transfer trains at Manggarai Station" — pindah = transfer; standard commuter announcement.', null, [ACT.pronunciation]),
    createContentItem('Yogyakarta', 'jog-ja-kar-ta', 'A major city in Java, home to Universitas Gadjah Mada (UGM). Casually shortened to Jogja (the spelling Jogja is now official tourist usage). The Yo- is silent in most pronunciations: /jogˈjakarta/ or just /jogja/ in fast speech.', 'word', 'Saya dari Yogyakarta.', '"I am from Yogyakarta" — common origin statement; Jogja is the casual alternative.', null, [ACT.pronunciation]),
    createContentItem('Bandung', 'ban-dung', 'A major city in West Java, home to Institut Teknologi Bandung (ITB) and a hill-station climate. Stress on /ban/, final ng = /ŋ/. The cooler air at 768m altitude makes Bandung a popular weekend escape from Jakarta\'s heat.', 'word', 'Kami akan pergi ke Bandung akhir pekan ini.', '"We will go to Bandung this weekend" — kami exclusive; akan = future marker.', null, [ACT.pronunciation]),
    createContentItem('Surabaya', 'su-ra-ba-ja', 'Indonesia\'s second-largest city, capital of East Java. Stress on /ba/, the y in Surabaya is pronounced /j/ (Indonesian convention). Home to ITS (Institut Teknologi Sepuluh Nopember) and historically the "city of heroes" (kota pahlawan) for Independence Day events.', 'word', 'Surabaya kota pahlawan.', '"Surabaya, city of heroes" — historical epithet honoring the November 1945 battle.', null, [ACT.pronunciation]),

    // Activity 3 — Places vocabulary
    createContentItem('kampus', 'kam-pus', 'A university campus. Used as a count noun: "kampus UI", "kampus utama" (main campus). The English loan has fully assimilated; native speakers don\'t recognize it as foreign.', 'word', 'Kampus UI luas sekali.', '"The UI campus is very spacious" — luas = wide/spacious; sekali intensifier.', null, [ACT.vocabularyPlaces]),
    createContentItem('fakultas', 'fa-kul-tas', 'A faculty (academic division within a university). UI has 14 fakultas including Fasilkom (computer science), FE (economics), FH (law), FK (medicine). Etymologically from Latin via Dutch "faculteit".', 'word', 'Saya kuliah di Fakultas Ilmu Komputer.', '"I study at the Faculty of Computer Science" — typical UI student response when asked about academic affiliation.', null, [ACT.vocabularyPlaces]),
    createContentItem('perpustakaan', 'pər-pus-ta-ka-an', 'A library. The central UI library, Perpustakaan Pusat, has the distinctive dome-shaped roof visible from across the campus — featured on UI postcards and Instagram.', 'word', 'Saya belajar di perpustakaan tiap hari.', '"I study at the library every day" — tiap = every (casual short form of setiap).', null, [ACT.vocabularyPlaces]),
    createContentItem('kantin', 'kan-tin', 'A cafeteria, canteen. UI has many — every fakultas has its own kantin with affordable food. The Kansas (Kantin Sastra at FIB) and Kanfas (Kantin Fasilkom) are famous student lunch spots.', 'word', 'Mau ke kantin? Saya lapar.', '"Want to go to the cafeteria? I\'m hungry" — mau = want; lapar = hungry.', null, [ACT.vocabularyPlaces]),
    createContentItem('masjid', 'mas-dʒid', 'A mosque. Every UI fakultas has its own musholla (small prayer room) and the central Masjid Ukhuwah Islamiyah serves as the campus mosque. Arabic-loan word; the dʒ is the Indonesian j.', 'word', 'Salat di Masjid Ukhuwah.', '"Pray at Masjid Ukhuwah" — salat = the five-times-daily prayer.', null, [ACT.vocabularyPlaces]),
    createContentItem('asrama', 'as-ra-ma', 'A dormitory. UI has student dormitories (Asrama UI) in Depok for first-year students and international students. Capacity is limited and competitive; most students rent kos (boarding rooms) off-campus.', 'word', 'Kamar saya di Asrama UI nomor 312.', '"My room is in UI Dormitory number 312" — kamar = room; nomor = number.', null, [ACT.vocabularyPlaces]),
    createContentItem('halte', 'hal-te', 'A bus stop. The Trans-Jakarta BRT (Bus Rapid Transit) system uses halte; the regular city bus stops are also halte. Loanword from Dutch "halte" (stop).', 'word', 'Halte bus di depan kampus.', '"The bus stop is in front of the campus" — di depan = in front of.', null, [ACT.vocabularyPlaces]),
    createContentItem('stasiun', 'sta-si-un', 'A station, specifically a train station. Stasiun UI is the KRL stop directly serving the Depok campus; Stasiun Manggarai is the central Jakarta transfer hub. Loanword from Dutch "station".', 'word', 'Saya naik KRL di Stasiun UI.', '"I take the KRL at Stasiun UI" — naik = ride/board (a vehicle).', null, [ACT.vocabularyPlaces]),
    createContentItem('bandara', 'ban-da-ra', 'An airport. Acronym from "bandar udara" (sea-port-of-air). Indonesia\'s main international airport is Bandara Soekarno-Hatta (SHIA, CGK) in Tangerang, west of Jakarta; secondary is Bandara Halim Perdanakusuma for domestic.', 'word', 'Saya tiba di Bandara Soekarno-Hatta kemarin.', '"I arrived at Soekarno-Hatta Airport yesterday" — tiba = arrive (formal); kemarin = yesterday.', null, [ACT.vocabularyPlaces]),
    createContentItem('pasar', 'pa-sar', 'A market (traditional). Jakarta has many famous pasar: Pasar Baru, Pasar Tanah Abang (largest textile market in SE Asia), Pasar Senen. Different from "mall" (Western shopping mall) and "supermarket" (large self-service grocery store).', 'word', 'Pasar tradisional buka sejak jam 4 pagi.', '"The traditional market opens from 4am" — buka sejak = open since.', null, [ACT.vocabularyPlaces]),
    createContentItem('mall', 'mol', 'A shopping mall. Indonesian pronunciation /mol/ (not English /mɔːl/). Jakarta has hundreds: Grand Indonesia, Plaza Senayan, Pondok Indah Mall, Mall of Indonesia. The mall is a primary social/dating space for urban Indonesians.', 'word', 'Akhir pekan ke mall, yuk!', '"Let\'s go to the mall this weekend!" — yuk = casual let\'s-do-it particle.', null, [ACT.vocabularyPlaces]),
    createContentItem('rumah sakit', 'ru-mah sa-kit', 'A hospital, literally "sick-house". Singular even though it sounds plural; abbreviated RS in writing. UI\'s teaching hospital is RSUI (Rumah Sakit Universitas Indonesia) in Depok; the central public hospital is RSCM (RS Cipto Mangunkusumo) in Central Jakarta.', 'word', 'Saya pergi ke RSCM untuk pemeriksaan.', '"I go to RSCM for a check-up" — pemeriksaan = examination, peN-…-an on root periksa.', null, [ACT.vocabularyPlaces]),
    createContentItem('bank', 'baŋ', 'A bank. Indonesian pronunciation drops the final k and pronounces as /baŋ/ with a single nasal. Major banks: BCA (Bank Central Asia), BRI (Bank Rakyat Indonesia), Mandiri, BNI. Students at UI typically have a BNI account because of the campus partnership.', 'word', 'ATM bank di pojok kampus.', '"The bank ATM is at the corner of campus" — di pojok = at the corner.', null, [ACT.vocabularyPlaces]),
    createContentItem('kantor pos', 'kan-tor pos', 'A post office. Compound of kantor (office) + pos (post, from Dutch "post"). Less central in daily life now due to digital services, but still needed for sending packages to and from villages.', 'word', 'Kirim paket di kantor pos terdekat.', '"Send the package at the nearest post office" — kirim = send; terdekat = nearest, ter- superlative on root dekat.', null, [ACT.vocabularyPlaces]),
    createContentItem('Monas', 'mo-nas', 'Monumen Nasional (National Monument), the 132m tall obelisk in Central Jakarta that is the city\'s most famous landmark. Built 1961-75 by Sukarno to commemorate Indonesian independence. Surrounding Lapangan Monas is the largest open green space in central Jakarta.', 'word', 'Mari kita pergi ke Monas akhir pekan ini.', '"Let\'s go to Monas this weekend" — mari kita = inclusive let\'s.', null, [ACT.vocabularyPlaces]),

    // Activity 4 — Directional terms
    createContentItem('lurus', 'lu-rus', 'Straight, straight ahead. Used as both adjective and adverbial direction: "jalan lurus" (straight street), "Lurus saja!" (just go straight). Direction-giving staple.', 'word', 'Lurus saja sampai pertigaan.', '"Just go straight until the three-way intersection" — saja = just/only; pertigaan = three-way (per-...-an on tiga "three").', null, [ACT.vocabularyDirections]),
    createContentItem('belok kanan', 'be-lok ka-nan', 'Turn right. Belok = turn (verb), kanan = right. Imperative "Belok kanan!" or with politeness "Tolong belok kanan". Critical in any direction-giving context.', 'word', 'Di lampu merah belok kanan.', '"At the red light turn right" — lampu merah = traffic light (red lamp).', null, [ACT.vocabularyDirections]),
    createContentItem('belok kiri', 'be-lok ki-ri', 'Turn left. Same pattern as belok kanan. Note: in Indonesia, traffic drives on the LEFT (inherited from British/Dutch road conventions), so "belok kiri" is the easier turn (no oncoming traffic).', 'word', 'Belok kiri di pertigaan kedua.', '"Turn left at the second three-way intersection" — kedua = ordinal "second" with ke- prefix on dua.', null, [ACT.vocabularyDirections]),
    createContentItem('sampai', 'sam-pai', 'Until / up to / arrive at. Both a preposition and a verb. "Sampai jumpa" = "until meeting (again)" = goodbye. "Sampai di sana" = "arrive there".', 'word', 'Lurus sampai pertigaan, lalu belok kanan.', '"Straight until the intersection, then turn right" — lalu = then.', null, [ACT.vocabularyDirections]),
    createContentItem('di sebelah', 'di sə-bə-lah', '"Next to / beside". The sebelah refers to a side or part. "Di sebelah kanan" = on the right side, "di sebelah kiri" = on the left side. Most common direction-giving phrase for spatial reference.', 'word', 'Perpustakaan di sebelah kantin.', '"The library is next to the cafeteria" — sebelah covers what English does with "next to / beside".', null, [ACT.vocabularyDirections]),
    createContentItem('di depan', 'di də-pan', 'In front of, in front. "Di depan masjid" (in front of the mosque), "Ada taman di depan" (there is a garden in front). Common in direction-giving.', 'word', 'Halte di depan gerbang kampus.', '"The bus stop is in front of the campus gate" — gerbang = gate.', null, [ACT.vocabularyDirections]),
    createContentItem('di belakang', 'di bə-la-kang', 'Behind, in the back. "Di belakang gedung" (behind the building). The belakang root also appears in "ke belakang" (go to the back) and idiomatically in "buang air ke belakang" (use the bathroom — euphemism).', 'word', 'Parkiran di belakang gedung.', '"The parking lot is behind the building" — parkiran = parking lot, -an suffix on "parkir" loanword.', null, [ACT.vocabularyDirections]),
    createContentItem('di antara', 'di an-ta-ra', 'Between. "Di antara A dan B" = between A and B. "Kantin di antara perpustakaan dan masjid" (The cafeteria is between the library and the mosque).', 'word', 'Gedung kuliah di antara dua taman.', '"The lecture building is between two parks" — taman = park/garden.', null, [ACT.vocabularyDirections]),

    // Activity 5 — Grammar I: prepositions
    createContentItem('di (static location)', 'di', 'Static location preposition: "at, in, on". Used with place nouns: di rumah (at home), di kampus (at campus), di kantin (at the cafeteria), di Jakarta (in Jakarta). CRITICAL DISTINCTION: di + space + noun = preposition; di- + verb stem (no space) = passive prefix.', 'sentence', 'Saya di rumah. Buku di meja. Kelas di gedung ini.', 'Three di sentences in different scales (home, table, building).', [
      { target: 'di + noun (preposition)', note: '"at/in/on X" — di written with a space before the noun' },
      { target: 'di- + verb (passive)', note: '"X-ed (by someone)" — di- written attached to the verb, no space' },
      { target: 'di rumah vs dimakan', note: 'di rumah = at home; dimakan = is eaten — same letters, different spacing matters' },
    ], [ACT.grammarPrepositions]),
    createContentItem('ke (direction toward)', 'ke', 'Directional preposition: "to". Used with motion verbs: "pergi ke kampus" (go to campus), "datang ke kelas" (come to class), "pindah ke Jakarta" (move to Jakarta). Unstressed schwa /kə/.', 'sentence', 'Saya pergi ke kantor. Dia datang ke rumah saya.', 'Two motion-toward sentences.', null, [ACT.grammarPrepositions]),
    createContentItem('dari (origin)', 'da-ri', 'Origin preposition: "from". Used with both spatial origins and temporal origins: "dari Jakarta" (from Jakarta), "dari pagi sampai sore" (from morning to afternoon). Combined with mana: "dari mana?" = "where from?".', 'sentence', 'Saya datang dari Yogyakarta. Surat ini dari teman saya.', 'Two from-sentences in different domains.', null, [ACT.grammarPrepositions]),
    createContentItem('Three-preposition contrast', 'di / ke / da-ri', 'The trio answers three distinct questions: di = where AT; ke = where TO; dari = where FROM. Many Indonesian sentences combine multiple: "Saya pergi dari rumah ke kampus melewati Stasiun UI" (I go from home to campus passing through Stasiun UI).', 'sentence', 'Saya di kantor sekarang. Sebelumnya saya datang dari kampus. Nanti saya pergi ke rumah.', '"I am at the office now. Earlier I came from campus. Later I will go home" — three-preposition narrative across time.', null, [ACT.grammarPrepositions]),

    // Activity 6 — Grammar II: question patterns
    createContentItem('Di mana ...?', 'di ma-na', '"Where is ...?" — the static location question. Word order: Di mana + noun? OR Noun + di mana? Both grammatical, the first is more common.', 'sentence', 'Di mana perpustakaan? = Perpustakaan di mana? — Di sebelah masjid.', 'Two equivalent question forms with one answer; sebelah = next to.', null, [ACT.grammarKeMana]),
    createContentItem('Ke mana ...?', 'kə ma-na', '"Where to?" — direction-toward question. "Anda ke mana?" / "Mau ke mana?" — common everyday greetings (similar to English "where are you off to?").', 'sentence', 'Mau ke mana? — Saya mau ke kantin.', '"Where are you going? — I want to go to the cafeteria" — mau adds both intention and direction.', null, [ACT.grammarKeMana]),
    createContentItem('Dari mana ...?', 'da-ri ma-na', '"Where from?" — origin question. "Dari mana, Pak?" or "Anda dari mana?" — used both for ongoing journey ("where have you just come from?") and for origin ("where are you from originally?"). Context disambiguates.', 'sentence', 'Dari mana? — Dari kelas.', '"Where (have you come) from? — From class" — minimal exchange.', null, [ACT.grammarKeMana]),
    createContentItem('Bagaimana cara ke X?', 'ba-gai-ma-na ca-ra kə X', '"How (does one go) to X?" — the formula for asking directions. Bagaimana = how; cara = way/manner; ke = to. Equivalent to English "How do I get to X?".', 'sentence', 'Bagaimana cara ke Perpustakaan Pusat dari sini? — Lurus saja sampai pertigaan, lalu belok kiri.', 'Standard direction-asking pattern; the answer uses lurus + sampai + belok.', null, [ACT.grammarKeMana]),
    createContentItem('Berapa jauh?', 'bə-ra-pa dʒa-uh', '"How far?" — distance question. Reply with a measurement: 200 meter, 1 kilometer, "lima menit jalan kaki" (5 minutes walking). Berapa = how-much/many; jauh = far.', 'sentence', 'Berapa jauh dari sini? — Sekitar dua kilometer.', '"How far from here? — About two kilometers" — sekitar = approximately.', null, [ACT.grammarKeMana]),

    // Activity 7 — Imperatives
    createContentItem('tolong (please request)', 'to-long', 'A polite request marker, used BEFORE a bare verb. "Tolong belok kiri" (Please turn left), "Tolong tutup pintu" (Please close the door). Tolong literally means "help" and signals that you are asking for assistance.', 'sentence', 'Tolong tulis nama Anda di sini.', '"Please write your name here" — tolong + bare verb; the verb tulis has no prefix.', null, [ACT.grammarImperatives]),
    createContentItem('silakan (please grant/invite)', 'si-la-kan', 'A polite invitation marker, used BEFORE a bare verb. "Silakan duduk" (Please sit), "Silakan masuk" (Please come in). Different from tolong: tolong asks for help, silakan invites or grants permission. Hosts and shopkeepers use silakan; askers use tolong.', 'sentence', 'Silakan masuk. Silakan duduk.', '"Please come in. Please sit" — host-to-guest welcoming sequence.', null, [ACT.grammarImperatives]),
    createContentItem('-lah emphatic particle', '-lah', 'An emphatic enclitic attached to the verb in imperatives: "Datanglah tepat waktu" (Do come on time), "Ambillah ini" (Please take this). -lah softens the command slightly and adds gentle insistence.', 'sentence', 'Datanglah ke kelas tepat waktu.', '"Do come to class on time" — -lah adds emphasis without harshness.', null, [ACT.grammarImperatives]),
    createContentItem('mari / ayo (let\'s)', 'ma-ri / a-yo', 'Inclusive "let\'s" markers. Mari (more formal) and ayo (more casual) both precede a verb to propose joint action: "Mari kita pergi" / "Ayo pergi" (Let\'s go). Always with kita (inclusive we), implicitly or explicitly.', 'sentence', 'Mari kita istirahat sebentar. Ayo pulang!', '"Let\'s rest for a moment. Let\'s go home!" — mari more formal, ayo more casual.', null, [ACT.grammarImperatives]),

    // Activity 8 — Reading
    createContentItem('Peta kampus UI', 'pe-ta kam-pus u-i', 'A six-sentence description of the central UI Depok plaza. Read aloud with smooth rhythm.', 'sentence', 'Kampus UI di Depok sangat luas. Di tengah kampus ada Danau Kenanga yang besar. Perpustakaan Pusat di sebelah danau, dengan atap kubah yang ikonik. Fakultas Ilmu Komputer di sebelah utara perpustakaan. Masjid Ukhuwah Islamiyah di selatan, dekat asrama. Untuk menuju kantin pusat, jalan saja lurus dari Stasiun UI sekitar 500 meter.', '"The UI campus in Depok is very spacious. In the middle of the campus there is a large Kenanga Lake. The Central Library is next to the lake, with its iconic dome roof. The Faculty of Computer Science is to the north of the library. The Ukhuwah Islamiyah Mosque is to the south, near the dormitory. To reach the central cafeteria, just walk straight from Stasiun UI for about 500 meters."', null, [ACT.reading]),
    createContentItem('Pertanyaan pemahaman', 'pər-ta-ɲa-an', 'Five comprehension questions. Answer in complete short Indonesian sentences.', 'sentence', '1) Apa nama danau di tengah kampus? 2) Di mana Perpustakaan Pusat? 3) Apa yang ikonik dari perpustakaan? 4) Berapa jauh kantin dari Stasiun UI? 5) Di sebelah mana masjid?', 'Five wh-questions across the paragraph content.', null, [ACT.reading]),

    // Activity 9 — Listening
    createContentItem('Bertanya arah di Stasiun UI', 'bər-ta-ɲa a-rah', 'A 6-turn dialogue: a newcomer asks a friendly local at Stasiun UI for directions to the Fasilkom building.', 'conversation', 'Pendatang: Permisi, Pak. Boleh tanya?\nWarga: Tentu, silakan.\nPendatang: Bagaimana cara ke gedung Fasilkom dari sini?\nWarga: Oh, mudah. Keluar dari stasiun, belok kiri, lurus sekitar 300 meter sampai pertigaan, lalu belok kanan. Gedung Fasilkom di sebelah kanan.\nPendatang: Berapa jauh kira-kira?\nWarga: Sekitar 5 menit jalan kaki.\nPendatang: Terima kasih banyak, Pak!\nWarga: Sama-sama. Selamat berkuliah!', 'Standard polite arah-asking exchange; the local provides a multi-step direction.', null, [ACT.listening]),

    // Activity 10 — Writing
    createContentItem('Tulis rute harian Anda', 'tu-lis ru-te ha-ri-an an-da', 'Write 5 sentences describing your daily route from home/dorm to your first class. Use di, ke, dari, plus at least one directional verb.', 'sentence', 'Contoh: Setiap pagi saya keluar dari asrama UI. Saya jalan kaki ke halte bus dekat gerbang. Dari halte saya naik bus ke gedung Fasilkom. Bus saya melewati Perpustakaan Pusat dan Danau Kenanga. Perjalanan kira-kira 15 menit.', '"Example: Every morning I leave the UI dorm. I walk to the bus stop near the gate. From the bus stop I take a bus to the Fasilkom building. My bus passes the central library and Kenanga Lake. The trip takes about 15 minutes."', null, [ACT.writing]),

    // Activity 11 — Culture
    createContentItem('Jabodetabek commuter belt', 'dʒa-bo-de-ta-bek', 'Jabodetabek = Jakarta-Bogor-Depok-Tangerang-Bekasi, the metropolitan commuter belt of about 30 million people. Many UI students live in Depok (campus location) and commute via KRL to Jakarta for internships and weekend activities; many lecturers commute the opposite direction from South Jakarta.', 'sentence', 'Jabodetabek adalah wilayah metropolitan terbesar di Indonesia.', '"Jabodetabek is the largest metropolitan region in Indonesia" — wilayah = region; terbesar = largest (ter- superlative).', null, [ACT.culture]),
    createContentItem('KRL Commuter Line', 'ke-er-el kom-mu-ter lain', 'The KRL (Kereta Rel Listrik = electric rail train) is the urban commuter rail run by KAI Commuter. The line serving UI is the Bogor Line (Jakarta Kota → Bogor) with Stasiun UI as a major student stop. Fare: ~Rp 3,000-5,000 with a tap-card (kartu KMT or e-money).', 'sentence', 'Saya naik KRL setiap hari dari Stasiun Depok.', '"I take the KRL every day from Stasiun Depok" — Stasiun Depok is the station after Stasiun UI on the Bogor Line.', null, [ACT.culture]),
    createContentItem('Ojek online (Gojek, Grab)', 'o-dʒek on-lain', 'Motorcycle taxi summoned via app — Gojek (Indonesian unicorn) and Grab (Singaporean) dominate. The standard last-mile solution from KRL station to your destination. UI students rely on ojek for late-night returns from Jakarta when KRL stops running.', 'sentence', 'Pesan ojek online dari halte ke asrama.', '"Order an online ojek from the bus stop to the dorm" — pesan = order; ojek = motorcycle-taxi.', null, [ACT.culture]),

    // Activity 12 — Task
    createContentItem('Tugas akhir unit: cari fakultas Anda', 'tu-gas a-xir', 'Roleplay arriving at Stasiun UI for the first time and asking a local for directions to your specific fakultas. The AI tutor plays the friendly local.', 'conversation', '[Stasiun UI, pintu keluar selatan]\nKamu: [salam + permisi]\nWarga: [respons ramah]\nKamu: [tanya arah ke fakultas Anda]\nWarga: [berikan petunjuk langkah-demi-langkah]\nKamu: [klarifikasi atau tanya berapa jauh]\nWarga: [menjawab]\nKamu: [berterima kasih + pamit]', 'Seven-turn full arah scene.', null, [ACT.task]),
  ],
};

module.exports = lesson;
