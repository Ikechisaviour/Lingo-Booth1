import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonService, progressService, userService, guestXPHelper } from '../services/api';
import speechService from '../services/speechService';
import './LessonDetail.css';

function LessonDetail() {
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
  const [showSettings, setShowSettings] = useState(false);

  // Continue prompt when existing activity is in progress
  const [continuePrompt, setContinuePrompt] = useState(null);
  // Block saving until we've checked for existing activity (prevents overwriting saved position)
  const [readyToSave, setReadyToSave] = useState(false);

  const categories = [
    { value: 'daily-life', label: 'Daily Life' },
    { value: 'business', label: 'Business' },
    { value: 'travel', label: 'Travel' },
    { value: 'greetings', label: 'Greetings' },
    { value: 'food', label: 'Food' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'healthcare', label: 'Healthcare' },
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'sentences', label: 'Sentences' },
  ];

  const saveTimerRef = useRef(null);
  const autoAdvanceRef = useRef(null);
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

  const fetchLesson = async () => {
    try {
      setLoading(true);
      const response = await lessonService.getLesson(id);
      setLesson(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load lesson');
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
    return <div className="loading">Loading lesson...</div>;
  }

  if (error || !lesson || !content) {
    return (
      <div className="container">
        <div className="error">{error || 'Content not available'}</div>
        <button className="btn btn-primary" onClick={() => navigate('/lessons')}>
          Back to Lessons
        </button>
      </div>
    );
  }

  return (
    <div className="lesson-detail-container">
      {continuePrompt && (
        <div className="continue-modal-overlay">
          <div className="continue-modal">
            <h3>Activity In Progress</h3>
            {continuePrompt.activityType === 'flashcard' ? (
              <p>You have a flashcard session in progress. Would you like to continue it or start this lesson?</p>
            ) : (
              <p>You have <strong>"{continuePrompt.lessonTitle}"</strong> in progress (question {continuePrompt.lessonIndex + 1}). Would you like to continue it or start this lesson?</p>
            )}
            <div className="continue-modal-actions">
              <button className="btn btn-primary" onClick={handleContinueExisting}>
                {continuePrompt.activityType === 'flashcard' ? 'Continue Flashcards' : 'Continue Previous Lesson'}
              </button>
              <button className="btn btn-secondary" onClick={handleStartNew}>
                Start This Lesson
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="lesson-header">
          <h1>{lesson.title}</h1>
          <p className="lesson-progress">
            {stepPosition + 1} / {lesson.content.length}
          </p>
          <button
            className="settings-toggle-btn"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Toggle settings"
          >
            {showSettings ? '✕' : '⚙'}
          </button>
        </div>

        {/* Settings Panel - always visible on desktop, collapsible on mobile */}
        <div className={`lesson-settings-panel ${showSettings ? 'open' : ''}`}>
          <div className="lesson-nav-dropdowns">
            <select
              className="lesson-dropdown"
              value={lesson.category || ''}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categories.map(cat => (
                <option
                  key={cat.value}
                  value={cat.value}
                  disabled={cat.value === lesson.category}
                >
                  {cat.label}
                </option>
              ))}
            </select>
            <select
              className="lesson-dropdown"
              value={lesson.difficulty || ''}
              onChange={(e) => handleDifficultyChange(e.target.value)}
            >
              {difficulties.map(diff => (
                <option
                  key={diff.value}
                  value={diff.value}
                  disabled={diff.value === lesson.difficulty}
                >
                  {diff.label}
                </option>
              ))}
            </select>
          </div>

          {/* Order Mode Selector */}
          <div className="order-selector">
            <span className="order-label">Order:</span>
            <div className="order-options">
              <button
                className={`order-btn ${orderMode === 'sequential' ? 'active' : ''}`}
                onClick={() => handleOrderToggle('sequential')}
              >
                Sequential
              </button>
              <button
                className={`order-btn ${orderMode === 'random' ? 'active' : ''}`}
                onClick={() => handleOrderToggle('random')}
              >
                Random
              </button>
            </div>
          </div>

          {/* Study Mode Selector */}
          <div className="study-mode-selector">
            <span className="order-label">Study Mode:</span>
            <div className="order-options">
              <button
                className={`order-btn ${studyMode === 'default' ? 'active' : ''}`}
                onClick={() => setStudyMode('default')}
              >
                Default
              </button>
              <button
                className={`order-btn ${studyMode === 'reading' ? 'active' : ''}`}
                onClick={() => setStudyMode('reading')}
              >
                Reading
              </button>
              <button
                className={`order-btn ${studyMode === 'listening' ? 'active' : ''}`}
                onClick={() => setStudyMode('listening')}
              >
                Listening
              </button>
            </div>
          </div>
        </div>

        <div className="lesson-content-card">
          <div className="content-item">
            {studyMode === 'listening' ? (
              <div className="listening-mode-prompt">
                <button
                  className="btn btn-primary listen-again-btn"
                  onClick={() => handleSpeak(content.korean)}
                  title="Listen again"
                >
                  {isSpeaking ? '🔇 Playing...' : '🔊 Listen Again'}
                </button>
                <p className="listening-hint">Listen carefully, then answer the quiz below</p>
              </div>
            ) : studyMode === 'reading' ? (
              <>
                <h2 style={{ marginBottom: '10px' }}>Korean: {content.korean}</h2>
                <button
                  className="btn-romanization-toggle"
                  onClick={() => setShowRomanization(!showRomanization)}
                >
                  {showRomanization ? 'Hide Romanization' : 'Show Romanization'}
                </button>
                {showRomanization && (
                  <p className="romanization">Romanization: {content.romanization}</p>
                )}
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <h2 style={{ margin: 0 }}>Korean: {content.korean}</h2>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSpeak(content.korean)}
                    title="Listen to pronunciation"
                    style={{ padding: '5px 15px', fontSize: '20px' }}
                  >
                    {isSpeaking ? '🔇' : '🔊'}
                  </button>
                </div>
                <p className="romanization">Romanization: {content.romanization}</p>
              </>
            )}

            {content.audioUrl && (
              <div className="audio-player">
                <audio controls src={content.audioUrl} style={{ marginTop: '10px' }} />
              </div>
            )}

            {/* Quiz Section */}
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
              <button
                className="btn btn-primary"
                onClick={() => setShowQuiz(!showQuiz)}
                style={{ width: '100%', marginBottom: '15px' }}
              >
                {showQuiz ? '🔼 Hide Quiz' : '🔽 Test Your Knowledge'}
              </button>

              {showQuiz && (
                <div style={{
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: '#f9f9f9'
                }}>
                  <h3 style={{ marginTop: 0, marginBottom: '15px' }}>
                    {studyMode === 'listening'
                      ? 'What did you hear?'
                      : `What does "${content.korean}" mean?`}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {quizOptions.map((option, index) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrectAnswer = option === content.english;

                      let buttonStyle = {
                        padding: '12px 20px',
                        textAlign: 'left',
                        border: '2px solid #ddd',
                        borderRadius: '6px',
                        backgroundColor: 'white',
                        cursor: quizAttempted && !isCorrect ? 'pointer' : (quizAttempted ? 'not-allowed' : 'pointer'),
                        fontSize: '16px',
                        transition: 'all 0.3s',
                      };

                      if (quizAttempted) {
                        if (isSelected) {
                          if (isCorrect) {
                            buttonStyle.backgroundColor = '#4CAF50';
                            buttonStyle.color = 'white';
                            buttonStyle.borderColor = '#4CAF50';
                          } else {
                            buttonStyle.backgroundColor = '#f44336';
                            buttonStyle.color = 'white';
                            buttonStyle.borderColor = '#f44336';
                          }
                        } else if (isCorrectAnswer && !isCorrect) {
                          buttonStyle.backgroundColor = '#e8f5e9';
                          buttonStyle.borderColor = '#4CAF50';
                          buttonStyle.color = '#2e7d32';
                        }
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => !quizAttempted || !isCorrect ? handleAnswerSelect(option) : null}
                          disabled={quizAttempted && isCorrect}
                          style={buttonStyle}
                          onMouseEnter={(e) => {
                            if (!quizAttempted) {
                              e.target.style.backgroundColor = '#f0f0f0';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!quizAttempted) {
                              e.target.style.backgroundColor = 'white';
                            }
                          }}
                        >
                          {String.fromCharCode(65 + index)}. {option}
                          {quizAttempted && isSelected && isCorrect && ' ✓'}
                          {quizAttempted && isSelected && !isCorrect && ' ✗'}
                          {quizAttempted && !isCorrect && isCorrectAnswer && ' (Correct Answer)'}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback and Explanation */}
                  {showExplanation && (
                    <div style={{
                      marginTop: '20px',
                      padding: '15px',
                      borderRadius: '6px',
                      backgroundColor: isCorrect ? '#e8f5e9' : '#ffebee'
                    }}>
                      {isCorrect ? (
                        <div>
                          <h4 style={{ color: '#2e7d32', marginTop: 0 }}>✓ Correct!</h4>
                          <p style={{ margin: '10px 0' }}>
                            <strong>Explanation:</strong> "{content.korean}" ({content.romanization}) means "{content.english}".
                          </p>
                          {content.example && (
                            <p style={{ margin: '10px 0' }}>
                              <strong>Example usage:</strong><br />
                              Korean: {content.example}<br />
                              English: {content.exampleEnglish}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <h4 style={{ color: '#c62828', marginTop: 0 }}>✗ Incorrect</h4>
                          <p style={{ margin: '10px 0' }}>
                            <strong>Correct Answer:</strong> "{content.english}"
                          </p>
                          <p style={{ margin: '10px 0' }}>
                            <strong>Explanation:</strong> "{content.korean}" ({content.romanization}) means "{content.english}".
                          </p>
                          {content.example && (
                            <p style={{ margin: '10px 0' }}>
                              <strong>Example usage:</strong><br />
                              Korean: {content.example}<br />
                              English: {content.exampleEnglish}
                            </p>
                          )}
                          <button
                            className="btn btn-primary"
                            onClick={handleTryAgain}
                            style={{ marginTop: '10px' }}
                          >
                            Try Again
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
              ← Previous
            </button>

            <span className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((stepPosition + 1) / orderMap.length) * 100}%`,
                }}
              />
            </span>

            {stepPosition === orderMap.length - 1 ? (
              <button className="btn btn-success" onClick={handleComplete}>
                Complete Lesson ✓
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNext}>
                Next →
              </button>
            )}
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setShowTranslation(!showTranslation);
              setTranslationPeeked(true);
              // Record peek on server for 2-minute cooldown (persists across sessions)
              if (!showTranslation && userId && id) {
                userService.recordPeek(userId, { lessonId: id, contentIndex: currentIndex }).catch(() => {});
              }
            }}
            style={{ marginTop: '20px' }}
          >
            {showTranslation ? 'Hide Translation' : 'Word(s) Translation'}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p style={{ margin: 0 }}><strong>Example:</strong> {content.example}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSpeak(content.example)}
                      title="Listen to example"
                      style={{ padding: '3px 10px', fontSize: '16px' }}
                    >
                      🔊
                    </button>
                  </div>
                  <p><strong>Translation:</strong> {content.exampleEnglish}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <button className="btn" onClick={() => navigate('/lessons')}>
          ← Back to Lessons
        </button>
      </div>
    </div>
  );
}

export default LessonDetail;
