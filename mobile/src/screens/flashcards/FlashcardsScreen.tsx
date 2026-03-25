import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  ActivityIndicator,
  Modal,
  FlatList,
  AppState,
  KeyboardAvoidingView,
  Platform,
  PanResponder,
} from 'react-native';
import { Text, Button, IconButton, TextInput, FAB, Chip, ProgressBar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { flashcardService, progressService, userService } from '../../services/api';
import speechService from '../../services/speechService';
import guestActivityTracker from '../../services/guestActivityTracker';

// PiP is not available in this build
const PipHandler: any = null;
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import LANGUAGES, { getLangName, getLangField, langHasRomanization } from '../../config/languages';
import { useAppColors, type AppColors } from '../../config/theme';


const normalizeCategory = (cat: any): string[] => {
  if (Array.isArray(cat)) return cat.length > 0 ? cat : ['uncategorized'];
  if (typeof cat === 'string' && cat.trim()) return [cat.trim()];
  return ['uncategorized'];
};

const FlashcardsScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { userId, isGuest, guestXP, addGuestXP } = useAuthStore();
  const { targetLanguage, nativeLanguage } = useSettingsStore();
  const colors = useAppColors();
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  const isCompact = winHeight < 450 || winWidth < 380;
  const styles = useMemo(() => createStyles(colors, winWidth, winHeight, isCompact), [colors, winWidth, winHeight, isCompact]);

  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayMode, setDisplayMode] = useState<'target' | 'native' | 'random'>('target');
  const [showsTargetFirst, setShowsTargetFirst] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [studyStyle, setStudyStyle] = useState<'both' | 'text' | 'audio'>('both');
  const [showCategories, setShowCategories] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [starPulse, setStarPulse] = useState<'up' | 'down' | null>(null);
  const [isShuffled, setIsShuffled] = useState(true);
  const [shuffleSeed, setShuffleSeed] = useState(() => Math.floor(Math.random() * 2147483647));
  const [expandedPrimaries, setExpandedPrimaries] = useState<Set<string>>(new Set());
  const [categoryCardsCache, setCategoryCardsCache] = useState<Record<string, any[]>>({});
  const [selectedCardIds, setSelectedCardIds] = useState<Set<string>>(new Set());
  const [allCategories, setAllCategories] = useState<{ name: string; count: number }[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [retryingTranslation, setRetryingTranslation] = useState(false);

  const [newCard, setNewCard] = useState<Record<string, string>>(() => ({ [getLangField(targetLanguage)]: '', [getLangField(nativeLanguage)]: '', romanization: '', category: 'vocabulary', topic: '' }));

  const autoPlayRef = useRef(false);
  const transitioningRef = useRef(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  // Swipe left/right to navigate cards
  const swipePan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, gestureState) =>
        Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 2),
      onPanResponderRelease: (_evt, gestureState) => {
        if (gestureState.dx < -50) {
          // Swipe left → next card
          handleNextRef.current?.();
        } else if (gestureState.dx > 50) {
          // Swipe right → prev card
          handlePrevRef.current?.();
        }
      },
    }),
  ).current;
  const handleNextRef = useRef<(() => void) | null>(null);
  const handlePrevRef = useRef<(() => void) | null>(null);

  const targetField = getLangField(targetLanguage);
  const nativeField = getLangField(nativeLanguage);
  const targetLocale = LANGUAGES[targetLanguage]?.ttsLocale || 'ko-KR';
  const nativeLocale = LANGUAGES[nativeLanguage]?.ttsLocale || 'en-US';

  // Initialise TrackPlayer once on mount
  useEffect(() => {
    speechService.setup();
  }, []);

  // Stop autoplay & cancel audio when navigating away from this tab
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setAutoPlay(false);
      autoPlayRef.current = false;
      speechService.cancel();
    });
    return unsubscribe;
  }, [navigation]);

  // Fetch flashcards (paginated, unfiltered — category filtering is done client-side via cache)
  const fetchFlashcards = useCallback(async (page = 1, append = false) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const opts = { shuffle: isShuffled, seed: shuffleSeed };

      const response = userId
        ? await flashcardService.getFlashcards(userId, page, 50, opts)
        : await flashcardService.getGuestFlashcards(page, 50, opts);

      const data = response.data;
      const cards = Array.isArray(data) ? data : (data.cards || data);
      const total = data.total || cards.length;
      const returnedSeed = data.seed;

      if (returnedSeed && page === 1) {
        setShuffleSeed(returnedSeed);
      }

      if (append) {
        setFlashcards((prev) => [...prev, ...cards]);
      } else {
        setFlashcards(cards);
      }
      setTotalCards(total);
      setCurrentPage(page);
      setError('');
    } catch (err: any) {
      if (err?._forcedLogout) return;
      if (page === 1) setError(t('flashcards.failedToLoad'));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [userId, targetLanguage, nativeLanguage, t, isShuffled, shuffleSeed]);

  // Fetch categories + first page on mount
  useEffect(() => {
    const init = async () => {
      try {
        const catRes = await flashcardService.getCategories();
        setAllCategories(catRes.data.categories || []);
      } catch {}
    };
    init();
    fetchFlashcards(1, false);
    // Reset selections when language pair changes so stale card IDs don't linger
    setSelectedCategories(new Set());
    setSelectedCardIds(new Set());
    setCurrentIndex(0);
  }, [targetLanguage, nativeLanguage]);

  // Reset card position when category selection changes (no API refetch — deck is computed client-side)
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    if (autoPlay) {
      setAutoPlay(false);
      speechService.cancel();
    }
  }, [selectedCategories]);

  // Pre-fetch next page when 49 cards from end
  useEffect(() => {
    if (flashcards.length > 0 && currentIndex >= flashcards.length - 49 && flashcards.length < totalCards && !loadingMore) {
      fetchFlashcards(currentPage + 1, true);
    }
  }, [currentIndex, flashcards.length, totalCards, loadingMore, currentPage]);

  // Keep autoPlayRef in sync
  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  // Study deck: supports three modes —
  //   • nothing selected → unfiltered paginated deck (language-filtered)
  //   • categories and/or individual cards selected → client-side mix from cache + loaded cards
  // Categories and individual cards can be combined freely.
  const displayedCards = useMemo(() => {
    const hasTgtField = flashcards.some((c) => !!c[targetField]);
    const langFiltered = hasTgtField ? flashcards.filter((c) => !!c[targetField]) : flashcards;

    if (selectedCardIds.size === 0 && selectedCategories.size === 0) return langFiltered;

    const loadedById = new Map(langFiltered.map((c) => [c._id, c]));
    const cacheById = new Map<string, any>();
    for (const cards of Object.values(categoryCardsCache)) {
      for (const c of cards) {
        if (!cacheById.has(c._id)) cacheById.set(c._id, c);
      }
    }

    const resultIds = new Set<string>();
    const result: any[] = [];

    // Add all cards from selected categories (full data if loaded, minimal otherwise)
    for (const cat of selectedCategories) {
      const catCards = categoryCardsCache[cat] || [];
      for (const c of catCards) {
        if (!resultIds.has(c._id)) {
          const fullCard = loadedById.get(c._id) ?? { ...c, masteryLevel: 3, isDefault: true };
          if (fullCard[targetField]) {
            result.push(fullCard);
            resultIds.add(c._id);
          }
        }
      }
    }

    // Add individually selected cards not already included via a category
    for (const id of selectedCardIds) {
      if (!resultIds.has(id)) {
        const card = loadedById.get(id) ?? (cacheById.has(id) ? { ...cacheById.get(id), masteryLevel: 3, isDefault: true } : null);
        if (card && card[targetField]) {
          result.push(card);
          resultIds.add(id);
        }
      }
    }

    return result;
  }, [flashcards, selectedCardIds, selectedCategories, targetField, categoryCardsCache]);

  // PiP — enter picture-in-picture when autoplay is active and user leaves the app
  useEffect(() => {
    if (!autoPlay || !PipHandler) return;
    const sub = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'background' && autoPlayRef.current && PipHandler) {
        try {
          PipHandler.enterPipMode(16, 9); // 16:9 aspect ratio
        } catch {}
      }
    });
    return () => sub.remove();
  }, [autoPlay]);

  // Retry translation for the current card when backend returned _translationPending
  const retryTranslation = useCallback(async () => {
    if (retryingTranslation) return;
    const cur = displayedCards[currentIndex];
    if (!(cur as any)?._translationPending) return;
    setRetryingTranslation(true);
    try {
      const opts = { shuffle: false, seed: shuffleSeed };
      const response = userId
        ? await flashcardService.getFlashcards(userId, currentPage, 50, opts)
        : await flashcardService.getGuestFlashcards(currentPage, 50, opts);
      const data = response.data;
      const cards = Array.isArray(data) ? data : (data.cards || data);
      const nfKey = nativeField;
      const updated = cards.find((c: any) => c._id === cur._id);
      if (updated && updated[nfKey]) {
        setFlashcards((prev: any[]) =>
          prev.map((fc: any) =>
            fc._id === cur._id ? { ...fc, [nfKey]: updated[nfKey], _translationPending: undefined } : fc
          )
        );
      }
    } catch (err) {
      console.error('Retry translation failed:', err);
    } finally {
      setRetryingTranslation(false);
    }
  }, [retryingTranslation, displayedCards, currentIndex, shuffleSeed, userId, currentPage, nativeField]);

  // Update media notification metadata when autoplay is active
  useEffect(() => {
    if (!autoPlay) return;
    const card = displayedCards[currentIndex];
    if (!card) return;
    speechService.updateNotification(
      card[targetField] || '',
      `${card[nativeField] || ''}  ·  Card ${currentIndex + 1} of ${displayedCards.length}`,
    );
  }, [autoPlay, currentIndex, displayedCards.length]);

  // Reset index when filtered deck shrinks
  useEffect(() => {
    if (displayedCards.length > 0 && currentIndex >= displayedCards.length) {
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [displayedCards.length, currentIndex]);

  // Reset on individual card-selection change
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    if (autoPlay) {
      setAutoPlay(false);
      speechService.cancel();
    }
  }, [selectedCardIds]);

  // Toggle shuffle — refetch the default (unfiltered) deck from backend with new order
  const handleToggleShuffle = useCallback(() => {
    const newShuffled = !isShuffled;
    setIsShuffled(newShuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    doFlip(false);
    if (autoPlay) {
      setAutoPlay(false);
      speechService.cancel();
    }
    const newSeed = Math.floor(Math.random() * 2147483647);
    setShuffleSeed(newSeed);
    const doRefetch = async () => {
      try {
        setLoading(true);
        const opts = { shuffle: newShuffled, seed: newSeed };
        const response = userId
          ? await flashcardService.getFlashcards(userId, 1, 50, opts)
          : await flashcardService.getGuestFlashcards(1, 50, opts);
        const data = response.data;
        const cards = Array.isArray(data) ? data : (data.cards || data);
        setFlashcards(cards);
        setTotalCards(data.total || cards.length);
        setCurrentPage(1);
        if (data.seed) setShuffleSeed(data.seed);
      } catch {}
      finally { setLoading(false); }
    };
    doRefetch();
  }, [isShuffled, autoPlay, userId]);

  // Toggle a category filter — loads cards into cache on first select (no backend refetch)
  const toggleCategoryFilter = (categoryName: string) => {
    const isRemoving = selectedCategories.has(categoryName);
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (isRemoving) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
        // Background-load this category's full card list into cache if not already there
        if (!categoryCardsCache[categoryName]) {
          flashcardService.getCategoryCards(categoryName)
            .then((res: any) => setCategoryCardsCache((p) => ({ ...p, [categoryName]: res.data.cards || [] })))
            .catch(() => setCategoryCardsCache((p) => ({ ...p, [categoryName]: [] })));
        }
      }
      return next;
    });
    if (!isRemoving) {
      // Deselect any individually selected cards that belong to this category
      const catCards = categoryCardsCache[categoryName]
        || flashcards.filter((c: any) => normalizeCategory(c.category)[0] === categoryName);
      if (catCards.length > 0) {
        const catCardIds = new Set(catCards.map((c: any) => c._id));
        setSelectedCardIds((prev) => new Set([...prev].filter((id) => !catCardIds.has(id))));
      }
    }
  };

  // Build loaded-cards category map for individual card selection within expanded categories
  const buildLoadedCategoryCards = () => {
    const map: Record<string, { count: number; cards: typeof flashcards }> = {};
    flashcards.forEach((card) => {
      const primary = normalizeCategory(card.category)[0];
      if (!map[primary]) map[primary] = { count: 0, cards: [] };
      map[primary].count++;
      map[primary].cards.push(card);
    });
    return map;
  };

  const toggleExpandedPrimary = (cat: string) => {
    setExpandedPrimaries((prev) => {
      const next = new Set(prev);
      const willExpand = !next.has(cat);
      willExpand ? next.add(cat) : next.delete(cat);
      if (willExpand && !categoryCardsCache[cat]) {
        flashcardService.getCategoryCards(cat)
          .then((res: any) => setCategoryCardsCache((p) => ({ ...p, [cat]: res.data.cards || [] })))
          .catch(() => setCategoryCardsCache((p) => ({ ...p, [cat]: [] })));
      }
      return next;
    });
  };

  const determineCardDisplay = () => {
    if (displayMode === 'random') return Math.random() < 0.5;
    return displayMode === 'target';
  };

  // Flip animation
  const doFlip = (toFlipped: boolean) => {
    Animated.spring(flipAnim, {
      toValue: toFlipped ? 1 : 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const handleFlip = () => {
    if (transitioningRef.current) return;
    const next = !isFlipped;
    setIsFlipped(next);
    doFlip(next);

    // Speak back side on flip
    if (next && studyStyle !== 'text') {
      const card = displayedCards[currentIndex];
      if (!card) return;
      const text = showsTargetFirst ? card[nativeField] : card[targetField];
      const lang = showsTargetFirst ? nativeLocale : targetLocale;
      if (text) {
        speechService.cancel();
        speechService.speak(text, { lang });
      }
    }
  };

  // Auto-speak front when new card appears
  useEffect(() => {
    if (autoPlayRef.current || studyStyle === 'text') return;
    if (displayedCards.length === 0 || !displayedCards[currentIndex]) return;

    const card = displayedCards[currentIndex];
    const text = showsTargetFirst ? card[targetField] : card[nativeField];
    const lang = showsTargetFirst ? targetLocale : nativeLocale;

    const timer = setTimeout(() => {
      speechService.speakRepeat(text, 2, { lang });
    }, 300);

    return () => clearTimeout(timer);
  }, [currentIndex, displayedCards.length, studyStyle, showsTargetFirst]);

  // Auto-play cycle
  useEffect(() => {
    if (!autoPlay || displayedCards.length === 0 || !displayedCards[currentIndex]) return;
    if (studyStyle === 'text') {
      setAutoPlay(false);
      return;
    }

    let cancelled = false;

    const autoPlayCard = async () => {
      const card = displayedCards[currentIndex];
      const frontText = showsTargetFirst ? card[targetField] : card[nativeField];
      const backText = showsTargetFirst ? card[nativeField] : card[targetField];
      const frontLocale = showsTargetFirst ? targetLocale : nativeLocale;
      const backLocale = showsTargetFirst ? nativeLocale : targetLocale;

      await speechService.waitAudio(600);
      if (cancelled) return;

      // Front x2
      await speechService.speakAsync(frontText, { lang: frontLocale });
      if (cancelled) return;
      await speechService.waitAudio(400);
      if (cancelled) return;
      await speechService.speakAsync(frontText, { lang: frontLocale });
      if (cancelled) return;

      // 5s pause
      await speechService.waitAudio(5000);
      if (cancelled) return;

      // Front once more
      await speechService.speakAsync(frontText, { lang: frontLocale });
      if (cancelled) return;

      // Flip
      await speechService.waitAudio(600);
      if (cancelled) return;
      setIsFlipped(true);
      doFlip(true);
      await speechService.waitAudio(400);
      if (cancelled) return;

      // Back
      if (backText) {
        await speechService.speakAsync(backText, { lang: backLocale });
        if (cancelled) return;
      }

      // Scale pause with text length for reading time
      const readingPause = Math.max(1500, (backText || '').split(/\s+/).length * 200);
      await speechService.waitAudio(readingPause);
      if (cancelled) return;

      if (currentIndex >= displayedCards.length - 1) {
        setAutoPlay(false);
        return;
      }

      // Next card
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
      doFlip(false);
      setShowsTargetFirst(determineCardDisplay());
    };

    autoPlayCard();
    return () => {
      cancelled = true;
      speechService.cancel();
    };
  }, [autoPlay, currentIndex]);

  // Navigation
  const handleNext = async () => {
    if (transitioningRef.current || currentIndex >= displayedCards.length - 1) return;
    if (autoPlay) {
      setAutoPlay(false);
      speechService.cancel();
      return;
    }
    transitioningRef.current = true;

    if (!isFlipped) {
      setIsFlipped(true);
      doFlip(true);
    }

    const card = displayedCards[currentIndex];
    const text = showsTargetFirst ? card[nativeField] : card[targetField];
    const lang = showsTargetFirst ? nativeLocale : targetLocale;

    if (studyStyle === 'text') {
      await new Promise((r) => setTimeout(r, 800));
    } else {
      await Promise.all([
        speechService.speakAsync(text, { lang }),
        new Promise((r) => setTimeout(r, 800)),
      ]);
    }

    setCurrentIndex((prev) => prev + 1);
    setIsFlipped(false);
    doFlip(false);
    setShowsTargetFirst(determineCardDisplay());
    transitioningRef.current = false;
  };

  const handlePrev = () => {
    if (transitioningRef.current || currentIndex <= 0) return;
    if (autoPlay) {
      setAutoPlay(false);
      speechService.cancel();
      return;
    }
    setCurrentIndex((prev) => prev - 1);
    setIsFlipped(false);
    doFlip(false);
    setShowsTargetFirst(determineCardDisplay());
  };

  // Keep swipe refs in sync
  handleNextRef.current = handleNext;
  handlePrevRef.current = handlePrev;

  // Mastery: correct / incorrect
  const handleCorrect = async () => {
    const card = displayedCards[currentIndex];
    if (!card || (card.masteryLevel || 0) >= 5) return;

    const newLevel = Math.min((card.masteryLevel || 0) + 1, 5);

    // Optimistic update — stars change immediately for everyone
    setFlashcards((prev) =>
      prev.map((c) => (c._id === card._id ? { ...c, masteryLevel: newLevel } : c)),
    );
    setStarPulse('up');
    setTimeout(() => setStarPulse(null), 600);

    if (isGuest) {
      addGuestXP(1);
      guestActivityTracker.trackCard(true);
    } else if (userId) {
      flashcardService.updateFlashcard(card._id, { masteryLevel: newLevel }).catch(() => {});
      userService.awardXP(userId, { points: 1, source: 'flashcard_correct' }).catch(() => {});
    }
  };

  const handleIncorrect = async () => {
    const card = displayedCards[currentIndex];
    if (!card || (card.masteryLevel || 0) <= 0) return;

    const newLevel = Math.max((card.masteryLevel || 0) - 1, 0);

    // Optimistic update — stars change immediately for everyone
    setFlashcards((prev) =>
      prev.map((c) => (c._id === card._id ? { ...c, masteryLevel: newLevel } : c)),
    );
    setStarPulse('down');
    setTimeout(() => setStarPulse(null), 600);

    if (isGuest) {
      guestActivityTracker.trackCard(false);
    } else if (userId) {
      flashcardService.updateFlashcard(card._id, { masteryLevel: newLevel }).catch(() => {});
    }
  };

  // Add flashcard
  const handleAddFlashcard = async () => {
    if (!newCard[targetField]?.trim() || !newCard[nativeField]?.trim()) return;
    try {
      const response = await flashcardService.createFlashcard({
        userId,
        [targetField]: newCard[targetField],
        [nativeField]: newCard[nativeField],
        romanization: newCard.romanization,
        category: newCard.topic.trim() ? [newCard.category, newCard.topic.trim()] : [newCard.category],
        targetLang: targetLanguage,
        nativeLang: nativeLanguage,
      });
      setFlashcards((prev) => [...prev, response.data]);
      setNewCard({ [targetField]: '', [nativeField]: '', romanization: '', category: 'vocabulary', topic: '' });
      setShowAddForm(false);
    } catch {}
  };

  // Speak button
  const handleSpeak = (text: string, lang: string) => {
    if (speechService.isSpeaking()) {
      speechService.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speechService.speak(text, { lang });
      if (isGuest) guestActivityTracker.trackAudio();
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  };

  // Flip animation interpolations
  const frontRotation = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backRotation = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{t('flashcards.loadingFlashcards')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={() => fetchFlashcards()} style={{ marginTop: 16 }}>
          {t('common.retry', 'Retry')}
        </Button>
      </View>
    );
  }

  if (displayedCards.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyIcon}>🎴</Text>
        <Text variant="titleLarge" style={styles.emptyTitle}>
          {t('flashcards.noFlashcards')}
        </Text>
        <Text style={styles.emptyDesc}>{t('flashcards.noCardsDesc', 'No flashcards available for this selection.')}</Text>
        {!isGuest && (
          <Button mode="contained" onPress={() => setShowAddForm(true)} style={{ marginTop: 16 }}>
            {t('flashcards.addCard', 'Add Card')}
          </Button>
        )}
      </View>
    );
  }

  const card = displayedCards[currentIndex];
  const frontText = showsTargetFirst ? card[targetField] : card[nativeField];
  const backText = showsTargetFirst ? card[nativeField] : card[targetField];
  const frontLabel = showsTargetFirst
    ? t(`languages.${targetLanguage}`, getLangName(targetLanguage))
    : t(`languages.${nativeLanguage}`, getLangName(nativeLanguage));
  const backLabel = showsTargetFirst
    ? t(`languages.${nativeLanguage}`, getLangName(nativeLanguage))
    : t(`languages.${targetLanguage}`, getLangName(targetLanguage));
  const frontLocale = showsTargetFirst ? targetLocale : nativeLocale;
  const backLocale = showsTargetFirst ? nativeLocale : targetLocale;
  const translationPending = !!(card as any)?._translationPending && !backText;
  const mastery = card.masteryLevel || 0;

  return (
    <View style={styles.screen}>
      {/* Header bar */}
      <View style={styles.header}>
        <Text style={styles.counter}>
          {currentIndex + 1} / {(selectedCategories.size > 0 || selectedCardIds.size > 0) ? displayedCards.length : (totalCards || displayedCards.length)}
        </Text>
        <View style={styles.headerActions}>
          <IconButton
            icon="filter-variant"
            size={22}
            onPress={() => setShowCategories(true)}
            iconColor={(selectedCategories.size > 0 || selectedCardIds.size > 0) ? colors.primary : colors.textMuted}
          />
          <IconButton
            icon="shuffle-variant"
            size={22}
            onPress={handleToggleShuffle}
            iconColor={isShuffled ? colors.primary : colors.textMuted}
          />
          <IconButton
            icon={autoPlay ? 'pause-circle' : 'play-circle'}
            size={22}
            onPress={() => {
              if (autoPlay) {
                setAutoPlay(false);
                speechService.cancel();
              } else {
                setAutoPlay(true);
              }
            }}
            iconColor={autoPlay ? colors.accentGreen : colors.textMuted}
          />
          <IconButton icon="cog" size={22} onPress={() => setShowSettings(true)} iconColor={colors.textMuted} />
        </View>
      </View>

      {/* Shuffle badge */}
      {!isCompact && isShuffled && (
        <View style={styles.shuffleBadge}>
          <Text style={styles.shuffleBadgeText}>🔀 {t('flashcards.shuffleOn', 'Shuffled')}</Text>
        </View>
      )}
      {/* Selection badge — shows categories and/or individual cards */}
      {!isCompact && (selectedCategories.size > 0 || selectedCardIds.size > 0) && (
        <View style={styles.selectionBadge}>
          <Text style={styles.selectionBadgeText}>
            ☑{selectedCategories.size > 0 ? ` ${selectedCategories.size} ${selectedCategories.size === 1 ? 'category' : 'categories'}` : ''}
            {selectedCategories.size > 0 && selectedCardIds.size > 0 ? ' +' : ''}
            {selectedCardIds.size > 0 ? ` ${selectedCardIds.size} ${selectedCardIds.size === 1 ? 'card' : 'cards'}` : ''}
          </Text>
          <TouchableOpacity
            onPress={() => { setSelectedCategories(new Set()); setSelectedCardIds(new Set()); }}
            style={styles.selectionClear}
          >
            <Text style={styles.selectionClearText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Progress bar */}
      <ProgressBar
        progress={(currentIndex + 1) / ((selectedCategories.size > 0 || selectedCardIds.size > 0) ? displayedCards.length : (totalCards || displayedCards.length))}
        color={colors.primary}
        style={styles.progressBar}
      />

      {/* Card */}
      <View style={styles.cardContainer} {...swipePan.panHandlers}>
        <TouchableOpacity activeOpacity={0.9} onPress={handleFlip} style={styles.cardTouchable}>
          {/* Front */}
          <Animated.View
            style={[
              styles.card,
              styles.cardFront,
              { transform: [{ rotateY: frontRotation }] },
              studyStyle === 'audio' && styles.cardAudioOnly,
            ]}
          >
            <Text style={styles.cardLabel}>{frontLabel}</Text>
            {studyStyle !== 'audio' && (
              <Text style={styles.cardText}>{frontText}</Text>
            )}
            {studyStyle === 'audio' && (
              <IconButton icon="volume-high" size={48} iconColor={colors.primary} onPress={() => handleSpeak(frontText, frontLocale)} />
            )}
            {card.romanization && studyStyle !== 'audio' && showsTargetFirst && langHasRomanization(targetLanguage) && (
              <Text style={styles.romanization}>{card.romanization}</Text>
            )}
            {!isCompact && <Text style={styles.tapHint}>{t('flashcards.tapToFlip', 'Tap to flip')}</Text>}
          </Animated.View>

          {/* Back */}
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              { transform: [{ rotateY: backRotation }] },
            ]}
          >
            <Text style={styles.cardLabel}>{backLabel}</Text>
            {translationPending ? (
              <View style={styles.translationPending}>
                <ActivityIndicator
                  size="small"
                  color={colors.textMuted}
                  animating={retryingTranslation}
                />
                <Text style={styles.translationPendingText}>
                  {retryingTranslation
                    ? t('flashcards.translating', 'Translating...')
                    : t('flashcards.translationFailed', 'Translation unavailable')}
                </Text>
                {!retryingTranslation && (
                  <TouchableOpacity style={styles.retryBtn} onPress={retryTranslation}>
                    <Text style={styles.retryBtnText}>{t('flashcards.retryTranslation', 'Retry')}</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <Text style={styles.cardText}>{backText}</Text>
            )}
            {card.romanization && !showsTargetFirst && langHasRomanization(targetLanguage) && (
              <Text style={styles.romanization}>{card.romanization}</Text>
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Mastery stars */}
      {!isCompact && (
        <View style={styles.masteryRow}>
          <Text style={styles.masteryLabel}>{t('flashcards.familiarity', 'Familiarity')}</Text>
          <View style={styles.masteryStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Text key={star} style={[styles.masteryStar, star <= mastery && styles.masteryStarActive]}>
                ★
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Action buttons */}
      <View style={styles.actionRow}>
        <IconButton
          icon="thumb-down-outline"
          size={isCompact ? 24 : 28}
          iconColor={colors.accentRed}
          onPress={handleIncorrect}
          style={styles.actionBtn}
        />
        {isCompact && (
          <IconButton
            icon="chevron-left"
            size={24}
            iconColor={currentIndex <= 0 ? colors.border : colors.textSecondary}
            onPress={handlePrev}
            disabled={currentIndex <= 0}
            style={styles.actionBtn}
          />
        )}
        <IconButton
          icon="volume-high"
          size={isCompact ? 24 : 28}
          iconColor={isSpeaking ? colors.primary : colors.textSecondary}
          onPress={() => {
            const text = isFlipped ? backText : frontText;
            const lang = isFlipped ? backLocale : frontLocale;
            handleSpeak(text, lang);
          }}
          style={styles.actionBtn}
        />
        {isCompact && (
          <IconButton
            icon="chevron-right"
            size={24}
            iconColor={currentIndex >= displayedCards.length - 1 ? colors.border : colors.textSecondary}
            onPress={handleNext}
            disabled={currentIndex >= displayedCards.length - 1}
            style={styles.actionBtn}
          />
        )}
        <IconButton
          icon="thumb-up-outline"
          size={isCompact ? 24 : 28}
          iconColor={colors.accentGreen}
          onPress={handleCorrect}
          style={styles.actionBtn}
        />
      </View>

      {/* Navigation */}
      {!isCompact && (
        <View style={styles.navRow}>
          <Button
            mode="outlined"
            onPress={handlePrev}
            disabled={currentIndex <= 0}
            icon="chevron-left"
            style={styles.navBtn}
          >
            {t('flashcards.prev', 'Prev')}
          </Button>
          <Button
            mode="contained"
            onPress={handleNext}
            disabled={currentIndex >= displayedCards.length - 1}
            icon="chevron-right"
            contentStyle={{ flexDirection: 'row-reverse' }}
            style={[styles.navBtn, { backgroundColor: colors.primary }]}
          >
            {t('flashcards.next', 'Next')}
          </Button>
        </View>
      )}

      {/* Add card FAB */}
      {!isGuest && !isCompact && (
        <FAB icon="plus" style={styles.fab} onPress={() => setShowAddForm(true)} color="#fff" />
      )}

      {/* Category filter modal */}
      <Modal visible={showCategories} transparent animationType="slide" onRequestClose={() => setShowCategories(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text variant="titleMedium" style={styles.modalTitle}>
              {t('flashcards.categories', 'Categories')}
            </Text>
            {/* Header: selection count or hint */}
            <View style={styles.pickerHeader}>
              {selectedCategories.size > 0 ? (
                <>
                  <Text style={styles.pickerSelectedLabel}>✓ {selectedCategories.size} categories</Text>
                  <TouchableOpacity onPress={() => setSelectedCategories(new Set())}>
                    <Text style={styles.categoryClearBtn}>{t('common.clearAll', 'Clear')}</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <Text style={styles.pickerHint}>{t('flashcards.clickCategoryHint', 'Tap a category to filter cards')}</Text>
              )}
            </View>
            <ScrollView style={{ maxHeight: 400 }}>
              {(() => {
                const loadedMap = buildLoadedCategoryCards();
                return allCategories.map(({ name: primary, count: totalCount }) => {
                  const isExpanded = expandedPrimaries.has(primary);
                  const isCatSelected = selectedCategories.has(primary);
                  const cachedDefault = categoryCardsCache[primary];
                  const customCards = (loadedMap[primary]?.cards || []).filter((c: any) => !c.isDefault);
                  const allCategoryCards = cachedDefault
                    ? [...cachedDefault, ...customCards]
                    : loadedMap[primary]?.cards || [];
                  return (
                    <View key={primary} style={styles.categoryGroup}>
                      <TouchableOpacity
                        style={[styles.categoryItem, isCatSelected && styles.categorySelected]}
                        onPress={() => toggleCategoryFilter(primary)}
                      >
                        <Text style={styles.categoryCheck}>
                          {isCatSelected ? '✓' : ''}
                        </Text>
                        <Text style={[styles.categoryName, { flex: 1 }]}>{t(`flashcards.categoryNames.${primary.toLowerCase()}`, primary)}</Text>
                        <View style={styles.categoryItemRight}>
                          <Text style={styles.categoryCount}>{totalCount}</Text>
                          {totalCount > 0 && (
                            <TouchableOpacity
                              onPress={() => toggleExpandedPrimary(primary)}
                              style={styles.expandBtn}
                              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            >
                              <Text style={[styles.expandArrow, isExpanded && styles.expandArrowOpen]}>›</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </TouchableOpacity>
                      {isExpanded && allCategoryCards.length > 0 && (
                        <View style={styles.subtopicList}>
                          {allCategoryCards.map((card: any) => {
                            const isChecked = selectedCardIds.has(card._id);
                            return (
                              <TouchableOpacity
                                key={card._id}
                                style={[styles.subtopicItem, isChecked && styles.subtopicSelected]}
                                onPress={() => {
                                  const adding = !selectedCardIds.has(card._id);
                                  setSelectedCardIds((prev) => {
                                    const next = new Set(prev);
                                    next.has(card._id) ? next.delete(card._id) : next.add(card._id);
                                    return next;
                                  });
                                  if (adding) setSelectedCategories((prev) => { const next = new Set(prev); next.delete(primary); return next; });
                                }}
                              >
                                <Text style={styles.categoryCheck}>{isChecked ? '✓' : ''}</Text>
                                <Text style={[styles.subtopicName, isChecked && styles.subtopicNameActive]}>
                                  {card[nativeField] || card[targetField]}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      )}
                    </View>
                  );
                });
              })()}
            </ScrollView>
            <View style={styles.modalActions}>
              <Button onPress={() => { setSelectedCategories(new Set()); setSelectedCardIds(new Set()); }}>{t('common.clearAll', 'Clear All')}</Button>
              <Button mode="contained" onPress={() => setShowCategories(false)}>
                {t('common.done', 'Done')}
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Settings modal */}
      <Modal visible={showSettings} transparent animationType="slide" onRequestClose={() => setShowSettings(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text variant="titleMedium" style={styles.modalTitle}>
              {t('flashcards.settings', 'Settings')}
            </Text>

            <Text style={styles.settingLabel}>{t('flashcards.displayMode', 'Card Display')}</Text>
            <View style={styles.chipRow}>
              <Chip
                selected={displayMode === 'target'}
                onPress={() => { setDisplayMode('target'); setShowsTargetFirst(true); }}
                style={styles.chip}
              >
                {t(`languages.${targetLanguage}`, getLangName(targetLanguage))} {t('flashcards.first', 'first')}
              </Chip>
              <Chip
                selected={displayMode === 'native'}
                onPress={() => { setDisplayMode('native'); setShowsTargetFirst(false); }}
                style={styles.chip}
              >
                {t(`languages.${nativeLanguage}`, getLangName(nativeLanguage))} {t('flashcards.first', 'first')}
              </Chip>
              <Chip
                selected={displayMode === 'random'}
                onPress={() => setDisplayMode('random')}
                style={styles.chip}
              >
                {t('flashcards.random', 'Random')}
              </Chip>
            </View>

            <Text style={styles.settingLabel}>{t('flashcards.studyStyle', 'Study Style')}</Text>
            <View style={styles.chipRow}>
              <Chip selected={studyStyle === 'both'} onPress={() => setStudyStyle('both')} style={styles.chip}>
                {t('flashcards.textAndAudio', 'Text + Audio')}
              </Chip>
              <Chip selected={studyStyle === 'text'} onPress={() => setStudyStyle('text')} style={styles.chip}>
                {t('flashcards.textOnly', 'Text Only')}
              </Chip>
              <Chip selected={studyStyle === 'audio'} onPress={() => setStudyStyle('audio')} style={styles.chip}>
                {t('flashcards.audioOnly', 'Audio Only')}
              </Chip>
            </View>

            <Text style={styles.settingLabel}>{t('flashcards.deckOrder', 'Deck Order')}</Text>
            <View style={styles.chipRow}>
              <Chip selected={!isShuffled} onPress={() => { if (isShuffled) handleToggleShuffle(); setShowSettings(false); }} style={styles.chip}>
                {t('flashcards.inOrder', 'In Order')}
              </Chip>
              <Chip selected={isShuffled} onPress={() => { if (!isShuffled) handleToggleShuffle(); setShowSettings(false); }} style={styles.chip}>
                🔀 {t('flashcards.shuffled', 'Shuffled')}
              </Chip>
            </View>

            <Button mode="contained" onPress={() => setShowSettings(false)} style={{ marginTop: 16 }}>
              {t('common.done', 'Done')}
            </Button>
          </View>
        </View>
      </Modal>

      {/* Add flashcard modal */}
      <Modal visible={showAddForm} transparent animationType="slide" onRequestClose={() => setShowAddForm(false)}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
          <View style={styles.modalSheet}>
            <Text variant="titleMedium" style={styles.modalTitle}>
              {t('flashcards.addFlashcard', 'Add Flashcard')}
            </Text>
            <TextInput
              label={getLangName(targetLanguage)}
              value={newCard[targetField] || ''}
              onChangeText={(v) => setNewCard({ ...newCard, [targetField]: v })}
              mode="outlined"
              style={styles.formInput}
            />
            {langHasRomanization(targetLanguage) && (
            <TextInput
              label={t('flashcards.romanization', 'Romanization')}
              value={newCard.romanization || ''}
              onChangeText={(v) => setNewCard({ ...newCard, romanization: v })}
              mode="outlined"
              style={styles.formInput}
            />
            )}
            <TextInput
              label={getLangName(nativeLanguage)}
              value={newCard[nativeField] || ''}
              onChangeText={(v) => setNewCard({ ...newCard, [nativeField]: v })}
              mode="outlined"
              style={styles.formInput}
            />
            <TextInput
              label={t('flashcards.category', 'Category')}
              value={newCard.category}
              onChangeText={(v) => setNewCard({ ...newCard, category: v })}
              mode="outlined"
              style={styles.formInput}
              placeholder="e.g. numbers, greetings"
            />
            <TextInput
              label={t('flashcards.topic', 'Topic (optional)')}
              value={newCard.topic}
              onChangeText={(v) => setNewCard({ ...newCard, topic: v })}
              mode="outlined"
              style={styles.formInput}
              placeholder="e.g. days of the week, 1-10"
            />
            <View style={styles.modalActions}>
              <Button onPress={() => setShowAddForm(false)}>{t('common.cancel', 'Cancel')}</Button>
              <Button mode="contained" onPress={handleAddFlashcard}>
                {t('flashcards.save', 'Save')}
              </Button>
            </View>
          </View>
          </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (colors: AppColors, winWidth: number, winHeight: number, isCompact: boolean) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loadingText: { marginTop: 12, color: colors.textSecondary },
  errorText: { color: colors.error, fontSize: 16, textAlign: 'center' },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontWeight: '700', color: colors.textPrimary, marginBottom: 8 },
  emptyDesc: { color: colors.textSecondary, textAlign: 'center' },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isCompact ? 8 : 16,
    paddingTop: isCompact ? 8 : 48,
    paddingBottom: isCompact ? 4 : 8,
    backgroundColor: colors.surface,
  },
  counter: { fontSize: isCompact ? 14 : 16, fontWeight: '700', color: colors.textPrimary },
  headerActions: { flexDirection: 'row' },

  shuffleBadge: {
    backgroundColor: '#eff6ff',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 4,
  },
  shuffleBadgeText: { fontSize: 12, color: colors.primary, fontWeight: '600' },

  progressBar: { height: isCompact ? 3 : 4, backgroundColor: colors.border },

  // Card
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: isCompact ? 10 : 20,
    paddingVertical: isCompact ? 4 : 0,
  },
  cardTouchable: {
    width: winWidth - (isCompact ? 20 : 40),
    height: isCompact ? Math.max(winHeight * 0.45, 120) : 280,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: isCompact ? 14 : 20,
    padding: isCompact ? 14 : 24,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  cardFront: { backgroundColor: colors.surface },
  cardBack: { backgroundColor: '#fff5f0' },
  cardAudioOnly: { justifyContent: 'center' },
  cardLabel: {
    position: 'absolute',
    top: isCompact ? 8 : 16,
    left: isCompact ? 12 : 20,
    fontSize: isCompact ? 10 : 12,
    color: colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardText: { fontSize: isCompact ? 22 : 28, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
  romanization: { fontSize: isCompact ? 13 : 16, color: colors.textSecondary, marginTop: isCompact ? 4 : 8 },
  tapHint: {
    position: 'absolute',
    bottom: 16,
    fontSize: 12,
    color: colors.textMuted,
  },

  // Mastery
  masteryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, gap: 6 },
  masteryLabel: { fontSize: 12, color: colors.textMuted, marginRight: 4 },
  masteryStars: { flexDirection: 'row', gap: 4 },
  masteryStar: { fontSize: 24, color: colors.border },
  masteryStarActive: { color: colors.accentYellow },

  // Actions
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: isCompact ? 8 : 24,
    paddingVertical: isCompact ? 2 : 4,
  },
  actionBtn: {
    backgroundColor: colors.surface,
    elevation: 2,
    ...(isCompact ? { margin: 0 } : {}),
  },

  // Navigation
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 8,
    gap: 12,
  },
  navBtn: { flex: 1, borderRadius: 8 },

  // FAB
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: colors.primary,
  },

  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: { fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 16 },

  // Categories
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  categorySelected: { backgroundColor: '#fff5f0' },
  categoryCheck: { fontSize: 14, fontWeight: '700', color: colors.primary, width: 20, textAlign: 'center' },
  categoryName: { fontSize: 15, fontWeight: '600', color: colors.textPrimary, textTransform: 'capitalize' },
  categoryCount: { fontSize: 14, color: colors.textMuted },
  categoryClearBtn: { fontSize: 14, fontWeight: '600', color: colors.primary },

  // Settings
  settingLabel: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginTop: 16, marginBottom: 8 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { marginBottom: 4 },

  // Form
  formInput: { marginBottom: 12, backgroundColor: colors.surface },

  // Selection badge
  selectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primary + '18',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 4,
    gap: 8,
  },
  selectionBadgeText: { fontSize: 12, color: colors.primary, fontWeight: '600' },
  selectionClear: { padding: 2 },
  selectionClearText: { fontSize: 12, color: colors.primary, fontWeight: '700' },

  // Card picker modal
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    minHeight: 32,
  },
  pickerHint: { fontSize: 12, color: colors.textMuted, flex: 1 },
  pickerSelectedLabel: { fontSize: 13, fontWeight: '700', color: colors.primary },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 10,
  },
  pickerItemSelected: { backgroundColor: colors.primary + '10' },
  pickerCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  pickerCheckboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  pickerCheckmark: { color: '#fff', fontSize: 12, fontWeight: '700' },
  pickerCardInfo: { flex: 1 },
  pickerCardTarget: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  pickerCardNative: { fontSize: 12, color: colors.textSecondary, marginTop: 1 },
  pickerMastery: { flexDirection: 'row', gap: 1 },

  // Hierarchical categories
  categoryGroup: { borderBottomWidth: 1, borderBottomColor: colors.border },
  categoryItemRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  expandBtn: { padding: 4 },
  expandArrow: { fontSize: 18, color: colors.textMuted, fontWeight: '700' },
  expandArrowOpen: { transform: [{ rotate: '90deg' }] },
  subtopicList: {
    marginLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary + '40',
    marginBottom: 4,
  },
  subtopicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginBottom: 2,
  },
  subtopicSelected: { backgroundColor: colors.primary + '18' },
  subtopicName: { fontSize: 13, color: colors.textSecondary, textTransform: 'capitalize' },
  subtopicNameActive: { color: colors.primary, fontWeight: '600' },
  translationPending: { alignItems: 'center' as const, gap: 12, paddingVertical: 16 },
  translationPendingText: { fontSize: 14, color: colors.textMuted },
  retryBtn: {
    backgroundColor: colors.primary + '30',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginTop: 4,
  },
  retryBtnText: { fontSize: 14, color: colors.primary, fontWeight: '600' as const },
});

export default FlashcardsScreen;
