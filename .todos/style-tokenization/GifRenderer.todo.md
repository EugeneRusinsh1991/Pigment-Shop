# TODO: Tokenize Hardcoded Styles — GifRenderer.js

**File:** `src/components/Media/GifRenderer.js`
**Violations:** 2

---

- [ ] L13 `[INLINE_STYLE]` `style={StyleSheet.flatten([...])` — extract flattened style to static StyleSheet
- [ ] L40 `[INLINE_STYLE]` `style={style}` — pass through prop; ensure callers pass token-backed styles
