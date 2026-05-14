// Level 2 (Adult Track) Unit 9 — 周末和休闲 (Weekend & Leisure, Mandarin Chinese)
// Functions: describe a working-adult weekend, talk about hobbies and social-media life,
// compare options with 比起…来…, make active choices with 与其…不如…, recommend
// outings, and navigate Monday-morning small talk after a weekend escape from the city.
//
// Context: a working adult in Beijing. The 双休/单休/调休 calendar reality, the
// 内卷 pressure that bleeds into 周末焦虑, the 民宿 + 怀柔/密云 boutique-stay boom,
// city exploration via 小红书, and the post-2020 露营 craze.
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
  orientation: 'zh-l2au9-orientation',
  pronunciation: 'zh-l2au9-pronunciation',
  vocabularyWeekend: 'zh-l2au9-vocab-weekend',
  vocabularyHobbies: 'zh-l2au9-vocab-hobbies',
  vocabularySocial: 'zh-l2au9-vocab-social',
  grammarFrequency: 'zh-l2au9-grammar-frequency',
  grammarCompare: 'zh-l2au9-grammar-compare',
  grammarChoice: 'zh-l2au9-grammar-choice',
  reading: 'zh-l2au9-reading',
  listening: 'zh-l2au9-listening',
  writing: 'zh-l2au9-writing',
  culture: 'zh-l2au9-culture',
  task: 'zh-l2au9-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Describe how a Beijing working adult actually spends a weekend — recharging, escaping the city, family time, or living the 慢生活 (slow-living) ideal.',
      'Distinguish 双休 (two-day weekend), 单休 (one-day weekend), 加班 (overtime work), and 调休 (compensatory day-off) so you can talk about your real schedule with a colleague.',
      'Use frequency adverbs (总是 / 一直 / 经常), comparison patterns (比起…来…), and active-choice patterns (与其…不如…) to express preference, habit, and decision when chatting about weekends.',
    ],
    task: 'Picture Monday morning at the 清华大学 lab where you work — a colleague asks how you spent the weekend. By the end of this lesson you should describe one specific outing (e.g., a 怀柔 mountain hike or 798 art district stroll), explain your choice with 与其…不如…, and recommend something for them — all in fluent Mandarin without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce the lesson signature words with their tone shapes intact: 远足 (yuǎnzú, 3+2), 露营 (lùyíng, 4+2), 与其 (yǔqí, 3+2), 比起 (bǐqǐ, 3+3 → sandhi to 2+3).',
      'Apply third-tone sandhi automatically in adverb clusters that recur in this unit: 比起 bǐqǐ → bíqǐ, 总是 zǒngshì (3+4) stays as written, 一直 yīzhí applies the 一 sandhi (yī → yì before second tone).',
      'Distinguish the retroflex initials in high-frequency weekend words: 周末 zhōumò, 朋友圈 péngyǒuquān, 抖音 dǒuyīn, 追剧 zhuījù.',
    ],
    task: 'Read each example aloud, identify whether tone sandhi applies, then pronounce the spoken version (not the written tones).',
  },
  {
    id: ACT.vocabularyWeekend,
    section: 'Vocabulary I',
    title: 'Weekend rhythms — 双休 / 调休 / 周边游',
    goals: [
      'Master 16 weekend-related words covering schedule reality (双休, 单休, 加班, 调休), modes of weekend (出去玩, 在家躺, 周边游, 度假), and outing types (远足, 露营, 民宿, 慢生活).',
      'Use them in the way a Beijing working adult actually talks — not the textbook ideal, but the lived reality of 调休 making a weekend a single day or stretching it to five.',
    ],
    task: 'Say each phrase out loud three times, then sort the 16 items into three buckets: schedule words, mode-of-weekend words, and outing-type words.',
  },
  {
    id: ACT.vocabularyHobbies,
    section: 'Vocabulary II',
    title: 'Social hobbies — 健身 / 探店 / 追剧',
    goals: [
      'Master 12 hobby and leisure words that working adults actually use on weekends — both active (健身, 瑜伽, 钓鱼, 远足) and screen-based (刷视频, 追剧, 看展览).',
      'Distinguish the active-vs-passive contrast a colleague might ask about: 你周末去健身房 (you go to the gym?) vs 你在家追剧 (you binge a series at home?).',
    ],
    task: 'State two hobbies you actually do on weekends and one you have never tried, using the 比起…来 pattern to compare your preference.',
  },
  {
    id: ACT.vocabularySocial,
    section: 'Vocabulary III',
    title: 'Social media — 朋友圈 / 小红书 / 抖音',
    goals: [
      'Recognize the four major Chinese social platforms and their weekend roles: 朋友圈 (WeChat Moments, post photos to friends), 小红书 (Xiaohongshu, restaurant/travel discovery), 抖音 (Douyin/TikTok, short videos), 微博 (Weibo, public discussion).',
      'Use the verbs that pair with each platform: 发朋友圈 (post on Moments), 刷小红书 (scroll Xiaohongshu), 看抖音 (watch Douyin), 上微博 (go on Weibo). Each app has its own register and its own social signal.',
    ],
    task: 'Describe how you used three of the four platforms last weekend (or wished you had), using the right verb-platform pairing for each.',
  },
  {
    id: ACT.grammarFrequency,
    section: 'Grammar I',
    title: '总是 / 一直 / 经常 — three flavors of frequency',
    goals: [
      'Use 总是 (zǒngshì) for "always (sometimes with complaint or pattern)" — e.g., 你总是加班 ("you are always working overtime", a colleague observation).',
      'Use 一直 (yīzhí) for "continuously / all along" — a sustained span rather than a repeated habit, e.g., 我一直在家躺 ("I have been lying around at home the whole time").',
      'Use 经常 (jīngcháng) for "often" — neutral frequency with no complaint or continuous nuance, e.g., 我经常去远足 ("I often go hiking").',
    ],
    task: 'Write one sentence for each adverb describing your own weekend pattern, then explain to yourself why each adverb is the right choice (complaint vs continuous vs neutral).',
  },
  {
    id: ACT.grammarCompare,
    section: 'Grammar II',
    title: '比起…来… — compared to X, …',
    goals: [
      'Use the 比起 X 来，Y… pattern to weigh two options. Literally "starting from comparing X, Y…" — the conclusion about Y comes after the comma, often with 更 (more) or a preference verb.',
      'Distinguish from the simpler 比 comparison (A 比 B…) which compares two things on a measurable scale. 比起…来… frames a preference; 比 measures a difference.',
      'Apply 比起…来… in colleague small-talk: 比起出去玩，我更喜欢在家躺 ("compared to going out, I prefer lying around at home").',
    ],
    task: 'Construct three preference statements using 比起…来…, each comparing a weekend option a Beijing working adult might face.',
  },
  {
    id: ACT.grammarChoice,
    section: 'Grammar III',
    title: '与其…不如… — rather than X, prefer Y',
    goals: [
      'Use 与其 X，不如 Y to express an active choice: "rather than doing X, it is better to do Y". Both clauses are real options the speaker considered; Y is the chosen one.',
      'Distinguish from 比起…来… (which is a soft preference) and from 不是…而是… (which is a flat correction). 与其…不如… implies deliberate decision-making after weighing two real options.',
      'Apply 与其…不如… to weekend choices: 与其在城里堵车，不如去怀柔住民宿 ("rather than getting stuck in city traffic, it is better to stay at a 民宿 in Huairou").',
    ],
    task: 'Write three 与其…不如… sentences about weekend choices you have actually made or seen colleagues make.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a colleague\'s weekend recap',
    goals: [
      'Read a 6-sentence weekend recap by a 清华大学 colleague who hiked 怀柔 with friends, with correct tones, sandhi, and natural rhythm.',
      'Answer comprehension questions about where the colleague went, what they decided against, why, and what they recommend — using the grammar patterns from this lesson.',
    ],
    task: 'Read the paragraph aloud once, then answer four comprehension questions in complete short sentences using 比起…来… or 与其…不如… where appropriate.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Monday-morning chat in the 清华 lab',
    goals: [
      'Follow a 5-turn Monday-morning chat between two 清华大学 lab colleagues comparing weekends: one went hiking in 怀柔, the other stayed home scrolling 小红书 and 追剧.',
      'Reproduce the dialogue with your own weekend, using 总是 / 一直 / 经常 for frequency and 比起…来… or 与其…不如… for preference.',
    ],
    task: 'Read the dialogue along with the tutor first, then perform it again swapping in your real weekend information.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your weekend recap for 朋友圈',
    goals: [
      'Write a 4–5 sentence weekend recap suitable for posting on 朋友圈 (WeChat Moments), covering one specific outing or activity plus a short reflection.',
      'Use at least one frequency adverb (总是 / 一直 / 经常) and at least one comparison/choice pattern (比起…来… or 与其…不如…), so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Write your own 4–5 sentence 朋友圈 post about a real or imagined Beijing weekend, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '内卷, 双十一, 周末焦虑, and the 民宿 boom',
    goals: [
      'Understand 内卷 (nèijuǎn, "involution") — the cultural pressure of pointless competitive overwork — and how it produces 周末焦虑 (weekend anxiety), where workers feel guilty for resting.',
      'Know that 双十一 (Double Eleven) is NOT just Singles Day shopping — it is two overlapping things on November 11: the original 光棍节 (Singles Day, 1990s university dorm humor) AND the Alibaba-driven 双十一 shopping festival (since 2009). Treating them as the same misses half the cultural meaning.',
      'Recognize the 民宿 (boutique-homestay) boom in Beijing\'s 怀柔 and 密云 outskirts as the weekend escape valve, and the role of 小红书 as the de-facto city-exploration guide app powering 城市探索 culture, plus the post-2020 露营 boom that turned camping from a fringe hobby into mainstream urban-millennial weekend life.',
    ],
    task: 'Compare 内卷 + 周末焦虑 with the work-rest balance in your own culture, then say one specific 民宿 or 露营 destination in Beijing\'s outskirts you would want to try (use 小红书 search terms if you know them).',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Monday-morning chat — 周末怎么过的？',
    goals: [
      'Combine everything from this lesson into one continuous 6-turn scene with a 清华大学 lab colleague who asks how you spent the weekend.',
      'Describe one specific outing, use 与其…不如… to explain why you chose it over an alternative, and recommend something for the colleague — all in natural Mandarin without rehearsing each line.',
    ],
    task: 'Roleplay the Monday-morning chat with the tutor playing your 清华大学 lab colleague; aim for a 6-turn exchange in Mandarin.',
  },
];

const lesson = {
  title: 'Level 2 (Adult) · Unit 9: 周末怎么过？— Weekend & Leisure for Working Adults',
  category: 'daily-life',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'sharing-weekend', label: 'Sharing a weekend outing', goal: 'Describe one specific weekend activity (where, with whom, what happened) using 总是 / 一直 / 经常 for frequency and at least one concrete vocab item (远足, 露营, 民宿, etc.).' },
    { id: 'comparing-options', label: 'Comparing two weekend options', goal: 'Use 比起…来… to weigh two real choices a Beijing working adult might face, then state your preference with 更喜欢 or 更想.' },
    { id: 'making-active-choice', label: 'Explaining an active choice', goal: 'Use 与其…不如… to explain why you chose option Y after considering option X — make both options feel like real alternatives, not a strawman.' },
    { id: 'recommending-outing', label: 'Recommending an outing to a colleague', goal: 'Suggest a specific 周边游 or 民宿 destination in Beijing\'s outskirts (怀柔, 密云, 798) and mention how the colleague can find more info on 小红书.' },
  ],
  relatedPools: ['topic-people', 'topic-daily-life'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can describe a working adult\'s Beijing weekend in fluent Mandarin — schedule reality (双休/单休/加班/调休), one specific outing, your hobby preferences, and your social-media life — and chat about all of it with a colleague on Monday morning.',
      'word',
      'Functional language: 描述周末 miáoshù zhōumò (describe weekend) · 推荐 tuījiàn (recommend) · 比较 bǐjiào (compare) · 选择 xuǎnzé (choose) · 抱怨 bàoyuàn (complain about overtime)',
      'These five micro-skills are the spine of Monday-morning office small talk — once they\'re automatic, every weekend conversation becomes easy.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You work as a researcher at 清华大学 in Beijing. Monday morning, walking into the lab, a colleague turns from their desk: "周末怎么过的？" The whole exchange takes about two minutes and you will need every micro-skill from this lesson — describing one specific outing, explaining your choice, and asking back politely.',
      'word',
      '同事: "早！周末怎么过的？我一直在家躺，没出门。你呢？"',
      'A typical opener from a Beijing colleague: brief greeting + question + self-disclosure + return-the-question — sets the social rhythm for the whole exchange.',
      [
        { target: '早！zǎo!', note: 'casual workplace morning greeting; shorter than 早上好, used among peers' },
        { target: '周末怎么过的？zhōumò zěnme guò de?', note: 'literal: "weekend how spent?"; the standard Monday opener in any urban Chinese office' },
        { target: '一直在家躺 yīzhí zài jiā tǎng', note: 'literal: "all along at home lying-down"; 躺 (tǎng) here is the slang sense of "doing nothing", part of the 躺平 (tǎngpíng, "lying flat") generational meme' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '北京周末的现实',
      'Běijīng zhōumò de xiànshí',
      'Beijing working-adult weekends are shaped by three pressures: the 双休/单休 calendar (most office jobs are two-day; many service and startup jobs are one-day), the 调休 system that shifts workdays around holidays to create longer breaks, and the 内卷 culture that bleeds 加班 (overtime) into Saturday. The dream of 慢生活 (slow living) is the antidote everyone talks about.',
      'word',
      '理想: 双休 + 周边游 vs 现实: 单休 + 加班 + 一直在家躺',
      'The gap between the slow-living ideal and the involution reality is the emotional core of Beijing working-adult weekends — every colleague chat references it.',
      [
        { target: '双休 shuāngxiū', note: '"two-day weekend"; the standard for white-collar office jobs (Sat + Sun off)' },
        { target: '单休 dānxiū', note: '"one-day weekend"; common in retail, hospitality, startups, and many factory shifts (one day off, usually Sun)' },
        { target: '加班 jiābān', note: '"work overtime"; weekend 加班 is the single most common complaint in office small-talk' },
        { target: '调休 tiáoxiū', note: '"comp day / shifted day-off"; for national holidays, weekends get rearranged to create a longer break — meaning some Saturdays become work days' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '远足',
      'yuǎnzú (3+2)',
      'Two-syllable hiking word combining 远 (yuǎn, third tone, "far") and 足 (zú, second tone, "foot"). The third-tone 远 stays as a full dip-and-rise because the following 足 is second tone — no sandhi triggered. A common content word in this lesson.',
      'word',
      '我们周末去远足。Wǒmen zhōumò qù yuǎnzú.',
      'Hear the full third-tone dip on 远 followed by the rising 足 — distinct from 远走 yuǎnzǒu where the second word is also third tone and sandhi WOULD apply.',
      [
        { target: '远 (yuǎn, 3rd)', note: 'full third-tone dip-and-rise; no sandhi here because next syllable is 2nd tone' },
        { target: '足 (zú, 2nd)', note: 'rising tone; unchanged' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '露营',
      'lùyíng (4+2)',
      'Camping. 露 (lù, fourth tone, "dew / expose") falls sharply, then 营 (yíng, second tone, "camp") rises. No sandhi. Note: 露 has a second reading lòu in colloquial speech (露脸 lòu liǎn, "show face"), but in 露营 it is always lù.',
      'word',
      '周末去露营。Zhōumò qù lùyíng.',
      'A high-frequency content word post-2020 — Chinese camping went from a fringe hobby to a mainstream urban-millennial weekend activity, and the word now appears constantly in colleague chat and on 小红书.',
      [
        { target: '露 (lù, 4th)', note: 'fourth tone in 露营; the lòu reading is used in colloquial expressions like 露脸' },
        { target: '营 (yíng, 2nd)', note: 'rising tone, "camp"; unchanged' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '与其',
      'yǔqí (3+2)',
      'The opening of the 与其…不如… pattern. 与 (yǔ, third tone, "and / with") stays as full third tone because 其 (qí, second tone, "it / that") is not third — no sandhi. Often heard at the start of a sentence weighing two real options.',
      'word',
      '与其加班，不如休息。Yǔqí jiābān, bùrú xiūxi.',
      'A signature pattern of this lesson; learners often weaken the third-tone dip on 与 — keep the full dip-and-rise for clarity.',
      [
        { target: '与 (yǔ, 3rd)', note: 'full third-tone dip-and-rise; no sandhi because 其 is 2nd tone' },
        { target: '其 (qí, 2nd)', note: 'rising tone; unchanged' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '比起',
      'bǐqǐ (3+3 → spoken bíqǐ)',
      'The opening of the 比起…来… comparison pattern. Two adjacent third tones trigger sandhi: 比 (bǐ) rises to second tone in speech, while 起 (qǐ) keeps the full third tone. Written: bǐqǐ; spoken: bíqǐ.',
      'word',
      '比起加班，我更喜欢休息。Bíqǐ jiābān, wǒ gèng xǐhuan xiūxi.',
      'A classic sandhi case parallel to 你好 → ní hǎo — the same rule applies to every consecutive 3+3 pair in Mandarin.',
      [
        { target: '比 (written: bǐ, 3rd)', note: 'first syllable; would be full third tone in isolation' },
        { target: '比 (spoken: bí, 2nd)', note: 'rises to second tone because next syllable is also third tone — sandhi rule' },
        { target: '起 (qǐ, 3rd, unchanged)', note: 'keeps full third-tone dip-and-rise' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '一直',
      'yīzhí → spoken yìzhí',
      '"All along / continuously". The 一 (yī) sandhi rule applies: yī changes to yì (falling) before a second-tone syllable like 直 (zhí). Written: yīzhí; spoken: yìzhí. This is the same rule that turns 一天 yī tiān into yì tiān.',
      'word',
      '我一直在家躺。Wǒ yìzhí zài jiā tǎng.',
      'Used constantly in weekend recaps to mean "the whole time" — keep the 一 sandhi or you will sound stilted.',
      [
        { target: '一 (written: yī, 1st)', note: 'default first tone in isolation' },
        { target: '一 (spoken: yì, 4th)', note: 'becomes falling tone before 1st/2nd/3rd-tone syllables — here before 直 (2nd)' },
        { target: '直 (zhí, 2nd, unchanged)', note: 'second tone; unchanged' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '朋友圈',
      'péngyǒuquān (2+3+1, sandhi-aware)',
      'WeChat Moments. Three syllables: 朋 (péng, 2nd), 友 (yǒu, 3rd), 圈 (quān, 1st). The 3+1 combo on 友圈 does not trigger sandhi (3rd before 1st is unchanged), so the only thing to listen for is the clean 2-3-1 contour.',
      'word',
      '我发了一条朋友圈。Wǒ fā le yì tiáo péngyǒuquān.',
      'A high-frequency social-media word; the 圈 (quān, "circle") refers to the closed-friends circle metaphor — only your contacts see your posts.',
      [
        { target: '朋 (péng, 2nd)', note: 'rising; "friend" first syllable' },
        { target: '友 (yǒu, 3rd)', note: 'full third tone in the 3+1 environment; "friend" second syllable' },
        { target: '圈 (quān, 1st)', note: 'high level; "circle"' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Weekend rhythms
    // ────────────────────────────────────────────────────────────────────
    createContentItem('周末', 'zhōumò', '"Weekend" — the most common cover term covering Saturday and Sunday. In a 双休 office, 周末 = both days; in 单休 service jobs, 周末 often refers to just the one day off, with the workday confirmed in context.', 'word', '这个周末你怎么过？Zhège zhōumò nǐ zěnme guò?', 'Standard Monday-or-Friday small-talk opener: "How are you spending the weekend?"', null, [ACT.vocabularyWeekend]),
    createContentItem('双休', 'shuāngxiū', '"Two-day weekend" — Saturday AND Sunday off. The white-collar office norm in Beijing tech, academia, and finance. Mentioning your job is 双休 is a subtle status marker — it signals a stable office job rather than a service or shift role.', 'word', '我们公司是双休。Wǒmen gōngsī shì shuāngxiū.', '"Our company is a two-day-weekend company"; common when comparing job conditions with a friend.', null, [ACT.vocabularyWeekend]),
    createContentItem('单休', 'dānxiū', '"One-day weekend" — only Sunday off, with Saturday a normal workday. Common in retail, hospitality, education-cram industries, many startups, and most factory shifts. The opposite signal of 双休 in any job-comparison conversation.', 'word', '我们这行是单休，挺累的。Wǒmen zhè háng shì dānxiū, tǐng lèi de.', '"Our industry is one-day-weekend, pretty tiring"; a typical complaint from retail or startup workers.', null, [ACT.vocabularyWeekend]),
    createContentItem('加班', 'jiābān', '"Work overtime" — verb-object compound (加 add + 班 shift). Weekend 加班 is the single most common complaint in Beijing office small-talk; saying 我周末加班 invites sympathy and a follow-up question. Strongly associated with the 996 work culture (9 AM to 9 PM, 6 days a week).', 'word', '我又得加班了。Wǒ yòu děi jiābān le.', '"I have to work overtime again"; the 又 (yòu, "again") signals resigned frustration — a classic register marker.', null, [ACT.vocabularyWeekend]),
    createContentItem('调休', 'tiáoxiū', '"Comp day / shifted day-off" — the system where workdays around national holidays get rearranged so the holiday block becomes a continuous 5–7 days, paid for by a Saturday or Sunday becoming a work day. Hated by white-collar workers because it produces fake long weekends followed by 7-day stretches.', 'word', '这周六要上班，调休。Zhè zhōu liù yào shàngbān, tiáoxiū.', '"This Saturday is a work day because of comp-day rearrangement"; standard phrasing when reminding a colleague about the schedule.', null, [ACT.vocabularyWeekend]),
    createContentItem('出去玩', 'chūqù wán', '"Go out and play / go out for fun" — verb compound 出去 (go out) + 玩 (play/have fun). The casual cover term for any leisure outing, regardless of activity. The default opposite of 在家躺.', 'word', '周末我要出去玩。Zhōumò wǒ yào chūqù wán.', 'Casual, neutral statement of intent; works for hiking, shopping, dining, or just walking around.', null, [ACT.vocabularyWeekend]),
    createContentItem('在家躺', 'zài jiā tǎng', '"Stay home and lie around" — literally "at home lying down", but figuratively meaning doing nothing all weekend. The slang sense of 躺 connects to the 躺平 (tǎngpíng, "lying flat") generational meme — the half-ironic protest against 内卷 overwork.', 'word', '这个周末我就想在家躺。Zhège zhōumò wǒ jiù xiǎng zài jiā tǎng.', '"This weekend I just want to lie around at home"; the 就 (jiù, "just / simply") emphasizes the desire for nothing more — a register of resignation or self-care.', null, [ACT.vocabularyWeekend]),
    createContentItem('远足', 'yuǎnzú', '"Hike (long-distance)" — more deliberate than 散步 (sànbù, "stroll") or 爬山 (páshān, "climb a mountain"). 远足 implies a planned multi-hour outing into nature, often with friends and proper gear. Popular in Beijing\'s 怀柔 and 密云 mountain districts.', 'word', '我们打算去怀柔远足。Wǒmen dǎsuàn qù Huáiróu yuǎnzú.', '"We plan to go hiking in Huairou"; mentioning the specific district adds weekend-warrior credibility.', null, [ACT.vocabularyWeekend]),
    createContentItem('露营', 'lùyíng', '"Camping" — tent or glamping. Post-2020, 露营 went from a fringe activity to a mainstream urban-millennial weekend mode; commercial 露营地 (campgrounds) ring Beijing and 小红书 is full of 露营 setup photos. Often paired with 烧烤 (shāokǎo, "BBQ") and friends.', 'word', '我们租了帐篷去露营。Wǒmen zū le zhàngpeng qù lùyíng.', '"We rented a tent and went camping"; common scenario among 25–35-year-old urban office workers.', null, [ACT.vocabularyWeekend]),
    createContentItem('周边游', 'zhōubiānyóu', '"Day trip / nearby outing" — 周边 (zhōubiān, "nearby surroundings") + 游 (yóu, "tour/travel"). Refers to weekend trips within 1–3 hours of the city, often returning the same day. The mid-tier weekend mode between 出去玩 and 度假.', 'word', '北京周边游推荐?Běijīng zhōubiānyóu tuījiàn?', '"Beijing day-trip recommendations?"; a common 小红书 search phrase.', null, [ACT.vocabularyWeekend]),
    createContentItem('民宿', 'mínsù', '"Boutique homestay / B&B" — the booming alternative to hotels in Beijing\'s 怀柔 and 密云 outskirts. Often a converted village house with curated decor, courtyard, and home-cooked meals. The signature lodging of a 周边游 weekend escape.', 'word', '我们订了一家怀柔的民宿。Wǒmen dìng le yì jiā Huáiróu de mínsù.', '"We booked a boutique homestay in Huairou"; standard phrasing when sharing weekend plans.', null, [ACT.vocabularyWeekend]),
    createContentItem('度假', 'dùjià', '"Take a vacation / go on holiday" — longer and more deliberate than 周边游 or 出去玩. Implies stepping away from work for several days, usually traveling further. The aspirational mode of 周末.', 'word', '我想找个时间度假。Wǒ xiǎng zhǎo gè shíjiān dùjià.', '"I want to find time for a vacation"; the wistful tone of someone who has been working too much.', null, [ACT.vocabularyWeekend]),
    createContentItem('慢生活', 'mànshēnghuó', '"Slow living" — the lifestyle ideal of unhurried, mindful, low-stress weekends. The cultural counterweight to 内卷 overwork. Often expressed through specific images: tea ceremony, hand-drip coffee, 民宿 stays, slow Sunday brunches. A 朋友圈 favorite caption.', 'word', '周末就要享受慢生活。Zhōumò jiùyào xiǎngshòu mànshēnghuó.', '"Weekends should be about enjoying slow living"; the 就要 (jiùyào, "just have to") gives the line a half-philosophical, half-defensive tone.', null, [ACT.vocabularyWeekend]),
    createContentItem('放松', 'fàngsōng', '"Relax / unwind" — verb. The all-purpose word for releasing work tension; pairs with 放松一下 (relax a bit) or 让自己放松 (let oneself relax). Often the stated goal of a weekend outing.', 'word', '周末就是要放松。Zhōumò jiùshì yào fàngsōng.', '"Weekends are meant for relaxing"; tone of mild self-justification when explaining why you did nothing productive.', null, [ACT.vocabularyWeekend]),
    createContentItem('充电', 'chōngdiàn', '"Recharge" — literally "charge electricity", figuratively recharging one\'s energy. Used both for self-care weekends (sleep, rest, meditation) and self-improvement weekends (learning new skills, reading). A favorite Beijing professional-class word.', 'word', '周末要好好充电。Zhōumò yào hǎohao chōngdiàn.', '"This weekend I really need to recharge"; the 好好 (hǎohao, "properly / thoroughly") intensifies the need.', null, [ACT.vocabularyWeekend]),
    createContentItem('堵车', 'dǔchē', '"Traffic jam / get stuck in traffic" — verb-object compound. Beijing weekend traffic toward the outskirts (怀柔, 密云, 八达岭) is notoriously bad on Saturday morning, making 堵车 a recurring weekend-recap word. Often the reason colleagues choose 在家躺 over 出去玩.', 'word', '周六去怀柔特别堵车。Zhōu liù qù Huáiróu tèbié dǔchē.', '"Saturday driving to Huairou had really bad traffic"; the 特别 (tèbié, "especially") signals how bad it was.', null, [ACT.vocabularyWeekend]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Hobbies & leisure
    // ────────────────────────────────────────────────────────────────────
    createContentItem('健身', 'jiànshēn', '"Work out / hit the gym" — literally "build body". Refers specifically to gym-based weight training and cardio, not casual exercise. The signature self-improvement weekend activity of urban professionals; pairs with 健身房 (jiànshēnfáng, "gym").', 'word', '我每周末去健身房健身。Wǒ měi zhōumò qù jiànshēnfáng jiànshēn.', '"Every weekend I go to the gym to work out"; a common middle-class weekend rhythm.', null, [ACT.vocabularyHobbies]),
    createContentItem('瑜伽', 'yújiā', '"Yoga" — phonetic loan from English. Popular among urban women 25–40; widely available at boutique studios across Beijing. Often replaces or alternates with 健身 as the chosen weekend exercise.', 'word', '我周末去上瑜伽课。Wǒ zhōumò qù shàng yújiā kè.', '"I take yoga classes on weekends"; the 上…课 frame is the verb for attending a class.', null, [ACT.vocabularyHobbies]),
    createContentItem('钓鱼', 'diàoyú', '"Fishing" — verb-object compound (钓 hook + 鱼 fish). A traditional dad-and-uncle hobby that has had a small revival among 30+ men as a meditative escape from city noise. Practiced at Beijing\'s reservoirs and the Miyun area.', 'word', '我爸周末经常去钓鱼。Wǒ bà zhōumò jīngcháng qù diàoyú.', '"My dad often goes fishing on weekends"; the typical context where the word appears.', null, [ACT.vocabularyHobbies]),
    createContentItem('看展览', 'kàn zhǎnlǎn', '"See an exhibition" — pairs the all-purpose 看 (see/watch) with 展览 (exhibit). Refers to art shows, photography exhibits, design fairs, and pop-up shows. Centered in Beijing\'s 798 art district, UCCA, and CAFA Art Museum. A signature culture-class weekend.', 'word', '周末去798看展览。Zhōumò qù 798 kàn zhǎnlǎn.', '"On the weekend go to 798 to see an exhibit"; mentioning 798 alone signals the culture circuit.', null, [ACT.vocabularyHobbies]),
    createContentItem('拍照', 'pāizhào', '"Take photos / do photography" — verb-object compound. Goes far beyond casual snapshots in modern usage; refers to deliberate photo outings, often with phone-camera apps and specific 小红书-suggested spots. The implicit goal of many 周边游 outings.', 'word', '我们去香山拍照。Wǒmen qù Xiāngshān pāizhào.', '"We are going to Fragrant Hills to take photos"; the photo outing IS the activity.', null, [ACT.vocabularyHobbies]),
    createContentItem('探店', 'tànqián... → tàndiàn', '"Explore restaurants / shop-hunting" — 探 (tàn, "investigate") + 店 (diàn, "shop"). The act of trying out new restaurants, cafés, or boutiques, usually with a small group and lots of photo-taking. A major 小红书 content category and a primary weekend mode for urban 20–30-somethings.', 'word', '周末我们去三里屯探店。Zhōumò wǒmen qù Sānlǐtún tàndiàn.', '"On weekends we go to Sanlitun to explore restaurants/cafes"; mentioning the district signals the kind of place.', null, [ACT.vocabularyHobbies]),
    createContentItem('刷视频', 'shuā shìpín', '"Scroll videos" — 刷 (shuā, literally "swipe/brush", colloquial "binge-scroll") + 视频 (videos). Refers specifically to the algorithmic short-video scrolling habit on 抖音 or 小红书. Often confessed half-guiltily ("我又刷了一晚上视频" = "I scrolled videos all night again").', 'word', '我周末就在家刷视频。Wǒ zhōumò jiù zài jiā shuā shìpín.', '"I just scroll videos at home on weekends"; the 就 (jiù) signals "that\'s all I did", often slightly self-deprecating.', null, [ACT.vocabularyHobbies]),
    createContentItem('追剧', 'zhuījù', '"Binge a series / follow a TV show" — 追 (zhuī, "chase") + 剧 (jù, "drama/series"). Implies emotional investment and following a series as it airs. A major weekend activity, especially during Chinese drama or K-drama hot seasons. Pairs with 在家躺 perfectly.', 'word', '我最近在追一部韩剧。Wǒ zuìjìn zài zhuī yí bù Hánjù.', '"Lately I have been binging a Korean drama"; the 在 + verb structure marks ongoing action over the period.', null, [ACT.vocabularyHobbies]),
    createContentItem('打游戏', 'dǎ yóuxì', '"Play video games" — 打 (dǎ, "do/play" for games) + 游戏 (yóuxì, "game"). Covers PC games, console games, and mobile games. A common weekend mode for younger workers; mentioned freely in casual chat with peers but downplayed in front of senior colleagues.', 'word', '昨晚打了一晚上游戏。Zuó wǎn dǎ le yì wǎnshang yóuxì.', '"Last night played games all night"; tone is usually casual self-disclosure among peers.', null, [ACT.vocabularyHobbies]),
    createContentItem('做饭', 'zuòfàn', '"Cook (a meal)" — verb-object compound (do/make + meal). A self-care weekend ritual that has grown in popularity since 2020 as a counter to delivery culture. Often paired with 小红书 recipe-following and 朋友圈 plating shots.', 'word', '周末我喜欢在家做饭。Zhōumò wǒ xǐhuan zài jiā zuòfàn.', '"On weekends I like to cook at home"; a register of mature self-care, contrasting with 点外卖 (delivery).', null, [ACT.vocabularyHobbies]),
    createContentItem('逛街', 'guàngjiē', '"Window-shop / stroll the shopping streets" — 逛 (guàng, "stroll") + 街 (jiē, "street"). Distinct from 买东西 (buy things) — the activity is the walking and looking, not necessarily buying. Beijing hotspots: 三里屯, 国贸, 王府井, 西单.', 'word', '周末跟朋友去逛街。Zhōumò gēn péngyǒu qù guàngjiē.', '"On the weekend go window-shopping with friends"; the social aspect is as important as the shopping.', null, [ACT.vocabularyHobbies]),
    createContentItem('聚餐', 'jùcān', '"Group meal / dinner with friends or coworkers" — 聚 (jù, "gather") + 餐 (cān, "meal"). The signature social-eating event, separate from 吃饭 (just eating). Workplace 聚餐 happen often, but weekend 聚餐 are with chosen friends — the distinction matters socially.', 'word', '周末跟同事聚餐。Zhōumò gēn tóngshì jùcān.', '"On the weekend, gathering meal with colleagues"; carries different weight than weekday 加班 dinners — voluntary, slower-paced.', null, [ACT.vocabularyHobbies]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Vocabulary III: Social media
    // ────────────────────────────────────────────────────────────────────
    createContentItem('朋友圈', 'péngyǒuquān', '"WeChat Moments" — the closed-friends feed inside WeChat. Posts are visible only to your contacts, making it the social-signal layer of urban Chinese life: status, taste, weekend mode, and emotional state all get curated here. Posting too often signals neediness; never posting signals disengagement.', 'word', '我发了一条朋友圈。Wǒ fā le yì tiáo péngyǒuquān.', '"I posted a Moments update"; 发 (fā, "send/post") + 一条 (yì tiáo, "one entry") is the standard verb-measure structure.', null, [ACT.vocabularySocial]),
    createContentItem('小红书', 'Xiǎohóngshū', '"Xiaohongshu" (literally "Little Red Book") — the de-facto city-exploration, restaurant-discovery, and lifestyle-recommendation app for Chinese urban millennials. The search engine for 探店, 周边游, 民宿, 露营, 拍照 spots. Mentioning 小红书 is shorthand for "I planned this outing carefully".', 'word', '我在小红书上找的这家店。Wǒ zài Xiǎohóngshū shàng zhǎo de zhè jiā diàn.', '"I found this restaurant on Xiaohongshu"; the standard way to credit the source of a 探店 outing.', null, [ACT.vocabularySocial]),
    createContentItem('抖音', 'Dǒuyīn', '"Douyin" — the Chinese version of TikTok (same company, but a separate app). Algorithmic short-video feed; the dominant 刷视频 platform. Saying "我刷抖音刷了三个小时" is a half-guilty time-waste confession; saying "在抖音上看到的" is a way to attribute discovery without admitting to scrolling.', 'word', '我每天都刷抖音。Wǒ měi tiān dōu shuā Dǒuyīn.', '"I scroll Douyin every day"; common self-disclosure.', null, [ACT.vocabularySocial]),
    createContentItem('微博', 'Wēibó', '"Weibo" — the public-discussion, news, and celebrity-tracking platform; closer to Twitter than to Instagram. Used more for public conversation, hot-topic discussion (热搜), and following celebrities than for personal life-sharing. Less central to weekend leisure than 小红书 or 抖音.', 'word', '我上微博看了一下热搜。Wǒ shàng Wēibó kàn le yíxià rèsōu.', '"I went on Weibo to check the trending topics"; the 热搜 (rèsōu, "hot search") is the public-discourse zeitgeist tracker.', null, [ACT.vocabularySocial]),
    createContentItem('发朋友圈', 'fā péngyǒuquān', '"Post on Moments" — verb-object combo with 发 (fā, "post/send"). The act itself signals investment in a moment — only posts deemed worth sharing make it through. Common with weekend outing photos, milestone events, and curated 慢生活 imagery.', 'word', '今天的咖啡值得发个朋友圈。Jīntiān de kāfēi zhídé fā gè péngyǒuquān.', '"Today\'s coffee is worth a Moments post"; half-ironic, half-serious — even casual food can be a 朋友圈 moment.', null, [ACT.vocabularySocial]),
    createContentItem('刷小红书', 'shuā Xiǎohóngshū', '"Scroll Xiaohongshu" — paired with 刷 because Xiaohongshu is an algorithmic feed like a discovery loop. The standard pre-outing research verb: 我刷小红书找推荐 (scroll Xiaohongshu to find recommendations).', 'word', '出门前刷小红书。Chūmén qián shuā Xiǎohóngshū.', '"Scroll Xiaohongshu before going out"; a pre-outing planning ritual for many urban Chinese.', null, [ACT.vocabularySocial]),
    createContentItem('点赞', 'diǎnzàn', '"Like (a post)" — 点 (diǎn, "click") + 赞 (zàn, "praise/like"). Universal verb across all Chinese social platforms; the like-button action. Lower social stakes than commenting but still a relational signal — friends notice who likes their posts.', 'word', '谢谢你给我点赞。Xièxie nǐ gěi wǒ diǎnzàn.', '"Thanks for liking my post"; common DM-level acknowledgment.', null, [ACT.vocabularySocial]),
    createContentItem('打卡', 'dǎkǎ', '"Check-in / hit a notable spot" — literally "punch the time card", figuratively visiting a famous or trending location and documenting it. The driving motive behind many 探店 and 周边游 outings: the visit isn\'t complete without a 朋友圈 or 小红书 post proving you were there.', 'word', '这家店是网红打卡圣地。Zhè jiā diàn shì wǎnghóng dǎkǎ shèngdì.', '"This restaurant is an internet-famous check-in mecca"; 网红 (wǎnghóng, "internet-famous") + 打卡 (check-in) + 圣地 (sacred place) is the full hype phrase.', null, [ACT.vocabularySocial]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar I: Frequency adverbs 总是 / 一直 / 经常
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '总是',
      'zǒngshì — always (with a pattern or complaint)',
      '总是 means "always" in the sense of an observed recurring pattern, often carrying a tone of complaint, mild accusation, or "as usual". Placed BEFORE the verb. CRITICAL: not interchangeable with English "always" — 我总是 implies a recognizable habit, sometimes one you don\'t love.',
      'sentence',
      '你周末总是加班，要注意身体。Nǐ zhōumò zǒngshì jiābān, yào zhùyì shēntǐ.',
      '"You are always working overtime on weekends — take care of your health"; the 总是 here carries gentle complaint plus concern.',
      [
        { target: '总是 + verb', note: 'placed directly before the verb; the recurring-pattern frequency marker' },
        { target: 'register: observation/complaint', note: 'often used when noting a habit you would like to change — your own or someone else\'s' },
        { target: 'contrast: 一直 (continuous, one span)', note: '总是 = recurring habit; 一直 = sustained over one stretch of time' },
      ],
      [ACT.grammarFrequency],
    ),
    createContentItem(
      '一直',
      'yīzhí — continuously / all along',
      '一直 means "continuously, all along, the whole time" — a single sustained span rather than a recurring pattern. Placed BEFORE the verb. Often pairs with 在 + verb for ongoing action. Apply the 一 sandhi: yī → yì before 直 (second tone).',
      'sentence',
      '我周末一直在家躺。Wǒ zhōumò yìzhí zài jiā tǎng.',
      '"This weekend I have been lying around at home the whole time"; the 一直 frames the entire weekend as one continuous span of inactivity.',
      [
        { target: '一直 + verb (often 在 + verb)', note: 'placed directly before the verb; emphasizes one continuous span' },
        { target: 'register: descriptive', note: 'neutral; just describes what happened without complaint' },
        { target: 'contrast: 总是 (recurring) vs 经常 (often)', note: '一直 = one span; 总是 = repeated pattern; 经常 = neutral frequency' },
      ],
      [ACT.grammarFrequency],
    ),
    createContentItem(
      '经常',
      'jīngcháng — often (neutral frequency)',
      '经常 means "often" with a neutral, factual tone — no complaint, no continuous span, just a statement of frequency. Placed BEFORE the verb. The safest frequency adverb for describing habits without emotional coloring.',
      'sentence',
      '我经常去怀柔远足。Wǒ jīngcháng qù Huáiróu yuǎnzú.',
      '"I often go hiking in Huairou"; a neutral statement of a positive habit, no complaint.',
      [
        { target: '经常 + verb', note: 'placed directly before the verb; the neutral-frequency option' },
        { target: 'register: neutral', note: 'describes habit without value judgment; safe across all registers' },
        { target: 'contrast: 总是 (with pattern/complaint) vs 一直 (continuous span)', note: '经常 is the cleanest choice for "I often do X" without extra coloring' },
      ],
      [ACT.grammarFrequency],
    ),
    createContentItem(
      '三个副词对比',
      'sān gè fùcí duìbǐ',
      'Side-by-side: three different uses of "always/often" depending on what you mean. Choosing wrong shifts the tone of the whole sentence — 我总是加班 sounds like a complaint; 我经常加班 is a neutral fact; 我一直在加班 means right now, in this stretch of time.',
      'sentence',
      '我总是周末加班。(complaint: always working overtime)\n我经常周末加班。(neutral: often work overtime)\n我一直在加班。(continuous: I have been working overtime — right now, this stretch)',
      'Native speakers feel the difference instantly; choosing the wrong adverb sounds odd or unintentionally complaining.',
      [
        { target: '总是 zǒngshì', note: 'recurring habit + tone of complaint or pattern-noting' },
        { target: '一直 yīzhí (spoken yìzhí)', note: 'one continuous span; "all along / the whole time"' },
        { target: '经常 jīngcháng', note: 'neutral "often" without emotional coloring' },
      ],
      [ACT.grammarFrequency],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar II: 比起…来…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '比起…来…',
      'bǐqǐ … lái … — compared to X, …',
      'The 比起 X 来，Y… pattern frames a preference comparison: "comparing X (as a starting reference), Y is…". Place X (the option being compared away from) after 比起 and before 来; place Y (the preferred or contrasted option) after the comma. Often followed by 更 (more) or a preference verb (更喜欢, 更想).',
      'sentence',
      '比起出去玩，我更喜欢在家躺。Bíqǐ chūqù wán, wǒ gèng xǐhuan zài jiā tǎng.',
      '"Compared to going out, I prefer lying around at home"; 来 is the structural particle, not a verb.',
      [
        { target: '比起 X 来，Y…', note: 'full pattern; X is the reference point, Y is the comparison/preference' },
        { target: '来 (lái)', note: 'structural particle in this pattern; semantically empty (NOT the verb "come")' },
        { target: 'often + 更 (gèng, "more")', note: '比起 X 来，Y 更… is the standard preference frame' },
      ],
      [ACT.grammarCompare],
    ),
    createContentItem(
      '比 vs 比起',
      'bǐ vs bǐqǐ — measure vs prefer',
      'CRITICAL contrast: A 比 B + adjective is a MEASUREMENT comparison ("A is more X than B"). 比起 X 来，Y… is a PREFERENCE comparison ("compared to X, Y is preferred / better / more…"). They are not interchangeable; using 比 where 比起 is needed sounds blunt and measurement-only.',
      'sentence',
      'MEASUREMENT: 北京比上海冷。Běijīng bǐ Shànghǎi lěng. ("Beijing is colder than Shanghai.")\nPREFERENCE: 比起上海来，我更喜欢北京。Bíqǐ Shànghǎi lái, wǒ gèng xǐhuan Běijīng. ("Compared to Shanghai, I prefer Beijing.")',
      'The first one measures temperature; the second weighs a personal preference — they sound very different in Mandarin.',
      [
        { target: 'A 比 B + adj', note: 'measurement; "A is more (adj) than B"' },
        { target: '比起 X 来，Y…', note: 'preference; "compared to X, Y is preferred / has X quality"' },
        { target: 'mixing them sounds wrong', note: 'using 比 for preference loses the framing; using 比起 for measurement is overwrought' },
      ],
      [ACT.grammarCompare],
    ),
    createContentItem(
      '比起…来 — colleague chat use',
      'bǐqǐ … lái — in colleague chat',
      'In Monday-morning office chat, 比起…来… is the natural way to express weekend-mode preference: 比起 (the option the colleague mentioned), 来 (frame), Y (your real preference). Far more diplomatic than a flat 我不喜欢 ("I don\'t like…"), because it acknowledges the colleague\'s option as valid before stating your own.',
      'sentence',
      '同事: 你周末喜欢去健身房吗？\n你: 比起健身房来，我更喜欢出去远足。',
      '"Colleague: Do you like going to the gym on weekends? You: Compared to the gym, I prefer hiking outdoors"; the 比起…来… acknowledges the colleague\'s suggestion while stating your real preference.',
      [
        { target: '比起 [colleague\'s option] 来', note: 'frame the colleague\'s mentioned option as the reference point — sounds engaged' },
        { target: '我更喜欢 [your option]', note: 'state your preference with 更; clear without being dismissive' },
        { target: 'tone: diplomatic preference', note: 'much softer than 我不喜欢 X / 我喜欢 Y; a workplace-appropriate way to disagree on taste' },
      ],
      [ACT.grammarCompare],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Grammar III: 与其…不如…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '与其…不如…',
      'yǔqí … bùrú … — rather than X, prefer Y',
      'The 与其 X，不如 Y pattern expresses an active choice between two real options: "rather than doing X, it is better to do Y". Both X and Y are real alternatives the speaker considered; Y is the chosen one. Use when explaining a decision, not a casual taste.',
      'sentence',
      '与其在城里堵车，不如去怀柔住民宿。Yǔqí zài chéng lǐ dǔchē, bùrú qù Huáiróu zhù mínsù.',
      '"Rather than getting stuck in city traffic, it is better to stay at a 民宿 in Huairou"; classic Beijing weekend-escape rationale.',
      [
        { target: '与其 X，不如 Y', note: 'X = real option being rejected; Y = chosen alternative' },
        { target: '不如 (bùrú)', note: 'literally "not as good as"; the pivot phrase that makes Y the chosen one' },
        { target: 'register: deliberate decision', note: 'used when explaining a real choice after weighing two options — not for casual preferences' },
      ],
      [ACT.grammarChoice],
    ),
    createContentItem(
      '与其 vs 比起',
      'yǔqí vs bǐqǐ — choice vs preference',
      'Critical contrast: 比起…来… is a SOFT PREFERENCE ("I prefer Y over X in general"). 与其…不如… is an ACTIVE DECISION ("after weighing them, I CHOSE Y"). 与其…不如… implies the speaker actually faced both options and decided; 比起…来… is just stating taste.',
      'sentence',
      'PREFERENCE: 比起健身房来，我更喜欢远足。(general preference)\nDECISION: 与其去健身房，不如去远足。(this time I will choose hiking over gym)',
      'The decision version implies "I am about to act on this choice"; the preference version is just about taste.',
      [
        { target: '比起…来…', note: 'soft preference; "I prefer Y over X" in general' },
        { target: '与其…不如…', note: 'active decision; "rather than X, I will choose Y" — implies action follows' },
        { target: 'choose by context', note: 'general taste talk → 比起; deciding what to actually do → 与其' },
      ],
      [ACT.grammarChoice],
    ),
    createContentItem(
      '与其…不如… — beyond two clauses',
      'yǔqí … bùrú … — extended versions',
      'The 与其…不如… pattern can also be intensified or extended with adverbs: 与其 X，倒不如 Y (dào bùrú, "even better to") emphasizes a stronger preference for Y; 与其 X，还不如 Y (hái bùrú, "still better to") emphasizes that Y is the rescue option. Both are common in spoken Mandarin.',
      'sentence',
      '与其加班，还不如早点回家躺。Yǔqí jiābān, hái bùrú zǎo diǎn huí jiā tǎng.',
      '"Rather than working overtime, it is even better to go home early and lie around"; the 还不如 adds a tone of "honestly, just give up and do the easier thing".',
      [
        { target: '倒不如 dào bùrú', note: 'stronger preference for Y; "actually, Y is better"' },
        { target: '还不如 hái bùrú', note: '"even better to Y" — Y is the rescue option after X is found wanting' },
        { target: 'register: conversational decision-making', note: 'both extended forms are common in spoken complaint or rationalization' },
      ],
      [ACT.grammarChoice],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Reading and Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '同事的周末',
      'tóngshì de zhōumò',
      'A 6-sentence weekend recap by a 清华大学 colleague who hiked 怀柔 with friends. Read it aloud with correct tones, sandhi, and natural rhythm; notice how the colleague uses 总是, 比起…来…, and 与其…不如… to structure their reflection.',
      'sentence',
      '上周末我和清华的几个同事去怀柔远足。其实周五我还在加班，总是这样，差点不想出门。但是比起在家躺，我更喜欢出去走走，所以最后还是去了。与其在城里堵车，不如去山里住一晚民宿。我们在山上拍了很多照片，晚上回到民宿吃了农家菜。我已经在小红书上推荐了这家民宿。',
      'Translation: "Last weekend several Tsinghua colleagues and I went hiking in Huairou. Actually I was working overtime on Friday — that\'s always how it goes — and almost did not want to leave the house. But compared to lying around at home, I prefer going out for a walk, so in the end I still went. Rather than getting stuck in city traffic, it is better to spend a night at a 民宿 in the mountains. We took lots of photos on the mountain, and in the evening went back to the 民宿 for a country-style dinner. I have already recommended this 民宿 on Xiaohongshu."',
      [
        { target: '总是这样 zǒngshì zhèyàng', note: '"always like this"; the colleague\'s recurring-pattern complaint about Friday overtime' },
        { target: '比起在家躺，我更喜欢出去走走', note: '比起…来… preference frame; "compared to lying at home, I prefer going out"' },
        { target: '与其在城里堵车，不如去山里住一晚民宿', note: '与其…不如… active-choice rationale for the trip' },
        { target: '在小红书上推荐 zài Xiǎohóngshū shàng tuījiàn', note: '"recommend on Xiaohongshu"; the standard verb for sharing a tip on the platform' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions matching the colleague\'s weekend recap. Answer each in a complete short sentence, using the lesson\'s grammar patterns where appropriate.',
      'sentence',
      'Q1: 同事周末去哪儿了？\nQ2: 周五同事在干什么？\nQ3: 同事为什么没在家躺？\nQ4: 同事推荐了什么？在哪儿推荐的？',
      'Four content questions covering destination, Friday context, motivation (using the preference grammar), and the recommendation + platform.',
      [
        { target: 'A1: 同事去怀柔远足了。', note: '"The colleague went hiking in Huairou"; concrete answer with destination + activity' },
        { target: 'A2: 周五同事在加班。', note: '"On Friday the colleague was working overtime"; uses 在 + verb for ongoing action' },
        { target: 'A3: 比起在家躺，他更喜欢出去走走。', note: 'natural answer using the 比起…来… preference frame from the text' },
        { target: 'A4: 他在小红书上推荐了那家民宿。', note: '"He recommended the 民宿 on Xiaohongshu"; verb + platform combination' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Listening and Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '周一早上的实验室',
      'zhōu yī zǎoshang de shíyànshì',
      'A natural Monday-morning chat between two 清华大学 lab colleagues comparing weekends: one went hiking in 怀柔, the other stayed home scrolling 小红书 and 追剧. Covers every grammar pattern from this lesson plus the lesson vocabulary.',
      'conversation',
      'A: 早！周末怎么过的？\nB: 还行，跟几个朋友去怀柔远足了。你呢？\nA: 我一直在家躺，刷了一周末小红书。\nB: 哈哈，我也经常这样。不过比起在家躺，我更喜欢出去走走。\nA: 我也想出去，可是周六加班，总是这样，没办法。\nB: 太累了。下周末与其加班，不如跟我们一起去民宿。我已经订好了。\nA: 真的？那太好了！我可以发个朋友圈炫耀一下。\nB: 你看，已经被工作内卷成这样了，周末就是要充电。',
      'A natural peer-to-peer exchange covering schedule complaints, weekend recaps, soft preference, and active recommendation — the full Monday-morning chat rhythm.',
      [
        { target: '一直在家躺 yìzhí zài jiā tǎng', note: 'continuous-span frequency; "I lay around at home the whole time"' },
        { target: '比起在家躺，我更喜欢出去走走', note: '比起…来… preference (note: 来 is sometimes dropped in casual speech)' },
        { target: '总是这样 zǒngshì zhèyàng', note: 'pattern-with-complaint frequency; "always like this"' },
        { target: '与其加班，不如跟我们一起去民宿', note: '与其…不如… active recommendation framed as a choice' },
        { target: '炫耀一下 xuànyào yíxià', note: '"show off a bit"; the half-ironic verb for a 朋友圈 humble-brag' },
        { target: '被工作内卷成这样了', note: '"been ground down by work involution to this state"; 被 passive + 内卷 + 成 result complement' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '加班后的周末电话',
      'jiābān hòu de zhōumò diànhuà',
      'A second short scene: a Sunday evening phone call between two friends, where one suggests the other should escape the city via 民宿. Demonstrates 与其…不如… in a recommendation context plus everyday softening with 我觉得 (I think).',
      'conversation',
      '朋友A: 喂，明天上班吗？\n朋友B: 唉，调休，明天周六还得上。\n朋友A: 那真的太累了。我觉得与其在城里待着，不如下周找个时间去民宿。\n朋友B: 嗯，听起来不错。最近我在小红书上看到怀柔有家民宿还可以。\n朋友A: 那定下来吧！我也想充电了。\n朋友B: 好，发我地址，我看一下。',
      'A briefer scene focused on recommendation + reaction, useful for practicing 与其…不如… as advice rather than self-justification.',
      [
        { target: '调休 tiáoxiū', note: 'standard schedule-complaint word; explains why Saturday is a work day' },
        { target: '我觉得… wǒ juéde…', note: 'opens a softer recommendation; "I think…"' },
        { target: '与其在城里待着，不如…去民宿', note: 'recommendation framed as the better choice between two real options' },
        { target: '在小红书上看到 zài Xiǎohóngshū shàng kàndào', note: '"saw it on Xiaohongshu"; standard discovery-source attribution' },
        { target: '充电 chōngdiàn', note: 'recharge; the goal of the weekend escape' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable 4–5 sentence template for a 朋友圈 weekend post. Fill in the bracketed slots with your own information — the structure carries the rest. Use at least one frequency adverb and at least one comparison or choice pattern.',
      'sentence',
      '[周末场景描述]。我[频率副词 + 动词，e.g., 经常去 / 总是 / 一直在]。这次比起[选项A]来，我更喜欢[选项B]，所以与其[选项A]，不如[选项B]。在[地点]拍了很多照片，[一句感想]。慢生活，就是这样。',
      'Five sentences cover the core: scene-setting, frequency habit, preference framing, active choice, photo memory, reflection — the minimum complete 朋友圈-worthy recap.',
      [
        { target: '[周末场景描述]', note: 'set the scene: where you went, with whom, brief context (e.g., 上周末和朋友去怀柔远足)' },
        { target: '[频率副词]', note: 'pick 总是 / 一直 / 经常 based on the tone you want (pattern-complaint / continuous / neutral)' },
        { target: '比起 [选项A] 来，我更喜欢 [选项B]', note: 'soft preference frame; both A and B should be real weekend options' },
        { target: '与其 [选项A]，不如 [选项B]', note: 'active-choice frame; this should match the actual decision you made' },
        { target: '[一句感想]', note: 'one short reflection or feeling; avoid clichés — be specific (e.g., 山里的空气比城里好多了 / 终于充上电了)' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 4–5 sentence 朋友圈-style post about a real or imagined Beijing weekend. Use at least one frequency adverb (总是 / 一直 / 经常) and at least one comparison/choice pattern (比起…来… or 与其…不如…). Aim for the tone of a urban-millennial Mandarin speaker.',
      'sentence',
      '示例: 上周末和清华的同事去了怀柔远足。我平时总是周末加班，这次终于出门一次。比起在城里堵车，我更喜欢山里的安静；与其在家躺，不如跟朋友一起爬山。山顶拍的照片我已经发朋友圈了。慢生活，下次见。',
      'Translation: "Last weekend went hiking in Huairou with Tsinghua colleagues. I am usually always working overtime on weekends, this time I finally got out. Compared to getting stuck in city traffic, I prefer the quiet of the mountains; rather than lying around at home, it is better to go climbing with friends. I have already posted the summit photos on Moments. Slow living, see you next time."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '内卷 和 周末焦虑',
      'nèijuǎn hé zhōumò jiāolǜ',
      '内卷 (nèijuǎn, "involution") is the Chinese cultural keyword for pointless competitive overwork — when everyone has to work harder just to stay in the same relative position. It produces 周末焦虑 (zhōumò jiāolǜ, "weekend anxiety"), where workers feel guilty for resting because peers are still grinding. The 躺平 (tǎngpíng, "lying flat") response — refusing to play the game — became a generational meme around 2021.',
      'sentence',
      '内卷 → 周末焦虑 → 躺平 反应',
      'A three-stage cultural cycle every Beijing professional understands; brings register-weight to any conversation about weekend rest.',
      [
        { target: '内卷 nèijuǎn', note: '"involution"; pointless competitive overwork where everyone runs faster but stays in the same relative position' },
        { target: '周末焦虑 zhōumò jiāolǜ', note: '"weekend anxiety"; the guilt-and-FOMO loop of resting while peers are still grinding' },
        { target: '躺平 tǎngpíng', note: '"lying flat"; the half-ironic generational response — refusing to play the involution game' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '双十一 — 不只是购物节',
      'Shuāng shíyī — bù zhǐ shì gòuwù jié',
      '双十一 (November 11) is NOT just Singles Day shopping. There are TWO things layered on November 11: (1) the original 光棍节 (Singles Day, "single-stick festival") — 1990s university dorm humor about the four 1s in 11/11 looking like four single people; (2) the 双十一购物节 (Double Eleven shopping festival) — created by Alibaba in 2009, now the world\'s largest e-commerce sales day. Treating them as the same misses that the cultural meaning is layered.',
      'sentence',
      '光棍节 (1990s 大学校园) + 双十一购物节 (2009 阿里巴巴) = 现在的 双十一',
      'Two separate cultural threads sharing a date; native speakers feel the difference but both meanings are alive.',
      [
        { target: '光棍节 guānggùn jié', note: '"Singles Day"; 1990s university dorm humor about 11/11 = four 1s = four single people' },
        { target: '双十一购物节 Shuāng shíyī gòuwù jié', note: '"Double Eleven Shopping Festival"; Alibaba\'s 2009 e-commerce invention, now the world\'s biggest sales day' },
        { target: '现在的双十一', note: 'the two threads coexist; younger people lean on the shopping meaning, older people remember the singles origin' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '民宿热 — 怀柔 和 密云',
      'mínsù rè — Huáiróu hé Mìyún',
      'The 民宿 (boutique-homestay) boom is centered in Beijing\'s 怀柔 and 密云 districts — the mountainous outskirts roughly 1–2 hours from downtown. Both districts converted thousands of village houses into curated stays since 2018, driven by 小红书 photo-discovery and post-2020 domestic-travel pressure. A weekend 民宿 stay is now the signature middle-class Beijing weekend escape.',
      'sentence',
      '怀柔 (近, 山多, 长城) vs 密云 (远, 水库, 安静)',
      'Each district has its own character; knowing the distinction signals real local literacy.',
      [
        { target: '怀柔 Huáiróu', note: 'closer to the city; mountainous, near the Great Wall (慕田峪长城), most accessible for one-day or weekend trips' },
        { target: '密云 Mìyún', note: 'further out; reservoir-and-water-focused, quieter, popular for 露营 and longer 2–3 day stays' },
        { target: '小红书驱动 Xiǎohóngshū qūdòng', note: 'the discovery engine; almost every 民宿 booking starts with a 小红书 search and a saved photo' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '城市探索 — 798 和 小红书',
      'chéngshì tànsuǒ — 798 hé Xiǎohóngshū',
      '城市探索 (chéngshì tànsuǒ, "city exploration") is the urban counterpart of 周边游: discovering hidden cafés, art spaces, boutiques, and food spots within the city. 798 (the art district in 朝阳, eastern Beijing) is the canonical destination; 小红书 is the de-facto guide app. A typical 城市探索 weekend follows a 小红书 itinerary — see an exhibit at 798, find a curated café, take photos, post to 朋友圈.',
      'sentence',
      '798看展 → 小红书探店 → 拍照打卡 → 发朋友圈',
      'A four-step urban weekend ritual; each step has its own vocabulary in this lesson.',
      [
        { target: '798 (qī jiǔ bā)', note: 'the art district in eastern Beijing; converted Bauhaus-era factory complex, now galleries, design studios, and boutique cafés' },
        { target: '城市探索 chéngshì tànsuǒ', note: '"city exploration"; the genre of discovering hidden urban gems within your own city' },
        { target: '小红书 as guide app', note: 'the de-facto recommendation source; bookmarking 小红书 posts before going out is standard pre-outing prep' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '露营热 — 2020 之后',
      'lùyíng rè — 2020 zhīhòu',
      'The 露营 (camping) boom in China is a post-2020 phenomenon driven by pandemic-era domestic-travel constraints. What used to be a fringe activity became a mainstream urban-millennial weekend mode within two years. Commercial 露营地 (campgrounds) ring Beijing; brands like 大热荒野 and 牧野星辰 turned camping into Instagram-style 露营 with curated tents, lighting, and BBQ setups. Pure-wilderness camping remains rare.',
      'sentence',
      '2020 前: 小众 → 2022 后: 主流 周末活动',
      'A two-year transition every Beijing weekend-warrior witnessed; the word 露营 now means glamping at a curated site, not roughing it in the wild.',
      [
        { target: '露营地 lùyíng dì', note: 'commercial campgrounds; the standard 露营 location' },
        { target: '精致露营 jīngzhì lùyíng', note: '"refined / glamping-style camping"; curated tents, fairy lights, BBQ — the photogenic version' },
        { target: '小红书 + 露营装备 lùyíng zhuāngbèi', note: '小红书 is full of camping-gear shopping content; the gear culture is half the activity' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 13 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 周一早上的小聊',
      'rènwù: zhōu yī zǎoshang de xiǎoliáo',
      'Roleplay a Monday-morning chat in the 清华大学 lab with the tutor playing your colleague. Use every skill from this lesson in one continuous 6-turn scene — describe one specific outing, explain your choice with 与其…不如…, and recommend something for the colleague.',
      'conversation',
      '[Monday morning, 清华大学 lab kitchen]\n同事: 早！周末怎么过的？\n你: [打招呼 + 总是/一直/经常 + 描述一个具体活动，例如怀柔远足或798看展]\n同事: 听起来不错。我周末一直在加班，没出门。\n你: [用 比起…来… 表达偏好，对比两个选项]\n同事: 那你下周末有什么计划？\n你: [用 与其…不如… 解释一个具体选择]\n同事: 听上去很棒。给我推荐一下。\n你: [推荐一个具体地点 + 小红书 搜索词]\n同事: 谢谢！周末见。\n你: [告别]',
      'Six turns of fluent exchange; the tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: '打招呼 + 描述活动', note: '早 / 早上好 + 一个具体的周末活动 (怀柔远足, 798看展, 朋友家聚餐) — make it specific, not generic' },
        { target: '比起…来…', note: 'use 比起 [colleague\'s implied option, e.g., 加班] 来，我更喜欢 [your option]' },
        { target: '与其…不如…', note: 'use 与其 [an option you considered] 不如 [the one you chose] for your next weekend plan' },
        { target: '推荐 + 小红书', note: '"我推荐你去 [地点], 你可以在小红书上搜 [搜索词]" — the natural recommendation form' },
        { target: '告别', note: '再见 / 拜拜 / 下次见 / 周末见 — match the casual peer-to-peer register' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 用 内卷 / 周末焦虑 / 充电',
      'tiǎozhàn — yòng nèijuǎn / zhōumò jiāolǜ / chōngdiàn',
      'Stretch goal: in the same scene, weave in at least one cultural concept word from this lesson — 内卷, 周末焦虑, 慢生活, or 充电. Native-feeling Mandarin office chat references these concepts naturally; using them shows you understand the cultural backdrop, not just the grammar.',
      'conversation',
      '同事: 你周末怎么不出门？\n你: 现在内卷太严重了，工作日一直加班，周末就想充电，在家躺一躺。\n同事: 是啊，我也有周末焦虑——总觉得应该做点什么，结果什么都没做。\n你: 与其焦虑，不如真的放松一下，享受慢生活。',
      'A four-turn exchange referencing all four cultural concepts; the tone is half-philosophical, half-self-deprecating — the natural register of Beijing professional-class weekend chat.',
      [
        { target: '内卷 nèijuǎn', note: '"involution"; reference to the cultural overwork backdrop — instantly understood by any Beijing colleague' },
        { target: '周末焦虑 zhōumò jiāolǜ', note: '"weekend anxiety"; the guilt loop of resting while feeling you should be productive' },
        { target: '充电 chōngdiàn', note: '"recharge"; the self-care goal of weekend rest, framed as energy restoration not laziness' },
        { target: '慢生活 mànshēnghuó', note: '"slow living"; the lifestyle ideal that gives weekend rest a positive identity rather than just absence of work' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
