# Browser Automation — Interaction Selection Audit Report

## 1. Executive Summary

An audit of the Browser Automation interaction selection mechanism was performed to identify why generic `Div` and `Unknown` elements are selected as interaction targets instead of or prior to meaningful interactive targets.

No application or tool code was modified during this audit.

---

## 2. Exact Selection Decision Point & Component Responsibilities

The selection of interaction targets is governed by three primary components operating in sequence:

```
[ 1. Discovery ]                    [ 2. Classification & Policy ]            [ 3. Target Assembly ]
ElementScanner                      InteractionPolicyEngine                   UIExplorer
(Scans candidate locators)          (Groups & samples locators)               (Resolves final target IDs)
       │                                       │                                          │
       ▼                                       ▼                                          ▼
Returns locators array              Sorts & filters locators                  Iterates target IDs sequentially
including wrapper divs              preserving DOM order                      in DOM sequence
```

### Responsible Components & Decision Locations

1. **Candidate Discovery Component:** [`ElementScanner.ts:45-196`](file:///d:/.tools/browser-automation/explorer/ElementScanner.ts#L45-L196) (`scanPage`)
   * Collects all DOM nodes matching `'button, a, input, select, textarea, [role="button"], ..., [class*="r-cursor"], [style*="cursor"]'`.
   * In React Native Web, flex container wrappers `<View>` with press listeners compile to `<div class="css-view-175oi2r r-cursor-pointer">`.
2. **Exact Decision Point (Policy Engine):** [`InteractionPolicyEngine.ts:19-37`](file:///d:/.tools/browser-automation/explorer/policy/InteractionPolicyEngine.ts#L19-L37) (`decide`)
   * Receives all candidate locators from `ElementScanner`.
   * Passes locators to `ElementGroupDetector.detectGroups()`.
   * Unclassified `div` wrappers fall into `'defaultGroup'`.
   * Evaluates sampling policy: `defaultGroup` policy is `{ sample: 'all' }` ([`InteractionPolicyConfig.ts:41`](file:///d:/.tools/browser-automation/explorer/policy/InteractionPolicyConfig.ts#L41)).
   * Sorts selected indices by DOM index: `selectedIndicesSet.sort((a, b) => a - b)`.
3. **Execution Assembly Component:** [`UIExplorer.ts:137-152`](file:///d:/.tools/browser-automation/explorer/UIExplorer.ts#L137-L152) (`resolveTargetIdentifiers`)
   * Maps policy-approved locators into target identifier strings.
   * Passes the array of target identifiers to `InteractionProcessor.interactWithTargetIdentifiers()`, which executes clicks in sequence.

---

## 3. Root Cause Analysis

### 1. Broad Collection Selector Include Cursor Classes
`ElementScanner` matches `[class*="r-cursor"]` and `[style*="cursor"]`. React Native Web automatically attaches `r-cursor-pointer` to parent layout `<div>` containers whenever a component or child has click/touch handlers.

### 2. Uncapped `defaultGroup` Sampling Policy
While structured groups (`listGroup`, `gridGroup`, `buttonGroup`) have strict sampling caps (1, 3, or 5 elements), generic `<div>` elements that do not match specific container rules default to `'defaultGroup'`, which has `{ sample: 'all' }`. As a result, 100% of generic `div` nodes pass through policy filtering.

### 3. Strict DOM Order Sorting (Outer Divs Precede Inner Target Elements)
`InteractionPolicyEngine.decide()` sorts selected elements by their original DOM tree order (`a - b`). In React Native Web, outer wrapper `<div>` nodes appear higher in the DOM tree than inner text nodes or icon buttons. Consequently, outer `Div` containers are prioritized and clicked **before** inner semantic targets.

### 4. Absence of Semantic Priority Weighting
The decision engine treats all policy-approved locators equally without scoring or prioritizing targets based on semantic quality (such as presence of `data-testid`, `aria-label`, `<button>` tag, or explicit text).
