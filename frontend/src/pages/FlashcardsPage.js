import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { flashcardService, progressService, userService, guestXPHelper } from '../services/api';
import speechService from '../services/speechService';
import './FlashcardsPage.css';

// Normalize category: handles old string format and new array format
const normalizeCategory = (cat) => {
  if (Array.isArray(cat)) return cat.length > 0 ? cat : ['uncategorized'];
  if (typeof cat === 'string' && cat.trim()) return [cat.trim()];
  return ['uncategorized'];
};

function FlashcardsPage() {
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
  });
  const [showForm, setShowForm] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayMode, setDisplayMode] = useState('korean');
  const [currentCardShowsKorean, setCurrentCardShowsKorean] = useState(true);
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
  const autoPlayRef = useRef(false);
  const sidebarToggleRef = useRef(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const isGuest = localStorage.getItem('guestMode') === 'true';
  const saveTimerRef = useRef(null);
  const transitioningRef = useRef(false);

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, flashcards.length, displayMode]);

  // Auto-speak the front text twice when a new card appears (manual mode only)
  useEffect(() => {
    if (autoPlayRef.current) return; // auto-play handles its own speaking
    if (studyStyle === 'text') return; // text-only, no auto-speak
    if (activeFlashcards.length === 0 || !activeFlashcards[currentIndex]) return;
    const card = activeFlashcards[currentIndex];
    const text = currentCardShowsKorean ? card.korean : card.english;

    // Small delay to let slide-in animation settle
    const timer = setTimeout(() => {
      speechService.speakRepeat(text, 2);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, flashcards.length, studyStyle]);

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
      speechService.startSilentBridge();

      const card = activeFlashcards[currentIndex];
      const frontText = currentCardShowsKorean ? card.korean : card.english;
      const backText = currentCardShowsKorean ? card.english : card.korean;

      // Wait for slide-in to settle
      await speechService.waitAsync(600);
      if (cancelled) return;

      // Speak front twice: korean, korean
      await speechService.speakAsync(frontText);
      if (cancelled) return;
      await speechService.waitAsync(400);
      if (cancelled) return;
      await speechService.speakAsync(frontText);
      if (cancelled) return;

      // 5 seconds for user to try and remember
      await speechService.waitAsync(5000);
      if (cancelled) return;

      // Speak front again: korean
      await speechService.speakAsync(frontText);
      if (cancelled) return;

      // Flip and speak back: english
      await speechService.waitAsync(600);
      if (cancelled) return;
      setIsFlipped(true);
      await speechService.waitAsync(400);
      if (cancelled) return;
      await speechService.speakAsync(backText);
      if (cancelled) return;

      // Pause before advancing
      await speechService.waitAsync(1200);
      if (cancelled) return;

      // Check if last card
      if (currentIndex >= activeFlashcards.length - 1) {
        setAutoPlay(false);
        speechService.stopSilentBridge();
        return;
      }

      // Slide to next card
      transitioningRef.current = true;
      setCardAnim('slide-out');
      await speechService.waitAsync(300);
      if (cancelled) return;

      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setCurrentCardShowsKorean(determineCardDisplay());
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

  // Media Session: show lock-screen controls when autoplay is active
  useEffect(() => {
    if (!autoPlay || activeFlashcards.length === 0) { // eslint-disable-line no-use-before-define
      speechService.clearMediaSession();
      return;
    }
    const card = activeFlashcards[currentIndex];
    if (!card) return;

    speechService.setMediaSession({
      title: card.korean || card.english,
      artist: `Card ${currentIndex + 1} of ${activeFlashcards.length}`,
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

  // Reset index when category filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    if (autoPlay) { setAutoPlay(false); speechService.cancel(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

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
      setError('Failed to load flashcards');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (text) => {
    if (speechService.isSpeaking()) {
      speechService.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speechService.speak(text);
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  };

  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    try {
      const response = await flashcardService.createFlashcard({
        userId,
        ...newFlashcard,
      });
      setFlashcards([...flashcards, response.data]);
      setNewFlashcard({ korean: '', english: '', romanization: '', category: ['vocabulary'] });
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
    return displayMode === 'korean';
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

  // Filtered flashcards based on selected categories
  const activeFlashcards = selectedCategories.size === 0
    ? flashcards
    : flashcards.filter(c => {
        const cats = normalizeCategory(c.category);
        return cats.some(cat => selectedCategories.has(cat));
      });

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
    const textToSpeak = currentCardShowsKorean ? card.english : card.korean;
    if (studyStyle === 'text') {
      await new Promise(resolve => setTimeout(resolve, 800));
    } else {
      await Promise.all([
        speechService.speakAsync(textToSpeak),
        new Promise(resolve => setTimeout(resolve, 800)),
      ]);
    }

    // Now slide out and move to next card
    setCardAnim('slide-out');
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setCurrentCardShowsKorean(determineCardDisplay());
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
      setCurrentCardShowsKorean(determineCardDisplay());
      setCardAnim('slide-in-left');
      setTimeout(() => {
        setCardAnim('');
        transitioningRef.current = false;
      }, 400);
    }, 300);
  };

  // Fade — user knows this card, increase mastery (stay on card)
  const handleCorrect = async () => {
    try {
      const flashcard = activeFlashcards[currentIndex];
      if (flashcard.masteryLevel >= 5) return; // already maxed

      const isDefaultCard = flashcard._id?.toString().startsWith('default-');

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
      setError('Failed to record answer. Please try again.');
      console.error('Error:', err);
    }
  };

  // Boost — user needs more practice, decrease mastery (stay on card)
  const handleIncorrect = async () => {
    try {
      const flashcard = activeFlashcards[currentIndex];
      if (flashcard.masteryLevel <= 1) return; // already at minimum

      const isDefaultCard = flashcard._id?.toString().startsWith('default-');

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
      setError('Failed to record answer. Please try again.');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this flashcard?')) return;
    try {
      await flashcardService.deleteFlashcard(id);
      setFlashcards(flashcards.filter((fc) => fc._id !== id));
      if (currentIndex >= activeFlashcards.length - 1 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    } catch (err) {
      setError('Failed to delete flashcard');
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
    return <div className="loading">Loading flashcards...</div>;
  }

  const current = activeFlashcards[currentIndex];

  if (!loading && activeFlashcards.length > 0 && !current) {
    setCurrentIndex(0);
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="flashcards-container">
      {continuePrompt && (
        <div className="continue-modal-overlay">
          <div className="continue-modal">
            <h3>Activity In Progress</h3>
            <p>You have <strong>"{continuePrompt.lessonTitle}"</strong> in progress (question {continuePrompt.lessonIndex + 1}). Would you like to continue it or start flashcards?</p>
            <div className="continue-modal-actions">
              <button className="btn btn-primary" onClick={handleContinueExisting}>
                Continue Lesson
              </button>
              <button className="btn btn-secondary" onClick={handleStartNew}>
                Start Flashcards
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
                <h1>Practice <span className="text-accent">Flashcards</span></h1>
              </div>
              <div className="header-actions">
                {!isGuest && (
                  <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ Add Flashcard'}
                  </button>
                )}
              </div>
            </div>

            {error && <div className="error">{error}</div>}

            {showForm && (
              <div className="add-flashcard-form card">
                <h2>Add New Flashcard</h2>
                <form onSubmit={handleAddFlashcard}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Korean</label>
                      <input type="text" placeholder="한국어" value={newFlashcard.korean}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, korean: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>Romanization</label>
                      <input type="text" placeholder="hangugeo" value={newFlashcard.romanization}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, romanization: e.target.value })} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>English</label>
                      <input type="text" placeholder="Korean language" value={newFlashcard.english}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, english: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>Category (comma-separated)</label>
                      <input type="text" placeholder="vocabulary, verbs" value={newFlashcard.category.join(', ')}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard,
                          category: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success">Add Flashcard</button>
                </form>
              </div>
            )}

            <div className="empty-state">
              <div className="empty-state-icon">🎴</div>
              <h3>No flashcards yet</h3>
              <p>Create your first flashcard to start learning!</p>
              <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                Create Flashcard
              </button>
            </div>
          </>
        ) : (
          <div className="flashcard-page-grid">
            {/* Left panel: header + controls */}
            <div className="fc-header-area">
              <div className="flashcards-header">
                <div className="header-content">
                  <h1>Practice <span className="text-accent">Flashcards</span></h1>
                </div>
                <div className="header-actions">
                  <button
                    className={`header-tool-btn ${isShuffled ? 'active' : ''}`}
                    title="Shuffle"
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
                    <span className="tool-label">Shuffle</span>
                  </button>
                  <button
                    className={`header-tool-btn ${autoPlay ? 'active' : ''}`}
                    title={autoPlay ? 'Stop' : 'Auto-play'}
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
                    <span className="tool-label">{autoPlay ? 'Stop' : 'Auto-play'}</span>
                  </button>
                  {!isGuest && (
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                      {showForm ? 'Cancel' : '+ Add Flashcard'}
                    </button>
                  )}
                </div>
              </div>

              {error && <div className="error">{error}</div>}

              {showForm && (
                <div className="add-flashcard-form card">
                  <h2>Add New Flashcard</h2>
                  <form onSubmit={handleAddFlashcard}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Korean</label>
                        <input type="text" placeholder="한국어" value={newFlashcard.korean}
                          onChange={(e) => setNewFlashcard({ ...newFlashcard, korean: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <label>Romanization</label>
                        <input type="text" placeholder="hangugeo" value={newFlashcard.romanization}
                          onChange={(e) => setNewFlashcard({ ...newFlashcard, romanization: e.target.value })} required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>English</label>
                        <input type="text" placeholder="Korean language" value={newFlashcard.english}
                          onChange={(e) => setNewFlashcard({ ...newFlashcard, english: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <label>Category (comma-separated)</label>
                        <input type="text" placeholder="vocabulary, verbs" value={newFlashcard.category.join(', ')}
                          onChange={(e) => setNewFlashcard({ ...newFlashcard,
                            category: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success">Add Flashcard</button>
                  </form>
                </div>
              )}
            </div>

            {/* Landscape controls: grid child in left column */}
            <div className="study-controls-landscape">
              <div className="study-progress">
                <div className="progress-text">
                  <span>Card {currentIndex + 1} of {activeFlashcards.length}</span>
                  <span className="mastery-display">
                    {getMasteryStars(current.masteryLevel, true)}
                  </span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill"
                    style={{ width: `${((currentIndex + 1) / activeFlashcards.length) * 100}%`, background: 'var(--accent-green)' }}
                  ></div>
                </div>
              </div>
              <div className="card-actions">
                <button className="action-btn incorrect" onClick={handleIncorrect}><span>Boost</span></button>
                <button className="action-btn correct" onClick={handleCorrect}><span>Fade</span></button>
              </div>
            </div>

            {/* Right panel: card study area */}
            <div className="study-area">
              {/* Portrait: progress + actions (hidden in landscape) */}
              <div className="study-controls-portrait">
                <div className="study-progress">
                  <div className="progress-text">
                    <span>Card {currentIndex + 1} of {activeFlashcards.length}</span>
                    <span className="mastery-display">
                      {getMasteryStars(current.masteryLevel, true)}
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
                    <span>Boost</span>
                  </button>
                  <button className="action-btn correct" onClick={handleCorrect}>
                    <span>Fade</span>
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
                          <span className="face-label">Listening</span>
                          <button
                            className="listening-play-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeak(currentCardShowsKorean ? current.korean : current.english);
                            }}
                          >
                            {isSpeaking ? '🔇' : '🔊'}
                          </button>
                          <span className="listening-hint-text">Listen & guess, then tap to reveal</span>
                        </>
                      ) : (
                        <>
                          <span className="face-label">{currentCardShowsKorean ? 'Korean' : 'English'}</span>
                          {currentCardShowsKorean ? (
                            <>
                              <div className="korean-text-row">
                                <span className="main-text">{current.korean}</span>
                                {studyStyle === 'both' && (
                                  <button
                                    className="speak-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSpeak(current.korean);
                                    }}
                                  >
                                    {isSpeaking ? '🔇' : '🔊'}
                                  </button>
                                )}
                              </div>
                              <span className="romanization">{current.romanization}</span>
                            </>
                          ) : (
                            <div className="korean-text-row">
                              <span className="main-text">{current.english}</span>
                              {studyStyle === 'both' && (
                                <button
                                  className="speak-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSpeak(current.english);
                                  }}
                                >
                                  {isSpeaking ? '🔇' : '🔊'}
                                </button>
                              )}
                            </div>
                          )}
                          <span className="tap-hint">Tap to flip</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="flashcard-face back">
                    <div className="face-content">
                      <span className="face-label">{currentCardShowsKorean ? 'English' : 'Korean'}</span>
                      {currentCardShowsKorean ? (
                        <div className="korean-text-row">
                          <span className="main-text">{current.english}</span>
                          {studyStyle !== 'text' && (
                            <button
                              className="speak-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSpeak(current.english);
                              }}
                            >
                              {isSpeaking ? '🔇' : '🔊'}
                            </button>
                          )}
                        </div>
                      ) : (
                        <>
                          <div className="korean-text-row">
                            <span className="main-text">{current.korean}</span>
                            {studyStyle !== 'text' && (
                              <button
                                className="speak-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSpeak(current.korean);
                                }}
                              >
                                {isSpeaking ? '🔇' : '🔊'}
                              </button>
                            )}
                          </div>
                          <span className="romanization">{current.romanization}</span>
                        </>
                      )}
                      <span className="tap-hint">Tap to flip back</span>
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
                title="Cards & Study Mode"
              >
                <span className="sidebar-toggle-icon">{showSidebar ? '✕' : '☰'}</span>
                <span className="sidebar-toggle-label">{showSidebar ? 'Close' : 'Study Mode & Cards'}</span>
              </button>
              <div className={`card-list-sidebar ${showSidebar ? 'sidebar-open' : ''}`}>
                {/* Study Mode Selector */}
                <div className="sidebar-mode-selector">
                  <span className="mode-label">Study Mode:</span>
                  <div className="mode-options">
                    <button
                      className={`mode-btn ${displayMode === 'korean' ? 'active' : ''}`}
                      onClick={() => {
                        setDisplayMode('korean');
                        setCurrentCardShowsKorean(true);
                      }}
                    >
                      <span className="mode-icon">🇰🇷</span>
                      Korean → English
                    </button>
                    <button
                      className={`mode-btn ${displayMode === 'english' ? 'active' : ''}`}
                      onClick={() => {
                        setDisplayMode('english');
                        setCurrentCardShowsKorean(false);
                      }}
                    >
                      <span className="mode-icon">🇬🇧</span>
                      English → Korean
                    </button>
                    <button
                      className={`mode-btn ${displayMode === 'random' ? 'active' : ''}`}
                      onClick={() => {
                        setDisplayMode('random');
                        setCurrentCardShowsKorean(Math.random() < 0.5);
                      }}
                    >
                      <span className="mode-icon">🎲</span>
                      Random
                    </button>
                  </div>
                </div>

                {/* Study Style Selector */}
                <div className="sidebar-mode-selector">
                  <span className="mode-label">Study Style:</span>
                  <div className="mode-options">
                    <button
                      className={`mode-btn ${studyStyle === 'both' ? 'active' : ''}`}
                      onClick={() => setStudyStyle('both')}
                    >
                      <span className="mode-icon">📖🔊</span>
                      Both
                    </button>
                    <button
                      className={`mode-btn ${studyStyle === 'text' ? 'active' : ''}`}
                      onClick={() => { setStudyStyle('text'); speechService.cancel(); }}
                    >
                      <span className="mode-icon">📖</span>
                      Reading
                    </button>
                    <button
                      className={`mode-btn ${studyStyle === 'audio' ? 'active' : ''}`}
                      onClick={() => setStudyStyle('audio')}
                    >
                      <span className="mode-icon">🔊</span>
                      Listening
                    </button>
                  </div>
                </div>

                <div className="sidebar-tabs">
                  <button
                    className={`sidebar-tab ${sidebarView === 'all' ? 'active' : ''}`}
                    onClick={() => setSidebarView('all')}
                  >
                    All <span className="card-count">{activeFlashcards.length}</span>
                  </button>
                  <button
                    className={`sidebar-tab ${sidebarView === 'categories' ? 'active' : ''}`}
                    onClick={() => setSidebarView('categories')}
                  >
                    Categories
                  </button>
                </div>

                {sidebarView === 'all' ? (
                  <ul className="card-list">
                    {activeFlashcards.map((card, idx) => (
                      <li
                        key={card._id}
                        className={`card-list-item ${idx === currentIndex ? 'active' : ''}`}
                        onClick={() => {
                          if (autoPlay) { setAutoPlay(false); speechService.cancel(); }
                          setCurrentIndex(idx);
                          setIsFlipped(false);
                        }}
                      >
                        <span className="card-korean">{card.korean}</span>
                        <span className="card-mastery">{getMasteryStars(card.masteryLevel)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="category-list">
                    {selectedCategories.size > 0 && (
                      <button
                        className="category-clear"
                        onClick={() => setSelectedCategories(new Set())}
                      >
                        Clear filters ({selectedCategories.size} selected)
                      </button>
                    )}
                    {Object.entries(getCategoryCounts()).map(([cat, count]) => (
                      <button
                        key={cat}
                        className={`category-item ${selectedCategories.has(cat) ? 'selected' : ''}`}
                        onClick={() => toggleCategory(cat)}
                      >
                        <span className="category-check">
                          {selectedCategories.has(cat) ? '✓' : ''}
                        </span>
                        <span className="category-name">{cat}</span>
                        <span className="card-count">{count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

              {!isGuest && !current._id?.toString().startsWith('default-') && (
                <button className="btn-delete-card" onClick={() => handleDelete(current._id)}>
                  Delete this card
                </button>
              )}
            </div>

            {/* Landscape sidebar: grid child in left column */}
            <div className="fc-sidebar-area fc-sidebar-landscape">
              <button
                className={`sidebar-toggle ${showSidebar ? 'sidebar-toggle-open' : ''}`}
                onClick={() => setShowSidebar(!showSidebar)}
                title="Cards & Study Mode"
              >
                <span className="sidebar-toggle-icon">{showSidebar ? '✕' : '☰'}</span>
                <span className="sidebar-toggle-label">{showSidebar ? 'Close' : 'Study Mode & Cards'}</span>
              </button>
              <div className={`card-list-sidebar ${showSidebar ? 'sidebar-open' : ''}`}>
                <div className="sidebar-mode-selector">
                  <span className="mode-label">Study Mode:</span>
                  <div className="mode-options">
                    <button className={`mode-btn ${displayMode === 'korean' ? 'active' : ''}`}
                      onClick={() => { setDisplayMode('korean'); setCurrentCardShowsKorean(true); }}>
                      <span className="mode-icon">🇰🇷</span> Korean → English
                    </button>
                    <button className={`mode-btn ${displayMode === 'english' ? 'active' : ''}`}
                      onClick={() => { setDisplayMode('english'); setCurrentCardShowsKorean(false); }}>
                      <span className="mode-icon">🇬🇧</span> English → Korean
                    </button>
                    <button className={`mode-btn ${displayMode === 'random' ? 'active' : ''}`}
                      onClick={() => { setDisplayMode('random'); setCurrentCardShowsKorean(Math.random() < 0.5); }}>
                      <span className="mode-icon">🎲</span> Random
                    </button>
                  </div>
                </div>
                <div className="sidebar-mode-selector">
                  <span className="mode-label">Study Style:</span>
                  <div className="mode-options">
                    <button className={`mode-btn ${studyStyle === 'both' ? 'active' : ''}`}
                      onClick={() => setStudyStyle('both')}>
                      <span className="mode-icon">📖🔊</span> Both
                    </button>
                    <button className={`mode-btn ${studyStyle === 'text' ? 'active' : ''}`}
                      onClick={() => { setStudyStyle('text'); speechService.cancel(); }}>
                      <span className="mode-icon">📖</span> Reading
                    </button>
                    <button className={`mode-btn ${studyStyle === 'audio' ? 'active' : ''}`}
                      onClick={() => setStudyStyle('audio')}>
                      <span className="mode-icon">🔊</span> Listening
                    </button>
                  </div>
                </div>
                <div className="sidebar-tabs">
                  <button className={`sidebar-tab ${sidebarView === 'all' ? 'active' : ''}`}
                    onClick={() => setSidebarView('all')}>
                    All <span className="card-count">{activeFlashcards.length}</span>
                  </button>
                  <button className={`sidebar-tab ${sidebarView === 'categories' ? 'active' : ''}`}
                    onClick={() => setSidebarView('categories')}>
                    Categories
                  </button>
                </div>
                {sidebarView === 'all' ? (
                  <ul className="card-list">
                    {activeFlashcards.map((card, idx) => (
                      <li key={card._id} className={`card-list-item ${idx === currentIndex ? 'active' : ''}`}
                        onClick={() => { if (autoPlay) { setAutoPlay(false); speechService.cancel(); } setCurrentIndex(idx); setIsFlipped(false); }}>
                        <span className="card-korean">{card.korean}</span>
                        <span className="card-mastery">{getMasteryStars(card.masteryLevel)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="category-list">
                    {selectedCategories.size > 0 && (
                      <button className="category-clear" onClick={() => setSelectedCategories(new Set())}>
                        Clear filters ({selectedCategories.size} selected)
                      </button>
                    )}
                    {Object.entries(getCategoryCounts()).map(([cat, count]) => (
                      <button key={cat} className={`category-item ${selectedCategories.has(cat) ? 'selected' : ''}`}
                        onClick={() => toggleCategory(cat)}>
                        <span className="category-check">{selectedCategories.has(cat) ? '✓' : ''}</span>
                        <span className="category-name">{cat}</span>
                        <span className="card-count">{count}</span>
                      </button>
                    ))}
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
