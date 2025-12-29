import './UndoButton.css';

interface UndoButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function UndoButton({ onClick, disabled }: UndoButtonProps) {
  return (
    <button
      className={`undo-button ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Undo last action"
      title="Undo"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 7v6h6" />
        <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
      </svg>
    </button>
  );
}
