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
    track: 'thematic',
    titleKey: 'classList.tracks.thematicTitle',
    subtitleKey: 'classList.tracks.thematicSubtitle',
    fallbackTitle: 'Level {{level}} - Everyday {{language}}',
    fallbackSubtitle: 'Core everyday lessons for greetings, food, places, plans, and daily situations.',
    accent: 'lime',
    icon: FiTarget,
  },
  {
    level: 2,
    track: 'thematic',
    titleKey: 'classList.tracks.intermediateTitle',
    subtitleKey: 'classList.tracks.intermediateSubtitle',
    fallbackTitle: 'Level {{level}} - Intermediate {{language}}',
    fallbackSubtitle: 'Topic-driven units for opinions, culture, health, work, and everyday confidence.',
    accent: 'sky',
    icon: FiLayers,
  },
  {
    level: 2,
    track: 'adult',
    titleKey: 'classList.tracks.professionalTitle',
    subtitleKey: 'classList.tracks.professionalSubtitle',
    fallbackTitle: 'Level {{level}} - Professional {{language}}',
    fallbackSubtitle: 'Practical language for work, services, housing, safety, and formal situations.',
    accent: 'orange',
    icon: FiMessageCircle,
  },
  {
    level: 3,
    track: 'grammar',
    titleKey: 'classList.tracks.grammarTitle',
    subtitleKey: 'classList.tracks.grammarSubtitle',
    fallbackTitle: 'Level {{level}} - Advanced grammar',
    fallbackSubtitle: 'Pattern clusters that help you connect ideas with more control.',
    accent: 'violet',
    icon: FiCheckCircle,
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

// Classify a lesson into (level, track, position) using its metadata + title.
function classifyLesson(lesson) {
  if (lesson?.course?.level && lesson?.course?.track) {
    return {
      level: lesson.course.level,
      track: lesson.course.track,
      position: Number(lesson.course.position || 99),
    };
  }

  const { difficulty, lessonType, title = '' } = lesson;
  const position = parsePosition(title);

  if (lessonType === 'foundation') return { level: 1, track: 'foundation', position };
  if (lessonType === 'workplace') return { level: 2, track: 'adult', position };
  if (lessonType === 'grammar') return { level: 3, track: 'grammar', position };
  if (lessonType === 'review') return { level: 2, track: 'thematic', position };
  if (difficulty === 'beginner') return { level: 1, track: 'thematic', position };
  if (difficulty === 'intermediate') return { level: 2, track: 'thematic', position };
  if (difficulty === 'advanced') return { level: 3, track: 'grammar', position };
  return { level: 9, track: 'other', position };
}

function lessonStats(classLesson) {
  const items = Array.isArray(classLesson.content) ? classLesson.content : [];
  return {
    total: items.length,
    vocab: items.filter((item) => item.type === 'word').length,
    grammar: items.filter((item) => item.type === 'sentence').length,
    dialogues: items.filter((item) => item.type === 'conversation').length,
  };
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

function trackLabelFor(classify, t, targetName) {
  const trackInfo = TRACK_GROUPS.find((item) => item.level === classify.level && item.track === classify.track);
  return trackInfo ? trackCopyFor(trackInfo, t, targetName).label : t('classList.classFallback', 'Class');
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
  const targetLanguage = getTargetLangCode();
  const nativeLanguage = getNativeLangCode();
  const targetName = languageNameFor(targetLanguage, t);

  useEffect(() => {
    let cancelled = false;

    async function loadClassLessons() {
      try {
        const response = await classLessonService.getClassLessons();
        if (cancelled) return;
        const list = Array.isArray(response.data) ? [...response.data] : [];
        setClassLessons(list);
      } catch (err) {
        if (!cancelled) {
          setError(t('classList.loadError', 'Could not load class lessons. Make sure the backend is running and seeded.'));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadClassLessons();
    return () => { cancelled = true; };
  }, [t]);

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
              <span className="class-hero-note">{t('classList.note', 'Built for guided lessons, not quick drills.')}</span>
            </div>
          </div>

          <div className="class-hero-panel" aria-label={t('classList.overviewAriaLabel', 'Class overview')}>
            <div className="class-hero-panel-top">
              <span className="class-hero-icon"><FiLayers aria-hidden="true" /></span>
              <span className="class-hero-count">{totalLessons || '--'}</span>
            </div>
            <p>{t('classList.availableUnits', 'available class units')}</p>
            <div className="class-hero-meter" aria-hidden="true">
              <span style={{ width: totalLessons ? '72%' : '24%' }} />
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
          {error && <p className="class-error">{error}</p>}
          {!loading && !error && totalLessons === 0 && (
            <div className="class-empty">
              <h2>{t('classList.emptyTitle', 'Coming soon')}</h2>
              <p>{t('classList.emptyBody', 'Class lessons are being prepared for this language. Please check back soon.')}</p>
            </div>
          )}

          {!loading && !error && TRACK_GROUPS.map(({ level, track }) => {
            const lessons = groups.get(`${level}:${track}`);
            if (!lessons || lessons.length === 0) return null;
            const trackInfo = TRACK_GROUPS.find((item) => item.level === level && item.track === track);
            const { label, subtitle } = trackCopyFor(trackInfo, t, targetName);
            const TrackIcon = trackInfo?.icon || FiBookOpen;
            return (
              <section key={`${level}:${track}`} className={`class-track class-track-${trackInfo?.accent || 'lime'}`} aria-label={label}>
                <header className="class-track-header">
                  <div className="class-track-title">
                    <span className="class-track-icon"><TrackIcon aria-hidden="true" /></span>
                    <div>
                      <h2>{label}</h2>
                      <p className="class-track-subtitle">{subtitle}</p>
                    </div>
                  </div>
                  <span className="class-track-count">{t('classList.lessonsCount', { count: lessons.length, defaultValue: '{{count}} lessons' })}</span>
                </header>
                <div className="class-grid">
                  {lessons.map((classLesson) => {
                    const stats = lessonStats(classLesson);
                    const displayTitle = nativeScaffoldText(localizedLessonTitle(classLesson.title, t), nativeLanguage, t);
                    const titleParts = String(displayTitle || '').split(/\s*\((.+)\)\s*$/).filter(Boolean);
                    const primaryTitle = titleParts[0] || displayTitle;
                    const secondaryTitle = titleParts[1] || '';
                    return (
                      <article key={classLesson._id} className="class-card">
                        <header className="class-card-header">
                          <span className="class-card-track">{trackLabelFor(classLesson._classify, t, targetName)}</span>
                          <span className="class-card-meta">{readableDifficulty(classLesson.difficulty, t)}</span>
                        </header>
                        <div className="class-card-title-block">
                          <h3>{primaryTitle}</h3>
                          {secondaryTitle && <p>{secondaryTitle}</p>}
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
                </div>
              </section>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default ClassLessonsPage;
