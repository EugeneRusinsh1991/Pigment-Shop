# Move useThemeUtils.js → src/theme/

**Model Recommendation:** 🟡 G 3.6 F (M) — 2d | 3f | +1ctx

**Rationale:** Provides theme helper functions (`getIsDarkContext`, `getStyle`). It is not a UI component and belongs alongside `tokens.js` and `commonStyles.js` in `src/theme/`.

---

- [ ] 1. Move file `src/components/useThemeUtils.js` → `src/theme/useThemeUtils.js`
- [ ] 2. Global find & replace all imports of `@/components/useThemeUtils` → `@/theme/useThemeUtils`
- [ ] 3. Verify build compiles with no missing-module errors
