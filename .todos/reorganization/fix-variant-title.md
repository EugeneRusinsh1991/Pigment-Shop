# Fix `variant="title"` — Non-Existent Variant (2 usages)

**Recommended Model:** 🟢 G 3.6 F (L) — 2d | 2f | +1ctx

**Rationale:** `"title"` is not defined in `VARIANTS`. Falls back to `body1`, which is visually incorrect for a title-level element. Replace with `h3` or `h4` depending on context.

---

- [x] `src/features/orders/OrderHeader.js` (L11) — evaluate context, use `h3` or `h4`
- [x] `src/features/cart/CartSummary.js` (L87) — evaluate context, use `h3` or `h4`
- [x] Verify no `variant="title"` remains in `src/`

**Also fixed:** `src/features/orders/OrderRows.js` — same invalid `title` variant on price cells → `h3`
