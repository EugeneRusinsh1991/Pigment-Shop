# Fix `color="info"` — Missing Color Preset in Text Component (2 usages)

**Rationale:** `colorPresetMap` in `TextStyles.js` has no `"info"` key. Falls back to `"primary"` — semantically incorrect for an informational state.

**Recommended Model:** 🟢 G 3.6 F (L) — 3d | 3f | +0ctx

---

- [x] 1. Add `info: (isDark) => isDark ? colors.infoLight : colors.infoDeep` to `colorPresetMap` in `src/components/Text/TextStyles.js`
- [x] 2. Verify `src/features/cart/CartItem.js` (L68) — `color={isDark ? 'info' : 'primary'}` resolves correctly
- [x] 3. Verify `src/features/orders/OrderHeader.js` (L11) — `color={isDark ? 'info' : 'success'}` resolves correctly
