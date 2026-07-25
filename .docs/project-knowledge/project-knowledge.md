# Project Knowledge Base

## 💡 System Architecture Overview
The application is a multi-platform e-commerce shop built on **Expo / React Native Web** using Expo Router. 

### Key Architectural Systems

1. **Routing Shell (`app/`)**:
   - `app/_layout.js` acts as the root component wrapping global Context providers.
   - Storefront routes live under `app/(store)/`.
   - Administrative management routes live under `app/admin/`.

2. **Design System & Theme Tokens (`src/theme/`)**:
   - Tokenized theme system controlling colors, layout grids, radii, and typography.
   - Theme consumed via `ThemeContext` (`src/context/ThemeContext.js`).

3. **Global Context Layer (`src/context/`)**:
   - Manages state across Theme, Cart, User Auth, and Localization.

4. **UI Primitive Hierarchy (`src/components/`)**:
   - Centralized components for buttons, inputs, modals, and product cards.
