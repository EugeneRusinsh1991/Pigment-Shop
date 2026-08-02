# Hooks Overview

This directory contains React hooks that encapsulate business logic, state management, UI dimensions, animations, and data fetching for the Pigment Shop application.

## Core Infrastructure Hooks

### `useSessionState`
Cross-platform state persistence hook that syncs with storage across navigations and reloads (Web/Native).
- **Dependencies:** `crossPlatformStorage`, `storageService`

### `useErrorHandler`
Centralized error handling and reporting pipeline.

---

## UI Layout & Dimension Hooks

### `useVisualViewportDimensions`
Provides exact viewport heights for responsive layouts, correcting mobile browser UI chrome shifts.

### `useGridLayout`
Computes responsive grid layout dimensions based on device type (mobile vs tablet/desktop).

### `useCardDimensions`
Calculates fixed ratios and dimensions for card layouts.

### `useCatalogLayout`
Computes responsive catalog layout dimensions.

### `useUnifiedCardGrid`
Provides logic for rendering a unified set of card items in grid or list formats.

---

## Animation & Gesture Hooks

### `useInteractionAnimation`
Manages spring sequence and timing fade values for button press interactions.

### `useAnimatedTransition`
Handles generic page-level or component transition animations.

### `useDropdownAnimation`
Handles slide-down and fade-in for dropdown menus.

### `useSlideAnimation`
Manages general slide enter/exit animations.

### `useHaptics`
Exposes trigger functions for physical device haptic feedback using `hapticsService`.

### `usePullToRefresh`
Scroll-driven pull-to-refresh offset logic and trigger state.

### `useHomeScrollHide`
Scroll direction tracking to auto-hide navigation headers or tab bars on scroll.

### `useCarouselState`
State management for image carousels and gallery indicators.

---

## Catalog & Filtering Hooks

### `useCatalogFilters`
Encapsulates filter state (price, categories, toggles) and derives filtered list.

### `usePaginatedCatalog`
Manages catalog pagination with server-side page fetching and client-side fallback.

### `useFilterCounts`
Computes total active filters applied.

### `usePriceRangeSlider`
Manages multi-thumb slider state for price filtering.

### `useSort`
Canonical standard sort state interface (`sortField`, `sortDirection`).

---

## Feature & Product Hooks

### `useProductPageState`
Composes product page state (actions, reviews, grid).

### `useProductActions`
Manages product-specific actions (add to cart, toggle favorites).

### `useProductNavigation`
Handles routing between product detail pages and catalog.

### `useReviewsState`
Manages product reviews and questions with Firestore real-time sync.

### `useCartLogic`
Manages shopping cart items, calculation totals, and persistence.

### `useCheckoutLogic`
Manages the checkout multi-step flow state and submission.

---

## Form & Account Hooks

### `useForm`
Generic form state, validation, and submission handler.

### `useFormModal`
Manages form state wrapped in a modal dialog.

### `useProfileForm`
Manages user profile form state and persistence.

### `useAuthValidation`
Validates authentication credentials and session policies.

### `useOrdersPagination`
Client-side pagination for orders array.

### `useDeleteConfirmation`
Handles multi-step confirmation state for delete operations.

---

## Hook Dependencies Graph

```
useSessionState (infrastructure)
├── useCatalogFilters
├── useCartLogic
└── useSort

useGridLayout
└── useProductPageState

useProductActions
└── useProductPageState

useCatalogFilters
└── usePaginatedCatalog
```

## Error Handling & Graceful Degradation
All hooks interacting with external services (Firebase, APIs, Storage) must implement graceful degradation. When errors occur, hooks should fall back to sensible defaults (e.g. empty arrays, default objects) rather than crashing the UI, and utilize `useErrorHandler` or `ToastContext` for user feedback.
