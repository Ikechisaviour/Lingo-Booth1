const PROGRAM_LEVELS = {
  1: {
    level: 1,
    band: 'foundation',
    nameKey: 'classList.programLevels.level1.title',
    descriptionKey: 'classList.programLevels.level1.description',
  },
  2: {
    level: 2,
    band: 'everyday',
    nameKey: 'classList.programLevels.level2.title',
    descriptionKey: 'classList.programLevels.level2.description',
  },
  3: {
    level: 3,
    band: 'independent',
    nameKey: 'classList.programLevels.level3.title',
    descriptionKey: 'classList.programLevels.level3.description',
  },
  4: {
    level: 4,
    band: 'advanced',
    nameKey: 'classList.programLevels.level4.title',
    descriptionKey: 'classList.programLevels.level4.description',
  },
};

const TRACK_SEQUENCE = {
  foundation: 1,
  survival: 2,
  everyday: 3,
  bridge: 4,
  thematic: 5,
  professional: 6,
  advanced: 7,
};

function clean(value) {
  return String(value || '').trim();
}

function numberFrom(pattern, value) {
  const match = clean(value).match(pattern);
  return match ? Number(match[1]) : null;
}

function textForLesson(lesson = {}) {
  const activities = Array.isArray(lesson.activities) ? lesson.activities : [];
  const content = Array.isArray(lesson.content) ? lesson.content : [];
  return [
    lesson.curriculumKey,
    lesson.title,
    lesson.category,
    lesson.lessonType,
    lesson.difficulty,
    ...activities.flatMap(activity => [
      activity?.section,
      activity?.title,
      activity?.task,
      ...(Array.isArray(activity?.goals) ? activity.goals : []),
    ]),
    ...content.slice(0, 12).flatMap(item => [
      item?.type,
      item?.targetText,
      item?.nativeText,
      item?.exampleNative,
    ]),
  ].map(clean).join(' ').toLowerCase();
}

function positionFromTitle(title = '') {
  return (
    numberFrom(/(?:unit|unidad|unidade|einheit|lesson|lektion|leccion|leçon|course|class)\s*(\d+)/i, title)
    ?? numberFrom(/review\s*(\d+)/i, title)
    ?? numberFrom(/cluster\s*(\d+)/i, title)
    ?? 999
  );
}

function skillFocusForLesson(lesson = {}) {
  const text = textForLesson(lesson);
  const content = Array.isArray(lesson.content) ? lesson.content : [];
  const skills = new Set();

  content.forEach((item) => {
    if (item?.type === 'word') skills.add('vocabulary');
    if (item?.type === 'sentence') skills.add('grammar');
    if (item?.type === 'conversation') {
      skills.add('speaking');
      skills.add('listening');
    }
    if (item?.type === 'reading' || item?.type === 'paragraph') skills.add('reading');
    if (item?.type === 'writing') skills.add('writing');
    if (item?.type === 'pronunciation') {
      skills.add('pronunciation');
      skills.add('listening');
    }
  });

  [
    ['reading', /\bread|reading|comprehension\b/],
    ['listening', /\blisten|listening|hearing|dictation|audio\b/],
    ['speaking', /\bspeak|speaking|dialogue|conversation|roleplay|oral\b/],
    ['writing', /\bwrite|writing|essay|composition|stroke|typing\b/],
    ['grammar', /\bgrammar|pattern|tense|clause|particle|case|conjugat|ending\b/],
    ['vocabulary', /\bvocab|word|phrase|lexical\b/],
    ['pronunciation', /\bpronunciation|sound|tone|stress|intonation|alphabet|script|pinyin|kana|hangul\b/],
  ].forEach(([skill, pattern]) => {
    if (pattern.test(text)) skills.add(skill);
  });

  return Array.from(skills);
}

function branchTypeForLesson(lesson = {}, track = '') {
  const text = textForLesson(lesson);
  const tests = [
    ['religious-community', /(relig|church|prayer|mosque|temple|worship|faith|community)/],
    ['travel', /(travel|trip|tour|hotel|airport|passport|direction|directions|transport|train|bus|taxi|station|vacation)/],
    ['work', /(work|job|office|career|profession|professional|meeting|interview|resume|colleague|manager|business)/],
    ['school', /(school|classroom|class|student|teacher|university|college|study|exam|assignment|lecture)/],
    ['health', /(health|doctor|hospital|body|symptom|pain|medicine|clinic|appointment)/],
    ['family', /(family|parent|mother|father|sibling|brother|sister|home|relationship)/],
    ['business', /(business|client|invoice|payment|contract|negotiate|sales|company)/],
    ['culture', /(culture|festival|custom|holiday|tradition|history|social norm)/],
    ['service', /(service|request|complaint|repair|bank|post office|office visit|customer)/],
    ['housing', /(housing|rent|apartment|room|landlord|lease|moving)/],
    ['shopping', /(shop|shopping|store|market|price|buy|return|receipt|discount)/],
    ['food', /(food|restaurant|cafe|meal|order|drink|coffee|tea|breakfast|lunch|dinner)/],
    ['communication', /(phone|message|email|call|chat|text|communication)/],
    ['sports-leisure', /(sport|leisure|movie|music|hobby|game|exercise|club)/],
    ['exam', /(exam|test|placement|certificate|assessment)/],
    ['pronunciation', /(pronunciation|sound|tone|stress|intonation|alphabet|script|letter|pinyin|kana|phonetic)/],
    ['writing', /(write|writing|essay|composition|stroke|spell|typing)/],
    ['listening', /(listen|listening|hearing|audio|dictation)/],
    ['speaking', /(speak|speaking|dialogue|conversation|roleplay|oral)/],
    ['grammar', /(grammar|pattern|tense|modifier|connector|case|particle|conjugat|clause|sentence)/],
  ];
  const match = tests.find(([, pattern]) => pattern.test(text));
  if (match) return match[0];
  if (track === 'foundation') return 'foundation';
  if (track === 'bridge') return 'review';
  if (track === 'professional') return 'work';
  if (track === 'advanced') return 'advanced-control';
  return 'daily-life';
}

function longActivitiesFor({ level, role, track, skillFocus }) {
  const skills = new Set(skillFocus || []);
  const types = new Set();

  if (role === 'checkpoint') types.add('checkpoint-review');
  if (role === 'repair') types.add('repair-drill');
  if (track === 'foundation' || skills.has('pronunciation')) types.add('pronunciation-lab');

  if (level === 1) {
    types.add('listen-and-repeat');
    types.add('guided-dialogue');
    types.add('copy-or-trace');
    if (skills.has('reading')) types.add('comprehension');
    return Array.from(types);
  }

  types.add('comprehension');
  types.add(level >= 4 ? 'extended-writing' : 'typed-writing');
  types.add('story-hearing');
  if (level >= 3) types.add('storytelling');
  if (skills.has('speaking') || level === 2) types.add('guided-dialogue');
  return Array.from(types);
}

function roleForKey(key, position, track) {
  if (key === 'level1Foundation') return 'core';
  if (track === 'bridge') return 'checkpoint';
  if (track === 'advanced') return position === 6 ? 'checkpoint' : (position > 6 ? 'branch' : 'core');
  if (track === 'professional') return position === 12 ? 'checkpoint' : (position > 6 ? 'branch' : 'core');
  if (track === 'survival') return position === 9 ? 'checkpoint' : 'core';
  if (track === 'everyday') return position === 21 ? 'checkpoint' : (position > 12 ? 'branch' : 'core');
  if (track === 'thematic') return position > 8 ? 'branch' : 'core';
  return 'core';
}

function weightFor({ level, role, track, skillFocus }) {
  if (role === 'checkpoint') return { lessonWeight: 3, weightReason: 'checkpoint-synthesis' };
  if (track === 'foundation' || level === 4 || skillFocus.includes('pronunciation')) {
    return { lessonWeight: 3, weightReason: 'deep-skill-building' };
  }
  if (role === 'branch') return { lessonWeight: 2, weightReason: 'goal-branch-practice' };
  return { lessonWeight: level === 1 ? 2 : 3, weightReason: 'core-progression' };
}

function baseEntry({ key, level, track, position, kind, lesson }) {
  const role = roleForKey(key, position, track);
  const skillFocus = skillFocusForLesson(lesson);
  const branchType = branchTypeForLesson(lesson, track);
  const weight = weightFor({ level, role, track, skillFocus });
  const checkpointType = role === 'checkpoint'
    ? (track === 'bridge' ? 'bridge-review' : `level-${level}-checkpoint`)
    : '';
  const levelMeta = PROGRAM_LEVELS[level] || PROGRAM_LEVELS[2];

  return {
    manifestSource: 'four-level-curriculum-plan',
    level,
    band: levelMeta.band,
    levelTrack: track,
    position,
    unitOrder: position,
    sequenceOrder: (level * 1000) + ((TRACK_SEQUENCE[track] || 99) * 100) + position,
    kind,
    programLevelNameKey: levelMeta.nameKey,
    programLevelDescriptionKey: levelMeta.descriptionKey,
    lessonRole: role,
    coreRequired: role === 'core' || role === 'checkpoint',
    requiredForProgress: role === 'core' || role === 'checkpoint',
    certificateEligible: role === 'core' || role === 'checkpoint',
    branchType,
    ...weight,
    checkpointType,
    repairFocus: role === 'repair' ? (skillFocus.length ? skillFocus : ['review']) : [],
    skillFocus,
    prerequisiteConcepts: [],
    teachesConcepts: [],
    reviewsConcepts: role === 'checkpoint' ? ['level-review'] : [],
    longActivityTypes: longActivitiesFor({ level, role, track, skillFocus }),
  };
}

function curriculumManifestEntryForLesson(lesson = {}, course = null) {
  const key = clean(lesson.curriculumKey);
  const lessonType = clean(lesson.lessonType).toLowerCase();
  const difficulty = clean(lesson.difficulty).toLowerCase();
  const title = clean(lesson.title);
  const courseTrack = clean(course?.track || '').toLowerCase();
  const courseLevel = Number(course?.level || 0);

  if (key === 'level1Foundation' || lessonType === 'foundation' || courseTrack === 'foundation') {
    return baseEntry({ key: key || 'level1Foundation', level: 1, track: 'foundation', position: 0, kind: 'foundation', lesson });
  }

  const level1Unit = numberFrom(/^level1Unit(\d+)/i, key);
  if (level1Unit != null || (courseLevel === 1 && courseTrack) || difficulty === 'beginner') {
    const position = level1Unit ?? Number(course?.position || positionFromTitle(title));
    const track = position <= 9 ? 'survival' : 'everyday';
    return baseEntry({ key, level: 1, track, position, kind: 'unit', lesson });
  }

  const level2Review = numberFrom(/^level2Review(\d+)/i, key);
  if (level2Review != null || lessonType === 'review' || courseTrack === 'bridge') {
    const position = level2Review != null ? (level2Review * 3) + 0.5 : Number(course?.position || positionFromTitle(title));
    return baseEntry({ key, level: 2, track: 'bridge', position, kind: 'review', lesson });
  }

  const adultUnit = numberFrom(/^level2AdultUnit(\d+)/i, key);
  if (adultUnit != null || lessonType === 'workplace' || courseTrack === 'professional' || courseTrack === 'adult') {
    const position = adultUnit ?? Number(course?.position || positionFromTitle(title));
    return baseEntry({ key, level: 3, track: 'professional', position, kind: 'unit', lesson });
  }

  const level2Unit = numberFrom(/^level2Unit(\d+)/i, key);
  if (level2Unit != null || (courseLevel === 2 && courseTrack !== 'adult') || difficulty === 'intermediate') {
    const position = level2Unit ?? Number(course?.position || positionFromTitle(title));
    return baseEntry({ key, level: 2, track: 'thematic', position, kind: 'unit', lesson });
  }

  const cluster = numberFrom(/^level3Cluster(\d+)/i, key);
  if (cluster != null || lessonType === 'grammar' || courseLevel === 3 || difficulty === 'advanced') {
    const position = cluster ?? Number(course?.position || positionFromTitle(title));
    return baseEntry({ key, level: 4, track: 'advanced', position, kind: 'unit', lesson });
  }

  return null;
}

function programLevelFor(level) {
  return PROGRAM_LEVELS[Number(level)] || PROGRAM_LEVELS[2];
}

module.exports = {
  PROGRAM_LEVELS,
  TRACK_SEQUENCE,
  curriculumManifestEntryForLesson,
  programLevelFor,
};
