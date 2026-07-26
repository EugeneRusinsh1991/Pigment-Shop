# Style Tokenization Task: src/features/shell/NavMenu/NavMenuStyles.js

## Overview
Tokenize hardcoded spacing, color values, and gaps in `src/features/shell/NavMenu/NavMenuStyles.js` to adhere to project design tokens and theme standards.
Found 6 style violation(s) in the audit report (5+ violations).

## Recommended Models
- **Execution:** 🟢 Gemini 3.6 Flash (Low)

## Step 1: Refactor Styles & Spacing
Replace the following hardcoded spacing and color values with project design tokens (`layout.spacing`, theme colors):
- L58: `paddingVertical: 13`
- L63: `utilLabel: { flex: 1, marginLeft: 10 }`
- L86: `selectedRowDark: { backgroundColor: 'rgba(227, 27, 35, 0.12)' }`
- L87: `selectedRowLight: { backgroundColor: 'rgba(227, 27, 35, 0.05)' }`
- L104: `paddingBottom: 28`
- L120: `langRow: { flexDirection: 'row', gap: 10 }`

## Step 2: Verification
- Run UI audit (`npm run audit:ui`) and ensure violations for `src/features/shell/NavMenu/NavMenuStyles.js` are resolved.
