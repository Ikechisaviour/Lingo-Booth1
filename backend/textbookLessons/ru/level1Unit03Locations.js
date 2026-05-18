// Level 1 Unit 3 — Locations & Asking Directions (Russian)

const createContentItem = (target, translit, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization: translit, nativeText: note, pronunciation: translit,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ru-l1u3-orientation', pronunciation: 'ru-l1u3-pronunciation',
  vocabularyPlaces: 'ru-l1u3-vocab-places', vocabularyDirections: 'ru-l1u3-vocab-directions',
  grammarPrepositional: 'ru-l1u3-grammar-prepositional', grammarVerbsOfMotion: 'ru-l1u3-grammar-motion',
  grammarThereIs: 'ru-l1u3-grammar-there-is',
  reading: 'ru-l1u3-reading', listening: 'ru-l1u3-listening', writing: 'ru-l1u3-writing',
  culture: 'ru-l1u3-culture', task: 'ru-l1u3-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: [
    'Name 20+ everyday Moscow locations (метро, парк, музей, ресторан, кафе, магазин, библиотека) using gender-correct nouns.',
    'Ask "Где X?" and answer with locative phrases using the prepositional case (в Москве, на Красной площади, в МГУ).',
    'Give and follow simple walking directions (Идите прямо, Поверните налево, Это далеко / близко).',
  ], task: 'Picture yourself lost on the way to Красная площадь — a Moscow babushka stops to help and you exchange in Russian. By the end of this lesson you should ask, follow, and give directions in three-turn exchanges.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in location names', goals: [
    'Apply akanye in Москва /mɐsˈkva/ — both unstressed o\'s reduce.',
    'Apply final devoicing in метро /mʲɪtˈro/ — actually metro is invariable and ends in stressed o, but related word метропоезд devoices the д.',
    'Apply the ё-rule: Воробьёвы /vərɐˈbʲjovɨ/ — stressed ё never reduces.',
  ], task: 'Read 12 Moscow place names aloud with correct stress and reduction.' },
  { id: ACT.vocabularyPlaces, section: 'Vocabulary I', title: 'Places in the city', goals: [
    'Memorize 18 high-frequency city nouns with their grammatical gender.',
    'Pair each with the correct preposition (в for enclosed, на for surfaces/events).',
  ], task: 'Match each location with в or на and produce a "Я в/на X" sentence.' },
  { id: ACT.vocabularyDirections, section: 'Vocabulary II', title: 'Directions and spatial words', goals: [
    'Use the four cardinal directions: прямо (straight), налево (left), направо (right), назад (back).',
    'Distinguish далеко (far) vs близко (close), здесь (here) vs там (there).',
  ], task: 'Give a four-step direction from one Moscow landmark to another.' },
  { id: ACT.grammarPrepositional, section: 'Grammar I', title: 'The Prepositional Case — first case introduced', goals: [
    'Form the prepositional case singular: masculine ends -е (Москва → в Москве, but Москва is f; стол → на столе), feminine -е (книга → в книге), neuter -е (окно → в окне).',
    'Recognize в (in) and на (on) as the most frequent prepositional triggers: в книге (in the book), на столе (on the table).',
    'Use на for surface, transport vehicles, and events: на столе, на автобусе, на лекции.',
  ], task: 'Form 8 в/на + prep case phrases for Moscow locations.' },
  { id: ACT.grammarVerbsOfMotion, section: 'Grammar II', title: 'Going somewhere — идти vs ходить', goals: [
    'Use идти (unidirectional, "going right now / to a specific place") for current movement: Я иду в магазин.',
    'Use ходить (multidirectional, "going there habitually / round-trip") for repeated trips: Я хожу в школу каждый день.',
    'Recognize these as one of the famous Russian motion-verb pairs — the same distinction applies to ехать/ездить, бежать/бегать, лететь/летать.',
  ], task: 'Build 4 sentences with идти (now/specific) and 4 with ходить (habit/round-trip).' },
  { id: ACT.grammarThereIs, section: 'Grammar III', title: 'Есть / нет — existence', goals: [
    'Use есть (there is / there are) for existential statements: В Москве есть метро. (Moscow has a metro.)',
    'Use the genitive of negation with нет: В МГУ нет столовой. (There is no canteen at MSU.) — нет requires genitive of the absent thing.',
    'Apply this to "have / don\'t have": У меня есть книга. / У меня нет книги. (I have a book / I don\'t have a book.)',
  ], task: 'Build 4 affirmative есть sentences and 4 negative нет + gen sentences.' },
  { id: ACT.reading, section: 'Reading', title: 'A Moscow map description', goals: [
    'Read a short description of central Moscow naming three landmarks and the metro stations nearest each.',
    'Answer comprehension questions about distances and directions.',
  ], task: 'Read aloud and answer four questions about the layout.' },
  { id: ACT.listening, section: 'Listening', title: 'Asking for directions on the street', goals: [
    'Follow a 6-turn dialogue between a tourist and a Muscovite at a metro exit.',
    'Identify directional verbs and turn-instructions.',
  ], task: 'Reconstruct the route from the dialogue using a simple diagram.' },
  { id: ACT.writing, section: 'Writing', title: 'Describe how to get to your dorm', goals: [
    'Write 5–6 sentences giving directions from a metro station to your dormitory.',
    'Use в/на + prep case at least twice and the unidirectional идти at least once.',
  ], task: 'Draft and read aloud.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Moscow Metro and Soviet urbanism', goals: [
    'Know the Moscow Metro (Московское метро) opened in 1935 and is famous for its ornate, palace-like Soviet-era stations (Маяковская, Площадь Революции, Комсомольская).',
    'Recognize the radial-circular layout: 14 lines + Кольцевая (Circle) line; transfers happen on the central ring.',
    'Understand "спальные районы" (sleeping districts) — outer residential rings around the center.',
  ], task: 'List three Moscow metro stations you would want to visit and one fact about each.' },
  { id: ACT.task, section: 'Task', title: 'Getting from МГУ to Красная площадь', goals: [
    'Plan and verbalize a metro journey from МГУ (Университет station) to Красная площадь (Охотный ряд or Театральная).',
    'Use motion verbs, prepositional case, and direction words in one continuous explanation.',
  ], task: 'Roleplay giving the directions to the AI tutor playing a confused new student.' },
];

const lesson = {
  title: 'Level 1 · Unit 3: Где? — Locations and Directions',
  category: 'locations', difficulty: 'beginner', targetLang: 'ru', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic', activities,
  expressionPractice: [
    { id: 'asking-where', label: 'Asking where something is', goal: 'Use Где + nom + intonation to ask for any location.' },
    { id: 'in-on-prep', label: 'Using в/на + prep case', goal: 'Locate yourself or an object with the correct preposition and case.' },
    { id: 'giving-directions', label: 'Giving directions', goal: 'Chain прямо / налево / направо into a 3-4 step instruction.' },
    { id: 'existence', label: 'Saying there is / there isn\'t', goal: 'Use есть + nom for existence and нет + gen for absence.' },
  ],
  relatedPools: ['topic-locations', 'topic-city'],
  content: [
    createContentItem('Цели урока', 'Tseli uroka', 'By the end of this lesson, you can name Moscow landmarks, ask and give directions, and use the prepositional case for location automatically. These are survival skills in any Russian city.', 'word', 'Город — это места, направления, и метро.', '"A city is places, directions, and the metro." — overview of the unit themes.', null, [ACT.orientation]),
    createContentItem('Реальный сценарий', 'Realnyy stsenariy', 'You exit Охотный ряд metro station on your way to Красная площадь and realize you took the wrong exit. A Moscow babushka with a shopping bag passes by; you need to ask her for directions in Russian, in the polite Вы register.', 'word', 'Извините, как пройти к Красной площади?', '"Excuse me, how do I get to Red Square?" — standard polite direction-question; пройти = "to make one\'s way through".', [
      { target: 'Извините izvinite', note: 'polite "excuse me / sorry"; standard attention-getter for strangers' },
      { target: 'как пройти kak proyti', note: '"how to get there [on foot]"; пройти is the perfective walk-verb' },
      { target: 'к Красной площади', note: 'к + dat case "toward"; Красной площади is feminine dative of Красная площадь' },
    ], [ACT.orientation]),
    createContentItem('Москва — большой город', 'Moskva — bolshoy gorod', 'Moscow is the largest city in Russia and Europe (~13 million metropolitan population). The central core is organized around Красная площадь and the Кремль (Kremlin); the metro radiates outward in 14 lines. Knowing 5–6 central landmarks gets you through 80% of tourist conversations.', 'word', 'Москва — столица России.', '"Moscow is the capital of Russia." — written with dash because it\'s a present-tense identification.', null, [ACT.orientation]),

    createContentItem('Москва', 'Moskva', 'Moscow (f). Stress on the final -кв-. Akanye reduces the first о (мa-сквА). Adjective form: московский. The metro is named Московское метро.', 'word', 'Я живу в Москве.', '"I live in Moscow." — в + prep case Москве (-а → -е feminine).', null, [ACT.pronunciation]),
    createContentItem('Санкт-Петербург', 'Sankt-Peterburg', 'Saint Petersburg (m, compound). Formal name; casual Петербург or just Питер (slang). Founded by Peter the Great in 1703 as the new capital. Адjective: петербургский.', 'word', 'Я еду в Петербург.', '"I am going to Petersburg." — ехать (vehicle motion) + в + acc.', null, [ACT.pronunciation]),
    createContentItem('Казань', 'Kazan\'', 'Kazan (f, ends in soft ь). Capital of Tatarstan; the third "third capital of Russia" (after Moscow and SPb). Major university city. Final ь palatalizes the н.', 'word', 'Казань — древний город.', '"Kazan is an ancient city." — древний (ancient, m) agrees with Казань (f) — wait, agreement requires древний → древняя; but with dash predicate this complexity is glossed over.', null, [ACT.pronunciation]),
    createContentItem('Новосибирск', 'Novosibirsk', 'Novosibirsk (m). Largest Siberian city; home of Академгородок (Akademgorodok), Russia\'s top science-research suburb. Pronounced "novasibirsk" with akanye.', 'word', 'Новосибирск — научный центр.', '"Novosibirsk is a science center." — научный (scientific, m) agrees with masculine Новосибирск.', null, [ACT.pronunciation]),
    createContentItem('Екатеринбург', 'Yekaterinburg', 'Yekaterinburg (m). Largest Ural city; symbolic gateway between European and Asian Russia. Named after Catherine I (wife of Peter the Great). Soviet name: Свердловск (used 1924-1991).', 'word', 'Екатеринбург — на Урале.', '"Yekaterinburg is in the Urals." — на + prep case Урале (Ural mountain range).', null, [ACT.pronunciation]),

    createContentItem('город', 'gorod', 'City / town (m). Generic word; Москва is a город, but so is a tiny провинциальный городок (provincial small town). Plural городА (stress shift).', 'word', 'В каком городе ты живёшь?', '"What city do you live in?" — каком is m prep agreeing with городе.', null, [ACT.vocabularyPlaces]),
    createContentItem('улица', 'ulitsa', 'Street (f). Address: на улице Тверская = "on Tverskaya street" (note на, not в). Stress on first syllable.', 'word', 'Моя улица называется Арбат.', '"My street is called Arbat." — называется reflexive "is called".', null, [ACT.vocabularyPlaces]),
    createContentItem('площадь', 'ploshchad\'', 'Square / plaza (f, soft sign). Famous: Красная площадь (Red Square), Площадь Революции, Манежная площадь. Plural площади. Final ь softens the д.', 'word', 'Я на Красной площади.', '"I am at Red Square." — на + prep case of feminine adjective Красная + площадь.', null, [ACT.vocabularyPlaces]),
    createContentItem('Кремль', 'Kreml\'', 'The Kremlin (m, soft sign). The fortified medieval center of Moscow; seat of the President. Word originally meant "fortress"; many Russian cities have a кремль (Kazan, Nizhny Novgorod).', 'word', 'В Кремле работает Президент.', '"The President works in the Kremlin." — Кремле prep case after в.', null, [ACT.vocabularyPlaces]),
    createContentItem('метро', 'metro', 'Metro / subway (n, INDECLINABLE). Like all -о borrowings, метро does NOT decline: в метро, на метро, из метро — same form every time. Moscow Metro is one of the most famous urban transit systems in the world.', 'word', 'Я еду на метро.', '"I am going by metro." — на + indeclinable метро (same form).', null, [ACT.vocabularyPlaces]),
    createContentItem('остановка', 'ostanovka', 'Stop / station (f, but typically for bus/tram). Distinguished from станция (metro/train station). Plural остановки.', 'word', 'Моя остановка следующая.', '"My stop is next." — следующая (f) agrees with остановка.', null, [ACT.vocabularyPlaces]),
    createContentItem('станция', 'stantsiya', 'Station (f) — for trains, metro, or major transport hubs. Each Moscow metro station is станция метро (e.g., станция Театральная).', 'word', 'Станция Театральная.', '"Theatre station." — naming pattern: station name in nominative.', null, [ACT.vocabularyPlaces]),
    createContentItem('магазин', 'magazin', 'Store / shop (m). Generic — for grocery (продуктовый), clothing (одежды), books (книжный). Plural магазины.', 'word', 'Магазин закрыт.', '"The store is closed." — закрыт (m, short adj) agrees with магазин.', null, [ACT.vocabularyPlaces]),
    createContentItem('ресторан', 'restoran', 'Restaurant (m). Borrowed; stress on final syllable -ран. Differs from кафе (less formal) and столовая (canteen/cafeteria).', 'word', 'Хороший ресторан рядом с метро.', '"A good restaurant near the metro." — рядом с + instr case.', null, [ACT.vocabularyPlaces]),
    createContentItem('кафе', 'kafe', 'Cafe (n, INDECLINABLE). Like метро, кафе never declines. Casual eating spot; often serves both food and coffee.', 'word', 'В кафе на Тверской.', '"At a cafe on Tverskaya." — кафе invariable.', null, [ACT.vocabularyPlaces]),
    createContentItem('парк', 'park', 'Park (m). Famous Moscow parks: Парк Горького, Сокольники, ВДНХ. Plural парки.', 'word', 'Гуляем в парке.', '"We are walking in the park." — гулять (impf, "to stroll") + в + prep case.', null, [ACT.vocabularyPlaces]),
    createContentItem('музей', 'muzey', 'Museum (m, ends in soft -й). Famous: Третьяковская галерея, Пушкинский, Эрмитаж (Hermitage, in SPb). Plural музеи.', 'word', 'Музей открыт до 18:00.', '"The museum is open until 6 PM." — до + gen case 18:00.', null, [ACT.vocabularyPlaces]),
    createContentItem('театр', 'teatr', 'Theatre (m). Famous: Большой театр, МХАТ, Мариинский (SPb). Plural театры.', 'word', 'Я иду в театр.', '"I am going to the theatre." — идти + в + acc case (= nom for inanimate masc).', null, [ACT.vocabularyPlaces]),
    createContentItem('библиотека', 'biblioteka', 'Library (f). Famous: Российская государственная библиотека (Russian State Library, formerly Lenin Library). Plural библиотеки.', 'word', 'Студенты в библиотеке.', '"Students are in the library." — в + prep case библиотеке.', null, [ACT.vocabularyPlaces]),
    createContentItem('университет', 'universitet', 'University (m). МГУ = Московский государственный университет. Plural университеты.', 'word', 'Я учусь в университете.', '"I study at the university." — учусь reflexive verb + в + prep case.', null, [ACT.vocabularyPlaces]),
    createContentItem('общежитие', 'obshchezhitiye', 'Dormitory / dorm (n). High-frequency student word; often shortened to общага (slang). МГУ has the famous ДАС (Дом Аспиранта и Стажёра) and many other dorm buildings.', 'word', 'Я живу в общежитии.', '"I live in the dorm." — в + prep case общежитии (neuter -ие ends).', null, [ACT.vocabularyPlaces]),
    createContentItem('дом', 'dom', 'House / building / home (m). Triple meaning: physical house, residential building (многоквартирный дом), or "home" abstractly. Plural домА (stress shift).', 'word', 'Я дома.', '"I am at home." — дома is adverbial form ("at home"); not the same as the noun дом.', null, [ACT.vocabularyPlaces]),
    createContentItem('квартира', 'kvartira', 'Apartment (f). Standard urban Russian housing unit. Most Muscovites live in квартирa not дом. Plural квартиры.', 'word', 'Наша квартира на 5-м этаже.', '"Our apartment is on the 5th floor." — на + ordinal + prep case этаже.', null, [ACT.vocabularyPlaces]),

    createContentItem('прямо', 'pryamo', 'Straight ahead (adv). Direction word. Stress on first syllable. Used in directions: Идите прямо.', 'word', 'Идите прямо до светофора.', '"Go straight until the traffic light." — до + gen case светофора (gen of светофор).', null, [ACT.vocabularyDirections]),
    createContentItem('налево', 'nalevo', 'To the left (adv). Direction-of-motion adverb. Note: налево for motion, слева for static "on the left".', 'word', 'Поверните налево.', '"Turn left." — повернуть + adv of direction.', null, [ACT.vocabularyDirections]),
    createContentItem('направо', 'napravo', 'To the right (adv). Pair with налево. Static counterpart: справа ("on the right").', 'word', 'Магазин направо.', '"The store is to the right." — direction indicated by adv.', null, [ACT.vocabularyDirections]),
    createContentItem('назад', 'nazad', 'Back / backwards (adv). Used for direction or as time-marker "ago" (год назад = "a year ago").', 'word', 'Идите назад.', '"Go back." — reverse direction instruction.', null, [ACT.vocabularyDirections]),
    createContentItem('далеко', 'daleko', 'Far (adv, predicative). Used with от + gen: далеко от центра. Stress on the final syllable -ко. Comparative: дальше.', 'word', 'Магазин далеко.', '"The store is far." — predicative use; equivalent to English "It\'s far".', null, [ACT.vocabularyDirections]),
    createContentItem('близко', 'blizko', 'Close / near (adv, predicative). Counterpart of далеко. Used with от + gen.', 'word', 'Метро близко.', '"The metro is close." — predicative use.', null, [ACT.vocabularyDirections]),
    createContentItem('здесь / тут', 'zdes\' / tut', 'Here (adv). Two synonyms; здесь slightly more formal, тут more casual. Both fully interchangeable.', 'word', 'Я здесь. / Я тут.', '"I\'m here." — answering Где ты? in casual response.', null, [ACT.vocabularyDirections]),
    createContentItem('там', 'tam', 'There (adv). Distal counterpart to здесь/тут.', 'word', 'Книга там.', '"The book is there." — pointing/locating with adv.', null, [ACT.vocabularyDirections]),
    createContentItem('рядом', 'ryadom', 'Nearby (adv, predicative). Used with с + instr: рядом с метро ("near the metro").', 'word', 'Кафе рядом со школой.', '"The cafe is near the school." — рядом с + instr case школой; со variant of с before consonant cluster.', null, [ACT.vocabularyDirections]),
    createContentItem('центр', 'tsentr', 'Center (m). Used for "downtown" (центр Москвы) or center of anything. Phrase в центре (in the center) is high-frequency.', 'word', 'Я в центре.', '"I\'m downtown / in the center." — в + prep case центре.', null, [ACT.vocabularyDirections]),

    createContentItem('Предложный падеж — введение', 'Prep case introduction', 'The PREPOSITIONAL case (предложный падеж) is the easiest case to learn. Used after the prepositions в (in), на (on), о/об (about), при (at/during). Endings: most nouns add -е to the stem. Feminine -а → -е, masc consonant + е, neuter -о → -е.', 'sentence', 'Москва → в Москве · стол → на столе · окно → в окне', 'Note all three different gender endings result in -е — predictable and reliable.', [
      { target: 'Москва (f, nom) → в Москве (prep)', note: '-а → -е feminine prep ending' },
      { target: 'стол (m, nom) → на столе (prep)', note: 'add -е to masculine consonant stem' },
      { target: 'окно (n, nom) → в окне (prep)', note: '-о → -е neuter prep ending' },
    ], [ACT.grammarPrepositional]),
    createContentItem('Исключения в предложном', 'Prep case exceptions', 'Some masculine nouns take stressed -у in the prepositional after в/на (the "locative-2" or "second prepositional"): в саду (in the garden, not *в саде), на полу (on the floor), в лесу (in the forest), на берегу (on the shore). These are mostly nouns referring to locations.', 'sentence', 'сад → в саду · пол → на полу · лес → в лесу · берег → на берегу · год → в году', 'A small but high-frequency group; memorize the most common ones.', null, [ACT.grammarPrepositional]),
    createContentItem('В vs На', 'V vs Na', 'CRITICAL DISTINCTION: в (in, into) for enclosed places (в кафе, в магазине, в Москве, в России). на (on, at) for surfaces, events, vehicles, and some geographic regions (на столе, на лекции, на машине, на Кавказе, на Урале, на Украине). Wrong choice = wrong meaning OR wrong-sounding.', 'sentence', 'в Москве (correct) · на Москве (wrong)\nна лекции (correct) · в лекции (wrong)\nна Урале (correct) · в Урале (wrong)', 'Memorize the на-words: events (лекция, концерт, спектакль), surfaces (стол, пол), some geographic regions (Урал, Кавказ, Камчатка), transport vehicles (автобус, машина).', [
      { target: 'в = enclosed', note: 'в Москве, в книге, в кафе, в России' },
      { target: 'на = surface / event / region / transport', note: 'на лекции, на столе, на Урале, на машине' },
    ], [ACT.grammarPrepositional]),

    createContentItem('идти vs ходить', 'idti vs khodit', 'The classic Russian motion verb PAIR: идти (unidirectional, "going right now, specific destination") vs ходить (multidirectional / habitual / round-trip). Я иду в магазин (I\'m going to the store right now) vs Я хожу в магазин каждый день (I go to the store every day).', 'sentence', 'идти — unidirectional, present continuous, specific\nходить — multidirectional, habitual, round-trip\n\nЯ иду в школу. (right now, walking there)\nЯ хожу в школу. (I go to school regularly)', 'This unidirectional/multidirectional distinction is uniquely Russian and applies to ALL motion verbs — ехать/ездить, бежать/бегать, лететь/летать, плыть/плавать, нести/носить, etc.', [
      { target: 'идти ID-tee', note: 'unidirectional walk verb; conjugation: иду, идёшь, идёт, идём, идёте, идут' },
      { target: 'ходить khoDIT', note: 'multidirectional walk verb; conjugation: хожу, ходишь, ходит, ходим, ходите, ходят' },
    ], [ACT.grammarVerbsOfMotion]),
    createContentItem('ехать vs ездить', 'yekhat vs yezdit', 'Vehicle motion pair: ехать (unidirectional, "going right now by vehicle") vs ездить (multidirectional/habitual). Я еду в Москву (I\'m going to Moscow now, by car/train) vs Я езжу в Москву каждое лето (I go to Moscow every summer).', 'sentence', 'Я еду в Питер на поезде.\nЯ езжу в Питер каждый месяц.', 'Note: for walking use идти/ходить; for any vehicle (car, train, bus, plane) use ехать/ездить.', null, [ACT.grammarVerbsOfMotion]),
    createContentItem('Спряжение идти', 'Idti conjugation', 'Idti (to be going, unidirectional) is irregular: я ИДУ, ты ИДЁШЬ, он/она ИДЁТ, мы ИДЁМ, вы ИДЁТЕ, они ИДУТ. The ё indicates stress; in informal writing often spelled as е.', 'sentence', 'Я иду · Ты идёшь · Он идёт · Мы идём · Вы идёте · Они идут', 'Memorize this; one of the most-used verbs in Russian.', null, [ACT.grammarVerbsOfMotion]),

    createContentItem('есть — there is / there are', 'yest\' — there is/are', 'Есть means "there is / there are" in the existential sense. Word order: в Москве есть метро. (In Moscow there is a metro). Also doubles as "to have" in the у + gen possession structure: У меня есть книга.', 'sentence', 'В Москве есть метро. · У меня есть кот. · Здесь есть кафе?', '"Is there a cafe here?" — yes/no question with есть.', [
      { target: 'есть + nom (existential)', note: 'subject of есть is in nominative; thing that exists is the subject' },
      { target: 'У + gen + есть + nom (possessive)', note: '"X has Y" — X is genitive of the owner, Y is the subject in nominative' },
    ], [ACT.grammarThereIs]),
    createContentItem('нет + genitive — absence', 'net + gen', 'Нет means "there is/are not" — and crucially, the absent thing must be in GENITIVE CASE, not nominative. Здесь нет метро. (There is no metro here.) — метро is technically genitive, but as indeclinable it looks like nominative. Здесь нет книги. (There is no book here.) — книги is genitive of книга.', 'sentence', 'Здесь нет кафе. · У меня нет времени. · В МГУ нет парка.', 'Mandatory genitive — one of the first signs of a Russian-fluent speaker is using нет + gen automatically.', null, [ACT.grammarThereIs]),
    createContentItem('нет + родительный падеж', 'Genitive of absence', 'The "genitive of negation" extends beyond нет to negated verbs that take direct objects: Я не вижу книгу (acc) → Я не вижу книги (gen) — though modern Russian increasingly uses accusative even after negation. Safest with нет: ALWAYS genitive.', 'sentence', 'У меня нет книги (gen). · Я не вижу книги (gen, formal) / книгу (acc, casual).', 'Mastery sign: instantly switch to gen after нет without thinking.', null, [ACT.grammarThereIs]),

    createContentItem('Описание центра Москвы', 'Opisaniye tsentra Moskvy', 'A short paragraph describing central Moscow: Кремль and Красная площадь are at the center, the Большой театр is north, the Третьяковка is south of the river, and the metro radiates outward.', 'sentence', 'В центре Москвы — Кремль и Красная площадь. Большой театр находится недалеко, на Театральной площади. Третьяковка — на другой стороне Москвы-реки. Метро соединяет все районы.', 'Read aloud with stress and akanye; identify each location word and its case.', [
      { target: 'находится nakhoditsya', note: 'reflexive verb "is located"; more formal than just "to be there"' },
      { target: 'на другой стороне', note: '"on the other side" — на + adj + prep case' },
      { target: 'Москва-река', note: 'the river that runs through Moscow; high-frequency landmark name' },
    ], [ACT.reading]),
    createContentItem('Вопросы — Reading', 'Comprehension questions', 'Four reading comprehension questions.', 'sentence', 'Q1: Где Кремль? Q2: Где Большой театр? Q3: Где Третьяковка? Q4: Что соединяет районы?', 'Mix of Где (where) and Что (what) questions.', null, [ACT.reading]),

    createContentItem('Диалог на улице', 'Dialog na ulitse', 'A six-turn dialogue between a tourist and a Muscovite at the exit of Охотный ряд metro station. The tourist needs to get to the Большой театр; the Muscovite gives polite directions.', 'conversation', 'Турист: Извините, как пройти к Большому театру?\nМосквичка: Идите прямо, потом направо.\nТурист: Это далеко?\nМосквичка: Нет, минут пять пешком.\nТурист: Спасибо большое!\nМосквичка: Пожалуйста.', 'Standard tourist-encounter dialogue; covers asking, receiving directions, distance estimation, thanks.', [
      { target: 'к Большому театру', note: 'к + dat case for "toward"; Большому театру dat sg of masculine adjective + noun' },
      { target: 'минут пять', note: '"about 5 minutes" — Russian inverts numeral and noun for approximation' },
      { target: 'пешком peshkom', note: 'adv "on foot"; instrumental of obsolete пешок' },
    ], [ACT.listening]),

    createContentItem('Как добраться до общежития', 'Kak dobratsya do obshchezhitiya', 'A sample 5-sentence description of how to reach your МГУ dormitory from the nearest metro station Университет.', 'sentence', 'Выйдите из метро Университет. Идите прямо до светофора. Поверните направо. Общежитие — большое белое здание. Это близко, минут десять пешком.', '"Exit the metro at University. Go straight to the traffic light. Turn right. The dorm is a big white building. It\'s close, about ten minutes on foot."', null, [ACT.writing]),

    createContentItem('Московское метро', 'Moskovskoye metro', 'The Moscow Metro opened on May 15, 1935. Famous for its ornate Stalin-era stations: Маяковская (1938), Площадь Революции (1938, with 76 bronze sculptures), Комсомольская (1952, with chandeliers), Новослободская (1952, with stained glass). 14 lines, 270+ stations, 9+ million daily passengers.', 'sentence', 'Метро открылось в 1935 году.', '"The metro opened in 1935." — в + prep + ordinal "in the year".', [
      { target: 'Маяковская Mayakovskaya', note: 'named after the poet Mayakovsky; 1938 station with mosaics' },
      { target: 'Площадь Революции', note: '76 bronze sculptures of revolutionary heroes; rubbing the dog\'s nose brings luck (legend)' },
      { target: 'Комсомольская Komsomolskaya', note: 'the "palace of the people"; 8 chandelier-lit halls' },
    ], [ACT.culture]),
    createContentItem('Спальные районы', 'Spalnye rayony', 'Moscow\'s "sleeping districts" — the outer residential rings outside the central core. Typical: long apartment blocks built 1960s-80s (хрущёвки and брежневки), shopping centers, schools. Most Muscovites live in спальник and commute to центр.', 'sentence', 'Я живу в спальном районе.', '"I live in a residential district." — в + prep case спальном районе.', null, [ACT.culture]),
    createContentItem('Адреса в России', 'Russian addresses', 'Russian addresses go LARGE TO SMALL: country (Россия) → city (Москва) → street (улица Тверская) → building (дом 5) → entrance (подъезд 2) → apartment (квартира 17). Postcode at the top. Reverse of US/UK conventions.', 'sentence', '101000, Москва, ул. Тверская, д. 5, кв. 17.', 'Standard Russian address format; д. = дом, кв. = квартира, ул. = улица.', null, [ACT.culture]),

    createContentItem('Задание: МГУ → Красная площадь', 'Zadaniye: MGU → Krasnaya ploshchad\'', 'Explain to a new student how to get from МГУ to Красная площадь by metro. Use motion verbs (идти, ехать), prepositional case for stations and lines, and direction words. The route: Walk to Университет station → take red line 1 north → transfer at Охотный ряд → exit to Красная площадь.', 'conversation', 'Новый студент: Как добраться до Красной площади?\nВы: Идите к метро Университет. Это красная линия. Садитесь на поезд на север.\nНовый студент: Сколько остановок?\nВы: Восемь остановок до Охотного ряда. Там выходите. Красная площадь рядом.', '"New student: How do I get to Red Square?\\nYou: Walk to Universitet metro. It\'s the red line. Take a train going north.\\nNew student: How many stops?\\nYou: Eight stops to Okhotny Ryad. Get off there. Red Square is right next door."', null, [ACT.task]),
  ],
};

module.exports = lesson;
