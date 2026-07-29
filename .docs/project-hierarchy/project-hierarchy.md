# Project Hierarchy Map

## 🏗️ System Architecture & Stack
- **Framework**: Expo / React Native Web (Expo Router)
- **State Management**: React Context (`src/context/`)
- **Theme & Design System**: Tokenized design system (`src/theme/tokens.js`, `AppStyles.js`)
- **Routing Shell**: Expo Router (`app/` directory)

## 🗺️ Multi-Dimensional Navigation Maps
- **Route-Based Map**: [route-hierarchy.md](file:///d:/Magazine/_PigmentShop/.docs/project-hierarchy/route-hierarchy.md) — Screen routes mapped to components, hooks & services.
- **Flow-Based Map**: [flow-hierarchy.md](file:///d:/Magazine/_PigmentShop/.docs/project-hierarchy/flow-hierarchy.md) — End-to-end data pipelines (UI -> Hook -> Service -> DB).

---

## 📂 Primary Physical Navigation

### 1. Application Shell & Routing (`app/`)
- [app/_layout.js](file:///d:/Magazine/_PigmentShop/app/_layout.js): Root layout & provider wrapper.
- [app/(store)/](file:///d:/Magazine/_PigmentShop/app/\(store\)/): Storefront routes (Catalog, Cart, Product Details, Favorites, Orders, Profile, Login, Order Confirmation).
- [app/admin/](file:///d:/Magazine/_PigmentShop/app/admin/): Administrative dashboard & management interfaces.

### 2. UI Components & Visual Primitives (`src/components/`)
- **UI Primitives (`src/components/ui/`)**:
  - [Badge/](file:///d:/Magazine/_PigmentShop/src/components/ui/Badge/): Status indicators & pills.
  - [Button/](file:///d:/Magazine/_PigmentShop/src/components/ui/Button/): Button & IconButton primitives.
  - [Card/](file:///d:/Magazine/_PigmentShop/src/components/ui/Card/): Card container primitives.
  - [Drawer/](file:///d:/Magazine/_PigmentShop/src/components/ui/Drawer/): Side sliding overlay drawers.
  - [Feedback/](file:///d:/Magazine/_PigmentShop/src/components/ui/Feedback/): Toast, Skeleton, EmptyState, InlineError.
  - [Media/](file:///d:/Magazine/_PigmentShop/src/components/ui/Media/): Image, Video, Media galleries.
  - [Modal/](file:///d:/Magazine/_PigmentShop/src/components/ui/Modal/): Dialog overlay modals.
  - [Motion/](file:///d:/Magazine/_PigmentShop/src/components/ui/Motion/): Page transition & animation wrappers (`ScrollFadeUp`, `PageTransition`).
  - [Text/](file:///d:/Magazine/_PigmentShop/src/components/ui/Text/): Unified typography primitives (`Text`, `Heading`).
  - [TextField/](file:///d:/Magazine/_PigmentShop/src/components/ui/TextField/): Input & textarea fields.
  - [Toggle/](file:///d:/Magazine/_PigmentShop/src/components/ui/Toggle/): Multi-option selection toggles.
- **Domain Components (`src/components/domain/`)**:
  - [DataTable/](file:///d:/Magazine/_PigmentShop/src/components/domain/DataTable/): Data grid tables.
  - [Flag/](file:///d:/Magazine/_PigmentShop/src/components/domain/Flag/): Feature & boolean flags.
  - [Navigation/](file:///d:/Magazine/_PigmentShop/src/components/domain/Navigation/): Breadcrumbs & Pagination.
  - [Search/](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/): Instant search inputs & filters.
- **Icons (`src/components/Icons/`)**:
  - [Icons/](file:///d:/Magazine/_PigmentShop/src/components/Icons/): Vector SVG icon wrappers.

### 3. State Management (`src/context/`)
- [src/context/](file:///d:/Magazine/_PigmentShop/src/context/): Global providers (Theme, Cart, Auth, Language, Toast).

### 4. Domain Logic (`src/domain/`)
- [src/domain/](file:///d:/Magazine/_PigmentShop/src/domain/): Core domain logic & business rules (catalog entity contracts).

### 5. Feature Modules (`src/features/`)
- [src/features/](file:///d:/Magazine/_PigmentShop/src/features/): Feature modules (admin, auth, cart, catalog, contact, favorites, home, orders, product, profile, shell).

### 6. Services & Data Layer (`src/services/`, `src/data/`)
- [src/services/](file:///d:/Magazine/_PigmentShop/src/services/): API, Storage, and external integrations (admin services, catalog services, auth, checkout, firebase repositories).
- [src/data/](file:///d:/Magazine/_PigmentShop/src/data/): Data layer and repositories.

### 7. Shared Utilities (`src/hooks/`, `src/utils/`, `src/types/`, `src/theme/`)
- [src/hooks/](file:///d:/Magazine/_PigmentShop/src/hooks/): React custom hooks.
- [src/utils/](file:///d:/Magazine/_PigmentShop/src/utils/): Utility functions and helpers.
- [src/types/](file:///d:/Magazine/_PigmentShop/src/types/): TypeScript type definitions.
- [src/theme/](file:///d:/Magazine/_PigmentShop/src/theme/): Tokenized color palettes, typography, and styling helpers.

### 8. Application Bootstrap (`src/bootstrap/`)
- [src/bootstrap/](file:///d:/Magazine/_PigmentShop/src/bootstrap/): Application bootstrap coordination (auth, app bootstrap).

- [.docs/architecture-standards/](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/): Canonical architecture specifications (UI, Services, Domain standards).

---

## 🛠️ Debug & Automation Tools

- **Browser Automation**: `.tools/browser-automation/` (Playwright-based dynamic audit framework)
- **Auditor**: `.tools/auditor/` (Static analysis and code audit tools)
- **Manual Browser Inspector**: `.tools/manual-browser-inspector/`
- **Utility Tools**: `.tools/.backuper/`, `.tools/.cleaner/`, `.tools/.health/`, `.tools/.packer/`
- **Utility Scripts**: `scripts/` (media manifests, database regeneration, crawlers, Playwright debug helpers)
- **Automation Logs**: `.docs/automation-browser-log/` and `.docs/manual-browser-log/`
- **Audit Framework**: `.docs/ai-audit-framework/`

