# Browser Automation — Interaction Audit Pipeline Report

## 1. Executive Summary

An audit of the Browser Automation interaction discovery pipeline was conducted to determine how DOM elements are collected, classified, filtered, and selected for exploration, and to identify why generic `div` elements and low-value targets reach the interaction phase.

No application or tool code was modified during this audit.

---

## 2. The 4-Stage Interaction Pipeline

```
[ 1. Collection ]                  [ 2. Classification ]               [ 3. Policy Filtering ]            [ 4. Execution ]
  ElementScanner                      ElementGroupDetector                InteractionPolicyEngine            InteractionProcessor
┌─────────────────────┐             ┌───────────────────────┐           ┌────────────────────────┐         ┌──────────────────────┐
│ Query Selector:     │             │ Rule Matching:        │           │ Group Sampling:        │         │ Identifier check:    │
│ - button, a, input  │            │ - criticalGroup       │           │ - listGroup: sample(3) │         │ - skips detached     │
│ - [role], [testid]  │  ─────────► │ - inputGroup          │ ────────► │ - gridGroup: sample(5) │ ──────► │ - executes click     │
│ - [class*="r-cursor"]│             │ - closestGroup        │           │ - defaultGroup: ALL   │         │ - reports outcome    │
│ - [style*="cursor"] │             │ - defaultGroup (divs) │           │   (No sampling limit!) │         │                      │
└─────────────────────┘             └───────────────────────┘           └────────────────────────┘         └──────────────────────┘
```

---

## 3. Detailed Pipeline Stage Audit

### Stage 1: Collection (`ElementScanner.ts`)
* **Mechanism:** Queries the browser DOM using:
  ```ts
  selector = 'button, a, input, select, textarea, [role="button"], [role="link"], [role="tab"], [role="menuitem"], [role="checkbox"], [role="radio"], [data-testid], [tabindex], [class*="r-cursor"], [style*="cursor"]'
  ```
* **Source Code Reference:** [`ElementScanner.ts:14, 46`](file:///d:/.tools/browser-automation/explorer/ElementScanner.ts#L14)
* **Behavior:** React Native Web (used by Expo web exports) compiles pressable elements, touchables, and click-handled flex wrappers into `<div>` containers with CSS classes like `r-cursor-pointer` or inline `style="cursor: pointer;"`. `ElementScanner` picks up these wrapper `div` elements as candidate interactive targets.

### Stage 2: Classification (`ElementGroupDetector.ts`)
* **Mechanism:** Classifies each matched locator by inspecting attributes and DOM hierarchy:
  1. `criticalGroup`: matches admin/profile keywords
  2. `inputGroup`: checkboxes and radios
  3. `closestGroup`: checks closest parent containers (`nav`, `pagination`, `carousel`, `sidebar`, `grid`, `list`)
  4. `fallbackGroup`: matches `button` tag/role
  5. `defaultGroup`: Fallback for all unmatched elements.
* **Source Code Reference:** [`ElementGroupDetector.ts:84-92`](file:///d:/.tools/browser-automation/explorer/policy/ElementGroupDetector.ts#L84-L92)
* **Behavior:** Generic `div` containers with pointer cursors that are not inside semantic list/grid/nav parent elements fall through all specific rules and receive the `'defaultGroup'` classification.

### Stage 3: Filtering & Policy Engine (`InteractionPolicyEngine.ts`)
* **Mechanism:** Applies group-based sampling rules defined in `InteractionPolicyConfig.ts`:
  * `listGroup`: limit = 3
  * `gridGroup`: limit = 5
  * `buttonGroup`: limit = 5
  * **`defaultGroup`**: limit = **`'all'`**
* **Source Code Reference:**
  * [`InteractionPolicyConfig.ts:41`](file:///d:/.tools/browser-automation/explorer/policy/InteractionPolicyConfig.ts#L41)
  * [`InteractionPolicyEngine.ts:40-49`](file:///d:/.tools/browser-automation/explorer/policy/InteractionPolicyEngine.ts#L40-L49)
* **Behavior:** Because `defaultGroup` is configured with `sample: 'all'`, 100% of unclassified generic `div` elements bypass sampling reduction and pass directly into the final interaction queue.

### Stage 4: Selection & Execution (`InteractionProcessor.ts`)
* **Mechanism:** Receives the target element identifiers and executes clicks:
  * Filters out invalid identifiers (`detached-element`, `unknown`, `unknown-element`).
  * Checks visit history and depth bounds.
* **Source Code Reference:** [`InteractionProcessor.ts:32-34, 73-75`](file:///d:/.tools/browser-automation/explorer/InteractionProcessor.ts#L32-L34)
* **Behavior:** Generic `div` elements receive generated fallback identifiers such as `card|Card|/div[1]/div[1]/div[1]/div[3]/...` or `btn|Pressable`. Because these are valid identifier strings, they pass filtering and are clicked by `ElementInteractor`.

---

## 4. Root Causes of Low-Value `div` Interactions

1. **React Native Web DOM Representation:**
   React Native Web renders interactive views as generic `<div>` tags with `r-cursor-pointer` classes.
2. **Broad Broad-Spectrum Selector:**
   `ElementScanner` includes `[class*="r-cursor"]` and `[style*="cursor"]`, matching layout wrapper `div` nodes.
3. **Uncapped `defaultGroup` Policy:**
   `InteractionPolicyConfig.ts` sets `defaultGroup: { sample: 'all' }`, allowing all non-categorized `div` elements to proceed to execution without sampling limits.
