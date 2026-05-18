import React, { useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { contactService, userService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { useAppColors, shadows, type AppColors } from '../../config/theme';

const ContactScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { width } = useWindowDimensions();
  const { token, userId, username, isGuest } = useAuthStore();
  const { nativeLanguage, targetLanguage } = useSettingsStore();
  const isSignedIn = !!token && !isGuest;
  const isWide = width >= 760;

  const [name, setName] = useState(username || '');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });

  useEffect(() => {
    if (!isSignedIn || !userId) return;
    userService.getProfile(userId)
      .then((response) => {
        const profile = response.data || {};
        setName((current) => current || profile.username || '');
        setEmail(profile.email || '');
      })
      .catch(() => {});
  }, [isSignedIn, userId]);

  const canSubmit = (
    name.trim().length >= 2
    && email.trim().length > 3
    && message.trim().length >= 10
    && !sending
  );

  const sendMessage = async () => {
    if (!canSubmit) return;
    setSending(true);
    setStatus({ type: '', text: '' });
    try {
      await contactService.sendMessage({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        nativeLanguage,
        targetLanguage,
        clientLanguage: i18n.resolvedLanguage || i18n.language,
        page: '/mobile/contact',
      });
      setSubject('');
      setMessage('');
      setStatus({ type: 'success', text: t('contact.success', 'Thanks. Your message has been received.') });
    } catch (error: any) {
      setStatus({
        type: 'error',
        text: error.response?.data?.message || t('contact.error', 'We could not send your message right now. Please try again.'),
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.kicker}>{t('contact.kicker', 'Contact us')}</Text>
          <Text style={styles.title}>{t('contact.title', 'Tell us what you need')}</Text>
          <Text style={styles.subtitle}>
            {t('contact.subtitle', 'Send a question, report a problem, or share feedback. We will review your message and respond when needed.')}
          </Text>
        </View>

        <View style={[styles.layout, isWide && styles.layoutWide]}>
          <Card style={[styles.card, styles.infoCard]}>
            <Card.Content style={styles.cardContent}>
              <Text style={styles.infoTitle}>{t('contact.infoTitle', 'We are listening')}</Text>
              <Text style={styles.infoText}>
                {t('contact.infoText', 'Messages from this form are saved securely with account context when available, so we can understand what happened and help faster.')}
              </Text>
            </Card.Content>
          </Card>

          <Card style={[styles.card, styles.formCard]}>
            <Card.Content style={styles.cardContent}>
              {!!status.text && (
                <View style={[styles.alert, status.type === 'success' ? styles.successAlert : styles.errorAlert]}>
                  <Text style={status.type === 'success' ? styles.successText : styles.errorText}>{status.text}</Text>
                </View>
              )}

              <View style={[styles.fieldRow, isWide && styles.fieldRowWide]}>
                <TextInput
                  label={t('contact.name', 'Name')}
                  value={name}
                  onChangeText={setName}
                  mode="outlined"
                  style={[styles.input, isWide && styles.halfInput]}
                />
                <TextInput
                  label={t('contact.email', 'Email')}
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isSignedIn}
                  style={[styles.input, isWide && styles.halfInput]}
                />
              </View>
              <TextInput
                label={t('contact.subject', 'Subject')}
                value={subject}
                onChangeText={setSubject}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label={t('contact.message', 'Message')}
                value={message}
                onChangeText={setMessage}
                mode="outlined"
                multiline
                numberOfLines={8}
                style={styles.messageInput}
              />
              <Button mode="contained" icon="send-outline" onPress={sendMessage} disabled={!canSubmit} loading={sending}>
                {sending ? t('common.sending', 'Sending...') : t('contact.send', 'Send message')}
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 32, gap: 16 },
  header: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 20,
    ...shadows.md,
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
    lineHeight: 34,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 8,
    lineHeight: 21,
  },
  layout: { gap: 14 },
  layoutWide: { flexDirection: 'row', alignItems: 'stretch' },
  card: { backgroundColor: colors.surface, borderRadius: 16, ...shadows.sm },
  infoCard: { flex: 0.8 },
  formCard: { flex: 1.2 },
  cardContent: { gap: 12 },
  infoTitle: { color: colors.textPrimary, fontSize: 20, fontWeight: '900' },
  infoText: { color: colors.textSecondary, lineHeight: 22 },
  alert: { borderRadius: 12, padding: 12 },
  successAlert: { backgroundColor: '#ecfccb' },
  errorAlert: { backgroundColor: '#fef2f2' },
  successText: { color: '#3f6212', fontWeight: '700' },
  errorText: { color: colors.error, fontWeight: '700' },
  fieldRow: { gap: 12 },
  fieldRowWide: { flexDirection: 'row' },
  input: { backgroundColor: colors.surface },
  halfInput: { flex: 1 },
  messageInput: { minHeight: 140, backgroundColor: colors.surface },
});

export default ContactScreen;
