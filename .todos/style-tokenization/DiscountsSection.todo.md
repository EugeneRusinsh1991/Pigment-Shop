# TODO: Tokenize Hardcoded Styles — DiscountsSection.js

**File:** `src/features/home/components/DiscountsSection.js`
**Violations:** 3

---

- [ ] L23 `[INLINE_STYLE]` `<ScrollFadeUp style={headerStyle}>` — flatten into static StyleSheet array
- [ ] L68 `[INLINE_STYLE]` `<View style={{ paddingVertical: layout.spacing.xxl, alignItems: 'center' }}>` — extract to named style in StyleSheet using token
- [ ] L69 `[INLINE_STYLE]` `<Text ... style={{ fontStyle: 'italic', textAlign: 'center' }}>` — extract to named style in StyleSheet
