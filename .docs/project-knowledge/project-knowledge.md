# Project Knowledge Base

## 💡 System Architecture Overview
The application is a multi-platform e-commerce shop built on **Expo / React Native Web** using Expo Router. 

### Key Architectural Systems & Subsystem Knowledge

1. **Routing Shell (`app/`)**:
   - `app/_layout.js` acts as the root component wrapping global Context providers.
   - Storefront routes live under `app/(store)/`.
   - Administrative management routes live under `app/admin/`.

2. **Design System & Theme Tokens (`src/theme/`)**:
   - Tokenized theme system controlling colors, layout grids, radii, and typography.
   - Theme consumed via `ThemeContext` (`src/context/ThemeContext.js`).
   - Detailed in [ui-design-system.md](file:///d:/Magazine/_PigmentShop/.docs/project-knowledge/ui-design-system.md).

3. **Global Context Layer (`src/context/`)**:
   - Manages state across Theme, Cart, User Auth, and Localization.

4. **UI Primitive Hierarchy (`src/components/`)**:
   - Centralized components for buttons, inputs, modals, and product cards.
   - Detailed in [ui-design-system.md](file:///d:/Magazine/_PigmentShop/.docs/project-knowledge/ui-design-system.md).

5. **Bootstrap System (`src/bootstrap/`)**:
   - Application lifecycle management and startup orchestration.
   - Detailed in [bootstrap-system.md](file:///d:/Magazine/_PigmentShop/.docs/project-knowledge/bootstrap-system.md).

6. **Browser Automation Subsystem**:
   - Detailed in [browser-automation.md](file:///d:/Magazine/_PigmentShop/.docs/project-knowledge/browser-automation.md).

6. **Decision & Navigation Engine**:
   - Detailed in [decision-engine.md](file:///d:/Magazine/_PigmentShop/.docs/project-knowledge/decision-engine.md).

7. **Observability Subsystem**:
   - Detailed in [observability.md](file:///d:/Magazine/_PigmentShop/.docs/project-knowledge/observability.md).

8. **State Machine Architecture**:
   - Detailed in [state-machine.md](file:///d:/Magazine/_PigmentShop/.docs/project-knowledge/state-machine.md).

9. **Image Storage Subsystem**:
   - Detailed in [storage-subsystem.md](file:///d:/Magazine/_PigmentShop/.docs/project-knowledge/storage-subsystem.md) and [src/services/storage/README.md](file:///d:/Magazine/_PigmentShop/src/services/storage/README.md).

