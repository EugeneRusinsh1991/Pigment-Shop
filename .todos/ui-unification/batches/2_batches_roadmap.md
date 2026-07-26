# Roadmap: Migration & Unification to Standardized Badge Primitive (Batches)

> [!NOTE]
> This roadmap outlines the technical migration plan to refactor all scattered badge, tag, status pill, and chip implementations ("батчи / badges") across PigmentShop into a unified **`Badge`** primitive module according to [.docs/architecture-standards/ui/batches-module-spec.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/batches-module-spec.md).

---

## Phase 1: Core Primitive Foundation (`src/components/Badge/`) — 🔴 **Gemini 3.1 Pro (High)**

- [ ] **1.1 Build Dynamic Style Factory (`BadgeStyles.js`)** — 🟡 **3.6 Flash (Medium)**
  - Implement token-driven styles referencing `tokens.js` (colors, radii, typography, variants).
- [ ] **1.2 Create Theme Hook (`useBadgeTheme.js`)** — 🟡 **3.6 Flash (Medium)**
  - Implement hook for theme context resolution, variant calculations (`new`, `discount`, `status`, `counter`, `chip`), and dark mode support.
- [ ] **1.3 Create Animation Hook (`useBadgeAnimation.js`)** — 🟡 **3.6 Flash (Medium)**
  - Implement scale/pulse animation drivers for cart counter badges and interactive chip presses.
- [ ] **1.4 Create Core Presentational Component (`Badge.js`)** — 🟠 **3.6 Flash (High)**
  - Construct universal `Badge` component supporting variants (`product`, `status`, `counter`, `chip`).
- [ ] **1.5 Update Public Barrel (`index.js`)** — 🟢 **3.6 Flash (Low)**
  - Export unified `Badge` primitive and hooks.

---

## Phase 2: Feature Component Migration — 🟠 **Gemini 3.6 Flash (High)**

- [ ] **2.1 Refactor ProductBadges (`src/features/product/ProductBadges.js`)** — 🟠 **3.6 Flash (High)**
  - Replace product badge container styling with unified `<Badge variant="product">` (NEW, FEATURED, Discount).
- [ ] **2.2 Refactor Customer Order Status Badge (`src/components/OrderCard.js`)** — 🟡 **3.6 Flash (Medium)**
  - Migrate customer order status indicators to `<Badge variant="status">`.
- [ ] **2.3 Refactor Admin Orders Table Badges (`src/components/Admin/Orders/OrderRowComponents.js`)** — 🟡 **3.6 Flash (Medium)**
  - Standardize admin order status pills (Pending, Processing, Completed, Cancelled) with `<Badge variant="status">`.
- [ ] **2.4 Refactor Admin Products Table Badges (`src/components/Admin/Products/ProductRowComponents.js`)** — 🟡 **3.6 Flash (Medium)**
  - Migrate product publication status pills (Active / Inactive) to `<Badge variant="status">`.
- [ ] **2.5 Refactor Admin Category Holder Badges (`src/components/Admin/Categories/CategoryRowComponents.js`)** — 🟡 **3.6 Flash (Medium)**
  - Update hierarchy indicators (Category Holder, Product Holder) to `<Badge variant="subtle">`.
- [ ] **2.6 Refactor Header Cart Badge (`src/features/shell/AppHeader/AppHeaderControls.js`)** — 🟡 **3.6 Flash (Medium)**
  - Replace custom header cart count bubble with `<Badge variant="counter">`.
- [ ] **2.7 Refactor Analytics & Product Filter Chips (`src/components/Admin/Analytics/AnalyticsComponents.js`)** — 🟡 **3.6 Flash (Medium)**
  - Update date period filter pills and product filter chips to `<Badge variant="chip">`.

---

## Phase 3: Cleanup & Verification — 🟢 **Gemini 3.6 Flash (Low)**

- [ ] **3.1 Deprecate & Clean Up Legacy Helper Styles** — 🟢 **3.6 Flash (Low)**
  - Remove duplicate inline badge style definitions and legacy map helpers.
- [ ] **3.2 Visual & Regression Audit** — 🟢 **3.6 Flash (Low)**
  - Verify rendering across Home, Product Details, Customer Orders, and Admin views in light and dark themes.
