# TODO: Tokenize inline styles — InteractiveCard

**File:** `src/components/Card/InteractiveCard.js`

## Issues
- [ ] L77 — `style={computedOuterStyle}` on `ScrollFadeUp` ref — verify outer spacing from tokens
- [ ] L78 — `style={innerStyle}` on `Animated.View` — verify inner spacing from tokens
- [ ] L81 — `style={staticStyles.touchable}` — verify touchable padding/hit area from tokens
- [ ] L97 — `lightBgColor={defaultLightBg}` on `CardShadow` — replace hardcoded light bg color with token
