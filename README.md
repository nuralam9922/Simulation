# LumaLab Studio — React UX Blueprint

LumaLab Studio is a React-based, browser-native LED animation simulator and Arduino-style sketch editor focused on **best UI + best UX**.

This version defines a product direction where:

- Most core workflows happen on **one primary screen**.
- Advanced controls are hidden behind **progressive disclosure** (UI abstraction layers).
- Extra complexity appears only when relevant, at the right time, with clear intent.

---

## 1) UX Vision: "One-Screen First"

The default experience should let a user do the following without navigation:

1. Write/edit sketch code
2. Run/stop execution
3. See LED output
4. Read console/runtime feedback
5. Adjust core simulation settings

Everything above lives in one cohesive workspace.

### Primary Goal

Reduce cognitive load while preserving power:

- Beginners get a clean, uncluttered interface.
- Advanced users can reveal deeper controls on demand.

---

## 2) Design Method: Progressive Disclosure (UI Abstraction)

Use a 3-layer UI model so complexity is introduced gradually.

### Layer A — Essential (Always Visible)

- Code editor
- Run / Stop / Reset
- LED simulator preview
- Minimal console (latest outputs)
- Runtime status pills (running, loop rate, last run)

### Layer B — Contextual (Shown When Needed)

- Inline suggestions and quick fixes when errors occur
- Expanded console when logs exceed threshold
- Performance indicators only while running
- LED detail panel when an LED is selected

### Layer C — Advanced (Hidden by Default)

- Runtime guards/timers
- Worker tuning and diagnostics
- Theme personalization
- API deep docs
- Experimental simulator modules

Access pattern:

- Drawers, popovers, command palette, and "Advanced" toggles.
- Never overload the base canvas.

---

## 3) Best-Practice Layout (Single Main Screen)

### Desktop

- **Top Bar**: Brand, run controls, status pills, global search/command
- **Main Split**:
  - Left: Editor + inline diagnostics
  - Right: LED simulator + compact telemetry
- **Bottom Dock** (collapsible): Console / Problems / Docs tabs

### Tablet/Mobile

- Single-column stack with sticky run controls
- Bottom sheet for simulator or console focus mode
- Large touch targets (minimum 44x44)

---

## 4) React Architecture for UX Quality

### Stack

- React 18 + TypeScript
- Vite
- CodeMirror 6
- Web Worker runtime
- CSS variables + design tokens

### Component Model

- `AppShell`
- `TopBar`
- `EditorWorkspace`
- `SimulatorWorkspace`
- `BottomDock`
- `CommandPalette`
- `SmartDrawer` (shared abstraction for advanced panels)

### State Strategy

- Global app state for layout/runtime/session
- Feature-local state for editor/simulator internals
- Persisted preferences in localStorage (layout, theme, LED count)

---

## 5) Smart Reveal Rules (When to Show Hidden UI)

The UI should reveal advanced elements only under explicit conditions:

- Show "Fix suggestions" only after parser/runtime errors.
- Show runtime profiler only if loop rate is unstable or user opens diagnostics.
- Show advanced simulator controls only after user enables "Pro Mode".
- Show docs panel inline only when user requests help (`F1` or command palette).

This keeps the default canvas focused and fast.

---

## 6) UX Quality Standards

### Clarity

- Max 5–7 high-priority actions visible at once.
- Plain-language labels.
- Strong hierarchy and spacing.

### Speed

- First interactive paint fast (avoid heavy unused bundles).
- Worker isolation to keep UI responsive under bad sketches.
- Debounced persistence and minimal re-renders.

### Feedback

- Immediate run/stop state updates.
- Timestamped console logs.
- Visible execution health indicators.

### Accessibility

- Full keyboard navigation
- Proper ARIA semantics
- High-contrast mode
- Scalable typography and contrast-safe colors

---

## 7) Runtime UX + Safety

Execution must never block control affordances.

- Run transformed code in Web Worker.
- Hard terminate worker on stop.
- Watchdog timeout and loop safety delay.
- Tokenized sessions to ignore stale events.

Result: even runaway sketches cannot freeze the interface.

---

## 8) Feature Exposure Strategy

Keep popular features one-click away; hide rare settings behind abstractions.

### Always-on Features

- Edit, run, stop, import/export, LED count, latest console output

### Secondary Features (Quick Access)

- Snippets, autocomplete, presets, docs search

### Advanced Features (Abstracted)

- Runtime internals, diagnostics, custom themes, experimental modules

Use command palette + drawers so advanced power exists without visual noise.

---

## 9) Suggested Delivery Roadmap

1. Build one-screen shell and split layout
2. Integrate CodeMirror and ergonomic editing controls
3. Move execution to worker runtime
4. Add bottom dock (console/problems/docs)
5. Implement progressive disclosure rules + Pro Mode
6. Polish accessibility and mobile interactions

---

## 10) Product Principle

**"Simple by default, powerful on demand."**

LumaLab Studio should feel approachable in 30 seconds, yet scale to advanced workflows through progressive, context-aware UI abstraction.
