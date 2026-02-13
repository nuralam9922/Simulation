type SimulatorPanelProps = {
  ledCount: number;
  brightness: number[];
  onLedCountChange: (nextCount: number) => void;
  onToggleLed: (idx: number) => void;
  telemetry: {
    litCount: number;
    avgBrightness: number;
  };
};

export function SimulatorPanel({
  ledCount,
  brightness,
  onLedCountChange,
  onToggleLed,
  telemetry
}: SimulatorPanelProps) {
  return (
    <section className="panel simulator-panel">
      <div className="panel-header">
        <h2>LED Simulator</h2>
        <label>
          LEDs: {ledCount}
          <input
            type="range"
            min={6}
            max={24}
            value={ledCount}
            onChange={(e) => onLedCountChange(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="led-grid" style={{ gridTemplateColumns: `repeat(${Math.min(8, ledCount)}, 1fr)` }}>
        {brightness.map((value, idx) => (
          <button
            key={idx}
            className="led"
            style={{ opacity: 0.2 + value * 0.8 }}
            onClick={() => onToggleLed(idx)}
            aria-label={`LED ${idx + 1}`}
            title={`LED ${idx + 1}`}
          />
        ))}
      </div>

      <div className="telemetry">
        <span>Lit: {telemetry.litCount}</span>
        <span>Avg brightness: {telemetry.avgBrightness}%</span>
      </div>
    </section>
  );
}
