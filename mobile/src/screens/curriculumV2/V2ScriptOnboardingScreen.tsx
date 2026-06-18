import React, { useMemo, useState } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { curriculumV2Service } from '../../services/api';
import { useAppColors, type AppColors } from '../../config/theme';

// Script-onboarding placeholder for v2 on mobile. Same shape as
// `V2LessonRunnerScreen`: shows the learner what they hit, gives them
// two ways forward — open the full native experience on web, or skip
// the gate and proceed directly to the planner.
//
// The native script-card flow will replace this body in a later phase
// (per `memory/project_mobile_v2_native.md`, phase 6) — the letter cards
// with audio-order (item → description → example announcer → example →
// tip), bilingual announcers, and the shared `useLessonAudio` hook.

const WEB_BASE_URL = 'https://lingobooth.com';

const V2ScriptOnboardingScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [skipping, setSkipping] = useState(false);

  const skip = async () => {
    if (skipping) return;
    setSkipping(true);
    try {
      await curriculumV2Service.skipAlphabet();
      navigation.replace('V2Home');
    } catch (_) {
      // Allow retry.
    } finally {
      setSkipping(false);
    }
  };

  const openOnWeb = () => {
    Linking.openURL(`${WEB_BASE_URL}/learn/v2/hangul`).catch(() => {});
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.panel}>
        <Text style={styles.kicker}>
          {t('curriculumV2.scriptOnboardingKicker', 'Script onboarding')}
        </Text>
        <Text variant="headlineSmall" style={styles.title}>
          {t('curriculumV2.scriptOnboardingTitle', 'Learn the writing system first')}
        </Text>
        <Text style={styles.subtitle}>
          {t(
            'curriculumV2.scriptOnboardingBody',
            "Before A1 grammar, the new curriculum asks you to finish a short script primer. The native mobile version is still being built — for now you can open it on the web or skip ahead.",
          )}
        </Text>

        <View style={styles.box}>
          <MaterialCommunityIcons name="alpha-h-circle-outline" size={40} color={colors.primary} />
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
            onPress={skip}
            disabled={skipping}
            style={styles.secondaryBtn}
          >
            {skipping
              ? t('curriculumV2.skipping', 'Skipping…')
              : t('curriculumV2.skipScriptOnboarding', 'Skip and start grammar')}
          </Button>
        </View>
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
  box: {
    alignItems: 'center',
    gap: 14,
    paddingVertical: 18,
  },
  primaryBtn: { alignSelf: 'stretch' },
  secondaryBtn: { alignSelf: 'stretch' },
});

export default V2ScriptOnboardingScreen;
