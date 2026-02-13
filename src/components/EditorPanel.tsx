type EditorPanelProps = {
  code: string;
  onChange: (value: string) => void;
};

export function EditorPanel({ code, onChange }: EditorPanelProps) {
  return (
    <section className="panel editor-panel">
      <div className="panel-header">
        <h2>Editor</h2>
        <span>Ctrl+Enter to run</span>
      </div>
      <textarea
        aria-label="Sketch editor"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </section>
  );
}
