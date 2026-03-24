import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Text, TextInput, Button, HelperText, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { GoogleSignin, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { authService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { colors } from '../../config/theme';

const GOOGLE_WEB_CLIENT_ID =
  (Constants.expoConfig?.extra?.googleWebClientId as string | undefined) || '';

type RegisterNavProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<RegisterNavProp>();
  const { login, guestXP, clearGuestXP } = useAuthStore();
  const { nativeLanguage, targetLanguage, setLanguages, setVoice } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const { height: winHeight, width: winWidth } = useWindowDimensions();
  const isCompact = winHeight < 450 || winWidth < 380;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGooglePress = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const idToken = response.data.idToken;
        if (idToken) {
          const res = await authService.googleLogin(idToken, guestXP, nativeLanguage, targetLanguage);
          const { token, user, isNewUser } = res.data;
          login({ token, user });
          clearGuestXP();
          if (user.preferredVoice) setVoice(user.preferredVoice);
          // login() already sets needsLanguageSetup from user.languageSetupComplete
          if (user.languageSetupComplete) {
            setLanguages(user.nativeLanguage || 'en', user.targetLanguage || 'ko');
            i18n.changeLanguage(user.nativeLanguage || 'en');
          }
        } else {
          setError(t('login.googleFailed', 'Google sign-in failed.'));
        }
      }
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(t('login.googleFailed', 'Google sign-in failed.'));
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const emailTouched = email.length > 0;
  const emailValid = EMAIL_REGEX.test(email);
  const confirmTouched = confirmPassword.length > 0;
  const passwordsMatch = password === confirmPassword;

  const canSubmit =
    username.trim().length > 0 &&
    emailValid &&
    password.length >= 6 &&
    passwordsMatch &&
    !loading;

  const handleRegister = async () => {
    if (!canSubmit) return;
    setError('');
    setLoading(true);

    try {
      const response = await authService.register(
        username.trim(),
        email.trim(),
        password,
        guestXP,
        nativeLanguage || 'en',
        targetLanguage || 'ko',
      );
      clearGuestXP();
      const { token, user } = response.data;
      login({ token, user });
    } catch (err: any) {
      setError(err.response?.data?.message || t('register.registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.outer}>
        {/* Branded top section */}
        <View style={[styles.brandTop, { paddingTop: insets.top + (isCompact ? 8 : 24), paddingBottom: isCompact ? 12 : 28 }]}>
          <Image
            source={require('../../../assets/icon.png')}
            style={[styles.logo, isCompact && { width: 48, height: 48, marginBottom: 6 }]}
            resizeMode="contain"
          />
          {!isCompact && <Text style={styles.brandName}>Lingo Booth</Text>}
          {!isCompact && <Text style={styles.brandTagline}>{t('register.brandTagline', 'Start your journey')}</Text>}
        </View>

        {/* Form card */}
        <ScrollView
          style={styles.formScroll}
          contentContainerStyle={[styles.formContent, { paddingBottom: insets.bottom + 28 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.formCard, isCompact && { paddingHorizontal: 18, paddingTop: 18, minHeight: 0 }]}>
            <Text variant="headlineMedium" style={styles.title}>
              {t('register.title')}
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {t('register.subtitle')}
            </Text>

            {!!error && (
              <HelperText type="error" visible style={styles.errorText}>
                {error}
              </HelperText>
            )}

            <TextInput
              label={t('register.username')}
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              autoCapitalize="none"
              style={styles.input}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />

            <TextInput
              label={t('register.email')}
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
            {emailTouched && (
              <Text style={[styles.validationText, { color: emailValid ? '#16a34a' : '#dc2626' }]}>
                {emailValid ? `✓ ${t('register.validEmail')}` : `✗ ${t('register.invalidEmail')}`}
              </Text>
            )}

            <TextInput
              label={t('register.password')}
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

            <TextInput
              label={t('register.confirmPassword')}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              style={styles.input}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
            {confirmTouched && (
              <Text style={[styles.validationText, { color: passwordsMatch ? '#16a34a' : '#dc2626' }]}>
                {passwordsMatch
                  ? `✓ ${t('register.passwordsMatch')}`
                  : `✗ ${t('register.passwordsNoMatch')}`}
              </Text>
            )}

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={!canSubmit}
              style={styles.primaryButton}
              labelStyle={styles.buttonLabel}
            >
              {loading ? t('register.creatingAccount') : t('register.signUpButton')}
            </Button>

            {!!GOOGLE_WEB_CLIENT_ID && (
              <>
                <View style={styles.divider}>
                  <Divider style={styles.dividerLine} />
                  <Text style={styles.dividerText}>{t('common.or', 'or')}</Text>
                  <Divider style={styles.dividerLine} />
                </View>
                <TouchableOpacity
                  style={[styles.googleButton, googleLoading && styles.googleButtonDisabled]}
                  onPress={handleGooglePress}
                  disabled={googleLoading}
                  activeOpacity={0.8}
                >
                  <Image
                    source={{ uri: 'https://www.google.com/favicon.ico' }}
                    style={styles.googleIcon}
                  />
                  <Text style={styles.googleButtonText}>
                    {googleLoading
                      ? t('login.signingInGoogle', 'Signing in...')
                      : t('register.continueWithGoogle', 'Sign up with Google')}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.linkRow}>
              <Text style={styles.linkText}>{t('register.hasAccount')} </Text>
              <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                {t('register.loginHere')}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  outer: { flex: 1, backgroundColor: colors.primary },

  brandTop: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  logo: {
    width: 76,
    height: 76,
    marginBottom: 12,
  },
  brandName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  brandTagline: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 15,
    marginTop: 4,
  },

  formScroll: { flex: 1 },
  formContent: { flexGrow: 1 },
  formCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 8,
    flex: 1,
    minHeight: 480,
  },

  title: { fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { color: colors.textSecondary, marginBottom: 20 },
  input: { marginBottom: 12, backgroundColor: colors.surface },
  validationText: { fontSize: 13, marginTop: -8, marginBottom: 8, marginLeft: 4 },
  primaryButton: { marginTop: 8, borderRadius: 10, backgroundColor: colors.primary },
  buttonLabel: { fontSize: 16, fontWeight: '600', paddingVertical: 4 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  dividerLine: { flex: 1, backgroundColor: colors.border },
  dividerText: { marginHorizontal: 12, color: colors.textMuted, fontSize: 13 },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#dadce0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  googleButtonDisabled: { opacity: 0.6 },
  googleIcon: { width: 20, height: 20, marginRight: 10 },
  googleButtonText: { fontSize: 15, fontWeight: '600', color: '#3c4043' },
  linkRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  linkText: { color: colors.textSecondary, fontSize: 14 },
  link: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  errorText: { fontSize: 14 },
});

export default RegisterScreen;
