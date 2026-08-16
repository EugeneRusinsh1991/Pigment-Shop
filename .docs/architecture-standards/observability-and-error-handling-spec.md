# Architecture Specification: Observability & Error Handling

> [!NOTE]
> Specification for centralized error boundary fallbacks, toast alerts, error logging (`useErrorHandler`), and audit verification tools.

---

## 1. Domain Responsibility

Ensures all runtime exceptions are caught, logged, cleanly reported to users without breaking application flow, and verified by code auditors.

---

## 2. Error Boundary Hierarchy (`ErrorBoundary/`)

React Error Boundaries intercept visual rendering failures:
- **`StorefrontErrorBoundary`**: Catches presentational errors within storefront features, displaying a fallback UI card while preserving app navigation headers.
- **`AdminErrorBoundary`**: Protects admin screens from crashing the back-office environment.

---

## 3. Centralized Error Handling (`useErrorHandler.js`)

Custom hook standardizing runtime error processing across async functions:
- Converts unknown exceptions into unified error messages.
- Dispatches toast notifications via `ToastContext` for user feedback.
- Logs detailed traces to telemetry/console for developer diagnostics.

---

## 4. Service Contract Wrappers (`serviceContract.js`)

Async service operations must be wrapped using `withServiceContract`:
- Guarantees consistent return shapes (`{ success: true, data }` vs `{ success: false, error }`).
- Prevents uncaught promise rejections from propagating unhandled.
