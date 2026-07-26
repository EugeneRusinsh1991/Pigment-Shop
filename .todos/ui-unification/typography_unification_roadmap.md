# Typography Unification Roadmap & Model Recommendations

Based on [text-module-spec.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/text-module-spec.md) and [model-recommender](file:///d:/Magazine/_PigmentShop/.agents/skills/moderl-recomender/SKILL.md).

---

## Phase 1: Core Primitive Foundation (`src/components/Text/`)
> 💡 **Phase Recommendation**: 🟠 **Gemini 3.6 Flash (High)** (5 files overall, building primitive module).

- [x] **Task 1.1: Build Typography Style Factory (`TextStyles.js`)**
  - *Complexity*: Low (2/5, 1 file) | 🟡 **Gemini 3.6 Flash (Medium)**
- [x] **Task 1.2: Build Text Theme Hook (`useTextTheme.js`)**
  - *Complexity*: Low (2/5, 1 file) | 🟡 **Gemini 3.6 Flash (Medium)**
- [x] **Task 1.3: Build Core Text Component (`Text.js`)**
  - *Complexity*: Low-Medium (2-3/5, 1 file) | 🟡 **Gemini 3.6 Flash (Medium)**
- [x] **Task 1.4: Build Heading Sub-Primitive (`Heading.js`)**
  - *Complexity*: Trivial (1/5, 1 file) | 🟢 **Gemini 3.6 Flash (Low)**
- [x] **Task 1.5: Build Public Barrel Export (`index.js`)**
  - *Complexity*: Trivial (1/5, 1 file) | 🟢 **Gemini 3.6 Flash (Low)**

---

## Phase 2: Feature Refactoring & Migration

### Task 2.1: Migrate Shell & Header Components
> 💡 **Task Recommendation**: 🔴 **Gemini 3.1 Pro (High)** (6 files total). Can be executed as 2 sub-tasks:

- [ ] **Task 2.1a: Header Elements (`AppHeaderStyles.js`, `UserDropdown.js`, `AppHeaderLogo.js`)**
  - *Complexity*: Low (3 files) | 🟡 **Gemini 3.6 Flash (Medium)**
- [ ] **Task 2.1b: Navigation & Menu (`LanguageSelector.js`, `NavMenuStyles.js`, `MainMenuContent.js`)**
  - *Complexity*: Low (3 files) | 🟡 **Gemini 3.6 Flash (Medium)**

---

### Task 2.2: Migrate Catalog Components
> 💡 **Task Recommendation**: 🔴 **Gemini 3.1 Pro (High)** (6 files total). Can be executed as 2 sub-tasks:

- [ ] **Task 2.2a: Category Cards & Grid (`ProductGrid.js`, `CategoryCard.js`, `categoryCardStyles.js`)**
  - *Complexity*: Low (3 files) | 🟡 **Gemini 3.6 Flash (Medium)**
- [ ] **Task 2.2b: Sort, Pagination & Filter Sidebar (`CatalogSortBar.js`, `CatalogPagination.js`, `CatalogFilterSidebarStyles.js`)**
  - *Complexity*: Low (3 files) | 🟡 **Gemini 3.6 Flash (Medium)**

---

### Task 2.3: Migrate Product Details & Cards
> 💡 **Task Recommendation**: 🔴 **Gemini 3.1 Pro (High)** (5 files total). Can be executed as 2 sub-tasks:

- [ ] **Task 2.3a: Product Page & Info (`ProductInfoSubcomponents.js`, `ProductPageStyles.js`, `ProductCardStyles.js`)**
  - *Complexity*: Low (3 files) | 🟡 **Gemini 3.6 Flash (Medium)**
- [ ] **Task 2.3b: Product Reviews (`ProductReviewsStyles.js`, `ProductReviewSubcomponents.js`)**
  - *Complexity*: Low (2 files) | 🟡 **Gemini 3.6 Flash (Medium)**

---

### Task 2.4: Migrate Cart & Orders Components
> 💡 **Task Recommendation**: 🔴 **Gemini 3.1 Pro (High)** (5 files total). Can be executed as 2 sub-tasks:

- [ ] **Task 2.4a: Cart Views (`CartViewStyles.js`, `CartItem.js`)**
  - *Complexity*: Low (2 files) | 🟡 **Gemini 3.6 Flash (Medium)**
- [ ] **Task 2.4b: Orders Feature (`OrderRows.js`, `OrderHeader.js`, `OrderDetailsCard.js`)**
  - *Complexity*: Low (3 files) | 🟡 **Gemini 3.6 Flash (Medium)**

---

### Task 2.5: Migrate Profile, Auth, Contact & Common Components
> 💡 **Task Recommendation**: 🔴 **Gemini 3.1 Pro (High)** (>15 files total). Sub-divided into targeted sub-tasks:

- [ ] **Task 2.5a: Profile, Favorites & Auth (`ProfilePageStyles.js`, `FavoritesPageStyles.js`, `LoginPageStyles.js`)**
  - *Complexity*: Low (3 files) | 🟡 **Gemini 3.6 Flash (Medium)**
- [ ] **Task 2.5b: Contact Page Components (`ContactPageStyles.js`, `ContactQuestionForm.js`, `SocialButtons.js`)**
  - *Complexity*: Low (3 files) | 🟡 **Gemini 3.6 Flash (Medium)**
- [ ] **Task 2.5c: Core Layout & Form Controls (`TextFieldStyles.js`, `ToggleStyles.js`, `FieldError.js`, `SearchStyles.js`, `SearchDropdown.js`)**
  - *Complexity*: Medium (5 files) | 🟠 **Gemini 3.6 Flash (High)**
- [ ] **Task 2.5d: Navigation & Display Widgets (`PageNavigation.js`, `DiscountsSection.js`, `EmptyState.js`, `ToastView.js`, `ConfirmationModal.js`)**
  - *Complexity*: Medium (5 files) | 🟠 **Gemini 3.6 Flash (High)**
- [ ] **Task 2.5e: Footers & Carousels (`Footer.js`, `NewArrivalsFooter.js`, `carouselStyles.js`, `OrdersPageStyles.js`)**
  - *Complexity*: Medium (4 files) | 🟠 **Gemini 3.6 Flash (High)**

---

## Phase 3: Cleanup & Verification
> 💡 **Phase Recommendation**: 🟡 **Gemini 3.6 Flash (Medium)** (verification & cleanup).

- [ ] **Task 3.1: Deprecate Legacy Text Styles (`commonStyles.js`)**
  - *Complexity*: Low (1 file) | 🟡 **Gemini 3.6 Flash (Medium)**
- [ ] **Task 3.2: Codebase Audit & Theme Contrast Verification**
  - *Complexity*: Low-Medium (Codebase search & audit) | 🟡 **Gemini 3.6 Flash (Medium)**


