interface FloatingActionsProps {
  onSettings: () => void;
  onAdmin: () => void;
}

const buttonClass =
  'flex h-11 w-11 items-center justify-center rounded-[16px] border border-[var(--border-line)] bg-[var(--glass-bg)] text-text-primary shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-colors hover:text-gold-deep dark:hover:text-signal';

export default function FloatingActions({ onSettings, onAdmin }: FloatingActionsProps) {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      <button type="button" onClick={onAdmin} className={buttonClass} aria-label="Open admin panel">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
      </button>
      <button type="button" onClick={onSettings} className={buttonClass} aria-label="Open settings">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 7h10M18 7h2M4 12h4M12 12h8M4 17h12M20 17h0" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="10" cy="12" r="2" />
          <circle cx="18" cy="17" r="2" />
        </svg>
      </button>
    </div>
  );
}
