import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { authService } from '../../services/api';
import { colors } from '../../config/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;

const ResetPasswordScreen: React.FC<Props> = ({ route, navigation }) => {
  const { t } = useTranslation();
  const token = String(route.params?.token || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    if (!token || password.length < 6 || password !== confirmPassword) return;
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await authService.resetPassword(token, password);
      setMessage(t('resetPassword.success', 'Password reset successfully. You can now sign in.'));
    } catch (err: any) {
      setError(err.response?.data?.message || t('resetPassword.failed', 'Could not reset password. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const mismatch = !!confirmPassword && password !== confirmPassword;
  const tooShort = !!password && password.length < 6;

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.kicker}>{t('resetPassword.kicker', 'Reset password')}</Text>
          <Text style={styles.title}>{t('resetPassword.title', 'Choose a new password')}</Text>
          <Text style={styles.subtitle}>{t('resetPassword.subtitle', 'Enter a new password for your account.')}</Text>

          {!!message && <Text style={styles.success}>{message}</Text>}
          {!!error && <HelperText type="error" visible>{error}</HelperText>}
          {!token && <HelperText type="error" visible>{t('resetPassword.missingToken', 'This reset link is missing or invalid.')}</HelperText>}

          <TextInput
            label={t('resetPassword.newPassword', 'New password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            style={styles.input}
          />
          <HelperText type="error" visible={tooShort}>
            {tooShort ? t('profilePage.passwordTooShort', 'Password must be at least 6 characters') : ' '}
          </HelperText>
          <TextInput
            label={t('resetPassword.confirmPassword', 'Confirm password')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            mode="outlined"
            style={styles.input}
          />
          <HelperText type="error" visible={mismatch}>
            {mismatch ? t('register.passwordsNoMatch', 'Passwords do not match') : ' '}
          </HelperText>

          <Button
            mode="contained"
            onPress={submit}
            disabled={!token || loading || password.length < 6 || password !== confirmPassword}
            loading={loading}
          >
            {loading ? t('common.saving', 'Saving...') : t('resetPassword.submit', 'Reset password')}
          </Button>
          <Button mode="text" onPress={() => navigation.navigate('Login')}>
            {t('forgotPassword.backToLogin', 'Back to Login')}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 22,
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 16,
  },
  success: {
    color: colors.success,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.surface,
  },
});

export default ResetPasswordScreen;
