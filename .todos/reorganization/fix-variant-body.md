# Fix `variant="body"` — Non-Existent Variant (~25 usages)

**Recommended Model:** 🔴 G 3.1 P (H) — 8d | 15f | +2ctx

**Rationale:** `VARIANTS` in `TextStyles.js` defines `body1` and `body2`, not `body`. Usage silently falls back to `body1`, masking intent. Replace all with explicit `body1` or `body2`.

---

- [x] `src/features/orders/OrderRows.js`
- [x] `src/features/cart/CartItem.js`
- [x] `src/features/cart/CartViewContent.js`
- [x] `src/features/cart/CartSummary.js`
- [x] `src/features/auth/LoginPageComponents.js`
- [x] `src/features/home/components/DiscountsSection.js`
- [x] `src/features/catalog/components/NewArrivalsFooter.js`
- [x] `src/features/shell/AppHeader/AppHeaderNavLinks.js`
- [x] `src/features/contact/ContactQuestionForm.js`
- [x] `src/features/orders/OrderHeader.js`
- [x] `src/components/Search/SearchDropdown.js`
- [x] `src/components/Navigation/Pagination/PageNavigation.js`
- [x] `src/components/Feedback/EmptyState/EmptyState.js`
- [x] `src/components/Toggle/Toggle.js`
- [x] `src/features/profile/ProfileFormCard.js`
- [x] Verify no `variant="body"` remains in `src/` (grep check)
