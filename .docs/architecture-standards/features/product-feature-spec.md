# Feature Specification: Product Module (`src/features/product/`)

> [!NOTE]
> Specification for Product Detail Page (PDP), media gallery, variant option selection, price calculations, and customer reviews.

---

## 1. Domain Responsibility

The **Product Feature** powers individual product detail pages (PDP):
- **Media Gallery (`ProductGallery.js`, `ProductImagePanel.js`)**: Main product image carousel, zoom preview, badges overlay, and 3-slot product image thumbnails (`ProductThumbnails.js`, `ProductThumbnailItem.js`, `ProductThumbnailEmptySlot.js`).
- **Product Info & Pricing (`ProductInfo.js`)**: Title, SKU, price calculation, discount badges, stock availability status.
- **Variant Selector (`ProductVariantSelector.js`)**: Color swatches, volume/size options selection.
- **Action Controls (`AddToCartSection.js`)**: Quantity selector, primary "Add to Cart" and "Favorite" action buttons.
- **Product Tabs (`ProductTabs.js`)**: Specifications, description, application guide, customer reviews.

---

## 2. Directory Layout

```text
src/features/product/
├── ProductDetailPage.js          # Root PDP screen component
├── ProductGallery.js             # Image gallery and zoom preview
├── ProductImagePanel.js          # Hero gallery & thumbnails orchestration container
├── ProductThumbnails.js          # Fixed 3-slot row container for populated and empty image slots
├── ProductThumbnailItem.js       # Atomic populated thumbnail slot component with active indicator
├── ProductThumbnailEmptySlot.js  # Atomic empty thumbnail placeholder slot component
├── ProductInfo.js                # Price, title, stock, and status block
├── ProductVariantSelector.js     # Swatches & options selector
├── AddToCartSection.js           # Quantity picker & add to cart CTA
├── ProductTabs.js                # Specs, description, and reviews tabs
├── ProductPageStyles.js          # Centralized PDP & thumbnail design token layout styles
└── index.js                      # Public API exports
```

---

## 3. Public API Contract (`index.js`)

```javascript
export { default as ProductDetailPage } from './ProductDetailPage';
```
