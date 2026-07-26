# Style Tokenization Task: src/features/catalog/PriceRangeSlider.js

## Overview
Tokenize hardcoded spacing and radii in `src/features/catalog/PriceRangeSlider.js` to adhere to project design tokens and theme standards.
Found 5 style violation(s) in the audit report (5+ violations).

## Recommended Models
- **Execution:** 🟢 Gemini 3.6 Flash (Low)

## Step 1: Tokenize Hardcoded Spacing
Replace the following hardcoded spacing and borderRadius values with project design tokens (`layout.spacing` / `layout.radii`):
- L154: `marginVertical: 8`
- L155: `paddingHorizontal: 10`
- L160: `borderRadius: 2`
- L166: `borderRadius: 2`
- L172: `borderRadius: 10`

## Step 2: Verification
- Run UI audit (`npm run audit:ui`) and ensure violations for `src/features/catalog/PriceRangeSlider.js` are resolved.
