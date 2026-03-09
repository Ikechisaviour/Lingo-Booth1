import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Text, Button, IconButton, ProgressBar, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { lessonService, progressService, userService } from '../../services/api';
import speechService from '../../services/speechService';
import guestActivityTracker from '../../services/guestActivityTracker';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { getLangName } from '../../config/languages';
import { colors } from '../../config/theme';

type RouteParams = { LessonDetail: { lessonId: string } };

const xpPointsMap: Record<string, number> = { beginner: 2, intermediate: 3, advanced: 4, sentences: 5 };

const LessonDetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute<RouteProp<RouteParams, 'LessonDetail'>>();
  const navigation = useNavigation<any>();
  const { userId, isGuest, addGuestXP } = useAuthStore();
  const { targetLanguage, nativeLanguage } = useSettingsStore();
  const lessonId = route.params.lessonId;

  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizAttempted, setQuizAttempted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [studyMode, setStudyMode] = useState<'default' | 'reading' | 'listening'>('default');
  const [showRomanization, setShowRomanization] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [orderMode, setOrderMode] = useState<'sequential' | 'random'>('sequential');

  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [visitedItems, setVisitedItems] = useState<Set<number>>(new Set([0]));

  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchLesson = useCallback(async () => {
    try {
      setLoading(true);
      const res = await lessonService.getLesson(lessonId);
      setLesson(res.data);
      guestActivityTracker.trackLesson();
      setError('');
    } catch {
      setError(t('lessonDetail.failedToLoad'));
    } finally {
      setLoading(false);
    }
  }, [lessonId, t]);

  useEffect(() => {
    setCurrentIndex(0);
    setQuizCorrect(0);
    setQuizTotal(0);
    setVisitedItems(new Set([0]));
    fetchLesson();
  }, [fetchLesson]);

  // Order map
  const orderMap = useMemo(() => {
    if (!lesson) return [];
    const seq = Array.from({ length: lesson.content.length }, (_, i) => i);
    if (orderMode === 'random') {
      for (let i = seq.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [seq[i], seq[j]] = [seq[j], seq[i]];
      }
    }
    return seq;
  }, [lesson, orderMode]);

  const [stepPosition, setStepPosition] = useState(0);

  useEffect(() => {
    if (orderMap.length > 0 && stepPosition < orderMap.length) {
      setCurrentIndex(orderMap[stepPosition]);
    }
  }, [orderMap, stepPosition]);

  // Auto-speak on content change
  useEffect(() => {
    if (!lesson?.content?.[currentIndex]?.korean) return;
    if (studyMode === 'reading') return;
    const text = lesson.content[currentIndex].korean;
    speechService.speakRepeat(text, 2, { lang: 'ko-KR' });
    return () => { speechService.cancel(); };
  }, [lesson, currentIndex, studyMode]);

  // Save progress on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, []);

  const content = lesson?.content?.[currentIndex];
  const totalItems = lesson?.content?.length || 0;

  const handleNext = () => {
    if (stepPosition < orderMap.length - 1) {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
      const nextStep = stepPosition + 1;
      setStepPosition(nextStep);
      setVisitedItems((prev) => new Set(prev).add(orderMap[nextStep]));
      setShowTranslation(false);
      setShowRomanization(false);
      resetQuiz();
    }
  };

  const handlePrev = () => {
    if (stepPosition > 0) {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
      setStepPosition(stepPosition - 1);
      setShowTranslation(false);
      setShowRomanization(false);
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setSelectedAnswer(null);
    setQuizAttempted(false);
    setIsCorrect(false);
  };

  const handleSpeak = (text: string) => {
    if (speechService.isSpeaking()) {
      speechService.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speechService.speak(text, { lang: 'ko-KR' });
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  };

  const generateQuizOptions = useCallback((correctAnswer: string, allContent: any[]) => {
    const otherAnswers = allContent
      .filter((item) => item.english !== correctAnswer && item.english)
      .map((item) => item.english);
    const fallback = [
      'Thank you', 'Good morning', 'How are you?', 'See you later',
      'Nice to meet you', 'Excuse me', "I'm sorry", "You're welcome",
    ];
    const wrong = otherAnswers.length >= 4
      ? [...otherAnswers].sort(() => Math.random() - 0.5).slice(0, 4)
      : [...otherAnswers, ...fallback.filter((a) => a !== correctAnswer && !otherAnswers.includes(a))].slice(0, 4);
    return [correctAnswer, ...wrong].sort(() => Math.random() - 0.5);
  }, []);

  const quizOptions = useMemo(() => {
    if (!content?.english || !lesson?.content) return [];
    return generateQuizOptions(content.english, lesson.content);
  }, [content, lesson, generateQuizOptions]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setQuizAttempted(true);
    const correct = answer === content.english;
    setIsCorrect(correct);

    setQuizTotal((prev) => prev + 1);
    if (correct) {
      setQuizCorrect((prev) => prev + 1);
      if (userId && lesson?.difficulty) {
        const points = xpPointsMap[lesson.difficulty] || 2;
        userService.awardXP(userId, { lessonId, contentIndex: currentIndex, basePoints: points }).catch(() => {});
      } else if (isGuest) {
        addGuestXP(1);
      }
      // Auto-advance on correct
      if (stepPosition < orderMap.length - 1) {
        autoAdvanceRef.current = setTimeout(handleNext, 2000);
      }
    }
  };

  const calculateScore = (completed = false) => {
    const completionPct = completed ? 100 : (visitedItems.size / (totalItems || 1)) * 100;
    if (quizTotal === 0) return Math.round(completionPct);
    const quizPct = (quizCorrect / quizTotal) * 100;
    return Math.round(completionPct * 0.4 + quizPct * 0.6);
  };

  const handleComplete = async () => {
    if (userId && lesson) {
      const score = calculateScore(true);
      const skillType = studyMode === 'listening' ? 'listening' : 'reading';
      try {
        await progressService.recordProgress({
          userId,
          lessonId,
          skillType,
          category: lesson.category,
          score,
          isCorrect: score >= 70,
        });
      } catch {}
    }
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !lesson) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Lesson not found'}</Text>
        <Button mode="contained" onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
          {t('common.goBack', 'Go Back')}
        </Button>
      </View>
    );
  }

  const isLastItem = stepPosition >= orderMap.length - 1;

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} iconColor={colors.textPrimary} />
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>{lesson.title}</Text>
          <Text style={styles.headerCounter}>
            {stepPosition + 1} / {totalItems}
          </Text>
        </View>
        <IconButton icon="cog" onPress={() => setShowSettings(true)} iconColor={colors.textMuted} />
      </View>

      <ProgressBar progress={(stepPosition + 1) / totalItems} color={colors.primary} style={styles.progressBar} />

      <ScrollView contentContainerStyle={styles.contentArea}>
        {content && (
          <>
            {/* Korean text card */}
            {studyMode !== 'listening' && (
              <View style={styles.contentCard}>
                <Text style={styles.contentKorean}>{content.korean}</Text>
                {showRomanization && content.romanization && (
                  <Text style={styles.romanization}>{content.romanization}</Text>
                )}
              </View>
            )}

            {/* Audio button */}
            {studyMode !== 'reading' && (
              <View style={styles.audioRow}>
                <IconButton
                  icon={isSpeaking ? 'volume-high' : 'volume-medium'}
                  size={40}
                  iconColor={isSpeaking ? colors.primary : colors.textSecondary}
                  onPress={() => handleSpeak(content.korean)}
                  style={styles.audioBtn}
                />
                <Text style={styles.audioLabel}>{t('lessonDetail.listen', 'Listen')}</Text>
              </View>
            )}

            {/* Translation reveal */}
            {!showQuiz && (
              <TouchableOpacity
                style={styles.translationBtn}
                onPress={() => setShowTranslation(!showTranslation)}
                activeOpacity={0.7}
              >
                {showTranslation ? (
                  <Text style={styles.translationText}>{content.english}</Text>
                ) : (
                  <Text style={styles.translationHint}>
                    {t('lessonDetail.tapToReveal', 'Tap to reveal translation')}
                  </Text>
                )}
              </TouchableOpacity>
            )}

            {/* Quiz section */}
            {!showQuiz ? (
              <Button mode="outlined" onPress={() => setShowQuiz(true)} style={styles.quizStartBtn} icon="help-circle">
                {t('lessonDetail.testYourself', 'Test Yourself')}
              </Button>
            ) : (
              <View style={styles.quizSection}>
                <Text style={styles.quizQuestion}>
                  {t('lessonDetail.whatDoesThisMean', 'What does this mean?')}
                </Text>
                {quizOptions.map((option, idx) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.quizOption,
                        quizAttempted && option === content.english && { borderColor: colors.accentGreen, backgroundColor: '#d1fae5' },
                        quizAttempted && option === selectedAnswer && option !== content.english && { borderColor: colors.error, backgroundColor: '#fef2f2' },
                      ]}
                      onPress={() => !quizAttempted && handleAnswerSelect(option)}
                      disabled={quizAttempted}
                    >
                      <Text style={styles.quizOptionText}>{option}</Text>
                    </TouchableOpacity>
                  );
                })}
                {quizAttempted && (
                  <View style={styles.quizResult}>
                    <Text style={[styles.quizResultText, { color: isCorrect ? colors.accentGreen : colors.error }]}>
                      {isCorrect ? `✓ ${t('lessonDetail.correct', 'Correct!')}` : `✗ ${t('lessonDetail.incorrect', 'Incorrect')}`}
                    </Text>
                    {!isCorrect && (
                      <Button mode="text" onPress={() => { setSelectedAnswer(null); setQuizAttempted(false); }}>
                        {t('lessonDetail.tryAgain', 'Try Again')}
                      </Button>
                    )}
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <Button mode="outlined" onPress={handlePrev} disabled={stepPosition <= 0} icon="chevron-left" style={styles.navBtn}>
          {t('lessonDetail.prev', 'Prev')}
        </Button>
        {isLastItem ? (
          <Button mode="contained" onPress={handleComplete} icon="check" style={[styles.navBtn, { backgroundColor: colors.accentGreen }]}>
            {t('lessonDetail.complete', 'Complete')}
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={handleNext}
            icon="chevron-right"
            contentStyle={{ flexDirection: 'row-reverse' }}
            style={[styles.navBtn, { backgroundColor: colors.primary }]}
          >
            {t('lessonDetail.next', 'Next')}
          </Button>
        )}
      </View>

      {/* Settings modal */}
      <Modal visible={showSettings} transparent animationType="slide" onRequestClose={() => setShowSettings(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text variant="titleMedium" style={styles.modalTitle}>
              {t('lessonDetail.settings', 'Study Settings')}
            </Text>

            <Text style={styles.settingLabel}>{t('lessonDetail.studyMode', 'Study Mode')}</Text>
            <View style={styles.chipRow}>
              <Chip selected={studyMode === 'default'} onPress={() => setStudyMode('default')} style={styles.chip}>
                {t('lessonDetail.defaultMode', 'Default')}
              </Chip>
              <Chip selected={studyMode === 'reading'} onPress={() => setStudyMode('reading')} style={styles.chip}>
                {t('lessonDetail.readingMode', 'Reading')}
              </Chip>
              <Chip selected={studyMode === 'listening'} onPress={() => setStudyMode('listening')} style={styles.chip}>
                {t('lessonDetail.listeningMode', 'Listening')}
              </Chip>
            </View>

            <Text style={styles.settingLabel}>{t('lessonDetail.order', 'Order')}</Text>
            <View style={styles.chipRow}>
              <Chip selected={orderMode === 'sequential'} onPress={() => { setOrderMode('sequential'); setStepPosition(0); }} style={styles.chip}>
                {t('lessonDetail.sequential', 'Sequential')}
              </Chip>
              <Chip selected={orderMode === 'random'} onPress={() => { setOrderMode('random'); setStepPosition(0); }} style={styles.chip}>
                {t('lessonDetail.random', 'Random')}
              </Chip>
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.settingLabel}>{t('lessonDetail.romanization', 'Show Romanization')}</Text>
              <Chip selected={showRomanization} onPress={() => setShowRomanization(!showRomanization)}>
                {showRomanization ? t('common.on', 'On') : t('common.off', 'Off')}
              </Chip>
            </View>

            <Button mode="contained" onPress={() => setShowSettings(false)} style={{ marginTop: 20 }}>
              {t('common.done', 'Done')}
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText: { color: colors.error, fontSize: 16, textAlign: 'center' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: colors.surface,
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  headerCounter: { fontSize: 13, color: colors.textSecondary },
  progressBar: { height: 4, backgroundColor: colors.border },

  contentArea: { padding: 20, paddingBottom: 100 },

  contentCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 20,
  },
  contentKorean: { fontSize: 32, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
  romanization: { fontSize: 16, color: colors.textSecondary, marginTop: 8 },

  audioRow: { alignItems: 'center', marginBottom: 20 },
  audioBtn: { backgroundColor: colors.surface, elevation: 2 },
  audioLabel: { fontSize: 13, color: colors.textMuted, marginTop: 4 },

  translationBtn: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  translationText: { fontSize: 18, fontWeight: '600', color: colors.textPrimary },
  translationHint: { fontSize: 15, color: colors.textMuted },

  quizStartBtn: { borderRadius: 8, marginBottom: 16 },
  quizSection: { marginTop: 8 },
  quizQuestion: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 },
  quizOption: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: colors.border,
  },
  quizOptionText: { fontSize: 15, color: colors.textPrimary },
  quizResult: { alignItems: 'center', marginTop: 8 },
  quizResultText: { fontSize: 18, fontWeight: '700' },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 28,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  navBtn: { flex: 1, borderRadius: 8 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: colors.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24 },
  modalTitle: { fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  settingLabel: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginTop: 16, marginBottom: 8 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { marginBottom: 4 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
});

export default LessonDetailScreen;
