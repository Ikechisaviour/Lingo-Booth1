// Level 1 Unit 9 — Ordering Food (Mandarin Chinese)
// Functions: ordering at a Chinese restaurant, expressing preferences and
// flavor adjustments, asking for polite modifications, paying, and packing
// leftovers to take away.
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
  orientation: 'zh-l1u9-orientation',
  pronunciation: 'zh-l1u9-pronunciation',
  vocabularyDishes: 'zh-l1u9-vocab-dishes',
  vocabularyTable: 'zh-l1u9-vocab-table',
  grammarWantWords: 'zh-l1u9-grammar-want',
  grammarYidianr: 'zh-l1u9-grammar-yidianr',
  grammarNengbuneng: 'zh-l1u9-grammar-nengbuneng',
  reading: 'zh-l1u9-reading',
  listening: 'zh-l1u9-listening',
  writing: 'zh-l1u9-writing',
  culture: 'zh-l1u9-culture',
  task: 'zh-l1u9-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Order a full meal at a Chinese restaurant — appetizer, main, drink, and rice — using the right verb (想 wish vs 要 want) for each request.',
      'Adjust dishes politely with 一点儿 (a bit) and 能不能 (can/may) so the server treats you as a confident regular, not a tourist reading from a card.',
      'Settle the bill with 买单 or 结账, decide whether to pack the leftovers with 打包, and respond to the toasting and tea-pouring rituals around the table.',
    ],
    task: 'Picture a Friday evening dinner with a Tsinghua classmate at a busy Beijing restaurant near 五道口 — by the end of this lesson you should handle the whole exchange in Mandarin from the door to the door.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Apply third-tone sandhi inside 我要 (wǒ yào) — 我 stays a full third tone here because the following syllable is fourth, NOT third, so the sandhi rule from Unit 1 does not fire.',
      'Apply 一 (yī) sandhi inside 一份 (yí fèn) and 一点儿 (yìdiǎnr) — 一 rises to second tone before fourth-tone syllables, falls to fourth before first/second/third tones.',
      'Reduce the second syllable of 谢谢 (xièxie) and 包子 (bāozi) to neutral tone — overstressing the second syllable is the single clearest "textbook accent" tell at the table.',
    ],
    task: 'Read each pronunciation example aloud and identify whether sandhi applies, then say the spoken version with the correct surface tones.',
  },
  {
    id: ACT.vocabularyDishes,
    section: 'Vocabulary I',
    title: 'Dishes, snacks, and drinks',
    goals: [
      'Recognize 12+ canonical Chinese dishes from staples (饺子 jiǎozi, 米饭 mǐfàn, 面条 miàntiáo) to regional headliners (烤鸭 kǎoyā, 麻婆豆腐 mápó dòufu, 火锅 huǒguō).',
      'Order drinks across the typical Chinese restaurant range — 水 (water, usually warm), 茶 (tea), 啤酒 (beer), 可乐 (cola), 豆浆 (soy milk for breakfast).',
    ],
    task: 'Pick one dish and one drink you would order tonight, then say them aloud in a 我想要… sentence.',
  },
  {
    id: ACT.vocabularyTable,
    section: 'Vocabulary II',
    title: 'Service verbs and flavor adjectives',
    goals: [
      'Use the restaurant service verbs: 点菜 (order), 上菜 (serve), 加 (add), 买单 / 结账 (pay the bill), 打包 (take away).',
      'Describe a dish with the flavor vocabulary: 辣 (spicy), 咸 (salty), 甜 (sweet), 酸 (sour), 苦 (bitter), 清淡 (light), 油腻 (oily) — both for ordering preferences and reacting to what arrives.',
    ],
    task: 'Read a short Beijing restaurant menu and identify every table verb and every flavor word in it.',
  },
  {
    id: ACT.grammarWantWords,
    section: 'Grammar I',
    title: '想 (xiǎng) + verb vs 要 (yào) + noun',
    goals: [
      'Use 想 + VERB to express a soft wish or preference: 我想吃饺子 ("I would like to eat dumplings") — like English "I would like to" or "I want to".',
      'Use 要 + NOUN (or VERB) to make a more direct request: 我要一份米饭 ("I want one serving of rice") — equivalent to English "I\'ll have…" when ordering.',
      'Mix both in one order: soft preference talk in the planning phase (我想吃辣的), direct request at the moment of ordering to the server (我要宫保鸡丁).',
    ],
    task: 'Write three planning sentences with 想 + verb, then convert them into three direct-order sentences with 要 + noun.',
  },
  {
    id: ACT.grammarYidianr,
    section: 'Grammar II',
    title: '一点儿 (yìdiǎnr) — softening a modification',
    goals: [
      'Use 一点儿 (yìdiǎnr, "a bit") AFTER a verb + adjective to soften a request: 少放一点儿盐 ("put a little less salt"), 多加一点儿辣 ("add a bit more spicy").',
      'Pair 少 (shǎo, less) and 多 (duō, more) with 一点儿 to fine-tune dishes without sounding demanding — the standard way to customize at a Chinese restaurant.',
      'Know the structural slot: 少/多 + VERB + 一点儿 + NOUN. Skipping 一点儿 makes the request sound abrupt; including it sounds polite and native.',
    ],
    task: 'Take three example dishes and write a polite modification for each using the 少/多 + verb + 一点儿 + noun pattern.',
  },
  {
    id: ACT.grammarNengbuneng,
    section: 'Grammar III',
    title: '能不能 (néngbunéng) — polite request',
    goals: [
      'Form a polite request with 能不能 + VERB: 能不能加一点儿水? ("Can you add a little water?"). The A-not-A question form makes the request softer than a flat statement.',
      'Use 可以 (kěyǐ) as a related but slightly different form — 可以 emphasizes permission ("is it allowed?"), 能 emphasizes capability ("can you?"). Restaurants accept both.',
      'Combine 能不能 with 一点儿 for a doubly-softened modification: 能不能少放一点儿盐? — the most polite way to adjust a dish without offending the cook.',
    ],
    task: 'Write three polite restaurant requests using 能不能, then rewrite two of them with 可以…吗? to feel the small register difference.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a Beijing restaurant review',
    goals: [
      'Read a short 5-sentence restaurant review aloud with correct tones, sandhi, and natural prosody.',
      'Answer comprehension questions about what the writer ordered, what they thought of the flavors, and what the total came to in yuan.',
    ],
    task: 'Read the review below aloud once, then answer four comprehension questions in short complete sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Two restaurant scenes',
    goals: [
      'Follow a 6-turn ordering dialogue between two students deciding what to order at a Beijing restaurant.',
      'Follow a separate 6-turn order-and-pay dialogue with a server, including a polite modification and the 买单 / 打包 closing.',
    ],
    task: 'Read each dialogue along with the AI tutor first, then perform them again swapping in your own dish choices.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Recommend a Chinese dish',
    goals: [
      'Write 4–5 sentences in Hanzi recommending one Chinese dish to a friend, naming the dish, the flavor, the price range, and one specific reason to try it.',
      'Use at least one 想 + verb and one 要 + noun construction so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Write your own recommendation in 4–5 sentences using the template, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Communal eating, toasting, and no tipping',
    goals: [
      'Understand communal-style dining: dishes go to the middle of the table, often on a lazy susan 转盘, and everyone shares — ordering "my own plate" is a cultural mismatch.',
      'Know the toasting (干杯 gānbēi) and tea-pouring (谢茶 — tap the table with two fingers to thank the pourer) micro-rituals that happen all evening.',
      'Know that tipping (小费 xiǎofèi) is NOT standard in Mainland China — leaving cash on the table is unnecessary and can confuse the server.',
    ],
    task: 'Decide how you would respond if (1) the host raises a glass for 干杯, (2) someone refills your tea cup, (3) the server says 不用 when you offer a tip.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Friday dinner at a Beijing restaurant',
    goals: [
      'Combine every skill from this lesson into one continuous scene — choose a place, sit down, order, modify, eat, toast, pay, and pack leftovers.',
      'Match the register: peer-to-peer with your Tsinghua classmate, polite-default with the server, never overformal in a casual restaurant setting.',
    ],
    task: 'Roleplay a full dinner at a Beijing restaurant with the AI tutor playing your classmate and the server; aim for a 10-turn exchange in Mandarin.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 9: 点菜 — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'suggesting-food', label: 'Suggesting what to eat', goal: 'Use 想 + verb to float a preference and 我们…吧 to nudge the group toward a decision before reaching the server.' },
    { id: 'ordering-food', label: 'Ordering food', goal: 'Use 我要 + N or 来一份 + N to place a direct order with the right counter and dish name.' },
    { id: 'modifying-dish', label: 'Modifying a dish politely', goal: 'Use 能不能 + 少/多 + verb + 一点儿 + N to soften a customization without sounding demanding.' },
    { id: 'paying-bill', label: 'Paying the bill', goal: 'Use 买单 or 结账 to call for the check and respond with 现金 / 微信 / 支付宝 for the payment method.' },
    { id: 'taking-away', label: 'Packing leftovers', goal: 'Use 能不能打包? to ask the server to pack the remaining food — standard practice, not a faux pas in Mainland China.' },
  ],
  relatedPools: ['topic-food', 'topic-daily-life'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson you can sit down at a Chinese restaurant, order a balanced meal, adjust a dish politely with 一点儿, pay the bill, and pack the leftovers — the full arc of a Friday dinner without a single English fallback.',
      'word',
      'Functions: 点菜 diǎn cài (order) · 改菜 gǎi cài (modify a dish) · 买单 mǎidān (pay) · 打包 dǎbāo (take away) · 干杯 gānbēi (toast)',
      'Five restaurant micro-skills — once they\'re automatic, every later social-meal scene layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '今天的场景',
      'jīntiān de chǎngjǐng',
      'It is Friday evening and a Tsinghua classmate suggests dinner at a popular restaurant near 五道口, the student district just south of campus. You will need to discuss what to order, deal with the server, eat together communal-style, and split or refuse the bill.',
      'word',
      '同学: "今天晚上想吃什么? 我们去吃火锅吧!"',
      'A typical Friday opener from a Beijing classmate: a soft 想 question, then a more decisive 吧 suggestion — the natural rhythm of peer-to-peer planning.',
      [
        { target: '想吃什么 xiǎng chī shénme', note: '"want to eat what" — soft preference question using 想 + verb, not a binding choice yet' },
        { target: '我们…吧 wǒmen…ba', note: 'the suggestion-softening particle 吧 turns a flat statement into "let\'s…", less pushy than a bare imperative' },
        { target: '火锅 huǒguō', note: '"hotpot" — boiling broth in the middle of the table, raw ingredients dipped in; the most communal of Chinese meals' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三种点菜方式',
      'sān zhǒng diǎn cài fāngshì',
      'Mandarin distinguishes three rough ways of stating what you want at a restaurant. SOFT (planning with friends): 我想吃… wǒ xiǎng chī… ("I\'d like to eat…"). DIRECT (telling the server): 我要… wǒ yào… ("I\'ll have…"). VERY DIRECT (calling out a dish): 来一份… lái yí fèn… ("bring one serving of…"). Same function, three social levels.',
      'word',
      '我想吃饺子 (soft) / 我要饺子 (direct) / 来一份饺子 (very direct, to the server) — all "I want dumplings".',
      'Switching from 想 to 要 mid-conversation signals "decision made, now ordering"; using 来一份 with the server has a confident, regular-customer feel.',
      [
        { target: 'SOFT: 我想吃 wǒ xiǎng chī', note: 'use during planning with friends; expresses preference, not a binding order' },
        { target: 'DIRECT: 我要 wǒ yào', note: 'use when telling the server; equivalent to English "I\'ll have…" at the moment of ordering' },
        { target: 'VERY DIRECT: 来一份 lái yí fèn', note: '"bring one serving of"; the regular-customer phrasing, common in casual restaurants' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '我要',
      'wǒ yào',
      'A third-tone 我 followed by a fourth-tone 要. NO sandhi applies here: the third-tone sandhi rule only fires when TWO third tones are adjacent. Because 要 is fourth tone, 我 keeps its full dip-and-rise. A frequent learner mistake is to flatten 我 here.',
      'word',
      '我要一份米饭 wǒ yào yí fèn mǐfàn ("I\'ll have one serving of rice")',
      'Most common opener of any restaurant order — get the 3+4 contour right and the rest of the order flows.',
      [
        { target: '我 (wǒ, 3rd, unchanged)', note: 'full third-tone dip-and-rise; the following tone is fourth, not third, so no sandhi' },
        { target: '要 (yào, 4th)', note: 'sharp falling fourth tone; the verb "to want", direct register' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '一份',
      'yí fèn',
      '一 (yī, "one") sandhi: yī becomes yí (rising) before a fourth-tone syllable. 份 (fèn, "portion/serving") is fourth tone, so 一份 is pronounced yí fèn in fluent speech. Written tones do not change; only spoken pronunciation does.',
      'word',
      '一份饺子 yí fèn jiǎozi ("one order of dumplings")',
      'The 一 sandhi happens every time you order a single serving — the most common position for 一 in a restaurant.',
      [
        { target: '一 (written: yī, 1st)', note: 'default first tone in isolation; the citation form' },
        { target: '一 (spoken: yí, 2nd)', note: 'changes to rising tone before another fourth-tone syllable — sandhi rule' },
        { target: '份 (fèn, 4th)', note: 'classifier for portions/servings; always fourth tone' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '一点儿',
      'yìdiǎnr',
      '一 (yī) sandhi: yī becomes yì (fourth, falling) before a first, second, or third tone. 点 (diǎn) is third tone, so 一点儿 is pronounced yìdiǎnr. The 儿化 (érhuà) suffix folds 儿 into the preceding final, producing a single retroflex syllable.',
      'word',
      '少放一点儿盐 shǎo fàng yìdiǎnr yán ("put a little less salt")',
      'Standard sandhi + érhuà combination; both apply together in every polite restaurant modification.',
      [
        { target: '一 (written: yī, 1st)', note: 'default first tone in isolation' },
        { target: '一 (spoken: yì, 4th)', note: 'becomes falling tone before 1st/2nd/3rd-tone syllables — the OTHER 一 sandhi case' },
        { target: '点儿 (diǎnr)', note: 'r-suffixed third-tone syllable; the 儿 colors the final without adding a second syllable' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '谢谢',
      'xièxie',
      'A fourth-tone syllable followed by a neutral-tone syllable. The first 谢 (xiè) is fully stressed with the sharp falling fourth tone; the second xie reduces to a light, short neutral tone. Overstressing the second syllable is one of the clearest "textbook accent" markers at the table.',
      'word',
      '谢谢，不用找了 xièxie, búyòng zhǎo le ("thanks, keep the change" — though tipping is not standard in Mainland)',
      'Said constantly throughout a meal — to the server, to whoever pours your tea, to the host.',
      [
        { target: '谢 (xiè, 4th)', note: 'first syllable; full fourth tone with sharp falling pitch' },
        { target: '谢 (xie, neutral)', note: 'second syllable; light and short, pitch determined by previous tone — never overstress it' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '包子',
      'bāozi',
      'A first-tone syllable followed by a neutral-tone syllable. The first 包 (bāo) is held high and level; the second zi reduces to a light neutral tone. The same pattern applies to many two-syllable food words: 饺子 jiǎozi, 包子 bāozi, 茄子 qiézi.',
      'word',
      '我想吃包子 wǒ xiǎng chī bāozi ("I\'d like to eat steamed buns")',
      'A reliable mini-pattern: dish-name + 子 → second syllable goes neutral.',
      [
        { target: '包 (bāo, 1st)', note: 'first syllable; held high and level' },
        { target: '子 (zi, neutral)', note: 'noun-forming suffix; always neutral tone, never marked' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '买单',
      'mǎidān',
      'A third-tone syllable followed by a first-tone syllable. 买 (mǎi, "buy") keeps its full dip-and-rise; 单 (dān, "list/bill") is held high and level. The whole phrase 买单 (mǎidān, "pay the bill") is the standard southern-Chinese phrasing; northern speakers often prefer 结账 jiézhàng.',
      'word',
      '服务员，买单! fúwùyuán, mǎidān! ("Server, the bill please!")',
      'Universally understood across Mainland China today; either 买单 or 结账 works in any restaurant.',
      [
        { target: '买 (mǎi, 3rd)', note: 'full third tone; isolated or before non-third tone keeps the dip-and-rise' },
        { target: '单 (dān, 1st)', note: 'first tone; high and level' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Dishes & drinks
    // ────────────────────────────────────────────────────────────────────
    createContentItem('饺子', 'jiǎozi', 'Crescent-shaped boiled or pan-fried dumplings — the most iconic northern Chinese staple. Sold by 份 (fèn, portion, ~10 pieces) at restaurants and by weight at dumpling shops. Eaten during Chinese New Year for good fortune; ubiquitous year-round in Beijing.', 'word', '来一份猪肉饺子。', 'Standard order: "bring one serving of pork dumplings"; 猪肉 (zhūròu) = pork, the default filling.', null, [ACT.vocabularyDishes]),
    createContentItem('包子', 'bāozi', 'Steamed buns with a filling inside — meat (肉包子 ròu bāozi), vegetable (菜包子 cài bāozi), or red-bean paste (豆沙包 dòushābāo). Eaten for breakfast or as a snack; sold individually at street stalls and in 笼 (lóng, "steamer baskets") at restaurants.', 'word', '我要两个肉包子。', 'Casual breakfast order; 两个 (liǎng gè) = "two" using the special pre-classifier form of 二.', null, [ACT.vocabularyDishes]),
    createContentItem('小笼包', 'xiǎolóngbāo', 'Shanghai-style soup dumplings — thin-skinned, filled with pork and a burst of hot broth. Eaten with vinegar and ginger; bite carefully to avoid scalding the soup inside. A signature dish that travels well from Shanghai to most major-city restaurants.', 'word', '小笼包要小心吃，里面有汤。', '"Eat xiaolongbao carefully — there\'s soup inside"; a standard warning to first-timers.', null, [ACT.vocabularyDishes]),
    createContentItem('面条', 'miàntiáo', 'Wheat noodles in many regional forms — 拉面 (lāmiàn, hand-pulled), 刀削面 (dāoxiāo miàn, knife-shaved), 炸酱面 (zhájiàng miàn, Beijing-style with fermented soybean paste). Served in soup (汤面 tāngmiàn) or stir-fried (炒面 chǎomiàn).', 'word', '我想吃一碗牛肉面。', '"I\'d like a bowl of beef noodles"; 一碗 (yì wǎn, "one bowl") is the standard counter for noodle dishes.', null, [ACT.vocabularyDishes]),
    createContentItem('米饭', 'mǐfàn', 'Steamed white rice — the staple grain of southern China and the universal side that anchors a shared meal. Always ordered separately at restaurants; one bowl per person is the default. In northern China, wheat-based staples (noodles, buns) often replace rice.', 'word', '再来三碗米饭。', '"Bring three more bowls of rice"; 再 (zài, "again/more") triggers a top-up.', null, [ACT.vocabularyDishes]),
    createContentItem('火锅', 'huǒguō', 'Hotpot — a boiling broth in the middle of the table where everyone dips raw meat, vegetables, and noodles to cook on the spot. Famous variants: 四川火锅 (Sichuan, fiery) and 北京涮羊肉 (Beijing-style lamb). The most communal dish in Chinese cuisine — ordering hotpot is a social commitment.', 'word', '今天晚上去吃火锅吧!', '"Let\'s go eat hotpot tonight!"; a classic Friday-night Beijing student suggestion.', null, [ACT.vocabularyDishes]),
    createContentItem('麻辣烫', 'málàtàng', 'A street-food cousin of hotpot — skewers of vegetables, meat, and noodles cooked in a numbing-spicy broth and served in a single bowl. Sold by weight at small shops; popular as a quick, cheap dinner near universities. The name literally means "numbing-spicy-hot".', 'word', '学校附近有很多麻辣烫店。', '"There are many málàtàng shops near the school"; standard student-area landscape.', null, [ACT.vocabularyDishes]),
    createContentItem('烤鸭', 'kǎoyā', 'Roast duck — most famously Beijing roast duck (北京烤鸭 Běijīng kǎoyā), served with thin pancakes (薄饼), sliced cucumber, scallions, and sweet bean sauce (甜面酱). One of the most celebrated dishes in Chinese cuisine; ordering it is a special-occasion move.', 'word', '到了北京一定要吃烤鸭。', '"Once you\'re in Beijing you absolutely have to eat roast duck"; a near-mandatory tourist and local recommendation.', null, [ACT.vocabularyDishes]),
    createContentItem('宫保鸡丁', 'gōngbǎo jīdīng', 'Kung Pao chicken — diced chicken stir-fried with peanuts, dried chilies, and Sichuan peppercorns. One of the most internationally recognized Chinese dishes; the authentic version is much spicier and more numbing than the Westernized adaptations. A Sichuan classic now ubiquitous nationwide.', 'word', '宫保鸡丁有点儿辣，但是很好吃。', '"Kung Pao chicken is a bit spicy, but very delicious"; a fair warning to first-timers.', null, [ACT.vocabularyDishes]),
    createContentItem('麻婆豆腐', 'mápó dòufu', 'Mapo tofu — silky tofu cubes in a fiery, numbing Sichuan sauce of fermented broad-bean paste (豆瓣酱), Sichuan peppercorn, and minced pork. Named after a pockmarked old woman (麻婆) said to have invented it in 19th-century Chengdu. A vegetarian-friendly version omits the pork.', 'word', '麻婆豆腐又麻又辣，下饭。', '"Mapo tofu is numbing and spicy — great with rice"; 下饭 (xià fàn) = "goes well with rice", a key restaurant-review concept.', null, [ACT.vocabularyDishes]),
    createContentItem('鱼香肉丝', 'yúxiāng ròusī', 'Yuxiang shredded pork — slivers of pork in a sweet-sour-savory sauce flavored to evoke fish (despite containing no fish). A balanced Sichuan favorite; less spicy than mapo tofu or kung pao. A safe choice for diners who want a Sichuan dish without overwhelming heat.', 'word', '不太辣的话，鱼香肉丝挺好。', '"If you don\'t want it too spicy, yuxiang shredded pork is pretty good"; a typical recommendation to a heat-shy companion.', null, [ACT.vocabularyDishes]),
    createContentItem('青菜', 'qīngcài', 'Green leafy vegetables — broadly any sautéed green like bok choy (小白菜), spinach (菠菜), or water spinach (空心菜). The default vegetable order to balance out heavier meat dishes; a basic question at any restaurant is "要不要点个青菜?" ("shall we order a vegetable?").', 'word', '我们点个青菜吧，太油腻了。', '"Let\'s order a vegetable — it\'s too oily"; standard mid-meal balancing.', null, [ACT.vocabularyDishes]),
    createContentItem('水', 'shuǐ', 'Water — at Chinese restaurants the default is WARM water (热水 rèshuǐ) or boiled water (开水 kāishuǐ), not ice water. Asking for 冰水 (bīngshuǐ, "ice water") can surprise the server outside of Western-style places. Cold drinks during meals are traditionally believed to disrupt digestion.', 'word', '麻烦给我一杯热水。', '"May I trouble you for a cup of hot water?"; 麻烦 (máfan) is a polite request-softener.', null, [ACT.vocabularyDishes]),
    createContentItem('茶', 'chá', 'Tea — green (绿茶 lǜchá), oolong (乌龙茶 wūlóngchá), black (红茶 hóngchá, literally "red tea"), or pu-erh (普洱茶 pǔěrchá). Often served free in Cantonese-style restaurants; ordered separately in northern restaurants. The default beverage of any meal that does not include alcohol.', 'word', '请给我们一壶茉莉花茶。', '"Please bring us a pot of jasmine tea"; 一壶 (yì hú) = "one pot", the standard tea unit.', null, [ACT.vocabularyDishes]),
    createContentItem('啤酒', 'píjiǔ', 'Beer — the default alcohol at casual Chinese restaurants. Major Mainland brands: 青岛 (Tsingtao), 燕京 (Yanjing, Beijing\'s local), 雪花 (Snow). Usually served in 600ml bottles meant to be shared, not individual pints. Toasting (干杯) with beer is constant during dinners.', 'word', '来两瓶青岛啤酒。', '"Bring two bottles of Tsingtao beer"; 瓶 (píng, bottle) is the standard counter.', null, [ACT.vocabularyDishes]),
    createContentItem('可乐', 'kělè', 'Cola — universally understood as Coca-Cola or Pepsi. 雪碧 (Xuěbì) is Sprite; 芬达 (Fēndá) is Fanta. A common non-alcoholic choice for students and younger diners; usually served in 听 (tīng, "can") or 瓶 (píng, "bottle").', 'word', '我要一听可乐，谢谢。', '"I\'ll have one can of cola, thanks"; 一听 (yì tīng) = "one can".', null, [ACT.vocabularyDishes]),
    createContentItem('豆浆', 'dòujiāng', 'Soy milk — the classic Chinese breakfast drink, usually served warm (热豆浆 rè dòujiāng) and paired with 油条 (yóutiáo, fried dough sticks). Comes sweetened (甜 tián) or unsweetened (咸 xián, the savory southern style). A breakfast staple, rarely ordered at dinner.', 'word', '早餐我喜欢喝热豆浆。', '"For breakfast I like to drink hot soy milk"; standard morning-routine sentence.', null, [ACT.vocabularyDishes]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Service verbs & flavor adjectives
    // ────────────────────────────────────────────────────────────────────
    createContentItem('服务员', 'fúwùyuán', '"Server" / restaurant attendant — the standard way to flag down staff at any casual restaurant; calling out "服务员!" across the room is normal, not rude. In upscale places, a quieter wave or eye contact is preferred. Avoid the older "小姐" (xiǎojiě) for female servers — its modern slang meaning makes it inappropriate.', 'word', '服务员，能不能加点儿水?', '"Server, could you add some water?"; flagging the staff with a polite request.', null, [ACT.vocabularyTable]),
    createContentItem('菜单', 'càidān', 'Menu — printed booklet, laminated card, or increasingly a QR code that opens the restaurant\'s mini-program. Asking for the menu in a sit-down restaurant: "请给我们菜单" (qǐng gěi wǒmen càidān). In hotpot places, an order sheet 单子 (dānzi) often replaces the menu.', 'word', '请把菜单给我看一下。', '"Please give me the menu for a look"; 把…给 is a common request structure.', null, [ACT.vocabularyTable]),
    createContentItem('点菜', 'diǎn cài', 'To order food — the verb-object compound that covers the act of choosing dishes. 点 (diǎn, "to point at / select") + 菜 (cài, "dish"). The server\'s standard opening question after seating is "你们要点什么?" or "想点什么?".', 'word', '我们准备好点菜了。', '"We\'re ready to order"; standard signal to the server.', null, [ACT.vocabularyTable]),
    createContentItem('上菜', 'shàng cài', 'To serve / bring out the dishes — used both by the kitchen ("dish is ready, send it out") and by customers asking about timing ("when will it come?"). 上 (shàng) here means "send up/out", not "go up".', 'word', '请快一点儿上菜，可以吗?', '"Could you bring out the dishes a bit faster?"; soft 快一点儿 + 可以吗? request.', null, [ACT.vocabularyTable]),
    createContentItem('加', 'jiā', 'To add — used both for ingredients ("add more salt") and for refills ("add more water"). Pairs naturally with 一点儿 for soft requests: 加一点儿 = "add a little". One of the most frequent verbs in any restaurant exchange.', 'word', '麻烦加点儿热水。', '"May I trouble you to add some hot water?"; classic refill request.', null, [ACT.vocabularyTable]),
    createContentItem('买单', 'mǎidān', 'Pay the bill — southern Chinese phrasing now used nationwide. Literal "buy the receipt". Universally understood; you can call out 买单! to the server from your table. The northern counterpart 结账 (jiézhàng) is equally common.', 'word', '吃完了，咱们买单吧。', '"We\'re done eating, let\'s pay"; 咱们 (zánmen) is the inclusive "we" used colloquially.', null, [ACT.vocabularyTable]),
    createContentItem('结账', 'jiézhàng', 'Settle the account / pay the bill — the more northern-Chinese phrasing, slightly more formal than 买单. Both work everywhere in Mainland China today. The server may ask "怎么结账?" ("how will you pay?") and you answer 现金 (cash), 微信 (WeChat Pay), or 支付宝 (Alipay).', 'word', '请结账，刷卡可以吗?', '"Please bring the bill — can I swipe a card?"; though mobile pay dominates, asking is wise.', null, [ACT.vocabularyTable]),
    createContentItem('打包', 'dǎbāo', 'To pack up leftovers / take away — completely standard practice in Mainland Chinese restaurants, not a low-class move. Asking 能不能打包? is expected after large orders. Many restaurants charge a small fee for the box (打包盒费 dǎbāo hé fèi).', 'word', '剩下的能不能打包?', '"Can you pack up what\'s left?"; 剩下 (shèngxià) = "leftover".', null, [ACT.vocabularyTable]),
    createContentItem('一份', 'yí fèn', 'One portion / one serving — the most common counter for restaurant orders of stir-fried dishes, dumplings, and shared plates. Comes with the 一 sandhi: yī → yí before fourth-tone 份. For larger orders use 两份 (liǎng fèn, "two portions").', 'word', '来一份宫保鸡丁。', '"Bring one order of kung pao chicken"; the classic 来 + 一份 + dish order pattern.', null, [ACT.vocabularyTable]),
    createContentItem('一碗', 'yì wǎn', 'One bowl — counter used for soups, noodles, rice, congee, and anything served in a bowl. 一 (yī) becomes yì (4th, falling) before the third-tone 碗 (wǎn). Common: 一碗面 (a bowl of noodles), 一碗粥 (a bowl of porridge).', 'word', '再来一碗白米饭。', '"Bring another bowl of plain rice"; 再 (zài) = "again/more".', null, [ACT.vocabularyTable]),
    createContentItem('一杯', 'yì bēi', 'One cup / one glass — counter for any liquid in a cup or glass, hot or cold: 一杯水 (a cup of water), 一杯茶 (a cup of tea), 一杯啤酒 (a glass of beer). 一 becomes yì before 杯 (bēi, 1st).', 'word', '我要一杯热水，谢谢。', '"I\'d like a cup of hot water, thanks"; safe default at any restaurant.', null, [ACT.vocabularyTable]),
    createContentItem('辣', 'là', 'Spicy — the heat dimension of Sichuan, Hunan, and other inland cuisines. Combines with 麻 (má, numbing) for the famous 麻辣 (málà) sensation that defines Sichuan food. Crucial phrase for ordering: "不要太辣" (búyào tài là, "not too spicy") or "微辣" (wēi là, "mildly spicy").', 'word', '这个菜辣不辣?', '"Is this dish spicy?"; the A-not-A form for a yes/no question about heat.', null, [ACT.vocabularyTable]),
    createContentItem('咸', 'xián', 'Salty — also "savory" in some breakfast contexts (咸豆浆 = savory soy milk). Use 太咸了 (tài xián le, "too salty") for feedback; 少放盐 (shǎo fàng yán, "use less salt") for ordering. Northern Chinese cuisine is sometimes characterized as saltier than southern.', 'word', '汤有点儿咸，下次少放一点儿盐。', '"The soup is a bit salty; put less salt next time"; a gentle modification cue.', null, [ACT.vocabularyTable]),
    createContentItem('甜', 'tián', 'Sweet — both the flavor and the cooking-style descriptor. Cantonese and Shanghai cuisines are notably sweeter than northern ones. Common: 甜豆浆 (sweet soy milk), 甜面酱 (sweet bean sauce served with Peking duck). Some learners describe a dish as 甜 when they mean it has sugar added.', 'word', '上海菜有点儿甜，我喜欢。', '"Shanghai food is a bit sweet — I like it"; a typical regional-flavor comment.', null, [ACT.vocabularyTable]),
    createContentItem('酸', 'suān', 'Sour — both a taste and a feeling (酸 also describes muscle ache). Common in northern dishes featuring vinegar (醋 cù): 酸辣汤 (suānlàtāng, hot-and-sour soup), 酸菜 (suāncài, pickled mustard greens). 酸甜 (suāntián, "sweet-and-sour") is a fundamental flavor pairing.', 'word', '酸辣汤又酸又辣，开胃。', '"Hot-and-sour soup is sour and spicy — appetite-opening"; 开胃 = whets the appetite.', null, [ACT.vocabularyTable]),
    createContentItem('苦', 'kǔ', 'Bitter — least common of the five flavors at a typical meal; appears in 苦瓜 (kǔguā, bitter melon) and certain teas. Often used metaphorically for hardship: 吃苦 (chī kǔ, "to endure hardship", literally "eat bitterness"). Few diners actively seek out bitterness.', 'word', '苦瓜苦，但是对身体好。', '"Bitter melon is bitter, but good for the body"; classic Chinese-medicine reasoning.', null, [ACT.vocabularyTable]),
    createContentItem('清淡', 'qīngdàn', 'Light, mild, non-greasy — a positive descriptor for dishes that are easy on the stomach. The standard request when avoiding heavy or spicy food: "我想吃清淡一点儿的" (wǒ xiǎng chī qīngdàn yìdiǎnr de, "I\'d like something a bit lighter"). Cantonese cuisine is broadly described as 清淡 compared to Sichuan.', 'word', '今天想吃清淡一点儿的。', '"Today I\'d like something lighter"; common request after a heavy weekend.', null, [ACT.vocabularyTable]),
    createContentItem('油腻', 'yóunì', 'Oily / greasy — generally negative when describing food; positive only if you specifically want richness. Common complaint: "这个菜太油腻了" (this dish is too greasy). Pair with 清淡 as opposites when discussing flavor balance.', 'word', '炸的东西太油腻，我不太爱吃。', '"Fried things are too greasy — I don\'t really love them"; common preference statement.', null, [ACT.vocabularyTable]),
    createContentItem('好吃', 'hǎochī', 'Tasty / delicious (of solid food) — the everyday adjective for praising a dish. Compare to 好喝 (hǎohē, "good to drink") for beverages. Use 真好吃 (zhēn hǎochī, "really delicious") for emphasis; 不太好吃 (bú tài hǎochī, "not very tasty") for polite negative feedback.', 'word', '这家的烤鸭真好吃!', '"This place\'s roast duck is really delicious!"; classic recommendation.', null, [ACT.vocabularyTable]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 想 vs 要
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '想 + verb — soft wish',
      'xiǎng + verb',
      '想 (xiǎng) + VERB expresses a soft wish, preference, or "would like to" — closer to English "I\'d like to" or "I\'m thinking of". Used naturally in the PLANNING phase: deciding with a friend what to eat before reaching the server. Crucially 想 is a MODAL verb here, not the lexical "miss/think of".',
      'sentence',
      '我想吃饺子。我想喝茶。今天晚上想吃什么?',
      '"I\'d like to eat dumplings. I\'d like to drink tea. What would you like to eat tonight?" — all preference-phase sentences with 想.',
      [
        { target: '我想吃 wǒ xiǎng chī', note: '"I\'d like to eat" — soft preference, not a binding decision' },
        { target: '我想喝 wǒ xiǎng hē', note: '"I\'d like to drink" — same modal pattern with a different action verb' },
        { target: '想 + verb (NOT noun)', note: '想 attaches to a VERB; for direct noun-only requests, use 要 instead' },
      ],
      [ACT.grammarWantWords],
    ),
    createContentItem(
      '要 + noun — direct want',
      'yào + noun',
      '要 (yào) + NOUN expresses a direct want — equivalent to English "I want…" or "I\'ll have…" when ordering. Used naturally at the MOMENT of ordering to the server. 要 can also take a verb (我要走 = "I want to go") with a more decisive feeling than 想.',
      'sentence',
      '我要一份米饭。我要一杯茶。我们要两碗牛肉面。',
      '"I\'ll have one serving of rice. I\'ll have a cup of tea. We\'ll have two bowls of beef noodles." — all direct orders.',
      [
        { target: '我要 wǒ yào', note: '"I want" / "I\'ll have"; direct register, used to servers' },
        { target: '要 + noun ✓', note: 'standard ordering pattern: 要 + classifier + dish' },
        { target: '要 + verb ✓ (more decisive)', note: 'e.g., 我要走 ("I want to leave"), stronger than 我想走' },
      ],
      [ACT.grammarWantWords],
    ),
    createContentItem(
      '想 vs 要 — register contrast',
      'xiǎng vs yào',
      'CRITICAL CONTRAST: 想 is a wish ("I would like to"), 要 is a request ("I want / I\'ll have"). Saying 我要 to a close friend during planning can sound demanding; saying 我想 to a busy server can sound indecisive. The natural rhythm is 想 → 要: 想 while choosing, 要 when ordering.',
      'sentence',
      'PLANNING with friend: "我想吃火锅。" (I\'d like to eat hotpot.)\nORDERING to server: "我要一份火锅。" (I\'ll have one hotpot.)',
      'The same diner uses both — same wish, two registers. The shift signals "decision made, now ordering".',
      [
        { target: '想 (soft, wish)', note: 'use during planning with friends or when expressing a not-yet-decided preference' },
        { target: '要 (direct, request)', note: 'use to servers when ordering or when stating a firm decision' },
        { target: '我不想 vs 我不要', note: '"don\'t want to" vs "don\'t want" — same register contrast applies to negation' },
      ],
      [ACT.grammarWantWords],
    ),
    createContentItem(
      '来 + 一份 — server-direct order',
      'lái + yí fèn',
      'A third, very direct ordering pattern: 来 (lái, literally "come/bring") + counter + dish, said to the server. 来一份饺子 = "bring one order of dumplings". More confident than 我要…; the regular-customer phrasing common in casual restaurants.',
      'sentence',
      '来一份宫保鸡丁，再来两碗米饭。',
      '"Bring one Kung Pao chicken and two bowls of rice"; smooth, fluent ordering style.',
      [
        { target: '来 + counter + noun', note: 'imperative-like "bring me…"; no pronoun needed, the server understands' },
        { target: '再来 zài lái', note: '"bring some more"; standard for follow-up orders mid-meal' },
        { target: 'register: very direct but warm', note: 'sounds confident; locals use this more than learners expect' },
      ],
      [ACT.grammarWantWords],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 一点儿 modifications
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '一点儿 — a bit',
      'yìdiǎnr — a bit',
      '一点儿 (yìdiǎnr, "a bit / a little") softens a modification request when paired with 少 (less) or 多 (more) and a verb. Pattern: 少 / 多 + VERB + 一点儿 + NOUN. Without 一点儿 the request sounds abrupt; with it, the request sounds polite and native.',
      'sentence',
      '少放一点儿盐。多加一点儿辣。',
      '"Put a little less salt. Add a little more spice." — the universal polite-modification rhythm.',
      [
        { target: '少 + verb + 一点儿 + noun', note: '"do less of (verb) with (noun)" — request for reducing an ingredient' },
        { target: '多 + verb + 一点儿 + noun', note: '"do more of (verb) with (noun)" — request for adding an ingredient' },
        { target: '一点儿 vs 有点儿', note: '一点儿 is for modifying actions/requests; 有点儿 (yǒudiǎnr) is for describing a slight negative state ("a bit too salty")' },
      ],
      [ACT.grammarYidianr],
    ),
    createContentItem(
      '少 + verb + 一点儿',
      'shǎo + verb + yìdiǎnr',
      '少 (shǎo, "less / fewer") + verb + 一点儿 is the standard "use less of X" request. Common at restaurants: 少放盐 (less salt), 少放糖 (less sugar), 少放辣 (less spice), 少放油 (less oil). The 一点儿 adds softness — a request rather than a demand.',
      'sentence',
      '麻烦少放一点儿盐，谢谢。',
      '"May I trouble you to use a little less salt, thanks"; the full polite frame with 麻烦 and 谢谢 bookends.',
      [
        { target: '少放 shǎo fàng', note: '"put less"; 放 (fàng) = "put in", the cooking verb' },
        { target: '少放盐 shǎo fàng yán', note: '"less salt"; one of the most common modifications' },
        { target: '少放油 shǎo fàng yóu', note: '"less oil"; useful for diners avoiding greasy food' },
      ],
      [ACT.grammarYidianr],
    ),
    createContentItem(
      '多 + verb + 一点儿',
      'duō + verb + yìdiǎnr',
      '多 (duō, "more") + verb + 一点儿 is the standard "use more of X" request. Common: 多放辣 (more spice), 多加水 (more water), 多放葱 (more scallions). Same polite pattern as 少 + verb + 一点儿; the 一点儿 keeps the request from sounding pushy.',
      'sentence',
      '我喜欢吃辣的，多加一点儿辣椒。',
      '"I like spicy food — add a little more chili"; pairing a preference statement with a modification.',
      [
        { target: '多加 duō jiā', note: '"add more"; 加 (jiā) = "add"' },
        { target: '多放辣 duō fàng là', note: '"more spice"; the spice-lover\'s modification' },
        { target: '多 vs 再 zài', note: '多 = "more of this dish", 再 = "another one"; 再来一份 ("bring another order") vs 多放一点儿 ("put more in this one")' },
      ],
      [ACT.grammarYidianr],
    ),
    createContentItem(
      '有点儿 — describing slight negative',
      'yǒudiǎnr — describing',
      '有点儿 (yǒudiǎnr) describes a SLIGHT negative quality of something already present, in contrast to 一点儿 which modifies a request. 这个菜有点儿咸 ("this dish is a bit salty") vs 少放一点儿盐 ("put a little less salt"). Mix them up and the sentence breaks.',
      'sentence',
      'CORRECT: 这个汤有点儿咸 ("this soup is a bit too salty" — feedback)\nCORRECT: 下次少放一点儿盐 ("put less salt next time" — request)',
      'A high-frequency learner trap; the two 点儿 words look similar but occupy different syntactic slots.',
      [
        { target: '有点儿 + adjective', note: 'describes a slight, usually negative, state of something — used as feedback' },
        { target: '一点儿 + verb structure', note: 'modifies a request or comparison — used to soften an order' },
      ],
      [ACT.grammarYidianr],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 能不能 polite request
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '能不能 + verb',
      'néngbunéng + verb',
      '能不能 (néngbunéng, "can you / can\'t you") is the A-not-A question form of 能 (can/be able to). Used to make a polite request: 能不能加一点儿水? ("Can you add a little water?"). The "yes-or-no" framing makes the request softer than a flat statement.',
      'sentence',
      '能不能少放一点儿盐? 能不能快一点儿上菜?',
      '"Can you use a little less salt? Can you bring the dishes a bit faster?" — two polite-modification requests.',
      [
        { target: '能不能 + verb', note: 'the A-not-A form of 能; offering both yes and no makes the request feel less demanding' },
        { target: '能 vs 会 vs 可以', note: '能 = capability ("can do"), 会 = learned skill ("knows how to"), 可以 = permission ("is allowed to")' },
        { target: 'rising intonation NOT needed', note: 'unlike English questions, Mandarin yes/no questions do not require pitch rise — the 不 inside is the question marker' },
      ],
      [ACT.grammarNengbuneng],
    ),
    createContentItem(
      '能 vs 可以',
      'néng vs kěyǐ',
      'CONTRAST: 能 (néng) emphasizes CAPABILITY ("are you able to?"), 可以 (kěyǐ) emphasizes PERMISSION ("is it allowed?"). At restaurants both work for requests; 能不能 sounds slightly more colloquial, 可以…吗? slightly more formal. The server understands both.',
      'sentence',
      '能不能换一份? (capability framing — "can you swap it?")\n可以换一份吗? (permission framing — "is it OK to swap?")',
      'Same outcome, two flavors; the difference is subtle but native speakers feel it.',
      [
        { target: '能不能 (capability)', note: 'softer in colloquial restaurant talk; common in casual register' },
        { target: '可以…吗? (permission)', note: 'slightly more polite-formal; common in customer-service exchanges' },
        { target: '可以 also marks consent', note: '"可以" alone as an answer means "OK / sure"; common server response' },
      ],
      [ACT.grammarNengbuneng],
    ),
    createContentItem(
      '能不能 + 一点儿 stack',
      'néngbunéng + yìdiǎnr stack',
      'Combine 能不能 with the 一点儿 modification for a DOUBLY softened request — the politest way to adjust a dish at a Chinese restaurant. Pattern: 能不能 + 少/多 + VERB + 一点儿 + NOUN. Used for cooking-staff requests that might inconvenience the kitchen.',
      'sentence',
      '能不能少放一点儿盐?',
      '"Could you possibly put a little less salt?" — the gold-standard polite modification.',
      [
        { target: '能不能 (frame: politeness)', note: 'the outer A-not-A question softens the whole request' },
        { target: '少/多 + verb (action)', note: 'the verb describes what the kitchen should do differently' },
        { target: '一点儿 + noun (target)', note: 'the noun specifies the ingredient; 一点儿 softens "more / less"' },
      ],
      [ACT.grammarNengbuneng],
    ),
    createContentItem(
      '请 — formal please',
      'qǐng — formal please',
      '请 (qǐng, "please / may I ask") opens a polite request at a more formal restaurant or when speaking to a senior. 请 + verb is more polished than 能不能; it can stack with 能不能 (请问能不能…?) for an extra-polite frame. Drop 请 with peers — it can sound stiff in casual settings.',
      'sentence',
      '请帮我打包，谢谢。',
      '"Please help me pack this up, thank you"; a more polished version of 帮我打包.',
      [
        { target: '请 + verb', note: 'polite imperative; standard service register' },
        { target: '请问 qǐngwèn', note: '"may I ask"; polite question opener for any service interaction' },
        { target: 'when NOT to use 请', note: 'in peer-to-peer casual eating with friends; sounds formal-distant there' },
      ],
      [ACT.grammarNengbuneng],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '北京餐厅 — 一篇短文',
      'Běijīng cāntīng — yì piān duǎnwén',
      'A 5-sentence restaurant review of a Friday-night dinner near Tsinghua. Read it aloud with correct tones, sandhi, and natural rhythm; notice how the writer alternates between dish description, flavor reaction, and price.',
      'sentence',
      '昨天晚上，我和同学一起去了五道口的一家川菜馆。我们点了一份宫保鸡丁、一份麻婆豆腐和两碗米饭。麻婆豆腐有点儿辣，但是真的很好吃。服务员很客气，还给我们加了热水。一共一百二十八块，我们打包了剩下的菜。',
      'Translation: "Last night I went with a classmate to a Sichuan restaurant at Wudaokou. We ordered one Kung Pao chicken, one mapo tofu, and two bowls of rice. The mapo tofu was a bit spicy but really delicious. The server was very polite and added hot water for us. The total was 128 yuan and we packed up the leftovers."',
      [
        { target: '五道口 Wǔdàokǒu', note: 'student district just south of Tsinghua; a major university hangout for cheap restaurants' },
        { target: '点了一份… diǎn le yí fèn…', note: 'past-tense order: 点 (order) + 了 (completed action) + 一份 (one serving)' },
        { target: '有点儿辣 yǒudiǎnr là', note: '"a bit spicy" — feedback using 有点儿 (describes a slight state), NOT 一点儿' },
        { target: '一共…块 yígòng…kuài', note: '"in total…yuan"; 块 (kuài) is the colloquial unit for 元 (yuán), the currency' },
        { target: '打包了剩下的菜', note: '"packed up the leftovers"; standard practice — leftover packing is the norm in Mainland China' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions matching the review. Answer each in a short sentence; full sentences are not required for natural Mandarin.',
      'sentence',
      'Q1: 他们去了什么餐厅? Q2: 他们点了几个菜? Q3: 麻婆豆腐怎么样? Q4: 一共多少钱?',
      'Two factual questions, one opinion, one numeric — covering the question patterns from this lesson.',
      [
        { target: 'A1: 他们去了五道口的一家川菜馆。', note: 'place answer; 川菜 (chuāncài) = Sichuan cuisine' },
        { target: 'A2: 他们点了三个菜，还有两碗米饭。', note: 'count answer; rice is counted separately from the main dishes' },
        { target: 'A3: 麻婆豆腐有点儿辣，但是很好吃。', note: 'opinion answer using 有点儿 + 但是 to give nuanced feedback' },
        { target: 'A4: 一共一百二十八块。', note: 'numeric answer; uses 块 for casual yuan' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '决定吃什么 (对话 — 同学)',
      'juédìng chī shénme (duìhuà — tóngxué)',
      'A 6-turn casual conversation between two Tsinghua classmates deciding where and what to eat on a Friday night. Notice the peer-register markers: 你想…, 我们…吧, 好啊, 走 — all signs of friend-to-friend talk.',
      'conversation',
      'A: 晚上想吃什么? 我有点儿饿了。\nB: 我也是。去吃火锅怎么样?\nA: 火锅太麻烦了，我想吃简单一点儿的。我们吃面条吧?\nB: 也行。五道口那家牛肉面挺好吃的。\nA: 那家有点儿辣，能吃辣吗?\nB: 没问题，我喜欢吃辣的。走，我们现在就去!',
      'A natural friend-to-friend exchange — soft preferences (想), suggestions with 吧, and the practical question about spice tolerance.',
      [
        { target: '想吃什么 xiǎng chī shénme', note: 'soft "what would you like to eat" — preference question, not yet a decision' },
        { target: '我们…吧 wǒmen…ba', note: 'suggestion-softening particle; less pushy than a bare statement' },
        { target: '怎么样 zěnmeyàng', note: '"how about it?" — universal proposal-ending tag for peer suggestions' },
        { target: '挺…的 tǐng…de', note: '"quite / fairly…"; mild positive intensifier, common in casual speech' },
        { target: '能吃辣吗 néng chī là ma', note: 'capability check before committing — 能 = can/able' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '点菜 + 买单 (对话 — 服务员)',
      'diǎn cài + mǎidān (duìhuà — fúwùyuán)',
      'A 6-turn restaurant conversation with a server. Notice the register shift: peers use 我们…吧 with each other, but switch to direct 我要 / 来一份 when speaking to the server. The polite 能不能 + 一点儿 appears in the modification line.',
      'conversation',
      '服务员: 欢迎光临，几位?\nA: 两位，麻烦给我们菜单。\n服务员: 好的，想点什么?\nA: 来一份宫保鸡丁、一份青菜，再来两碗米饭。能不能少放一点儿辣?\n服务员: 没问题。喝什么饮料?\nA: 一壶茉莉花茶，谢谢。\n... (饭后) ...\nA: 服务员，买单! 剩下的菜能不能打包?\n服务员: 当然可以。一共一百二十八块，扫码支付。',
      'Captures the full arc: greeting, ordering, modification, drink, payment, leftover packing — every micro-skill from this lesson in one flow.',
      [
        { target: '欢迎光临 huānyíng guānglín', note: 'standard restaurant greeting from the host; literal "welcome to your visit"' },
        { target: '几位? jǐ wèi?', note: '"how many?" using the polite people-counter 位; 几个人 would be less polite' },
        { target: '来一份 + 再来 sequence', note: 'multi-item ordering rhythm; 再 chains the next item without repeating 来' },
        { target: '能不能少放一点儿辣', note: 'the doubly-polite modification stack from Grammar III' },
        { target: '扫码支付 sǎo mǎ zhīfù', note: '"scan-code pay" — the now-default Mainland payment via WeChat or Alipay QR' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable 5-sentence template for recommending a Chinese dish to a friend. Fill in the bracketed slots with your own information; the structure carries the rest.',
      'sentence',
      '我想给你推荐 [菜名]。这是 [地区] 菜，[味道描述]。一份大概 [价钱] 块，挺值的。如果你不太能吃 [味道]，能不能少放一点儿 [调料]。我们下次一起去 [地点] 吃，好吗?',
      'Five sentences cover the core: recommendation, regional origin, flavor description, price, polite-modification tip, invitation to go together.',
      [
        { target: '[菜名]', note: 'name of the dish — use one of the canonical Chinese dishes from Vocabulary I' },
        { target: '[地区] 菜', note: 'regional cuisine — 川菜 (Sichuan), 粤菜 (Cantonese), 京菜 (Beijing), 湘菜 (Hunan)' },
        { target: '[味道描述]', note: 'flavor description using vocabulary from Activity 4: 辣 / 甜 / 酸 / 清淡 / 油腻' },
        { target: '[调料]', note: 'seasoning to reduce — 盐 (salt), 辣椒 (chili), 糖 (sugar), 油 (oil)' },
        { target: '[地点]', note: 'place — 食堂 (cafeteria), 五道口 (Wudaokou), 校园里 (on campus)' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 4–5 sentence recommendation in Hanzi using the template. Use at least one 想 + verb and one 要 + noun construction so the writing demonstrates the core grammar of this lesson.',
      'sentence',
      '示例: 我想给你推荐麻婆豆腐。这是川菜，又麻又辣，但是很下饭。一份大概三十块，挺值的。如果你不太能吃辣，能不能少放一点儿辣椒。我们下次一起去清华南门那家川菜馆吃，好吗?',
      'Translation: "I want to recommend mapo tofu. It\'s a Sichuan dish — numbing and spicy, but great with rice. A serving is about 30 yuan, good value. If you can\'t handle spicy food well, ask for less chili. Let\'s go to the Sichuan place near Tsinghua\'s south gate next time, OK?"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '共享式吃饭',
      'gòngxiǎng shì chīfàn',
      'Communal eating: in Chinese restaurants, dishes are placed in the CENTER of the table and shared among everyone. Larger tables often have a lazy susan (转盘 zhuànpán) so dishes can rotate. Ordering "my own plate" is a cultural mismatch — the social pleasure of a Chinese meal IS sharing.',
      'sentence',
      '我们点几个菜一起吃吧，不用每个人点自己的。',
      '"Let\'s order a few dishes to share — no need for each person to order their own"; a typical friend-to-friend planning line.',
      [
        { target: '转盘 zhuànpán', note: 'lazy susan in the center of round tables; rotates so everyone reaches every dish' },
        { target: '点几个菜 diǎn jǐ gè cài', note: '"order a few dishes" — the planning unit for a shared meal is "dishes for the table", not "one dish per person"' },
        { target: '夹菜 jiā cài', note: '"pick up food with chopsticks"; in formal settings the host may dā (use serving chopsticks) and place food on your plate as hospitality' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '干杯 — toasting culture',
      'gānbēi — toasting culture',
      'Toasting (干杯 gānbēi, literally "dry the cup") punctuates Chinese dinners with alcohol. The host raises a glass first; juniors raise their glass slightly LOWER than seniors as a sign of respect. 干杯 can mean either "cheers" (sip) or "bottom-up" (finish the whole glass); read the host\'s lead. Non-drinkers can toast with tea or water — 以茶代酒 (yǐ chá dài jiǔ, "tea in place of wine") is fully acceptable.',
      'sentence',
      '干杯! 祝大家身体健康!',
      '"Cheers! To everyone\'s health!"; the universal opening toast.',
      [
        { target: '干杯 gānbēi', note: '"dry the cup" — toast; can mean sip or finish depending on context' },
        { target: 'glass-height respect', note: 'juniors lower their glass below the senior\'s rim when clinking — a visible respect signal' },
        { target: '以茶代酒 yǐ chá dài jiǔ', note: '"tea in place of wine"; the standard polite way to toast without drinking alcohol' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '谢茶 — tea-pouring etiquette',
      'xiè chá — tea-pouring etiquette',
      'When someone pours tea for you at a Chinese table, the standard "thank you" is to TAP the table TWICE with two bent fingers — bent index and middle finger, knuckles down — instead of saying 谢谢 out loud. This is called 谢茶 ("thank the tea"). Traces back to a Qing-dynasty story of an emperor incognito; today it\'s the universal Cantonese-table custom and is widely understood across China.',
      'sentence',
      '别人给你倒茶时，用两个手指敲两下桌子。',
      '"When someone pours tea for you, tap the table twice with two fingers"; the silent thank-you.',
      [
        { target: '谢茶 xiè chá', note: 'the finger-tap thank-you for poured tea' },
        { target: '两个手指 liǎng gè shǒuzhǐ', note: 'two bent fingers — index and middle; tapping with one finger is incorrect' },
        { target: 'when to say 谢谢 out loud instead', note: 'in non-tea contexts (someone passes the soy sauce, refills your bowl); 谢茶 is specifically for poured tea' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '不用小费 — no tipping',
      'búyòng xiǎofèi — no tipping',
      'Tipping (小费 xiǎofèi) is NOT standard practice in Mainland China — not at restaurants, taxis, hotels, or salons. Leaving cash on the table can confuse the server; some staff will chase you to return it. Higher-end Western-style places or international hotels may include a service charge (服务费 fúwùfèi, typically 10–15%) on the bill, but no additional tip is expected.',
      'sentence',
      '不用给小费，账单已经包含服务费。',
      '"No need to tip — the bill already includes a service charge"; standard advice for travelers.',
      [
        { target: '小费 xiǎofèi', note: '"tip"; the concept exists as a word but the practice is essentially absent in Mainland' },
        { target: '服务费 fúwùfèi', note: '"service charge"; sometimes added to bills at upscale or hotel restaurants — 10–15% range' },
        { target: 'Hong Kong / Taiwan vary', note: 'tipping norms differ in HK and Taiwan; this rule specifically applies to Mainland Chinese restaurants' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '川菜 vs 粤菜 vs 京菜',
      'chuāncài vs yuècài vs jīngcài',
      'Three of China\'s eight major regional cuisines that you will see on Beijing menus. 川菜 (Sichuan) — bold, numbing-spicy, garlicky; signature dishes 麻婆豆腐, 宫保鸡丁, 鱼香肉丝. 粤菜 (Cantonese) — light, fresh, subtle; signature dishes 烧鹅 roast goose, 点心 dim sum, 白切鸡 white-cut chicken. 京菜 (Beijing) — hearty, wheat-based, often roasted; signature dishes 北京烤鸭, 炸酱面, 涮羊肉 lamb hotpot.',
      'sentence',
      '你喜欢吃辣的话，川菜最好。喜欢清淡，可以试试粤菜。',
      '"If you like spicy, Sichuan is the best. If you prefer light, try Cantonese"; a typical recommendation framework.',
      [
        { target: '川菜 chuāncài', note: 'Sichuan cuisine — defining flavor is 麻辣 (numbing-spicy); not all dishes are spicy but the cuisine is known for it' },
        { target: '粤菜 yuècài', note: 'Cantonese cuisine — light, fresh, emphasizes the natural flavor of ingredients; the home of dim sum' },
        { target: '京菜 jīngcài', note: 'Beijing cuisine — hearty, often wheat-based and roasted; the home of Peking duck' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 五道口星期五晚饭',
      'rènwù: Wǔdàokǒu xīngqīwǔ wǎnfàn',
      'Roleplay a full Friday dinner near Tsinghua with the AI tutor playing both your classmate and the server. Use every skill from this lesson in one continuous scene — choose, sit, order, modify, eat, toast, pay, pack.',
      'conversation',
      '[Wudaokou, 7 PM, two students]\n同学: 今天晚上想吃什么? 我有点儿饿了。\n你: [propose a dish or restaurant using 想 + verb]\n同学: 好啊，我们走!\n[Restaurant, server greets]\n服务员: 欢迎光临，几位?\n你: [answer number + ask for menu]\n服务员: 想点什么?\n你: [direct order with 我要 / 来一份 + at least 2 items + drink]\n你: [polite modification with 能不能 + 一点儿]\n服务员: 没问题。\n[After eating]\n你: [call for the bill + ask to pack leftovers]\n服务员: 一共多少多少块，扫码支付。\n你: [thank the server + farewell to classmate]',
      'Ten-turn fluent exchange; the AI tutor will prompt naturally for each move and respond to whatever you say.',
      [
        { target: '想 + verb (planning)', note: 'use with classmate during the deciding phase; soft preference' },
        { target: '我要 / 来一份 (ordering)', note: 'switch to direct register when speaking to the server' },
        { target: '能不能 + 少/多 + verb + 一点儿', note: 'the polite modification stack — pick at least one to fit your dish' },
        { target: '买单 / 结账', note: 'either word works to call for the check' },
        { target: '打包 + 扫码支付', note: 'standard closing — pack leftovers, pay by QR scan' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 修改订单',
      'tiǎozhàn — xiūgǎi dìngdān',
      'Stretch goal: in the same scene, change your mind mid-order. The dish you wanted has just been ordered by another table and the server says it will take 30 minutes. You need to politely cancel that one and substitute a different dish, keeping the rest of the order.',
      'conversation',
      '服务员: 不好意思，宫保鸡丁要等三十分钟。\n你: [express that\'s too long + propose substitute] 那能不能换一个? 我要鱼香肉丝吧。\n服务员: 好的，鱼香肉丝。其他的不变?\n你: 不变，谢谢。\n服务员: 没问题，菜马上来。',
      'Demonstrates flexible communication under unexpected constraints — a real-world restaurant skill.',
      [
        { target: '换一个 huàn yí gè', note: '"swap one"; the standard verb-phrase for substituting an item' },
        { target: '不变 bú biàn', note: '"unchanged"; confirms the rest of the order stays the same' },
        { target: '马上来 mǎshàng lái', note: '"coming right away"; standard server reassurance after taking an order' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
