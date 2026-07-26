# Typography Standardization Roadmap

## Phase 1: Audit & Discovery
- Identify remaining raw HTML typography tags (`<h1>`-`<h6>`, `<p>`, `<span>`, `label`).
- Scan codebase for inline typography overrides (`fontSize`, `fontWeight`, `lineHeight`, `fontFamily`).

## Phase 2: Design Token & Primitive Enforcement
- Restrict `Text` and `Heading` components to use predefined typography scale variants.
- Deprecate custom inline style overrides on typography primitives.

## Phase 3: Migration & Alignment
- Migrate all legacy raw tags to standard `Text` and `Heading` primitives.
- Remove redundant CSS/styled-component font overrides across UI features.

## Phase 4: Automated Linting & Verification
- Add ESLint/stylelint rules to prevent raw typography tags and custom font-size styles.
- Verify UI visuals for consistency across key pages.

## Model Recommendations

### Parent Task (All Phases)
🔴 **Gemini 3.1 Pro (High)** - >20 files
⚠️ **Action: BREAK DOWN INTO SUBTASKS** (Global UI primitive & cross-component migration)

### Itemized Subtasks
- **Phase 1: Audit & Discovery**: 🟡 **Gemini 3.6 Flash (Medium)** - 0 files
- **Phase 2: Design Token & Primitive Enforcement**: 🟡 **Gemini 3.6 Flash (Medium)** - 2 files
- **Phase 3: Migration & Alignment**: 🔴 **Gemini 3.1 Pro (High)** - >15 files
- **Phase 4: Automated Linting & Verification**: 🟢 **Gemini 3.6 Flash (Low)** - 2 files

## Audit Results (Phase 1)

### Raw HTML Typography Tags
- **Status**: Clean. No direct `<h1-h6>`, `<p>`, `<span>`, or `<label>` HTML elements found in `src/`. All text nodes are wrapped in framework/UI primitives.

### Typography Overrides Scan
- **Status**: Action Needed. Found **500+ inline/style-sheet font overrides** (`fontSize`, `fontWeight`, `lineHeight`, `fontFamily`).
- **Primary Locations with Overrides**:
  - `src/features/orders/OrdersPageStyles.js`
  - `src/features/favorites/FavoritesPageStyles.js`
  - `src/features/profile/ProfilePageStyles.js`
  - `src/features/product/ProductReviewsStyles.js`
  - `src/features/shell/components/Footer.js`
  - `src/features/shell/AppHeader/AppHeaderLogo.js`
  - `src/theme/tokens.js`


