// Level 1 Unit 4 — Daily Routines (Bahasa Indonesia)
// Functions: telling time, describing daily activities, using aspect particles
// sudah / sedang / akan / belum, and the time vocabulary for organizing a day.

const createContentItem = (target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization, nativeText: note, pronunciation: romanization,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'id-l1u4-orientation',
  pronunciation: 'id-l1u4-pronunciation',
  vocabularyTime: 'id-l1u4-vocab-time',
  vocabularyActivities: 'id-l1u4-vocab-activities',
  grammarAspect: 'id-l1u4-grammar-aspect',
  grammarSequence: 'id-l1u4-grammar-sequence',
  grammarFrequency: 'id-l1u4-grammar-frequency',
  reading: 'id-l1u4-reading',
  listening: 'id-l1u4-listening',
  writing: 'id-l1u4-writing',
  culture: 'id-l1u4-culture',
  task: 'id-l1u4-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: [
    'Tell the time in Indonesian using jam + number with am/pm distinction (pagi, siang, sore, malam).',
    'Describe your daily routine using 15+ activity verbs (bangun, mandi, sarapan, kuliah, pulang, tidur) anchored to specific times.',
    'Use the four core aspect particles: sudah (already, completed), sedang (currently doing), akan (will, future), belum (not yet, open).',
  ], task: 'Picture a typical Tuesday at UI. By the end of this unit you describe your full day from bangun pagi to tidur malam with correct aspect marking.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in time and routine vocabulary', goals: [
    'Pronounce "sudah" /sudah/ with light /h/ — in casual speech often drops to /suda/.',
    'Apply the schwa rule to "sedang" /sədang/ — first vowel is schwa, second is full /a/, ng = /ŋ/.',
    'Distinguish "jam" /dʒam/ (hour/clock) from "siang" /siaŋ/ (midday) — completely different syllable structures.',
  ], task: 'Read 15 time and routine words; identify schwas and final nasal endings.' },
  { id: ACT.vocabularyTime, section: 'Vocabulary I', title: 'Time vocabulary', goals: [
    'Master the four times-of-day: pagi (morning, 5-10), siang (midday, 10-3), sore (afternoon, 3-6), malam (evening/night, 6+).',
    'Master the hour-and-minute system: jam delapan pagi, jam setengah dua siang, jam tujuh kurang sepuluh.',
  ], task: 'State 8 clock times across the four periods of the day.' },
  { id: ACT.vocabularyActivities, section: 'Vocabulary II', title: 'Daily activity verbs', goals: [
    'Memorize 15 routine verbs: bangun, mandi, sarapan, gosok gigi, kuliah, makan siang, pulang, istirahat, olahraga, masak, makan malam, mengerjakan PR, mandi (sore), nonton TV, tidur.',
  ], task: 'Sequence 10 of these verbs into a typical UI student\'s weekday.' },
  { id: ACT.grammarAspect, section: 'Grammar I', title: 'Aspect particles — sudah / sedang / akan / belum', goals: [
    'Use sudah for completed actions: "Saya sudah makan" (I have already eaten).',
    'Use sedang for ongoing actions: "Saya sedang belajar" (I am studying now).',
    'Use akan for future actions: "Saya akan tidur" (I will sleep).',
    'Use belum for "not yet" — open to future completion: "Saya belum makan" (I haven\'t eaten yet).',
  ], task: 'Convert 8 English tense sentences (past, progressive, future, negative) into Indonesian using the right particle.' },
  { id: ACT.grammarSequence, section: 'Grammar II', title: 'Sequence markers — lalu / kemudian / setelah itu', goals: [
    'Use lalu (then), kemudian (then, slightly formal), setelah itu (after that) to chain activities.',
    'Use dulu (first, before X), kemudian (after) for two-step sequences.',
  ], task: 'Write a 5-step daily routine using at least three sequence markers.' },
  { id: ACT.grammarFrequency, section: 'Grammar III', title: 'Frequency adverbs', goals: [
    'Use setiap hari (every day), kadang-kadang (sometimes), sering (often), jarang (rarely), tidak pernah (never).',
  ], task: 'Describe 5 weekly activities with frequency adverbs.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'A UI student\'s Tuesday', goals: [
    'Read a 7-sentence paragraph describing a UI student\'s typical Tuesday.',
    'Answer comprehension questions about what happens when.',
  ], task: 'Read aloud and answer.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'Two friends compare schedules', goals: [
    'Follow a 6-turn dialogue where two students at UI compare their daily schedules.',
  ], task: 'Read along and switch roles.' },
  { id: ACT.writing, section: 'Writing', title: 'Write your weekday', goals: [
    'Write 6-8 sentences describing your typical weekday in Indonesian.',
    'Use at least three aspect particles and two sequence markers.',
  ], task: 'Write and read aloud.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Sahur, buka puasa, and the Indonesian rhythm of the day', goals: [
    'Understand how Ramadan (puasa) reshapes the daily schedule for Muslim Indonesians: pre-dawn sahur, daytime fast, sundown iftar (buka puasa).',
    'Recognize the five daily prayers (subuh, zuhur, asar, magrib, isya) as natural time-markers used even by non-praying Indonesians.',
  ], task: 'Map the five prayer times to clock times in Depok and compare with your routine.' },
  { id: ACT.task, section: 'Task', title: 'Describe your day to a friend', goals: [
    'Roleplay a phone call where you describe your full Tuesday in Indonesian.',
  ], task: 'Roleplay with the AI tutor.' },
];

const lesson = {
  title: 'Level 1 · Unit 4: Sehari-hari — Daily Routines',
  category: 'daily-routines',
  difficulty: 'beginner',
  targetLang: 'id',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'telling-time', label: 'Telling time', goal: 'State and ask the time with jam + period of day.' },
    { id: 'describing-routine', label: 'Routine description', goal: 'Sequence daily activities with aspect markers.' },
    { id: 'frequency', label: 'Frequency', goal: 'Use setiap/sering/jarang to describe how often.' },
  ],
  relatedPools: ['topic-time', 'topic-daily-life'],
  content: [
    createContentItem('Tujuan unit', 'tu-juan u-nit', 'By the end you describe your full UI weekday in Indonesian using time vocabulary and aspect particles correctly.', 'word', 'Saya bisa menceritakan rutinitas harian saya.', 'Unit competency statement.', null, [ACT.orientation]),
    createContentItem('Skenario: hari Selasa di UI', 'skə-na-rio: ha-ri sə-la-sa', 'You are a UI mahasiswa with a typical Tuesday: 6am bangun, 7:30 kuliah pertama, lunch at kantin Fasilkom, evening PR (homework), tidur at 11.', 'word', 'Hari Selasa selalu padat.', 'Tuesday is always packed.', null, [ACT.orientation]),

    createContentItem('jam', 'dʒam', 'Hour / o\'clock. Used before the number: "jam delapan" (eight o\'clock). The /dʒ/ at the start is the Indonesian j; /am/ has full vowel + final /m/.', 'word', 'Sekarang jam berapa? — Jam sepuluh pagi.', 'Standard time question and answer.', null, [ACT.pronunciation]),
    createContentItem('sudah', 'su-dah', 'Aspect particle "already". The /h/ is soft, often barely audible. In Jakarta casual speech often shortened to "udah" or "dah".', 'word', 'Sudah makan? — Sudah.', '"Already eaten? — Already" — the most exchanged Indonesian question of all.', null, [ACT.pronunciation]),
    createContentItem('sedang', 'sə-dang', 'Aspect particle "currently doing". Schwa first syllable, full /a/ + /ŋ/ ending. Casual short form: "lagi" — "Saya lagi makan" = "I\'m eating right now".', 'word', 'Saya sedang belajar.', 'I am studying now.', null, [ACT.pronunciation]),
    createContentItem('akan', 'a-kan', 'Future particle "will". Two clean /a/ vowels. Casual: "bakal" or "mau" can substitute.', 'word', 'Saya akan pulang nanti.', 'I will go home later.', null, [ACT.pronunciation]),
    createContentItem('belum', 'bə-lum', '"Not yet". Schwa first syllable, full /u/ ending. The pair sudah/belum is the most fundamental aspect contrast in Indonesian.', 'word', 'Sudah makan? — Belum.', '"Already eaten? — Not yet" — completes the sudah/belum pair.', null, [ACT.pronunciation]),

    createContentItem('pagi', 'pa-gi', 'Morning (5am-10am). The fresh, cool part of the Indonesian day before the heat builds. Greeting: "Selamat pagi". Activities: bangun, sarapan, kuliah pertama.', 'word', 'Saya sarapan jam tujuh pagi.', 'I breakfast at 7 in the morning.', null, [ACT.vocabularyTime]),
    createContentItem('siang', 'si-aŋ', 'Midday (10am-3pm). The hottest part of the day in Indonesia; activities slow. Greeting: "Selamat siang". The ng = single /ŋ/.', 'word', 'Makan siang jam dua belas.', 'Lunch at 12.', null, [ACT.vocabularyTime]),
    createContentItem('sore', 'so-re', 'Late afternoon (3pm-6pm). Cooler, social hour. Greeting: "Selamat sore". Both syllables /o/ and /e/ are full, NOT schwas.', 'word', 'Olahraga jam empat sore.', 'Exercise at 4 in the afternoon.', null, [ACT.vocabularyTime]),
    createContentItem('malam', 'ma-lam', 'Night (6pm onwards). Greeting: "Selamat malam". After magrib prayer the social/family time begins; dinner and TV.', 'word', 'Tidur jam sebelas malam.', 'Sleep at 11pm.', null, [ACT.vocabularyTime]),
    createContentItem('jam setengah', 'dʒam sə-tə-ngah', 'Half past — but Indonesian counts FORWARD to the next hour, not backward. "Jam setengah delapan" = literally "half eight" = 7:30 (halfway to 8). This is the OPPOSITE of English. Mistake-prone for English speakers.', 'word', 'Kelas mulai jam setengah sembilan pagi.', 'Class starts at 8:30am. Setengah sembilan = "halfway to nine" = 8:30.', null, [ACT.vocabularyTime]),
    createContentItem('kurang', 'ku-rang', '"Less / minus" — used for clock times before the hour. "Jam sepuluh kurang lima" = ten minus five = 9:55. Alternative to setengah for non-half times. ng = /ŋ/.', 'word', 'Bertemu jam sembilan kurang sepuluh.', 'Meet at 8:50 (nine minus ten).', null, [ACT.vocabularyTime]),
    createContentItem('lewat', 'le-wat', '"Past, after" — for clock times after the hour. "Jam delapan lewat lima belas" = 8:15. Counterpart to kurang.', 'word', 'Pulang jam tiga lewat tiga puluh.', 'Going home at 3:30 (three past thirty).', null, [ACT.vocabularyTime]),
    createContentItem('tepat', 'tə-pat', 'Exactly, precisely (on the dot). "Jam delapan tepat" = exactly 8 o\'clock. Common in invitation contexts: "Datang tepat waktu" (come on time).', 'word', 'Mulai jam tujuh tepat, ya.', 'Start exactly at 7, ok?', null, [ACT.vocabularyTime]),

    createContentItem('bangun', 'ba-ngun', 'To wake up (intransitive). The ng = /ŋ/. "Saya bangun jam enam" — bare verb without affix is standard. Active variant: "membangunkan" (to wake someone else up).', 'word', 'Saya biasanya bangun jam lima.', 'I usually wake up at 5.', null, [ACT.vocabularyActivities]),
    createContentItem('mandi', 'man-di', 'To bathe / shower. Indonesia\'s tropical climate makes mandi a 2x-daily habit: mandi pagi and mandi sore. The word also covers ritual washing in religious contexts (mandi wajib).', 'word', 'Saya mandi dua kali sehari.', 'I bathe twice a day.', null, [ACT.vocabularyActivities]),
    createContentItem('sarapan', 'sa-ra-pan', 'Breakfast (noun and verb). "Sarapan pagi" or just "sarapan". Indonesian breakfast: nasi goreng, bubur ayam, lontong, or kopi + roti.', 'word', 'Sarapan saya bubur ayam.', 'My breakfast is chicken porridge.', null, [ACT.vocabularyActivities]),
    createContentItem('gosok gigi', 'go-sok gi-gi', 'Brush teeth. Compound: gosok (scrub) + gigi (tooth). Done after every meal in proper Indonesian routine.', 'word', 'Jangan lupa gosok gigi sebelum tidur.', 'Don\'t forget to brush teeth before sleeping.', null, [ACT.vocabularyActivities]),
    createContentItem('kuliah', 'ku-li-ah', 'University class / lecture. Both noun (a class session) and verb (to attend a class). "Saya kuliah hari Senin" = I have class on Monday.', 'word', 'Kuliah hari ini tentang algoritma.', 'Today\'s class is about algorithms.', null, [ACT.vocabularyActivities]),
    createContentItem('makan siang', 'ma-kan si-aŋ', 'Lunch (literally midday-meal). UI students typically eat at fakultas kantin between 12 and 1.', 'word', 'Makan siang di kantin Fasilkom.', 'Lunch at the Fasilkom cafeteria.', null, [ACT.vocabularyActivities]),
    createContentItem('pulang', 'pu-laŋ', 'To go home. Distinct from pergi (go) — pulang specifically means returning to one\'s home. "Pulang kampung" = go back to home village (during Lebaran/Eid).', 'word', 'Saya pulang jam lima sore.', 'I go home at 5pm.', null, [ACT.vocabularyActivities]),
    createContentItem('istirahat', 'is-ti-ra-hat', 'Rest / take a break. Arabic-loan, 4 syllables. Used at workplaces, mid-class breaks, hospitals.', 'word', 'Istirahat sebentar dulu.', 'Take a short break first.', null, [ACT.vocabularyActivities]),
    createContentItem('olahraga', 'o-lah-ra-ga', 'Exercise / sport (noun and verb). Compound: olah (process) + raga (body). UI has gymnasium fasilities and many students jog around Danau Kenanga.', 'word', 'Saya olahraga setiap Sabtu pagi.', 'I exercise every Saturday morning.', null, [ACT.vocabularyActivities]),
    createContentItem('masak', 'ma-sak', 'To cook (intransitive) or cooked (adjective). "Saya masak nasi goreng" = I cook fried rice. Active: memasak (with prefix). Passive: dimasak.', 'word', 'Saya masak mie instan untuk malam ini.', 'I cook instant noodles for tonight.', null, [ACT.vocabularyActivities]),
    createContentItem('makan malam', 'ma-kan ma-lam', 'Dinner (literally night-meal). Indonesian families typically eat together; students in dorms order delivery or eat at warung.', 'word', 'Makan malam bersama keluarga.', 'Dinner together with family.', null, [ACT.vocabularyActivities]),
    createContentItem('mengerjakan PR', 'mə-ŋər-dʒa-kan pe-er', 'Do homework. mengerjakan = meN- + kerja + -kan; PR = pekerjaan rumah (home-work). Reading "PR" as "pe-er" (the two letter names).', 'word', 'Saya mengerjakan PR di perpustakaan.', 'I do homework at the library.', null, [ACT.vocabularyActivities]),
    createContentItem('nonton TV', 'non-ton te-ve', 'Watch TV (casual). Nonton is the casual short form of menonton (active meN- + tonton).', 'word', 'Saya nonton TV setelah makan malam.', 'I watch TV after dinner.', null, [ACT.vocabularyActivities]),
    createContentItem('tidur', 'ti-dur', 'To sleep (intransitive). Bare verb, no affix needed. "Tidur siang" = afternoon nap; "tidur malam" = night sleep.', 'word', 'Saya tidur jam sebelas malam.', 'I sleep at 11pm.', null, [ACT.vocabularyActivities]),

    createContentItem('sudah', 'su-dah', 'Aspect particle "already" — marks completed actions. Placed BEFORE the verb. "Saya sudah makan" = I have eaten. Question: "Sudah makan?" The answer is always sudah OR belum.', 'sentence', 'Saya sudah selesai mengerjakan PR.', 'I have already finished doing homework.', [
      { target: 'sudah + verb', note: 'completion: "have already X-ed"' },
      { target: 'short form: udah/dah', note: 'Jakarta casual: Udah makan? = Sudah makan?' },
      { target: 'sudah pernah', note: '"have ever" — sudah + pernah for life-experience' },
    ], [ACT.grammarAspect]),
    createContentItem('sedang', 'sə-dang', 'Aspect particle "currently doing" — marks ongoing actions. Placed before the verb. Casual short form: "lagi". "Saya sedang makan" = "Saya lagi makan" = "I am eating right now".', 'sentence', 'Mahasiswa sedang mengikuti kuliah.', 'The students are attending the lecture.', [
      { target: 'sedang + verb', note: 'progressive: "X-ing right now"' },
      { target: 'lagi (casual)', note: 'urban Jakarta casual: Lagi apa? = Sedang apa? = What are you doing?' },
      { target: 'sedang vs sering', note: 'sedang = right now (single occurrence); sering = often (frequency)' },
    ], [ACT.grammarAspect]),
    createContentItem('akan', 'a-kan', 'Future particle "will". Placed before the verb. More formal than the casual alternatives "mau" or "bakal". Common in academic and news contexts.', 'sentence', 'Saya akan pulang ke kampung pada bulan Desember.', 'I will go back to my hometown in December.', [
      { target: 'akan (formal future)', note: 'future: "will X"' },
      { target: 'mau (casual future + intention)', note: 'casual: Saya mau makan = I want to / will eat' },
      { target: 'bakal (casual future, certain)', note: 'casual: Saya bakal pulang = I\'m gonna go home' },
    ], [ACT.grammarAspect]),
    createContentItem('belum', 'bə-lum', '"Not yet" — open to future completion. The "open" negative, distinct from tidak (categorical "no"). Standard answer to "sudah ...?" — must be sudah OR belum.', 'sentence', 'Saya belum mengerti pelajaran ini.', 'I haven\'t understood this lesson yet.', [
      { target: 'belum = not yet (open)', note: 'still possible to happen later' },
      { target: 'tidak = no (categorical)', note: 'closed; not now, not later' },
      { target: 'belum pernah', note: '"have never (yet)" — life-experience negative' },
    ], [ACT.grammarAspect]),

    createContentItem('lalu / kemudian', 'la-lu / kə-mu-di-an', 'Sequence markers "then". Lalu is more casual; kemudian is slightly formal. Used between two clauses to chain events.', 'sentence', 'Saya makan, lalu mandi.', 'I eat, then bathe.', null, [ACT.grammarSequence]),
    createContentItem('setelah itu', 'sə-tə-lah i-tu', '"After that" — sequence marker. Setelah = after; itu = that. Stronger than lalu, marks a clearer break.', 'sentence', 'Saya kuliah pagi. Setelah itu, makan siang.', 'I have morning class. After that, lunch.', null, [ACT.grammarSequence]),
    createContentItem('dulu / pertama', 'du-lu / pər-ta-ma', 'Sequence-opener "first". Dulu is the casual "first/before", pertama is the formal/numerical "first". Both place an action at the start of a sequence.', 'sentence', 'Mandi dulu, baru makan.', 'Bathe first, then (only then) eat. Baru = then-and-only-then.', null, [ACT.grammarSequence]),
    createContentItem('sebelum / sesudah', 'sə-bə-lum / sə-su-dah', '"Before / after" — used with a verb phrase. Sebelum + verb = before doing X; sesudah + verb = after doing X. Subordinate clause connectors.', 'sentence', 'Sebelum tidur, gosok gigi. Sesudah makan, cuci piring.', 'Before sleeping, brush teeth. After eating, wash dishes.', null, [ACT.grammarSequence]),

    createContentItem('setiap hari', 'sə-ti-ap ha-ri', 'Every day. Setiap = every; hari = day. High-frequency adverbial; placed at the start or end of the sentence.', 'sentence', 'Saya kuliah setiap hari Senin.', 'I have class every Monday.', null, [ACT.grammarFrequency]),
    createContentItem('kadang-kadang', 'ka-dang-ka-dang', 'Sometimes. Reduplicated kadang. Casual short forms: kadang or sometimes "kadang2" in writing.', 'sentence', 'Kadang-kadang saya makan di luar.', 'Sometimes I eat outside.', null, [ACT.grammarFrequency]),
    createContentItem('sering', 'sə-ring', 'Often. Schwa first syllable, full /i/ + /ŋ/ ending. Stronger than kadang-kadang, weaker than selalu.', 'sentence', 'Saya sering ke perpustakaan.', 'I often go to the library.', null, [ACT.grammarFrequency]),
    createContentItem('jarang', 'dʒa-rang', 'Rarely. Used the same way as sering but at the other end of the frequency scale. ng = /ŋ/.', 'sentence', 'Saya jarang nonton TV.', 'I rarely watch TV.', null, [ACT.grammarFrequency]),
    createContentItem('tidak pernah', 'ti-daʔ pər-nah', 'Never. Tidak (categorical no) + pernah (ever). The categorical negative life-experience adverbial.', 'sentence', 'Saya tidak pernah merokok.', 'I have never smoked.', null, [ACT.grammarFrequency]),
    createContentItem('selalu', 'sə-la-lu', 'Always. The top of the frequency scale. Schwa first, full /a/ + /u/.', 'sentence', 'Saya selalu bangun jam lima.', 'I always wake up at 5.', null, [ACT.grammarFrequency]),

    createContentItem('Hari Selasa Sari', 'ha-ri sə-la-sa sa-ri', 'A 7-sentence paragraph about Sari\'s typical Tuesday at UI. Read aloud with attention to aspect particles and time markers.', 'sentence', 'Sari adalah mahasiswa tingkat dua di Fasilkom UI. Setiap hari Selasa dia bangun jam lima pagi. Setelah salat subuh, dia mandi dan sarapan. Kuliah pertamanya jam delapan, jadi dia naik bus kampus jam tujuh. Siang hari, Sari makan di kantin Fasilkom bersama teman-temannya. Sore hari, dia sering ke perpustakaan untuk mengerjakan PR. Setelah makan malam, Sari biasanya menonton drama Korea sebelum tidur.', '"Sari is a second-year student at Fasilkom UI. Every Tuesday she wakes at 5am. After subuh prayer, she bathes and breakfasts. Her first class is at 8, so she takes the campus bus at 7. At midday, Sari eats at the Fasilkom cafeteria with her friends. In the afternoon, she often goes to the library to do homework. After dinner, Sari usually watches Korean drama before sleeping."', null, [ACT.reading]),
    createContentItem('Pertanyaan pemahaman', 'pər-ta-ɲa-an pə-ma-ha-man', 'Five comprehension questions. Answer with sequence markers and aspect particles.', 'sentence', '1) Jam berapa Sari bangun? 2) Apa yang dia lakukan setelah subuh? 3) Di mana dia makan siang? 4) Apa yang dia lakukan di perpustakaan? 5) Apa hobinya sebelum tidur?', 'Five wh-questions exercising different aspects.', null, [ACT.reading]),

    createContentItem('Dialog: Membandingkan jadwal', 'di-a-log mem-ban-ding-kan dʒad-wal', 'A 6-turn dialogue between two UI friends comparing daily schedules. Notice casual aku/kamu and short forms of aspect particles.', 'conversation', 'Andi: Hai Sari! Sudah selesai kuliah?\nSari: Belum nih. Aku lagi nunggu kuliah berikutnya jam dua.\nAndi: Aku udah pulang. Tadi cuma satu kelas.\nSari: Enak ya. Eh, nanti malam kamu ada acara?\nAndi: Nggak ada. Mau makan malam bareng?\nSari: Boleh! Jam tujuh di kantin Sastra?\nAndi: Oke, sampai nanti!', 'Casual Jakarta-style peer conversation; lagi/udah/nggak as casual aspect particles.', [
      { target: 'lagi (= sedang)', note: 'casual progressive: lagi nunggu = currently waiting' },
      { target: 'udah (= sudah)', note: 'casual completion: udah pulang = already gone home' },
      { target: 'nggak (= tidak)', note: 'casual negation' },
      { target: 'bareng (= bersama)', note: 'casual "together"' },
    ], [ACT.listening]),

    createContentItem('Tulis hari Anda', 'tu-lis ha-ri an-da', 'Write 6-8 sentences describing your typical weekday. Required: aspect particles, sequence markers, frequency adverb.', 'sentence', 'Contoh: Setiap pagi saya bangun jam enam. Setelah salat dan mandi, saya sarapan. Saya berangkat ke kampus jam tujuh. Kuliah pertama selalu jam delapan. Siang saya makan di kantin. Sore saya sering ke perpustakaan untuk mengerjakan PR. Malam saya sudah pulang ke asrama. Sebelum tidur, saya menonton drama sebentar.', 'Example daily routine using all required elements.', null, [ACT.writing]),

    createContentItem('Lima waktu salat', 'li-ma wak-tu sa-lat', 'The five daily prayer times in Islam, used as natural time-markers in Indonesian society — even by non-Muslims. Subuh (dawn, ~4:30am), zuhur (midday, ~12), asar (afternoon, ~3pm), magrib (sundown, ~6pm), isya (~7:30pm). Public spaces (offices, malls) often pause for magrib in particular.', 'sentence', 'Saya selalu bangun sebelum subuh.', 'I always wake up before dawn (subuh prayer).', null, [ACT.culture]),
    createContentItem('Sahur dan buka puasa', 'sa-hur dan bu-ka pu-a-sa', 'During Ramadan (puasa), Muslim Indonesians eat sahur (pre-dawn meal, ~3:30am) and buka puasa (sundown break-fast, ~6pm). The whole society shifts: workplaces shorten hours, malls open later, KRL runs special schedules.', 'sentence', 'Bulan puasa, jadwal harian berubah total.', 'During Ramadan, the daily schedule changes completely.', null, [ACT.culture]),
    createContentItem('Jam karet vs tepat waktu', 'dʒam ka-ret', 'The older "jam karet" (rubber time) stereotype is fading in formal contexts (universities, corporations, government), but social events (kondangan, kumpul-kumpul) often still run 30+ minutes late. UI lectures start tepat waktu (on time); a kondangan wedding starts when guests arrive.', 'sentence', 'Datang tepat waktu untuk acara formal.', 'Come on time for formal events.', null, [ACT.culture]),

    createContentItem('Tugas akhir: Telepon teman', 'tu-gas a-xir', 'Roleplay a phone call where you describe your full Tuesday to a friend at home. Use aspect particles, time vocabulary, sequence markers. The AI tutor plays the curious friend.', 'conversation', '[Telepon malam]\nTeman: Halo! Gimana hari kamu?\nKamu: [Cerita pagi]\nTeman: Trus siang ngapain?\nKamu: [Cerita siang]\nTeman: Sore ke mana?\nKamu: [Cerita sore]\nTeman: Sekarang udah selesai semua?\nKamu: [Tutup percakapan]', '8-turn phone narrative covering full day.', null, [ACT.task]),
  ],
};

module.exports = lesson;
