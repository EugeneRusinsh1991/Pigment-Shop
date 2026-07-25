# Browser Automation — Interaction Ordering Investigation Report

## 1. Executive Summary

This investigation establishes the exact architectural root cause of why generic wrapper `Div` elements are executed before nested semantic interactive elements (such as `product-fav-button` and `product-cart-button`) during browser automation exploration.

No code was modified, and no fixes or recommendations are proposed in this document.

---

## 2. Primary Architectural Components & Execution Chain

The execution order of interaction targets is established through a 4-step pipeline chain:

```
[ Step 1: DOM Query ]           [ Step 2: Policy Re-Sorting ]           [ Step 3: Target Array Mapping ]       [ Step 4: Sequential Loop ]
ElementScanner.ts               InteractionPolicyEngine.ts              UIExplorer.ts                          InteractionProcessor.ts
(document.querySelectorAll) ──► (sort((a, b) => a - b))             ──► (Array index mapping)              ──► (for (const targetId of...))
Returns DOM tree pre-order      Sorts by ascending DOM index            Preserves Policy order                 Executes index 0 to N-1
```

---

## 3. Verified Code-Based Evidence

### A. Element Scanner Document Pre-Order Indexing
* **Component:** [`ElementScanner.ts:156`](file:///d:/.tools/browser-automation/explorer/ElementScanner.ts#L156)
* **Code Implementation:**
  ```ts
  const els = Array.from(document.querySelectorAll(sel));
  ```
* **Verified Behavior:** `document.querySelectorAll()` returns a NodeList in document tree depth-first pre-order. In HTML structure, parent layout wrapper `<div>` nodes appear prior to their nested children in tree traversal. Consequently, outer `Div` elements receive smaller array indices (`i_wrapper < i_child`).

### B. Explicit Policy Index Re-Sorting (Primary Decision Point)
* **Component:** [`InteractionPolicyEngine.ts:32`](file:///d:/.tools/browser-automation/explorer/policy/InteractionPolicyEngine.ts#L32) (`decide`)
* **Code Implementation:**
  ```ts
  // Preserve DOM ordering
  const selectedIndices = Array.from(selectedIndicesSet).sort((a, b) => a - b);
  ```
* **Verified Behavior:** `InteractionPolicyEngine` collects sampled indices across all groups (`criticalGroup`, `buttonGroup`, `defaultGroup`). After group processing, line 32 explicitly sorts all collected indices using numerical ascending order (`a - b`). This forces the policy engine to return locators strictly in original DOM tree order, placing outer wrapper `Div` indices ahead of nested semantic elements regardless of group type.

### C. Sequential Target Execution
* **Component:** [`InteractionProcessor.ts:107`](file:///d:/.tools/browser-automation/explorer/InteractionProcessor.ts#L107) (`interactWithTargetIdentifiers`)
* **Code Implementation:**
  ```ts
  for (const targetId of targetIdentifiers) {
    ...
    const canContinue = await this.processElementAt(page, targetId, ...);
  }
  ```
* **Verified Behavior:** `InteractionProcessor` executes target identifiers in array sequence from index `0` to `N-1`. Because the array is ordered by ascending DOM index, wrapper `Div` elements at smaller array indices are clicked first.

---

## 4. Distinction Between Verified Facts and Assumptions

### Verified Facts
1. **Source of Ordering:** The interaction order is explicitly enforced by `InteractionPolicyEngine.ts:32` via `sort((a, b) => a - b)`.
2. **DOM Hierarchy Effect:** In HTML, parent wrapper `<div>` nodes have lower DOM tree indices than nested semantic children.
3. **Execution Mechanism:** `InteractionProcessor.ts:107` executes target identifiers sequentially in the exact order returned by the policy engine.
4. **Absence of Priority Re-Ordering:** There is no semantic re-ordering logic in the pipeline to prioritize `buttonGroup` or `criticalGroup` ahead of `defaultGroup`.

### Remaining Unknowns / Non-Assumptions
1. Original design motivation for enforcing `sort((a, b) => a - b)` in `InteractionPolicyEngine.ts` (whether intended for DOM stability or visual consistency).
2. Potential runtime impact on Playwright frame layout if DOM index order sorting were bypassed.
