# Fix `weight="heavy"` — Undefined Typography Weight (3 usages)

**Rationale:** `typography.weights` defines `regular`, `medium`, `semibold`, `bold`. `"heavy"` does not exist. Replace with `bold` or add `heavy: '800'` to the token if a distinct extra-bold step is needed.

---

- [ ] Decide: replace with `weight="bold"` OR add `heavy: '800'` to `typography.weights` in `src/theme/tokens.js`
- [ ] `src/features/cart/CartItem.js` (L68)
- [ ] `src/features/cart/CartSummary.js` (L36)
- [ ] `src/features/orders/OrderHeader.js` (L11)
- [ ] Verify no `weight="heavy"` remains in `src/`
