# TODO: Tokenize Hardcoded Styles — ControlIcons.js

**File:** `src/components/icons/ControlIcons.js`
**Violations:** 18 (all INLINE_STYLE)

All follow same patterns: `style={getSvgStyle(style)}` or `style={getTextStyle(color, size, style)}`.

---

- [ ] L29 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L34 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`
- [ ] L40 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L46 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`
- [ ] L53 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L59 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`
- [ ] L65 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L71 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`
- [ ] L77 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L82 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`
- [ ] L88 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L93 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`
- [ ] L99 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L104 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`
- [ ] L110 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L116 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`
- [ ] L122 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L128 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`
- [ ] L134 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L139 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`
- [ ] L145 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L152 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`
- [ ] L158 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L165 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`
- [ ] L171 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L177 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`
- [ ] L183 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [ ] L189 `[INLINE_STYLE]` RN fallback — `style={getTextStyle(color, size, style)}`

**Refactor goal:** Confirm `getSvgStyle` and `getTextStyle` use design tokens; no raw values inside helpers.
