// Level 1 Unit 4 — Daily Routines (Russian)

const createContentItem = (target, translit, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization: translit, nativeText: note, pronunciation: translit,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ru-l1u4-orientation', pronunciation: 'ru-l1u4-pronunciation',
  vocabularyMorning: 'ru-l1u4-vocab-morning', vocabularyAfternoon: 'ru-l1u4-vocab-afternoon', vocabularyEvening: 'ru-l1u4-vocab-evening',
  grammarReflexive: 'ru-l1u4-grammar-reflexive', grammarTime: 'ru-l1u4-grammar-time', grammarFrequency: 'ru-l1u4-grammar-frequency',
  reading: 'ru-l1u4-reading', listening: 'ru-l1u4-listening', writing: 'ru-l1u4-writing',
  culture: 'ru-l1u4-culture', task: 'ru-l1u4-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: [
    'Describe your daily routine from waking up to going to bed using 20+ everyday verbs (вставать, умываться, завтракать, идти на работу, обедать, ужинать, ложиться спать).',
    'Tell time in Russian on the clock face (Который час? Сколько времени? Сейчас три часа.) and use telephone-style schedule expressions (в восемь утра).',
    'Use frequency adverbs (всегда, обычно, часто, иногда, редко, никогда) to describe how often something happens.',
  ], task: 'Picture a typical weekday at МГУ — from 6 am wake-up to midnight bedtime. By the end of this lesson you should narrate every step of it in Russian without searching for verbs.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Reflexive -ся / -сь endings', goals: [
    'Pronounce reflexive verbs correctly: after a consonant use -ся (умываюсь, ложусь spelled with -сь), after a vowel use -сь (умываю + сь → умываюсь).',
    'Apply final devoicing in past tense forms: встал /fstal/, проснулся /prɐsˈnulsʲə/.',
    'Apply akanye in long verbs: возвращаюсь /vəzvrɐˈʂʂajʊsʲ/ — multi-syllable verbs with heavy reduction.',
  ], task: 'Drill 10 reflexive verbs in 1sg and 3sg forms, marking stress.' },
  { id: ACT.vocabularyMorning, section: 'Vocabulary I', title: 'Morning routine', goals: ['Memorize 10 morning verbs', 'Distinguish perfective vs imperfective aspect pairs'], task: 'Narrate your morning in 6 sentences.' },
  { id: ACT.vocabularyAfternoon, section: 'Vocabulary II', title: 'Afternoon activities', goals: ['Memorize 8 afternoon verbs', 'Describe work/study activities'], task: 'Narrate your afternoon.' },
  { id: ACT.vocabularyEvening, section: 'Vocabulary III', title: 'Evening routine', goals: ['Memorize 8 evening verbs', 'Distinguish ложиться спать vs идти спать'], task: 'Narrate your evening.' },
  { id: ACT.grammarReflexive, section: 'Grammar I', title: 'Reflexive verbs (-ся / -сь)', goals: [
    'Form reflexive verbs by adding -ся (after consonant) or -сь (after vowel) to the regular verb stem: мыть (to wash sth) → мыться (to wash oneself).',
    'Recognize that reflexive verbs cover four semantic types: true reflexive (мыться), reciprocal (целоваться), passive (изучается), and motion middle (учиться).',
  ], task: 'Convert 6 transitive verbs to their reflexive equivalents.' },
  { id: ACT.grammarTime, section: 'Grammar II', title: 'Telling time', goals: [
    'Form Который час? answers using the час pattern: один час (1:00), два часа (2-4:00), пять часов (5-12:00) — different forms after different numerals.',
    'Express "at X o\'clock" using в + accusative: в три часа, в пять часов, в час дня.',
    'Distinguish утра / дня / вечера / ночи as time-of-day qualifiers (3 of the day vs 3 of the night).',
  ], task: 'Tell time on 8 clock faces and translate 8 schedule sentences.' },
  { id: ACT.grammarFrequency, section: 'Grammar III', title: 'Frequency adverbs', goals: [
    'Order the frequency scale: всегда (always) > обычно (usually) > часто (often) > иногда (sometimes) > редко (rarely) > никогда (never).',
    'Use double negation with никогда: Я никогда НЕ ем мясо. (Russian negation requires both никогда AND the not-particle).',
  ], task: 'Build 6 sentences each using a different frequency adverb.' },
  { id: ACT.reading, section: 'Reading', title: 'A typical МГУ student day', goals: ['Read a 6-sentence narrative', 'Answer comprehension questions'], task: 'Read aloud and answer 4 questions.' },
  { id: ACT.listening, section: 'Listening', title: 'Comparing morning routines', goals: ['Follow a 6-turn dialogue', 'Identify register markers'], task: 'Summarize each speaker\'s day.' },
  { id: ACT.writing, section: 'Writing', title: 'My weekday schedule', goals: ['Write 6-8 sentences', 'Use 3 reflexive verbs and 2 frequency adverbs'], task: 'Draft your schedule.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Russian work/study rhythm', goals: [
    'Know that Russian students often have early starts (8:30 first pair, "первая пара") and long days, with пары (90-min "couples") rather than 50-min lectures.',
    'Recognize the обед / перерыв meal/break culture and the workplace значение of being at your desk by 9.',
  ], task: 'Compare a typical МГУ schedule with your own.' },
  { id: ACT.task, section: 'Task', title: 'Describe a typical day at МГУ', goals: ['Combine all skills', 'Use 8+ verbs in sequence'], task: 'Roleplay narrating your day to a Russian friend.' },
];

const lesson = {
  title: 'Level 1 · Unit 4: Мой день — Daily Routines',
  category: 'daily-life', difficulty: 'beginner', targetLang: 'ru', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic', activities,
  expressionPractice: [
    { id: 'narrating-routine', label: 'Narrating routine', goal: 'Tell your daily schedule from morning to night in chronological order.' },
    { id: 'telling-time', label: 'Telling time', goal: 'Read clock faces and schedule times in Russian.' },
    { id: 'reflexive-verbs', label: 'Reflexive verbs', goal: 'Use -ся/-сь endings correctly for self-directed actions.' },
    { id: 'frequency', label: 'Frequency adverbs', goal: 'Place всегда/часто/иногда/никогда correctly with double negation.' },
  ],
  relatedPools: ['topic-daily-life', 'topic-time'],
  content: [
    createContentItem('Цели урока', 'Tseli uroka', 'By the end of this lesson, you can describe your entire weekday from waking up to bedtime in Russian, telling time, ordering events chronologically, and noting frequency. The verbs and time expressions covered here recur in nearly every later Russian lesson.', 'word', 'Утро → день → вечер → ночь.', '"Morning → day → evening → night." — the four periods of a Russian day.', null, [ACT.orientation]),
    createContentItem('Реальный сценарий', 'Realnyy stsenariy', 'You are sharing a kitchen with a Russian student in МГУ dorm ДАС at 7:30 am. They ask "А ты во сколько встаёшь?" (And when do you get up?). You need to give a full schedule from морнинг to evening using everyday verbs and times.', 'word', 'А ты во сколько встаёшь?', '"And when do you get up?" — во variant of в before consonant cluster; сколько is "how much/at what time".', null, [ACT.orientation]),
    createContentItem('Расписание дня', 'Raspisaniye dnya', 'A typical МГУ student day: 6:30 wake-up, 7:30 breakfast, 8:30 first pair (пара), 12:00 lunch, 14:00 second pair, 16:00 library, 19:00 dinner, 21:00 free time, 23:00 sleep. Each step has a standard verb in Russian.', 'word', '6:30 встаю → 7:30 завтракаю → 8:30 пара → 12:00 обедаю → 14:00 пара → 16:00 учу → 19:00 ужинаю → 23:00 ложусь спать.', 'A full schedule template; use it as model for your own day.', null, [ACT.orientation]),

    createContentItem('вставать / встать', 'vstavat\' / vstat\'', 'To get up (imperfective / perfective aspect pair). Imperfective вставать = "to get up [habitually / over time]"; perfective встать = "to get up [completed action]". Я встаю в семь утра ("I get up at 7 am" — habitual).', 'word', 'Я встаю в семь.', '"I get up at seven." — imperfective for habit.', [
      { target: 'imperfective вставать', note: 'habitual or ongoing; conjugation: встаю, встаёшь, встаёт, встаём, встаёте, встают' },
      { target: 'perfective встать', note: 'completed action; future: встану, встанешь, встанет' },
    ], [ACT.vocabularyMorning]),
    createContentItem('просыпаться / проснуться', 'prosypatsya / prosnutsya', 'To wake up (reflexive aspect pair). Просыпаться (impf, "to wake up [over time]") vs проснуться (pf, "to wake up [completed]"). Я просыпаюсь рано (I wake up early — habitual). Я проснулся в шесть (I woke up at 6 — past pf).', 'word', 'Я просыпаюсь рано.', '"I wake up early." — reflexive impf for habit.', null, [ACT.vocabularyMorning]),
    createContentItem('умываться / умыться', 'umyvatsya / umytsya', 'To wash one\'s face (reflexive aspect pair). The -ся reflexive ending means the action is directed at oneself.', 'word', 'Я умываюсь и чищу зубы.', '"I wash my face and brush my teeth." — two morning verbs.', null, [ACT.vocabularyMorning]),
    createContentItem('чистить зубы', 'chistit\' zuby', 'To brush teeth (NOT reflexive). Чистить = "to clean"; зубы = "teeth" (plural of зуб). Direct object construction.', 'word', 'Я чищу зубы каждое утро.', '"I brush my teeth every morning." — every-morning frequency.', null, [ACT.vocabularyMorning]),
    createContentItem('принимать душ', 'prinimat\' dush', 'To take a shower. Lit. "to receive a shower". Душ is masculine. Pf: принять душ.', 'word', 'Я принимаю душ утром.', '"I take a shower in the morning." — утром is adv "in the morning" (instr case form).', null, [ACT.vocabularyMorning]),
    createContentItem('завтракать / позавтракать', 'zavtrakat / pozavtrakat', 'To have breakfast (impf/pf pair). Завтрак = breakfast (n). Я завтракаю в восемь = "I have breakfast at 8".', 'word', 'Что ты ешь на завтрак?', '"What do you eat for breakfast?" — на + acc; завтрак as object of "for".', null, [ACT.vocabularyMorning]),
    createContentItem('одеваться / одеться', 'odevatsya / odetsya', 'To get dressed (reflexive aspect pair). Одеть кого-то = "to dress someone"; одеться = "to dress oneself".', 'word', 'Я быстро одеваюсь.', '"I get dressed quickly." — adv быстро ("quickly").', null, [ACT.vocabularyMorning]),
    createContentItem('идти на работу / в университет', 'idti na rabotu / v universitet', 'To go to work / to university. На for работа (event-like), в for университет (place). Both with idti + acc.', 'word', 'Я иду на работу.', '"I am going to work." — unidirectional motion.', null, [ACT.vocabularyMorning]),
    createContentItem('пить кофе', 'pit\' kofe', 'To drink coffee. Кофе is masculine and indeclinable. Пить is irregular: пью, пьёшь, пьёт, пьём, пьёте, пьют.', 'word', 'Я пью кофе утром.', '"I drink coffee in the morning." — high-frequency phrase.', null, [ACT.vocabularyMorning]),

    createContentItem('работать', 'rabotat\'', 'To work (impf). 1st conjugation: работаю, работаешь, работает, работаем, работаете, работают. Object: над + instr (работать над проектом = "to work on a project").', 'word', 'Я работаю в офисе.', '"I work in an office." — в + prep case офисе.', null, [ACT.vocabularyAfternoon]),
    createContentItem('учиться', 'uchitsya', 'To study (reflexive, intransitive). Used for "to study at [a school/uni]": Я учусь в МГУ. Different from учить (to study sth) and изучать (to study sth systematically).', 'word', 'Я учусь в университете.', '"I study at university." — reflexive verb without explicit object.', null, [ACT.vocabularyAfternoon]),
    createContentItem('обедать / пообедать', 'obedat\' / poobedat\'', 'To have lunch (impf/pf). Обед = lunch (m). Я обедаю в час = "I have lunch at one".', 'word', 'Где ты обедаешь?', '"Where do you eat lunch?" — daily question among colleagues.', null, [ACT.vocabularyAfternoon]),
    createContentItem('учить / выучить', 'uchit\' / vyuchit\'', 'To learn / memorize (something). Note: учить ≠ учиться. Я учу русский = "I am studying Russian". Pf выучить = completed learning.', 'word', 'Я учу новые слова.', '"I am learning new words." — учить with direct object (acc).', null, [ACT.vocabularyAfternoon]),
    createContentItem('читать', 'chitat\'', 'To read (impf). 1st conjugation: читаю, читаешь, читает, читаем, читаете, читают. Pf: прочитать.', 'word', 'Я читаю книгу.', '"I am reading a book." — книгу acc of книга.', null, [ACT.vocabularyAfternoon]),
    createContentItem('писать', 'pisat\'', 'To write (impf). Irregular: пишу, пишешь, пишет, пишем, пишете, пишут (с → ш in conjugation). Pf: написать.', 'word', 'Я пишу письмо.', '"I am writing a letter." — письмо (n) accusative same as nom for inanimate.', null, [ACT.vocabularyAfternoon]),
    createContentItem('встречаться с', 'vstrechat\'sya s', 'To meet with (reflexive, takes c + instr). Я встречаюсь с другом = "I am meeting with a friend".', 'word', 'Я встречаюсь с другом в кафе.', '"I am meeting with a friend at a cafe." — с + instr case другом.', null, [ACT.vocabularyAfternoon]),
    createContentItem('возвращаться', 'vozvrashchatsya', 'To return / come back (reflexive impf). Pf: вернуться. Я возвращаюсь домой в семь = "I return home at seven".', 'word', 'Я возвращаюсь домой поздно.', '"I return home late." — домой is adv "homeward" (motion form of дом).', null, [ACT.vocabularyAfternoon]),

    createContentItem('ужинать / поужинать', 'uzhinat\' / pouzhinat\'', 'To have dinner (impf/pf). Ужин = dinner (m). Я ужинаю в восемь = "I have dinner at 8".', 'word', 'Что ты ешь на ужин?', '"What do you eat for dinner?" — standard evening question.', null, [ACT.vocabularyEvening]),
    createContentItem('смотреть телевизор', 'smotret\' televizor', 'To watch TV. Смотреть takes acc. Pf: посмотреть.', 'word', 'Я смотрю телевизор вечером.', '"I watch TV in the evening." — вечером instr-case adverb.', null, [ACT.vocabularyEvening]),
    createContentItem('гулять', 'gulyat\'', 'To take a walk / stroll (impf). 1st conj. Pf: погулять. Я гуляю с собакой = "I walk the dog".', 'word', 'Я гуляю в парке.', '"I take a walk in the park." — в + prep case парке.', null, [ACT.vocabularyEvening]),
    createContentItem('читать книгу', 'chitat\' knigu', 'To read a book (evening leisure activity).', 'word', 'Я читаю книгу перед сном.', '"I read a book before sleep." — перед + instr case сном.', null, [ACT.vocabularyEvening]),
    createContentItem('звонить / позвонить', 'zvonit\' / pozvonit\'', 'To call (by phone) (impf/pf pair). Takes dative: звонить кому = "to call someone". Я звоню маме = "I call mom".', 'word', 'Я звоню маме каждый вечер.', '"I call my mom every evening." — маме dat of мама.', null, [ACT.vocabularyEvening]),
    createContentItem('ложиться спать / лечь спать', 'lozhit\'sya spat\' / lech spat\'', 'To go to bed (impf/pf pair). Ложиться = "to lie down"; the спать (to sleep) infinitive specifies that it\'s for sleeping. Я ложусь спать в одиннадцать.', 'word', 'Я ложусь спать в 11 вечера.', '"I go to bed at 11 PM." — в + acc + вечера ("of the evening").', null, [ACT.vocabularyEvening]),
    createContentItem('спать', 'spat\'', 'To sleep (impf). Irregular present: сплю, спишь, спит, спим, спите, спят. Pf is усыпать / уснуть ("to fall asleep").', 'word', 'Я сплю восемь часов.', '"I sleep eight hours." — accusative для duration.', null, [ACT.vocabularyEvening]),
    createContentItem('просыпаться', 'prosypatsya (impf)', 'See morning section — completed cycle for evening: ложусь → сплю → просыпаюсь.', 'word', 'Я просыпаюсь рано.', '"I wake up early."', null, [ACT.vocabularyEvening]),

    createContentItem('Возвратные глаголы -ся / -сь', 'Reflexive verbs -sya / -s', 'Russian reflexive verbs add the suffix -ся (after consonant) or -сь (after vowel) to the regular verb stem. Four semantic types: (1) true reflexive (мыться "to wash oneself"); (2) reciprocal (целоваться "to kiss each other"); (3) passive (изучается "is being studied"); (4) intransitive-marker (учиться "to study", смеяться "to laugh"). Same form, four meanings.', 'sentence', 'я мою стол (I wash the table) → я моюсь (I wash myself, reflexive)\nя люблю её → они любятся (they love each other, reciprocal)\nстудент изучает русский → русский изучается (Russian is being studied, passive)\nя учу русский → я учусь (I am a student, intrans-marker)', 'The -ся suffix has been the historical marker of all four functions; context determines which.', [
      { target: '-ся after consonant', note: 'моюсь, учусь, ложусь — vowel + ся attached' },
      { target: '-сь after vowel', note: 'моется, учится, ложится — consonant + ся after the vowel of the verb stem' },
      { target: 'past tense pattern', note: 'мылся (m), мылась (f), мылось (n), мылись (pl)' },
    ], [ACT.grammarReflexive]),

    createContentItem('Время — час / часы / часов', 'Time — chas / chasy / chasov', 'Russian "X o\'clock" uses different forms of час depending on the number: 1 час (singular nominative for 1), 2/3/4 часа (genitive singular after 2-4), 5-12 часов (genitive plural after 5-12). Apply across hours.', 'sentence', 'Сейчас один час. (1:00)\nСейчас два часа. (2:00)\nСейчас пять часов. (5:00)\nСейчас одиннадцать часов. (11:00)', 'The 1/2-4/5+ pattern is general across counted nouns — first numeral rule learners encounter.', [
      { target: '1 + час (nom sg)', note: 'один час, двадцать один час; specific singular form' },
      { target: '2-4 + часа (gen sg)', note: 'два часа, три часа, четыре часа, двадцать два часа' },
      { target: '5-20 + часов (gen pl)', note: 'пять часов, ... десять часов, ... двадцать часов' },
    ], [ACT.grammarTime]),
    createContentItem('В + accusative for time', 'V + acc for time', '"At X o\'clock" uses в + accusative. For time, accusative of час forms is same as nominative for the numeral. в три часа = "at 3 o\'clock", в восемь утра = "at 8 in the morning".', 'sentence', 'в три часа · в час дня · в семь утра · в одиннадцать вечера', 'The genitive utra/дня/вечера/ночи is the time-of-day qualifier.', null, [ACT.grammarTime]),
    createContentItem('утра / дня / вечера / ночи', 'utra / dnya / vechera / nochi', 'Russian distinguishes four times of day: утро (morning, 4-11 am), день (day, noon-5 pm), вечер (evening, 6-11 pm), ночь (night, midnight-3 am). Used as genitive after a time: восемь утра = "8 of the morning".', 'sentence', 'три утра — 3:00 AM (early morning)\nтри дня — 3:00 PM (afternoon)\nсемь вечера — 7:00 PM (evening)\nдва ночи — 2:00 AM (deep night)', 'Russian does NOT use AM/PM; instead specify утра/дня/вечера/ночи for clarity.', null, [ACT.grammarTime]),

    createContentItem('Частотные наречия', 'Chastotnye narechiya — frequency adverbs', 'Six common frequency adverbs ordered: всегда (always) > обычно (usually) > часто (often) > иногда (sometimes) > редко (rarely) > никогда (never).', 'sentence', 'Я всегда завтракаю. (I always have breakfast.)\nЯ обычно встаю в семь. (I usually get up at 7.)\nЯ часто читаю. (I often read.)\nЯ иногда смотрю фильмы. (I sometimes watch films.)\nЯ редко ем мясо. (I rarely eat meat.)\nЯ никогда НЕ курю. (I never smoke.)', 'Pay attention to the last example: никогда requires DOUBLE negation with не.', [
      { target: 'всегда always', note: 'highest frequency; placed between subject and verb' },
      { target: 'обычно usually', note: 'high frequency; typical default' },
      { target: 'часто often', note: 'frequent but not constant' },
      { target: 'иногда sometimes', note: 'medium-low frequency' },
      { target: 'редко rarely', note: 'low frequency' },
      { target: 'никогда never', note: 'zero frequency; requires double negation with не' },
    ], [ACT.grammarFrequency]),
    createContentItem('Двойное отрицание', 'Dvoynoye otritsaniye — double negation', 'CRITICAL RULE: Russian negative adverbs (никогда, никто, ничто, нигде, никак) REQUIRE the additional не with the verb. "I never eat meat" is Я никогда НЕ ем мясо — both никогда AND не. Single negation is wrong: *Я никогда ем мясо.', 'sentence', 'Я никогда не курю. (correct)\n*Я никогда курю. (wrong)', 'Russian double negation differs from English; English uses single negation: "I never smoke".', null, [ACT.grammarFrequency]),

    createContentItem('День студента МГУ', 'Den\' studenta MGU', 'A short narrative of a typical day. Read aloud and identify each verb\'s aspect (impf for habit, pf for completed).', 'sentence', 'Я встаю в 6:30. Я умываюсь, чищу зубы, и одеваюсь. В 7:30 я завтракаю. В 8:00 я еду в университет на метро. В 8:30 у меня первая пара. После пары я обедаю в столовой. В 14:00 у меня вторая пара. Вечером я учусь в библиотеке до семи. В 23:00 я ложусь спать.', 'Standard student-day narrative; every key verb appears.', null, [ACT.reading]),
    createContentItem('Вопросы', 'Voprosy', 'Four comprehension questions about the daily narrative.', 'sentence', 'Q1: Во сколько он встаёт? Q2: Где он обедает? Q3: Что он делает вечером? Q4: Во сколько он ложится спать?', 'Mix of во сколько, где, что.', null, [ACT.reading]),

    createContentItem('Сравнение утра', 'Comparison of mornings', 'Two МГУ students compare their morning routines.', 'conversation', 'Аня: Ты во сколько встаёшь?\nИван: В шесть утра. А ты?\nАня: А я обычно в семь. Завтракаешь дома?\nИван: Да, всегда. Кофе и бутерброд.\nАня: А я иногда пропускаю завтрак.\nИван: Это плохо. Завтрак — самое важное.', 'Casual peer comparison; covers frequency adverbs and breakfast vocabulary.', null, [ACT.listening]),

    createContentItem('Мой расписание', 'Moye raspisaniye', 'A sample written daily-schedule paragraph.', 'sentence', 'Я обычно встаю в 7. Сначала я принимаю душ, потом завтракаю. В 8:30 я иду на первую пару. После пары я обедаю с друзьями. Я часто учусь в библиотеке до вечера. Я всегда ложусь спать в 11.', 'Sequence words: сначала (first), потом (then), после (after), всегда (always) — anchor the chronological narrative.', null, [ACT.writing]),

    createContentItem('Пара в МГУ', 'Para v MGU', 'Russian university classes are organized into пары (literally "pairs") — 90-minute blocks divided into two 45-minute halves with a 5-minute break in the middle. A typical student has 3-5 pairs per day. The first pair (первая пара) starts at 8:30 or 9:00 sharply.', 'sentence', 'У меня сегодня четыре пары.', '"I have four pairs today." — typical schedule complexity.', [
      { target: 'пара para', note: 'literally "pair" — Russian academic class block; 90 min total' },
      { target: 'первая пара', note: 'first pair of the day; usually 8:30 AM' },
      { target: 'окно okno', note: 'literally "window" — slang for a free period between pairs' },
    ], [ACT.culture]),
    createContentItem('Обед в России', 'Obed v Rossii', 'Russian обед is typically eaten 12:00-14:00 and is the main meal of the day — soup (первое), main dish (второе), and compote (третье). At МГУ, students eat in столовая (canteen) or бистро (modern fast-cafe). Lunch is significant — never skipped.', 'sentence', 'Обед — первое, второе, и третье.', 'Three-course lunch structure; deeply ingrained in Russian eating culture.', null, [ACT.culture]),

    createContentItem('Задание: расскажи о дне', 'Zadaniye: rasskazhi o dne', 'Narrate your typical weekday at МГУ in 8-10 sentences to the AI tutor playing a curious Russian friend.', 'conversation', 'Друг: Расскажи, как проходит твой день?\nВы: [полный рассказ с временем и наречиями частоты]\nДруг: А когда ты учишь домашнее задание?\nВы: [ответ]\nДруг: Понятно.', 'Combines verbs, time expressions, frequency adverbs, and reflexive verbs into one coherent narrative.', null, [ACT.task]),
  ],
};

module.exports = lesson;
