# Stage 3 — Global Inventory

## Project-Wide Architectural Overview

### 1. Application Shell and Routing
- app/_layout.js
- app/(store)/
- app/admin/
- src/context/AppProviders.js
- src/bootstrap/BootstrapGate.js
- src/bootstrap/appBootstrap.js

### 2. Shared UI and Primitive Layer
- src/components/Button/
- src/components/Text/
- src/components/Feedback/
- src/components/Modal/
- src/components/Drawer/
- src/components/Search/
- src/components/TextField/
- src/components/Toggle/
- src/components/Card/
- src/components/DataTable/
- src/components/Motion/
- src/components/Navigation/
- src/theme/

### 3. State and Context Layer
- src/context/AuthContext.js
- src/context/LanguageContext.js
- src/context/ThemeContext.js
- src/context/ToastContext.js
- src/features/cart/CartContext.js
- src/features/catalog/CatalogContext.js
- src/features/favorites/FavoritesContext.js

### 4. Feature Modules
- src/features/auth/
- src/features/cart/
- src/features/catalog/
- src/features/contact/
- src/features/favorites/
- src/features/home/
- src/features/orders/
- src/features/product/
- src/features/profile/
- src/features/shell/
- src/features/admin/

### 5. Bootstrap and Lifecycle Layer
- src/bootstrap/startupContract.js
- src/bootstrap/bootstrapOrchestrator.js
- src/bootstrap/authBootstrapCoordinator.js
- src/bootstrap/useBootstrapStatus.js
- src/bootstrap/BootstrapGate.js

### 6. Domain and Business Logic Layer
- src/domain/
- src/services/authPolicy.js
- src/services/checkoutService.js
- src/services/catalogViewModel.js
- src/services/catalogPageService.js
- src/services/adminDomain.js

### 7. Data and Persistence Layer
- src/data/catalogState.js
- src/data/catalogSync.js
- src/data/catalogSyncHelpers.js
- src/services/repositories/authRepository.js
- src/services/repositories/catalogRepository.js
- src/services/repositories/favoritesRepository.js
- src/services/repositories/ordersRepository.js
- src/services/repositories/usersRepository.js
- src/services/firebase/index.js

### 8. Cross-Cutting Infrastructure
- src/hooks/useSessionState.js
- src/utils/crossPlatformStorage.js
- src/services/serviceContract.js
- src/services/collections.js

## Global Architectural Observations
- The project is organized around a clear app-shell, feature-module, and data-service separation.
- Shared UI primitives are centralized in src/components/ and themed through src/theme/.
- Feature state is mostly local, while shared app-level state is provided through context wrappers.
- Startup lifecycle and catalog syncing are separated from UI concerns and use explicit orchestration modules.
- The main coupling pressure points are at the boundaries between feature hooks and repositories, and between the shared provider shell and feature-specific providers.
