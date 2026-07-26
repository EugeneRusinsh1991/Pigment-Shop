# Roadmap: Migration & Unification to Standardized Card Primitive

> [!NOTE]
> This roadmap outlines the step-by-step technical plan to refactor existing scattered card implementations across PigmentShop into the unified **`Card`** primitive module according to [.docs/architecture-standards/05-card-module-spec.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/05-card-module-spec.md).

---

## Phase 1: Core Primitive Foundation (`src/components/Card/`) — 🔴 **Gemini 3.1 Pro (High)**

- [x] **1.1 Build Dynamic Style Factory (`CardStyles.js`)** — 🟡 **3.6 Flash (Medium)**
  - Implement token-driven styles referencing `tokens.js` (elevations, radii, border colors, variants).
- [x] **1.2 Create Theme Hook (`useCardTheme.js`)** — 🟡 **3.6 Flash (Medium)**
  - Implement hook for theme context resolution, dark mode fallbacks, and variant style calculations.
- [x] **1.3 Create Animation Hook (`useCardAnimation.js`)** — 🟡 **3.6 Flash (Medium)**
  - Extract scale & elevation hover/press drivers using `motion` tokens.
- [x] **1.4 Create Core Component & Sub-components (`Card.js`)** — 🟠 **3.6 Flash (High)**
  - Construct base `Card` container supporting slots: `Card.Image`, `Card.Content`, `Card.Title`, `Card.Badge`, `Card.Actions`, `Card.Skeleton`.
- [x] **1.5 Update Public Barrel (`index.js`)** — 🟢 **3.6 Flash (Low)**
  - Export unified `Card` primitive and hooks with zero breaking changes for existing consumers.

---

## Phase 2: Feature Component Migration — 🟠 **Gemini 3.6 Flash (High)**

- [x] **2.1 Refactor ProductCard (`src/features/product/ProductCard.js`)** — 🟠 **3.6 Flash (High)**
  - Replace custom container logic and `ProductCardStyles.js` with unified `<Card variant="grid">` slots.
- [x] **2.2 Refactor CategoryCard (`src/features/catalog/CategoryCard.js`)** — 🟡 **3.6 Flash (Medium)**
  - Transition category cards to `<Card variant="compact">`.
- [x] **2.3 Refactor OrderCard (`src/components/OrderCard.js`)** — 🟡 **3.6 Flash (Medium)**
  - Migrate customer order summaries to `<Card variant="list">`.
- [x] **2.4 Refactor Profile & Admin Cards** — 🟡 **3.6 Flash (Medium)**
  - Update `ProfileFormCard.js` and `UserInfoCard.js` to inherit from the standard `Card` primitive.

---

## Phase 3: Cleanup & Verification — 🟢 **Gemini 3.6 Flash (Low)**

- [x] **3.1 Deprecate Legacy Helpers** — 🟢 **3.6 Flash (Low)**
  - Remove obsolete/redundant primitives (`BaseCard.js`, `InteractiveCard.js`, `StaticCard.js`, `CardShadow.js`).
- [x] **3.2 Visual & Regression Audit** — 🟢 **3.6 Flash (Low)**
  - Verify layout integrity across Home, Catalog, and Products screens in both light and dark themes.
