import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { practiceContextService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { useAppColors, type AppColors } from '../../config/theme';
import LANGUAGES from '../../config/languages';

type ContextItem = {
  text: string;
  language?: string;
  note?: string;
  context?: string;
  group?: 'topics' | 'vocabulary' | 'phrases';
  key?: string;
};

type ContextAnalysis = {
  summary?: string;
  environmentTags?: string[];
  topics?: ContextItem[];
  vocabulary?: ContextItem[];
  phrases?: ContextItem[];
  goals?: string[];
  transcriptWordCount?: number;
};

type PracticeRecommendation = {
  title?: string;
  text?: string;
  prompt?: string;
  language?: string;
};

type PracticeRecommendations = {
  hasContext?: boolean;
  roleplays?: PracticeRecommendation[];
  reviewDrills?: PracticeRecommendation[];
  classPrompts?: string[];
};

const ttsLocaleFor = (languageCode?: string, fallbackCode?: string) => (
  (languageCode && LANGUAGES[languageCode]?.ttsLocale)
  || (fallbackCode && LANGUAGES[fallbackCode]?.ttsLocale)
  || 'en-US'
);

function selectableItems(analysis: ContextAnalysis | null): ContextItem[] {
  return [
    ...((analysis?.topics || []).map((item, index) => ({ ...item, group: 'topics' as const, key: `topics-${index}` }))),
    ...((analysis?.vocabulary || []).map((item, index) => ({ ...item, group: 'vocabulary' as const, key: `vocabulary-${index}` }))),
    ...((analysis?.phrases || []).map((item, index) => ({ ...item, group: 'phrases' as const, key: `phrases-${index}` }))),
  ];
}

function groupSelected(items: ContextItem[], selectedKeys: Set<string>) {
  return items.reduce<Record<string, ContextItem[]>>((acc, item) => {
    if (!item.key || !item.group || !selectedKeys.has(item.key)) return acc;
    const { key, group, ...clean } = item;
    acc[group] = acc[group] || [];
    acc[group].push(clean);
    return acc;
  }, { topics: [], vocabulary: [], phrases: [] });
}

function isProOrUltraTier(tier?: string) {
  return ['pro', 'ultra'].includes(String(tier || '').toLowerCase());
}

const ContextPracticeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { nativeLanguage, targetLanguage } = useSettingsStore();
  const { userRole, subscriptionTier, aiEntitlements } = useAuthStore();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState<ContextAnalysis | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [savedContexts, setSavedContexts] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<PracticeRecommendations | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Ready');
  const listeningRef = useRef(false);
  const currentTier = userRole === 'admin'
    ? 'pro'
    : (aiEntitlements?.subscriptionTier || subscriptionTier || 'free');
  const canUseContextPractice = Boolean(
    aiEntitlements?.canUsePracticeContext
    || isProOrUltraTier(currentTier)
    || isProOrUltraTier(subscriptionTier),
  );

  const items = useMemo(() => selectableItems(analysis), [analysis]);
  const openConversation = (params?: Record<string, unknown>) => {
    const parent = navigation.getParent?.();
    if (parent) parent.navigate('Conversation', params);
    else navigation.navigate('Conversation', params);
  };
  const goBackToProfile = () => {
    if (navigation.canGoBack?.()) navigation.goBack();
    else navigation.navigate('ProfileMain');
  };

  const loadSavedContext = async () => {
    if (!canUseContextPractice) {
      setSavedContexts([]);
      setRecommendations(null);
      return;
    }

    const [savedRes, recommendationRes] = await Promise.all([
      practiceContextService.list(targetLanguage),
      practiceContextService.recommendations(targetLanguage),
    ]);
    setSavedContexts(Array.isArray(savedRes.data) ? savedRes.data : []);
    setRecommendations((recommendationRes.data || null) as PracticeRecommendations | null);
  };

  useEffect(() => {
    loadSavedContext()
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canUseContextPractice, targetLanguage]);

  useEffect(() => () => {
    ExpoSpeechRecognitionModule.abort();
  }, []);

  const startListening = async () => {
    if (!canUseContextPractice) {
      setStatus(t('profilePage.personalizationTier', 'Pro or Premium'));
      return;
    }

    try {
      const available = ExpoSpeechRecognitionModule.isRecognitionAvailable();
      if (!available) {
        setStatus('Speech recognition is not available on this device.');
        return;
      }
      const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!permission.granted) {
        setStatus('Microphone or speech recognition permission is blocked.');
        return;
      }
      listeningRef.current = true;
      ExpoSpeechRecognitionModule.start({
        lang: ttsLocaleFor(nativeLanguage, targetLanguage),
        interimResults: false,
        maxAlternatives: 1,
        continuous: true,
      });
    } catch {
      listeningRef.current = false;
      setListening(false);
      setStatus('Could not start listening. Please try again.');
    }
  };

  const stopListening = () => {
    listeningRef.current = false;
    ExpoSpeechRecognitionModule.stop();
    setListening(false);
    setStatus('Listening stopped. Review or analyze when ready.');
  };

  useSpeechRecognitionEvent('start', () => {
    setListening(true);
    setStatus('Listening for useful learning moments...');
  });

  useSpeechRecognitionEvent('result', (event) => {
    if (event.isFinal === false) return;
    const text = event.results?.[0]?.transcript || '';
    if (text.trim()) {
      setTranscript((current) => `${current} ${text}`.replace(/\s+/g, ' ').trim());
    }
  });

  useSpeechRecognitionEvent('end', () => {
    setListening(false);
    if (listeningRef.current && canUseContextPractice) {
      try {
        ExpoSpeechRecognitionModule.start({
          lang: ttsLocaleFor(nativeLanguage, targetLanguage),
          interimResults: false,
          maxAlternatives: 1,
          continuous: true,
        });
      } catch {
        listeningRef.current = false;
        setStatus('Listening paused. Start again when ready.');
      }
    }
  });

  useSpeechRecognitionEvent('error', () => {
    listeningRef.current = false;
    setListening(false);
    setStatus('Could not capture speech. Please try again.');
  });

  const analyze = async () => {
    if (!canUseContextPractice) {
      setStatus(t('profilePage.personalizationTier', 'Pro or Premium'));
      return;
    }

    if (!transcript.trim()) {
      setStatus('Capture or type a few sentences first.');
      return;
    }
    setLoading(true);
    setStatus('Finding useful words and situations...');
    try {
      const res = await practiceContextService.analyze({
        transcript,
        nativeLanguage,
        targetLanguage,
        source: 'mobile',
      });
      const nextAnalysis = res.data as ContextAnalysis;
      setAnalysis(nextAnalysis);
      setSelectedKeys(new Set(selectableItems(nextAnalysis).map((item) => item.key || '')));
      setStatus('Review what should be saved.');
    } catch {
      setStatus('Could not analyze this session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (key?: string) => {
    if (!key) return;
    setSelectedKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const saveSelected = async () => {
    if (!canUseContextPractice) {
      setStatus(t('profilePage.personalizationTier', 'Pro or Premium'));
      return;
    }

    if (!analysis) return;
    setLoading(true);
    setStatus('Saving approved personalization items...');
    try {
      const grouped = groupSelected(items, selectedKeys);
      const res = await practiceContextService.save({
        source: 'mobile',
        nativeLanguage,
        targetLanguage,
        summary: analysis.summary,
        environmentTags: analysis.environmentTags || [],
        goals: analysis.goals || [],
        transcriptWordCount: analysis.transcriptWordCount || 0,
        ...grouped,
      });
      setSavedContexts((current) => [res.data, ...current]);
      practiceContextService.recommendations(targetLanguage)
        .then((recommendationRes) => setRecommendations((recommendationRes.data || null) as PracticeRecommendations | null))
        .catch(() => {});
      setAnalysis(null);
      setTranscript('');
      setSelectedKeys(new Set());
      setStatus('Saved. Future practice can use these items.');
    } catch {
      setStatus('Could not save these items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteContext = (contextId: string) => {
    if (!canUseContextPractice) return;

    Alert.alert('Delete saved item?', 'This removes the saved item from Learning Personalization.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await practiceContextService.delete(contextId);
            setSavedContexts((current) => current.filter((item) => item._id !== contextId));
            practiceContextService.recommendations(targetLanguage)
              .then((recommendationRes) => setRecommendations((recommendationRes.data || null) as PracticeRecommendations | null))
              .catch(() => {});
          } catch {
            setStatus('Could not delete that saved item.');
          }
        },
      },
    ]);
  };

  if (!canUseContextPractice) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <Button mode="text" icon="arrow-left" onPress={goBackToProfile} style={styles.backButton}>
          {t('context.backToProfile', 'Back to Profile')}
        </Button>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.kicker}>{t('context.kicker', 'Learning Personalization')}</Text>
            <Text variant="headlineSmall" style={styles.title}>{t('context.title', 'Lessons shaped around you')}</Text>
            <Text style={styles.subtitle}>
              {t('context.lockedSubtitle', 'Pro and Premium can save approved words, phrases, and situations from real life so future practice feels more relevant. Free and Plus can keep using regular practice.')}
            </Text>
          </View>
          <View style={styles.statusPill}>
            <Text style={styles.statusText}>{String(currentTier || 'free').toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>{t('context.upgradeTitle', 'Upgrade to personalize practice')}</Text>
          <Text style={styles.emptyText}>
            {t('context.upgradeBody', 'Upgrade when you want lessons, review prompts, and roleplays to adapt to the everyday language you approve.')}
          </Text>
          <Button mode="contained" icon="message-text" onPress={() => openConversation()} style={styles.lockedButton}>
            {t('context.openConversation', 'Open Conversation')}
          </Button>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Button mode="text" icon="arrow-left" onPress={goBackToProfile} style={styles.backButton}>
        {t('context.backToProfile', 'Back to Profile')}
      </Button>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>{t('context.kicker', 'Learning Personalization')}</Text>
          <Text variant="headlineSmall" style={styles.title}>{t('context.title', 'Lessons shaped around you')}</Text>
          <Text style={styles.subtitle}>
            {t('context.subtitle', 'Listen during an intentional session, review the useful items, and save only what you approve.')}
          </Text>
        </View>
        <View style={[styles.statusPill, listening && styles.statusPillActive]}>
          <Text style={[styles.statusText, listening && styles.statusTextActive]}>{listening ? t('context.listeningPill', 'Listening') : t('context.offPill', 'Off')}</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>{t('context.sessionCapture', 'Session capture')}</Text>
        <Text style={styles.statusLine}>{status}</Text>
        <TextInput
          mode="outlined"
          value={transcript}
          onChangeText={setTranscript}
          multiline
          placeholder={t('context.transcriptPlaceholder', 'Captured transcript or notes appear here.')}
          style={styles.input}
        />
        <Text style={styles.privacy}>{t('context.privacyNote', 'Raw audio is not stored. The transcript is used only for analysis before you approve saving.')}</Text>
        <View style={styles.buttonRow}>
          <Button mode={listening ? 'contained' : 'outlined'} icon={listening ? 'microphone-off' : 'microphone'} onPress={listening ? stopListening : startListening} disabled={loading} style={styles.flexButton}>
            {listening ? t('context.stop', 'Stop') : t('context.start', 'Start')}
          </Button>
          <Button mode="contained" icon="magnify" onPress={analyze} disabled={loading || !transcript.trim()} style={styles.flexButton}>
            {t('context.analyze', 'Analyze')}
          </Button>
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHeaderRow}>
          <Text style={styles.panelTitle}>{t('context.approveTitle', 'Approve what to save')}</Text>
          <Button mode="contained" compact onPress={saveSelected} disabled={loading || !analysis || selectedKeys.size === 0}>{t('context.save', 'Save')}</Button>
        </View>
        {!analysis ? (
          <Text style={styles.emptyText}>{t('context.analyzeHint', 'Analyze a session to see suggested topics, words, and phrases.')}</Text>
        ) : (
          <>
            <Text style={styles.summary}>{analysis.summary}</Text>
            <View style={styles.tagRow}>
              {(analysis.environmentTags || []).map((tag) => <Text key={tag} style={styles.tag}>{tag}</Text>)}
            </View>
            {items.map((item) => (
              <TouchableOpacity key={item.key} style={styles.suggestion} onPress={() => toggleItem(item.key)} activeOpacity={0.75}>
                <MaterialCommunityIcons
                  name={selectedKeys.has(item.key || '') ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                  color={selectedKeys.has(item.key || '') ? colors.primary : colors.textMuted}
                  size={22}
                />
                <View style={styles.suggestionText}>
                  <Text style={styles.suggestionTitle}>{item.text}</Text>
                  <Text style={styles.suggestionNote}>{item.group} {item.note ? `- ${item.note}` : ''}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>{t('context.practiceNext', 'Practice next')}</Text>
        {!recommendations?.hasContext ? (
          <Text style={styles.emptyText}>{t('context.practiceNextEmpty', 'Save personalization items to unlock roleplays, review drills, and class prompts.')}</Text>
        ) : (
          <>
            {(recommendations.roleplays || []).slice(0, 3).map((item) => (
              <View key={item.prompt} style={styles.practiceCard}>
                <Text style={styles.practiceTitle}>{item.title || item.text || t('context.roleplayFallback', 'Roleplay')}</Text>
                <Text style={styles.practicePrompt}>{item.prompt}</Text>
                <Button
                  mode="contained-tonal"
                  compact
                  onPress={() => openConversation({ starter: item.prompt })}
                  style={styles.practiceButton}
                >
                  {t('context.startInConversation', 'Start in Conversation')}
                </Button>
              </View>
            ))}
            {(recommendations.reviewDrills || []).slice(0, 4).map((item) => (
              <View key={item.prompt} style={styles.practiceCard}>
                <Text style={styles.practiceTitle}>{item.text || t('context.reviewDrillFallback', 'Review drill')}</Text>
                <Text style={styles.practicePrompt}>{item.prompt}</Text>
                <Button
                  mode="outlined"
                  compact
                  onPress={() => openConversation({ starter: item.prompt })}
                  style={styles.practiceButton}
                >
                  {t('context.practiceThis', 'Practice this')}
                </Button>
              </View>
            ))}
            {(recommendations.classPrompts || []).slice(0, 3).map((prompt) => (
              <View key={prompt} style={styles.practiceCard}>
                <Text style={styles.practicePrompt}>{prompt}</Text>
              </View>
            ))}
          </>
        )}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>{t('context.savedTitle', 'Saved personalization')}</Text>
        {savedContexts.length === 0 ? (
          <Text style={styles.emptyText}>{t('context.savedEmpty', 'No saved personalization items yet.')}</Text>
        ) : savedContexts.map((context) => (
          <View key={context._id} style={styles.savedCard}>
            <Text style={styles.summary}>{context.summary || t('context.savedItemFallback', 'Saved personalization item')}</Text>
            <View style={styles.tagRow}>
              {(context.environmentTags || []).map((tag: string) => <Text key={tag} style={styles.tag}>{tag}</Text>)}
            </View>
            <Text style={styles.suggestionNote}>
              {(context.vocabulary || []).slice(0, 5).map((item: ContextItem) => item.text).join(', ')}
            </Text>
            <Button mode="outlined" compact textColor={colors.error} onPress={() => deleteContext(context._id)}>{t('context.delete', 'Delete')}</Button>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 14, paddingBottom: 96 },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  header: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  kicker: { color: colors.primary, fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },
  title: { color: colors.textPrimary, fontWeight: '900', marginTop: 4 },
  subtitle: { color: colors.textSecondary, marginTop: 8, lineHeight: 20, maxWidth: 520 },
  statusPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusPillActive: { backgroundColor: colors.primary + '14', borderColor: colors.primary },
  statusText: { color: colors.textMuted, fontWeight: '800' },
  statusTextActive: { color: colors.primary },
  panel: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  panelHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  panelTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: '900' },
  statusLine: { color: colors.textSecondary, marginTop: 6, marginBottom: 10 },
  input: { minHeight: 150, backgroundColor: colors.surface },
  privacy: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: 8 },
  buttonRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  flexButton: { flex: 1, borderRadius: 8 },
  emptyText: { color: colors.textSecondary, marginTop: 12, lineHeight: 20 },
  summary: { color: colors.textPrimary, lineHeight: 20, marginTop: 10 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  tag: {
    backgroundColor: '#eef9e9',
    color: '#2f8500',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: '800',
  },
  suggestion: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    marginTop: 8,
  },
  suggestionText: { flex: 1 },
  suggestionTitle: { color: colors.textPrimary, fontWeight: '800', lineHeight: 20 },
  suggestionNote: { color: colors.textMuted, fontSize: 12, marginTop: 3 },
  practiceCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    padding: 12,
    marginTop: 10,
    gap: 7,
  },
  practiceTitle: {
    color: colors.textPrimary,
    fontWeight: '900',
    lineHeight: 20,
  },
  practicePrompt: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  practiceButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  savedCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    padding: 12,
    marginTop: 10,
    gap: 6,
  },
  lockedButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginTop: 14,
  },
});

export default ContextPracticeScreen;
