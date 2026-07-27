# TODO: Tokenize Hardcoded Styles — SharedLayoutWrapper.js

**File:** `src/components/SharedLayoutWrapper/SharedLayoutWrapper.js`
**Violations:** 2

---

- [x] L17 `[INLINE_STYLE]` `<View style={sharedLayoutWrapperStyles.wrapper}>` — resolved: references imported `sharedLayoutWrapperStyles` (static StyleSheet); not an inline object
- [x] L24 `[INLINE_STYLE]` `<View style={sharedLayoutWrapperStyles.footerInner}>` — resolved: same as above; already uses static StyleSheet entry
