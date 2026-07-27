# Consolidate Dual Shadow Sources

**Rationale:** `src/theme/shadows.js` and the `shadows` export in `tokens.js` are parallel sources for the same data. Two shadow sources cause confusion about which is authoritative.

**Recommended Model:** 🟡 G 3.6 F (M) — 2d | 5f | +1ctx

---

- [x] 1. Compare `src/theme/shadows.js` and the `export const shadows` block in `src/theme/tokens.js` — identify the canonical source
- [x] 2. Delete the non-canonical file (or merge any unique values into the canonical source)
- [x] 3. Global find & replace all imports of the deleted file to point to the canonical source
- [x] 4. Verify build compiles with no missing-module errors
