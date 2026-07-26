# TODO: Tokenize Hardcoded Styles — NewArrivalsFooter.js

**File:** `src/features/catalog/components/NewArrivalsFooter.js`
**Violations:** 3

---

- [ ] L40 `[INLINE_STYLE]` `<View style={{ paddingVertical: 32, alignItems: 'center' }}>` — extract to named style; replace `32` with `layout.spacing.xxl` token
- [ ] L40 `[HARDCODED_SPACING]` `paddingVertical: 32` — replace with `layout.spacing.xxl`
- [ ] L41 `[INLINE_STYLE]` `<Text ... style={{ fontStyle: 'italic', textAlign: 'center' }}>` — extract to named style in StyleSheet
