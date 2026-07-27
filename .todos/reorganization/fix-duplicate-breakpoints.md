# Fix Duplicate Breakpoint Tokens: `sm` / `mobile` / `tablet`

**Recommended Model:** 🟡 G 3.6 F (M) — 2d | 3f | +2ctx

**Rationale:** `layout.breakpoints` in `tokens.js` has `mobile: 768` and `tablet: 768` (identical values) plus `sm: 640` which is unused in actual breakpoint logic.

```js
// Current (wrong):
breakpoints: { sm: 640, mobile: 768, tablet: 768, desktop: 1024 }
// sm unused, mobile === tablet
```

---

- [ ] 1. Decide canonical breakpoint names: remove `tablet` (duplicate of `mobile`) and either use or remove `sm` (🟢 G 3.6 F (L) — 1d | 1f | +0ctx)
- [ ] 2. Update `layout.breakpoints` in `src/theme/tokens.js` (🟢 G 3.6 F (L) — 1d | 1f | +0ctx)
- [ ] 3. Update `getDeviceTier` in `src/utils/layout.js` (or `layoutUtils.js`) to use correct token names (🟢 G 3.6 F (L) — 1d | 1f | +1ctx)
- [ ] 4. Search codebase for direct references to `breakpoints.sm`, `breakpoints.tablet` and update (🟡 G 3.6 F (M) — 2d | 4f | +2ctx)
- [ ] 5. Verify build compiles with no errors (🟢 G 3.6 F (L) — 1d | 1f | +0ctx)
