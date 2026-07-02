import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { billingService, certificateService, classLessonService, learningHubService, reviewService, userService, progressService } from '../services/api';
import speechService from '../services/speechService';
import LANGUAGES, {
  getNativeLangCode,
  getLanguageDisplayName,
  getLanguageOptionLabel,
  getTargetLangCode,
} from '../config/languages';
import { normalizeLanguageCode } from '../utils/languagePairPolicy';
import { formatVoiceOptions } from '../utils/voiceDisplay';
import { hydrateCurriculumPreferences } from '../hooks/useCurriculumVersion';
import './ProfilePage.css';

const profileTabs = ['profile', 'settings', 'account'];

function resolveProfileTab(profileTab, search) {
  if (profileTabs.includes(profileTab)) return profileTab;
  const params = new URLSearchParams(search);
  const queryTab = params.get('tab');
  return profileTabs.includes(queryTab) ? queryTab : 'profile';
}

function isProOrUltraTier(tier) {
  return ['pro', 'ultra'].includes(String(tier || '').toLowerCase());
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function getMembershipOrganization(membership) {
  const organization = membership?.organizationId;
  return organization && typeof organization === 'object' ? organization : null;
}

function effectiveSubscriptionTier(user) {
  if (user?.role === 'admin') return 'pro';
  return user?.aiEntitlements?.subscriptionTier
    || user?.subscriptionTier
    || localStorage.getItem('subscriptionTier')
    || 'plus';
}

function ProfilePage({ onLogout }) {
  const { t, i18n } = useTranslation();
  const profileLanguageOptionLabel = (code) => getLanguageOptionLabel(
    code,
    null,
    t(`languages.${code}`, LANGUAGES[code]?.name || code)
  );
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [learningHub, setLearningHub] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [billingAccount, setBillingAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const { profileTab } = useParams();
  const [activeTab, setActiveTab] = useState(() => {
    return resolveProfileTab(profileTab, location.search);
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ username: '', fullName: '' });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saveMessage, setSaveMessage] = useState('');
  const [storyForm, setStoryForm] = useState({ comment: '', company: '' });
  const [storySubmitting, setStorySubmitting] = useState(false);
  const [targetVoices, setTargetVoices] = useState([]);
  const [nativeVoices, setNativeVoices] = useState([]);
  const [selectedTargetVoice, setSelectedTargetVoice] = useState(speechService.getSelectedVoiceName(getTargetLangCode()) || '');
  const [selectedNativeVoice, setSelectedNativeVoice] = useState(speechService.getSelectedVoiceName(getNativeLangCode()) || '');
  const [xpDecayEnabled, setXpDecayEnabled] = useState(false);
  const [showModeConfirm, setShowModeConfirm] = useState(null); // 'enable' or 'disable'
  const [modeLoading, setModeLoading] = useState(false);
  const [switchingAccess, setSwitchingAccess] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (profileTab && !profileTabs.includes(profileTab)) {
      setActiveTab('profile');
      navigate('/profile', { replace: true });
      return;
    }
    const tab = resolveProfileTab(profileTab, location.search);
    setActiveTab(tab);
    if (location.search) {
      navigate(tab === 'profile' ? '/profile' : `/profile/${tab}`, { replace: true });
    }
  }, [profileTab, location.search, navigate]);

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(tab === 'profile' ? '/profile' : `/profile/${tab}`);
  };

  // Load available voices for both languages from Edge TTS
  useEffect(() => {
    const loadVoices = async () => {
      const [targetList, nativeList] = await Promise.all([
        speechService.getVoicesForLang(getTargetLangCode()),
        speechService.getVoicesForLang(getNativeLangCode()),
      ]);
      setTargetVoices(targetList);
      setNativeVoices(nativeList);
    };
    loadVoices();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [userResponse, progressResponse, learningHubResponse, certificateResponse, billingResponse] = await Promise.all([
        userService.getProfile(userId),
        progressService.getSummary(userId),
        learningHubService.getOverview().catch(() => ({ data: null })),
        certificateService.list().catch(() => ({ data: [] })),
        billingService.getAccount().catch(() => ({ data: null })),
      ]);
      setUser(userResponse.data);
      setProgress(progressResponse.data);
      setLearningHub(learningHubResponse.data);
      setCertificates(asArray(certificateResponse.data?.certificates));
      setBillingAccount(billingResponse.data || null);
      setEditData({ username: userResponse.data.username, fullName: userResponse.data.fullName || '' });
      localStorage.setItem('userFullName', userResponse.data.fullName || '');
      const effectiveTier = userResponse.data.role === 'admin'
        ? 'pro'
        : userResponse.data.subscriptionTier;
      if (effectiveTier) {
        localStorage.setItem('subscriptionTier', effectiveTier);
      }
      if (userResponse.data.preferredVoices && typeof userResponse.data.preferredVoices === 'object') {
        localStorage.setItem('preferredVoices', JSON.stringify(userResponse.data.preferredVoices));
        Object.entries(userResponse.data.preferredVoices).forEach(([language, voice]) => {
          if (voice) localStorage.setItem(`preferredVoice:${language}`, voice);
        });
        setSelectedTargetVoice(userResponse.data.preferredVoices[getTargetLangCode()] || userResponse.data.preferredVoice || '');
        setSelectedNativeVoice(userResponse.data.preferredVoices[getNativeLangCode()] || '');
      }
      if (userResponse.data.aiEntitlements) {
        const effectiveEntitlements = userResponse.data.role === 'admin'
          ? {
            ...userResponse.data.aiEntitlements,
            subscriptionTier: 'pro',
            canUseAI: true,
            canSyncAIMemory: true,
            canUsePracticeContext: true,
            aiMemoryScope: 'cloud',
          }
          : userResponse.data.aiEntitlements;
        localStorage.setItem('aiEntitlements', JSON.stringify(effectiveEntitlements));
      }
      const isChallenge = !!userResponse.data.xpDecayEnabled;
      setXpDecayEnabled(isChallenge);
      // Sync localStorage & App theme in case session predates the login fix
      if (localStorage.getItem('xpDecayEnabled') !== String(isChallenge)) {
        localStorage.setItem('xpDecayEnabled', String(isChallenge));
        window.dispatchEvent(new CustomEvent('xpModeChanged', { detail: { enabled: isChallenge } }));
      }
      setError('');
    } catch (err) {
      setError(t('profilePage.failedToLoad'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      await userService.updateProfile(userId, editData);
      localStorage.setItem('username', editData.username);
      localStorage.setItem('userFullName', editData.fullName || '');
      setUser({ ...user, username: editData.username, fullName: editData.fullName || '' });
      setIsEditing(false);
      setSaveMessage(t('profilePage.profileUpdated'));
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      setError(
        err.response?.data?.code === 'FULL_NAME_INVALID'
          ? t('levelTests.fullNameInvalid', 'Enter at least two characters for your full name.')
          : err.response?.data?.message || t('profilePage.failedToLoad')
      );
    }
  };

  const updateStoryField = (field) => (event) => {
    const { value } = event.target;
    setStoryForm((current) => ({ ...current, [field]: value }));
  };

  const submitStory = async (event) => {
    event.preventDefault();
    if (storySubmitting) return;
    const comment = storyForm.comment.trim();
    if (!comment) {
      setError(t('profilePage.storyCommentRequired', 'Write a short story before submitting.'));
      return;
    }
    setStorySubmitting(true);
    setError('');
    try {
      await reviewService.submit({
        name: user?.fullName || user?.username || editData.fullName || editData.username || t('profilePage.storyFallbackName', 'Lingo Booth learner'),
        targetLanguage: getTargetLangCode(),
        comment,
        company: storyForm.company,
        page: 'profile',
        source: 'web',
      });
      setStoryForm({ comment: '', company: '' });
      setSaveMessage(t('profilePage.storySubmitted', 'Thank you. Your story was sent and will appear after review.'));
      setTimeout(() => setSaveMessage(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || t('profilePage.storySubmitFailed', 'Could not send your story. Please try again.'));
    } finally {
      setStorySubmitting(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError(t('profilePage.passwordsNoMatch'));
      return;
    }
    try {
      const payload = { newPassword: passwordData.newPassword };
      if (user?.hasPassword) payload.currentPassword = passwordData.currentPassword;
      await userService.changePassword(userId, payload);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSaveMessage(t('profilePage.passwordChanged'));
      setTimeout(() => setSaveMessage(''), 3000);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || t('profilePage.failedToLoad'));
    }
  };

  const handleVoiceChange = async (languageCode, voiceName) => {
    const code = languageCode || getTargetLangCode();
    if (code === getTargetLangCode()) setSelectedTargetVoice(voiceName);
    if (code === getNativeLangCode()) setSelectedNativeVoice(voiceName);
    speechService.setVoice(voiceName, code);
    speechService.speak(LANGUAGES[code]?.hello || 'Hello', {
      lang: LANGUAGES[code]?.ttsLocale,
      voice: voiceName || undefined,
    });

    try {
      const preferredVoices = {
        ...speechService.getVoiceMap(),
        [code]: voiceName || null,
      };
      const payload = {
        preferredVoices,
        ...(code === getTargetLangCode() ? { preferredVoice: voiceName || null } : {}),
      };
      await userService.updateProfile(userId, payload);
      setSaveMessage(t('profilePage.voiceUpdated'));
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      console.error('Failed to save voice preference:', err);
    }
  };

  const renderVoiceSelector = ({
    title,
    languageCode,
    languageName,
    voices,
    selectedVoice,
  }) => {
    const displayVoices = formatVoiceOptions(voices, {
      languageCode,
      t,
      uiLanguage: i18n.resolvedLanguage || i18n.language,
    });
    return (
    <div className="voice-language-group">
      <div className="voice-language-header">
        <h3>{title}</h3>
        <span>{LANGUAGES[languageCode]?.flag} {languageName}</span>
      </div>
      {voices.length === 0 ? (
        <p className="voice-no-voices">
          {t('profilePage.noVoices', { language: languageName })}
        </p>
      ) : (
        <div className="voice-selector">
          <div
            className={`voice-option ${!selectedVoice ? 'voice-option-selected' : ''}`}
            onClick={() => handleVoiceChange(languageCode, '')}
          >
            <div className="voice-option-info">
              <span className="voice-option-name">{t('profilePage.defaultVoice', 'Default Voice')}</span>
              <span className="voice-option-lang">{t('profilePage.systemDefault', 'System default')}</span>
            </div>
            {!selectedVoice && <span className="voice-check">&#10003;</span>}
          </div>
          {displayVoices.map(({ name, display }) => (
            <div
              key={name}
              className={`voice-option ${selectedVoice === name ? 'voice-option-selected' : ''}`}
              onClick={() => handleVoiceChange(languageCode, name)}
            >
              <div className="voice-option-info">
                <span className="voice-option-name">{display.primary}</span>
                <span className="voice-option-lang">{display.secondary}</span>
              </div>
              <button
                className="voice-preview-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  speechService.speak(LANGUAGES[languageCode]?.hello || 'Hello', {
                    lang: LANGUAGES[languageCode]?.ttsLocale,
                    voice: name,
                  });
                }}
              >
                {t('profilePage.preview')}
              </button>
              {selectedVoice === name && <span className="voice-check">&#10003;</span>}
            </div>
          ))}
        </div>
      )}
    </div>
    );
  };

  const handleModeToggle = async (enable) => {
    try {
      setModeLoading(true);
      const res = await userService.toggleXpDecay(userId, enable);
      setXpDecayEnabled(res.data.xpDecayEnabled);
      setUser({ ...user, totalXP: res.data.totalXP, xpDecayEnabled: res.data.xpDecayEnabled });
      localStorage.setItem('xpDecayEnabled', String(res.data.xpDecayEnabled));
      // Notify App.js / Navbar about mode change
      window.dispatchEvent(new CustomEvent('xpModeChanged', { detail: { enabled: res.data.xpDecayEnabled } }));
      // Notify XP display if XP changed (OFF → ON wipes XP)
      window.dispatchEvent(new CustomEvent('xpUpdated', { detail: { totalXP: res.data.totalXP } }));
      setShowModeConfirm(null);
      setSaveMessage(enable ? t('profilePage.challengeEnabled') : t('profilePage.relaxedEnabled'));
      setTimeout(() => setSaveMessage(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || t('profilePage.failedToLoad'));
    } finally {
      setModeLoading(false);
    }
  };

  const handleCurriculumPreference = async (targetLanguage, version) => {
    try {
      const res = await userService.updateCurriculumPreference(userId, { targetLanguage, version });
      setUser((prev) => ({
        ...(prev || {}),
        curriculumPreferences: res.data?.curriculumPreferences || prev?.curriculumPreferences,
        curriculumV2: res.data?.curriculumV2 || prev?.curriculumV2,
      }));
      hydrateCurriculumPreferences(res.data?.curriculumV2);
      setSaveMessage(t('profilePage.curriculumPreferenceSaved', 'Curriculum preference updated.'));
      setTimeout(() => setSaveMessage(''), 4000);
      if (version === 'v2') {
        navigate('/learn/v2');
      }
    } catch (err) {
      setError(err.response?.data?.message || t('profilePage.failedToLoad'));
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(t('profilePage.deleteConfirm'))) {
      try {
        await userService.deleteAccount(userId);
        onLogout();
        navigate('/login');
      } catch (err) {
        setError(err.response?.data?.message || t('profilePage.failedToLoad'));
      }
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">{t('profilePage.loadingProfile')}</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const totalXP = user?.totalXP || 0;
  const personalizationTier = effectiveSubscriptionTier(user);
  const canUseLearningPersonalization = Boolean(
    user?.role === 'admin'
    || user?.aiEntitlements?.canUsePracticeContext
    || isProOrUltraTier(personalizationTier),
  );
  const voicePracticeHistory = asArray(learningHub?.recentEvents)
    .filter((event) => (
      ['conversation_turn', 'speaking_practice_complete'].includes(event.eventType)
      && event.metadata?.transcript
      && ['spoken', 'hands_free'].includes(event.metadata?.mode || '')
    ))
    .slice(0, 6);
  let storedEntitlements = {};
  try {
    storedEntitlements = JSON.parse(localStorage.getItem('aiEntitlements') || '{}');
  } catch (_) {
    storedEntitlements = {};
  }
  const canManageInstitution = Boolean(
    user?.aiEntitlements?.canManageOrganization
    || storedEntitlements.canManageOrganization
  );
  const institutionalAccess = user?.aiEntitlements?.subscription?.institutionalAccess
    || user?.institutionalAccess
    || storedEntitlements.subscription?.institutionalAccess
    || null;
  const hasInstitutionAccess = Boolean(
    institutionalAccess?.organizationName
    && ['active', 'trialing'].includes(String(institutionalAccess?.status || '').toLowerCase())
  );
  const billingSummary = billingAccount?.subscription || billingAccount?.entitlements?.subscription || {};
  const activeInstitutionAccess = billingSummary.institutionalAccess || institutionalAccess || null;
  const activeBillingSource = billingSummary.billingSource || user?.aiEntitlements?.billingSource || storedEntitlements.billingSource || '';
  const activeAccountTier = String(personalizationTier || 'plus').toUpperCase();
  const activeStoryLanguageName = profileLanguageOptionLabel(getTargetLangCode());
  const activeAccountTypeLabel = user?.role === 'admin'
    ? `${t('profilePage.administrator')} · Pro`
    : activeBillingSource === 'institution'
      ? [
        t('billing.sources.institution', 'Institution seat'),
        activeInstitutionAccess?.organizationName,
        activeAccountTier,
      ].filter(Boolean).join(' · ')
      : `${t('profilePage.standardUser')} · ${activeAccountTier}`;
  const billingMemberships = asArray(billingAccount?.memberships);
  const activeAccessKey = billingSummary.billingSource === 'institution' && billingSummary.institutionalAccess?.organizationId
    ? `institution:${billingSummary.institutionalAccess.organizationId}`
    : 'personal';
  const accessOptions = [
    {
      key: 'personal',
      contextType: 'personal',
      label: t('billing.personalBilling', 'Personal billing'),
      detail: billingSummary.personalSubscription?.status
        ? t(`adminBilling.statuses.${billingSummary.personalSubscription.status}`, billingSummary.personalSubscription.status)
        : t('billing.noPaidSubscription'),
    },
    ...billingMemberships
      .map((membership) => {
        const organization = getMembershipOrganization(membership);
        const organizationId = organization?._id || (typeof membership?.organizationId === 'string' ? membership.organizationId : '');
        return {
          membership,
          organization,
          organizationId,
          status: String(organization?.status || membership?.status || '').toLowerCase(),
        };
      })
      .filter(({ organizationId, status }) => organizationId && ['active', 'trialing'].includes(status))
      .map(({ membership, organization, organizationId }) => {
        const role = membership?.role || 'learner';
        return {
          key: `institution:${organizationId}`,
          contextType: 'institution',
          organizationId,
          label: organization?.name || t('billing.institutionAccess', 'Institution access'),
          detail: `${String(organization?.effectiveTier || membership?.effectiveTier || '').toUpperCase()} · ${t(`institution.roles.${role}`, role)}`,
        };
      }),
  ];
  const switchAccessContext = async (option) => {
    setSwitchingAccess(option.key);
    setSaveMessage('');
    try {
      const res = await billingService.switchSubscriptionContext({
        contextType: option.contextType,
        organizationId: option.organizationId || '',
      });
      if (res.data?.entitlements) {
        localStorage.setItem('aiEntitlements', JSON.stringify(res.data.entitlements));
        localStorage.setItem('subscriptionTier', res.data.entitlements.subscriptionTier || 'plus');
      }
      const [userResponse, billingResponse] = await Promise.all([
        userService.getProfile(userId),
        billingService.getAccount(),
      ]);
      setUser(userResponse.data);
      setBillingAccount(billingResponse.data || null);
      setSaveMessage(t('billing.subscriptionContextUpdated', 'Subscription access switched.'));
    } catch (err) {
      setError(err.response?.data?.message || t('billing.subscriptionContextFailed', 'Could not switch subscription access.'));
    } finally {
      setSwitchingAccess('');
    }
  };
  const replayTargetSpeech = (event) => {
    const targetSpeech = event?.metadata?.targetText || event?.metadata?.transcript;
    if (!targetSpeech) return;
    speechService.speak(targetSpeech, { lang: LANGUAGES[getTargetLangCode()]?.ttsLocale });
  };
  const practiceVoiceTurnAgain = (event) => {
    const transcript = event?.metadata?.transcript;
    if (!transcript) return;
    const prompt = t('learningHub.practiceAgainPrompt', {
      text: transcript,
      defaultValue: 'Help me practice saying "{{text}}" again.',
    });
    navigate(`/conversation?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="profile-container">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <div className="profile-info">
            <h1>{user?.username || 'User'}</h1>
            <p className="member-since">{t('profilePage.memberSince', { date: user?.createdAt ? formatDate(user.createdAt) : t('profilePage.unknown') })}</p>
          </div>
          <div className="profile-stats-mini">
            <div className="mini-stat">
              <span className="mini-stat-value">{totalXP}</span>
              <span className="mini-stat-label">{t('profilePage.totalXP')}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-value">{progress?.mastered || 0}</span>
              <span className="mini-stat-label">{t('profilePage.mastered')}</span>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {saveMessage && <div className="success-message">{saveMessage}</div>}
        {error && <div className="error-message">{error}</div>}

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleTabChange('profile')}
          >
            <span className="tab-icon">👤</span>
            {t('profilePage.profileTab')}
          </button>
          <button
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleTabChange('settings')}
          >
            <span className="tab-icon">⚙️</span>
            {t('profilePage.settingsTab')}
          </button>
          <button
            className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => handleTabChange('account')}
          >
            <span className="tab-icon">🔐</span>
            {t('profilePage.accountTab')}
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="card info-card">
                <div className="card-header">
                  <h2>{t('profilePage.personalInfo')}</h2>
                  {!isEditing ? (
                    <button className="btn btn-outline btn-sm" onClick={() => setIsEditing(true)}>
                      {t('common.edit')}
                    </button>
                  ) : (
                    <div className="edit-actions">
                      <button className="btn btn-primary btn-sm" onClick={handleSaveProfile}>
                        {t('common.save')}
                      </button>
                      <button className="btn btn-outline btn-sm" onClick={() => setIsEditing(false)}>
                        {t('common.cancel')}
                      </button>
                    </div>
                  )}
                </div>
                <div className="info-grid">
                  <div className="info-item">
                    <label>{t('profilePage.username')}</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="username"
                        value={editData.username}
                        onChange={handleEditChange}
                        className="edit-input"
                      />
                    ) : (
                      <span>{user?.username}</span>
                    )}
                  </div>
                  <div className="info-item">
                    <label>{t('profilePage.fullName', 'Full name')}</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={editData.fullName}
                        onChange={handleEditChange}
                        className="edit-input"
                        placeholder={t('profilePage.fullNamePlaceholder', 'Name to show on certificates')}
                        autoComplete="name"
                      />
                    ) : (
                      <span>{user?.fullName || t('profilePage.fullNameMissing', 'Add before issuing a certificate')}</span>
                    )}
                  </div>
                  <div className="info-item">
                    <label>{t('profilePage.email')}</label>
                    <span>{user?.email}</span>
                  </div>
                  <div className="info-item">
                    <label>{t('profilePage.memberSinceLabel')}</label>
                    <span>{user?.createdAt ? formatDate(user.createdAt) : t('profilePage.unknown')}</span>
                  </div>
                  <div className="info-item">
                    <label>{t('profilePage.activeAccountType', 'Active account type')}</label>
                    <span className="badge">
                      {activeAccountTypeLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`card personalization-card ${canUseLearningPersonalization ? '' : 'locked'}`}>
                <div className="personalization-card-main">
                  <div>
                    <p className="personalization-kicker">
                      {canUseLearningPersonalization ? t('profilePage.personalizationAvailable') : t('profilePage.personalizationTier')}
                    </p>
                    <h2>{t('profilePage.personalizationTitle')}</h2>
                    <p className="card-description">
                      {t('profilePage.personalizationDesc')}
                    </p>
                  </div>
                  <span className="personalization-tier">{String(personalizationTier || 'free').toUpperCase()}</span>
                </div>
                <button
                  type="button"
                  className={canUseLearningPersonalization ? 'btn btn-primary' : 'btn btn-outline'}
                  onClick={() => navigate('/learning-personalization')}
                >
                  {canUseLearningPersonalization ? t('profilePage.managePersonalization') : t('profilePage.viewUpgradeDetails')}
                </button>
              </div>

              <div className="card story-card">
                <div className="story-card-header">
                  <div>
                    <p className="story-kicker">{t('profilePage.storyKicker', 'Learner testimonial')}</p>
                    <h2>{t('profilePage.storyTitle', 'Share your story')}</h2>
                  </div>
                  <span>{activeStoryLanguageName}</span>
                </div>
                <p className="card-description">
                  {t('profilePage.storyDesc', 'Tell future learners what changed for you. Approved stories can appear on the public landing page after review.')}
                </p>
                <form className="story-form" onSubmit={submitStory}>
                  <label className="story-field">
                    <span>{t('profilePage.storyCommentLabel', 'Your story')}</span>
                    <textarea
                      value={storyForm.comment}
                      onChange={updateStoryField('comment')}
                      placeholder={t('profilePage.storyCommentPlaceholder', 'What helped you speak, write, review, or stay consistent?')}
                      maxLength={600}
                      rows={4}
                      required
                    />
                  </label>
                  <input
                    type="text"
                    className="story-honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={storyForm.company}
                    onChange={updateStoryField('company')}
                  />
                  <button type="submit" className="btn btn-primary" disabled={storySubmitting}>
                    {storySubmitting ? t('profilePage.storySubmitting', 'Sending...') : t('profilePage.storySubmit', 'Send story')}
                  </button>
                </form>
              </div>

              <div className="card">
                <h2>{t('profilePage.session')}</h2>
                <p className="card-description">{t('profilePage.manageSession')}</p>
                <button className="btn btn-outline" onClick={handleLogout}>
                  <span className="btn-icon">👋</span>
                  {t('common.logout')}
                </button>
              </div>

              <div className="card stats-card">
                <h2>{t('profilePage.learningStatistics')}</h2>
                <div className="stats-grid">
                  <div className="stat-box">
                    <span className="stat-icon">🏆</span>
                    <span className="stat-number">{progress?.mastered || 0}</span>
                    <span className="stat-title">{t('profilePage.mastered')}</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon">😊</span>
                    <span className="stat-number">{progress?.comfortable || 0}</span>
                    <span className="stat-title">{t('profilePage.comfortable')}</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon">📚</span>
                    <span className="stat-number">{progress?.learning || 0}</span>
                    <span className="stat-title">{t('profilePage.learning')}</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon">💪</span>
                    <span className="stat-number">{progress?.struggling || 0}</span>
                    <span className="stat-title">{t('profilePage.struggling')}</span>
                  </div>
                </div>
              </div>

              <div className="card profile-gallery-card">
                <h2>{t('learningHub.milestonesTitle', 'Milestones')}</h2>
                <div className="profile-gallery-grid">
                  <div>
                    <strong>{learningHub?.milestones?.completedClassLessons || 0}</strong>
                    <span>{t('learningHub.completedLessons', 'Completed lessons')}</span>
                  </div>
                  <div>
                    <strong>{learningHub?.milestones?.savedItems || 0}</strong>
                    <span>{t('learningHub.savedItems', 'Saved items')}</span>
                  </div>
                  <div>
                    <strong>{certificates.length}</strong>
                    <span>{t('learningHub.certificates', 'Certificates')}</span>
                  </div>
                </div>
                {certificates.length > 0 && (
                  <div className="profile-certificate-list">
                    {certificates.slice(0, 4).map((certificate) => (
                      <button
                        type="button"
                        key={certificate._id}
                        onClick={() => navigate(`/certificates/verify/${certificate.certificateId}`)}
                      >
                        <strong>
                          {certificate.classLessonTitle
                            || (certificate.level
                              ? t('certificates.levelCertificateTitle', 'Level {{level}} certificate', { level: certificate.level })
                              : t('certificates.issuedTitle', 'Certificate issued'))}
                        </strong>
                        <span>{certificate.issuedAt ? formatDate(certificate.issuedAt) : ''}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="card profile-voice-history-card">
                <h2>{t('learningHub.voiceHistoryTitle', 'Voice practice history')}</h2>
                {voicePracticeHistory.length ? (
                  <div className="profile-voice-history-list">
                    {voicePracticeHistory.map((event) => (
                      <div key={event._id}>
                        <small>{t('learningHub.youSaid', 'You said')}</small>
                        <strong>{event.metadata.transcript}</strong>
                        <small>{t('learningHub.targetSpeech', 'Target speech')}</small>
                        <span>{event.metadata.targetText || event.metadata.transcript}</span>
                        <div className="profile-voice-history-actions">
                          <button type="button" onClick={() => replayTargetSpeech(event)}>
                            {t('learningHub.replayTargetSpeech', 'Hear target speech')}
                          </button>
                          <button type="button" onClick={() => practiceVoiceTurnAgain(event)}>
                            {t('learningHub.practiceAgain', 'Practice again')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="card-description">{t('learningHub.voiceHistoryEmpty', 'Speaking turns will appear here after conversation practice.')}</p>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="settings-section">
              <div className="card">
                <h2>{user?.hasPassword ? t('profilePage.changePassword') : t('profilePage.setPassword', 'Set Password')}</h2>
                <form onSubmit={handleChangePassword} className="password-form">
                  {user?.hasPassword && (
                  <div className="form-group">
                    <label htmlFor="currentPassword">{t('profilePage.currentPassword')}</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder={t('profilePage.currentPasswordPlaceholder')}
                      required
                    />
                  </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="newPassword">{t('profilePage.newPassword')}</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder={t('profilePage.newPasswordPlaceholder')}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">{t('profilePage.confirmNewPassword')}</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder={t('profilePage.confirmNewPasswordPlaceholder')}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {t('profilePage.updatePassword')}
                  </button>
                </form>
              </div>

              <div className="card">
                <h2>{t('profilePage.languagePreferences')}</h2>
                <div className="language-prefs">
                  <div className="form-group">
                    <label>{t('profilePage.iSpeak')}</label>
                    <select
                      className="profile-select"
                      value={getNativeLangCode()}
                      onChange={async (e) => {
                        const val = normalizeLanguageCode(e.target.value) || 'en';
                        localStorage.setItem('nativeLanguage', val);
                        i18n.changeLanguage(val);
                        try {
                          await userService.updateProfile(userId, { nativeLanguage: val });
                        } catch (_) {}
                        classLessonService.preparePair({
                          nativeLang: val,
                          targetLang: getTargetLangCode(),
                        }).catch(() => {});
                        window.location.reload();
                      }}
                    >
                      {Object.entries(LANGUAGES).map(([code]) => (
                        <option key={code} value={code}>{profileLanguageOptionLabel(code)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t('profilePage.imLearning')}</label>
                    <select
                      className="profile-select"
                      value={getTargetLangCode()}
                      onChange={async (e) => {
                        const val = normalizeLanguageCode(e.target.value) || 'ko';
                        localStorage.setItem('targetLanguage', val);
                        try {
                          await userService.updateProfile(userId, { targetLanguage: val });
                        } catch (_) {}
                        classLessonService.preparePair({
                          nativeLang: getNativeLangCode(),
                          targetLang: val,
                        }).catch(() => {});
                        window.location.reload();
                      }}
                    >
                      {Object.entries(LANGUAGES)
                        .filter(([code]) => code !== getNativeLangCode())
                        .map(([code]) => (
                          <option key={code} value={code}>{profileLanguageOptionLabel(code)}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2>{t('profilePage.voiceSettings')}</h2>
                <p className="voice-description">
                  {t('profilePage.voiceSettingsDesc', 'Choose separate voices for your target language and your native language so mixed replies are pronounced naturally.')}
                </p>
                {renderVoiceSelector({
                  title: t('profilePage.targetVoice', 'Target voice'),
                  languageCode: getTargetLangCode(),
                  languageName: getLanguageDisplayName(getTargetLangCode(), t),
                  voices: targetVoices,
                  selectedVoice: selectedTargetVoice,
                })}
                {renderVoiceSelector({
                  title: t('profilePage.nativeVoice', 'Native voice'),
                  languageCode: getNativeLangCode(),
                  languageName: getLanguageDisplayName(getNativeLangCode(), t),
                  voices: nativeVoices,
                  selectedVoice: selectedNativeVoice,
                })}
              </div>

              {/* Curriculum version (per target language) — only shown when v2 is available */}
              {Array.isArray(user?.curriculumV2?.availableTargets) && user.curriculumV2.availableTargets.length > 0 && (
                <div className="card">
                  <h2>{t('profilePage.curriculumVersion', 'Curriculum version')}</h2>
                  <p className="voice-description">
                    {t(
                      'profilePage.curriculumVersionDesc',
                      'Pick the version of the curriculum you want to use for each supported target language. You can switch any time.',
                    )}
                  </p>
                  {user.curriculumV2.availableTargets.map((lang) => {
                    const current = (user.curriculumV2.preferences || {})[lang] || null;
                    const langName = getLanguageDisplayName(lang, t) || lang.toUpperCase();
                    return (
                      <div key={lang} className="xp-mode-selector" style={{ marginBottom: 12 }}>
                        <div
                          className={`xp-mode-option ${current === 'v2' ? 'active' : ''}`}
                          onClick={() => current !== 'v2' && handleCurriculumPreference(lang, 'v2')}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="xp-mode-icon">⚡</div>
                          <div className="xp-mode-info">
                            <span className="xp-mode-name">{t('profilePage.curriculumV2Name', '{{language}} — new curriculum', { language: langName })}</span>
                            <span className="xp-mode-desc">{t('profilePage.curriculumV2Desc', 'Pattern drills, stories, cloze, vocab SRS, pronunciation — planner-sequenced.')}</span>
                          </div>
                          {current === 'v2' && <span className="voice-check">&#10003;</span>}
                        </div>
                        <div
                          className={`xp-mode-option ${current === 'v1' ? 'active' : ''}`}
                          onClick={() => current !== 'v1' && handleCurriculumPreference(lang, 'v1')}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="xp-mode-icon">📘</div>
                          <div className="xp-mode-info">
                            <span className="xp-mode-name">{t('profilePage.curriculumV1Name', '{{language}} — classic curriculum', { language: langName })}</span>
                            <span className="xp-mode-desc">{t('profilePage.curriculumV1Desc', 'Vocabulary lists and class lessons you already know.')}</span>
                          </div>
                          {current === 'v1' && <span className="voice-check">&#10003;</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* XP Mode */}
              <div className="card">
                <h2>{t('profilePage.xpMode')}</h2>
                <p className="voice-description">
                  {t('profilePage.xpModeDescription')}
                </p>
                <div className="xp-mode-selector">
                  <div
                    className={`xp-mode-option ${!xpDecayEnabled ? 'active' : ''}`}
                    onClick={() => xpDecayEnabled && setShowModeConfirm('disable')}
                  >
                    <div className="xp-mode-icon">🌿</div>
                    <div className="xp-mode-info">
                      <span className="xp-mode-name">{t('profilePage.relaxedMode')}</span>
                      <span className="xp-mode-desc">{t('profilePage.relaxedDesc')}</span>
                    </div>
                    {!xpDecayEnabled && <span className="voice-check">&#10003;</span>}
                  </div>
                  <div
                    className={`xp-mode-option challenge ${xpDecayEnabled ? 'active' : ''}`}
                    onClick={() => !xpDecayEnabled && setShowModeConfirm('enable')}
                  >
                    <div className="xp-mode-icon">🔥</div>
                    <div className="xp-mode-info">
                      <span className="xp-mode-name">{t('profilePage.challengeMode')}</span>
                      <span className="xp-mode-desc">{t('profilePage.challengeDesc')}</span>
                    </div>
                    {xpDecayEnabled && <span className="voice-check">&#10003;</span>}
                  </div>
                </div>
              </div>

              {/* Mode Confirmation Modal */}
              {showModeConfirm && (
                <div className="decay-confirm-overlay" onClick={() => !modeLoading && setShowModeConfirm(null)}>
                  <div className="decay-confirm-modal" onClick={(e) => e.stopPropagation()}>
                    {showModeConfirm === 'enable' ? (
                      <>
                        <div className="decay-confirm-icon">⚠️</div>
                        <h3>{t('profilePage.switchToChallenge')}</h3>
                        <p className="decay-confirm-warning warning-red" dangerouslySetInnerHTML={{ __html: t('profilePage.challengeWarning') }} />
                        <p className="decay-confirm-detail">
                          {t('profilePage.challengeDetail')}
                        </p>
                        <div className="decay-confirm-actions">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleModeToggle(true)}
                            disabled={modeLoading}
                          >
                            {modeLoading ? t('profilePage.switching') : t('profilePage.resetAndEnable')}
                          </button>
                          <button
                            className="btn btn-outline"
                            onClick={() => setShowModeConfirm(null)}
                            disabled={modeLoading}
                          >
                            {t('common.cancel')}
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="decay-confirm-icon">💡</div>
                        <h3>{t('profilePage.switchToRelaxed')}</h3>
                        <p className="decay-confirm-warning warning-yellow" dangerouslySetInnerHTML={{ __html: t('profilePage.relaxedWarning') }} />
                        <div className="decay-confirm-actions">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleModeToggle(false)}
                            disabled={modeLoading}
                          >
                            {modeLoading ? t('profilePage.switching') : t('profilePage.switchRelaxedBtn')}
                          </button>
                          <button
                            className="btn btn-outline"
                            onClick={() => setShowModeConfirm(null)}
                            disabled={modeLoading}
                          >
                            {t('common.cancel')}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="account-section">
              <div className="card support-zone">
                <h2>{t('billing.title')}</h2>
                <p className="card-description">
                  {t('billing.profileText')}
                </p>
                <div className="profile-account-actions">
                  <button className="btn btn-primary" onClick={() => navigate('/billing')}>
                    {t('billing.manageBilling')}
                  </button>
                  <button className="btn btn-outline" onClick={() => navigate('/pricing')}>
                    {t('billing.viewPlans')}
                  </button>
                </div>
              </div>
              {accessOptions.length > 1 && (
                <div className="card support-zone profile-access-source">
                  <p className="profile-card-kicker">{t('billing.accessSwitcherKicker', 'Access source')}</p>
                  <h2>{t('billing.accessSwitcherTitle', 'Use subscription from')}</h2>
                  <p className="card-description">
                    {t('billing.accessSwitcherHint', 'Choose whether this account uses personal billing or an institution seat for paid access.')}
                  </p>
                  <div className="profile-access-options">
                    {accessOptions.map((option) => {
                      const active = option.key === activeAccessKey;
                      return (
                        <button
                          type="button"
                          key={option.key}
                          className={active ? 'active' : ''}
                          onClick={() => switchAccessContext(option)}
                          disabled={active || !!switchingAccess}
                        >
                          <strong>{option.label}</strong>
                          <span>{option.detail}</span>
                          {active && <small>{t('billing.currentAccessSource', 'Current')}</small>}
                          {switchingAccess === option.key && <small>{t('common.loading')}</small>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="card support-zone">
                <h2>{t('contact.title')}</h2>
                <p className="card-description">
                  {t('contact.subtitle')}
                </p>
                <button className="btn btn-outline" onClick={() => navigate('/contact')}>
                  {t('contact.navLabel')}
                </button>
              </div>
              {hasInstitutionAccess && (
                <div className="card support-zone">
                  <h2>{t('billing.institutionAccess')}</h2>
                  <p className="card-description">
                    {institutionalAccess.organizationName}
                  </p>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>{t('billing.currentPlan')}</label>
                      <span>{String(institutionalAccess.effectiveTier || user?.subscriptionTier || '').toUpperCase()}</span>
                    </div>
                    <div className="info-item">
                      <label>{t('institution.role')}</label>
                      <span>{t(`institution.roles.${institutionalAccess.role}`, institutionalAccess.role)}</span>
                    </div>
                    <div className="info-item">
                      <label>{t('institution.status')}</label>
                      <span>{t(`institution.orgStatuses.${institutionalAccess.status}`, institutionalAccess.status)}</span>
                    </div>
                  </div>
                </div>
              )}
              {canManageInstitution && (
                <div className="card support-zone">
                  <h2>{t('institution.title')}</h2>
                  <p className="card-description">
                    {t('institution.subtitle')}
                  </p>
                  <button className="btn btn-primary" onClick={() => navigate('/institution')}>
                    {t('navbar.institution')}
                  </button>
                </div>
              )}
              <div className="card danger-zone">
                <h2>{t('profilePage.resetProgress')}</h2>
                <p className="card-description">
                  {t('profilePage.resetProgressDesc')}
                </p>
                <button className="btn btn-danger" onClick={async () => {
                  if (window.confirm(t('profilePage.resetConfirm'))) {
                    try {
                      await userService.resetXP(userId);
                      setUser({ ...user, totalXP: 0 });
                      setSaveMessage(t('profilePage.xpReset'));
                      setTimeout(() => setSaveMessage(''), 3000);
                    } catch (err) {
                      setError(err.response?.data?.message || t('profilePage.failedToLoad'));
                    }
                  }
                }}>
                  {t('profilePage.resetXPHistory')}
                </button>
              </div>
              <div className="card danger-zone">
                <h2>{t('profilePage.dangerZone')}</h2>
                <p className="card-description">
                  {t('profilePage.deleteAccountDesc')}
                </p>
                <button className="btn btn-danger" onClick={handleDeleteAccount}>
                  <span className="btn-icon">🗑️</span>
                  {t('profilePage.deleteAccount')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
