# Phase 1: Client-Side Mouse & Target Element Tracking

## Overview
This phase introduces client-side mouse tracking and DOM element inspection directly within the React browser context (`ManualBrowserInspector.js`).

## Objectives & Tasks
1. **Mouse Event Listener**:
   - Add a global `mousemove` event listener on mount to continuously update `window.__lastMousePos = { x, y }`.
   - Ensure clean unmounting of event listeners.
2. **Focus State Verification**:
   - Check `document.hasFocus()` to determine if the window is currently active.
3. **Element Under Cursor Inspection**:
   - On screenshot execution (`Alt+1` or menu click), call `document.elementFromPoint(x, y)` to get the target element.
   - Extract bounding rectangle via `getBoundingClientRect()`.
   - Extract component identifiers: `tagName`, `id`, `className`, `innerText`/`placeholder`/`accessibilityLabel`, `data-testid`.
4. **Payload Extension**:
   - Bundle mouse coordinates, window focus status, and target element metadata into the screenshot RPC trigger payload.

---

## Model Recommender Evaluation

- **Affected Files**: 1 ([ManualBrowserInspector.js](file:///d:/Magazine/_PigmentShop/.tools/manual-browser-inspector/ManualBrowserInspector.js))
- **Estimated Lines of Code Changed**: ~30-40 lines
- **Risk & Dependencies**: Low risk, localized DOM read & event listener. No shared state mutations.
- **Task Complexity**: **1/5 (Low)**

### Recommended Model Tier
- **Model**: 🟢 **Gemini 3.6 Flash (Low / Medium)**
- **Rationale**: Localized DOM tracking and event listener handling with zero architectural risk.
