# Contact Page Redesign Specification & Implementation Roadmap

## 1. Architectural Vision & Core Principles

This specification defines the architectural foundation, component model, responsive rules, and phased execution plan for the future redesign of the Contact Page.

### Core Architectural Directives
1. **Zero Page-Specific UI Duplication**: Every UI element must consume standard design system tokens, layout primitives, and shared component abstractions.
2. **Prerequisites First**: If a required generic building block (e.g., token, component primitive, validation helper) does not exist, it **must be introduced into the core design system/shared architecture first** before page-level work begins.
3. **Strict Token Adherence**: No inline magic numbers, custom hex colors, hardcoded font sizes, or ad-hoc media queries are permitted.
4. **Full Localization (i18n)**: All UI copy, ARIA accessibility attributes, error strings, and placeholders must be driven by localized key dictionaries.

---

## 2. Layout Structure & Responsive Specifications

The Contact Page consists of a three-column container designed for dynamic adaptation across standard breakpoints.

### 2.1. Section Breakdowns

#### Left Section: Contact Information
- **Headline & Description**: Rendered via shared Typography primitives (`Heading`, `Paragraph`).
- **Direct Contacts**: Phone, email, address using shared `IconTextList` or `ContactDetailItem` primitives.
- **Social Links**: Rendered via shared `SocialIconGroup` / `IconButton` components.

#### Center Section: Contact Form
- **Form Controls**: Built using design system form components (`InputText`, `InputEmail`, `InputPhone`, `Textarea`, `FormGroup`, `FormErrorMessage`).
- **Submit Action**: Built using shared `Button` component supporting primary variant, loading spinner, disabled states, and focus styles.
- **Form Management**: Driven by centralized validation and form state hooks.

#### Right Section: Auxiliary Content
- **FAQ Component**: Rendered using shared accordion or card components (`Card`, `Accordion`).
- **Business Info & Hours**: Rendered using standard structured card modules (`InfoCard`).
- **Support Cards**: Reusable action cards directing users to secondary support channels.

### 2.2. Responsive Grid Rules

- **Desktop (`>= 1024px`)**:
  - Three-column grid (`Left` | `Center` | `Right`).
  - Column ratio: 1fr : 1.5fr : 1fr or equivalent design system container width rules.
  - Spacing: Standard `var(--spacing-xl)` layout gaps.
- **Tablet (`768px - 1023px`)**:
  - 3-column responsive grid adapted to available viewport width.
  - Adjusted spacing (`var(--spacing-md)`) and fluid typography tokens.
- **Mobile (`< 768px`)**:
  - Single column stacked vertical flow:
    1. Left Section (Contact Info & Context)
    2. Center Section (Contact Form)
    3. Right Section (Auxiliary Content & FAQs)
  - Full-width touch targets (minimum 44px height for interactive inputs/buttons).

---

## 3. Architectural Prerequisites & Existing Assets to Reuse

### 3.1. Architectural Prerequisites & Targeted File Paths
Before implementation, validate existing files:
- **Design Tokens**: `src/theme/tokens.js`, `src/theme/colors.js`, `src/theme/typography.js`, `src/theme/layout.js`
- **Translations Dictionary**: `src/data/translations.js` (add `contactPage` namespace)
- **Shared Components Directory**: `src/components/`
- **Contact Feature Directory**: `src/features/contact/`

### 3.2. Existing Shared Assets to Reuse
- **Design Tokens**: Color, Spacing, Radius, Typography in `src/theme/`
- **Shared Primitives**: `src/components/` (Button, Input, Card, Icon, Typography)
- **Services & Data**: `src/services/contactService.js` for form submission logic

### 3.3. New Building Blocks to Introduce First (If Missing)
Add generic building blocks under shared paths:
- `src/components/SocialIconGroup.js`: Reusable social channel icon links.
- `src/components/ContactDetailItem.js`: Generic compound component displaying icon, label, and copyable/clickable detail.
- `src/components/FaqCard.js`: Reusable collapsible/static question-answer card module.

---

## 4. Phased Implementation Roadmap & Acceptance Criteria `★ PH — 4d 9f +8r`

### Phase 1: Audit & Architectural Building Blocks `◐ FM — 1d 3f +4r`
**Goal**: Validate existing primitives and build missing shared components/tokens.
- **Tasks**:
  1. Audit design tokens (`src/theme/tokens.js`) and shared inputs (`src/components/`). `○ FL — 1d 1f +2r`
  2. Create missing generic primitives (`src/components/ContactDetailItem.js`, `src/components/SocialIconGroup.js`, `src/components/FaqCard.js`). `◐ FM — 1d 3f +3r`
  3. Add localized keys under `contactPage` namespace in `src/data/translations.js`. `○ FL — 1d 1f +1r`
- **Acceptance Criteria**:
  - [ ] Zero page-specific styles introduced in shared components.
  - [ ] Shared primitives exported cleanly from `src/components/`.
  - [ ] Localization keys present in `src/data/translations.js`.

### Phase 2: Page Component Composition `◐ FM — 1d 3f +4r`
**Goal**: Compose Left, Center, and Right sections using shared components.
- **Tasks**:
  1. Create `src/features/contact/ContactInfoSection.js` consuming `ContactDetailItem` & `SocialIconGroup`. `○ FL — 1d 1f +2r`
  2. Refactor/create `src/features/contact/ContactFormSection.js` using shared form inputs & `src/services/contactService.js`. `◐ FM — 1d 1f +3r`
  3. Create `src/features/contact/ContactAuxiliarySection.js` consuming `FaqCard` & `InfoCard`. `○ FL — 1d 1f +2r`
- **Acceptance Criteria**:
  - [ ] Sections contain zero hardcoded strings (100% consuming `src/data/translations.js`).
  - [ ] Form displays inline validation errors on invalid input.
  - [ ] Submit button cleanly handles loading, success, and error states via `contactService.js`.

### Phase 3: Responsive Layout Assembly & Grid Integration `◐ FM — 1d 2f +2r`
**Goal**: Assemble sections inside 3-column layout in `src/features/contact/ContactPage.js`.
- **Tasks**:
  1. Assemble layout container in `src/features/contact/ContactPage.js` consuming tokens from `src/theme/layout.js`. `○ FL — 1d 1f +2r`
  2. Apply breakpoint rules (`src/theme/layout.js`) for desktop 3-col, tablet adaptive 3-col, and mobile single column stack order. `○ FL — 1d 1f +2r`
- **Acceptance Criteria**:
  - [ ] Desktop (`>= 1024px`) renders clean 3-column layout with token spacing.
  - [ ] Tablet (`768px-1023px`) adapts columns smoothly without horizontal overflow.
  - [ ] Mobile (`< 768px`) stacks sections vertically in specified order (Info -> Form -> Auxiliary).

### Phase 4: Verification & Quality Assurance `◐ FM — 1d 1f +4r`
**Goal**: Ensure architectural compliance, accessibility, and design system fidelity.
- **Tasks**:
  1. Run audit script `.tools/audits/check-hardcoded-styles.js` against `src/features/contact/`. `○ FL — 1d 1f +3r`
  2. Verify keyboard navigation (tabbing order) and responsive rendering across viewports. `○ FL — 1d 1f +2r`
- **Acceptance Criteria**:
  - [ ] 0 strict hardcoded style violations reported in audit log.
  - [ ] Full keyboard navigation support (Tab order follows DOM visual flow).
  - [ ] Responsive design verified cleanly across desktop, tablet, and mobile viewports.

---

## 5. Architectural Risks & Considerations

1. **Custom Style Bleed**:
   - *Risk*: Risk of writing page-specific CSS classes with hardcoded values instead of using tokenized variables.
   - *Mitigation*: Run hardcoded style audit scripts prior to PR merge.
2. **Form State Complexity**:
   - *Risk*: Re-inventing form validation logic inside the page component.
   - *Mitigation*: Enforce usage of centralized form hooks and validation schema utilities.
3. **Mobile Stack Order Drift**:
   - *Risk*: DOM order mismatch causing screen readers to read auxiliary content before contact form on mobile.
   - *Mitigation*: Ensure natural DOM sequence matches mobile visual order (Info -> Form -> Auxiliary).
