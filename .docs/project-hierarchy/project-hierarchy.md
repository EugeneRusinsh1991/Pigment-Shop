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
- [app/(store)/](file:///d:/Magazine/_PigmentShop/app/\(store\)/): Storefront routes (Catalog, Cart, Product Details, Checkout).
- [app/admin/](file:///d:/Magazine/_PigmentShop/app/admin/): Administrative dashboard & management interfaces.

### 2. UI Components & Visual Primitives (`src/components/`)
- [src/components/Text/](file:///d:/Magazine/_PigmentShop/src/components/Text/): Unified typography primitives (`Text`, `Heading`).
- [src/components/Feedback/](file:///d:/Magazine/_PigmentShop/src/components/Feedback/): Toast, Skeleton, EmptyState, InlineError.
- [src/components/Navigation/](file:///d:/Magazine/_PigmentShop/src/components/Navigation/): Breadcrumbs, Pagination.
- [src/components/Motion/](file:///d:/Magazine/_PigmentShop/src/components/Motion/): Page transition & animation wrappers (`ScrollFadeUp`, `PageTransition`).
- [src/components/Card/](file:///d:/Magazine/_PigmentShop/src/components/Card/): Card container primitives.
- [src/components/Button/](file:///d:/Magazine/_PigmentShop/src/components/Button/): Button & IconButton primitives.
- [src/components/Badge/](file:///d:/Magazine/_PigmentShop/src/components/Badge/): Badge status primitives.
- [src/components/Admin/](file:///d:/Magazine/_PigmentShop/src/components/Admin/): Admin management presentation components.

### 3. Business Domains & Data Layer (`src/`)
- [src/context/](file:///d:/Magazine/_PigmentShop/src/context/): Global providers (Theme, Cart, Auth, Language, Toast).
- [src/domain/](file:///d:/Magazine/_PigmentShop/src/domain/): Core domain logic & business rules.
- [src/features/](file:///d:/Magazine/_PigmentShop/src/features/): Feature modules (auth, cart, catalog, contact, favorites, home, orders, product, profile, shell).
- [src/services/](file:///d:/Magazine/_PigmentShop/src/services/): API, Storage, and external integrations.
- [src/hooks/](file:///d:/Magazine/_PigmentShop/src/hooks/): React custom hooks.
- [src/theme/](file:///d:/Magazine/_PigmentShop/src/theme/): Tokenized color palettes, typography, and styling helpers.

---

## 🛠️ Debug & Automation Tools

- **Browser Automation Specs**: `.docs/browser-automation-data-editing/`
- **Automation Logs**: `.docs/automation-browser-log/` and `.docs/manual-browser-log/`
- **Utility Scripts**: `scripts/` (media manifests, database regeneration, crawlers, Playwright debug helpers)
- **Auditing Framework**: `.docs/ai-audit-framework/`

