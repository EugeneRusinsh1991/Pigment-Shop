# TODO: Tokenize inline styles — VideoRenderer

**File:** `src/components/Media/VideoRenderer.js`

## Issues
- [ ] L79 — `{ objectFit: resizeMode === 'cover' ? 'cover' : 'contain' }` hardcoded string values — extract to a token map (e.g. `mediaTokens.objectFit`) or a helper that returns token values
- [ ] L79 — `StyleSheet.flatten([mediaStyles.webMedia, ...])` — confirm `mediaStyles.webMedia` uses tokens only
