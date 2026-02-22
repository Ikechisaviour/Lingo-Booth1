import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    overview: {
      totalUsers: 0,
      activeUsers: 0,
      suspendedUsers: 0,
      adminCount: 0,
      totalLessons: 0,
      totalFlashcards: 0,
      totalProgress: 0,
      totalLogins: 0,
      challengeModeUsers: 0,
      relaxedModeUsers: 0,
    },
    activity: {
      activeUsersToday: 0,
      activeUsersThisWeek: 0,
      avgTimeSpent: 0,
      newUsersLastWeek: 0,
      newUsersLastMonth: 0,
    },
    userGrowth: [],
    recentActiveUsers: [],
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [suspendModal, setSuspendModal] = useState({ show: false, user: null, reason: '' });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsResponse, usersResponse] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers(),
      ]);
      // Safely merge stats with defaults
      const data = statsResponse.data || {};
      setStats(prev => ({
        overview: { ...prev.overview, ...(data.overview || {}) },
        activity: { ...prev.activity, ...(data.activity || {}) },
        userGrowth: data.userGrowth || [],
        recentActiveUsers: data.recentActiveUsers || [],
      }));
      setUsers(usersResponse.data || []);
      setError('');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
      setError(`Error: ${errorMsg}. Try logging out and back in.`);
      console.error('Admin API Error:', err.response?.status, err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSuspendUser = async () => {
    try {
      await adminService.suspendUser(suspendModal.user._id, suspendModal.reason);
      setUsers(users.map(u =>
        u._id === suspendModal.user._id
          ? { ...u, status: 'suspended', suspendReason: suspendModal.reason }
          : u
      ));
      setSuspendModal({ show: false, user: null, reason: '' });
      showSuccess(`User ${suspendModal.user.username} has been suspended`);
      fetchData(); // Refresh stats
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to suspend user');
    }
  };

  const handleUnsuspendUser = async (user) => {
    try {
      await adminService.unsuspendUser(user._id);
      setUsers(users.map(u =>
        u._id === user._id ? { ...u, status: 'active', suspendReason: null } : u
      ));
      showSuccess(`User ${user.username} has been reactivated`);
      fetchData(); // Refresh stats
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to unsuspend user');
    }
  };

  const handleDeleteUser = async (user) => {
    if (window.confirm(`Are you sure you want to permanently delete "${user.username}"? This will also delete all their data and cannot be undone.`)) {
      try {
        await adminService.deleteUser(user._id);
        setUsers(users.filter(u => u._id !== user._id));
        showSuccess(`User ${user.username} has been deleted`);
        fetchData(); // Refresh stats
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handlePromoteToAdmin = async (user) => {
    if (window.confirm(`Promote ${user.username} to admin? They will have full access to this dashboard.`)) {
      try {
        await adminService.updateUserRole(user._id, 'admin');
        setUsers(users.map(u =>
          u._id === user._id ? { ...u, role: 'admin' } : u
        ));
        showSuccess(`${user.username} is now an admin`);
        fetchData();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to update role');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatMode = (xpDecayEnabled) => {
    return xpDecayEnabled
      ? <span className="mode-badge challenge">🔥 Challenge</span>
      : <span className="mode-badge relaxed">😊 Relaxed</span>;
  };

  const formatActivity = (activityType) => {
    if (activityType === 'lesson') return '📚 Lessons';
    if (activityType === 'flashcard') return '🎴 Flashcards';
    return '—';
  };

  const formatTimeSpent = (minutes) => {
    if (!minutes || minutes === 0) return '0m';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
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

  if (loading) {
    return <div className="loading">Loading admin dashboard...</div>;
  }

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
            <h1>Admin <span className="text-accent">Dashboard</span></h1>
            <p>Monitor activity, manage users, and view analytics</p>
          </div>
          <button className="btn btn-primary" onClick={fetchData}>
            Refresh Data
          </button>
        </div>

        {/* Messages */}
        {successMessage && <div className="success-banner">{successMessage}</div>}
        {error && <div className="error-banner">{error}</div>}

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="tab-icon">📊</span>
            Dashboard
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <span className="tab-icon">👥</span>
            Users ({users.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <span className="tab-icon">📈</span>
            Activity
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-section">
              {/* Overview Stats */}
              <div className="stats-row">
                <div className="stat-card large primary">
                  <div className="stat-icon-wrapper">
                    <span className="stat-emoji">👥</span>
                  </div>
                  <div className="stat-details">
                    <span className="stat-number">{stats?.overview?.totalUsers || 0}</span>
                    <span className="stat-label">Total Users</span>
                    <span className="stat-sub">+{stats?.activity?.newUsersLastWeek || 0} this week</span>
                  </div>
                </div>

                <div className="stat-card large success">
                  <div className="stat-icon-wrapper">
                    <span className="stat-emoji">✅</span>
                  </div>
                  <div className="stat-details">
                    <span className="stat-number">{stats?.overview?.activeUsers || 0}</span>
                    <span className="stat-label">Active Users</span>
                    <span className="stat-sub">{stats?.activity?.activeUsersToday || 0} online today</span>
                  </div>
                </div>

                <div className="stat-card large warning">
                  <div className="stat-icon-wrapper">
                    <span className="stat-emoji">⏱️</span>
                  </div>
                  <div className="stat-details">
                    <span className="stat-number">{formatTimeSpent(stats?.activity?.avgTimeSpent)}</span>
                    <span className="stat-label">Avg. Time Spent</span>
                    <span className="stat-sub">Per user session</span>
                  </div>
                </div>

                <div className="stat-card large danger">
                  <div className="stat-icon-wrapper">
                    <span className="stat-emoji">🚫</span>
                  </div>
                  <div className="stat-details">
                    <span className="stat-number">{stats?.overview?.suspendedUsers || 0}</span>
                    <span className="stat-label">Suspended</span>
                    <span className="stat-sub">Accounts blocked</span>
                  </div>
                </div>
              </div>

              {/* Content Stats */}
              <div className="section-title">
                <h2>Content Overview</h2>
              </div>
              <div className="stats-row small">
                <div className="stat-card">
                  <span className="stat-emoji">📚</span>
                  <span className="stat-number">{stats?.overview?.totalLessons || 0}</span>
                  <span className="stat-label">Lessons</span>
                </div>
                <div className="stat-card">
                  <span className="stat-emoji">🎴</span>
                  <span className="stat-number">{stats?.overview?.totalFlashcards || 0}</span>
                  <span className="stat-label">Flashcards</span>
                </div>
                <div className="stat-card">
                  <span className="stat-emoji">📈</span>
                  <span className="stat-number">{stats?.overview?.totalProgress || 0}</span>
                  <span className="stat-label">Progress Records</span>
                </div>
                <div className="stat-card">
                  <span className="stat-emoji">🔐</span>
                  <span className="stat-number">{stats?.overview?.totalLogins || 0}</span>
                  <span className="stat-label">Total Logins</span>
                </div>
                <div className="stat-card">
                  <span className="stat-emoji">👑</span>
                  <span className="stat-number">{stats?.overview?.adminCount || 0}</span>
                  <span className="stat-label">Admins</span>
                </div>
              </div>

              {/* Mode Breakdown */}
              <div className="section-title">
                <h2>Learning Mode Breakdown</h2>
              </div>
              <div className="stats-row small">
                <div className="stat-card">
                  <span className="stat-emoji">🔥</span>
                  <span className="stat-number">{stats?.overview?.challengeModeUsers || 0}</span>
                  <span className="stat-label">Challenge Mode</span>
                </div>
                <div className="stat-card">
                  <span className="stat-emoji">😊</span>
                  <span className="stat-number">{stats?.overview?.relaxedModeUsers || 0}</span>
                  <span className="stat-label">Relaxed Mode</span>
                </div>
              </div>

              {/* User Growth Chart */}
              <div className="section-title">
                <h2>User Registrations (Last 7 Days)</h2>
              </div>
              <div className="card growth-chart">
                <div className="chart-bars">
                  {stats.userGrowth && stats.userGrowth.length > 0 ? (
                    stats.userGrowth.map((day, idx) => {
                      const maxCount = Math.max(...stats.userGrowth.map(d => d.count), 1);
                      const height = (day.count / maxCount) * 100;
                      return (
                        <div key={idx} className="chart-bar-wrapper">
                          <div className="chart-bar-value">{day.count}</div>
                          <div
                            className="chart-bar"
                            style={{ height: `${Math.max(height, 5)}%` }}
                          ></div>
                          <div className="chart-bar-label">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="no-data">No data available yet</div>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="section-title">
                <h2>Recent Activity</h2>
              </div>
              <div className="card">
                <table className="activity-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Last Active</th>
                      <th>Time Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentActiveUsers && stats.recentActiveUsers.length > 0 ? (
                      stats.recentActiveUsers.slice(0, 5).map((user) => (
                        <tr key={user._id}>
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
                      <tr><td colSpan="3" className="no-data">No recent activity</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="users-section">
              {/* Filters */}
              <div className="filters-row">
                <div className="search-bar">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search by username or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filter-pills">
                  <button
                    className={`filter-pill ${filterStatus === 'all' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('all')}
                  >
                    All ({users.length})
                  </button>
                  <button
                    className={`filter-pill ${filterStatus === 'active' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('active')}
                  >
                    Active ({users.filter(u => u.status === 'active').length})
                  </button>
                  <button
                    className={`filter-pill ${filterStatus === 'suspended' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('suspended')}
                  >
                    Suspended ({users.filter(u => u.status === 'suspended').length})
                  </button>
                  <button
                    className={`filter-pill ${filterStatus === 'admin' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('admin')}
                  >
                    Admins ({users.filter(u => u.role === 'admin').length})
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className="card users-table-card">
                <div className="table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Mode</th>
                        <th>Last Activity</th>
                        <th>Last Login</th>
                        <th>Logins</th>
                        <th>Time Spent</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user._id} className={user.status === 'suspended' ? 'suspended-row' : ''}>
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
                          <td>
                            <span className={`status-badge ${user.status}`}>
                              {user.status === 'active' ? '✓ Active' : '✕ Suspended'}
                            </span>
                          </td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role === 'admin' ? '👑 Admin' : 'User'}
                            </span>
                          </td>
                          <td>{formatMode(user.xpDecayEnabled)}</td>
                          <td className="center-cell">{formatActivity(user.lastActivityType)}</td>
                          <td className="date-cell">{formatDate(user.lastLogin)}</td>
                          <td className="center-cell">{user.loginCount || 0}</td>
                          <td className="center-cell">{formatTimeSpent(user.totalTimeSpent)}</td>
                          <td className="date-cell">{formatDate(user.createdAt)}</td>
                          <td>
                            <div className="actions-cell">
                              {user.role !== 'admin' && (
                                <>
                                  {user.status === 'active' ? (
                                    <button
                                      className="action-btn suspend"
                                      onClick={() => setSuspendModal({ show: true, user, reason: '' })}
                                      title="Suspend user"
                                    >
                                      🚫
                                    </button>
                                  ) : (
                                    <button
                                      className="action-btn unsuspend"
                                      onClick={() => handleUnsuspendUser(user)}
                                      title="Reactivate user"
                                    >
                                      ✅
                                    </button>
                                  )}
                                  <button
                                    className="action-btn promote"
                                    onClick={() => handlePromoteToAdmin(user)}
                                    title="Make admin"
                                  >
                                    👑
                                  </button>
                                  <button
                                    className="action-btn delete"
                                    onClick={() => handleDeleteUser(user)}
                                    title="Delete user"
                                  >
                                    🗑️
                                  </button>
                                </>
                              )}
                              {user.role === 'admin' && (
                                <span className="protected-text">Protected</span>
                              )}
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
                    <p>No users found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="activity-section">
              <div className="activity-stats">
                <div className="activity-card">
                  <div className="activity-header">
                    <span className="activity-emoji">📅</span>
                    <h3>Today</h3>
                  </div>
                  <div className="activity-value">{stats?.activity?.activeUsersToday || 0}</div>
                  <div className="activity-label">Active users</div>
                </div>

                <div className="activity-card">
                  <div className="activity-header">
                    <span className="activity-emoji">📆</span>
                    <h3>This Week</h3>
                  </div>
                  <div className="activity-value">{stats?.activity?.activeUsersThisWeek || 0}</div>
                  <div className="activity-label">Active users</div>
                </div>

                <div className="activity-card">
                  <div className="activity-header">
                    <span className="activity-emoji">🆕</span>
                    <h3>New This Week</h3>
                  </div>
                  <div className="activity-value">{stats?.activity?.newUsersLastWeek || 0}</div>
                  <div className="activity-label">Registrations</div>
                </div>

                <div className="activity-card">
                  <div className="activity-header">
                    <span className="activity-emoji">📊</span>
                    <h3>This Month</h3>
                  </div>
                  <div className="activity-value">{stats?.activity?.newUsersLastMonth || 0}</div>
                  <div className="activity-label">New users</div>
                </div>
              </div>

              <div className="section-title">
                <h2>All Recent Activity</h2>
              </div>
              <div className="card">
                <table className="activity-table full">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Mode</th>
                      <th>Last Activity</th>
                      <th>Last Active</th>
                      <th>Total Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentActiveUsers && stats.recentActiveUsers.length > 0 ? (
                      stats.recentActiveUsers.map((user) => (
                        <tr key={user._id}>
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar-sm">{user.username.charAt(0).toUpperCase()}</div>
                              <span>{user.username}</span>
                            </div>
                          </td>
                          <td className="email-cell">{user.email}</td>
                          <td>{formatMode(user.xpDecayEnabled)}</td>
                          <td className="center-cell">{formatActivity(user.lastActivityType)}</td>
                          <td>{formatDate(user.lastActive)}</td>
                          <td>{formatTimeSpent(user.totalTimeSpent)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="6" className="no-data">No recent activity</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Suspend Modal */}
        {suspendModal.show && (
          <div className="modal-overlay" onClick={() => setSuspendModal({ show: false, user: null, reason: '' })}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Suspend User</h3>
                <button className="modal-close" onClick={() => setSuspendModal({ show: false, user: null, reason: '' })}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to suspend <strong>{suspendModal.user?.username}</strong>?</p>
                <p className="modal-sub">This user will not be able to log in until reactivated.</p>
                <div className="form-group">
                  <label>Reason for suspension (optional)</label>
                  <textarea
                    value={suspendModal.reason}
                    onChange={(e) => setSuspendModal({ ...suspendModal, reason: e.target.value })}
                    placeholder="Enter reason..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline" onClick={() => setSuspendModal({ show: false, user: null, reason: '' })}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleSuspendUser}>
                  Suspend User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
