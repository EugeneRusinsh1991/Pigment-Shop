# TODO: Tokenize Hardcoded Styles — HeroCarousel.js

**File:** `src/features/home/components/HeroCarousel.js`
**Violations:** 4

---

- [ ] L37 `[HARDCODED_SPACING]` `borderRadius: 0` — replace with token (e.g. `layout.borderRadius.none` or `0` via token)
- [ ] L64 `[INLINE_STYLE]` `return <View style={placeholderStyle} />` — flatten into static StyleSheet array
- [ ] L71 `[INLINE_STYLE]` `<View style={baseStyle}>` — flatten into static StyleSheet array
- [ ] L72 `[INLINE_STYLE]` `<View style={localStyles.carouselContainer}>` — move to static StyleSheet
