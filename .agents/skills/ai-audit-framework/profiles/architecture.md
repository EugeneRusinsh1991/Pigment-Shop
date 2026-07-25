# Architecture Audit Profile

## Focus Areas
1. **Coupling, Layering & Domain Isolation**:
   - UI components executing direct API/database calls instead of consuming service/repository abstractions or custom hooks.
   - Leakage of data models into presentational views and tight coupling between unrelated domain modules.

2. **Modularity, SRP & File Complexity**:
   - Files exceeding 200 lines or housing multiple distinct responsibilities.
   - Long functions, deeply nested conditionals, high cyclomatic complexity, and CRAP score hotspots.

3. **State Management Architecture & Data Flow**:
   - Prop drilling across >2 component levels instead of context or state stores.
   - Mixing global domain state (user, cart, auth) with local transient UI state (modals, dropdown toggles).
   - Side-effect pollution inside render cycles.

4. **Error Handling, Boundaries & Resilience**:
   - Unhandled async promises, swallowed exceptions, or missing React Error Boundaries.
   - Inconsistent API error normalization layers across services.

5. **Dependency Graph, Imports & Structure**:
   - Circular imports and deep relative path traversals (`../../../../`).
   - Inconsistent module export styles (mixed default and named exports across identical layers).

6. **Data Contracts & Storage Abstractions**:
   - Direct `localStorage` / `AsyncStorage` access inside UI components instead of unified storage wrappers.
   - Missing DTO/interface transformers between raw backend payloads and UI state objects.

7. **Security & Credential Isolation**:
   - Hardcoded secret keys, API credentials, or internal endpoints in client-side code.

8. **Cross-Architecture & Whole-Project Requirement**:
   - When auditing architecture for Whole Project, the audit MUST evaluate `app/`, `src/`, routes, contexts, API layers, and storage wrappers as a single interconnected graph.
   - MUST detect global anti-patterns (e.g. duplicate context subscriptions, mixed routing patterns between `app/` and `src/`, or direct API calls leaking into UI components) across ALL project folders simultaneously.
   - MUST NOT isolate architecture evaluation into sub-domains (like Storefront vs Admin) when scope is set to Whole Project.

## Anti-Patterns & Examples

### Example 1: Layer Leakage (Direct Fetch & Local Storage in UI View)
❌ **Bad: Direct fetch and direct localStorage access in presentational component**
```tsx
const UserProfile = () => {
  useEffect(() => {
    fetch('/api/user', { headers: { token: localStorage.getItem('token') } })
      .then(res => res.json()).then(setUser);
  }, []);
  return <div>{user.name}</div>;
};
```

✅ **Good: Architectural layering via hooks & repository abstraction**
```tsx
const UserProfile = () => {
  const { user, loading } = useUser();
  return <UserCard user={user} loading={loading} />;
};
```

### Example 3: Direct Storage Access vs Encapsulated Hook/Storage Wrapper
❌ **Bad: Direct window.localStorage reads inside presentational UI view**
```tsx
const ThemeToggle = () => {
  const theme = localStorage.getItem('app_theme') || 'light';
  const toggle = () => localStorage.setItem('app_theme', theme === 'light' ? 'dark' : 'light');
  return <button onClick={toggle}>{theme}</button>;
};
```

✅ **Good: Centralized ThemeContext hook abstraction**
```tsx
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  return <Button title={isDark ? 'Light' : 'Dark'} onPress={toggleTheme} />;
};
```

### Example 4: Deep Relative Imports vs Clean Module Aliases
❌ **Bad: Fragile deep directory traversal**
```tsx
import { CrossIcon } from '../../../components/Icons/CrossIcon';
import { colors } from '../../../../theme/tokens';
```

✅ **Good: Configured path aliases**
```tsx
import { CrossIcon } from '@/components/Icons';
import { colors } from '@/theme/tokens';
```


