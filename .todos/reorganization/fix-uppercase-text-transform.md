# Fix Scattered `textTransform: 'uppercase'` (9+ files)

**Rationale:** The `overline` variant in `TextStyles.js` is the canonical token for uppercase label text. Raw `textTransform: 'uppercase'` inline in style files bypasses the token system.

**Fix:** Replace inline `textTransform: 'uppercase'` + manual `fontSize`/`letterSpacing` combos with `<Text variant="overline">` where semantics match.

---

- [ ] `src/features/shell/NavMenu/NavMenuStyles.js` (L73)
- [ ] `src/features/product/ProductCardStyles.js` (L41)
- [ ] `src/features/admin/Users/UsersStyles.js` (L139)
- [ ] `src/features/admin/Orders/OrdersStyles.js` (L110, L114, L220)
- [ ] `src/features/admin/Products/ProductsStyles.js` (L89, L159)
- [ ] `src/features/admin/Categories/CategoryFormStyles.js` (L95)
- [ ] `src/features/admin/Categories/CategoriesStyles.js` (L152)
- [ ] `src/components/DataTable/DataTableStyles.js` (L23, L100)
- [ ] Verify no stray `textTransform: 'uppercase'` remains outside `TextStyles.js`
