# Engineering Standard: Service Layer & Data Access Architecture

> [!NOTE]
> Defines the architectural specification, directory layout, repository contracts, DTO transformation rules, and error handling standard across `src/services/`.

---

## 1. Core Engineering Principles

### 1.1 Layered Architecture & Separation of Concerns
The Data Access Layer is strictly partitioned into three layers:
1. **Repository Layer (`src/services/repositories/`)**:
   - Handles low-level Firestore / Firebase SDK queries (`getDoc`, `getDocs`, `setDoc`, `writeBatch`).
   - Responsible for raw queries, constraints, and index exception handling.
   - **Error Handling**: Throws native or domain-specific exceptions (e.g., `MissingIndexError`). Does NOT wrap responses in `{ success, data }`.
2. **Transform / DTO Layer (`src/services/*Transforms.js`)**:
   - Pure functions converting Firestore raw documents to clean Domain/UI DTOs and vice versa.
   - Sanitizes payloads prior to database persistence (stripping UI state like selected flags, temporary file blobs, computed metadata).
3. **Service Layer (`src/services/*.js`)**:
   - Orchestrates repository calls, business logic rules, data validation, and domain transformations.
   - **Error Handling**: MUST wrap all public functions with `withServiceContract` to guarantee a unified result payload.

---

## 2. Directory Layout & Module Structure

```
src/services/
├── collections.js                  # Centralized collection name constants
├── serviceContract.js               # Service wrapper HOF & standard payload definition
├── firebase/                        # Centralized Firebase SDK initialization
│   └── index.js
├── repositories/                    # Database repositories (Throwing layer)
│   ├── authRepository.js
│   ├── catalogRepository.js
│   ├── catalogQueryBuilder.js
│   ├── favoritesRepository.js
│   ├── ordersRepository.js
│   └── usersRepository.js
├── adminCatalogService.js           # Domain services (Contract-wrapped layer)
├── adminOrdersService.js
├── adminUsersService.js
├── authService.js
├── checkoutService.js
├── catalogPageService.js
├── adminCategoriesTransforms.js    # Data mapping & DTO transformations
└── adminProductsTransforms.js
```

---

## 3. Data Transfer Objects (DTO) & Transformation Conventions

### 3.1 Strict Separation of DB vs DTO Schema
- Database entities MUST contain only persistent fields.
- Non-persisted computed fields (e.g., category trees, calculated review averages, UI flags) must be constructed during DTO transformation and not stored as redundant data unless explicitly indexed.

### 3.2 Pure Transformer Functions
All data transformations must be isolated in dedicated `*Transforms.js` or helper files:
- `toDTO(docSnap)`: Maps Firestore document snapshot to clean application JS object with stringified IDs and parsed date fields.
- `toEntity(dto)`: Strips out dynamic UI properties before `setDoc` or `addDoc`.

---

## 4. Repository Layer Specification

### 4.1 Functional Paradigm
- Repositories MUST be functional modules exporting async functions or query builders.
- Class instances are forbidden for standard repositories.

### 4.2 Collection Name Enforcement
- Hardcoded collection string literals (e.g. `'products'`, `'orders'`) are strictly prohibited in repositories.
- All collection paths must import from `src/services/collections.js` (`COLLECTIONS.PRODUCTS`).

---

## 5. Service Layer Contract & Error Handling

### 5.1 Standard Response Shape
Every service function MUST return a Promise resolving to the canonical result object:

```typescript
type ServiceResult<T> = {
  success: boolean;
  data?: T;
  error?: string | Error;
  code?: string;
  originalError?: unknown;
};
```

### 5.2 Mandatory HOF Wrapping (`withServiceContract`)
All public service functions MUST be wrapped using `withServiceContract`:

```javascript
import { withServiceContract } from './serviceContract.js';
import { catalogRepository } from './repositories/catalogRepository.js';

async function _getCategoryProducts(categoryId) {
  const rawData = await catalogRepository.fetchProductsByCategory(categoryId);
  return transformProductsToDTO(rawData);
}

export const getCategoryProducts = withServiceContract(_getCategoryProducts, 'Failed to fetch category products');
```

---

## 6. Audit & Compliance Rules

1. **No Untrapped Async Exports**: Public service modules must not export naked async functions without `withServiceContract`.
2. **No Direct Firestore SDK in UI**: UI components must never import `firebase/firestore` directly; all data requests pass through `src/services/`.
3. **No Direct Firestore SDK in Services (where Repository exists)**: Services should delegate Firestore queries to `src/services/repositories/`.
