import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { authService } from '../../services/api';
import { colors } from '../../config/theme';

type NavProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email.trim()) return;
    setError('');
    setLoading(true);
    try {
      await authService.forgotPassword(email.trim());
      setSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || t('forgotPassword.error', 'Something went wrong. Please try again.'));
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
        <View style={[styles.brandTop, { paddingTop: insets.top + 24 }]}>
          <Image
            source={require('../../../assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandName}>Lingo Booth</Text>
        </View>

        <ScrollView
          style={styles.formScroll}
          contentContainerStyle={[styles.formContent, { paddingBottom: insets.bottom + 28 }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formCard}>
            <Text variant="headlineMedium" style={styles.title}>
              {t('forgotPassword.title', 'Forgot Password')}
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {t('forgotPassword.subtitle', "Enter your email and we'll send you a link to reset your password.")}
            </Text>

            {!!error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            {sent ? (
              <View style={styles.sentContainer}>
                <Text style={styles.sentIcon}>📧</Text>
                <Text style={styles.sentTitle}>
                  {t('forgotPassword.checkEmail', 'Check your email')}
                </Text>
                <Text style={styles.sentMessage}>
                  {t('forgotPassword.sentMessage', 'If an account with that email exists, we sent a password reset link.')}
                </Text>
              </View>
            ) : (
              <>
                <TextInput
                  label={t('login.email', 'Email')}
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

                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={loading || !email.trim()}
                  style={styles.primaryButton}
                  labelStyle={styles.buttonLabel}
                >
                  {t('forgotPassword.sendLink', 'Send Reset Link')}
                </Button>
              </>
            )}

            <Text
              style={styles.backLink}
              onPress={() => navigation.navigate('Login')}
            >
              {t('forgotPassword.backToLogin', 'Back to Login')}
            </Text>
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
  logo: { width: 76, height: 76, marginBottom: 12 },
  brandName: { color: '#fff', fontSize: 28, fontWeight: '800', letterSpacing: 0.5 },
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
  },
  title: { fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { color: colors.textSecondary, marginBottom: 24 },
  input: { marginBottom: 16, backgroundColor: colors.surface },
  primaryButton: { marginTop: 8, borderRadius: 10, backgroundColor: colors.primary },
  buttonLabel: { fontSize: 16, fontWeight: '600', paddingVertical: 4 },
  errorText: {
    color: colors.error,
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 14,
  },
  sentContainer: { alignItems: 'center', paddingVertical: 24 },
  sentIcon: { fontSize: 48, marginBottom: 16 },
  sentTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 8 },
  sentMessage: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  backLink: {
    textAlign: 'center',
    color: colors.primary,
    fontWeight: '600',
    marginTop: 24,
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
