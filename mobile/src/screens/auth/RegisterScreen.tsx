import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { authService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { colors } from '../../config/theme';

type RegisterNavProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RegisterNavProp>();
  const { login, guestXP, clearGuestXP } = useAuthStore();
  const { nativeLanguage, targetLanguage } = useSettingsStore();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

          <View style={styles.linkRow}>
            <Text style={styles.linkText}>{t('register.hasAccount')} </Text>
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
              {t('register.loginHere')}
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
  validationText: {
    fontSize: 13,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
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
});

export default RegisterScreen;
