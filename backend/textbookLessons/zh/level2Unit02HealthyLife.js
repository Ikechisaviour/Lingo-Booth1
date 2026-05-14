// Level 2 Unit 2 — 健康生活 (Healthy Living, Mandarin Chinese)
// Functions: discussing health, fitness, nutrition, and mental wellbeing;
// expressing purpose with 为了; expressing means with 通过…来…; declining
// unhealthy options with 既不…也不…; comparing Chinese 养生 traditions
// with modern fitness culture; talking about sleep, stress, and habits.
//
// All content is authored with Hanzi (target) + Pinyin (romanization) +
// English glosses (canonical source). The conversation tutor reads this
// curriculum and delivers it to each learner in their preferred native
// language at runtime — never assume a specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition.

const createContentItem = (
  target,
  pinyin,
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
  romanization: pinyin,
  nativeText: note,
  pronunciation: pinyin,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'zh-l2u2-orientation',
  pronunciation: 'zh-l2u2-pronunciation',
  vocabularyHealth: 'zh-l2u2-vocab-health',
  vocabularyWellness: 'zh-l2u2-vocab-wellness',
  vocabularyHabits: 'zh-l2u2-vocab-habits',
  grammarWeile: 'zh-l2u2-grammar-weile',
  grammarTongguo: 'zh-l2u2-grammar-tongguo',
  grammarJibu: 'zh-l2u2-grammar-jibu',
  reading: 'zh-l2u2-reading',
  listening: 'zh-l2u2-listening',
  writing: 'zh-l2u2-writing',
  culture: 'zh-l2u2-culture',
  task: 'zh-l2u2-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Talk about health, lifestyle, exercise, nutrition, sleep, and stress using intermediate vocabulary — including modern fitness terms and traditional 养生 (yǎngshēng) wellness concepts.',
      'Express purpose and means of healthy habits with three grammar patterns: 为了 + goal, 通过 + means + 来 V, and 既不…也不… for declining unhealthy options.',
      'Discuss a healthier weekly routine with a Tsinghua roommate — name three specific changes you want to make and how you plan to make them.',
    ],
    task: 'Imagine you and your Tsinghua roommate are mid-semester and both feeling run down. By the end of this lesson you should propose three lifestyle changes — sleep, exercise, diet — using means + goal grammar fluently in one continuous conversation.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce 健康 (jiànkāng) cleanly: fourth tone + first tone, with the -n / -ng nasal contrast distinguishing jiàn (-n) from kāng (-ng).',
      'Pronounce 锻炼 (duànliàn) cleanly: two fourth tones in a row, both with the rounded -uan final — common stumble for English speakers who flatten the rounded vowel.',
      'Pronounce 养生 (yǎngshēng) cleanly: third tone + first tone, with full retroflex sh- in shēng; this is a culturally loaded term where mispronunciation reads as foreign-learner accent.',
    ],
    task: 'Read each example aloud three times and self-check for the -n/-ng contrast, the rounded -uan, and the retroflex shēng.',
  },
  {
    id: ACT.vocabularyHealth,
    section: 'Vocabulary I',
    title: 'Health, body, and clinical states',
    goals: [
      'Use 15 core health words covering physical states (健康, 生病, 失眠, 头疼) and mental states (压力, 焦虑, 抑郁, 心情).',
      'Distinguish 健康 (general health/wellness state) from 身体 (physical body) and 心理 (mental/psychological) — three different angles on the same wellbeing concept.',
    ],
    task: 'Say five health words out loud and pair each one with a context where you would use it (clinic visit, self-description, advising a friend).',
  },
  {
    id: ACT.vocabularyWellness,
    section: 'Vocabulary II',
    title: 'Wellness traditions and fitness culture',
    goals: [
      'Use 12 wellness words covering traditional Chinese concepts (养生, 太极, 气功, 中药, 按摩, 推拿, 食疗) and modern fitness (健身, 锻炼, 跑步, 瑜伽, 减肥, 增肌).',
      'Distinguish the 养生 worldview (long-term, preventive, balance-focused) from Western fitness (short-term, performance-focused) — two different mental models of "being well".',
    ],
    task: 'Pick one traditional 养生 practice and one modern fitness habit; say which one you actually do and why.',
  },
  {
    id: ACT.vocabularyHabits,
    section: 'Vocabulary III',
    title: 'Modern habits, tracking, and lifestyle metrics',
    goals: [
      'Use 10 habit-tracking words from contemporary Chinese urban life: 打卡 (check-in/track habit), 步数 (step count), 朋友圈 (WeChat moments), 晒 (to show off/post), 自律 (self-discipline), 作息 (daily routine).',
      'Understand the 打卡文化 ("check-in culture") that frames fitness as a daily streak — the same word that means clocking in at work now also means posting your 6 AM run.',
    ],
    task: 'Describe one habit you currently 打卡 (track) and one habit you wish you 打卡 — use 每天 (every day) or 每周 (every week) with each.',
  },
  {
    id: ACT.grammarWeile,
    section: 'Grammar I',
    title: '为了 + goal — to express purpose',
    goals: [
      'Use 为了 (wèile, "in order to / for the sake of") at the START of a sentence to mark the goal, followed by the main clause that delivers that goal.',
      'Place 为了-clauses BEFORE the main clause: 为了健康，我每天跑步 ("In order to be healthy, I run every day"). Reversing the order is grammatically odd in Mandarin.',
      'Distinguish 为了 (goal/purpose) from 因为 (cause/reason) — a frequent learner confusion since both translate as "because" in some English contexts.',
    ],
    task: 'Write three sentences using 为了 + goal + main clause, each describing a real lifestyle change you want to make.',
  },
  {
    id: ACT.grammarTongguo,
    section: 'Grammar II',
    title: '通过 + means + 来 V — to express means',
    goals: [
      'Use 通过 (tōngguò, "through / by means of") + a noun or noun phrase (the means) + 来 + verb (the action) to express HOW you accomplish something.',
      'Place 通过-phrases BEFORE the main verb: 通过跑步来减肥 ("lose weight through running"). The 来 is a grammatical linker, not the verb "come".',
      'Combine with 为了 to give both goal AND means in one sentence: 为了健康，我通过跑步来锻炼身体 ("To be healthy, I exercise my body through running").',
    ],
    task: 'Write three sentences using 通过 X 来 V; then expand one of them by adding a 为了 clause to specify the larger goal.',
  },
  {
    id: ACT.grammarJibu,
    section: 'Grammar III',
    title: '既不…也不… — neither nor (declining options)',
    goals: [
      'Use 既不 (jì bù) … 也不 (yě bù) … to deny two parallel things in one sentence: 既不抽烟也不喝酒 ("neither smoke nor drink").',
      'Place 既不/也不 immediately before each verb or adjective; the two negated items must be PARALLEL in part of speech (two verbs, or two adjectives).',
      'Use this pattern to politely decline unhealthy options without sounding judgmental: 我既不抽烟也不喝酒 lists your habits factually rather than criticizing others.',
    ],
    task: 'Write three 既不…也不… sentences describing your own habits (foods you avoid, activities you skip) — keep the tone factual, not preachy.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'A health column from Tsinghua\'s campus magazine',
    goals: [
      'Read a 150-character health-advice article in natural Mandarin, applying all three grammar patterns plus the health vocabulary.',
      'Answer comprehension questions about the article in short complete sentences using 是 / 通过 / 为了 patterns.',
    ],
    task: 'Read the article aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Roommates talking about getting healthier',
    goals: [
      'Follow a 6-turn conversation between two Tsinghua roommates discussing exhaustion, exam stress, and three concrete lifestyle changes — each change framed as goal + means.',
      'Reproduce the conversation with your own habits and goals swapped in, keeping the natural register of close peers (no honorifics, casual sentence-final particles like 啊 and 吧).',
    ],
    task: 'Read the dialogue along with the tutor first, then perform it again with your own three desired changes swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your weekly wellness plan',
    goals: [
      'Write a 5-sentence weekly wellness plan in Hanzi: one sentence each for sleep, exercise, diet, mental health, and one habit you will avoid.',
      'Use 为了 at least once, 通过…来… at least once, and 既不…也不… at least once — proving all three Level 2 Unit 2 patterns work together.',
    ],
    task: 'Write your own 5-sentence wellness plan using the template, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '养生 vs Western wellness — and the rise of fitness culture',
    goals: [
      'Understand 养生 (yǎngshēng, "nurturing life") as a centuries-old Chinese health philosophy emphasizing prevention, balance, seasonal eating, and gentle daily practices — distinct from the Western performance-and-results framing of fitness.',
      'Know about the urban-millennial fitness boom: 健身房 (gyms) packed after work, 朋友圈晒步数 (showing off step counts on WeChat moments), and the 打卡 (check-in) discipline culture imported from corporate work life.',
      'Know that Tsinghua University maintains a famous 跑操 (pǎocāo, "morning running drill") tradition — students running laps together at dawn — a campus ritual that bridges the old "exercise as discipline" mindset with new fitness culture.',
    ],
    task: 'Pick one 养生 practice and one modern fitness habit; describe which feels more sustainable to you and why.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Healthier weekly routine — with your Tsinghua roommate',
    goals: [
      'Combine every grammar pattern, vocabulary item, and cultural cue from this lesson into one continuous conversation with your roommate at Tsinghua.',
      'Propose three specific changes (sleep, exercise, diet) using 为了 + goal AND 通过 + means; decline one unhealthy option using 既不…也不…; close with a concrete agreement to 打卡 together for one week.',
    ],
    task: 'Roleplay a 6-turn conversation with the tutor playing your Tsinghua roommate; aim for fluent use of all three grammar patterns and at least eight new vocabulary items.',
  },
];

const lesson = {
  title: 'Level 2 · Unit 2: 健康生活 — Healthy Living',
  category: 'healthcare',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'expressing-purpose', label: 'Expressing purpose', goal: 'Use 为了 + goal + main clause to frame any healthy habit as serving a larger wellness goal.' },
    { id: 'expressing-means', label: 'Expressing means', goal: 'Use 通过 + means + 来 V to say HOW you accomplish a health goal — through running, through meditation, through diet.' },
    { id: 'declining-unhealthy', label: 'Declining unhealthy options', goal: 'Use 既不…也不… to factually list two things you avoid — smoking, drinking, fried food — without sounding preachy.' },
    { id: 'discussing-routine', label: 'Discussing a weekly routine', goal: 'Talk about your 作息 (daily routine), 步数 (step count), and 打卡 (habit tracking) using contemporary urban Chinese vocabulary.' },
  ],
  relatedPools: ['topic-health', 'topic-daily-life'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can talk about health, fitness, sleep, and stress in intermediate Mandarin; express purpose and means with the three core Level 2 patterns; and discuss a healthier weekly routine with a peer without rehearsing each line.',
      'word',
      'Functional language: 谈健康 tán jiànkāng (discuss health) · 表目的 biǎo mùdì (express purpose) · 表手段 biǎo shǒuduàn (express means) · 拒绝 jùjué (decline) · 制订计划 zhìdìng jìhuà (make a plan)',
      'These five micro-skills together let you talk about wellness like an urban Chinese millennial — a domain saturated with both ancient 养生 vocabulary and modern fitness slang.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'It is mid-semester at Tsinghua. You and your roommate are both running on four hours of sleep, takeout dinners, and weekend caffeine binges. One evening in the dorm, the conversation finally turns to "we should do something about this."',
      'word',
      '室友: "我最近压力太大了，晚上总是失眠。咱们一起健身吧!"',
      'A typical opener between close roommates: state the symptom (stress + insomnia), then propose a joint solution using 咱们 (zánmen, "we-inclusive") — the warm, intimate first-person plural.',
      [
        { target: '压力 yālì', note: 'pressure / stress — the dominant cause of any urban Chinese student\'s health complaints; appears in nearly every wellness conversation' },
        { target: '失眠 shīmián', note: 'insomnia — high-frequency word in student and white-collar life; often paired with 压力' },
        { target: '咱们 zánmen', note: 'inclusive "we" (you + me); warmer than 我们; signals a shared plan' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三种健康角度',
      'sān zhǒng jiànkāng jiǎodù',
      'Mandarin separates three angles on wellbeing that English lumps under "health": 身体 (shēntǐ, physical body), 心理 (xīnlǐ, mental/psychological), and 生活习惯 (shēnghuó xíguàn, lifestyle habits). A complete health conversation usually covers all three rather than just symptoms.',
      'word',
      '身体好不好 (physical) · 心理压力大不大 (mental) · 生活习惯规律不规律 (habits) — three questions every Chinese health column asks.',
      'Treating these as three separate axes (not one big "how are you feeling?") is a Mandarin conversational habit worth adopting.',
      [
        { target: '身体 shēntǐ', note: 'physical body / physical health; the "how do you feel" axis' },
        { target: '心理 xīnlǐ', note: 'mental / psychological state; covers stress, anxiety, mood — increasingly destigmatized in urban China' },
        { target: '生活习惯 shēnghuó xíguàn', note: 'lifestyle habits; sleep schedule, diet, exercise frequency, screen time — the modifiable axis' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '健康',
      'jiànkāng',
      'The two-syllable word for "health". The first syllable jiàn has the -n nasal (tongue tip on alveolar ridge); the second syllable kāng has the -ng nasal (tongue back on soft palate). Getting the -n/-ng contrast right is what makes this word sound native rather than learner.',
      'word',
      '健康 jiànkāng (4th + 1st) — "health, healthy state"',
      'The single most-used noun in this whole lesson; nailing its pronunciation is high-leverage.',
      [
        { target: '健 (jiàn, 4th, -n ending)', note: 'tongue tip touches the alveolar ridge for -n; sharp falling tone' },
        { target: '康 (kāng, 1st, -ng ending)', note: 'tongue back rises to soft palate for -ng; high-level tone held steady' },
        { target: 'contrast pitfall', note: 'flattening jiàn into "jian" (no nasal tongue placement) and kāng into "kang" (no soft-palate -ng) is the most common learner accent for this word' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '锻炼',
      'duànliàn',
      'The two-syllable verb meaning "to exercise / train (the body)". Both syllables are fourth tone with the rounded -uan final. English speakers often flatten -uan to "an" — losing the rounded glide that makes the word sound natural.',
      'word',
      '锻炼身体 duànliàn shēntǐ — "to exercise the body" (the standard collocation)',
      'Distinguish from 健身 (jiànshēn, "fitness training" in a gym sense) — 锻炼 is the broader, older word covering any physical training.',
      [
        { target: '锻 (duàn, 4th, -uan rounded)', note: 'lips round at the start (u-), then glide to -an; tone falls sharply' },
        { target: '炼 (liàn, 4th, -ian)', note: 'starts with a high front -i glide, then -an; tone falls sharply' },
        { target: 'rhythm note', note: 'two parallel fourth tones — "BANG BANG" rhythm, both sharp and short; do not weaken the second' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '养生',
      'yǎngshēng',
      'The two-syllable noun/verb meaning "nurturing life / health cultivation". Third tone + first tone, with the retroflex shēng (curl the tongue back for sh-). Mispronouncing this culturally loaded term reads as obvious foreign-learner accent.',
      'word',
      '养生 yǎngshēng (3rd + 1st) — "health cultivation", a centuries-old Chinese wellness concept',
      'Note: in isolation 养 is full third tone (dip-and-rise); before a non-third tone, the dip-and-rise often shortens to just the low dip.',
      [
        { target: '养 (yǎng, 3rd)', note: 'low dipping tone; before first tone, often realized as low without full rise' },
        { target: '生 (shēng, 1st, retroflex sh-)', note: 'tongue curls back for sh-; held high and level' },
        { target: 'pitfall: flat sh-', note: 'pronouncing sh- like English "sh" without the curl is the giveaway accent; tongue must curl back' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '失眠 / 焦虑',
      'shīmián / jiāolǜ',
      'Two high-frequency mental-health words in this lesson. 失眠 (1st + 2nd) for insomnia; 焦虑 (1st + 4th) for anxiety. Both contain a single 4th-syllable contrast point and the rounded vowel -ü in 焦虑 (the same ü as 女 nǚ "female").',
      'word',
      '失眠 shīmián · 焦虑 jiāolǜ — "insomnia" and "anxiety"',
      'Two of the most-heard health complaints among Chinese students; appear constantly in 朋友圈 (WeChat moments) and 微博 (Weibo) posts.',
      [
        { target: '失 (shī, 1st, retroflex sh-)', note: 'high level tone; same retroflex sh- as in 养生 — curl the tongue back' },
        { target: '眠 (mián, 2nd)', note: 'rising tone; -ian final like 炼 from 锻炼' },
        { target: '焦 (jiāo, 1st)', note: 'palatal j-; held high and level' },
        { target: '虑 (lǜ, 4th, rounded ü)', note: 'rounded front vowel; write the umlaut after l- ("lü"); falling tone' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Health, body, clinical
    // ────────────────────────────────────────────────────────────────────
    createContentItem('健康', 'jiànkāng', 'Health / healthy state — both a noun ("my health") and an adjective ("I am healthy"). The cover term for the whole topic; appears in headlines, advice columns, slogans, and casual conversation alike.', 'word', '健康最重要。 jiànkāng zuì zhòngyào.', '"Health is most important." — a stock proverb-like saying frequently heard from older relatives.', null, [ACT.vocabularyHealth]),
    createContentItem('身体', 'shēntǐ', 'The physical body / physical health. When someone asks 身体怎么样? they mean "how is your physical health?" — distinct from 心理 (mental) and 生活 (lifestyle). Polite small-talk opener with anyone older.', 'word', '最近身体怎么样? zuìjìn shēntǐ zěnmeyàng?', '"How is your body lately?" — standard wellbeing inquiry with a slightly older or returning friend.', null, [ACT.vocabularyHealth]),
    createContentItem('心理', 'xīnlǐ', 'Mental / psychological — the cover word for everything in the head, from stress to depression. Increasingly destigmatized in urban Chinese 90后/00后 (post-90s/00s) culture; used openly in academic and wellness conversations.', 'word', '我最近心理压力很大。 wǒ zuìjìn xīnlǐ yālì hěn dà.', '"I have a lot of mental pressure lately." — common opener for a stress-related conversation.', null, [ACT.vocabularyHealth]),
    createContentItem('生病', 'shēngbìng', 'To get sick / fall ill. Verb-object compound (literally "give-birth-to-illness"); used as a single verb. Distinct from 病 (bìng, the illness itself).', 'word', '我上周生病了。 wǒ shàng zhōu shēngbìng le.', '"I got sick last week." — completed past action marked with 了.', null, [ACT.vocabularyHealth]),
    createContentItem('感冒', 'gǎnmào', 'A common cold. Used as both noun and verb: 感冒了 ("(I) caught a cold"). High-frequency complaint, especially in Beijing winter or air-conditioned summer offices.', 'word', '我感冒了，吃了点药。 wǒ gǎnmào le, chī le diǎn yào.', '"I caught a cold, I took some medicine." — note 吃药 (literally "eat medicine") for taking pills.', null, [ACT.vocabularyHealth]),
    createContentItem('头疼', 'tóuténg', 'Headache. Also written 头痛 (tóutòng); 头疼 is more colloquial. The 疼 form is often used metaphorically too ("a headache" = a hassle).', 'word', '我有点头疼，没睡好。 wǒ yǒudiǎn tóuténg, méi shuì hǎo.', '"I have a slight headache, didn\'t sleep well." — 有点 (yǒudiǎn) softens to "a bit"; common before a complaint.', null, [ACT.vocabularyHealth]),
    createContentItem('失眠', 'shīmián', 'Insomnia / sleeplessness. Used as a noun ("my insomnia") and a verb ("I can\'t sleep"): 我又失眠了 ("I have insomnia again"). The signature complaint of Chinese students and white-collar workers.', 'word', '我已经一周失眠了。 wǒ yǐjīng yī zhōu shīmián le.', '"I\'ve had insomnia for a week now." — 一周 (one week) signals a worrying duration.', null, [ACT.vocabularyHealth]),
    createContentItem('压力', 'yālì', 'Pressure / stress. The cover word for any external pressure — academic, work, family, financial. Pair with 大 (large) or 小 (small): 压力很大 = "stress is high".', 'word', '考试压力太大了。 kǎoshì yālì tài dà le.', '"Exam stress is too much." — 太…了 (tài…le) intensifier; default Tsinghua complaint near finals.', null, [ACT.vocabularyHealth]),
    createContentItem('心情', 'xīnqíng', 'Mood / state of mind. The day-to-day emotional weather, distinct from 心理 (the broader mental-health domain). Pair with 好/不好: 心情不好 = "in a bad mood".', 'word', '今天心情不太好。 jīntiān xīnqíng bù tài hǎo.', '"My mood isn\'t great today." — 不太 (not too) softens; the polite way to admit a low day.', null, [ACT.vocabularyHealth]),
    createContentItem('焦虑', 'jiāolǜ', 'Anxiety / anxious. Both adjective ("I feel anxious") and noun ("anxiety as a condition"). More clinical-sounding than 担心 (worry); used when the feeling is persistent or diagnosable.', 'word', '我最近经常焦虑。 wǒ zuìjìn jīngcháng jiāolǜ.', '"I\'ve been frequently anxious lately." — 经常 (frequently) marks it as a pattern, not a single bad day.', null, [ACT.vocabularyHealth]),
    createContentItem('抑郁', 'yìyù', 'Depression / depressed. Clinical-register term for the mood disorder; not used for ordinary sadness (use 难过 nánguò for that). The destigmatization of 抑郁症 (yìyùzhèng, "depression illness") is a major recent shift in urban Chinese discourse.', 'word', '抑郁症需要专业治疗。 yìyùzhèng xūyào zhuānyè zhìliáo.', '"Depression needs professional treatment." — typical educational-poster sentence; 需要 = need.', null, [ACT.vocabularyHealth]),
    createContentItem('疲劳', 'píláo', 'Fatigue / exhaustion. Slightly more formal than 累 (lèi, "tired"). Often paired with 慢性 (chronic) for 慢性疲劳 ("chronic fatigue"). The medical-leaning word for tiredness.', 'word', '长期疲劳影响健康。 chángqī píláo yǐngxiǎng jiànkāng.', '"Long-term fatigue affects health." — 长期 (long-term) + 影响 (affect) collocation; very common health-article phrasing.', null, [ACT.vocabularyHealth]),
    createContentItem('体检', 'tǐjiǎn', 'Medical check-up / physical exam. Annual 体检 is standard at Chinese workplaces and universities; many people get one in early year before Chinese New Year. Includes blood test, ECG, ultrasound, and more.', 'word', '我每年都做一次体检。 wǒ měi nián dōu zuò yī cì tǐjiǎn.', '"I do a check-up once a year." — 每…都 (every…all) emphasizes the routine; standard Chinese health hygiene.', null, [ACT.vocabularyHealth]),
    createContentItem('医生', 'yīshēng', 'Doctor. Also used as a title after the family name: 王医生 (Doctor Wang). Higher-trust profession in China than in many Western contexts; long lines at famous hospitals are normal.', 'word', '我下午去看医生。 wǒ xiàwǔ qù kàn yīshēng.', '"I\'m going to see a doctor this afternoon." — 看医生 (literally "look-at doctor") = visit a doctor.', null, [ACT.vocabularyHealth]),
    createContentItem('药', 'yào', 'Medicine / drug. Used in 吃药 ("take medicine", literally "eat medicine") for pills and 喝药 ("drink medicine") for liquid preparations like 中药 (Chinese herbal decoctions). The verb is what English uses "take" for.', 'word', '别忘了吃药! bié wàng le chī yào!', '"Don\'t forget to take your medicine!" — 别 (don\'t) + 忘 (forget) + 了 (perfective) imperative.', null, [ACT.vocabularyHealth]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Wellness traditions + modern fitness
    // ────────────────────────────────────────────────────────────────────
    createContentItem('养生', 'yǎngshēng', 'Health cultivation / nurturing life — the centuries-old Chinese wellness philosophy emphasizing prevention, balance, seasonal eating, and gentle daily practices. The mental model behind everything from drinking hot water to early bedtimes. A worldview, not just a hobby.', 'word', '我爷爷很注重养生。 wǒ yéye hěn zhùzhòng yǎngshēng.', '"My grandfather is very focused on health-cultivation." — 注重 (focus on) is the standard collocation with 养生.', null, [ACT.vocabularyWellness]),
    createContentItem('太极', 'tàijí', 'Tai chi — the slow-motion martial-art practice now taught worldwide as a wellness exercise. In China, often practiced in parks at dawn by older adults; increasingly studied by younger people as an antidote to office sitting. Full name 太极拳 (tàijíquán, "tai chi boxing").', 'word', '公园里有人在打太极。 gōngyuán lǐ yǒu rén zài dǎ tàijí.', '"There are people doing tai chi in the park." — 打太极 (literally "hit tai chi") is the standard verb collocation.', null, [ACT.vocabularyWellness]),
    createContentItem('气功', 'qìgōng', 'Qigong — breathing and energy-cultivation exercises rooted in Traditional Chinese Medicine. Slower and more meditative than tai chi; often paired with it. The 气 (qì, "vital energy") concept is central to 养生 thinking.', 'word', '气功对身体很好。 qìgōng duì shēntǐ hěn hǎo.', '"Qigong is good for the body." — 对…好 (good for…) is the standard pattern for stating health benefits.', null, [ACT.vocabularyWellness]),
    createContentItem('中药', 'zhōngyào', 'Traditional Chinese medicine / Chinese herbs. The herbal-decoction-and-formula branch of 中医 (TCM). Often bitter, often slow-acting, prescribed for chronic conditions and recovery. Available alongside Western 西药 (xīyào) at almost every Chinese pharmacy.', 'word', '中药虽然苦，但是有效。 zhōngyào suīrán kǔ, dànshì yǒuxiào.', '"Chinese medicine is bitter, but effective." — 虽然…但是… (although…but…) concession pattern; the classic 中药 trade-off.', null, [ACT.vocabularyWellness]),
    createContentItem('按摩', 'ànmó', 'Massage. The generic word covering both Western massage and Chinese-style therapeutic touch. Widely available, often very affordable, used both for relaxation and for treating muscle and joint issues.', 'word', '按摩可以放松。 ànmó kěyǐ fàngsōng.', '"Massage can relax (you)." — 放松 (relax) is the standard health-benefit verb.', null, [ACT.vocabularyWellness]),
    createContentItem('推拿', 'tuīná', 'Tui na — Chinese therapeutic massage, more clinical than 按摩. Practiced by trained 推拿师 (tuīná shī) in TCM hospitals; targets specific meridians and pressure points to treat injuries, headaches, and digestive issues. Closer to physical therapy than to spa massage.', 'word', '我去做了一次推拿。 wǒ qù zuò le yī cì tuīná.', '"I went for a tui na session." — 做 (do) + 一次 (one time) for a single appointment.', null, [ACT.vocabularyWellness]),
    createContentItem('食疗', 'shíliáo', 'Food therapy — the TCM principle that food itself is medicine. Eating ginger soup for a cold, red dates for blood, walnuts for the brain. A core 养生 concept underlying most Chinese grandmother health advice.', 'word', '中国人相信食疗。 Zhōngguó rén xiāngxìn shíliáo.', '"Chinese people believe in food therapy." — 相信 (believe in) marks it as a cultural value, not a fringe practice.', null, [ACT.vocabularyWellness]),
    createContentItem('健身', 'jiànshēn', 'Fitness training (typically gym-based). Modern term covering weight-lifting, cardio machines, group classes, and personal training. Distinct from broader 锻炼 — 健身 implies a gym or structured program.', 'word', '我每周去健身房三次。 wǒ měi zhōu qù jiànshēnfáng sān cì.', '"I go to the gym three times a week." — 健身房 (jiànshēnfáng) = gym, literally "fitness-body-room".', null, [ACT.vocabularyWellness]),
    createContentItem('锻炼', 'duànliàn', 'Exercise / train the body. The general-purpose word for any physical training, from a morning walk to weightlifting. Older and broader than 健身; the word a teacher or doctor would use.', 'word', '为了健康，我每天都锻炼。 wèile jiànkāng, wǒ měi tiān dōu duànliàn.', '"For health, I exercise every day." — preview of the 为了 grammar pattern coming in Activity 6.', null, [ACT.vocabularyWellness]),
    createContentItem('跑步', 'pǎobù', 'Running / to run. The single most popular fitness activity among urban Chinese millennials; 跑步打卡 (running check-in) is a daily Instagram-like ritual on 朋友圈. Distinct from 散步 (sànbù, "walk") and 慢跑 (mànpǎo, "jog").', 'word', '我每天早上跑步五公里。 wǒ měi tiān zǎoshang pǎobù wǔ gōnglǐ.', '"I run five kilometers every morning." — 公里 (gōnglǐ) = kilometer; the standard unit.', null, [ACT.vocabularyWellness]),
    createContentItem('瑜伽', 'yújiā', 'Yoga — a phonetic loanword. Massively popular among urban Chinese women; 瑜伽馆 (yújiā guǎn, "yoga studios") are common in middle-class neighborhoods. Often framed as a 养生 practice rather than a fitness one, since it fits the slow-and-balanced model.', 'word', '我朋友每周练瑜伽。 wǒ péngyou měi zhōu liàn yújiā.', '"My friend practices yoga every week." — 练 (practice) is the standard verb with 瑜伽.', null, [ACT.vocabularyWellness]),
    createContentItem('减肥', 'jiǎnféi', 'Lose weight / dieting. Verb-object compound (literally "reduce-fat"). Top-of-mind concern across age groups; appears constantly in 朋友圈 and product marketing. Be careful with the topic socially — direct comments about someone else\'s weight remain sensitive.', 'word', '我正在减肥，少吃米饭。 wǒ zhèngzài jiǎnféi, shǎo chī mǐfàn.', '"I\'m dieting, eating less rice." — 正在 (zhèngzài) marks ongoing action; 少 + verb = "do less of".', null, [ACT.vocabularyWellness]),
    createContentItem('增肌', 'zēngjī', 'Gain muscle / build muscle. Verb-object compound (literally "increase-muscle"). The newer, gym-influenced counterpart to 减肥; popular among young men and increasingly women.', 'word', '为了增肌，他每天吃鸡胸肉。 wèile zēngjī, tā měi tiān chī jīxiōngròu.', '"To gain muscle, he eats chicken breast every day." — 鸡胸肉 (chicken breast) is the meme food of Chinese gym culture.', null, [ACT.vocabularyWellness]),
    createContentItem('营养', 'yíngyǎng', 'Nutrition / nutritious. Used as both noun ("nutrition") and adjective ("nutritious"). Frame food choices as 有营养 (nutritious) or 没营养 (junk); central to any health-advice conversation.', 'word', '蔬菜很有营养。 shūcài hěn yǒu yíngyǎng.', '"Vegetables are very nutritious." — 有 + noun adjective construction; "have nutrition" = "is nutritious".', null, [ACT.vocabularyWellness]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Vocabulary III: Modern habits, tracking, metrics
    // ────────────────────────────────────────────────────────────────────
    createContentItem('打卡', 'dǎkǎ', 'To check in / track a habit (literally "hit the card"). Originally the verb for clocking in at work; now also means posting a daily proof-of-habit on WeChat moments — running, gym, meditation, language learning, anything. Defines a whole generation\'s wellness culture.', 'word', '我每天跑步打卡。 wǒ měi tiān pǎobù dǎkǎ.', '"I check in for running every day." — the streak is the point; missing a day breaks the social-media ritual.', null, [ACT.vocabularyHabits]),
    createContentItem('步数', 'bùshù', 'Step count. WeChat\'s built-in pedometer means everyone\'s 微信步数 (WeChat step count) is visible to friends; 步数排行榜 (step-count leaderboard) is a daily soft competition. The metric of fitness virtue.', 'word', '今天我的步数过万了! jīntiān wǒ de bùshù guò wàn le!', '"My step count today is over 10,000!" — 过万 (over 10,000) is the unofficial daily goal; widely celebrated.', null, [ACT.vocabularyHabits]),
    createContentItem('朋友圈', 'péngyou quān', 'WeChat moments — the Instagram-equivalent feed inside WeChat where everyone shares photos, thoughts, and especially health-and-fitness updates. 朋友圈晒步数 ("show off step count in moments") is a daily ritual.', 'word', '她每天在朋友圈晒早餐。 tā měi tiān zài péngyou quān shài zǎocān.', '"She shows off her breakfast in moments every day." — 晒 (literally "sun-dry") = post / flex.', null, [ACT.vocabularyHabits]),
    createContentItem('晒', 'shài', 'To show off / post (literally "sun-dry"). The verb for sharing anything you want others to see and admire on social media: 晒娃 (show off kids), 晒步数 (show off step count), 晒健身房 (show off the gym). Slightly tongue-in-cheek when used about yourself.', 'word', '别老晒了，谦虚一点。 bié lǎo shài le, qiānxū yīdiǎn.', '"Stop always flexing, be a bit humble." — 老 (always) carries a complaint; 谦虚 (modest) is the cultural counterweight.', null, [ACT.vocabularyHabits]),
    createContentItem('自律', 'zìlǜ', 'Self-discipline. The aspirational virtue of urban Chinese wellness culture: 早睡早起 (early to bed, early to rise), 每天打卡 (daily check-in), 不熬夜 (no late nights). 自律给我自由 ("self-discipline gives me freedom") is a near-meme slogan.', 'word', '自律是健康的基础。 zìlǜ shì jiànkāng de jīchǔ.', '"Self-discipline is the foundation of health." — classic Chinese wellness column phrasing; 基础 = foundation.', null, [ACT.vocabularyHabits]),
    createContentItem('作息', 'zuòxī', 'Daily routine — specifically the sleep-wake cycle and meal timing. 作息规律 (regular routine) is the gold standard; 作息不规律 (irregular routine) is the diagnosis behind everything from insomnia to indigestion.', 'word', '大学生作息不规律。 dàxuéshēng zuòxī bù guīlǜ.', '"University students have irregular routines." — stock complaint; 不规律 (irregular) is the diagnosis.', null, [ACT.vocabularyHabits]),
    createContentItem('熬夜', 'áoyè', 'Stay up late / pull an all-nighter (literally "endure the night"). Universal student and white-collar habit; widely condemned by 养生 advice yet practiced by nearly everyone. The most discussed unhealthy habit in urban Chinese life.', 'word', '别再熬夜了! bié zài áoyè le!', '"Stop staying up late!" — 别再 (don\'t again) + 了 imperative; a friend\'s standard intervention.', null, [ACT.vocabularyHabits]),
    createContentItem('早睡早起', 'zǎo shuì zǎo qǐ', 'Early to bed, early to rise — a four-character set phrase straight from classical health proverbs. The opposite of 熬夜 and the headline goal of every Chinese wellness column.', 'word', '早睡早起身体好。 zǎo shuì zǎo qǐ shēntǐ hǎo.', '"Early to bed, early to rise — body is good." — full proverb form; common on grandparent posters and wellness ads.', null, [ACT.vocabularyHabits]),
    createContentItem('饮食', 'yǐnshí', 'Diet / eating habits (literally "drinking-eating"). The formal/medical-leaning word for what you eat overall, distinct from a specific meal. Used in health articles and doctor advice: 饮食清淡 (light diet), 饮食均衡 (balanced diet).', 'word', '饮食要均衡。 yǐnshí yào jūnhéng.', '"Diet should be balanced." — 均衡 (jūnhéng, "balanced") is the standard diet-quality adjective.', null, [ACT.vocabularyHabits]),
    createContentItem('习惯', 'xíguàn', 'Habit / be used to. Used as a noun ("a habit") and a verb ("to be used to"). 好习惯 / 坏习惯 (good/bad habit) is the framing every wellness conversation uses to evaluate behavior.', 'word', '熬夜是坏习惯。 áoyè shì huài xíguàn.', '"Staying up late is a bad habit." — 坏习惯 (huài xíguàn) is the cover word for unhealthy behaviors.', null, [ACT.vocabularyHabits]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar I: 为了 + goal
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '为了 + 目的',
      'wèile + mùdì',
      'The pattern 为了 + GOAL + main clause means "in order to GOAL, (do main clause)". Place the 为了-phrase at the START of the sentence; the main clause delivers the action that serves the goal.',
      'sentence',
      '为了健康，我每天跑步。 wèile jiànkāng, wǒ měi tiān pǎobù.',
      '"For (the sake of) health, I run every day." — the textbook example; goal precedes action.',
      [
        { target: '为了 wèile', note: '"in order to / for the sake of" — sentence-initial marker of purpose' },
        { target: '为了 + NOUN', note: 'works with a single noun: 为了健康 (for health), 为了考试 (for the exam)' },
        { target: '为了 + V phrase', note: 'works with a verb phrase: 为了减肥 (to lose weight), 为了通过考试 (to pass the exam)' },
        { target: 'word order', note: 'GOAL clause comes FIRST; main clause follows — reversing this is grammatically odd in Mandarin' },
      ],
      [ACT.grammarWeile],
    ),
    createContentItem(
      '为了 vs 因为',
      'wèile vs yīnwèi',
      'CRITICAL learner trap: both 为了 and 因为 can sometimes translate as "because" or "for" in English, but they are NOT interchangeable. 为了 = forward-looking PURPOSE (a goal you are working toward). 因为 = backward-looking CAUSE (a reason that already exists).',
      'sentence',
      '为了健康，我跑步。 (purpose: my goal IS health, so I run)\n因为生病，我没去。 (cause: BECAUSE I got sick, I didn\'t go)',
      'If you can replace it with "in order to", use 为了. If you can replace it with "because" (looking back), use 因为.',
      [
        { target: '为了 → "in order to"', note: 'forward-looking purpose; goal is in the future' },
        { target: '因为 → "because"', note: 'backward-looking cause; reason is in the past or present' },
        { target: 'common error', note: 'using 为了 for past causes ("为了我生病…") is ungrammatical — that\'s 因为 territory' },
      ],
      [ACT.grammarWeile],
    ),
    createContentItem(
      '为了 + verb phrase',
      'wèile + V phrase',
      'When the goal is an action (not just a noun), use 为了 + full verb phrase: 为了减肥 (to lose weight), 为了通过考试 (to pass the exam), 为了增加步数 (to increase step count). Common in wellness contexts where the goal IS a specific outcome.',
      'sentence',
      '为了减肥，她既不吃甜点也不喝奶茶。 wèile jiǎnféi, tā jì bù chī tiándiǎn yě bù hē nǎichá.',
      '"To lose weight, she neither eats desserts nor drinks bubble tea." — preview of the 既不…也不… pattern in Activity 8.',
      [
        { target: '为了减肥', note: '"to lose weight"; verb phrase as goal' },
        { target: '为了增肌', note: '"to gain muscle"; common gym-culture goal' },
        { target: '为了考好', note: '"to do well on the exam"; 考好 = exam-do-well' },
      ],
      [ACT.grammarWeile],
    ),
    createContentItem(
      '为了 + person',
      'wèile + person',
      'A second use of 为了: + PERSON means "for the sake of (that person)". Common in family/relationship contexts: 为了孩子 (for the children), 为了家人 (for the family). Often pairs with personal sacrifices.',
      'sentence',
      '为了家人，他不再熬夜了。 wèile jiārén, tā bù zài áoyè le.',
      '"For his family, he no longer stays up late." — sacrifice framing common in Chinese filial culture.',
      [
        { target: '为了孩子', note: '"for the children" — most common family motivation phrase' },
        { target: '为了父母', note: '"for parents" — filial duty framing' },
        { target: '为了自己', note: '"for myself" — newer individualist framing, increasingly common with millennials' },
      ],
      [ACT.grammarWeile],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar II: 通过 + means + 来 V
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '通过 + 手段 + 来 + V',
      'tōngguò + means + lái + V',
      'The pattern 通过 + MEANS + 来 + VERB means "through MEANS, (do VERB)". Use it to specify HOW you accomplish something. The 来 is a grammatical linker connecting means to action — it is NOT the verb "come" here.',
      'sentence',
      '通过跑步来减肥。 tōngguò pǎobù lái jiǎnféi.',
      '"Lose weight through running." — the means (跑步) is what you do; the action/result (减肥) is the goal.',
      [
        { target: '通过 tōngguò', note: '"through / by means of" — introduces the means' },
        { target: 'means', note: 'usually a verb or verb phrase: 跑步, 健身, 早睡, 吃蔬菜' },
        { target: '来 lái', note: 'grammatical linker — NOT the verb "come"; do not translate it directly' },
        { target: 'V', note: 'the action or result the means accomplishes: 减肥, 增肌, 放松, 健康' },
      ],
      [ACT.grammarTongguo],
    ),
    createContentItem(
      '通过 + noun means',
      'tōngguò + noun means',
      '通过 also works with a NOUN as the means, not just a verb: 通过运动 (through exercise), 通过食疗 (through food therapy), 通过中药 (through Chinese medicine). The structure is the same: 通过 NOUN 来 V.',
      'sentence',
      '通过食疗来调理身体。 tōngguò shíliáo lái tiáolǐ shēntǐ.',
      '"Use food therapy to balance the body." — 调理 (tiáolǐ, "regulate / balance") is a 养生-domain verb; classic TCM framing.',
      [
        { target: '通过运动', note: '"through exercise" — generic and widely used' },
        { target: '通过食疗', note: '"through food therapy" — 养生 framing' },
        { target: '通过冥想', note: '"through meditation" (冥想 míngxiǎng) — newer wellness framing' },
      ],
      [ACT.grammarTongguo],
    ),
    createContentItem(
      '为了 + 通过 combo',
      'wèile + tōngguò combo',
      'The two patterns combine naturally: 为了 GOAL，我通过 MEANS 来 V. This single sentence covers BOTH the goal AND the means — a complete wellness-plan sentence.',
      'sentence',
      '为了健康，我通过跑步来锻炼身体。 wèile jiànkāng, wǒ tōngguò pǎobù lái duànliàn shēntǐ.',
      '"For (my) health, I exercise (my) body through running." — full means-goal sentence; the model template for the writing activity.',
      [
        { target: '为了健康 (goal)', note: 'the larger purpose; introduced first' },
        { target: '通过跑步 (means)', note: 'the specific method; comes second' },
        { target: '来锻炼身体 (action)', note: 'the action the means accomplishes; closes the sentence' },
      ],
      [ACT.grammarTongguo],
    ),
    createContentItem(
      '通过 vs 用',
      'tōngguò vs yòng',
      'Both 通过 and 用 (yòng, "use") can introduce means, but the register differs. 用 is everyday and concrete (用筷子 "use chopsticks"); 通过 is more abstract and method-oriented (通过锻炼 "through exercise"). Use 通过 for processes and methods, 用 for tools and instruments.',
      'sentence',
      '用筷子吃 (concrete tool) vs 通过运动减肥 (abstract method)',
      'A method like exercise, study, or therapy takes 通过; a physical tool like chopsticks or a phone takes 用.',
      [
        { target: '用 + tool/instrument', note: 'concrete: 用刀切 (cut with a knife), 用手机看 (look with the phone)' },
        { target: '通过 + method/process', note: 'abstract: 通过学习 (through study), 通过沟通 (through communication)' },
      ],
      [ACT.grammarTongguo],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Grammar III: 既不…也不…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '既不…也不…',
      'jì bù … yě bù …',
      'The pattern 既不 X 也不 Y means "neither X nor Y". Place 既不 immediately before the first negated item and 也不 immediately before the second. The two items must be PARALLEL — both verbs, or both adjectives.',
      'sentence',
      '我既不抽烟也不喝酒。 wǒ jì bù chōuyān yě bù hē jiǔ.',
      '"I neither smoke nor drink." — the textbook example; two parallel verb phrases.',
      [
        { target: '既不 jì bù', note: '"neither" — comes before the FIRST negated item' },
        { target: '也不 yě bù', note: '"nor" — comes before the SECOND negated item' },
        { target: 'parallel structure', note: 'both items must be the same part of speech: 既不 V 也不 V, or 既不 ADJ 也不 ADJ' },
      ],
      [ACT.grammarJibu],
    ),
    createContentItem(
      '既不…也不… with adjectives',
      'jì bù … yě bù … with adjectives',
      'When the two negated items are ADJECTIVES, drop the 是 between subject and adjective (Mandarin adjectives are stative verbs and don\'t need a copula). 这道菜既不咸也不辣 ("This dish is neither salty nor spicy").',
      'sentence',
      '这道菜既不咸也不辣，很适合养生。 zhè dào cài jì bù xián yě bù là, hěn shìhé yǎngshēng.',
      '"This dish is neither salty nor spicy — perfect for health-cultivation." — 适合 (shìhé) = "suitable for"; classic 养生 dish description.',
      [
        { target: 'adjective + adjective', note: '既不咸也不辣 — both 咸 (salty) and 辣 (spicy) are adjectives' },
        { target: 'no 是 needed', note: 'Mandarin adjectives behave like verbs; no copula required' },
      ],
      [ACT.grammarJibu],
    ),
    createContentItem(
      '既不…也不… for politely declining',
      'jì bù … yě bù … for politely declining',
      'A natural use case: when someone offers you unhealthy options and you want to decline politely without sounding preachy. Listing your habits factually with 既不…也不… is less judgmental than "I don\'t do that" or "that\'s bad for you".',
      'sentence',
      'A: 来杯酒吧! — B: 谢谢，我既不喝酒也不抽烟。',
      '"A: Have a drink! — B: Thanks, I neither drink nor smoke." — declines without moralizing about the offer.',
      [
        { target: '谢谢 + 既不…也不…', note: 'soft-decline framing: thank the offerer first, then state your habit factually' },
        { target: 'tone neutral', note: 'the structure is neutral — neither preachy nor apologetic; just stating habits' },
      ],
      [ACT.grammarJibu],
    ),
    createContentItem(
      '既…也… (positive version)',
      'jì … yě … (positive version)',
      'Remove the 不 from both halves to get the POSITIVE version: 既 X 也 Y = "both X and Y" or "X as well as Y". A natural pair worth knowing for symmetry.',
      'sentence',
      '我既爱跑步也爱瑜伽。 wǒ jì ài pǎobù yě ài yújiā.',
      '"I love both running and yoga." — the positive parallel to 既不…也不…; useful when listing two things you DO embrace.',
      [
        { target: '既 X 也 Y (positive)', note: '"both X and Y" — affirmative version' },
        { target: '既不 X 也不 Y (negative)', note: '"neither X nor Y" — negative version' },
        { target: 'symmetry', note: 'one structure, two flavors — knowing both lets you affirm and decline with the same grammar' },
      ],
      [ACT.grammarJibu],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '清华健康专栏',
      'Qīnghuá jiànkāng zhuānlán',
      'A short health-advice article from Tsinghua\'s campus magazine. Reading it aloud trains you to apply all three Level 2 Unit 2 grammar patterns in continuous prose and to recognize the wellness vocabulary in context.',
      'sentence',
      '同学们好！为了健康，我们应该养成好习惯。第一，要早睡早起，不要熬夜。第二，可以通过跑步或者瑜伽来锻炼身体。第三，饮食要均衡，既不要吃太多甜食也不要吃太多油腻的东西。最后，压力大的时候，可以试试太极或者按摩。希望大家身体健康，学习进步！',
      'Translation: "Hello classmates! For health, we should cultivate good habits. First, go to bed early and rise early — don\'t stay up late. Second, you can exercise the body through running or yoga. Third, your diet should be balanced — neither eat too many sweets nor too many oily things. Finally, when stress is high, try tai chi or massage. Wishing everyone good health and academic progress!"',
      [
        { target: '为了健康 (Grammar I)', note: 'opens the article with the purpose pattern; frames everything that follows' },
        { target: '通过跑步或者瑜伽来锻炼身体 (Grammar II)', note: 'specifies two means (running, yoga) for one action (exercise)' },
        { target: '既不要吃太多甜食也不要吃太多油腻的东西 (Grammar III)', note: 'declines two parallel unhealthy options factually' },
        { target: '养成好习惯 yǎngchéng hǎo xíguàn', note: '"cultivate good habits"; 养成 = "to develop/cultivate"; high-frequency wellness collocation' },
        { target: '学习进步 xuéxí jìnbù', note: '"progress in study"; standard closing for any Chinese student-facing message' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions matching the article. Answer each in a short sentence using the relevant grammar pattern; complete sentences are encouraged for grammar practice.',
      'sentence',
      'Q1: 为什么我们要早睡早起? Q2: 我们可以通过什么来锻炼身体? Q3: 饮食应该怎么样? Q4: 压力大的时候应该做什么?',
      'Each question targets one or more of the lesson\'s grammar patterns.',
      [
        { target: 'A1: 为了健康。', note: 'or: 为了身体好。— 为了 + goal answer' },
        { target: 'A2: 通过跑步或者瑜伽来锻炼。', note: '通过…来… complete sentence answer' },
        { target: 'A3: 既不要吃太多甜食也不要吃太多油腻的东西。', note: '既不…也不… answer; or simpler: 应该均衡' },
        { target: 'A4: 可以试试太极或者按摩。', note: '试试 (try-try) reduplication softens the suggestion' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '室友的健康计划',
      'shìyǒu de jiànkāng jìhuà',
      'A natural 8-turn conversation between two close Tsinghua roommates discussing exhaustion, stress, and three concrete lifestyle changes. Casual register throughout (no 您, sentence-final 啊/吧, abbreviated 咱们).',
      'conversation',
      'A: 哎，最近我压力太大了，每天都失眠。\nB: 我也是! 上周熬了三天夜，头疼得不行。咱们得改一改了。\nA: 对啊。为了健康，我想做三件事。第一，每天早睡早起。\nB: 我支持! 我也不熬夜了。第二呢?\nA: 第二，通过跑步来锻炼身体。每天早上六点，跑操场两圈。\nB: 太好了! 咱们一起打卡。第三是什么?\nA: 第三，饮食要均衡。我决定既不喝奶茶也不吃外卖。\nB: 哇，你太自律了! 行，咱们一起坚持一个月，朋友圈互相监督。',
      'Translation: A: "I\'ve been so stressed lately, I have insomnia every night." B: "Me too! I pulled three all-nighters last week — my head hurt like crazy. We need to make changes." A: "Right. For health, I want to do three things. First, early to bed, early to rise every day." B: "I support that! I won\'t stay up late either. What\'s second?" A: "Second, exercise the body through running. Every morning at six, two laps around the track." B: "Great! Let\'s check in together." A: "Third — diet should be balanced. I\'ve decided to neither drink bubble tea nor order takeout." B: "Wow, you\'re so disciplined! Okay, let\'s commit for a month, supervise each other on WeChat moments."',
      [
        { target: '哎 ài', note: 'sentence-opening sigh/exclamation; casual register marker between close friends' },
        { target: '熬了三天夜', note: '"pulled three all-nighters"; 熬夜 split for emphasis with the duration in the middle' },
        { target: '为了健康 (Grammar I)', note: 'A introduces all three changes under the umbrella of this goal' },
        { target: '通过跑步来锻炼身体 (Grammar II)', note: 'A\'s second change uses the means pattern explicitly' },
        { target: '既不喝奶茶也不吃外卖 (Grammar III)', note: 'A\'s third change declines two parallel unhealthy options' },
        { target: '打卡 dǎkǎ', note: 'check-in / habit-track; here used for joint accountability' },
        { target: '互相监督 hùxiāng jiāndū', note: '"supervise each other"; common accountability framing in Chinese habit culture' },
        { target: '坚持 jiānchí', note: '"persevere / stick with it"; the keyword of habit formation in Chinese wellness discourse' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '挑战 — 反对方',
      'tiǎozhàn — fǎnduì fāng',
      'Stretch goal: take the OPPOSITE role and gently push back on your roommate\'s plan. Use 既不…也不… to list what you\'re NOT willing to give up, and 通过… to propose a more moderate alternative. Closes with a compromise.',
      'conversation',
      'A: 我决定既不喝奶茶也不吃外卖。\nB: 哎，太严格了吧! 我既不想戒奶茶也不想戒外卖。咱们能不能宽松一点?\nA: 那你想怎么办?\nB: 我想通过减少次数来调整 — 一周喝一次奶茶，一周点两次外卖，可以吗?\nA: 行啊，重要的是坚持。咱们写下来，朋友圈打卡!',
      'A real conversation rarely ends in total agreement; this version models the negotiation that actually happens.',
      [
        { target: '太严格了吧 tài yángé le ba', note: '"too strict, isn\'t it" — 吧 sentence-final particle softening the pushback' },
        { target: '戒 jiè', note: '"to quit / give up (a habit)"; 戒奶茶 (quit bubble tea), 戒烟 (quit smoking)' },
        { target: '通过减少次数来调整', note: '"adjust through reducing the frequency" — counter-proposal using Grammar II' },
        { target: '写下来 xiě xiàlái', note: '"write it down"; the formalize-the-agreement step common in habit pact culture' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable 5-sentence weekly wellness plan template. Fill in the bracketed slots with your own specifics; the structure already deploys all three Level 2 Unit 2 grammar patterns.',
      'sentence',
      '为了 [大目标]，我打算做五件事。第一，[睡眠计划]。第二，通过 [运动方式] 来 [锻炼目标]。第三，饮食方面，我既不 [不健康习惯1] 也不 [不健康习惯2]。第四，[心理健康方法]。第五，每天在朋友圈打卡，自律一点。',
      'Five slots cover the five wellness pillars: overall goal, sleep, exercise, diet, mental health — plus the social-accountability closing.',
      [
        { target: '[大目标]', note: '健康 / 减肥 / 增肌 / 减压 — the larger goal that frames all five changes' },
        { target: '[睡眠计划]', note: '早睡早起 / 不熬夜 / 每天睡八小时 — a concrete sleep change' },
        { target: '[运动方式] + [锻炼目标]', note: 'means + action: 跑步来锻炼 / 瑜伽来放松 / 健身来增肌' },
        { target: '[不健康习惯1] + [不健康习惯2]', note: 'two parallel things you\'ll avoid: 喝奶茶 + 吃外卖, 抽烟 + 喝酒, 熬夜 + 玩手机' },
        { target: '[心理健康方法]', note: 'one mental-health practice: 冥想 / 太极 / 跟朋友聊天 / 写日记' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 5-sentence wellness plan using the template. Required: at least one 为了 phrase, at least one 通过…来… phrase, and at least one 既不…也不… phrase — all three grammar patterns proven in one short piece.',
      'sentence',
      '示例: 为了健康，我打算做五件事。第一，每天晚上十一点前睡觉。第二，通过跑步来锻炼身体，每周三次。第三，饮食方面，我既不喝奶茶也不吃油炸食品。第四，压力大的时候，我会做瑜伽放松。第五，每天在朋友圈打卡，让朋友监督我。',
      'Translation: "For health, I plan to do five things. First, sleep before 11 PM every night. Second, exercise through running, three times a week. Third, regarding diet, I neither drink bubble tea nor eat fried food. Fourth, when stress is high, I\'ll do yoga to relax. Fifth, check in on WeChat moments every day, let friends supervise me."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '养生哲学',
      'yǎngshēng zhéxué',
      '养生 (yǎngshēng, "nurturing life") is a centuries-old Chinese health philosophy rooted in Traditional Chinese Medicine, Daoist thought, and seasonal-agricultural rhythms. The core principle is PREVENTION through BALANCE: balance of yin and yang, of cold and hot foods, of activity and rest, of work and recovery. The goal is not peak performance but long-term harmony with the body and the seasons.',
      'sentence',
      'Classic 养生 prescriptions: drink hot water (never iced), don\'t wash hair at night, eat 滋补 (nourishing) foods in winter, take naps after lunch, practice tai chi at dawn.',
      'Chinese grandparents are the primary teachers of 养生; their daily advice can sound superstitious to Western ears but maps onto coherent TCM theory.',
      [
        { target: '预防为主 yùfáng wéi zhǔ', note: '"prevention as the priority" — the core 养生 slogan; do not wait until sick to act' },
        { target: '阴阳平衡 yīnyáng pínghéng', note: 'balance of yin (cold/passive) and yang (hot/active); applies to food, activity, and emotion' },
        { target: '顺应自然 shùnyìng zìrán', note: '"go along with nature" — eat seasonally, sleep with the sun, rest in winter' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '养生 vs Western wellness',
      'yǎngshēng vs Western wellness',
      'The two systems share a goal but differ in mindset. WESTERN WELLNESS frames health as performance: optimize, hack, track, peak. 养生 frames health as harmony: maintain, balance, prevent, age gracefully. Both have a place; many urban Chinese millennials blend them — gym in the morning, 中药 in the evening.',
      'sentence',
      'Western: 每周三次健身房，目标减脂10%。\n养生: 每天早睡早起，喝热水，跟着季节吃。',
      'Neither system has a monopoly on truth; the most sophisticated urban Chinese wellness practice is a deliberate mix.',
      [
        { target: 'Western wellness', note: 'performance-focused: metrics, hacks, optimization, peak outcomes' },
        { target: '养生 yǎngshēng', note: 'harmony-focused: prevention, balance, seasonal rhythm, longevity' },
        { target: 'hybrid practice', note: 'common among urban millennials: gym + acupuncture, fitness tracker + herbal tea' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '都市健身热潮',
      'dūshì jiànshēn rècháo',
      'The rise of urban fitness culture among Chinese millennials and Gen Z is one of the major lifestyle shifts of the last decade. Boutique gyms, yoga studios, 健身环 (fitness rings), and personal trainers fill major cities. The 自律给我自由 ("self-discipline gives me freedom") slogan defines a generation that frames fitness as social-class signaling, mental-health management, and a corrective to office sedentary life.',
      'sentence',
      '一二线城市的年轻人爱泡健身房。 yī èr xiàn chéngshì de niánqīng rén ài pào jiànshēnfáng.',
      '"Young people in tier-1 and tier-2 cities love hanging out at the gym." — 泡 (pào, "soak / hang out") for spending long hours somewhere.',
      [
        { target: '一二线城市', note: 'tier-1 and tier-2 cities (Beijing, Shanghai, Shenzhen, Guangzhou + provincial capitals); where the trend is strongest' },
        { target: '自律给我自由', note: '"self-discipline gives me freedom" — near-meme wellness slogan; appears on T-shirts, gym walls, and WeChat moments' },
        { target: '健身房 jiànshēnfáng', note: 'gym; both chain (乐刻, 超级猩猩) and boutique studios are common in cities' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '清华跑操',
      'Qīnghuá pǎocāo',
      'Tsinghua University maintains a famous 跑操 (pǎocāo, "morning running drill") tradition: students gather at dawn to run laps together on the track or stadium. Originating in mid-20th-century PE policy, it survives at Tsinghua as a campus identity ritual — half exercise, half discipline-building, half social bonding. The slogan "为祖国健康工作五十年" ("work healthily for the motherland for fifty years") was coined here.',
      'sentence',
      '清华学生每天早上六点跑操。 Qīnghuá xuéshēng měi tiān zǎoshang liù diǎn pǎocāo.',
      '"Tsinghua students run morning drill every day at 6 AM." — though attendance is enforced less strictly now, the tradition remains a campus identity marker.',
      [
        { target: '跑操 pǎocāo', note: '"morning running drill"; a Tsinghua institution since the mid-20th century' },
        { target: '为祖国健康工作五十年', note: 'Tsinghua\'s famous fitness slogan: "work healthily for the motherland for fifty years" — coined by President Jiang Nanxiang in the 1950s' },
        { target: 'cultural bridge', note: 'old-school "exercise as duty" mindset blending with new "exercise as lifestyle" — the Tsinghua case' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '朋友圈晒步数',
      'péngyou quān shài bùshù',
      'A daily ritual of urban Chinese fitness culture: posting your 微信步数 (WeChat step count) on 朋友圈 (moments) to flex discipline. WeChat\'s pedometer makes everyone\'s daily step count visible to friends; 步数排行榜 (the step-count leaderboard) generates soft daily competition. Over 10,000 steps is the unofficial bragging threshold.',
      'sentence',
      '今天我步数过万，发个朋友圈! jīntiān wǒ bùshù guò wàn, fā ge péngyou quān!',
      '"My step count is over 10K today, time for a moments post!" — the standard ritual; 发 (fā) = post/send.',
      [
        { target: '过万 guò wàn', note: '"over 10,000"; the unofficial daily step-count goal and bragging threshold' },
        { target: '步数排行榜 bùshù páihángbǎng', note: 'step-count leaderboard; WeChat\'s built-in social pressure mechanism' },
        { target: '晒 shài', note: 'show off / flex; literally "sun-dry" — the verb for any social-media boast' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 13 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 跟室友谈健康',
      'rènwù: gēn shìyǒu tán jiànkāng',
      'Roleplay a 6-turn conversation with the tutor playing your Tsinghua roommate. Both of you are mid-semester exhausted. Propose three specific changes (sleep, exercise, diet) using 为了 + goal AND 通过 + means; decline one unhealthy option using 既不…也不…; close with a concrete agreement to 打卡 together for one week.',
      'conversation',
      '[Dorm room, Tsinghua, 11 PM, both of you on laptops]\n室友: 哎，我最近压力太大了，每天失眠。你怎么样?\n你: [acknowledge + state your own symptom]\n室友: 咱们得改一改了。你有什么想法?\n你: [propose change 1 using 为了 + goal]\n室友: 不错! 还有呢?\n你: [propose change 2 using 通过 + means + 来 V]\n室友: 我支持。第三个呢?\n你: [propose change 3 using 既不…也不…]\n室友: 哇，你太自律了!\n你: [close with a 打卡 agreement for one week]',
      'Six turns of natural exchange; the tutor will respond naturally to whatever you propose.',
      [
        { target: 'Turn 2 — acknowledge', note: 'use 我也是 / 我也一样 + a symptom (失眠 / 头疼 / 压力大 / 焦虑) — show common ground first' },
        { target: 'Turn 4 — change 1 with 为了', note: 'frame as 为了 [goal]，我要 [action] — sleep change is the easiest first item' },
        { target: 'Turn 6 — change 2 with 通过…来…', note: 'frame as 我想通过 [means] 来 [action] — exercise change is the natural second' },
        { target: 'Turn 8 — change 3 with 既不…也不…', note: 'frame as 我决定既不 [habit1] 也不 [habit2] — diet decline is the natural third' },
        { target: 'Turn 10 — 打卡 agreement', note: 'close with 咱们一起打卡 / 朋友圈互相监督 — joint accountability is the natural ending' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 加入养生元素',
      'tiǎozhàn — jiārù yǎngshēng yuánsù',
      'Stretch goal: in the same conversation, work in at least ONE traditional 养生 element alongside the modern fitness ones. The mix of old and new is what makes urban Chinese wellness talk sound authentic — pure gym talk sounds Western-imported; pure 养生 talk sounds elderly.',
      'conversation',
      '你: 为了健康，我打算做三件事。第一，每天早睡早起。第二，通过跑步和太极来锻炼 — 跑步增肌，太极养心。第三，饮食方面，我既不喝奶茶也不吃油炸的，但是会喝点中药调理一下。\n室友: 你这是中西结合啊!',
      '"You\'re doing East-meets-West!" — 中西结合 (zhōng xī jiéhé) is the standard phrase for blending Chinese and Western approaches; flatters the speaker as sophisticated.',
      [
        { target: '中西结合 zhōng xī jiéhé', note: '"East-meets-West combination"; the prestige framing for mixing traditional and modern wellness practices' },
        { target: '跑步增肌，太极养心', note: 'parallel four-character structure: each practice paired with its benefit — running for muscle, tai chi for heart/mind' },
        { target: '调理一下', note: '"balance/regulate a bit"; 调理 is the signature 养生 verb; -一下 softens to "give it a try"' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
