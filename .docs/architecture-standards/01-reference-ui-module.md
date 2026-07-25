# Engineering Standard: UI Module Architecture

> [!NOTE]
> This standard defines the core architectural principles, API design rules, and module decomposition guidelines for all UI primitives across PigmentShop (e.g., Button, Modal, Card, Drawer, SearchBar, Checkbox).

---

## 1. Core Engineering Principles

### 1.1 Semantic First
UI primitives are defined by their **domain responsibility and interaction semantics**, not by their visual appearance.
- **Button**: Triggers an action or command.
- **Tab**: Navigates between view panels.
- **Chip / Tag**: Represents a selectable filter or metadata property.

*Rule*: Visual similarity is not a valid reason to merge distinct semantic concepts into a single component, nor to use one component for unrelated semantics.

### 1.2 Composition Before Component Proliferation
Solve UI variations using configuration props before introducing new component primitives.
- **Prefer**: `<Button variant="text" loading />`
- **Avoid**: `TextButton`, `LoadingButton`, `IconLoadingButton`

*Rule*: A new component primitive is justified only when it introduces distinct behavior, state management, or accessibility semantics.

### 1.3 Behaviors vs. Visual Variants
Clearly separate visual variants from interactive behaviors:
- **Visual Variants** (`variant="text | outline | solid"`): Control color, borders, and typography.
- **Behaviors** (`loading`, `animated`, `disabled`): Control state, gestures, and interaction feedback.

*Rule*: Behaviors must be composable props on the base primitive and should never spawn separate component types.

### 1.4 Interactive Primitive Rule
Do not use `Button` as a generic replacement for every clickable UI element:
- Carousel indicators navigate slides $\rightarrow$ Use Carousel Indicator primitive.
- Segmented controls toggle view modes $\rightarrow$ Use Segmented Control primitive.
- Navigation drawers open sub-pages $\rightarrow$ Use Navigation Drawer primitive.

---

## 2. Module Structure & Responsibility-Driven Split

### 2.1 File Allocation Rule
A file must justify its own existence. Separate components into independent files **only when**:
1. The component manages non-trivial internal state or custom hooks.
2. The component requires a dedicated `StyleSheet` exceeding ~100 lines.
3. The component represents a distinct public primitive with unique props.

*Rule*: Do NOT create separate files for 3-line inline wrapper components.

### 2.2 Public API Stability & `index.js`
Every multi-file UI module must export a single, explicit public API through `index.js`.
- Internal file layouts, styling helpers, and private sub-components may be refactored freely.
- The public export interface exposed to application consumers must remain strictly backward-compatible.

---

## 3. Module Evolution & Flexibility Matrix

Different UI modules require different internal file structures based on complexity:

| Module Scale | Example Modules | Target File Structure | Justification |
| :--- | :--- | :--- | :--- |
| **Simple Primitive** | `EmptyState`, `FieldError` | Single file (`EmptyState.js`) | Under 150 lines, no internal state, single visual representation. |
| **Standard UI Module** | `SearchBar`, `Breadcrumb` | `ModuleName.js`, `ModuleNameStyles.js` | Keeps component render logic decoupled from static styling objects. |
| **Complex Multi-Variant Module** | `Button`, `Modal`, `Card` | `index.js`, `Base.js`, `VariantA.js`, `VariantB.js` | Multiple distinct semantic primitives sharing underlying animations/themes. |

---

## 4. Maintenance & Evolutionary Guidance

This standard is a living engineering guide. Future components may extend or adapt internal file boundaries provided they prioritize maintainability, avoid premature abstractions, and preserve stable public APIs.
