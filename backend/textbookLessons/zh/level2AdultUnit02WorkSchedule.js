// Level 2 Track-Adult Unit 2 — 工作日程与日历 (Work Schedule & Calendar) — Mandarin Chinese
// Functions: stating workplace schedule, discussing meetings/business trips/leave,
// rescheduling (把…改到…), reporting unexpected timing (还没…就…), explaining
// cause-and-effect timing (一…就…). Beijing tech-company workplace setting.
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
  target, pinyin, note, type = 'word',
  example = '', exampleNote = '', breakdown = null, activityIds = [],
) => ({
  type, activityIds,
  targetText: target, romanization: pinyin, nativeText: note, pronunciation: pinyin,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'zh-l2au2-orientation',
  pronunciation: 'zh-l2au2-pronunciation',
  vocabularySchedule: 'zh-l2au2-vocab-schedule',
  vocabularyReschedule: 'zh-l2au2-vocab-reschedule',
  grammarBa: 'zh-l2au2-grammar-ba',
  grammarHaiMei: 'zh-l2au2-grammar-hai-mei',
  grammarYiJiu: 'zh-l2au2-grammar-yi-jiu',
  reading: 'zh-l2au2-reading',
  listening: 'zh-l2au2-listening',
  writing: 'zh-l2au2-writing',
  culture: 'zh-l2au2-culture',
  task: 'zh-l2au2-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: [
      'State your weekly working schedule, meeting times, and leave plans at a Beijing tech company.',
      'Reschedule a meeting or deadline using the 把…改到… construction and explain why.',
      'Handle WeChat-style schedule negotiation with a colleague, including proposing alternatives politely.',
    ],
    task: 'Picture your desk at a Beijing tech company on a Monday morning. You suddenly need to push back a Wednesday project meeting because of an out-of-town business trip. By the end of this lesson you should handle the whole exchange via WeChat in Mandarin.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in this lesson',
    goals: [
      'Apply third-tone sandhi on 把 (bǎ): when 把 precedes another third-tone object such as 把你的, the bǎ rises to bá in speech.',
      'Pronounce the front-vowel + nasal pairs 加班 (jiābān) and 截止 (jiézhǐ) cleanly, distinguishing the affricates j/q from the retroflexes zh/ch.',
      'Handle the neutral-tone in 周末 (zhōumò) and the falling-rising contour in 调整 (tiáozhěng) without flattening either tone.',
    ],
    task: 'Read each example aloud, identify whether sandhi applies, and pronounce the spoken version (not the written tones).' },
  { id: ACT.vocabularySchedule, section: 'Vocabulary I', title: 'Workplace schedule words',
    goals: [
      'Use the core schedule lexicon: 开会, 出差, 项目, 截止日期, 加班, 调休, 工作日, 周末, 休假, 年假, 病假, 弹性工作.',
      'Distinguish 加班 (overtime worked) from 调休 (comp time taken in lieu) — two sides of the same Chinese overtime accounting practice.',
    ],
    task: 'Describe a typical workweek at your Beijing tech-company job using at least 6 of the words.' },
  { id: ACT.vocabularyReschedule, section: 'Vocabulary II', title: 'Rescheduling and calendar phrases',
    goals: [
      'Use the scheduling verbs: 改时间 (reschedule), 推迟 (postpone), 提前 (move up), 取消 (cancel), 安排 (arrange), 确认 (confirm), 调整 (adjust).',
      'Use key calendar terms: 周一到周五 (Mon–Fri), 法定节假日 (statutory holidays), 国庆黄金周 (National Day Golden Week).',
    ],
    task: 'Pair each verb with a meeting/deadline noun and produce a one-sentence reschedule request.' },
  { id: ACT.grammarBa, section: 'Grammar I', title: '把 X 改到 Y — actively moving an object/event',
    goals: [
      'Use the 把 construction (subject + 把 + object + verb + result/location) to actively move or transform something — the object MUST be specific/known and the verb MUST have a result complement.',
      'Form scheduling sentences with 把…改到… (change X to Y), 把…推迟到… (postpone X to Y), 把…提前到… (move X up to Y).',
      'Avoid the English-speaker trap of using a plain subject–verb–object order ("我改会议到周四") — Mandarin requires 把 when the object is moved/changed to a destination.',
    ],
    task: 'Write three reschedule sentences using 把 X 改到 Y, then convert one of them into a polite WeChat request.' },
  { id: ACT.grammarHaiMei, section: 'Grammar II', title: '还没…就… — haven\'t even A when B (unexpected timing)',
    goals: [
      'Use the 还没…就… frame to express that B happened earlier than A was expected to — emphasizing surprise that A had not yet finished.',
      'Distinguish 还没…就… (unexpected/early B) from the neutral 一…就… frame (cause-and-effect timing in Grammar III).',
    ],
    task: 'Write two sentences using 还没…就… that describe a meeting starting before the previous task ended.' },
  { id: ACT.grammarYiJiu, section: 'Grammar III', title: '一…就… — as soon as A, B (immediate cause and effect)',
    goals: [
      'Use the 一…就… frame for immediate sequence ("as soon as A, then B") — the connection is automatic, not coincidental.',
      'Combine 一…就… with workplace verbs (开完会, 到办公室, 收到邮件) to describe routine triggers and reactions.',
    ],
    task: 'Write three sentences using 一…就… that describe automatic workplace responses (e.g., as soon as I finish the meeting, I write the minutes).' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'Read a project schedule notice',
    goals: [
      'Read a posted project schedule covering meeting cadence, deadlines, and leave windows for a small Beijing tech team.',
      'Answer comprehension questions about who is doing what when, using 是 and 把-sentences correctly.',
    ],
    task: 'Read the schedule notice aloud once, then answer four comprehension questions in short Mandarin sentences.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'WeChat schedule chat',
    goals: [
      'Follow a 6-turn WeChat chat between two Beijing colleagues negotiating a meeting reschedule and an overtime request.',
      'Reproduce the chat with your own schedule, swapping in the right rescheduling verbs and 把-sentences.',
    ],
    task: 'Read along with the AI tutor first, then perform the chat again with your own meeting and reasons.' },
  { id: ACT.writing, section: 'Writing', title: 'Write a reschedule message',
    goals: [
      'Write a 4–5 line WeChat message to a colleague proposing a meeting reschedule with reason and alternative time.',
      'Use the 把…改到… construction at least once and one of 还没…就… or 一…就… for natural workplace rhythm.',
    ],
    task: 'Write your own reschedule message based on the template, then read it aloud with correct tones.' },
  { id: ACT.culture, section: 'Culture Note', title: '996, 调休, and Golden Week disruption',
    goals: [
      'Understand the 996 work-culture controversy (9am–9pm, 6 days a week) — once celebrated in Chinese tech, now openly criticized and challenged in court.',
      'Understand 调休: the practice of "moving" weekend days to attach to public holidays, creating long breaks but eating later weekends — controversial among employees.',
      'Know 弹性工作 (flex-time) — rare in older state-owned firms but common in modern tech companies — and how 国庆黄金周 disrupts schedules nationwide.',
    ],
    task: 'Compare 调休 and 996 with the work-time norms in your own country in two short Mandarin sentences.' },
  { id: ACT.task, section: 'Task', title: 'WeChat a reschedule to a colleague',
    goals: [
      'Combine every skill from the lesson — schedule vocab, 把-sentences, 还没/一…就… frames — into one continuous WeChat exchange.',
      'Match the register: casual-polite among peers, slightly more formal if the colleague is senior or from another team.',
    ],
    task: 'Roleplay a WeChat exchange with the AI tutor playing your colleague 李伟. Propose a reschedule, give a reason, and confirm.' },
];

const lesson = {
  title: 'Level 2 (Adult) · Unit 2: 把会议改到周四 — Work Schedule and Calendar',
  category: 'business',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'stating-schedule', label: 'Stating your schedule', goal: 'Use 周一到周五 + 时间 + 上班 / 开会 / 加班 patterns to describe a typical workweek.' },
    { id: 'rescheduling', label: 'Rescheduling a meeting', goal: 'Use 把…改到… / 推迟到 / 提前到 to actively move a meeting or deadline.' },
    { id: 'requesting-leave', label: 'Requesting leave', goal: 'Use 我想请 + 年假 / 病假 + 时间 to formally request annual or sick leave.' },
    { id: 'reporting-conflict', label: 'Reporting a schedule conflict', goal: 'Use 还没…就… or 一…就… to explain a timing clash naturally.' },
  ],
  relatedPools: ['topic-society', 'topic-business'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can state your weekly schedule at a Beijing tech company, reschedule a meeting using 把…改到…, request annual or sick leave, and handle a WeChat schedule negotiation with a colleague.',
      'word',
      'Functional language: 安排日程 ānpái rìchéng (arrange schedule) · 改时间 gǎi shíjiān (reschedule) · 请假 qǐng jià (request leave) · 协调 xiétiáo (coordinate)',
      'These four micro-skills sit at the heart of every workplace exchange in Chinese — scheduling, negotiating, requesting, coordinating.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at your desk in a Beijing tech company on Monday morning. A meeting was set for Wednesday at 2 PM but your boss just announced an out-of-town business trip on the same day. You must WeChat your colleague 李伟 to move the meeting, give a brief reason, and propose a new time.',
      'word',
      '同事李伟: 周三下午两点的项目会还开吗?',
      'A typical Beijing workplace exchange: short WeChat ping, half-formal/half-casual register, expects a concrete proposal back within the hour.',
      [
        { target: '项目会 xiàngmù huì', note: 'project meeting; the most common type of recurring tech-team meeting in Chinese workplaces' },
        { target: '还开吗 hái kāi ma', note: '"is it still happening?"; 还 marks "still"; 开 is the verb used with 会 (meetings) — 开会 means "hold a meeting"' },
        { target: 'WeChat 微信 wēixìn', note: 'the default work-communication channel in Chinese companies, even more than email for short coordination' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三种紧迫程度',
      'sān zhǒng jǐnpò chéngdù',
      'Chinese workplace reschedule requests come in three urgency registers. Casual peer (same team): 改一下时间行吗? Polite cross-team: 能不能把会议推迟一下? Formal upward: 不知道是否方便把会议时间调整一下? Switching up signals more respect or higher urgency.',
      'word',
      'CASUAL: 改一下 gǎi yīxià · POLITE: 把…推迟一下 bǎ…tuīchí yīxià · FORMAL: 调整一下 tiáozhěng yīxià',
      'Same scheduling function across three registers — the verb root changes from 改 (casual) to 调整 (formal) and a hedge word (一下) softens the request.',
      [
        { target: 'CASUAL: 改一下', note: 'use with same-team peers; 一下 softens the request to "just a bit"' },
        { target: 'POLITE: 把…推迟一下', note: 'use with cross-team colleagues; the 把 construction signals a deliberate change' },
        { target: 'FORMAL: 调整一下', note: 'use with managers or senior colleagues; 调整 (adjust) is more measured than 改 (change)' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '把',
      'bǎ (sandhi watch: bá before another 3rd tone)',
      'The 把 in this lesson\'s key grammar carries a third tone (bǎ). When it precedes another third-tone syllable such as 把你的 (bǎ nǐ de → bá nǐ de), third-tone sandhi raises 把 to a rising tone. Before non-third tones (把会议 bǎ huìyì, 把项目 bǎ xiàngmù), bǎ stays full third tone.',
      'word',
      '把会议改到周四 bǎ huìyì gǎi dào zhōu sì (no sandhi — 会 is fourth tone)\n把你的安排告诉我 bǎ nǐ de ānpái gàosù wǒ → bá nǐ de... (sandhi)',
      'The 把 sandhi is the single most-used third-tone shift in this lesson; mistaking it sounds robotic.',
      [
        { target: '把 + 4th/1st/2nd → bǎ (no change)', note: 'most cases: full third-tone dip-and-rise preserved' },
        { target: '把 + 3rd → bá (rises)', note: 'sandhi rule; e.g., 把你的 bá nǐ de, 把我的 bá wǒ de' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '加班',
      'jiābān',
      'Two first-tone syllables — high and level — paired with the front affricate j (alveolo-palatal /tɕ/, soft "j" with a flat tongue). Do not retroflex into zh; jiā is forward and flat, not curled.',
      'word',
      '今天又要加班了。 Jīntiān yòu yào jiābān le.',
      '"Have to work overtime again today" — the most-said Chinese workplace complaint; both syllables stay high.',
      [
        { target: 'j /tɕ/ (palatal)', note: 'soft "j" with flat tongue; contrast with retroflex zh /ʈʂ/' },
        { target: 'jiā 加 (1st)', note: 'high level pitch; "to add"' },
        { target: 'bān 班 (1st)', note: 'high level pitch; "shift" or "class"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '截止',
      'jiézhǐ',
      'A second-tone jié (rising) followed by a third-tone zhǐ. Notice the contrast: jié uses the palatal j /tɕ/ (flat tongue, forward) while zhǐ uses the retroflex zh /ʈʂ/ (curled tongue, back) — same word, two different tongue positions.',
      'word',
      '截止日期是星期五。 Jiézhǐ rìqī shì xīngqī wǔ.',
      '"The deadline is Friday." — used constantly in tech-team work; rì in 日期 is also retroflex.',
      [
        { target: 'jié 截 (2nd, palatal)', note: 'rising tone; flat tongue forward — "to cut off"' },
        { target: 'zhǐ 止 (3rd, retroflex)', note: 'third tone; curled tongue back — "to stop"' },
        { target: 'palatal vs retroflex', note: 'core Mandarin contrast; mixing them collapses different words' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '周末',
      'zhōumò',
      'Retroflex zh /ʈʂ/ (curled tongue) followed by labial m. Both syllables carry full tones — zhōu (1st) high and level, mò (4th) sharp falling. Common timing mistake: shortening mò into a neutral tone, which makes it sound like 周么.',
      'word',
      '这个周末我加班。 Zhège zhōumò wǒ jiābān.',
      '"I am working overtime this weekend" — both syllables keep full tones, do NOT reduce mò.',
      [
        { target: 'zhōu 周 (1st, retroflex)', note: 'curled tongue; "week"' },
        { target: 'mò 末 (4th)', note: 'sharp falling; "end" — keep the full fall, do not reduce' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '调整',
      'tiáozhěng',
      'A rising second-tone tiáo followed by a third-tone zhěng. The most polite verb for "adjust" — used heavily in formal scheduling. Mind the contour: rise then dip-and-rise, the natural pulse of polite Mandarin.',
      'word',
      '请把会议时间调整一下。 Qǐng bǎ huìyì shíjiān tiáozhěng yīxià.',
      '"Please adjust the meeting time" — formal cross-team or upward request.',
      [
        { target: 'tiáo 调 (2nd)', note: 'rising tone; "to tune / adjust"' },
        { target: 'zhěng 整 (3rd)', note: 'dip-and-rise; "to set in order"' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Workplace schedule words
    // ────────────────────────────────────────────────────────────────────
    createContentItem('上班', 'shàngbān', 'To go to work / be on the clock. Used both for the act of arriving (我八点上班 "I start work at 8") and for the state of working (我现在在上班 "I am at work now"). Opposite: 下班 (xiàbān, get off work).', 'word', '我每天九点上班。', 'I start work at 9 every day. — the basic workplace schedule statement.', null, [ACT.vocabularySchedule]),
    createContentItem('下班', 'xiàbān', 'To get off work for the day. Pairs with 上班 (start work). 下班时间 (xiàbān shíjiān) = "knock-off time"; leaving exactly on time is sometimes called 按时下班 — a positive value among younger Chinese workers reacting against 996.', 'word', '我们六点下班。', 'We get off at 6. — pair with the start-work verb to define your workday.', null, [ACT.vocabularySchedule]),
    createContentItem('开会', 'kāihuì', 'To hold/attend a meeting. A separable verb: 开 (hold) + 会 (meeting), so objects insert in the middle: 开一个会 "hold a meeting", 开两次会 "hold two meetings". Cannot say 开会一个.', 'word', '下午三点我们开会。', 'We have a meeting at 3 PM. — most frequent verb in office Mandarin.', null, [ACT.vocabularySchedule]),
    createContentItem('出差', 'chūchāi', 'To go on a business trip. A separable verb: 出 (go out) + 差 (errand/mission). Use 去 + city + 出差 ("I am going to Shanghai for business"): 我去上海出差. Highly common in Chinese tech and consulting.', 'word', '我下周去上海出差。', 'I am going on a business trip to Shanghai next week.', null, [ACT.vocabularySchedule]),
    createContentItem('项目', 'xiàngmù', 'Project. The standard word for a defined piece of work with a deadline. In tech contexts, project meetings 项目会 (xiàngmù huì) are the most common type. Compare with 任务 (rènwù, task) which is smaller in scope.', 'word', '这个项目的截止日期是月底。', 'The deadline for this project is the end of the month.', null, [ACT.vocabularySchedule]),
    createContentItem('截止日期', 'jiézhǐ rìqī', 'Deadline. Literally "cut-off date". Used in formal contexts; colloquial Beijing tech speak also uses the loanword DDL or 死线 (sǐxiàn, "death line", informal/jokey). Pairs with 之前 (before) or 必须 (must).', 'word', '截止日期之前必须提交。', 'Must be submitted before the deadline.', null, [ACT.vocabularySchedule]),
    createContentItem('加班', 'jiābān', 'To work overtime — work beyond standard hours. Carries a heavy cultural weight in China: 加班 is both expected in many firms and openly resented. Pair with 到 + time: 加班到十点 ("work overtime until 10").', 'word', '今天又要加班到十点。', 'Have to work overtime until 10 again today. — the classic Chinese tech-worker lament.', null, [ACT.vocabularySchedule]),
    createContentItem('调休', 'tiáoxiū', 'Compensatory time off — taking a different day off in exchange for working overtime or on a holiday weekend. Also refers to the controversial Chinese practice of shifting weekend days to attach to public holidays (see Culture Note).', 'word', '周六加班，周一调休。', 'Work Saturday, take Monday off (in exchange).', null, [ACT.vocabularySchedule]),
    createContentItem('工作日', 'gōngzuòrì', 'Working day — typically Monday through Friday. Contrasts with 周末 (zhōumò, weekend) and 节假日 (jiéjiàrì, holidays). Used in policy and HR contexts: 工作日内回复 ("reply within working days").', 'word', '工作日是周一到周五。', 'Working days are Monday to Friday.', null, [ACT.vocabularySchedule]),
    createContentItem('周末', 'zhōumò', 'Weekend — Saturday and Sunday. Distinct from 周日 (zhōurì = Sunday). In Chinese tech firms, weekend work is technically optional but practically common; the value of 双休 (shuāngxiū, "two-day weekend") is sometimes a recruiting selling point.', 'word', '这个周末我休息。', 'I am off this weekend.', null, [ACT.vocabularySchedule]),
    createContentItem('休假', 'xiūjià', 'To take leave / be on vacation. General term covering all kinds of time off. Pairs with specific types: 年假 (annual leave), 病假 (sick leave), 事假 (personal leave). Use 请 + 假 to "request leave".', 'word', '我下周休假。', 'I am on leave next week.', null, [ACT.vocabularySchedule]),
    createContentItem('年假', 'niánjià', 'Annual leave / paid vacation days. Chinese statutory minimum is 5 days after 1 year of work, scaling up to 10 and then 15 days. Less generous than European norms, often quietly forgone in competitive firms.', 'word', '我今年还有五天年假。', 'I still have 5 days of annual leave this year.', null, [ACT.vocabularySchedule]),
    createContentItem('病假', 'bìngjià', 'Sick leave. Usually requires a hospital note (医院证明) for more than a half-day. The compound 请病假 (qǐng bìngjià) means "to call in sick / request sick leave".', 'word', '我感冒了，想请一天病假。', 'I have a cold and want to take a day of sick leave.', null, [ACT.vocabularySchedule]),
    createContentItem('事假', 'shìjià', 'Personal leave for non-medical reasons — family matters, errands, appointments. Usually unpaid in many firms; needs a reason stated. Less protected than 年假 or 病假.', 'word', '明天我有事，想请事假。', 'I have personal matters tomorrow and want to take personal leave.', null, [ACT.vocabularySchedule]),
    createContentItem('弹性工作', 'tánxìng gōngzuò', 'Flex-time / flexible working arrangements. Rare in older state-owned firms; increasingly common in modern Beijing tech companies. Sometimes phrased 弹性工作制 (tánxìng gōngzuò zhì) — "flex-time system".', 'word', '我们公司是弹性工作制。', 'Our company runs on a flex-time system.', null, [ACT.vocabularySchedule]),
    createContentItem('远程办公', 'yuǎnchéng bàngōng', 'Remote work / work from home. Became mainstream during the 2020–2022 period; now mixed with on-site work in most Chinese tech firms. Often labeled 居家办公 (jūjiā bàngōng) in HR notices — "home-based office work".', 'word', '今天我远程办公。', 'I am working remotely today.', null, [ACT.vocabularySchedule]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Rescheduling and calendar phrases
    // ────────────────────────────────────────────────────────────────────
    createContentItem('改时间', 'gǎi shíjiān', 'To reschedule — literally "change the time". The casual everyday verb among peers. Pairs with 把 + meeting: 把会议改到周四. More formal alternatives are 调整 (tiáozhěng) and 重新安排 (chóngxīn ānpái).', 'word', '我们改一下时间吧。', 'Let\'s reschedule. — the most casual reschedule opener.', null, [ACT.vocabularyReschedule]),
    createContentItem('推迟', 'tuīchí', 'To postpone / push back. Implies the meeting moves later in time. Compare with 提前 (move up to earlier). Used with 把 + event + 推迟到 + new time: 把会议推迟到下周.', 'word', '把会议推迟到下周。', 'Postpone the meeting to next week.', null, [ACT.vocabularyReschedule]),
    createContentItem('提前', 'tíqián', 'To move up to an earlier time / do something in advance. The opposite of 推迟 (postpone). Common in deadline contexts: 提前完成 ("finish ahead of schedule"). With 把: 把会议提前到周二.', 'word', '能不能把会议提前到周二?', 'Can we move the meeting up to Tuesday?', null, [ACT.vocabularyReschedule]),
    createContentItem('取消', 'qǔxiāo', 'To cancel. Used with meetings, plans, and orders. The full cancellation, not a reschedule. Pair with 把: 把会议取消. Stronger than 推迟 (postpone) — once you 取消, the event is off the calendar.', 'word', '今天的会议取消了。', 'Today\'s meeting is cancelled.', null, [ACT.vocabularyReschedule]),
    createContentItem('安排', 'ānpái', 'To arrange / schedule. The general scheduling verb. Used both as verb (我来安排 "I will arrange it") and noun (我的安排 "my schedule"). More formal than 弄 or 搞.', 'word', '我来安排明天的会议。', 'I will arrange tomorrow\'s meeting.', null, [ACT.vocabularyReschedule]),
    createContentItem('确认', 'quèrèn', 'To confirm. Used to seal a scheduling decision: 请确认时间 ("please confirm the time"). Common in WeChat scheduling exchanges to close the loop: A proposes, B confirms.', 'word', '请确认会议时间。', 'Please confirm the meeting time.', null, [ACT.vocabularyReschedule]),
    createContentItem('调整', 'tiáozhěng', 'To adjust. The most formal scheduling verb — used in upward requests and HR notices. Softer than 改 (change) which sounds blunt to a senior person. Pair with 一下 to soften further: 调整一下.', 'word', '请把会议时间调整一下。', 'Please adjust the meeting time. — formal upward request register.', null, [ACT.vocabularyReschedule]),
    createContentItem('协调', 'xiétiáo', 'To coordinate — across teams or schedules. Used when more than two parties are involved: 我去协调一下 ("I will coordinate it"). A managerial verb suggesting active orchestration, not just notification.', 'word', '我去协调一下时间。', 'I will coordinate the timing.', null, [ACT.vocabularyReschedule]),
    createContentItem('周一到周五', 'zhōu yī dào zhōu wǔ', 'Monday to Friday — the standard Chinese working week. Note Mandarin uses 周 + number (周一 Mon, 周二 Tue, … 周五 Fri, 周六 Sat, 周日/周天 Sun). Contrasts with 周末 (weekend).', 'word', '我周一到周五上班。', 'I work Monday to Friday.', null, [ACT.vocabularyReschedule]),
    createContentItem('法定节假日', 'fǎdìng jiéjiàrì', 'Statutory public holidays — Spring Festival, Tomb-Sweeping, Labor Day, Dragon Boat, Mid-Autumn, National Day. Often extended into long breaks via 调休 (see Culture Note). Workers get paid leave on these days.', 'word', '十月一日是法定节假日。', 'October 1 is a statutory public holiday.', null, [ACT.vocabularyReschedule]),
    createContentItem('国庆黄金周', 'guóqìng huángjīn zhōu', 'National Day Golden Week — Oct 1–7, a week-long break around National Day. Created by attaching weekends and 调休 days. Massive travel disruption nationwide; popular for tourism and family visits.', 'word', '国庆黄金周公司放假。', 'The company is closed for National Day Golden Week.', null, [ACT.vocabularyReschedule]),
    createContentItem('春节', 'Chūnjié', 'Spring Festival / Chinese New Year — the most important holiday. Typically a 7-day statutory break attached with 调休. Most workers travel home; major scheduling consideration for any project deadline near January–February.', 'word', '春节我回老家。', 'I am going home for Spring Festival.', null, [ACT.vocabularyReschedule]),
    createContentItem('日程', 'rìchéng', 'Schedule / itinerary / agenda. Used both for personal calendars (我的日程 "my schedule") and meeting agendas (会议日程 "meeting agenda"). More formal than 安排 (arrangement) as a noun.', 'word', '请把会议日程发给我。', 'Please send me the meeting agenda.', null, [ACT.vocabularyReschedule]),
    createContentItem('日历', 'rìlì', 'Calendar. Refers to both the physical calendar and the digital one (Google Calendar–type apps, WeChat\'s 日历 feature). 加到日历 ("add to calendar") is standard scheduling language.', 'word', '我把会议加到日历了。', 'I added the meeting to the calendar.', null, [ACT.vocabularyReschedule]),
    createContentItem('微信', 'wēixìn', 'WeChat — the dominant Chinese messaging and work-communication app. Workplace scheduling typically happens here, not in email. The verb 发微信 (fā wēixìn, "send a WeChat") is now standard workplace vocabulary.', 'word', '我微信发你详细信息。', 'I\'ll WeChat you the details.', null, [ACT.vocabularyReschedule]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 把 X 改到 Y
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '把 construction',
      'bǎ construction — subject + 把 + object + verb + result',
      'The 把 construction restructures a normal SVO sentence so the speaker can highlight what is being DONE TO the object. Pattern: subject + 把 + object + verb + result/destination. Three rules: (1) the object MUST be specific/known (use 这个/那个/the project, not "a project"); (2) the verb MUST have a result complement (改到, 推迟到, 取消了 — never just plain 改); (3) the verb cannot be a state verb (no 把…是… or 把…喜欢).',
      'sentence',
      '我把会议改到周四了。 Wǒ bǎ huìyì gǎi dào zhōu sì le.',
      'Translation: "I moved the meeting to Thursday." Compare the awkward non-把 form 我改会议到周四 (impossible in Mandarin). The 把 marks active relocation of a specific object.',
      [
        { target: '我 (subject)', note: 'who is doing the moving' },
        { target: '把会议 (specific object)', note: '把 + 会议 (the meeting — already known); cannot say 把一个会议 because "a meeting" is not specific' },
        { target: '改到周四 (verb + destination)', note: '改 + 到 (result complement marking the destination); the verb 改 alone would be incomplete in this construction' },
        { target: '了 (completion)', note: 'aspect marker — the move has been completed' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      '把 X 改到 Y',
      'bǎ X gǎi dào Y — change X to Y',
      'The single most useful 把-pattern in this lesson. Subject + 把 + meeting/deadline + 改到 + new time. Use for any scheduling change among peers; for formal upward requests substitute 调整到. The English equivalent is "I moved X to Y" — note the result complement 到 is OBLIGATORY in Mandarin.',
      'sentence',
      '把会议改到下周二。 Bǎ huìyì gǎi dào xià zhōu èr.',
      '"Move the meeting to next Tuesday." — a typical WeChat scheduling proposal.',
      [
        { target: '把 + 会议 / 项目 / 截止日期', note: 'object slot: must be a specific known item' },
        { target: '改到 / 推迟到 / 提前到', note: 'verb + result complement; pick by whether you are simply changing, postponing, or moving up' },
        { target: '+ Y (new time)', note: 'destination time: 周四 / 下周 / 三点 — must be a concrete time point' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      '把 X 推迟到 Y',
      'bǎ X tuīchí dào Y — postpone X to Y',
      'A more specific 把-pattern signaling that the new time is LATER than the original. Useful when you want to make clear you are pushing back, not just changing. Common in deadline contexts.',
      'sentence',
      '能不能把截止日期推迟到下周五? Néng bù néng bǎ jiézhǐ rìqī tuīchí dào xià zhōu wǔ?',
      '"Can we postpone the deadline to next Friday?" — a polite request to a project lead.',
      [
        { target: '能不能 + 把…', note: 'softens the request to "can we…?"' },
        { target: '推迟到 (push back to)', note: 'directional verb compound; the new time is necessarily later' },
        { target: 'compare with 改到 (neutral change)', note: '改到 does not imply direction; 推迟到 means later, 提前到 means earlier' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      '把 X 取消',
      'bǎ X qǔxiāo — cancel X',
      'Use 把 with 取消 to fully cancel a meeting or plan. No directional 到 — the object simply ceases. Pair with 了 to signal the cancellation is done. Stronger than 推迟 (postpone) because there is no replacement time.',
      'sentence',
      '我把下午的会议取消了。 Wǒ bǎ xiàwǔ de huìyì qǔxiāo le.',
      '"I cancelled the afternoon meeting." — final and complete, no reschedule.',
      [
        { target: '把 + 会议 + 取消', note: 'cancel pattern; no destination needed' },
        { target: '了 (completion)', note: 'the cancellation is done; without 了 the sentence sounds incomplete' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      'common 把 mistake',
      'common 把 mistake — missing result complement',
      'The most common English-speaker error: writing 我把会议改 (no result). Mandarin requires the verb in a 把 sentence to carry a result, destination, or aspect — bare verbs are ungrammatical here. Fix: add 到 + time, 一下 (a bit), or 了 (completed).',
      'sentence',
      'WRONG: 我把会议改。\nRIGHT: 我把会议改到周四。/ 我把会议改了。/ 我把会议改一下。',
      'Always add a result element — destination, aspect 了, or hedge 一下. The bare verb is rejected by every native ear.',
      [
        { target: 'verb + 到 + time', note: 'destination result; most common in scheduling' },
        { target: 'verb + 了', note: 'completion aspect; "I changed it"' },
        { target: 'verb + 一下', note: 'hedge "just a bit"; softens to a request or casual proposal' },
      ],
      [ACT.grammarBa],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 还没…就…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '还没…就…',
      'hái méi … jiù … — haven\'t even A when B (unexpected early B)',
      'The frame 还没 A 就 B signals that B happened EARLIER than A had finished — emphasizing surprise that B came before A could complete. 还没 marks "not yet" for an ongoing or expected event; 就 marks the unexpectedly early second event. The speaker\'s stance is "B came too early".',
      'sentence',
      '我还没说完，他就走了。 Wǒ hái méi shuō wán, tā jiù zǒu le.',
      '"I hadn\'t finished speaking when he left." — the speaker is surprised/displeased that the listener left before the talk was done.',
      [
        { target: '还没 + verb (incomplete A)', note: '"not yet" — A is the action that did not finish; use 没 (not 不) because the timing is past/perfective' },
        { target: '就 + verb + 了 (unexpectedly early B)', note: '就 marks the surprising earliness; 了 carries the completion of B' },
        { target: 'speaker stance: surprised', note: 'the construction always carries a surprise/displeasure tone — not neutral' },
      ],
      [ACT.grammarHaiMei],
    ),
    createContentItem(
      '还没…就… in scheduling',
      'hái méi … jiù … in scheduling',
      'Apply 还没…就… to workplace schedule clashes — useful when reporting that a meeting started before the prior task was done, or that a deadline arrived before the work was finished.',
      'sentence',
      '我还没写完报告，会议就开始了。 Wǒ hái méi xiě wán bàogào, huìyì jiù kāishǐ le.',
      '"I hadn\'t finished writing the report when the meeting started." — typical schedule-conflict explanation; the implication is the meeting came too early.',
      [
        { target: '还没写完 (uncompleted task)', note: 'task that should have finished first' },
        { target: '会议就开始了 (premature event)', note: 'event that intruded earlier than expected' },
        { target: 'usage: explaining conflict', note: 'use to justify a missed prep or a half-done deliverable; carries an "it wasn\'t my fault" undertone' },
      ],
      [ACT.grammarHaiMei],
    ),
    createContentItem(
      '还没 vs 一…就…',
      'hái méi … jiù … vs yī … jiù …',
      'Two frames that both use 就 but mean different things. 还没…就… = "B happened before A finished" — surprise/displeasure. 一…就… = "as soon as A, then B" — neutral cause-and-effect. Picking the wrong one inverts the emotional tone of the sentence.',
      'sentence',
      'CONTRAST:\n还没下班，他就走了。 (hái méi — surprise: "he left before knock-off time" — implication: too early)\n一下班，他就走了。 (yī jiù — neutral: "as soon as work ended, he left" — no surprise)',
      'Same situation, two readings: one accusatory, one neutral. Choose by the stance you want.',
      [
        { target: '还没…就… (surprise, displeasure)', note: 'B intrudes too early; speaker did not expect or welcome it' },
        { target: '一…就… (neutral cause-effect)', note: 'B follows A automatically; no surprise implied' },
      ],
      [ACT.grammarHaiMei],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 一…就…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '一…就…',
      'yī … jiù … — as soon as A, B (immediate cause-effect)',
      'The frame 一 A 就 B means "as soon as A happens, B follows" — the connection is immediate and automatic. Used for habitual routines, conditional responses, and tight workplace triggers. The speaker stance is neutral; both events flow naturally.',
      'sentence',
      '我一下班就回家。 Wǒ yī xiàbān jiù huí jiā.',
      '"As soon as I get off work, I go home." — habitual routine; the link between getting off work and going home is automatic.',
      [
        { target: '一 + verb A (trigger)', note: 'the trigger event; 一 marks "as soon as"; verb here is usually bare, no aspect marker' },
        { target: '就 + verb B (response)', note: 'the immediate response; 就 marks "right then" / "thereupon"' },
        { target: 'neutral tone', note: 'no surprise or displeasure; just the natural flow of A→B' },
      ],
      [ACT.grammarYiJiu],
    ),
    createContentItem(
      '一…就… in scheduling',
      'yī … jiù … in scheduling',
      'Apply 一…就… to describe workplace triggers — what you do automatically when a meeting ends, an email arrives, or a colleague calls. The construction encodes routine and reliability, useful for reporting standard procedure.',
      'sentence',
      '我一收到邮件就回复。 Wǒ yī shōudào yóujiàn jiù huífù.',
      '"As soon as I receive the email, I reply." — describes a standard work routine; the response is immediate and reliable.',
      [
        { target: '一收到 (trigger: receive)', note: '收到 = receive; perfect for emails, notifications, requests' },
        { target: '就回复 (response: reply)', note: 'the automatic action that follows' },
        { target: 'register: reliable / procedural', note: 'good for explaining standard work behavior or commitments' },
      ],
      [ACT.grammarYiJiu],
    ),
    createContentItem(
      '一…就… with past events',
      'yī … jiù … with past events',
      'When 一…就… refers to a past event, attach 了 to the response verb to mark completion. The trigger verb stays bare. Common in narratives about how something happened.',
      'sentence',
      '我一开完会就给你打电话了。 Wǒ yī kāi wán huì jiù gěi nǐ dǎ diànhuà le.',
      '"As soon as I finished the meeting, I called you." — past narrative; 了 marks the call as completed.',
      [
        { target: '一开完会 (trigger: completed meeting)', note: '开完 = finished holding; 完 is the result complement marking completion' },
        { target: '就…了 (response + completion)', note: '了 on the response verb signals the action happened; without 了 the sentence reads habitual/ongoing' },
      ],
      [ACT.grammarYiJiu],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '项目日程通知',
      'xiàngmù rìchéng tōngzhī',
      'A typical Beijing tech-team project schedule notice posted on the team WeChat channel. Read it aloud once, noticing the date format (月-日), the 周一到周五 weekday convention, and the use of 把 in the reschedule line at the end.',
      'sentence',
      '【北京·清华大学产学研项目组·日程通知】\n• 项目周会: 每周二上午 10:00 (会议室 A)\n• 代码评审: 每周四下午 3:00 (远程)\n• 月度报告截止: 每月最后一个工作日 18:00\n• 李伟: 5月18日-5月22日 出差上海\n• 王芳: 5月20日 休病假\n• 注意: 本周三的项目会改到周四上午 10:00\n• 国庆黄金周 (10月1日-10月7日) 全员放假\n• 联系: 微信群内确认',
      'Translation: "[Beijing · Tsinghua University Industry-Academia-Research Project Team · Schedule Notice] Weekly project meeting: every Tuesday 10 AM (Room A). Code review: every Thursday 3 PM (remote). Monthly report deadline: 6 PM last working day of each month. Li Wei: business trip to Shanghai May 18–22. Wang Fang: sick leave May 20. NOTE: This week\'s Wednesday project meeting moved to Thursday 10 AM. National Day Golden Week (Oct 1–7) full team off. Confirm on WeChat group."',
      [
        { target: '项目周会 (xiàngmù zhōu huì)', note: 'weekly project meeting — the most common recurring meeting in Chinese tech teams' },
        { target: '代码评审 (dàimǎ píngshěn)', note: 'code review — standard tech-team activity, often done remotely' },
        { target: '月度报告 (yuèdù bàogào)', note: 'monthly report — typical Chinese workplace deliverable cadence' },
        { target: '出差上海 (chūchāi Shànghǎi)', note: 'business trip to Shanghai; 出差 + city is the formula' },
        { target: '改到周四上午 10:00', note: 'the key reschedule line; uses the 把 construction (implicit subject) + 改到 + new time' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions matching the schedule notice. Answer each in a short Mandarin sentence; full sentences with 是 or 在 are natural here.',
      'sentence',
      'Q1: 项目周会是什么时候?\nQ2: 李伟下周去哪里出差?\nQ3: 本周三的项目会还开吗?\nQ4: 月度报告的截止时间是什么时候?',
      'Four questions covering recurrence, business trip, reschedule, and deadline — the four facts most often asked in real team scheduling.',
      [
        { target: 'A1: 每周二上午十点。', note: 'recurrence + time; short factual answer' },
        { target: 'A2: 他去上海出差。', note: 'subject + verb + location; uses the 出差 + city pattern' },
        { target: 'A3: 不开了，改到周四上午十点。', note: 'negative + 改到; explains the reschedule using the lesson\'s key grammar' },
        { target: 'A4: 每月最后一个工作日下午六点。', note: 'time-noun phrase; uses 工作日 from Vocabulary I' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '微信对话 — 改时间',
      'wēixìn duìhuà — gǎi shíjiān',
      'A natural WeChat exchange between two Beijing tech colleagues — same team, peer-to-peer, polite-but-casual register. Covers the full scheduling cycle: proposal, reason, alternative, confirmation, sign-off. Notice the short messages, the 把 reschedule, and the use of 一…就… at the end.',
      'conversation',
      '李伟: 莎拉，周三下午两点的项目会还开吗?\n莎拉: 不好意思，我周三要去上海出差，能不能把会议改到周四上午十点?\n李伟: 周四上午十点我有别的会，能不能推迟到下午?\n莎拉: 周四下午三点怎么样? 我下午都有空。\n李伟: 好的，就周四下午三点。我把会议时间发到群里。\n莎拉: 谢谢! 我一回来就准备材料。',
      'Translation:\nLi Wei: "Sarah, is the Wednesday 2 PM project meeting still on?"\nSarah: "Sorry, I have a Shanghai business trip on Wednesday — can we change the meeting to Thursday 10 AM?"\nLi Wei: "I have another meeting Thursday 10 AM — can we postpone to the afternoon?"\nSarah: "How about Thursday 3 PM? I\'m free all afternoon."\nLi Wei: "Okay, Thursday 3 PM it is. I\'ll send the meeting time to the group."\nSarah: "Thanks! As soon as I get back I\'ll prepare the materials."',
      [
        { target: '能不能把…改到… (proposal)', note: 'the key 把 construction; "can we change… to…"' },
        { target: '能不能推迟到… (counter-proposal)', note: '推迟 = postpone; offered when the proposed slot has its own conflict' },
        { target: '…怎么样? (suggestion question)', note: '"how about…?" — soft proposal of a specific alternative' },
        { target: '就周四下午三点 (locking in)', note: '就 here means "then it\'s settled at"; the speaker confirms the agreement' },
        { target: '我一回来就准备 (automatic response)', note: '一…就… — describes the speaker\'s reliable next action; closes the loop positively' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '微信对话 — 加班协调',
      'wēixìn duìhuà — jiābān xiétiáo',
      'A slightly more formal cross-team WeChat exchange about a tight deadline and overtime. Uses 还没…就…, 调整, and a polite请假 (leave request). Notice the more measured tone with a different team\'s colleague.',
      'conversation',
      '王芳: 莎拉，你那边的代码评审周五能完成吗?\n莎拉: 我们还没写完，周五就要交了，时间有点紧。能不能把截止日期推迟到下周一?\n王芳: 我去协调一下。如果不行，可能需要周末加班。\n莎拉: 周末我可以加班，下周一再调休一天就行。\n王芳: 好的，我一确认就告诉你。',
      'Translation:\nWang Fang: "Sarah, can your side finish the code review by Friday?"\nSarah: "We haven\'t finished writing yet and Friday is the deadline — it\'s tight. Can we postpone the deadline to next Monday?"\nWang Fang: "I\'ll coordinate. If not possible, we may need weekend overtime."\nSarah: "I can do weekend overtime — just give me a day of comp time next Monday."\nWang Fang: "Got it, I\'ll let you know as soon as I confirm."',
      [
        { target: '还没写完，周五就要交了', note: 'the 还没…就… frame; signals the deadline arrives before the work is finished — surprise/pressure stance' },
        { target: '把截止日期推迟到下周一', note: '把 + 推迟到; postpones the deadline specifically' },
        { target: '协调 (xiétiáo, coordinate)', note: 'managerial verb; suggests Wang Fang will check across teams' },
        { target: '调休一天 (tiáoxiū yī tiān)', note: 'take one day of comp time in exchange for weekend work' },
        { target: '一确认就告诉你', note: '一…就… in a future commitment; "as soon as I confirm, I\'ll tell you"' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板 — 改会议微信',
      'xiězuò múbǎn — gǎi huìyì wēixìn',
      'A reusable 4–5 line template for a WeChat reschedule message. Fill the bracketed slots with your own information — the structure handles the politeness and the grammar.',
      'sentence',
      '[同事称呼]，[原会议时间]的[会议名称]我有[原因], 能不能把会议改到[新时间]? 我[原因细节]，[新时间]都有空。麻烦你确认一下，谢谢!',
      'Five elements cover the core: salutation, original time, reason, new-time proposal, confirmation request — the minimum complete reschedule.',
      [
        { target: '[同事称呼]', note: 'colleague\'s name + 你 (peer) or 您 (senior) — pick by register' },
        { target: '[原因] e.g., 出差 / 病假 / 项目冲突', note: 'the reason for moving — keep it brief and concrete' },
        { target: '把会议改到[新时间]', note: 'the key 把 construction with a specific destination time' },
        { target: '确认一下 (request confirmation)', note: 'closes the loop and invites a yes/no back' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 4–5 line WeChat reschedule message in Hanzi using the template. Use the 把…改到… construction at least once, and either 还没…就… or 一…就… for a natural workplace rhythm.',
      'sentence',
      '示例: 李伟，下周二上午十点的项目会我那天要出差，能不能把会议改到下周四下午两点? 我一回北京就准备好材料。麻烦你确认一下，谢谢!',
      'Translation: "Li Wei, I have a business trip on Tuesday morning when our 10 AM project meeting is — can we move it to next Thursday 2 PM? As soon as I get back to Beijing I\'ll have the materials ready. Please confirm, thanks!"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '996 工作制',
      '996 gōngzuòzhì',
      'The 996 work schedule (9 AM – 9 PM, 6 days a week) was openly celebrated in Chinese tech in the late 2010s — Jack Ma called it a "blessing". By the early 2020s, public sentiment turned: viral protests, courts ruling 996 illegal, and younger workers refusing to accept it. The phrase 996 is now critical, not aspirational. Some tech firms quietly maintain de facto 996; others have moved to advertised 10-7-5 (10 AM-7 PM, 5 days).',
      'sentence',
      '我们公司不是996，但加班还是不少。 Wǒmen gōngsī bú shì 996, dàn jiābān háishi bù shǎo.',
      '"Our company is not 996, but there is still a lot of overtime." — the typical hedged description from a modern Chinese tech worker.',
      [
        { target: '996 (9 AM – 9 PM, 6 days)', note: 'once aspirational, now mostly criticized; legally challenged' },
        { target: '加班文化 (jiābān wénhuà)', note: 'overtime culture; persists even where 996 is officially rejected' },
        { target: '反对 996 (fǎnduì 996)', note: 'opposition to 996; a movement among younger Chinese tech workers' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '调休 controversy',
      'tiáoxiū controversy',
      '调休 (comp time) takes two forms. (1) Personal level: working overtime in exchange for a future day off — generally welcomed. (2) National level: the government shifts weekend days to attach to public holidays, creating long breaks like Golden Week but eating later weekends — this version is increasingly unpopular. Public surveys show majority dissatisfaction with the national 调休 system.',
      'sentence',
      '十一国庆放七天，但前后周末要调休。 Shí yī guóqìng fàng qī tiān, dàn qiánhòu zhōumò yào tiáoxiū.',
      '"National Day gives 7 days off but the weekends before and after must be \'comped\'." — captures the trade-off that frustrates many Chinese workers.',
      [
        { target: '调休 (good): personal comp time', note: 'work weekend → take a weekday off; generally welcomed' },
        { target: '调休 (bad): national holiday shifting', note: 'weekend "moved" to a weekday; later weekend lost; controversial' },
        { target: '黄金周 (Golden Week)', note: 'the long break created via 调休; massive nationwide travel disruption' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '弹性工作 in modern tech',
      'tánxìng gōngzuò in modern tech',
      'Flex-time (弹性工作制) is rare in older state-owned firms (国企) and traditional industries but common in modern Beijing tech companies and foreign firms. Typical implementation: core hours 10 AM – 4 PM with flexible start/end, or hot-desking with two remote days a week. Often a recruiting differentiator for tech firms competing for talent.',
      'sentence',
      '我们公司是弹性工作制，可以在家办公两天。 Wǒmen gōngsī shì tánxìng gōngzuòzhì, kěyǐ zàijiā bàngōng liǎng tiān.',
      '"Our company has flex-time and lets you work from home two days a week."',
      [
        { target: '国企 vs 私企', note: 'state-owned vs private firms; flex-time more common in private/tech' },
        { target: '核心时间 (héxīn shíjiān)', note: 'core hours when everyone must be present; flex around them' },
        { target: '居家办公 (jūjiā bàngōng)', note: 'work from home; one form of flex' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '国庆黄金周 disruption',
      'guóqìng huángjīn zhōu disruption',
      'October 1–7 (National Day Golden Week) is one of two annual nationwide week-long breaks (the other being Spring Festival). 700+ million people travel; train tickets sell out weeks in advance; tourist sites are mobbed. For any Chinese workplace, the week is essentially frozen: no meetings, no deadlines, and any project schedule must work around it explicitly. Mid-Autumn Festival sometimes attaches, making the break even longer.',
      'sentence',
      '国庆黄金周项目都暂停。 Guóqìng huángjīn zhōu xiàngmù dōu zàntíng.',
      '"All projects pause during National Day Golden Week."',
      [
        { target: '国庆 (Oct 1)', note: 'National Day; founding of the People\'s Republic in 1949' },
        { target: '黄金周 (Golden Week)', note: 'the week-long break; one of only two per year' },
        { target: '春节 (Spring Festival)', note: 'the other week-long break; in Jan/Feb depending on lunar calendar' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 微信改会议',
      'rènwù: wēixìn gǎi huìyì',
      'Roleplay a 6-turn WeChat exchange with the AI tutor playing your Beijing colleague 李伟. Reschedule a Wednesday 2 PM project meeting because you have a Shanghai business trip on the same day. Use every skill from the lesson — schedule vocab, 把-sentences, and one of 还没…就… or 一…就….',
      'conversation',
      '[WeChat — 同事李伟]\n李伟: 莎拉，周三下午两点的项目会还开吗?\n你: [打招呼 + 说出差 + 用把…改到…提议新时间]\n李伟: 周四上午我有别的安排，下午怎么样?\n你: [接受或反提议 + 说原因]\n李伟: 那就周四下午三点，我把时间发群里。\n你: [感谢 + 用 一…就… 说后续动作]\n李伟: 好的，周四见!',
      'Six turns of fluent exchange; the AI tutor plays Li Wei and adapts to whatever you propose.',
      [
        { target: '打招呼 + 道歉', note: 'open with 李伟 / 不好意思; signals the upcoming change' },
        { target: '把…改到…', note: 'the key reschedule construction from Grammar I' },
        { target: '反提议时间', note: 'use ~ 怎么样? to propose an alternative' },
        { target: '一…就… (commit to follow-up)', note: 'closes the loop with an automatic next action — "as soon as I get back I will…"' },
        { target: '感谢 + 确认', note: 'sign off with 谢谢 / 周四见 to lock in the new time' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 多事件冲突',
      'tiǎozhàn — duō shìjiàn chōngtū',
      'Stretch goal: in the same scene, Li Wei reveals that the project deadline is also Friday. You must reschedule the meeting AND request a deadline extension — using 把 twice, once for each. End with a 一…就… commitment.',
      'conversation',
      '李伟: 对了，这周五是项目截止日期，你那边赶得上吗?\n你: 不好意思，我们还没写完，周五就要交了。能不能把截止日期推迟到下周一? 我一回北京就加班完成。\n李伟: 好的，我去跟产品经理协调一下。\n你: 谢谢! 麻烦你了。',
      'Notice the use of 还没…就… to justify the request (Grammar II), the second 把 sentence (Grammar I), and 一…就… for the follow-up commitment (Grammar III).',
      [
        { target: '还没写完，周五就要交了', note: '还没…就… frame; signals time pressure and explains the request' },
        { target: '把截止日期推迟到下周一', note: 'second 把 sentence — postponing a different object (the deadline)' },
        { target: '我一回北京就加班完成', note: 'one-就 commitment to a reliable follow-up' },
        { target: '协调 (xiétiáo)', note: 'used when more than two parties are involved (Li Wei + you + product manager)' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
