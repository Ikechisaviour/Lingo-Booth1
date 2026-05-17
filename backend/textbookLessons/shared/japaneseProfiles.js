const defaultExpressionPractice = (slug) => [
  { id: `${slug}-main`, label: 'Using the main pattern', goal: 'Use the central pattern naturally in a personally relevant answer.' },
  { id: `${slug}-extend`, label: 'Extending the answer', goal: 'Add one reason, contrast, or example so the answer sounds lived-in rather than memorized.' },
  { id: `${slug}-repair`, label: 'Repairing a likely mistake', goal: 'Notice one nearby Japanese form learners often confuse with this pattern and choose the better option.' },
];

const featureLibraries = [
  {
    match: /Greetings|Self-Introduction|あいさつ|自己紹介/i,
    items: [
      ['はじめまして / よろしくお願いします', 'Japanese first meetings are not just greetings; they establish the relationship. はじめまして opens the first encounter, while よろしくお願いします closes it by asking for goodwill in the relationship ahead.', 'はじめまして。田中です。よろしくお願いします。', 'The pair frames the social ritual from entry to relationship-setting.'],
      ['です / ます', 'Beginner-safe polite Japanese is not “extra formal”; it is the ordinary default with strangers, teachers, and service staff.', '私は学生です。毎日勉強します。', 'Polite endings let a learner sound safe before they learn when plain style is appropriate.'],
    ],
  },
  {
    match: /Foundation|Sound|Kana|Reading/i,
    items: [
      ['は / へ / を', 'Particles can be written with one kana and pronounced another way in grammar use: は as wa, へ as e, を as o. Reading Japanese means learning word function as well as symbol sound.', '私は学校へ行きます。', 'The sentence only sounds natural when the particle readings are grammatical, not alphabetic.'],
      ['っ / ー / ん', 'Small っ, long vowels, and moraic ん change timing in Japanese. Rhythm is counted by mora, so a learner who rushes them can accidentally change the word.', 'きて / きって / きいて', 'The contrasts are timing contrasts, not decorative spelling.'],
    ],
  },
  {
    match: /Locations|Going Places|Transportation|行きます|あります|います/i,
    items: [
      ['あります / います', 'Japanese separates existence by animacy: あります for inanimate things, います for people and animals.', '机の上に本があります。教室に学生がいます。', 'The noun type determines the existence verb.'],
      ['に / へ / で', 'Destination, direction, and means/location are carried by different particles. に marks a destination or point, へ emphasizes direction, and で often marks means or place of action.', '駅へ行きます。電車で行きます。図書館で勉強します。', 'A small particle swap changes the sentence role.'],
    ],
  },
  {
    match: /Daily Routines|Past Activities|〜ている|Tense|Aspect/i,
    items: [
      ['〜ています', 'The ている form can describe ongoing action, habit, or resultant state depending on the verb and context. It is broader than the English progressive.', '今勉強しています。毎朝走っています。結婚しています。', 'One visible form covers several aspectual jobs.'],
      ['〜ました / 〜ませんでした', 'Polite past forms are built regularly, but learners still need to hear their rhythm as whole endings rather than translating English tense word by word.', '昨日映画を見ました。学校へ行きませんでした。', 'Past reporting becomes fluent when the endings are automatic.'],
    ],
  },
  {
    match: /Shopping|Ordering Food|counters|いくら|お願いします/i,
    items: [
      ['一つ / 二つ / 三つ', 'Japanese counters are not an optional flourish. The general つ-series is useful early, but many nouns later require more specific counters.', 'りんごを二つください。', 'Quantity language is part of the noun phrase, not an afterthought.'],
      ['ください / お願いします', 'Both can appear in requests, but お願いします often sounds softer or more service-natural in ordering contexts.', '水をください。コーヒーをお願いします。', 'The choice shifts tone even when the requested object is the same.'],
    ],
  },
  {
    match: /Ability|Potential|できます/i,
    items: [
      ['日本語ができます', 'With できます, the skill area commonly takes が rather than を. Ability sentences often reorganize the argument structure from what English speakers expect.', '日本語が少しできます。', 'The skill is what is available, not a direct object.'],
      ['読めます / 行けます', 'Potential verb forms express ability or possibility directly from the verb. Learners need both noun + できます and potential verbs in their toolkit.', '漢字が読めます。明日は行けません。', 'Japanese uses more than one route to “can.”'],
    ],
  },
  {
    match: /Phone|Message|Workplace|敬語|Honorific/i,
    items: [
      ['いらっしゃいます / 伺います', 'Japanese honorific and humble language changes according to whose action is being described. Respecting the listener is not the same as merely adding politeness.', '先生はいらっしゃいますか。明日伺います。', 'One raises the other person; the other lowers the speaker.'],
      ['お疲れさまです', 'Workplace Japanese contains relationship-maintenance formulas that do not map neatly onto one English sentence. お疲れさまです can greet, acknowledge, or close a work interaction.', 'お疲れさまです。先に失礼します。', 'The phrase is social glue, not literal commentary on fatigue.'],
    ],
  },
  {
    match: /Connectors|文をつなぐ|Review/i,
    items: [
      ['しかし / そのため / 一方で', 'Japanese discourse markers organize reasoning and register. They are not interchangeable with casual でも if the task is formal explanation or writing.', '便利です。しかし、費用がかかります。そのため、計画が必要です。', 'The connector choice shapes the argument voice.'],
      ['〜だけでなく / 〜一方で', 'Advanced Japanese often gains precision through paired frames that balance addition and contrast.', '便利なだけでなく、安全です。一方で、費用もかかります。', 'Pairing patterns lets one sentence carry more careful reasoning.'],
    ],
  },
  {
    match: /Resemblance|よう|みたい|らしい|Modifiers|名詞を詳しくする/i,
    items: [
      ['ようです / みたいです / らしいです', 'Japanese has several “seems/like” forms with different evidence sources and registers. They are related, not interchangeable.', '雨が降るようです。雨みたいです。雨らしいです。', 'The form hints at evidence, distance, and conversational tone.'],
      ['昨日買った本', 'Japanese relative clauses come before the noun without a relative pronoun. Long noun modifiers are normal, but the learner must keep the final noun in view.', '昨日買った本を読みました。', 'The clause modifies the noun before the listener hears it.'],
    ],
  },
];

const sourcePools = (lesson) => lesson.relatedPools?.length ? lesson.relatedPools : [`topic-${lesson.category || 'daily-life'}`];

const matchingFeatureItems = (lesson) => {
  // Match enrichment notes from the authored lesson identity, not arbitrary
  // substrings inside examples. Japanese inflection makes broad substring
  // matching especially risky: いらっしゃいます contains います, but an
  // honorific lesson should not accidentally inherit a beginner existence note.
  const haystack = lesson.title;
  return featureLibraries
    .filter((feature) => feature.match.test(haystack))
    .flatMap((feature) => feature.items.map(([target, note, example, exampleNote]) => ({
      target,
      note,
      example,
      exampleNote,
    })));
};

const makeJapaneseProfile = (lessonId, lesson) => {
  const slug = `ja-${lessonId.toLowerCase()}`;
  const first = lesson.content?.[0] || {};
  const second = lesson.content?.[1] || first;
  const last = lesson.content?.[lesson.content.length - 1] || second;
  const overview = lesson.activities?.[0]?.goals?.[0]
    || `Use the central skill of ${lesson.title} accurately in context.`;
  const task = lesson.activities?.[lesson.activities.length - 1]?.task
    || `Complete one connected exchange that demonstrates the main skill of ${lesson.title}.`;

  return {
    slug,
    overview,
    task,
    orientationAnchor: '学習目標',
    orientationExample: '学習目標',
    orientationExampleNote: `The whole lesson is built toward this outcome: ${task}`,
    pronunciationGoal: 'Keep mora timing, particle pronunciation, vowel length, and pitch-sensitive contrasts clear enough that the Japanese remains easy to parse.',
    pronunciationAnchor: '音の確認',
    pronunciationExample: first.exampleTarget || first.targetText,
    pronunciationExampleNote: first.exampleNative || first.nativeText,
    vocabularyGoal: `Use the key language of ${lesson.title} with the register and setting that the lesson requires.`,
    vocabularyAnchor: first.targetText,
    vocabularyExample: first.exampleTarget || first.targetText,
    vocabularyExampleNote: first.exampleNative || first.nativeText,
    secondaryVocabularyGoal: `Distinguish the nearby wording choices that make ${lesson.title} sound precise rather than merely understandable.`,
    secondaryVocabularyAnchor: second.targetText,
    secondaryVocabularyExample: second.exampleTarget || second.targetText,
    secondaryVocabularyExampleNote: second.exampleNative || second.nativeText,
    grammarGoal: overview,
    grammarAnchor: first.targetText,
    grammarExample: first.exampleTarget || first.targetText,
    grammarExampleNote: first.exampleNative || first.nativeText,
    secondaryGrammarGoal: `Contrast the main pattern in ${lesson.title} with one nearby Japanese form so the learner can avoid literal translation.`,
    secondaryGrammarAnchor: second.targetText,
    secondaryGrammarExample: second.exampleTarget || second.targetText,
    secondaryGrammarExampleNote: second.exampleNative || second.nativeText,
    readingAnchor: '読解モデル',
    readingExample: last.exampleTarget || last.targetText,
    readingExampleNote: last.exampleNative || last.nativeText,
    listeningAnchor: '会話モデル',
    listeningExample: last.exampleTarget || last.targetText,
    listeningExampleNote: last.exampleNative || last.nativeText,
    writingAnchor: '作文練習',
    writingExample: first.exampleTarget || first.targetText,
    writingExampleNote: 'Adapt the model to your own life while keeping the lesson pattern intact.',
    cultureGoal: 'Notice the register, relationship, or social expectation that changes how this Japanese is used in real interaction.',
    cultureAnchor: '使い方と場面',
    cultureExample: second.exampleTarget || second.targetText,
    cultureExampleNote: second.exampleNative || second.nativeText,
    taskAnchor: '最終タスク',
    taskExample: last.exampleTarget || last.targetText,
    taskExampleNote: task,
    errorAnchor: 'よくある間違い',
    errorGoal: `Watch for the literal-translation mistake most likely in ${lesson.title}; Japanese often carries meaning through particles, omission, politeness, aspect, or word order that another language may leave implicit.`,
    errorExample: second.exampleTarget || second.targetText,
    errorExampleNote: second.exampleNative || second.nativeText,
    registerAnchor: '文体',
    registerGoal: 'Check whether the situation calls for plain, polite, honorific, humble, casual, or service-register Japanese before choosing the final wording.',
    registerExample: first.exampleTarget || first.targetText,
    registerExampleNote: first.exampleNative || first.nativeText,
    fluencyAnchor: '流暢さ',
    fluencyGoal: 'Say the idea as one connected Japanese message rather than as separate translated fragments.',
    fluencyExample: last.exampleTarget || last.targetText,
    fluencyExampleNote: last.exampleNative || last.nativeText,
    transferAnchor: '応用',
    transferGoal: 'Move the lesson pattern into a new personal situation while preserving the same grammatical job and social tone.',
    transferExample: first.exampleTarget || first.targetText,
    transferExampleNote: 'The learner should be able to leave the model behind without losing the form.',
    recallAnchor: '思い出す',
    recallGoal: 'Retrieve the key form from memory before rereading the model; retrieval is where durable control begins.',
    recallExample: first.targetText,
    recallExampleNote: first.nativeText,
    extensionAnchor: '広げる',
    extensionGoal: 'Extend the answer with one cause, contrast, time marker, or social detail so the language becomes useful beyond a single memorized line.',
    extensionExample: last.exampleTarget || last.targetText,
    extensionExampleNote: 'A strong answer usually says one useful thing more than the minimum.',
    comparisonAnchor: '対比',
    comparisonGoal: `Compare the central form in ${lesson.title} with the closest nearby alternative so the learner knows not only what to say, but why this wording wins here.`,
    comparisonExample: second.exampleTarget || second.targetText,
    comparisonExampleNote: second.exampleNative || second.nativeText,
    pronunciationRepairAnchor: '発音修正',
    pronunciationRepairGoal: 'Repair the one mora, particle reading, vowel-length, or rhythm detail most likely to blur this Japanese lesson in fast speech.',
    pronunciationRepairExample: first.exampleTarget || first.targetText,
    pronunciationRepairExampleNote: first.exampleNative || first.nativeText,
    dialogueVariationAnchor: '会話の変化',
    dialogueVariationGoal: 'Change one participant, one setting, and one detail while keeping the lesson form natural.',
    dialogueVariationExample: last.exampleTarget || last.targetText,
    dialogueVariationExampleNote: last.exampleNative || last.nativeText,
    sentenceBuildingAnchor: '文づくり',
    sentenceBuildingGoal: 'Build the sentence in layers: anchor phrase first, particle or grammar carrier next, then the detail that makes it personal.',
    sentenceBuildingExample: first.exampleTarget || first.targetText,
    sentenceBuildingExampleNote: first.exampleNative || first.nativeText,
    miniQuizAnchor: 'すぐ確認',
    miniQuizGoal: 'Choose the better of two nearby forms and say aloud what clue made the decision.',
    miniQuizExample: second.exampleTarget || second.targetText,
    miniQuizExampleNote: second.exampleNative || second.nativeText,
    reflectionAnchor: '振り返り',
    reflectionGoal: 'Name the one feature from this lesson that would most easily betray literal translation if ignored.',
    reflectionExample: last.exampleTarget || last.targetText,
    reflectionExampleNote: last.exampleNative || last.nativeText,
    expressionPractice: defaultExpressionPractice(slug),
    relatedPools: sourcePools(lesson),
    featureItems: matchingFeatureItems(lesson),
  };
};

module.exports = {
  makeJapaneseProfile,
  featureLibraries,
  matchingFeatureItems,
};
