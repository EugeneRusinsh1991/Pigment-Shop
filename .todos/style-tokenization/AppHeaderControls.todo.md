# TODO: Tokenize Hardcoded Styles — AppHeaderControls.js

**File:** `src/features/shell/AppHeader/AppHeaderControls.js`
**Violations:** 2

---

- [ ] L82 `[INLINE_STYLE]` `<View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>` — extract to named style in StyleSheet
- [ ] L89 `[INLINE_STYLE]` `style={{ position: 'absolute', top: -layout.spacing.xs, right: -(layout.spacing.xs + 4) }}` — extract to computed named style; replace magic `4` with a token
