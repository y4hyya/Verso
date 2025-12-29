import { useState, useCallback } from 'react';
import { vocabulary } from './data/vocabulary';
import type { VocabularyCard } from './data/vocabulary';
import { Flashcard } from './components/Flashcard';
import { CompletionScreen } from './components/CompletionScreen';
import { UndoButton } from './components/UndoButton';
import './App.css';

interface HistoryEntry {
  cardPool: VocabularyCard[];
  currentIndex: number;
  action: 'know' | 'dontKnow';
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const [cardPool, setCardPool] = useState<VocabularyCard[]>(() => shuffleArray(vocabulary));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const totalCards = vocabulary.length;

  const currentCard = cardPool[currentIndex];

  const getRandomIndex = useCallback((poolSize: number, excludeIndex?: number) => {
    if (poolSize <= 1) return 0;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * poolSize);
    } while (newIndex === excludeIndex);
    return newIndex;
  }, []);

  const handleKnow = useCallback(() => {
    // Save current state to history before changing
    setHistory(prev => [...prev, {
      cardPool: [...cardPool],
      currentIndex,
      action: 'know'
    }]);

    const newPool = cardPool.filter((_, index) => index !== currentIndex);
    setCardPool(newPool);
    if (newPool.length > 0) {
      setCurrentIndex(getRandomIndex(newPool.length));
    }
  }, [cardPool, currentIndex, getRandomIndex]);

  const handleDontKnow = useCallback(() => {
    // Save current state to history before changing
    setHistory(prev => [...prev, {
      cardPool: [...cardPool],
      currentIndex,
      action: 'dontKnow'
    }]);

    setCurrentIndex(getRandomIndex(cardPool.length, currentIndex));
  }, [cardPool, currentIndex, getRandomIndex]);

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;

    const lastEntry = history[history.length - 1];
    setCardPool(lastEntry.cardPool);
    setCurrentIndex(lastEntry.currentIndex);
    setHistory(prev => prev.slice(0, -1));
  }, [history]);

  const handleRestart = useCallback(() => {
    setCardPool(shuffleArray(vocabulary));
    setCurrentIndex(0);
    setHistory([]);
  }, []);

  const isComplete = cardPool.length === 0;
  const canUndo = history.length > 0;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Verso</h1>
        <p className="app-subtitle">German Vocabulary Flashcards</p>
      </header>

      <main className="app-main">
        {isComplete ? (
          <CompletionScreen totalCards={totalCards} onRestart={handleRestart} />
        ) : (
          <Flashcard
            key={currentCard.id}
            card={currentCard}
            onKnow={handleKnow}
            onDontKnow={handleDontKnow}
            cardsRemaining={cardPool.length}
            totalCards={totalCards}
          />
        )}
      </main>

      <UndoButton onClick={handleUndo} disabled={!canUndo} />
    </div>
  );
}

export default App;
