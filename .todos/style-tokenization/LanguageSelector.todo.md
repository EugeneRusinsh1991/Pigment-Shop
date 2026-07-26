# TODO: Tokenize Hardcoded Styles — LanguageSelector.js

**File:** `src/features/shell/NavMenu/LanguageSelector.js`
**Violations:** 5

---

- [ ] L19 `[HARDCODED_SPACING]` Replace `paddingVertical: 10` with token (e.g. `layout.spacing.sm`)
- [ ] L25 `[HARDCODED_COLOR]` Replace `rgba(255,255,255,0.03)` / `rgba(15,23,42,0.03)` with theme color tokens
- [ ] L32 `[HARDCODED_SPACING]` Replace `marginRight: 10` with token (e.g. `layout.spacing.sm`)
- [ ] L49 `[INLINE_STYLE]` `style={getThemeToggleStyle(isDark)}` — ensure helper uses tokens; no raw values
- [ ] L52 `[INLINE_STYLE]` `<View style={getThemeIconStyles(isDark).container}>` — ensure helper uses tokens; no raw values
