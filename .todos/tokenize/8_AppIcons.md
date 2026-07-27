# TODO: Tokenize inline styles — AppIcons

**File:** `src/components/Icons/AppIcons.js`

## Issues
- [x] L26, L45, L64, L77, L90, L102, L115, L126, L138, L150, L162, L174, L188 — SVG `strokeWidth` extracted to `iconTokens.strokeWidth`
- [x] L26, L45, L64, L77, L90, L102, L115, L126, L138, L150, L162, L174, L188 — `viewBox` extracted to `iconTokens.viewBox`
- [x] L39, L50, L71, L84, L96, L109, L120, L132, L144, L156, L168, L182, L194 — Verified `appIconStyles.getText` uses `colors.textLight` via fallback
- [x] L115 — `fill` updated to use `iconTokens.fillNone` and `getThemeColor(color)`

Created At: 2026-07-27T09:00:42Z
Completed At: 2026-07-27T12:00:41Z
