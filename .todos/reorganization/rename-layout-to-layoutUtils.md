# Rename layout.js → src/utils/layoutUtils.js

**Rationale:** Contains layout grid metrics (`SIDEBAR_WIDTH`, `CARD_MARGIN`, `getDeviceTier`). The generic name `layout.js` overlaps with design tokens in `src/theme/tokens.js`.

---

- [ ] 1. Rename file `src/utils/layout.js` → `src/utils/layoutUtils.js`
- [ ] 2. Global find & replace all imports of `utils/layout` → `utils/layoutUtils` across the codebase
- [ ] 3. Verify build compiles with no missing-module errors
