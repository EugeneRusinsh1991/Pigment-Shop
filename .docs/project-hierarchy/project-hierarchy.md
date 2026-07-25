# Project Hierarchy Map

## 🏗️ System Architecture & Stack
- **Framework**: Expo / React Native Web (Expo Router)
- **State Management**: React Context (`src/context/`)
- **Theme & Design System**: Tokenized system (`src/theme/tokens.js`, `AppStyles.js`)
- **Routing Shell**: Expo Router (`app/` directory)

---

## 📂 Primary Physical Navigation

### 1. Application Shell & Routing (`app/`)
- `app/_layout.js`: Global root layout & provider wrappers.
- `app/(store)/`: Storefront customer pages (Catalog, Cart, ProductDetails, Checkout).
- `app/admin/`: Administrative dashboard & management interfaces.

### 2. UI Components & Visual Primitives (`src/components/`)
- `src/components/`: Core UI components (Buttons, Inputs, Modals, Cards).
- `src/components/Admin/`: Admin-specific presentation components.

### 3. Business Domains & Data Layer (`src/`)
- `src/context/`: Global providers (Theme, Cart, Auth, Language).
- `src/domain/`: Domain logic and models.
- `src/services/`: API, Firebase, and Storage integrations.
- `src/hooks/`: Custom React hooks.
- `src/theme/`: Design tokens, colors, radii, and typography.
