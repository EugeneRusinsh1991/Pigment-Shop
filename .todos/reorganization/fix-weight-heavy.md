# Fix `weight="heavy"` — Undefined Typography Weight (3 usages)

**Model Recommendation:** 🟠 G 3.6 F (H) — 3d | 4f | +1ctx

**Rationale:** `typography.weights` defines `regular`, `medium`, `semibold`, `bold`. `"heavy"` does not exist. Replace with `bold` or add `heavy: '800'` to the token if a distinct extra-bold step is needed.

---

- [x] Decide: replace with `weight="bold"` OR add `heavy: '800'` to `typography.weights` in `src/theme/tokens.js`
- [x] `src/features/cart/CartItem.js` (L68)
- [x] `src/features/cart/CartSummary.js` (L36)
- [x] `src/features/orders/OrderHeader.js` (L11)
- [x] Verify no `weight="heavy"` remains in `src/`
