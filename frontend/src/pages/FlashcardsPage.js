import React, { useState, useEffect } from 'react';
import { flashcardService, progressService } from '../services/api';
import speechService from '../services/speechService';
import './FlashcardsPage.css';

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
    category: 'vocabulary',
  });
  const [showForm, setShowForm] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayMode, setDisplayMode] = useState('korean');
  const [currentCardShowsKorean, setCurrentCardShowsKorean] = useState(true);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchFlashcards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      const response = await flashcardService.getFlashcards(userId);
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
      setNewFlashcard({ korean: '', english: '', romanization: '', category: 'vocabulary' });
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

  const handleCorrect = async () => {
    try {
      const flashcard = flashcards[currentIndex];
      await flashcardService.updateFlashcard(flashcard._id, { isCorrect: true });

      await progressService.recordProgress({
        userId,
        skillType: 'reading',
        category: flashcard.category,
        score: 80,
        isCorrect: true,
      });

      const updatedFlashcards = [...flashcards];
      updatedFlashcards[currentIndex] = {
        ...updatedFlashcards[currentIndex],
        correctCount: updatedFlashcards[currentIndex].correctCount + 1,
        masteryLevel: Math.min(updatedFlashcards[currentIndex].masteryLevel + 1, 5),
      };
      setFlashcards(updatedFlashcards);

      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
        setCurrentCardShowsKorean(determineCardDisplay());
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleIncorrect = async () => {
    try {
      const flashcard = flashcards[currentIndex];
      await flashcardService.updateFlashcard(flashcard._id, { isCorrect: false });

      await progressService.recordProgress({
        userId,
        skillType: 'reading',
        category: flashcard.category,
        score: 40,
        isCorrect: false,
      });

      const updatedFlashcards = [...flashcards];
      updatedFlashcards[currentIndex] = {
        ...updatedFlashcards[currentIndex],
        incorrectCount: updatedFlashcards[currentIndex].incorrectCount + 1,
        masteryLevel: Math.max(updatedFlashcards[currentIndex].masteryLevel - 1, 0),
      };
      setFlashcards(updatedFlashcards);

      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
        setCurrentCardShowsKorean(determineCardDisplay());
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await flashcardService.deleteFlashcard(id);
      setFlashcards(flashcards.filter((fc) => fc._id !== id));
      if (currentIndex >= flashcards.length - 1 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    } catch (err) {
      setError('Failed to delete flashcard');
    }
  };

  const getMasteryStars = (level) => {
    const filled = '★'.repeat(level);
    const empty = '☆'.repeat(5 - level);
    return filled + empty;
  };

  if (loading) {
    return <div className="loading">Loading flashcards...</div>;
  }

  const current = flashcards[currentIndex];

  return (
    <div className="flashcards-container">
      <div className="container">
        {/* Header */}
        <div className="flashcards-header">
          <div className="header-content">
            <h1>Practice <span className="text-accent">Flashcards</span></h1>
            <p>Master vocabulary with spaced repetition</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add Flashcard'}
          </button>
        </div>

        {/* Display Mode Selector */}
        <div className="mode-selector">
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
                setCurrentCardShowsKorean(determineCardDisplay());
              }}
            >
              <span className="mode-icon">🎲</span>
              Random
            </button>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        {/* Add Flashcard Form */}
        {showForm && (
          <div className="add-flashcard-form card">
            <h2>Add New Flashcard</h2>
            <form onSubmit={handleAddFlashcard}>
              <div className="form-row">
                <div className="form-group">
                  <label>Korean</label>
                  <input
                    type="text"
                    placeholder="한국어"
                    value={newFlashcard.korean}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, korean: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Romanization</label>
                  <input
                    type="text"
                    placeholder="hangugeo"
                    value={newFlashcard.romanization}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, romanization: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>English</label>
                  <input
                    type="text"
                    placeholder="Korean language"
                    value={newFlashcard.english}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, english: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="vocabulary"
                    value={newFlashcard.category}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, category: e.target.value })}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success">
                Add Flashcard
              </button>
            </form>
          </div>
        )}

        {flashcards.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎴</div>
            <h3>No flashcards yet</h3>
            <p>Create your first flashcard to start learning!</p>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              Create Flashcard
            </button>
          </div>
        ) : (
          <div className="flashcard-study-layout">
            {/* Main Study Area */}
            <div className="study-area">
              {/* Progress Bar */}
              <div className="study-progress">
                <div className="progress-text">
                  <span>Card {currentIndex + 1} of {flashcards.length}</span>
                  <span className="mastery-display">
                    {getMasteryStars(current.masteryLevel)}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${((currentIndex + 1) / flashcards.length) * 100}%`,
                      background: 'var(--accent-green)'
                    }}
                  ></div>
                </div>
              </div>

              {/* Flashcard */}
              <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                <div className="flashcard-inner">
                  {/* Front Face */}
                  <div className="flashcard-face front">
                    <div className="face-content">
                      <span className="face-label">{currentCardShowsKorean ? 'Korean' : 'English'}</span>
                      {currentCardShowsKorean ? (
                        <>
                          <div className="korean-text-row">
                            <span className="main-text">{current.korean}</span>
                            <button
                              className="speak-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSpeak(current.korean);
                              }}
                            >
                              {isSpeaking ? '🔇' : '🔊'}
                            </button>
                          </div>
                          <span className="romanization">{current.romanization}</span>
                        </>
                      ) : (
                        <span className="main-text">{current.english}</span>
                      )}
                      <span className="tap-hint">Tap to flip</span>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="flashcard-face back">
                    <div className="face-content">
                      <span className="face-label">{currentCardShowsKorean ? 'English' : 'Korean'}</span>
                      {currentCardShowsKorean ? (
                        <span className="main-text">{current.english}</span>
                      ) : (
                        <>
                          <div className="korean-text-row">
                            <span className="main-text">{current.korean}</span>
                            <button
                              className="speak-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSpeak(current.korean);
                              }}
                            >
                              {isSpeaking ? '🔇' : '🔊'}
                            </button>
                          </div>
                          <span className="romanization">{current.romanization}</span>
                        </>
                      )}
                      <span className="tap-hint">Tap to flip back</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="card-actions">
                <button className="action-btn incorrect" onClick={handleIncorrect}>
                  <span className="action-icon">✗</span>
                  <span>Still Learning</span>
                </button>
                <button className="action-btn flip" onClick={() => setIsFlipped(!isFlipped)}>
                  <span className="action-icon">↻</span>
                  <span>Flip</span>
                </button>
                <button className="action-btn correct" onClick={handleCorrect}>
                  <span className="action-icon">✓</span>
                  <span>Got It!</span>
                </button>
              </div>

              <button className="btn-delete-card" onClick={() => handleDelete(current._id)}>
                Delete this card
              </button>
            </div>

            {/* Sidebar - Card List */}
            <div className="card-list-sidebar">
              <div className="sidebar-header">
                <h3>All Cards</h3>
                <span className="card-count">{flashcards.length}</span>
              </div>
              <ul className="card-list">
                {flashcards.map((card, idx) => (
                  <li
                    key={card._id}
                    className={`card-list-item ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsFlipped(false);
                    }}
                  >
                    <span className="card-korean">{card.korean}</span>
                    <span className="card-mastery">{getMasteryStars(card.masteryLevel)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlashcardsPage;
