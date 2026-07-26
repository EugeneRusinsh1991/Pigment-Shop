# Style Tokenization Task: src/features/catalog/CategoryCard.js

## Overview
Tokenize inline styles in `src/features/catalog/CategoryCard.js` to adhere to project design tokens and theme standards.
Found 5 style violation(s) in the audit report (5+ violations).

## Recommended Models
- **Execution:** 🟢 Gemini 3.6 Flash (Low)

## Step 1: Refactor Inline Styles
Refactor or extract the following inline style usages into StyleSheet definitions or design token utilities:
- L133: `style={getCardStyle(cardHeight, activeIsBanner, style)}`
- L136: `<View style={{ ...StyleSheet.absoluteFillObject, borderRadius: layout.radii.lg, overflow: 'hidden' }}>`
- L144: `<View style={getContentStyle(computedStyles, activeIsBanner)}>`
- L145: `<Heading level={3} style={getLabelStyle(computedStyles, activeIsBanner)} numberOfLines={2} isDark={isDark}>{label}</Heading>`
- L146: `<Text style={getDescStyle(computedStyles, activeIsBanner)} numberOfLines={2} isDark={isDark}>{desc}</Text>`

## Step 2: Verification
- Run UI audit (`npm run audit:ui`) and ensure violations for `src/features/catalog/CategoryCard.js` are resolved.
