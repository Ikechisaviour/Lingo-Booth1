// Level 2 Adult Unit 6 — Dormitory/Apartment Life (English)
// Functions: roommate communication, house rules, complaints, repairs.

const createContentItem = (
  target, ipa, note, type = 'word',
  example = '', exampleNote = '', breakdown = null, activityIds = [],
) => ({
  type, activityIds,
  targetText: target, romanization: ipa, nativeText: note, pronunciation: ipa,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.english, korean: b.target, english: b.english })) } : {}),
});

const ACT = {
  orientation: 'en-l2au6-orientation',
  pronunciation: 'en-l2au6-pronunciation',
  vocabularyHome: 'en-l2au6-vocab-home',
  vocabularyRules: 'en-l2au6-vocab-rules',
  grammarRequest: 'en-l2au6-grammar-request',
  grammarComplaint: 'en-l2au6-grammar-complaint',
  reading: 'en-l2au6-reading',
  listening: 'en-l2au6-listening',
  writing: 'en-l2au6-writing',
  culture: 'en-l2au6-culture',
  task: 'en-l2au6-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: ['Communicate house rules with roommates.', 'Make polite repair / cleaning requests.', 'Politely raise complaints about noise, dishes, or guests.', 'Report a broken appliance to a landlord.'],
    task: 'Picture telling your roommate the kitchen sink is broken and dishes have been piling up.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Home phrases',
    goals: ['Pronounce "roommate" /ˈruːmmeɪt/ — note double "m".', '"Cluttered" /ˈklʌtərd/, "messy" /ˈmɛsi/.', 'Reduce "got to" → "gotta".'],
    task: 'Read 3 home phrases aloud.' },
  { id: ACT.vocabularyHome, section: 'Vocabulary I', title: 'Home + chores',
    goals: ['Use roommate, landlord, lease, deposit, rent, utilities, chores, dishes, vacuum, laundry.'],
    task: 'List 5 weekly chores.' },
  { id: ACT.vocabularyRules, section: 'Vocabulary II', title: 'House rules + issues',
    goals: ['Use quiet hours, guests, smoking, pets, locks, repairs, leak, broken, clogged.'],
    task: 'List 5 typical apartment rules.' },
  { id: ACT.grammarRequest, section: 'Grammar I', title: 'Polite requests',
    goals: ['"Could you + V?" / "Would you mind + V-ing?"', '"It would be great if you could + V".'],
    task: 'Make 3 polite requests.' },
  { id: ACT.grammarComplaint, section: 'Grammar II', title: 'Polite complaints',
    goals: ['"I noticed that + S + V" — soft observation.', '"It\'s been bothering me that…" — gentle complaint.', '"Could we talk about + N?" — open conversation.'],
    task: 'Raise 3 complaints politely.' },
  { id: ACT.reading, section: 'Reading and Speaking', title: 'Lease agreement excerpt',
    goals: ['Read a basic lease clause.'],
    task: 'Identify your obligations.' },
  { id: ACT.listening, section: 'Listening and Speaking', title: 'Roommate conversation',
    goals: ['Follow a roommate-issue conversation.'],
    task: 'Reproduce with your own scenario.' },
  { id: ACT.writing, section: 'Writing', title: 'Landlord repair email',
    goals: ['Write a 5-line email to landlord about a broken appliance.'],
    task: 'Write your own email.' },
  { id: ACT.culture, section: 'Culture Note', title: 'US/UK rental + dorm culture',
    goals: ['Understand security deposit (1-2 months rent).', 'Know "quiet hours" and "guest policies".', 'Roommate Bill of Rights / shared-living norms.'],
    task: 'Compare with rental in your country.' },
  { id: ACT.task, section: 'Task', title: 'Roommate negotiation',
    goals: ['Combine request + complaint + agreement.'],
    task: 'Roleplay negotiating dishes + quiet hours.' },
];

const lesson = {
  title: 'Level 2 (Workplace) · Unit 6: Could we talk? — Dorm & Apartment Life',
  category: 'business',
  difficulty: 'intermediate',
  targetLang: 'en', nativeLang: 'en',
  track: 'textbook', lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'polite-request-en', label: 'Polite request', goal: 'Use "Could you / Would you mind".' },
    { id: 'polite-complaint-en', label: 'Polite complaint', goal: 'Use "I noticed that / It\'s been bothering me".' },
    { id: 'landlord-email-en', label: 'Landlord email', goal: 'Concise repair request email.' },
  ],
  relatedPools: ['topic-society'],
  content: [
    createContentItem('Lesson goal', 'dorm + apartment life', 'By end: communicate rules, request fixes, complain politely, report to landlord.', 'word', 'Functions: request · complain · negotiate · report.', 'Four shared-living micro-skills.', null, [ACT.orientation]),
    createContentItem('Real-world scenario', 'roommate dishes + leak', 'Your roommate has been leaving dishes in the sink for a week, AND now the kitchen faucet is leaking onto the floor. You need to politely raise both issues.', 'word', 'You: "Hey, could we chat? I\'ve noticed dishes piling up, and the faucet started leaking last night."', 'A typical shared-living moment.', null, [ACT.orientation]),

    createContentItem('roommate /ˈruːmmeɪt/', '/ˈruːmmeɪt/', 'Double "m" — emphasize.', 'word', 'My roommate is great.', 'UK: "flatmate".', null, [ACT.pronunciation]),
    createContentItem('cluttered / messy', '/ˈklʌtərd/ /ˈmɛsi/', 'Disorganized / dirty.', 'word', 'The kitchen is cluttered.', 'Cluttered = too much stuff; messy = dirty/disorganized.', null, [ACT.pronunciation]),
    createContentItem('"gotta" → /ˈɡɒtə/', '/ˈɡɒtə/', 'Reduced "got to" in casual.', 'word', 'I gotta vacuum tonight.', 'Casual only.', null, [ACT.pronunciation]),

    createContentItem('roommate / flatmate', '/ˈruːmmeɪt/', 'shared-housing peer', 'word', 'I live with two roommates.', 'US: "roommate". UK: "flatmate".', null, [ACT.vocabularyHome]),
    createContentItem('landlord', '/ˈlændˌlɔːrd/', 'property owner', 'word', 'I emailed the landlord.', 'Female form: "landlady" (older).', null, [ACT.vocabularyHome]),
    createContentItem('lease', '/liːs/', 'rental contract', 'word', 'Our lease is 12 months.', 'Verb + noun. "Sign a lease".', null, [ACT.vocabularyHome]),
    createContentItem('security deposit', '/sɪˈkjʊərəti dɪˈpɒzɪt/', 'refundable upfront fee', 'word', 'The deposit is one month\'s rent.', 'Returned if no damage.', null, [ACT.vocabularyHome]),
    createContentItem('rent / utilities', '/rɛnt/ /juːˈtɪlətiz/', 'monthly housing / power+water', 'word', 'Rent is $1,500; utilities about $150.', 'Utilities = electricity, water, gas, internet.', null, [ACT.vocabularyHome]),
    createContentItem('chores', '/tʃɔːrz/', 'household tasks', 'word', 'We rotate chores weekly.', 'Plural.', null, [ACT.vocabularyHome]),
    createContentItem('do the dishes / vacuum / laundry', '/duː ðə ˈdɪʃɪz/', 'common chores', 'word', 'I\'ll do the dishes tonight.', 'All take "do" as verb.', null, [ACT.vocabularyHome]),

    createContentItem('quiet hours', '/ˈkwaɪət aʊərz/', 'noise limits', 'word', 'Quiet hours are 11 PM to 7 AM.', 'Common in dorms / apartments.', null, [ACT.vocabularyRules]),
    createContentItem('guests / visitors', '/ɡɛsts/ /ˈvɪzɪtərz/', 'people staying over', 'word', 'Overnight guests need approval.', 'Often has a policy.', null, [ACT.vocabularyRules]),
    createContentItem('no smoking / no pets', '/noʊ ˈsmoʊkɪŋ/', 'common restrictions', 'word', 'This is a no-smoking building.', 'Common in modern leases.', null, [ACT.vocabularyRules]),
    createContentItem('leak / clog', '/liːk/ /klɒɡ/', 'water issues', 'word', 'There\'s a leak under the sink. — The drain is clogged.', 'Common reasons to call the landlord.', null, [ACT.vocabularyRules]),
    createContentItem('broken / out of order', '/ˈbroʊkən/ /aʊt ɒv ˈɔːrdər/', 'not working', 'word', 'The dryer is broken. — The elevator is out of order.', '"Out of order" — formal sign language.', null, [ACT.vocabularyRules]),
    createContentItem('maintenance request', '/ˈmeɪntənəns rɪˈkwɛst/', 'formal repair ask', 'word', 'I\'ll submit a maintenance request.', 'Many landlords use an online portal.', null, [ACT.vocabularyRules]),

    createContentItem(
      'Polite requests',
      'roommate-tone',
      'Be specific + warm.',
      'sentence',
      'Could you do the dishes by tonight? — Would you mind keeping it down after 11? — It would be great if you could pay your share of utilities by Friday.',
      'Match the size of the request to the formality.',
      [
        { target: 'Could you + V?', english: 'standard polite' },
        { target: 'Would you mind + V-ing?', english: 'softer (note: yes = no, I won\'t)' },
        { target: 'It would be great if you could + V', english: 'most polite/indirect' },
      ],
      [ACT.grammarRequest],
    ),
    createContentItem(
      'Polite complaints',
      'avoid blame',
      'Soft + open.',
      'sentence',
      'I noticed that the dishes have been piling up. — It\'s been bothering me that we\'re both forgetting trash day. — Could we talk about quiet hours?',
      'Frame as observation, not accusation. Use "we" when possible.',
      [
        { target: 'I noticed that + S + V', english: 'soft observation' },
        { target: 'It\'s been bothering me that + S + V', english: 'mild complaint' },
        { target: 'Could we talk about + N?', english: 'open conversation' },
        { target: 'Maybe we could + V', english: 'soft suggestion' },
      ],
      [ACT.grammarComplaint],
    ),

    createContentItem(
      'Lease excerpt',
      'reading practice',
      'Read this lease clause.',
      'sentence',
      'SECTION 5: RULES AND REGULATIONS\n5.1 Quiet hours are 10 PM to 8 AM nightly.\n5.2 No smoking inside the unit or in shared spaces.\n5.3 Overnight guests are permitted up to 3 nights per month without notice; longer stays require landlord approval.\n5.4 The tenant is responsible for ordinary cleaning. Damage beyond normal wear-and-tear may result in deduction from the security deposit.\n5.5 Maintenance requests should be submitted via the online portal within 48 hours of noticing an issue.',
      'Standard residential lease clause.',
      [
        { target: 'Quiet hours: 10 PM-8 AM', english: 'noise rule' },
        { target: 'No smoking', english: 'common modern rule' },
        { target: 'Overnight guests: 3 nights/month', english: 'guest policy' },
        { target: 'normal wear-and-tear', english: 'legal phrase: minor age damage' },
        { target: 'Maintenance requests via portal', english: 'repair process' },
      ],
      [ACT.reading],
    ),

    createContentItem(
      'Roommate conversation',
      'two issues',
      'Polite confrontation.',
      'conversation',
      'You: Hey, do you have a sec?\nRoommate: Sure, what\'s up?\nYou: I noticed the dishes have been piling up. And I think the kitchen faucet started leaking last night.\nRoommate: Oh no, I didn\'t notice the leak. Sorry about the dishes — I\'ve been swamped.\nYou: No worries. Could we set up a chore schedule? Maybe Tuesdays and Saturdays?\nRoommate: That sounds fair. I\'ll do dishes tonight. For the leak, you wanna call the landlord?\nYou: I\'ll email her right now. Thanks for being chill about this.\nRoommate: Of course.',
      'Polite + collaborative.',
      [
        { target: 'I noticed the dishes have been piling up', english: 'soft observation' },
        { target: 'I\'ve been swamped', english: 'apology + reason' },
        { target: 'Could we set up a chore schedule?', english: 'concrete solution' },
        { target: 'you wanna call the landlord?', english: 'co-task' },
      ],
      [ACT.listening],
    ),

    createContentItem(
      'Landlord email',
      'writing model',
      'Report a repair issue.',
      'sentence',
      'Subject: Maintenance Request — Kitchen Faucet Leak — Apt 4B\n\nHi Sarah,\n\nI\'m emailing to report a leak under the kitchen sink. It started last night and there\'s water pooling in the cabinet. Could a plumber come this week? I\'ve placed a bucket to catch the drip. Please let me know when you can schedule the repair.\n\nThanks,\nMin-su (Apt 4B)',
      'Standard maintenance email.',
      [
        { target: 'Subject: Maintenance Request — issue — Apt #', english: 'specific subject' },
        { target: 'I\'m emailing to report + issue', english: 'opening' },
        { target: 'Could a plumber come + timeframe?', english: 'specific ask' },
        { target: 'I\'ve placed a bucket to catch + drip', english: 'tenant\'s proactive step' },
      ],
      [ACT.writing],
    ),

    createContentItem(
      'US/UK rental culture',
      'cultural overview',
      'Standard US: 12-month lease, 1-2 months security deposit, separate utilities. UK: 6-12 month assured shorthold tenancy. Both: maintenance via landlord/property manager. US rental sites: Zillow, Apartments.com, Trulia. UK: Rightmove, Zoopla.',
      'sentence',
      'In the US, your security deposit must be returned within 30 days of move-out (varies by state).',
      'Always document the apartment\'s condition with photos when you move in.',
      [
        { target: '12-month lease standard (US)', english: 'shorter leases rarer' },
        { target: '1-2 month security deposit', english: 'refundable upfront' },
        { target: 'utilities often separate', english: 'tenant pays' },
        { target: 'Zillow / Rightmove', english: 'rental search sites' },
      ],
      [ACT.culture],
    ),

    createContentItem(
      'Task: Roommate negotiation',
      'consolidation task',
      'AI tutor plays your roommate. Negotiate two issues: dishes + quiet hours.',
      'conversation',
      'You: [polite opener]\nTutor: [agrees to talk]\nYou: [issue 1 — soft observation]\nTutor: [responds]\nYou: [issue 2 — polite complaint]\nTutor: [proposes solution]\nYou: [agree + close]',
      'AI tutor plays roommate.',
      [
        { target: 'Could we talk about + N?', english: 'open' },
        { target: 'I noticed that + S + V', english: 'observation' },
        { target: 'Maybe we could + V', english: 'soft suggestion' },
        { target: 'agreement + thanks', english: 'close' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
