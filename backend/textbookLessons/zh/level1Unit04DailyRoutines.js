// Level 1 Unit 4 — Daily Routines (Mandarin Chinese)
// Functions: describing daily activities, telling clock time, asking what
// time someone does something, stating frequency (always / often /
// sometimes / never), and contrasting habitual vs ongoing vs completed
// actions with 在/正在 and 了.
//
// All content is authored with Hanzi (target) + Pinyin (romanization) +
// English glosses (canonical source). The AI conversation tutor reads this
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
  orientation: 'zh-l1u4-orientation',
  pronunciation: 'zh-l1u4-pronunciation',
  vocabularyActivities: 'zh-l1u4-vocab-activities',
  vocabularyTime: 'zh-l1u4-vocab-time',
  grammarClock: 'zh-l1u4-grammar-clock',
  grammarFrequency: 'zh-l1u4-grammar-frequency',
  grammarAspect: 'zh-l1u4-grammar-aspect',
  reading: 'zh-l1u4-reading',
  listening: 'zh-l1u4-listening',
  writing: 'zh-l1u4-writing',
  culture: 'zh-l1u4-culture',
  task: 'zh-l1u4-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Describe your weekday and weekend routines using 15+ daily-activity verbs in 3-5 sentences.',
      'Tell and ask clock time with 几点 + X 点 Y 分, including 半 (half past) and 一刻 (quarter past).',
      'Use frequency adverbs (总是 / 经常 / 有时候 / 偶尔 / 很少 / 从不) in the correct pre-verb position.',
      'Contrast habitual, ongoing (在/正在), and completed (了) actions for the same verb.',
    ],
    task: 'Picture meeting a new Chinese roommate at Tsinghua. By the end of this lesson you should describe a full weekday-and-weekend rhythm to them in Mandarin without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Apply third-tone sandhi to 几点 (jǐ diǎn → spoken jí diǎn) — both syllables are third tone, so the first shifts to a rising tone.',
      'Produce the retroflex initial r- in 日 (rì) cleanly; it is closer to a buzzed "zh" than to American "r".',
      'Drop the tone on 们 (men) in 我们 / 你们 / 他们 — neutral tone is light and short, not a separate full syllable.',
      'Hear the ongoing-action marker 在 (zài) clearly when it precedes a verb — 我在吃饭 vs 我吃饭 differ only by 在.',
    ],
    task: 'Read each example aloud and identify whether sandhi applies or a neutral tone reduces; then pronounce the spoken version (not the written tones).',
  },
  {
    id: ACT.vocabularyActivities,
    section: 'Vocabulary I',
    title: 'Daily-activity verbs',
    goals: [
      'Memorize 15+ everyday activity verbs covering morning hygiene, meals, study/work, and evening routine.',
      'Notice the verb + object structure: 吃饭, 上课, 做作业 — many activity "verbs" in Mandarin are actually verb+object pairs that can be split.',
    ],
    task: 'List your top five daily activities in Mandarin in the order you do them.',
  },
  {
    id: ACT.vocabularyTime,
    section: 'Vocabulary II',
    title: 'Times of day and days of the week',
    goals: [
      'Use the six time-of-day blocks (早上 / 上午 / 中午 / 下午 / 晚上 / 半夜) and know where they overlap in real Chinese usage.',
      'Use the seven days of the week (星期一 through 星期日) and the three relative-day words (昨天 / 今天 / 明天) without a preposition.',
    ],
    task: 'Pair each time block with one activity from Vocabulary I (e.g., 早上 → 起床; 中午 → 吃午饭).',
  },
  {
    id: ACT.grammarClock,
    section: 'Grammar I',
    title: 'Clock time and 几点 questions',
    goals: [
      'Tell time with X 点 (X o\'clock), X 点 Y 分 (X:Y), X 点半 (half past X), and X 点一刻 (quarter past X).',
      'Ask the time of an activity with 你几点 + Verb? — the question word 几点 stays in the same position the time answer would occupy, NO movement to the front.',
      'Place time expressions BEFORE the verb: 我七点起床 (correct), NOT 我起床七点.',
    ],
    task: 'Write four sentences telling the times of your four most regular daily activities; then turn them into 几点 questions.',
  },
  {
    id: ACT.grammarFrequency,
    section: 'Grammar II',
    title: 'Frequency adverbs (总是 / 经常 / 有时候 / 偶尔 / 很少 / 从不)',
    goals: [
      'Use six frequency adverbs on the always-to-never scale and place each one BEFORE the verb.',
      'Distinguish 经常 (often, habitual) from 有时候 (sometimes, occasional) and 偶尔 (once in a while) from 很少 (rarely) — adjacent-sounding adverbs that signal real frequency differences.',
      'Combine 从不 + verb to make absolute-never statements; 不 is part of the adverb here, no separate negation needed.',
    ],
    task: 'Build a six-line frequency ladder for your own habits: one line each for 总是, 经常, 有时候, 偶尔, 很少, 从不.',
  },
  {
    id: ACT.grammarAspect,
    section: 'Grammar III',
    title: 'Aspect markers: 在/正在 (ongoing) and 了 (completion)',
    goals: [
      'Mark an ongoing action with 在 or 正在 placed BEFORE the verb: 我在吃饭 ("I am eating right now").',
      'Mark a completed action with 了 placed AFTER the verb or at the end of the sentence: 我吃了 ("I have eaten / I ate").',
      'Contrast three forms of the same verb: 我吃饭 (habitual "I eat"), 我在吃饭 (ongoing "I am eating"), 我吃了 (completed "I have eaten") — Mandarin uses aspect (not tense) to mark these differences.',
    ],
    task: 'Pick one verb and write all three aspect versions (habitual, ongoing, completed) in three sentences.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'A Tsinghua student\'s day',
    goals: [
      'Read a daily-schedule paragraph about a Tsinghua University student with correct tones and natural rhythm.',
      'Answer comprehension questions about times, places, and activities using complete short Mandarin sentences.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Comparing schedules',
    goals: [
      'Follow a 4-turn dialogue where two students compare their daily schedules and identify time/frequency contrasts.',
      'Reproduce the structure with your own activities, swapping in the relevant times and frequency words naturally.',
    ],
    task: 'Read the dialogue along with the AI tutor first, then perform it again with your own daily schedule swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own daily routine',
    goals: [
      'Write 5-7 sentences in Hanzi describing a typical day, using at least three time expressions and two frequency adverbs.',
      'Include at least one ongoing-action sentence with 在 and one completion sentence with 了 so the writing demonstrates aspect.',
    ],
    task: 'Write your own daily-routine paragraph in 5-7 sentences using the model on the left, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Chinese student-day rhythm',
    goals: [
      'Understand the 午休 (midday nap) tradition: most schools and many workplaces still observe a long lunch break with a real nap.',
      'Recognize the high-school 早自习 (early self-study) culture: students arrive at 7:00 or earlier for supervised reading before class.',
      'Know the cultural backdrop of 996 work culture — the controversial 9 AM to 9 PM, 6-days-a-week schedule debated in the Chinese tech industry.',
    ],
    task: 'Pick one element of Chinese student/work-day rhythm and describe how it differs from your own routine.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Telling a new Tsinghua roommate about your day',
    goals: [
      'Combine vocabulary, clock time, frequency adverbs, and at least one aspect marker (在 or 了) in one continuous scene.',
      'Ask your roommate the same questions back using 你几点…? and 你常常…吗? so the conversation flows in both directions.',
    ],
    task: 'Roleplay your first week at Tsinghua with the AI tutor playing a new Chinese roommate; aim for a 6-turn exchange comparing schedules.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 4: 我的一天 — Daily Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-daily-activities', label: 'Describing daily activities', goal: 'Use clock time + activity verbs to describe what you do at different points in your day, in 2-3 connected sentences.' },
    { id: 'asking-what-time', label: 'Asking what time someone does something', goal: 'Use 你几点 + Verb? to ask the time of a specific activity, then answer with X 点 (Y 分).' },
    { id: 'stating-frequency', label: 'Stating how often you do something', goal: 'Use a pre-verb frequency adverb (常常 / 有时候 / 从不) to say how often you do an activity.' },
    { id: 'contrasting-aspect', label: 'Saying what you ARE doing vs HAVE done', goal: 'Use 在/正在 + Verb for an action in progress and Verb + 了 for one already completed; contrast both with the plain habitual form.' },
  ],
  relatedPools: ['topic-people', 'topic-school'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson you can describe your daily and weekly routine in Mandarin, tell and ask clock time, state how often you do something, and distinguish habitual, ongoing, and completed actions — the four skills that together unlock present-tense conversation about everyday life.',
      'word',
      'Functions: 描述日常 miáoshù rìcháng (describe routine) · 说时间 shuō shíjiān (tell time) · 表示频率 biǎoshì pínlǜ (state frequency) · 区分时态 qūfēn shítài (distinguish aspect)',
      'These four micro-skills are the spine of every daily-life conversation in Mandarin — once they are automatic, every later lesson layers on top of them.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You move into a dorm at Tsinghua University in Beijing and meet your new Chinese roommate. Over the first week you compare schedules — when you each get up, when you have class, how often you exercise, what you usually do on weekends. By the end of this lesson you should be able to handle the whole conversation in Mandarin.',
      'word',
      '室友: "你几点起床? 我七点起床。" — "What time do you get up? I get up at seven."',
      'A typical opener from a Chinese roommate: a 几点 clock-time question immediately followed by their own answer — the standard Mandarin information-exchange rhythm.',
      [
        { target: '室友 shìyǒu', note: 'roommate; very common in Chinese university dorm life where 4-6 students share a room' },
        { target: '你几点起床? nǐ jǐ diǎn qǐchuáng?', note: 'literal: "you what-time get-up?"; the standard daily-routine opening question' },
        { target: '我七点起床 wǒ qī diǎn qǐchuáng', note: 'standard answer pattern: subject + time + verb; note the time BEFORE the verb, unlike English' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '一天的节奏',
      'yī tiān de jiézòu',
      'A typical Mandarin daily-routine description follows the time-block structure: 早上 (morning) → 上午 (late morning) → 中午 (noon, including 午休 nap) → 下午 (afternoon) → 晚上 (evening) → 半夜 (midnight). Each block usually gets one or two activities; the rhythm is consistent across Mainland speakers.',
      'word',
      '早上 7:00 起床 → 上午 9:00 上课 → 中午 12:00 吃午饭 → 下午 2:00 学习 → 晚上 7:00 吃晚饭 → 11:00 睡觉',
      'Six time-block anchors cover almost any daily schedule; learners build sentences around them.',
      [
        { target: '早上 (early morning)', note: 'roughly 5-9 AM; the wake-up and breakfast block' },
        { target: '上午 (late morning)', note: 'roughly 9-noon; the morning-class or morning-work block' },
        { target: '中午 (noon)', note: 'roughly noon-2 PM; lunch plus the traditional 午休 nap' },
        { target: '下午 (afternoon)', note: 'roughly 2-6 PM; the afternoon-class or afternoon-work block' },
        { target: '晚上 (evening)', note: 'roughly 6 PM-midnight; dinner, study, leisure, sleep' },
        { target: '半夜 (midnight / late night)', note: 'roughly midnight-3 AM; the all-nighter or late-shift block' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '几点',
      'jǐ diǎn (spoken: jí diǎn)',
      'Two third tones in a row trigger third-tone sandhi: the first 几 (jǐ) becomes a rising (second) tone, while the second 点 (diǎn) keeps the full third tone. Written tones do not change; only spoken pronunciation does.',
      'word',
      '你几点起床? nǐ jǐ diǎn qǐchuáng? → spoken: nǐ jí diǎn qǐchuáng?',
      'The single most common daily-routine question; the sandhi must be automatic for natural delivery.',
      [
        { target: '几 (written: jǐ, 3rd)', note: 'question word "what / how many"; would be full third tone in isolation' },
        { target: '几 (spoken: jí, 2nd)', note: 'becomes rising because the next syllable is also third tone — sandhi rule' },
        { target: '点 (diǎn, 3rd, unchanged)', note: 'second syllable; keeps the full third-tone dip-and-rise' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '日',
      'rì',
      'The retroflex initial r- is one of the trickiest sounds for English speakers — closer to a buzzed "zh" than to American "r". Curl the tongue tip back as for sh-, then add throat vibration. Appears in many time-of-day words: 日 (sun/day), 星期日 (Sunday), 日记 (diary).',
      'word',
      '今天是星期日 jīntiān shì xīngqī rì ("Today is Sunday")',
      'Not the American English "r"; aim for a buzzy retroflex with curled-back tongue and voicing.',
      [
        { target: '日 rì (sun / day)', note: 'fourth tone; curled-back tongue + buzzed voicing' },
        { target: '日子 rìzi (life / days)', note: 'second syllable neutral; the same retroflex r- in a common compound' },
        { target: '生日 shēngrì (birthday)', note: 'compound where the retroflex r- follows a first-tone syllable; common high-frequency word' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '我们 / 你们 / 他们',
      'wǒmen / nǐmen / tāmen',
      'The plural marker 们 (men) drops to neutral tone in fluent speech — it is light, short, and unstressed. Pronouncing it with a full third tone makes you sound robotic; the natural rhythm is STRONG-weak in each pronoun pair.',
      'word',
      '我们晚上一起吃饭 wǒmen wǎnshang yīqǐ chīfàn ("We eat together in the evening")',
      'The neutral tone on 们 is universal across Mandarin pronouns; the same rule applies to 朋友们, 同学们, 老师们.',
      [
        { target: '我 (wǒ, 3rd) + 们 (men, neutral)', note: 'first syllable carries the tone; second is light and short' },
        { target: '你们 nǐmen', note: 'same pattern — 你 keeps third tone, 们 drops to neutral' },
        { target: '他们 tāmen', note: '他 keeps first tone (high level); 们 still drops to neutral' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '在 / 正在',
      'zài / zhèngzài',
      'The ongoing-action marker 在 (zài, fourth tone, sharp falling) sits directly before the verb. It sounds nearly identical to the preposition 在 ("at"), so word position is your main cue for which meaning is in play. The fuller form 正在 adds emphasis on the "right now" timing.',
      'word',
      '我在吃饭 wǒ zài chīfàn ("I am eating right now") · 我正在学习 wǒ zhèngzài xuéxí ("I am studying right now")',
      'Two pronunciations of "in progress"; both place the marker between the subject and the verb.',
      [
        { target: '在 zài (4th tone)', note: 'ongoing-action marker; sharp falling pitch; placed before the verb' },
        { target: '正在 zhèngzài', note: 'emphatic form; both syllables fourth tone; carries a slightly stronger "this very moment" sense' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '了',
      'le',
      'The completion marker 了 (le) is always pronounced as a neutral-tone particle — light, short, no pitch contour of its own. The pitch is determined by what comes before. Easy to under-pronounce; even neutral particles must still be heard.',
      'word',
      '我吃了 wǒ chī le ("I have eaten / I ate") · 我已经起床了 wǒ yǐjīng qǐchuáng le ("I have already gotten up")',
      'Two grammatical roles share the same pronunciation 了 (le): aspectual (after verb) and modal (sentence-final). Tone is identical in both.',
      [
        { target: '了 le (neutral)', note: 'no tone mark; pitch determined by previous syllable; always short and unstressed' },
        { target: '位置 — after verb', note: 'aspectual 了 marks the verb itself as completed: 吃了 ("ate")' },
        { target: '位置 — sentence-final', note: 'modal 了 marks a new state or change: 我起床了 ("I am up now")' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Daily-activity verbs
    // ────────────────────────────────────────────────────────────────────
    createContentItem('起床', 'qǐchuáng', 'To get up / get out of bed. A verb+object compound: 起 (get up) + 床 (bed). Used at the start of nearly every daily-routine description; pairs naturally with a clock-time expression.', 'word', '我每天七点起床。', '"I get up at 7 every day." — the canonical morning-routine sentence.', null, [ACT.vocabularyActivities]),
    createContentItem('睡觉', 'shuìjiào', 'To go to sleep / sleep. A verb+object compound: 睡 (sleep) + 觉 (sleep, the noun). Used for the end-of-day routine; the verb and object can split (睡了一觉 "took a nap").', 'word', '我晚上十一点睡觉。', '"I go to sleep at 11 PM." — paired with an evening time expression.', null, [ACT.vocabularyActivities]),
    createContentItem('洗澡', 'xǐzǎo', 'To take a shower / bath. Verb+object compound: 洗 (wash) + 澡 (bath). Some speakers split the verb (洗了一个澡 "took a shower"). Used for both morning and evening hygiene contexts.', 'word', '我每天晚上洗澡。', '"I take a shower every evening." — Mainland Chinese students typically shower at night, not morning.', null, [ACT.vocabularyActivities]),
    createContentItem('刷牙', 'shuāyá', 'To brush teeth. Verb+object compound: 刷 (brush) + 牙 (teeth). Used twice a day in the standard hygiene routine; 刷牙 sits naturally alongside 洗脸 (wash face).', 'word', '我早上起床后刷牙。', '"I brush my teeth after getting up in the morning." — typical morning-routine sequence.', null, [ACT.vocabularyActivities]),
    createContentItem('吃早饭', 'chī zǎofàn', 'To eat breakfast. Verb+object construction: 吃 (eat) + 早饭 (breakfast). Note the breakfast vocabulary differs by region — northern speakers often say 早饭, Beijing-area speakers also use 早点.', 'word', '我七点半吃早饭。', '"I eat breakfast at 7:30." — typical breakfast time for a Chinese student.', null, [ACT.vocabularyActivities]),
    createContentItem('吃午饭', 'chī wǔfàn', 'To eat lunch. Verb+object: 吃 + 午饭. Lunch in China is typically the largest meal of the day on weekdays — often followed by the 午休 (midday nap).', 'word', '中午十二点我们吃午饭。', '"We eat lunch at noon." — note 中午 (noon block) used with the clock time for emphasis.', null, [ACT.vocabularyActivities]),
    createContentItem('吃晚饭', 'chī wǎnfàn', 'To eat dinner. Verb+object: 吃 + 晚饭. Dinner is usually eaten earlier in China than in Western Europe — 6 to 7 PM is the standard family time.', 'word', '我们家六点吃晚饭。', '"My family eats dinner at 6." — typical Chinese household timing.', null, [ACT.vocabularyActivities]),
    createContentItem('上课', 'shàngkè', 'To attend class / go to class. Verb+object compound: 上 (go up / attend) + 课 (class). The opposite is 下课 (finish class). Used for both high school and university contexts.', 'word', '我上午九点上课。', '"I go to class at 9 AM." — typical university timetable.', null, [ACT.vocabularyActivities]),
    createContentItem('下课', 'xiàkè', 'To finish class / class ends. Verb+object: 下 (come down / end) + 课. Used both for the student leaving class and the class ending as an event. Common school-day phrase.', 'word', '我们下午五点下课。', '"We finish class at 5 PM." — late-afternoon class-end timing.', null, [ACT.vocabularyActivities]),
    createContentItem('学习', 'xuéxí', 'To study / learn. A two-syllable verb (not a verb+object). Used for the general activity of studying any subject; 学习 is more formal and academic than the colloquial 学.', 'word', '我每天晚上学习两个小时。', '"I study two hours every evening." — note duration phrase after the verb.', null, [ACT.vocabularyActivities]),
    createContentItem('做作业', 'zuò zuòyè', 'To do homework. Verb+object: 做 (do) + 作业 (homework). The two characters sounding alike (zuò + zuòyè) is a useful mnemonic. A daily activity from elementary school through university.', 'word', '我晚上七点开始做作业。', '"I start doing homework at 7 PM." — 开始 (kāishǐ, "start") + 做作业 is a natural pairing.', null, [ACT.vocabularyActivities]),
    createContentItem('锻炼', 'duànliàn', 'To exercise / work out. A general physical-exercise verb; covers running, weights, swimming, and most workouts. The more colloquial near-synonym is 运动 (yùndòng); 锻炼 emphasizes the deliberate training aspect.', 'word', '我每天早上锻炼半小时。', '"I exercise half an hour every morning." — the daily fitness routine.', null, [ACT.vocabularyActivities]),
    createContentItem('看书', 'kànshū', 'To read books / read for leisure. Verb+object: 看 (look at) + 书 (book). Used for reading any book — distinguish from 学习 (study) which specifically means academic study. 看书 includes novels, magazines, and casual reading.', 'word', '晚上我喜欢看书。', '"In the evening I like to read." — a leisure activity, not a study activity.', null, [ACT.vocabularyActivities]),
    createContentItem('看电视', 'kàn diànshì', 'To watch TV. Verb+object: 看 + 电视 (TV). Increasingly replaced by 看手机 (look at phone) or 刷视频 (scroll videos) among younger speakers, but still the standard expression for the activity.', 'word', '我爸爸晚上看电视。', '"My dad watches TV in the evening." — a typical family-evening activity.', null, [ACT.vocabularyActivities]),
    createContentItem('上班', 'shàngbān', 'To go to work / be at work. Verb+object: 上 + 班 (work shift). The workplace counterpart of 上课. Asking 你几点上班? ("What time do you go to work?") is a standard workplace-adult question.', 'word', '我妈妈每天八点上班。', '"My mom goes to work at 8 every day." — typical Mainland office timing.', null, [ACT.vocabularyActivities]),
    createContentItem('下班', 'xiàbān', 'To finish work / get off work. Verb+object: 下 + 班. The opposite of 上班. The standard office finish time in China is 6 PM, but tech industry often runs much later (see 996 culture).', 'word', '我爸爸晚上七点下班。', '"My dad finishes work at 7 PM." — typical Mainland office-worker timing.', null, [ACT.vocabularyActivities]),
    createContentItem('回家', 'huíjiā', 'To go home / return home. Verb+object: 回 (return) + 家 (home). The natural end-of-day verb between work/school and the evening routine. Pairs with time expressions like 晚上 (evening) or specific clock times.', 'word', '我下班以后六点半回家。', '"I go home at 6:30 after work." — chained time expressions are common in routine descriptions.', null, [ACT.vocabularyActivities]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Times of day & days of the week
    // ────────────────────────────────────────────────────────────────────
    createContentItem('早上', 'zǎoshang', 'Early morning — roughly 5 AM to 9 AM. The wake-up and breakfast block of the day. Used as a time-frame adverb BEFORE the verb: 早上起床 ("get up in the morning"), not after.', 'word', '早上我喝一杯咖啡。', '"In the morning I drink a cup of coffee." — typical morning-routine sentence.', null, [ACT.vocabularyTime]),
    createContentItem('上午', 'shàngwǔ', 'Late morning — roughly 9 AM to noon. The classroom/office morning block. Contrasts with 早上: 上午 excludes the wake-up hours and refers to the productive morning. Used in scheduling: 上午九点 ("9 AM").', 'word', '上午我有两节课。', '"I have two classes in the morning." — 节 (jié) is the measure word for class periods.', null, [ACT.vocabularyTime]),
    createContentItem('中午', 'zhōngwǔ', 'Noon — roughly noon to 2 PM. Lunch plus the traditional 午休 (midday nap) block. Many Chinese schools and workplaces dim lights and quiet down between 12:30 and 2:00 for a real nap, not just a break.', 'word', '中午我们休息一个小时。', '"We rest for an hour at noon." — the standard midday-break sentence.', null, [ACT.vocabularyTime]),
    createContentItem('下午', 'xiàwǔ', 'Afternoon — roughly 2 PM to 6 PM. The afternoon-class or afternoon-work block. Used in scheduling: 下午三点 ("3 PM"). Contrast with 晚上 (evening): 下午 ends roughly at sunset.', 'word', '下午三点我有会议。', '"I have a meeting at 3 PM." — 会议 (huìyì) means "meeting"; standard office sentence.', null, [ACT.vocabularyTime]),
    createContentItem('晚上', 'wǎnshang', 'Evening — roughly 6 PM to midnight. Dinner, study, leisure, sleep. The longest single time block in daily-routine descriptions; covers everything from dinner to bed.', 'word', '晚上我跟朋友吃饭。', '"In the evening I eat with friends." — 跟 (gēn) means "with"; common social pattern.', null, [ACT.vocabularyTime]),
    createContentItem('半夜', 'bànyè', 'Late night / midnight — roughly midnight to 3 AM. The all-nighter, exam-cramming, late-shift block. Carries a connotation of "should not be awake then"; using 半夜 implies an unusual or extreme schedule.', 'word', '我昨天半夜两点才睡。', '"I didn\'t sleep until 2 AM last night." — 才 (cái) signals "not until then", emphasizing late.', null, [ACT.vocabularyTime]),
    createContentItem('星期一', 'xīngqī yī', 'Monday. The Chinese week-day pattern is 星期 (week) + the number 1-6, with 星期日 (or 星期天) for Sunday. Highly regular — once you know the numbers, all seven days follow automatically.', 'word', '星期一我们有数学课。', '"On Monday we have math class." — note no preposition before 星期一; it works directly as a time adverb.', null, [ACT.vocabularyTime]),
    createContentItem('星期六', 'xīngqī liù', 'Saturday. Number 6 in the week-day pattern. First day of the weekend in modern China. Many universities still hold classes on 星期六; the 5-day week is not universal.', 'word', '星期六我去图书馆。', '"On Saturday I go to the library." — common student-weekend activity.', null, [ACT.vocabularyTime]),
    createContentItem('星期日', 'xīngqī rì', 'Sunday. The only day in the week-day pattern that uses a character (日 sun/day) rather than a number. Colloquial spoken form is 星期天 (xīngqī tiān); both are correct. Note the retroflex r- in 日.', 'word', '星期日我休息。', '"On Sunday I rest." — typical Sunday for many Chinese workers.', null, [ACT.vocabularyTime]),
    createContentItem('今天', 'jīntiān', 'Today. A direct time adverb — no preposition needed: 今天我去上课 ("Today I go to class"), NOT 在今天. Pairs naturally with the present-day clock time questions of this lesson.', 'word', '今天你做什么?', '"What are you doing today?" — the standard same-day check-in question.', null, [ACT.vocabularyTime]),
    createContentItem('明天', 'míngtiān', 'Tomorrow. Direct time adverb like 今天. Pairs with future-plan verbs; Mandarin has no future tense, so 明天 + verb is the standard way to talk about tomorrow.', 'word', '明天我要去北京。', '"Tomorrow I am going to Beijing." — 要 (yào) signals intention/future.', null, [ACT.vocabularyTime]),
    createContentItem('昨天', 'zuótiān', 'Yesterday. Direct time adverb. Often paired with 了 (the completion marker from Grammar III) to talk about completed past actions: 昨天我看了一部电影 ("Yesterday I watched a movie").', 'word', '昨天我跟朋友吃了晚饭。', '"Yesterday I ate dinner with friends." — note 了 marking completion of the past action.', null, [ACT.vocabularyTime]),
    createContentItem('每天', 'měitiān', 'Every day. A frequency adverb meaning "daily / every single day". Placed BEFORE the verb (or before the subject for emphasis): 我每天锻炼 ("I exercise every day"). Stronger than 经常 (often).', 'word', '我每天喝两杯水。', '"I drink two cups of water every day." — typical daily-habit sentence.', null, [ACT.vocabularyTime]),
    createContentItem('周末', 'zhōumò', 'Weekend (Saturday + Sunday combined). The two-day block, used to describe weekend activities as a whole. Contrast with 工作日 / 平时 (weekday).', 'word', '周末我们一起出去吧。', '"Let\'s go out together on the weekend." — 吧 (ba) softens it to a suggestion.', null, [ACT.vocabularyTime]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: Clock time & 几点 questions
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '点 — telling the hour',
      'diǎn — telling the hour',
      'Place the number BEFORE 点 (diǎn) to give the hour: 一点 (1:00), 七点 (7:00), 十二点 (12:00). Mandarin uses 12-hour numerals; the time-of-day word (早上/下午/晚上) disambiguates AM vs PM.',
      'sentence',
      '现在七点。— "It\'s 7 o\'clock now."',
      'The simplest clock-time form; appears constantly in daily-routine sentences.',
      [
        { target: '一点 yī diǎn', note: '1 o\'clock; the 一 is a regular first tone in this combination' },
        { target: '两点 liǎng diǎn', note: '2 o\'clock — note that "2 o\'clock" uses 两, NOT 二; this is a key irregularity' },
        { target: '十二点 shí\'èr diǎn', note: '12 o\'clock — usually 中午十二点 (noon) or 半夜十二点 (midnight)' },
      ],
      [ACT.grammarClock],
    ),
    createContentItem(
      '点 + 分 — hours and minutes',
      'diǎn + fēn',
      'Combine X 点 (hour) + Y 分 (minute) to give a precise time: 七点三十分 (7:30). For under-10 minutes, you can include 零 (líng, "zero") for clarity: 七点零五分 (7:05). The 分 is sometimes dropped in casual speech.',
      'sentence',
      '我七点三十分起床。— "I get up at 7:30."',
      'Standard precise-time pattern; works for any clock time and pairs naturally with daily-activity verbs.',
      [
        { target: '七点十五分', note: '7:15; literal "7 point 15 minutes"' },
        { target: '七点三十分', note: '7:30; full form (the half form 七点半 is more common)' },
        { target: '七点四十五分', note: '7:45; full form (the quarter form 七点三刻 is also possible)' },
      ],
      [ACT.grammarClock],
    ),
    createContentItem(
      '半 — half past',
      'bàn — half past',
      'Use 半 (bàn, "half") after 点 to mean "half past": 七点半 (7:30). Much more common in spoken Mandarin than the full form 七点三十分. The pattern is universal across hours.',
      'sentence',
      '中午十二点半我们吃午饭。— "We eat lunch at 12:30."',
      'The conversational way to say a half-hour time; spoken Mandarin defaults to this rather than the precise minute form.',
      [
        { target: '七点半 qī diǎn bàn', note: '7:30; literally "7 point half"' },
        { target: '十二点半 shí\'èr diǎn bàn', note: '12:30; works the same way for every hour' },
        { target: '六点半 liù diǎn bàn', note: '6:30; the universal half-past pattern' },
      ],
      [ACT.grammarClock],
    ),
    createContentItem(
      '一刻 / 三刻 — quarter past / quarter to',
      'yī kè / sān kè',
      'Use 一刻 (yī kè, "one quarter") after 点 to mean "quarter past": 七点一刻 (7:15). Use 三刻 (sān kè, "three quarters") to mean "quarter to the next hour written as :45": 七点三刻 (7:45). Slightly more formal than the precise minute form.',
      'sentence',
      '我下午两点一刻有课。— "I have class at 2:15 in the afternoon."',
      'Common in scheduling contexts; the precise minute form (X 点 Y 五分) is equally acceptable.',
      [
        { target: '七点一刻', note: '7:15; "one quarter past 7"' },
        { target: '七点三刻', note: '7:45; "three quarters past 7" — note Mandarin does NOT say "quarter to 8"' },
        { target: '两点一刻 vs 两点十五分', note: 'same time (2:15); 一刻 is slightly more elegant, 十五分 more precise' },
      ],
      [ACT.grammarClock],
    ),
    createContentItem(
      '几点 — asking the time',
      'jǐ diǎn — asking the time',
      'Use 几点 to ask "what time" — works for asking the current time (现在几点?) or the time of an activity (你几点起床?). CRITICAL: 几点 stays in the SAME position the time answer would occupy — no movement to the front of the sentence. Word order matches statements exactly.',
      'sentence',
      '你几点起床? — 我七点起床。 ("What time do you get up?" — "I get up at 7.")',
      'Same word order as statements — much simpler than English wh-question movement; the question word stays in place.',
      [
        { target: '你几点 + Verb?', note: 'question pattern; the time slot holds 几点 instead of the actual time' },
        { target: '现在几点?', note: '"What time is it now?"; 几点 in predicate position' },
        { target: 'Reply: 我 X 点 + Verb', note: 'replace 几点 with the actual time; everything else stays put' },
      ],
      [ACT.grammarClock],
    ),
    createContentItem(
      'Time BEFORE verb',
      'time-before-verb rule',
      'CRITICAL WORD ORDER: time expressions always come BEFORE the verb in Mandarin, never after. Correct: 我七点起床 ("I get up at 7"). Wrong: 我起床七点. This is the opposite of English ("I get up AT 7") and a frequent English-speaker mistake.',
      'sentence',
      'CORRECT: 我每天早上七点起床。\nWRONG: 我每天起床早上七点。',
      'The Mandarin pattern is rigid: [subject] + [time] + [verb] + [object]. Stick to this and routine descriptions sound natural.',
      [
        { target: 'subject + time + verb', note: 'the universal Mandarin word order for routine sentences' },
        { target: 'multiple time expressions', note: 'stack from larger to smaller: 我星期一早上七点起床 ("On Monday morning at 7 I get up")' },
        { target: 'subject can also follow time', note: 'for emphasis: 早上七点我起床 ("At 7 in the morning, I get up") — both orders OK' },
      ],
      [ACT.grammarClock],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Frequency adverbs
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '总是',
      'zǒngshì — always',
      'Frequency adverb meaning "always / 100% of the time". Placed BEFORE the verb. The strongest of the frequency adverbs; use only for truly invariant habits. Often emphasized with 都 (dōu) for "always without exception": 我总是都七点起床.',
      'sentence',
      '我总是七点起床。— "I always get up at 7."',
      'Use sparingly — overusing 总是 makes statements sound exaggerated, since absolute claims are rare in real speech.',
      [
        { target: '总是 + Verb', note: 'pre-verb position; modifies the verb directly' },
        { target: '总是 vs 每天', note: '总是 = always (no exceptions); 每天 = every day (regular daily); 总是 stronger and more emphatic' },
      ],
      [ACT.grammarFrequency],
    ),
    createContentItem(
      '经常 / 常常',
      'jīngcháng / chángcháng — often',
      'Frequency adverb meaning "often / habitually". 经常 and 常常 are near-synonyms; 经常 is slightly more formal/written and 常常 slightly more colloquial. Both placed BEFORE the verb. The everyday default for habitual actions.',
      'sentence',
      '我经常去图书馆。— "I often go to the library."',
      'The standard frequency adverb for talking about habits; appears in most daily-routine descriptions.',
      [
        { target: '经常 jīngcháng', note: 'often; slightly more formal; common in writing and adult speech' },
        { target: '常常 chángcháng', note: 'often; slightly more colloquial; common in casual speech' },
        { target: 'Position: pre-verb', note: 'subject + 经常/常常 + verb + (object)' },
      ],
      [ACT.grammarFrequency],
    ),
    createContentItem(
      '有时候',
      'yǒu shíhou — sometimes',
      'Frequency adverb meaning "sometimes / at times". Placed BEFORE the verb (or before the subject for emphasis). Weaker than 经常 (often); marks intermittent but real occurrences. Often paired across sentences: 有时候…有时候… ("sometimes X, sometimes Y").',
      'sentence',
      '有时候我晚上锻炼。— "Sometimes I exercise in the evening."',
      'The mid-frequency adverb for habits that happen but not regularly; the workhorse word for honest descriptions.',
      [
        { target: '有时候 + Verb', note: 'pre-verb position; modifies how often the action happens' },
        { target: '有时候 X，有时候 Y', note: 'paired pattern for alternating routines: "sometimes X, sometimes Y"' },
      ],
      [ACT.grammarFrequency],
    ),
    createContentItem(
      '偶尔',
      'ǒu\'ěr — occasionally',
      'Frequency adverb meaning "occasionally / once in a while". Weaker than 有时候 (sometimes); marks rare but not impossible occurrences. Slightly more written/literary than the spoken alternatives.',
      'sentence',
      '我偶尔喝咖啡。— "I occasionally drink coffee."',
      'Used when you want to signal "it does happen, but rarely"; the precise tool for honest under-statement.',
      [
        { target: '偶尔 + Verb', note: 'pre-verb; marks a rare but real occurrence' },
        { target: '偶尔 vs 有时候', note: '偶尔 < 有时候 < 经常 on the frequency scale; 偶尔 is the rare-end of the middle band' },
      ],
      [ACT.grammarFrequency],
    ),
    createContentItem(
      '很少',
      'hěn shǎo — rarely',
      'Frequency adverb meaning "rarely / seldom". Literally "very few"; functions as a frequency adverb when placed before a verb. Stronger negative than 偶尔 (occasionally) — implies "almost never" without being absolute.',
      'sentence',
      '我很少看电视。— "I rarely watch TV."',
      'Use when the action is unusual for you but still possible; weaker than 从不 (never) but closer to "almost never" than to "sometimes".',
      [
        { target: '很少 + Verb', note: 'pre-verb; functions as a frequency adverb meaning "rarely"' },
        { target: '很少 vs 偶尔', note: 'both are rare-end adverbs; 偶尔 implies it does happen, 很少 leans more toward "almost never"' },
      ],
      [ACT.grammarFrequency],
    ),
    createContentItem(
      '从不 / 从来不',
      'cóngbù / cónglái bù — never',
      'Frequency adverb meaning "never / not ever". Already contains the negation 不 — do NOT add another 不. The fuller form 从来不 is more emphatic. Both placed BEFORE the verb. The strongest negative on the frequency scale.',
      'sentence',
      '我从不抽烟。— "I never smoke."',
      'Already contains 不 — common learner mistake is to add a second 不 (wrong: 我从不不抽烟); just one negation is needed.',
      [
        { target: '从不 + Verb', note: 'pre-verb; the 不 is already part of the adverb' },
        { target: '从来不 cónglái bù', note: 'more emphatic form; same meaning, stronger feel' },
        { target: 'Wrong: 从不不…', note: 'common mistake — never double-negate; 从不 already contains the negation' },
      ],
      [ACT.grammarFrequency],
    ),
    createContentItem(
      'Frequency-adverb position',
      'pre-verb position rule',
      'CRITICAL POSITION RULE: every frequency adverb goes BEFORE the verb, never after. Correct: 我经常去 ("I often go"). Wrong: 我去经常. This is the same position as English ("I often go") — same as English here, unlike the time-before-verb rule.',
      'sentence',
      'CORRECT: 我经常去图书馆。\nWRONG: 我去图书馆经常。',
      'The pattern is rigid: [subject] + [frequency adverb] + [verb] + [object]. Move the adverb after the verb and the sentence breaks.',
      [
        { target: 'subject + frequency + verb', note: 'the universal Mandarin word order for frequency sentences' },
        { target: 'frequency BEFORE time', note: 'when combining: 我经常晚上锻炼 ("I often exercise in the evening") — frequency first, then time' },
        { target: 'frequency BEFORE 不/没', note: '我经常不吃早饭 ("I often don\'t eat breakfast") — frequency outside negation' },
      ],
      [ACT.grammarFrequency],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Aspect markers (在/正在, 了)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '在 / 正在 — ongoing action',
      'zài / zhèngzài — ongoing action',
      'Place 在 (zài) or the emphatic 正在 (zhèngzài) directly BEFORE the verb to mark an action in progress right now: 我在吃饭 ("I am eating right now"). Mandarin has no continuous-tense verb form like English "-ing"; the aspect marker does this job.',
      'sentence',
      '我在吃饭。/ 我正在吃饭。— "I am eating right now."',
      'The Mandarin equivalent of English progressive "-ing"; works for any action verb.',
      [
        { target: '在 + Verb', note: 'subject + 在 + verb + (object); the standard ongoing pattern' },
        { target: '正在 + Verb', note: 'slightly emphatic; same position; carries a "this very moment" sense' },
        { target: '… 呢 (sentence-final)', note: 'often paired with 呢 at the end for extra naturalness: 我在吃饭呢' },
      ],
      [ACT.grammarAspect],
    ),
    createContentItem(
      '了 — completion',
      'le — completion marker',
      'Place 了 (le) AFTER the verb or at the END of the sentence to mark a completed action: 我吃了饭 ("I have eaten") or 我吃饭了 ("I have eaten / I ate"). Mandarin has no past tense; the aspect marker 了 does this job. Often translates as English past tense OR perfect ("ate" or "have eaten").',
      'sentence',
      '我吃了。/ 我已经吃了。— "I have eaten / I already ate."',
      'The completion marker — one of the trickiest features for English speakers because it covers BOTH past and perfect.',
      [
        { target: '了 after verb', note: 'verb + 了 + object: 我吃了饭 ("ate the meal"); marks the verb itself as completed' },
        { target: '了 sentence-final', note: 'at sentence end: 我吃饭了 ("I have eaten"); marks a state change' },
        { target: '已经…了 yǐjīng…le', note: 'paired with 已经 ("already") for emphasis: 我已经起床了 ("I have already gotten up")' },
      ],
      [ACT.grammarAspect],
    ),
    createContentItem(
      '三种时态的对比',
      'three aspect contrast',
      'CRITICAL CONTRAST: the same verb takes three different forms depending on aspect, not tense. 我吃饭 (habitual "I eat" / "I am eating in general"), 我在吃饭 (ongoing "I am eating right now"), 我吃了 or 我吃饭了 (completed "I have eaten / I ate"). This three-way split is one of the hardest concepts for English speakers.',
      'sentence',
      'Habitual: 我每天七点吃饭。\nOngoing: 我现在在吃饭。\nCompleted: 我已经吃了。',
      'Three sentences, same verb 吃, three different aspect meanings — the contrast is mandatory; learners must drill it explicitly.',
      [
        { target: '我吃饭 (habitual)', note: 'plain verb; generic / habitual / future / general truth — context decides which' },
        { target: '我在吃饭 (ongoing)', note: 'plus 在 before the verb; action in progress right now' },
        { target: '我吃了 (completed)', note: 'plus 了 after or at end; action finished, state changed' },
      ],
      [ACT.grammarAspect],
    ),
    createContentItem(
      '在 vs English progressive',
      'in/at vs ongoing — disambiguation',
      'CAREFUL: 在 has TWO meanings depending on position. Before a NOUN, 在 is the preposition "at / in" (我在学校 "I am at school"). Before a VERB, 在 is the ongoing-action marker (我在学习 "I am studying right now"). Word order is your only cue — pay attention to what follows 在.',
      'sentence',
      '我在学校。("I am at school" — 在 + noun, preposition)\n我在学习。("I am studying right now" — 在 + verb, aspect marker)',
      'A common English-speaker confusion; once the position rule is internalized, the two uses become easy to tell apart.',
      [
        { target: '在 + noun', note: 'preposition "at / in"; 在 + place/time' },
        { target: '在 + verb', note: 'aspect marker "in the middle of doing"; 在 + verb' },
        { target: '我在图书馆学习', note: 'both uses in one sentence: "at the library" + "studying" — 在 only appears once if context allows' },
      ],
      [ACT.grammarAspect],
    ),
    createContentItem(
      'Negation of aspect',
      'negating ongoing & completed',
      'NEGATION QUIRK: to negate an ongoing action, replace 在 with 没在 OR use 不 + verb: 我没在吃饭 / 我不在吃饭 ("I am not eating"). To negate a completed action, use 没(有) BEFORE the verb and DROP 了: 我没吃 ("I did not eat") — NOT 我没吃了. Forgetting to drop 了 is the most common mistake.',
      'sentence',
      'NOT ongoing: 我没在吃饭。\nNOT completed: 我没吃。 (NOT 我没吃了)',
      'The 没 + verb pattern is exclusive to past/completed negation; 不 covers everything else.',
      [
        { target: '没 + verb (no 了)', note: 'past/completion negation; 了 must be dropped' },
        { target: '不 + verb', note: 'general/present/future/habitual negation; for non-past, non-completion' },
        { target: 'Wrong: 我没吃了', note: 'frequent learner error; the 了 must disappear when 没 negates a past action' },
      ],
      [ACT.grammarAspect],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '清华学生的一天',
      'Qīnghuá xuéshēng de yī tiān',
      'A complete daily-schedule paragraph about a Tsinghua University student. Read aloud with correct tones and natural rhythm; notice how time expressions, frequency adverbs, and the place-of-action pattern stack together.',
      'sentence',
      '我叫王伟，我是清华大学的学生。我每天早上六点半起床。七点我吃早饭，然后去教室。上午八点开始上课，到中午十二点下课。中午我在食堂吃午饭，吃完以后休息一个小时。下午我经常在图书馆学习，有时候去锻炼。晚上六点跟同学一起吃晚饭，七点到十点做作业。我晚上十一点睡觉。',
      '"My name is Wang Wei, I\'m a student at Tsinghua University. I get up at 6:30 every morning. At 7 I eat breakfast, then go to the classroom. Class starts at 8 AM and ends at noon. At noon I eat lunch in the cafeteria, and after eating I rest for an hour. In the afternoon I often study in the library, and sometimes go exercise. In the evening at 6 I eat dinner with classmates, and from 7 to 10 I do homework. I go to sleep at 11 PM."',
      [
        { target: '清华大学的学生', note: '"a student at Tsinghua University"; possessive 的 links school to student' },
        { target: '每天早上六点半起床', note: 'stacked time markers: 每天 (every day) + 早上 (morning) + 六点半 (6:30) — all before the verb' },
        { target: '在食堂吃午饭', note: 'place-of-action: 在 + place + verb; 食堂 (shítáng, "cafeteria") is universal student vocabulary' },
        { target: '下午我经常在图书馆学习', note: 'time + subject + frequency + place + verb; the natural Mandarin ordering' },
        { target: '七点到十点', note: '"from 7 to 10"; the 到 (dào, "to") connects start and end times' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions matching the paragraph. Answer each in a short Mandarin sentence using the time-before-verb word order; full sentences are not required for natural Mandarin.',
      'sentence',
      'Q1: 王伟几点起床? Q2: 他中午在哪里吃午饭? Q3: 下午他经常做什么? Q4: 他几点睡觉?',
      'Four questions covering the four core skills of this lesson: clock time, place of action, frequency, and end-of-day timing.',
      [
        { target: 'A1: 他六点半起床。', note: 'time-before-verb pattern with the precise clock time' },
        { target: 'A2: 他在食堂吃午饭。', note: 'place-of-action pattern: 在 + place + verb' },
        { target: 'A3: 他经常在图书馆学习。', note: 'frequency adverb + place + verb; full natural sentence' },
        { target: 'A4: 他晚上十一点睡觉。', note: 'time-of-day + clock + verb; the full daily-routine closing' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '比较时间表 (对话)',
      'bǐjiào shíjiānbiǎo (duìhuà)',
      'A natural schedule-comparison dialogue between two Tsinghua students who have just met. Covers all the patterns from this lesson: clock times, frequency adverbs, places of action, and the ongoing/completed aspect contrast.',
      'conversation',
      'A: 你每天几点起床?\nB: 我七点起床。你呢?\nA: 我比较晚，我八点才起床。\nB: 那你早上做什么?\nA: 我经常去食堂吃早饭，然后去上课。你早上锻炼吗?\nB: 有时候。星期一和星期三我去操场跑步。\nA: 太好了! 我也想锻炼，但是我很少运动。\nB: 那明天一起跑步吧!',
      '"A: What time do you get up every day?\nB: I get up at 7. And you?\nA: I\'m later — I don\'t get up until 8.\nB: So what do you do in the morning?\nA: I often go to the cafeteria for breakfast, then go to class. Do you exercise in the morning?\nB: Sometimes. On Mondays and Wednesdays I go to the athletic field to run.\nA: Great! I want to exercise too, but I rarely work out.\nB: Then let\'s run together tomorrow!"',
      [
        { target: '我比较晚 wǒ bǐjiào wǎn', note: '"I\'m relatively late"; 比较 (bǐjiào) softens an adjective — a frequent comparison softener' },
        { target: '才 cái', note: '"not until then"; emphasizes lateness in 我八点才起床 ("I don\'t get up until 8")' },
        { target: '你呢? nǐ ne?', note: 'standard return-the-question phrase after answering your own turn — "and you?"' },
        { target: '一起 yīqǐ', note: '"together"; placed before the verb: 一起跑步 ("run together")' },
        { target: '吧 ba', note: 'sentence-final suggestion particle; softens a command into a suggestion' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '现在你在做什么?',
      'xiànzài nǐ zài zuò shénme?',
      'A short check-in dialogue practicing the ongoing-aspect marker 在 and the completion marker 了 across multiple turns. Notice the three aspects (habitual / ongoing / completed) within one short conversation.',
      'conversation',
      'A: 喂，你在做什么?\nB: 我在图书馆学习。你呢?\nA: 我刚吃了午饭，现在在回宿舍。\nB: 你下午有课吗?\nA: 有，两点有一节课。三点下课以后我去找你，好吗?\nB: 好的，我五点之前都在图书馆。',
      '"A: Hello, what are you doing?\nB: I\'m studying at the library. And you?\nA: I just ate lunch, now I\'m heading back to the dorm.\nB: Do you have class this afternoon?\nA: Yes, I have a class at 2. After class at 3 I\'ll come find you, OK?\nB: Sure, I\'ll be at the library until 5."',
      [
        { target: '我在图书馆学习 (ongoing)', note: '在 + verb marks the action in progress; double sense possible (place vs aspect)' },
        { target: '我刚吃了午饭 (completed)', note: '刚 (gāng, "just") + verb + 了 marks a recently completed action' },
        { target: '现在在回宿舍 (ongoing)', note: 'time word 现在 + 在 + verb; multiple aspect markers in one clause are normal' },
        { target: '都 dōu in "之前都"', note: '都 here means "the whole time"; "I\'ll be at the library the whole time before 5"' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable seven-sentence template for any Mandarin daily-routine paragraph. Fill in the bracketed slots with your own information — the structure carries the rest, including the time-before-verb rule and the frequency-adverb position.',
      'sentence',
      '我每天 [时间] 起床。[时间] 我 [活动]。上午我 [活动]。中午我在 [地方] 吃午饭。下午我 [频率] [活动]。晚上 [时间] 我 [活动]。我 [时间] 睡觉。',
      'Seven sentences cover the core: wake-up time, morning activity, late morning, lunch location, afternoon frequency, evening, bedtime — the minimum complete daily-routine description.',
      [
        { target: '[时间]', note: 'a clock-time expression: 七点 / 七点半 / 八点一刻' },
        { target: '[活动]', note: 'a daily-activity verb from Vocab I: 起床 / 上课 / 学习 / 吃饭 / 锻炼 / 睡觉' },
        { target: '[地方]', note: 'a place: 食堂 (cafeteria) / 图书馆 (library) / 教室 (classroom) / 宿舍 (dorm)' },
        { target: '[频率]', note: 'a frequency adverb: 经常 / 有时候 / 偶尔 / 很少 / 从不' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 5-7 sentence daily-routine paragraph in Hanzi using the template. Use at least three time expressions, two frequency adverbs, and one aspect marker (在 or 了) so the writing demonstrates the full grammar of this lesson.',
      'sentence',
      '示例: 我每天早上六点半起床。七点我吃早饭，然后去上课。上午我经常在教室学习。中午十二点我在食堂吃午饭，吃完了去宿舍午休。下午我偶尔锻炼。晚上我跟室友一起吃晚饭，做作业到十点。我十一点睡觉。',
      '"Example: I get up at 6:30 every morning. At 7 I eat breakfast, then go to class. In the morning I often study in the classroom. At noon at 12 I eat lunch in the cafeteria, and after eating I go to the dorm for a midday nap. In the afternoon I occasionally exercise. In the evening I eat dinner with my roommate, and do homework until 10. I sleep at 11."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '午休',
      'wǔxiū',
      'The 午休 (midday nap) tradition is real and observed across most of China. Schools dim lights and quiet hallways from roughly 12:30 to 2:00 PM; workplaces often shut blinds and let employees sleep at their desks. Skipping the nap is socially fine but unusual — a 30-minute power nap is the cultural default.',
      'sentence',
      '中国学校中午都有午休时间。— "Chinese schools all have a midday rest period."',
      'Unlike Western workplaces where sleeping at work signals problems, Chinese 午休 is a respected institution from kindergarten through retirement.',
      [
        { target: '午休 wǔxiū', note: 'midday rest / nap; literally "noon-rest"' },
        { target: '午睡 wǔshuì', note: 'midday sleep; emphasizes the actual sleeping more than the rest break' },
        { target: '宿舍午休', note: 'university students typically return to the dorm for the nap, not nap at their desks' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '早自习',
      'zǎo zìxí',
      'Chinese high schools (and many junior highs) require 早自习 — supervised early morning study, typically 7:00 to 7:40 AM. Students arrive before classes officially start to read aloud (often English or Chinese texts) or review homework. The practice is one reason Chinese students often look exhausted: their school day starts an hour before the first class.',
      'sentence',
      '高中生每天早上七点就开始早自习。— "High school students start their early self-study at 7 AM every day."',
      'Universities generally do not require 早自习, so beginning your day at Tsinghua at 8 AM feels late compared to your high school years.',
      [
        { target: '早自习 zǎo zìxí', note: 'early self-study; supervised early-morning reading and review' },
        { target: '晚自习 wǎn zìxí', note: 'evening self-study; the after-dinner counterpart, even longer (often until 9 or 10 PM)' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '996',
      'jiǔjiǔliù',
      'The "996" work schedule — 9 AM to 9 PM, 6 days a week — became a flashpoint in Chinese tech industry discussions around 2019. Officially illegal but informally widespread at some tech companies, it represents a 72-hour work week. The pushback (反对 996) is now a cultural marker; mentioning 996 signals you know the contemporary work-culture debate.',
      'sentence',
      '很多互联网公司还是 996。— "Many internet companies still do 996."',
      'A useful piece of contemporary vocabulary; helps you sound aware of current Chinese work-culture issues even at a beginner level.',
      [
        { target: '996 jiǔjiǔliù', note: 'the controversial 9-to-9, 6-days schedule; informal name' },
        { target: '反对 996 fǎnduì 996', note: '"oppose 996"; a famous online movement that pushed back against the schedule' },
        { target: '互联网公司', note: '"internet company"; the industry where 996 is most associated' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 跟新室友聊聊你的一天',
      'rènwù: gēn xīn shìyǒu liáoliáo nǐ de yī tiān',
      'Roleplay your first week at Tsinghua with the AI tutor playing your new Chinese roommate. Use every skill from this lesson — clock times, frequency adverbs, at least one aspect marker, and the time-before-verb word order — in one continuous scene.',
      'conversation',
      '[Tsinghua dorm, first week]\n室友: 你好! 我叫张伟。你叫什么名字?\n你: [打招呼 + 自我介绍]\n室友: 你每天几点起床?\n你: [回答时间]\n室友: 你早上做什么?\n你: [描述早上的活动]\n室友: 你下午也有课吗?\n你: [是 / 不是 + 详细]\n室友: 我经常晚上去图书馆。你呢?\n你: [频率副词 + 你的习惯]\n室友: 那今天晚上一起去吧!\n你: [接受或拒绝]',
      'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: '打招呼 + 自我介绍', note: 'open with 你好 + 我叫… — review from Unit 1' },
        { target: '几点起床', note: 'use a clock time: X 点 / X 点半 / X 点一刻' },
        { target: '早上的活动', note: '起床 → 刷牙 → 吃早饭 → 上课 — the morning sequence' },
        { target: '频率副词', note: '经常 / 有时候 / 偶尔 / 很少 / 从不 — pick the honest one' },
        { target: '接受或拒绝', note: '好啊 (accept) / 今天晚上我有事 (decline politely)' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 三种时态',
      'tiǎozhàn — sān zhǒng shítài',
      'Stretch goal: in the same scene, your roommate asks what you are doing right now, what you usually do, and what you have already done today. Use the three-way aspect contrast (habitual / 在 / 了) cleanly in three consecutive answers — the hardest production task of this lesson.',
      'conversation',
      '室友: 你现在在做什么?\n你: 我在看书。\n室友: 你晚上经常看书吗?\n你: 我经常看书。每天晚上看一个小时。\n室友: 你今天吃晚饭了吗?\n你: 吃了，我六点吃的晚饭。',
      'Three aspect-marker answers in sequence: ongoing (我在看书), habitual (我经常看书), completed (我吃了). Drilling this contrast is the single biggest hurdle for English speakers in Unit 4.',
      [
        { target: '我在看书 (ongoing)', note: '在 + verb; the present-moment answer' },
        { target: '我经常看书 (habitual)', note: 'frequency adverb + plain verb; the general-pattern answer' },
        { target: '我吃了 (completed)', note: 'verb + 了; the already-done answer' },
        { target: '六点吃的晚饭 (emphasis)', note: '是…的 pattern emphasizes a known past detail; advanced but useful' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
