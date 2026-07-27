# Fix `weight="semiBold"` — camelCase Mismatch (~6 usages)

**Model Recommendation:** 🟠 G 3.6 F (H) — 4d | 5f | +1ctx

**Rationale:** `typography.weights` defines `semibold` (lowercase). Passing `"semiBold"` is neither a valid token key nor a valid React Native `fontWeight` value — the weight is silently ignored or produces unexpected results.

---

- [ ] `src/components/Button/Button.js` (L50) — `weight="semiBold"` → `weight="semibold"`
- [ ] `src/components/Badge/Badge.js` (L31) — `weight="semiBold"` → `weight="semibold"`
- [ ] `src/components/Card/NavigationCard.js` (L22) — `weight="semiBold"` → `weight="semibold"`
- [ ] `src/features/admin/Orders/OrderCustomerCard.js` (L29) — `weight="semiBold"` → `weight="semibold"`
- [ ] `src/features/admin/Banners/BannersManager.js` (L99, L109) — `weight="semiBold"` → `weight="semibold"`
- [ ] Verify no `weight="semiBold"` remains in `src/`
