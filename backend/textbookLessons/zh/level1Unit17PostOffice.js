// Level 1 Unit 17 — Post Office & Delivery (Mandarin Chinese)
// Functions: sending packages and letters at a post office, using express
// delivery services, addressing parcels, asking about cost and delivery time,
// describing package contents.
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
  orientation: 'zh-l1u17-orientation',
  pronunciation: 'zh-l1u17-pronunciation',
  vocabularyPost: 'zh-l1u17-vocab-post',
  vocabularyDelivery: 'zh-l1u17-vocab-delivery',
  grammarBa: 'zh-l1u17-grammar-ba',
  grammarGei: 'zh-l1u17-grammar-gei',
  grammarDao: 'zh-l1u17-grammar-dao',
  reading: 'zh-l1u17-reading',
  listening: 'zh-l1u17-listening',
  writing: 'zh-l1u17-writing',
  culture: 'zh-l1u17-culture',
  task: 'zh-l1u17-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Send a package, letter, or postcard from a Chinese post office or express-delivery counter, picking the right service for your budget and deadline.',
      'Use the 把 (bǎ) construction to say "send X to Y" — your first encounter with one of Mandarin\'s most distinctive grammar patterns.',
      'Ask the three core delivery questions (cost, time, destination) and understand the reply well enough to choose between China Post, SF Express, and a parcel locker pickup.',
    ],
    task: 'Picture yourself in a Tsinghua University dorm with a wrapped birthday gift for a friend in Shanghai — by the end of this lesson you can ship it via 顺丰 SF Express end-to-end in Mandarin.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce 寄 (jì) with sharp fourth-tone fall — the core verb for "to send/mail" and the action you will say more than any other in this lesson.',
      'Distinguish the dental 收 (shōu, "receive") from the palatal 寄 (jì, "send") — j/q/x vs zh/ch/sh contrast is critical for the sender/recipient pair.',
      'Pronounce 快递 (kuàidì) and 包裹 (bāoguǒ) cleanly — 包裹 has the dropped-medial complication where 裹 starts with the retroflex-like guttural g- before a rounded o.',
    ],
    task: 'Read each example aloud three times, then identify which initial pair (j/q/x palatal vs zh/ch/sh retroflex) each syllable uses.',
  },
  {
    id: ACT.vocabularyPost,
    section: 'Vocabulary I',
    title: 'Post office, mail, and addresses',
    goals: [
      'Use the 10 core post-office nouns: 邮局, 邮筒, 包裹, 信, 明信片, 邮票, 信封, 地址, 邮编, 单号.',
      'Distinguish 邮局 (post office, government-run) from 快递点 (private courier pickup point) — same idea, very different infrastructure in modern China.',
    ],
    task: 'For each noun, say one sentence in which you actually use it (e.g., "I write the address on the envelope").',
  },
  {
    id: ACT.vocabularyDelivery,
    section: 'Vocabulary II',
    title: 'Delivery services, actions, and parties',
    goals: [
      'Use the 10 core verbs and people-nouns: 寄, 收, 取, 送, 到, 装, 称, 快递员, 寄件人, 收件人.',
      'Distinguish the four key services that dominate Chinese shipping: 中国邮政 (state postal), 顺丰 SF Express (premium private), 普通快递 (generic e-commerce courier), and 快递柜 (24-hour parcel locker pickup).',
    ],
    task: 'Pair each service (邮政, 顺丰, 普通, 快递柜) with the type of package you would send through it.',
  },
  {
    id: ACT.grammarBa,
    section: 'Grammar I',
    title: '把 (bǎ) — moving the object before the verb',
    goals: [
      'Use the 把 construction: Subject + 把 + Object + Verb + (result/destination). 我把包裹寄给上海的朋友 ("I send the package to my friend in Shanghai").',
      'Understand that 把 is used when something is DONE TO the object — when there is a clear disposal, transfer, change of state, or destination involved.',
      'Know that 把 sentences almost always require a result complement after the verb (寄给 X, 放到 X里, 寄到 X) — never bare 我把包裹寄.',
    ],
    task: 'Convert three standard SVO sentences into 把 sentences, then identify the result complement in each.',
  },
  {
    id: ACT.grammarGei,
    section: 'Grammar II',
    title: '给 + person + V — do V for/to someone',
    goals: [
      'Use 给 (gěi) before a person to mark the recipient or beneficiary: 给朋友寄包裹 ("send a package to a friend"). Recap from Unit 8 in a new context.',
      'Combine 给 with the verb 寄 in the most common Chinese sending pattern: 寄给 X (send to X), which can be either a directional complement (我寄给他) or a 把 pattern (我把包裹寄给他).',
      'Distinguish 给 X 寄 (do the sending for X — X may be the sender or the recipient depending on context) from 寄给 X (send to X — X is unambiguously the recipient).',
    ],
    task: 'Write three sentences each using 寄给 X, 给 X 寄, and 给 X 打电话 — feel the position-difference between 给 X V and V 给 X.',
  },
  {
    id: ACT.grammarDao,
    section: 'Grammar III',
    title: 'V + 到 + place — verb to a destination',
    goals: [
      'Attach 到 + place as a directional complement after a verb of motion or transfer: 寄到上海 ("mail to Shanghai"), 送到家 ("deliver to home"), 走到学校 ("walk to school").',
      'Distinguish the verb 到 ("arrive at") from the result complement 到 (attached to another verb to add a destination). 包裹到了 = "the package arrived"; 寄到上海 = "mail to Shanghai".',
      'Combine V + 到 + place inside a 把 sentence for the most natural full mailing sentence: 我把这个包裹寄到上海 ("I send this package to Shanghai").',
    ],
    task: 'Combine 寄, 送, or 取 with 到 + a Chinese city or address; produce five different sentences.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a shipping label',
    goals: [
      'Read a complete 顺丰 SF Express shipping label aloud, naming sender, recipient, addresses, contents, weight, service type, and tracking number.',
      'Answer comprehension questions about the label using short complete sentences in Mandarin.',
    ],
    task: 'Read the label aloud, then answer five comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Sending a package at the counter',
    goals: [
      'Follow a 7-turn customer-clerk dialogue at a 顺丰 counter, identifying every information request from the clerk and every choice from the customer.',
      'Reproduce the dialogue swapping in your own destination, contents, and service preference.',
    ],
    task: 'Read the dialogue with the tutor first, then perform it again with your own package details swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Address a package and write a short note',
    goals: [
      'Write a complete Chinese-format address with all six fields: 收件人, 收件人地址, 收件人电话, 寄件人, 寄件人地址, 寄件人电话.',
      'Write a 3–4 sentence note to go inside the package using V + 给 + person and the 把 construction at least once.',
    ],
    task: 'Address a package to a friend at another Chinese university and write a short note to go inside.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Why China is the busiest delivery country on Earth',
    goals: [
      'Know that Taobao\'s 11/11 Singles Day (双十一 Shuāng Shíyī) generates billions of packages in 24 hours — China runs the largest e-commerce delivery operation in human history.',
      'Know that 快递柜 (parcel lockers) are now ubiquitous in residential compounds and dorm complexes, replacing the daily-mailbox model that English speakers expect.',
      'Know the reputation hierarchy: 顺丰 SF Express = premium fast and reliable; 京东 JD Logistics = fast in-house e-commerce; 通达系 (the "Tong-Da" family — 中通, 圆通, 申通, 韵达) = cheap mass-market; 中国邮政 = state-run, slower but cheapest internationally.',
    ],
    task: 'Pick one common shipping scenario (gift to friend, document to office, return to Taobao seller) and pick the courier you would use plus the reason.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Ship a birthday gift from your Tsinghua dorm',
    goals: [
      'Combine vocabulary, 把 construction, 给-recipient, and V + 到 + place into one continuous post-office scene with no break between request, information, payment, and tracking.',
      'Use the correct service choice and explain it briefly — 顺丰 for a fragile/urgent gift, 邮政 for cost-sensitive shipping, 普通快递 for casual items.',
    ],
    task: 'Roleplay shipping a birthday gift from your Tsinghua dorm to a friend in Shanghai using 顺丰; aim for a 7-turn exchange with the tutor playing the clerk.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 17: 寄包裹 — Post Office and Delivery',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'sending-package', label: 'Sending a package', goal: 'Walk up to a 邮局 or 快递 counter and request shipping using 我想把这个包裹寄到 X with the right service choice.' },
    { id: 'asking-cost-and-time', label: 'Asking cost and delivery time', goal: 'Ask 多少钱? and 多长时间能到? and follow the reply well enough to confirm or switch services.' },
    { id: 'describing-contents', label: 'Describing package contents', goal: 'Answer 里面是什么? naturally — name the items and flag fragile/food/clothes status when relevant.' },
    { id: 'picking-up-package', label: 'Picking up a package', goal: 'Use 取包裹 / 取件 with a tracking number (单号) or pickup code at a 快递柜 parcel locker.' },
  ],
  relatedPools: ['topic-society', 'topic-daily-life'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson you can walk into a Chinese post office or express-delivery counter, request a service, describe your package, hear the price and delivery time, and complete the transaction — all in Mandarin, without rehearsing each line.',
      'word',
      'Functional language: 寄包裹 jì bāoguǒ (send a package) · 选服务 xuǎn fúwù (pick a service) · 问价钱时间 wèn jiàqián shíjiān (ask price and time) · 描述内容 miáoshù nèiróng (describe contents) · 取件 qǔ jiàn (pick up)',
      'Five micro-skills that map directly to the five moments of every Chinese shipping transaction; after this lesson all five should feel automatic.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'A friend at Fudan University in Shanghai turns 22 next week. You bought a small wrapped gift and want to ship it from your Tsinghua dorm. The whole transaction at the 顺丰 counter takes about three minutes; you will need every micro-skill from this lesson.',
      'word',
      '快递员: "您好，寄到哪儿? 里面是什么?" — 你: "寄到上海，是一份生日礼物。"',
      'A typical 顺丰 counter opener: greeting + destination question + contents question, all in one turn — Chinese clerks move fast and bundle questions.',
      [
        { target: '寄到哪儿? jì dào nǎr?', note: '"mail to where?" — the universal opening question; you must answer with a city or full address' },
        { target: '里面是什么? lǐmiàn shì shénme?', note: 'mandatory contents question; affects pricing and customs/safety routing' },
        { target: '一份生日礼物 yí fèn shēngrì lǐwù', note: 'standard way to describe a gift package; 一份 is the measure word for a gift "set" or "portion"' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三种寄递选择',
      'sān zhǒng jìdì xuǎnzé',
      'Chinese shipping splits into three rough tiers. 中国邮政 (China Post): state-run, cheapest, slowest, the international choice. 顺丰/京东: premium private, fast, expensive, white-glove. 通达系 (中通/圆通/申通/韵达 + 极兔): cheap mass-market e-commerce delivery, slower than 顺丰 but everywhere.',
      'word',
      '中国邮政 (cheap/slow) · 顺丰 SF Express (premium fast) · 通达系 (e-commerce mass-market)',
      'Pick by priority: if speed/safety matters → 顺丰; if cost matters → 通达系 or 邮政; if shipping abroad → 邮政 EMS.',
      [
        { target: '中国邮政 Zhōngguó Yóuzhèng', note: 'state postal service; only practical option for many international destinations; cheaper but slower domestically' },
        { target: '顺丰 SF Express', note: 'premium private courier; ~2x price of generic couriers but next-day in most major cities; the default choice for important shipments' },
        { target: '通达系 Tōng-Dá xì', note: 'umbrella name for the cheap private couriers (中通, 圆通, 申通, 韵达, 极兔) that handle most Taobao/JD e-commerce; cheap but variable service quality' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '寄',
      'jì',
      'A sharp falling fourth-tone palatal initial: j /tɕ/. The single most-used verb in this lesson — "to send by mail/courier". Always involves a transport service; if the action is hand-delivery, use 送 (sòng) instead.',
      'word',
      '我要寄一个包裹。Wǒ yào jì yí ge bāoguǒ. ("I want to send a package.")',
      'The j-initial (palatal) is one of the three j/q/x sounds learners often confuse with the retroflex zh/ch/sh; keep tongue flat and forward.',
      [
        { target: 'j /tɕ/ initial', note: 'palatal; tongue flat and forward against the upper teeth, no retroflex curl' },
        { target: 'ì fourth tone', note: 'sharp falling from high to low; keep it crisp, not soft' },
        { target: '寄 vs 送', note: '寄 = send via postal/courier service; 送 = hand-deliver, drop off, escort' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '收',
      'shōu',
      'A first-tone retroflex initial: sh /ʂ/. The mirror-verb of 寄 — "to receive". Same syllable structure as the English speaker would expect for "shoe" but with the tongue curled back and a steady high pitch.',
      'word',
      '我收到了你的包裹。Wǒ shōu dào le nǐ de bāoguǒ. ("I received your package.")',
      'The sh-initial (retroflex) is the counterpart to the palatal x/j/q — your tongue tip CURLS BACK rather than staying flat.',
      [
        { target: 'sh /ʂ/ initial', note: 'retroflex; tongue tip curled back to the roof of the mouth' },
        { target: 'ōu compound final', note: 'glides from mid-back o into rounded u; similar to English "oh" but lips more rounded' },
        { target: '收 vs 寄', note: '收 = receive (incoming); 寄 = send (outgoing); the sender/recipient pair you will use constantly in this lesson' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '快递',
      'kuàidì',
      'Two fourth-tone syllables back to back: high-low, high-low. Means "express delivery" — the dominant word in modern Chinese shipping, used much more often than 邮政 or 邮件 in daily life. Doubles as a noun (the delivery), a service category, and even a job title (快递员 delivery person).',
      'word',
      '我用顺丰快递。Wǒ yòng Shùnfēng kuàidì. ("I use SF Express courier.")',
      'Two crisp falls in a row create a clipped, business-like rhythm; do not soften the second fall or it merges into a neutral tone.',
      [
        { target: 'kuài 快 (4th)', note: '"fast" — the speed root that makes the whole word feel "express"' },
        { target: 'dì 递 (4th)', note: '"to deliver, hand over" — the action root' },
        { target: '4th + 4th rhythm', note: 'both syllables fully stressed; the rhythm is staccato, not flowing' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '包裹',
      'bāoguǒ',
      'A first-tone 包 followed by a third-tone 裹. The standard formal word for "package/parcel" — what you would write on a label or use with a clerk. Casual speech often uses 快件 (kuàijiàn) instead. 裹 is one of the trickier characters in this lesson: g-initial + uo glide + 3rd tone.',
      'word',
      '这个包裹要寄到上海。Zhè ge bāoguǒ yào jì dào Shànghǎi. ("This package needs to be mailed to Shanghai.")',
      'When 包裹 is followed by another third-tone syllable (e.g., 包裹很重), the 裹 stays full third tone because it ends its own breath group.',
      [
        { target: 'bāo 包 (1st)', note: 'high level; means "wrap/bundle" — the root of "wrapping" and "package"' },
        { target: 'guǒ 裹 (3rd)', note: 'dip-and-rise; g-initial + uo glide; tongue tip stays low' },
        { target: '包裹 vs 快件', note: '包裹 = formal "package" used on labels and with clerks; 快件 = casual "express item" used in everyday speech' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '寄到',
      'jì dào',
      'Two fourth tones back to back: 寄 (sharp fall) + 到 (sharp fall). The core V + 到 + place construction for "mail TO a place". Said with strong rhythm — both syllables fully stressed.',
      'word',
      '我把包裹寄到广州。Wǒ bǎ bāoguǒ jì dào Guǎngzhōu. ("I mail the package to Guangzhou.")',
      'No sandhi here — 不 sandhi affects 不 only; consecutive fourth tones in normal vocabulary stay as written.',
      [
        { target: 'jì 寄 (4th)', note: 'sharp falling fourth tone; "to mail/send via courier"' },
        { target: 'dào 到 (4th)', note: 'sharp falling fourth tone; here it is the result complement marking destination' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Post-office items
    // ────────────────────────────────────────────────────────────────────
    createContentItem('邮局', 'yóujú', 'Post office — specifically the state-run 中国邮政 branches. In modern China these handle mostly bill payments, registered mail, and international parcels; everyday domestic shipping now happens at private 快递 counters or self-service 快递柜.', 'word', '邮局在哪儿? Yóujú zài nǎr?', '"Where is the post office?" — basic location question.', null, [ACT.vocabularyPost]),
    createContentItem('中国邮政', 'Zhōngguó Yóuzhèng', 'China Post — the state-run national postal service. Universally trusted for international shipping (EMS) and registered government mail; slower and cheaper than private couriers domestically.', 'word', '我用中国邮政寄国际包裹。', '"I use China Post for international packages." — the typical international-shipping default for Chinese residents.', null, [ACT.vocabularyPost]),
    createContentItem('邮筒', 'yóutǒng', 'Public mailbox — those green cylindrical drop boxes once common on street corners. Now rare in urban China because almost no one drops outgoing mail anymore; private couriers come to you.', 'word', '现在街上很少看见邮筒了。', '"You rarely see mailboxes on the streets anymore" — a generational shift; mailboxes belong to the pre-2010 era.', null, [ACT.vocabularyPost]),
    createContentItem('包裹', 'bāoguǒ', 'Package, parcel — the formal noun used on labels, in courier-clerk dialogue, and in shipping rules. In casual speech you may also hear 快件 (kuàijiàn, "express item") or just 件 (jiàn).', 'word', '这个包裹有点儿重。', '"This package is a bit heavy" — typical observation; 有点儿 softens to "a bit".', null, [ACT.vocabularyPost]),
    createContentItem('信', 'xìn', 'A letter (written correspondence). Rarely sent in modern China except for formal documents, official notices, and sentimental occasions; almost all daily communication has moved to WeChat.', 'word', '我给爷爷写了一封信。', '"I wrote a letter to my grandfather" — note 一封 (yī fēng) is the measure word for letters.', null, [ACT.vocabularyPost]),
    createContentItem('明信片', 'míngxìnpiàn', 'Postcard — three-syllable compound literally "bright/clear letter slip". Still popular in tourist contexts (sending from a famous city) and among collectors, but never used for everyday communication.', 'word', '我从西安寄了一张明信片。', '"I sent a postcard from Xi\'an" — note 一张 (yī zhāng) is the measure word for flat items.', null, [ACT.vocabularyPost]),
    createContentItem('邮票', 'yóupiào', 'Postage stamp. You buy them at 邮局 windows; most domestic letters need 1.2 yuan, international postcards need around 5-6 yuan. Stamp collecting (集邮) used to be a popular hobby; now it is mostly a niche.', 'word', '我要一张五块钱的邮票。', '"I want one 5-yuan stamp" — 块钱 (kuàiqián) is the spoken form of "yuan" used in casual prices.', null, [ACT.vocabularyPost]),
    createContentItem('信封', 'xìnfēng', 'Envelope — literal "letter seal". Still required for any formal letter; sold in 邮局 and stationery shops. Note that 信封 is the physical envelope, while 信 alone is the letter inside.', 'word', '把信放进信封里。', '"Put the letter into the envelope" — typical instruction; 进...里 = into the inside of.', null, [ACT.vocabularyPost]),
    createContentItem('地址', 'dìzhǐ', 'Address — the literal "land mark", used for both physical and digital (email/web) addresses. Always required when shipping; the clerk will ask 详细地址 (xiángxì dìzhǐ, "detailed address") to mean street level, not just city.', 'word', '请填一下您的详细地址。', '"Please fill in your detailed address" — what the clerk says when the form is incomplete.', null, [ACT.vocabularyPost]),
    createContentItem('邮编', 'yóubiān', 'Postal code (postcode/ZIP) — short for 邮政编码. Six digits in mainland China (e.g., 100084 = Tsinghua University area). Still printed on forms; in practice, the courier system now relies more on detailed address than on the 邮编.', 'word', '清华大学的邮编是 100084。', '"Tsinghua University\'s postal code is 100084" — a useful real-life data point.', null, [ACT.vocabularyPost]),
    createContentItem('单号', 'dānhào', 'Tracking number — literal "order number". The string of 10–13 digits printed on every 快递 label; you enter it into the courier\'s app or 微信 mini-program to track the package and arrange pickup.', 'word', '把单号发给我，我帮你查一下。', '"Send me the tracking number, I\'ll check for you" — a friend\'s typical offer.', null, [ACT.vocabularyPost]),
    createContentItem('易碎品', 'yìsuìpǐn', 'Fragile item — literal "easy-to-break good". Declare this verbally at the counter; the clerk will add bubble wrap and a 易碎 sticker. Glass, ceramics, electronics, and bottled liquids all count.', 'word', '里面是易碎品，请小心。', '"There are fragile items inside, please be careful" — the standard request after declaring 易碎品.', null, [ACT.vocabularyPost]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Delivery services, actions, parties
    // ────────────────────────────────────────────────────────────────────
    createContentItem('快递', 'kuàidì', 'Express delivery — the dominant modern Chinese shipping concept; covers both the service category and (as 快件) the package itself. By far the most common word in this lesson; 邮件 (yóujiàn) sounds old-fashioned.', 'word', '我每天都收快递。', '"I receive express deliveries every day" — typical urban-China experience; e-commerce drives constant package flow.', null, [ACT.vocabularyDelivery]),
    createContentItem('顺丰', 'Shùnfēng', 'SF Express — China\'s premium private courier, founded in 1993, known for speed (often next-day domestic), reliability, and uniform-clad couriers. Costs ~2x the cheap couriers but trusted for valuable, fragile, or time-sensitive shipments.', 'word', '重要的东西我用顺丰寄。', '"For important things I ship via SF Express" — the standard reasoning among Chinese consumers.', null, [ACT.vocabularyDelivery]),
    createContentItem('普通快递', 'pǔtōng kuàidì', 'Generic e-commerce express delivery — the cheap mass-market category covering 中通, 圆通, 申通, 韵达, 极兔, 百世. Slower than 顺丰 (typically 2–4 days), but more than adequate for most Taobao orders. Sometimes called 通达系.', 'word', '普通快递便宜一点，但慢。', '"Generic express is a little cheaper but slower" — the classic budget-vs-speed tradeoff.', null, [ACT.vocabularyDelivery]),
    createContentItem('快递柜', 'kuàidìguì', '24-hour parcel locker — those tall multi-compartment cabinets in almost every Chinese residential compound, university dorm, and office building. The courier drops your package in, sends you a 取件码 (pickup code) via SMS, and you collect it whenever.', 'word', '我的包裹放在快递柜了，取件码是 456789。', '"My package is in the parcel locker, pickup code is 456789" — typical SMS notification text.', null, [ACT.vocabularyDelivery]),
    createContentItem('寄', 'jì', 'To send (via mail or courier). The defining verb of this lesson — used whenever a transport service is involved. For hand-delivering, use 送 instead; for digital sending, use 发 (fā) or 寄送 (jìsòng) in formal writing.', 'word', '请把这个寄到上海。', '"Please mail this to Shanghai" — the most common single sentence at a courier counter.', null, [ACT.vocabularyDelivery]),
    createContentItem('收', 'shōu', 'To receive. The mirror verb of 寄. Often appears in the result form 收到 (shōudào, "received successfully") to confirm a package has reached its destination.', 'word', '你收到包裹了吗?', '"Did you receive the package?" — natural follow-up text after the tracking shows delivery.', null, [ACT.vocabularyDelivery]),
    createContentItem('取', 'qǔ', 'To pick up, fetch. Used for collecting a package from a 快递柜 locker or a 快递点 pickup point — the action you complete with the SMS pickup code in your hand. Different from 拿 (ná, generic "take/grab").', 'word', '我下楼去取快递。', '"I am going downstairs to pick up the package" — typical dorm-life sentence.', null, [ACT.vocabularyDelivery]),
    createContentItem('送', 'sòng', 'To deliver, drop off, see (someone) off. In a shipping context, this is what the courier does on the receiving end (送到门口 "deliver to the door"). Different from 寄 (which uses a courier service) — 送 is hand-delivery.', 'word', '快递员把包裹送到了门口。', '"The courier delivered the package to the door" — what 送到门 (door-to-door delivery) means.', null, [ACT.vocabularyDelivery]),
    createContentItem('到', 'dào', 'To arrive at; (as result complement) to a destination. Two uses in this lesson: standalone verb (包裹到了 "the package arrived") and attached to other verbs as a destination marker (寄到上海, 送到家). Critical for Grammar III.', 'word', '包裹昨天到了。', '"The package arrived yesterday" — standalone-verb use.', null, [ACT.vocabularyDelivery]),
    createContentItem('装', 'zhuāng', 'To pack, load, install. Used for putting items into a box (把东西装进盒子) before shipping. Different from 包 (bāo, "to wrap" — the outer wrapping action) and 放 (fàng, generic "to place").', 'word', '我把礼物装在一个盒子里。', '"I pack the gift in a box" — preparation step before shipping.', null, [ACT.vocabularyDelivery]),
    createContentItem('称', 'chēng', 'To weigh (something). What the clerk does to your package to determine the shipping fee; the action 称重 (chēng zhòng, "weigh-weight") is the full verb-object form. Different from 重 (zhòng, the adjective "heavy").', 'word', '麻烦您称一下包裹。', '"Please weigh the package for me" — polite request to the clerk; 麻烦您 softens an imposition.', null, [ACT.vocabularyDelivery]),
    createContentItem('快递员', 'kuàidìyuán', 'Delivery person, courier — literal "express-delivery-staff-member". A high-volume, high-pressure urban job; couriers ride electric scooters with stacked packages, hit ~80–150 deliveries a day, and earn per-package. Tipping is not expected; saying 辛苦了 (xīnkǔ le, "you\'ve worked hard") is appreciated.', 'word', '快递员给我打电话了。', '"The courier called me" — standard pre-delivery notification.', null, [ACT.vocabularyDelivery]),
    createContentItem('寄件人', 'jìjiànrén', 'Sender — literal "send-item-person". Field on every shipping label; you write your own info here. Contrasts with 收件人 (recipient).', 'word', '寄件人请写姓名和电话。', '"Sender please write name and phone number" — what the form asks for.', null, [ACT.vocabularyDelivery]),
    createContentItem('收件人', 'shōujiànrén', 'Recipient — literal "receive-item-person". Field on every shipping label; you write the destination person\'s info here. The 收/寄 pair is the most important contrast on any Chinese shipping form.', 'word', '收件人姓什么?', '"What\'s the recipient\'s last name?" — what the clerk asks when filling the label.', null, [ACT.vocabularyDelivery]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 把 construction
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '把 — disposal construction',
      'bǎ — disposal construction',
      'The 把 construction is one of Mandarin\'s most distinctive grammatical features. It moves the OBJECT before the VERB to highlight what is being DONE TO that object. Word order: Subject + 把 + Object + Verb + (result complement). The simple SVO sentence 我寄包裹 (I send a package) becomes 把-form 我把包裹寄出去 (I send the package out) when there is a clear action result on the object.',
      'sentence',
      'SVO: 我寄包裹。("I send a package.")\n把-form: 我把包裹寄到上海。("I send the package to Shanghai.")',
      'Use 把 when the action visibly changes, moves, or disposes of the object — and there is a complement after the verb explaining how.',
      [
        { target: '把 = "take/grasp"', note: 'historical meaning of 把 as a verb; in modern grammar it just signals "take this object and DO something to it"' },
        { target: 'word order', note: 'Subject + 把 + Object + Verb + Result/Destination — the object hops in front of the verb' },
        { target: 'when to use 把', note: 'when the object is specific (this/that/the particular X) AND there is a clear result of the action on it' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      '把 needs a complement',
      'bǎ requires a complement after the verb',
      'CRITICAL RULE: a 把 sentence almost always requires a complement after the verb — a destination (寄到 X), a recipient (寄给 X), a result (放好), a duration, or a quantity. A bare verb after 把 sounds incomplete. 我把包裹寄 is wrong; you need 我把包裹寄到上海 or 我把包裹寄出去 or 我把包裹寄给他.',
      'sentence',
      'WRONG: 我把包裹寄。\nRIGHT: 我把包裹寄到上海。/ 我把包裹寄给朋友。/ 我把包裹寄出去了。',
      'The verb after 把 is never naked — the result complement is what makes the construction grammatical.',
      [
        { target: 'V + 到 + place', note: 'destination complement; 寄到上海, 送到家, 放到桌子上' },
        { target: 'V + 给 + person', note: 'recipient complement; 寄给朋友, 送给老师, 卖给客户' },
        { target: 'V + 完 / 好 / 出去 / 了', note: 'result complements; 寄出去 (sent out), 装好 (packed up), 寄完了 (finished sending)' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      '把 with specific objects',
      'bǎ with definite/specific objects',
      'The object after 把 must be SPECIFIC — usually marked with 这/那/这个/那个 or otherwise clearly identifiable from context. You can say 我把这个包裹寄到上海 ("send THIS package to Shanghai") but not normally 我把一个包裹寄到上海 (a vague "a package"). For vague new objects, use plain SVO: 我寄一个包裹到上海.',
      'sentence',
      'GOOD: 我把这个包裹寄到上海。("I send this package to Shanghai.")\nGOOD: 我把生日礼物寄给朋友了。("I sent the birthday gift to my friend.")\nAWKWARD: 我把一个包裹寄到上海。',
      'Definiteness is the rule: 把 introduces a known specific item; for new/unknown items use plain SVO.',
      [
        { target: '这个/那个 + noun', note: 'the most common 把-object pattern; "this/that X"' },
        { target: 'noun with possessive', note: '"my X", "his X" — clearly identifiable; 把我的包裹寄出去' },
        { target: 'noun with prior mention', note: 'in context — "the package (we were just talking about)"' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      '把 + negation',
      'negation of bǎ sentences',
      'Negate a 把 sentence by placing 不/没 BEFORE 把, never before the verb. 我没把包裹寄出去 ("I did not send the package out") — correct. 我把包裹没寄出去 — wrong. The negator scopes over the whole 把 phrase.',
      'sentence',
      'GOOD: 我没把包裹寄出去。("I haven\'t sent the package out yet.")\nWRONG: 我把包裹没寄出去。',
      '不 vs 没: 没 = past/completed-action negation ("haven\'t / didn\'t"); 不 = general/present/future or habitual ("won\'t / don\'t").',
      [
        { target: '没 + 把', note: 'past/completion: "have not sent it"; the most common 把-negation in everyday speech' },
        { target: '不 + 把', note: 'volitional: "will not send it" or "do not send it" (instruction)' },
        { target: 'negation position', note: 'negator always BEFORE 把, never between 把 and the verb' },
      ],
      [ACT.grammarBa],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 给 + person + V
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '给 + person + V',
      'gěi + person + verb',
      'The particle 给 (gěi) marks the recipient or beneficiary of an action. Pattern: Subject + 给 + person + Verb + (object). 我给妈妈寄一份礼物 ("I send Mom a gift" / "I send a gift to Mom"). This was first introduced in Unit 8 (shopping) and now extends to mailing/delivery contexts.',
      'sentence',
      '我给朋友寄包裹。("I send a package to a friend.")\n我给妈妈打电话。("I call Mom.")\n我给老师写信。("I write a letter to the teacher.")',
      'A versatile pattern: the same 给-X-V order works with 寄 (mail), 送 (deliver), 打电话 (call), 写信 (write a letter), 买 (buy).',
      [
        { target: '给 + person', note: 'person who receives or benefits from the action' },
        { target: 'verb after person', note: 'the action you do for/to them' },
        { target: 'object last', note: 'what you give, send, write — comes after the verb' },
      ],
      [ACT.grammarGei],
    ),
    createContentItem(
      '寄给 X',
      'jì gěi X — send to X',
      'A tightly bound alternative pattern: V-给-X. The verb 寄 fuses with 给 + recipient into a single verb-complement phrase: 我寄给朋友一个包裹 ("I send my friend a package") or 我把包裹寄给朋友 ("I send the package to my friend"). 寄给 acts as the verb; the recipient follows immediately.',
      'sentence',
      '我寄给朋友一个包裹。("I send my friend a package.")\n我把包裹寄给朋友。("I send the package to my friend.") — 把 form.',
      '寄给 X and 给 X 寄 are both grammatical and often interchangeable, but they have a subtle focus difference (next item explains).',
      [
        { target: '寄给 = V + 给', note: 'verb + recipient particle fused into one phrasal verb' },
        { target: 'word order', note: 'Subject + 寄给 + recipient + object — recipient comes right after the verb' },
        { target: 'combines with 把', note: 'the 把 form is preferred when the object is specific: 我把包裹寄给朋友' },
      ],
      [ACT.grammarGei],
    ),
    createContentItem(
      '给 X 寄 vs 寄给 X',
      'gěi X jì vs jì gěi X',
      'Both patterns mean "send to X" and are largely interchangeable in beginner Mandarin. Subtle distinction: 给 X 寄 puts more emphasis on FOR WHOM you are doing the action (the recipient is foregrounded), while 寄给 X treats 寄给 as a unified action and feels more matter-of-fact. In casual speech 寄给 is slightly more common.',
      'sentence',
      '我给妈妈寄了一份礼物。("I sent Mom a gift" — emphasis on the recipient.)\n我寄给妈妈一份礼物。("I sent a gift to Mom" — neutral statement.)',
      'For a Level 1 learner: pick whichever feels more natural; native speakers use both freely.',
      [
        { target: '给 X 寄', note: 'recipient-first; emphasis on whom you are doing the favor for' },
        { target: '寄给 X', note: 'unified verb-recipient phrase; emphasis on the sending action itself' },
        { target: 'in 把 sentences', note: 'almost always use 寄给 X form: 我把这个寄给小李' },
      ],
      [ACT.grammarGei],
    ),
    createContentItem(
      '给 — multi-use particle',
      'gěi — versatile preposition',
      '给 has three related uses already encountered in earlier units: (1) the verb "to give" (我给你一本书 "I give you a book"); (2) the recipient/beneficiary preposition (我给你打电话 "I call you"); (3) the recipient marker in V-给-X (我寄给你 "I send to you"). All three feel related — they all mark "the person something goes to" in some sense.',
      'sentence',
      '(1) 我给你一支笔。(I give you a pen.)\n(2) 我给你打电话。(I call you / I will phone you.)\n(3) 我寄给你一封信。(I send you a letter.)',
      'The unifying meaning is "transfer to a person" — money, an item, a phone call, a letter, an action.',
      [
        { target: 'give (verb)', note: 'standalone verb; "I give X to Y"' },
        { target: 'for/to (preposition)', note: 'precedes the verb; "I do V for/to person"' },
        { target: 'V-给 (complement)', note: 'follows the verb; "send-to / pass-to / pay-to person"' },
      ],
      [ACT.grammarGei],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: V + 到 + place
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'V + 到 + place',
      'verb + dào + destination',
      '到 attaches directly after a verb of motion or transfer to specify the DESTINATION the action reaches. Pattern: Subject + Verb + 到 + place. 寄到上海 ("mail TO Shanghai"), 送到家 ("deliver TO home"), 走到学校 ("walk TO school"). The 到 here is a result complement, not a separate verb.',
      'sentence',
      '我寄到上海。("I mail to Shanghai.")\n快递员送到门口。("The courier delivers to the door.")\n我走到学校。("I walk to school.")',
      'V + 到 + place is one of Mandarin\'s most common ways to express "to a place"; works with most motion and transfer verbs.',
      [
        { target: 'V + 到 (result complement)', note: '到 attached to the verb adds "successfully reaching" the place' },
        { target: 'place after 到', note: 'city, address, room, or any noun denoting a destination' },
        { target: 'common verbs', note: '寄 (mail), 送 (deliver), 走 (walk), 开 (drive), 跑 (run), 飞 (fly) all combine with 到' },
      ],
      [ACT.grammarDao],
    ),
    createContentItem(
      '到 as verb vs result',
      'dào as standalone verb vs result complement',
      'Two distinct uses of 到 to distinguish: (1) standalone verb 到 = "to arrive at" — 包裹到了 ("the package arrived"); (2) result complement 到 attached to another verb = "to a destination" — 寄到上海 ("mail to Shanghai"). Same character, different syntactic role.',
      'sentence',
      '(1) 包裹到了。Bāoguǒ dào le. ("The package arrived.")\n(2) 我把包裹寄到上海。Wǒ bǎ bāoguǒ jì dào Shànghǎi. ("I mail the package to Shanghai.")',
      'In (1) 到 is the only verb; in (2) 寄 is the main verb and 到 + place is the result complement attached to it.',
      [
        { target: '到 as verb', note: 'subject + 到 + place + 了; "X arrived at Y"' },
        { target: '到 as complement', note: 'main-verb + 到 + place; "[main-verb] reaching Y"' },
        { target: 'how to tell', note: 'if there is another verb in the sentence, 到 is the complement; if 到 is the only verb, it means "arrive"' },
      ],
      [ACT.grammarDao],
    ),
    createContentItem(
      '到 in 把 sentences',
      'dào inside bǎ sentences',
      'V + 到 + place is one of the most common complements in 把 sentences — together they produce the most natural full mailing sentence in Mandarin: 我把这个包裹寄到上海 ("I send this package to Shanghai"). The 把 highlights the specific package; the V + 到 specifies where it ends up.',
      'sentence',
      '我把这个包裹寄到上海。("I send this package to Shanghai.")\n请把这封信送到办公室。("Please deliver this letter to the office.")\n他把书放到桌子上。("He placed the book on the table.")',
      'This combo (把 + V + 到 + place) is the workhorse sentence pattern of the whole lesson; master it and you can ship anywhere.',
      [
        { target: '把 + object', note: 'specific item being moved' },
        { target: 'V + 到', note: 'the verb of motion/transfer + destination marker' },
        { target: 'place', note: 'where the object ends up' },
      ],
      [ACT.grammarDao],
    ),
    createContentItem(
      '需要多长时间到? / 多少钱?',
      'xūyào duōcháng shíjiān dào? / duōshǎo qián?',
      'The two universal delivery questions: 多长时间能到? ("How long until it arrives?") and 多少钱? ("How much?"). Both use the V + 到 logic — the package needs to 到 the destination, and you want to know when and at what cost.',
      'sentence',
      'A: 多长时间能到上海?\nB: 顺丰一般第二天就能到。\nA: 多少钱?\nB: 普通快递十五块，顺丰二十八。',
      'These two questions cover 90% of what a customer asks at a Chinese express counter; memorize them as a pair.',
      [
        { target: '多长时间能到?', note: '"how long until it can arrive" — use 多长时间 (how long a time) + 能 (can) + 到 (arrive)' },
        { target: '多少钱?', note: '"how much money" — universal price question; informal, friendly' },
        { target: '第二天能到', note: '"can arrive the next day" — the standard 顺丰 promise within major cities' },
      ],
      [ACT.grammarDao],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '快递面单',
      'kuàidì miàndān',
      'A complete 顺丰 SF Express shipping label. Read it aloud field by field — sender info, recipient info, contents, service type, weight, price, tracking number. The same six fields appear on every Chinese courier label; once you can read this 顺丰 label, you can read any.',
      'sentence',
      '【顺丰速运 SF EXPRESS】\n寄件人: 张莎拉 (Zhāng Shālā) · 电话: 138-0000-1234\n寄件地址: 北京市海淀区清华大学紫荆 8 号楼 302\n收件人: 李明 (Lǐ Míng) · 电话: 139-8888-5678\n收件地址: 上海市杨浦区复旦大学北苑 5 号楼 415\n内容物: 一份生日礼物 (易碎品)\n重量: 1.2 kg\n服务: 顺丰标快 (次日达)\n价格: 28 元\n单号: SF1234567890\n寄件日期: 2026年5月12日',
      'Translation: SF Express label · Sender: Zhang Sarah, 138-0000-1234, dorm room 302 in building 8, Tsinghua University, Haidian District, Beijing · Recipient: Li Ming, 139-8888-5678, dorm room 415 in building 5 of the north campus, Fudan University, Yangpu District, Shanghai · Contents: one birthday gift (fragile) · Weight: 1.2 kg · Service: SF Standard Express (next-day) · Price: 28 yuan · Tracking: SF1234567890 · Date: May 12, 2026.',
      [
        { target: '寄件人 / 收件人', note: 'sender / recipient — the two parties; always at the top of any label' },
        { target: '地址 — Chinese format', note: 'province → city → district → university/street → building → room — biggest to smallest, the OPPOSITE of Western address order' },
        { target: '内容物', note: 'package contents; declare any fragile/food/electronic items' },
        { target: '顺丰标快 (次日达)', note: '"SF Standard Express (next-day arrival)" — the default premium service tier' },
        { target: '单号 SF1234567890', note: 'tracking number; SF prefix marks SF Express; check status by entering this in the SF app or 微信 mini-program' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Five comprehension questions matching the shipping label. Answer each in a short complete sentence using vocabulary from this lesson. The five questions cover sender, recipient, destination, service, and time — the five facts every label communicates.',
      'sentence',
      'Q1: 寄件人是谁?\nQ2: 收件人在哪个大学?\nQ3: 里面是什么?\nQ4: 用什么服务?\nQ5: 多长时间能到?',
      'Five canonical questions that match the five canonical fields; mastering them means you can fully read any 快递 label.',
      [
        { target: 'A1: 寄件人是张莎拉。', note: 'name answer using 是 copula' },
        { target: 'A2: 收件人在复旦大学。', note: 'location answer using 在 + place' },
        { target: 'A3: 里面是一份生日礼物，是易碎品。', note: 'contents answer with fragile-item flag added' },
        { target: 'A4: 用顺丰标快。', note: 'service answer; 用 = "use" + service name' },
        { target: 'A5: 第二天能到。/ 一天就能到。', note: 'time answer; 就 emphasizes how quickly' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '在顺丰柜台 (对话)',
      'zài Shùnfēng guìtái (duìhuà)',
      'A 7-turn customer-clerk dialogue at a 顺丰 counter inside a Tsinghua dorm complex. Covers all the patterns from this lesson: 把 + V + 到, 寄给 X, contents declaration, service choice, price, tracking. Listen first, then perform.',
      'conversation',
      'A (你): 您好，我想把这个包裹寄到上海。\nB (快递员): 好的，请把包裹放在秤上。里面是什么?\nA: 是一份生日礼物，里面有一个杯子，是易碎品。\nB: 好的，我会贴上"易碎"的标签。寄给谁?收件人姓名和电话?\nA: 寄给我的朋友李明，电话是 139-8888-5678，地址是上海市复旦大学北苑 5 号楼 415。\nB: 您要用标快还是普通快递? 标快第二天到，二十八块。普通三天到，十五块。\nA: 用标快吧，我想快一点到。\nB: 好，一共二十八元。这是您的单号: SF1234567890。可以通过微信查物流。',
      'Natural service-counter exchange showing how 把-construction, contents declaration, recipient info, and service-tier choice all flow together in one transaction.',
      [
        { target: '把这个包裹寄到上海', note: '把-form + V + 到 + place — the canonical opening request at any courier counter' },
        { target: '放在秤上 fàng zài chèng shàng', note: '"put on the scale" — what the clerk asks you to do first; 秤 is the weighing scale' },
        { target: '里面有一个杯子，是易碎品', note: 'two-part contents declaration: what it is + fragile flag — best practice for any package' },
        { target: '寄给我的朋友李明', note: '寄给 + person — recipient introduced naturally with name and relationship' },
        { target: '标快 vs 普通', note: '标快 (biāokuài, SF Standard Express, next-day) vs 普通 (generic e-commerce courier, 2–3 days) — the classic speed-vs-cost choice' },
        { target: '通过微信查物流', note: '"check the logistics via WeChat" — the modern Chinese way to track packages; nearly every courier has a WeChat mini-program' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '取件对话',
      'qǔ jiàn duìhuà',
      'A short 4-turn dialogue at a 快递柜 parcel locker. You received an SMS with a pickup code; you walk down to the locker, enter the code, and collect your package. This is the most common end-of-delivery scenario in modern urban China.',
      'conversation',
      '[手机短信]: 【顺丰】您的快递已到达紫荆 8 号楼快递柜。取件码: 456789。\nA (你, 在快递柜): 我来取件。我的取件码是 456789。\n柜子: [叮]第 23 号格子已打开。\nA: 谢谢! [取出包裹]\n(回到宿舍后给朋友发微信)\nA: 包裹到了! 我刚下楼取了。谢谢你的礼物!',
      'Three small moments: SMS notification, locker pickup, thank-you message — the everyday rhythm of receiving a package in China.',
      [
        { target: '【顺丰】...取件码: 456789', note: 'automated SMS template; bracket-tagged sender + tracking info + pickup code is the universal format' },
        { target: '我来取件 wǒ lái qǔ jiàn', note: '"I\'ve come to pick up a package" — what you say (often to no one) when approaching a locker' },
        { target: '第 23 号格子已打开', note: '"compartment #23 has opened" — the locker\'s automated audio prompt' },
        { target: '包裹到了!', note: '"the package arrived!" — natural use of standalone-verb 到; common WeChat update to the sender' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '地址模板',
      'dìzhǐ múbǎn',
      'Reusable template for a complete Chinese-format address. Fill in the bracketed slots; Chinese addresses go BIGGEST UNIT FIRST (province → city → district → institution → building → room), the opposite of the Western order.',
      'sentence',
      '收件人: [姓名]\n电话: [手机号]\n地址: [省][市][区][学校或街道][楼][房间号]\n邮编: [六位数字]\n\n示例:\n收件人: 李明\n电话: 139-8888-5678\n地址: 上海市杨浦区复旦大学北苑 5 号楼 415\n邮编: 200433',
      'Five filled fields plus the Chinese big-to-small ordering is everything a 快递员 needs.',
      [
        { target: '[姓名]', note: 'full name in Chinese order (family name first); use real names, not nicknames' },
        { target: '[手机号]', note: 'mobile phone — couriers call before delivery; landline numbers are unusable' },
        { target: '[省 → 市 → 区 → 学校/街道 → 楼 → 房间号]', note: 'biggest-to-smallest geographic hierarchy; the opposite of Western postal order' },
        { target: '[邮编]', note: 'six-digit postal code; not always required for domestic 快递 but listed on formal forms' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '包裹内附信',
      'bāoguǒ nèi fù xìn',
      'A 3–4 sentence short note to tuck inside the package. Uses V + 给 + person (a "Happy Birthday" line) and the 把 construction (telling them what you sent and why). Builds on the writing template with personal warmth.',
      'sentence',
      '示例:\n李明:\n生日快乐! 我给你寄了一份小礼物，是一个清华纪念杯。我把它装在了泡沫盒里，应该不会碎。希望你喜欢!\n莎拉\n2026 年 5 月 12 日',
      'Translation: "Li Ming, Happy birthday! I sent you a small gift, a Tsinghua souvenir mug. I packed it in a foam box so it shouldn\'t break. Hope you like it! Sarah, May 12, 2026." Note the warm-tone use of 给你寄, the 把 sentence about packing, and the closing wish.',
      [
        { target: '我给你寄了一份小礼物', note: '给 + person + V + object — recipient-fronted version, warmer than the neutral 寄给' },
        { target: '我把它装在了泡沫盒里', note: '把 + object + V + 在 + place + 里 — describing how the gift was packed; 在...里 = "inside"' },
        { target: '希望你喜欢', note: 'standard closing for any gift; literally "hope you like it"' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write a complete shipping label PLUS a 3–4 sentence note to go inside the package. Address it to a friend at another Chinese university; use 把 at least once, 给-recipient at least once, and V + 到 + place at least once.',
      'sentence',
      '任务要求:\n1. 填好快递面单 (寄件人、收件人、地址、内容、服务)\n2. 写一封 3–4 句的内附信\n3. 至少使用一次 把 句\n4. 至少使用一次 给 X / 寄给 X\n5. 至少使用一次 V + 到 + place',
      'Five grammar requirements ensure the writing exercises every key pattern from this lesson at least once.',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '双十一',
      'Shuāng Shíyī',
      'Singles Day, November 11 (11/11). What started in 2009 as a Taobao marketing event for unmarried young people has become the largest 24-hour shopping festival on Earth — Alibaba alone processed over 540 billion yuan in 2021. The same day creates the largest single-day delivery surge in human history; couriers across China work overtime for weeks afterward.',
      'sentence',
      '双十一: 11 月 11 日 · 起源: 2009 年淘宝营销 · 规模: 每年数十亿包裹',
      'Translation: Singles Day, November 11. Origin: 2009 Taobao marketing. Scale: billions of packages per year. The festival rewrote global e-commerce logistics; Western "Black Friday" looks small by comparison.',
      [
        { target: '11/11 双十一', note: 'four "1"s in the date = symbol of singlehood; co-opted into shopping festival by Taobao in 2009' },
        { target: '剁手党 duòshǒu dǎng', note: 'literally "hand-chopping party" — self-deprecating slang for compulsive online shoppers who buy too much on 双十一' },
        { target: '快递爆仓 kuàidì bàocāng', note: '"warehouse overflow" — what happens to courier networks in the week after 双十一; some packages take 2–3 weeks to arrive' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '快递柜文化',
      'kuàidìguì wénhuà',
      '24-hour parcel lockers (快递柜, brands like 丰巢 Fēngcháo and 蜂巢 Fēngcháo) sit in nearly every residential compound and university dorm cluster. The model: courier drops in, SMS sends you a pickup code, you collect when convenient. Result: most Chinese urbanites have no daily-mailbox habit; outgoing mail has practically disappeared from daily life.',
      'sentence',
      '快递柜不是邮箱 — 它是一种 24 小时取件设备。',
      'Translation: A parcel locker is not a mailbox — it is a 24-hour pickup device. The two serve totally different roles: mailboxes are for incoming letters (rare); parcel lockers are for incoming e-commerce packages (constant).',
      [
        { target: '丰巢 Fēngcháo', note: 'the dominant parcel-locker brand, owned by 顺丰; you will see green-and-orange 丰巢 cabinets in most compounds' },
        { target: '取件码 qǔjiànmǎ', note: 'six-digit pickup code sent via SMS; enter it on the locker touchscreen to open your compartment' },
        { target: '超时收费', note: 'over-time fee — if you do not collect within 24 hours, some lockers start charging a small storage fee' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '顺丰为什么贵',
      'Shùnfēng wèishénme guì',
      'SF Express (顺丰) charges roughly 2x what the cheap 通达系 couriers charge — and Chinese consumers willingly pay it for important shipments. Reasons: in-house planes and trucks (not subcontracted), uniformed couriers (not gig workers), strict same/next-day promises, much better damage rate. The "if it matters, ship 顺丰" reflex is deeply ingrained.',
      'sentence',
      '顺丰 ≈ 通达系价格的两倍 — 但准时、不丢件、不破损。',
      'Translation: SF Express ≈ twice the price of the Tong-Da couriers — but on time, no lost packages, no damage. The premium price buys reliability that matters for fragile, valuable, or time-critical items.',
      [
        { target: '顺丰 SF Express', note: 'premium private courier; uniformed staff, in-house fleet, ~2x price' },
        { target: '通达系 Tōng-Dá xì', note: 'cheap e-commerce couriers (中通/圆通/申通/韵达); gig-economy delivery, cheaper but more variable quality' },
        { target: '中国邮政 EMS', note: 'state-run; only practical option for many international destinations; slower but cheapest for cross-border parcels' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '邮筒消失了',
      'yóutǒng xiāoshī le',
      'In the year 2000 a typical Chinese street had multiple green 邮筒 (mailboxes) on every block; by 2025 most have been removed because no one drops letters anymore. WeChat replaced personal correspondence; e-commerce replaced casual shipping. Foreign learners often look for mailboxes Chinese cities no longer have — outgoing mail goes to a 邮局 counter or, much more commonly, to a 快递员 who comes to your door on request.',
      'sentence',
      '过去: 街头到处是邮筒。 现在: 邮筒几乎消失了 — 寄东西就用快递。',
      'Translation: Past: mailboxes were everywhere on the streets. Now: mailboxes have nearly disappeared — to send things, you use express delivery. A generational shift; older citizens still remember dropping letters in green cylinders, but few young people have ever used one.',
      [
        { target: '邮筒 yóutǒng', note: 'public mailbox; once green-cylindrical and ubiquitous, now rare except outside large 邮局 branches' },
        { target: '上门取件 shàngmén qǔjiàn', note: '"door-to-door pickup" — the modern alternative; you book a courier in the SF/JD/邮政 app and they come to your address to collect the package' },
        { target: '微信寄件 Wēixìn jì jiàn', note: 'WeChat-based shipping; built-in mini-programs let you book a 顺丰/邮政 pickup without leaving the app' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 从清华寄生日礼物',
      'rènwù: cóng Qīnghuá jì shēngrì lǐwù',
      'Roleplay shipping a birthday gift from your Tsinghua dorm to a friend in Shanghai via 顺丰 with the AI tutor playing a 顺丰 counter clerk. Use every skill from this lesson in one continuous scene — greet, request, declare contents, give recipient, pick service, pay, receive tracking, farewell.',
      'conversation',
      '[北京·清华大学·顺丰快递点]\n快递员: 您好，请问需要寄件吗?\n你: [打招呼 + 想把礼物寄到上海]\n快递员: 好的，请把包裹放在秤上。里面是什么?\n你: [描述内容 + 易碎品]\n快递员: 收件人姓名和电话?\n你: [收件人信息]\n快递员: 收件地址?\n你: [地址 — 复旦大学]\n快递员: 您要用标快还是普通快递?\n你: [选择 + 理由]\n快递员: 好的，一共 [价钱] 元，这是您的单号。\n你: [谢谢 + 告别]',
      'Eight turns of fluent exchange; the AI tutor will play the clerk and adapt to your details (destination, contents, service choice).',
      [
        { target: '把…寄到 Shanghai', note: '把 + object + 寄到 + 上海 — the canonical opening request' },
        { target: '里面是… (易碎品)', note: 'contents declaration + fragile flag — best practice for any gift package' },
        { target: '寄给 + 朋友', note: 'recipient identification using 寄给 + name + relationship' },
        { target: '收件地址', note: 'full Chinese-format address (biggest unit first)' },
        { target: '用标快/普通', note: 'service choice with brief reason ("快一点" / "便宜一点")' },
        { target: '单号 + 谢谢', note: 'receive tracking number, thank the clerk, close politely' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 解决问题',
      'tiǎozhàn — jiějué wèntí',
      'Stretch goal: in the same scene the clerk tells you the package is too heavy for the standard rate, or the destination locker is full, or 标快 takes longer than usual today. Negotiate a solution: switch service, change address, or accept the delay.',
      'conversation',
      '快递员: 您的包裹是 2.3 公斤，超重了。标快要 45 元，可以吗?\n你: 嗯…有点贵。普通快递多少钱?\n快递员: 普通快递 25 元，但是要 3 天才能到。\n你: 那就用普通快递吧。我朋友的生日还有一个星期，来得及。\n快递员: 好的。还有别的需要吗?\n你: 没有了，谢谢。',
      'Notice the negotiation rhythm: 嗯 (placeholder, thinking sound) + 有点贵 (a soft complaint) + 那就用 X 吧 (decision with 那就...吧 "in that case let\'s use…") + reasoning (来得及 "there\'s still time"). This is how natural Mandarin handles a small-stakes negotiation.',
      [
        { target: '超重了 chāozhòng le', note: '"overweight" — what the clerk says when the package exceeds the standard tier; triggers a higher fee' },
        { target: '有点贵 yǒudiǎn guì', note: '"a bit expensive" — soft complaint; the polite way to push back on a price' },
        { target: '那就用 X 吧 nà jiù yòng X ba', note: '"in that case let\'s use X" — decision phrase; 那就…吧 is the standard "fine, let\'s do X" structure' },
        { target: '来得及 lái de jí', note: '"there\'s still enough time" — useful concession; the negative form is 来不及 (lái bu jí, "won\'t make it in time")' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
