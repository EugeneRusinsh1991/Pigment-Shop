# Project Hierarchy Map

## 🏗️ System Architecture & Stack
- **Framework**: Expo / React Native Web (Expo Router)
- **State Management**: React Context (`src/context/`)
- **Theme & Design System**: Tokenized design system (`src/theme/tokens.js`, `AppStyles.js`)
- **Routing Shell**: Expo Router (`app/` directory)

---

## 📂 Primary Physical Navigation

### 1. Application Shell & Routing (`app/`)
- [app/_layout.js](file:///d:/Magazine/_PigmentShop/app/_layout.js): Root layout & provider wrapper.
- [app/(store)/](file:///d:/Magazine/_PigmentShop/app/\(store\)/): Storefront routes (Catalog, Cart, Product Details, Favorites, Orders, Profile, Login, Order Confirmation).
- [app/admin/](file:///d:/Magazine/_PigmentShop/app/admin/): Administrative dashboard & management interfaces.

### 2. UI Components & Visual Primitives (`src/components/`)
- [src/components/Text/](file:///d:/Magazine/_PigmentShop/src/components/Text/): Unified typography primitives (`Text`, `Heading`).
- [src/components/Feedback/](file:///d:/Magazine/_PigmentShop/src/components/Feedback/): Toast, Skeleton, EmptyState, InlineError.
- [src/components/Media/](file:///d:/Magazine/_PigmentShop/src/components/Media/): Image, Video, Media galleries.
- [src/components/Navigation/](file:///d:/Magazine/_PigmentShop/src/components/Navigation/): Breadcrumbs, Pagination.
- [src/components/Motion/](file:///d:/Magazine/_PigmentShop/src/components/Motion/): Page transition & animation wrappers (`ScrollFadeUp`, `PageTransition`).
- [src/components/Card/](file:///d:/Magazine/_PigmentShop/src/components/Card/): Card container primitives.
- [src/components/Button/](file:///d:/Magazine/_PigmentShop/src/components/Button/): Button & IconButton primitives.
- [src/components/Badge/](file:///d:/Magazine/_PigmentShop/src/components/Badge/): Badge status primitives.
- [src/components/Admin/](file:///d:/Magazine/_PigmentShop/src/components/Admin/): Admin management presentation components.
- [src/components/DataTable/](file:///d:/Magazine/_PigmentShop/src/components/DataTable/): Data tables.
- [src/components/Drawer/](file:///d:/Magazine/_PigmentShop/src/components/Drawer/): Side drawers and modals.
- [src/components/TextField/](file:///d:/Magazine/_PigmentShop/src/components/TextField/), [Toggle/](file:///d:/Magazine/_PigmentShop/src/components/Toggle/), [Search/](file:///d:/Magazine/_PigmentShop/src/components/Search/): Form and input primitives.
- [src/components/Flag/](file:///d:/Magazine/_PigmentShop/src/components/Flag/), [Modal/](file:///d:/Magazine/_PigmentShop/src/components/Modal/): Other primitives.

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

