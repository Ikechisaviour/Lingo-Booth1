import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from 'react-native-svg';
import { Button, Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import { classLessonService, learningHubService, practiceContextService, userService } from '../../services/api';
import speechService from '../../services/speechService';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import LANGUAGES from '../../config/languages';
import { useAppColors, type AppColors } from '../../config/theme';
import { looksLikeRawEnglishForNative } from '../../utils/languagePairPolicy';

const PERSONAL_NOTEBOOK_KEY = 'lingoWritingNotebook';
const ATTEMPT_KEY = 'lingoWritingAttempts';

type WritingItem = {
  id: string;
  target: string;
  native?: string;
  romanization?: string;
  source: 'class' | 'context' | 'conversation' | 'personal';
  sourceLabel: string;
  type?: string;
};

type Point = { x: number; y: number };

const modes = [
  { value: 'trace', label: 'Trace' },
  { value: 'copy', label: 'Copy' },
  { value: 'listen', label: 'Listen' },
  { value: 'meaning', label: 'Meaning' },
  { value: 'stroke', label: 'Stroke' },
  { value: 'review', label: 'Review' },
];

function isProOrUltraTier(tier?: string) {
  return ['pro', 'ultra'].includes(String(tier || '').toLowerCase());
}

function compact(value: unknown, max = 140) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function hashId(value: string) {
  const hash = Array.from(value)
    .reduce((sum, char) => ((sum * 31) + char.charCodeAt(0)) >>> 0, 7)
    .toString(16);
  return hash;
}

function makeItem(data: Partial<WritingItem> & { target?: string }): WritingItem | null {
  const target = compact(data.target, 180);
  if (!target) return null;
  const source = data.source || 'personal';
  return {
    id: `${source}-${hashId(`${source}:${target}:${data.native || ''}`)}`,
    target,
    native: compact(data.native, 180),
    romanization: compact(data.romanization, 160),
    source,
    sourceLabel: data.sourceLabel || 'Writing notebook',
    type: data.type || 'word',
  };
}

function lessonItems(lesson: any, t: any, nativeLanguage?: string): WritingItem[] {
  const lessonTitle = lesson?.title || t('writing.sourceLabels.classLesson', 'Class lesson');
  return (lesson?.content || []).flatMap((item: any, index: number) => {
    const entries: Array<WritingItem | null> = [];
    const target = compact(item.targetText || item.korean);
    if (target) {
      entries.push(makeItem({
        target,
        native: looksLikeRawEnglishForNative(item.nativeText || item.english, nativeLanguage) ? '' : (item.nativeText || item.english),
        romanization: item.romanization || item.pronunciation,
        source: 'class',
        sourceLabel: lessonTitle,
        type: item.type || 'word',
      }));
    }
    const example = compact(item.exampleTarget || item.example);
    if (example && example !== target) {
      entries.push(makeItem({
        target: example,
        native: looksLikeRawEnglishForNative(item.exampleNative || item.exampleEnglish, nativeLanguage) ? '' : (item.exampleNative || item.exampleEnglish),
        source: 'class',
        sourceLabel: t('writing.sourceLabels.classExample', {
          title: lessonTitle,
          number: index + 1,
          defaultValue: '{{title}} example {{number}}',
        }),
        type: 'sentence',
      }));
    }
    return entries.filter(Boolean) as WritingItem[];
  });
}

function contextItems(context: any, t: any): WritingItem[] {
  return [
    ...(context?.vocabulary || []),
    ...(context?.phrases || []),
    ...(context?.topics || []),
  ].map((item: any) => makeItem({
    target: item.text,
    native: item.note || item.context,
    source: 'context',
    sourceLabel: context.summary || t('writing.sourceLabels.personalized', 'Personalized'),
    type: 'context',
  })).filter(Boolean) as WritingItem[];
}

function uniqueItems(items: WritingItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.target.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function pathFrom(points: Point[]) {
  if (points.length < 2) return '';
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ');
}

function strokeGuide(text: string, language: string, t: any) {
  const chars = Array.from(text || '').filter((char) => char.trim()).slice(0, 8);
  if (!chars.length) return [
    t('writing.strokeGuide.emptyMain', 'Write the main shape slowly.'),
    t('writing.strokeGuide.emptySpacing', 'Check spacing.'),
    t('writing.strokeGuide.emptyMemory', 'Write it again without the guide.'),
  ];
  if (language === 'ko') {
    return chars.map((char, index) => t('writing.strokeGuide.hangul', {
      index: index + 1,
      char,
      defaultValue: '{{index}}. {{char}}: top to bottom, left to right, balanced block.',
    }));
  }
  if (language === 'zh' || language === 'ja') {
    return chars.map((char, index) => t('writing.strokeGuide.cjk', {
      index: index + 1,
      char,
      defaultValue: '{{index}}. {{char}}: horizontal before vertical, top before bottom.',
    }));
  }
  return chars.map((char, index) => t('writing.strokeGuide.default', {
    index: index + 1,
    char,
    defaultValue: '{{index}}. {{char}}: copy the shape, then write from memory.',
  }));
}

const DrawingPad: React.FC<{
  ghostText: string;
  showGhost: boolean;
  resetKey: string;
  onStrokeCount: (count: number) => void;
  colors: AppColors;
}> = ({ ghostText, showGhost, resetKey, onStrokeCount, colors }) => {
  const { t } = useTranslation();
  const [paths, setPaths] = useState<string[]>([]);
  const [current, setCurrent] = useState<Point[]>([]);
  const [size, setSize] = useState({ width: 1, height: 1 });
  const pathsRef = useRef<string[]>([]);
  const currentRef = useRef<Point[]>([]);

  useEffect(() => {
    pathsRef.current = [];
    currentRef.current = [];
    setPaths([]);
    setCurrent([]);
    onStrokeCount(0);
  }, [onStrokeCount, resetKey]);

  const pointFor = (gesture: any): Point => ({
    x: Math.max(0, Math.min(size.width, gesture.locationX ?? gesture.moveX)),
    y: Math.max(0, Math.min(size.height, gesture.locationY ?? gesture.moveY)),
  });

  const responder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const point = {
        x: event.nativeEvent.locationX,
        y: event.nativeEvent.locationY,
      };
      currentRef.current = [point];
      setCurrent([point]);
    },
    onPanResponderMove: (event) => {
      const point = pointFor(event.nativeEvent);
      const next = [...currentRef.current, point];
      currentRef.current = next;
      setCurrent(next);
    },
    onPanResponderRelease: () => {
      const path = pathFrom(currentRef.current);
      if (path) {
        pathsRef.current = [...pathsRef.current, path];
        setPaths(pathsRef.current);
        onStrokeCount(pathsRef.current.length);
      }
      currentRef.current = [];
      setCurrent([]);
    },
    onPanResponderTerminate: () => {
      currentRef.current = [];
      setCurrent([]);
    },
  }), [onStrokeCount, size.height, size.width]);

  const undo = () => {
    pathsRef.current = pathsRef.current.slice(0, -1);
    setPaths(pathsRef.current);
    onStrokeCount(pathsRef.current.length);
  };

  const clear = () => {
    pathsRef.current = [];
    currentRef.current = [];
    setPaths([]);
    setCurrent([]);
    onStrokeCount(0);
  };

  return (
    <View>
      <View
        style={[stylesForDrawing.pad, { borderColor: colors.border, backgroundColor: colors.surface }]}
        onLayout={(event) => setSize(event.nativeEvent.layout)}
        {...responder.panHandlers}
      >
        {showGhost && (
          <View pointerEvents="none" style={stylesForDrawing.ghostWrap}>
            <Text style={[stylesForDrawing.ghostText, { color: 'rgba(23, 20, 40, 0.13)' }]}>{ghostText}</Text>
          </View>
        )}
        <Svg width="100%" height="100%">
          {paths.map((path, index) => (
            <Path key={`${path}-${index}`} d={path} stroke={colors.textPrimary} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          ))}
          {!!current.length && (
            <Path d={pathFrom(current)} stroke={colors.textPrimary} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          )}
        </Svg>
      </View>
      <View style={stylesForDrawing.padActions}>
        <Button mode="outlined" compact onPress={undo}>{t('writing.undo', 'Undo')}</Button>
        <Button mode="outlined" compact onPress={clear}>{t('writing.clear', 'Clear')}</Button>
      </View>
    </View>
  );
};

const WritingPracticeScreen: React.FC = () => {
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { nativeLanguage, targetLanguage } = useSettingsStore();
  const { userId, userRole, subscriptionTier, aiEntitlements } = useAuthStore();
  const canLoadContext = Boolean(
    userRole === 'admin'
    || aiEntitlements?.canUsePracticeContext
    || isProOrUltraTier(aiEntitlements?.subscriptionTier)
    || isProOrUltraTier(subscriptionTier),
  );
  const [items, setItems] = useState<WritingItem[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [mode, setMode] = useState('trace');
  const [status, setStatus] = useState(() => t('writing.status.loadingNotebook', 'Loading writing notebook...'));
  const [strokeCount, setStrokeCount] = useState(0);
  const [customTarget, setCustomTarget] = useState('');
  const [customNative, setCustomNative] = useState('');
  const [review, setReview] = useState({ shape: false, spacing: false, memory: false });
  const [answerVisible, setAnswerVisible] = useState(false);
  const seededTarget = compact(route.params?.savedText, 180);
  const seededNative = compact(route.params?.nativeText, 180);

  useEffect(() => {
    let cancelled = false;
    async function loadNotebook() {
      setStatus(t('writing.status.buildingNotebook', 'Building your writing notebook...'));
      let personal: WritingItem[] = [];
      let lessons: WritingItem[] = [];
      let contexts: WritingItem[] = [];
      let conversations: WritingItem[] = [];

      try {
        personal = JSON.parse(await AsyncStorage.getItem(PERSONAL_NOTEBOOK_KEY) || '[]');
      } catch {}

      try {
        const lessonRes = await classLessonService.getClassLessons();
        lessons = (Array.isArray(lessonRes.data) ? lessonRes.data : []).flatMap((lesson: any) => lessonItems(lesson, t, nativeLanguage));
      } catch {}

      if (canLoadContext) {
        try {
          const contextRes = await practiceContextService.list(targetLanguage);
          contexts = (Array.isArray(contextRes.data) ? contextRes.data : []).flatMap((context: any) => contextItems(context, t));
        } catch {}
      }

      try {
        const keys = await AsyncStorage.getAllKeys();
        const prefix = `lingoConversation:conversation:${nativeLanguage}-${targetLanguage}`;
        const conversationKeys = keys.filter((key) => key.startsWith(prefix)).slice(-6);
        const values = await AsyncStorage.multiGet(conversationKeys);
        conversations = values.flatMap(([, value]) => {
          try {
            const parsed = JSON.parse(value || '{}');
            return (parsed.history || [])
              .filter((turn: any) => turn?.role === 'user')
              .slice(-3)
              .map((turn: any) => makeItem({
                target: turn.content,
                native: t('writing.sourceLabels.conversationNative', 'From your conversation practice'),
                source: 'conversation',
                sourceLabel: t('writing.sourceLabels.conversationHistory', 'Conversation history'),
                type: 'sentence',
              }))
              .filter(Boolean) as WritingItem[];
          } catch {
            return [];
          }
        });
      } catch {}

      const seededItem = seededTarget
        ? makeItem({
          target: seededTarget,
          native: seededNative,
          source: 'personal',
          sourceLabel: t('writing.sourceLabels.savedReview', 'Saved review item'),
          type: 'phrase',
        })
        : null;
      const next = uniqueItems([
        ...(seededItem ? [seededItem] : []),
        ...personal,
        ...contexts,
        ...lessons,
        ...conversations,
      ]).slice(0, 180);
      if (cancelled) return;
      setItems(next);
      setSelectedId((current) => current || next[0]?.id || '');
      setStatus(next.length
        ? t('writing.status.ready', 'Ready')
        : t('writing.status.emptyNotebook', 'Add a word or open Class to fill your notebook.'));
    }
    loadNotebook();
    return () => {
      cancelled = true;
    };
  }, [canLoadContext, nativeLanguage, seededNative, seededTarget, targetLanguage, t]);

  const filteredItems = useMemo(() => (
    sourceFilter === 'all' ? items : items.filter((item) => item.source === sourceFilter)
  ), [items, sourceFilter]);
  const selectedItem = filteredItems.find((item) => item.id === selectedId) || filteredItems[0] || items[0];
  const resetKey = `${selectedItem?.id || 'empty'}:${mode}`;
  const shouldHideAnswer = mode === 'listen' || mode === 'meaning';
  const practiceTitle = shouldHideAnswer
    ? (mode === 'listen'
      ? t('writing.practiceTitles.listen', 'Listen and write')
      : t('writing.practiceTitles.meaning', 'Meaning to writing'))
    : (selectedItem?.target || t('writing.practiceTitles.empty', 'No item selected'));

  useEffect(() => {
    setAnswerVisible(false);
  }, [mode, selectedItem?.id]);

  const selectNext = () => {
    const list = filteredItems.length ? filteredItems : items;
    if (!list.length) return;
    const index = Math.max(0, list.findIndex((item) => item.id === selectedItem?.id));
    setSelectedId(list[(index + 1) % list.length].id);
    setReview({ shape: false, spacing: false, memory: false });
  };

  const speakPrompt = async () => {
    if (!selectedItem?.target) return;
    setStatus(t('writing.status.playingTarget', 'Playing target text...'));
    await speechService.speakAsync(selectedItem.target, {
      lang: LANGUAGES[targetLanguage]?.ttsLocale || targetLanguage,
      rate: '0.9',
    });
    setStatus(t('writing.status.ready', 'Ready'));
  };

  const addPersonalItem = async () => {
    const item = makeItem({
      target: customTarget,
      native: customNative,
      source: 'personal',
      sourceLabel: t('writing.sourceLabels.personalNotebook', 'Personal notebook'),
      type: 'custom',
    });
    if (!item) {
      setStatus(t('writing.status.addTargetFirst', 'Add target text first.'));
      return;
    }
    const personal = uniqueItems([item, ...items.filter((entry) => entry.source === 'personal')]).slice(0, 80);
    await AsyncStorage.setItem(PERSONAL_NOTEBOOK_KEY, JSON.stringify(personal));
    setItems((current) => uniqueItems([item, ...current]));
    setSelectedId(item.id);
    setCustomTarget('');
    setCustomNative('');
    setStatus(t('writing.status.addedNotebook', 'Added to your writing notebook.'));
  };

  const saveAttempt = async (result: 'complete' | 'needs-practice') => {
    if (!selectedItem) return;
    let attempts: any[] = [];
    try {
      attempts = JSON.parse(await AsyncStorage.getItem(ATTEMPT_KEY) || '[]');
    } catch {}
    const next = [{
      id: `${Date.now()}-${selectedItem.id}`,
      itemId: selectedItem.id,
      target: selectedItem.target,
      native: selectedItem.native,
      mode,
      result,
      strokeCount,
      createdAt: new Date().toISOString(),
    }, ...attempts].slice(0, 120);
    await AsyncStorage.setItem(ATTEMPT_KEY, JSON.stringify(next));
    setStatus(result === 'complete'
      ? t('writing.status.savedComplete', 'Saved as complete.')
      : t('writing.status.savedReview', 'Saved for review.'));
    if (result === 'complete') {
      if (userId) {
        userService.recordLearningEvent(userId, {
          eventType: 'writing_complete',
          itemId: selectedItem.id,
          writingMode: mode,
          fromMemory: review.memory,
          source: selectedItem.source,
        }).catch(() => {});
      }
      selectNext();
    } else if (userId) {
      learningHubService.saveItem({
        itemType: selectedItem.type === 'word' ? 'word' : 'phrase',
        targetText: selectedItem.target,
        nativeText: selectedItem.native,
        romanization: selectedItem.romanization,
        sourceType: 'writing',
        sourceRef: selectedItem.id,
        sourceLabel: selectedItem.sourceLabel,
        reason: t('writing.savedReason', 'Saved from writing practice for another pass.'),
        metadata: { route: '/writing', writingMode: mode },
      }).catch(() => {});
    }
  };

  const askTutorAboutSelected = () => {
    if (!selectedItem?.target) return;
    navigation.navigate('Conversation', {
      starter: t('learningHub.askTutorPrompt', {
        text: selectedItem.target,
        defaultValue: 'Help me practice "{{text}}".',
      }),
    });
  };

  const openFlashcardForSelected = () => {
    if (!selectedItem?.target) return;
    navigation.navigate('Exercise', {
      screen: 'Flashcards',
      params: {
        savedText: selectedItem.target || '',
        nativeText: selectedItem.native || '',
      },
    });
  };

  const selfTestSelected = async () => {
    if (!userId || !selectedItem?.target) return;
    try {
      const response = await learningHubService.saveItem({
        itemType: selectedItem.type === 'word' ? 'word' : 'phrase',
        targetText: selectedItem.target,
        nativeText: selectedItem.native,
        romanization: selectedItem.romanization,
        sourceType: 'writing',
        sourceRef: selectedItem.id,
        sourceLabel: selectedItem.sourceLabel,
        reason: t('writing.selfTestReason', 'Saved from writing practice for a quick self-test.'),
        metadata: { route: '/writing', writingMode: mode },
      });
      navigation.navigate('Review', { quickQuizItem: response.data });
    } catch {
      setStatus(t('writing.status.savedReview', 'Saved for review.'));
    }
  };

  const instruction = (() => {
    if (!selectedItem) return t('writing.instructions.addToBegin', 'Add a word or sentence to begin.');
    return t(`writing.instructions.${mode}`, 'Copy the target text carefully.');
  })();

  const sourceButtons = [
    { value: 'all', label: t('writing.sources.all', 'All') },
    { value: 'class', label: t('writing.sources.class', 'Class') },
    { value: 'context', label: t('writing.sources.personalized', 'Personalized') },
    { value: 'conversation', label: t('writing.sources.conversation', 'Conversation') },
    { value: 'personal', label: t('writing.sources.personal', 'Mine') },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.kicker}>{t('writing.kicker', 'Exercise')}</Text>
          <Text variant="headlineSmall" style={styles.title}>{t('writing.title', 'Writing practice')}</Text>
          <Text style={styles.subtitle}>{t('writing.subtitle', 'Trace, copy, listen, recall by meaning, and keep a handwriting notebook.')}</Text>
        </View>
        <View style={styles.countPill}>
          <Text style={styles.countNumber}>{items.length}</Text>
          <Text style={styles.countLabel}>{t('writing.itemsLabel', 'items')}</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>{t('writing.notebook', 'Notebook')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {sourceButtons.map((item) => (
            <Button
              key={item.value}
              compact
              mode={sourceFilter === item.value ? 'contained' : 'outlined'}
              onPress={() => {
                setSourceFilter(item.value);
                setSelectedId('');
              }}
            >
              {item.label}
            </Button>
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.itemRail}>
          {filteredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.itemCard, selectedItem?.id === item.id && styles.itemCardActive]}
              onPress={() => setSelectedId(item.id)}
              activeOpacity={0.78}
            >
              <Text style={styles.itemTarget} numberOfLines={2}>{item.target}</Text>
              <Text style={styles.itemNative} numberOfLines={1}>{item.native || item.sourceLabel}</Text>
            </TouchableOpacity>
          ))}
          {filteredItems.length === 0 && <Text style={styles.emptyText}>{t('writing.empty', 'No items in this source yet.')}</Text>}
        </ScrollView>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>{t('writing.addYourOwn', 'Add your own')}</Text>
        <TextInput mode="outlined" value={customTarget} onChangeText={setCustomTarget} placeholder={t('writing.customTargetPlaceholder', 'Target word or sentence')} style={styles.input} />
        <TextInput mode="outlined" value={customNative} onChangeText={setCustomNative} placeholder={t('writing.customNativePlaceholder', 'Meaning or note')} style={styles.input} />
        <Button mode="contained" icon="plus" onPress={addPersonalItem} style={styles.actionButton}>{t('writing.addToNotebook', 'Add to notebook')}</Button>
      </View>

      <View style={styles.panel}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.modeRail}>
          {modes.map((item) => (
            <Button
              key={item.value}
              compact
              mode={mode === item.value ? 'contained' : 'outlined'}
              onPress={() => setMode(item.value)}
            >
              {t(`writing.modes.${item.value}`, item.label)}
            </Button>
          ))}
        </ScrollView>
        <View style={styles.practiceHead}>
          <View style={{ flex: 1 }}>
            <Text style={styles.kicker}>{selectedItem?.sourceLabel || t('writing.writingNotebook', 'Writing notebook')}</Text>
            <Text style={styles.panelTitle}>{practiceTitle}</Text>
          </View>
          <Button mode="outlined" icon="volume-high" onPress={speakPrompt} disabled={!selectedItem}>{t('writing.play', 'Play')}</Button>
        </View>
        <Text style={styles.subtitle}>{instruction}</Text>

        {!!selectedItem && mode !== 'listen' && mode !== 'meaning' && (
          <View style={styles.answerCard}>
            <Text style={styles.answerLabel}>{t('writing.target', 'Target')}</Text>
            <Text style={styles.answerTarget}>{selectedItem.target}</Text>
            {!!selectedItem.romanization && <Text style={styles.itemNative}>{selectedItem.romanization}</Text>}
            {!!selectedItem.native && <Text style={styles.itemNative}>{selectedItem.native}</Text>}
          </View>
        )}

        {!!selectedItem && mode === 'meaning' && (
          <View style={styles.answerCard}>
            <Text style={styles.answerLabel}>{t('writing.meaning', 'Meaning')}</Text>
            <Text style={styles.answerTarget}>{selectedItem.native || t('writing.recallFallback', 'Recall the target text from your notebook.')}</Text>
          </View>
        )}

        {!!selectedItem && mode === 'stroke' && (
          <View style={styles.strokeGuide}>
            {strokeGuide(selectedItem.target, targetLanguage, t).map((line) => <Text key={line} style={styles.strokeLine}>{line}</Text>)}
          </View>
        )}

        <DrawingPad
          ghostText={selectedItem?.target || ''}
          showGhost={mode === 'trace' && !!selectedItem}
          resetKey={resetKey}
          onStrokeCount={setStrokeCount}
          colors={colors}
        />

        {shouldHideAnswer && !!selectedItem && !answerVisible && (
          <Button mode="outlined" icon="eye" onPress={() => setAnswerVisible(true)} style={styles.revealButton}>
            {t('writing.showAnswer', 'Show answer')}
          </Button>
        )}

        {((shouldHideAnswer && answerVisible) || mode === 'review') && !!selectedItem && (
          <View style={styles.answerCard}>
            <Text style={styles.answerLabel}>{t('writing.answer', 'Answer')}</Text>
            <Text style={styles.answerTarget}>{selectedItem.target}</Text>
            {!!selectedItem.native && <Text style={styles.itemNative}>{selectedItem.native}</Text>}
          </View>
        )}

        <View style={styles.reviewGrid}>
          {[
            ['shape', t('writing.review.shape', 'Shape matches')],
            ['spacing', t('writing.review.spacing', 'Spacing is clear')],
            ['memory', t('writing.review.memory', 'From memory')],
          ].map(([key, label]) => (
            <TouchableOpacity
              key={key}
              style={[styles.reviewChip, (review as any)[key] && styles.reviewChipActive]}
              onPress={() => setReview((current) => ({ ...current, [key]: !(current as any)[key] }))}
            >
              <MaterialCommunityIcons name={(review as any)[key] ? 'check-circle' : 'circle-outline'} size={18} color={(review as any)[key] ? colors.primary : colors.textMuted} />
              <Text style={styles.reviewText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <Button mode="outlined" onPress={() => saveAttempt('needs-practice')} disabled={!selectedItem} style={styles.flexButton}>{t('writing.saveForReview', 'Save for review')}</Button>
          <Button mode="outlined" onPress={askTutorAboutSelected} disabled={!selectedItem} style={styles.flexButton}>{t('learningHub.askTutor', 'Ask tutor')}</Button>
          <Button mode="outlined" onPress={openFlashcardForSelected} disabled={!selectedItem} style={styles.flexButton}>{t('learningHub.practiceFlashcard', 'Flashcard')}</Button>
          <Button mode="outlined" onPress={selfTestSelected} disabled={!selectedItem} style={styles.flexButton}>{t('learningHub.practiceQuiz', 'Self-test')}</Button>
          <Button mode="contained" onPress={() => saveAttempt('complete')} disabled={!selectedItem} style={styles.flexButton}>{t('writing.complete', 'Complete')}</Button>
        </View>
        <Text style={styles.status}>{status}</Text>
      </View>
    </ScrollView>
  );
};

const stylesForDrawing = StyleSheet.create({
  pad: {
    height: 320,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 12,
  },
  ghostWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  ghostText: {
    fontSize: 58,
    fontWeight: '900',
    textAlign: 'center',
  },
  padActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
});

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 14, paddingBottom: 96 },
  header: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: 12,
  },
  kicker: { color: colors.primary, fontSize: 11, fontWeight: '900', textTransform: 'uppercase' },
  title: { color: colors.textPrimary, fontWeight: '900', marginTop: 4 },
  subtitle: { color: colors.textSecondary, lineHeight: 20, marginTop: 8 },
  countPill: {
    minWidth: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.primary + '14',
    padding: 10,
  },
  countNumber: { color: colors.primary, fontSize: 22, fontWeight: '900' },
  countLabel: { color: colors.primary, fontSize: 11, fontWeight: '800' },
  panel: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: 12,
  },
  panelTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '900' },
  chipRow: { gap: 8, paddingTop: 12, paddingRight: 12 },
  itemRail: { gap: 10, paddingTop: 12, paddingRight: 12 },
  itemCard: {
    width: 170,
    minHeight: 86,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  itemCardActive: { borderColor: colors.accentBlue, backgroundColor: '#eaf8ff' },
  itemTarget: { color: colors.textPrimary, fontWeight: '900', lineHeight: 20 },
  itemNative: { color: colors.textSecondary, marginTop: 6, lineHeight: 18 },
  emptyText: { color: colors.textSecondary, padding: 12 },
  input: { backgroundColor: colors.surface, marginTop: 10 },
  actionButton: { marginTop: 12, borderRadius: 8 },
  modeRail: { gap: 8, paddingBottom: 12, paddingRight: 12 },
  practiceHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  answerCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbeed2',
    backgroundColor: '#f5ffef',
    marginTop: 12,
  },
  answerLabel: { color: colors.textSecondary, fontSize: 11, fontWeight: '900', textTransform: 'uppercase' },
  answerTarget: { color: colors.textPrimary, fontSize: 28, fontWeight: '900', lineHeight: 36, marginTop: 6 },
  revealButton: { alignSelf: 'flex-start', borderRadius: 8, marginTop: 12 },
  strokeGuide: {
    gap: 7,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbeed2',
    backgroundColor: '#f5ffef',
    marginTop: 12,
  },
  strokeLine: { color: colors.textPrimary, lineHeight: 20 },
  reviewGrid: { gap: 8, marginTop: 12 },
  reviewChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  reviewChipActive: { borderColor: colors.primary, backgroundColor: colors.primary + '14' },
  reviewText: { color: colors.textPrimary, fontWeight: '800' },
  buttonRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  flexButton: { flex: 1, borderRadius: 8 },
  status: { color: colors.textSecondary, marginTop: 10 },
});

export default WritingPracticeScreen;
