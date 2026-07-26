# Prompt: Expand Dynamic UI Architecture Auditor Rules

**Task Description:**
Extend the dynamic browser auditing suite (`.tools/browser-automation/auditors/01-dynamic-ui-architecture-auditor.ts`) to comprehensively detect elements detached from the design system architecture, un-tokenized styles, missing attributes, and improper component wrappers.

**Recommended AI Models:**
- **Full Implementation:** 🟠 Gemini 3.6 Flash (High) - 2 files

**Auditor Detection Rules to Implement:**

1. **Design System Token Compliance:**
   - Detect raw/hardcoded CSS colors (`hex`, `rgb`, `hsl`) in computed styles or inline styles that bypass theme tokens.
   - Detect non-token font sizes, line heights, and font families used outside the `Typography` component suite.
   - Detect hardcoded spacing (`margin`, `padding`), `border-radius`, and `box-shadow` values lacking spatial token classes.

2. **Component Architecture & Tracking:**
   - Flag inputs, search bars, cards, buttons, and custom controls missing `data-ui` or `data-component` architectural tracking attributes.
   - Detect raw image elements (`<img>` or un-wrapped images) used directly instead of `MediaRenderer` or `Icon` components.

3. **Interactive & State Observability:**
   - Flag clickable elements missing hover/active/focus states or having touch targets smaller than 44x44px.
   - Detect interactive buttons/inputs lacking proper `loading`, `disabled`, or error state indicators.
   - Detect custom interactive elements missing ARIA accessibility labels or contrast compliance.

4. **Theme & Motion Alignment:**
   - Flag elements with hardcoded light/dark theme values not responding to theme context changes.
   - Detect custom CSS transitions/animations defined outside the unified `motion` / `transition` token system.

5. **Hardcoded i18n Strings:**
   - Detect plain text strings rendered in DOM nodes without `data-i18n` attributes or translation keys.

**Implementation Goal:**
Update `01-dynamic-ui-architecture-auditor.ts` (and helpers) so that running `npm run audit:dynamic` or running smoke/admin-nav clickers automatically captures and reports all 7 categories of UI architecture violations in `.docs/audits/dynamic-audits/`.
