import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService, progressService } from '../services/api';
import speechService from '../services/speechService';
import './ProfilePage.css';

function ProfilePage({ onLogout }) {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
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
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load available Korean voices
  useEffect(() => {
    const loadVoices = () => {
      const koreanVoices = speechService.getKoreanVoices();
      if (koreanVoices.length > 0) {
        setAvailableVoices(koreanVoices);
      }
    };
    loadVoices();
    // Voices may load asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
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

  const totalXP = progress ? progress.mastered * 10 + progress.comfortable * 5 + progress.learning * 2 : 0;

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
                          <span className="voice-option-name">{voice.name}</span>
                          <span className="voice-option-lang">{voice.lang}</span>
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
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="account-section">
              <div className="card">
                <h2>Session</h2>
                <p className="card-description">Manage your current session</p>
                <button className="btn btn-outline" onClick={handleLogout}>
                  <span className="btn-icon">👋</span>
                  Logout
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
