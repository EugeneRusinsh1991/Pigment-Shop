# UI & Design System Audit Profile

## Focus Areas

### Design System & Tokens
- Hardcoded spacing, colors, radii, typography, shadows, heights, z-index, opacity, and animation values instead of design tokens.
- Inconsistent use of typography, spacing scale, elevation, and color system.
- Missing semantic token usage (surface, border, text, accent, success, warning, danger).

### Component Unification & Primitive Consistency
- Multiple implementations of equivalent primitives instead of shared design system components.
- Divergent button, input, modal, card, badge, dropdown, checkbox, switch, tooltip, and table implementations.
- Inconsistent interactive states (hover, pressed, focus, disabled, loading, error).

### Layout System & Responsive Design
- Broken spacing grid.
- Mixed layout techniques.
- Inconsistent responsive breakpoints.
- Missing adaptive layouts for mobile/tablet/desktop.
- Touch targets below accessibility recommendations.

### Navigation & UX Consistency
- Inconsistent CRUD interaction patterns.
- Mixed navigation paradigms.
- Different toolbar, breadcrumb, and page header layouts.
- Inconsistent modal vs page vs drawer decisions.

### Forms & Input Experience
- Different validation patterns.
- Inconsistent loading states.
- Missing dirty-state handling.
- Different required field indicators.
- Autofocus and keyboard navigation inconsistencies.

### Search, Filtering & Data Exploration
- Different search behaviors.
- Inconsistent filtering controls.
- Fragmented sorting and pagination paradigms.
- Missing filter persistence where appropriate.

### Lists, Tables & Data Presentation
- Different entity table implementations.
- Missing skeletons.
- Different empty states.
- Inconsistent pagination.
- Poor data density consistency.

### Feedback & User Communication
- Different toast systems.
- Different confirmation dialogs.
- Different inline error presentation.
- Missing success and loading feedback.

### File Upload & Media Components
- Multiple upload implementations.
- Different drag-and-drop experiences.
- Inconsistent preview generation.
- Missing upload progress and failure handling.

### Surface, Elevation & Visual Hierarchy
- Hardcoded shadows.
- Inconsistent card elevation.
- Mixed border treatments.
- Poor visual hierarchy between containers.

### Theme Architecture
- Hardcoded colors bypassing theme tokens.
- Missing dark/light mode parity.
- Components incompatible with runtime theme switching.

### Motion & Interaction Design
- Missing interaction feedback.
- Different animation timing.
- Missing shared motion tokens.
- Non-performant animations (layout instead of transform/opacity).

### Accessibility (WCAG)
- Insufficient color contrast.
- Missing focus indicators.
- Missing ARIA attributes.
- Incorrect heading hierarchy.
- Keyboard navigation issues.
- Missing screen reader labels.

### Design System Maintainability
- Duplicate components.
- Components with overlapping responsibilities.
- Missing composition patterns.
- Design system APIs inconsistent across primitives.

---

# Cross-Component & Whole-Project Requirements

When auditing **Whole Project**, the audit MUST:

- Treat the repository as one unified design system.
- Evaluate every screen, shared component, feature module, admin panel, storefront, and internal tooling together.
- Verify that all visual primitives originate from a single shared component library.
- Detect duplicate implementations of equivalent UI patterns.
- Detect inconsistent interaction behaviors across modules.
- Detect deviations from design tokens.
- Prioritize systemic design inconsistencies over isolated styling issues.
- MUST NOT define separate design systems for different application areas unless explicitly intended.

## Single Primitive Rule

Buttons, Inputs, Modals, Cards, Dropdowns, Tables, Checkboxes, Switches, Tooltips, Badges, Tabs, and similar primitives MUST each have one canonical implementation across the entire repository.

Equivalent UI elements MUST share:

- identical base component
- tokenized styling
- interaction states
- accessibility behavior
- sizing system
- spacing system
- animation behavior

## Anti-Patterns & Examples

### Example 1: Inconsistent Navigation Flow (Page vs Modal)
❌ **Bad: Mixed interaction paradigms for identical CRUD entity actions**
```tsx
// Product click -> Navigates to new page
const handleEditProduct = (id) => navigate(`/admin/product/${id}`);
// Category click -> Opens modal window
const handleEditCategory = (id) => setCategoryModalOpen(true);
```

✅ **Good: Unified UX navigation pattern across administrative entities**
```tsx
// Standardized entity drawer / modal manager for all CRUD edits
const handleEditEntity = (type, id) => openEntityDrawer(type, id);
```

### Example 3: Ad-hoc Modal Layout vs Centralized FormModalLayout
❌ **Bad: Custom inline Modal wrapper with duplicated overlay & footer styles**
```tsx
<Modal visible={visible}>
  <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' }}>
    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 16 }}>
      <Text>Title</Text>
      <TouchableOpacity onPress={onClose}><Text>Cancel</Text></TouchableOpacity>
      <TouchableOpacity onPress={onSave}><Text>Save</Text></TouchableOpacity>
    </View>
  </View>
</Modal>
```

✅ **Good: Reusable FormModalLayout with standardized footer actions**
```tsx
<FormModalLayout visible={visible} title={title} onClose={onClose} onSave={onSave}>
  {children}
</FormModalLayout>
```

### Example 4: Hardcoded Placeholder Color vs Tokenized FieldInput
❌ **Bad: Hardcoded placeholder colors in presentational screens**
```tsx
<TextInput placeholder="Search..." placeholderTextColor="#94A3B8" style={{ height: 40 }} />
```

✅ **Good: Centralized FieldInput component using theme token**
```tsx
<FieldInput placeholder="Search..." placeholderTextColor={colors.slateStrong} />
```




