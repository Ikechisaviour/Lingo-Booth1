import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { userService, progressService } from '../services/api';
import speechService from '../services/speechService';
import LANGUAGES, { getTargetLangName, getTargetLangCode, getTargetHello } from '../config/languages';
import './ProfilePage.css';

function ProfilePage({ onLogout }) {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'profile';
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ username: '' });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saveMessage, setSaveMessage] = useState('');
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(localStorage.getItem('preferredVoice') || '');
  const [xpDecayEnabled, setXpDecayEnabled] = useState(false);
  const [showModeConfirm, setShowModeConfirm] = useState(null); // 'enable' or 'disable'
  const [modeLoading, setModeLoading] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load available voices for target language from Edge TTS
  useEffect(() => {
    const loadVoices = async () => {
      const targetVoices = await speechService.getVoicesForLang(getTargetLangCode());
      if (targetVoices.length > 0) {
        setAvailableVoices(targetVoices);
      }
    };
    loadVoices();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [userResponse, progressResponse] = await Promise.all([
        userService.getProfile(userId),
        progressService.getSummary(userId),
      ]);
      setUser(userResponse.data);
      setProgress(progressResponse.data);
      setEditData({ username: userResponse.data.username });
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
      setUser({ ...user, username: editData.username });
      setIsEditing(false);
      setSaveMessage(t('profilePage.profileUpdated'));
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || t('profilePage.failedToLoad'));
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

  const handleVoiceChange = async (voiceName) => {
    setSelectedVoice(voiceName);
    speechService.setVoice(voiceName);
    // Preview the voice
    speechService.speak(getTargetHello());
    // Save to backend
    try {
      await userService.updateProfile(userId, { preferredVoice: voiceName || null });
      setSaveMessage(t('profilePage.voiceUpdated'));
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      console.error('Failed to save voice preference:', err);
    }
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
            onClick={() => setActiveTab('profile')}
          >
            <span className="tab-icon">👤</span>
            {t('profilePage.profileTab')}
          </button>
          <button
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="tab-icon">⚙️</span>
            {t('profilePage.settingsTab')}
          </button>
          <button
            className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
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
                    <label>{t('profilePage.email')}</label>
                    <span>{user?.email}</span>
                  </div>
                  <div className="info-item">
                    <label>{t('profilePage.memberSinceLabel')}</label>
                    <span>{user?.createdAt ? formatDate(user.createdAt) : t('profilePage.unknown')}</span>
                  </div>
                  <div className="info-item">
                    <label>{t('profilePage.accountType')}</label>
                    <span className="badge">{user?.role === 'admin' ? t('profilePage.administrator') : t('profilePage.standardUser')}</span>
                  </div>
                </div>
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
                      value={localStorage.getItem('nativeLanguage') || 'en'}
                      onChange={async (e) => {
                        const val = e.target.value;
                        localStorage.setItem('nativeLanguage', val);
                        i18n.changeLanguage(val);
                        try {
                          await userService.updateProfile(userId, { nativeLanguage: val });
                        } catch (_) {}
                        window.location.reload();
                      }}
                    >
                      {Object.entries(LANGUAGES).map(([code, lang]) => (
                        <option key={code} value={code}>{lang.flag} {lang.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t('profilePage.imLearning')}</label>
                    <select
                      className="profile-select"
                      value={localStorage.getItem('targetLanguage') || 'ko'}
                      onChange={async (e) => {
                        const val = e.target.value;
                        localStorage.setItem('targetLanguage', val);
                        try {
                          await userService.updateProfile(userId, { targetLanguage: val });
                        } catch (_) {}
                        window.location.reload();
                      }}
                    >
                      {Object.entries(LANGUAGES)
                        .filter(([code]) => code !== (localStorage.getItem('nativeLanguage') || 'en'))
                        .map(([code, lang]) => (
                          <option key={code} value={code}>{lang.flag} {lang.name}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2>{t('profilePage.voiceSettings')}</h2>
                <p className="voice-description">
                  {t('profilePage.voiceDescription', { language: t(`languages.${getTargetLangCode()}`, getTargetLangName()) })}
                </p>
                {availableVoices.length === 0 ? (
                  <p className="voice-no-voices">
                    {t('profilePage.noVoices', { language: t(`languages.${getTargetLangCode()}`, getTargetLangName()) })}
                  </p>
                ) : (
                  <div className="voice-selector">
                    {availableVoices.map((voice) => (
                      <div
                        key={voice.name}
                        className={`voice-option ${selectedVoice === voice.name ? 'voice-option-selected' : ''}`}
                        onClick={() => handleVoiceChange(voice.name)}
                      >
                        <div className="voice-option-info">
                          <span className="voice-option-name">{voice.displayName || voice.name}</span>
                          <span className="voice-option-lang">{voice.lang}{voice.gender ? ` · ${voice.gender}` : ''}</span>
                        </div>
                        <button
                          className="voice-preview-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            const prevVoice = speechService.getSelectedVoiceName();
                            speechService.setVoice(voice.name);
                            speechService.speak(getTargetHello());
                            // Restore previous voice if not selecting
                            if (selectedVoice !== voice.name) {
                              setTimeout(() => speechService.setVoice(prevVoice), 100);
                            }
                          }}
                        >
                          {t('profilePage.preview')}
                        </button>
                        {selectedVoice === voice.name && (
                          <span className="voice-check">&#10003;</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

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
