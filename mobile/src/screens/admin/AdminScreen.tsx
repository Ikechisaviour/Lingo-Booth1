import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, Button, Card, TextInput, Searchbar, Chip, SegmentedButtons } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { adminService, aiService } from '../../services/api';
import speechService from '../../services/speechService';
import { useAppColors, type AppColors } from '../../config/theme';
import { useSettingsStore } from '../../stores/settingsStore';
import LANGUAGES, { getLanguageDisplayName } from '../../config/languages';
import AdminFailureQueue from './AdminFailureQueue';
import AdminContactMessages from './AdminContactMessages';

type Tab = 'dashboard' | 'users' | 'guests' | 'failures' | 'messages' | 'demo';
type SenderFilter = 'all' | 'registered' | 'guest';

type SpeechPart = {
  language?: string;
  text?: string;
};

const AdminScreen: React.FC = () => {
  const { t } = useTranslation();
  const languageOptions = useMemo(() => Object.entries(LANGUAGES).map(([value, language]) => ({
    value,
    label: getLanguageDisplayName(value, t),
    speech: language.ttsLocale,
  })), [t]);
  const difficultyOptions = useMemo(() => [
    { value: 'casual beginner', label: t('admin.demoDifficulty.beginner', 'Beginner') },
    { value: 'balanced', label: t('admin.demoDifficulty.balanced', 'Balanced') },
    { value: 'more natural', label: t('admin.demoDifficulty.natural', 'Natural') },
    { value: 'challenge me', label: t('admin.demoDifficulty.challenge', 'Challenge') },
  ], [t]);
  const demoScenarios = useMemo(() => [
    t('admin.demoScenarios.friendlyChat', 'Friendly chat'),
    t('admin.demoScenarios.cafeWorker', 'Talking with a cafe worker'),
    t('admin.demoScenarios.taxiDriver', 'Asking a taxi driver for help'),
    t('admin.demoScenarios.meetingNew', 'Meeting someone new'),
  ], [t]);
  const statusLabel = useCallback((value?: string) => {
    if (value === 'active') return t('admin.active', 'Active');
    if (value === 'suspended') return t('admin.suspended', 'Suspended');
    return value || t('admin.unknown', 'Unknown');
  }, [t]);
  const roleLabel = useCallback((value?: string) => (
    value === 'admin' ? t('admin.adminRole', 'Admin') : t('admin.userRole', 'User')
  ), [t]);
  const colors = useAppColors();
  const preferredVoice = useSettingsStore((state) => state.preferredVoice);
  const preferredVoices = useSettingsStore((state) => state.preferredVoices);

  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [guests, setGuests] = useState<any>(null);
  const [guestsPage, setGuestsPage] = useState(1);
  const [loadingGuests, setLoadingGuests] = useState(false);
  const [errorReports, setErrorReports] = useState<any>({
    reports: [],
    total: 0,
    page: 1,
    totalPages: 1,
    openCount: 0,
    criticalOpenCount: 0,
  });
  const [errorReportsLoading, setErrorReportsLoading] = useState(false);
  const [errorReportsClearing, setErrorReportsClearing] = useState(false);
  const [contactMessages, setContactMessages] = useState<any>({
    messages: [],
    total: 0,
    page: 1,
    totalPages: 1,
    openCount: 0,
    registeredCount: 0,
    guestCount: 0,
  });
  const [contactMessagesLoading, setContactMessagesLoading] = useState(false);
  const [contactMessagesClearing, setContactMessagesClearing] = useState(false);
  const [contactSenderFilter, setContactSenderFilter] = useState<SenderFilter>('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [suspendModal, setSuspendModal] = useState<{ userId: string; username: string } | null>(null);
  const [suspendReason, setSuspendReason] = useState('');
  const [demoScenario, setDemoScenario] = useState(() => demoScenarios[0]);
  const [demoTurn, setDemoTurn] = useState('');
  const [demoTranscript, setDemoTranscript] = useState('');
  const [demoReply, setDemoReply] = useState(() => t('admin.demoReplyPlaceholder', 'The practice partner response will appear here.'));
  const [demoTip, setDemoTip] = useState(() => t('admin.demoTipPlaceholder', 'Ask in either selected language. You can change topic, ask for meanings, or request easier wording.'));
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoTargetLanguage, setDemoTargetLanguage] = useState('ko');
  const [demoNativeLanguage, setDemoNativeLanguage] = useState('en');
  const [demoInputLanguage, setDemoInputLanguage] = useState('ko');
  const [demoDifficulty, setDemoDifficulty] = useState('casual beginner');
  const [demoHistory, setDemoHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  // User detail modal
  const [userDetail, setUserDetail] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await adminService.getStats();
      setStats(res.data);
    } catch {}
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await adminService.getUsers();
      setUsers(res.data);
    } catch {}
  }, []);

  const fetchGuests = useCallback(async (page = 1) => {
    try {
      setLoadingGuests(true);
      const res = await adminService.getGuests(page);
      setGuests(res.data);
      setGuestsPage(page);
    } catch {} finally {
      setLoadingGuests(false);
    }
  }, []);

  const fetchErrorReports = useCallback(async (page = 1) => {
    try {
      setErrorReportsLoading(true);
      const res = await adminService.getErrorReports({ page, status: 'open' });
      setErrorReports(res.data);
    } catch {} finally {
      setErrorReportsLoading(false);
    }
  }, []);

  const fetchContactMessages = useCallback(async (page = 1, senderType: SenderFilter = contactSenderFilter) => {
    try {
      setContactMessagesLoading(true);
      const res = await adminService.getContactMessages({ page, status: 'open', senderType });
      setContactMessages(res.data);
    } catch {} finally {
      setContactMessagesLoading(false);
    }
  }, [contactSenderFilter]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchStats(), fetchUsers()]);
    setLoading(false);
  }, [fetchStats, fetchUsers]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    setDemoScenario((current) => (demoScenarios.includes(current) ? current : demoScenarios[0]));
  }, [demoScenarios]);

  // Fetch guests when tab selected
  useEffect(() => {
    if (activeTab === 'guests' && !guests) {
      fetchGuests(1);
    }
    if (activeTab === 'failures' && errorReports.reports.length === 0) {
      fetchErrorReports(1);
    }
    if (activeTab === 'messages' && contactMessages.messages.length === 0) {
      fetchContactMessages(1);
    }
  }, [activeTab, contactMessages.messages.length, errorReports.reports.length, fetchContactMessages, fetchErrorReports, fetchGuests, guests]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAll();
    if (activeTab === 'guests') await fetchGuests(1);
    if (activeTab === 'failures') await fetchErrorReports(errorReports.page || 1);
    if (activeTab === 'messages') await fetchContactMessages(contactMessages.page || 1);
    setRefreshing(false);
  };

  const handleViewUserDetail = async (userId: string) => {
    setShowUserDetail(true);
    setLoadingDetail(true);
    try {
      const res = await adminService.getUser(userId);
      setUserDetail(res.data);
    } catch {
      setUserDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleSuspend = async () => {
    if (!suspendModal) return;
    try {
      await adminService.suspendUser(suspendModal.userId, suspendReason);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === suspendModal.userId ? { ...u, status: 'suspended', suspendReason } : u,
        ),
      );
      setSuspendModal(null);
      setSuspendReason('');
    } catch {}
  };

  const handleUnsuspend = async (userId: string) => {
    try {
      await adminService.unsuspendUser(userId);
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, status: 'active' } : u)));
    } catch {}
  };

  const handlePromote = (userId: string, username: string) => {
    Alert.alert(
      t('admin.promoteToAdmin', 'Promote to Admin'),
      t('admin.promoteConfirmShort', { username, defaultValue: 'Make {{username}} an admin?' }),
      [
        { text: t('common.cancel', 'Cancel'), style: 'cancel' },
        {
          text: t('admin.promote', 'Promote'),
          onPress: async () => {
            try {
              await adminService.updateUserRole(userId, 'admin');
              setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: 'admin' } : u)));
            } catch {}
          },
        },
      ],
    );
  };

  const handleDelete = (userId: string, username: string) => {
    Alert.alert(t('admin.deleteUserTitle', 'Delete User'), t('admin.deleteUserConfirmShort', { username, defaultValue: 'Permanently delete {{username}}? This cannot be undone.' }), [
      { text: t('common.cancel', 'Cancel'), style: 'cancel' },
      {
        text: t('admin.deleteUser', 'Delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await adminService.deleteUser(userId);
            setUsers((prev) => prev.filter((u) => u._id !== userId));
          } catch {}
        },
      },
    ]);
  };

  const acknowledgeErrorReport = async (reportId: string) => {
    try {
      await adminService.acknowledgeErrorReport(reportId);
      setErrorReports((current: any) => ({
        ...current,
        reports: current.reports.filter((report: any) => report._id !== reportId),
        openCount: Math.max(0, (current.openCount || 0) - 1),
      }));
    } catch {}
  };

  const clearOpenErrorReports = () => {
    Alert.alert(
      t('admin.clearFailuresTitle', 'Clear open failures?'),
      t('admin.clearFailuresBody', { count: errorReports.openCount || 0, defaultValue: 'Mark all {{count}} open failures as acknowledged?' }),
      [
        { text: t('common.cancel', 'Cancel'), style: 'cancel' },
        {
          text: t('common.clearAll', 'Clear All'),
          style: 'destructive',
          onPress: async () => {
            try {
              setErrorReportsClearing(true);
              await adminService.clearOpenErrorReports();
              await fetchErrorReports(1);
            } catch {} finally {
              setErrorReportsClearing(false);
            }
          },
        },
      ],
    );
  };

  const acknowledgeContactMessage = async (messageId: string) => {
    try {
      const message = contactMessages.messages.find((item: any) => item._id === messageId);
      await adminService.acknowledgeContactMessage(messageId);
      setContactMessages((current: any) => ({
        ...current,
        messages: current.messages.filter((item: any) => item._id !== messageId),
        openCount: Math.max(0, (current.openCount || 0) - 1),
        registeredCount: message?.session?.isGuest ? current.registeredCount : Math.max(0, (current.registeredCount || 0) - 1),
        guestCount: message?.session?.isGuest ? Math.max(0, (current.guestCount || 0) - 1) : current.guestCount,
      }));
    } catch {}
  };

  const clearOpenContactMessages = () => {
    Alert.alert(
      t('admin.clearMessagesTitle', 'Clear unread messages?'),
      t('admin.clearMessagesBody', { count: contactMessages.openCount || 0, defaultValue: 'Mark all {{count}} unread contact messages as read?' }),
      [
        { text: t('common.cancel', 'Cancel'), style: 'cancel' },
        {
          text: t('common.clearAll', 'Clear All'),
          style: 'destructive',
          onPress: async () => {
            try {
              setContactMessagesClearing(true);
              await adminService.clearOpenContactMessages();
              await fetchContactMessages(1);
            } catch {} finally {
              setContactMessagesClearing(false);
            }
          },
        },
      ],
    );
  };

  const handleContactSenderFilterChange = (filter: SenderFilter) => {
    setContactSenderFilter(filter);
    setContactMessages((current: any) => ({ ...current, messages: [], page: 1 }));
    fetchContactMessages(1, filter);
  };

  const filteredUsers = users
    .filter((u) => {
      if (statusFilter === 'active') return u.status === 'active';
      if (statusFilter === 'suspended') return u.status === 'suspended';
      if (statusFilter === 'admin') return u.role === 'admin';
      return true;
    })
    .filter((u) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return u.username?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
    });

  const resetDemo = () => {
    setDemoHistory([]);
    setDemoTranscript('');
    setDemoReply(t('admin.demoReplyPlaceholder', 'The practice partner response will appear here.'));
    setDemoTip(t('admin.demoReset', 'Conversation reset.'));
  };

  const voiceForDemoLanguage = (languageId?: string) => (
    (languageId && preferredVoices?.[languageId])
    || (languageId === demoTargetLanguage ? preferredVoice || undefined : undefined)
    || undefined
  );

  const speakDemoReply = async (data: any, reply: string) => {
    const speechParts: SpeechPart[] = Array.isArray(data.speechParts) ? data.speechParts : [];
    if (speechParts.length) {
      for (const part of speechParts) {
        if (part.text) {
          const speechLang = languageOptions.find((language) => language.value === part.language)?.speech || 'ko-KR';
          await speechService.speakAsync(part.text, {
            lang: speechLang,
            voice: voiceForDemoLanguage(part.language),
          });
        }
      }
      return;
    }

    if (reply) {
      const speechLang = data.expectedLanguage === demoNativeLanguage
        ? languageOptions.find((language) => language.value === demoNativeLanguage)?.speech
        : languageOptions.find((language) => language.value === demoTargetLanguage)?.speech;
      await speechService.speakAsync(reply, {
        lang: speechLang || 'ko-KR',
        voice: voiceForDemoLanguage(data.expectedLanguage),
      });
    }
  };

  const analyticsFeatureLabel = (feature?: string) => {
    if (feature === 'class') return t('adminAnalytics.features.class', 'Class');
    if (feature === 'conversation') return t('adminAnalytics.features.conversation', 'Conversation');
    if (feature === 'quiz') return t('adminAnalytics.features.quiz', 'Quiz');
    if (feature === 'flashcards') return t('adminAnalytics.features.flashcards', 'Flashcards');
    if (feature === 'writing') return t('adminAnalytics.features.writing', 'Writing');
    if (feature === 'review') return t('adminAnalytics.features.review', 'Review');
    if (feature === 'voice') return t('adminAnalytics.features.voice', 'Voice');
    return t('adminAnalytics.features.other', 'Other');
  };

  const analyticsSkillLabel = (skill?: string) => {
    if (skill === 'listening') return t('skills.listening', 'Listening');
    if (skill === 'speaking') return t('skills.speaking', 'Speaking');
    if (skill === 'reading') return t('skills.reading', 'Reading');
    if (skill === 'writing') return t('skills.writing', 'Writing');
    return t('adminAnalytics.unknownSkill', 'Unknown skill');
  };

  const learningAnalytics = stats?.learningAnalytics || {};
  const analyticsTotals = learningAnalytics?.totals || {};

  const sendDemoTurn = async () => {
    const text = demoTurn.trim();
    if (!text) return;
    await speechService.cancel();
    setDemoLoading(true);
    setDemoTranscript(text);
    setDemoTurn('');

    try {
      const response = await aiService.sendConversationTurn({
        sessionId: 'admin-speaking-demo',
        scenario: demoScenario,
        targetLanguage: demoTargetLanguage,
        nativeLanguage: demoNativeLanguage,
        inputLanguage: demoInputLanguage,
        difficulty: demoDifficulty,
        transcript: text,
        history: demoHistory,
      });
      const data = response.data || {};
      const reply = data.reply || '';
      setDemoReply(reply || t('admin.demoNoReply', 'No reply returned.'));
      setDemoTip(data.coachingTip || t('admin.demoNoCoachingNote', 'No coaching note.'));
      setDemoHistory((prev) => [
        ...prev.slice(-6),
        { role: 'user', content: text },
        { role: 'assistant', content: reply },
      ]);
      await speakDemoReply(data, reply);
    } catch (error: any) {
      setDemoReply(t('admin.demoResponseFailed', 'I could not respond this time. Please try again.'));
      setDemoTip(error.response?.data?.message || t('admin.demoConnectionIssue', 'Connection issue. Try again in a moment.'));
    } finally {
      setDemoLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.headerTitle}>
          ⚙️ {t('admin.title', 'Admin Dashboard')}
        </Text>
      </View>

      {/* Tab switcher */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabRow}
        style={styles.tabScroller}
      >
        <Chip selected={activeTab === 'dashboard'} onPress={() => setActiveTab('dashboard')} style={styles.tabChip}>
          {t('admin.dashboard', 'Dashboard')}
        </Chip>
        <Chip selected={activeTab === 'users'} onPress={() => setActiveTab('users')} style={styles.tabChip}>
          {t('admin.users', 'Users')} ({users.length})
        </Chip>
        <Chip selected={activeTab === 'guests'} onPress={() => setActiveTab('guests')} style={styles.tabChip}>
          {t('admin.guests', 'Guests')}
        </Chip>
        <Chip selected={activeTab === 'failures'} onPress={() => setActiveTab('failures')} style={styles.tabChip}>
          {t('admin.failures', 'Failures')} ({errorReports.openCount || stats?.overview?.openErrorReports || 0})
        </Chip>
        <Chip selected={activeTab === 'messages'} onPress={() => setActiveTab('messages')} style={styles.tabChip}>
          {t('admin.messages', 'Messages')} ({contactMessages.openCount || stats?.overview?.openContactMessages || 0})
        </Chip>
        <Chip selected={activeTab === 'demo'} onPress={() => setActiveTab('demo')} style={styles.tabChip}>
          {t('admin.demo', 'Demo')}
        </Chip>
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
      >
        {/* ── Dashboard tab ── */}
        {activeTab === 'dashboard' && stats && (
          <>
            {/* Overview stats */}
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <Text style={styles.statNumber}>{stats.overview?.totalUsers || 0}</Text>
                  <Text style={styles.statLabel}>{t('admin.totalUsers', 'Total Users')}</Text>
                </Card.Content>
              </Card>
              <Card style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <Text style={styles.statNumber}>{stats.activity?.activeUsersThisWeek || stats.overview?.activeUsers || 0}</Text>
                  <Text style={styles.statLabel}>{t('admin.activeUsers', 'Active (7d)')}</Text>
                </Card.Content>
              </Card>
              <Card style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <Text style={styles.statNumber}>{stats.overview?.suspendedUsers || 0}</Text>
                  <Text style={styles.statLabel}>{t('admin.suspended', 'Suspended')}</Text>
                </Card.Content>
              </Card>
              <Card style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <Text style={styles.statNumber}>{stats.activity?.avgTimeSpent || stats.overview?.avgTimeSpent || 0}m</Text>
                  <Text style={styles.statLabel}>{t('admin.avgTime', 'Avg Time')}</Text>
                </Card.Content>
              </Card>
              <Card style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <Text style={styles.statNumber}>{stats.activity?.activeUsersToday || stats.overview?.activeToday || 0}</Text>
                  <Text style={styles.statLabel}>{t('admin.activeToday', 'Active Today')}</Text>
                </Card.Content>
              </Card>
              <Card style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <Text style={styles.statNumber}>{stats.activity?.newUsersLastWeek || stats.overview?.newUsersThisWeek || 0}</Text>
                  <Text style={styles.statLabel}>{t('admin.newThisWeek', 'New This Week')}</Text>
                </Card.Content>
              </Card>
            </View>

            <Card style={styles.card}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.cardTitle}>{t('adminAnalytics.title', 'Learning health')}</Text>
                <View style={styles.analyticsStatsGrid}>
                  {[
                    { value: analyticsTotals.activeLearnersLast7Days || 0, label: t('adminAnalytics.activeLearners', 'Active learners') },
                    { value: analyticsTotals.eventsLast7Days || 0, label: t('adminAnalytics.learningEvents', 'Learning events') },
                    { value: analyticsTotals.classLessonsCompletedLast7Days || 0, label: t('adminAnalytics.classLessonsCompleted', 'Classes completed') },
                    { value: analyticsTotals.conversationTurnsLast7Days || 0, label: t('adminAnalytics.conversationTurns', 'Conversation turns') },
                    { value: analyticsTotals.savedReviewsLast7Days || 0, label: t('adminAnalytics.savedReviews', 'Saved-item reviews') },
                    { value: analyticsTotals.tutorFailuresLast7Days || 0, label: t('adminAnalytics.tutorIssues', 'Tutor issues') },
                  ].map((item) => (
                    <View key={item.label} style={styles.analyticsStatPill}>
                      <Text style={styles.analyticsStatNumber}>{item.value}</Text>
                      <Text style={styles.analyticsStatLabel}>{item.label}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.analyticsCaption}>{t('adminAnalytics.lastSevenDays', 'Last 7 days')}</Text>
              </Card.Content>
            </Card>

            {(learningAnalytics.featureUsage || []).length > 0 && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.cardTitle}>{t('adminAnalytics.featureUsage', 'Feature usage')}</Text>
                  {(learningAnalytics.featureUsage || []).slice(0, 8).map((entry: any) => {
                    const max = Math.max(...(learningAnalytics.featureUsage || []).map((item: any) => item.count || 0), 1);
                    return (
                      <View key={entry.feature} style={styles.analyticsRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.analyticsRowTitle}>{analyticsFeatureLabel(entry.feature)}</Text>
                          <Text style={styles.analyticsRowMeta}>
                            {t('adminAnalytics.learnersCount', '{{count}} learners', { count: entry.userCount || 0 })}
                          </Text>
                          <View style={styles.analyticsBar}>
                            <View style={[styles.analyticsBarFill, { width: `${Math.max(((entry.count || 0) / max) * 100, 6)}%` }]} />
                          </View>
                        </View>
                        <Text style={styles.analyticsRowValue}>{entry.count || 0}</Text>
                      </View>
                    );
                  })}
                </Card.Content>
              </Card>
            )}

            {((learningAnalytics.weakSkills || []).length > 0 || (learningAnalytics.languagePairs || []).length > 0) && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.cardTitle}>{t('adminAnalytics.learningSignals', 'Learning signals')}</Text>
                  {(learningAnalytics.weakSkills || []).slice(0, 4).map((skill: any) => (
                    <View key={skill.skillType} style={styles.contentRow}>
                      <Text style={styles.contentLabel}>{analyticsSkillLabel(skill.skillType)}</Text>
                      <Text style={styles.contentValue}>{skill.struggling || 0} / {skill.avgScore || 0}%</Text>
                    </View>
                  ))}
                  {(learningAnalytics.languagePairs || []).slice(0, 4).map((pair: any) => (
                    <View key={`${pair.nativeLanguage}-${pair.targetLanguage}`} style={styles.contentRow}>
                      <Text style={styles.contentLabel}>{(pair.nativeLanguage || '?').toUpperCase()} - {(pair.targetLanguage || '?').toUpperCase()}</Text>
                      <Text style={styles.contentValue}>{pair.count || 0}</Text>
                    </View>
                  ))}
                </Card.Content>
              </Card>
            )}

            {/* Content stats */}
            {stats.contentOverview && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.cardTitle}>{t('admin.contentOverview', 'Content')}</Text>
                  {[
                    { label: t('admin.lessons', 'Lessons'), value: stats.contentOverview.lessons },
                    { label: t('admin.flashcards', 'Flashcards'), value: stats.contentOverview.flashcards },
                    { label: t('admin.progressRecords', 'Progress Records'), value: stats.contentOverview.progressRecords },
                    { label: t('admin.totalLogins', 'Total Logins'), value: stats.contentOverview.totalLogins },
                    { label: t('admin.admins', 'Admins'), value: stats.contentOverview.admins },
                  ].map((item) => (
                    <View key={item.label} style={styles.contentRow}>
                      <Text style={styles.contentLabel}>{item.label}</Text>
                      <Text style={styles.contentValue}>{item.value}</Text>
                    </View>
                  ))}
                </Card.Content>
              </Card>
            )}

            {/* Recent active users */}
            {stats.recentActiveUsers?.length > 0 && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.cardTitle}>{t('admin.recentActive', 'Recently Active')}</Text>
                  {stats.recentActiveUsers.slice(0, 5).map((u: any) => (
                    <View key={u._id || u.username} style={styles.recentUserRow}>
                      <Text style={styles.recentUsername}>{u.username}</Text>
                      <Text style={styles.recentMeta}>⚡ {u.totalXP || 0} XP · {u.xpDecayEnabled ? '🔥' : '🌿'}</Text>
                    </View>
                  ))}
                </Card.Content>
              </Card>
            )}

            {/* Mode breakdown */}
            {stats.modeBreakdown && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.cardTitle}>{t('admin.modeBreakdown', 'Study Mode')}</Text>
                  <View style={styles.modeRow}>
                    <View style={styles.modeItem}>
                      <Text style={styles.modeIcon}>🔥</Text>
                      <Text style={styles.modeCount}>{stats.modeBreakdown.challenge || 0}</Text>
                      <Text style={styles.modeLabel}>{t('admin.challenge', 'Challenge')}</Text>
                    </View>
                    <View style={styles.modeItem}>
                      <Text style={styles.modeIcon}>🌿</Text>
                      <Text style={styles.modeCount}>{stats.modeBreakdown.relaxed || 0}</Text>
                      <Text style={styles.modeLabel}>{t('admin.relaxed', 'Relaxed')}</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            )}
          </>
        )}

        {/* ── Users tab ── */}
        {activeTab === 'users' && (
          <>
            <Searchbar
              placeholder={t('admin.searchUsers', 'Search users...')}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchbar}
            />
            <View style={styles.filterRow}>
              {['all', 'active', 'suspended', 'admin'].map((f) => (
                <Chip key={f} selected={statusFilter === f} onPress={() => setStatusFilter(f)} style={styles.filterChip}>
                  {f === 'all'
                    ? t('admin.all', 'All')
                    : f === 'active'
                      ? t('admin.active', 'Active')
                      : f === 'suspended'
                        ? t('admin.suspended', 'Suspended')
                        : t('admin.admins', 'Admins')}
                </Chip>
              ))}
            </View>

            {filteredUsers.map((user) => (
              <TouchableOpacity
                key={user._id}
                onPress={() => handleViewUserDetail(user._id)}
                activeOpacity={0.7}
              >
                <Card style={[styles.userCard, user.status === 'suspended' && styles.userCardSuspended]}>
                  <Card.Content>
                    <View style={styles.userHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.userName}>{user.username}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                      </View>
                      <View style={[styles.statusBadge, user.status === 'suspended' ? styles.badgeSuspended : styles.badgeActive]}>
                        <Text style={styles.statusText}>{statusLabel(user.status)}</Text>
                      </View>
                    </View>
                    <View style={styles.userMeta}>
                      <Text style={styles.metaItem}>⚡ {user.totalXP || 0} XP</Text>
                      <Text style={styles.metaItem}>{roleLabel(user.role)}</Text>
                      <Text style={styles.metaItem}>{user.xpDecayEnabled ? '🔥' : '🌿'}</Text>
                    </View>
                    {user.role !== 'admin' && (
                      <View style={styles.userActions}>
                        {user.status === 'active' ? (
                          <Button
                            mode="outlined"
                            compact
                            textColor={colors.error}
                            onPress={(e) => { e.stopPropagation?.(); setSuspendModal({ userId: user._id, username: user.username }); }}
                          >
                            {t('admin.suspendButton', 'Suspend User')}
                          </Button>
                        ) : (
                          <Button mode="outlined" compact textColor={colors.accentGreen} onPress={() => handleUnsuspend(user._id)}>
                            {t('admin.unsuspend', 'Unsuspend')}
                          </Button>
                        )}
                        <Button mode="outlined" compact onPress={() => handlePromote(user._id, user.username)}>
                          {t('admin.promote', 'Promote')}
                        </Button>
                        <Button mode="outlined" compact textColor={colors.error} onPress={() => handleDelete(user._id, user.username)}>
                          {t('admin.deleteUser', 'Delete')}
                        </Button>
                      </View>
                    )}
                    <Text style={styles.tapHint}>{t('admin.tapForDetails', 'Tap for details')}</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* ── Guests tab ── */}
        {activeTab === 'guests' && (
          <>
            {loadingGuests && !guests ? (
              <View style={styles.centered}>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            ) : guests ? (
              <>
                {/* Guest stats overview */}
                {guests.stats && (
                  <>
                    <View style={styles.statsGrid}>
                      <Card style={styles.statCard}>
                        <Card.Content style={styles.statContent}>
                          <Text style={styles.statNumber}>{guests.stats.activeToday || 0}</Text>
                          <Text style={styles.statLabel}>{t('admin.activeToday', 'Active Today')}</Text>
                        </Card.Content>
                      </Card>
                      <Card style={styles.statCard}>
                        <Card.Content style={styles.statContent}>
                          <Text style={styles.statNumber}>{guests.stats.activeWeek || 0}</Text>
                          <Text style={styles.statLabel}>{t('admin.activeWeek', 'Active 7d')}</Text>
                        </Card.Content>
                      </Card>
                      <Card style={styles.statCard}>
                        <Card.Content style={styles.statContent}>
                          <Text style={styles.statNumber}>{guests.stats.uniqueCountries || 0}</Text>
                          <Text style={styles.statLabel}>{t('admin.countries', 'Countries')}</Text>
                        </Card.Content>
                      </Card>
                      <Card style={styles.statCard}>
                        <Card.Content style={styles.statContent}>
                          <Text style={[styles.statNumber, { fontSize: 20 }]}>{guests.stats.conversionRate != null ? `${guests.stats.conversionRate}%` : '—'}</Text>
                          <Text style={styles.statLabel}>{t('admin.conversion', 'Conversion')}</Text>
                        </Card.Content>
                      </Card>
                    </View>

                    {/* Aggregate metrics */}
                    <Card style={styles.card}>
                      <Card.Content>
                        <Text variant="titleMedium" style={styles.cardTitle}>{t('admin.engagement', 'Engagement')}</Text>
                        {[
                          { label: t('admin.avgTimeSpent', 'Avg. Time Spent'), value: `${guests.stats.avgTimeSpent || 0}m` },
                          { label: t('admin.totalCardsStudied', 'Total Cards Studied'), value: guests.stats.totalCardsStudied || 0 },
                          { label: t('admin.totalAudioPlays', 'Total Audio Plays'), value: guests.stats.totalAudioPlays || 0 },
                          { label: t('admin.lessonsViewed', 'Lessons Viewed'), value: guests.stats.totalLessonsViewed || 0 },
                        ].map((item) => (
                          <View key={item.label} style={styles.contentRow}>
                            <Text style={styles.contentLabel}>{item.label}</Text>
                            <Text style={styles.contentValue}>{item.value}</Text>
                          </View>
                        ))}
                      </Card.Content>
                    </Card>

                    {/* Top language pairs */}
                    {guests.stats.topLanguagePairs?.length > 0 && (
                      <Card style={styles.card}>
                        <Card.Content>
                          <Text variant="titleMedium" style={styles.cardTitle}>{t('admin.topLanguagePairs', 'Top Language Pairs')}</Text>
                          {guests.stats.topLanguagePairs.slice(0, 5).map((pair: any, i: number) => (
                            <View key={i} style={styles.contentRow}>
                              <Text style={styles.contentLabel}>
                                {pair._id?.nativeLang || '?'} → {pair._id?.targetLang || '?'}
                              </Text>
                              <Text style={styles.contentValue}>{t('admin.sessionsCount', { count: pair.count, defaultValue: '{{count}} sessions' })}</Text>
                            </View>
                          ))}
                        </Card.Content>
                      </Card>
                    )}

                    {/* Device breakdown */}
                    {guests.stats.deviceBreakdown && (
                      <Card style={styles.card}>
                        <Card.Content>
                          <Text variant="titleMedium" style={styles.cardTitle}>{t('admin.deviceBreakdown', 'Device Breakdown')}</Text>
                          {Object.entries(guests.stats.deviceBreakdown).map(([device, count]) => (
                            <View key={device} style={styles.contentRow}>
                              <Text style={styles.contentLabel}>{device}</Text>
                              <Text style={styles.contentValue}>{count as number}</Text>
                            </View>
                          ))}
                        </Card.Content>
                      </Card>
                    )}
                  </>
                )}

                {/* Sessions list */}
                {guests.sessions?.length > 0 && (
                  <Card style={styles.card}>
                    <Card.Content>
                      <Text variant="titleMedium" style={styles.cardTitle}>
                        {t('admin.recentSessions', { count: guests.total || guests.sessions.length, defaultValue: 'Recent Sessions ({{count}})' })}
                      </Text>
                      {guests.sessions.map((session: any, i: number) => (
                        <View key={session._id || i} style={styles.sessionRow}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.sessionId} numberOfLines={1}>
                              {session.sessionId?.slice(0, 12) || '—'}…
                            </Text>
                            <Text style={styles.sessionMeta}>
                              {session.nativeLang || '?'} → {session.targetLang || '?'}
                              {session.country ? ` · ${session.country}` : ''}
                            </Text>
                          </View>
                          <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.sessionStat}>{t('admin.cardsStudiedCount', { count: session.cardsStudied || 0, defaultValue: '{{count}} cards' })}</Text>
                            <Text style={styles.sessionStat}>⏱ {session.timeSpent || 0}m</Text>
                          </View>
                        </View>
                      ))}
                    </Card.Content>
                  </Card>
                )}

                {/* Pagination */}
                {guests.total > (guests.sessions?.length || 0) && (
                  <View style={styles.paginationRow}>
                    <Button
                      mode="outlined"
                      onPress={() => fetchGuests(guestsPage - 1)}
                      disabled={guestsPage <= 1}
                      compact
                    >
                      {t('classLesson.previous', 'Previous')}
                    </Button>
                    <Text style={styles.pageText}>{t('admin.pageNumber', { page: guestsPage, defaultValue: 'Page {{page}}' })}</Text>
                    <Button
                      mode="outlined"
                      onPress={() => fetchGuests(guestsPage + 1)}
                      disabled={!guests.sessions || guests.sessions.length < 20}
                      compact
                    >
                      {t('classLesson.next', 'Next')}
                    </Button>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.centered}>
                <Text style={styles.emptyText}>{t('admin.noGuestData', 'No guest data available')}</Text>
                <Button mode="contained" onPress={() => fetchGuests(1)} style={{ marginTop: 12 }}>
                  {t('admin.loadData', 'Load Data')}
                </Button>
              </View>
            )}
          </>
        )}

        {activeTab === 'failures' && (
          <AdminFailureQueue
            reports={errorReports}
            loading={errorReportsLoading}
            clearing={errorReportsClearing}
            onRefresh={() => fetchErrorReports(errorReports.page || 1)}
            onClearAll={clearOpenErrorReports}
            onAcknowledge={acknowledgeErrorReport}
            onPageChange={fetchErrorReports}
          />
        )}

        {activeTab === 'messages' && (
          <AdminContactMessages
            messages={contactMessages}
            loading={contactMessagesLoading}
            clearing={contactMessagesClearing}
            senderFilter={contactSenderFilter}
            onRefresh={() => fetchContactMessages(contactMessages.page || 1)}
            onClearAll={clearOpenContactMessages}
            onAcknowledge={acknowledgeContactMessage}
            onPageChange={(page) => fetchContactMessages(page)}
            onSenderFilterChange={handleContactSenderFilterChange}
          />
        )}

        {activeTab === 'demo' && (
          <>
            <Card style={styles.card}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.cardTitle}>{t('admin.speakingDemo', 'Speaking Demo')}</Text>
                <Text style={styles.demoIntro}>
                  {t('admin.demoIntro', 'Admin-only conversation preview. It does not save audio or learner progress.')}
                </Text>

                <Text style={styles.demoLabel}>{t('admin.scenario', 'Scenario')}</Text>
                <SegmentedButtons
                  value={demoScenario}
                  onValueChange={(value) => {
                    setDemoScenario(value);
                    resetDemo();
                  }}
                  buttons={demoScenarios.map((scenario) => ({
                    value: scenario,
                    label: scenario,
                  }))}
                  style={styles.segmented}
                />

                <TextInput
                  label={t('admin.customScenario', 'Custom scenario')}
                  value={demoScenario}
                  onChangeText={setDemoScenario}
                  mode="outlined"
                  style={styles.input}
                />

                <Text style={styles.demoLabel}>{t('admin.learningLanguage', 'Learning language')}</Text>
                <SegmentedButtons
                  value={demoTargetLanguage}
                  onValueChange={setDemoTargetLanguage}
                  buttons={languageOptions.map(({ value, label }) => ({ value, label }))}
                  style={styles.segmented}
                />

                <Text style={styles.demoLabel}>{t('admin.nativeLanguage', 'Native language')}</Text>
                <SegmentedButtons
                  value={demoNativeLanguage}
                  onValueChange={setDemoNativeLanguage}
                  buttons={languageOptions.map(({ value, label }) => ({ value, label }))}
                  style={styles.segmented}
                />

                <Text style={styles.demoLabel}>{t('admin.listenFor', 'Listen for')}</Text>
                <SegmentedButtons
                  value={demoInputLanguage}
                  onValueChange={setDemoInputLanguage}
                  buttons={languageOptions.map(({ value, label }) => ({ value, label }))}
                  style={styles.segmented}
                />

                <Text style={styles.demoLabel}>{t('admin.difficulty', 'Difficulty')}</Text>
                <SegmentedButtons
                  value={demoDifficulty}
                  onValueChange={setDemoDifficulty}
                  buttons={difficultyOptions}
                  style={styles.segmented}
                />

                <TextInput
                  label={t('admin.learnerTurnInput', 'Type or paste what the learner said')}
                  value={demoTurn}
                  onChangeText={setDemoTurn}
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  style={styles.input}
                />

                <View style={styles.demoActions}>
                  <Button mode="contained" loading={demoLoading} disabled={!demoTurn.trim() || demoLoading} onPress={sendDemoTurn}>
                    {t('classLesson.send', 'Send')}
                  </Button>
                  <Button mode="outlined" onPress={() => speechService.cancel()}>
                    {t('admin.interrupt', 'Interrupt')}
                  </Button>
                  <Button mode="outlined" onPress={resetDemo}>
                    {t('common.reset', 'Reset')}
                  </Button>
                </View>
              </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.cardTitle}>{t('admin.conversationState', 'Conversation State')}</Text>
                <Text style={styles.demoLabel}>{t('admin.lastLearnerTurn', 'Last learner turn')}</Text>
                <Text style={styles.demoBox}>{demoTranscript || t('admin.noTurnSentYet', 'No turn sent yet.')}</Text>
                <Text style={styles.demoLabel}>{t('admin.practicePartnerResponse', 'Practice partner response')}</Text>
                <Text style={styles.demoBox}>{demoReply}</Text>
                <Text style={styles.demoLabel}>{t('admin.coachNote', 'Coach note')}</Text>
                <Text style={styles.demoBox}>{demoTip}</Text>
              </Card.Content>
            </Card>
          </>
        )}
      </ScrollView>

      {/* Suspend modal */}
      <Modal visible={!!suspendModal} transparent animationType="fade" onRequestClose={() => setSuspendModal(null)}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.modalContent}>
            <Text variant="titleMedium" style={styles.modalTitle}>
              {t('admin.suspendConfirm', { username: suspendModal?.username, defaultValue: 'Are you sure you want to suspend {{username}}?' })}
            </Text>
            <TextInput
              label={t('admin.suspendReason', 'Reason for suspension (optional)')}
              value={suspendReason}
              onChangeText={setSuspendReason}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />
            <View style={styles.modalActions}>
              <Button onPress={() => { setSuspendModal(null); setSuspendReason(''); }}>{t('common.cancel', 'Cancel')}</Button>
              <Button mode="contained" buttonColor={colors.error} onPress={handleSuspend}>
                {t('admin.suspendButton', 'Suspend User')}
              </Button>
            </View>
          </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* User detail modal */}
      <Modal visible={showUserDetail} transparent animationType="slide" onRequestClose={() => setShowUserDetail(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '80%' }]}>
            <View style={styles.detailHeader}>
              <Text variant="titleMedium" style={styles.modalTitle}>{t('admin.userDetails', 'User Details')}</Text>
              <Button mode="text" compact onPress={() => setShowUserDetail(false)}>✕</Button>
            </View>
            {loadingDetail ? (
              <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 24 }} />
            ) : userDetail ? (
              <ScrollView>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>{t('admin.username', 'Username')}</Text>
                  <Text style={styles.detailValue}>{userDetail.username}</Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>{t('admin.email', 'Email')}</Text>
                  <Text style={styles.detailValue}>{userDetail.email}</Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>{t('admin.role', 'Role')}</Text>
                  <Text style={styles.detailValue}>{roleLabel(userDetail.role)}</Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>{t('admin.status', 'Status')}</Text>
                  <Text style={[styles.detailValue, { color: userDetail.status === 'active' ? colors.accentGreen : colors.error }]}>
                    {statusLabel(userDetail.status)}
                  </Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>{t('admin.totalXp', 'Total XP')}</Text>
                  <Text style={styles.detailValue}>⚡ {userDetail.totalXP || 0}</Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>{t('admin.studyMode', 'Study Mode')}</Text>
                  <Text style={styles.detailValue}>{userDetail.xpDecayEnabled ? t('admin.challenge', 'Challenge') : t('admin.relaxed', 'Relaxed')}</Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>{t('admin.languages', 'Languages')}</Text>
                  <Text style={styles.detailValue}>
                    {userDetail.nativeLanguage || '?'} → {userDetail.targetLanguage || '?'}
                  </Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>{t('admin.loginCount', 'Login Count')}</Text>
                  <Text style={styles.detailValue}>{userDetail.loginCount || 0}</Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>{t('admin.memberSince', 'Member Since')}</Text>
                  <Text style={styles.detailValue}>
                    {userDetail.createdAt ? new Date(userDetail.createdAt).toLocaleDateString() : '—'}
                  </Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>{t('admin.lastActive', 'Last Active')}</Text>
                  <Text style={styles.detailValue}>
                    {userDetail.lastActiveAt ? new Date(userDetail.lastActiveAt).toLocaleDateString() : '—'}
                  </Text>
                </View>
                {userDetail.status === 'suspended' && userDetail.suspendReason && (
                  <View style={[styles.detailSection, { backgroundColor: '#fef2f2', borderRadius: 8, padding: 12 }]}>
                    <Text style={[styles.detailLabel, { color: colors.error }]}>{t('admin.suspendReasonLabel', 'Suspend Reason')}</Text>
                    <Text style={[styles.detailValue, { color: colors.error }]}>{userDetail.suspendReason}</Text>
                  </View>
                )}
              </ScrollView>
            ) : (
              <Text style={styles.emptyText}>{t('admin.userDetailsLoadFailed', 'Could not load user details')}</Text>
            )}
            <Button mode="contained" onPress={() => setShowUserDetail(false)} style={{ marginTop: 16 }}>
              {t('common.close', 'Close')}
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  header: { paddingTop: 48, paddingHorizontal: 16, paddingBottom: 8, backgroundColor: colors.surface },
  headerTitle: { fontWeight: '700', color: colors.textPrimary },
  tabScroller: { backgroundColor: colors.surface, flexGrow: 0 },
  tabRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 8 },
  tabChip: {},
  content: { padding: 16, paddingBottom: 32 },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 },
  statCard: { width: '48%', marginBottom: 12, borderRadius: 12 },
  statContent: { alignItems: 'center', paddingVertical: 16 },
  statNumber: { fontSize: 28, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 4, textAlign: 'center' },

  card: { backgroundColor: colors.surface, borderRadius: 14, marginBottom: 12, elevation: 1 },
  cardTitle: { fontWeight: '700', marginBottom: 12 },
  contentRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  contentLabel: { fontSize: 14, color: colors.textSecondary },
  contentValue: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },

  recentUserRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  recentUsername: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  recentMeta: { fontSize: 13, color: colors.textSecondary },

  modeRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12 },
  modeItem: { alignItems: 'center' },
  modeIcon: { fontSize: 28 },
  modeCount: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, marginTop: 4 },
  modeLabel: { fontSize: 12, color: colors.textMuted },

  analyticsStatsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  analyticsStatPill: {
    width: '48%',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  analyticsStatNumber: { color: colors.primary, fontSize: 20, fontWeight: '800' },
  analyticsStatLabel: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  analyticsCaption: { color: colors.textMuted, fontSize: 12, marginTop: 10 },
  analyticsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  analyticsRowTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  analyticsRowMeta: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  analyticsRowValue: { color: colors.textPrimary, fontSize: 16, fontWeight: '800' },
  analyticsBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 8,
  },
  analyticsBarFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 999 },

  searchbar: { marginBottom: 8, elevation: 0, backgroundColor: colors.surface },
  filterRow: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  filterChip: {},

  userCard: { backgroundColor: colors.surface, borderRadius: 12, marginBottom: 8, elevation: 1 },
  userCardSuspended: { borderLeftWidth: 4, borderLeftColor: colors.error },
  userHeader: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  userEmail: { fontSize: 13, color: colors.textMuted },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeActive: { backgroundColor: '#d1fae5' },
  badgeSuspended: { backgroundColor: '#fef2f2' },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  userMeta: { flexDirection: 'row', gap: 16, marginTop: 8 },
  metaItem: { fontSize: 13, color: colors.textSecondary },
  userActions: { flexDirection: 'row', gap: 8, marginTop: 12 },
  tapHint: { fontSize: 11, color: colors.textMuted, marginTop: 8, textAlign: 'right' },

  // Guest sessions
  sessionRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  sessionId: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  sessionMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  sessionStat: { fontSize: 12, color: colors.textMuted },

  paginationRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  pageText: { fontSize: 14, color: colors.textSecondary, fontWeight: '600' },

  emptyText: { color: colors.textMuted, fontSize: 15 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  modalContent: { backgroundColor: colors.surface, borderRadius: 16, padding: 24 },
  modalTitle: { fontWeight: '700', marginBottom: 16 },
  input: { marginBottom: 12, backgroundColor: colors.surface },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },

  // User detail modal
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  detailSection: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  detailLabel: { fontSize: 14, color: colors.textSecondary },
  detailValue: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, maxWidth: '60%', textAlign: 'right' },

  demoIntro: { color: colors.textSecondary, marginBottom: 12, lineHeight: 20 },
  demoLabel: { color: colors.textSecondary, fontSize: 12, fontWeight: '700', marginBottom: 6, marginTop: 8 },
  segmented: { marginBottom: 10 },
  demoActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  demoBox: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    color: colors.textPrimary,
    lineHeight: 20,
    padding: 12,
    marginBottom: 8,
  },
});

export default AdminScreen;
