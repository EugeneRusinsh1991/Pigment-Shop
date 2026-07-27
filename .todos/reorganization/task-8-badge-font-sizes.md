# Task 8: Tokenize Badge Font Sizes

🟡 G 3.6 F (M) — 1d | 1f | +2r

## Overview
Map badge font sizes to typography tokens or move to badgeTokens in tokens.js.

## File to Refactor
- `Badge.js`

## Action
Map `badgeFontSizes` to `typography.sizes` tokens or move to `badgeTokens` in `tokens.js`

## Details
**View changes:** Check `Badge.js` (refactored) and `tokens.js` (if badgeTokens added)
**UI impact:** Check badges throughout the app - no visual changes expected, only code refactoring

## Notes
- Review current badgeFontSizes implementation
- Determine if mapping to existing typography.sizes is appropriate
- If not, create badgeTokens in tokens.js
- Update all badge component references
- Run tests to ensure no breaking changes
