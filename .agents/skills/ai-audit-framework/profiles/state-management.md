# State Management Audit Profile

## Focus Areas
1. **State Ownership & Co-location**:
   - Storing local transient state in global stores (e.g. modal open state in Redux/Zustand).
   - Duplicate derived state instead of computed selectors.

2. **Mutation & Hydration**:
   - Direct state mutations instead of immutable updates.
   - Race conditions in async state updates.

## Anti-Patterns & Examples

### Example 1: Global Store for Local UI State
❌ **Bad: Global store polluted with modal toggles**
```ts
const useGlobalStore = create((set) => ({
  isSettingsModalOpen: false,
  toggleSettingsModal: () => set((state) => ({ isSettingsModalOpen: !state.isSettingsModalOpen })),
}));
```

✅ **Good: Co-located component state**
```tsx
const SettingsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};
```

### Example 2: Redundant Derived State
❌ **Bad: Storing filtered list in state**
```tsx
const [items, setItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);
```

✅ **Good: Computed on the fly**
```tsx
const [items, setItems] = useState([]);
const [filter, setFilter] = useState('');
const filteredItems = useMemo(() => items.filter(i => i.name.includes(filter)), [items, filter]);
```
