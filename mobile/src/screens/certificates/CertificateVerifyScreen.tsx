import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, Linking, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { certificateService } from '../../services/api';
import LANGUAGES, { getLanguageDisplayName, getLanguageOptionLabel } from '../../config/languages';
import { useAppColors, type AppColors } from '../../config/theme';
import BrandLogo from '../../components/BrandLogo';
import { normalizeLanguageCode } from '../../utils/languagePairPolicy';

type CertificateState = {
  loading: boolean;
  valid: boolean;
  certificate: any;
  message: string;
};

const formatDate = (value?: string, locale?: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale || undefined);
};

const certificateTitle = (certificate: any, t: any) => {
  switch (certificate?.certificateType) {
    case 'level_proficiency':
    case 'institution_proficiency':
      return t('certificates.proficiencyTitle', 'Proficiency Certificate');
    case 'level_completion':
    case 'institution_completion':
      return t('certificates.levelCompletionTitle', 'Level Completion Certificate');
    default:
      return t('certificates.completionTitle', 'Completion Certificate');
  }
};

const certificateTone = (certificate: any) => {
  if (String(certificate?.certificateType || '').includes('proficiency')) return 'proficiency';
  return 'completion';
};

const certificateVerifiedLabel = (certificate: any, t: any) => (
  certificateTone(certificate) === 'proficiency'
    ? t('certificates.verifiedProficiency', 'Verified proficiency certificate')
    : t('certificates.verifiedCompletion', 'Verified completion certificate')
);

const certificateStatement = (certificate: any, t: any) => {
  if (certificate?.classLessonTitle) {
    return t('certificates.statement', 'Completed {{lesson}}', { lesson: certificate.classLessonTitle });
  }
  if (certificate?.level && certificateTone(certificate) === 'proficiency') {
    return t('certificates.proficiencyStatement', 'Demonstrated proficiency for Level {{level}}', { level: certificate.level });
  }
  if (certificate?.level) {
    return t('certificates.levelCompletionStatement', 'Completed Level {{level}}', { level: certificate.level });
  }
  return t('certificates.completionStatement', 'Completed the required learning activity');
};

const organizationInitials = (name?: string) => (
  String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'LB'
);

const PUBLIC_WEB_URL = 'https://lingobooth.com';
const CERTIFICATE_LANGUAGE_CODES = Object.keys(LANGUAGES);

const CertificateVerifyScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const colors = useAppColors();
  const certificateId = String(route.params?.certificateId || '').trim();
  const [state, setState] = useState<CertificateState>({
    loading: true,
    valid: false,
    certificate: null,
    message: '',
  });
  const certificate = state.certificate;
  const tone = certificateTone(certificate);
  const styles = useMemo(() => createStyles(colors, tone), [colors, tone]);
  const [certificateLanguage, setCertificateLanguage] = useState<string>(() => normalizeLanguageCode(i18n.language) || 'en');

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

  const isInstitutionCertificate = certificate?.contextType === 'institution'
    || String(certificate?.certificateType || '').startsWith('institution');
  useEffect(() => {
    if (!certificate) return;
    setCertificateLanguage(normalizeLanguageCode(certificate.nativeLanguage) || normalizeLanguageCode(i18n.language) || 'en');
  }, [certificate, i18n.language]);

  const primaryCertificateLanguage = normalizeLanguageCode(certificateLanguage)
    || normalizeLanguageCode(certificate?.nativeLanguage)
    || normalizeLanguageCode(i18n.language)
    || 'en';
  const certT = useMemo(
    () => i18n.getFixedT(primaryCertificateLanguage),
    [i18n, primaryCertificateLanguage],
  );
  const certificateLanguageOptions = CERTIFICATE_LANGUAGE_CODES.map((code) => ({
    value: code,
    label: getLanguageOptionLabel(code, t),
  }));
  const openWebCertificate = () => {
    if (!certificateId) return;
    Linking.openURL(`${PUBLIC_WEB_URL}/certificates/verify/${encodeURIComponent(certificateId)}?certLang=${encodeURIComponent(primaryCertificateLanguage)}`);
  };

  const openCertificateDownload = () => {
    if (!certificateId) return;
    Linking.openURL(certificateService.downloadUrl(certificateId, primaryCertificateLanguage));
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
    >
      <Button mode="text" icon="arrow-left" onPress={() => navigation.navigate('Login')} style={styles.backButton}>
        {t('common.back', 'Back')}
      </Button>

      {state.valid && certificate ? (
        <View style={styles.languagePanel}>
          <Text style={styles.panelLabel}>{t('certificates.languageControl', 'Certificate language')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.languageButtons}
          >
            {certificateLanguageOptions.map((option) => (
              <Button
                key={option.value}
                mode={primaryCertificateLanguage === option.value ? 'contained' : 'outlined'}
                compact
                onPress={() => setCertificateLanguage(option.value)}
                style={styles.languageButton}
              >
                {option.label}
              </Button>
            ))}
          </ScrollView>
        </View>
      ) : null}

      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          {state.loading ? (
            <>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.muted}>{t('certificates.verifying', 'Verifying certificate...')}</Text>
            </>
          ) : state.valid && certificate ? (
            <>
              <View style={styles.topline}>
                <BrandLogo variant="lockup" markSize={42} wordmarkWidth={136} style={styles.brandLogo} />
                <Text style={styles.idChip}>{certificate.certificateId}</Text>
              </View>

              {isInstitutionCertificate && (
                <View style={styles.institutionStrip}>
                  <View style={styles.institutionLogo}>
                    {certificate.organizationLogoUrl ? (
                      <Image
                        source={{ uri: certificate.organizationLogoUrl }}
                        style={styles.institutionLogoImage}
                        resizeMode="contain"
                        accessibilityLabel={t('certificates.institutionLogoAlt', '{{organization}} logo', { organization: certificate.organizationName })}
                      />
                    ) : (
                      <Text style={styles.institutionLogoText}>{organizationInitials(certificate.organizationName)}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.label}>{certT('certificates.certificateIssuedThrough', 'Certificate issued through')}</Text>
                    <Text style={styles.institutionName}>{certificate.organizationName || certT('certificates.institution', 'Institution')}</Text>
                  </View>
                </View>
              )}

              {!isInstitutionCertificate ? (
                <>
                  <View style={styles.seal}>
                    <Text style={styles.sealText}>LB</Text>
                  </View>
                  <Text style={styles.kicker}>{certT('certificates.kicker', 'Certificate')}</Text>
                </>
              ) : null}
              <Text variant="headlineSmall" style={styles.title}>{certificateTitle(certificate, certT)}</Text>
              <Text style={styles.valid}>{certificateVerifiedLabel(certificate, certT)}</Text>

              <View style={styles.heroBlock}>
                <Text style={styles.label}>{certT('certificates.presentedTo', 'Presented to')}</Text>
                <Text style={styles.heroValue}>{certificate.userName}</Text>
              </View>

              <Text style={styles.statement}>
                {certificateStatement(certificate, certT)}
              </Text>

              <View style={styles.metaGrid}>
                <View style={styles.metaCard}>
                  <Text style={styles.label}>{certT('certificates.languagePair', 'Language pair')}</Text>
                  <Text style={styles.value}>
                    {getLanguageDisplayName(certificate.nativeLanguage, certT)} - {getLanguageDisplayName(certificate.targetLanguage, certT)}
                  </Text>
                </View>
                <View style={styles.metaCard}>
                  <Text style={styles.label}>{certT('certificates.completedItems', 'Completed items')}</Text>
                  <Text style={styles.value}>{certificate.completedItemCount}/{certificate.totalItemCount}</Text>
                </View>
                {!!certificate.level && (
                  <View style={styles.metaCard}>
                    <Text style={styles.label}>{certT('certificates.level', 'Level')}</Text>
                    <Text style={styles.value}>{certT('certificates.levelNumber', 'Level {{level}}', { level: certificate.level })}</Text>
                  </View>
                )}
                {certificate.score !== null && certificate.score !== undefined && (
                  <View style={styles.metaCard}>
                    <Text style={styles.label}>{certT('certificates.score', 'Score')}</Text>
                    <Text style={styles.value}>{certificate.score}%</Text>
                  </View>
                )}
                <View style={styles.metaCard}>
                  <Text style={styles.label}>{certT('certificates.issuedOn', 'Issued on')}</Text>
                  <Text style={styles.value}>{formatDate(certificate.issuedAt, primaryCertificateLanguage)}</Text>
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

      {state.valid && certificate ? (
        <View style={styles.actions}>
          <Button mode="outlined" icon="printer" onPress={openWebCertificate} style={styles.actionButton}>
            {t('certificates.print', 'Print')}
          </Button>
          <Button mode="contained" icon="download" onPress={openCertificateDownload} style={styles.actionButton}>
            {t('certificates.download', 'Download')}
          </Button>
        </View>
      ) : null}
    </ScrollView>
  );
};

const createStyles = (colors: AppColors, tone: string) => {
  const isProficiency = tone === 'proficiency';
  const certificateDeep = isProficiency ? '#2f7d00' : '#c94920';
  const certificateSoft = isProficiency ? 'rgba(88,204,2,0.12)' : 'rgba(255,107,53,0.1)';
  const certificateBorder = isProficiency ? 'rgba(88,204,2,0.38)' : 'rgba(255,107,53,0.35)';

  return StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 32,
    gap: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 10,
  },
  languagePanel: {
    gap: 8,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  panelLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '900',
  },
  languageButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageButton: {
    flexGrow: 1,
    borderRadius: 10,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: certificateBorder,
  },
  content: {
    gap: 16,
    alignItems: 'center',
  },
  topline: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  brandLogo: {
    alignItems: 'flex-start',
  },
  idChip: {
    flexShrink: 1,
    color: colors.textSecondary,
    backgroundColor: colors.background,
    borderRadius: 999,
    overflow: 'hidden',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 11,
    fontWeight: '900',
  },
  institutionStrip: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: certificateBorder,
    backgroundColor: colors.background,
  },
  institutionLogo: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: certificateBorder,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  institutionLogoImage: {
    width: 48,
    height: 48,
  },
  institutionLogoText: {
    color: certificateDeep,
    fontWeight: '900',
  },
  institutionName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '900',
  },
  seal: {
    width: 68,
    height: 68,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: certificateBorder,
    backgroundColor: certificateSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sealText: {
    color: certificateDeep,
    fontSize: 30,
    fontWeight: '900',
  },
  kicker: {
    color: certificateDeep,
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
    color: certificateDeep,
    backgroundColor: certificateSoft,
    borderRadius: 999,
    overflow: 'hidden',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontWeight: '700',
    textAlign: 'center',
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
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  value: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
});
};

export default CertificateVerifyScreen;
