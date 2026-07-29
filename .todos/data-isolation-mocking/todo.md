# Data Isolation & Mock Service Layer

> **Model Recommendation:** 🔴 G 3.1 P (H) — 4d | 8f | +6r  
> ⚠️ Action: BREAK DOWN INTO SUBTASKS

## Objective
Establish a clean data abstraction layer with seamless dynamic toggling between live Firebase backend repositories and deterministic mock service datasets via `EXPO_PUBLIC_USE_MOCKS`.

---

## 1. Architectural Specifications & Data Contracts

### 1.1 Standard Service Response Payload
All repository functions (live and mock) must return canonical payloads defined in [serviceContract.js](file:///d:/Magazine/_PigmentShop/src/services/serviceContract.js) using `withServiceContract`:
```javascript
{
  success: boolean,
  data?: any,
  error?: string,
  code?: string,
}
```

### 1.2 Environment Switcher & Repository Registry (`src/services/repositories/index.js`)
Centralize repository selection based on the environment flag:
```javascript
import * as liveCatalogRepo from './catalogRepository';
import * as mockCatalogRepo from '../mocks/mockCatalogRepository';

const USE_MOCKS = process.env.EXPO_PUBLIC_USE_MOCKS === 'true';

export const catalogRepository = USE_MOCKS ? mockCatalogRepo : liveCatalogRepo;
```

### 1.3 Mock Data Factories (`src/services/mocks/mockFactories.js`)
Generates deterministic surrogate entities matching [catalogEntityContract.ts](file:///d:/Magazine/_PigmentShop/src/services/catalogEntityContract.ts):
- `createMockProduct(overrides = {})`: Product object with valid `id`, `title`, `price`, `images`, `category`.
- `createMockCategory(overrides = {})`: Category object with `id`, `name`, `slug`, `icon`.
- `createMockOrder(overrides = {})`: Order object with `id`, `items`, `totalAmount`, `status`, `createdAt`.
- `createMockUser(overrides = {})`: User profile object with `uid`, `email`, `role`.

### 1.4 Mock Repository Implementations (`src/services/mocks/mockCatalogRepository.js`, etc.)
- **Methods**: Implements exact signatures of target live repositories (`catalogRepository.js`, `ordersRepository.js`, `authRepository.js`).
- **Simulated Latency**: Configurable async delay (default 200ms) to mirror network behavior in UI loading states.
- **Error Simulation Mode**: Expose toggle/flag to simulate network errors or empty data sets on demand for E2E testing.

---

## 2. Target Files & Reference Locations
1. **Contract Definitions & Existing Repositories**:
   - Entity Contract: [catalogEntityContract.ts](file:///d:/Magazine/_PigmentShop/src/services/catalogEntityContract.ts)
   - Catalog Repo: [catalogRepository.js](file:///d:/Magazine/_PigmentShop/src/services/repositories/catalogRepository.js)
   - Orders Repo: [ordersRepository.js](file:///d:/Magazine/_PigmentShop/src/services/repositories/ordersRepository.js)
   - Auth Repo: [authRepository.js](file:///d:/Magazine/_PigmentShop/src/services/repositories/authRepository.js)
   - Service Conventions: [SERVICE_CONVENTIONS.md](file:///d:/Magazine/_PigmentShop/src/services/SERVICE_CONVENTIONS.md)
   - Service Response Contract: [serviceContract.js](file:///d:/Magazine/_PigmentShop/src/services/serviceContract.js)
2. **New Mock Generators & Adapters**:
   - Mock Data Factories: `src/services/mocks/mockFactories.js` *(NEW)*
   - Mock Catalog Repository: `src/services/mocks/mockCatalogRepository.js` *(NEW)*
   - Mock Orders Repository: `src/services/mocks/mockOrdersRepository.js` *(NEW)*
   - Mock Auth Repository: `src/services/mocks/mockAuthRepository.js` *(NEW)*
3. **Environment Switcher & Service Registry**:
   - Repository Export Index: `src/services/repositories/index.js` *(NEW or UPDATE)*

---

## 3. Implementation Roadmap & Execution Checklist

### Phase 1: Audit Repository Public Interfaces
> **Recommended Model:** 🟢 G 3.6 F (L) — 1d | 0f | +4r

- [ ] Audit public function signatures in `catalogRepository.js`, `ordersRepository.js`, `authRepository.js`.
- [ ] Document required method parameters, return shapes, and error response codes.

### Phase 2: Implement Mock Data Factories & Repositories
> **Recommended Model:** 🟠 G 3.6 F (H) — 2d | 4f | +5r

- [ ] Create `src/services/mocks/mockFactories.js` with deterministic dummy datasets for catalog, categories, orders, and user profiles.
- [ ] Create `src/services/mocks/mockCatalogRepository.js` implementing all catalog functions wrapped with `withServiceContract`.
- [ ] Create `src/services/mocks/mockOrdersRepository.js` and `mockAuthRepository.js`.
- [ ] Add async delay helper `delay(ms)` to simulate loading states.

### Phase 3: Dynamic Data Switcher & Registry Integration
> **Recommended Model:** 🟡 G 3.6 F (M) — 1d | 3f | +4r

- [ ] Create/update `src/services/repositories/index.js` to dynamically re-export live vs. mock repositories based on `process.env.EXPO_PUBLIC_USE_MOCKS`.
- [ ] Update consumption sites across services (`catalogPageService.js`, `checkoutService.js`, etc.) to import from repository registry instead of direct file references.

### Phase 4: Edge Case & Automation Support
> **Recommended Model:** 🟡 G 3.6 F (M) — 1d | 2f | +3r

- [ ] Add deterministic seed options for Playwright / E2E testing in `.tools/browser-automation/`.
- [ ] Ensure mock repositories return immutably cloned objects (`JSON.parse(JSON.stringify(...))`) to prevent accidental in-memory state contamination across tests.

### Phase 5: Verification & System Audits
> **Recommended Model:** 🟢 G 3.6 F (L) — 1d | 0f | +2r

- [ ] Test application behavior with `EXPO_PUBLIC_USE_MOCKS=true` (offline/mock mode).
- [ ] Test application behavior with `EXPO_PUBLIC_USE_MOCKS=false` (live mode).
- [ ] Run health check: `npm run health`.
- [ ] Run UI audit suite: `npm run audit:ui`.

---

## 4. Verification Commands
```bash
npm run health
npm run audit:ui
```

