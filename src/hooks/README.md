# Hooks Overview

This directory contains React hooks that encapsulate business logic, state management, and data fetching for the Pigment Shop application.

## Core Infrastructure Hooks

### useSessionState
Cross-platform state persistence hook that syncs with storage across navigations and reloads on both Web and Native mobile targets.

**Purpose:** Provides persistent state management with versioning and migration support.

**Dependencies:** `crossPlatformStorage`

**Key Features:**
- Versioned storage with migration support
- Cross-platform (Web/React Native) compatibility
- Automatic cleanup when state is undefined

---

### useGridLayout
Computes responsive grid layout dimensions based on device type.

**Purpose:** Calculates grid columns, card widths, and responsive breakpoints for product displays.

**Dependencies:** `layout` theme tokens

**Returns:** `{ isWide, cols, cardWidth, cardMargin, gridWidth }`

---

## Data & Firestore Hooks

### useProfile
Manages user profile data from Firestore.

**Purpose:** Loads and saves user profile information with Google Auth fallback.

**Dependencies:** `firebase/firestore`, `COLLECTIONS`, `db`

**Returns:** `{ profile, loading, saving, saveProfile }`

**Related:** Used by `useProfileForm`

---

### useOrders
Subscribes to current user's orders from Firestore in real-time.

**Purpose:** Provides real-time order list with automatic sorting by creation date.

**Dependencies:** `firebase/firestore`, `db`, `COLLECTIONS`

**Returns:** `{ orders, loading }`

**Related:** Used with `useOrdersPagination`

---

### useFavorites
Manages user's favorite products with Firestore sync.

**Purpose:** Provides favorite products list with toggle functionality.

**Dependencies:** `AuthContext`, `favoritesRepository`

**Returns:** `{ favorites, toggleFavorite, isFavorite }`

**Related:** Used by `useProductActions`

---

### useReviewsState
Manages product reviews and questions with Firestore real-time sync.

**Purpose:** Handles reviews and questions state with submission and real-time updates.

**Dependencies:** `firebase/firestore`, `ThemeContext`, `ToastContext`, `COLLECTIONS`, `db`

**Returns:** Reviews/questions state and submission handlers

**Related:** Used by `useProductPageState`

---

## Catalog & Product Hooks

### usePaginatedCatalog
Manages paginated catalog with server-side pagination and client-side fallback.

**Purpose:** Handles catalog pagination with automatic fallback to client-side filtering when server pagination is unavailable.

**Dependencies:** `CatalogContext`, `ToastContext`, `catalogPageService`, `useCatalogFilters`

**Returns:** `{ currentPageProducts, currentPage, totalPages, totalCount, loading, nextPage, prevPage, triggerKey }`

**Related:** Uses `useCatalogFilters` for client-side fallback

---

### useCatalogFilters
Encapsulates filter state and derives filtered + sorted product list.

**Purpose:** Manages catalog filters (price, stock, category) and sort state with session persistence.

**Dependencies:** `CatalogContext`, `useSessionState`, `catalogPageService`, `pricing`, `sorting` utils

**Returns:** Filter state, sort state, and handler functions

**Related:** Used by `usePaginatedCatalog`

---

### useCatalogLayout
Computes responsive catalog layout dimensions.

**Purpose:** Calculates grid columns, card widths, and responsive breakpoints for catalog page.

**Dependencies:** `react-native`, `layout` tokens, `layoutUtils`

**Returns:** `{ isNarrow, gridWidth, cols, cardWidth }`

---

### useProductPageState
Composes product page state from multiple hooks.

**Purpose:** Aggregates product page state including actions, reviews, and navigation.

**Dependencies:** `expo-router`, `AuthContext`, `CatalogContext`, `useReviewsState`, `useGridLayout`, `useProductActions`, `useProfile`

**Returns:** Complete product page state and handlers

**Related:** Composes `useReviewsState`, `useGridLayout`, `useProductActions`, `useProfile`

---

### useProductActions
Manages product-specific actions (add to cart, favorites).

**Purpose:** Handles cart addition and favorite toggling for a product.

**Dependencies:** `CartContext`, `FavoritesContext`, `ToastContext`

**Returns:** `{ onAddToCart, isFavorite, onToggleFavorite, qty, decreaseQty, increaseQty }`

**Related:** Used by `useProductPageState`

---

## Cart & Checkout Hooks

### useCart
Manages shopping cart state with session persistence.

**Purpose:** Handles cart items, quantities, and total calculations with sessionStorage sync.

**Dependencies:** `useSessionState`

**Returns:** `{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalCount, totalPrice }`

---

## Form & UI Hooks

### useProfileForm
Manages user profile form state and persistence.

**Purpose:** Handles profile form state with automatic sync from profile data.

**Dependencies:** `ToastContext`, `useProfile`

**Returns:** `{ form, loading, saving, updateField, handleSave }`

**Related:** Uses `useProfile` for data persistence

---

### useOrdersPagination
Paginates orders list.

**Purpose:** Simple client-side pagination for orders array.

**Dependencies:** None (pure state)

**Returns:** `{ currentPage, totalPages, paginatedOrders, setCurrentPage, goToPrevPage, goToNextPage }`

**Related:** Used with `useOrders`

---

### useSort
Canonical sort state hook (reference implementation).

**Purpose:** Provides standard sort state interface used across the application.

**Dependencies:** None

**Returns:** `{ sortField, setSortField, sortDirection, setSortDirection, handleSort }`

**Related:** Interface matched by `useCatalogFilters`

---

## Hook Dependencies Graph

```
useSessionState (infrastructure)
├── useCatalogFilters
├── useCart
└── (other session-persisted hooks)

useProfile
└── useProfileForm

useOrders
└── useOrdersPagination

useFavorites
└── useProductActions

useReviewsState
└── useProductPageState

useGridLayout
└── useProductPageState

useProductActions
└── useProductPageState

useCatalogFilters
└── usePaginatedCatalog

usePaginatedCatalog
└── Catalog page components

useProductPageState
└── Product page components
```

## Common Patterns

### Composition Pattern
Several hooks compose other hooks to provide aggregated state:
- `useProductPageState` composes `useReviewsState`, `useGridLayout`, `useProductActions`, `useProfile`
- `usePaginatedCatalog` uses `useCatalogFilters` for client-side fallback

### Session Persistence
Hooks that persist state across sessions use `useSessionState`:
- `useCatalogFilters` (filters and sort key)
- `useCart` (cart items)

### Firestore Real-time Sync
Hooks that subscribe to Firestore collections:
- `useOrders` (orders collection)
- `useFavorites` (favorites collection)
- `useReviewsState` (reviews/questions subcollections)
- `useProfile` (users collection)

### Canonical Interfaces
- `useSort` defines the standard sort interface (`sortField`, `sortDirection`, `handleSort`)
- `useCatalogFilters` implements this interface for catalog sorting

---

## Usage Patterns

### Hook Composition

**When to compose hooks:**
- When a component needs state from multiple domains (e.g., product page needs reviews, layout, and actions)
- When creating a higher-level abstraction for complex UI sections
- When multiple hooks share common dependencies

**Example:**
```javascript
// useProductPageState composes multiple hooks for a single responsibility
const productPageState = useProductPageState({ initialProduct, onBack });
// Returns aggregated state from useReviewsState, useGridLayout, useProductActions, useProfile
```

**Best practices:**
- Keep composed hooks focused on a single UI section or feature
- Pass through only necessary props to composed hooks
- Document the composition in the hook's JSDoc

---

### Session Persistence Pattern

**When to use `useSessionState`:**
- State that should survive page navigations (filters, cart items)
- User preferences that don't require authentication
- Temporary state that should persist across reloads

**Example:**
```javascript
// Persist filters across navigation
const [filters, setFilters] = useSessionState('catalog_filters', DEFAULT_FILTERS);
```

**Best practices:**
- Use descriptive storage keys (e.g., `'catalog_filters'` not `'filters'`)
- Provide sensible defaults
- Use versioning when data structure changes
- Avoid storing large objects (prefer Firestore for heavy data)

---

### Firestore Real-time Sync Pattern

**When to use Firestore subscriptions:**
- Data that changes frequently and needs real-time updates
- User-specific data (orders, favorites, profile)
- Collaborative features (reviews, questions)

**Example:**
```javascript
// Real-time orders subscription
const { orders, loading } = useOrders(user);
```

**Best practices:**
- Always handle the unauthenticated case (return empty state)
- Clean up subscriptions in useEffect cleanup
- Sort data client-side for consistent ordering
- Handle permission errors gracefully (log warnings, don't crash)

---

### Canonical Interface Pattern

**When to implement canonical interfaces:**
- When multiple hooks provide similar functionality (e.g., sorting)
- When creating reusable UI components that need to work with different data sources
- When standardizing behavior across the application

**Example:**
```javascript
// All sort hooks should match this interface
const { sortField, sortDirection, handleSort } = useSort();
const { sortField, sortDirection, handleSort } = useCatalogFilters();
```

**Best practices:**
- Document the canonical interface in a reference hook (e.g., `useSort`)
- Match the interface exactly in implementing hooks
- Use the same parameter and return value names

---

## Best Practices

### 1. Keep Hooks Focused
Each hook should have a single, clear responsibility. If a hook is doing too much, consider splitting it.

### 2. Provide Loading States
For async operations (Firestore, API calls), always return a loading state so the UI can show appropriate feedback.

### 3. Handle Errors Gracefully
Use try-catch for async operations and provide user feedback via toast notifications or console warnings.

### 4. Use Descriptive Names
Hook names should clearly indicate what they manage:
- ✅ `useProductPageState` - clear purpose
- ❌ `useData` - too vague

### 5. Document with JSDoc
All exported hooks should have JSDoc comments describing:
- Purpose
- Parameters with types
- Return values with types
- Usage examples when helpful

### 6. Optimize with useCallback/useMemo
Memoize callbacks and computed values to prevent unnecessary re-renders, especially when hooks are used in frequently-rendering components.

### 7. Handle Null/Undefined Cases
Always handle cases where dependencies might be null or undefined (e.g., unauthenticated user, missing product).

---

## Anti-Patterns to Avoid

### 1. Direct DOM Manipulation in Hooks
❌ Don't access DOM directly in hooks
```javascript
// Bad
export function useBadHook() {
  document.getElementById('foo').style.display = 'block';
}
```

✅ Use refs or state-driven rendering
```javascript
// Good
export function useGoodHook() {
  const [visible, setVisible] = useState(false);
  return { visible, setVisible };
}
```

### 2. Over-Composition
❌ Don't compose hooks unnecessarily
```javascript
// Bad - composing just to pass through
export function useUnnecessaryComposition() {
  const cart = useCart();
  const profile = useProfile();
  return { cart, profile };
}
```

✅ Use hooks directly in components when they're unrelated
```javascript
// Good
function MyComponent() {
  const cart = useCart();
  const profile = useProfile();
  // ...
}
```

### 3. Ignoring Cleanup
❌ Don't forget to clean up subscriptions
```javascript
// Bad - potential memory leak
export function useLeakyHook() {
  useEffect(() => {
    subscribeToData();
    // Missing cleanup
  }, []);
}
```

✅ Always return cleanup function
```javascript
// Good
export function useCleanHook() {
  useEffect(() => {
    const unsubscribe = subscribeToData();
    return unsubscribe;
  }, []);
}
```

### 4. Storing Large Objects in Session Storage
❌ Don't store large datasets in session storage
```javascript
// Bad - entire product catalog in session storage
const [catalog, setCatalog] = useSessionState('catalog', hugeProductList);
```

✅ Use Firestore for large datasets, session storage for UI state
```javascript
// Good - store filters, fetch data from Firestore
const [filters, setFilters] = useSessionState('catalog_filters', DEFAULT_FILTERS);
```

### 5. Tight Coupling to Context
❌ Don't make hooks dependent on too many contexts
```javascript
// Bad - depends on 5 different contexts
export function useOverCoupledHook() {
  const auth = useAuth();
  const theme = useTheme();
  const toast = useToast();
  const catalog = useCatalog();
  const cart = useCart();
  // ...
}
```

✅ Pass dependencies as parameters or limit to essential contexts
```javascript
// Good - clear, minimal dependencies
export function useFocusedHook(user, showToast) {
  // Only what's needed
}
```

---

## Error Handling

### Error Handling Strategy

Hooks in this application follow a consistent error handling strategy:

1. **Graceful Degradation**: When errors occur, hooks should fall back to sensible defaults rather than crashing the UI
2. **User Feedback**: Use toast notifications for user-facing errors
3. **Console Logging**: Log technical errors for debugging without exposing internals to users
4. **Loading States**: Always provide loading states to handle async operations gracefully

### Error Types and Recovery Patterns

#### 1. Firestore Errors

**Common errors:**
- `permission-denied`: User lacks access to a collection
- `unavailable`: Network or service unavailable
- `not-found`: Document doesn't exist

**Recovery pattern:**
```javascript
// Example from useOrders
const unsubscribe = onSnapshot(
  q,
  (snapshot) => {
    // Success handling
  },
  (error) => {
    console.error('[useOrders] snapshot error:', error);
    setLoading(false); // Graceful fallback
  }
);
```

**Best practices:**
- Log errors with context (hook name in brackets)
- Set loading to false to prevent infinite loading states
- Return empty/default data on error
- Don't throw errors from hooks unless critical

#### 2. Network/Service Errors

**Common errors:**
- Missing Firestore indexes (for complex queries)
- Network timeouts
- Service unavailable

**Recovery pattern:**
```javascript
// Example from usePaginatedCatalog
async function loadInitialData() {
  setLoading(true);
  try {
    const { pageData, count } = await loadServerPage(filters, sortKey, null, pageSize);
    applyServerPage(pageData, count);
  } catch (error) {
    if (isMissingIndexError(error)) {
      setClientFallback(true); // Fallback to client-side
      setCurrentPage(1);
    } else {
      showToast('Error loading paginated catalog'); // User feedback
    }
  } finally {
    setLoading(false);
  }
}
```

**Best practices:**
- Detect specific error types for targeted recovery
- Implement fallback strategies (client-side filtering, cached data)
- Show user-friendly error messages via toast
- Always clear loading state in finally block

#### 3. Validation Errors

**Common errors:**
- Invalid user input
- Missing required fields
- Data type mismatches

**Recovery pattern:**
```javascript
// Example from useProfileForm
const handleSave = async () => {
  try {
    await saveProfile(form);
    showToast(t('profileSaveSuccess') || 'Profile saved successfully', 'success');
  } catch {
    showToast(t('profileSaveError') || 'Failed to save profile', 'error');
  }
};
```

**Best practices:**
- Validate before async operations
- Show specific error messages
- Preserve form state on error
- Allow retry without data loss

#### 4. Authentication Errors

**Common errors:**
- User not authenticated
- Session expired
- Permission denied

**Recovery pattern:**
```javascript
// Example from useProfile
useEffect(() => {
  if (!user) {
    setProfile(EMPTY_PROFILE); // Graceful fallback
    setLoading(false);
    return;
  }
  // Load profile when authenticated
}, [user]);
```

**Best practices:**
- Always handle unauthenticated state
- Return empty/default state when no user
- Don't throw errors for expected auth states
- Let AuthContext handle auth flow

### Error Boundary Integration

While hooks themselves don't directly use Error Boundaries, they should be designed to work well with them:

**Guidelines for hook authors:**
1. **Don't throw for expected errors**: Use try-catch and return error states instead
2. **Provide error state**: Include error information in return values when appropriate
3. **Log errors**: Use console.error/warn for debugging
4. **Graceful fallbacks**: Return default/empty data on errors

**Example of error-safe hook:**
```javascript
export function useErrorSafeHook(user) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    
    async function loadData() {
      try {
        const result = await fetchData(user.uid);
        if (isMounted) setData(result);
      } catch (err) {
        console.error('[useErrorSafeHook] Failed:', err);
        if (isMounted) setError(err);
      }
    }

    loadData();

    return () => { isMounted = false; };
  }, [user]);

  return { data, error };
}
```

**Component-level error boundary usage:**
```javascript
// Components can wrap hook-using components in Error Boundaries
<ErrorBoundary fallback={<ErrorFallback />}>
  <MyComponentUsingHooks />
</ErrorBoundary>
```

### Error Handling Checklist

When creating or modifying hooks, ensure:
- [ ] All async operations are wrapped in try-catch
- [ ] Loading states are cleared in finally blocks
- [ ] Errors are logged with context (hook name)
- [ ] User-facing errors show toast notifications
- [ ] Unauthenticated/null cases are handled
- [ ] Subscriptions are cleaned up on error
- [ ] Fallback data is provided on errors
- [ ] useEffect cleanup prevents memory leaks
