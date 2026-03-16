import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { Text, Button, Card, ProgressBar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { progressService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import { colors } from '../../config/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MasteryArea {
  lessonTitle?: string;
  category?: string;
  skillType?: string;
  difficulty?: string;
  score?: number;
  attempts?: number;
  successRate?: number;
  lessonId?: string;
}

const ProgressScreen: React.FC = () => {
  const { t } = useTranslation();
  const { userId } = useAuthStore();
  const insets = useSafeAreaInsets();

  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [selectedMastery, setSelectedMastery] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await progressService.getSummary(userId);
      setProgress(res.data);
      setError('');
    } catch {
      setError(t('progress.failedToLoad', 'Failed to load progress'));
    } finally {
      setLoading(false);
    }
  }, [userId, t]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProgress();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !progress) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={fetchProgress} style={{ marginTop: 16 }}>
          {t('common.retry', 'Retry')}
        </Button>
      </View>
    );
  }

  const masteryLevels = [
    { key: 'mastered', label: t('progress.mastered', 'Mastered'), icon: '🏆', color: '#10b981', areas: progress.masteredAreas },
    { key: 'comfortable', label: t('progress.comfortable', 'Comfortable'), icon: '😊', color: '#1cb0f6', areas: progress.comfortableAreas },
    { key: 'learning', label: t('progress.learning', 'Learning'), icon: '📚', color: '#f59e0b', areas: progress.learningAreas },
    { key: 'struggling', label: t('progress.struggling', 'Struggling'), icon: '💪', color: '#ef4444', areas: progress.strugglingAreas },
  ];

  const total = (progress.mastered || 0) + (progress.comfortable || 0) + (progress.learning || 0) + (progress.struggling || 0);

  const skills = progress.skillStats
    ? [
        { key: 'listening', label: t('progress.listening', 'Listening'), icon: '👂', color: '#1cb0f6' },
        { key: 'reading', label: t('progress.reading', 'Reading'), icon: '📖', color: '#a560e8' },
        { key: 'writing', label: t('progress.writing', 'Writing'), icon: '✍️', color: '#f59e0b' },
        { key: 'speaking', label: t('progress.speaking', 'Speaking'), icon: '🗣️', color: '#10b981' },
      ]
    : [];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text variant="headlineSmall" style={styles.headerTitle}>
          {t('progress.title', 'Your Progress')}
        </Text>
        <Text style={styles.headerSubtitle}>{t('progress.subtitle', 'Track your learning journey')}</Text>
      </View>

      {/* Achievement Banner */}
      {(progress.mastered || 0) > 0 && (
        <Card style={[styles.card, styles.achievementCard]}>
          <Card.Content style={styles.achievementContent}>
            <Text style={styles.achievementIcon}>🏆</Text>
            <View>
              <Text style={styles.achievementTitle}>
                {t('progress.masteredCount', { count: progress.mastered })}
              </Text>
              <Text style={styles.achievementXp}>⚡ {progress.mastered * 10} {t('common.xp')}</Text>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Mastery Stats */}
      <View style={styles.masteryGrid}>
        {masteryLevels.map((level) => {
          const count = progress[level.key] || 0;
          const pct = total > 0 ? count / total : 0;
          return (
            <TouchableOpacity
              key={level.key}
              style={[styles.masteryCard, selectedMastery === level.key && { borderColor: level.color, borderWidth: 2 }]}
              onPress={() => setSelectedMastery(selectedMastery === level.key ? null : level.key)}
              activeOpacity={0.7}
            >
              <Text style={styles.masteryIcon}>{level.icon}</Text>
              <Text style={styles.masteryCount}>{count}</Text>
              <Text style={styles.masteryLabel}>{level.label}</Text>
              <ProgressBar progress={pct} color={level.color} style={styles.masteryBar} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Mastery Detail */}
      {selectedMastery && (() => {
        const level = masteryLevels.find((l) => l.key === selectedMastery);
        const areas: MasteryArea[] = level?.areas || [];
        return (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={{ fontWeight: '700', marginBottom: 12 }}>
                {level?.icon} {level?.label} ({areas.length})
              </Text>
              {areas.length === 0 ? (
                <Text style={styles.emptyText}>{t('progress.noAreas', 'No items in this category yet.')}</Text>
              ) : (
                areas.map((area, idx) => (
                  <View key={idx} style={styles.areaItem}>
                    <View style={styles.areaInfo}>
                      <Text style={styles.areaTitle}>{area.lessonTitle || area.category || 'Unknown'}</Text>
                      <Text style={styles.areaMeta}>
                        {area.skillType && `${area.skillType} · `}{area.difficulty || ''}
                      </Text>
                    </View>
                    <View style={styles.areaScore}>
                      <Text style={[styles.areaScoreText, { color: level?.color }]}>
                        {area.score || 0}%
                      </Text>
                      <Text style={styles.areaAttempts}>
                        {area.attempts || 0}x
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </Card.Content>
          </Card>
        );
      })()}

      {/* Skills */}
      {skills.length > 0 && progress.skillStats && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={{ fontWeight: '700', marginBottom: 16 }}>
              {t('progress.skillsPerformance', 'Skills Performance')}
            </Text>
            <View style={styles.skillsGrid}>
              {skills.map((skill) => {
                const stat = progress.skillStats[skill.key];
                const avg = stat?.averageScore || 0;
                const count = stat?.count || 0;
                return (
                  <View key={skill.key} style={styles.skillItem}>
                    <View style={[styles.skillCircle, { borderColor: skill.color }]}>
                      <Text style={[styles.skillPct, { color: skill.color }]}>{avg}%</Text>
                    </View>
                    <Text style={styles.skillIcon}>{skill.icon}</Text>
                    <Text style={styles.skillLabel}>{skill.label}</Text>
                    <Text style={styles.skillCount}>{count} {t('progress.activities', 'activities')}</Text>
                  </View>
                );
              })}
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Struggling areas */}
      {(progress.strugglingAreas?.length || 0) > 0 && (
        <Card style={[styles.card, { borderLeftWidth: 4, borderLeftColor: colors.error }]}>
          <Card.Content>
            <Text variant="titleMedium" style={{ fontWeight: '700', marginBottom: 8 }}>
              💪 {t('progress.needsAttention', 'Needs Attention')}
            </Text>
            {progress.strugglingAreas.map((area: MasteryArea, idx: number) => (
              <View key={idx} style={styles.areaItem}>
                <View style={styles.areaInfo}>
                  <Text style={styles.areaTitle}>{area.lessonTitle || area.category}</Text>
                  <Text style={styles.areaMeta}>{area.skillType} · {area.score}%</Text>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Tips */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ fontWeight: '700', marginBottom: 12 }}>
            {t('progress.learningTips', 'Learning Tips')}
          </Text>
          {[
            { icon: '🔄', title: t('progress.tipRepetition', 'Spaced Repetition'), desc: t('progress.tipRepetitionDesc', 'Review flashcards regularly') },
            { icon: '🎯', title: t('progress.tipPractice', 'Active Practice'), desc: t('progress.tipPracticeDesc', 'Take quizzes after each lesson') },
            { icon: '🌍', title: t('progress.tipDiversify', 'Diversify'), desc: t('progress.tipDiversifyDesc', 'Mix different lesson categories') },
            { icon: '📈', title: t('progress.tipConsistent', 'Stay Consistent'), desc: t('progress.tipConsistentDesc', 'Study a little every day') },
          ].map((tip, idx) => (
            <View key={idx} style={styles.tipItem}>
              <Text style={styles.tipIcon}>{tip.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDesc}>{tip.desc}</Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  container: { padding: 16, paddingTop: 0, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText: { color: colors.error, fontSize: 16, textAlign: 'center' },

  header: {
    marginLeft: -16,
    marginRight: -16,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: colors.accentGreen,
    marginBottom: 16,
  },
  headerTitle: { fontWeight: '700', color: '#fff' },
  headerSubtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 15, marginTop: 4 },

  card: { backgroundColor: colors.surface, borderRadius: 14, marginBottom: 12, elevation: 1 },
  achievementCard: { backgroundColor: '#fff5f0' },
  achievementContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  achievementIcon: { fontSize: 36 },
  achievementTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  achievementXp: { color: colors.primary, fontWeight: '600', marginTop: 2 },

  masteryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 },
  masteryCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  masteryIcon: { fontSize: 28, marginBottom: 4 },
  masteryCount: { fontSize: 24, fontWeight: '800', color: colors.textPrimary },
  masteryLabel: { fontSize: 13, color: colors.textSecondary, marginBottom: 8 },
  masteryBar: { width: '100%', height: 4, borderRadius: 2 },

  emptyText: { color: colors.textMuted, textAlign: 'center', paddingVertical: 12 },

  areaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  areaInfo: { flex: 1 },
  areaTitle: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  areaMeta: { fontSize: 12, color: colors.textMuted, marginTop: 2, textTransform: 'capitalize' },
  areaScore: { alignItems: 'flex-end' },
  areaScoreText: { fontSize: 16, fontWeight: '700' },
  areaAttempts: { fontSize: 11, color: colors.textMuted },

  skillsGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  skillItem: { alignItems: 'center', width: '22%' },
  skillCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  skillPct: { fontSize: 14, fontWeight: '800' },
  skillIcon: { fontSize: 18, marginBottom: 2 },
  skillLabel: { fontSize: 11, fontWeight: '600', color: colors.textPrimary },
  skillCount: { fontSize: 10, color: colors.textMuted },

  tipItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  tipIcon: { fontSize: 24 },
  tipTitle: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  tipDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
});

export default ProgressScreen;
