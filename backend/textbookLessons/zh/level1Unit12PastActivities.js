// Level 1 Unit 12 — Past Activities (Mandarin Chinese)
// Functions: describing what you did, expressing past experiences, asking
// about someone's weekend, negating past actions, and connecting time
// words with completed actions.
//
// Mandarin has no past-tense verb conjugation. Past time is expressed via
// (1) past time words (昨天, 上星期, 去年…), (2) the perfective aspect
// marker 了 (le) for completed actions, and (3) the experiential marker
// 过 (guo) for "ever done before". Negation in the past uses 没 (méi),
// NEVER 不 — this is the most common learner trap.
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
  orientation: 'zh-l1u12-orientation',
  pronunciation: 'zh-l1u12-pronunciation',
  vocabularyActivities: 'zh-l1u12-vocab-activities',
  vocabularyTime: 'zh-l1u12-vocab-time',
  grammarLe: 'zh-l1u12-grammar-le',
  grammarGuo: 'zh-l1u12-grammar-guo',
  grammarNegation: 'zh-l1u12-grammar-negation',
  reading: 'zh-l1u12-reading',
  listening: 'zh-l1u12-listening',
  writing: 'zh-l1u12-writing',
  culture: 'zh-l1u12-culture',
  task: 'zh-l1u12-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Talk about past activities in Mandarin using time words + the aspect marker 了 (le) for completed action — without any verb conjugation.',
      'Distinguish 了 (completed specific action) from 过 (guo, "ever done in life") and pick the right one for each kind of past sentence.',
      'Negate a past sentence correctly with 没 (méi), avoiding the very common English-speaker trap of using 不 for past negation.',
    ],
    task: 'Imagine a Tsinghua classmate stops you on Monday morning and asks 你周末做了什么? — by the end of this lesson you should give 3 fluent past sentences covering when, where, and with whom.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce sentence-final and verb-final 了 as a SHORT, light neutral-tone "le" — never as a full fourth-tone syllable. The marker should almost disappear into the previous syllable.',
      'Pronounce 过 (guo) as neutral tone when it is the experiential aspect marker — distinct from the full fourth-tone 过 (guò) meaning "to pass / to cross", which is a different word.',
      'Pronounce 没 (méi) with a clear rising second tone, never a flat or falling one — confusing it with 美 (měi, third tone) changes the meaning entirely.',
    ],
    task: 'Read each past-marker example aloud and check that 了, 过, and 没 sit in the right pitch contour.',
  },
  {
    id: ACT.vocabularyActivities,
    section: 'Vocabulary I',
    title: 'Activity verbs for weekends and past stories',
    goals: [
      'Memorize 12+ activity verbs that naturally pair with weekend / vacation contexts: 去 (go), 看 (see/watch), 吃 (eat), 玩 (play/hang out), 爬山 (climb mountains), 旅游 (travel), etc.',
      'Know which verbs are verb-object compounds (吃饭, 看电影, 爬山, 旅游) — these behave specially when 了 is attached, because 了 usually slots between the verb and the object.',
    ],
    task: 'Pick three of these activity verbs and say one past sentence with each, anchored to a real Tsinghua weekend you remember.',
  },
  {
    id: ACT.vocabularyTime,
    section: 'Vocabulary II',
    title: 'Past-time markers',
    goals: [
      'Use the 8 most common past-time words: 昨天 (yesterday), 前天 (day before yesterday), 上星期 (last week), 上个周末 (last weekend), 上个月 (last month), 去年 (last year), 那天 (that day), 刚才 (just now).',
      'Place the time word BEFORE the verb (常常 in subject-time-place-verb order) — Mandarin word order does not change for past, the time word does all the time-anchoring work.',
    ],
    task: 'Pair each past-time word with one of the activity verbs from Vocabulary I and read the resulting sentence aloud.',
  },
  {
    id: ACT.grammarLe,
    section: 'Grammar I',
    title: 'V + 了 (le) — the completed-action aspect marker',
    goals: [
      'Use verb-final 了 to mark that a specific action has been completed: 我吃了饭 ("I ate / I have eaten"). The 了 sits right after the verb, before the object.',
      'Use sentence-final 了 to mark a change of state or a completed situation as a whole: 我吃饭了 ("I have eaten now / I\'m done eating") — softer, more contextual than verb-final 了.',
      'Recognize the double 了 pattern (V 了 … 了) used to signal an action that is complete AND continuing or relevant up to now: 我学了三年中文了 ("I have been studying Chinese for three years now").',
    ],
    task: 'Take five activity verbs and produce three sentences each: one with verb-final 了, one with sentence-final 了, and one with both — feel the meaning shift.',
  },
  {
    id: ACT.grammarGuo,
    section: 'Grammar II',
    title: 'V + 过 (guo) — the experiential "ever done" marker',
    goals: [
      'Use 过 (guo, neutral tone) after a verb to indicate that the speaker has the EXPERIENCE of doing the action at least once in their life: 我去过北京 ("I have been to Beijing [at some point]").',
      'Distinguish 过 from 了: 了 marks a SPECIFIC completed action ("I ate lunch today"); 过 marks a LIFE EXPERIENCE ("I have eaten that dish before, at some point"). The two are not interchangeable.',
      'Form the question with 过 by adding 吗 at the end (你去过中国吗?) or with the V-没-V pattern (你去没去过中国?).',
    ],
    task: 'Ask three classmates 你…过…吗? questions about life experiences (foods tried, cities visited, sports played) and answer in kind.',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar III',
    title: 'Past negation with 没 (méi) — and why you NEVER use 不 with 了',
    goals: [
      'Negate a past action by placing 没 (méi) or 没有 (méiyǒu) BEFORE the verb. CRITICAL: when you negate with 没, you DROP the 了 entirely. 我没吃 ("I did not eat"), NEVER 我没吃了.',
      'Distinguish 不 (general/future/habitual negation) from 没 (past-completed negation). 我不吃 = "I don\'t eat / I won\'t eat"; 我没吃 = "I didn\'t eat / I haven\'t eaten".',
      'For 过 sentences, the negation works the same way: 没 + V + 过. 我没去过北京 ("I have never been to Beijing"). The 过 stays because it marks experience, not completion.',
    ],
    task: 'Take three positive past sentences with 了 and three with 过, then negate each correctly — drop 了 with 没, keep 过 with 没.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a Tsinghua weekend recap',
    goals: [
      'Read a 6-sentence past-tense paragraph about a weekend at Tsinghua aloud, with correct tones and natural neutral-tone 了 / 过 reductions.',
      'Answer four comprehension questions in short past-tense sentences using 了, 过, or 没 as appropriate.',
    ],
    task: 'Read the paragraph aloud once, then answer four comprehension questions about who, what, where, and when.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Monday morning weekend recap',
    goals: [
      'Follow a 6-turn Monday-morning conversation between two Tsinghua students recapping their weekends, recognizing each past marker (了, 过, 没) as it appears.',
      'Reproduce the conversation with your own weekend swapped in, keeping the rhythm of question (你周末做了什么?) and answer (我…了…).',
    ],
    task: 'Read the dialogue along with the tutor first, then perform it again with your own weekend details swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your last weekend in 5 sentences',
    goals: [
      'Write 4–6 past-tense sentences in Hanzi about your last weekend, using at least two verbs with 了, one with 过 (a life experience layered in), and one negation with 没.',
      'Anchor each sentence with a time word (上个周末, 星期六早上, 那天下午…) so the past reading is unambiguous even without aspect markers.',
    ],
    task: 'Write your own 4–6 sentence weekend diary, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '周末文化 — Chinese weekends, golden weeks, and 朋友圈',
    goals: [
      'Know that 周末 (weekend) family time is highly valued — extended family meals, 串门 (chuànmén, "visiting" relatives unannounced), and 公园 (park) outings dominate Saturday and Sunday in many Mainland families.',
      'Understand the 黄金周 (huángjīnzhōu, "golden week") — the week-long national holidays around 国庆 (October 1st National Day) and 春节 (Spring Festival / Lunar New Year) when most of the country travels at the same time.',
      'Recognize 朋友圈 (péngyǒuquān, the WeChat "Moments" feed) as the default channel for sharing photos of past trips, meals, and outings — talking about 上个周末 often means showing 朋友圈 evidence.',
    ],
    task: 'Pick one Mainland weekend activity (a 黄金周 trip, a 串门 visit, a 朋友圈 post) you would try, and describe it in 1-2 past sentences using 了.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: '任务: 跟同学聊周末 — Tell a Tsinghua classmate about your weekend',
    goals: [
      'Combine past time words, V + 了, V + 过, and 没 + V into a continuous 6-turn weekend recap with a Tsinghua classmate — no rehearsal between turns.',
      'Switch from completed-action 了 to experiential 过 mid-conversation when the topic shifts from "this weekend" to "ever in your life".',
    ],
    task: 'Roleplay a Monday-morning chat at the Tsinghua canteen with the tutor playing a classmate from Beijing — share at least 2 activities, 1 experience with 过, and 1 negation with 没.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 12: 周末做了什么 — Past Activities',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-what-did', label: 'Asking what someone did', goal: 'Use 你…做了什么? or 你…干了什么? to ask about a past activity, anchored to a time word like 周末 or 昨天.' },
    { id: 'describing-past-activity', label: 'Describing a past activity', goal: 'Combine time word + (companion) + (place) + verb + 了 + object to give one clean past sentence: 上个周末我跟朋友去了颐和园.' },
    { id: 'sharing-experience', label: 'Sharing a life experience', goal: 'Use V + 过 to talk about something you have ever done at least once in your life: 我去过长城 / 我吃过火锅.' },
    { id: 'past-negation', label: 'Negating a past action politely', goal: 'Use 没 + V (without 了) to say you did NOT do something — 我没去 / 我没吃过.' },
  ],
  relatedPools: ['topic-daily-life', 'topic-people'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can talk about what you did, when, where, and with whom in Mandarin — using time words + the aspect markers 了 and 过 instead of verb conjugation, and 没 (never 不) to negate.',
      'word',
      'Functional language: 时间词 shíjiāncí (time words) · 完成 wánchéng (completion: 了) · 经验 jīngyàn (experience: 过) · 否定 fǒudìng (negation: 没) · 提问 tíwèn (asking questions)',
      'Four micro-skills — time word, completed 了, experiential 过, past-negation 没 — together cover the entire Level-1 past-talk system in Mandarin.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '今天的场景',
      'jīntiān de chǎngjǐng',
      'It is Monday morning at Tsinghua. A classmate walks into the canteen and asks 你周末做了什么? You should respond with 2-3 fluent past sentences that include when, where, and with whom.',
      'word',
      '同学: 你周末做了什么? — 你: 我跟朋友去了颐和园，看了很多照片。',
      'A classic Mainland student-to-student Monday opener; the question always uses 了 attached to 做, and the answer should mirror that structure.',
      [
        { target: '你周末做了什么?', note: 'standard Monday-morning question; literally "you weekend did-le what?"' },
        { target: '我跟朋友去了颐和园', note: 'companion + verb-了 + place; 颐和园 (Yíhéyuán) is the Summer Palace, a common Beijing day-trip spot' },
        { target: '看了很多照片', note: 'second clause continues the past narrative; verb-了 again' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '没有时态变化',
      'méiyǒu shítài biànhuà',
      'CRITICAL framing for English speakers: Mandarin verbs DO NOT change form for past tense. 吃 means "eat" whether it happened yesterday, today, or tomorrow. Past meaning comes from (1) a time word, (2) the aspect marker 了 or 过, or (3) context — not from the verb form.',
      'word',
      '我吃 (I eat / I am eating / I will eat) — same verb form\n我昨天吃了 (I ate yesterday) — time word + 了 makes it past',
      'The single biggest mental shift for learners coming from European languages: stop conjugating, start anchoring with time words and aspect markers.',
      [
        { target: 'No verb conjugation', note: '吃 stays 吃 — past, present, future all share one form' },
        { target: 'Time word does the work', note: '昨天, 上星期, 去年 — these anchor the past clearly' },
        { target: '了 / 过 mark aspect', note: '了 = completed; 过 = ever experienced — these add nuance, not tense' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '了 (le)',
      'le (neutral tone)',
      'The aspect marker 了 is always pronounced as a SHORT, light neutral-tone "le" — almost a quick puff after the previous syllable. Never give it a full tone; if you say "lè" or "lě", you sound robotic or wrong.',
      'word',
      '我吃了 wǒ chī le · 我去了 wǒ qù le · 我看了 wǒ kàn le',
      'Listen for the way 了 fuses into the previous syllable — native speakers sometimes barely articulate it.',
      [
        { target: 'written: 了 (lě in dictionary)', note: 'as the aspect marker, NEVER pronounced with the dictionary third tone' },
        { target: 'spoken: le (neutral)', note: 'short, light, unstressed; pitch determined by the preceding syllable' },
        { target: 'after 4th tone (吃了)', note: 'falls and quickly trails off — the most common rhythm' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '过 (guo vs guò)',
      'guo (neutral) ≠ guò (4th)',
      'The experiential marker 过 is pronounced as neutral-tone "guo" — short and unstressed, like 了. The fully-toned 过 (guò, fourth tone) is a SEPARATE word meaning "to pass / to cross" — a different verb, a different role. Confusing the two changes meaning.',
      'word',
      '我去过 wǒ qù guo (neutral, "I have been [there]") vs 我过马路 wǒ guò mǎlù (4th tone, "I cross the street")',
      'Same character, two pronunciations, two completely different grammatical roles.',
      [
        { target: '过 (guo, neutral) — aspect marker', note: 'after a verb to mark "ever done"; short and light' },
        { target: '过 (guò, 4th) — full verb', note: 'meaning "to pass / to cross / to spend [time]"; sharp falling tone' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '没 (méi)',
      'méi (2nd tone, rising)',
      '没 must be pronounced with a clear rising second tone (méi). A flat or falling pitch turns it into 美 (měi, third, "beautiful") or 妹 (mèi, fourth, "younger sister") — completely different words. The rising contour is essential.',
      'word',
      '我没去 wǒ méi qù (I didn\'t go) vs 我美 wǒ měi (I am beautiful — wrong meaning!)',
      'The rise has to be clear — start at mid pitch and glide up to high.',
      [
        { target: '没 méi (2nd, rising)', note: 'past-negation marker; the lesson\'s key word' },
        { target: '美 měi (3rd, dip)', note: '"beautiful"; same vowel and consonant but different tone' },
        { target: '妹 mèi (4th, falling)', note: '"younger sister"; tone confusion is a real risk' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '吃了 (chī le)',
      'chī le',
      'A first-tone verb (吃) followed by neutral 了. The first tone stays high and level; 了 trails off short and light. The most common past-marker pairing in everyday speech.',
      'word',
      '我吃了 wǒ chī le (I ate) · 你吃了吗? nǐ chī le ma? (Did you eat? — also a common greeting at meal times)',
      'Notice 你吃了吗? is a routine greeting around meal times in Mainland China, not always a literal question.',
      null,
      [ACT.pronunciation],
    ),
    createContentItem(
      '去过 (qù guo)',
      'qù guo',
      'A fourth-tone verb (去) followed by neutral 过. The 去 falls sharply, then 过 trails off in light, low neutral tone. The signature rhythm of an experiential past sentence.',
      'word',
      '我去过北京 wǒ qù guo Běijīng (I have been to Beijing)',
      'Compare with the wrong-tone reading 我去过 wǒ qù guò — that would sound like "I passed through" instead of "I have been".',
      null,
      [ACT.pronunciation],
    ),
    createContentItem(
      '没去 (méi qù)',
      'méi qù',
      'A rising second tone (méi) followed by a sharp falling fourth tone (qù). The contour rises then drops decisively — a clear "didn\'t go" gesture. No 了 attached, because past negation drops 了 entirely.',
      'word',
      '我昨天没去图书馆 wǒ zuótiān méi qù túshūguǎn (I didn\'t go to the library yesterday)',
      'Keep the rise on 没 clean and audible; a flat 没 sounds like a tone error and confuses listeners.',
      null,
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Activity verbs
    // ────────────────────────────────────────────────────────────────────
    createContentItem('去', 'qù', 'The all-purpose verb "to go". Almost always paired with a destination noun: 去学校 (go to school), 去北京 (go to Beijing). One of the highest-frequency verbs in Mandarin and the backbone of past-trip sentences.', 'word', '上个周末我去了天安门。', 'A typical past-trip sentence; 天安门 (Tiān\'ānmén) is Tiananmen Square — a standard Beijing day-trip.', null, [ACT.vocabularyActivities]),
    createContentItem('看', 'kàn', '"To see / to watch / to read" depending on the object. 看电影 (watch a movie), 看书 (read a book), 看朋友 (visit a friend). Combines flexibly with most types of objects.', 'word', '我看了一部中国电影。', '"I watched a Chinese movie" — 一部 (yí bù) is the measure word for films.', null, [ACT.vocabularyActivities]),
    createContentItem('吃', 'chī', '"To eat". Often used in the verb-object compound 吃饭 (chī fàn, literally "eat rice / eat a meal") to mean "have a meal" in general. 吃 + specific food is also common: 吃火锅 (eat hotpot).', 'word', '我们昨天吃了火锅。', '"We ate hotpot yesterday" — 火锅 (huǒguō, hotpot) is one of China\'s most beloved social dining formats.', null, [ACT.vocabularyActivities]),
    createContentItem('玩', 'wán', '"To play / to hang out / to have fun". Much broader than English "play" — includes adult social activities, trips, and casual outings: 跟朋友玩 (hang out with friends), 去公园玩 (go play / hang out at the park).', 'word', '我跟同学玩了一下午。', '"I hung out with classmates all afternoon" — 一下午 (yí xiàwǔ) means "a whole afternoon".', null, [ACT.vocabularyActivities]),
    createContentItem('爬山', 'pá shān', 'Verb-object compound meaning "to climb mountains / to hike". A widely loved Chinese weekend activity, especially around Beijing (香山, 长城) and Sichuan (峨眉山). Note that 了 slots BETWEEN 爬 and 山: 爬了山.', 'word', '我们上个周末爬了香山。', '"We climbed Fragrant Hills last weekend" — 香山 (Xiāngshān, Fragrant Hills) is a popular Beijing hiking spot, famous for red autumn leaves.', null, [ACT.vocabularyActivities]),
    createContentItem('旅游', 'lǚyóu', '"To travel / to take a trip". Used for vacations or sightseeing trips beyond a single day. Compare 旅行 (lǚxíng, also "travel") — 旅游 has more of a "tourist / leisure" feel; 旅行 sounds more neutral or business.', 'word', '我去年去日本旅游了。', '"I traveled to Japan last year" — typical past-trip sentence with country + 旅游 + sentence-final 了.', null, [ACT.vocabularyActivities]),
    createContentItem('做饭', 'zuò fàn', 'Verb-object compound "to cook (a meal)". Literally "make rice / make food". For "cook a specific dish", use 做 + dish name: 做了一个菜 (cooked a dish).', 'word', '我妈妈昨天做了红烧肉。', '"My mom made red-braised pork yesterday" — 红烧肉 (hóngshāo ròu) is a classic Chinese home dish.', null, [ACT.vocabularyActivities]),
    createContentItem('打扫', 'dǎsǎo', '"To clean / to tidy up" — typically a room or living space. 打扫房间 (clean the room) is the canonical pairing. More physical/thorough than 收拾 (shōushi, "tidy up").', 'word', '周六我打扫了房间。', '"Saturday I cleaned my room" — typical weekend chore sentence.', null, [ACT.vocabularyActivities]),
    createContentItem('休息', 'xiūxi', '"To rest / to take a break". Used for breaks during the day (休息一下 "take a little break") and full rest days (在家休息 "rest at home"). The second syllable is neutral tone.', 'word', '我昨天在家休息了一天。', '"I rested at home all day yesterday" — 一天 (yì tiān) covers the full day; 在家 marks the location.', null, [ACT.vocabularyActivities]),
    createContentItem('拍照', 'pāi zhào', 'Verb-object compound "to take photos / to take a picture". 拍 = "to take/shoot", 照 = short for 照片 (zhàopiàn, photo). Slightly more idiomatic than 拍照片. The phrase 拍了很多照片 ("took lots of photos") shows up in nearly every trip recap.', 'word', '我们在长城拍了很多照片。', '"We took lots of photos at the Great Wall" — a near-cliché Beijing-trip sentence.', null, [ACT.vocabularyActivities]),
    createContentItem('骑自行车', 'qí zìxíngchē', 'Verb-object phrase "to ride a bicycle". 骑 is the verb for straddle-style riding (bike, horse, motorcycle); 坐 (zuò) is used for sit-down vehicles (car, bus, train).', 'word', '周末我骑自行车去了公园。', '"On the weekend I cycled to the park" — bikes are a staple of Beijing student life, especially around Tsinghua.', null, [ACT.vocabularyActivities]),
    createContentItem('购物 / 买东西', 'gòuwù / mǎi dōngxi', 'Two ways to say "go shopping". 购物 (gòuwù) is more formal/written; 买东西 (mǎi dōngxi, literally "buy things") is the everyday spoken form. Both work in past-recap contexts.', 'word', '我跟妈妈去买东西了。', '"I went shopping with my mom" — colloquial form; the sentence-final 了 signals a completed outing.', null, [ACT.vocabularyActivities]),
    createContentItem('见朋友', 'jiàn péngyou', 'Verb-object phrase "to meet/see a friend". 见 here is for arranged meetings or visits, not a chance encounter (which would be 碰到, pèngdào). Common pairing for weekend recaps.', 'word', '上个周末我见了一个老朋友。', '"Last weekend I met an old friend" — 老朋友 (lǎo péngyou) means "old friend / longtime friend".', null, [ACT.vocabularyActivities]),
    createContentItem('学习', 'xuéxí', '"To study / to learn". Often used both as a verb (我学习中文) and as a noun (我的学习, my studies). For specific subjects, 学 alone is also fine: 学中文 (study Chinese).', 'word', '我周末学习了三个小时。', '"I studied for three hours on the weekend" — duration phrase (三个小时) comes AFTER the verb.', null, [ACT.vocabularyActivities]),
    createContentItem('喝', 'hē', '"To drink". Pairs with 茶 (chá, tea), 咖啡 (kāfēi, coffee), 酒 (jiǔ, alcohol), 水 (shuǐ, water). 喝茶 (drink tea) doubles as a casual social outing — "let\'s go drink tea" = "let\'s catch up".', 'word', '昨天晚上我们喝了一些茶。', '"Last night we had some tea" — a typical Mainland casual-gathering recap; tea-drinking is a major social ritual.', null, [ACT.vocabularyActivities]),
    createContentItem('开车', 'kāi chē', 'Verb-object compound "to drive a car". 开 (kāi, "open / operate") + 车 (chē, vehicle). Note that 了 slots between 开 and 车: 开了车. Compare 坐车 (zuò chē, "ride [as a passenger]").', 'word', '上个月我开车去了天津。', '"Last month I drove to Tianjin" — a common weekend road-trip from Beijing; Tianjin is about 2 hours away.', null, [ACT.vocabularyActivities]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Past-time markers
    // ────────────────────────────────────────────────────────────────────
    createContentItem('昨天', 'zuótiān', '"Yesterday". The most common past-time marker; appears in nearly every past sentence about recent activity. Placed BEFORE the verb (我昨天去了, not 我去了昨天).', 'word', '昨天我去了图书馆。', '"Yesterday I went to the library" — time word at sentence start anchors the past meaning immediately.', null, [ACT.vocabularyTime]),
    createContentItem('前天', 'qiántiān', '"The day before yesterday". Built from 前 (front/before) + 天 (day). Parallels 后天 (hòutiān, "the day after tomorrow"). Used the same way as 昨天 in sentence position.', 'word', '前天我们考了一个试。', '"The day before yesterday we took an exam" — 考试 (kǎoshì) splits to take 了: 考了一个试.', null, [ACT.vocabularyTime]),
    createContentItem('上星期', 'shàng xīngqī', '"Last week". 上 (shàng, literally "upper / previous") is the standard marker for "previous" with time units: 上星期 (last week), 上个月 (last month), 上个周末 (last weekend). 星期 (xīngqī) can also be written 周 (zhōu): 上周 is equally common.', 'word', '上星期我去了上海。', '"Last week I went to Shanghai" — the time word at sentence start clearly anchors the past.', null, [ACT.vocabularyTime]),
    createContentItem('上个周末', 'shàng ge zhōumò', '"Last weekend". 个 (ge) is a measure word inserted between 上 and 周末. Compare the parallel form: 这个周末 (this weekend), 下个周末 (next weekend). Essential vocabulary for Monday-morning recaps.', 'word', '上个周末你做了什么?', '"What did you do last weekend?" — the canonical Monday-morning ice-breaker.', null, [ACT.vocabularyTime]),
    createContentItem('上个月', 'shàng ge yuè', '"Last month". 个 measure word + 月 (month). The 上 + 个 + time-unit pattern is consistent and predictable across many time expressions.', 'word', '上个月我去香港旅游了。', '"Last month I traveled to Hong Kong" — typical past-trip sentence using a month-scale time word.', null, [ACT.vocabularyTime]),
    createContentItem('去年', 'qùnián', '"Last year". Built from 去 (gone / past) + 年 (year). Note: NO 个 measure word here — 去年 stands alone, unlike 上个月. The matched pair is 明年 (míngnián, "next year").', 'word', '我去年开始学中文。', '"I started learning Chinese last year" — pure time word + verb construction.', null, [ACT.vocabularyTime]),
    createContentItem('那天', 'nà tiān', '"That day" — refers back to a specific day already mentioned in the conversation, like English "the other day" or "on that occasion". Used to continue a past narrative without repeating a specific date.', 'word', '那天天气特别好，我们就出去玩了。', '"The weather was especially nice that day, so we went out to hang out" — narrative continuation marker.', null, [ACT.vocabularyTime]),
    createContentItem('刚才', 'gāngcái', '"Just now / a moment ago" — refers to a very recent past, usually minutes or up to an hour ago. Distinct from 刚 (gāng, "just" as an adverb directly before a verb). 刚才 is a time word; 刚 is an adverb.', 'word', '刚才我接了一个电话。', '"I took a call just now" — 接电话 (jiē diànhuà) splits to take 了: 接了一个电话.', null, [ACT.vocabularyTime]),
    createContentItem('以前', 'yǐqián', '"Before / in the past / used to" — refers to an unspecified past time, often used for habits or general background ("I used to live in Beijing"). Pairs well with 过 sentences about life experience.', 'word', '我以前住过北京。', '"I lived in Beijing before / at some point" — 以前 + V + 过 is a natural pairing for life-stage background.', null, [ACT.vocabularyTime]),
    createContentItem('小时候', 'xiǎo shíhou', '"When [I was] little / in childhood" — anchors a sentence to the speaker\'s early life. Almost always paired with 过 or general-past statements about formative experiences.', 'word', '我小时候去过北京一次。', '"I went to Beijing once when I was little" — typical "earliest memory" sentence; 一次 = "one time".', null, [ACT.vocabularyTime]),
    createContentItem('那时候', 'nà shíhou', '"At that time / back then" — points back to a previously established past period. Distinct from 那天 (that day) by scale: 那天 = one specific day; 那时候 = a broader past period (a year, a phase of life).', 'word', '那时候我还没来中国。', '"At that time I hadn\'t come to China yet" — narrative anchor for sequencing two past events.', null, [ACT.vocabularyTime]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: V + 了
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'V + 了 — completed action',
      'V + le',
      'The aspect marker 了 (le, neutral tone) attached directly after a verb signals that the action has been COMPLETED. Position: V + 了 + object. Example: 我吃了饭 ("I ate / I have eaten"). 了 here is verb-final, not sentence-final.',
      'sentence',
      '我吃了饭。 (I ate.)\n我看了电影。 (I watched a movie.)\n我们去了北京。 (We went to Beijing.)',
      'The most basic past sentence in Mandarin; the verb stays unchanged, 了 does all the work.',
      [
        { target: 'V + 了 + O', note: 'standard word order; 了 sits between verb and object' },
        { target: '吃 + 了 + 饭', note: '"ate a meal" — completed eating action' },
        { target: '看 + 了 + 电影', note: '"watched a movie" — completed viewing action' },
        { target: '去 + 了 + 北京', note: '"went to Beijing" — completed trip action' },
      ],
      [ACT.grammarLe],
    ),
    createContentItem(
      'Sentence-final 了 — change of state',
      'sentence-final le',
      'When 了 appears at the END of the sentence (not directly after the verb), it marks a change of state or that a whole situation has come about / become complete. 我吃饭了 means "I have eaten now / I\'m done eating now" — softer and more contextual than the verb-final 我吃了饭.',
      'sentence',
      '我吃饭了。 (I\'ve eaten now / I\'m done eating.)\n下雨了。 (It\'s started raining.)\n我累了。 (I\'m tired now.)',
      'Sentence-final 了 often translates as "now" — it signals that a NEW situation has come about.',
      [
        { target: '我吃饭了 vs 我吃了饭', note: 'first: "I have eaten (situational)"; second: "I ate (specific completed action)" — subtle but real difference' },
        { target: '下雨了', note: '"It\'s started raining" — change of state; new situation' },
        { target: '我累了', note: '"I\'m tired now" — change of state from not-tired to tired' },
      ],
      [ACT.grammarLe],
    ),
    createContentItem(
      'V + O + 了 with specific objects',
      'V + specific O + le',
      'When the object is specific or quantified (我吃了三碗饭, "I ate three bowls of rice"), use verb-final 了 + the quantified object. When the object is general (我吃饭了, "I have eaten"), the sentence-final 了 form is more natural. Quantifier + measure word forces the verb-final 了 placement.',
      'sentence',
      '我喝了三杯咖啡。 (I drank three cups of coffee.)\n我看了一部电影。 (I watched a movie.)\n我买了两本书。 (I bought two books.)',
      'When you have a number + measure word, you almost always need the verb-final 了 pattern.',
      [
        { target: 'V + 了 + Num + MW + Noun', note: 'standard pattern with quantified object' },
        { target: '三杯咖啡 sān bēi kāfēi', note: '"three cups of coffee" — 杯 is the measure word for cups' },
        { target: '一部电影 yí bù diànyǐng', note: '"one movie" — 部 is the measure word for films' },
        { target: '两本书 liǎng běn shū', note: '"two books" — 本 is the measure word for books; 两 (not 二) before measure words' },
      ],
      [ACT.grammarLe],
    ),
    createContentItem(
      'Double 了 — continuing relevance',
      'V + le + duration + le',
      'The double-了 pattern (V + 了 + duration + 了) signals that an action has been ongoing AND is still relevant at the moment of speaking. 我学了三年中文了 = "I have been studying Chinese for three years (and I still am / it still matters now)". Without the second 了, it just means "I studied for three years (and stopped)".',
      'sentence',
      '我学了三年中文了。 (I have been studying Chinese for 3 years now.)\n我们认识十年了。 (We have known each other for 10 years.)',
      'The trailing 了 carries the "and it continues / is still true" meaning.',
      [
        { target: '我学了三年中文 (single 了)', note: '"I studied Chinese for three years" — completed; may or may not still be true' },
        { target: '我学了三年中文了 (double 了)', note: '"I have been studying Chinese for three years now" — still ongoing or still relevant' },
      ],
      [ACT.grammarLe],
    ),
    createContentItem(
      'V 了 吗? — yes/no past question',
      'V le ma?',
      'To form a yes/no question about a past action, append the question particle 吗 to a V + 了 sentence: 你吃了吗? ("Have you eaten?"). Answer affirmatively with 吃了 ("[Yes,] ate"); negatively with 没吃 ("Didn\'t eat" — note 没, no 了).',
      'sentence',
      'Q: 你吃了吗? (Have you eaten?)\nA+: 吃了。 (Yes, I ate.)\nA-: 还没吃。 (Not yet.) / 没吃。 (I didn\'t eat.)',
      '你吃了吗? is also a casual greeting around meal times, like "have you eaten?" as a polite check-in.',
      [
        { target: '你吃了吗?', note: 'Have you eaten? — common greeting around meal times' },
        { target: '吃了 (positive)', note: 'short affirmative; just verb + 了' },
        { target: '没吃 (negative)', note: 'short negative; 没 + verb, NO 了' },
        { target: '还没吃 (not yet)', note: '还没 (hái méi) = "not yet"; softer than just 没' },
      ],
      [ACT.grammarLe],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: V + 过
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'V + 过 — experiential aspect',
      'V + guo',
      'The aspect marker 过 (guo, neutral tone) after a verb indicates that the speaker has the EXPERIENCE of doing the action at least once in their life. 我去过北京 = "I have been to Beijing [at some point]". The English equivalent is often "have ever V-ed" or "have V-ed before".',
      'sentence',
      '我去过北京。 (I have been to Beijing.)\n我吃过北京烤鸭。 (I have eaten Peking duck.)\n他看过这部电影。 (He has seen this movie.)',
      'Use 过 when the focus is on life experience, not on a specific completed event.',
      [
        { target: 'V + 过 + O', note: 'standard word order; 过 sits between verb and object, just like 了' },
        { target: '去过 北京', note: '"have been to Beijing" — at some unspecified point in life' },
        { target: '吃过 北京烤鸭', note: '"have eaten Peking duck" — at least once in life' },
        { target: '看过 这部电影', note: '"have seen this movie" — at least once before' },
      ],
      [ACT.grammarGuo],
    ),
    createContentItem(
      '了 vs 过 — the key contrast',
      'le vs guo',
      'CRITICAL distinction: 了 marks a SPECIFIC completed action (often with a time anchor); 过 marks a LIFE EXPERIENCE (often unanchored in time). 我昨天吃了北京烤鸭 = "I ate Peking duck yesterday [specific event]". 我吃过北京烤鸭 = "I have eaten Peking duck [at some point in life]". The two are NOT interchangeable.',
      'sentence',
      '我昨天吃了北京烤鸭。 (I ate Peking duck yesterday — specific event)\n我吃过北京烤鸭。 (I have eaten Peking duck — life experience)',
      'A specific time word (昨天, 上个月) almost always means 了, not 过.',
      [
        { target: '了 → specific completed event', note: 'usually pairs with a specific time word; focus on what happened on that occasion' },
        { target: '过 → life experience', note: 'usually no specific time; focus on whether the experience has ever happened' },
      ],
      [ACT.grammarGuo],
    ),
    createContentItem(
      'V 过 吗? — yes/no experience question',
      'V guo ma?',
      'To ask whether someone has ever done something, append 吗 to a V + 过 sentence: 你去过中国吗? ("Have you ever been to China?"). Answer affirmatively with 去过 ("Yes, I have"); negatively with 没去过 ("No, I haven\'t" — 过 STAYS in the negative, unlike 了 which drops).',
      'sentence',
      'Q: 你去过中国吗? (Have you ever been to China?)\nA+: 去过。 (Yes, I have.)\nA-: 没去过。 (No, I haven\'t.)',
      'Notice that 过 is kept in the negative answer (没去过), unlike 了 which is dropped (没吃, not 没吃了).',
      [
        { target: '你去过中国吗?', note: '"Have you ever been to China?" — life-experience question' },
        { target: '去过 (positive short)', note: 'short affirmative; verb + 过' },
        { target: '没去过 (negative short)', note: '没 + V + 过; 过 stays' },
      ],
      [ACT.grammarGuo],
    ),
    createContentItem(
      'V-没-V 过 — alternative question',
      'V-méi-V guo',
      'An alternative way to ask the same question without 吗: repeat the verb with 没 in the middle, then add 过. 你去没去过中国? = "Have you been to China or not?". Slightly more colloquial and slightly more emphatic than the 吗 form.',
      'sentence',
      'Q: 你去没去过北京? (Have you ever been to Beijing?)\nQ: 你吃没吃过火锅? (Have you ever eaten hotpot?)',
      'This V-没-V pattern works for both 了 and 过 questions; just slot 没 between the two copies of the verb.',
      [
        { target: '你去没去过北京?', note: '"Have you been to Beijing or not?" — alternative-question form, equivalent in meaning to 你去过北京吗?' },
        { target: '你吃没吃过火锅?', note: '"Have you ever eaten hotpot?" — same pattern with a different verb' },
      ],
      [ACT.grammarGuo],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 没 negation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '没 + V — past negation',
      'méi + V',
      'To negate a past action, place 没 (méi) or 没有 (méiyǒu) directly BEFORE the verb. CRITICAL: when you negate with 没, you DROP the 了 entirely. 我没吃 ("I didn\'t eat / I haven\'t eaten") — NEVER 我没吃了.',
      'sentence',
      '我没吃。 (I didn\'t eat.)\n我没去图书馆。 (I didn\'t go to the library.)\n他没看那部电影。 (He didn\'t watch that movie.)',
      'The single most common past-negation mistake: keeping the 了. Drop it always with 没.',
      [
        { target: 'POSITIVE: V + 了', note: '我吃了 (I ate)' },
        { target: 'NEGATIVE: 没 + V (no 了!)', note: '我没吃 (I didn\'t eat) — drop the 了' },
        { target: '没 vs 没有', note: 'interchangeable; 没有 is slightly more formal/emphatic, 没 is shorter and more colloquial' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      '不 vs 没 — habitual vs past',
      'bù vs méi',
      'CRITICAL contrast: 不 = general / present / future / habitual negation. 没 = past-completed and existential negation. 我不吃肉 = "I don\'t eat meat [in general / habitually]". 我没吃肉 = "I didn\'t eat meat [this past occasion]". Mixing these up is the most common past-tense error for English speakers.',
      'sentence',
      '我不吃肉。 (I don\'t eat meat — habit.)\n我没吃肉。 (I didn\'t eat meat — past.)\n我不去。 (I won\'t go / I don\'t go.)\n我没去。 (I didn\'t go.)',
      'Rule of thumb: if the time reference is past, use 没. For habitual, future, or unwilling, use 不.',
      [
        { target: '不 + V', note: 'habitual / present / future negation; 不吃 (don\'t eat), 不去 (won\'t go)' },
        { target: '没 + V', note: 'past / completed negation; 没吃 (didn\'t eat), 没去 (didn\'t go)' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      '没 + V + 过 — never done',
      'méi + V + guo',
      'For experiential 过 sentences, the negation pattern is 没 + V + 过 — and the 过 STAYS (unlike 了 which drops). 我没去过北京 = "I have never been to Beijing". This says you have zero life experience of the action.',
      'sentence',
      '我没去过北京。 (I have never been to Beijing.)\n他没吃过火锅。 (He has never eaten hotpot.)\n我们没看过这部电影。 (We have never seen this movie.)',
      '过 stays because it marks experience (which is being negated), not completion (which 了 marks).',
      [
        { target: 'POSITIVE: V + 过', note: '我去过北京 (I have been to Beijing)' },
        { target: 'NEGATIVE: 没 + V + 过 (keep 过!)', note: '我没去过北京 (I have never been to Beijing) — 过 stays' },
        { target: 'Contrast 了 vs 过 negation', note: '没 + V (drop 了); 没 + V + 过 (keep 过) — the asymmetry trips up many learners' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      '还没 — not yet',
      'hái méi',
      '还 (hái, "still") + 没 = "not yet" — implies the action hasn\'t happened YET but might still happen. 我还没吃饭 = "I haven\'t eaten yet [but I will]". Softer and more open than plain 没吃, which sounds final.',
      'sentence',
      '我还没吃饭。 (I haven\'t eaten yet.)\n他还没回来。 (He hasn\'t come back yet.)\n我还没去过长城。 (I haven\'t been to the Great Wall yet — but plan to.)',
      '还没 implies expectation that the action will eventually happen; plain 没 doesn\'t.',
      [
        { target: '我没吃 vs 我还没吃', note: 'first: "didn\'t eat" (final); second: "haven\'t eaten yet" (open, may still happen)' },
        { target: '还没 + V + 过', note: '"haven\'t ever … yet" — used when the experience is on the bucket list' },
      ],
      [ACT.grammarNegation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '我的周末 — 清华学生的故事',
      'wǒ de zhōumò — Qīnghuá xuéshēng de gùshi',
      'A complete six-sentence past-tense paragraph by a Tsinghua student recapping last weekend. Read it aloud with correct tones and natural neutral-tone 了 / 过. Notice the rhythm: most sentences open with a time word, then verb + 了 + object.',
      'sentence',
      '上个周末我过得很开心。星期六早上我跟室友去了颐和园，我们在那里拍了很多照片。中午我们在附近的餐厅吃了北京烤鸭，我以前没吃过，特别好吃。下午回到清华，我休息了一会儿。星期天我在宿舍学习了一天，没出去玩。这是我来北京以后最好的一个周末。',
      'Translation: "I had a really happy time last weekend. Saturday morning I went to the Summer Palace with my roommate, and we took lots of photos there. At noon we ate Peking duck at a nearby restaurant; I had never eaten it before, and it was especially delicious. In the afternoon we went back to Tsinghua, and I rested for a while. Sunday I studied in the dorm all day and didn\'t go out. This was the best weekend I\'ve had since coming to Beijing."',
      [
        { target: '上个周末我过得很开心', note: 'opening summary sentence; 过得 (guò de) here is the 4th-tone verb "to spend [time]" + complement marker' },
        { target: '跟室友去了颐和园', note: '"went to the Summer Palace with my roommate" — companion phrase + verb-了 + destination' },
        { target: '拍了很多照片', note: '"took lots of photos" — quantified object forces verb-final 了' },
        { target: '我以前没吃过，特别好吃', note: '"I had never eaten it before, [and it was] especially delicious" — 以前 + 没 + V + 过 = the "never before" pattern' },
        { target: '我休息了一会儿', note: '"I rested for a while" — duration phrase 一会儿 (yíhuìr) after the verb' },
        { target: '没出去玩', note: '"didn\'t go out to hang out" — past negation with 没, no 了 attached' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions matching the paragraph. Answer each in one short past sentence using 了, 过, or 没 as appropriate — full sentences are not required for natural Mandarin.',
      'sentence',
      'Q1: 他星期六去了哪里? Q2: 他跟谁一起去? Q3: 他以前吃过北京烤鸭吗? Q4: 他星期天做了什么?',
      'Two location questions, one experience question, one general activity question — covering all three past markers (了, 过, 没).',
      [
        { target: 'A1: 他去了颐和园。', note: 'destination answer using V + 了 + place' },
        { target: 'A2: 他跟室友一起去。', note: 'companion answer; no aspect marker needed since the time is already established' },
        { target: 'A3: 没吃过。 / 他以前没吃过。', note: 'short negative experience answer; 没 + V + 过, 过 stays' },
        { target: 'A4: 他在宿舍学习了一天，没出去玩。', note: 'full past sentence: positive 了 + negative 没 in one breath' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '周一早上 (对话)',
      'zhōu yī zǎoshang (duìhuà)',
      'A natural Monday-morning conversation between two Tsinghua students at the canteen. Covers V + 了, V + 过, 没 + V, and the past-time markers from this lesson. Casual peer register.',
      'conversation',
      'A: 早! 你周末做了什么?\nB: 我跟朋友去爬山了，去了香山。你呢?\nA: 我没出去，在宿舍休息了两天。你们爬山累不累?\nB: 有一点累，但是看到了红叶，特别漂亮。你去过香山吗?\nA: 没去过。我才来北京两个月。\nB: 那下个周末我们一起去! 我再去一次也行。\nA: 太好了，那就这么定了!',
      'A typical Monday-morning canteen exchange between Tsinghua peers; uses every past pattern from this lesson naturally.',
      [
        { target: '你周末做了什么?', note: '"What did you do on the weekend?" — the canonical Monday-morning question' },
        { target: '我跟朋友去爬山了', note: 'sentence-final 了 marking a completed weekend outing; companion phrase 跟朋友' },
        { target: '在宿舍休息了两天', note: '"rested in the dorm for two days" — duration after the verb' },
        { target: '你去过香山吗?', note: 'V + 过 + 吗? — life-experience question' },
        { target: '没去过', note: '"haven\'t been [there]" — short past-experience negative; 过 stays' },
        { target: '我再去一次也行', note: '"I\'m happy to go again" — 再 (zài, "again") + 也行 (yě xíng, "is also fine")' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '黄金周 (对话 — 假期回顾)',
      'huángjīnzhōu (duìhuà — jiàqī huígù)',
      'A post-holiday conversation between two Tsinghua students after the October 国庆 (National Day) golden week. Layers in trip vocabulary, multiple past sentences, and the experiential 过 for life experiences.',
      'conversation',
      'A: 国庆怎么样? 你回家了吗?\nB: 没回家，太远了。我跟同学一起去了西安。\nA: 西安! 我也没去过。怎么样?\nB: 特别好玩。我们爬了华山，吃了很多小吃，还看了兵马俑。你呢? 你做了什么?\nA: 我在北京待着，去了长城和故宫。我以前没去过长城，这次终于去了。\nB: 长城真的很壮观，对吧?\nA: 对，照片都拍了好几百张。',
      'A typical post-golden-week recap; combines specific events (V+了) and life experiences (V+过) in a natural rhythm.',
      [
        { target: '国庆 Guóqìng', note: 'National Day, October 1st; the start of one of the two 黄金周 (golden weeks)' },
        { target: '我跟同学一起去了西安', note: '"I went to Xi\'an with classmates" — companion + V+了 + destination' },
        { target: '我也没去过', note: '"I haven\'t been there either" — quick experience negative' },
        { target: '爬了华山', note: '"climbed Mount Hua" — verb-final 了 with proper noun object' },
        { target: '我以前没去过长城，这次终于去了', note: 'experience-then-completion pattern: 没…过 (had never) → 终于…了 (finally did) — a common storytelling rhythm' },
        { target: '照片都拍了好几百张', note: '"took several hundred photos" — 好几百 (hǎo jǐ bǎi) = "a good several hundred"; 张 is the measure word for photos' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable five-sentence template for any Mandarin weekend recap. Fill the bracketed slots with your own information — the structure carries the rest. Each sentence opens with a time word for clear past anchoring.',
      'sentence',
      '上个周末我[做了什么]。[星期几]我跟[谁]一起[动词]+了[宾语]，我们在[地方]+[动词]+了+[宾语]。[星期几]我[动词]+了，但是没[动词]。我以前没[动词]+过+[宾语]，这次终于[动词]+了。这个周末我过得[形容词]。',
      'Five sentences cover: summary + Saturday narrative + Sunday narrative + one life experience + closing feeling — the minimum complete weekend recap.',
      [
        { target: '[做了什么]', note: 'opening summary; e.g., 过得很好 (had a good time), 很忙 (was busy), 玩得很开心 (had fun)' },
        { target: '[星期几]', note: 'time word: 星期六 (Saturday), 星期天 (Sunday), 周六 (Sat. short form)' },
        { target: '[谁]', note: 'companion: 朋友 (friend), 同学 (classmate), 室友 (roommate), 家人 (family)' },
        { target: '[动词]+了+[宾语]', note: 'V + 了 + object — main past pattern; choose from Vocabulary I verbs' },
        { target: '我以前没[动词]+过', note: 'optional life-experience slot using 没 + V + 过 = "had never V-ed before"' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 4–6 sentence weekend diary in Hanzi using the template. Use at least two verbs with 了, one with 过 (a life experience layered in), and one negation with 没. Anchor each sentence with a time word for clarity.',
      'sentence',
      '示例: 上个周末我过得很好。星期六早上我跟朋友去了颐和园，下午我们在那里吃了烤鸭。我以前没吃过烤鸭，特别好吃! 星期天我在清华学习了一天，没出去玩。',
      'Translation: "I had a good weekend last week. Saturday morning I went to the Summer Palace with a friend; in the afternoon we ate roast duck there. I had never eaten roast duck before — it was especially delicious! Sunday I studied at Tsinghua all day and didn\'t go out."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '周末家庭时间',
      'zhōumò jiātíng shíjiān',
      'Chinese weekends are heavily oriented toward FAMILY. Multi-generational meals on Saturday or Sunday, visits to grandparents, and trips to local parks are the default rhythm in many Mainland families. 串门 (chuànmén) — unannounced visits to family and close friends — remains common in smaller cities, though less so in big metropolises like Beijing.',
      'sentence',
      '上个周末我回家跟父母吃了饭，还去看了奶奶。',
      '"Last weekend I went home, ate with my parents, and went to see my grandmother" — a typical Mainland weekend recap that places family at the center.',
      [
        { target: '周末家庭时间', note: 'weekend family time; the default Saturday-Sunday rhythm in most Mainland homes' },
        { target: '串门 chuànmén', note: 'unannounced visits to family or close friends; common in smaller cities, declining in big metropolises' },
        { target: '回家看父母', note: '"go home to see [your] parents" — a frequent weekend phrase from students and young professionals' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '黄金周',
      'huángjīnzhōu',
      'The "golden weeks" — week-long national holidays around 国庆 (October 1st, National Day) and 春节 (Spring Festival, Lunar New Year). The whole country travels at once: trains book out months ahead, tourist sites are packed, and 朋友圈 fills with vacation photos. Weekend talk after a 黄金周 is dominated by 我去了…了 (where I went) stories.',
      'sentence',
      '国庆我去了西安，看了兵马俑。',
      '"For National Day I went to Xi\'an and saw the Terracotta Warriors" — a textbook 黄金周 recap sentence; 兵马俑 (bīngmǎyǒng) = Terracotta Warriors.',
      [
        { target: '国庆 (Oct 1)', note: 'National Day; the start of the autumn 黄金周' },
        { target: '春节', note: 'Spring Festival / Lunar New Year; the most important Chinese holiday, also a 黄金周' },
        { target: '春运 chūnyùn', note: 'the massive transportation rush around Spring Festival; one of the largest annual human migrations in the world' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '朋友圈',
      'péngyǒuquān',
      'The "Moments" feed on WeChat — China\'s dominant social platform. Sharing photos of past trips, restaurant meals, and weekend outings on 朋友圈 is the default way to tell friends what you did. Talking about 上个周末 in real life is often a follow-up to a 朋友圈 post: "I saw your 朋友圈 — that trip looked amazing!".',
      'sentence',
      '我看了你的朋友圈! 你周末去了哪儿?',
      '"I saw your Moments! Where did you go on the weekend?" — a typical conversation opener that combines digital and offline sharing.',
      [
        { target: '朋友圈 péngyǒuquān', note: 'WeChat "Moments"; the dominant photo-sharing feed in Mainland China' },
        { target: '发朋友圈 fā péngyǒuquān', note: '"to post on Moments"; verb-object phrase' },
        { target: '点赞 diǎn zàn', note: '"to like" a post; literally "point praise"' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 跟同学聊周末',
      'rènwù: gēn tóngxué liáo zhōumò',
      'Roleplay a Monday-morning chat at the Tsinghua canteen with the tutor playing a classmate from Beijing. Use every skill from this lesson: time words, V + 了, V + 过, and 没 + V — in one continuous scene.',
      'conversation',
      '[Tsinghua canteen, Monday morning]\n同学: 早! 你周末做了什么?\n你: [打招呼 + 用了的过去句]\n同学: 听起来不错! 你跟谁去的?\n你: [companion + 我跟…一起去的]\n同学: 你以前去过那里吗?\n你: [用过的经验句 + 或 没去过 + 加细节]\n同学: 那你今天累不累?\n你: [回答 + 加一个否定句 没…]\n同学: 下个周末有什么计划?\n你: [告别 + 提一个未来计划]',
      'Six turns of fluent exchange; the tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: '打招呼', note: '早 / 早上好 / 你好 — match the morning canteen register' },
        { target: '了的过去句', note: 'V + 了 + 宾语 + 时间词 — your main past recap sentence' },
        { target: 'companion', note: '我跟…一起 — 朋友 / 同学 / 室友 / 家人' },
        { target: '过的经验句', note: 'V + 过 to share a related life experience; or 没 + V + 过 for "first time"' },
        { target: '没 + V 的否定句', note: 'one negative past sentence — drop 了 with 没!' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 学期回顾',
      'tiǎozhàn — xuéqī huígù',
      'Stretch goal: at the end of the conversation, the classmate asks about your whole semester at Tsinghua so far. Combine multiple 过 sentences (life experiences gained this semester) with multiple 了 sentences (specific things you did) into a 4-sentence retrospective.',
      'conversation',
      '同学: 你来清华一个学期了，感觉怎么样?\n你: 我学了很多东西，认识了很多新朋友。我以前没说过这么多中文，现在每天都说。我去过长城、故宫，还去了好几个北京的公园。这个学期对我来说特别重要。',
      'Sample answer combining four past-marker patterns: V+了+很多 (learned/met a lot), 没…过…现在 (never before … now), 去过 (life experiences as places visited), and a closing sentence-final 了 / 是 sentence.',
      [
        { target: '我学了很多东西', note: 'V + 了 + quantified object; "learned many things"' },
        { target: '认识了很多新朋友', note: 'V + 了 + quantified object; "got to know many new friends"' },
        { target: '我以前没说过这么多中文', note: '没 + V + 过 = "had never spoken this much Chinese before"; a classic experience-contrast structure' },
        { target: '现在每天都说', note: '"now [I] speak [it] every day" — present contrast to the past 没说过' },
        { target: '我去过长城、故宫', note: 'V + 过 + list of places — life experiences gained' },
        { target: '这个学期对我来说特别重要', note: 'closing summary sentence; 对…来说 = "for/to me"' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
