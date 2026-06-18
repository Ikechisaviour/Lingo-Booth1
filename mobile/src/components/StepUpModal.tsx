import React, { useEffect, useMemo, useState } from 'react';
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { authService, registerStepUpHandler } from '../services/api';
import { useAuthStore } from '../stores/authStore';
import { useAppColors, type AppColors } from '../config/theme';

// Mounts once at the app root. Listens for the API interceptor's step-up
// requests, prompts the user for their password, and resolves the held request
// after a successful /auth/step-up so the user is not bounced out of their flow.
type Pending = {
  maxAgeMinutes?: number;
  onComplete: () => void;
  onCancel: () => void;
};

const StepUpModal: React.FC = () => {
  const { t } = useTranslation();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [pending, setPending] = useState<Pending | null>(null);
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    registerStepUpHandler((detail) => {
      // Cancel any in-flight request so its caller gets a clean rejection
      // rather than a hung promise.
      setPending((prev) => {
        if (prev?.onCancel) prev.onCancel();
        return detail;
      });
      setPassword('');
      setError('');
    });
    return () => registerStepUpHandler(null);
  }, []);

  if (!pending) return null;

  const handleCancel = () => {
    pending.onCancel();
    setPending(null);
    setPassword('');
    setError('');
  };

  const handleSubmit = async () => {
    if (!password || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await authService.stepUp(password);
      const { token, refreshToken } = res.data || {};
      if (token) useAuthStore.getState().setToken(token);
      if (refreshToken) useAuthStore.getState().setRefreshToken(refreshToken);
      const onComplete = pending.onComplete;
      setPending(null);
      setPassword('');
      onComplete();
    } catch (err: any) {
      setError(err?.response?.data?.message || t('stepUp.verifyFailed', 'Could not verify password'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible transparent animationType="fade" onRequestClose={handleCancel}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text variant="titleMedium" style={styles.title}>{t('stepUp.title', "Confirm it's you")}</Text>
          <Text style={styles.message}>
            {t('stepUp.message', 'For your security, please re-enter your password to continue with this action.')}
          </Text>
          <TextInput
            mode="outlined"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder={t('stepUp.passwordPlaceholder', 'Password')}
            autoFocus
            disabled={submitting}
            style={styles.input}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.actions}>
            <Button onPress={handleCancel} disabled={submitting}>{t('common.cancel', 'Cancel')}</Button>
            <Button mode="contained" onPress={handleSubmit} disabled={submitting || !password}>
              {submitting ? <ActivityIndicator color={colors.surface} size="small" /> : t('stepUp.confirm', 'Confirm')}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modal: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    color: colors.textPrimary,
    marginBottom: 8,
  },
  message: {
    color: colors.textSecondary,
    marginBottom: 14,
    lineHeight: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: colors.surface,
  },
  error: {
    color: colors.error,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
});

export default StepUpModal;
