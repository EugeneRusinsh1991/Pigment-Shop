# Data Access Layer (Services) Conventions

This document defines the canonical architecture for all services in this application.

## 1. Paradigm: Functional Modules
All services MUST use **standardized functional modules**.
Do not use ES6 classes for services (e.g., `export class AdminCatalogService`). Instead, export standalone async functions. This aligns better with React Hooks and tree-shaking.

## 2. Dependencies
- **Firebase Instance:** The Firestore database instance (`db`) should be imported directly from the centralized Firebase initialization module. Do not pass it as a class constructor argument.
- **Collection Names:** Collection names MUST be imported from `src/services/collections.js`. Do NOT use hardcoded collection name strings (e.g., `'orders'`).

## 3. Error Handling Contract
Every exported async function in `src/services/` (excluding `repositories/` and `firebase/`) MUST be wrapped with `withServiceContract`. Repository modules throw errors; only service-layer functions return the canonical `{ success, data?, error?, code? }` shape.

This ensures a unified response shape across the entire application:
```javascript
{
  success: boolean,
  data?: any,
  error?: string,
  code?: string
}
```

## 4. Example Canonical Service

```javascript
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase'; // update path as needed
import { COLLECTIONS } from './collections';
import { withServiceContract } from './serviceContract';

// 1. Internal async logic (throws errors normally)
async function _fetchOrder(orderId) {
  const docRef = doc(db, COLLECTIONS.ORDERS, orderId);
  const snap = await getDoc(docRef);
  
  if (!snap.exists()) {
    // Standard JS errors are caught by the wrapper
    throw new Error('Order not found'); 
  }
  
  return { id: snap.id, ...snap.data() };
}

// 2. Export wrapped function with the canonical contract
export const fetchOrder = withServiceContract(_fetchOrder, 'Failed to fetch the order');
```
