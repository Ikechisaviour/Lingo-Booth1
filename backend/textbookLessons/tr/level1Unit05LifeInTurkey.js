// Level 1 Unit 5 — Life in Turkey (Turkish)
// Functions: describing one's home country, comparing cultures, Turkish geography
// and food culture, family, and basic comparison patterns (-den daha + adj).

const createContentItem = (target, pronunciation, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization: pronunciation, nativeText: note, pronunciation,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'tr-l1u5-orientation', pronunciation: 'tr-l1u5-pronunciation',
  vocabularyCountry: 'tr-l1u5-vocab-country', vocabularyFood: 'tr-l1u5-vocab-food',
  grammarComparison: 'tr-l1u5-grammar-comparison', grammarLike: 'tr-l1u5-grammar-like',
  grammarFamily: 'tr-l1u5-grammar-family',
  reading: 'tr-l1u5-reading', listening: 'tr-l1u5-listening',
  writing: 'tr-l1u5-writing', culture: 'tr-l1u5-culture', task: 'tr-l1u5-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Describe Turkey\'s geography, population, climate, and cities to a stranger.', 'Compare Turkey with your home country using -den daha + ADJ.', 'Talk about your family and Turkish family structure with the basic kinship terms.'], task: 'Picture a Boğaziçi conversation partner asking "Türkiye nasıl?" — by the end of this lesson, you can paint a 60-second picture of Turkish geography, food, and culture.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in geography', goals: ['Pronounce major city names with correct stress: İstanbul (is-TAN-bul, penult), Ankara (AN-ka-ra, penult), İzmir (İZ-mir, penult), Antalya (an-TAL-ya).', 'Master the ç in Çanakkale (cha-NAK-ka-le) and the ğ in Ağrı (mountain in eastern Turkey).', 'Read "Boğaziçi" as bo-aa-zi-CHİ (ğ lengthens).'], task: 'Read 10 Turkish geographical names with correct stress patterns.' },
  { id: ACT.vocabularyCountry, section: 'Vocabulary I', title: 'Geography & cities', goals: ['Name Turkey\'s seven geographical regions: Marmara, Ege, Akdeniz, Karadeniz, İç Anadolu, Doğu Anadolu, Güneydoğu Anadolu.', 'Identify the major cities: İstanbul (15M), Ankara (capital), İzmir, Bursa, Antalya, Konya, Adana, Gaziantep.', 'Use country/city geography vocabulary: ülke, şehir, başkent, dağ, deniz, göl, nehir, ada.'], task: 'Locate 8 Turkish cities on a mental map and describe each.' },
  { id: ACT.vocabularyFood, section: 'Vocabulary II', title: 'Turkish food', goals: ['Name 15 iconic Turkish dishes: kebap, döner, lahmacun, börek, baklava, künefe, mantı, dolma, pilav, çorba, meze, simit, peynir, zeytin, çay.', 'Use food-related verbs: yemek yapmak, pişirmek, kızartmak, ısmarlamak, tatmak.'], task: 'Describe a typical Turkish breakfast (kahvaltı) and dinner.' },
  { id: ACT.grammarComparison, section: 'Grammar I', title: 'Comparison: -den daha + ADJ', goals: ['Form comparatives: "İstanbul Ankara\'dan daha büyük." (Istanbul is bigger than Ankara.) Pattern: COMPARED-ABL + daha + ADJECTIVE.', 'Use "en + ADJ" for superlatives: "En büyük şehir İstanbul." (The biggest city is Istanbul.)'], task: 'Build 6 comparative sentences about Turkish cities and 4 superlative sentences.' },
  { id: ACT.grammarLike, section: 'Grammar II', title: 'Expressing likes: sev- + ACC', goals: ['Use sevmek (to love) + accusative noun for "I like X": "Çayı seviyorum" (I like tea), "Kebabı seviyorum" (I like kebap).', 'Use beğenmek for "to find pleasing / I like the look of": "Bu şehri beğeniyorum" (I like this city).', 'Distinguish: sevmek = like as ongoing preference; beğenmek = like at first encounter.'], task: 'List 5 Turkish foods you like and 3 you do not, using sevmek and -mek hoşuma gitmiyor.' },
  { id: ACT.grammarFamily, section: 'Grammar III', title: 'Family vocabulary & possessives', goals: ['Use the core family terms with possessives: annem (my mother), babam (my father), kardeşim (my sibling), abim (my elder brother), ablam (my elder sister), oğlum (my son), kızım (my daughter).', 'Distinguish elder vs younger siblings — Turkish marks the distinction: abi/abla (elder brother/sister) vs kardeş (younger sibling or sibling in general).'], task: 'Draw your family tree and label each person with the correct Turkish possessive.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'Türkiye hakkında kısa tanıtım', goals: ['Read a paragraph introducing Turkey to a foreign student.', 'Answer 4 questions about geography, population, and culture.'], task: 'Read aloud, then summarize Turkey in 3 sentences.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'Iki öğrenci ülkelerini karşılaştırıyor', goals: ['Follow a 4-turn dialogue between a Turkish and an international student comparing countries.', 'Reproduce with your own country.'], task: 'Roleplay with country swap.' },
  { id: ACT.writing, section: 'Writing', title: 'Write about your country', goals: ['Write 6–8 sentences comparing your country to Turkey using -den daha + adj and en + adj.', 'Include geography, food, and family.'], task: 'Write the comparison.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Turkish family, hospitality, and the misafir culture', goals: ['Understand the central role of the misafir (guest): "Misafir Allah\'tan gelir" — guests come from God and are treated with profound generosity.', 'Know the family hierarchy: extended family ties remain very strong; multi-generational households still common; bayrams (holidays) are family-gathering anchors.', 'Recognize the geographic East/West tension: secular urban West (Istanbul, Izmir) vs conservative rural East (Konya, Şanlıurfa); Boğaziçi students span both worlds.'], task: 'List 3 ways misafir hospitality might differ from hospitality in your home country.' },
  { id: ACT.task, section: 'Task', title: 'Cultural exchange at Boğaziçi', goals: ['Roleplay introducing your country to a Turkish classmate; the AI tutor will compare it to Turkey.', 'Use comparison, like/dislike, and family vocabulary.'], task: 'Run a 6-turn cultural exchange dialogue.' },
];

const lesson = {
  title: 'Level 1 · Unit 5: Türkiye Hayatı — Life in Turkey',
  category: 'culture',
  difficulty: 'beginner',
  targetLang: 'tr',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describe-country', label: 'Describing your country', goal: 'Paint a picture of geography, food, and people in 3 sentences.' },
    { id: 'compare', label: 'Comparing', goal: 'Use -den daha + adj for direct comparisons.' },
    { id: 'preferences', label: 'Expressing likes', goal: 'Use sevmek + ACC and beğenmek for preferences.' },
  ],
  relatedPools: ['topic-culture', 'topic-geography'],
  content: [
    // Geography
    createContentItem('Türkiye', 'tür-ki-YE', 'Turkey. Front-unrounded → -den ABL, -ye DAT with buffer. Population ~85 million; 7th largest country in Europe/Asia.', 'word', 'Türkiye Avrupa ve Asya kıtalarında.', '"Turkey is on the Europe and Asia continents."', null, [ACT.vocabularyCountry]),
    createContentItem('İstanbul', 'is-TAN-bul', 'Istanbul. Penultimate stress, exceptional. Population ~16M. Only city on two continents. Historic capital of three empires (Roman, Byzantine, Ottoman).', 'word', 'İstanbul Türkiye\'nin en büyük şehri.', '"Istanbul is the biggest city in Turkey." — "en" superlative.', null, [ACT.vocabularyCountry]),
    createContentItem('Ankara', 'AN-ka-ra', 'Ankara — capital city since 1923, replacing İstanbul. Population ~6M. Located in central Anatolia (İç Anadolu). Home of ODTÜ (METU) and government ministries.', 'word', 'Türkiye\'nin başkenti Ankara.', '"The capital of Turkey is Ankara."', null, [ACT.vocabularyCountry]),
    createContentItem('İzmir', 'İZ-mir', 'İzmir — 3rd largest city, on the Aegean coast. Population ~4M. Known for its secular outlook and seaside lifestyle.', 'word', 'İzmir Ege Denizi kıyısında.', '"İzmir is on the Aegean coast."', null, [ACT.vocabularyCountry]),
    createContentItem('Antalya', 'an-TAL-ya', 'Antalya — Mediterranean coast tourist capital, 5th city. Population ~2.5M. Major beach destination.', 'word', 'Antalya yazın çok kalabalık.', '"Antalya is very crowded in summer."', null, [ACT.vocabularyCountry]),
    createContentItem('Bursa', 'BUR-sa', 'Bursa — first Ottoman capital, foothill of Uludağ mountain. Population ~3M. Famous for textiles, silk, and İskender kebap.', 'word', 'Bursa Osmanlı\'nın ilk başkenti.', '"Bursa was the first Ottoman capital." — Osmanlı = Ottoman, ilk = first.', null, [ACT.vocabularyCountry]),
    createContentItem('Konya', 'KON-ya', 'Konya — central Anatolia city, deeply religious and conservative. Home of Mevlana Rumi\'s tomb and the whirling dervishes (semazenler).', 'word', 'Konya\'da Mevlana Müzesi var.', '"There is the Mevlana Museum in Konya."', null, [ACT.vocabularyCountry]),
    createContentItem('Kıbrıs (Kuzey)', 'KIB-rıs', 'Cyprus, specifically Northern Cyprus (KKTC — Kuzey Kıbrıs Türk Cumhuriyeti), recognized only by Turkey. Turkish-speaking, separate from the Republic of Cyprus (Greek-speaking, EU member).', 'word', 'Kuzey Kıbrıs\'ta Türkçe konuşulur.', '"Turkish is spoken in Northern Cyprus."', null, [ACT.vocabularyCountry]),
    createContentItem('ülke', 'ül-KE', 'Country. Vowel-final → -ler PL, -ye DAT. Plural ülkeler. Possessive: ülkem (my country).', 'word', 'Ülken nerede?', '"Where is your country?"', null, [ACT.vocabularyCountry]),
    createContentItem('şehir', 'şe-HİR', 'City. Front-unrounded. Plural şehirler.', 'word', 'En sevdiğim şehir İstanbul.', '"My favorite city is Istanbul." — "en sevdiğim" = most-liked-by-me, participle form.', null, [ACT.vocabularyCountry]),
    createContentItem('başkent', 'BASH-kent', 'Capital city. Compound: baş (head) + kent (city). Türkiye\'nin başkenti = capital of Turkey.', 'word', 'Türkiye\'nin başkenti Ankara.', '"The capital of Turkey is Ankara."', null, [ACT.vocabularyCountry]),
    createContentItem('dağ', 'DAA', 'Mountain. ğ lengthens vowel: dağ → "daa". Famous mountains: Ağrı Dağı (Mt. Ararat, 5137m, highest), Uludağ (Bursa), Erciyes (Kayseri).', 'word', 'Türkiye\'nin en yüksek dağı Ağrı.', '"Turkey\'s highest mountain is Ağrı."', null, [ACT.vocabularyCountry]),
    createContentItem('Boğaz', 'bo-AZ', 'The Bosphorus strait. ğ lengthens: bo-AAZ. Connects Marmara and Black Sea. Defines Istanbul\'s geography.', 'word', 'Boğaz manzarası harika.', '"The Bosphorus view is amazing."', null, [ACT.vocabularyCountry]),
    createContentItem('Karadeniz', 'ka-ra-de-NİZ', 'Black Sea — north of Turkey. Compound: kara (black) + deniz (sea).', 'word', 'Karadeniz çok yağışlıdır.', '"The Black Sea region is very rainy." — yağmur (rain) + -lu adjective.', null, [ACT.vocabularyCountry]),
    createContentItem('Akdeniz', 'ak-de-NİZ', 'Mediterranean. Compound: ak (white) + deniz. Turkey calls it "white sea" — historic Ottoman convention.', 'word', 'Akdeniz iklimi sıcak.', '"The Mediterranean climate is hot."', null, [ACT.vocabularyCountry]),
    createContentItem('Ege', 'e-GE', 'Aegean. Region on Turkey\'s west coast — Izmir, Bodrum, Çeşme. Olive oil and tourism heartland.', 'word', 'Ege\'de yazlık var.', '"There is a summer house in the Aegean."', null, [ACT.vocabularyCountry]),
    createContentItem('Anadolu', 'a-na-do-LU', 'Anatolia — the Asian-side peninsula of Turkey. Historic name; divided into Central, Eastern, Southeastern regions.', 'word', 'Anadolu çok geniş ve çeşitli.', '"Anatolia is very wide and diverse."', null, [ACT.vocabularyCountry]),
    createContentItem('Trakya', 'TRAK-ya', 'Thrace — the European-side region of Turkey (Edirne, Tekirdağ).', 'word', 'Trakya Avrupa\'da.', '"Thrace is in Europe."', null, [ACT.vocabularyCountry]),

    // Food
    createContentItem('kebap', 'ke-BAP', 'Kebap — grilled or skewered meat. Many varieties: Adana (spicy), Urfa (mild), şiş (skewer), İskender (Bursa-style with tomato/yogurt). Final p softens before vowel: kebabı (the kebap).', 'word', 'Adana kebap çok acı.', '"Adana kebap is very spicy."', null, [ACT.vocabularyFood]),
    createContentItem('döner', 'dö-NER', 'Döner — rotating spit-roasted meat sliced thin. The original "doner kebab"; precursor to gyros, shawarma, tacos al pastor. Served on plate, in bread (ekmek arası), or as durum (wrap).', 'word', 'Akşam yemekte döner yiyelim.', '"Let\'s have döner for dinner."', null, [ACT.vocabularyFood]),
    createContentItem('lahmacun', 'lah-ma-JUN', 'Lahmacun — thin flatbread topped with spiced ground meat, often called "Turkish pizza" (though Turks resist the comparison). Eaten rolled with lemon and parsley.', 'word', 'Iki lahmacun lütfen.', '"Two lahmacun please."', null, [ACT.vocabularyFood]),
    createContentItem('börek', 'bö-REK', 'Börek — layered pastry with filling (cheese, spinach, meat, potato). Su böreği, kıymalı börek, peynirli börek varieties.', 'word', 'Sabah kahvaltıda peynirli börek yedik.', '"For morning breakfast we ate cheese börek."', null, [ACT.vocabularyFood]),
    createContentItem('baklava', 'bak-la-VA', 'Baklava — layered phyllo with chopped nuts (pistachio/walnut) and syrup. Gaziantep is the world capital. EU PDO protected.', 'word', 'Gaziantep\'in baklavası dünyaca ünlü.', '"Gaziantep\'s baklava is world-famous."', null, [ACT.vocabularyFood]),
    createContentItem('künefe', 'kü-ne-FE', 'Künefe — semolina/cheese shredded-dough pastry, served hot with syrup. Hatay/Antakya specialty.', 'word', 'Künefe sıcak servis edilir.', '"Künefe is served hot."', null, [ACT.vocabularyFood]),
    createContentItem('mantı', 'man-TI', 'Mantı — tiny meat-stuffed dumplings, served with yogurt and butter. Often called "Turkish ravioli". Kayseri is famous for the smallest mantı.', 'word', 'Annem mantı yapıyor.', '"My mother is making mantı."', null, [ACT.vocabularyFood]),
    createContentItem('dolma / sarma', 'dol-MA / sar-MA', 'Dolma = stuffed vegetables (peppers, tomatoes); sarma = wrapped in leaves (grape, cabbage). Filling: rice, herbs, sometimes meat.', 'word', 'Yaprak sarma annemin uzmanlık alanı.', '"Grape-leaf sarma is my mother\'s specialty."', null, [ACT.vocabularyFood]),
    createContentItem('pilav', 'pi-LAV', 'Pilav — rice cooked with butter and broth. Side dish for most meals; also a meal on its own with chickpeas (nohutlu pilav).', 'word', 'Bugün öğlen pilav yedim.', '"I ate rice at lunch today."', null, [ACT.vocabularyFood]),
    createContentItem('çorba', 'chor-BA', 'Soup. Mercimek çorbası (lentil soup) is iconic — eaten daily. Often the first course of any meal.', 'word', 'Mercimek çorbası seviyorum.', '"I like lentil soup."', null, [ACT.vocabularyFood]),
    createContentItem('meze', 'me-ZE', 'Meze — small dishes served as appetizers, especially alongside rakı (anise liquor). Patlıcan ezme (eggplant), haydari (yogurt), cacık.', 'word', 'Akşam yemeğine meze tabağı hazırladım.', '"I prepared a meze plate for dinner."', null, [ACT.vocabularyFood]),
    createContentItem('simit', 'si-MİT', 'Simit — circular sesame-crusted bread, slightly chewy, sold by street vendors with a glass case. The iconic Istanbul street snack.', 'word', 'Vapurda simit yedim, martıya da verdim.', '"I ate a simit on the ferry, also gave one to a seagull."', null, [ACT.vocabularyFood]),
    createContentItem('peynir', 'pey-NİR', 'Cheese. Beyaz peynir (white cheese, feta-like) is the breakfast staple. Kaşar (yellow), tulum (sheep), eski kaşar (aged).', 'word', 'Kahvaltıda beyaz peynir yiyoruz.', '"At breakfast we eat white cheese."', null, [ACT.vocabularyFood]),
    createContentItem('zeytin', 'zey-TİN', 'Olive. Green (yeşil) and black (siyah). Aegean coast produces world-class olives and oil. Breakfast staple.', 'word', 'Ege zeytini en iyisidir.', '"Aegean olives are the best."', null, [ACT.vocabularyFood]),
    createContentItem('çay', 'CHAY', 'Tea. The Turkish national drink. Brewed strong, served in tulip glasses, drunk all day. Without çay, nothing happens.', 'word', 'Bir çay ister misiniz?', '"Would you like a tea?" — universal hospitality question.', null, [ACT.vocabularyFood]),
    createContentItem('rakı', 'ra-KI', 'Rakı — anise-flavored liquor, traditionally drunk with mezes and balık (fish). Turns milky white when water is added — "aslan sütü" (lion\'s milk).', 'word', 'Cumartesi akşamı rakı içiyoruz.', '"Saturday evening we drink rakı."', null, [ACT.vocabularyFood]),

    // Grammar I - Comparison
    createContentItem(
      '-den daha + ADJ',
      '-den daha + adjective',
      'The comparative pattern: COMPARED-NOUN + ABLATIVE (-den/-dan) + daha + ADJECTIVE. "X is more ADJ than Y" → "Y-den daha ADJ X".',
      'sentence',
      'İstanbul Ankara\'dan daha büyük. (Istanbul is bigger than Ankara.)\nÇay kahveden daha popüler. (Tea is more popular than coffee.)',
      'The reference point goes in ablative; "daha" means "more"; adjective stays bare.',
      [
        { target: 'Y-den (compared-from)', note: 'the standard of comparison goes in ablative case' },
        { target: 'daha', note: '"more"; always between the ablative and the adjective' },
        { target: 'ADJ', note: 'unchanged; Turkish adjectives do not inflect for comparison' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem('en + ADJ', 'en + adj', 'Superlative: en + ADJECTIVE = "the most ADJ". "En büyük şehir İstanbul" (The biggest city is Istanbul).', 'sentence', 'En sevdiğim yemek mantı. (My favorite food is mantı.)\nEn güzel şehir İstanbul. (The most beautiful city is Istanbul.)', '"en" is invariable; the noun being compared can be anywhere.', null, [ACT.grammarComparison]),
    createContentItem('Eşitlik: kadar', 'equality: kadar', '"As X as Y" → "Y kadar X". "Sen benim kadar yorgunsun." (You are as tired as me.) "kadar" is a postposition meaning "as much as / like".', 'sentence', 'İzmir İstanbul kadar büyük değil. (İzmir is not as big as Istanbul.)', 'For "not as X as Y", add değil to the adjective.', null, [ACT.grammarComparison]),

    // Grammar II - Likes
    createContentItem(
      'sevmek + ACC',
      'sevmek + accusative',
      '"To like / love" — Turkish marks the LIKED THING with accusative -ı/-i/-u/-ü. "Çayı seviyorum" = "I like tea" (literally "I love the tea"). Different from English where "tea" is bare.',
      'sentence',
      'Kebabı seviyorum. (I like kebap.)\nMüziği seviyorum. (I like music.)\nBu şehri seviyorum. (I love this city.)',
      'Forgetting the accusative is a common learner error: NOT "çay seviyorum" but "çayı seviyorum".',
      [
        { target: 'sev- (to love)', note: 'front-unrounded stem; -iyor present' },
        { target: '-ı/-i/-u/-ü', note: 'accusative on the liked thing; four-way harmony' },
      ],
      [ACT.grammarLike],
    ),
    createContentItem('beğenmek', 'be-yen-MEK', '"To find pleasing / to like" — beğenmek is "first-impression liking", as opposed to sevmek\'s "ongoing love". "Bu kitabı beğendim" (I liked this book — at the moment of reading/buying).', 'word', 'Hediyenizi çok beğendim, teşekkür ederim.', '"I liked your gift a lot, thank you." — past tense -di.', null, [ACT.grammarLike]),
    createContentItem('hoş(uma) gitmek', 'hoşuma gitmek', '"To please me / I like" — idiom: NOUN-(NOM) + POSSESSOR-(POSS)+ -a + hoş + gitmek. "Bu film hoşuma gitti" (This movie pleased me / I liked this movie).', 'sentence', 'Bu fikir hoşuma gitti. (I like this idea.)\nO yemek hoşuna gitmedi mi? (Didn\'t you like that food?)', 'Slightly more formal/literary than sevmek/beğenmek.', null, [ACT.grammarLike]),

    // Grammar III - Family
    createContentItem('anne / annem', 'an-NE / an-NEM', 'Mother / my mother. Front-unrounded → -ler PL (anneler). Often used as form of address (a child says "Anne!").', 'word', 'Annem çok iyi yemek yapar.', '"My mother cooks very well." — -er aorist.', null, [ACT.grammarFamily]),
    createContentItem('baba / babam', 'ba-BA / ba-BAM', 'Father / my father. Possessive -m.', 'word', 'Babam mühendis.', '"My father is an engineer."', null, [ACT.grammarFamily]),
    createContentItem('abi / ağabey', 'a-BI / aa-BEY', 'Elder brother. abi is the casual short form (very common); ağabey is the full literary form. ALWAYS specifies "elder" — for "younger" use erkek kardeş.', 'word', 'Abim İzmir\'de yaşıyor.', '"My elder brother lives in İzmir."', null, [ACT.grammarFamily]),
    createContentItem('abla', 'AB-la', 'Elder sister. ALWAYS elder. Often used as a respectful address to any older woman ("Abla, bir şey sorabilir miyim?" = "Sister, may I ask something?").', 'word', 'Ablam doktor.', '"My elder sister is a doctor."', null, [ACT.grammarFamily]),
    createContentItem('kardeş', 'kar-DESH', 'Sibling (younger or general). erkek kardeş = younger brother, kız kardeş = younger sister. kardeşim = my sibling.', 'word', 'Kız kardeşim öğrenci.', '"My younger sister is a student."', null, [ACT.grammarFamily]),
    createContentItem('oğul / kız', 'o-UL / KIZ', 'Son / daughter. Possessives: oğlum (my son, irregular: oğul → oğl- + um), kızım (my daughter). Also used as forms of endearment.', 'word', 'Oğlum on yaşında.', '"My son is ten."', null, [ACT.grammarFamily]),
    createContentItem('eş / koca / karı', 'ESH / ko-JA / ka-RI', 'eş = spouse (gender-neutral, modern, preferred); koca = husband (older usage); karı = wife (somewhat coarse in modern usage — prefer eş or hanım).', 'word', 'Eşim mimar.', '"My spouse is an architect." — modern neutral.', null, [ACT.grammarFamily]),
    createContentItem('dede / nine', 'de-DE / Nİ-ne', 'Grandfather / grandmother. dedem (my grandfather), ninem (my grandmother). Also büyükbaba/büyükanne (formal compound forms).', 'word', 'Dedem köyde yaşıyor.', '"My grandfather lives in the village."', null, [ACT.grammarFamily]),
    createContentItem('amca / dayı', 'am-JA / da-YI', 'Uncle. amca = paternal uncle (father\'s brother); dayı = maternal uncle (mother\'s brother). The distinction is fixed and traditional.', 'word', 'Amcam Almanya\'da çalışıyor.', '"My (paternal) uncle works in Germany."', null, [ACT.grammarFamily]),
    createContentItem('hala / teyze', 'HA-la / tey-ZE', 'Aunt. hala = paternal aunt (father\'s sister); teyze = maternal aunt (mother\'s sister). teyze is also used as respectful address to any older woman in casual contexts.', 'word', 'Teyzemin evi Çanakkale\'de.', '"My (maternal) aunt\'s house is in Çanakkale."', null, [ACT.grammarFamily]),

    // Reading
    createContentItem('Türkiye tanıtımı', 'introduction to Turkey', 'A paragraph introducing Turkey to a foreign reader.', 'paragraph', 'Türkiye, Avrupa ve Asya kıtaları üzerinde kurulu bir ülke. Yaklaşık 85 milyon nüfusu var. Başkenti Ankara, ama en büyük şehri İstanbul. Türkiye\'nin yedi coğrafi bölgesi var: Marmara, Ege, Akdeniz, Karadeniz, İç Anadolu, Doğu Anadolu, Güneydoğu Anadolu. Türk yemek kültürü çok zengindir — kebap, baklava, çay, simit dünyaca ünlü. Türk insanı misafirperverdir; misafir Allah\'tan gelir.', 'Translation: "Turkey is a country established on the European and Asian continents. It has approximately 85 million population. Its capital is Ankara, but its biggest city is Istanbul. Turkey has seven geographic regions… Turkish food culture is very rich — kebap, baklava, çay, simit are world-famous. Turkish people are hospitable; a guest comes from God."', [{ target: 'yaklaşık', note: 'approximately' }, { target: 'nüfus', note: 'population' }, { target: 'coğrafi bölge', note: 'geographic region' }, { target: 'misafirperver', note: 'hospitable; literally "guest-loving"' }, { target: 'Misafir Allah\'tan gelir', note: 'proverb: "The guest comes from God" — foundational hospitality value' }], [ACT.reading]),

    // Listening
    createContentItem('İki öğrenci karşılaştırıyor', 'two students compare', 'A 4-turn dialogue between a Turkish and an American student.', 'conversation', 'Ahmet: Amerika\'da yaz nasıl?\nSara: Çok sıcak. Türkiye\'den daha sıcak olabilir.\nAhmet: Antalya çok sıcaktır, gel görsen!\nSara: Senin en sevdiğin yemek ne?\nAhmet: Annemin yaptığı mantı. Sen ne seviyorsun?\nSara: Şimdiden simiti seviyorum — her sabah yiyorum.', 'Natural exchange comparing summers and foods.', [{ target: '-den daha sıcak', note: 'comparative pattern' }, { target: 'çok sıcaktır', note: '-tır adds emphasis/generalization' }, { target: 'gel görsen', note: 'idiomatic "you should come and see"; 2nd-conditional' }, { target: 'şimdiden', note: '"already / by now"; -den ABL with şimdi (now)' }], [ACT.listening]),

    // Writing
    createContentItem('Ülkemi tanıtıyorum', 'introducing my country', 'Template comparing your country to Turkey.', 'sentence', '1. Ülkem [İSİM]. 2. Nüfusu yaklaşık [N] milyon. 3. Türkiye\'den daha [adj1] / [adj2]. 4. En sevdiğim yemek [yemek]. 5. Ailem [kim].', 'Five sentences using comparison and family.', null, [ACT.writing]),

    // Culture
    createContentItem('Misafirperverlik', 'hospitality', 'Misafir (guest) culture is foundational. Visitors are offered çay within 30 seconds of arrival, never allowed to leave hungry, and refusing food/tea can be socially fraught. Hosts often offer their bed; guests are treated like royalty.', 'sentence', 'Misafir Allah\'tan gelir, rızkıyla gelir.', 'Proverb: "The guest comes from God, comes with their own provision" — refusing hospitality is refusing a blessing.', [{ target: 'Çay ister misiniz?', note: 'first 30-second question to any visitor' }, { target: 'Yemek yedin mi?', note: '"Did you eat?" — second-most-asked question' }, { target: 'Refusing politely', note: 'say "Teşekkürler, ben tokum" (I am full); host may insist 2-3 times' }], [ACT.culture]),
    createContentItem('Aile yapısı', 'family structure', 'Turkish families remain tightly knit. Multi-generational households common in Anatolia; urban families maintain frequent contact with extended family. Bayrams (Şeker, Kurban) are major reunion times. Elders are addressed with respect (siz, dedeciğim, anneciğim).', 'sentence', 'Bayramlarda büyük aile toplanır.', 'Family-first culture; major decisions often involve parents even for adults.', null, [ACT.culture]),
    createContentItem('Doğu / Batı gerilimi', 'East/West tension', 'A central tension in Turkish life: secular modern urban West (İstanbul, İzmir, Boğaziçi) vs religious conservative Anatolian East. Both real, both vibrant. Boğaziçi students often come from across this divide.', 'sentence', 'Boğaziçi\'nde her bölgeden insan var.', 'Avoid simplistic stereotypes; modern Turkey is layered.', null, [ACT.culture]),

    // Task
    createContentItem('Görev: kültür alışverişi', 'task: cultural exchange', 'Roleplay introducing your country to a Turkish classmate. AI plays the Turk; you describe and compare. 6 turns: geography, food, family, customs.', 'conversation', '1. AI: Senin ülken nasıl?\n2. Sen: Geography + comparison\n3. AI: Yemekler nasıl?\n4. Sen: Food + likes\n5. AI: Aile nasıl?\n6. Sen: Family + closing', 'Use -den daha, sevmek, family possessives.', null, [ACT.task]),
  ],
};

module.exports = lesson;
