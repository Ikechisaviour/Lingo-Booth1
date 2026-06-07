import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function StoryLessonPage({ lesson, onComplete }) {
  const { t } = useTranslation();
  const [revealedTurns, setRevealedTurns] = useState(new Set());
  const [showQuestions, setShowQuestions] = useState(false);

  function toggleReveal(idx) {
    setRevealedTurns((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  }

  return (
    <div className="v2-card">
      <div className="v2-shell__meta">
        {lesson.mode === 'dialogue'
          ? t('curriculumV2.story.dialogueMode', 'Dialogue')
          : t('curriculumV2.story.storyMode', 'Story')}
      </div>
      <h2>{lesson.title}</h2>

      {lesson.turns.map((turn, i) => {
        const revealed = revealedTurns.has(i);
        return (
          <div key={i} className="v2-story-turn">
            {turn.speaker && <div className="v2-story-turn__speaker">{turn.speaker}</div>}
            <div className="v2-story-turn__lines">
              <div className="v2-target">{turn.target}</div>
              {revealed && <div className="v2-native">{turn.native}</div>}
              {revealed && turn.glosses && (
                <div className="v2-shell__meta" style={{ marginTop: 4 }}>
                  {turn.glosses.map((g, j) => (
                    <span key={j} style={{ marginRight: 12 }}>
                      <strong>{g.target}</strong> — {g.native}{g.note ? ` (${g.note})` : ''}
                    </span>
                  ))}
                </div>
              )}
              <span className="v2-gloss-toggle" onClick={() => toggleReveal(i)}>
                {revealed
                  ? t('curriculumV2.story.hideTranslation', 'Hide translation')
                  : t('curriculumV2.story.showTranslation', 'Show translation')}
              </span>
            </div>
          </div>
        );
      })}

      {showQuestions ? (
        <>
          <h3>{t('curriculumV2.story.comprehensionQuestions', 'Comprehension questions')}</h3>
          <ul>
            {lesson.comprehensionQuestions.map((q, i) => <li key={i} style={{ margin: '8px 0' }}>{q}</li>)}
          </ul>
          <div className="v2-footer">
            <span className="v2-shell__meta">{t('curriculumV2.story.questionInstructions', 'Answer each in your head or out loud.')}</span>
            <button className="v2-btn v2-btn--primary" onClick={onComplete}>
              {t('curriculumV2.done', 'Done')}
            </button>
          </div>
        </>
      ) : (
        <div className="v2-footer">
          <span className="v2-shell__meta">~{lesson.estimatedMinutes} min</span>
          <button className="v2-btn v2-btn--primary" onClick={() => setShowQuestions(true)}>
            {t('curriculumV2.story.readStory', "I've read the story")}
          </button>
        </div>
      )}
    </div>
  );
}
