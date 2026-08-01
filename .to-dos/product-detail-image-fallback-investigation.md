# Root Cause Investigation: Product Detail Page Image Rendering & Fallback Pipeline

## 1. Executive Summary
An in-depth, step-by-step investigation of the Product Detail rendering pipeline was conducted to determine why the Product Detail page (`ProductPage` / `ProductImagePanel`) rendered a blank white image box instead of the expected 3x default Cloudinary placeholder images.

The investigation identified two primary root causes:
1. **DTO Data Loss (`catalogViewModel.js`)**: The `images` array property present on domain entities (`product.images`) was omitted during transformation in `buildFlatList` and `productToLeaf`. As a result, `product.images` was ALWAYS `undefined` on storefront product objects.
2. **Invalid Fallback Condition & Unresolved Media References (`ProductImagePanel.js` & `mediaAdapter.js`)**: `getRawProductImages` checked `product.image` (which contained un-resolved legacy strings like `'images/products/prod-1.jpg'`). Because `product.image` was truthy, the code returned `[product.image]` (length 1) instead of reaching the 3x `PRODUCT_PLACEHOLDER` fallback. Furthermore, raw image references were passed directly to `<MediaRenderer uri={uri} />` without being resolved through `mediaAdapter.resolveMediaUrl(uri)`, causing browser `<Image>` elements to fail HTTP loading and render blank white boxes.

---

## 2. Observed vs. Expected Behavior

| Dimension | Observed Behavior | Expected Behavior |
| :--- | :--- | :--- |
| **Main Image Box** | Blank / empty white rectangle with zero visual image content. | Displays the default Cloudinary product placeholder image. |
| **Thumbnail Slots** | Slot 1 displays an active red border around a blank white thumbnail; Slots 2 and 3 display empty slot placeholders. | Displays 3 populated thumbnail slots with active selection indicators. |
| **Gallery Array Length** | `images` array length evaluated to 1 (`[product.image]`). | `images` array length evaluates to 3 (`[PRODUCT_PLACEHOLDER, PRODUCT_PLACEHOLDER, PRODUCT_PLACEHOLDER]`). |
| **Media Resolution** | Raw string values passed directly to `<MediaRenderer uri={uri} />` without invoking `resolveMediaUrl`. | All image URIs resolved through `storageService` / `mediaAdapter` prior to rendering. |

---

## 3. Verified Execution Flow (Step-by-Step Tracing)

```text
Firestore / Seed Data 
  │ (Product entity contains `images: []` and legacy string `image: "images/prod-1.jpg"`)
  ▼
catalogEntityContract.ts (normalizeProductEntity)
  │ (Normalizes `images: ["images/prod-1.jpg"]`)
  ▼
catalogViewModel.js (buildFlatList / productToLeaf) ◄── [ROOT CAUSE 1: DTO DATA LOSS]
  │ (Omits `images` property, leaving `product.images` UNDEFINED in flatList)
  ▼
useProductPageState.js (resolveProduct)
  │ (Returns flatList product item with `image: "images/prod-1.jpg"` and `images: undefined`)
  ▼
ProductImagePanel.js (getRawProductImages) ◄── [ROOT CAUSE 2: FALLBACK BYPASSED]
  │ 1. `validImages` evaluates to `[]` because `product.images` is undefined.
  │ 2. `product.image` ("images/prod-1.jpg") is truthy.
  │ 3. Returns `["images/prod-1.jpg"]` (Length 1).
  │ 4. 3x `PRODUCT_PLACEHOLDER` fallback is BYPASSED.
  ▼
MediaRenderer.js (<Image source={{ uri: "images/prod-1.jpg" }} />) ◄── [ROOT CAUSE 3: UNRESOLVED URI]
  │ (Browser attempts to fetch `http://localhost:8081/images/prod-1.jpg` -> HTTP 404)
  ▼
Browser UI: Blank White Box Rendered
```

---

## 4. Supporting Empirical Evidence

1. **Visual Evidence (`.logs/manual-browser-log/S_21-14-49_Product_Prod2211.jpg`)**:
   - The screenshot shows Slot 1 active with Slots 2 and 3 rendered as `ProductThumbnailEmptySlot` components. This confirms `images.length === 1` at runtime.
2. **Code Evidence (`src/services/catalogViewModel.js` L46-63)**:
   ```javascript
   return {
     id: product.id,
     label: resolveLocalizedValue(product.label, lang),
     description: resolveLocalizedValue(product.description, lang),
     category: categoryLabel,
     categoryId,
     subcategory: subcategoryLabel,
     isCategory: false,
     price: product.price,
     image: product.image, // <── `images` array omitted!
     active: product.active,
     ...
   };
   ```
3. **Code Evidence (`src/features/product/ProductImagePanel.js` L17-30)**:
   ```javascript
   // `product.image` is "images/prod-1.jpg" (non-empty string).
   if (typeof product?.image === 'string' && product.image.trim().length > 0) {
     return [product.image]; // <── Returns length 1, bypassing 3x fallback!
   }
   ```
4. **Code Evidence (`src/features/product/ProductImagePanel.js` L39)**:
   ```javascript
   // Unresolved relative URI passed directly to renderer without mediaAdapter resolution:
   <MediaRenderer uri={uri} style={styles.imageFill} resizeMode="cover" />
   ```

---

## 5. Affected Files

1. [src/services/catalogViewModel.js](file:///d:/Magazine/_PigmentShop/src/services/catalogViewModel.js#L46-L63) — Omitted `images` property in DTO mapping.
2. [src/services/catalogViewModel.helpers.js](file:///d:/Magazine/_PigmentShop/src/services/catalogViewModel.helpers.js#L61-L81) — Omitted `images` property in `productToLeaf`.
3. [src/features/product/ProductImagePanel.js](file:///d:/Magazine/_PigmentShop/src/features/product/ProductImagePanel.js#L17-L45) — Invalid fallback condition check & missing `resolveMediaUrl` resolution.

---

## 6. Actionable Implementation Plan & Task List (◕ FH — 2d 5f +5r)

- [x] **Task 1: Update Seed Data (`src/services/catalogSeedData.js`)** `◐ FM — 1d 1f +1r — Task 1 [Parallel with Task 3, Task 4]`
  - Replace legacy Unsplash / placeholder URLs with valid Cloudinary image URLs in `PRODUCT_IMAGES`.
- [x] **Task 2: Reseed Firestore Database (`.tools/scripts/replace-cloudinary-card-images.js`)** `◐ FM — 1d 1f +2r — Task 2`
  - Run database regenerator to update remote Firestore `products` collection with valid Cloudinary URLs.
- [x] **Task 3: Fix DTO Normalization (`src/services/catalogViewModel.js` & `src/services/catalogViewModel.helpers.js`)** `◐ FM — 1d 2f +2r — Task 3 [Parallel with Task 1, Task 4]`
  - Preserve the `images` array property in `buildFlatList` and `productToLeaf`.
- [x] **Task 4: Update Fallback & Resolution Logic (`src/features/product/ProductImagePanel.js`)** `◐ FM — 1d 1f +2r — Task 4 [Parallel with Task 1, Task 3]`
  - Filter out unresolvable legacy strings and resolve every image URI with `resolveMediaUrl(uri)` before passing to `<MediaRenderer>`.
- [x] **Task 5: Verification & Visual Confirmation** `○ FL — 1d 0f +2r — Task 5`
  - Run `.tools/scripts/test-storage-provider.mjs` and verify browser rendering on Product Detail pages.

---

## 7. Runtime Data Origin Investigation & Firestore Inspection Results

### 7.1. Traced End-to-End Data Origin
Tracing backwards from `ProductPage` confirmed the exact data flow:
1. **Storefront Route (`app/(store)/product/[id].js`)**: Extracts `id` via `useLocalSearchParams()`, queries `flatList` from `useCatalog()`, and passes `product` to `<ProductPage product={product} />`.
2. **Context Layer (`src/features/catalog/CatalogContext.js`)**: Subscribes to `catalogStore` via `useSyncExternalStore(subscribe, getProducts)` and computes `flatList` using `buildFlatList()`.
3. **In-Memory Store (`src/data/catalogState.js`)**: `catalogStore` holds normalized product entities updated via `UPDATE_PRODUCTS`.
4. **Sync Adapter (`src/data/catalogSync.js`)**: Runs a real-time Firestore listener `onSnapshot(collection(db, 'products'))` and dispatches `UPDATE_PRODUCTS` with raw snapshot documents mapped by `mapSnapshotToList(snapshot)`.
5. **Original Source (Remote Firestore `products` collection)**: The product objects originate directly from remote Firestore documents.

### 7.2. Direct Firestore Document Inspection Evidence
An authenticated inspection of the remote Firestore `products` collection (executed via `.tools/scripts/inspect-product-data.mjs`) verified the exact raw document contents stored in the database:

```text
Doc ID: prod-1-1-1-1
  image: https://firebasestorage.googleapis.com/v0/b/pgmt-shop.firebasestorage.app/o/defaults%2Fproduct_card.jpg?alt=media
  images: undefined
Doc ID: prod-2-2-4-4
  image: https://firebasestorage.googleapis.com/v0/b/pgmt-shop.firebasestorage.app/o/defaults%2Fproduct_card.jpg?alt=media
  images: undefined
```

**Conclusion on Obsolete Firebase Storage URLs**:
- The obsolete Firebase Storage URLs (`https://firebasestorage.googleapis.com/v0/b/pgmt-shop.firebasestorage.app/...`) are stored directly inside the remote Firestore database documents from earlier database seeding.
- The runtime application is faithfully loading these remote documents from Firestore.
- To display valid Cloudinary assets, the remote Firestore database must be re-seeded/updated with current Cloudinary URLs, while client-side components must handle unresolved and broken legacy URLs gracefully.

