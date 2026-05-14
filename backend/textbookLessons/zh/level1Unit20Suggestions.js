// Level 1 Unit 20 — Suggestions & Plans (Mandarin Chinese)
// Functions: proposing activities, agreeing or counter-proposing, declining
// politely, planning a meet-up — invite a Tsinghua classmate to see a Chinese
// movie this weekend.
//
// Overlaps with Unit 11 (Scheduling) but FOCUSED on PROPOSING ACTIVITIES,
// not just times. The headline patterns are 我们 + V + 吧 (let's V),
// 怎么样? / X 怎么样? (how about X?), 要不(要) + V (how about V / would you V),
// 一起 + V (V together), and the counter-proposal 还是 + V + 吧 / 不如 + V.
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
  orientation: 'zh-l1u20-orientation',
  pronunciation: 'zh-l1u20-pronunciation',
  vocabularyInvitations: 'zh-l1u20-vocab-invitations',
  vocabularyActivities: 'zh-l1u20-vocab-activities',
  grammarBa: 'zh-l1u20-grammar-ba',
  grammarYaobu: 'zh-l1u20-grammar-yaobu',
  grammarCounter: 'zh-l1u20-grammar-counter',
  reading: 'zh-l1u20-reading',
  listening: 'zh-l1u20-listening',
  writing: 'zh-l1u20-writing',
  culture: 'zh-l1u20-culture',
  task: 'zh-l1u20-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Propose an activity in Mandarin using the three core patterns: 我们 + V + 吧 (let\'s V), 怎么样? (how about it?), and 要不要 + V (would you like to V?).',
      'Agree quickly with 好的 / 行 / 可以 / 没问题, or politely decline by softening with 我有事 / 不太方便 / 还是下次吧 — never a flat 不.',
      'Counter-propose smoothly with 还是 + V + 吧 ("let\'s V instead") or 不如 + V ("better to V"), pinning down time and place at the end.',
    ],
    task: 'Picture inviting a Tsinghua classmate to see a new Chinese movie this weekend. By the end of this lesson you should run the whole back-and-forth — proposal, agreement (or counter), meet-up details — in Mandarin without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce the sentence-final particle 吧 (ba) light and short with neutral tone — heavy stress on 吧 turns a soft invitation into a curt command.',
      'Say 怎么样 (zěnmeyàng) with the right rhythm: full third tone, neutral, full fourth — the most common "how about?" question word in spoken Mandarin.',
      'Apply 不 (bù) sandhi inside 不如 and 不行: 不如 (bùrú) keeps 4th + 2nd, but 不去, 不要 → bú-... when the next syllable is 4th.',
    ],
    task: 'Read each example aloud and identify which syllables reduce to neutral tone and where 不-sandhi applies.',
  },
  {
    id: ACT.vocabularyInvitations,
    section: 'Vocabulary I',
    title: 'Invitation expressions and replies',
    goals: [
      'Use 10 invitation openers and replies — proposals (一起 / 要不要 / 怎么样), quick yeses (好的 / 行 / 可以 / 没问题 / 听你的), and soft declines (我有事 / 不太方便 / 还是下次吧).',
      'Match each reply to the register: 好的 and 没问题 are safe everywhere; 行 and 听你的 are friendly/casual; 我恐怕不行 is formal-apologetic.',
    ],
    task: 'Pair each invitation opener with a quick yes AND a polite decline so both responses feel automatic.',
  },
  {
    id: ACT.vocabularyActivities,
    section: 'Vocabulary II',
    title: 'Weekend activities and meet-up logistics',
    goals: [
      'Use 12 high-frequency weekend-activity collocations: 看电影 (watch a movie), 吃饭 (eat together), 喝咖啡 (grab coffee), 逛街 (hang out at the mall), 去公园 (go to the park), 看演唱会 (see a concert), 看比赛 (watch a game), plus tickets/booking/showtime vocab.',
      'Pin down meet-up details with 见面 (meet), 约 (set a plan / make a date), 提前 (in advance), 门口 (entrance), and 几点 (what time?).',
    ],
    task: 'Pair each activity with its natural place — 看电影 ↔ 电影院 / 吃饭 ↔ 餐厅 / 喝咖啡 ↔ 咖啡店 / 逛街 ↔ 商场.',
  },
  {
    id: ACT.grammarBa,
    section: 'Grammar I',
    title: '我们 + V + 吧 — the "let\'s V" pattern',
    goals: [
      'Form the most common Mandarin suggestion: 我们 + V + 吧 ("let\'s V"). The sentence-final particle 吧 softens what would otherwise sound like a command — it is the difference between 我们走 ("we leave!") and 我们走吧 ("let\'s go").',
      'Insert objects normally: 我们看电影吧 ("let\'s see a movie"), 我们喝咖啡吧 ("let\'s grab coffee"). 吧 always sits at the very end of the sentence.',
      'Know that 吧 also softens orders to one person (你来吧 "go ahead and come") — context tells you whether it\'s "let\'s" or "go ahead and...".',
    ],
    task: 'Write five 我们…吧 suggestions for different weekend activities, then say each one out loud with the neutral-tone 吧.',
  },
  {
    id: ACT.grammarYaobu,
    section: 'Grammar II',
    title: '要不(要) + V — "how about V / would you like to V?"',
    goals: [
      'Use 要不要 + V to ask "would you like to V?" — softer than a direct 我们…吧 suggestion because it explicitly asks the other person\'s preference. 你要不要一起去? = "would you like to come along?"',
      'Use the shortened 要不 + clause to introduce a new option: 要不我们去咖啡店? ("how about we go to the cafe instead?"). Slightly more tentative than the 要不要 yes/no version.',
      'Distinguish 怎么样? — used to ASK FEEDBACK on a proposal already made: 周六去看电影怎么样? ("How about going to see a movie on Saturday?") — vs 要不要, which IS the proposal itself.',
    ],
    task: 'Convert three 我们…吧 statements into 要不要…? questions and into …怎么样? feedback questions; feel the register shift.',
  },
  {
    id: ACT.grammarCounter,
    section: 'Grammar III',
    title: 'Agreeing, declining, and counter-proposing with 还是 / 不如',
    goals: [
      'Agree quickly: 好的 / 行 / 可以 / 没问题 / 听你的 — five high-frequency yeses, each with a slightly different feel. 听你的 ("I\'ll go with what you say") signals trust and warmth.',
      'Decline politely: NEVER say a flat 不 to an invitation. Soften with 我有事 ("I have something on"), 那天不太方便 ("that day isn\'t convenient"), or 还是下次吧 ("let\'s do it next time instead") — leaves the door open.',
      'Counter-propose with 还是 + V + 吧 ("let\'s V instead") or 不如 + V ("it would be better to V"). 不如 is slightly more written/thoughtful; 还是…吧 is the everyday spoken form.',
    ],
    task: 'For one proposal you receive, write a quick-yes reply, a soft-decline reply, and a counter-proposal reply — three valid responses to the same invitation.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a Beijing movie listing',
    goals: [
      'Read a real-style Beijing movie-theater listing aloud and identify movie title, showtime options, ticket price, and language/subtitle info.',
      'Answer comprehension questions using suggestion forms: 我们看几点的? ("Which showtime shall we get?") and 怎么样? feedback questions.',
    ],
    task: 'Read the listing, then propose a specific showtime to your partner using 我们…吧 or 怎么样?.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A weekend-movie plan',
    goals: [
      'Follow a 7-turn conversation between two Tsinghua classmates planning a Saturday-night movie, including the proposal, a polite counter-proposal, agreement, and meet-up details.',
      'Reproduce the exchange swapping in your own day, time, place, and movie.',
    ],
    task: 'Read the dialogue along with the AI tutor first, then perform it again with your own plan substituted in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write a WeChat invitation',
    goals: [
      'Write a 3–4 line WeChat (微信) invitation to a Tsinghua classmate using 我们…吧 or 要不要, one specific time, and one meet-up place.',
      'Close with a casual confirmation request like 行不行? or 你看怎么样? so the recipient knows you want a reply.',
    ],
    task: 'Write your own 3–4 sentence WeChat invite using the template, then read it aloud with natural tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '请客, AA制, and Friday-night culture in Chinese cities',
    goals: [
      'Understand 请客 (qǐng kè, "treating someone") — in traditional Chinese culture, the inviter pays. Saying 我请你 ("my treat") is a normal and warm offer; trying to split the bill can sometimes feel cold.',
      'Know AA制 (āi-ēi zhì, "going Dutch") — increasingly common among young urban professionals and students, but still less default than in Western contexts. Often negotiated in advance: 我们AA吧.',
      'Know that Friday and Saturday nights in big Chinese cities (Beijing, Shanghai, Shenzhen) are when 看电影 / 吃饭 / 喝咖啡 / 唱KTV plans are most common — Sundays tend toward family time.',
    ],
    task: 'Decide: if a Chinese classmate invites you to a movie and says 我请你, how do you respond politely without making them lose face?',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Plan a weekend movie at Tsinghua',
    goals: [
      'Combine every skill from this lesson — proposal, agreement or counter-proposal, time/place pinning, casual sign-off — in one continuous conversation.',
      'Use the correct register throughout: classmate-to-classmate is polite-casual, so use 你 (not 您), 好的 / 行, and a softening 吧 on suggestions.',
    ],
    task: 'Roleplay inviting a Tsinghua classmate to a new Chinese movie this weekend with the AI tutor; aim for a 6–8 turn exchange in Mandarin.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 20: 我们一起去看电影吧 — Suggestions and Plans',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'making-suggestion', label: 'Making a suggestion', goal: 'Propose an activity politely with 我们 + V + 吧 or 我们 + V + 怎么样? — pick the soft form that matches the friendship level.' },
    { id: 'asking-preference', label: 'Asking the other person\'s preference', goal: 'Use 要不要 + V or 你想 + V + 吗? to invite a yes/no answer instead of just announcing a plan.' },
    { id: 'agreeing-quickly', label: 'Agreeing quickly', goal: 'Pick the right quick-yes from 好的 / 行 / 可以 / 没问题 / 听你的 based on how warm and casual you want to sound.' },
    { id: 'declining-politely', label: 'Declining politely', goal: 'Soften the refusal with 我有事 / 那天不太方便 / 还是下次吧 — never a flat 不 to an invitation.' },
    { id: 'counter-proposing', label: 'Counter-proposing', goal: 'Offer an alternative with 还是 + V + 吧 ("let\'s V instead") or 不如 + V ("better to V") — keeps the plan alive while shifting the activity or time.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can propose an activity in Mandarin, hear the other person\'s yes/no, offer or accept a counter-proposal, and pin down the time and place — the full social mechanics of organizing a weekend outing.',
      'word',
      'Functional micro-skills: 提议 tíyì (propose) · 答应 dāying (agree) · 委婉拒绝 wěiwǎn jùjué (decline gently) · 改提议 gǎi tíyì (counter-propose) · 约时间地点 yuē shíjiān dìdiǎn (set time & place)',
      'These five micro-skills appear in every social plan from coffee dates to wedding-banquet logistics — get them automatic now and every later lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are a Tsinghua student and a new Chinese movie just came out. You want to invite your classmate 王明 to go see it together this weekend — but you don\'t yet know whether Saturday afternoon or Sunday evening works for them, and they may want to counter with a cafe meet-up first.',
      'word',
      '你: "周六下午我们一起去看新电影怎么样?" — 王明: "周六我有事，要不周日晚上吧?"',
      'A typical proposal-counter-counter cycle: open with a time + activity, hear a soft decline + counter-time, agree on the new plan.',
      [
        { target: '周六下午 zhōuliù xiàwǔ', note: '"Saturday afternoon" — day-of-week + part-of-day; the natural unit for proposing a meet-up' },
        { target: '我们一起去看…怎么样?', note: '"let\'s go see… — how about it?"; combines 我们 + 一起 (together) + activity + 怎么样? feedback question' },
        { target: '我有事 wǒ yǒu shì', note: 'literal "I have something on"; the standard soft decline that leaves WHAT-you-have-on respectfully unsaid' },
        { target: '要不…吧 yàobu…ba', note: '"how about… instead"; tentative counter-proposal opener' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三种邀请等级',
      'sān zhǒng yāoqǐng děngjí',
      'Three rough registers for proposing: CASUAL (close friends): 走，去看电影 ("come on, let\'s go to the movies") / 一起呗 ("just come along"). POLITE (classmates, colleagues): 我们…吧 / 要不要一起? / …怎么样? — the safe default. FORMAL (seniors, bosses): 您有空一起…吗? ("when you have time, would you join us for…?"). This lesson focuses on the polite register — what you\'ll use 90% of the time at Tsinghua.',
      'word',
      'CASUAL: 走，看电影! / POLITE: 我们一起看电影怎么样? / FORMAL: 您周末有空一起看电影吗?',
      'Switching upward in formality is always safer than switching downward — when in doubt, use the polite register and let the other person signal "I\'m fine with casual".',
      [
        { target: 'CASUAL: 走 + V', note: 'use only with close peer-friends; signals familiarity and zero hesitation' },
        { target: 'POLITE: 我们…吧 / 怎么样?', note: 'the safe default with classmates, colleagues, anyone you don\'t know intimately' },
        { target: 'FORMAL: 您…吗?', note: 'reserved for bosses, professors, elders, and customer-facing situations' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '吧',
      'ba (neutral tone)',
      'The sentence-final particle 吧 must be pronounced with neutral tone — light, short, unstressed. Heavy stress on 吧 turns a soft invitation into a curt command. Compare: 走吧 (zǒu·ba) "let\'s go" vs 走吧! (zǒu BA!) "GO!".',
      'word',
      '我们走吧 wǒmen zǒu·ba ("let\'s go") · 你来吧 nǐ lái·ba ("go ahead and come")',
      'The most failed-pronunciation among learners — many over-stress 吧 because Pinyin spelling looks like a full syllable.',
      [
        { target: '吧 written: bā', note: 'spelled with first tone in dictionaries, but…' },
        { target: '吧 in actual speech: ·ba (neutral)', note: 'always reduces to neutral after another full-tone syllable — the rule for sentence-final particles' },
        { target: 'over-stressed BA!', note: 'wrong; sounds rude or impatient; sound like you\'re ordering, not inviting' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '怎么样',
      'zěnmeyàng',
      'The high-frequency "how about?" / "how is it?" question phrase. Three-syllable rhythm: full third tone 怎 (zěn) — neutral 么 (·me) — full fourth tone 样 (yàng). The middle 么 is light and short; the final 样 is sharp.',
      'word',
      '周六去看电影怎么样? zhōuliù qù kàn diànyǐng zěnmeyàng? ("Saturday let\'s go see a movie, how about it?")',
      'When 怎 is followed by neutral 么, the third-tone sandhi doesn\'t apply (sandhi needs ANOTHER third tone, not a neutral) — say full third tone on 怎.',
      [
        { target: '怎 (zěn, 3rd)', note: 'full third-tone dip-and-rise; the only stressed syllable of the three' },
        { target: '么 (·me, neutral)', note: 'light and short; almost a syllable-bridge between the two stressed syllables' },
        { target: '样 (yàng, 4th)', note: 'sharp falling tone; gives the question its decisive ending' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '还是',
      'háishi (neutral 是)',
      'High-frequency word with two related meanings — "or" (in questions) and "still / had better" (in suggestions). Pinyin: 还 = second tone (rising) + 是 = neutral tone. Note: 还 also has another pronunciation 还 (huán, "to return") — context disambiguates.',
      'word',
      '我们还是下次吧 wǒmen háishi xiàcì·ba ("let\'s do it next time instead") · 喝咖啡还是喝茶? ("coffee or tea?")',
      'In suggestions, 还是 means "let\'s switch to… / let\'s rather do…" — the second 是 reduces to neutral tone.',
      [
        { target: '还 (hái, 2nd)', note: 'rising tone; the stressed syllable of the pair' },
        { target: '是 (·shi, neutral)', note: 'reduces to neutral here even though 是 is normally 4th tone — typical for the second half of a fixed compound' },
        { target: '还 (huán, 2nd) "return"', note: 'a different word with the same character; always learn 还是 (háishi) as a frozen compound' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '不如',
      'bùrú',
      'A counter-proposal opener meaning "it would be better to…" / "rather…". Tones: 不 = fourth tone, 如 = second tone. NO 不-sandhi here because 如 is second tone (sandhi only triggers before fourth tone) — say full 不 (bù).',
      'word',
      '我们不如去咖啡店 wǒmen bùrú qù kāfēidiàn ("we\'d be better off going to a cafe")',
      'Watch the contrast with 不要 / 不去 (where 不 → bú): 不如 keeps 不 (bù) because 如 is a rising tone, not a falling one.',
      [
        { target: '不 (bù, 4th — NO sandhi)', note: 'stays fourth tone; the next syllable 如 is 2nd, not 4th, so the sandhi rule doesn\'t fire' },
        { target: '不要 (bú yào)', note: 'CONTRAST: here sandhi fires because 要 is 4th; 不 changes to 2nd tone' },
        { target: '如 (rú, 2nd)', note: 'rising tone; the syllable that BLOCKS sandhi above' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '要不要',
      'yào bu yào',
      'The "would you like to…?" pattern. Three syllables: 要 (yào, 4th) + 不 (bu, neutral here!) + 要 (yào, 4th). Note: in the middle of an A-not-A question, 不 reduces to neutral tone — this is the ONLY position where 不 isn\'t fourth or sandhi-modified.',
      'word',
      '你要不要一起去? nǐ yào bu yào yīqǐ qù? ("would you like to come along?")',
      'The neutral-tone 不 in A-not-A questions is a key pronunciation feature — say it light and quick, almost swallowed.',
      [
        { target: '要 (yào, 4th)', note: 'first 要; full falling tone' },
        { target: '不 (·bu, neutral in A-not-A!)', note: 'reduces to neutral tone in this fixed pattern only — NOT 不-sandhi, a separate rule' },
        { target: '要 (yào, 4th)', note: 'second 要; full falling tone again' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Invitations & replies
    // ────────────────────────────────────────────────────────────────────
    createContentItem('一起', 'yīqǐ', 'Adverb meaning "together" — the social glue of every Mandarin invitation. Place 一起 directly before the verb: 一起去 ("go together"), 一起吃饭 ("eat together"). Tone sandhi on 一: yī becomes yì before a third-tone 起 (yìqǐ).', 'word', '我们一起去看电影。', 'A core invitation marker; without 一起 the sentence is just an announcement of your own plan, not a proposal.', null, [ACT.vocabularyInvitations]),
    createContentItem('要不要', 'yào bu yào', 'The standard "would you like to…?" question pattern (A-not-A form of 要). Softer than directly proposing because it explicitly asks the other person\'s preference. Replies: 要 ("yes I do") / 不要 ("no I don\'t") or the more elaborated 好的 / 我有事.', 'word', '你要不要一起喝咖啡?', 'A polite-default invitation form; especially common when you don\'t know yet whether the other person is interested.', null, [ACT.vocabularyInvitations]),
    createContentItem('怎么样', 'zěnmeyàng', 'High-frequency feedback question "how about it?" / "how is it?". Placed at the END of a sentence to invite the listener\'s opinion on a proposal already laid out. Distinct from 要不要 (which IS the proposal); 怎么样 asks for FEEDBACK on a proposal.', 'word', '周六下午看电影，怎么样?', '"Saturday afternoon, movie — how about it?"; the feedback question comes after the proposed plan.', null, [ACT.vocabularyInvitations]),
    createContentItem('好的', 'hǎo de', 'The all-purpose polite "okay / sure". Safe in every register from casual to formal — when in doubt, say 好的. Slightly more deliberate than 好 alone; the 的 softens it into a complete reply.', 'word', '好的，几点见?', '"Okay, what time shall we meet?"; smooth transition from agreement to logistics.', null, [ACT.vocabularyInvitations]),
    createContentItem('行', 'xíng', 'Casual "all right / sounds good". Friendly and quick; common between peers and friends. Slightly less polished than 好的; in formal contexts use 好的 or 可以 instead.', 'word', '行，那就这样定了。', '"Okay, that\'s settled then." — common closing of a casual plan.', null, [ACT.vocabularyInvitations]),
    createContentItem('可以', 'kěyǐ', 'Polite "okay / that works". Carries a slight nuance of "this is acceptable / I\'m fine with it" — useful when you want to agree without sounding overly enthusiastic. Safe in formal contexts.', 'word', '可以，我有空。', '"That works, I\'m free."; matter-of-fact acceptance.', null, [ACT.vocabularyInvitations]),
    createContentItem('没问题', 'méi wèntí', 'Casual-to-polite "no problem". Conveys easy-going confidence; common when accepting a small favor or invitation. Slightly warmer than 可以 because it implies willingness, not just ability.', 'word', '没问题，我准时到。', '"No problem, I\'ll be there on time."; reassuring close.', null, [ACT.vocabularyInvitations]),
    createContentItem('听你的', 'tīng nǐ de', 'Warm casual yes meaning "I\'ll go with what you say / your call". Signals trust and flexibility — you\'re happy to let the other person decide details. Common among close friends and couples.', 'word', '听你的，你说几点就几点。', '"Your call — whatever time you pick."; warm, trusting reply.', null, [ACT.vocabularyInvitations]),
    createContentItem('我有事', 'wǒ yǒu shì', 'The standard soft-decline. Literal "I have something on" — deliberately vague about WHAT you have on, which is the polite point. Pairs naturally with 还是下次吧 ("let\'s do it next time instead") to keep the door open.', 'word', '不好意思，那天我有事。', '"Sorry, I\'m busy that day."; soft, face-saving decline.', null, [ACT.vocabularyInvitations]),
    createContentItem('不太方便', 'bù tài fāngbiàn', 'Polite "not very convenient". Slightly more formal than 我有事; used when you want to decline an option without specifying a reason. Common in professional or semi-formal settings.', 'word', '周六不太方便，周日可以吗?', '"Saturday isn\'t great — Sunday okay?"; decline + counter in one move.', null, [ACT.vocabularyInvitations]),
    createContentItem('还是下次吧', 'háishi xiàcì·ba', 'Soft "let\'s do it next time instead". Closes the current proposal politely while explicitly signaling future willingness — the door-leaving-open phrase. Add 不好意思 ("sorry") in front for extra warmth.', 'word', '不好意思，今天还是下次吧。', '"Sorry, let\'s rain-check for today."; the standard face-saving decline.', null, [ACT.vocabularyInvitations]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Activities & meet-up logistics
    // ────────────────────────────────────────────────────────────────────
    createContentItem('看电影', 'kàn diànyǐng', 'Verb-object compound: 看 (watch) + 电影 (movie). The classic weekend-outing activity — at Tsinghua, especially popular Friday and Saturday nights. Place: 电影院 (diànyǐngyuàn, "cinema").', 'word', '周末一起去看电影吧。', '"Let\'s go to the movies this weekend." — most common weekend invitation in urban China.', null, [ACT.vocabularyActivities]),
    createContentItem('吃饭', 'chīfàn', '"Eat a meal" — 吃 (eat) + 饭 (rice/meal). Goes far beyond literal eating: 一起吃饭 is the default Chinese way to socialize, do business, or solidify a friendship. The invitation people receive most often.', 'word', '我们晚上一起吃饭吧。', '"Let\'s eat together tonight."; the most flexible meet-up activity.', null, [ACT.vocabularyActivities]),
    createContentItem('喝咖啡', 'hē kāfēi', '"Drink coffee" — the low-commitment urban Chinese hang-out. Cafes in big cities double as study spots and quiet meet-up venues. Useful invitation for a first one-on-one with a classmate.', 'word', '下午一起喝咖啡怎么样?', '"Coffee in the afternoon — how about it?"; lighter than dinner, longer than a quick chat.', null, [ACT.vocabularyActivities]),
    createContentItem('逛街', 'guàngjiē', '"Hang out / window-shop" — 逛 (stroll) + 街 (street). Spending an afternoon walking through a shopping mall or commercial district. Common female-friend or couple activity; popular at places like 王府井 (Wangfujing) and 三里屯 (Sanlitun) in Beijing.', 'word', '周六去三里屯逛街吧。', '"Let\'s hang out at Sanlitun on Saturday."; specifies a Beijing mall district as the venue.', null, [ACT.vocabularyActivities]),
    createContentItem('去公园', 'qù gōngyuán', '"Go to the park" — relaxed, low-cost weekend activity especially popular in spring and autumn. In Beijing, 颐和园 (Yíhéyuán, Summer Palace) and 北海公园 (Běihǎi Gōngyuán) are classic destinations.', 'word', '天气好，我们去公园散步吧。', '"Weather\'s nice — let\'s walk in the park."; chains an activity (散步, stroll) onto the place.', null, [ACT.vocabularyActivities]),
    createContentItem('看演唱会', 'kàn yǎnchànghuì', '"See a concert" — 演唱会 specifically means a pop/popular-music live concert (not classical, which is 音乐会 yīnyuèhuì). High-effort plan that requires advance booking; major venues include 北京工人体育场 in Beijing.', 'word', '下个月有个演唱会，要不要一起去?', '"There\'s a concert next month — want to go together?"; longer-lead-time invitation.', null, [ACT.vocabularyActivities]),
    createContentItem('看比赛', 'kàn bǐsài', '"Watch a game" — 比赛 means any competition or match (sports, e-sports, debate). Watching together in a sports bar or someone\'s dorm is a common social activity, especially during major events.', 'word', '今晚有足球比赛，一起看吧。', '"There\'s a soccer game tonight — let\'s watch together."; spontaneous-night invitation.', null, [ACT.vocabularyActivities]),
    createContentItem('电影院', 'diànyǐngyuàn', '"Cinema / movie theater". Big chains in China: 万达影城 (Wanda Cinemas), 横店影视城, CGV. Most have 4D and IMAX options. Tickets are bought either at 电影院 box office or online via app.', 'word', '清华附近的电影院在哪儿?', '"Where\'s the cinema near Tsinghua?"; useful logistics question.', null, [ACT.vocabularyActivities]),
    createContentItem('票', 'piào', '"Ticket" — for movies, concerts, sports, trains. The verb is 买 (mǎi, buy) for tickets you obtain or 订 (dìng) for tickets you book. Two tickets = 两张票 (using measure word 张 zhāng for flat items).', 'word', '我买两张电影票。', '"I\'ll buy two movie tickets."; offering to handle the booking is a warm gesture.', null, [ACT.vocabularyActivities]),
    createContentItem('订票', 'dìng piào', '"Book a ticket" — for advance reservations, especially online. Most Chinese cinemas, concerts, and high-speed trains are now booked through apps (猫眼 Maoyan for movies, 大麦 Damai for concerts).', 'word', '我已经在猫眼上订好票了。', '"I\'ve already booked tickets on Maoyan."; the app name signals this is a movie ticket.', null, [ACT.vocabularyActivities]),
    createContentItem('几点', 'jǐ diǎn', '"What time" — the standard time question word. 几 (jǐ, how many) + 点 (diǎn, o\'clock). Used in any meet-up planning: 几点见? ("what time shall we meet?"), 几点的票? ("what showtime\'s ticket?").', 'word', '我们几点见?', '"What time shall we meet?"; the natural follow-up after agreeing on an activity.', null, [ACT.vocabularyActivities]),
    createContentItem('门口', 'ménkǒu', '"Entrance / door". The natural meet-up landmark for any building: 电影院门口 (cinema entrance), 学校门口 (school gate). Pair with 在 (zài, at) for location: 在门口见 ("meet at the entrance").', 'word', '在电影院门口见。', '"See you at the cinema entrance."; the default meet-up phrasing.', null, [ACT.vocabularyActivities]),
    createContentItem('提前', 'tíqián', '"In advance / ahead of time". Adverb placed before the verb: 提前订票 ("book tickets in advance"), 提前到 ("arrive early"). Signals consideration and reliability — a warm gesture in Chinese social contexts.', 'word', '我提前十分钟到。', '"I\'ll arrive ten minutes early."; reliable-friend signal.', null, [ACT.vocabularyActivities]),
    createContentItem('见面', 'jiànmiàn', '"Meet up" — separable verb 见 (see) + 面 (face). When you want to insert a time or place: split it. 七点见面 ("meet at seven"); 在哪儿见面? ("where shall we meet?"). The non-split form is also common: 我们见个面 ("let\'s meet up").', 'word', '周六下午我们见面吧。', '"Let\'s meet up Saturday afternoon."; common closing of a plan.', null, [ACT.vocabularyActivities]),
    createContentItem('新片', 'xīn piàn', '"New film / new movie". Compound of 新 (new) + 片 (film, slangier than 电影). Modern conversational way to talk about recently-released films; common in WeChat plans and on movie-app reviews.', 'word', '听说有一部新片很不错。', '"I hear there\'s a new movie that\'s pretty good."; natural way to open a movie proposal.', null, [ACT.vocabularyActivities]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 我们 + V + 吧
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '我们 + V + 吧',
      'wǒmen + V + ba',
      'The most common Mandarin suggestion pattern — literally "we + V + (soft particle)". The sentence-final 吧 turns what would otherwise sound like a command into an invitation. WITHOUT 吧: 我们走 sounds like "we leave" or "we\'re leaving" (statement of fact). WITH 吧: 我们走吧 = "let\'s go" (invitation).',
      'sentence',
      '我们走吧。 ("Let\'s go.") · 我们看电影吧。 ("Let\'s see a movie.") · 我们一起去吧。 ("Let\'s go together.")',
      'The single most useful suggestion pattern; if you only learn one, learn this.',
      [
        { target: '我们 wǒmen', note: '"we" (subject) — establishes the suggestion includes the speaker' },
        { target: 'V (any verb)', note: 'the action being proposed; works with any verb phrase' },
        { target: '吧 (·ba, neutral)', note: 'the softening particle — converts statement → invitation; must be neutral tone' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      '我们 + V + 吧 (with object)',
      'with verb-object',
      'Objects insert between the verb and 吧 normally — 吧 always stays at the very END of the sentence. 我们看电影吧 ("let\'s see a movie") splits as 我们 + 看 + 电影 + 吧. Putting 吧 elsewhere (我们吧看电影) is ungrammatical.',
      'sentence',
      '我们看电影吧。我们喝咖啡吧。我们一起去公园吧。',
      'Three identical-structure proposals; only the verb-object pair changes.',
      [
        { target: '我们 + 看 + 电影 + 吧', note: '"let\'s watch a movie" — subject + verb + object + particle' },
        { target: '我们 + 喝 + 咖啡 + 吧', note: '"let\'s grab coffee" — same slot pattern' },
        { target: '我们 + 一起 + 去 + 公园 + 吧', note: 'adverb 一起 inserts before the verb; 吧 still at the end' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      '吧 also softens orders',
      'ba softens commands too',
      'The same particle 吧 also softens orders to ONE person (not just "let\'s"): 你来吧 ("come on, go ahead and come"), 你说吧 ("go ahead, speak"). Context tells you whether the meaning is "let\'s + V" (we-V) or "go ahead + V" (you-V). The first uses 我们 as subject; the second uses 你 or has no explicit subject.',
      'sentence',
      '我们走吧 ("let\'s go") vs 你走吧 ("go ahead, leave")',
      'The subject pronoun determines the meaning: 我们 = "let\'s"; 你 or empty = "go ahead and you".',
      [
        { target: '我们 + V + 吧', note: '"let\'s V" — speaker is included in the action' },
        { target: '你 + V + 吧', note: '"go ahead and V" — speaker NOT included; gives permission or gentle command' },
        { target: '(empty) + V + 吧', note: 'context-dependent; usually = "go ahead and V" with implied 你' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      'When NOT to use 我们…吧',
      'avoid for the boss',
      'The 我们…吧 pattern is peer-level. With clearly senior or formal interlocutors (professors, bosses, customers), use 您…吗? or 我们…可以吗? to add formality. 王教授，我们一起吃饭吧 sounds too casual to a professor; 王教授，您有时间一起吃饭吗? is the formal version.',
      'sentence',
      'PEER: 王明，我们一起吃饭吧。\nFORMAL: 王教授，您有时间一起吃饭吗?',
      'The same proposal in two registers — get the register wrong and you signal disrespect.',
      [
        { target: 'PEER: 我们…吧', note: 'safe with classmates, friends, colleagues at same level' },
        { target: 'FORMAL: 您 + 有时间 + V + 吗?', note: 'use with professors, bosses, elders, or formal/business contexts' },
      ],
      [ACT.grammarBa],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 要不(要) + V
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '要不要 + V',
      'yào bu yào + V',
      'The "would you like to V?" pattern — an A-not-A question form of 要 ("want"). Softer than 我们…吧 because it explicitly invites a yes/no rather than announcing a plan. Place after the subject: 你要不要 + V. Replies: 要 / 好的 (yes) or 不要 / 我有事 (no).',
      'sentence',
      '你要不要一起去看电影? ("Would you like to go to the movies together?") · 你要不要喝点咖啡? ("Would you like some coffee?")',
      'A polite-default invitation form; especially useful when you don\'t yet know whether the other person is interested.',
      [
        { target: '你 + 要不要 + V', note: 'standard word order; subject + A-not-A + verb phrase' },
        { target: 'positive reply: 要 / 好的', note: 'short "yes" reply; can also be elaborated' },
        { target: 'negative reply: 不要 / 不用了', note: 'short "no" reply; 不用了 = "no thanks/that\'s alright" is softer' },
        { target: 'soft decline: 我有事', note: 'face-saving "I have plans" — never use a flat 不 to an invitation' },
      ],
      [ACT.grammarYaobu],
    ),
    createContentItem(
      '要不 + clause (tentative counter)',
      'yàobu + clause',
      'The shortened 要不 (without the second 要) opens a new option tentatively — "how about / how about instead". Common when shifting the conversation: 要不我们去咖啡店? ("how about we go to the cafe instead?"). Slightly more tentative than 要不要 yes/no questions.',
      'sentence',
      '要不我们改天吧? ("How about we do it another day?") · 要不你来我这儿? ("How about you come over to my place?")',
      'A natural pivot phrase — opens with hesitation, lets the other person feel free to accept or counter.',
      [
        { target: '要不 + clause', note: 'tentative "how about / what if"; introduces an alternative or new option' },
        { target: '要不…吧', note: 'pair with sentence-final 吧 for an even softer "let\'s maybe…" feel' },
        { target: 'compare to 要不要', note: '要不要 = yes/no question; 要不 = open suggestion/alternative' },
      ],
      [ACT.grammarYaobu],
    ),
    createContentItem(
      'X 怎么样?',
      'X + zěnmeyàng?',
      'The feedback-question pattern — used to ASK someone\'s opinion on a proposal already on the table. Pattern: [full proposal] + 怎么样?. 周六下午看电影怎么样? ("Saturday afternoon, movies — how about it?"). Distinct from 要不要 (which IS the proposal); 怎么样 invites feedback on it.',
      'sentence',
      '我们去咖啡店怎么样? ("How about we go to the cafe?") · 七点见面怎么样? ("Seven o\'clock for our meet-up — how about it?")',
      'The most natural way to ask for opinion-style agreement — place 怎么样? at the very end.',
      [
        { target: '[proposal] + 怎么样?', note: 'invites feedback on what came before' },
        { target: 'positive reply: 好的 / 行 / 没问题', note: 'short agreement signals' },
        { target: 'negative reply: 那天不行 / 不太方便', note: 'soft declines with reason' },
      ],
      [ACT.grammarYaobu],
    ),
    createContentItem(
      'Three softness levels',
      'directness scale',
      'Three patterns for proposing, ordered from MORE DIRECT to MORE TENTATIVE: (1) 我们…吧 — "let\'s V" (announces a plan, soft via 吧); (2) X 怎么样? — "how about X" (presents a plan for feedback); (3) 要不要 + V? — "would you like to V?" (asks if they want to). Switch among them based on how sure you are the other person will agree.',
      'sentence',
      'CONFIDENT: 我们去看电影吧。\nNEUTRAL: 去看电影怎么样?\nTENTATIVE: 你要不要去看电影?',
      'Same proposal, three softness levels — match to your read of the relationship.',
      [
        { target: 'CONFIDENT: 我们…吧', note: 'announces the plan; assumes the other person is likely to agree' },
        { target: 'NEUTRAL: …怎么样?', note: 'proposes and explicitly asks for feedback' },
        { target: 'TENTATIVE: 要不要…?', note: 'asks if they want to at all; safest when unsure' },
      ],
      [ACT.grammarYaobu],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Agree, decline, counter-propose
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '快速答应',
      'kuàisù dāying',
      'Five quick-yes options, each with a slightly different feel. 好的 = safe-polite-all-purpose; 行 = friendly-casual; 可以 = matter-of-fact "that works"; 没问题 = "no problem" (warm/confident); 听你的 = "your call" (warm-trusting, close friends). Mix and match to your relationship.',
      'sentence',
      '好的 / 行 / 可以 / 没问题 / 听你的 — same yes function, five flavors of warmth.',
      'Hearing variety in yes-replies makes you sound natural; saying only 好 over and over makes you sound rigid.',
      [
        { target: '好的', note: 'safe default; works in every register from casual to formal' },
        { target: '行', note: 'casual peer-to-peer; slightly less polished than 好的' },
        { target: '可以', note: 'matter-of-fact "that works"; useful when you want to agree without sounding eager' },
        { target: '没问题', note: 'warm, confident "no problem"; signals easy willingness' },
        { target: '听你的', note: 'warm, trusting "your call / whatever you say"; close-friend register' },
      ],
      [ACT.grammarCounter],
    ),
    createContentItem(
      '礼貌拒绝',
      'lǐmào jùjué',
      'CRITICAL RULE: never reply with a flat 不 to a Chinese invitation. A bare 不 sounds blunt and face-losing. Soften with: 我有事 ("I\'ve got something on"), 那天不太方便 ("that day isn\'t great"), 不好意思 ("sorry") + reason. Always pair with 还是下次吧 ("let\'s do it next time") to leave the door open.',
      'sentence',
      'WRONG: 不。\nRIGHT: 不好意思，那天我有事，还是下次吧。',
      'The 不好意思 + reason + 还是下次吧 three-part formula is the polite-decline standard.',
      [
        { target: '不好意思 bù hǎoyìsi', note: '"sorry" — opens the decline gently; lower-stakes than 对不起' },
        { target: '我有事 / 不太方便', note: 'vague reason — deliberately doesn\'t specify what the conflict is; respects mutual privacy' },
        { target: '还是下次吧 háishi xiàcì·ba', note: 'leaves the door open — signals that you still want to socialize, just not now' },
      ],
      [ACT.grammarCounter],
    ),
    createContentItem(
      '还是 + V + 吧',
      'háishi + V + ba',
      'The counter-proposal pattern — "let\'s V instead". Used when you want to redirect the plan: a different activity, different time, or different place. 还是 here means "rather / instead"; combined with sentence-final 吧 it forms a soft alternative.',
      'sentence',
      '还是周日吧。 ("Let\'s do Sunday instead.") · 还是去咖啡店吧。 ("Let\'s go to the cafe instead.")',
      'A natural way to redirect a plan without rejecting the original proposal outright.',
      [
        { target: '还是 (háishi)', note: '"rather / instead"; signals a shift from a previous option' },
        { target: '+ V', note: 'the new proposed activity/time/place' },
        { target: '+ 吧', note: 'softening particle; turns the redirection into an invitation, not a demand' },
      ],
      [ACT.grammarCounter],
    ),
    createContentItem(
      '不如 + V',
      'bùrú + V',
      'A slightly more written/thoughtful counter-proposal — "it would be better to V" / "rather V". Suggests the alternative is actually preferable. More deliberate than 还是…吧; common in WeChat messages and when you have a specific reason to redirect.',
      'sentence',
      '我们不如改天再约吧。 ("We\'d be better off rescheduling.") · 你不如试试这个。 ("You\'d be better off trying this one.")',
      'Use when you want to suggest the alternative is genuinely the smarter choice, not just a substitute.',
      [
        { target: '不如 (bùrú)', note: 'literal "not as good as"; functionally "rather / better to"' },
        { target: '+ V', note: 'the recommended alternative' },
        { target: 'compare 还是…吧', note: 'still…ba = casual redirect; 不如 = thoughtful preference for the alternative' },
      ],
      [ACT.grammarCounter],
    ),
    createContentItem(
      '定时间和地点',
      'dìng shíjiān hé dìdiǎn',
      'Once both sides agree, pin down details with: 几点见? ("what time shall we meet?"), 在哪儿见? ("where shall we meet?"), 我提前订票 ("I\'ll book tickets in advance"). Confirm with 那就这么定了 ("then let\'s settle on that") — a warm casual close.',
      'sentence',
      '好的，那就周六晚上七点，在电影院门口见。我提前订票。',
      '"Okay, Saturday seven PM at the cinema entrance. I\'ll book tickets in advance." — a single sentence covering time, place, and logistics.',
      [
        { target: '几点 + 见?', note: '"what time meet?" — natural time-pinning question' },
        { target: '在 + 地点 + 见', note: '"meet at [place]" — location-pinning statement' },
        { target: '我提前订票', note: 'volunteering to handle bookings is a warm, reliable-friend gesture' },
        { target: '那就这么定了', note: 'casual "then it\'s settled" close; signals the plan is finalized' },
      ],
      [ACT.grammarCounter],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '电影院信息',
      'diànyǐngyuàn xìnxī',
      'A Beijing movie-theater listing in real-life format. Read it aloud, identify the four key fields (title, showtimes, price, language/subtitles), and decide which showtime to propose to your friend.',
      'sentence',
      '万达影城 (清华园店) / 电影: 中国新片《长安三万里》(2D) / 上映时间: 14:30 · 17:00 · 19:45 · 22:00 / 票价: 学生票 35元 / 普通 50元 / 语言: 普通话 (中文字幕) / 订票: 猫眼APP',
      'Wanda Cinemas (Tsinghua branch) / Movie: New Chinese film "Chang\'an 30,000 Li" (2D) / Showtimes: 2:30 / 5 / 7:45 / 10 PM / Price: Student 35 RMB / Regular 50 RMB / Language: Mandarin (Chinese subtitles) / Booking: Maoyan app.',
      [
        { target: '上映时间 shàngyìng shíjiān', note: '"showtime" — when the movie plays; 上映 specifically = "be screened"' },
        { target: '学生票 / 普通票', note: '"student ticket / regular ticket" — Chinese cinemas commonly offer student discounts' },
        { target: '普通话 (中文字幕)', note: '"Mandarin (Chinese subtitles)" — standard label for a Chinese-language film' },
        { target: '猫眼APP', note: '"Maoyan app" — the dominant Chinese movie-booking app, like Fandango in the US' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions matching the listing. Answer using the suggestion patterns from this lesson — 我们…吧 for plan proposals and 怎么样? for feedback questions.',
      'sentence',
      'Q1: 电影叫什么? Q2: 学生票多少钱? Q3: 我们看几点的? Q4: 怎么订票?',
      'Q1: What\'s the movie called? Q2: How much is a student ticket? Q3: Which showtime shall we get? Q4: How do we book?',
      [
        { target: 'A1: 电影叫《长安三万里》。', note: 'name answer using 叫; book/movie titles take Chinese book-title brackets 《》' },
        { target: 'A2: 学生票35元。', note: 'price answer; 元 (yuán) = RMB unit, equivalent to dollars/euros in usage' },
        { target: 'A3: 我们看七点四十五的吧。', note: 'proposal answer using 我们…吧; the time "7:45" picks one of the showtimes' },
        { target: 'A4: 在猫眼APP上订票。', note: 'logistics answer; 在…上 = "on [platform]"' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '周末电影计划 (对话)',
      'zhōumò diànyǐng jìhuà (duìhuà)',
      'A 7-turn polite-casual conversation between two Tsinghua classmates planning a Saturday-night movie. Covers proposal, soft counter (different day), agreement, and meet-up logistics — the full suggestion-to-confirmed-plan cycle.',
      'conversation',
      'A: 王明，这周末有空吗?\nB: 周六有事，周日可以。怎么了?\nA: 听说《长安三万里》挺好看的，我们一起去看吧?\nB: 好啊! 几点的票?\nA: 我看看…周日晚上七点四十五怎么样?\nB: 没问题。在哪儿的电影院?\nA: 清华园店的万达。七点二十五在门口见，可以吗?\nB: 行，那就这么定了。票我来订吧。\nA: 好的，谢谢你! 周日见。',
      'Notice the proposal-counter-confirm rhythm: A opens with availability check, B counters Saturday → Sunday, A proposes a specific showtime, B confirms location, A pins down meet-up time, B volunteers to book — a natural distribution of effort between friends.',
      [
        { target: '有空吗? yǒu kòng ma?', note: '"are you free?" — standard availability check before launching into a proposal' },
        { target: '怎么了? zěn me le?', note: '"what\'s up?" — natural follow-up when someone asks if you\'re free; signals openness' },
        { target: '听说…挺…的 tīngshuō…tǐng…de', note: '"I hear it\'s pretty…" — common way to introduce a proposal with a soft endorsement' },
        { target: '几点的票 jǐ diǎn de piào', note: '"a ticket for what time"; 的 turns a time into a noun modifier' },
        { target: '票我来订吧 piào wǒ lái dìng ba', note: '"I\'ll handle the tickets"; 我来 + V = "I\'ll do V (for the group)" — a warm volunteer pattern' },
        { target: '那就这么定了', note: '"then it\'s settled"; casual confirmation close' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '委婉拒绝 (对话)',
      'wěiwǎn jùjué (duìhuà)',
      'A short polite-decline conversation. Notice the three-part structure: opening apology (不好意思), vague reason (我有事), door-leaving-open offer (还是下次吧 + 改天). Even though the answer is no, the social bond is preserved.',
      'conversation',
      'A: 王明，周六晚上一起去看电影吧?\nB: 啊，不好意思，周六我有事，那天不太方便。\nA: 哦，没关系。要不周日?\nB: 周日也不行…实在抱歉。还是下次吧，下周我请你喝咖啡好不好?\nA: 好的，没问题。那下周见!\nB: 下周见，再次抱歉啊。',
      'A "no" that protects everyone\'s face — B explicitly offers a future plan (下周喝咖啡, "coffee next week") to signal the relationship is still warm.',
      [
        { target: '实在抱歉 shízài bàoqiàn', note: '"genuinely sorry"; 实在 intensifies; more formal than plain 不好意思' },
        { target: '还是下次吧 háishi xiàcì·ba', note: 'the door-leaving-open phrase; signals you still want the plan, just not this time' },
        { target: '我请你 wǒ qǐng nǐ', note: '"my treat / I\'ll invite you"; offering to be the host is a warm cultural gesture (see Culture Note)' },
        { target: '好不好? hǎo bu hǎo?', note: '"is that okay?"; A-not-A question form of 好; common confirmation-seeking close' },
        { target: '没关系 méi guānxi', note: '"no problem / it\'s fine"; standard response to an apology' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '微信邀请模板',
      'wēixìn yāoqǐng múbǎn',
      'A reusable 3-line WeChat invitation template. Fill in the bracketed slots with your own activity, time, and place — the structure carries the rest. Close with a casual confirmation request like 行不行? or 你看怎么样?',
      'sentence',
      '[名字]，[星期几]晚上有空吗? 我们一起去 [活动] 吧! [时间] 在 [地点] 见，怎么样?',
      'Three short sentences cover everything: availability check, proposal, time + place, soft request for feedback.',
      [
        { target: '[名字]', note: 'the friend\'s given name or nickname; in WeChat, casual address is the default' },
        { target: '[星期几]晚上有空吗?', note: 'availability check before proposing; common WeChat opener' },
        { target: '我们一起去[活动]吧!', note: '我们 + 一起 + verb + 吧 — the core invitation pattern with the warm 一起' },
        { target: '[时间] 在 [地点] 见，怎么样?', note: 'pins down time and place, then asks for feedback with 怎么样' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 3-4 sentence WeChat invitation in Hanzi using the template. Use 我们…吧 or 要不要 once, one specific time, and one meet-up place. End with 怎么样? or 行不行? to invite a reply.',
      'sentence',
      '示例: 莎拉，周六晚上有空吗? 听说有部新的中国电影，我们一起去看吧! 七点在万达门口见，怎么样? 票我提前订好。',
      'Translation: "Sarah, are you free Saturday evening? I hear there\'s a new Chinese movie — let\'s go see it together! Seven PM at the Wanda entrance, how about it? I\'ll book tickets in advance." — uses 我们…吧, a specific time, a specific place, and volunteers a booking task.',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '请客',
      'qǐng kè',
      'The cultural practice of "treating someone" — in traditional Chinese culture, the person who issues the invitation typically pays. Saying 我请你 ("my treat") is warm and normal, not awkward. Refusing too hard can feel cold; usually you accept once and offer to reciprocate next time (下次我请你). Especially common for meals; less rigid for casual coffee or movies among young urban friends.',
      'sentence',
      'A: 周六我请你吃饭吧! — B: 不用了，AA吧。 — A: 这次我请，下次你请。',
      'A typical 请客 negotiation: A offers to host, B politely demurs with AA制 (going Dutch), A insists on this round + sets up reciprocity for next time. The back-and-forth IS the politeness.',
      [
        { target: '请客 qǐng kè', note: 'literal "invite a guest"; functionally "treat someone, pay for them"' },
        { target: '我请你 wǒ qǐng nǐ', note: '"my treat / I\'ll invite you"; warm offer, especially common from the elder/senior person' },
        { target: '不用了 bú yòng le', note: '"no need / it\'s fine"; soft refusal — but in a 请客 context, often a politeness ritual before accepting' },
        { target: '下次我请你 xiàcì wǒ qǐng nǐ', note: '"next time it\'s on me"; sets up reciprocity, preserves the relationship balance' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'AA制',
      'AA zhì',
      'Going Dutch — splitting the bill evenly. The "AA" comes from English "All Average". Increasingly common among young urban Chinese, especially university students and young professionals, but still NOT the default. Often negotiated in advance: 我们AA吧 ("let\'s split it"). At a formal meal or with elders/seniors, 请客 still rules.',
      'sentence',
      '我们AA吧? — 行，那就AA。',
      'A casual peer-to-peer agreement to split the bill; common at Tsinghua among classmates.',
      [
        { target: 'AA制 AA zhì', note: '"AA system"; 制 means "system"; the fixed term for splitting evenly' },
        { target: '我们AA吧', note: '"let\'s go Dutch"; the standard proposal phrasing — uses 吧 like any other suggestion' },
        { target: 'when AA is appropriate', note: 'peer-to-peer, students, casual outings; AVOID with elders, bosses, or formal banquets' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '周五晚上',
      'zhōuwǔ wǎnshang',
      'Friday and Saturday nights in big Chinese cities (Beijing, Shanghai, Shenzhen, Guangzhou) are when 看电影 / 吃饭 / 喝咖啡 / 唱KTV plans concentrate. Public transport extends, restaurants stay open later, and cinemas run shows past midnight. Sundays trend toward family time (回家吃饭) and rest before Monday — proposing a late Sunday outing may get a soft "不太方便".',
      'sentence',
      '周五晚上去三里屯逛街吧! — 好啊，那边周末特别热闹。',
      '"Let\'s hang out at Sanlitun Friday night!" — Beijing\'s Sanlitun is a famous Friday/Saturday-night destination; 热闹 (rènao, "lively") is the standard word for the energy of a busy entertainment district.',
      [
        { target: '周五晚上 / 周六晚上', note: 'the peak social-plan slots in urban China; everything from movies to bars happens here' },
        { target: '周日晚上', note: 'usually quieter; many people prep for Monday work; proposing late may get a polite decline' },
        { target: '热闹 rènao', note: '"lively / bustling"; positive cultural value — empty places are 冷清 (cold-quiet) and less desirable' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '从不到不',
      'cóng bù dào bù',
      'Why never reply 不 alone to an invitation: a flat 不 in Chinese signals not just disagreement but social distance — it can cause the inviter to lose face (面子). Even strangers and shopkeepers cushion refusals: 不好意思，没有 ("sorry, we don\'t have it"), 这个我不太清楚 ("I\'m not sure about that one"). A bare 不 sounds blunt; learners who say it often surprise their Chinese friends.',
      'sentence',
      'WRONG: A: 一起喝咖啡? — B: 不。\nRIGHT: A: 一起喝咖啡? — B: 不好意思，我下午有事，还是下次吧。',
      'The contrast — same answer ("no"), but the right version protects both speakers\' faces.',
      [
        { target: 'NEVER: 不 (bare)', note: 'too blunt to a friend\'s invitation; can register as rude or cold' },
        { target: 'BETTER: 不好意思 + reason + 下次吧', note: 'the three-part soft-decline formula; preserves the relationship' },
        { target: '面子 miànzi', note: '"face" — public dignity/reputation; protecting it shapes much of polite Chinese language' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 周末电影计划',
      'rènwù: zhōumò diànyǐng jìhuà',
      'Roleplay inviting your Tsinghua classmate 王明 to see a new Chinese movie this weekend with the AI tutor playing 王明. Use every skill from this lesson — proposal, agreement or counter, time/place pinning, and a casual sign-off — in one continuous 6–8 turn exchange.',
      'conversation',
      '[微信对话, 周四晚上]\n你: [打招呼 + 问周末有空吗]\n王明: 周六晚上有空，怎么了?\n你: [提议看新中国电影 + 用 我们…吧 / 要不要]\n王明: 听起来不错。几点的票好?\n你: [建议一个时间 + 怎么样?]\n王明: 行。在哪儿见?\n你: [选地点 + 提议提前几分钟见]\n王明: 没问题，那就这么定了。票我来订。\n你: [感谢 + 告别]',
      '8 turns of fluent exchange; the AI tutor will prompt you in 王明\'s voice and respond naturally to whatever you say.',
      [
        { target: '问有空 ask availability', note: '这周末有空吗? / 周六晚上有时间吗? — open with availability check, not the proposal' },
        { target: '提议 propose', note: '我们一起去看…吧 / 要不要一起去看…? — pick the softness level that matches the relationship' },
        { target: '建议时间 suggest time', note: 'X点(的票)怎么样? — propose a specific showtime and invite feedback' },
        { target: '定地点 pin place', note: '在…门口见 / 在…见 — natural location-pinning phrasing' },
        { target: '提前 in advance', note: '提前十分钟到 / 我提前订票 — reliability gesture; warm sign of consideration' },
        { target: '告别 sign off', note: '那就这么定了 / 周六见 / 谢谢你 — casual close that confirms the plan and warmly ends the exchange' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 委婉拒绝并改提议',
      'tiǎozhàn — wěiwǎn jùjué bìng gǎi tíyì',
      'Stretch goal: in the same scene, 王明 says he\'s busy Saturday. Politely decline-and-counter — soften with 不好意思, offer a vague reason (我有事), then counter-propose Sunday or a different activity using 还是…吧 or 不如…. Keep the social bond warm.',
      'conversation',
      '王明: 周六晚上不行，我有事。\n你: [软化拒绝 + 改提议 周日 / 改提议 喝咖啡]\n王明: 周日下午可以。那我们去咖啡店吧。\n你: [同意 + 定地点 + 时间]\n王明: 行，那就周日下午两点，在清华西门旁边那家咖啡店。\n你: [确认 + 谢谢]',
      'Notice the redirection: you don\'t lose the plan because of one conflict — you shift activity (movie → cafe) and day (Saturday → Sunday), and the warm exchange continues.',
      [
        { target: '不好意思 / 没关系', note: 'apology + reassurance pair; common at the seam of a redirection' },
        { target: '还是…吧 / 不如…', note: 'two counter-proposal patterns from Grammar III; pick the one that fits your tone' },
        { target: '改天 / 改活动', note: '"change day / change activity"; signaling flexibility in either dimension keeps the plan alive' },
        { target: '确认细节 confirm details', note: '具体几点 (concrete time) + 具体地点 (concrete place) at the end so both sides leave with the same expectations' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
