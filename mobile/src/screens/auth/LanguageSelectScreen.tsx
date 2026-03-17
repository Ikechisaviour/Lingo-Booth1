import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthStack';
import LANGUAGES, { Language } from '../../config/languages';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { userService } from '../../services/api';
import { colors } from '../../config/theme';

type NavProp = NativeStackNavigationProp<AuthStackParamList, 'LanguageSelect'>;
type RouteType = RouteProp<AuthStackParamList, 'LanguageSelect'>;

const LanguageSelectScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteType>();
  const mode = route.params.mode;
  const insets = useSafeAreaInsets();

  const { enterGuestMode, userId } = useAuthStore();
  const { nativeLanguage: savedNative, targetLanguage: savedTarget, setLanguages } = useSettingsStore();

  const [nativeLang, setNativeLang] = useState(savedNative || 'en');
  const [targetLang, setTargetLang] = useState(savedTarget || 'ko');
  const [saving, setSaving] = useState(false);

  const langEntries = Object.entries(LANGUAGES);

  const handleNativeChange = (code: string) => {
    setNativeLang(code);
    if (code === targetLang) setTargetLang('');
    i18n.changeLanguage(code);
  };

  const handleTargetChange = (code: string) => {
    if (code !== nativeLang) setTargetLang(code);
  };

  const canContinue = nativeLang && targetLang && nativeLang !== targetLang;

  const handleContinue = async () => {
    if (!canContinue) return;
    setLanguages(nativeLang, targetLang);
    i18n.changeLanguage(nativeLang);

    if (mode === 'guest') {
      enterGuestMode();
    } else if (mode === 'google-setup') {
      // User already logged in via Google — save language prefs to backend
      setSaving(true);
      try {
        if (userId) {
          await userService.updateProfile(userId, {
            nativeLanguage: nativeLang,
            targetLanguage: targetLang,
          });
        }
      } catch {
        // Non-fatal — languages are saved locally anyway
      } finally {
        setSaving(false);
      }
      // Navigation handled automatically by RootNavigator (user is now authenticated)
    } else {
      navigation.navigate('Register');
    }
  };

  const renderLangButton = (
    code: string,
    lang: Language,
    selected: boolean,
    disabled: boolean,
    onPress: () => void,
  ) => (
    <TouchableOpacity
      key={code}
      style={[
        styles.langOption,
        selected && styles.langOptionSelected,
        disabled && styles.langOptionDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.langFlag}>{lang.flag}</Text>
      <View style={styles.langNameCol}>
        <Text style={[styles.langEnglish, disabled && styles.langTextDisabled]}>
          {lang.name}
        </Text>
        {lang.nativeName !== lang.name && (
          <Text style={[styles.langNative, disabled && styles.langTextDisabled]}>
            {lang.nativeName}
          </Text>
        )}
      </View>
      {selected && <Text style={styles.selectedCheck}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.outer}>
      {/* Branded header */}
      <View style={[styles.brandHeader, { paddingTop: insets.top + 16 }]}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>{t('languageSelect.title')}</Text>
        <Text style={styles.headerSubtitle}>{t('languageSelect.subtitle')}</Text>
      </View>

      {/* Scrollable content sheet */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentSheet}>
          {/* Native language */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>{t('languageSelect.iSpeak')}</Text>
            {nativeLang && (
              <Text style={styles.sectionSelected}>
                {LANGUAGES[nativeLang]?.flag} {LANGUAGES[nativeLang]?.name}
              </Text>
            )}
          </View>
          <View style={styles.languageGrid}>
            {langEntries.map(([code, lang]) =>
              renderLangButton(code, lang, nativeLang === code, false, () =>
                handleNativeChange(code),
              ),
            )}
          </View>

          {/* Target language */}
          <View style={[styles.sectionHeader, { marginTop: 24 }]}>
            <Text style={styles.sectionLabel}>{t('languageSelect.iWantToLearn')}</Text>
            {targetLang && (
              <Text style={styles.sectionSelected}>
                {LANGUAGES[targetLang]?.flag} {LANGUAGES[targetLang]?.name}
              </Text>
            )}
          </View>
          <View style={styles.languageGrid}>
            {langEntries.map(([code, lang]) =>
              renderLangButton(code, lang, targetLang === code, code === nativeLang, () =>
                handleTargetChange(code),
              ),
            )}
          </View>

          <Button
            mode="contained"
            onPress={handleContinue}
            disabled={!canContinue || saving}
            loading={saving}
            style={[styles.continueButton, !canContinue && styles.continueDisabled]}
            labelStyle={styles.continueLabel}
          >
            {t('languageSelect.continue')} →
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: colors.primary },

  brandHeader: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },

  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  contentSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    minHeight: 400,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionSelected: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },

  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    width: '48%',
  },
  langOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#fff5f0',
  },
  langOptionDisabled: { opacity: 0.38 },
  langFlag: { fontSize: 22, marginRight: 8 },
  langNameCol: { flex: 1 },
  langEnglish: { fontSize: 12, fontWeight: '600', color: colors.textPrimary },
  langNative: { fontSize: 11, color: colors.textSecondary, marginTop: 1 },
  langTextDisabled: { color: colors.textMuted },
  selectedCheck: { fontSize: 14, color: colors.primary, fontWeight: '700', marginLeft: 4 },

  continueButton: {
    marginTop: 28,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  continueDisabled: { backgroundColor: colors.border },
  continueLabel: { fontSize: 16, fontWeight: '600', paddingVertical: 4 },
});

export default LanguageSelectScreen;
