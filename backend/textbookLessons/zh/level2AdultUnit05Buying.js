// Level 2 Adult Unit 5 — Buying & Bigger Purchases (Mandarin Chinese)
// Functions: appliance / electronics / online purchase vocabulary,
// e-commerce verbs (place order, ship, receive, review, refund),
// returns / exchanges / warranties, after-sales 客服 chat,
// comparison shopping (性价比 / 划算), the Taobao vs JD ecosystem,
// 双十一 Singles Day, the 7-day no-reason return policy, and counterfeits.
//
// Level 1 Unit 8 covered street-market basics (asking prices, bargaining,
// QR-code pay). This unit goes deeper: 家电, 电脑, 手机, 家具, 品牌,
// 型号, 配置, 库存, 现货, 缺货, 预定, 发货, 包邮, 货到付款, 退货,
// 换货, 退款, 保修, 售后 — the modern Chinese e-commerce vocabulary an
// adult buyer needs to navigate Taobao 淘宝 and JD 京东.
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
  orientation: 'zh-l2au5-orientation',
  pronunciation: 'zh-l2au5-pronunciation',
  vocabularyGoods: 'zh-l2au5-vocab-goods',
  vocabularyEcommerce: 'zh-l2au5-vocab-ecommerce',
  vocabularyAfterSales: 'zh-l2au5-vocab-after-sales',
  grammarComparison: 'zh-l2au5-grammar-comparison',
  grammarMore: 'zh-l2au5-grammar-yueyue',
  grammarConcession: 'zh-l2au5-grammar-concession',
  reading: 'zh-l2au5-reading',
  listening: 'zh-l2au5-listening',
  writing: 'zh-l2au5-writing',
  culture: 'zh-l2au5-culture',
  task: 'zh-l2au5-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Shop for bigger purchases in Mandarin — appliances, electronics, computers, phones, furniture — naming the brand (品牌), model (型号), and key specs (配置) of what you want.',
      'Navigate a Taobao 淘宝 or JD 京东 order end to end: 下单 (place order) → 发货 (ship) → 收货 (receive) → 评价 (review), and respond when something goes wrong.',
      'Handle returns, exchanges, refunds, and warranty claims with after-sales 客服 (customer service) over chat, using the right vocabulary and the right register.',
      'Compare two products on 性价比 (cost-performance ratio) and explain why one is more 划算 (worthwhile) than the other using comparison and concession structures from Grammar I–III.',
    ],
    task: 'Picture a typical month at Tsinghua University 清华大学: your dorm laptop arrived from Taobao yesterday but the screen flickers. By the end of this lesson you should open a 客服 chat, describe the defect, request a refund or exchange, and confirm return shipping — all in Mandarin.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce 性价比 (xìngjiàbǐ) — three different tones in a row (4-4-3) on three high-frequency syllables; the dip on the final 比 is what makes it sound natural.',
      'Pronounce 货到付款 (huòdàofùkuǎn) — four consecutive fourth-tone syllables; do not soften any of them or it loses the brisk, businesslike rhythm Chinese e-commerce uses.',
      'Distinguish 退款 (tuìkuǎn, "refund / money returned") from 退货 (tuìhuò, "return goods") and 换货 (huànhuò, "exchange goods") — three after-sales actions with three different outcomes.',
      'Pronounce 售后 (shòuhòu) cleanly — both retroflex sh + fourth tone, then another fourth-tone-but-h-initial syllable; learners often soften the second 后 into a neutral tone, which native speakers don\'t do.',
    ],
    task: 'Read each pronunciation target aloud three times, then drill the minimal triple 退款 / 退货 / 换货 until the meaning of each is unambiguous from sound alone.',
  },
  {
    id: ACT.vocabularyGoods,
    section: 'Vocabulary I',
    title: 'Bigger purchases — appliances, electronics, furniture',
    goals: [
      'Use the umbrella categories 家电 (home appliances), 电脑 (computer), 手机 (phone), 家具 (furniture) and know which marketplace each is typically bought from.',
      'Specify a product by 品牌 (brand) + 型号 (model) + 配置 (specs) — the three pieces of information every Chinese e-commerce listing organizes itself around.',
      'Check 库存 (stock): the contrast between 现货 (in stock, ships today) and 缺货 (out of stock); when 缺货, the option becomes 预定 (pre-order).',
    ],
    task: 'For each of three target items (a laptop, a fridge, a sofa) say one full sentence identifying brand, model, and one key spec using 品牌 / 型号 / 配置.',
  },
  {
    id: ACT.vocabularyEcommerce,
    section: 'Vocabulary II',
    title: 'E-commerce verbs — placing, shipping, paying, reviewing',
    goals: [
      'Use the four-step order verbs 下单 (place order) → 发货 (ship out) → 收货 (receive / sign for) → 评价 (review) as a complete e-commerce timeline.',
      'Choose a shipping/payment arrangement: 包邮 (free shipping included) vs 不包邮, 货到付款 (cash on delivery) vs 在线支付 (online payment in advance).',
      'Quote a 客服 (customer service) chat opener: 你好，我想咨询一下… ("Hello, I\'d like to inquire about…") — the standard polite-but-direct opening line for any after-sales chat.',
    ],
    task: 'Walk a partner through your most recent online order in four sentences, one per step (下单 → 发货 → 收货 → 评价).',
  },
  {
    id: ACT.vocabularyAfterSales,
    section: 'Vocabulary III',
    title: 'Returns, exchanges, refunds, and warranty',
    goals: [
      'Distinguish 退货 (return the goods), 换货 (exchange for a different one), and 退款 (refund the money) — three different remedies for three different situations.',
      'Use 保修 (warranty / under-warranty repair) for hardware defects within the warranty period, and 售后服务 (after-sales service) as the umbrella term for the whole post-purchase relationship.',
      'Invoke the 七天无理由退货 (7-day no-reason return) policy: the legal floor for any Chinese e-commerce purchase, which the buyer can cite without explanation.',
    ],
    task: 'Pair each scenario (wrong size / dead on arrival / changed mind within a week) with the correct after-sales request — 换货, 退款, or 退货 — and say it in one sentence.',
  },
  {
    id: ACT.grammarComparison,
    section: 'Grammar I',
    title: '比…更/还… — Even more than',
    goals: [
      'Move beyond the Level 1 plain comparison (A 比 B + adj) by adding the intensifiers 更 (even more) and 还 (still more) inside the structure — A 比 B 更/还 + adj.',
      'Know that 还 carries a slight note of surprise or emphasis ("this one is EVEN cheaper than I expected"), while 更 is a neutral upgrade of the comparison ("this one is even cheaper").',
      'Never put 很 (very) inside a 比-comparison — 我比你很高 is wrong; the comparative adjective stays plain or takes 更/还.',
    ],
    task: 'Compare three pairs of products (two laptops, two phones, two sofas) using 比…更… or 比…还… and at least one negative comparison with 没有…那么….',
  },
  {
    id: ACT.grammarMore,
    section: 'Grammar II',
    title: '越…越… — The more…, the more…',
    goals: [
      'Use 越 X 越 Y to link two scaling conditions: as X increases, Y increases ("the more I use it, the more I like it" — 越用越喜欢).',
      'Know two common patterns: (a) same subject — 我越想越生气 ("the more I think about it, the angrier I get"); (b) different subjects — 东西越贵，质量不一定越好 ("the more expensive a thing is, the better its quality isn\'t necessarily").',
      'Distinguish 越…越… from the unrelated 越来越… ("more and more over time") — the first links two variables, the second describes a trend.',
    ],
    task: 'Construct three 越…越… sentences applied to shopping (price/quality, use/like, buy/regret) and one 越来越… trend sentence.',
  },
  {
    id: ACT.grammarConcession,
    section: 'Grammar III',
    title: '虽然…但是… — Although…still…',
    goals: [
      'Use the paired concession structure 虽然 X，但是 Y to acknowledge a downside before stating a stronger upside — the standard polite frame for justifying any purchase decision.',
      'Know that the structure is symmetric: BOTH halves are usually said in Mandarin, unlike English "although X" which can stand alone — dropping 但是 sounds incomplete to a native ear.',
      'Use the close variants 尽管…但是… (slightly more formal/written) and …，可是… (slightly softer / spoken) in the right registers.',
    ],
    task: 'Write three concession sentences justifying purchases ("expensive but worth it", "slow shipping but trustworthy seller", "not the latest model but enough for my needs").',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a Taobao order summary and return policy',
    goals: [
      'Read a realistic Taobao order summary: item, brand, model, specs, price, shipping option, payment method, expected arrival, and after-sales policy.',
      'Identify which clauses of the return policy apply when the buyer changes their mind vs when the product is defective — two different paths through the same policy.',
    ],
    task: 'Read the order summary aloud once, then answer four comprehension questions about price, model, ship date, and refund window.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A 客服 chat about a defective laptop',
    goals: [
      'Follow a typed 客服 (customer service) chat dialogue where the buyer reports a defect, sends a photo, asks about remedies, and confirms the return-shipping arrangement.',
      'Recognize the polite-but-formal register a 客服 agent uses: 您 (instead of 你), 请 X (please X), 不好意思 (apology), 麻烦您… (may I trouble you to…).',
    ],
    task: 'Read the chat with the AI tutor playing the 客服, then perform the same chat substituting your own product and defect.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write a 评价 review and a 退款申请 refund request',
    goals: [
      'Write a 3-sentence 评价 (post-purchase review) covering quality, shipping speed, and overall recommendation — the three slots Taobao reviewers always fill.',
      'Write a 5-sentence 退款申请 (refund request) message stating order number, problem, requested remedy (refund vs exchange), and willingness to return shipping at your own cost or theirs.',
    ],
    task: 'Choose one recent online purchase (real or imagined) and write both texts in Hanzi using the templates on the left.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Taobao vs JD, 双十一, and why cash is dying',
    goals: [
      'Know the structural difference between 淘宝 (Taobao, C2C — millions of independent sellers, lower prices, higher counterfeit risk) and 京东 (JD, B2C — first-party warehouses, faster shipping, stronger after-sales).',
      'Know the origin of 双十一 (Singles Day, November 11th) — invented by Alibaba in 2009, now the world\'s largest shopping festival, with 618 (June 18th, JD\'s anniversary) as the second-tier echo.',
      'Know that 客服 chat is the default support channel — phone support is rare in Chinese e-commerce — and that 七天无理由退货 (7-day no-reason return) is enforced by law for any online consumer purchase.',
      'Know that 现金 (cash) is increasingly rare in urban China; even street vendors prefer QR-code payment, and a foreign cash-only buyer can be genuinely awkward to serve.',
    ],
    task: 'Decide for each of three scenarios (cheap accessory / mid-range phone / large appliance) which platform you would buy from and explain why in one sentence each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Open a 客服 chat about a broken Taobao laptop',
    goals: [
      'Combine all three grammar points and all three vocabulary fields into one continuous after-sales chat — describe the problem, request a remedy, and confirm return shipping.',
      'Hold the right register throughout: polite but firm with 您 / 请 / 麻烦, and use 虽然…但是… at least once to make your case sound reasonable rather than confrontational.',
    ],
    task: 'Roleplay a 客服 chat with the AI tutor about a flickering laptop screen on a 3-day-old Taobao order; aim for an 8-turn exchange ending with a confirmed refund or exchange and a return-shipping plan.',
  },
];

const lesson = {
  title: 'Level 2 (Adult) · Unit 5: 网购大件 — Buying Bigger Things Online and Off',
  category: 'shopping',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'asking-stock', label: 'Asking about stock', goal: 'Use 还有现货吗? / 这款缺货吗? to ask whether an item is available before placing an order.' },
    { id: 'requesting-refund', label: 'Requesting a refund', goal: 'Use 我想申请退款 + reason (defect, wrong item, changed mind within 7 days) to open a refund request politely.' },
    { id: 'requesting-exchange', label: 'Requesting an exchange', goal: 'Use 我想换一个 + reason (size, color, defect) to request an exchange instead of a refund.' },
    { id: 'comparing-products', label: 'Comparing two products', goal: 'Use A 比 B 更…/还… or A 没有 B 那么… to argue which of two products is more 划算 (worthwhile).' },
    { id: 'invoking-policy', label: 'Invoking 7-day return', goal: 'Use 根据七天无理由退货规定… to cite the legal return window when the seller resists.' },
  ],
  relatedPools: ['topic-shopping', 'topic-internet', 'topic-money'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can describe a bigger purchase by brand, model, and specs; walk the full Taobao or JD order timeline; open a 客服 chat when something goes wrong; and choose between refund, exchange, or warranty repair based on the situation.',
      'word',
      'Functional language: 网购 wǎnggòu (online shopping) · 实体店 shítǐdiàn (brick-and-mortar) · 下单 xiàdān (place order) · 售后 shòuhòu (after-sales) · 退换 tuìhuàn (return/exchange)',
      'These five capability areas build on Level 1 Unit 8 (street-market bargaining) — this unit moves from cash-and-pick-up shopping to the modern online-and-after-sales world.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at 清华大学 (Tsinghua University) and the laptop you ordered from 淘宝 last week arrived yesterday. You unboxed it this morning and the screen flickers every few minutes. You open the 客服 chat to describe the defect, send a photo, and request a refund or exchange.',
      'word',
      '你: "你好，三天前下的单，今天发现屏幕闪烈，请问能退款吗?"',
      'A typical opener for an after-sales chat: polite 你好 + brief problem description + the specific request (退款 / 换货). The 客服 will respond in seconds because Taobao agents are evaluated on response time.',
      [
        { target: '三天前下的单', note: '"placed the order three days ago"; situates the case inside the 7-day no-reason return window' },
        { target: '屏幕闪烁 píngmù shǎnshuò', note: '"the screen flickers"; precise hardware-defect vocabulary' },
        { target: '能退款吗?', note: '"can I get a refund?"; the direct ask the 客服 expects you to make' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '网购 vs 实体店',
      'wǎnggòu vs shítǐdiàn',
      'Mandarin distinguishes two purchase channels by single words. 网购 (online shopping, lit. "net-buying") is the default in urban China for anything bigger than groceries; 实体店 (brick-and-mortar store, lit. "physical-body store") is reserved for items the buyer wants to see in person — large furniture, premium electronics, anything where touch matters.',
      'word',
      '网购便宜，实体店放心 — "online shopping is cheap, brick-and-mortar is reassuring".',
      'A common Chinese consumer maxim that summarizes the trade-off most adults face — and that this unit will teach you to navigate.',
      [
        { target: '网购 wǎnggòu', note: 'online shopping; default for books, clothes, small appliances, and electronics under ~5000 RMB' },
        { target: '实体店 shítǐdiàn', note: 'brick-and-mortar; preferred for premium electronics, furniture, and anything where buyer wants hands-on confirmation' },
        { target: '线上 / 线下 xiànshàng / xiànxià', note: '"online / offline" — the more business-flavored variants of the same distinction' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '性价比',
      'xìngjiàbǐ',
      'Three high-frequency syllables in 4-4-3 tone pattern. The final 比 must take a full third-tone dip-and-rise; learners often flatten it to a low tone, which sounds clipped. The word "cost-performance ratio" appears in nearly every Chinese product review.',
      'word',
      '这款手机性价比很高。 ("This phone has very good cost-performance.")',
      'Drill the falling-falling-dip shape until the rhythm is automatic; this word will appear in every shopping conversation from now on.',
      [
        { target: '性 xìng (4th)', note: 'sharp falling; "nature, quality"' },
        { target: '价 jià (4th)', note: 'sharp falling; "price"' },
        { target: '比 bǐ (3rd)', note: 'full dip-and-rise; "ratio, compare" — keep the dip or the word sounds incomplete' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '货到付款',
      'huòdàofùkuǎn',
      'Four consecutive fourth-tone syllables — the brisk, decisive rhythm typical of Chinese commercial vocabulary. Each falling tone must be sharp; softening any one of them makes the phrase sound hesitant, which is the opposite of what "cash on delivery" should sound like.',
      'word',
      '我选货到付款。 ("I\'ll choose cash on delivery.")',
      'Less popular now than 在线支付, but still standard for buyers in smaller cities who don\'t trust online payment with unfamiliar sellers.',
      [
        { target: '货 huò (4th)', note: '"goods"' },
        { target: '到 dào (4th)', note: '"arrive"' },
        { target: '付 fù (4th)', note: '"pay"' },
        { target: '款 kuǎn (3rd, but in final position often pronounced short-fall)', note: '"money / sum"; in this compound the final syllable still keeps a noticeable fall' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '退款 / 退货 / 换货',
      'tuìkuǎn / tuìhuò / huànhuò',
      'A minimal triple that learners constantly confuse. 退款 (refund — money goes back). 退货 (return — goods go back, money usually goes back too). 换货 (exchange — goods go back, different goods come forward, no money movement). Native speakers ask precisely for the right one; mixing them up confuses the 客服.',
      'word',
      '我想退款 ≠ 我想退货 ≠ 我想换货',
      'Drill the three until the meaning of each is unambiguous; misordering them is the most common after-sales mistake learners make.',
      [
        { target: '退款 tuìkuǎn', note: '"refund money" — get the cash back; goods may or may not need to be returned' },
        { target: '退货 tuìhuò', note: '"return goods" — send the item back; refund usually follows automatically' },
        { target: '换货 huànhuò', note: '"exchange goods" — swap the defective/wrong one for a different unit; no money movement' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '售后',
      'shòuhòu',
      'A retroflex sh- onset followed by another fourth-tone-with-h-initial syllable. Both tones must be fully fourth-tone — learners frequently soften the second 后 to a neutral tone, which native speakers don\'t do for this compound. Short for 售后服务 ("after-sales service").',
      'word',
      '这家店的售后做得很好。 ("This store\'s after-sales service is excellent.")',
      'The whole umbrella concept covering returns, exchanges, refunds, warranty repairs, and follow-up — a Chinese consumer evaluates a seller largely on 售后 quality.',
      [
        { target: '售 shòu (4th)', note: '"sell"; retroflex sh-' },
        { target: '后 hòu (4th)', note: '"after"; full fourth tone, not neutral' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '一 sandhi inside compounds',
      'yī sandhi inside compounds',
      'The 一 sandhi from Foundation still applies inside this unit\'s key compounds. 一 + 4th → yí: e.g., 一件 yíjiàn, 一款 yíkuǎn (no, kuǎn is 3rd → yìkuǎn), 一次 yícì ("once"). 一 + 1st/2nd/3rd → yì: e.g., 一台 yìtái (台 is 2nd; one classifier for appliances), 一年 yìnián ("one-year warranty"), 一年保修 yìnián bǎoxiū.',
      'word',
      '一年保修 yìnián bǎoxiū ("one-year warranty") · 一台电脑 yìtái diànnǎo ("one computer")',
      'Pay attention to 台 — the standard measure word for appliances and electronics (computers, TVs, fridges); replaces the Level 1 general 个 when counting big-ticket devices.',
      [
        { target: '一年 yìnián', note: '一 + 2nd → yì; "one year" — appears in 一年保修' },
        { target: '一台 yìtái', note: '一 + 2nd → yì; measure word for appliances and electronics' },
        { target: '一次 yícì', note: '一 + 4th → yí; "once / one time"' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Bigger purchases
    // ────────────────────────────────────────────────────────────────────
    createContentItem('家电', 'jiādiàn', 'The umbrella term for home appliances — fridges, washing machines, microwaves, air conditioners, TVs. Compound of 家 (home) + 电 (electric). Big 家电 (large appliances) and 小 家电 (small appliances) are common subdivisions in Chinese e-commerce category trees.', 'word', '我要买几件家电。', '"I need to buy a few home appliances." — 几件 ("a few") + 家电; uses the measure word 件 for goods.', null, [ACT.vocabularyGoods]),
    createContentItem('电脑', 'diànnǎo', 'A computer, desktop or laptop. Compound of 电 (electric) + 脑 (brain). The default measure word is 台 (yìtái diànnǎo, "one computer"); for laptops specifically 台 also works, though 部 appears occasionally.', 'word', '这台电脑是新的吗?', '"Is this computer new?" — 台 is the standard appliance/device measure word.', null, [ACT.vocabularyGoods]),
    createContentItem('笔记本电脑', 'bǐjìběn diànnǎo', 'A laptop, lit. "notebook computer". Often abbreviated to just 笔记本 in context. Distinguished from 台式机 (táishìjī, "desktop") and 平板 (píngbǎn, "tablet").', 'word', '我想买一台笔记本电脑，主要用来写论文。', '"I want to buy a laptop, mainly for writing papers." — 用来 introduces the purpose.', null, [ACT.vocabularyGoods]),
    createContentItem('手机', 'shǒujī', 'A mobile phone. Compound of 手 (hand) + 机 (machine). Measure word: 部 (yíbù shǒujī, "one phone") in slightly more formal contexts; 个 in casual speech. 智能手机 (zhìnéng shǒujī) = smartphone, though by default 手机 now means smartphone.', 'word', '我的手机用了三年了，该换了。', '"My phone has been in use for three years, time to replace." — 该…了 (gāi…le) marks the obligation/time-has-come sense.', null, [ACT.vocabularyGoods]),
    createContentItem('家具', 'jiājù', 'Furniture (collective noun) — sofas, beds, tables, chairs, wardrobes. NOT 家俱 (an older variant). Big 家具 is typically bought from physical stores (宜家 IKEA, 红星美凯龙 Red Star Macalline) because of size and inspection needs.', 'word', '搬家以后要买很多家具。', '"After moving, I\'ll need to buy a lot of furniture." — 搬家以后 = "after moving house"; common life event triggering 家具 purchase.', null, [ACT.vocabularyGoods]),
    createContentItem('品牌', 'pǐnpái', 'A brand (the company or product line). The first thing a Chinese buyer asks about a bigger purchase: 什么品牌? ("what brand?"). Chinese consumers are highly brand-aware; the brand carries the trust, the after-sales reputation, and resale value.', 'word', '你买的是什么品牌?', '"What brand did you buy?" — opens any conversation about an appliance, electronic, or phone purchase.', null, [ACT.vocabularyGoods]),
    createContentItem('型号', 'xíngháo', 'A specific model number within a brand (e.g., iPhone 15 Pro Max is a 型号; Apple is a 品牌). Chinese e-commerce listings always show the full 型号; matching it exactly when ordering is the buyer\'s responsibility.', 'word', '请问这是哪个型号?', '"Excuse me, which model is this?" — uses 请问 ("may I ask") + 哪个型号 in standard polite question form.', null, [ACT.vocabularyGoods]),
    createContentItem('配置', 'pèizhì', 'Technical specs of an electronic device — CPU, RAM, storage, screen size, GPU. Chinese tech buyers compare 配置 line-by-line across listings. Different from 品牌 (the brand identity) and 型号 (the model code).', 'word', '这款笔记本的配置怎么样? 16G内存，512G固态硬盘。', '"How are the specs on this laptop? 16GB RAM, 512GB SSD." — typical configuration shorthand: 16G内存 (memory), 固态硬盘 (SSD).', null, [ACT.vocabularyGoods]),
    createContentItem('库存', 'kùcún', 'Stock level. Chinese e-commerce listings show real-time 库存; "库存紧张" (stock is tight) signals urgency, "库存充足" (stock is sufficient) signals safety. Pronounced kùcún not kùchún — both are fourth + second.', 'word', '现在库存紧张，建议尽快下单。', '"Stock is tight right now, recommend ordering quickly." — the standard urgency line from a 客服 or product listing.', null, [ACT.vocabularyGoods]),
    createContentItem('现货', 'xiànhuò', 'In stock, available to ship today. The opposite of 缺货. A listing marked 现货 is the safest choice for time-sensitive purchases.', 'word', '这款是现货，今天下单明天发货。', '"This model is in stock; order today, ship tomorrow." — standard shipping commitment for 现货 items.', null, [ACT.vocabularyGoods]),
    createContentItem('缺货', 'quēhuò', 'Out of stock. The opposite of 现货. When something is 缺货 the next option is usually 预定 (pre-order) with an estimated 发货 date.', 'word', '这个型号暂时缺货，预计下周到货。', '"This model is temporarily out of stock, expected to arrive next week." — typical 客服 reply when an item is unavailable.', null, [ACT.vocabularyGoods]),
    createContentItem('预定 / 预订', 'yùdìng', 'Pre-order / reserve in advance. Used for items that aren\'t available yet (new product launches) or for limited-stock items the buyer doesn\'t want to miss. 预定 and 预订 are interchangeable in modern usage.', 'word', '新款手机现在可以预定，下个月发货。', '"The new phone is now available for pre-order, ships next month." — typical pre-order flow for product launches.', null, [ACT.vocabularyGoods]),
    createContentItem('台 (measure word)', 'tái', 'The classifier for appliances, machines, computers, TVs, and other big-ticket devices. Replaces the Level 1 general 个 when counting electronics or appliances: 一台电脑 (not 一个电脑), 两台空调 (two air conditioners).', 'word', '我家有两台电视和一台冰箱。', '"My home has two TVs and one fridge." — counting appliances always uses 台.', null, [ACT.vocabularyGoods]),
    createContentItem('件 (measure word)', 'jiàn', 'The classifier for clothing, matters, and many discrete goods. In e-commerce it doubles as a generic counter for "items" in a shopping cart — 三件商品 (three items).', 'word', '购物车里有五件商品。', '"There are five items in the cart." — standard e-commerce phrasing.', null, [ACT.vocabularyGoods]),
    createContentItem('套 (measure word)', 'tào', 'The classifier for sets and matched groups — furniture sets, software suites, an apartment, a multi-piece outfit. 一套家具 (one furniture set), 一套房子 (one apartment).', 'word', '我们买了一套新沙发，三人位加单人位。', '"We bought a new sofa set, three-seater plus single-seater." — 套 emphasizes the set-as-unit purchase.', null, [ACT.vocabularyGoods]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: E-commerce verbs
    // ────────────────────────────────────────────────────────────────────
    createContentItem('网购', 'wǎnggòu', 'Online shopping, lit. "net-buying". The default purchase channel in urban China for most consumer goods. A buyer is a 网购买家 (mǎijiā); a seller is a 网购卖家 (màijiā).', 'word', '我每个月在淘宝上网购很多东西。', '"I shop online a lot on Taobao every month." — 在 X 上 marks the platform.', null, [ACT.vocabularyEcommerce]),
    createContentItem('下单', 'xiàdān', 'To place an order; lit. "drop the order". The action of clicking "buy" and confirming on a Chinese e-commerce platform. Step 1 in the standard timeline.', 'word', '我刚下了单，订单号是123456。', '"I just placed the order; the order number is 123456." — 订单号 (dìngdānhào) is the order ID, always quoted in any after-sales conversation.', null, [ACT.vocabularyEcommerce]),
    createContentItem('订单', 'dìngdān', 'An order (the noun for the record of a purchase). Every Taobao/JD purchase generates an 订单号 (order number) that the 客服 asks for first in any after-sales chat.', 'word', '请提供您的订单号。', '"Please provide your order number." — the standard first request from a 客服 agent.', null, [ACT.vocabularyEcommerce]),
    createContentItem('发货', 'fāhuò', 'To ship out (from the seller\'s warehouse to the buyer). Step 2 in the standard timeline. Chinese e-commerce shows the 发货 timestamp; "24小时内发货" (ships within 24 hours) is a common seller commitment.', 'word', '订单已经发货，预计三天到。', '"The order has shipped; expected to arrive in three days." — typical 客服 status update.', null, [ACT.vocabularyEcommerce]),
    createContentItem('收货', 'shōuhuò', 'To receive / accept delivery. Step 3 in the standard timeline. The buyer formally clicks "确认收货" (confirm receipt) on the platform, which releases payment to the seller from escrow — a uniquely Chinese e-commerce safety mechanism.', 'word', '快递到了，我下班后去签收。', '"The package arrived; I\'ll go sign for it after work." — 签收 (qiānshōu) = physical sign-for-it; 确认收货 = platform-side confirmation.', null, [ACT.vocabularyEcommerce]),
    createContentItem('评价', 'píngjià', 'To review / leave a product review. Step 4 in the standard timeline. Chinese e-commerce reviews carry photos, videos, and detailed text; sellers often offer small refunds for 好评 (positive review) — a practice now technically discouraged but still widespread.', 'word', '收到后请帮忙写个好评，谢谢!', '"After receiving please help write a positive review, thanks!" — the standard request a seller tucks into the package.', null, [ACT.vocabularyEcommerce]),
    createContentItem('快递', 'kuàidì', 'Courier / express delivery. The dominant delivery method in China — same-day or next-day delivery is common in tier-1 cities. Major couriers: 顺丰 (SF Express, premium), 圆通 / 中通 / 韵达 / 申通 (mid-tier), 京东物流 (JD\'s own logistics, fast).', 'word', '顺丰快递明天上午到。', '"SF Express arrives tomorrow morning." — naming the courier matters because speed varies sharply by brand.', null, [ACT.vocabularyEcommerce]),
    createContentItem('包邮', 'bāoyóu', '"Free shipping included" — the seller covers the shipping cost. Lit. "wrap-up the postage". A standard selling point on Chinese e-commerce listings; "包邮区" (free-shipping region) refers to eastern China where most sellers ship free.', 'word', '满99包邮。', '"Free shipping on orders over 99 RMB." — the standard threshold phrasing.', null, [ACT.vocabularyEcommerce]),
    createContentItem('不包邮', 'bùbāoyóu', '"Shipping not included" — buyer pays shipping separately. Common for remote regions (新疆 Xinjiang, 西藏 Tibet, 海南 Hainan) or oversize/heavy items.', 'word', '偏远地区不包邮。', '"Free shipping does not apply to remote regions." — standard fine-print phrasing.', null, [ACT.vocabularyEcommerce]),
    createContentItem('货到付款', 'huòdàofùkuǎn', 'Cash on delivery (COD) — pay when the courier hands you the package. Less popular than 在线支付 in modern urban China, but still used by buyers in smaller cities or those who don\'t trust the seller. Increases risk for the seller, so not every shop offers it.', 'word', '我选货到付款，不在线支付。', '"I\'ll choose COD, not online payment." — the standard buyer phrasing.', null, [ACT.vocabularyEcommerce]),
    createContentItem('在线支付', 'zàixiàn zhīfù', 'Online payment in advance — pay before shipment via Alipay, WeChat Pay, or a bank card. The default mode in modern Chinese e-commerce; the funds are held by the platform in escrow until the buyer confirms receipt.', 'word', '在线支付安全又快捷。', '"Online payment is safe and quick." — typical seller pitch for the default payment mode.', null, [ACT.vocabularyEcommerce]),
    createContentItem('支付宝', 'Zhīfùbǎo', 'Alipay — Alibaba\'s payment platform, the original Chinese mobile-payment service (2003). Default payment on 淘宝 / 天猫. Lit. "pay-treasure".', 'word', '用支付宝付款最方便。', '"Paying with Alipay is most convenient." — typical Alibaba-ecosystem buyer preference.', null, [ACT.vocabularyEcommerce]),
    createContentItem('微信支付', 'Wēixìn zhīfù', 'WeChat Pay — Tencent\'s payment service, embedded in the WeChat app. Default payment for 微信小店 (WeChat mini-shops) and dominant in 京东 (JD, after JD\'s partnership with Tencent). The two-payment-ecosystem split (支付宝 vs 微信支付) mirrors the two-platform split (淘宝 vs 京东).', 'word', '微信支付和支付宝都可以。', '"WeChat Pay and Alipay both work." — standard seller offer in modern China.', null, [ACT.vocabularyEcommerce]),
    createContentItem('客服', 'kèfú', 'Customer service (agent). Short for 客户服务 (customer service). Chinese e-commerce 客服 are reachable via in-platform chat 24/7; phone support is rare. Tone: polite but direct, using 您 throughout.', 'word', '请联系在线客服。', '"Please contact online customer service." — the standard escalation phrase for any issue.', null, [ACT.vocabularyEcommerce]),
    createContentItem('咨询', 'zīxún', 'To inquire / consult (about a product before purchase or about a problem after). Opens any 客服 chat: 我想咨询一下… ("I\'d like to inquire about…"). More formal-sounding than 问 (ask).', 'word', '我想咨询一下这款手机有没有现货。', '"I\'d like to inquire whether this phone is in stock." — standard pre-purchase question opener.', null, [ACT.vocabularyEcommerce]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Vocabulary III: Returns, exchanges, refunds, warranty
    // ────────────────────────────────────────────────────────────────────
    createContentItem('退货', 'tuìhuò', 'To return the goods — the act of physically sending the item back to the seller. Usually triggers a 退款 automatically once the seller receives the return. Required action for "no-reason return" cases.', 'word', '我想退货，麻烦您安排一下取件。', '"I\'d like to return the item; please arrange a pickup." — 取件 (qǔjiàn) = courier pickup, often arranged by the seller.', null, [ACT.vocabularyAfterSales]),
    createContentItem('换货', 'huànhuò', 'To exchange the goods — send the wrong/defective unit back, receive a different unit. No net money movement (unless there\'s a price difference). The right choice when you still want the product but this specific unit failed.', 'word', '尺码不对，能换一件大一号的吗?', '"The size is wrong; can I exchange for one size up?" — typical clothing-exchange request.', null, [ACT.vocabularyAfterSales]),
    createContentItem('退款', 'tuìkuǎn', 'To refund the money — the money goes back to the buyer. Distinct from 退货: 退款 is the money side, 退货 is the goods side. In a typical defect case, the buyer 退货s and the seller 退款s in response.', 'word', '钱什么时候能退到我账户?', '"When will the money be refunded to my account?" — standard follow-up question about refund timing.', null, [ACT.vocabularyAfterSales]),
    createContentItem('原路退回', 'yuánlù tuìhuí', '"Refunded by the same route" — the money goes back to the same payment method that was used (Alipay → Alipay, credit card → credit card). The default refund flow in Chinese e-commerce. Usually takes 1-7 business days depending on the channel.', 'word', '退款将原路退回，预计3-5个工作日到账。', '"Refund will be returned by the original route, expected to arrive in 3-5 business days." — standard 客服 refund-timing line.', null, [ACT.vocabularyAfterSales]),
    createContentItem('七天无理由退货', 'qī tiān wú lǐyóu tuìhuò', 'The 7-day no-reason return policy — buyer can return any online consumer purchase within 7 days of receipt for any reason (or no reason), provided the item is in resellable condition. Enshrined in China\'s Consumer Rights Protection Law since 2014; enforced by all major platforms.', 'word', '根据七天无理由退货规定，我想申请退货。', '"Per the 7-day no-reason return policy, I\'d like to request a return." — the legal-floor phrasing buyers use when the seller pushes back.', null, [ACT.vocabularyAfterSales]),
    createContentItem('质量问题', 'zhìliàng wèntí', 'A quality problem / defect. Distinct from 个人原因 ("personal reason", i.e., changed mind). When a return is for 质量问题, the seller — not the buyer — covers return shipping; for 个人原因, the buyer typically pays.', 'word', '这是质量问题，应该由卖家承担运费。', '"This is a quality issue; the seller should cover the shipping cost." — the standard buyer argument when defect-driven returns get pushback.', null, [ACT.vocabularyAfterSales]),
    createContentItem('保修', 'bǎoxiū', 'Warranty / under-warranty repair. Specifically refers to free repair within the warranty period for manufacturing defects. Different from 退换 (return/exchange): 保修 fixes the unit you bought, 退换 swaps it out.', 'word', '这台电脑保修一年，全国联保。', '"This computer has a one-year warranty, valid nationwide." — 全国联保 (quánguó liánbǎo) = nationwide joint warranty service.', null, [ACT.vocabularyAfterSales]),
    createContentItem('保修期', 'bǎoxiūqī', 'Warranty period — the duration of warranty coverage. Standard ranges: 一年 (1 year) for electronics, 三年 (3 years) for major appliances, 终身 (lifetime, zhōngshēn) for very rare premium products.', 'word', '保修期内免费维修。', '"Free repair within the warranty period." — the standard warranty promise.', null, [ACT.vocabularyAfterSales]),
    createContentItem('售后服务', 'shòuhòu fúwù', 'After-sales service — the umbrella term covering returns, exchanges, refunds, repairs, and follow-up. Chinese consumers evaluate sellers heavily on 售后服务 quality; a good 售后 reputation drives repeat business.', 'word', '这家店售后服务做得很好，下次还会来。', '"This store\'s after-sales is great; I\'ll come back next time." — typical positive-review closing line.', null, [ACT.vocabularyAfterSales]),
    createContentItem('维修', 'wéixiū', 'To repair / maintain. Used for hardware fixes, both inside warranty (免费维修, free repair) and outside warranty (付费维修, paid repair).', 'word', '电脑坏了，需要送修。', '"The computer is broken; needs to go in for repair." — 送修 (sòngxiū) = "send for repair" verb compound.', null, [ACT.vocabularyAfterSales]),
    createContentItem('故障', 'gùzhàng', 'A malfunction / breakdown (technical fault). More precise and slightly more formal than 坏了 ("broken"). Used when describing the specific failure to a 客服 or repair technician.', 'word', '屏幕出现故障，无法正常显示。', '"The screen has a fault, can\'t display normally." — typical defect-description vocabulary.', null, [ACT.vocabularyAfterSales]),
    createContentItem('差评', 'chàpíng', 'A negative review. Opposite of 好评 (positive review). Sellers fear 差评 because Chinese e-commerce search rankings depend heavily on review scores; threatening (gently) a 差评 is a known buyer tactic in after-sales disputes.', 'word', '如果不解决，我只能给差评了。', '"If this isn\'t resolved, I\'ll have to leave a bad review." — the standard buyer escalation line.', null, [ACT.vocabularyAfterSales]),
    createContentItem('好评', 'hǎopíng', 'A positive review (typically 5-star with photo + text). Sellers actively solicit 好评, sometimes with small refunds or coupons. A listing\'s 好评率 (positive review rate) is the headline trust signal.', 'word', '满意请给个好评，谢谢支持。', '"If satisfied, please leave a positive review; thanks for your support." — the standard tucked-in seller note.', null, [ACT.vocabularyAfterSales]),
    createContentItem('性价比', 'xìngjiàbǐ', 'Cost-performance ratio — how much value (performance, features, quality) you get per yuan spent. The single most-used adjective in Chinese product reviews. A "高性价比" product is the consensus best-buy in its category.', 'word', '这款笔记本性价比很高，配置不错，价格也合理。', '"This laptop has high cost-performance: specs are good, price is reasonable." — typical reviewer summary.', null, [ACT.vocabularyAfterSales]),
    createContentItem('划算', 'huásuàn', '"Worthwhile / a good deal" — the adjective for a purchase that feels worth the money. Often paired with 性价比 in a single sentence: "性价比高，很划算". The everyday-speech sibling of the more analytical 性价比.', 'word', '现在打八折，挺划算的。', '"There\'s a 20% off discount right now; quite worthwhile." — 打八折 = "20% off" (literally "knock to 8 tenths").', null, [ACT.vocabularyAfterSales]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar I: 比…更/还…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'A 比 B 更…',
      'A bǐ B gèng…',
      'The comparative-intensifier pattern: A is EVEN MORE [adj] than B. 更 (gèng) is a neutral upgrade of the plain Level 1 比-comparison. Place 更 directly before the adjective; the rest of the structure is unchanged.',
      'sentence',
      '京东比淘宝更可靠。\n这台电脑比那台更便宜。',
      'Translation: "JD is even more reliable than Taobao." / "This computer is even cheaper than that one." — 更 implies the speaker has already acknowledged that both items have the quality, and is noting that A has more.',
      [
        { target: '比 + 更 + adj', note: 'standard intensified comparison; presupposes both compared items share the quality, A just has more' },
        { target: '比 + 还 + adj', note: 'similar but with a note of surprise — "even MORE so than I expected"' },
        { target: '比 + adj (no 更)', note: 'the plain Level 1 form: simply "A is [adj]-er than B"' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      'A 比 B 还…',
      'A bǐ B hái…',
      'The surprise-intensifier comparative: A is STILL/EVEN MORE [adj] than B (and this is unexpected). 还 carries a slight note of "I would not have predicted this" — useful when comparing a budget product favorably against a premium one.',
      'sentence',
      '这款国产手机比苹果还便宜，配置却差不多。',
      'Translation: "This domestic-brand phone is even cheaper than the iPhone, yet the specs are similar." — 却 (què) = "yet/but" emphasizes the unexpected contrast.',
      [
        { target: '还 + adj', note: 'intensifier with surprise; common in comparison-shopping arguments' },
        { target: '却 (què)', note: 'mid-sentence "yet/but"; often pairs with 比…还… to highlight the surprising contrast' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      'A 没有 B 那么…',
      'A méiyǒu B nàme…',
      'The negative comparison: A is NOT AS [adj] as B. Use 没有 (méiyǒu, "does not have") + 那么 + adjective. The mirror image of 比, used when stating that A falls short of B on the dimension.',
      'sentence',
      '这台冰箱没有那台那么节能。',
      'Translation: "This fridge isn\'t as energy-efficient as that one." — note that you cannot say 这台冰箱不比那台节能 except in correction contexts; the natural negative is 没有…那么….',
      [
        { target: '没有 + B + 那么 + adj', note: 'standard negative comparison; literal: "A doesn\'t have B\'s degree of [adj]"' },
        { target: '不比 (special use)', note: 'A 不比 B [adj] means "A is not [adj]-er than B" — used to refute, not for plain negative comparison' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      '比 — never with 很',
      'bǐ — never with hěn',
      'A common learner error: putting 很 (very) inside a 比-comparison. WRONG: 这台电脑比那台很便宜. CORRECT: 这台电脑比那台便宜 (plain) or 这台电脑比那台更便宜 (intensified). The comparative adjective takes 更/还 inside 比, never 很.',
      'sentence',
      'CORRECT: 这台电脑比那台便宜 / 这台电脑比那台更便宜\nWRONG: 这台电脑比那台很便宜',
      'The 很 trap; English speakers carry over "very" mentally and end up with ungrammatical comparisons.',
      [
        { target: '比 + 很 ✗', note: '"很" cannot intensify inside a 比-comparison; it has the wrong semantic shape' },
        { target: '比 + 更/还 ✓', note: 'the only allowed intensifiers inside a 比-comparison' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      'Specifying the gap: 比 B 便宜500块',
      'bǐ B piányi 500 kuài',
      'You can append the exact amount of difference at the end of a 比-comparison: 比 B + [adj] + [amount]. Pattern: "A 比 B 便宜 500 块" = "A is 500 RMB cheaper than B". Indispensable in price-comparison shopping.',
      'sentence',
      '这款比那款便宜500块，性价比更高。',
      'Translation: "This one is 500 RMB cheaper than that one; cost-performance is even higher." — 性价比更高 reuses the 更-intensifier pattern.',
      [
        { target: '比 B [adj] [amount]', note: 'specifies the magnitude of the gap; common for price, weight, size differences' },
        { target: '比 B [adj] 一点', note: '"a little more [adj] than B"; soft, vague magnitude' },
        { target: '比 B [adj] 多了', note: '"way more [adj] than B"; emphatic, large magnitude' },
      ],
      [ACT.grammarComparison],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar II: 越…越…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '越 X 越 Y',
      'yuè X yuè Y',
      'The "the more…, the more…" pattern. As X increases, Y increases. Place 越 directly before each scaling element (verb or adjective). Same subject in both halves is the most common pattern.',
      'sentence',
      '我越用越喜欢这台电脑。\n这本书我越看越有意思。',
      'Translation: "The more I use this computer, the more I like it." / "The more I read this book, the more interesting it gets." — both same-subject; both scaling-quality patterns.',
      [
        { target: '越 + verb 1 + 越 + verb 2', note: 'as verb 1 happens more, verb 2 happens more — the most common shape' },
        { target: '越 + adj 1 + 越 + adj 2', note: 'as quality 1 increases, quality 2 increases' },
        { target: 'same subject', note: 'the most common pattern; the subject does both verbs' },
      ],
      [ACT.grammarMore],
    ),
    createContentItem(
      '越 + subject 1 + 越 + subject 2',
      'different subjects pattern',
      'Less common but valid: the two halves can have different subjects. Pattern: 越 [adj on X], [subject 2] 越 [adj on Y]. Used in proverb-like generalizations about how one factor scales with another.',
      'sentence',
      '东西越贵，质量不一定越好。',
      'Translation: "The more expensive a thing is, the better its quality isn\'t necessarily." — the comparison is between two factors (price, quality) across products, not within one purchase.',
      [
        { target: '越 X，越 Y (different subjects)', note: 'generalization across cases — "as a rule, the more X, the more Y"' },
        { target: '不一定 (bù yídìng)', note: '"not necessarily"; common hedge in 越…越… generalizations' },
      ],
      [ACT.grammarMore],
    ),
    createContentItem(
      '越…越… vs 越来越…',
      'yuè…yuè… vs yuèláiyuè…',
      'CRITICAL contrast. 越 X 越 Y links TWO variables (as X, then Y). 越来越 X describes a TREND over time (X is increasing, period — no second variable). Confusing them is a frequent learner error.',
      'sentence',
      '越用越喜欢 ("the more I use, the more I like" — two variables)\n越来越喜欢 ("liking it more and more over time" — trend)',
      'Different sentence shapes — 越…越… has two adjectives/verbs; 越来越 has just one preceded by the fixed 越来越.',
      [
        { target: '越 X 越 Y (two variables)', note: 'linking two scaling factors; either same or different subjects' },
        { target: '越来越 X (one variable, time)', note: '"X is happening more and more as time passes"; fixed adverbial phrase before one quality' },
      ],
      [ACT.grammarMore],
    ),
    createContentItem(
      '越…越生气 (emotional crescendo)',
      'yuè…yuè shēngqì',
      'A common emotional use of 越…越…: as you think/say/encounter X more, your emotional response Y intensifies. Particularly useful in venting about a bad shopping experience.',
      'sentence',
      '我越想越生气，明明说好7天退货的，现在他们居然不让退。',
      'Translation: "The more I think about it, the angrier I get; we clearly agreed on 7-day return, and now they\'re refusing to let me return it." — 居然 (jūrán) = "unexpectedly"; common in this register of complaint.',
      [
        { target: '越想越生气', note: '"the more I think, the angrier I get" — set phrase for escalating frustration' },
        { target: '居然 jūrán', note: 'adverb expressing surprise/indignation that things turned out a certain way' },
        { target: '明明 míngmíng', note: '"clearly / obviously"; introduces a contradicted expectation' },
      ],
      [ACT.grammarMore],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Grammar III: 虽然…但是…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '虽然 X，但是 Y',
      'suīrán X, dànshì Y',
      'The paired concession structure: "Although X, [nevertheless] Y." Both halves are almost always said in Mandarin — unlike English "although X" which can stand alone, Mandarin expects the 但是 (or 可是 / 不过) follow-up. Dropping it sounds incomplete to a native ear.',
      'sentence',
      '虽然这款笔记本比较贵，但是性价比很高。',
      'Translation: "Although this laptop is on the pricey side, the cost-performance is high." — the standard polite frame for justifying a purchase that\'s above budget.',
      [
        { target: '虽然 X，但是 Y', note: 'standard symmetric concession; both halves stated' },
        { target: '虽然 X，可是 Y', note: 'spoken-register variant; slightly softer than 但是' },
        { target: '尽管 X，但是 Y', note: 'more formal/written variant of 虽然' },
      ],
      [ACT.grammarConcession],
    ),
    createContentItem(
      '虽然 — placement flexibility',
      'suīrán placement',
      '虽然 can appear EITHER before OR after the subject. CORRECT: 虽然这家店发货慢，但是… AND 这家店虽然发货慢，但是… Both are fine; the second is slightly more topic-prominent.',
      'sentence',
      '虽然这家店发货慢，但是售后服务很好。\n这家店虽然发货慢，但是售后服务很好。',
      'Translation: "Although this store ships slowly, after-sales service is excellent." — both word orders carry the same meaning; choose by what you want to topic.',
      [
        { target: '虽然 + subject + ...', note: '虽然 leads the whole clause; emphasizes the concession as a frame' },
        { target: 'subject + 虽然 + ...', note: 'subject is topicalized first; the concession applies to that topic specifically' },
      ],
      [ACT.grammarConcession],
    ),
    createContentItem(
      'Concession + 还是 (still)',
      '… háishì …',
      'Add 还是 (still) in the 但是-clause to emphasize that the conclusion holds in spite of the concession. Pattern: 虽然 X，但是 还是 Y. Particularly common in purchase decisions: "Although it\'s expensive, I\'ll still buy it."',
      'sentence',
      '虽然有点贵，但是我还是决定买了。',
      'Translation: "Although it\'s a bit pricey, I\'ve still decided to buy it." — 还是 reinforces the decision against the headwind of the concession.',
      [
        { target: '虽然 X，但是还是 Y', note: 'concession + still — emphasizes that Y holds despite X' },
        { target: '决定 + verb', note: '"decide to + verb"; common purchase-decision phrasing' },
      ],
      [ACT.grammarConcession],
    ),
    createContentItem(
      '不过 — softer concession',
      'bùguò — softer',
      '不过 (lit. "however / but") is a softer, more spoken variant in the 但是-slot. It signals a milder contrast — useful when the downside is small and the speaker doesn\'t want to sound critical. Often pairs with shorter 虽然 clauses.',
      'sentence',
      '虽然颜色不是我最喜欢的，不过总体还可以。',
      'Translation: "Although the color isn\'t my favorite, overall it\'s OK." — 不过 keeps the criticism light; 但是 would feel sharper.',
      [
        { target: '不过 (soft)', note: 'mild contrast; spoken register; common in product reviews' },
        { target: '但是 (standard)', note: 'standard contrast; neutral register; suitable for any context' },
        { target: '可是 (medium)', note: 'between 不过 and 但是; mostly spoken' },
      ],
      [ACT.grammarConcession],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '淘宝订单',
      'Táobǎo dìngdān',
      'A realistic Taobao order summary showing item, brand, model, specs, price, shipping option, payment method, expected arrival, and after-sales policy — the standard fields every Chinese e-commerce order displays.',
      'sentence',
      '【淘宝订单 — 订单号: TB202611140873265】\n· 商品: 联想 ThinkBook 14 笔记本电脑 (i7-13700H / 16GB / 512GB SSD)\n· 数量: 1台\n· 单价: ¥4,599\n· 运费: 包邮 (江浙沪皖)\n· 实付: ¥4,599\n· 付款方式: 支付宝在线支付\n· 卖家: 联想官方旗舰店\n· 发货地: 北京\n· 预计到达: 11月17日前\n· 售后政策: 七天无理由退货 (商品需保持原包装) · 一年全国联保\n· 客服: 在线咨询 (24小时)',
      'Translation: Taobao order TB202611140873265 — Lenovo ThinkBook 14 laptop, i7-13700H / 16GB / 512GB SSD; 1 unit at 4,599 RMB; free shipping in Jiangsu/Zhejiang/Shanghai/Anhui; paid via Alipay; shipped from Beijing; arrives by Nov 17; 7-day no-reason return (original packaging required) + 1-year nationwide warranty; 24h online customer service.',
      [
        { target: '订单号', note: 'order number — always quoted first in any 客服 conversation' },
        { target: '联想官方旗舰店', note: '"Lenovo Official Flagship Store" — 旗舰店 (qíjiàndiàn) marks the brand\'s own first-party shop, more trustworthy than third-party resellers' },
        { target: '包邮 (江浙沪皖)', note: 'free shipping in Eastern China provinces; remote regions usually pay shipping' },
        { target: '保持原包装', note: '"keep the original packaging" — a strict prerequisite for the 7-day no-reason return' },
        { target: '全国联保', note: 'nationwide joint warranty — repair can be done at any authorized service center across China' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions matching the order summary. Answer each in a short sentence; quote specific numbers and policy clauses from the document.',
      'sentence',
      'Q1: 这个订单的总价是多少?\nQ2: 卖家在哪里发货? 大概几天到?\nQ3: 如果商品没有质量问题，但买家不想要了，能退货吗? 有什么条件?\nQ4: 如果电脑半年后坏了，怎么办?',
      'Q1 total price; Q2 ship origin + arrival; Q3 no-reason return conditions; Q4 warranty path — covering price, logistics, return policy, and warranty.',
      [
        { target: 'A1: 总价4,599元，包邮。', note: 'note the use of 元 (formal) in writing; spoken would use 块' },
        { target: 'A2: 从北京发货，三天左右到达。', note: 'use 从 X 发货 + 几天到 timeline phrasing' },
        { target: 'A3: 可以，七天内无理由退货，但要保持原包装。', note: 'cite both the time window and the packaging condition' },
        { target: 'A4: 享受一年全国联保，可以送修。', note: 'invoke the warranty and the repair channel; 享受 (xiǎngshòu) = "be entitled to / enjoy [a benefit]"' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '客服对话',
      'kèfú duìhuà',
      'A realistic 客服 chat about a defective laptop. Notice the polite-but-direct register the agent maintains throughout — 您 (instead of 你), 请 X (please X), 麻烦您 (may I trouble you to…), 不好意思 (apology), and the structured information-gathering: order number first, problem second, photo third, remedy fourth.',
      'conversation',
      '客户: 你好，我三天前买的笔记本电脑屏幕一直闪烁，想申请退款。\n客服: 您好，不好意思给您带来不便。麻烦您提供一下订单号好吗?\n客户: 订单号是TB202611140873265。\n客服: 收到。请问您方便拍一段屏幕闪烁的视频发过来吗?\n客户: 好的，我马上发。视频在这里。\n客服: 感谢您。我们已经确认是屏幕质量问题。您希望退款还是换货?\n客户: 我想退款，这台机器我用得不放心。\n客服: 完全理解。我们会安排顺丰上门取件，运费由我们承担。退款将在收到货后24小时内原路退回支付宝。\n客户: 好的，谢谢。大概什么时候能取件?\n客服: 明天上午快递员会联系您。请您把电脑放回原包装。\n客户: 没问题，麻烦您了。',
      'An 11-turn exchange covering all four after-sales steps: problem report → information request (order ID + photo/video) → confirmation of defect → remedy choice (refund vs exchange) → logistics (pickup, shipping cost) → confirmation. Note the agent never argues, never deflects — Chinese e-commerce 客服 are trained to resolve fast.',
      [
        { target: '不好意思给您带来不便', note: '"sorry for the inconvenience" — the standard 客服 opening apology, said before any blame is assigned' },
        { target: '麻烦您提供一下订单号', note: '"may I trouble you to provide the order number" — 麻烦您 (máfan nín) is the polite request frame; 一下 softens the imperative' },
        { target: '拍一段视频', note: '"shoot a video clip" — video evidence has replaced photo evidence for dynamic defects like flickering' },
        { target: '运费由我们承担', note: '"shipping cost is borne by us" — 由 (yóu) introduces the responsible party; standard phrasing for quality-issue returns' },
        { target: '上门取件', note: '"door-to-door pickup" — the courier comes to the buyer; the standard Chinese e-commerce return flow, not buyer-drop-off' },
        { target: '原路退回支付宝', note: '"refunded by the original route to Alipay" — same payment method, same channel' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '客服对话 — 拒绝退款的情况',
      'kèfú duìhuà — refusal scenario',
      'A second 客服 conversation where the seller pushes back on a no-reason return because the buyer\'s reason crosses into 个人原因 (personal reason) territory. Watch how the buyer cites the 7-day rule and the agent partially concedes on conditions.',
      'conversation',
      '客户: 你好，我昨天收到的手机，想退货。\n客服: 您好，请问是什么原因呢? 是质量问题吗?\n客户: 不是质量问题，是颜色我不太喜欢。\n客服: 明白。根据七天无理由退货规定，您可以退货，但是运费需要由您承担，而且商品要保持全新未拆封。\n客户: 我已经拆封了，但是没有使用，外观还是全新的。\n客服: 拆封后我们可以收，但需要扣除一定的折旧费，大概50元。您可以接受吗?\n客户: 虽然不太情愿，但是我接受。\n客服: 好的，那我帮您发起退货流程。请把商品和原包装一起寄回。',
      'Translation: customer wants to return a phone for not liking the color; agent invokes 7-day rule but flags the higher conditions for non-defect returns (buyer pays shipping, depreciation fee for opened packaging). The buyer\'s 虽然不太情愿，但是我接受 ("although unwilling, I accept") demonstrates Grammar III in action.',
      [
        { target: '是什么原因呢?', note: '"may I ask the reason?" — 呢 softens the question; standard 客服 probe to determine whether it\'s 质量问题 or 个人原因' },
        { target: '根据七天无理由退货规定', note: '"per the 7-day no-reason return policy" — cites the legal floor; works equally well in buyer or seller mouths' },
        { target: '折旧费', note: '"depreciation fee" — what the seller deducts for non-defect returns where original packaging is opened' },
        { target: '发起退货流程', note: '"initiate the return process" — the formal trigger inside the e-commerce platform' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '评价模板',
      'píngjià múbǎn',
      'A reusable 3-sentence Taobao review template covering quality, shipping, and recommendation — the three slots Chinese reviewers always fill. Fill in the bracketed slots with your own purchase information.',
      'sentence',
      '【评价模板】\n质量方面: 收到 [商品] 一周了，[质量评价 — 好/一般/差]，[一个具体细节]。\n物流方面: [发货速度] 发货，[送达情况]，快递员也很 [评价]。\n总体: 性价比 [高/一般/低]，[推荐 / 不推荐] 给需要的朋友。\n\n示例: 收到笔记本电脑一周了，质量很好，键盘手感舒服，屏幕色彩准确。第二天就发货，三天送到，快递员也很客气。性价比很高，推荐给需要的朋友。',
      'Translation of example: "I\'ve had the laptop for a week; quality is great, keyboard feels comfortable, screen colors are accurate. Shipped next day, arrived in three days; the courier was polite too. Cost-performance is high; recommended to anyone who needs one."',
      [
        { target: '质量方面 / 物流方面 / 总体', note: '"on quality" / "on shipping" / "overall" — the three slot headers; can be implicit or explicit in your review' },
        { target: '手感 (shǒugǎn)', note: '"hand-feel" — common reviewer vocabulary for tactile feedback (keyboards, fabrics, handles)' },
        { target: '色彩准确', note: '"color-accurate" — laptop/monitor review vocabulary' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '退款申请模板',
      'tuìkuǎn shēnqǐng múbǎn',
      'A reusable 5-sentence refund-request template. Covers the four required elements: order number, problem, requested remedy, and shipping cost responsibility. Polite but direct register; the receiving 客服 needs all four pieces to act.',
      'sentence',
      '【退款申请模板】\n您好。我的订单号是 [订单号]。\n[X天前] 收到货后发现 [具体问题]。\n属于质量问题，希望申请 [退款/换货]。\n虽然商品已拆封，但是没有使用，外观完好。\n麻烦您安排一下，谢谢。\n\n示例: 您好。我的订单号是 TB202611140873265。三天前收到货后发现笔记本屏幕一直闪烁，无法正常使用。属于质量问题，希望申请退款。虽然商品已拆封，但是没有使用，外观完好。麻烦您安排一下，谢谢。',
      'Translation of example: "Hello. My order number is TB202611140873265. Three days after receiving it, I found the laptop screen keeps flickering and can\'t be used normally. This is a quality issue; I\'d like to request a refund. Although the product has been unboxed, it hasn\'t been used and looks brand new. Please arrange this, thank you."',
      [
        { target: '属于质量问题', note: '"qualifies as a quality issue" — 属于 (shǔyú) = "falls under the category of"; key phrase that triggers seller-pays-shipping' },
        { target: '虽然 X，但是 Y (Grammar III)', note: 'standard concession to preempt the seller\'s objection about opened packaging' },
        { target: '麻烦您安排一下', note: '"please arrange this for me" — 麻烦您 + 一下 softens the request; standard polite closer' },
      ],
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '淘宝 vs 京东',
      'Táobǎo vs Jīngdōng',
      'The two dominant Chinese e-commerce platforms. 淘宝 (Taobao, founded 2003 by Alibaba) is C2C — millions of independent merchants, lower prices, wider selection, but higher risk of counterfeits (假货 jiǎhuò) and inconsistent service. 京东 (JD, founded 1998) is B2C — first-party warehouses, JD-employed couriers (京东物流), faster shipping (often same-day in tier-1 cities), stronger after-sales, slightly higher prices.',
      'sentence',
      '便宜的小东西在淘宝，电脑手机大件去京东。 — "Cheap small stuff on Taobao, computers and phones go to JD."',
      'A common Chinese consumer rule of thumb. Both platforms have evolved: Taobao\'s 天猫 (Tmall) sub-platform hosts brand flagship stores with B2C-like reliability; JD now also hosts third-party sellers. But the trust gap persists.',
      [
        { target: '淘宝 Táobǎo', note: 'C2C marketplace; cheap; wide selection; counterfeit risk; default for clothing, small goods' },
        { target: '京东 Jīngdōng (JD)', note: 'B2C; first-party warehouses; fast logistics; reliable after-sales; default for electronics and appliances' },
        { target: '天猫 Tiānmāo (Tmall)', note: '"Heavenly Cat" — Alibaba\'s premium sub-platform; brand flagship stores; B2C-style reliability inside Taobao\'s ecosystem' },
        { target: '拼多多 Pīnduōduō (PDD)', note: 'group-buying discount platform; even cheaper than Taobao; popular outside tier-1 cities; mixed reputation on quality' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '双十一',
      'Shuāng shíyī',
      'Singles Day — November 11th (11/11, the date of four 1s suggesting four "single" digits). Invented by Alibaba in 2009 as an anti-Valentine\'s shopping festival for unattached people; now the world\'s largest annual shopping event, with single-day sales routinely exceeding USD 100 billion across platforms. Massive 折扣 (discounts) and 满减 (spend-X-save-Y) promotions.',
      'sentence',
      '双十一打折特别厉害，电脑能便宜一千多。',
      'Translation: "11.11 discounts are huge; a laptop can be over a thousand RMB cheaper." — 厉害 (lìhai) = "fierce / extreme" used colloquially for impressive sales.',
      [
        { target: '双十一 (Singles Day, Nov 11)', note: 'invented by Alibaba 2009; world\'s largest shopping event; massive discounts but extended pre-sale period now' },
        { target: '618 (JD Anniversary, June 18)', note: 'second-tier shopping festival started by JD as a counter-event; mid-year discounts' },
        { target: '满减 mǎnjiǎn', note: '"spend X save Y" — 满300减50 (spend 300, save 50); the standard Chinese e-commerce promotion shape' },
        { target: '预售 yùshòu', note: '"pre-sale" — deposit paid weeks before the festival, balance on Nov 11; locks in the price and the stock' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '七天无理由退货',
      'qī tiān wú lǐyóu tuìhuò',
      'The 7-day no-reason return policy — the legal floor for any online consumer purchase in China since the 2014 amendment to the Consumer Rights Protection Law. The buyer may return for any reason within 7 days of receipt, provided the item is in resellable condition. Some categories (custom-made items, perishables, opened software/media, intimate items) are excluded by law. Enforced by all major platforms.',
      'sentence',
      '根据《消费者权益保护法》，网购消费者享有七天无理由退货的权利。',
      'Translation: "According to the Consumer Rights Protection Law, online consumers enjoy the right to a 7-day no-reason return." — 享有 (xiǎngyǒu) = "be entitled to / enjoy"; formal legal phrasing.',
      [
        { target: '七天无理由', note: '"7 days no-reason" — the legal floor; cannot be contracted around' },
        { target: '保持商品完好', note: '"keep the product in good condition" — the buyer\'s side of the deal; some wear voids the right' },
        { target: '运费 (who pays)', note: 'quality issue → seller pays; no-reason / personal reason → buyer pays. The single most common after-sales argument.' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '假货',
      'jiǎhuò',
      'Counterfeit / fake goods. A persistent risk on C2C platforms (淘宝) and street markets (especially in tourist areas). The best defenses: buy from 旗舰店 (brand flagship stores), check seller ratings, avoid suspiciously low prices, verify with the brand\'s anti-counterfeit codes. 假货 is why many Chinese consumers prefer JD or 天猫 for premium goods.',
      'sentence',
      '在小摊上买电子产品要小心，假货很多。',
      'Translation: "Be careful buying electronics at small stalls; lots of counterfeits." — 小摊 (xiǎotān) = small stall; the highest-counterfeit-risk channel.',
      [
        { target: '正品 zhèngpǐn', note: '"genuine product" — the opposite of 假货; sellers advertise 100%正品 to reassure buyers' },
        { target: '高仿 gāofǎng', note: '"high-quality counterfeit" — a tier of 假货 indistinguishable from the original to a casual buyer' },
        { target: '验货 yànhuò', note: '"verify the goods" — checking authenticity, often by serial number or app scan' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '现金的衰落',
      'xiànjīn de shuāiluò',
      'The decline of cash. In urban China, 现金 (cash) has become rare — even small street vendors prefer QR-code payment via 微信 or 支付宝. A foreign buyer offering cash for a 5-RMB purchase can genuinely struggle to be served because the vendor may have no change. Carrying ID-linked mobile payment is now a practical requirement for daily life.',
      'sentence',
      '现在很少有人用现金了，连卖菜的大妈都用微信收款。',
      'Translation: "Few people use cash now; even the granny selling vegetables uses WeChat to receive payment." — 大妈 (dàmā) = "auntie / older lady"; vivid colloquial reference to the breadth of the cashless shift.',
      [
        { target: '扫码支付 sǎomǎ zhīfù', note: '"scan-the-code payment" — the dominant Chinese payment method; both buyer-scans-seller and seller-scans-buyer flows exist' },
        { target: '收款码 shōukuǎn mǎ', note: '"receive-payment QR code" — the static QR vendors print and hang; buyer scans, types amount, pays' },
        { target: '付款码 fùkuǎn mǎ', note: '"pay-out QR code" — the dynamic QR a buyer shows; seller scans to deduct' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 13 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 申请退款',
      'rènwù: shēnqǐng tuìkuǎn',
      'Roleplay an 8-turn 客服 chat about a flickering laptop on a 3-day-old Taobao order. Use Grammar I (比), Grammar II (越…越…), Grammar III (虽然…但是…) at least once each, and use vocabulary from all three vocabulary sections.',
      'conversation',
      '[淘宝客服在线聊天 — 你已经登录]\n客服: 您好，请问有什么可以帮您的?\n你: [描述问题 + 订单号]\n客服: 不好意思给您带来不便。麻烦您把闪烁的情况拍个视频发过来好吗?\n你: [回复 + 用一句"越…越…"描述故障变严重的情况]\n客服: 收到。这确实是质量问题。请问您希望退款还是换货?\n你: [选择 + 用 "虽然…但是…" 说明你的理由]\n客服: 理解。运费由我们承担，明天上午顺丰会上门取件。\n你: [确认 + 问退款到账时间]\n客服: 收到货后24小时内原路退回支付宝。\n你: [比较 + 用"比"说为什么这家店和另一家比起来你更愿意继续合作]\n客服: 感谢您的信任! 我们一定改进。',
      'Translation: A full 客服 chat with prompts for the learner\'s turns labeled in brackets. The AI tutor plays the 客服 and prompts the learner naturally. By the end, both sides have agreed on a remedy and a return-shipping arrangement.',
      [
        { target: '描述问题', note: 'use 屏幕一直闪烁 / 出现故障 / 无法正常使用 — pick the precision level the situation needs' },
        { target: '订单号', note: 'always state this early; the agent cannot act without it' },
        { target: '退款 vs 换货', note: 'choose based on whether you still trust the product; refund = walk away, exchange = try again' },
        { target: '虽然…但是…', note: 'use to justify your choice ("although exchange would be faster, I no longer trust this unit")' },
        { target: '越…越…', note: 'use to describe the defect progression ("the more I use it, the worse the flickering gets")' },
        { target: '比', note: 'use to express loyalty ("this store\'s after-sales is better than the other one I tried last month")' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 卖家推脱的情况',
      'tiǎozhàn — seller-pushback scenario',
      'Stretch goal: in the same scene, the 客服 initially pushes back ("the flicker might be from your power supply, not the laptop"). Politely but firmly invoke 七天无理由退货 and Grammar III to hold your ground without losing 面子 on either side.',
      'conversation',
      '客服: 您好，关于屏幕闪烁的情况，可能是您家里的电源不稳定，建议先换个插座试试。\n你: [礼貌但坚定地拒绝 + 引用七天无理由退货]\n客服: 这个规定我们当然遵守，不过通常会先排查一下原因。\n你: [用 "虽然…但是…" 承认排查合理，但坚持自己已经测试过]\n客服: 那好的，麻烦您把测试视频也一起发过来。\n你: [同意 + 用 "越…越…" 强调问题不是一次性的]\n客服: 明白了，我现在为您发起退款流程。',
      'A 6-turn pushback resolution. The buyer needs to: stay polite (use 您 throughout), cite the legal floor (七天无理由), acknowledge the seller\'s reasonable diagnostic step (虽然…但是…), and emphasize the defect persistence (越…越…).',
      [
        { target: '可能是您家里的电源不稳定', note: '"perhaps your home power is unstable" — the classic deflection a 客服 may try on a hard-to-photograph defect' },
        { target: '排查 páichá', note: '"diagnose / troubleshoot" — formal technical-service vocabulary; sellers like to insist on this step before approving returns' },
        { target: '我已经测试过', note: '"I\'ve already tested" — preempts the diagnostic step by showing you\'ve done due diligence' },
        { target: '坚持自己的立场', note: '"hold your position" — Chinese after-sales negotiation rewards polite firmness; backing down on first pushback loses you the case' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
