import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { learningHubService } from '../../services/api';
import speechService from '../../services/speechService';
import { useSettingsStore } from '../../stores/settingsStore';
import { getLangTtsLocale } from '../../config/languages';
import { useAppColors, type AppColors } from '../../config/theme';

const REVIEW_RESULTS = ['again', 'hard', 'good', 'easy'] as const;

const GRADE_COLOR: Record<typeof REVIEW_RESULTS[number], keyof AppColors> = {
  again: 'accentRed',
  hard: 'accentYellow',
  good: 'accentGreen',
  easy: 'accentBlue',
};

const classResultMeta = (lesson: any, t: (key: string, options?: any) => string) => {
  if (lesson?.category) return lesson.category;
  if (lesson?.lessonType) return t(`classList.tracks.${lesson.lessonType}`, lesson.lessonType);
  return '';
};

const cacheKeyFor = (nativeLanguage: string, targetLanguage: string) =>
  `learningHubOverview:${nativeLanguage}:${targetLanguage}`;

const sourceRouteFor = (item: any) => {
  if (item?.metadata?.route) return item.metadata.route;
  if (item?.sourceType === 'class' && item.sourceRef) return `/class/${item.sourceRef}`;
  if (item?.sourceType === 'quiz' && item.sourceRef) return `/quiz/${item.sourceRef}`;
  if (item?.sourceType === 'flashcard') return '/flashcards';
  if (item?.sourceType === 'writing') return '/writing';
  if (item?.sourceType === 'conversation') return '/conversation';
  return '';
};

const ReviewScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { nativeLanguage, targetLanguage } = useSettingsStore();
  const [overview, setOverview] = useState<any>(null);
  const [libraryItems, setLibraryItems] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [busyId, setBusyId] = useState('');
  const [loading, setLoading] = useState(true);
  const [usingOfflinePack, setUsingOfflinePack] = useState(false);
  const [quickQuizItem, setQuickQuizItem] = useState<any>(null);
  const [quickQuizRevealed, setQuickQuizRevealed] = useState(false);
  const [libraryFilter, setLibraryFilter] = useState<'all' | 'correction' | 'bookmark' | 'roleplay'>('all');

  const loadOverview = useCallback(async () => {
    setLoading(true);
    try {
      const [overviewRes, savedItemsRes] = await Promise.all([
        learningHubService.getOverview(),
        learningHubService.getSavedItems(),
      ]);
      setOverview(overviewRes.data);
      setLibraryItems(savedItemsRes.data || []);
      setUsingOfflinePack(false);
      await AsyncStorage.setItem(cacheKeyFor(nativeLanguage, targetLanguage), JSON.stringify({
        overview: overviewRes.data,
        savedItems: savedItemsRes.data || [],
      }));
    } catch {
      const cached = await AsyncStorage.getItem(cacheKeyFor(nativeLanguage, targetLanguage));
      if (cached) {
        const parsed = JSON.parse(cached);
        setOverview(parsed.overview || parsed);
        setLibraryItems(parsed.savedItems || parsed.overview?.savedItems || []);
        setUsingOfflinePack(true);
      }
    } finally {
      setLoading(false);
    }
  }, [nativeLanguage, targetLanguage]);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  useEffect(() => {
    if (!route.params?.quickQuizItem) return;
    setQuickQuizItem(route.params.quickQuizItem);
    setQuickQuizRevealed(false);
    navigation.setParams({ quickQuizItem: undefined });
  }, [navigation, route.params?.quickQuizItem]);

  const dueItems = overview?.reviewQueue?.dueSavedItems || [];
  const unifiedItems = overview?.reviewQueue?.unifiedItems || dueItems.map((item: any) => ({ kind: 'saved_item', item }));
  const savedItems = libraryItems;
  const weakAreas = overview?.reviewQueue?.weakAreas || [];
  const corrections = savedItems.filter((item: any) => item.itemType === 'correction');
  const roleplays = savedItems.filter((item: any) => item.itemType === 'roleplay');
  const bookmarks = savedItems.filter((item: any) => item.itemType === 'bookmark');
  const filteredLibraryItems = libraryFilter === 'all'
    ? savedItems
    : savedItems.filter((item: any) => item.itemType === libraryFilter);
  const abilityProgress = Object.entries(overview?.abilityProgress || {});
  const reviewBeforeSleep = overview?.reviewBeforeSleep || [];
  const miniSpeakingDrills = overview?.miniSpeakingDrills || [];
  const recentWords = overview?.recentWords || [];
  const studyHistory = overview?.studyHistory || [];
  const hasReviewBeforeSleep = new Date().getHours() >= 18 && reviewBeforeSleep.length > 0;

  const reviewItem = async (itemId: string, result: typeof REVIEW_RESULTS[number]) => {
    setBusyId(itemId);
    try {
      await learningHubService.reviewItem(itemId, result);
      await loadOverview();
    } finally {
      setBusyId('');
    }
  };

  const deleteItem = async (itemId: string) => {
    setBusyId(itemId);
    try {
      await learningHubService.deleteItem(itemId);
      await loadOverview();
    } finally {
      setBusyId('');
    }
  };

  const search = async () => {
    if (!query.trim()) {
      setSearchResult(null);
      return;
    }
    const res = await learningHubService.search(query.trim());
    setSearchResult(res.data);
  };

  const openAskTutor = (item: any) => {
    navigation.navigate('Conversation', {
      starter: t('learningHub.askTutorPrompt', {
        text: item.targetText,
        defaultValue: 'Help me practice "{{text}}".',
      }),
    });
  };

  const hearTarget = (item: any) => {
    if (!item?.targetText) return;
    speechService.speak(item.targetText, { lang: getLangTtsLocale(targetLanguage) });
  };

  const openSource = (item: any) => {
    const route = sourceRouteFor(item);
    if (route.startsWith('/class/')) {
      navigation.navigate('Class', { screen: 'ClassLesson', params: { classLessonId: route.split('/').pop() } });
      return;
    }
    if (route.startsWith('/quiz/')) {
      navigation.navigate('Exercise', {
        screen: 'Quiz',
        params: { screen: 'QuizDetail', params: { quizId: route.split('/').pop() } },
      });
      return;
    }
    if (route === '/flashcards') {
      navigation.navigate('Exercise', { screen: 'Flashcards' });
      return;
    }
    if (route === '/writing') {
      navigation.navigate('Exercise', { screen: 'Writing' });
      return;
    }
    if (route === '/conversation') {
      navigation.navigate('Conversation');
    }
  };

  const openPracticeSurface = (item: any, surface: 'conversation' | 'writing' | 'flashcard') => {
    if (surface === 'conversation') {
      openAskTutor(item);
      return;
    }
    if (surface === 'writing') {
      navigation.navigate('Exercise', {
        screen: 'Writing',
        params: {
          savedText: item.targetText || '',
          nativeText: item.nativeText || '',
        },
      });
      return;
    }
    navigation.navigate('Exercise', {
      screen: 'Flashcards',
      params: {
        savedText: item.targetText || '',
        nativeText: item.nativeText || '',
      },
    });
  };

  const reuseRoleplay = (item: any) => {
    navigation.navigate('Conversation', {
      scenarioId: item?.metadata?.scenarioId || item?.sourceRef || '',
      customRoleplay: item?.metadata?.customRoleplay,
    });
  };

  const openQuickQuiz = (item: any) => {
    setQuickQuizItem(item);
    setQuickQuizRevealed(false);
  };

  const renderSavedItem = (item: any, reviewable = false) => (
    <View key={item._id} style={styles.itemCard}>
      <Text style={styles.itemTarget}>{item.targetText}</Text>
      {!!item.nativeText && <Text style={styles.itemNative}>{item.nativeText}</Text>}
      <Text style={styles.itemReason}>{item.reason || item.sourceLabel || t('learningHub.savedForPractice', 'Saved for later practice')}</Text>
      <View style={styles.controls}>
        {reviewable && (
          <View style={styles.ratingRow}>
            {REVIEW_RESULTS.map((result) => {
              const tone = colors[GRADE_COLOR[result]];
              return (
                <Button
                  key={result}
                  mode="outlined"
                  compact
                  disabled={busyId === item._id}
                  textColor={tone}
                  buttonColor={tone + '14'}
                  style={[styles.gradeButton, { borderColor: tone + '66' }]}
                  onPress={() => reviewItem(item._id, result)}
                >
                  {t(`learningHub.reviewResults.${result}`, result)}
                </Button>
              );
            })}
          </View>
        )}
        <View style={styles.actionBar}>
          <View style={styles.practiceGroup}>
            <Button mode="text" compact icon="volume-high" textColor={colors.textSecondary} onPress={() => hearTarget(item)}>
              {t('learningHub.practicePronunciation', 'Listen')}
            </Button>
            <Button mode="text" compact icon="message-outline" textColor={colors.textSecondary} onPress={() => openAskTutor(item)}>
              {t('learningHub.askTutor', 'Ask tutor')}
            </Button>
            <Button mode="text" compact icon="pencil-outline" textColor={colors.textSecondary} onPress={() => openPracticeSurface(item, 'writing')}>
              {t('learningHub.practiceWriting', 'Write')}
            </Button>
            <Button mode="text" compact icon="cards-outline" textColor={colors.textSecondary} onPress={() => openPracticeSurface(item, 'flashcard')}>
              {t('learningHub.practiceFlashcard', 'Flashcard')}
            </Button>
            <Button mode="text" compact icon="check-circle-outline" textColor={colors.textSecondary} onPress={() => openQuickQuiz(item)}>
              {t('learningHub.practiceQuiz', 'Self-test')}
            </Button>
          </View>
          <View style={styles.utilityGroup}>
            {item.itemType === 'roleplay' && (
              <IconButton
                icon="repeat"
                size={18}
                iconColor={colors.textMuted}
                accessibilityLabel={String(t('learningHub.useRoleplayAgain', 'Use again'))}
                onPress={() => reuseRoleplay(item)}
              />
            )}
            {!!sourceRouteFor(item) && (
              <IconButton
                icon="open-in-new"
                size={18}
                iconColor={colors.textMuted}
                accessibilityLabel={String(t('learningHub.openSource', 'Open source'))}
                onPress={() => openSource(item)}
              />
            )}
            <IconButton
              icon="trash-can-outline"
              size={18}
              iconColor={colors.error}
              disabled={busyId === item._id}
              accessibilityLabel={String(t('common.delete'))}
              onPress={() => deleteItem(item._id)}
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderUnifiedItem = (entry: any) => {
    if (entry.kind === 'saved_item') return renderSavedItem(entry.item, true);
    const area = entry.area;
    return (
      <View key={`weak-${area._id}`} style={styles.itemCard}>
        <Text style={styles.itemTarget}>{area.title || t('learningHub.practiceArea', 'Practice area')}</Text>
        <Text style={styles.itemNative}>{String(t(`progress.${area.masteryStatus}`, area.masteryStatus))}</Text>
        <Text style={styles.itemReason}>{t('learningHub.whyWeakArea', 'You are seeing this because this area still needs reinforcement.')}</Text>
        <View style={styles.actionRow}>
          {!!area.lessonId && (
            <Button
              mode="outlined"
              compact
              onPress={() => navigation.navigate('Exercise', {
                screen: 'Quiz',
                params: { screen: 'QuizDetail', params: { quizId: area.lessonId } },
              })}
            >
              {t('progress.practice', 'Practice')}
            </Button>
          )}
          <Button
            mode="outlined"
            compact
            onPress={() => navigation.navigate('Conversation', {
              starter: t('learningHub.askWeakAreaPrompt', {
                area: area.title || t('learningHub.practiceArea', 'Practice area'),
                defaultValue: 'Help me practice {{area}}.',
              }),
            })}
          >
            {t('learningHub.askTutor', 'Ask tutor')}
          </Button>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Card style={styles.hero}>
        <Card.Content style={styles.heroContent}>
          <View>
            <Text style={styles.kicker}>{t('learningHub.kicker', 'Review')}</Text>
            <Text variant="headlineSmall" style={styles.title}>{t('learningHub.title', 'Keep useful learning close')}</Text>
            <Text style={styles.subtitle}>{t('learningHub.subtitle', 'Review what needs another pass, return to saved items, and continue from one place.')}</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.count}>{overview?.reviewQueue?.counts?.total || dueItems.length}</Text>
            <Text style={styles.countLabel}>{t('learningHub.dueToday', 'due today')}</Text>
          </View>
        </Card.Content>
      </Card>

      {usingOfflinePack && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.offlineNotice}>
              {t('learningHub.offlinePackInUse', 'Showing your recent pack while the connection is weak.')}
            </Text>
          </Card.Content>
        </Card>
      )}

      {!!quickQuizItem && (
        <Card style={styles.quickQuizCard}>
          <Card.Content style={styles.section}>
            <Text style={styles.kicker}>{t('learningHub.quickQuizKicker', 'Self-test')}</Text>
            <Text style={styles.sectionTitle}>{t('learningHub.quickQuizTitle', 'Quick self-test')}</Text>
            <Text style={styles.itemTarget}>{quickQuizItem.targetText}</Text>
            {quickQuizRevealed ? (
              <>
                <Text style={styles.itemNative}>
                  {quickQuizItem.nativeText || t('learningHub.quickQuizNoAnswer', 'Recall the meaning, then grade yourself honestly.')}
                </Text>
                <View style={styles.ratingRow}>
                  {REVIEW_RESULTS.map((result) => {
                    const tone = colors[GRADE_COLOR[result]];
                    return (
                    <Button
                      key={`quick-${result}`}
                      mode="outlined"
                      compact
                      disabled={busyId === quickQuizItem._id}
                      textColor={tone}
                      buttonColor={tone + '14'}
                      style={[styles.gradeButton, { borderColor: tone + '66' }]}
                      onPress={() => {
                        reviewItem(quickQuizItem._id, result);
                        setQuickQuizItem(null);
                      }}
                    >
                      {t(`learningHub.reviewResults.${result}`, result)}
                    </Button>
                    );
                  })}
                </View>
              </>
            ) : (
              <Button mode="outlined" onPress={() => setQuickQuizRevealed(true)}>
                {t('learningHub.revealAnswer', 'Reveal answer')}
              </Button>
            )}
            <Button mode="text" compact onPress={() => setQuickQuizItem(null)}>
              {t('common.close', 'Close')}
            </Button>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Content style={styles.section}>
          <Text style={styles.sectionTitle}>{t('learningHub.queueTitle', 'Today\'s review queue')}</Text>
          {hasReviewBeforeSleep && (
            <Text style={styles.reviewBeforeSleep}>
              {t('learningHub.reviewBeforeSleep', 'A short review now will leave tomorrow lighter.')}
            </Text>
          )}
          {loading ? (
            <Text>{t('common.loading')}</Text>
          ) : unifiedItems.length ? (
            unifiedItems.map((entry: any) => renderUnifiedItem(entry))
          ) : (
            <Text style={styles.emptyText}>{t('learningHub.queueEmptyBody', 'Save words, phrases, corrections, or roleplays and they will return here when useful.')}</Text>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.section}>
          <Text style={styles.sectionTitle}>{t('learningHub.studyHistoryTitle', 'Study history')}</Text>
          {studyHistory.length ? (
            <View style={styles.studyHistoryGrid}>
              {studyHistory.map((day: any) => (
                <View key={day.day} style={styles.studyHistoryCell}>
                  <Text style={styles.studyHistoryCount}>{day.events}</Text>
                  <Text style={styles.simpleMeta}>{day.day.slice(5)}</Text>
                  <Text style={styles.simpleMeta}>
                    {t('learningHub.pointsCount', { count: day.points, defaultValue: '{{count}} points' })}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>{t('learningHub.studyHistoryEmpty', 'Your study days will gather here as you practice.')}</Text>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.section}>
          <Text style={styles.sectionTitle}>{t('learningHub.weakAreasTitle', 'Recent weak areas')}</Text>
          {weakAreas.length ? weakAreas.map((area: any) => (
            <TouchableOpacity
              key={area._id}
              style={styles.weakRow}
              onPress={() => {
                if (!area.lessonId) return;
                navigation.navigate('Exercise', {
                  screen: 'Quiz',
                  params: { screen: 'QuizDetail', params: { quizId: area.lessonId } },
                });
              }}
              disabled={!area.lessonId}
            >
              <Text style={styles.weakTitle}>{area.title || t('learningHub.practiceArea', 'Practice area')}</Text>
              <Text style={styles.weakMeta}>{String(t(`progress.${area.masteryStatus}`, area.masteryStatus))}</Text>
            </TouchableOpacity>
          )) : <Text style={styles.emptyText}>{t('learningHub.weakAreasEmpty', 'No weak areas have been identified yet.')}</Text>}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.section}>
          <Text style={styles.sectionTitle}>{t('learningHub.abilityTitle', 'Real-world ability progress')}</Text>
          {abilityProgress.length ? abilityProgress.map(([skill, metric]: [string, any]) => (
            <View key={skill} style={styles.abilityRow}>
              <View style={styles.abilityText}>
                <Text style={styles.weakTitle}>{String(t(`learningHub.skills.${skill}`, skill))}</Text>
                <Text style={styles.abilityMeta}>{String(t(`progress.${metric.level}`, metric.level))}</Text>
                {metric.attempts > 0 && (
                  <Text style={styles.abilityMeta}>{t('progress.attempts', { count: metric.attempts })}</Text>
                )}
              </View>
              <Text style={styles.abilityCount}>{metric.score == null ? String(metric.recentPractice) : `${metric.score}%`}</Text>
            </View>
          )) : <Text style={styles.emptyText}>{t('learningHub.abilityEmpty', 'Activity progress will appear here as you practice.')}</Text>}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.section}>
          <Text style={styles.sectionTitle}>{t('learningHub.reviewBeforeSleepTitle', 'Review before sleep')}</Text>
          {reviewBeforeSleep.length ? reviewBeforeSleep.map((entry: any) => (
            <View key={`${entry.kind}-${entry.item?._id || entry.area?._id}`} style={styles.simpleRow}>
              <Text style={styles.simpleTitle}>{entry.item?.targetText || entry.area?.title}</Text>
              <Text style={styles.simpleMeta}>{entry.kind === 'saved_item' ? t('learningHub.savedItem', 'Saved') : t('learningHub.weakArea', 'Weak')}</Text>
            </View>
          )) : <Text style={styles.emptyText}>{t('learningHub.reviewBeforeSleepEmpty', 'Nothing urgent is waiting tonight.')}</Text>}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.section}>
          <Text style={styles.sectionTitle}>{t('learningHub.searchLabel', 'Search your learning')}</Text>
          <View style={styles.searchRow}>
            <TextInput
              mode="outlined"
              value={query}
              onChangeText={setQuery}
              placeholder={t('learningHub.searchPlaceholder', 'Search saved items or class lessons')}
              style={styles.searchInput}
            />
            <Button mode="contained" onPress={search}>{t('common.search', 'Search')}</Button>
          </View>
          {!!searchResult && (
            <View style={styles.searchResults}>
              {(searchResult.savedItems || []).map((item: any) => renderSavedItem(item))}
              {(searchResult.classLessons || []).map((lesson: any) => (
                <TouchableOpacity key={lesson._id} style={styles.classResult} onPress={() => navigation.navigate('Class', { screen: 'ClassLesson', params: { classLessonId: lesson._id } })}>
                  <MaterialCommunityIcons name="school-outline" size={18} color={colors.primary} />
                  <View>
                    <Text style={styles.classResultTitle}>{lesson.title}</Text>
                    {!!classResultMeta(lesson, t) && (
                      <Text style={styles.classResultMeta}>{classResultMeta(lesson, t)}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
              {(searchResult.quizzes || []).map((quiz: any) => (
                <TouchableOpacity
                  key={quiz._id}
                  style={styles.classResult}
                  onPress={() => navigation.navigate('Exercise', {
                    screen: 'Quiz',
                    params: { screen: 'QuizDetail', params: { quizId: quiz._id } },
                  })}
                >
                  <MaterialCommunityIcons name="clipboard-text-outline" size={18} color={colors.primary} />
                  <View>
                    <Text style={styles.classResultTitle}>{quiz.title}</Text>
                    {!!quiz.category && <Text style={styles.classResultMeta}>{quiz.category}</Text>}
                  </View>
                </TouchableOpacity>
              ))}
              {(searchResult.flashcards || []).map((card: any) => (
                <TouchableOpacity key={card._id} style={styles.classResult} onPress={() => openPracticeSurface(card, 'flashcard')}>
                  <MaterialCommunityIcons name="cards-outline" size={18} color={colors.primary} />
                  <View>
                    <Text style={styles.classResultTitle}>{card.targetText}</Text>
                    {!!card.nativeText && <Text style={styles.classResultMeta}>{card.nativeText}</Text>}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.section}>
          <Text style={styles.sectionTitle}>{t('learningHub.savedLibraryTitle', 'Saved study library')}</Text>
          <View style={styles.bankFilterRow}>
            {[
              { id: 'all', count: savedItems.length, label: t('common.all', 'All') },
              { id: 'correction', count: corrections.length, label: t('learningHub.correctionsBank', 'Corrections') },
              { id: 'bookmark', count: bookmarks.length, label: t('learningHub.bookmarksBank', 'Bookmarks') },
              { id: 'roleplay', count: roleplays.length, label: t('learningHub.roleplaysBank', 'Roleplays') },
            ].map((filter: any) => (
              <Button
                key={filter.id}
                mode={libraryFilter === filter.id ? 'contained' : 'outlined'}
                compact
                onPress={() => setLibraryFilter(filter.id)}
              >
                {`${filter.label} ${filter.count}`}
              </Button>
            ))}
          </View>
          {filteredLibraryItems.length ? filteredLibraryItems.map((item: any) => renderSavedItem(item)) : (
            <Text style={styles.emptyText}>
              {libraryFilter === 'all'
                ? t('learningHub.savedEmptyBody', 'Save useful words from class, flashcards, writing, or conversation to build your own study shelf.')
                : t('learningHub.savedBankEmptyBody', 'Items you save for this purpose will gather here.')}
            </Text>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.section}>
          <Text style={styles.sectionTitle}>{t('learningHub.savedBanksTitle', 'Saved banks')}</Text>
          <View style={styles.bankRow}><Text>{t('learningHub.correctionsBank', 'Corrections')}</Text><Text style={styles.abilityCount}>{corrections.length}</Text></View>
          <View style={styles.bankRow}><Text>{t('learningHub.roleplaysBank', 'Roleplays')}</Text><Text style={styles.abilityCount}>{roleplays.length}</Text></View>
          <View style={styles.bankRow}><Text>{t('learningHub.bookmarksBank', 'Bookmarks')}</Text><Text style={styles.abilityCount}>{bookmarks.length}</Text></View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.section}>
          <Text style={styles.sectionTitle}>{t('learningHub.recentMistakesTitle', 'Recent mistakes')}</Text>
          <Text style={styles.emptyText}>{t('learningHub.recentMistakesBody', 'These are recent missed items worth retrying while the correction is still fresh.')}</Text>
          {corrections.length ? corrections.slice(0, 6).map((item: any) => renderSavedItem(item, true)) : (
            <Text style={styles.emptyText}>{t('learningHub.recentMistakesEmptyBody', 'Missed quiz items will appear here so you can retry them quickly.')}</Text>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.section}>
          <Text style={styles.sectionTitle}>{t('learningHub.miniSpeakingTitle', 'Mini speaking drills')}</Text>
          {miniSpeakingDrills.length ? miniSpeakingDrills.map((item: any) => (
            <View key={`drill-${item._id}`} style={styles.itemCard}>
              <Text style={styles.itemTarget}>{item.targetText}</Text>
              {!!item.nativeText && <Text style={styles.itemNative}>{item.nativeText}</Text>}
              <Text style={styles.itemReason}>{t('learningHub.miniSpeakingReason', 'Short speaking practice from a saved phrase or correction.')}</Text>
              <Button mode="outlined" compact onPress={() => openPracticeSurface(item, 'conversation')}>
                {t('learningHub.practiceSpeaking', 'Speak')}
              </Button>
            </View>
          )) : <Text style={styles.emptyText}>{t('learningHub.miniSpeakingEmpty', 'Corrections and saved phrases will become quick speaking drills here.')}</Text>}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.section}>
          <Text style={styles.sectionTitle}>{t('learningHub.recentWordsTitle', 'Recent words')}</Text>
          {recentWords.length ? recentWords.map((item: any) => (
            <View key={`${item.targetText}-${item.occurredAt || ''}`} style={styles.simpleRow}>
              <Text style={styles.simpleTitle}>{item.targetText}</Text>
              <Text style={styles.simpleMeta}>{item.nativeText || item.sourceLabel || ''}</Text>
            </View>
          )) : <Text style={styles.emptyText}>{t('learningHub.recentWordsEmpty', 'New words from class and conversation will gather here.')}</Text>}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.section}>
          <Text style={styles.sectionTitle}>{t('learningHub.correctionsBank', 'Corrections')}</Text>
          {corrections.length ? corrections.map((item: any) => renderSavedItem(item)) : <Text style={styles.emptyText}>{t('learningHub.correctionsEmpty', 'Saved corrections will collect here for quick retry.')}</Text>}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.section}>
          <Text style={styles.sectionTitle}>{t('learningHub.roleplaysBank', 'Roleplays')}</Text>
          {roleplays.length ? roleplays.map((item: any) => renderSavedItem(item)) : <Text style={styles.emptyText}>{t('learningHub.roleplaysEmpty', 'Saved roleplays will appear here when you want to reuse them.')}</Text>}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, gap: 12 },
  hero: { backgroundColor: colors.surface },
  heroContent: { gap: 14 },
  kicker: { color: colors.primary, fontWeight: '900', textTransform: 'uppercase', fontSize: 12 },
  title: { color: colors.textPrimary, fontWeight: '800' },
  subtitle: { color: colors.textSecondary, lineHeight: 20 },
  countBadge: { alignSelf: 'flex-start', minWidth: 96, padding: 12, borderRadius: 12, backgroundColor: colors.primary + '14' },
  count: { color: colors.primary, fontSize: 28, fontWeight: '900', textAlign: 'center' },
  countLabel: { color: colors.textSecondary, textAlign: 'center' },
  card: { backgroundColor: colors.surface },
  quickQuizCard: { backgroundColor: colors.primary + '10' },
  section: { gap: 12 },
  sectionTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '800' },
  itemCard: { gap: 5, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background },
  itemTarget: { color: colors.textPrimary, fontWeight: '800', fontSize: 16 },
  itemNative: { color: colors.textSecondary },
  itemReason: { color: colors.textMuted, fontSize: 12 },
  actionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  controls: { gap: 10, marginTop: 8, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.border },
  ratingRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  gradeButton: { flexGrow: 1, minWidth: 74 },
  actionBar: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 4 },
  practiceGroup: { flexDirection: 'row', flexWrap: 'wrap', flexShrink: 1 },
  utilityGroup: { flexDirection: 'row', alignItems: 'center' },
  emptyText: { color: colors.textSecondary, lineHeight: 20 },
  offlineNotice: { color: colors.textSecondary, lineHeight: 20 },
  reviewBeforeSleep: {
    borderRadius: 10,
    backgroundColor: colors.primary + '12',
    color: colors.textSecondary,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  weakRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, padding: 10, borderRadius: 10, backgroundColor: colors.background },
  weakTitle: { flex: 1, color: colors.textPrimary, fontWeight: '700' },
  weakMeta: { color: colors.textMuted },
  abilityRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, padding: 10, borderRadius: 10, backgroundColor: colors.background },
  abilityText: { flex: 1 },
  abilityMeta: { color: colors.textMuted, marginTop: 2 },
  abilityCount: { color: colors.textPrimary, fontWeight: '900' },
  searchRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  searchInput: { flex: 1, backgroundColor: colors.surface },
  searchResults: { gap: 10 },
  classResult: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 12 },
  classResultTitle: { color: colors.textPrimary, fontWeight: '800' },
  classResultMeta: { color: colors.textMuted, fontSize: 12 },
  bankRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, paddingVertical: 4 },
  bankFilterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  simpleRow: { gap: 2, paddingVertical: 8, borderTopWidth: 1, borderTopColor: colors.border },
  simpleTitle: { color: colors.textPrimary, fontWeight: '800' },
  simpleMeta: { color: colors.textMuted },
  studyHistoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  studyHistoryCell: {
    width: '22%',
    minWidth: 74,
    gap: 2,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  studyHistoryCount: { color: colors.textPrimary, fontSize: 18, fontWeight: '900' },
});

export default ReviewScreen;
