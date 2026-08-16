# Service Specification: Auth & RBAC

> [!NOTE]
> Specification for identity management, Role-Based Access Control (RBAC), Firebase Auth adapter, and policy decoupling.

---

## 1. Domain Responsibility

Manages user identity, authentication, session state, and permission boundaries within the application.

## 2. Auth Service (`authService.js`)

Acts as an adapter over the underlying `authRepository`. Exposes a unified contract for authentication commands:
- **Methods**: `subscribeToAuthChanges`, `login`, `register`, `signInWithGoogle`, `logout`.
- **Service Contract**: All mutation operations are wrapped in `withServiceContract` to guarantee standardized error handling and response structure.
- **Singleton Pattern**: Exported as a singleton `authService` object and as individual functions.

## 3. Auth Policy & Decoupling (`authPolicy.js`)

Decouples core business logic from technical authentication artifacts (e.g., handling guest/anonymous accounts):
- **Technical Visitors**: `isVisitorUser()` identifies guest accounts (via `isAnonymous`, `isGuest`, or explicit `visitor@pigment-shop.com` matching).
- **Storefront Authentication**: `shouldTreatAsAuthenticated(user)` defines storefront business rules, determining that registered users are authenticated while technical visitors are not.
- **Session Resolution**: `resolveUserSession(user)` exposes legitimate user data while scrubbing technical visitor objects.

## 4. Admin Domain (`adminDomain.js`)

Provides specialized auth hooks tailored for admin operations:
- **`useAdminAuth`**: Determines if the current authenticated user has admin privileges (`isAdmin`). Checks against custom claims, specific email domains, and roles.
