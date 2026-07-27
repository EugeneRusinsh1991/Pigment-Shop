# TODO: Tokenize inline styles — GifRenderer

**File:** `src/components/Media/GifRenderer.js`

## Issues
- [ ] L13 — `style={StyleSheet.flatten([...])}` — review flattened styles for any hardcoded values
- [ ] L40 — `style={style}` — verify forwarded style prop does not carry hardcoded values from callers
