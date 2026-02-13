type TopBarProps = {
  isRunning: boolean;
  onRun: () => void;
  onStop: () => void;
  onToggleAdvanced: () => void;
};

export function TopBar({ isRunning, onRun, onStop, onToggleAdvanced }: TopBarProps) {
  return (
    <header className="topbar">
      <div>
        <strong>LumaLab Studio</strong>
        <span className="subtitle">One-Screen IDE</span>
      </div>
      <div className="topbar-actions">
        <button onClick={onRun} disabled={isRunning}>Run</button>
        <button onClick={onStop} disabled={!isRunning}>Stop</button>
        <button onClick={onToggleAdvanced}>Advanced</button>
      </div>
      <div className="status-pills" aria-live="polite">
        <span className={isRunning ? 'pill running' : 'pill'}>{isRunning ? 'Running' : 'Idle'}</span>
        <span className="pill">Cache: Warm</span>
        <span className="pill">Layout: One Screen</span>
      </div>
    </header>
  );
}
