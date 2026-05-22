import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiAward, FiCheckCircle, FiDownload, FiPrinter } from 'react-icons/fi';
import { certificateService } from '../services/api';
import LANGUAGES, { getLanguageDisplayName, getLanguageOptionLabel } from '../config/languages';
import BrandLogo from '../components/BrandLogo';
import { isRtlLanguage, normalizeLanguageCode } from '../utils/languagePairPolicy';
import './CertificateVerifyPage.css';

const CERTIFICATE_LANGUAGE_CODES = Object.keys(LANGUAGES);

function formatDate(value, locale) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale || undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function certificateTitle(certificate, t) {
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
}

function certificateTone(certificate) {
  if (String(certificate?.certificateType || '').includes('proficiency')) return 'proficiency';
  return 'completion';
}

function certificateVerifiedLabel(certificate, t) {
  if (certificateTone(certificate) === 'proficiency') {
    return t('certificates.verifiedProficiency', 'Verified proficiency certificate');
  }
  return t('certificates.verifiedCompletion', 'Verified completion certificate');
}

function certificateStatement(certificate, t) {
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
}

function organizationInitials(name) {
  return String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'LB';
}

function safeCertificateFilename(certificate, fallbackId) {
  const base = [
    'lingo-booth-certificate',
    certificate?.certificateId || fallbackId,
    certificate?.userName,
  ]
    .filter(Boolean)
    .join('-');
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90) || 'lingo-booth-certificate';
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function filenameFromDisposition(contentDisposition) {
  const value = String(contentDisposition || '');
  const utfMatch = value.match(/filename\*=UTF-8''([^;]+)/i);
  if (utfMatch?.[1]) return decodeURIComponent(utfMatch[1]);
  const match = value.match(/filename="?([^"]+)"?/i);
  return match?.[1] || '';
}

function CertificateVerifyPage({ certificateIdOverride = '' }) {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const certificateId = certificateIdOverride || params.certificateId || searchParams.get('certificateId') || '';
  const requestedCertificateLanguage = normalizeLanguageCode(searchParams.get('certLang') || searchParams.get('language')) || '';
  const [state, setState] = useState({ loading: true, valid: false, certificate: null, message: '' });
  const [isDownloading, setIsDownloading] = useState(false);
  const [certificateLanguage, setCertificateLanguage] = useState(() => requestedCertificateLanguage || normalizeLanguageCode(i18n.language) || 'en');

  useEffect(() => {
    let cancelled = false;
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
  useEffect(() => {
    if (!certificate) return;
    const preferredLanguage = requestedCertificateLanguage
      || normalizeLanguageCode(certificate.nativeLanguage)
      || normalizeLanguageCode(i18n.language)
      || 'en';
    setCertificateLanguage(preferredLanguage);
  }, [certificate?.certificateId, certificate, i18n.language, requestedCertificateLanguage]);

  const isInstitutionCertificate = certificate?.contextType === 'institution' || String(certificate?.certificateType || '').startsWith('institution');
  const tone = certificateTone(certificate);
  const primaryCertificateLanguage = normalizeLanguageCode(certificateLanguage)
    || normalizeLanguageCode(certificate?.nativeLanguage)
    || normalizeLanguageCode(i18n.language)
    || 'en';
  const certT = useMemo(
    () => i18n.getFixedT(primaryCertificateLanguage),
    [i18n, primaryCertificateLanguage],
  );
  const certificateDirection = isRtlLanguage(primaryCertificateLanguage) ? 'rtl' : 'ltr';
  const certificateLanguageOptions = CERTIFICATE_LANGUAGE_CODES.map((code) => ({
    value: code,
    label: getLanguageOptionLabel(code, t),
  }));

  const handleDownload = async () => {
    if (!certificate) return;
    setIsDownloading(true);
    try {
      const response = await certificateService.download(certificateId, primaryCertificateLanguage);
      const filename = filenameFromDisposition(response.headers?.['content-disposition'])
        || `${safeCertificateFilename(certificate, certificateId)}.pdf`;
      downloadBlob(response.data, filename);
    } catch (error) {
      console.error('Certificate download failed:', error);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="certificate-page">
      {state.valid && certificate ? (
        <div className={`certificate-actions certificate-actions--${tone}`} aria-label={t('certificates.actions', 'Certificate actions')}>
          <label className="certificate-language-control">
            <span>{t('certificates.languageControl', 'Certificate language')}</span>
            <select
              value={primaryCertificateLanguage}
              onChange={(event) => setCertificateLanguage(normalizeLanguageCode(event.target.value) || 'en')}
            >
              {certificateLanguageOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <button type="button" className="certificate-action-button certificate-action-button--secondary" onClick={() => window.print()}>
            <FiPrinter /> {t('certificates.print', 'Print')}
          </button>
          <button
            type="button"
            className="certificate-action-button certificate-action-button--primary"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <FiDownload /> {isDownloading ? t('certificates.downloading', 'Preparing...') : t('certificates.download', 'Download')}
          </button>
        </div>
      ) : null}

      <section
        className={`certificate-card certificate-card--${tone}`}
        aria-label={t('certificates.verifyTitle', 'Verify certificate')}
        lang={primaryCertificateLanguage}
        dir={certificateDirection}
      >
        {state.loading ? (
          <p className="certificate-loading">{t('certificates.verifying', 'Verifying certificate...')}</p>
        ) : state.valid && certificate ? (
          <>
            <div className="certificate-topline">
              <BrandLogo variant="lockup" className="certificate-brand" decorative={false} />
              <span className="certificate-id-chip">{certificate.certificateId}</span>
            </div>

            {isInstitutionCertificate && (
              <div className="certificate-institution-strip">
                <div className="certificate-institution-logo">
                  {certificate.organizationLogoUrl ? (
                    <img
                      src={certificate.organizationLogoUrl}
                      alt={t('certificates.institutionLogoAlt', '{{organization}} logo', { organization: certificate.organizationName })}
                    />
                  ) : (
                    <span>{organizationInitials(certificate.organizationName)}</span>
                  )}
                </div>
                <div>
                  <span>{certT('certificates.certificateIssuedThrough', 'Certificate issued through')}</span>
                  <strong>{certificate.organizationName || certT('certificates.institution', 'Institution')}</strong>
                </div>
              </div>
            )}

            {!isInstitutionCertificate ? (
              <>
                <div className="certificate-seal">
                  <FiAward />
                </div>
                <p className="certificate-kicker">{certT('certificates.kicker', 'Certificate')}</p>
              </>
            ) : null}
            <h1>{certificateTitle(certificate, certT)}</h1>
            <p className="certificate-valid">
              <FiCheckCircle /> {certificateVerifiedLabel(certificate, certT)}
            </p>

            <div className="certificate-learner">
              <span>{certT('certificates.presentedTo', 'Presented to')}</span>
              <strong>{certificate.userName}</strong>
            </div>

            <p className="certificate-statement">
              {certificateStatement(certificate, certT)}
            </p>

            <div className="certificate-meta-grid">
              <div>
                <span>{certT('certificates.languagePair', 'Language pair')}</span>
                <strong>{getLanguageDisplayName(certificate.nativeLanguage, certT)} -> {getLanguageDisplayName(certificate.targetLanguage, certT)}</strong>
              </div>
              <div>
                <span>{certT('certificates.completedItems', 'Completed items')}</span>
                <strong>{certificate.completedItemCount}/{certificate.totalItemCount}</strong>
              </div>
              {certificate.level ? (
                <div>
                  <span>{certT('certificates.level', 'Level')}</span>
                  <strong>{certT('certificates.levelNumber', 'Level {{level}}', { level: certificate.level })}</strong>
                </div>
              ) : null}
              {certificate.score !== null && certificate.score !== undefined ? (
                <div>
                  <span>{certT('certificates.score', 'Score')}</span>
                  <strong>{certificate.score}%</strong>
                </div>
              ) : null}
              <div>
                <span>{certT('certificates.issuedOn', 'Issued on')}</span>
                <strong>{formatDate(certificate.issuedAt, primaryCertificateLanguage)}</strong>
              </div>
            </div>
          </>
        ) : (
          <div className="certificate-invalid">
            <p className="certificate-kicker">{t('certificates.kicker', 'Certificate')}</p>
            <h1>{t('certificates.invalidTitle', 'Certificate not found')}</h1>
            <p>{state.message || t('certificates.invalidBody', 'We could not find an active certificate with this ID.')}</p>
          </div>
        )}
      </section>

    </main>
  );
}

export default CertificateVerifyPage;
