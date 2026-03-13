import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
  Modal,
  FlatList,
  AppState,
  Platform,
} from 'react-native';
import { Text, Button, IconButton, TextInput, FAB, Chip, ProgressBar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { flashcardService, progressService, userService } from '../../services/api';
import speechService from '../../services/speechService';
import guestActivityTracker from '../../services/guestActivityTracker';
import {
  requestPermissions as requestNotifPermissions,
  showPlayerNotification,
  dismissPlayerNotification,
} from '../../services/playerNotification';

// PiP is Android-only and unavailable in Expo Go — import safely
let PipHandler: { enterPipMode: (w?: number, h?: number) => void } | null = null;
if (Platform.OS === 'android') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    PipHandler = require('react-native-pip-android').default;
  } catch {
    // Not linked (e.g. Expo Go) — PiP silently disabled
  }
}
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';
import LANGUAGES, { getLangName, getLangField, langHasRomanization } from '../../config/languages';
import { colors } from '../../config/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const normalizeCategory = (cat: any): string[] => {
  if (Array.isArray(cat)) return cat.length > 0 ? cat : ['uncategorized'];
  if (typeof cat === 'string' && cat.trim()) return [cat.trim()];
  return ['uncategorized'];
};


function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FlashcardsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { userId, isGuest, guestXP, addGuestXP } = useAuthStore();
  const { targetLanguage, nativeLanguage } = useSettingsStore();

  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayMode, setDisplayMode] = useState<'target' | 'native' | 'random'>('target');
  const [showsTargetFirst, setShowsTargetFirst] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [studyStyle, setStudyStyle] = useState<'both' | 'text' | 'audio'>('both');
  const [showCategories, setShowCategories] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [starPulse, setStarPulse] = useState<'up' | 'down' | null>(null);
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState<any[]>([]);
  const [expandedPrimaries, setExpandedPrimaries] = useState<Set<string>>(new Set());
  const [selectedCardIds, setSelectedCardIds] = useState<Set<string>>(new Set());

  const [newCard, setNewCard] = useState<Record<string, string>>(() => ({ [getLangField(targetLanguage)]: '', [getLangField(nativeLanguage)]: '', romanization: '', category: 'vocabulary', topic: '' }));

  const autoPlayRef = useRef(false);
  const transitioningRef = useRef(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const targetField = getLangField(targetLanguage);
  const nativeField = getLangField(nativeLanguage);
  const targetLocale = LANGUAGES[targetLanguage]?.ttsLocale || 'ko-KR';
  const nativeLocale = LANGUAGES[nativeLanguage]?.ttsLocale || 'en-US';

  // Request notification permission once on mount
  useEffect(() => {
    requestNotifPermissions();
  }, []);

  // Fetch flashcards
  const fetchFlashcards = useCallback(async () => {
    try {
      setLoading(true);
      const response = userId
        ? await flashcardService.getFlashcards(userId)
        : await flashcardService.getGuestFlashcards();
      setFlashcards(response.data);
      setError('');
    } catch {
      setError(t('flashcards.failedToLoad'));
    } finally {
      setLoading(false);
    }
  }, [userId, t]);

  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards]);

  // Keep autoPlayRef in sync
  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  // Category-filtered flashcards
  const backendSendsTargetField =
    flashcards.some((c) => !!c[targetField]);

  // All cards matching the category filter — used for the card picker list
  const categoryFilteredCards =
    (selectedCategories.size === 0
      ? flashcards
      : flashcards.filter((c) => {
          const cats = normalizeCategory(c.category);
          return cats.some((cat) => selectedCategories.has(cat));
        })
    ).filter((c) => !backendSendsTargetField || !!c[targetField]);

  // Final study deck: further filtered to only individually selected cards
  const activeFlashcards =
    selectedCardIds.size === 0
      ? categoryFilteredCards
      : categoryFilteredCards.filter((c) => selectedCardIds.has(c._id));

  // Displayed deck — shuffled or normal order
  const displayedCards = useMemo(() => {
    if (!shuffleEnabled) return activeFlashcards;
    return shuffledDeck.length === activeFlashcards.length ? shuffledDeck : activeFlashcards;
  }, [shuffleEnabled, shuffledDeck, activeFlashcards]);

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

  // Mini-player notification — show/update when autoplay is on, dismiss when off
  useEffect(() => {
    if (!autoPlay) {
      dismissPlayerNotification();
      return;
    }
    const card = displayedCards[currentIndex];
    if (!card) return;
    showPlayerNotification(
      card[targetField] || '',
      card[nativeField] || '',
      currentIndex + 1,
      displayedCards.length,
    );
    return () => { dismissPlayerNotification(); };
  }, [autoPlay, currentIndex, displayedCards.length]);

  // Reset index when filtered deck shrinks
  useEffect(() => {
    if (displayedCards.length > 0 && currentIndex >= displayedCards.length) {
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [displayedCards.length, currentIndex]);

  // Reset on category or card-selection change
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    if (autoPlay) {
      setAutoPlay(false);
      speechService.cancel();
    }
    // Re-shuffle if shuffle mode is on
    if (shuffleEnabled) {
      setShuffledDeck(shuffleArray(activeFlashcards));
    }
  }, [selectedCategories, selectedCardIds]);

  // Toggle shuffle
  const handleToggleShuffle = useCallback(() => {
    if (!shuffleEnabled) {
      setShuffledDeck(shuffleArray(activeFlashcards));
    }
    setShuffleEnabled((prev) => !prev);
    setCurrentIndex(0);
    setIsFlipped(false);
    doFlip(false);
    if (autoPlay) {
      setAutoPlay(false);
      speechService.cancel();
    }
  }, [shuffleEnabled, activeFlashcards, autoPlay]);

  // Build category → cards map: { primary: { count, cards: Flashcard[] } }
  const buildCategoryCards = () => {
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
      next.has(cat) ? next.delete(cat) : next.add(cat);
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
  }, [currentIndex, displayedCards.length, studyStyle]);

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
      await speechService.speakAsync(backText, { lang: backLocale });
      if (cancelled) return;

      await speechService.waitAudio(1200);
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
        <Text style={styles.loadingText}>{t('flashcards.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={fetchFlashcards} style={{ marginTop: 16 }}>
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
          {t('flashcards.noCards')}
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
  const frontLabel = showsTargetFirst ? getLangName(targetLanguage) : getLangName(nativeLanguage);
  const backLabel = showsTargetFirst ? getLangName(nativeLanguage) : getLangName(targetLanguage);
  const frontLocale = showsTargetFirst ? targetLocale : nativeLocale;
  const backLocale = showsTargetFirst ? nativeLocale : targetLocale;
  const mastery = card.masteryLevel || 0;

  return (
    <View style={styles.screen}>
      {/* Header bar */}
      <View style={styles.header}>
        <Text style={styles.counter}>
          {currentIndex + 1} / {displayedCards.length}
        </Text>
        <View style={styles.headerActions}>
          <IconButton
            icon="filter-variant"
            size={22}
            onPress={() => setShowCategories(true)}
            iconColor={selectedCategories.size > 0 ? colors.primary : colors.textMuted}
          />
          <IconButton
            icon="shuffle-variant"
            size={22}
            onPress={handleToggleShuffle}
            iconColor={shuffleEnabled ? colors.primary : colors.textMuted}
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
      {shuffleEnabled && (
        <View style={styles.shuffleBadge}>
          <Text style={styles.shuffleBadgeText}>🔀 {t('flashcards.shuffleOn', 'Shuffled')}</Text>
        </View>
      )}
      {/* Selected cards badge */}
      {selectedCardIds.size > 0 && (
        <View style={styles.selectionBadge}>
          <Text style={styles.selectionBadgeText}>
            ☑ {selectedCardIds.size} {t('flashcards.cardsSelected', 'cards selected')}
          </Text>
          <TouchableOpacity onPress={() => setSelectedCardIds(new Set())} style={styles.selectionClear}>
            <Text style={styles.selectionClearText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Progress bar */}
      <ProgressBar
        progress={(currentIndex + 1) / displayedCards.length}
        color={colors.primary}
        style={styles.progressBar}
      />

      {/* Card */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.cardMicButton}
          onPress={() => {
            const text = isFlipped ? backText : frontText;
            const lang = isFlipped ? backLocale : frontLocale;
            handleSpeak(text, lang);
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <IconButton
            icon="microphone"
            size={24}
            iconColor={isSpeaking ? colors.primary : colors.textMuted}
            style={{ margin: 0 }}
          />
        </TouchableOpacity>
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
            {card.romanization && studyStyle !== 'audio' && showsTargetFirst && (
              <Text style={styles.romanization}>{card.romanization}</Text>
            )}
            <Text style={styles.tapHint}>{t('flashcards.tapToFlip', 'Tap to flip')}</Text>
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
            <Text style={styles.cardText}>{backText}</Text>
            {card.romanization && !showsTargetFirst && (
              <Text style={styles.romanization}>{card.romanization}</Text>
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Mastery stars */}
      <View style={styles.masteryRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Text key={star} style={[styles.masteryStar, star <= mastery && styles.masteryStarActive]}>
            ★
          </Text>
        ))}
      </View>

      {/* Action buttons */}
      <View style={styles.actionRow}>
        <IconButton
          icon="thumb-down-outline"
          size={28}
          iconColor={colors.accentRed}
          onPress={handleIncorrect}
          style={styles.actionBtn}
        />
        <IconButton
          icon="volume-high"
          size={28}
          iconColor={isSpeaking ? colors.primary : colors.textSecondary}
          onPress={() => {
            const text = isFlipped ? backText : frontText;
            const lang = isFlipped ? backLocale : frontLocale;
            handleSpeak(text, lang);
          }}
          style={styles.actionBtn}
        />
        <IconButton
          icon="thumb-up-outline"
          size={28}
          iconColor={colors.accentGreen}
          onPress={handleCorrect}
          style={styles.actionBtn}
        />
      </View>

      {/* Navigation */}
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

      {/* Add card FAB */}
      {!isGuest && (
        <FAB icon="plus" style={styles.fab} onPress={() => setShowAddForm(true)} color="#fff" />
      )}

      {/* Category filter modal */}
      <Modal visible={showCategories} transparent animationType="slide" onRequestClose={() => setShowCategories(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text variant="titleMedium" style={styles.modalTitle}>
              {t('flashcards.categories', 'Categories')}
            </Text>
            <ScrollView style={{ maxHeight: 400 }}>
              {Object.entries(buildCategoryCards()).map(([primary, { count, cards }]) => {
                const isExpanded = expandedPrimaries.has(primary);
                return (
                  <View key={primary} style={styles.categoryGroup}>
                    <TouchableOpacity
                      style={[styles.categoryItem, selectedCategories.has(primary) && styles.categorySelected]}
                      onPress={() => {
                        setSelectedCategories((prev) => {
                          const next = new Set(prev);
                          next.has(primary) ? next.delete(primary) : next.add(primary);
                          return next;
                        });
                      }}
                    >
                      <Text style={styles.categoryName}>{primary}</Text>
                      <View style={styles.categoryItemRight}>
                        <Text style={styles.categoryCount}>{count}</Text>
                        <TouchableOpacity
                          onPress={() => toggleExpandedPrimary(primary)}
                          style={styles.expandBtn}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <Text style={[styles.expandArrow, isExpanded && styles.expandArrowOpen]}>›</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                    {isExpanded && (
                      <View style={styles.subtopicList}>
                        {cards.map((card) => {
                          const isChecked = selectedCardIds.has(card._id);
                          return (
                            <TouchableOpacity
                              key={card._id}
                              style={[styles.subtopicItem, isChecked && styles.subtopicSelected]}
                              onPress={() => {
                                setSelectedCardIds((prev) => {
                                  const next = new Set(prev);
                                  next.has(card._id) ? next.delete(card._id) : next.add(card._id);
                                  return next;
                                });
                              }}
                            >
                              <Text style={[styles.subtopicName, isChecked && styles.subtopicNameActive]}>
                                {card[nativeField]}
                              </Text>
                              {isChecked && <Text style={styles.categoryCount}>✓</Text>}
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.modalActions}>
              <Button onPress={() => setSelectedCategories(new Set())}>{t('common.clearAll', 'Clear All')}</Button>
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
                {getLangName(targetLanguage)} {t('flashcards.first', 'first')}
              </Chip>
              <Chip
                selected={displayMode === 'native'}
                onPress={() => { setDisplayMode('native'); setShowsTargetFirst(false); }}
                style={styles.chip}
              >
                {getLangName(nativeLanguage)} {t('flashcards.first', 'first')}
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
              <Chip selected={!shuffleEnabled} onPress={() => { if (shuffleEnabled) handleToggleShuffle(); setShowSettings(false); }} style={styles.chip}>
                {t('flashcards.inOrder', 'In Order')}
              </Chip>
              <Chip selected={shuffleEnabled} onPress={() => { if (!shuffleEnabled) handleToggleShuffle(); setShowSettings(false); }} style={styles.chip}>
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
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 8,
    backgroundColor: colors.surface,
  },
  counter: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
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

  progressBar: { height: 4, backgroundColor: colors.border },

  // Card
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardMicButton: {
    position: 'absolute',
    bottom: 12,
    right: 28,
    zIndex: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  cardTouchable: {
    width: SCREEN_WIDTH - 40,
    height: 280,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 24,
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
    top: 16,
    left: 20,
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardText: { fontSize: 28, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
  romanization: { fontSize: 16, color: colors.textSecondary, marginTop: 8 },
  tapHint: {
    position: 'absolute',
    bottom: 16,
    fontSize: 12,
    color: colors.textMuted,
  },

  // Mastery
  masteryRow: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 8, gap: 4 },
  masteryStar: { fontSize: 24, color: colors.border },
  masteryStarActive: { color: colors.accentYellow },

  // Actions
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingVertical: 4,
  },
  actionBtn: {
    backgroundColor: colors.surface,
    elevation: 2,
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
  categoryName: { fontSize: 15, fontWeight: '600', color: colors.textPrimary, textTransform: 'capitalize' },
  categoryCount: { fontSize: 14, color: colors.textMuted },

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
});

export default FlashcardsScreen;
