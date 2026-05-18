import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { certificateService } from '../../services/api';
import { getLanguageDisplayName } from '../../config/languages';
import { useAppColors, type AppColors } from '../../config/theme';

type CertificateState = {
  loading: boolean;
  valid: boolean;
  certificate: any;
  message: string;
};

const formatDate = (value?: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString();
};

const CertificateVerifyScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const certificateId = String(route.params?.certificateId || '').trim();
  const [state, setState] = useState<CertificateState>({
    loading: true,
    valid: false,
    certificate: null,
    message: '',
  });

  useEffect(() => {
    let cancelled = false;
    if (!certificateId) {
      setState({
        loading: false,
        valid: false,
        certificate: null,
        message: t('certificates.invalidBody', 'We could not find an active certificate with this ID.'),
      });
      return undefined;
    }

    certificateService.verify(certificateId)
      .then((res) => {
        if (cancelled) return;
        setState({
          loading: false,
          valid: !!res.data?.valid,
          certificate: res.data?.certificate || null,
          message: res.data?.message || '',
        });
      })
      .catch((error) => {
        if (cancelled) return;
        setState({
          loading: false,
          valid: false,
          certificate: null,
          message: error.response?.data?.message || t('certificates.verifyFailed', 'Could not verify this certificate.'),
        });
      });

    return () => {
      cancelled = true;
    };
  }, [certificateId, t]);

  const certificate = state.certificate;

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 20 }]}>
      <Button mode="text" icon="arrow-left" onPress={() => navigation.navigate('Login')} style={styles.backButton}>
        {t('common.back', 'Back')}
      </Button>

      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          {state.loading ? (
            <>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.muted}>{t('certificates.verifying', 'Verifying certificate...')}</Text>
            </>
          ) : state.valid && certificate ? (
            <>
              <Text style={styles.kicker}>{t('certificates.kicker', 'Certificate')}</Text>
              <Text variant="headlineSmall" style={styles.title}>{t('certificates.completionTitle', 'Completion Certificate')}</Text>
              <Text style={styles.valid}>{t('certificates.verified', 'Verified completion certificate')}</Text>

              <View style={styles.heroBlock}>
                <Text style={styles.label}>{t('certificates.presentedTo', 'Presented to')}</Text>
                <Text style={styles.heroValue}>{certificate.userName}</Text>
              </View>

              <Text style={styles.statement}>
                {t('certificates.statement', {
                  lesson: certificate.classLessonTitle,
                  defaultValue: 'Completed {{lesson}}',
                })}
              </Text>

              <View style={styles.metaGrid}>
                <View style={styles.metaCard}>
                  <Text style={styles.label}>{t('certificates.languagePair', 'Language pair')}</Text>
                  <Text style={styles.value}>
                    {getLanguageDisplayName(certificate.nativeLanguage, t)} → {getLanguageDisplayName(certificate.targetLanguage, t)}
                  </Text>
                </View>
                <View style={styles.metaCard}>
                  <Text style={styles.label}>{t('certificates.completedItems', 'Completed items')}</Text>
                  <Text style={styles.value}>{certificate.completedItemCount}/{certificate.totalItemCount}</Text>
                </View>
                <View style={styles.metaCard}>
                  <Text style={styles.label}>{t('certificates.issuedOn', 'Issued on')}</Text>
                  <Text style={styles.value}>{formatDate(certificate.issuedAt)}</Text>
                </View>
                <View style={styles.metaCard}>
                  <Text style={styles.label}>{t('certificates.certificateId', 'Certificate ID')}</Text>
                  <Text style={styles.value}>{certificate.certificateId}</Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.kicker}>{t('certificates.kicker', 'Certificate')}</Text>
              <Text variant="headlineSmall" style={styles.title}>{t('certificates.invalidTitle', 'Certificate not found')}</Text>
              <Text style={styles.muted}>{state.message || t('certificates.invalidBody', 'We could not find an active certificate with this ID.')}</Text>
            </>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 18,
    gap: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
  },
  content: {
    gap: 16,
    alignItems: 'center',
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textPrimary,
    fontWeight: '900',
    textAlign: 'center',
  },
  valid: {
    color: colors.primary,
    fontWeight: '700',
  },
  muted: {
    color: colors.textSecondary,
    lineHeight: 21,
    textAlign: 'center',
  },
  heroBlock: {
    alignItems: 'center',
    gap: 4,
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  heroValue: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  statement: {
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
  },
  metaGrid: {
    width: '100%',
    gap: 10,
  },
  metaCard: {
    gap: 4,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
  },
  value: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
});

export default CertificateVerifyScreen;
