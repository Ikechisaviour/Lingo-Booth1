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
} from 'react-native';
import { Text, Button, TextInput, Card, Divider, SegmentedButtons, Switch } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { userService, progressService, ttsService } from '../../services/api';
import speechService from '../../services/speechService';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import LANGUAGES, { getLangName } from '../../config/languages';
import { useAppColors, type AppColors } from '../../config/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { userId, username, userRole, logout, setChallengeMode, challengeMode } = useAuthStore();
  const { nativeLanguage, targetLanguage, setLanguages, setVoice, preferredVoice } = useSettingsStore();
  const colors = useAppColors();


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

  // Voice state
  const [voices, setVoices] = useState<any[]>([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const styles = useMemo(() => createStyles(colors), [colors]);

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
    } catch {
      setError(t('profile.failedToLoad', 'Failed to load profile'));
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
      setSaveMessage(t('profile.saved', 'Saved!'));
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
      setPasswordMsg(t('profile.passwordTooShort', 'Password must be at least 6 characters'));
      return;
    }
    try {
      const payload: any = { newPassword };
      if (user?.hasPassword) payload.currentPassword = currentPassword;
      await userService.changePassword(userId!, payload);
      setPasswordMsg(t('profile.passwordChanged', 'Password changed successfully!'));
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
      ? t('profile.enableChallenge', 'Enable Challenge Mode?')
      : t('profile.disableChallenge', 'Switch to Relaxed Mode?');
    const msg = enable
      ? t('profile.challengeWarning', 'XP will decay daily if you don\'t study. Your XP will be reset to 0.')
      : t('profile.relaxedInfo', 'XP will no longer decay. Your current XP is preserved.');

    Alert.alert(title, msg, [
      { text: t('common.cancel', 'Cancel'), style: 'cancel' },
      {
        text: enable ? t('profile.enableButton', 'Enable') : t('profile.switchButton', 'Switch'),
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
      t('profile.resetXPTitle', 'Reset XP?'),
      t('profile.resetXPDesc', 'This will clear all XP history. This cannot be undone.'),
      [
        { text: t('common.cancel', 'Cancel'), style: 'cancel' },
        {
          text: t('profile.resetButton', 'Reset'),
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
      t('profile.deleteAccountTitle', 'Delete Account?'),
      t('profile.deleteAccountDesc', 'This action is permanent. All your data will be deleted.'),
      [
        { text: t('common.cancel', 'Cancel'), style: 'cancel' },
        {
          text: t('profile.deleteButton', 'Delete'),
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

  const handleLogout = () => {
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
      <View style={[styles.profileHeader, { paddingTop: insets.top + 20 }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text variant="titleLarge" style={styles.profileName}>{user?.username || username}</Text>
        <Text style={styles.profileSince}>
          {t('profile.memberSince', 'Member since')} {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
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
          { value: 'profile', label: t('profile.profileTab', 'Profile') },
          { value: 'settings', label: t('profile.settingsTab', 'Settings') },
          { value: 'account', label: t('profile.accountTab', 'Account') },
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
                  {t('profile.personalInfo', 'Personal Info')}
                </Text>
                {!isEditing ? (
                  <Button mode="text" onPress={() => setIsEditing(true)} compact>
                    {t('profile.edit', 'Edit')}
                  </Button>
                ) : (
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Button mode="text" onPress={() => { setIsEditing(false); setEditUsername(user?.username || ''); }} compact>
                      {t('common.cancel', 'Cancel')}
                    </Button>
                    <Button mode="contained" onPress={handleSaveUsername} compact>
                      {t('profile.save', 'Save')}
                    </Button>
                  </View>
                )}
              </View>
              {saveMessage && <Text style={styles.successMsg}>{saveMessage}</Text>}

              {isEditing ? (
                <TextInput
                  label={t('profile.username', 'Username')}
                  value={editUsername}
                  onChangeText={setEditUsername}
                  mode="outlined"
                  style={styles.input}
                />
              ) : (
                <>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{t('profile.username', 'Username')}</Text>
                    <Text style={styles.infoValue}>{user?.username}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{t('profile.email', 'Email')}</Text>
                    <Text style={styles.infoValue}>{user?.email}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{t('profile.role', 'Role')}</Text>
                    <Text style={styles.infoValue}>{user?.role === 'admin' ? 'Admin' : 'User'}</Text>
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
            {t('profile.logout', 'Log Out')}
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
                {user?.hasPassword ? t('profile.changePassword', 'Change Password') : t('profile.setPassword', 'Set Password')}
              </Text>
              {!!passwordMsg && (
                <Text style={[styles.successMsg, passwordMsg.includes('Failed') && { color: colors.error }]}>
                  {passwordMsg}
                </Text>
              )}
              {user?.hasPassword && (
                <TextInput label={t('profile.currentPassword', 'Current Password')} value={currentPassword} onChangeText={setCurrentPassword} mode="outlined" secureTextEntry style={styles.input} />
              )}
              <TextInput label={t('profile.newPassword', 'New Password')} value={newPassword} onChangeText={setNewPassword} mode="outlined" secureTextEntry style={styles.input} />
              <TextInput label={t('profile.confirmNewPassword', 'Confirm New Password')} value={confirmPassword} onChangeText={setConfirmPassword} mode="outlined" secureTextEntry style={styles.input} />
              <Button mode="contained" onPress={handleChangePassword} style={{ marginTop: 8 }}>
                {t('profile.updatePassword', 'Update Password')}
              </Button>
            </Card.Content>
          </Card>

          {/* Language */}
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.cardTitle}>
                {t('profile.languagePrefs', 'Language Preferences')}
              </Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t('languageSelect.iSpeak')}</Text>
                <Text style={styles.infoValue}>{LANGUAGES[nativeLanguage]?.flag} {getLangName(nativeLanguage)}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t('languageSelect.iWantToLearn')}</Text>
                <Text style={styles.infoValue}>{LANGUAGES[targetLanguage]?.flag} {getLangName(targetLanguage)}</Text>
              </View>
              <Text style={styles.hintText}>
                {t('profile.langChangeHint', 'To change languages, log out and select new languages when logging back in.')}
              </Text>
            </Card.Content>
          </Card>

          {/* Voice Selection */}
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardTitleRow}>
                <Text variant="titleMedium" style={styles.cardTitle}>
                  {t('profile.voiceSettings', 'Voice Settings')}
                </Text>
                <Button mode="text" compact onPress={fetchVoices} loading={loadingVoices}>
                  {t('common.refresh', 'Refresh')}
                </Button>
              </View>
              <Text style={styles.hintText}>
                {t('profile.voiceHint', 'Choose the voice used for audio playback.')}
              </Text>

              {loadingVoices ? (
                <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 12 }} />
              ) : voices.length === 0 ? (
                <Text style={styles.hintText}>{t('profile.noVoices', 'No voices available. Tap refresh to load.')}</Text>
              ) : (
                <>
                  {/* Default option */}
                  <TouchableOpacity
                    style={[styles.voiceRow, !preferredVoice && styles.voiceRowSelected]}
                    onPress={() => handleSelectVoice(null)}
                    activeOpacity={0.7}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.voiceName}>{t('profile.defaultVoice', 'Default Voice')}</Text>
                      <Text style={styles.voiceMeta}>{t('profile.systemDefault', 'System default')}</Text>
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
                {t('profile.studyMode', 'Study Mode')}
              </Text>
              <View style={styles.modeRow}>
                <View style={styles.modeOption}>
                  <Text style={styles.modeIcon}>{challengeMode ? '🔥' : '🌿'}</Text>
                  <Text style={styles.modeLabel}>
                    {challengeMode ? t('profile.challengeMode', 'Challenge Mode') : t('profile.relaxedMode', 'Relaxed Mode')}
                  </Text>
                  <Text style={styles.modeDesc}>
                    {challengeMode
                      ? t('profile.challengeDesc', 'XP decays daily — study to stay ahead!')
                      : t('profile.relaxedDesc', 'XP never decays — learn at your own pace.')}
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
                  ? t('profile.switchToRelaxed', 'Switch to Relaxed')
                  : t('profile.enableChallenge', 'Enable Challenge Mode')}
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
                {t('profile.resetXP', 'Reset XP')}
              </Text>
              <Text style={styles.dangerText}>
                {t('profile.resetXPDesc', 'Clear all XP history. This cannot be undone.')}
              </Text>
              <Button mode="contained" onPress={handleResetXP} buttonColor={colors.error} style={{ marginTop: 12 }}>
                {t('profile.resetXPButton', 'Reset XP History')}
              </Button>
            </Card.Content>
          </Card>

          <Card style={[styles.card, styles.dangerCard]}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.cardTitle}>
                {t('profile.deleteAccount', 'Delete Account')}
              </Text>
              <Text style={styles.dangerText}>
                {t('profile.deleteAccountDesc', 'Permanently delete your account and all data.')}
              </Text>
              <Button mode="contained" onPress={handleDeleteAccount} buttonColor={colors.error} style={{ marginTop: 12 }}>
                {t('profile.deleteAccountButton', 'Delete Account')}
              </Button>
            </Card.Content>
          </Card>
        </>
      )}
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  container: { padding: 16, paddingTop: 0, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  profileHeader: {
    alignItems: 'center',
    paddingBottom: 24,
    paddingHorizontal: 16,
    marginLeft: -16,
    marginRight: -16,
    backgroundColor: colors.secondary,
    marginBottom: 16,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 38 },
  profileName: { fontWeight: '700', color: '#fff' },
  profileSince: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  profileStats: { flexDirection: 'row', gap: 40, marginTop: 16 },
  profileStat: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: '700', color: '#fff' },
  statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.65)' },

  tabs: { marginBottom: 16 },

  card: { backgroundColor: colors.surface, borderRadius: 14, marginBottom: 12, elevation: 1 },
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
  modeIcon: { fontSize: 36, marginBottom: 4 },
  modeLabel: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  modeDesc: { fontSize: 13, color: colors.textSecondary, textAlign: 'center', marginTop: 4 },

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
});

export default ProfileScreen;
