# Performance Audit Profile

## Focus Areas

### Rendering Performance
- Unnecessary component re-renders.
- Missing React.memo where beneficial.
- Missing useMemo/useCallback causing unstable references.
- Inline object, array, and function creation inside render.
- Expensive computations executed during rendering.

### State Update Efficiency
- Top-level state causing excessive subtree re-renders.
- Overly broad Context updates.
- Poor selector granularity.
- Derived state stored instead of computed.
- Unnecessary synchronization between multiple state sources.

### List Rendering & Virtualization
- Large collections rendered without virtualization.
- Missing FlatList / VirtualList / virtualization libraries.
- Missing stable keys.
- Missing getItemLayout or estimated item sizes.
- Nested virtualized lists.
- Expensive list item rendering.

### Bundle Size & Code Splitting
- Heavy synchronous imports.
- Missing route-level lazy loading.
- Large modal/dialog bundles loaded eagerly.
- Poor tree shaking.
- Monolithic utility imports.
- Unused dependencies increasing bundle size.

### Network Performance
- Duplicate API requests.
- Missing request deduplication.
- Missing caching.
- Missing pagination or incremental loading.
- Over-fetching.
- Under-fetching leading to waterfall requests.

### Images & Assets
- Oversized images.
- Missing responsive image variants.
- Missing lazy loading.
- Missing modern formats.
- Missing asset optimization pipeline.

### Memory Management
- Event listeners not cleaned up.
- Timers not cleared.
- WebSocket leaks.
- Growing caches without eviction.
- Detached DOM or retained references.

### Animation Performance
- Layout-triggering animations.
- Missing GPU acceleration.
- Missing useNativeDriver where applicable.
- Long-running animations blocking interaction.
- Animation timing inconsistencies.

### JavaScript Execution
- Long synchronous tasks.
- Expensive sorting/filtering on every render.
- Missing background processing where appropriate.
- Blocking serialization/deserialization.
- Heavy JSON parsing on main thread.

### React Hook Performance
- Incorrect dependency arrays.
- Effects firing excessively.
- Missing memoization of expensive hooks.
- Infinite render loops.
- Redundant effects.

### Storage & Persistence
- Frequent synchronous localStorage/AsyncStorage access.
- Repeated serialization.
- Missing batching of storage operations.

### Performance Monitoring
- Missing profiling instrumentation.
- Missing performance measurements.
- No render profiling of expensive components.
- Missing production performance diagnostics.

---

# Cross-Performance Requirements

When auditing **Whole Project**, the audit MUST:

- Build a project-wide performance profile.
- Detect rendering bottlenecks across feature boundaries.
- Detect repeated expensive patterns across the repository.
- Evaluate bundle composition and loading strategy.
- Identify architectural causes of unnecessary rendering.
- Prioritize issues by estimated runtime impact rather than code style.

Mandatory checks include:

- non-virtualized large lists
- unstable callback props
- unstable object props
- missing React.memo opportunities
- expensive render-time computations
- missing route lazy loading
- oversized bundles
- duplicate network requests
- missing request caching
- memory leaks
- blocking animations
- long synchronous tasks

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


