# Fix `maxWidth: 1330` — Magic Number, Not a Token

**Recommended Model:** 🟢 G 3.6 F (L) — 3d | 4f | +1ctx

**Rationale:** The content max-width `1330` appears hardcoded in 4 files with no named token. Any layout-width change requires hunting every instance.

---

- [ ] 1. Add `layout.maxContentWidth: 1330` to `src/theme/tokens.js` (🟢 G 3.6 F (L) — 1d | 1f | +0ctx)
- [ ] 2. `src/theme/commonStyles.js` (L8, L24) — replace `1330` with `layout.maxContentWidth` (🟢 G 3.6 F (L) — 1d | 1f | +1ctx)
- [ ] 3. `src/features/catalog/CatalogPage.js` (L193) — replace `1330` with `layout.maxContentWidth` (🟢 G 3.6 F (L) — 1d | 1f | +1ctx)
- [ ] 4. `src/components/Navigation/NavigationStyles.js` (L44) — replace `1330` with `layout.maxContentWidth` (🟢 G 3.6 F (L) — 1d | 1f | +1ctx)
- [ ] 5. Verify no raw `1330` remains in `src/` (🟢 G 3.6 F (L) — 1d | 1f | +0ctx)

