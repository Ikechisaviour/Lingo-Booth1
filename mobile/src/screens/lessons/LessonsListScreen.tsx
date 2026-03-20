import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import { Text, Chip, Button, FAB } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { lessonService, progressService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { getLangNativeName } from '../../config/languages';
import { useAppColors, type AppColors } from '../../config/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
  const { userId } = useAuthStore();
  const { targetLanguage } = useSettingsStore();
  const colors = useAppColors();
  const { height: winHeight, width: winWidth } = useWindowDimensions();
  const isCompact = winHeight < 450 || winWidth < 380;
  const styles = useMemo(() => createStyles(colors, isCompact), [colors, isCompact]);

  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [diffFilter, setDiffFilter] = useState('');
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  // Playlist selection
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

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
  }, [catFilter, diffFilter, targetLanguage, t]);

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

  const startPlaylist = (playlist: string[]) => {
    if (playlist.length === 0) return;
    navigation.navigate('LessonDetail', {
      lessonId: playlist[0],
      playlist,
      playlistIndex: 0,
    });
    setSelectMode(false);
    setSelectedIds(new Set());
  };

  const handleStartAll = () => {
    startPlaylist(lessons.map((l) => l._id));
  };

  const handleStartSelected = () => {
    // Preserve order from lessons list
    const ordered = lessons.filter((l) => selectedIds.has(l._id)).map((l) => l._id);
    startPlaylist(ordered);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const renderLesson = ({ item }: { item: any }) => {
    const progress = progressMap[item._id] || 0;
    const diffColor = getDifficultyColor(item.difficulty);
    const isSelected = selectedIds.has(item._id);

    return (
      <TouchableOpacity
        style={[styles.lessonCard, isSelected && styles.lessonCardSelected]}
        onPress={() => {
          if (selectMode) {
            toggleSelect(item._id);
          } else {
            navigation.navigate('LessonDetail', { lessonId: item._id });
          }
        }}
        activeOpacity={0.7}
      >
        {selectMode && (
          <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
            {isSelected && <Text style={styles.checkmark}>✓</Text>}
          </View>
        )}
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
      <View style={[styles.header, { paddingTop: insets.top + (isCompact ? 4 : 16) }]}>
        <View style={styles.headerTop}>
          <View>
            <Text variant="headlineSmall" style={styles.headerTitle}>
              {getLangNativeName(targetLanguage)} {t('lessons.lessons', 'Lessons')}
            </Text>
            <Text style={styles.headerStat}>
              📚 {t('lessons.lessonsAvailable', { count: lessons.length })}
            </Text>
          </View>
          {lessons.length > 0 && (
            <Button
              mode={selectMode ? 'outlined' : 'text'}
              compact
              onPress={() => {
                setSelectMode(!selectMode);
                setSelectedIds(new Set());
              }}
              textColor={selectMode ? 'rgba(255,200,180,1)' : '#fff'}
            >
              {selectMode ? t('common.cancel', 'Cancel') : t('lessons.select', 'Select')}
            </Button>
          )}
        </View>

        {/* Selection action bar */}
        {selectMode && (
          <View style={styles.selectionBar}>
            <Text style={styles.selectionCount}>
              {selectedIds.size > 0
                ? t('lessons.selectedCount', { count: selectedIds.size })
                : t('lessons.tapToSelect', 'Tap lessons to select')}
            </Text>
            {selectedIds.size > 0 && (
              <Button mode="contained" compact onPress={handleStartSelected} style={styles.startBtn}>
                ▶ {t('lessons.startSelected', 'Start Selected')}
              </Button>
            )}
          </View>
        )}
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
          key={isCompact ? 'compact-1col' : 'normal-2col'}
          numColumns={isCompact ? 1 : 2}
          columnWrapperStyle={isCompact ? undefined : styles.row}
          contentContainerStyle={[styles.listContent, { paddingBottom: 96 }]}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
        />
      )}

      {/* Start All FAB — only visible when not in select mode */}
      {!selectMode && lessons.length > 0 && (
        <FAB
          icon="play"
          label={t('lessons.startAll', 'Start All')}
          style={styles.fab}
          onPress={handleStartAll}
          color="#fff"
        />
      )}
    </View>
  );
};

const createStyles = (colors: AppColors, isCompact = false) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: isCompact ? 10 : 16,
    paddingBottom: isCompact ? 6 : 12,
    backgroundColor: colors.primary,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerTitle: { fontWeight: '700', color: '#fff' },
  headerStat: { color: 'rgba(255,255,255,0.82)', fontSize: 14, marginTop: 4 },

  selectionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginTop: 4,
  },
  selectionCount: { fontSize: 13, color: 'rgba(255,255,255,0.85)' },
  startBtn: { borderRadius: 8, backgroundColor: colors.accentGreen },

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
    borderRadius: isCompact ? 10 : 14,
    padding: isCompact ? 12 : 16,
    marginBottom: isCompact ? 8 : 12,
    width: isCompact ? '100%' : '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  lessonCardSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: '#eff6ff',
  },
  checkbox: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: '700' },
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

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
  },
});

export default LessonsListScreen;
