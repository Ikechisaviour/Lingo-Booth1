import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { learningHubService, quizService } from '../services/api';
import './PlacementCheckPage.css';

const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];
const QUESTIONS_PER_DIFFICULTY = 2;

const shuffled = (values) => [...values].sort(() => Math.random() - 0.5);

const optionSetFor = (question, pool) => {
  const wrong = shuffled(pool.filter((value) => value && value !== question.nativeText)).slice(0, 3);
  return shuffled([question.nativeText, ...wrong]);
};

function levelFromAnswers(answers = []) {
  const stats = DIFFICULTIES.reduce((acc, difficulty) => {
    acc[difficulty] = answers.filter((answer) => answer.difficulty === difficulty && answer.correct).length;
    return acc;
  }, {});
  const totalCorrect = answers.filter((answer) => answer.correct).length;
  if (stats.advanced >= 2 && totalCorrect >= 5) return 'advanced';
  if (stats.intermediate >= 2 && totalCorrect >= 4) return 'intermediate';
  if (stats.beginner >= 1 && totalCorrect >= 2) return 'beginner';
  return 'new';
}

function PlacementCheckPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [profile, setProfile] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const [profileRes, ...difficultyResponses] = await Promise.all([
          learningHubService.getPairProfile(),
          ...DIFFICULTIES.map((difficulty) => quizService.getQuizzes('', difficulty)),
        ]);
        const pickedLessons = difficultyResponses
          .map((response, index) => ({ difficulty: DIFFICULTIES[index], lesson: response.data?.[0] }))
          .filter((entry) => entry.lesson?._id);
        const details = await Promise.all(pickedLessons.map((entry) => quizService.getQuiz(entry.lesson._id)));
        const nextQuestions = details.flatMap((response, index) => {
          const difficulty = pickedLessons[index].difficulty;
          return (response.data?.content || [])
            .filter((item) => item?.targetText && item?.nativeText && !item?._translationPending)
            .slice(0, QUESTIONS_PER_DIFFICULTY)
            .map((item) => ({
              targetText: item.targetText,
              nativeText: item.nativeText,
              difficulty,
            }));
        });
        if (!cancelled) {
          setProfile(profileRes.data || null);
          setQuestions(nextQuestions);
          if (nextQuestions.length < 3) {
            setError(t('learningHub.levelCheckUnavailable', 'A level check is not ready for this language pair yet.'));
          }
        }
      } catch {
        if (!cancelled) setError(t('learningHub.levelCheckLoadFailed', 'The level check could not load right now.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [t]);

  const optionPool = useMemo(() => questions.map((question) => question.nativeText), [questions]);
  const currentQuestion = questions[currentIndex];
  const currentOptions = useMemo(
    () => currentQuestion ? optionSetFor(currentQuestion, optionPool) : [],
    [currentQuestion, optionPool],
  );
  const complete = questions.length > 0 && answers.length === questions.length;
  const resultLevel = complete ? levelFromAnswers(answers) : '';

  const chooseAnswer = async (option) => {
    if (!currentQuestion || answers[currentIndex]) return;
    const nextAnswers = [
      ...answers,
      {
        difficulty: currentQuestion.difficulty,
        correct: option === currentQuestion.nativeText,
      },
    ];
    setAnswers(nextAnswers);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((value) => value + 1);
      return;
    }
    const level = levelFromAnswers(nextAnswers);
    setSaving(true);
    try {
      await learningHubService.savePairProfile({
        currentLevel: level,
        primaryGoal: profile?.primaryGoal || '',
        pace: profile?.pace || 'steady',
        completedAt: profile?.completedAt || null,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="placement-check-page">{t('common.loading', 'Loading...')}</div>;
  }

  return (
    <div className="placement-check-page">
      <header className="placement-check-header">
        <button type="button" onClick={() => navigate('/')}>{t('common.back', 'Back')}</button>
        <div>
          <p>{t('learningHub.placementTitle', 'Placement')}</p>
          <h1>{t('learningHub.levelCheckTitle', 'Short level check')}</h1>
          <span>{t('learningHub.levelCheckSubtitle', 'Answer a few quick items so the app can choose a better starting point.')}</span>
        </div>
      </header>

      {error ? (
        <section className="placement-check-card">
          <p>{error}</p>
          <button type="button" onClick={() => navigate('/')}>{t('common.goBack', 'Go Back')}</button>
        </section>
      ) : complete ? (
        <section className="placement-check-card result">
          <span>{t('learningHub.levelCheckResult', 'Suggested starting level')}</span>
          <strong>{t(`learningHub.levels.${resultLevel}`, resultLevel)}</strong>
          <p>{t('learningHub.levelCheckSaved', 'This starting point has been saved for this language pair.')}</p>
          <button type="button" onClick={() => navigate('/')}>
            {saving ? t('common.saving', 'Saving...') : t('learningHub.returnHome', 'Return home')}
          </button>
        </section>
      ) : (
        <section className="placement-check-card">
          <div className="placement-progress">
            <span>{t('learningHub.questionCount', { current: currentIndex + 1, total: questions.length, defaultValue: 'Question {{current}} of {{total}}' })}</span>
            <strong>{t(`learningHub.levels.${currentQuestion?.difficulty}`, currentQuestion?.difficulty || '')}</strong>
          </div>
          <h2>{currentQuestion?.targetText}</h2>
          <div className="placement-options">
            {currentOptions.map((option) => (
              <button key={option} type="button" onClick={() => chooseAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default PlacementCheckPage;
