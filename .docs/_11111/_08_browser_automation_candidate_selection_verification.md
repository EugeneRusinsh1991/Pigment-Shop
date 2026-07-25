# Browser Automation — Candidate Selection Verification Report

## 1. Executive Summary

This verification report evaluates how Browser Automation handles meaningful interactive elements (such as `<product-fav-button>` and `<product-cart-button>`) when they exist alongside generic `Div` layout wrappers.

No application or tool code was modified during this audit.

---

## 2. Core Finding

Browser Automation **discovers both the semantic element AND the generic wrapper `Div`**, but **prioritizes the wrapper `Div`** due to strict DOM tree order sorting.

* **Never discovers the semantic element:** ❌ FALSE
* **Discovers it but rejects it:** ❌ FALSE
* **Discovers it but prioritizes the wrapper `Div`:** ✅ **TRUE**

---

## 3. Empirical & Code Evidence

### A. Empirical Run Log Evidence

In execution logs from the smoke automation run, both the generic `Div` wrappers and the inner semantic elements are discovered and clicked sequentially on the same page (`/`):

```
👉 NAVIGATED TO /
──────────────────────────────────────────────────
   ⚪ CLICK   Div at /div[1]/div[1]/div[1]/div[3]/...       
   ⚪ CLICK   Div at /div[1]/div[1]/div[1]/div[3]/...       
   ⚪ CLICK   Interactive <product-fav-button>
   ⚪ CLICK   Interactive <product-cart-button>
```

This log proves that `<product-fav-button>` and `<product-cart-button>` were successfully scanned and selected by the policy engine, but were executed **after** the surrounding `Div` wrappers.

---

### B. Code Mechanism Evidence

1. **Discovery Stage (`ElementScanner.ts`):**
   * [`ElementScanner.ts:156-160`](file:///d:/.tools/browser-automation/explorer/ElementScanner.ts#L156-L160) runs `document.querySelectorAll(selector)`.
   * The query selector matches both outer layout `<div>` containers (via `[class*="r-cursor"]`) and inner semantic elements (via `[data-testid]` or `button` tags).
   * Both nodes are pushed to the extracted elements array.

2. **Policy Stage (`InteractionPolicyEngine.ts`):**
   * [`InteractionPolicyEngine.ts:32`](file:///d:/.tools/browser-automation/explorer/policy/InteractionPolicyEngine.ts#L32) combines selected indices and sorts them:
     ```ts
     const selectedIndices = Array.from(selectedIndicesSet).sort((a, b) => a - b);
     ```
   * In DOM tree hierarchy, parent container `<div>` nodes precede child elements (`idx_wrapper < idx_semantic`).

3. **Execution Stage (`InteractionProcessor.ts`):**
   * [`InteractionProcessor.ts:107`](file:///d:/.tools/browser-automation/explorer/InteractionProcessor.ts#L107) iterates sequentially through `targetIdentifiers`.
   * Because `idx_wrapper` comes first in the sorted array, the wrapper `Div` is interacted with **before** the inner semantic element.
