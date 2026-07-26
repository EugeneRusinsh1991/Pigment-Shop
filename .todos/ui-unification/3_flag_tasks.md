# Detailed Task & Subtask Plan: Unification of Flag Elements to Centralized Flag Module

Based on [.todos/ui-unification/2_flag_roadmap.md](file:///d:/Magazine/_PigmentShop/.todos/ui-unification/2_flag_roadmap.md), [.todos/ui-unification/2_flag.md](file:///d:/Magazine/_PigmentShop/.todos/ui-unification/2_flag.md), and [.docs/architecture-standards/04-flag-module-spec.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/04-flag-module-spec.md).

## Phase 3: Consumer Screens & Feature Modules Refactoring

### Task 3.1: Product Attribute & Row Badges

#### Task 3.1.1: Product Attribute Badges
- **File**: [ProductBadges.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductBadges.js)
- **Subtasks**:
  - [x] **Subtask 3.1.1a**: Import `Flag` component into `ProductBadges.js`. `[Model: 🟢 Gemini 3.6 Flash (Low)]`
  - [x] **Subtask 3.1.1b**: Replace Sale badge element with `<Flag variant="chip" readOnly colorScheme="sale">`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
  - [x] **Subtask 3.1.1c**: Replace New badge element with `<Flag variant="chip" readOnly colorScheme="new">`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
  - [x] **Subtask 3.1.1d**: Replace Featured badge element with `<Flag variant="chip" readOnly colorScheme="featured">`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

#### Task 3.1.2: Product Row Table Status Badges
- **File**: [ProductRowComponents.js](file:///d:/Magazine/_PigmentShop/src/components/Admin/Products/ProductRowComponents.js)
- **Subtasks**:
  - [x] **Subtask 3.1.2a**: Import `Flag` component into `ProductRowComponents.js`. `[Model: 🟢 Gemini 3.6 Flash (Low)]`
  - [x] **Subtask 3.1.2b**: Refactor `Active`/`Inactive` status indicator to `<Flag variant="chip">`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
  - [x] **Subtask 3.1.2c**: Refactor `In Stock`/`Out of Stock` stock indicator to `<Flag variant="chip">`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

---

### Task 3.2: Category Form Selectors & Row Badges

#### Task 3.2.1: Category Form Type Selector Chips
- **File**: [CategoryFormFields.js](file:///d:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoryFormFields.js)
- **Subtasks**:
  - [x] **Subtask 3.2.1a**: Import `Flag` and `FlagGroup` into `CategoryFormFields.js`. `[Model: 🟢 Gemini 3.6 Flash (Low)]`
  - [x] **Subtask 3.2.1b**: Wrap Category Type options in `<FlagGroup>`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
  - [x] **Subtask 3.2.1c**: Replace type option buttons with interactive `<Flag variant="chip">`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
  - [x] **Subtask 3.2.1d**: Test category form state updates on selection. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

#### Task 3.2.2: Category Row Display Badges
- **File**: [CategoryRow.js](file:///d:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoryRow.js)
- **Subtasks**:
  - [x] **Subtask 3.2.2a**: Import `Flag` into `CategoryRow.js`. `[Model: 🟢 Gemini 3.6 Flash (Low)]`
  - [x] **Subtask 3.2.2b**: Replace category type display badge with read-only `<Flag variant="chip">`. `[Model: 🟢 Gemini 3.6 Flash (Low)]`

---

### Task 3.3: Order Status Selectors & Badges

#### Task 3.3.1: Admin Order Status Selector Trigger
- **File**: [OrderStatusSelector.js](file:///d:/Magazine/_PigmentShop/src/components/Admin/Orders/OrderStatusSelector.js)
- **Subtasks**:
  - [x] **Subtask 3.3.1a**: Import `Flag` into `OrderStatusSelector.js`. `[Model: 🟢 Gemini 3.6 Flash (Low)]`
  - [x] **Subtask 3.3.1b**: Replace current status badge trigger with interactive `<Flag variant="chip">`. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
  - [x] **Subtask 3.3.1c**: Ensure dropdown trigger click opens status options menu. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`

#### Task 3.3.2: Admin Order Row Status Badge
- **File**: [OrderRow.js](file:///d:/Magazine/_PigmentShop/src/components/Admin/Orders/OrderRow.js)
- **Subtasks**:
  - [x] **Subtask 3.3.2a**: Import `Flag` into `OrderRow.js`. `[Model: 🟢 Gemini 3.6 Flash (Low)]`
  - [x] **Subtask 3.3.2b**: Replace order status badge (Pending, Completed, Processing, Cancelled) with read-only `<Flag variant="chip">`. `[Model: 🟢 Gemini 3.6 Flash (Low)]`

#### Task 3.3.3: Customer Order Card Status Badge
- **File**: [OrderCard.js](file:///d:/Magazine/_PigmentShop/src/components/OrderCard.js)
- **Subtasks**:
  - [x] **Subtask 3.3.3a**: Import `Flag` into `OrderCard.js`. `[Model: 🟢 Gemini 3.6 Flash (Low)]`
  - [x] **Subtask 3.3.3b**: Replace order status display badge with read-only `<Flag variant="chip">`. `[Model: 🟢 Gemini 3.6 Flash (Low)]`

---

## Phase 4: Verification & Integration Testing

### Task 4.1: Quality Assurance & Visual Audit
- **Subtasks**:
  - [x] **Subtask 4.1.1**: Touch target check (minimum 44x44px hit areas on interactive flags). `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
  - [x] **Subtask 4.1.2**: Contrast audit in both light and dark modes. `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
  - [x] **Subtask 4.1.3**: Keyboard navigation audit (`Tab`, `Space`, `Enter`). `[Model: 🟡 Gemini 3.6 Flash (Medium)]`
  - [x] **Subtask 4.1.4**: Code cleanup check (verify zero inline style overrides or legacy flag CSS classes remain). `[Model: 🟠 Gemini 3.6 Flash (High)]`
