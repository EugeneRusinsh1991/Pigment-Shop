# Fix `activeOpacity` — Raw Values, No Motion Token (20+ usages)

**Rationale:** `buttonCommon.js` defines `DEFAULT_ACTIVE_OPACITY = 0.8` as a module constant, not a design token. 20+ files bypass it with scattered raw values (`0.7`, `0.75`, `0.85`, `0.9`), making press feedback inconsistent.

**Recommended Model:** 🔴 G 3.1 P (H) — 6d | 11f | +1ctx

---

- [ ] 1. Add `motion.press.activeOpacity: 0.8` to `src/theme/tokens.js`
- [ ] 2. Remove `DEFAULT_ACTIVE_OPACITY` from `src/theme/buttonCommon.js` (replace usages with token)
- [ ] `src/components/Toggle/Toggle.js` — `0.7` → token
- [ ] `src/components/Card/Card.js` — `0.85` → token
- [ ] `src/components/Badge/Badge.js` — `0.75` → token
- [ ] `src/features/shell/NavMenu/NavItemList.js` — `0.7` → token
- [ ] `src/features/shell/NavMenu/MainMenuContent.js` — `0.7` → token
- [ ] `src/features/shell/NavMenu/CategoryTreeNodeButtons.js` — `0.7` → token
- [ ] `src/features/admin/Users/UserRow.js` — `0.7` → token
- [ ] `src/features/admin/Categories/CategoryRow.js` — `0.85` → token
- [ ] `src/features/admin/Banners/BannersManager.js` — `0.8`, `0.85` → token
- [ ] Run full grep for remaining raw `activeOpacity` values and fix
