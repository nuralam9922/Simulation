import { useState } from 'react';

type BottomDockProps = {
  logs: string[];
  apiItems: string[];
};

export function BottomDock({ logs, apiItems }: BottomDockProps) {
  const [tab, setTab] = useState<'console' | 'docs'>('console');

  return (
    <section className="bottom-dock panel">
      <div className="dock-tabs">
        <button className={tab === 'console' ? 'active' : ''} onClick={() => setTab('console')}>
          Console
        </button>
        <button className={tab === 'docs' ? 'active' : ''} onClick={() => setTab('docs')}>
          API Docs
        </button>
      </div>

      <div className="dock-content">
        {tab === 'console' ? (
          <pre>{logs.slice(-8).join('\n')}</pre>
        ) : (
          <ul>
            {apiItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
