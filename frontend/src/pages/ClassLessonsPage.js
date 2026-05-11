import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classLessonService } from '../services/api';
import './HubPages.css';
import './ClassLessonsPage.css';

// Track displayed order and labels. Adjust here when adding new tracks/levels.
const TRACK_GROUPS = [
  { level: 1, track: 'foundation', label: 'Level 1 · Foundation (Hangul)', subtitle: 'Start here — read and write 한글 first.' },
  { level: 1, track: 'thematic', label: 'Level 1 · Korean Basics', subtitle: 'Everyday Korean — greetings, ordering food, getting around.' },
  { level: 2, track: 'thematic', label: 'Level 2 · Thematic Intermediate', subtitle: 'Topic-driven units on aptitude, health, sports, culture and more.' },
  { level: 2, track: 'adult', label: 'Level 2 · Workplace Korean', subtitle: 'Adult / migrant-worker register: shifts, contracts, safety, housing.' },
  { level: 3, track: 'grammar', label: 'Level 3 · Advanced Grammar', subtitle: 'Pattern-driven clusters that consolidate 30 grammar forms.' },
];

// Parse the position of a lesson inside its track from the title text.
// Korean titles use "1과", "2과", "복습 1" etc.; English Level-3 titles use words.
// Reviews land after their cohort (R1 → 3.5, R2 → 6.5, R3 → 9.5).
function parsePosition(title = '') {
  if (/입문|Hangul foundation/.test(title)) return 0;
  const reviewMatch = title.match(/복습\s*(\d+)/);
  if (reviewMatch) return parseInt(reviewMatch[1], 10) * 3 + 0.5;
  const unitMatch = title.match(/(\d+)\s*과/);
  if (unitMatch) return parseInt(unitMatch[1], 10);
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

function ClassLessonsPage() {
  const navigate = useNavigate();
  const [classLessons, setClassLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          setError('Could not load class lessons. Make sure the backend is running and seeded.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadClassLessons();
    return () => { cancelled = true; };
  }, []);

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

  return (
    <div className="hub-page">
      <div className="hub-container">
        <section className="hub-panel" aria-label="Class">
          <p className="hub-kicker">Class</p>
          <h1>Learn with your tutor</h1>
          <p>Pick a unit. Your tutor walks you through vocabulary, grammar, and dialogues one item at a time.</p>

          {loading && <p className="class-loading">Loading lessons...</p>}
          {error && <p className="class-error">{error}</p>}
          {!loading && !error && totalLessons === 0 && (
            <div className="class-empty">
              <h2>Coming soon</h2>
              <p>Class lessons are being prepared for this language. Please check back soon.</p>
            </div>
          )}

          {!loading && !error && TRACK_GROUPS.map(({ level, track, label, subtitle }) => {
            const lessons = groups.get(`${level}:${track}`);
            if (!lessons || lessons.length === 0) return null;
            return (
              <section key={`${level}:${track}`} className="class-track" aria-label={label}>
                <header className="class-track-header">
                  <h2>{label}</h2>
                  <span className="class-track-count">{lessons.length} lessons</span>
                </header>
                <p className="class-track-subtitle">{subtitle}</p>
                <div className="class-grid">
                  {lessons.map((classLesson) => {
                    const items = Array.isArray(classLesson.content) ? classLesson.content : [];
                    const vocab = items.filter((item) => item.type === 'word').length;
                    const sentences = items.filter((item) => item.type === 'sentence').length;
                    const conversations = items.filter((item) => item.type === 'conversation').length;
                    return (
                      <article key={classLesson._id} className="class-card">
                        <header className="class-card-header">
                          <h3>{classLesson.title}</h3>
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
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default ClassLessonsPage;
