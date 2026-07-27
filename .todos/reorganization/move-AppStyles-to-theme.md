# Move AppStyles.js → src/theme/appStyles.js

**Model Recommendation:** 🔴 G 3.1 P (H) — 5d | 7f | +1ctx

**Rationale:** `AppStyles.js` defines global theme styles (`heroContainer`, `breadcrumbBar`, `stickySearchContainer`) and imports design tokens. It should reside in `src/theme/` rather than floating at the `src/` root.

---

- [x] 1. Move file `src/AppStyles.js` → `src/theme/appStyles.js`
- [x] 2. Update import inside `src/theme/appStyles.js` (`./theme/tokens` → `./tokens`)
- [x] 3. Global find & replace all imports of `AppStyles` → `src/theme/appStyles` (or relative `./theme/appStyles`)
- [x] 4. Verify build compiles with no missing-module errors
