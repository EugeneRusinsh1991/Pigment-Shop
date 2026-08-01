# Root Cause Investigation: Category Image Loading & Fallback Pipeline

## 1. Executive Summary

An audit of the category image loading pipeline was conducted to investigate why default category (catalog) images fail to display in the Catalog section (`app/(store)/catalog/index.js`), despite default product images loading correctly from Cloudinary (`PRODUCT_PLACEHOLDER`).

The investigation compared the category image pipeline against the pattern established in [product-detail-image-fallback-investigation.md](file:///d:/Magazine/_PigmentShop/.to-dos/product-detail-image-fallback-investigation.md) and empirically validated all findings via runtime execution tracing (`.tools/scripts/trace-category-runtime.mjs`).

The investigation verified three primary root causes:
1. **Missing `image` Field in Remote Documents**: All 28 category documents in Firestore initially had `image: undefined`.
2. **Legacy Hardcoded Fallback in ViewModel (`catalogViewModel.js` & `catalogViewModel.helpers.js`)**: Category tree construction (`buildCategoryTree`) defaulted missing category image references to a dictionary of legacy, hardcoded Unsplash URLs (`CATEGORY_IMAGES`) or `CATEGORY_IMAGES['Другое']` (`https://images.unsplash.com/photo-1522335789203...`) instead of using the canonical `CATEGORY_PLACEHOLDER` Cloudinary URL defined in `src/constants/index.js`.
3. **Unresolved Media references & Bypassed Component Fallback (`CategoryCard.js`)**: `CategoryCard.js` passed raw `item.image` strings directly to React Native `<Image source={{ uri: item.image }} />` without passing them through `resolveMediaUrl` (`storageService` / `mediaAdapter`). Because `buildCategoryTree` assigned the Unsplash string, `item.image` was never falsy, bypassing the `!item.image` check and causing component fallback failure.

---

## 2. Observed vs. Expected Behavior & Product Pipeline Comparison

| Dimension | Observed Category Behavior | Product Image Pattern (`PRODUCT_PLACEHOLDER`) | Expected Category Behavior |
| :--- | :--- | :--- | :--- |
| **Catalog Grid Cards** | Displays blank rectangle or broken image state. | Displays default product Cloudinary image. | Displays high-resolution Cloudinary default category image (`CATEGORY_PLACEHOLDER`). |
| **ViewModel Output** | `item.image` falls back to hardcoded Unsplash URLs (`https://images.unsplash.com/...`). | `item.image` defaults to `PRODUCT_PLACEHOLDER`. | `item.image` defaults to `CATEGORY_PLACEHOLDER` (`https://res.cloudinary.com/...`). |
| **Media Resolution** | `CategoryCard` renders raw image string without calling `resolveMediaUrl(uri)`. | All image URIs resolved through `storageService` / `mediaAdapter` prior to rendering. | All category image URIs resolved through `resolveMediaUrl(uri)` prior to rendering. |
| **Seed Data** | `catalogSeedData.js` categories lack default `image` property. | `catalogSeedData.js` products explicitly reference `PRODUCT_PLACEHOLDER`. | `catalogSeedData.js` category entities explicitly reference `CATEGORY_PLACEHOLDER`. |

---

## 3. Verified Execution Flow (Step-by-Step Tracing)

```text
Firestore / Seed Data 
  │ (All 28 category documents synced with `CATEGORY_PLACEHOLDER`)
  ▼
catalogEntityContract.ts (normalizeCategoryEntity)
  │ (Preserves canonical Cloudinary URL)
  ▼
catalogViewModel.js (buildCategoryTree) ◄── [RESOLVED: CLOUDINARY FALLBACK INTEGRATED]
  │ 1. Evaluates `category.image || CATEGORY_IMAGES[nameRu] || CATEGORY_PLACEHOLDER`
  │ 2. Yields canonical Cloudinary URL ("https://res.cloudinary.com/.../g3yabymukhht0e8zeyc7.jpg")
  ▼
useCatalogViewData.js -> CatalogView.js
  │ (Passes item with Cloudinary URL to CategoryCard)
  ▼
CategoryCard.js (getImageSource) ◄── [RESOLVED: MEDIA ADAPTER RESOLUTION INTEGRATED]
  │ 1. Resolves URI via `resolveMediaUrl(item.image)`
  │ 2. Returns `{ uri: resolved }`
  │ 3. React Native `<Image source={{ uri: resolved }} />` renders Cloudinary placeholder.
  ▼
Browser UI: Valid Category Placeholder Rendered
```

---

## 4. Supporting Empirical Evidence & Runtime Verification Results

### 4.1. Empirical Validation via `.tools/scripts/trace-category-runtime.mjs`

Runtime trace execution against live Firestore database and ViewModel pipeline yielded the following verified evidence:

1. **`CATEGORY_PLACEHOLDER` Verification**:
   - `src/constants/index.js` line 2 defines:
     `export const CATEGORY_PLACEHOLDER = 'https://res.cloudinary.com/iayng29j/image/upload/v1785611322/categories/g3yabymukhht0e8zeyc7.jpg';`
   - Verified that `CATEGORY_PLACEHOLDER` points to the project's canonical Cloudinary category placeholder image.

2. **Direct Firestore Inspection Evidence (28 Documents)**:
   - Querying `collection(db, 'categories')` via `getDocs()` returned 28 documents (`cat-root-0`, `cat-root-1`, etc.).
   - Empirical inspection confirmed **100% of Firestore category documents carry `CATEGORY_PLACEHOLDER`**.

3. **ViewModel Transformation Output Trace (`buildCategoryTree`)**:
   - `buildCategoryTree(rawCategories)` produced root node objects where `node.image` evaluated to:
     `"https://res.cloudinary.com/iayng29j/image/upload/v1785611322/categories/g3yabymukhht0e8zeyc7.jpg"`
   - `is Cloudinary placeholder?` **`true`**

4. **Component Media Resolution Evidence (`CategoryCard.js` L94-103)**:
   ```javascript
   function getImageSource(item, imgError) {
     if (!item || !item.image || imgError) {
       return { uri: resolveMediaUrl(CATEGORY_PLACEHOLDER) };
     }
     const resolved = resolveMediaUrl(item.image);
     if (!resolved) {
       return { uri: resolveMediaUrl(CATEGORY_PLACEHOLDER) };
     }
     return { uri: resolved };
   }
   ```

---

## 5. Affected Files

1. [src/services/catalogViewModel.js](file:///d:/Magazine/_PigmentShop/src/services/catalogViewModel.js#L84-L101) — Category DTO assembly injecting `CATEGORY_PLACEHOLDER` fallback.
2. [src/services/catalogViewModel.helpers.js](file:///d:/Magazine/_PigmentShop/src/services/catalogViewModel.helpers.js#L3-L10) — Updated `CATEGORY_IMAGES` fallback dictionary to `CATEGORY_PLACEHOLDER`.
3. [src/features/catalog/CategoryCard.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CategoryCard.js#L94-L103) — Added `resolveMediaUrl` resolution and robust fallback logic.
4. [src/services/catalogSeedData.js](file:///d:/Magazine/_PigmentShop/src/services/catalogSeedData.js#L38-L96) — Added `image: CATEGORY_PLACEHOLDER` on seed categories.
5. [src/constants/index.js](file:///d:/Magazine/_PigmentShop/src/constants/index.js#L2) — Canonical `CATEGORY_PLACEHOLDER` constant definition.

---

## 6. Actionable Implementation Plan & Task List (◕ FH — 2d 5f +5r)

- [x] **Task 1: Update Seed Data (`src/services/catalogSeedData.js`)** `◐ FM — 1d 1f +1r — Task 1 [Parallel with Task 3, Task 4]`
  - Added `image: CATEGORY_PLACEHOLDER` to category configs in `topLevelConfigs`.
- [x] **Task 2: Reseed Firestore Database (`.tools/scripts/replace-cloudinary-card-images.js`)** `◐ FM — 1d 1f +2r — Task 2`
  - Executed database update script to set `image: CATEGORY_PLACEHOLDER` across 28 Firestore category documents.
- [x] **Task 3: Fix Category DTO Normalization (`src/services/catalogViewModel.js` & `src/services/catalogViewModel.helpers.js`)** `◐ FM — 1d 2f +2r — Task 3 [Parallel with Task 1, Task 4]`
  - Replaced hardcoded Unsplash fallback in `buildCategoryTree` with `CATEGORY_PLACEHOLDER` imported from `src/constants/index.js`.
- [x] **Task 4: Update Component Fallback & Media Resolution Logic (`src/features/catalog/CategoryCard.js`)** `◐ FM — 1d 1f +2r — Task 4 [Parallel with Task 1, Task 3]`
  - Resolved every image URI with `resolveMediaUrl(uri)` from `src/media/mediaAdapter.js` before passing to `<Image source={source} />`.
- [x] **Task 5: Verification & Visual Confirmation** `○ FL — 1d 0f +2r — Task 5`
  - Verified Category cards render high-resolution default Cloudinary images on the Catalog screen (`app/(store)/catalog/index.js`).

---

## 7. Runtime Data Origin Investigation & Firestore Inspection Results

### 7.1. Distinguishing Verified Facts vs. Assumptions

| Item | Status | Verification Evidence |
| :--- | :--- | :--- |
| **`CATEGORY_PLACEHOLDER` URL** | VERIFIED FACT | Points to `https://res.cloudinary.com/iayng29j/image/upload/v1785611322/categories/g3yabymukhht0e8zeyc7.jpg` in `src/constants/index.js`. |
| **Firestore Category `image` Fields** | VERIFIED FACT | Updated 28 documents in Firestore `categories` collection with `CATEGORY_PLACEHOLDER`. |
| **ViewModel Injected Output** | VERIFIED FACT | Executed `buildCategoryTree()`; `node.image` evaluates to Cloudinary URL `https://res.cloudinary.com/...`. |
| **Component Resolution Layer** | VERIFIED FACT | Integrated `resolveMediaUrl` in `CategoryCard.js`. |

### 7.2. Summary of Empirical Verification
All 5 tasks in the implementation roadmap have been fully completed and empirically verified via runtime trace execution.
