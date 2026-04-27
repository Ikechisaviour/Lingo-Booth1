import React, { useState, useEffect } from 'react';
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

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
  scopes: ['profile', 'email'],
});

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<LoginNavProp>();
  const { login, guestXP, clearGuestXP } = useAuthStore();
  const { setLanguages, setVoice, nativeLanguage, targetLanguage } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const { height: winHeight, width: winWidth } = useWindowDimensions();
  const isCompact = winHeight < 450 || winWidth < 380;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [suspended, setSuspended] = useState<{ message: string; reason: string } | null>(null);

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
          await handleGoogleToken(idToken);
        } else {
          setError(t('login.googleFailed', 'Google sign-in failed.'));
        }
      }
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled — do nothing
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError(t('login.playServicesRequired', 'Google Play Services required.'));
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(t('login.googleFailed', 'Google sign-in failed.'));
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleToken = async (idToken: string) => {
    setGoogleLoading(true);
    setError('');
    setSuspended(null);
    try {
      const res = await authService.googleLogin(idToken, guestXP, nativeLanguage, targetLanguage);
      const { token, user, isNewUser } = res.data;

      login({ token, user });
      clearGuestXP();
      if (user.preferredVoice) setVoice(user.preferredVoice);

      // login() already sets needsLanguageSetup from user.languageSetupComplete
      if (user.languageSetupComplete) {
        setLanguages(user.nativeLanguage || '', user.targetLanguage || '');
        i18n.changeLanguage(user.nativeLanguage || '');
      }
    } catch (err: any) {
      if (err.response?.status === 403 && err.response?.data?.reason) {
        setSuspended({
          message: err.response.data.message,
          reason: err.response.data.reason,
        });
      } else {
        setError(err.response?.data?.message || t('login.googleFailed', 'Google sign-in failed.'));
      }
    } finally {
      setGoogleLoading(false);
    }
  };

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
      setLanguages(user.nativeLanguage || '', user.targetLanguage || '');
      if (user.preferredVoice) setVoice(user.preferredVoice);
      i18n.changeLanguage(user.nativeLanguage || '');
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
      <View style={styles.outer}>
        {/* Branded top section */}
        <View style={[styles.brandTop, { paddingTop: insets.top + (isCompact ? 8 : 24), paddingBottom: isCompact ? 12 : 28 }]}>
          <Image
            source={require('../../../assets/icon.png')}
            style={[styles.logo, isCompact && { width: 48, height: 48, marginBottom: 6 }]}
            resizeMode="contain"
          />
          {!isCompact && <Text style={styles.brandName}>Lingo Booth</Text>}
          {!isCompact && <Text style={styles.brandTagline}>{t('login.brandTagline', 'Learn any language')}</Text>}
        </View>

        {/* Form card sliding up from bottom */}
        <ScrollView
          style={styles.formScroll}
          contentContainerStyle={[styles.formContent, { paddingBottom: insets.bottom + 28 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.formCard, isCompact && { paddingHorizontal: 18, paddingTop: 18, minHeight: 0 }]}>
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

            {/* Google Sign-In */}
            {!!GOOGLE_WEB_CLIENT_ID && (
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
                    : t('login.continueWithGoogle', 'Continue with Google')}
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.divider}>
              <Divider style={styles.dividerLine} />
              <Text style={styles.dividerText}>{t('common.or', 'or')}</Text>
              <Divider style={styles.dividerLine} />
            </View>

            <TextInput
              label={t('login.email')}
              accessibilityLabel={t('login.email')}
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
              accessibilityLabel={t('login.password')}
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

            <Text
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              {t('login.forgotPassword', 'Forgot password?')}
            </Text>

            <View style={styles.divider}>
              <Divider style={styles.dividerLine} />
              <Text style={styles.dividerText}>{t('common.or', 'or')}</Text>
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

  title: {
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    backgroundColor: colors.surface,
  },
  primaryButton: {
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
  },
  forgotPassword: {
    textAlign: 'right',
    color: colors.primary,
    fontSize: 13,
    fontWeight: '500',
    marginTop: 8,
  },

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
    marginBottom: 4,
  },
  googleButtonDisabled: {
    opacity: 0.6,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3c4043',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
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
    borderRadius: 10,
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
  errorText: { fontSize: 14 },
  suspendedBox: {
    backgroundColor: '#fef2f2',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  suspendedTitle: { fontWeight: '700', color: colors.error, fontSize: 16, marginBottom: 4 },
  suspendedText: { color: colors.textPrimary, marginBottom: 4 },
  suspendedReason: { color: colors.textSecondary, fontStyle: 'italic', marginBottom: 4 },
  suspendedContact: { color: colors.textMuted, fontSize: 12 },
});

export default LoginScreen;
