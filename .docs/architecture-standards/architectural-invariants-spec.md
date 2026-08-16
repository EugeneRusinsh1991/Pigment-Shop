# Architectural Invariants

> [!NOTE]
> Immutable architectural rules and constraints that guarantee system integrity and maintainability.

---

## 1. UI Layer Constraints
- **Zero Business Logic in Primitives**: Components in `src/components/ui/` must not contain API calls, data mutations, or context subscriptions (except `ThemeContext` via `useThemeUtils`).
- **Strict Style Factory Usage**: Inline styles are forbidden. All styling must be generated via `[Component]Styles.js` style maps leveraging the centralized theme tokens.

## 2. State & Data Constraints
- **Immutable Contexts**: Data exposed by global Context providers must be treated as immutable by consumers. Mutations must occur exclusively through provided action dispatches.
- **No Circular Dependencies**: Feature modules must not import from other feature modules. Shared logic must be extracted to `src/components/domain/` or `src/hooks/`.

## 3. Security & Access Constraints
- **Enforced RBAC**: Admin-level mutations must always be guarded by `checkIsAdmin` and verified on the server-side rules.
- **Isolated Visitor State**: Anonymous technical visitor sessions must never leak into or merge with authenticated registered user state.

## 4. Error Handling Constraints
- **Service Contract Wrapping**: All async operations in `src/services/` must be wrapped in `withServiceContract` to guarantee structured error returns and prevent unhandled promise rejections.
