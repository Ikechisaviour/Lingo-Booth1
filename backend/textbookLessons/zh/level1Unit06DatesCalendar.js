// Level 1 Unit 6 — Dates & Calendar (Mandarin Chinese)
// Functions: numbers 1-100, days of the week, months, full date format
// (year/month/day big-to-small), duration with 多长时间 / 多久, sequencing
// with 以前 / 以后 / 的时候, planning a meet-up around a specific date.
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
  orientation: 'zh-l1u6-orientation',
  pronunciation: 'zh-l1u6-pronunciation',
  vocabularyNumbers: 'zh-l1u6-vocab-numbers',
  vocabularyCalendar: 'zh-l1u6-vocab-calendar',
  grammarDates: 'zh-l1u6-grammar-dates',
  grammarDuration: 'zh-l1u6-grammar-duration',
  grammarSequencing: 'zh-l1u6-grammar-sequencing',
  reading: 'zh-l1u6-reading',
  listening: 'zh-l1u6-listening',
  writing: 'zh-l1u6-writing',
  culture: 'zh-l1u6-culture',
  task: 'zh-l1u6-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Read and say any date in Mandarin in the native big-to-small order (year → month → day) using 年, 月, and 号/日.',
      'Name the 7 days of the week with 星期 and ask 今天星期几? to find out which weekday it is.',
      'State how long something has lasted with 多长时间 / 多久 and locate events in time using 以前, 以后, and 的时候.',
    ],
    task: 'Picture coordinating a weekend get-together with a Tsinghua classmate — you need to settle on a date, a weekday, and a time, and you also want to mention how long you have been studying Chinese. By the end of this lesson the whole exchange should flow without rehearsal.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in dates and numbers',
    goals: [
      'Apply 一 (yī) tone sandhi correctly: yī alone or final, yí before a fourth tone, yì before tones 1/2/3 — critical because 一 appears in nearly every date and counting context.',
      'Pronounce 月 (yuè) with the rounded front vowel ü after y- — the spelling drops the umlaut but the rounded vowel is required to be understood.',
      'Distinguish 四 (sì, "four") from 十 (shí, "ten") from 是 (shì, "to be") — the dental s, retroflex sh, and tone differences are all meaning-bearing in dates and prices.',
    ],
    task: 'Read each example aloud and identify whether 一 sandhi applies; then drill the 四/十/是 contrast in a minimal-pair set.',
  },
  {
    id: ACT.vocabularyNumbers,
    section: 'Vocabulary I',
    title: 'Numbers 1–100 and the 两 vs 二 distinction',
    goals: [
      'Read and say the digits 零, 一, 二, 三, 四, 五, 六, 七, 八, 九, 十 and build any two-digit number with the place-value pattern (二十三 = 23, 九十九 = 99).',
      'Know that 两 (liǎng) replaces 二 (èr) before measure words and units of time — 两个 (two items), 两年 (two years), NEVER 二个 or 二年.',
      'Recognize the lucky/unlucky number culture: 八 (bā) sounds like 发 (fā, prosperity), 四 (sì) sounds like 死 (sǐ, death) — drives apartment numbers, phone numbers, and pricing.',
    ],
    task: 'Count from 1 to 30 aloud, then say your age, the current year, and three phone digits — switching to 两 wherever a measure word follows.',
  },
  {
    id: ACT.vocabularyCalendar,
    section: 'Vocabulary II',
    title: 'Days, weeks, months, years, and relative time',
    goals: [
      'Use the calendar units 年 (year), 月 (month), 日/号 (day), 星期/礼拜 (week) — knowing that 号 is preferred in speech and 日 in writing.',
      'Name the 7 weekdays with 星期一 through 星期六 plus 星期日 (or casually 星期天) for Sunday.',
      'Use relative-time anchors 去年/今年/明年 for years, 上个月/这个月/下个月 for months, 上(个)星期/这(个)星期/下(个)星期 for weeks, and 昨天/今天/明天 for days.',
    ],
    task: 'Write the date of three real events (today, your birthday, a Chinese holiday) using year + month + day, and label each with its weekday.',
  },
  {
    id: ACT.grammarDates,
    section: 'Grammar I',
    title: 'Dates in big-to-small order with 几月几号',
    goals: [
      'Build a full Mandarin date in the order year → month → day: 2026 年 5 月 11 日 — the OPPOSITE of American month/day/year ordering.',
      'Ask 今天几月几号? ("What\'s the date today?") and 今天星期几? ("What day of the week is it today?") — note that 几 is the question word for small numbers (under ~10).',
      'Drop the copula 是 in date sentences: 今天 5 月 11 号 is natural, while 今天是 5 月 11 号 is also correct but slightly more emphatic; both are common.',
    ],
    task: 'Write five complete dates (today, your birthday, National Day, Spring Festival 2026, and one personal event) using the year-month-day order.',
  },
  {
    id: ACT.grammarDuration,
    section: 'Grammar II',
    title: 'Duration with 多长时间 / 多久 and the 了 of ongoing duration',
    goals: [
      'Ask 你学中文多长时间了? or 你学中文多久了? ("How long have you been studying Chinese?") — 多长时间 is slightly more formal, 多久 more conversational, both interchangeable.',
      'Answer with number + duration unit: 一年, 两个月, 三个星期, 五天, 半个小时 — note 个 is required between the number and 月/星期, but NOT between the number and 年/天.',
      'Place 了 at the END of an ongoing-duration sentence: 我学中文两年了 ("I have been studying for two years and still am"); without 了 the sentence means a completed past duration.',
    ],
    task: 'Write three duration sentences about your own life (studying Chinese, living in your city, knowing your best friend) using the appropriate measure-word pattern and final 了.',
  },
  {
    id: ACT.grammarSequencing,
    section: 'Grammar III',
    title: 'Sequencing events with 以前, 以后, and 的时候',
    goals: [
      'Use 以前 (yǐqián, "before") AFTER the event word: 上课以前 ("before class"), 来中国以前 ("before coming to China") — opposite of English word order.',
      'Use 以后 (yǐhòu, "after") AFTER the event word: 吃饭以后 ("after eating"), 毕业以后 ("after graduation") — symmetric pattern with 以前.',
      'Use 的时候 (de shíhou, "when / at the time of") AFTER the event word: 我小的时候 ("when I was little"), 上课的时候 ("during class") — frames a background time rather than a sequence.',
    ],
    task: 'Write three sentences locating events using each of 以前, 以后, and 的时候 — about your morning routine, your major, and your childhood.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Tsinghua University\'s academic calendar',
    goals: [
      'Read a short paragraph in Hanzi describing the Tsinghua academic calendar with multiple dates, weekdays, and holidays, applying every date and time pattern from this lesson.',
      'Answer comprehension questions in short Mandarin sentences using 几月几号, 星期几, and 多长时间.',
    ],
    task: 'Read the paragraph aloud once, then answer four comprehension questions about specific dates and durations in the schedule.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Scheduling a meeting with a classmate',
    goals: [
      'Follow a 6-turn scheduling dialogue between two Tsinghua students negotiating a date, a weekday, and a meeting time.',
      'Recognize the natural fillers and confirmations: 行 ("ok"), 那 ("then"), 不好意思 ("sorry"), 我看看 ("let me check") — these signal real conversational rhythm.',
    ],
    task: 'Read the dialogue along with the AI tutor first, then re-perform it swapping in your own preferred date and time.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Your weekly schedule',
    goals: [
      'Write 5–6 sentences in Hanzi describing your typical weekly schedule, using all 7 weekday names at least once.',
      'Include at least one duration phrase with 多长时间/多久 and one sequencing phrase with 以前/以后/的时候 so the writing demonstrates the full unit grammar.',
    ],
    task: 'Write your own weekly schedule following the model paragraph; aim for at least one event per weekday and one sentence describing how long you spend on a regular activity.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Lunar (农历) vs solar (阳历) calendars and Chinese holidays',
    goals: [
      'Know that Mainland China uses both the solar (阳历, yánglì) calendar for daily life and the lunar (农历, nónglì) calendar for traditional holidays — Spring Festival (春节) and Mid-Autumn (中秋节) follow the lunar calendar, while National Day (国庆节) and Labor Day (劳动节) follow the solar.',
      'Recognize the major Chinese holidays: 春节 (Spring Festival, lunar Jan 1 — late Jan / Feb), 中秋节 (Mid-Autumn, lunar Aug 15 — Sept), 国庆节 (National Day, Oct 1), 劳动节 (Labor Day, May 1), 清明节 (Tomb Sweeping, around Apr 5).',
      'Understand that Chinese age was traditionally counted from 1 at birth (一岁) and incremented every Spring Festival — so a person could be "two" while only weeks old. Mainland China now officially uses international age, but the traditional system is still common in older relatives\' speech.',
    ],
    task: 'Compare the solar and lunar dates of your birthday in 2026 using a calendar app, then label which Chinese holidays fall in the same month as your birthday.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Plan a weekend get-together with a Tsinghua classmate',
    goals: [
      'Combine numbers, dates, weekdays, duration, and sequencing into one continuous scheduling conversation — pick a date, settle on a weekday, propose a time, and confirm a place.',
      'Use the polite hedges 不好意思 ("sorry"), 我看看 ("let me check"), and 行不行? ("does that work?") so the negotiation feels natural rather than abrupt.',
    ],
    task: 'Roleplay planning a Saturday get-together with the AI tutor playing a Tsinghua classmate — aim for a 6-turn exchange covering date, weekday, time, and venue.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 6: 几月几号 — Dates and the Calendar',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-the-date', label: 'Asking the date', goal: 'Use 今天几月几号? or 今天星期几? to ask for the current date or weekday and answer in the year-month-day order.' },
    { id: 'stating-a-birthday', label: 'Stating a birthday', goal: 'Give your birthday with 我的生日是 N 月 N 号 and recognize that 号 is more natural in speech than 日.' },
    { id: 'asking-duration', label: 'Asking how long something has lasted', goal: 'Use 多长时间 or 多久 with sentence-final 了 to ask and answer ongoing-duration questions.' },
    { id: 'planning-a-meeting', label: 'Planning around a date', goal: 'Combine date, weekday, and time vocabulary to schedule a meet-up, using 行不行? to confirm.' },
  ],
  relatedPools: ['topic-time', 'topic-daily-life'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson you can read any date in Mandarin in the big-to-small (year → month → day) order, name the 7 weekdays, ask and answer when an event happens, and state how long something has lasted — every scheduling skill needed for daily life in Mainland China.',
      'word',
      'Functional language: 说日期 shuō rìqī (give a date) · 问星期 wèn xīngqī (ask the weekday) · 说时长 shuō shícháng (state duration) · 排序 páixù (sequence events) · 约时间 yuē shíjiān (set a time).',
      'These five micro-skills are the spine of every scheduling exchange in Mandarin — once they are automatic, every later unit layers conversation, transportation, and shopping on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at Tsinghua University and a classmate suggests meeting up this weekend. You need to settle on a date, agree on a weekday, propose a time, and confirm a venue — all in one fluid exchange.',
      'word',
      '同学: "周末有空吗？我们一起吃饭，怎么样？" — 你: "好啊！这个星期六行不行？"',
      'A typical opener between Chinese university friends: 周末 ("weekend") + 有空吗 ("are you free") + 怎么样 ("how about it") — a relaxed, low-pressure invitation pattern.',
      [
        { target: '周末 zhōumò', note: '"weekend"; covers Saturday and Sunday together' },
        { target: '有空吗 yǒu kòng ma', note: '"do you have free time?"; the polite way to ask availability' },
        { target: '行不行? xíng bù xíng?', note: 'verb-not-verb question form meaning "does that work or not?"; very common conversational shorthand' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '日期顺序',
      'rìqī shùnxù',
      'Mandarin writes and speaks dates in BIG-to-SMALL order — year first, then month, then day. This is the opposite of American month/day/year and different from British day/month/year. Once internalized, the order becomes intuitive.',
      'word',
      '2026 年 5 月 11 日 = May 11, 2026 (US) = 11 May 2026 (UK)',
      'Year, month, day in that exact sequence — no exceptions in standard written or spoken Mandarin.',
      [
        { target: '年 nián', note: 'year unit; goes FIRST in the date sequence' },
        { target: '月 yuè', note: 'month unit; SECOND in the sequence' },
        { target: '日 rì (written) / 号 hào (spoken)', note: 'day unit; LAST in the sequence — 号 in everyday speech, 日 in formal writing' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '一的变调',
      'yī de biàndiào',
      'Recap of the 一 tone sandhi rule (introduced in Foundation): 一 is yī alone or at the end of a number, yí before a fourth tone, and yì before first, second, or third tones. Critical because 一 appears in nearly every date, count, and ordinal expression.',
      'word',
      '一月 yī yuè (January, no sandhi — final number context) · 一号 yí hào (the 1st, before 4th tone) · 一年 yì nián (one year, before 2nd tone)',
      'The same character 一 takes three different tones depending on the following syllable — the rule is automatic for native speakers and must become automatic for you.',
      [
        { target: '一 alone or final → yī', note: 'e.g., 第一 dì yī, 十一 shí yī, 一一 yī yī — keeps first tone' },
        { target: '一 + 4th tone → yí', note: 'e.g., 一号 yí hào, 一岁 yí suì, 一样 yí yàng — changes to second (rising) tone' },
        { target: '一 + 1st/2nd/3rd tone → yì', note: 'e.g., 一年 yì nián, 一个月 yí ge yuè (sandhi cascade), 一天 yì tiān — changes to fourth (falling) tone' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '月的发音',
      'yuè de fāyīn',
      '月 (yuè, "month / moon") begins with y- but the vowel is the rounded front ü, not u. The spelling drops the umlaut after y/j/q/x by convention, but the sound is still /yɛ/, not /uɛ/. Round your lips firmly while keeping the tongue forward.',
      'word',
      '一月 yī yuè · 几月 jǐ yuè · 五月 wǔ yuè',
      'The same rounded ü appears in 学 (xué, study), 雪 (xuě, snow), 决 (jué, decide), 缺 (quē, lack) — train the lip rounding once and it transfers across the whole y/j/q/x + ü family.',
      [
        { target: 'y + ue → /yɛ/', note: 'pronounced as ü (rounded front vowel) + e; not the u of English "boot"' },
        { target: '月 yuè (4th tone)', note: 'sharp falling tone on a rounded front vowel — common combination in dates' },
        { target: 'contrast: 月 yuè (month) vs 越 yuè (cross over)', note: 'same sound, different characters — context disambiguates' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '四 / 十 / 是',
      'sì / shí / shì',
      'Three of the most-confused syllables for English learners. 四 (sì, "four") uses the dental s with a fourth tone. 十 (shí, "ten") uses the retroflex sh with a second tone. 是 (shì, "to be") uses the retroflex sh with a fourth tone. All three appear constantly in numbers, dates, and copula sentences.',
      'word',
      '四月十号 sì yuè shí hào (April 10) · 十月四号是星期天 shí yuè sì hào shì xīngqī tiān (October 4 is Sunday)',
      'Misreading 四 as 十 turns "four" into "ten" — a common shopping-and-pricing disaster for learners.',
      [
        { target: '四 sì', note: 'dental s (tongue forward at upper teeth); 4th tone (falling); meaning "four"' },
        { target: '十 shí', note: 'retroflex sh (tongue tip curled back); 2nd tone (rising); meaning "ten"' },
        { target: '是 shì', note: 'retroflex sh (same as 十); 4th tone (falling); meaning "to be"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '号 / 日 的发音',
      'hào / rì de fāyīn',
      '号 (hào) uses the throaty h /x/ (more friction than English h) plus the ao diphthong and a falling tone. 日 (rì) uses the retroflex r /ʐ/ plus the buzzy r-colored i — neither sound has an exact English equivalent. Both syllables mean "day" in date contexts; 号 is for speech, 日 is for writing.',
      'word',
      'speech: 五月十一号 wǔ yuè shíyī hào · writing: 5 月 11 日',
      'A signboard at Tsinghua will read "5 月 11 日"; a friend asking the date will say "五月十一号" — same meaning, different register.',
      [
        { target: '号 hào', note: 'throaty h-onset + ao diphthong + falling tone; used in everyday speech for the day-of-month' },
        { target: '日 rì', note: 'retroflex r + buzzy i + falling tone; used in formal writing, news, and official documents' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Numbers 1-100
    // ────────────────────────────────────────────────────────────────────
    createContentItem('零', 'líng', 'Zero. Used in years (二零二六年 = 2026), phone numbers (手机号码), and addresses. In informal writing the digit 0 often replaces 零 outright.', 'word', '我的房间是 102 号 (yī líng èr hào)', 'Room numbers and phone numbers are read digit-by-digit, so 0 inside them is always 零.', null, [ACT.vocabularyNumbers]),
    createContentItem('一', 'yī', 'One. The most-used digit in Mandarin and the one subject to extensive tone sandhi (yī / yí / yì depending on what follows). In ordinal expressions appears as 第一 ("first").', 'word', '一月一号 yī yuè yí hào ("January 1st" — note the sandhi shift on the second 一)', 'Pay attention to the sandhi every time 一 is followed by another tone-bearing syllable.', null, [ACT.vocabularyNumbers]),
    createContentItem('二', 'èr', 'Two — used alone, in counting, and as a digit in larger numbers. Critically, 二 is NOT used before a measure word; 两 (liǎng) takes its place there.', 'word', '二月二号 èr yuè èr hào (February 2nd) · 二十 èr shí (twenty)', 'Two distinct uses: 二 for the digit "2" itself; 两 for "two of something".', null, [ACT.vocabularyNumbers]),
    createContentItem('三', 'sān', 'Three. Always 三, no sandhi, no special form before measure words.', 'word', '三月三号 sān yuè sān hào (March 3rd)', 'Easy and stable — the same form appears in every context.', null, [ACT.vocabularyNumbers]),
    createContentItem('四', 'sì', 'Four. Considered unlucky in Chinese culture because it sounds similar to 死 (sǐ, "to die"). Apartment buildings sometimes skip the 4th floor; phone numbers ending in 4 are cheaper.', 'word', '四月四号 sì yuè sì hào (April 4th)', 'Cultural sensitivity matters: avoid offering four of anything as a gift, especially to elders.', null, [ACT.vocabularyNumbers]),
    createContentItem('五', 'wǔ', 'Five. Stable, no sandhi. 五月 (May) is also the month of Labor Day (劳动节, May 1) in China.', 'word', '五月一号 wǔ yuè yī hào (May 1, Labor Day)', 'A neutral number culturally; no superstition attached.', null, [ACT.vocabularyNumbers]),
    createContentItem('六', 'liù', 'Six. Considered lucky because it sounds like 流 (liú, "to flow") — associated with smooth fortune. 六六大顺 (liù liù dà shùn, "double-six brings great smoothness") is a common congratulatory phrase.', 'word', '六月六号 liù yuè liù hào (June 6th)', 'A favorable number for prices, phone numbers, and wedding dates.', null, [ACT.vocabularyNumbers]),
    createContentItem('七', 'qī', 'Seven. Neutral culturally — no strong superstition. Pinyin q sounds like a soft English "ch", not English "k".', 'word', '七月七号 qī yuè qī hào (July 7th — Chinese Valentine\'s Day, 七夕)', '七夕 (Qīxī) on lunar July 7 is the traditional Chinese Valentine\'s Day, from the cowherd-and-weaver-girl legend.', null, [ACT.vocabularyNumbers]),
    createContentItem('八', 'bā', 'Eight. The luckiest number in Chinese culture because it sounds similar to 发 (fā, "to prosper"). Phone numbers with multiple 8s sell at a premium; the 2008 Beijing Olympics opened on 8/8/08 at 8:08 PM.', 'word', '八月八号 bā yuè bā hào (August 8th — a popular auspicious date)', 'Premium for "8" appears in real estate, license plates, and luxury pricing.', null, [ACT.vocabularyNumbers]),
    createContentItem('九', 'jiǔ', 'Nine. Considered lucky because it sounds like 久 (jiǔ, "long-lasting / eternal") — associated with longevity. 九 is also historically the emperor\'s number (Forbidden City has 9,999 rooms).', 'word', '九月九号 jiǔ yuè jiǔ hào (September 9th — Double Ninth Festival, 重阳节)', '重阳节 (Chóngyáng Jié) on lunar September 9 honors elders and celebrates longevity.', null, [ACT.vocabularyNumbers]),
    createContentItem('十', 'shí', 'Ten. Uses the retroflex sh + rising tone. Critical to distinguish from 四 (sì, "four"): different initial AND different tone. Place-value pattern uses 十 freely: 二十 (20), 三十 (30), 十一 (11), 十五 (15).', 'word', '十月十号 shí yuè shí hào (October 10th — Taiwan\'s "Double-Ten Day" national holiday)', 'A high-frequency digit; mistakes in 四 vs 十 cause real-world price confusion.', null, [ACT.vocabularyNumbers]),
    createContentItem(
      '11-99 数字搭建',
      'shíyī dào jiǔshíjiǔ — composing 11–99',
      'Place-value works like English tens-and-ones, but in Mandarin you write the digit BEFORE 十 (for the tens place) and AFTER 十 (for the ones place). 11 = 十一 (just 10+1). 25 = 二十五 (2-tens-and-5). 99 = 九十九 (9-tens-and-9).',
      'sentence',
      '十一 (11) · 二十 (20) · 二十五 (25) · 三十 (30) · 五十六 (56) · 九十九 (99)',
      'For 11-19 you can omit the leading 一 in 十 (so 11 = 十一, not 一十一); for 21+ the leading digit is required.',
      [
        { target: '11 → 十一 shí yī', note: '"ten + one"; the leading 一 is dropped before 十 only for 10 itself' },
        { target: '20 → 二十 èr shí', note: '"two tens"; the digit comes first, then 十' },
        { target: '25 → 二十五 èr shí wǔ', note: '"two tens + five"; full place-value composition' },
        { target: '99 → 九十九 jiǔ shí jiǔ', note: '"nine tens + nine"; largest two-digit number' },
      ],
      [ACT.vocabularyNumbers],
    ),
    createContentItem(
      '一百 / 一千 / 一万',
      'yì bǎi / yì qiān / yí wàn',
      'Large round numbers: 一百 (100), 一千 (1,000), 一万 (10,000). Note 一万 — Chinese groups numbers by ten-thousands (万), not by thousands like English. So 100,000 = 十万 ("ten ten-thousands") and 1,000,000 = 一百万 ("one hundred ten-thousands").',
      'sentence',
      '一百块 yì bǎi kuài (100 yuan) · 一千年 yì qiān nián (1,000 years) · 一万人 yí wàn rén (10,000 people)',
      'The "万 boundary" trips up English speakers — once you cross 10,000, the grouping logic differs and conversions take practice.',
      [
        { target: '100 → 一百 yì bǎi', note: 'note 一 takes 4th-tone sandhi before 百 (3rd tone)' },
        { target: '1,000 → 一千 yì qiān', note: 'similar sandhi pattern; 一 becomes yì before 千 (1st tone)' },
        { target: '10,000 → 一万 yí wàn', note: 'sandhi: 一 becomes yí before 万 (4th tone); the key grouping unit in Chinese' },
      ],
      [ACT.vocabularyNumbers],
    ),
    createContentItem(
      '两 vs 二',
      'liǎng vs èr',
      'CRITICAL DISTINCTION: 二 (èr) is the digit "2" used in counting, ordinals, and as a numeral inside larger numbers (12 = 十二, 22 = 二十二). 两 (liǎng) means "two of something" and is used before measure words and units of time. So "two months" is 两个月, NEVER 二个月.',
      'sentence',
      '二月 èr yuè (February — the 2nd month, ordinal) vs 两个月 liǎng ge yuè (two months — duration, before measure word 个)',
      'The single most common Chinese number mistake by English speakers; using 二 before a measure word sounds clearly non-native.',
      [
        { target: '二 èr — ordinals and digits', note: 'use for "the 2nd" (第二), as a digit in 12/22/32, and standing alone in counting (一二三)' },
        { target: '两 liǎng — quantities with measure words', note: 'use for "two items" before any measure word or time unit: 两个 (two items), 两年 (two years), 两点 (two o\'clock)' },
        { target: 'exception: 两 stays 两 even in compounds like 两千 (2,000) and 两万 (20,000)', note: 'the "two-of-X" reading wins whenever a unit follows; only 二十 (20) keeps 二 because there it is a digit, not "two of"' },
      ],
      [ACT.vocabularyNumbers],
    ),
    createContentItem(
      '吉利数字',
      'jílì shùzì — lucky and unlucky numbers',
      'Chinese number culture: 八 (bā) is lucky (sounds like 发 fā, "prosperity") and 六 (liù) is lucky (sounds like 流 liú, "smooth flow"). 四 (sì) is unlucky (sounds like 死 sǐ, "death"). 九 (jiǔ) is lucky (sounds like 久 jiǔ, "long-lasting"). Phone numbers, license plates, and addresses are priced based on which digits they contain.',
      'sentence',
      'License plate 京A88888 sells for ¥100,000+ · phone numbers ending in 4 are discounted · hotel floor 4 is often labeled "5A"',
      'Not abstract trivia — affects pricing in real estate, telecom, and gifts; sending four flowers to a Chinese elder is offensive.',
      [
        { target: '八 (lucky) — 发 fā', note: 'sounds like "to prosper"; premium for 8s in any number' },
        { target: '六 (lucky) — 流 liú', note: 'sounds like "to flow smoothly"; 六六大顺 is a common blessing' },
        { target: '九 (lucky) — 久 jiǔ', note: 'sounds like "long-lasting / eternal"; popular in wedding dates' },
        { target: '四 (unlucky) — 死 sǐ', note: 'sounds like "to die"; avoid in gifts, addresses, and hospital floors' },
      ],
      [ACT.vocabularyNumbers],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Days, weeks, months, years
    // ────────────────────────────────────────────────────────────────────
    createContentItem('年', 'nián', 'Year. The largest calendar unit and the first element of a Mandarin date. Used as both a noun ("year") and a unit-counter ("two years" = 两年, no measure word needed between 两 and 年).', 'word', '2026 年 èr líng èr liù nián (the year 2026)', 'Years are read digit-by-digit, not as full numbers — 2026 is "two-zero-two-six year", never "two thousand twenty-six year".', null, [ACT.vocabularyCalendar]),
    createContentItem('月', 'yuè', 'Month. Used directly after a Sino-Korean-style cardinal number to name a calendar month: 一月 (January), 二月 (February), 十二月 (December). Also used as a duration unit, but then requires 个 between the number and 月: 三个月 ("three months"), NOT 三月.', 'word', '五月是劳动节的月份 wǔ yuè shì láodòng jié de yuèfèn (May is Labor Day month)', 'CRUCIAL distinction: 五月 = "May" (the 5th calendar month); 五个月 = "five months" (duration). The 个 marks the difference.', null, [ACT.vocabularyCalendar]),
    createContentItem('日', 'rì', 'Day — the WRITTEN form used in formal contexts (news, official documents, signage, dates in print). For everyday speech, 号 is preferred. Both mean the same day-of-month.', 'word', '生日 shēngrì (birthday — literally "birth-day") · 国庆日 guóqìng rì (National Day)', 'Compound words like 生日 always use 日; spoken dates use 号 instead.', null, [ACT.vocabularyCalendar]),
    createContentItem('号', 'hào', 'Day — the SPOKEN form used in everyday conversation. "What\'s today\'s date?" is asked as 今天几号? in speech but written as 今天几日? in formal text. Both refer to the day-of-month number.', 'word', '今天几号? — 今天五月十一号。 jīn tiān jǐ hào? — jīn tiān wǔ yuè shíyī hào.', 'In a conversation always use 号; switching to 日 in spoken Mandarin sounds bookish.', null, [ACT.vocabularyCalendar]),
    createContentItem('星期', 'xīngqī', 'Week — the standard term used both as a unit ("one week" = 一个星期) and as part of weekday names (星期一 = Monday). Slightly more formal than the colloquial alternative 礼拜 (lǐbài).', 'word', '一个星期 yí ge xīngqī (one week) · 星期三 xīngqī sān (Wednesday)', 'Note 一个星期 takes the measure word 个 between the number and 星期, unlike 一年 or 一天 which don\'t need 个.', null, [ACT.vocabularyCalendar]),
    createContentItem('礼拜', 'lǐbài', 'Week — colloquial synonym of 星期. Originally meaning "religious worship" (from Christian missionary usage), it became common in everyday speech. 礼拜一 = Monday, 礼拜天 = Sunday. Slightly more casual than 星期.', 'word', '礼拜天我们去爬山 lǐbài tiān wǒmen qù páshān (Sunday we go hiking)', '北京 speakers tend to favor 星期; 上海 and southern speakers use 礼拜 more often — both are understood everywhere.', null, [ACT.vocabularyCalendar]),
    createContentItem('星期一', 'xīngqī yī', 'Monday — the FIRST weekday in the Chinese week. Unlike English Sunday-as-first-day, Mandarin treats Monday as day 1. The pattern is purely numerical: 星期 + 一 through 六.', 'word', '星期一我有中文课 xīngqī yī wǒ yǒu zhōngwén kè (On Monday I have Chinese class)', 'Weeks structurally start on Monday in Chinese, consistent with the ISO 8601 international standard.', null, [ACT.vocabularyCalendar]),
    createContentItem('星期二', 'xīngqī èr', 'Tuesday. The 2nd weekday. Note this is the only weekday using 二 (NOT 两) because it functions as an ordinal number, not a "two-of-something" quantity.', 'word', '星期二下午我去图书馆 xīngqī èr xiàwǔ wǒ qù túshūguǎn (Tuesday afternoon I go to the library)', 'A useful pattern reminder of the 二 vs 两 distinction — 星期二 fits the ordinal/digit pattern.', null, [ACT.vocabularyCalendar]),
    createContentItem('星期三', 'xīngqī sān', 'Wednesday. The 3rd weekday. The midpoint of the work week.', 'word', '星期三我们开会 xīngqī sān wǒmen kāihuì (We have a meeting on Wednesday)', 'A common weekday for academic seminars and standing meetings.', null, [ACT.vocabularyCalendar]),
    createContentItem('星期四', 'xīngqī sì', 'Thursday. The 4th weekday. Spoken pronunciation: dental s in 星期 then dental s again in 四 — two s sounds back-to-back.', 'word', '星期四晚上去吃饭 xīngqī sì wǎnshang qù chīfàn (Thursday evening we go out to eat)', 'A popular weekday for student dinners and meet-ups in Mainland China.', null, [ACT.vocabularyCalendar]),
    createContentItem('星期五', 'xīngqī wǔ', 'Friday — the end of the standard work week. Sometimes shortened in workplace chat to TGIF-style expressions like 星期五万岁 ("long live Friday!").', 'word', '星期五我们去看电影 xīngqī wǔ wǒmen qù kàn diànyǐng (Friday we go to a movie)', 'High-frequency social-planning weekday; expect many tasks to land on 星期五.', null, [ACT.vocabularyCalendar]),
    createContentItem('星期六', 'xīngqī liù', 'Saturday. The first weekend day. Combined with Sunday into 周末 (zhōumò, "weekend").', 'word', '星期六我去爬长城 xīngqī liù wǒ qù pá Chángchéng (Saturday I go to hike the Great Wall)', 'Often paired with day-trip vocabulary; a key planning day in this lesson\'s task.', null, [ACT.vocabularyCalendar]),
    createContentItem('星期日 / 星期天', 'xīngqī rì / xīngqī tiān', 'Sunday. Two forms: 星期日 (formal, written, broadcast) and 星期天 (casual, conversational). The "7th" position is filled by 日 or 天, NOT 七 — Sunday is never 星期七.', 'word', '星期天我跟朋友吃饭 xīngqī tiān wǒ gēn péngyou chīfàn (Sunday I have a meal with friends)', 'Choose 星期天 in casual speech and 星期日 in writing; switching mid-conversation sounds odd.', null, [ACT.vocabularyCalendar]),
    createContentItem('周末', 'zhōumò', 'Weekend — covers both Saturday and Sunday. Compound of 周 ("week") + 末 ("end"). High-frequency planning word: 周末有空吗? ("free this weekend?") is one of the most common social openers.', 'word', '这个周末你有什么计划? zhè ge zhōumò nǐ yǒu shénme jìhuà? (What are your plans this weekend?)', 'The natural translation of "weekend"; 周末 is preferred over the literal 星期六和星期日.', null, [ACT.vocabularyCalendar]),
    createContentItem('今天 / 昨天 / 明天', 'jīntiān / zuótiān / míngtiān', 'Day anchors: 今天 ("today"), 昨天 ("yesterday"), 明天 ("tomorrow"). The 天 suffix means "day" and is shared across this whole pattern (and across 星期天, 春天, 夏天).', 'sentence', '昨天是星期三，今天是星期四，明天是星期五。 zuótiān shì xīng qī sān, jīntiān shì xīngqī sì, míngtiān shì xīngqī wǔ.', 'Yesterday was Wednesday, today is Thursday, tomorrow is Friday — typical three-day anchoring sentence.',
      [
        { target: '今天 jīntiān', note: '"today"; combines 今 ("present") + 天 ("day")' },
        { target: '昨天 zuótiān', note: '"yesterday"; the most recent past day' },
        { target: '明天 míngtiān', note: '"tomorrow"; the very next future day' },
        { target: '后天 hòutiān', note: '"the day after tomorrow"; one step further in the future' },
        { target: '前天 qiántiān', note: '"the day before yesterday"; one step further in the past' },
      ],
      [ACT.vocabularyCalendar]),
    createContentItem('这个月 / 上个月 / 下个月', 'zhè ge yuè / shàng ge yuè / xià ge yuè', 'Month anchors: 这个月 ("this month"), 上个月 ("last month" — literally "above month"), 下个月 ("next month" — literally "below month"). The 个 measure word is mandatory between the demonstrative and 月.', 'sentence', '上个月是四月，这个月是五月，下个月是六月。', 'Last month was April, this month is May, next month is June.',
      [
        { target: '这个月 zhè ge yuè', note: '"this month"; current month' },
        { target: '上个月 shàng ge yuè', note: '"last month"; spatial metaphor — "上" (up/above) means "earlier in time"' },
        { target: '下个月 xià ge yuè', note: '"next month"; spatial metaphor — "下" (down/below) means "later in time"' },
      ],
      [ACT.vocabularyCalendar]),
    createContentItem('去年 / 今年 / 明年', 'qùnián / jīnnián / míngnián', 'Year anchors: 去年 ("last year" — literally "gone year"), 今年 ("this year"), 明年 ("next year" — literally "bright year"). Unlike months and weeks, these year-words do NOT take 个 — they are inherently noun-like and stand alone.', 'sentence', '去年我学中文，今年我在清华，明年我毕业。', 'Last year I started studying Chinese, this year I am at Tsinghua, next year I graduate.',
      [
        { target: '去年 qùnián', note: '"last year"; 去 ("gone") + 年 ("year")' },
        { target: '今年 jīnnián', note: '"this year"; 今 ("present") + 年 ("year")' },
        { target: '明年 míngnián', note: '"next year"; 明 ("bright / upcoming") + 年 ("year")' },
        { target: '后年 hòunián', note: '"the year after next"; one step further into the future' },
        { target: '前年 qiánnián', note: '"the year before last"; one step further into the past' },
      ],
      [ACT.vocabularyCalendar]),
    createContentItem('这(个)星期 / 上(个)星期 / 下(个)星期', 'zhè (ge) xīngqī / shàng (ge) xīngqī / xià (ge) xīngqī', 'Week anchors: this/last/next week. The 个 is optional — both 这星期 and 这个星期 are correct, with 这个星期 sounding slightly more careful.', 'sentence', '上个星期我没来上课，这个星期我都来了，下个星期有考试。', 'Last week I didn\'t come to class; this week I came every day; next week there\'s an exam.', null, [ACT.vocabularyCalendar]),
    createContentItem('生日', 'shēngrì', 'Birthday — compound of 生 ("born") + 日 ("day"). Common pattern: 我的生日是 + date + 。 ("My birthday is …"). Asking is 你的生日是几月几号? ("What\'s your birthday?").', 'word', '我的生日是六月十一号。 wǒ de shēngrì shì liù yuè shíyī hào.', 'A core unit-six question; expect this in the listening dialogue and the task.', null, [ACT.vocabularyCalendar]),
    createContentItem('考试', 'kǎoshì', 'Exam / test. Compound of 考 ("to examine") + 试 ("to try"). Most common in academic contexts; the question 考试是几月几号? ("What date is the exam?") is high frequency.', 'word', '中文考试是下个星期三。 zhōngwén kǎoshì shì xià ge xīngqī sān.', 'The Chinese exam is next Wednesday — a typical scheduling sentence.', null, [ACT.vocabularyCalendar]),
    createContentItem('假期 / 放假', 'jiàqī / fàngjià', 'Holiday vocabulary: 假期 (jiàqī) is the noun "vacation / break period"; 放假 (fàngjià) is the verb phrase "to be on vacation / to have time off". 寒假 (hánjià) = winter break; 暑假 (shǔjià) = summer break.', 'word', '清华大学的暑假是七月到八月。 Qīnghuá dàxué de shǔjià shì qī yuè dào bā yuè.', 'Tsinghua\'s summer vacation runs July to August — note the 到 ("until / to") pattern for date ranges.', null, [ACT.vocabularyCalendar]),
    createContentItem('节日', 'jiérì', 'Festival / holiday — the umbrella term for any cultural or national celebration. Compound of 节 ("festival") + 日 ("day"). Specific holidays use 节 alone: 春节 (Spring Festival), 国庆节 (National Day), 中秋节 (Mid-Autumn).', 'word', '中国的节日很多，春节是最重要的。 zhōngguó de jiérì hěn duō, chūnjié shì zuì zhòngyào de.', 'China has many festivals; Spring Festival is the most important — a typical cultural framing sentence.', null, [ACT.vocabularyCalendar]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: Dates and 几月几号
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'N 年 N 月 N 日 / 号',
      'date order — year + month + day',
      'The standard Mandarin date order is BIG-to-SMALL: year (N 年) + month (N 月) + day (N 日 written or N 号 spoken). Each unit is a Sino-Chinese number plus its calendar marker, with no commas or other punctuation needed.',
      'sentence',
      '2026 年 5 月 11 日 → spoken: èr líng èr liù nián wǔ yuè shíyī hào',
      'The year is always read digit-by-digit, NEVER as a full number (so 2026 is "two-zero-two-six", not "two thousand twenty-six").',
      [
        { target: '2026 年 → 二零二六年', note: 'year read digit-by-digit; the 0 is 零' },
        { target: '5 月 → 五月', note: 'month is just the cardinal number + 月' },
        { target: '11 日 → 十一日 (written) / 十一号 (spoken)', note: 'day is the number + 日 in formal text and + 号 in conversation' },
      ],
      [ACT.grammarDates],
    ),
    createContentItem(
      '几月几号 — question',
      'jǐ yuè jǐ hào',
      'The standard date question. 几 (jǐ) is the question word for small numbers (typically under 10) and replaces the unknown digit in place. Word order does NOT change from the statement; you simply swap the digit for 几.',
      'sentence',
      '今天几月几号? — 今天五月十一号。 jīntiān jǐ yuè jǐ hào? — jīntiān wǔ yuè shíyī hào.',
      'No movement of the question word to the front — same syntactic rule as 什么 / 哪 from Unit 1.',
      [
        { target: '今天五月十一号 (statement)', note: 'today is May 11 — affirmative form' },
        { target: '今天几月几号? (question)', note: '"today is what-month what-day?"; 几 replaces both unknown numbers in place' },
        { target: '几 vs 多少', note: '几 expects a small number (under ~10); 多少 expects any number including large; for dates, 几 is the convention even though days can reach 31' },
      ],
      [ACT.grammarDates],
    ),
    createContentItem(
      '今天星期几?',
      'jīntiān xīngqī jǐ?',
      'Asks the weekday: literally "today week-which?". The 几 question word replaces the weekday number (一 through 六). For "Is today Sunday?" you would NOT use 几 (because Sunday is 天/日, not a number) — use 吗 instead: 今天是星期天吗?',
      'sentence',
      '今天星期几? — 今天星期四。 jīntiān xīngqī jǐ? — jīntiān xīngqī sì.',
      'Note the answer reuses 星期 + the specific weekday number; you do NOT just say "四" alone.',
      [
        { target: '今天星期几? (question)', note: 'what day of the week is it today?' },
        { target: '今天星期四。 (answer)', note: 'today is Thursday' },
        { target: '是 dropping', note: 'the copula 是 is often dropped in both date and weekday sentences; including it (今天是星期四) is also correct, slightly more formal' },
      ],
      [ACT.grammarDates],
    ),
    createContentItem(
      '是 in date sentences — optional',
      'shì optionality in time sentences',
      'In statements about dates, weekdays, and times, the copula 是 is OPTIONAL: 今天五月十一号 and 今天是五月十一号 are both correct. Dropping 是 is the more natural conversational form; including it adds slight emphasis or formality.',
      'sentence',
      'casual: 今天五月十一号，星期一。\nformal: 今天是 2026 年 5 月 11 日，星期一。',
      'One of very few sentence types where 是 is droppable; in identity sentences (Unit 1) 是 was mandatory.',
      [
        { target: 'with 是 (formal): 今天是星期一', note: 'slightly more emphatic; news anchors and formal writing prefer this' },
        { target: 'without 是 (casual): 今天星期一', note: 'natural conversational form; equally grammatical' },
      ],
      [ACT.grammarDates],
    ),
    createContentItem(
      'Reading a year out loud',
      'reading years digit-by-digit',
      'Years in Mandarin are ALWAYS read digit-by-digit, never as full numbers. 2026 is "二零二六" (èr líng èr liù), not "两千零二十六" (which would be the math number 2,026). The year 2008 is "二零零八", with two 零s in a row.',
      'sentence',
      '2026 年 → 二零二六年 èr líng èr liù nián\n1949 年 → 一九四九年 yī jiǔ sì jiǔ nián\n2008 年 → 二零零八年 èr líng líng bā nián',
      'A common English-speaker mistake: trying to read 2026 as a full number; in Mandarin years are always treated as digit sequences like phone numbers.',
      [
        { target: '2026 → 二零二六', note: 'each digit named separately; the 0 becomes 零' },
        { target: '1949 → 一九四九', note: 'year of the People\'s Republic of China founding; read 1-9-4-9' },
        { target: '2008 → 二零零八', note: 'two 零s in a row; year of the Beijing Olympics' },
      ],
      [ACT.grammarDates],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Duration with 多长时间 / 多久
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '多长时间 / 多久',
      'duō cháng shíjiān / duō jiǔ',
      'Two ways to ask "how long": 多长时间 (slightly formal, literal "how-long time?") and 多久 (more conversational, literal "how-long?"). Both are fully interchangeable for asking duration. Place them at the end of the question for a natural rhythm.',
      'sentence',
      '你学中文多长时间了? = 你学中文多久了? — 我学了两年。',
      'Both versions get the same answer; switching mid-conversation is fine — neither sounds wrong.',
      [
        { target: '多长时间 duō cháng shíjiān', note: '"how long (duration of time)?"; the more literal, slightly formal version' },
        { target: '多久 duō jiǔ', note: '"how long?"; conversational, common in everyday speech' },
        { target: '多大 vs 多长 vs 多远', note: 'don\'t confuse: 多大 ("how old/big"), 多长 ("how long" — physical or temporal), 多远 ("how far")' },
      ],
      [ACT.grammarDuration],
    ),
    createContentItem(
      'Number + duration unit',
      'how to express durations',
      'A duration is built as number + unit. Critical rule about 个 (the general measure word): 年 (year) and 天 (day) take NO 个 between the number and the unit; 月 (month) and 星期 (week) DO require 个 in duration contexts. Hours and minutes have their own counters.',
      'sentence',
      '两年 (2 years) · 三个月 (3 months) · 五个星期 (5 weeks) · 七天 (7 days) · 半个小时 (half an hour) · 二十分钟 (20 minutes)',
      'The 个-or-not pattern is a memorization task — there is no simple rule beyond which units take it.',
      [
        { target: '年 (year) — no 个', note: 'e.g., 一年 (1 yr), 两年 (2 yrs), 十年 (10 yrs) — never 一个年' },
        { target: '月 (month) — needs 个', note: 'e.g., 一个月 (1 mo), 三个月 (3 mos) — never 三月 (which means "March")' },
        { target: '星期 (week) — needs 个', note: 'e.g., 一个星期 (1 wk), 两个星期 (2 wks)' },
        { target: '天 (day) — no 个', note: 'e.g., 一天 (1 day), 三天 (3 days), 一百天 (100 days)' },
        { target: '小时 (hour) — needs 个', note: 'e.g., 一个小时 (1 hr), 两个小时 (2 hrs)' },
        { target: '分钟 (minute) — no 个', note: 'e.g., 五分钟 (5 min), 三十分钟 (30 min)' },
      ],
      [ACT.grammarDuration],
    ),
    createContentItem(
      '了 — ongoing duration',
      'sentence-final 了 with duration',
      'CRITICAL distinction: a duration sentence WITHOUT final 了 describes a COMPLETED past duration; the SAME sentence WITH final 了 describes a duration STILL ONGOING. Both are about a time span — the 了 changes whether you are still doing it now.',
      'sentence',
      '我学了中文两年。 ("I studied Chinese for two years" — finished, may have stopped)\n我学中文学了两年了。 ("I have been studying Chinese for two years" — still doing it)',
      'The second 了 (at the very end) is the marker of "and still going" — it changes the meaning meaningfully.',
      [
        { target: '我学了中文两年。', note: 'completed duration; the speaker may have stopped studying' },
        { target: '我学中文学了两年了。', note: 'ongoing duration; the speaker is still studying right now' },
        { target: '我在清华学习两年了。', note: '"I have been studying at Tsinghua for two years (and still am)"; ongoing duration with location' },
      ],
      [ACT.grammarDuration],
    ),
    createContentItem(
      'Duration verb repetition',
      'verb repetition with object',
      'When the verb takes an object and a duration, the verb must be REPEATED: 学中文 + 学两年 → 我学中文学了两年了. The object comes first with the verb, then the verb is repeated with the duration. Without an object the repetition is unnecessary: 我学了两年了.',
      'sentence',
      'no object: 我学了两年了。 ("I have been studying for two years")\nwith object: 我学中文学了两年了。 ("I have been studying Chinese for two years")',
      'The repetition pattern feels redundant to English ears but is the natural Mandarin solution to fitting both object and duration into one sentence.',
      [
        { target: '我学中文学了两年了', note: 'verb 学 repeats: first with the object 中文, then with the duration 两年' },
        { target: '我在北京住了三年了', note: 'verb 住 with location/object: 在北京住, then 住了三年 — duration goes after the second 住' },
        { target: '我看了一个小时电视', note: 'alternative pattern: duration BETWEEN verb and object, no repetition; less common but acceptable for some verbs' },
      ],
      [ACT.grammarDuration],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Sequencing with 以前 / 以后 / 的时候
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '以前 — before',
      'yǐqián — "before"',
      'Place 以前 AFTER the event word, not before — opposite of English word order. Pattern: [event] + 以前. So "before class" is 上课以前, NOT 以前上课. The event being referenced is whatever ends right before 以前.',
      'sentence',
      '上课以前我喝咖啡。 shàng kè yǐqián wǒ hē kāfēi.\n来中国以前，我没学过中文。 lái zhōngguó yǐqián, wǒ méi xué guò zhōngwén.',
      'Before class, I drink coffee. Before coming to China, I had not studied Chinese — note 以前 always SITS AFTER its event clause.',
      [
        { target: '上课以前 shàng kè yǐqián', note: '"before class"; the event 上课 ("attend class") comes first, then 以前' },
        { target: '来中国以前 lái zhōngguó yǐqián', note: '"before coming to China"; full verb-phrase + 以前' },
        { target: '一年以前 yì nián yǐqián', note: '"one year ago"; quantity + 以前 forms a time-ago expression' },
        { target: '以前 alone', note: 'used at the start of a sentence, means "in the past / formerly" — 以前我不会说中文 ("I didn\'t used to speak Chinese")' },
      ],
      [ACT.grammarSequencing],
    ),
    createContentItem(
      '以后 — after',
      'yǐhòu — "after"',
      'Symmetric counterpart to 以前. Place 以后 AFTER the event word. Pattern: [event] + 以后. So "after eating" is 吃饭以后, NOT 以后吃饭. Used to introduce a subsequent action.',
      'sentence',
      '吃饭以后我们去看电影。 chī fàn yǐhòu wǒmen qù kàn diànyǐng.\n毕业以后我想去日本工作。 bìyè yǐhòu wǒ xiǎng qù Rìběn gōngzuò.',
      'After eating, we go to a movie. After graduation, I want to work in Japan — 以后 anchors a future action onto an earlier event.',
      [
        { target: '吃饭以后 chī fàn yǐhòu', note: '"after eating"; the event 吃饭 ("eat a meal") comes first' },
        { target: '毕业以后 bìyè yǐhòu', note: '"after graduating"; a common life-event anchor' },
        { target: '两年以后 liǎng nián yǐhòu', note: '"two years from now"; quantity + 以后 forms a time-from-now expression' },
        { target: '以后 alone', note: 'used at the start of a sentence, means "in the future / later" — 以后我想去中国 ("Later I want to go to China")' },
      ],
      [ACT.grammarSequencing],
    ),
    createContentItem(
      '的时候 — when / at the time of',
      'de shíhou — "when / while"',
      'Frames a BACKGROUND TIME during which something else happened. Place 的时候 AFTER the event clause. Pattern: [clause] + 的时候. Unlike 以前/以后 which sequence two events, 的时候 marks ONE event happening DURING another.',
      'sentence',
      '我小的时候很喜欢画画。 wǒ xiǎo de shíhou hěn xǐhuan huà huà.\n上课的时候不能玩手机。 shàng kè de shíhou bù néng wán shǒujī.',
      'When I was little, I loved drawing. During class, you can\'t play with your phone — the second clause describes what happens DURING the first.',
      [
        { target: '我小的时候 wǒ xiǎo de shíhou', note: '"when I was little"; 小 ("small / young") as a stative verb + 的时候' },
        { target: '上课的时候 shàng kè de shíhou', note: '"during class / while in class"; ongoing activity + 的时候' },
        { target: '吃饭的时候 chī fàn de shíhou', note: '"while eating"; common collocation' },
        { target: 'contrast with 以后', note: '吃饭的时候 (DURING the meal) vs 吃饭以后 (AFTER the meal) — completely different timings' },
      ],
      [ACT.grammarSequencing],
    ),
    createContentItem(
      'Sequencing word position',
      'syntactic position summary',
      'KEY RULE: 以前, 以后, and 的时候 ALL come AFTER the event clause they refer to — opposite of English "before X", "after X", "when X" which all come BEFORE the event. This reversal is the single biggest hurdle for English speakers learning Chinese sequencing.',
      'sentence',
      'English: "Before class I drink coffee" → Mandarin: 上课以前我喝咖啡。 (literal: "class-attend before I drink coffee")\nEnglish: "When I was little" → Mandarin: 我小的时候 (literal: "I young when")',
      'Drill this reversal until it is automatic — getting it wrong produces ungrammatical Mandarin that native speakers find hard to parse.',
      [
        { target: 'English: before/after/when + event', note: 'preposition or conjunction comes FIRST, then the event' },
        { target: 'Mandarin: event + 以前/以后/的时候', note: 'event comes FIRST, then the time-relation marker — OPPOSITE order' },
      ],
      [ACT.grammarSequencing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '清华大学的学期日程',
      'Qīnghuá dàxué de xuéqī rìchéng',
      'A short paragraph describing the Tsinghua University academic calendar. Read aloud with correct dates, weekdays, and durations, then answer the comprehension questions below. Notice how dates flow in the year-month-day order and how durations use the 多长时间 / 了 patterns.',
      'sentence',
      '清华大学的春季学期从二月二十四号开始，星期一开学。期中考试是四月二十二号，星期三。五月一号是劳动节，放假三天。我的生日是六月十一号，星期四。学期六月二十一号结束，暑假从七月一号开始，一共两个月。',
      'Translation: "Tsinghua University\'s spring semester starts on February 24, a Monday. Midterm exams are on April 22, a Wednesday. May 1 is Labor Day, with a three-day break. My birthday is June 11, a Thursday. The semester ends on June 21; summer vacation begins on July 1 and lasts a total of two months."',
      [
        { target: '春季学期 chūn jì xuéqī', note: '"spring semester"; 春季 ("spring season") + 学期 ("semester")' },
        { target: '开学 kāi xué', note: '"to start the school year / semester"; verb compound' },
        { target: '期中考试 qī zhōng kǎo shì', note: '"midterm exam"; 期中 ("middle of the term") + 考试 ("exam")' },
        { target: '劳动节 láo dòng jié', note: 'Labor Day; May 1 in mainland China — a major public holiday' },
        { target: '放假 fàng jià', note: '"to be off / on vacation"; verb phrase used with a duration' },
        { target: '一共 yí gòng', note: '"in total / altogether"; common with durations and quantities' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions about the paragraph. Answer in short Mandarin sentences using 是 + date or weekday; full sentences are not required for natural Mandarin.',
      'sentence',
      'Q1: 春季学期几月几号开始? Q2: 期中考试是星期几? Q3: 暑假多长时间? Q4: 我的生日是星期几?',
      'Q1: What date does the spring semester start? Q2: What day of the week is the midterm? Q3: How long is summer vacation? Q4: What day of the week is my birthday?',
      [
        { target: 'A1: 二月二十四号。', note: 'date answer using 月 + 号; the year is contextually clear so it can be omitted' },
        { target: 'A2: 星期三。', note: 'weekday answer using 星期 + number' },
        { target: 'A3: 两个月。', note: 'duration answer using 两 + 个 + 月 — note 两 not 二, and 个 required before 月' },
        { target: 'A4: 星期四。', note: 'short weekday answer; can also say 我的生日是星期四 for fuller form' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '约时间 (对话)',
      'yuē shíjiān (duìhuà)',
      'A natural scheduling dialogue between two Tsinghua classmates negotiating a weekend get-together. Covers all the date, weekday, duration, and time-anchor patterns from this unit. The polite hedges (不好意思, 我看看, 行不行?) signal real conversational rhythm.',
      'conversation',
      'A: 这个周末有空吗? 我们一起吃饭，怎么样?\nB: 我看看…星期六我有事，星期天可以。\nA: 那就星期天吧。几月几号是星期天?\nB: 五月十七号。\nA: 行! 中午十二点见，怎么样?\nB: 不好意思，我下午两点才有空。\nA: 那两点也行。 在哪儿见?\nB: 学校东门那家咖啡店，行不行?\nA: 好，就这么定了。下个星期天五月十七号下午两点，东门咖啡店见!\nB: 好的，到时候见!',
      'A typical scheduling exchange between Chinese university friends — pinpoints date, weekday, time, and location in 8 quick turns.',
      [
        { target: '我看看 wǒ kàn kan', note: '"let me check / let me see"; polite filler before giving an answer about availability' },
        { target: '我有事 wǒ yǒu shì', note: '"I have something on / I\'m busy"; common indirect "no" without giving details' },
        { target: '那就…吧 nà jiù … ba', note: '"then let\'s …"; 那 ("then") + 就 ("just") + suggestion + 吧 ("modal softener") — proposes a settled choice' },
        { target: '不好意思 bù hǎo yìsi', note: '"sorry / excuse me"; softer than 对不起, used for small inconveniences' },
        { target: '才 cái', note: 'adverb meaning "not until / only at"; 下午两点才有空 = "not free until 2 PM"' },
        { target: '行不行? xíng bù xíng?', note: 'verb-not-verb question — "does that work?"; asks for agreement' },
        { target: '就这么定了 jiù zhème dìng le', note: '"then it\'s settled / decided"; common closing of a planning conversation' },
        { target: '到时候见 dào shíhou jiàn', note: '"see you then"; closes the call with the time-reference 到时候 ("when the time comes")' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '约时间 (对话 — 正式)',
      'yuē shíjiān (duìhuà — zhèngshì)',
      'A formal version of the scheduling dialogue, suitable for a student-professor or business context. Notice the formal vocabulary: 请问, 您, 方便, 商量 — register markers signaling a more deliberate interaction.',
      'conversation',
      '学生: 老师您好，请问下个星期您方便见个面吗?\n老师: 你好。下个星期我看一下…星期二下午我有时间。\n学生: 谢谢老师。 几号几点方便?\n老师: 五月十九号，下午三点到四点，可以吗?\n学生: 完全可以。我们在您办公室见，行吗?\n老师: 好的。到时候请准时。\n学生: 好的，老师，谢谢您!',
      'Same information as the casual version but with formal phrasing throughout — appropriate for hierarchical (student-professor) scheduling.',
      [
        { target: '请问 qǐng wèn', note: '"may I ask"; formal opener for any question to a senior person' },
        { target: '方便 fāng biàn', note: '"convenient / available"; polite way to ask about availability without being too direct' },
        { target: '商量 shāng liang', note: '"to discuss / consult"; formal verb for collaborative decisions' },
        { target: '准时 zhǔn shí', note: '"on time / punctual"; formal request added to confirm timing matters' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable template for describing your weekly schedule. Fill in the bracketed slots with your own information — the structure carries the rest. Aim for at least one event per weekday and one duration phrase.',
      'sentence',
      '我的星期一到星期五很忙。星期一我[早上几点]去上[什么课]。星期二[活动]，[多久]。星期三晚上我[活动]。星期四下午[活动]。星期五[活动]。周末我[活动]，比平时轻松。我学中文学了[多长时间]了。',
      '[Day-by-day schedule + one duration sentence + weekend contrast — the minimum complete weekly description.]',
      [
        { target: '[早上几点]', note: 'your usual start time — use number + 点 (e.g., 八点 "8 o\'clock")' },
        { target: '[什么课]', note: 'your class subject (e.g., 中文课 "Chinese class", 数学课 "math class")' },
        { target: '[活动]', note: 'a specific weekday activity using a verb phrase (e.g., 去图书馆 "go to the library")' },
        { target: '[多久]', note: 'duration of the activity using number + unit (e.g., 两个小时 "two hours")' },
        { target: '[多长时间]', note: 'total duration of your Chinese study (e.g., 一年 "one year", 三个月 "three months")' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 5–6 sentence weekly schedule in Hanzi using the template. Include at least one duration phrase (e.g., 两个小时) and at least one sequencing phrase (with 以前, 以后, or 的时候) so the writing demonstrates the full unit grammar.',
      'sentence',
      '示例: 我的星期一到星期五很忙。星期一早上八点我去上中文课，下课以后去图书馆学习两个小时。星期二下午我有数学课。星期三晚上我跟朋友一起吃饭。星期四我在咖啡店打工四个小时。星期五我去健身房。周末我休息，看电影或者爬山。我学中文学了一年了，现在能写一段日记了。',
      'Translation: "My Monday to Friday is busy. Monday 8 AM I attend Chinese class; after class I go to the library to study for two hours. Tuesday afternoon I have math class. Wednesday evening I have dinner with friends. Thursday I work part-time at a coffee shop for four hours. Friday I go to the gym. On weekends I rest, watch movies, or hike. I have been studying Chinese for a year, and now I can write a short journal entry."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '阳历 vs 农历',
      'yánglì vs nónglì',
      'Mainland China uses two calendars side-by-side: 阳历 (yánglì, "solar calendar / Gregorian") for daily life, official business, and most birthdays; and 农历 (nónglì, "lunar / agricultural calendar") for traditional holidays. Older Chinese often celebrate birthdays on the lunar date; younger urban Chinese tend to use the solar date.',
      'sentence',
      '我的阳历生日是六月十一号，但是农历生日每年不一样。 wǒ de yánglì shēngrì shì liù yuè shíyī hào, dàn shì nónglì shēngrì měi nián bù yí yàng.',
      'My solar birthday is June 11, but my lunar birthday is different every year — a typical bicultural framing common in family conversations.',
      [
        { target: '阳历 yánglì', note: '"solar calendar / Gregorian"; the international standard used for daily life and official records' },
        { target: '农历 nónglì', note: '"lunar / agricultural calendar"; used for traditional holidays and many traditional birthdays' },
        { target: '阴历 yīnlì', note: 'older synonym for 农历; literally "lunar calendar"; less common in modern usage' },
        { target: '公历 gōnglì', note: 'synonym for 阳历; literally "public calendar"; common in news and formal writing' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '中国主要节日',
      'zhōngguó zhǔyào jiérì',
      'The major Chinese holidays split between solar and lunar dates. Solar-date holidays (元旦, 劳动节, 国庆节) have fixed Gregorian dates. Lunar-date holidays (春节, 元宵节, 端午节, 中秋节) move on the Gregorian calendar every year. Spring Festival is by far the most important.',
      'sentence',
      '春节 (lunar Jan 1 — late Jan to mid-Feb) · 国庆节 (Oct 1, solar) · 中秋节 (lunar Aug 15 — Sept) · 劳动节 (May 1, solar) · 清明节 (around Apr 5, solar — adjusted to the spring equinox)',
      'A typical Chinese workplace shuts down for 7 days during Spring Festival and 7 days during National Day — these are the two "golden weeks" of the year.',
      [
        { target: '春节 chūnjié — Spring Festival', note: 'Lunar New Year; the biggest holiday of the year; falls in late Jan or Feb on the Gregorian calendar' },
        { target: '国庆节 guóqìngjié — National Day', note: 'October 1; celebrates the founding of the People\'s Republic of China in 1949' },
        { target: '中秋节 zhōngqiūjié — Mid-Autumn Festival', note: 'Lunar Aug 15; family-reunion holiday; mooncakes (月饼 yuèbǐng) are the traditional food' },
        { target: '劳动节 láodòngjié — Labor Day', note: 'May 1; international workers\' day; usually a 3-5 day public holiday' },
        { target: '清明节 qīngmíngjié — Tomb-Sweeping Day', note: 'Around Apr 5; tied to the solar term 清明; families visit ancestral graves' },
        { target: '端午节 duānwǔjié — Dragon Boat Festival', note: 'Lunar May 5; commemorates poet Qu Yuan; traditional food is 粽子 (zòngzi, sticky-rice dumplings)' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '中国传统年龄',
      'zhōngguó chuántǒng niánlíng',
      'Traditional Chinese age was counted differently: a baby was 一岁 (yí suì, "one year old") at birth and gained another year at every Spring Festival, NOT on the birthday. So a baby born one week before Spring Festival could be "two years old" after a week. Mainland China now officially uses international age (周岁 zhōusuì), but the traditional system (虚岁 xūsuì) persists in older speech.',
      'sentence',
      '我周岁是二十二岁，但是虚岁是二十三岁。 wǒ zhōusuì shì èr shí èr suì, dàn shì xūsuì shì èr shí sān suì.',
      'I am 22 by international count but 23 by traditional Chinese count — a sentence many Chinese friends naturally use to disambiguate.',
      [
        { target: '周岁 zhōusuì', note: 'international age (number of completed years since birth); used officially in Mainland China today' },
        { target: '虚岁 xūsuì', note: 'traditional Chinese age (incremented at Lunar New Year, starts at 1 at birth); typically 1-2 years higher than 周岁' },
        { target: '岁 suì', note: 'measure word for years of age; 几岁? ("how old?") works for children; 多大? for teens and adults' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 约一个周末聚会',
      'rènwù: yuē yí ge zhōumò jùhuì',
      'Roleplay planning a weekend get-together with the AI tutor playing a Tsinghua classmate. Use every skill from this unit in one continuous scene — propose a date, settle on a weekday, agree on a time, pick a venue, and confirm. Aim for at least 6 turns.',
      'conversation',
      '[Tsinghua campus, after class]\n同学: 这个周末有空吗? 我想一起出去玩。\n你: [react + ask which day]\n同学: 你看，星期六和星期天哪天行?\n你: [pick one + give the date]\n同学: 好的，那几点见?\n你: [propose a time + check availability]\n同学: 行不行? 然后去哪儿?\n你: [propose a venue]\n同学: 好，就这么定了。到时候见!\n你: [farewell]',
      'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: '提议日期', note: '我看星期六行不行? — propose a weekday using 行不行 for confirmation' },
        { target: '说出具体日期', note: '五月十七号 — give the year-month-day form (year optional if obvious)' },
        { target: '提议时间', note: '下午两点行吗? — propose a time using number + 点 + 行吗' },
        { target: '提议地点', note: '在学校东门的咖啡店见，怎么样? — propose a place with the 怎么样 confirmation pattern' },
        { target: '告别', note: '到时候见 / 那就这么定了 — close the conversation with a friendly settle-phrase' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 处理冲突',
      'tiǎozhàn — chǔlǐ chōngtū',
      'Stretch goal: in the same scene, your classmate proposes a date that doesn\'t work for you. Politely decline using 不好意思 + reason, then counter-propose an alternative date and time. Closes the loop without making the asker feel rejected.',
      'conversation',
      '同学: 星期六下午两点在咖啡店见，怎么样?\n你: 不好意思，星期六下午我有中文课。星期天可以吗?\n同学: 星期天我也行! 几点见?\n你: 我看…下午三点行不行? 我们也可以去公园散步。\n同学: 行啊! 那就星期天下午三点在公园见。',
      'A natural conflict-resolution mini-dialogue: declining politely, giving a reason, counter-proposing — the full social skill of scheduling.',
      [
        { target: '不好意思…我有[事/课/约]', note: 'standard polite decline pattern; gives a brief reason without over-explaining' },
        { target: '…可以吗? / 行不行?', note: 'counter-proposal closers; soften the new suggestion and invite agreement' },
        { target: '我看…', note: '"let me think / how about…"; transitional filler that signals you are about to make a counter-proposal' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
