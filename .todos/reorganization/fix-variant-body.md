# Fix `variant="body"` — Non-Existent Variant (~25 usages)

**Recommended Model:** 🔴 G 3.1 P (H) — 8d | 15f | +2ctx

**Rationale:** `VARIANTS` in `TextStyles.js` defines `body1` and `body2`, not `body`. Usage silently falls back to `body1`, masking intent. Replace all with explicit `body1` or `body2`.

---

- [ ] `src/features/orders/OrderRows.js`
- [ ] `src/features/cart/CartItem.js`
- [ ] `src/features/cart/CartViewContent.js`
- [ ] `src/features/cart/CartSummary.js`
- [ ] `src/features/auth/LoginPageComponents.js`
- [ ] `src/features/home/components/DiscountsSection.js`
- [ ] `src/features/catalog/components/NewArrivalsFooter.js`
- [ ] `src/features/shell/AppHeader/AppHeaderNavLinks.js`
- [ ] `src/features/contact/ContactQuestionForm.js`
- [ ] `src/features/orders/OrderHeader.js`
- [ ] `src/components/Search/SearchDropdown.js`
- [ ] `src/components/Navigation/Pagination/PageNavigation.js`
- [ ] `src/components/Feedback/EmptyState/EmptyState.js`
- [ ] `src/components/Toggle/Toggle.js`
- [ ] `src/features/profile/ProfileFormCard.js`
- [ ] Verify no `variant="body"` remains in `src/` (grep check)
