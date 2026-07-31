# Requirement: Universal Global Performance & Lag Logger

> [!CAUTION]
> **Current Audit Report Status (`summary.json`):** The event array remains empty (`[]`). The performance auditor is currently **NOT CATCHING LAGS** during execution.

---

## 🎯 Target Outcome (What Must Be Achieved)

We need a **Global Lag & Performance Bug Logger** that reliably detects, captures, and records **ANY delay exceeding 50ms** (or a user-configurable threshold), regardless of its source—be it UI thread freezes, main thread blocking, layout thrashing, framework event handler delays, long tasks, or background processing freezes.

### Expected Deliverables & Functional Criteria:
1. **Universal Delay Detection:** Capture ALL delays $\ge 50\text{ms}$ (configurable threshold) regardless of cause (UI, DOM, JS execution, rendering, React event loop, or background operations).
2. **100% Reliability:** No silent dropping of lag events during SPA navigation, page reloads, hydration, or heavy rendering. Every detected delay must be recorded in `summary.json` / `lags-report.json`.
3. **Framework Independence:** Detection must work reliably across Expo / React Native Web app structures (where events are trapped in synthetic event trees or container nodes like `div#root`).

*(Note: Implementation approach is open—whether via CDP, browser API observers, trace analysis, or hybrid monitoring—provided the target outcome is guaranteed).*

---

## 📁 Codebase Context: Structure of `.tools/auditors/perf-auditor`

For any AI agent working on this task, the component breakdown of `.tools/auditors/perf-auditor` is as follows:

- [config.ts](file:///d:/Magazine/_PigmentShop/.tools/auditors/perf-auditor/config.ts): Manages audit configuration parameters (`lagThresholdMs` [default 50ms], `--threshold` CLI arg parser, log directories `.logs/perf-audit/`, CDP flags).
- [browser-observer.ts](file:///d:/Magazine/_PigmentShop/.tools/auditors/perf-auditor/browser-observer.ts): Injected script into Chromium browser context (`addInitScript`/`evaluate`). Houses browser observers (`PerformanceObserver` for `longtask` & `event`), DOM interaction listeners (`click`, `keydown`, `scroll`), `requestAnimationFrame` frame-drop monitoring loop, and triggers Node callbacks (`__perfAuditReportLag`).
- [interactive-runner.ts](file:///d:/Magazine/_PigmentShop/.tools/auditors/perf-auditor/interactive-runner.ts): Main driver for interactive profiling (`npm run audit:perf:interactive`). Controls Playwright browser lifecycle, exposes Node bridge functions to browser, enables CDP profiling (`Profiler.enable`, `Profiler.start`), and captures screenshots when lag events fire.
- [logger.ts](file:///d:/Magazine/_PigmentShop/.tools/auditors/perf-auditor/logger.ts): I/O disk persistence module. Formats and writes caught lag events, screenshot binary buffers, CDP JS stack traces, and session metadata into `.logs/perf-audit/latest/summary.json` and timestamped run folders.
- [reporter.ts](file:///d:/Magazine/_PigmentShop/.tools/auditors/perf-auditor/reporter.ts): Artifact renderer. Parses `summary.json` to produce interactive visual reports (`lags-report.html` with timeline charts & screenshots) and markdown summaries (`lags-report.md`).
- [action-fixture.ts](file:///d:/Magazine/_PigmentShop/.tools/auditors/perf-auditor/action-fixture.ts): Playwright test fixture wrapper around Playwright user actions (`click`, `fill`, `navigate`) to measure execution durations and attach action contexts to detected lags.
- [lag-detector.spec.ts](file:///d:/Magazine/_PigmentShop/.tools/auditors/perf-auditor/lag-detector.spec.ts): Automated E2E test suite running predefined user flows in headless/CI mode to validate performance regression.
- [index.ts](file:///d:/Magazine/_PigmentShop/.tools/auditors/perf-auditor/index.ts): Barrel export file for the module API.

---

## 🔬 Tested Hypotheses & Known Root Causes (Verification Record)

The following potential root causes and solutions have already been tested and verified:

### 1. 🔴 Playwright Sync Bridge Bottleneck (`page.exposeFunction`)
- **Tested Solution:** Removed `await page.screenshot(...)` calls from `__perfAuditReportLag` in [interactive-runner.ts](file:///d:/Magazine/_PigmentShop/.tools/auditors/perf-auditor/interactive-runner.ts) to prevent async screenshot queue blockage.
- **Verified Finding:** Did not resolve the issue. Lag events are still not reaching Node.js even with screenshots disabled.

### 2. 🔴 Delta Time Formula Flaw in `checkFrame`
- **Tested Solution:** Replaced condition `delta > Math.max(threshold, 33)` with dynamic threshold logic `frameThreshold = threshold <= 10 ? (16 + threshold) : threshold` in [browser-observer.ts](file:///d:/Magazine/_PigmentShop/.tools/auditors/perf-auditor/browser-observer.ts).
- **Verified Finding:** Did not resolve the issue. `rAF` frame drops (17ms–33ms+) still fail to record events into `__perfAuditLags`.

### 3. 🔴 Window Context Cleared During Expo / React Native Web Hydration & SPA Routing
- **Tested Solution:** Implemented `sessionStorage` fallback with `beforeunload` event handler to persist un-flushed lags across page reloads.
- **Verified Finding:** Did not resolve the issue. In React Native Web SPA navigation (`history.pushState`), `beforeunload` does not consistently trigger.

### 4. 🔴 Execution Order of `addInitScript` and `injectPerformanceObserver`
- **Tested Solution:** Reordered script attachment: binding `addInitScript` prior to `page.goto()`, and evaluating `injectPerformanceObserver` post-DOM load.
- **Verified Finding:** Did not resolve the issue. [latest/summary.json](file:///d:/Magazine/_PigmentShop/.logs/perf-audit/latest/summary.json) remains empty (`[]`).

### 5. 🔴 Chromium Isolated Context & React Synthetic Event Trapping
- **Verified Root Cause:** Standard `window.addEventListener('click', ...)` attached in Playwright InitScript operates outside the React Synthetic Event Tree. In Expo Web, events are intercepted by inner nodes (e.g., `div#root`, Canvas, or GestureHandlers) without bubbling up to window-level APIs.
