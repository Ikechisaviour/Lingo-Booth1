// Level 2 Adult Unit 1 — Professional Greetings & Introductions (Mandarin Chinese)
// Functions: business greetings, professional self-introduction, exchanging name
// cards, addressing colleagues by title, business small talk, and the formal-vs-
// casual workplace register switch.
//
// Builds on Level 1 Unit 1 (peer greetings) by moving the same toolkit into a
// Beijing professional/workplace setting: 您好, 久仰大名, 幸会, 名片, 总经理,
// 负责, 关系, 面子, 饭局.
//
// All content is authored with Hanzi (Simplified target) + Pinyin (romanization)
// + English glosses (canonical source). The AI conversation tutor reads this
// curriculum and delivers it to each learner in their preferred native language
// at runtime — never assume a specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"): every
// nativeText, exampleNative, and breakdown.native carries register, usage
// context, contrast, or a notable quirk — not a bare definition.

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
  orientation: 'zh-l2au1-orientation',
  pronunciation: 'zh-l2au1-pronunciation',
  vocabularyGreetings: 'zh-l2au1-vocab-greetings',
  vocabularyTitles: 'zh-l2au1-vocab-titles',
  grammarWorkAt: 'zh-l2au1-grammar-work-at',
  grammarResponsibility: 'zh-l2au1-grammar-responsibility',
  grammarScope: 'zh-l2au1-grammar-scope',
  reading: 'zh-l2au1-reading',
  listening: 'zh-l2au1-listening',
  writing: 'zh-l2au1-writing',
  culture: 'zh-l2au1-culture',
  task: 'zh-l2au1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet a senior colleague or client in Mandarin at a business-appropriate register, switching from 你好 to 您好 to 久仰大名 as the situation demands.',
      'Introduce yourself in a professional context with company, role, and one specific responsibility — not just name and nationality.',
      'Hand over and receive a 名片 (business card) with both hands using the standard wording, and address the giver by their family name + correct title.',
    ],
    task: 'Picture a Tsinghua-affiliated tech conference in Beijing: a senior engineer from a local company walks up at the coffee break and offers their card. By the end of this lesson you should run the whole 30-second exchange — greeting, card swap, self-introduction, small talk — in confident formal Mandarin.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in professional Mandarin',
    goals: [
      'Apply the third-tone sandhi chain in 总经理 zǒngjīnglǐ — three of its four syllables would be third tone in isolation; the actual spoken contour is 2-1-2-3.',
      'Distinguish 您 nín (formal you, 2nd tone) from 你 nǐ (casual you, 3rd tone) — same vowel, different tone AND register; pronouncing one for the other in a meeting signals the wrong relationship.',
      'Read formal-meeting phrases 幸会 xìnghuì, 久仰大名 jiǔyǎng dàmíng, and 失陪 shīpéi without anglicizing the palatal j/q/x or the retroflex sh.',
    ],
    task: 'Read each example aloud and identify whether sandhi applies; pronounce the spoken version, not the written tones.',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Business greetings, formal openers, and farewells',
    goals: [
      'Memorize 12 formal/professional first-meeting and closing phrases — when to use 您好 vs 久仰大名 vs 幸会, and how each lands with a Chinese counterpart.',
      'Distinguish polite-but-warm openers (很高兴认识您) from highly formal ones (久仰大名 / 幸会幸会) so you do not over- or under-shoot the register.',
    ],
    task: 'Say each phrase three times with correct tones, then pair each one to a situation: meeting a peer engineer, meeting a senior VP, meeting a respected scholar you have read about, ending a 90-minute meeting politely.',
  },
  {
    id: ACT.vocabularyTitles,
    section: 'Vocabulary II',
    title: 'Workplace titles, departments, and the 名片',
    goals: [
      'Address colleagues by family name + correct rank: 王经理 (Manager Wang), 李总监 (Director Li), 张总 (short for 张总经理, CEO Zhang), 陈副总 (Deputy CEO Chen).',
      'Use the 名片 (business card) vocabulary needed at every Chinese business meeting: 双手 (two hands), 递 (hand over), 收 (receive), 看一下 (take a look).',
    ],
    task: 'Address five workplace roles correctly by family name + title, then practice the four-line script for offering and receiving a 名片.',
  },
  {
    id: ACT.grammarWorkAt,
    section: 'Grammar I',
    title: '在 X 工作 vs 是 X 的员工 — work AT vs employee OF',
    goals: [
      'Use 在 + company + 工作 / 上班 to say where you work as a place (locative meaning), e.g., 我在腾讯工作.',
      'Use 是 + company + 的 + 员工 to identify yourself as an employee of the company (membership meaning), e.g., 我是腾讯的员工.',
      'Pick the right pattern by intent: 在…工作 frames the company as a workplace, 是…的员工 frames you as a member — Chinese keeps these conceptually distinct.',
    ],
    task: 'Write three sentences about yourself: one using 在…工作, one using 是…的员工, and one using both in sequence to show the contrast.',
  },
  {
    id: ACT.grammarResponsibility,
    section: 'Grammar II',
    title: '负责 + N — being in charge of something concrete',
    goals: [
      'Use 负责 (fùzé, "be in charge of / responsible for") with a concrete noun: a project, a product, a team, a department, a region.',
      'Avoid the English-to-Chinese trap of using 负责 with abstract responsibilities — 负责 wants a tangible object, not a feeling or a quality.',
      'Pair 负责 with 主要 (mainly) and 目前 (currently) to scope your responsibility honestly: 我目前主要负责…',
    ],
    task: 'Write two sentences with 负责 — one for your real or imagined main project, one for a side responsibility — using a concrete noun object each time.',
  },
  {
    id: ACT.grammarScope,
    section: 'Grammar III',
    title: '主要 + V + 的 + N — describing job scope',
    goals: [
      'Use the 主要 + V + 的 + N construction to describe the main thing your role does: 主要做的工作 ("the work I mainly do"), 主要负责的项目 ("the projects I am mainly responsible for").',
      'Understand that 的 + N turns the preceding clause into a noun phrase — the same construction is used for "the X that I [verb]" relative clauses throughout Mandarin.',
      'Combine with 是 to make a clean job-scope sentence: 我主要负责的是华北区的销售 ("What I am mainly in charge of is sales in the North China region").',
    ],
    task: 'Build one 主要…的… noun phrase for your role, then embed it in a 是 sentence to describe your job scope in one polished line.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a corporate self-introduction',
    goals: [
      'Read a short corporate-introduction paragraph aloud with correct tones, sandhi, and the formal register that suits a 名片-exchange context.',
      'Answer four comprehension questions about company, title, responsibility, and contact preference using 是 / 不是 / 在…负责 short answers.',
    ],
    task: 'Read the paragraph below aloud, then answer four comprehension questions in short professional sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A business-card exchange',
    goals: [
      'Follow an 8-turn 名片-exchange dialogue between two engineers at a Tsinghua conference and identify the formal register markers (您, 贵公司, 久仰大名, 幸会).',
      'Reproduce the dialogue with your own company and role, swapping in the relevant phrases naturally and keeping the formal register throughout.',
    ],
    task: 'Read the formal dialogue with the AI tutor first, then perform it again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your professional self-introduction',
    goals: [
      'Write 5–6 sentences in Hanzi covering greeting, name, company, role, one concrete responsibility, and a polite closing — the content of a verbal 名片 hand-over.',
      'Use 在…工作 or 是…的员工 at least once, 负责 with a concrete noun at least once, and one 主要…的… scope phrase so the writing demonstrates the core grammar.',
    ],
    task: 'Write a 5–6 sentence professional self-introduction modeled on the sample, then read it aloud at conference-tempo speed.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '名片, 关系, 面子, and 饭局',
    goals: [
      'Hand and receive a 名片 with BOTH hands, study the card briefly (read the name and title aloud silently), and never write on a received card in front of the giver — these are non-negotiable etiquette signals in Mainland business.',
      'Understand 关系 (guānxi) — the long-term network of mutual obligation that underpins Chinese business — and why a first 名片-exchange is the start of a relationship, not a single transaction.',
      'Know the basics of 饭局 (business-dinner) culture: the senior person sits in the 主位 (seat facing the door), juniors do not sit before the host gestures, and toasts are made with the glass held lower than the senior\'s.',
    ],
    task: 'List five 名片 do\'s and don\'ts and explain in one sentence each why the practice signals respect or its absence.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Tsinghua tech conference — exchange a 名片 in Mandarin',
    goals: [
      'Combine every skill from this lesson into one continuous scene: greet at the right register, swap 名片 with both hands, give your company / role / one concrete responsibility, and close with a follow-up promise.',
      'Switch between 你 and 您 correctly based on the seniority of the counterpart, and use the family-name + title address form throughout.',
    ],
    task: 'Roleplay a 名片-exchange at a Tsinghua-affiliated tech conference with the AI tutor playing a senior engineer from a Beijing company; aim for a 7-turn exchange in formal Mandarin.',
  },
];

const lesson = {
  title: 'Level 2 (Professional) · Unit 1: 您好 — Professional Greetings & Name-Card Introductions',
  category: 'business',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'business-greeting', label: 'Business greeting', goal: 'Open a professional encounter with the register-appropriate phrase (您好 / 久仰大名 / 幸会) and read the room before deciding on 你 vs 您.' },
    { id: 'professional-self-introduction', label: 'Professional self-introduction', goal: 'Give name, company, role, and one concrete responsibility in two clean sentences using 我是…公司的, 担任…职务, and 负责….' },
    { id: 'exchanging-name-cards', label: 'Exchanging name cards', goal: 'Hand and receive a 名片 with both hands, read the card silently, and verbalize the recipient\'s family name + title back to them.' },
    { id: 'business-small-talk', label: 'Business small talk', goal: 'Carry a 30-second post-introduction small-talk turn using 公司怎么样? / 项目进展如何? / 最近忙吗? at the right register.' },
  ],
  relatedPools: ['topic-society', 'topic-work'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can greet a senior colleague or client in business-appropriate Mandarin, exchange a 名片 with both hands, give a complete professional self-introduction (name + company + role + responsibility), and run a brief small-talk turn — all in the formal register.',
      'word',
      'Functions: 商务打招呼 shāngwù dǎ zhāohu (business greeting) · 自我介绍 zìwǒ jièshào (self-intro) · 交换名片 jiāohuàn míngpiàn (exchange name cards) · 寒暄 hánxuān (small talk) · 告别 gàobié (farewell)',
      'These five micro-skills are the spine of every Mainland business encounter — once they are automatic, every future client/colleague interaction layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at a tech conference hosted on the 清华大学 campus in Beijing. A senior engineer from a local company walks up at the coffee break, offers their 名片 with both hands, and starts the conversation. The whole encounter takes about 30 seconds and you will need every micro-skill from this lesson.',
      'word',
      '资深工程师: "您好！久仰大名。这是我的名片，请多指教。"',
      'A typical formal opener at a Beijing tech conference: honorific 您好 + 久仰大名 (long admired) + 名片 hand-over + 请多指教 (please advise) — all four pieces are standard.',
      [
        { target: '您好 nín hǎo', note: 'honorific greeting (not 你好) — signals respect appropriate for a first business meeting; expect to be greeted this way' },
        { target: '久仰大名 jiǔyǎng dàmíng', note: 'formal "I have long admired your great name" — used when meeting someone whose reputation you have heard of; reply with 哪里哪里 or 幸会幸会' },
        { target: '请多指教 qǐng duō zhǐjiào', note: '"please give me much guidance" — a humility marker that closes any business self-introduction; the receiver replies with 互相 (mutual) or 一起 (together)' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '正式与非正式',
      'zhèngshì yǔ fēi zhèngshì',
      'Mandarin workplaces draw a clear line between formal and casual registers. Formal (client meetings, first introductions, senior colleagues): 您 / 您好 / 贵公司 / 久仰. Casual (peers, after-hours, established colleagues): 你 / 你好 / 你们公司 / 老王. Mixing them up is one of the most common mistakes by foreign professionals.',
      'word',
      'FORMAL: 您好，王总。 / CASUAL: 嗨，老王！ — same person, two registers, two relationships.',
      'The shift from 您 to 你 is a meaningful relationship event — wait for the senior person to initiate the downgrade, never the other way around.',
      [
        { target: 'FORMAL: 您, 您好, 贵公司, 久仰', note: 'first meetings, client-facing, senior people, ceremonial settings' },
        { target: 'CASUAL: 你, 你好, 你们公司, 老 + surname', note: 'established peer colleagues, after-hours, internal-team-only contexts' },
        { target: '老 + surname (老王, 老李)', note: 'affectionate "old + surname" — used between long-standing peers; never use with someone senior to you' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '总经理',
      'zǒngjīnglǐ (spoken: zóng-jīng-lí)',
      'The word for "CEO / general manager" hides a third-tone sandhi chain: 总 (zǒng, 3rd) + 经 (jīng, 1st) + 理 (lǐ, 3rd). The 1st tone in the middle breaks the chain; the result is a 2-1-3 spoken contour, where the first 总 rises (sandhi before another 3rd that follows after the 1st-tone bridge feels softened in fluent speech, and most speakers raise 总 to a 2 here).',
      'word',
      '总经理 → spoken: zóngjīnglǐ /tsʊŋ³⁵ tɕiŋ⁵⁵ li²¹⁴/',
      'One of the most common business titles; getting the sandhi right makes the difference between sounding rehearsed and sounding fluent.',
      [
        { target: '总 (written: zǒng, 3rd)', note: 'first syllable; full third tone in isolation' },
        { target: '总 (spoken: zóng, 2nd)', note: 'raised to rising tone in connected speech before the long compound — typical fluent-speech reduction' },
        { target: '经 (jīng, 1st)', note: 'middle syllable; high level — unchanged' },
        { target: '理 (lǐ, 3rd)', note: 'final syllable; keeps full third-tone dip-and-rise at the end of the word' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '您 vs 你',
      'nín vs nǐ',
      'Two pronouns that look almost identical and sound almost identical — but with a critical difference. 您 (nín) is SECOND tone (rising); 你 (nǐ) is THIRD tone (dip-and-rise). 您 is honorific; 你 is casual. Confuse the tone in a meeting and you sound like you are addressing a senior client as a buddy.',
      'word',
      '您好，王总。(nín hǎo — formal) vs 你好，老王！(nǐ hǎo — casual)',
      'The tone difference also disambiguates register in noisy environments where the ㄣ vs ㄧ vowel distinction may be lost — listen for the tone, not the vowel.',
      [
        { target: '您 (nín, 2nd tone)', note: 'rising tone — like a polite question intonation; honorific "you" for elders, clients, seniors, first meetings' },
        { target: '你 (nǐ, 3rd tone)', note: 'dip-and-rise tone — falls then rises; casual "you" for peers, friends, established colleagues' },
        { target: 'WHY MIX-UPS MATTER', note: 'using 你 with a senior client signals over-familiarity; using 您 with a close peer creates cold distance' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '幸会',
      'xìnghuì',
      'A formal first-meeting reply meaning "fortunate to meet you". Two fourth-tone syllables in a row — both fall sharply. The palatal x- is NOT English /ks/; it is a soft "sh"-like fricative with the tongue forward and flat. Often doubled as 幸会幸会 to intensify warmth.',
      'word',
      '幸会幸会 → /ɕiŋ⁵¹ xweɪ⁵¹ ɕiŋ⁵¹ xweɪ⁵¹/',
      'Said as a reply to 久仰大名 — the formal social loop ("I have long admired you" / "Fortunate to meet you") is closed by these two phrases.',
      [
        { target: '幸 (xìng, 4th)', note: 'palatal initial x- (NOT English /ks/) + nasal -ing; sharp falling tone' },
        { target: '会 (huì, 4th)', note: 'velar fricative h- + ui diphthong; sharp falling tone' },
        { target: '幸会幸会 (reduplicated)', note: 'doubled form intensifies the warmth — standard in highly formal first-meeting moments' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '久仰大名',
      'jiǔyǎng dàmíng (spoken: jiú-yáng dà-míng)',
      'Two third-tone-in-a-row sandhi events sit inside this four-syllable phrase: 久仰 (jiǔ + yǎng) triggers sandhi on 久 (rises to jiú); 仰 remains 3rd in isolation but here softens before 大 (4th) — in fluent speech often heard as jiú yáng dà míng. Mastering this phrase is a tone-and-sandhi diagnostic.',
      'word',
      '久仰大名 written: jiǔyǎng dàmíng → spoken: jiú yáng dà míng',
      'The most common error: pronouncing 久仰 with two flat third tones, which sounds clumsy. The sandhi rise on 久 is what makes it sound natural.',
      [
        { target: '久 (written: jiǔ, 3rd → spoken: jiú, 2nd)', note: 'rises to second tone because the next syllable is also third — third-tone sandhi rule' },
        { target: '仰 (written: yǎng, 3rd)', note: 'second syllable; full third tone before a fourth-tone follower, often softened to a low pitch' },
        { target: '大名 (dàmíng, 4+2)', note: 'fourth + second; no sandhi; "great name" — honorific for the listener\'s reputation' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '请多指教',
      'qǐng duō zhǐjiào (spoken: qíng duō zhí-jiào)',
      'The standard closing of every Chinese business self-introduction — "please give me much guidance". Two third-tone sandhi events: 请 (qǐng → qíng before 多, no — actually 多 is 1st, no sandhi here on 请) and 指 (zhǐ → zhí before jiào, 4th). The phrase pairs with 互相 (mutual) as a reply.',
      'word',
      '请多指教 → spoken: qǐng duō zhí jiào',
      'Indispensable in a 名片-exchange — leaving it out makes a self-introduction sound abrupt or arrogant.',
      [
        { target: '请 (qǐng, 3rd)', note: 'polite request marker; full third tone before the first-tone 多' },
        { target: '多 (duō, 1st)', note: '"much / many" — high level tone' },
        { target: '指 (written: zhǐ, 3rd → spoken: zhí, 2nd)', note: 'rises before another third? actually before jiào (4th) it stays as 3rd in isolation; in connected speech often softens to a low rising' },
        { target: '教 (jiào, 4th)', note: '"teach / guide"; sharp falling tone' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Business greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('您好', 'nín hǎo', 'The default formal/business greeting that replaces casual 你好 with the honorific 您. Mandatory in first business meetings, with clients, with anyone significantly senior, and in customer-facing roles. Using 你好 instead with a senior counterpart signals over-familiarity bordering on rudeness.', 'word', '王总，您好！我是清华科技的李伟。', 'Honorific opener followed by family-name + title address and a clean self-introduction — the standard first turn in a business meeting.', null, [ACT.vocabularyGreetings]),
    createContentItem('久仰大名', 'jiǔyǎng dàmíng', 'A highly formal first-meeting phrase meaning "I have long admired your great name" — used when meeting someone whose reputation precedes them (a respected scholar, senior executive, accomplished elder). Often doubled as 久仰，久仰 to intensify. Out of place in casual peer-to-peer meetings.', 'word', '李教授，久仰大名！今天终于有机会见到您。', 'Formal opener combined with the named title; "今天终于…" ("today I finally…") amplifies the sentiment of long-awaited meeting.', null, [ACT.vocabularyGreetings]),
    createContentItem('幸会', 'xìnghuì', 'A formal reply to 久仰大名 — "fortunate to meet you / a pleasure to meet you". Often doubled as 幸会幸会 to intensify warmth. The matching half of the highly formal first-meeting exchange; the loop closes with this phrase.', 'word', '幸会幸会！请坐，请坐。', 'Reduplicated form + invitation to sit (请坐请坐 also doubled) — formal hospitality rhythm common at the start of business meetings.', null, [ACT.vocabularyGreetings]),
    createContentItem('很高兴认识您', 'hěn gāoxìng rènshi nín', 'A polite-to-formal first-meeting phrase identical in structure to the Level 1 你-version, but using honorific 您. The middle-register choice when 久仰大名 is too formal but 你好 alone is too casual — works in nearly every business introduction.', 'word', '很高兴认识您，张总监。', 'Combined with family-name + 总监 (director) address; the safe default at most professional events.', null, [ACT.vocabularyGreetings]),
    createContentItem('请多指教', 'qǐng duō zhǐjiào', 'A humility-marker that closes every business self-introduction — "please give me much guidance". Indispensable; leaving it out makes a self-introduction sound abrupt or arrogant. The standard reply is 互相互相 (hùxiāng hùxiāng, "mutual, mutual") or 一起努力 (yīqǐ nǔlì, "let\'s work together").', 'word', '我是新来的，请多指教。', 'Self-introduction closer used by the newer/junior party; "新来的" ("new arrival") explicitly flags the speaker\'s position.', null, [ACT.vocabularyGreetings]),
    createContentItem('请多关照', 'qǐng duō guānzhào', 'A near-synonym of 请多指教 meaning "please look after me / please show me consideration". Slightly warmer and more personal than 指教 (which emphasizes professional guidance); 关照 emphasizes social/personal support. Often paired together as 请多多指教，请多多关照.', 'word', '初到贵公司，请多关照。', 'Used by a new employee or external visitor; "初到" ("just arrived") + "贵公司" (your honored company) compound the formality.', null, [ACT.vocabularyGreetings]),
    createContentItem('您贵姓', 'nín guì xìng', 'The honorific way to ask someone\'s family name — literal: "your honored surname?" Standard at first business meetings; the reply uses 免贵 (miǎn guì, "drop the honorific") + 姓 X (e.g., 免贵姓王 = "no need for the honorific, my name is Wang"). Using plain 你姓什么? in a business context is jarringly informal.', 'word', '请问，您贵姓? — 免贵，姓王。', 'Polite question-answer pair; "请问" ("may I ask") opens the polite frame, "免贵" deflects the honorific the questioner offered.', null, [ACT.vocabularyGreetings]),
    createContentItem('请多包涵', 'qǐng duō bāohán', 'An apology-in-advance phrase — "please bear with my shortcomings / please be understanding". Used when introducing yourself in a context where you expect to make small mistakes (new role, Mandarin not your first language, unfamiliar territory). Highly self-effacing; common in foreign-professional self-introductions.', 'word', '我的中文不太好，请多包涵。', 'Standard way for a non-native speaker to acknowledge their Mandarin level humbly at the start of a meeting.', null, [ACT.vocabularyGreetings]),
    createContentItem('辛苦了', 'xīnkǔ le', 'A workplace acknowledgment phrase meaning roughly "you\'ve worked hard / thanks for your effort". Said to a colleague who has finished a task, ended a shift, or completed a presentation. Has no clean English equivalent — it expresses recognition of effort, not gratitude for a favor.', 'word', '今天大家都辛苦了，先去吃饭吧。', 'End-of-meeting acknowledgment paired with a meal invitation — a typical close of a long workday.', null, [ACT.vocabularyGreetings]),
    createContentItem('失陪', 'shīpéi', 'A formal phrase meaning "excuse me, I must leave" — literal: "fail to keep company". Used to excuse yourself from a conversation or meeting before others have left. Often doubled as 失陪一下 (excuse me for a moment) for a brief absence or 我先失陪 (I must leave first) for a final departure.', 'word', '不好意思，我先失陪一下。', 'Polite mid-meeting departure; "不好意思" ("sorry to trouble you") softens the interruption.', null, [ACT.vocabularyGreetings]),
    createContentItem('改天再聊', 'gǎitiān zài liáo', 'A casual-to-polite closing meaning "let\'s talk again another day". Implies a continued relationship without committing to a specific time — the social opposite of "let\'s do lunch sometime" in English, but actually expected to be honored. Variants: 改天再约 (let\'s schedule another time), 下次再聊.', 'word', '今天先到这儿，改天再聊。', 'Meeting-close paired with "today let\'s stop here" — a natural way to wrap a productive but unfinished conversation.', null, [ACT.vocabularyGreetings]),
    createContentItem('保持联系', 'bǎochí liánxì', 'A standard business close meaning "let\'s keep in touch". Said when exchanging contact information or 名片 with someone you want to maintain a relationship with. Implies a real (not nominal) intent to follow up; using it without following up is a 关系-eroding signal.', 'word', '我们保持联系，有机会一起合作。', 'Future-cooperation framing — pairs the keep-in-touch promise with a specific cooperative possibility.', null, [ACT.vocabularyGreetings]),
    createContentItem('公司怎么样', 'gōngsī zěnmeyàng', 'A standard business small-talk question — "how is the company doing?". Used after the initial 名片 hand-over to open a casual-yet-professional exchange. Standard replies: 还可以 (not bad), 挺好的 (going well), 业务在扩张 (business is expanding).', 'word', '贵公司最近怎么样? — 还可以，业务在扩张。', 'Pairs honorific 贵公司 + 最近 (recently) + 怎么样 — the polite version; the casual version drops 贵 and 最近.', null, [ACT.vocabularyGreetings]),
    createContentItem('最近忙吗', 'zuìjìn máng ma', 'A casual-to-polite small-talk question — "have you been busy lately?". Standard between business acquaintances. The expected reply is rarely "no"; standard answers acknowledge busyness while showing it is manageable: 还行 (so-so), 挺忙的 (pretty busy), 一直在忙项目 (always busy with projects).', 'word', '最近忙吗? — 还行，一直在忙一个新项目。', 'Standard small-talk turn; the answer naturally introduces a topic (the new project) for the conversation to continue on.', null, [ACT.vocabularyGreetings]),
    createContentItem('项目进展如何', 'xiàngmù jìnzhǎn rúhé', 'A business-specific small-talk question — "how is the project progressing?". 进展 (jìnzhǎn) = "progress / development"; 如何 (rúhé) = "how" (formal, written register). Asks about the state of a known shared project; standard replies use 顺利 (smooth), 按计划 (on schedule), 有些挑战 (some challenges).', 'word', '上次提到的合作项目进展如何? — 进展顺利，下个月可以交付。', 'Project-specific follow-up pairing 上次提到的 (mentioned last time) + 项目进展 + 如何; "next month can deliver" gives a concrete update.', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Titles, departments, the 名片
    // ────────────────────────────────────────────────────────────────────
    createContentItem('名片', 'míngpiàn', 'Business card — a critical artifact in Chinese business culture. Exchanged with BOTH hands at every first meeting; the receiver studies the card briefly before pocketing it. Writing on a received card in front of the giver is considered disrespectful. Variants: 卡片 (kǎpiàn, generic card), 名帖 (míngtiě, formal/old form).', 'word', '这是我的名片，请多指教。', 'Standard hand-over line; pair with 双手 (both hands) gesture for full formality.', null, [ACT.vocabularyTitles]),
    createContentItem('经理', 'jīnglǐ', 'Manager — a mid-level title used after a family name (王经理 = Manager Wang). Covers department managers, branch managers, project managers; the specific scope is given by context. Higher than 主管 (zhǔguǎn, supervisor), lower than 总监 (director).', 'word', '王经理，这是我们的项目方案。', 'Standard address + project-proposal hand-over; appropriate for any mid-level manager interaction.', null, [ACT.vocabularyTitles]),
    createContentItem('总经理', 'zǒngjīnglǐ', 'General manager / CEO — the senior management title. Often abbreviated to 总 (zǒng) after the family name: 王总 = Mr. Wang the CEO. The 总 abbreviation is the standard form of address; the full 总经理 is used mainly in written introductions and business cards.', 'word', '张总今天有空见您吗?', '"Does CEO Zhang have time to see you today?" — the 总 abbreviation is the everyday way to refer to senior executives.', null, [ACT.vocabularyTitles]),
    createContentItem('总监', 'zǒngjiān', 'Director — a senior management title sitting between 经理 (manager) and 总经理 (CEO/GM). Common in tech, marketing, and operations: 技术总监 (CTO), 市场总监 (Marketing Director), 运营总监 (Operations Director). Used after a family name: 李总监 = Director Li.', 'word', '李总监负责整个华北区。', '"Director Li is in charge of the entire North China region" — pairs the title with a region/scope description.', null, [ACT.vocabularyTitles]),
    createContentItem('副总', 'fùzǒng', 'Deputy CEO / Vice President — abbreviation of 副总经理 (fù zǒngjīnglǐ). Used after a family name: 陈副总 = Vice President Chen. The 副 (vice/deputy) prefix can be added to any title: 副经理 (deputy manager), 副总监 (deputy director).', 'word', '陈副总主管研发部门。', '"Deputy CEO Chen oversees the R&D department" — pairs senior title with 部门 (department) for scope.', null, [ACT.vocabularyTitles]),
    createContentItem('主管', 'zhǔguǎn', 'Supervisor / team lead — a first-line management title, lower than 经理. Used after a family name (王主管) or as a job description (我是销售部的主管). Often the first management rank a young professional reaches in Chinese companies.', 'word', '我是销售部的主管。', '"I am the supervisor of the sales department" — uses 部 + 的 + 主管 pattern to identify the scope and rank.', null, [ACT.vocabularyTitles]),
    createContentItem('助理', 'zhùlǐ', 'Assistant — both a job title (administrative assistant, executive assistant) and an entry-level rank prefix (助理工程师 = assistant engineer, 助理研究员 = research assistant). The standalone 助理 usually means executive assistant or admin support.', 'word', '我是王总的助理。', '"I am CEO Wang\'s assistant" — uses senior\'s family-name + 总 + 的 + 助理 to position oneself in the hierarchy.', null, [ACT.vocabularyTitles]),
    createContentItem('工程师', 'gōngchéngshī', 'Engineer (any discipline). Variants by seniority: 助理工程师 (junior), 工程师 (regular), 高级工程师 (senior, 高工 for short), 资深工程师 (very senior / principal). Common discipline modifiers: 软件工程师, 硬件工程师, 算法工程师.', 'word', '我是软件工程师，负责后端开发。', '"I am a software engineer, in charge of back-end development" — pairs job title with 负责 + concrete responsibility.', null, [ACT.vocabularyTitles]),
    createContentItem('部门', 'bùmén', 'Department / division. Used with discipline modifiers: 销售部 (sales), 市场部 (marketing), 研发部 (R&D, short for 研究开发部), 人事部 (HR), 财务部 (finance). The shortened -部 form is more common than the full -部门 in compound names.', 'word', '我在研发部工作。', '"I work in the R&D department" — uses 在 + place + 工作 pattern (Grammar I) with department as the place.', null, [ACT.vocabularyTitles]),
    createContentItem('公司', 'gōngsī', 'Company / firm. The honorific reference to someone else\'s company is 贵公司 (guì gōngsī, "your honored company"); the humble reference to your own is 敝公司 (bì gōngsī, "my humble company") in very formal contexts, or just 我们公司 in normal speech.', 'word', '贵公司在哪儿?', '"Where is your company located?" — uses 贵公司 to honor the other party; standard business small-talk opener.', null, [ACT.vocabularyTitles]),
    createContentItem('担任', 'dānrèn', 'To hold a position / to serve as. The formal verb used to describe one\'s role: 我在 X 公司担任 Y 职务 ("I serve as Y at X Company"). More formal than the everyday 做 (zuò, "do") or 当 (dāng, "be"); preferred in self-introductions and resumes.', 'word', '我在腾讯担任产品经理。', '"I serve as a product manager at Tencent" — uses 在 + company + 担任 + role; standard professional self-intro pattern.', null, [ACT.vocabularyTitles]),
    createContentItem('双手递', 'shuāng shǒu dì', 'To hand over with both hands — the prescribed way to give a 名片, a gift, or any token in Chinese business etiquette. The matching action when receiving is 双手接 (shuāng shǒu jiē, "receive with both hands"). One-handed exchange is a clear signal of disrespect or casualness.', 'word', '请双手递名片，更显尊重。', '"Please hand over the name card with both hands — it shows more respect" — the standard etiquette instruction.', null, [ACT.vocabularyTitles]),
    createContentItem('看一下', 'kàn yīxià', 'To take a brief look — a quick action softened by 一下 (yīxià, "for a moment"). The required action after receiving a 名片: read the name and title silently, then carefully place the card on the table or in a card holder. Pocketing the card without looking signals disregard.', 'word', '收到名片要先看一下，再小心收起来。', '"After receiving a name card, look at it first, then carefully put it away" — the prescribed sequence; "收起来" means "put away".', null, [ACT.vocabularyTitles]),
    createContentItem('负责', 'fùzé', 'To be in charge of / responsible for. Takes a concrete noun: a project (负责一个项目), a product (负责产品 X), a team (负责销售团队), a region (负责华北区). Stronger and more specific than the English "responsible for"; the Chinese form requires a tangible object.', 'word', '我目前主要负责华北区的销售业务。', '"I am currently mainly in charge of the sales business in the North China region" — pairs 目前 (currently) + 主要 (mainly) for honest scoping; standard Grammar II construction.', null, [ACT.vocabularyTitles]),
    createContentItem('项目', 'xiàngmù', 'Project — the most common object of 负责 in tech and business contexts. Variants: 重点项目 (key project), 试点项目 (pilot project), 子项目 (sub-project). The standard counter for projects is 个: 一个项目, 两个项目.', 'word', '我负责一个跨部门项目。', '"I am in charge of a cross-departmental project" — 跨 (kuà, cross) + 部门 (department) creates a common project descriptor.', null, [ACT.vocabularyTitles]),
    createContentItem('贵公司', 'guì gōngsī', 'Honorific reference to your counterpart\'s company — literal "your honored company". Used throughout formal business conversations to refer to the other side. The matching humble form for your own company is 敝公司 (bì gōngsī) in very formal writing, or just 我们公司 in normal speech.', 'word', '请问，贵公司的总部在哪儿?', '"May I ask where your company\'s headquarters is located?" — standard formal-meeting question pairing 请问 (may I ask) + 贵公司.', null, [ACT.vocabularyTitles]),
    createContentItem('总部', 'zǒngbù', 'Headquarters — the main office of a company. Used with 在 + place: 总部在北京 ("HQ is in Beijing"). Common follow-up question in 名片-exchange small talk: 贵公司总部在哪儿?', 'word', '我们公司总部在上海，在北京有研发中心。', '"Our company\'s HQ is in Shanghai, with an R&D center in Beijing" — typical multi-city company description.', null, [ACT.vocabularyTitles]),
    createContentItem('行业', 'hángyè', 'Industry / sector — used in business small talk to ask or describe what field a company is in: 你们做哪个行业? ("What industry are you in?"). Common values: 互联网 (Internet), 金融 (finance), 制造业 (manufacturing), 教育 (education).', 'word', '我们公司主要做互联网行业。', '"Our company mainly does the Internet industry" — uses 做 + 行业 pattern to describe the company\'s sector.', null, [ACT.vocabularyTitles]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 在 X 工作 vs 是 X 的员工
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '在 X 工作',
      'zài X gōngzuò',
      'The locative "work at" pattern: 在 (zài, "at/in") + company/place + 工作 (gōngzuò, "to work"). Frames the company as a WORKPLACE — answers "where do you work?" rather than "whose employee are you?". The everyday default in casual professional small talk.',
      'sentence',
      '我在腾讯工作。/ 我在清华科技公司工作。',
      'Standard answer to 你在哪儿工作? — the locative 在 places the speaker at the company; "in/at" framing.',
      [
        { target: '在 + place', note: 'locative preposition; "at / in" the named place' },
        { target: '工作 (gōngzuò) vs 上班 (shàngbān)', note: '工作 = "to work" (general); 上班 = "to go to work / be at work" (clocked-in sense); both work in this pattern but 上班 is slightly more casual' },
        { target: '我在 X 工作', note: 'frames company as workplace; emphasizes location, not membership' },
      ],
      [ACT.grammarWorkAt],
    ),
    createContentItem(
      '是 X 的员工',
      'shì X de yuángōng',
      'The membership pattern: 是 (shì, "to be") + company + 的 (de, possessive) + 员工 (yuángōng, "employee"). Frames YOU as a member of the company — answers "whose employee are you?" rather than "where do you work?". More formal and identity-asserting than 在…工作.',
      'sentence',
      '我是腾讯的员工。/ 我是清华科技的员工。',
      'Standard self-identification in a formal introduction; the 是…的员工 frame is preferred when establishing your affiliation in a business meeting.',
      [
        { target: '是 + company + 的 + 员工', note: 'frames you as a MEMBER of the company; emphasizes belonging, not location' },
        { target: '员工 vs 同事', note: '员工 (yuángōng) = "employee" (formal company member); 同事 (tóngshì) = "colleague" (relational)' },
        { target: '是 X 的员工 vs 在 X 工作', note: 'first says "I belong to X"; second says "I work at X" — pick by intent' },
      ],
      [ACT.grammarWorkAt],
    ),
    createContentItem(
      '对比 — 在…工作 vs 是…的员工',
      'duìbǐ — zài…gōngzuò vs shì…de yuángōng',
      'The two patterns are not interchangeable. 在…工作 is locative ("I work AT Tencent") — the company is a place. 是…的员工 is identifying ("I AM Tencent\'s employee") — the company is your affiliation. In a formal first introduction, pair them: 我是腾讯的员工，目前在北京总部工作.',
      'sentence',
      'LOCATIVE: 我在腾讯工作。("I work at Tencent.")\nMEMBERSHIP: 我是腾讯的员工。("I am a Tencent employee.")\nCOMBINED: 我是腾讯的员工，在北京总部工作。',
      'The combined form is the polished business self-intro: identity first (是…的员工), then location/office (在…工作).',
      [
        { target: 'LOCATIVE 在 X 工作', note: 'answers "where" — company as place; everyday small talk default' },
        { target: 'MEMBERSHIP 是 X 的员工', note: 'answers "whose" — company as affiliation; formal first introduction' },
        { target: 'COMBINED', note: 'identity + location in one sentence; the polished business self-intro' },
      ],
      [ACT.grammarWorkAt],
    ),
    createContentItem(
      '上班 vs 下班',
      'shàngbān vs xiàbān',
      'The daily-rhythm verbs: 上班 (shàngbān, "go to work / clock in") and 下班 (xiàbān, "leave work / clock out"). Used with time-of-day to describe the workday: 我九点上班，六点下班. Distinct from 工作 (gōngzuò) which is the activity, not the clock event.',
      'sentence',
      '我每天九点上班，六点下班。',
      'Standard workday description; "每天" ("every day") + 上班/下班 with start/end times — common small-talk reply to 你几点上班?',
      [
        { target: '上班 shàngbān', note: '"clock in / be at work" — the workday-start event; uses 上 (up/on)' },
        { target: '下班 xiàbān', note: '"clock out / leave work" — the workday-end event; uses 下 (down/off)' },
        { target: '加班 jiābān', note: '"work overtime" — uses 加 (add) + 班 (shift); a common everyday topic in Chinese workplace small talk' },
      ],
      [ACT.grammarWorkAt],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 负责 + concrete noun
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '负责 + N',
      'fùzé + N',
      'The "in charge of" verb 负责 takes a CONCRETE noun: a project, a product, a team, a region, a department. Pattern: subject + 负责 + tangible object. The English-to-Chinese trap is using 负责 with abstract responsibilities ("I\'m responsible for quality") — Mandarin prefers a tangible object (负责质量管理 with 管理 making "quality" concrete).',
      'sentence',
      '我负责华北区的销售。("I am in charge of sales in the North China region.")\n我负责一个跨部门项目。("I am in charge of a cross-departmental project.")',
      '负责 wants a tangible thing to be in charge of — territory, project, team, product. Abstract qualities need to be nominalized first.',
      [
        { target: '负责 + 项目 (project)', note: 'most common business object; specify with 的 + name or scope' },
        { target: '负责 + 产品 (product)', note: 'product-line ownership; common in tech and consumer goods' },
        { target: '负责 + 团队 (team)', note: 'people-management object; pair with 人数 (head count) for specificity' },
        { target: '负责 + 区域 (region)', note: 'territorial ownership; 华北区 (North China), 华东区 (East China), 华南区 (South China)' },
        { target: '负责 + 部门 (department)', note: 'departmental ownership; pair with 部门 name for clarity' },
      ],
      [ACT.grammarResponsibility],
    ),
    createContentItem(
      '主要 + V — mainly do X',
      'zhǔyào + V',
      'The adverb 主要 (zhǔyào, "mainly / primarily") goes BEFORE the verb to scope what you primarily do. Pair it with 负责 to honestly describe your main responsibility: 我主要负责… ("What I am mainly in charge of is…"). The Mandarin equivalent of English "my main role is to…".',
      'sentence',
      '我主要负责产品设计。/ 我主要做后端开发。',
      'The 主要 + V pattern lets you flag your CORE work versus your incidental duties — a small honest scoping move that signals professional self-awareness.',
      [
        { target: '主要 (zhǔyào)', note: 'adverb "mainly / primarily"; placed before the verb' },
        { target: '主要 + 负责', note: 'scopes your main responsibility honestly; "mainly in charge of"' },
        { target: '主要 + 做', note: '"mainly do" — works for non-管理 activities (development, design, research)' },
        { target: '目前主要 + V', note: 'adds 目前 ("currently") to indicate this is the present scope, not a permanent definition' },
      ],
      [ACT.grammarResponsibility],
    ),
    createContentItem(
      '担任 + 职务',
      'dānrèn + zhíwù',
      'The formal verb 担任 ("to serve as / to hold the position of") + 职务 (zhíwù, "position / title") forms the polished self-introduction frame: 我担任 X 职务 ("I hold the position of X"). More formal than 我是 X or 我做 X; appropriate for first business meetings and written introductions.',
      'sentence',
      '我在腾讯担任产品经理职务。',
      'Combines 在 (locative) + company + 担任 (serve as) + role + 职务 — the most polished form of "I am [role] at [company]".',
      [
        { target: '担任 dānrèn', note: 'formal verb "to serve as"; takes a role/title as object' },
        { target: '职务 zhíwù', note: '"position / title"; often optional — 担任产品经理 (no 职务) is also fine' },
        { target: '担任 vs 当 vs 做', note: '担任 is formal; 当 (dāng) is everyday; 做 (zuò) is casual — same meaning, different registers' },
      ],
      [ACT.grammarResponsibility],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 主要 + V + 的 + N
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '主要 + V + 的 + N',
      'zhǔyào + V + de + N',
      'A noun-phrase construction that describes the kind of thing you mainly do/manage. Pattern: 主要 + V + 的 + N = "the N that I mainly V". 主要做的工作 ("the work I mainly do"), 主要负责的项目 ("the projects I am mainly in charge of"). The 的 + N turns the preceding clause into a noun phrase.',
      'sentence',
      '我主要做的工作是产品设计。("The work I mainly do is product design.")\n我主要负责的项目是华北区销售。("The project I am mainly in charge of is North China sales.")',
      'A polished way to describe job scope: nominalize your activity, then equate it to a concrete domain with 是.',
      [
        { target: '主要 + V + 的 + N', note: 'creates a noun phrase: "the N that I mainly V"' },
        { target: '主要做的工作', note: '"the work I mainly do" — the most common form' },
        { target: '主要负责的项目', note: '"the projects I am mainly in charge of"' },
        { target: '主要管理的团队', note: '"the team I mainly manage"' },
      ],
      [ACT.grammarScope],
    ),
    createContentItem(
      '是 + 主要…的… — scope sentence',
      'shì + zhǔyào…de… — scope sentence',
      'Embed the 主要…的… noun phrase in a 是 sentence to produce a polished one-line job-scope description: 我主要负责的是 X ("What I am mainly in charge of is X"). Mandarin\'s clean equivalent of English "What I primarily do is…" — sounds professional and modest at once.',
      'sentence',
      '我主要负责的是华北区的销售业务。\n我主要做的是后端架构设计。',
      'The construction lets you scope your role without claiming too much — "what I MAINLY do" leaves room for everything you incidentally do, which is more honest and more polite than "I do X".',
      [
        { target: '主要 V 的 + 是 + N', note: 'full pattern: "what I mainly V is N"; flexible across verbs' },
        { target: 'WHY USE IT', note: 'scopes your role honestly; sounds professional and avoids overclaiming' },
        { target: 'COMPARE 我负责 X (direct)', note: '我负责华北区销售 ("I\'m in charge of NC sales") is direct; 我主要负责的是华北区销售 ("what I\'m mainly in charge of is NC sales") is scoped and modest' },
      ],
      [ACT.grammarScope],
    ),
    createContentItem(
      '的 nominalizer',
      'de — nominalizer',
      'The particle 的 has a NOMINALIZER function in addition to its possessive role: V + 的 + N turns a verb phrase into a noun phrase modifying N. 做的工作 ("the work [I] do"), 写的报告 ("the report [I] wrote"). This is the same 的 used in possessives (我的) — context disambiguates.',
      'sentence',
      '昨天写的报告交了吗? ("Has the report [you] wrote yesterday been submitted?")\n我主要做的工作是产品设计。',
      'The V + 的 + N construction is one of the most productive in Mandarin — once you master it, you can build any relative-clause-like noun phrase.',
      [
        { target: 'V + 的 + N', note: 'turns verb phrase into noun-phrase modifier; equivalent to English "the N that I V"' },
        { target: '的 as nominalizer', note: 'attaches a clause to a head noun; the head noun comes AFTER the 的' },
        { target: '同形 of 的 (possessive)', note: 'same word 的 also marks possession (我的书); context separates the two functions' },
      ],
      [ACT.grammarScope],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '商务自我介绍',
      'shāngwù zìwǒ jièshào',
      'A complete six-sentence professional self-introduction in Mandarin. Read it aloud at conference-tempo with correct tones, sandhi, and a formal register throughout. Notice the structure: greeting + name + company + role + responsibility + closing.',
      'sentence',
      '您好！我叫李伟，是清华科技公司的员工。我在公司担任产品经理职务，目前主要负责华北区的产品推广。这是我的名片，请多指教。',
      'Translation: "Hello! My name is Li Wei, I am an employee of Tsinghua Tech Co. I serve as product manager at the company, and am currently mainly in charge of product promotion in the North China region. This is my name card — please give me much guidance."',
      [
        { target: '您好 (formal greeting)', note: 'opens with the honorific 您 — sets the formal register for the entire exchange' },
        { target: '我叫李伟 (name)', note: 'first-name introduction; "叫" is warmer than "我的名字是" while still polite' },
        { target: '是清华科技公司的员工 (membership)', note: 'identifies affiliation using 是…的员工 (Grammar I); preferred over 在…工作 for formal first introduction' },
        { target: '担任产品经理职务 (formal role)', note: '担任 + role + 职务 — formal role-statement pattern (Grammar II)' },
        { target: '目前主要负责…的产品推广 (scope)', note: '目前 + 主要 + 负责 + 的 + N (Grammar II/III) — honest scoped responsibility statement' },
        { target: '这是我的名片，请多指教', note: '名片 hand-over + standard humility closer; the prescribed business intro closing' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions matching the paragraph. Answer each in a short professional sentence using 是 / 在…负责 / 担任 patterns.',
      'sentence',
      'Q1: 李伟在哪家公司工作? Q2: 他担任什么职务? Q3: 他主要负责什么? Q4: 他是哪个区域的负责人?',
      'Four questions covering company, role, responsibility, and territorial scope — the four pieces of information always swapped on a 名片.',
      [
        { target: 'A1: 他在清华科技公司工作。', note: 'company answer using 在…工作 (Grammar I)' },
        { target: 'A2: 他担任产品经理。', note: 'role answer using 担任 (Grammar II)' },
        { target: 'A3: 他主要负责产品推广。', note: 'scoped responsibility using 主要负责' },
        { target: 'A4: 他负责华北区。', note: 'territorial scope; short answer fine in professional context' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '名片交换 (对话 — 正式)',
      'míngpiàn jiāohuàn (duìhuà — zhèngshì)',
      'A natural formal-register 名片-exchange between two engineers at a Tsinghua-hosted tech conference. Covers every pattern from this lesson: honorific greetings, formal self-introductions, 名片 etiquette, business small talk, and the polite close.',
      'conversation',
      'A (资深工程师): 您好！久仰大名。我是北京智云科技的张明，担任技术总监。这是我的名片，请多指教。\nB (你): 张总监您好！幸会幸会。我是李伟，清华科技的工程师。我也借您一张名片，请收。\nA: 谢谢。李工程师在清华科技哪个部门?\nB: 我在研发部，目前主要负责的是华北区客户端产品的开发。\nA: 很好。我们公司也在做类似的项目，最近忙吗?\nB: 还可以，项目进展顺利。贵公司呢?\nA: 我们刚启动一个跨区域的合作项目，希望以后有机会一起合作。\nB: 一定一定。我们保持联系，改天再聊。',
      'A formal eight-turn exchange between a senior engineer (A) and a younger engineer (B); register stays honorific throughout (您 used by both sides, family-name + title address, 贵公司 reference).',
      [
        { target: '久仰大名 + 幸会幸会', note: 'the formal first-meeting loop — A opens with 久仰大名, B closes with 幸会幸会' },
        { target: '担任 X 总监 / 工程师', note: '担任 + role pattern (Grammar II); used by both sides to state their position' },
        { target: '请多指教 / 请收', note: 'humility markers at the 名片 hand-over; 请收 ("please receive") softens the offering' },
        { target: '主要负责的是 X', note: 'job-scope construction (Grammar III) — used by B to scope his responsibility honestly' },
        { target: '最近忙吗? / 项目进展如何?', note: 'standard business small-talk questions; "how have you been busy?" / "how is the project going?"' },
        { target: '贵公司 vs 我们公司', note: 'honorific 贵公司 ("your honored company") for the counterpart; 我们公司 for own; never mix' },
        { target: '保持联系，改天再聊', note: 'standard formal close — keep-in-touch promise + talk-another-day' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '名片交换 (对话 — 半正式)',
      'míngpiàn jiāohuàn (duìhuà — bàn zhèngshì)',
      'A semi-formal version of the same exchange between two peer-level engineers. The register softens from 您 to 你 once both parties recognize they are peers; family-name + title address is retained. Notice the register downgrade markers.',
      'conversation',
      'A (同级工程师): 你好！我是北京智云的王强。这是我的名片。\nB (你): 你好，王工! 我是清华科技的李伟。很高兴认识你。这是我的名片。\nA: 李工在哪个部门?\nB: 研发部，主要做后端开发。你呢?\nA: 我也是研发，做前端。我们的工作有可能对接。\nB: 那太好了。回头加个微信，方便沟通。\nA: 好啊，扫一下。',
      'Peer-to-peer register: 你 instead of 您, 工 short for 工程师 as an address form, 加个微信 ("add WeChat") replacing formal "keep in touch". The shorter turns and the WeChat exchange signal peer-level relationship.',
      [
        { target: '李工 / 王工', note: 'family-name + 工 (short for 工程师) — peer address form; warmer than 工程师 but still respectful' },
        { target: '主要做后端开发', note: '主要 + 做 (Grammar II) — peer-level scoping without the formal 负责' },
        { target: '我们的工作有可能对接', note: '对接 (duìjiē, "dovetail / interface") — common business term for cross-team collaboration' },
        { target: '加个微信', note: '"add a WeChat" — the standard peer-level keep-in-touch action; replaces formal 保持联系' },
        { target: '扫一下', note: '"scan [the QR code] briefly" — universal phrase for the WeChat-friend-add action in modern Chinese business' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable six-sentence template for any Mandarin professional self-introduction. Fill in the bracketed slots with your own information — the structure carries the formal register.',
      'sentence',
      '您好！我叫 [姓名]。我是 [公司名] 的员工，在公司担任 [职务] 职务。目前我主要负责的是 [具体职责]。这是我的名片，请多指教。希望以后有机会一起合作。',
      'Six sentences cover the core: greeting, name, company affiliation, formal role, scoped responsibility, name-card offer, future-cooperation closing — the minimum complete business self-introduction.',
      [
        { target: '[姓名]', note: 'your full name — family name first, given name second for Chinese-style; transliterated full name for foreign names' },
        { target: '[公司名] 的员工', note: 'use 是…的员工 (Grammar I, membership frame) for formal first introduction' },
        { target: '担任 [职务] 职务', note: '担任 + role pattern (Grammar II); 职务 ending is optional but formal' },
        { target: '主要负责的是 [具体职责]', note: '主要…的是 scoping construction (Grammar III); fill with a CONCRETE responsibility' },
        { target: '请多指教', note: 'standard humility closer; never skip it in a formal self-intro' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 5–6 sentence professional self-introduction in Hanzi using the template. Use 在…工作 OR 是…的员工 at least once, 负责 with a concrete noun at least once, and one 主要…的… scope phrase so the writing demonstrates the core grammar of this lesson.',
      'sentence',
      '示例: 您好！我叫金智秀。我是清华科技的员工，在公司担任算法工程师职务。目前我主要负责的是推荐系统的优化与测试。这是我的名片，请多指教。希望以后有机会一起合作。',
      'Translation: "Hello! I\'m Kim Ji-su. I am an employee of Tsinghua Tech, holding the position of algorithm engineer at the company. Currently what I am mainly in charge of is the optimization and testing of the recommendation system. This is my name card — please give me much guidance. I hope we will have the chance to cooperate in the future."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '名片礼仪',
      'míngpiàn lǐyí',
      'Name-card etiquette in Mainland China business culture has strict rules: offer the card with BOTH hands, the Chinese-language side facing the receiver. The receiver also takes it with both hands, reads the card briefly (including the name and title silently), and places it carefully on the table in front of them — not in a pocket, not in a wallet — for the duration of the meeting. Writing on a received card in front of the giver is considered disrespectful.',
      'sentence',
      'DO: 双手递, 双手收, 读一下, 放在桌上.\nDON\'T: 单手递, 直接放进口袋, 当面写字, 折叠或弯曲.',
      'Each of these signals respect (or its absence) to your counterpart; non-Chinese professionals are watched closely on these small actions in first meetings.',
      [
        { target: '双手递 shuāng shǒu dì', note: 'hand over with both hands, Chinese side facing the receiver; the foundational respect gesture' },
        { target: '双手接 shuāng shǒu jiē', note: 'receive with both hands; never one-handed even if you are mid-action' },
        { target: '看一下', note: 'read the card briefly — the name and title; verbalize back to the giver ("张总监，幸会")' },
        { target: '放在桌上', note: 'place on the table in front of you for the meeting duration; signals you are studying the relationship' },
        { target: 'NEVER write on a received card in front of the giver', note: 'considered defacing; if you need to take notes, do so on your own paper' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '关系',
      'guānxi',
      'A foundational concept in Chinese business: the long-term network of mutual obligation, trust, and reciprocal favors that underpins any successful commercial relationship. Unlike Western "networking", 关系 is not transactional but cumulative — small favors over years build trust capital that is eventually drawn down for large requests. A first 名片-exchange is the START of a 关系, not a single transaction.',
      'sentence',
      '在中国做生意，关系比合同重要。("In Chinese business, guanxi is more important than the contract.")',
      'The 关系 frame explains many Chinese business behaviors that look strange to outsiders: long pre-deal dinners, gift exchanges, indirect requests, repeat meetings before any commitment.',
      [
        { target: '建立关系 jiànlì guānxi', note: '"build a relationship" — the long process; never one meeting' },
        { target: '靠关系 kào guānxi', note: '"rely on guanxi" — to get something done through one\'s network; can be neutral or critical depending on context' },
        { target: '走后门 zǒu hòumén', note: 'literal "walk the back door" — using guanxi to bypass formal procedures; has negative connotation' },
        { target: 'CONTRAST: 西方 networking', note: 'Western networking is event-based and short-term; guanxi is multi-year and obligation-based' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '面子',
      'miànzi',
      'The concept of "face" — public reputation, dignity, and social standing. In business, 给面子 (give face) means showing respect publicly; 丢面子 (lose face) means being publicly humiliated. Avoid direct disagreement, public correction of seniors, or anything that could embarrass your counterpart in front of others. Indirect language and private feedback are the rule, not the exception.',
      'sentence',
      'PUBLIC: 王总说得很有道理。(give face) / PRIVATE LATER: 王总，我有一个想法，可能值得讨论一下。(indirect correction)',
      'Two-step communication — public agreement followed by private discussion — is the standard pattern for handling disagreement with seniors.',
      [
        { target: '给面子 gěi miànzi', note: '"give face" — publicly show respect; the basic positive move' },
        { target: '丢面子 diū miànzi', note: '"lose face" — typically by being publicly corrected, contradicted, or embarrassed' },
        { target: '不给面子 bù gěi miànzi', note: '"not give face" — to publicly disrespect or refuse to play along; a serious offense' },
        { target: 'WHY IT MATTERS IN BUSINESS', note: 'a senior counterpart who loses face in a meeting may end the relationship — even if you were technically right' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '饭局文化',
      'fànjú wénhuà',
      '饭局 (fànjú, literally "meal arrangement") is the business-dinner institution: a multi-course meal — often with toasts of 白酒 (báijiǔ, sorghum liquor) — where the real relationship-building of a 关系 happens. The seating, the order of toasts, and even the timing of the meal carry signals. The first 名片 may be exchanged in the office, but the deal is sealed at the 饭局.',
      'sentence',
      'KEY ROLES: 主人 (host) sits at 主位 (head seat, facing the door); guests sit by seniority around the table. Junior people pour the 白酒 for seniors and toast first.',
      'Skipping or under-engaging with the 饭局 is a relationship-ending signal in many traditional Chinese business contexts; even non-drinkers should attend and toast with tea.',
      [
        { target: '主位 zhǔwèi', note: 'the head seat at a round table — facing the door, farthest from the entrance; reserved for the host or the most senior guest' },
        { target: '敬酒 jìngjiǔ', note: '"offer a toast"; the junior offers, the senior receives; hold your glass LOWER than the senior\'s when clinking' },
        { target: '白酒 báijiǔ', note: 'sorghum liquor — the traditional toasting drink; if you do not drink alcohol, toast with tea and explain politely' },
        { target: '买单 mǎidān', note: 'pay the bill — the host pays; offering to split is a relationship-loss signal at a business 饭局' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 清华科技会议的名片交换',
      'rènwù: Qīnghuá kējì huìyì de míngpiàn jiāohuàn',
      'Roleplay a 名片-exchange at a Tsinghua-affiliated tech conference with the AI tutor playing a senior engineer from a Beijing company. Use every skill from this lesson in one continuous scene — formal greeting, 名片 hand-over with both hands, full self-introduction with company / role / responsibility, business small talk, and a polite close.',
      'conversation',
      '[Coffee break, Tsinghua tech conference]\n资深工程师: 您好！久仰大名。我是北京智云科技的张明，担任技术总监。这是我的名片，请多指教。\n你: [双手接名片 + 看一下 + 回应称呼 + 双手递自己的名片]\n资深工程师: 谢谢。请问您在贵公司担任什么职务?\n你: [说公司 + 担任 + 职务 + 主要负责]\n资深工程师: 很好。我们公司也在做类似方向的项目，最近忙吗?\n你: [小寒暄 + 询问对方公司]\n资深工程师: 我们刚启动一个跨区域的合作项目。希望以后有机会一起合作。\n你: [保持联系 + 告别]',
      'Seven turns of fluent formal Mandarin; the AI tutor will play the senior engineer and respond to whatever you say while keeping the register honorific.',
      [
        { target: '双手接名片 + 看一下', note: '名片 etiquette — both hands, read briefly, verbalize the family name + title back to the giver' },
        { target: '在 X 担任 Y 职务', note: 'formal self-introduction pattern combining 在 (location) + 担任 (serve as) + role' },
        { target: '主要负责的是 Z', note: 'scoping construction (Grammar III) — describe your concrete responsibility honestly' },
        { target: '贵公司 vs 我们公司', note: 'honorific 贵公司 for the counterpart\'s company; never mix with 你们公司 in formal contexts' },
        { target: '保持联系 / 改天再聊', note: 'standard formal close; pairs the keep-in-touch promise with a future-meeting reference' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 转换到非正式',
      'tiǎozhàn — zhuǎnhuàn dào fēi zhèngshì',
      'Stretch goal: midway through the same scene, the senior engineer downgrades the register from 您 to 你 (a relationship-warming move). Follow their lead — switch to 你, drop one or two formal markers, and accept their WeChat-add request. Closes the loop with a peer-level rapport while preserving the family-name + title address.',
      'conversation',
      '资深工程师: 哎呀，李工，我们都是做技术的，别叫我张总监了，叫我老张就好。\n你: [accept the register downgrade + propose WeChat]\n资深工程师: 好啊，扫一下。我们以后多交流。\n你: [confirm + casual close]',
      'The 别叫我…，叫我… ("don\'t call me X, call me Y") pattern is the explicit register-downgrade move; following the senior\'s lead is the right response — never the other way around.',
      [
        { target: '别叫我 X，叫我 Y', note: 'explicit register-downgrade move; the senior offers, the junior accepts and uses the new address from that turn onward' },
        { target: '老 + surname (老张)', note: 'affectionate "old + surname" — used between long-standing peers or accepted by a senior who is opening peer-level rapport' },
        { target: '加个微信 / 扫一下', note: 'casual contact-exchange move; peer-level alternative to formal 保持联系' },
        { target: 'NEVER initiate the downgrade yourself', note: 'wait for the senior to suggest 叫我老 X — initiating it is a face-loss for both sides' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
