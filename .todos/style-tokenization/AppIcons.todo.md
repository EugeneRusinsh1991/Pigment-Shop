# TODO: Tokenize Hardcoded Styles — AppIcons.js

**File:** `src/components/icons/AppIcons.js`
**Violations:** 18 (all INLINE_STYLE)

All violations follow the same pattern: dynamic `style` prop passed via `appIconStyles.getSvg(style)` or `appIconStyles.getText(color, size, style)`.

---

- [ ] L23 `[INLINE_STYLE]` SVG icon — `style={appIconStyles.getSvg(style)}`
- [ ] L36 `[INLINE_STYLE]` RN fallback — `style={appIconStyles.getText(color, size, style)}`
- [ ] L42 `[INLINE_STYLE]` SVG icon — `style={appIconStyles.getSvg(style)}`
- [ ] L47 `[INLINE_STYLE]` RN fallback — `style={appIconStyles.getText(color, size, style)}`
- [ ] L61 `[INLINE_STYLE]` SVG icon — `style={appIconStyles.getSvg(style)}`
- [ ] L68 `[INLINE_STYLE]` RN fallback — `style={appIconStyles.getText(color, size, style)}`
- [ ] L74 `[INLINE_STYLE]` SVG icon — `style={appIconStyles.getSvg(style)}`
- [ ] L81 `[INLINE_STYLE]` RN fallback — `style={appIconStyles.getText(color, size, style)}`
- [ ] L87 `[INLINE_STYLE]` SVG icon — `style={appIconStyles.getSvg(style)}`
- [ ] L93 `[INLINE_STYLE]` RN fallback — `style={appIconStyles.getText(color, size, style)}`
- [ ] L99 `[INLINE_STYLE]` SVG icon — `style={appIconStyles.getSvg(style)}`
- [ ] L106 `[INLINE_STYLE]` RN fallback — `style={appIconStyles.getText(color, size, style)}`
- [ ] L112 `[INLINE_STYLE]` SVG icon — `style={appIconStyles.getSvg(style)}`
- [ ] L117 `[INLINE_STYLE]` RN fallback — `style={appIconStyles.getText(color, size, style)}`
- [ ] L123 `[INLINE_STYLE]` SVG icon — `style={appIconStyles.getSvg(style)}`
- [ ] L129 `[INLINE_STYLE]` RN fallback — `style={appIconStyles.getText(color, size, style)}`
- [ ] L135 `[INLINE_STYLE]` SVG icon — `style={appIconStyles.getSvg(style)}`
- [ ] L141 `[INLINE_STYLE]` RN fallback — `style={appIconStyles.getText(color, size, style)}`
- [ ] L147 `[INLINE_STYLE]` SVG icon — `style={appIconStyles.getSvg(style)}`
- [ ] L153 `[INLINE_STYLE]` RN fallback — `style={appIconStyles.getText(color, size, style)}`
- [ ] L159 `[INLINE_STYLE]` SVG icon — `style={appIconStyles.getSvg(style)}`
- [ ] L165 `[INLINE_STYLE]` RN fallback — `style={appIconStyles.getText(color, size, style)}`
- [ ] L171 `[INLINE_STYLE]` SVG icon — `style={appIconStyles.getSvg(style)}`
- [ ] L179 `[INLINE_STYLE]` RN fallback — `style={appIconStyles.getText(color, size, style)}`
- [ ] L185 `[INLINE_STYLE]` SVG icon — `style={appIconStyles.getSvg(style)}`
- [ ] L191 `[INLINE_STYLE]` RN fallback — `style={appIconStyles.getText(color, size, style)}`

**Refactor goal:** Ensure `appIconStyles.getSvg` and `appIconStyles.getText` return token-backed static styles; confirm no raw values inside.
