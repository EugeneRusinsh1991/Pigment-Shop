# TODO: Tokenize Hardcoded Styles — CategoryCard.js

**File:** `src/features/catalog/CategoryCard.js`
**Violations:** 4

---

- [ ] L133 `[INLINE_STYLE]` `style={getCardStyle(cardHeight, activeIsBanner, style)}` — extract to token-backed static style helper
- [ ] L144 `[INLINE_STYLE]` `<View style={getContentStyle(computedStyles, activeIsBanner)}>` — extract to token-backed static style helper
- [ ] L145 `[INLINE_STYLE]` `<Heading ... style={getLabelStyle(computedStyles, activeIsBanner)}>` — extract to token-backed static style helper
- [ ] L146 `[INLINE_STYLE]` `<Text style={getDescStyle(computedStyles, activeIsBanner)}>` — extract to token-backed static style helper
