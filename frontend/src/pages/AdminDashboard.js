import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { adminService } from '../services/api';
import LANGUAGES, { getTargetLangName, getNativeLangName, getTargetLangCode, getNativeLangCode, getTargetField, getNativeField } from '../config/languages';
import AdminSpeakingDemo from './AdminSpeakingDemo';
import './AdminDashboard.css';

// Country code → flag emoji
function countryFlag(code) {
  if (!code || code.length !== 2) return '🌍';
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map(c => 0x1F1E0 + c.charCodeAt(0) - 65)
  );
}

function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState({
    overview: {
      totalUsers: 0, activeUsers: 0, suspendedUsers: 0, adminCount: 0,
      totalLessons: 0, totalFlashcards: 0, totalProgress: 0, totalLogins: 0,
      challengeModeUsers: 0, relaxedModeUsers: 0,
    },
    activity: { activeUsersToday: 0, activeUsersThisWeek: 0, avgTimeSpent: 0, newUsersLastWeek: 0, newUsersLastMonth: 0 },
    userGrowth: [],
    recentActiveUsers: [],
  });
  const [users, setUsers] = useState([]);
  const [userFlashcards, setUserFlashcards] = useState([]);
  const [guests, setGuests] = useState({
    sessions: [], total: 0, page: 1, totalPages: 1,
    stats: {
      todayCount: 0, weekCount: 0, uniqueCountries: 0, topLanguagePairs: [],
      conversions: 0, conversionRate: 0,
      avgTimeSpent: 0, avgCardsStudied: 0,
      totalCardsStudied: 0, totalAudioPlays: 0, totalLessonsViewed: 0,
      engagedSessions: 0, deviceBreakdown: [],
    },
  });
  const [loading, setLoading] = useState(true);
  const [guestsLoading, setGuestsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [suspendModal, setSuspendModal] = useState({ show: false, user: null, reason: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchGuests = useCallback(async (page = 1) => {
    try {
      setGuestsLoading(true);
      const res = await adminService.getGuests(page);
      setGuests(res.data);
    } catch (err) {
      console.error('Guests fetch error:', err);
    } finally {
      setGuestsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'guests') fetchGuests(1);
  }, [activeTab, fetchGuests]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsResponse, usersResponse, flashcardsResponse] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers(),
        adminService.getUserFlashcards(),
      ]);
      const data = statsResponse.data || {};
      setStats(prev => ({
        overview: { ...prev.overview, ...(data.overview || {}) },
        activity: { ...prev.activity, ...(data.activity || {}) },
        userGrowth: data.userGrowth || [],
        recentActiveUsers: data.recentActiveUsers || [],
      }));
      setUsers(usersResponse.data || []);
      setUserFlashcards(flashcardsResponse.data || []);
      // Pre-populate guest total from stats so the tab label is correct before the tab is clicked
      const guestTotal = data.overview?.totalGuestSessions;
      if (typeof guestTotal === 'number') {
        setGuests(prev => ({ ...prev, total: guestTotal }));
      }
      setError('');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
      setError(`Error: ${errorMsg}. Try logging out and back in.`);
    } finally {
      setLoading(false);
    }
  };

  const openUserDetail = async (user) => {
    setSelectedUser(user);
    setUserDetail(null);
    setDetailLoading(true);
    try {
      const res = await adminService.getUser(user._id);
      setUserDetail(res.data);
    } catch (err) {
      console.error('User detail error:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeUserDetail = () => { setSelectedUser(null); setUserDetail(null); };
  const closeGuestDetail = () => setSelectedGuest(null);

  // Parse a User-Agent string into human-readable components
  const parseUA = (ua) => {
    if (!ua) return { browser: 'Unknown', os: 'Unknown' };
    const u = ua.toLowerCase();
    let browser = 'Unknown';
    if      (u.includes('edg/') || u.includes('edge/')) browser = 'Edge';
    else if (u.includes('opr/') || u.includes('opera'))  browser = 'Opera';
    else if (u.includes('samsungbrowser'))                browser = 'Samsung Browser';
    else if (u.includes('ucbrowser'))                    browser = 'UC Browser';
    else if (u.includes('firefox'))                      browser = 'Firefox';
    else if (u.includes('chrome'))                       browser = 'Chrome';
    else if (u.includes('safari'))                       browser = 'Safari';
    let os = 'Unknown';
    if      (u.includes('windows nt 10') || u.includes('windows nt 11')) os = 'Windows 10/11';
    else if (u.includes('windows nt 6.3'))  os = 'Windows 8.1';
    else if (u.includes('windows nt 6.1'))  os = 'Windows 7';
    else if (u.includes('windows'))         os = 'Windows';
    else if (u.includes('android')) {
      const m = ua.match(/Android\s+([\d.]+)/i);
      os = m ? `Android ${m[1]}` : 'Android';
    }
    else if (u.includes('iphone')) {
      const m = ua.match(/iPhone OS\s+([\d_]+)/i);
      os = m ? `iOS ${m[1].replace(/_/g, '.')} (iPhone)` : 'iOS (iPhone)';
    }
    else if (u.includes('ipad')) {
      const m = ua.match(/CPU OS\s+([\d_]+)/i);
      os = m ? `iPadOS ${m[1].replace(/_/g, '.')}` : 'iPadOS';
    }
    else if (u.includes('mac os x') || u.includes('macos')) {
      const m = ua.match(/Mac OS X\s+([\d_.]+)/i);
      os = m ? `macOS ${m[1].replace(/_/g, '.')}` : 'macOS';
    }
    else if (u.includes('cros'))  os = 'ChromeOS';
    else if (u.includes('linux')) os = 'Linux';
    return { browser, os };
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSuspendUser = async () => {
    try {
      await adminService.suspendUser(suspendModal.user._id, suspendModal.reason);
      setUsers(users.map(u =>
        u._id === suspendModal.user._id ? { ...u, status: 'suspended', suspendReason: suspendModal.reason } : u
      ));
      setSuspendModal({ show: false, user: null, reason: '' });
      showSuccess(`User ${suspendModal.user.username} has been suspended`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to suspend user');
    }
  };

  const handleUnsuspendUser = async (user) => {
    try {
      await adminService.unsuspendUser(user._id);
      setUsers(users.map(u => u._id === user._id ? { ...u, status: 'active', suspendReason: null } : u));
      showSuccess(`User ${user.username} has been reactivated`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to unsuspend user');
    }
  };

  const handleDeleteUser = async (user) => {
    if (window.confirm(t('admin.deleteUserConfirm', { username: user.username }))) {
      try {
        await adminService.deleteUser(user._id);
        setUsers(users.filter(u => u._id !== user._id));
        if (selectedUser?._id === user._id) closeUserDetail();
        showSuccess(`User ${user.username} has been deleted`);
        fetchData();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleDeleteFlashcard = async (flashcard) => {
    if (window.confirm(t('admin.deleteFlashcardConfirm', { word: flashcard[getTargetField()] || flashcard.korean, username: flashcard.userId?.username || 'unknown' }))) {
      try {
        await adminService.deleteFlashcard(flashcard._id);
        setUserFlashcards(userFlashcards.filter(f => f._id !== flashcard._id));
        showSuccess('Flashcard deleted');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete flashcard');
      }
    }
  };

  const handlePromoteToAdmin = async (user) => {
    if (window.confirm(t('admin.promoteConfirm', { username: user.username }))) {
      try {
        await adminService.updateUserRole(user._id, 'admin');
        setUsers(users.map(u => u._id === user._id ? { ...u, role: 'admin' } : u));
        showSuccess(`${user.username} is now an admin`);
        fetchData();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to update role');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return t('home.never');
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString(i18n.language, {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  const formatMode = (xpDecayEnabled) =>
    xpDecayEnabled
      ? <span className="mode-badge challenge">🔥 {t('admin.challenge')}</span>
      : <span className="mode-badge relaxed">😊 {t('admin.relaxed')}</span>;

  const formatActivity = (activityType) => {
    if (activityType === 'lesson') return `📚 ${t('navbar.lessons')}`;
    if (activityType === 'flashcard') return `🎴 ${t('navbar.flashcards')}`;
    return '—';
  };

  const formatTimeSpent = (minutes) => {
    if (!minutes || minutes === 0) return '0m';
    if (minutes < 60) return `${minutes}m`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  const langPair = (native, target) => {
    const nl = LANGUAGES[native];
    const tl = LANGUAGES[target];
    return (
      <span className="lang-pair-badge">
        {nl?.flag || '🌍'} {(native || '?').toUpperCase()}
        <span className="lang-pair-arrow">→</span>
        {tl?.flag || '🌍'} {(target || '?').toUpperCase()}
      </span>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' ||
      (filterStatus === 'active' && user.status === 'active') ||
      (filterStatus === 'suspended' && user.status === 'suspended') ||
      (filterStatus === 'admin' && user.role === 'admin');
    return matchesSearch && matchesFilter;
  });

  const detail = userDetail?.user || selectedUser;
  const detailStats = userDetail?.stats;

  if (loading) return <div className="loading">{t('admin.loadingAdmin')}</div>;

  if (error && stats.overview.totalUsers === 0 && !loading) {
    return (
      <div className="admin-container">
        <div className="container">
          <div className="error-banner">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div className="header-content">
            <h1>
              {t('admin.title').split('<1>')[0]}
              <span className="text-accent">
                {t('admin.title').match(/<1>(.*?)<\/1>/)?.[1] || t('admin.title')}
              </span>
            </h1>
            <p>{t('admin.subtitle')}</p>
          </div>
          <button className="btn btn-primary" onClick={fetchData}>{t('admin.refreshData')}</button>
        </div>

        {successMessage && <div className="success-banner">{successMessage}</div>}
        {error && <div className="error-banner">{error}</div>}

        {/* Tabs */}
        <div className="admin-tabs">
          {[
            { id: 'dashboard', icon: '📊', label: t('admin.dashboard') },
            { id: 'users', icon: '👥', label: `${t('admin.users')} (${users.length})` },
            { id: 'activity', icon: '📈', label: t('admin.activity') },
            { id: 'guests', icon: '👤', label: `Guests (${guests.total})` },
            { id: 'flashcards', icon: '🎴', label: `${t('admin.userFlashcards')} (${userFlashcards.length})` },
            { id: 'demo', icon: '▶', label: 'Demo' },
          ].map(tab => (
            <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              <span className="tab-icon">{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">

          {/* ── Dashboard Tab ── */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-section">
              <div className="stats-row">
                <div className="stat-card large primary">
                  <div className="stat-icon-wrapper"><span className="stat-emoji">👥</span></div>
                  <div className="stat-details">
                    <span className="stat-number">{stats?.overview?.totalUsers || 0}</span>
                    <span className="stat-label">{t('admin.totalUsers')}</span>
                    <span className="stat-sub">{t('admin.thisWeekStat', { count: stats?.activity?.newUsersLastWeek || 0 })}</span>
                  </div>
                </div>
                <div className="stat-card large success">
                  <div className="stat-icon-wrapper"><span className="stat-emoji">✅</span></div>
                  <div className="stat-details">
                    <span className="stat-number">{stats?.overview?.activeUsers || 0}</span>
                    <span className="stat-label">{t('admin.activeUsers')}</span>
                    <span className="stat-sub">{t('admin.onlineToday', { count: stats?.activity?.activeUsersToday || 0 })}</span>
                  </div>
                </div>
                <div className="stat-card large warning">
                  <div className="stat-icon-wrapper"><span className="stat-emoji">⏱️</span></div>
                  <div className="stat-details">
                    <span className="stat-number">{formatTimeSpent(stats?.activity?.avgTimeSpent)}</span>
                    <span className="stat-label">{t('admin.avgTimeSpent')}</span>
                    <span className="stat-sub">{t('admin.perUserSession')}</span>
                  </div>
                </div>
                <div className="stat-card large danger">
                  <div className="stat-icon-wrapper"><span className="stat-emoji">🚫</span></div>
                  <div className="stat-details">
                    <span className="stat-number">{stats?.overview?.suspendedUsers || 0}</span>
                    <span className="stat-label">{t('admin.suspended')}</span>
                    <span className="stat-sub">{t('admin.accountsBlocked')}</span>
                  </div>
                </div>
              </div>

              <div className="section-title"><h2>{t('admin.contentOverview')}</h2></div>
              <div className="stats-row small">
                {[
                  { emoji: '📚', value: stats?.overview?.totalLessons || 0, label: t('admin.totalLessons') },
                  { emoji: '🎴', value: stats?.overview?.totalFlashcards || 0, label: t('admin.totalFlashcards') },
                  { emoji: '📈', value: stats?.overview?.totalProgress || 0, label: t('admin.progressRecords') },
                  { emoji: '🔐', value: stats?.overview?.totalLogins || 0, label: t('admin.totalLogins') },
                  { emoji: '👑', value: stats?.overview?.adminCount || 0, label: t('admin.admins') },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <span className="stat-emoji">{s.emoji}</span>
                    <span className="stat-number">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="section-title"><h2>{t('admin.learningModeBreakdown')}</h2></div>
              <div className="stats-row small">
                <div className="stat-card">
                  <span className="stat-emoji">🔥</span>
                  <span className="stat-number">{stats?.overview?.challengeModeUsers || 0}</span>
                  <span className="stat-label">{t('admin.challengeMode')}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-emoji">😊</span>
                  <span className="stat-number">{stats?.overview?.relaxedModeUsers || 0}</span>
                  <span className="stat-label">{t('admin.relaxedMode')}</span>
                </div>
              </div>

              <div className="section-title"><h2>{t('admin.userRegistrations')}</h2></div>
              <div className="card growth-chart">
                <div className="chart-bars">
                  {stats.userGrowth && stats.userGrowth.length > 0 ? (
                    stats.userGrowth.map((day, idx) => {
                      const maxCount = Math.max(...stats.userGrowth.map(d => d.count), 1);
                      return (
                        <div key={idx} className="chart-bar-wrapper">
                          <div className="chart-bar-value">{day.count}</div>
                          <div className="chart-bar" style={{ height: `${Math.max((day.count / maxCount) * 100, 5)}%` }} />
                          <div className="chart-bar-label">
                            {new Date(day.date).toLocaleDateString(i18n.language, { weekday: 'short' })}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="no-data">{t('admin.noDataAvailable')}</div>
                  )}
                </div>
              </div>

              <div className="section-title"><h2>{t('admin.recentActivity')}</h2></div>
              <div className="card">
                <table className="activity-table">
                  <thead>
                    <tr>
                      <th>{t('admin.user')}</th>
                      <th>{t('admin.lastActive')}</th>
                      <th>{t('admin.timeSpent')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentActiveUsers && stats.recentActiveUsers.length > 0 ? (
                      stats.recentActiveUsers.slice(0, 5).map((user) => (
                        <tr key={user._id} className="clickable-row" onClick={() => openUserDetail(user)}>
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar-sm">{user.username.charAt(0).toUpperCase()}</div>
                              <span>{user.username}</span>
                            </div>
                          </td>
                          <td>{formatDate(user.lastActive)}</td>
                          <td>{formatTimeSpent(user.totalTimeSpent)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="3" className="no-data">{t('admin.noRecentActivity')}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Users Tab ── */}
          {activeTab === 'users' && (
            <div className="users-section">
              <div className="filters-row">
                <div className="search-bar">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder={t('admin.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filter-pills">
                  {[
                    { id: 'all', label: `${t('admin.allFilter')} (${users.length})` },
                    { id: 'active', label: `${t('admin.activeFilter')} (${users.filter(u => u.status === 'active').length})` },
                    { id: 'suspended', label: `${t('admin.suspendedFilter')} (${users.filter(u => u.status === 'suspended').length})` },
                    { id: 'admin', label: `${t('admin.adminsFilter')} (${users.filter(u => u.role === 'admin').length})` },
                  ].map(f => (
                    <button key={f.id} className={`filter-pill ${filterStatus === f.id ? 'active' : ''}`} onClick={() => setFilterStatus(f.id)}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card users-table-card">
                <div className="table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>{t('admin.user')}</th>
                        <th>Languages</th>
                        <th>Location</th>
                        <th>{t('admin.status')}</th>
                        <th>{t('admin.role')}</th>
                        <th>{t('admin.mode')}</th>
                        <th>XP</th>
                        <th>{t('admin.timeSpent')}</th>
                        <th>{t('admin.joined')}</th>
                        <th>{t('admin.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr
                          key={user._id}
                          className={`clickable-row ${user.status === 'suspended' ? 'suspended-row' : ''}`}
                          onClick={() => openUserDetail(user)}
                        >
                          <td>
                            <div className="user-cell">
                              <div className={`user-avatar-sm ${user.role === 'admin' ? 'admin' : ''}`}>
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                              <div className="user-info">
                                <span className="user-name">{user.username}</span>
                                <span className="user-email">{user.email}</span>
                              </div>
                            </div>
                          </td>
                          <td>{langPair(user.nativeLanguage, user.targetLanguage)}</td>
                          <td className="location-cell">
                            {user.lastCountry && user.lastCountry !== 'Unknown' ? (
                              <span title={user.lastCity ? `${user.lastCity}, ${user.lastCountry}` : user.lastCountry}>
                                {countryFlag(user.lastCountry)} {user.lastCountry}
                              </span>
                            ) : '—'}
                          </td>
                          <td>
                            <span className={`status-badge ${user.status}`}>
                              {user.status === 'active' ? `✓ ${t('admin.active')}` : `✕ ${t('admin.suspended')}`}
                            </span>
                          </td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role === 'admin' ? `👑 ${t('admin.adminRole')}` : t('admin.userRole')}
                            </span>
                          </td>
                          <td>{formatMode(user.xpDecayEnabled)}</td>
                          <td className="center-cell xp-cell">⭐ {user.totalXP || 0}</td>
                          <td className="center-cell">{formatTimeSpent(user.totalTimeSpent)}</td>
                          <td className="date-cell">{formatDateShort(user.createdAt)}</td>
                          <td onClick={(e) => e.stopPropagation()}>
                            <div className="actions-cell">
                              {user.role !== 'admin' && (
                                <>
                                  {user.status === 'active' ? (
                                    <button className="action-btn suspend" onClick={() => setSuspendModal({ show: true, user, reason: '' })} title={t('admin.suspendUser')}>🚫</button>
                                  ) : (
                                    <button className="action-btn unsuspend" onClick={() => handleUnsuspendUser(user)} title={t('admin.unsuspend')}>✅</button>
                                  )}
                                  <button className="action-btn promote" onClick={() => handlePromoteToAdmin(user)} title={t('admin.promoteToAdmin')}>👑</button>
                                  <button className="action-btn delete" onClick={() => handleDeleteUser(user)} title={t('admin.deleteUser')}>🗑️</button>
                                </>
                              )}
                              {user.role === 'admin' && <span className="protected-text">{t('admin.protected')}</span>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredUsers.length === 0 && (
                  <div className="no-results">
                    <span className="no-results-icon">🔍</span>
                    <p>{t('admin.noUsersFound')}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Activity Tab ── */}
          {activeTab === 'activity' && (
            <div className="activity-section">
              <div className="activity-stats">
                {[
                  { emoji: '📅', label: t('admin.today'), value: stats?.activity?.activeUsersToday || 0, sub: t('admin.activeUsers') },
                  { emoji: '📆', label: t('admin.thisWeek'), value: stats?.activity?.activeUsersThisWeek || 0, sub: t('admin.activeUsers') },
                  { emoji: '🆕', label: t('admin.newThisWeek'), value: stats?.activity?.newUsersLastWeek || 0, sub: t('admin.registrations') },
                  { emoji: '📊', label: t('admin.thisMonth'), value: stats?.activity?.newUsersLastMonth || 0, sub: t('admin.newUsers') },
                ].map((c, i) => (
                  <div key={i} className="activity-card">
                    <div className="activity-header"><span className="activity-emoji">{c.emoji}</span><h3>{c.label}</h3></div>
                    <div className="activity-value">{c.value}</div>
                    <div className="activity-label">{c.sub}</div>
                  </div>
                ))}
              </div>

              <div className="section-title"><h2>{t('admin.allRecentActivity')}</h2></div>
              <div className="card">
                <table className="activity-table full">
                  <thead>
                    <tr>
                      <th>{t('admin.user')}</th>
                      <th>{t('admin.emailCol')}</th>
                      <th>Languages</th>
                      <th>{t('admin.mode')}</th>
                      <th>{t('admin.lastActivity')}</th>
                      <th>{t('admin.lastActive')}</th>
                      <th>{t('admin.totalTime')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentActiveUsers && stats.recentActiveUsers.length > 0 ? (
                      stats.recentActiveUsers.map((user) => (
                        <tr key={user._id} className="clickable-row" onClick={() => openUserDetail(user)}>
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar-sm">{user.username.charAt(0).toUpperCase()}</div>
                              <span>{user.username}</span>
                            </div>
                          </td>
                          <td className="email-cell">{user.email}</td>
                          <td>{langPair(user.nativeLanguage, user.targetLanguage)}</td>
                          <td>{formatMode(user.xpDecayEnabled)}</td>
                          <td className="center-cell">{formatActivity(user.lastActivityType)}</td>
                          <td>{formatDate(user.lastActive)}</td>
                          <td>{formatTimeSpent(user.totalTimeSpent)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="7" className="no-data">{t('admin.noRecentActivity')}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Guests Tab ── */}
          {activeTab === 'guests' && (
            <div className="guests-section">

              {/* ── Row 1: Volume & Reach ── */}
              <div className="guest-stat-group-label">Volume &amp; Reach</div>
              <div className="stats-row small" style={{ marginBottom: 8 }}>
                {[
                  { emoji: '📅', value: guests.stats.todayCount,      label: 'Today' },
                  { emoji: '📆', value: guests.stats.weekCount,       label: 'This Week' },
                  { emoji: '👥', value: guests.total,                 label: 'All-Time Sessions' },
                  { emoji: '🌍', value: guests.stats.uniqueCountries, label: 'Countries' },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <span className="stat-emoji">{s.emoji}</span>
                    <span className="stat-number">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* ── Row 2: Engagement ── */}
              <div className="guest-stat-group-label" style={{ marginTop: 16 }}>Engagement</div>
              <div className="stats-row small" style={{ marginBottom: 8 }}>
                {[
                  {
                    emoji: '⏱️',
                    value: guests.stats.avgTimeSpent >= 60
                      ? `${Math.floor(guests.stats.avgTimeSpent / 60)}m ${guests.stats.avgTimeSpent % 60}s`
                      : `${guests.stats.avgTimeSpent}s`,
                    label: 'Avg Session Time',
                  },
                  { emoji: '🃏', value: guests.stats.totalCardsStudied,  label: 'Cards Studied (total)' },
                  { emoji: '📊', value: guests.stats.avgCardsStudied,    label: 'Avg Cards / Session' },
                  { emoji: '🔊', value: guests.stats.totalAudioPlays,    label: 'Audio Plays (total)' },
                  { emoji: '📖', value: guests.stats.totalLessonsViewed, label: 'Lessons Viewed (total)' },
                  { emoji: '✅', value: guests.stats.engagedSessions,    label: 'Sessions w/ Activity' },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <span className="stat-emoji">{s.emoji}</span>
                    <span className="stat-number">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* ── Row 3: Conversion, Device, Language ── */}
              <div className="guest-stat-group-label" style={{ marginTop: 16 }}>Conversion &amp; Device</div>
              <div className="stats-row small" style={{ marginBottom: 24 }}>
                <div className="stat-card">
                  <span className="stat-emoji">🎯</span>
                  <span className="stat-number">{guests.stats.conversions}</span>
                  <span className="stat-label">Signed Up</span>
                  <span className="stat-sub">{guests.stats.conversionRate}% conversion rate</span>
                </div>
                {/* Device breakdown */}
                {guests.stats.deviceBreakdown?.length > 0 && (
                  <div className="stat-card">
                    <span className="stat-emoji">📱</span>
                    <span className="stat-label" style={{ fontWeight: 700, marginBottom: 6 }}>Devices</span>
                    {guests.stats.deviceBreakdown.map((d, i) => (
                      <span key={i} className="stat-sub">
                        {d._id === 'mobile' ? '📱' : d._id === 'tablet' ? '📟' : d._id === 'desktop' ? '💻' : '❓'}{' '}
                        {d._id || 'unknown'}: {d.count}
                      </span>
                    ))}
                  </div>
                )}
                {/* Top language pairs */}
                {guests.stats.topLanguagePairs?.length > 0 && (
                  <div className="stat-card">
                    <span className="stat-emoji">🗣️</span>
                    <span className="stat-label" style={{ fontWeight: 700, marginBottom: 6 }}>Top Lang Pairs</span>
                    {guests.stats.topLanguagePairs.slice(0, 4).map((p, i) => (
                      <span key={i} className="stat-sub">
                        {langPair(p._id.native, p._id.target)} × {p.count}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Sessions Table ── */}
              <div className="section-title"><h2>Session Log</h2></div>
              <div className="card users-table-card">
                {guestsLoading ? (
                  <div className="no-data" style={{ padding: 40 }}>Loading guest sessions…</div>
                ) : (
                  <div className="table-container">
                    <table className="users-table guest-sessions-table">
                      <thead>
                        <tr>
                          <th>Location</th>
                          <th>Device</th>
                          <th>Language Pair</th>
                          <th>Time Spent</th>
                          <th>Cards</th>
                          <th>Accuracy</th>
                          <th>Lessons</th>
                          <th>Audio</th>
                          <th>Last Page</th>
                          <th>Referrer</th>
                          <th>First Seen</th>
                          <th>Duration</th>
                          <th>Converted</th>
                          <th>IP Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {guests.sessions.length > 0 ? (
                          guests.sessions.map((s) => {
                            const sessionSecs = s.timeSpent || 0;
                            const durationSecs = s.firstSeen && s.lastSeen
                              ? Math.floor((new Date(s.lastSeen) - new Date(s.firstSeen)) / 1000)
                              : 0;
                            const accuracy = s.cardsStudied > 0
                              ? Math.round((s.cardsCorrect / s.cardsStudied) * 100)
                              : null;
                            const fmtSecs = (sec) => sec >= 60
                              ? `${Math.floor(sec / 60)}m ${sec % 60}s`
                              : `${sec}s`;
                            const shortRef = (s.referrer || '').replace(/^https?:\/\//, '').split('/')[0];
                            return (
                              <tr
                                key={s._id}
                                className={`clickable-row${s.convertedToUser ? ' guest-row-converted' : ''}`}
                                onClick={() => setSelectedGuest(s)}
                              >
                                <td>
                                  <div className="guest-location-cell">
                                    <span className="location-flag">{countryFlag(s.countryCode)}</span>
                                    <span className="guest-location-text">
                                      {s.country !== 'Unknown' ? s.country : '—'}
                                      {s.city ? <span className="guest-city">, {s.city}</span> : null}
                                    </span>
                                  </div>
                                </td>
                                <td className="center-cell">
                                  <span className="guest-device-badge" title={s.userAgent || 'unknown'}>
                                    {s.deviceType === 'mobile'  ? '📱' :
                                     s.deviceType === 'tablet'  ? '📟' :
                                     s.deviceType === 'desktop' ? '💻' : '❓'}
                                    <span className="guest-device-label">{s.deviceType || '—'}</span>
                                  </span>
                                </td>
                                <td>{langPair(s.nativeLanguage, s.targetLanguage)}</td>
                                <td className="center-cell guest-metric">
                                  {sessionSecs > 0 ? fmtSecs(sessionSecs) : '—'}
                                </td>
                                <td className="center-cell guest-metric">
                                  {s.cardsStudied > 0
                                    ? <span>{s.cardsStudied} <span className="guest-sub-stat">({s.cardsCorrect}✓ {s.cardsIncorrect}✗)</span></span>
                                    : '—'}
                                </td>
                                <td className="center-cell">
                                  {accuracy !== null
                                    ? <span className={`guest-accuracy ${accuracy >= 70 ? 'good' : accuracy >= 40 ? 'mid' : 'low'}`}>{accuracy}%</span>
                                    : '—'}
                                </td>
                                <td className="center-cell guest-metric">{s.lessonsViewed > 0 ? s.lessonsViewed : '—'}</td>
                                <td className="center-cell guest-metric">{s.audioPlays > 0 ? s.audioPlays : '—'}</td>
                                <td className="center-cell">
                                  {s.lastActivity
                                    ? <span className="guest-activity-badge">{s.lastActivity}</span>
                                    : '—'}
                                </td>
                                <td className="date-cell" title={s.referrer || ''}>
                                  {shortRef || '—'}
                                </td>
                                <td className="date-cell">{formatDate(s.firstSeen)}</td>
                                <td className="center-cell guest-metric">
                                  {durationSecs > 0 ? fmtSecs(durationSecs) : '—'}
                                </td>
                                <td className="center-cell">
                                  {s.convertedToUser
                                    ? <span className="guest-converted-badge">✔ Signed Up</span>
                                    : <span className="guest-no-convert">—</span>}
                                </td>
                                <td className="ip-cell">{s.ip}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr><td colSpan="14" className="no-data">No guest sessions recorded yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                {/* Pagination */}
                {guests.totalPages > 1 && (
                  <div className="pagination-row">
                    <button className="btn btn-outline" disabled={guests.page <= 1} onClick={() => fetchGuests(guests.page - 1)}>← Prev</button>
                    <span className="page-info">Page {guests.page} of {guests.totalPages} ({guests.total} sessions)</span>
                    <button className="btn btn-outline" disabled={guests.page >= guests.totalPages} onClick={() => fetchGuests(guests.page + 1)}>Next →</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Flashcards Tab ── */}
          {activeTab === 'flashcards' && (
            <div className="users-section">
              <div className="section-title">
                <h2>{t('admin.userCreatedFlashcards')}</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.9rem' }}>
                  {t('admin.flashcardsPrivateNote')}
                </p>
              </div>
              <div className="card users-table-card">
                <div className="table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>{t(`languages.${getTargetLangCode()}`, getTargetLangName())}</th>
                        <th>{t(`languages.${getNativeLangCode()}`, getNativeLangName())}</th>
                        <th>{t('admin.pronunciationCol')}</th>
                        <th>{t('admin.categoryCol')}</th>
                        <th>{t('admin.createdBy')}</th>
                        <th>{t('admin.mastery')}</th>
                        <th>{t('admin.added')}</th>
                        <th>{t('admin.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userFlashcards.length > 0 ? (
                        userFlashcards.map((fc) => (
                          <tr key={fc._id}>
                            <td><strong>{fc[getTargetField()] || fc.korean}</strong></td>
                            <td>{fc[getNativeField()] || fc.english}</td>
                            <td style={{ color: 'var(--text-secondary)' }}>{fc.romanization || '—'}</td>
                            <td>{Array.isArray(fc.category) ? fc.category.join(', ') : fc.category || '—'}</td>
                            <td>
                              <div className="user-cell">
                                <div className="user-avatar-sm">{fc.userId?.username?.charAt(0).toUpperCase() || '?'}</div>
                                <div className="user-info">
                                  <span className="user-name">{fc.userId?.username || 'Unknown'}</span>
                                  <span className="user-email">{fc.userId?.email || ''}</span>
                                </div>
                              </div>
                            </td>
                            <td className="center-cell">{'★'.repeat(fc.masteryLevel)}{'☆'.repeat(5 - fc.masteryLevel)}</td>
                            <td className="date-cell">{formatDate(fc.createdAt)}</td>
                            <td>
                              <div className="actions-cell">
                                <button className="action-btn delete" onClick={() => handleDeleteFlashcard(fc)} title={t('common.delete')}>🗑️</button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="8" className="no-data">{t('admin.noUserFlashcards')}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && <AdminSpeakingDemo />}
        </div>

        {/* ── Suspend Modal ── */}
        {suspendModal.show && (
          <div className="modal-overlay" onClick={() => setSuspendModal({ show: false, user: null, reason: '' })}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{t('admin.suspendUser')}</h3>
                <button className="modal-close" onClick={() => setSuspendModal({ show: false, user: null, reason: '' })}>×</button>
              </div>
              <div className="modal-body">
                <p>{t('admin.suspendConfirm', { username: suspendModal.user?.username })}</p>
                <p className="modal-sub">{t('admin.suspendNote')}</p>
                <div className="form-group">
                  <label>{t('admin.suspendReason')}</label>
                  <textarea
                    value={suspendModal.reason}
                    onChange={(e) => setSuspendModal({ ...suspendModal, reason: e.target.value })}
                    placeholder={t('admin.enterReason')}
                    rows={3}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline" onClick={() => setSuspendModal({ show: false, user: null, reason: '' })}>{t('common.cancel')}</button>
                <button className="btn btn-danger" onClick={handleSuspendUser}>{t('admin.suspendButton')}</button>
              </div>
            </div>
          </div>
        )}

        {/* ── Guest Detail Panel ── */}
        {selectedGuest && (() => {
          const s = selectedGuest;
          const { browser, os } = parseUA(s.userAgent);
          const sessionSecs = s.timeSpent || 0;
          const durationSecs = s.firstSeen && s.lastSeen
            ? Math.floor((new Date(s.lastSeen) - new Date(s.firstSeen)) / 1000) : 0;
          const accuracy = s.cardsStudied > 0
            ? Math.round((s.cardsCorrect / s.cardsStudied) * 100) : null;
          const fmtSecs = (sec) => {
            if (!sec || sec <= 0) return '—';
            if (sec < 60) return `${sec}s`;
            const m = Math.floor(sec / 60), r = sec % 60;
            return r > 0 ? `${m}m ${r}s` : `${m}m`;
          };
          const deviceIcon = s.deviceType === 'mobile'  ? '📱' :
                             s.deviceType === 'tablet'  ? '📟' :
                             s.deviceType === 'desktop' ? '💻' : '❓';
          const deviceLabel = s.deviceType === 'mobile'  ? 'Mobile Phone' :
                              s.deviceType === 'tablet'  ? 'Tablet' :
                              s.deviceType === 'desktop' ? 'Desktop / Laptop' : 'Unknown Device';
          return (
            <div className="user-detail-overlay" onClick={closeGuestDetail}>
              <div className="user-detail-panel" onClick={(e) => e.stopPropagation()}>

                {/* ── Panel Header ── */}
                <div className="panel-header">
                  <div className="panel-avatar guest-avatar">{deviceIcon}</div>
                  <div className="panel-header-info">
                    <h2>Guest Session</h2>
                    <span className="panel-email">{s.ip}</span>
                    <div className="panel-badges">
                      <span className="guest-device-pill">{deviceIcon} {deviceLabel}</span>
                      {s.convertedToUser && (
                        <span className="guest-converted-badge">✔ Signed Up</span>
                      )}
                    </div>
                  </div>
                  <button className="panel-close" onClick={closeGuestDetail}>×</button>
                </div>

                {/* ── Panel Body ── */}
                <div className="panel-body">

                  {/* Location */}
                  <div className="panel-section">
                    <h3 className="panel-section-title">📍 Location</h3>
                    <div className="panel-grid">
                      <div className="panel-stat">
                        <span className="ps-label">Country</span>
                        <span className="ps-value">
                          {s.country && s.country !== 'Unknown'
                            ? <>{countryFlag(s.countryCode)} {s.country}</>
                            : '— Unknown'}
                        </span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">City</span>
                        <span className="ps-value">{s.city || '—'}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">IP Address</span>
                        <span className="ps-value ps-mono">{s.ip || '—'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Platform & Device */}
                  <div className="panel-section">
                    <h3 className="panel-section-title">{deviceIcon} Platform &amp; Device</h3>
                    <div className="panel-grid">
                      <div className="panel-stat">
                        <span className="ps-label">Platform</span>
                        <span className="ps-value ps-highlight">Web App</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Device Type</span>
                        <span className="ps-value">{deviceIcon} {deviceLabel}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Operating System</span>
                        <span className="ps-value">{os}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Browser</span>
                        <span className="ps-value">{browser}</span>
                      </div>
                      {s.referrer && (
                        <div className="panel-stat full-width">
                          <span className="ps-label">Referred From</span>
                          <span className="ps-value ps-mono" style={{ wordBreak: 'break-all', fontSize: '0.78rem' }}>
                            {s.referrer}
                          </span>
                        </div>
                      )}
                      {s.userAgent && (
                        <div className="panel-stat full-width">
                          <span className="ps-label">User Agent</span>
                          <span className="ps-value ps-mono" style={{ fontSize: '0.72rem', wordBreak: 'break-all', opacity: 0.75 }}>
                            {s.userAgent}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Language */}
                  <div className="panel-section">
                    <h3 className="panel-section-title">🌐 Language</h3>
                    <div className="panel-grid">
                      <div className="panel-stat">
                        <span className="ps-label">Native Language</span>
                        <span className="ps-value">{LANGUAGES[s.nativeLanguage]?.flag} {LANGUAGES[s.nativeLanguage]?.name || s.nativeLanguage}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Learning</span>
                        <span className="ps-value">{LANGUAGES[s.targetLanguage]?.flag} {LANGUAGES[s.targetLanguage]?.name || s.targetLanguage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Engagement */}
                  <div className="panel-section">
                    <h3 className="panel-section-title">📊 Engagement</h3>
                    <div className="panel-grid">
                      <div className="panel-stat">
                        <span className="ps-label">Time on Site</span>
                        <span className="ps-value ps-highlight">{fmtSecs(sessionSecs)}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Page Views</span>
                        <span className="ps-value">{s.pageViews || 0}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Cards Studied</span>
                        <span className="ps-value">{s.cardsStudied || 0}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Correct Answers</span>
                        <span className="ps-value" style={{ color: 'var(--mastered)' }}>
                          ✓ {s.cardsCorrect || 0}
                        </span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Incorrect Answers</span>
                        <span className="ps-value" style={{ color: 'var(--accent-red)' }}>
                          ✗ {s.cardsIncorrect || 0}
                        </span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Accuracy</span>
                        <span className={`ps-value guest-accuracy ${accuracy !== null ? (accuracy >= 70 ? 'good' : accuracy >= 40 ? 'mid' : 'low') : ''}`}>
                          {accuracy !== null ? `${accuracy}%` : '—'}
                        </span>
                      </div>
                      {s.cardsStudied > 0 && (
                        <div className="panel-stat full-width">
                          <span className="ps-label">Accuracy Bar</span>
                          <div className="guest-accuracy-bar">
                            <div
                              className="guest-accuracy-fill"
                              style={{ width: `${accuracy}%`, background: accuracy >= 70 ? 'var(--mastered)' : accuracy >= 40 ? '#f59e0b' : 'var(--accent-red)' }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="panel-stat">
                        <span className="ps-label">Lessons Viewed</span>
                        <span className="ps-value">{s.lessonsViewed || 0}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Audio Plays</span>
                        <span className="ps-value">🔊 {s.audioPlays || 0}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Last Page Visited</span>
                        <span className="ps-value">
                          {s.lastActivity === 'flashcards' ? '🃏 Flashcards' :
                           s.lastActivity === 'lessons'    ? '📚 Lessons'    :
                           s.lastActivity === 'home'       ? '🏠 Home'       :
                           s.lastActivity || '—'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Session Timeline */}
                  <div className="panel-section">
                    <h3 className="panel-section-title">🕒 Session Timeline</h3>
                    <div className="panel-grid">
                      <div className="panel-stat">
                        <span className="ps-label">First Seen</span>
                        <span className="ps-value">{formatDate(s.firstSeen)}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Last Seen</span>
                        <span className="ps-value">{formatDate(s.lastSeen)}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Session Duration</span>
                        <span className="ps-value ps-highlight">{fmtSecs(durationSecs)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="panel-section">
                    <h3 className="panel-section-title">🎯 Outcome</h3>
                    <div className="panel-grid">
                      <div className="panel-stat">
                        <span className="ps-label">Converted to User</span>
                        <span className="ps-value">
                          {s.convertedToUser
                            ? <span className="guest-converted-badge">✔ Signed Up</span>
                            : <span style={{ color: 'var(--text-muted)' }}>No</span>}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })()}

        {/* ── User Detail Panel ── */}
        {selectedUser && (
          <div className="user-detail-overlay" onClick={closeUserDetail}>
            <div className="user-detail-panel" onClick={(e) => e.stopPropagation()}>
              {/* Panel Header */}
              <div className="panel-header">
                <div className={`panel-avatar ${detail?.role === 'admin' ? 'admin' : ''}`}>
                  {detail?.username?.charAt(0).toUpperCase()}
                </div>
                <div className="panel-header-info">
                  <h2>{detail?.username}</h2>
                  <span className="panel-email">{detail?.email}</span>
                  <div className="panel-badges">
                    <span className={`status-badge ${detail?.status}`}>
                      {detail?.status === 'active' ? '✓ Active' : '✕ Suspended'}
                    </span>
                    <span className={`role-badge ${detail?.role}`}>
                      {detail?.role === 'admin' ? '👑 Admin' : 'User'}
                    </span>
                    {formatMode(detail?.xpDecayEnabled)}
                  </div>
                </div>
                <button className="panel-close" onClick={closeUserDetail}>×</button>
              </div>

              {/* Panel Body */}
              <div className="panel-body">
                {detailLoading ? (
                  <div className="panel-loading">Loading details…</div>
                ) : (
                  <>
                    {/* XP & Learning */}
                    <div className="panel-section">
                      <h3 className="panel-section-title">⭐ XP &amp; Learning</h3>
                      <div className="panel-grid">
                        <div className="panel-stat">
                          <span className="ps-label">Total XP</span>
                          <span className="ps-value ps-highlight">{detail?.totalXP || 0} XP</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Weekly XP</span>
                          <span className="ps-value">{detail?.weeklyXP || 0} XP</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Language Pair</span>
                          <span className="ps-value">{langPair(detail?.nativeLanguage, detail?.targetLanguage)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Flashcards Created</span>
                          <span className="ps-value">{detailStats?.flashcardCount ?? '—'}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Progress Records</span>
                          <span className="ps-value">{detailStats?.progressCount ?? '—'}</span>
                        </div>
                      </div>
                      {detailStats?.progressBreakdown && Object.keys(detailStats.progressBreakdown).length > 0 && (
                        <div className="mastery-breakdown">
                          {Object.entries(detailStats.progressBreakdown).map(([status, count]) => (
                            <span key={status} className={`mastery-chip mastery-${status}`}>{status}: {count}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Streak */}
                    <div className="panel-section">
                      <h3 className="panel-section-title">🔥 Streak</h3>
                      <div className="panel-grid">
                        <div className="panel-stat">
                          <span className="ps-label">Current Streak</span>
                          <span className="ps-value ps-highlight">🔥 {detail?.currentStreak || 0} days</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Longest Streak</span>
                          <span className="ps-value">🏆 {detail?.longestStreak || 0} days</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Last Study Date</span>
                          <span className="ps-value">{detail?.lastStudyDate || '—'}</span>
                        </div>
                      </div>
                      {detail?.streakHistory && (
                        <div className="streak-week-row">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                            <div key={i} className={`streak-dot ${detail.streakHistory[i] ? 'active' : ''}`}>
                              <span>{day}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Daily Quests */}
                    <div className="panel-section">
                      <h3 className="panel-section-title">🎯 Daily Quests</h3>
                      <div className="panel-grid">
                        <div className="panel-stat">
                          <span className="ps-label">XP Today</span>
                          <span className="ps-value">{detail?.dailyXpEarned || 0}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Time Today</span>
                          <span className="ps-value">{formatTimeSpent(detail?.dailyTimeSpent)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">High-Score Lessons</span>
                          <span className="ps-value">{detail?.dailyHighScoreLessons || 0}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Quest Reset</span>
                          <span className="ps-value">{detail?.questResetDate || '—'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Activity */}
                    <div className="panel-section">
                      <h3 className="panel-section-title">📊 Activity</h3>
                      <div className="panel-grid">
                        <div className="panel-stat">
                          <span className="ps-label">Total Time</span>
                          <span className="ps-value ps-highlight">{formatTimeSpent(detail?.totalTimeSpent)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Login Count</span>
                          <span className="ps-value">{detail?.loginCount || 0}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Last Login</span>
                          <span className="ps-value">{formatDate(detail?.lastLogin)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Last Active</span>
                          <span className="ps-value">{formatDate(detail?.lastActive)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Last Activity</span>
                          <span className="ps-value">{formatActivity(detail?.lastActivityType)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Rate Limit Hits</span>
                          <span className="ps-value">{detail?.rateLimitHits || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="panel-section">
                      <h3 className="panel-section-title">📍 Location</h3>
                      <div className="panel-grid">
                        <div className="panel-stat">
                          <span className="ps-label">Country</span>
                          <span className="ps-value">
                            {detail?.lastCountry && detail.lastCountry !== 'Unknown'
                              ? <>{countryFlag(detail.lastCountry)} {detail.lastCountry}</>
                              : '—'}
                          </span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">City</span>
                          <span className="ps-value">{detail?.lastCity || '—'}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">IP Address</span>
                          <span className="ps-value ps-mono">{detail?.lastIp || '—'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Account */}
                    <div className="panel-section">
                      <h3 className="panel-section-title">🔐 Account</h3>
                      <div className="panel-grid">
                        <div className="panel-stat">
                          <span className="ps-label">Joined</span>
                          <span className="ps-value">{formatDate(detail?.createdAt)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Email Verified</span>
                          <span className="ps-value">{detail?.emailVerified ? '✅ Yes' : '❌ No'}</span>
                        </div>
                        {detail?.suspendReason && (
                          <div className="panel-stat full-width">
                            <span className="ps-label">Suspend Reason</span>
                            <span className="ps-value">{detail.suspendReason}</span>
                          </div>
                        )}
                        {detail?.suspendedAt && (
                          <div className="panel-stat">
                            <span className="ps-label">Suspended At</span>
                            <span className="ps-value">{formatDate(detail.suspendedAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Panel Actions */}
                    {detail?.role !== 'admin' && (
                      <div className="panel-actions">
                        {detail?.status === 'active' ? (
                          <button className="btn btn-danger" onClick={() => { closeUserDetail(); setSuspendModal({ show: true, user: detail, reason: '' }); }}>
                            🚫 Suspend
                          </button>
                        ) : (
                          <button className="btn btn-primary" onClick={() => { handleUnsuspendUser(detail); closeUserDetail(); }}>
                            ✅ Unsuspend
                          </button>
                        )}
                        <button className="btn btn-outline" onClick={() => { handleDeleteUser(detail); }}>
                          🗑️ Delete User
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
