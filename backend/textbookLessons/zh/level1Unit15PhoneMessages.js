// Level 1 Unit 15 — Phone & Messages (Mandarin Chinese)
// Functions: making/receiving calls, sending text/voice messages, exchanging
// WeChat contacts, scheduling a meetup, polite phone phrases.
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
  orientation: 'zh-l1u15-orientation',
  pronunciation: 'zh-l1u15-pronunciation',
  vocabularyPhone: 'zh-l1u15-vocab-phone',
  vocabularyMessaging: 'zh-l1u15-vocab-messaging',
  grammarRecipient: 'zh-l1u15-grammar-recipient',
  grammarProgressive: 'zh-l1u15-grammar-progressive',
  grammarShortly: 'zh-l1u15-grammar-shortly',
  reading: 'zh-l1u15-reading',
  listening: 'zh-l1u15-listening',
  writing: 'zh-l1u15-writing',
  culture: 'zh-l1u15-culture',
  task: 'zh-l1u15-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Open and close a phone call in Mandarin and handle the standard "who is this / I am looking for…" exchange.',
      'Send and receive WeChat messages — text, voice, and video calls — with the right verbs for each channel.',
      'Schedule a meetup with a friend via WeChat: propose a time, confirm a place, agree on next steps.',
    ],
    task: 'Picture yourself at Tsinghua: you need to reach a classmate to plan a study session, but the first attempt fails. You switch to WeChat, exchange messages, and lock in a time.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce 喂 as second-tone wéi when answering the phone — distinct from the dictionary 喂 (wèi, 4th) used as a vocative "hey".',
      'Pronounce 微信 (Wēixìn) with first-tone 微 + fourth-tone 信 — the most-said brand name in modern Mandarin.',
      'Distinguish 短信 (duǎnxìn, "SMS") from 信 (xìn, "letter") — same final character, two different communication channels.',
    ],
    task: 'Read each phone phrase aloud, mark the tones, and identify the one syllable that changes tone in answering 喂.',
  },
  {
    id: ACT.vocabularyPhone,
    section: 'Vocabulary I',
    title: 'Phone calls — verbs and phrases',
    goals: [
      'Use 打电话 (place a call), 接电话 (pick up), 挂电话 (hang up) — the three lifecycle verbs of any phone call.',
      'Handle bad-line situations with 信号不好, 听不见, 没电了 — the everyday excuses for ending a call abruptly.',
      'Use the standard polite phone openers 喂, 请问您是, 我找…, 请稍等 in the right slot of a call.',
    ],
    task: 'Read each phrase aloud and pair it with the moment in a call when you would use it (opening, middle, problem, closing).',
  },
  {
    id: ACT.vocabularyMessaging,
    section: 'Vocabulary II',
    title: 'WeChat & messaging — the daily channel',
    goals: [
      'Use 微信 (WeChat) and its ecosystem verbs: 加微信 (add contact), 发消息 (send message), 回复 (reply), 删除 (delete), 屏蔽 (block).',
      'Distinguish 文字消息 (text), 语音 (voice message), 视频通话 (video call), 朋友圈 (Moments) — four channels in one app.',
      'Use 二维码 (QR code) for the 扫一扫 ritual that replaces business cards at first meetings in China.',
    ],
    task: 'Say each verb out loud and produce one short sentence pairing it with 微信 or a related noun.',
  },
  {
    id: ACT.grammarRecipient,
    section: 'Grammar I',
    title: '跟 X 打电话 / 给 X 发消息 — recipient markers',
    goals: [
      'Use 跟 (gēn) before the person you are CALLING — 我跟他打电话 ("I call him / I am on the phone with him"). 跟 implies mutual participation.',
      'Use 给 (gěi) before the person you are SENDING something TO — 我给他发消息 ("I send him a message"). 给 marks a one-way delivery.',
      'Know the rough division of labor: 跟 + 打电话/聊天 (talk together) vs 给 + 发消息/打电话/写信 (send to).',
    ],
    task: 'Write three sentences using 跟 + 打电话 and three using 给 + 发消息, then swap the prepositions and feel why one combination is more natural.',
  },
  {
    id: ACT.grammarProgressive,
    section: 'Grammar II',
    title: '在 V — currently V-ing',
    goals: [
      'Form the progressive aspect with 在 (zài) + verb to mean "currently doing": 我在开会 ("I am in a meeting"). Drop any need for tense.',
      'Combine with 呢 (ne) at the end for a softer, more conversational flavor: 我在开会呢, 等一下.',
      'Distinguish 在 + V (currently V-ing) from 在 + place + V (V-ing AT a place) — same character 在, two roles.',
    ],
    task: 'Convert three simple sentences ("I eat", "He studies", "We watch TV") into the 在 + V progressive and add the softening 呢.',
  },
  {
    id: ACT.grammarShortly,
    section: 'Grammar III',
    title: '一会儿 + V — will V in a moment',
    goals: [
      'Use 一会儿 (yīhuǐr) before a verb to promise a near-future action: 一会儿打给你 ("I\'ll call you in a bit"). The all-purpose "in a moment" phrase.',
      'Pair with 给 + recipient to say who you will call/message: 一会儿给你发 ("I\'ll send you [it] in a moment").',
      'Distinguish 一会儿 (a brief moment, minutes) from 一下 (briefly, an instant) and 等等 (wait, casual command).',
    ],
    task: 'Write three short promises using 一会儿 + verb to handle a busy moment on the phone.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a WeChat thread',
    goals: [
      'Read a 6-turn WeChat exchange between two Tsinghua classmates planning a study session.',
      'Identify each speaker\'s function: greeting, proposing, confirming, adjusting, agreeing, closing.',
    ],
    task: 'Read the thread aloud, then identify the propose / agree / adjust turns in order.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Two phone scenes',
    goals: [
      'Follow a phone call that fails mid-conversation due to bad signal — what each speaker says before switching channels.',
      'Follow a successful WeChat voice-call exchange where two friends agree on a meetup time.',
    ],
    task: 'Reproduce one scene with the tutor, swapping in your own name and a Tsinghua location.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write a WeChat message',
    goals: [
      'Write a 3–5 line WeChat message to a classmate proposing a study meetup at Tsinghua.',
      'Use at least one 跟/给 recipient marker, one 在 + V progressive, and one 一会儿 + V promise.',
    ],
    task: 'Write your own meetup proposal using the template, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'WeChat dominance, 加微信 ritual, and red envelopes',
    goals: [
      'Understand that WeChat (微信) is the dominant channel in China — SMS is rare, cold phone calls are unusual, almost everything happens in WeChat.',
      'Know the 加微信 ritual: at any first meeting (classmate, colleague, vendor) you exchange QR codes — this replaces business cards entirely.',
      'Recognize 红包 (red envelopes), 朋友圈 (Moments), 实名制 (real-name verification), and voice messages as everyday features of Chinese digital life.',
    ],
    task: 'Decide which channel to use for three scenarios: contacting a classmate, contacting a professor, contacting a delivery driver.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Schedule a meetup with a Tsinghua friend on WeChat',
    goals: [
      'Combine every skill from the lesson into one continuous WeChat exchange: open, exchange contacts, propose a time, adjust, confirm.',
      'Use the right channel for each turn — text for quick logistics, voice for warmth, a final confirmation in text.',
    ],
    task: 'Roleplay a WeChat exchange with a Tsinghua classmate; aim for 8 turns and lock in a study session at a specific Tsinghua location.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 15: 打电话和发微信 — Phone Calls and Messages',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'opening-a-call', label: 'Opening a phone call', goal: 'Use 喂 + 请问您是 / 我找… to open a call politely, identify the other party, and state who you are looking for.' },
    { id: 'adding-on-wechat', label: 'Adding someone on WeChat', goal: 'Use 加微信 + 扫一扫 to exchange QR codes and confirm the connection — the standard first-meeting move in China.' },
    { id: 'proposing-meetup', label: 'Proposing a meetup', goal: 'Use 跟 / 给 + time + place expressions to propose a meetup and confirm in two short turns.' },
    { id: 'handling-bad-signal', label: 'Handling a bad signal', goal: 'Use 信号不好 / 没电了 / 一会儿打给你 to politely end a phone call when the line breaks and promise to follow up.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can open and close a phone call, send and receive WeChat messages, exchange contacts at a first meeting, and schedule a meetup with a classmate without switching to English or rehearsing each line.',
      'word',
      'Functional language: 打电话 (call) · 接 / 挂 (pick up / hang up) · 发消息 (text) · 加微信 (add on WeChat) · 约时间 (set a time)',
      'These five micro-skills cover roughly 90% of how young adults in China communicate day to day — the rest is just vocabulary.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at Tsinghua University and need to reach a classmate to plan a study session before tomorrow\'s deadline. Your first phone call fails because of a bad signal, so you switch to WeChat — text, voice, and a final QR-code scan to lock in the time.',
      'word',
      '清华同学: "喂? 哦，信号不好，我一会儿微信你。" 你: "好，加我微信吧。"',
      'A typical mid-call switch in China: when the phone line is bad, both speakers default to WeChat without comment — it is the universal fallback.',
      [
        { target: '喂? wéi?', note: 'standard phone-answering syllable; spoken as second tone, distinct from the dictionary fourth-tone "hey"' },
        { target: '信号不好 xìnhào bù hǎo', note: 'literal "the signal is not good"; standard reason for ending a call abruptly' },
        { target: '一会儿微信你 yīhuǐr Wēixìn nǐ', note: '微信 used as a verb ("WeChat you in a moment") — extremely common in casual speech' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三种通讯方式',
      'sān zhǒng tōngxùn fāngshì',
      'Three communication channels coexist in modern China but with very different weights. WeChat (微信) covers ~95% of personal messaging — text, voice, video, payments. Phone calls (打电话) are reserved for urgent or formal matters. SMS (短信) is now almost entirely automated alerts (banks, deliveries) — humans never SMS each other.',
      'word',
      '微信 (everyday) · 电话 (urgent/formal) · 短信 (banks & deliveries only)',
      'Knowing the channel hierarchy keeps your communication culturally fluent — a stranger calling you in China usually means "this is important".',
      [
        { target: '微信 Wēixìn', note: 'WeChat — text, voice, video, Moments, payments; the everyday default' },
        { target: '电话 diànhuà', note: 'voice call; signals urgency, formality, or older speakers' },
        { target: '短信 duǎnxìn', note: 'SMS; almost exclusively automated bank/delivery alerts in modern China' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '喂',
      'wéi (answering phone) vs wèi (vocative)',
      'The character 喂 has two pronunciations. When ANSWERING the phone, it is spoken as second tone wéi — a rising, slightly questioning pitch that invites the caller to identify themselves. The dictionary form wèi (fourth tone) is used face-to-face as "hey!" to get someone\'s attention.',
      'word',
      '喂? wéi? (on the phone) vs 喂，过来一下! wèi, guòlái yīxià! (face-to-face "hey, come here!")',
      'Saying fourth-tone wèi when answering a call sounds aggressive; saying second-tone wéi face-to-face would be confusing — match the tone to the channel.',
      [
        { target: '喂? (wéi, 2nd) — on the phone', note: 'rising tone; invites identification; the universal Chinese phone-answer' },
        { target: '喂! (wèi, 4th) — in person', note: 'sharp falling tone; "hey, get over here" — slightly rude unless used with familiars' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '微信',
      'Wēixìn',
      'Brand name of WeChat — first tone 微 (wēi, "tiny / micro") + fourth tone 信 (xìn, "message"). Literally "micro-message". One of the most-said two-syllable words in modern Mandarin.',
      'word',
      '加微信 jiā Wēixìn ("add on WeChat") · 微信号 Wēixìn hào ("WeChat ID")',
      'High-level (wēi) followed by sharp-falling (xìn) — practice the contrast since this word recurs constantly.',
      [
        { target: '微 (wēi, 1st)', note: 'high level tone; "tiny / micro" — also in 微博 (Wēibó, "Weibo / micro-blog")' },
        { target: '信 (xìn, 4th)', note: 'sharp falling tone; "message / letter / belief" — appears in 短信, 信任, 自信' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '短信',
      'duǎnxìn',
      'SMS — third tone 短 (duǎn, "short") + fourth tone 信 (xìn, "message"). Note that 信 alone means a paper letter; 短信 specifically means SMS, and 微信 means WeChat. The shared 信 makes the family of "message" words easy to remember.',
      'word',
      '短信 (SMS) vs 微信 (WeChat) vs 信 (paper letter)',
      'In modern China, 短信 is almost entirely automated bank or delivery alerts — humans rarely SMS each other anymore.',
      [
        { target: '短 (duǎn, 3rd)', note: 'full dip-and-rise; "short"' },
        { target: '信 (xìn, 4th)', note: 'sharp falling; "message" — same character as in 微信' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '打电话',
      'dǎ diànhuà',
      'Three syllables: 打 (dǎ, 3rd, "to hit / to do") + 电 (diàn, 4th, "electric") + 话 (huà, 4th, "speech"). The verb 打 here is a generic action verb used with several activities (打球 play ball, 打字 type) — it does not mean "hit" literally.',
      'word',
      '我跟妈妈打电话。 wǒ gēn māma dǎ diànhuà. ("I am on the phone with mom.")',
      'Notice the rhythm 3-4-4: a dip-and-rise, then two sharp falls — typical of three-character verb phrases.',
      [
        { target: '打 (dǎ, 3rd)', note: 'generic action verb; here "to make (a call)"' },
        { target: '电话 (diànhuà, 4-4)', note: 'literally "electric speech" — phone or phone call, depending on context' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '请稍等',
      'qǐng shāo děng',
      'A three-syllable polite phrase used constantly in service contexts and on the phone: 请 (qǐng, 3rd, "please") + 稍 (shāo, 1st, "slightly") + 等 (děng, 3rd, "wait"). The third-tone sandhi between 请 and 稍 is minimal because 稍 is first tone, but the final 请稍等 has a smooth rolling rhythm.',
      'word',
      '请稍等，我帮您查一下。 qǐng shāo děng, wǒ bāng nín chá yīxià. ("Please wait, let me check for you.")',
      'Standard customer-service and phone hold phrase — feel the rolling rhythm 3-1-3 (request → modifier → action).',
      [
        { target: '请 (qǐng, 3rd)', note: 'polite request marker; appears in every formal request' },
        { target: '稍 (shāo, 1st)', note: 'a little / slightly; softens the wait request' },
        { target: '等 (děng, 3rd)', note: 'wait; the core verb' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Phone calls
    // ────────────────────────────────────────────────────────────────────
    createContentItem('打电话', 'dǎ diànhuà', 'To make a phone call — the standard verb-object compound. 打 is the generic action verb (not "hit"); 电话 is "phone / phone call". The verb takes 跟 + person for "call with X" or 给 + person for "call to X".', 'word', '我等会儿给你打电话。', '"I\'ll call you in a bit." — 给 marks the recipient; 等会儿 is the casual variant of 一会儿.', null, [ACT.vocabularyPhone]),
    createContentItem('接电话', 'jiē diànhuà', 'To pick up / answer a phone call. 接 (jiē, "to receive / to connect") is the standard verb when the phone rings and you take the call. Distinct from 打 (initiate) and 挂 (end).', 'word', '他正在开会，没接电话。', '"He is in a meeting and didn\'t pick up." — common explanation when a call goes unanswered.', null, [ACT.vocabularyPhone]),
    createContentItem('挂电话', 'guà diànhuà', 'To hang up — 挂 (guà, "to hang") + 电话. Used both for ending a call politely and, colloquially, for hanging up on someone in anger. Context determines tone.', 'word', '我先挂了，一会儿微信你。', '"I\'m hanging up now, I\'ll WeChat you in a bit." — typical mid-conversation handoff to WeChat.', null, [ACT.vocabularyPhone]),
    createContentItem('喂', 'wéi', 'The Chinese equivalent of "hello?" on the phone — spoken with a second-tone rising pitch that invites the caller to identify themselves. Universal opener; used for every incoming call regardless of formality.', 'word', '喂? 你好，请问您是哪位?', '"Hello? Who is this, please?" — the standard polite opener.', null, [ACT.vocabularyPhone]),
    createContentItem('请问您是', 'qǐng wèn nín shì…', 'A polite formula for asking who is calling — literally "may I ask, you are…?". Used in service contexts and when answering an unknown number. The honorific 您 signals respect.', 'word', '请问您是哪位? — 我是清华大学的王明。', '"May I ask who is calling? — This is Wang Ming from Tsinghua." — formal first-turn exchange.', null, [ACT.vocabularyPhone]),
    createContentItem('我找', 'wǒ zhǎo…', 'Used to state whom you want to speak with — literally "I am looking for…". 我找王老师 ("I\'m looking for Teacher Wang") is how you ask to be connected to a specific person at an office.', 'word', '喂? 你好，我找王老师。', '"Hello, I\'m looking for Teacher Wang." — standard request to be connected at an office switchboard.', null, [ACT.vocabularyPhone]),
    createContentItem('请稍等', 'qǐng shāo děng', 'Please wait a moment — the standard hold phrase. Three syllables, all functionally polite. Use 稍等 alone in casual contexts and 请稍等 in formal/service contexts.', 'word', '请稍等，我帮您转接。', '"Please hold, I\'ll transfer you." — standard office-receptionist phrase.', null, [ACT.vocabularyPhone]),
    createContentItem('您能听见吗', 'nín néng tīngjiàn ma', 'Can you hear me? — polite version using the honorific 您. The casual peer version is 你能听见吗 or just 听得见吗. Standard mid-call check when the line is choppy.', 'word', '您能听见吗? 信号好像不太好。', '"Can you hear me? The signal seems bad." — frames a potential disconnect as the line\'s fault, not the speaker\'s.', null, [ACT.vocabularyPhone]),
    createContentItem('信号不好', 'xìnhào bù hǎo', 'Bad signal — literal "the signal is not good". The universal Chinese excuse for ending a call abruptly. Always blame the signal, never the listener — face-saving etiquette.', 'word', '不好意思，信号不好，我一会儿打给你。', '"Sorry, bad signal, I\'ll call you back in a bit." — the canonical "I need to end this call" line.', null, [ACT.vocabularyPhone]),
    createContentItem('没电了', 'méi diàn le', 'Out of battery — literal "no electricity, [change-of-state]". The 了 marks the change from charged to uncharged. Used to explain a sudden hang-up or to preempt one.', 'word', '我手机快没电了，我们微信聊吧。', '"My phone is almost out of battery, let\'s chat on WeChat." — proactive channel switch before the line dies.', null, [ACT.vocabularyPhone]),
    createContentItem('听不见', 'tīng bu jiàn', '"Cannot hear" — the potential-complement form 听 (hear) + 不 (cannot) + 见 (perceive). Distinct from 没听见 (didn\'t hear, past tense). Used during a call to signal that you literally cannot make out what the other person is saying.', 'word', '喂? 你说什么? 我听不见。', '"Hello? What did you say? I can\'t hear you." — common when the signal drops mid-sentence.', null, [ACT.vocabularyPhone]),
    createContentItem('再说一遍', 'zài shuō yī biàn', 'Please say it again — literally "again say one time". 一遍 is the measure word for "one round" of an action. Polite to add 麻烦您 (excuse me) in formal contexts: 麻烦您再说一遍.', 'word', '不好意思，再说一遍? 我没听清。', '"Sorry, again? I didn\'t catch that." — standard request to repeat without admitting full incomprehension.', null, [ACT.vocabularyPhone]),
    createContentItem('电话号码', 'diànhuà hàomǎ', 'Phone number — 电话 (phone) + 号码 (number). The casual shortened form is just 号码 or even just 你的号. In China, mobile numbers are 11 digits, usually starting with 1.', 'word', '你的电话号码是多少?', '"What\'s your phone number?" — 多少 ("how much") is used for numbers in Mandarin.', null, [ACT.vocabularyPhone]),
    createContentItem('转接', 'zhuǎnjiē', 'To transfer (a call) — used by receptionists and switchboards. 转 (turn) + 接 (connect). The casual version is just 接 + 给 + person: 我接给王老师 ("I\'ll pass you to Teacher Wang").', 'word', '我帮您转接到王老师的办公室。', '"I\'ll transfer you to Teacher Wang\'s office." — standard receptionist phrase.', null, [ACT.vocabularyPhone]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: WeChat & messaging
    // ────────────────────────────────────────────────────────────────────
    createContentItem('微信', 'Wēixìn', 'WeChat — the dominant messaging app in China, used for ~95% of personal and professional communication. Functions as text, voice, video, social feed (Moments), and digital wallet all in one. The English brand name is "WeChat"; Chinese speakers always say 微信.', 'word', '我们加个微信吧。', '"Let\'s exchange WeChat." — 加个微信 is the canonical phrase for connecting at any first meeting.', null, [ACT.vocabularyMessaging]),
    createContentItem('加微信', 'jiā Wēixìn', 'To add someone on WeChat — 加 (add) + 微信. The standard verb phrase for the exchange-contacts ritual at first meetings, business cards being effectively obsolete in China.', 'word', '初次见面，加个微信吧。', '"First time meeting — let\'s add each other on WeChat." — replaces "let me give you my card" entirely.', null, [ACT.vocabularyMessaging]),
    createContentItem('二维码', 'èrwéimǎ', 'QR code — literal "two-dimensional code". The everyday infrastructure of Chinese digital life: scan a 二维码 to add a WeChat friend, pay a bill, board a train, or order food. Pronounced clearly with all three tones.', 'word', '扫一下我的二维码。', '"Scan my QR code." — 扫一下 ("give it a scan") is the casual command form.', null, [ACT.vocabularyMessaging]),
    createContentItem('扫一扫', 'sǎo yī sǎo', 'The scan function in WeChat — literal "scan one scan", a reduplicated verb form. As a feature name, it is fixed. As a command, you can also say 扫一下 (same meaning, slightly less app-specific).', 'word', '你扫我，还是我扫你?', '"You scan me, or I scan you?" — typical micro-negotiation at the moment of exchange.', null, [ACT.vocabularyMessaging]),
    createContentItem('发消息', 'fā xiāoxi', 'To send a message — 发 (send / dispatch) + 消息 (news / message). The all-purpose verb phrase for sending any text via WeChat. Take 给 + recipient: 我给你发消息 ("I\'ll send you a message").', 'word', '我给你发了消息，你看到了吗?', '"I sent you a message — did you see it?" — common follow-up when no reply has come.', null, [ACT.vocabularyMessaging]),
    createContentItem('发短信', 'fā duǎnxìn', 'To send an SMS — 发 + 短信. In modern China, this almost exclusively means automated alerts (banks, deliveries); humans use 微信 for personal text. If a friend says 我给你发短信, expect something formal or unusual.', 'word', '银行给我发了一条短信。', '"The bank sent me an SMS." — typical 短信 use case: automated alert, not human chat.', null, [ACT.vocabularyMessaging]),
    createContentItem('回复', 'huífù', 'To reply — 回 (return) + 复 (respond). Used for any return message (text, email, voice). Casual peer version is just 回 (回我一下 "get back to me").', 'word', '我等下回复你。', '"I\'ll reply to you in a bit." — typical mid-conversation deferral.', null, [ACT.vocabularyMessaging]),
    createContentItem('删除', 'shānchú', 'To delete — 删 (remove) + 除 (eliminate). Used for messages, contacts, photos, files. To unfriend on WeChat is 删除好友 (literally "delete friend").', 'word', '我把那个消息删了。', '"I deleted that message." — 把-construction puts the object in front for emphasis.', null, [ACT.vocabularyMessaging]),
    createContentItem('屏蔽', 'píngbì', 'To block / mute — used for blocking a contact, muting a group chat, or hiding someone from your Moments. Less drastic than 删除; the connection stays, but messages and posts are hidden.', 'word', '我屏蔽了那个群。', '"I muted that group." — common way to handle noisy WeChat groups without leaving them.', null, [ACT.vocabularyMessaging]),
    createContentItem('语音', 'yǔyīn', 'Voice message — literal "voice sound". Voice messages (up to 60 seconds each) are extremely common in China — many users prefer them to typing, especially older speakers. Send by holding the microphone button in any WeChat chat.', 'word', '我发个语音给你，打字太慢了。', '"I\'ll send you a voice message — typing is too slow." — common cultural framing of voice as faster than text.', null, [ACT.vocabularyMessaging]),
    createContentItem('视频通话', 'shìpín tōnghuà', 'Video call — 视频 (video) + 通话 (conversation). The WeChat video-call button is one tap away in any chat; video is the default way families and remote couples stay in touch.', 'word', '晚上我们视频吧。', '"Let\'s do a video call tonight." — 视频 used as a verb in casual speech.', null, [ACT.vocabularyMessaging]),
    createContentItem('朋友圈', 'péngyǒu quān', 'Moments — WeChat\'s social-feed feature, literal "friends circle". Posts (photos, short videos, links) are visible only to your WeChat friends, making it more private than open social media. Posting is 发朋友圈; viewing is 看朋友圈.', 'word', '她刚发了朋友圈，去看看。', '"She just posted to Moments — go check it out." — typical casual reference to a new post.', null, [ACT.vocabularyMessaging]),
    createContentItem('红包', 'hóngbāo', 'Red envelope — in WeChat, a small digital gift of money sent in a chat or group. Originated in Spring Festival tradition, now used year-round for thanks, congratulations, or just for fun. Recipients tap the envelope animation to claim.', 'word', '生日快乐! 给你发个红包。', '"Happy birthday! Sending you a red envelope." — typical casual gift gesture.', null, [ACT.vocabularyMessaging]),
    createContentItem('微信号', 'Wēixìn hào', 'WeChat ID — the unique identifier of a WeChat account. Can be shared as text or by QR code. Distinct from 手机号 (phone number); WeChat IDs are usually a chosen username, not a number.', 'word', '我的微信号是 sarah_qhua。', '"My WeChat ID is sarah_qhua." — typical readout when exchanging by text instead of QR.', null, [ACT.vocabularyMessaging]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: Recipient markers 跟 / 给
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '跟 X 打电话',
      'gēn X dǎ diànhuà',
      '跟 (gēn) marks a person you are DOING something WITH — mutual participation. With phone calls, 跟 implies you and the person are both on the line, talking together. Used with 打电话, 聊天 (chat), 说话 (speak), 见面 (meet).',
      'sentence',
      '我跟妈妈打电话。 wǒ gēn māma dǎ diànhuà. ("I am on the phone with mom.")',
      'Notice: 跟 + person + V indicates a TWO-WAY action; the focus is on the joint activity, not on delivery.',
      [
        { target: '跟 (gēn)', note: 'with — marks a co-participant in a joint action' },
        { target: '跟妈妈打电话', note: '"on the phone with mom" — joint conversation, not one-way delivery' },
        { target: '跟朋友聊天', note: '"chat with a friend" — same co-participant pattern' },
      ],
      [ACT.grammarRecipient],
    ),
    createContentItem(
      '给 X 发消息',
      'gěi X fā xiāoxi',
      '给 (gěi) marks a person you are SENDING something TO — one-way delivery. With messages, 给 implies you are dispatching content; whether they reply is a separate matter. Used with 发消息, 写信, 打电话 (when emphasizing direction), 送 (gift), 买 (buy for).',
      'sentence',
      '我给你发消息。 wǒ gěi nǐ fā xiāoxi. ("I\'ll send you a message.")',
      'Notice: 给 + person + V indicates ONE-WAY delivery; the focus is on you giving something, not on joint action.',
      [
        { target: '给 (gěi)', note: 'to / for — marks the recipient of a one-way delivery' },
        { target: '给你发消息', note: '"send you a message" — one-way; you dispatch, they receive' },
        { target: '给妈妈打电话', note: '"call mom" — emphasizes you initiating the call to her, vs 跟妈妈打电话 (already on the line together)' },
      ],
      [ACT.grammarRecipient],
    ),
    createContentItem(
      '跟 vs 给 with 打电话',
      'gēn vs gěi with dǎ diànhuà',
      'With 打电话, both 跟 and 给 work but with different nuance. 给他打电话 = "I\'ll call him" (focus on initiating, future-leaning). 跟他打电话 = "I\'m on the phone with him" (focus on the ongoing joint conversation). Native speakers swap freely; both are correct.',
      'sentence',
      '我一会儿给他打电话。 ("I\'ll call him in a bit.") vs 我正在跟他打电话。 ("I\'m on the phone with him right now.")',
      'A subtle distinction: 给 leans future/directional, 跟 leans present/joint — but in casual speech they overlap.',
      [
        { target: '给 + person + 打电话', note: 'directional: "call (someone)" — focus on the act of calling out' },
        { target: '跟 + person + 打电话', note: 'joint: "be on the phone with (someone)" — focus on the ongoing conversation' },
        { target: 'In practice', note: 'both are acceptable; advanced learners pick by nuance' },
      ],
      [ACT.grammarRecipient],
    ),
    createContentItem(
      '其他动词',
      'qítā dòngcí',
      'The same recipient logic extends to other communication verbs. Use 给 with directional verbs (发, 写, 寄, 转账): 给他发消息, 给他写信, 给他转账. Use 跟 with mutual verbs (聊, 说话, 商量, 见面): 跟他聊天, 跟他商量.',
      'sentence',
      '给 + 发/写/寄/转账 (one-way) vs 跟 + 聊/说/商量/见面 (mutual)',
      'A simple memory aid: 给 = "give to" → directional; 跟 = "with" → mutual.',
      [
        { target: '给他发消息', note: 'one-way: I send, he receives' },
        { target: '给他写信', note: 'one-way: I write, the letter goes to him' },
        { target: '跟他聊天', note: 'mutual: we are chatting together' },
        { target: '跟他商量', note: 'mutual: we discuss together' },
      ],
      [ACT.grammarRecipient],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 在 V progressive
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '在 V — currently V-ing',
      'zài + V — progressive aspect',
      'Place 在 (zài) directly BEFORE the verb to express that the action is happening NOW or at the moment of reference. Mandarin has no verb conjugation; aspect markers like 在 do the work that English -ing does.',
      'sentence',
      '我在开会。 wǒ zài kāihuì. ("I am in a meeting.") 他在睡觉。 ("He is sleeping.")',
      'The single most useful "I can\'t talk right now" pattern — every Chinese phone user uses it daily.',
      [
        { target: '在 + V', note: 'progressive aspect marker; placed before the verb' },
        { target: '我在开会', note: '"I am in a meeting" — the canonical phone excuse' },
        { target: '他在睡觉', note: '"he is sleeping" — explains why he hasn\'t picked up' },
        { target: 'No tense change', note: 'Mandarin verbs do not conjugate; 在 alone signals "right now"' },
      ],
      [ACT.grammarProgressive],
    ),
    createContentItem(
      '在 V 呢',
      'zài + V + ne',
      'Add the soft particle 呢 (ne) at the end of a 在 V sentence to give it a conversational, relaxed feel — like a soft "actually, you know, I\'m…". Common in phone explanations: 我在开会呢, 等一下 ("I\'m in a meeting, hold on").',
      'sentence',
      '我在开会呢，等一下。 wǒ zài kāihuì ne, děng yī xià. ("I\'m in a meeting, hold on.")',
      'The 呢 softens the message — without it, "我在开会" sounds slightly clipped; with it, the tone is friendly and explanatory.',
      [
        { target: '呢 (ne)', note: 'soft sentence-final particle; adds conversational warmth' },
        { target: '在 V 呢 frame', note: 'standard friendly form for "actually, I\'m doing X right now"' },
        { target: 'Compare', note: '我在开会 (clipped, factual) vs 我在开会呢 (warm, explanatory)' },
      ],
      [ACT.grammarProgressive],
    ),
    createContentItem(
      '正在 V',
      'zhèngzài + V — emphatic progressive',
      'For an even more emphatic "right at this very moment", use 正在 + V instead of plain 在 + V. 正在 emphasizes simultaneity — used in slightly more formal or written contexts. In casual speech, just 在 is sufficient.',
      'sentence',
      '我正在跟客户开会，一会儿打给你。 ("I\'m in the middle of a client meeting — I\'ll call you back in a bit.")',
      'Use 正在 in business contexts; use 在 in casual peer contexts. Same meaning, different register.',
      [
        { target: '在 V', note: 'casual progressive; everyday use' },
        { target: '正在 V', note: 'emphatic progressive; "right at this very moment"; more formal' },
        { target: '正在 + 跟…开会', note: 'business-register variant of "in a meeting"' },
      ],
      [ACT.grammarProgressive],
    ),
    createContentItem(
      '在 + place vs 在 + V',
      'zài + place vs zài + V',
      'The same character 在 has two grammatical roles. 在 + PLACE means "AT a place" (我在家 "I\'m at home"). 在 + VERB means "currently V-ing" (我在吃饭 "I\'m eating"). Native speakers parse by context; learners may briefly confuse them.',
      'sentence',
      '我在家。 ("I\'m at home.") vs 我在吃饭。 ("I\'m eating.") vs 我在家吃饭。 ("I\'m eating at home.")',
      'In the third example, 在 appears twice — first marking the place, then implicitly framing the activity.',
      [
        { target: '在 + place', note: 'location preposition: "at / in"' },
        { target: '在 + V', note: 'progressive aspect: "currently V-ing"' },
        { target: '在 + place + V', note: 'combined: "V-ing at a place"; the place comes between 在 and the verb' },
      ],
      [ACT.grammarProgressive],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 一会儿 + V
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '一会儿 V',
      'yīhuǐr + V — V in a moment',
      'Place 一会儿 (yīhuǐr, "a short while") BEFORE a verb to promise a near-future action, typically minutes to an hour out. The standard "I\'ll do X in a bit" pattern — used constantly on the phone, in messages, and in casual planning.',
      'sentence',
      '一会儿打给你。 yīhuǐr dǎ gěi nǐ. ("I\'ll call you in a bit.")',
      'The casual variant is 等会儿 (děng huìr); the more formal variant is 过一会儿 (guò yīhuǐr).',
      [
        { target: '一会儿 (yīhuǐr)', note: 'a short while; minutes to an hour out' },
        { target: '一会儿 + V', note: 'I\'ll do V in a bit; standard near-future promise' },
        { target: '等会儿 (děng huìr)', note: 'casual peer variant; same meaning' },
        { target: '过一会儿 (guò yīhuǐr)', note: 'slightly more formal variant; same meaning' },
      ],
      [ACT.grammarShortly],
    ),
    createContentItem(
      '一会儿 + 给 X V',
      'yīhuǐr gěi X V — I\'ll V to X in a moment',
      'Combine the 一会儿 promise with the 给 recipient marker for the full "I\'ll do X TO Y in a bit" frame. 一会儿给你发 ("I\'ll send you [it] in a moment") works for any kind of delivery.',
      'sentence',
      '我一会儿给你发地址。 ("I\'ll send you the address in a moment.")',
      'The canonical mid-conversation handoff: promise to deliver something specific shortly.',
      [
        { target: '一会儿 + 给 + person + V', note: 'I\'ll V to (person) in a moment; recipient marker + near-future promise' },
        { target: '一会儿给你发', note: '"I\'ll send you (it) in a bit" — common deferral when you can\'t deliver immediately' },
        { target: '一会儿给你打', note: '"I\'ll call you in a bit" — same frame applied to phone calls' },
      ],
      [ACT.grammarShortly],
    ),
    createContentItem(
      '一会儿 vs 一下 vs 等等',
      'yīhuǐr vs yīxià vs děng děng',
      'Three near-future time expressions with subtly different uses. 一会儿 = "in a short while" (minutes to an hour). 一下 = "briefly / for a moment" (a few seconds to a minute, often softens an action). 等等 = "wait, wait" (an interjection, not a time phrase).',
      'sentence',
      '一会儿打给你 ("call you in a bit"); 看一下 ("take a quick look"); 等等，我没听清 ("wait, I didn\'t catch that")',
      'A common learner mistake: using 一下 for a planned future ("I\'ll call you in 一下" — wrong; should be 一会儿).',
      [
        { target: '一会儿 (yīhuǐr)', note: 'a short while; minutes to an hour; for planning' },
        { target: '一下 (yīxià)', note: 'briefly; softens a verb, very short duration; not used for planning ahead' },
        { target: '等等 (děng děng)', note: 'wait! wait! — interjection used mid-conversation' },
      ],
      [ACT.grammarShortly],
    ),
    createContentItem(
      '一会儿见',
      'yīhuǐr jiàn',
      'A standard casual farewell meaning "see you in a bit" — when you know you\'ll meet the same person shortly. The 见 (jiàn, "see / meet") + time pattern produces a family of farewells: 一会儿见, 明天见 ("see you tomorrow"), 下次见 ("see you next time").',
      'sentence',
      '好，一会儿见! ("OK, see you in a bit!")',
      'Pair with concrete plans — saying 一会儿见 without an actual plan to meet sounds vague.',
      [
        { target: '一会儿见', note: 'see you in a bit; assumes a concrete upcoming meetup' },
        { target: '明天见', note: 'see you tomorrow; assumes daily encounter' },
        { target: '下次见', note: 'see you next time; vaguer, used when no time is set' },
      ],
      [ACT.grammarShortly],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '微信聊天记录',
      'Wēixìn liáotiān jìlù',
      'A 6-turn WeChat exchange between two Tsinghua classmates planning a study session. Read it aloud with correct tones and identify each speaker\'s function — propose, agree, adjust, confirm.',
      'conversation',
      '莎拉: 你在干嘛?\n王明: 我在图书馆呢。\n莎拉: 一起复习吗? 我也快到了。\n王明: 好啊! 我在三楼，靠窗户。\n莎拉: 给我发个位置吧。\n王明: 发了，一会儿见。',
      'Translation: "Sarah: What are you up to? Wang Ming: I\'m at the library. Sarah: Want to study together? I\'m almost there. Wang Ming: Sure! I\'m on the 3rd floor by the window. Sarah: Send me your location. Wang Ming: Sent, see you in a bit."',
      [
        { target: '你在干嘛? nǐ zài gàn ma?', note: 'casual "what are you up to?" — 干嘛 is the colloquial form of 干什么' },
        { target: '我在图书馆呢', note: 'progressive 在 + place; the softening 呢 makes the answer conversational' },
        { target: '一起复习吗?', note: '"want to study together?" — yes/no question with 吗' },
        { target: '给我发个位置', note: '"send me your location" — 位置 (wèizhi) is the WeChat-specific "share location" feature' },
        { target: '一会儿见', note: 'casual farewell that assumes you\'ll meet within the hour' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions matching the WeChat thread. Answer each in a short sentence using a 是 statement or a verb phrase. Full sentences are not required for natural Mandarin chat-tone answers.',
      'sentence',
      'Q1: 莎拉在哪里? Q2: 王明在做什么? Q3: 他们要做什么? Q4: 王明在图书馆的哪儿?',
      'One location question, one progressive question, one purpose question, one specific-location question — covering the lesson\'s core grammar.',
      [
        { target: 'A1: 她快到图书馆了。', note: '"She is almost at the library." — uses 快…了 ("about to") for imminent arrival' },
        { target: 'A2: 他在图书馆复习。', note: '"He is studying at the library." — 在 + place + V combined' },
        { target: 'A3: 他们要一起复习。', note: '"They are going to study together." — 要 + V marks intention' },
        { target: 'A4: 三楼，靠窗户。', note: '"3rd floor, by the window." — short specific-location answer' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '电话场景 — 信号不好',
      'diànhuà chǎngjǐng — xìnhào bù hǎo',
      'A phone call between two Tsinghua classmates that fails mid-conversation due to bad signal — a typical scenario that ends with switching to WeChat. Notice how 信号不好 is offered as the universal face-saving exit.',
      'conversation',
      '莎拉: 喂?\n王明: 喂，莎拉，我是王明。你在哪儿?\n莎拉: 我在图书馆门口，你呢?\n王明: 喂? 你能听见吗? 信号不太好。\n莎拉: 听不清，再说一遍?\n王明: 我说我马上到。你… 喂?\n莎拉: 信号不好，我加你微信吧。\n王明: 好，扫我二维码。',
      'A natural failed-call exchange — both speakers default to WeChat the moment the signal becomes unreliable.',
      [
        { target: '喂? wéi?', note: 'second-tone phone-answering syllable; rising pitch' },
        { target: '你能听见吗? nǐ néng tīngjiàn ma?', note: '"can you hear me?" — casual peer version of the polite 您能听见吗' },
        { target: '信号不太好', note: '"signal is not great" — 不太 softens "not" to "not very", less abrupt than 不好' },
        { target: '马上到', note: '"arriving right away" — 马上 ("immediately") + 到 ("arrive")' },
        { target: '加你微信', note: '"add you on WeChat" — 加 + person + 微信 is the canonical phrase' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '微信场景 — 约时间',
      'Wēixìn chǎngjǐng — yuē shíjiān',
      'A WeChat voice-call exchange where two friends successfully agree on a meetup time. Uses the full Grammar I-II-III set: 给 recipient, 在 + V progressive, and 一会儿 + V near-future.',
      'conversation',
      '莎拉: 喂，王明，你现在有空吗?\n王明: 嗯，我在咖啡馆，刚坐下。\n莎拉: 那我过去找你吧。\n王明: 好啊! 你大概几点能到?\n莎拉: 一会儿吧，二十分钟左右。\n王明: 好，那我先点杯咖啡等你。\n莎拉: 好，一会儿见!\n王明: 一会儿见。',
      'Notice the rhythm: status check → location → invitation → commitment → time → confirmation — six clean turns.',
      [
        { target: '有空吗? yǒu kòng ma?', note: '"are you free?" — 空 (kòng) means "free time / spare time"' },
        { target: '刚坐下 gāng zuòxià', note: '"just sat down" — 刚 (gāng) marks an action that just happened' },
        { target: '过去找你 guòqù zhǎo nǐ', note: '"come over to find you" — 过去 ("go over") + 找 ("look for")' },
        { target: '大概几点 dàgài jǐ diǎn', note: '"around what time" — 大概 ("approximately") + 几点 ("what time")' },
        { target: '一会儿吧，二十分钟左右', note: '"in a bit — about 20 minutes"; 左右 ("about / around") softens the estimate' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '微信消息模板',
      'Wēixìn xiāoxi múbǎn',
      'A reusable 4-line WeChat message template for proposing a meetup. Fill in the bracketed slots with your own details — the structure carries the rest. Includes a recipient marker, a progressive 在, and a near-future 一会儿.',
      'sentence',
      '你好! 我现在在 [地点]，[正在做的事]。一会儿能 [活动] 吗? 给我回个消息吧。',
      'Four sentences cover the core: greeting, current status, proposal, response request — the minimum complete meetup ping.',
      [
        { target: '[地点]', note: 'your current location — a Tsinghua building, café, or campus landmark' },
        { target: '[正在做的事]', note: '在 + V; what you\'re currently doing (在复习 studying, 在喝咖啡 drinking coffee)' },
        { target: '[活动]', note: 'the activity you\'re proposing (一起吃饭 eat together, 一起复习 study together)' },
        { target: '给我回个消息', note: 'closing call-to-action; 回个消息 means "send me a reply"' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 3–5 line WeChat message proposing a meetup at Tsinghua. Use at least one 跟/给 recipient marker, one 在 + V progressive, and one 一会儿 + V promise so the writing demonstrates all three grammar points.',
      'sentence',
      '示例: 你好! 我现在在三教旁边的咖啡馆，在等朋友。一会儿一起吃晚饭吗? 给我发个消息吧。',
      'Translation: "Hi! I\'m at the café next to Building 3 right now, waiting for a friend. Want to grab dinner together in a bit? Send me a message."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '微信主导',
      'Wēixìn zhǔdǎo',
      'WeChat (微信) dominates Chinese communication in a way no single app dominates in the West. ~95% of personal messages, ~80% of business communication, and a huge share of mobile payments happen inside WeChat. SMS is for bank alerts; cold phone calls are unusual; everyone defaults to 微信.',
      'sentence',
      '中国人基本都用微信，发短信只是收银行通知。',
      '"Chinese people basically all use WeChat — SMS is just for receiving bank notifications." A typical native-speaker framing.',
      [
        { target: '微信 (WeChat)', note: 'dominant channel: text, voice, video, Moments, payments, mini-programs' },
        { target: '短信 (SMS)', note: 'used almost exclusively for automated bank/delivery alerts' },
        { target: '电话 (phone call)', note: 'reserved for urgent or formal matters; a cold call from a stranger usually means "this is important"' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '加微信',
      'jiā Wēixìn',
      'The 加微信 ritual is the modern Chinese equivalent of exchanging business cards. At any first meeting — classmate, colleague, vendor, even a casual acquaintance — both parties pull out their phones, open WeChat, and scan each other\'s QR codes. Saying "let\'s add WeChat" (加个微信吧) at the end of any conversation is normal and expected.',
      'sentence',
      '认识你很高兴! 我们加个微信吧。',
      '"Nice to meet you! Let\'s add each other on WeChat." — the canonical end-of-first-meeting closer in China.',
      [
        { target: '加微信 (the ritual)', note: 'replaces business cards entirely; expected at most first meetings' },
        { target: '扫一扫 (scan)', note: 'the WeChat scan feature; both parties scan each other\'s QR code in seconds' },
        { target: '微信号 (WeChat ID)', note: 'alternative to scanning — you can share by typing the ID directly' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '语音消息文化',
      'yǔyīn xiāoxi wénhuà',
      'Voice messages are extremely popular in China — many users, especially older speakers, prefer holding the mic button to typing on a small keyboard. A typical chat thread mixes text and 60-second voice clips. The downside: voice messages are hard to skim, can\'t be searched, and are awkward in public — leading to one of the small daily tensions of Chinese digital life.',
      'sentence',
      '我妈每次都给我发语音，太长了我都听不完。',
      '"My mom always sends me voice messages — they\'re so long I can\'t finish listening." — a typical Gen Z complaint about parental voice messages.',
      [
        { target: '语音 (voice message)', note: 'up to 60 seconds each; common, but hard to skim or search' },
        { target: '文字 (text)', note: 'younger speakers often prefer text for efficiency' },
        { target: 'Mixed thread', note: 'most WeChat conversations mix both freely depending on the speaker\'s preference and context' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '红包文化',
      'hóngbāo wénhuà',
      'Red envelopes (红包) originated in Spring Festival tradition as gifts of money from elders to juniors. WeChat\'s digital 红包 feature, launched in 2014, made the tradition year-round and viral — friends send small 红包 as thanks, congratulations, jokes, or random fun. Group 红包 split a sum randomly among group members, creating a small game.',
      'sentence',
      '今天我生日，发个红包庆祝一下。',
      '"It\'s my birthday today — sending a red envelope to celebrate." — a typical casual use.',
      [
        { target: '红包 (red envelope)', note: 'a small digital gift of money sent in WeChat chats or groups' },
        { target: '群红包', note: 'group red envelope; split randomly among members — small game-like element' },
        { target: '春节红包', note: 'Spring Festival red envelope; traditional gift from elders to juniors' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '实名制',
      'shímíngzhì',
      'All Chinese mobile numbers and WeChat accounts require real-name verification (实名制) — they are tied to a national ID. This makes social media in China very different from the anonymous Western model: every comment, every payment, every login can be traced to a real person. Practically, this means most users behave more carefully online, and account-sharing or creating fake accounts is much harder.',
      'sentence',
      '在中国手机号、微信、支付宝都要实名制。',
      '"In China, phone numbers, WeChat, and Alipay all require real-name verification." — a fact every newcomer learns within their first week.',
      [
        { target: '实名 (real name)', note: 'tied to your government-issued ID' },
        { target: '匿名 (anonymous)', note: 'mostly not possible on Chinese platforms; a key cultural difference from the West' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 跟清华同学约时间',
      'rènwù: gēn Qīnghuá tóngxué yuē shíjiān',
      'Roleplay an 8-turn WeChat exchange with a Tsinghua classmate. Combine every skill from this lesson into one continuous scene — exchange contacts, propose a time, handle a small scheduling conflict, and confirm. Use the right channel for each turn: text for logistics, voice for warmth, a final confirmation in text.',
      'conversation',
      '[Tsinghua, after class]\n清华同学: 我们加个微信吧。\n你: [agree + offer to scan]\n清华同学: 我扫你的码吧。\n你: [confirm + send first message later]\n— Later that evening —\n你: [open + propose study session]\n清华同学: 我明天下午要上课，晚上行吗?\n你: [adjust + propose specific time]\n清华同学: 好，那六点图书馆见。\n你: [confirm + use 一会儿/明天见 farewell]',
      'Eight turns of mixed-channel exchange; the tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: '加微信', note: 'open by exchanging QR codes; the standard first-meeting move' },
        { target: '在 + V', note: 'use the progressive to explain your status (在上课, 在复习)' },
        { target: '给 / 跟 + V', note: 'mark the recipient with the right preposition' },
        { target: '一会儿 / 一下', note: 'use near-future or brief-action time markers correctly' },
        { target: '六点图书馆见', note: 'concrete confirmation: time + place + 见 — locks in the meetup' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 处理信号问题',
      'tiǎozhàn — chǔlǐ xìnhào wèntí',
      'Stretch goal: in the same exchange, your phone call gets cut off because of a bad signal. Politely end the call using 信号不好, promise to follow up using 一会儿微信你, and continue on WeChat without losing the thread.',
      'conversation',
      '你: 喂? 王明，你能听见吗?\n清华同学: 喂… 莎拉? 你说什么? 我听不见。\n你: 信号不好，我一会儿微信你。\n清华同学: 好，挂了挂了。\n— Switch to WeChat —\n你: [continue planning the meetup in WeChat]',
      'A natural mid-conversation channel switch; in China, this is the universal fallback when a call goes wrong.',
      [
        { target: '信号不好', note: 'the face-saving exit line; blames the signal, not the listener' },
        { target: '一会儿微信你', note: '微信 used as a verb; promises follow-up in the dominant channel' },
        { target: '挂了挂了', note: 'casual "I\'m hanging up now"; doubling the verb softens the abruptness' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
