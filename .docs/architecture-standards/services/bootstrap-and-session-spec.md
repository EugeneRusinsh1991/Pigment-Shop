# Service Specification: App Bootstrap & Session

> [!NOTE]
> Specification for the application startup lifecycle, anonymous visitor establishment, and initialization sequence.

---

## 1. Domain Responsibility

Manages the core lifecycle processes that must execute before the UI becomes interactive, ensuring sessions and essential context data are loaded.

## 2. Visitor Bootstrap (`visitorBootstrap.js`)

First-class, isolated startup step designed to establish a session for anonymous visitors:
- **Guest Session Establishment**: Falls back sequentially:
  1. Tries Firebase Anonymous Auth.
  2. Falls back to a shared technical visitor account (`VISITOR_EMAIL` from `authPolicy.js`).
  3. Generates a local `guest_session_id`.
- **Contract Enforcement**: Does not throw exceptions that halt startup. Returns a standardized contract `{ success: true }` or `{ success: false, error: Error }`.
- **Isolation**: Strictly decoupled from UI logic (no React/hook imports). Invoked solely by the orchestrator (`appBootstrap.js`).
- **Purpose**: Allows cart features and state to function for users who are not explicitly logged in.
