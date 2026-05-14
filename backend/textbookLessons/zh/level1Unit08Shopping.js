// Level 1 Unit 8 — Shopping & Bargaining (Mandarin Chinese)
// Functions: asking prices, using measure words (量词), shopping verbs,
// bargaining politely at a market, and using modern payment methods.
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
  orientation: 'zh-l1u8-orientation',
  pronunciation: 'zh-l1u8-pronunciation',
  vocabularyMoney: 'zh-l1u8-vocab-money',
  vocabularyMeasure: 'zh-l1u8-vocab-measure',
  vocabularyItems: 'zh-l1u8-vocab-items',
  grammarHowMuch: 'zh-l1u8-grammar-how-much',
  grammarMeasure: 'zh-l1u8-grammar-measure',
  grammarGei: 'zh-l1u8-grammar-gei',
  reading: 'zh-l1u8-reading',
  listening: 'zh-l1u8-listening',
  writing: 'zh-l1u8-writing',
  culture: 'zh-l1u8-culture',
  task: 'zh-l1u8-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Ask the price of an item with 多少钱? and parse spoken yuan prices in both formal (元) and colloquial (块) forms.',
      'Use the most common Mandarin measure words (个, 件, 双, 斤, 瓶, 杯, 本) to count items correctly in a purchase.',
      'Bargain politely at a Beijing market: complain about a high price, request a discount, and settle on a final number.',
      'Pay with the three dominant methods in modern China — 现金 (cash), 微信支付 (WeChat Pay), or 支付宝 (Alipay) — and respond when the seller asks how you want to pay.',
    ],
    task: 'Picture a Saturday at 潘家园 (Panjiayuan) flea market in Beijing with a Tsinghua classmate. By the end of this lesson you should buy three souvenirs, ask each price, bargain on one, and pay by QR code — all in Mandarin.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Distinguish 块 (kuài, "yuan / chunk") from 快 (kuài, "fast") — identical Pinyin and tone but completely different meanings; context (and Hanzi) carries the distinction.',
      'Distinguish 块 (kuài, fourth tone) from 件 (jiàn, fourth tone, "piece/garment") — different initials, both sharp falling, both extremely common in shopping speech.',
      'Apply 一 (yī) sandhi inside prices and counts: 一百 yìbǎi, 一千 yìqiān (before non-fourth) vs 一块 yíkuài, 一件 yíjiàn (before fourth tone).',
    ],
    task: 'Read each minimal pair aloud and identify which Hanzi/meaning is intended; then read three prices applying 一-sandhi correctly.',
  },
  {
    id: ACT.vocabularyMoney,
    section: 'Vocabulary I',
    title: 'Money words, prices, and shopping verbs',
    goals: [
      'Learn the three currency units 元 / 块 / 毛 / 分 and know which register each belongs to (元 formal/written, 块 spoken/colloquial; 毛 = 0.1 yuan spoken, 分 = 0.01 yuan rarely used today).',
      'Use the core shopping verbs 买 (buy), 卖 (sell), 付钱 (pay), 找零 (give change), 打折 (give a discount) in complete sentences.',
      'Use the price-evaluation adjectives 贵 (expensive), 便宜 (cheap), 合适 (reasonable) with the intensifier 太…了.',
    ],
    task: 'Say each money word aloud and identify the register; then build six 买/卖/付钱 sentences with prices.',
  },
  {
    id: ACT.vocabularyMeasure,
    section: 'Vocabulary II',
    title: 'Measure words (量词) for common items',
    goals: [
      'Pair the seven most common measure words with their noun classes: 个 (general/people), 件 (clothing/matters), 双 (paired items), 斤 (500g for produce), 瓶 (bottles), 杯 (cups), 本 (books).',
      'Know that EVERY counted noun in Mandarin requires a measure word — there is no "two apple" pattern; it must be 两个苹果.',
    ],
    task: 'Count five different item-types correctly: clothing, shoes, fruit, drinks, and books.',
  },
  {
    id: ACT.vocabularyItems,
    section: 'Vocabulary III',
    title: 'Shopping items + payment methods',
    goals: [
      'Name common items you might buy at a Beijing market: 衣服, 鞋子, 水果 (苹果, 香蕉), 水, 礼物, 纪念品.',
      'Use the three payment methods that cover ~95% of modern Chinese transactions: 现金 (cash, declining), 微信支付 (WeChat Pay), 支付宝 (Alipay).',
    ],
    task: 'Pick five items you would actually buy as souvenirs in Beijing and rehearse asking the price of each.',
  },
  {
    id: ACT.grammarHowMuch,
    section: 'Grammar I',
    title: '多少 vs 几 — two ways to ask "how many"',
    goals: [
      'Use 多少 (duōshǎo) for any quantity, especially large or unknown numbers — prices, populations, distances. 多少 does NOT require a measure word: 多少钱? (no 块 needed in the question itself).',
      'Use 几 (jǐ) ONLY for small numbers (expected answer < 10) AND with a measure word: 几个? 几件? 几斤?',
      'Reading a price answer: X 块 Y 毛 = X.Y yuan in colloquial speech. 三块五 = 3.5 yuan = 三元五角 in formal/written form.',
    ],
    task: 'Write four 多少 questions and four 几 + measure-word questions, then read three colloquial prices in the X 块 Y 毛 pattern.',
  },
  {
    id: ACT.grammarMeasure,
    section: 'Grammar II',
    title: '量词 — the measure-word slot',
    goals: [
      'Use the universal pattern NUMBER + 量词 + NOUN: 一个苹果 (yí gè píngguǒ, one apple), 两件衣服 (liǎng jiàn yīfu, two pieces of clothing), 三双鞋 (sān shuāng xié, three pairs of shoes).',
      'Use 两 (liǎng) instead of 二 (èr) for "two" when counting items: 两个 not 二个. 二 is for ordinals and abstract numbers; 两 is for "two of something".',
      'Use 这 / 那 + 量词 + NOUN for "this/that": 这件衣服 (zhè jiàn yīfu, this piece of clothing), 那双鞋 (nà shuāng xié, those shoes). No 的 is needed.',
    ],
    task: 'Build six NUMBER + 量词 + NOUN phrases using six different measure words, then convert three of them to 这/那 demonstratives.',
  },
  {
    id: ACT.grammarGei,
    section: 'Grammar III',
    title: '给 (gěi) — the transaction preposition/verb',
    goals: [
      'Use 给 as a full verb meaning "give": 给我 (gěi wǒ, "give me"). The pattern 给 + RECIPIENT + ITEM is the standard transaction sentence: 给我两个苹果 ("give me two apples").',
      'Use 给 as a preposition meaning "for / to": 这是给你的 (zhè shì gěi nǐ de, "this is for you"). The 的 nominalizes the phrase.',
      'Use the polite request frame 请给我… (qǐng gěi wǒ…, "please give me…") which is the shopping/restaurant ordering default in Mandarin — softer than a bare imperative.',
    ],
    task: 'Make three 请给我… requests at a market, then write one 给你 sentence offering an item to a friend.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a market shopping account',
    goals: [
      'Read a short first-person account of buying souvenirs at a Beijing market with correct tones, sandhi, and natural rhythm.',
      'Answer comprehension questions about what was bought, the asking and final prices, and the payment method using complete short sentences.',
    ],
    task: 'Read the paragraph aloud once, then answer five comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A market visit and a convenience-store run',
    goals: [
      'Follow a market bargaining dialogue (with negotiation) and a convenience-store dialogue (fixed price, no bargaining) and recognize the register difference between the two.',
      'Reproduce one dialogue with your own items, swapping in different measure words and prices naturally.',
    ],
    task: 'Read both dialogues with the tutor, then perform the market one again with three different items.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own shopping receipt-paragraph',
    goals: [
      'Write 3–5 sentences in Hanzi covering where you went, what you bought, the per-item price, and the total.',
      'Use at least two different measure words and one price expression so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Write your own shopping account in 3–5 sentences using the template, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Where to bargain, where not — and the QR-code revolution',
    goals: [
      'Know where bargaining is expected (市场 markets, 古玩市场 antique markets, 小摊 street stalls, online haggling in chat) versus where it is forbidden (超市 supermarkets, 商场 malls, chain stores like 全家 or 711).',
      'Understand the cashless shift: since around 2015, China became overwhelmingly QR-code-driven; 现金 (cash) is now declining year by year, and many small vendors carry no change at all.',
      'Know that 双十一 (Singles Day, November 11) is the world\'s biggest shopping day — bigger than Black Friday — and shapes the modern Chinese consumer calendar.',
    ],
    task: 'For each setting, decide whether bargaining is appropriate: (1) a stall at 潘家园 flea market, (2) the Tsinghua campus 超市, (3) a 798 art-district small craft shop, (4) Taobao chat with a seller.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Souvenir shopping at a Beijing market',
    goals: [
      'Combine every skill from this lesson into one continuous market scene: greet, ask prices, count items with the right measure words, bargain politely on one item, and pay by QR code.',
      'Adjust the register based on the setting: friendlier and playful at the 市场, more formal and direct at the 超市.',
    ],
    task: 'Roleplay a Saturday at 潘家园 market with the tutor playing a Beijing vendor; aim for a 6-turn exchange that includes one successful bargain.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 8: 多少钱? — Shopping and Bargaining',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-price', label: 'Asking the price', goal: 'Use 多少钱? to ask any price and parse the spoken answer in the X 块 Y 毛 colloquial form.' },
    { id: 'counting-items', label: 'Counting items with measure words', goal: 'Combine number + correct 量词 + noun for clothing, shoes, fruit, drinks, and books.' },
    { id: 'polite-bargain', label: 'Bargaining politely', goal: 'Use 太贵了 / 便宜一点 / 可以打折吗? to negotiate a small discount without seeming aggressive.' },
    { id: 'paying', label: 'Choosing a payment method', goal: 'Respond to 怎么付? by naming 现金 / 微信支付 / 支付宝 and showing the QR code.' },
  ],
  relatedPools: ['topic-shopping', 'topic-numbers'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can ask the price of anything in a Beijing market, count items with the right measure words, politely bargain for a small discount, and pay by cash or QR code — the four micro-skills behind every modern Chinese shopping interaction.',
      'word',
      'Functional language: 问价 wèn jià (ask price) · 数物 shǔ wù (count items) · 砍价 kǎn jià (bargain) · 付款 fù kuǎn (pay)',
      'These four micro-skills together cover roughly any purchase from a 5-yuan apple to a 500-yuan jacket — once they are automatic, you can shop anywhere in Mainland China.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You and a Tsinghua classmate walk into 潘家园 (Panjiayuan) flea market in southeast Beijing on a Saturday morning. A vendor is waving a hand-painted scroll at passing tourists. Your classmate nudges you to ask the price — and to bargain, because at 潘家园 the first price is always negotiable.',
      'word',
      '老板: "看看吧，便宜卖！" — 你: "这个多少钱?"',
      'A typical opener from a Beijing market vendor: friendly 老板 (boss) self-reference, the price-drop preview "便宜卖!" ("selling cheap!"), and your standard 多少钱? response — a common exchange pattern at any 市场.',
      [
        { target: '老板 lǎobǎn', note: 'literally "boss"; the standard address term for any shopkeeper or stall vendor, regardless of actual rank — used by both customers and the vendor referring to themselves' },
        { target: '便宜卖 piányi mài', note: 'sales-pitch shorthand: "[I am] selling [it] cheap"; signals the vendor is ready to bargain' },
        { target: '多少钱? duōshǎo qián?', note: 'the universal price question; works for any item without needing a measure word' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '两种购物场合',
      'liǎng zhǒng gòuwù chǎnghé',
      'Mandarin shopping comes in two registers. Market register (市场, 古玩市场, 小摊): vendors expect bargaining, prices start ~20-50% above the real number, and a warm exchange is part of the deal. Store register (超市, 商场, 711, 全家): prices are fixed, scanning is silent, and asking for a discount is socially odd.',
      'word',
      'MARKET: 太贵了，便宜一点 (negotiable). STORE: 这个多少钱 → silent payment (fixed).',
      'Switching the register to the wrong setting is socially awkward; bargaining at a 711 marks you as a confused tourist, paying the first price at 潘家园 marks you as one too.',
      [
        { target: 'MARKET: 市场 / 小摊 / 古玩市场', note: 'use the bargaining toolkit: 太贵了, 便宜一点, 可以打折吗? — first price is opening offer' },
        { target: 'STORE: 超市 / 商场 / 便利店', note: 'fixed price, scan-and-pay; only "多少钱?" is appropriate and only if no price tag is visible' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '块 vs 快',
      'kuài (块) vs kuài (快)',
      'Two of the most common fourth-tone syllables in everyday Mandarin sound IDENTICAL — 块 (kuài, "yuan / chunk") and 快 (kuài, "fast"). Spoken context and Hanzi are the only disambiguators; the tone alone cannot distinguish them. Shopping speech leans heavily on 块.',
      'word',
      '三块 sān kuài (3 yuan, in money context) vs 快一点 kuài yìdiǎn ("faster, hurry up")',
      'A homophone pair so frequent that Mandarin learners must train to parse them by context alone.',
      [
        { target: '块 (kuài, money / chunk)', note: 'the colloquial yuan unit; also "chunk/piece" for non-monetary uses like 一块肉 ("a chunk of meat")' },
        { target: '快 (kuài, fast / soon)', note: 'adjective "fast" and adverb "soon/quickly"; appears in 快一点 ("hurry up"), 快走 ("leave quickly")' },
        { target: 'No tone difference', note: 'both are fourth tone with /kʰwaɪ/; only context disambiguates in speech' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '块 vs 件',
      'kuài (块) vs jiàn (件)',
      'Two high-frequency fourth-tone shopping syllables that share the same tone but differ in initial. 块 (kuài) is the money unit; 件 (jiàn) is the measure word for clothing and abstract matters. Confusing them produces a nonsense sentence — "这件多少件" instead of "这件多少块".',
      'word',
      '这件衣服多少块? (zhè jiàn yīfu duōshǎo kuài?, "how much is this piece of clothing?")',
      'A real shopping sentence using both syllables — 件 as the clothing measure word and 块 as the money unit, side by side.',
      [
        { target: '块 (kuài, /kʰwaɪ⁵¹/)', note: 'velar initial k- + diphthong -uai; money unit "yuan" in spoken Mandarin' },
        { target: '件 (jiàn, /tɕjɛn⁵¹/)', note: 'palatal initial j- + nasal final -ian; measure word for clothing and abstract matters ("a matter", "a piece")' },
        { target: 'Both fourth tone', note: 'both fall sharply from high to low; only the initial j/k distinguishes them' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '一 sandhi in prices',
      'yī sandhi in prices',
      'The 一 (yī) sandhi rule is critical when reading prices and counting items. 一 becomes 一 (yí, rising) before a fourth-tone syllable like 块 or 件; becomes 一 (yì, falling) before first, second, or third tones like 百 or 千; stays as 一 (yī) when standing alone in a final position.',
      'word',
      '一块 yíkuài (1 yuan, sandhi to rising) · 一百 yìbǎi (100, sandhi to falling) · 第一 dìyī (first, no sandhi)',
      'Skipping this sandhi makes every price read robotic; applying it consistently is one of the fastest tells of fluent shopping speech.',
      [
        { target: '一 + 4th → yí', note: 'e.g., 一块 yíkuài (1 yuan), 一件 yíjiàn (1 piece) — most common in shopping' },
        { target: '一 + 1st/2nd/3rd → yì', note: 'e.g., 一百 yìbǎi (100), 一千 yìqiān (1,000), 一斤 yìjīn (500g)' },
        { target: '一 alone or final → yī', note: 'e.g., 第一 dìyī (first), 十一 shíyī (eleven)' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '多少钱',
      'duōshǎo qián',
      'The universal price question. Three syllables with three different tones — first, third, second — and the final 钱 (qián) often slides into a relaxed neutral-tone-like rhythm in fast speech. Common in markets, restaurants, taxis.',
      'word',
      '这个多少钱? zhège duōshǎo qián?',
      'Hear the rhythm: STRONG-soft-STRONG — first tone 多 lands strongly, 少 dips and rises, 钱 rises into the question intonation.',
      [
        { target: '多 duō', note: 'first tone; "many / much" — high level pitch' },
        { target: '少 shǎo', note: 'third tone; "few / less" — dip-and-rise' },
        { target: '钱 qián', note: 'second tone; "money" — rising pitch; question intonation rides this final rise' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '便宜一点',
      'piányi yìdiǎn',
      'A four-syllable bargaining phrase combining a second+neutral compound 便宜 ("cheap"), the sandhi-shifted 一 (yì before third tone), and 点 ("a bit"). The rhythm is the heart of polite bargaining — soft and rounded, never sharp.',
      'word',
      '能不能便宜一点? (néng bu néng piányi yìdiǎn?, "can it be a little cheaper?")',
      'A polite, indirect way to request a discount; preferred over the more direct 打折 in face-to-face haggling because it leaves the vendor room to save face.',
      [
        { target: '便宜 piányi', note: 'second + neutral; "cheap" — second 宜 reduces to neutral tone' },
        { target: '一 yì (before 3rd tone)', note: 'sandhi: 一 before 点 (3rd) becomes falling yì' },
        { target: '点 diǎn', note: 'third tone; "a bit / a little" — softens the request' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Money words, prices, shopping verbs
    // ────────────────────────────────────────────────────────────────────
    createContentItem('钱', 'qián', 'The general word for "money". Used in 多少钱? ("how much money?"), 没钱 ("no money"), 付钱 ("pay money"). Currency-neutral — applies to yuan, dollars, euros, or any abstract money concept.', 'word', '这个多少钱? — 五十块钱。', 'Standard price exchange; the response often includes 钱 at the end for completeness, though it can be dropped.', null, [ACT.vocabularyMoney]),
    createContentItem('元', 'yuán', 'The formal/written name for the Chinese yuan, China\'s currency. Appears on price tags, invoices, signage, official documents, and in news broadcasts. Almost never used in spoken haggling — there 块 takes over.', 'word', '人民币五十元 (rénmínbì wǔshí yuán, "50 yuan RMB")', 'Formal register; you read it on the banknote (壹拾圆) and in any official price display, but you speak 块 in the market.', [
      { target: '元 (formal/written)', note: 'price tags, contracts, news, banknotes — the official RMB unit name' },
      { target: '人民币 RMB', note: '"the people\'s currency"; the full formal name of the Chinese currency' },
    ], [ACT.vocabularyMoney]),
    createContentItem('块', 'kuài', 'The spoken/colloquial word for yuan — the everyday register. In ordinary speech, 块 is used 95% of the time; 元 sounds stiff in conversation. Same value as 元, different register.', 'word', '五十块 (wǔshí kuài, "50 yuan" — colloquial)', 'The default in any spoken interaction; use this when ordering food, shopping, or paying a cab fare.', null, [ACT.vocabularyMoney]),
    createContentItem('毛', 'máo', 'The spoken word for 1/10 of a yuan (= 角 jiǎo in formal register). Used in prices like 三块五毛 = 3.5 yuan; often the 毛 is dropped: 三块五 = 3.5 yuan. Worth so little now that exact 毛 prices are mostly rounded in modern commerce.', 'word', '一块五毛 (yíkuài wǔ máo, "1.5 yuan")', 'You hear 毛 mostly in produce markets and small purchases; for anything over 10 yuan it usually disappears.', [
      { target: '毛 = 0.1 yuan (spoken)', note: 'colloquial; pairs with 块 in everyday speech' },
      { target: '角 = 0.1 yuan (formal)', note: 'the formal/written form of the same unit; on receipts and tax forms' },
    ], [ACT.vocabularyMoney]),
    createContentItem('分', 'fēn', 'The smallest unit, 1/100 of a yuan. Almost extinct in modern China — physical 分 coins are rarely circulated and online payments round to 毛 or 块. You see it in digital banking displays and old textbooks but seldom hear it.', 'word', '九块九毛九分 (jiǔ kuài jiǔ máo jiǔ fēn, "9.99 yuan")', 'Mostly a textbook leftover today; in real shopping you can ignore 分 unless you read a formal price tag.', null, [ACT.vocabularyMoney]),
    createContentItem('买', 'mǎi', 'The verb "to buy". Third tone — dips and rises. Pairs with 卖 (mài, fourth tone, "to sell") as a minimal pair distinguished only by tone, a classic learner trap.', 'word', '我想买一件衣服。(wǒ xiǎng mǎi yí jiàn yīfu, "I want to buy a piece of clothing.")', 'One of the highest-frequency shopping verbs; the tone difference from 卖 is meaning-bearing — getting it wrong inverts the transaction.', null, [ACT.vocabularyMoney]),
    createContentItem('卖', 'mài', 'The verb "to sell". Fourth tone — sharp falling. Mirror image of 买 (mǎi, "to buy") with the only difference being the tone. Vendors say it constantly: 卖完了 ("sold out"), 不卖 ("not for sale").', 'word', '这个不卖。(zhège bú mài, "this one isn\'t for sale.")', 'Critical for understanding vendors; the tone contrast with 买 is one of the most-drilled minimal pairs in Mandarin.', null, [ACT.vocabularyMoney]),
    createContentItem('付钱', 'fù qián', 'The verb phrase "to pay (money)". A separable verb-object compound: you can split it (付了钱 fù le qián, "paid the money") or use it together. Synonym in colloquial speech: 付款 fù kuǎn.', 'word', '请在这里付钱。(qǐng zài zhèlǐ fù qián, "please pay here.")', 'Standard payment vocabulary; works at any register from market stall to high-end restaurant.', null, [ACT.vocabularyMoney]),
    createContentItem('找零', 'zhǎo líng', 'The verb meaning "to give change" (literally "find-spare"). The vendor performs the action: 我找你五块 ("I give you 5 yuan change"). Increasingly rare in modern China because most transactions are exact-amount QR payments.', 'word', '不用找零。(bú yòng zhǎo líng, "no change needed.")', 'A phrase still common at street stalls but vanishing in chain stores; useful when paying cash and rounding up.', null, [ACT.vocabularyMoney]),
    createContentItem('打折', 'dǎ zhé', 'The verb meaning "to give a discount". Uses the verb 打 ("to strike") + 折 ("discount" as a noun). The discount level is expressed inversely: 打八折 = "20% off" (you pay 80%), 打七折 = "30% off" (you pay 70%) — a numerical convention opposite to English.', 'word', '可以打折吗? (kěyǐ dǎ zhé ma?, "can you give a discount?")', 'Standard discount question in stores; expect a fixed percentage discount, not a haggle. For haggling, use 便宜一点 instead.', [
      { target: '打折 (verb)', note: '"to give a discount" — generic discount-asking' },
      { target: '打八折 = 20% off', note: 'pay 80% of the price; opposite numerical sense to English "20% discount"' },
      { target: '打七折 = 30% off', note: 'pay 70% of the price; common sale-day discount level' },
    ], [ACT.vocabularyMoney]),
    createContentItem('贵', 'guì', 'The adjective "expensive". Standalone adjective — does NOT take 是 in a predicate ("这个贵" not "这个是贵"). Intensified with 太…了: 太贵了 (tài guì le, "too expensive!") — the canonical bargaining opener.', 'word', '太贵了! 便宜一点吧。(tài guì le! piányi yìdiǎn ba., "too expensive! Make it a bit cheaper.")', 'The phrase that opens any negotiation; saying it without intent to buy is rude — only deploy when you actually want the item.', null, [ACT.vocabularyMoney]),
    createContentItem('便宜', 'piányi', 'The adjective "cheap / inexpensive". Second + neutral tones. Used both descriptively (这个便宜, "this one is cheap") and in the imperative-like bargaining phrase 便宜一点 ("a bit cheaper, please").', 'word', '这家店比那家便宜。(zhè jiā diàn bǐ nà jiā piányi, "this shop is cheaper than that one.")', 'A high-frequency shopping word; pairs naturally with 一点 in negotiation contexts.', null, [ACT.vocabularyMoney]),
    createContentItem('合适', 'héshì', 'The adjective "reasonable / suitable / a good fit". Used for prices that feel fair, and also for clothing that fits the body well — a dual-purpose shopping word. Often the vendor\'s final-offer label: 这个价钱很合适 ("this price is reasonable").', 'word', '价钱合适，我买了。(jiàqian héshì, wǒ mǎi le., "the price is reasonable, I\'ll take it.")', 'The closer\'s word; signals you accept the deal without sounding eager.', null, [ACT.vocabularyMoney]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Measure words
    // ────────────────────────────────────────────────────────────────────
    createContentItem('个', 'gè', 'The most general measure word, default for people and unclassified items. Used when in doubt — won\'t always be the "best" measure word, but won\'t be wrong. Often reduced to neutral tone in speech: yí ge.', 'word', '一个苹果 (yí gè píngguǒ, "one apple") · 两个学生 (liǎng gè xuésheng, "two students")', 'The fallback measure word; covers maybe 30% of all noun-counting situations in casual speech.', [
      { target: '一个 yí gè', note: 'sandhi: 一 before fourth-tone 个 → rising' },
      { target: '两个 liǎng gè', note: '"two of", using 两 not 二 — the rule for counting items' },
    ], [ACT.vocabularyMeasure]),
    createContentItem('件', 'jiàn', 'The measure word for clothing items (shirts, jackets, dresses) and abstract "matters / affairs / pieces of news". Two distinct uses share the same syllable. Fourth tone.', 'word', '三件衣服 (sān jiàn yīfu, "three pieces of clothing") · 一件事 (yí jiàn shì, "one matter")', 'Critical for clothes shopping; also turns up in conversations about events ("a matter / a thing that happened").', null, [ACT.vocabularyMeasure]),
    createContentItem('双', 'shuāng', 'The measure word for paired items: shoes, socks, gloves, chopsticks, eyes, hands. Literally "pair". First tone. Singular pair counts as one 双 — never "one shoe".', 'word', '一双鞋 (yì shuāng xié, "one pair of shoes") · 一双筷子 (yì shuāng kuàizi, "one pair of chopsticks")', 'Use 双 only for items that come naturally in pairs; a single chopstick or one shoe uses 只 (zhī) instead.', null, [ACT.vocabularyMeasure]),
    createContentItem('斤', 'jīn', 'The Chinese pound = 500 grams (half a kilogram). The default unit for produce at any 市场 — apples, oranges, vegetables are all priced per 斤, not per kilo or per piece. Modern China keeps 斤 alongside the metric kg.', 'word', '苹果五块钱一斤。(píngguǒ wǔ kuài qián yì jīn, "apples are 5 yuan per 斤.")', 'You will hear this every time you buy fruit; the per-斤 price is more common than per-piece for produce.', [
      { target: '一斤 = 500g', note: 'half a kilogram; the produce-shopping standard' },
      { target: '半斤 bàn jīn = 250g', note: 'half a 斤; common smaller purchase' },
      { target: '公斤 gōng jīn = 1kg', note: '"metric 斤"; the kilogram, less common in casual shopping' },
    ], [ACT.vocabularyMeasure]),
    createContentItem('瓶', 'píng', 'The measure word for bottled items: water, beer, soda, sauces, perfume, medicine. Second tone. Matches English "bottle" almost perfectly in scope.', 'word', '两瓶水 (liǎng píng shuǐ, "two bottles of water") · 一瓶啤酒 (yì píng píjiǔ, "one bottle of beer")', 'High-frequency in convenience stores and restaurants; works for any sealed bottle.', null, [ACT.vocabularyMeasure]),
    createContentItem('杯', 'bēi', 'The measure word for items served in a cup or glass: coffee, tea, water (poured), wine, milk. First tone. Differs from 瓶 — 杯 implies the item is in a vessel ready to drink, 瓶 implies it is still in the bottle.', 'word', '一杯咖啡 (yì bēi kāfēi, "one cup of coffee") · 三杯水 (sān bēi shuǐ, "three glasses of water")', 'The default at cafés and restaurants; also used for portion-counting drinkable amounts.', null, [ACT.vocabularyMeasure]),
    createContentItem('本', 'běn', 'The measure word for bound items: books, notebooks, magazines, dictionaries, passports. Third tone. The book-domain default.', 'word', '一本书 (yì běn shū, "one book") · 两本字典 (liǎng běn zìdiǎn, "two dictionaries")', 'Used for anything with a spine and pages; magazines and passports also count.', null, [ACT.vocabularyMeasure]),
    createContentItem('张', 'zhāng', 'The measure word for flat sheet-like items: paper, tickets, tables, beds, cards, photos. First tone. Anything roughly two-dimensional or with a flat top surface uses 张.', 'word', '两张票 (liǎng zhāng piào, "two tickets") · 一张桌子 (yì zhāng zhuōzi, "one table")', 'Surprises learners because it covers both tickets and tables — the connecting feature is "flat surface".', null, [ACT.vocabularyMeasure]),
    createContentItem('块 (measure)', 'kuài (measure word)', 'Besides being the spoken yuan unit, 块 is also a measure word meaning "chunk / piece / lump" for things like meat, soap, cake, stones, watches. Context tells you which 块 you are hearing.', 'word', '一块肉 (yí kuài ròu, "a chunk of meat") · 一块手表 (yí kuài shǒubiǎo, "one watch")', 'Same character, two grammatical roles — be ready to parse 块 as either "yuan" or "chunk" depending on the surrounding noun.', null, [ACT.vocabularyMeasure]),
    createContentItem('两 vs 二', 'liǎng vs èr', 'For "two of something", use 两 not 二. The split is: 两 with measure words (两个, 两件, 两本), 二 for digits, ordinals, and abstract numbers (二月 "February", 第二 "second", 一加二 "1+2"). Saying 二个 sounds childlike or wrong.', 'word', '两个苹果 ✓ · 二个苹果 ✗', 'A pure rule-of-distribution distinction; both characters mean "two" but only one fits the measure-word slot.', [
      { target: '两 + 量词 + N ✓', note: '"two pieces/items of N"; the counting-items default' },
      { target: '二 (digits, ordinals)', note: 'phone numbers, dates, ordinals: 二零二六年, 第二个' },
      { target: 'Combine: 二十两 ✗', note: '"twenty-two" stays 二十二, not 二十两; only the standalone "two" uses 两' },
    ], [ACT.vocabularyMeasure]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Vocabulary III: Items + payment methods
    // ────────────────────────────────────────────────────────────────────
    createContentItem('衣服', 'yīfu', 'A general word for "clothing / clothes". Mass noun in feel — you count it with 件 (件 yīfu, "a piece of clothing"). Distinct from specific garment names like 衬衫 (shirt) or 裙子 (skirt).', 'word', '这件衣服真好看。(zhè jiàn yīfu zhēn hǎokàn, "this piece of clothing is really nice-looking.")', 'High-frequency shopping word; second 服 reduces to neutral tone in speech.', null, [ACT.vocabularyItems]),
    createContentItem('鞋子', 'xiézi', 'A general word for "shoes". Counted in pairs with 双 (双 xiézi, "a pair of shoes"). The 子 suffix is a noun-marker reducer — 鞋 alone also works but 鞋子 is more colloquial.', 'word', '我想买一双鞋子。(wǒ xiǎng mǎi yì shuāng xiézi, "I want to buy a pair of shoes.")', 'Always paired with 双 when counting; second 子 is neutral tone.', null, [ACT.vocabularyItems]),
    createContentItem('水果', 'shuǐguǒ', 'The general word for "fruit". Specific fruits use their own names (苹果 apple, 香蕉 banana, 西瓜 watermelon); 水果 is the umbrella term and is what you ask for at the produce section.', 'word', '这里的水果新鲜吗? (zhèlǐ de shuǐguǒ xīnxiān ma?, "is the fruit here fresh?")', 'Pairs with 斤 for produce-counting; the per-斤 price is the default at markets.', null, [ACT.vocabularyItems]),
    createContentItem('苹果', 'píngguǒ', 'Apple. Both syllables in second tone. One of the most common counting examples in Mandarin textbooks — a clean second-tone pair, easy to pronounce.', 'word', '一斤苹果多少钱? (yì jīn píngguǒ duōshǎo qián?, "how much is one 斤 of apples?")', 'Always priced per 斤 at markets; per-个 pricing is rare except in convenience stores.', null, [ACT.vocabularyItems]),
    createContentItem('香蕉', 'xiāngjiāo', 'Banana. Literally "fragrant-banana". First-tone pair; common produce-market item.', 'word', '香蕉三块一斤。(xiāngjiāo sān kuài yì jīn, "bananas are 3 yuan per 斤.")', 'Pairs with 斤 at the produce stall, with 根 (gēn, "stalk") if specifying single bananas.', null, [ACT.vocabularyItems]),
    createContentItem('水', 'shuǐ', 'Water. Third tone. Counted with 瓶 (bottle) or 杯 (cup/glass) depending on context.', 'word', '请给我一瓶水。(qǐng gěi wǒ yì píng shuǐ, "please give me a bottle of water.")', 'Among the most-bought items in any convenience store; the request 请给我 + 一瓶水 is a perfect template sentence.', null, [ACT.vocabularyItems]),
    createContentItem('礼物', 'lǐwù', 'Gift / present. Used for anything you give to another person — birthday gifts, hospitality gifts, souvenirs taken home. Counted with 个 or 件.', 'word', '我想给妈妈买一个礼物。(wǒ xiǎng gěi māma mǎi yí gè lǐwù, "I want to buy a gift for my mom.")', 'Pairs naturally with 给 ("for") in the recipient-marking pattern from Grammar III.', null, [ACT.vocabularyItems]),
    createContentItem('纪念品', 'jìniànpǐn', 'Souvenir — literally "commemorate-item". The standard word at tourist spots and museums for keepsakes; broader than 礼物 because 纪念品 emphasizes the place-memory aspect rather than the gift recipient.', 'word', '我在故宫买了一个纪念品。(wǒ zài Gùgōng mǎi le yí gè jìniànpǐn, "I bought a souvenir at the Forbidden City.")', 'The standard souvenir-shop word; pairs with 故宫, 长城, 颐和园 in Beijing tourism contexts.', null, [ACT.vocabularyItems]),
    createContentItem('现金', 'xiànjīn', 'Cash — literally "present-money". The traditional payment method, now in steep decline in mainland China since the QR-payment revolution around 2015. Many small vendors no longer carry change for cash payments; some refuse cash entirely.', 'word', '收现金吗? (shōu xiànjīn ma?, "do you take cash?")', 'A question worth asking before paying — increasingly the answer is "we prefer scan", especially at small vendors with no change drawer.', null, [ACT.vocabularyItems]),
    createContentItem('微信支付', 'wēixìn zhīfù', 'WeChat Pay — the dominant in-app payment method in China, integrated into the 微信 (WeChat) super-app that most Chinese citizens already use for messaging. QR-code-scanned at the counter or via the merchant\'s code on a sign.', 'word', '可以用微信支付吗? (kěyǐ yòng wēixìn zhīfù ma?, "can I pay with WeChat?")', 'Universally accepted; the default at most small and medium vendors in China today.', [
      { target: '微信 wēixìn', note: '"WeChat" — the messaging app behind the payment system' },
      { target: '支付 zhīfù', note: '"to pay" (formal/written register)' },
    ], [ACT.vocabularyItems]),
    createContentItem('支付宝', 'zhīfùbǎo', 'Alipay — the second-dominant in-app payment method, originally from Alibaba/Taobao. Functionally identical to WeChat Pay for the customer (scan a QR, confirm, done) but on a different platform; most vendors accept both.', 'word', '我用支付宝。(wǒ yòng zhīfùbǎo, "I\'ll use Alipay.")', 'Slightly more common in e-commerce contexts (Taobao, Tmall); 微信支付 dominates offline.', null, [ACT.vocabularyItems]),
    createContentItem('扫码', 'sǎo mǎ', 'To scan a QR code — literally "sweep-code". The universal action verb behind every modern Chinese payment. Customer scans vendor\'s code, or vendor scans customer\'s code; either direction works.', 'word', '扫这个码就行。(sǎo zhège mǎ jiù xíng, "just scan this code.")', 'You will hear this dozens of times a day in modern China; the verb is now as common as 付钱 itself.', null, [ACT.vocabularyItems]),
    createContentItem('收据', 'shōujù', 'Receipt — literally "receive-evidence". Asked for less often in casual cash purchases; for business reimbursement you usually request 发票 (fāpiào, the official tax invoice) instead.', 'word', '请给我收据。(qǐng gěi wǒ shōujù, "please give me a receipt.")', 'Less common at small stalls; convenience stores print one automatically.', null, [ACT.vocabularyItems]),
    createContentItem('老板', 'lǎobǎn', 'Boss / shopkeeper — a friendly catch-all address for any vendor regardless of actual rank. Used both BY customers (calling out to the stall owner) and BY the vendor referring to themselves. Common in markets, restaurants, taxis.', 'word', '老板，这个怎么卖? (lǎobǎn, zhège zěnme mài?, "boss, how is this one sold?")', 'The conversational opener of choice at any 市场; warmer than 您好 in a market context, more practical than 服务员.', null, [ACT.vocabularyItems]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar I: 多少 vs 几
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '多少',
      'duōshǎo',
      'The general "how much / how many" question word. Used for any quantity — large numbers, prices, populations, distances, ages of older people. CRITICALLY, 多少 does NOT require a measure word: 多少钱 (no measure word), 多少人 (no measure word). Optional measure words are allowed but not required.',
      'sentence',
      '多少钱? (duōshǎo qián?, "how much money?")\n你有多少书? (nǐ yǒu duōshǎo shū?, "how many books do you have?")',
      'The default price question and the default "how many" for any count not obviously small.',
      [
        { target: '多少 + N', note: 'no measure word needed; works for any quantity' },
        { target: '多少钱?', note: 'the universal price question; works at any vendor' },
        { target: '多少人?', note: '"how many people?" — used for crowds, populations, table reservations' },
      ],
      [ACT.grammarHowMuch],
    ),
    createContentItem(
      '几',
      'jǐ',
      'The "how many" word for SMALL expected numbers — typically under 10. Used for things you can count with your fingers: items in a basket, people at a small table, hour of the day. 几 ALWAYS takes a measure word: 几个? 几件? 几斤? 几点? — never 几 alone before a noun.',
      'sentence',
      '你要几个? (nǐ yào jǐ gè?, "how many [items] do you want?")\n现在几点? (xiànzài jǐ diǎn?, "what time is it now?")',
      'Three-way contrast with 多少 and the answer numbers themselves: 几 + 量词 questions get a small-number answer like 一/二/三 + 量词.',
      [
        { target: '几 + 量词 + N (required)', note: '"how many [items] of N?"; the measure word is non-negotiable' },
        { target: '几点 jǐ diǎn?', note: '"what time?"; 点 here is both the measure word and the hour unit' },
        { target: '小 number expected (< 10)', note: 'if the answer might be larger, switch to 多少' },
      ],
      [ACT.grammarHowMuch],
    ),
    createContentItem(
      '多少 vs 几 contrast',
      'duōshǎo vs jǐ',
      'CRITICAL DISTRIBUTION: 多少 = any quantity, no measure word required; 几 = small number, measure word required. Mixing them up is one of the most common beginner errors and produces sentences that sound wrong even when grammatical.',
      'sentence',
      'CORRECT: 你多大年纪? (large number expected, no measure word) vs 你几岁? (small number expected — child age, with 岁 measure word)',
      'The age question itself depends on which one you choose — 几岁 ("how old?" for children), 多大 ("how old?" for adults), 多大年纪 ("how old?" for elders).',
      [
        { target: '多少 - any quantity', note: 'no measure word; safe default for unknown size' },
        { target: '几 + 量词 - small (<10)', note: 'measure word required; signals the answer is small' },
        { target: 'Age trap', note: '几岁 for kids, 多大 for adults, 多大年纪 for elders — three different "how old?" depending on age' },
      ],
      [ACT.grammarHowMuch],
    ),
    createContentItem(
      '价钱表达',
      'jiàqian biǎodá',
      'Reading prices in colloquial speech follows the pattern X 块 Y 毛 = X.Y yuan. 三块五 (sān kuài wǔ) = 3.5 yuan (the 毛 is optional and usually dropped). For larger prices: 二十块 (20 yuan), 一百二十块 (120 yuan), 三百八十块 (380 yuan).',
      'sentence',
      '一块五 (1.5 yuan) · 三块五毛 (3.5 yuan) · 二十块 (20 yuan) · 一百二十块 (120 yuan)',
      'You almost never hear 元 / 角 / 分 in spoken haggling; the 块 / 毛 / 分 colloquial set covers ordinary prices, and 分 is often dropped entirely.',
      [
        { target: 'X 块 = X yuan', note: 'the integer yuan part' },
        { target: 'X 块 Y 毛 = X.Y yuan', note: 'the colloquial way to say a price with one decimal' },
        { target: '毛 often dropped', note: '三块五 = 3.5 yuan even without the 毛 at the end' },
      ],
      [ACT.grammarHowMuch],
    ),
    createContentItem(
      '价钱回答示例',
      'jiàqian huídá shìlì',
      'A full example: vendor asks for price, customer responds. Notice the colloquial register throughout — 块 not 元, and the final 钱 (qián) at the end of the answer is optional polite-completeness.',
      'sentence',
      'A: 多少钱? — B: 五十块 (钱)。\nA: 苹果多少钱一斤? — B: 八块一斤。\nA: 这件衣服多少钱? — B: 二百块。',
      'Three high-frequency price-asking patterns; rehearse them as units rather than parsing each time.',
      [
        { target: 'Per-unit prices: N 块 一 量词', note: 'e.g., 八块一斤 (8 yuan per 斤), 三块一个 (3 yuan each)' },
        { target: 'Total prices: N 块', note: 'just the total, no per-unit framing' },
        { target: '钱 optional', note: 'leaving it off shortens the answer; including it adds finishing politeness' },
      ],
      [ACT.grammarHowMuch],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar II: Measure words
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '量词',
      'liàngcí — measure-word slot',
      'CORE RULE: every counted noun in Mandarin requires a measure word between the number and the noun. NUMBER + 量词 + NOUN. There is no "two apple" pattern in Mandarin; it must be 两个苹果. This is structurally different from English, which uses bare numbers freely.',
      'sentence',
      '一个苹果 (one apple) · 三件衣服 (three pieces of clothing) · 五本书 (five books) · 两双鞋 (two pairs of shoes)',
      'The 量词 slot is filled by ~70 common measure words in standard Mandarin; the right one depends on the noun.',
      [
        { target: 'Pattern: 数 + 量词 + 名 (NUMBER + MEASURE + NOUN)', note: 'the universal counting pattern; non-negotiable' },
        { target: '一 / 两 / 三 + 量词', note: 'first three numbers paired with measure words; note 两 not 二 for "two"' },
        { target: 'No bare "number + noun"', note: '"two apples" cannot be 二苹果 or 两苹果; must include 个' },
      ],
      [ACT.grammarMeasure],
    ),
    createContentItem(
      '两 not 二',
      'liǎng, not èr, for "two of"',
      'The "two" rule: use 两 (liǎng) before measure words and quantities, never 二 (èr). 两个 NOT 二个. 二 is reserved for ordinal numbers, multi-digit numbers, dates, and abstract math. This single rule trips up nearly every learner.',
      'sentence',
      'COUNTING: 两个苹果 (two apples), 两件衣服 (two pieces of clothing), 两瓶水 (two bottles of water)\nDIGITS / ORDINALS: 第二 (second), 二月 (February), 二十 (twenty), 二零二六 (2026)',
      'A clean distributional rule once internalized: see a measure word, use 两; see anything else, use 二.',
      [
        { target: '两 + 量词 ✓', note: '"two of [items]"; the counting use' },
        { target: '二 + 多位数 / 序数 / 抽象 ✓', note: '"two" as a digit, ordinal, or abstract math number' },
        { target: '二个苹果 ✗', note: 'wrong; must be 两个苹果' },
      ],
      [ACT.grammarMeasure],
    ),
    createContentItem(
      '这 / 那 + 量词',
      'zhè / nà + measure word',
      'Demonstratives in Mandarin REQUIRE a measure word: 这件衣服 ("this piece of clothing"), 那个苹果 ("that apple"). No 的 is inserted between the demonstrative and the noun. Without the measure word, 这衣服 / 那苹果 sounds non-native.',
      'sentence',
      '这件衣服 (this piece of clothing) · 那本书 (that book) · 这双鞋 (these shoes) · 那个学生 (that student)',
      'Always include the measure word; it is the same one you would use with a number, since 这/那 is conceptually "this/that one [of these]".',
      [
        { target: '这 + 量词 + N', note: '"this [item] of N"; near demonstrative' },
        { target: '那 + 量词 + N', note: '"that [item] of N"; far demonstrative' },
        { target: 'No 的', note: '这件衣服 ≠ 这的衣服; the measure word IS the link' },
      ],
      [ACT.grammarMeasure],
    ),
    createContentItem(
      '量词搭配',
      'liàngcí dāpèi — collocation memory',
      'Each noun has a "right" measure word. Most common pairings: 个 (general / 苹果, 学生, 月), 件 (衣服, 事), 双 (鞋, 筷子), 斤 (水果, 肉), 瓶 (水, 啤酒), 杯 (咖啡, 茶), 本 (书, 字典), 张 (票, 桌子), 块 (肉, 手表), 条 (鱼 fish, 裤子 pants).',
      'sentence',
      '一个 + 苹果/学生/月 · 一件 + 衣服/事 · 一双 + 鞋/筷子 · 一斤 + 水果/肉 · 一瓶 + 水 · 一杯 + 咖啡 · 一本 + 书 · 一张 + 票/桌子',
      'Mandarin measure-word collocation is a pure memory job; the right pairing comes with exposure, but the seven above cover the bulk of beginner shopping.',
      [
        { target: '个 (default)', note: 'general — safe fallback when unsure; covers apples, students, months' },
        { target: '件 (clothing / matters)', note: 'all clothing items plus abstract "matters/things"' },
        { target: '双 (pairs)', note: 'shoes, chopsticks, gloves — items that come in twos' },
        { target: '斤 (weight)', note: 'produce, meat — the 500g produce-market default' },
      ],
      [ACT.grammarMeasure],
    ),
    createContentItem(
      '量词数量结构',
      'NUMBER + 量词 + NOUN — sample sentences',
      'Five short shopping sentences demonstrating the pattern. Notice 一 sandhi (yí before 4th tone 件/个) and 两 instead of 二 for "two".',
      'sentence',
      '我买一件衣服。(I buy a piece of clothing.)\n他要两双鞋。(He wants two pairs of shoes.)\n请给我三个苹果。(Please give me three apples.)\n她有五本书。(She has five books.)\n这家店卖好多衣服。(This shop sells a lot of clothes.)',
      'Each sentence is a usable shopping line; memorize the rhythm of NUMBER + 量词 + NOUN as a unit.',
      [
        { target: '我买 wǒ mǎi', note: '"I buy" — basic shopping subject + verb' },
        { target: '他要 tā yào', note: '"he wants" — 要 (yào) is a high-frequency "want / need" verb in shopping' },
        { target: '请给我 qǐng gěi wǒ', note: '"please give me" — the polite request frame from Grammar III' },
      ],
      [ACT.grammarMeasure],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Grammar III: 给 (gěi)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '给 verb',
      'gěi — "to give"',
      'The full verb 给 means "to give". The complete pattern is GIVER + 给 + RECIPIENT + ITEM = "GIVER gives RECIPIENT ITEM". Third tone — dips and rises. The single most common transactional verb in Mandarin shopping.',
      'sentence',
      '我给你一百块。(wǒ gěi nǐ yìbǎi kuài, "I give you 100 yuan.")\n老板给我两个苹果。(lǎobǎn gěi wǒ liǎng gè píngguǒ, "the boss gives me two apples.")',
      'The verb form establishes a clear transfer of an item from one party to another.',
      [
        { target: '给 + 人 + 物', note: '"give [PERSON] [THING]" — the double-object pattern' },
        { target: '我给你 / 你给我', note: 'subject switches based on who is giving; both directions are common in shopping' },
      ],
      [ACT.grammarGei],
    ),
    createContentItem(
      '给 preposition',
      'gěi — "for / to" preposition',
      'The same character 给 also functions as a preposition meaning "for / to [the benefit of]". Pattern: 给 + RECIPIENT + VERB-PHRASE = "do VERB-PHRASE for/to RECIPIENT". The nominalizer 的 attaches when the whole 给-phrase modifies a noun: 给你的礼物 ("the gift for you").',
      'sentence',
      '这是给你的礼物。(zhè shì gěi nǐ de lǐwù, "this is a gift for you.")\n我给妈妈买一个礼物。(wǒ gěi māma mǎi yí gè lǐwù, "I am buying a gift for mom.")',
      'A handy framing for any purchase made on someone else\'s behalf; the preposition use is just as common as the verb use.',
      [
        { target: '给 + 人 + 动词短语', note: '"for [PERSON], do [VERB]"; the benefactive pattern' },
        { target: '给…的 N', note: '"the N for…"; nominalized with 的, common in gift-giving' },
      ],
      [ACT.grammarGei],
    ),
    createContentItem(
      '请给我',
      'qǐng gěi wǒ',
      'The polite request frame "please give me…". Pattern: 请给我 + NUMBER + 量词 + NOUN. The default ordering / shopping request in Mandarin, softer than a bare 给我… imperative. Equivalent in function to "I\'ll have…" or "Could I get…" in English.',
      'sentence',
      '请给我两瓶水。(qǐng gěi wǒ liǎng píng shuǐ, "please give me two bottles of water.")\n请给我一件这个。(qǐng gěi wǒ yí jiàn zhège, "please give me one of these [clothing items].")',
      'The single most useful sentence frame in this entire unit; memorize as a chunk and swap the noun.',
      [
        { target: '请 qǐng', note: '"please"; the politeness softener' },
        { target: '给我 gěi wǒ', note: '"give me"; the verb + recipient' },
        { target: '+ N 量词 / N', note: 'the item being requested; with quantity for counted nouns' },
      ],
      [ACT.grammarGei],
    ),
    createContentItem(
      '议价用语',
      'yìjià yòngyǔ — bargaining frames',
      'The standard polite bargaining toolkit: open with 太贵了 ("too expensive"), counter with 便宜一点 ("a bit cheaper") or 可以打折吗? ("can you give a discount?"), name a counter-offer with X 块 怎么样? ("how about X yuan?"), close with 好吧 ("OK then") or 不要 ("don\'t want it"). Always smile.',
      'sentence',
      'A: 这件多少钱? — B: 两百块。\nA: 太贵了，便宜一点吧。 — B: 一百八。\nA: 一百块怎么样? — B: 一百五。\nA: 好，就一百五吧。',
      'A four-turn negotiation: opening price, complaint + soft counter, hard counter-offer, settlement. The whole sequence takes about 20 seconds at a Beijing market.',
      [
        { target: '太贵了 tài guì le', note: 'opener: "too expensive!"; signals you want a lower price' },
        { target: '便宜一点 piányi yìdiǎn', note: 'soft counter: "a bit cheaper"; uses 一点 to soften' },
        { target: '可以打折吗? kěyǐ dǎ zhé ma?', note: 'discount question; more common in stores than markets' },
        { target: 'X 块怎么样? X kuài zěnmeyàng?', note: 'counter-offer: "how about X yuan?"; the haggle midpoint' },
        { target: '好吧 hǎo ba', note: 'agreement: "OK then"; the deal-closing phrase' },
      ],
      [ACT.grammarGei],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '逛市场',
      'guàng shìchǎng',
      'A complete first-person account of a Saturday at a Beijing flea market. Read aloud with correct tones, sandhi, and natural rhythm. Notice the colloquial register throughout (块 not 元) and the mix of measure words.',
      'sentence',
      '今天我和清华的同学去潘家园市场。我们想买一些纪念品。我买了一件衣服和两双袜子。老板说衣服一百八十块，我说太贵了，便宜一点吧。最后我们一百二十块成交了。袜子十块一双，我没还价。我用微信支付付了钱。',
      'Translation: "Today I went to Panjiayuan market with a Tsinghua classmate. We wanted to buy some souvenirs. I bought one piece of clothing and two pairs of socks. The boss said the clothing was 180 yuan; I said it was too expensive and asked for a bit cheaper. In the end we settled at 120 yuan. Socks were 10 yuan a pair — I didn\'t haggle on those. I paid with WeChat Pay."',
      [
        { target: '潘家园 Pānjiāyuán', note: 'a famous Beijing flea market in the southeast of the city, known for antiques, calligraphy, and souvenirs; bargaining is expected' },
        { target: '一件衣服和两双袜子', note: '"one piece of clothing and two pairs of socks"; demonstrates two different measure words (件 / 双) in one phrase' },
        { target: '一百八十块', note: '"180 yuan"; opening price — markets always start above the real price' },
        { target: '便宜一点吧 piányi yìdiǎn ba', note: 'standard polite bargaining frame; the 吧 softens it further' },
        { target: '一百二十块成交了', note: '"settled at 120 yuan"; 成交 (chéng jiāo) is "close a deal"' },
        { target: '没还价 méi huán jià', note: '"didn\'t haggle"; 还价 (huán jià) is "counter-offer / haggle"' },
        { target: '微信支付付了钱', note: '"paid by WeChat Pay"; QR-code payment is the modern default' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí — comprehension questions',
      'Five comprehension questions matching the paragraph. Answer each in a short complete sentence — full sentences are natural in Mandarin for these "wh" questions.',
      'sentence',
      'Q1: 他们去了哪个市场?\nQ2: 他买了什么?\nQ3: 衣服的原价是多少?\nQ4: 最后多少钱成交?\nQ5: 他用什么付钱?',
      'Five micro-questions covering location, items, opening price, closing price, and payment method — the full life cycle of a market transaction.',
      [
        { target: 'A1: 他们去了潘家园市场。', note: 'location answer; just give the market name' },
        { target: 'A2: 他买了一件衣服和两双袜子。', note: 'item-listing answer; uses two measure words from the paragraph' },
        { target: 'A3: 一百八十块。', note: 'opening-price answer; bare price is fine' },
        { target: 'A4: 一百二十块。', note: 'closing-price answer; the haggled-down amount' },
        { target: 'A5: 他用微信支付付钱。', note: 'payment-method answer; uses the full method name' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '市场对话 — 砍价',
      'shìchǎng duìhuà — kǎn jià',
      'A natural market bargaining dialogue between a customer and a Beijing vendor. Covers the full toolkit from this lesson: price question, measure words, complaint, counter-offer, settlement, and payment.',
      'conversation',
      'A: 老板，这件衣服多少钱?\nB: 这件? 两百块。\nA: 太贵了。能不能便宜一点?\nB: 你想出多少?\nA: 一百块怎么样?\nB: 一百块不行，一百五。\nA: 一百二，好吗?\nB: 好吧，一百二就一百二。你要不要别的?\nA: 再给我两个苹果。多少钱一斤?\nB: 苹果五块一斤。两个差不多一斤。\nA: 好，一共多少?\nB: 一百二十五块。\nA: 我用微信支付。\nB: 扫这个码就行。',
      'A natural exchange between peers using friendly market register — gentle haggling, no anger, all smiles. The deal closes within a minute.',
      [
        { target: '能不能便宜一点? néng bu néng piányi yìdiǎn?', note: 'extra-polite haggle question: "could it be a little cheaper?"; 能不能 softens the request further' },
        { target: '你想出多少? nǐ xiǎng chū duōshǎo?', note: '"how much do you want to offer?"; vendor invites the counter-offer' },
        { target: '一百二 yìbǎi èr', note: '"120" — colloquial shorthand for 一百二十块; common in fast haggling' },
        { target: '差不多 chàbuduō', note: '"about / approximately"; the vendor estimates the weight informally' },
        { target: '扫这个码 sǎo zhège mǎ', note: '"scan this code"; the QR-payment closer' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '便利店对话 — 定价',
      'biànlìdiàn duìhuà — dìngjià',
      'A convenience-store dialogue — no bargaining, fixed price, scan-and-pay. The register difference from the market dialogue is immediate: efficient, transactional, no warmth performance.',
      'conversation',
      'A: 你好，一瓶水多少钱?\nB: 三块。\nA: 我要两瓶水和一个面包。\nB: 一共十二块。\nA: 微信还是支付宝?\nB: 都可以。\nA: 我扫一下。\nB: 谢谢，欢迎再来。',
      'Same information shape but completely different rhythm — no negotiation, no chit-chat, two scans and out the door. Standard at any 7-Eleven, 全家, or Tsinghua campus 超市.',
      [
        { target: '面包 miànbāo', note: '"bread"; convenience-store standard item' },
        { target: '一共 yígòng', note: '"in total / altogether"; introduces the final amount' },
        { target: '微信还是支付宝? wēixìn háishì zhīfùbǎo?', note: 'standard payment-method question at any modern Chinese checkout; 还是 (or) gives the customer a binary choice' },
        { target: '都可以 dōu kěyǐ', note: '"both work"; vendor accepts either payment method' },
        { target: '欢迎再来 huānyíng zài lái', note: '"welcome back next time"; the standard fixed-store closer' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn — writing template',
      'A reusable five-sentence template for writing about any shopping trip. Fill in the bracketed slots with your own information — the structure handles the rest.',
      'sentence',
      '今天我去了 [地方]。我买了 [数量+量词+物品] 和 [数量+量词+物品]。[物品] 的价钱是 [价钱]。我用 [付款方式] 付了钱。一共 [总价]。',
      'Five sentences cover the core: where, what + counts, per-item price, payment method, total — the minimum complete shopping account.',
      [
        { target: '[地方]', note: 'the place: 潘家园市场, 超市, 商场, etc.' },
        { target: '[数量+量词+物品]', note: 'the item with proper measure word: 一件衣服, 三个苹果, 两瓶水' },
        { target: '[价钱]', note: 'the price using 块: 一百块, 二十块一件, 五块一斤' },
        { target: '[付款方式]', note: 'the payment method: 现金, 微信支付, 支付宝' },
        { target: '[总价]', note: 'the total amount in 块' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí — writing prompt',
      'Write your own 3–5 sentence shopping account in Hanzi using the template. Use at least two different measure words and one price expression so the writing demonstrates the core grammar of this lesson.',
      'sentence',
      '示例: 昨天我去了清华附近的水果店。我买了两斤苹果和一瓶水。苹果是五块一斤，水是三块。我用支付宝付了钱。一共十三块。',
      'Translation: "Yesterday I went to a fruit shop near Tsinghua. I bought two 斤 of apples and one bottle of water. Apples were 5 yuan per 斤, water was 3 yuan. I paid with Alipay. Total 13 yuan."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '议价场合',
      'yìjià chǎnghé — where bargaining is expected',
      'Bargaining is expected at traditional markets (市场), flea markets (跳蚤市场), antique markets (古玩市场, like 潘家园), and street stalls (小摊). At these places, the first price is always an opening offer; not haggling marks you as a tourist who doesn\'t know the rules. A 10–30% discount is the typical settlement zone.',
      'sentence',
      '潘家园 Pānjiāyuán (flea market, bargaining ✓) · 798艺术区小店 (798 art-district small shops, light bargaining ✓) · 菜市场 càishìchǎng (vegetable market, bargaining ✓)',
      'The vendor expects the back-and-forth; treating it as a real conflict is the mistake — it is a social ritual that builds rapport and finalizes a fair price.',
      [
        { target: '市场 / 集市', note: 'open-air markets; bargaining is the default rhythm' },
        { target: '古玩市场', note: 'antique markets; bargaining is essential because opening prices can be 2-3x the real value' },
        { target: '小摊 / 路边摊', note: 'street stalls; small bargains expected on bulk purchases' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '不议价场合',
      'bù yìjià chǎnghé — where bargaining is NOT expected',
      'Bargaining is socially wrong at supermarkets (超市 like 物美, 永辉), shopping malls (商场), chain stores, convenience stores (便利店 like 711, 全家), and most restaurants. Prices are fixed by corporate policy or printed on tags; asking for a discount marks you as confused. Sales (促销) and discount labels (打折) are pre-set.',
      'sentence',
      '超市 chāoshì (supermarket, fixed price ✗) · 商场 shāngchǎng (mall, fixed price ✗) · 711 / 全家 (convenience stores, fixed price ✗)',
      'A clean rule of thumb: if there is a price tag on the item, no haggling; if the vendor calls out the price verbally, haggling is fair game.',
      [
        { target: '超市', note: 'supermarkets; barcode-scanned prices, no haggling' },
        { target: '商场 / 购物中心', note: 'malls and shopping centers; pre-set retail prices' },
        { target: '便利店', note: 'convenience stores; chain-controlled fixed pricing' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '扫码支付的革命',
      'sǎo mǎ zhīfù de gémìng',
      'Since around 2015, mainland China underwent a payment revolution: QR-code payments via 微信支付 and 支付宝 became the default, leapfrogging credit cards entirely. By 2020, even street vendors and beggars accepted QR codes. Cash use has declined sharply year by year, and many young vendors no longer keep cash drawers at all.',
      'sentence',
      '中国从2015年起几乎所有的小商家都接受扫码支付。(Since 2015, almost all small Chinese vendors have accepted QR-code payments.)',
      'For visiting learners, this means an Alipay or WeChat account is more essential than a wallet — physical cash is increasingly inconvenient.',
      [
        { target: '微信支付 (WeChat Pay)', note: 'the dominant in-app payment; integrated into the WeChat super-app' },
        { target: '支付宝 (Alipay)', note: 'the second-dominant; from Alibaba/Taobao ecosystem' },
        { target: '现金 declining', note: 'cash now rare in cities; many vendors prefer or only accept QR payments' },
        { target: '信用卡 less common', note: 'credit cards are surprisingly uncommon at small vendors; QR codes leapfrogged them' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '双十一购物节',
      'shuāng shí yī gòuwù jié',
      '双十一 (literally "double eleven", November 11) is the world\'s largest shopping day — bigger than Black Friday and Cyber Monday combined. Originally a 2009 marketing stunt by Alibaba/Taobao around the "singles\' day" pun (1111 = four ones = four single people), it now drives the entire Chinese e-commerce calendar.',
      'sentence',
      '双十一一天销售额超过五千亿人民币。(On 双十一 one-day sales exceed 500 billion RMB.)',
      'Beyond 双十一, the calendar also has 618 (June 18, JD.com\'s rival sale day) and 双十二 (December 12, follow-up) — modern China\'s consumer year is structured around these e-commerce festivals.',
      [
        { target: '双十一 (11/11)', note: 'Singles Day; Alibaba/Taobao mega-sale; the world\'s biggest single shopping day' },
        { target: '618 (6/18)', note: 'JD.com (京东) sale day; the second-largest Chinese e-commerce event' },
        { target: '黑色星期五 / 黑五', note: 'imported "Black Friday"; small in China compared to 双十一' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '淘宝议价',
      'Táobǎo yìjià',
      'Even online, bargaining is part of Chinese e-commerce culture. On 淘宝 (Taobao, Alibaba\'s consumer marketplace), buyers routinely chat with sellers through the in-app messenger 旺旺 (Wàngwàng) and ask for small discounts, free shipping, or extra items. The asking pattern follows the same rules: polite tone, 一点, never aggressive.',
      'sentence',
      '亲，能不能便宜一点? 包邮吗? (qīn, néng bu néng piányi yìdiǎn? bāo yóu ma?, "Dear, could it be a little cheaper? Free shipping?")',
      '亲 (qīn, "dear") is the universal Taobao chat opener; using it signals you know the platform\'s social register.',
      [
        { target: '亲 qīn', note: '"dear"; the Taobao-chat opener; an inherited social custom of the platform' },
        { target: '包邮 bāo yóu', note: '"free shipping" — a common discount request alongside or instead of price cuts' },
        { target: '小礼物 xiǎo lǐwù', note: '"a small gift"; another common ask — Taobao sellers often include freebies' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 13 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 潘家园逛市场',
      'rènwù: Pānjiāyuán guàng shìchǎng',
      'Roleplay a Saturday at 潘家园 flea market with the tutor playing a friendly Beijing vendor. Use every skill from this lesson in one continuous scene — greet, ask prices, count items with the right measure words, bargain politely on one item, and pay by QR code.',
      'conversation',
      '[潘家园市场, Saturday morning]\n老板: 老板，看看! 都是好东西!\n你: [打招呼 + 问第一个东西的价格]\n老板: 这件衣服两百五十块。\n你: [太贵了 + 还价]\n老板: 那两百块怎么样?\n你: [接受或再低]\n老板: 行，就这个价。还要别的吗?\n你: [问第二个东西 (水果/纪念品) 的价格]\n老板: [回答价钱]\n你: [总价 + 支付方式]\n老板: 谢谢，欢迎再来!',
      'Seven turns of fluent exchange; the tutor will play the vendor and respond naturally to whatever you say. Aim for one successful bargain.',
      [
        { target: '打招呼', note: '老板, 你好 / 老板, 看看! — match the market register, friendly and casual' },
        { target: '问价格', note: '这件多少钱? / 苹果多少钱一斤? — use 多少钱 with optional 一 量词 for per-unit prices' },
        { target: '还价', note: '太贵了 + 便宜一点吧 / X 块怎么样? — the standard polite haggle' },
        { target: '量词', note: '一件 (clothing), 一双 (shoes), 一斤 (fruit by weight), 一个 (general) — pick the right one' },
        { target: '付款', note: '微信支付 / 支付宝 / 现金 — name the method and offer to scan' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 多次议价',
      'tiǎozhàn — duō cì yìjià',
      'Stretch goal: in the same scene, attempt a multi-round bargain. The vendor opens at 250, you counter at 100, vendor moves to 200, you move to 150, settle at 170. Three rounds with no awkwardness — the goal is to keep the rhythm fluid and the smiles intact.',
      'conversation',
      '老板: 两百五十块。\n你: 太贵了! 一百块吧。\n老板: 一百? 不行不行。两百块最少。\n你: 一百五十怎么样?\n老板: 一百八，不能再低了。\n你: 一百七，好吗? 我真的喜欢这个。\n老板: 好吧好吧，看你这么有诚意，一百七拿走!\n你: 谢谢老板!',
      '"看你这么有诚意" ("seeing how sincere you are") is the vendor\'s face-saving close — gives them a reason to accept your lower price without "losing".',
      [
        { target: '一百块吧', note: 'the opening lowball; vendors expect this, do not be shy' },
        { target: '不行不行 bù xíng bù xíng', note: '"no way"; doubled for emphasis — a standard refusal that is not actually final' },
        { target: '不能再低了 bù néng zài dī le', note: '"can\'t go any lower"; vendor\'s "final" position, often still negotiable' },
        { target: '有诚意 yǒu chéngyì', note: '"sincere"; the face-saving label vendors apply to accept a lower offer' },
        { target: '拿走 ná zǒu', note: '"take it away"; closing imperative when the deal is done' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
