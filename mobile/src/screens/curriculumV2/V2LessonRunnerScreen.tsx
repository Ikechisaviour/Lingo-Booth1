import React, { useEffect, useMemo, useState } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { curriculumV2Service } from '../../services/api';
import { useAppColors, type AppColors } from '../../config/theme';

// Lesson-runner placeholder. The seven native lesson type screens
// (ContrastNote, Pattern, Cloze, Story, VocabDeck, Pronunciation,
// MinimalPair) are being built phase-by-phase per the saved memory's
// roadmap (`memory/project_mobile_v2_native.md`). Until each one ships:
//
//   - This screen loads the lesson document via `getLesson(id)` and
//     shows the title + concept summary so the learner knows what they
//     opened.
//   - "Mark complete" calls `markComplete(id)` and pops back so the
//     planner can advance.
//   - "Continue on web" deep-links to the corresponding web lesson runner
//     for learners who want the full experience today.
//
// Replace this whole screen's render once `LESSON_COMPONENT_MAP` is
// populated with the native lesson-type screens.

type V2Lesson = {
  id: string;
  conceptId: string;
  lessonType: string;
  title?: string;
  patternGloss?: string;
  estimatedMinutes?: number;
  targetLang?: string;
};

const WEB_BASE_URL = 'https://lingobooth.com';

const V2LessonRunnerScreen: React.FC<any> = ({ route, navigation }) => {
  const { t } = useTranslation();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const lessonId: string = route.params?.lessonId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lesson, setLesson] = useState<V2Lesson | null>(null);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    curriculumV2Service.getLesson(lessonId)
      .then((res) => { if (!cancelled) setLesson(res.data); })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.response?.data?.message || err?.message || t('curriculumV2.lessonLoadFailed', "Couldn't load this lesson."));
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [lessonId, t]);

  const markComplete = async () => {
    if (completing) return;
    setCompleting(true);
    try {
      await curriculumV2Service.markComplete(lessonId);
      navigation.goBack();
    } catch (_) {
      // Allow retry — learner sees the button reset.
    } finally {
      setCompleting(false);
    }
  };

  const openOnWeb = () => {
    const url = `${WEB_BASE_URL}/learn/v2?lesson=${encodeURIComponent(lessonId)}`;
    Linking.openURL(url).catch(() => {});
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.panel}>
        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}

        {!!error && !loading && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && !error && lesson && (
          <>
            <Text style={styles.kicker}>
              {t(`curriculumV2.lessonTypes.${lesson.lessonType}`, lesson.lessonType)}
            </Text>
            <Text variant="headlineSmall" style={styles.title}>
              {lesson.title || lesson.patternGloss || t('curriculumV2.untitledLesson', 'Lesson')}
            </Text>

            <View style={styles.comingSoonBox}>
              <MaterialCommunityIcons name="cellphone-arrow-down" size={32} color={colors.primary} />
              <Text style={styles.comingSoonTitle}>
                {t('curriculumV2.mobileLessonComingSoonTitle', 'Native mobile lesson coming soon')}
              </Text>
              <Text style={styles.comingSoonBody}>
                {t(
                  'curriculumV2.mobileLessonComingSoonBody',
                  "We're rolling out the new lesson type screens on mobile one by one. For the full experience right now, open this lesson on the web app.",
                )}
              </Text>

              <Button
                mode="contained"
                onPress={openOnWeb}
                icon="open-in-new"
                style={styles.primaryBtn}
              >
                {t('curriculumV2.openOnWeb', 'Continue on web')}
              </Button>

              <Button
                mode="outlined"
                onPress={markComplete}
                disabled={completing}
                icon="check"
                style={styles.secondaryBtn}
              >
                {completing
                  ? t('curriculumV2.markingComplete', 'Saving…')
                  : t('curriculumV2.markComplete', 'Mark as completed')}
              </Button>

              <Button mode="text" onPress={() => navigation.goBack()}>
                {t('curriculumV2.back', 'Back')}
              </Button>
            </View>
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
  loadingBox: { alignItems: 'center', paddingVertical: 22 },
  errorBox: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  errorText: { color: '#7f1d1d' },
  comingSoonBox: {
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  comingSoonTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  comingSoonBody: {
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  primaryBtn: { marginTop: 6, alignSelf: 'stretch' },
  secondaryBtn: { alignSelf: 'stretch' },
});

export default V2LessonRunnerScreen;
