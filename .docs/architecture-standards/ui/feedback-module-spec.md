# Engineering Standard: Toast & Feedback Module Architecture

> [!NOTE]
> Defines the architectural specification, directory layout, decomposition rules, API contract standards, and design token integration for feedback primitives (`Toast`, `Skeleton`, `EmptyState`, `InlineError`, `ErrorBoundary`, `PullToRefreshIndicator`).

---

## 1. Core Engineering Principles

### 1.1 Semantic Purpose
Feedback primitives inform users about system status, background events, async progress, or error states without blocking application flow:
- **Toast**: Transient overlay notification (success, error, warning, info) with glassmorphism or token styling and auto-dismiss lifecycle.
- **Skeleton**: Visual shimmer placeholder indicating pending async data loading across cards, lists, or tables.
- **EmptyState**: Informative fallback UI rendered when lists or datasets return empty.
- **InlineError**: Form/field-level inline error text and icon display.
- **ErrorBoundary**: Fallback UI wrapper catching render-phase React errors to prevent blank screens.
- **PullToRefreshIndicator**: Scroll-driven loading indicator for manual refresh gestures.

---

## 2. Module Architecture

```
src/components/ui/Feedback/
├── index.js                     # Barrel export for Toast, Skeleton, EmptyState, InlineError
├── FeedbackStyles.js            # Shared layout styles for feedback elements
├── useFeedbackTheme.js          # Shared theme resolution hook
├── PullToRefreshIndicator.js    # Component for pull-to-refresh interactions
├── Toast/
│   ├── index.js                 # Public Toast export
│   ├── ToastView.js             # Core presentational overlay component
│   ├── ToastStyles.js           # Dynamic style map factory (glassmorphism/tokens)
│   ├── useToastTheme.js         # Theme & variant color mapper
│   └── useToastAnimation.js     # Slide & fade animated drivers
├── Skeleton/
│   ├── SkeletonLoader.js        # Shimmering loader component
│   └── SkeletonStyles.js        # Skeleton shape factories
├── EmptyState/
│   ├── EmptyState.js            # Empty list/search view component
│   └── EmptyStateStyles.js      # Layout & icon style map
├── InlineError/
│   ├── FieldError.js            # Field error component
│   └── FieldErrorStyles.js      # Text & icon style map
└── ErrorBoundary/
    ├── ErrorBoundary.js         # React ErrorBoundary component
    └── FallbackView.js          # Default error screen layout
```

---

## 3. Design Token & Theme Integration

- **Colors**: `colors.statusSuccess`, `colors.statusError`, `colors.statusWarning`, `colors.accent`.
- **Surface**: `colors.surfaceDark`, `colors.glassBackground`, `colors.borderLight`.
- **Radii**: `layout.radii.md`, `layout.radii.full`.
- **Motion**: `motion.toast.slideDuration` (250ms), `motion.toast.springFriction` (8).
