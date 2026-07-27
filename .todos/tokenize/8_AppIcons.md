# TODO: Tokenize inline styles — AppIcons

**File:** `src/components/Icons/AppIcons.js`

## Issues
- [ ] L26, L45, L64, L77, L90, L102, L115, L126, L138, L150, L162, L174, L188 — SVG `strokeWidth="2"` / `strokeWidth="2.5"` hardcoded — extract to icon token (e.g. `iconTokens.strokeWidth.default`, `iconTokens.strokeWidth.bold`)
- [ ] L26, L45, L64, L77, L90, L102, L115, L126, L138, L150, L162, L174, L188 — `viewBox="0 0 24 24"` hardcoded — consider an icon token constant
- [ ] L39, L50, L71, L84, L96, L109, L120, L132, L144, L156, L168, L182, L194 — `style={appIconStyles.getText(color, size, style)}` — verify helper builds styles from tokens only
- [ ] L115 — `fill={filled ? getThemeColor(color) : 'none'}` — `'none'` should be a token (`colors.transparent`)
