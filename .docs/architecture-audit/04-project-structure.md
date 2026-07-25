# Project Structure Audit & Organization Proposal

> [!NOTE]
> This report evaluates the physical organization of PigmentShop and proposes a clean, intuitive structure optimized for both human engineers and AI agents.

---

## 1. Current Structural Bottlenecks & Ambiguities

1. **Underdeveloped Domain Layer (`src/domain/`)**:
   - *Current State*: `src/domain/` contains only 1 file (`catalogEntityContract.ts`), while domain entity logic and transformations are stored in `src/services/`.
   - *Issue*: Blurs the line between data fetching/IO services and business models.

2. **Incomplete Feature Encapsulation (`src/features/`)**:
   - *Current State*: `src/features/` contains sub-folders like `auth`, `orders`, and `profile`. However, many screen components remain in `src/components/` (e.g. `CartView.js`, `CatalogPage.js`, `ProductPage.js`).
   - *Issue*: Forces developers to look in both `src/components/` and `src/features/` to understand feature UI.

3. **Multi-Component Files (`src/components/Button.js`)**:
   - *Current State*: [Button.js](file:///d:/Magazine/_PigmentShop/src/components/Button.js) exports `Button`, `AnimatedButton`, `ChipButton`, and `IconButton`.
   - *Issue*: High cyclomatic complexity and harder symbol resolution for navigation tools.

4. **Root-Level Utility Script Clutter (`scripts/`)**:
   - *Current State*: The root `scripts/` directory contains 19 scripts mixing Playwright debug helpers, database generators, crawlers, and server runners.

---

## 2. Proposed Target Structure

```
src/
├── bootstrap/            # Application startup contracts & gatekeepers
├── components/           # Pure atomic UI primitives (Button, Modal, Card, Text)
│   ├── Button/           # Modularized button primitives
│   │   ├── Button.js
│   │   ├── ChipButton.js
│   │   └── IconButton.js
│   └── Layout/           # Generic layout wrappers (Breadcrumb, Header, Footer)
├── context/              # Global React Context providers (AppProviders composition)
├── domain/               # Pure business domain entities & validation models
│   ├── catalog/          # Catalog models & transforms
│   └── user/             # User & session domain rules
├── features/             # Feature-based domain UI modules
│   ├── admin/            # Admin feature widgets & management tables
│   ├── cart/             # Cart views & checkout logic
│   ├── catalog/          # Catalog views & search toolbars
│   ├── favorites/        # Favorites management
│   └── orders/           # Order tracking & management
├── hooks/                # Reusable UI & animation custom hooks
├── services/             # Pure I/O, API clients, Firebase & Storage access
└── theme/                # Design tokens & color palettes
```

---

## 3. Benefits of Proposed Structure

1. **Feature Cohesion**: Moving `CartView.js`, `CatalogPage.js`, and `ProductPage.js` into `src/features/` co-locates feature components with their data hooks.
2. **Clear I/O vs Business Split**: Restricting `src/services/` strictly to network/IO operations and `src/domain/` to transformations/entities eliminates cross-layer leakage.
3. **Enhanced AI Agent & IDE Navigation**: Smaller single-responsibility files (e.g., splitting `Button.js`) simplify code symbol index lookups and cut down on prompt token consumption.
