import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { curriculumV2Service } from '../../services/api';
import { useAppColors, type AppColors } from '../../config/theme';

// Browse the full v2 catalog (concepts → lessons). Tapping a concept's
// lesson opens the lesson runner. Mirrors the web `LessonCatalogPage`.

type CatalogConcept = {
  id: string;
  title?: string;
  level?: string;
  kind?: string;
  lessons?: Array<{ id: string; lessonType: string; title?: string }>;
};

const V2CatalogScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [concepts, setConcepts] = useState<CatalogConcept[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    curriculumV2Service.getCatalog()
      .then((res) => {
        if (cancelled) return;
        const list: CatalogConcept[] = Array.isArray(res.data?.concepts) ? res.data.concepts : [];
        setConcepts(list);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.response?.data?.message || err?.message || t('curriculumV2.catalogLoadFailed', "Couldn't load the catalog."));
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [t]);

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.panel}>
        <Text style={styles.kicker}>{t('curriculumV2.catalogKicker', 'Catalog')}</Text>
        <Text variant="headlineSmall" style={styles.title}>
          {t('curriculumV2.catalogTitle', 'Browse all lessons')}
        </Text>

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}

        {!!error && !loading && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && !error && concepts.length === 0 && (
          <Text style={styles.subtitle}>
            {t('curriculumV2.catalogEmpty', 'No concepts available yet.')}
          </Text>
        )}

        {!loading && !error && concepts.map((concept) => {
          const isOpen = expanded.has(concept.id);
          const lessons = concept.lessons || [];
          return (
            <View key={concept.id} style={styles.conceptCard}>
              <TouchableOpacity
                style={styles.conceptHeader}
                activeOpacity={0.75}
                onPress={() => toggle(concept.id)}
              >
                <View style={styles.conceptHeaderText}>
                  <Text style={styles.conceptTitle} numberOfLines={2}>
                    {concept.title || concept.id}
                  </Text>
                  <Text style={styles.conceptMeta}>
                    {t('curriculumV2.conceptMeta', '{{count}} lessons', { count: lessons.length })}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name={isOpen ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color={colors.textMuted}
                />
              </TouchableOpacity>

              {isOpen && lessons.map((lesson) => (
                <TouchableOpacity
                  key={lesson.id}
                  style={styles.lessonRow}
                  activeOpacity={0.75}
                  onPress={() => navigation.navigate('V2LessonRunner', {
                    lessonId: lesson.id,
                    lessonType: lesson.lessonType,
                  })}
                >
                  <Text style={styles.lessonRowType}>
                    {t(`curriculumV2.lessonTypes.${lesson.lessonType}`, lesson.lessonType)}
                  </Text>
                  <Text style={styles.lessonRowTitle} numberOfLines={1}>
                    {lesson.title || t('curriculumV2.untitledLesson', 'Lesson')}
                  </Text>
                  <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          );
        })}

        <Button mode="text" onPress={() => navigation.goBack()} icon="arrow-left">
          {t('curriculumV2.back', 'Back')}
        </Button>
      </View>
    </ScrollView>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18, paddingBottom: 96, flexGrow: 1 },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    padding: 22,
    gap: 12,
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: { color: colors.textPrimary, fontWeight: '700' },
  subtitle: { color: colors.textMuted, lineHeight: 20 },
  loadingBox: { alignItems: 'center', paddingVertical: 22 },
  errorBox: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  errorText: { color: '#7f1d1d' },
  conceptCard: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  conceptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  conceptHeaderText: { flex: 1, gap: 2 },
  conceptTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  conceptMeta: { color: colors.textMuted, fontSize: 12 },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  lessonRowType: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    minWidth: 90,
  },
  lessonRowTitle: { color: colors.textPrimary, flex: 1 },
});

export default V2CatalogScreen;
