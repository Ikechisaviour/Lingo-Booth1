import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { curriculumV2Service } from '../../../services/api';
import SrsRatingBar from '../SrsRatingBar';

const REQUIRED_ATTEMPTS = 3;
const RECOVERY_TRIGGER_FAILURES = 3;

function suggestPatternOutcome(attempts, successful, required) {
  if (successful < required) return 'again';
  const failures = attempts.length - successful;
  if (failures === 0) return 'good';
  if (failures <= 2) return 'hard';
  return 'again';
}

function RecoveryPanel({ lesson, sessionId, onDone }) {
  const { t } = useTranslation();
  const [answered, setAnswered] = useState(null);
  const anchors = lesson.anchors || [];
  // Pick the first anchor as the prompt, the second as a distractor. If
  // there's only one anchor we degrade gracefully to a simple "review and
  // continue" card.
  const prompt = anchors[0];
  const distractor = anchors[1] || anchors[0];

  function pick(which) {
    if (answered !== null) return;
    setAnswered(which);
    const correct = which === 'correct';
    curriculumV2Service.recordEvent({
      conceptId: lesson.conceptId,
      lessonId: lesson.id,
      lessonType: 'PatternLesson',
      outcome: 'partial',
      hintUsed: true,
      sessionId,
      targetLang: lesson.targetLang,
    }).catch(() => {});
    setTimeout(onDone, correct ? 600 : 1500);
  }

  if (!prompt) {
    return (
      <div className="v2-banner" style={{ background: '#fffbeb', borderColor: '#fde68a', color: '#92400e' }}>
        <strong>{t('curriculumV2.pattern.recoveryNoAnchors', 'Take another look at this pattern, then try again.')}</strong>
        <div style={{ marginTop: 8 }}>
          <button className="v2-btn v2-btn--secondary" onClick={onDone}>
            {t('curriculumV2.pattern.recoveryContinue', "I'm ready")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="v2-banner" style={{ background: '#eff6ff', borderColor: '#bfdbfe', color: '#1e40af' }}>
      <strong>{t('curriculumV2.pattern.recoveryTitle', "Let's revisit before you keep going.")}</strong>
      <div style={{ marginTop: 10 }}>
        <div className="v2-shell__meta">{t('curriculumV2.pattern.recoveryAnchors', 'Anchor examples')}</div>
        {anchors.map((a, i) => (
          <div key={i} style={{ padding: '6px 0' }}>
            <div className="v2-target">{a.target}</div>
            <div className="v2-native">{a.native}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="v2-shell__meta">
          {t('curriculumV2.pattern.recoveryPrompt', 'Which Korean sentence matches this English?')}
        </div>
        <div className="v2-native" style={{ marginBottom: 8 }}>{prompt.native}</div>
        <div className="v2-choices">
          {[
            { key: 'correct', text: prompt.target, correct: true },
            { key: 'wrong',   text: distractor.target, correct: false },
          ]
            .sort(() => Math.random() - 0.5)
            .map((opt) => {
              const status = answered
                ? opt.correct ? 'is-correct' : answered === opt.key ? 'is-wrong' : ''
                : '';
              return (
                <button
                  key={opt.key}
                  className={`v2-choice ${status}`}
                  onClick={() => pick(opt.key)}
                  disabled={answered !== null}
                >
                  {opt.text}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function pickRandomDrill(drills) {
  if (!drills || drills.length === 0) return null;
  const drill = drills[Math.floor(Math.random() * drills.length)];
  const drillIndex = drills.indexOf(drill);
  const fillers = drill.fillers && drill.fillers.length
    ? drill.fillers
    : (drill.fillerConceptIds || []).map((id) => ({ id, target: null, native: id }));
  if (fillers.length === 0) return null;
  const filler = fillers[Math.floor(Math.random() * fillers.length)];
  return { drill, drillIndex, filler };
}

export default function PatternLessonPage({ lesson, onComplete, learnerLevel, sessionId }) {
  const { t } = useTranslation();
  // At beginner level we hide the slot-category metalanguage (e.g.,
  // 'agent.human') and just show the example sentences. Higher levels
  // see the chips because the abstraction speeds review.
  const showSlotChips = learnerLevel !== 'beginner';
  const [stage, setStage] = useState('anchors'); // anchors → drills → production
  const [attempts, setAttempts] = useState([]); // [{ drillIndex, filler, learnerText, evaluation, aiEnabled }]
  const [currentTask, setCurrentTask] = useState(null);
  const [learnerText, setLearnerText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [taskStartedAt, setTaskStartedAt] = useState(() => Date.now());
  const [recoveryDone, setRecoveryDone] = useState(false);

  // Seed the first task when we enter the production stage.
  useEffect(() => {
    if (stage === 'production' && !currentTask) {
      setCurrentTask(pickRandomDrill(lesson.drills));
    }
  }, [stage, currentTask, lesson.drills]);

  const filledPrompt = useMemo(() => {
    if (!currentTask) return '';
    const f = currentTask.filler;
    return currentTask.drill.promptTemplate.replace('{filler}', f.native || f.target || f.id);
  }, [currentTask]);

  const successfulAttempts = attempts.filter((a) => a.evaluation?.correct).length;
  const failedAttempts = attempts.filter((a) => a.evaluation && !a.evaluation.correct).length;
  const canFinish = successfulAttempts >= REQUIRED_ATTEMPTS;
  const needsRecovery =
    stage === 'production' &&
    failedAttempts >= RECOVERY_TRIGGER_FAILURES &&
    successfulAttempts < REQUIRED_ATTEMPTS &&
    !recoveryDone;

  async function submitAttempt() {
    if (!currentTask || !learnerText.trim() || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const { data } = await curriculumV2Service.evaluateProduction({
        lessonId: lesson.id,
        drillIndex: currentTask.drillIndex,
        fillerConceptId: currentTask.filler.id,
        learnerText: learnerText.trim(),
      });
      const attempt = {
        drillIndex: currentTask.drillIndex,
        filler: currentTask.filler,
        learnerText: learnerText.trim(),
        evaluation: data.evaluation,
        aiEnabled: data.aiEnabled,
      };
      setAttempts((prev) => [...prev, attempt]);
      curriculumV2Service.recordEvent({
        conceptId: lesson.conceptId,
        lessonId: lesson.id,
        lessonType: 'PatternLesson',
        outcome: data.evaluation?.correct ? 'correct' : data.evaluation ? 'incorrect' : 'partial',
        hintUsed: false,
        latencyMs: Date.now() - taskStartedAt,
        sessionId,
        targetLang: lesson.targetLang,
      }).catch((err) => console.warn('Event log failed:', err.message));
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message || 'Could not evaluate.');
    } finally {
      setSubmitting(false);
    }
  }

  function nextTask() {
    setCurrentTask(pickRandomDrill(lesson.drills));
    setLearnerText('');
    setSubmitError(null);
    setTaskStartedAt(Date.now());
  }

  const lastAttempt = attempts[attempts.length - 1];
  const showingFeedback = lastAttempt && lastAttempt.drillIndex === currentTask?.drillIndex
    && lastAttempt.filler.id === currentTask?.filler.id
    && lastAttempt.learnerText === learnerText.trim();

  return (
    <div className="v2-card">
      <div className="v2-shell__meta">
        {t('curriculumV2.pattern.meta', 'Pattern - {{type}}', {
          type: lesson.function || t('curriculumV2.pattern.grammarFallback', 'grammar'),
        })}
      </div>
      <h2>{lesson.patternGloss}</h2>
      <p className="v2-target">{lesson.patternTarget}</p>

      {stage === 'anchors' && (
        <>
          <h3>{t('curriculumV2.pattern.anchorExamples', 'Anchor examples')}</h3>
          {lesson.anchors.map((a, i) => (
            <div key={i} className="v2-anchor-row">
              <div className="v2-target">{a.target}</div>
              <div className="v2-native">{a.native}</div>
              {a.gloss && <div className="v2-shell__meta" style={{ marginTop: 6 }}>{a.gloss}</div>}
            </div>
          ))}
          <div className="v2-footer">
            <span className="v2-shell__meta">{t('curriculumV2.pattern.anchorInstructions', 'Read each example out loud once.')}</span>
            <button className="v2-btn v2-btn--primary" onClick={() => setStage('drills')}>
              {t('curriculumV2.continue', 'Continue')}
            </button>
          </div>
        </>
      )}

      {stage === 'drills' && (
        <>
          <h3>{t('curriculumV2.pattern.practiceSlots', 'Practice slots')}</h3>
          {lesson.drills.map((d, i) => (
            <div key={i} className="v2-drill">
              {showSlotChips && <div className="v2-drill__slot">{d.slot.replace(/_/g, ' ')}</div>}
              <div style={{ marginBottom: 6 }}>{d.promptTemplate.replace('{filler}', '___')}</div>
              <div className="v2-native">
                {t('curriculumV2.pattern.fillers', 'Fillers:')}{' '}
                {(d.fillers || []).map((f) => f.target || f.id).filter(Boolean).join(' · ')
                  || d.fillerConceptIds.map((f) => f.split('.').slice(1).join('.')).join(', ')}
              </div>
            </div>
          ))}
          <div className="v2-footer">
            <span className="v2-shell__meta">{t('curriculumV2.pattern.drillInstructions', 'For each filler above, produce a full sentence aloud.')}</span>
            <button className="v2-btn v2-btn--primary" onClick={() => setStage('production')}>
              {t('curriculumV2.pattern.practicedEach', "I've practiced each")}
            </button>
          </div>
        </>
      )}

      {stage === 'production' && (
        <>
          <h3>{t('curriculumV2.pattern.productionTask', 'Production task')}</h3>
          <div className="v2-banner">{lesson.productionTask}</div>

          {needsRecovery && (
            <RecoveryPanel
              lesson={lesson}
              sessionId={sessionId}
              onDone={() => { setRecoveryDone(true); setTaskStartedAt(Date.now()); }}
            />
          )}

          {currentTask && !needsRecovery && (
            <div style={{ marginTop: 18 }}>
              <div className="v2-shell__meta">
                {t('curriculumV2.pattern.tutorPrompt', 'Tutor prompt')}{showSlotChips ? ` · ${currentTask.drill.slot.replace(/_/g, ' ')}` : ''}
              </div>
              <p style={{ fontSize: 18, lineHeight: 1.5, marginTop: 4 }}>
                {filledPrompt}
                {currentTask.filler.target && (
                  <span style={{ marginLeft: 8, color: '#1e40af', fontWeight: 600 }}>
                    ({currentTask.filler.target})
                  </span>
                )}
              </p>

              <textarea
                value={learnerText}
                onChange={(e) => setLearnerText(e.target.value)}
                placeholder={t('curriculumV2.pattern.responsePlaceholder', 'Type your Korean response here...')}
                rows={2}
                disabled={submitting || (showingFeedback && lastAttempt?.evaluation?.correct)}
                style={{
                  width: '100%',
                  padding: 12,
                  fontSize: 18,
                  border: '2px solid #e5e7eb',
                  borderRadius: 10,
                  fontFamily: 'inherit',
                  marginTop: 8,
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !submitting) {
                    e.preventDefault();
                    submitAttempt();
                  }
                }}
              />

              {showingFeedback && lastAttempt.evaluation && (
                <div
                  className="v2-banner"
                  style={{
                    background: lastAttempt.evaluation.correct ? '#f0fdf4' : '#fef2f2',
                    border: `1px solid ${lastAttempt.evaluation.correct ? '#bbf7d0' : '#fecaca'}`,
                    color: lastAttempt.evaluation.correct ? '#166534' : '#7f1d1d',
                    marginTop: 12,
                  }}
                >
                  <strong>
                    {lastAttempt.evaluation.correct
                      ? t('curriculumV2.pattern.correct', '✓ Correct')
                      : t('curriculumV2.pattern.notQuite', '✗ Not quite')}
                  </strong>
                  <div style={{ marginTop: 4 }}>{lastAttempt.evaluation.feedback}</div>
                  {lastAttempt.evaluation.ideal && (
                    <div style={{ marginTop: 6, fontStyle: 'italic' }}>
                      {t('curriculumV2.pattern.idealAnswer', 'Ideal:')} <span className="v2-target">{lastAttempt.evaluation.ideal}</span>
                    </div>
                  )}
                </div>
              )}

              {showingFeedback && !lastAttempt.evaluation && (
                <div className="v2-banner" style={{ marginTop: 12 }}>
                  {lastAttempt.aiEnabled === false
                    ? t('curriculumV2.pattern.aiUnavailable', 'Tutor feedback is not configured. Self-check your sentence against the anchor examples above.')
                    : t('curriculumV2.pattern.aiNoParse', 'Tutor feedback returned an unclear response. Try again.')}
                </div>
              )}

              {submitError && (
                <div className="v2-banner" style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#7f1d1d', marginTop: 12 }}>
                  {submitError}
                </div>
              )}

              <div className="v2-footer">
                <span className="v2-shell__meta">
                  {t('curriculumV2.pattern.attemptCount', 'Correct attempts: {{count}} / {{required}}', {
                    count: successfulAttempts,
                    required: REQUIRED_ATTEMPTS,
                  })}
                </span>
                {showingFeedback
                  ? (
                    <button className="v2-btn v2-btn--secondary" onClick={nextTask}>
                      {t('curriculumV2.pattern.tryAnother', 'Try another')}
                    </button>
                  )
                  : (
                    <button
                      className="v2-btn v2-btn--primary"
                      onClick={submitAttempt}
                      disabled={!learnerText.trim() || submitting}
                    >
                      {submitting
                        ? t('curriculumV2.pattern.evaluating', 'Evaluating...')
                        : t('curriculumV2.pattern.submit', 'Submit')}
                    </button>
                  )}
              </div>
            </div>
          )}

          <div style={{ marginTop: 16, borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
            <div className="v2-footer">
              <button className="v2-btn v2-btn--ghost" onClick={() => setStage('drills')}>
                {t('curriculumV2.pattern.backToSlots', 'Back to slots')}
              </button>
              {!canFinish && (
                <span className="v2-shell__meta">
                  {t('curriculumV2.pattern.needMore', 'Reach {{required}} correct attempts to finish.', {
                    required: REQUIRED_ATTEMPTS,
                  })}
                </span>
              )}
            </div>
            {canFinish && (
              <SrsRatingBar
                conceptId={lesson.conceptId}
                conceptKind="pattern"
                skill="production"
                targetLang={lesson.targetLang}
                suggested={suggestPatternOutcome(attempts, successfulAttempts, REQUIRED_ATTEMPTS)}
                onRated={() => onComplete()}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
