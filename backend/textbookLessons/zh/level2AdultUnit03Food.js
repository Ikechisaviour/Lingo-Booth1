// Level 2 (Adult Track) · Unit 3 — 商务宴请与饮食选择 (Business Dining & Food Choices)
// Functions: hosting and attending business meals, regional cuisine awareness,
// negotiating dietary restrictions in a Chinese-business setting, navigating
// the social rituals of banquet seating, ordering, toasting, and declining.
// This Adult-track Level 2 lesson builds on Level 1 Unit 9 (casual ordering),
// pushing the learner from "I'd like the noodles" into the social architecture
// of a Beijing/Shanghai business meal.
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
  orientation: 'zh-l2au3-orientation',
  pronunciation: 'zh-l2au3-pronunciation',
  vocabularyDining: 'zh-l2au3-vocab-dining',
  vocabularyCuisines: 'zh-l2au3-vocab-cuisines',
  vocabularyDiet: 'zh-l2au3-vocab-diet',
  grammarQing: 'zh-l2au3-grammar-qing',
  grammarYouYou: 'zh-l2au3-grammar-you-you',
  grammarBuBu: 'zh-l2au3-grammar-bu-bu',
  reading: 'zh-l2au3-reading',
  listening: 'zh-l2au3-listening',
  writing: 'zh-l2au3-writing',
  culture: 'zh-l2au3-culture',
  task: 'zh-l2au3-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Host a small business dinner in Mandarin — book a private room, order a balanced four-dish meal, and steer the conversation around guests\' dietary restrictions.',
      'Talk about regional Chinese cuisines (川 / 粤 / 鲁 / 苏 / 京) using register-appropriate flavor descriptors so you sound informed rather than touristy.',
      'Handle the toasting ritual (干杯), the host-orders-for-everyone convention, and the polite refusal of more alcohol without losing face on either side.',
    ],
    task: 'Picture yourself at a 川菜 restaurant in Beijing hosting three guests — one vegetarian, one allergic to peanuts. By the end of this lesson you should run the entire dinner in Mandarin, from booking the 包间 to the final 干杯.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in business-dining vocabulary',
    goals: [
      'Pronounce 宴请 (yànqǐng) and 包间 (bāojiān) with clean vowel separation — the -an / -ang and -en / -eng contrasts that signal completely different words.',
      'Apply 不 sandhi correctly through the 不…不… pattern: 不咸不淡 stays as bù xián bù dàn because both following syllables are 2nd and 4th tone, while 不辣 becomes búlà (4th tone trigger).',
      'Hold 干杯 (gānbēi) crisp — both 1st tones, level and high, no rising or falling drift; this is the toast you will say dozens of times in one dinner.',
    ],
    task: 'Read each example aloud, mark every sandhi shift in 不 patterns, and verify your 干杯 stays flat and steady across both syllables.',
  },
  {
    id: ACT.vocabularyDining,
    section: 'Vocabulary I',
    title: 'Banquet, courses, and the structure of a Chinese meal',
    goals: [
      'Memorize the 14 nouns that name the structure of a Chinese business meal — 宴请, 请客, 包间, 主菜, 凉菜, 主食, 点心, and their typical order of appearance.',
      'Distinguish 请客 (informal "I\'m treating") from 宴请 (formal banquet hosting) so your offer to pay matches the social weight of the meal.',
    ],
    task: 'Say each term out loud with the correct tones, then sketch the typical sequence of dishes at a 10-person business dinner.',
  },
  {
    id: ACT.vocabularyCuisines,
    section: 'Vocabulary II',
    title: 'The eight great cuisines — flavor profiles and stock dishes',
    goals: [
      'Place the 5 most common business-dinner cuisines (川 Sichuan, 粤 Cantonese, 鲁 Shandong, 苏 Jiangsu, 京 Beijing) on a flavor map — spicy vs mild, salty vs sweet-savory.',
      'Name one or two signature dishes from each so you can suggest a cuisine to suit your guests\' palates rather than defaulting to whatever the host knows.',
    ],
    task: 'For each cuisine, say its flavor profile in one Mandarin sentence and name a signature dish — e.g., 川菜很辣，比如麻婆豆腐.',
  },
  {
    id: ACT.vocabularyDiet,
    section: 'Vocabulary III',
    title: 'Dietary needs, allergies, and drink negotiation',
    goals: [
      'State dietary restrictions politely in a business setting — 吃素, 不吃辣, 过敏, 忌口 — without making the host feel awkward.',
      'Name the four drinks at the table (白酒, 红酒, 啤酒, 茶) and decline more alcohol gracefully with 实在不能再喝了 or 我开车，喝茶就好.',
    ],
    task: 'List your own restrictions in two short sentences, then practice declining a third toast of 白酒 in a face-saving way.',
  },
  {
    id: ACT.grammarQing,
    section: 'Grammar I',
    title: '请 X V — polite request and "treat someone to V"',
    goals: [
      'Use 请 + person + verb to politely ask someone to do something: 请王经理点菜 ("Please, Manager Wang, order the dishes").',
      'Use the same 请 + person + verb pattern to mean "treat someone to V": 我请您吃饭 ("I\'ll treat you to dinner") — context distinguishes "ask" from "treat".',
      'Know that 请 NEVER means "please" as a sentence-final tag in Mandarin — it always sits before the verb it governs.',
    ],
    task: 'Write three 请 sentences — one polite request, one "treat-someone" offer, one host\'s invitation to a guest — and read each aloud.',
  },
  {
    id: ACT.grammarYouYou,
    section: 'Grammar II',
    title: '又…又… — describing dishes and restaurants with paired qualities',
    goals: [
      'Use 又 A 又 B to attribute two simultaneous qualities to one subject: 这道菜又香又辣 ("This dish is both fragrant AND spicy").',
      'Apply 又…又… across positive AND negative pairs: 又便宜又好吃 (positive: cheap and tasty), 又咸又油 (negative: salty and greasy).',
      'Recognize that 又…又… requires two equally weighted descriptors — not "X and also Y" but "X AND Y, both true at once".',
    ],
    task: 'Describe three dishes and one restaurant using 又…又… — one all-positive, one all-negative, one mixed.',
  },
  {
    id: ACT.grammarBuBu,
    section: 'Grammar III',
    title: '不…不… — emphatic "neither too X nor too Y, just right"',
    goals: [
      'Use the 不 A 不 B pattern with antonym pairs to mean "neither too A nor too B" — 不咸不淡 ("neither too salty nor too bland"), 不冷不热 ("neither too cold nor too hot").',
      'Combine 不…不… with 正好 (zhènghǎo, "just right") for the canonical positive judgment: 这道菜不咸不淡，正好.',
      'Apply 不 sandhi carefully in this pattern: 不咸 (bù + 2nd → no sandhi, stays bù) 不淡 (bù + 4th → bú, rises), so the spoken form is bù xián bú dàn — sandhi happens on the second 不, not the first.',
    ],
    task: 'Write three 不…不… judgments using salty/bland, cold/hot, and big/small antonym pairs, marking each 不 with its actual spoken tone.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a business-dinner restaurant review',
    goals: [
      'Read a 4-sentence review of a Beijing 川菜 restaurant aloud with correct tones, sandhi, and natural rhythm.',
      'Identify the grammar features used — 又…又…, 不…不…, 请 patterns — and answer four comprehension questions in short Mandarin sentences.',
    ],
    task: 'Read the review below, then answer the four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Booking a private room over the phone',
    goals: [
      'Follow a 6-turn phone dialogue between a host and a restaurant reservations clerk — covering 包间 booking, headcount, dietary restrictions, and confirmation.',
      'Reproduce the dialogue with your own headcount and restrictions, swapping in the relevant phrases naturally.',
    ],
    task: 'Read the polite dialogue along with the tutor first, then perform it again with three of your own guests and at least one dietary restriction.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write a guest-briefing memo before the dinner',
    goals: [
      'Write 4–5 sentences in Hanzi briefing your team on the dinner: restaurant name, cuisine, time, headcount, and a summary of each guest\'s dietary restrictions.',
      'Use 请 at least twice and 又…又… or 不…不… at least once so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Draft a pre-dinner memo for your three colleagues hosting a 川菜 dinner for visiting partners; use the model on the left, then read it aloud.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '干杯 hierarchy, 主陪/副陪 seating, and never tipping',
    goals: [
      'Apply the 干杯 hierarchy: when clinking with someone senior to you, your glass rim sits BELOW theirs — a silent visual marker of respect tied to face (面子).',
      'Recognize the 主陪/副陪 seating ritual: the host (主陪) faces the door from the head of the round table; the co-host (副陪) sits opposite; the senior guest sits to the host\'s right.',
      'Know that the host orders for the entire table — guests do not pick their own dishes — and that tipping is not practiced in mainland China (don\'t tip, don\'t apologize for not tipping).',
    ],
    task: 'For a 10-person business dinner with one senior guest, two colleagues, and six clients, draw the seating chart and identify who clinks lowest at the first 干杯.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Host a 川菜 business dinner in Beijing',
    goals: [
      'Combine every skill from this lesson into one continuous scene: book the 包间, order four balanced dishes (one cold, one main, one vegetable, one soup) accounting for two restrictions, propose the first toast, and close the meal.',
      'Maintain register correctly throughout: 您 for guests, careful pacing with 请 patterns, and a polite refusal of a fourth 干杯 using 实在不能再喝了.',
    ],
    task: 'Roleplay the entire business dinner with the tutor playing first the restaurant clerk, then the visiting senior guest; aim for a 10–12 turn exchange with no English fallback.',
  },
];

const lesson = {
  title: 'Level 2 · Adult Unit 3: 商务宴请 — Business Dining & Food Choices',
  category: 'food',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'hosting-banquet', label: 'Hosting a business banquet', goal: 'Open and close a business dinner — invite, seat, order, toast, settle — in the right register for guests senior to you.' },
    { id: 'declining-alcohol', label: 'Politely declining more alcohol', goal: 'Use 实在不能再喝了 or a face-saving alternative (我开车 / 我对酒过敏) without offending the host.' },
    { id: 'stating-restriction', label: 'Stating a dietary restriction at the table', goal: 'Use 我吃素 / 我不吃辣 / 我对…过敏 in a way that does not derail the meal or embarrass the host.' },
    { id: 'requesting-modification', label: 'Asking for a dish to be modified', goal: 'Use 麻烦您…不要放… or 能不能少放点…? to request adjustments politely from the server.' },
  ],
  relatedPools: ['topic-food', 'topic-workplace'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson you can host a small Chinese business dinner end-to-end — book a private room, order a balanced four-dish meal, accommodate dietary restrictions, lead the toasts, and close the bill — all in Mandarin and in the right register.',
      'word',
      'Functions: 宴请 yànqǐng (host a banquet) · 点菜 diǎncài (order the dishes) · 敬酒 jìngjiǔ (offer a toast) · 忌口 jìkǒu (state dietary restrictions) · 买单 mǎidān (settle the bill)',
      'These five micro-skills are the spine of every Chinese business meal — once they are automatic, the social side of doing business in China stops being an obstacle.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are hosting three visiting partners at a 川菜 restaurant in Beijing. One of them is vegetarian, one is allergic to peanuts, and the senior guest expects you to take charge of ordering and toasting. The dinner runs about 90 minutes and you will need every skill from this lesson.',
      'word',
      '场景: 北京 · 川菜馆包间 · 4 人 · 1 位素食者 · 1 位花生过敏 · 1 位贵宾',
      'A typical small business dinner in mainland China — small enough that the host (you) is visible, formal enough that mistakes in seating or toasting register immediately.',
      [
        { target: '川菜馆 chuāncàiguǎn', note: 'Sichuan-cuisine restaurant; a common choice for Beijing business dinners because the bold flavors signal hospitality without being too rich' },
        { target: '包间 bāojiān', note: 'private dining room — booked separately and essential for business meals where confidentiality and undisturbed conversation matter' },
        { target: '贵宾 guìbīn', note: 'honored guest; the highest-ranking person at the table whose seating and toasting order anchors the rest of the meal' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三种饭局等级',
      'sān zhǒng fànjú děngjí',
      'Chinese business meals roughly split into three registers. Casual (便饭 biànfàn): peers, weeknight, no private room, split bill. Polite (请客 qǐngkè): one-side treats, mid-range restaurant, ordering for the table. Formal (宴请 yànqǐng): hosting partners or seniors, private room, 8+ dishes, formal toasts, host pays without discussion.',
      'word',
      '便饭 biànfàn (casual) / 请客 qǐngkè (polite) / 宴请 yànqǐng (formal) — same eating function, three different social weights.',
      'Misreading the register costs you face: a 宴请 treated as a 便饭 looks stingy; a 便饭 hosted as a 宴请 looks pretentious. The senior person\'s presence is the clearest signal.',
      [
        { target: 'CASUAL: 便饭 biànfàn', note: 'casual meal among peers; no formal toasts, often split bill (AA制) or simple "I got this next time" rotation' },
        { target: 'POLITE: 请客 qǐngkè', note: 'one party treats; mid-range restaurant; the host orders but with input from guests; common for clients, colleagues, friends' },
        { target: 'FORMAL: 宴请 yànqǐng', note: 'banquet hosting; private room, multiple courses, formal toasts and seating order; reserved for partners, seniors, ceremonies' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '宴请',
      'yànqǐng',
      'Two key sound features: 宴 (yàn) is a fourth-tone -an final with the tongue tip on the alveolar ridge, NOT -ang. 请 (qǐng) starts with the palatal initial q- (NOT English /kw/) and ends in -ing (back of tongue on soft palate). Mis-pronouncing 请 as "kwing" is a giveaway non-native marker.',
      'word',
      '王经理今晚宴请客户。 Wáng jīnglǐ jīnwǎn yànqǐng kèhù.',
      'Manager Wang is hosting clients tonight at a banquet — appears constantly in business contexts; the formal hosting verb you want to be heard saying correctly.',
      [
        { target: '宴 yàn (4th, -an)', note: 'fourth tone, sharp fall; -an means tongue tip on the upper gum ridge, like English "yen" not "yang"' },
        { target: '请 qǐng (3rd, palatal q-)', note: 'third tone; q- is the aspirated palatal — tongue flat behind the lower teeth, NOT English /kw/' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '包间',
      'bāojiān',
      'Both syllables are first tone, held high and level — no rise or fall on either. 包 (bāo) is a clean bilabial b- + ao diphthong; 间 (jiān) has the palatal j- (same series as q-/x-) + -an final. The whole word should sound flat and steady, like singing one held note across two syllables.',
      'word',
      '请帮我订一个安静的包间。 Qǐng bāng wǒ dìng yí ge ānjìng de bāojiān.',
      'Please book me a quiet private room — the standard reservation request; appears in every business-dinner phone call.',
      [
        { target: '包 bāo (1st)', note: 'first tone — held high and level; b- is unaspirated, no puff of air' },
        { target: '间 jiān (1st)', note: 'first tone; j- is palatal (NOT English "j"); -an is alveolar nasal' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '干杯',
      'gānbēi',
      'The toast you will say dozens of times in one dinner. Both syllables are first tone — held high and level across the whole word, NO drift down on 杯. The b- is unaspirated (no puff); the -an in 干 has the alveolar nasal ending (tongue tip on upper gum ridge). Saying "gàn bèi" (4th-4th) sounds aggressive and confusing.',
      'word',
      '为合作干杯! Wèi hézuò gānbēi!',
      'To our cooperation, cheers! — a standard business-dinner first toast; the host or senior person initiates with the reason for the toast then the word 干杯.',
      [
        { target: '干 gān (1st)', note: 'first tone, level high; unrelated to the homograph 干 (gàn, 4th) meaning "to do" — the toasting one is always 1st tone' },
        { target: '杯 bēi (1st)', note: 'first tone, level high; -ei is mid-front diphthong like English "bay" without the closing y-glide' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '不咸不淡',
      'bù xián bú dàn (spoken)',
      'A sandhi trap inside the 不…不… pattern. 不 + 咸 (xián, 2nd tone): 不 stays as bù (no sandhi, only changes before 4th tone). 不 + 淡 (dàn, 4th tone): 不 becomes bú (rising). So written bù xián bù dàn, spoken bù xián bú dàn — first 不 stays, second 不 rises. Most learners get this backwards.',
      'word',
      '这道菜不咸不淡，正好。 Zhè dào cài bù xián bú dàn, zhènghǎo.',
      'This dish is neither too salty nor too bland — just right. The canonical positive judgment of seasoning balance, appears in every Chinese food review.',
      [
        { target: '不 + 2nd (咸 xián) → bù (no sandhi)', note: 'the sandhi rule fires ONLY before fourth tone; here 咸 is rising, so 不 keeps its full fourth tone' },
        { target: '不 + 4th (淡 dàn) → bú (rises)', note: 'classic 不 sandhi: shifts to second tone before any fourth-tone syllable, so 不淡 sounds like búdàn' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '又香又辣',
      'yòu xiāng yòu là',
      'A 又…又… pattern with no sandhi anywhere — 又 (yòu) is fourth tone, but the syllables that follow (香 xiāng 1st, 辣 là 4th) do not trigger any tone change on 又 itself. The rhythm is STRONG-strong-STRONG-strong: two stressed 又 syllables framing the two descriptors. Hear the parallelism — it is the whole point of the pattern.',
      'word',
      '麻婆豆腐又香又辣。 Mápó dòufu yòu xiāng yòu là.',
      'Mapo tofu is both fragrant and spicy — the canonical positive 又…又… judgment of 川菜.',
      [
        { target: '又 yòu (4th)', note: 'fourth tone, sharp falling; both occurrences must be equally stressed' },
        { target: 'parallel rhythm', note: 'STRONG-strong-STRONG-strong; the parallelism is what makes the pattern recognizable as an idiom rather than a list' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Banquet structure
    // ────────────────────────────────────────────────────────────────────
    createContentItem('宴请', 'yànqǐng', 'To formally host a banquet; the verb used when the meal is a deliberate social event (not just dinner). Reserved for hosting partners, senior officials, or marking an occasion — never used for casual peer meals.', 'word', '我们公司今晚宴请韩国客户。', 'Our company is hosting Korean clients at a banquet tonight — typical workplace context for the verb.', null, [ACT.vocabularyDining]),
    createContentItem('请客', 'qǐngkè', 'To treat someone (informally pay for their meal); literally "invite-guest". Less formal than 宴请 — works for treating a colleague to lunch, a friend to dinner, or a small client meal. The default phrase when you offer to pay.', 'word', '今天我请客，你们随便点。', 'I\'m treating today — order whatever you like; the host\'s standard opener when offering to pay.', null, [ACT.vocabularyDining]),
    createContentItem('包间', 'bāojiān', 'Private dining room. Standard for business meals — provides confidentiality, undisturbed conversation, and signals that the meal is intentional. Most mid-to-upscale Chinese restaurants have multiple 包间 of different sizes; reservations specify headcount and minimum spend (低消 dīxiāo).', 'word', '我们订一个十人的包间。', 'We\'ll book a ten-person private room — typical reservation request.', null, [ACT.vocabularyDining]),
    createContentItem('点菜', 'diǎncài', 'To order dishes (literally "point-dish"). In business dinners, the host does the 点菜 for everyone, often after consulting the senior guest with a polite "您看…" (nín kàn, "what do you think…"). Guests do NOT typically order their own.', 'word', '请王经理点菜。', 'Please, Manager Wang, order the dishes — a polite deferral to a senior person who, by convention, will defer back to the host.', null, [ACT.vocabularyDining]),
    createContentItem('菜单', 'càidān', 'Menu. In a 包间, the server hands the menu to the host (主陪), not to whoever is closest. If you are seated as a guest and the menu lands in front of you, gracefully pass it to the host.', 'word', '麻烦给我们一份菜单。', 'Could we have a menu, please — standard polite request to the server.', null, [ACT.vocabularyDining]),
    createContentItem('主菜', 'zhǔcài', 'Main course / main dish. A balanced Chinese meal has one or more 主菜 (often featuring meat or seafood) plus supporting dishes. The 主菜 is usually the dish the restaurant is known for and the host orders it first.', 'word', '今天的主菜是水煮鱼。', 'Today\'s main is boiled fish in chili oil — typical 川菜 signature offered as 主菜.', null, [ACT.vocabularyDining]),
    createContentItem('凉菜', 'liángcài', 'Cold appetizer dishes; the first dishes brought out, designed to be picked at while guests settle in and the hot dishes are being prepared. Common examples: 拍黄瓜 (smashed cucumber), 凉拌木耳 (cold wood-ear fungus), 口水鸡 (mouth-watering chicken).', 'word', '先上几个凉菜。', 'Let\'s start with a few cold dishes — host\'s typical opening order instruction.', null, [ACT.vocabularyDining]),
    createContentItem('热菜', 'rècài', 'Hot main dishes; brought out after the 凉菜 and before the 主食. The bulk of a Chinese meal lives here — vegetables, seafood, meat dishes — usually 4–8 hot dishes for a 4-person table.', 'word', '热菜什么时候上?', 'When will the hot dishes come out? — common question if the kitchen is slow.', null, [ACT.vocabularyDining]),
    createContentItem('主食', 'zhǔshí', 'Staple food — rice (米饭), noodles (面条), or steamed buns (馒头/包子). Brought out near the END of a Chinese meal, after the main dishes; this is opposite of Western convention where bread comes first.', 'word', '主食要米饭还是面条?', 'For staples, would you like rice or noodles? — server\'s standard near-end-of-meal check.', null, [ACT.vocabularyDining]),
    createContentItem('汤', 'tāng', 'Soup. Typically served NEAR THE END of a Chinese meal, between the main dishes and the staple — opposite of Western order. Common business-dinner choices: 酸辣汤 (hot and sour), 西红柿鸡蛋汤 (tomato-egg, mild).', 'word', '最后来一道酸辣汤。', 'Finish with a hot and sour soup — typical end-of-meal order.', null, [ACT.vocabularyDining]),
    createContentItem('点心', 'diǎnxin', 'Dim sum / small bites — small steamed or fried items. In Cantonese yum cha tradition these are the whole meal; in northern business dinners they are dessert-equivalent at the end. Includes 春卷 (spring roll), 烧麦 (shumai), 虾饺 (har gow).', 'word', '吃完热菜来点点心。', 'After the hot dishes, let\'s have some dim sum — common closer at a Cantonese-influenced meal.', null, [ACT.vocabularyDining]),
    createContentItem('甜点', 'tiándiǎn', 'Dessert / sweet course — increasingly common at modern Chinese business meals influenced by Western convention. Traditional Chinese meals end with fruit or 点心 rather than a sweet dessert; younger urban professionals often add a 甜点.', 'word', '甜点要不要冰淇淋?', 'Would you like ice cream for dessert? — modern business-dinner option.', null, [ACT.vocabularyDining]),
    createContentItem('买单', 'mǎidān', 'To settle the bill (literally "buy-list"). At a business dinner the host pays — usually by stepping away to the front desk before the meal ends, so the bill never appears at the table. Asking for the bill in front of guests would create awkwardness.', 'word', '我去买单，你们继续聊。', 'I\'ll go settle the bill — you all keep chatting; the host\'s discreet exit line.', null, [ACT.vocabularyDining]),
    createContentItem('结账', 'jiézhàng', 'To check out / close the bill — interchangeable with 买单 in most contexts, slightly more formal-sounding. Used when calling the server to bring the bill: 服务员，结账! (waiter, the bill!).', 'word', '服务员，麻烦结账。', 'Server, the bill please — polite version with 麻烦 (méfan, "trouble you").', null, [ACT.vocabularyDining]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Regional cuisines
    // ────────────────────────────────────────────────────────────────────
    createContentItem('川菜', 'chuāncài', 'Sichuan cuisine. Bold, spicy, numbing-hot — built on 麻 (má, tongue-numbing 花椒 Sichuan peppercorn) and 辣 (là, chili heat). High-status choice for business dinners because the flavors are unmistakable and the regional identity is strong; signals you are not playing safe.', 'word', '川菜以麻辣闻名。', 'Sichuan cuisine is famous for its numbing-spicy flavor — the canonical descriptor.', null, [ACT.vocabularyCuisines]),
    createContentItem('粤菜', 'yuècài', 'Cantonese cuisine. Mild, fresh, light — focuses on the natural flavor of high-quality ingredients with minimal seasoning. Common safe choice when hosting guests with unknown spice tolerance or international clients; signature dishes: 白切鸡 (white-cut chicken), 蜜汁叉烧 (honey char siu), 早茶 (yum cha dim sum).', 'word', '粤菜清淡，比较适合外国客人。', 'Cantonese is mild, more suitable for foreign guests — typical hosting reasoning.', null, [ACT.vocabularyCuisines]),
    createContentItem('鲁菜', 'lǔcài', 'Shandong cuisine. Salty, savory, hearty — strong use of soy sauce, scallions, and seafood from the coast. Considered the "ancestor" of northern Chinese imperial cuisine; signature dishes: 糖醋鲤鱼 (sweet-and-sour carp), 葱烧海参 (scallion sea cucumber). Slightly heavier than Cantonese, often paired with 白酒.', 'word', '鲁菜偏咸，下酒很好。', 'Shandong is on the salty side, great with 白酒 — typical pairing logic.', null, [ACT.vocabularyCuisines]),
    createContentItem('苏菜', 'sūcài', 'Jiangsu cuisine. Sweet-savory balance, delicate knife work, refined presentation — historically the imperial capital cuisine. Higher-end restaurants in Shanghai often serve 苏菜 or its closely related cousin 淮扬菜 (Huaiyang); signature dishes: 松鼠桂鱼 (squirrel-shape mandarin fish), 狮子头 (lion\'s-head meatballs).', 'word', '苏菜又精致又有点甜。', 'Jiangsu cuisine is both refined and slightly sweet — a typical 又…又… description.', null, [ACT.vocabularyCuisines]),
    createContentItem('京菜', 'jīngcài', 'Beijing cuisine. Imperial heritage, rich, often roasted — built around 北京烤鸭 (Peking duck) as its flagship. Less spicy than 川菜, more savory than 粤菜; signature dishes: 烤鸭, 炸酱面 (zhajiangmian), 涮羊肉 (lamb hotpot). The standard hosting choice in Beijing when showing the city itself.', 'word', '来北京一定要吃烤鸭。', 'You must eat roast duck when you visit Beijing — the canonical Beijing hosting line.', null, [ACT.vocabularyCuisines]),
    createContentItem('麻辣', 'málà', 'Numbing-spicy — the signature flavor profile of 川菜. 麻 (má) is the tingling, mouth-numbing sensation from 花椒 (Sichuan peppercorn); 辣 (là) is conventional chili heat. The combination is what makes 川菜 distinctive — chili alone is not 麻辣.', 'word', '这家麻辣火锅很正宗。', 'This 麻辣 hotpot place is very authentic — typical recommendation phrasing.', null, [ACT.vocabularyCuisines]),
    createContentItem('清淡', 'qīngdàn', 'Light / mild / un-seasoned. The opposite of 重口味 (zhòng kǒuwèi, "heavy flavors"). 粤菜 and 苏菜 are described as 清淡; 川菜 and 鲁菜 are NOT. When hosting guests with unknown preferences, asking 喜欢清淡还是重口味? (do you prefer light or heavy flavors?) is the safe diplomatic move.', 'word', '我口味比较清淡。', 'I prefer mild flavors — a polite way to signal lower spice tolerance.', null, [ACT.vocabularyCuisines]),
    createContentItem('麻婆豆腐', 'mápó dòufu', '"Pockmarked Old-Lady\'s Tofu" — the signature 川菜 dish; soft tofu in a 麻辣 sauce with minced pork (or vegetarian alternative). Named after the 19th-century proprietress; appears on essentially every 川菜 menu.', 'word', '来一份麻婆豆腐。', 'One order of mapo tofu — standard 川菜 order; vegetarian version usually available on request.', null, [ACT.vocabularyCuisines]),
    createContentItem('北京烤鸭', 'Běijīng kǎoyā', 'Peking duck — the canonical Beijing dish; whole duck roasted until skin crackles, sliced tableside and wrapped in thin pancakes with scallion, cucumber, and sweet bean sauce. The flagship hosting choice when showing visitors Beijing.', 'word', '今晚我们请大家吃烤鸭。', 'Tonight we\'re treating everyone to roast duck — typical host\'s grand gesture.', null, [ACT.vocabularyCuisines]),
    createContentItem('小笼包', 'xiǎolóngbāo', 'Shanghai-style soup dumplings; thin-skinned with hot broth inside. The signature dim sum-adjacent item of 沪菜 (Shanghai-area cuisine); served at lunchtime business meals more often than dinners.', 'word', '上海的小笼包又鲜又香。', 'Shanghai\'s soup dumplings are both fresh and fragrant — a typical 又…又… review.', null, [ACT.vocabularyCuisines]),
    createContentItem('水煮鱼', 'shuǐzhǔyú', '"Water-boiled fish" — despite the name, this 川菜 signature is fish fillets in a sea of chili oil and 花椒. Extremely 麻辣; do not order if your guests cannot handle spice. Visually dramatic, often a crowd-pleaser when the table can take the heat.', 'word', '这道水煮鱼特别辣。', 'This boiled-fish dish is especially spicy — typical warning.', null, [ACT.vocabularyCuisines]),
    createContentItem('宫保鸡丁', 'gōngbǎo jīdīng', 'Kung Pao chicken — 川菜 classic; diced chicken stir-fried with peanuts, dried chilies, and 花椒. Note: ALWAYS contains peanuts — flag this immediately if any guest has a peanut allergy.', 'word', '宫保鸡丁里有花生，您过敏吗?', 'Kung Pao has peanuts in it — are you allergic? — the responsible host\'s check before ordering.', null, [ACT.vocabularyCuisines]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Vocabulary III: Diet, allergies, drinks
    // ────────────────────────────────────────────────────────────────────
    createContentItem('吃素', 'chīsù', 'To be vegetarian (literally "eat-plain"). The standard term for stating vegetarianism. Note that traditional Chinese vegetarianism (often Buddhist 吃斋 chīzhāi) excludes garlic, scallion, and onion as well — modern usage usually just means no meat or seafood unless 严格吃素 (yángé chīsù, strictly vegetarian) is specified.', 'word', '我吃素，不吃肉也不吃海鲜。', 'I\'m vegetarian — I don\'t eat meat or seafood; the clear modern statement.', null, [ACT.vocabularyDiet]),
    createContentItem('素食者', 'sùshízhě', 'A vegetarian (the noun form). More formal than 吃素 — appears on menus and in restaurant policy phrasing: 本店为素食者提供素菜单 ("this restaurant offers a vegetarian menu for vegetarians").', 'word', '我是素食者。', 'I am a vegetarian — formal self-identification, useful when asked your dietary preferences.', null, [ACT.vocabularyDiet]),
    createContentItem('不吃辣', 'bù chī là', 'Don\'t eat spicy / can\'t handle spice. Standard polite statement — appears constantly when hosting at 川菜 or 湘菜 (Hunan) restaurants. Less embarrassing than 我怕辣 (wǒ pà là, "I\'m afraid of spice") which sounds childish.', 'word', '我不吃辣，麻烦少放辣椒。', 'I don\'t eat spicy — please go light on the chili; polite restriction + modification request.', null, [ACT.vocabularyDiet]),
    createContentItem('过敏', 'guòmǐn', 'To be allergic / an allergy. Pattern: 对 X 过敏 (duì X guòmǐn) = "allergic to X". Used for any allergy from food to pollen to medication. Stating 过敏 explicitly signals seriousness — the host should remove the offending ingredient entirely, not just reduce it.', 'word', '我对花生过敏。', 'I\'m allergic to peanuts — the canonical statement; 对…过敏 is the fixed pattern.', null, [ACT.vocabularyDiet]),
    createContentItem('忌口', 'jìkǒu', 'Dietary restrictions / things to avoid (literally "avoid-mouth"). A general-purpose term covering allergies, preferences, religious avoidance, and traditional Chinese medicine "incompatible foods". The polite host\'s question: 您有什么忌口吗? ("do you have any dietary restrictions?").', 'word', '您有什么忌口吗?', 'Do you have any dietary restrictions? — standard host opening question; collects all restriction types in one ask.', null, [ACT.vocabularyDiet]),
    createContentItem('花生', 'huāshēng', 'Peanut. Note that 花生 appears in many 川菜 dishes (宫保鸡丁, 麻辣花生) and in many sauces — a peanut allergy in a 川菜 restaurant requires careful menu checking with the server. Some Cantonese desserts also contain peanut.', 'word', '这道菜里有花生吗?', 'Are there peanuts in this dish? — the responsible question if any guest has a peanut allergy.', null, [ACT.vocabularyDiet]),
    createContentItem('海鲜', 'hǎixiān', 'Seafood (general term). Distinguishes from 鱼 (yú, fish specifically). Allergy phrasing: 我对海鲜过敏 ("I\'m allergic to seafood"). Common restriction at coastal-cuisine restaurants like 粤菜 or 鲁菜.', 'word', '我对海鲜过敏，海鲜的菜都不能吃。', 'I\'m allergic to seafood — I can\'t eat any seafood dishes; full statement.', null, [ACT.vocabularyDiet]),
    createContentItem('白酒', 'báijiǔ', 'Chinese grain liquor — clear, strong (38–53% alcohol), the canonical business-dinner toast drink. Brands like 茅台 (Moutai) and 五粮液 (Wuliangye) are status markers. Drunk in small cups (酒盅), always toasted, never sipped slowly. Refusing entirely requires a clear medical or driving reason.', 'word', '今晚我们喝茅台。', 'Tonight we\'re drinking Moutai — host\'s status-signaling drink choice for an important meal.', null, [ACT.vocabularyDiet]),
    createContentItem('红酒', 'hóngjiǔ', 'Wine (literally "red wine", but the term often covers white wine 白葡萄酒 by extension in casual usage). Increasingly common at modern Chinese business dinners, especially with Western or younger Chinese partners. Less ceremonial than 白酒 — sipped, not toasted in shots.', 'word', '不喝白酒的话，我们可以喝红酒。', 'If you don\'t drink baijiu, we can have wine — host\'s alternative offer.', null, [ACT.vocabularyDiet]),
    createContentItem('啤酒', 'píjiǔ', 'Beer. The most casual of the four standard business-dinner drinks; common at peer-level 便饭 or 请客, less common at formal 宴请 unless specifically a beer-focused meal (e.g., 青岛 Qingdao beer-and-seafood dinner).', 'word', '来两瓶啤酒。', 'Bring two bottles of beer — peer-level dining order.', null, [ACT.vocabularyDiet]),
    createContentItem('茶', 'chá', 'Tea — universally provided at any Chinese meal, often free at restaurants. Common business-meal teas: 龙井 (Longjing), 普洱 (Pu\'er), 铁观音 (Tieguanyin). Drinking tea instead of alcohol is a face-saving way to decline drinking — pair with 我开车 (I\'m driving) or a medical reason.', 'word', '我开车，喝茶就好。', 'I\'m driving, tea is fine — the canonical face-saving decline of alcohol.', null, [ACT.vocabularyDiet]),
    createContentItem('实在不能再喝了', 'shízài bù néng zài hē le', 'I really can\'t drink any more — the polite firm refusal of a fourth or fifth toast. Three softeners working together: 实在 (genuinely / really), 不能 (cannot), 再 (any more). Stronger than 我喝不下了 (wǒ hē bu xià le, "I can\'t fit more in") but still face-saving for the host who keeps offering.', 'word', '不好意思，我实在不能再喝了。', 'Sorry, I really can\'t drink any more — full polite refusal opener; the apology + softeners are essential.', null, [ACT.vocabularyDiet]),
    createContentItem('干杯', 'gānbēi', 'Cheers! (literally "dry-cup"). Strict reading is "drain the glass", relaxed reading is just "cheers, take a drink". The strict version still applies with 白酒 in small cups; with beer or wine, drinking 一口 (one mouthful) is acceptable. Glass-rim height encodes hierarchy — see Culture Note.', 'word', '为合作干杯! 干!', 'To our cooperation, cheers! Bottoms up! — typical first-toast format; the second 干 punctuates the moment of drinking.', null, [ACT.vocabularyDiet]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar I: 请 X V
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '请 X V — polite request',
      'qǐng X V — polite request',
      'Use 请 + person + verb to politely ASK someone to do something. 请 sits BEFORE the person (subject) of the requested action — NEVER as a sentence-final tag the way English "please" can. The person can be omitted when context is clear: 请坐 ("please sit").',
      'sentence',
      '请王经理点菜。 ("Please, Manager Wang, order the dishes.")',
      'A deferential request directed at a senior person — the host typically uses this to invite the senior guest to do the symbolic ordering.',
      [
        { target: '请 + person + V', note: 'fixed word order; 请 first, person second, verb last — never reorder' },
        { target: '请坐 / 请进', note: 'person dropped; "please sit" / "please come in" — when context makes the subject obvious' },
        { target: '请慢用', note: 'set phrase server uses: "please enjoy slowly"; signals dishes are ready' },
      ],
      [ACT.grammarQing],
    ),
    createContentItem(
      '请 X V — treat someone',
      'qǐng X V — treat someone',
      'SAME 请 + person + verb structure also means "TREAT someone to V" — context distinguishes "ask" from "treat". 请客 ("treat-guest") is the bare noun form; 请您吃饭 ("treat you to a meal") is the verb-phrase form. The implication is always that the speaker pays.',
      'sentence',
      '今晚我请您吃饭。 ("Tonight I\'ll treat you to dinner.")',
      'The standard hosting offer; appears in every business-dinner invitation.',
      [
        { target: '请 + person + 吃 + meal', note: '"treat someone to a meal"; common pattern with 吃饭, 吃晚饭, 喝酒, 喝咖啡' },
        { target: '请客', note: 'noun-form "treat someone / pay for a meal"; e.g., 这次我请客 = "this time I\'m paying"' },
        { target: 'context distinguishes', note: '请王经理点菜 = "ask Manager Wang to order"; 我请王经理吃饭 = "I\'m treating Manager Wang to dinner"' },
      ],
      [ACT.grammarQing],
    ),
    createContentItem(
      '请 vs 麻烦',
      'qǐng vs máfan',
      '请 (qǐng, "please") and 麻烦 (máfan, "trouble you to") are both polite request openers, but with different feels. 请 is the all-purpose polite request; 麻烦 adds an acknowledgment that you are imposing — slightly more deferential, common in customer-server requests. 麻烦 also takes a verb directly: 麻烦您加一双筷子.',
      'sentence',
      '请给我们一份菜单。/ 麻烦您给我们一份菜单。',
      'Both mean "please give us a menu", but 麻烦 sounds more apologetic; use it when the request is non-trivial or repeated.',
      [
        { target: '请 + V', note: 'default polite request; works in nearly every register' },
        { target: '麻烦您 + V', note: 'adds "trouble you to…"; slightly more deferential, common with servers and strangers' },
        { target: '不好意思 + request', note: 'even softer: "excuse me, sorry to bother"; common before any request to a stranger' },
      ],
      [ACT.grammarQing],
    ),
    createContentItem(
      '请 NOT sentence-final',
      'qǐng NOT sentence-final',
      'CRITICAL: 请 NEVER tags onto the end of a sentence the way English "please" does. ✗ "Give me a menu, please" → ✗ "给我一份菜单，请。" is wrong. ✓ "请给我一份菜单。" is right. The polite particle 请 must lead the verb phrase it governs.',
      'sentence',
      'WRONG: 给我一份菜单，请。\nRIGHT: 请给我一份菜单。 / 麻烦给我一份菜单。',
      'A very common English-speaker error; learners reach for 请 at the end out of habit. Position it first instead.',
      [
        { target: '请 (sentence-initial only)', note: 'must precede the verb it governs; never tags onto the end' },
        { target: 'compare 谢谢', note: '谢谢 CAN go at the end ("Give me a menu, thanks") because it is a discourse marker, not a verb-governing particle' },
      ],
      [ACT.grammarQing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar II: 又…又…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '又 A 又 B',
      'yòu A yòu B — both A and B',
      'Pattern: 又 + adjective/verb + 又 + adjective/verb = "both A AND B (simultaneously)". Both 又 syllables are stressed; the descriptors A and B must be SAME-CATEGORY (two adjectives, two stative verbs) and EQUALLY WEIGHTED. The pattern asserts that both qualities are fully present at the same time — not "X and also Y" but "X and B, both true".',
      'sentence',
      '这道菜又香又辣。 ("This dish is both fragrant AND spicy.")',
      'The canonical positive judgment of a flavorful dish; appears in every Chinese food review.',
      [
        { target: '又 (1st instance)', note: 'introduces the first descriptor; stressed' },
        { target: '又 (2nd instance)', note: 'introduces the second descriptor; equally stressed; the parallel structure is what creates the idiom' },
        { target: 'same-category descriptors', note: 'both must be adjectives or both stative verbs; mixing categories (又便宜又喜欢) sounds wrong' },
      ],
      [ACT.grammarYouYou],
    ),
    createContentItem(
      '又…又… positive',
      'yòu…yòu… positive use',
      'Two positive qualities — the most common use; a compact rave review. 又便宜又好吃 ("both cheap AND tasty") is the universal restaurant-recommendation phrase; 又新鲜又便宜 ("both fresh AND cheap") works for produce.',
      'sentence',
      '这家粤菜馆又便宜又好吃。 ("This Cantonese place is both cheap AND tasty.")',
      'Standard positive review format; if a colleague asks for a restaurant recommendation, this is the phrasing.',
      [
        { target: '又便宜又好吃', note: 'universal positive restaurant review' },
        { target: '又新鲜又干净', note: '"both fresh AND clean" — typical praise for a seafood restaurant' },
        { target: '又快又准时', note: '"both fast AND on time" — typical praise for delivery / service' },
      ],
      [ACT.grammarYouYou],
    ),
    createContentItem(
      '又…又… negative',
      'yòu…yòu… negative use',
      'Two negative qualities — a compact complaint. 又咸又油 ("both salty AND greasy") is a typical bad-meal review; 又贵又难吃 ("both expensive AND bad") is the harshest version. Use sparingly in front of the host — this is what you say AFTER the meal, not during it.',
      'sentence',
      '上次那家餐厅又贵又难吃。 ("That restaurant last time was both expensive AND bad.")',
      'Standard negative review format; appears constantly in informal restaurant discussions but never in front of the establishment.',
      [
        { target: '又贵又难吃', note: 'harshest review combo — expensive AND bad-tasting' },
        { target: '又咸又油', note: 'common 鲁菜 / 京菜 complaint — too salty AND too greasy' },
        { target: '又慢又凉', note: '"both slow AND cold" — typical service complaint' },
      ],
      [ACT.grammarYouYou],
    ),
    createContentItem(
      '又…又… mixed',
      'yòu…yòu… mixed pairing',
      'A and B do not have to be both positive or both negative — they just have to be jointly true. 又辣又好吃 ("spicy AND tasty") combines a neutral-or-negative descriptor with a positive one; 又便宜又一般 ("cheap AND mediocre") combines positive with neutral. The pattern stays the same; the meaning shifts based on the descriptor pair.',
      'sentence',
      '这道水煮鱼又辣又好吃。 ("This boiled fish is both spicy AND delicious.")',
      'Typical mixed-pair description; spice level is neutral / preference-dependent, taste is positive — both true at once.',
      [
        { target: '又辣又好吃', note: 'spice + tastiness — spice is neutral, tastiness is positive; both true' },
        { target: '又新鲜又贵', note: 'freshness + price — freshness is positive, price is neutral / context-dependent' },
        { target: '又方便又一般', note: '"both convenient AND mediocre" — convenience is positive, mediocre is mild negative' },
      ],
      [ACT.grammarYouYou],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Grammar III: 不…不…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '不 A 不 B',
      'bù A bù B — neither too A nor too B',
      'Pattern: 不 + adjective + 不 + opposite-adjective = "neither too A nor too B, just right". The adjectives MUST be antonyms — 咸/淡 (salty/bland), 冷/热 (cold/hot), 大/小 (big/small). The pattern asserts that the subject sits in the balanced middle of the two extremes; usually pairs with 正好 (just right) for the explicit positive judgment.',
      'sentence',
      '这道菜不咸不淡，正好。 ("This dish is neither too salty nor too bland — just right.")',
      'The canonical positive judgment of seasoning balance; the highest praise in Chinese food evaluation, more refined than 好吃 (tasty).',
      [
        { target: '不 + adjective1 + 不 + antonym', note: 'fixed structure; the two adjectives must be opposites' },
        { target: 'often paired with 正好', note: '"…just right" makes the praise explicit; without 正好 the phrase still implies balance' },
        { target: '不咸不淡 (canonical example)', note: 'seasoning balance — neither over-salted nor under-seasoned, just right' },
      ],
      [ACT.grammarBuBu],
    ),
    createContentItem(
      '不…不… common pairs',
      'bù…bù… common antonym pairs',
      'Memorize the common antonym pairs that fit 不…不… for food, weather, and physical objects. 不咸不淡 (salty/bland), 不冷不热 (cold/hot), 不快不慢 (fast/slow), 不多不少 (many/few), 不远不近 (far/near), 不大不小 (big/small). Each one means "the perfect middle of the two extremes".',
      'sentence',
      '今天天气不冷不热，很舒服。 ("Today\'s weather is neither cold nor hot — very comfortable.")',
      'Standard weather appreciation; common small-talk opener in business dinners.',
      [
        { target: '不咸不淡', note: 'seasoning balance — most common food usage' },
        { target: '不冷不热', note: 'weather balance — most common small-talk usage' },
        { target: '不多不少', note: 'quantity balance — used for portion sizes and bills' },
        { target: '不大不小', note: 'size balance — used for clothing, rooms, dishes' },
      ],
      [ACT.grammarBuBu],
    ),
    createContentItem(
      '不 sandhi inside 不…不…',
      'bù sandhi inside the pattern',
      'CRITICAL: the 不 sandhi rule fires independently on EACH 不 based on the tone of the syllable immediately after. 不咸 (xián = 2nd): 不 stays as bù (no sandhi). 不淡 (dàn = 4th): 不 becomes bú. So the spoken form is bù xián bú dàn — the FIRST 不 stays, the SECOND 不 rises. Learners often get this backward.',
      'sentence',
      '写: 不咸不淡。 说: bù xián bú dàn.\n写: 不冷不热。 说: bù lěng bú rè. (lěng=3rd, rè=4th)',
      'Sandhi happens per-syllable, not per-pattern; always check the tone of the immediately following syllable.',
      [
        { target: '不 + 2nd / 3rd → bù', note: 'no sandhi; full fourth tone preserved' },
        { target: '不 + 4th → bú', note: 'rises to second tone; the standard 不 sandhi rule' },
        { target: '不咸不淡 spoken', note: 'bù xián bú dàn — first 不 stays (before 2nd tone), second 不 rises (before 4th tone)' },
        { target: '不冷不热 spoken', note: 'bù lěng bú rè — first 不 stays (before 3rd tone), second 不 rises (before 4th tone)' },
      ],
      [ACT.grammarBuBu],
    ),
    createContentItem(
      '不…不… NOT just any pair',
      'bù…bù… restriction on adjective pair',
      'CRITICAL RULE: the two adjectives in 不…不… MUST be ANTONYMS. ✗ 不辣不香 ("neither spicy nor fragrant") is wrong because 辣 and 香 are not antonyms — they describe different dimensions. ✓ 不辣不淡 / ✓ 不咸不淡 work because 辣 vs 淡 (spicy vs bland) and 咸 vs 淡 are paired ends of one scale.',
      'sentence',
      'WRONG: 这道菜不辣不香 (mixed dimensions)\nRIGHT: 这道菜不咸不淡 (single dimension, opposite ends)',
      'The antonym constraint is what distinguishes 不…不… from 又…又…; learners often confuse them.',
      [
        { target: 'antonym constraint', note: 'two adjectives must be opposite ends of ONE scale (salty-bland, hot-cold, big-small)' },
        { target: 'compare with 又…又…', note: '又…又… pairs SIMILAR descriptors (positive+positive, negative+negative); 不…不… pairs OPPOSITES' },
      ],
      [ACT.grammarBuBu],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '餐厅评论',
      'cāntīng pínglùn',
      'A complete four-sentence business-dinner restaurant review in Mandarin. Read it aloud with correct tones, sandhi, and natural rhythm. Notice the layered grammar: 又…又…, 不…不…, 请 pattern, and 对…过敏 all appear naturally.',
      'sentence',
      '上周我们公司在北京宴请韩国合作伙伴，订了一家川菜馆的包间。这家店又有名又地道，麻婆豆腐不咸不淡，正好。因为客人对花生过敏，所以我们请服务员把宫保鸡丁里的花生都拿出来了。最后大家干杯，王总买单，气氛很好。',
      'Translation: "Last week our company hosted Korean partners in Beijing at a banquet, booking a private room at a Sichuan restaurant. The place is both famous AND authentic; the mapo tofu was neither too salty nor too bland — just right. Because a guest was allergic to peanuts, we asked the server to remove all the peanuts from the kung pao chicken. At the end everyone toasted, Director Wang settled the bill, and the atmosphere was wonderful."',
      [
        { target: '宴请 yànqǐng', note: 'formal banquet hosting verb; matches the corporate context' },
        { target: '又有名又地道', note: '又…又… positive pair — "both famous AND authentic"; standard restaurant recommendation phrasing' },
        { target: '不咸不淡，正好', note: '不…不… + 正好; canonical seasoning-balance praise' },
        { target: '对花生过敏 duì huāshēng guòmǐn', note: 'fixed allergy pattern 对 X 过敏; explicit and serious — the server must respond' },
        { target: '请服务员…拿出来', note: '请 + person + verb; "ask the server to take them out" — polite modification request' },
        { target: '买单 mǎidān', note: 'host settles the bill; standard end-of-banquet action, usually done discreetly' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions matching the review. Answer each in a short Mandarin sentence; full sentences are not required for natural speech.',
      'sentence',
      'Q1: 公司在哪个城市宴请合作伙伴? Q2: 他们去了什么菜的馆子? Q3: 客人对什么过敏? Q4: 最后谁买单?',
      'Four targeted questions covering location, cuisine, allergy, and host — exercising the key vocabulary of the lesson.',
      [
        { target: 'A1: (在)北京。', note: 'short location answer; the 在 is optional in a casual reply' },
        { target: 'A2: 川菜馆。', note: 'short noun answer; the cuisine name + 馆 ("eatery")' },
        { target: 'A3: (对)花生过敏。', note: 'short allergy answer; the 对 is optional in a fragment but required in a full sentence' },
        { target: 'A4: 王总(买单)。', note: 'short subject answer; 王总 alone is sufficient if context is clear' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '订包间 (电话对话)',
      'dìng bāojiān (diànhuà duìhuà)',
      'A six-turn phone dialogue between you (the host) and a 川菜 restaurant reservations clerk. Covers private-room booking, headcount, time, dietary restrictions, and confirmation — every step of a real business-dinner phone reservation.',
      'conversation',
      '前台: 您好，川香轩，请问有什么需要?\n您: 您好，我想订一个明天晚上七点的包间，四个人。\n前台: 好的。请问您贵姓?\n您: 我姓张。麻烦您一件事——其中一位客人吃素，另一位对花生过敏，能不能让厨师注意一下?\n前台: 没问题，张先生。我们会安排一个素菜，宫保鸡丁那道菜可以把花生去掉。\n您: 太好了，谢谢您。明天见。\n前台: 好的，明天见，欢迎光临。',
      'A natural polite-register reservation call; demonstrates the full host workflow from greeting to dietary-restriction handover.',
      [
        { target: '请问有什么需要', note: 'reservation clerk\'s standard opening — "may I ask what you need?"' },
        { target: '您贵姓?', note: 'formal "your surname?"; the clerk needs the booking name' },
        { target: '麻烦您一件事', note: '"may I trouble you with one thing"; polite framing for a non-trivial request' },
        { target: '其中一位…，另一位…', note: '"one of them…, another…"; pattern for distinguishing two guests within a group' },
        { target: '能不能让厨师注意一下?', note: '"could you have the chef pay attention?"; soft request to handle restrictions kitchen-side' },
        { target: '把花生去掉', note: '"remove the peanuts"; 把 + object + verb pattern for modifying a dish' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '在饭桌上 (敬酒对话)',
      'zài fànzhuō shang (jìngjiǔ duìhuà)',
      'A six-turn dialogue at the dinner table during the toasting phase. Covers offering a first toast, receiving and returning toasts, declining additional alcohol gracefully, and closing the meal — the social heart of the business dinner.',
      'conversation',
      '主陪 (您): 各位，今天能请到大家，特别高兴。为我们以后的合作干杯!\n所有人: 干杯!\n贵宾 (李总): 张先生，菜很好吃，又有特色又不太辣，谢谢您的安排。\n您: 您喜欢就好。来，我再敬您一杯。\n李总: 哎，我开车，喝一口就行，您随意。\n您: 没问题，您随意。我也不再劝酒了。来，最后大家干一杯，下次再聚!',
      'Demonstrates the toast hierarchy, the polite alcohol decline, and the meal-closing toast — natural rhythm of a Beijing business dinner.',
      [
        { target: '能请到大家，特别高兴', note: '"so glad to have everyone here"; standard host opener before the first toast' },
        { target: '为…干杯', note: '"to [reason], cheers!"; fixed toast format — always state the reason first' },
        { target: '又有特色又不太辣', note: '又…又… positive pair; the senior guest is complimenting the host\'s choice' },
        { target: '我再敬您一杯', note: '"let me offer you another toast"; 敬 (jìng) is the polite verb for offering a toast specifically' },
        { target: '我开车，喝一口就行', note: '"I\'m driving, one sip is enough"; canonical face-saving decline of full toast' },
        { target: '您随意', note: '"as you like"; host\'s acceptance of the decline — no pressure' },
        { target: '不再劝酒', note: '"won\'t push drinking anymore"; an explicit step-back, signals the host respects the limit' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable five-sentence template for a pre-dinner team briefing memo. Fill in the bracketed slots with your own details — the structure carries the rest.',
      'sentence',
      '各位，明晚我们在 [餐厅名] 宴请 [客人]，时间 [几点]，地点 [地址]。已经订了一个 [几人] 的包间。其中 [客人A] 吃素， [客人B] 对 [过敏原] 过敏，所以麻烦点菜的时候避开这些。这家店的 [招牌菜] 又 [描述1] 又 [描述2]，可以放心推荐。请大家提前到，谢谢配合。',
      'Five sentences cover the core: location/time, headcount + room, dietary restrictions, recommended dishes, logistics close — the minimum complete briefing.',
      [
        { target: '[餐厅名]', note: 'restaurant name — include 菜 type for clarity (e.g., 川香轩川菜馆)' },
        { target: '[客人A] 吃素 / [客人B] 对 [过敏原] 过敏', note: 'individual restrictions stated explicitly per guest; using both 吃素 and 对…过敏 covers the two main restriction types' },
        { target: '[招牌菜] 又 [描述1] 又 [描述2]', note: '又…又… recommendation; pick two positive descriptors from the cuisine\'s typical praise vocabulary' },
        { target: '请大家提前到', note: '请 + person + V; closes the memo with a polite collective request' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 4–5 sentence pre-dinner briefing in Hanzi using the template. Use 请 at least twice and one of 又…又… or 不…不… so the writing demonstrates the core grammar of this lesson.',
      'sentence',
      '示例: 各位，明晚我们在川香轩宴请韩国合作伙伴金总，时间七点，地点东三环。已经订了一个四人包间。其中李工对花生过敏，金总不太能吃辣，所以请点菜的时候避开宫保鸡丁，可以多点凉菜。这家店的麻婆豆腐又香又下饭，水煮鱼可以让厨师做成不太辣的口味。请大家提前十分钟到，谢谢配合。',
      'Translation: "Everyone — tomorrow night we\'re hosting Director Kim and his Korean partners at Chuanxiangxuan, 7 PM, east third ring road. I\'ve booked a four-person private room. Engineer Li is allergic to peanuts and Director Kim doesn\'t handle spice well, so when ordering please avoid kung pao chicken and order more cold dishes. The mapo tofu here is both fragrant AND great with rice, and the boiled fish can be made not too spicy by the chef. Please arrive ten minutes early, thanks for cooperating."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '干杯的高低',
      'gānbēi de gāodī',
      'Glass-rim height during 干杯 encodes hierarchy. When clinking with someone senior to you, your glass rim sits visibly BELOW theirs — a silent acknowledgment of their higher status, tied directly to face (面子). The senior person keeps theirs higher; lower-ranking participants compete downward to show maximum respect. Forgetting to lower your glass with a senior guest is read as not knowing the rules.',
      'sentence',
      '跟领导干杯的时候，杯口一定要低于领导的杯口。',
      'When toasting with a leader, your glass rim must be lower than theirs — a fixed expectation in formal business dinners.',
      [
        { target: '杯口 bēikǒu', note: 'glass rim; the part that physically touches when clinking' },
        { target: '低于 dīyú', note: '"lower than"; the comparative used for the height rule' },
        { target: '面子 miànzi', note: 'face / public dignity; the social mechanism this ritual reinforces' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '主陪与副陪',
      'zhǔpéi yǔ fùpéi',
      'The seating ritual. 主陪 (the principal host) sits at the head of the round table, FACING the door — the "tiger\'s seat", historically the most defensible position. 副陪 (co-host / second host) sits OPPOSITE the host, with their back to the door. The 贵宾 (senior guest) sits to the host\'s right; the second guest to the host\'s left; remaining guests fill in by rank, alternating sides outward.',
      'sentence',
      '主陪面对门坐，副陪坐对面，贵宾坐在主陪的右手边。',
      'Standard seating chart for a round-table business dinner — applies to every formal Chinese banquet.',
      [
        { target: '主陪 zhǔpéi', note: 'principal host; faces the door, anchors the table, orders and leads toasts' },
        { target: '副陪 fùpéi', note: 'co-host / second host; sits opposite the principal host, handles secondary toasts and overflow logistics' },
        { target: '贵宾 guìbīn', note: 'honored guest; sits to the principal host\'s right — the seat of highest respect for a guest' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '主人点菜',
      'zhǔrén diǎncài',
      'The host orders for the entire table — guests do NOT pick their own dishes. The host typically asks the senior guest (with 您看…?, "what do you think?"), who will defer back; then the host chooses a balanced spread covering 凉菜 / 主菜 / 蔬菜 / 汤 / 主食. Asking a guest "what do you want to eat?" in a formal context puts them in the awkward position of having to pick, which Chinese hospitality avoids.',
      'sentence',
      '主人会先问贵宾，但贵宾通常会让主人决定。',
      'The host asks the senior guest first, but the senior guest typically defers back — a polite mutual hand-off that ends with the host ordering anyway.',
      [
        { target: '您看 nín kàn', note: '"what do you think"; the polite deferral the host uses when consulting the senior guest' },
        { target: 'guest defers back', note: 'the senior guest typically says 您看着办 (nín kàn zhe bàn, "you decide") or 都行 (dōu xíng, "anything works") — the polite return move' },
        { target: 'balanced spread', note: 'host orders 凉菜 (cold) + 主菜 (main) + 蔬菜 (vegetable) + 汤 (soup) + 主食 (staple); roughly 2–3 dishes per person headcount' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '不给小费',
      'bù gěi xiǎofèi',
      'Tipping is NOT practiced in mainland China — restaurants, taxis, hotels included. Tipping a server in Beijing or Shanghai can confuse or embarrass them. Service charges (服务费 fúwùfèi) are sometimes built into the bill at upscale restaurants and signal the same thing. Do not apologize for not tipping; it is not a slight, it is the local norm. Hong Kong and Taiwan have slightly different tipping customs, but mainland is unambiguous.',
      'sentence',
      '在中国大陆吃饭不用给小费，账单里有时候会有服务费。',
      'No tipping in mainland China for dining; sometimes a service charge is on the bill.',
      [
        { target: '小费 xiǎofèi', note: 'tip / gratuity; the word exists but the practice does not in mainland dining' },
        { target: '服务费 fúwùfèi', note: 'service charge; appears at upscale restaurants, typically 10–15%, IS on the bill' },
        { target: '不用 bú yòng', note: '"no need to / don\'t have to"; the standard way to state the no-tipping norm' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '茶香敲指礼',
      'cháxiāng qiāo zhǐ lǐ',
      'The tea-tapping ritual. When someone pours tea for you, lightly tap the table with your bent index and middle fingers (right hand) as a silent thank-you. The gesture imitates a small kowtow and originated in the Qing dynasty — saves you from interrupting the conversation to verbally thank the pourer. Universal across Chinese-speaking regions; works at any meal where tea is served.',
      'sentence',
      '别人给你倒茶的时候，用两根手指敲桌子就行，不用说"谢谢"。',
      'When someone pours your tea, tap the table with two fingers — no need to say thank-you verbally.',
      [
        { target: '倒茶 dào chá', note: '"pour tea"; the action that triggers the tap response' },
        { target: '敲桌子 qiāo zhuōzi', note: '"tap the table"; specifically with the bent index + middle fingers of one hand' },
        { target: 'silent thanks', note: 'the gesture replaces verbal 谢谢; using it shows you know the convention' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 13 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 北京川菜商务晚宴',
      'rènwù: Běijīng chuāncài shāngwù wǎnyàn',
      'Roleplay the entire business dinner with the tutor playing first the restaurant reservations clerk, then a visiting senior guest. Combine every skill from this lesson in one continuous scene — book the 包间, order four balanced dishes around two restrictions, lead the first toast, decline a fourth toast, settle the bill.',
      'conversation',
      '[Phase 1 — phone reservation]\n您: [打电话订一个明晚四人包间，提到一位素食、一位花生过敏]\n前台: [问姓氏，确认时间，承诺安排]\n[Phase 2 — at the table, ordering]\n您: [问贵宾"您看…?"，然后点四道菜: 一道凉菜、一道主菜、一道素菜、一道汤; 避开花生; 让水煮鱼少放辣]\n服务员: [确认订单]\n[Phase 3 — first toast]\n您: [说欢迎词，然后用"为…干杯"格式提议第一杯]\n贵宾: [回应，可能反过来敬您]\n[Phase 4 — declining additional alcohol]\n贵宾或副陪: [再敬一杯，鼓励喝完]\n您 (作为另一位客人): [礼貌拒绝第四杯; 用"实在不能再喝了"或"我开车"]\n[Phase 5 — closing]\n您: [感谢大家，提议最后一杯，悄悄去买单]',
      'A 10–12 turn exchange covering every micro-skill: reservation, ordering with restrictions, hosting the first toast, refusing more alcohol, closing the meal — the tutor will guide you turn by turn.',
      [
        { target: 'Phase 1 — 订包间', note: '请 + 麻烦 patterns; mention restrictions early so the kitchen can prepare' },
        { target: 'Phase 2 — 点菜', note: '4-dish balance: 凉菜 + 主菜 + 蔬菜 + 汤; defer to 贵宾 with 您看…?; modify dishes for restrictions' },
        { target: 'Phase 3 — 第一杯', note: '为合作干杯 / 为大家健康干杯; state the reason first, then 干杯' },
        { target: 'Phase 4 — 拒绝再喝', note: '实在不能再喝了 / 我开车 / 我对酒过敏 — pick a face-saving reason and stick with it' },
        { target: 'Phase 5 — 买单', note: 'discreetly leave the table; do not let the bill appear in front of guests' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 处理意外',
      'tiǎozhàn — chǔlǐ yìwài',
      'Stretch goal: in the same dinner, the server brings out 宫保鸡丁 without removing the peanuts — straight to the table of someone with a peanut allergy. Politely flag the mistake, ask for an immediate fix, and reassure both the guest and the server. The skill is handling a face-loss moment without amplifying it.',
      'conversation',
      '服务员: [上宫保鸡丁]\n您 (主陪): 不好意思，麻烦您一下——这道宫保鸡丁里有花生，我们预订的时候说过李先生对花生过敏，能不能麻烦您拿回去重新做一份不放花生的?\n服务员: 真不好意思，我马上去厨房说一下，请稍等。\n您 (对客人): 李先生，真抱歉，给您添麻烦了。要不咱们先吃别的菜，那道菜一会儿再来。\n李先生: 没事没事，不用麻烦。\n服务员: [稍后回来]: 让您久等了，重新做的那份没有花生。\n您: 太谢谢了。',
      '"没事" and "不用麻烦" are reassurance phrases the senior guest will use to make the host feel less bad; the host must keep apologizing through the fix.',
      [
        { target: '麻烦您一下', note: '"could I trouble you for a moment"; opens a non-trivial request to the server' },
        { target: '拿回去重新做', note: '"take it back and remake"; the explicit remediation request' },
        { target: '给您添麻烦了', note: '"I\'ve caused you trouble"; host\'s apology to the guest for the kitchen\'s mistake' },
        { target: '没事 / 不用麻烦', note: 'guest\'s reassurance pair — minimizes the incident and preserves the host\'s face' },
        { target: '让您久等了', note: '"sorry to keep you waiting"; server\'s apology on return — standard service-recovery phrase' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
