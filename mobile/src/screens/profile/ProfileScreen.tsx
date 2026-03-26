import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  Modal,
  FlatList,
} from 'react-native';
import { Text, Button, TextInput, Card, Divider, SegmentedButtons, Switch } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { userService, progressService, ttsService } from '../../services/api';
import speechService from '../../services/speechService';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import LANGUAGES from '../../config/languages';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAppColors, type AppColors } from '../../config/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { userId, username, userRole, logout, setChallengeMode, challengeMode } = useAuthStore();
  const { nativeLanguage, targetLanguage, setLanguages, setNativeLanguage, setTargetLanguage, setVoice, preferredVoice } = useSettingsStore();
  const colors = useAppColors();
  const { height: winHeight, width: winWidth } = useWindowDimensions();
  const isCompact = winHeight < 450 || winWidth < 380;

  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState(username || '');
  const [saveMessage, setSaveMessage] = useState('');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  // Language dropdown state
  const [showNativePicker, setShowNativePicker] = useState(false);
  const [showTargetPicker, setShowTargetPicker] = useState(false);

  // Voice state
  const [voices, setVoices] = useState<any[]>([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const styles = useMemo(() => createStyles(colors, isCompact), [colors, isCompact]);

  const fetchData = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const [userRes, progRes] = await Promise.all([
        userService.getProfile(userId),
        progressService.getSummary(userId),
      ]);
      setUser(userRes.data);
      setProgress(progRes.data);
      setEditUsername(userRes.data.username);
      setError('');
    } catch (err: any) {
      if (err?._forcedLogout) return;
      setError(t('profilePage.failedToLoad', 'Failed to load profile'));
    } finally {
      setLoading(false);
    }
  }, [userId, t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const fetchVoices = useCallback(async () => {
    const locale = LANGUAGES[targetLanguage]?.ttsLocale;
    if (!locale) return;
    try {
      setLoadingVoices(true);
      const res = await ttsService.getVoices(locale);
      setVoices(Array.isArray(res.data) ? res.data : []);
    } catch {
      setVoices([]);
    } finally {
      setLoadingVoices(false);
    }
  }, [targetLanguage]);

  useEffect(() => {
    if (activeTab === 'settings' && voices.length === 0) {
      fetchVoices();
    }
  }, [activeTab]);

  const handlePreviewVoice = async (voiceName: string) => {
    const locale = LANGUAGES[targetLanguage]?.ttsLocale || 'ko-KR';
    const sampleText = targetLanguage === 'ko' ? '안녕하세요' : 'Hello, how are you?';
    setPreviewingVoice(voiceName);
    await speechService.speakAsync(sampleText, { lang: locale, voice: voiceName });
    setPreviewingVoice(null);
  };

  const handleSelectVoice = (voiceName: string | null) => {
    setVoice(voiceName);
  };

  const handleSaveUsername = async () => {
    if (!userId || !editUsername.trim()) return;
    try {
      await userService.updateProfile(userId, { username: editUsername.trim() });
      useAuthStore.getState().setUsername(editUsername.trim());
      setIsEditing(false);
      setSaveMessage(t('profilePage.saved', 'Saved!'));
      setTimeout(() => setSaveMessage(''), 2000);
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Failed to update');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordMsg(t('register.passwordsNoMatch'));
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg(t('profilePage.passwordTooShort', 'Password must be at least 6 characters'));
      return;
    }
    try {
      const payload: any = { newPassword };
      if (user?.hasPassword) payload.currentPassword = currentPassword;
      await userService.changePassword(userId!, payload);
      setPasswordMsg(t('profilePage.passwordChanged', 'Password changed successfully!'));
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordMsg(err.response?.data?.message || 'Failed to change password');
    }
  };

  const handleToggleChallengeMode = () => {
    const enable = !challengeMode;
    const title = enable
      ? t('profilePage.enableChallenge', 'Enable Challenge Mode?')
      : t('profilePage.disableChallenge', 'Switch to Relaxed Mode?');
    const msg = enable
      ? t('profilePage.challengeWarning', 'XP will decay daily if you don\'t study. Your XP will be reset to 0.')
      : t('profilePage.relaxedInfo', 'XP will no longer decay. Your current XP is preserved.');

    Alert.alert(title, msg, [
      { text: t('common.cancel', 'Cancel'), style: 'cancel' },
      {
        text: enable ? t('profilePage.enableButton', 'Enable') : t('profilePage.switchButton', 'Switch'),
        style: enable ? 'destructive' : 'default',
        onPress: async () => {
          try {
            await userService.toggleXpDecay(userId!, enable);
            setChallengeMode(enable);
            await fetchData();
          } catch {}
        },
      },
    ]);
  };

  const handleResetXP = () => {
    Alert.alert(
      t('profilePage.resetXPTitle', 'Reset XP?'),
      t('profilePage.resetXPDesc', 'This will clear all XP history. This cannot be undone.'),
      [
        { text: t('common.cancel', 'Cancel'), style: 'cancel' },
        {
          text: t('profilePage.resetButton', 'Reset'),
          style: 'destructive',
          onPress: async () => {
            try {
              await userService.resetXP(userId!);
              await fetchData();
            } catch {}
          },
        },
      ],
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t('profilePage.deleteAccountTitle', 'Delete Account?'),
      t('profilePage.deleteAccountDesc', 'This action is permanent. All your data will be deleted.'),
      [
        { text: t('common.cancel', 'Cancel'), style: 'cancel' },
        {
          text: t('profilePage.deleteButton', 'Delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await userService.deleteAccount(userId!);
              logout();
            } catch {}
          },
        },
      ],
    );
  };

  const handleLogout = async () => {
    try { await GoogleSignin.signOut(); } catch {}
    logout();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={0}>
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
    >
      {/* Profile header */}
      <View style={[styles.profileHeader, { paddingTop: insets.top + (isCompact ? 4 : 20) }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text variant="titleLarge" style={styles.profileName}>{user?.username || username}</Text>
        <Text style={styles.profileSince}>
          {t('profilePage.memberSince', { date: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '' })}
        </Text>
        <View style={styles.profileStats}>
          <View style={styles.profileStat}>
            <Text style={styles.statNumber}>⚡ {user?.totalXP || 0}</Text>
            <Text style={styles.statLabel}>{t('common.xp')}</Text>
          </View>
          <View style={styles.profileStat}>
            <Text style={styles.statNumber}>🏆 {progress?.mastered || 0}</Text>
            <Text style={styles.statLabel}>{t('progress.mastered', 'Mastered')}</Text>
          </View>
        </View>
      </View>

      {/* Tab selector */}
      <SegmentedButtons
        value={activeTab}
        onValueChange={setActiveTab}
        buttons={[
          { value: 'profile', label: t('profilePage.profileTab', 'Profile') },
          { value: 'settings', label: t('profilePage.settingsTab', 'Settings') },
          { value: 'account', label: t('profilePage.accountTab', 'Account') },
        ]}
        style={styles.tabs}
      />

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardTitleRow}>
                <Text variant="titleMedium" style={styles.cardTitle}>
                  {t('profilePage.personalInfo', 'Personal Info')}
                </Text>
                {!isEditing ? (
                  <Button mode="text" onPress={() => setIsEditing(true)} compact>
                    {t('profilePage.edit', 'Edit')}
                  </Button>
                ) : (
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Button mode="text" onPress={() => { setIsEditing(false); setEditUsername(user?.username || ''); }} compact>
                      {t('common.cancel', 'Cancel')}
                    </Button>
                    <Button mode="contained" onPress={handleSaveUsername} compact>
                      {t('profilePage.save', 'Save')}
                    </Button>
                  </View>
                )}
              </View>
              {saveMessage && <Text style={styles.successMsg}>{saveMessage}</Text>}

              {isEditing ? (
                <TextInput
                  label={t('profilePage.username', 'Username')}
                  value={editUsername}
                  onChangeText={setEditUsername}
                  mode="outlined"
                  style={styles.input}
                />
              ) : (
                <>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{t('profilePage.username', 'Username')}</Text>
                    <Text style={styles.infoValue}>{user?.username || username || t('profilePage.unknown', 'Unknown')}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{t('profilePage.email', 'Email')}</Text>
                    <Text style={styles.infoValue}>{user?.email || t('profilePage.unknown', 'Unknown')}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{t('profilePage.role', 'Role')}</Text>
                    <Text style={styles.infoValue}>{user?.role === 'admin' ? t('profilePage.adminRole', 'Admin') : t('profilePage.userRole', 'User')}</Text>
                  </View>
                </>
              )}
            </Card.Content>
          </Card>

          {userRole === 'admin' && (
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Admin')}
              buttonColor="#764ba2"
              style={{ borderRadius: 8, marginTop: 8 }}
              icon="shield-crown"
            >
              {t('admin.title', 'Admin Dashboard')}
            </Button>
          )}

          <Button mode="outlined" onPress={handleLogout} style={styles.logoutBtn} textColor={colors.error}>
            {t('profilePage.logout', 'Log Out')}
          </Button>
        </>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <>
          {/* Password */}
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.cardTitle}>
                {user?.hasPassword ? t('profilePage.changePassword', 'Change Password') : t('profilePage.setPassword', 'Set Password')}
              </Text>
              {!!passwordMsg && (
                <Text style={[styles.successMsg, passwordMsg.includes('Failed') && { color: colors.error }]}>
                  {passwordMsg}
                </Text>
              )}
              {user?.hasPassword && (
                <TextInput label={t('profilePage.currentPassword', 'Current Password')} value={currentPassword} onChangeText={setCurrentPassword} mode="outlined" secureTextEntry style={styles.input} />
              )}
              <TextInput label={t('profilePage.newPassword', 'New Password')} value={newPassword} onChangeText={setNewPassword} mode="outlined" secureTextEntry style={styles.input} />
              <TextInput label={t('profilePage.confirmNewPassword', 'Confirm New Password')} value={confirmPassword} onChangeText={setConfirmPassword} mode="outlined" secureTextEntry style={styles.input} />
              <Button mode="contained" onPress={handleChangePassword} style={{ marginTop: 8 }}>
                {t('profilePage.updatePassword', 'Update Password')}
              </Button>
            </Card.Content>
          </Card>

          {/* Language */}
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.cardTitle}>
                {t('profilePage.languagePrefs', 'Language Preferences')}
              </Text>

              {/* Native language dropdown */}
              <Text style={[styles.infoLabel, { marginBottom: 8, marginTop: 4 }]}>{t('languageSelect.iSpeak')}</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowNativePicker(!showNativePicker)}
                activeOpacity={0.7}
              >
                <Text style={styles.dropdownText}>
                  {LANGUAGES[nativeLanguage]?.flag} {LANGUAGES[nativeLanguage]?.name || t('profilePage.selectLanguage', 'Select language')}
                </Text>
                <Text style={styles.dropdownArrow}>{showNativePicker ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {showNativePicker && (
                <View style={styles.dropdownList}>
                  <FlatList
                    data={Object.entries(LANGUAGES).filter(([code]) => code !== targetLanguage)}
                    keyExtractor={([code]) => code}
                    style={{ maxHeight: 200 }}
                    renderItem={({ item: [code, lang] }) => (
                      <TouchableOpacity
                        style={[styles.dropdownItem, nativeLanguage === code && styles.dropdownItemSelected]}
                        onPress={async () => {
                          setNativeLanguage(code);
                          setShowNativePicker(false);
                          if (userId) {
                            try { await userService.updateProfile(userId, { nativeLanguage: code }); } catch {}
                          }
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{lang.flag}  {lang.name}</Text>
                        {nativeLanguage === code && <Text style={styles.langCheck}>✓</Text>}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}

              {/* Target language dropdown */}
              <Text style={[styles.infoLabel, { marginBottom: 8, marginTop: 16 }]}>{t('languageSelect.iWantToLearn')}</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowTargetPicker(!showTargetPicker)}
                activeOpacity={0.7}
              >
                <Text style={styles.dropdownText}>
                  {LANGUAGES[targetLanguage]?.flag} {LANGUAGES[targetLanguage]?.name || t('profilePage.selectLanguage', 'Select language')}
                </Text>
                <Text style={styles.dropdownArrow}>{showTargetPicker ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {showTargetPicker && (
                <View style={styles.dropdownList}>
                  <FlatList
                    data={Object.entries(LANGUAGES).filter(([code]) => code !== nativeLanguage)}
                    keyExtractor={([code]) => code}
                    style={{ maxHeight: 200 }}
                    renderItem={({ item: [code, lang] }) => (
                      <TouchableOpacity
                        style={[styles.dropdownItem, targetLanguage === code && styles.dropdownItemSelected]}
                        onPress={async () => {
                          setTargetLanguage(code);
                          setVoice(null);
                          setShowTargetPicker(false);
                          if (userId) {
                            try { await userService.updateProfile(userId, { targetLanguage: code }); } catch {}
                          }
                          fetchVoices();
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{lang.flag}  {lang.name}</Text>
                        {targetLanguage === code && <Text style={styles.langCheck}>✓</Text>}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </Card.Content>
          </Card>

          {/* Voice Selection */}
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardTitleRow}>
                <Text variant="titleMedium" style={styles.cardTitle}>
                  {t('profilePage.voiceSettings', 'Voice Settings')}
                </Text>
                <Button mode="text" compact onPress={fetchVoices} loading={loadingVoices}>
                  {t('common.refresh', 'Refresh')}
                </Button>
              </View>
              <Text style={styles.hintText}>
                {t('profilePage.voiceHint', 'Choose the voice used for audio playback.')}
              </Text>

              {loadingVoices ? (
                <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 12 }} />
              ) : voices.length === 0 ? (
                <Text style={styles.hintText}>{t('profilePage.noVoices', 'No voices available. Tap refresh to load.')}</Text>
              ) : (
                <>
                  {/* Default option */}
                  <TouchableOpacity
                    style={[styles.voiceRow, !preferredVoice && styles.voiceRowSelected]}
                    onPress={() => handleSelectVoice(null)}
                    activeOpacity={0.7}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.voiceName}>{t('profilePage.defaultVoice', 'Default Voice')}</Text>
                      <Text style={styles.voiceMeta}>{t('profilePage.systemDefault', 'System default')}</Text>
                    </View>
                    {!preferredVoice && <Text style={styles.voiceCheck}>✓</Text>}
                  </TouchableOpacity>

                  {voices.map((voice: any) => {
                    const name = voice.ShortName || voice.Name || voice.name || String(voice);
                    const isSelected = preferredVoice === name;
                    const isPreviewing = previewingVoice === name;
                    return (
                      <TouchableOpacity
                        key={name}
                        style={[styles.voiceRow, isSelected && styles.voiceRowSelected]}
                        onPress={() => handleSelectVoice(name)}
                        activeOpacity={0.7}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.voiceName}>{voice.FriendlyName || name}</Text>
                          <Text style={styles.voiceMeta}>
                            {voice.Gender || ''}{voice.Locale ? ` · ${voice.Locale}` : ''}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <TouchableOpacity
                            style={styles.previewBtn}
                            onPress={() => handlePreviewVoice(name)}
                            disabled={!!previewingVoice}
                          >
                            <Text style={styles.previewBtnText}>
                              {isPreviewing ? '⏹' : '▶'}
                            </Text>
                          </TouchableOpacity>
                          {isSelected && <Text style={styles.voiceCheck}>✓</Text>}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </>
              )}
            </Card.Content>
          </Card>

          {/* XP Mode */}
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.cardTitle}>
                {t('profilePage.studyMode', 'Study Mode')}
              </Text>
              <View style={styles.modeRow}>
                <View style={styles.modeOption}>
                  <Text style={styles.modeIcon}>{challengeMode ? '🔥' : '🌿'}</Text>
                  <Text style={styles.modeLabel}>
                    {challengeMode ? t('profilePage.challengeMode', 'Challenge Mode') : t('profilePage.relaxedMode', 'Relaxed Mode')}
                  </Text>
                  <Text style={styles.modeDesc}>
                    {challengeMode
                      ? t('profilePage.challengeDesc', 'XP decays daily — study to stay ahead!')
                      : t('profilePage.relaxedDesc', 'XP never decays — learn at your own pace.')}
                  </Text>
                </View>
              </View>
              <Button
                mode="outlined"
                onPress={handleToggleChallengeMode}
                style={{ marginTop: 12 }}
                textColor={colors.primary}
              >
                {challengeMode
                  ? t('profilePage.switchToRelaxed', 'Switch to Relaxed')
                  : t('profilePage.enableChallenge', 'Enable Challenge Mode')}
              </Button>
            </Card.Content>
          </Card>
        </>
      )}

      {/* Account Tab */}
      {activeTab === 'account' && (
        <>
          <Card style={[styles.card, styles.dangerCard]}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.cardTitle}>
                {t('profilePage.resetXP', 'Reset XP')}
              </Text>
              <Text style={styles.dangerText}>
                {t('profilePage.resetXPDesc', 'Clear all XP history. This cannot be undone.')}
              </Text>
              <Button mode="contained" onPress={handleResetXP} buttonColor={colors.error} style={{ marginTop: 12 }}>
                {t('profilePage.resetXPButton', 'Reset XP History')}
              </Button>
            </Card.Content>
          </Card>

          <Card style={[styles.card, styles.dangerCard]}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.cardTitle}>
                {t('profilePage.deleteAccount', 'Delete Account')}
              </Text>
              <Text style={styles.dangerText}>
                {t('profilePage.deleteAccountDesc', 'Permanently delete your account and all data.')}
              </Text>
              <Button mode="contained" onPress={handleDeleteAccount} buttonColor={colors.error} style={{ marginTop: 12 }}>
                {t('profilePage.deleteAccountButton', 'Delete Account')}
              </Button>
            </Card.Content>
          </Card>
        </>
      )}
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = (colors: AppColors, isCompact = false) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  container: { padding: isCompact ? 10 : 16, paddingTop: 0, paddingBottom: isCompact ? 16 : 32 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  profileHeader: {
    alignItems: 'center',
    paddingBottom: isCompact ? 12 : 24,
    paddingHorizontal: isCompact ? 10 : 16,
    marginLeft: isCompact ? -10 : -16,
    marginRight: isCompact ? -10 : -16,
    backgroundColor: colors.secondary,
    marginBottom: isCompact ? 8 : 16,
  },
  avatar: {
    width: isCompact ? 48 : 76,
    height: isCompact ? 48 : 76,
    borderRadius: isCompact ? 24 : 38,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isCompact ? 6 : 12,
  },
  avatarText: { fontSize: isCompact ? 24 : 38 },
  profileName: { fontWeight: '700', color: '#fff' },
  profileSince: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  profileStats: { flexDirection: 'row', gap: isCompact ? 24 : 40, marginTop: isCompact ? 8 : 16 },
  profileStat: { alignItems: 'center' },
  statNumber: { fontSize: isCompact ? 14 : 18, fontWeight: '700', color: '#fff' },
  statLabel: { fontSize: isCompact ? 10 : 12, color: 'rgba(255,255,255,0.65)' },

  tabs: { marginBottom: 16 },

  card: { backgroundColor: colors.surface, borderRadius: isCompact ? 10 : 14, marginBottom: isCompact ? 8 : 12, elevation: 1 },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontWeight: '700' },
  successMsg: { color: colors.accentGreen, fontSize: 13, marginBottom: 8 },

  input: { marginBottom: 12, backgroundColor: colors.surface },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoLabel: { fontSize: 14, color: colors.textSecondary },
  infoValue: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  hintText: { fontSize: 12, color: colors.textMuted, marginTop: 8, fontStyle: 'italic' },

  modeRow: { marginTop: 8 },
  modeOption: { alignItems: 'center', paddingVertical: 12 },
  modeIcon: { fontSize: isCompact ? 24 : 36, marginBottom: 4 },
  modeLabel: { fontSize: isCompact ? 14 : 16, fontWeight: '700', color: colors.textPrimary },
  modeDesc: { fontSize: isCompact ? 11 : 13, color: colors.textSecondary, textAlign: 'center', marginTop: 4 },

  logoutBtn: { borderRadius: 8, borderColor: colors.error, marginTop: 8 },

  dangerCard: { borderLeftWidth: 4, borderLeftColor: colors.error },
  dangerText: { fontSize: 14, color: colors.textSecondary },

  // Voice
  voiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  voiceRowSelected: {
    borderColor: colors.primary,
    backgroundColor: '#eff6ff',
  },
  voiceName: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  voiceMeta: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  voiceCheck: { fontSize: 16, color: colors.primary, fontWeight: '700', marginLeft: 8 },
  previewBtn: {
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewBtnText: { color: '#fff', fontSize: 12 },

  // Language dropdown
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  dropdownText: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  dropdownArrow: { fontSize: 12, color: colors.textMuted },
  dropdownList: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownItemSelected: {
    backgroundColor: '#eff6ff',
  },
  dropdownItemText: { fontSize: 14, color: colors.textPrimary },
  langCheck: { fontSize: 14, color: colors.primary, fontWeight: '700', marginLeft: 4 },
});

export default ProfileScreen;
