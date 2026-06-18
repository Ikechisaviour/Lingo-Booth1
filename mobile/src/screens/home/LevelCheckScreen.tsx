import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { learningHubService, quizService } from '../../services/api';
import { useAppColors, type AppColors } from '../../config/theme';

const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;
const QUESTIONS_PER_DIFFICULTY = 2;

const shuffled = <T,>(values: T[]): T[] => [...values].sort(() => Math.random() - 0.5);

function levelFromAnswers(answers: Array<{ difficulty: string; correct: boolean }>) {
  const counts = DIFFICULTIES.reduce<Record<string, number>>((acc, difficulty) => {
    acc[difficulty] = answers.filter((answer) => answer.difficulty === difficulty && answer.correct).length;
    return acc;
  }, {});
  const totalCorrect = answers.filter((answer) => answer.correct).length;
  if (counts.advanced >= 2 && totalCorrect >= 5) return 'advanced';
  if (counts.intermediate >= 2 && totalCorrect >= 4) return 'intermediate';
  if (counts.beginner >= 1 && totalCorrect >= 2) return 'beginner';
  return 'new';
}

const LevelCheckScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [answers, setAnswers] = useState<Array<{ difficulty: string; correct: boolean }>>([]);
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
            .filter((item: any) => item?.targetText && item?.nativeText && !item?._translationPending)
            .slice(0, QUESTIONS_PER_DIFFICULTY)
            .map((item: any) => ({
              targetText: item.targetText,
              nativeText: item.nativeText,
              difficulty,
            }));
        });
        if (nextQuestions.length >= 3) {
          await learningHubService.startPlacementCheck();
        }
        if (!cancelled) {
          setProfile(profileRes.data || null);
          setQuestions(nextQuestions);
          if (nextQuestions.length < 3) {
            setError(t('learningHub.levelCheckUnavailable', 'A level check is not ready for this language pair yet.'));
          }
        }
      } catch (err: any) {
        if (!cancelled) {
          const code = err.response?.data?.code;
          setError(code === 'PLACEMENT_TEST_LIMIT_REACHED'
            ? t('learningHub.placementLimitReached', 'You have used your included placement checks for this plan.')
            : t('learningHub.levelCheckLoadFailed', 'The level check could not load right now.'));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [t]);

  const optionPool = useMemo(() => questions.map((question) => question.nativeText), [questions]);
  const currentQuestion = questions[currentIndex];
  const currentOptions = useMemo(() => {
    if (!currentQuestion) return [];
    const wrong = shuffled(optionPool.filter((value) => value && value !== currentQuestion.nativeText)).slice(0, 3);
    return shuffled([currentQuestion.nativeText, ...wrong]);
  }, [currentQuestion, optionPool]);
  const complete = questions.length > 0 && answers.length === questions.length;
  const resultLevel = complete ? levelFromAnswers(answers) : '';

  const chooseAnswer = async (option: string) => {
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
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Button mode="text" onPress={() => navigation.goBack()} style={styles.backButton}>
        {t('common.back', 'Back')}
      </Button>
      <Text style={styles.kicker}>{t('learningHub.placementTitle', 'Placement')}</Text>
      <Text variant="headlineSmall" style={styles.title}>{t('learningHub.levelCheckTitle', 'Short level check')}</Text>
      <Text style={styles.subtitle}>{t('learningHub.levelCheckSubtitle', 'Answer a few quick items so the app can choose a better starting point.')}</Text>

      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          {error ? (
            <>
              <Text>{error}</Text>
              <Button mode="outlined" onPress={() => navigation.goBack()}>{t('common.goBack', 'Go Back')}</Button>
            </>
          ) : complete ? (
            <>
              <Text style={styles.meta}>{t('learningHub.levelCheckResult', 'Suggested starting level')}</Text>
              <Text style={styles.result}>{String(t(`learningHub.levels.${resultLevel}`, resultLevel))}</Text>
              <Text>{t('learningHub.levelCheckSaved', 'This starting point has been saved for this language pair.')}</Text>
              <Button mode="contained" onPress={() => navigation.goBack()} disabled={saving}>
                {saving ? t('common.saving', 'Saving...') : t('learningHub.returnHome', 'Return home')}
              </Button>
            </>
          ) : (
            <>
              <View style={styles.progressRow}>
                <Text style={styles.meta}>
                  {t('learningHub.questionCount', { current: currentIndex + 1, total: questions.length, defaultValue: 'Question {{current}} of {{total}}' })}
                </Text>
                <Text style={styles.meta}>{String(t(`learningHub.levels.${currentQuestion?.difficulty}`, currentQuestion?.difficulty || ''))}</Text>
              </View>
              <Text variant="titleLarge" style={styles.prompt}>{currentQuestion?.targetText}</Text>
              {currentOptions.map((option) => (
                <Button key={option} mode="outlined" onPress={() => chooseAnswer(option)} style={styles.optionButton}>
                  {option}
                </Button>
              ))}
            </>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  screen: { flex: 1, backgroundColor: colors.background },
  container: { padding: 16, gap: 10 },
  backButton: { alignSelf: 'flex-start' },
  kicker: { color: colors.primary, fontWeight: '900', textTransform: 'uppercase', fontSize: 12 },
  title: { color: colors.textPrimary, fontWeight: '900' },
  subtitle: { color: colors.textSecondary, marginBottom: 8 },
  card: { backgroundColor: colors.surface, borderRadius: 16 },
  cardContent: { gap: 14 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  meta: { color: colors.textMuted, fontWeight: '700' },
  prompt: { color: colors.textPrimary, fontWeight: '900' },
  optionButton: { borderRadius: 10 },
  result: { color: colors.primary, fontSize: 28, fontWeight: '900' },
});

export default LevelCheckScreen;
