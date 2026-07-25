# Browser Automation — Logging Audit & Runtime Diagnostics

## 1. Executive Summary

An audit of the Browser Automation pipeline was performed to trace the origin, transmission path, and cause of high-volume runtime console logs (such as repeated `useAdminAuth evaluated` statements) and execution crashes. 

No application or tool code was modified during this audit.

---

## 2. Complete Logging Flow Architecture

```
[ Web Client / React ]                     [ Playwright / Explorer ]                [ Console Output ]
   │                                              │                                        │
   ├─► console.log('useAdminAuth...')             │                                        │
   │   (React Hook re-render)                    │                                        │
   │                                              │                                        │
   └──────► Browser Page Context                  │                                        │
                 │                                │                                        │
                 ├─► page.on('console') ──────────┼─► SmokeConsoleListener ───────────────► Terminal Console
                 │   (Captured by Playwright)     │   (Filtered for Error/Warn)            │
                 │                                │                                        │
                 └─► DevServer HTTP Hub ──────────┼─► scripts/dev-server.js                │
                     (POST /save-log)             │   (Appends to browser.log)             │
                                                  │                                        │
                                                  ├─► setupManualInspector() ──────────────► [PlaywrightDebug] Logs
                                                  ├─► cleanOldFiles() ─────────────────────► [CleanUp] Logs
                                                  └─► ConsoleReporter ─────────────────────► 👉 NAVIGATED TO...
```

---

## 3. Log Category Breakdown & Root Causes

### Category A: Application Client-Side Runtime Logs
* **Example Output:** `useAdminAuth evaluated: { isAuthenticated: false, email: undefined, isAdmin: false }`, `AdminLayout evaluating useAdminAuth. isAdmin: false`
* **Source Location:**
  * [`src/services/adminDomain.js:43`](file:///d:/Magazine/_PigmentShop/src/services/adminDomain.js#L43)
  * [`app/admin/_layout.js:7`](file:///d:/Magazine/_PigmentShop/app/admin/_layout.js#L7)
* **Emission Cause:** Unconditional `console.log()` calls inside custom React hooks and layout component bodies. Because `useAdminAuth` is evaluated on every state update, context change, and route navigation during Playwright interactions, these statements re-execute frequently.
* **Flow to Terminal:** Client-side JS `console.log` statements inside the Chromium browser page are captured by Playwright's page console event listeners (`page.on('console')`) and/or proxied via the DEV server log forwarder.

### Category B: Automation Infrastructure Debug & Cleanup Logs
* **Example Output:** `[CleanUp] Deleted old file: state_2026-07-25_14-48-48.json`, `[PlaywrightDebug] Saved debug report to ...`
* **Source Location:**
  * [`scripts/cleanOldFiles.js:22`](file:///d:/Magazine/_PigmentShop/scripts/cleanOldFiles.js#L22)
  * [`.tools/manual-browser-inspector/setupManualInspector.ts:103`](file:///d:/.tools/manual-browser-inspector/setupManualInspector.ts#L103)
* **Emission Cause:** Every browser automation session invokes `setupManualInspector(page)` in `runUIExplorer`. This triggers historical file purging (`cleanOldFiles`) and debug report generation, emitting verbose `console.log` notices to standard output for each deleted or generated file.
* **Flow to Terminal:** Direct Node.js `console.log` calls from automation helper scripts executing in the runner process.

### Category C: UIExplorer Observability Logs
* **Example Output:** `👉 NAVIGATED TO /catalog`, `⚪ CLICK Interactive <product-fav-button>`, `👈 RETURNED TO /catalog`
* **Source Location:** [`.tools/browser-automation/explorer/observability/reporters/ConsoleReporter.ts:74-140`](file:///d:/.tools/browser-automation/explorer/observability/reporters/ConsoleReporter.ts#L74-L140)
* **Emission Cause:** High-level structured progress reporting attached to `ExplorerEventEmitter` events (`NAVIGATION`, `ACTION`, `PICK`).
* **Flow to Terminal:** Standard output formatted by `ConsoleReporter.report()`.

---

## 4. Root Causes of Runtime Errors

### Error 1: Context Preparation Failure (Login Form Timeout)
* **Error Message:** `Context Preparation Failed: page.waitForSelector: Timeout 5000ms exceeded. Call log: waiting for locator('[data-testid="login-email-input"], input[type="email"]') to be visible`
* **Source Location:** [`.tools/browser-automation/execution-context/AdminContext.ts:28`](file:///d:/.tools/browser-automation/execution-context/AdminContext.ts#L28)
* **Root Cause:** `AdminContext.ts` calls `page.waitForSelector(authConfig.usernameSelector, { state: 'visible', timeout: 5000 })`. When client-side hydration or page navigation to `/login` experiences latency (>5000ms), Playwright throws a timeout exception, halting context preparation.

### Error 2: Unhandled Exception Crashing DFS Explorer Session
* **Error Message:** Unhandled stack trace output originating at `NavigationHandler.handleNavigationAndRecurse` leading to process termination with exit code 1.
* **Source Location:**
  * [`.tools/browser-automation/explorer/NavigationHandler.ts:45`](file:///d:/.tools/browser-automation/explorer/NavigationHandler.ts#L45)
  * [`.tools/browser-automation/explorer/ElementScanner.ts:39,184`](file:///d:/.tools/browser-automation/explorer/ElementScanner.ts#L39)
* **Root Cause:** During recursive DFS navigation in `NavigationHandler.ts` (line 45), `cacheManager.getPageState(page, true)` invokes `scanner.scanPage(page)`. If the DOM context changes or frame detachment occurs mid-evaluation inside Playwright, `ElementScanner` catches the `page.evaluate()` error, logs `--- BROWSER AUTOMATION EXCEPTION ---`, and re-throws the error. `NavigationHandler.ts` lacks a `try...catch` wrapper around `getPageState()`, allowing the exception to bubble uncaught up the recursive stack and crash Node.js.
