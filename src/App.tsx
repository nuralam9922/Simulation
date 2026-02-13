import { useMemo, useState } from 'react';
import { TopBar } from './components/TopBar';
import { EditorPanel } from './components/EditorPanel';
import { SimulatorPanel } from './components/SimulatorPanel';
import { BottomDock } from './components/BottomDock';
import { AdvancedDrawer } from './components/AdvancedDrawer';

const API_ITEMS = [
  'pinMode(pin, mode)',
  'digitalWrite(pin, state)',
  'analogWrite(pin, value)',
  'toggle(pin)',
  'setAll(value)',
  'shiftLeft(fill?)',
  'shiftRight(fill?)',
  'delay(ms)',
  'millis()',
  'random(min?, max?)',
  'print(...args)'
];

const DEFAULT_CODE = `void setup() {
  setAll(0);
}

void loop() {
  for (int i = 0; i < 12; i++) {
    digitalWrite(i, 1);
    delay(80);
    digitalWrite(i, 0);
  }
}`;

export function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [isRunning, setIsRunning] = useState(false);
  const [ledCount, setLedCount] = useState(12);
  const [brightness, setBrightness] = useState<number[]>(Array(12).fill(0));
  const [logs, setLogs] = useState<string[]>(['LumaLab ready.']);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const litCount = useMemo(() => brightness.filter((v) => v > 0).length, [brightness]);
  const avgBrightness = useMemo(() => {
    if (!brightness.length) return 0;
    return Math.round((brightness.reduce((a, b) => a + b, 0) / brightness.length) * 100);
  }, [brightness]);

  const resizeLeds = (nextCount: number) => {
    setLedCount(nextCount);
    setBrightness((prev) => {
      const next = [...prev.slice(0, nextCount)];
      while (next.length < nextCount) next.push(0);
      return next;
    });
  };

  const runSketch = () => {
    setIsRunning(true);
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Running sketch...`]);
    setBrightness((prev) => prev.map((_, i) => (i % 2 ? 0.25 : 1)));
  };

  const stopSketch = () => {
    setIsRunning(false);
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Execution stopped.`]);
    setBrightness((prev) => prev.map(() => 0));
  };

  const toggleLed = (idx: number) => {
    if (isRunning) return;
    setBrightness((prev) => prev.map((v, i) => (i === idx ? (v > 0 ? 0 : 1) : v)));
  };

  return (
    <div className="app-shell">
      <TopBar
        isRunning={isRunning}
        onRun={runSketch}
        onStop={stopSketch}
        onToggleAdvanced={() => setShowAdvanced((s) => !s)}
      />

      <main className="main-grid">
        <EditorPanel code={code} onChange={setCode} />
        <SimulatorPanel
          ledCount={ledCount}
          brightness={brightness}
          onLedCountChange={resizeLeds}
          onToggleLed={toggleLed}
          telemetry={{ litCount, avgBrightness }}
        />
      </main>

      <BottomDock logs={logs} apiItems={API_ITEMS} />

      <AdvancedDrawer open={showAdvanced} onClose={() => setShowAdvanced(false)}>
        <h3>Advanced Controls (Progressive Disclosure)</h3>
        <p>These controls are intentionally hidden from the default canvas.</p>
        <ul>
          <li>Runtime watchdog: 10s</li>
          <li>Loop safety delay: 25ms</li>
          <li>Execution mode: Web Worker (planned next)</li>
          <li>Diagnostics: lightweight tracing enabled</li>
        </ul>
      </AdvancedDrawer>
    </div>
  );
}
