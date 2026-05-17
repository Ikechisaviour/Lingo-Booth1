// Level 1 Unit 4 — Daily Routines (Filipino/Tagalog)
// Functions: daily routine verbs, time expressions, frequency adverbs,
// aspect markers, talking about a typical day.

const createContentItem = (target, pron, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization: pron, nativeText: note,
  pronunciation: pron, exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'fil-l1u4-orientation',
  pronunciation: 'fil-l1u4-pronunciation',
  vocabularyMorning: 'fil-l1u4-vocab-morning',
  vocabularyEvening: 'fil-l1u4-vocab-evening',
  grammarMagPrefix: 'fil-l1u4-grammar-mag',
  grammarAspect: 'fil-l1u4-grammar-aspect',
  grammarFrequency: 'fil-l1u4-grammar-frequency',
  reading: 'fil-l1u4-reading',
  listening: 'fil-l1u4-listening',
  writing: 'fil-l1u4-writing',
  culture: 'fil-l1u4-culture',
  task: 'fil-l1u4-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Describe a typical day in Filipino using 20+ daily-routine verbs.', 'Use the mag- prefix to form actor-focus verbs in three aspects (will, doing, did).', 'Use time and frequency expressions (palagi, minsan, tuwing) accurately.'], task: 'Describe your routine to a roommate at UP Diliman — by the end of this lesson, you should be able to narrate your morning, day, and evening fluently.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in mag- verbs', goals: ['Pronounce the reduplication in future aspect: maglu-luto (will cook) — the lu- is the reduplicated first CV of the root.', 'Apply correct stress on aspectual forms; the stress can shift slightly.'], task: 'Read each aspect form aloud.' },
  { id: ACT.vocabularyMorning, section: 'Vocabulary I', title: 'Morning routine verbs', goals: ['Memorize 10 morning routine verbs (gumising, maligo, magbihis, kumain, magsipilyo, etc.).'], task: 'Sequence them in order of your morning.' },
  { id: ACT.vocabularyEvening, section: 'Vocabulary II', title: 'Evening routine verbs', goals: ['Memorize 10 evening routine verbs (umuwi, mag-shower, manood, magbasa, matulog, etc.).'], task: 'Sequence them.' },
  { id: ACT.grammarMagPrefix, section: 'Grammar I', title: 'Mag- prefix for actor-focus habitual verbs', goals: ['Use mag- to form actor-focus verbs from roots: maglinis (clean), magluto (cook), magbasa (read).', 'Distinguish mag- (habitual/instrumental) from -um- (single completed action) — mag-aral (study habitually) vs umaral (took up the cause of).'], task: 'Form 5 mag- verbs from roots you know.' },
  { id: ACT.grammarAspect, section: 'Grammar II', title: 'Three aspects: contemplated, imperfective, completed', goals: ['Form the three aspects of any mag- verb: mag-aaral (will study), nag-aaral (studying/studies), nag-aral (studied).', 'Filipino has NO TENSE, only aspect. The aspect tells you about completion, not the time per se.'], task: 'Conjugate three verbs through all three aspects.' },
  { id: ACT.grammarFrequency, section: 'Grammar III', title: 'Time and frequency expressions', goals: ['Use palagi (always), madalas (often), minsan (sometimes), bihira (rarely), hindi (never).', 'Use tuwing + day/time = "every (day)": tuwing Lunes "every Monday".'], task: 'Form sentences using each frequency.' },
  { id: ACT.reading, section: 'Reading', title: 'A typical day at UP', goals: ['Read a paragraph describing a student\'s typical day.', 'Identify aspect markers and frequency.'], task: 'Read; answer questions.' },
  { id: ACT.listening, section: 'Listening', title: 'Roommate routine talk', goals: ['Follow a dialogue between two UP dorm roommates discussing their schedules.'], task: 'Listen; perform with swapped roles.' },
  { id: ACT.writing, section: 'Writing', title: 'My typical day', goals: ['Write 6-8 sentences describing your daily routine using mag- verbs in three aspects and at least two frequency expressions.'], task: 'Write and read aloud.' },
  { id: ACT.culture, section: 'Culture', title: 'Filipino daily rhythm', goals: ['Know that Filipinos eat 3 meals + 2 merienda (snack times); siesta (afternoon nap) is traditional but rare in modern urban life.', 'Sunday is family/church day; Saturday is errand day.'], task: 'Compare your weekly rhythm with the Filipino one.' },
  { id: ACT.task, section: 'Task', title: 'Describe a typical school day', goals: ['Combine: greet, narrate from morning to evening with at least 3 mag- verbs in 3 aspects and 2 frequencies.'], task: 'Roleplay with the AI tutor.' },
];

const lesson = {
  title: 'Level 1 · Unit 4: Araw-Araw na Gawain — Daily Routines',
  category: 'daily-routines',
  difficulty: 'beginner',
  targetLang: 'fil',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'morning-routine', label: 'Morning routine', goal: 'Sequence morning actions using gumising → maligo → magbihis → kumain.' },
    { id: 'evening-routine', label: 'Evening routine', goal: 'Sequence evening actions using umuwi → kumain → mag-shower → matulog.' },
    { id: 'frequency', label: 'Talking about frequency', goal: 'Use palagi / madalas / minsan / bihira to express how often.' },
    { id: 'time-of-day', label: 'Talking about time of day', goal: 'Use tuwing umaga / sa hapon / sa gabi naturally.' },
  ],
  relatedPools: ['topic-routines', 'topic-daily-life'],
  content: [
    createContentItem('Layunin', 'la-YU-nin', 'Filipino has NO tense — only aspect. The mag- prefix forms an actor-focus verb that can be habitual or instrumental. The three aspects (contemplated, imperfective, completed) tell you about completion, not the absolute time. This is one of the most distinctive features of Philippine languages.', 'word', 'mag-aaral (will study) / nag-aaral (studying) / nag-aral (studied)', 'Three aspects, one verb, no tense — what is completed, what is ongoing, what is contemplated.', null, [ACT.orientation]),
    createContentItem('Tunay na sitwasyon', 'TU-nay na sit-wa-SYON', 'You are sharing a dorm room at UP Diliman with a roommate. On the second day, you both compare schedules: who wakes when, who showers when, who eats at the canteen, who studies late. The whole conversation involves only mag- and -um- verbs in three aspects.', 'word', 'Roommate: "Kailan ka gumigising? — Mga alas-sais ako gumigising, ikaw?"', '"What time do you wake up? — I wake up around 6, you?" — typical roommate exchange.', null, [ACT.orientation]),

    createContentItem('mag- prefix', 'MAG-', 'Actor-focus prefix used to form HABITUAL or instrumental verbs from roots. Attaches before any root: mag- + linis (clean) = maglinis "to clean (regularly)". The actor (the subject doing the action) is the focus.', 'sentence', 'mag- + luto = magluto "to cook"; mag- + bihis = magbihis "to dress"; mag- + aral = mag-aral "to study"', 'Three example verbs formed with mag-. The root is the bare meaning; mag- adds the actor-focus and habitual/instrumental nuance.', [
      { target: 'mag- + root', note: 'forms actor-focus, habitual verb' },
      { target: 'contrast with -um-', note: '-um- is for single completed actions; mag- is for habitual/extended actions' },
      { target: 'three aspects', note: 'all mag- verbs conjugate through three aspects' },
    ], [ACT.grammarMagPrefix]),
    createContentItem('Tatlong aspeto', 'TAT-long as-PE-to', 'The THREE ASPECTS of any mag- verb: 1) Contemplated (will / about to / planning to): mag- + reduplicated first CV + root → MAG-LU-LUTO "will cook". 2) Imperfective (doing / does habitually): NAG- + reduplicated first CV + root → NAG-LU-LUTO "is cooking / cooks". 3) Completed (did / has done): NAG- + root → NAG-LUTO "cooked".', 'sentence', 'magluluto / nagluluto / nagluto = "will cook / cooks / cooked"', 'Same verb, three aspect forms. The first letter changes (m- → n-) and the reduplication appears or disappears.', [
      { target: 'CONTEMPLATED: mag- + redup + root', note: 'magluluto, mag-aaral, magbabasa' },
      { target: 'IMPERFECTIVE: nag- + redup + root', note: 'nagluluto, nag-aaral, nagbabasa' },
      { target: 'COMPLETED: nag- + root', note: 'nagluto, nag-aral, nagbasa' },
    ], [ACT.grammarAspect]),

    createContentItem('gumising', 'gu-MI-sing', '"To wake up". Actor-focus, root: gising. Aspects: gigising (will), gumigising (waking up / wakes up), gumising (woke up). Common time: alas-sais (6 AM, Spanish-style), alas-siyete (7 AM).', 'word', 'Gumising ako ng alas-sais.', '"I woke up at 6 AM" — completed aspect; alas- + Spanish number for time.', null, [ACT.vocabularyMorning]),
    createContentItem('maligo', 'ma-LI-go', '"To take a bath / shower". Actor-focus, native root: ligo. Aspects: maliligo (will), naliligo (showering), naligo (showered). In Filipino tropics, two showers a day is normal.', 'word', 'Naligo na ako kaninang umaga.', '"I already showered this morning" — kaninang = "earlier today".', null, [ACT.vocabularyMorning]),
    createContentItem('magbihis', 'mag-BI-his', '"To get dressed". Mag- + bihis. Aspects: magbibihis (will), nagbibihis (getting dressed), nagbihis (got dressed).', 'word', 'Magbibihis ka pa ba?', '"Are you still going to dress?" — pa = still, ba = question.', null, [ACT.vocabularyMorning]),
    createContentItem('kumain', 'ku-MA-in', '"To eat". Actor-focus, root: kain. Aspects: kakain (will), kumakain (eating), kumain (ate). Filipinos eat three meals: almusal/breakfast, tanghalian/lunch, hapunan/dinner — plus two merienda (snack times).', 'word', 'Kumain na ako ng almusal.', '"I have already eaten breakfast" — na = "already".', null, [ACT.vocabularyMorning]),
    createContentItem('magsipilyo', 'mag-si-PI-lyo', '"To brush (teeth)". From Spanish "cepillo" (brush). Refers specifically to brushing teeth. Aspects: magsisipilyo, nagsisipilyo, nagsipilyo.', 'word', 'Nagsisipilyo siya bago matulog.', '"He brushes his teeth before sleeping."', null, [ACT.vocabularyMorning]),
    createContentItem('magtimpla ng kape', 'mag-TIM-pla ng KA-pe', '"To make coffee". Mag- + timpla (mix/prepare) + ng + kape. Coffee culture is huge in the Philippines; both 3-in-1 instant and brewed are common.', 'word', 'Nagtimpla ako ng kape para sa nanay.', '"I made coffee for mom" — para = "for".', null, [ACT.vocabularyMorning]),
    createContentItem('umalis', 'u-ma-LIS', '"To leave / depart". Actor-focus, root: alis. Aspects: aalis (will leave), umaalis (leaving / leaves), umalis (left). Common with sa + destination/origin: umalis ako sa bahay "I left from home".', 'word', 'Aalis na ako papunta sa eskwelahan.', '"I am about to leave for school" — na = "already / now"; papunta = "going (to)".', null, [ACT.vocabularyMorning]),
    createContentItem('pumasok', 'pu-MA-sok', '"To enter / go to school / go to work". Actor-focus, root: pasok. Aspects: papasok (will enter / go), pumapasok (entering / goes), pumasok (entered / went). Special meanings: pumasok sa eskwelahan = "go to school"; pumasok sa trabaho = "go to work".', 'word', 'Pumasok ako sa UP kahapon.', '"I went to UP yesterday."', null, [ACT.vocabularyMorning]),
    createContentItem('sumakay', 'su-ma-KAY', '"To ride (transit)". Actor-focus, root: sakay. Aspects: sasakay, sumasakay, sumakay. With ng + transit type: sumakay ng jeep "ride a jeepney".', 'word', 'Sumakay ako ng MRT papuntang Cubao.', '"I rode the MRT to Cubao."', null, [ACT.vocabularyMorning]),

    createContentItem('mag-aral', 'mag-A-ral', '"To study". Mag- + aral. Aspects: mag-aaral (will study), nag-aaral (studying), nag-aral (studied). One of the highest-frequency verbs for students.', 'word', 'Nag-aaral ako sa library tuwing gabi.', '"I study at the library every night" — tuwing + time = "every (day/time)".', null, [ACT.vocabularyEvening]),
    createContentItem('umuwi', 'u-MU-wi', '"To go home". Actor-focus, root: uwi. Aspects: uuwi (will go home), umuuwi (going home / goes home), umuwi (went home). Always with implicit sa bahay "to home", often omitted.', 'word', 'Anong oras ka uuwi?', '"What time will you go home?" — typical end-of-day question.', null, [ACT.vocabularyEvening]),
    createContentItem('manood', 'ma-NO-od', '"To watch (TV / movies)". Ma- prefix actor-focus, root: nood. Aspects: manonood (will watch), nanonood (watching), nanood (watched). Common: manood ng TV / manood ng movie / manood ng K-drama.', 'word', 'Nanonood ako ng K-drama tuwing gabi.', '"I watch K-drama every night" — K-pop and K-drama are massive in the Philippines.', null, [ACT.vocabularyEvening]),
    createContentItem('magbasa', 'mag-BA-sa', '"To read". Mag- + basa. Aspects: magbabasa, nagbabasa, nagbasa. Contrast with bumasa (-um-, single act of reading): mag-basa is habitual/extended, bumasa is one read-through.', 'word', 'Nagbabasa siya ng libro bago matulog.', '"He reads a book before sleeping" — bago = "before".', null, [ACT.vocabularyEvening]),
    createContentItem('magluto', 'mag-LU-to', '"To cook". Mag- + luto. Aspects: magluluto, nagluluto, nagluto. Cooking dinner is often a family activity in Filipino households.', 'word', 'Nagluluto ang nanay ng adobo para sa hapunan.', '"Mom is cooking adobo for dinner" — adobo is the national dish.', null, [ACT.vocabularyEvening]),
    createContentItem('maghapunan', 'mag-ha-PU-nan', '"To have dinner". Mag- + hapunan (dinner). Aspects: maghahapunan, naghahapunan, naghapunan. Dinner is typically 6-8 PM, family-style.', 'word', 'Maghahapunan tayo ng alas-sais.', '"Let\'s have dinner at 6" — tayo (inclusive we).', null, [ACT.vocabularyEvening]),
    createContentItem('matulog', 'ma-TU-log', '"To sleep". Ma- actor-focus, root: tulog. Aspects: matutulog (will sleep), natutulog (sleeping / sleeps), natulog (slept).', 'word', 'Natutulog ako mga alas-onse.', '"I sleep around 11 (PM)."', null, [ACT.vocabularyEvening]),
    createContentItem('mag-shower', 'mag-SHA-wer', '"To shower". Taglish: mag- + English shower. Common urban usage alongside native maligo. Aspects: magsha-shower, nagsha-shower, nag-shower.', 'word', 'Magsha-shower muna ako bago kumain.', '"I will shower first before eating."', null, [ACT.vocabularyEvening]),
    createContentItem('mag-Facebook / mag-social media', 'mag-FAYS-buk', '"To use Facebook / social media". Taglish hybrid: mag- + brand. Aspects: magfa-Facebook, nagfa-Facebook, nag-Facebook. Filipinos are among the world\'s heaviest social media users.', 'word', 'Nagfa-Facebook lang ako mamayang gabi.', '"I\'m just on Facebook tonight."', null, [ACT.vocabularyEvening]),
    createContentItem('magpahinga', 'mag-pa-HI-nga', '"To rest". Mag- + pahinga. Used both for resting after work and longer breaks. Aspects: magpapahinga, nagpapahinga, nagpahinga.', 'word', 'Magpapahinga muna ako.', '"I will rest first" — muna = "first / for now".', null, [ACT.vocabularyEvening]),

    createContentItem('palagi', 'pa-LA-gi', '"Always". The strongest frequency adverb. Positioned before or after the verb.', 'sentence', 'Palagi akong kumakain ng kanin.', '"I always eat rice" — kanin (cooked rice) is a Filipino staple.', null, [ACT.grammarFrequency]),
    createContentItem('madalas', 'ma-DA-las', '"Often". Less than palagi, more than minsan. Variant: madalas-dalas (very often).', 'sentence', 'Madalas siyang umuwi ng late.', '"He often goes home late."', null, [ACT.grammarFrequency]),
    createContentItem('minsan', 'min-SAN', '"Sometimes / once". Two meanings depending on context: sometimes (frequency), or once (counting).', 'sentence', 'Minsan, kumakain kami sa mall.', '"Sometimes, we eat at the mall."', null, [ACT.grammarFrequency]),
    createContentItem('bihira', 'bi-HI-ra', '"Rarely". A specific frequency word — less than minsan.', 'sentence', 'Bihira kong makita ang kapatid ko.', '"I rarely see my sibling."', null, [ACT.grammarFrequency]),
    createContentItem('hindi (never with verbs)', 'hin-DI', '"Never (in negative habitual context)". Use hindi + present aspect verb. Filipino does not have a single word for "never"; uses hindi + verb.', 'sentence', 'Hindi ako kumakain ng karne.', '"I don\'t eat meat" / "I never eat meat".', null, [ACT.grammarFrequency]),
    createContentItem('tuwing', 'TU-wing', '"Every / every time". Tuwing + day/time = "every (day/time)". Tuwing Linggo "every Sunday"; tuwing umaga "every morning".', 'sentence', 'Tuwing Linggo, nagsisimba kami.', '"Every Sunday, we attend mass."', null, [ACT.grammarFrequency]),
    createContentItem('araw-araw', 'A-raw-A-raw', '"Every day / daily". Native reduplication: araw "day" repeated. Equivalent to tuwing araw but more emphatic.', 'sentence', 'Araw-araw siyang nag-eehersisyo.', '"He exercises every day."', null, [ACT.grammarFrequency]),

    createContentItem('Pagbasa', 'pag-BA-sa', 'Read: Si Juan ay estudyante sa UP Diliman. Tuwing umaga, gumigising siya ng alas-sais. Naliligo siya, nagbibihis, at nagsisipilyo. Pagkatapos, kumakain siya ng almusal — kanin, itlog, at tuyo. Umaalis siya ng alas-siyete papuntang UP. Pumapasok siya sa unang klase ng alas-otso. Pagkatapos ng klase, nag-aaral siya sa library. Tuwing gabi, umuuwi siya, naghahapunan kasama ang pamilya, at nanonood ng TV. Natutulog siya mga alas-onse.', 'sentence', 'Juan is a UP Diliman student. Every morning, he wakes at 6. He showers, dresses, brushes. Then he eats breakfast — rice, egg, and dried fish. He leaves at 7 to UP. He goes to his first class at 8. After class, he studies at the library. Every night, he goes home, has dinner with the family, and watches TV. He sleeps around 11.', 'Note: aspect markers throughout (imperfective for habitual: gumigising, naliligo); frequency (tuwing umaga, tuwing gabi); meal vocabulary; time with alas-.', null, [ACT.reading]),

    createContentItem('Diyalogo', 'di-YA-lo-go', 'Dialogue: Roommate A: "Kailan ka gumigising?" / B: "Mga alas-sais. Ikaw?" / A: "Alas-siyete ako. Kumakain ka ba ng almusal sa dorm?" / B: "Hindi, sa canteen ng UP ako kumakain. Mas mura." / A: "Mas mura nga. Sige, sa canteen din ako mamaya."', 'sentence', 'A: "When do you wake up?" / B: "Around 6. You?" / A: "I\'m 7. Do you eat breakfast at the dorm?" / B: "No, I eat at the UP canteen. Cheaper." / A: "Cheaper indeed. OK, I\'ll go to the canteen too later."', 'Peer register between roommates; mura = cheap; canteen = UP campus eating area.', null, [ACT.listening]),

    createContentItem('Pagsulat', 'pag-SU-lat', 'Write 6-8 sentences describing your typical school/work day. Required: at least three mag- verbs in different aspects; at least one frequency adverb (palagi, madalas, minsan); at least one tuwing + time.', 'sentence', 'Modelo: Araw-araw, gumigising ako ng alas-sais. Nag-aaral ako sa UP. Tuwing tanghali, kumakain ako sa canteen. Madalas akong umuuwi ng alas-singko. Tuwing gabi, nagbabasa ako bago matulog. Minsan, nanonood ako ng K-drama. Natutulog ako mga alas-onse.', 'Sample: "Every day, I wake at 6. I study at UP. Every noon, I eat at the canteen. I often go home at 5. Every night, I read before sleeping. Sometimes, I watch K-drama. I sleep around 11."', null, [ACT.writing]),

    createContentItem('Filipino daily rhythm', 'FI-li-pi-no DAY-li RI-them', 'Filipinos eat THREE meals plus TWO merienda (snack times) per day: almusal (~7 AM), merienda sa umaga (~10 AM), tanghalian (~12 PM), merienda sa hapon (~3-4 PM), hapunan (~6-7 PM). Coffee or chocolate drink with merienda. Sunday is family/church day; Saturday is errand and laundry day. Siesta (afternoon nap, 1-3 PM) is traditional but rare in urban offices.', 'word', 'Tuwing alas-tres ng hapon, may merienda kami sa opisina.', '"Every 3 PM, we have merienda in the office" — workplace merienda culture is alive in many companies.', [
      { target: 'almusal (~7 AM)', note: 'breakfast — kanin, itlog, tuyo or longanisa typical' },
      { target: 'merienda sa umaga (~10 AM)', note: 'morning snack — pandesal with coffee, or kakanin' },
      { target: 'tanghalian (~12 PM)', note: 'lunch — rice + viand (ulam)' },
      { target: 'merienda sa hapon (~3-4 PM)', note: 'afternoon snack — kakanin, halo-halo, banana cue' },
      { target: 'hapunan (~6-7 PM)', note: 'dinner — family meal, often the biggest of the day' },
    ], [ACT.culture]),

    createContentItem('Gawain', 'ga-WA-in', 'Task: Describe a typical school day to a new roommate at UP. 6-8 turns. Required: morning routine sequence, mid-day activity, evening routine, with at least 3 mag- verbs in 3 aspects and 2 frequency words.', 'sentence', 'Halimbawa: "Tuwing umaga, gumigising ako ng alas-sais. Naliligo ako, nagbibihis, kumakain ng kanin at itlog. Sumasakay ako ng jeep papuntang UP. Pumapasok ako sa klase ng alas-otso. Tanghali, kumakain ako sa canteen. Hapon, nag-aaral ako sa library. Gabi, umuuwi ako, nanonood ng TV, at natutulog ng alas-onse."', '"Every morning, I wake at 6. I shower, dress, eat rice and eggs. I ride a jeep to UP. I enter class at 8. Noon, I eat at the canteen. Afternoon, I study at the library. Night, I go home, watch TV, sleep at 11."', null, [ACT.task]),
  ],
};

module.exports = lesson;
