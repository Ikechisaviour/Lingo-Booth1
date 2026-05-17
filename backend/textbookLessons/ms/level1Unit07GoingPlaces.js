// Level 1 Unit 7 — Going Places (Bahasa Melayu)
// Functions: travel verbs, transportation, asking about routes, expressing
// purpose with "untuk".

const createContentItem = (target, pinyin, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization: pinyin, nativeText: note, pronunciation: pinyin,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ms-l1u7-orientation', pronunciation: 'ms-l1u7-pronunciation',
  vocabularyVerbs: 'ms-l1u7-vocab-verbs', vocabularyTransport: 'ms-l1u7-vocab-transport',
  grammarUntuk: 'ms-l1u7-grammar-untuk', grammarMaude: 'ms-l1u7-grammar-mau-nak',
  grammarPergi: 'ms-l1u7-grammar-pergi',
  reading: 'ms-l1u7-reading', listening: 'ms-l1u7-listening',
  writing: 'ms-l1u7-writing', culture: 'ms-l1u7-culture', task: 'ms-l1u7-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'Going somewhere in Malaysia', goals: ['Use the verb PERGI (go) and 8 motion verbs to describe travel.', 'Choose transport: kereta, LRT, MRT, bas, basikal, Grab.', 'Express purpose with UNTUK + verb/noun.'], task: 'Picture planning a day trip from KL to Melaka. By the end you can describe each leg of the trip.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Transport words', goals: ['Pronounce loan transport names: lif, eskalator, LRT, MRT, monorel, bas, teksi.', 'Distinguish "kereta" (car) from "keretapi" (train, archaic but in "KTM Keretapi Tanah Melayu").'], task: 'Read each aloud.' },
  { id: ACT.vocabularyVerbs, section: 'Vocabulary I', title: 'Motion verbs', goals: ['Memorize 8 motion verbs: pergi, balik, datang, naik, turun, sampai, tiba, berlepas.'], task: 'Use each in one short sentence.' },
  { id: ACT.vocabularyTransport, section: 'Vocabulary II', title: 'Transport modes', goals: ['Memorize transport names: kereta, motosikal, basikal, bas, LRT, MRT, monorel, teksi, Grab, kereta api, kapal terbang.'], task: 'Match each transport to its primary use case.' },
  { id: ACT.grammarUntuk, section: 'Grammar I', title: 'untuk — for / in order to', goals: ['Use UNTUK before a noun ("hadiah untuk awak" = "gift for you") and before a verb ("Saya pergi UNTUK belajar" = "I go to study").'], task: 'Make six untuk sentences.' },
  { id: ACT.grammarMaude, section: 'Grammar II', title: 'mahu / nak / hendak — want / will', goals: ['MAHU (formal "want") / NAK (casual "want") / HENDAK (formal-written "will/want") — three registers of the same verb.'], task: 'State three things you want with each form.' },
  { id: ACT.grammarPergi, section: 'Grammar III', title: 'pergi ke + place / pergi dengan + transport', goals: ['Combine "pergi ke X" (go to X) with "dengan Y" (by Y / with Y): "Saya pergi KE KLCC DENGAN LRT".'], task: 'Describe four journeys.' },
  { id: ACT.reading, section: 'Reading', title: 'A Melaka day trip', goals: ['Read an itinerary paragraph and identify transport modes.'], task: 'Read and answer.' },
  { id: ACT.listening, section: 'Listening', title: 'Booking a Grab', goals: ['Follow a Grab booking dialogue.'], task: 'Perform the dialogue.' },
  { id: ACT.writing, section: 'Writing', title: 'Plan a weekend trip', goals: ['Write 6 sentences planning a weekend trip from KL.'], task: 'Write and read aloud.' },
  { id: ACT.culture, section: 'Culture', title: 'Klang Valley public transport', goals: ['Understand the KL transport system: LRT (Kelana Jaya, Ampang/Sri Petaling lines), MRT (Kajang, Putrajaya lines), Monorail, KTM Komuter, RapidKL buses.', 'Recognize that intercity travel is dominated by Grab, AirAsia, KTM ETS (electric train), and PLUS Expressway buses.', 'Note that "balik kampung" (going home to the village) for Hari Raya creates the world\'s largest annual road exodus in Malaysia.'], task: 'Plan an LRT-MRT route across KL.' },
  { id: ACT.task, section: 'Task', title: 'Plan a trip together', goals: ['Roleplay planning a Penang weekend with a friend, deciding transport and stops.'], task: 'Roleplay 6 turns.' },
];

const lesson = {
  title: 'Level 1 · Unit 7: Pergi Tempat — Going Places',
  category: 'travel',
  difficulty: 'beginner', targetLang: 'ms', nativeLang: 'en', track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'stating-destination', label: 'Stating destination', goal: 'Use "pergi ke …".' },
    { id: 'choosing-transport', label: 'Choosing transport', goal: 'Use "dengan …" for the means of travel.' },
    { id: 'stating-purpose', label: 'Stating purpose', goal: 'Use "untuk …".' },
  ],
  relatedPools: ['topic-travel', 'topic-transport'],
  content: [
    createContentItem('perjalanan', 'pər.dʒa.la.nan', 'JOURNEY / TRIP. ber- + jalan + -an. The general word for any trip.', 'word', 'Perjalanan KL ke Melaka dua jam.', '"The KL-Melaka journey is two hours".', null, [ACT.orientation]),

    // Pronunciation
    createContentItem('kereta', 'kə.re.ta', 'CAR. MY-specific; ID uses "mobil". Schwa in ke-, full /re/, /ta/.', 'word', 'Kereta saya Proton Saga.', '"My car is a Proton Saga" — Malaysia\'s national car brand.', null, [ACT.pronunciation]),
    createContentItem('LRT / MRT', 'el.ar.ti / em.ar.ti', 'Klang Valley urban rail — LRT (Light Rail Transit, opened 1996) and MRT (Mass Rapid Transit, opened 2017). Backbone of KL commuting.', 'word', 'LRT ke KLCC paling laju.', '"LRT to KLCC is fastest".', null, [ACT.pronunciation]),
    createContentItem('Grab', 'greb', 'GRAB — SE Asian ride-hailing app (formerly MyTeksi). The dominant taxi app in Malaysia, replacing traditional teksi.', 'word', 'Tempah Grab dari aplikasi.', '"Book Grab from the app".', null, [ACT.pronunciation]),

    // Motion verbs
    createContentItem('pergi', 'pər.gi', 'GO. The all-purpose motion verb. "Saya pergi ke pasar" = "I go to the market".', 'word', 'Pergi ke kerja.', '"Go to work".', null, [ACT.vocabularyVerbs]),
    createContentItem('balik', 'ba.liʔ', 'RETURN / GO BACK. Distinct from "pulang" (return — slightly more formal).', 'word', 'Balik kampung untuk Hari Raya.', '"Return to the village for Hari Raya".', null, [ACT.vocabularyVerbs]),
    createContentItem('datang', 'da.taŋ', 'COME / ARRIVE.', 'word', 'Datang ke majlis kahwin saya.', '"Come to my wedding".', null, [ACT.vocabularyVerbs]),
    createContentItem('naik', 'na.iʔ', 'GO UP / BOARD / RIDE. Used both for vertical motion AND for boarding transport: "naik LRT" = take the LRT.', 'word', 'Naik LRT ke Pasar Seni.', '"Take LRT to Pasar Seni".', null, [ACT.vocabularyVerbs]),
    createContentItem('turun', 'tu.run', 'GO DOWN / GET OFF. Inverse of naik: "Turun di stesen KLCC" = "Get off at KLCC".', 'word', 'Turun di stesen seterusnya.', '"Get off at the next station".', null, [ACT.vocabularyVerbs]),
    createContentItem('sampai', 'sam.pai', 'ARRIVE / REACH. "Saya sampai di lapangan terbang pukul 10".', 'word', 'Sampai pukul tiga petang.', '"Arrive at 3 PM".', null, [ACT.vocabularyVerbs]),
    createContentItem('tiba', 'ti.ba', 'ARRIVE (formal-written). "Tiba di KLIA" = "arrive at KLIA". Used in airport announcements, formal writing.', 'word', 'Pesawat tiba di KLIA pukul 8.', '"The plane arrives at KLIA at 8".', null, [ACT.vocabularyVerbs]),
    createContentItem('berlepas', 'bər.lə.pas', 'DEPART. Used in flight/train announcements.', 'word', 'Penerbangan berlepas pukul 10.', '"Flight departs at 10".', null, [ACT.vocabularyVerbs]),

    // Transport
    createContentItem('kereta', 'kə.re.ta', 'CAR. MY-specific; ID uses "mobil". Proton and Perodua are national brands.', 'word', 'Saya pandu kereta sendiri.', '"I drive my own car".', null, [ACT.vocabularyTransport]),
    createContentItem('motosikal', 'mo.to.si.kal', 'MOTORCYCLE. Very common in Malaysia for traffic-busting. Mat rempit (illegal motorcycle racers) is a subculture.', 'word', 'Motosikal lebih cepat dalam trafik KL.', '"Motorcycle is faster in KL traffic".', null, [ACT.vocabularyTransport]),
    createContentItem('basikal', 'ba.si.kal', 'BICYCLE. From English. ID uses "sepeda".', 'word', 'Basikal di taman.', '"Bicycle in the park".', null, [ACT.vocabularyTransport]),
    createContentItem('bas', 'bas', 'BUS. RapidKL is the main KL operator; intercity bus via PLUS Expressway is huge.', 'word', 'Bas RapidKL ke Bukit Bintang.', '"RapidKL bus to Bukit Bintang".', null, [ACT.vocabularyTransport]),
    createContentItem('LRT', 'el.ar.ti', 'LIGHT RAIL TRANSIT. Two lines in KL: Kelana Jaya (purple) and Ampang/Sri Petaling (orange/red).', 'word', 'Stesen LRT Pasar Seni sentiasa sibuk.', '"Pasar Seni LRT station is always busy".', null, [ACT.vocabularyTransport]),
    createContentItem('MRT', 'em.ar.ti', 'MASS RAPID TRANSIT. Newer (2017+). Kajang line (green) and Putrajaya line (yellow).', 'word', 'MRT lebih senyap daripada LRT.', '"MRT is quieter than LRT".', null, [ACT.vocabularyTransport]),
    createContentItem('monorel', 'mo.no.rel', 'KL MONORAIL. Connects KL Sentral, Bukit Bintang, Titiwangsa. Short line, popular with tourists.', 'word', 'Monorel ke Bukit Bintang.', '"Monorail to Bukit Bintang".', null, [ACT.vocabularyTransport]),
    createContentItem('teksi', 'tek.si', 'TAXI. Traditional taxis (Comfort, Public, Sunlight) largely displaced by Grab.', 'word', 'Tempah teksi.', '"Book a taxi".', null, [ACT.vocabularyTransport]),
    createContentItem('Grab', 'greb', 'GRAB — ride-hailing app. Now also food delivery (GrabFood) and groceries (GrabMart).', 'word', 'Saya Grab ke KLIA.', '"I Grab to KLIA" — verbed in Manglish.', null, [ACT.vocabularyTransport]),
    createContentItem('kereta api / KTM', 'kə.re.ta a.pi / ke.te.em', 'TRAIN / KTM. "Keretapi Tanah Melayu Berhad" — the national rail. ETS (Electric Train Service) connects KL-Ipoh-Padang Besar.', 'word', 'KTM ETS dari KL ke Ipoh.', '"KTM ETS from KL to Ipoh".', null, [ACT.vocabularyTransport]),
    createContentItem('kapal terbang / pesawat', 'ka.pal tər.baŋ / pə.sa.wat', 'AIRPLANE. "Kapal terbang" (literal "flying ship") is everyday; "pesawat" is formal/technical.', 'word', 'Naik kapal terbang ke Sabah.', '"Take a plane to Sabah".', null, [ACT.vocabularyTransport]),

    // Grammar untuk
    createContentItem('untuk + noun', 'un.tuʔ + noun', 'UNTUK + noun = "for (someone/something)". "Hadiah untuk awak" = "gift for you".', 'sentence', 'Hadiah untuk awak.', '"Gift for you".', null, [ACT.grammarUntuk]),
    createContentItem('untuk + verb', 'un.tuʔ + verb', 'UNTUK + verb = "in order to / to". "Saya pergi UNTUK belajar" = "I go to study".', 'sentence', 'Saya datang ke UM untuk belajar Sains Komputer.', '"I came to UM to study Computer Science".', null, [ACT.grammarUntuk]),
    createContentItem('demi — for the sake of', 'de.mi', 'DEMI = "for the sake of" — more emotional/formal than untuk.', 'sentence', 'Saya bekerja keras demi keluarga.', '"I work hard for the family\'s sake".', null, [ACT.grammarUntuk]),

    // mau / nak / hendak
    createContentItem('mahu', 'ma.hu', 'WANT (formal). "Saya MAHU pergi ke Melaka" = "I want to go to Melaka". The textbook form.', 'sentence', 'Saya mahu makan nasi lemak.', '"I want to eat nasi lemak".', null, [ACT.grammarMaude]),
    createContentItem('nak', 'naʔ', 'WANT (casual). The everyday spoken version of "mahu". "Saya NAK pergi pasar" = "I wanna go to the market".', 'sentence', 'Nak pergi mana?', '"Where you wanna go?" — casual.', null, [ACT.grammarMaude]),
    createContentItem('hendak', 'hən.daʔ', 'WANT / WILL (formal-written). Used in laws, contracts, formal documents.', 'sentence', 'Saya hendak menyatakan bahawa…', '"I would like to state that…" — formal opener.', null, [ACT.grammarMaude]),
    createContentItem('akan — will', 'a.kan', 'AKAN = future marker "will". "Saya AKAN pergi" = "I will go". Distinct from mahu (want).', 'sentence', 'Saya akan datang esok.', '"I will come tomorrow".', null, [ACT.grammarMaude]),

    // pergi ke / dengan
    createContentItem('pergi ke + dengan', 'pər.gi kə + də.ŋan', 'JOURNEY FRAME: "Saya PERGI KE [place] DENGAN [transport]". "Saya pergi ke KLCC dengan LRT".', 'sentence', 'Saya pergi ke pejabat dengan motosikal.', '"I go to the office by motorcycle".', null, [ACT.grammarPergi]),
    createContentItem('dari … ke …', 'da.ri … kə …', 'FROM-TO. "Dari UM ke KLCC ambil 30 minit dengan LRT" = "From UM to KLCC takes 30 minutes by LRT".', 'sentence', 'Dari KL ke Penang naik kapal terbang ambil sejam.', '"From KL to Penang by plane takes an hour".', null, [ACT.grammarPergi]),

    // Reading
    createContentItem('Itinerari Melaka', 'i.ti.nə.ra.ri mə.la.ka', 'Day-trip itinerary KL → Melaka.', 'sentence', 'Kami berlepas dari KL Sentral pukul 8 pagi dengan bas ekspres. Selepas dua jam perjalanan, kami sampai di stesen bas Melaka Sentral. Kami naik teksi ke A\'Famosa untuk melawat kubu lama Portugis. Selepas itu kami berjalan kaki ke Jonker Street untuk makan tengah hari — nasi ayam Hainan dan cendol. Petang kami pulang ke KL dengan bas yang sama.', 'A Melaka day-trip narrative.', null, [ACT.reading]),
    createContentItem('Soalan kefahaman', 'so.a.lan kə.fa.ha.man', 'Trip questions that make the learner recover departure time, transport, meal location, and duration from the itinerary.', 'sentence', 'Q1: Mereka berlepas pukul berapa? Q2: Dengan apa mereka pergi ke A\'Famosa? Q3: Di mana mereka makan? Q4: Berapa lama perjalanan?', 'Answering in complete sentences rehearses the same travel grammar needed for real planning conversations.', null, [ACT.reading]),

    // Listening
    createContentItem('Dialog: tempah Grab', 'di.a.log: təm.pah greb', 'Booking a Grab via the app.', 'sentence', 'Sarah: Helo, abang. Saya nak ke KL Sentral.\nPemandu Grab: OK, dari mana? Lokasi pickup awak?\nSarah: Saya di hadapan Hotel Mandarin Oriental KLCC.\nPemandu: Baik, saya akan sampai dalam lima minit. Kereta Honda City warna putih.\nSarah: Baik, terima kasih.', '5-turn Grab booking dialogue.', null, [ACT.listening]),

    // Writing
    createContentItem('Tulis: rancangan perjalanan', 'tu.lis: ran.tʃa.ŋan pər.dʒa.la.nan', 'Weekend trip plan template.', 'sentence', 'Template: Hujung minggu ini saya ___. Saya akan pergi dengan ___. Pertama, saya akan ___. Kemudian ___. Akhirnya saya balik ___. Tujuan saya ialah untuk ___.', 'Use sequence + untuk.', null, [ACT.writing]),

    // Culture
    createContentItem('Sistem LRT/MRT Lembah Klang', 'sis.tem el.ar.ti em.ar.ti', 'KL urban rail: LRT Kelana Jaya line (1998), LRT Ampang/Sri Petaling (1996), KL Monorail (2003), MRT Kajang (2017), MRT Putrajaya (2022). Plus KTM Komuter and ETS. Now one of SE Asia\'s most extensive networks.', 'sentence', 'Lembah Klang ada rangkaian rel yang lengkap.', '"The Klang Valley has a comprehensive rail network".', null, [ACT.culture]),
    createContentItem('Balik kampung', 'ba.liʔ kam.puŋ', 'During Hari Raya (and CNY/Deepavali), millions of urban Malaysians "balik kampung" — return to their rural hometowns. PLUS Expressway becomes massively congested; the federal government issues special holiday advisories. The world\'s largest annual road exodus on a population-percentage basis.', 'sentence', 'Saya balik kampung di Kelantan setiap Hari Raya.', '"I return to my village in Kelantan every Hari Raya".', null, [ACT.culture]),
    createContentItem('AirAsia — Borneo bridge', 'air.a.si.a', 'AirAsia (founded 2001 in KL) made domestic air travel affordable, connecting KL to Sabah/Sarawak. Before AirAsia, only the rich flew to Borneo. Now ordinary Malaysians visit easily.', 'sentence', 'Saya terbang ke Kuching dengan AirAsia.', '"I fly to Kuching with AirAsia".', null, [ACT.culture]),

    // Task
    createContentItem('Tugasan: rancang Penang trip', 'tu.ga.san: ran.tʃaŋ pi.naŋ trip', 'Roleplay planning a Penang weekend.', 'sentence', 'Scene: Awak dan kawan nak ke Penang hujung minggu.', 'Use transport modes, ke/dari/untuk, mahu/nak.', null, [ACT.task]),
  ],
};

module.exports = lesson;
