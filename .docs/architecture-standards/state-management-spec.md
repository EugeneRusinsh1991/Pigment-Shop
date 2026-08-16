# Architecture Specification: Application State Management

> [!NOTE]
> Defines React Context boundaries, custom hook composition rules, reactive sub-managers (`adminCatalogState`), and local component state rules.

---

## 1. Overview & State Taxonomy

State in PigmentShop is categorized into four distinct layers based on lifetime and scope:
1. **Global App Context**: Persists across the entire application lifecycle (Auth, Theme, Toast, Language).
2. **Reactive Service Sub-Managers**: Stateful singleton state objects (`adminCatalogState`) decoupling fast, dirty-tracked draft mutations from global re-renders.
3. **Custom Domain Hooks**: Composition layer encapsulating domain business logic (`useCartLogic`, `useCheckoutLogic`, `useAdminDrafts`).
4. **Local Component State**: Ephemeral UI state bound strictly to a single presentational component (`useState`, `useRef`).

---

## 2. React Context Boundaries (`src/context/`)

All global providers are consolidated within `AppProviders.js` to ensure deterministic hydration order:
- `ThemeProvider`: Resolves dark/light theme tokens.
- `AuthProvider`: Encapsulates user session, login/logout functions, and token state.
- `ToastProvider`: Manages transient notification toasts across screens.
- `LanguageProvider`: Exposes internationalization locale switching (`en`, `ru`).

---

## 3. Reactive Sub-Managers (`adminCatalogState.js`)

For domains requiring rapid mutations without full Context subtree re-rendering:
- Implements external store subscription mechanics (`useSyncExternalStore`).
- Tracks draft edits in memory before committing to persistent storage (`catalogStore`).
- Exposes explicit `isDirty` tracking to drive UI actions (`AdminSaveFooter`).

---

## 4. Custom Hook Composition

- Hooks must remain presentation-agnostic and return clean memoized state interfaces.
- Custom hooks compose lower-level hooks (`useThemeUtils`, `useHaptics`) and service APIs rather than reaching directly into raw global state.
