import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthStack';
import LANGUAGES, { Language } from '../../config/languages';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { colors } from '../../config/theme';

type NavProp = NativeStackNavigationProp<AuthStackParamList, 'LanguageSelect'>;
type RouteType = RouteProp<AuthStackParamList, 'LanguageSelect'>;

const LanguageSelectScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteType>();
  const mode = route.params.mode;

  const { enterGuestMode } = useAuthStore();
  const { nativeLanguage: savedNative, targetLanguage: savedTarget, setLanguages } = useSettingsStore();

  const [nativeLang, setNativeLang] = useState(savedNative || 'en');
  const [targetLang, setTargetLang] = useState(savedTarget || 'ko');

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

  const handleContinue = () => {
    if (!canContinue) return;
    setLanguages(nativeLang, targetLang);

    if (mode === 'guest') {
      enterGuestMode();
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
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text variant="headlineMedium" style={styles.title}>
          {t('languageSelect.title')}
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {t('languageSelect.subtitle')}
        </Text>

        {/* Native language */}
        <Text style={styles.sectionLabel}>{t('languageSelect.iSpeak')}</Text>
        <View style={styles.languageGrid}>
          {langEntries.map(([code, lang]) =>
            renderLangButton(code, lang, nativeLang === code, false, () =>
              handleNativeChange(code),
            ),
          )}
        </View>

        {/* Target language */}
        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
          {t('languageSelect.iWantToLearn')}
        </Text>
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
          disabled={!canContinue}
          style={[styles.continueButton, !canContinue && styles.continueDisabled]}
          labelStyle={styles.continueLabel}
        >
          {t('languageSelect.continue')} →
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
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
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    width: '48%',
  },
  langOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#fff5f0',
  },
  langOptionDisabled: {
    opacity: 0.4,
  },
  langFlag: {
    fontSize: 24,
    marginRight: 10,
  },
  langNameCol: {
    flex: 1,
  },
  langEnglish: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  langNative: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  langTextDisabled: {
    color: colors.textMuted,
  },
  continueButton: {
    marginTop: 24,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  continueDisabled: {
    backgroundColor: colors.border,
  },
  continueLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
  },
});

export default LanguageSelectScreen;
