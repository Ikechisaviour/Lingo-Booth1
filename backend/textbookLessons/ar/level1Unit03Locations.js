// Level 1 Unit 3 — Locations & Places (Modern Standard Arabic)
// Functions: prepositions of place, naming buildings, asking where, locating self.
// Anchor: King Saud University campus and surrounding Riyadh neighborhood.

const createContentItem = (target, romanization, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization, nativeText: note, pronunciation: romanization,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'ar-l1u3-orientation',
  pronunciation: 'ar-l1u3-pronunciation',
  vocabPlaces: 'ar-l1u3-vocab-places',
  vocabPrepositions: 'ar-l1u3-vocab-prepositions',
  grammarPrepCase: 'ar-l1u3-grammar-prep-case',
  grammarIdafa: 'ar-l1u3-grammar-idafa',
  grammarQuestionAyna: 'ar-l1u3-grammar-question-ayna',
  reading: 'ar-l1u3-reading',
  listening: 'ar-l1u3-listening',
  writing: 'ar-l1u3-writing',
  culture: 'ar-l1u3-culture',
  task: 'ar-l1u3-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: [
      'Name 15+ buildings and public places in MSA — university, library, mosque, market, hospital, post office, café.',
      'Use the eight core prepositions of place (في، على، تحت، فوق، أمام، خلف، بجانب، بين) to describe location.',
      'Ask and answer أين … ؟ ("Where is …?") with proper case marking on the noun after a preposition.',
    ],
    task: 'Picture walking through the King Saud University campus and orienting yourself; by the end of this lesson you can ask for directions and locate any building.',
  },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps in this lesson',
    goals: [
      'Distinguish مَكْتَب maktab (office/desk) from مَكْتَبَة maktaba (library) — same root, different patterns, different gender.',
      'Pronounce جامعة jāmiʿa with clear ع mid-word — not just a glide.',
      'Apply sun-letter assimilation in الشارع ash-shāriʿ (the street) — ش doubled.',
    ],
    task: 'Read each pair side by side and identify root + pattern.',
  },
  { id: ACT.vocabPlaces, section: 'Vocabulary I', title: 'Buildings and public places', goals: ['Memorize 15 public-place nouns with their plurals.', 'Pay attention to the مَفْعَلَة (maktaba, maṭbakha) place-noun pattern.'], task: 'Walk through your mental map and name every place using الـ + noun.' },
  { id: ACT.vocabPrepositions, section: 'Vocabulary II', title: 'Prepositions of place', goals: ['Master 8 spatial prepositions and the case they require (always genitive/jarr).', 'Combine each preposition with a definite noun.'], task: 'Describe the position of 6 objects relative to the table using prepositions.' },
  { id: ACT.grammarPrepCase, section: 'Grammar I', title: 'Prepositions and the genitive case (al-jarr)', goals: ['Apply the genitive case ـِ on any noun after a preposition.', 'Recognize the three cases (raf\', naṣb, jarr) in nominal sentences with prepositions.'], task: 'Take 5 nouns; combine each with في and mark the correct case ending.' },
  { id: ACT.grammarIdafa, section: 'Grammar II', title: 'The إضافة construct (possessive chain)', goals: ['Form a basic إضافة: noun + noun = "X of Y" with NO الـ on the first noun.', 'Read multi-noun chains like باب الفصل ("door of the classroom") and جامعة الملك سعود ("University of King Saud").', 'Understand that the SECOND noun of an إضافة takes the genitive case.'], task: 'Build 5 إضافة chains naming "the X of the Y" using campus locations.' },
  { id: ACT.grammarQuestionAyna, section: 'Grammar III', title: 'أين and the from/to prepositions', goals: ['Use أين ayna "where" + nominal sentence with no copula.', 'Distinguish من ayna "from where" and إلى ayna "to where".'], task: 'Ask and answer 4 location questions about familiar places.' },
  { id: ACT.reading, section: 'Reading', title: 'A campus walk', goals: ['Read a paragraph describing a walk across King Saud University campus.', 'Identify each preposition and case marking.'], task: 'Read aloud and answer 4 location questions.' },
  { id: ACT.listening, section: 'Listening', title: 'Asking for directions', goals: ['Follow a 5-turn directions exchange.', 'Reproduce the exchange with a different destination.'], task: 'Listen to a directions dialogue and act it out.' },
  { id: ACT.writing, section: 'Writing', title: 'Describe your campus', goals: ['Write 5 sentences placing buildings relative to one another using prepositions.', 'Use at least two إضافة chains.'], task: 'Write a 5-sentence description of your real or imagined campus.' },
  { id: ACT.culture, section: 'Culture', title: 'Mosques, souqs, and shared public space', goals: ['Understand the central role of the mosque (المسجد) and the souq (السوق) as community anchors in Arab cities.', 'Use the term حي ḥayy (neighborhood/quarter) for residential areas.'], task: 'Map the cultural anchor points around a typical Arab neighborhood.' },
  { id: ACT.task, section: 'Task', title: 'Asking directions on campus', goals: ['Combine prepositions, إضافة, and questions in a 6-turn directions dialogue.'], task: 'Roleplay asking a stranger for the library at King Saud University.' },
];

const lesson = {
  title: 'Level 1 · Unit 3: أين أنت؟ — Locations and Places',
  category: 'directions', difficulty: 'beginner',
  targetLang: 'ar', nativeLang: 'en', track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'naming-places', label: 'Naming places', goal: 'Identify 15 public buildings with correct article and gender.' },
    { id: 'describing-location', label: 'Describing location', goal: 'Use prepositions + definite noun to place objects in space.' },
    { id: 'asking-directions', label: 'Asking directions', goal: 'Use أين, من أين, إلى أين to navigate a campus.' },
  ],
  relatedPools: ['topic-city', 'topic-school'],
  content: [
    createContentItem('جامعة', 'jāmiʿa', 'University (F, ends in ـة). Plural جامعات jāmiʿāt. Pattern فَاعِلَة. Root ج م ع "gathering".', 'word', 'جامعة الملك سعود في الرياض.', '"King Saud University is in Riyadh." — إضافة construction.', null, [ACT.vocabPlaces]),
    createContentItem('مدرسة', 'madrasa', 'School (F). Plural مدارس madāris. Place-noun pattern مَفْعَلَة from root د ر س.', 'word', 'المدرسة قريبة من البيت.', '"The school is near the house."', null, [ACT.vocabPlaces]),
    createContentItem('مكتبة', 'maktaba', 'Library or bookstore (F). Plural مكتبات maktabāt. Place-noun pattern مَفْعَلَة from root ك ت ب.', 'word', 'المكتبة في الطابق الثاني.', '"The library is on the second floor."', null, [ACT.vocabPlaces]),
    createContentItem('مكتب', 'maktab', 'Office or desk (M). Plural مكاتب makātib. Place-noun pattern مَفْعَل from root ك ت ب.', 'word', 'مكتب الأستاذ على اليمين.', '"The professor\'s office is on the right."', null, [ACT.vocabPlaces]),
    createContentItem('مسجد', 'masjid', 'Mosque (M). Plural مساجد masājid. Place-noun pattern مَفْعِل from root س ج د "prostrating".', 'word', 'المسجد بجانب الجامعة.', '"The mosque is next to the university."', null, [ACT.vocabPlaces]),
    createContentItem('مستشفى', 'mustashfā', 'Hospital (M, but ends in ـى so looks feminine — it is masculine). Plural مستشفيات mustashfayāt. Form X passive participle.', 'word', 'المستشفى الجامعي قريب.', '"The university hospital is close."', null, [ACT.vocabPlaces]),
    createContentItem('سوق', 'sūq', 'Market or souq (M, can be F regionally). Plural أسواق aswāq. The traditional Arab market.', 'word', 'السوق مزدحم اليوم.', '"The market is crowded today."', null, [ACT.vocabPlaces]),
    createContentItem('مطعم', 'maṭʿam', 'Restaurant (M). Plural مطاعم maṭāʿim. Place-noun pattern مَفْعَل from root ط ع م "tasting/food".', 'word', 'المطعم في الطابق الأرضي.', '"The restaurant is on the ground floor."', null, [ACT.vocabPlaces]),
    createContentItem('مقهى', 'maqhā', 'Café (M, ends in ـى). Plural مقاهٍ maqāhin. From قَهْوَة "coffee".', 'word', 'نلتقي في المقهى.', '"We meet at the café."', null, [ACT.vocabPlaces]),
    createContentItem('بنك', 'bank', 'Bank (M). Plural بنوك bunūk. Loanword.', 'word', 'البنك مفتوح صباحًا.', '"The bank is open in the morning."', null, [ACT.vocabPlaces]),
    createContentItem('مكتب البريد', 'maktab al-barīd', '"Post office" — an إضافة: مكتب "office" + البريد "the mail". The first noun lacks الـ.', 'word', 'مكتب البريد بعيد قليلًا.', '"The post office is a bit far."', null, [ACT.vocabPlaces]),
    createContentItem('شارع', 'shāriʿ', 'Street (M). Plural شوارع shawāriʿ. The pharyngeal ع at the end.', 'word', 'الشارع طويل وواسع.', '"The street is long and wide."', null, [ACT.vocabPlaces]),
    createContentItem('ميدان', 'maydān', 'Square or plaza (M). Plural ميادين mayādīn. Common in city names (Maydan at-Tahrir = Tahrir Square).', 'word', 'ميدان التحرير في القاهرة.', '"Tahrir Square is in Cairo."', null, [ACT.vocabPlaces]),
    createContentItem('حي', 'ḥayy', 'Neighborhood or quarter (M). Plural أحياء aḥyāʾ. The pharyngeal ح at the start.', 'word', 'الحي الجديد جميل.', '"The new neighborhood is beautiful."', null, [ACT.vocabPlaces]),
    createContentItem('بيت', 'bayt', 'House or home (M). Plural بيوت buyūt. Pattern فَيْل.', 'word', 'بيتي بعيد من الجامعة.', '"My house is far from the university."', null, [ACT.vocabPlaces]),
    createContentItem('شقة', 'shaqqa', 'Apartment (F). Plural شقق shuqaq. Shadda on ق — held twice.', 'word', 'الشقة في الطابق الخامس.', '"The apartment is on the fifth floor."', null, [ACT.vocabPlaces]),

    // Prepositions
    createContentItem('في', 'fī', 'Preposition "in / inside / at". Always followed by a noun in the genitive case (ـِ).', 'sentence', 'الكتاب في الحقيبةِ.', '"The book is in the bag." — note kasra on الحقيبة (genitive).', null, [ACT.vocabPrepositions]),
    createContentItem('على', 'ʿalā', 'Preposition "on / upon / above-touching". The pharyngeal ع at the start. Always genitive after.', 'sentence', 'القلم على الطاولةِ.', '"The pen is on the table."', null, [ACT.vocabPrepositions]),
    createContentItem('تحت', 'taḥt', 'Preposition "under / beneath". The pharyngeal ح in the middle.', 'sentence', 'الحقيبة تحت الكرسيِّ.', '"The bag is under the chair."', null, [ACT.vocabPrepositions]),
    createContentItem('فوق', 'fawqa', 'Preposition "above / over (not touching)". Distinguishes from على (touching).', 'sentence', 'الصورة فوق الباب.', '"The picture is above the door."', null, [ACT.vocabPrepositions]),
    createContentItem('أمام', 'amām(a)', 'Preposition "in front of". The opposite of خلف.', 'sentence', 'السبورة أمام الطلابِ.', '"The blackboard is in front of the students."', null, [ACT.vocabPrepositions]),
    createContentItem('خلف', 'khalfa', 'Preposition "behind". Synonym ورا warā in colloquial.', 'sentence', 'الحديقة خلف البيتِ.', '"The garden is behind the house."', null, [ACT.vocabPrepositions]),
    createContentItem('بجانب', 'bi-jānib', 'Preposition "next to / beside". Literally "by the side of". Synonym قرب qurb (near).', 'sentence', 'المسجد بجانب الجامعةِ.', '"The mosque is next to the university."', null, [ACT.vocabPrepositions]),
    createContentItem('بين', 'bayna', 'Preposition "between / among". Takes a pair: بين X و Y.', 'sentence', 'البنك بين المكتبةِ والمستشفى.', '"The bank is between the library and the hospital."', null, [ACT.vocabPrepositions]),
    createContentItem('قرب / قريب من', 'qurba / qarīb min', '"Near / close to". قرب is a preposition; قريب من is adj + preposition.', 'sentence', 'المقهى قريب من الجامعة.', '"The café is close to the university."', null, [ACT.vocabPrepositions]),
    createContentItem('بعيد عن', 'baʿīd ʿan', '"Far from". Adj + preposition عن "from". The pharyngeal ع twice in this phrase.', 'sentence', 'بيتي بعيد عن العمل.', '"My house is far from work."', null, [ACT.vocabPrepositions]),
    createContentItem('من / إلى', 'min / ilā', 'Directional prepositions: "from" / "to". Critical for motion: أذهب من البيت إلى الجامعة.', 'sentence', 'أمشي من البيتِ إلى الجامعةِ.', '"I walk from the house to the university."', null, [ACT.vocabPrepositions]),

    // Grammar
    createContentItem('حالة الجر', 'ḥālat al-jarr', 'The genitive case (al-jarr) — marked by kasra ـِ (definite) or tanwin al-kasr ـٍ (indefinite). Required on any noun after a preposition OR as the second noun of an إضافة.', 'sentence', 'في الجامعةِ (def, kasra) · في جامعةٍ (indef, tanwin kasr)', 'In rapid speech the case marking is often dropped; in MSA writing it is required.', [
      { target: 'after في، على، إلى، من …', note: 'all prepositions trigger genitive on following noun' },
      { target: 'second noun of إضافة', note: 'in noun + noun construct, the second noun is genitive' },
    ], [ACT.grammarPrepCase]),
    createContentItem('الإضافة', 'al-iḍāfa', 'The "annexation" construct — Arabic\'s way of expressing "X of Y / Y\'s X". Two adjacent nouns with NO الـ on the first and the second in the genitive case.', 'sentence', 'كتاب الطالبِ kitāb aṭ-ṭālib ("the student\'s book")\nباب الفصلِ bāb al-faṣl ("the door of the classroom")\nجامعة الملكِ سعودٍ jāmiʿat al-Malik Suʿūd ("University of King Saud")', 'A chain can have 3+ nouns: only the LAST gets الـ; intermediate nouns lack it and the whole chain reads from left as possessor → possessee.', [
      { target: 'first noun (مضاف)', note: 'no الـ; takes the case required by the larger sentence' },
      { target: 'second noun (مضاف إليه)', note: 'genitive case; can have الـ or be indefinite' },
      { target: 'definiteness', note: 'definiteness of the whole chain comes from the LAST noun' },
    ], [ACT.grammarIdafa]),
    createContentItem('أين / من أين / إلى أين', 'ayna / min ayna / ilā ayna', 'Three location questions: "where?", "from where?", "to where?". أين takes the case required by the sentence; the prepositions من and إلى add motion direction.', 'sentence', 'أين الكتاب؟ — في المكتبة.\nمن أين أنت؟ — من مصر.\nإلى أين تذهب؟ — إلى الجامعة.', 'All three appear constantly in directions and travel conversations.', null, [ACT.grammarQuestionAyna]),

    // Reading
    createContentItem('في الجامعة', 'fī l-jāmiʿa', 'A paragraph describing a walk across King Saud University campus, exercising all the prepositions and إضافة patterns from this unit.', 'sentence', 'أنا في جامعة الملك سعود. الجامعة كبيرة جدًا. مكتبة الجامعة بجانب كلية الهندسة. أمام المكتبة حديقة جميلة، وخلف المكتبة مسجد كبير. المقهى بين كلية الطب وكلية العلوم. أحب أن أمشي في الجامعة بين المحاضرات.', 'Translation: "I am at King Saud University. The university is very big. The university library is next to the College of Engineering. In front of the library is a beautiful garden, and behind the library is a big mosque. The café is between the College of Medicine and the College of Sciences. I love to walk in the university between lectures."', [
      { target: 'جامعة الملك سعود', note: 'three-noun إضافة: jaamiʿat + al-Malik + Suʿuud' },
      { target: 'بين الكليتين', note: 'بين with two definite nouns connected by و' },
      { target: 'بين المحاضرات', note: '"between the lectures" — time-sense of بين' },
    ], [ACT.reading]),

    // Listening
    createContentItem('سؤال عن الطريق', 'suʾāl ʿan aṭ-ṭarīq', 'A 5-turn directions exchange. The asker is lost; the responder gives a precise route using prepositions.', 'conversation', 'الزائر: عفوًا، أين مكتبة الجامعة، من فضلك؟\nالطالب: المكتبة قريبة. اذهب مستقيمًا إلى الميدان.\nالزائر: ثم؟\nالطالب: ثم اتجه يسارًا. ستجد المكتبة بجانب مسجد الجامعة.\nالزائر: شكرًا جزيلًا.\nالطالب: عفوًا.', 'مستقيم mustaqīm "straight"; يسارًا yasāran "leftward"; ستجد sa-tajid "you will find" (future prefix سـ).', [
      { target: 'اذهب مستقيمًا', note: 'imperative "go" + adverb "straight"' },
      { target: 'اتجه يسارًا / يمينًا', note: '"turn left / right" — common direction commands' },
      { target: 'ستجد sa-tajid', note: 'future of "you find" — سـ + present' },
    ], [ACT.listening]),

    // Writing
    createContentItem('قالب الكتابة', 'qālab al-kitāba', 'Template: 5 sentences placing buildings using prepositions. Use at least two إضافة chains.', 'sentence', 'مثال: بيتي قريب من جامعة الملك سعود. خلف بيتي حديقة كبيرة. بجانب الحديقة مسجد. أمام المسجد سوق صغير. في السوق مقهى رائع.', 'Translation: "My house is close to King Saud University. Behind my house is a big garden. Next to the garden is a mosque. In front of the mosque is a small market. In the market is a wonderful café."', null, [ACT.writing]),

    // Culture
    createContentItem('المسجد والسوق', 'al-masjid wa-s-sūq', 'In traditional Arab urbanism, the mosque (المسجد) and the souq (السوق) are the twin anchors of community life. The mosque sets the daily rhythm (5 prayers); the souq is the social and economic heart. Modern cities like Riyadh and Cairo retain this pattern even alongside malls (مول mawl).', 'sentence', 'المسجد والسوق هما قلب الحي.', '"The mosque and the souq are the heart of the neighborhood."', [
      { target: 'المسجد', note: 'community anchor; the call to prayer (الأذان) marks the rhythm of the day' },
      { target: 'السوق', note: 'traditional market; bargaining (المساومة) is expected' },
      { target: 'المول / المركز التجاري', note: 'modern shopping mall; coexists with the souq in big cities' },
    ], [ACT.culture]),

    // Task
    createContentItem('المهمة — السؤال عن الطريق في الجامعة', 'al-mahamma — as-suʾāl ʿan aṭ-ṭarīq fī l-jāmiʿa', '6-turn dialogue: ask a stranger on King Saud University campus for the library. Use prepositions, إضافة, and polite question forms.', 'conversation', 'أنت: عفوًا، يا أخي، أين [destination]، من فضلك؟\nالغريب: [response with directions]\nأنت: [thank, clarify with another preposition question]\nالغريب: [further direction]\nأنت: شكرًا جزيلًا، يا أخي.\nالغريب: عفوًا، مع السلامة.', 'يا أخي / يا أختي — friendly vocative for a stranger your age ("my brother / my sister").', [
      { target: 'يا أخي / يا أختي', note: 'friendly stranger-vocative; same age peer' },
      { target: 'هل من الممكن أن …؟', note: 'polite request opener "is it possible that …?"' },
    ], [ACT.task]),
  ],
};

module.exports = lesson;
