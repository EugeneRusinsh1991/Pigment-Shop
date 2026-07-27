# Task 5: Fix Button Colors Anti-Pattern

🟡 G 3.6 F (M) — 1d | 1f | +2r

## Overview
Remove re-export indirection in buttonCommon.js or consolidate into tokens.js.

## File to Refactor
- `buttonCommon.js`

## Action
Remove re-export indirection or consolidate into `tokens.js`

## Details
**View changes:** Check `buttonCommon.js` (refactored) and `tokens.js` (if consolidated)
**UI impact:** Check buttons throughout the app (no visual changes expected, only code refactoring)

## Notes
- Review current implementation in buttonCommon.js
- Determine if consolidation into tokens.js is appropriate
- Update all imports if consolidated
- Run tests to ensure no breaking changes
