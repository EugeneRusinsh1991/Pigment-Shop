# TODO: Tokenize Hardcoded Styles — Card.js

**File:** `src/components/Card/Card.js`
**Violations:** 4

---

- [x] L42 `[INLINE_STYLE]` `<Animated.View style={combinedStyle}>` — flatten into static StyleSheet array
- [x] L47 `[INLINE_STYLE]` `style={staticStyles.touchable}` — ensure referenced via static StyleSheet
- [x] L61 `[INLINE_STYLE]` `<View ref={ref} style={combinedStyle}>` — flatten into static StyleSheet array
- [x] L70 `[INLINE_STYLE]` `<View style={slotStyles.imageContainer}>` — move to static StyleSheet
