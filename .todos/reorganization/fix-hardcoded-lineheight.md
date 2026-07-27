# Fix Hardcoded `lineHeight` in Typography Variants

**Rationale:** All `VARIANTS` in `TextStyles.js` use tokenized `fontSize` but hardcode `lineHeight` as raw integers. There is no `lineHeight` scale in `tokens.js`, creating a split contract.

```js
// Current (wrong):
h1: { fontSize: typography.sizes.xxl, lineHeight: 34 }  // ❌
// Target:
h1: { fontSize: typography.sizes.xxl, lineHeight: typography.lineHeights.xxl }  // ✅
```

---

- [ ] 1. Add `lineHeights` map to `typography` in `src/theme/tokens.js` (e.g. `xs: 16, sm: 18, md: 24, lg: 28, xl: 30, xxl: 34`)
- [ ] 2. Replace all raw `lineHeight` integers in `src/components/Text/TextStyles.js` with `typography.lineHeights.*` references
- [ ] 3. Verify no raw lineHeight integers remain in `TextStyles.js`
