import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { billingService, levelTestService } from '../../services/api';
import { getLanguageDisplayName } from '../../config/languages';
import { shadows, type AppColors, useAppColors } from '../../config/theme';
import { useSettingsStore } from '../../stores/settingsStore';
import { useAuthStore } from '../../stores/authStore';

const LEVELS = [1, 2, 3, 4];
const MODES = ['completion', 'proficiency'];

const taskInstruction = (t: any, taskType: string) => {
  const labels: Record<string, string> = {
    choose_target: t('levelTests.tasks.chooseTarget', 'Choose the target-language answer.'),
    choose_meaning: t('levelTests.tasks.chooseMeaning', 'Choose the best meaning.'),
    type_target: t('levelTests.tasks.typeTarget', 'Type the target-language answer.'),
    short_response: t('levelTests.tasks.shortResponse', 'Answer in the target language, then score your response.'),
  };
  return labels[taskType] || t('levelTests.tasks.default', 'Answer the question.');
};

const contextLabel = (t: any, context: any) => (
  context.contextType === 'institution'
    ? context.organizationName || t('levelTests.institutionContext', 'Institution')
    : t('levelTests.personalContext', 'Personal')
);

const skillLabel = (t: any, skill: string) => t(`levelTests.skills.${skill}`, skill || t('levelTests.skills.general', 'General'));

const formatPrice = (cents: number | null | undefined) => `$${((Number(cents) || 0) / 100).toFixed(0)}`;

const LevelTestScreen: React.FC<any> = () => {
  const { t } = useTranslation();
  const colors = useAppColors();
  const { width } = useWindowDimensions();
  const tablet = width >= 720;
  const styles = useMemo(() => createStyles(colors, tablet), [colors, tablet]);
  const { nativeLanguage, targetLanguage } = useSettingsStore();
  const { fullName, setFullName } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contexts, setContexts] = useState<any[]>([]);
  const [testEntitlements, setTestEntitlements] = useState<any>(null);
  const [selectedContextKey, setSelectedContextKey] = useState('personal');
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedMode, setSelectedMode] = useState('completion');
  const [attempt, setAttempt] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [certificate, setCertificate] = useState<any>(null);
  const [namePromptOpen, setNamePromptOpen] = useState(false);
  const [certificateName, setCertificateName] = useState(fullName || '');
  const [certificateNameError, setCertificateNameError] = useState('');

  const selectedContext = useMemo(() => {
    return contexts.find((context) => {
      const key = context.contextType === 'institution' ? `institution:${context.organizationId}` : 'personal';
      return key === selectedContextKey;
    }) || contexts[0] || { contextType: 'personal' };
  }, [contexts, selectedContextKey]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await levelTestService.getContexts();
      const nextContexts = res.data?.contexts || [];
      const overviewContext = nextContexts.find((context: any) => {
        const key = context.contextType === 'institution' ? `institution:${context.organizationId}` : 'personal';
        return key === selectedContextKey;
      }) || nextContexts[0] || { contextType: 'personal' };
      setContexts(nextContexts);
      const overview = await levelTestService.getOverview({
        contextType: overviewContext?.contextType || 'personal',
        organizationId: overviewContext?.organizationId || '',
        targetLanguage,
        nativeLanguage,
      });
      setTestEntitlements(overview.data?.testEntitlements || null);
    } catch {
      Alert.alert(t('common.error', 'Error'), t('levelTests.loadFailed', 'Could not load level testing right now.'));
    } finally {
      setLoading(false);
    }
  }, [nativeLanguage, selectedContextKey, targetLanguage, t]);

  useEffect(() => {
    load();
  }, [load]);

  const updateAnswer = (questionId: string, patch: Record<string, any>) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: { ...(current[questionId] || {}), questionId, ...patch },
    }));
  };

  const startPaidProficiencyCheckout = async () => {
    setSaving(true);
    try {
      const res = await billingService.createLevelTestCheckoutSession();
      if (res.data?.checkoutUrl) {
        await Linking.openURL(res.data.checkoutUrl);
        return;
      }
      if (res.data?.requiresSetup) {
        Alert.alert(t('common.error', 'Error'), t('levelTests.paymentSetupNeeded', 'Paid proficiency checks are not configured yet.'));
        return;
      }
      Alert.alert(t('common.error', 'Error'), t('levelTests.paymentStartFailed', 'Could not start payment for this proficiency check.'));
    } catch {
      Alert.alert(t('common.error', 'Error'), t('levelTests.paymentStartFailed', 'Could not start payment for this proficiency check.'));
    } finally {
      setSaving(false);
    }
  };

  const start = async () => {
    setSaving(true);
    setCertificate(null);
    try {
      const res = await levelTestService.start({
        level: selectedLevel,
        mode: selectedMode,
        contextType: selectedContext?.contextType || 'personal',
        organizationId: selectedContext?.organizationId || '',
        targetLanguage,
        nativeLanguage,
      });
      setAttempt(res.data.attempt);
      setTestEntitlements(res.data.testEntitlements || testEntitlements);
      setAnswers({});
    } catch (err: any) {
      const code = err.response?.data?.code;
      if (err.response?.data?.testEntitlements) setTestEntitlements(err.response.data.testEntitlements);
      if (code === 'PROFICIENCY_TEST_PAYMENT_REQUIRED') {
        const price = formatPrice(err.response?.data?.priceCents || 1000);
        Alert.alert(
          t('levelTests.proficiencyPaymentTitle', 'Payment needed'),
          t('levelTests.proficiencyPaymentRequired', 'This proficiency check is {{price}} after your included checks.', { price }),
          [
            { text: t('common.cancel', 'Cancel'), style: 'cancel' },
            { text: t('levelTests.payProficiencyCheck', 'Pay {{price}} for this check', { price }), onPress: startPaidProficiencyCheckout },
          ],
        );
        return;
      }
      Alert.alert(
        t('common.error', 'Error'),
        err.response?.data?.message || t('levelTests.startFailed', 'This test is not ready yet.'),
      );
    } finally {
      setSaving(false);
    }
  };

  const submit = async () => {
    if (!attempt?._id) return;
    setSaving(true);
    try {
      const res = await levelTestService.submit(attempt._id, Object.values(answers));
      setAttempt(res.data.attempt);
    } catch {
      Alert.alert(t('common.error', 'Error'), t('levelTests.submitFailed', 'Could not submit this test.'));
    } finally {
      setSaving(false);
    }
  };

  const issueCertificate = async (fullNameOverride = '') => {
    if (!attempt?._id) return;
    setSaving(true);
    try {
      const payload = fullNameOverride ? { fullName: fullNameOverride.trim() } : {};
      const res = await levelTestService.issueCertificate(attempt._id, payload);
      setCertificate(res.data.certificate);
      if (payload.fullName) setFullName(payload.fullName);
      setNamePromptOpen(false);
      setCertificateNameError('');
      Alert.alert(t('levelTests.certificateReady', 'Your certificate is ready.'));
    } catch (err: any) {
      const code = err.response?.data?.code;
      if (code === 'FULL_NAME_REQUIRED' || code === 'FULL_NAME_INVALID') {
        setCertificateName((current) => current || fullName || '');
        setCertificateNameError(code === 'FULL_NAME_INVALID'
          ? t('levelTests.fullNameInvalid', 'Enter at least two characters for your full name.')
          : '');
        setNamePromptOpen(true);
        return;
      }
      Alert.alert(t('common.error', 'Error'), t('levelTests.certificateFailed', 'Could not issue this certificate yet.'));
    } finally {
      setSaving(false);
    }
  };

  const submitCertificateName = () => {
    const value = certificateName.trim();
    if (value.length < 2) {
      setCertificateNameError(t('levelTests.fullNameInvalid', 'Enter at least two characters for your full name.'));
      return;
    }
    issueCertificate(value);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  const submitted = attempt?.status === 'submitted';
  const allowedTargetLanguages = selectedContext?.allowedTargetLanguages || [];
  const restricted = selectedContext?.contextType === 'institution' && !allowedTargetLanguages.includes(targetLanguage);
  const proficiencyEntitlement = testEntitlements?.proficiencyTests || null;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Card style={styles.hero}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.kicker}>{t('levelTests.kicker', 'Level checks')}</Text>
          <Text style={styles.title}>{t('levelTests.title', 'Show what you can do')}</Text>
          <Text style={styles.muted}>
            {t('levelTests.subtitle', 'Complete a level check for progress, or take a proficiency check when you want stronger proof of ability.')}
          </Text>
          <Text style={styles.pair}>
            {getLanguageDisplayName(nativeLanguage, t)} - {getLanguageDisplayName(targetLanguage, t)}
          </Text>
        </Card.Content>
      </Card>

      <Modal
        visible={namePromptOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setNamePromptOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <Card style={styles.nameModal}>
            <Card.Content style={styles.cardContent}>
              <Text style={styles.kicker}>{t('levelTests.certificateNameKicker', 'Certificate name')}</Text>
              <Text style={styles.sectionTitle}>{t('levelTests.fullNameRequiredTitle', 'Add your full name')}</Text>
              <Text style={styles.muted}>
                {t('levelTests.fullNameRequiredBody', 'Enter your full name exactly as it should appear on this certificate. You only need to do this before issuing a certificate.')}
              </Text>
              <TextInput
                label={t('levelTests.fullNameLabel', 'Full name')}
                value={certificateName}
                onChangeText={(text) => {
                  setCertificateName(text);
                  setCertificateNameError('');
                }}
                mode="outlined"
                autoCapitalize="words"
                autoComplete="name"
                placeholder={t('levelTests.fullNamePlaceholder', 'Your full name')}
              />
              {!!certificateNameError && <Text style={styles.nameError}>{certificateNameError}</Text>}
              <View style={styles.modalActions}>
                <Button mode="outlined" onPress={() => setNamePromptOpen(false)}>
                  {t('common.cancel', 'Cancel')}
                </Button>
                <Button mode="contained" onPress={submitCertificateName} loading={saving} disabled={saving}>
                  {t('levelTests.saveNameAndIssue', 'Save name and issue certificate')}
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
      </Modal>

      <View style={styles.shell}>
        <View style={styles.setup}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text style={styles.kicker}>{t('levelTests.context', 'Context')}</Text>
              <View style={styles.chipRow}>
                {contexts.map((context) => {
                  const key = context.contextType === 'institution' ? `institution:${context.organizationId}` : 'personal';
                  const active = key === selectedContextKey;
                  return (
                    <TouchableOpacity key={key} style={[styles.chip, active && styles.chipActive]} onPress={() => setSelectedContextKey(key)}>
                      <Text style={[styles.chipText, active && styles.chipTextActive]}>{contextLabel(t, context)}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {selectedContext?.contextType === 'institution' && (
                <Text style={styles.muted}>
                  {t('levelTests.allowedLanguages', 'Available target languages')}: {(allowedTargetLanguages || []).map((code: string) => getLanguageDisplayName(code, t)).join(', ')}
                </Text>
              )}
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text style={styles.kicker}>{t('levelTests.chooseLevel', 'Choose level')}</Text>
              <View style={styles.chipRow}>
                {LEVELS.map((level) => (
                  <TouchableOpacity key={level} style={[styles.chip, selectedLevel === level && styles.chipActive]} onPress={() => setSelectedLevel(level)}>
                    <Text style={[styles.chipText, selectedLevel === level && styles.chipTextActive]}>
                      {t('levelTests.levelLabel', 'Level {{level}}', { level })}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.kicker}>{t('levelTests.testType', 'Test type')}</Text>
              <View style={styles.modeGrid}>
                {MODES.map((mode) => (
                  <TouchableOpacity key={mode} style={[styles.modeCard, selectedMode === mode && styles.modeCardActive]} onPress={() => setSelectedMode(mode)}>
                    <Text style={[styles.modeTitle, selectedMode === mode && styles.chipTextActive]}>
                      {t(`levelTests.modes.${mode}.title`, mode)}
                    </Text>
                    <Text style={[styles.modeBody, selectedMode === mode && styles.chipTextActive]}>
                      {t(`levelTests.modes.${mode}.body`, mode === 'completion' ? 'For finishing a level.' : 'For stronger proof of ability.')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Button mode="contained" onPress={start} loading={saving} disabled={saving || restricted}>
                {restricted ? t('levelTests.restrictedTarget', 'This target language is not available in this institution context.') : t('levelTests.start', 'Start check')}
              </Button>
              {selectedMode === 'proficiency' && proficiencyEntitlement && (
                <Text style={styles.muted}>
                  {t('levelTests.proficiencyAllowance', '{{remaining}} of {{included}} included proficiency checks left this month. Extra checks are {{price}} each.', {
                    remaining: proficiencyEntitlement.remainingIncluded,
                    included: proficiencyEntitlement.included,
                    price: formatPrice(proficiencyEntitlement.paidPriceCents),
                  })}
                </Text>
              )}
            </Card.Content>
          </Card>
        </View>

        <Card style={styles.workspace}>
          <Card.Content style={styles.cardContent}>
            {!attempt ? (
              <View style={styles.empty}>
                <Text style={styles.sectionTitle}>{t('levelTests.emptyTitle', 'Choose a level check')}</Text>
                <Text style={styles.muted}>{t('levelTests.emptyBody', 'You will see a balanced set of vocabulary, grammar, reading, speaking, and writing tasks from the level you choose.')}</Text>
              </View>
            ) : (
              <>
                <View style={styles.workspaceHead}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.kicker}>
                      {`${String(t('levelTests.levelLabel', 'Level {{level}}', { level: attempt.level }))} - ${String(t(`levelTests.modes.${attempt.mode}.title`, attempt.mode))}`}
                    </Text>
                    <Text style={styles.sectionTitle}>{submitted ? t('levelTests.resultTitle', 'Your result') : t('levelTests.questionsTitle', 'Answer each task')}</Text>
                  </View>
                  <Button mode="outlined" onPress={start}>{t('common.restart', 'Restart')}</Button>
                </View>

                {submitted && (
                  <View style={[styles.result, attempt.passed && styles.resultPassed]}>
                    <Text style={styles.score}>{attempt.score}%</Text>
                    <Text style={styles.sectionTitle}>{attempt.passed ? t('levelTests.passed', 'Passed') : t('levelTests.reviewRecommended', 'Review recommended')}</Text>
                    {!!attempt.weakSkills?.length && (
                      <View style={styles.chipRow}>
                        {attempt.weakSkills.map((skill: string) => (
                          <Text key={skill} style={styles.skillPill}>{skillLabel(t, skill)}</Text>
                        ))}
                      </View>
                    )}
                    {attempt.passed && (
                      <Button mode="contained" onPress={() => issueCertificate()} disabled={saving || !!certificate}>
                        {certificate ? t('levelTests.certificateIssued', 'Certificate issued') : t('levelTests.issueCertificate', 'Issue certificate')}
                      </Button>
                    )}
                  </View>
                )}

                {(attempt.questions || []).map((question: any, index: number) => {
                  const answer = answers[question.questionId] || {};
                  const scoredAnswer = (attempt.answers || []).find((item: any) => item.questionId === question.questionId);
                  return (
                    <View key={question.questionId} style={styles.questionCard}>
                      <Text style={styles.questionNumber}>{index + 1}. {skillLabel(t, question.skill)}</Text>
                      <Text style={styles.muted}>{taskInstruction(t, question.taskType)}</Text>
                      <Text style={styles.stem}>
                        {question.taskType === 'choose_target' ? (question.nativeText || question.targetText) : question.targetText}
                      </Text>
                      {!!question.options?.length ? (
                        <View style={styles.optionGrid}>
                          {question.options.map((option: any) => {
                            const active = answer.selectedOptionId === option.optionId;
                            return (
                              <TouchableOpacity
                                key={option.optionId}
                                style={[styles.option, active && styles.chipActive]}
                                onPress={() => updateAnswer(question.questionId, { selectedOptionId: option.optionId })}
                                disabled={submitted}
                              >
                                <Text style={[styles.optionText, active && styles.chipTextActive]}>{option.text}</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      ) : (
                        <>
                          <TextInput
                            value={answer.text || ''}
                            onChangeText={(text) => updateAnswer(question.questionId, { text })}
                            placeholder={t('levelTests.writeAnswer', 'Write your answer here...')}
                            mode="outlined"
                            multiline
                            disabled={submitted}
                          />
                          {question.taskType === 'short_response' && (
                            <View style={styles.chipRow}>
                              {[
                                { value: 0.3, label: t('levelTests.selfNeedsWork', 'Needs work') },
                                { value: 0.7, label: t('levelTests.selfAlmost', 'Almost') },
                                { value: 1, label: t('levelTests.selfGood', 'Good') },
                              ].map((item) => (
                                <TouchableOpacity
                                  key={item.value}
                                  style={[styles.chip, answer.selfScore === item.value && styles.chipActive]}
                                  onPress={() => updateAnswer(question.questionId, { selfScore: item.value })}
                                  disabled={submitted}
                                >
                                  <Text style={[styles.chipText, answer.selfScore === item.value && styles.chipTextActive]}>{item.label}</Text>
                                </TouchableOpacity>
                              ))}
                            </View>
                          )}
                        </>
                      )}
                      {submitted && scoredAnswer && (
                        <Text style={[styles.correctness, scoredAnswer.correct && styles.correct]}>
                          {scoredAnswer.correct ? t('levelTests.correct', 'Correct') : t('levelTests.missed', 'Review this')}
                        </Text>
                      )}
                    </View>
                  );
                })}

                {!submitted && (
                  <Button mode="contained" onPress={submit} loading={saving} disabled={saving}>
                    {t('levelTests.submit', 'Submit check')}
                  </Button>
                )}
              </>
            )}
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const createStyles = (colors: AppColors, tablet: boolean) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: tablet ? 24 : 14,
    gap: 14,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  hero: {
    borderRadius: 20,
    backgroundColor: colors.surface,
    ...shadows.md,
  },
  card: {
    borderRadius: 16,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  cardContent: {
    gap: 12,
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textPrimary,
    fontSize: tablet ? 38 : 30,
    fontWeight: '900',
    lineHeight: tablet ? 44 : 36,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 21,
    fontWeight: '900',
  },
  muted: {
    color: colors.textSecondary,
    lineHeight: 21,
  },
  pair: {
    alignSelf: 'flex-start',
    color: colors.textSecondary,
    backgroundColor: colors.primary + '12',
    borderRadius: 999,
    overflow: 'hidden',
    paddingVertical: 7,
    paddingHorizontal: 10,
    fontWeight: '800',
  },
  shell: {
    gap: 14,
    flexDirection: tablet ? 'row' : 'column',
    alignItems: 'flex-start',
  },
  setup: {
    gap: 14,
    width: tablet ? 320 : '100%',
  },
  workspace: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 18,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  chipTextActive: {
    color: colors.surface,
  },
  modeGrid: {
    gap: 8,
  },
  modeCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.background,
    padding: 12,
    gap: 4,
  },
  modeCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  modeTitle: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  modeBody: {
    color: colors.textSecondary,
  },
  empty: {
    minHeight: 320,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  workspaceHead: {
    flexDirection: tablet ? 'row' : 'column',
    gap: 10,
    alignItems: tablet ? 'center' : 'stretch',
  },
  result: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.background,
    padding: 14,
    gap: 8,
  },
  resultPassed: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '12',
  },
  score: {
    color: colors.textPrimary,
    fontSize: 44,
    fontWeight: '900',
    lineHeight: 48,
  },
  skillPill: {
    color: colors.primary,
    backgroundColor: colors.primary + '14',
    borderRadius: 999,
    overflow: 'hidden',
    paddingVertical: 6,
    paddingHorizontal: 9,
    fontWeight: '800',
  },
  questionCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.background,
    padding: 13,
    gap: 10,
  },
  questionNumber: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  stem: {
    color: colors.textPrimary,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    lineHeight: 22,
    fontWeight: '800',
  },
  optionGrid: {
    gap: 8,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    padding: 12,
  },
  optionText: {
    color: colors.textPrimary,
    fontWeight: '800',
    lineHeight: 20,
  },
  correctness: {
    color: colors.error,
    fontWeight: '900',
  },
  correct: {
    color: colors.success,
  },
  modalBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: tablet ? 28 : 16,
    backgroundColor: 'rgba(11, 16, 38, 0.42)',
  },
  nameModal: {
    width: '100%',
    maxWidth: 520,
    borderRadius: 18,
    backgroundColor: colors.surface,
    ...shadows.md,
  },
  nameError: {
    color: colors.error,
    fontWeight: '800',
  },
  modalActions: {
    flexDirection: tablet ? 'row' : 'column',
    justifyContent: 'flex-end',
    gap: 10,
  },
});

export default LevelTestScreen;
