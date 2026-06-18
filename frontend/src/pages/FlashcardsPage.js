import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { flashcardService, learningHubService, progressService, userService, guestXPHelper } from '../services/api';
import speechService from '../services/speechService';
import guestActivityTracker from '../services/guestActivityTracker';
import LANGUAGES, {
  getTargetLangName, getNativeLangName,
  getTargetLangCode, getNativeLangCode,
  getLangField, getTargetField, getNativeField,
  targetLangHasRomanization,
} from '../config/languages';
import PronunciationGuide from '../components/PronunciationGuide';
import './FlashcardsPage.css';

// Normalize category: handles old string format and new array format
const normalizeCategory = (cat) => {
  if (Array.isArray(cat)) return cat.length > 0 ? cat : ['uncategorized'];
  if (typeof cat === 'string' && cat.trim()) return [cat.trim()];
  return ['uncategorized'];
};

// 12h shuffle seed (guest fallback when there's no server-side account).
const SHUFFLE_SEED_TTL_MS = 12 * 60 * 60 * 1000;

// Deterministic seeded shuffle so a category/selection deck shuffles the same
// way for a given seed — keeps order stable within the 12h window, matching
// the server-shuffled main deck.
const seededRng = (seed) => {
  let s = (seed >>> 0) || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0xFFFFFFFF;
  };
};

const seededShuffle = (arr, seed) => {
  const rng = seededRng(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function FlashcardsPage() {
  const { t } = useTranslation();
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const targetField = getTargetField();
  const nativeField = getNativeField();
  const [newFlashcard, setNewFlashcard] = useState({
    [targetField]: '',
    [nativeField]: '',
    romanization: '',
    category: ['vocabulary'],
    topic: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [deckScope, setDeckScope] = useState('all'); // 'all' | 'mine' | 'focus'
  const [addToFocus, setAddToFocus] = useState(false); // "Add to Focus" checkbox on the add form
  const [focusIds, setFocusIds] = useState(() => new Set()); // client source of truth for Focus membership
  const [randomCount, setRandomCount] = useState(10); // how many cards the "Study random" button picks
  const [showSubsetPicker, setShowSubsetPicker] = useState(false); // hand-pick cards from the current deck
  const [deckMenuOpen, setDeckMenuOpen] = useState(false); // scope dropdown (All / My Cards / Focus)
  const [studyMenuOpen, setStudyMenuOpen] = useState(false); // "Study random" dropdown (count + select cards)
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayMode, setDisplayMode] = useState('target');
  const [showsTargetFirst, setShowsTargetFirst] = useState(true);
  const [continuePrompt, setContinuePrompt] = useState(null);
  const [readyToSave, setReadyToSave] = useState(false);
  const [cardAnim, setCardAnim] = useState('');
  const [starPulse, setStarPulse] = useState(null); // 'up' or 'down'
  const [isShuffled, setIsShuffled] = useState(true); // default: shuffle ON
  const [autoPlay, setAutoPlay] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [studyStyle, setStudyStyle] = useState('both'); // 'both' | 'text' | 'audio'
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [categoryCardsCache, setCategoryCardsCache] = useState({});
  const [selectedCardIds, setSelectedCardIds] = useState(new Set()); // empty = study all
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCards, setTotalCards] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allCategories, setAllCategories] = useState([]); // from metadata endpoint
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [shuffleSeed, setShuffleSeed] = useState(null); // resolved from the 12h window on mount
  const [retryingTranslation, setRetryingTranslation] = useState(false);
  const autoPlayRef = useRef(false);
  const prefetchEndRef = useRef(0); // highest card index (exclusive) already queued for prefetch
  const requestedPageRef = useRef(1);
  const sidebarToggleRef = useRef(null);
  const landscapeSidebarRef = useRef(null);
  const originalOrderRef = useRef(null);
  const deckMenuRef = useRef(null);
  const studyMenuRef = useRef(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = localStorage.getItem('userId');
  const isGuest = localStorage.getItem('guestMode') === 'true';
  const saveTimerRef = useRef(null);
  const transitioningRef = useRef(false);
  const nativeLangCode = getNativeLangCode();
  const targetLangCode = getTargetLangCode();
  const seededTarget = String(searchParams.get('savedText') || '').trim();
  const seededNative = String(searchParams.get('nativeText') || '').trim();

  const saveActivityState = useCallback((index) => {
    if (!userId) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      userService.saveActivityState(userId, {
        activityType: 'flashcard',
        flashcardIndex: index,
      }).catch(err => console.error('Failed to save activity state:', err));
    }, 500);
  }, [userId]);

  // Resolve the shuffle seed for this session. The seed is held stable for 12h
  // (server-side for signed-in users so it follows them across devices,
  // localStorage for guests) so the deck order — and the resume position — stays
  // put across opens. force=true mints a fresh seed (manual reshuffle).
  const resolveShuffleSeed = useCallback(async (force = false) => {
    if (userId) {
      try {
        const res = force
          ? await userService.refreshFlashcardSeed(userId)
          : await userService.getFlashcardSeed(userId);
        if (res?.data?.seed) return res.data.seed;
      } catch (_) { /* fall back to local seed below */ }
    }
    const now = Date.now();
    const storedSeed = parseInt(localStorage.getItem('flashcardShuffleSeed'), 10);
    const storedAt = parseInt(localStorage.getItem('flashcardShuffleSeedAt'), 10);
    if (!force && storedSeed && storedAt && (now - storedAt) < SHUFFLE_SEED_TTL_MS) {
      return storedSeed;
    }
    const seed = Math.floor(Math.random() * 2147483646) + 1;
    localStorage.setItem('flashcardShuffleSeed', String(seed));
    localStorage.setItem('flashcardShuffleSeedAt', String(now));
    return seed;
  }, [userId]);

  useEffect(() => {
    // Fetch category metadata, then load cards with the 12h-stable seed.
    flashcardService.getCategories()
      .then(res => setAllCategories(res.data.categories || []))
      .catch(() => {});
    (async () => {
      const seed = await resolveShuffleSeed(false);
      setShuffleSeed(seed);
      fetchFlashcards(1, false, seed);
    })();
    if (userId) {
      flashcardService.getFocusIds()
        .then(res => setFocusIds(new Set(res.data.ids || [])))
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep focusIds in sync as cards load — any loaded card flagged focus joins the set.
  useEffect(() => {
    setFocusIds((prev) => {
      let changed = false;
      const next = new Set(prev);
      for (const c of flashcards) {
        if (c.focus && !next.has(c._id)) { next.add(c._id); changed = true; }
      }
      return changed ? next : prev;
    });
  }, [flashcards]);

  // Restore flashcard position from server or show continue prompt for lesson in progress
  useEffect(() => {
    if (!userId || flashcards.length === 0) {
      if (flashcards.length > 0) setReadyToSave(true);
      return;
    }
    userService.getActivityState(userId).then(res => {
      const state = res.data;
      if (state.activityType === 'flashcard' && state.flashcardIndex > 0) {
        setCurrentIndex(Math.min(state.flashcardIndex, flashcards.length - 1));
        setReadyToSave(true);
      } else if ((state.activityType === 'quiz' || state.activityType === 'lesson') && (state.quiz || state.lesson) && (state.quizIndex ?? state.lessonIndex ?? 0) > 0) {
        const savedQuiz = state.quiz || state.lesson;
        const savedQuizIndex = state.quizIndex ?? state.lessonIndex ?? 0;
        // Quiz in progress - show continue prompt (don't enable saving yet)
        setContinuePrompt({
          quizId: savedQuiz._id,
          quizTitle: savedQuiz.title || 'Untitled Quiz',
          quizIndex: savedQuizIndex,
          activityType: 'quiz',
        });
      } else {
        setReadyToSave(true);
      }
    }).catch(() => {
      setReadyToSave(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, flashcards.length]);

  // Save position on index change (only after activity state check completes)
  useEffect(() => {
    if (flashcards.length > 0 && readyToSave) {
      saveActivityState(currentIndex);
    }
  }, [currentIndex, flashcards.length, saveActivityState, readyToSave]);

  // Auto-load next batch when 49 cards remaining (after viewing 1st card of batch)
  useEffect(() => {
    if (!hasMore || loadingMore) return;
    const nextPage = currentPage + 1;
    if (
      flashcards.length > 0 &&
      currentIndex >= flashcards.length - 49 &&
      requestedPageRef.current < nextPage
    ) {
      requestedPageRef.current = nextPage;
      fetchFlashcards(nextPage, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, flashcards.length, hasMore, loadingMore]);

  // Keyboard navigation – use refs so the effect never needs to re-subscribe
  const handlePrevRef = useRef(null);
  const handleNextRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevRef.current?.();
      } else if (e.key === 'ArrowRight') {
        handleNextRef.current?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close the scope / study-random dropdowns when clicking outside them.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (deckMenuRef.current && !deckMenuRef.current.contains(e.target)) setDeckMenuOpen(false);
      if (studyMenuRef.current && !studyMenuRef.current.contains(e.target)) setStudyMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Only exclude cards missing the target field when the backend is actually
  // sending that field (i.e. at least one card has it).
  const targetLangField = getLangField(targetLangCode);
  const backendSendsTargetField = useMemo(
    () => flashcards.some(c => !!c[targetLangField]),
    [flashcards, targetLangField]
  );
  const allLangFilteredCards = useMemo(
    () => flashcards.filter(c => !backendSendsTargetField || !!c[targetLangField]),
    [flashcards, backendSendsTargetField, targetLangField]
  );
  // Study deck: supports three modes —
  //   • nothing selected → unfiltered paginated deck (language-filtered)
  //   • categories and/or individual cards selected → client-side mix from cache + loaded cards
  // Categories and individual cards can be combined freely.
  const activeFlashcards = useMemo(() => {
    if (selectedCardIds.size === 0 && selectedCategories.size === 0) return allLangFilteredCards;

    const loadedById = new Map(allLangFilteredCards.map(c => [c._id, c]));
    const cacheById = new Map();
    for (const cards of Object.values(categoryCardsCache)) {
      for (const c of cards) {
        if (!cacheById.has(c._id)) cacheById.set(c._id, c);
      }
    }

    const resultIds = new Set();
    const result = [];

    // Add all cards from selected categories (full data if loaded, minimal otherwise)
    for (const cat of selectedCategories) {
      const catCards = categoryCardsCache[cat] || [];
      for (const c of catCards) {
        if (!resultIds.has(c._id)) {
          const fullCard = loadedById.get(c._id) ?? { ...c, masteryLevel: 3, isDefault: true };
          if (fullCard[targetLangField]) {
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
        if (card && card[targetLangField]) {
          result.push(card);
          resultIds.add(id);
        }
      }
    }

    // The no-selection deck is already weighted-shuffled server-side. This
    // client-side category/selection deck isn't, so shuffle it here (seeded, so
    // the order stays stable within the 12h window) when shuffle is on.
    return isShuffled && shuffleSeed ? seededShuffle(result, shuffleSeed) : result;
  }, [allLangFilteredCards, categoryCardsCache, selectedCardIds, selectedCategories, targetLangField, isShuffled, shuffleSeed]);

  const lastSpokenCardRef = useRef(null);

  // Auto-speak the back text once when the card is flipped
  useEffect(() => {
    if (!isFlipped) return;
    if (studyStyle === 'text') return;
    if (!activeFlashcards[currentIndex]) return;
    const card = activeFlashcards[currentIndex];
    // Back face shows the opposite of front
    const text = showsTargetFirst
      ? card[getLangField(nativeLangCode)]   // front=target → back=native
      : card[getLangField(targetLangCode)];  // front=native → back=target
    const backLang = showsTargetFirst
      ? (LANGUAGES[nativeLangCode]?.ttsLocale)
      : (LANGUAGES[targetLangCode]?.ttsLocale);
    if (text) {
      speechService.cancel(); // stop any ongoing front-face speech before playing flip audio
      speechService.speak(text, { lang: backLang });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFlipped]);

  // Keep autoPlayRef in sync
  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  // Auto-play: automatically cycle through cards.
  // Uses speechService.waitAsync() instead of raw setTimeout so the silent
  // audio bridge keeps the media session alive when the browser is minimised.
  useEffect(() => {
    if (!autoPlay || activeFlashcards.length === 0 || !activeFlashcards[currentIndex]) return;
    // Auto-play requires audio — disable for text-only
    if (studyStyle === 'text') { setAutoPlay(false); return; }

    let cancelled = false;

    const autoPlayCard = async () => {
      const card = activeFlashcards[currentIndex];
      const frontText = showsTargetFirst ? card[getLangField(targetLangCode)] : card[getLangField(nativeLangCode)];
      const backText  = showsTargetFirst ? card[getLangField(nativeLangCode)] : card[getLangField(targetLangCode)];
      const frontLocale = showsTargetFirst ? LANGUAGES[targetLangCode]?.ttsLocale : LANGUAGES[nativeLangCode]?.ttsLocale;
      const backLocale  = showsTargetFirst ? LANGUAGES[nativeLangCode]?.ttsLocale : LANGUAGES[targetLangCode]?.ttsLocale;

      // Wait for slide-in to settle (audio-driven, works in background)
      await speechService.waitAudio(600);
      if (cancelled) return;

      // Speak front twice: target, target
      await speechService.speakAsync(frontText, { lang: frontLocale });
      if (cancelled) return;
      await speechService.waitAudio(400);
      if (cancelled) return;
      await speechService.speakAsync(frontText, { lang: frontLocale });
      if (cancelled) return;

      // 5 seconds for user to try and remember
      await speechService.waitAudio(5000);
      if (cancelled) return;

      // Speak front again: target
      await speechService.speakAsync(frontText, { lang: frontLocale });
      if (cancelled) return;

      // Flip and speak back: native
      await speechService.waitAudio(600);
      if (cancelled) return;
      setIsFlipped(true);
      await speechService.waitAudio(400);
      if (cancelled) return;
      if (backText) {
        await speechService.speakAsync(backText, { lang: backLocale });
        if (cancelled) return;
      }

      // Record the card as a hands-free recall so the XP decay timer resets
      // for engaged listeners. Per backend xpRewards.js: hands_free awards
      // 10% XP (currently 0 after floor) but still updates lastAnsweredAt
      // because the event is active.
      if (userId && card?._id) {
        userService.recordLearningEvent(userId, {
          eventType: 'flashcard_recall',
          flashcardId: card._id,
          mode: 'hands_free',
        }).catch(() => {});
      }

      // Pause before advancing — scale with text length for reading time
      const readingPause = Math.max(1500, (backText || '').split(/\s+/).length * 200);
      await speechService.waitAudio(readingPause);
      if (cancelled) return;

      // Check if last card (only stop if no more pages to load)
      if (currentIndex >= activeFlashcards.length - 1) {
        if (!hasMore) {
          setAutoPlay(false);
          return;
        }
        // Wait for next batch to load
        await new Promise(resolve => {
          const check = setInterval(() => {
            if (cancelled) { clearInterval(check); resolve(); }
            // activeFlashcards.length will update when new cards are appended
          }, 200);
          setTimeout(() => { clearInterval(check); resolve(); }, 5000); // timeout after 5s
        });
        if (cancelled) return;
      }

      // Slide to next card
      transitioningRef.current = true;
      setCardAnim('slide-out');
      await speechService.waitAudio(300);
      if (cancelled) return;

      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setShowsTargetFirst(determineCardDisplay());
      setCardAnim('slide-in');
      setTimeout(() => {
        setCardAnim('');
        transitioningRef.current = false;
      }, 400);
    };

    autoPlayCard();

    return () => {
      cancelled = true;
      speechService.cancel(); // also stops silent bridge
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, currentIndex]);

  // Reset index when card-selection filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    if (autoPlay) { setAutoPlay(false); speechService.cancel(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCardIds]);

  // Close sidebar on outside click
  useEffect(() => {
    if (!showSidebar) return;
    const handleClickOutside = (e) => {
      const insidePortrait = sidebarToggleRef.current?.contains(e.target);
      const insideLandscape = landscapeSidebarRef.current?.contains(e.target);
      if (!insidePortrait && !insideLandscape) {
        setShowSidebar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSidebar]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const fetchFlashcards = async (page = 1, append = false, seedOverride, scopeOverride) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      const opts = {
        shuffle: isShuffled,
        seed: seedOverride !== undefined ? seedOverride : shuffleSeed,
        scope: scopeOverride !== undefined ? scopeOverride : deckScope,
      };
      const response = userId
        ? await flashcardService.getFlashcards(userId, page, 50, opts)
        : await flashcardService.getGuestFlashcards(page, 50, opts);
      const { cards, total, hasMore: more, seed: returnedSeed } = response.data;
      // Store the seed returned by backend (in case none was sent)
      if (returnedSeed && !seedOverride) setShuffleSeed(returnedSeed);
      const seededCard = seededTarget ? {
        _id: `review-seed-${seededTarget}`,
        [getLangField(targetLangCode)]: seededTarget,
        [getLangField(nativeLangCode)]: seededNative,
        category: ['saved-review'],
        masteryLevel: 3,
        isDefault: false,
        isReviewSeed: true,
      } : null;
      if (append) {
        setFlashcards(prev => [...prev, ...cards]);
      } else {
        setFlashcards(seededCard
          ? [seededCard, ...cards.filter((card) => card[getLangField(targetLangCode)] !== seededTarget)]
          : cards);
        requestedPageRef.current = page;
        originalOrderRef.current = null;
      }
      setTotalCards(total);
      setHasMore(more);
      setCurrentPage(page);
      setError('');
    } catch (err) {
      setError(t('flashcards.failedToLoad'));
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Retry translation for the current card when backend returned _translationPending
  const retryTranslation = async () => {
    if (retryingTranslation || !current?._translationPending) return;
    setRetryingTranslation(true);
    try {
      const opts = { shuffle: false, seed: shuffleSeed };
      // Re-fetch just the current page — backend will re-attempt translation
      const response = userId
        ? await flashcardService.getFlashcards(userId, currentPage, 50, opts)
        : await flashcardService.getGuestFlashcards(currentPage, 50, opts);
      const { cards } = response.data;
      // Find the matching card and update its native field in-place
      const nativeFieldKey = getLangField(nativeLangCode);
      const updatedCard = cards.find(c => c._id === current._id);
      if (updatedCard && updatedCard[nativeFieldKey]) {
        setFlashcards(prev => prev.map(fc =>
          fc._id === current._id
            ? { ...fc, [nativeFieldKey]: updatedCard[nativeFieldKey], _translationPending: false }
            : fc
        ));
      }
    } catch (err) {
      console.error('Retry translation failed:', err);
    } finally {
      setRetryingTranslation(false);
    }
  };

  const handleSpeak = (text, lang) => {
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

  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    try {
      const mainCat = (newFlashcard.category[0] || 'vocabulary').trim();
      const topic = (newFlashcard.topic || '').trim();
      const category = topic ? [mainCat, topic] : [mainCat];
      const response = await flashcardService.createFlashcard({
        userId,
        [targetField]: newFlashcard[targetField],
        [nativeField]: newFlashcard[nativeField],
        romanization: newFlashcard.romanization,
        category,
        focus: addToFocus,
      });
      const created = response.data;
      // New cards are always the user's own, so they belong in All and My Cards;
      // they only belong in the Focus deck if the user opted in.
      const belongsInScope = deckScope !== 'focus' || created.focus;
      if (belongsInScope) setFlashcards(prev => [...prev, created]);
      setNewFlashcard({ [targetField]: '', [nativeField]: '', romanization: '', category: ['vocabulary'], topic: '' });
      setAddToFocus(false);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add flashcard');
      console.error(err);
    }
  };

  const determineCardDisplay = () => {
    if (displayMode === 'random') {
      return Math.random() < 0.5;
    }
    return displayMode === 'target';
  };

  // Build category → cards map once per deck update.
  const categoryCards = useMemo(() => {
    const map = {};
    flashcards.forEach(card => {
      const primary = normalizeCategory(card.category)[0];
      if (!map[primary]) map[primary] = { count: 0, cards: [] };
      map[primary].count++;
      map[primary].cards.push(card);
    });
    return map;
  }, [flashcards]);

  // Keep buildCategoryTree for form datalists (category/topic suggestions)
  const categoryTree = useMemo(() => {
    const tree = {};
    flashcards.forEach(card => {
      const cats = normalizeCategory(card.category);
      const primary = cats[0];
      if (!tree[primary]) tree[primary] = { count: 0, subtopics: {} };
      tree[primary].count++;
      cats.slice(1).forEach(tag => {
        tree[primary].subtopics[tag] = (tree[primary].subtopics[tag] || 0) + 1;
      });
    });
    return tree;
  }, [flashcards]);

  const sidebarCategories = useMemo(
    () => allCategories.length > 0
      ? allCategories
      : Object.entries(categoryCards).map(([name, data]) => ({ name, count: data.count })),
    [allCategories, categoryCards]
  );

  const toggleExpandedCategory = useCallback((cat) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      const willExpand = !next.has(cat);
      willExpand ? next.add(cat) : next.delete(cat);
      // Lazy-load all cards for this category when first expanded
      if (willExpand && !categoryCardsCache[cat]) {
        flashcardService.getCategoryCards(cat)
          .then(res => setCategoryCardsCache(p => ({ ...p, [cat]: res.data.cards || [] })))
          .catch(() => setCategoryCardsCache(p => ({ ...p, [cat]: [] })));
      }
      return next;
    });
  }, [categoryCardsCache]);


  // Toggle a category filter — loads cards into cache on first select (no backend refetch).
  // When ADDING a category, remove any individually selected cards that belong to it.
  const toggleCategoryFilter = useCallback((categoryName) => {
    const isRemoving = selectedCategories.has(categoryName);
    setSelectedCategories(prev => {
      const next = new Set(prev);
      isRemoving ? next.delete(categoryName) : next.add(categoryName);
      return next;
    });
    if (!isRemoving) {
      // Background-load cache if not already there
      if (!categoryCardsCache[categoryName]) {
        flashcardService.getCategoryCards(categoryName)
          .then(res => setCategoryCardsCache(p => ({ ...p, [categoryName]: res.data.cards || [] })))
          .catch(() => setCategoryCardsCache(p => ({ ...p, [categoryName]: [] })));
      }
      // Deselect any individually selected cards that belong to this category
      const catCards = categoryCardsCache[categoryName]
        || categoryCards[categoryName]?.cards
        || [];
      if (catCards.length > 0) {
        const catCardIds = new Set(catCards.map(c => c._id));
        setSelectedCardIds(prev => new Set([...prev].filter(id => !catCardIds.has(id))));
      }
    }
  }, [categoryCards, categoryCardsCache, selectedCategories]);

  // Reset card position when category selection changes (no API refetch — deck is computed client-side)
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    if (autoPlay) { setAutoPlay(false); speechService.cancel(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  // Auto-speak the front text twice when a new card appears (manual mode only)
  useEffect(() => {
    if (autoPlayRef.current) return; // auto-play handles its own speaking
    if (studyStyle === 'text') return; // text-only, no auto-speak
    if (activeFlashcards.length === 0 || !activeFlashcards[currentIndex]) return;
    const card = activeFlashcards[currentIndex];
    const cardId = card._id + '|' + currentIndex;
    // Skip if we already spoke this exact card (prevents re-renders from re-triggering)
    if (lastSpokenCardRef.current === cardId) return;
    lastSpokenCardRef.current = cardId;

    const text = showsTargetFirst
      ? card[getLangField(targetLangCode)]
      : card[getLangField(nativeLangCode)];
    const frontLang = showsTargetFirst
      ? (LANGUAGES[targetLangCode]?.ttsLocale)
      : (LANGUAGES[nativeLangCode]?.ttsLocale);

    // Small delay to let slide-in animation settle
    const timer = setTimeout(() => {
      speechService.speakRepeat(text, 2, { lang: frontLang });
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, activeFlashcards.length, studyStyle, showsTargetFirst]);

  // Reset index when the filtered deck shrinks and currentIndex is now out of bounds
  useEffect(() => {
    if (activeFlashcards.length > 0 && currentIndex >= activeFlashcards.length) {
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFlashcards.length]);

  // Media Session: show lock-screen controls when autoplay is active
  useEffect(() => {
    if (!autoPlay || activeFlashcards.length === 0) {
      speechService.clearMediaSession();
      return;
    }
    const card = activeFlashcards[currentIndex];
    if (!card) return;

    speechService.setMediaSession({
      title: card[getLangField(targetLangCode)],
      artist: t('flashcards.cardXOfY', { current: currentIndex + 1, total: (selectedCategories.size > 0 || selectedCardIds.size > 0) ? activeFlashcards.length : (totalCards || activeFlashcards.length) }),
      album: 'Lingo Booth \u2014 Flashcards',
      onPlay: () => setAutoPlay(true),
      onPause: () => { setAutoPlay(false); speechService.cancel(); },
      onNextTrack: () => {
        if (currentIndex < activeFlashcards.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setIsFlipped(false);
        }
      },
      onPrevTrack: () => {
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
          setIsFlipped(false);
        }
      },
    });

    return () => speechService.clearMediaSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, currentIndex, activeFlashcards.length]);

  // Rolling pre-fetch: at card N, cache N+1..N+50 so autoplay works with screen locked.
  // Re-triggers on every card advance; skips work when the lookahead window is still full.
  useEffect(() => {
    if (!autoPlay) {
      prefetchEndRef.current = 0;
      speechService.clearBlobCache();
      return;
    }
    if (activeFlashcards.length === 0) return;

    // Only kick off a new prefetch batch when within 10 cards of the cached window end
    if (currentIndex + 10 < prefetchEndRef.current) return;

    const start = currentIndex + 1;
    const end = Math.min(currentIndex + 51, activeFlashcards.length);
    prefetchEndRef.current = end;

    const cardsToCache = activeFlashcards.slice(start, end);
    speechService.prefetchCards(cardsToCache, showsTargetFirst, targetLangCode, nativeLangCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, currentIndex]); // re-check on every card advance for rolling window

  const handleNext = async () => {
    if (transitioningRef.current || currentIndex >= activeFlashcards.length - 1) return;
    if (autoPlay) { setAutoPlay(false); speechService.cancel(); return; }
    transitioningRef.current = true;

    const card = activeFlashcards[currentIndex];
    // If not already flipped, flip to reveal the other side
    if (!isFlipped) {
      setIsFlipped(true);
    }

    // Speak the hidden side and wait for it to finish
    // (minimum 800ms so the flip animation is visible)
    const textToSpeak = showsTargetFirst ? card[getLangField(nativeLangCode)] : card[getLangField(targetLangCode)];
    const speakLocale  = showsTargetFirst ? LANGUAGES[nativeLangCode]?.ttsLocale : LANGUAGES[targetLangCode]?.ttsLocale;
    if (studyStyle === 'text') {
      await new Promise(resolve => setTimeout(resolve, 800));
    } else {
      await Promise.all([
        speechService.speakAsync(textToSpeak, { lang: speakLocale }),
        new Promise(resolve => setTimeout(resolve, 800)),
      ]);
    }

    // Now slide out and move to next card
    setCardAnim('slide-out');
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowsTargetFirst(determineCardDisplay());
      setCardAnim('slide-in');
      setTimeout(() => {
        setCardAnim('');
        transitioningRef.current = false;
      }, 400);
    }, 300);
  };

  const handlePrev = () => {
    if (transitioningRef.current || currentIndex <= 0) return;
    if (autoPlay) { setAutoPlay(false); speechService.cancel(); return; }
    transitioningRef.current = true;
    setCardAnim('slide-out-right');
    setTimeout(() => {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setShowsTargetFirst(determineCardDisplay());
      setCardAnim('slide-in-left');
      setTimeout(() => {
        setCardAnim('');
        transitioningRef.current = false;
      }, 400);
    }, 300);
  };

  // Keep keyboard-navigation refs in sync with latest handlers
  handleNextRef.current = handleNext;
  handlePrevRef.current = handlePrev;

  const mergeUpdatedCard = (flashcard, updatedFields = {}) => {
    setFlashcards(prev => prev.map(fc =>
      fc._id === flashcard._id ? { ...fc, ...updatedFields } : fc
    ));
  };

  const clampMasteryLevel = (level) => Math.max(1, Math.min(5, Number(level) || 3));

  const persistFlashcardReview = async (flashcard, payload) => {
    if (!userId || flashcard?.isReviewSeed) return null;
    const response = await flashcardService.updateFlashcard(flashcard._id, {
      ...payload,
      nativeLang: nativeLangCode,
    });
    return response.data || null;
  };

  // Fade — user knows this card, increase mastery (stay on card)
  const handleCorrect = async () => {
    try {
      const flashcard = activeFlashcards[currentIndex];
      const currentLevel = clampMasteryLevel(flashcard.masteryLevel);

      let serverCard = null;
      if (userId) {
        serverCard = await persistFlashcardReview(flashcard, { isCorrect: true });
        await progressService.recordProgress({
          userId,
          skillType: 'reading',
          category: normalizeCategory(flashcard.category)[0],
          score: 80,
          isCorrect: true,
        });
        userService.recordLearningEvent(userId, {
          eventType: 'flashcard_recall',
          flashcardId: flashcard._id,
          mode: autoPlay ? 'hands_free' : 'manual',
        }).catch(() => {});
      } else if (isGuest) {
        guestXPHelper.add(1);
        guestActivityTracker.trackCard(true);
      }

      const updatedFlashcards = flashcards.map(fc =>
        fc._id === flashcard._id ? {
          ...fc,
          correctCount: (fc.correctCount || 0) + 1,
          masteryLevel: Math.min(currentLevel + 1, 5),
          ...(serverCard || {}),
        } : fc
      );
      setFlashcards(updatedFlashcards);
      setStarPulse('up');
      setTimeout(() => setStarPulse(null), 600);
    } catch (err) {
      setError(t('flashcards.failedToRecord', 'Could not save this review yet.'));
      console.error('Error:', err);
    }
  };

  // Boost — user needs more practice, decrease mastery (stay on card)
  const handleIncorrect = async () => {
    try {
      const flashcard = activeFlashcards[currentIndex];
      const currentLevel = clampMasteryLevel(flashcard.masteryLevel);

      const isDefaultCard = flashcard.isDefault === true;

      let serverCard = null;
      if (userId) {
        serverCard = await persistFlashcardReview(flashcard, { isCorrect: false });
        if (!isDefaultCard) {
          await progressService.recordProgress({
            userId,
            skillType: 'reading',
            category: normalizeCategory(flashcard.category)[0],
            score: 40,
            isCorrect: false,
          });
        }
      } else if (isGuest) {
        guestActivityTracker.trackCard(false);
      }

      const updatedFlashcards = flashcards.map(fc =>
        fc._id === flashcard._id ? {
          ...fc,
          incorrectCount: (fc.incorrectCount || 0) + 1,
          masteryLevel: Math.max(currentLevel - 1, 1),
          ...(serverCard || {}),
        } : fc
      );
      setFlashcards(updatedFlashcards);
      setStarPulse('down');
      setTimeout(() => setStarPulse(null), 600);
    } catch (err) {
      setError(t('flashcards.failedToRecord', 'Could not save this review yet.'));
      console.error('Error:', err);
    }
  };

  const handleMasteryRating = async (level) => {
    const flashcard = activeFlashcards[currentIndex];
    if (!flashcard) return;

    const masteryLevel = clampMasteryLevel(level);
    const previousLevel = clampMasteryLevel(flashcard.masteryLevel);
    mergeUpdatedCard(flashcard, { masteryLevel });
    setStarPulse(masteryLevel >= previousLevel ? 'up' : 'down');
    setTimeout(() => setStarPulse(null), 600);

    try {
      const serverCard = await persistFlashcardReview(flashcard, { masteryLevel });
      if (serverCard) {
        mergeUpdatedCard(flashcard, serverCard);
      }
    } catch (err) {
      setError(t('flashcards.failedToRecord', 'Could not save this review yet.'));
      mergeUpdatedCard(flashcard, { masteryLevel: previousLevel });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('flashcards.deleteConfirm'))) return;
    try {
      await flashcardService.deleteFlashcard(id);
      setFlashcards(flashcards.filter((fc) => fc._id !== id));
      if (currentIndex >= activeFlashcards.length - 1 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    } catch (err) {
      setError(t('flashcards.failedToDelete'));
    }
  };

  // --- Focus deck (per language pair) ---
  // Switch the loaded deck between all cards, only the user's own cards, and
  // the Focus deck. Scope filtering happens server-side, so we refetch page 1.
  const changeDeckScope = (scope) => {
    if (scope === deckScope) return;
    setDeckScope(scope);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedCategories(new Set());
    setSelectedCardIds(new Set());
    requestedPageRef.current = 1;
    fetchFlashcards(1, false, undefined, scope);
  };

  // Single entry point for all Focus add/remove (current card, bulk, per-item).
  // Updates focusIds (display source of truth) + loaded card.focus, then persists.
  const applyFocus = async (ids, value) => {
    const list = (Array.isArray(ids) ? ids : [ids]).filter(Boolean);
    if (!userId || list.length === 0) return;
    const idSet = new Set(list);
    setFocusIds((prev) => {
      const next = new Set(prev);
      list.forEach(id => (value ? next.add(id) : next.delete(id)));
      return next;
    });
    setFlashcards(prev => prev.map(fc => (idSet.has(fc._id) ? { ...fc, focus: value } : fc)));
    try {
      await Promise.all(list.map(id => flashcardService.setCardFocus(id, value)));
      // Removing from Focus while viewing the Focus deck → drop them from view.
      if (!value && deckScope === 'focus') {
        setFlashcards(prev => prev.filter(fc => !idSet.has(fc._id)));
      }
    } catch (err) {
      setFocusIds((prev) => {
        const next = new Set(prev);
        list.forEach(id => (value ? next.delete(id) : next.add(id)));
        return next;
      });
      setFlashcards(prev => prev.map(fc => (idSet.has(fc._id) ? { ...fc, focus: !value } : fc)));
      setError(t('flashcards.focusFailed', 'Could not update your Focus deck.'));
    }
  };

  const toggleFocusCurrent = () => {
    if (!current || current.isReviewSeed) return;
    applyFocus([current._id], !focusIds.has(current._id));
  };

  const setFocusForSelected = (value) => applyFocus(Array.from(selectedCardIds), value);

  // --- Study a subset of the current deck (random pick or hand-picked) ---
  // Both funnel into selectedCardIds, which activeFlashcards already narrows to.
  const studyRandomSubset = () => {
    const pool = allLangFilteredCards.filter(c => !c.isReviewSeed);
    if (pool.length === 0) return;
    const n = Math.max(1, Math.min(Math.floor(Number(randomCount) || 10), pool.length));
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setSelectedCategories(new Set());
    setSelectedCardIds(new Set(shuffled.slice(0, n).map(c => c._id)));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const toggleSubsetCard = (id) => {
    setSelectedCategories(new Set());
    setSelectedCardIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const clearSubset = () => {
    setSelectedCardIds(new Set());
    setSelectedCategories(new Set());
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // One card row in an expanded category: selectable for study + a Focus star.
  const renderSubtopicCard = (card, primary) => {
    const isChecked = selectedCardIds.has(card._id);
    const isFocused = focusIds.has(card._id);
    const target = card[getLangField(targetLangCode)];
    const native = card[getLangField(nativeLangCode)];
    return (
      <div key={card._id} className={`subtopic-item ${isChecked ? 'selected' : ''}`}>
        <button
          type="button"
          className="subtopic-select"
          onClick={() => {
            const adding = !selectedCardIds.has(card._id);
            setSelectedCardIds((prev) => {
              const next = new Set(prev);
              if (next.has(card._id)) next.delete(card._id); else next.add(card._id);
              return next;
            });
            if (adding) setSelectedCategories((prev) => { const next = new Set(prev); next.delete(primary); return next; });
          }}
        >
          <span className="category-check">{isChecked ? '✓' : ''}</span>
          <span className="category-name">
            {target || native}
            {native && target && <span className="subtopic-native"> — {native}</span>}
          </span>
        </button>
        {!isGuest && userId && (
          <button
            type="button"
            className={`subtopic-focus-btn ${isFocused ? 'active' : ''}`}
            aria-pressed={isFocused}
            onClick={() => applyFocus([card._id], !isFocused)}
          >
            {isFocused ? t('flashcards.removeFromFocus', 'Remove from Focus') : t('flashcards.addToFocus', 'Add to Focus')}
          </button>
        )}
      </div>
    );
  };

  const saveCurrentForReview = async () => {
    if (!userId || !current) return;
    try {
      await learningHubService.saveItem({
        itemType: 'word',
        targetText: displayTarget,
        nativeText: displayNative,
        romanization: current.officialPronunciation || current.romanization || current.pronunciation || '',
        sourceType: 'flashcard',
        sourceRef: current._id,
        sourceLabel: normalizeCategory(current.category).join(', '),
        reason: t('flashcards.savedReason', 'Saved from flashcards for later practice.'),
        metadata: { route: '/flashcards' },
      });
    } catch (_) {}
  };

  const bookmarkCurrent = async () => {
    if (!userId || !current) return;
    try {
      await learningHubService.saveItem({
        itemType: 'bookmark',
        targetText: displayTarget,
        nativeText: displayNative,
        romanization: current.officialPronunciation || current.romanization || current.pronunciation || '',
        sourceType: 'flashcard',
        sourceRef: current._id,
        sourceLabel: normalizeCategory(current.category).join(', '),
        reason: t('flashcards.bookmarkedReason', 'Bookmarked from flashcards.'),
        metadata: { route: '/flashcards' },
      });
    } catch (_) {}
  };

  const askTutorAboutCurrent = () => {
    if (!displayTarget) return;
    const prompt = t('learningHub.askTutorPrompt', {
      text: displayTarget,
      defaultValue: 'Help me practice "{{text}}".',
    });
    navigate(`/conversation?prompt=${encodeURIComponent(prompt)}`);
  };

  const writeCurrent = () => {
    if (!displayTarget) return;
    const params = new URLSearchParams({
      savedText: displayTarget,
      nativeText: displayNative || '',
      level: String(current?.learningLevel || current?.firstIntroducedLevel || ''),
    });
    navigate(`/writing?${params.toString()}`);
  };

  const selfTestCurrent = async () => {
    if (!userId || !current || !displayTarget) return;
    try {
      const response = await learningHubService.saveItem({
        itemType: 'word',
        targetText: displayTarget,
        nativeText: displayNative,
        romanization: current.officialPronunciation || current.romanization || current.pronunciation || '',
        sourceType: 'flashcard',
        sourceRef: current._id,
        sourceLabel: normalizeCategory(current.category).join(', '),
        reason: t('flashcards.selfTestReason', 'Saved from flashcards for a quick self-test.'),
        metadata: { route: '/flashcards' },
      });
      navigate('/review', { state: { quickQuizItem: response.data } });
    } catch (_) {}
  };

  const getMasteryStars = (level, animated = false, interactive = false) => {
    const safeLevel = clampMasteryLevel(level);
    return Array.from({ length: 5 }, (_, i) => {
      const starLevel = i + 1;
      const filled = starLevel <= safeLevel;
      // Highlight the star that just changed
      const isChangingStar = animated && starPulse && (
        (starPulse === 'up' && starLevel === safeLevel) ||
        (starPulse === 'down' && starLevel === safeLevel + 1)
      );
      const star = (
        <span
          className={`mastery-star ${filled ? 'star-filled' : 'star-empty'}${isChangingStar ? ' star-pulse' : ''}`}
          aria-hidden="true"
        >
          {filled ? '★' : '☆'}
        </span>
      );
      if (!interactive) return <span key={starLevel}>{star}</span>;
      return (
        <button
          type="button"
          key={starLevel}
          className="mastery-star-button"
          onClick={() => handleMasteryRating(starLevel)}
          aria-label={t('flashcards.setFamiliarityLevel', {
            level: starLevel,
            defaultValue: 'Set familiarity to {{level}}',
          })}
        >
          {star}
        </button>
      );
    });
  };

  const handleContinueExisting = () => {
    navigate(`/quiz/${continuePrompt.quizId}`);
    setContinuePrompt(null);
  };

  const handleStartNew = async () => {
    if (userId) {
      await userService.saveActivityState(userId, {
        activityType: 'flashcard',
        flashcardIndex: 0,
      }).catch(() => {});
    }
    setContinuePrompt(null);
    setReadyToSave(true);
  };

  if (loading) {
    return <div className="loading">{t('flashcards.loadingFlashcards')}</div>;
  }

  const current = activeFlashcards[currentIndex];
  // Word to learn (front of card) — uses the selected target language field
  const displayTarget = current
    ? current[getLangField(targetLangCode)] || ''
    : '';
  // Meaning/translation (back of card) — uses the selected native language field
  const displayNative = current
    ? current[getLangField(nativeLangCode)] || ''
    : '';
  // True when the backend couldn't translate this card's native field
  const translationPending = current?._translationPending && !displayNative;
  // TTS locale strings for explicit language passing to speechService
  const targetTtsLocale = LANGUAGES[targetLangCode]?.ttsLocale;
  const nativeTtsLocale = LANGUAGES[nativeLangCode]?.ttsLocale;

  if (!loading && activeFlashcards.length > 0 && !current) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  // Category selected but cache still loading — show spinner instead of crashing
  if (!loading && activeFlashcards.length === 0 && (selectedCategories.size > 0 || selectedCardIds.size > 0)) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  // Segmented control to switch the loaded deck (logged-in users only).
  const deckScopeOptions = [
    { id: 'all', label: t('flashcards.deckAll', 'All') },
    { id: 'mine', label: t('flashcards.deckMine', 'My Cards') },
    { id: 'focus', label: t('flashcards.deckFocus', 'Focus') },
  ];
  const currentScopeLabel = deckScopeOptions.find(o => o.id === deckScope)?.label || deckScopeOptions[0].label;
  const deckSwitcher = (!isGuest && userId) ? (
    <div className="deck-scope-dropdown" ref={deckMenuRef}>
      <button
        type="button"
        className="deck-scope-trigger"
        aria-haspopup="listbox"
        aria-expanded={deckMenuOpen}
        aria-label={t('flashcards.deckScopeLabel', 'Which cards to study')}
        onClick={() => setDeckMenuOpen(o => !o)}
      >
        <span>{currentScopeLabel}</span>
        <span className="dropdown-caret" aria-hidden="true">▾</span>
      </button>
      {deckMenuOpen && (
        <div className="deck-scope-menu" role="listbox">
          {deckScopeOptions.map(opt => (
            <button
              key={opt.id}
              type="button"
              role="option"
              aria-selected={deckScope === opt.id}
              className={`deck-scope-option ${deckScope === opt.id ? 'active' : ''}`}
              onClick={() => { changeDeckScope(opt.id); setDeckMenuOpen(false); }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  ) : null;

  return (
    <div className="flashcards-container">
      {continuePrompt && (
        <div className="continue-modal-overlay">
          <div className="continue-modal">
            <h3>{t('flashcards.activityInProgress')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('flashcards.lessonInProgress', { title: continuePrompt.quizTitle, index: continuePrompt.quizIndex + 1 }) }} />
            <div className="continue-modal-actions">
              <button className="btn btn-primary" onClick={handleContinueExisting}>
                {t('flashcards.continueLesson')}
              </button>
              <button className="btn btn-secondary" onClick={handleStartNew}>
                {t('flashcards.startFlashcards')}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        {flashcards.length === 0 ? (
          <>
            {/* Header — empty state */}
            <div className="flashcards-header">
              <div className="header-content">
                <h1>
                  {t('flashcards.title').split('<1>')[0]}
                  <span className="text-accent">
                    {t('flashcards.title').match(/<1>(.*?)<\/1>/)?.[1] || ''}
                  </span>
                </h1>
              </div>
              <div className="header-actions">
                {deckSwitcher}
                {!isGuest && (
                  <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? t('common.cancel') : `+ ${t('flashcards.addFlashcard')}`}
                  </button>
                )}
              </div>
            </div>

            {error && <div className="error">{error}</div>}

            {showForm && (
              <div className="add-flashcard-form card">
                <h2>{t('flashcards.addNewFlashcard')}</h2>
                <form onSubmit={handleAddFlashcard}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('flashcards.targetLang', { language: t(`languages.${getTargetLangCode()}`, getTargetLangName()) })}</label>
                      <input type="text" placeholder={t('flashcards.targetLang', { language: t(`languages.${getTargetLangCode()}`, getTargetLangName()) })} value={newFlashcard[targetField] || ''}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, [targetField]: e.target.value })} required />
                    </div>
                    {targetLangHasRomanization() && (
                    <div className="form-group">
                      <label>{t('flashcards.pronunciation')}</label>
                      <input type="text" placeholder={t('flashcards.pronunciation')} value={newFlashcard.romanization}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, romanization: e.target.value })} />
                    </div>
                    )}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('flashcards.nativeLang', { language: t(`languages.${getNativeLangCode()}`, getNativeLangName()) })}</label>
                      <input type="text" placeholder={t('flashcards.nativeLang', { language: t(`languages.${getNativeLangCode()}`, getNativeLangName()) })} value={newFlashcard[nativeField] || ''}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, [nativeField]: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>{t('flashcards.categoryLabel')}</label>
                      <input
                        type="text"
                        list="category-suggestions"
                        placeholder={t('flashcards.categoryPlaceholder', 'numbers, time, vocabulary...')}
                        value={newFlashcard.category[0] || ''}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, category: [e.target.value] })}
                      />
                      <datalist id="category-suggestions">
                        {Object.keys(categoryTree).map(cat => <option key={cat} value={cat} />)}
                      </datalist>
                    </div>
                    <div className="form-group">
                      <label>{t('flashcards.topicLabel', 'Topic (optional)')}</label>
                      <input
                        type="text"
                        list="topic-suggestions"
                        placeholder={t('flashcards.topicPlaceholder', 'days-of-week, 1-10, months...')}
                        value={newFlashcard.topic || ''}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, topic: e.target.value })}
                      />
                      <datalist id="topic-suggestions">
                        {newFlashcard.category[0] && categoryTree[newFlashcard.category[0]]
                          ? Object.keys(categoryTree[newFlashcard.category[0]].subtopics).map(t => <option key={t} value={t} />)
                          : null}
                      </datalist>
                    </div>
                  </div>
                  <label className="add-focus-toggle">
                    <input type="checkbox" checked={addToFocus} onChange={(e) => setAddToFocus(e.target.checked)} />
                    {t('flashcards.addToFocusOnCreate', 'Add to my Focus deck')}
                  </label>
                  <button type="submit" className="btn btn-success">{t('flashcards.addFlashcard')}</button>
                </form>
              </div>
            )}

            <div className="empty-state">
              <div className="empty-state-icon">{deckScope === 'focus' ? '⭐' : '🎴'}</div>
              <h3>
                {deckScope === 'focus'
                  ? t('flashcards.focusEmptyTitle', 'Your Focus deck is empty')
                  : deckScope === 'mine'
                    ? t('flashcards.mineEmptyTitle', "You haven't added any cards yet")
                    : t('flashcards.noFlashcards')}
              </h3>
              <p>
                {deckScope === 'focus'
                  ? t('flashcards.focusEmptyHint', 'Add cards to Focus from any flashcard to study them intensively here.')
                  : deckScope === 'mine'
                    ? t('flashcards.mineEmptyHint', 'Cards you create will appear here.')
                    : t('flashcards.createFirst')}
              </p>
              <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                {t('flashcards.create')}
              </button>
            </div>
          </>
        ) : (
          <div className="flashcard-page-grid">
            {/* Left panel: header + controls */}
            <div className="fc-header-area">
              <div className="flashcards-header">
                <div className="header-content">
                  <h1>
                    {t('flashcards.title').split('<1>')[0]}
                    <span className="text-accent">
                      {t('flashcards.title').match(/<1>(.*?)<\/1>/)?.[1] || ''}
                    </span>
                  </h1>
                </div>
                <div className="header-actions">
                  {deckSwitcher}
                  <button
                    className={`header-tool-btn ${isShuffled ? 'active' : ''}`}
                    title={t('flashcards.shuffle')}
                    onClick={() => {
                      if (transitioningRef.current) return;
                      transitioningRef.current = true;
                      setCardAnim('shuffle');
                      setTimeout(async () => {
                        const newShuffled = !isShuffled;
                        setIsShuffled(newShuffled);
                        // Turning shuffle on is a manual reshuffle: mint a fresh
                        // seed and restart the 12h window. Turning it off keeps
                        // the current seed (deck is shown in order anyway).
                        const newSeed = newShuffled ? await resolveShuffleSeed(true) : shuffleSeed;
                        setShuffleSeed(newSeed);
                        setCurrentIndex(0);
                        setIsFlipped(false);
                        // Refetch from backend with new shuffle state
                        await fetchFlashcards(1, false, newSeed);
                        setCardAnim('slide-in');
                        setTimeout(() => {
                          setCardAnim('');
                          transitioningRef.current = false;
                        }, 400);
                      }, 400);
                    }}
                  >
                    <span className="tool-icon">🔀</span>
                    <span className="tool-label">{t('flashcards.shuffle')}</span>
                  </button>
                  <button
                    className={`header-tool-btn ${autoPlay ? 'active' : ''}`}
                    title={autoPlay ? t('flashcards.stop') : t('flashcards.autoPlay')}
                    onClick={() => {
                      if (autoPlay) {
                        setAutoPlay(false);
                        speechService.cancel();
                      } else {
                        setAutoPlay(true);
                      }
                    }}
                  >
                    <span className="tool-icon">{autoPlay ? '⏹' : '▶'}</span>
                    <span className="tool-label">{autoPlay ? t('flashcards.stop') : t('flashcards.autoPlay')}</span>
                  </button>
                  {!isGuest && (
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                      {showForm ? t('common.cancel') : `+ ${t('flashcards.addFlashcard')}`}
                    </button>
                  )}
                </div>
              </div>

              {error && <div className="error">{error}</div>}

              {showForm && (
                <div className="add-flashcard-form card">
                  <h2>{t('flashcards.addNewFlashcard')}</h2>
                  <form onSubmit={handleAddFlashcard}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>{t('flashcards.targetLang', { language: t(`languages.${getTargetLangCode()}`, getTargetLangName()) })}</label>
                        <input type="text" placeholder={t('flashcards.targetLang', { language: t(`languages.${getTargetLangCode()}`, getTargetLangName()) })} value={newFlashcard[targetField] || ''}
                          onChange={(e) => setNewFlashcard({ ...newFlashcard, [targetField]: e.target.value })} required />
                      </div>
                      {targetLangHasRomanization() && (
                      <div className="form-group">
                        <label>{t('flashcards.pronunciation')}</label>
                        <input type="text" placeholder={t('flashcards.pronunciation')} value={newFlashcard.romanization}
                          onChange={(e) => setNewFlashcard({ ...newFlashcard, romanization: e.target.value })} />
                      </div>
                      )}
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>{t('flashcards.nativeLang', { language: t(`languages.${getNativeLangCode()}`, getNativeLangName()) })}</label>
                        <input type="text" placeholder={t('flashcards.nativeLang', { language: t(`languages.${getNativeLangCode()}`, getNativeLangName()) })} value={newFlashcard[nativeField] || ''}
                          onChange={(e) => setNewFlashcard({ ...newFlashcard, [nativeField]: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <label>{t('flashcards.categoryLabel')}</label>
                        <input type="text" placeholder={t('flashcards.categorySimplePlaceholder', 'vocabulary, verbs')} value={newFlashcard.category.join(', ')}
                          onChange={(e) => setNewFlashcard({ ...newFlashcard,
                            category: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
                      </div>
                    </div>
                    <label className="add-focus-toggle">
                      <input type="checkbox" checked={addToFocus} onChange={(e) => setAddToFocus(e.target.checked)} />
                      {t('flashcards.addToFocusOnCreate', 'Add to my Focus deck')}
                    </label>
                    <button type="submit" className="btn btn-success">{t('flashcards.addFlashcard')}</button>
                  </form>
                </div>
              )}

              {/* Study a subset: random pick or hand-picked cards (works in every scope) */}
              <div className="study-subset-bar">
                <div className="study-random-dropdown" ref={studyMenuRef}>
                  <div className="split-button">
                    <button
                      type="button"
                      className="header-tool-btn split-button-main"
                      onClick={() => { studyRandomSubset(); setStudyMenuOpen(false); }}
                      title={t('flashcards.studyRandomTitle', 'Study a random set of cards')}
                    >
                      <span className="tool-icon">🎲</span>
                      <span className="tool-label">{t('flashcards.studyRandom', 'Study random')}</span>
                    </button>
                    <button
                      type="button"
                      className={`header-tool-btn split-button-caret ${studyMenuOpen ? 'active' : ''}`}
                      aria-haspopup="true"
                      aria-expanded={studyMenuOpen}
                      aria-label={t('flashcards.studyRandomOptions', 'Study random options')}
                      onClick={() => setStudyMenuOpen(o => !o)}
                    >
                      <span className="dropdown-caret" aria-hidden="true">▾</span>
                    </button>
                  </div>
                  {studyMenuOpen && (
                    <div className="study-random-menu">
                      <label className="study-random-count">
                        {t('flashcards.randomCountLabel', 'How many cards to study')}
                        <input
                          type="number"
                          className="subset-count-input"
                          min="1"
                          value={randomCount}
                          onChange={(e) => setRandomCount(e.target.value)}
                        />
                      </label>
                      <button
                        type="button"
                        className="btn btn-success study-random-go"
                        onClick={() => { studyRandomSubset(); setStudyMenuOpen(false); }}
                      >
                        {t('flashcards.studyNRandom', { count: Math.max(1, Math.floor(Number(randomCount) || 10)), defaultValue: 'Study {{count}} random' })}
                      </button>
                      <button
                        type="button"
                        className="study-random-select"
                        onClick={() => { setShowSubsetPicker(v => !v); setStudyMenuOpen(false); }}
                      >
                        ☑ {t('flashcards.selectCards', 'Select cards')}
                      </button>
                    </div>
                  )}
                </div>
                {(selectedCardIds.size > 0 || selectedCategories.size > 0) && (
                  <>
                    <span className="subset-status">
                      {t('flashcards.studyingSubset', { count: activeFlashcards.length, defaultValue: 'Studying {{count}}' })}
                    </span>
                    <button className="category-clear" onClick={clearSubset}>
                      {t('flashcards.studyAll', 'Study all')}
                    </button>
                  </>
                )}
              </div>
              {showSubsetPicker && (
                <div className="subset-picker">
                  {allLangFilteredCards.filter(c => !c.isReviewSeed).length === 0 ? (
                    <span className="card-list-hint">{t('flashcards.noCardsToPick', 'No cards to pick from yet.')}</span>
                  ) : (
                    allLangFilteredCards.filter(c => !c.isReviewSeed).map((card) => {
                      const checked = selectedCardIds.has(card._id);
                      const label = card[getLangField(targetLangCode)] || card[getLangField(nativeLangCode)] || '';
                      return (
                        <button
                          key={card._id}
                          type="button"
                          className={`subset-pick-item ${checked ? 'selected' : ''}`}
                          onClick={() => toggleSubsetCard(card._id)}
                        >
                          <span className="subset-pick-check">{checked ? '✓' : ''}</span>
                          <span className="subset-pick-text">{label}</span>
                          {focusIds.has(card._id) && <span className="subset-pick-focus">{t('flashcards.focusBadge', 'Focus')}</span>}
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Landscape controls: grid child in left column */}
            <div className="study-controls-landscape">
              <div className="study-progress">
                <div className="progress-text">
                  <span>{t('flashcards.cardXOfY', { current: currentIndex + 1, total: (selectedCategories.size > 0 || selectedCardIds.size > 0) ? activeFlashcards.length : (totalCards || activeFlashcards.length) })}</span>
                  <span className="mastery-display">
                    <span className="mastery-label">{t('flashcards.familiarity', 'Familiarity')}</span>
                    {getMasteryStars(current?.masteryLevel, true, true)}
                  </span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill"
                    style={{ width: `${((currentIndex + 1) / ((selectedCategories.size > 0 || selectedCardIds.size > 0) ? activeFlashcards.length : (totalCards || activeFlashcards.length))) * 100}%`, background: 'var(--accent-green)' }}
                  ></div>
                </div>
              </div>
              <div className="card-actions">
                <button className="action-btn incorrect" onClick={handleIncorrect}><span className="action-icon">👎</span><span className="action-label">{t('flashcards.boost')}</span></button>
                <button className="action-btn correct" onClick={handleCorrect}><span className="action-icon">👍</span><span className="action-label">{t('flashcards.fade')}</span></button>
              </div>
            </div>

            {/* Right panel: card study area */}
            <div className="study-area">
              {/* Portrait: progress + actions (hidden in landscape) */}
              <div className="study-controls-portrait">
                <div className="study-progress">
                  <div className="progress-text">
                    <span>{t('flashcards.cardXOfY', { current: currentIndex + 1, total: (selectedCategories.size > 0 || selectedCardIds.size > 0) ? activeFlashcards.length : (totalCards || activeFlashcards.length) })}</span>
                    <span className="mastery-display">
                      {getMasteryStars(current?.masteryLevel, true, true)}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${((currentIndex + 1) / ((selectedCategories.size > 0 || selectedCardIds.size > 0) ? activeFlashcards.length : (totalCards || activeFlashcards.length))) * 100}%`,
                        background: 'var(--accent-green)'
                      }}
                    ></div>
                  </div>
                </div>
                <div className="card-actions">
                  <button className="action-btn incorrect" onClick={handleIncorrect}>
                    <span className="action-icon">👎</span><span className="action-label">{t('flashcards.boost')}</span>
                  </button>
                  <button className="action-btn correct" onClick={handleCorrect}>
                    <span className="action-icon">👍</span><span className="action-label">{t('flashcards.fade')}</span>
                  </button>
                </div>
              </div>

              {/* Flashcard */}
              <div className={`flashcard ${isFlipped ? 'flipped' : ''} ${cardAnim}`}>
                <div className="flashcard-inner" onClick={() => setIsFlipped(!isFlipped)}>
                  {/* Front Face */}
                  <div className="flashcard-face front">
                    <div className="face-content">
                      {studyStyle === 'audio' ? (
                        <>
                          <span className="face-label">{t('flashcards.listeningMode')}</span>
                          <button
                            className="listening-play-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeak(showsTargetFirst ? displayTarget : displayNative, showsTargetFirst ? targetTtsLocale : nativeTtsLocale);
                            }}
                          >
                            {isSpeaking ? '🔇' : '🔊'}
                          </button>
                          <span className="listening-hint-text">{t('flashcards.listeningHint')}</span>
                        </>
                      ) : (
                        <>
                          <span className="face-label">{showsTargetFirst ? t('flashcards.targetLang', { language: t(`languages.${targetLangCode}`, LANGUAGES[targetLangCode]?.name || targetLangCode) }) : t('flashcards.nativeLang', { language: t(`languages.${nativeLangCode}`, LANGUAGES[nativeLangCode]?.name || nativeLangCode) })}</span>
                          {showsTargetFirst ? (
                            <>
                              <div className="target-text-row">
                                <span className="main-text">{displayTarget}</span>
                                {studyStyle === 'both' && (
                                  <button
                                    className="speak-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSpeak(displayTarget, targetTtsLocale);
                                    }}
                                  >
                                    {isSpeaking ? '🔇' : '🔊'}
                                  </button>
                                )}
                              </div>
                              <PronunciationGuide item={current} targetText={displayTarget} />
                            </>
                          ) : translationPending ? (
                            <div className="translation-pending" onClick={(e) => e.stopPropagation()}>
                              <div className={`translation-spinner${retryingTranslation ? ' spinning' : ''}`} />
                              <span className="translation-pending-text">
                                {retryingTranslation ? t('flashcards.translating', 'Translating...') : t('flashcards.translationFailed', 'Translation unavailable')}
                              </span>
                              {!retryingTranslation && (
                                <button className="retry-translation-btn" onClick={retryTranslation}>
                                  {t('flashcards.retryTranslation', 'Retry')}
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="target-text-row">
                              <span className="main-text">{displayNative}</span>
                              {studyStyle === 'both' && (
                                <button
                                  className="speak-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSpeak(displayNative, nativeTtsLocale);
                                  }}
                                >
                                  {isSpeaking ? '🔇' : '🔊'}
                                </button>
                              )}
                            </div>
                          )}
                          <span className="tap-hint">{t('flashcards.tapToFlip')}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="flashcard-face back">
                    <div className="face-content">
                      <span className="face-label">{showsTargetFirst ? t('flashcards.nativeLang', { language: t(`languages.${nativeLangCode}`, LANGUAGES[nativeLangCode]?.name || nativeLangCode) }) : t('flashcards.targetLang', { language: t(`languages.${targetLangCode}`, LANGUAGES[targetLangCode]?.name || targetLangCode) })}</span>
                      {showsTargetFirst && translationPending ? (
                        <div className="translation-pending" onClick={(e) => e.stopPropagation()}>
                          <div className={`translation-spinner${retryingTranslation ? ' spinning' : ''}`} />
                          <span className="translation-pending-text">
                            {retryingTranslation ? t('flashcards.translating', 'Translating...') : t('flashcards.translationFailed', 'Translation unavailable')}
                          </span>
                          {!retryingTranslation && (
                            <button className="retry-translation-btn" onClick={retryTranslation}>
                              {t('flashcards.retryTranslation', 'Retry')}
                            </button>
                          )}
                        </div>
                      ) : showsTargetFirst ? (
                        <div className="target-text-row">
                          <span className="main-text">{displayNative}</span>
                          {studyStyle !== 'text' && (
                            <button
                              className="speak-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSpeak(displayNative, nativeTtsLocale);
                              }}
                            >
                              {isSpeaking ? '🔇' : '🔊'}
                            </button>
                          )}
                        </div>
                      ) : (
                        <>
                          <div className="target-text-row">
                            <span className="main-text">{displayTarget}</span>
                            {studyStyle !== 'text' && (
                              <button
                                className="speak-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSpeak(displayTarget, targetTtsLocale);
                                }}
                              >
                                {isSpeaking ? '🔇' : '🔊'}
                              </button>
                            )}
                          </div>
                          <PronunciationGuide item={current} targetText={displayTarget} />
                        </>
                      )}
                      <span className="tap-hint">{t('flashcards.tapToFlipBack')}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Navigation Buttons */}
              <div className="card-nav-buttons">
                <button
                  className="nav-btn nav-btn-prev"
                  disabled={currentIndex === 0 || transitioningRef.current}
                  onClick={handlePrev}
                >
                  &#8249; {t('flashcards.previous')}
                </button>
                <button
                  className="nav-btn nav-btn-next"
                  disabled={currentIndex >= activeFlashcards.length - 1 || transitioningRef.current}
                  onClick={handleNext}
                >
                  {t('flashcards.next')} &#8250;
                </button>
              </div>

              {/* Portrait sidebar: below nav buttons, expands inline so page scrolls */}
              <div className="fc-sidebar-area fc-sidebar-portrait" ref={sidebarToggleRef}>
              <button
                className={`sidebar-toggle ${showSidebar ? 'sidebar-toggle-open' : ''}`}
                onClick={() => setShowSidebar(!showSidebar)}
                title={t('flashcards.studyModeCards')}
              >
                <span className="sidebar-toggle-icon">{showSidebar ? '✕' : '☰'}</span>
                <span className="sidebar-toggle-label">{showSidebar ? t('common.close') : t('flashcards.studyModeCards')}</span>
              </button>
              <div className={`card-list-sidebar ${showSidebar ? 'sidebar-open' : ''}`}>
                <div className="sidebar-mode-selector">
                  <span className="mode-label">{t('flashcards.studyMode')}</span>
                  <div className="mode-options">
                    <button className={`mode-btn ${displayMode === 'target' ? 'active' : ''}`} onClick={() => { setDisplayMode('target'); setShowsTargetFirst(true); }}>
                      <span className="mode-icon">{LANGUAGES[getTargetLangCode()]?.flag || '🌍'}</span>
                      {t('flashcards.showTargetFirst', { target: t(`languages.${getTargetLangCode()}`, getTargetLangName()), native: t(`languages.${getNativeLangCode()}`, getNativeLangName()) })}
                    </button>
                    <button className={`mode-btn ${displayMode === 'native' ? 'active' : ''}`} onClick={() => { setDisplayMode('native'); setShowsTargetFirst(false); }}>
                      <span className="mode-icon">{LANGUAGES[getNativeLangCode()]?.flag || '🌍'}</span>
                      {t('flashcards.showNativeFirst', { native: t(`languages.${getNativeLangCode()}`, getNativeLangName()), target: t(`languages.${getTargetLangCode()}`, getTargetLangName()) })}
                    </button>
                    <button className={`mode-btn ${displayMode === 'random' ? 'active' : ''}`} onClick={() => { setDisplayMode('random'); setShowsTargetFirst(Math.random() < 0.5); }}>
                      <span className="mode-icon">🎲</span> {t('flashcards.random', 'Random')}
                    </button>
                  </div>
                </div>
                <div className="sidebar-mode-selector">
                  <span className="mode-label">{t('flashcards.studyStyle')}</span>
                  <div className="mode-options">
                    <button className={`mode-btn ${studyStyle === 'both' ? 'active' : ''}`} onClick={() => setStudyStyle('both')}>
                      <span className="mode-icon">📖🔊</span> {t('flashcards.textAndAudio')}
                    </button>
                    <button className={`mode-btn ${studyStyle === 'text' ? 'active' : ''}`} onClick={() => { setStudyStyle('text'); speechService.cancel(); }}>
                      <span className="mode-icon">📖</span> {t('flashcards.textOnly')}
                    </button>
                    <button className={`mode-btn ${studyStyle === 'audio' ? 'active' : ''}`} onClick={() => setStudyStyle('audio')}>
                      <span className="mode-icon">🔊</span> {t('flashcards.audioOnly')}
                    </button>
                  </div>
                </div>
                <div className="card-list-header">
                  {(selectedCategories.size > 0 || selectedCardIds.size > 0) ? (
                    <>
                      <span className="card-list-selected-label">
                        ☑{selectedCategories.size > 0 ? ` ${selectedCategories.size} ${selectedCategories.size === 1 ? 'category' : 'categories'}` : ''}
                        {selectedCategories.size > 0 && selectedCardIds.size > 0 ? ' +' : ''}
                        {selectedCardIds.size > 0 ? ` ${selectedCardIds.size} ${selectedCardIds.size === 1 ? 'card' : 'cards'}` : ''}
                      </span>
                      <button className="category-clear" onClick={() => { setSelectedCategories(new Set()); setSelectedCardIds(new Set()); }}>{t('common.clearAll', 'Clear all')}</button>
                    </>
                  ) : (
                    <span className="card-list-hint">{t('flashcards.clickCategoryHint', 'Select categories to study')}</span>
                  )}
                </div>
                {!isGuest && userId && selectedCardIds.size > 0 && (
                  <div className="card-list-focus-actions">
                    <button className="btn-focus-bulk" onClick={() => setFocusForSelected(true)}>
                      {t('flashcards.addSelectedToFocus', 'Add to Focus')}
                    </button>
                    <button className="btn-focus-bulk" onClick={() => setFocusForSelected(false)}>
                      {t('flashcards.removeSelectedFromFocus', 'Remove from Focus')}
                    </button>
                  </div>
                )}
                <div className="category-list">
                  {sidebarCategories.map(({ name: primary, count: metaCount }) => {
                    const isExpanded = expandedCategories.has(primary);
                    const isCatSelected = selectedCategories.has(primary);
                    const cachedDefault = categoryCardsCache[primary];
                    const loadedCategoryCards = categoryCards[primary]?.cards || [];
                    const customCards = loadedCategoryCards.filter(c => !c.isDefault);
                    const allCategoryCards = cachedDefault
                      ? [...cachedDefault, ...customCards]
                      : loadedCategoryCards;
                    return (
                      <div key={primary} className="category-group">
                        <button className={`category-item ${isCatSelected ? 'selected' : ''}`} onClick={() => toggleCategoryFilter(primary)}>
                          <span className="category-check">{isCatSelected ? '✓' : ''}</span>
                          <span className="category-name">{t(`flashcards.categoryNames.${primary}`, { defaultValue: primary })}</span>
                          <span className="card-count">{metaCount}</span>
                          <span className={`category-expand-arrow ${isExpanded ? 'expanded' : ''}`} onClick={(e) => { e.stopPropagation(); toggleExpandedCategory(primary); }} title={isExpanded ? 'Collapse' : 'Show cards'}>›</span>
                        </button>
                        {isExpanded && allCategoryCards.length > 0 && (
                          <div className="subtopic-list">
                            {allCategoryCards.map(card => renderSubtopicCard(card, primary))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

              {!isGuest && (
                <div className="flashcard-save-row">
                  <button
                    className={`btn-save-card btn-focus-card ${focusIds.has(current._id) ? 'active' : ''}`}
                    onClick={toggleFocusCurrent}
                    aria-pressed={focusIds.has(current._id)}
                  >
                    {focusIds.has(current._id)
                      ? t('flashcards.removeFromFocus', 'Remove from Focus')
                      : t('flashcards.addToFocus', 'Add to Focus')}
                  </button>
                  <button className="btn-save-card" onClick={saveCurrentForReview}>
                    {t('flashcards.saveForReview', 'Save for review')}
                  </button>
                  <button className="btn-save-card" onClick={bookmarkCurrent}>
                    {t('learningHub.bookmark', 'Bookmark')}
                  </button>
                  <button className="btn-save-card" onClick={askTutorAboutCurrent}>
                    {t('learningHub.askTutor', 'Ask tutor')}
                  </button>
                  <button className="btn-save-card" onClick={writeCurrent}>
                    {t('learningHub.practiceWriting', 'Write')}
                  </button>
                  <button className="btn-save-card" onClick={selfTestCurrent}>
                    {t('learningHub.practiceQuiz', 'Self-test')}
                  </button>
                  {!current.isDefault && (
                    <button className="btn-delete-card" onClick={() => handleDelete(current._id)}>
                      {t('common.delete')}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Landscape sidebar: grid child in left column */}
            <div className="fc-sidebar-area fc-sidebar-landscape" ref={landscapeSidebarRef}>
              <button
                className={`sidebar-toggle ${showSidebar ? 'sidebar-toggle-open' : ''}`}
                onClick={() => setShowSidebar(!showSidebar)}
                title={t('flashcards.studyModeCards')}
              >
                <span className="sidebar-toggle-icon">{showSidebar ? '✕' : '☰'}</span>
                <span className="sidebar-toggle-label">{showSidebar ? t('common.close') : t('flashcards.studyModeCards')}</span>
              </button>
              <div className={`card-list-sidebar ${showSidebar ? 'sidebar-open' : ''}`}>
                <div className="sidebar-mode-selector">
                  <span className="mode-label">{t('flashcards.studyMode')}</span>
                  <div className="mode-options">
                    <button className={`mode-btn ${displayMode === 'target' ? 'active' : ''}`}
                      onClick={() => { setDisplayMode('target'); setShowsTargetFirst(true); }}>
                      <span className="mode-icon">{LANGUAGES[getTargetLangCode()]?.flag || '🌍'}</span> {t('flashcards.showTargetFirst', { target: t(`languages.${getTargetLangCode()}`, getTargetLangName()), native: t(`languages.${getNativeLangCode()}`, getNativeLangName()) })}
                    </button>
                    <button className={`mode-btn ${displayMode === 'native' ? 'active' : ''}`}
                      onClick={() => { setDisplayMode('native'); setShowsTargetFirst(false); }}>
                      <span className="mode-icon">{LANGUAGES[getNativeLangCode()]?.flag || '🌍'}</span> {t('flashcards.showNativeFirst', { native: t(`languages.${getNativeLangCode()}`, getNativeLangName()), target: t(`languages.${getTargetLangCode()}`, getTargetLangName()) })}
                    </button>
                    <button className={`mode-btn ${displayMode === 'random' ? 'active' : ''}`}
                      onClick={() => { setDisplayMode('random'); setShowsTargetFirst(Math.random() < 0.5); }}>
                      <span className="mode-icon">🎲</span> {t('flashcards.random', 'Random')}
                    </button>
                  </div>
                </div>
                <div className="sidebar-mode-selector">
                  <span className="mode-label">{t('flashcards.studyStyle')}</span>
                  <div className="mode-options">
                    <button className={`mode-btn ${studyStyle === 'both' ? 'active' : ''}`}
                      onClick={() => setStudyStyle('both')}>
                      <span className="mode-icon">📖🔊</span> {t('flashcards.textAndAudio')}
                    </button>
                    <button className={`mode-btn ${studyStyle === 'text' ? 'active' : ''}`}
                      onClick={() => { setStudyStyle('text'); speechService.cancel(); }}>
                      <span className="mode-icon">📖</span> {t('flashcards.textOnly')}
                    </button>
                    <button className={`mode-btn ${studyStyle === 'audio' ? 'active' : ''}`}
                      onClick={() => setStudyStyle('audio')}>
                      <span className="mode-icon">🔊</span> {t('flashcards.audioOnly')}
                    </button>
                  </div>
                </div>
                <div className="card-list-header">
                  {(selectedCategories.size > 0 || selectedCardIds.size > 0) ? (
                    <>
                      <span className="card-list-selected-label">
                        ☑{selectedCategories.size > 0 ? ` ${selectedCategories.size} ${selectedCategories.size === 1 ? 'category' : 'categories'}` : ''}
                        {selectedCategories.size > 0 && selectedCardIds.size > 0 ? ' +' : ''}
                        {selectedCardIds.size > 0 ? ` ${selectedCardIds.size} ${selectedCardIds.size === 1 ? 'card' : 'cards'}` : ''}
                      </span>
                      <button className="category-clear" onClick={() => { setSelectedCategories(new Set()); setSelectedCardIds(new Set()); }}>{t('common.clearAll', 'Clear all')}</button>
                    </>
                  ) : (
                    <span className="card-list-hint">{t('flashcards.clickCategoryHint', 'Select categories to study')}</span>
                  )}
                </div>
                {!isGuest && userId && selectedCardIds.size > 0 && (
                  <div className="card-list-focus-actions">
                    <button className="btn-focus-bulk" onClick={() => setFocusForSelected(true)}>
                      {t('flashcards.addSelectedToFocus', 'Add to Focus')}
                    </button>
                    <button className="btn-focus-bulk" onClick={() => setFocusForSelected(false)}>
                      {t('flashcards.removeSelectedFromFocus', 'Remove from Focus')}
                    </button>
                  </div>
                )}
                <div className="category-list">
                  {sidebarCategories.map(({ name: primary, count: metaCount }) => {
                    const isExpanded = expandedCategories.has(primary);
                    const isCatSelected = selectedCategories.has(primary);
                    const cachedDefault = categoryCardsCache[primary];
                    const loadedCategoryCards = categoryCards[primary]?.cards || [];
                    const customCards = loadedCategoryCards.filter(c => !c.isDefault);
                    const allCategoryCards = cachedDefault
                      ? [...cachedDefault, ...customCards]
                      : loadedCategoryCards;
                    return (
                      <div key={primary} className="category-group">
                        <button
                          className={`category-item ${isCatSelected ? 'selected' : ''}`}
                          onClick={() => toggleCategoryFilter(primary)}
                        >
                          <span className="category-check">{isCatSelected ? '✓' : ''}</span>
                          <span className="category-name">{t(`flashcards.categoryNames.${primary}`, { defaultValue: primary })}</span>
                          <span className="card-count">{metaCount}</span>
                          <span
                            className={`category-expand-arrow ${isExpanded ? 'expanded' : ''}`}
                            onClick={(e) => { e.stopPropagation(); toggleExpandedCategory(primary); }}
                            title={isExpanded ? 'Collapse' : 'Show cards'}
                          >›</span>
                        </button>
                        {isExpanded && allCategoryCards.length > 0 && (
                          <div className="subtopic-list">
                            {allCategoryCards.map(card => renderSubtopicCard(card, primary))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlashcardsPage;
