import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HubPages.css';

function ExercisePage() {
  const navigate = useNavigate();

  return (
    <div className="hub-page">
      <div className="hub-container">
        <section className="hub-panel" aria-label="Exercise">
          <p className="hub-kicker">Exercise</p>
          <h1>Choose an exercise</h1>
          <p>Practice with quizzes or review vocabulary with flashcards.</p>

          <div className="hub-grid">
            <button type="button" className="hub-card" onClick={() => navigate('/quiz')}>
              <span className="hub-card-icon" aria-hidden="true">&#9997;</span>
              <div>
                <h2>Quiz</h2>
                <p>Work through lesson questions and check your understanding.</p>
              </div>
            </button>

            <button type="button" className="hub-card" onClick={() => navigate('/flashcards')}>
              <span className="hub-card-icon" aria-hidden="true">&#127183;</span>
              <div>
                <h2>Flashcards</h2>
                <p>Review words and phrases until they feel familiar.</p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ExercisePage;
