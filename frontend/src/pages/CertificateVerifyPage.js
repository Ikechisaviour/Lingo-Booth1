import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiAward, FiCheckCircle, FiPrinter } from 'react-icons/fi';
import { certificateService } from '../services/api';
import LANGUAGES from '../config/languages';
import './CertificateVerifyPage.css';

function languageName(code) {
  const normalized = String(code || '').toLowerCase();
  return LANGUAGES[normalized]?.name || normalized.toUpperCase();
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function CertificateVerifyPage() {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [state, setState] = useState({ loading: true, valid: false, certificate: null, message: '' });

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
          message: error.response?.data?.message || t('certificates.verifyFailed'),
        });
      });
    return () => {
      cancelled = true;
    };
  }, [certificateId, t]);

  const certificate = state.certificate;

  return (
    <main className="certificate-page">
      <button type="button" className="certificate-back" onClick={() => navigate('/')}>
        {t('common.back', 'Back')}
      </button>

      <section className="certificate-card" aria-label={t('certificates.verifyTitle')}>
        {state.loading ? (
          <p className="certificate-loading">{t('certificates.verifying')}</p>
        ) : state.valid && certificate ? (
          <>
            <div className="certificate-seal">
              <FiAward />
            </div>
            <p className="certificate-kicker">{t('certificates.kicker')}</p>
            <h1>{t('certificates.completionTitle')}</h1>
            <p className="certificate-valid">
              <FiCheckCircle /> {t('certificates.verified')}
            </p>

            <div className="certificate-learner">
              <span>{t('certificates.presentedTo')}</span>
              <strong>{certificate.userName}</strong>
            </div>

            <p className="certificate-statement">
              {t('certificates.statement', {
                lesson: certificate.classLessonTitle,
                defaultValue: 'Completed {{lesson}}',
              })}
            </p>

            <div className="certificate-meta-grid">
              <div>
                <span>{t('certificates.languagePair')}</span>
                <strong>{languageName(certificate.nativeLanguage)} -> {languageName(certificate.targetLanguage)}</strong>
              </div>
              <div>
                <span>{t('certificates.completedItems')}</span>
                <strong>{certificate.completedItemCount}/{certificate.totalItemCount}</strong>
              </div>
              <div>
                <span>{t('certificates.issuedOn')}</span>
                <strong>{formatDate(certificate.issuedAt)}</strong>
              </div>
              <div>
                <span>{t('certificates.certificateId')}</span>
                <strong>{certificate.certificateId}</strong>
              </div>
            </div>

            <button type="button" className="certificate-print" onClick={() => window.print()}>
              <FiPrinter /> {t('certificates.print')}
            </button>
          </>
        ) : (
          <div className="certificate-invalid">
            <p className="certificate-kicker">{t('certificates.kicker')}</p>
            <h1>{t('certificates.invalidTitle')}</h1>
            <p>{state.message || t('certificates.invalidBody')}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default CertificateVerifyPage;
