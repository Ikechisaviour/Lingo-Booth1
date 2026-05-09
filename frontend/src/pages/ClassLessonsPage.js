import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classLessonService } from '../services/api';
import { getTargetLangCode, getTargetLangName } from '../config/languages';
import './HubPages.css';
import './ClassLessonsPage.css';

function ClassLessonsPage() {
  const navigate = useNavigate();
  const [classLessons, setClassLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const targetLanguage = getTargetLangCode();
  const targetName = getTargetLangName();

  useEffect(() => {
    let cancelled = false;

    async function loadClassLessons() {
      try {
        const response = await classLessonService.getClassLessons();
        if (cancelled) return;
        const list = Array.isArray(response.data) ? [...response.data] : [];
        list.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'ko'));
        setClassLessons(list);
      } catch (err) {
        if (!cancelled) {
          setError('Could not load class lessons. Make sure the backend is running and seeded.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadClassLessons();
    return () => {
      cancelled = true;
    };
  }, []);

  const startClassLesson = (classLessonId) => {
    navigate(`/class/${encodeURIComponent(classLessonId)}`);
  };

  return (
    <div className="hub-page">
      <div className="hub-container">
        <section className="hub-panel" aria-label="Class">
          <p className="hub-kicker">Class</p>
          <h1>Learn with your tutor</h1>
          <p>Pick a unit. Your tutor walks you through vocabulary, grammar, and dialogues one item at a time.</p>

          {loading && <p className="class-loading">Loading lessons...</p>}
          {error && <p className="class-error">{error}</p>}
          {!loading && !error && classLessons.length === 0 && (
            <p className="class-empty">
              {targetLanguage === 'ko'
                ? 'Class lessons are being prepared. Please refresh in a moment.'
                : `Class lessons for ${targetName} are coming soon.`}
            </p>
          )}

          <div className="class-grid">
            {classLessons.map((classLesson) => {
              const items = Array.isArray(classLesson.content) ? classLesson.content : [];
              const vocab = items.filter((item) => item.type === 'word').length;
              const sentences = items.filter((item) => item.type === 'sentence').length;
              const conversations = items.filter((item) => item.type === 'conversation').length;

              return (
                <article key={classLesson._id} className="class-card">
                  <header className="class-card-header">
                    <h2>{classLesson.title}</h2>
                    <span className="class-card-meta">{classLesson.difficulty}</span>
                  </header>
                  <ul className="class-card-stats">
                    <li><strong>{vocab}</strong> vocabulary</li>
                    <li><strong>{sentences}</strong> grammar examples</li>
                    <li><strong>{conversations}</strong> dialogues</li>
                  </ul>
                  <button type="button" className="class-card-cta" onClick={() => startClassLesson(classLesson._id)}>
                    Start class
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ClassLessonsPage;
