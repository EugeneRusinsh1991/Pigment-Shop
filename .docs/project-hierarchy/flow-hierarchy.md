# Flow-Based Pipeline Hierarchy (`flow-hierarchy.md`)

> [!NOTE]
> Maps end-to-end user actions and data pipelines from UI interactions through Hooks and State down to Repositories & Databases.

---

## 1. Catalog & Product Discovery Flow

```
[User Action: Browse/Search]
  │
  ▼
[UI Layer]: src/components/domain/Search/ & src/components/ui/Card/
  │
  ▼
[Feature Layer]: src/features/catalog/ (CatalogScreen.js)
  │
  ▼
[State & Hook Layer]: src/hooks/useCatalog.js & src/context/CatalogContext.js
  │
  ▼
[Service Layer]: src/services/catalog/catalogService.js
  │
  ▼
[Data Repository]: src/data/repositories/productRepository.js (Firestore / Local Data)
```

---

## 2. Cart & Checkout Pipeline

```
[User Action: Add to Cart & Checkout]
  │
  ▼
[UI Layer]: src/components/ui/Button/ & src/components/ui/Modal/
  │
  ▼
[Feature Layer]: src/features/cart/ & src/features/checkout/
  │
  ▼
[State & Hook Layer]: src/hooks/useCart.js & src/context/CartContext.js
  │
  ▼
[Service Layer]: src/services/checkout/checkoutService.js
  │
  ▼
[Data Repository & Payment]: src/services/firebase/firestore.js & Payment Gateway DTO
```

---

## 3. Admin Product Management Pipeline

```
[User Action: Edit/Save Product]
  │
  ▼
[UI Layer]: src/components/domain/DataTable/ & src/components/ui/TextField/
  │
  ▼
[Feature Layer]: src/features/admin/ProductFormModal.js
  │
  ▼
[State & Hook Layer]: src/hooks/useAdminProducts.js & src/context/ToastContext.js
  │
  ▼
[Service Layer]: src/services/admin/adminProductService.js
  │
  ▼
[Data Repository]: src/data/repositories/adminRepository.js (Firestore update)
```
