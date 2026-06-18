import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiCheck, FiChevronDown, FiChevronUp, FiPlayCircle } from 'react-icons/fi';
import { curriculumV2Service } from '../../services/api';
import './LessonCatalogPage.css';

const FUNCTION_LABELS = {
  identification: 'Identification — "I am X / this is X"',
  description: 'Description / topic & subject marking',
  location: 'Location & destination',
  existence: 'Existence & possession',
  experience: 'Experience — "have you ever"',
  preference: 'Preference & desire',
  intention: 'Intention & plans',
  ability: 'Ability — can / cannot',
  reason: 'Reason & cause',
  condition: 'Condition & if-clauses',
};

const LESSON_TYPE_LABEL = {
  ContrastNote: 'Contrast',
  PatternLesson: 'Pattern',
  ClozeLesson: 'Cloze',
  StoryLesson: 'Story',
  VocabDeck: 'Vocab',
  PronunciationTask: 'Pronunciation',
  MinimalPairTask: 'Minimal pairs',
};

function ProgressDots({ completed, total }) {
  const dots = Array.from({ length: total });
  return (
    <span className="v2-catalog-dots" aria-label={`${completed} of ${total} complete`}>
      {dots.map((_, i) => (
        <span key={i} className={`v2-catalog-dot ${i < completed ? 'is-done' : ''}`} />
      ))}
    </span>
  );
}

function ConceptCard({ concept, onStart, onStartLesson, isOpen, onToggle }) {
  const { t } = useTranslation();
  const status = concept.progress.allComplete
    ? 'completed'
    : concept.progress.lessonsCompleted > 0
      ? 'in-progress'
      : 'new';

  return (
    <article className={`v2-catalog-concept v2-catalog-concept--${status}`}>
      <header className="v2-catalog-concept__head" onClick={onToggle} role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
      >
        <div className="v2-catalog-concept__title">
          <strong>{concept.gloss}</strong>
          <div className="v2-catalog-concept__tags">
            {concept.cefr && <span className="v2-tag v2-tag--cefr">{concept.cefr}</span>}
            {concept.topik && <span className="v2-tag v2-tag--topik">TOPIK {concept.topik}</span>}
            {status === 'completed' && (
              <span className="v2-tag v2-tag--done"><FiCheck /> {t('catalog.done', 'Done')}</span>
            )}
            {status === 'in-progress' && (
              <span className="v2-tag v2-tag--progress">{t('catalog.inProgress', 'In progress')}</span>
            )}
          </div>
        </div>
        <div className="v2-catalog-concept__progress">
          <ProgressDots completed={concept.progress.lessonsCompleted} total={concept.progress.lessonsTotal} />
          <small>{concept.progress.lessonsCompleted}/{concept.progress.lessonsTotal}</small>
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </header>

      {isOpen && (
        <div className="v2-catalog-concept__body">
          <ul className="v2-catalog-lessons">
            {concept.lessons.map((l) => (
              <li key={l.id} className={l.completed ? 'is-done' : ''}>
                <button
                  type="button"
                  className="v2-catalog-lesson-link"
                  onClick={() => onStartLesson(l.id)}
                >
                  {l.completed ? <FiCheck /> : <span className="v2-catalog-lesson-dot" />}
                  <span>{LESSON_TYPE_LABEL[l.lessonType] || l.lessonType}</span>
                  <small>~{l.estimatedMinutes || 5} min</small>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="v2-catalog-start"
            onClick={() => onStart(concept.id)}
          >
            <FiPlayCircle />
            {status === 'new'
              ? t('catalog.startConcept', 'Start this concept')
              : status === 'in-progress'
                ? t('catalog.continueConcept', 'Continue concept')
                : t('catalog.reviewConcept', 'Review concept')}
            <FiArrowRight />
          </button>
        </div>
      )}
    </article>
  );
}

function LessonCatalogPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openConceptId, setOpenConceptId] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    curriculumV2Service.getCatalog()
      .then((res) => { if (active) setCatalog(res.data); })
      .catch((err) => {
        if (active) {
          if (err.response?.status === 403) {
            setError(t('catalog.notEnabled', 'Curriculum v2 is not enabled for your account yet.'));
          } else {
            setError(err.response?.data?.message || t('catalog.loadFailed', 'Could not load the catalog.'));
          }
        }
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [t]);

  const totalProgress = useMemo(() => {
    if (!catalog) return null;
    return {
      completed: catalog.totalCompleted || 0,
      total: catalog.totalConcepts || 0,
    };
  }, [catalog]);

  const handleStartConcept = (conceptId) => {
    navigate(`/learn/v2?concept=${encodeURIComponent(conceptId)}`);
  };

  const handleStartLesson = (lessonId) => {
    navigate(`/learn/v2?lesson=${encodeURIComponent(lessonId)}`);
  };

  if (loading) {
    return <div className="v2-catalog"><div className="v2-catalog-loading">{t('common.loading', 'Loading…')}</div></div>;
  }
  if (error) {
    return <div className="v2-catalog"><div className="v2-catalog-error">{error}</div></div>;
  }
  if (!catalog || !catalog.groups?.length) {
    return <div className="v2-catalog"><div className="v2-catalog-loading">{t('catalog.empty', 'No lessons yet.')}</div></div>;
  }

  return (
    <main className="v2-catalog">
      <header className="v2-catalog-hero">
        <button type="button" className="v2-catalog-back" onClick={() => navigate('/learn/v2')}>
          ← {t('catalog.backToSession', 'Continue your session')}
        </button>
        <h1>{t('catalog.title', 'Browse Korean lessons')}</h1>
        <p>
          {t(
            'catalog.subtitle',
            'Every concept the planner can teach. Pick one to dive in, or let the system pick for you on the main Learn page.',
          )}
        </p>
        {totalProgress && (
          <div className="v2-catalog-progress">
            <strong>{totalProgress.completed}/{totalProgress.total}</strong>{' '}
            {t('catalog.conceptsMastered', 'concepts mastered')}
          </div>
        )}
      </header>

      {catalog.groups.map((group) => (
        <section key={group.function} className="v2-catalog-group">
          <h2>{FUNCTION_LABELS[group.function] || group.function}</h2>
          <div className="v2-catalog-group-body">
            {group.concepts.map((concept) => (
              <ConceptCard
                key={concept.id}
                concept={concept}
                onStart={handleStartConcept}
                onStartLesson={handleStartLesson}
                isOpen={openConceptId === concept.id}
                onToggle={() => setOpenConceptId(openConceptId === concept.id ? '' : concept.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default LessonCatalogPage;
