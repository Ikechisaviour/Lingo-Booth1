// Level 1 Unit 3 — Locations & Directions (Turkish)
// Functions: asking and giving directions, locative cases, demonstratives bu/şu/o,
// directional postpositions (yan, üst, alt, arka, ön, içinde), neighborhood vocabulary.

const createContentItem = (
  target,
  pronunciation,
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
  romanization: pronunciation,
  nativeText: note,
  pronunciation,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'tr-l1u3-orientation',
  pronunciation: 'tr-l1u3-pronunciation',
  vocabularyPlaces: 'tr-l1u3-vocab-places',
  vocabularyDirections: 'tr-l1u3-vocab-directions',
  grammarDemonstratives: 'tr-l1u3-grammar-demonstratives',
  grammarLocPostpos: 'tr-l1u3-grammar-loc-postpos',
  grammarDirection: 'tr-l1u3-grammar-direction',
  reading: 'tr-l1u3-reading',
  listening: 'tr-l1u3-listening',
  writing: 'tr-l1u3-writing',
  culture: 'tr-l1u3-culture',
  task: 'tr-l1u3-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Ask "Where is X?" using "X nerede?" and answer with a precise location.', 'Describe positions using the three demonstratives: bu (this, here-near), şu (that, here-mid), o (that, far/known).', 'Combine locative (-de/-da) with postpositional nouns (yanında, üstünde, arkasında, önünde, içinde) to give detailed locations.'], task: 'Imagine getting off the metro at Beşiktaş in İstanbul — by the end of this lesson, you can ask passersby for directions to Boğaziçi Üniversitesi and understand the answer.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in location vocabulary', goals: ['Pronounce "Beşiktaş" with the ş (sh) twice and the final ş clear — Bay-SHIK-tash.', 'Distinguish üst (top) from üstünde (on top of) — note how the suffix shifts stress to the final syllable.', 'Apply harmony in postpositional compounds: yanında (next to it), arkasında (behind it) — possessive 3rd + locative chain.'], task: 'Read 10 location phrases aloud applying stress shift and harmony rules.' },
  { id: ACT.vocabularyPlaces, section: 'Vocabulary I', title: 'Places in the city', goals: ['Memorize 20 city-location nouns: cami, hastane, okul, üniversite, lokanta, kafe, mağaza, postane, banka, eczane, park, müze, sinema, tiyatro, durak, istasyon, köprü, deniz, çarşı, market.', 'Apply locative to each: hastanede, lokantada, postanede.'], task: 'Walk through a virtual Istanbul map and identify 15 places.' },
  { id: ACT.vocabularyDirections, section: 'Vocabulary II', title: 'Directions & postpositional nouns', goals: ['Use the basic directional vocabulary: sağ (right), sol (left), düz (straight), geri (back), ileri (forward), karşı (opposite).', 'Use the 6 postpositional nouns: yan (side), üst (top), alt (bottom), arka (back), ön (front), iç (inside) — all combined with possessive + locative.'], task: 'Describe the location of 8 objects relative to landmarks using the postpositional system.' },
  { id: ACT.grammarDemonstratives, section: 'Grammar I', title: 'bu / şu / o — three-way demonstrative system', goals: ['Distinguish bu (this — near speaker), şu (that — close, often pointed to), o (that — far or referenced).', 'Decline demonstratives like nouns: buna (to this), bunda (in this), bunu (this-ACC) — note the inserted "n" before suffix.', 'Know that o doubles as 3rd person pronoun (he/she/it) AND distant demonstrative; context disambiguates.'], task: 'Compose 9 sentences using bu, şu, o each in three different cases (NOM, LOC, ACC).' },
  { id: ACT.grammarLocPostpos, section: 'Grammar II', title: 'Locative + postpositional nouns', goals: ['Build the X-(GEN) Y-(POSS)-(LOC) structure: masanın üstünde (on top of the table), evin arkasında (behind the house), çantanın içinde (inside the bag).', 'Drop the genitive when generic: masa üstünde = "on a table" (no specific table); masanın üstünde = "on the table" (specific).'], task: 'Convert 10 English location phrases ("under the chair", "in front of the school") into Turkish using the postpositional system.' },
  { id: ACT.grammarDirection, section: 'Grammar III', title: 'The dative case -e/-a/-ye/-ya — direction toward', goals: ['Apply the dative case for "to/toward/into": eve (to home/home-DAT), okula (to school), İstanbul\'a (to Istanbul).', 'Use the buffer y for vowel-final roots: arabaya (to the car), kapıya (to the door).', 'Distinguish dative -e/-a (direction toward) from locative -de/-da (position at) from ablative -den/-dan (direction from).'], task: 'Build 6 dative phrases combining places with the suffix and contrast with locative.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'Find Boğaziçi Üniversitesi', goals: ['Read a paragraph giving step-by-step directions from Beşiktaş metro to Boğaziçi Üniversitesi.', 'Identify every locative, dative, and ablative case in the paragraph.'], task: 'Read aloud and trace the route on a mental map.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'Asking a stranger for directions', goals: ['Follow a 4-turn dialogue between a lost tourist and a kind passerby.', 'Reproduce the dialogue with different destinations (Taksim, Galata Köprüsü, Topkapı).'], task: 'Run the dialogue twice with destination substitutions.' },
  { id: ACT.writing, section: 'Writing', title: 'Describe a route', goals: ['Write 5–7 sentences directing a friend from their hotel to a famous Istanbul landmark.', 'Use at least 3 direction verbs (gitmek, dönmek, geçmek), 2 dative cases, and 2 postpositional phrases.'], task: 'Write the route and read it aloud.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Istanbul geography: Avrupa & Asya yakası', goals: ['Recognize Istanbul as the world\'s only city on two continents — divided by the Boğaz (Bosphorus) into Avrupa yakası (European side, including Beşiktaş, Taksim, Beyoğlu) and Asya yakası (Asian side, including Kadıköy, Üsküdar).', 'Know that Boğaziçi Üniversitesi sits on the European side overlooking the Bosphorus from the hills above Bebek.', 'Understand the role of the three bridges connecting the two sides (15 Temmuz Şehitler, FSM, Yavuz Sultan Selim) and the ferry (vapur) culture.'], task: 'Decide which side of Istanbul each of 5 landmarks is on (Galata Kulesi, Kız Kulesi, Sultanahmet, Bağdat Caddesi, Beşiktaş İskelesi).' },
  { id: ACT.task, section: 'Task', title: 'Lost near Beşiktaş İskelesi', goals: ['Roleplay a lost-tourist scenario with the AI tutor playing a helpful Istanbul resident.', 'Use dative for destination, locative for current position, ablative for starting point.'], task: 'Run a 6-turn dialogue from "I am lost" to "Got it, teşekkürler!".' },
];

const lesson = {
  title: 'Level 1 · Unit 3: Nerede? — Locations and Directions',
  category: 'locations',
  difficulty: 'beginner',
  targetLang: 'tr',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-location', label: 'Asking where something is', goal: 'Use "X nerede?" to ask and respond with a precise locative answer.' },
    { id: 'giving-directions', label: 'Giving directions', goal: 'Use sağa dön, sola dön, düz git, geç + dative to direct someone.' },
    { id: 'describing-position', label: 'Describing position', goal: 'Use postpositional nouns (yanında, üstünde, arkasında) to describe exact position.' },
  ],
  relatedPools: ['topic-locations', 'topic-city'],
  content: [
    // Vocabulary I - Places
    createContentItem('cami', 'ja-Mİ', 'Mosque. Vowel-final root → -ye DAT (camiye), -nin GEN with buffer (caminin). Most cities have a "merkez cami" (central mosque); Boğaziçi area has the Ortaköy Camii on the waterfront.', 'word', 'Cuma günü camiye gidiyorum.', '"On Friday I go to the mosque." — Cuma = Friday and "mosque" — the Islamic day of communal prayer.', null, [ACT.vocabularyPlaces]),
    createContentItem('hastane', 'has-ta-NE', 'Hospital. Front-unrounded → -de LOC, -ye DAT with buffer. Common in city navigation: "En yakın hastane nerede?"', 'word', 'Annem hastanede çalışıyor.', '"My mother works at the hospital."', null, [ACT.vocabularyPlaces]),
    createContentItem('okul', 'o-KUL', 'School (primary/secondary). Back-rounded → -da LOC, -a DAT (okula). Single word for elementary through high school.', 'word', 'Çocuklar okula gidiyor.', '"The children are going to school."', null, [ACT.vocabularyPlaces]),
    createContentItem('lokanta', 'lo-kan-TA', 'Restaurant (traditional/casual). Back-unrounded. Distinct from "restoran" (Western-style) and "esnaf lokantası" (workers\' lunch place).', 'word', 'Bu lokantada kebap çok güzel.', '"The kebap at this restaurant is very good."', null, [ACT.vocabularyPlaces]),
    createContentItem('kafe', 'ka-FE', 'Café (modern Western-style). Borrowed; front harmony rules apply. Contrasted with "kahvehane" (traditional male coffee house).', 'word', 'Kafede arkadaşlarımla buluşuyorum.', '"I meet my friends at the café."', null, [ACT.vocabularyPlaces]),
    createContentItem('postane', 'pos-ta-NE', 'Post office. Old institution: PTT (Posta ve Telgraf Teşkilatı). Locative postanede.', 'word', 'Postaneden mektup gönderdim.', '"I sent a letter from the post office." — ablative -den.', null, [ACT.vocabularyPlaces]),
    createContentItem('banka', 'ban-KA', 'Bank. Back-unrounded. Major Turkish banks: Garanti, İş Bankası, Akbank, Ziraat. Locative: bankada.', 'word', 'Para çekmek için bankaya gideceğim.', '"I will go to the bank to withdraw money."', null, [ACT.vocabularyPlaces]),
    createContentItem('eczane', 'ej-za-NE', 'Pharmacy. c = j. Front harmony. Open 24/7 by rotation in cities (nöbetçi eczane).', 'word', 'Eczane nerede? — Köşede.', '"Where is the pharmacy? — At the corner."', null, [ACT.vocabularyPlaces]),
    createContentItem('park', 'PARK', 'Park (the green space). Back-unrounded loanword. Common phrase: "Park yeri" = parking spot.', 'word', 'Pazar günü parkta yürüyüş yaparız.', '"On Sundays we walk in the park."', null, [ACT.vocabularyPlaces]),
    createContentItem('müze', 'mü-ZE', 'Museum. Front-rounded → -de LOC, -ye DAT. Istanbul highlights: Topkapı, Ayasofya, Arkeoloji.', 'word', 'Topkapı Müzesi çok ünlü.', '"Topkapı Museum is very famous."', null, [ACT.vocabularyPlaces]),
    createContentItem('sinema', 'si-ne-MA', 'Cinema / movie theater. Back-unrounded ending → -ya DAT, -da LOC. Major chain: Cinemaximum.', 'word', 'Sinemaya gidelim mi?', '"Shall we go to the cinema?" — -ya DAT + -elim optative + soru.', null, [ACT.vocabularyPlaces]),
    createContentItem('durak', 'du-RAK', 'Stop (bus/transit). Back-rounded but ends in voiceless k → softens to ğ before vowels: durağa (to the stop), durakta (at the stop). Marked by red-and-white IETT signs in Istanbul.', 'word', 'Otobüs durağında bekliyorum.', '"I am waiting at the bus stop." — note durağında (durak softens to durağ + possessive ı + LOC nda).', null, [ACT.vocabularyPlaces]),
    createContentItem('istasyon', 'is-tas-YON', 'Station (metro, train). Back vowels. Istanbul metro: M1, M2, M4 lines.', 'word', 'Taksim istasyonunda inelim.', '"Let\'s get off at Taksim station."', null, [ACT.vocabularyPlaces]),
    createContentItem('köprü', 'köp-RÜ', 'Bridge. Front-rounded. Istanbul: 15 Temmuz Şehitler Köprüsü (formerly Boğaziçi Köprüsü), FSM Köprüsü, Yavuz Sultan Selim Köprüsü.', 'word', 'Köprüden geçtik.', '"We crossed the bridge." — geçmek (to cross/pass) takes ablative.', null, [ACT.vocabularyPlaces]),
    createContentItem('deniz', 'de-NİZ', 'Sea. Istanbul has three seas at hand: Marmara, Karadeniz (Black Sea), and the Boğaz channels them. "Denize gitmek" = to go to the beach/sea.', 'word', 'Yazın denize gidiyoruz.', '"In summer we go to the sea."', null, [ACT.vocabularyPlaces]),
    createContentItem('çarşı', 'char-SHI', 'Bazaar / shopping district. Istanbul\'s most famous: Kapalıçarşı (Grand Bazaar) and Mısır Çarşısı (Spice Bazaar) in the historic center.', 'word', 'Kapalıçarşı\'da hediye aldım.', '"I bought a gift at the Grand Bazaar." — apostrophe + LOC on proper noun.', null, [ACT.vocabularyPlaces]),
    createContentItem('market', 'mar-KET', 'Supermarket / grocery store. Loanword; common chains: BİM, A101, Migros, Şok. Back-unrounded harmony.', 'word', 'Markete yumurta almaya gittim.', '"I went to the market to buy eggs."', null, [ACT.vocabularyPlaces]),
    createContentItem('Beşiktaş', 'be-SHİK-tash', 'Beşiktaş — a district on the European side of Istanbul, home to the famous football club and main ferry terminal. Boğaziçi Üniversitesi is just up the hill in nearby Bebek.', 'word', 'Beşiktaş\'tan Bebek\'e otobüsle gidilir.', '"From Beşiktaş to Bebek, one goes by bus."', null, [ACT.vocabularyPlaces]),
    createContentItem('Taksim', 'tak-SİM', 'Taksim Square — the major commercial and tourist heart of Istanbul, with İstiklal Caddesi as its pedestrian spine.', 'word', 'Taksim\'de buluşalım.', '"Let\'s meet at Taksim."', null, [ACT.vocabularyPlaces]),
    createContentItem('Kadıköy', 'ka-dı-KÖY', 'Kadıköy — the largest district on the Asian side of Istanbul; ferry hub, hipster cafés, and Bağdat Caddesi shopping.', 'word', 'Kadıköy\'e vapurla gidiyorum.', '"I am going to Kadıköy by ferry." — vapur = ferry, -la = with/by (instrumental).', null, [ACT.vocabularyPlaces]),

    // Directions
    createContentItem('sağ / sağa', 'SAA / sa-A', 'Right / to the right. ğ lengthens (sağ = "saa"). With dative -a: sağa dön (turn right).', 'word', 'Sağa dön, sonra düz git.', '"Turn right, then go straight."', null, [ACT.vocabularyDirections]),
    createContentItem('sol / sola', 'SOL / so-LA', 'Left / to the left. Sola dön (turn left).', 'word', 'Sola dönünce göreceksin.', '"When you turn left you will see it."', null, [ACT.vocabularyDirections]),
    createContentItem('düz / düz git', 'DÜZ / DÜZ git', 'Straight / go straight. Combined with imperative: düz git (go straight ahead).', 'word', 'Buradan düz gidin, ikinci sokakta sağa dönün.', '"From here go straight, turn right at the second street."', null, [ACT.vocabularyDirections]),
    createContentItem('geri / ileri', 'ge-Rİ / i-le-Rİ', 'Back / forward. ileriye git = go forward; geri dön = turn back/return.', 'word', 'Geri dön, yolu kaçırdın.', '"Turn back, you missed the road."', null, [ACT.vocabularyDirections]),
    createContentItem('karşı / karşısında', 'kar-SHI / kar-shı-sın-DA', 'Opposite / across from. As a noun: karşı; as a postposition: karşısında (across from it). Common: bankın karşısında (across from the bank).', 'word', 'Eczanenin karşısında bir kafe var.', '"There is a café across from the pharmacy."', null, [ACT.vocabularyDirections]),
    createContentItem('yan / yanında', 'YAN / ya-nın-DA', 'Side / next to. Postpositional: yanında (at its side, next to it). Pattern: X-GEN + yan + 3rd-poss + LOC.', 'word', 'Caminin yanında bir park var.', '"There is a park next to the mosque."', null, [ACT.vocabularyDirections]),
    createContentItem('üst / üstünde', 'ÜST / üs-tün-DE', 'Top / on top of. Postpositional: üstünde (on top of it). Synonym: üzerinde (more formal).', 'word', 'Kitaplar masanın üstünde.', '"The books are on top of the table."', null, [ACT.vocabularyDirections]),
    createContentItem('alt / altında', 'ALT / al-tın-DA', 'Bottom / under. Postpositional: altında (under it).', 'word', 'Kedi sandalyenin altında.', '"The cat is under the chair."', null, [ACT.vocabularyDirections]),
    createContentItem('arka / arkasında', 'ar-KA / ar-ka-sın-DA', 'Back / behind. Postpositional: arkasında (behind it).', 'word', 'Okulun arkasında bahçe var.', '"There is a garden behind the school."', null, [ACT.vocabularyDirections]),
    createContentItem('ön / önünde', 'ÖN / ö-nün-DE', 'Front / in front of. Postpositional: önünde (in front of it).', 'word', 'Hastanenin önünde taksi var.', '"There is a taxi in front of the hospital."', null, [ACT.vocabularyDirections]),
    createContentItem('iç / içinde', 'İCH / i-chin-DE', 'Inside / in. Postpositional: içinde (inside it). Synonym for locative when emphasizing "inside" rather than "at".', 'word', 'Çantanın içinde kalemim var.', '"My pen is inside the bag."', null, [ACT.vocabularyDirections]),
    createContentItem('yakın / yakınında', 'ya-KIN / ya-kı-nın-DA', 'Near / nearby. Postpositional: yakınında (near it). Adjective form: yakın (close).', 'word', 'Boğaziçi Üniversitesi Bebek\'e yakın.', '"Boğaziçi University is close to Bebek." — yakın + DAT for "close to X".', null, [ACT.vocabularyDirections]),
    createContentItem('uzak / uzakta', 'u-ZAK / u-zak-TA', 'Far. uzakta (far away). Antonym of yakın.', 'word', 'Köyümüz çok uzakta.', '"Our village is very far away."', null, [ACT.vocabularyDirections]),

    // Demonstratives
    createContentItem('bu / şu / o', 'BU / SHU / O', 'Three-way demonstrative system. bu = near speaker (this here in my hand); şu = mid-distance, often pointed to (that there I am pointing at); o = far or referenced (that one you know).', 'sentence', 'Bu kitap benim. Şu defter senin. O kalem hocanın.', 'Three-way distinction is sharper than English this/that.', [{ target: 'bu (proximal)', note: 'near speaker — this here' }, { target: 'şu (medial)', note: 'mid, often pointed — that there' }, { target: 'o (distal)', note: 'far or known — that' }], [ACT.grammarDemonstratives]),
    createContentItem('bu/şu/o + case', 'bu/şu/o + case', 'When declined, demonstratives insert an "n" before the case suffix: bu → bunu (this-ACC), buna (to this), bunda (in this), bundan (from this). Same for şu (şunu, şuna…) and o (onu, ona, onda, ondan).', 'sentence', 'Bunu istiyorum. (I want this.) — bu + n + u (ACC)\nOna ver. (Give it to him.) — o + n + a (DAT)', 'The inserted n is irregular but predictable; memorize as bun-, şun-, on- declension stems.', null, [ACT.grammarDemonstratives]),
    createContentItem('o = he/she/it AND that', 'o ambiguity', 'The same word "o" serves as 3rd-person pronoun (he/she/it) AND the distant demonstrative ("that"). Context disambiguates — usually no problem.', 'sentence', 'O öğretmen. (S/he is a teacher.) OR (That [one] is a teacher.)', 'Practical tip: o + verb usually = pronoun; o + noun usually = demonstrative.', null, [ACT.grammarDemonstratives]),

    // Locative + postpositional
    createContentItem('İzafet + LOC', 'izafet + locative', 'The "X-(GEN) Y-(POSS)-(LOC)" pattern builds postpositional location phrases: "X-in Y-i-nde" = "in/on/at the Y of X". Most native locations use this structure.', 'sentence', 'masanın üstünde (on the table-of-it top-in)\nevin önünde (in front of the house)\nokulun arkasında (behind the school)', 'The izafet (compound noun) is one of Turkish\'s most distinctive grammatical features.', [{ target: 'X-GEN', note: 'the possessor noun in genitive: masa-nın, ev-in, okul-un' }, { target: 'Y-POSS', note: 'the postpositional noun with 3rd-person possessive: üst-ü, ön-ü, arka-sı' }, { target: '-LOC', note: 'locative on the postposition: -nde, -nda (the n is part of 3rd-poss-buffer + de)' }], [ACT.grammarLocPostpos]),
    createContentItem('Genitif düşmesi', 'genitive dropping', 'When the location is generic rather than specific, the genitive can be dropped: "masa üstünde" = "on a table" (any table) vs "masanın üstünde" = "on the table" (specific). Common in informal speech.', 'sentence', 'GENERIC: ev önünde (in front of a house)\nSPECIFIC: evin önünde (in front of the house)', 'A subtle definiteness contrast worth knowing.', null, [ACT.grammarLocPostpos]),

    // Dative
    createContentItem('Datif -e/-a', 'dative -e/-a', 'The dative case marks direction toward, indirect object, and time. Two basic forms: -e (front), -a (back). Buffer y before vowel-final roots: araba → arabaya.', 'sentence', 'eve git (go home), okula git (go to school), arabaya bin (get in the car), İstanbul\'a gidiyorum (I am going to Istanbul)', 'Equivalent of English "to/toward/into" + direction verbs (gitmek, gelmek, vermek).', [{ target: '-e (front)', note: 'eve, gözle... NO — gözle is INSTR; gözel? no — göze (eye-DAT)' }, { target: '-a (back)', note: 'odaya, masaya, arabaya' }, { target: '-ye/-ya (with buffer)', note: 'arabaya, kapıya, üniversiteye' }], [ACT.grammarDirection]),
    createContentItem('Datif vs lokatif vs ablatif', 'dative vs locative vs ablative', 'Three direction-related cases in contrast: -e/-a (TO/INTO), -de/-da (AT/IN, no motion), -den/-dan (FROM/OUT OF).', 'sentence', 'eve git (go HOME), evde (AT home), evden (FROM home)', 'These three cases handle all spatial relations in Turkish.', [{ target: 'DATIVE -e/-a', note: 'destination / direction toward / indirect object' }, { target: 'LOCATIVE -de/-da', note: 'position / location at' }, { target: 'ABLATIVE -den/-dan', note: 'starting point / origin' }], [ACT.grammarDirection]),

    // Reading
    createContentItem('Boğaziçi\'ne nasıl gidilir', 'how to get to Boğaziçi', 'A paragraph giving directions from Beşiktaş ferry terminal to Boğaziçi Üniversitesi.', 'paragraph', 'Beşiktaş\'ta vapurdan iner inmez sağa dön ve sahil yolunu takip et. Yaklaşık on dakika yürüyünce Bebek\'e gelirsin. Bebek meydanından sola dön ve tepeye doğru çık. Üniversitenin ana kapısı tepenin üstünde. Yol boyunca solunda Boğaz manzarası, sağında küçük kafeler var.', 'Translation: "As soon as you get off the ferry at Beşiktaş, turn right and follow the coastal road. After about 10 minutes of walking you reach Bebek. From Bebek Square turn left and climb up the hill. The main gate of the university is at the top of the hill. Along the way you have the Bosphorus view on your left and small cafés on your right."', [{ target: 'vapurdan iner inmez', note: '"as soon as you get off the ferry" — ablative + verbal idiom -er -mez (as soon as)' }, { target: 'sahil yolunu', note: '"the coastal road" + ACC' }, { target: 'tepeye doğru', note: '"toward the hill" — dative + doğru (toward)' }, { target: 'tepenin üstünde', note: 'standard izafet + locative for "on top of the hill"' }, { target: 'yol boyunca', note: '"along the way" — postpositional boyunca with possessive' }], [ACT.reading]),

    // Listening
    createContentItem('Yol soran turist', 'tourist asking for directions', 'A 4-turn dialogue between a lost tourist and a helpful resident.', 'conversation', 'Turist: Affedersiniz, Boğaziçi Üniversitesi nerede?\nVatandaş: Buradan epey uzak. Vapurla Bebek\'e gidin, sonra otobüsle yukarı çıkın.\nTurist: Vapur iskelesi nerede?\nVatandaş: Şu sokaktan düz gidin, sahile çıkacaksınız. İskele sağda.\nTurist: Çok teşekkür ederim!\nVatandaş: Rica ederim, kolay gelsin.', 'Note "kolay gelsin" — "may it come easy" — standard parting wish in Turkey.', [{ target: 'Affedersiniz', note: 'polite "excuse me" — siz form, formal' }, { target: 'epey uzak', note: '"quite far"' }, { target: 'kolay gelsin', note: '"may it come easy" — universal Turkish well-wish on departure' }], [ACT.listening]),

    // Writing
    createContentItem('Rota tarifi', 'route description', 'Template: Otelinden çık, sağa/sola dön, X-e doğru git, Y\'yi geç, Z-nin yanında varış noktası var.', 'sentence', 'Şablon: 1. Otelinden çık. 2. [yön]-a dön. 3. [n] dakika yürü. 4. [yer]-i geç. 5. Hedef [postpos] var.', 'Fill in 5 slots to describe a route.', null, [ACT.writing]),

    // Culture
    createContentItem('Avrupa & Asya yakası', 'European & Asian sides', 'Istanbul is the only city on two continents. The Boğaz (Bosphorus) divides it: Avrupa yakası (European side — Sultanahmet, Taksim, Beşiktaş, Bebek, Beyoğlu) and Asya yakası (Asian side — Kadıköy, Üsküdar, Bağdat Caddesi). Three suspension bridges and four metro tubes connect them.', 'sentence', 'Boğaziçi Üniversitesi Avrupa yakasında, Bebek\'in üstünde.', 'Istanbulites identify strongly with their side; Asia-side residents often think of Europe-side as "the other side".', [{ target: 'Avrupa yakası', note: 'European side; Old City, Galata, Beşiktaş, Boğaziçi University' }, { target: 'Asya yakası', note: 'Asian side; Kadıköy hipster scene, Bağdat Caddesi, ODTÜ-rival Boğaziçi alumni-rivals' }], [ACT.culture]),
    createContentItem('Vapur kültürü', 'ferry culture', 'The İstanbul ferries (vapurlar) are not just transit but cultural icons — operated by Şehir Hatları since 1844. Locals drink çay on the deck, feed seagulls simit (sesame bagels), and watch the dolphins. Lines: Eminönü-Üsküdar, Beşiktaş-Kadıköy, Karaköy-Haydarpaşa.', 'sentence', 'Vapurda çay içip simit yedik, martılara da attık.', 'A standard Istanbul afternoon ritual; ferry + çay + simit is iconic.', null, [ACT.culture]),
    createContentItem('Boğaziçi konumu', 'Boğaziçi location', 'Boğaziçi Üniversitesi is on the hills above Bebek, with one of the most famous campus views in the world: the Bosphorus, Rumeli Hisarı (1452 Ottoman fortress), and Anadolu Hisarı across the strait. Founded as Robert College in 1863 (oldest American-curriculum school outside the US), turned into a state university in 1971.', 'sentence', 'Üniversitenin manzarası Boğaz\'a hâkim.', 'A major source of pride for Boğaziçi students and alumni.', null, [ACT.culture]),
    createContentItem('ODTÜ karşılaştırması', 'METU comparison', 'Boğaziçi\'s closest peer/rival is ODTÜ (Orta Doğu Teknik Üniversitesi = Middle East Technical University) in Ankara — both English-language, both highly selective. Boğaziçi leans humanities/social sciences/economics; ODTÜ leans engineering/sciences.', 'sentence', 'Boğaziçi mi ODTÜ mü? — Klasik tartışma.', 'Standard rivalry banter; both schools take pride in their distinct campus cultures.', null, [ACT.culture]),

    // Task
    createContentItem('Görev: kayıp turist', 'task: lost tourist', 'Roleplay being lost near Beşiktaş İskelesi (ferry terminal). Ask the AI tutor (an İstanbul resident) for directions to Boğaziçi Üniversitesi. Use 4 cases (NOM, LOC, DAT, ABL) across 6 turns.', 'conversation', '1. Sen: kayıp olduğunu söyle.\n2. AI: nereye gitmek istiyorsun?\n3. Sen: hedefini söyle (Boğaziçi).\n4. AI: yönergeleri ver.\n5. Sen: bir detayı sor (vapur mu otobüs mü?).\n6. Sen: teşekkür et.', 'End with "kolay gelsin" or "iyi günler".', null, [ACT.task]),
  ],
};

module.exports = lesson;
