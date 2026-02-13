import type { PropsWithChildren } from 'react';

type AdvancedDrawerProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;

export function AdvancedDrawer({ open, onClose, children }: AdvancedDrawerProps) {
  return (
    <aside className={`advanced-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="advanced-header">
        <strong>Advanced</strong>
        <button onClick={onClose}>Close</button>
      </div>
      {children}
    </aside>
  );
}
