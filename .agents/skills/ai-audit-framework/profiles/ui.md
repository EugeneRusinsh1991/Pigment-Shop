# UI & Design System Audit Profile

## Focus Areas
1. **Design System & Tokens**:
   - Hardcoded CSS/style values (`padding: 13px`, `color: #3b82f6`, `border-radius: 7px`, `height: 44px`) instead of design tokens (`layout.radii`, `colors.*`, `layout.heights`, `spacing.*`).
   - Inconsistent typography, font sizes, line-heights, radii, heights, and spacing systems across screens.

2. **Component Unification & Variant Consistency**:
   - Bespoke / fragmented implementations of standard primitives (`TouchableOpacity`, `Pressable`, `button`, `TextInput`) instead of shared design system components (`<Button>`, `<Input>`, `<Card>`, `<Badge>`, `<Modal>`).
   - Disparate heights, padding, border-radii, and active/focus/error states on interactive controls across storefront and admin views.

3. **Navigation Flow & UX Pattern Uniformity**:
   - Inconsistent CRUD navigation patterns (e.g. opening a full page for Product edit vs opening a Modal for Category edit). Equivalent admin entity flows must share unified presentation semantics (all full page or all modal/drawer).
   - Mixed navigation triggers, sticky header behaviors, breadcrumbs, and action toolbar layouts.

4. **Destructive Actions & Confirmation Dialogs**:
   - Inconsistent delete/archive prompts (e.g. native `window.confirm` vs custom Modal vs immediate un-confirmed deletion). All destructive actions must use a unified confirmation dialog contract.

5. **List Loading & Pagination Paradigms**:
   - Fragmented list loading behaviors (e.g. Infinite Scroll on catalog vs Pagination on orders vs "Load More" button on reviews). Equivalent list views must follow uniform pagination/scroll patterns.

6. **Form Validation, Error & Loading States**:
   - Disparate inline error messaging, input border highlights, submit button loading spinners, and form dirty/pristine guards.

7. **Search & Filter Interaction Patterns**:
   - Inconsistent debouncing durations, clear button behaviors, search input icons, and active filter pill tags across views.

8. **Data Presentation, Empty States & Skeletons**:
   - Fragmented data tables, entity lists, filter bars, and pagination controls.
   - Non-standardized loading spinners, skeleton screen placeholders, and zero-data / empty states across entities.

9. **Notification & Feedback Controls**:
   - Inconsistent toast messages, inline form error banners, confirmation dialogs, and alert banners.

10. **File / Image Upload & Drag-and-Drop**:
    - Disparate dropzones, image upload previews, progress indicators, and upload failure error handling.

11. **Responsive & Mobile Adaptive Behavior**:
    - Inconsistent mobile drawer vs desktop sidebar conversions, table-to-card transformations, and minimum touch target sizes (44x44px).

12. **Surfaces, Shadows & Elevation**:
    - Inconsistent shadows and elevation levels across cards, dropdowns, and panels (`elevation: 4`, `boxShadow` hardcoding instead of `shadows.*`).
    - Hardcoded surface background and border colors bypassing `surfaceLight`/`surfaceDark` and `borderLight`/`borderDark` tokens.

13. **Modals, Overlays & Navigation Shells**:
    - Hardcoded `zIndex` values (`zIndex: 10000`) instead of structured z-index layering tokens.
    - Non-standard backdrop overlays (`rgba(0,0,0,0.5)`) and inconsistent opening/closing drawer transitions.

14. **Typography & Responsive Spacing Grid**:
    - Text elements lacking standardized font scale tokens (`fonts.sans`, `fonts.serif`, typography variants).
    - Inconsistent padding/margin values breaking 4px/8px layout grid alignment.

15. **Dark / Light Mode Rigor**:
    - Missing dark/light mode parity, unhandled dynamic theme switches, or un-tokenized hardcoded color leakage (`#FFF`, `#000`).

16. **Animations & Micro-interactions**:
    - Fragmented or missing press/hover feedback animations across interactive elements.
    - Non-standardized animation parameters (`friction`, `tension`, `duration`) instead of shared motion tokens (`motion.press`).
    - Non-GPU accelerated property animations (`top`/`left`/`width` instead of `transform`/`opacity`).

17. **Cross-Component & Strict Global Primitive Requirement**:
    - **SINGLE PRIMITIVE RULE**: If an element is a BUTTON, SEARCH INPUT, or MODAL, it MUST be treated as a single unified component type across the ENTIRE project (Storefront, Admin, Modals, Headers).
    - Audit MUST NOT create separate button standards or separate input standards for different sub-folders or modules.
    - Audit MUST verify that 100% of clickable elements and text inputs across the whole repository use the EXACT SAME base primitive (`<Button>`, `<Input>`) with unified hover/press animations, border-radii, and heights.

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




