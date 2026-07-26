# Engineering Standard: Toggle Primitive Specification

> [!NOTE]
> This engineering standard defines the concrete module architecture, component model, public API, design tokens, hook extractions, and evolutionary rules for the **`Toggle`** UI primitive across PigmentShop, implementing [architecture-standards/ui/reference-module-spec.md](file:///d:/Magazine/_PigmentShop/architecture-standards/ui/reference-module-spec.md).

---

## 1. Core Engineering Principles

### 1.1 Semantic Purpose
The `Toggle` primitive represents a **multi-option view or mode selection control** where the user switches between mutually exclusive options, views, or presets. It stores and visually highlights the currently active selection.
- **Examples**: 
  - Product page content tabs (`[ Customer Reviews | Customer Questions ]`).
  - Catalog sorting mode (`[ Price Ascending | Price Descending ]`).
  - Admin header navigation tabs (`[ Analytics | Orders | Products | Categories ]`).
  - Analytics date ranges (`[ 7 Days | 30 Days | Custom ]`).

### 1.2 Base Token Integration
- Visual style (container background, active option highlight, typography) derives strictly from [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js) and [`src/theme/buttonCommon.js`](file:///d:/Magazine/_PigmentShop/src/theme/buttonCommon.js).
- Interactive touch targets guarantee a minimum 44x44px hitSlop.

---

## 2. Standard Reference Architecture

Following [.docs/architecture-standards/01-reference-ui-module.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/01-reference-ui-module.md):

```
src/components/Toggle/
├── index.js             # Public API barrel export
├── Toggle.js            # Core Presentational Toggle primitive
├── ToggleStyles.js      # Style factory mapping tokens to container & active highlight
├── useToggleTheme.js    # Theme resolution hook (Light / Dark mode)
└── useToggleAnimation.js # Animated active background slider / indicator hook
```

---

## 3. Public API & Interfaces

```jsx
// Toggle usage for multi-option view selection
<Toggle
  options={[
    { label: 'Customer Reviews', value: 'reviews' },
    { label: 'Customer Questions', value: 'questions' }
  ]}
  value={activeTab}
  onChange={setActiveTab}
  size="md" // sm | md
/>
```

---

## 4. Compliance Checklist
- [ ] Presentational component `Toggle.js` focuses purely on layout & interaction.
- [ ] Active indicator transition extracted to `useToggleAnimation.js`.
- [ ] Zero hardcoded hex colors or raw pixel offsets.
