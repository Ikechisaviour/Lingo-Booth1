import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PlayableKorean from '../../../components/PlayableKorean';
import { useLessonAudio, prepForSpeech, LessonAudioButton } from '../../../utils/v2Audio';

export default function StoryLessonPage({ lesson, onComplete, onBack }) {
  const { t } = useTranslation();
  const audio = useLessonAudio(lesson.targetLang || 'ko');
  const [revealedTurns, setRevealedTurns] = useState(new Set());
  const [showQuestions, setShowQuestions] = useState(false);

  function handleBackClick() {
    if (showQuestions) {
      setShowQuestions(false);
      return;
    }
    if (onBack) onBack();
  }

  function toggleReveal(idx) {
    setRevealedTurns((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  }

  const metaLine = lesson.mode === 'dialogue'
    ? t('curriculumV2.story.dialogueMode', 'Dialogue')
    : t('curriculumV2.story.storyMode', 'Story');

  // Page script: title + every turn (speaker label + target line). When
  // the learner has revealed a turn's translation, include the native too
  // so a re-play also reads the gloss. Comprehension questions, if shown,
  // get appended.
  const pageScript = useMemo(() => {
    const lines = [`${metaLine}. ${lesson.title || ''}.`];
    (lesson.turns || []).forEach((turn, i) => {
      if (turn.speaker) lines.push(`${turn.speaker}.`);
      lines.push(turn.target);
      if (revealedTurns.has(i) && turn.native) lines.push(prepForSpeech(turn.native));
    });
    if (showQuestions && lesson.comprehensionQuestions?.length) {
      lines.push(t('curriculumV2.story.comprehensionQuestions', 'Comprehension questions') + '.');
      lesson.comprehensionQuestions.forEach((q, i) => {
        lines.push(`${t('curriculumV2.story.questionN', 'Question {{n}}.', { n: i + 1 })} ${prepForSpeech(q)}`);
      });
    }
    return lines.filter(Boolean);
  }, [lesson, revealedTurns, showQuestions, t, metaLine]);

  // Listen mode: auto-play the whole story on mount.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const listenMode = localStorage.getItem('listenMode') === 'true';
    if (!listenMode) return undefined;
    const timer = setTimeout(() => audio.play('page', pageScript), 200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="v2-card">
      <div className="v2-shell__meta v2-contrast__topbar">
        <span>{metaLine}</span>
        <LessonAudioButton
          audio={audio}
          scope="page"
          items={pageScript}
          variant="primary"
          label={t('curriculumV2.playPage', 'Play whole lesson')}
        />
      </div>
      <h2>{lesson.title}</h2>

      {lesson.turns.map((turn, i) => {
        const revealed = revealedTurns.has(i);
        return (
          <div key={i} className="v2-story-turn">
            {turn.speaker && <div className="v2-story-turn__speaker">{turn.speaker}</div>}
            <div className="v2-story-turn__lines">
              <div className="v2-target">
                {turn.target}{' '}
                <PlayableKorean text={turn.target} ariaLabel={t('curriculumV2.playLine', 'Play line')} />
              </div>
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
            {onBack && (
              <button className="v2-btn v2-btn--secondary" onClick={handleBackClick}>
                ← {t('curriculumV2.back', 'Back')}
              </button>
            )}
            <span className="v2-shell__meta">{t('curriculumV2.story.questionInstructions', 'Answer each in your head or out loud.')}</span>
            <button className="v2-btn v2-btn--primary" onClick={onComplete}>
              {t('curriculumV2.done', 'Done')}
            </button>
          </div>
        </>
      ) : (
        <div className="v2-footer">
          {onBack && (
            <button className="v2-btn v2-btn--secondary" onClick={handleBackClick}>
              ← {t('curriculumV2.back', 'Back')}
            </button>
          )}
          <span className="v2-shell__meta">~{lesson.estimatedMinutes} min</span>
          <button className="v2-btn v2-btn--primary" onClick={() => setShowQuestions(true)}>
            {t('curriculumV2.story.readStory', "I've read the story")}
          </button>
        </div>
      )}
    </div>
  );
}
