# TODO: Tokenize Hardcoded Styles — ProductGrid.js

**File:** `src/features/catalog/ProductGrid.js`
**Violations:** 3

---

- [ ] L21 `[INLINE_STYLE]` `<View style={{ width: itemWidth, alignSelf: 'stretch' }}>` — extract to computed named style
- [ ] L42 `[INLINE_STYLE]` `style={isNarrow ? { alignSelf: 'center', width: gridWidth || '100%', minHeight: '100%' } : { width: '100%', minHeight: '100%' }}` — extract to computed named styles using StyleSheet
- [ ] L59 `[HARDCODED_SPACING]` `paddingBottom: 0` — replace with token (e.g. `layout.spacing.none`)
