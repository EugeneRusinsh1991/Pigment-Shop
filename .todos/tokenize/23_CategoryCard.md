# TODO: Tokenize inline styles — CategoryCard

**File:** `src/features/catalog/CategoryCard.js`

## Issues
- [ ] L133 — `style={getCardStyle(cardHeight, activeIsBanner, style)}` — verify `cardHeight` is derived from a size token, not a raw number
- [ ] L144 — `style={getContentStyle(computedStyles, activeIsBanner)}` — verify all properties inside `getContentStyle` use tokens
- [ ] L145 — `style={getLabelStyle(computedStyles, activeIsBanner)}` on `Heading` — verify typography tokens used
- [ ] L146 — `style={getDescStyle(computedStyles, activeIsBanner)}` on `Text` — verify typography/color tokens used
