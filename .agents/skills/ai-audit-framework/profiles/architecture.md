# Architecture Audit Profile

## Focus Areas

### Coupling, Layering & Domain Isolation
- UI components executing direct API/database calls instead of consuming service/repository abstractions or custom hooks.
- Leakage of backend models into presentation layers.
- Tight coupling between unrelated domain modules.
- Missing domain boundaries and dependency inversion.

### Modularity, SRP & File Complexity
- Files exceeding 200 lines or containing multiple responsibilities.
- Long functions, deep nesting, excessive branching, and cyclomatic complexity hotspots.
- Violations of Single Responsibility Principle.
- Duplicate business logic across multiple modules.

### State Management Architecture & Data Flow
- Prop drilling across more than two component levels.
- Mixing global domain state with transient UI state.
- Side effects inside render paths.
- Derived state stored instead of computed.
- State synchronization issues between stores, contexts, and components.

### Error Handling, Boundaries & Resilience
- Missing React Error Boundaries.
- Unhandled async operations.
- Swallowed exceptions.
- Missing retry/backoff strategies where appropriate.
- Inconsistent API error normalization.

### Dependency Graph, Imports & Project Structure
- Circular dependencies.
- Deep relative imports (../../../../).
- Mixed export conventions.
- Layer violations through improper imports.
- Unused or orphaned modules.

### Data Contracts & Storage Abstractions
- Direct localStorage/AsyncStorage access from UI.
- Missing DTOs or mapper layers.
- Backend payloads consumed directly by presentation.
- Inconsistent serialization/deserialization logic.

### Performance Architecture
- Unnecessary re-renders.
- Missing memoization where justified.
- Expensive computations inside render.
- Oversized Context providers causing widespread updates.
- Missing lazy loading or code splitting opportunities.

### Security & Credential Isolation
- Hardcoded secrets or credentials.
- Client exposure of internal endpoints.
- Missing abstraction around authentication/session management.
- Unsafe storage of sensitive data.

### Configuration & Environment Separation
- Hardcoded URLs, feature flags, or environment-specific values.
- Missing centralized configuration layer.
- Environment-dependent logic scattered across modules.

### Testing Architecture
- Business logic difficult to test due to tight coupling.
- Missing separation between pure logic and framework code.
- Modules with extremely low testability.

---

# Cross-Architecture & Whole-Project Requirements

When auditing **Whole Project**, the audit MUST:

- Evaluate app/, src/, routes/, contexts/, services/, API layers, storage wrappers, shared libraries, and infrastructure as one interconnected architecture.
- Build a project-wide dependency graph before drawing conclusions.
- Detect architectural anti-patterns spanning multiple folders.
- Identify duplicated services, duplicated business logic, and parallel implementations.
- Detect inconsistent architectural patterns (routing, state management, API access, storage, dependency injection, module organization).
- Report architecture-level issues rather than isolated file-level findings.
- Prioritize systemic problems by architectural impact.
- MUST NOT split the audit into independent subsystems unless explicitly requested.

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


