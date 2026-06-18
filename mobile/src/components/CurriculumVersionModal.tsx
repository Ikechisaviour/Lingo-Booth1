import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../stores/authStore';
import { useSettingsStore } from '../stores/settingsStore';
import { userService } from '../services/api';
import { useAppColors, type AppColors } from '../config/theme';
import { getLanguageDisplayName } from '../config/languages';

const localizedLanguageName = (code: string | undefined, t: any, fallback: string) => {
  if (!code) return fallback;
  return getLanguageDisplayName(code, t) || fallback;
};

// Mobile equivalent of web's `CurriculumVersionGate`. Mounts once at the app
// root. When the active target has v2 available and the learner has not yet
// chosen a version (and didn't dismiss this session), the modal asks them to
// pick v1 or v2. Choice persists to the User document via
// `PUT /users/:id/curriculum-preference` AND mirrors into the local Zustand
// cache so synchronous routing surfaces (navigation guards, HomeScreen CTA)
// can read it without an API hop.
//
// Source of truth is the server. The local cache is a read-only mirror —
// always re-hydrated from `getProfile()` after login or language change.

type V2Profile = {
  isV2AvailableForCurrentTarget?: boolean;
  currentVersion?: 'v1' | 'v2' | null;
  currentTarget?: string;
  preferences?: Record<string, 'v1' | 'v2'>;
};

// Session-scoped dismissals — a learner who tapped "Decide later" should
// not be re-prompted within the same app session. Cleared on each new app
// launch (intentional — by default the chooser is sticky across sessions
// until the learner picks).
const dismissedThisSession = new Set<string>();

const CurriculumVersionModal: React.FC = () => {
  const { t } = useTranslation();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const userId = useAuthStore((s) => s.userId);
  const isAuthenticated = useAuthStore((s) => !!s.token);
  const isGuest = useAuthStore((s) => s.isGuest);
  const targetLanguage = useSettingsStore((s) => s.targetLanguage);
  const setCurriculumPreference = useSettingsStore((s) => s.setCurriculumPreference);
  const hydrate = useSettingsStore((s) => s.hydrateCurriculumPreferences);

  const [open, setOpen] = useState(false);
  const [promptTarget, setPromptTarget] = useState('');
  const [pending, setPending] = useState<'v1' | 'v2' | ''>('');

  const evaluate = useCallback(async () => {
    if (!isAuthenticated || isGuest || !userId) return;
    try {
      const res = await userService.getProfile(userId);
      const v2: V2Profile = res.data?.curriculumV2 || {};
      hydrate(v2.preferences);
      if (
        v2.isV2AvailableForCurrentTarget
        && !v2.currentVersion
        && v2.currentTarget
        && !dismissedThisSession.has(v2.currentTarget)
      ) {
        setPromptTarget(v2.currentTarget);
        setOpen(true);
      }
    } catch (_) {
      // Silent — the chooser is opt-in. A failed profile fetch just means
      // no prompt this session; the next launch retries.
    }
  }, [isAuthenticated, isGuest, userId, hydrate]);

  // Re-evaluate on auth state change and whenever the target language flips
  // (the user may have v2 available for Korean but not for Spanish, etc.).
  useEffect(() => { evaluate(); }, [evaluate, targetLanguage]);

  const choose = async (version: 'v1' | 'v2') => {
    if (!userId || !promptTarget || pending) return;
    setPending(version);
    try {
      const res = await userService.updateCurriculumPreference(userId, {
        targetLanguage: promptTarget,
        version,
      });
      // Server returns the canonical preferences map; mirror into the store.
      hydrate(res.data?.curriculumV2?.preferences);
      setCurriculumPreference(promptTarget, version);
      setOpen(false);
    } catch (_) {
      // Leave open so the learner can retry. No silent failure — they'll
      // see the buttons spring back from "Saving…" and can tap again.
    } finally {
      setPending('');
    }
  };

  const dismiss = () => {
    if (promptTarget) dismissedThisSession.add(promptTarget);
    setOpen(false);
  };

  const languageName = localizedLanguageName(
    promptTarget,
    t,
    promptTarget ? promptTarget.toUpperCase() : '',
  );

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={dismiss}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <TouchableOpacity
              style={styles.close}
              onPress={dismiss}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityLabel={t('common.close', 'Close')}
            >
              <MaterialCommunityIcons name="close" size={22} color={colors.textMuted} />
            </TouchableOpacity>

            <Text style={styles.kicker}>
              {t('curriculumVersion.kicker', 'Curriculum update available')}
            </Text>
            <Text variant="headlineSmall" style={styles.title}>
              {t('curriculumVersion.title', 'Choose your {{language}} experience', {
                language: languageName,
              })}
            </Text>
            <Text style={styles.lede}>
              {t(
                'curriculumVersion.lede',
                "We've launched a new {{language}} curriculum with pattern drills, comprehensible-input stories, and a session planner that adapts to what you've forgotten.",
                { language: languageName },
              )}
            </Text>

            <TouchableOpacity
              style={[styles.option, styles.optionV2]}
              activeOpacity={0.75}
              onPress={() => choose('v2')}
              disabled={!!pending}
            >
              <View style={styles.optionBadge}>
                <MaterialCommunityIcons name="lightning-bolt" size={14} color={colors.surface} />
                <Text style={styles.optionBadgeText}>
                  {t('curriculumVersion.recommended', 'Recommended')}
                </Text>
              </View>
              <Text style={styles.optionTitle}>
                {t('curriculumVersion.v2Title', 'Try the new curriculum')}
              </Text>
              <Text style={styles.optionBody}>
                {t(
                  'curriculumVersion.v2Body',
                  'Concept-first lessons across pattern drills, stories, cloze production, vocab SRS, and pronunciation tasks — interleaved by a session planner.',
                )}
              </Text>
              <Text style={styles.optionCta}>
                {pending === 'v2'
                  ? t('common.saving', 'Saving…')
                  : t('curriculumVersion.tryV2', 'Try it')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.option, styles.optionV1]}
              activeOpacity={0.75}
              onPress={() => choose('v1')}
              disabled={!!pending}
            >
              <Text style={styles.optionTitle}>
                {t('curriculumVersion.v1Title', 'Stay on the classic experience')}
              </Text>
              <Text style={styles.optionBody}>
                {t(
                  'curriculumVersion.v1Body',
                  'Keep using the vocabulary lists and class lessons you know. You can switch any time from Settings.',
                )}
              </Text>
              <Text style={styles.optionCtaMuted}>
                {pending === 'v1'
                  ? t('common.saving', 'Saving…')
                  : t('curriculumVersion.stayV1', 'Keep classic')}
              </Text>
            </TouchableOpacity>

            <Button
              mode="text"
              onPress={dismiss}
              disabled={!!pending}
              icon="book-open-variant"
              textColor={colors.textMuted}
              style={styles.defer}
            >
              {t('curriculumVersion.decideLater', 'Decide later')}
            </Button>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    padding: 18,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    maxHeight: '92%',
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 22,
    gap: 12,
  },
  close: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    padding: 4,
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 4,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  lede: {
    color: colors.textMuted,
    lineHeight: 21,
    marginBottom: 6,
  },
  option: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    marginTop: 6,
  },
  optionV2: {
    backgroundColor: colors.primary + '12',
    borderColor: colors.primary,
  },
  optionV1: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  optionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },
  optionBadgeText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  optionTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  optionBody: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  optionCta: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
  },
  optionCtaMuted: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
  },
  defer: {
    alignSelf: 'center',
    marginTop: 4,
  },
});

export default CurriculumVersionModal;
