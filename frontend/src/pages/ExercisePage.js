import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './HubPages.css';

function ExercisePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="hub-page">
      <div className="hub-container">
        <section className="hub-panel" aria-label={t('exerciseHub.ariaLabel', 'Exercise')}>
          <p className="hub-kicker">{t('navbar.exercise')}</p>
          <h1>{t('exerciseHub.title', 'Choose an exercise')}</h1>
          <p>{t('exerciseHub.subtitle', 'Practice with quizzes, review vocabulary with flashcards, or build handwriting memory.')}</p>

          <div className="hub-grid">
            <button type="button" className="hub-card" onClick={() => navigate('/quiz')}>
              <span className="hub-card-icon" aria-hidden="true">&#9997;</span>
              <div>
                <h2>{t('navbar.quiz')}</h2>
                <p>{t('exerciseHub.quizDesc', 'Work through lesson questions and check your understanding.')}</p>
              </div>
            </button>

            <button type="button" className="hub-card" onClick={() => navigate('/flashcards')}>
              <span className="hub-card-icon" aria-hidden="true">&#127183;</span>
              <div>
                <h2>{t('navbar.flashcards')}</h2>
                <p>{t('exerciseHub.flashcardsDesc', 'Review words and phrases until they feel familiar.')}</p>
              </div>
            </button>

            <button type="button" className="hub-card" onClick={() => navigate('/writing')}>
              <span className="hub-card-icon" aria-hidden="true">&#9998;</span>
              <div>
                <h2>{t('navbar.writing')}</h2>
                <p>{t('exerciseHub.writingDesc', 'Trace, copy, listen, recall by meaning, and keep a handwriting notebook.')}</p>
              </div>
            </button>

            <button type="button" className="hub-card" onClick={() => navigate('/review')}>
              <span className="hub-card-icon" aria-hidden="true">&#8635;</span>
              <div>
                <h2>{t('navbar.review', 'Review')}</h2>
                <p>{t('exerciseHub.reviewDesc', 'Return to saved items, weak areas, and what is due today.')}</p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ExercisePage;
