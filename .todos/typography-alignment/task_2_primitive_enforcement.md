# Task 2: Design Token & Primitive Enforcement

## Goal
Restrict `Text` and `Heading` primitives to rely on standardized design token variants and prevent uncoordinated inline font style overrides.

## Steps
1. Audit current prop definitions in `src/components/Text/Text.js` and `src/components/Text/Heading.js`.
2. Ensure strict variant mapping for `fontSize`, `lineHeight`, and `fontWeight` based on `src/theme/tokens.js`.
3. Add warnings or strict prop types against passing custom font size overrides directly into `style` prop.
4. Verify primitive behavior across basic UI renders.

## Target Files
- [Text.js](file:///d:/Magazine/_PigmentShop/src/components/Text/Text.js)
- [Heading.js](file:///d:/Magazine/_PigmentShop/src/components/Text/Heading.js)
