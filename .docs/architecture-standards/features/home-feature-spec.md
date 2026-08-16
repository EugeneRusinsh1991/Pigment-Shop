# Feature Specification: Home Module (`src/features/home/`)

> [!NOTE]
> Specification for the storefront landing page, promotional banners, category showcases, and marketing carousels.

---

## 1. Domain Responsibility

The **Home Feature** delivers the store entry point:
- **Hero Slider / Banner (`HeroBanner.js`)**: Main promotional slider with call-to-action buttons.
- **Category Showcase (`CategoryGrid.js`)**: Featured category cards driving discovery.
- **Product Carousels (`FeaturedProducts.js`, `NewArrivals.js`)**: Horizontal product lists with auto-scroll or pagination.
- **Marketing Banners (`PromoBanners.js`)**: Discount banners and brand story cards.

---

## 2. Directory Layout

```text
src/features/home/
├── HomePage.js              # Landing page root component
├── HeroBanner.js            # Main hero banner section
├── CategoryGrid.js          # Featured categories section
├── FeaturedProducts.js      # Curated products carousel
├── PromoBanners.js          # Marketing callout banners
├── homeStyles.js            # Home section layout styling
└── index.js                 # Public API exports
```

---

## 3. Public API Contract (`index.js`)

```javascript
export { default as HomePage } from './HomePage';
```
