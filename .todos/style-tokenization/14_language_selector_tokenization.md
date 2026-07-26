# Style Tokenization Task: src/features/shell/NavMenu/LanguageSelector.js

## Overview
Tokenize hardcoded spacing, color values, and inline styles in `src/features/shell/NavMenu/LanguageSelector.js` to adhere to project design tokens and theme standards.
Found 5 style violation(s) in the audit report (5+ violations).

## Recommended Models
- **Execution:** 🟢 Gemini 3.6 Flash (Low)

## Step 1: Refactor Styles & Spacing
Refactor inline styles and replace hardcoded spacing/color values:
- L19: `paddingVertical: 10`
- L25: `backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(15,23,42,0.03)'`
- L32: `container: { marginRight: 10 }`
- L49: `style={getThemeToggleStyle(isDark)}`
- L52: `<View style={getThemeIconStyles(isDark).container}>`

## Step 2: Verification
- Run UI audit (`npm run audit:ui`) and ensure violations for `src/features/shell/NavMenu/LanguageSelector.js` are resolved.
