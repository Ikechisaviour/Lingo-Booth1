import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Text, Chip, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { lessonService, progressService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { getLangName } from '../../config/languages';
import { colors } from '../../config/theme';

const categories = [
  { value: 'daily-life', icon: '🏠' },
  { value: 'business', icon: '💼' },
  { value: 'travel', icon: '✈️' },
  { value: 'greetings', icon: '👋' },
  { value: 'food', icon: '🍜' },
  { value: 'shopping', icon: '🛒' },
  { value: 'healthcare', icon: '🏥' },
];

const difficulties = [
  { value: 'beginner', color: '#58cc02' },
  { value: 'intermediate', color: '#1cb0f6' },
  { value: 'advanced', color: '#a560e8' },
  { value: 'sentences', color: '#ff6b35' },
];

const getCategoryIcon = (val: string) => categories.find((c) => c.value === val)?.icon || '📚';
const getDifficultyColor = (val: string) => difficulties.find((d) => d.value === val)?.color || '#58cc02';

const LessonsListScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { userId } = useAuthStore();
  const { targetLanguage } = useSettingsStore();

  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [diffFilter, setDiffFilter] = useState('');
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  const fetchLessons = useCallback(async () => {
    try {
      setLoading(true);
      const res = await lessonService.getLessons(catFilter || undefined, diffFilter || undefined);
      setLessons(res.data);
      setError('');
    } catch {
      setError(t('lessons.failedToLoad'));
    } finally {
      setLoading(false);
    }
  }, [catFilter, diffFilter, t]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  useEffect(() => {
    if (!userId) return;
    progressService.getProgress(userId).then((res) => {
      const map: Record<string, number[]> = {};
      res.data.forEach((p: any) => {
        const lid = p.lessonId?._id || p.lessonId;
        if (lid) {
          if (!map[lid]) map[lid] = [];
          map[lid].push(p.score || 0);
        }
      });
      const avgMap: Record<string, number> = {};
      Object.keys(map).forEach((lid) => {
        const scores = map[lid];
        avgMap[lid] = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      });
      setProgressMap(avgMap);
    }).catch(() => {});
  }, [userId]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLessons();
    setRefreshing(false);
  };

  const renderLesson = ({ item }: { item: any }) => {
    const progress = progressMap[item._id] || 0;
    const diffColor = getDifficultyColor(item.difficulty);

    return (
      <TouchableOpacity
        style={styles.lessonCard}
        onPress={() => navigation.navigate('LessonDetail', { lessonId: item._id })}
        activeOpacity={0.7}
      >
        <View style={styles.cardTop}>
          <View style={[styles.lessonIcon, { backgroundColor: `${diffColor}20` }]}>
            <Text style={styles.iconEmoji}>{getCategoryIcon(item.category)}</Text>
          </View>
          <View style={[styles.diffBadge, { backgroundColor: diffColor }]}>
            <Text style={styles.diffBadgeText}>
              {String(t(`lessons.difficulties.${item.difficulty}`, item.difficulty))}
            </Text>
          </View>
        </View>
        <Text style={styles.lessonTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.lessonCategory}>
          {String(t(`lessons.categories.${item.category}`, item.category))}
        </Text>
        <View style={styles.lessonFooter}>
          <Text style={styles.metaText}>📝 {t('lessons.items', { count: item.content?.length || 0 })}</Text>
          {progress > 0 && (
            <Text style={[styles.progressText, { color: diffColor }]}>{progress}%</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.headerTitle}>
          {getLangName(targetLanguage)} {t('lessons.lessons', 'Lessons')}
        </Text>
        <Text style={styles.headerStat}>
          📚 {t('lessons.lessonsAvailable', { count: lessons.length })}
        </Text>
      </View>

      {/* Category filter */}
      <View style={styles.filterRow}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ value: '', icon: '🌐' }, ...categories]}
          keyExtractor={(item) => item.value}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <Chip
              selected={catFilter === item.value}
              onPress={() => setCatFilter(item.value)}
              style={[styles.filterChip, catFilter === item.value && styles.filterChipActive]}
              textStyle={catFilter === item.value ? styles.filterTextActive : undefined}
            >
              {item.icon} {item.value ? t(`lessons.categories.${item.value}`, item.value) : t('lessons.all', 'All')}
            </Chip>
          )}
        />
      </View>

      {/* Difficulty filter */}
      <View style={styles.filterRow}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ value: '', color: colors.textMuted }, ...difficulties]}
          keyExtractor={(item) => item.value || 'all'}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <Chip
              selected={diffFilter === item.value}
              onPress={() => setDiffFilter(item.value)}
              style={[styles.filterChip, diffFilter === item.value && styles.filterChipActive]}
              textStyle={diffFilter === item.value ? styles.filterTextActive : undefined}
            >
              {item.value ? t(`lessons.difficulties.${item.value}`, item.value) : t('lessons.allLevels', 'All Levels')}
            </Chip>
          )}
        />
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <Button mode="contained" onPress={fetchLessons} style={{ marginTop: 16 }}>
            {t('common.retry', 'Retry')}
          </Button>
        </View>
      ) : lessons.length === 0 ? (
        <View style={styles.centered}>
          <Text style={{ fontSize: 48 }}>📚</Text>
          <Text variant="titleMedium" style={{ fontWeight: '700', marginTop: 12 }}>
            {t('lessons.noLessons')}
          </Text>
          <Button mode="outlined" onPress={() => { setCatFilter(''); setDiffFilter(''); }} style={{ marginTop: 12 }}>
            {t('lessons.clearFilters', 'Clear Filters')}
          </Button>
        </View>
      ) : (
        <FlatList
          data={lessons}
          keyExtractor={(item) => item._id}
          renderItem={renderLesson}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: colors.surface,
  },
  headerTitle: { fontWeight: '700', color: colors.textPrimary },
  headerStat: { color: colors.textSecondary, fontSize: 14, marginTop: 4 },

  filterRow: { backgroundColor: colors.surface, paddingBottom: 4 },
  filterList: { paddingHorizontal: 12, gap: 6 },
  filterChip: { marginVertical: 4 },
  filterChipActive: { backgroundColor: colors.primary },
  filterTextActive: { color: '#fff' },

  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText: { color: colors.error, fontSize: 16, textAlign: 'center' },

  listContent: { padding: 8 },
  row: { justifyContent: 'space-between', paddingHorizontal: 8 },

  lessonCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  lessonIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  iconEmoji: { fontSize: 20 },
  diffBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  diffBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700', textTransform: 'capitalize' },
  lessonTitle: { fontSize: 14, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  lessonCategory: { fontSize: 12, color: colors.textSecondary, textTransform: 'capitalize', marginBottom: 8 },
  lessonFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metaText: { fontSize: 12, color: colors.textMuted },
  progressText: { fontSize: 13, fontWeight: '700' },
});

export default LessonsListScreen;
