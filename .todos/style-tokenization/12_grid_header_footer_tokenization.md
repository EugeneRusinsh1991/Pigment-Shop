# Style Tokenization Task: src/features/catalog/GridHeaderFooter.js

## Overview
Tokenize inline styles in `src/features/catalog/GridHeaderFooter.js` to adhere to project design tokens and theme standards.
Found 8 style violation(s) in the audit report (5+ violations).

## Recommended Models
- **Execution:** 🟢 Gemini 3.6 Flash (Low)

## Step 1: Refactor Inline Styles
Refactor or extract the following inline style usages into StyleSheet definitions or design token utilities:
- L44: `style={itemStyle}`
- L50: `<Text style={textStyle}>`
- L59: `<View style={getSortDropdownStyles(isDark)}>`
- L81: `<View style={{ zIndex: layout.zIndices.drawer, position: 'relative' }}>`
- L84: `style={buttonStyle}`
- L87: `<Text style={textStyle}>`
- L93: `style={buttonStyle}`
- L96: `<Text style={textStyle}>`

## Step 2: Verification
- Run UI audit (`npm run audit:ui`) and ensure violations for `src/features/catalog/GridHeaderFooter.js` are resolved.
