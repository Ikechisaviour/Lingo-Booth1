import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { flashcardService, progressService, userService, guestXPHelper } from '../services/api';
import speechService from '../services/speechService';
import guestActivityTracker from '../services/guestActivityTracker';
import LANGUAGES, { getTargetLangName, getNativeLangName, getTargetLangCode, getNativeLangCode } from '../config/languages';
import './FlashcardsPage.css';

// Normalize category: handles old string format and new array format
const normalizeCategory = (cat) => {
  if (Array.isArray(cat)) return cat.length > 0 ? cat : ['uncategorized'];
  if (typeof cat === 'string' && cat.trim()) return [cat.trim()];
  return ['uncategorized'];
};

function FlashcardsPage() {
  const { t } = useTranslation();
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({
    korean: '',
    english: '',
    romanization: '',
    category: ['vocabulary'],
    topic: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayMode, setDisplayMode] = useState('target');
  const [showsTargetFirst, setShowsTargetFirst] = useState(true);
  const [continuePrompt, setContinuePrompt] = useState(null);
  const [readyToSave, setReadyToSave] = useState(false);
  const [cardAnim, setCardAnim] = useState('');
  const [starPulse, setStarPulse] = useState(null); // 'up' or 'down'
  const [isShuffled, setIsShuffled] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarView, setSidebarView] = useState('all'); // 'all' or 'categories'
  const [selectedCategories, setSelectedCategories] = useState(new Set()); // empty = all
  const [studyStyle, setStudyStyle] = useState('both'); // 'both' | 'text' | 'audio'
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [selectedCardIds, setSelectedCardIds] = useState(new Set()); // empty = study all
  const autoPlayRef = useRef(false);
  const sidebarToggleRef = useRef(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const isGuest = localStorage.getItem('guestMode') === 'true';
  const saveTimerRef = useRef(null);
  const transitioningRef = useRef(false);
  const nativeLangCode = getNativeLangCode();
  const targetLangCode = getTargetLangCode();
  // Map language code to the field name on a flashcard object
  const getLangField = (code) => code === 'ko' ? 'korean' : code === 'en' ? 'english' : code;

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

  useEffect(() => {
    fetchFlashcards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      } else if (state.activityType === 'lesson' && state.lesson && state.lessonIndex > 0) {
        // Lesson in progress - show continue prompt (don't enable saving yet)
        setContinuePrompt({
          lessonId: state.lesson._id,
          lessonTitle: state.lesson.title || 'Untitled Lesson',
          lessonIndex: state.lessonIndex,
          activityType: 'lesson',
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

  // Auto-speak the front text twice when a new card appears (manual mode only)
  useEffect(() => {
    if (autoPlayRef.current) return; // auto-play handles its own speaking
    if (studyStyle === 'text') return; // text-only, no auto-speak
    if (activeFlashcards.length === 0 || !activeFlashcards[currentIndex]) return;
    const card = activeFlashcards[currentIndex];
    const targetField = targetLangCode === 'ko' ? 'korean' : targetLangCode;
    const nativeField = nativeLangCode === 'en' ? 'english' : nativeLangCode;
    const text = showsTargetFirst
      ? card[targetField]
      : (card[nativeField] || card.english);
    const frontLang = showsTargetFirst
      ? (LANGUAGES[targetLangCode]?.ttsLocale)
      : (LANGUAGES[nativeLangCode]?.ttsLocale);

    // Small delay to let slide-in animation settle
    const timer = setTimeout(() => {
      speechService.speakRepeat(text, 2, { lang: frontLang });
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, flashcards.length, studyStyle]);

  // Auto-speak the back text once when the card is flipped
  useEffect(() => {
    if (!isFlipped) return;
    if (studyStyle === 'text') return;
    if (!activeFlashcards[currentIndex]) return;
    const card = activeFlashcards[currentIndex];
    const targetField = targetLangCode === 'ko' ? 'korean' : targetLangCode;
    const nativeField = nativeLangCode === 'en' ? 'english' : nativeLangCode;
    // Back face shows the opposite of front
    const text = showsTargetFirst
      ? (card[nativeField] || card.english)   // front=target → back=native
      : card[targetField];                    // front=native → back=target
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
      const apTargetField = targetLangCode === 'ko' ? 'korean' : targetLangCode;
      const apNativeField = nativeLangCode === 'en' ? 'english' : nativeLangCode;
      const frontText = showsTargetFirst ? card[apTargetField] : (card[apNativeField] || card.english);
      const backText  = showsTargetFirst ? (card[apNativeField] || card.english) : card[apTargetField];
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
      await speechService.speakAsync(backText, { lang: backLocale });
      if (cancelled) return;

      // Pause before advancing
      await speechService.waitAudio(1200);
      if (cancelled) return;

      // Check if last card
      if (currentIndex >= activeFlashcards.length - 1) {
        setAutoPlay(false);
        return;
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

  // Reset index when category or card-selection filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    if (autoPlay) { setAutoPlay(false); speechService.cancel(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, selectedCardIds]);

  // Close sidebar on outside click
  useEffect(() => {
    if (!showSidebar) return;
    const handleClickOutside = (e) => {
      if (sidebarToggleRef.current && !sidebarToggleRef.current.contains(e.target)) {
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

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      const response = userId
        ? await flashcardService.getFlashcards(userId)
        : await flashcardService.getGuestFlashcards();
      setFlashcards(response.data);
      setError('');
    } catch (err) {
      setError(t('flashcards.failedToLoad'));
      console.error(err);
    } finally {
      setLoading(false);
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
        korean: newFlashcard.korean,
        english: newFlashcard.english,
        romanization: newFlashcard.romanization,
        category,
      });
      setFlashcards([...flashcards, response.data]);
      setNewFlashcard({ korean: '', english: '', romanization: '', category: ['vocabulary'], topic: '' });
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

  // Get unique categories with counts from all flashcards
  const getCategoryCounts = () => {
    const counts = {};
    flashcards.forEach((card) => {
      const cats = normalizeCategory(card.category);
      cats.forEach(cat => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });
    return counts;
  };

  // Build a 2-level category tree: primary → { count, subtopics: { topic: count } }
  const buildCategoryTree = () => {
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
  };

  const toggleExpandedCategory = (cat) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  // Toggle a category filter on/off
  const toggleCategory = (cat) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  // Filtered flashcards: by category, then by target language availability.
  // Only exclude cards missing the target field when the backend is actually
  // sending that field (i.e. at least one card has it). This prevents
  // wiping out the whole deck when an older backend omits translation fields.
  const targetLangField = getLangField(targetLangCode);
  const backendSendsTargetField = targetLangCode === 'ko' || targetLangCode === 'en'
    || flashcards.some(c => !!c[targetLangField]);
  // Cards after category filter — used for the sidebar picker list
  const categoryFilteredCards = (selectedCategories.size === 0
    ? flashcards
    : flashcards.filter(c => {
        const cats = normalizeCategory(c.category);
        return cats.some(cat => selectedCategories.has(cat));
      })
  ).filter(c => !backendSendsTargetField || !!c[targetLangField]);
  // Final study deck: further filtered to only selected individual cards
  const activeFlashcards = selectedCardIds.size === 0
    ? categoryFilteredCards
    : categoryFilteredCards.filter(c => selectedCardIds.has(c._id));

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
      artist: t('flashcards.cardXOfY', { current: currentIndex + 1, total: activeFlashcards.length }),
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

  // Pre-fetch audio for upcoming cards so autoplay works with screen locked
  // (fetch() is suspended in background, but cached blobs play fine)
  useEffect(() => {
    if (!autoPlay || activeFlashcards.length === 0) return;

    const cardsToCache = activeFlashcards.slice(
      currentIndex,
      Math.min(currentIndex + 50, activeFlashcards.length)
    );
    speechService.prefetchCards(cardsToCache, showsTargetFirst, targetLangCode, nativeLangCode);

    return () => speechService.clearBlobCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]); // only on autoplay toggle, not every card change

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
    const hnTargetField = targetLangCode === 'ko' ? 'korean' : targetLangCode;
    const hnNativeField = nativeLangCode === 'en' ? 'english' : nativeLangCode;
    const textToSpeak = showsTargetFirst ? (card[hnNativeField] || card.english) : card[hnTargetField];
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

  // Fade — user knows this card, increase mastery (stay on card)
  const handleCorrect = async () => {
    try {
      const flashcard = activeFlashcards[currentIndex];
      if (flashcard.masteryLevel >= 5) return; // already maxed

      const isDefaultCard = flashcard.isDefault === true;

      if (userId) {
        await flashcardService.updateFlashcard(flashcard._id, { isCorrect: true });
        if (!isDefaultCard) {
          await progressService.recordProgress({
            userId,
            skillType: 'reading',
            category: normalizeCategory(flashcard.category)[0],
            score: 80,
            isCorrect: true,
          });
          userService.awardXP(userId, { flashcardId: flashcard._id, basePoints: 2 }).catch(() => {});
        }
      } else if (isGuest) {
        guestXPHelper.add(1);
        guestActivityTracker.trackCard(true);
      }

      const updatedFlashcards = flashcards.map(fc =>
        fc._id === flashcard._id ? {
          ...fc,
          correctCount: fc.correctCount + 1,
          masteryLevel: Math.min(fc.masteryLevel + 1, 5),
        } : fc
      );
      setFlashcards(updatedFlashcards);
      setStarPulse('up');
      setTimeout(() => setStarPulse(null), 600);
    } catch (err) {
      setError(t('flashcards.failedToRecord'));
      console.error('Error:', err);
    }
  };

  // Boost — user needs more practice, decrease mastery (stay on card)
  const handleIncorrect = async () => {
    try {
      const flashcard = activeFlashcards[currentIndex];
      if (flashcard.masteryLevel <= 1) return; // already at minimum

      const isDefaultCard = flashcard.isDefault === true;

      if (userId) {
        await flashcardService.updateFlashcard(flashcard._id, { isCorrect: false });
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
          incorrectCount: fc.incorrectCount + 1,
          masteryLevel: Math.max(fc.masteryLevel - 1, 1),
        } : fc
      );
      setFlashcards(updatedFlashcards);
      setStarPulse('down');
      setTimeout(() => setStarPulse(null), 600);
    } catch (err) {
      setError(t('flashcards.failedToRecord'));
      console.error('Error:', err);
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

  const getMasteryStars = (level, animated = false) => {
    return Array.from({ length: 5 }, (_, i) => {
      const filled = i < level;
      // Highlight the star that just changed
      const isChangingStar = animated && starPulse && (
        (starPulse === 'up' && i === level - 1) ||
        (starPulse === 'down' && i === level)
      );
      return (
        <span
          key={i}
          className={`mastery-star ${filled ? 'star-filled' : 'star-empty'}${isChangingStar ? ' star-pulse' : ''}`}
        >
          {filled ? '★' : '☆'}
        </span>
      );
    });
  };

  const handleContinueExisting = () => {
    navigate(`/lessons/${continuePrompt.lessonId}`);
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
    ? (nativeLangCode !== 'en' && current[nativeLangCode]) || current.english
    : '';
  // TTS locale strings for explicit language passing to speechService
  const targetTtsLocale = LANGUAGES[targetLangCode]?.ttsLocale;
  const nativeTtsLocale = LANGUAGES[nativeLangCode]?.ttsLocale;

  if (!loading && activeFlashcards.length > 0 && !current) {
    setCurrentIndex(0);
    return <div className="loading">{t('common.loading')}</div>;
  }

  return (
    <div className="flashcards-container">
      {continuePrompt && (
        <div className="continue-modal-overlay">
          <div className="continue-modal">
            <h3>{t('flashcards.activityInProgress')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('flashcards.lessonInProgress', { title: continuePrompt.lessonTitle, index: continuePrompt.lessonIndex + 1 }) }} />
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
                      <label>{t('flashcards.targetLang', { language: getTargetLangName() })}</label>
                      <input type="text" placeholder={t('flashcards.targetLang', { language: getTargetLangName() })} value={newFlashcard.korean}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, korean: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>{t('flashcards.pronunciation')}</label>
                      <input type="text" placeholder={t('flashcards.pronunciation')} value={newFlashcard.romanization}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, romanization: e.target.value })} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('flashcards.nativeLang', { language: getNativeLangName() })}</label>
                      <input type="text" placeholder={t('flashcards.nativeLang', { language: getNativeLangName() })} value={newFlashcard.english}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, english: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>{t('flashcards.categoryLabel')}</label>
                      <input
                        type="text"
                        list="category-suggestions"
                        placeholder="numbers, time, vocabulary…"
                        value={newFlashcard.category[0] || ''}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, category: [e.target.value] })}
                      />
                      <datalist id="category-suggestions">
                        {Object.keys(buildCategoryTree()).map(cat => <option key={cat} value={cat} />)}
                      </datalist>
                    </div>
                    <div className="form-group">
                      <label>{t('flashcards.topicLabel', 'Topic (optional)')}</label>
                      <input
                        type="text"
                        list="topic-suggestions"
                        placeholder="days-of-week, 1-10, months…"
                        value={newFlashcard.topic || ''}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, topic: e.target.value })}
                      />
                      <datalist id="topic-suggestions">
                        {newFlashcard.category[0] && buildCategoryTree()[newFlashcard.category[0]]
                          ? Object.keys(buildCategoryTree()[newFlashcard.category[0]].subtopics).map(t => <option key={t} value={t} />)
                          : null}
                      </datalist>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success">{t('flashcards.addFlashcard')}</button>
                </form>
              </div>
            )}

            <div className="empty-state">
              <div className="empty-state-icon">🎴</div>
              <h3>{t('flashcards.noFlashcards')}</h3>
              <p>{t('flashcards.createFirst')}</p>
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
                  <button
                    className={`header-tool-btn ${isShuffled ? 'active' : ''}`}
                    title={t('flashcards.shuffle')}
                    onClick={() => {
                      if (transitioningRef.current) return;
                      transitioningRef.current = true;
                      setCardAnim('shuffle');
                      setTimeout(() => {
                        const shuffled = [...flashcards];
                        for (let i = shuffled.length - 1; i > 0; i--) {
                          const j = Math.floor(Math.random() * (i + 1));
                          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                        }
                        setFlashcards(shuffled);
                        setCurrentIndex(0);
                        setIsFlipped(false);
                        setIsShuffled(true);
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
                        <label>{t('flashcards.targetLang', { language: getTargetLangName() })}</label>
                        <input type="text" placeholder={t('flashcards.targetLang', { language: getTargetLangName() })} value={newFlashcard.korean}
                          onChange={(e) => setNewFlashcard({ ...newFlashcard, korean: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <label>{t('flashcards.pronunciation')}</label>
                        <input type="text" placeholder={t('flashcards.pronunciation')} value={newFlashcard.romanization}
                          onChange={(e) => setNewFlashcard({ ...newFlashcard, romanization: e.target.value })} required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>{t('flashcards.nativeLang', { language: getNativeLangName() })}</label>
                        <input type="text" placeholder={t('flashcards.nativeLang', { language: getNativeLangName() })} value={newFlashcard.english}
                          onChange={(e) => setNewFlashcard({ ...newFlashcard, english: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <label>{t('flashcards.categoryLabel')}</label>
                        <input type="text" placeholder="vocabulary, verbs" value={newFlashcard.category.join(', ')}
                          onChange={(e) => setNewFlashcard({ ...newFlashcard,
                            category: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success">{t('flashcards.addFlashcard')}</button>
                  </form>
                </div>
              )}
            </div>

            {/* Landscape controls: grid child in left column */}
            <div className="study-controls-landscape">
              <div className="study-progress">
                <div className="progress-text">
                  <span>{t('flashcards.cardXOfY', { current: currentIndex + 1, total: activeFlashcards.length })}</span>
                  <span className="mastery-display">
                    {getMasteryStars(current?.masteryLevel, true)}
                  </span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill"
                    style={{ width: `${((currentIndex + 1) / activeFlashcards.length) * 100}%`, background: 'var(--accent-green)' }}
                  ></div>
                </div>
              </div>
              <div className="card-actions">
                <button className="action-btn incorrect" onClick={handleIncorrect}><span>{t('flashcards.boost')}</span></button>
                <button className="action-btn correct" onClick={handleCorrect}><span>{t('flashcards.fade')}</span></button>
              </div>
            </div>

            {/* Right panel: card study area */}
            <div className="study-area">
              {/* Portrait: progress + actions (hidden in landscape) */}
              <div className="study-controls-portrait">
                <div className="study-progress">
                  <div className="progress-text">
                    <span>{t('flashcards.cardXOfY', { current: currentIndex + 1, total: activeFlashcards.length })}</span>
                    <span className="mastery-display">
                      {getMasteryStars(current?.masteryLevel, true)}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${((currentIndex + 1) / activeFlashcards.length) * 100}%`,
                        background: 'var(--accent-green)'
                      }}
                    ></div>
                  </div>
                </div>
                <div className="card-actions">
                  <button className="action-btn incorrect" onClick={handleIncorrect}>
                    <span>{t('flashcards.boost')}</span>
                  </button>
                  <button className="action-btn correct" onClick={handleCorrect}>
                    <span>{t('flashcards.fade')}</span>
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
                          <span className="face-label">{showsTargetFirst ? t('flashcards.targetLang', { language: LANGUAGES[targetLangCode]?.name || 'Korean' }) : t('flashcards.nativeLang', { language: LANGUAGES[nativeLangCode]?.name || 'English' })}</span>
                          {showsTargetFirst ? (
                            <>
                              <div className="korean-text-row">
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
                              {targetLangCode === 'ko' && <span className="romanization">{current.romanization}</span>}
                            </>
                          ) : (
                            <div className="korean-text-row">
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
                      <span className="face-label">{showsTargetFirst ? t('flashcards.nativeLang', { language: LANGUAGES[nativeLangCode]?.name || 'English' }) : t('flashcards.targetLang', { language: LANGUAGES[targetLangCode]?.name || 'Korean' })}</span>
                      {showsTargetFirst ? (
                        <div className="korean-text-row">
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
                          <div className="korean-text-row">
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
                          {targetLangCode === 'ko' && <span className="romanization">{current.romanization}</span>}
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
                  &#8249; Previous
                </button>
                <button
                  className="nav-btn nav-btn-next"
                  disabled={currentIndex >= activeFlashcards.length - 1 || transitioningRef.current}
                  onClick={handleNext}
                >
                  Next &#8250;
                </button>
              </div>

              {/* Portrait sidebar: inside study-area, right after nav buttons */}
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
                {/* Study Mode Selector */}
                <div className="sidebar-mode-selector">
                  <span className="mode-label">{t('flashcards.studyMode')}</span>
                  <div className="mode-options">
                    <button
                      className={`mode-btn ${displayMode === 'target' ? 'active' : ''}`}
                      onClick={() => {
                        setDisplayMode('target');
                        setShowsTargetFirst(true);
                      }}
                    >
                      <span className="mode-icon">{LANGUAGES[getTargetLangCode()]?.flag || '🌍'}</span>
                      {t('flashcards.showTargetFirst', { target: getTargetLangName(), native: getNativeLangName() })}
                    </button>
                    <button
                      className={`mode-btn ${displayMode === 'native' ? 'active' : ''}`}
                      onClick={() => {
                        setDisplayMode('native');
                        setShowsTargetFirst(false);
                      }}
                    >
                      <span className="mode-icon">{LANGUAGES[getNativeLangCode()]?.flag || '🌍'}</span>
                      {t('flashcards.showNativeFirst', { native: getNativeLangName(), target: getTargetLangName() })}
                    </button>
                    <button
                      className={`mode-btn ${displayMode === 'random' ? 'active' : ''}`}
                      onClick={() => {
                        setDisplayMode('random');
                        setShowsTargetFirst(Math.random() < 0.5);
                      }}
                    >
                      <span className="mode-icon">🎲</span>
                      Random
                    </button>
                  </div>
                </div>

                {/* Study Style Selector */}
                <div className="sidebar-mode-selector">
                  <span className="mode-label">{t('flashcards.studyStyle')}</span>
                  <div className="mode-options">
                    <button
                      className={`mode-btn ${studyStyle === 'both' ? 'active' : ''}`}
                      onClick={() => setStudyStyle('both')}
                    >
                      <span className="mode-icon">📖🔊</span>
                      {t('flashcards.textAndAudio')}
                    </button>
                    <button
                      className={`mode-btn ${studyStyle === 'text' ? 'active' : ''}`}
                      onClick={() => { setStudyStyle('text'); speechService.cancel(); }}
                    >
                      <span className="mode-icon">📖</span>
                      {t('flashcards.textOnly')}
                    </button>
                    <button
                      className={`mode-btn ${studyStyle === 'audio' ? 'active' : ''}`}
                      onClick={() => setStudyStyle('audio')}
                    >
                      <span className="mode-icon">🔊</span>
                      {t('flashcards.audioOnly')}
                    </button>
                  </div>
                </div>

                <div className="sidebar-tabs">
                  <button
                    className={`sidebar-tab ${sidebarView === 'all' ? 'active' : ''}`}
                    onClick={() => setSidebarView('all')}
                  >
                    {t('flashcards.allCards')} <span className="card-count">{selectedCardIds.size > 0 ? `${selectedCardIds.size}/${categoryFilteredCards.length}` : categoryFilteredCards.length}</span>
                  </button>
                  <button
                    className={`sidebar-tab ${sidebarView === 'categories' ? 'active' : ''}`}
                    onClick={() => setSidebarView('categories')}
                  >
                    {t('flashcards.categories')}
                  </button>
                </div>

                {sidebarView === 'all' ? (
                  <>
                    <div className="card-list-header">
                      {selectedCardIds.size > 0 ? (
                        <>
                          <span className="card-list-selected-label">✓ {selectedCardIds.size} selected</span>
                          <button className="category-clear" onClick={() => setSelectedCardIds(new Set())}>
                            {t('common.clearAll', 'Clear')}
                          </button>
                        </>
                      ) : (
                        <span className="card-list-hint">☑ {t('flashcards.selectToStudy', 'Check cards to study a custom set')}</span>
                      )}
                    </div>
                    <ul className="card-list">
                      {categoryFilteredCards.map((card, idx) => {
                        const isChecked = selectedCardIds.has(card._id);
                        const activeIdx = activeFlashcards.findIndex(c => c._id === card._id);
                        const isCurrent = activeIdx !== -1 && activeIdx === currentIndex;
                        return (
                          <li key={card._id} className={`card-list-item ${isCurrent ? 'active' : ''} ${isChecked ? 'card-selected' : ''}`}>
                            <label className="card-select-label" onClick={e => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                className="card-checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  setSelectedCardIds(prev => {
                                    const next = new Set(prev);
                                    next.has(card._id) ? next.delete(card._id) : next.add(card._id);
                                    return next;
                                  });
                                }}
                              />
                            </label>
                            <span className="card-korean" onClick={() => {
                              if (autoPlay) { setAutoPlay(false); speechService.cancel(); }
                              if (activeIdx !== -1) setCurrentIndex(activeIdx);
                              setIsFlipped(false);
                            }}>{card[getLangField(targetLangCode)]}</span>
                            <span className="card-mastery">{getMasteryStars(card.masteryLevel)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <div className="category-list">
                    {selectedCategories.size > 0 && (
                      <button
                        className="category-clear"
                        onClick={() => setSelectedCategories(new Set())}
                      >
                        {t('flashcards.clearFilters', { count: selectedCategories.size })}
                      </button>
                    )}
                    {Object.entries(buildCategoryTree()).map(([primary, data]) => {
                      const hasSubtopics = Object.keys(data.subtopics).length > 0;
                      const isExpanded = expandedCategories.has(primary);
                      return (
                        <div key={primary} className="category-group">
                          <button
                            className={`category-item ${selectedCategories.has(primary) ? 'selected' : ''}`}
                            onClick={() => toggleCategory(primary)}
                          >
                            <span className="category-check">{selectedCategories.has(primary) ? '✓' : ''}</span>
                            <span className="category-name">{t(`flashcards.categoryNames.${primary}`, { defaultValue: primary })}</span>
                            <span className="card-count">{data.count}</span>
                            {hasSubtopics && (
                              <span
                                className={`category-expand-arrow ${isExpanded ? 'expanded' : ''}`}
                                onClick={(e) => { e.stopPropagation(); toggleExpandedCategory(primary); }}
                                title={isExpanded ? 'Collapse' : 'Show topics'}
                              >›</span>
                            )}
                          </button>
                          {hasSubtopics && isExpanded && (
                            <div className="subtopic-list">
                              {Object.entries(data.subtopics).map(([topic, count]) => (
                                <button
                                  key={topic}
                                  className={`subtopic-item ${selectedCategories.has(topic) ? 'selected' : ''}`}
                                  onClick={() => toggleCategory(topic)}
                                >
                                  <span className="category-check">{selectedCategories.has(topic) ? '✓' : ''}</span>
                                  <span className="category-name">{t(`flashcards.categoryNames.${topic}`, { defaultValue: topic })}</span>
                                  <span className="card-count">{count}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

              {!isGuest && !current.isDefault && (
                <button className="btn-delete-card" onClick={() => handleDelete(current._id)}>
                  {t('common.delete')}
                </button>
              )}
            </div>

            {/* Landscape sidebar: grid child in left column */}
            <div className="fc-sidebar-area fc-sidebar-landscape">
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
                      <span className="mode-icon">{LANGUAGES[getTargetLangCode()]?.flag || '🌍'}</span> {t('flashcards.showTargetFirst', { target: getTargetLangName(), native: getNativeLangName() })}
                    </button>
                    <button className={`mode-btn ${displayMode === 'native' ? 'active' : ''}`}
                      onClick={() => { setDisplayMode('native'); setShowsTargetFirst(false); }}>
                      <span className="mode-icon">{LANGUAGES[getNativeLangCode()]?.flag || '🌍'}</span> {t('flashcards.showNativeFirst', { native: getNativeLangName(), target: getTargetLangName() })}
                    </button>
                    <button className={`mode-btn ${displayMode === 'random' ? 'active' : ''}`}
                      onClick={() => { setDisplayMode('random'); setShowsTargetFirst(Math.random() < 0.5); }}>
                      <span className="mode-icon">🎲</span> Random
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
                <div className="sidebar-tabs">
                  <button className={`sidebar-tab ${sidebarView === 'all' ? 'active' : ''}`}
                    onClick={() => setSidebarView('all')}>
                    {t('flashcards.allCards')} <span className="card-count">{selectedCardIds.size > 0 ? `${selectedCardIds.size}/${categoryFilteredCards.length}` : categoryFilteredCards.length}</span>
                  </button>
                  <button className={`sidebar-tab ${sidebarView === 'categories' ? 'active' : ''}`}
                    onClick={() => setSidebarView('categories')}>
                    {t('flashcards.categories')}
                  </button>
                </div>
                {sidebarView === 'all' ? (
                  <>
                    <div className="card-list-header">
                      {selectedCardIds.size > 0 ? (
                        <>
                          <span className="card-list-selected-label">✓ {selectedCardIds.size} selected</span>
                          <button className="category-clear" onClick={() => setSelectedCardIds(new Set())}>
                            {t('common.clearAll', 'Clear')}
                          </button>
                        </>
                      ) : (
                        <span className="card-list-hint">☑ {t('flashcards.selectToStudy', 'Check cards to study a custom set')}</span>
                      )}
                    </div>
                    <ul className="card-list">
                      {categoryFilteredCards.map((card) => {
                        const isChecked = selectedCardIds.has(card._id);
                        const activeIdx = activeFlashcards.findIndex(c => c._id === card._id);
                        const isCurrent = activeIdx !== -1 && activeIdx === currentIndex;
                        return (
                          <li key={card._id} className={`card-list-item ${isCurrent ? 'active' : ''} ${isChecked ? 'card-selected' : ''}`}>
                            <label className="card-select-label" onClick={e => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                className="card-checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  setSelectedCardIds(prev => {
                                    const next = new Set(prev);
                                    next.has(card._id) ? next.delete(card._id) : next.add(card._id);
                                    return next;
                                  });
                                }}
                              />
                            </label>
                            <span className="card-korean" onClick={() => {
                              if (autoPlay) { setAutoPlay(false); speechService.cancel(); }
                              if (activeIdx !== -1) setCurrentIndex(activeIdx);
                              setIsFlipped(false);
                            }}>{card[getLangField(targetLangCode)]}</span>
                            <span className="card-mastery">{getMasteryStars(card.masteryLevel)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <div className="category-list">
                    {selectedCategories.size > 0 && (
                      <button className="category-clear" onClick={() => setSelectedCategories(new Set())}>
                        {t('flashcards.clearFilters', { count: selectedCategories.size })}
                      </button>
                    )}
                    {Object.entries(buildCategoryTree()).map(([primary, data]) => {
                      const hasSubtopics = Object.keys(data.subtopics).length > 0;
                      const isExpanded = expandedCategories.has(primary);
                      return (
                        <div key={primary} className="category-group">
                          <button
                            className={`category-item ${selectedCategories.has(primary) ? 'selected' : ''}`}
                            onClick={() => toggleCategory(primary)}
                          >
                            <span className="category-check">{selectedCategories.has(primary) ? '✓' : ''}</span>
                            <span className="category-name">{t(`flashcards.categoryNames.${primary}`, { defaultValue: primary })}</span>
                            <span className="card-count">{data.count}</span>
                            {hasSubtopics && (
                              <span
                                className={`category-expand-arrow ${isExpanded ? 'expanded' : ''}`}
                                onClick={(e) => { e.stopPropagation(); toggleExpandedCategory(primary); }}
                              >›</span>
                            )}
                          </button>
                          {hasSubtopics && isExpanded && (
                            <div className="subtopic-list">
                              {Object.entries(data.subtopics).map(([topic, count]) => (
                                <button
                                  key={topic}
                                  className={`subtopic-item ${selectedCategories.has(topic) ? 'selected' : ''}`}
                                  onClick={() => toggleCategory(topic)}
                                >
                                  <span className="category-check">{selectedCategories.has(topic) ? '✓' : ''}</span>
                                  <span className="category-name">{t(`flashcards.categoryNames.${topic}`, { defaultValue: topic })}</span>
                                  <span className="card-count">{count}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlashcardsPage;
