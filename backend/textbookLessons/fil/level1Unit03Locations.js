// Level 1 Unit 3 — Locations & Directions (Filipino/Tagalog)
// Functions: places in town, asking and giving directions, locative prepositions,
// the verb pumunta and movement, distance vocabulary, public landmarks.

const createContentItem = (target, pron, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization: pron, nativeText: note,
  pronunciation: pron, exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'fil-l1u3-orientation',
  pronunciation: 'fil-l1u3-pronunciation',
  vocabularyPlaces: 'fil-l1u3-vocab-places',
  vocabularyDirections: 'fil-l1u3-vocab-directions',
  grammarPumunta: 'fil-l1u3-grammar-pumunta',
  grammarPrepositions: 'fil-l1u3-grammar-prepositions',
  grammarSaanQuestions: 'fil-l1u3-grammar-saan-questions',
  reading: 'fil-l1u3-reading',
  listening: 'fil-l1u3-listening',
  writing: 'fil-l1u3-writing',
  culture: 'fil-l1u3-culture',
  task: 'fil-l1u3-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Name 15+ places in a Philippine town (palengke, simbahan, paaralan, ospital, kanto, etc.).', 'Ask "where is" and give simple directions using kaliwa/kanan/diretso/sa likod ng/sa harap ng.', 'Use pumunta (actor-focus go) in three aspects (will go, going, went) to talk about destinations.'], task: 'Navigate from UP Diliman to Cubao using only Filipino directions — by the end of this lesson, you should be able to ask a stranger for directions and follow the answer.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps', goals: ['Pronounce diretso /diˈrɛtso/ "straight" with clean penultimate stress, not English-like "DI-ret-so".', 'Apply the d/r alternation: dito "here" can become rito after certain vowel endings (sa rito vs sa dito).', 'Pronounce kaliwa (kah-li-WAH, final stress) and kanan (KA-nan, penult).'], task: 'Read each direction word aloud with correct stress.' },
  { id: ACT.vocabularyPlaces, section: 'Vocabulary I', title: 'Places in a Philippine town', goals: ['Memorize 15 places covering market, religious, civic, transit, and commercial.', 'Distinguish Spanish-origin (palengke, simbahan, eskwelahan) from native (bahay, daan, ilog) and English (mall, jeepney station).'], task: 'Point at a map of your neighborhood and name each landmark in Filipino.' },
  { id: ACT.vocabularyDirections, section: 'Vocabulary II', title: 'Directions and relative position', goals: ['Use kaliwa (left), kanan (right), diretso (straight), tumawid (cross), kumanan (turn right) reliably.', 'Use sa harap (in front), sa likod (behind), sa tabi (beside), sa loob (inside), sa labas (outside) for relative position.'], task: 'Describe the position of five objects relative to landmarks in your room.' },
  { id: ACT.grammarPumunta, section: 'Grammar I', title: 'Pumunta — the actor-focus go verb in three aspects', goals: ['Conjugate pumunta in three aspects: pupunta (contemplated/future), pumupunta (imperfective/ongoing), pumunta (perfective/completed).', 'Use the destination marker sa: Pumunta ako sa palengke "I went to the market".'], task: 'Form three sentences using each aspect of pumunta.' },
  { id: ACT.grammarPrepositions, section: 'Grammar II', title: 'Locative compounds: sa harap, sa likod, sa tabi, sa loob, sa labas', goals: ['Form locative compounds with sa + body-part/location word + ng + reference: sa harap ng simbahan "in front of the church".', 'Distinguish nasa harap (verb-like "is in front") from sa harap (preposition, "in front of").'], task: 'Describe one landmark using three different locative compounds.' },
  { id: ACT.grammarSaanQuestions, section: 'Grammar III', title: 'Saan, papaano, gaano kalayo — direction question words', goals: ['Use Saan ka pupunta? "Where are you going?" with future-aspect verb.', 'Use Papaano (or Paano) pumunta sa…? "How does one get to…?".', 'Use Gaano kalayo? "How far?" to ask distance.'], task: 'Form one question of each type about your destination.' },
  { id: ACT.reading, section: 'Reading', title: 'Reading directions to UP from Cubao', goals: ['Read a paragraph giving directions and follow the route on a mental map.', 'Identify direction-words and landmarks.'], task: 'Read the paragraph; trace the path; answer four questions.' },
  { id: ACT.listening, section: 'Listening', title: 'Asking for directions', goals: ['Follow a dialogue between a tourist and a local giving directions.', 'Practice register: tourist uses pô + kayo, local responds with no pô.'], task: 'Listen, then perform with swapped roles.' },
  { id: ACT.writing, section: 'Writing', title: 'Write directions from your home to your school', goals: ['Use 4-5 sentences with diretso/kaliwa/kanan and sa harap/likod/tabi.'], task: 'Write and read aloud.' },
  { id: ACT.culture, section: 'Culture', title: 'Filipino navigation by landmark', goals: ['Know that Filipinos navigate by LANDMARKS more than street names — "sa tapat ng 7-Eleven" (across from 7-Eleven) is more useful than "sa Roces Avenue".', 'Recognize jeepney terminals, sari-sari stores, and parishes as universal landmarks in any town.'], task: 'Compare your home country\'s navigation style with the Philippines\'.' },
  { id: ACT.task, section: 'Task', title: 'Find UP Diliman from Cubao', goals: ['Roleplay asking a stranger for directions, navigating two turns, asking for confirmation mid-route, and arriving.'], task: 'Roleplay with the AI tutor as a Cubao local.' },
];

const lesson = {
  title: 'Level 1 · Unit 3: Saan Tayo Pupunta? — Locations & Directions',
  category: 'directions',
  difficulty: 'beginner',
  targetLang: 'fil',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-directions', label: 'Asking for directions', goal: 'Use Saan / Papaano / Gaano kalayo with pô when addressing strangers.' },
    { id: 'giving-directions', label: 'Giving directions', goal: 'Chain diretso / kaliwa / kanan / sa harap / sa likod fluently.' },
    { id: 'destination', label: 'Stating destination', goal: 'Use pumunta in the right aspect with sa + place.' },
    { id: 'distance', label: 'Talking about distance', goal: 'Use malapit, malayo, hindî kalayuan, sandali lang.' },
  ],
  relatedPools: ['topic-places', 'topic-directions'],
  content: [
    createContentItem('Layunin', 'la-YU-nin', 'By the end of this lesson, you can name places in a Philippine town, ask for directions politely, follow the answer, and give directions to someone else — all using sa-case locatives and the actor-focus go verb.', 'word', 'Functional language: pagtatanong (asking) · pagtuturo (showing the way) · paggalaw (moving) · pagsukat ng layo (measuring distance)', 'Four micro-skills covering urban Philippine navigation.', null, [ACT.orientation]),
    createContentItem('Tunay na sitwasyon', 'TU-nay na sit-wa-SYON', 'You are at Cubao, the major Quezon City transport hub, and need to find UP Diliman. You ask a stranger — a tita selling fishball at the kanto — and she gives directions involving two jeepney rides and a landmark.', 'word', 'Tita: "Sumakay ka ng jeep papuntang Philcoa, tapos magbaba ka sa tapat ng SM North."', 'Typical local directions: jeepney + destination landmark + transfer point.', null, [ACT.orientation]),
    createContentItem('Tatlong antas', 'TAT-long an-TAS', 'Direction-asking has the usual three registers. Casual: "Saan ang UP?". Polite: "Saan po ang UP?". Respectful: "Saan pô ang UP, ho?" with both pô (polite) and ho (older variant of pô, used by some speakers).', 'word', 'Saan / Saan pô / Saan pô… ho', 'Three registers for the same direction question — choose by relationship.', null, [ACT.orientation]),

    createContentItem('diretso', 'di-RET-so', '"Straight ahead". From Spanish "derecho". One of the three foundational direction words. Often comes first in a route: Diretso ka muna, then turn.', 'word', 'Diretso ka muna sa kahabaan ng Roces.', '"Go straight along Roces (Avenue) first."', null, [ACT.pronunciation, ACT.vocabularyDirections]),
    createContentItem('kaliwa', 'ka-li-WA', '"Left". Final stress (mabilis). Verb form: kumaliwa "turn left".', 'word', 'Sa kanto, kumaliwa ka.', '"At the corner, turn left."', null, [ACT.pronunciation, ACT.vocabularyDirections]),
    createContentItem('kanan', 'KA-nan', '"Right". Penultimate stress. Verb form: kumanan "turn right".', 'word', 'Pagkatapos ng simbahan, kumanan ka.', '"After the church, turn right."', null, [ACT.pronunciation, ACT.vocabularyDirections]),
    createContentItem('palengke', 'pa-LENG-ke', '"Wet market". Spanish-origin. Where Filipinos buy fresh produce, fish, and meat. Distinct from modern mall (supermarket-mall hybrid). Every neighborhood has a palengke; some are famous (Quinta in Manila, Marikina, Baclaran).', 'word', 'Pupunta ako sa palengke bukas ng umaga.', '"I will go to the market tomorrow morning" — typical Filipino weekly errand.', null, [ACT.vocabularyPlaces]),
    createContentItem('simbahan', 'sim-BA-han', '"Church (building)". From Spanish "iglesia" but uses native compound: sim- (worship root) + bahan (place). The Philippines is ~80% Catholic; nearly every barangay has a church. Famous: Quiapo (Manila), Manaoag (Pangasinan), Baclaran (Manila).', 'word', 'Tuwing Linggo, nagsisimba kami sa simbahan ng Quiapo.', '"Every Sunday, we attend mass at Quiapo church" — nagsisimba is the verb "to attend mass".', null, [ACT.vocabularyPlaces]),
    createContentItem('paaralan / eskwelahan', 'pa-A-ra-lan / es-kwe-LA-han', '"School". Native paaralan (from aral "study/lesson") is formal. Eskwelahan (from Spanish escuela + native -han suffix) is everyday. Both correct. Schools = paaralan in DepEd documents; eskwelahan in casual talk.', 'word', 'Malapit ang eskwelahan sa bahay namin.', '"The school is near our house" — malapit = "near".', null, [ACT.vocabularyPlaces]),
    createContentItem('ospital', 'os-pi-TAL', '"Hospital". From Spanish "hospital". Major hospitals in Manila: PGH (Philippine General Hospital, public), Makati Medical Center (private), St. Luke\'s (private). Phrase: pumunta sa ospital "go to the hospital".', 'word', 'Dinala namin ang lola sa ospital kahapon.', '"We brought grandma to the hospital yesterday."', null, [ACT.vocabularyPlaces]),
    createContentItem('parmasya / botika', 'par-MAS-ya / bo-TI-ka', '"Pharmacy / drugstore". Two terms: parmasya (Spanish "farmacia") and botika (Spanish "botica"). Modern speech: botika more common. Mercury Drug and Watsons are everywhere.', 'word', 'Bumili ako ng gamot sa botika.', '"I bought medicine at the drugstore."', null, [ACT.vocabularyPlaces]),
    createContentItem('bangko', 'BANG-ko', '"Bank". From Spanish "banco". Major Philippine banks: BPI, BDO, Metrobank, Landbank. Banking hours typically Mon-Fri 9-3.', 'word', 'Sa bangko ako pupunta mamayang umaga.', '"I will go to the bank later this morning."', null, [ACT.vocabularyPlaces]),
    createContentItem('post office / koreyo', 'POST O-fis / ko-RE-yo', '"Post office". English "post office" is common; older Spanish-loan koreyo (from "correo") is regional. Modern Filipinos use private courier (LBC, JRS) more than the official post office.', 'word', 'Magpadala ako ng padala sa LBC, hindî sa post office.', '"I will send the package via LBC, not the post office" — LBC is the dominant courier.', null, [ACT.vocabularyPlaces]),
    createContentItem('mall', 'MOL', '"Shopping mall". English loan. The Philippines is famous for its enormous malls — SM (six mega-malls in Metro Manila alone), Ayala (Glorietta, Greenbelt, TriNoma), Robinsons. Going to the mall (mag-mall) is a major weekend activity.', 'word', 'Pupunta kami sa SM North Edsa mamaya.', '"We will go to SM North Edsa later" — SM North is the largest mall in Quezon City, walking distance from UP.', null, [ACT.vocabularyPlaces]),
    createContentItem('bahay', 'BA-hay', '"House / home". Native word. Bahay can mean both the building and "home" in the abstract sense. With pamilya: "bahay-pamilya" = family home.', 'word', 'Nasa bahay ako buong araw.', '"I am at home all day."', null, [ACT.vocabularyPlaces]),
    createContentItem('opisina', 'o-pi-SI-na', '"Office". From Spanish "oficina". Used both for an individual office and a corporate office complex. White-collar workplace.', 'word', 'Mag-work-from-home ako ngayon, hindî sa opisina.', '"I am working from home today, not at the office" — typical post-2020 sentence.', null, [ACT.vocabularyPlaces]),
    createContentItem('istasyon ng jeep', 'is-tas-YON ng JIP', '"Jeepney terminal". From Spanish estación + native genitive ng + jeep. Major terminal at Cubao, Philcoa, Quiapo. Jeepneys are the iconic colorful shared transit.', 'word', 'Sa istasyon ng jeep tayo magkita.', '"Let\'s meet at the jeepney terminal."', null, [ACT.vocabularyPlaces]),
    createContentItem('estasyon ng MRT', 'es-tas-YON ng EM-AR-TI', '"MRT station". MRT = Metro Rail Transit, the elevated train along EDSA. LRT = Light Rail Transit (older lines). Both are everyday commute backbones in Metro Manila.', 'word', 'Magbaba ka sa estasyon ng Quezon Avenue.', '"Get off at Quezon Avenue station."', null, [ACT.vocabularyPlaces]),
    createContentItem('plasa / plaza', 'PLA-sa', '"Public square / plaza". From Spanish "plaza". Every old Philippine town has a plaza facing the church (Spanish colonial planning). Important social space.', 'word', 'Sa plasa ng Quiapo nag-uumpukan ang mga matatanda.', '"Old folks gather at Quiapo plaza" — nag-uumpukan = "to gather and chat".', null, [ACT.vocabularyPlaces]),
    createContentItem('kanto', 'KAN-to', '"Street corner". From Spanish "esquina" → kanto. The classic neighborhood spot — every kanto has a sari-sari store or a fishball vendor. "Sa kanto" = "at the corner".', 'word', 'Magkita tayo sa kanto.', '"Let\'s meet at the corner."', null, [ACT.vocabularyPlaces]),
    createContentItem('sari-sari store', 'sa-ri-SA-ri STOR', '"Neighborhood convenience store". A uniquely Filipino institution — small family-run shops selling everything (sari-sari = "various"). Reduplication of sari "kind/variety". Sells single sticks of cigarettes, sachets of shampoo, soft drinks, bread.', 'word', 'Pakibili ka ng asin sa sari-sari store.', '"Please buy some salt at the sari-sari store" — pakí- + bili.', null, [ACT.vocabularyPlaces]),
    createContentItem('barangay', 'ba-ra-NGAY', '"Village / smallest political unit". The barangay is the basic Philippine political division, smaller than a city or town. Every barangay has a captain and council. Phrase: "barangay hall" = the local administrative office.', 'word', 'Anong barangay ka?', '"Which barangay are you (from)?" — typical question when filling forms.', null, [ACT.vocabularyPlaces]),
    createContentItem('Cubao', 'KU-baw', '"Cubao". A major commercial and transit district in Quezon City — the heart of north Metro Manila transport. Famous for Araneta Coliseum, Smart Araneta, and as a jeepney/MRT/LRT hub. From Cubao, you can reach almost anywhere in Metro Manila.', 'word', 'Sa Cubao sumakay tayo.', '"Let\'s ride from Cubao."', null, [ACT.vocabularyPlaces]),
    createContentItem('Quezon City', 'KE-son SI-ti', '"Quezon City (QC)". The largest city in Metro Manila by area and population. UP Diliman is in QC. Named after Manuel L. Quezon, second president of the Philippines.', 'word', 'Taga-Quezon City ako.', '"I am from QC" — major neighborhood marker.', null, [ACT.vocabularyPlaces]),

    createContentItem('sa harap ng', 'sa HA-rap ng', '"In front of". Compound locative: sa + harap (front) + ng (genitive). Used to describe relative position. The reference noun follows ng.', 'sentence', 'Sa harap ng simbahan ang sari-sari store.', '"The sari-sari store is in front of the church."', null, [ACT.grammarPrepositions]),
    createContentItem('sa likod ng', 'sa li-KOD ng', '"Behind / at the back of". Sa + likod (back) + ng. Common for describing hidden/blocked locations.', 'sentence', 'Sa likod ng bahay ang hardin.', '"The garden is behind the house."', null, [ACT.grammarPrepositions]),
    createContentItem('sa tabi ng', 'sa ta-BI ng', '"Beside / next to". Sa + tabi (side) + ng. Used for adjacent objects.', 'sentence', 'Sa tabi ng eskwelahan ang palengke.', '"The market is beside the school."', null, [ACT.grammarPrepositions]),
    createContentItem('sa loob ng', 'sa lo-OB ng', '"Inside / within". Sa + loob (interior) + ng.', 'sentence', 'Nasa loob ng mall ang restawran.', '"The restaurant is inside the mall."', null, [ACT.grammarPrepositions]),
    createContentItem('sa labas ng', 'sa la-BAS ng', '"Outside / beyond". Sa + labas (exterior) + ng. Also figuratively: "sa labas ng bansa" = "abroad".', 'sentence', 'Sa labas ng simbahan ang mga vendor.', '"The vendors are outside the church."', null, [ACT.grammarPrepositions]),
    createContentItem('sa tapat ng', 'sa ta-PAT ng', '"Across from / directly opposite". Sa + tapat (opposite/front) + ng. Very common in Filipino directions — "sa tapat ng 7-Eleven" is everywhere.', 'sentence', 'Sa tapat ng 7-Eleven ang sakayan.', '"The pickup point is across from 7-Eleven."', null, [ACT.grammarPrepositions]),
    createContentItem('sa ibabaw ng', 'sa i-BA-baw ng', '"On top of / above". Sa + ibabaw + ng. Compare with sa ilalim ng "under/below".', 'sentence', 'Sa ibabaw ng mesa ang libro.', '"The book is on top of the table."', null, [ACT.grammarPrepositions]),
    createContentItem('sa ilalim ng', 'sa i-LA-lim ng', '"Under / below". Sa + ilalim + ng.', 'sentence', 'Sa ilalim ng kama ang sapatos.', '"The shoes are under the bed."', null, [ACT.grammarPrepositions]),

    createContentItem('pumunta (root: punta)', 'pu-MUN-ta', 'Actor-focus verb "to go". Root: punta. Three aspects: pupunta (future), pumupunta (imperfective), pumunta (completed). Always with destination marker sa.', 'sentence', 'Pumunta ako sa palengke kahapon. Pumupunta ako sa palengke tuwing Linggo. Pupunta ako sa palengke bukas.', '"I went to the market yesterday. I go to the market every Sunday. I will go to the market tomorrow."', [
      { target: 'pumunta — completed', note: 'past-tense actor-focus' },
      { target: 'pumupunta — imperfective', note: 'ongoing or habitual' },
      { target: 'pupunta — contemplated', note: 'future / planned' },
      { target: '-um- infix marks actor focus', note: 'inserted after the first consonant of the root' },
    ], [ACT.grammarPumunta]),
    createContentItem('Saan ka pupunta?', 'sa-AN ka pu-PUN-ta', '"Where are you going?". Most common direction question. Variant: Saan ka galing? "Where are you coming from?" (origin, past).', 'sentence', 'Saan ka pupunta? — Pupunta ako sa UP.', '"Where are you going? — I am going to UP." — typical conversation opener in Manila.', null, [ACT.grammarSaanQuestions]),
    createContentItem('Papaano / Paano', 'pa-pa-A-no / pa-A-no', '"How". For asking direction-route questions: Paano pumunta sa UP? "How do you get to UP?". Papaano is the formal/longer version; paano is everyday.', 'sentence', 'Paano pumunta sa SM Megamall mula dito?', '"How do you get to SM Megamall from here?" — mula = "from / starting at".', null, [ACT.grammarSaanQuestions]),
    createContentItem('Gaano kalayo?', 'ga-A-no ka-la-YO', '"How far?". Gaano = "how much/how" + ka- + adjective root. Replies: malapit (near), malayo (far), hindî kalayuan (not that far), sandali lang (just a moment).', 'sentence', 'Gaano kalayo ang UP mula dito? — Hindî kalayuan, mga 15 minuto lang.', '"How far is UP from here? — Not that far, just about 15 minutes."', null, [ACT.grammarSaanQuestions]),

    createContentItem('Pagbasa', 'pag-BA-sa', 'Read: Galing si Jenny sa Cubao at gusto niyang pumunta sa UP Diliman. Tinanong niya ang isang tita sa sari-sari store. Sabi ng tita: "Sumakay ka ng jeep papuntang Philcoa. Diretso lang siya hanggang sa SM North Edsa. Magbaba ka sa tapat ng SM. Doon may sakayan papuntang UP. Mga 5 minuto lang." Sumakay si Jenny ng jeep at sumunod sa direksyon. Pagdating sa Philcoa, sumakay siya ng panibagong jeep, at pagkatapos ng 5 minuto, nasa UP na siya.', 'sentence', 'Jenny is from Cubao and wants to go to UP Diliman. She asked a tita at the sari-sari store. The tita said: "Take a jeep to Philcoa. It goes straight to SM North Edsa. Get off in front of SM. There is a jeep terminal there to UP. About 5 minutes." Jenny took the jeep and followed the directions. Upon arriving at Philcoa, she took another jeep, and after 5 minutes, she was at UP.', 'Note: jeep papuntang Philcoa (jeepney bound for Philcoa), magbaba (get off), sakayan (ride point), sumakay (took/rode).', null, [ACT.reading]),

    createContentItem('Diyalogo', 'di-YA-lo-go', 'Dialogue: Turista: "Excuse me pô, saan po dito ang UP Diliman?" / Tita: "Ay, kuya, malapit lang. Diretso ka diyan, kumanan ka sa kanto. Tapos diretso pa, makikita mo na ang gate ng UP." / Turista: "Mga gaano kalayo pô?" / Tita: "Sandali lang, mga sampung minuto pa lakad."', 'sentence', 'Tourist: "Excuse me, where is UP Diliman?" / Tita: "Oh, it\'s close. Go straight, turn right at the corner. Then straight more, you\'ll see the UP gate." / Tourist: "About how far?" / Tita: "Just a moment, about 10 minutes more walking."', 'Notes: pô throughout from tourist (respect to elder); tita uses kuya in response (informal warmth); "sandali lang" softens the distance estimate.', null, [ACT.listening]),

    createContentItem('Pagsulat', 'pag-SU-lat', 'Write 5 sentences giving directions from your home to your school. Required: at least one diretso/kaliwa/kanan, one sa harap/likod/tabi compound, one sakayan-related reference, and the linker -ng/na.', 'sentence', 'Modelo: Mula sa bahay ko, diretso ka sa kahabaan ng Roces. Pagdating sa kanto, kumanan ka. Sa likod ng simbahan, makikita mo ang sari-sari store. Sa tabi nito ang sakayan ng jeep. Sumakay ka ng jeep papuntang Cubao, at malapit na ang eskwelahan ko.', '"From my house, go straight along Roces. At the corner, turn right. Behind the church, you\'ll see the sari-sari store. Beside it is the jeep stop. Take the jeep to Cubao, and my school is near."', null, [ACT.writing]),

    createContentItem('Filipino navigation culture', 'kul-TU-rang pa-na-nav-i-GAYT', 'Filipinos navigate by LANDMARKS more than street names. "Sa tapat ng 7-Eleven" (across from 7-Eleven) is more useful than "sa Roces Avenue corner Maginhawa Street". Universal landmarks: 7-Eleven, McDonald\'s, the parish church, the sari-sari store, the jeepney terminal. Street names are often unfamiliar even to longtime residents.', 'word', 'Sa tapat ng Jollibee, kumanan ka.', '"Across from Jollibee, turn right" — Jollibee (Filipino fast-food chain) is a universal landmark.', [
      { target: '7-Eleven, McDo, Jollibee', note: 'universal landmarks; faster than street names' },
      { target: 'simbahan = anchor', note: 'every town center has a Catholic parish' },
      { target: 'sari-sari store = neighborhood landmark', note: 'in barangay-level navigation' },
      { target: 'jeepney terminal', note: 'major regional landmark in any town' },
    ], [ACT.culture]),

    createContentItem('Gawain', 'ga-WA-in', 'Task: Roleplay finding UP Diliman from Cubao. The AI tutor plays a tita at a Cubao sari-sari store. 6 turns. Required: greet with pô, ask "saan po", ask "gaano kalayo", confirm directions, thank, leave.', 'sentence', 'Halimbawa: 1) "Ate, paumanhin pô, saan pô ang sakayan papuntang UP?" 2) Tita gives directions. 3) "Ah, salamat pô. Gaano kalayo?" 4) Tita answers. 5) "Sige pô, marami pô salamat." 6) "Walang anuman, ingat ka."', '6 turns with pô throughout (tourist to local) and warm informal response (local to tourist).', null, [ACT.task]),
  ],
};

module.exports = lesson;
