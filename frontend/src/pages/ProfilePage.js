import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userService, progressService } from '../services/api';
import speechService from '../services/speechService';
import './ProfilePage.css';

function ProfilePage({ onLogout }) {
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

  // Load available Korean voices from Edge TTS
  useEffect(() => {
    const loadVoices = async () => {
      const koreanVoices = await speechService.getKoreanVoices();
      if (koreanVoices.length > 0) {
        setAvailableVoices(koreanVoices);
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
      setError('Failed to load profile');
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
      setSaveMessage('Profile updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    try {
      await userService.changePassword(userId, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSaveMessage('Password changed successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    }
  };

  const handleVoiceChange = async (voiceName) => {
    setSelectedVoice(voiceName);
    speechService.setVoice(voiceName);
    // Preview the voice
    speechService.speak('안녕하세요');
    // Save to backend
    try {
      await userService.updateProfile(userId, { preferredVoice: voiceName || null });
      setSaveMessage('Voice updated successfully!');
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
      setSaveMessage(enable ? 'Challenge Mode enabled! XP has been reset.' : 'Switched to Relaxed Mode. Your XP is preserved.');
      setTimeout(() => setSaveMessage(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change XP mode');
    } finally {
      setModeLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await userService.deleteAccount(userId);
        onLogout();
        navigate('/login');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete account');
      }
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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
            <p className="member-since">Member since {user?.createdAt ? formatDate(user.createdAt) : 'Unknown'}</p>
          </div>
          <div className="profile-stats-mini">
            <div className="mini-stat">
              <span className="mini-stat-value">{totalXP}</span>
              <span className="mini-stat-label">Total XP</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-value">{progress?.mastered || 0}</span>
              <span className="mini-stat-label">Mastered</span>
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
            Profile
          </button>
          <button
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="tab-icon">⚙️</span>
            Settings
          </button>
          <button
            className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            <span className="tab-icon">🔐</span>
            Account
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="card info-card">
                <div className="card-header">
                  <h2>Personal Information</h2>
                  {!isEditing ? (
                    <button className="btn btn-outline btn-sm" onClick={() => setIsEditing(true)}>
                      Edit
                    </button>
                  ) : (
                    <div className="edit-actions">
                      <button className="btn btn-primary btn-sm" onClick={handleSaveProfile}>
                        Save
                      </button>
                      <button className="btn btn-outline btn-sm" onClick={() => setIsEditing(false)}>
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Username</label>
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
                    <label>Email</label>
                    <span>{user?.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Member Since</label>
                    <span>{user?.createdAt ? formatDate(user.createdAt) : 'Unknown'}</span>
                  </div>
                  <div className="info-item">
                    <label>Account Type</label>
                    <span className="badge">{user?.role === 'admin' ? 'Administrator' : 'Standard User'}</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2>Session</h2>
                <p className="card-description">Manage your current session</p>
                <button className="btn btn-outline" onClick={handleLogout}>
                  <span className="btn-icon">👋</span>
                  Logout
                </button>
              </div>

              <div className="card stats-card">
                <h2>Learning Statistics</h2>
                <div className="stats-grid">
                  <div className="stat-box">
                    <span className="stat-icon">🏆</span>
                    <span className="stat-number">{progress?.mastered || 0}</span>
                    <span className="stat-title">Mastered</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon">😊</span>
                    <span className="stat-number">{progress?.comfortable || 0}</span>
                    <span className="stat-title">Comfortable</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon">📚</span>
                    <span className="stat-number">{progress?.learning || 0}</span>
                    <span className="stat-title">Learning</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon">💪</span>
                    <span className="stat-number">{progress?.struggling || 0}</span>
                    <span className="stat-title">Struggling</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="settings-section">
              <div className="card">
                <h2>Change Password</h2>
                <form onSubmit={handleChangePassword} className="password-form">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </form>
              </div>

              <div className="card">
                <h2>Voice Settings</h2>
                <p className="voice-description">
                  Choose a Korean voice for pronunciation. Your selection syncs across devices.
                </p>
                {availableVoices.length === 0 ? (
                  <p className="voice-no-voices">
                    No Korean voices available on this device. Try using Chrome or Edge for more voice options.
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
                            speechService.speak('안녕하세요');
                            // Restore previous voice if not selecting
                            if (selectedVoice !== voice.name) {
                              setTimeout(() => speechService.setVoice(prevVoice), 100);
                            }
                          }}
                        >
                          Preview
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
                <h2>XP Mode</h2>
                <p className="voice-description">
                  Choose how your XP system works. Challenge Mode adds XP decay for inactivity.
                </p>
                <div className="xp-mode-selector">
                  <div
                    className={`xp-mode-option ${!xpDecayEnabled ? 'active' : ''}`}
                    onClick={() => xpDecayEnabled && setShowModeConfirm('disable')}
                  >
                    <div className="xp-mode-icon">🌿</div>
                    <div className="xp-mode-info">
                      <span className="xp-mode-name">Relaxed Mode</span>
                      <span className="xp-mode-desc">No XP decay. Learn at your own pace.</span>
                    </div>
                    {!xpDecayEnabled && <span className="voice-check">&#10003;</span>}
                  </div>
                  <div
                    className={`xp-mode-option challenge ${xpDecayEnabled ? 'active' : ''}`}
                    onClick={() => !xpDecayEnabled && setShowModeConfirm('enable')}
                  >
                    <div className="xp-mode-icon">🔥</div>
                    <div className="xp-mode-info">
                      <span className="xp-mode-name">Challenge Mode</span>
                      <span className="xp-mode-desc">XP decays after 48h of inactivity. Stay sharp!</span>
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
                        <h3>Switch to Challenge Mode?</h3>
                        <p className="decay-confirm-warning warning-red">
                          Switching to Challenge Mode will <strong>reset your XP to 0</strong>. Your learning history
                          will be preserved, but you'll start earning XP from scratch.
                        </p>
                        <p className="decay-confirm-detail">
                          In Challenge Mode, your XP decays by 15% per day after 48 hours of inactivity.
                          Only answering questions resets the timer.
                        </p>
                        <div className="decay-confirm-actions">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleModeToggle(true)}
                            disabled={modeLoading}
                          >
                            {modeLoading ? 'Switching...' : 'Reset XP & Enable Challenge Mode'}
                          </button>
                          <button
                            className="btn btn-outline"
                            onClick={() => setShowModeConfirm(null)}
                            disabled={modeLoading}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="decay-confirm-icon">💡</div>
                        <h3>Switch to Relaxed Mode?</h3>
                        <p className="decay-confirm-warning warning-yellow">
                          Your current XP will be <strong>preserved</strong> in Relaxed Mode. However, if you switch
                          back to Challenge Mode in the future, your XP will be wiped to 0.
                        </p>
                        <div className="decay-confirm-actions">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleModeToggle(false)}
                            disabled={modeLoading}
                          >
                            {modeLoading ? 'Switching...' : 'Switch to Relaxed Mode'}
                          </button>
                          <button
                            className="btn btn-outline"
                            onClick={() => setShowModeConfirm(null)}
                            disabled={modeLoading}
                          >
                            Cancel
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
                <h2>Reset Progress</h2>
                <p className="card-description">
                  Reset your XP and answer history. Your XP will go back to 0 and all questions will award full points again.
                </p>
                <button className="btn btn-danger" onClick={async () => {
                  if (window.confirm('Are you sure you want to reset your XP and answer history? Your XP will go back to 0.')) {
                    try {
                      await userService.resetXP(userId);
                      setUser({ ...user, totalXP: 0 });
                      setSaveMessage('XP and answer history reset successfully!');
                      setTimeout(() => setSaveMessage(''), 3000);
                    } catch (err) {
                      setError(err.response?.data?.message || 'Failed to reset XP');
                    }
                  }
                }}>
                  Reset XP & History
                </button>
              </div>
              <div className="card danger-zone">
                <h2>Danger Zone</h2>
                <p className="card-description">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button className="btn btn-danger" onClick={handleDeleteAccount}>
                  <span className="btn-icon">🗑️</span>
                  Delete Account
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
