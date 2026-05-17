// Level 1 Unit 5 — Life in Russia (Russian)
// Functions: Russian holidays, food, weather, housing, transportation, daily-life
// adjustment, culture-shock topics, conversations about adapting to life in Russia.

const createContentItem = (target, translit, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization: translit, nativeText: note, pronunciation: translit,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ru-l1u5-orientation', pronunciation: 'ru-l1u5-pronunciation',
  vocabularyFood: 'ru-l1u5-vocab-food', vocabularyWeather: 'ru-l1u5-vocab-weather', vocabularyHousing: 'ru-l1u5-vocab-housing',
  grammarLike: 'ru-l1u5-grammar-like', grammarNeed: 'ru-l1u5-grammar-need', grammarComparing: 'ru-l1u5-grammar-comparing',
  reading: 'ru-l1u5-reading', listening: 'ru-l1u5-listening', writing: 'ru-l1u5-writing',
  culture: 'ru-l1u5-culture', task: 'ru-l1u5-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: [
    'Describe key features of Russian daily life — food (пельмени, борщ, чёрный хлеб), weather (холодно, снег, лёд), housing (квартира, дача, общежитие).',
    'Express opinions about Russian life using нравиться + dative ("мне нравится Москва") and сравнивать ("в России холоднее, чем в США").',
    'Talk about cultural surprise and adjustment using everyday vocabulary, with the right tone for casual conversation with Russian peers.',
  ], task: 'Imagine your first month at МГУ — your roommate asks how you\'re adjusting to Russian life. By the end of this lesson, you should answer that conversation confidently in 6+ turns.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in life-in-Russia vocabulary', goals: [
    'Apply akanye in пельмени /pʲɪlʲˈmʲenʲɪ/ — only the second syllable stressed.',
    'Pronounce щи /ʂʂi/ — the long soft "shsh" + и (which is realized as ы after щ — but щ is the always-soft exception).',
    'Apply final devoicing in снег /sʲnʲek/ ("snek"), пирог /pʲɪˈrok/ ("pirok"), and friend\'s name in genitive: Ивана.',
  ], task: 'Read 12 life-in-Russia words aloud, applying akanye and devoicing.' },
  { id: ACT.vocabularyFood, section: 'Vocabulary I', title: 'Russian food', goals: [
    'Memorize 12 iconic Russian dishes (борщ, щи, пельмени, вареники, блины, каша, оливье, селёдка под шубой) with gender and context.',
    'Distinguish пельмени vs вареники — pelmeni are meat dumplings, vareniki are sweet/cheese dumplings.',
  ], task: 'List 5 dishes you have tried and 5 you haven\'t.' },
  { id: ACT.vocabularyWeather, section: 'Vocabulary II', title: 'Russian weather', goals: [
    'Memorize 10 weather words (мороз, снег, лёд, солнце, дождь, тепло, холодно, жарко, ветер, тучи).',
    'Use the impersonal subject-less weather expressions: Холодно. Снежно. Сегодня минус двадцать.',
  ], task: 'Describe the weather in three cities — Moscow in January, Sochi in July, Novosibirsk in February.' },
  { id: ACT.vocabularyHousing, section: 'Vocabulary III', title: 'Russian housing', goals: [
    'Distinguish квартира (apartment), дом (house), дача (country cottage), общежитие (dorm).',
    'Recognize that most Muscovites live in квартиры in many-storey panel buildings (панельный дом), with дача as a weekend escape.',
  ], task: 'Describe where you live and where your imaginary Russian friends live.' },
  { id: ACT.grammarLike, section: 'Grammar I', title: 'нравиться — "I like it" (dative experiencer)', goals: [
    'Use the dative-experiencer pattern: Мне нравится Москва. (Lit. "To me [it] is pleasing: Moscow"). The thing liked is the subject (nominative), the liker is dative.',
    'For plural things liked, the verb takes plural: Мне нравятся пельмени.',
    'Past tense agrees with the thing liked: Мне нравился фильм. (m) / нравилась песня. (f) / нравились пельмени. (pl)',
  ], task: 'Build 6 нравиться sentences using different subjects (singular m/f/n and plural).' },
  { id: ACT.grammarNeed, section: 'Grammar II', title: 'нужно / надо + infinitive — "I need to"', goals: [
    'Use the impersonal нужно or надо (interchangeable) + infinitive: Мне нужно купить хлеб. (I need to buy bread.) — dative experiencer + impersonal predicate + infinitive.',
    'For objects needed (not actions), use нужен / нужна / нужно / нужны agreeing with the needed thing: Мне нужен зонт. (I need an umbrella, m.) / Мне нужна книга. (f.) / Мне нужны деньги. (pl.)',
  ], task: 'Build 4 sentences with нужно + infinitive (actions) and 4 with нужен/нужна/etc + noun (objects).' },
  { id: ACT.grammarComparing, section: 'Grammar III', title: 'Comparatives — холоднее / больше / лучше', goals: [
    'Form simple comparatives by adding -ее to the adverb/short adjective: холодно → холоднее ("colder"), быстро → быстрее ("faster"), интересно → интереснее.',
    'Memorize irregular comparatives: хорошо → лучше (better), плохо → хуже (worse), много → больше (more), мало → меньше (less).',
    'Use чем for the second member of comparison: В России холоднее, чем в США. Or use the genitive: В России холоднее США.',
  ], task: 'Compare 6 pairs of cities/countries on weather and size.' },
  { id: ACT.reading, section: 'Reading', title: 'A foreign student\'s blog post', goals: ['Read a 7-sentence blog excerpt', 'Identify cultural observations'], task: 'Read aloud and discuss 4 points.' },
  { id: ACT.listening, section: 'Listening', title: 'Comparing Russia to home', goals: ['Follow a 6-turn dialogue', 'Note frequency markers'], task: 'Summarize each side\'s view.' },
  { id: ACT.writing, section: 'Writing', title: 'My first month in Russia', goals: ['Write 6-8 sentences', 'Use нравиться, нужно, and a comparative each'], task: 'Draft your impressions.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Russian winter, dacha culture, and Soviet legacy', goals: [
    'Understand Russian winter (русская зима) as a defining cultural element — from October snow to April thaws.',
    'Know what a дача is — a small country house used as weekend retreat; many Russians inherited their dachas from the Soviet era when they were distributed by workplaces.',
    'Recognize Soviet-era idioms still in everyday use: "Доверяй, но проверяй" (trust but verify), "Не лезь в чужой огород" (don\'t butt into others\' business).',
  ], task: 'Describe what would surprise a Russian visiting your country.' },
  { id: ACT.task, section: 'Task', title: 'Discuss life in Russia with your dorm-mate', goals: ['Combine all skills in a 6-turn dialogue', 'Use нравиться, нужно, and comparatives'], task: 'Roleplay a casual evening conversation.' },
];

const lesson = {
  title: 'Level 1 · Unit 5: Жизнь в России — Life in Russia',
  category: 'culture', difficulty: 'beginner', targetLang: 'ru', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic', activities,
  expressionPractice: [
    { id: 'expressing-likes', label: 'Expressing likes', goal: 'Use мне нравится / мне нравятся to talk about food, places, activities.' },
    { id: 'expressing-needs', label: 'Expressing needs', goal: 'Use мне нужно + inf or мне нужен/нужна/нужно/нужны + noun.' },
    { id: 'comparing-places', label: 'Comparing places', goal: 'Use the -ee comparative with чем to compare two places or experiences.' },
    { id: 'cultural-talk', label: 'Cultural conversation', goal: 'Discuss Russian food, weather, housing, and customs in casual peer-to-peer Russian.' },
  ],
  relatedPools: ['topic-culture', 'topic-life'],
  content: [
    createContentItem('Цели урока', 'Tseli uroka', 'By the end of this lesson, you can discuss daily life in Russia — food, weather, housing, customs — and compare it with your home country using everyday vocabulary and three core grammar patterns: нравиться, нужно, and comparatives.', 'word', 'Россия — холодная страна с тёплыми людьми.', '"Russia is a cold country with warm people." — Russian self-image cliché.', null, [ACT.orientation]),
    createContentItem('Реальный сценарий', 'Realnyy stsenariy', 'It\'s your first month at МГУ dorm ДАС. Your roommate Маша from Казань cooks you пельмени and asks "Ну, как тебе Россия?" (So how do you like Russia?). You need to share genuine impressions in casual Russian.', 'word', 'Ну, как тебе Россия?', '"So how do you like Russia?" — informal casual question; тебе is dative of ты for the нравиться-style construction.', null, [ACT.orientation]),

    createContentItem('борщ', 'borshch', 'Borscht (m) — the iconic beet soup of Russia/Ukraine. Usually red (with beets) but green borscht (зелёный борщ) exists with sorrel. Served with сметана (sour cream). Final щ is always soft and long.', 'word', 'Борщ — национальное блюдо.', '"Borscht is a national dish." — borscht is contested between Russia and Ukraine; UNESCO recognized Ukrainian borscht in 2022.', null, [ACT.vocabularyFood]),
    createContentItem('щи', 'shchi', 'Shchi (pl tantum) — cabbage soup, the original Russian soup before borscht arrived. "Щи да каша — пища наша" ("Shchi and kasha — that\'s our food") — a 19th-century saying. Always plural.', 'word', 'Бабушка варит щи.', '"Grandma is cooking shchi." — варить ("to boil") is the standard verb for soups.', null, [ACT.vocabularyFood]),
    createContentItem('пельмени', 'pelmeni', 'Pelmeni (pl tantum) — small dumplings filled with meat (usually beef/pork mix). Frozen pelmeni are a Russian household staple — fast, comforting, ubiquitous. Always plural; sg пельмень exists but unused.', 'word', 'Мы едим пельмени со сметаной.', '"We eat pelmeni with sour cream." — со variant of с before consonant cluster.', null, [ACT.vocabularyFood]),
    createContentItem('вареники', 'vareniki', 'Vareniki (pl tantum) — larger dumplings filled with sweet or savory fillings (cheese, potatoes, cherries, mushrooms). Ukrainian-origin but popular in Russia too. Distinguished from пельмени (meat-only, smaller).', 'word', 'Вареники с вишней.', '"Vareniki with cherries." — с + instr case вишней.', null, [ACT.vocabularyFood]),
    createContentItem('блины', 'bliny', 'Blini / Russian pancakes (pl tantum). Thin crepe-like pancakes; main course during Масленица (Maslenitsa, butter-week before Lent). Served with caviar, sour cream, jam, or meat fillings.', 'word', 'Блины со сметаной и икрой.', '"Blini with sour cream and caviar." — со variant before consonant cluster.', null, [ACT.vocabularyFood]),
    createContentItem('каша', 'kasha', 'Kasha (f) — porridge from various grains (oats, buckwheat, semolina). Standard breakfast across Russia. "Каша — мать наша" ("Kasha is our mother") — proverb. Plural каши.', 'word', 'Я ем кашу на завтрак.', '"I eat kasha for breakfast." — на + acc.', null, [ACT.vocabularyFood]),
    createContentItem('чёрный хлеб', 'chyornyy khleb', 'Black bread / rye bread (m). The standard Russian bread, denser and darker than Western wheat bread. White bread (белый хлеб) is also eaten but rye is more cultural.', 'word', 'Чёрный хлеб со сметаной и солью.', '"Black bread with sour cream and salt." — classic peasant snack.', null, [ACT.vocabularyFood]),
    createContentItem('оливье', 'olivye', 'Olivier salad (n, indeclinable) — the iconic Russian potato salad with peas, carrots, pickles, eggs, ham/chicken, and mayonnaise. The MUST dish on Новый год table. Borrowed from French chef Olivier in 19th-century Moscow.', 'word', 'Без оливье нет Нового года.', '"Without Olivier there is no New Year." — common saying.', null, [ACT.vocabularyFood]),
    createContentItem('селёдка под шубой', 'selyodka pod shuboy', 'Herring under a fur coat (literally) — beet salad layered with herring, potatoes, eggs, carrots, mayonnaise. The other essential Новый год dish.', 'word', 'Селёдка под шубой — классика.', '"Herring under a fur coat — a classic." — dash for emphasis.', null, [ACT.vocabularyFood]),
    createContentItem('пирожки', 'pirozhki', 'Small filled pies (pl tantum, sg пирожок). Common street food and homemade snack. Fillings: meat, potatoes, cabbage, jam, apple. Always plural in normal usage.', 'word', 'Бабушка печёт пирожки.', '"Grandma is baking pirozhki." — печь ("to bake") is irregular.', null, [ACT.vocabularyFood]),
    createContentItem('чай с лимоном', 'chay s limonom', 'Tea with lemon (m). Tea drinking is central to Russian culture; samovar tea with lemon, sugar, jam. Coffee (кофе) is increasingly popular but tea remains dominant.', 'word', 'Хотите чай с лимоном?', '"Would you like tea with lemon?" — standard polite offer.', null, [ACT.vocabularyFood]),
    createContentItem('самовар', 'samovar', 'Samovar (m) — traditional Russian metal urn for boiling water for tea. Symbolic of Russian tea culture; still used at formal occasions and in countryside dachas.', 'word', 'Самовар на столе.', '"The samovar is on the table." — classic dacha scene.', null, [ACT.vocabularyFood]),

    createContentItem('зима', 'zima', 'Winter (f). The defining Russian season — long (October to April in most of the country), cold, snowy. Mobile stress: зимА (nom sg) → зИмы (gen sg, nom pl).', 'word', 'Зима — самое долгое время года.', '"Winter is the longest time of year." — самое superlative neuter.', null, [ACT.vocabularyWeather]),
    createContentItem('снег', 'sneg', 'Snow (m). Final г devoices to /k/ — spoken "snek". Plural снегА (stress shift), used in literary expression "снега Сибири" (the snows of Siberia).', 'word', 'Идёт снег.', '"It is snowing." — literally "the snow is going"; idiomatic weather expression.', null, [ACT.vocabularyWeather]),
    createContentItem('мороз', 'moroz', 'Frost / hard freeze (m). Different from холод (general cold) — мороз is specifically below-zero. "Мороз и солнце — день чудесный" (Pushkin) — famous opening line of "Winter Morning" poem.', 'word', 'Сегодня сильный мороз.', '"Today is a hard frost." — сильный (strong) is the standard modifier.', null, [ACT.vocabularyWeather]),
    createContentItem('лёд', 'lyod', 'Ice (n). Stressed ё. Final д devoices to /t/: spoken "lyot". Genitive льда (stress shifts onto ending).', 'word', 'Осторожно, лёд!', '"Careful, ice!" — common winter warning.', null, [ACT.vocabularyWeather]),
    createContentItem('тепло', 'teplo', 'Warm / warmth (adv & n). As predicative: Сегодня тепло. ("It is warm today."). As noun: тепло (warmth).', 'word', 'Сегодня тепло, плюс десять.', '"Today is warm, plus ten." — Russian uses celsius and plus/minus notation.', null, [ACT.vocabularyWeather]),
    createContentItem('холодно', 'kholodno', 'Cold (adv, predicative). Sentence: Мне холодно. (I am cold — dative experiencer + impersonal predicate).', 'word', 'Мне холодно.', '"I am cold." — dative subject + impersonal predicate; this is the standard Russian way to say "I am cold".', null, [ACT.vocabularyWeather]),
    createContentItem('жарко', 'zharko', 'Hot (adv, predicative). Used in summer or when overheated. Russian summer in some regions reaches +35°C.', 'word', 'Летом в Сочи жарко.', '"In summer, it\'s hot in Sochi." — Сочи is the southern Russian resort city.', null, [ACT.vocabularyWeather]),
    createContentItem('дождь', 'dozhd\'', 'Rain (m, ends in soft -ждь cluster). Variable pronunciation; many speakers say /doʂʂʲ/ (rare double consonant) or /doʐdʲ/. Plural дожди.', 'word', 'Идёт дождь.', '"It is raining." — same "the rain is going" pattern as снег.', null, [ACT.vocabularyWeather]),
    createContentItem('солнце', 'solntse', 'Sun (n). The л is SILENT — pronounced "sontse". Diminutive: солнышко (warm, affectionate).', 'word', 'Солнце светит.', '"The sun is shining." — high-frequency weather expression.', null, [ACT.vocabularyWeather]),
    createContentItem('ветер', 'veter', 'Wind (m). Plural ветры. Fleeting vowel: ветер → ветра in declension (loses the е).', 'word', 'Сильный ветер.', '"Strong wind." — сильный (m) agreeing with ветер.', null, [ACT.vocabularyWeather]),

    createContentItem('квартира', 'kvartira', 'Apartment (f). Standard Russian urban housing unit. Apartments are numbered (квартира 17), often in panel buildings (panel construction), with typical sizes from однушка (1-room) to трёшка (3-room).', 'word', 'У нас двухкомнатная квартира.', '"We have a two-room apartment." — двух-комнат-ная: "two-room" compound adjective.', null, [ACT.vocabularyHousing]),
    createContentItem('дом', 'dom', 'House / building (m). In urban context = building (многоквартирный дом = "multi-apartment building"). In rural = standalone house. Plural дома (stress shift).', 'word', 'Я живу в этом доме.', '"I live in this building." — этом m prep case.', null, [ACT.vocabularyHousing]),
    createContentItem('дача', 'dacha', 'Dacha / country cottage (f). Small countryside house used as a weekend retreat. Soviet-era institution — millions of Russians inherited dachas from workplace distributions. Where Russians grow vegetables (огород) and escape city heat.', 'word', 'Мы едем на дачу.', '"We are going to the dacha." — на дачу (motion); на даче (location).', null, [ACT.vocabularyHousing]),
    createContentItem('общежитие', 'obshchezhitiye', 'Dormitory (n). High-frequency student word. ДАС at МГУ is the most famous. Casual abbreviation: общага (slang, slightly negative connotation).', 'word', 'В нашем общежитии шумно.', '"It\'s noisy in our dorm." — шумно is predicative adv "noisy".', null, [ACT.vocabularyHousing]),
    createContentItem('подъезд', 'podyezd', 'Building entrance / stairwell (m). Specifically, each section of a large panel building has its own подъезд with a coded entry door. Address-wise, "квартира 17, подъезд 2".', 'word', 'Я в третьем подъезде.', '"I\'m in the third entrance." — m prep case подъезде.', null, [ACT.vocabularyHousing]),
    createContentItem('этаж', 'etazh', 'Floor / storey (m). Stress on final syllable. Plural этажи.', 'word', 'Мы на пятом этаже.', '"We are on the 5th floor." — на + ordinal + prep case этаже.', null, [ACT.vocabularyHousing]),
    createContentItem('лифт', 'lift', 'Elevator (m). Borrowed; pronounced as spelled. Casual usage with "ride to the X floor": Лифт на десятый этаж.', 'word', 'Лифт не работает.', '"The elevator is not working." — typical announcement.', null, [ACT.vocabularyHousing]),
    createContentItem('кухня', 'kukhnya', 'Kitchen (f). The center of Russian apartment social life — guests are entertained in кухня more than living room (гостиная). Soviet small kitchens have created "кухонные разговоры" (kitchen talks) cultural tradition.', 'word', 'Поговорим на кухне.', '"Let\'s talk in the kitchen." — invitation to private chat.', null, [ACT.vocabularyHousing]),

    createContentItem('нравиться + dat', 'Nravit\'sya + dat — to be pleasing to', 'Russian "to like" works opposite to English: the THING liked is the subject (nominative), and the LIKER is in the DATIVE case. Literally "X is pleasing to me". Мне нравится Москва. Verb agrees with the thing liked, NOT with the liker.', 'sentence', 'Мне нравится Москва. (sg, f noun → sg verb)\nМне нравятся пельмени. (pl noun → pl verb)\nИвану нравится футбол. (Иван in dative)', 'Master this construction — it appears in every Russian conversation about preferences.', [
      { target: 'Мне нравится X (sg)', note: 'verb agrees with X; X is subject in nom; мне is dative of я' },
      { target: 'Мне нравятся X (pl)', note: 'plural verb form for plural subject' },
      { target: 'Past tense agreement', note: 'нравился (m), нравилась (f), нравилось (n), нравились (pl) — agrees with the thing' },
    ], [ACT.grammarLike]),
    createContentItem('любить + acc', 'Lyubit\' + acc — "to love"', 'Любить is the regular transitive "to love/to like a lot" — takes accusative object, agrees with subject (nominative liker). Я люблю Москву. — different structure from нравиться. Любить is stronger than нравиться.', 'sentence', 'Я люблю Москву. (acc f) · Я люблю пельмени. (acc same as nom for inanim pl)', 'Stronger emotional verb than нравиться; for food and places, both work.', null, [ACT.grammarLike]),
    createContentItem('Past tense нравиться', 'Past tense nravitsya', 'In the past tense, the verb agrees with the thing liked (the subject in nominative): Мне нравился фильм (m). / Мне нравилась песня (f). / Мне нравились пельмени (pl). Liker dative does NOT control agreement.', 'sentence', 'Мне нравился этот фильм. · Маше нравилась музыка. · Нам нравились прогулки.', 'Three different agreements based on the thing liked\'s gender/number.', null, [ACT.grammarLike]),

    createContentItem('нужно / надо + inf', 'Nuzhno / nado + inf', 'Impersonal "need to / must" + infinitive. Мне нужно купить хлеб. = "I need to buy bread." Both нужно and надо are interchangeable in modern Russian; нужно slightly more formal, надо slightly more casual.', 'sentence', 'Мне нужно идти. · Тебе надо позвонить маме.', 'Two interchangeable expressions; mix freely.', [
      { target: 'нужно nuzhno', note: 'slightly more formal; impersonal predicate' },
      { target: 'надо nado', note: 'slightly more casual; same meaning' },
      { target: '+ infinitive', note: 'always followed by infinitive of the needed action' },
    ], [ACT.grammarNeed]),
    createContentItem('нужен / нужна / нужно / нужны', 'Nuzhen/nuzhna/nuzhno/nuzhny + nom', 'When you NEED a THING (not an action), use the agreeing form нужен (m) / нужна (f) / нужно (n) / нужны (pl) + the thing in NOMINATIVE. Literally "[the thing] is needed to me".', 'sentence', 'Мне нужен зонт. (m thing) · Мне нужна книга. (f thing) · Мне нужно молоко. (n thing) · Мне нужны деньги. (pl thing)', 'Note: the verb-like adjective agrees with the THING, not the experiencer.', [
      { target: 'нужен (m sg)', note: 'matches masculine singular noun: зонт, телефон, ключ' },
      { target: 'нужна (f sg)', note: 'matches feminine singular: книга, ручка, помощь' },
      { target: 'нужно (n sg)', note: 'matches neuter singular: молоко, время, окно' },
      { target: 'нужны (pl)', note: 'matches plural any gender: деньги, друзья, очки' },
    ], [ACT.grammarNeed]),

    createContentItem('Сравнительная степень', 'Sravnitelnaya stepen — comparatives', 'Form the comparative by replacing the adverb/adjective ending with -ее (or -ей as variant): холодно → холоднее, быстро → быстрее, интересно → интереснее.', 'sentence', 'холодно → холоднее (colder)\nтепло → теплее (warmer)\nбыстро → быстрее (faster)\nинтересно → интереснее (more interesting)', 'Standard productive comparative; works for most adjectives/adverbs.', null, [ACT.grammarComparing]),
    createContentItem('Иррегулярные сравнительные', 'Irregular comparatives', 'A handful of high-frequency adjectives have IRREGULAR comparatives: хорошо → лучше (better), плохо → хуже (worse), много → больше (more), мало → меньше (less), далеко → дальше (farther), близко → ближе (closer), старый → старше (older), молодой → моложе/младше (younger).', 'sentence', 'хорошо → лучше · плохо → хуже · много → больше · мало → меньше', 'These eight must be memorized; appear in every comparative sentence.', null, [ACT.grammarComparing]),
    createContentItem('чем + nom OR genitive', 'chem + nom or genitive', 'For "than X", two equivalent constructions: (1) чем + nominative (more spoken): Россия больше, чем США. (2) just genitive of the compared item: Россия больше США. — same meaning, slightly more compact and formal.', 'sentence', 'Москва холоднее, чем Лондон. (с чем)\nМосква холоднее Лондона. (genitive)', 'Both grammatical; чем-construction is more common in spoken Russian.', null, [ACT.grammarComparing]),

    createContentItem('Блог иностранного студента', 'Foreign student blog', 'A short blog excerpt by a non-Russian student at МГУ comparing life in Russia with home.', 'sentence', 'Я в Москве уже месяц. Здесь холоднее, чем дома, и снег идёт уже в октябре. Мне очень нравятся пельмени и борщ — это вкуснее, чем я думал. В общежитии шумно, но друзей много. Русские люди серьёзные, но добрые. Мне нужно больше учить русский язык.', 'Read aloud and identify each grammar pattern: нравиться, нужно, comparatives.', [
      { target: 'нравятся пельмени', note: 'plural subject → plural verb form' },
      { target: 'вкуснее, чем я думал', note: 'comparative + чем + clause' },
      { target: 'нужно больше учить', note: 'нужно + comparative больше + infinitive' },
    ], [ACT.reading]),

    createContentItem('Сравнение стран', 'Country comparison', 'Two roommates compare Russia with their home countries.', 'conversation', 'Маша: Тебе нравится Москва?\nСара: Очень! Здесь интереснее, чем в Бостоне.\nМаша: А еда? Тебе нравятся наши блюда?\nСара: Пельмени — да, но я редко ем щи.\nМаша: Зимой здесь холодно.\nСара: Да, мне нужна тёплая куртка.', 'Standard cultural conversation; covers нравиться, comparatives, нужна + agreement.', null, [ACT.listening]),

    createContentItem('Мой первый месяц', 'Moy pervyy mesyats', 'A sample 7-sentence reflection on the first month at МГУ.', 'sentence', 'Я живу в Москве уже месяц. Город очень большой, больше, чем мой родной город. Мне нравится метро — это удобно. Мне нужно учить больше русских слов. Зима скоро, и мне нужна тёплая одежда. Еда вкусная, особенно пельмени. Я скучаю по дому, но мне здесь нравится.', '"My first month" theme; uses нравиться (3 times), нужно/нужна (2 times), comparative больше (once).', null, [ACT.writing]),

    createContentItem('Русская зима', 'Russkaya zima', 'Russian winter (русская зима) is a cultural defining force: November-March temperatures regularly hit -20°C in Moscow, -40°C in Siberia. Influences everything from architecture (центральное отопление "central heating" runs nonstop October-April) to wardrobe (шуба "fur coat", шапка-ушанка "earflap hat", валенки "felt boots"). Famous saying: "Зима, крестьянин торжествуя…" (Pushkin).', 'sentence', 'Русская зима — это испытание.', '"Russian winter is a test." — испытание ("trial/test/ordeal") captures the cultural framing.', null, [ACT.culture]),
    createContentItem('Дача', 'Dacha', 'Дача — small countryside house, often a 30-100 km drive from Moscow. Soviet legacy: workplaces distributed dacha plots in 1950s-60s to ease food shortages. Today still ~70% of Russians have access to one. Functions: weekend escape, summer-long retreat for children with бабушка, vegetable garden (огород) for cucumbers/tomatoes/potatoes.', 'sentence', 'Летом мы живём на даче.', '"In summer we live at the dacha." — на + prep case даче.', null, [ACT.culture]),
    createContentItem('Советские пословицы', 'Sovetskiye poslovitsy', 'Soviet-era idioms still in everyday Russian: "Доверяй, но проверяй" (trust but verify — Reagan quoted Russian original); "Не лезь в чужой огород" (don\'t butt into others\' garden, i.e., business); "Поспешишь — людей насмешишь" (hurry and you make people laugh, i.e., haste makes waste); "В тесноте, да не в обиде" (cramped but not offended — typical Russian small-apartment hospitality).', 'sentence', 'Доверяй, но проверяй.', '"Trust but verify." — Russian original, famously quoted by Reagan in 1987.', null, [ACT.culture]),
    createContentItem('Праздники', 'Prazdniki — holidays', 'Major Russian holidays: Новый год (Jan 1, BIGGEST holiday, bigger than Christmas), Рождество (Jan 7, Orthodox Christmas), Старый Новый год (Jan 14, Old Calendar New Year), 23 февраля (Defender of the Fatherland Day), 8 марта (International Women\'s Day), Масленица (Maslenitsa, butter week before Lent), Пасха (Easter), 9 мая (Victory Day), День России (June 12).', 'sentence', 'Новый год — главный праздник в России.', '"New Year is the main holiday in Russia." — bigger than Christmas, with the family gathering, oливье, шампанское, and President\'s speech at midnight.', null, [ACT.culture]),

    createContentItem('Задание: разговор о жизни', 'Zadaniye: razgovor o zhizni', 'Roleplay a casual evening kitchen conversation with your Russian roommate about adjusting to life in Russia. Use нравиться, нужно, and at least one comparative.', 'conversation', 'Маша: Ну, как тебе наша жизнь?\nВы: [впечатления с нравиться]\nМаша: А что трудно?\nВы: [нужно + comparative]\nМаша: А наша еда?\nВы: [оценка еды с нравиться]\nМаша: Ладно, в следующий раз приготовлю борщ.', 'Standard cultural-adaptation conversation; six turns covering all three grammar patterns.', null, [ACT.task]),
  ],
};

module.exports = lesson;
