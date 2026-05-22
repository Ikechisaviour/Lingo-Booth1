import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiBookOpen, FiCheckCircle, FiLayers, FiMessageCircle, FiTarget } from 'react-icons/fi';
import { classLessonService } from '../services/api';
import { getLanguageDisplayName, getNativeLangCode, getTargetLangCode } from '../config/languages';
import { looksLikeRawEnglishForNative } from '../utils/languagePairPolicy';
import './HubPages.css';
import './ClassLessonsPage.css';

// Track displayed order and labels. Adjust here when adding new tracks/levels.
const TRACK_GROUPS = [
  {
    level: 1,
    track: 'foundation',
    titleKey: 'classList.tracks.foundationTitle',
    subtitleKey: 'classList.tracks.foundationSubtitle',
    fallbackTitle: 'Level {{level}} - Foundation',
    fallbackSubtitle: 'Start here with the sound and writing system for {{language}}.',
    accent: 'mint',
    icon: FiBookOpen,
  },
  {
    level: 1,
    track: 'survival',
    titleKey: 'classList.tracks.survivalTitle',
    subtitleKey: 'classList.tracks.survivalSubtitle',
    fallbackTitle: 'Level {{level}} - Essential {{language}}',
    fallbackSubtitle: 'Build practical basics for greetings, rooms, places, routines, shopping, and food.',
    accent: 'lime',
    icon: FiTarget,
  },
  {
    level: 1,
    track: 'everyday',
    titleKey: 'classList.tracks.everydayTitle',
    subtitleKey: 'classList.tracks.everydaySubtitle',
    fallbackTitle: 'Level {{level}} - Everyday {{language}}',
    fallbackSubtitle: 'Core everyday lessons for greetings, food, places, plans, and daily situations.',
    accent: 'lime',
    icon: FiTarget,
  },
  {
    level: 2,
    track: 'bridge',
    titleKey: 'classList.tracks.bridgeTitle',
    subtitleKey: 'classList.tracks.bridgeSubtitle',
    fallbackTitle: 'Level {{level}} - Bridge',
    fallbackSubtitle: 'Review and transition units that connect everyday material to more independent use.',
    accent: 'sky',
    icon: FiLayers,
  },
  {
    level: 2,
    track: 'thematic',
    titleKey: 'classList.tracks.topicTitle',
    subtitleKey: 'classList.tracks.topicSubtitle',
    fallbackTitle: 'Level {{level}} - Thematic {{language}}',
    fallbackSubtitle: 'Topic-driven units for opinions, culture, health, plans, and confident everyday expression.',
    accent: 'violet',
    icon: FiTarget,
  },
  {
    level: 3,
    track: 'professional',
    titleKey: 'classList.tracks.professionalTitle',
    subtitleKey: 'classList.tracks.professionalSubtitle',
    fallbackTitle: 'Level {{level}} - Professional {{language}}',
    fallbackSubtitle: 'Practical language for work, services, housing, safety, and formal situations.',
    accent: 'orange',
    icon: FiMessageCircle,
  },
  {
    level: 4,
    track: 'advanced',
    titleKey: 'classList.tracks.advancedTitle',
    subtitleKey: 'classList.tracks.advancedSubtitle',
    fallbackTitle: 'Level {{level}} - Advanced {{language}}',
    fallbackSubtitle: 'Longer reading, listening, speaking, and writing tasks with lighter native-language support.',
    accent: 'violet',
    icon: FiCheckCircle,
  },
];

const PROGRAM_LEVELS = [
  {
    level: 1,
    titleKey: 'classList.programLevels.level1.title',
    subtitleKey: 'classList.programLevels.level1.description',
    fallbackTitle: 'Level {{level}} - Foundation',
    fallbackSubtitle: 'Build the sound system, first routines, and essential everyday control.',
  },
  {
    level: 2,
    titleKey: 'classList.programLevels.level2.title',
    subtitleKey: 'classList.programLevels.level2.description',
    fallbackTitle: 'Level {{level}} - Everyday Use',
    fallbackSubtitle: 'Use the language across daily topics with more reading, typing, listening, and review.',
  },
  {
    level: 3,
    titleKey: 'classList.programLevels.level3.title',
    subtitleKey: 'classList.programLevels.level3.description',
    fallbackTitle: 'Level {{level}} - Independent Use',
    fallbackSubtitle: 'Handle work, services, longer turns, and real-life problem solving with lighter support.',
  },
  {
    level: 4,
    titleKey: 'classList.programLevels.level4.title',
    subtitleKey: 'classList.programLevels.level4.description',
    fallbackTitle: 'Level {{level}} - Advanced Control',
    fallbackSubtitle: 'Refine advanced grammar, extended writing, storytelling, and target-first comprehension.',
  },
];

// Parse the position of a lesson inside its track from the title text.
// Korean titles use "1과", "2과", "복습 1" etc.; English Level-3 titles use words.
// Reviews land after their cohort (R1 → 3.5, R2 → 6.5, R3 → 9.5).
function parsePosition(title = '') {
  if (/입문|foundation/i.test(title)) return 0;
  const reviewMatch = title.match(/복습\s*(\d+)/);
  if (reviewMatch) return parseInt(reviewMatch[1], 10) * 3 + 0.5;
  const unitMatch = title.match(/(\d+)\s*과/);
  if (unitMatch) return parseInt(unitMatch[1], 10);
  const translatedUnitMatch = title.match(/(?:unit|unidad|unité|unidade|einheit|unità|ünite|lesson|lektion|lección|leçon|урок)\s*(\d+)/i);
  if (translatedUnitMatch) return parseInt(translatedUnitMatch[1], 10);
  // Level 3 cluster titles like "Level 3 · Connectors" — sort by cluster order.
  const clusterOrder = [
    /Connectors/i,
    /Tense.*Sequence/i,
    /Modality/i,
    /Comparison|Resemblance/i,
    /Modifiers/i,
    /Position|Endings|Word Builders|Irregulars/i,
  ];
  for (let i = 0; i < clusterOrder.length; i += 1) {
    if (clusterOrder[i].test(title)) return i + 1;
  }
  return 99;
}

function parseLearningPosition(title = '') {
  if (/foundation/i.test(title)) return 0;
  const reviewMatch = title.match(/review\s*(\d+)/i);
  if (reviewMatch) return parseInt(reviewMatch[1], 10) * 3 + 0.5;
  const translatedUnitMatch = title.match(/(?:unit|unidad|unidade|einheit|lesson|lektion|course|class)\s*(\d+)/i);
  if (translatedUnitMatch) return parseInt(translatedUnitMatch[1], 10);
  return parsePosition(title);
}

// Classify a lesson into (level, track, position) using its metadata + title.
function classifyLesson(lesson) {
  if (lesson?.course?.level && lesson?.course?.track) {
    return {
      level: lesson.course.level,
      track: lesson.course.track,
      position: Number(lesson.sequenceOrder || lesson.course.sequenceOrder || lesson.course.position || 99),
    };
  }

  const { difficulty, lessonType, title = '' } = lesson;
  const position = parseLearningPosition(title);
  const learningLevel = Number(lesson?.learningLevel || lesson?.learning?.level || 0);
  const levelTrack = lesson?.levelTrack || lesson?.learning?.levelTrack;

  if (learningLevel && levelTrack) return { level: learningLevel, track: levelTrack, position: Number(lesson.sequenceOrder || position) };

  if (lessonType === 'foundation') return { level: 1, track: 'foundation', position };
  if (lessonType === 'workplace') return { level: 3, track: 'professional', position };
  if (lessonType === 'grammar') return { level: 4, track: 'advanced', position };
  if (lessonType === 'review') return { level: 2, track: 'bridge', position };
  if (difficulty === 'beginner') return { level: 1, track: 'everyday', position };
  if (difficulty === 'intermediate') return { level: 2, track: 'thematic', position };
  if (difficulty === 'advanced') return { level: 4, track: 'advanced', position };
  return { level: 9, track: 'other', position };
}

function lessonStats(classLesson) {
  if (classLesson?.stats) {
    return {
      total: Number(classLesson.stats.total || 0),
      vocab: Number(classLesson.stats.vocabulary || 0),
      grammar: Number(classLesson.stats.grammar || 0),
      dialogues: Number(classLesson.stats.dialogues || 0),
    };
  }
  const items = Array.isArray(classLesson.content) ? classLesson.content : [];
  return {
    total: items.length,
    vocab: items.filter((item) => item.type === 'word').length,
    grammar: items.filter((item) => item.type === 'sentence').length,
    dialogues: items.filter((item) => item.type === 'conversation').length,
  };
}

// Read per-lesson completed-item count from the same localStorage key
// ClassLessonPage writes to. Returns 0 when nothing is stored or parsing fails.
function readClassLessonCompletedCount(lessonId, nativeLanguage, targetLanguage) {
  if (!lessonId) return 0;
  try {
    const raw = window.localStorage.getItem(
      `lingoClassLesson:${lessonId}:${nativeLanguage}-${targetLanguage}`,
    );
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed?.completedItems)
      ? parsed.completedItems
      : (Array.isArray(parsed?.completed) ? parsed.completed : []);
    return new Set(items.filter(Number.isInteger)).size;
  } catch {
    return 0;
  }
}

function readableDifficulty(value = '', t) {
  const key = String(value || '').toLowerCase();
  if (key) {
    return t(`lessons.difficulties.${key}`, key.replace(/[-_]/g, ' '));
  }
  const label = String(value || 'class').replace(/[-_]/g, ' ').trim();
  return label ? label.charAt(0).toUpperCase() + label.slice(1) : 'Class';
}

function languageNameFor(code, t) {
  return getLanguageDisplayName(code, t);
}

function interpolateFallback(template, values) {
  return String(template || '').replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? '');
}

function trackCopyFor(trackInfo, t, targetName) {
  const values = { level: trackInfo.level, language: targetName };
  return {
    label: t(trackInfo.titleKey, {
      ...values,
      defaultValue: interpolateFallback(trackInfo.fallbackTitle, values),
    }),
    subtitle: t(trackInfo.subtitleKey, {
      ...values,
      defaultValue: interpolateFallback(trackInfo.fallbackSubtitle, values),
    }),
  };
}

function programLevelCopyFor(levelInfo, t) {
  const values = { level: levelInfo.level };
  return {
    label: t(levelInfo.titleKey, {
      ...values,
      defaultValue: interpolateFallback(levelInfo.fallbackTitle, values),
    }),
    subtitle: t(levelInfo.subtitleKey, levelInfo.fallbackSubtitle),
  };
}

function trackLabelFor(classify, t, targetName) {
  const trackInfo = TRACK_GROUPS.find((item) => item.level === classify.level && item.track === classify.track);
  return trackInfo ? trackCopyFor(trackInfo, t, targetName).label : t('classList.classFallback', 'Class');
}

function lessonRoleLabel(role, t) {
  const normalized = String(role || 'core').toLowerCase();
  const labels = {
    core: ['classList.lessonRoles.core', 'Core'],
    branch: ['classList.lessonRoles.branch', 'Goal branch'],
    checkpoint: ['classList.lessonRoles.checkpoint', 'Checkpoint'],
    repair: ['classList.lessonRoles.repair', 'Repair'],
  };
  const [key, fallback] = labels[normalized] || labels.core;
  return t(key, fallback);
}

function lessonWeightLabel(weight, t) {
  const value = Number(weight || 2);
  if (value >= 3) return t('classList.lessonWeights.deep', 'Deep');
  if (value <= 1) return t('classList.lessonWeights.light', 'Light');
  return t('classList.lessonWeights.standard', 'Standard');
}

function lessonRoleCounts(lessons = []) {
  return lessons.reduce((acc, lesson) => {
    const role = String(lesson.lessonRole || lesson.learning?.lessonRole || 'core').toLowerCase();
    if (role === 'branch') acc.branches += 1;
    else if (role === 'checkpoint') acc.checkpoints += 1;
    else if (role === 'repair') acc.repairs += 1;
    else acc.core += 1;
    return acc;
  }, { core: 0, branches: 0, checkpoints: 0, repairs: 0 });
}

function localizedLessonTitle(title = '', t) {
  const text = String(title || '').trim();
  const unitMatch = text.match(/^Level\s+(\d+)\s*[-·]\s*Unit\s+(\d+)\s*:\s*(.+)$/i);
  if (unitMatch) {
    return t('classList.titlePrefix.unit', {
      level: unitMatch[1],
      unit: unitMatch[2],
      title: unitMatch[3],
      defaultValue: 'Level {{level}} · Unit {{unit}}: {{title}}',
    });
  }
  return text;
}

function nativeScaffoldText(value, nativeLanguage, t, fallbackKey = 'classList.untitled') {
  const text = String(value || '').trim();
  if (!text) return '';
  if (looksLikeRawEnglishForNative(text, nativeLanguage)) {
    return t(fallbackKey, 'Untitled lesson');
  }
  return text;
}

function ClassLessonsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [classLessons, setClassLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const targetLanguage = getTargetLangCode();
  const nativeLanguage = getNativeLangCode();
  const targetName = languageNameFor(targetLanguage, t);

  useEffect(() => {
    let cancelled = false;

    async function loadClassLessons() {
      setLoading(true);
      setError('');
      try {
        classLessonService.preparePair().catch(() => {});
        const response = await classLessonService.getClassLessonSummaries();
        if (cancelled) return;
        const list = Array.isArray(response.data) ? [...response.data] : [];
        setClassLessons(list);
      } catch (err) {
        if (!cancelled) {
          setError(t('classList.loadError', 'We couldn\'t load your lessons right now. Please check your connection and try again.'));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadClassLessons();
    return () => { cancelled = true; };
  }, [t, reloadKey]);

  const handleRetry = () => setReloadKey((n) => n + 1);

  // Group lessons by (level, track) and sort within each group by position.
  const groups = useMemo(() => {
    const byKey = new Map();
    for (const lesson of classLessons) {
      const c = classifyLesson(lesson);
      const key = `${c.level}:${c.track}`;
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key).push({ ...lesson, _classify: c });
    }
    for (const lessons of byKey.values()) {
      lessons.sort((a, b) => a._classify.position - b._classify.position);
    }
    return byKey;
  }, [classLessons]);

  const startClassLesson = (classLessonId) => {
    navigate(`/class/${encodeURIComponent(classLessonId)}`);
  };

  const totalLessons = classLessons.length;
  const overview = useMemo(() => classLessons.reduce((acc, lesson) => {
    const stats = lessonStats(lesson);
    return {
      vocab: acc.vocab + stats.vocab,
      grammar: acc.grammar + stats.grammar,
      dialogues: acc.dialogues + stats.dialogues,
    };
  }, { vocab: 0, grammar: 0, dialogues: 0 }), [classLessons]);

  // Aggregate completed items across every loaded class lesson, using the same
  // per-lesson localStorage records ClassLessonPage writes when the learner
  // marks items done. Re-runs whenever the lesson list or learner pair changes.
  const completionStats = useMemo(() => {
    let completed = 0;
    let total = 0;
    for (const lesson of classLessons) {
      const items = Array.isArray(lesson.content) ? lesson.content.length : 0;
      if (!items) continue;
      total += items;
      const done = readClassLessonCompletedCount(lesson._id, nativeLanguage, targetLanguage);
      completed += Math.min(done, items);
    }
    const percent = total ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percent };
  }, [classLessons, nativeLanguage, targetLanguage]);

  const firstClassLesson = useMemo(() => {
    for (const { level, track } of TRACK_GROUPS) {
      const lessons = groups.get(`${level}:${track}`);
      if (lessons?.[0]) return lessons[0];
    }
    return classLessons[0];
  }, [classLessons, groups]);

  return (
    <div className="class-lessons-page">
      <div className="class-lessons-container">
        <section className="class-lessons-hero" aria-label={t('classList.heroAriaLabel', 'Class')}>
          <div className="class-hero-copy">
            <p className="class-kicker">{t('classList.kicker', 'Class')}</p>
            <h1>{t('classList.title', 'Learn with your tutor')}</h1>
            <p>{t('classList.subtitle', 'Choose a structured class unit and move through vocabulary, grammar, dialogue, speaking, and writing with guided support.')}</p>
            <div className="class-hero-actions">
              <button
                type="button"
                className="class-primary-action"
                onClick={() => firstClassLesson && startClassLesson(firstClassLesson._id)}
                disabled={!firstClassLesson}
              >
                <FiBookOpen aria-hidden="true" />
                {t('classList.startFirst', 'Start first available class')}
              </button>
              <button
                type="button"
                className="class-secondary-action"
                onClick={() => navigate('/level-tests')}
              >
                <FiCheckCircle aria-hidden="true" />
                {t('levelTests.kicker', 'Level checks')}
              </button>
              <span className="class-hero-note">{t('classList.note', 'Built for guided lessons, not quick drills.')}</span>
            </div>
          </div>

          <div className="class-hero-panel" aria-label={t('classList.overviewAriaLabel', 'Class overview')}>
            <div className="class-hero-panel-top">
              <span className="class-hero-icon"><FiLayers aria-hidden="true" /></span>
              <span className="class-hero-count">{totalLessons || '--'}</span>
            </div>
            <p>{t('classList.availableUnits', 'available class units')}</p>
            <div className="class-hero-meter-wrap">
              <div
                className="class-hero-meter"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={completionStats.percent}
                aria-label={t('classList.progressAriaLabel', 'Class progress')}
              >
                <span style={{ width: `${completionStats.percent}%` }} />
              </div>
              <p className="class-hero-meter-caption">
                {t('classList.progressCaption', {
                  percent: completionStats.percent,
                  completed: completionStats.completed,
                  total: completionStats.total,
                  defaultValue: '{{percent}}% complete · {{completed}} of {{total}} items',
                })}
              </p>
            </div>
          </div>
        </section>

        <section className="class-overview-strip" aria-label={t('classList.contentOverviewAriaLabel', 'Class content overview')}>
          <div>
            <span>{totalLessons}</span>
            <p>{t('classList.statUnits', 'Units')}</p>
          </div>
          <div>
            <span>{overview.vocab}</span>
            <p>{t('classList.statVocabulary', 'Vocabulary')}</p>
          </div>
          <div>
            <span>{overview.grammar}</span>
            <p>{t('classList.statGrammar', 'Grammar examples')}</p>
          </div>
          <div>
            <span>{overview.dialogues}</span>
            <p>{t('classList.statDialogues', 'Dialogues')}</p>
          </div>
        </section>

        <section className="class-lessons-panel" aria-label={t('classList.unitsAriaLabel', 'Class units')}>

          {loading && <p className="class-loading">{t('classList.loading', 'Loading lessons...')}</p>}
          {error && (
            <div className="class-error" role="alert">
              <p>{error}</p>
              <button type="button" className="class-error-retry" onClick={handleRetry}>
                {t('classList.retry', 'Try again')}
              </button>
            </div>
          )}
          {!loading && !error && totalLessons === 0 && (
            <div className="class-empty">
              <h2>{t('classList.emptyTitle', 'Coming soon')}</h2>
              <p>{t('classList.emptyBody', 'Class lessons are being prepared for this language. Please check back soon.')}</p>
            </div>
          )}

          {!loading && !error && PROGRAM_LEVELS.map((levelInfo) => {
            const trackSections = TRACK_GROUPS
              .filter(({ level }) => level === levelInfo.level)
              .map((trackInfo) => ({
                trackInfo,
                lessons: groups.get(`${trackInfo.level}:${trackInfo.track}`) || [],
              }))
              .filter(({ lessons }) => lessons.length > 0);
            if (!trackSections.length) return null;
            const levelLessons = trackSections.flatMap(({ lessons }) => lessons);
            const counts = lessonRoleCounts(levelLessons);
            const levelCopy = programLevelCopyFor(levelInfo, t);

            return (
              <section
                key={levelInfo.level}
                className={`class-program-level class-level-${levelInfo.level}`}
                aria-label={levelCopy.label}
              >
                <header className="class-program-level-header">
                  <div>
                    <p className="class-kicker">{t('classList.programLevels.kicker', 'Learning level')}</p>
                    <h2>{levelCopy.label}</h2>
                    <p>{levelCopy.subtitle}</p>
                  </div>
                  <div className="class-program-level-stats" aria-label={t('classList.programLevels.statsAriaLabel', 'Level plan summary')}>
                    <span>{t('classList.programLevels.coreCount', { count: counts.core, defaultValue: '{{count}} core' })}</span>
                    <span>{t('classList.programLevels.branchCount', { count: counts.branches, defaultValue: '{{count}} branches' })}</span>
                    <span>{t('classList.programLevels.checkpointCount', { count: counts.checkpoints, defaultValue: '{{count}} checkpoints' })}</span>
                  </div>
                </header>

                {trackSections.map(({ trackInfo, lessons }) => {
                  const { label, subtitle } = trackCopyFor(trackInfo, t, targetName);
                  const TrackIcon = trackInfo?.icon || FiBookOpen;
                  return (
                    <section key={`${trackInfo.level}:${trackInfo.track}`} className={`class-track class-track-${trackInfo?.accent || 'lime'}`} aria-label={label}>
                      <header className="class-track-header">
                        <div className="class-track-title">
                          <span className="class-track-icon"><TrackIcon aria-hidden="true" /></span>
                          <div>
                            <h3>{label}</h3>
                            <p className="class-track-subtitle">{subtitle}</p>
                          </div>
                        </div>
                        <span className="class-track-count">{t('classList.lessonsCount', { count: lessons.length, defaultValue: '{{count}} lessons' })}</span>
                      </header>
                      <div className={`class-grid${lessons.length === 1 ? ' class-grid-single' : ''}`}>
                        {lessons.map((classLesson) => {
                          const stats = lessonStats(classLesson);
                          const displayTitle = nativeScaffoldText(localizedLessonTitle(classLesson.title, t), nativeLanguage, t);
                          const titleParts = String(displayTitle || '').split(/\s*\((.+)\)\s*$/).filter(Boolean);
                          const primaryTitle = titleParts[0] || displayTitle;
                          const secondaryTitle = titleParts[1] || '';
                          const roleLabel = lessonRoleLabel(classLesson.lessonRole || classLesson.learning?.lessonRole, t);
                          const weightLabel = lessonWeightLabel(classLesson.lessonWeight || classLesson.learning?.lessonWeight, t);
                          return (
                            <article
                              key={classLesson._id}
                              className={`class-card class-level-${classLesson._classify?.level || levelInfo.level}`}
                            >
                              <header className="class-card-header">
                                <span className="class-card-track">{trackLabelFor(classLesson._classify, t, targetName)}</span>
                                <span className="class-card-meta">{readableDifficulty(classLesson.difficulty, t)}</span>
                              </header>
                              <div className="class-card-title-block">
                                <h4>{primaryTitle}</h4>
                                {secondaryTitle && <p>{secondaryTitle}</p>}
                              </div>
                              <div className="class-card-plan" aria-label={t('classList.lessonPlanAriaLabel', 'Lesson plan')}>
                                <span>{roleLabel}</span>
                                <span>{weightLabel}</span>
                                {(classLesson.requiredForProgress || classLesson.coreRequired) && <span>{t('classList.requiredForProgress', 'Required')}</span>}
                              </div>
                              <ul className="class-card-stats">
                                <li><strong>{stats.vocab}</strong><span>{t('classList.statVocabulary', 'Vocabulary')}</span></li>
                                <li><strong>{stats.grammar}</strong><span>{t('classList.cardGrammar', 'Grammar')}</span></li>
                                <li><strong>{stats.dialogues}</strong><span>{t('classList.statDialogues', 'Dialogues')}</span></li>
                              </ul>
                              <div className="class-card-footer">
                                <span>{t('classList.activitiesCount', { count: stats.total, defaultValue: '{{count}} activities' })}</span>
                                <span>{t('classList.guidedTutor', 'Guided tutor')}</span>
                              </div>
                              <button type="button" className="class-card-cta" onClick={() => startClassLesson(classLesson._id)}>
                                {t('classList.startClass', 'Start class')}
                                <FiArrowRight aria-hidden="true" />
                              </button>
                            </article>
                          );
                        })}
                        {lessons.length === 1 && (
                          <aside className="class-track-guidance" aria-label={t('classList.singleTrackGuidanceAriaLabel', 'Single lesson track guidance')}>
                            <p className="class-track-guidance-kicker">{t('classList.singleTrackGuidanceKicker', 'Why one class')}</p>
                            <h4>{t('classList.singleTrackGuidanceTitle', 'Start focused, then branch out')}</h4>
                            <p>
                              {t(
                                'classList.singleTrackGuidanceBody',
                                'This track is intentionally compact so the first step feels clear. Finish the class here, then move into the next track for broader practice.',
                              )}
                            </p>
                            <div className="class-track-guidance-steps">
                              <span>{t('classList.singleTrackGuidanceStep1', 'Build the base')}</span>
                              <span>{t('classList.singleTrackGuidanceStep2', 'Continue into everyday use')}</span>
                            </div>
                          </aside>
                        )}
                      </div>
                    </section>
                  );
                })}
              </section>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default ClassLessonsPage;
