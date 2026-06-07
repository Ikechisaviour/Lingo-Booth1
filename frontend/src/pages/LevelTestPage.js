import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiAward, FiCheckCircle, FiClipboard, FiCreditCard, FiLock, FiRefreshCw } from 'react-icons/fi';
import { billingService, levelTestService } from '../services/api';
import { getLanguageDisplayName } from '../config/languages';
import './LevelTestPage.css';

const LEVELS = [1, 2, 3, 4];
const MODES = ['completion', 'proficiency'];

function taskInstruction(t, taskType) {
  const labels = {
    choose_target: t('levelTests.tasks.chooseTarget', 'Choose the target-language answer.'),
    choose_meaning: t('levelTests.tasks.chooseMeaning', 'Choose the best meaning.'),
    type_target: t('levelTests.tasks.typeTarget', 'Type the target-language answer.'),
    short_response: t('levelTests.tasks.shortResponse', 'Answer in the target language, then score your response.'),
  };
  return labels[taskType] || t('levelTests.tasks.default', 'Answer the question.');
}

function skillLabel(t, skill) {
  return t(`levelTests.skills.${skill}`, skill || t('levelTests.skills.general', 'General'));
}

const formatPrice = (cents) => `$${((Number(cents) || 0) / 100).toFixed(0)}`;

function contextLabel(t, context) {
  if (context.contextType === 'institution') {
    return context.organizationName || t('levelTests.institutionContext', 'Institution');
  }
  return t('levelTests.personalContext', 'Personal');
}

function LevelTestPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [contexts, setContexts] = useState([]);
  const [overview, setOverview] = useState(null);
  const [testEntitlements, setTestEntitlements] = useState(null);
  const [paymentRequired, setPaymentRequired] = useState(null);
  const [selectedContextKey, setSelectedContextKey] = useState('personal');
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedMode, setSelectedMode] = useState('completion');
  const [attempt, setAttempt] = useState(null);
  const [answers, setAnswers] = useState({});
  const [certificate, setCertificate] = useState(null);
  const [namePrompt, setNamePrompt] = useState({
    open: false,
    value: localStorage.getItem('userFullName') || '',
    error: '',
  });

  const nativeLanguage = localStorage.getItem('nativeLanguage') || 'en';
  const targetLanguage = localStorage.getItem('targetLanguage') || 'ko';

  const selectedContext = useMemo(() => {
    if (!contexts.length) return { contextType: 'personal' };
    return contexts.find((context) => {
      const key = context.contextType === 'institution'
        ? `institution:${context.organizationId}`
        : 'personal';
      return key === selectedContextKey;
    }) || contexts[0];
  }, [contexts, selectedContextKey]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const contextRes = await levelTestService.getContexts();
      const nextContexts = contextRes.data?.contexts || [];
      setContexts(nextContexts);
      const overviewRes = await levelTestService.getOverview({
        contextType: selectedContext?.contextType || 'personal',
        organizationId: selectedContext?.organizationId || '',
        targetLanguage,
        nativeLanguage,
      });
      setOverview(overviewRes.data);
      setTestEntitlements(overviewRes.data?.testEntitlements || null);
    } catch (err) {
      setError(t('levelTests.loadFailed', 'Could not load level testing right now.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedContextKey, targetLanguage, nativeLanguage]);

  const start = async () => {
    setSaving(true);
    setError('');
    setNotice('');
    setPaymentRequired(null);
    setCertificate(null);
    try {
      const res = await levelTestService.start({
        level: selectedLevel,
        mode: selectedMode,
        contextType: selectedContext?.contextType || 'personal',
        organizationId: selectedContext?.organizationId || '',
        targetLanguage,
        nativeLanguage,
      });
      setAttempt(res.data.attempt);
      setTestEntitlements(res.data.testEntitlements || testEntitlements);
      setAnswers({});
    } catch (err) {
      const code = err.response?.data?.code;
      if (err.response?.data?.testEntitlements) setTestEntitlements(err.response.data.testEntitlements);
      if (code === 'PROFICIENCY_TEST_PAYMENT_REQUIRED') {
        const priceCents = err.response?.data?.priceCents || 1000;
        setPaymentRequired({ priceCents });
        setError(t('levelTests.proficiencyPaymentRequired', 'This proficiency check is {{price}} after your included checks.', { price: formatPrice(priceCents) }));
      } else {
        setError(err.response?.data?.message || t('levelTests.startFailed', 'This test is not ready yet.'));
      }
    } finally {
      setSaving(false);
    }
  };

  const startPaidProficiencyCheckout = async () => {
    setSaving(true);
    setError('');
    try {
      const origin = window.location.origin;
      const res = await billingService.createLevelTestCheckoutSession({
        successUrl: `${origin}/level-tests?checkout=success`,
        cancelUrl: `${origin}/level-tests?checkout=cancelled`,
      });
      if (res.data?.checkoutUrl) {
        window.location.assign(res.data.checkoutUrl);
        return;
      }
      if (res.data?.requiresSetup) {
        setError(t('levelTests.paymentSetupNeeded', 'Paid proficiency checks are not configured yet.'));
        return;
      }
      setError(t('levelTests.paymentStartFailed', 'Could not start payment for this proficiency check.'));
    } catch {
      setError(t('levelTests.paymentStartFailed', 'Could not start payment for this proficiency check.'));
    } finally {
      setSaving(false);
    }
  };

  const updateAnswer = (questionId, patch) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: { ...(current[questionId] || {}), questionId, ...patch },
    }));
  };

  const submit = async () => {
    if (!attempt?._id) return;
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const res = await levelTestService.submit(attempt._id, Object.values(answers));
      setAttempt(res.data.attempt);
      setNotice(t('levelTests.submitted', 'Your test has been scored.'));
    } catch {
      setError(t('levelTests.submitFailed', 'Could not submit this test.'));
    } finally {
      setSaving(false);
    }
  };

  const issueCertificate = async (fullNameOverride = '') => {
    if (!attempt?._id) return;
    setSaving(true);
    setError('');
    try {
      const payload = fullNameOverride ? { fullName: fullNameOverride.trim() } : {};
      const res = await levelTestService.issueCertificate(attempt._id, payload);
      setCertificate(res.data.certificate);
      if (payload.fullName) {
        localStorage.setItem('userFullName', payload.fullName);
      }
      setNamePrompt((current) => ({ ...current, open: false, error: '' }));
      setNotice(t('levelTests.certificateReady', 'Your certificate is ready.'));
    } catch (err) {
      const code = err.response?.data?.code;
      if (code === 'FULL_NAME_REQUIRED' || code === 'FULL_NAME_INVALID') {
        setNamePrompt((current) => ({
          open: true,
          value: current.value || localStorage.getItem('userFullName') || '',
          error: code === 'FULL_NAME_INVALID'
            ? t('levelTests.fullNameInvalid', 'Enter at least two characters for your full name.')
            : '',
        }));
        return;
      }
      setError(t('levelTests.certificateFailed', 'Could not issue this certificate yet.'));
    } finally {
      setSaving(false);
    }
  };

  const submitCertificateName = () => {
    const value = namePrompt.value.trim();
    if (value.length < 2) {
      setNamePrompt((current) => ({
        ...current,
        error: t('levelTests.fullNameInvalid', 'Enter at least two characters for your full name.'),
      }));
      return;
    }
    issueCertificate(value);
  };

  const scoreState = attempt?.status === 'submitted';
  const allowedTargetLanguages = selectedContext?.allowedTargetLanguages || [];
  const restricted = selectedContext?.contextType === 'institution' && !allowedTargetLanguages.includes(targetLanguage);
  const proficiencyEntitlement = testEntitlements?.proficiencyTests || null;

  if (loading) {
    return <main className="level-test-page"><div className="loading">{t('common.loading', 'Loading...')}</div></main>;
  }

  return (
    <main className="level-test-page">
      <section className="level-test-hero">
        <div>
          <p className="level-test-kicker">{t('levelTests.kicker', 'Level checks')}</p>
          <h1>{t('levelTests.title', 'Show what you can do')}</h1>
          <p>
            {t('levelTests.subtitle', 'Complete a level check for progress, or take a proficiency check when you want stronger proof of ability.')}
          </p>
          <div className="level-test-pair">
            {getLanguageDisplayName(nativeLanguage, t)} &rarr; {getLanguageDisplayName(targetLanguage, t)}
          </div>
        </div>
        <button type="button" className="level-test-secondary" onClick={() => navigate('/profile')} title={t('levelTests.verifyHint', 'Certificates can be verified with their certificate ID.')}>
          <FiAward /> {t('levelTests.certificates', 'Certificates')}
        </button>
      </section>

      {(error || notice) && (
        <div className={`level-test-notice ${error ? 'error' : ''}`}>
          {error || notice}
        </div>
      )}

      {namePrompt.open && (
        <div className="level-test-modal-backdrop" role="presentation">
          <section className="level-test-name-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-name-title">
            <p className="level-test-kicker">{t('levelTests.certificateNameKicker', 'Certificate name')}</p>
            <h2 id="certificate-name-title">{t('levelTests.fullNameRequiredTitle', 'Add your full name')}</h2>
            <p>
              {t('levelTests.fullNameRequiredBody', 'Enter your full name exactly as it should appear on this certificate. You only need to do this before issuing a certificate.')}
            </p>
            <label htmlFor="certificateFullName">{t('levelTests.fullNameLabel', 'Full name')}</label>
            <input
              id="certificateFullName"
              type="text"
              value={namePrompt.value}
              onChange={(event) => setNamePrompt((current) => ({ ...current, value: event.target.value, error: '' }))}
              placeholder={t('levelTests.fullNamePlaceholder', 'Your full name')}
              autoComplete="name"
            />
            {namePrompt.error && <p className="level-test-name-error">{namePrompt.error}</p>}
            <div className="level-test-name-actions">
              <button type="button" className="level-test-secondary" onClick={() => setNamePrompt((current) => ({ ...current, open: false, error: '' }))}>
                {t('common.cancel', 'Cancel')}
              </button>
              <button type="button" className="level-test-primary" onClick={submitCertificateName} disabled={saving}>
                <FiAward /> {saving ? t('common.saving', 'Saving...') : t('levelTests.saveNameAndIssue', 'Save name and issue certificate')}
              </button>
            </div>
          </section>
        </div>
      )}

      <section className="level-test-shell">
        <aside className="level-test-setup">
          <div className="level-test-card">
            <p className="level-test-kicker">{t('levelTests.context', 'Context')}</p>
            <div className="level-test-contexts">
              {contexts.map((context) => {
                const key = context.contextType === 'institution' ? `institution:${context.organizationId}` : 'personal';
                return (
                  <button
                    type="button"
                    key={key}
                    className={key === selectedContextKey ? 'active' : ''}
                    onClick={() => setSelectedContextKey(key)}
                  >
                    {contextLabel(t, context)}
                  </button>
                );
              })}
            </div>
            {selectedContext?.contextType === 'institution' && (
              <p className="level-test-hint">
                {t('levelTests.allowedLanguages', 'Available target languages')}: {(allowedTargetLanguages || []).map((code) => getLanguageDisplayName(code, t)).join(', ')}
              </p>
            )}
          </div>

          <div className="level-test-card">
            <p className="level-test-kicker">{t('levelTests.chooseLevel', 'Choose level')}</p>
            <div className="level-test-levels">
              {LEVELS.map((level) => (
                <button
                  type="button"
                  key={level}
                  className={selectedLevel === level ? 'active' : ''}
                  onClick={() => setSelectedLevel(level)}
                >
                  {t('levelTests.levelLabel', 'Level {{level}}', { level })}
                </button>
              ))}
            </div>
          </div>

          <div className="level-test-card">
            <p className="level-test-kicker">{t('levelTests.testType', 'Test type')}</p>
            <div className="level-test-modes">
              {MODES.map((mode) => (
                <button
                  type="button"
                  key={mode}
                  className={selectedMode === mode ? 'active' : ''}
                  onClick={() => setSelectedMode(mode)}
                >
                  <strong>{t(`levelTests.modes.${mode}.title`, mode)}</strong>
                  <span>{t(`levelTests.modes.${mode}.body`, mode === 'completion' ? 'For finishing a level.' : 'For stronger proof of ability.')}</span>
                </button>
              ))}
            </div>
            <button type="button" className="level-test-primary full" onClick={start} disabled={saving || restricted}>
              {restricted ? <FiLock /> : <FiClipboard />}
              {saving ? t('common.loading', 'Loading...') : t('levelTests.start', 'Start check')}
            </button>
            {selectedMode === 'proficiency' && proficiencyEntitlement && (
              <p className="level-test-hint">
                {t('levelTests.proficiencyAllowance', '{{remaining}} of {{included}} included proficiency checks left this month. Extra checks are {{price}} each.', {
                  remaining: proficiencyEntitlement.remainingIncluded,
                  included: proficiencyEntitlement.included,
                  price: formatPrice(proficiencyEntitlement.paidPriceCents),
                })}
              </p>
            )}
            {paymentRequired && selectedMode === 'proficiency' && (
              <button type="button" className="level-test-secondary full" onClick={startPaidProficiencyCheckout} disabled={saving}>
                <FiCreditCard /> {t('levelTests.payProficiencyCheck', 'Pay {{price}} for this check', { price: formatPrice(paymentRequired.priceCents) })}
              </button>
            )}
            {restricted && (
              <p className="level-test-hint">
                {t('levelTests.restrictedTarget', 'This target language is not available in this institution context.')}
              </p>
            )}
          </div>

          <div className="level-test-card">
            <p className="level-test-kicker">{t('levelTests.recent', 'Recent')}</p>
            {(overview?.attempts || []).slice(0, 4).map((item) => (
              <div key={item._id} className="level-test-recent">
                <span>{t('levelTests.levelLabel', 'Level {{level}}', { level: item.level })} · {t(`levelTests.modes.${item.mode}.title`, item.mode)}</span>
                <strong>{item.score == null ? t('levelTests.notSubmitted', 'Not submitted') : `${item.score}%`}</strong>
              </div>
            ))}
            {!(overview?.attempts || []).length && <p className="level-test-hint">{t('levelTests.noRecent', 'No level checks yet.')}</p>}
          </div>
        </aside>

        <section className="level-test-workspace">
          {!attempt && (
            <div className="level-test-empty">
              <FiClipboard />
              <h2>{t('levelTests.emptyTitle', 'Choose a level check')}</h2>
              <p>{t('levelTests.emptyBody', 'You will see a balanced set of vocabulary, grammar, reading, speaking, and writing tasks from the level you choose.')}</p>
            </div>
          )}

          {attempt && (
            <>
              <div className="level-test-workspace-head">
                <div>
                  <p className="level-test-kicker">
                    {t('levelTests.levelLabel', 'Level {{level}}', { level: attempt.level })} · {t(`levelTests.modes.${attempt.mode}.title`, attempt.mode)}
                  </p>
                  <h2>{scoreState ? t('levelTests.resultTitle', 'Your result') : t('levelTests.questionsTitle', 'Answer each task')}</h2>
                </div>
                <button type="button" className="level-test-secondary" onClick={start} disabled={saving}>
                  <FiRefreshCw /> {t('common.restart', 'Restart')}
                </button>
              </div>

              {scoreState && (
                <div className={`level-test-result ${attempt.passed ? 'passed' : 'review'}`}>
                  <strong>{attempt.score}%</strong>
                  <span>{attempt.passed ? t('levelTests.passed', 'Passed') : t('levelTests.reviewRecommended', 'Review recommended')}</span>
                  <p>{attempt.passed ? t('levelTests.passedBody', 'You can issue a certificate for this result.') : t('levelTests.reviewBody', 'Review the weak skills, then try again when ready.')}</p>
                  {attempt.weakSkills?.length > 0 && (
                    <div className="level-test-weak">
                      {attempt.weakSkills.map((skill) => <span key={skill}>{skillLabel(t, skill)}</span>)}
                    </div>
                  )}
                  {attempt.passed && (
                    <button type="button" className="level-test-primary" onClick={() => issueCertificate()} disabled={saving || certificate}>
                      <FiAward /> {certificate ? t('levelTests.certificateIssued', 'Certificate issued') : t('levelTests.issueCertificate', 'Issue certificate')}
                    </button>
                  )}
                </div>
              )}

              <div className="level-test-questions">
                {(attempt.questions || []).map((question, index) => {
                  const answer = answers[question.questionId] || {};
                  return (
                    <article className="level-test-question" key={question.questionId}>
                      <div className="level-test-question-head">
                        <span>{index + 1}</span>
                        <div>
                          <strong>{skillLabel(t, question.skill)}</strong>
                          <p>{taskInstruction(t, question.taskType)}</p>
                        </div>
                      </div>

                      {question.taskType === 'choose_target' && <div className="level-test-stem">{question.nativeText || question.targetText}</div>}
                      {question.taskType !== 'choose_target' && <div className="level-test-stem target">{question.targetText}</div>}

                      {question.options?.length > 0 ? (
                        <div className="level-test-options">
                          {question.options.map((option) => (
                            <button
                              type="button"
                              key={option.optionId}
                              className={answer.selectedOptionId === option.optionId ? 'selected' : ''}
                              onClick={() => updateAnswer(question.questionId, { selectedOptionId: option.optionId })}
                              disabled={scoreState}
                            >
                              {option.text}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="level-test-written">
                          <textarea
                            value={answer.text || ''}
                            onChange={(event) => updateAnswer(question.questionId, { text: event.target.value })}
                            placeholder={t('levelTests.writeAnswer', 'Write your answer here...')}
                            disabled={scoreState}
                          />
                          {question.taskType === 'short_response' && (
                            <div className="level-test-self-score">
                              {[0.3, 0.7, 1].map((value) => (
                                <button
                                  type="button"
                                  key={value}
                                  className={answer.selfScore === value ? 'selected' : ''}
                                  onClick={() => updateAnswer(question.questionId, { selfScore: value })}
                                  disabled={scoreState}
                                >
                                  {value === 1
                                    ? t('levelTests.selfGood', 'Good')
                                    : value === 0.7
                                      ? t('levelTests.selfAlmost', 'Almost')
                                      : t('levelTests.selfNeedsWork', 'Needs work')}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {scoreState && (
                        <div className={`level-test-correctness ${attempt.answers?.find((item) => item.questionId === question.questionId)?.correct ? 'correct' : 'missed'}`}>
                          {attempt.answers?.find((item) => item.questionId === question.questionId)?.correct
                            ? t('levelTests.correct', 'Correct')
                            : t('levelTests.missed', 'Review this')}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              {!scoreState && (
                <button type="button" className="level-test-primary submit" onClick={submit} disabled={saving}>
                  <FiCheckCircle /> {saving ? t('common.saving', 'Saving...') : t('levelTests.submit', 'Submit check')}
                </button>
              )}
            </>
          )}
        </section>
      </section>
    </main>
  );
}

export default LevelTestPage;
