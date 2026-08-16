# Engineering Standard: Scroll Subsystem Architecture

> [!NOTE]
> This engineering standard defines the architecture, physics, and component integrations for scroll-driven behaviors (auto-hiding headers and pull-to-refresh) across PigmentShop.

---

## 1. Core Engineering Principles

### 1.1 Semantic Purpose
The Scroll Subsystem manages advanced scroll interactions that require cross-platform consistency and gesture normalization without impacting core scrolling performance.

### 1.2 Gestural Interactions
- **Auto-Hide Chrome**: Dynamically collapses top navigation bars or bottom tab bars during downward scrolling to maximize viewport reading space, and restores them instantly upon upward scrolling.
- **Pull-To-Refresh**: Provides a standardized resistance physics model and visual indicator for manual data refresh operations at the top of scrollable lists.

---

## 2. Standard Architecture & Implementation

```
src/
├── hooks/
│   ├── useHomeScrollHide.js             # Scroll direction tracking and animated translation values
│   └── usePullToRefresh.js              # Pull offset math and gesture state manager
└── components/
    └── ui/
        └── Feedback/
            └── PullToRefreshIndicator.js # Visual spinner tied to pull state
```

---

## 3. Auto-Hide Chrome (`useHomeScrollHide`)

### 3.1 Mechanism
The system tracks `deltaY` changes via touch events (`touchstart`, `touchmove`, `wheel`) on Web, isolating the scroll intent from the scroll position. 

### 3.2 Constants & Thresholds
- **`HIDE_HEIGHT`**: Fixed `60px` translation offset.
- **`DIRECTION_THRESHOLD`**: Fixed `4px` accumulated delta buffer. Prevents micro-jitters or unintended hides during slight thumb movements.

### 3.3 Overlay Bounding
Scroll events triggered inside overlays (`#app-drawer`, `[role="dialog"]`) are ignored via `closest()` checks to prevent the background shell from hiding while a modal is open.

---

## 4. Pull-to-Refresh (`usePullToRefresh`)

### 4.1 Usage
All scrollable views that fetch external data must implement pull-to-refresh if natively supported. For lists, pass the `onRefresh` prop to the `UnifiedCardGrid` which handles the integration internally.

### 4.2 State Machine
The pull gesture transitions through three states:
1. **Pulling**: User dragging down, offset `< REFRESH_THRESHOLD`.
2. **Ready**: Offset `>= REFRESH_THRESHOLD`, haptic feedback fires.
3. **Refreshing**: Gesture released, async `onRefresh` promise executing, indicator spins.

### 4.3 Native vs Web Abstraction
- On Native iOS/Android, the system delegates to the platform's native `RefreshControl`.
- On Web, `usePullToRefresh` attaches DOM touch listeners and computes spring resistance physics to simulate the native rubber-band effect.

---

## 5. Compliance Checklist

- [ ] Components use `usePullToRefresh` directly or pass `onRefresh` to `UnifiedCardGrid`.
- [ ] No direct implementations of `window.addEventListener('scroll')` in UI components for hiding elements.
- [ ] Ensure `useHomeScrollHide` is disabled (`disabled=true`) when modal overlays are active to prevent background jumping.
