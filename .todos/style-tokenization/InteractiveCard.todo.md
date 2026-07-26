# TODO: Tokenize Hardcoded Styles — InteractiveCard.js

**File:** `src/components/Card/InteractiveCard.js`
**Violations:** 4

---

- [ ] L71 `[INLINE_STYLE]` `<ScrollFadeUp ref={ref} style={computedOuterStyle}>` — flatten into static StyleSheet array
- [ ] L72 `[INLINE_STYLE]` `<Animated.View style={innerStyle}>` — flatten into static StyleSheet array
- [ ] L75 `[INLINE_STYLE]` `style={staticStyles.touchable}` — ensure referenced via static StyleSheet
- [ ] L91 `[INLINE_STYLE]` `<CardShadow ... style={{ width: cardWidth, height: cardHeight, borderRadius }}>` — extract to computed style object via tokens
