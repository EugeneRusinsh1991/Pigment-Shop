# TODO: Tokenize Hardcoded Styles — CategoryIcons.js

**File:** `src/components/icons/CategoryIcons.js`
**Violations:** 5 (all INLINE_STYLE)

All follow the same pattern: `style={getSvgStyle(style)}`.

---

- [x] L26 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [x] L39 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [x] L55 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [x] L68 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`
- [x] L80 `[INLINE_STYLE]` SVG — `style={getSvgStyle(style)}`

**Refactor goal:** Confirm `getSvgStyle` uses design tokens; no raw values inside the helper.
