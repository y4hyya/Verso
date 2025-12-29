import './CompletionScreen.css';

interface CompletionScreenProps {
  totalCards: number;
  onRestart: () => void;
}

export function CompletionScreen({ totalCards, onRestart }: CompletionScreenProps) {
  return (
    <div className="completion-screen">
      <div className="completion-content">
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1>Congratulations!</h1>
        <p className="completion-message">
          You've mastered all <strong>{totalCards}</strong> vocabulary cards in this session.
        </p>
        <button className="restart-btn" onClick={onRestart}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 4v6h6M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
          Start New Session
        </button>
      </div>
    </div>
  );
}
