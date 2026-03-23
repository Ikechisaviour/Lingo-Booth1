import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Text, Button, Card, ProgressBar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { progressService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import { useAppColors, type AppColors } from '../../config/theme';
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
  const colors = useAppColors();
  const { height: winHeight, width: winWidth } = useWindowDimensions();
  const isCompact = winHeight < 450 || winWidth < 380;

  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [selectedMastery, setSelectedMastery] = useState<string | null>(null);
  const styles = useMemo(() => createStyles(colors, isCompact), [colors, isCompact]);

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

  // Dynamic tips based on actual progress — must be before early returns to keep hook order stable
  const dynamicTips = useMemo(() => {
    if (!progress) return [];
    const tips: { icon: string; title: string; desc: string; color: string }[] = [];
    const strugglingCount = progress.strugglingAreas?.length || 0;
    const masteredCount = progress.mastered || 0;
    const learningCount = progress.learning || 0;
    const comfortableCount = progress.comfortable || 0;
    const stats = progress.skillStats || {};

    // Find weakest skill
    const skillKeys = ['listening', 'reading', 'writing', 'speaking'];
    let weakestSkill = '';
    let weakestAvg = 101;
    let strongestSkill = '';
    let strongestAvg = -1;
    for (const sk of skillKeys) {
      const avg = stats[sk]?.averageScore ?? -1;
      if (avg >= 0 && avg < weakestAvg) { weakestAvg = avg; weakestSkill = sk; }
      if (avg > strongestAvg) { strongestAvg = avg; strongestSkill = sk; }
    }

    // Tip 1: If struggling areas exist
    if (strugglingCount > 0) {
      tips.push({
        icon: '🔥',
        title: t('progress.tipFocusWeak', 'Focus on Weak Areas'),
        desc: t('progress.tipFocusWeakDesc', {
          defaultValue: 'You have {{count}} struggling areas. Review them daily to improve faster.',
          count: strugglingCount,
        }),
        color: '#ef4444',
      });
    }

    // Tip 2: Weakest skill
    if (weakestSkill && weakestAvg < 70) {
      const skillLabel = t(`progress.${weakestSkill}`, weakestSkill);
      tips.push({
        icon: '🎯',
        title: t('progress.tipBoostSkill', { defaultValue: 'Boost Your {{skill}}', skill: skillLabel }),
        desc: t('progress.tipBoostSkillDesc', {
          defaultValue: 'Your {{skill}} average is {{avg}}%. Try more {{skill}} exercises.',
          skill: skillLabel.toLowerCase(),
          avg: weakestAvg,
        }),
        color: '#f59e0b',
      });
    }

    // Tip 3: Based on mastery distribution
    if (masteredCount > 0 && learningCount > masteredCount) {
      tips.push({
        icon: '📚',
        title: t('progress.tipDeepen', 'Deepen Your Knowledge'),
        desc: t('progress.tipDeepenDesc', 'You have many items still in progress. Revisit lessons before moving on.'),
        color: '#a560e8',
      });
    } else if (masteredCount > 5) {
      tips.push({
        icon: '🚀',
        title: t('progress.tipChallenge', 'Challenge Yourself'),
        desc: t('progress.tipChallengeDesc', {
          defaultValue: "You've mastered {{count}} areas! Try harder lessons to keep growing.",
          count: masteredCount,
        }),
        color: '#10b981',
      });
    }

    // Tip 4: Strongest skill encouragement
    if (strongestSkill && strongestAvg >= 70) {
      const skillLabel = t(`progress.${strongestSkill}`, strongestSkill);
      tips.push({
        icon: '⭐',
        title: t('progress.tipStrength', { defaultValue: '{{skill}} is Your Strength!', skill: skillLabel }),
        desc: t('progress.tipStrengthDesc', {
          defaultValue: 'Great work at {{avg}}%! Keep it up and try advanced content.',
          avg: strongestAvg,
        }),
        color: '#1cb0f6',
      });
    }

    // Tip 5: If comfortable items exist, push toward mastery
    if (comfortableCount > 0) {
      tips.push({
        icon: '🏆',
        title: t('progress.tipMasterNext', 'Push to Mastery'),
        desc: t('progress.tipMasterNextDesc', {
          defaultValue: '{{count}} areas are almost mastered. A few more reviews and you\'ll get there!',
          count: comfortableCount,
        }),
        color: '#10b981',
      });
    }

    // Tip 6: Spaced repetition (always good but lower priority)
    tips.push({
      icon: '🔄',
      title: t('progress.tipRepetition', 'Spaced Repetition'),
      desc: t('progress.tipRepetitionDesc', 'Review flashcards regularly to lock in long-term memory.'),
      color: '#6b7280',
    });

    // Show max 4 tips, prioritized by the order above
    return tips.slice(0, 4);
  }, [progress, t]);

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
      <View style={[styles.header, { paddingTop: insets.top + (isCompact ? 4 : 16) }]}>
        <Text variant="headlineSmall" style={styles.headerTitle}>
          {t('progress.title', 'Your Progress')}
        </Text>
        <Text style={styles.headerSubtitle}>{t('progress.subtitle', 'Track your learning journey')}</Text>
      </View>

      {/* Achievement Banner */}
      {(progress.mastered || 0) > 0 && (
        <View style={styles.achievementBanner}>
          <Text style={styles.achievementIcon}>🏆</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.achievementTitle}>
              {progress.mastered} {t('progress.mastered', 'Mastered')}!
            </Text>
            <Text style={styles.achievementXp}>⚡ {progress.mastered * 10} XP {t('progress.xpEarned', 'earned')}</Text>
          </View>
        </View>
      )}

      {/* Mastery Stats */}
      <View style={styles.masteryGrid}>
        {masteryLevels.map((level) => {
          const count = progress[level.key] || 0;
          const pct = total > 0 ? count / total : 0;
          const isSelected = selectedMastery === level.key;
          return (
            <TouchableOpacity
              key={level.key}
              style={[
                styles.masteryCard,
                { borderColor: isSelected ? level.color : level.color + '30', borderTopWidth: 3, borderTopColor: level.color },
              ]}
              onPress={() => setSelectedMastery(isSelected ? null : level.key)}
              activeOpacity={0.7}
            >
              <Text style={styles.masteryIcon}>{level.icon}</Text>
              <Text style={[styles.masteryCount, { color: level.color }]}>{count}</Text>
              <Text style={styles.masteryLabel}>{level.label}</Text>
              <View style={styles.masteryBarContainer}>
                <ProgressBar progress={pct} color={level.color} style={styles.masteryBar} />
                <Text style={[styles.masteryPct, { color: level.color }]}>{Math.round(pct * 100)}%</Text>
              </View>
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
                const avg = Math.round(stat?.averageScore || 0);
                const count = stat?.count || 0;
                return (
                  <View key={skill.key} style={styles.skillItem}>
                    <View style={[styles.skillCircle, { borderColor: skill.color, backgroundColor: skill.color + '10' }]}>
                      <Text style={[styles.skillPct, { color: skill.color }]}>{avg}</Text>
                      <Text style={[styles.skillPctSign, { color: skill.color }]}>%</Text>
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

      {/* Dynamic Tips */}
      <Card style={[styles.card, styles.tipsCard]}>
        <Card.Content>
          <View style={styles.tipsHeader}>
            <Text style={styles.tipsHeaderIcon}>💡</Text>
            <Text variant="titleMedium" style={styles.tipsHeaderTitle}>
              {t('progress.personalizedTips', 'Tips For You')}
            </Text>
          </View>
          {dynamicTips.map((tip, idx) => (
            <View key={idx} style={styles.tipItem}>
              <View style={[styles.tipIconBadge, { backgroundColor: tip.color + '18' }]}>
                <Text style={styles.tipIcon}>{tip.icon}</Text>
              </View>
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

const createStyles = (colors: AppColors, isCompact = false) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  container: { padding: isCompact ? 10 : 16, paddingTop: 0, paddingBottom: isCompact ? 16 : 32 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText: { color: colors.error, fontSize: 16, textAlign: 'center' },

  header: {
    marginLeft: isCompact ? -10 : -16,
    marginRight: isCompact ? -10 : -16,
    paddingHorizontal: isCompact ? 10 : 16,
    paddingBottom: isCompact ? 10 : 20,
    backgroundColor: colors.primary,
    marginBottom: isCompact ? 8 : 16,
  },
  headerTitle: { fontWeight: '700', color: '#fff' },
  headerSubtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 15, marginTop: 4 },

  card: { backgroundColor: colors.surface, borderRadius: isCompact ? 10 : 14, marginBottom: isCompact ? 8 : 12, elevation: 1 },
  achievementBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#10b981',
    borderRadius: isCompact ? 10 : 14,
    padding: isCompact ? 12 : 16,
    marginBottom: isCompact ? 8 : 12,
    elevation: 2,
  },
  achievementIcon: { fontSize: isCompact ? 32 : 40 },
  achievementTitle: { fontSize: isCompact ? 18 : 20, fontWeight: '800', color: '#fff' },
  achievementXp: { color: 'rgba(255,255,255,0.9)', fontWeight: '600', fontSize: 14, marginTop: 2 },

  masteryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 8 },
  masteryCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: isCompact ? 10 : 14,
    padding: isCompact ? 10 : 14,
    alignItems: 'center',
    marginBottom: isCompact ? 8 : 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  masteryIcon: { fontSize: isCompact ? 20 : 26, marginBottom: isCompact ? 2 : 4 },
  masteryCount: { fontSize: isCompact ? 22 : 28, fontWeight: '800' },
  masteryLabel: { fontSize: isCompact ? 11 : 13, color: colors.textSecondary, marginBottom: isCompact ? 4 : 8 },
  masteryBarContainer: { width: '100%', flexDirection: 'row', alignItems: 'center', gap: 6 },
  masteryBar: { flex: 1, height: 6, borderRadius: 3 },
  masteryPct: { fontSize: 11, fontWeight: '700' },

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
  skillItem: { alignItems: 'center', width: '23%' },
  skillCircle: {
    width: isCompact ? 48 : 60,
    height: isCompact ? 48 : 60,
    borderRadius: isCompact ? 24 : 30,
    borderWidth: isCompact ? 3 : 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isCompact ? 4 : 6,
  },
  skillPct: { fontSize: isCompact ? 13 : 16, fontWeight: '800', lineHeight: isCompact ? 15 : 18 },
  skillPctSign: { fontSize: isCompact ? 8 : 9, fontWeight: '700', marginTop: -2 },
  skillIcon: { fontSize: isCompact ? 14 : 18, marginBottom: 2 },
  skillLabel: { fontSize: isCompact ? 10 : 12, fontWeight: '600', color: colors.textPrimary },
  skillCount: { fontSize: isCompact ? 9 : 10, color: colors.textMuted },

  tipsCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    backgroundColor: colors.surface,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  tipsHeaderIcon: { fontSize: 22 },
  tipsHeaderTitle: { fontWeight: '800', fontSize: 17, color: colors.textPrimary },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: isCompact ? 8 : 12,
    marginBottom: isCompact ? 8 : 14,
    backgroundColor: colors.background,
    borderRadius: isCompact ? 8 : 12,
    padding: isCompact ? 8 : 12,
  },
  tipIconBadge: {
    width: isCompact ? 30 : 40,
    height: isCompact ? 30 : 40,
    borderRadius: isCompact ? 15 : 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipIcon: { fontSize: isCompact ? 16 : 20 },
  tipTitle: { fontSize: isCompact ? 13 : 15, fontWeight: '700', color: colors.textPrimary },
  tipDesc: { fontSize: isCompact ? 11 : 13, color: colors.textSecondary, marginTop: 3, lineHeight: isCompact ? 15 : 18 },
});

export default ProgressScreen;
