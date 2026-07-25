# Browser Automation — Interaction Model Investigation Report

## 1. Executive Summary

This report evaluates whether the current behavior of treating generic wrapper `Div` elements as independent interaction targets prior to nested semantic controls aligns with the intended system architecture or represents an architectural inconsistency.

No code was modified, and no fixes or solutions are proposed in this document.

---

## 2. The Intended Interaction Model

Based on the system's design documentation ([`logging-philosophy.md`](file:///d:/.tools/browser-automation/logging-philosophy.md) and [`redesign-reasoning.md`](file:///d:/.tools/browser-automation/redesign-reasoning.md)):

1. **User Narrative Over Engine Mechanics:**
   The browser automation pipeline is designed to simulate a human user's journey through the application. Output is intended to reflect meaningful conceptual actions (e.g. clicking "Add to Cart" or navigating screens).
2. **Semantic Element Prioritization:**
   Descriptors and targets are intended to prioritize semantic controls (`<button>`, `<a>`, `[data-testid]`, `[aria-label]`) over structural DOM implementation details (such as raw `<div>` containers or XPaths).
3. **Group-Based Policy Filtering:**
   The policy engine ([`InteractionPolicyEngine.ts`](file:///d:/.tools/browser-automation/explorer/policy/InteractionPolicyEngine.ts)) was introduced to categorize elements into logical groups (`buttonGroup`, `navigationGroup`, `gridGroup`) and sample representative controls.

---

## 3. Consistency Analysis: Intended Architecture vs. Observed Behavior

### Summary Finding
The current behavior reflects an **architectural inconsistency** between DOM candidate collection and semantic element grouping.

| Dimension | Intended Architecture | Observed Implementation Behavior | Consistency Status |
| :--- | :--- | :--- | :--- |
| **Target Identity** | 1 conceptual control = 1 user action | Outer wrapper `Div` and inner `<button>` are collected as 2 separate targets | ❌ Inconsistent |
| **Interaction Priority** | High-value semantic controls executed first | Outer `Div` executed before inner `<button>` due to raw DOM tree order sorting | ❌ Inconsistent |
| **Default Policy** | Representative sampling of controls | `defaultGroup` (unclassified `Div`s) sampled at `'all'` (100% pass-through) | ❌ Inconsistent |

### Architectural Inconsistency Breakdown

In web frameworks like React Native Web, a single visual control (e.g., a card or favorite button) compiles to a nested DOM structure:
```html
<div class="css-view-175oi2r r-cursor-pointer"> <!-- Outer layout wrapper -->
  <button data-testid="product-fav-button">Fav</button> <!-- Inner semantic button -->
</div>
```

* **Architectural Intent:** The user interacts with the logical component (`product-fav-button`).
* **Current Pipeline Operation:**
  1. `ElementScanner` collects both the outer layout `<div>` (via cursor class matching) and the inner `<button>`.
  2. `ElementGroupDetector` assigns the outer `<div>` to `defaultGroup` and the inner `<button>` to `buttonGroup`.
  3. `InteractionPolicyEngine` applies `sample: 'all'` to `defaultGroup` and sorts all indices by ascending DOM position (`a - b`).
  4. `InteractionProcessor` clicks the outer `Div` first, logging mechanical `⚪ CLICK Div at /div[1]...` steps prior to the semantic interaction.

This dual-targeting duplicates physical clicks on a single logical component and emits mechanical noise that contradicts the stated "Narrative Over Mechanics" philosophy.

---

## 4. Remaining Architectural Questions

To align candidate selection with the intended interaction model, the following core architectural questions remain:

1. **Parent-Child Suppression Criteria:**
   Should layout wrapper `<div>` nodes be suppressed from candidate queues when a descendant child node already forms a recognized semantic target (`button`, `a`, `[data-testid]`)?
2. **`defaultGroup` Policy Boundary:**
   Should unclassified generic `div` elements continue to use `sample: 'all'`, or should unclassified wrapper elements undergo deduplication before policy sampling?
3. **Semantic Weighting vs. Raw DOM Ordering:**
   Should the policy engine enforce strict DOM tree order sorting (`sort((a, b) => a - b)`), or should target execution order be determined by semantic priority (e.g. `criticalGroup` -> `buttonGroup` -> `navigationGroup` -> `defaultGroup`)?
