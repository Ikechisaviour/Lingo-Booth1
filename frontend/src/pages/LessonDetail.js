import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonService, progressService } from '../services/api';
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizAttempted, setQuizAttempted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    fetchLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Auto-read Korean text twice when content changes
  useEffect(() => {
    const currentContent = lesson?.content?.[currentIndex];
    if (currentContent?.korean) {
      // First reading - immediate
      speechService.speak(currentContent.korean);

      // Second reading - after 3 seconds
      const timer = setTimeout(() => {
        speechService.speak(currentContent.korean);
      }, 3000);

      // Cleanup function to cancel the timeout if content changes
      return () => {
        clearTimeout(timer);
      };
    }
  }, [lesson, currentIndex]);

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
      const shuffled = otherAnswers.sort(() => Math.random() - 0.5);
      wrongAnswers.push(...shuffled.slice(0, 4));
    } else {
      // Use all available from lesson
      wrongAnswers.push(...otherAnswers);

      // Fill remaining with common wrong answers
      const remaining = 4 - wrongAnswers.length;
      const availableCommon = commonWrongAnswers.filter(
        ans => ans !== correctAnswer && !wrongAnswers.includes(ans)
      );
      const shuffledCommon = availableCommon.sort(() => Math.random() - 0.5);
      wrongAnswers.push(...shuffledCommon.slice(0, remaining));
    }

    // Combine correct answer with wrong answers and shuffle
    const allOptions = [correctAnswer, ...wrongAnswers];
    return allOptions.sort(() => Math.random() - 0.5);
  };

  const handleNext = () => {
    if (currentIndex < lesson.content.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowTranslation(false);
      resetQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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

    // Auto-advance to next question after 2 seconds if correct
    if (correct && currentIndex < lesson.content.length - 1) {
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
      // Reset speaking state after speech completes
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  };

  const handleComplete = async () => {
    const userId = localStorage.getItem('userId');
    try {
      await progressService.recordProgress({
        userId,
        lessonId: id,
        skillType: 'reading',
        category: lesson.category,
        score: 100,
        isCorrect: true,
      });
      navigate('/lessons');
    } catch (err) {
      console.error('Error recording progress:', err);
    }
  };

  // Memoize quiz options to prevent reshuffling on re-render
  // Must be called before any early returns (React hooks rule)
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

  return (
    <div className="lesson-detail-container">
      <div className="container">
        <div className="lesson-header">
          <h1>{lesson.title}</h1>
          <p className="lesson-progress">
            Item {currentIndex + 1} of {lesson.content.length}
          </p>
        </div>

        <div className="lesson-content-card">
          <div className="content-item">
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
                    What does "{content.korean}" mean?
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
              disabled={currentIndex === 0}
            >
              ← Previous
            </button>

            <span className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((currentIndex + 1) / lesson.content.length) * 100}%`,
                }}
              />
            </span>

            {currentIndex === lesson.content.length - 1 ? (
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
