// Level 1 Unit 4 — Daily Routines (Turkish)
// Functions: describing daily activities, telling time, present continuous -yor,
// frequency adverbs, basic verb conjugation for ben/sen/o/biz/siz/onlar.

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
  orientation: 'tr-l1u4-orientation',
  pronunciation: 'tr-l1u4-pronunciation',
  vocabularyVerbs: 'tr-l1u4-vocab-verbs',
  vocabularyTime: 'tr-l1u4-vocab-time',
  grammarYor: 'tr-l1u4-grammar-yor',
  grammarPersonEndings: 'tr-l1u4-grammar-person-endings',
  grammarFrequency: 'tr-l1u4-grammar-frequency',
  reading: 'tr-l1u4-reading',
  listening: 'tr-l1u4-listening',
  writing: 'tr-l1u4-writing',
  culture: 'tr-l1u4-culture',
  task: 'tr-l1u4-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Describe your daily routine using 15+ verbs in the present continuous -(I)yor.', 'Tell time on the hour and half hour: saat sekiz (8:00), saat sekiz buçuk (8:30).', 'Use frequency adverbs (her gün, genellikle, bazen, asla) to add nuance.'], task: 'Walk through your typical day at Boğaziçi from morning to night — wake up, breakfast, classes, study, dinner, sleep — all in continuous-tense Turkish.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in -yor and verb stems', goals: ['Apply the four-way -yor vowel: kalkıyor (back-unrounded), geliyor (front-unrounded), okuyor (back-rounded), gülüyor (front-rounded).', 'Recognize that -yor is itself UNSTRESSABLE — stress moves to the syllable BEFORE -yor: KALKıyor, GELiyor.', 'Handle vowel deletion in some stems: ne yapıyorsun? → "yapıyorsun" or in fast speech "yapıyon".'], task: 'Read 10 -yor verbs aloud with the right pre-yor stress and harmony.' },
  { id: ACT.vocabularyVerbs, section: 'Vocabulary I', title: 'Daily routine verbs', goals: ['Memorize 20 routine verbs in their infinitive (-mek/-mak) form: kalkmak, uyumak, yemek, içmek, gitmek, dönmek, çalışmak, dinlemek, izlemek, yıkanmak, okumak, yazmak…', 'Recognize the two infinitive endings: -mek (after front vowels) and -mak (after back vowels).'], task: 'Pair 20 verbs with their typical daily-time slot.' },
  { id: ACT.vocabularyTime, section: 'Vocabulary II', title: 'Telling time', goals: ['Tell hours: Saat kaç? — Saat sekiz. (8:00); use the locative for "at": saat sekizde.', 'Tell half hours: Saat sekiz buçuk. (8:30) and quarter: çeyrek (quarter past/to).', 'Use morning/evening adverbs: sabah, öğleden önce, öğleden sonra, akşam, gece.'], task: 'Say 8 times of day at which you do specific activities.' },
  { id: ACT.grammarYor, section: 'Grammar I', title: 'The present continuous -(I)yor', goals: ['Form the present continuous: VERB STEM + (I)yor + PERSON. Example: gel-iyor-um (I am coming), kalk-ıyor-sun (you are getting up).', 'Apply vowel mutation: vowel-final stems lose the final vowel: bekle- + iyor → bekliyor (not bekleiyor).', 'Know that -yor is the all-purpose "now" AND habitual present in Turkish — covers both English "I am eating" and "I eat (every day)".'], task: 'Conjugate 10 verbs in -yor for all 6 persons.' },
  { id: ACT.grammarPersonEndings, section: 'Grammar II', title: 'Person endings on verbs', goals: ['Apply the personal suffixes after -yor: -um (I), -sun (you), zero (he/she/it), -uz (we), -sunuz (you-PL/formal), -lar (they). Note these are slightly different from the copula suffixes.', 'Convert statement to question: stem + iyor + person + mu/mı/mü (back-rounded after -yor because of "o"): "geliyor musun?" (Are you coming?).'], task: 'Build 12 questions in -yor + mu? for all 6 persons.' },
  { id: ACT.grammarFrequency, section: 'Grammar III', title: 'Frequency adverbs', goals: ['Use her gün (every day), genellikle (usually), bazen (sometimes), nadiren (rarely), asla / hiç (never) — placed before the verb.', 'Use günde X kere / haftada X kere / ayda X kere — temporal-rate expressions.'], task: 'Add a frequency adverb to 8 daily-routine sentences.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'A student\'s day at Boğaziçi', goals: ['Read a typical day description aloud with correct stress and -yor harmony.', 'Answer four questions about times and activities.'], task: 'Read aloud, then summarize the routine in your own words.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'Comparing morning routines', goals: ['Follow a 4-turn dialogue between two students comparing morning routines.', 'Reproduce with your own routine.'], task: 'Roleplay the dialogue with substitutions.' },
  { id: ACT.writing, section: 'Writing', title: 'Write your daily routine', goals: ['Write 6–8 sentences describing your typical day from kalkıyorum to uyuyorum.', 'Use at least 8 different verbs in -yor and 3 frequency adverbs.'], task: 'Write the routine, then read aloud with correct stress.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Turkish daily rhythm: çay, simit, ezan', goals: ['Recognize the central role of çay (tea) in Turkish daily life — drunk from tulip glasses, multiple times a day, with virtually every social interaction.', 'Know the ezan (call to prayer) marks five times daily across cities — sabah (dawn), öğle (noon), ikindi (afternoon), akşam (evening), yatsı (night).', 'Understand the late dinner culture: most Turks eat akşam yemeği around 19:00–20:30, much later than Northern European norms.'], task: 'Describe how çay fits into a Turk\'s typical day at three different times.' },
  { id: ACT.task, section: 'Task', title: 'A day at Boğaziçi', goals: ['Roleplay describing your day at Boğaziçi to an AI tutor playing a curious aunt visiting from Anatolia.', 'Use morning, midday, evening segments with appropriate verbs and times.'], task: 'Run an 8-turn day-walkthrough dialogue.' },
];

const lesson = {
  title: 'Level 1 · Unit 4: Günlük Rutin — Daily Routines',
  category: 'daily-routines',
  difficulty: 'beginner',
  targetLang: 'tr',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-routine', label: 'Describing routine', goal: 'Use -yor to describe what you do daily.' },
    { id: 'telling-time', label: 'Telling time', goal: 'Say the time and "at what time" using saat + LOC.' },
    { id: 'frequency', label: 'Adding frequency', goal: 'Use her gün, bazen, genellikle, asla.' },
  ],
  relatedPools: ['topic-routine', 'topic-time'],
  content: [
    // Verbs
    createContentItem('kalkmak', 'kalk-MAK', 'To get up / wake up. Stem: kalk-. Back-unrounded; -yor → kalkıyor. Daily morning verb.', 'word', 'Sabah saat yedide kalkıyorum.', '"In the morning I get up at 7:00."', null, [ACT.vocabularyVerbs]),
    createContentItem('uyumak', 'u-yu-MAK', 'To sleep. Stem: uyu-. Vowel-final → uyu- + yor with deletion → uyuyor.', 'word', 'Geceleri yedi saat uyuyorum.', '"I sleep 7 hours a night."', null, [ACT.vocabularyVerbs]),
    createContentItem('uyanmak', 'u-yan-MAK', 'To wake up (reflexive sense). Stem: uyan-. Distinct from kalkmak: uyanmak = waking up (eyes open), kalkmak = getting out of bed.', 'word', 'Sabah erken uyanıyorum ama geç kalkıyorum.', '"I wake up early in the morning but get up late."', null, [ACT.vocabularyVerbs]),
    createContentItem('yemek (yemek yemek)', 'ye-MEK', 'Two meanings: NOUN "food/meal" AND VERB "to eat" (yemek yemek = "to eat food"). Stem: ye-. Front-unrounded.', 'word', 'Kahvaltıda ekmek ve peynir yiyorum.', '"For breakfast I eat bread and cheese."', null, [ACT.vocabularyVerbs]),
    createContentItem('içmek', 'ich-MEK', 'To drink. Stem: iç-. Note ç softens to c before vowel: içiyor? Actually iç- + iyor → içiyor (no softening here because suffix is consonant-initial). For accusative içiyorum.', 'word', 'Sabah çay içiyorum.', '"I drink tea in the morning."', null, [ACT.vocabularyVerbs]),
    createContentItem('gitmek', 'git-MEK', 'To go. Stem: git-. IRREGULAR: t softens to d before vowel: git-iyor → gidiyor. Same in past: gitti, future: gidecek.', 'word', 'Okula otobüsle gidiyorum.', '"I go to school by bus."', null, [ACT.vocabularyVerbs]),
    createContentItem('gelmek', 'gel-MEK', 'To come. Stem: gel-. Front-unrounded → gel-iyor.', 'word', 'Akşam eve geliyorum.', '"In the evening I come home."', null, [ACT.vocabularyVerbs]),
    createContentItem('dönmek', 'dön-MEK', 'To return / turn. Front-rounded → dön-üyor.', 'word', 'Saat altıda eve dönüyorum.', '"I return home at six."', null, [ACT.vocabularyVerbs]),
    createContentItem('çalışmak', 'cha-lısh-MAK', 'To work / to study (often used for both). Back-unrounded → çalış-ıyor.', 'word', 'Kütüphanede çalışıyorum.', '"I am studying at the library."', null, [ACT.vocabularyVerbs]),
    createContentItem('okumak', 'o-ku-MAK', 'To read / to attend school. Same word for both! "Üniversite okuyorum" = "I am at university." Back-rounded → okuyor.', 'word', 'Roman okuyorum.', '"I am reading a novel."', null, [ACT.vocabularyVerbs]),
    createContentItem('yazmak', 'yaz-MAK', 'To write. Back-unrounded → yazıyor.', 'word', 'Defterime not yazıyorum.', '"I am writing notes in my notebook."', null, [ACT.vocabularyVerbs]),
    createContentItem('dinlemek', 'din-le-MEK', 'To listen (+ACC for "listen to X"). Vowel-final stem → dinle- + iyor → dinliyor (vowel deletion).', 'word', 'Müzik dinliyorum.', '"I am listening to music."', null, [ACT.vocabularyVerbs]),
    createContentItem('izlemek', 'iz-le-MEK', 'To watch (+ACC). Stem izle- → izliyor.', 'word', 'Akşam dizi izliyorum.', '"In the evening I watch a series."', null, [ACT.vocabularyVerbs]),
    createContentItem('konuşmak', 'ko-nush-MAK', 'To speak / talk. Back-rounded → konuş-uyor.', 'word', 'Telefonda konuşuyorum.', '"I am talking on the phone."', null, [ACT.vocabularyVerbs]),
    createContentItem('yıkanmak', 'yı-kan-MAK', 'To wash oneself / shower. Reflexive (-n- middle). yıkanıyor.', 'word', 'Sabahları duşa giriyorum, sonra yıkanıyorum.', '"In the mornings I get in the shower, then I wash."', null, [ACT.vocabularyVerbs]),
    createContentItem('koşmak', 'kosh-MAK', 'To run. Back-rounded → koş-uyor.', 'word', 'Her sabah koşuyorum.', '"I run every morning."', null, [ACT.vocabularyVerbs]),
    createContentItem('yürümek', 'yü-rü-MEK', 'To walk. Front-rounded → yürü-yor (vowel deletion).', 'word', 'Üniversiteye yürüyorum.', '"I walk to the university."', null, [ACT.vocabularyVerbs]),
    createContentItem('beklemek', 'bek-le-MEK', 'To wait. Vowel-final → bekle- + iyor → bekliyor.', 'word', 'Otobüs bekliyorum.', '"I am waiting for the bus."', null, [ACT.vocabularyVerbs]),
    createContentItem('görüşmek', 'gö-rüsh-MEK', 'To meet / see each other (-ş- reciprocal). Front-rounded → görüş-üyor. Used in farewells: "görüşürüz".', 'word', 'Arkadaşlarımla görüşüyorum.', '"I meet with my friends."', null, [ACT.vocabularyVerbs]),
    createContentItem('ders çalışmak', 'DERS cha-lısh-MAK', 'To study (lessons). Compound: ders (lesson) + çalışmak (to work). The general "I am studying" verb.', 'word', 'Akşam üç saat ders çalışıyorum.', '"In the evening I study for 3 hours."', null, [ACT.vocabularyVerbs]),

    // Time
    createContentItem('saat', 'sa-AT', 'Hour / time / clock. Used for both "What time?" (Saat kaç?) and "X o\'clock" (Saat sekiz).', 'word', 'Saat kaç? — Saat dokuz.', '"What time is it? — It\'s nine."', null, [ACT.vocabularyTime]),
    createContentItem('saat sekiz', 'sa-AT se-KİZ', 'Eight o\'clock. Pattern: "Saat" + NUMBER. For "at eight" use LOC: saat sekizde.', 'word', 'Saat sekizde dersim var.', '"I have class at 8:00."', null, [ACT.vocabularyTime]),
    createContentItem('buçuk', 'bu-CHUK', 'Half (in time expressions). "Saat sekiz buçuk" = 8:30 (eight and a half).', 'word', 'Saat dokuz buçukta kalkıyorum.', '"I get up at 9:30." — LOC -ta after voiceless k.', null, [ACT.vocabularyTime]),
    createContentItem('çeyrek', 'chey-REK', 'Quarter (15 min). "Saat dokuza çeyrek var" = quarter to 9; "Saat dokuzu çeyrek geçiyor" = quarter past 9.', 'word', 'Sekize çeyrek var.', '"It\'s quarter to 8."', null, [ACT.vocabularyTime]),
    createContentItem('sabah', 'sa-BAH', 'Morning. Used adverbially without case: "Sabah kahvaltı yapıyorum" (In the morning I have breakfast). Word-final h is fully pronounced.', 'word', 'Sabah saat yedide kalkıyorum.', '"In the morning I get up at 7:00."', null, [ACT.vocabularyTime]),
    createContentItem('öğle / öğleden sonra', 'öy-LE / öy-le-den son-RA', 'Noon / afternoon (literally "after noon"). Note öğle = noon; öğleden = noon-ABL; sonra = after.', 'word', 'Öğleden sonra arkadaşımla buluşuyorum.', '"In the afternoon I meet with my friend."', null, [ACT.vocabularyTime]),
    createContentItem('akşam', 'ak-SHAM', 'Evening. Plural form akşamlar appears in greeting "İyi akşamlar".', 'word', 'Akşam yemeği yedide.', '"Dinner is at seven."', null, [ACT.vocabularyTime]),
    createContentItem('gece', 'ge-JE', 'Night. Vowel-final → -ye DAT, -de LOC.', 'word', 'Geceleri erken yatıyorum.', '"At night I go to bed early."', null, [ACT.vocabularyTime]),

    // -yor
    createContentItem('-(I)yor', '-yor', 'The present continuous suffix. Four shapes by harmony of the high vowel I: -ıyor (back-unr), -iyor (front-unr), -uyor (back-rd), -üyor (front-rd). Then personal ending.', 'sentence', 'kalk-ıyor-um (I am getting up), gel-iyor-sun (you are coming), oku-yor (he/she is reading; vowel deletion), gül-üyor (he/she is laughing)', 'The all-purpose present in Turkish, covering both "I am X-ing" and "I X (habitually)".', [{ target: 'ı after a/ı', note: 'kalk-ıyor, alıyor (alı-yor), bakı-yor' }, { target: 'i after e/i', note: 'gel-iyor, dinli-yor (vowel deletion), bili-yor' }, { target: 'u after o/u', note: 'oku-yor, kork-uyor, soruyor' }, { target: 'ü after ö/ü', note: 'gör-üyor, gül-üyor' }], [ACT.grammarYor]),
    createContentItem('Ünlü düşmesi', 'vowel deletion', 'When -yor follows a stem ending in a vowel, the FINAL stem vowel drops: bekle- + iyor → bekliyor; oku- + yor → okuyor (the u stays because -yor begins with y, not vowel); dinle- + iyor → dinliyor.', 'sentence', 'bekle (wait) → bekliyor (not beklei-yor)\ndinle (listen) → dinliyor\nizle (watch) → izliyor', 'The most common phonological mutation in verb conjugation; nearly all -e/-a final stems lose their final vowel.', null, [ACT.grammarYor]),
    createContentItem('-yor vurgu kuralı', '-yor stress rule', 'The -yor suffix is UNSTRESSABLE. Stress falls on the syllable IMMEDIATELY BEFORE -yor: KALKıyor (not kalkıyOR), GELiyor.', 'sentence', 'KALK-ıyor-um (I am getting up) — stress on KALK\nGEL-iyor-sun (you are coming) — stress on GEL', 'Distinguishes -yor from default final-syllable stress.', null, [ACT.grammarYor]),

    // Person endings
    createContentItem(
      '-yor + kişi ekleri',
      '-yor + person endings',
      'After -yor (which ends in -or, back-rounded), the personal endings are: -um, -sun, ZERO, -uz, -sunuz, -lar. Different harmony from the copula because -yor fixes the back-rounded environment.',
      'sentence',
      'BEN: geliyorum (I am coming)\nSEN: geliyorsun (you are coming)\nO: geliyor (he/she is coming)\nBİZ: geliyoruz (we are coming)\nSİZ: geliyorsunuz (you are coming, formal/PL)\nONLAR: geliyorlar (they are coming)',
      'The 3rd person singular has NO suffix — bare verb stem + -yor.',
      [
        { target: '-um (I)', note: 'after -yor; always back-rounded due to "o" in yor' },
        { target: '-sun (you-sg)', note: 'casual 2nd-person' },
        { target: '(zero) (he/she/it)', note: 'no suffix for 3rd-sg' },
        { target: '-uz (we)', note: '1st-plural' },
        { target: '-sunuz (you-PL/formal)', note: 'formal or plural 2nd-person' },
        { target: '-lar (they)', note: '3rd-plural, often optional in spoken' },
      ],
      [ACT.grammarPersonEndings],
    ),
    createContentItem(
      'Soru: -yor + mu?',
      'question with -yor + mu?',
      'Form a yes/no question: stem + iyor + (person) + mu (with appropriate harmony — after -yor always -mu because of back-rounded "o"). Question particle stands alone after the verb.',
      'sentence',
      'Geliyor musun? (Are you coming?)\nÇalışıyor muyuz? (Are we working?)\nUyuyor mu? (Is he/she sleeping?)',
      'Note: with 1st/2nd person, the person ending goes ON the particle: "geliyor mu-sun" → "geliyor musun".',
      [
        { target: 'BEN soru: geliyor muyum?', note: 'particle + buffer y + person' },
        { target: 'SEN soru: geliyor musun?', note: 'particle + person -sun' },
        { target: 'O soru: geliyor mu?', note: 'plain particle' },
      ],
      [ACT.grammarPersonEndings],
    ),
    createContentItem(
      'Olumsuzluk -mE-',
      'verbal negation -mE-',
      'Negate a verb by inserting -mE- (-me- after front, -ma- after back) BETWEEN stem and -yor. The combined ending becomes -mıyor, -miyor, -muyor, -müyor (note the vowel deletion).',
      'sentence',
      'gel-mi-yor-um (gelmiyorum, I am not coming)\nçalış-mı-yor (çalışmıyor, he/she is not working)\noku-mu-yor (okumuyor, he/she is not reading)\ngör-mü-yor (görmüyor, he/she is not seeing)',
      'The negation suffix attracts the -yor vowel into a single fused form.',
      null,
      [ACT.grammarPersonEndings],
    ),

    // Frequency
    createContentItem('her gün', 'her GÜN', 'Every day. Adverbial without case. her = every, every+noun is a high-frequency frame.', 'word', 'Her gün kahvaltı yapıyorum.', '"Every day I have breakfast."', null, [ACT.grammarFrequency]),
    createContentItem('genellikle', 'ge-nel-LİK-le', 'Usually / generally. Adverb. Goes before the verb.', 'word', 'Genellikle saat sekizde dersim olur.', '"I usually have class at 8:00."', null, [ACT.grammarFrequency]),
    createContentItem('bazen', 'BA-zen', 'Sometimes. Place before verb.', 'word', 'Bazen kafeye gidiyorum.', '"Sometimes I go to the café."', null, [ACT.grammarFrequency]),
    createContentItem('nadiren', 'na-Dİ-ren', 'Rarely. Place before verb.', 'word', 'Nadiren sinemaya gidiyorum.', '"I rarely go to the cinema."', null, [ACT.grammarFrequency]),
    createContentItem('asla / hiç', 'as-LA / HİCH', 'Never. Used with NEGATIVE verb: "Asla içmiyorum" = "I never drink (it)". hiç can also mean "ever" or "any" in different contexts.', 'word', 'Asla geç kalmıyorum.', '"I am never late." — note negative verb required.', null, [ACT.grammarFrequency]),
    createContentItem('haftada üç kere', 'haf-ta-da üch KE-re', 'Three times a week. Pattern: TIME-UNIT-LOC + NUMBER + kere/kez (times).', 'word', 'Haftada üç kere spor yapıyorum.', '"I exercise three times a week."', null, [ACT.grammarFrequency]),

    // Reading
    createContentItem('Boğaziçi\'nde bir gün', 'a day at Boğaziçi', 'A typical-day paragraph for a Boğaziçi student.', 'paragraph', 'Sabah saat yedi buçukta kalkıyorum. Önce duşa giriyorum, sonra kahvaltı yapıyorum — peynir, zeytin, ekmek ve çay. Saat dokuzda otobüsle Boğaziçi\'ne gidiyorum. Üç dersim var. Öğle yemeğinde kantinde arkadaşlarımla buluşuyorum. Öğleden sonra kütüphanede ders çalışıyorum. Akşam altıda eve dönüyorum, yemek yapıyorum, biraz dizi izliyorum. Saat on bir buçukta yatıyorum.', 'Translation: "I get up at 7:30 in the morning. First I take a shower, then I have breakfast — cheese, olives, bread, and tea. At 9:00 I go to Boğaziçi by bus. I have three classes. For lunch I meet my friends at the canteen. In the afternoon I study at the library. At 6:00 in the evening I return home, cook dinner, and watch some TV series. I go to bed at 11:30."', [{ target: 'duşa giriyorum', note: '"I get in the shower" — dative + intransitive verb' }, { target: 'peynir, zeytin, ekmek ve çay', note: 'iconic Turkish breakfast spread' }, { target: 'kantinde', note: 'cafeteria; university food hall' }, { target: 'ders çalışıyorum', note: 'standard "studying" verb' }, { target: 'yatmak', note: 'to go to bed; back-unrounded → yatıyorum' }], [ACT.reading]),
    createContentItem('Sorular', 'questions', 'Comprehension questions about the routine.', 'sentence', 'Q1: Saat kaçta kalkıyor? Q2: Kahvaltıda ne yiyor? Q3: Öğleden sonra ne yapıyor? Q4: Saat kaçta yatıyor?', 'Practice question/answer pattern with -yor.', null, [ACT.reading]),

    // Listening
    createContentItem('Sabah rutinleri', 'morning routines', 'Two students compare their morning routines.', 'conversation', 'A: Sen sabah saat kaçta kalkıyorsun?\nB: Genellikle yedi buçukta. Sen?\nA: Ben çok erken kalkıyorum — altıda. Önce koşuya çıkıyorum.\nB: Vay, çok zorlu! Ben kahvaltıdan önce sadece çay içiyorum.\nA: Kahvaltıda ne yiyorsun?\nB: Genellikle simit ve peynir.', 'Natural comparing routine; uses sen/sen contrast.', [{ target: 'koşuya çıkıyorum', note: '"I go out for a run" — koşu (running) + DAT + çıkmak (to go out)' }, { target: 'zorlu', note: 'tough; common reaction word' }, { target: 'simit ve peynir', note: 'classic Turkish breakfast: sesame bagel + white cheese' }], [ACT.listening]),

    // Writing
    createContentItem('Günlük rutin yazısı', 'daily routine writing', 'Template for a 7-sentence routine description.', 'sentence', '1. Sabah saat ___\'de kalkıyorum. 2. Önce ___ yapıyorum. 3. Saat ___\'de okula/işe gidiyorum. 4. Öğle yemeğinde ___ yiyorum. 5. Öğleden sonra ___ yapıyorum. 6. Akşam ___ izliyorum/yapıyorum. 7. Saat ___\'de yatıyorum.', 'Fill in 7 time/activity slots.', null, [ACT.writing]),

    // Culture
    createContentItem('Çay kültürü', 'çay culture', 'Turkish çay (tea) is drunk multiple times a day from small tulip-shaped glasses (ince belli bardak). Brewed strong in a double-stack pot (çaydanlık) and diluted at serving. Drunk plain, sometimes with sugar, never with milk. Çay is the universal hospitality gesture: any visit, any meeting, opens with "Çay içer misiniz?"', 'sentence', 'Sabahları, ikindide, akşam yemeğinden sonra — gün boyunca çay içeriz.', 'Turkey has the world\'s highest per-capita tea consumption.', [{ target: 'ince belli bardak', note: 'tulip glass — the only correct çay vessel' }, { target: 'çaydanlık', note: 'double-stack tea pot; bottom water, top concentrated brew' }, { target: 'açık / koyu', note: 'light / dark — choose the strength when ordered' }], [ACT.culture]),
    createContentItem('Ezan', 'ezan (call to prayer)', 'The Islamic call to prayer (ezan) is broadcast from minarets across Turkey five times daily — sabah (dawn), öğle (noon), ikindi (mid-afternoon), akşam (sunset), yatsı (night). Even secular Turks use the ezan times as informal day markers. Boğaziçi area: the Bebek Camii ezan is part of the campus soundscape.', 'sentence', 'Akşam ezanından önce eve geleyim.', 'Religious or not, ezan is a daily-life timer.', null, [ACT.culture]),
    createContentItem('Geç akşam yemeği', 'late dinner', 'Turkish akşam yemeği is typically eaten 19:00–20:30 — later than Northern Europe, similar to Mediterranean Europe. Often the largest meal, eaten as a family. Common framework: çorba (soup) + ana yemek (main) + salata + meyve + çay.', 'sentence', 'Akşam yemeği saat sekizde, ailecek yiyoruz.', 'A communal evening anchor — "yemek vakti" (mealtime) is sacred family time.', null, [ACT.culture]),

    // Task
    createContentItem('Görev: hala teyzeye günlük rutin anlatımı', 'task: explain your routine to a curious aunt', 'Roleplay an 8-turn dialogue with the AI tutor as your visiting aunt from Anatolia. Walk her through your typical Boğaziçi day, segment by segment.', 'conversation', 'Hala: Eee, anlat bakalım, günlerin nasıl geçiyor?\nSen: [sabah rutini]\nHala: Kahvaltıda ne yiyorsun?\nSen: [kahvaltı]\nHala: Dersler nasıl?\nSen: [dersler]\nHala: Akşamları ne yapıyorsun?\nSen: [akşam]\n... (8 turns total)', 'Use -yor throughout, with frequency adverbs and time expressions.', null, [ACT.task]),
  ],
};

module.exports = lesson;
