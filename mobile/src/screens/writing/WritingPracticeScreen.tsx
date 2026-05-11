import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from 'react-native-svg';
import { Button, Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { classLessonService, practiceContextService } from '../../services/api';
import speechService from '../../services/speechService';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import LANGUAGES from '../../config/languages';
import { useAppColors, type AppColors } from '../../config/theme';

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

function lessonItems(lesson: any): WritingItem[] {
  return (lesson?.content || []).flatMap((item: any, index: number) => {
    const entries: Array<WritingItem | null> = [];
    const target = compact(item.targetText || item.korean);
    if (target) {
      entries.push(makeItem({
        target,
        native: item.nativeText || item.english,
        romanization: item.romanization || item.pronunciation,
        source: 'class',
        sourceLabel: lesson.title || 'Class lesson',
        type: item.type || 'word',
      }));
    }
    const example = compact(item.exampleTarget || item.example);
    if (example && example !== target) {
      entries.push(makeItem({
        target: example,
        native: item.exampleNative || item.exampleEnglish,
        source: 'class',
        sourceLabel: `${lesson.title || 'Class lesson'} example ${index + 1}`,
        type: 'sentence',
      }));
    }
    return entries.filter(Boolean) as WritingItem[];
  });
}

function contextItems(context: any): WritingItem[] {
  return [
    ...(context?.vocabulary || []),
    ...(context?.phrases || []),
    ...(context?.topics || []),
  ].map((item: any) => makeItem({
    target: item.text,
    native: item.note || item.context,
    source: 'context',
    sourceLabel: context.summary || 'Saved context',
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

function strokeGuide(text: string, language: string) {
  const chars = Array.from(text || '').filter((char) => char.trim()).slice(0, 8);
  if (!chars.length) return ['Write the main shape slowly.', 'Check spacing.', 'Write it again without the guide.'];
  if (language === 'ko') {
    return chars.map((char, index) => `${index + 1}. ${char}: top to bottom, left to right, balanced block.`);
  }
  if (language === 'zh' || language === 'ja') {
    return chars.map((char, index) => `${index + 1}. ${char}: horizontal before vertical, top before bottom.`);
  }
  return chars.map((char, index) => `${index + 1}. ${char}: copy the shape, then write from memory.`);
}

const DrawingPad: React.FC<{
  ghostText: string;
  showGhost: boolean;
  resetKey: string;
  onStrokeCount: (count: number) => void;
  colors: AppColors;
}> = ({ ghostText, showGhost, resetKey, onStrokeCount, colors }) => {
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
        <Button mode="outlined" compact onPress={undo}>Undo</Button>
        <Button mode="outlined" compact onPress={clear}>Clear</Button>
      </View>
    </View>
  );
};

const WritingPracticeScreen: React.FC = () => {
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { nativeLanguage, targetLanguage } = useSettingsStore();
  const { userRole, subscriptionTier, aiEntitlements } = useAuthStore();
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
  const [status, setStatus] = useState('Loading writing notebook...');
  const [strokeCount, setStrokeCount] = useState(0);
  const [customTarget, setCustomTarget] = useState('');
  const [customNative, setCustomNative] = useState('');
  const [review, setReview] = useState({ shape: false, spacing: false, memory: false });
  const [answerVisible, setAnswerVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadNotebook() {
      setStatus('Building your writing notebook...');
      let personal: WritingItem[] = [];
      let lessons: WritingItem[] = [];
      let contexts: WritingItem[] = [];
      let conversations: WritingItem[] = [];

      try {
        personal = JSON.parse(await AsyncStorage.getItem(PERSONAL_NOTEBOOK_KEY) || '[]');
      } catch {}

      try {
        const lessonRes = await classLessonService.getClassLessons();
        lessons = (Array.isArray(lessonRes.data) ? lessonRes.data : []).flatMap(lessonItems);
      } catch {}

      if (canLoadContext) {
        try {
          const contextRes = await practiceContextService.list(targetLanguage);
          contexts = (Array.isArray(contextRes.data) ? contextRes.data : []).flatMap(contextItems);
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
                native: 'From your conversation practice',
                source: 'conversation',
                sourceLabel: 'Conversation history',
                type: 'sentence',
              }))
              .filter(Boolean) as WritingItem[];
          } catch {
            return [];
          }
        });
      } catch {}

      const next = uniqueItems([...personal, ...contexts, ...lessons, ...conversations]).slice(0, 180);
      if (cancelled) return;
      setItems(next);
      setSelectedId((current) => current || next[0]?.id || '');
      setStatus(next.length ? 'Ready' : 'Add a word or open Class to fill your notebook.');
    }
    loadNotebook();
    return () => {
      cancelled = true;
    };
  }, [canLoadContext, nativeLanguage, targetLanguage]);

  const filteredItems = useMemo(() => (
    sourceFilter === 'all' ? items : items.filter((item) => item.source === sourceFilter)
  ), [items, sourceFilter]);
  const selectedItem = filteredItems.find((item) => item.id === selectedId) || filteredItems[0] || items[0];
  const resetKey = `${selectedItem?.id || 'empty'}:${mode}`;
  const shouldHideAnswer = mode === 'listen' || mode === 'meaning';
  const practiceTitle = shouldHideAnswer
    ? (mode === 'listen' ? 'Listen and write' : 'Meaning to writing')
    : (selectedItem?.target || 'No item selected');

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
    setStatus('Playing target text...');
    await speechService.speakAsync(selectedItem.target, {
      lang: LANGUAGES[targetLanguage]?.ttsLocale || targetLanguage,
      rate: '0.9',
    });
    setStatus('Ready');
  };

  const addPersonalItem = async () => {
    const item = makeItem({
      target: customTarget,
      native: customNative,
      source: 'personal',
      sourceLabel: 'Personal notebook',
      type: 'custom',
    });
    if (!item) {
      setStatus('Add target text first.');
      return;
    }
    const personal = uniqueItems([item, ...items.filter((entry) => entry.source === 'personal')]).slice(0, 80);
    await AsyncStorage.setItem(PERSONAL_NOTEBOOK_KEY, JSON.stringify(personal));
    setItems((current) => uniqueItems([item, ...current]));
    setSelectedId(item.id);
    setCustomTarget('');
    setCustomNative('');
    setStatus('Added to your writing notebook.');
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
    setStatus(result === 'complete' ? 'Saved as complete.' : 'Saved for review.');
    if (result === 'complete') selectNext();
  };

  const instruction = (() => {
    if (!selectedItem) return 'Add a word or sentence to begin.';
    if (mode === 'listen') return 'Listen first, then write what you hear.';
    if (mode === 'meaning') return 'Use the meaning to recall and write the target text.';
    if (mode === 'stroke') return 'Follow the guide, then practice in the writing area.';
    if (mode === 'review') return 'Compare your writing with the answer and mark what was strong.';
    if (mode === 'trace') return 'Trace over the guide, then clear and write from memory.';
    return 'Copy the target text carefully.';
  })();

  const sourceButtons = [
    { value: 'all', label: 'All' },
    { value: 'class', label: 'Class' },
    { value: 'context', label: 'Context' },
    { value: 'conversation', label: 'Talk' },
    { value: 'personal', label: 'Mine' },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.kicker}>Exercise</Text>
          <Text variant="headlineSmall" style={styles.title}>Writing practice</Text>
          <Text style={styles.subtitle}>Trace, copy, listen, recall by meaning, and keep a handwriting notebook.</Text>
        </View>
        <View style={styles.countPill}>
          <Text style={styles.countNumber}>{items.length}</Text>
          <Text style={styles.countLabel}>items</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Notebook</Text>
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
          {filteredItems.length === 0 && <Text style={styles.emptyText}>No items in this source yet.</Text>}
        </ScrollView>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Add your own</Text>
        <TextInput mode="outlined" value={customTarget} onChangeText={setCustomTarget} placeholder="Target word or sentence" style={styles.input} />
        <TextInput mode="outlined" value={customNative} onChangeText={setCustomNative} placeholder="Meaning or note" style={styles.input} />
        <Button mode="contained" icon="plus" onPress={addPersonalItem} style={styles.actionButton}>Add to notebook</Button>
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
              {item.label}
            </Button>
          ))}
        </ScrollView>
        <View style={styles.practiceHead}>
          <View style={{ flex: 1 }}>
            <Text style={styles.kicker}>{selectedItem?.sourceLabel || 'Writing notebook'}</Text>
            <Text style={styles.panelTitle}>{practiceTitle}</Text>
          </View>
          <Button mode="outlined" icon="volume-high" onPress={speakPrompt} disabled={!selectedItem}>Play</Button>
        </View>
        <Text style={styles.subtitle}>{instruction}</Text>

        {!!selectedItem && mode !== 'listen' && mode !== 'meaning' && (
          <View style={styles.answerCard}>
            <Text style={styles.answerLabel}>Target</Text>
            <Text style={styles.answerTarget}>{selectedItem.target}</Text>
            {!!selectedItem.romanization && <Text style={styles.itemNative}>{selectedItem.romanization}</Text>}
            {!!selectedItem.native && <Text style={styles.itemNative}>{selectedItem.native}</Text>}
          </View>
        )}

        {!!selectedItem && mode === 'meaning' && (
          <View style={styles.answerCard}>
            <Text style={styles.answerLabel}>Meaning</Text>
            <Text style={styles.answerTarget}>{selectedItem.native || 'Recall the target text from your notebook.'}</Text>
          </View>
        )}

        {!!selectedItem && mode === 'stroke' && (
          <View style={styles.strokeGuide}>
            {strokeGuide(selectedItem.target, targetLanguage).map((line) => <Text key={line} style={styles.strokeLine}>{line}</Text>)}
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
            Show answer
          </Button>
        )}

        {((shouldHideAnswer && answerVisible) || mode === 'review') && !!selectedItem && (
          <View style={styles.answerCard}>
            <Text style={styles.answerLabel}>Answer</Text>
            <Text style={styles.answerTarget}>{selectedItem.target}</Text>
            {!!selectedItem.native && <Text style={styles.itemNative}>{selectedItem.native}</Text>}
          </View>
        )}

        <View style={styles.reviewGrid}>
          {[
            ['shape', 'Shape matches'],
            ['spacing', 'Spacing is clear'],
            ['memory', 'From memory'],
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
          <Button mode="outlined" onPress={() => saveAttempt('needs-practice')} disabled={!selectedItem} style={styles.flexButton}>Save for review</Button>
          <Button mode="contained" onPress={() => saveAttempt('complete')} disabled={!selectedItem} style={styles.flexButton}>Complete</Button>
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
    backgroundColor: '#edfbe8',
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
  reviewChipActive: { borderColor: colors.primary, backgroundColor: '#edfbe8' },
  reviewText: { color: colors.textPrimary, fontWeight: '800' },
  buttonRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  flexButton: { flex: 1, borderRadius: 8 },
  status: { color: colors.textSecondary, marginTop: 10 },
});

export default WritingPracticeScreen;
