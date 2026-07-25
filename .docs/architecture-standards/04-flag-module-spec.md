# Engineering Standard: Flag Primitive Specification

> [!NOTE]
> This engineering standard defines the architecture, API contracts, decomposition rules, and design token integration for the **`Flag`** (State Switcher / Boolean Attribute Input) UI primitive across PigmentShop, implementing [.docs/architecture-standards/01-reference-ui-module.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/01-reference-ui-module.md).

---

## 1. Core Engineering Principles

### 1.1 Semantic Purpose
The `Flag` primitive represents a **binary state switcher or boolean attribute input** (ON/OFF, Active/Inactive, Enabled/Disabled). It stores and visually represents the standalone state of a single property or filter tag.
- **Examples**:
  - Attribute chips in admin lists (`[ Discounted ]`, `[ New Arrival ]`).
  - Order status chips (`[ Pending ]`, `[ Completed ]`, `[ Cancelled ]`).
  - Form checkboxes and status switches (`Is Active`, `Is Featured`, Theme Switcher).

### 1.2 Base Token Integration
- Visual styling (active fill, inactive border, checkmark icons) derives strictly from [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js).
- Minimum hitSlop calculation ensuring 44x44px touch targets.

---

## 2. Standard Reference Architecture

Following [.docs/architecture-standards/01-reference-ui-module.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/01-reference-ui-module.md):

```
src/components/Flag/
├── index.js           # Public API barrel export
├── Flag.js            # Core Presentational Flag primitive
├── FlagGroup.js       # Container for multi-flag filters
├── FlagStyles.js      # Style factory for active/inactive state overlays
└── useFlagTheme.js    # Theme resolution hook
```

---

## 3. Public API & Interfaces

```jsx
// 1. Standalone Flag Switcher
<Flag
  checked={isNew}
  onChange={setIsNew}
  variant="chip" // chip | switch | checkbox
>
  New Arrival
</Flag>

// 2. FlagGroup for Status Filters
<FlagGroup
  value={selectedStatuses}
  onChange={setSelectedStatuses}
>
  <Flag value="pending">Pending</Flag>
  <Flag value="completed">Completed</Flag>
</FlagGroup>
```

---

## 4. Compliance Checklist
- [ ] Presentational component `Flag.js` focuses purely on state presentation & layout.
- [ ] Mapped from central theme tokens in `tokens.js`.
- [ ] Supports clean accessibility roles (`switch`, `checkbox`, `button`).
