// Level 1 Unit 11 — Scheduling & Appointments (Mandarin Chinese)
// Functions: proposing plans, asking availability, confirming, declining
// politely with face-saving language, rescheduling, and pinning down a
// meeting time + place using 微信 (WeChat) as the dominant tool.
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
  orientation: 'zh-l1u11-orientation',
  pronunciation: 'zh-l1u11-pronunciation',
  vocabularyScheduling: 'zh-l1u11-vocab-scheduling',
  vocabularyResponses: 'zh-l1u11-vocab-responses',
  grammarPropose: 'zh-l1u11-grammar-propose',
  grammarTogether: 'zh-l1u11-grammar-together',
  grammarAspect: 'zh-l1u11-grammar-aspect',
  reading: 'zh-l1u11-reading',
  listening: 'zh-l1u11-listening',
  writing: 'zh-l1u11-writing',
  culture: 'zh-l1u11-culture',
  task: 'zh-l1u11-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Propose a plan to meet someone using 想 / 要 + verb and confirm with 怎么样? — the standard Mandarin invitation pattern.',
      'Accept or politely decline an invitation using face-saving language (好的 / 没问题 vs 不好意思 + a vague excuse like 那天我有事).',
      'Reschedule by canceling (取消), changing (改), postponing (推迟), or moving earlier (提前) — the four verbs that cover almost every schedule shift.',
    ],
    task: 'Picture a study session at the Tsinghua library: a classmate messages you on 微信 asking if you can study together Saturday. You accept, then later something comes up and you need to reschedule politely without losing face.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in scheduling vocabulary',
    goals: [
      'Pronounce 约 (yuē) correctly — the ü-after-y rule means the "u" is actually rounded front ü, not back u, so the lips stay rounded forward.',
      'Hold 跟 (gēn) as a clean first tone (high level) and 见面 (jiàn miàn) as two sharp fourth tones — the falling-falling rhythm is distinctive for "to meet".',
      'Apply 一-sandhi in 一起 (yìqǐ): 一 (yī) becomes yì (falling) before the third-tone 起, then 起 itself stays third tone since it is the final syllable.',
    ],
    task: 'Read each example aloud and identify whether sandhi applies, then pronounce the spoken version with the correct tone shifts.',
  },
  {
    id: ACT.vocabularyScheduling,
    section: 'Vocabulary I',
    title: 'Scheduling verbs and nouns',
    goals: [
      'Memorize 12 scheduling words: 约 (appointment), 时间 (time), 见面 (meet), 取消 (cancel), 改 (change), 推迟 (postpone), 提前 (move earlier), 安排 (arrange), 计划 (plan), 方便 (convenient), 周末 (weekend), 平时 (weekdays).',
      'Distinguish the four reschedule verbs by direction: 取消 = cancel entirely, 改 = change to something else, 推迟 = move later, 提前 = move earlier.',
    ],
    task: 'Say each word out loud three times with the correct tones, then build one short sentence using each of the four reschedule verbs (取消, 改, 推迟, 提前).',
  },
  {
    id: ACT.vocabularyResponses,
    section: 'Vocabulary II',
    title: 'Accepting, declining, and excuses',
    goals: [
      'Use the agreement words 好的 / 没问题 / 行 / 可以 with the right register — 好的 is the safe default, 没问题 is enthusiastic, 行 and 可以 are casual peer-to-peer.',
      'Use polite decline openers 不好意思 (informal apology) and 抱歉 (slightly more formal), paired with vague face-saving excuses 那天我有事 or 那天不方便 instead of a direct 不 ("no").',
    ],
    task: 'Match each response phrase to the right register (casual / polite / formal) and the right situation (accepting / declining / hedging).',
  },
  {
    id: ACT.grammarPropose,
    section: 'Grammar I',
    title: '想/要 + verb — proposing plans',
    goals: [
      'Use 想 (xiǎng, "want to / would like to") + verb to propose a plan softly and politely: 我想跟你一起学习 ("I would like to study with you").',
      'Use 要 (yào, "want / will") + verb for stronger intent — closer to "I plan to" or "I am going to" than to a tentative wish.',
      'Close a proposal with 怎么样? (zěnmeyàng?, "how about it?") to invite the other person to confirm — the standard Mandarin pattern, more natural than a bare question.',
    ],
    task: 'Write three proposals using 我想 + verb + 怎么样?, varying the activity and the partner each time.',
  },
  {
    id: ACT.grammarTogether,
    section: 'Grammar II',
    title: '跟 + person + 一起 + verb — doing things together',
    goals: [
      'Build the "together with X" pattern: 跟 (gēn) + person + 一起 (yìqǐ) + verb. Example: 跟我一起去 ("come with me"), 跟朋友一起吃饭 ("eat with friends").',
      'Know that 跟 can be replaced by 和 (hé) in northern Mandarin and 与 (yǔ) in formal writing — same meaning, different register.',
      'Place the 跟…一起 phrase BEFORE the verb (not after it like English "with") — Mandarin word order is strict here.',
    ],
    task: 'Construct three "together" sentences placing 跟…一起 before the verb, then say each aloud with the correct yìqǐ sandhi.',
  },
  {
    id: ACT.grammarAspect,
    section: 'Grammar III',
    title: 'V + 了 (completed) vs V + 过 (experienced)',
    goals: [
      'Use V + 了 (le) to mark that an action was completed: 我约了她 ("I made an appointment with her" — the appointment IS made, now in place).',
      'Use V + 过 (guo) to mark that an action was experienced at some point in the past, without focusing on completion: 我们见过 ("we have met before" — just confirming the experience happened).',
      'In scheduling, 了 = "the plan is set / done"; 过 = "I have done this kind of thing before but it is not active now". Mixing them changes meaning.',
    ],
    task: 'Rewrite three sentences switching 了 to 过 (or vice versa) and explain how the meaning shifts for each pair.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'A WeChat exchange between two classmates',
    goals: [
      'Read a short 微信 (WeChat) message exchange between two Tsinghua classmates planning a Saturday study session, with correct tones and natural rhythm.',
      'Answer comprehension questions about the agreed day, time, place, and activity using short Mandarin answers.',
    ],
    task: 'Read the message exchange aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Accepting an invitation and rescheduling',
    goals: [
      'Follow an acceptance dialogue (yes + confirm time and place) and a rescheduling dialogue (decline + face-saving excuse + counter-proposal).',
      'Reproduce either dialogue swapping in your own day, time, and activity — the patterns are reusable beyond the specific examples.',
    ],
    task: 'Read both dialogues with the tutor first, then perform each one again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write a WeChat invitation message',
    goals: [
      'Write a 4-5 sentence WeChat invitation in Hanzi including day, time, place, activity, and a confirmation prompt.',
      'Use 跟…一起 at least once and 怎么样? at least once so the writing demonstrates the core invitation grammar of this lesson.',
    ],
    task: 'Write your own WeChat invitation in 4-5 sentences using the template, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'WeChat, face-saving excuses, and tea-meeting culture',
    goals: [
      'Know that 微信 (WeChat) is the dominant tool for scheduling in China — phone calls are reserved for urgency, and even close family often coordinates plans by text message in groups (微信群).',
      'Understand the 面子-saving rule for declining: a vague excuse like 那天我有事 ("I have something that day") is far more polite than a direct 不 ("no"); naming the real reason can sound cold or like complaining.',
      'Know the slang 鸽子 (gēzi, "pigeon" = flake) and the verb 放鸽子 ("to release the pigeon" = to no-show on a plan) — no-shows are a real social offense and the slang is widely used.',
    ],
    task: 'Decide how to invite a Tsinghua classmate to coffee on WeChat, then how to politely decline an invitation you cannot make — write both messages in Mandarin.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Schedule (and reschedule) a Tsinghua study session',
    goals: [
      'Combine every skill from this lesson into one continuous WeChat exchange: propose, confirm time and place, then later reschedule politely with a face-saving excuse.',
      'Match the register to the relationship — casual peer-to-peer phrasing throughout, since the partner is a classmate, not a teacher.',
    ],
    task: 'Roleplay with the tutor playing your Tsinghua classmate: propose a Saturday study session at the library, confirm details, then on Friday reschedule because "something came up" — aim for an 8-turn exchange.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 11: 我们约个时间 — Scheduling and Appointments',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'proposing-plan', label: 'Proposing a plan', goal: 'Use 我想 + verb + 怎么样? to softly suggest a shared activity with a peer.' },
    { id: 'asking-availability', label: 'Asking availability', goal: 'Use 你…有时间吗? or 你方便吗? to check if someone is free, with the right day or time slot.' },
    { id: 'accepting-declining', label: 'Accepting or declining politely', goal: 'Reply with 好的 / 没问题 to accept, or 不好意思 + vague excuse to decline without losing face.' },
    { id: 'rescheduling', label: 'Rescheduling', goal: 'Use 改 / 推迟 / 提前 / 取消 to shift a confirmed plan and offer an alternative time.' },
  ],
  relatedPools: ['topic-daily-life', 'topic-school'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can propose a plan, ask if someone is free, accept or politely decline with a face-saving excuse, and reschedule — all on WeChat with the rhythm and politeness Mandarin speakers expect.',
      'word',
      'Functional language: 提议 tíyì (propose) · 问时间 wèn shíjiān (ask availability) · 接受 jiēshòu (accept) · 拒绝 jùjué (decline) · 改时间 gǎi shíjiān (reschedule)',
      'These five micro-skills cover almost every short scheduling exchange in Mandarin — once they are automatic, every later social interaction layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at Tsinghua University and a classmate sends you a WeChat message: "周六我们一起去图书馆学习，怎么样？" You read, reply, and pin down the time and place — and a day later you have to reschedule because something came up.',
      'word',
      '同学: "周六我们一起去图书馆学习，怎么样？" — 你: "好啊，几点见？"',
      'A typical Mainland-student WeChat opener: propose + 怎么样? as confirmation prompt — softer and more polite than a bare yes/no question.',
      [
        { target: '一起 yìqǐ', note: '"together" — the togetherness particle that signals a shared activity; pairs naturally with 跟 + person' },
        { target: '怎么样? zěnmeyàng?', note: '"how about it?" — the standard Mandarin confirmation prompt at the end of a proposal' },
        { target: '几点见? jǐ diǎn jiàn?', note: '"what time shall we meet?" — short and natural; longer 我们几点见面? is also fine' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '微信节奏',
      'wēixìn jiézòu',
      'WeChat scheduling messages in Mandarin are typically short and rhythmic: one line per turn, no greeting needed (the chat itself is the greeting), and emoji or stickers (表情包) carry tone. Long formal openings sound stiff in casual peer exchanges.',
      'word',
      '同学: 周六有空吗？\n你: 有啊，怎么了？\n同学: 一起学习呗？\n你: 好啊！',
      'Four short lines settle the proposal — typical WeChat rhythm. Sticker 表情包 reactions often replace short text replies entirely.',
      [
        { target: '有空吗? yǒu kòng ma?', note: '"are you free?" — even shorter than 有时间吗?; very common in WeChat shorthand' },
        { target: '呗 bei', note: 'sentence-final particle softening a suggestion to a casual "right?" or "why not?"; very informal' },
        { target: '好啊 hǎo a', note: 'enthusiastic "OK!" with the warming particle 啊; warmer than bare 好' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '约',
      'yuē',
      'The character 约 ("to make an appointment / arrange") is pronounced with the ü-after-y rule: after y, the written "u" is actually the rounded front vowel ü, not the back vowel u. Lips stay rounded forward as for "ee" but the tongue is at the front of the mouth.',
      'word',
      '约 yuē → /ɥɛ/ first tone · 约时间 yuē shíjiān (set a time) · 约会 yuēhuì (date / appointment)',
      'The most commonly mispronounced scheduling word — learners say "yoo-eh" with a back vowel; the correct sound has a rounded front ü.',
      [
        { target: 'y + u → ü', note: 'spelling convention: written "u" after y/j/q/x is actually rounded front ü' },
        { target: '约 = ü + e, first tone', note: 'tongue at front, lips rounded, high level pitch' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '跟',
      'gēn',
      'The character 跟 ("with / and") is pronounced as a clean first tone — high and level — with no pitch movement. Beginners often let the tone drop into fourth tone, which would change the meaning. Hold the pitch steady at the top of your range.',
      'word',
      '跟 gēn → /kən¹/ · 跟我一起 gēn wǒ yìqǐ (together with me)',
      'A common high-frequency function word; getting the first tone right is critical because pitch is the only thing distinguishing it from a noisy fourth-tone fall.',
      [
        { target: '声母 g', note: 'unvoiced unaspirated velar, like English "k" in "sky" with no puff' },
        { target: '韵母 en', note: 'schwa + alveolar nasal, like English "un" in "fun"' },
        { target: '第一声', note: 'high, level pitch — no rise, no fall' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '见面',
      'jiàn miàn',
      'Two fourth tones in a row: both syllables fall sharply from high to low. The falling-falling rhythm is distinctive and signals "to meet" instantly to a Mandarin listener. A weak fall on either syllable merges into the wrong tone.',
      'word',
      '见面 jiàn miàn → /tɕjɛn⁵¹ mjɛn⁵¹/ · 我们见面吧 wǒmen jiàn miàn ba ("let us meet")',
      'Standard verb-object compound for "meet someone"; 见面 is intransitive, so you say 跟他见面 ("meet with him") not 见面他.',
      [
        { target: '见 jiàn (4th)', note: 'sharp falling tone; "to see / to meet"' },
        { target: '面 miàn (4th)', note: 'sharp falling tone; "face" — combines with 见 into "see-face = meet"' },
        { target: 'verb-object compound', note: '见面 cannot take a direct object; the meeting partner goes before with 跟' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '一起',
      'yìqǐ (一-sandhi)',
      'The character 一 (yī, "one") shifts tone based on what follows. Before the third-tone 起, 一 becomes yì (falling): 一起 is spoken yìqǐ. The third tone on 起 keeps its dip-and-rise because it is final in the phrase.',
      'word',
      '一起 written: yī qǐ → spoken: yìqǐ /ji⁵¹ tɕʰi²¹⁴/ · 一起去 yìqǐ qù ("go together")',
      'Critical for natural-sounding "together" phrases; ignore the sandhi and the rhythm sounds robotic.',
      [
        { target: '一 + 1st/2nd/3rd → yì (falling)', note: 'sandhi rule; 一起 yìqǐ, 一天 yìtiān, 一年 yìnián' },
        { target: '一 + 4th → yí (rising)', note: '一个 yígè, 一样 yíyàng' },
        { target: '一 alone or final → yī', note: '第一 dì yī, 十一 shíyī — no sandhi' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '不方便',
      'bù fāngbiàn (no sandhi here)',
      'A common decline phrase: 方 is first tone, so 不 keeps its full fourth tone (no sandhi). Contrast with 不是 (búshì) and 不对 (búduì) where 不 becomes second tone before a fourth-tone syllable. Pay attention to which tone follows 不 before deciding whether sandhi applies.',
      'word',
      '不方便 bù fāngbiàn → spoken: bù fāngbiàn (no sandhi)\n不是 bùshì → spoken: búshì (sandhi applies)',
      'Side-by-side reminder: 不-sandhi only triggers before a fourth tone; before any other tone, 不 stays bù.',
      [
        { target: '不 + 1st (方) → bù', note: 'no sandhi; full fourth tone preserved on 不' },
        { target: '不 + 4th (是) → bú', note: 'sandhi applies; 不 rises to second tone' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Scheduling verbs and nouns
    // ────────────────────────────────────────────────────────────────────
    createContentItem('约', 'yuē', 'To make an appointment or arrange a meeting. As a noun, 约 means "appointment / pact" (有约 = have plans). The verb pairs naturally with a time or person: 约时间 (set a time), 约朋友 (arrange to meet a friend).', 'word', '我们约个时间吧。', '"Let us set a time" — 个 is the generic measure word, softening the request; final 吧 makes it a casual suggestion.', null, [ACT.vocabularyScheduling]),
    createContentItem('时间', 'shíjiān', 'Time, in the general sense of a moment or duration. The high-frequency phrase 有时间 ("have time / be free") and 没时间 ("no time / busy") are the standard ways to indicate availability — direct equivalents to English "free / busy".', 'word', '你周末有时间吗?', '"Are you free on the weekend?" — 时间 used as the object of 有 in the availability question pattern.', null, [ACT.vocabularyScheduling]),
    createContentItem('见面', 'jiàn miàn', 'To meet (someone). Intransitive verb-object compound, so the person you meet goes BEFORE with 跟: 跟他见面 ("meet with him"), not 见面他. Common in scheduling contexts; less formal than 会面 (huìmiàn, "meet" in business contexts).', 'word', '我们明天见面吧。', '"Let us meet tomorrow" — casual suggestion with final 吧; replaces the older 我们明天约 in modern speech.', null, [ACT.vocabularyScheduling]),
    createContentItem('取消', 'qǔxiāo', 'To cancel an appointment, plan, or event entirely. Stronger and more final than 改 (change) or 推迟 (postpone) — 取消 means the plan is off, not rescheduled. Common in formal contexts like canceling a flight, a meeting, or a reservation.', 'word', '不好意思，我得取消明天的约。', '"Sorry, I have to cancel tomorrow\'s plan" — 得 (děi, "have to") signals obligation; 不好意思 softens the cancellation.', null, [ACT.vocabularyScheduling]),
    createContentItem('改', 'gǎi', 'To change something — including a meeting time. 改时间 ("change the time") is the most common reschedule verb in casual speech, less formal than 变更 (biàngēng, "alter") used in business writing. Pairs with what you want changed: 改时间, 改地方 (change the place), 改日子 (change the date).', 'word', '我们改个时间，可以吗?', '"Can we change the time?" — 个 softens the request; 可以吗? is a polite check.', null, [ACT.vocabularyScheduling]),
    createContentItem('推迟', 'tuīchí', 'To postpone — move a meeting to a LATER time. Literally "push-late". Specific direction matters: 推迟 means later, 提前 means earlier. Mixing them gives the wrong impression about the proposed shift.', 'word', '我们推迟到下周吧。', '"Let us postpone to next week" — 到 marks the new target time.', null, [ACT.vocabularyScheduling]),
    createContentItem('提前', 'tíqián', 'To move a plan to an EARLIER time — the opposite of 推迟. Literally "raise-front". 提前 is also used as an adverb meaning "in advance": 提前告诉我 ("tell me in advance").', 'word', '可以提前一个小时吗?', '"Can we move it up by an hour?" — 一个小时 ("one hour") specifies the size of the shift.', null, [ACT.vocabularyScheduling]),
    createContentItem('安排', 'ānpái', 'To arrange or schedule a plan; also the noun "arrangement / schedule". 我有安排 ("I have plans") is a slightly more formal way to indicate you are busy than 我有事 ("I have something"). Common in workplace and formal contexts.', 'word', '今天的安排怎么样?', '"How is today\'s schedule?" — 怎么样? as an open question about a plan.', null, [ACT.vocabularyScheduling]),
    createContentItem('计划', 'jìhuà', 'A plan; also the verb "to plan". Slightly more deliberate than 安排 — 计划 implies thinking ahead, 安排 implies fitting things into a schedule. 没计划 ("no plan") often functions as a polite way of saying "I am open / available".', 'word', '周末有计划吗?', '"Any plans for the weekend?" — standard availability check, slightly softer than 周末有空吗?', null, [ACT.vocabularyScheduling]),
    createContentItem('方便', 'fāngbiàn', 'Convenient / available. The polite-formal way to ask if someone is free: 你方便吗? ("Is it convenient for you?"). More respectful than 有空吗? — common in business and student-to-teacher contexts.', 'word', '明天下午您方便吗?', '"Are you available tomorrow afternoon?" — uses honorific 您 + formal 方便; the polite register expected with a senior contact.', null, [ACT.vocabularyScheduling]),
    createContentItem('周末', 'zhōumò', 'The weekend. Distinct from 周日 (Sunday) and 周六 (Saturday); 周末 covers both. The standard time slot for personal social plans in Mainland China since weekday evenings are unreliable due to overtime.', 'word', '周末一起吃饭吧。', '"Let us have a meal together this weekend" — combines 周末 with the 一起 + verb invitation pattern.', null, [ACT.vocabularyScheduling]),
    createContentItem('平时', 'píngshí', 'Weekdays / on regular days / usually. Used to contrast with 周末 ("weekends"). 平时很忙 ("usually busy") is a common reason given for declining weekday plans.', 'word', '我平时很忙，周末有空。', '"I am busy on weekdays, free on weekends" — the typical Chinese student/worker availability pattern.', null, [ACT.vocabularyScheduling]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Accepting, declining, excuses
    // ────────────────────────────────────────────────────────────────────
    createContentItem('好的', 'hǎo de', 'The safe, neutral "OK / sounds good" — works in casual peer chat, polite first-meeting contexts, and most workplace exchanges. Slightly warmer than bare 好 because the final 的 softens the tone.', 'word', 'A: 周六见面吧。 B: 好的，几点?', '"OK, what time?" — confirms the proposal and immediately asks for the missing detail.', null, [ACT.vocabularyResponses]),
    createContentItem('没问题', 'méi wèntí', 'Enthusiastic agreement — "no problem / consider it done". Stronger than 好的; signals not just acceptance but commitment. Common reply to a request or invitation when you are confident you can deliver.', 'word', 'A: 你能帮我吗? B: 没问题!', '"Can you help me? — No problem!" — slightly emphatic with the exclamation; the standard upbeat reply.', null, [ACT.vocabularyResponses]),
    createContentItem('行', 'xíng', 'Casual "OK / fine / works for me" — peer-to-peer register. Shorter and more colloquial than 好的; sounds slightly cooler/looser. Common among classmates and friends.', 'word', 'A: 七点见? B: 行，七点。', '"7 o\'clock? — Sure, 7 it is" — quick casual confirmation with the repeated time as agreement.', null, [ACT.vocabularyResponses]),
    createContentItem('可以', 'kěyǐ', 'Casual "OK / that works" — slightly more deliberate than 行, signaling that you have considered the proposal and approve. Common reply when someone asks 这样可以吗? ("Does this work?").', 'word', 'A: 我们改到下周可以吗? B: 可以。', '"Can we move it to next week? — That works." — closes the rescheduling negotiation.', null, [ACT.vocabularyResponses]),
    createContentItem('当然', 'dāngrán', 'Of course / certainly. Adds emphasis to an agreement: 当然可以! ("Of course you can!"). Conveys warmth and removes any hesitation from your reply.', 'word', '当然可以! 几点?', '"Of course! What time?" — warm acceptance + immediate next-step question.', null, [ACT.vocabularyResponses]),
    createContentItem('不好意思', 'bù hǎoyìsi', 'Informal apology / "sorry to bother you / I am embarrassed to say". The most common opener when declining or asking for a favor — softens the request or refusal so it does not feel blunt. Less formal than 抱歉.', 'word', '不好意思，那天我有事。', '"Sorry, I have something that day" — the standard polite decline opener; vague excuse follows.', null, [ACT.vocabularyResponses]),
    createContentItem('抱歉', 'bàoqiàn', 'Slightly more formal apology than 不好意思 — closer to "my apologies". Used in workplace, with teachers, or for more substantial things you are sorry about. Both 抱歉 and 不好意思 can decline an invitation; 抱歉 is the safer formal choice.', 'word', '抱歉，我那天不方便。', '"My apologies, I am not available that day" — formal decline; pair 抱歉 with 不方便 for a polished refusal.', null, [ACT.vocabularyResponses]),
    createContentItem('对不起', 'duìbuqǐ', 'Direct "I am sorry" — used for a more substantial apology than 不好意思 or 抱歉. In scheduling, often signals you are letting someone down (canceling a confirmed plan, missing a deadline). Less common as a casual decline opener.', 'word', '对不起，我得取消明天的约。', '"I am sorry, I have to cancel tomorrow\'s plan" — heavier apology because canceling a confirmed plan is a bigger social move than declining a fresh invitation.', null, [ACT.vocabularyResponses]),
    createContentItem('那天我有事', 'nà tiān wǒ yǒu shì', 'The standard vague excuse: "I have something that day". Deliberately non-specific — Chinese politeness expects you NOT to over-explain. Naming the real reason (work, doctor, family) can sound like complaining or oversharing.', 'word', '不好意思，那天我有事，下次吧。', '"Sorry, I have something that day, next time" — softens with 下次吧 ("next time"), keeping the door open.', null, [ACT.vocabularyResponses]),
    createContentItem('那天不方便', 'nà tiān bù fāngbiàn', 'A slightly more formal vague excuse: "that day is not convenient". Same face-saving purpose as 那天我有事 but with a more polished register; common in workplace or with teachers.', 'word', '抱歉，那天不方便，能改个时间吗?', '"Sorry, that day is not convenient, can we change the time?" — formal decline + immediate counter-proposal.', null, [ACT.vocabularyResponses]),
    createContentItem('下次吧', 'xià cì ba', '"Next time" — the standard closer when declining, keeping the relationship open. Without 下次吧 or a similar promise, a decline can sound final and chilly. The final 吧 softens it to a suggestion rather than a commitment.', 'word', '今天不行，下次吧。', '"Today doesn\'t work, let\'s do it next time" — softens a refusal by signaling future willingness.', null, [ACT.vocabularyResponses]),
    createContentItem('要不…?', 'yàobu…?', 'A soft counter-proposal opener — "how about…? / why don\'t we…?". Pairs naturally with a new time or activity: 要不周日? ("how about Sunday?"). Lighter and more tentative than 我们… ("let us…").', 'word', 'A: 周六不行。 B: 要不周日?', '"Saturday doesn\'t work. — How about Sunday?" — natural counter-proposal flow.', null, [ACT.vocabularyResponses]),
    createContentItem('有空', 'yǒu kòng', 'Free / available — literally "have empty time". Casual register, more colloquial than 有时间. Common in WeChat shorthand: 有空吗? ("free?"). Negation 没空 ("busy") is the matching reply for "no".', 'word', '今晚有空吗?', '"Free tonight?" — short casual availability check; typical of WeChat messages between peers.', null, [ACT.vocabularyResponses]),
    createContentItem('约好了', 'yuē hǎo le', 'A confirmed plan — "we have settled on it". Pairs 约 with 好 (resultative complement meaning "done well / settled") and the completion marker 了. Common in casual confirmation: 那就约好了 ("then it\'s settled").', 'word', '那就约好了，周六两点见。', '"Then it\'s settled, see you Saturday at two" — the standard close after pinning down all the details.', null, [ACT.vocabularyResponses]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 想 / 要 + verb (proposing)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '想 + verb',
      'xiǎng + verb — would like to',
      'Use 想 + verb to express a wish or soft desire: 我想去 ("I would like to go"), 我想见你 ("I would like to see you"). The most polite and tentative way to propose a plan — leaves room for the other person to disagree without face-loss.',
      'sentence',
      '我想跟你一起去图书馆。\n("I would like to go to the library with you.")',
      '想 is softer than 要; sounds like a polite suggestion rather than a firm intent. Standard for inviting a peer to do something.',
      [
        { target: '想 xiǎng', note: 'modal verb "would like to / want to"; softer and more polite than 要' },
        { target: '想 + verb', note: 'no 是 needed; 想 attaches directly to the action verb' },
        { target: 'negation: 不想', note: '"don\'t want to" — 我不想去 ("I don\'t want to go"); polite enough among peers' },
      ],
      [ACT.grammarPropose],
    ),
    createContentItem(
      '要 + verb',
      'yào + verb — plan to / going to',
      'Use 要 + verb for a firmer intent — closer to "I plan to" or "I am going to". Stronger than 想; suggests the decision is mostly made. Use carefully in proposals — pairing 我要 with a co-action you have not consulted on can sound presumptuous.',
      'sentence',
      '我要去图书馆，你来吗?\n("I am going to the library, want to come?")',
      'Note the structure: announce your own firm plan with 要, then invite the other person — softer than 我要跟你去 which presumes their agreement.',
      [
        { target: '要 yào (modal)', note: 'modal verb "want to / will / be going to"; stronger commitment than 想' },
        { target: '想 vs 要', note: '想 = tentative wish; 要 = firmer plan. For inviting someone, 想 is the safer choice' },
        { target: 'negation: 不想 (not 不要)', note: 'to politely decline a plan, use 不想; 不要 sounds like "don\'t!" — a strong command' },
      ],
      [ACT.grammarPropose],
    ),
    createContentItem(
      '怎么样?',
      'zěnmeyàng? — how about it?',
      'The standard Mandarin confirmation prompt at the end of a proposal — "how about it / what do you think?". Turns a statement into an invitation for the other person to weigh in. Without 怎么样?, a proposal can sound like a unilateral decision.',
      'sentence',
      '我们周六去图书馆，怎么样?\n("Let\'s go to the library Saturday, how about it?")',
      '怎么样? is also a general "how is it / how was it" question — 工作怎么样? ("how is work?"), 那部电影怎么样? ("how was that movie?").',
      [
        { target: '怎么样? (proposal)', note: '"how about it?" — confirmation prompt closing an invitation' },
        { target: '怎么样? (general)', note: '"how is it?" — open question about any state or experience' },
        { target: 'reply patterns', note: 'positive: 好啊! / 没问题! ; negative: 不太行 / 那天不方便' },
      ],
      [ACT.grammarPropose],
    ),
    createContentItem(
      '完整提议模板',
      'wánzhěng tíyì múbǎn',
      'A complete proposal template combining all three grammar pieces: 我想 + 跟你一起 + verb + (time/place) + 怎么样?. Use this exact structure and almost any Mandarin invitation sounds natural.',
      'sentence',
      '我想跟你一起周六去图书馆学习，怎么样?\n("I would like to go study at the library with you Saturday, how about it?")',
      'Five slots, one rhythm: subject + modal + companion + activity + time + confirmation. Swap in different verbs and times for endless variations.',
      [
        { target: '我想 wǒ xiǎng', note: 'soft proposal opener — "I would like to"' },
        { target: '跟你一起 gēn nǐ yìqǐ', note: 'togetherness phrase — "together with you"' },
        { target: '+ verb + place/time', note: 'the activity slot; can be a verb-object compound like 去图书馆学习' },
        { target: '怎么样?', note: 'confirmation prompt; invites the other person to agree or counter' },
      ],
      [ACT.grammarPropose],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 跟 + person + 一起
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '跟 + person + 一起',
      'gēn + person + yìqǐ',
      'The "together with X" pattern. 跟 (gēn) introduces the companion, 一起 (yìqǐ) emphasizes togetherness. Both come BEFORE the verb — Mandarin word order is strict: companion first, action second.',
      'sentence',
      '跟我一起去吧。\n("Come with me.")\n跟朋友一起吃饭。\n("Eat with friends.")',
      'Unlike English "with X" which usually follows the verb, Mandarin places 跟 X 一起 in front. Putting it after the verb sounds wrong.',
      [
        { target: '跟 gēn (preposition)', note: '"with / and"; introduces the person you are doing something with' },
        { target: '一起 yìqǐ (adverb)', note: '"together"; reinforces togetherness, optional but very common' },
        { target: 'word order', note: 'subject + 跟 + person + 一起 + verb; placing 跟…一起 after the verb is ungrammatical' },
      ],
      [ACT.grammarTogether],
    ),
    createContentItem(
      '跟 vs 和 vs 与',
      'gēn vs hé vs yǔ — register variants',
      'Three near-synonyms for "with / and". 跟 is the everyday spoken default in northern Mandarin. 和 (hé) is slightly more book-flavored but also common in speech. 与 (yǔ) is formal/written, common in news and academic Chinese.',
      'sentence',
      '跟朋友 (casual) · 和朋友 (neutral/written) · 与朋友 (formal)\n— all mean "with friends".',
      'For Level 1 spoken Mandarin, 跟 is the safe default. 和 also works and is sometimes preferred in southern Mandarin and Taiwan.',
      [
        { target: '跟 gēn', note: 'spoken default in northern Mandarin and Beijing speech; safe casual choice' },
        { target: '和 hé', note: 'neutral; common in writing and southern/Taiwan speech' },
        { target: '与 yǔ', note: 'formal / written; appears in news, contracts, academic Chinese' },
      ],
      [ACT.grammarTogether],
    ),
    createContentItem(
      '一起 can stand alone',
      'yìqǐ on its own',
      'The 跟…部分 can be dropped if the companion is obvious from context — leaving just 一起 + verb. 我们一起去 ("let us go together") drops 跟 because 我们 already implies the group.',
      'sentence',
      '我们一起学习。\n("Let\'s study together.")\n一起吃饭吧!\n("Let\'s eat together!")',
      'Drop 跟 + person when the group is already the subject; keep 跟 + person when you are pointing out a specific companion.',
      [
        { target: '我们一起 + verb', note: 'group already named; drop 跟; minimal natural form' },
        { target: '跟你一起 + verb', note: 'one-on-one; keep 跟 to specify the companion' },
        { target: '一起 + verb + 吧', note: 'final 吧 adds a casual "let us / shall we" suggestion tone' },
      ],
      [ACT.grammarTogether],
    ),
    createContentItem(
      '跟 + person + verb (no 一起)',
      'gēn + person + verb — alternative use',
      '跟 can also introduce the OTHER PARTY in a reciprocal action without 一起: 跟他见面 ("meet with him"), 跟老师说 ("speak to the teacher"). Here 跟 is closer to English "with / to" than "together with".',
      'sentence',
      '我要跟他见面。\n("I am going to meet with him.")\n你应该跟老师说。\n("You should speak to the teacher.")',
      'Without 一起, 跟 still means "with" but emphasizes the interaction direction rather than togetherness. Common with verbs of meeting, speaking, and arguing.',
      [
        { target: '跟 + person + 见面', note: '"meet with X"; 见面 cannot take a direct object' },
        { target: '跟 + person + 说', note: '"speak to / with X"; standard pattern' },
        { target: '跟 + person + 一起 + verb', note: 'adds togetherness; common in social activities (eat, study, travel)' },
      ],
      [ACT.grammarTogether],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: V + 了 vs V + 过
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'V + 了',
      'V + le — completed action',
      'Place 了 (le) right after the verb to mark that an action was completed or a state has changed. In scheduling, V + 了 signals that a plan is SET / DONE: 我约了她 ("I have arranged with her" — the appointment is in place now).',
      'sentence',
      '我约了她明天见面。\n("I have arranged to meet her tomorrow.")\n我们改了时间。\n("We changed the time.")',
      '了 is one of the most common particles in Mandarin and has multiple uses; the verb-suffix 了 specifically marks completion of the action.',
      [
        { target: '约 + 了 → 约了', note: '"have arranged / have made an appointment" — completed action' },
        { target: '改 + 了 → 改了', note: '"have changed" — the change is done' },
        { target: '取消 + 了 → 取消了', note: '"have canceled" — cancellation is in effect now' },
      ],
      [ACT.grammarAspect],
    ),
    createContentItem(
      'V + 过',
      'V + guo — experienced action',
      'Place 过 (guo, neutral tone) after the verb to mark that the action was EXPERIENCED at some point in the past, without focusing on completion. 我们见过 ("we have met before") confirms the experience happened; it does not say the meeting is current.',
      'sentence',
      '我们见过。\n("We have met before.")\n我去过北京。\n("I have been to Beijing.")',
      '过 is the "experiential aspect" marker — useful for "have you ever…" questions and "I have once…" statements.',
      [
        { target: '见 + 过 → 见过', note: '"have met before" — confirms the experience exists' },
        { target: '去 + 过 → 去过', note: '"have been (somewhere)" — past visit, may or may not return' },
        { target: 'negation: 没 V 过', note: '"have never V-ed"; 没去过 ("never been"), 没见过 ("never met before")' },
      ],
      [ACT.grammarAspect],
    ),
    createContentItem(
      '了 vs 过 contrast',
      'le vs guo — completion vs experience',
      'The key contrast: 了 says THE ACTION IS DONE (and often the result still stands). 过 says THE ACTION HAPPENED AT LEAST ONCE (experience exists, current relevance unclear). 我约了她 = "I have arranged with her (the plan is set)". 我约过她 = "I have arranged with her before (at some point, no longer active)".',
      'sentence',
      '我约了她 → "I have set a plan with her" (the plan is live)\n我约过她 → "I have set a plan with her before" (at some point in the past)',
      'Mixing them changes meaning in important ways — especially for confirming whether a plan is currently active.',
      [
        { target: '了 = result-current', note: 'the action is completed AND the result/state is currently in place' },
        { target: '过 = experience-only', note: 'the action happened once or more; current state is not implied' },
        { target: 'scheduling rule of thumb', note: '了 for confirmed plans in effect now; 过 for "we have done this kind of thing before"' },
      ],
      [ACT.grammarAspect],
    ),
    createContentItem(
      '没 V (没 V 过)',
      'méi V — past tense negation',
      'To negate a past or completed action, use 没 (méi) BEFORE the verb — never 不. 没去 ("did not go"), 没约 ("did not arrange"). For experience, use 没 V 过: 没见过 ("have never met before").',
      'sentence',
      '我没约她。\n("I did not arrange with her.")\n我们没见过。\n("We have never met before.")',
      'The 没 vs 不 split: 不 negates general/present/future, 没 negates past and existential. Using 不约 when you mean "did not arrange" is a beginner error.',
      [
        { target: '没 + V', note: 'past tense negation; "did not do" or "have not done"' },
        { target: '没 + V + 过', note: 'experiential negation; "have never done before"' },
        { target: '不 + V vs 没 + V', note: '不 = general/future negation; 没 = past/existential negation' },
      ],
      [ACT.grammarAspect],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '微信聊天',
      'wēixìn liáotiān — A WeChat exchange',
      'A natural WeChat exchange between two Tsinghua classmates planning a Saturday study session. Read aloud with the casual, short-line rhythm typical of Chinese student texting.',
      'conversation',
      '小明: 周六有空吗?\n莎拉: 有啊，怎么了?\n小明: 我想跟你一起去图书馆学习，怎么样?\n莎拉: 好啊! 几点?\n小明: 下午两点怎么样? 在西馆门口见。\n莎拉: 行，两点在西馆门口。\n小明: 好的，到时候见。\n莎拉: 周六见!',
      'Eight short turns settle the entire plan — typical WeChat pacing. Notice: no formal greeting, immediate confirmation, and 周六见 ("see you Saturday") as the casual sign-off.',
      [
        { target: '有空吗? yǒu kòng ma?', note: '"free?" — short casual availability check' },
        { target: '怎么了? zěnme le?', note: '"what is up? / what is it?" — invites the other person to explain why they are asking' },
        { target: '西馆门口 xī guǎn ménkǒu', note: '"the West Building entrance" — 西馆 is a common abbreviation for 图书馆西馆 (Tsinghua West Library), one of the main study spots on campus' },
        { target: '到时候见 dào shíhou jiàn', note: '"see you then" — the casual sign-off pinning down the agreed time' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí — Comprehension',
      'Four standard comprehension questions matching the WeChat exchange. Answer each in a short sentence — full sentences are not required for natural Mandarin.',
      'sentence',
      'Q1: 他们什么时候见面? Q2: 在哪里见面? Q3: 他们要做什么? Q4: 是谁先发的消息?',
      'Four standard wh-questions: when, where, what, who — covering all the basic info in the message exchange.',
      [
        { target: 'A1: 周六下午两点。', note: '"Saturday at 2 PM"; full sentence: 他们周六下午两点见面 — short answer is more natural' },
        { target: 'A2: 在图书馆西馆门口。', note: '"At the West Library entrance" — uses 在 + location' },
        { target: 'A3: 一起学习。', note: '"Study together" — verb + 一起 covers the activity' },
        { target: 'A4: 小明先发的。', note: '"Xiao Ming sent it first" — 先 ("first") + 的 marks the past action' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '接受邀请 (对话)',
      'jiēshòu yāoqǐng — Accepting an invitation',
      'A natural acceptance dialogue: propose, ask back, confirm, pin down details. Use the casual peer-to-peer register typical between classmates.',
      'conversation',
      '小明: 莎拉，周六我想跟你一起去图书馆学习，怎么样?\n莎拉: 好啊! 几点见?\n小明: 下午两点怎么样?\n莎拉: 没问题。在哪里见?\n小明: 西馆门口吧。\n莎拉: 行，那就约好了，周六下午两点西馆门口见。\n小明: 好的，周六见!',
      'Seven turns, full proposal-and-confirm flow. Notice 那就约好了 ("then it\'s settled") as the close before the final repeat-and-sign-off.',
      [
        { target: '我想跟你一起 + verb', note: 'the standard polite proposal opener; review Grammar I + II' },
        { target: '怎么样?', note: 'confirmation prompt closing the invitation' },
        { target: '没问题!', note: 'enthusiastic acceptance; warmer than bare 好的' },
        { target: '那就约好了', note: '"then it\'s settled" — closes the negotiation; pairs naturally with a repeat of the agreed details' },
        { target: '周六见', note: 'casual sign-off; the agreed day replaces 再见 to signal the next encounter is locked in' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '改时间 (对话)',
      'gǎi shíjiān — Rescheduling dialogue',
      'A natural rescheduling dialogue: apologize, give a vague excuse, propose an alternative, confirm. Notice the face-saving language: 不好意思 + 那天我有事 instead of explaining the real reason.',
      'conversation',
      '莎拉: 小明，不好意思，周六我有事，能改个时间吗?\n小明: 没事! 你周日有空吗?\n莎拉: 周日下午可以，几点都行。\n小明: 那两点怎么样? 还是在西馆门口。\n莎拉: 行，谢谢你! 那周日下午两点西馆门口见。\n小明: 没问题，到时候见!',
      'Six turns of polite rescheduling. The asker (Sarah) opens with apology + vague excuse + immediate counter-proposal request; the listener (Xiao Ming) accepts and offers a new time without demanding the reason.',
      [
        { target: '不好意思 + 我有事', note: 'apology + vague excuse — the standard face-saving decline opener; never name the real reason unless asked' },
        { target: '能改个时间吗?', note: '"can we change the time?" — softer than 我们改时间吧; uses 能 ("can / be able") for politeness' },
        { target: '没事!', note: '"no worries!" — casual reassurance, common reply to an apology among peers' },
        { target: '几点都行', note: '"any time works" — gracious flexibility; 都 ("all") + 行 ("OK") signals you are open' },
        { target: '到时候见', note: '"see you then" — same casual close as in the accept dialogue, agreed time understood' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn — WeChat invitation template',
      'A reusable four-sentence template for any WeChat invitation. Fill in the bracketed slots with your own information — the structure carries the politeness and rhythm.',
      'sentence',
      '[名字]，[时间]有空吗? 我想跟你一起 [活动]，怎么样? 我们在 [地方] [时间] 见面，可以吗? 等你的回复。',
      'Four sentences cover the core: name + availability check + soft proposal + time-and-place + confirmation prompt — the minimum complete WeChat invitation.',
      [
        { target: '[名字]', note: 'the recipient\'s name or nickname; common to use 小 + last syllable for classmates (小明, 小张)' },
        { target: '[时间]有空吗?', note: 'opening availability check; 周六 / 明天 / 这周末 are common slot fillers' },
        { target: '我想跟你一起 [活动]', note: 'soft proposal using Grammar I + II; common activities: 学习, 吃饭, 喝咖啡, 看电影' },
        { target: '在 [地方] [时间] 见面', note: 'pins down place and time; word order: 在 + place + time + 见面' },
        { target: '等你的回复', note: '"waiting for your reply" — casual close that invites a response without demanding one' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí — Writing practice',
      'Write your own 4-5 sentence WeChat invitation in Hanzi using the template. Use 跟…一起 at least once and 怎么样? at least once so the writing demonstrates the core invitation grammar.',
      'sentence',
      '示例: 小明，周六有空吗? 我想跟你一起去清华图书馆学习，怎么样? 我们下午两点在西馆门口见面，可以吗? 等你回复!',
      'Translation: "Xiao Ming, are you free Saturday? I would like to study with you at the Tsinghua library — how about it? Let\'s meet at the West Library entrance at 2 PM — does that work? Looking forward to your reply!"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '微信约时间',
      'wēixìn yuē shíjiān — WeChat as the scheduling tool',
      'WeChat (微信) is the dominant tool for scheduling in China — phone calls are reserved for urgency. Even close family often coordinates plans by text message in groups (微信群). Stickers (表情包) carry emotional tone and often replace short text replies entirely.',
      'sentence',
      '在中国，约时间一般用微信。打电话只用在紧急情况。\n("In China, scheduling is usually done on WeChat. Phone calls are reserved for emergencies.")',
      'Among students and young professionals, an unscheduled phone call can feel intrusive — text first, call only if the conversation needs voice.',
      [
        { target: '微信 wēixìn', note: 'WeChat — the dominant Chinese super-app for messaging, payments, and social' },
        { target: '微信群 wēixìn qún', note: 'WeChat group — used for class coordination, family planning, friend groups' },
        { target: '表情包 biǎoqíng bāo', note: 'stickers / emoji packs — carry tone in text; often replace short replies entirely' },
        { target: '约时间 yuē shíjiān', note: '"set a time / make an appointment" — the standard scheduling collocation' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '面子和拒绝',
      'miànzi hé jùjué — Face-saving when declining',
      'Chinese politeness places high value on 面子 ("face") — both yours and the other person\'s. Declining an invitation requires a face-saving formula: vague excuse + apology + offer of next time. A direct 不 ("no") without softening sounds cold or even hostile.',
      'sentence',
      'WRONG: 不行。 (blunt "no" — face-losing)\nRIGHT: 不好意思，那天我有事，下次吧!\n("Sorry, I have something that day, let\'s do it next time!")',
      'The vague 我有事 is intentional — naming the real reason (work, doctor, family conflict) can sound like complaining or oversharing. Vagueness IS the politeness.',
      [
        { target: '不好意思 (apology)', note: 'softens the decline by acknowledging the inconvenience' },
        { target: '那天我有事 (vague excuse)', note: 'deliberately non-specific; Chinese politeness expects you NOT to over-explain' },
        { target: '下次吧 (future offer)', note: 'keeps the relationship open; signals future willingness without commitment' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '茶叙文化',
      'cháxù wénhuà — Tea-meeting culture',
      'Meeting over tea (茶叙 / 喝茶) is a culturally important way to discuss matters informally — common for friendships, business networking, and even sensitive workplace conversations. 一起喝茶 ("let\'s have tea together") is a standard, low-pressure invitation; the tea itself is secondary to the conversation.',
      'sentence',
      '我们找个时间一起喝茶吧。\n("Let\'s find a time to have tea together.")',
      'Among older generations and in business contexts, 喝茶 carries more social weight than 喝咖啡 (coffee) — though coffee culture is growing rapidly in Beijing and Shanghai.',
      [
        { target: '喝茶 hē chá', note: '"drink tea" — also a euphemism for "have a conversation"; common in workplace and friendship contexts' },
        { target: '茶叙 cháxù', note: 'formal "tea conversation" — used in business and academic networking' },
        { target: '咖啡 vs 茶', note: '咖啡 is younger/urban; 茶 carries more traditional cultural weight; both work for casual peer plans' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '放鸽子',
      'fàng gēzi — No-show slang',
      'The slang 鸽子 (gēzi, "pigeon") refers to someone who flakes on plans, and the verb 放鸽子 ("release the pigeon") means "to no-show". No-shows are a real social offense in Chinese culture — 放鸽子 is widely used and immediately understood. If you must cancel, do it well in advance with a clear apology.',
      'sentence',
      '他又放鸽子了!\n("He flaked again!")',
      'Among young people in particular, 放鸽子 is a serious accusation — being known as a 鸽子 affects future invitations. The Chinese expectation is to confirm a plan once made.',
      [
        { target: '鸽子 gēzi', note: '"pigeon" — slang for someone who flakes; modeled on the pigeon flying away' },
        { target: '放鸽子 fàng gēzi', note: '"release the pigeon" — to no-show, to flake on a plan; standard slang' },
        { target: '迟到 chídào', note: '"arrive late" — also a social offense; better to message ahead if running late' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 约清华图书馆学习',
      'rènwù: yuē Qīnghuá túshūguǎn xuéxí — Schedule a Tsinghua library study session',
      'Roleplay a complete WeChat scheduling exchange with the tutor playing your Tsinghua classmate. Propose a Saturday study session at the library, confirm time and place, then on Friday reschedule with a polite face-saving excuse — the full lifecycle of a Mandarin plan.',
      'conversation',
      '[微信聊天 — 周三晚上]\n你: [打招呼 + 问周六有空吗]\n同学: 周六我应该有空。怎么了?\n你: [提议一起去图书馆学习 + 用怎么样?]\n同学: 好啊! 几点?\n你: [提议时间 + 地方]\n同学: 行，那就约好了。周六见!\n\n[微信聊天 — 周五晚上]\n你: [道歉 + 用"那天我有事"或"不方便" + 请求改时间]\n同学: 没事! 你周日方便吗?\n你: [接受 + 重新提议时间和地方]\n同学: 好，那就周日见!',
      'Two scenes, eight turns total. The AI tutor will prompt you and react naturally to whatever you say — including pushing back if your excuse is too direct or too vague.',
      [
        { target: '打招呼', note: 'WeChat greetings are minimal — often skip directly to the question or use 在吗? ("are you there?")' },
        { target: '提议 + 怎么样?', note: 'use Grammar I (想 + verb) + Grammar II (跟…一起) + closing 怎么样?' },
        { target: '提议时间和地方', note: 'word order: time + 在 + place + 见面 ; common spots: 图书馆西馆门口, 清华书店, 食堂' },
        { target: '改时间道歉', note: 'use 不好意思 or 抱歉 + vague excuse + 能改时间吗?; the apology must come BEFORE the excuse' },
        { target: '重新约', note: 'after the other person offers an alternative, confirm with a full repeat: 那就周日下午两点见!' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 紧急改时间',
      'tiǎozhàn — jǐnjí gǎi shíjiān — Last-minute reschedule',
      'Stretch goal: rescheduling just an hour before the agreed meeting. This is socially riskier — closer to 放鸽子 territory — so the apology must be heavier (对不起 not 不好意思) and the counter-proposal more concrete. Use 对不起 + reason + immediate alternative.',
      'conversation',
      '[微信 — 周六下午一点]\n你: 小明，对不起! 我突然有急事，下午两点真的去不了。能推迟到三点吗?\n同学: 没事! 三点也行。那就三点西馆门口见。\n你: 谢谢你! 真的不好意思，到时候请你喝咖啡!\n同学: 没问题，到时候见!',
      'Last-minute changes need extra warmth: a heavier 对不起, an offer to make it up (请你喝咖啡 — "I\'ll buy you coffee"), and quick confirmation of the new time.',
      [
        { target: '对不起 vs 不好意思', note: '对不起 is heavier — appropriate for last-minute changes; 不好意思 is too light here' },
        { target: '突然有急事', note: '"suddenly something urgent came up" — a STRONGER excuse than vague 有事, justified by the last-minute timing' },
        { target: '能推迟到 X 吗?', note: '"can we postpone to X?" — concrete alternative; never just "I can\'t make it" without a counter-proposal' },
        { target: '请你喝咖啡', note: '"I\'ll buy you coffee" — face-restoring offer; small social currency that rebalances the imposition' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
