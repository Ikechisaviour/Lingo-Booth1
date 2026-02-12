import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonService, progressService, userService } from '../services/api';
import speechService from '../services/speechService';
import './LessonDetail.css';

const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderMode, setOrderMode] = useState('sequential');
  const [orderMap, setOrderMap] = useState([]);
  const [stepPosition, setStepPosition] = useState(0);
  const [studyMode, setStudyMode] = useState('default');
  const [showTranslation, setShowTranslation] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizAttempted, setQuizAttempted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const saveTimerRef = useRef(null);
  const userId = localStorage.getItem('userId');

  const currentIndex = orderMap.length > 0 ? orderMap[stepPosition] : 0;

  const saveActivityState = useCallback((index, mode, map) => {
    if (!userId || !id) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      userService.saveActivityState(userId, {
        activityType: 'lesson',
        lessonId: id,
        lessonIndex: index,
        orderMode: mode,
        orderMap: map,
      }).catch(err => console.error('Failed to save activity state:', err));
    }, 500);
  }, [userId, id]);

  useEffect(() => {
    fetchLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Initialize orderMap when lesson loads
  useEffect(() => {
    if (!lesson) return;
    const sequentialMap = lesson.content.map((_, i) => i);
    setOrderMap(sequentialMap);
  }, [lesson]);

  // Restore position and order from server
  useEffect(() => {
    if (!userId || !lesson || orderMap.length === 0) return;
    userService.getActivityState(userId).then(res => {
      const state = res.data;
      if (state.activityType === 'lesson' && state.lesson && state.lesson._id === id) {
        // Restore order mode and map if saved
        if (state.orderMode === 'random' && state.orderMap && state.orderMap.length === lesson.content.length) {
          setOrderMode('random');
          setOrderMap(state.orderMap);
        }
        if (state.lessonIndex > 0) {
          const restoredPosition = Math.min(state.lessonIndex, lesson.content.length - 1);
          setStepPosition(restoredPosition);
        }
      }
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, lesson, id, orderMap.length]);

  // Save position on step change
  useEffect(() => {
    if (lesson && orderMap.length > 0) {
      saveActivityState(stepPosition, orderMode, orderMap);
    }
  }, [stepPosition, orderMode, orderMap, lesson, saveActivityState]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  // Auto-read Korean text twice when content changes (not in reading mode)
  useEffect(() => {
    if (studyMode === 'reading') return;
    const currentContent = lesson?.content?.[currentIndex];
    if (currentContent?.korean) {
      speechService.speak(currentContent.korean);
      const timer = setTimeout(() => {
        speechService.speak(currentContent.korean);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
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

  const generateQuizOptions = (correctAnswer, allContent) => {
    const otherAnswers = allContent
      .filter(item => item.english !== correctAnswer && item.english)
      .map(item => item.english);

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

    if (otherAnswers.length >= 4) {
      const shuffled = otherAnswers.sort(() => Math.random() - 0.5);
      wrongAnswers.push(...shuffled.slice(0, 4));
    } else {
      wrongAnswers.push(...otherAnswers);
      const remaining = 4 - wrongAnswers.length;
      const availableCommon = commonWrongAnswers.filter(
        ans => ans !== correctAnswer && !wrongAnswers.includes(ans)
      );
      const shuffledCommon = availableCommon.sort(() => Math.random() - 0.5);
      wrongAnswers.push(...shuffledCommon.slice(0, remaining));
    }

    const allOptions = [correctAnswer, ...wrongAnswers];
    return allOptions.sort(() => Math.random() - 0.5);
  };

  const handleOrderToggle = (mode) => {
    if (mode === orderMode || !lesson) return;

    setOrderMode(mode);

    if (mode === 'random') {
      const indices = lesson.content.map((_, i) => i);
      setOrderMap(shuffleArray(indices));
    } else {
      const sequential = lesson.content.map((_, i) => i);
      setOrderMap(sequential);
    }

    setStepPosition(0);
    setShowTranslation(false);
    resetQuiz();
  };

  const handleNext = () => {
    if (stepPosition < orderMap.length - 1) {
      setStepPosition(stepPosition + 1);
      setShowTranslation(false);
      resetQuiz();
    }
  };

  const handlePrev = () => {
    if (stepPosition > 0) {
      setStepPosition(stepPosition - 1);
      setShowTranslation(false);
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setSelectedAnswer(null);
    setQuizAttempted(false);
    setIsCorrect(false);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setQuizAttempted(true);
    const correct = answer === content.english;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct && stepPosition < orderMap.length - 1) {
      setTimeout(() => {
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
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  };

  const handleComplete = async () => {
    try {
      await progressService.recordProgress({
        userId,
        lessonId: id,
        skillType: 'reading',
        category: lesson.category,
        score: 100,
        isCorrect: true,
      });
      if (userId) {
        await userService.saveActivityState(userId, {
          activityType: null,
          lessonId: null,
          lessonIndex: 0,
          orderMode: null,
          orderMap: [],
        }).catch(() => {});
      }
      navigate('/lessons');
    } catch (err) {
      console.error('Error recording progress:', err);
    }
  };

  // Memoize quiz options to prevent reshuffling on re-render
  const content = lesson?.content?.[currentIndex];
  const quizOptions = useMemo(() => {
    if (!content || !lesson) return [];
    return generateQuizOptions(content.english, lesson.content);
  }, [content, lesson, currentIndex]);

  if (loading) {
    return <div className="loading">Loading lesson...</div>;
  }

  if (error || !lesson) {
    return (
      <div className="container">
        <div className="error">{error}</div>
        <button className="btn btn-primary" onClick={() => navigate('/lessons')}>
          Back to Lessons
        </button>
      </div>
    );
  }

  const isLastStep = stepPosition === orderMap.length - 1;

  return (
    <div className="lesson-detail-container">
      <div className="container">
        <div className="lesson-header">
          <h1>{lesson.title}</h1>

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

          <div className="order-selector">
            <span className="order-label">Mode:</span>
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
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSpeak(content.korean)}
                  title="Listen to pronunciation"
                  style={{ padding: '15px 30px', fontSize: '32px', borderRadius: '50%' }}
                >
                  {isSpeaking ? '🔇' : '🔊'}
                </button>
                <p style={{ color: '#888', marginTop: '10px' }}>Listen and select the correct answer</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <h2 style={{ margin: 0 }}>Korean: {content.korean}</h2>
                  {studyMode === 'default' && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSpeak(content.korean)}
                      title="Listen to pronunciation"
                      style={{ padding: '5px 15px', fontSize: '20px' }}
                    >
                      {isSpeaking ? '🔇' : '🔊'}
                    </button>
                  )}
                </div>
                <p className="romanization">Romanization: {content.romanization}</p>

                {studyMode === 'default' && content.audioUrl && (
                  <div className="audio-player">
                    <audio controls src={content.audioUrl} style={{ marginTop: '10px' }} />
                  </div>
                )}
              </>
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
                      ? 'What does the audio mean?'
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

            <button
              className="btn btn-secondary"
              onClick={() => setShowTranslation(!showTranslation)}
            >
              {showTranslation ? 'Hide Translation' : 'Show Translation'}
            </button>

            {showTranslation && (
              <div className="translation">
                <h3>English: {content.english}</h3>
                {content.example && (
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
                  width: `${((stepPosition + 1) / lesson.content.length) * 100}%`,
                }}
              />
            </span>

            {isLastStep ? (
              <button className="btn btn-success" onClick={handleComplete}>
                Complete Lesson ✓
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNext}>
                Next →
              </button>
            )}
          </div>
        </div>

        <button className="btn" onClick={() => navigate('/lessons')}>
          ← Back to Lessons
        </button>
      </div>
    </div>
  );
}

export default LessonDetail;
