# Performance Audit Profile

## Focus Areas
1. **Render Optimization & Memoization**:
   - Inline object/array instantiations and arrow functions inside JSX props bypassing `useMemo` and `useCallback`.
   - Missing `React.memo` on list item renders and heavy presentational leaves.
   - Unnecessary top-level state updates triggering cascading sub-tree re-renders.

2. **List Virtualization & Heavy Collections**:
   - Un-virtualized mapping (`items.map(...)`) over large datasets (>20 items) instead of `FlatList` / `VirtualList`.
   - Missing `getItemLayout` or unstable `keyExtractor` functions.

3. **Code Splitting & Bundle Size Control**:
   - Synchronous top-level imports of heavy routes, admin screens, or modal dialogs instead of dynamic `React.lazy` / `import()`.
   - Importing monolithic libraries (`import _ from 'lodash'`, `import * as Lucide`) without tree-shaking.

4. **Animations & Main Thread (UI/JS) Protection**:
   - Animating non-GPU layout properties (`width`, `height`, `top`, `left`, `margin`) instead of `transform` / `opacity`.
   - React Native animations missing `useNativeDriver: true`.
   - Heavy synchronous computations (sorting, filtering large lists) blocking the JS event loop.

5. **Memory Management & Subscription Cleanup**:
   - Uncleaned `setInterval`, `setTimeout`, event listeners, or WebSocket subscriptions in `useEffect` cleanup handlers.
   - Retaining detached DOM nodes or unbounded memory caches.

6. **Asset & Image Optimization**:
   - Un-scaled raw high-resolution images, missing webp/avif formats, or missing lazy-loading flags (`loading="lazy"`).

7. **Network Request Efficiency & Caching**:
   - Duplicate un-debounced API calls during typing/scrolling.
   - Missing caching strategies (SWR / React Query / stale-while-revalidate) for static entity queries.

8. **Cross-Performance Audit Requirement**:
   - Mandatory codebase scan for un-virtualized list mapping, missing `useNativeDriver`, un-memoized callback props in lists, and non-lazy route imports.

## Anti-Patterns & Examples

### Example 1: Inline Callbacks & Un-virtualized Large Lists
❌ **Bad: Inline callback and raw mapping over large arrays**
```tsx
const ProductList = ({ items, onSelect }) => (
  <div>
    {items.map(item => (
      <Card key={item.id} onClick={() => onSelect(item.id)} style={{ margin: 10 }} />
    ))}
  </div>
);
```

✅ **Good: Virtualized list with stable callbacks & memoized styles**
```tsx
const renderItem = useCallback(({ item }) => (
  <MemoizedCard item={item} onSelect={onSelect} />
), [onSelect]);

<FlatList data={items} renderItem={renderItem} keyExtractor={item => item.id} />;
```

### Example 3: Uncleaned Event Listener / Timer Memory Leak
❌ **Bad: Missing cleanup function in useEffect**
```tsx
useEffect(() => {
  const timer = setInterval(() => fetchLatestData(), 5000);
  // Missing clearInterval -> Memory leak on unmount!
}, []);
```

✅ **Good: Explicit subscription cleanup**
```tsx
useEffect(() => {
  const timer = setInterval(() => fetchLatestData(), 5000);
  return () => clearInterval(timer);
}, [fetchLatestData]);
```

### Example 4: Monolithic Import vs Dynamic Code Splitting
❌ **Bad: Synchronous top-level import of heavy administrative modal**
```tsx
import HeavyAdminModal from './HeavyAdminModal';
```

✅ **Good: Dynamic lazy import with suspense placeholder**
```tsx
const HeavyAdminModal = React.lazy(() => import('./HeavyAdminModal'));
```


