import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, TextInput, Button, HelperText, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { authService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { colors } from '../../config/theme';

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<LoginNavProp>();
  const { login, guestXP, clearGuestXP } = useAuthStore();
  const { setLanguages, setVoice } = useSettingsStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [suspended, setSuspended] = useState<{ message: string; reason: string } | null>(null);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;
    setError('');
    setSuspended(null);
    setLoading(true);

    try {
      const response = await authService.login(email.trim(), password, guestXP);
      const { token, user } = response.data;

      login({ token, user });
      clearGuestXP();

      // Sync language & voice preferences
      setLanguages(user.nativeLanguage || 'en', user.targetLanguage || 'ko');
      if (user.preferredVoice) setVoice(user.preferredVoice);
      i18n.changeLanguage(user.nativeLanguage || 'en');
    } catch (err: any) {
      if (err.response?.status === 403 && err.response?.data?.reason) {
        setSuspended({
          message: err.response.data.message,
          reason: err.response.data.reason,
        });
      } else {
        setError(err.response?.data?.message || t('login.loginFailed'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    navigation.navigate('LanguageSelect', { mode: 'guest' });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
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
            {t('login.welcomeBack')}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {t('login.subtitle')}
          </Text>

          {suspended && (
            <View style={styles.suspendedBox}>
              <Text style={styles.suspendedTitle}>{t('login.accountSuspended')}</Text>
              <Text style={styles.suspendedText}>{suspended.message}</Text>
              <Text style={styles.suspendedReason}>
                {t('login.reason')}: {suspended.reason}
              </Text>
              <Text style={styles.suspendedContact}>{t('login.suspendedMistake')}</Text>
            </View>
          )}

          {!!error && (
            <HelperText type="error" visible style={styles.errorText}>
              {error}
            </HelperText>
          )}

          <TextInput
            label={t('login.email')}
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
          />

          <TextInput
            label={t('login.password')}
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading || !email.trim() || !password.trim()}
            style={styles.primaryButton}
            labelStyle={styles.buttonLabel}
          >
            {loading ? t('login.loggingIn') : t('login.loginButton')}
          </Button>

          <View style={styles.divider}>
            <Divider style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t('common.or')}</Text>
            <Divider style={styles.dividerLine} />
          </View>

          <Button
            mode="outlined"
            onPress={handleGuestMode}
            style={styles.guestButton}
            labelStyle={styles.guestButtonLabel}
          >
            {t('login.tryAsGuest')}
          </Button>
          <Text style={styles.guestNote}>{t('login.guestNote')}</Text>

          <View style={styles.linkRow}>
            <Text style={styles.linkText}>{t('login.noAccount')} </Text>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('LanguageSelect', { mode: 'register' })}
            >
              {t('login.signUpHere')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
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
  input: {
    marginBottom: 12,
    backgroundColor: colors.surface,
  },
  primaryButton: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: 12,
    color: colors.textMuted,
    fontSize: 13,
  },
  guestButton: {
    borderRadius: 8,
    borderColor: colors.primary,
  },
  guestButtonLabel: {
    color: colors.primary,
    fontSize: 15,
  },
  guestNote: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 8,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 14,
  },
  suspendedBox: {
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  suspendedTitle: {
    fontWeight: '700',
    color: colors.error,
    fontSize: 16,
    marginBottom: 4,
  },
  suspendedText: {
    color: colors.textPrimary,
    marginBottom: 4,
  },
  suspendedReason: {
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  suspendedContact: {
    color: colors.textMuted,
    fontSize: 12,
  },
});

export default LoginScreen;
