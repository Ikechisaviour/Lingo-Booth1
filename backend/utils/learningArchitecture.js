const { curriculumManifestEntryForLesson } = require('./curriculumManifest');

const SUPPORT_BY_LEVEL = {
  1: {
    level: 1,
    band: 'foundation',
    supportLevel: 'native-guided',
    quizOptionMode: 'native-assisted',
    writingMode: 'handwriting-first',
    nativeSupport: 'strong',
  },
  2: {
    level: 2,
    band: 'everyday',
    supportLevel: 'mixed-guided',
    quizOptionMode: 'target-with-native-hints',
    writingMode: 'type-with-write-option',
    nativeSupport: 'balanced',
  },
  3: {
    level: 3,
    band: 'independent',
    supportLevel: 'target-first',
    quizOptionMode: 'target-dominant',
    writingMode: 'typed-production',
    nativeSupport: 'rescue',
  },
  4: {
    level: 4,
    band: 'advanced',
    supportLevel: 'immersion-with-help',
    quizOptionMode: 'target-first',
    writingMode: 'extended-typed-production',
    nativeSupport: 'minimal',
  },
};

const TRACK_RANK = {
  foundation: 1,
  survival: 2,
  everyday: 3,
  bridge: 4,
  thematic: 5,
  professional: 6,
  advanced: 7,
  independent: 8,
  adult: 9,
  grammar: 10,
  other: 99,
};

const LESSON_ROLES = ['core', 'branch', 'checkpoint', 'repair'];

const LONG_ACTIVITY_TYPES = [
  'comprehension',
  'copy-or-trace',
  'typed-writing',
  'extended-writing',
  'storytelling',
  'story-hearing',
  'guided-dialogue',
  'listen-and-repeat',
  'pronunciation-lab',
  'checkpoint-review',
  'repair-drill',
];

const BRANCH_TYPES = [
  'foundation',
  'daily-life',
  'travel',
  'work',
  'school',
  'health',
  'family',
  'business',
  'religious-community',
  'culture',
  'service',
  'housing',
  'shopping',
  'food',
  'transport',
  'communication',
  'sports-leisure',
  'exam',
  'grammar',
  'pronunciation',
  'writing',
  'listening',
  'speaking',
  'review',
  'repair',
  'advanced-control',
  'general',
];

function clean(value) {
  return String(value || '').trim();
}

function numberFrom(pattern, value) {
  const match = clean(value).match(pattern);
  return match ? Number(match[1]) : null;
}

function inferPosition(curriculumKey = '', title = '') {
  const key = clean(curriculumKey);
  const text = clean(title);
  const direct = numberFrom(/Unit(\d+)/i, key)
    ?? numberFrom(/AdultUnit(\d+)/i, key)
    ?? numberFrom(/Cluster(\d+)/i, key);
  if (direct != null) return direct;
  const review = numberFrom(/Review(\d+)/i, key) ?? numberFrom(/review\s*(\d+)/i, text);
  if (review != null) return review * 3 + 0.5;
  const unit = numberFrom(/(?:unit|unidad|unidade|einheit|lektion|lesson|course|class)\s*(\d+)/i, text);
  return unit ?? 999;
}

function unitNumberFromKey(curriculumKey = '') {
  const key = clean(curriculumKey);
  const directUnit = numberFrom(/^level1Unit(\d+)/i, key);
  if (directUnit != null) return directUnit;
  return null;
}

function skillStrandsForLesson(lesson = {}) {
  const strands = new Set();
  const content = Array.isArray(lesson.content) ? lesson.content : [];
  const activities = Array.isArray(lesson.activities) ? lesson.activities : [];

  content.forEach((item) => {
    if (item?.type === 'word') strands.add('vocabulary');
    if (item?.type === 'sentence') strands.add('grammar');
    if (item?.type === 'conversation') {
      strands.add('speaking');
      strands.add('listening');
    }
    if (item?.type === 'reading' || item?.type === 'paragraph') strands.add('reading');
    if (item?.type === 'writing') strands.add('writing');
    if (item?.type === 'pronunciation') {
      strands.add('pronunciation');
      strands.add('listening');
    }
  });

  activities.forEach((activity) => {
    const text = `${activity?.section || ''} ${activity?.title || ''} ${activity?.task || ''}`.toLowerCase();
    if (text.includes('read')) strands.add('reading');
    if (text.includes('listen')) strands.add('listening');
    if (text.includes('speak') || text.includes('dialogue')) strands.add('speaking');
    if (text.includes('write')) strands.add('writing');
    if (text.includes('grammar')) strands.add('grammar');
    if (text.includes('vocab')) strands.add('vocabulary');
    if (text.includes('pronunciation')) strands.add('pronunciation');
  });

  return Array.from(strands);
}

function searchableLessonText(lesson = {}, curriculumKey = '') {
  const activities = Array.isArray(lesson.activities) ? lesson.activities : [];
  const activityText = activities
    .map(activity => `${activity?.section || ''} ${activity?.title || ''} ${activity?.task || ''}`)
    .join(' ');
  return [
    curriculumKey,
    lesson.title,
    lesson.category,
    lesson.lessonType,
    lesson.difficulty,
    lesson.track,
    activityText,
  ].map(clean).join(' ').toLowerCase();
}

function branchTypeForLesson(lesson = {}, learning = {}) {
  const text = searchableLessonText(lesson, lesson.curriculumKey);
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
    ['pronunciation', /(pronunciation|sound|tone|stress|intonation|alphabet|script|letter|pinyin|hangul|kana|phonetic)/],
    ['writing', /(write|writing|essay|composition|stroke|spell|typing)/],
    ['listening', /(listen|listening|hearing|audio|dictation)/],
    ['speaking', /(speak|speaking|dialogue|conversation|roleplay|oral)/],
    ['grammar', /(grammar|pattern|tense|modifier|connector|case|particle|conjugat|clause|sentence)/],
  ];
  const match = tests.find(([, pattern]) => pattern.test(text));
  if (match) return match[0];
  if (learning.levelTrack === 'foundation') return 'foundation';
  if (learning.levelTrack === 'bridge') return 'review';
  if (learning.levelTrack === 'advanced') return 'advanced-control';
  if (learning.levelTrack === 'professional') return 'work';
  if (learning.levelTrack === 'thematic') return 'daily-life';
  return 'general';
}

function lessonRoleForLesson(lesson = {}, learning = {}) {
  const text = searchableLessonText(lesson, lesson.curriculumKey);
  const explicitRole = clean(lesson.lessonRole).toLowerCase();
  if (LESSON_ROLES.includes(explicitRole)) return explicitRole;
  if (/\b(repair|weak|mistake|remedial|fix|trouble)\b/.test(text)) return 'repair';
  if (
    learning.kind === 'review'
    || learning.levelTrack === 'bridge'
    || /^level2Review/i.test(clean(lesson.curriculumKey))
    || /review|checkpoint|assessment|placement/.test(text)
  ) {
    return 'checkpoint';
  }
  if (learning.levelTrack === 'everyday') return 'branch';
  if (learning.levelTrack === 'thematic' && Number(learning.position || 999) > 4) return 'branch';
  if (learning.levelTrack === 'professional' && Number(learning.position || 999) > 6) return 'branch';
  return 'core';
}

function lessonWeightForLesson(lesson = {}, learning = {}) {
  const content = Array.isArray(lesson.content) ? lesson.content : [];
  const activities = Array.isArray(lesson.activities) ? lesson.activities : [];
  const text = searchableLessonText(lesson, lesson.curriculumKey);
  const complexity = content.length + (activities.length * 2);
  if (
    learning.level >= 4
    || learning.levelTrack === 'foundation'
    || complexity >= 48
    || /(script|alphabet|tone|pronunciation|grammar cluster|advanced|formal writing|essay)/.test(text)
  ) {
    return { lessonWeight: 3, weightReason: 'deep-skill-building' };
  }
  if (complexity <= 14 && !/(conversation|dialogue|writing|reading|listening)/.test(text)) {
    return { lessonWeight: 1, weightReason: 'light-practice' };
  }
  return { lessonWeight: 2, weightReason: 'standard-unit' };
}

function longActivityTypesForLesson(lesson = {}, learning = {}) {
  const strands = new Set(learning.skillStrands || []);
  const types = new Set();
  if (learning.lessonRole === 'checkpoint') types.add('checkpoint-review');
  if (learning.lessonRole === 'repair') types.add('repair-drill');
  if (strands.has('pronunciation')) types.add('pronunciation-lab');
  if (strands.has('reading') || learning.level >= 2) types.add('comprehension');
  if (strands.has('writing') || learning.level >= 2) {
    types.add(learning.level >= 4 ? 'extended-writing' : (learning.level === 1 ? 'copy-or-trace' : 'typed-writing'));
  }
  if (strands.has('speaking') || learning.level >= 3) {
    types.add(learning.level >= 3 ? 'storytelling' : 'guided-dialogue');
  }
  if (strands.has('listening') || learning.level >= 2) {
    types.add(learning.level >= 2 ? 'story-hearing' : 'listen-and-repeat');
  }
  if (learning.level === 1) {
    types.add('guided-dialogue');
    types.add('listen-and-repeat');
    types.add('copy-or-trace');
  }
  return Array.from(types).filter(type => LONG_ACTIVITY_TYPES.includes(type));
}

function inferLearningArchitecture(lesson = {}, course = null) {
  const manifest = curriculumManifestEntryForLesson(lesson, course);
  const curriculumKey = clean(lesson.curriculumKey);
  const lessonType = clean(lesson.lessonType).toLowerCase();
  const difficulty = clean(lesson.difficulty).toLowerCase();
  const sourceTrack = clean(course?.track || lesson.levelTrack || lessonType || '').toLowerCase();
  const sourceLevel = Number(course?.level || lesson.learningLevel || 0);
  const position = Number(course?.position ?? inferPosition(curriculumKey, lesson.title));

  let level = 2;
  let band = 'everyday';
  let track = 'everyday';
  let kind = course?.kind || 'unit';

  if (curriculumKey === 'level1Foundation' || lessonType === 'foundation' || sourceTrack === 'foundation') {
    level = 1;
    band = 'foundation';
    track = 'foundation';
    kind = 'foundation';
  } else if (/^level1Unit/i.test(curriculumKey) || (sourceLevel === 1 && sourceTrack === 'thematic') || difficulty === 'beginner') {
    const unitNumber = unitNumberFromKey(curriculumKey);
    if (unitNumber != null && unitNumber <= 9) {
      level = 1;
      band = 'foundation';
      track = 'survival';
    } else {
      level = 1;
      band = 'foundation';
      track = 'everyday';
    }
  } else if (/^level2Review/i.test(curriculumKey) || lessonType === 'review') {
    level = 2;
    band = 'everyday';
    track = 'bridge';
    kind = 'review';
  } else if (/^level2AdultUnit/i.test(curriculumKey) || lessonType === 'workplace' || sourceTrack === 'adult') {
    level = 3;
    band = 'independent';
    track = 'professional';
  } else if (/^level2Unit/i.test(curriculumKey) || sourceLevel === 2 || difficulty === 'intermediate') {
    level = 2;
    band = 'everyday';
    track = 'thematic';
  } else if (/^level3Cluster/i.test(curriculumKey) || lessonType === 'grammar' || sourceLevel === 3 || difficulty === 'advanced') {
    level = 4;
    band = 'advanced';
    track = 'advanced';
  }

  if (manifest) {
    level = manifest.level;
    band = manifest.band;
    track = manifest.levelTrack;
    kind = manifest.kind;
  }

  const policy = SUPPORT_BY_LEVEL[level] || SUPPORT_BY_LEVEL[2];
  const baseLearning = {
    ...policy,
    level,
    band,
    levelTrack: track,
    position: manifest?.position ?? position,
    unitOrder: manifest?.unitOrder ?? (manifest?.position ?? position),
    sequenceOrder: manifest?.sequenceOrder ?? ((level * 1000) + ((TRACK_RANK[track] || 99) * 100) + position),
    kind,
    trackRank: TRACK_RANK[track] || 99,
    skillStrands: manifest?.skillFocus?.length ? manifest.skillFocus : skillStrandsForLesson(lesson),
    manifestSource: manifest?.manifestSource || 'fallback-inference',
    programLevelNameKey: manifest?.programLevelNameKey || `classList.programLevels.level${level}.title`,
    programLevelDescriptionKey: manifest?.programLevelDescriptionKey || `classList.programLevels.level${level}.description`,
  };
  const lessonRole = manifest?.lessonRole || lessonRoleForLesson({ ...lesson, curriculumKey }, baseLearning);
  const branchType = manifest?.branchType || branchTypeForLesson({ ...lesson, curriculumKey }, baseLearning);
  const weight = manifest?.lessonWeight
    ? { lessonWeight: manifest.lessonWeight, weightReason: manifest.weightReason || 'manifest' }
    : lessonWeightForLesson({ ...lesson, curriculumKey }, baseLearning);
  const learning = {
    ...baseLearning,
    lessonRole,
    coreRequired: manifest?.coreRequired ?? (lessonRole === 'core' || lessonRole === 'checkpoint'),
    requiredForProgress: manifest?.requiredForProgress ?? (lessonRole === 'core' || lessonRole === 'checkpoint'),
    certificateEligible: manifest?.certificateEligible ?? (lessonRole === 'core' || lessonRole === 'checkpoint'),
    branchType,
    ...weight,
    checkpointType: manifest?.checkpointType ?? (lessonRole === 'checkpoint' ? (track === 'bridge' ? 'bridge-review' : 'level-check') : ''),
    repairFocus: manifest?.repairFocus ?? (lessonRole === 'repair' ? (baseLearning.skillStrands.length ? baseLearning.skillStrands : ['review']) : []),
    skillFocus: manifest?.skillFocus?.length ? manifest.skillFocus : baseLearning.skillStrands,
    prerequisiteConcepts: manifest?.prerequisiteConcepts || [],
    teachesConcepts: manifest?.teachesConcepts || [],
    reviewsConcepts: manifest?.reviewsConcepts || [],
  };
  learning.longActivityTypes = manifest?.longActivityTypes?.length
    ? manifest.longActivityTypes
    : longActivityTypesForLesson({ ...lesson, curriculumKey }, learning);
  return learning;
}

function applyLearningArchitecture(lesson = {}, course = null) {
  const learning = inferLearningArchitecture(lesson, course || lesson.course);
  lesson.learning = learning;
  lesson.learningLevel = learning.level;
  lesson.levelTrack = learning.levelTrack;
  lesson.supportLevel = learning.supportLevel;
  lesson.quizOptionMode = learning.quizOptionMode;
  lesson.writingMode = learning.writingMode;
  lesson.skillStrands = learning.skillStrands;
  lesson.lessonRole = learning.lessonRole;
  lesson.coreRequired = learning.coreRequired;
  lesson.requiredForProgress = learning.requiredForProgress;
  lesson.certificateEligible = learning.certificateEligible;
  lesson.branchType = learning.branchType;
  lesson.lessonWeight = learning.lessonWeight;
  lesson.weightReason = learning.weightReason;
  lesson.checkpointType = learning.checkpointType;
  lesson.repairFocus = learning.repairFocus;
  lesson.longActivityTypes = learning.longActivityTypes;
  lesson.manifestSource = learning.manifestSource;
  lesson.programLevelNameKey = learning.programLevelNameKey;
  lesson.programLevelDescriptionKey = learning.programLevelDescriptionKey;
  lesson.unitOrder = learning.unitOrder;
  lesson.sequenceOrder = learning.sequenceOrder;
  lesson.skillFocus = learning.skillFocus;
  lesson.prerequisiteConcepts = learning.prerequisiteConcepts;
  lesson.teachesConcepts = learning.teachesConcepts;
  lesson.reviewsConcepts = learning.reviewsConcepts;
  if (Array.isArray(lesson.content)) {
    lesson.content = lesson.content.map((item) => ({
      ...item,
      learningLevel: item?.learningLevel || learning.level,
      firstIntroducedLevel: item?.firstIntroducedLevel || learning.level,
      activeLevels: Array.isArray(item?.activeLevels) && item.activeLevels.length ? item.activeLevels : [learning.level],
      levelTrack: item?.levelTrack || learning.levelTrack,
      supportLevel: item?.supportLevel || learning.supportLevel,
      quizOptionMode: item?.quizOptionMode || learning.quizOptionMode,
      writingMode: item?.writingMode || learning.writingMode,
      skillStrands: Array.isArray(item?.skillStrands) && item.skillStrands.length ? item.skillStrands : learning.skillStrands,
      lessonRole: item?.lessonRole || learning.lessonRole,
      branchType: item?.branchType || learning.branchType,
      lessonWeight: item?.lessonWeight || learning.lessonWeight,
      checkpointType: item?.checkpointType || learning.checkpointType,
      repairFocus: Array.isArray(item?.repairFocus) && item.repairFocus.length ? item.repairFocus : learning.repairFocus,
      certificateEligible: item?.certificateEligible != null ? item.certificateEligible : learning.certificateEligible,
      manifestSource: item?.manifestSource || learning.manifestSource,
      programLevelNameKey: item?.programLevelNameKey || learning.programLevelNameKey,
      programLevelDescriptionKey: item?.programLevelDescriptionKey || learning.programLevelDescriptionKey,
      unitOrder: item?.unitOrder || learning.unitOrder,
      sequenceOrder: item?.sequenceOrder || learning.sequenceOrder,
      skillFocus: Array.isArray(item?.skillFocus) && item.skillFocus.length ? item.skillFocus : learning.skillFocus,
      prerequisiteConcepts: Array.isArray(item?.prerequisiteConcepts) ? item.prerequisiteConcepts : learning.prerequisiteConcepts,
      teachesConcepts: Array.isArray(item?.teachesConcepts) ? item.teachesConcepts : learning.teachesConcepts,
      reviewsConcepts: Array.isArray(item?.reviewsConcepts) ? item.reviewsConcepts : learning.reviewsConcepts,
      longActivityTypes: Array.isArray(item?.longActivityTypes) && item.longActivityTypes.length
        ? item.longActivityTypes
        : learning.longActivityTypes,
    }));
  }
  return lesson;
}

function sortByLearningArchitecture(left = {}, right = {}) {
  const a = left.learning || inferLearningArchitecture(left, left.course);
  const b = right.learning || inferLearningArchitecture(right, right.course);
  if (a.level !== b.level) return a.level - b.level;
  if (a.sequenceOrder !== b.sequenceOrder) return a.sequenceOrder - b.sequenceOrder;
  if (a.trackRank !== b.trackRank) return a.trackRank - b.trackRank;
  if (a.position !== b.position) return a.position - b.position;
  return clean(left.title).localeCompare(clean(right.title));
}

module.exports = {
  BRANCH_TYPES,
  LESSON_ROLES,
  LONG_ACTIVITY_TYPES,
  SUPPORT_BY_LEVEL,
  TRACK_RANK,
  applyLearningArchitecture,
  inferLearningArchitecture,
  sortByLearningArchitecture,
};
