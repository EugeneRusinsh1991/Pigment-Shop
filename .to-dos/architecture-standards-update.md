# Architecture Standards Gap Analysis & Update Proposal

---

## Executive Summary

A comprehensive architectural audit was conducted across the PigmentShop codebase (`src/`, `.docs/`, `.todos/`, `.tools/`, `app/`) comparing the implemented codebase with the official **Architecture Standards** (`.docs/architecture-standards/`). 

### Key Findings & Health Metrics

- **Overall Architecture Health:** **High (Implementation)** / **Medium-Low (Documentation)**. The codebase possesses robust, highly modular architectural patterns (decomposed UI primitives, dynamic design tokens, reactive admin state managers, cross-platform storage abstraction, and haptic feedback integration). However, the official Architecture Standards have drifted significantly from the current codebase.
- **Documentation Completeness:** Estimated at **~40%**. Critical core subsystems (Haptics, Design Tokens/Theme System, Responsive Viewport Layouts, Scroll Auto-Hide Subsystem, Browser Automation, App Bootstrap Lifecycle, and RBAC Security) are completely absent from `.docs/architecture-standards/`.
- **Missing Standards:** **10 Major Subsystems / Primitives** lack documentation.
- **Outdated Standards:** **8 Existing Specifications** contain file name mismatches, non-existent component references, or obsolete folder structures.
- **Highest Priority Improvements:**
  1. Overhaul `src/hooks/README.md` (index all 32 actual hooks; correct misnamed/missing hooks).
  2. Correct structural contradictions in UI module specs (`Button`, `Media`, `Icons`, `Card`, `Feedback`).
  3. Formalize newly implemented subsystems into standards (`Haptics`, `Theme & Tokens`, `Responsive Architecture`, `Scroll Subsystem`, `RBAC & Admin State`).
  4. Expand the `services/` standards index beyond a single generic reference document.

---

## Missing Standards

The following architectural concepts actively exist and operate in the project implementation but have **no corresponding documentation** in `.docs/architecture-standards/`:

### 1. Haptic Feedback Subsystem Architecture
- **Description:** Centralized haptic feedback execution framework bridging web (`navigator.vibrate`) and native (`expo-haptics`) targets with semantic feedback triggers (`selection`, `impactLight`, `impactMedium`, `impactHeavy`, `notificationSuccess`, `notificationError`).
- **Evidence:** [`src/theme/haptics.js`](file:///d:/Magazine/_PigmentShop/src/theme/haptics.js), [`src/hooks/useHaptics.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useHaptics.js), [`src/services/haptics/hapticsService.js`](file:///d:/Magazine/_PigmentShop/src/services/haptics/hapticsService.js), and audit document [`.todos/haptic-feedback-audit.md`](file:///d:/Magazine/_PigmentShop/.todos/haptic-feedback-audit.md).
- **Why It Belongs:** Haptic feedback is integrated across all interactive UI primitives (`Button`, `Toggle`, `Card`, `Drawer`, `PullToRefreshIndicator`). Standardizing trigger rules prevents inconsistent vibration behavior across screens.
- **Suggested Location:** `.docs/architecture-standards/ui/haptic-feedback-spec.md`

### 2. Design Tokens & Theme System Architecture
- **Description:** Centralized token definitions, semantic color mapping, dark/light theme resolution, dynamic style map factories, and token replacement tooling.
- **Evidence:** [`src/theme/tokens.js`](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js), [`src/theme/colors.js`](file:///d:/Magazine/_PigmentShop/src/theme/colors.js), [`src/theme/typography.js`](file:///d:/Magazine/_PigmentShop/src/theme/typography.js), [`src/theme/shadows.js`](file:///d:/Magazine/_PigmentShop/src/theme/shadows.js), [`src/theme/layout.js`](file:///d:/Magazine/_PigmentShop/src/theme/layout.js), [`src/theme/useThemeUtils.js`](file:///d:/Magazine/_PigmentShop/src/theme/useThemeUtils.js), and root script [`replace_tokens.js`](file:///d:/Magazine/_PigmentShop/replace_tokens.js).
- **Why It Belongs:** Defines how all styling tokens flow from raw values to semantic themes and component style sheets. Essential for maintaining UI consistency and avoiding hardcoded inline styles.
- **Suggested Location:** `.docs/architecture-standards/ui/theme-and-tokens-spec.md`

### 3. Responsive Architecture & Visual Viewport System
- **Description:** Multi-breakpoint responsive layout engine computing dynamic grid columns, card widths, and container bounds based on device class (mobile, tablet, desktop) and visual viewport state.
- **Evidence:** [`src/hooks/useVisualViewportDimensions.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useVisualViewportDimensions.js), [`src/hooks/useCardDimensions.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useCardDimensions.js), [`src/hooks/useCatalogLayout.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useCatalogLayout.js), [`src/hooks/useGridLayout.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useGridLayout.js), [`src/theme/layout.js`](file:///d:/Magazine/_PigmentShop/src/theme/layout.js).
- **Why It Belongs:** Ensures uniform breakpoint handling and layout scaling across Storefront and Admin on mobile web, desktop, and tablet screens.
- **Suggested Location:** `.docs/architecture-standards/ui/responsive-architecture-spec.md`

### 4. Scroll Subsystem & Header/TabBar Auto-Hide
- **Description:** Scroll gesture control system managing scroll direction detection, auto-hiding navigation headers and tab bars on scroll, and pull-to-refresh resistance physics.
- **Evidence:** [`src/hooks/useHomeScrollHide.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js), [`src/hooks/usePullToRefresh.js`](file:///d:/Magazine/_PigmentShop/src/hooks/usePullToRefresh.js), [`src/components/ui/Feedback/PullToRefreshIndicator.js`](file:///d:/Magazine/_PigmentShop/src/components/ui/Feedback/PullToRefreshIndicator.js).
- **Why It Belongs:** Standardizes scroll performance thresholds, header collapsing animations, and pull-to-refresh touch behaviors across views.
- **Suggested Location:** `.docs/architecture-standards/ui/scroll-subsystem-spec.md`

### 5. App Bootstrap Lifecycle & Visitor Session Management
- **Description:** App initialization sequence managing anonymous visitor bootstrapping, seed data loading, authentication state restoration, and initial store context hydration.
- **Evidence:** [`src/services/visitorBootstrap.js`](file:///d:/Magazine/_PigmentShop/src/services/visitorBootstrap.js), [`src/bootstrap/`](file:///d:/Magazine/_PigmentShop/src/bootstrap/), [`src/context/AppProviders.js`](file:///d:/Magazine/_PigmentShop/src/context/AppProviders.js), and `.docs/project-knowledge/bootstrap-system.md`.
- **Why It Belongs:** Establishes the canonical execution path from app launch to fully hydrated UI, preventing race conditions during app initialization.
- **Suggested Location:** `.docs/architecture-standards/services/bootstrap-and-session-spec.md`

### 6. Storage Subsystem Architecture
- **Description:** Unified cross-platform persistence abstraction handling storage engines (Web `sessionStorage`/`localStorage` vs Native storage), key namespaces, JSON serialization, versioned migrations, and fallback mechanics.
- **Evidence:** [`src/services/storage/`](file:///d:/Magazine/_PigmentShop/src/services/storage/), [`src/services/storageService.js`](file:///d:/Magazine/_PigmentShop/src/services/storageService.js), [`src/hooks/useSessionState.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useSessionState.js), and `.docs/project-knowledge/storage-subsystem.md`.
- **Why It Belongs:** Governs offline data storage, state persistence across reloads, and cross-platform compatibility rules.
- **Suggested Location:** `.docs/architecture-standards/services/storage-subsystem-spec.md`

### 7. Observability, Error Handling & Telemetry Architecture
- **Description:** Error handling pipeline standardizing error boundary fallbacks, toast error notifications, centralized error logging (`useErrorHandler`), and audit verification tools.
- **Evidence:** [`src/hooks/useErrorHandler.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useErrorHandler.js), [`src/context/ToastContext.js`](file:///d:/Magazine/_PigmentShop/src/context/ToastContext.js), [`src/components/ui/Feedback/ErrorBoundary/`](file:///d:/Magazine/_PigmentShop/src/components/ui/Feedback/ErrorBoundary/), `.tools/auditors/`, and `.docs/project-knowledge/observability.md`.
- **Why It Belongs:** Essential for enforcing consistent user error feedback and preventing silent failures.
- **Suggested Location:** `.docs/architecture-standards/observability-and-error-handling-spec.md`

### 8. UI Grid Primitive (`UnifiedCardGrid`) & Page Container (`StorefrontPageContainer`)
- **Description:** Presentational primitives for standardizing card grid layouts and page-level container wrappers.
- **Evidence:** [`src/components/ui/Grid/UnifiedCardGrid.js`](file:///d:/Magazine/_PigmentShop/src/components/ui/Grid/UnifiedCardGrid.js) and [`src/components/ui/Layout/StorefrontPageContainer.js`](file:///d:/Magazine/_PigmentShop/src/components/ui/Layout/StorefrontPageContainer.js).
- **Why It Belongs:** Both components are active presentational primitives in `src/components/ui/` but are omitted from `.docs/architecture-standards/ui/README.md` and have no module specifications.
- **Suggested Location:** `.docs/architecture-standards/ui/grid-module-spec.md` and `.docs/architecture-standards/ui/layout-module-spec.md`

### 9. Browser Automation & Quality Inspection Architecture
- **Description:** Framework for end-to-end browser automation, Playwright integration, visual regression testing, and code hygiene auditors.
- **Evidence:** `.tools/automation/`, `.tools/scripts/open-playwright.js`, `.tools/auditors/`, `.tools/README.md`, and `.docs/project-knowledge/browser-automation.md`.
- **Why It Belongs:** Automated testing and architectural audit tools are core to maintaining codebase quality and preventing regressions.
- **Suggested Location:** `.docs/architecture-standards/automation-and-testing-spec.md`

### 10. Application State Architecture & Context Standards
- **Description:** Standard defining React Context boundaries, custom hook composition hierarchy, reactive sub-manager stores (`adminCatalogState.js`), and local component state rules.
- **Evidence:** [`src/context/`](file:///d:/Magazine/_PigmentShop/src/context/) (`AppProviders`, `AuthContext`, `ThemeContext`, `ToastContext`, `LanguageContext`), [`src/services/adminCatalogState.js`](file:///d:/Magazine/_PigmentShop/src/services/adminCatalogState.js), and 32 custom hooks.
- **Why It Belongs:** Clarifies where state should reside (Context vs Hook vs Local vs Reactive Service Manager) to prevent performance degradation and state duplication.
- **Suggested Location:** `.docs/architecture-standards/state-management-spec.md`

---

## Outdated Standards

The following existing standards no longer accurately reflect the project codebase:

| Existing Document | Current Implementation | Detected Difference | Proposed Update |
| :--- | :--- | :--- | :--- |
| [`src/hooks/README.md`](file:///d:/Magazine/_PigmentShop/src/hooks/README.md) | `src/hooks/` contains 32 hooks (`useCartLogic.js`, `useCheckoutLogic.js`, `usePullToRefresh.js`, etc.). | Lists non-existent hook files (`useCart`, `useFavorites`, `useProfile`, `useOrders`) and completely omits over 15 active hook files. | Update index to document all 32 active hooks with exact file names, parameters, and dependency graphs. |
| [`button-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/button-module-spec.md) | File is `useInteractionAnimation.js`; folder also includes `CircularActionButton.js`. | Section 6 specifies hook name as `useButtonAnimation.js`. Does not list `CircularActionButton.js` in exports or component model. | Rename hook reference to `useInteractionAnimation.js`. Add `CircularActionButton` to component model and `index.js` export contract. |
| [`media-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/media-module-spec.md) | `src/components/ui/Media/` contains `MediaRenderer.js`, `VideoRenderer.js`, `GifRenderer.js`, `CarouselDots.js`, `MediaStyles.js`. | Spec documents `OptimizedImage.js` and `MediaGallery` (neither file exists). | Rewrite module architecture to document `MediaRenderer`, `VideoRenderer`, `GifRenderer`, and `CarouselDots`. |
| [`icons-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/icons-module-spec.md) | `src/components/Icons/` contains `AppIcons.js`, `AdminIcons.js`, `CategoryIcons.js`, `ControlIcons.js`, `IconsStyles.js`, `useIconTheme.js`. | Spec documents `IconWrapper.js` and an `svg/` directory (neither exists). | Update spec to reflect domain-grouped icon modules (`AdminIcons`, `AppIcons`, etc.) and `useIconTheme`. |
| [`batches-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/batches-module-spec.md) | Indexed under `src/components/ui/Badge/` in `ui/README.md`. | No `Batches` component exists anywhere in `src/components/ui/Badge/` or the codebase. | Mark `Batches` standard as "Proposed Future Component" or move to archive. |
| [`admin-feature-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/features/admin-feature-spec.md) | Implementation has RBAC policy checks (`authPolicy.js`, `adminDomain.js`), reactive state (`adminCatalogState.js`), sticky footers (`AdminSaveFooter.js`), and specialized services. | Spec is a barebones 48-line layout skeleton lacking security layers, state managers, and service contracts. | Expand document to cover RBAC role tiers (superadmin, admin, manager, viewer), permission checks, `adminCatalogState`, and save workflows. |
| [`card-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/card-module-spec.md) | `src/components/ui/Card/` contains `CardGridContainer.js`, `CardShadow.js`, `NavigationCard.js`. | Spec misses `NavigationCard.js`, `CardShadow.js`, and `CardGridContainer.js` in file structure and export contract. | Update file list, export contract, and component models to include `NavigationCard`, `CardShadow`, and `CardGridContainer`. |
| [`feedback-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/feedback-module-spec.md) | `src/components/ui/Feedback/` contains `PullToRefreshIndicator.js` and `ErrorBoundary/` directory. | Spec omits `PullToRefreshIndicator.js` and `ErrorBoundary/` directory from directory layout and component principles. | Add `ErrorBoundary` sub-primitive and `PullToRefreshIndicator` component to layout and principles. |

---

## Incomplete Standards

The following standards exist but require significant expansion to provide thorough guidance:

### 1. `ui/README.md` (UI Layer Standards Index)
- **Missing Information:** Missing `Grid` (`UnifiedCardGrid.js`) and `Layout` (`StorefrontPageContainer.js`) primitives from the visual primitives table. Lacks sections for Haptics, Responsive Layouts, and Scroll Subsystems.
- **Recommended Additions:** Update table to include `Grid` and `Layout`. Add links to newly created UI specifications (`haptic-feedback-spec.md`, `responsive-architecture-spec.md`, `scroll-subsystem-spec.md`, `theme-and-tokens-spec.md`).

### 2. `services/README.md` (Service Layer Standards Index)
- **Missing Information:** Currently contains only 1 entry pointing to `_reference-service-spec.md`. Contains no individual service specifications for Catalog, Auth/RBAC, Storage, Haptics, Bootstrap, Checkout, or User services.
- **Recommended Additions:** Create dedicated service specification files in `.docs/architecture-standards/services/` for:
  - `auth-and-rbac-service-spec.md` (`authService.js`, `authPolicy.js`, `adminDomain.js`)
  - `catalog-services-spec.md` (`catalogPageService.js`, `catalogViewModel.js`, DTOs)
  - `storage-service-spec.md` (`storageService.js`, `storage/`)
  - `bootstrap-service-spec.md` (`visitorBootstrap.js`)
  - `checkout-service-spec.md` (`checkoutService.js`)

### 3. Feature Layer Specifications (`features/*`)
- **Missing Information:** Specifications like `catalog-feature-spec.md`, `orders-feature-spec.md`, `product-feature-spec.md`, and `cart-feature-spec.md` are minimal structural skeletons (30-50 lines). They lack details on hook bindings, DTO transformations, routing contracts, and state integration.
- **Recommended Additions:** Expand each feature spec to detail context dependencies, custom hooks composed, services invoked, and public API contracts.

### 4. `motion-module-spec.md`
- **Missing Information:** Barebones 30-line specification. Omits gesture animation hooks (`useInteractionAnimation`, `useDropdownAnimation`, `useSlideAnimation`), transition containers (`ScrollFadeUp`, `PageTransition`), and motion token contracts (`motion.press`).
- **Recommended Additions:** Expand to define spring physics standards, gesture hook usage rules, and page transition patterns.

---

## Conflicting Standards

| Conflict Area | Documentation Source | Implementation Source | Conflict Details | Authoritative Source |
| :--- | :--- | :--- | :--- | :--- |
| **Reference Spec Link** | [`card-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/card-module-spec.md) Line 4 links to `architecture-standards/01-reference-ui-module.md`. | Target file is [`ui/_reference-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/_reference-module-spec.md). | Link points to a non-existent filepath (`01-reference-ui-module.md`). | `ui/_reference-module-spec.md` |
| **Button Animation Hook Name** | [`button-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/button-module-spec.md) Section 6 specifies `useButtonAnimation.js`. | Code file is [`src/components/ui/Button/useInteractionAnimation.js`](file:///d:/Magazine/_PigmentShop/src/components/ui/Button/useInteractionAnimation.js). | Document specifies wrong hook file name. | Implementation (`useInteractionAnimation.js`) |
| **Media Module Structure** | [`media-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/media-module-spec.md) lists `OptimizedImage.js`. | Code has `MediaRenderer.js`, `VideoRenderer.js`, `GifRenderer.js`, `CarouselDots.js`. | Document describes non-existent component. | Implementation (`MediaRenderer.js`, etc.) |
| **Icons Module Structure** | [`icons-module-spec.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/icons-module-spec.md) lists `IconWrapper.js` & `svg/`. | Code has domain-grouped icon files (`AppIcons.js`, `AdminIcons.js`, etc.). | Document describes obsolete single wrapper model. | Implementation (`AppIcons.js`, etc.) |
| **Cart Hook Name** | [`src/hooks/README.md`](file:///d:/Magazine/_PigmentShop/src/hooks/README.md) lists `useCart`. | Code file is [`src/hooks/useCartLogic.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useCartLogic.js). | Document specifies wrong hook file name. | Implementation (`useCartLogic.js`) |
| **Knowledge Base vs Standards** | Architectural knowledge in `.docs/project-knowledge/` (`browser-automation.md`, `bootstrap-system.md`, `observability.md`, `storage-subsystem.md`). | Code implementation matches `.docs/project-knowledge/`. | Information exists in project knowledge but is omitted from Architecture Standards. | Architecture Standards should incorporate and formally adopt project knowledge docs. |

---

## Newly Established Architectural Patterns

The following implementation patterns have become de facto project standards and should be formally documented in Architecture Standards:

1. **Decomposed Hook Theme Mappers (`use[Primitive]Theme`)**
   - Every UI primitive extracts theme resolution and dark mode Context evaluation into a dedicated `use[Primitive]Theme.js` hook, returning container and text style objects.
2. **Dynamic Style Map Factories (`[Primitive]Styles.js`)**
   - Style creation is strictly encapsulated in `[Primitive]Styles.js` factories using `StyleSheet.create` and consuming design tokens (`tokens.js`) and theme parameters.
3. **Hook-Driven Gestures & Motion (`useInteractionAnimation`, `useBadgeAnimation`, etc.)**
   - Animation drivers manage `Animated.Value` spring sequences and timing feedback using centralized motion tokens (`motion.press`).
4. **Sub-Manager Reactive State Architecture (`adminCatalogState.js`)**
   - Domain state requiring fast reactive updates without full React Context re-render overhead is managed via lightweight reactive state objects synced to custom hooks.
5. **Multi-Format Media Pipeline (`MediaRenderer`)**
   - Polymorphic media container dynamically switching between image rendering, HTML5 video (`VideoRenderer`), animated GIF handling (`GifRenderer`), and carousel indicators (`CarouselDots`).
6. **Domain-Grouped Icon Modules**
   - Grouping vector icons into semantic domain modules (`AdminIcons`, `AppIcons`, `CategoryIcons`, `ControlIcons`) with icon theme binding (`useIconTheme`).
7. **Sticky Dirty-State Action Footers (`AdminSaveFooter`)**
   - Admin form interfaces employ a sticky bottom bar tracking unsaved dirty state and offering bulk apply/cancel actions.
8. **Cross-Platform Storage Strategy (`storageService` & `useSessionState`)**
   - Multi-tier storage resolution managing Web (`sessionStorage`/`localStorage`) and Native storage targets with automatic JSON fallback, versioning, and migration hooks.

---

## Recommended New Architecture Documents

To achieve 100% architectural documentation coverage, the following new documents should be created in `.docs/architecture-standards/`:

| Proposed Filename | Target Location | Purpose | Scope |
| :--- | :--- | :--- | :--- |
| `theme-and-tokens-spec.md` | `.docs/architecture-standards/ui/` | Design token system, color semantic map, typography scale, shadows, dynamic style factories, token replacement script. | Central theme system, `src/theme/`, `replace_tokens.js`. |
| `haptic-feedback-spec.md` | `.docs/architecture-standards/ui/` | Haptic feedback triggers, platform bridges (Web/Native), feedback intensity tiers, UI component integration rules. | `src/theme/haptics.js`, `useHaptics`, `hapticsService`. |
| `responsive-architecture-spec.md` | `.docs/architecture-standards/ui/` | Responsive breakpoints, visual viewport measurement, dynamic grid calculation, mobile/tablet/desktop layout rules. | `useVisualViewportDimensions`, `useCardDimensions`, `layout.js`. |
| `scroll-subsystem-spec.md` | `.docs/architecture-standards/ui/` | Scroll direction detection, auto-hiding header/tabbar mechanics, pull-to-refresh physics, indicator components. | `useHomeScrollHide`, `usePullToRefresh`, `PullToRefreshIndicator`. |
| `grid-module-spec.md` | `.docs/architecture-standards/ui/` | Specification for `UnifiedCardGrid` presentational primitive. | `src/components/ui/Grid/`. |
| `layout-module-spec.md` | `.docs/architecture-standards/ui/` | Specification for `StorefrontPageContainer` presentational primitive. | `src/components/ui/Layout/`. |
| `state-management-spec.md` | `.docs/architecture-standards/` | React Context boundaries, custom hook composition rules, reactive sub-managers (`adminCatalogState`), local state rules. | `src/context/`, custom hooks, reactive state. |
| `auth-and-rbac-spec.md` | `.docs/architecture-standards/services/` | RBAC role matrix (superadmin, admin, manager, viewer), permission checks (`authPolicy`), auth service contracts. | `authPolicy.js`, `adminDomain.js`, `authService.js`. |
| `catalog-services-spec.md` | `.docs/architecture-standards/services/` | Catalog pagination service, view model transformations, DTO contracts (`catalogEntityContract.ts`), database regenerator. | `catalogPageService`, `catalogViewModel`, DTOs. |
| `storage-subsystem-spec.md` | `.docs/architecture-standards/services/` | Cross-platform persistent storage architecture, versioning, migrations, web/native fallbacks. | `storageService.js`, `storage/`, `useSessionState`. |
| `bootstrap-and-session-spec.md` | `.docs/architecture-standards/services/` | App initialization lifecycle, anonymous visitor seed data, context hydration order. | `visitorBootstrap.js`, `src/bootstrap/`. |
| `automation-and-testing-spec.md` | `.docs/architecture-standards/` | End-to-end browser automation, Playwright scripts, visual regression, hygiene auditors. | `.tools/automation/`, `.tools/auditors/`. |
| `observability-and-error-handling-spec.md` | `.docs/architecture-standards/` | Centralized error handling (`useErrorHandler`), ErrorBoundary hierarchy, toast alerts, log verification. | `useErrorHandler`, `ToastContext`, `ErrorBoundary`. |

---

## Recommended Reorganization

To ensure clean navigation and maintainability across Architecture Standards:

1. **Update Architecture Navigation Map ([`.docs/architecture-standards/README.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/README.md))**:
   - Add new main sections for **State & Data Standards**, **System Subsystems** (Haptics, Storage, Bootstrap), **Automation & Quality Standards**, and **Observability & Security Standards**.
2. **Expand UI Layer Standards Index ([`.docs/architecture-standards/ui/README.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/ui/README.md))**:
   - Add `Grid` and `Layout` to presentational visual primitives table.
   - Add a dedicated subsection for **UI Subsystems** (`Haptic Feedback`, `Responsive Architecture`, `Scroll Subsystem`, `Theme & Tokens`).
   - Remove or re-classify `Batches` as a proposed future module.
3. **Expand Service Layer Index ([`.docs/architecture-standards/services/README.md`](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/services/README.md))**:
   - Transform index from a single generic spec link into a full table indexing specific service specifications (Auth/RBAC, Catalog, Storage, Bootstrap, Haptics, Checkout).
4. **Clean Up Broken Relative Links**:
   - Audit and fix relative file paths across all `.docs/architecture-standards/*.md` files.

---

## Priority Matrix

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CRITICAL                                   │
│  • Overhaul src/hooks/README.md (32 hooks accurately documented).       │
│  • Fix broken reference links & incorrect file names in UI specs.      │
│  • Align Button, Media, Icons, Card, and Feedback specs with code.     │
│  • Create haptic-feedback-spec.md based on audit findings.              │
├─────────────────────────────────────────────────────────────────────────┤
│                                HIGH                                     │
│  • Create theme-and-tokens-spec.md & responsive-architecture-spec.md.  │
│  • Expand admin-feature-spec.md with RBAC and adminCatalogState.        │
│  • Create Service Specs (Auth/RBAC, Catalog, Storage, Bootstrap).      │
│  • Create grid-module-spec.md & layout-module-spec.md.                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                MEDIUM                                   │
│  • Create scroll-subsystem-spec.md & state-management-spec.md.          │
│  • Create observability-and-error-handling-spec.md.                     │
│  • Create automation-and-testing-spec.md.                               │
│  • Expand motion-module-spec.md with gesture hooks & physics.           │
├─────────────────────────────────────────────────────────────────────────┤
│                                 LOW                                     │
│  • Reorganize navigation maps in root README.md files.                  │
│  • Document helper developer scripts in .tools/.                        │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Final Recommendations & Action Plan

To systematically update the Architecture Standards with minimal friction and maximum accuracy, execute the updates in the following order:

### Phase 1: Critical Corrections & Link Repairs
- [x] **Fix Broken Links:** Repair broken relative links in `card-module-spec.md` and related files.
   - `◐ FM — 1d 1f +2r — Phase 1.1 [Parallel with Phase 1.3]`
- [x] **Synchronize Existing UI Specs:** Update `button-module-spec.md`, `media-module-spec.md`, `icons-module-spec.md`, `card-module-spec.md`, and `feedback-module-spec.md` to reflect actual implemented file structures.
   - `◕ FH — 2d 5f +8r — Phase 1.2 [Parallel with Phase 1.3]`
- [x] **Overhaul Hooks Documentation:** Rewrite `src/hooks/README.md` to accurately index all 32 current hooks with proper dependency maps.
   - `★ PH — 3d 1f +32r — Phase 1.3 [Parallel with Phase 1.1, Phase 1.2]`

### Phase 2: Missing UI Subsystems & Core Standards Creation
- [x] **Create Core UI Specs:** Author `haptic-feedback-spec.md`, `theme-and-tokens-spec.md`, `responsive-architecture-spec.md`, `grid-module-spec.md`, and `layout-module-spec.md`.
   - `◕ FH — 2d 5f +10r — Phase 2.1 [Parallel with Phase 2.2]`
- [x] **Create Scroll Spec:** Author `scroll-subsystem-spec.md`.
   - `◐ FM — 1d 1f +4r — Phase 2.2 [Parallel with Phase 2.1]`

### Phase 3: Service Layer & Security Expansion
- [x] **Expand Feature Specs:** Update `admin-feature-spec.md` with RBAC role matrix and `adminCatalogState`.
   - `◐ FM — 1d 1f +5r — Phase 3.1 [Parallel with Phase 3.2]`
- [x] **Author Service Specs:** Create `auth-and-rbac-spec.md`, `catalog-services-spec.md`, `storage-subsystem-spec.md`, and `bootstrap-and-session-spec.md`.
   - `◕ FH — 2d 4f +12r — Phase 3.2 [Parallel with Phase 3.1]`

### Phase 4: System Architecture, Testing & Reorganization
- [x] **Author Cross-Cutting Specs:** Create `state-management-spec.md`, `observability-and-error-handling-spec.md`, and `automation-and-testing-spec.md`.
   - `◕ FH — 2d 3f +9r — Phase 4.1 [Parallel with Phase 4.2]`
- [x] **Reorganize Navigation Indices:** Update `.docs/architecture-standards/README.md`, `.docs/architecture-standards/ui/README.md`, and `.docs/architecture-standards/services/README.md` with complete, clickable navigation links.
   - `◕ FH — 2d 3f +6r — Phase 4.2 [Parallel with Phase 4.1]`
