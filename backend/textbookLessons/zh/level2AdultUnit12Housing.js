// Level 2 Adult Unit 12 — 找房子 (Housing & Renting in Beijing)
// Functions: navigating the Beijing rental market — understanding apartment
// layouts (一居室/两居室/三居室), comparing condition tiers (精装/简装/毛坯),
// reading a 中介-mediated listing, asking the right follow-up questions about
// 押金/物业费/水电煤, and negotiating ONE term down (lower deposit or waived
// 中介费). Builds directly on Adult Unit 6 (Dorm Life) — now the learner is
// a working professional renting a real apartment, not a dorm room.
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
  orientation: 'zh-l2au12-orientation',
  pronunciation: 'zh-l2au12-pronunciation',
  vocabularyApartment: 'zh-l2au12-vocab-apartment',
  vocabularyContract: 'zh-l2au12-vocab-contract',
  grammarZhe: 'zh-l2au12-grammar-zhe',
  grammarBuguangJiu: 'zh-l2au12-grammar-buguang-jiu',
  grammarYaobu: 'zh-l2au12-grammar-yaobu',
  reading: 'zh-l2au12-reading',
  listening: 'zh-l2au12-listening',
  writing: 'zh-l2au12-writing',
  culture: 'zh-l2au12-culture',
  task: 'zh-l2au12-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Walk into a Beijing 中介 office, state your budget, preferred area, and apartment type (一居室/两居室/三居室), and have the agent show you matching listings.',
      'Compare three apartments by location, monthly rent, condition (精装/简装/毛坯), and floor (高层/低层) — then identify which one fits your needs and why.',
      'Ask the three follow-up questions every Beijing renter must ask: 押金多少 (how big is the deposit), 物业费包不包水电 (does the property fee include utilities), and 什么时候可以入住 (when can I move in).',
      'Negotiate ONE term — either a lower 押金 or a waived 中介费 — using polite indirect language; the goal is a small concrete win, not a dramatic discount.',
    ],
    task: 'Picture yourself starting a new job in Beijing — three months in the company hotel are up and you need your own apartment. A 链家 中介 takes you to see three apartments today. By the end of this lesson you can compare them, ask the right questions, and lock down a deal without getting fleeced.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Apply 一 (yī) sandhi correctly in 一居室 (yījūshì) — when 一 stands before a measure-word-like syllable in a fixed compound, the tone stays first; this contrasts with 一个 (yígè) where 一 becomes second tone before a fourth tone.',
      'Pronounce the retroflex initial in 装修 (zhuāngxiū) cleanly — zh- needs a curled-back tongue, not the flat English "j" of "jam"; this is THE marker that tells a 中介 you can handle a Beijing conversation.',
      'Distinguish 中介 (zhōngjiè) from possible mishearings — both syllables are retroflex-then-palatal, a tongue gymnastic that learners often slur into "jong-jay"; aim for sharp zh- then crisp j-.',
      'Hit the rising tone on 朝南 (cháonán) — 朝 here is second tone (NOT first tone like in 朝代 cháodài "dynasty"); getting it wrong sounds like a different word in real-estate speech.',
    ],
    task: 'Read each example aloud, mark the tone of every syllable, and check whether sandhi applies — then pronounce the spoken version (not the written tones).',
  },
  {
    id: ACT.vocabularyApartment,
    section: 'Vocabulary I',
    title: 'Apartment layouts, rooms, and condition tiers',
    goals: [
      'Use the X居室 sizing system (一居室 1BR, 两居室 2BR, 三居室 3BR) and the room words (卧室, 客厅, 厨房, 卫生间, 阳台) so you can describe any apartment in two short sentences.',
      'Distinguish the three Beijing condition tiers — 精装 (move-in-ready, decorated and furnished), 简装 (basic, painted but minimal furniture), 毛坯 (bare concrete, you finish it yourself) — and know that rent and 押金 scale steeply with the tier.',
      'Use 朝南/朝北/朝东/朝西 to describe orientation (朝南 = south-facing, the premium in Beijing because winter sun matters), plus 高层/低层 + 楼层 + 电梯/楼梯 for floor and access.',
    ],
    task: 'Describe your ideal Beijing apartment in 3 sentences: type (X居室), orientation (朝X), and condition tier (精/简/毛坯) — then read it aloud with the right tones.',
  },
  {
    id: ACT.vocabularyContract,
    section: 'Vocabulary II',
    title: 'Rent, deposit, fees, and the rental ecosystem',
    goals: [
      'Use 房租 (rent) vs 押金 (deposit) vs 物业费 (property/management fee) vs 中介费 (broker fee) — these are four DIFFERENT pots of money in Beijing, and confusing them makes the first month\'s bill a shock.',
      'Understand 押一付三 (deposit + 3 months upfront) as the default Beijing payment cycle and know how to ask for 押一付一 (deposit + 1 month) — a real negotiation lever.',
      'Use 中介 (broker), 房东 (landlord), 二房东 (sub-landlord, often informal) — and know which one you actually talk to about what (the 中介 handles paperwork, the 房东 owns the place, the 二房东 is whoever rented it before you and is now subletting).',
    ],
    task: 'Use 5 contract words in one paragraph describing your first month\'s total housing cost (押金 + 中介费 + first 3 months\' 房租 + 物业费).',
  },
  {
    id: ACT.grammarZhe,
    section: 'Grammar I',
    title: 'V + 着 (zhe) — a state in progress',
    goals: [
      'Use V + 着 to describe an ONGOING STATE — not an action being done right now, but a condition that persists. 房间开着空调 means "the room has the AC on (right now, as we look at it)", not "the room is turning the AC on".',
      'Distinguish V + 着 (state, durative) from 正在 + V (action in progress) — 他坐着 = "he is in a seated position", 他正在坐下 = "he is in the act of sitting down". Apartment-tour Chinese uses 着 constantly to describe what\'s on or in the room.',
      'Use V + 着 in the secondary-action pattern V1 + 着 + V2: 开着窗户睡觉 (sleep with the window open), 关着空调睡 (sleep with the AC off). Critical for describing how an apartment is set up.',
    ],
    task: 'Write 3 sentences using V + 着 to describe what you see when you walk into an apartment: lights on, windows open, AC running.',
  },
  {
    id: ACT.grammarBuguangJiu,
    section: 'Grammar II',
    title: '不光…就… — not just X, even Y',
    goals: [
      'Use 不光 X 就 Y to add emphasis — "not just X, even just Y alone is enough". 不光房租贵，就押金都要三万 = "Not just the rent is expensive — even the deposit alone is 30,000". The 就 here means "just / merely" and intensifies the second clause.',
      'Distinguish this from the simpler 不但…而且… (not only…but also…) pair. 不光…就… is more emphatic and more colloquial — exactly the register a 中介 uses when pushing back on your negotiation.',
      'Place the 不光 clause first (small claim) and the 就 clause second (bigger, more emphatic claim). Reversing them breaks the rhythm of the pattern.',
    ],
    task: 'Write 3 sentences using 不光…就… to complain about a Beijing apartment: small AND expensive, dark AND noisy, broken AND no elevator.',
  },
  {
    id: ACT.grammarYaobu,
    section: 'Grammar III',
    title: '要不…要不… — either…or… (alternatives)',
    goals: [
      'Use 要不 X 要不 Y to offer two alternatives — "either X or Y". 要不今天看，要不明天看 = "Either look today, or look tomorrow". The 要不 is a softer, more colloquial alternative to 或者 (huòzhě, "or").',
      'Use 要不 in single-clause form to mean "how about / why don\'t (we)…": 要不便宜一点儿? ("How about a little cheaper?") — this is the polite Beijing way to open a negotiation.',
      'Distinguish 要不…要不… (alternatives) from 还是 (háishi, "or" in questions). 要不…要不… is a proposal of options; 还是 asks the listener to pick one ("A 还是 B?").',
    ],
    task: 'Offer 3 pairs of alternatives to a 中介 using 要不…要不…: see today or tomorrow, take this one or that one, pay 押一付三 or 押一付一.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a 链家 listing',
    goals: [
      'Read a typical 链家-style apartment listing with all the fields (面积, 户型, 朝向, 楼层, 装修, 房租, 押金, 物业费, 中介费) and pull out the answers a renter needs.',
      'Identify the THREE red flags in a Beijing listing: photos that don\'t match the address, a 中介费 that\'s higher than one month\'s rent, and 押一付三 with NO mention of when 押金 is returned. These are the patterns of a fake or predatory listing.',
    ],
    task: 'Read the sample listing aloud, then in your own Mandarin answer: total first-month cost, orientation, and one concern you would raise with the agent.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A 中介 shows you three apartments',
    goals: [
      'Follow a 6-turn dialogue with a Beijing 中介 showing three apartments and comparing them on location, price, condition, and orientation.',
      'Reproduce the comparison in your own words using 不光…就… and 要不…要不… — and decide which apartment you would pick and why.',
    ],
    task: 'Read the dialogue with the tutor first; then re-perform it as yourself, picking ONE of the three apartments and giving a one-sentence reason in Mandarin.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'A WeChat message to your 中介',
    goals: [
      'Write a 4-6 line WeChat message (微信) to your 中介 listing your apartment needs: target area, budget, X居室, orientation, condition tier, and move-in date.',
      'Sign off with a polite ask for a 押一付一 option or a waived 中介费 — the standard opening move in any Beijing negotiation.',
    ],
    task: 'Write your own 中介 message in 4-6 lines, using at least one V + 着, one 不光…就…, and one 要不…要不… pattern.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Beijing rental ecosystem — pain points and survival rules',
    goals: [
      'Understand the dominance of 链家 (Lianjia) and 我爱我家 (5i5j) — the two giant 中介 chains that control most of Beijing\'s rental listings, with their own apps, fixed 中介费 rates, and (usually) more reliable contracts than independent agents.',
      'Know the standard Beijing payment cycle 押一付三 (deposit + 3 months rent upfront, paid quarterly) — and that the deposit is supposed to be returned at lease-end minus damages, but disputes about what counts as "damage" are extremely common.',
      'Recognize three Beijing-only concepts: 北京户口 (Beijing residence permit, which controls who can BUY property — renters are exempt but it shapes the market), 学区房 (school-district apartments, often 30-50% premium for the right elementary school), and 群租 (illegal subdivided units packed 6-10 people, common in cheap suburbs).',
      'Know about 燕郊 (Yanjiao) — the satellite commuter city in Hebei one hour east of Beijing, where rents are half but commutes are brutal — and the government slogan 房住不炒 ("houses for living, not speculation") that frames national rental policy.',
    ],
    task: 'Plan your realistic first-month Beijing budget using 押一付三, one month\'s 中介费, the 押金, and 物业费 — then identify two concrete questions you would ask before signing.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Three apartments, one decision',
    goals: [
      'Combine everything from this lesson — comparison vocabulary, V + 着 descriptions, 不光…就… emphasis, 要不…要不… alternatives, and 押金/物业费/入住时间 questions — into one continuous scene.',
      'Negotiate ONE concrete term down: either the 押金 (押一付三 → 押一付一) OR the 中介费 (full → half). Pick one and commit to it; trying to win both signals you don\'t know the market.',
    ],
    task: 'Roleplay a full 中介 visit with the tutor playing a 链家 agent showing three Beijing apartments; aim for an 8-turn exchange ending with a signed-on apartment and ONE negotiated concession.',
  },
];

const lesson = {
  title: 'Level 2 · Adult Unit 12: 找房子 — Housing and Renting in Beijing',
  category: 'shopping',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-apartment', label: 'Describing an apartment', goal: 'Use X居室 + 朝X + 装修 tier to describe an apartment in two sentences a 中介 can act on.' },
    { id: 'asking-deposit', label: 'Asking about deposit and fees', goal: 'Use 押金 / 物业费 / 中介费 to ask the three questions every Beijing renter must ask before signing.' },
    { id: 'comparing-options', label: 'Comparing options', goal: 'Use 不光…就… and 要不…要不… to compare three apartments and explain your pick.' },
    { id: 'negotiating-one-term', label: 'Negotiating one term', goal: 'Use a polite 要不…一点儿? opener to negotiate ONE concession (lower 押金 OR waived 中介费).' },
  ],
  relatedPools: ['topic-society', 'topic-daily-life'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can walk into a Beijing 中介 office, describe what you want in apartment-search vocabulary, compare three options on location/price/condition, ask the three must-ask questions about 押金 and fees, and negotiate ONE concrete concession — all without getting steered into a bad lease.',
      'word',
      'Functional language: 找房 zhǎo fáng (apartment-hunt) · 比较 bǐjiào (compare) · 谈价 tánjià (negotiate) · 签合同 qiān hétong (sign contract) · 入住 rùzhù (move in)',
      'These five micro-skills are the survival kit for renting in any first-tier Chinese city — Beijing\'s market is the most aggressive, so the patterns you build here transfer down to Shanghai, Shenzhen, and Guangzhou with no friction.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '今天的场景',
      'jīntiān de chǎngjǐng',
      'You\'ve just moved to Beijing for a new job; the company put you up in a hotel for three months but the clock is running out. A 链家 中介 has scheduled three apartment viewings for this afternoon — one in 海淀 (near 清华大学), one in 朝阳 (closer to the office), and one in 通州 (cheaper but a 50-minute commute). Pick one.',
      'word',
      '中介: 我今天给您看三套，预算都在您说的范围内。您先看看，咱们再谈细节。',
      'Typical opener from a Beijing 中介: framing the visit as "I\'ve pre-screened for your budget, you decide on the spot." The agent\'s pressure is real — they often won\'t hold a unit overnight.',
      [
        { target: '三套 sān tào', note: 'measure word 套 for an apartment unit; 一套房 = one apartment' },
        { target: '预算 yùsuàn', note: 'budget; the 中介 will almost always start by confirming your number' },
        { target: '范围 fànwéi', note: 'range; "within the range you mentioned"' },
        { target: '细节 xìjié', note: 'details; signals "the small print comes after the visit"' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三个区位 — 海淀 · 朝阳 · 通州',
      'sān gè qūwèi — Hǎidiàn · Cháoyáng · Tōngzhōu',
      'Beijing has 16 districts and the three relevant to today\'s search each have a personality. 海淀 (Haidian): the university and tech district, home to 清华大学 and Zhongguancun — pricey but academic and well-served by Line 4. 朝阳 (Chaoyang): the CBD and embassy district, the most international and the most expensive. 通州 (Tongzhou): the eastern satellite, cheaper rents but a long commute to anywhere central.',
      'word',
      '海淀的房子安静，朝阳的房子方便，通州的房子便宜 — 三个区，三种生活。',
      'A typical Beijing renter\'s tradeoff sentence: quiet vs convenient vs cheap; pick which axis matters most to you.',
      [
        { target: '海淀 Hǎidiàn', note: 'university + tech district; 清华大学, 北京大学, Zhongguancun all here — quieter, family-friendly, Line 4' },
        { target: '朝阳 Cháoyáng', note: 'CBD + embassies + nightlife; the most international district, the most expensive rents in central Beijing' },
        { target: '通州 Tōngzhōu', note: 'eastern satellite; cheaper, growing fast, but a 50-minute commute to most central jobs' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '租房三步走',
      'zū fáng sān bù zǒu',
      'The three-step Beijing rental flow that you will exercise in this lesson: STEP 1 — describe your needs (predicate, budget, area, condition); STEP 2 — view the units with the 中介 and compare them out loud; STEP 3 — pick one and negotiate ONE concession before signing. Skipping step 3 is the single biggest beginner mistake.',
      'word',
      'Step 1: 说需求 (state needs) · Step 2: 看房 (view units) · Step 3: 谈价 (negotiate)',
      'Beijing 中介 expect you to negotiate at least one term — agents who refuse all negotiation are signaling either a hot unit or a hostile relationship.',
      [
        { target: '说需求 shuō xūqiú', note: 'state your requirements — area, budget, apartment type, condition, move-in date' },
        { target: '看房 kàn fáng', note: 'view the apartments — physically walk through 2-3 units the same day is standard' },
        { target: '谈价 tánjià', note: 'negotiate — the 押金, 中介费, or move-in date are the three normal levers' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '一居室',
      'yījūshì',
      'In the X居室 sizing compound, 一 stays first tone (yī) because 居室 here functions as a compound noun, not as a measure-word + noun. Contrast with 一个 (yígè) where 一 becomes second tone before fourth-tone 个. The rule: 一 sandhi applies before MEASURE words, not inside fixed compounds.',
      'word',
      '一居室 yījūshì (1BR) · 两居室 liǎngjūshì (2BR) · 三居室 sānjūshì (3BR)',
      'Hearing the wrong tone here marks a learner immediately — Beijing 中介 use this term constantly and the first-tone yī is fixed.',
      [
        { target: '一 (yī, 1st)', note: 'stays first tone in the 一居室 compound; this is the EXCEPTION to the general 一 + 4th → yí rule' },
        { target: '居 (jū, 1st)', note: '"reside/dwell"; first tone, palatal initial j-' },
        { target: '室 (shì, 4th)', note: '"room"; sharp falling tone' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '装修',
      'zhuāngxiū',
      'Two retroflex initials in sequence — zh- in 装 needs the tongue tip curled back to touch the roof of the mouth, x- in 修 is a palatal fricative with the tongue flat and forward. Slurring these together into "zhang-shew" is the single most common English-speaker tell when discussing Beijing apartments.',
      'word',
      '这套房子刚装修过。',
      'Translation: "This apartment was just renovated." A high-frequency 中介 line; getting 装修 wrong undermines the whole conversation.',
      [
        { target: '装 (zhuāng, 1st)', note: 'first tone; retroflex zh- with curled-back tongue, NOT English "j" of "jam"' },
        { target: '修 (xiū, 1st)', note: 'first tone; palatal x- with tongue flat and forward, similar to soft English "sh"' },
        { target: 'rhythm', note: 'two first tones held high and level — the steady pitch is a tone-drilling target' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '中介',
      'zhōngjiè',
      'Retroflex zh- then palatal j- — the tongue physically jumps from curled-back to flat-and-forward between syllables. Learners often collapse both into a flat "jong-jay" which sounds untrained. Listen for the contrast: zh- is darker and back, j- is brighter and front.',
      'word',
      '中介费 zhōngjièfèi (broker fee) · 中介公司 zhōngjiè gōngsī (brokerage)',
      'You will hear and say this word dozens of times in any rental search — drilling it now pays back every viewing.',
      [
        { target: '中 (zhōng, 1st)', note: 'first tone; retroflex zh- requires curled-back tongue tip' },
        { target: '介 (jiè, 4th)', note: 'fourth tone; palatal j- requires flat, forward tongue' },
        { target: 'contrast zh- / j-', note: 'tongue jumps back→forward between syllables; do not collapse both into one flat consonant' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '朝南',
      'cháonán',
      'CRITICAL TONE TRAP: 朝 here is SECOND tone (cháo, "facing toward") — NOT the first-tone 朝 (zhāo, "morning") nor the first-tone 朝 (cháo as "dynasty" is also second tone, but learners often guess first tone). In real-estate Mandarin, every orientation phrase uses second-tone cháo.',
      'word',
      '朝南 cháonán (south-facing) · 朝北 cháoběi (north-facing) · 朝东 cháodōng (east-facing) · 朝西 cháoxī (west-facing)',
      'Beijing winters are cold and dry; south-facing apartments get full winter sun and rent 10-20% higher than north-facing ones with the same layout. Pronouncing 朝 wrong makes the 中介 wonder if you understand the premium you\'re paying.',
      [
        { target: '朝 (cháo, 2nd) "facing"', note: 'second tone; "facing toward [a direction]" — the real-estate sense' },
        { target: '朝 (zhāo, 1st) "morning"', note: 'first tone; "morning" — different word, different reading; learn the distinction now' },
        { target: '南 (nán, 2nd)', note: 'second tone; "south"' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Apartment, rooms, condition
    // ────────────────────────────────────────────────────────────────────
    createContentItem('房子', 'fángzi', 'A house or apartment generically — the all-purpose word for "place to live". 房子 covers everything from a Beijing 四合院 to a high-rise apartment; in rental contexts you also hear the more specific 公寓 (apartment building) and 住宅 (residence).', 'word', '我想租一套房子。', 'Standard opener at a 中介 office: "I want to rent an apartment." 套 is the measure word for a complete housing unit.', null, [ACT.vocabularyApartment]),
    createContentItem('公寓', 'gōngyù', 'A modern apartment building or apartment unit — implies a multi-unit residential complex with shared common areas. Distinct from 别墅 (biéshù, "villa/detached house") and from older 四合院 courtyard houses. Most Beijing rentals today are 公寓.', 'word', '我住在朝阳的一个公寓里。', '"I live in an apartment in Chaoyang." 公寓 is the typical word for the building type a working professional rents.', null, [ACT.vocabularyApartment]),
    createContentItem('一居室', 'yījūshì', 'A one-bedroom apartment, typically 30-50 square meters in Beijing. The simplest layout — one 卧室, one 客厅, one 卫生间, one 厨房. The default for a single professional renter; cheaper and easier to find than larger units.', 'word', '我一个人住，一居室就够了。', '"I live alone, a 1BR is enough." A typical budget statement at a 中介 office.', null, [ACT.vocabularyApartment]),
    createContentItem('两居室', 'liǎngjūshì', 'A two-bedroom apartment, typically 60-80 square meters. Common for couples, roommates, or single professionals who want a home office. Rents roughly 1.5-2x a 一居室 in the same area.', 'word', '我们两个人，需要两居室。', '"There are two of us — we need a 2BR." 两 (not 二) is used here because 两 is the form for counting things.', null, [ACT.vocabularyApartment]),
    createContentItem('三居室', 'sānjūshì', 'A three-bedroom apartment, 90+ square meters. Family-sized; rare in central Beijing under 15,000 RMB/month. Common in the suburbs and in 学区房 (school-district apartments) where families optimize for elementary school access.', 'word', '三居室在海淀很贵。', '"3BRs in Haidian are expensive." A common conversational complaint among Beijing renters.', null, [ACT.vocabularyApartment]),
    createContentItem('卧室', 'wòshì', 'A bedroom — the room where the bed is. In an X居室 listing, the X counts the 卧室 specifically; 客厅 and 厨房 are not counted. Sometimes shortened to 卧 in listings: 主卧 (zhǔwò, "master bedroom"), 次卧 (cìwò, "secondary bedroom").', 'word', '主卧朝南，次卧朝北。', '"The master bedroom faces south, the secondary faces north." A standard line in apartment descriptions.', null, [ACT.vocabularyApartment]),
    createContentItem('客厅', 'kètīng', 'The living room — literally "guest hall". In Beijing apartments, the 客厅 is usually the largest room and serves as both living and dining area. A 客厅 with a 阳台 attached is a strong selling point.', 'word', '客厅有阳台。', '"The living room has a balcony attached." High-value feature in any listing.', null, [ACT.vocabularyApartment]),
    createContentItem('厨房', 'chúfáng', 'The kitchen — usually small in Beijing apartments and separated from the living room by a door (open kitchens are still rare in Chinese residential design because of strong cooking smells from stir-frying). Equipped or not equipped is a key listing detail.', 'word', '厨房很小，但是设备齐全。', '"The kitchen is small but fully equipped." Common framing for an honest listing.', null, [ACT.vocabularyApartment]),
    createContentItem('卫生间', 'wèishēngjiān', 'The bathroom — the all-purpose word. Sometimes shortened to 卫 in listings: 一卫 (one bathroom), 两卫 (two bathrooms). 主卫 (en-suite, attached to master bedroom) is a premium feature; separate 公卫 (guest bathroom) is standard in 两居室 and up.', 'word', '这套房子是两卫。', '"This apartment has two bathrooms." Increasingly common for 两居室 and up.', null, [ACT.vocabularyApartment]),
    createContentItem('阳台', 'yángtái', 'A balcony — used in Beijing for hanging laundry, growing plants, and as a secondary storage space. 封闭阳台 (fēngbì yángtái, "enclosed balcony") with windows is more valuable than 开放阳台 (open balcony). A south-facing balcony is a major premium.', 'word', '阳台朝南，下午有阳光。', '"The balcony faces south, gets afternoon sun." Sun exposure is a real selling point in Beijing.', null, [ACT.vocabularyApartment]),
    createContentItem('朝南', 'cháonán', 'South-facing — the premium orientation in Beijing because winters are cold and dry, and south-facing rooms get the most winter sun for the longest hours. Apartments described as 全朝南 (all south-facing) command 10-20% higher rent than equivalent north-facing units.', 'word', '朝南的房子贵但是暖和。', '"South-facing apartments are expensive but warm." The core Beijing tradeoff.', null, [ACT.vocabularyApartment]),
    createContentItem('朝北', 'cháoběi', 'North-facing — the cheaper orientation; in Beijing, north-facing rooms get little direct winter sun and feel colder and darker. Many 中介 will downplay the orientation; ask directly. 北卧 (north-facing bedroom) often discounts the unit by several hundred RMB/month.', 'word', '朝北的房间冬天比较冷。', '"North-facing rooms are colder in winter." Worth saying out loud during a tour.', null, [ACT.vocabularyApartment]),
    createContentItem('楼层', 'lóucéng', 'Floor / story (of a building). In listings, you\'ll see 楼层 followed by a number: 12层 means the 12th floor. Beijing buildings range from 6-floor 老破小 (old walk-ups) to 30+ floor modern towers.', 'word', '这套房子在12层。', '"This apartment is on the 12th floor." Standard listing detail.', null, [ACT.vocabularyApartment]),
    createContentItem('高层', 'gāocéng', 'High-rise — refers to apartment buildings of roughly 10 floors and above. Apartments on the higher floors of a 高层 building have better views, more sun, and less street noise — they rent 5-15% higher than equivalent lower floors. Always have an elevator (电梯).', 'word', '我喜欢住高层，安静。', '"I like living on a high floor — quieter." Common renter preference.', null, [ACT.vocabularyApartment]),
    createContentItem('低层', 'dīcéng', 'Low-rise — refers to buildings of 1-6 floors, typically older 1980s-90s walk-ups (no elevator). Cheaper rent but ground floors can be damp and noisy; the second and third floors are usually the sweet spot in a low-rise.', 'word', '低层的老房子便宜。', '"Older low-rise buildings are cheap." Often called 老破小 (lǎo-pò-xiǎo, "old-shabby-small") — affectionately or not.', null, [ACT.vocabularyApartment]),
    createContentItem('电梯', 'diàntī', 'Elevator. CRUCIAL question in any Beijing apartment search — a 6th-floor walk-up with no 电梯 is a daily workout that grows old fast. Listings will say 有电梯 (with elevator) or 无电梯 (without elevator) explicitly; if it\'s ambiguous, ask.', 'word', '没有电梯吗?', '"There\'s no elevator?" A standard incredulous question for a 6th floor listing.', null, [ACT.vocabularyApartment]),
    createContentItem('楼梯', 'lóutī', 'Stairs / staircase. A 楼梯房 (lóutī fáng) is a walk-up apartment with no elevator — typically 6-floor or fewer 1980s-90s buildings. Cheaper but punishing for moving in/out and for daily life if you live high in the building.', 'word', '只有楼梯，没有电梯。', '"Only stairs, no elevator." The honest description for an 老破小.', null, [ACT.vocabularyApartment]),
    createContentItem('精装', 'jīngzhuāng', 'Fully decorated and furnished — move-in ready. The 精装 tier means walls painted, floors finished, kitchen and bathroom fully equipped, and typically furniture (bed, sofa, dining table) included. Rent is 20-40% higher than 简装 for the same unit.', 'word', '这套是精装，可以直接拎包入住。', '"This one is fully furnished — you can just walk in with a suitcase." A standard 中介 sales line; 拎包入住 (líng bāo rùzhù) is the catchphrase.', null, [ACT.vocabularyApartment]),
    createContentItem('简装', 'jiǎnzhuāng', 'Basic finish — walls painted, floors and bathroom done, but minimal or no furniture. The middle tier; cheaper than 精装 but you\'ll need to buy a bed, sofa, and possibly appliances. Most working professionals end up in 简装 with a few personal additions.', 'word', '简装比精装便宜，但是要自己买家具。', '"Basic is cheaper than fully furnished, but you have to buy your own furniture." Honest tradeoff statement.', null, [ACT.vocabularyApartment]),
    createContentItem('毛坯', 'máopī', 'Bare concrete shell — no flooring, no walls painted, no fixtures, no plumbing finishes. The cheapest tier and almost never rented (毛坯 are usually bought new from the developer). If a 中介 shows you a 毛坯 to rent, something is off.', 'word', '毛坯房一般不出租。', '"Bare-shell apartments are usually not rented out." Use as a red-flag flag — if rented, ask why.', null, [ACT.vocabularyApartment]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Contract, fees, ecosystem
    // ────────────────────────────────────────────────────────────────────
    createContentItem('房租', 'fángzū', 'Monthly rent — the recurring payment for living in the apartment. In Beijing, 房租 is paid 押一付三 by default (deposit + 3 months upfront, then quarterly), though 押一付一 (monthly) is increasingly common for working professionals. Quoted in RMB per month.', 'word', '房租一个月八千。', '"Rent is 8,000 RMB a month." Standard 中介 quote format.', null, [ACT.vocabularyContract]),
    createContentItem('押金', 'yājīn', 'Security deposit — held by the landlord (or sometimes the 中介) to cover damages and unpaid rent at lease end. In Beijing, the standard deposit is ONE month\'s rent (the "押一" in 押一付三). Returned at lease-end MINUS deductions; the deductions are the single biggest source of landlord-tenant disputes.', 'word', '押金是一个月的房租。', '"Deposit is one month\'s rent." Make sure this is in writing in the lease.', null, [ACT.vocabularyContract]),
    createContentItem('押一付三', 'yā yī fù sān', 'The standard Beijing payment cycle: ONE month\'s rent as deposit (押一) PLUS THREE months\' rent paid upfront (付三). So when you sign a 8,000 RMB/month lease, you fork over 8,000 × 4 = 32,000 RMB on day one. Some landlords accept 押一付一 (monthly) at the cost of a slightly higher monthly rent.', 'word', '一般是押一付三，您能接受吗?', '"Standard is deposit + 3 months upfront — can you handle that?" The 中介 will confirm this at the budget stage.', null, [ACT.vocabularyContract]),
    createContentItem('押一付一', 'yā yī fù yī', 'Alternative payment cycle: ONE month\'s deposit PLUS ONE month\'s rent (monthly billing). Better for cash flow but rare among individual landlords; most common with 链家\'s 自如 (Ziru) brand and other corporate sublets. Negotiating from 押一付三 to 押一付一 is a real possible win.', 'word', '能不能押一付一?', '"Can we do deposit + one month?" The standard polite ask for monthly billing.', null, [ACT.vocabularyContract]),
    createContentItem('中介费', 'zhōngjièfèi', 'Broker fee — paid by the tenant (sometimes split with the landlord) to the 中介 for finding the apartment and handling paperwork. In Beijing, 链家 charges 35-100% of one month\'s rent; the typical retail figure is "one month\'s rent" — which on 8,000 RMB rent means another 8,000 RMB at signing.', 'word', '中介费是一个月的房租。', '"Broker fee is one month\'s rent." The default; ask if it can be reduced.', null, [ACT.vocabularyContract]),
    createContentItem('物业费', 'wùyèfèi', 'Property management fee — paid to the building\'s management company for elevators, hallways, security, garbage, and (sometimes) basic landscaping. Varies wildly: an old walk-up might charge 1-2 RMB per square meter per month; a new high-rise with full amenities might charge 5-8 RMB. Usually paid separately from rent.', 'word', '物业费一个月三百。', '"Property fee is 300 RMB a month." Confirm whether this is included in rent or extra.', null, [ACT.vocabularyContract]),
    createContentItem('水电煤', 'shuǐ-diàn-méi', 'Utilities — literally "water-electricity-gas". The three core utilities in any Beijing apartment, paid monthly via the building\'s management or directly to the utility companies. Almost always EXTRA on top of rent and 物业费. Heating (暖气, nuǎnqì) in Beijing is separate again and billed annually in winter.', 'word', '水电煤自付。', '"Utilities paid by tenant." Standard language in any Beijing lease.', null, [ACT.vocabularyContract]),
    createContentItem('网费', 'wǎngfèi', 'Internet fee — usually NOT included in rent and contracted separately by the tenant (China Telecom, China Unicom, or China Mobile). Typical Beijing residential broadband is 100-200 RMB/month for fiber. Worth confirming whether the apartment is already wired.', 'word', '网费多少?', '"How much is internet?" Good to ask before signing — wired-and-active saves a week of setup.', null, [ACT.vocabularyContract]),
    createContentItem('暖气费', 'nuǎnqìfèi', 'Heating fee — Beijing has district-wide central heating from November 15 to March 15, and the cost is billed once per winter, usually by square meter. Typical bill: 20-30 RMB per square meter per winter, so a 60 m² apartment pays 1,200-1,800 RMB/year just for heating.', 'word', '暖气费一年一交。', '"Heating fee paid once a year." Usually due in October; confirm if the landlord or tenant pays.', null, [ACT.vocabularyContract]),
    createContentItem('中介', 'zhōngjiè', 'Real-estate broker — the person you actually deal with day-to-day during the apartment search. Works for a brokerage (链家, 我爱我家, 自如, or independent). Their incentive is to close the deal quickly because they earn the 中介费; treat them as a useful but interested party, not a neutral advisor.', 'word', '我的中介姓王。', '"My broker\'s family name is Wang." Standard introduction; you\'ll exchange WeChat with them.', null, [ACT.vocabularyContract]),
    createContentItem('房东', 'fángdōng', 'Landlord — the legal owner of the apartment. May or may not be present at viewings; in Beijing many 房东 live elsewhere (sometimes overseas) and delegate all communication to the 中介. The lease is between you and the 房东, not you and the 中介.', 'word', '房东是北京人，住在上海。', '"The landlord is from Beijing but lives in Shanghai." Common — the 中介 is the day-to-day contact.', null, [ACT.vocabularyContract]),
    createContentItem('二房东', 'èr fángdōng', 'Sub-landlord — someone who has rented an apartment from the actual 房东 and is now subletting it to you. Legal but risky: if the 二房东 stops paying the real 房东, you can be evicted with no recourse. Demand to see the original lease before signing with a 二房东.', 'word', '二房东比房东风险大。', '"A sub-landlord is riskier than a real landlord." The standard warning every Beijing renter should hear.', null, [ACT.vocabularyContract]),
    createContentItem('合同', 'hétong', 'Contract — the rental lease document. In Beijing, the standard 房屋租赁合同 (housing rental contract) is a printed form with the landlord, tenant, address, rent, deposit, term, and signature blocks. Always read it before signing; ask for a Chinese copy and (if your Chinese is shaky) a translated copy.', 'word', '签合同前要看清楚。', '"Read carefully before signing." Standard advice; the 中介 may rush you.', null, [ACT.vocabularyContract]),
    createContentItem('合同期', 'hétongqī', 'Contract term — typically 1 year for Beijing rentals, though 2-year leases are increasingly common. Breaking the lease early usually forfeits the 押金 unless the contract has a sublet or break clause.', 'word', '合同期一般一年。', '"Contract is usually one year." The default; longer terms sometimes get a small discount.', null, [ACT.vocabularyContract]),
    createContentItem('入住', 'rùzhù', 'Move in — literally "enter and reside". 什么时候可以入住? ("when can I move in?") is THE question that determines whether you can take a unit; if the current tenant doesn\'t leave until two weeks after your hotel ends, you have a gap.', 'word', '什么时候可以入住?', '"When can I move in?" The must-ask question after deciding which unit you want.', null, [ACT.vocabularyContract]),
    createContentItem('退房', 'tuìfáng', 'Move out / check out — return the apartment to the landlord. At 退房 the landlord inspects for damage and (theoretically) returns the 押金 minus any deductions. Document the apartment state with photos at MOVE-IN; this is the only protection against unfair deductions at MOVE-OUT.', 'word', '退房的时候要还押金。', '"Deposit is returned at move-out." Theoretically. Bring your photos.', null, [ACT.vocabularyContract]),
    createContentItem('家具家电', 'jiājù jiādiàn', '"Furniture and appliances" — the package included with a 精装 rental. Standard inclusions: bed, mattress, sofa, dining table, fridge, washing machine, AC. NOT usually included: bedding, kitchenware, TV. Confirm the exact list in writing.', 'word', '家具家电齐全。', '"Furniture and appliances all included." A 中介 selling line for 精装 units.', null, [ACT.vocabularyContract]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: V + 着 (ongoing state)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'V + 着 (zhe)',
      'V + zhe — durative state aspect',
      'Attach 着 (zhe, neutral tone) to a verb to indicate an ONGOING STATE — not the action of doing, but the resulting condition that persists. 开 = "to open/turn on" (action); 开着 = "in a turned-on state" (condition). When you walk into a 精装 apartment, the lights are 开着, the AC is 开着, the windows are 开着 — these are all states you observe.',
      'sentence',
      '房间开着空调。\n窗户开着，外面的声音很大。\n门没关，门开着。',
      'Translations: "The AC is on in the room. / The windows are open and outside is loud. / The door isn\'t shut, the door is standing open."',
      [
        { target: 'V + 着 = state', note: 'persistent condition, not an in-progress action' },
        { target: '开着 kāizhe', note: '"in an on/open state" — applies to lights, AC, doors, windows' },
        { target: '关着 guānzhe', note: '"in a closed/off state" — opposite of 开着' },
        { target: '住着 zhùzhe', note: '"in a living-in state" — 那套房子住着一对夫妻 (a couple is living in that apartment now)' },
      ],
      [ACT.grammarZhe],
    ),
    createContentItem(
      'V1 着 V2 — secondary action',
      'V1 zhe V2 — manner pattern',
      'V1 + 着 + V2 pattern: do V2 WHILE in the state of V1. 开着窗户睡觉 = "sleep with the window open" — 开着窗户 is the state, 睡觉 is the main action. This pattern is everywhere in apartment-tour Chinese because you\'re always describing one thing as the condition for another.',
      'sentence',
      '开着窗户睡觉很凉快。\n关着空调睡觉省电。\n带着钱包出门，别忘了。',
      'Translations: "Sleeping with the window open is cool. / Sleeping with the AC off saves electricity. / Take your wallet when you go out, don\'t forget."',
      [
        { target: 'V1 着 (state) + V2 (action)', note: 'do V2 while in V1 state — manner adverbial' },
        { target: '开着窗户 + 睡觉', note: '"open-state window + sleep" = sleep with windows open' },
        { target: '关着空调 + 睡觉', note: '"off-state AC + sleep" = sleep with AC off' },
      ],
      [ACT.grammarZhe],
    ),
    createContentItem(
      'V + 着 vs 正在 + V',
      'state vs action-in-progress',
      'CRITICAL CONTRAST: V + 着 describes a STATE that holds; 正在 + V describes an ACTION currently happening. 他坐着 = "he is in a seated position" (state). 他正在坐下 = "he is in the act of sitting down" (action). For apartment tours, 着 dominates because you\'re describing what\'s ALREADY in place, not what\'s happening live.',
      'sentence',
      '门开着。 (state: the door is open)\n他正在开门。 (action: he is opening the door right now)',
      'The difference matters: 着 is what you walk into and observe; 正在 is what someone is actively doing in front of you.',
      [
        { target: '着 = static state', note: 'the resulting condition; "is open / is on / is hanging there"' },
        { target: '正在 = dynamic action', note: 'the act in progress; "is opening / is turning on / is hanging up"' },
        { target: 'in apartment tours', note: '90% of the time you want 着, because you\'re describing the apartment AS-IS' },
      ],
      [ACT.grammarZhe],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 不光…就… (not just X, even Y)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '不光 X 就 Y',
      'bùguāng X jiù Y — emphatic addition',
      'Use 不光 X 就 Y to add EMPHASIS: "not just X, even Y alone is enough". The first clause introduces a modest claim; the second clause, marked by 就 ("merely / just"), escalates to a more striking one. Beijing renters use this pattern constantly to complain about costs and conditions.',
      'sentence',
      '不光房租贵，就押金都要三万。\n不光位置不好，就上下楼就累死人。',
      'Translations: "Not just the rent is expensive — even the deposit alone is 30,000 RMB. / Not just the location is bad — just going up and down the stairs is exhausting."',
      [
        { target: '不光 X', note: 'the first claim — sets the floor' },
        { target: '就 Y', note: 'the escalation — "even just Y alone is enough"; 就 here means "merely"' },
        { target: 'emphatic register', note: 'colloquial and emphatic — common in complaints, negotiations, and storytelling' },
      ],
      [ACT.grammarBuguangJiu],
    ),
    createContentItem(
      '不光…就… vs 不但…而且…',
      'emphatic vs additive',
      '不但 X 而且 Y ("not only X but also Y") is the textbook additive pattern — both clauses are roughly equal in weight. 不光 X 就 Y is more EMPHATIC and more COLLOQUIAL — the second clause is meant to be MORE striking, often dramatically so. Use 不但…而且… for neutral information; use 不光…就… when you\'re making a point.',
      'sentence',
      '不但贵，而且小。 (neutral: both expensive AND small)\n不光贵，就这点儿大就要八千! (emphatic: not just expensive — eight thousand for THIS little??)',
      'Same facts, different rhetorical force. The 不光…就… version sounds like spoken Beijing complaint.',
      [
        { target: '不但…而且…', note: 'neutral, textbook, both clauses equal weight' },
        { target: '不光…就…', note: 'emphatic, colloquial, second clause is escalation' },
      ],
      [ACT.grammarBuguangJiu],
    ),
    createContentItem(
      '不光…就…  — ordering rule',
      'small claim first, big claim second',
      'The 不光 clause ALWAYS goes first (modest claim), the 就 clause ALWAYS goes second (escalated claim). Reversing them breaks the pattern\'s rhetorical force — it would sound like you mean the opposite of what you intend.',
      'sentence',
      'CORRECT: 不光小，就这点儿空间就要五千。\nWRONG: 就这点儿空间就要五千，不光小。 (does not work as the pattern)',
      'Order is non-negotiable — internalize "modest first, dramatic second".',
      null,
      [ACT.grammarBuguangJiu],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 要不…要不… (alternatives)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '要不 X 要不 Y',
      'yàobù X yàobù Y — either/or alternatives',
      'Use 要不 X 要不 Y to offer TWO ALTERNATIVES — "either X or Y". The 要不 ("if not") functions as a softer, more colloquial alternative to 或者 (huòzhě, "or"). In Beijing speech, 要不…要不… is the natural way to lay out options without making the listener feel pushed.',
      'sentence',
      '要不今天看，要不明天看。\n要不要这套，要不要那套。\n要不押一付三，要不押一付一。',
      'Translations: "Either see it today or tomorrow. / Either take this one or that one. / Either deposit + 3 months or deposit + 1 month."',
      [
        { target: '要不 X', note: 'first option — "either X"' },
        { target: '要不 Y', note: 'second option — "or Y"' },
        { target: 'colloquial register', note: 'softer than 或者; common in spoken Beijing speech' },
      ],
      [ACT.grammarYaobu],
    ),
    createContentItem(
      '要不 (single clause)',
      'yàobù — "how about / why don\'t we"',
      'In single-clause form, 要不 means "how about / why don\'t (we)…" — a polite proposal opener. 要不便宜一点儿? = "How about a little cheaper?" This is the standard polite way to OPEN a negotiation with a Beijing 中介 — softer than 你要便宜一点儿! ("You\'ve got to come down on the price!").',
      'sentence',
      '要不便宜一点儿?\n要不再看看?\n要不明天定?',
      'Translations: "How about a little cheaper? / Why don\'t we look at more? / How about deciding tomorrow?"',
      [
        { target: '要不 + suggestion?', note: 'soft proposal; sounds like "why don\'t we…" in English' },
        { target: 'rising intonation', note: 'always asked with rising intonation — it\'s a suggestion, not a demand' },
        { target: 'negotiation opener', note: 'standard polite opening for any negotiation in spoken Beijing Mandarin' },
      ],
      [ACT.grammarYaobu],
    ),
    createContentItem(
      '要不…要不… vs 还是',
      'proposal vs question',
      'CRITICAL CONTRAST: 要不…要不… is a PROPOSAL of options (you\'re laying out alternatives the listener can choose from). 还是 (háishi, "or" in questions) is used to ASK the listener to PICK ONE ("A 还是 B?"). They look related but function differently — 要不 is your offer; 还是 is your question.',
      'sentence',
      '要不今天看，要不明天看。 (proposal: either is fine, you decide)\n今天看还是明天看? (question: pick one — today or tomorrow?)',
      'In Beijing 中介 conversations, you\'ll use 要不…要不… to offer flexibility, then the 中介 may reply with 还是 to force a choice.',
      [
        { target: '要不…要不…', note: 'proposal — alternatives are offered, no pressure to pick now' },
        { target: '还是 (in questions)', note: 'forced choice — "A or B? — pick now"' },
      ],
      [ACT.grammarYaobu],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '链家房源信息',
      'Liànjiā fángyuán xìnxī',
      'A typical 链家-style apartment listing with all the standard fields. Read the listing aloud and pull out the key numbers — total first-month cost, monthly recurring cost, and any flagged terms.',
      'sentence',
      '【链家房源 · 编号 BJ-08821】\n· 小区: 朝阳区 望京西园四区\n· 户型: 两居室 一厅 一卫\n· 面积: 75 平方米\n· 朝向: 南北通透 (客厅朝南 · 主卧朝南 · 次卧朝北)\n· 楼层: 12层 / 共22层 (高层 · 有电梯)\n· 装修: 精装 · 家具家电齐全 · 拎包入住\n· 房租: 9,500 元/月\n· 押金: 押一付三 (押金 9,500 · 首付 28,500)\n· 中介费: 一个月房租 (9,500)\n· 物业费: 5 元 / 平方米 / 月 = 375 元/月\n· 水电煤网: 自付\n· 暖气费: 一年约 1,800 元\n· 入住时间: 2026.05.20 起',
      'Translation: Lianjia listing #BJ-08821. Wangjing West Garden 4, Chaoyang District. 2BR/1L/1B, 75m². South-north through-flow (LR south, master south, secondary north). 12th floor of 22 (high-rise, elevator). Move-in ready, fully furnished. Rent 9,500/mo. Deposit 9,500 + first 3 months 28,500 = 38,000 at signing. Broker fee 9,500. Property fee 375/mo. Utilities tenant-paid. Heating ~1,800/year. Move-in from 2026.05.20.',
      [
        { target: '南北通透', note: '"south-north through-flow" — premium term meaning the apartment has windows on both north and south sides for cross-ventilation' },
        { target: '高层 + 电梯', note: 'high-rise with elevator — comfort and resale features' },
        { target: '拎包入住', note: '"walk in with a bag" — fully furnished, no setup needed' },
        { target: '首付 28,500', note: 'upfront payment at signing = deposit + 3 months\' rent = 38,000 total cash out' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions matching the listing. Answer each in a short Mandarin sentence — full grammar not required, but the numbers must be exact.',
      'sentence',
      'Q1: 第一个月一共要付多少钱? \nQ2: 朝向怎么样? 主卧朝哪儿?\nQ3: 物业费一年多少?\nQ4: 哪天可以入住?',
      'Translations: Q1: How much for the first month total? / Q2: What\'s the orientation? Which way does the master face? / Q3: How much is the property fee per year? / Q4: What date can you move in?',
      [
        { target: 'A1: 47,500 元', note: '签约首付 38,000 (押金 + 三个月房租) + 中介费 9,500 = 47,500 元 first month total' },
        { target: 'A2: 南北通透，主卧朝南。', note: 'south-north through-flow, master bedroom faces south — the premium orientation' },
        { target: 'A3: 一年 4,500 元。', note: '375 × 12 = 4,500 RMB/year for property fee alone' },
        { target: 'A4: 5月20日起可以入住。', note: 'move-in available from May 20, 2026 onward' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '看三套房',
      'kàn sān tào fáng',
      'A natural 8-turn dialogue between you (the renter) and a 链家 中介 (Mr. Wang) showing three apartments in different parts of Beijing. The dialogue exercises all the patterns from this lesson: V + 着 to describe what you see, 不光…就… to compare downsides, 要不…要不… to offer alternatives, and 押金/物业费/入住 questions.',
      'conversation',
      '中介王: 您好，张先生，今天我给您看三套。第一套在海淀清华大学附近，一居室，精装，房租八千五。\n你: 我看看 — 客厅朝南吗?\n中介王: 朝南，下午阳光很好。窗户开着，您感觉一下。\n你: 不光位置好，就这阳台都让人喜欢。但是八千五有点儿贵。\n中介王: 那看看第二套吧 — 朝阳区，离您公司近，但是是低层，没有电梯。\n你: 没有电梯啊… 我住六楼吗?\n中介王: 五楼。要不咱们再看看第三套，通州的，新房，两居室才七千。\n你: 通州太远了。 要不今天定海淀这套，要不明天再看几个?\n中介王: 您要定海淀这套的话，押金和中介费我尽量帮您说说。\n你: 那我能不能押一付一? 中介费也要不减一点儿?\n中介王: 押一付一我跟房东商量，中介费我可以给您减到七千。',
      'Translation gist: The 中介 shows three apartments — Haidian 1BR (8,500/mo, south-facing), Chaoyang low-rise 1BR (no elevator, 5th floor), and Tongzhou new 2BR (7,000/mo, far). You like Haidian but want to negotiate. You ask for 押一付一 (monthly billing) AND a reduced 中介费. The 中介 offers to ask the landlord about 押一付一 and reduces the 中介费 from 8,500 to 7,000.',
      [
        { target: '窗户开着', note: 'V + 着 state — "the window is open"; observing the apartment AS-IS' },
        { target: '不光位置好，就这阳台都让人喜欢', note: '不光…就… emphasis — "not just the location is good — even the balcony alone is appealing"' },
        { target: '要不今天定，要不明天再看', note: '要不…要不… alternatives — "either decide today, or look more tomorrow"' },
        { target: '押一付一', note: 'monthly billing — the deposit+1 alternative to standard 押一付三' },
        { target: '中介费减到七千', note: 'reduced broker fee — a real, concrete negotiation win' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '决定 + 理由',
      'juédìng + lǐyóu',
      'Practice the decision part: pick ONE of the three apartments shown and give a ONE-sentence reason in Mandarin using a comparison pattern. The format is "I pick X, because Y is better than Z" — concrete and decisive.',
      'sentence',
      '我选海淀那套，因为它朝南，光线好，离地铁也近。 (海淀)\n我选朝阳那套，因为离公司近，每天少走半小时。 (朝阳)\n我选通州那套，因为两居室加新房，性价比最高。 (通州)',
      'Three sample reasons, one for each apartment. Decisiveness is part of the skill — Beijing 中介 expect you to commit.',
      [
        { target: '朝南 + 光线好', note: 'south-facing + good light — the premium reason' },
        { target: '离公司近', note: 'close to work — the practical reason' },
        { target: '性价比 xìngjiàbǐ', note: '"price-performance ratio" — bang for your buck; standard Beijing-shopper reasoning' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '微信模板',
      'Wēixìn múbǎn',
      'A reusable 6-line WeChat message template for contacting a Beijing 中介. Fill in the bracketed slots with your own information — the structure carries the rest, including the polite negotiation opener at the end.',
      'sentence',
      '王经理您好，我是 [姓名]，[公司] 的新员工。\n我想在 [区/小区] 附近租一套 [一居室/两居室]，朝南最好。\n预算: 房租 [金额]/月，[精装/简装] 都可以。\n入住时间: [日期] 之后越快越好。\n开着空调、有电梯的房子优先考虑。\n要不押一付一可以吗? 中介费方面要不也帮我看看?',
      'Translation gist: Hello Mr. Wang, I\'m [Name] from [Company]. Looking for a [type] near [area], south-facing preferred. Budget: [amount]/mo, [tier] OK. Move-in [date]. AC + elevator priority. Can we do 押一付一? Could you look at the broker fee too?',
      [
        { target: '[姓名] + [公司]', note: 'name + employer — Beijing 中介 trust working-professional renters more than students' },
        { target: '[区/小区]', note: 'district or specific compound name — be specific so the 中介 doesn\'t waste your time' },
        { target: '开着空调、有电梯', note: 'V + 着 — describes the apartment AS-IS state you want; pairs with 有电梯 as a feature list' },
        { target: '要不押一付一可以吗?', note: 'polite negotiation opener using 要不 + question particle 可以吗' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 4-6 line WeChat message to a Beijing 中介 using the template. Constraints: use at least one V + 着 (describing apartment state), one 不光…就… (intensified preference or complaint), and one 要不…要不… (offering scheduling alternatives).',
      'sentence',
      '示例: 王经理您好。我叫莎拉，是一家美国公司的工程师。我在朝阳区找一套两居室，最好朝南，窗户能开着通风。不光位置要近地铁，就周末走路十分钟到超市也很重要。预算房租一万二，押一付一可以接受。要不这个周六我去看房，要不下周一也行。中介费麻烦您帮我说说。',
      'Translation gist: Hello Mr. Wang. I\'m Sarah, an engineer at an American company. Looking for a 2BR in Chaoyang, south-facing if possible, with windows that can stay open for ventilation. Not just close to the metro — even walking distance to a supermarket on weekends matters. Budget 12,000/mo, monthly billing OK. Either Saturday or Monday viewing works. Please help with the broker fee.',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '链家 vs 我爱我家',
      'Liànjiā vs Wǒ\'ài-wǒjiā',
      'Two giants dominate Beijing\'s 中介 market. 链家 (Lianjia, "Chain Home") is the larger and more standardized — uniformed agents, fixed 35-100% 中介费, well-maintained listing app (also runs the 自如 Ziru brand of corporate sublets). 我爱我家 (5i5j, "I Love My Home") is the closest competitor, slightly more negotiable on fees. Independent agents exist but are riskier — they can disappear with deposits.',
      'sentence',
      '链家和我爱我家是北京最大的两家中介。',
      '"Lianjia and 5i5j are Beijing\'s two biggest brokerages." Choosing one of these over an independent agent is the single biggest risk reduction a foreign renter can make.',
      [
        { target: '链家 Liànjiā', note: 'largest Beijing 中介; standardized service; runs 自如 sublets; the safe default for first-time renters' },
        { target: '我爱我家 5i5j', note: 'second-largest; slightly more flexible on fees; comparable safety' },
        { target: '独立中介 dúlì zhōngjiè', note: 'independent agents; can be cheaper or shadier; for confident renters with backup' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '押一付三的逻辑',
      'yā yī fù sān de luójí',
      '押一付三 — one month deposit + three months rent upfront — is the Beijing default because landlords historically didn\'t trust monthly tenants (rural-to-urban migration meant tenants could disappear). The 押金 is supposed to be returned at lease end MINUS damages and unpaid bills; the "minus damages" line is where 80% of disputes happen, often resulting in tenants forfeiting 50-100% of the deposit over vague "damage" claims. Document the apartment at move-in with photos.',
      'sentence',
      '押一付三在北京很常见，但是退押金的时候经常有纠纷。',
      '"押一付三 is common in Beijing, but disputes at deposit-return time are frequent." Anchor sentence for any new Beijing renter.',
      [
        { target: '押一付三', note: 'deposit + 3 months upfront; quarterly billing thereafter; the default' },
        { target: '退押金 tuì yājīn', note: 'returning the deposit; happens at 退房; this is where disputes concentrate' },
        { target: '纠纷 jiūfēn', note: 'dispute; usually about what counts as "damage" beyond normal wear' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '北京户口 · 学区房 · 群租',
      'Běijīng hùkǒu · xuéqūfáng · qúnzū',
      'Three Beijing-only rental concepts. 北京户口 (Beijing residence permit) controls who can BUY property in Beijing — renters are exempt, but it shapes the market because non-户口 holders rent indefinitely. 学区房 (school-district apartments) command 30-50% premiums for access to specific 重点小学 (key elementary schools); 学区房 demand has been crushed by the 房住不炒 ("houses for living, not speculation") policy since 2017. 群租 (illegally subdivided units packed 6-10 people, common in cheap suburbs) is officially banned but persists; renters should AVOID 群租 — they get raided.',
      'sentence',
      '北京户口决定买房，学区房决定上学，群租决定生存。',
      '"Beijing residence determines buying, school-district apartments determine schooling, group-rentals determine survival." Cynical but accurate framing of Beijing\'s housing layers.',
      [
        { target: '北京户口 Běijīng hùkǒu', note: 'Beijing residence permit; required to buy property; renters exempt; shapes the market' },
        { target: '学区房 xuéqūfáng', note: 'school-district apartments; 30-50% premium for top elementary school access; demand cooled since 房住不炒' },
        { target: '群租 qúnzū', note: 'illegally subdivided units; 6-10 people in one apartment; officially banned, periodically raided' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '燕郊 · 房住不炒',
      'Yànjiāo · fángzhù-bùchǎo',
      '燕郊 (Yanjiao) is the satellite city just east of Beijing in Hebei province — rents are roughly HALF of Beijing\'s but commutes are 60-90 minutes each way to central Beijing. A real option for budget-conscious workers in eastern Beijing (CBD, 通州). 房住不炒 (fángzhù-bùchǎo, "houses for living, not for speculation") is the national policy slogan since 2017, framing how the government regulates property prices, mortgage rules, and rental controls — every Beijing renter eventually meets this slogan in some news story.',
      'sentence',
      '燕郊房子便宜，但是每天通勤累；房住不炒是政策的口号。',
      '"Yanjiao is cheap but the commute is brutal; \'houses for living, not speculation\' is the policy slogan." Reading Beijing housing news without this slogan is impossible.',
      [
        { target: '燕郊 Yànjiāo', note: 'commuter satellite in Hebei; rents ~50% of Beijing; 60-90 min commute' },
        { target: '房住不炒', note: '"houses for living, not for speculation" — national property policy slogan since 2017' },
        { target: '通勤 tōngqín', note: '"commute"; a daily reality for 燕郊-to-Beijing workers' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 三套房 · 一个决定',
      'rènwù: sān tào fáng · yī gè juédìng',
      'Roleplay a full Beijing apartment search with the AI tutor playing a 链家 中介 named 王经理. You will see three apartments — describe what you see using V + 着, compare them using 不光…就…, propose viewing alternatives using 要不…要不…, ask about 押金/物业费/入住时间, and end the visit by negotiating ONE concrete concession (lower 押金 OR waived 中介费).',
      'conversation',
      '[链家办公室]\n王经理: 您好张先生，今天我给您看三套房。\n你: [说需求 — 区/X居室/预算]\n王经理: 那咱们出发吧。第一套到了，您先看看。\n你: [用 V + 着 描述屋里] (例如: 灯开着 / 窗户开着 / 空调开着)\n王经理: 这套精装，拎包入住。第二套在朝阳，第三套在通州。\n你: [用 不光…就… 比较三套]\n王经理: 您最喜欢哪套?\n你: [选一套 + 一句话理由]\n王经理: 那咱们谈一下细节。\n你: [问 押金 / 物业费 / 入住时间]\n王经理: 押一付三，物业费每月三百，下周一可以入住。\n你: [用 要不 提出 ONE 让步: 押一付一 OR 中介费减半]\n王经理: 我跟房东说一下。',
      'Eight turns of fluent exchange; the AI tutor will adapt to whichever apartment you pick and whichever concession you propose.',
      [
        { target: '说需求', note: 'state your needs — area, X居室, budget, condition tier, move-in date' },
        { target: 'V + 着 描述', note: 'use V + 着 to describe what you observe in each apartment (lights on, windows open, AC running)' },
        { target: '不光…就… 比较', note: 'use 不光…就… to highlight a contrast — "not just expensive, but the deposit alone is huge"' },
        { target: '要不 提让步', note: 'use 要不…可以吗 to politely propose ONE concession; pick deposit OR fee, not both' },
        { target: '签约 + 入住', note: 'closing: confirm 押金, sign 合同, schedule 入住 date' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 应对中介的反推',
      'tiǎozhàn — yìngduì zhōngjiè de fǎntuī',
      'Stretch goal: in the same scene, the 中介 pushes back on your concession ("房东不同意押一付一", "中介费是公司规定的"). Hold your position politely without escalating. Use one of these responses: 那我再考虑一下 (then let me think about it again), 我先看看别的房子 (let me look at other apartments first), or 那要不咱们这个月先看看，下个月再定 (then how about we look more this month and decide next month).',
      'conversation',
      '中介王: 房东不同意押一付一，押一付三是底线。\n你: [选一个回应]\n中介王: 那您看看别的小区?\n你: 要不再看一套，看完一起决定。\n中介王: 好的，那我下午带您去看朝阳那套。',
      '"那要不…" is the Beijing-style polite escalation — you\'re not refusing, you\'re proposing a new alternative. Keeping the relationship warm is part of the negotiation.',
      [
        { target: '我再考虑一下', note: '"let me think it over" — polite postponement; signals you\'re not desperate' },
        { target: '我先看看别的房子', note: '"I\'ll look at other apartments first" — your real leverage; the 中介 may suddenly find flexibility' },
        { target: '那要不…再…', note: 'soft re-propose; keeps the channel open without committing to the unfavorable term' },
        { target: '底线 dǐxiàn', note: '"bottom line" — what the 中介 claims is non-negotiable; sometimes real, sometimes a tactic' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
