# Fix `maxWidth: 1330` — Magic Number, Not a Token

**Rationale:** The content max-width `1330` appears hardcoded in 4 files with no named token. Any layout-width change requires hunting every instance.

---

- [ ] 1. Add `layout.maxContentWidth: 1330` to `src/theme/tokens.js`
- [ ] 2. `src/theme/commonStyles.js` (L8, L24) — replace `1330` with `layout.maxContentWidth`
- [ ] 3. `src/features/catalog/CatalogPage.js` (L193) — replace `1330` with `layout.maxContentWidth`
- [ ] 4. `src/components/Navigation/NavigationStyles.js` (L44) — replace `1330` with `layout.maxContentWidth`
- [ ] 5. Verify no raw `1330` remains in `src/`
