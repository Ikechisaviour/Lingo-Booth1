import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lessonService, progressService, userService, guestXPHelper } from '../services/api';
import guestActivityTracker from '../services/guestActivityTracker';
import speechService from '../services/speechService';
import { getTargetLangName, getNativeLangName } from '../config/languages';
import './LessonDetail.css';

function LessonDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [translationPeeked, setTranslationPeeked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizAttempted, setQuizAttempted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Order mode: 'sequential' or 'random'
  const [orderMode, setOrderMode] = useState('sequential');
  const [orderMap, setOrderMap] = useState([]);
  const [stepPosition, setStepPosition] = useState(0);

  // Track quiz performance for progress scoring
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [visitedItems, setVisitedItems] = useState(new Set([0]));

  // Study mode: 'default', 'reading', or 'listening'
  const [studyMode, setStudyMode] = useState('default');
  const [showRomanization, setShowRomanization] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);

  // Continue prompt when existing activity is in progress
  const [continuePrompt, setContinuePrompt] = useState(null);
  // Block saving until we've checked for existing activity (prevents overwriting saved position)
  const [readyToSave, setReadyToSave] = useState(false);

  // Playlist state
  const [playlist, setPlaylist] = useState(null);

  const saveTimerRef = useRef(null);
  const autoAdvanceRef = useRef(null);
  const settingsPanelRef = useRef(null);
  const userId = localStorage.getItem('userId');

  const saveActivityState = useCallback((index) => {
    if (!userId || !id) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      userService.saveActivityState(userId, {
        activityType: 'lesson',
        lessonId: id,
        lessonIndex: index,
      }).catch(err => console.error('Failed to save activity state:', err));
    }, 500);
  }, [userId, id]);

  // Fisher-Yates shuffle
  const shuffleArray = useCallback((arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Initialize orderMap when lesson loads
  useEffect(() => {
    if (!lesson) return;
    const sequential = Array.from({ length: lesson.content.length }, (_, i) => i);
    setOrderMap(orderMode === 'random' ? shuffleArray(sequential) : sequential);
  }, [lesson, orderMode, shuffleArray]);

  // Derive currentIndex from orderMap + stepPosition
  useEffect(() => {
    if (orderMap.length > 0 && stepPosition < orderMap.length) {
      setCurrentIndex(orderMap[stepPosition]);
    }
  }, [orderMap, stepPosition]);

  useEffect(() => {
    setStepPosition(0);
    setQuizCorrect(0);
    setQuizTotal(0);
    setVisitedItems(new Set([0]));
    setReadyToSave(false);
    setContinuePrompt(null);
    fetchLesson();

    // Read playlist from sessionStorage
    try {
      const stored = sessionStorage.getItem('lessonPlaylist');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.lessonIds && parsed.lessonIds[parsed.currentIndex] === id) {
          setPlaylist(parsed);
        } else {
          // URL mismatch — user navigated away, clear playlist
          sessionStorage.removeItem('lessonPlaylist');
          setPlaylist(null);
        }
      } else {
        setPlaylist(null);
      }
    } catch {
      setPlaylist(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Restore position from server or show continue prompt for different lesson
  useEffect(() => {
    if (!userId || !lesson) return;
    userService.getActivityState(userId).then(res => {
      const state = res.data;
      if (state.activityType === 'lesson' && state.lesson && state.lessonIndex > 0) {
        if (state.lesson._id === id) {
          // Same lesson - restore position via stepPosition so counter stays in sync
          const restoredStep = Math.min(state.lessonIndex, lesson.content.length - 1);
          setStepPosition(restoredStep);
          setVisitedItems(new Set(Array.from({ length: restoredStep + 1 }, (_, i) => i)));
          setReadyToSave(true);
        } else {
          // Different lesson in progress - show continue prompt (don't enable saving yet)
          setContinuePrompt({
            lessonId: state.lesson._id,
            lessonTitle: state.lesson.title || 'Untitled Lesson',
            lessonIndex: state.lessonIndex,
            activityType: 'lesson',
          });
        }
      } else if (state.activityType === 'flashcard' && state.flashcardIndex > 0) {
        // Flashcard activity in progress - show continue prompt (don't enable saving yet)
        setContinuePrompt({
          activityType: 'flashcard',
          flashcardIndex: state.flashcardIndex,
        });
      } else {
        // No existing activity - safe to save immediately
        setReadyToSave(true);
      }
    }).catch(() => {
      setReadyToSave(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, lesson, id]);

  // Save position on index change (only after activity state check completes)
  useEffect(() => {
    if (lesson && readyToSave) {
      saveActivityState(currentIndex);
    }
  }, [currentIndex, lesson, saveActivityState, readyToSave]);

  // Keep refs for unmount progress save (avoid stale closures)
  const progressRef = useRef({ quizCorrect: 0, quizTotal: 0, visitedSize: 1, totalItems: 0, lesson: null, studyMode: 'default' });
  useEffect(() => {
    progressRef.current = { quizCorrect, quizTotal, visitedSize: visitedItems.size, totalItems: lesson?.content?.length || 0, lesson, studyMode };
  }, [quizCorrect, quizTotal, visitedItems, lesson, studyMode]);

  // Cleanup timers and save partial progress on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
      // Save partial progress when leaving the lesson
      const { quizCorrect: qc, quizTotal: qt, visitedSize, totalItems, lesson: les, studyMode: sm } = progressRef.current;
      if (userId && les && visitedSize > 1) {
        const completionPct = (visitedSize / (totalItems || 1)) * 100;
        const quizPct = qt > 0 ? (qc / qt) * 100 : 0;
        const score = qt > 0 ? Math.round(completionPct * 0.4 + quizPct * 0.6) : Math.round(completionPct);
        const skillType = sm === 'listening' ? 'listening' : 'reading';
        progressService.recordProgress({
          userId,
          lessonId: id,
          skillType,
          category: les.category,
          score,
          isCorrect: score >= 70,
        }).catch(() => {});
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Auto-read Korean text when content changes
  // Default: auto-play twice | Listening: auto-play twice | Reading: no auto-play
  useEffect(() => {
    const currentContent = lesson?.content?.[currentIndex];
    if (!currentContent?.korean) return;

    if (studyMode === 'default' || studyMode === 'listening') {
      speechService.speak(currentContent.korean);
      const timer = setTimeout(() => {
        speechService.speak(currentContent.korean);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lesson, currentIndex, studyMode]);

  // Close settings panel on outside click
  useEffect(() => {
    if (!showSettingsPanel) return;
    const handleClickOutside = (e) => {
      if (settingsPanelRef.current && !settingsPanelRef.current.contains(e.target)) {
        setShowSettingsPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettingsPanel]);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      const response = await lessonService.getLesson(id);
      setLesson(response.data);
      guestActivityTracker.trackLesson();
      setError('');
    } catch (err) {
      setError(t('lessonDetail.failedToLoad'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateQuizOptions = useCallback((correctAnswer, allContent) => {
    // Get other English translations from the lesson
    const otherAnswers = allContent
      .filter(item => item.english !== correctAnswer && item.english)
      .map(item => item.english);

    // Create a pool of wrong answers
    const wrongAnswers = [];
    const commonWrongAnswers = [
      'Thank you very much',
      'Good morning',
      'How are you?',
      'See you later',
      'Nice to meet you',
      'Excuse me',
      'I\'m sorry',
      'You\'re welcome',
      'My name is',
      'What is your name?',
      'Where is the bathroom?',
      'How much is this?',
      'I don\'t understand',
      'Please help me',
      'Do you speak English?',
    ];

    // First, try to use other answers from the lesson
    if (otherAnswers.length >= 4) {
      // Shuffle and pick 4 random wrong answers from lesson
      const shuffled = [...otherAnswers].sort(() => Math.random() - 0.5);
      wrongAnswers.push(...shuffled.slice(0, 4));
    } else {
      // Use all available from lesson
      wrongAnswers.push(...otherAnswers);

      // Fill remaining with common wrong answers
      const remaining = 4 - wrongAnswers.length;
      const availableCommon = commonWrongAnswers.filter(
        ans => ans !== correctAnswer && !wrongAnswers.includes(ans)
      );
      const shuffledCommon = [...availableCommon].sort(() => Math.random() - 0.5);
      wrongAnswers.push(...shuffledCommon.slice(0, remaining));
    }

    // Combine correct answer with wrong answers and shuffle
    const allOptions = [correctAnswer, ...wrongAnswers];
    return allOptions.sort(() => Math.random() - 0.5);
  }, []);

  const handleNext = () => {
    if (stepPosition < orderMap.length - 1) {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
      const nextStep = stepPosition + 1;
      setStepPosition(nextStep);
      setVisitedItems(prev => new Set(prev).add(orderMap[nextStep]));
      setShowTranslation(false);
      setTranslationPeeked(false);
      setShowRomanization(false);
      resetQuiz();
    }
  };

  const handlePrev = () => {
    if (stepPosition > 0) {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
      setStepPosition(stepPosition - 1);
      setShowTranslation(false);
      setTranslationPeeked(false);
      setShowRomanization(false);
      resetQuiz();
    }
  };

  const handleOrderToggle = (mode) => {
    setOrderMode(mode);
    setStepPosition(0);
    setShowTranslation(false);
    setTranslationPeeked(false);
    setShowRomanization(false);
    resetQuiz();
  };

  const handleCategoryChange = async (category) => {
    if (!category) return;
    try {
      // Filter by selected category + current difficulty
      const res = await lessonService.getLessons(category, lesson.difficulty || '');
      let lessons = res.data;
      if (lessons.length > 0) {
        const target = lessons.find(l => l._id !== id) || lessons[0];
        navigate(`/lessons/${target._id}`);
        return;
      }
      // Fallback: category only if no match with both filters
      const fallback = await lessonService.getLessons(category, '');
      lessons = fallback.data;
      if (lessons.length > 0) {
        const target = lessons.find(l => l._id !== id) || lessons[0];
        navigate(`/lessons/${target._id}`);
      }
    } catch (err) {
      console.error('Failed to fetch lessons by category:', err);
    }
  };

  const handleDifficultyChange = async (difficulty) => {
    if (!difficulty) return;
    try {
      // Filter by current category + selected difficulty
      const res = await lessonService.getLessons(lesson.category || '', difficulty);
      let lessons = res.data;
      if (lessons.length > 0) {
        const target = lessons.find(l => l._id !== id) || lessons[0];
        navigate(`/lessons/${target._id}`);
        return;
      }
      // Fallback: difficulty only if no match with both filters
      const fallback = await lessonService.getLessons('', difficulty);
      lessons = fallback.data;
      if (lessons.length > 0) {
        const target = lessons.find(l => l._id !== id) || lessons[0];
        navigate(`/lessons/${target._id}`);
      }
    } catch (err) {
      console.error('Failed to fetch lessons by difficulty:', err);
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setSelectedAnswer(null);
    setQuizAttempted(false);
    setIsCorrect(false);
    setShowExplanation(false);
  };

  // XP points per difficulty level
  const xpPointsMap = { beginner: 2, intermediate: 3, advanced: 4, sentences: 5 };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setQuizAttempted(true);
    const correct = answer === content.english;
    setIsCorrect(correct);
    setShowExplanation(true);

    // Track quiz performance for progress
    setQuizTotal(prev => prev + 1);
    if (correct) {
      setQuizCorrect(prev => prev + 1);
      // Award XP - server checks peek cooldown (24h) and repeat-answer
      if (userId && lesson?.difficulty) {
        const points = xpPointsMap[lesson.difficulty] || 2;
        userService.awardXP(userId, { lessonId: id, contentIndex: currentIndex, basePoints: points }).catch(() => {});
      } else if (!userId) {
        guestXPHelper.add(1);
      }
    } else {
      // Wrong answer triggers same 24-hour cooldown as translation peek
      if (userId && id) {
        userService.recordPeek(userId, { lessonId: id, contentIndex: currentIndex }).catch(() => {});
      }
    }

    // Auto-advance to next question after 2 seconds if correct
    if (correct && stepPosition < orderMap.length - 1) {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = setTimeout(() => {
        handleNext();
      }, 2000);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setQuizAttempted(false);
    setShowExplanation(false);
  };

  const handleSpeak = (text) => {
    if (speechService.isSpeaking()) {
      speechService.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speechService.speak(text);
      // Reset speaking state after speech completes
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  };

  // Calculate progress score: weighted blend of completion % and quiz accuracy
  const calculateScore = (completed = false) => {
    const totalItems = lesson?.content?.length || 1;
    const completionPct = completed ? 100 : (visitedItems.size / totalItems) * 100;
    if (quizTotal === 0) {
      // No quizzes attempted - score based on completion only
      return Math.round(completionPct);
    }
    const quizPct = (quizCorrect / quizTotal) * 100;
    // 40% completion weight + 60% quiz accuracy weight
    return Math.round(completionPct * 0.4 + quizPct * 0.6);
  };

  const saveProgress = async (completed = false) => {
    if (!userId || !lesson) return;
    const score = calculateScore(completed);
    const skillType = studyMode === 'listening' ? 'listening' : 'reading';
    try {
      await progressService.recordProgress({
        userId,
        lessonId: id,
        skillType,
        category: lesson.category,
        score,
        isCorrect: score >= 70,
      });
    } catch (err) {
      console.error('Error recording progress:', err);
    }
  };

  const handleComplete = async () => {
    try {
      await saveProgress(true);
      // Clear activity state on completion
      if (userId) {
        await userService.saveActivityState(userId, {
          activityType: null,
          lessonId: null,
          lessonIndex: 0,
        }).catch(() => {});
      }

      // Advance playlist if active
      if (playlist && playlist.currentIndex < playlist.totalCount - 1) {
        const nextIndex = playlist.currentIndex + 1;
        const updated = { ...playlist, currentIndex: nextIndex };
        sessionStorage.setItem('lessonPlaylist', JSON.stringify(updated));
        navigate(`/lessons/${playlist.lessonIds[nextIndex]}`);
        return;
      }

      // Last lesson in playlist or no playlist — go back to lessons list
      sessionStorage.removeItem('lessonPlaylist');
      navigate('/lessons');
    } catch (err) {
      console.error('Error recording progress:', err);
    }
  };

  const handleContinueExisting = () => {
    if (continuePrompt.activityType === 'flashcard') {
      navigate('/flashcards');
    } else {
      navigate(`/lessons/${continuePrompt.lessonId}`);
    }
    setContinuePrompt(null);
  };

  const handleStartNew = async () => {
    // Clear old activity state and start this lesson fresh
    if (userId) {
      await userService.saveActivityState(userId, {
        activityType: 'lesson',
        lessonId: id,
        lessonIndex: 0,
      }).catch(() => {});
    }
    setContinuePrompt(null);
    setReadyToSave(true);
  };

  // Memoize quiz options to prevent reshuffling on re-render
  // Must be called before any early returns (React hooks rule)
  const content = lesson?.content?.[currentIndex];
  const quizOptions = useMemo(() => {
    if (!content || !lesson) return [];
    return generateQuizOptions(content.english, lesson.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- regenerate when currentIndex or lesson changes
  }, [currentIndex, lesson, generateQuizOptions]);

  if (loading) {
    return <div className="loading">{t('lessonDetail.loadingLesson')}</div>;
  }

  if (error || !lesson || !content) {
    return (
      <div className="container">
        <div className="error">{error || t('lessonDetail.contentNotAvailable')}</div>
        <button className="btn btn-primary" onClick={() => navigate('/lessons')}>
          {t('lessons.backToLessons')}
        </button>
      </div>
    );
  }

  return (
    <div className="lesson-detail-container">
      {continuePrompt && (
        <div className="continue-modal-overlay">
          <div className="continue-modal">
            <h3>{t('lessonDetail.activityInProgress')}</h3>
            {continuePrompt.activityType === 'flashcard' ? (
              <p>{t('lessonDetail.flashcardInProgress')}</p>
            ) : (
              <p dangerouslySetInnerHTML={{ __html: t('lessonDetail.lessonInProgress', { title: continuePrompt.lessonTitle, index: continuePrompt.lessonIndex + 1 }) }} />
            )}
            <div className="continue-modal-actions">
              <button className="btn btn-primary" onClick={handleContinueExisting}>
                {continuePrompt.activityType === 'flashcard' ? t('lessonDetail.continueFlashcards') : t('lessonDetail.continuePreviousLesson')}
              </button>
              <button className="btn btn-secondary" onClick={handleStartNew}>
                {t('lessonDetail.startThisLesson')}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="lesson-header">
          <div className="header-content">
            <h1>{lesson.title}</h1>
          </div>
          <div className="header-actions">
            <p className="lesson-progress">{stepPosition + 1} / {lesson.content.length}</p>
            <button
              className={`header-tool-btn ${orderMode === 'random' ? 'active' : ''}`}
              title={orderMode === 'random' ? t('lessonDetail.sequential') : t('lessonDetail.shuffle')}
              onClick={() => handleOrderToggle(orderMode === 'random' ? 'sequential' : 'random')}
            >
              <span className="tool-icon">🔀</span>
              <span className="tool-label">{orderMode === 'random' ? t('lessonDetail.shuffled') : t('lessonDetail.shuffle')}</span>
            </button>
          </div>
        </div>

        {/* Playlist Progress Bar */}
        {playlist && (
          <div className="playlist-progress-bar-container">
            <div className="playlist-progress-label">
              {playlist.type === 'start-all' ? t('lessonDetail.allLessonsPath') : t('lessonDetail.customPath')}
              <span className="playlist-progress">
                {t('lessonDetail.lessonXOfY', { current: playlist.currentIndex + 1, total: playlist.totalCount })}
              </span>
            </div>
            <div className="playlist-progress-bar">
              <div
                className="playlist-progress-fill"
                style={{ width: `${((playlist.currentIndex + 1) / playlist.totalCount) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="lesson-content-card">
          <div className="content-item">
            {studyMode === 'listening' ? (
              <div className="listening-mode-prompt">
                <button
                  className="btn btn-primary listen-again-btn"
                  onClick={() => handleSpeak(content.korean)}
                  title={t('lessonDetail.listenAgain')}
                >
                  {isSpeaking ? `🔇 ${t('lessonDetail.playing')}` : `🔊 ${t('lessonDetail.listenAgain')}`}
                </button>
                <p className="listening-hint">{t('lessonDetail.listeningHint')}</p>
              </div>
            ) : studyMode === 'reading' ? (
              <>
                <h2 className="content-heading">{getTargetLangName()}: {content.korean}</h2>
                <button
                  className="btn-romanization-toggle"
                  onClick={() => setShowRomanization(!showRomanization)}
                >
                  {showRomanization ? t('lessonDetail.hideRomanization') : t('lessonDetail.showRomanization')}
                </button>
                {showRomanization && (
                  <p className="romanization">{t('lessonDetail.pronunciation')}: {content.romanization}</p>
                )}
              </>
            ) : (
              <>
                <div className="korean-text-row">
                  <h2>{getTargetLangName()}: {content.korean}</h2>
                  <button
                    className="btn btn-primary speak-btn-lesson"
                    onClick={() => handleSpeak(content.korean)}
                    title={t('lessonDetail.listenAgain')}
                  >
                    {isSpeaking ? '🔇' : '🔊'}
                  </button>
                </div>
                <p className="romanization">{t('lessonDetail.pronunciation')}: {content.romanization}</p>
              </>
            )}

            {content.audioUrl && (
              <div className="audio-player">
                <audio controls src={content.audioUrl} />
              </div>
            )}

            {/* Translation Section */}
            <button
              className="btn btn-secondary translation-toggle-btn"
              onClick={() => {
                setShowTranslation(!showTranslation);
                setTranslationPeeked(true);
                if (!showTranslation && userId && id) {
                  userService.recordPeek(userId, { lessonId: id, contentIndex: currentIndex }).catch(() => {});
                }
              }}
            >
              {showTranslation ? t('lessonDetail.hideTranslation') : t('lessonDetail.wordTranslation')}
            </button>

            {showTranslation && (
              <div className="translation">
                <h3>{content.korean} — {content.english}</h3>
                {content.breakdown && content.breakdown.length > 0 && (
                  <div className="breakdown">
                    {content.breakdown.map((part, i) => (
                      <div key={i} className="breakdown-item">
                        <span className="breakdown-korean">{part.korean}</span>
                        <span className="breakdown-english">{part.english}</span>
                      </div>
                    ))}
                  </div>
                )}
                {content.example && !content.breakdown && lesson.difficulty === 'sentences' && (
                  <div className="example">
                    <div className="example-row">
                      <p className="example-text"><strong>{t('lessonDetail.example')}:</strong> {content.example}</p>
                      <button
                        className="btn btn-primary speak-btn-small"
                        onClick={() => handleSpeak(content.example)}
                        title={t('lessonDetail.listenAgain')}
                      >
                        🔊
                      </button>
                    </div>
                    <p><strong>{t('lessonDetail.translation')}:</strong> {content.exampleEnglish}</p>
                  </div>
                )}
              </div>
            )}

            {/* Quiz Section */}
            <div className="quiz-section">
              <button
                className="btn btn-primary quiz-toggle-btn"
                onClick={() => setShowQuiz(!showQuiz)}
              >
                {showQuiz ? `🔼 ${t('lessonDetail.hideQuiz')}` : `🔽 ${t('lessonDetail.testKnowledge')}`}
              </button>

              {showQuiz && (
                <div className="quiz-container">
                  <h3 className="quiz-question">
                    {studyMode === 'listening'
                      ? t('lessonDetail.whatDidYouHear')
                      : t('lessonDetail.whatDoesMean', { word: content.korean, language: getNativeLangName() })}
                  </h3>

                  <div className="quiz-options">
                    {quizOptions.map((option, index) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrectAnswer = option === content.english;

                      let optionClass = 'quiz-option';
                      if (quizAttempted) {
                        if (isSelected && isCorrect) optionClass += ' quiz-option-correct';
                        else if (isSelected && !isCorrect) optionClass += ' quiz-option-incorrect';
                        else if (isCorrectAnswer && !isCorrect) optionClass += ' quiz-option-reveal';
                      }

                      return (
                        <button
                          key={index}
                          className={optionClass}
                          onClick={() => !quizAttempted || !isCorrect ? handleAnswerSelect(option) : null}
                          disabled={quizAttempted && isCorrect}
                        >
                          {String.fromCharCode(65 + index)}. {option}
                          {quizAttempted && isSelected && isCorrect && ' ✓'}
                          {quizAttempted && isSelected && !isCorrect && ' ✗'}
                          {quizAttempted && !isCorrect && isCorrectAnswer && ` (${t('lessonDetail.correctAnswer')})`}
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation && (
                    <div className={`quiz-feedback ${isCorrect ? 'quiz-feedback-correct' : 'quiz-feedback-incorrect'}`}>
                      {isCorrect ? (
                        <div>
                          <h4 className="quiz-feedback-title correct">✓ {t('lessonDetail.correct')}</h4>
                          <p className="quiz-feedback-text">
                            <strong>{t('lessonDetail.explanation')}:</strong> {t('lessonDetail.means', { word: content.korean, romanization: content.romanization, meaning: content.english })}
                          </p>
                          {content.example && (
                            <p className="quiz-feedback-text">
                              <strong>{t('lessonDetail.exampleUsage')}:</strong><br />
                              {getTargetLangName()}: {content.example}<br />
                              {getNativeLangName()}: {content.exampleEnglish}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <h4 className="quiz-feedback-title incorrect">✗ {t('lessonDetail.incorrect')}</h4>
                          <p className="quiz-feedback-text">
                            <strong>{t('lessonDetail.correctAnswer')}:</strong> "{content.english}"
                          </p>
                          <p className="quiz-feedback-text">
                            <strong>{t('lessonDetail.explanation')}:</strong> {t('lessonDetail.means', { word: content.korean, romanization: content.romanization, meaning: content.english })}
                          </p>
                          {content.example && (
                            <p className="quiz-feedback-text">
                              <strong>{t('lessonDetail.exampleUsage')}:</strong><br />
                              {getTargetLangName()}: {content.example}<br />
                              {getNativeLangName()}: {content.exampleEnglish}
                            </p>
                          )}
                          <button className="btn btn-primary quiz-try-again" onClick={handleTryAgain}>
                            {t('lessonDetail.tryAgain')}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          <div className="navigation-buttons">
            <button
              className="btn btn-primary"
              onClick={handlePrev}
              disabled={stepPosition === 0}
            >
              ← {t('lessonDetail.previous')}
            </button>

            <span className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((stepPosition + 1) / orderMap.length) * 100}%` }}
              />
            </span>

            {stepPosition === orderMap.length - 1 ? (
              <button className="btn btn-success" onClick={handleComplete}>
                {playlist && playlist.currentIndex < playlist.totalCount - 1
                  ? `${t('lessonDetail.nextLesson')} →`
                  : `${t('lessonDetail.completeLesson')} ✓`}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNext}>
                {t('lessonDetail.next')} →
              </button>
            )}
          </div>
        </div>

        {/* Bottom Settings Panel */}
        <div className="lesson-settings-wrapper" ref={settingsPanelRef}>
          <button
            className={`sidebar-toggle ${showSettingsPanel ? 'sidebar-toggle-open' : ''}`}
            onClick={() => setShowSettingsPanel(!showSettingsPanel)}
            title={t('lessonDetail.studyModeSettings')}
          >
            <span className="sidebar-toggle-icon">{showSettingsPanel ? '✕' : '☰'}</span>
            <span className="sidebar-toggle-label">{showSettingsPanel ? t('common.close') : t('lessonDetail.studyModeSettings')}</span>
          </button>

          {showSettingsPanel && (
            <div className="lesson-settings-panel-content">
              {/* Study Style Selector */}
              <div className="sidebar-mode-selector">
                <span className="mode-label">{t('lessonDetail.studyStyle')}</span>
                <div className="mode-options">
                  <button
                    className={`mode-btn ${studyMode === 'default' ? 'active' : ''}`}
                    onClick={() => setStudyMode('default')}
                  >
                    <span className="mode-icon">📖🔊</span> {t('lessonDetail.both')}
                  </button>
                  <button
                    className={`mode-btn ${studyMode === 'reading' ? 'active' : ''}`}
                    onClick={() => setStudyMode('reading')}
                  >
                    <span className="mode-icon">📖</span> {t('lessonDetail.reading')}
                  </button>
                  <button
                    className={`mode-btn ${studyMode === 'listening' ? 'active' : ''}`}
                    onClick={() => setStudyMode('listening')}
                  >
                    <span className="mode-icon">🔊</span> {t('lessonDetail.listening')}
                  </button>
                </div>
              </div>

              {/* Order Selector */}
              <div className="sidebar-mode-selector">
                <span className="mode-label">{t('lessonDetail.order')}</span>
                <div className="mode-options">
                  <button
                    className={`mode-btn ${orderMode === 'sequential' ? 'active' : ''}`}
                    onClick={() => handleOrderToggle('sequential')}
                  >
                    {t('lessonDetail.sequential')}
                  </button>
                  <button
                    className={`mode-btn ${orderMode === 'random' ? 'active' : ''}`}
                    onClick={() => handleOrderToggle('random')}
                  >
                    {t('lessonDetail.random')}
                  </button>
                </div>
              </div>

              {/* Category Navigation */}
              <div className="sidebar-mode-selector">
                <span className="mode-label">{t('lessonDetail.category')}</span>
                <div className="mode-options mode-options-wrap">
                  {['daily-life', 'business', 'travel', 'greetings', 'food', 'shopping', 'healthcare'].map(cat => (
                    <button
                      key={cat}
                      className={`mode-btn ${lesson.category === cat ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(cat)}
                      disabled={lesson.category === cat}
                    >
                      {t(`lessons.categories.${cat}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Navigation */}
              <div className="sidebar-mode-selector">
                <span className="mode-label">{t('lessonDetail.difficulty')}</span>
                <div className="mode-options mode-options-wrap">
                  {['beginner', 'intermediate', 'advanced', 'sentences'].map(diff => (
                    <button
                      key={diff}
                      className={`mode-btn ${lesson.difficulty === diff ? 'active' : ''}`}
                      onClick={() => handleDifficultyChange(diff)}
                      disabled={lesson.difficulty === diff}
                    >
                      {t(`lessons.difficulties.${diff}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="btn" onClick={() => {
          sessionStorage.removeItem('lessonPlaylist');
          navigate('/lessons');
        }}>
          {playlist ? `✕ ${t('lessonDetail.exitPlaylist')}` : `← ${t('lessons.backToLessons')}`}
        </button>
      </div>
    </div>
  );
}

export default LessonDetail;
