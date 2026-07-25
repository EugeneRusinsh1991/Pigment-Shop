# Browser Automation Logging Audit

## 1. Overview & Current Logging Architecture

The application's logging architecture is split across two distinct runtime environments and terminal processes:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DEVELOPMENT ENVIRONMENT                         │
├───────────────────────────────────┬────────────────────────────────────┤
│     Run Dev Terminal Process      │    Browser Automation Terminal     │
│       (`npm run dev` / Expo)      │    (`npx tsx run-smoke.ts`)        │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Metro Bundler server logs       │ • DevServer readiness check logs   │
│ • HTTP asset/bundle request logs  │ • ExecutionContext auth logs       │
│ • Client console.log forwarding   │ • ConsoleReporter narrative logs   │
│ • RN Web DOM/prop warnings        │ • Process exceptions & stack traces│
└───────────────────────────────────┴────────────────────────────────────┘
```

### Architecture Components

1. **Dev Server Terminal (`npm run dev`)**:
   - **Metro Bundler**: Handles JS bundling, HMR events, and HTTP request routing (`GET /index.bundle`, `GET /assets/...`).
   - **Client Log Forwarding**: Expo Metro runtime intercepts `console.log`, `console.warn`, and `console.error` calls inside the browser and forwards them to the Node.js terminal output.
   - **App Bootstrap & Services**: Domain repositories (`catalogRepository`, `favoritesRepository`), auth context (`AuthContext`), and startup orchestrator emit lifecycle updates via `console.log`.

2. **Browser Automation Terminal (`npx tsx run-smoke.ts` / `run-admin-nav.ts`)**:
   - **DevServerHelper**: Checks server availability via HTTP GET and reports server status.
   - **ExecutionContext (`BaseExecutionContext`, `AdminContext`)**: Manages pre-exploration login routines and outputs step-by-step status markers.
   - **ObservabilityManager & ConsoleReporter**: Listens to `ExplorerEventEmitter` and outputs structured exploration events (`👉 NAVIGATED TO`, `⚪ CLICK`, `👈 RETURNED TO`, `🔴 ERROR`).
   - **Manual Inspector Hook (`setupManualInspector`)**: Outputs debug report creation messages when snapshots are captured.

---

## 2. Main Sources of Log Noise

### A. Run Dev Terminal Noise
- **Metro HTTP Request Spills**: Every page navigation during browser automation triggers tens of bundle/asset GET requests in Metro, creating high-frequency scrolling text.
- **Verbose React Component Logs**: Feature hooks (`usePaginatedCatalog`, `catalogRepository`, `AuthContext`) print raw object state dumps on every fetch or route transition.
- **React Native Web Warnings**: Non-critical web polyfill warnings (e.g., unrecognized style props, `aria-*` accessibility warnings) flood the terminal output.

### B. Browser Automation Terminal Noise
- **Over-detailed Context Preparation**: Step-by-step login progress (`ℹ Opening Login Page`, `ℹ Entering Credentials`, `ℹ Submitting login form`) printed even during normal, non-diagnostic runs.
- **Uncaught Node Stack Traces**: Environment validation errors or expected test timeouts print raw V8 stack traces directly to `stdout`/`stderr` instead of clean error summaries.
- **Duplicate Navigation Dividers**: `ConsoleReporter` outputs repeated 50-character divider lines (`──────...──────`) during rapid back-and-forth traversal.

---

## 3. Recommended Visibility Classification

### A. Essential (Visible During Normal Development)

| Terminal | Category | Example / Item | Rationale |
| :--- | :--- | :--- | :--- |
| **Run Dev** | Server Status | `Expo server running at http://localhost:8081` | Confirms server readiness and port mapping. |
| **Run Dev** | Fatal Compilation Errors | Syntax / TypeScript build failures | Essential for immediate developer awareness. |
| **Run Dev** | Explicit Application Errors | `console.error` for failed backend/auth requests | High-priority runtime diagnostics. |
| **Automation**| Context Header | `🚀 Preparing Execution Context: AdminContext` | Identifies current test context. |
| **Automation**| Auth Success/Failure | `✓ Authentication Successful` / `🔴 Auth Failed` | High-level status of authentication. |
| **Automation**| Exploration Narrative | `👉 NAVIGATED TO /catalog`, `⚪ CLICK Link "..."` | High-level user journey story. |
| **Automation**| Summary Table | `Automation Complete (Pages, Clicks, Errors)` | Executive summary of test execution. |

### B. Verbose / Debug Mode (`--verbose` or `DEBUG=true`)

| Terminal | Category | Current Location / Source | Recommended Action |
| :--- | :--- | :--- | :--- |
| **Run Dev** | Metro Asset GET Requests | Metro Bundler output | Suppress HTTP request logging during active test runs. |
| **Run Dev** | Repository State Dumps | `catalogRepository.js`, `usePaginatedCatalog.js` | Wrap in `__DEV__` or custom debug logger. |
| **Run Dev** | RN Web Prop Warnings | React Native Web runtime | Filter non-fatal web polyfill warnings. |
| **Automation**| Auth Sub-step Progress | `BaseExecutionContext.ts` | Suppress `ℹ Entering Credentials` sub-steps unless `--verbose` is set. |
| **Automation**| Raw Stack Traces | `run-smoke.ts` / `envValidator.ts` | Format errors into clean single-line summaries; reserve stack traces for `--verbose`. |
| **Automation**| Snapshot Disk Logs | `setupManualInspector.ts` (`[PlaywrightDebug]...`) | Move to debug log file or silence in standard output. |

---

## 4. Conclusion & Next Steps

The existing `logging-philosophy.md` established a strong foundation by muting `SKIP` and `SCAN` events in `ConsoleReporter`. To complete the noise reduction effort:
1. Introduce a unified `--verbose` CLI flag across browser-automation scripts.
2. Format environment validation & connection errors into clean user-facing summaries.
3. Silence Metro HTTP request logging when launching dev servers programmatically.
