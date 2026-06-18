import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { curriculumV2Service } from '../../services/api';
import { useSettingsStore } from '../../stores/settingsStore';
import { useAppColors, type AppColors } from '../../config/theme';

// Curriculum v2 home — the planner-driven session entry on mobile.
// Fetches `/curriculum/v2/plan` for the active target, displays the
// upcoming lesson sequence, and routes the learner into the lesson
// runner. Concept-first, mirrors the web `SessionShellPage` entry.
//
// The lesson runner is still being built per the saved memory's phase 5
// roadmap (one lesson type at a time). Until each lesson type ships
// natively, the runner shows a "Coming soon to mobile" stub with an
// option to mark the lesson complete and continue.

type V2PlanLesson = {
  id: string;
  conceptId: string;
  conceptKind?: string;
  lessonType: string;
  title?: string;
  estimatedMinutes?: number;
};

type V2Plan = {
  sequence: V2PlanLesson[];
  totalMinutes?: number;
  reviewsSelected?: number;
  boostsApplied?: string[];
  learnerLevel?: string;
};

const LESSON_TYPE_ICONS: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  ContrastNote: 'compare-horizontal',
  PatternLesson: 'shape-outline',
  ClozeLesson: 'pencil-box-outline',
  StoryLesson: 'book-open-page-variant',
  VocabDeck: 'card-multiple-outline',
  PronunciationTask: 'microphone-outline',
  MinimalPairTask: 'ear-hearing',
};

const V2HomeScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const targetLanguage = useSettingsStore((s) => s.targetLanguage);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState<V2Plan | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    // Script-onboarding gate matches the web flow: if the learner hasn't
    // finished the writing-system primer for a script-based target, send
    // them there first. Failures are silent — a missing endpoint just
    // means no gate.
    curriculumV2Service.getAlphabetProgress()
      .then(({ data }) => {
        if (cancelled) return undefined;
        if (data && !data.onboardingCompletedAt) {
          navigation.replace('V2ScriptOnboarding');
          return undefined;
        }
        return curriculumV2Service.getPlan({ targetMinutes: 30 });
      })
      .then((res) => {
        if (cancelled || !res) return;
        setPlan(res.data || { sequence: [] });
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.response?.data?.message || err?.message || t('curriculumV2.loadFailed', "Couldn't load your session"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey, targetLanguage, navigation, t]);

  const handleRetry = useCallback(() => setReloadKey((n) => n + 1), []);
  const handleOpenLesson = (lesson: V2PlanLesson, index: number) => {
    navigation.navigate('V2LessonRunner', {
      lessonId: lesson.id,
      lessonType: lesson.lessonType,
      planIndex: index,
    });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.panel}>
        <Text style={styles.kicker}>{t('curriculumV2.kicker', 'New curriculum')}</Text>
        <Text variant="headlineSmall" style={styles.title}>
          {t('curriculumV2.homeTitle', 'Your session')}
        </Text>
        <Text style={styles.subtitle}>
          {t(
            'curriculumV2.homeSubtitle',
            'A planner-built sequence of concept-first lessons. Pattern drills, stories, cloze, vocab, and pronunciation interleaved.',
          )}
        </Text>

        <View style={styles.toolbar}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('V2Catalog')}
            icon="book-open-variant"
          >
            {t('curriculumV2.browseAll', 'Browse all lessons')}
          </Button>
        </View>

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.subtitle}>
              {t('curriculumV2.loadingSession', 'Building your session...')}
            </Text>
          </View>
        )}

        {!!error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
            <Button mode="outlined" onPress={handleRetry} style={styles.errorRetry}>
              {t('curriculumV2.retry', 'Try again')}
            </Button>
          </View>
        )}

        {!loading && !error && plan && plan.sequence.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>
              {t('curriculumV2.noLessonsTitle', 'No lessons available.')}
            </Text>
            <Text style={styles.subtitle}>
              {t(
                'curriculumV2.noLessonsBody',
                "Curriculum v2 content hasn't been seeded for your target language yet.",
              )}
            </Text>
          </View>
        )}

        {!loading && !error && plan && plan.sequence.length > 0 && (
          <>
            <View style={styles.planMeta}>
              <Text style={styles.planMetaText}>
                {t('curriculumV2.sessionMeta', '{{count}} lessons · ~{{minutes}} min', {
                  count: plan.sequence.length,
                  minutes: plan.totalMinutes || plan.sequence.length * 5,
                })}
              </Text>
            </View>

            {plan.sequence.map((lesson, idx) => {
              const iconName = LESSON_TYPE_ICONS[lesson.lessonType] || 'book-outline';
              return (
                <TouchableOpacity
                  key={lesson.id}
                  style={styles.lessonCard}
                  activeOpacity={0.75}
                  onPress={() => handleOpenLesson(lesson, idx)}
                >
                  <View style={styles.lessonIconBox}>
                    <MaterialCommunityIcons name={iconName} size={26} color={colors.primary} />
                  </View>
                  <View style={styles.lessonText}>
                    <Text style={styles.lessonStep}>
                      {t('curriculumV2.stepN', 'Step {{n}}', { n: idx + 1 })}
                    </Text>
                    <Text style={styles.lessonTitle} numberOfLines={2}>
                      {lesson.title || t(`curriculumV2.lessonTypes.${lesson.lessonType}`, lesson.lessonType)}
                    </Text>
                    <Text style={styles.lessonMeta}>
                      {t('curriculumV2.lessonMeta', '{{type}} · ~{{minutes}} min', {
                        type: t(`curriculumV2.lessonTypes.${lesson.lessonType}`, lesson.lessonType),
                        minutes: lesson.estimatedMinutes || 5,
                      })}
                    </Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textMuted} />
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18, paddingBottom: 96, flexGrow: 1 },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    padding: 22,
    gap: 12,
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: { color: colors.textPrimary, fontWeight: '700' },
  subtitle: { color: colors.textMuted, lineHeight: 20 },
  toolbar: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 6 },
  loadingBox: { alignItems: 'center', gap: 12, paddingVertical: 22 },
  errorBox: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    gap: 10,
  },
  errorText: { color: '#7f1d1d' },
  errorRetry: { alignSelf: 'flex-start' },
  emptyBox: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 6,
  },
  emptyTitle: { color: colors.textPrimary, fontWeight: '700', fontSize: 16 },
  planMeta: { paddingVertical: 6 },
  planMetaText: { color: colors.textMuted, fontSize: 13 },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
  },
  lessonIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonText: { flex: 1, gap: 2 },
  lessonStep: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  lessonTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '600' },
  lessonMeta: { color: colors.textMuted, fontSize: 12 },
});

export default V2HomeScreen;
