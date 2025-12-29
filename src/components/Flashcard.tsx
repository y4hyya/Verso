import { useState, useEffect } from 'react';
import type { VocabularyCard } from '../data/vocabulary';
import './Flashcard.css';

interface FlashcardProps {
  card: VocabularyCard;
  onKnow: () => void;
  onDontKnow: () => void;
  cardsRemaining: number;
  totalCards: number;
}

export function Flashcard({ card, onKnow, onDontKnow, cardsRemaining, totalCards }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [card.id]);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleAction = (action: () => void) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped(false);
    // Quick transition to next card
    setTimeout(() => {
      action();
      setIsAnimating(false);
    }, 200);
  };

  const progress = ((totalCards - cardsRemaining) / totalCards) * 100;

  return (
    <div className="flashcard-wrapper">
      <div className="progress-section">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="progress-text">
          {totalCards - cardsRemaining} of {totalCards} mastered
        </p>
      </div>

      <div className="flashcard-container" onClick={handleFlip}>
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
          <div className="flashcard-face flashcard-front">
            <div className="card-label">German</div>
            <div className="card-content">
              <h1 className="word">{card.germanWord}</h1>
              <div className="divider" />
              <p className="sentence">"{card.germanSentence}"</p>
            </div>
            <div className="tap-hint">
              <span>Tap to reveal</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </div>
          </div>

          <div className="flashcard-face flashcard-back">
            <div className="card-label">English</div>
            <div className="card-content">
              <h1 className="word">{card.englishWord}</h1>
              <div className="divider" />
              <p className="sentence">"{card.englishSentence}"</p>
            </div>
            <div className="tap-hint">
              <span>Tap to flip back</span>
            </div>
          </div>
        </div>
      </div>

      <div className="actions">
        <button
          className="action-btn again"
          onClick={(e) => { e.stopPropagation(); handleAction(onDontKnow); }}
          disabled={isAnimating}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
          <span>Again</span>
        </button>
        <button
          className="action-btn correct"
          onClick={(e) => { e.stopPropagation(); handleAction(onKnow); }}
          disabled={isAnimating}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          <span>Got it</span>
        </button>
      </div>
    </div>
  );
}
