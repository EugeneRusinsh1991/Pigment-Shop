# Task Spec: [TASK-002] Standardize Service Contracts Across Data Layer

## Metadata & Model Recommendation
- **Task ID**: TASK-002
- **Complexity Rating**: 3 / 5 (+20% safety margin -> 🟠 **Gemini 3.6 Flash High**)
- **Recommended Agent Model**: 🟠 **Gemini 3.6 Flash (High)**
- **Prerequisite Tasks**: TASK-001
- **Dependent Tasks**: None
- **Target Files**:
  - `src/services/repositories/catalogRepository.js`
  - `src/services/repositories/ordersRepository.js`
  - `src/services/repositories/usersRepository.js`
  - `src/services/adminCatalogService.js`
  - `src/services/adminOrdersService.js`
  - `src/services/adminUsersService.js`

## Light Model Prompt Instruction
"Wrap all exported asynchronous query and mutation functions in `catalogRepository.js`, `ordersRepository.js`, and `usersRepository.js` with `withServiceContract` from `src/services/serviceContract.js`. Ensure all functions return standardized `{ success, data, error }` response shapes."

## 🧪 Manual UI Verification Guide
- **App Screen**: Catalog and Admin Orders
- **User Action**: Perform catalog search, pagination, and order updates
- **Expected Result**: Data fetching operates without unhandled exception crashes, returning standardized service payloads on both success and error.
